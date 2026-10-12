# Task: fact-checker - lecture {{LECTURE_ID}}, topic group "{{GROUP}}"

You fact-check every ledger item of topic group `{{GROUP}}` (addition id prefix `A-{{ABBR}}-`). Follow
`.claude/skills/lecture-factcheck/SKILL.md` - HARD RULES and "Role: checker" - and `references/output-formats.md`.
Lecture 1's `lectures/lec01/factcheck/caching_scaling.jsonl` and `caching_scaling_report.md` are the quality bar.
Work from the project root. Do not spawn sub-agents. Never edit the ledger.

Inputs
- Your ids: the `ids` list of the group named "{{GROUP}}" in `{{LEC}}/factcheck/groups.json` ({{N_ITEMS}} items)
- Ledger: `{{LEC}}/ledger/ledger.jsonl` (statement, detail, verbatim, speaker, status of each id)
- Transcript for context: `{{LEC}}/transcript/transcript.md`
- Today's date: {{DATE}} (name versions / dates you checked)

Every cited URL must be opened by you (WebFetch) and must support the note. Prefer official docs, RFCs, specs,
vendor engineering posts, papers.

Outputs (in `{{LEC}}/factcheck/`): `{{GROUP}}.jsonl`, `{{GROUP}}_additions.jsonl`, `{{GROUP}}_report.md`

Validation (repeat until PASS):
`python3 .claude/skills/lecture-factcheck/scripts/validate_factcheck.py checker "{{LEC}}/factcheck" {{GROUP}} --groups "{{LEC}}/factcheck/groups.json" --ledger "{{LEC}}/ledger/ledger.jsonl"`

Final message: the skill's report block (`ROLE checker GROUP {{GROUP}} VALIDATION ...`), nothing else.
