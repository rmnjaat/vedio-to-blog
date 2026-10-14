# Fact-check report: hashtag service, design method, delegation (Kafka / Redis Pub/Sub / DLQ), security, consistency, reliability, scaling, estimation, data engineering (Lecture 09)

Scope: the 155 ledger items of group `hashtag_service_design_method` (topic roots hashtag-service, design-method, delegation, security, consistency, reliability, scaling, estimation, data-engineering). No admin items skipped. **155 items checked.** Date checked: 2026-10-13. Versions: Kafka docs 4.3 (4.1 config pages for broker/consumer defaults, unchanged in 4.x), Spark 4.2, Redis docs (latest), Python docs (current, `docs.python.org/3`).

## Counts

| Verdict | Count |
|---|---|
| accurate | 118 |
| simplified | 17 |
| imprecise | 12 |
| wrong | 3 |
| outdated | 0 |
| unverifiable | 5 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 5 |
| low | 27 |
| none | 123 |

Additions proposed: 24 (see `hashtag_service_design_method_additions.jsonl`).

Calibration: most of this group is design reasoning: read path and write path, black-box boundaries, post IDs vs a denormalised copy, repartitioning for batching. That reasoning is sound and marked accurate. I flagged an item only where a careful reader would leave with a wrong fact about a product (Kafka retention defaults, Kafka availability, DLQ semantics), a wrong pattern definition (CQRS, transactional outbox), or a wrong number (arithmetic slips). Live-class shorthand ("adapter pattern", "horizon") is marked `simplified`/`imprecise` low with the standard term. Personal anecdotes are `unverifiable`, as is one claim whose source I could not open (Instagram's cProfile blog).

## Items needing a decision (ordered by severity)

### L-0323 | wrong | severity: medium

- **Teacher/ledger statement:** Kafka keeps messages forever unless a deletion policy is configured, e.g. periodically deleting messages older than 30 days.
- **Verbatim:** "On Kafka messages will be there forever unless you have configured a deletion policy." (teacher)
- **Issue:** It works the other way round. The broker default is `log.retention.hours = 168` (7 days) with `log.cleanup.policy = delete`, so out of the box data is deleted after a week. Keeping data forever needs explicit configuration (`retention.ms = -1`) or compaction.
- **Suggested note:** Kafka deletes messages after a retention period (7 days by default). You keep them longer, or forever, only by configuring retention.
- **Sources:** [kafka.apache.org](https://kafka.apache.org/41/configuration/broker-configs/)

### L-0344 | wrong | severity: medium

- **Teacher/ledger statement:** A student extrapolated that even a billion hashtags would be about half a gig and fine; the teacher replied jokingly.
- **Verbatim:** "Even for a billion, you would just get to half a gig. That should be fine." (student)
- **Issue:** 10^9 x 0.5 KB = 5 x 10^11 B, which is about 500 GB (half a terabyte), not 0.5 GB. With 64-bit IDs (L-0343) it is about 1 TB. The teacher's joke reads as agreement, and the 1000x slip is exactly the thousand-to-billion jump L-0345 warns about.
- **Suggested note:** A billion half-KB documents is about 500 GB, half a terabyte, not half a gigabyte.
- **Sources:** [nist.gov](https://www.nist.gov/pml/owm/metric-si-prefixes)

### L-0313 | imprecise | severity: medium

- **Teacher/ledger statement:** Kafka can go down: it gives about 99.9% availability, not four nines or five nines.
- **Verbatim:** "Kafka gives you 99.9% availability. It does not give you four, nine, five, nine availability." (teacher)
- **Issue:** Kafka has no built-in availability figure; it depends on how the cluster is deployed. Amazon MSK's SLA uses 99.9% (Multi-AZ) as its credit threshold. Confluent Cloud offers 99.99% for multi-zone Standard/Enterprise (2+ eCKU) and Dedicated clusters, 99.95% for single-zone Dedicated, and 99.5% for Basic. The lesson that Kafka can go down and producers must plan for it is right.
- **Suggested note:** Kafka can go down; its availability depends on how the cluster is deployed (managed-service SLAs range from 99.9% to 99.99%), so plan for broker unavailability.
- **Sources:** [aws.amazon.com](https://aws.amazon.com/msk/sla/), [docs.confluent.io](https://docs.confluent.io/cloud/current/clusters/cluster-types.html)

### L-0266 | imprecise | severity: medium

- **Teacher/ledger statement:** The CQRS pattern exists because of this ability of Kafka to connect services asynchronously; it makes things neat.
- **Verbatim:** "The CQRS pattern that you might have heard of is because of this." (teacher)
- **Issue:** CQRS (Command Query Responsibility Segregation, credited by Fowler to Greg Young) means separate models for writes and reads. It is not caused by Kafka. It "fits well with event-based programming models", and the hashtag document, a read model built from events, is a fair CQRS-style example. Answering "CQRS = Kafka connecting services asynchronously" would be wrong in an interview.
- **Suggested note:** Building a separate, read-optimised store from events, as here, is in the spirit of CQRS, which separates the write model from the read model; Kafka is a common way to connect the two.
- **Sources:** [martinfowler.com](https://martinfowler.com/bliki/CQRS.html)

### L-0359 | imprecise | severity: medium

- **Teacher/ledger statement:** Instead of a separate queue, write the failed message into our own database. Teacher: that is the transaction outbox pattern.
- **Verbatim:** "Basically transaction outbox pattern is what you are talking about." (teacher)
- **Issue:** In the outbox pattern every message is written to an outbox table in the same local transaction as the business update, and a relay then publishes it. That is what removes the dual-write problem. Writing to the DB only after a Kafka write fails is a fallback store and keeps the dual-write gap.
- **Suggested note:** Writing failed messages to your own DB and replaying them later is a fallback store. The transactional outbox pattern writes every message to an outbox table in the same transaction as the business data, and a relay publishes it.
- **Sources:** [microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)

### L-0347 | wrong | severity: low

- **Teacher/ledger statement:** Going from top 100 to top 1 million images per hashtag scales the requirement by 1000x.
- **Verbatim:** "You just scaled your requirements by thousand X." (teacher)
- **Issue:** 1,000,000 / 100 = 10,000x. The point (a big jump in requirements) stands.
- **Suggested note:** From top 100 to top 1 million is a 10,000x increase.
- **Sources:** [nist.gov](https://www.nist.gov/pml/owm/metric-si-prefixes)

## Other non-accurate items

| id | verdict | severity | one-line issue |
|---|---|---|---|
| L-0201 | imprecise | low | Identifying a leaker is forensic watermarking (used with DRM), not DRM itself. |
| L-0202 | simplified | low | Copyright Act s.63: 6 months to 3 years + fine; held non-bailable by the Supreme Court (Knit Pro, 2022), not a government statement; bail is discretionary, not "no questions asked". |
| L-0243 | simplified | low | Per-server batching still aggregates; repartitioning makes it complete and single-writer. |
| L-0245 | simplified | low | Redis channels are cheap (PUBLISH cost depends on subscribers); the real problems are at-most-once delivery and push. |
| L-0246 | imprecise | low | Redis Pub/Sub doesn't persist messages; Redis itself has RDB/AOF, and Redis Streams persist. |
| L-0253 | simplified | low | "100x" isn't a constant; MySQL: multi-row insert "many times faster in some cases". |
| L-0254 | simplified | low | "Adapter" is the teacher's label; the standard term is repartitioning or re-keying (Kafka Streams does it automatically). |
| L-0282 | simplified | low | Partitions cap the useful consumers per group; they don't fix the count. |
| L-0294 | simplified | low | Adding partitions remaps keys and doesn't move existing data. |
| L-0314 | simplified | low | The producer already buffers and retries (32 MiB / 120 s defaults); "DLQ" usually means consumer-side failures. |
| L-0321 | imprecise | low | RDS Multi-AZ failover is typically 60-120 s, not 2-3 s. |
| L-0324 | imprecise | low | "Horizon" is Kinesis's TRIM_HORIZON; Kafka calls it the earliest offset and deletes by segment. |
| L-0326 | simplified | low | Offsets are committed per consumer group and partition, not per consumer ID. |
| L-0328 | simplified | low | Kafka's default for a new group is `latest`, not the horizon. |
| L-0330 | simplified | low | Built-in tiered storage (production-ready in 3.9) keeps segments readable in S3/HDFS and needs a plugin. |
| L-0331 | imprecise | low | Optimising per-server throughput is not vertical scaling. |
| L-0334 | simplified | low | Sampling or continuous profilers are built to run on all production hosts; tracing ones are costly. |
| L-0337 | imprecise | low | Nagios is infrastructure monitoring, not an APM or profiler. |
| L-0341 | simplified | low | CPU limits parallelism (GOMAXPROCS), not goroutine count; goroutines start at a few KB. |
| L-0343 | simplified | low | 4-byte post IDs cap at about 4.3 B; use 8-byte IDs (about 0.84 KB per document). |
| L-0350 | simplified | low | RabbitMQ needs super streams or consistent-hash routing to partition by key. |
| L-0352 | imprecise | low | Kafka does have transactions (atomic multi-partition writes); it lacks lookups and queries. |
| L-0353 | simplified | low | An opinion; Kafka's authors argue it can be a system of record. |
| L-0358 | imprecise | low | SQS's DLQ is for failed consumption; use a plain queue as the fallback. Kafka Connect does have a DLQ. |
| L-0362 | imprecise | low | Kafka and Kinesis are transport, Flume is log collection; the compute options are Spark, Flink and Kafka Streams. |
| L-0364 | simplified | low | Flume is not a compute engine. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0200 | Teacher's own DRM build and self-pentest; personal experience. |
| L-0203 | Teacher's piracy complaints; personal anecdote. |
| L-0339 | Instagram's 2016 post "Web Service Efficiency at Instagram with Python" exists, but I could not open it (instagram-engineering.com / Medium failed or returned 403), so "cProfile in production" is unconfirmed. |
| L-0357 | Teacher's experience building analytics systems on Kinesis. |
| L-0363 | No O'Reilly title "Effective Spark" found; probably "Learning Spark, 2nd Edition" (2020), but the O'Reilly page returned 403. |

URLs not reachable: instagram-engineering.com and medium.com (Instagram posts), oreilly.com (Learning Spark page), assets.confluent.io SLA PDF (binary, not readable; the Confluent cluster-types docs page was used instead), web.archive.org (blocked).
