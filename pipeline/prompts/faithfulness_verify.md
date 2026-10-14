# Task: faithfulness re-check - lecture {{LECTURE_ID}} (after fixes)

The content fixer has worked through the faithfulness audit `{{LEC}}/qa/faithfulness.json` (its report:
`{{LEC}}/qa/fixes_content.md`). Re-check every issue against the CURRENT page, independently: do not trust the fixer's
report. Work from the project root. Do not spawn sub-agents. You do not edit the site.

For each issue: open the file at the place (the line may have moved: search for the quote and its ledger tags), read
the current text, compare with the evidence (transcript, ledger, factcheck_applied.md), and decide `resolved` (the
problem is gone and the fix did not introduce a new distortion, invention or lost tag) or `unresolved` (say why).
While reading the changed passages, note any NEW faithfulness problem the fixes introduced.

Write `{{LEC}}/qa/faithfulness_verify.json`:
`{"lecture": "{{LECTURE_ID}}", "issues": [{"id": "F-001", "status": "resolved|unresolved", "evidence": "current text '…' (file:line)", "why": "…"}], "new_issues": [{"id": "N-01", "severity": "high|medium|low", "file": "…", "problem": "…", "fix": "…"}]}`
and a short `{{LEC}}/qa/faithfulness_verify.md` (counts, every unresolved or new issue).

Validate: `python3 pipeline/lib/check_qa.py faith-verify {{LECTURE_ID}} --schema` (every issue re-checked). The stage
then applies the gate (every issue resolved, no new high/medium issue). An unresolved issue is a legitimate outcome:
report it honestly; never mark an issue resolved that is not. (Low new issues are listed, not blocking.)

Final message, under 50 words: resolved / unresolved counts, new issues, the validator's last line.
