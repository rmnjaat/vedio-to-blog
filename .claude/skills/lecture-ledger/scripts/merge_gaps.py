#!/usr/bin/env python3
"""Merge the per-part gap-hunter outputs into gaps.jsonl + gap_report.md.

Usage: merge_gaps.py LEDGER_DIR [--parts 3]

Reads   gaps_part<N>.jsonl   (items with temporary ids G<N>-NNN)
        gap_report_part<N>.md
Writes  gaps.jsonl           ids renumbered G-001.. in part order; depends_on references to temp ids rewritten
        gap_report.md        header with the renumbering, then every part report (temp ids rewritten)
Duplicate pairs reported by two hunters (cross-part) are not merged here; the editor dedupes them.
"""
import argparse
import json
import os
import re
import sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--parts", type=int, default=3)
    a = ap.parse_args()
    items, mapping = [], {}
    for n in range(1, a.parts + 1):
        p = os.path.join(a.dir, "gaps_part%d.jsonl" % n)
        if not os.path.exists(p):
            sys.exit("missing %s" % p)
        for line in open(p, encoding="utf-8"):
            if line.strip():
                it = json.loads(line)
                new = "G-%03d" % (len(items) + 1)
                mapping[it["id"]] = new
                it["id"] = new
                items.append(it)
    rx = re.compile(r"\bG\d+-\d{3}\b")
    sub = lambda s: rx.sub(lambda m: mapping.get(m.group(0), m.group(0)), s)  # noqa: E731
    with open(os.path.join(a.dir, "gaps.jsonl"), "w", encoding="utf-8") as f:
        for it in items:
            it["depends_on"] = [mapping.get(d, d) for d in it.get("depends_on") or []]
            f.write(json.dumps(it, ensure_ascii=False) + "\n")
    out = ["# Ledger gap report", "",
           "New items are in gaps.jsonl. Temporary ids were renumbered: " +
           (", ".join("%s->%s" % kv for kv in mapping.items()) or "(no missed items)") + ".", ""]
    for n in range(1, a.parts + 1):
        p = os.path.join(a.dir, "gap_report_part%d.md" % n)
        if not os.path.exists(p):
            sys.exit("missing %s" % p)
        out += [sub(open(p, encoding="utf-8").read()).rstrip(), ""]
    open(os.path.join(a.dir, "gap_report.md"), "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("gaps: %d items -> gaps.jsonl, gap_report.md" % len(items))


if __name__ == "__main__":
    main()
