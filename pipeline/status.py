#!/usr/bin/env python3
"""Build a status dashboard of the whole lecture pipeline from what is on disk.

Usage: python3 pipeline/status.py [OUT_HTML]   (default learn/status/index.html)
Reads pipeline/lectures.tsv, out/<id>/, transcripts/, learn/<id>/, lectures/<id>/, site/, pipeline/workstreams.json,
pipeline/asr_parallel.log and running processes. The page refreshes itself every 60 s when opened locally;
run `pipeline/status_loop.sh` to keep regenerating it.
"""
import html, json, os, re, subprocess, sys, time
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
OUT = sys.argv[1] if len(sys.argv) > 1 else "learn/status/index.html"
ASR_MIN = 35  # typical minutes for ASR of one 3 h lecture on this Mac


def ex(*paths):
    return any(os.path.exists(p) for p in paths)


def procs():
    try:
        return subprocess.check_output(["ps", "-axo", "command"], text=True)
    except Exception:
        return ""


PS = procs()
LOG = open("pipeline/asr_parallel.log").read() if ex("pipeline/asr_parallel.log") else ""


def started_at(id_, what):
    m = re.findall(rf"\[(\d\d:\d\d:\d\d)\] {id_} {what} start", LOG)
    return m[-1] if m else None


def duration_h(id_):
    f = dict(l.split("\t") for l in open("pipeline/lectures.tsv").read().split("\n") if l.strip()).get(id_)
    try:
        d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"vedio/{f}"], text=True))
        return f"{int(d // 3600)}h{int(d % 3600 // 60):02d}"
    except Exception:
        return "?"


STAGES = [
    ("video", "Video"), ("audio", "Audio"), ("lang", "Language"), ("asr", "Transcribe"), ("diar", "Speakers"),
    ("merge", "Merge"), ("correct", "Correct"), ("board", "Board"), ("ledger", "Ledger"), ("fact", "Fact-check"),
    ("lesson", "Lesson design"), ("anim", "Animations"), ("page", "Page"), ("qa", "QA gates"),
]


def lecture_state(id_, file_):
    o = f"out/{id_}"
    s = {}
    s["video"] = "done" if ex(f"vedio/{file_}") else "todo"
    s["audio"] = "done" if ex(f"audio/{id_}.wav") else "todo"
    s["lang"] = "done" if ex(f"{o}/lang.json") else ("doing" if f"langcheck.py audio/{id_}.wav" in PS else "todo")
    s["asr"] = "done" if ex(f"{o}/{id_}.segments.json") else ("doing" if f"transcribe.py audio/{id_}.wav" in PS else "todo")
    s["diar"] = "done" if ex(f"{o}/{id_}.diar.json", f"{o}/{id_}.diar_t11.json") else ("doing" if f"diarize.py audio/{id_}.wav" in PS else "todo")
    s["merge"] = "done" if ex(f"{o}/{id_}.merged.json") else "todo"
    s["correct"] = "done" if ex(f"transcripts/corrected/{id_}/transcript.md", f"lectures/{id_}/transcript/transcript.md") else (
        "doing" if ex(f"transcripts/work/{id_}/chunks/index.json", f"lectures/{id_}/transcript/work") else "todo")
    s["board"] = "done" if ex(f"learn/{id_}/board/board_log.md", f"lectures/{id_}/board/board_log.md") else "todo"
    s["ledger"] = "done" if ex(f"learn/{id_}/ledger/ledger.jsonl", f"lectures/{id_}/ledger/ledger.jsonl") else (
        "doing" if ex(f"learn/{id_}/ledger/part1.jsonl", f"lectures/{id_}/ledger/part1.jsonl") else "todo")
    s["fact"] = "done" if ex(f"learn/{id_}/factcheck/additions_verified.jsonl", f"lectures/{id_}/factcheck/additions_verified.jsonl") else (
        "doing" if ex(f"learn/{id_}/factcheck", f"lectures/{id_}/factcheck") else "todo")
    s["lesson"] = "done" if ex(f"lectures/{id_}/lesson/factcheck_applied.md") else ("doing" if ex(f"lectures/{id_}/lesson/outline.md") else "todo")
    s["anim"] = "done" if ex(f"lectures/{id_}/animations/DONE") else ("doing" if ex(f"lectures/{id_}/animations") else "todo")
    s["page"] = "done" if ex(f"lectures/{id_}/qa/PAGE_DONE") else ("doing" if ex(f"site/src/content/lectures/{id_}.mdx") else "todo")
    s["qa"] = "done" if ex(f"lectures/{id_}/qa/PASS") else "todo"
    note = ""
    if s["asr"] == "doing":
        t = started_at(id_, "transcribe")
        if t:
            st = datetime.combine(datetime.now().date(), datetime.strptime(t, "%H:%M:%S").time())
            mins = int((datetime.now() - st).total_seconds() // 60)
            note = f"transcribing for {mins} min (typically ~{ASR_MIN})"
    if ex(f"{o}/lang.json"):
        try:
            if json.load(open(f"{o}/lang.json"))["verdict"] == "hinglish":
                note = "Hindi-heavy: needs the Hinglish model"
        except Exception:
            pass
    return s, note


lectures = [l.split("\t") for l in open("pipeline/lectures.tsv").read().split("\n") if l.strip()]
rows, totals = [], {"done": 0, "doing": 0, "todo": 0}
for id_, f in lectures:
    s, note = lecture_state(id_, f)
    for v in s.values():
        totals[v] += 1
    rows.append((id_, f, duration_h(id_), s, note))

ws = json.load(open("pipeline/workstreams.json")) if ex("pipeline/workstreams.json") else []
for w in ws:
    if ex(w.get("done_when", "")):
        w["state"] = "done"

all_cells = sum(totals.values())
pct = round(100 * totals["done"] / all_cells) if all_cells else 0
now = datetime.now().strftime("%d %b %H:%M")
mark = {"done": "✓", "doing": "●", "todo": ""}
label = {"done": "done", "doing": "in progress", "todo": "not started"}


def cell(v):
    return f'<td class="c {v}" title="{label[v]}"><span>{mark[v]}</span></td>'


lec_rows = "".join(
    f'<tr><th scope="row"><b>{id_}</b><small>{dur} · {html.escape(f[:14])}…</small></th>'
    + "".join(cell(s[k]) for k, _ in STAGES)
    + f'<td class="note">{html.escape(note)}</td></tr>'
    for id_, f, dur, s, note in rows)
ws_rows = "".join(
    f'<li class="{w["state"]}"><span class="st">{ {"done":"Done","running":"Working","waiting":"Waiting"}[w["state"]] }</span>'
    f'<div><b>{html.escape(w["name"])}</b><p>{html.escape(w["detail"])}</p>'
    + (f'<p class="wait">Waits for: {html.escape(w["waits_for"])}</p>' if w["state"] == "waiting" and w.get("waits_for") else "")
    + "</div></li>" for w in ws)
doing_now = [f"{id_}: {lbl}" for id_, f, d, s, n in rows for k, lbl in STAGES if s[k] == "doing"] + [w["name"] for w in ws if w["state"] == "running"]

page = f"""<title>Pipeline Status</title>
<meta http-equiv="refresh" content="60">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
/* Layout: status board. Headline numbers, what is moving right now, the lecture-by-stage grid, then side workstreams. */
:root {{ --bg:#f3f2ee; --paper:#fff; --ink:#1a1c20; --muted:#646973; --line:#dddcd6; --done:#2b7a4b; --done-bg:#dff1e6; --doing:#2459d6; --doing-bg:#e3eafc; --todo-bg:#efeee9;
  --f-d:"Bricolage Grotesque","Avenir Next",system-ui,sans-serif; --f-b:"Figtree","Helvetica Neue",Arial,sans-serif; --f-m:"JetBrains Mono",ui-monospace,Menlo,monospace; }}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#121315; --paper:#1b1c20; --ink:#ecebe6; --muted:#9ea2aa; --line:#2e3035; --done:#7fd3a2; --done-bg:#1b3326; --doing:#86a8ff; --doing-bg:#1c2540; --todo-bg:#232428; color-scheme:dark }} }}
:root[data-theme="dark"] {{ --bg:#121315; --paper:#1b1c20; --ink:#ecebe6; --muted:#9ea2aa; --line:#2e3035; --done:#7fd3a2; --done-bg:#1b3326; --doing:#86a8ff; --doing-bg:#1c2540; --todo-bg:#232428; color-scheme:dark }}
* {{ box-sizing:border-box }}
body {{ background:var(--bg); color:var(--ink); font-family:var(--f-b); font-size:16px; line-height:1.5 }}
.page {{ max-width:1240px; margin:0 auto; padding-inline:20px; padding-block:36px 80px }}
h1,h2 {{ font-family:var(--f-d); margin:0 }}
h1 {{ font-size:clamp(28px,4.4vw,46px); font-weight:800; line-height:1.05 }}
h2 {{ font-size:22px; font-weight:800; margin:40px 0 12px }}
.meta {{ font-family:var(--f-m); font-size:12.5px; color:var(--muted); margin-top:8px }}
.top {{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; margin-top:22px }}
@media (max-width:760px) {{ .top {{ grid-template-columns:repeat(2,minmax(0,1fr)) }} }}
.top div {{ background:var(--paper); border-radius:12px; padding:14px 16px }}
.top b {{ display:block; font-family:var(--f-d); font-size:32px; font-variant-numeric:tabular-nums }}
.top span {{ color:var(--muted); font-size:14px }}
.bar {{ height:10px; background:var(--todo-bg); border-radius:999px; overflow:hidden; margin-top:16px }}
.bar i {{ display:block; height:100%; width:{pct}%; background:var(--done) }}
.now {{ display:flex; flex-wrap:wrap; gap:8px }}
.now span {{ background:var(--doing-bg); color:var(--doing); border-radius:999px; padding:5px 12px; font-size:14px; font-weight:500 }}
.now span::before {{ content:"● "; }}
.tw {{ overflow-x:auto; background:var(--paper); border-radius:12px }}
table {{ border-collapse:collapse; width:100%; min-width:980px }}
th,td {{ padding:8px 6px; border-bottom:1px solid var(--line); text-align:center }}
thead th {{ font-family:var(--f-m); font-size:11px; font-weight:500; color:var(--muted); writing-mode:initial }}
tbody th {{ text-align:left; padding-left:14px; white-space:nowrap }}
tbody th b {{ display:block; font-family:var(--f-m); font-size:14px }}
tbody th small {{ color:var(--muted); font-size:11.5px; font-family:var(--f-m) }}
td.c span {{ display:inline-grid; place-items:center; width:26px; height:26px; border-radius:7px; background:var(--todo-bg); font-size:13px; font-weight:600 }}
td.done span {{ background:var(--done-bg); color:var(--done) }}
td.doing span {{ background:var(--doing-bg); color:var(--doing); animation:p 1.6s ease-in-out infinite }}
@keyframes p {{ 50% {{ opacity:.45 }} }}
@media (prefers-reduced-motion:reduce) {{ td.doing span {{ animation:none }} }}
td.note {{ text-align:left; font-size:13px; color:var(--muted); min-width:200px }}
.legend {{ display:flex; gap:16px; font-size:13.5px; color:var(--muted); margin-top:10px }}
.legend i {{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:6px; vertical-align:-1px }}
ul.ws {{ list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:10px }}
ul.ws li {{ background:var(--paper); border-radius:12px; padding:14px 16px; display:grid; grid-template-columns:78px minmax(0,1fr); gap:12px; border-left:4px solid var(--line) }}
ul.ws li.done {{ border-color:var(--done) }} ul.ws li.running {{ border-color:var(--doing) }}
.st {{ font-family:var(--f-m); font-size:12px; color:var(--muted) }}
li.done .st {{ color:var(--done) }} li.running .st {{ color:var(--doing) }}
ul.ws p {{ margin:4px 0 0; font-size:14px; color:var(--muted) }} ul.ws p.wait {{ font-style:italic }}
</style>
<div class="page">
  <h1>Ten lectures, stage by stage</h1>
  <div class="meta">Updated {now} · rebuilt from the files on disk · refreshes every minute when open locally</div>
  <div class="top">
    <div><b>{pct}%</b><span>of all lecture stages done</span></div>
    <div><b>{totals['done']}</b><span>stages done</span></div>
    <div><b>{totals['doing']}</b><span>in progress</span></div>
    <div><b>{totals['todo']}</b><span>still to do</span></div>
  </div>
  <div class="bar"><i></i></div>
  <h2>Working right now</h2>
  <div class="now">{''.join(f'<span>{html.escape(x)}</span>' for x in doing_now) or '<span>nothing running</span>'}</div>
  <h2>Lectures</h2>
  <div class="tw"><table>
    <thead><tr><th></th>{''.join(f'<th scope="col">{l}</th>' for _, l in STAGES)}<th scope="col" style="text-align:left">Note</th></tr></thead>
    <tbody>{lec_rows}</tbody></table></div>
  <div class="legend"><span><i style="background:var(--done-bg)"></i>done</span><span><i style="background:var(--doing-bg)"></i>in progress</span><span><i style="background:var(--todo-bg)"></i>not started</span></div>
  <h2>Shared work</h2>
  <ul class="ws">{ws_rows}</ul>
</div>
"""
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w").write(page)
print(f"{OUT}: {pct}% done, {totals['doing']} in progress")
