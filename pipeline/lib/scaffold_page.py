#!/usr/bin/env python3
"""Create the page skeleton of a lecture from its lesson design, so section writers can build their parts at once.

  scaffold_page.py <lecture-id>

Writes (only when missing; the assembler owns them afterwards):
  site/src/content/lectures/<id>.mdx           frontmatter from lesson/chapters.json + outline.md headings (contents,
                                               chapters), body = the overview part (s0-header)
  site/src/content/lectures/<id>/<part>.mdx    a stub for every part (overview + chapter parts) not written yet
Stubs contain the marker PIPELINE-STUB; check_part.py fails while a writer's part is still a stub.
"""
import json, re, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent))
from make_brief import facts  # noqa: E402

lec = sys.argv[1]
L = ROOT / "lectures" / lec
C = json.loads((L / "lesson/chapters.json").read_text())
outline = (L / "lesson/outline.md").read_text()
CONTENT = ROOT / "site/src/content/lectures"
(CONTENT / lec).mkdir(parents=True, exist_ok=True)
F = facts(lec)


def clean(t):
    t = re.sub(r"\s*\*\(.*?\)\*\s*$", "", t.strip())       # trailing "*(note)*"
    t = re.sub(r"\s*\((?:new|redraw|D-\d+)[^)]*\)\s*$", "", t)
    return t.replace("`", "").strip()


def q(s):  # YAML double-quoted string
    return '"' + str(s).replace("\\", "\\\\").replace('"', '\\"') + '"'


tops = {m.group(1): clean(m.group(2)) for m in re.finditer(r"^## (\d+) · (.+)$", outline, re.M)}
subs = {}
for m in re.finditer(r"^### (\d+)\.(\d+) (.+)$", outline, re.M):
    subs.setdefault(m.group(1), []).append((f"{m.group(1)}.{m.group(2)}", clean(m.group(3))))

mdx = CONTENT / f"{lec}.mdx"
if not mdx.exists():
    pg = C["page"]
    lines = ["---", f"title: {q(pg['title'])}", f"kicker: {q(pg['kicker'])}", f"dek: {q(pg['dek'])}",
             f"description: {q(pg['description'])}", f"reviewed: {date.today().strftime('%-d %b %Y')}", "status: draft",
             f"ledger: lectures/{lec}/ledger/ledger.jsonl", "contents:"]
    for ch in C["chapters"]:
        n = ch["no"]
        lines += [f"  - no: \"{n}\"", f"    title: {q(ch.get('title') or tops.get(n, ''))}", f"    href: \"#s{n}\""]
        if subs.get(n):
            lines.append("    children:")
            for no, t in subs[n]:
                lines.append(f"      - {{ no: \"{no}\", title: {q(t)}, href: \"#s{no.replace('.', '-')}\" }}")
    lines.append("chapters:")
    for ch in C["chapters"]:
        lines += [f"  - no: \"{ch['no']}\"", f"    slug: {ch['slug']}", f"    parts: [{', '.join(p['file'] for p in ch['parts'])}]",
                  f"    summary: {q(ch['summary'])}"]
    ov = C.get("overview_part", "s0-header")
    lines += ["---", f"import Header from './{lec}/{ov}.mdx';", "",
              f"{{/* Lecture {F['NUM']} ({lec}). This body is the lecture overview page (/lectures/{lec}/): the header block",
              f"    from {ov}.mdx. Each chapter is its own page, built from the parts listed under `chapters`. Written by the",
              "    pipeline scaffold (pipeline/lib/scaffold_page.py); the assembler owns this file. */}", "", "<Header />", ""]
    mdx.write_text("\n".join(lines))
    print(f"wrote site/src/content/lectures/{lec}.mdx")

parts = [(C.get("overview_part", "s0-header"), "overview", "assembler")] + \
        [(p["file"], f"chapter {ch['no']}", ch["writer"]) for ch in C["chapters"] for p in ch["parts"]]
for f, what, who in parts:
    p = CONTENT / lec / f"{f}.mdx"
    if not p.exists():
        if what == "overview":
            body = "<div class=\"col\">\n\n*In preparation.*\n\n</div>\n"
        else:
            # the chapter page needs the chapter's anchor; a stub keeps the build green until the writer replaces it
            body = "<div class=\"col\">\n\n*This chapter is being written.*\n\n</div>\n"
        p.write_text(f"{{/* PIPELINE-STUB: {what} part {f}, to be written by {who}. */}}\n\n{body}")
        print(f"stub site/src/content/lectures/{lec}/{f}.mdx ({who})")
print("scaffold ok")
