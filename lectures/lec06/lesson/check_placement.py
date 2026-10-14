#!/usr/bin/env python3
"""Check lectures/lec06/lesson/placement.json against the ledger, outline, fact-check and additions.

Run from anywhere:  python3 "lectures/lec06/lesson/check_placement.py"
Exits non-zero on any failure.
"""
import json, re, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
LEDGER = ROOT / "lectures/lec06/ledger/ledger.jsonl"
FC = ROOT / "lectures/lec06/factcheck"
# final.jsonl already carries the verifier overrides (verdict_overrides.jsonl); re-apply them anyway.
OVERRIDES = {}
for _l in (FC / "verdict_overrides.jsonl").open():
    _d = json.loads(_l); OVERRIDES[_d["id"]] = (_d["verdict"], _d["severity"])

errors, warns = [], []
P = json.loads((HERE / "placement.json").read_text())
ledger = [json.loads(l) for l in LEDGER.open()]
ids = [d["id"] for d in ledger]

# 1. coverage: every ledger id exactly once, placed or dropped
placed = set(P["placements"])
dropped = {d["id"] for d in P["dropped"]}
both = placed & dropped
if both: errors.append(f"ids both placed and dropped: {sorted(both)}")
missing = [i for i in ids if i not in placed and i not in dropped]
if missing: errors.append(f"ids missing: {missing}")
extra = sorted((placed | dropped) - set(ids))
if extra: errors.append(f"ids not in ledger: {extra}")
for d in P["dropped"]:
    if not d.get("reason"): errors.append(f"dropped {d['id']} has no reason")

# 2. dropped items must be admin_reference (only pure logistics may be dropped)
types = {d["id"]: d["type"] for d in ledger}
for i in dropped:
    if types[i] != "admin_reference": errors.append(f"dropped {i} is {types[i]}, not admin")

# 3. sections and components valid; sections exist in outline.md
outline = (HERE / "outline.md").read_text()
heads = set(re.findall(r"^### (\d\.\d) ", outline, re.M)) | set(re.findall(r"^## (\d) ·", outline, re.M))
heads.add("about")
comps = set(P["components"])
for i, p in P["placements"].items():
    for loc in [p] + p["also"]:
        if loc["section"] not in P["sections"]: errors.append(f"{i}: unknown section {loc['section']}")
        if loc["section"] not in heads: errors.append(f"{i}: section {loc['section']} not a heading in outline.md")
        if loc["component"] not in comps: errors.append(f"{i}: unknown component {loc['component']}")
    if not p["note"].strip(): errors.append(f"{i}: empty note")
for s in P["sections"]:
    if s not in heads: errors.append(f"section {s} in placement.json has no heading in outline.md")

# 4. every placed id is mentioned in outline.md (writer can find it)
for i in placed:
    if i not in outline: errors.append(f"{i} placed but not mentioned in outline.md")

# 5. fact-check policy: SourceNote for wrong / outdated / imprecise medium+high
verdicts = {}
for l in (FC / "final.jsonl").open():
    d = json.loads(l); verdicts[d["id"]] = (d["verdict"], d["severity"])
verdicts.update(OVERRIDES)
need_sn = {i for i, (v, s) in verdicts.items()
           if v in ("wrong", "outdated") or (v == "imprecise" and s in ("medium", "high"))}
sn_ids = {i for ids_ in P["source_notes"].values() for i in ids_}
for i in sorted(need_sn - sn_ids): errors.append(f"{i} needs a SourceNote ({verdicts[i]})")
for i in sorted(sn_ids - need_sn): warns.append(f"{i} has a SourceNote but policy doesn't require one ({verdicts.get(i)})")
for i in sn_ids:
    p = P["placements"].get(i)
    if not p: errors.append(f"SourceNote id {i} not placed"); continue
    if not any(l["component"] == "SourceNote" for l in [p] + p["also"]):
        errors.append(f"{i} has a SourceNote but no SourceNote location in placement")
    if p.get("source_note") is None: errors.append(f"{i} missing source_note field")
for sn in P["source_notes"]:
    if sn not in outline: errors.append(f"{sn} not mentioned in outline.md")
fa = (HERE / "factcheck_applied.md")
if fa.exists():
    t = fa.read_text()
    flagged = [i for i, (v, s) in verdicts.items() if v != "accurate" or s != "none"]
    for i in flagged:
        if i not in t: errors.append(f"flagged {i} not in factcheck_applied.md")
else:
    warns.append("factcheck_applied.md not written yet")

# 6. additions: every 'keep' placed; every addition either placed or listed as not used
adds = [json.loads(l) for l in (FC / "additions_verified.jsonl").open()]
for a in adds:
    k = a["add_id"]
    if k in P["additions"] and k in P["additions_not_used"]: errors.append(f"{k} both used and not used")
    if a["usefulness"] == "keep" and k not in P["additions"]: errors.append(f"keep addition {k} not placed")
    if k not in P["additions"] and k not in P["additions_not_used"]: errors.append(f"addition {k} unaccounted")

# 7. figures/animations/prompts files mention ids they claim (if present)
for name in ["figures.md", "animations.md", "prompts.md"]:
    f = HERE / name
    if not f.exists(): warns.append(f"{name} not written yet"); continue
    for i in re.findall(r"L-\d{4}", f.read_text()):
        if i not in placed: errors.append(f"{name} cites {i}, which is not placed")

print(f"ledger {len(ids)} | placed {len(placed)} | dropped {len(dropped)} | "
      f"source notes {len(P['source_notes'])} covering {len(sn_ids)} ids | additions used {len(P['additions'])}, "
      f"not used {len(P['additions_not_used'])}")
for w in warns: print("WARN ", w)
for e in errors: print("ERROR", e)
print("OK" if not errors else f"FAILED ({len(errors)} errors)")
sys.exit(1 if errors else 0)
