# Task: content fixer - lecture {{LECTURE_ID}} (Lecture {{NUM}})

The reviews of the finished page are in. Fix every content issue on the page, faithfully. **Quality must not be
reduced for quantity.** Work from the project root. Do not spawn sub-agents. Read `{{LEC}}/BUILD_BRIEF.md` first
(voice, fact-check policy, tagging, file ownership, machine safety) and follow it.

## Issues to fix (all of them)
- Blind exam: `{{LEC}}/qa/exam_grade.json` + `exam_grade.md` — every item graded partial / wrong / missing, with the
  grader's cause and proposed fix. Items marked "reader slip" need no change unless the passage is genuinely hard to
  find or ambiguous (then make it clearer where the question points).
- Faithfulness audit: `{{LEC}}/qa/faithfulness.json` + `faithfulness.md` — every issue, any severity.
- Design critique: `{{LEC}}/qa/critic.json` — issues with `"owner": "content"` (copy, verdict text, rhythm of prose).

## How
- Check every change against the transcript `{{LEC}}/transcript/transcript.md` and the ledger before you make it; the
  proposed fixes are suggestions, the class is the authority. Keep hedges, conditions and attributions. No dialogue,
  no student names.
- Every new outside fact gets an inline `<Cite>` to a page you opened (WebFetch). Never remove a `[[L-…]]` or `k=` tag;
  new text that teaches an item carries its id.
- Edit only this lecture's content: `site/src/content/lectures/{{LECTURE_ID}}.mdx`,
  `site/src/content/lectures/{{LECTURE_ID}}/*.mdx`, and text inside `site/src/figures/{{LECTURE_ID}}/*.tsx` (labels,
  step texts, title/desc) when the issue is in a figure's words. Layout and drawing issues belong to the design fixer.
- Then: `pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_content_fix.txt` must end `GATES PASS`.

## Write `{{LEC}}/qa/fixes_content.md`
As `lectures/lec01/qa/fixes_content.md`: verification (build, coverage, tags kept), then one row per issue id
(Q…, F-…, C-…) with the change made (file, what changed, ids carried) or why no change was needed (with the quote that
already answers it). Every issue id must appear.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py fixes {{LECTURE_ID}} {{LEC}}/qa/fixes_content.md {{LEC}}/qa/exam_grade.json && python3 pipeline/lib/check_qa.py fixes {{LECTURE_ID}} {{LEC}}/qa/fixes_content.md {{LEC}}/qa/faithfulness.json && python3 pipeline/lib/check_qa.py fixes {{LECTURE_ID}} {{LEC}}/qa/fixes_content.md {{LEC}}/qa/critic.json --owner content && pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_content_fix.txt`

Final message, under 100 words: issues fixed per source, issues needing no change, gates result.
