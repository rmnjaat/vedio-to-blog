---
name: lecture-factcheck
description: Fact-check a lecture's knowledge ledger against primary sources in two independent passes - topic checkers (verdict accurate/simplified/imprecise/wrong/unverifiable/outdated, severity, sources actually opened, proposed additions) and an independent verifier (re-opens every source, rewords additions, reviews every wrong/medium/high verdict, spot-checks accurate ones) - then apply the policy (teacher's point stays; sourced notes for wrong/outdated/medium+ issues; inline clarifications for minor ones). Use for "fact-check the ledger", "checker", "verifier" on lectures/<id>/factcheck.
---

# Lecture fact-check

Live classes simplify; that is fine. The job is to catch what would leave a careful reader with a **wrong idea**,
back every judgement with a source you actually opened, and add a few high-value facts - without ever rewriting
what the teacher taught. Two independent passes, because one checker's confident mistake is the commonest failure.

`SK` = `<project>/.claude/skills/lecture-factcheck`. `LEC` = `<project>/lectures/<id>`. Quote paths.

## Hard rules

1. **Open every source you cite** (WebFetch) and confirm the specific sentence supports your note. A URL you did
   not open, or that does not say it, is not a source. Prefer primary sources: official docs, RFCs, specs, vendor
   engineering blogs, papers; then reputable references. No SEO blogs / content farms / AI summaries.
2. **Calibrate.** Judge the ledger item as taught (the statement plus its `detail`, `verbatim`, `speaker`,
   `status`). Live-class simplification is `simplified`, not `imprecise`. Student proposals and anecdotes are
   checked only where they make a checkable technical claim; a student claim the teacher corrected is judged on
   what the item says was upheld.
3. **Verdicts**
   - `accurate` - correct as stated in context (sources optional for reasoning claims; say "Correct as stated
     for this context.").
   - `simplified` - right in spirit, omits detail a careful reader may need.
   - `imprecise` - wording or scope is off enough to mislead (wrong term, over-generalisation, missing condition).
   - `wrong` - factually incorrect.
   - `outdated` - was true, no longer is (give the date/version of the change).
   - `unverifiable` - opinion, war story, or private/company-internal claim no public source can confirm.
4. **Severity** = harm to a learner who believes it: `none` (accurate / harmless), `low` (minor nuance),
   `medium` (would cause a wrong design decision or a wrong interview answer), `high` (dangerous or central
   misconception). wrong/outdated are never `none`.
5. **Versions and dates.** Products change: name the version / date you checked ("as of Kafka 4.3, June 2026");
   label old figures as historical (a 2012 latency table, a 2015 hardware post).
6. **The teacher's point stays.** You never edit the ledger. Your `note` explains the issue; `precise_version`
   (optional) is a corrected one-sentence version for the page.
7. **Additions** are facts a learner of THIS item benefits from (not trivia, not a new topic), each sourced,
   <= 3 sentences, attached to one ledger id. Quality over quantity: ~25 per checker at most.

## Role: checker (one per topic group, run in parallel)

Input: `LEC/ledger/ledger.jsonl`, `LEC/factcheck/groups.json` (your group's ids), transcript for context.
Output in `LEC/factcheck/`: `<group>.jsonl`, `<group>_additions.jsonl`, `<group>_report.md`
(formats: `references/output-formats.md`).
1. Check EVERY id of your group: exactly one verdict row each, none skipped, no ids from other groups.
2. For anything not plainly accurate, research: open the primary source, quote/locate the supporting sentence.
3. Write additions only where they materially help; ids `A-<ABBR>-01`.. (ABBR from groups.json).
4. Report: counts, then "Items needing a decision" ordered by severity (every wrong, outdated, medium, high).
5. Validate: `python3 "$SK/scripts/validate_factcheck.py" checker "LEC/factcheck" <group> --groups
   "LEC/factcheck/groups.json" --ledger "LEC/ledger/ledger.jsonl"` until PASS; fix "no source" WARNs where you can.

## Role: verifier (one, after all checkers; independent - do not trust the checkers)

Output in `LEC/factcheck/`: `additions_verified.jsonl`, `verdict_review.md`, `verdict_overrides.jsonl`.
1. **Every addition**: re-open every cited URL yourself; `confirmed` / `needs_rewording` (give the corrected
   `final_text`) / `rejected`; `usefulness` keep / optional / drop; `note` says what you opened and found
   (quote the key phrase); `final_text` always filled unless rejected. Fix quotes that do not appear verbatim.
2. **Every flagged verdict** (wrong, outdated, severity medium or high, in all groups): re-check against the
   ledger item and transcript and the sources; agree or dispute (verdict, severity or label), with evidence.
3. **Spot-check** 15 random `accurate` verdicts (state the seed); report agreement.
4. **Version drift**: note products whose current version changed what a checker wrote.
5. Every dispute also goes to `verdict_overrides.jsonl` (machine-readable; the policy uses it). URLs you could not
   open: say so - never pretend.
6. Validate: `python3 "$SK/scripts/validate_factcheck.py" verifier "LEC/factcheck" --groups
   "LEC/factcheck/groups.json"` until PASS.

## Policy (applied by script, `apply_policy.py` -> `final.jsonl`, `policy_summary.md`)

Teacher's point stays. wrong / outdated, and medium/high imprecise or simplified -> sourced note beside the item;
low imprecise/simplified -> inline clarification; medium/high unverifiable -> inline "teacher's experience, not
independently verified"; else nothing. Verifier overrides win. Verified additions (keep/optional) attach to items.

## Report format (last message)

```
ROLE <checker|verifier> GROUP <name|all>  VALIDATION <PASS|FAIL> (<validator summary line>)
verdicts: accurate n, simplified n, imprecise n, wrong n, outdated n, unverifiable n | severity high n, medium n, low n
additions: proposed n | verifier: confirmed n, reworded n, rejected n; disputes n; spot-check n/15 agree
urls not reachable: <list or "none">
```
