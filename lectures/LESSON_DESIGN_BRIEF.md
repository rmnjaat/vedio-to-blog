# Lesson design brief (any lecture) — read fully

You are the learning architect for ONE lecture of a system design course site (live class for working engineers). Your outline is the blueprint the writers, illustrators and animators follow. **Quality must not be reduced for quantity: 100% of the lecture's knowledge must land on the page.**

## Inputs for lecture {{ID}} (project root "/Users/ramanjangu/Desktop/VEDIO TO BLOG"; quote paths)
- Ledger (source of truth): `lectures/{{ID}}/ledger/ledger.jsonl` (schema `learn/LEDGER_SCHEMA.md`).
- Fact-check: `lectures/{{ID}}/factcheck/final.jsonl`, `policy_summary.md`, `verdict_review.md`, `*_report.md`, verified additions `additions_verified.jsonl` (use 'keep'; 'optional' only where they genuinely help).
- Teaching map: `lectures/{{ID}}/teaching_map.md`. Board: `lectures/{{ID}}/board/diagrams.md`, `board_log.md` (frames in `board/frames_kept/` — look at the ones you redraw; never embed them).
- Course structure: `lectures/course.json` + `lectures/course_order.md` — the REAL course order (ids are filename order). Use it for the lecture's position/title and for cross-links ("covered in Lecture N", "comes in Lecture M"). It overrides any teaching-map claim that a topic is "not in this corpus".
- Worked example to match in format and depth: Lecture "lec01" — `lectures/lec01/lesson/` (outline.md, placement.json, check_placement.py, figures.md, animations.md, prompts.md, factcheck_applied.md). Read all of it first.
- Design (followed EXACTLY, incl. prose-paragraph + diagram rhythm, margin notes, rule box, step-through, pause-and-think, trade-off table, recall questions): `learn/design/B-whiteboard-notebook/index.html` + `NOTES.md`. Site components: `site/README.md`, `site/FIGURES.md`. Animation skill: `.claude/skills/explainer-animation/` (how to choose 3–5 clips).

## Rules
- Own voice: no teacher–student dialogue, no student names. Class Q&A insights become explanation ("asked in class" is fine, anonymous).
- Teacher's points are never silently corrected. Fact-check policy: wrong/outdated/medium+high imprecise → SourceNote beside the point (precise version + source); low imprecise / medium simplified → light inline clarification; low simplified → leave. Hedges stay hedges; opinions stay attributed as the lecture's view; arithmetic checked.
- Chapters become separate pages (one per top-level section), so give each chapter a clean opening and a hand-off to the next.
- Pure logistics may be dropped — list every dropped id with a reason.

## Outputs in `lectures/{{ID}}/lesson/`
1. `outline.md` — title (from course.json), one-line promise, chapters/subsections in reading order with purpose, opening problem (in the lecture's case study), key points, components, estimated words, Q&A folded in.
2. `placement.json` — every ledger id → {section, component, note}; all ids placed or in "dropped" with reason. Copy `lectures/lec01/lesson/check_placement.py`, adapt paths, run it until it passes.
3. `figures.md` — every figure (board redraws with frame refs + new ones), exact structure (parts, arrows, labels, marker colours: blue request path, red failure/stale, green ack), ledger ids carried.
4. `animations.md` — 3–5 clips where change over time is the lesson, with mechanism, why motion beats a static figure, ledger ids, beats, target length (≤ 40 s).
5. `prompts.md` — 6–9 pause-and-think prompts from real class questions, each with its own right/wrong verdict text.
6. `factcheck_applied.md` — every flagged item and its treatment.
Self-review against the ledger with a fresh read of every statement; fix gaps. Then write `lectures/{{ID}}/lesson/DONE`.
Report under 120 words: chapters, placed/dropped counts, figures, animations.
