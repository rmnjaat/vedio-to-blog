# Task: ledger editor - lecture {{LECTURE_ID}}

You produce the final knowledge ledger of lecture {{LECTURE_ID}}. Follow `.claude/skills/lecture-ledger/SKILL.md`
- HARD RULES and "Role: editor" - and `references/output-formats.md` sections 3-4; schema `learn/LEDGER_SCHEMA.md`.
Lecture 1's `lectures/lec01/ledger/ledger.jsonl`, `ledger_changes.md`, `id_map.json` are the quality bar.
Work from the project root. Do not spawn sub-agents. Never drop a nuance when merging; never add knowledge.

Inputs
- `{{LEC}}/ledger/part*.jsonl`, `{{LEC}}/ledger/gaps.jsonl`, `{{LEC}}/ledger/gap_report.md`
- `{{LEC}}/board/board_items.jsonl`, `{{LEC}}/board/flag_resolutions.md`, `{{LEC}}/board/board_log.md`
- `{{LEC}}/transcript/transcript.md` (re-check every hunter fix against it before applying)

Outputs
- `{{LEC}}/ledger/ledger.jsonl` (L-0001.. in teaching order), `{{LEC}}/ledger/id_map.json` (EVERY K, G and B id),
  `{{LEC}}/ledger/ledger_changes.md` (every action, one line each, with final L ids)
You may write a helper script under `{{LEC}}/ledger/` for the mechanical parts (renumbering, id_map), but every
judgement (fixes, merges, board decisions) is yours and must be logged.

Validation (repeat until PASS):
`python3 .claude/skills/lecture-ledger/scripts/validate_ledger.py final "{{LEC}}/ledger" --board "{{LEC}}/board/board_items.jsonl" --transcript "{{LEC}}/transcript/transcript.md"`

Final message: the skill's report block (`ROLE editor PART all VALIDATION ...`), nothing else.
