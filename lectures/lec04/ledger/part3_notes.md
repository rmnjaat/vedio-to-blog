# Lecture 04 ledger, part 3 (02:11:51 - 03:06:44): notes

File: `part3.jsonl`, 109 items (K3-001 .. K3-109), validator: PASS (errors 0, warnings 0).

## Topic tree

- **Admin / course structure**
  - Agenda: K3-001 (caching then questions), K3-025 (next session: concurrency, communication, scaling, delegation)
  - Deferred to later: K3-020 (cache internals, eviction, LRU/LFU in weeks 3-5), K3-051 (strong consistency next Saturday), K3-074 (Redis TTL internals in week 3), K3-100 (trade-off intuition over 8 weeks), K3-101 (where to stop overthinking, week 6 day 2), K3-106 (stateful HTTP/2 system, week 5 day 2)
  - Logistics: K3-109 (recording/notes upload, do the exercise)
- **Caching**
  - What a cache is (not just RAM; disk IO / network IO / computation): K3-002 to K3-009, K3-011, K3-012, K3-026, K3-027
  - Redis data structures: K3-013
  - Remote cache in the blog example (read flow, single shared copy, DB load): K3-014 to K3-019
  - Fun exercise (find all caching places; Goldman Sachs story; CDN / load balancer hints; trade-offs; local storage question): K3-021 to K3-024, K3-028
  - Compression in caches (trade-off; application-side; 10 KB -> 1 KB blog body; why caches should not compress): K3-040 to K3-046
  - Redis cache vs DB table for pre-computed results (connections, memory vs disk, B+ tree log n, RAM cost, managed cost, piggybacking, worst-case disk read, index not in RAM): K3-052 to K3-060, K3-067, K3-068
- **Fundamentals**: K3-010 (disk, network, CPU, RAM)
- **Database**
  - Soft delete (periodic hard delete, archival, subjectivity, cron job vs availability, strong consistency, staggered deletion, uniqueness index, retention policy, soft delete enables archival): K3-029 to K3-031, K3-048 to K3-050, K3-062, K3-064 to K3-066, K3-076, K3-077
  - Indexes stored on disk: K3-075
- **Compliance > GDPR** (right to be forgotten, Facebook one month, PII, Atlassian 14-day recovery, snapshots, legal hacks, teacher's own GDPR work): K3-032 to K3-039
- **Trade-offs (general)**: K3-061, K3-063, K3-081; learning approach (keep asking questions): K3-047
- **Redis vs DynamoDB** (follow-ups to part 1): vendor lock-in / talent: K3-069 to K3-071; availability: K3-072; Redis as primary DB with AOF: K3-078 to K3-080; autoscaling / lean team: K3-082, K3-083; TTL cost: K3-099
- **Online/offline indicator > last seen**: K3-073, K3-089
- **System design > avoiding DB-specific features** (re-implement, draw a line, Debezium CDC, document limitations): K3-084 to K3-087
- **Connection pooling** (follow-ups to part 2): scaling DB: K3-088; downsides (max connections exhausted, limits API servers, hogging/outage, tune carefully): K3-090 to K3-093; sizing (3-5 min, grow < 50-100, TTL sweet spot, avg query time metric, student follow-up): K3-094 to K3-097; 30,000+ connections: K3-098
- **Communication > HTTP** (stateless, keep-alive, HTTP/2, WebSocket, MQTT, HTTP over TCP/UDP): K3-102 to K3-105, K3-107, K3-108

## Counts by type

| type | n |
|---|---|
| qa_insight | 29 |
| rule_of_thumb | 17 |
| claim | 15 |
| example | 11 |
| admin_reference | 10 |
| concept | 10 |
| tradeoff | 5 |
| process | 3 |
| war_story | 3 |
| misconception | 2 |
| definition | 2 |
| comparison | 1 |
| number | 1 |

## Coverage by 5-minute window

| Window | items | note |
|---|---|---|
| 02:11:51-02:16:51 | 19 | caching definition, remote cache (lecture, dense) |
| 02:16:51-02:21:51 | 9 | fun exercise setup, first questions |
| 02:21:51-02:26:51 | 13 | soft delete cleanup, GDPR, compression start |
| 02:26:51-02:31:51 | 10 | compression, cron job vs availability |
| 02:31:51-02:36:51 | 10 | Redis cache vs DB table |
| 02:36:51-02:41:51 | 6 | staggered deletion, uniqueness index, retention policy (short Q&A turns) |
| 02:41:51-02:46:51 | 11 | worst-case disk read, vendor lock-in, availability, last seen, indexes, archival |
| 02:46:51-02:51:51 | 7 | Redis as primary DB, autoscaling, DB-specific features |
| 02:51:51-02:56:51 | 7 | Debezium, pooling when scaling DB, last seen, pooling downsides |
| 02:56:51-03:01:51 | 8 | pool sizing/TTL, 30k connections, TTL cost |
| 03:01:51-03:06:44 | 9 | course-structure answers, HTTP statelessness, wrap-up |

## Doubts / open questions

- K3-018: "[unclear: \"grid\"]" in the blog-join sentence and "[?API | asr: \"a pay\"]"; meaning (get the blog data) is clear from context.
- K3-020: LFU rests on "[?LFU | asr: \"lf\"]".
- K3-033/K3-034: unclear phrases ("truck", "had a so immediately pull this company", "fii") in the GDPR passage; the one-to-two month window and the harassment example are partly inferred from broken audio.
- K3-044: "CDN" may end the student's sentence rather than start the teacher's answer.
- K3-058: "[unclear: \"gates\"]" before "RAM is more expensive than disk".
- K3-062: the teacher's staggered-deletion numbers shift mid-sentence (1,000 rows per hourly job; 10,000 rows across 10 hours, corrected to 10,000 rows every hour); all kept in detail.
- K3-078: "[unclear: \"primary DVO worker\"]" - read as "primary DB"; K3-080 rests on "[?AOF]" and "[?on-disk]".
- K3-097: the student's follow-up (expand the pool when average query time rises) gets only "Correct." which the transcript attributes to the student; status left `open`, flag kept.
- K3-098: "codes" in the question may mean cores or ports; the answer itself is deferred to Google / week 3.
- K3-108: "HTTP is TC." is cut off; "[?layer 4]" from "layer for".
- K3-028: speaker of the local-storage question is "Student?" (check flag).
- Board: S83-S88 (02:12-02:20) hold the caching board (computation, cache shared by all API servers, fun exercise); the editor should merge those B-items into K3-002 .. K3-024.
