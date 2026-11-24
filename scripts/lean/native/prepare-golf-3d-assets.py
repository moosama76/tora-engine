#!/usr/bin/env python3
"""Convert immutable CC0 Kenney minigolf-kit OBJ models into strict TORA3DM1 binary meshes + compact end-card PNGs."""
import hashlib
import json
import struct
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
MODELS_DIR = ROOT / "fixtures" / "mini-golf" / "models"
TEX_SRC = MODELS_DIR / "Textures" / "colormap.png"
ICON_DIR = ROOT / "assets" / "tora-golf" / "imported"
OUT_DIR = ROOT / "assets" / "tora-golf" / "3d"
PLAN_PATH = ROOT / "assets" / "tora-golf" / "plan.json"
OUT_DIR.mkdir(parents=True, exist_ok=True)

MESH_NAMES = [
    "open",
    "obstacle-block",
    "structure-gate",
    "castle",
    "flag-red",
    "ball-blue",
    "support",
]


def sha256_bytes(data: bytes) -> str:
    return "sha256:" + hashlib.sha256(data).hexdigest()


def parse_obj_to_tora3dm1(obj_path: Path) -> tuple[bytes, int, int]:
    positions: list[tuple[float, float, float]] = []
    normals: list[tuple[float, float, float]] = []
    uvs: list[tuple[float, float]] = []
    vert_map: dict[tuple[int, int, int], int] = {}
    vertices: list[tuple[float, float, float, float, float, float, float, float]] = []
    indices: list[int] = []

    def resolve_idx(raw: str, count: int) -> int:
        if not raw:
            return -1
        idx = int(raw)
        return idx - 1 if idx > 0 else count + idx

    for line in obj_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        tag = parts[0]
        if tag == "v" and len(parts) >= 4:
            positions.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif tag == "vn" and len(parts) >= 4:
            normals.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif tag == "vt" and len(parts) >= 3:
            uvs.append((float(parts[1]), float(parts[2])))
        elif tag == "f" and len(parts) >= 4:
            face_verts = []
            for tok in parts[1:]:
                segs = tok.split("/")
                vi = resolve_idx(segs[0], len(positions))
                ti = resolve_idx(segs[1], len(uvs)) if len(segs) > 1 and segs[1] else -1
                ni = resolve_idx(segs[2], len(normals)) if len(segs) > 2 and segs[2] else -1
                key = (vi, ti, ni)
                if key not in vert_map:
                    px, py, pz = positions[vi]
                    nx, ny, nz = normals[ni] if 0 <= ni < len(normals) else (0.0, 1.0, 0.0)
                    u, v = uvs[ti] if 0 <= ti < len(uvs) else (0.0, 0.0)
                    vert_map[key] = len(vertices)
                    vertices.append((px, py, pz, nx, ny, nz, u, v))
                face_verts.append(vert_map[key])
            for k in range(1, len(face_verts) - 1):
                indices.extend((face_verts[0], face_verts[k], face_verts[k + 1]))

    assert 1 <= len(vertices) <= 65535, f"Vertex count out of bounds: {len(vertices)}"
    assert 3 <= len(indices) <= 196605 and len(indices) % 3 == 0, f"Index count out of bounds: {len(indices)}"

    buf = bytearray()
    buf.extend(b"TORA3DM1")
    buf.extend(struct.pack("<II", len(vertices), len(indices)))
    for v in vertices:
        buf.extend(struct.pack("<8f", *v))
    for idx in indices:
        buf.extend(struct.pack("<H", idx))
    return bytes(buf), len(vertices), len(indices)


def save_quantized_png(src: Path, dest: Path, max_size: int = 160) -> bytes:
    im = Image.open(src).convert("RGBA")
    if max(im.size) > max_size:
        im.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    q = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    q.save(dest, format="PNG", optimize=True)
    return dest.read_bytes()


files = []

# 1. Shared Kenney minigolf-kit colormap texture (verbatim CC0 PNG)
tex_dest = OUT_DIR / "colormap.png"
tex_bytes = TEX_SRC.read_bytes()
tex_dest.write_bytes(tex_bytes)
files.append({
    "id": "golf.colormap",
    "mime": "image/png",
    "file": str(tex_dest.relative_to(ROOT)),
    "bytes": len(tex_bytes),
    "sha256": sha256_bytes(tex_bytes),
    "processing": {
        "kind": "png-verbatim-copy",
        "sourceFile": str(TEX_SRC.relative_to(ROOT)),
        "sourceSha256": sha256_bytes(tex_bytes),
    },
})

# 2. Seven Kenney minigolf-kit 3D meshes -> TORA3DM1 binary assets
for name in MESH_NAMES:
    src = MODELS_DIR / f"{name}.obj"
    mesh_bytes, vcount, icount = parse_obj_to_tora3dm1(src)
    dest = OUT_DIR / f"{name}.t3d"
    dest.write_bytes(mesh_bytes)
    files.append({
        "id": f"mesh.{name}",
        "mime": "model/tora-mesh",
        "file": str(dest.relative_to(ROOT)),
        "bytes": len(mesh_bytes),
        "vertexCount": vcount,
        "indexCount": icount,
        "sha256": sha256_bytes(mesh_bytes),
        "processing": {
            "kind": "obj-to-tora3dm1",
            "sourceFile": str(src.relative_to(ROOT)),
            "sourceSha256": sha256_bytes(src.read_bytes()),
        },
    })

# 3. Crisp high-contrast hero badges for Win & Timeout end cards (rendered from Kenney minigolf-kit)
for icon_id, filename, max_sz in [
    ("golf.flag", "golf.flag.png", 160),
    ("golf.club", "golf.club.png", 160),
    ("golf.castle", "golf.castle.png", 192),
    ("golf.windmill", "golf.windmill.png", 192),
]:
    src = ICON_DIR / filename
    dest = OUT_DIR / filename
    data = save_quantized_png(src, dest, max_size=max_sz)
    files.append({
        "id": icon_id,
        "mime": "image/png",
        "file": str(dest.relative_to(ROOT)),
        "bytes": len(data),
        "sha256": sha256_bytes(data),
        "processing": {
            "kind": "png8-quantize",
            "sourceFile": str(src.relative_to(ROOT)),
            "sourceSha256": sha256_bytes(src.read_bytes()),
        },
    })

plan = {
    "format": "tora-native-3d-asset-plan-1",
    "source": {
        "id": "kenney-minigolf-kit",
        "author": "Kenney",
        "sourceUrl": "https://kenney.nl/assets/minigolf-kit",
        "license": "CC0-1.0",
        "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
        "attributionRequired": False,
    },
    "visualDirection": "Exact sunlit 3D Three.js WebGL2 Mini Golf Challenge diorama using Kenney CC0 minigolf-kit 3D geometry, continuous fairway with circular cup cutout, animated pennant, bank rails, moving gate, and uphill ramp.",
    "files": files,
}

PLAN_PATH.write_text(json.dumps(plan, indent=2) + "\n")
total_bytes = sum(f["bytes"] for f in files)
print(f"Prepared {len(files)} 3D Mini Golf assets ({total_bytes} bytes total) -> {PLAN_PATH.relative_to(ROOT)}")
