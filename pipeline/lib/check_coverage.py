#!/usr/bin/env python3
"""Coverage gate for a built lecture: every ledger id placed by the lesson design is on the built pages, on the page
of the chapter it was placed in.

  check_coverage.py <lecture-id> --html site/.builds/<id>/lectures/<id> [--sections 1.1,1.2 | --parts s1-a,s2-b] [--json]

Reads lectures/<id>/lesson/placement.json (id -> section) and lectures/<id>/lesson/chapters.json (section -> chapter
page, part file). With --sections/--parts only the ids placed in those sections (or the sections of those parts) are
required (a section writer's own check). Every element that teaches an item carries data-k="L-0001 ..." on the page.
Fails on: a placed id missing from the pages; an id found only on another chapter's page (reported as misplaced);
ids on the page that are not in the ledger; unconverted [[L-....]] markers.
"""
import argparse, json, os, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lecture")
    ap.add_argument("--html", required=True)
    ap.add_argument("--sections")
    ap.add_argument("--parts")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    L = ROOT / "lectures" / a.lecture
    P = json.loads((L / "lesson/placement.json").read_text())
    C = json.loads((L / "lesson/chapters.json").read_text())
    ledger = {}
    for line in (L / "ledger/ledger.jsonl").open():
        if line.strip():
            d = json.loads(line); ledger[d["id"]] = d
    html_dir = Path(a.html)
    if not html_dir.is_dir():
        print(f"no built pages at {html_dir} (build first: pipeline/bin/site.sh build {a.lecture})"); return 2

    # section -> chapter slug ('' = overview) and part
    sec_page, sec_part = {}, {}
    for s in C.get("overview_sections", ["about"]):
        sec_page[s] = ""; sec_part[s] = C.get("overview_part", "s0-header")
    for ch in C["chapters"]:
        for part in ch["parts"]:
            for s in part["sections"]:
                sec_page[s] = ch["slug"]; sec_part[s] = part["file"]

    want_secs = None
    if a.sections:
        want_secs = set(a.sections.split(","))
    if a.parts:
        parts = set(a.parts.split(","))
        want_secs = (want_secs or set()) | {s for s, p in sec_part.items() if p in parts}

    # ids per built page
    pages = {}
    for f in sorted(html_dir.rglob("index.html")):
        rel = f.parent.relative_to(html_dir).as_posix()
        slug = "" if rel == "." else rel
        html = f.read_text(encoding="utf-8")
        ids = set()
        for m in re.finditer(r'data-k="([^"]*)"', html):
            ids.update(x for x in re.split(r"[\s,]+", m.group(1)) if x)
        stray = re.findall(r"\[\[\s*L-\d{4}[^\]]*\]\]", html)
        pages[slug] = {"ids": ids, "stray": stray}
    on_any = set().union(*[p["ids"] for p in pages.values()]) if pages else set()

    required, missing, misplaced, unplaced_sec = [], [], [], []
    for i, p in P["placements"].items():
        locs = [p] + p.get("also", [])
        secs = [l["section"] for l in locs]
        if want_secs is not None and not (set(secs) & want_secs):
            continue
        required.append(i)
        # the pages where this id is allowed to be (its primary and 'also' sections)
        homes = {sec_page[s] for s in secs if s in sec_page}
        if not homes:
            unplaced_sec.append(f"{i}: section(s) {secs} are in no chapter of chapters.json"); continue
        if want_secs is not None:
            homes = {sec_page[s] for s in secs if s in want_secs and s in sec_page}
        if i not in on_any:
            missing.append(i)
        elif not any(i in pages.get(h, {"ids": set()})["ids"] for h in homes):
            where = [s or "overview" for s, pg in pages.items() if i in pg["ids"]]
            misplaced.append(f"{i}: placed in {secs} (page {sorted(h or 'overview' for h in homes)}) but found on {where}")
    unknown = sorted(on_any - set(ledger))
    stray = [s for pg in pages.values() for s in pg["stray"]]

    ok = not (missing or misplaced or unknown or stray or unplaced_sec)
    rep = {"lecture": a.lecture, "pages": {k or "overview": len(v["ids"]) for k, v in pages.items()},
           "required": len(required), "covered": len(required) - len(missing), "missing": missing,
           "misplaced": misplaced, "unknown": unknown, "stray_markers": stray[:10], "errors": unplaced_sec,
           "ledger_total": len(ledger), "ledger_on_pages": len(on_any & set(ledger)), "pass": ok}
    if a.json:
        print(json.dumps(rep, indent=1))
    else:
        scope = f" (sections {','.join(sorted(want_secs))})" if want_secs is not None else ""
        print(f"coverage {a.lecture}{scope}: {rep['covered']}/{rep['required']} placed ids on the pages; "
              f"ledger overall {rep['ledger_on_pages']}/{len(ledger)}")
        print("  ids per page: " + ", ".join(f"{k} {v}" for k, v in rep["pages"].items()))
        for i in missing:
            d = ledger.get(i, {})
            sec = P["placements"][i]["section"]
            print(f"  MISSING {i} [{d.get('importance', '?')}/{d.get('type', '?')}] placed in {sec}: {d.get('statement', '')[:110]}")
        for m in misplaced: print("  MISPLACED " + m)
        if unknown: print("  UNKNOWN ids on the pages (not in the ledger): " + " ".join(unknown))
        if stray: print("  UNCONVERTED markers: " + " ".join(stray[:5]))
        for e in unplaced_sec: print("  ERROR " + e)
        print("COVERAGE PASS" if ok else "COVERAGE FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
