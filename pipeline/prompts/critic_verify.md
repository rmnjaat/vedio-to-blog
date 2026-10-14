# Task: design critic, final look - lecture {{LECTURE_ID}} (after fixes)

The design and animation fixers have worked through `{{LEC}}/qa/critic.json` (their reports:
`{{LEC}}/qa/fixes_design.md`, `{{LEC}}/qa/fixes_animation.md`, `{{LEC}}/qa/fixes_content.md`). New screenshots of the
rebuilt pages are in `{{SHOTS}}` (same layout as before: top/mid/end per page and width, `sweep/`, `fig/`, `step/`,
`clip/`, `report.json`). Judge the CURRENT pages independently; do not trust the fixers' reports. Same standard as the
first critique (`pipeline/prompts/critic.md`: the Whiteboard Notebook sample followed exactly; Lecture 1 as reference).
Work from the project root. Do not spawn sub-agents. You do not edit anything.

1. Re-check every issue of the first critique on the new screenshots: mark it `resolved` or keep it `open` with why.
2. Look again at every page (a representative sweep sample per page and width, every figure, step, clip) for anything
   new, especially regressions caused by the fixes.

Write `{{LEC}}/qa/critic_final.json` (same schema as `critic.json`: verdict + issues, every original issue carried over
with its `status`, new issues added with status `open`) and `{{LEC}}/qa/critic_final.md`.
Verdict `pass` only if no blocker, high or medium issue is open. A failing verdict is a legitimate outcome: report it
honestly.

Validate: `python3 pipeline/lib/check_qa.py critic {{LECTURE_ID}} {{LEC}}/qa/critic_final.json`
(the pipeline then applies the pass gate separately.)

Final message, under 50 words: verdict, resolved / open counts, any regression.
