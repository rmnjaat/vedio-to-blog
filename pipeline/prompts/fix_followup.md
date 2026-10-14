# Task: follow-up fixer - lecture {{LECTURE_ID}} (Lecture {{NUM}}: {{TITLE}})

The page went through one fix round and the round-2 re-check still found open problems. Fix every one of them, so the
next re-check passes. **Quality must not be reduced for quantity.** Work from the project root. Do not spawn
sub-agents. Read `{{LEC}}/BUILD_BRIEF.md` first and follow it.

## Open problems
- `{{LEC}}/qa/critic_final.json` + `critic_final.md`: every issue whose status is not fixed/resolved, all severities
  (blocker/high/medium first; do the lows too). Look at the screenshots each issue names (`{{LEC}}/qa/final_shots/`).
- `{{LEC}}/qa/faithfulness_verify.json` + `.md`: every unresolved issue and every new issue. Apply the fix the
  verifier gives unless the ledger says otherwise.
- `{{LEC}}/qa/exam_grade_r2.md`: any question still partial/wrong/missing, if the page is the cause.

## Rules
- Voice: teach directly, not "the instructor said…" / "the class concluded…"; no teacher biography, no turn-by-turn
  Q&A. Attribute only where the fact-check policy needs it (opinions, experience: "in the lecture's view", once).
  Hedges stay hedges. Never drop or change a fact (ledger: `{{LEC}}/ledger/ledger.jsonl`); keep every `[[L-xxxx]]`
  tag and `k=` id with the content it carries.
- You may edit this lecture's MDX (`site/src/content/lectures/{{LECTURE_ID}}/`), figures
  (`site/src/figures/{{LECTURE_ID}}/`) and clips (`site/src/animations/clips/{{CLIP_PREFIX}}*`; then
  `pipeline/bin/site.sh posters {{LECTURE_ID}}`). Shared files (`site/src/components/`, `site/src/styles/`, the kit)
  only when the issue cannot be fixed inside this lecture; you hold the shared-site lock; a shared change must keep
  every other lecture working: run `pipeline/bin/site.sh gates <id> {{LEC}}/qa/gates_<id>_after_shared.txt` for each
  lecture with a page under `site/src/content/lectures/`.
- Design: `learn/design/B-whiteboard-notebook/index.html`; figures: `site/FIGURES.md`; clips:
  `site/src/animations/README.md`.

## Check (commands take the machine lock; never run npm/astro/remotion directly)
- `pipeline/bin/site.sh build {{LECTURE_ID}}`, then `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/followup_shots --widths 1440,390`
  (or `--pages <slug>`); open the after-shots of everything you changed. Repeat until fixed.
- `pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_followup.txt` must end `GATES PASS`.

## Write `{{LEC}}/qa/fixes_followup.md`
Verification (gates, shots looked at), then one row per open issue id: what you changed (file:line) or why no change
is needed. Report under 100 words.
