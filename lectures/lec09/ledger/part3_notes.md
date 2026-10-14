# Lecture 09 ledger, part 3 (02:23:11 - 03:26:37): notes

File: `part3.jsonl`, 103 items (K3-001 .. K3-103). Every line is valid JSON with every schema field present. Verbatims are at most 25 words; one longer quote was cut and ends with "...". Validator: PASS (0 errors, 0 warnings, all verbatims found word for word).

Arc: formal walk-through of the full hashtag-page flow (02:23-02:27), the read-path / write-path optimization method (02:27-02:34), key takeaways and next-class admin (02:34-02:36), then a long Q&A (02:36-03:26): Kafka partitioning and counting, Redis Pub/Sub vs Kafka, webhooks vs Kafka, atomic counts, Kafka availability / DLQ / SLA, retention, horizon and checkpoints, scaling vs profiling, CPU vs RAM, hashtag DB size, pagination, Kafka as storage / first point of entry, transaction outbox, Spark / MapReduce.

## Topic tree

- **Hashtag service** (case study: hashtag page)
  - Architecture / full flow: K3-001
  - Counting (batching, count += n, hash table per hashtag, micro writes): K3-003, K3-022, K3-023, K3-025, K3-031, K3-032, K3-083
  - Read API: K3-005
  - Popularity ingest (data science Kafka, copy data, webhooks proposal, replace top-100 array): K3-010, K3-011, K3-040, K3-042, K3-045
  - Storage (atomicity, GC/TTL proposal, document size, billion estimate): K3-044, K3-079, K3-080, K3-081
  - Pagination (1M images per hashtag): K3-084, K3-085, K3-086
- **Delegation / Kafka**
  - Topics: K3-002
  - Adapter pattern: K3-004
  - Partitions (workers = partitions, n partitions by throughput, not one per user): K3-017, K3-029, K3-046
  - Decoupling / Kafka as glue: K3-024, K3-034, K3-088
  - vs Redis Pub/Sub: K3-035 to K3-039
  - Alternatives (in-memory queue, RabbitMQ): K3-087
  - Availability (cluster, 99.9%): K3-047, K3-048
  - Retention / horizon / archiving: K3-058, K3-059, K3-064, K3-065
  - Consumer offsets (horizon, checkpoints, where to start): K3-060 to K3-063, K3-066
  - Use cases (not a source of truth, first point of entry, Kinesis story): K3-089 to K3-094
- **Delegation / async**: K3-043
- **Delegation / dead letter queue** (three options, don't always add a component, SQS/RabbitMQ, outbox): K3-049, K3-054, K3-095, K3-096
- **Caching**: CDN for JSON, CDN vs cache: K3-006, K3-007, K3-008; invalidation/TTL: K3-009
- **Design method**
  - Read path / write path optimization: K3-012 to K3-016, K3-018 to K3-021, K3-026, K3-028
  - Trade-offs: K3-041
- **Reliability**: SLA: K3-050, K3-051, K3-053; availability (Uber SOS, uptime, leaderless): K3-055, K3-056, K3-057
- **Scaling**: horizontal vs optimize: K3-067, K3-068, K3-069; profiling: K3-070 to K3-076; vertical resources (CPU/RAM/goroutines): K3-077, K3-078
- **Estimation**: K3-082
- **Data engineering**: distributed computing / Spark: K3-098, K3-099; resources: K3-100, K3-101
- **Learning approach**: K3-033, K3-102
- **Admin**: next class: K3-027, K3-103; references: K3-030 (week 2 Kafka partitioning), K3-052 (week 7 distributed task scheduler / SLA); scope: K3-097 (MapReduce not covered)

## Counts by type

| type | n |
|---|---|
| qa_insight | 23 |
| rule_of_thumb | 19 |
| claim | 16 |
| concept | 11 |
| process | 10 |
| example | 8 |
| admin_reference | 5 |
| tradeoff | 4 |
| comparison | 3 |
| number | 2 |
| definition | 1 |
| war_story | 1 |
| **total** | **103** |

Importance: core 24, supporting 63, aside 16. Confidence: high 66, medium 36, low 1.

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 02:23:11-02:28:11 | 13 | full flow, CDN/cache, popularity ingest, read/write path intro |
| 02:28:11-02:33:11 | 9 | read/write path method; 02:30:59-02:31:35 is admin (interruption) |
| 02:33:11-02:38:11 | 8 | write-path batching, takeaways, next-class admin, Q&A on separate services |
| 02:38:11-02:43:11 | 5 | Mohan exchange is mostly repetition plus a tense meta-exchange (02:40:18-02:41:23); re-read, nothing more substantive |
| 02:43:11-02:48:11 | 7 | Redis Pub/Sub vs Kafka, webhooks proposal |
| 02:48:11-02:53:11 | 8 | atomicity, top-100 array, partitions per user, Kafka availability, DLQ, SLA |
| 02:53:11-02:58:11 | 10 | repartitioning, week-7 ref, stateful/stateless, Uber SOS, uptime, retention, horizon |
| 02:58:11-03:03:11 | 6 | checkpoints/commit, where to start, retention size, S3 archiving; partly a screen-share hiccup (02:58:40-02:58:51) |
| 03:03:11-03:08:11 | 6 | servers vs optimizing, profiling, canary 90/10; long student question 03:03:37-03:04:57 |
| 03:08:11-03:13:11 | 8 | tools, cProfile, Instagram, CPU vs RAM, goroutines, GC, size estimate |
| 03:13:11-03:18:11 | 9 | billion estimate, do the math, pagination, in-memory queue, Kafka as storage |
| 03:18:11-03:23:11 | 9 | source of truth, first point of entry, Kinesis story, DLQ in Kafka, outbox, MapReduce scope, Spark |
| 03:23:11-03:26:37 | 5 | distributed computing, Spark resources, implement, wrap-up (3.5 min) |

## Doubts / open questions

- **K3-047** (Kafka is a cluster): transcript reads "Kafka is not single instance. Kafka is a single instance." flagged as ASR possibly dropping "not"; the item follows the teacher's clear conclusion "Kafka is a cluster".
- **K3-072**: "19 to 10 ratio" is most likely 90:10 (followed by "those 10% instances"); statement says "e.g. 90/10" with the check flag kept.
- **K3-081**: a student says a billion hashtags would be "half a gig"; at ~512 bytes per document that is ~512 GB. The teacher did not correct it (he joked about investors, then urged "do the calculation"). Recorded as stated, status open, for the fact-checker.
- **K3-074**: teacher calls Nagios the open-source alternative for application-level profiling and names New Relic the biggest; recorded as stated (fact-checker territory).
- **K3-100**: book title "Effective Spark" - the teacher himself was unsure ("mostly the name").
- **K3-040** status `proposed_then_corrected`: the teacher called the webhook idea "a good approach" but then argued against it and recommended Kafka/async; the editor may prefer `rejected` or `open`.
- **K3-053, K3-057** (student proposals: stateful/stateless framing, leaderless replication) left `open`: the teacher answered with trade-offs, not a verdict.
- **K3-083**: mixed speakers at 03:14:12-03:14:39 (confidence low).
- **K3-062**: possible speaker overlap at 02:59:23 (Student 4 may already be speaking).
- **K3-056**: "Even S even S does not give you a hundred percent uptime" - probably "even S3"; the board may resolve.
- **K3-002**: topic name "post_hashtag" and tuple shape are likely on the board diagram; the board may confirm.
- Cross-part: K3-001/K3-003/K3-004/K3-023 restate the adapter design first taught in part 2 (~02:11:54-02:17:20); K3-024 (Kafka as glue) echoes ~02:22:29. The gap hunters / editor should merge carefully (part 3 adds the formal "two Kafkas + processor" phrasing and the takeaways framing).
