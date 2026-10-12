# Task: teaching map - lecture {{LECTURE_ID}}

Write the teaching map of lecture {{LECTURE_ID}}: how the teacher teaches, so a reader-first page can reuse his
best moves without losing anything. Follow `.claude/skills/lecture-teaching-map/SKILL.md` (HARD RULES, inputs,
section list) and its `templates/teaching_map_template.md`. Lecture 1's `lectures/lec01/teaching_map.md` is the
quality bar - read it before you start. Work from the project root. Do not spawn sub-agents.

Inputs
- `{{LEC}}/transcript/transcript.md` (primary; every row needs a time from it)
- `{{LEC}}/ledger/ledger.jsonl`, `{{LEC}}/board/board_log.md`, `{{LEC}}/board/diagrams.md`
- `{{LEC}}/factcheck/policy_summary.md` (if present)
- Previous lecture's map for backward references (if present): `{{PREV_MAP}}`

Output: `{{LEC}}/teaching_map.md`

Validation (repeat until PASS):
`python3 .claude/skills/lecture-teaching-map/scripts/validate_teaching_map.py "{{LEC}}/teaching_map.md" --transcript "{{LEC}}/transcript/transcript.md" --ledger "{{LEC}}/ledger/ledger.jsonl"`

Final message: the skill's report block (`TEACHMAP {{LECTURE_ID}} VALIDATION ...`), nothing else.
