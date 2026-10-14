# Fact-check report: photo tagging, newly-unread indicator, senior-engineering mindset, learning approach (Lecture 06)

Scope: 146 ledger items of topic group `photo_tagging_unread_indicator` (topic roots photo-tagging, unread-indicator, senior-engineering, system-design-patterns, learning-approach); no admin items skipped. **146 items checked.** Checked on 2026-10-13 against Redis docs (latest, Redis 8.x line), MongoDB manual (current), PostgreSQL docs (current), MySQL 8.4 reference manual.

## Counts

| Verdict | Count |
|---|---|
| accurate | 125 |
| simplified | 7 |
| imprecise | 5 |
| wrong | 0 |
| outdated | 1 |
| unverifiable | 8 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 1 |
| low | 13 |
| none | 132 |

Additions proposed: 22 (see `photo_tagging_unread_indicator_additions.jsonl`).

Calibration: this part of the lecture is mostly requirements brainstorming, career advice and a whiteboard design, so most items are product reasoning or design choices that are correct as taught. I flagged items only where a careful reader could take away a wrong technical fact: a wrong term (RBAC), a wrong complexity (DEL on a set), the claim that arrays are unindexable, SQL that would not run, and failure modes of the auxiliary-Redis design that the lecture understates. Student proposals were judged on what the teacher upheld. Mindset and career advice is marked accurate; personal anecdotes and invented figures (e.g. '3-5 notifications a week', '99% of guesses') are unverifiable.

## Items needing a decision (ordered by severity)

### L-0209 | imprecise | severity: medium

- **Teacher/ledger statement:** Tags must be stored queryably: you must be able to ask in which photos a given user is tagged, so they cannot sit in an unindexable array; they go into a database that supports that query.
- **Verbatim:** "Now you cannot just have just things stored in an array, which is unindexable." (teacher)
- **Issue:** Arrays can be indexed. MongoDB automatically creates a multikey index on an array field, with one index entry per element pointing back to the document. PostgreSQL indexes arrays with GIN (built-in `array_ops`, operators `@>`, `&&`). A learner who repeats 'arrays are unindexable' in an interview or design review would be wrong. The teacher's design conclusion is still sound for large tag lists: PostgreSQL's own docs say searching for array elements can be a sign of misdesign and recommend a separate table with one row per element.
- **Suggested note:** Arrays can be indexed (MongoDB multikey indexes, PostgreSQL GIN), but for 'which photos is this user tagged in' at scale, a separate posts_tags table with one row per tag and an index on user_id is simpler and scales better.
- **Sources:** [www.mongodb.com](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/), [www.postgresql.org](https://www.postgresql.org/docs/current/gin.html), [www.postgresql.org](https://www.postgresql.org/docs/current/arrays.html)

### L-0203 | outdated | severity: low

- **Teacher/ledger statement:** A student proposed tag suggestions ("this photo looks like this person from your friends list", as Facebook does), which needs face recognition and recommendation ML systems; on a photo upload event their inputs are fetched and shown to the user.
- **Verbatim:** "whether we would have suggestions, okay, this photo looks like this person from your friends list, something that Facebook does, I think." (student (proposal))
- **Issue:** A student said face-recognition tag suggestions are 'something that Facebook does'. Meta shut down the Face Recognition system on Facebook on 2 Nov 2021 ('People will no longer be able to turn on face recognition for suggested tagging') and deleted more than a billion face templates. The design point (suggestions require an ML dependency with an SLA) is unaffected.
- **Suggested note:** Face-recognition tag suggestions need ML services; Facebook offered them until November 2021, when Meta shut down face recognition on Facebook.
- **Sources:** [about.fb.com](https://about.fb.com/news/2021/11/update-on-use-of-face-recognition/)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0188 | simplified | low | Self-removal and multi-device edits still create concurrent writes; atomic single-document updates handle them. |
| L-0218 | imprecise | low | 'RBAC' is the wrong term: 'who can tag me' is a per-user, relationship-based permission (Zanzibar-style), not role-based. |
| L-0243 | imprecise | low | SQL is COUNT(DISTINCT ...), not COUNT(UNIQUE(...)); FROM/TO are MySQL reserved words and need quoting or renaming. |
| L-0246 | simplified | low | With (to, from, ts) only 'to' narrows the scan; the ts range can't cut it short, which is why (to, ts, from) is better. |
| L-0257 | imprecise | low | Redis DEL on a set is O(M) in members, not O(1); UNLINK frees memory in the background. Negligible for small sets. |
| L-0264 | simplified | low | Standalone Redis is not partitioned; partitioning across nodes needs Redis Cluster (16384 hash slots). |
| L-0282 | imprecise | low | In-memory does not remove the need to scale reads; Redis replicas / READONLY serve reads where staleness is OK. |
| L-0291 | simplified | low | The aux check is itself one O(1) op per message: load moves to another cluster rather than shrinking; the gain is isolation. |
| L-0292 | simplified | low | Separate check-then-write races; SET key 1 NX [EX] does an atomic set-if-absent. |
| L-0302 | simplified | low | Per-pair keys can't be cleared by prefix (KEYS is dangerous) and scatter across cluster slots; one hash per user (HSETNX) is simpler. |
| L-0305 | simplified | low | Worst case can be a persistent under-count (aux written, main failed; or aux not cleared); write main first and give aux keys a TTL. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0061 | Personal time estimate for prototyping a Gravatar-like service; reasonable advice but no public source can confirm the 3-4 hour figure. |
| L-0196 | The '3-5 notifications a week' figure is the teacher's rule of thumb; no primary source gives such a number. The point (over-notifying drives users away; batch notifications) is sound. |
| L-0226 | Describes Instagram's badge as observed in the live demo; Instagram does not publicly document what the DM badge number counts. Correct as the definition used for this design exercise. |
| L-0228 | Observation from the live Instagram demo; the exact badge behaviour is not publicly documented. Harmless as framing for the requirement. |
| L-0281 | A widely held rule of thumb rather than a checkable fact; stateful stores are typically the hardest tier to scale and recover, which is the spirit of the advice. |
| L-0299 | Personal anecdote; the '99% of guesses are correct' figure is not checkable. |
| L-0312 | Personal account of how the teacher learned; not checkable and harmless. |
| L-0319 | Personal account of how the teacher learned query optimisation; the method itself (EXPLAIN plus official docs) is sound. |
