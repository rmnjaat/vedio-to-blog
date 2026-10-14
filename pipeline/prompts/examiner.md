# Task: examiner - lecture {{LECTURE_ID}} (Lecture {{NUM}})

Write the exam that proves whether the finished page teaches everything the class taught. You work from the **class
itself only**: the corrected transcript and the board. Do NOT open the page, the site files, the lesson design or the
ledger (the exam must be independent of how the page and the ledger were made). Work from the project root. Do not
spawn sub-agents.

## Inputs (only these)
- `{{LEC}}/transcript/transcript.md`
- `{{LEC}}/board/board_log.md`, `{{LEC}}/board/diagrams.md`
- Worked example of format and depth: `lectures/lec01/qa/exam.json` and `lectures/lec01/qa/exam_coverage.md`
  (read them for shape only).

## Write
1. `{{LEC}}/qa/exam.json`:
   `{"lecture": "{{LECTURE_ID}}", "title": "…", "sources": ["{{LEC}}/transcript/transcript.md", "{{LEC}}/board/board_log.md", "{{LEC}}/board/diagrams.md"], "count": N, "skipped_windows": [], "questions": [{"id": "Q001", "q": "…", "answer": "…", "source": "transcript 00:05:33; board S02 00:05:45", "kind": "concept|diagram|example|heuristic|misconception|number|qa|recall|tradeoff", "difficulty": "easy|medium|hard"}]}`
   - At least one question per two minutes of class (a 3-hour class → about 100), spread over the whole class: every
     10-minute window that has teaching gets questions (list a window index in `skipped_windows` only if it was a
     break). Include the Q&A at the end: answers given there are part of the lecture.
   - Questions a careful reader of a complete page could answer: what was taught, numbers and conditions, the board's
     diagrams (direction of arrows, what connects to what, numbered lists in the board's order), the worked examples,
     the misconceptions corrected in class, the trade-offs and heuristics.
   - The answer is the substance the teacher gave (key facts, conditions, numbers), concise. No questions about who
     asked, student names or logistics. No ledger ids.
2. `{{LEC}}/qa/exam_coverage.md`: questions per 10-minute window (with what that window covers), by kind, by difficulty.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py exam {{LECTURE_ID}}`
(schema, count, every window covered, sources are transcript/board; it also writes `qa/exam_questions.json`, the
questions without answers, for the blind reader.)

Final message, under 60 words: question count, windows, kinds, the validator's last line.
