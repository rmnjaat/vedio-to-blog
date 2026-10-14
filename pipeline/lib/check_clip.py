#!/usr/bin/env python3
"""Gate for one finished clip (animate stage).

  check_clip.py <lecture-id> <clip-id>

Requires: lectures/<id>/animations/<clip>/storyboard.yaml (status: reviewed, ledger ids placed in the lesson) and
storyboard.md; the lab clip learn/animations-lab/src/clips/<clip>/ with timeline.ts (META.id == clip, a `phone` canvas,
STILLS) and exactly one capitalised component with a default export; render-check output (wide and phone contact
sheets, light and dark stills) newer than the clip's code; a review file lectures/<id>/animations/<clip>/review.md;
the site copy site/src/animations/clips/<clip>/ identical to the lab clip; and a passing isolated type-check.
"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
lec, clip = sys.argv[1], sys.argv[2]
L = ROOT / "lectures" / lec
A = L / "animations" / clip
LAB = ROOT / "learn/animations-lab"
SRC = LAB / "src/clips" / clip
SITE = ROOT / "site/src/animations/clips" / clip
errors = []
E = errors.append

for f in ["storyboard.yaml", "storyboard.md", "review.md"]:
    if not (A / f).exists() or (A / f).stat().st_size == 0: E(f"missing lectures/{lec}/animations/{clip}/{f}")
sb = (A / "storyboard.yaml").read_text() if (A / "storyboard.yaml").exists() else ""
if sb and not re.search(r"^status:\s*reviewed\b", sb, re.M): E("storyboard.yaml status is not 'reviewed'")
if sb and not re.search(rf"^id:\s*{re.escape(clip)}\s*$", sb, re.M): E(f"storyboard.yaml id is not {clip}")
placement = json.loads((L / "lesson/placement.json").read_text())["placements"]
for i in sorted(set(re.findall(r"L-\d{4}", sb))):
    if i not in placement: E(f"storyboard cites {i}, which is not placed in the lesson")

tl = (SRC / "timeline.ts").read_text() if (SRC / "timeline.ts").exists() else ""
if not tl: E(f"missing learn/animations-lab/src/clips/{clip}/timeline.ts")
else:
    if not re.search(rf"id:\s*['\"]{re.escape(clip)}['\"]", tl): E(f"timeline.ts META.id is not '{clip}'")
    if not re.search(r"\bphone\s*:\s*\{", tl): E("timeline.ts META has no `phone` canvas (portrait layout for <= 640 px)")
    if "STILLS" not in tl: E("timeline.ts exports no STILLS (render-check frames)")
    if re.search(r"Math\.random|Date\.now|new Date\(", tl): E("timeline.ts is not deterministic")
comps = [p for p in SRC.glob("*.tsx") if p.name[0].isupper()] if SRC.exists() else []
if len(comps) != 1: E(f"the lab clip needs exactly one capitalised component .tsx (found {[p.name for p in comps]})")
else:
    c = comps[0].read_text()
    if "export default" not in c: E(f"{comps[0].name} has no default export")
    if re.search(r"Math\.random|Date\.now|new Date\(|setTimeout|setInterval|useState", c): E(f"{comps[0].name} is not a pure function of the frame (random/time/state)")
    if "layout" not in c: E(f"{comps[0].name} does not handle the `layout` prop ('wide' | 'phone')")

st = LAB / "renders" / clip / "stills"
code_mtime = max([p.stat().st_mtime for p in SRC.glob("*") if p.is_file()] or [0])
for sheet in ["_sheet-paper-full.png", "_sheet-blackboard-full.png", "_sheet-phone-paper-phone.png", "_sheet-phone-blackboard-phone.png"]:
    p = st / sheet
    if not p.exists(): E(f"render-check sheet missing: renders/{clip}/stills/{sheet} (pipeline/bin/lab.sh check {clip} [--phone])")
    elif p.stat().st_mtime + 1 < code_mtime: E(f"renders/{clip}/stills/{sheet} is older than the clip's code: re-run the render-check after your last change")

if not SITE.exists(): E(f"not copied to the site (pipeline/bin/lab.sh copy {clip})")
else:
    for p in SRC.iterdir():
        if p.is_file() and p.suffix in (".ts", ".tsx"):
            q = SITE / p.name
            if not q.exists() or q.read_bytes() != p.read_bytes(): E(f"site copy of {p.name} differs from the lab (re-run lab.sh copy {clip})")

if not errors:
    r = subprocess.run([str(ROOT / "pipeline/bin/lab.sh"), "tsc", clip], capture_output=True, text=True)
    if r.returncode != 0: E("type-check failed:\n" + (r.stdout + r.stderr)[-1500:])

for e in errors: print("ERROR", e)
print(f"clip {clip}: " + ("OK" if not errors else f"FAILED ({len(errors)} errors)"))
sys.exit(1 if errors else 0)
