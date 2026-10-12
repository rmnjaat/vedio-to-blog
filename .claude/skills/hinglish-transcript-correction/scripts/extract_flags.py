#!/usr/bin/env python3
"""Pass 7b: collect every inline review marker from the final transcript into review_flags.md.

Usage:
  python3 extract_flags.py OUTDIR/transcript.md [--out OUTDIR/review_flags.md]

Markers collected (see references/output-format.md):
  [unclear: "asr text"]           UNCLEAR   - garbled / unintelligible, original kept
  [?suggestion | asr: "asr text"] TERM?     - probable term, not confident enough to correct
  [missing ~HH:MM:SS-HH:MM:SS]    MISSING   - speech likely lost (ASR dropout, cut audio)
  [check: note]                   CHECK     - anything else the user should look at
  **[..] Teacher?:** / Student?:  SPEAKER?  - speaker label is a best guess
Output table is sorted by time so the user can work through the video in one pass.
"""
import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import BODY_END, BODY_START, MD_TS_RE  # noqa: E402

PATTERNS = [
    ("UNCLEAR", re.compile(r"\[unclear:\s*\"(.*?)\"\s*\]")),
    ("TERM?", re.compile(r"\[\?([^\]|]*?)\s*\|\s*asr:\s*\"(.*?)\"\s*\]")),
    ("MISSING", re.compile(r"\[missing[^\]]*\]")),
    ("CHECK", re.compile(r"\[check:[^\]]*\]")),
    ("SPEAKER?", re.compile(r"\*\*\[[^\]]+\]\s*[^*]*\?\s*:\*\*")),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("transcript")
    ap.add_argument("--out")
    a = ap.parse_args()
    txt = open(a.transcript, encoding="utf-8").read()
    if BODY_START in txt:
        txt = txt.split(BODY_START, 1)[1].split(BODY_END, 1)[0]
    flags = []
    cur = "??:??:??"
    for line in txt.splitlines():
        for kind, rx in PATTERNS:
            for m in rx.finditer(line):
                ts_before = [mm.group(1) for mm in MD_TS_RE.finditer(line[:m.start()])]
                t = ts_before[-1] if ts_before else cur
                ctx = line[max(0, m.start() - 70):m.end() + 70]
                ctx = re.sub(r"\*\*", "", ctx).replace("|", "/").strip()
                flags.append((t.lstrip("~"), kind, m.group(0).replace("|", "/"), ctx))
        for mm in MD_TS_RE.finditer(line):
            cur = mm.group(1)
    flags.sort(key=lambda f: f[0])
    out = a.out or os.path.join(os.path.dirname(os.path.abspath(a.transcript)), "review_flags.md")
    counts = {}
    for f in flags:
        counts[f[1]] = counts.get(f[1], 0) + 1
    with open(out, "w", encoding="utf-8") as f:
        f.write("# Review flags\n\nItems the agent would not guess. Jump to the time in the video, listen, and fix in transcript.md.\n\n")
        f.write("Totals: " + (", ".join("%s %d" % kv for kv in sorted(counts.items())) or "none") + "\n\n")
        f.write("| # | Time | Kind | Marker | Context | Resolved |\n|---|---|---|---|---|---|\n")
        for i, (t, k, mk, ctx) in enumerate(flags, 1):
            f.write("| F%03d | %s | %s | %s | …%s… | [ ] |\n" % (i, t, k, mk, ctx))
    print("%d flags -> %s" % (len(flags), out))


if __name__ == "__main__":
    main()
