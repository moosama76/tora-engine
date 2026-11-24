"""Render crisp high-DPI sunlit sprites from verified CC0 Kenney Mini Golf Kit OBJ models via Blender."""
import hashlib
import json
import math
import os
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[3]
KIT = ROOT / ".data" / "T029" / "originals" / "minigolf-kit" / "Models" / "OBJ format"
FALLBACK_KIT = ROOT / "fixtures" / "mini-golf" / "models"
OUT = ROOT / "assets" / "tora-golf" / "imported"
PLAN_PATH = ROOT / "assets" / "tora-golf" / "plan.json"
OUT.mkdir(parents=True, exist_ok=True)


def sha256_file(path: Path) -> str:
    return "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items.keys() else "CYCLES"
    if scene.render.engine == "CYCLES":
        scene.cycles.samples = 16
        scene.cycles.use_denoising = False
    else:
        scene.eevee.taa_render_samples = 16
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"

    # Bright warm sunlit world ambient
    world = bpy.data.worlds.new("SunlitWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.95, 0.98, 1.0, 1.0)
        bg.inputs[1].default_value = 0.85

    # Warm key sun
    sun_data = bpy.data.lights.new("SunKey", type="SUN")
    sun_data.energy = 2.6
    sun_data.color = (1.0, 0.97, 0.91)
    sun = bpy.data.objects.new("SunKey", sun_data)
    scene.collection.objects.link(sun)
    sun.rotation_euler = (math.radians(42), math.radians(15), math.radians(-35))

    # Cool sky fill sun
    fill_data = bpy.data.lights.new("SkyFill", type="SUN")
    fill_data.energy = 0.9
    fill_data.color = (0.78, 0.92, 1.0)
    fill = bpy.data.objects.new("SkyFill", fill_data)
    scene.collection.objects.link(fill)
    fill.rotation_euler = (math.radians(60), math.radians(-20), math.radians(135))
    return scene


def import_obj(obj_path: Path):
    before = set(bpy.context.scene.objects)
    bpy.ops.wm.obj_import(filepath=str(obj_path))
    imported = [obj for obj in bpy.context.scene.objects if obj not in before]
    for obj in imported:
        if obj.type == "MESH":
            for mat in obj.data.materials:
                if mat and mat.use_nodes:
                    for node in mat.node_tree.nodes:
                        if node.type == "BSDF_PRINCIPLED":
                            node.inputs["Roughness"].default_value = 0.42
                            if "Specular IOR Level" in node.inputs:
                                node.inputs["Specular IOR Level"].default_value = 0.35
    return imported


def render_model(asset_id: str, obj_name: str, res: tuple[int, int], elev_deg: float, azim_deg: float, padding: float = 1.18, tint_white: bool = False):
    scene = reset_scene()
    obj_path = KIT / obj_name
    if not obj_path.exists():
        obj_path = FALLBACK_KIT / obj_name
    objs = import_obj(obj_path)
    if tint_white:
        if scene.world and scene.world.use_nodes:
            bg = scene.world.node_tree.nodes.get("Background")
            if bg:
                bg.inputs[1].default_value = 0.28
        for obj in objs:
            if obj.type == "MESH":
                mat = bpy.data.materials.new("IvoryGolfBall")
                mat.use_nodes = True
                bsdf = mat.node_tree.nodes.get("Principled BSDF")
                if bsdf:
                    bsdf.inputs["Base Color"].default_value = (0.94, 0.95, 0.92, 1.0)
                    bsdf.inputs["Roughness"].default_value = 0.35
                obj.data.materials.clear()
                obj.data.materials.append(mat)

    # Compute world-space bounding box
    bpy.context.view_layer.update()
    corners = []
    for obj in objs:
        if obj.type == "MESH":
            for v in obj.bound_box:
                corners.append(obj.matrix_world @ Vector(v))
    min_v = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    max_v = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    center = (min_v + max_v) * 0.5
    size = max_v - min_v

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.type = "ORTHO"
    cam = bpy.data.objects.new("Cam", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam

    elev = math.radians(elev_deg)
    azim = math.radians(azim_deg)
    dist = max(size.length * 3.0, 4.0)
    cam.location = center + Vector((
        dist * math.cos(elev) * math.sin(azim),
        -dist * math.cos(elev) * math.cos(azim),
        dist * math.sin(elev),
    ))
    direction = (center - cam.location).normalized()
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    bpy.context.view_layer.update()

    # Exact ortho framing from projected bounding box corners
    inv = cam.matrix_world.inverted()
    proj = [inv @ c for c in corners]
    span_x = max(p.x for p in proj) - min(p.x for p in proj)
    span_y = max(p.y for p in proj) - min(p.y for p in proj)
    aspect = res[0] / res[1]
    ortho_w = max(span_x, span_y * aspect) * padding
    cam_data.ortho_scale = max(ortho_w, 0.05)

    # Re-center camera cleanly onto projected bbox center
    cx = (max(p.x for p in proj) + min(p.x for p in proj)) * 0.5
    cy = (max(p.y for p in proj) + min(p.y for p in proj)) * 0.5
    cam.location = cam.matrix_world @ Vector((cx, cy, 0.0))

    scene.render.resolution_x = res[0]
    scene.render.resolution_y = res[1]
    scene.render.resolution_percentage = 100
    dest = OUT / f"{asset_id}.png"
    scene.render.filepath = str(dest)
    bpy.ops.render.render(write_still=True)

    return {
        "id": asset_id,
        "file": str(dest.relative_to(ROOT)),
        "sha256": sha256_file(dest),
        "processing": {
            "kind": "blender-orthographic-render",
            "sourceFile": str(obj_path.relative_to(ROOT)),
            "sourceSha256": sha256_file(obj_path),
            "tool": "Blender 4.5.9 LTS orthographic render from immutable Kenney CC0 OBJ",
        },
    }


def main():
    manifest = [
        render_model("golf.ball", "ball-blue.obj", (96, 96), elev_deg=50, azim_deg=35, padding=1.22, tint_white=True),
        render_model("golf.flag", "flag-red.obj", (128, 160), elev_deg=20, azim_deg=35, padding=1.28),
        render_model("golf.club", "club-red.obj", (128, 160), elev_deg=18, azim_deg=-30, padding=1.28),
        render_model("golf.castle", "castle.obj", (192, 160), elev_deg=36, azim_deg=32, padding=1.18),
        render_model("golf.windmill", "windmill.obj", (192, 192), elev_deg=32, azim_deg=30, padding=1.18),
    ]

    # Copy faithful Kenney CC0 isometric tree for lush course border framing
    tree_src = ROOT / "fixtures" / "traffic-tycoon" / "assets" / "tree.png"
    tree_dst = OUT / "golf.tree.png"
    tree_dst.write_bytes(tree_src.read_bytes())
    manifest.append({
        "id": "golf.tree",
        "file": str(tree_dst.relative_to(ROOT)),
        "sha256": sha256_file(tree_dst),
        "processing": {
            "kind": "identity-copy",
            "sourceFile": str(tree_src.relative_to(ROOT)),
            "sourceSha256": sha256_file(tree_src),
            "tool": "exact byte copy",
        },
    })

    plan = {
        "format": "tora-native-asset-plan-1",
        "source": {
            "id": "kenney-minigolf-kit",
            "author": "Kenney",
            "sourceUrl": "https://kenney.nl/assets/minigolf-kit",
            "license": "CC0-1.0",
            "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
            "licenseFile": "fixtures/mini-golf/licenses/minigolf-kit.txt",
            "attributionRequired": False,
        },
        "visualDirection": "Sunlit miniature golf course with sky-blue backdrop, lush mowed emerald fairway, warm cedar wooden rails, crisp red flag, castle & windmill course props, and warm cream HUD pills.",
        "preparation": "High-resolution orthographic PNG sprites rendered deterministically via Blender from immutable CC0 Kenney Mini Golf Kit OBJ models.",
        "files": manifest,
    }
    PLAN_PATH.write_text(json.dumps(plan, indent=2) + "\n")
    print(f"Prepared {len(manifest)} Mini Golf assets -> {PLAN_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
