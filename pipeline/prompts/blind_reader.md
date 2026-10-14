# Task: blind reader - lecture {{LECTURE_ID}} (round {{ROUND}})

You are a working engineer who did NOT attend the class. You have only the finished lecture page. Answer the exam
from the page alone. Work from the project root. Do not spawn sub-agents.

## You may read ONLY
- `{{PAGE_TEXT}}` — the built pages of the lecture as text (overview and every chapter, in order; figure titles,
  descriptions and drawn labels, step-through steps, clip captions and "the clip as text" included)
- `{{LEC}}/qa/exam_questions.json` — the questions (no answers)
- optionally the screenshots in `{{SHOTS}}` (figures `fig/`, steps `step/`) when a question is about a diagram

**Do not open** the transcript, the board files, the ledger, the lesson design, the fact-check, `exam.json`, earlier
answers or grades, or the site source. If the page does not say it, you do not know it.

## Write `{{OUT}}`
`[{"id": "Q001", "answer": "…", "evidence": "<the page's words you relied on, quoted or closely paraphrased, with the chapter>", "found": true}]`
One entry per question, in order. If the page does not answer a question, write `"answer": "NOT ON PAGE", "found": false`
and an empty evidence. Answer fully: include the conditions, numbers and caveats the page gives. Don't guess from
general knowledge; if you add anything not on the page, you have failed the task.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py answers {{LECTURE_ID}} {{OUT}}`

Final message, under 40 words: questions answered, how many NOT ON PAGE.
