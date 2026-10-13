# Lecture 05 ledger, part 2 (01:08:25 - 02:02:59): notes

File: `part2.jsonl`, 104 items (K2-001 .. K2-104), validator: PASS (errors 0, warnings 0; every verbatim found word for word). Verbatims are at most 25 words.

## Topic tree

- **Locking**
  - Fixed inventory + contention = locking: K2-001 to K2-003; examples (COVID portal, IRCTC, BookMyShow, flash sale): K2-004 to K2-008
  - Implementation (engine/CPU side, mutex/semaphore/monitor): K2-009, K2-010
  - Hold vs lock (seat held during payment, never span a transaction across payment): K2-011, K2-013, K2-038, K2-039
  - Pointed seat (user picks a seat: no SKIP LOCKED, "no rows matched"): K2-014 to K2-018
  - Shared lock question (open) and the two-terminal experiment: K2-019 to K2-021
  - SKIP LOCKED with failures, re-evaluation on signal: K2-022 to K2-024
  - SKIP LOCKED cost (~120 executions) vs FOR UPDATE worst case N(N+1)/2: K2-030, K2-031
  - Isolation levels / plain UPDATE: K2-032, K2-034, K2-035
  - Waiting, explicit lock, release (commit releases locks, thread wait queue): K2-033, K2-036, K2-037, K2-040
- **Learning approach**: MySQL source (K2-025 to K2-028), official docs (K2-029), formal education (K2-041)
- **Relational databases scale**: K2-042
- **Design approach** (start single node, devil in details, micro decisions): K2-047, K2-087, K2-100
- **Key-value store on a relational DB**
  - Requirements (distributed, infinitely scalable, get/put/delete/TTL, Apache Ignite): K2-045, K2-046, K2-048 to K2-050
  - Storage / schema (key type and size, value type by access pattern, blob as black box, value-type column): K2-052 to K2-064, K2-080
  - TTL (created_at+TTL rejected, worst query, expired_at + index): K2-065 to K2-071
  - Delete (soft delete, expired_at = -1, one job for both): K2-072 to K2-079
  - Put (insert conflict, get-then-write cost, upsert, per-DB clauses): K2-081 to K2-086, K2-088 to K2-093, K2-095, K2-096, K2-102
  - Get (filter expired_at > now in SQL, network I/O saved): K2-097 to K2-099
- **Engineering practice** (human error, reviews): K2-103
- **Admin**: agenda K2-043, K2-051, K2-104; format K2-044; forward references K2-012 (flash sale wk 7), K2-094, K2-101

## Counts by type

| type | n |
|---|---|
| concept | 27 |
| rule_of_thumb | 13 |
| example | 13 |
| misconception | 10 |
| claim | 9 |
| admin_reference | 8 |
| qa_insight | 8 |
| process | 7 |
| tradeoff | 5 |
| war_story | 2 |
| number | 1 |
| comparison | 1 |

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 01:08:25-01:13:25 | 13 | fixed inventory rule, examples, locking implementation, hold vs lock |
| 01:13:25-01:18:25 | 9 | pointed-seat Q&A, for-share question, experiment |
| 01:18:25-01:23:25 | 13 | re-evaluation, MySQL source, N(N+1)/2, isolation levels |
| 01:23:25-01:28:25 | 8 | commit releases locks, payment hold, thread signaling, break announcement |
| 01:28:25-01:33:25 | 0 | break (admin, ~01:27:55-01:33:13) |
| 01:33:25-01:38:25 | 14 | KV store problem, requirements, schema key type |
| 01:38:25-01:43:25 | 10 | value type, blob, created_at + TTL proposal |
| 01:43:25-01:48:25 | 9 | worst query, expired_at, soft delete |
| 01:48:25-01:53:25 | 8 | one job for both, value type column, insert conflict |
| 01:53:25-01:58:25 | 11 | get-then-write, upsert |
| 01:58:25-02:02:59 | 9 | get with expired_at filter, upsert misuse question |

## Doubts / open questions

- K2-030: "It will be 120 days" - "days" possibly mis-heard; the teacher first said "much more than that", then corrected to ~120 for approach five.
- K2-011 / K2-015 / K2-017: several replies are labelled `Teacher?` ("You would never want to do that", "Correct", "Exactly").
- K2-038: `[unclear: "on hold and not log"]`; STUDENT_2 label at 01:23:58 may be a different student.
- K2-056: key size "30 to 60" may be "32, 64"; `varchar` is an ASR guess ("where can") - the board may show the schema.
- K2-062: `[unclear: "IKT"]` value type allowing range queries - confidence low; board may resolve. K2-061: `[unclear: "copyright type"]`.
- K2-071: the teacher's spoken query flips (TTL -> now, >= -> <=); the final form "expired_at <= now" is used. K2-078 uses "< now" (student's job query the teacher accepted).
- K2-065 / K2-066 / K2-067: speaker labels - teacher called "Sandeep", label STUDENT_1; mid-sentence speaker change at 01:42:20.
- K2-076 / K2-077: "Perfect.", "Storage" and the 01:48:37 lines may be teacher crosstalk.
- K2-083: student's WHERE-clause proposal is mostly unclear (`[?null | asr: "nailed"]`) - confidence low.
- K2-019: the FOR SHARE question was not answered; K2-102 deferred to the end of class (likely answered in part 3).
- K2-090: "in Postgres you just replace insert with upsert" kept as the teacher said it (fact-checker to review).
