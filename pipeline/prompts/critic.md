# Task: design critic - lecture {{LECTURE_ID}} (Lecture {{NUM}})

Judge the built pages against the chosen design. The user's decision: the site follows the **Whiteboard Notebook**
sample EXACTLY (`learn/design/B-whiteboard-notebook/index.html` + `NOTES.md`), including its prose-paragraph + diagram
rhythm, in the three-column layout with one page per chapter. Lecture 1's finished pages are the reference
implementation. You do not edit anything: you find issues, rank them and propose fixes. Work from the project root.
Do not spawn sub-agents.

## Screenshots (already taken by the pipeline: `{{SHOTS}}`)
- `<width>-<theme>-<page>-top|mid|end.png` for every page at 1440, 1024, 390, light and dark
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps at 1440 and 390 (read a representative sample of
  every page: at least every third screen, and every screen with a figure, clip or card)
- `fig/` every figure (incl. pause-and-think before/after), `step/` every step of every step-through, `clip/` each
  clip's poster and a frame while playing; `sample-*-full.png` the design sample; `report.json` the machine checks
- Reference: Lecture 1 at the same widths — `lectures/lec01/qa/layout_shots/`, `lectures/lec01/qa/fixes_design_shots/after/`.
If you need a different view, run `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/critic_extra --pages <slug> --widths 768`.

## Judge (look at the images; do not judge from source code)
Look: paper/blackboard tokens, Literata + Recursive, graph-paper sheets, key-rule box, sticky-note cards, notation key,
marker colours meaning what they mean. Rhythm: paragraph, figure, paragraph — no walls of text, no figure deserts, no
stacks of components without prose between. Figures: one hand (consistent scale, stroke, lettering across all
figures, matching lec01's), labels ≥ 12 px and never colliding, phone layouts real redraws, arrows on the initiator's
side. Step-throughs: every step readable and matching its text. Pause-and-think: question-specific verdict copy that
agrees with the reveal. Clips: legible on phone (portrait layout), poster tells the story, captions match the page.
Navigation: the three columns, current page marked, chapter openings and hand-offs. Dark mode. Anything broken.

## Write
1. `{{LEC}}/qa/critic.json`: `{"lecture": "{{LECTURE_ID}}", "verdict": "pass|pass_with_fixes|fail", "issues": [{"id": "C-01", "severity": "blocker|high|medium|low", "owner": "design|animation|content", "where": "page/figure/clip id + screenshot file", "problem": "…", "fix": "…", "status": "open"}]}`
   `pass` only if nothing of severity blocker/high/medium remains; `pass_with_fixes` when the fixers can resolve
   everything; `fail` when the page needs rework.
2. `{{LEC}}/qa/critic.md`: verdict, what matches the sample, issues ranked (with screenshot evidence), as lec01's
   `lectures/lec01/qa/critic.md`.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py critic {{LECTURE_ID}} {{LEC}}/qa/critic.json`

Final message, under 60 words: verdict, issue counts by severity and owner, the top issue.
