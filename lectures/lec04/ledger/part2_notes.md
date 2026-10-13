# Lecture 04 ledger, part 2 (01:04:14 - 02:11:51): notes

File: `part2.jsonl`, 139 items (K2-001 .. K2-139), validator: PASS (0 errors, 0 warnings). All verbatims are found word for word in the transcript; quotes over 25 words are cut to 24 words plus "...". `depends_on` stays inside part 2.

## Topic tree

- **Online/offline indicator: scale** (heartbeats every 10 s, 1M active users, 6M updates/min, storage vs computation): K2-001 to K2-003
- **Connection pooling** (`concurrency > connection-pooling`)
  - Why it matters, definition, benefits: K2-005, K2-006, K2-010 to K2-013, K2-015, K2-016, K2-018
  - TCP cost (5 network trips, the diagram line, micro updates, DB-side CPU/network cost): K2-007 to K2-009, K2-014
  - Sizing (min/max, wait vs stretch, max 100, DB connection limit, TTL, min 3-5, max = DB limit / servers, 1.2x, telemetry, conservative tuning): K2-017, K2-019 to K2-024, K2-033, K2-039, K2-040, K2-056 to K2-060
  - Implementation (a library in the API server, not a service; blocking queue): K2-025, K2-026
  - When it pays off (micro updates vs big SQL queries; "always a great option"; Q&A "always"): K2-027 to K2-029, K2-055
- **Failure detection in distributed systems** (same heartbeat pattern; load balancer example): K2-030, K2-031; observe the pattern: K2-032
- **Scaling**
  - DB connections as the bottleneck (concurrency -> connections, RAM + NIC, RDS formula, benchmark, high-network instances, vertical vs sharding, heavy queries -> CPU/memory instead): K2-034 to K2-036, K2-041 to K2-047
  - Four things (memory, CPU, disk, network) + examples, horizontal scaling: K2-048 to K2-054
  - Traffic spikes (festival 2x, scale up and down, tune pool max, unit economics): K2-061, K2-062, K2-064, K2-065
- **Managed vs self-hosted** (DynamoDB vs Redis, lean team, managed Redis variants): K2-037, K2-038
- **Foundations**: six core components: K2-068
- **Databases** (running case: multi-user blogging app like Medium)
  - Schema (users, blogs): K2-070 to K2-072
  - Soft delete (definition, hard delete, recoverability/Google Drive, archival + S3 job, audit + police war story, 3-question rule, user-generated data): K2-073 to K2-084, K2-089
  - Soft delete and B+ tree rebalancing (incl. batching Q&A, factor of 100): K2-086 to K2-088, K2-130 to K2-132
  - Column types (fixed-width rows, C structs, varchar inline vs long text by reference, two disk reads, 5,000-char comment, listing pages, keep rows small): K2-090 to K2-100
  - Date time: native type and serialization, string example, 7-day query, formats per DB, convenience vs performance: K2-101 to K2-109
  - Epoch integer (definition, 20 vs 4 bytes, readability, integer comparison, 2032 / 8 bytes, pre-1970): K2-110 to K2-114, K2-133 to K2-135
  - Custom format (Redbus 2016, YYYYMMDD integer, Q&A on flexibility and epoch parity, analytics use case): K2-115 to K2-119, K2-122 to K2-124, K2-129
  - Time zones Q&A (time zone lost, render locally, UTC): K2-125 to K2-127
  - Choosing (be creative, readability/performance/convenience, no format is best): K2-120, K2-121, K2-128
  - MySQL datetime (compressed ~6 bytes, ~20,000 years, balance both worlds): K2-136, K2-137, K2-139
- **Learning approach** (observe the pattern, think holistically, read official docs): K2-032, K2-085, K2-138
- **Admin**: deferred topics (sharding, flash sale): K2-004, K2-063; agenda (break, order change, caching time): K2-066, K2-067, K2-069

## Counts by type

| type | n |
|---|---|
| concept | 32 |
| rule_of_thumb | 23 |
| claim | 19 |
| qa_insight | 19 |
| example | 15 |
| tradeoff | 7 |
| number | 6 |
| process | 5 |
| admin_reference | 5 |
| definition | 4 |
| war_story | 3 |
| analogy | 1 |
| **total** | **139** |

Confidence: high 107, medium 32, low 0.

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 01:04:14-01:09:14 | 11 | 6M updates/min, storage vs computation, TCP cost, pooling definition |
| 01:09:14-01:14:14 | 13 | pool mechanics, DB-side cost, min/max, wait vs stretch |
| 01:14:14-01:19:14 | 9 | max 100, TTL, library + blocking queue, micro vs big queries, failure detection (one dense explanation) |
| 01:19:14-01:24:14 | 9 | Q&A: connection limit, managed vs self-hosted, TTL expiry, connections as the scaling factor |
| 01:24:14-01:29:14 | 13 | Q&A: max connections (RAM/NIC, RDS, benchmark), four things to scale |
| 01:29:14-01:34:14 | 11 | pool min/max sizing, telemetry, festival spike, break announcement |
| 01:34:14-01:39:14 | 0 | break, no speech in recording (01:34:39-01:39:54) |
| 01:39:14-01:44:14 | 13 | six components, blog schema, soft delete: recoverability, archival |
| 01:44:14-01:49:14 | 13 | audit + police story, B+ tree, column types, fixed-width rows |
| 01:49:14-01:54:14 | 12 | long text vs varchar, date time approach 1 |
| 01:54:14-01:59:14 | 9 | string comparison cost, DB formats, epoch; 01:58:44-01:59:24 battery/mic gap |
| 01:59:14-02:04:14 | 10 | epoch trade-offs, Redbus custom format, Q&A |
| 02:04:14-02:09:14 | 10 | time zone Q&A, Redbus use case, soft delete batching Q&A, epoch range Q |
| 02:09:14-02:11:51 | 6 | 2032 limit, pre-1970, MySQL datetime (short window, 2.6 min) |

## Doubts / open questions

- **"206 million" (01:04:14)**: K2-002 assumes 6 million (said before and after); flagged.
- **TCP teardown described as "two-way"** (K2-007, K2-012): this is what the teacher said, kept as is for the fact-checker. The "terminate [unclear]" spot is flagged.
- **Pool max "15 instead of 10" vs "1.2x of the average"** (K2-058): 15/10 is 1.5x. Both kept as said.
- **"As soon as we hit 2032"** (K2-134): the teacher's year for a 4-byte epoch overflow, kept for the fact-checker.
- **Date string "2nd April 22090136Z"** (K2-104): probably garbled. The board may show the exact string and the 20-byte count.
- **Bio length**: about 128 characters at 01:41:37 and about 140 at 01:48:00 (detail of K2-090).
- **Speaker doubts**: 01:19:01 (Student 4's turn may hold the start of the answer, K2-034); 01:22:34 "Teacher?" (K2-040); 01:27:01 follow-up likely DK (K2-049); 01:28:32 "always, always use" may be the teacher (K2-055); 02:04:00 mixed teacher/Student 3 (K2-123); 02:05:13 crosstalk (K2-127).
- **Student proposals marked `endorsed`**: K2-049 (teacher broadened two parameters into four), K2-061 (teacher: "Always."), K2-123, K2-125, K2-127, K2-133 (teacher: "your point is very true"). Only K2-130 (Surya, rebalancing) is `proposed_then_corrected`, because the teacher said "No, no, no" and gave the batching argument.
- **Board**: the schema tables (users/blogs columns), the short vs long text row diagram, the three date-time formats and the connection-pool diagram are probably on the board. The editor should merge them from `board_items.jsonl`.
- Overlap with part 1 to check later: managed vs self-hosted and Redis vs DynamoDB (K2-037/038 vs part 1's 01:02:13 discussion); the WebSockets/real-world remark ends at 01:04:14 in part 1.
