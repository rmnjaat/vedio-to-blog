#!/usr/bin/env python3
"""Validate fact-check outputs (python3 stdlib).

Usage:
  validate_factcheck.py checker FACTCHECK_DIR GROUP_NAME --groups groups.json --ledger ledger.jsonl
  validate_factcheck.py verifier FACTCHECK_DIR --groups groups.json
  validate_factcheck.py final FACTCHECK_DIR --ledger ledger.jsonl

checker  <GROUP>.jsonl: valid JSON; exactly one row per ledger id of the group, no others; fields id, verdict,
         note, sources, severity; verdict in accurate|simplified|imprecise|wrong|unverifiable|outdated; severity in
         none|low|medium|high; wrong/outdated need severity >= low; wrong/outdated and any medium/high non-accurate
         verdict need >= 1 http(s) source; non-accurate verdicts need a non-empty note; sources are URLs.
         <GROUP>_additions.jsonl: add_id A-<ABBR>-NN unique, attach_to = an id of the group, text, why, >= 1 source.
         <GROUP>_report.md exists and names every wrong / medium / high item.
verifier additions_verified.jsonl covers every add_id of every group exactly once (verdict
         confirmed|needs_rewording|rejected, usefulness keep|optional|drop, final_text non-empty unless rejected,
         >= 1 source unless rejected); verdict_review.md names every wrong/outdated/medium/high item of every group;
         verdict_overrides.jsonl (may be empty) rows have id, verdict, severity, note, sources, reason and refer to
         checked ids.
final    final.jsonl from apply_policy.py: one row per checked id, treatment in none|inline|note, every "note"
         treatment has >= 1 source, every addition attached to an existing ledger id.
"""
import argparse
import json
import os
import re
import sys

VERDICTS = {"accurate", "simplified", "imprecise", "wrong", "unverifiable", "outdated"}
SEV = {"none": 0, "low": 1, "medium": 2, "high": 3}
URL = re.compile(r"^https?://\S+$")


def jl(path, errs, allow_empty=False):
    if not os.path.exists(path):
        errs.append("missing %s" % path)
        return []
    rows = []
    for n, line in enumerate(open(path, encoding="utf-8"), 1):
        if line.strip():
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as e:
                errs.append("%s:%d invalid JSON (%s)" % (os.path.basename(path), n, e))
    if not rows and not allow_empty:
        errs.append("%s is empty" % path)
    return rows


def flagged(r):
    return r.get("verdict") in ("wrong", "outdated") or SEV.get(r.get("severity"), 0) >= 2


def checker(a, errs, warns):
    groups = {g["name"]: g for g in json.load(open(a.groups))}
    if a.group not in groups:
        sys.exit("unknown group %s" % a.group)
    g = groups[a.group]
    rows = jl(os.path.join(a.dir, a.group + ".jsonl"), errs)
    want = set(g["ids"])
    seen = {}
    for r in rows:
        i = r.get("id")
        for f in ("id", "verdict", "note", "sources", "severity"):
            if f not in r:
                errs.append("%s missing field %s" % (i, f))
        if i in seen:
            errs.append("%s has more than one verdict row" % i)
        seen[i] = r
        if i not in want:
            errs.append("%s is not in group %s" % (i, a.group))
        v, s = r.get("verdict"), r.get("severity")
        if v not in VERDICTS:
            errs.append("%s bad verdict %r" % (i, v))
        if s not in SEV:
            errs.append("%s bad severity %r" % (i, s))
        src = r.get("sources")
        if not isinstance(src, list) or any(not URL.match(str(u)) for u in src or []):
            errs.append("%s sources must be a list of http(s) URLs" % i)
            src = []
        if v in ("wrong", "outdated") and SEV.get(s, 0) < 1:
            errs.append("%s %s with severity none" % (i, v))
        if v != "accurate" and not (r.get("note") or "").strip():
            errs.append("%s %s without a note" % (i, v))
        if v not in ("accurate", "unverifiable") and not src:
            (errs if flagged(r) else warns).append("%s %s/%s has no source" % (i, v, s))
    for i in sorted(want - set(seen)):
        errs.append("%s (group %s) has no verdict" % (i, a.group))
    adds = jl(os.path.join(a.dir, a.group + "_additions.jsonl"), errs, allow_empty=True)
    ids = set()
    for x in adds:
        aid = x.get("add_id", "")
        if not re.match(r"^A-%s-\d{2,3}$" % re.escape(g["abbr"]), aid):
            errs.append("addition id %r should be A-%s-NN" % (aid, g["abbr"]))
        if aid in ids:
            errs.append("duplicate addition id %s" % aid)
        ids.add(aid)
        if x.get("attach_to") not in want:
            errs.append("%s attach_to %r not an id of this group" % (aid, x.get("attach_to")))
        if not (x.get("text") or "").strip() or not (x.get("why") or "").strip():
            errs.append("%s needs text and why" % aid)
        if not x.get("sources") or any(not URL.match(str(u)) for u in x["sources"]):
            errs.append("%s needs >= 1 http(s) source" % aid)
    rep = os.path.join(a.dir, a.group + "_report.md")
    if not os.path.exists(rep):
        errs.append("missing %s" % rep)
    else:
        text = open(rep, encoding="utf-8").read()
        for r in rows:
            if flagged(r) and r.get("id") not in text:
                errs.append("%s (%s/%s) not discussed in %s" % (r.get("id"), r.get("verdict"), r.get("severity"),
                                                               os.path.basename(rep)))
    print("group %s: %d/%d verdicts, %d additions" % (a.group, len(seen), len(want), len(adds)))


def verifier(a, errs, warns):
    groups = json.load(open(a.groups))
    add_ids, flagged_ids, checked = set(), set(), set()
    for g in groups:
        for x in jl(os.path.join(a.dir, g["name"] + "_additions.jsonl"), errs, allow_empty=True):
            add_ids.add(x["add_id"])
        for r in jl(os.path.join(a.dir, g["name"] + ".jsonl"), errs):
            checked.add(r["id"])
            if flagged(r):
                flagged_ids.add(r["id"])
    ver = jl(os.path.join(a.dir, "additions_verified.jsonl"), errs, allow_empty=not add_ids)
    seen = set()
    for x in ver:
        aid = x.get("add_id")
        if aid in seen:
            errs.append("%s verified twice" % aid)
        seen.add(aid)
        if aid not in add_ids:
            errs.append("%s is not a proposed addition" % aid)
        if x.get("verdict") not in ("confirmed", "needs_rewording", "rejected"):
            errs.append("%s bad verdict %r" % (aid, x.get("verdict")))
        if x.get("usefulness") not in ("keep", "optional", "drop"):
            errs.append("%s bad usefulness %r" % (aid, x.get("usefulness")))
        if x.get("verdict") != "rejected":
            if not (x.get("final_text") or "").strip():
                errs.append("%s needs final_text" % aid)
            if not x.get("sources"):
                errs.append("%s needs sources" % aid)
        if not (x.get("note") or "").strip():
            errs.append("%s needs a note saying what was opened and found" % aid)
    for aid in sorted(add_ids - seen):
        errs.append("addition %s not verified" % aid)
    rv = os.path.join(a.dir, "verdict_review.md")
    if not os.path.exists(rv):
        errs.append("missing verdict_review.md")
    else:
        text = open(rv, encoding="utf-8").read()
        for i in sorted(flagged_ids):
            if i not in text:
                errs.append("%s (wrong/outdated/medium/high) not reviewed in verdict_review.md" % i)
    ov = os.path.join(a.dir, "verdict_overrides.jsonl")
    if os.path.exists(ov):
        for r in jl(ov, errs, allow_empty=True):
            for f in ("id", "verdict", "severity", "note", "sources", "reason"):
                if f not in r:
                    errs.append("override %s missing %s" % (r.get("id"), f))
            if r.get("id") not in checked:
                errs.append("override for unchecked id %s" % r.get("id"))
            if r.get("verdict") not in VERDICTS or r.get("severity") not in SEV:
                errs.append("override %s bad verdict/severity" % r.get("id"))
    else:
        warns.append("no verdict_overrides.jsonl (treated as: no disputes)")
    print("additions verified %d/%d, flagged verdicts %d" % (len(seen & add_ids), len(add_ids), len(flagged_ids)))


def final(a, errs, warns):
    lids = set(json.loads(l)["id"] for l in open(a.ledger, encoding="utf-8") if l.strip())
    rows = jl(os.path.join(a.dir, "final.jsonl"), errs)
    for r in rows:
        if r.get("id") not in lids:
            errs.append("final row for unknown id %s" % r.get("id"))
        if r.get("treatment") not in ("none", "inline", "note"):
            errs.append("%s bad treatment %r" % (r.get("id"), r.get("treatment")))
        if r.get("treatment") == "note" and not r.get("sources"):
            errs.append("%s note without a source" % r.get("id"))
        for ad in r.get("additions") or []:
            if not ad.get("sources"):
                errs.append("%s addition %s without source" % (r.get("id"), ad.get("add_id")))
    print("final rows %d" % len(rows))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("mode", choices=["checker", "verifier", "final"])
    ap.add_argument("dir")
    ap.add_argument("group", nargs="?")
    ap.add_argument("--groups")
    ap.add_argument("--ledger")
    a = ap.parse_args()
    errs, warns = [], []
    {"checker": checker, "verifier": verifier, "final": final}[a.mode](a, errs, warns)
    for w in warns[:100]:
        print("WARN  " + w)
    for e in errs[:200]:
        print("ERROR " + e)
    print("%s factcheck %s | errors %d | warnings %d" % ("FAIL" if errs else "PASS", a.mode, len(errs), len(warns)))
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
