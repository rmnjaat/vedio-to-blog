#!/usr/bin/env python3
"""Build a single-file HTML reader for a corrected lecture transcript.

Usage: python3 scripts/build_viewer.py transcripts/corrected/lec01 OUT.html
Reads transcript.md, corrections_log.md and verification_report.md from the lecture dir.
"""
import json
import re
import sys
from pathlib import Path

TS = r"~?\d{2}:\d{2}:\d{2}"


def secs(t):
    h, m, s = t.lstrip("~").split(":")
    return int(h) * 3600 + int(m) * 60 + int(s)


def role_of(speaker):
    if speaker.startswith("Teacher"):
        return "teacher-unsure" if "?" in speaker else "teacher"
    return "student-unsure" if "?" in speaker else "student"


def parse_transcript(md):
    title = md.splitlines()[0].lstrip("# ").strip()
    body = md.split("<!-- BODY START -->", 1)[1].split("<!-- BODY END -->", 1)[0]
    blocks, last_speaker = [], "Teacher"
    for raw in re.split(r"\n\s*\n", body):
        lines = [l for l in raw.strip().splitlines() if not l.strip().startswith("<!--")]
        if not lines:
            continue
        quote = all(l.startswith(">") for l in lines)
        text = " ".join(re.sub(r"^>\s?", "", l).strip() for l in lines).strip()
        if not text:
            continue
        m = re.match(rf"^(#{{2,3}}) \[({TS})\] (.*)$", text)
        if m:
            blocks.append({"k": "h" + str(len(m.group(1))), "t": m.group(2), "s": secs(m.group(2)),
                           "x": m.group(3).replace("*(admin)*", "").strip(), "admin": "(admin)" in m.group(3)})
            continue
        m = re.match(rf"^\*\*(Student|Chat) Question \[({TS})\](.*?):\*\*\s*(.*)$", text)
        if m:
            who = m.group(3).strip(" -") or ("read aloud by Teacher" if m.group(1) == "Chat" else "Student?")
            who = who.strip("()")
            sp = "Teacher" if m.group(1) == "Chat" else who
            last_speaker = sp
            blocks.append({"k": "q", "qk": m.group(1).lower(), "t": m.group(2), "s": secs(m.group(2)),
                           "sp": sp, "r": role_of(sp), "x": m.group(4)})
            continue
        m = re.match(rf"^\*\*\[({TS})\] ([^*]+?):\*\*\s*(.*)$", text)
        if m:
            sp = m.group(2).strip()
            ans = "(answer)" in sp
            sp = sp.replace("(answer)", "").strip()
            last_speaker = sp
            blocks.append({"k": "turn", "t": m.group(1), "s": secs(m.group(1)), "sp": sp, "r": role_of(sp),
                           "ans": ans, "qt": quote, "x": m.group(3)})
            continue
        m = re.match(rf"^\[({TS})\]\s*(.*)$", text)
        if m:
            blocks.append({"k": "p", "t": m.group(1), "s": secs(m.group(1)), "sp": last_speaker,
                           "r": role_of(last_speaker), "qt": quote, "x": m.group(2)})
            continue
        prev_s = blocks[-1]["s"] if blocks else 0
        blocks.append({"k": "p", "t": "", "s": prev_s, "sp": last_speaker, "r": role_of(last_speaker),
                       "qt": quote, "x": text})
    return title, blocks


def split_row(line):
    cells = re.split(r"(?<!\\)\|", line.strip())[1:-1]
    return [c.strip().replace("\\|", "|") for c in cells]


def parse_log(md):
    rows = []
    for line in md.splitlines():
        if not re.match(r"^\| C\d+", line):
            continue
        c = split_row(line)
        if len(c) >= 7:
            rows.append({"id": c[0], "t": c[1], "s": secs(c[1]) if re.match(TS, c[1]) else 0, "ty": c[2],
                         "o": c[3], "c": c[4], "why": c[5], "cf": c[6]})
    return rows


def main():
    d, out = Path(sys.argv[1]), Path(sys.argv[2])
    md = (d / "transcript.md").read_text()
    title, blocks = parse_transcript(md)
    log = parse_log((d / "corrections_log.md").read_text())
    ver = (d / "verification_report.md").read_text() if (d / "verification_report.md").exists() else ""
    vm = re.search(r"retention\s*([\d.]+)%", ver + md)
    dur = re.search(r"\*\*Duration\*\*\s*\|\s*([\d:]+)", md)
    src = re.search(r"\*\*Source\*\*\s*\|\s*([^|\n]+)", md)
    meta = {"title": title, "duration": dur.group(1) if dur else "", "source": src.group(1).strip() if src else "",
            "retention": vm.group(1) if vm else "", "pass": "PASS" in ver,
            "words": sum(len(b["x"].split()) for b in blocks if b["k"] not in ("h2", "h3"))}
    data = json.dumps({"meta": meta, "blocks": blocks, "log": log}, ensure_ascii=False).replace("</", "<\\/")
    tpl = (Path(__file__).parent / "viewer_template.html").read_text()
    out.write_text(tpl.replace("__TITLE__", title.split(" - ")[0]).replace("/*__DATA__*/null", data))
    print(f"{len(blocks)} blocks, {len(log)} log rows -> {out}")


if __name__ == "__main__":
    main()
