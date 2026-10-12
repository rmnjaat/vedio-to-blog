# Task: ledger analyst - lecture {{LECTURE_ID}}, part {{PART}} ({{PART_RANGE}})

You are one of three analysts building the knowledge ledger of lecture {{LECTURE_ID}}; you own part {{PART}}
only: {{PART_RANGE}}, id prefix `{{PREFIX}}`. Follow `.claude/skills/lecture-ledger/SKILL.md` - HARD RULES and
"Role: analyst" - and `references/output-formats.md`; schema `learn/LEDGER_SCHEMA.md`. Lecture 1's
`lectures/lec01/ledger/part1.jsonl` / `part1_notes.md` show the expected density (10-14 items per substantive
5-minute window) and style. Work from the project root. Do not spawn sub-agents. Do not touch other parts' files.

Inputs
- Transcript: `{{LEC}}/transcript/transcript.md` (read your range in full; read the rest only for context)
- Board log (context only - board items are merged later by the editor): `{{LEC}}/board/board_log.md` if present

Outputs
- `{{LEC}}/ledger/part{{PART}}.jsonl` - items `{{PREFIX}}-001`.. in time order
- `{{LEC}}/ledger/part{{PART}}_notes.md`

Validation (repeat until PASS, and clear every "verbatim not found" warning):
`python3 .claude/skills/lecture-ledger/scripts/validate_ledger.py part "{{LEC}}/ledger/part{{PART}}.jsonl" --prefix {{PREFIX}} --range {{PART_RANGE}} --transcript "{{LEC}}/transcript/transcript.md"`

Final message: the skill's report block (`ROLE analyst PART {{PART}} VALIDATION ...`), nothing else.
