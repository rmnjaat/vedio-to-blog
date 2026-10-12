#!/usr/bin/env python3
"""Validate the board-reading outputs of one lecture (python3 stdlib).

Usage: validate_board.py BOARD_DIR [--review-flags transcript/review_flags.md]

BOARD_DIR must contain board_log.md, board_items.jsonl, diagrams.md, flag_resolutions.md, frames_kept/.
ERROR (exit 1):
  - a file is missing / board_items.jsonl fails the ledger schema check (validate_ledger.py board)
  - board_log.md has no "## S01" style state entries, or state numbers are not S01.. contiguous
  - a frame name (b_HHMMSS.jpg) cited in any file does not exist in frames_kept/
  - a kept frame is never cited in board_log.md (every board state must be accounted for, even "no new content")
  - diagrams.md: D-ids not unique / not "## D-01 - title" / an entry without a "Frame:" line
  - flag_resolutions.md cites a flag id (F001..) that is not in review_flags.md
  - a B item's board time is not cited as a state time in board_log.md (WARN only)
"""
import argparse
import glob
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
LEDGER_VALIDATOR = os.path.join(HERE, "..", "..", "lecture-ledger", "scripts", "validate_ledger.py")
FRAME_RE = re.compile(r"\bb_\d{6}\.jpg\b")
SHORT_FRAME_RE = re.compile(r"\bb_(\d{6})\b")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--review-flags")
    a = ap.parse_args()
    errs, warns = [], []
    need = ["board_log.md", "board_items.jsonl", "diagrams.md", "flag_resolutions.md"]
    for f in need:
        if not os.path.exists(os.path.join(a.dir, f)):
            errs.append("missing %s" % f)
    kept = set(os.path.basename(p) for p in glob.glob(os.path.join(a.dir, "frames_kept", "*.jpg")))
    if not kept:
        errs.append("frames_kept/ is empty")
    if errs:
        return finish(errs, warns)

    r = subprocess.run([sys.executable, LEDGER_VALIDATOR, "board", os.path.join(a.dir, "board_items.jsonl")],
                       stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in r.stdout.splitlines():
        if line.startswith("ERROR"):
            errs.append("board_items: " + line[6:])
        elif line.startswith("WARN"):
            warns.append("board_items: " + line[6:])

    log = open(os.path.join(a.dir, "board_log.md"), encoding="utf-8").read()
    states = [int(x) for x in re.findall(r"^## S(\d+)\b", log, re.M)]
    if not states:
        errs.append("board_log.md has no '## S01 - ...' state entries")
    elif states != list(range(1, len(states) + 1)):
        errs.append("board_log.md state numbers not contiguous S01..S%02d" % len(states))

    cited_log = set(FRAME_RE.findall(log)) | set("b_%s.jpg" % x for x in SHORT_FRAME_RE.findall(log))
    texts = {f: open(os.path.join(a.dir, f), encoding="utf-8").read() for f in need}
    for f, t in texts.items():
        for fr in set(FRAME_RE.findall(t)):
            if fr not in kept:
                errs.append("%s cites %s, which is not in frames_kept/" % (f, fr))
    for fr in sorted(kept - cited_log):
        errs.append("kept frame %s is not accounted for in board_log.md" % fr)

    dg = texts["diagrams.md"]
    blocks = re.split(r"^(?=## D-)", dg, flags=re.M)
    ids = []
    for b in blocks:
        m = re.match(r"## (D-\d{2,3}) - \S", b)
        if not b.startswith("## D-"):
            continue
        if not m:
            errs.append("diagrams.md bad heading: %s" % b.splitlines()[0])
            continue
        ids.append(m.group(1))
        if not re.search(r"^Frames?:", b, re.M):
            errs.append("%s has no 'Frame:' line" % m.group(1))
    if len(ids) != len(set(ids)):
        errs.append("diagram ids not unique")

    if a.review_flags and os.path.exists(a.review_flags):
        known = set(re.findall(r"^\| (F\d{3,4}) \|", open(a.review_flags, encoding="utf-8").read(), re.M))
        for fid in sorted(set(re.findall(r"\bF\d{3,4}\b", texts["flag_resolutions.md"]))):
            if fid not in known:
                errs.append("flag_resolutions.md cites %s, not in review_flags.md" % fid)
    else:
        warns.append("review_flags.md not given/found: flag ids not checked")

    times = set(re.findall(r"\d{2}:\d{2}:\d{2}", log)) | set(
        "%s:%s:%s" % (x[:2], x[2:4], x[4:]) for x in SHORT_FRAME_RE.findall(log))
    for line in open(os.path.join(a.dir, "board_items.jsonl"), encoding="utf-8"):
        try:
            it = json.loads(line)
        except Exception:  # noqa: BLE001
            continue
        for t in (it.get("source") or {}).get("board") or []:
            if t.lstrip("~") not in times:
                warns.append("%s board time %s not found in board_log.md" % (it.get("id"), t))
    print("states %d, kept frames %d, diagrams %d" % (len(states), len(kept), len(ids)))
    finish(errs, warns)


def finish(errs, warns):
    for w in warns[:100]:
        print("WARN  " + w)
    for e in errs[:200]:
        print("ERROR " + e)
    print("%s board | errors %d | warnings %d" % ("FAIL" if errs else "PASS", len(errs), len(warns)))
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
