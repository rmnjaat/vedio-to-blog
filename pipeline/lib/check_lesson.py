#!/usr/bin/env python3
"""Validate a lecture's lesson design (lectures/<id>/lesson/), generalised from lectures/lec01/lesson/check_placement.py.

  check_lesson.py <lecture-id> [--stage design|visuals|all]

design  : outline.md, placement.json, factcheck_applied.md, prompts.md, chapters.json
visuals : + figures.md, animations.md, clips.json   (all = design + visuals; default all)

Checks (exit 1 on any ERROR):
 1. every ledger id is placed or dropped exactly once; only admin_reference items may be dropped, each with a reason
 2. sections and components are valid; every section is a heading in outline.md ("## N · Title" / "### N.M Title";
    "about" is the lecture header); every placed id is mentioned in outline.md
 3. fact-check policy (factcheck/final.jsonl): wrong / outdated / imprecise-medium+ -> a SourceNote (source_notes + a
    SourceNote location);
    every id with a treatment other than "none" is in factcheck_applied.md
 4. additions (factcheck/additions_verified.jsonl): every "keep" addition is used; every addition is used or listed
 5. figures.md / animations.md / prompts.md only cite placed ids
 6. chapters.json: every placed section belongs to exactly one chapter part (or the overview); slugs and part names
    are valid; writer groups cover every chapter; page metadata present; kicker number = course position
 7. clips.json: 3-5 clips, ids start with the lecture's clip prefix, at most one per top-level section, sections
    valid, ledger ids placed, every clip described in animations.md, ids not used by another lecture's clip
"""
import argparse, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ap = argparse.ArgumentParser()
ap.add_argument("lecture")
ap.add_argument("--stage", choices=["design", "visuals", "all"], default="all")
a = ap.parse_args()
L = ROOT / "lectures" / a.lecture
D = L / "lesson"
errors, warns = [], []
E, W = errors.append, warns.append


def load_json(p):
    try:
        return json.loads(p.read_text())
    except Exception as e:  # noqa
        E(f"{p.relative_to(ROOT)}: cannot read JSON ({e})")
        return None


ledger = [json.loads(l) for l in (L / "ledger/ledger.jsonl").open() if l.strip()]
ids = [d["id"] for d in ledger]
types = {d["id"]: d["type"] for d in ledger}
need = ["outline.md", "placement.json", "factcheck_applied.md", "prompts.md", "chapters.json"]
if a.stage != "design":
    need += ["figures.md", "animations.md", "clips.json"]
for n in need:
    if not (D / n).exists() or (D / n).stat().st_size == 0:
        E(f"missing lesson/{n}")
if errors:
    for e in errors: print("ERROR", e)
    print(f"FAILED ({len(errors)} errors)"); sys.exit(1)

P = load_json(D / "placement.json")
outline = (D / "outline.md").read_text()
if P is None:
    print("FAILED"); sys.exit(1)
for k in ["sections", "components", "placements", "dropped", "source_notes", "additions", "additions_not_used"]:
    if k not in P: E(f"placement.json has no '{k}'")
if errors:
    for e in errors: print("ERROR", e)
    print("FAILED"); sys.exit(1)

# 1. every ledger id exactly once
placed = set(P["placements"])
dropped = {d["id"] for d in P["dropped"]}
if placed & dropped: E(f"ids both placed and dropped: {sorted(placed & dropped)}")
miss = [i for i in ids if i not in placed and i not in dropped]
if miss: E(f"ids neither placed nor dropped ({len(miss)}): {miss[:40]}")
extra = sorted((placed | dropped) - set(ids))
if extra: E(f"ids not in the ledger: {extra}")
for d in P["dropped"]:
    if not str(d.get("reason", "")).strip(): E(f"dropped {d['id']} has no reason")
    if types.get(d["id"]) != "admin_reference": E(f"dropped {d['id']} is {types.get(d['id'])}; only admin_reference may be dropped")

# 2. sections / components / outline
heads = set(re.findall(r"^### (\d+\.\d+)\s", outline, re.M)) | set(re.findall(r"^## (\d+) ·", outline, re.M)) | {"about"}
comps = set(P["components"])
for i, p in P["placements"].items():
    for loc in [p] + p.get("also", []):
        if loc.get("section") not in P["sections"]: E(f"{i}: unknown section {loc.get('section')}")
        elif loc["section"] not in heads: E(f"{i}: section {loc['section']} is not a heading in outline.md")
        if loc.get("component") not in comps: E(f"{i}: unknown component {loc.get('component')}")
    if not str(p.get("note", "")).strip(): E(f"{i}: empty note")
for s in P["sections"]:
    if s not in heads: E(f"section {s} in placement.json has no heading in outline.md")
for i in placed:
    if i not in outline: E(f"{i} placed but not mentioned in outline.md")

# 3. fact-check policy
final = {}
fpath = L / "factcheck/final.jsonl"
if fpath.exists():
    for l in fpath.open():
        if l.strip():
            d = json.loads(l); final[d["id"]] = d
else:
    W("no factcheck/final.jsonl: fact-check checks skipped")
# SourceNote ("More precisely") for wrong / outdated / imprecise-medium+ (the course policy, lectures/LESSON_DESIGN_BRIEF.md
# and lec01); every other flagged item (incl. simplified-medium) is at least treated in factcheck_applied.md
need_sn = {i for i, d in final.items() if d.get("verdict") in ("wrong", "outdated")
           or (d.get("verdict") == "imprecise" and d.get("severity") in ("medium", "high"))}
sn_ids = {i for v in P["source_notes"].values() for i in v}
for i in sorted(need_sn - sn_ids): E(f"{i} needs a SourceNote ({final[i]['verdict']}/{final[i]['severity']})")
for i in sorted(sn_ids - need_sn): W(f"{i} has a SourceNote though the policy does not require one ({final.get(i, {}).get('verdict')}/{final.get(i, {}).get('severity')})")
for i in sn_ids:
    p = P["placements"].get(i)
    if not p: E(f"SourceNote id {i} is not placed"); continue
    if not any(l["component"] == "SourceNote" for l in [p] + p.get("also", [])):
        E(f"{i} has a SourceNote but no SourceNote location in its placement")
for sn in P["source_notes"]:
    if sn not in outline: E(f"{sn} is not mentioned in outline.md")
fa = (D / "factcheck_applied.md").read_text()
for i, d in final.items():
    if d.get("treatment", "none") != "none" and i not in fa:
        E(f"fact-check item {i} ({d.get('treatment')}) is not in factcheck_applied.md")
    if d.get("treatment", "none") != "none" and i not in placed and i in dropped:
        E(f"fact-check item {i} ({d.get('treatment')}) is dropped")

# 4. additions
apath = L / "factcheck/additions_verified.jsonl"
adds = [json.loads(l) for l in apath.open() if l.strip()] if apath.exists() else []
used, not_used = P["additions"], P["additions_not_used"]
for ad in adds:
    k = ad["add_id"]
    if k in used and k in not_used: E(f"addition {k} both used and not used")
    if ad.get("usefulness") == "keep" and k not in used: E(f"keep addition {k} is not used")
    if k not in used and k not in not_used: E(f"addition {k} unaccounted (use it or list it in additions_not_used with a reason)")
for k, v in used.items():
    if isinstance(v, dict) and v.get("section") and v["section"] not in P["sections"]: E(f"addition {k}: unknown section {v['section']}")

# 5. other lesson files cite placed ids only
for name in ["figures.md", "animations.md", "prompts.md"]:
    f = D / name
    if f.exists():
        for i in sorted(set(re.findall(r"L-\d{4}", f.read_text()))):
            if i not in placed: E(f"{name} cites {i}, which is not placed")

# 6. chapters.json
C = load_json(D / "chapters.json")
course = None
cj = ROOT / "lectures/course.json"
if cj.exists():
    try:
        raw = json.loads(cj.read_text()); lst = raw if isinstance(raw, list) else raw.get("lectures", [])
        lst = sorted(lst, key=lambda x: x.get("position", 0))
        course = {x["id"]: n + 1 for n, x in enumerate(lst)}
    except Exception as e:  # noqa
        W(f"lectures/course.json unreadable: {e}")
if C:
    pg = C.get("page", {})
    for k in ["title", "kicker", "dek", "description"]:
        if not str(pg.get(k, "")).strip(): E(f"chapters.json page.{k} missing")
    if course and a.lecture in course:
        m = re.match(r"Lecture (\d+)", pg.get("kicker", ""))
        if not m or int(m.group(1)) != course[a.lecture]:
            E(f"chapters.json page.kicker must start 'Lecture {course[a.lecture]:02d}' (course position in lectures/course.json)")
    if not re.fullmatch(r"l\d+-", C.get("clip_prefix", "")): E("chapters.json clip_prefix must look like 'l02-'")
    sec_owner = {}
    for s in C.get("overview_sections", []):
        sec_owner.setdefault(s, []).append("overview")
    nums, files, writers = [], set(), {}
    for ch in C.get("chapters", []):
        for k in ["no", "slug", "title", "summary", "writer", "parts"]:
            if not ch.get(k): E(f"chapter {ch.get('no')}: '{k}' missing")
        if not re.fullmatch(r"[a-z0-9-]+", ch.get("slug", "")): E(f"chapter {ch.get('no')}: bad slug {ch.get('slug')}")
        if not re.search(rf"^## {re.escape(str(ch.get('no')))} ·", outline, re.M): E(f"chapter {ch.get('no')} has no '## {ch.get('no')} · …' heading in outline.md")
        nums.append(ch.get("no")); writers.setdefault(ch.get("writer"), []).append(ch.get("no"))
        for part in ch.get("parts", []):
            f = part.get("file", "")
            if not re.fullmatch(r"s[0-9][0-9a-z-]*", f): E(f"chapter {ch.get('no')}: bad part file name '{f}' (s<n>-<slug>)")
            if f in files: E(f"part file {f} used twice")
            files.add(f)
            if not part.get("sections"): E(f"part {f} has no sections")
            for s in part.get("sections", []):
                sec_owner.setdefault(s, []).append(f)
    if C.get("overview_part", "s0-header") in files: E("the overview part must not be a chapter part")
    for s, owners in sec_owner.items():
        if len(owners) > 1: E(f"section {s} belongs to several parts: {owners}")
        if s not in P["sections"]: E(f"chapters.json section {s} is not in placement.json sections")
    for s in P["sections"]:
        if s not in sec_owner:
            # a top-level chapter heading ("3") is fine if it has subsections that are owned
            if not any(x.startswith(s + ".") for x in sec_owner): E(f"section {s} is in no chapter part of chapters.json")
    if len(writers) < 1: E("no writer groups")
    for w, chs in writers.items():
        n_ids = sum(1 for i, p in P["placements"].items() if any(sec_owner.get(l["section"], [""])[0] in
                    {pt["file"] for ch in C["chapters"] if ch["writer"] == w for pt in ch["parts"]} for l in [p] + p.get("also", [])))
        if n_ids > 170: W(f"writer group {w} carries {n_ids} placed ids (a lot for one writer; lec01's largest was ~110)")

# 7. clips.json
if a.stage != "design":
    K = load_json(D / "clips.json")
    anim = (D / "animations.md").read_text()
    if isinstance(K, dict): K = K.get("clips")
    if not isinstance(K, list): E("clips.json must be a list of clips")
    else:
        if not 3 <= len(K) <= 5: E(f"clips.json has {len(K)} clips; the explainer-animation skill asks for 3-5 per lecture")
        tops = {}
        pre = (C or {}).get("clip_prefix", "")
        for c in K:
            cid = c.get("id", "")
            if not re.fullmatch(r"l\d+-[a-z0-9-]+", cid) or (pre and not cid.startswith(pre)): E(f"clip id '{cid}' must start with {pre} (lower-case, hyphens)")
            if cid not in anim: E(f"clip {cid} is not described in animations.md")
            if c.get("section") not in P["sections"]: E(f"clip {cid}: unknown section {c.get('section')}")
            top = str(c.get("section", "")).split(".")[0]
            tops.setdefault(top, []).append(cid)
            for i in c.get("ledger", []):
                if i not in placed: E(f"clip {cid} cites {i}, which is not placed")
            if not c.get("ledger"): E(f"clip {cid}: no ledger ids")
            if not c.get("title"): E(f"clip {cid}: no title")
            for other in (ROOT / "site/src/animations/clips").glob(cid):
                if not (L / "animations" / cid).exists() and not cid.startswith(pre): E(f"clip id {cid} already exists in the site")
        for t, cs in tops.items():
            if len(cs) > 1: E(f"section {t} has {len(cs)} clips ({cs}); at most one per top-level section")

nplaced, ndrop = len(placed), len(dropped)
print(f"{a.lecture}: ledger {len(ids)} | placed {nplaced} | dropped {ndrop} | source notes {len(P['source_notes'])} covering {len(sn_ids)} ids"
      f" | additions used {len(used)}, not used {len(not_used)}" + (f" | chapters {len(C['chapters'])}, writers {len({c['writer'] for c in C['chapters']})}" if C else ""))
for w in warns: print("WARN ", w)
for e in errors[:200]: print("ERROR", e)
print("OK" if not errors else f"FAILED ({len(errors)} errors)")
sys.exit(1 if errors else 0)
