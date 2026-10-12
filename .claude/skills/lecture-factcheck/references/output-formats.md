# Fact-check output formats (match Lecture 1: `lectures/lec01/factcheck/`)

## <group>.jsonl - one row per ledger id of the group
```json
{"id": "L-0016", "verdict": "simplified", "severity": "low",
 "note": "A shared remote cache gives every app server the same view, but it can still be stale ...",
 "precise_version": "(optional) one corrected sentence for the page",
 "sources": ["https://redis.io/docs/latest/develop/reference/client-side-caching/"]}
```
Accurate reasoning claims: `{"id": "L-0011", "verdict": "accurate", "note": "Correct as stated for this context.", "sources": [], "severity": "none"}`

## <group>_additions.jsonl
```json
{"add_id": "A-CS-01", "attach_to": "L-0036", "text": "PostgreSQL materialized views are not updated automatically ...",
 "sources": ["https://www.postgresql.org/docs/current/rules-materializedviews.html"],
 "why": "Readers need to know MVs are stale between refreshes."}
```

## <group>_report.md
```
# Fact-check report: <topics> (Lecture NN)
Scope: <n> ledger items whose topic starts with ...; <n> admin items skipped. **<n> items checked.**
## Counts            (verdict table, severity table, additions proposed)
Calibration: <one paragraph on how strict you were>
## Items needing a decision (ordered by severity)
### L-0354 | wrong | severity: high
- **Teacher/ledger statement:** ...
- **Verbatim:** "..." (teacher)
- **Issue:** ...
- **Suggested note:** ...
- **Sources:** [domain](url), ...
## Other non-accurate items (short list: id | verdict | severity | one-line issue)
## Unverifiable items (id | why no public source can confirm)
```

## additions_verified.jsonl (verifier)
```json
{"add_id": "A-CM-01", "verdict": "confirmed", "usefulness": "keep", "final_text": "...",
 "sources": ["https://www.rfc-editor.org/rfc/rfc9112#section-9.3"],
 "note": "RFC 9112 9.3: HTTP/1.1 defaults to persistent connections; ..."}
```

## verdict_overrides.jsonl (verifier; empty file when no disputes)
```json
{"id": "L-0158", "verdict": "imprecise", "severity": "medium", "note": "...", "sources": ["https://..."],
 "reason": "Teacher hedged; right for SQS/Kafka, wrong only as a generalisation (RabbitMQ pushes)."}
```

## verdict_review.md (verifier)
```
# Verdict review: second fact-checker, lecture NN
Date. Scope (every wrong/outdated/medium/high verdict: n items, plus 15 random accurate, seed S). Every URL cited
below was opened by me; when I couldn't open one, the entry says so.
## Summary          (agree n / dispute n; spot-check result; version drift)
## Disputes         (table: ID | First verdict | My view | Evidence)
## Agreements (with extra evidence where useful)   (grouped by topic, one bullet per id)
## Spot-check of 15 accurate verdicts (random, seed S)
## Notes on cited URLs   (unreachable, mirrors used, version-pinned pages)
```
