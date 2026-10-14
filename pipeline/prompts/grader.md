# Task: grader - lecture {{LECTURE_ID}} exam (round {{ROUND}})

Grade the blind reader's answers against the exam key, and for every answer that is not fully correct find the cause
on the page and propose a faithful fix. Work from the project root. Do not spawn sub-agents.

## Inputs
- Key: `{{LEC}}/qa/exam.json`. Answers (page only): `{{ANSWERS}}`.
- To find causes: the page source `site/src/content/lectures/{{LECTURE_ID}}/*.mdx` (+ `site/src/figures/{{LECTURE_ID}}/`),
  the transcript `{{LEC}}/transcript/transcript.md`, the ledger `{{LEC}}/ledger/ledger.jsonl`, the lesson placement.
- Worked example: `lectures/lec01/qa/exam_grade.md`.

## Grading
Grade the substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict), not the
wording. `correct` = the key's substance is there; `partial` = part missing or blurred; `wrong` = contradicts the key;
`missing` = NOT ON PAGE. Extra correct material (fact-check notes) is never penalised. For each non-correct item:
the cause — **absent** (not on the page), **present but distorted**, **present but far from where the question
points**, or **reader slip** (it is on the page, clearly, near the topic: quote it) — with the page file and line, and a
**proposed fix** faithful to the transcript (exact wording to add or change, where, with the ledger id it carries).

## Write
1. `{{OUT_JSON}}`: `{"lecture": "{{LECTURE_ID}}", "round": {{ROUND}}, "score": <correct/total>, "items": [{"id": "Q001", "grade": "correct|partial|wrong|missing", "lacked": "…", "cause": "…", "where": "s2-x.mdx:120", "fix": "…"}]}`
   (every question; `fix` required for non-correct items, use "none needed: reader slip, see <quote>" for slips).
2. `{{OUT_MD}}`: score table (counts, correct/total, half-credit for partials), the table of non-correct items
   (Q, grade, what it lacked, cause with page source, proposed fix), and correct-with-minor-omissions notes.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py grade {{LECTURE_ID}} {{OUT_JSON}}`

Final message, under 50 words: score (correct/total and %), counts per grade, number of fixes proposed.
