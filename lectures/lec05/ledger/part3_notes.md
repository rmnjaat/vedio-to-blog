# Lecture 05 ledger, part 3 (02:02:59 - 03:21:33): notes

File: `part3.jsonl`, 146 items (K3-001 .. K3-146), validator: PASS (0 errors, 0 warnings). Every line is valid JSON with every schema field present. Verbatims are at most 25 words and were all found word for word in the transcript.

## Topic tree

- **KV store on a relational DB: single MySQL node**
  - Approach (start single node, no distribution on day zero): K3-001; keep it simple: K3-072 (system-design > principles)
  - Storage / schema (store: key, value, TTL, is_deleted; drop the habitual ID column): K3-002, K3-003
  - Delete / soft delete (-1 in the absolute expiration, delete = update, batch hard delete, minimal B+ tree rebalancing): K3-005, K3-006, K3-046, K3-047, K3-079, K3-080, K3-122
  - Delete micro-optimization (`AND TTL > now`, saves 2 disk IOs, found in Apache Ignite): K3-040 to K3-043, K3-077, K3-081
  - Put / upsert (REPLACE INTO in MySQL, UPSERT in Postgres; get-then-write is "pathetic"): K3-007 to K3-009; SELECT TOP 1 1 Q&A (4 vs 2 network trips, people forget upsert): K3-116 to K3-119
  - Put / concurrency (leverage SQL locks / isolation, FOR UPDATE NOWAIT, choice depends on guarantees): K3-010 to K3-012
  - Put / in-memory layer proposal (student; cache, limited by memory): K3-049, K3-050
  - TTL batch deletion (cron every 10 min; on disk skim rather than sample): K3-013, K3-092
  - Get with expiry filter (`AND expired_at > now`, saves network and disk IO): K3-014, K3-015; final queries: K3-045
  - Performance principles (micro-optimizations, disk IO only when needed, TTL index): K3-016, K3-044, K3-048
  - TTL column = absolute expiry time: K3-078
- **TTL in in-memory DBs / Redis**
  - Lazy deletion (definition, in-memory only, malloc/free, disk vs memory): K3-017 to K3-021
  - Redis lazy deletion and the two hard-delete triggers, never-accessed keys: K3-022 to K3-024
  - Redis merges lazy + periodic, speed over completeness, single threaded, memory-leak trade-off: K3-025 to K3-027, K3-033, K3-034, K3-039
  - Sampling algorithm (20 keys, 25% repeat rule, statistics, 15% example, 20-25% memory, central limit theorem, 5 million keys): K3-028 to K3-032, K3-035 to K3-037
  - Sampling Q&A (deleted-from-sample count, sample only, why not on disk: 20 random disk IOs): K3-088 to K3-091
  - Why Redis deletes inline instead of delegating to a cron (free is microseconds, frees memory at full capacity): K3-125 to K3-127
- **KV store high-level architecture**
  - Why distribute, one-node architecture, add API servers, access patterns: K3-052 to K3-055
  - Replicas (staleness, consistent reads/writes to master, API holds connections, no central proxy): K3-056 to K3-058
  - Sharding (vertical first, definition, A-M / N-Z ranges, cleanup job per master, quarterly resharding, split into 3): K3-059 to K3-062, K3-068 to K3-070
  - Routing at the KV API (Google/Zomato example, request flow, intelligent balancing aside): K3-063 to K3-065, K3-067; summary: K3-071
  - ACID (same ACID without partitioning, none across partitions, distributed transactions slow, ACID within a shard): K3-082 to K3-085
  - Exercise (local MySQL x2 + API + routing, binlog replica stretch, mock locally): K3-073, K3-074, K3-087
  - Real KV stores vs this design (Redis, DynamoDB, Apache Ignite; own storage layer): K3-131, K3-132, K3-134
- **Concurrency Q&A**: autocommit K3-093; N(N+1)/2 evaluations K3-094; SKIP LOCKED reads a disk page K3-095, K3-096; LIMIT applied last K3-097; lock wait timeout K3-120, K3-121
- **Databases**
  - ORMs (opinion, non-optimal queries, stored procedures, mid-scale vs high scale, startups, all columns, readability, DB-specific constructs, connection pooling, native-query compromise, 10-15 table joins): K3-004, K3-098 to K3-107
  - Deletion in databases (almost all do soft delete + batch cleanup; why DBs do not offer soft delete; cognition; DynamoDB; 2012 MySQL forum; what not to do): K3-123, K3-139 to K3-143
- **Communication**: online/offline indicator, server cannot connect to the user's IP, WebSocket needs no heartbeat, disable-WebSocket experiment: K3-128 to K3-130
- **Programming languages (aside)**: Java vs Go: K3-108 to K3-113; language lifecycle: K3-114, K3-115
- **System design principles**: no one way to build a system K3-038; keep it simple K3-072
- **Learning approach**: implement it K3-075; write code, make mistakes K3-136; deadlock war story K3-137; only build what you want to learn K3-146
- **Admin / course structure**: roadmap K3-051 (perf optimizations wk 5-6), K3-066 (hot partitions wk 5-7), K3-076 (consistent hashing wk 5), K3-133 (distributed cache wk 5), K3-135 (LSM tree wk 6), K3-138 (load balancer implementation), K3-144 (next session: NoSQL, scaling WebSockets / Slack); reading K3-124; assignment K3-145; aside K3-086

## Counts by type

| type | n |
|---|---|
| qa_insight | 34 |
| claim | 27 |
| concept | 22 |
| rule_of_thumb | 18 |
| process | 12 |
| admin_reference | 8 |
| example | 7 |
| number | 6 |
| tradeoff | 5 |
| war_story | 3 |
| definition | 2 |
| comparison | 2 |
| **total** | **146** |

Speakers: teacher 129, student (question) 12, student (proposal) 5. Status: endorsed 143, proposed_then_corrected 2 (K3-090, K3-120), open 1 (K3-096).

## Coverage by 5-minute window

Counted by each item's first audio timestamp.

| Window | Items | Note |
|---|---|---|
| 02:02:59-02:07:59 | 16 | schema, soft delete with -1, upsert, concurrent puts, cron batch deletion |
| 02:07:59-02:12:59 | 11 | get filter, lazy deletion, Redis lazy + periodic |
| 02:12:59-02:17:59 | 8 | Redis sampling: 20 keys, 25%, statistics, 15% example, single thread, 20-25% memory. Dense but one connected explanation, so all of it is covered |
| 02:17:59-02:22:59 | 12 | CLT / 5M keys, trade-off, delete clause, Apache Ignite, final queries, start of the -1 Q&A |
| 02:22:59-02:27:59 | 5 | Q&A: magic value, TTL index, in-memory layer proposal. Much of this window is crosstalk and admin (calling on students, a broken voice). Re-read and nothing is missing |
| 02:27:59-02:32:59 | 14 | one-node architecture, replicas, sharding, routing |
| 02:32:59-02:37:59 | 11 | request flow, 90% of sharded DBs, quarterly resharding, local exercise, delete-clause Q&A |
| 02:37:59-02:42:59 | 10 | TTL = absolute time, user vs batch delete, ACID across partitions |
| 02:42:59-02:47:59 | 6 | mocking locally, sampling Q&A (on disk: 20 random disk IOs). Re-read: the long answers are covered by K3-088 to K3-092 |
| 02:47:59-02:52:59 | 7 | autocommit, N(N+1)/2 evaluations, SKIP LOCKED reads a page, LIMIT, ORMs start |
| 02:52:59-02:57:59 | 9 | ORM arguments, Java preferences |
| 02:57:59-03:02:59 | 7 | Java vs Go, FizzBuzz Enterprise Edition, language lifecycle, TOP 1 1 question |
| 03:02:59-03:07:59 | 10 | network round trips, lock wait timeout, B+ tree rebalancing, Redis free vs cron |
| 03:07:59-03:12:59 | 7 | memory at full capacity, online/offline, WebSocket heartbeat, real KV stores |
| 03:12:59-03:17:59 | 9 | distributed cache wk 5, own storage layer, LSM wk 6, make mistakes, why DBs do not soft delete, DynamoDB |
| 03:17:59-03:21:33 | 4 | MySQL forum story, what not to do, next session, assignment (short final window) |

## Doubts / open questions

- **TTL column naming**: the teacher uses "TTL", "expired at" and "absolute expiration time" for the same column. The items follow his wording; K3-078 records that TTL here means expired_at.
- **K3-046 / K3-047 (-1 vs magic value Q&A, 02:22:38-02:24:30)**: the speaker boundaries between Student 1 and the teacher are uncertain (several `check: speaker boundary` flags). The 1 January 1970 suggestion may come from either speaker.
- **K3-049 (in-memory layer proposal)**: the teacher's reply starts mid-sentence, so his verdict reads as "you can do that, but it is a cache, not the core transactional DB". Marked endorsed with the caveat in K3-050.
- **K3-096**: "Right. Yeah." sits inside the student's turn, so it is unclear whether the teacher confirmed "only 120 evaluations". Status is open.
- **K3-107 (native queries in ORM)**: the questioner's label is unclear (STUDENT_1 vs Student 5).
- **K3-116 (SELECT TOP 1 1)**: the teacher and Student 1 alternate under one TEACHER label, and the question is labelled STUDENT_1 although the teacher had just called "Simran".
- **K3-037 (works up to 5 million keys)** and **K3-036 (central limit theorem paper on Redis's website)**: recorded as stated. These are worth checking against sources in the fact-check.
- **K3-035 (20-25% of memory)** and **K3-031 (25% threshold)**: as stated by the teacher. Fact-check candidates.
- **K3-141**: the teacher first said "Redis and DynamoDB" do soft deletion, then corrected himself to DynamoDB only. The item keeps only DynamoDB.
- **K3-142 (MySQL forum 2011/2012)**: the teacher is unsure of the exact year and venue, and the item keeps that hedge.
- **Board**: the board may resolve the `[?arch]`, `[?commit log]` and delete-query wording (`TTL > now` clause, 02:19:43-02:22:17), as well as the A-M / N-Z architecture diagram (02:28:15-02:34:58).
