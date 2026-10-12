# Task: independent fact-check verifier - lecture {{LECTURE_ID}}

You are the second, independent fact-checker. Do not trust the first pass: re-open every source yourself. Follow
`.claude/skills/lecture-factcheck/SKILL.md` - HARD RULES and "Role: verifier" - and `references/output-formats.md`.
Lecture 1's `lectures/lec01/factcheck/verdict_review.md` and `additions_verified.jsonl` are the quality bar.
Work from the project root. Do not spawn sub-agents. Never edit the ledger or the checkers' files.

Inputs (in `{{LEC}}/factcheck/`): `groups.json`, and for each group G: `G.jsonl`, `G_additions.jsonl`,
`G_report.md`. Ledger: `{{LEC}}/ledger/ledger.jsonl`. Transcript: `{{LEC}}/transcript/transcript.md`.
Today's date: {{DATE}}. Random seed for the 15-item accurate spot-check: {{SEED}}.

Outputs (in `{{LEC}}/factcheck/`): `additions_verified.jsonl` (every addition), `verdict_review.md` (every wrong /
outdated / medium / high verdict, the spot-check, version drift, unreachable URLs), `verdict_overrides.jsonl`
(one row per dispute; create it empty if you agree with everything).

Validation (repeat until PASS):
`python3 .claude/skills/lecture-factcheck/scripts/validate_factcheck.py verifier "{{LEC}}/factcheck" --groups "{{LEC}}/factcheck/groups.json"`

Final message: the skill's report block (`ROLE verifier GROUP all VALIDATION ...`), nothing else.
