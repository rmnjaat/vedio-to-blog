#!/usr/bin/env python3
"""Apply the fact-check policy: merge checker verdicts, verifier overrides and verified additions into one
decision per ledger item.  python3 stdlib.

Usage: apply_policy.py FACTCHECK_DIR --groups groups.json [--out final.jsonl]

Policy (the teacher's point always stays; we never rewrite what he taught, we add to it):
  wrong | outdated (any severity)            -> treatment "note": a sourced note shown next to the item
  imprecise with severity medium | high      -> "note"
  simplified with severity medium | high     -> "note"
  imprecise | simplified with severity low   -> "inline": a short clarification in the running text
  unverifiable with severity medium | high   -> "inline": say the claim is the teacher's and not independently verified
  accurate, or anything with severity none   -> "none"
Verifier overrides (verdict_overrides.jsonl) replace the checker's verdict/severity/note/sources first.
Verified additions (additions_verified.jsonl) with verdict confirmed|needs_rewording and usefulness keep|optional
are attached to their item with the verifier's final_text and sources; rejected / drop are left out.
Writes final.jsonl (one row per checked id) and policy_summary.md. Exit 1 if a "note" has no source.
"""
import argparse
import json
import os
import sys
from collections import Counter

SEV = {"none": 0, "low": 1, "medium": 2, "high": 3}


def jl(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()] if os.path.exists(p) else []


def treatment(v, s):
    s = SEV.get(s, 0)
    if v in ("wrong", "outdated"):
        return "note"
    if v in ("imprecise", "simplified"):
        return "note" if s >= 2 else ("inline" if s == 1 else "none")
    if v == "unverifiable" and s >= 2:
        return "inline"
    return "none"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--groups", required=True)
    ap.add_argument("--out")
    a = ap.parse_args()
    groups = json.load(open(a.groups))
    rows, attach = {}, {}
    for g in groups:
        for r in jl(os.path.join(a.dir, g["name"] + ".jsonl")):
            r["group"] = g["name"]
            rows[r["id"]] = r
        for x in jl(os.path.join(a.dir, g["name"] + "_additions.jsonl")):
            attach[x["add_id"]] = x
    overrides = {o["id"]: o for o in jl(os.path.join(a.dir, "verdict_overrides.jsonl"))}
    verified = jl(os.path.join(a.dir, "additions_verified.jsonl"))
    adds_by_item = {}
    for v in verified:
        if v.get("verdict") == "rejected" or v.get("usefulness") == "drop":
            continue
        src = attach.get(v["add_id"])
        if not src:
            continue
        adds_by_item.setdefault(src["attach_to"], []).append(
            {"add_id": v["add_id"], "text": v["final_text"], "sources": v.get("sources") or src.get("sources"),
             "usefulness": v.get("usefulness"), "verifier_verdict": v.get("verdict")})
    out, errs = [], []
    for i in sorted(rows):
        r = dict(rows[i])
        first = {"verdict": r["verdict"], "severity": r["severity"]}
        if i in overrides:
            o = overrides[i]
            r.update({k: o[k] for k in ("verdict", "severity", "note", "sources") if k in o})
        t = treatment(r["verdict"], r["severity"])
        row = {"id": i, "group": r["group"], "verdict": r["verdict"], "severity": r["severity"], "treatment": t,
               "note": r.get("precise_version") if t != "none" and r.get("precise_version") else r.get("note"),
               "checker_note": r.get("note"), "sources": r.get("sources") or [],
               "overridden": i in overrides, "first_pass": first if i in overrides else None,
               "additions": adds_by_item.get(i, [])}
        if t == "note" and not row["sources"]:
            errs.append("%s needs a sourced note (%s/%s) but has no source" % (i, r["verdict"], r["severity"]))
        out.append(row)
    path = a.out or os.path.join(a.dir, "final.jsonl")
    with open(path, "w", encoding="utf-8") as f:
        for row in out:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
    tc = Counter(r["treatment"] for r in out)
    vc = Counter(r["verdict"] for r in out)
    lines = ["# Fact-check policy result", "",
             "Policy: the teacher's point stays. wrong/outdated, and medium/high imprecise or simplified -> sourced "
             "note; low imprecise/simplified -> inline clarification; medium/high unverifiable -> inline 'not "
             "independently verified'; everything else -> no change.", "",
             "- Items checked: %d (overridden by verifier: %d)" % (len(out), sum(r["overridden"] for r in out)),
             "- Verdicts: " + ", ".join("%s %d" % kv for kv in vc.most_common()),
             "- Treatments: " + ", ".join("%s %d" % kv for kv in tc.most_common()),
             "- Additions attached: %d" % sum(len(r["additions"]) for r in out), "", "## Notes (sourced)", ""]
    for r in out:
        if r["treatment"] == "note":
            lines.append("- **%s** %s/%s: %s (%s)" % (r["id"], r["verdict"], r["severity"], r["note"],
                                                     ", ".join(r["sources"])))
    lines += ["", "## Inline clarifications", ""]
    for r in out:
        if r["treatment"] == "inline":
            lines.append("- **%s** %s/%s: %s" % (r["id"], r["verdict"], r["severity"], r["note"]))
    open(os.path.join(a.dir, "policy_summary.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    for e in errs:
        print("ERROR " + e)
    print("%s policy | %d items | %s" % ("FAIL" if errs else "PASS", len(out),
                                         ", ".join("%s %d" % kv for kv in tc.most_common())))
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
