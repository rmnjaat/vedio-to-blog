# Lecture 06 ledger, part 3 (02:02:56 - 02:55:36): notes
File: `part3.jsonl`, 102 items (K3-001 .. K3-102), validator: PASS (errors 0, warnings 0; all verbatims found word for word).

Arc: newly unread message indicator. Problem statement and Instagram demo -> requirements (count = unique senders since last click) -> crude source-of-truth approach (messages + user_activity tables, count(unique(from)) query, composite index, cost) -> pre-computed per-user set (student-led, count field dropped) -> general pattern "query source of truth vs pre-compute" -> Redis, read path (get/clear) -> write path (messaging service, on-message-unsent umbrella, Kafka, workers) -> Redis overburdened, N-1 no-op writes -> auxiliary Redis pattern, failure and consistency trade-offs -> next week (storage engines) -> Q&A (100+ threshold, auxiliary key model, sync failure, no distributed transaction, no read-before-write, Gravatar hash, meaning of "unsent", how to learn query optimisation, auxiliary Redis is a cluster).

## Topic tree
- unread-indicator
  - problem-statement: K3-001, K3-002, K3-003
  - newly-unread-definition: K3-004, K3-005, K3-006, K3-007, K3-012
  - requirements: K3-009, K3-010, K3-011
  - crude-approach: K3-013, K3-016
    - schema: K3-014, K3-015, K3-017, K3-018, K3-019
    - query: K3-020, K3-021, K3-022
    - indexing: K3-023, K3-025, K3-026
    - cost: K3-024, K3-027, K3-029
  - source-of-truth-vs-precomputed: K3-030
  - precomputed
    - idea: K3-028
    - set-per-user: K3-031, K3-032, K3-033, K3-034, K3-035, K3-036
  - store-choice: K3-042, K3-043, K3-056
  - read-path: K3-044, K3-045
  - write-path: K3-046, K3-049
    - when-to-count: K3-047, K3-048, K3-051, K3-093
    - messaging-service: K3-050, K3-052, K3-053
    - on-message-unsent: K3-054, K3-055, K3-092
  - architecture: K3-057
  - auxiliary-redis
    - load: K3-059, K3-061, K3-062, K3-063, K3-064, K3-065, K3-066
    - flow: K3-071, K3-072, K3-074
    - failure: K3-073
    - consistency: K3-075, K3-084, K3-085, K3-086, K3-087
    - key-model: K3-081, K3-082, K3-083
    - why-not-read-before-write: K3-089
    - scaling: K3-102
  - optimizations > threshold: K3-079, K3-080
- system-design-patterns
  - source-of-truth-vs-precomputed: K3-037, K3-038, K3-039, K3-040, K3-041
  - protect-the-database: K3-060, K3-067, K3-068, K3-090
  - auxiliary-database: K3-058, K3-069, K3-070
  - tradeoffs: K3-076, K3-088
- gravatar > url-design: K3-091
- learning approach
  - intuition: K3-078
  - databases: K3-094, K3-095
    - explain: K3-098, K3-099, K3-100, K3-101
- admin
  - agenda: K3-008
  - next-week: K3-077
  - resources: K3-096, K3-097

## Counts by type
| type | n |
|---|---|
| process | 22 |
| concept | 21 |
| rule_of_thumb | 14 |
| qa_insight | 12 |
| claim | 9 |
| example | 5 |
| definition | 4 |
| admin_reference | 4 |
| tradeoff | 4 |
| analogy | 2 |
| war_story | 2 |
| comparison | 1 |
| misconception | 1 |
| number | 1 |
| **total** | **102** |

Speakers: 19 student (proposal) items (12 endorsed, 5 proposed_then_corrected, 2 open), rest teacher.
- endorsed student proposals: K3-013, K3-014, K3-015, K3-026, K3-028, K3-033, K3-035, K3-036, K3-042, K3-047, K3-048, K3-079
- proposed_then_corrected: K3-020 (order by), K3-023 (index on timestamp only), K3-031 (count inside a hash map), K3-032 (count next to the set), K3-089 (read-before-write instead of auxiliary Redis)
- open: K3-016 (queue partitioned on from user; teacher redirected, no verdict), K3-017 (storing all messages "not scalable")

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 02:02:56-02:07:56 | 13 | problem statement, demo, requirements |
| 02:07:56-02:12:56 | 7 | student-led data modelling, slow dialogue |
| 02:12:56-02:17:56 | 7 | query, index, cost - dialogue |
| 02:17:56-02:22:56 | 7 | crude-but-correct, NoSQL set proposal (long back-and-forth on naming) |
| 02:22:56-02:27:56 | 12 | set per user, source of truth vs pre-computed, Redis, read path |
| 02:27:56-02:32:56 | 12 | write path, messaging service, on-message-unsent, Kafka |
| 02:32:56-02:37:56 | 12 | overburdened Redis, N-1 no-op writes, protect the DB |
| 02:37:56-02:42:56 | 9 | auxiliary Redis flow, failure, consistency, next week |
| 02:42:56-02:47:56 | 9 | Q&A: threshold, key model, sync failure, no distributed tx |
| 02:47:56-02:52:56 | 8 | Q&A: read-before-write, Gravatar hash, "unsent", resources |
| 02:52:56-02:55:36 | 6 | resources (EXPLAIN, docs, staging), auxiliary Redis cluster |

The three 7-item windows were re-read: they are slow student-teacher dialogue (repeated clarifications, naming of keys); every substantive turn is covered.

## Doubts / open questions
- K3-012: "newly means less than 24 hours, that is last time when I clicked on the message icon" - transcript flags diarization lag; the "24 hours" clause may be Student 3's and the "since last click" definition the teacher's. Requirements on the board (S44) do not mention 24 hours.
- K3-031: the 02:19:57 fragment "database because like similar query you'll fire there" is labelled "Teacher?"; meaning unclear (possibly the teacher noting the same query would be fired in a NoSQL store).
- K3-034 / K3-035: O(1) is an ASR reconstruction ("over", "over and over"); "Correct." at 02:23:32 is "Teacher?".
- K3-047: "Correct, correct. So the client also is offline, yeah." may be a teacher interjection inside the student's turn.
- K3-053: sentence before "Help of online, offline indicator service" may be cut; board S53 shows "or ONLINE/OFFLINE service", which supports the reading.
- K3-063 / K3-082: the teacher's numbers are loose (10,000 messages vs "other 99 checks" / "99999 entries"); kept as said in detail.
- K3-084: "[?write failed | asr: right field]" and "[?worst | asr: WhatsApp was]" reconstructions; the direction (which of the two writes fails) is ambiguous in audio.
- K3-089: student/teacher label boundaries mixed at 02:47:58 (transcript flag).
- K3-091: Gravatar Q&A refers back to part 2's Gravatar design (MD5 of email); editor may cross-link to the part 2 Gravatar items.
- Board S55 has "can batch here / { if part = recv id" (pink) on the read/write diagram with no matching speech in part 3 - board-only, for the editor.
- Board S55 "Notification System" box is never discussed in audio in this part.
- Possible cross-part duplicates for the gap hunter: "database is the most brittle component" (K3-060, K3-067) likely repeats earlier lectures/parts; K3-075 / K3-085 / K3-087 all argue "accept inconsistency, not financial" from different prompts (kept separate: design remark, failure-case answer, transactional-question answer).
