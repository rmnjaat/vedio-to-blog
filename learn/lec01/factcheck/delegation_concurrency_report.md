# Fact-check: delegation & concurrency (lecture 1)

Scope: 124 ledger items whose topic starts with `delegation` or `concurrency`. Sources are primary docs (Apache Kafka 4.2 docs/KIPs, AWS SQS/SNS/Kinesis guides, RabbitMQ docs, PostgreSQL docs, Elastic docs), all opened on 2026-10-11. Version-sensitive facts are stated with versions.

## Counts

| Verdict | Items |
|---|---|
| accurate | 62 |
| simplified | 23 |
| imprecise | 12 |
| wrong | 1 |
| unverifiable | 26 |

| Severity | Items |
|---|---|
| high | 1 |
| medium | 11 |
| low | 25 |
| none | 87 |

Additions proposed: 25 (see `delegation_concurrency_additions.jsonl`).

Most `unverifiable` items are opinions, analogies, anecdotes or course logistics, which were not judged.

## Items needing a decision

Sorted by severity. Each entry gives the teacher's statement (from the ledger), the issue, and a suggested note with sources.

### L-0161: imprecise (severity: high)
- **Teacher:** When a message is read from a queue it is read exclusively by one consumer; it will not go to any other consumer. All consumers listen to the same queue and run the same business logic.
- **Issue:** Exclusivity is not guaranteed. SQS standard queues are at-least-once: 'more than one copy of a message might be delivered', even within the visibility timeout, and a message also returns to other consumers if it is not deleted in time. RabbitMQ also redelivers unacked messages to other consumers. For the lecture's non-idempotent total_blogs++ this means possible double counts.
- **Suggested note:** A message in a queue is normally handed to one consumer at a time (hidden by the visibility timeout / held unacked), but delivery is at-least-once: duplicates and redelivery to another consumer can happen, so consumers must be idempotent (or use an SQS FIFO queue with deduplication).
- **Sources:** <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html>, <https://www.rabbitmq.com/docs/confirms>

### L-0158: wrong (severity: medium)
- **Teacher:** Consumers pull messages from the queue; it is (almost) never push-based, with very few instances of push-based consumption.
- **Issue:** True for SQS (ReceiveMessage polling, long-poll up to 20 s), but wrong for RabbitMQ, the other queue named: RabbitMQ's normal mode is push (basic.consume); the docs call polling with basic.get 'highly discouraged' and 'very inefficient'.
- **Suggested note:** SQS consumers pull (short or long polling). RabbitMQ consumers normally subscribe and the broker pushes deliveries to them (with a prefetch limit); polling is discouraged. Kafka and Kinesis consumers pull.
- **Sources:** <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html>, <https://www.rabbitmq.com/docs/consumers>

### L-0190: simplified (severity: medium)
- **Teacher:** The biggest limitation of Kafka is its parallelism: consumption parallelism depends on the number of partitions of the topic. With 3 partitions you can have at most 3 consumers per consumer type.
- **Issue:** True for classic consumer groups. Since Kafka 4.2 (Feb 2026) share groups (KIP-932, 'Queues for Kafka') are production-ready and let a group have more consumers than partitions, with per-record acks. Partition count still caps ordered parallelism.
- **Sources:** <https://kafka.apache.org/42/design/design/>, <https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/>, <https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka>

### L-0195: imprecise (severity: medium)
- **Teacher:** Kafka guarantees at-least-once semantics, not exactly-once, out of the box. It has started providing some kind of exactly-once, but it is still not truly exactly-once; there are other ways to achieve exactly-once.
- **Issue:** First half is right: Kafka docs: 'Kafka guarantees at-least-once delivery by default.' But 'not truly exactly-once' undersells it: since 0.11 transactional producers plus read_committed consumers give exactly-once for read-process-write within Kafka (e.g. Kafka Streams). The real limit is external side effects (like a DB count++), which 'generally requires cooperation' from that system.
- **Suggested note:** Kafka is at-least-once by default. It offers real exactly-once processing for Kafka-to-Kafka pipelines (transactions + read_committed); exactly-once effects on external systems (a DB update) need idempotent writes or storing offsets with the data.
- **Sources:** <https://kafka.apache.org/42/design/design/>, <https://kafka.apache.org/42/configuration/producer-configs/>

### L-0207: simplified (severity: medium)
- **Teacher:** Q: more or fewer partitions? A: it depends on the concurrency / consumption speed you need; add more partitions depending on the expected consumption rate.
- **Issue:** Right criterion, but adding partitions has costs: existing data is not moved, key-to-partition mapping changes for keyed topics ('may disturb consumers'), and Kafka cannot reduce partitions. Size partitions up front.
- **Sources:** <https://kafka.apache.org/42/operations/basic-kafka-operations/>

### L-0210: imprecise (severity: medium)
- **Teacher:** Q: if a consumer fails mid-processing, do you manually replay? A: no, retries are a guarantee of the underlying queue. SQS has a visibility timeout: if the consumer fails before deleting the message, after the timeout (typically 2 or 10 minutes) the message reappears at the front of the queue.
- **Issue:** Mechanism is right, specifics are off: the SQS default visibility timeout is 30 s (range 0 s to 12 h), not 'typically 2 or 10 minutes' (AWS suggests starting around 2 min if unsure). The message 'becomes visible again'; standard queues give no 'front of queue' position (best-effort order). Retries are bounded by a DLQ redrive policy (maxReceiveCount), if you set one.
- **Suggested note:** If a consumer doesn't delete a message before its visibility timeout (default 30 s, configurable 0 s to 12 h, extendable via ChangeMessageVisibility) expires, the message becomes visible again and another consumer can receive it. Configure a dead-letter queue to stop endless retries.
- **Sources:** <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html>

### L-0228: imprecise (severity: medium)
- **Teacher:** Lock-free data structures exist, such as CRDTs ('the most brilliant data structures'); they won't be covered (advanced data structures), but know they exist.
- **Issue:** Conflates two ideas. CRDTs are replicated data types that let replicas be updated independently and merged without coordination (distributed systems). 'Lock-free data structures' usually means single-machine concurrent structures built on atomic CAS (e.g. lock-free queues). Both avoid locks, but they are different families.
- **Suggested note:** Alternatives to locks include lock-free/atomic structures on one machine (CAS-based) and, across replicas, CRDTs: replicated data types that merge concurrent updates automatically without coordination.
- **Sources:** <https://crdt.tech/>, <https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html>

### L-0231: imprecise (severity: medium)
- **Teacher:** Ensure correctness of such updates using database transactions (ACID properties) or, if not transactions, the database's atomic operations.
- **Issue:** A transaction alone does not prevent lost updates if the app reads the count, adds 1 in code and writes it back. Under PostgreSQL's default READ COMMITTED both transactions can read 100 and write 101. What works: an in-SQL atomic update (UPDATE ... SET claps = claps + 1, which applies to the latest row version), SELECT ... FOR UPDATE, or REPEATABLE READ/SERIALIZABLE with retry.
- **Suggested note:** Use an atomic in-database update (SET claps = claps + 1) or lock the row (SELECT ... FOR UPDATE) or a stricter isolation level with retries; wrapping a read-then-write in a default-isolation transaction is not enough.
- **Sources:** <https://www.postgresql.org/docs/current/transaction-iso.html>, <https://www.postgresql.org/docs/current/explicit-locking.html>

### L-0310: imprecise (severity: medium)
- **Teacher:** A student's team built an SQS-based architecture; because SQS has no ordering and no sharding, multiple messages for the same database object arrived and multiple consumers picked them up at the same time, and even with retries processing kept failing, so they re-architected and moved from SQS to Kinesis.
- **Issue:** Anecdote (unverifiable), but its factual premise is too broad: only SQS standard queues lack ordering. SQS FIFO queues give strict ordering per MessageGroupId (in-flight messages block later ones in the same group) and exactly-once processing, which addresses this exact 'same DB object' problem.
- **Suggested note:** SQS standard queues are best-effort ordered and at-least-once; SQS FIFO queues keep per-message-group ordering and deduplicate, so per-entity ordering is possible on SQS too (with lower throughput per group).
- **Sources:** <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html>

### L-0361: imprecise (severity: medium)
- **Teacher:** Why one partition cannot be read by two consumers (in a group): Kafka could not efficiently track which consumer read which message from the same partition while also guaranteeing ordering; it is a fundamental implementation limitation.
- **Issue:** The reason is right in spirit: per-partition ordering plus a single-integer offset per partition per group makes tracking cheap. But it is a design choice, not a fundamental impossibility: Kafka share groups (production-ready in 4.2) let several consumers read one partition, tracking per-record state and giving up strict ordering.
- **Suggested note:** Classic consumer groups give each partition to one consumer so that Kafka keeps order and tracks progress with one offset per partition; share groups (KIP-932, Kafka 4.2) allow several consumers per partition by tracking per-record acknowledgements, without ordering guarantees.
- **Sources:** <https://kafka.apache.org/42/design/design/>, <https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka>, <https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/>

### L-0395: imprecise (severity: medium)
- **Teacher:** RabbitMQ is mostly known as a message queue, but it has persistent queues that cover the message-stream use case (multiple consumers over persistent data).
- **Issue:** Plain durable/persistent queues are still destructive (a message is removed once acked), so they don't cover the stream use case. The feature that does is RabbitMQ Streams (since 3.9, 2021): an append-only log with non-destructive reads, many consumers and replay from an offset/timestamp.
- **Suggested note:** RabbitMQ covers the stream use case with RabbitMQ Streams (3.9+), an append-only replicated log that many consumers can read and replay; ordinary durable queues still delete messages once acknowledged.
- **Sources:** <https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.9.0>, <https://www.rabbitmq.com/docs/streams>

### L-0398: imprecise (severity: medium)
- **Teacher:** Kafka now has a broadcast capability that solves a kind of real-time pub/sub use case, so one cannot simply say Kafka does not support real-time pub/sub.
- **Issue:** No Kafka feature named 'broadcast' was found in the Apache Kafka docs/KIPs. Pub/sub fan-out (every consumer group gets every message) has always been Kafka's core model. The recent big change is share groups (queue semantics), not broadcast.
- **Suggested note:** Kafka has always supported pub/sub: each consumer group independently receives all messages of a topic. Recent releases added share groups (KIP-932) for queue-style consumption; there is no separate 'broadcast' feature.
- **Sources:** <https://kafka.apache.org/42/design/design/>, <https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka>

### L-0139: simplified (severity: low)
- **Teacher:** Because the work done inside the request context is bare minimum, delegation gives very fast responses and a good user experience, puts very little load on the database, and lets everything else happen asynchronously.
- **Issue:** The database still performs the same writes eventually; delegation removes them from the request path and lets you control their rate/concurrency (and batch them), rather than eliminating DB load.

### L-0149: simplified (severity: low)
- **Teacher:** Delegation trades a processing delay (from the asynchronous flow) for no synchronous write load on the database: the API server doesn't write directly, there are fewer concurrent writes, and the database experiences less load.
- **Issue:** The writes still reach the DB; what changes is that they leave the synchronous path and their concurrency/rate is set by the worker pool, which smooths peaks.

### L-0154: simplified (severity: low)
- **Teacher:** There are two kinds of broker: message queues and message streams.
- **Issue:** Useful split, but there is also push-based pub/sub (SNS, RabbitMQ fanout exchanges), which the lecture covers later (L-0303), and products blur the line (RabbitMQ Streams, Kafka share groups).
- **Sources:** <https://www.rabbitmq.com/docs/streams>, <https://kafka.apache.org/42/design/design/>

### L-0168: simplified (severity: low)
- **Teacher:** Message streams (Kafka, Kinesis) are the solution to this problem; they work on a different principle from a message queue.
- **Issue:** Streams remove the coupling of two side effects in one worker, but each consumer is still at-least-once and must be idempotent; streams do not make the counter exactly-once.
- **Sources:** <https://kafka.apache.org/42/design/design/>

### L-0170: simplified (severity: low)
- **Teacher:** Message queue = homogeneous consumers; message stream = heterogeneous consumers (e.g., an analytics/backend consumer doing count++ and a search consumer indexing into Elasticsearch, both reading the same messages).
- **Issue:** Good first approximation. Streams also support homogeneous groups (one consumer group), and queue systems can fan out to heterogeneous consumers (SNS to many SQS queues, RabbitMQ fanout exchange to several queues).
- **Sources:** <https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html>, <https://kafka.apache.org/42/design/design/>

### L-0172: simplified (severity: low)
- **Teacher:** In a stream like Kafka, messages are buffered until the retention period is over.
- **Issue:** Correct in spirit. Kafka retention is per topic by time (default 7 days) and/or size; deletion happens per log segment, and compacted topics keep the latest value per key instead.
- **Sources:** <https://kafka.apache.org/42/configuration/broker-configs/>, <https://kafka.apache.org/intro>

### L-0174: simplified (severity: low)
- **Teacher:** Messages in a stream stay until the deletion (retention) policy kicks in, e.g. delete after 40, 60 or 100 days, which is up to you; consumers never explicitly delete them.
- **Issue:** Correct that consumers never delete. The detail 'persisted almost forever' depends on config: Kafka's broker default is log.retention.hours=168 (7 days); Kinesis defaults to 24 h (max 365 days). Long retention must be set explicitly.
- **Sources:** <https://kafka.apache.org/42/configuration/broker-configs/>, <https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html>

### L-0184: simplified (severity: low)
- **Teacher:** If user_id is the partition key, all blogs published by a given user always go to the same partition (user_id is hashed to pick one of the 3 partitions).
- **Issue:** True only while the partition count is unchanged; adding partitions changes which partition a key hashes to for new records.
- **Sources:** <https://kafka.apache.org/42/operations/basic-kafka-operations/>

### L-0186: simplified (severity: low)
- **Teacher:** A set of consumers of the same type reading a topic together is called a consumer group in Kafka; Kafka itself handles assigning partitions to them, you don't have to do anything.
- **Issue:** Correct from the developer's view. Mechanically, under the classic protocol the broker's group coordinator manages membership while a client-side assignor (default Range/CooperativeSticky) computes the assignment; the KIP-848 protocol (GA in Kafka 4.0) moves assignment to the broker. Consumers can also bypass groups with assign().
- **Sources:** <https://kafka.apache.org/42/configuration/consumer-configs/>, <https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/>, <https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html>

### L-0192: imprecise (severity: low)
- **Teacher:** You can have fewer consumers than partitions; with a single consumer it gets messages from all 3 partitions, iterating over them in a round-robin way.
- **Issue:** A single consumer is assigned all 3 partitions and fetches from them in its poll loop; it is not a strict round-robin, and per-poll mix depends on fetch sizes and data availability.
- **Suggested note:** With fewer consumers than partitions, each consumer is assigned several partitions and fetches from all of them; ordering still holds only within each partition.
- **Sources:** <https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html>

### L-0197: simplified (severity: low)
- **Teacher:** Everything about Kafka here holds for Kinesis too: Kafka has partitions, Kinesis has shards: same thing, different terminology, nearly the same underlying architecture; all message streams operate this way, differing only in API and nomenclature.
- **Issue:** Conceptually right (shard ≈ partition, per-shard ordering, key hashed to shard). Differences: Kinesis shards have fixed capacity (1 MB/s or 1,000 records/s write, 2 MB/s read per shard); shards can be split and merged, Kafka partitions only added; default retention 24 h vs 7 days; consumer coordination is done by the KCL library, not the service.
- **Sources:** <https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html>, <https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html>, <https://docs.aws.amazon.com/streams/latest/dev/shared-throughput-kcl-consumers.html>, <https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html>

### L-0202: simplified (severity: low)
- **Teacher:** Q: if a consumer subscribes to partition 1, how does it learn about messages in partitions 2 and 3? A: you never subscribe a consumer to only one partition; with fewer consumers than partitions Kafka distributes round-robin (a single consumer gets messages from all partitions). Ideal is N consumers for N partitions, but fewer is fine; still no global ordering.
- **Issue:** Correct for group subscription. Nuance: a consumer can be pinned to specific partitions with assign() (manual assignment, no group coordination).
- **Sources:** <https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html>

### L-0205: simplified (severity: low)
- **Teacher:** Why not always use streams? Cost: AWS SQS bills per message, while Kinesis bills for the duration it is running (infrastructure constantly running). For smaller workloads, go for SQS rather than waste money on streams.
- **Issue:** Direction right. Precisely: SQS charges per API request (each 64 KB chunk = 1 request; 1M free/month). Kinesis provisioned charges per shard-hour + PUT payload units; on-demand charges per GB in/out plus a per-stream-hour fee. Self-managed or MSK Kafka is billed for broker capacity.
- **Sources:** <https://aws.amazon.com/sqs/pricing/>, <https://aws.amazon.com/kinesis/data-streams/pricing/>

### L-0209: simplified (severity: low)
- **Teacher:** Q: can a message queue have more than one consumer group? A: a queue has one group of homogeneous consumers, whoever reads a message gets it; if you need more than one consumer group, the solution is a message stream.
- **Issue:** True of a single queue. Fan-out to several consumer groups is also possible with queue tech (SNS to multiple SQS queues, RabbitMQ exchanges binding several queues) without a stream.
- **Sources:** <https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html>

### L-0221: simplified (severity: low)
- **Teacher:** Locks are a way to ensure correctness: they protect the critical section. Kinds include optimistic and pessimistic locking.
- **Issue:** Optimistic 'locking' takes no lock: it detects a conflict (e.g. a version check) and rolls back/retries. Only pessimistic locking blocks others.
- **Sources:** <https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html>

### L-0223: simplified (severity: low)
- **Teacher:** Classic implementation: wrap count++ with a semaphore so only one thread at a time enters the count++ while every other thread waits.
- **Issue:** Needs a semaphore with one permit (binary semaphore) or a mutex; a counting semaphore with N>1 permits would not protect count++. For a plain counter, an atomic increment (e.g. AtomicInteger.incrementAndGet) avoids locking.
- **Sources:** <https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Semaphore.html>, <https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html>

### L-0227: simplified (severity: low)
- **Teacher:** Pessimistic locking is implemented with mutexes and semaphores.
- **Issue:** In-process, yes (mutex / binary semaphore). In databases, pessimistic locking is done with row/table locks such as SELECT ... FOR UPDATE.
- **Sources:** <https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Semaphore.html>, <https://www.postgresql.org/docs/current/explicit-locking.html>

### L-0305: simplified (severity: low)
- **Teacher:** A student remarked that SNS has no persistence; the teacher did not respond to this directly.
- **Issue:** Mostly true for standard SNS (no store for later reads). However, SNS FIFO topics support message archiving (1 to 365 days) and replay to subscriptions.
- **Sources:** <https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html>

### L-0306: simplified (severity: low)
- **Teacher:** You can mimic Kafka with SNS plus SQS (SNS fan-out into per-consumer SQS queues).
- **Issue:** The SNS-to-SQS fanout pattern is AWS-documented and gives per-consumer-type copies, but not Kafka's per-key ordering (unless FIFO topics/queues are used) or arbitrary replay (see L-0307).
- **Sources:** <https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html>

### L-0307: imprecise (severity: low)
- **Teacher:** Limitation of SNS+SQS as a Kafka substitute: Kafka keeps historical messages so consumers can go back through old messages; with SNS+SQS you cannot.
- **Issue:** True for standard SNS + SQS: consumed SQS messages are deleted and SQS keeps them at most 14 days. But SNS FIFO topics now offer message archiving and replay (up to 365 days), so 'you cannot' is too absolute.
- **Suggested note:** With standard SNS + SQS there is no replay of already-consumed messages; SNS FIFO topics can archive messages (1 to 365 days) and replay them, though Kafka-style offset rewind per consumer group is still more flexible.
- **Sources:** <https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html>

### L-0312: simplified (severity: low)
- **Teacher:** Ordering and sharding are key criteria when choosing between SQS and Kinesis: with sharding, all messages for a given unique ID land in one shard and are consumed by a single consumer, so you control how they are persisted to the database.
- **Issue:** Valid criterion. Kinesis maps the partition key to a shard by MD5 hash. SQS FIFO offers the equivalent per-key ordering via MessageGroupId, so the choice is not only SQS vs Kinesis.
- **Sources:** <https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html>

### L-0339: unverifiable (severity: low)
- **Teacher:** A student mentioned a Kafka 'broadcasting' feature that pushes messages to all consumer groups of a topic, contrasting it with the traditional view of Kafka as a 'dumb' broker where producers push and consumers pull. The teacher was unsure of its advantages, guessed it is an attempt at real-time pub/sub, and noted it to look up.
- **Issue:** Student claim; no Apache Kafka feature called 'broadcast' was found in the Kafka docs or KIP list. Delivering every message to every consumer group is Kafka's basic model, not a new feature. The nearest new feature is share groups (KIP-932), which is queue-like, not broadcast.
- **Sources:** <https://kafka.apache.org/42/design/design/>, <https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka>

### L-0359: simplified (severity: low)
- **Teacher:** Consumers do not choose partitions: a consumer just comes and reads, and Kafka manages which consumer reads from which partition, making consumer integration easy.
- **Issue:** True with subscribe() (group management). Consumers can pick partitions explicitly with assign().
- **Sources:** <https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html>

### L-0360: imprecise (severity: low)
- **Teacher:** Kinesis manages shard assignment exactly like Kafka ('copy paste same'): when starting a Kinesis consumer you do not specify which shard to read from; it is managed internally.
- **Issue:** Shard assignment is not done by the Kinesis service. The Kinesis Client Library (KCL) does it in your consumers, using a DynamoDB lease table so each shard is held by one worker at a time. With the raw API (GetShardIterator/GetRecords) you must name the shard yourself.
- **Suggested note:** With the KCL you don't pick shards: KCL workers coordinate shard leases through a DynamoDB table (billed to you). Using the low-level Kinesis API, you specify shards explicitly.
- **Sources:** <https://docs.aws.amazon.com/streams/latest/dev/shared-throughput-kcl-consumers.html>, <https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html>

### L-0365: simplified (severity: low)
- **Teacher:** The equivalent of SQS visibility timeout exists in RabbitMQ and Google Pub/Sub too; features get copied across tools, so learn the key term (visibility timeout in SQS) and look up the equivalent in your favourite technology.
- **Issue:** Google Pub/Sub's ack deadline is a direct equivalent (default 10 s, 10 to 600 s per modify). RabbitMQ has no per-message visibility timeout: unacked messages are requeued when the consumer's channel/connection closes, and a consumer delivery-ack timeout (default 30 min) closes the channel.
- **Sources:** <https://docs.cloud.google.com/pubsub/docs/lease-management>, <https://www.rabbitmq.com/docs/confirms>, <https://www.rabbitmq.com/docs/consumers>
