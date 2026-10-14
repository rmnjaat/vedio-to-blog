#!/usr/bin/env python3
"""Write lectures/<id>/BUILD_BRIEF.md from pipeline/templates/BUILD_BRIEF.md, and print the lecture's facts as
shell assignments (NUM, TITLE, CLIP_PREFIX) for the stage scripts.

  make_brief.py <lecture-id> [--print-vars]

NUM is the course position from lectures/course.json (falls back to the id's digits); TITLE comes from
lesson/chapters.json page.title, then course.json, then the id; CLIP_PREFIX from chapters.json, else l<NN>- from the id.
"""
import json, re, shlex, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def facts(lec):
    L = ROOT / "lectures" / lec
    num, title = int(re.sub(r"\D", "", lec) or 0), None
    cj = ROOT / "lectures/course.json"
    if cj.exists():
        try:
            raw = json.loads(cj.read_text()); lst = raw if isinstance(raw, list) else raw.get("lectures", [])
            lst = sorted(lst, key=lambda x: x.get("position", 0))
            for n, x in enumerate(lst):
                if x.get("id") == lec: num, title = n + 1, x.get("title")
        except Exception:
            pass
    prefix = "l%s-" % re.sub(r"\D", "", lec)
    ch = L / "lesson/chapters.json"
    if ch.exists():
        try:
            c = json.loads(ch.read_text()); title = c.get("page", {}).get("title") or title; prefix = c.get("clip_prefix") or prefix
        except Exception:
            pass
    return {"LECTURE_ID": lec, "NUM": "%02d" % num, "TITLE": title or lec, "CLIP_PREFIX": prefix}


if __name__ == "__main__":
    lec = sys.argv[1]
    f = facts(lec)
    if "--print-vars" in sys.argv:
        for k, v in f.items():
            print("%s=%s" % (k, shlex.quote(v)))
        sys.exit(0)
    t = (ROOT / "pipeline/templates/BUILD_BRIEF.md").read_text()
    for k, v in f.items():
        t = t.replace("{{%s}}" % k, v)
    left = re.findall(r"\{\{[A-Z_]+\}\}", t)
    if left:
        sys.exit("unresolved: %s" % left)
    (ROOT / "lectures" / lec / "BUILD_BRIEF.md").write_text(t)
    print("wrote lectures/%s/BUILD_BRIEF.md (Lecture %s, %s)" % (lec, f["NUM"], f["TITLE"]))
