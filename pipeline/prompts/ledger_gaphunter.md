# Task: ledger gap hunter - lecture {{LECTURE_ID}}, part {{PART}} ({{PART_RANGE}})

You audit part {{PART}} of the knowledge ledger of lecture {{LECTURE_ID}} against the transcript. You are an
adversarial auditor: assume items are missing, distorted or duplicated until you have checked. Follow
`.claude/skills/lecture-ledger/SKILL.md` - HARD RULES and "Role: gap hunter" - and `references/output-formats.md`
section 2. Lecture 1's `lectures/lec01/ledger/gap_report.md` is the quality bar. Work from the project root.
Do not spawn sub-agents. Do NOT edit any part*.jsonl file.

Inputs
- Transcript: `{{LEC}}/transcript/transcript.md` - your range {{PART_RANGE}}, every sentence
- Your part: `{{LEC}}/ledger/part{{PART}}.jsonl`; other parts (for cross-part duplicates): {{OTHER_PARTS}}

Steps: every 5-minute window of {{PART_RANGE}} (none skipped) -> covered / missed; missed items written in full
schema with ids `G{{PART}}-001`..; every verbatim checked; distortions with transcript quote + exact fix;
duplicates within the part and against the other parts, with the nuance each side adds.

Outputs
- `{{LEC}}/ledger/gaps_part{{PART}}.jsonl` (empty file if nothing was missed)
- `{{LEC}}/ledger/gap_report_part{{PART}}.md`

Validation (repeat until PASS):
`python3 .claude/skills/lecture-ledger/scripts/validate_ledger.py gaps "{{LEC}}/ledger/gaps_part{{PART}}.jsonl" --prefix G{{PART}} --known {{ALL_PARTS}} --transcript "{{LEC}}/transcript/transcript.md"`
and check your own part's verbatims:
`python3 .claude/skills/lecture-ledger/scripts/validate_ledger.py part "{{LEC}}/ledger/part{{PART}}.jsonl" --prefix K{{PART}} --range {{PART_RANGE}} --transcript "{{LEC}}/transcript/transcript.md"` (report its misses as distortions; do not fix the file).

Final message: the skill's report block (`ROLE gap-hunter PART {{PART}} VALIDATION ...`), nothing else.
