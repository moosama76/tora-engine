#!/usr/bin/env python3
"""Prepare rich Kenney CC0 sunlit waterfront isometric city assets for Traffic Tycoon."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "fixtures" / "traffic-tycoon" / "assets"
ORIG_CITY = ROOT / ".data" / "T028" / "originals" / "isometric-tiles-city" / "PNG"
ORIG_LAND = ROOT / ".data" / "T028" / "originals" / "isometric-tiles-landscape" / "PNG"
ORIG_VEH = ROOT / ".data" / "T028" / "originals" / "isometric-tiles-vehicles" / "PNG"
OUT = ROOT / "assets" / "tora-traffic" / "imported"
PLAN_PATH = ROOT / "assets" / "tora-traffic" / "plan.json"
OUT.mkdir(parents=True, exist_ok=True)

HALF_W = 66
HALF_H = 33
COLS = 7  # x = 0..6
ROWS = 6  # y = 0..5 (row 5 is sparkling turquoise waterfront harbor!)


def project(x: float, y: float) -> tuple[float, float]:
    return ((x - y) * HALF_W, (x + y) * HALF_H)


ORIGIN_X = 408
ORIGIN_Y = 66
CANVAS_W = 884
CANVAS_H = 490
OUT_W = 680
OUT_H = 377


def sha256_file(path: Path) -> str:
    return "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()


def load_rgba(src) -> Image.Image:
    p = Path(src)
    if p.is_absolute():
        return Image.open(p).convert("RGBA")
    return Image.open(SRC / src).convert("RGBA")


def save_compact_png(im: Image.Image, dest: Path, colors: int = 256) -> Path:
    """Save compact quantized PNG-8 with full alpha preservation for lean standalone HTML bundles."""
    q = im.convert("RGBA").quantize(colors=colors, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    q.save(dest, format="PNG", optimize=True)
    return dest


def paste_tile(canvas: Image.Image, tile: Image.Image, x: float, y: float, y_lift: int = 0):
    sx, sy = project(x, y)
    w, h = tile.size
    px = int(round(ORIGIN_X + sx - w / 2))
    py = int(round(ORIGIN_Y + sy + 66 - h - y_lift))
    canvas.alpha_composite(tile, (px, py))


def mask_top_diamond(tile: Image.Image) -> Image.Image:
    """Mask an isometric 132x101 tile to its exact top diamond surface."""
    mask = Image.new("L", tile.size, 0)
    md = ImageDraw.Draw(mask)
    md.polygon([(66, 0), (132, 33), (66, 67), (0, 33)], fill=255)
    out = Image.new("RGBA", tile.size, (0, 0, 0, 0))
    out.paste(tile, (0, 0), mask)
    return out


# S-curve Express Highway across the sunlit waterfront city:
#   Depot (0,4) -> Crosswalk (1,4) -> GAP 1 (1,3) -> Curve TL (1,2) -> Lamp Avenue (2,2)
#   -> GAP 2 (3,2) -> Curve BR (4,2) -> GAP 3 (4,1) -> Market Crosswalk (4,0) -> Market (5,0)
# Plus live ambient Waterfront Boulevard along row y=4: (2,4) <-> (5,4) right beside the turquoise harbor!
GAP_TILES = {
    "gap1": (1, 3, "y"),
    "gap2": (3, 2, "x"),
    "gap3": (4, 1, "y"),
}


def build_city_base() -> tuple[Path, list[Path]]:
    """Tile Kenney CC0 waterfront harbor, tree-lined boulevards, crosswalks, plazas, and 3 crisp blueprint road gaps."""
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))

    grass_p = ORIG_LAND / "landscapeTiles_067.png"
    water_p = ORIG_LAND / "landscapeTiles_066.png"
    plaza_p = SRC / "city74.png"
    planter_p = ORIG_CITY / "cityTiles_067.png"
    canal_p = SRC / "city52.png"
    road_x_p = SRC / "city73.png"
    road_y_p = SRC / "city81.png"
    road_x_trees_p = SRC / "city36.png"
    road_x_lamp_p = SRC / "city57.png"
    road_y_cross_p = SRC / "city56.png"
    road_y_cross2_p = SRC / "city64.png"
    corner_tl_p = ORIG_CITY / "cityTiles_122.png"
    corner_br_p = ORIG_CITY / "cityTiles_126.png"

    grass = load_rgba(grass_p)
    water = load_rgba(water_p)
    plaza = load_rgba(plaza_p)
    planter = load_rgba(planter_p)
    canal = load_rgba(canal_p)
    road_x = load_rgba(road_x_p)
    road_y = load_rgba(road_y_p)
    road_x_trees = load_rgba(road_x_trees_p)
    road_x_lamp = load_rgba(road_x_lamp_p)
    road_y_cross = load_rgba(road_y_cross_p)
    road_y_cross2 = load_rgba(road_y_cross2_p)
    corner_tl = load_rgba(corner_tl_p)
    corner_br = load_rgba(corner_br_p)

    building_lots = {(0, 4), (5, 0), (0, 1), (2, 0), (2, 3), (6, 1), (6, 2), (5, 3)}
    planter_lots = {(1, 0), (3, 0), (1, 1), (5, 1), (0, 3), (4, 3), (6, 4)}
    waterfront_x_trees = {(2, 4), (5, 4)}
    waterfront_x_lamp = {(3, 4)}
    waterfront_x_plain = {(4, 4)}

    for s in range(COLS + ROWS - 1):
        for x in range(COLS):
            y = s - x
            if y < 0 or y >= ROWS:
                continue
            pos = (x, y)
            if y == 5:
                # Sparkling turquoise harbor edge framing the southern waterfront!
                paste_tile(canvas, water, x, y, y_lift=-4)
            elif pos == (1, 2):
                paste_tile(canvas, corner_tl, x, y)
            elif pos == (4, 2):
                paste_tile(canvas, corner_br, x, y)
            elif pos == (1, 4):
                paste_tile(canvas, road_y_cross, x, y)
            elif pos == (4, 0):
                paste_tile(canvas, road_y_cross2, x, y)
            elif pos == (2, 2):
                paste_tile(canvas, road_x_lamp, x, y)
            elif pos in waterfront_x_trees:
                paste_tile(canvas, road_x_trees, x, y)
            elif pos in waterfront_x_lamp:
                paste_tile(canvas, road_x_lamp, x, y)
            elif pos in waterfront_x_plain:
                paste_tile(canvas, road_x, x, y)
            elif pos == (3, 1):
                paste_tile(canvas, canal, x, y)
            elif pos in planter_lots:
                paste_tile(canvas, planter, x, y)
            elif pos in building_lots:
                paste_tile(canvas, plaza, x, y)
            elif pos in {(1, 3), (3, 2), (4, 1)}:
                # Clean concrete foundation base under each missing road slot
                paste_tile(canvas, plaza, x, y)
            else:
                paste_tile(canvas, grass, x, y, y_lift=2)

    # Crisp sunlit architectural road-blueprint markings right inside the 3 missing road slots
    # (clean open center, subtle dashed lane guide — zero heavy opaque clutter!)
    overlay = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for _name, (gx, gy, axis) in GAP_TILES.items():
        sx, sy = project(gx, gy)
        ox, oy = ORIGIN_X + sx, ORIGIN_Y + sy
        outer = [(ox, oy - 30), (ox + 60, oy), (ox, oy + 30), (ox - 60, oy)]
        inner = [(ox, oy - 22), (ox + 44, oy), (ox, oy + 22), (ox - 44, oy)]
        draw.polygon(outer, fill=(40, 82, 102, 130), outline=(255, 214, 72, 235))
        draw.polygon(inner, fill=(255, 216, 84, 58), outline=(255, 248, 218, 220))
        if axis == "y":
            draw.line([(ox - 24, oy + 12), (ox - 8, oy + 4)], fill=(255, 250, 224, 245), width=4)
            draw.line([(ox + 8, oy - 4), (ox + 24, oy - 12)], fill=(255, 250, 224, 245), width=4)
        else:
            draw.line([(ox - 24, oy - 12), (ox - 8, oy - 4)], fill=(255, 250, 224, 245), width=4)
            draw.line([(ox + 8, oy + 4), (ox + 24, oy + 12)], fill=(255, 250, 224, 245), width=4)
    canvas.alpha_composite(overlay)

    out_img = canvas.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
    dest = save_compact_png(out_img, OUT / "city.base.png", colors=256)
    sources = [
        grass_p, water_p, plaza_p, planter_p, canal_p,
        road_x_p, road_y_p, road_x_trees_p, road_x_lamp_p,
        road_y_cross_p, road_y_cross2_p, corner_tl_p, corner_br_p,
    ]
    return dest, sources


def build_gap_patch(name: str, gx: int, gy: int, axis: str) -> tuple[Path, list[Path]]:
    """Exact cropped top-diamond road patch positioned cleanly for one built road segment."""
    road_p = SRC / ("city73.png" if axis == "x" else "city81.png")
    road_top = mask_top_diamond(load_rgba(road_p))
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_tile(canvas, road_top, gx, gy, y_lift=1)
    out_img = canvas.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
    dest = save_compact_png(out_img, OUT / f"road.{name}.png", colors=128)
    return dest, [road_p]


def build_building(name: str, body_file: str, roof_file: str, floors: int = 1) -> Path:
    body = load_rgba(body_file)
    roof = load_rgba(roof_file)
    bw, bh = body.size
    rw, rh = roof.size
    w = max(bw, rw) + 8
    total_h = bh + (floors - 1) * 33 + rh
    canvas = Image.new("RGBA", (w, total_h), (0, 0, 0, 0))
    base_y = total_h - 4
    for floor in range(floors):
        bx = (w - bw) // 2
        by = base_y - bh - floor * 33
        canvas.alpha_composite(body, (bx, by))
    rx = (w - rw) // 2
    ry = base_y - 1 - bh - (floors - 1) * 33 - rh + 44
    canvas.alpha_composite(roof, (rx, ry))
    bbox = canvas.getbbox()
    cropped = canvas.crop(bbox) if bbox else canvas
    return save_compact_png(cropped, OUT / f"{name}.png", colors=128)


def build_vehicle_strip(name: str, files: list) -> Path:
    """Pack 4 Kenney isometric directional vehicle PNGs [SE, SW, NW, NE] into a 4-column sprite strip."""
    imgs = [load_rgba(f) for f in files]
    cell_w = max(im.width for im in imgs) + 4
    cell_h = max(im.height for im in imgs) + 4
    strip = Image.new("RGBA", (cell_w * 4, cell_h), (0, 0, 0, 0))
    for i, im in enumerate(imgs):
        px = i * cell_w + (cell_w - im.width) // 2
        py = cell_h - im.height - 2
        strip.alpha_composite(im, (px, py))
    return save_compact_png(strip, OUT / f"{name}.png", colors=128)


def copy_compact(src_name: str, dest_name: str) -> Path:
    im = load_rgba(src_name)
    return save_compact_png(im, OUT / f"{dest_name}.png", colors=128)


files_manifest = []


def record(asset_id: str, dest: Path, sources: list, kind: str):
    resolved = [Path(s) if Path(s).is_absolute() else (SRC / s) for s in sources]
    files_manifest.append({
        "id": asset_id,
        "file": str(dest.relative_to(ROOT)),
        "bytes": dest.stat().st_size,
        "sha256": sha256_file(dest),
        "processing": {
            "kind": kind,
            "sourceFiles": [str(p.relative_to(ROOT)) for p in resolved],
            "sourceSha256": [sha256_file(p) for p in resolved],
            "tool": "Pillow faithful compositing + PNG-8 quantization",
        },
    })


base_dest, base_sources = build_city_base()
record("city.base", base_dest, base_sources, "isometric-tile-composite")

for gap_name, (gx, gy, axis) in GAP_TILES.items():
    patch_dest, patch_sources = build_gap_patch(gap_name, gx, gy, axis)
    record(f"road.{gap_name}", patch_dest, patch_sources, "isometric-road-patch")

# Distinct downtown landmarks & waterfront neighborhood buildings
record("building.depot", build_building("building.depot", "building25.png", "building84.png", 1), ["building25.png", "building84.png"], "isometric-building-stack")
record("building.market", build_building("building.market", "building18.png", "building69.png", 1), ["building18.png", "building69.png"], "isometric-building-stack")
record("building.cafe", build_building("building.cafe", "building43.png", "building88.png", 1), ["building43.png", "building88.png"], "isometric-building-stack")
record("building.office", build_building("building.office", "building15.png", "building96.png", 3), ["building15.png", "building96.png"], "isometric-building-stack")
record("building.house", build_building("building.house", "building32.png", "building80.png", 1), ["building32.png", "building80.png"], "isometric-building-stack")
record("building.tower", build_building("building.tower", "building11.png", "building84.png", 2), ["building11.png", "building84.png"], "isometric-building-stack")
record("building.shop", build_building("building.shop", "building0.png", "building69.png", 1), ["building0.png", "building69.png"], "isometric-building-stack")
record("building.villa", build_building("building.villa", "building39.png", "building96.png", 2), ["building39.png", "building96.png"], "isometric-building-stack")

# Streetscape props
record("prop.tree", copy_compact("tree.png", "prop.tree"), ["tree.png"], "png8-copy")
record("prop.lamp", copy_compact("lamp.png", "prop.lamp"), ["lamp.png"], "png8-copy")

# 3 distinct 4-directional isometric animated vehicle strips [SE, SW, NW, NE]
taxi_files = ["taxiSE.png", "taxiSW.png", "taxiNW.png", "taxiNE.png"]
record("vehicle.taxi", build_vehicle_strip("vehicle.taxi", taxi_files), taxi_files, "iso-4-sprite-pack")

police_files = [
    ORIG_VEH / "Police/police_SE.png",
    ORIG_VEH / "Police/police_SW.png",
    ORIG_VEH / "Police/police_NW.png",
    ORIG_VEH / "Police/police_NE.png",
]
record("vehicle.police", build_vehicle_strip("vehicle.police", police_files), police_files, "iso-4-sprite-pack")

cargo_files = [
    ORIG_VEH / "Garbage/garbage_SE.png",
    ORIG_VEH / "Garbage/garbage_SW.png",
    ORIG_VEH / "Garbage/garbage_NW.png",
    ORIG_VEH / "Garbage/garbage_NE.png",
]
record("vehicle.cargo", build_vehicle_strip("vehicle.cargo", cargo_files), cargo_files, "iso-4-sprite-pack")

plan = {
    "format": "tora-native-asset-plan-1",
    "source": {
        "id": "kenney-isometric-city-collection",
        "author": "Kenney",
        "sourceUrl": "https://kenney.nl/assets/isometric-tiles-city",
        "license": "CC0-1.0",
        "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
        "licenseFiles": [
            "fixtures/traffic-tycoon/licenses/isometric-tiles-city.txt",
            "fixtures/traffic-tycoon/licenses/isometric-tiles-buildings.txt",
            "fixtures/traffic-tycoon/licenses/isometric-tiles-landscape.txt",
            "fixtures/traffic-tycoon/licenses/isometric-tiles-vehicles.txt",
        ],
        "attributionRequired": False,
    },
    "visualDirection": "Sunlit isometric waterfront metropolis with turquoise harbor canal, tree-lined waterfront boulevard with live ambient traffic, multi-story downtown skyline, crosswalks, open-center architectural blueprint road gaps, and an express delivery highway from Depot to Market.",
    "preparation": "Faithful pixel compositing, PNG-8 alpha quantization, and 4-frame directional sprite packing from verified CC0 Kenney isometric packs.",
    "projection": {
        "originX": ORIGIN_X,
        "originY": ORIGIN_Y,
        "canvasW": CANVAS_W,
        "canvasH": CANVAS_H,
        "halfW": HALF_W,
        "halfH": HALF_H,
        "cols": COLS,
        "rows": ROWS,
    },
    "files": files_manifest,
}

PLAN_PATH.write_text(json.dumps(plan, indent=2) + "\n")
total_bytes = sum(f["bytes"] for f in files_manifest)
print(f"Prepared {len(files_manifest)} Traffic Tycoon assets ({total_bytes} bytes total) -> {PLAN_PATH.relative_to(ROOT)}")
