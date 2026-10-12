#!/usr/bin/env python3
"""Pass 7: assemble corrected chunks + chunk logs into the final deliverables.

Usage:
  python3 assemble.py WORKDIR OUTDIR [--title "Lecture 01 - ..."] [--source RAW_FILE_NAME]

Reads   WORKDIR/chunks/index.json, chunk_NN.corrected.md, chunk_NN.log.md
Writes  OUTDIR/transcript.md       header skeleton (with TODO fields) + <!-- BODY START --> ... <!-- BODY END -->
        OUTDIR/corrections_log.md  all chunk logs merged, IDs renumbered C0001..., sorted by time
Checks  (printed as WARN lines - fix them before verification):
        - missing chunk outputs
        - timestamps that go backwards
        - turns whose timestamp is outside the chunk's OWNED range (overlap leaked = duplicate risk)
        - identical paragraphs at chunk seams
Existing OUTDIR/transcript.md is backed up to transcript.prev.md, never silently overwritten.
"""
import argparse
import json
import os
import re
import shutil
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import BODY_END, BODY_START, MD_TS_RE, fmt_ts, parse_ts  # noqa: E402

LOG_HEADER = ("| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |\n"
              "|---|---|---|---|---|---|---|\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("workdir")
    ap.add_argument("outdir")
    ap.add_argument("--title", default="TODO: Lecture NN - <title from content>")
    ap.add_argument("--source", default="TODO")
    a = ap.parse_args()
    cdir = os.path.join(a.workdir, "chunks")
    index = json.load(open(os.path.join(cdir, "index.json"), encoding="utf-8"))
    os.makedirs(a.outdir, exist_ok=True)

    warns = []
    body_parts, log_rows = [], []
    last_t = -1.0
    prev_tail = None
    for c in index:
        cp = os.path.join(cdir, c["name"] + ".corrected.md")
        lp = os.path.join(cdir, c["name"] + ".log.md")
        if not os.path.exists(cp):
            warns.append("MISSING chunk output %s" % cp)
            continue
        text = open(cp, encoding="utf-8").read().strip()
        for m in MD_TS_RE.finditer(text):
            t = parse_ts(m.group(1))
            if t < last_t - 1:
                warns.append("%s: timestamp %s goes backwards (previous %s)" % (c["name"], m.group(1), fmt_ts(last_t)))
            if t < c["start"] - 1 or t >= c["end"] + 1:
                warns.append("%s: timestamp %s outside owned range %s-%s (overlap leak?)" % (
                    c["name"], m.group(1), fmt_ts(c["start"]), fmt_ts(c["end"])))
            last_t = max(last_t, t)
        paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
        if prev_tail and paras and paras[0] == prev_tail:
            warns.append("%s: first paragraph duplicates the end of the previous chunk" % c["name"])
        prev_tail = paras[-1] if paras else prev_tail
        body_parts.append("<!-- %s %s-%s -->\n\n%s" % (c["name"], fmt_ts(c["start"]), fmt_ts(c["end"]), text))
        if os.path.exists(lp):
            for line in open(lp, encoding="utf-8"):
                s = line.strip()
                if s.startswith("|") and not set(s) <= set("|-: "):
                    cells = [x.strip() for x in s.strip("|").split("|")]
                    if len(cells) >= 5 and parse_ts(cells[1]) is not None:
                        log_rows.append(cells)
        else:
            warns.append("no log for %s (fine only if nothing non-trivial was changed)" % c["name"])

    log_rows.sort(key=lambda r: parse_ts(r[1]))
    counts = {}
    with open(os.path.join(a.outdir, "corrections_log.md"), "w", encoding="utf-8") as f:
        f.write("# Corrections log\n\nEvery non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. "
                "Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.\n\n")
        f.write(LOG_HEADER)
        for i, r in enumerate(log_rows, 1):
            r = (r + [""] * 7)[:7]
            r[0] = "C%04d" % i
            r[1] = fmt_ts(parse_ts(r[1]))
            counts[r[2].upper()] = counts.get(r[2].upper(), 0) + 1
            f.write("| " + " | ".join(r) + " |\n")
        f.write("\n## Totals by type\n\n" + "\n".join("- %s: %d" % kv for kv in sorted(counts.items())) + "\n")

    tp = os.path.join(a.outdir, "transcript.md")
    if os.path.exists(tp):
        shutil.copy(tp, os.path.join(a.outdir, "transcript.prev.md"))
    start = index[0]["start"] if index else 0
    end = index[-1]["end"] if index else 0
    header = open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                               "templates", "transcript_header.md"), encoding="utf-8").read()
    header = (header.replace("{{TITLE}}", a.title).replace("{{SOURCE}}", a.source)
              .replace("{{DURATION}}", fmt_ts(end - 1 - start)).replace("{{DATE}}", date.today().isoformat())
              .replace("{{N_CORRECTIONS}}", str(len(log_rows))))
    with open(tp, "w", encoding="utf-8") as f:
        f.write(header.rstrip() + "\n\n" + BODY_START + "\n\n" + "\n\n".join(body_parts) + "\n\n" + BODY_END + "\n")
    for w in warns:
        print("WARN", w)
    print("assembled %d chunks, %d log rows -> %s" % (len(body_parts), len(log_rows), a.outdir))


if __name__ == "__main__":
    main()
