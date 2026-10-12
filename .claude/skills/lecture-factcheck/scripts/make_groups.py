#!/usr/bin/env python3
"""Split the ledger into N topic groups for parallel fact-checkers.

Usage: make_groups.py LEDGER.jsonl OUT.json [--n 3]

admin_reference items are skipped (nothing to fact-check). Items are grouped by top-level topic (the part of
`topic` before the first " > "). Major roots (>= 5% of items) are ordered by where they are taught (median position)
and cut into N contiguous runs with the most even sizes (lectures teach related topics next to each other, e.g.
caching+scaling | delegation+concurrency | communication); minor roots join the group of the major root
taught closest to them. Whole roots always stay with one checker. Group name = its two largest roots joined by "_" (e.g.
caching_scaling); abbr = first letters (CS) used for addition ids A-CS-01...
Writes [{"name", "abbr", "roots": [...], "ids": [...]}] and prints a summary.
"""
import argparse
import json
import re
from collections import Counter, OrderedDict


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ledger")
    ap.add_argument("out")
    ap.add_argument("--n", type=int, default=3)
    a = ap.parse_args()
    items = [json.loads(l) for l in open(a.ledger, encoding="utf-8") if l.strip()]
    check = [it for it in items if it.get("type") != "admin_reference" and not it["topic"].startswith("admin")]
    root = lambda it: re.sub(r"[^a-z0-9]+", "-", it["topic"].split(">")[0].strip().lower()).strip("-")  # noqa: E731
    counts = Counter(root(it) for it in check)
    where = {}
    for k, it in enumerate(check):
        where.setdefault(root(it), []).append(k)
    pos = {r: sorted(v)[len(v) // 2] for r, v in where.items()}  # median position = where the root is taught
    major = sorted([r for r in counts if counts[r] >= 0.05 * len(check)] or list(counts), key=pos.get)
    n = min(a.n, len(major))
    sizes = [counts[r] for r in major]
    # contiguous partition of major roots into n runs minimising the largest run (small exhaustive DP)
    best = {}

    def solve(i, k):
        if k == 1:
            return sum(sizes[i:]), [len(major)]
        if (i, k) in best:
            return best[(i, k)]
        res = None
        for j in range(i + 1, len(major) - k + 2):
            m, cuts = solve(j, k - 1)
            cand = (max(sum(sizes[i:j]), m), [j] + cuts)
            if res is None or cand[0] < res[0]:
                res = cand
        best[(i, k)] = res
        return res
    _, cuts = solve(0, n)
    groups, start = [], 0
    for c in cuts:
        groups.append({"roots": major[start:c], "ids": []})
        start = c
    owner = {r: g for g in groups for r in g["roots"]}
    for r in sorted(counts, key=pos.get):
        if r not in owner:
            owner[r] = owner[min(major, key=lambda m: abs(pos[m] - pos[r]))]
            owner[r]["roots"].append(r)
    for it in check:
        owner[root(it)]["ids"].append(it["id"])
    used, out = set(), []
    for g in groups:
        g["ids"].sort()
        name = "_".join(g["roots"][:2]).replace("-", "_") or "misc"
        abbr = "".join(x[0] for x in name.split("_")).upper()[:3]
        while abbr in used:
            abbr += "X"
        used.add(abbr)
        out.append(OrderedDict(name=name, abbr=abbr, roots=g["roots"], ids=g["ids"]))
    json.dump(out, open(a.out, "w"), indent=1)
    skipped = len(items) - len(check)
    for g in out:
        print("%-28s %-4s %4d items  roots: %s" % (g["name"], g["abbr"], len(g["ids"]), ", ".join(g["roots"])))
    print("skipped admin items: %d" % skipped)


if __name__ == "__main__":
    main()
