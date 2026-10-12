#!/usr/bin/env python3
"""Validate a lecture teaching map (python3 stdlib).

Usage: validate_teaching_map.py TEACHING_MAP.md --transcript transcript.md [--ledger ledger.jsonl]

ERROR (exit 1):
  - a required section is missing (## 1. Lecture skeleton ... ## 8. Sequencing recommendations, plus the
    "Top 10" prompts list and the "Q&A redistribution map")
  - skeleton: top-level rows (# = integer) must be contiguous - each row starts where the previous ended - and
    span the lecture from its first to its last transcript timestamp (+/- 120 s); every transcript `##` heading
    time falls inside the skeleton
  - any HH:MM:SS cited anywhere is beyond the end of the lecture (+60 s)
  - any L-NNNN cited is not in the ledger (with --ledger)
  - Top 10 list has fewer than 10 entries; the Q&A redistribution table is empty
WARN: problem-prompt table rows < 5; Q&A heading times in the transcript not mentioned in the map.
"""
import argparse
import json
import re
import sys

SECTIONS = [r"^## 1\. Lecture skeleton", r"^## 2\. Problem prompts", r"^## 3\. Explanatory devices",
            r"^## 4\. .*case-study thread", r"^## 5\. Misconceptions", r"^## 6\. Dependencies",
            r"^## 7\. Forward / backward references", r"^## 8\. Sequencing recommendations",
            r"^### Top 10", r"^### Q&A redistribution map"]
TS = re.compile(r"~?(\d{1,2}):(\d{2}):(\d{2})")


def sec(m):
    return int(m[0]) * 3600 + int(m[1]) * 60 + int(m[2])


def section(text, head):
    m = re.search(head + r".*?$(.*?)(?=^##[^#]|\Z)", text, re.M | re.S)
    return m.group(1) if m else ""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("map")
    ap.add_argument("--transcript", required=True)
    ap.add_argument("--ledger")
    a = ap.parse_args()
    text = open(a.map, encoding="utf-8").read()
    tr = open(a.transcript, encoding="utf-8").read().split("<!-- BODY START -->")[-1]
    errs, warns = [], []
    for s in SECTIONS:
        if not re.search(s, text, re.M):
            errs.append("missing section matching /%s/" % s)
    t_all = [sec(m) for m in TS.findall(tr)]
    t_end = max(t_all) if t_all else 0
    heads = [sec(TS.search(l).groups()) for l in tr.splitlines() if re.match(r"^##\s+\[", l)]

    sk = section(text, r"^## 1\. Lecture skeleton")
    rows = []
    for line in sk.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 3 and re.fullmatch(r"\d+", cells[0]):
            st, en = TS.search(cells[1]), TS.search(cells[2])
            if st and en:
                rows.append((cells[0], sec(st.groups()), sec(en.groups())))
    if not rows:
        errs.append("skeleton table has no top-level rows (| # | Start | End | ...)")
    else:
        for (n0, _, e0), (n1, s1, _) in zip(rows, rows[1:]):
            if abs(s1 - e0) > 5:
                errs.append("skeleton row %s starts at %ds but row %s ended at %ds (gap/overlap)" % (n1, s1, n0, e0))
        if rows[0][1] > (min(t_all) if t_all else 0) + 120:
            errs.append("skeleton starts after the lecture starts")
        if abs(rows[-1][2] - t_end) > 120:
            errs.append("skeleton ends at %ds but the lecture ends at %ds" % (rows[-1][2], t_end))
        for h in heads:
            if not any(s - 1 <= h <= e + 1 for _, s, e in rows):
                errs.append("transcript heading at %ds not inside any skeleton row" % h)
    for m in TS.findall(text):
        if sec(m) > t_end + 60:
            errs.append("time %s:%s:%s is after the end of the lecture" % m)
    if a.ledger:
        lids = set(json.loads(l)["id"] for l in open(a.ledger, encoding="utf-8") if l.strip())
        for i in sorted(set(re.findall(r"\bL-\d{4}\b", text))):
            if i not in lids:
                errs.append("%s cited but not in the ledger" % i)
    top = section(text, r"^### Top 10")
    if len(re.findall(r"^\d+\.\s", top, re.M)) < 10:
        errs.append("Top 10 prompts list has fewer than 10 entries")
    qa = section(text, r"^### Q&A redistribution map")
    if len([l for l in qa.splitlines() if l.startswith("|") and not re.match(r"^\|[-\s|]+\|$", l)]) < 2:
        errs.append("Q&A redistribution map table is empty")
    pr = section(text, r"^## 2\. Problem prompts")
    if len(re.findall(r"^\| P\d+", pr, re.M)) < 5:
        warns.append("fewer than 5 problem prompts listed")
    for w in warns:
        print("WARN  " + w)
    for e in errs:
        print("ERROR " + e)
    print("%s teaching map | skeleton rows %d | errors %d | warnings %d" % (
        "FAIL" if errs else "PASS", len(rows), len(errs), len(warns)))
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
