# Verdict review: second fact-checker, lecture 01

Date: 2026-10-11. Scope: every claim verdict marked `wrong` or severity `high`/`medium` in `caching_scaling.jsonl`, `delegation_concurrency.jsonl` and `communication.jsonl` (36 items), plus 15 randomly sampled `accurate` verdicts (seed 7). Every URL cited below was opened and text-searched by me. When I couldn't open a URL, the entry says so.

## Summary

- 36 flagged verdicts re-checked: I agree with 33 outright. I dispute 3: one verdict, one severity and one label.
- 15 sampled `accurate` verdicts: all 15 agree. Caveat: 9 of the 15 cite no source ("Correct as stated for this context"). They are reasoning claims, so this is acceptable, but the site should not show an empty source link for them.
- Version drift since the first pass: Kafka 4.3 (4.3.1, June 2026) is now the current release (https://kafka.apache.org/community/downloads/). Share-group and KIP-848 statements still hold, and `group.protocol` still defaults to `classic` in 4.3 (https://kafka.apache.org/43/configuration/consumer-configs/). Where the text says "as of 4.2", update it to "as of 4.3".

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0158 | wrong / medium | **imprecise / medium** | The teacher hedged: "It's never push base. It's very few instances where you do push base things." The claim is right for SQS (ReceiveMessage polling, https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) and Kafka/Kinesis. It is wrong only as a generalization, because RabbitMQ's normal mode is push. That makes "imprecise" fairer than "wrong". **Quote fix:** the current RabbitMQ docs (v4.3, https://www.rabbitmq.com/docs/consumers) call basic.get polling "highly inefficient" and say it is "strongly recommended against". The phrases "highly discouraged" and "very inefficient" don't appear on that page. |
| L-0244 | wrong / high | **wrong / medium** | I agree on the substance. RFC 9293 closes each direction with its own FIN, ACKed, then TIME-WAIT (Timeout=2MSL). RFC 9112 §9.3 and MDN (https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x) show HTTP/1.1 is persistent by default. But the claim is a supporting detail, and the lecture's real point, that short polling carries a lot of per-request overhead, still holds. "high" overstates the harm; "medium" matches how the other files grade similar errors (L-0264, L-0289). |
| L-0288 | wrong / medium | **outdated** (label), severity medium | The advice was valid when GCM existed. Google's blog (https://developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html) announced in April 2018 that the GCM APIs "will be removed as soon as April 11th, 2019". The fix (point readers to FCM/APNs) is right. Note that this source is a forward-looking announcement, so the verdict's "removed starting April 11, 2019" should read "announced for removal as soon as April 11, 2019". |

## Agreements (with extra evidence where useful)

**Caching and scaling**
- L-0030, L-0036 (imprecise/medium): agree. The PG docs say an MV "cannot subsequently be directly updated" and that the data "is not always current"; refresh is REFRESH MATERIALIZED VIEW (https://www.postgresql.org/docs/current/rules-materializedviews.html). In Oracle, ON COMMIT means "the materialized view is changed every time a transaction commits", and ON STATEMENT refreshes after every DML (https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/refreshing-materialized-views.html). Small correction to the cross-reference: ON STATEMENT does **not** use MV logs (see A-CS-02).
- L-0043: agree. OWASP: "Do not store session identifiers in local storage".
- L-0061: agree. Kernel page cache text confirmed; latency figures confirmed but date from about 2012 (gist), so label them as such. I could not confirm "EBS is network-attached" on the cited ebs-volume-types page. The wording is fine as background, but don't cite that page for it.
- L-0068: agree. The ALB overview page describes routing only and has no caching feature (an absence, not an explicit statement). API Gateway caching and nginx proxy_cache are confirmed.
- L-0117: agree. Wikipedia: modulo remaps "nearly all keys". Vitess routes by keyspace-ID key ranges (https://vitess.io/docs/reference/features/sharding/).
- L-0122: agree. Add that RDS "Multi-AZ" now comes in two forms: a Multi-AZ DB instance standby "can't serve read traffic", and AWS points to Multi-AZ DB clusters for readable standbys. Aurora failover is "typically ... less than 60 seconds, and often less than 30".
- L-0308 (wrong): agree. API Gateway documents stage flush and per-entry invalidation with `Cache-Control: max-age=0` for authorized clients. nginx `proxy_cache_purge` exists but is a commercial-subscription feature. CloudFront has invalidation. One nuance: ALB doesn't cache at all, so the problem is not missing invalidation, it is that load balancers don't cache.
- L-0326: agree. RDS MySQL: "up to 15 read replicas"; Aurora: up to 15 replicas; PG: "any number of standby servers" bounded by max_wal_senders (https://www.postgresql.org/docs/current/warm-standby.html).
- L-0333: agree. Fastly: 384 GB RAM + 6 TB SSD per server, "various algorithms to keep commonly used data in that 384 GB of RAM". **Caveat:** that blog post is dated 13 Feb 2015, so present the hardware figures as historical.
- L-0334 (wrong): agree. The gist puts a memory reference at 100 ns and a random 4K SSD read at 150 µs. Fastly (2015) reports SSD object reads under 500 µs 95% of the time and still keeps hot objects in RAM.
- L-0354 (wrong/high): agree, and the high severity is justified. AWS whitepaper: mitigation requires "a network or systems that scale up capacity more rapidly than the inbound traffic flood". Cloudflare covers L3/4 and L7 separately.
- L-0357: agree. Oracle RAC instances "access a single set of database files on shared storage" (https://docs.oracle.com/en/database/oracle/oracle-database/23/adrac/rac_db.html).

**Delegation and concurrency**
- L-0161 (high): agree. SQS standard: "more than one copy of a message might be delivered", and nothing guarantees against delivery "more than once within the visibility timeout period". RabbitMQ requeue/redelivery confirmed (https://www.rabbitmq.com/docs/confirms).
- L-0190, L-0361: agree. KIP-932 share groups are production-ready in 4.2 and present in 4.3. The design page says share-group consumers "can exceed the number of partitions". KIP-932 says records "can be delivered out of order".
- L-0195: agree. Kafka design: "Kafka guarantees at-least-once delivery by default". Exactly-once to other systems "generally requires cooperation".
- L-0207: agree. "may disturb consumers"; "does not currently support reducing the number of partitions".
- L-0210: agree, with **stronger evidence** against "front of the queue". The SQS DLQ page says: "For standard queues with a redrive policy where maxReceiveCount is greater than 3, if a message is received 3 or more times without being deleted, SQS moves it to the back of the queue." The default is 30 s; the range is 0 s to 12 h; the 12 h limit is not reset by extensions.
- L-0228: agree. crdt.tech frames CRDTs around replicas modified independently; AtomicInteger is single-machine.
- L-0231: agree. PG Read Committed is the default, and a concurrent UPDATE applies "to the updated version of the row".
- L-0310: agree. SQS FIFO: strict per-group order, later messages held while one is in flight, exactly-once processing.
- L-0395: agree. RabbitMQ 3.9.0 (released 2021-07-23) introduced Streams with "non-destructive consumer semantics".
- L-0398: agree. "broadcast" appears 0 times in the Kafka 4.2 design and ops docs and the 4.0/4.2 release posts I fetched. This is evidence of absence, not proof; the wording "not found" is appropriately hedged.

**Communication**
- L-0248, L-0277: agree. RFC 6202: timeouts above about 30 s risk 408/504.
- L-0255: agree. RFC 6455 §1.7: "an independent TCP-based protocol. Its only relationship to HTTP is that its handshake is interpreted by HTTP servers as an Upgrade request". RFC 8441 defines WebSocket over an HTTP/2 stream.
- L-0264 (wrong): agree. RFC 9000: "QUIC is a connection-oriented protocol that creates a stateful interaction"; packets are "carried in UDP datagrams".
- L-0276: agree. Cloudflare: the 4-tuple identifies a connection; the default ephemeral range is about 28k. WhatsApp: "over 2 million tcp connections" per box. That blog is from January 2012, so present it as historical.
- L-0286 (wrong): agree. Apple: devices "need a persistent connection to Apple's servers" (TCP 5223, falling back to 443) (https://support.apple.com/en-us/102266). APNs is best-effort and stores one notification per bundle ID.
- L-0289: agree (RFC 9112 §9.3).
- L-0341: agree. In addition, AWS's target-group doc says "WebSocket connections are inherently sticky ... After the WebSockets upgrade is complete, cookie-based stickiness is not used." Socket.IO (W3cubDocs mirror of the v4 docs) needs sticky sessions only when HTTP long-polling is enabled. The official socket.io site was unreachable from my environment, so the verdict's `docs.w3cub.com/socketio~4/` citation is a mirror; the multiple-nodes page (https://docs.w3cub.com/socketio~4/using-multiple-nodes) is the one that actually supports the stickiness point.
- L-0375: agree. AWS Builder Center: retries are ineffective "if all clients retry at the same time", and jitter is the fix.

## Spot-check of 15 `accurate` verdicts (random, seed 7)

All 15 agree: L-0128, L-0067, L-0356, L-0304, L-0026, L-0034, L-0175, L-0046, L-0325, L-0194, L-0028, L-0162, L-0091, L-0023, L-0041.
Evidence checked where one applies:
- L-0034: the PG MV example aggregates with `sum(...)`.
- L-0175: the Kafka design page has partitions "consumed by exactly one consumer within each subscribing consumer group".
- L-0325: MySQL creates a binlog dump thread per connected replica (https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html).
- L-0304 and L-0162: Kinesis key concepts ("a set of shards").
- L-0046 and L-0028: Redis client-side caching page.
- L-0091: AWS scheduled scaling for predictable load changes (https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html).

The rest are reasoning or context claims with no external fact to check.

## Notes on cited URLs

- `dev.mysql.com` first returned an Oracle "Technical Difficulties" page and loaded on retry. `blog.whatsapp.com` errored once and loaded on retry.
- `socket.io` could not be reached (connection failure from my environment), so the socket.io claims rest on the W3cubDocs mirror only.
- `kafka.apache.org/42/...` pages are version-pinned. They are fine as citations, but 4.3 is current.
