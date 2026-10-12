# Lecture 01: fact-check treatments applied

Policy (from the brief, applied mechanically):
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its source.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added).
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction.
- **unverifiable:** stated as the class's (or one team's) experience or opinion, with no empty source link (per `verdict_review.md`). Unverifiable-low items also get a light hedge.
- **accurate-low** (3 items): a small wording fix.

Verdict overrides from `verdict_review.md` are applied: L-0158 is imprecise/medium (was wrong); L-0244 is wrong/medium (was wrong/high); L-0288 is outdated/medium (was wrong). Kafka version wording uses 4.3 as current. The GCM source is worded 'announced for removal as soon as April 11, 2019'. The RabbitMQ quotes use the corrected phrases.

Counts: 169 flagged items = 31 with a SourceNote (28 notes) + 36 inline clarifications + 51 left as taught + 51 attributed as unverifiable.

## 1. SourceNotes

### SN-01 · §1.7 · L-0030 (imprecise/medium)
- **Teacher's point (kept):** A student proposed database views as a form of caching: they save executing the query when data doesn't change much, and avoid query prep...
- **More precisely:** A plain view stores only its query and re-runs it on every read, so it caches nothing. A materialized view does store results, but in PostgreSQL it is not kept current automatically: it stays as of the last REFRESH MATERIALIZED VIEW.
- **Sources:** https://www.postgresql.org/docs/current/rules-materializedviews.html · https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/refreshing-materialized-views.html

### SN-02 · §1.7 · L-0036 (imprecise/medium)
- **Teacher's point (kept):** Materialized views must be updated explicitly; database triggers are used to 'refresh' them (refresh is the official term).
- **More precisely:** 'Refresh' is the right word; triggers are not the standard mechanism. PostgreSQL refreshes only on an explicit REFRESH MATERIALIZED VIEW (often scheduled; REFRESH ... CONCURRENTLY avoids blocking readers but needs a unique index). Oracle can refresh automatically ON COMMIT or ON STATEMENT, and its fast refresh applies only the changes.
- **Additions used:** A-CS-01, A-CS-02
- **Sources:** https://www.postgresql.org/docs/current/rules-materializedviews.html · https://www.postgresql.org/docs/current/sql-refreshmaterializedview.html · https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/refreshing-materialized-views.html

### SN-03 · §1.3 · L-0061 (imprecise/medium)
- **Teacher's point (kept):** A local disk read is much faster than the network I/O needed to read from a centralized cache; network is 'pathetically slow' compared to...
- **More precisely:** On cloud VMs the default disk (EBS, GCP Persistent Disk) is itself network-attached, and an uncached random SSD read (about 150 µs) is the same order as a round trip inside one datacenter (about 500 µs; classic c. 2012 figures). A disk cache wins mostly because the OS page cache keeps hot files in RAM, and because no shared remote service sits in the path.
- **Additions used:** A-CS-03
- **Sources:** https://gist.github.com/jboner/2841832 · https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html · https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html · https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html

### SN-04 · §1.4 · L-0043 (imprecise/medium)
- **Teacher's point (kept):** A JWT token can be saved in the browser so a bunch of computation is saved.
- **More precisely:** A JWT is a self-contained credential rather than a cache: keeping it on the client lets the server verify it without a session-store lookup. Don't keep it in localStorage, where any injected script can read it; OWASP recommends HttpOnly cookies.
- **Additions used:** A-CS-22
- **Sources:** https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html

### SN-05 · §1.5 · L-0333 (imprecise/medium), L-0334 (wrong/medium)
- **Teacher's point (kept):** CDNs store cached content on disk, not RAM: what is cached on CDNs is mostly images, videos and gigantic responses, which you would not k...
- **Teacher's point (kept):** There is little need for a CDN to cache in RAM: disk access is fast (SSDs give performance relatively similar to RAM) and CDNs are alread...
- **More precisely:** Disk and SSD hold the bulk of a CDN's cache, but RAM is still far faster: about 100 ns per memory reference against about 150 µs for a random SSD read. CDNs keep hot objects in RAM as well; Fastly (2015) ran 384 GB of RAM plus 6 TB of SSD per server and kept commonly used data in RAM.
- **Additions used:** A-CS-05
- **Sources:** https://www.fastly.com/blog/how-our-solid-state-drives-result-cost-savings-customers · https://gist.github.com/jboner/2841832

### SN-06 · §1.6 · L-0068 (imprecise/medium), L-0308 (wrong/medium)
- **Teacher's point (kept):** Load balancers and API gateways (e.g. nginx, AWS load balancer, API gateways) can also cache responses, like a CDN, so requests never rea...
- **Teacher's point (kept):** Cache at the load balancer / API gateway can only be invalidated time-based (TTL): load balancers do not expose an API to invalidate cach...
- **More precisely:** Reverse proxies (nginx proxy_cache) and API gateways (Amazon API Gateway) can cache responses; AWS's Application Load Balancer does not cache at all. TTL is the main lever but not the only one: API Gateway can flush a stage's cache and an authorized client can refresh one entry with 'Cache-Control: max-age=0'; nginx purging is an NGINX Plus feature; CDNs such as CloudFront support invalidation.
- **Additions used:** A-CS-07, A-CS-06
- **Sources:** https://nginx.org/en/docs/http/ngx_http_proxy_module.html · https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html · https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html · https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html

### SN-07 · §2.4 · L-0122 (imprecise/medium)
- **Teacher's point (kept):** When the master goes down, leader election among replicas (a replica is promoted to master) is a way to recover from failures automatical...
- **More precisely:** On Amazon RDS (non-Aurora), automatic failover goes to a Multi-AZ synchronous standby that cannot serve reads, and read replicas are promoted by you, not automatically. Aurora does promote a reader replica automatically, typically in under 60 seconds.
- **Additions used:** A-CS-15
- **Sources:** https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html · https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html · https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html

### SN-08 · §2.4 · L-0326 (imprecise/medium)
- **Teacher's point (kept):** Typical number of read replicas per master: about five (five, six, seven is still OK; five is fine); beyond that you typically do not go.
- **More precisely:** There is no general five-replica ceiling. RDS for MySQL allows up to 15 read replicas per source, Aurora up to 15 readers, and PostgreSQL is bounded by max_wal_senders. The practical number depends on write volume and how the replicas are sized.
- **Additions used:** A-CS-19
- **Sources:** https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_MySQL.Replication.ReadReplicas.html · https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html · https://www.postgresql.org/docs/current/warm-standby.html

### SN-09 · §2.4 · L-0357 (imprecise/medium)
- **Teacher's point (kept):** A vendor-provided database cluster is based on sharding: to the application it appears as one database, but internally data is split acro...
- **More precisely:** Not every vendor cluster is sharded. Oracle RAC, the example raised, is shared-disk: its instances access one set of database files on shared storage. Shared-nothing clusters such as MongoDB sharded clusters or Vitess do split the data.
- **Sources:** https://docs.oracle.com/en/database/oracle/oracle-database/23/adrac/rac_db.html · https://vitess.io/docs/reference/features/sharding/

### SN-10 · §3.3 · L-0158 (imprecise/medium; first pass: wrong/medium)
- **Teacher's point (kept):** Consumers pull messages from the queue; it is (almost) never push-based, with very few instances of push-based consumption.
- **More precisely:** True for SQS (consumers poll with ReceiveMessage, with long polling up to 20 s) and for Kafka and Kinesis. RabbitMQ, the other queue named, normally pushes to subscribed consumers; its docs call polling with basic.get 'highly inefficient' and 'strongly recommended against'.
- **Additions used:** A-DC-05, A-DC-06
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html · https://www.rabbitmq.com/docs/consumers

### SN-11 · §3.3 · L-0161 (imprecise/high)
- **Teacher's point (kept):** When a message is read from a queue it is read exclusively by one consumer; it will not go to any other consumer. All consumers listen to...
- **More precisely:** Exclusivity is not guaranteed. SQS standard queues are at-least-once ('more than one copy of a message might be delivered'), and a message not deleted in time goes back to the other consumers; RabbitMQ redelivers unacked messages too. For total_blogs++ that means a possible double count, so consumers should be idempotent.
- **Additions used:** A-DC-03
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html · https://www.rabbitmq.com/docs/confirms

### SN-12 · §3.3 · L-0210 (imprecise/medium)
- **Teacher's point (kept):** Q: if a consumer fails mid-processing, do you manually replay? A: no, retries are a guarantee of the underlying queue. SQS has a visibili...
- **More precisely:** The mechanism is right; the specifics differ. SQS's default visibility timeout is 30 s (range 0 s to 12 h; AWS suggests about 2 minutes if unsure, and a worker can extend it while working). The message becomes visible again; standard queues have no 'front of the queue'. Retries end at a dead-letter queue after maxReceiveCount, if you set a redrive policy.
- **Additions used:** A-DC-01, A-DC-02
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html

### SN-13 · §3.6 · L-0361 (imprecise/medium)
- **Teacher's point (kept):** Why one partition cannot be read by two consumers (in a group): Kafka could not efficiently track which consumer read which message from ...
- **More precisely:** Right in spirit: one offset per partition per group, plus ordering within a partition, keeps tracking cheap. It is a design choice, though, not an impossibility. Kafka share groups (KIP-932, production-ready in 4.2; 4.3 is current) let several consumers read one partition with per-record acknowledgements, giving up strict order. Partition count still caps ordered parallelism.
- **Sources:** https://kafka.apache.org/42/design/design/ · https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka · https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/

### SN-14 · §3.6 · L-0398 (imprecise/medium)
- **Teacher's point (kept):** Kafka now has a broadcast capability that solves a kind of real-time pub/sub use case, so one cannot simply say Kafka does not support re...
- **More precisely:** No Kafka feature called 'broadcast' appears in the Apache Kafka docs or KIPs (checked through 4.3; this is absence of evidence, not proof). Delivering every message to every consumer group has always been Kafka's basic model. The notable recent change is share groups, which add queue semantics.
- **Sources:** https://kafka.apache.org/42/design/design/ · https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka

### SN-15 · §3.7 · L-0195 (imprecise/medium)
- **Teacher's point (kept):** Kafka guarantees at-least-once semantics, not exactly-once, out of the box. It has started providing some kind of exactly-once, but it is...
- **More precisely:** At-least-once by default is right. But exactly-once exists inside Kafka since 0.11: transactional producers plus read_committed consumers (for example Kafka Streams). The real limit is side effects outside Kafka, such as a database count++, which 'generally requires cooperation' from that system.
- **Additions used:** A-DC-17
- **Sources:** https://kafka.apache.org/42/design/design/ · https://kafka.apache.org/42/configuration/producer-configs/

### SN-16 · §3.8 · L-0395 (imprecise/medium)
- **Teacher's point (kept):** RabbitMQ is mostly known as a message queue, but it has persistent queues that cover the message-stream use case (multiple consumers over...
- **More precisely:** Plain durable queues are still destructive: a message is removed once it is acked. What covers the stream use case is RabbitMQ Streams (since 3.9, 2021), an append-only log with non-destructive reads and replay from an offset or timestamp.
- **Additions used:** A-DC-07
- **Sources:** https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.9.0 · https://www.rabbitmq.com/docs/streams

### SN-17 · §3.8 · L-0310 (imprecise/medium)
- **Teacher's point (kept):** A student's team built an SQS-based architecture; because SQS has no ordering and no sharding, multiple messages for the same database ob...
- **More precisely:** Only SQS standard queues lack ordering. SQS FIFO queues keep strict order per MessageGroupId (later messages of a group wait while one is in flight) and deduplicate, which is the per-key guarantee the team moved to Kinesis for.
- **Additions used:** A-DC-04
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html

### SN-18 · §4.3 · L-0228 (imprecise/medium)
- **Teacher's point (kept):** Lock-free data structures exist, such as CRDTs ('the most brilliant data structures'); they won't be covered (advanced data structures), ...
- **More precisely:** These are two different families. CRDTs are replicated data types: copies on different machines are updated independently and merged without coordination. 'Lock-free data structures' usually means single-machine concurrent structures built on atomic compare-and-swap.
- **Sources:** https://crdt.tech/ · https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html

### SN-19 · §4.3 · L-0231 (imprecise/medium)
- **Teacher's point (kept):** Ensure correctness of such updates using database transactions (ACID properties) or, if not transactions, the database's atomic operations.
- **More precisely:** A transaction by itself doesn't save the clap if the app reads the count, adds one in code and writes it back: under PostgreSQL's default READ COMMITTED both requests can read 100 and write 101. What works is an in-SQL increment (UPDATE ... SET claps = claps + 1, which applies to the latest row version), SELECT ... FOR UPDATE, or REPEATABLE READ / SERIALIZABLE with a retry.
- **Additions used:** A-DC-24
- **Sources:** https://www.postgresql.org/docs/current/transaction-iso.html · https://www.postgresql.org/docs/current/explicit-locking.html

### SN-20 · §5.2 · L-0244 (wrong/medium; first pass: wrong/high), L-0289 (imprecise/medium)
- **Teacher's point (kept):** Each short-poll is a full HTTP request: connect (three-way handshake), one request, one response, teardown, so there is a lot of HTTP ove...
- **Teacher's point (kept):** Student claimed HTTP's TCP isn't persistent; teacher: it is persistent too, but you explicitly break it after the response.
- **More precisely:** TCP closes each direction with its own FIN and ACK, then waits in TIME-WAIT; it isn't a two-way teardown. And HTTP/1.1 connections are persistent by default: repeated polls usually reuse one open TCP/TLS connection until 'Connection: close' or an idle timeout. A new connection per request was HTTP/1.0's default. The per-poll cost is a full request and response with headers, plus server work, times every client, which is still the lecture's point; HTTP/2 multiplexing lowers it further.
- **Additions used:** A-CM-01, A-CM-02, A-CM-22
- **Sources:** https://www.rfc-editor.org/rfc/rfc9293 · https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x · https://www.rfc-editor.org/rfc/rfc9112#section-9.3

### SN-21 · §5.4 · L-0255 (imprecise/medium)
- **Teacher's point (kept):** Like HTTPS is HTTP with SSL, WSS is secure WebSocket. WebSocket does not run on top of HTTP; it is parallel to HTTP, a different specific...
- **More precisely:** WebSocket is 'an independent TCP-based protocol', but its opening handshake is an HTTP/1.1 GET with 'Upgrade: websocket', answered by '101 Switching Protocols', normally on ports 80/443. So proxies and load balancers in the path must handle the upgrade. WSS as WebSocket over TLS is right.
- **Additions used:** A-CM-05
- **Sources:** https://www.rfc-editor.org/rfc/rfc6455 · https://www.rfc-editor.org/rfc/rfc8441

### SN-22 · §5.4 · L-0264 (wrong/medium)
- **Teacher's point (kept):** MQTT, WebSocket and HTTP are specifications; underneath they must run on TCP or UDP, and a persistent connection has to be TCP. How light...
- **More precisely:** The first half is right. But a persistent connection doesn't have to be TCP: QUIC (RFC 9000) is a connection-oriented, stateful transport carried over UDP, and HTTP/3 runs on it. WebSocket and MQTT as specified do need an ordered, reliable byte stream such as TCP.
- **Additions used:** A-CM-21
- **Sources:** https://www.rfc-editor.org/rfc/rfc9000 · https://www.rfc-editor.org/rfc/rfc9114 · https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html

### SN-23 · §5.4 · L-0341 (imprecise/medium)
- **Teacher's point (kept):** If you need WebSockets behind a load balancer, the LB has to be sticky: load balancers that support WSS (the WebSocket spec) forward a cl...
- **More precisely:** A single WebSocket is one long-lived TCP connection, and a load balancer keeps it on one backend for its whole life without any stickiness setting (AWS ALB does this). Sticky sessions matter when one session spans several HTTP requests, as in Socket.IO's long-polling handshake, or when you want a reconnect to land on the same node. The LB must also pass the upgrade: nginx needs the Upgrade and Connection headers set explicitly.
- **Additions used:** A-CM-15, A-CM-16, A-CM-18
- **Sources:** https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html · https://nginx.org/en/docs/http/websocket.html · https://docs.w3cub.com/socketio~4/

### SN-24 · §5.4 · L-0375 (imprecise/medium)
- **Teacher's point (kept):** A thousand clients reconnecting at once does add load, but establishing connections is cheap for the server because it is not doing other...
- **More precisely:** Reconnect storms are a known way to overload what's left of a fleet: each reconnect costs a TCP and TLS handshake, authentication and often a resubscribe, all landing at once. The fix is exponential backoff with jitter on the client, plus connection-rate limits on the server.
- **Additions used:** A-CM-19
- **Sources:** https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter · https://docs.w3cub.com/socketio~4/

### SN-25 · §5.4 · L-0276 (imprecise/medium)
- **Teacher's point (kept):** Q: is there a limit on WebSocket connections? A: the limit is physical, same as any TCP connection: they connect on ports, so the same li...
- **More precisely:** A TCP connection is identified by its 4-tuple, so one listening port (443) can hold millions of connections; WhatsApp reported over 2 million per server (2012). The ephemeral-port limit (about 28k to 64k) bites the side that opens connections to one destination: clients, proxies, load balancers. A server's real limits are file descriptors, memory per connection and CPU for keepalives and TLS.
- **Additions used:** A-CM-20
- **Sources:** https://www.rfc-editor.org/rfc/rfc9293 · https://blog.cloudflare.com/how-to-stop-running-out-of-ephemeral-ports-and-start-to-love-long-lived-connections/ · https://blog.whatsapp.com/1-million-is-so-2011

### SN-26 · §5.6 · L-0286 (wrong/medium)
- **Teacher's point (kept):** Push notifications can also be lost; the difference is their protocol. A persistent connection to GCM always open would be very inefficie...
- **More precisely:** 'Push can be lost' is right: APNs is best-effort, keeps one pending notification per app and may throttle. But the device does keep a persistent connection to the push service (Apple: TCP 5223, falling back to 443). The efficiency comes from one shared OS connection for all apps instead of one per app.
- **Additions used:** A-CM-23
- **Sources:** https://support.apple.com/en-us/102266 · https://developer.apple.com/tutorials/data/documentation/usernotifications/sending-notification-requests-to-apns.md · https://firebase.google.com/docs/cloud-messaging/fcm-architecture

### SN-27 · §5.6 · L-0288 (outdated/medium; first pass: wrong/medium)
- **Teacher's point (kept):** Suggested exploration: integrate natively with GCM once using its documentation.
- **More precisely:** Outdated: Google deprecated GCM in April 2018 and announced its APIs would be removed as soon as April 11, 2019. Integrate Firebase Cloud Messaging (FCM) instead; on Apple devices FCM delivers through APNs.
- **Additions used:** A-CM-24
- **Sources:** https://developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html · https://firebase.google.com/docs/cloud-messaging/fcm-architecture · https://developer.apple.com/tutorials/data/documentation/usernotifications/sending-notification-requests-to-apns.md

### SN-28 · §6 · L-0354 (wrong/high)
- **Teacher's point (kept):** Handling DDoS essentially equals rate limiting: add a rate limiter at a different layer.
- **More precisely:** Rate limiting helps against some application-layer (L7) floods, but not against volumetric or infrastructure-layer attacks (UDP reflection, SYN floods) that fill the network before any limiter sees them. AWS: mitigation needs capacity that scales faster than the flood, absorbed or filtered upstream (CDN/anycast scrubbing, AWS Shield, Cloudflare).
- **Additions used:** A-CS-24
- **Sources:** https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/infrastructure-layer-attacks.html · https://developers.cloudflare.com/ddos-protection/about/attack-coverage/

## 2. Light inline clarifications

| id | verdict | § | treatment on the page | sources |
|---|---|---|---|---|
| L-0022 | imprecise/low | 1.2 | Add after the claim: 'Not only startups: Redis's own docs note many large applications cache in-process, which is why Redis 6 added server-assisted invalidation.' | https://redis.io/docs/latest/develop/reference/client-side-caching/ |
| L-0044 | imprecise/low | 1.4 | Name the mechanism: 'in browsers this is done with Service Workers plus Background Sync and IndexedDB'. | https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API |
| L-0050 | imprecise/low | 1.5 | Parenthetical: 'Prerender.io renders JavaScript pages to HTML for crawlers and caches that HTML'. | https://docs.prerender.io/docs/how-does-prerender-work |
| L-0088 | imprecise/low | 2.2 | Parenthetical: 'usually called linear scalability, and it holds only while shared dependencies keep up, which 2.4 is about'. | none needed |
| L-0101 | unverifiable/low | 2.4 | Unverifiable-low: word as 'a major cause of big outages', with a link to the Google SRE book chapter on cascading failures. | https://sre.google/sre-book/addressing-cascading-failures/ |
| L-0109 | imprecise/low | 2.4 | Keep the sample's PostgreSQL quote, which states it precisely: the replica connects and asks; the primary then streams changes over that connection. | https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html · https://www.postgresql.org/docs/current/warm-standby.html |
| L-0117 | simplified/medium | 2.4 | One sentence after the code: '% N remaps almost every key when N changes, so real routers use consistent hashing, fixed buckets or a lookup directory' (A-CS-17). | https://en.wikipedia.org/wiki/Consistent_hashing · https://vitess.io/docs/reference/features/sharding/ |
| L-0190 | simplified/medium | 3.6 | One clause + link: 'true for classic consumer groups; Kafka 4.2's share groups relax it, at the cost of ordering (see SN-13)'. | https://kafka.apache.org/42/design/design/ · https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/ · https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka |
| L-0192 | imprecise/low | 3.6 | Word as 'one consumer is assigned all three partitions and fetches from them in its poll loop' instead of 'strict round robin'. | https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html |
| L-0207 | simplified/medium | 3.6 | One sentence + A-DC-14: 'size them up front: adding partitions later remaps keys to new partitions, and you can't remove partitions'. | https://kafka.apache.org/42/operations/basic-kafka-operations/ |
| L-0233 | imprecise/low | 5.1 | Parenthetical: 'strictly, Fielding defines REST as an architectural style, a set of constraints, rather than a spec'. | https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm |
| L-0243 | accurate/low | 5.2 | Accurate-low: say '6 million requests per minute (about 100k a second)', not 'concurrent requests'. | none needed |
| L-0247 | imprecise/low | 5.3 | Add: 'off-the-shelf versions exist: Socket.IO falls back to long polling, and SQS exposes it as WaitTimeSeconds' (A-CM-04). | https://docs.w3cub.com/socketio~4/ · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html |
| L-0248 | simplified/medium | 5.3 | One sentence: 'a well-built server doesn't loop per request; it parks the request and wakes it when the event fires, or on timeout'. | https://www.rfc-editor.org/rfc/rfc6202 |
| L-0263 | imprecise/low | 5.4 | Reword: 'MQTT, a lightweight publish/subscribe protocol common on devices, which can itself run over WebSocket' (A-CM-25). | https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html |
| L-0267 | unverifiable/low | 5.5 | Unverifiable-low: keep the examples; no vendor transport claim beyond the class's wording. | https://html.spec.whatwg.org/multipage/server-sent-events.html |
| L-0269 | imprecise/low | 5.5 | Add the counterexample: 'LLM APIs today stream responses to backend services as SSE'. | https://platform.claude.com/docs/en/docs/build-with-claude/streaming |
| L-0277 | simplified/medium | 5.3 | One sentence: 'it scales with an async, event-driven server; each waiting client holds a connection and a request, and after each event everyone re-requests at once'. | https://www.rfc-editor.org/rfc/rfc6202 |
| L-0284 | accurate/low | 5.6 | Accurate-low: write 'GCM (today FCM)'. | https://developer.apple.com/tutorials/data/documentation/usernotifications/sending-notification-requests-to-apns.md · https://firebase.google.com/docs/cloud-messaging/fcm-architecture · https://developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html |
| L-0290 | imprecise/low | 5.7 | Say 'wire protocol'; note that ORMs use 'dialect' for the SQL flavour. | https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PROTOCOL.html · https://www.postgresql.org/docs/current/protocol.html · https://docs.hibernate.org/orm/6.4/javadocs/org/hibernate/dialect/Dialect.html |
| L-0291 | imprecise/low | 5.7 | Mark the byte layout illustrative and give the real MySQL framing (3-byte length + 1-byte sequence id) in Fig 5·i. | https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PROTOCOL.html · https://www.postgresql.org/docs/current/protocol.html |
| L-0307 | imprecise/low | 3.8 | Add: 'standard SNS + SQS; SNS FIFO topics can now archive and replay for up to 365 days' (A-DC-21). | https://docs.aws.amazon.com/sns/latest/dg/message-archiving-and-replay-topic-owner.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html |
| L-0327 | imprecise/low | 2.4 | Say replicas use the replication protocol (MySQL) or streaming / WAL file shipping (PostgreSQL); drop 'SSH' and 'via SQL'. | https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html · https://www.postgresql.org/docs/current/warm-standby.html |
| L-0335 | imprecise/low | 1.5 | Present the tiered RAM, disk, origin model as broadly how CDN tiers work (and link SN-05). | https://www.fastly.com/blog/how-our-solid-state-drives-result-cost-savings-customers |
| L-0339 | unverifiable/low | 3.6 | Unverifiable-low: stated as 'mentioned in class and noted to look up', with SN-14 beside it. | https://kafka.apache.org/42/design/design/ · https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka |
| L-0345 | imprecise/low | 1.5 | Name it: 'SK Broadband in South Korea sued Netflix in 2021, citing Squid Game traffic'. | https://www.nippon.com/en/news/reu20211001KBN2GR2XS/ |
| L-0348 | unverifiable/low | 1.5 | Unverifiable-low: keep 'findable by search' with no specific link. | none needed |
| L-0349 | imprecise/low | 1.5 | Add: 'Akamai placed servers inside ISPs' networks from the late 1990s; Netflix's Open Connect (2011) is the best-known single-provider version'. | https://en.wikipedia.org/wiki/Akamai_Technologies · https://about.netflix.com/en/news/how-netflix-works-with-isps-around-the-globe-to-deliver-a-great-viewing-experience |
| L-0358 | imprecise/low | 2.4 | Reword: 'many open-source databases shard natively (MongoDB, Cassandra, Vitess, Citus); stock MySQL and PostgreSQL are the ones where you shard yourself'. | https://vitess.io/docs/reference/features/sharding/ · https://www.mongodb.com/docs/manual/core/transactions/ |
| L-0360 | imprecise/low | 3.6 | Say 'the Kinesis Client Library assigns shards for you; with the raw API you name the shard'. | https://docs.aws.amazon.com/streams/latest/dev/shared-throughput-kcl-consumers.html · https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html |
| L-0370 | imprecise/low | 1.4 | Add: 'strings only, about 5 MiB; images belong in the HTTP cache or the Cache API'. | https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API · https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria |
| L-0374 | accurate/low | 5.4 | Accurate-low: the backoff-and-jitter note sits in SN-24 beside it. | https://docs.w3cub.com/socketio~4/ · https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter |
| L-0379 | imprecise/low | 5.5 | Add: 'if the connection drops, the browser's EventSource reconnects by itself unless the client calls close() or the server answers 204'. | https://html.spec.whatwg.org/multipage/server-sent-events.html · https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events |
| L-0381 | unverifiable/low | 5.5 | Unverifiable-low: add 'do test reconnect behaviour (Last-Event-ID, retry, proxy timeouts)'. | https://html.spec.whatwg.org/multipage/server-sent-events.html |
| L-0394 | unverifiable/low | 5.5 | Unverifiable-low: add the counterpoint 'LLM APIs are a large production use of SSE'. | https://platform.claude.com/docs/en/docs/build-with-claude/streaming |
| L-0399 | imprecise/low | 3.8 | Soften one item: 'Cassandra offers lightweight transactions (compare-and-set), not full ACID'. | https://dev.mysql.com/doc/refman/8.4/en/json.html · https://www.postgresql.org/docs/current/datatype-json.html · https://hudi.apache.org/docs/concurrency_control/ · https://cassandra.apache.org/doc/latest/cassandra/architecture/guarantees.html |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (not shown as a correction) | 'keep' addition woven in |
|---|---|---|---|
| L-0016 | 1.2 | A shared remote cache gives every app server the same view, but it can still be stale relative to the database unless writes invalidate or update it; 'single source of truth' is the database, not the cache. | - |
| L-0020 | 1.2 | Sticky sessions work, but they can skew load across targets (AWS documents manual rebalancing after scale-up) and if the target fails the user is moved to a new target, losing that server's local cache. | A-CS-21 |
| L-0029 | 1.2 | A local Redis removes the network hop but still costs a loopback socket call plus serialization, so it is slower than an in-process hash map; it does survive app restarts and can be shared by processes on the host. | - |
| L-0045 | 1.4 | localStorage is useful for small data, but it is synchronous (blocks the main thread), string-only and limited to about 5 MiB per origin; IndexedDB or the Cache API suit larger data. | - |
| L-0051 | 1.5 | True that a CDN can cache any HTTP response, but it obeys Cache-Control and its defaults: Cloudflare, for example, does not cache HTML or JSON unless you add a Cache Rule. Personalized responses must be marked private so shared caches don't serve them to other users. | A-CS-08 |
| L-0059 | 1.3 | Root volumes are often 8 GiB by default, but this 'disk' is usually an EBS volume (network-attached block storage, or a GCP Persistent Disk). Disks physically attached to the host are 'instance store', available only on some instance types and wiped when the instance stops. | A-CS-04 |
| L-0084 | 2.2 | Hardware ceilings are real, but in practice the earlier limits are cost (the largest instances cost far more per unit of capacity) and that one machine is still a single point of failure. | - |
| L-0090 | 2.3 | Reactive scaling lags (instances must launch and initialize), so a sudden spike can outrun it. But 'don't work at scale' overgeneralizes: AWS offers scheduled scaling, predictive scaling and warm pools to add capacity before a known spike. | A-CS-20 |
| L-0104 | 2.4 | A common rule of thumb for content and social apps, but it depends on the workload: logging, metrics, IoT and chat are often write-heavy. Measure before relying on it. | - |
| L-0110 | 2.4 | The core MySQL and PostgreSQL servers don't split reads from writes, but drivers and managed services can. Examples: libpq target_session_attrs (primary/standby/prefer-standby), Aurora's reader endpoint that balances across replicas, and proxies. | - |
| L-0139 | 3.1 | The database still performs the same writes eventually; delegation removes them from the request path and lets you control their rate/concurrency (and batch them), rather than eliminating DB load. | - |
| L-0149 | 3.2 | The writes still reach the DB; what changes is that they leave the synchronous path and their concurrency/rate is set by the worker pool, which smooths peaks. | - |
| L-0154 | 3.3 | Useful split, but there is also push-based pub/sub (SNS, RabbitMQ fanout exchanges), which the lecture covers later (L-0303), and products blur the line (RabbitMQ Streams, Kafka share groups). | - |
| L-0168 | 3.5 | Streams remove the coupling of two side effects in one worker, but each consumer is still at-least-once and must be idempotent; streams do not make the counter exactly-once. | - |
| L-0170 | 3.5 | Good first approximation. Streams also support homogeneous groups (one consumer group), and queue systems can fan out to heterogeneous consumers (SNS to many SQS queues, RabbitMQ fanout exchange to several queues). | - |
| L-0172 | 3.5 | Correct in spirit. Kafka retention is per topic by time (default 7 days) and/or size; deletion happens per log segment, and compacted topics keep the latest value per key instead. | - |
| L-0174 | 3.5 | Correct that consumers never delete. The detail 'persisted almost forever' depends on config: Kafka's broker default is log.retention.hours=168 (7 days); Kinesis defaults to 24 h (max 365 days). Long retention must be set explicitly. | A-DC-08 |
| L-0184 | 3.6 | True only while the partition count is unchanged; adding partitions changes which partition a key hashes to for new records. | - |
| L-0186 | 3.6 | Correct from the developer's view. Mechanically, under the classic protocol the broker's group coordinator manages membership while a client-side assignor (default Range/CooperativeSticky) computes the assignment; the KIP-848 protocol (GA in Kafka 4.0) moves assignment to the broker. Consumers can also bypass groups with assign(). | A-DC-13 |
| L-0197 | 3.6 | Conceptually right (shard ≈ partition, per-shard ordering, key hashed to shard). Differences: Kinesis shards have fixed capacity (1 MB/s or 1,000 records/s write, 2 MB/s read per shard); shards can be split and merged, Kafka partitions only added; default retention 24 h vs 7 days; consumer coordination is done by the KCL library, not the service. | A-DC-09, A-DC-10 |
| L-0202 | 3.6 | Correct for group subscription. Nuance: a consumer can be pinned to specific partitions with assign() (manual assignment, no group coordination). | - |
| L-0205 | 3.8 | Direction right. Precisely: SQS charges per API request (each 64 KB chunk = 1 request; 1M free/month). Kinesis provisioned charges per shard-hour + PUT payload units; on-demand charges per GB in/out plus a per-stream-hour fee. Self-managed or MSK Kafka is billed for broker capacity. | A-DC-20 |
| L-0209 | 3.8 | True of a single queue. Fan-out to several consumer groups is also possible with queue tech (SNS to multiple SQS queues, RabbitMQ exchanges binding several queues) without a stream. | - |
| L-0221 | 4.3 | Optimistic 'locking' takes no lock: it detects a conflict (e.g. a version check) and rolls back/retries. Only pessimistic locking blocks others. | - |
| L-0223 | 4.3 | Needs a semaphore with one permit (binary semaphore) or a mutex; a counting semaphore with N>1 permits would not protect count++. For a plain counter, an atomic increment (e.g. AtomicInteger.incrementAndGet) avoids locking. | A-DC-25 |
| L-0227 | 4.3 | In-process, yes (mutex / binary semaphore). In databases, pessimistic locking is done with row/table locks such as SELECT ... FOR UPDATE. | - |
| L-0235 | 5.1 | Fine for teaching. Nuance: many engineers treat RPC (procedure-oriented, e.g. gRPC/Thrift) and REST (resource-oriented) as contrasting styles over HTTP. Calling every HTTP web server 'RPC' is a loose generic usage, not the usual industry framing. | - |
| L-0249 | 5.3 | Same nuance as L-0248. The 'infinite loop in the backend' is one naive way to do it. Production systems usually notify waiting requests when the event (next ball) is published, instead of looping per request. | - |
| L-0252 | 5.4 | Short polling is stateless at the protocol level. Long polling still makes the server hold a pending request (and its TCP connection) per client, so it is not purely stateless. The teacher hedges with 'kind of'. | - |
| L-0258 | 5.4 | Directionally right, but 'very expensive' needs context. An idle WebSocket costs mainly memory, a file descriptor, and per-connection state. Single servers have held over 2 million TCP connections (WhatsApp, 2012). The real costs are statefulness (routing, fan-out across nodes, reconnect storms, deploys that drop connections) and keepalives through proxies. | - |
| L-0260 | 5.4 | Correct in spirit: there is no handshake per message, and frames are small (a 2-byte minimum header, up to 14 bytes with extended length and the client mask). Latency is still bounded by network RTT, so 'lightning speed' means no per-message connection setup or HTTP headers, not faster networking. | - |
| L-0265 | 5.5 | Correct: unidirectional server-to-client over one long-lived HTTP response (text/event-stream). Nuances: (1) the client can still send data to the server with ordinary HTTP requests, just not over that stream. (2) The browser's EventSource reconnects automatically and sends Last-Event-ID so the server can resume. | A-CM-09, A-CM-10 |
| L-0270 | 5.5 | Correct overall. Nuances: SSE is text-only (UTF-8) with no binary frames. Over HTTP/1.1, browsers limit it to about 6 connections per domain across all tabs (not an issue over HTTP/2). WebSocket frame overhead itself is small, so the 'lightweight' advantage is mostly simplicity (plain HTTP, automatic reconnection), not bytes on the wire. | A-CM-11, A-CM-12 |
| L-0272 | 5.7 | Good advice. Nuance for the Socket.IO suggestion: Socket.IO is not a WebSocket implementation. It adds its own packet metadata, falls back to HTTP long-polling, and a plain WebSocket client cannot talk to a Socket.IO server. To learn raw WebSockets, use the browser WebSocket API with a plain server library (e.g. ws). | A-CM-17 |
| L-0279 | 5.7 | The student's proposal (likes sent as normal HTTP POSTs, counts pushed via SSE) is a valid, common pattern. The client doesn't need to send anything over the push channel. 'Plain SSE doesn't fit because users also send' doesn't rule it out; the teacher's 'you can do that' is the accurate part. | - |
| L-0281 | 5.4 | Arithmetic is right (10,000 x 4 B = 40 KB). Nuances: real ticks also need an identifier, timestamp and framing, and prices are often not 4-byte ints. 40 KB/s per client x 1M clients is ~40 GB/s of egress, so server-side filtering or delta updates can matter at scale even if one client handles it easily. | - |
| L-0302 | 1.5 | CDN delivery is the bulk of it, but streaming also needs transcoding into multiple bitrates and adaptive-bitrate packaging (HLS/DASH). Fine as a deferral. | - |
| L-0305 | 3.8 | Mostly true for standard SNS (no store for later reads). However, SNS FIFO topics support message archiving (1 to 365 days) and replay to subscriptions. | - |
| L-0306 | 3.8 | The SNS-to-SQS fanout pattern is AWS-documented and gives per-consumer-type copies, but not Kafka's per-key ordering (unless FIFO topics/queues are used) or arbitrary replay (see L-0307). | - |
| L-0309 | 1.6 | TTL tuning is the primary control, but purge/flush APIs exist in many gateways and proxies (see L-0308). | - |
| L-0312 | 3.8 | Valid criterion. Kinesis maps the partition key to a shard by MD5 hash. SQS FIFO offers the equivalent per-key ordering via MessageGroupId, so the choice is not only SQS vs Kinesis. | - |
| L-0347 | 1.5 | Netflix doesn't just ask ISPs to cache: it gives qualifying ISPs its own Open Connect Appliances at no charge, and the ISP provides rack space, power and connectivity. | - |
| L-0350 | 6 | For HTTP the practical choices are gzip, Brotli and zstd. The choice depends on client support and the CPU-vs-size tradeoff, and pre-compressing static assets is a common win. | - |
| L-0359 | 3.6 | True with subscribe() (group management). Consumers can pick partitions explicitly with assign(). | - |
| L-0363 | 3.8 | For atomic, strongly consistent writes across two stores you need a distributed transaction (2PC), and many databases and brokers don't support 2PC. The common practical alternative is the transactional outbox, which accepts eventual consistency. | A-CS-25 |
| L-0365 | 3.3 | Google Pub/Sub's ack deadline is a direct equivalent (default 10 s, 10 to 600 s per modify). RabbitMQ has no per-message visibility timeout: unacked messages are requeued when the consumer's channel/connection closes, and a consumer delivery-ack timeout (default 30 min) closes the channel. | - |
| L-0376 | 1.4 | TanStack (React) Query keeps its cache in the JavaScript runtime by default and garbage-collects unused entries after gcTime (default 5 minutes); persisting to storage is opt-in. | - |
| L-0382 | 2.4 | Replicas are the main tool, but you don't need to cache everything: reads usually concentrate on a small hot subset, so a partial cache plus replicas (and later sharding) is typical. | - |
| L-0386 | 5.4 | Correct for L7 load balancers and proxies, which terminate the client connection and keep a separate one to the target (AWS ALB: 'one connection with the client and one connection with a target'). Some L4 balancers forward packets without terminating TCP. Then the client's TCP session effectively ends at the backend. | - |
| L-0391 | 5.4 | For pure byte relaying the choice is indeed secondary. But L4 vs L7 matters in practice for long-lived connections: idle timeouts (AWS ALB default 60 s, NLB TCP default 350 s; nginx 60 s proxy_read_timeout), TLS termination, and whether the proxy understands the HTTP Upgrade (L7) or just passes bytes (L4). Teams usually send pings or heartbeats to survive those timeouts. | A-CM-14 |
| L-0397 | 3.8 | Single-document operations in MongoDB were always atomic. Multi-document ACID transactions came in 4.0 for replica sets and 4.2 for sharded clusters. The conclusion (don't say 'MongoDB has no ACID') is correct. | - |

## 4. Unverifiable: attributed, no source link

| id | § | how it is presented |
|---|---|---|
| L-0009 | 4.1 | the class's opinion or heuristic, worded as such (claim) |
| L-0038 | 1.7 | the class's opinion or heuristic, worded as such (claim) |
| L-0047 | 1.4 | a story from practice, attributed (no names) (war_story) |
| L-0063 | 1.3 | a story from practice, attributed (no names) (war_story) |
| L-0086 | 2.2 | a story from practice, attributed (no names) (war_story) |
| L-0134 | 3.1 | course reference, not a claim (admin_reference) |
| L-0135 | 3.1 | the class's opinion or heuristic, worded as such (claim) |
| L-0136 | 3.1 | a story from practice, attributed (no names) (war_story) |
| L-0140 | 3.1 | the class's opinion or heuristic, worded as such (claim) |
| L-0150 | 3.2 | the class's opinion or heuristic, worded as such (claim) |
| L-0151 | 3.2 | analogy, no check needed (analogy) |
| L-0152 | 3.2 | the class's opinion or heuristic, worded as such (claim) |
| L-0164 | 3.4 | the class's opinion or heuristic, worded as such (claim) |
| L-0177 | 3.5 | the class's opinion or heuristic, worded as such (claim) |
| L-0179 | 3.5 | the class's opinion or heuristic, worded as such (rule_of_thumb) |
| L-0180 | 3.6 | the class's opinion or heuristic, worded as such (claim) |
| L-0198 | 3.8 | the class's opinion or heuristic, worded as such (rule_of_thumb) |
| L-0199 | 3.8 | course reference, not a claim (admin_reference) |
| L-0200 | 3.8 | the class's opinion or heuristic, worded as such (rule_of_thumb) |
| L-0206 | 3.8 | the class's opinion or heuristic, worded as such (rule_of_thumb) |
| L-0220 | 4.2 | course reference, not a claim (admin_reference) |
| L-0222 | 4.3 | course reference, not a claim (admin_reference) |
| L-0224 | 4.3 | analogy, no check needed (analogy) |
| L-0226 | 4.3 | the class's opinion or heuristic, worded as such (claim) |
| L-0229 | 4.3 | course reference, not a claim (admin_reference) |
| L-0232 | 5.1 | the class's opinion or heuristic, worded as such (claim) |
| L-0234 | 5.1 | course reference, not a claim (admin_reference) |
| L-0239 | 5.2 | an illustration, kept (example) |
| L-0241 | 5.2 | an illustration, kept (example) |
| L-0259 | 5.4 | course reference, not a claim (admin_reference) |
| L-0261 | 5.4 | an illustration, kept (example) |
| L-0262 | 5.4 | an illustration, kept (example) |
| L-0268 | 5.5 | the class's opinion or heuristic, worded as such (claim) |
| L-0271 | 5.5 | the class's opinion or heuristic, worded as such (number) |
| L-0275 | 5.7 | an illustration, kept (example) |
| L-0282 | 5.4 | the class's opinion or heuristic, worded as such (rule_of_thumb) |
| L-0287 | 5.6 | a story from practice, attributed (no names) (war_story) |
| L-0292 | 5.7 | course reference, not a claim (admin_reference) |
| L-0299 | 6 | course reference, not a claim (admin_reference) |
| L-0300 | 6 | the class's opinion or heuristic, worded as such (claim) |
| L-0314 | 1.8 | an illustration, kept (example) |
| L-0315 | 1.8 | the class's opinion or heuristic, worded as such (number) |
| L-0316 | 1.8 | an illustration, kept (example) |
| L-0320 | 1.8 | the class's opinion or heuristic, worded as such (process) |
| L-0321 | 1.8 | the class's opinion or heuristic, worded as such (process) |
| L-0338 | 3.6 | an illustration, kept (example) |
| L-0343 | 3.6 | course reference, not a claim (admin_reference) |
| L-0346 | 1.5 | an illustration, kept (example) |
| L-0366 | 3.3 | the class's opinion or heuristic, worded as such (claim) |
| L-0380 | 5.5 | the class's opinion or heuristic, worded as such (qa_insight) |
| L-0396 | 3.8 | the class's opinion or heuristic, worded as such (rule_of_thumb) |

## 5. Not flagged by the fact-check

29 ledger items had no verdict (mostly course logistics): L-0001, L-0002, L-0003, L-0004, L-0005, L-0006, L-0007, L-0008, L-0010, L-0039, L-0052, L-0072, L-0077, L-0085, L-0098, L-0114, L-0124, L-0133, L-0216, L-0295, L-0296, L-0297, L-0298, L-0301, L-0331, L-0351, L-0352, L-0384, L-0400. The ones placed are course-structure facts or learning advice and need no check. The dropped ones are listed in `placement.json`.

## 6. Verified additions not used

- A-CM-06: optional; RFC 8441 WebSocket-over-HTTP/2 is not needed for any point made in class.
- A-CM-07: optional; frame-header byte sizes are too low-level for this lesson.
- A-DC-11: optional; KCL's DynamoDB lease tables add cost detail that no class point needs (L-0360's inline note already says 'the KCL does it').
- A-DC-15: optional; sticky partitioning of keyless records isn't relevant, since every Medium example uses a key.
- A-DC-22: optional; duplicates A-CS-25 (transactional outbox), which is used instead.
