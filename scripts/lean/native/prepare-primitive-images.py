from pathlib import Path
from PIL import Image
import hashlib
import json

for kind in ("sports", "racing"):
    root = Path("assets") / f"kenney-{kind}"
    plan_path = root / "plan.json"
    plan = json.loads(plan_path.read_text())
    for entry in plan["files"]:
        source = Path(entry["file"])
        output = root / "imported" / f"{entry['id']}.png"
        output.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as image:
            image.convert("RGBA").save(output, format="PNG", optimize=True)
        original = entry["sha256"]
        entry["processing"] = {
            "kind": "png-rgba8-conversion",
            "sourceFile": str(source),
            "sourceSha256": original,
            "tool": "Pillow Image.convert(RGBA)",
        }
        entry["file"] = str(output)
        entry["sha256"] = "sha256:" + hashlib.sha256(output.read_bytes()).hexdigest()
    plan_path.write_text(json.dumps(plan, indent=2) + "\n")
