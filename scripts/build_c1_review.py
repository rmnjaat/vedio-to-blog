#!/usr/bin/env python3
"""Build the checkpoint-1 review page for Lecture 1.

Reads the ledger, fact-check verdicts (with second-check overrides), verified
additions and the board diagram list, then writes a single self-contained
HTML page to learn/lec01/review/c1_review.html. Also downscales the 20 diagram
frames into learn/lec01/review/frames/ and lists them in frames_needed.txt.
"""
import json
import os
import re
import shutil
import subprocess
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEC = os.path.join(ROOT, "learn", "lec01")
OUT_DIR = os.path.join(LEC, "review")
FC = os.path.join(LEC, "factcheck")
GROUPS = ["caching_scaling", "delegation_concurrency", "communication"]


def jl(path):
    with open(path, encoding="utf-8") as f:
        return [json.loads(l) for l in f if l.strip()]


# ---------- ledger ----------
ledger = jl(os.path.join(LEC, "ledger", "ledger.jsonl"))

# ---------- verdicts + second-check overrides ----------
verdicts = {}
for g in GROUPS:
    for v in jl(os.path.join(FC, g + ".jsonl")):
        verdicts[v["id"]] = v

OVERRIDES = {
    "L-0158": {
        "verdict": "imprecise",
        "review": "Second check: changed from wrong to imprecise. The teacher hedged "
        "(\"very few instances where you do push\"). The claim holds for SQS, Kafka and "
        "Kinesis; it fails only as a generalization, because RabbitMQ's normal mode is push.",
        "note_sub": [("'highly discouraged' and 'very inefficient'",
                      "basic.get polling 'highly inefficient' and 'strongly recommended against'")],
    },
    "L-0244": {
        "severity": "medium",
        "review": "Second check: severity lowered from high to medium. The substance is wrong, "
        "but it is a supporting detail and the lecture's point (short polling has heavy "
        "per-request overhead) still holds.",
    },
    "L-0288": {
        "verdict": "outdated",
        "review": "Second check: relabelled from wrong to outdated. The advice was valid while "
        "GCM existed. Google's 2018 post announced removal as soon as April 11, 2019.",
        "note_sub": [("its server and client APIs were removed starting April 11, 2019",
                      "its server and client APIs were announced for removal as soon as April 11, 2019")],
    },
}
for vid, o in OVERRIDES.items():
    v = verdicts.get(vid)
    if not v:
        continue
    v["original"] = {"verdict": v["verdict"], "severity": v["severity"]}
    if "verdict" in o:
        v["verdict"] = o["verdict"]
    if "severity" in o:
        v["severity"] = o["severity"]
    for a, b in o.get("note_sub", []):
        v["note"] = v["note"].replace(a, b)
    v["review"] = o["review"]
# Version drift noted by the second check: Kafka 4.3 is current.
for v in verdicts.values():
    for k in ("note", "precise_version"):
        if v.get(k):
            v[k] = v[k].replace("default is still classic in 4.2", "default is still classic in 4.3")


def treatment(v):
    verdict, sev = v["verdict"], v["severity"]
    if verdict in ("wrong", "outdated"):
        return "note"
    if verdict == "imprecise":
        return "note" if sev in ("medium", "high") else "inline"
    if sev == "high":
        return "note"
    if sev == "medium":
        return "inline"
    return "leave"


def needs_decision(v):
    return v["verdict"] in ("wrong", "outdated", "imprecise") or v["severity"] in ("high", "medium")


for v in verdicts.values():
    v["treatment"] = treatment(v)
    v["decision"] = needs_decision(v)

# ---------- additions ----------
orig_add = {}
for g in GROUPS:
    for a in jl(os.path.join(FC, g + "_additions.jsonl")):
        orig_add[a["add_id"]] = a
additions = []
for a in jl(os.path.join(FC, "additions_verified.jsonl")):
    o = orig_add.get(a["add_id"], {})
    additions.append({
        "add_id": a["add_id"],
        "attach_to": o.get("attach_to"),
        "verdict": a["verdict"],
        "usefulness": a["usefulness"],
        "text": a["final_text"],
        "original_text": o.get("text"),
        "why": o.get("why"),
        "sources": a.get("sources") or o.get("sources") or [],
        "note": a.get("note"),
    })

# ---------- diagrams ----------
diagrams = []
cur = None
with open(os.path.join(LEC, "board", "diagrams.md"), encoding="utf-8") as f:
    for line in f:
        line = line.rstrip("\n")
        m = re.match(r"^## (D-\d+) - (.+?) \(([^)]*)\)\s*$", line)
        if m:
            cur = {"id": m.group(1), "title": m.group(2), "time": m.group(3), "frames": [], "lines": []}
            diagrams.append(cur)
            continue
        if cur is None:
            continue
        if line.startswith("Frame:"):
            cur["frames"] = re.findall(r"b_\d+\.jpg", line)
            cur["frame_line"] = line[len("Frame:"):].strip()
        elif line.strip():
            cur["lines"].append(line.strip())
for d in diagrams:
    d["frame"] = d["frames"][0] if d["frames"] else None

# downscale the primary frame of each diagram
frames_needed = sorted({d["frame"] for d in diagrams if d["frame"]})
fdir = os.path.join(OUT_DIR, "frames")
os.makedirs(fdir, exist_ok=True)
src_dir = os.path.join(LEC, "board", "frames_kept")
for fn in frames_needed:
    src, dst = os.path.join(src_dir, fn), os.path.join(fdir, fn)
    if not os.path.exists(src):
        print("missing frame", fn)
        continue
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        continue
    if shutil.which("ffmpeg"):
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src,
                        "-vf", "scale='min(900,iw)':-2", "-q:v", "4", dst], check=True)
    else:
        shutil.copy(src, dst)
with open(os.path.join(OUT_DIR, "frames_needed.txt"), "w") as f:
    f.write("\n".join(frames_needed) + "\n")

# ---------- assemble ----------
items = []
for x in ledger:
    items.append({
        "id": x["id"], "type": x["type"], "statement": x["statement"], "detail": x.get("detail"),
        "topic": x["topic"], "case_study": x.get("case_study"), "source": x.get("source") or {},
        "origin": x.get("origin"), "confidence": x.get("confidence"), "flags": x.get("flags") or [],
        "importance": x.get("importance"), "status": x.get("status"), "speaker": x.get("speaker"),
        "verbatim": x.get("verbatim"),
    })

summary = {
    "total": len(items),
    "topic": Counter(i["topic"].split(" > ")[0] for i in items).most_common(),
    "type": Counter(i["type"] for i in items).most_common(),
    "origin": Counter(i["origin"] for i in items).most_common(),
    "confidence": Counter(i["confidence"] for i in items).most_common(),
    "verdict": Counter(v["verdict"] for v in verdicts.values()).most_common(),
    "severity": Counter(v["severity"] for v in verdicts.values()).most_common(),
    "checked": len(verdicts),
    "decisions": sum(1 for v in verdicts.values() if v["decision"]),
    "treatment": Counter(v["treatment"] for v in verdicts.values() if v["decision"]).most_common(),
    "add_verdict": Counter(a["verdict"] for a in additions).most_common(),
    "add_use": Counter(a["usefulness"] for a in additions).most_common(),
    "additions": len(additions),
    "diagrams": len(diagrams),
}

data = {"items": items, "verdicts": verdicts, "additions": additions,
        "diagrams": diagrams, "summary": summary}
payload = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "c1_review_template.html"), encoding="utf-8") as f:
    tpl = f.read()
html = tpl.replace("__DATA__", payload)
os.makedirs(OUT_DIR, exist_ok=True)
out = os.path.join(OUT_DIR, "c1_review.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(html)
print("wrote", out, len(html.encode("utf-8")), "bytes")
print("decisions", summary["decisions"], dict(summary["treatment"]))
print("frames", len(frames_needed))
