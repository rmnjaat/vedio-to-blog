#!/usr/bin/env python3
"""The built pages of one lecture as plain reading text, for the blind reader (who sees only the page).

  page_text.py site/.builds/<id>/lectures/<id> <out.md>

Reads the overview and every chapter page (in chapter order, from the overview's chapter list) and keeps what a
reader sees in the main column: headings, paragraphs, lists, tables, notes, pause-and-think cards (with answers),
recall questions, figure captions plus each figure's <title>/<desc> and its drawn labels, step-through step texts,
and each clip's caption and "the clip as text". The course navigation, the bar, "On this page" and scripts are
dropped. No ledger ids are kept.
"""
import re, sys
from html.parser import HTMLParser
from pathlib import Path

SKIP_TAGS = {"script", "style", "noscript", "template", "button"}
SKIP_CLASSES = {"fig-phone", "docs-nav", "docs-otp", "otp-bar", "bar", "pager", "cn-list", "sr-skip", "drawer"}
BLOCK = {"p", "li", "h1", "h2", "h3", "h4", "h5", "figcaption", "blockquote", "tr", "summary", "dt", "dd", "pre", "div", "section", "article", "aside", "figure", "table", "title", "desc"}


class Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.buf = [], []
        self.stack = []  # (tag, skip, prefix)
        self.in_main = 0
        self.svg_depth = 0
        self.svg_labels = []

    def flush(self, prefix=""):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        self.buf = []
        if t:
            self.out.append(prefix + t)

    def skipping(self):
        return any(s for _, s, _ in self.stack)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = set((a.get("class") or "").split())
        if tag == "main":
            self.in_main += 1
        skip = tag in SKIP_TAGS or bool(cls & SKIP_CLASSES) or a.get("aria-hidden") == "true" and tag != "svg"
        prefix = {"h1": "# ", "h2": "## ", "h3": "### ", "h4": "#### ", "li": "- ", "figcaption": "[caption] ",
                  "summary": "[summary] ", "title": "[figure title] ", "desc": "[figure description] "}.get(tag, "")
        if tag in ("td", "th"):
            self.buf.append(" | ")
        if tag == "svg":
            self.svg_depth += 1
            if self.svg_depth == 1:
                self.svg_labels = []
        if tag in BLOCK and not self.skipping():
            self.flush()
        if tag == "br":
            self.buf.append(" ")
        if tag not in ("br", "img", "input", "hr", "path", "line", "circle", "rect", "polyline", "ellipse", "use"):
            self.stack.append((tag, skip, prefix))
        if tag == "img" and a.get("alt") and self.in_main and not self.skipping():
            self.out.append(f"[image] {a['alt']}")

    def handle_endtag(self, tag):
        # pop to the matching tag
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                t, skip, prefix = self.stack[i]
                if not skip and not self.skipping_below(i) and self.in_main:
                    if tag in BLOCK or tag in ("td", "th"):
                        if tag == "text":
                            pass
                        self.flush(prefix)
                    if tag == "svg" and self.svg_depth == 1 and self.svg_labels:
                        self.out.append("[figure labels] " + " · ".join(self.svg_labels))
                del self.stack[i:]
                break
        if tag == "svg":
            self.svg_depth = max(0, self.svg_depth - 1)
        if tag == "main":
            self.in_main -= 1

    def skipping_below(self, i):
        return any(s for _, s, _ in self.stack[:i])

    def handle_data(self, data):
        if not self.in_main or self.skipping():
            return
        top = self.stack[-1][0] if self.stack else ""
        if self.svg_depth and top in ("text", "tspan"):
            t = data.strip()
            if t:
                self.svg_labels.append(t)
            return
        if self.svg_depth and top not in ("title", "desc"):
            return
        self.buf.append(data)


def page_text(f: Path) -> str:
    p = Text()
    p.feed(f.read_text(encoding="utf-8"))
    p.flush()
    lines, prev = [], None
    for l in p.out:
        l = re.sub(r"\[\[[^\]]*\]\]", "", l).strip()
        if l and l != prev:
            lines.append(l)
        prev = l
    return "\n\n".join(lines)


def main():
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    overview = src / "index.html"
    html = overview.read_text(encoding="utf-8")
    base = re.search(r'href="([^"]*/lectures/[^/"]+/)"', html)
    order = []
    for m in re.finditer(r'href="[^"]*/lectures/[^/"]+/([^/"#]+)/"', html):
        if m.group(1) not in order and (src / m.group(1) / "index.html").exists():
            order.append(m.group(1))
    for d in sorted(x.name for x in src.iterdir() if (x / "index.html").exists()):
        if d not in order:
            order.append(d)
    parts = [f"=== PAGE: lecture overview ===\n\n{page_text(overview)}"]
    for slug in order:
        parts.append(f"=== PAGE: chapter {slug} ===\n\n{page_text(src / slug / 'index.html')}")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n\n".join(parts) + "\n", encoding="utf-8")
    print(f"wrote {out}: {len(order) + 1} pages, {sum(len(p.split()) for p in parts)} words")


if __name__ == "__main__":
    main()
