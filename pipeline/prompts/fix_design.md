# Task: design / figure fixer - lecture {{LECTURE_ID}} (Lecture {{NUM}})

Fix every design issue the critic found on this lecture's pages, so they match the Whiteboard Notebook sample exactly
(`learn/design/B-whiteboard-notebook/index.html` + `NOTES.md`) and look like Lecture 1's finished pages. **Quality must
not be reduced for quantity.** Work from the project root. Do not spawn sub-agents. Read `{{LEC}}/BUILD_BRIEF.md`
first and follow it.

## Issues
`{{LEC}}/qa/critic.json` + `critic.md`: every issue with `"owner": "design"` (figures, layout, typography, cards,
tables, spacing, dark mode, navigation). Screenshots of the current state: `{{LEC}}/qa/critic_shots/`. Worked example
of this job: `lectures/lec01/qa/fixes_design.md`.

## What you may edit
- This lecture's figures `site/src/figures/{{LECTURE_ID}}/*.tsx` and the figure/component props in this lecture's MDX
  (`site/src/content/lectures/{{LECTURE_ID}}/*.mdx`). Never change what a figure teaches (labels' meaning, arrows'
  direction as taught); never drop a `k=` tag.
- **Shared files** (`site/src/components/`, `site/src/styles/`, `site/src/layouts/`, `site/src/figures/kit/`,
  `site/src/figures/glyphs.tsx`) only when the issue cannot be fixed inside this lecture. You hold the shared-site lock
  for this whole task, so no other lecture's fixer edits them meanwhile. A shared change must keep every other
  lecture's pages working: after it, run `pipeline/bin/site.sh gates lec01 {{LEC}}/qa/gates_lec01_after_shared.txt`
  (and the same for any other lecture that has a page under `site/src/content/lectures/`) and look at a few of their
  screenshots. Prefer additive changes (a new prop, a new class) over changing defaults.

## Check (commands take the machine lock)
- `pipeline/bin/site.sh build {{LECTURE_ID}}`, then `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/fixes_design_shots --widths 1440,390`
  (or `--pages <slug>`); open the after-shots and compare with the before-shots and the sample. Repeat until fixed.
- `pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_design_fix.txt` must end `GATES PASS`.

## Write `{{LEC}}/qa/fixes_design.md`
Verification (gates, QA run, other lectures re-checked if you changed a shared file), then one row per critic issue id
(C-…) with owner design: the change (files), before → after screenshot paths. Every such id must appear. List any
issue you judged not to need a change, with the reason.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py fixes {{LECTURE_ID}} {{LEC}}/qa/fixes_design.md {{LEC}}/qa/critic.json --owner design && pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_design_fix.txt`

Final message, under 100 words: issues fixed, shared files changed (and the other lectures re-checked), gates result.
