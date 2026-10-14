#!/usr/bin/env python3
"""Gate for one section writer's work (page stage).

  check_part.py <lecture-id> <writer> [--no-build]

For every part of the writer's chapters (lesson/chapters.json):
  - the part file exists and is no longer a pipeline stub
  - every section of the part has its <Section id="s<N>-<M>"> (or id="s<N>" for a chapter without subsections)
  - every ledger id placed in those sections (primary or `also`) is tagged in the part ([[...]] or k="...")
  - no ledger id that is not in the ledger; no dialogue or student names ("Student 3", "Teacher:", "Q:"/"A:" lines)
  - every figure module the part imports exists under site/src/figures/<id>/
Then (unless --no-build) an isolated build of just these parts and the coverage check on the built pages
(pipeline/bin/site.sh build/coverage --parts ...), which proves each id is on the page of its chapter.
"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
lec, writer = sys.argv[1], sys.argv[2]
L = ROOT / "lectures" / lec
C = json.loads((L / "lesson/chapters.json").read_text())
P = json.loads((L / "lesson/placement.json").read_text())
ledger = {json.loads(l)["id"] for l in (L / "ledger/ledger.jsonl").open() if l.strip()}
CONTENT = ROOT / "site/src/content/lectures" / lec
errors = []
E = errors.append

mine = [(ch, p) for ch in C["chapters"] if ch["writer"] == writer for p in ch["parts"]]
if not mine:
    print(f"no parts for writer {writer}"); sys.exit(1)
parts = [p["file"] for _, p in mine]
for ch, part in mine:
    f = CONTENT / f"{part['file']}.mdx"
    if not f.exists(): E(f"missing {f.relative_to(ROOT)}"); continue
    src = f.read_text()
    if "PIPELINE-STUB" in src: E(f"{part['file']}.mdx is still the pipeline stub"); continue
    ids_in = set(re.findall(r"L-\d{4}", " ".join(re.findall(r"\[\[([^\]]*)\]\]", src) + re.findall(r'\bk="([^"]*)"', src) +
                                                    re.findall(r"stepK=\{([^}]*)\}", src) + re.findall(r"k:\s*['\"]([^'\"]*)['\"]", src))))
    for s in part["sections"]:
        sid = "s" + s.replace(".", "-")
        if not re.search(rf'<Section[^>]*\bid="{re.escape(sid)}"', src): E(f"{part['file']}: no <Section id=\"{sid}\"> for section {s}")
    need = sorted(i for i, p in P["placements"].items() if any(l["section"] in part["sections"] for l in [p] + p.get("also", [])))
    miss = [i for i in need if i not in ids_in]
    if miss: E(f"{part['file']}: {len(miss)} placed ids not tagged: {' '.join(miss)}")
    unknown = sorted(i for i in ids_in if i not in ledger)
    if unknown: E(f"{part['file']}: ids not in the ledger: {' '.join(unknown)}")
    prose = re.sub(r"\{/\*.*?\*/\}", "", src, flags=re.S)
    for pat, why in [(r"\b[Ss]tudent\s*\d+", "student label"), (r"^\s*(\*\*)?(Teacher|Student|Q|A)(\*\*)?\s*:", "dialogue line"),
                     (r"\bSTUDENT_\d+", "speaker id")]:
        for m in re.finditer(pat, prose, re.M):
            E(f"{part['file']}: {why} '{m.group(0).strip()}' (own voice: no dialogue, no student names)")
    for m in re.finditer(r"from\s+['\"](\.\./\.\./\.\./figures/[^'\"]+)['\"]", src):
        target = (f.parent / m.group(1)).resolve()
        if not any(target.with_suffix(x).exists() for x in (".tsx", ".ts")) and not target.exists():
            E(f"{part['file']}: imports {m.group(1)}, which does not exist")
    print(f"{part['file']}: {len(need)} placed ids, {len(need) - len(miss)} tagged")

if not errors and "--no-build" not in sys.argv:
    tag = f"w-{writer}"
    r = subprocess.run([str(ROOT / "pipeline/bin/site.sh"), "build", lec, "--parts", ",".join(parts), "--tag", tag], capture_output=True, text=True)
    print(r.stdout[-2500:])
    if r.returncode != 0: E("isolated build of your parts failed (see above)")
    else:
        r = subprocess.run([str(ROOT / "pipeline/bin/site.sh"), "coverage", lec, "--parts", ",".join(parts), "--tag", tag], capture_output=True, text=True)
        print(r.stdout[-3000:])
        if r.returncode != 0: E("coverage of your parts failed on the built pages (see above)")

for e in errors: print("ERROR", e)
print(f"writer {writer}: " + ("OK" if not errors else f"FAILED ({len(errors)} errors)"))
sys.exit(1 if errors else 0)
