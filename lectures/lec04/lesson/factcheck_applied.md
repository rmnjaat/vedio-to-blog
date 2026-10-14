# Lecture 04: fact-check treatments applied

Policy (from `lectures/LESSON_DESIGN_BRIEF.md`, applied mechanically):
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely"; "Since the class" for SN-04) sits directly beside it with the precise version and its source.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added).
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction.
- **unverifiable:** stated as the instructor's (or the class's) experience or story, with no empty source link.

Note on the fact-check's own policy: `policy_summary.md` gave sourced notes to two simplified-medium items (L-0097, L-0177) and inline treatment to every low item. This page follows the brief instead: those two get light inline clarifications with their additions, and simplified-low items are left as taught. The fact-check nuance for each is still listed below for the writers.

Verdict overrides from `verdict_review.md` are applied (already carried in `final.jsonl`): L-0098 is simplified/low (was outdated/low); L-0266 is simplified/low (was simplified/medium). Wording fixes from the review: SN-04 says Amazon Food was 'announced to close' on 29 Dec 2022; SN-16 labels the latency numbers as c. 2009; the PgBouncer home page is not cited for pooling modes.

Counts: 94 flagged items = 17 with a SourceNote (16 notes) + 24 inline clarifications + 41 left as taught + 12 attributed as unverifiable.

## 1. SourceNotes

### SN-01 · §2.3 · L-0332 (imprecise/medium)
- **Teacher's point (kept):** Normally the client sends a request, the server responds and terminates the connection; with the keep-alive header the web server does not terminate...
- **More precisely:** HTTP/1.0 closed the connection after each response unless Keep-Alive was negotiated. HTTP/1.1 keeps connections open by default until one side closes or a timeout hits, and HTTP/2 connections are always persistent (the Keep-Alive header is forbidden there).
- **Additions used:** A-CC-12
- **Sources:** https://www.rfc-editor.org/rfc/rfc9112#section-9.3 · https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview · https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Keep-Alive

### SN-02 · §2.8 · L-0070 (imprecise/medium)
- **Teacher's point (kept):** Final logic: on every heartbeat, update (set) the user's entry in Redis or DynamoDB (whichever DB you choose) with a TTL of 30 seconds (resetting the...
- **More precisely:** Each heartbeat must re-send the TTL: in Redis a plain SET clears any expiry, so write SET user:<id> 1 EX 30 every time. DynamoDB's TTL deletes expired items 'typically within a few days', and until then reads still return them, so store expires_at = now + 30 and treat expires_at < now as offline (filter on Query and Scan).
- **Additions used:** A-OOI-01, A-OOI-02
- **Sources:** https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html · https://redis.io/docs/latest/commands/expire/

### SN-03 · §3.2 · L-0311 (imprecise/medium)
- **Teacher's point (kept):** Using Redis as the primary DB for the online/offline indicator is fine: configure AOF-based persistence to get on-disk persistence with zero data...
- **More precisely:** Redis as the primary store works for presence, but AOF with the default appendfsync everysec can lose about 1 s of writes on a crash; zero loss needs appendfsync always, which is very slow. Replication is asynchronous, so acknowledged writes can also be lost on failover. For presence data, a second of lost heartbeats is harmless.
- **Additions used:** A-D-01, A-D-02
- **Sources:** https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ · https://redis.io/docs/latest/operate/oss_and_stack/management/replication/

### SN-04 · §3.4 · L-0079 (outdated/low)
- **Teacher's point (kept):** A key vendor lock-in reason is competition: if your cloud vendor enters your business, your cloud bill feeds your competitor. E.g. Amazon launched...
- **Since the class:** Since the class: Amazon's food-delivery service ran in parts of Bengaluru from May 2020 and was announced to close on 29 December 2022. The competition argument stands; the example is now historical.
- **Sources:** https://techcrunch.com/2022/11/25/amazon-to-shut-down-food-delivery-business-in-india

### SN-05 · §3.6 · L-0093 (imprecise/medium), L-0094 (imprecise/medium)
- **Teacher's point (kept):** A student proposed Redis because online/offline is time-sensitive and Redis, being in-memory with better performance, is faster than DynamoDB (e.g....
- **Teacher's point (kept):** Redis's advantage for time-sensitive use is persistent connections: with Redis you hold persistent connections, giving extremely low latency (at a...
- **More precisely:** Redis is fast mainly because it serves from RAM with a light protocol, at sub-millisecond latency over long-lived TCP connections. DynamoDB is an HTTPS request/response API with single-digit-millisecond latency; its SDKs do reuse TCP connections, and AWS's own route to microseconds is DAX, an in-memory cache in front of it. The real contrast for presence is that Redis can push events on an open connection and DynamoDB can't.
- **Additions used:** A-D-06, A-D-05
- **Sources:** https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html · https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html

### SN-06 · §4.7 · L-0325 (imprecise/medium)
- **Teacher's point (kept):** If the average query time for a frequently used query goes up, the connection pool for that DB should be expanded.
- **More precisely:** If a query's time rises, find out why first. A bigger pool helps only when the database has spare capacity and requests are queuing for connections; past the optimum, more connections lower throughput (HikariCP's sizing guide starts from cores × 2 + spindles).
- **Additions used:** A-OOI-13
- **Sources:** https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing

### SN-07 · §5.3 · L-0185 (imprecise/medium)
- **Teacher's point (kept):** Another reason for soft deletes is that they are easy on the database: most storage engines store data as a B+ tree, and a hard delete removes the...
- **More precisely:** Engines defer the physical work of a delete (InnoDB purge, PostgreSQL VACUUM) and merge index pages only when they fall below a fill threshold (InnoDB MERGE_THRESHOLD, 50% by default), so a hard delete does not trigger a rebalance each time. Choose soft delete for recovery, archival and audit, not as a B+ tree optimisation.
- **Additions used:** A-D-09, A-D-10
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html · https://www.postgresql.org/docs/current/routine-vacuuming.html

### SN-08 · §5.5 · L-0267 (imprecise/medium)
- **Teacher's point (kept):** Right-to-be-forgotten deletion does not have to be immediate; the one-to-two month window gives breathing space for cases such as the user having...
- **More precisely:** GDPR gives one month to act on an erasure request, extendable by two further months for complex or numerous requests (the person must be told within the first month). Keeping data for a case like harassment rests on a specific exception (legal claims, Art. 17(3)), not on the deadline.
- **Additions used:** A-CC-01
- **Sources:** https://gdpr-info.eu/art-12-gdpr/ · https://gdpr-info.eu/art-17-gdpr/

### SN-09 · §5.5 · L-0268 (imprecise/medium)
- **Teacher's point (kept):** PII is deleted immediately, but logs have everything, so there are hacks to recover data.
- **More precisely:** Live personal data can be erased at once. Copies in logs and backups must be put 'beyond use' (not restored or used) and overwritten on their normal schedule, not kept so the data can be recovered.
- **Sources:** https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/ · https://gdpr-info.eu/art-17-gdpr/

### SN-10 · §5.5 · L-0273 (imprecise/medium)
- **Teacher's point (kept):** GDPR is the compliance regulation that lets a user exercise the right to be forgotten (e.g. ask Instagram to delete everything about them); the...
- **More precisely:** GDPR applies to organisations established in the EU, and to others that offer goods or services to, or monitor, people in the EU. Within that scope, users can demand erasure on specified grounds, subject to exceptions.
- **Additions used:** A-CC-04
- **Sources:** https://gdpr-info.eu/art-3-gdpr/ · https://gdpr-info.eu/art-17-gdpr/

### SN-11 · §5.6 · L-0190 (wrong/medium)
- **Teacher's point (kept):** In a row-based database all the data of a row is stored together in fixed-width rows, so the database knows exactly at which byte each column starts;...
- **More precisely:** Row stores keep a row's columns together. Fixed-length columns sit at known offsets, but variable-length columns such as VARCHAR are located through length fields in the record header, so rows are generally variable length. The lecture's real point, that a row's size is bounded so long values go off-page, still holds.
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html · https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html

### SN-12 · §5.7 · L-0213 (imprecise/medium)
- **Teacher's point (kept):** Epoch integers are lightweight on the index: comparison is a plain integer comparison, the most efficient operation for the database, disk and...
- **More precisely:** Epoch integers are compact and fast to compare, but native date/time types are also compact binary values (MySQL DATETIME 5 bytes, PostgreSQL timestamp 8 bytes) and index almost as efficiently.
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html · https://www.postgresql.org/docs/current/datatype-datetime.html

### SN-13 · §5.9 · L-0224 (imprecise/medium)
- **Teacher's point (kept):** A student pointed out that the native date time format can capture time zone information, which is somewhat lost in the epoch and custom formats, and...
- **More precisely:** Native timestamp types usually normalise to UTC (MySQL TIMESTAMP, PostgreSQL timestamptz) or store no zone at all (MySQL DATETIME). If you need the original time zone, store it in its own column, whichever format you use.
- **Additions used:** A-D-21
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/datetime.html · https://www.postgresql.org/docs/current/datatype-datetime.html

### SN-14 · §5.9 · L-0232 (wrong/low)
- **Teacher's point (kept):** An epoch integer is 4 bytes today, and the integer range maxes out as soon as we hit 2032 (as stated); moving from 4 to 8 bytes doubles the space...
- **More precisely:** A signed 32-bit epoch-seconds value runs out on 19 January 2038 (MySQL's TIMESTAMP ends at 2038-01-19 03:14:07 UTC), not in 2032. Moving to 64 bits doubles the size and removes the limit.
- **Additions used:** A-D-20
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/datetime.html · https://www.postgresql.org/docs/current/datatype-numeric.html

### SN-15 · §5.9 · L-0235 (wrong/low)
- **Teacher's point (kept):** MySQL stores date time in a mind-blowingly efficient way, covering a massive range (from BCE up to, the teacher thinks, about 20,000 years) with very...
- **More precisely:** MySQL DATETIME covers years 1000–9999 in 5 bytes. The very wide range belongs to PostgreSQL, whose 8-byte timestamp spans 4713 BC to 294276 AD.
- **Additions used:** A-D-19
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/datetime.html · https://www.postgresql.org/docs/current/datatype-datetime.html

### SN-16 · §6.3 · L-0288 (imprecise/medium)
- **Teacher's point (kept):** For very small reads (say 10-15 bytes) memory is much faster than disk because disk is humongously slow for small reads; for large reads (say 1 KB)...
- **More precisely:** Databases read storage in pages (8 kB in PostgreSQL, 16 KB by default in InnoDB), so a 15-byte read and a 1 KB read cost the same page I/O; the memory-vs-disk gap narrows only for large sequential reads. The latency figures often quoted for this (100 ns memory, 10 ms seek) date from about 2009.
- **Additions used:** A-CC-09
- **Sources:** https://www.postgresql.org/docs/current/storage-page-layout.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-physical-structure.html · https://brenocon.com/dean_perf.html

## 2. Light inline clarifications

| id | verdict | § | inline treatment | source |
|---|---|---|---|---|
| L-0023 | imprecise/low | 1.1 | Here 'spiral' means building outward from a chosen core component; it is the course's own term, not Boehm's risk-driven Spiral model of software engineering. | https://en.wikipedia.org/wiki/Spiral_model |
| L-0080 | imprecise/low | 3.4 | Walmart avoids AWS (a competitor) and runs a hybrid of Microsoft Azure, Google Cloud and its own private cloud. | https://news.microsoft.com/source/2018/07/17/walmart-establishes-strategic-partnership-with-microsoft-to-further-accelerate-digital-innovation-in-retail/ · https://www.infoworld.com/article/3666468/how-walmart-abstracts-its-hybrid-cloud-for-developers.html |
| L-0090 | imprecise/low | 3.5 | DynamoDB offers durable change capture via Streams + Lambda; Redis offers keyspace notifications (best-effort Pub/Sub) or application-written Streams, not a durable CDC feed. | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html · https://redis.io/docs/latest/develop/pubsub/keyspace-notifications/ |
| L-0095 | imprecise/low | 3.5 | Redis Pub/Sub is right, but Aerospike is not purely proprietary: Aerospike Database Community Edition is 'the AGPLv3 open-source variant'; only Enterprise Edition is closed-source. | https://aerospike.com/docs/reference/faq |
| L-0097 | simplified/medium | 3.6 | Redis can push 'expired' events to subscribers, but they fire when the key is actually evicted (possibly late) and are not delivered reliably; DynamoDB TTL deletions can take days. (with A-D-03) | https://redis.io/docs/latest/develop/pubsub/keyspace-notifications/ · https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html |
| L-0105 | imprecise/low | 4.1 | The whole dataset is tiny (8 MB for 1 million active entries, 8 GB even for 1 billion users), while 6 million writes per minute is the real challenge. | none |
| L-0109 | imprecise/low | 4.2 | A fresh connection costs a TCP handshake (one round trip), the database login exchange (and TLS if used) and a FIN/ACK teardown. Pooling skips all of that on every request. | https://www.rfc-editor.org/rfc/rfc9293.html |
| L-0116 | imprecise/low | 4.2 | Opening a connection costs the database a new backend process or thread, buffers and an authentication exchange, on top of the kernel's TCP handshake. (with A-OOI-16) | https://www.postgresql.org/docs/current/connect-estab.html · https://dev.mysql.com/doc/refman/8.4/en/memory-use.html · https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html |
| L-0117 | imprecise/low | 4.3 | Memory is part of the cost too. Each MySQL connection thread gets its own stack plus connection and result buffers, and each PostgreSQL connection is a separate process. AWS RDS states 'database connections consume memory' and derives the default max_connections from instance memory. AWS also describes pooling as avoiding 'the memory and CPU overhead' of new connections. The teacher's 'not really memory' self-correction goes too far. | https://dev.mysql.com/doc/refman/8.4/en/memory-use.html · https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html · https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html |
| L-0135 | imprecise/low | 4.5 | It does not retry forever by default. The database refuses connections beyond its limit with an error, and pool libraries make the caller wait only up to a timeout (HikariCP connectionTimeout, default 30 s) before failing the request. Requests on the new server fail rather than hanging indefinitely. | https://github.com/brettwooldridge/HikariCP |
| L-0149 | imprecise/low | 4.6 | High-bandwidth instance variants (e.g. c5n, c6in) raise network bandwidth (c5n.large: 3/25 Gbps vs c5.large 0.75/10 Gbps), not connection capacity as such. Connection counts are bounded by database memory and by EC2's per-instance connection-tracking allowance, which grows with instance size. A small-query OLTP database rarely needs a special network class just to hold many connections. (with A-OOI-20) | https://docs.aws.amazon.com/ec2/latest/instancetypes/co.html · https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-connection-tracking.html · https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html |
| L-0159 | imprecise/low | 4.5 | The teacher's practice, not a standard, as stated. Note the side effect: if every server's maximum is above its fair share (100 servers x 12 = 1,200 > 1,000), a busy moment can exceed the database's max_connections. The database then refuses the extra connections with an error; the server does not simply wait. Also, the example (10 -> 15) is 1.5x, not 1.2x. | https://www.postgresql.org/docs/current/runtime-config-connection.html |
| L-0177 | simplified/medium | 5.2 | Deleted content can be valuable to archive, but where privacy law gives users a right to erasure, keeping it (for example for ML training) needs a legal basis. (with A-D-24) | https://gdpr-info.eu/art-17-gdpr/ |
| L-0186 | imprecise/low | 5.3 | A soft delete leaves the row's key in place, but it is still a write: InnoDB treats an UPDATE of an indexed column as delete-mark plus insert in that secondary index, and PostgreSQL's MVCC writes a new row version (UPDATE 'does not immediately remove the old version'). The saving over a hard delete is smaller than 'no rebalancing'. | https://www.postgresql.org/docs/current/routine-vacuuming.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html |
| L-0191 | imprecise/low | 5.6 | The C struct analogy only holds for fixed-length columns (INT, CHAR, DATETIME); variable-length columns break fixed offsets (see L-0190). | https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html |
| L-0197 | imprecise/low | 5.6 | Characters are not bytes: utf8mb4 'can require up to ... four bytes per character', so a 5,000-character comment can be up to 20,000 bytes. The point (large text bloats rows) is right. (with A-D-17) | https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html |
| L-0228 | imprecise/low | 5.3 | What the teacher upheld (batching hard deletes rebalances less) overstates how engines work. InnoDB already defers physical removal to background purge and merges a page only when it drops below MERGE_THRESHOLD, so per-row deletes do not each trigger a rebalance. Batching mainly saves transaction, lock and log overhead. | https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html |
| L-0229 | imprecise/low | 5.3 | Same issue as L-0228: page merges depend on page fill (default below 50%), not on how many DELETE statements you group. Grouping reduces commit and locking overhead. | https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html |
| L-0230 | imprecise/low | 5.3 | Deleting in batches (e.g. 100 rows per commit) cuts per-transaction lock, commit and log overhead; index page merges still happen only when pages fall below their fill threshold. (with A-D-11) | https://dev.mysql.com/doc/refman/8.4/en/delete.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html |
| L-0233 | imprecise/low | 5.9 | Negative epoch values are normal and well supported: MongoDB's BSON Date 'is signed. Negative values represent dates before 1970', with a range of about 290 million years either side. Signed integers handle pre-1970 dates fine; the real constraint is width (see L-0232). | https://www.mongodb.com/docs/manual/reference/bson-types/ |
| L-0269 | imprecise/low | 5.5 | The Atlassian outage happened: on 5 April 2022 a script deleted 883 sites for 775 customers, and restoration took up to 14 days (all restored by 18 April). But it was an operational mistake, not a GDPR erasure. A deletion script was given site IDs instead of app IDs, and Atlassian restored the sites from its 30-day full and incremental backups. Recovering accidentally deleted data from backups is what backups are for. It does not show that companies ignore erasure requests, and GDPR guidance accepts backup copies that are kept beyond use and overwritten on schedule. (with A-CC-05) | https://www.atlassian.com/engineering/post-incident-review-april-2022-outage · https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/ |
| L-0271 | imprecise/low | 5.5 | Calling these 'hacks' to 'maximize what you can' suggests ways around the law. The practices that are legitimate (backups kept beyond use, data kept under an Art. 17(3) exception) are recognised parts of the rules, documented in regulator guidance, not loopholes. | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/ · https://gdpr-info.eu/art-17-gdpr/ |
| L-0296 | imprecise/low | 5.4 | Soft delete conflicts with plain unique indexes; fix it with a partial unique index (e.g. unique on email WHERE NOT is_deleted) or by hard deleting. (with A-D-12) | https://www.postgresql.org/docs/current/indexes-partial.html |
| L-0336 | imprecise/low | 2.3 | HTTP is independent of TCP but needs a reliable, ordered transport; HTTP/3 gets one over UDP via QUIC. | https://www.rfc-editor.org/rfc/rfc9112#section-9.3 · https://www.rfc-editor.org/rfc/rfc9114 · https://www.rfc-editor.org/rfc/rfc9000 · https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (not shown as a correction) | 'keep' addition woven in |
|---|---|---|---|
| L-0041 | 2.3 | The real blocker is direction, not statelessness: HTTP is a client-initiated request/response protocol (RFC 9110 defines the client as the side that opens the connection to send requests), and clients are usually behind NAT, so the server cannot call them. Even a kept-alive HTTP/1.1 connection does not let the server send unsolicited messages. A protocol such as WebSocket (RFC 6455) is needed for two-way messages, which is the board's 'unless there is a persistent connection'. | A-OOI-22 |
| L-0051 | 2.5 | On each heartbeat upsert the row: INSERT INTO pulse ... ON CONFLICT (user_id) DO UPDATE SET last_heartbeat = now(). | A-OOI-06 |
| L-0055 | 2.6 | Fine for the estimate, but a 4-byte signed epoch-seconds value overflows on 19 January 2038 (MySQL's 4-byte TIMESTAMP range ends at '2038-01-19 03:14:07' UTC). A real schema would use an 8-byte timestamp, making it about 12 bytes of payload per user. A 4-byte unsigned user ID covers about 4.29 billion users, enough for the 1B example. | - |
| L-0056 | 2.6 | 8 GB is the raw payload only. A real database adds per-row overhead: PostgreSQL stores a 23-byte tuple header plus a 4-byte item pointer for every row, before the primary-key index. The real footprint is several times 8 GB. The conclusion (storage is not the challenge) still holds. | A-OOI-08 |
| L-0091 | 3.5 | Direction is right, but both examples need qualifiers: MongoDB has multi-document ACID transactions since 4.0 (replica sets) / 4.2 (sharded clusters); mainstream SQL engines still shard mostly through add-ons like Citus (PostgreSQL extension) or Vitess (MySQL clustering), not in the core engine. | A-D-25 |
| L-0098 | 3.1 | Redis is open source (AGPLv3 since Redis 8, after a 2024-25 source-available period; Valkey is a BSD fork), while DynamoDB is proprietary. | A-D-07 |
| L-0101 | 2.8 | Real presence systems keep a persistent connection open. WebSocket is one option, but not the only one: Facebook Messenger built its persistent connection on MQTT to save battery. The point stands: production presence rides on a long-lived connection, not on polling REST heartbeats. | A-OOI-18 |
| L-0104 | 4.1 | 6M updates/minute is 100k writes/s. Whether that 'chokes' depends on the store: a single Redis instance does roughly 70k-180k SET/s in the official benchmark without pipelining, and over 1.5M/s with pipelining. A disk-based relational database committing 100k durable single-row updates per second is much harder. The concern is real for an RDBMS and less so for an in-memory key-value store. | A-OOI-09 |
| L-0111 | 4.2 | The setup cost is more than TCP. In PostgreSQL every new connection makes the postmaster spawn a new backend process, then authentication runs. AWS describes pooling as avoiding 'the memory and CPU overhead of opening a new database connection each time'. Calling it 'the TCP connection' undersells the database-side cost. | - |
| L-0119 | 4.3 | Pooling is done on the client side, by a library in the app (HikariCP for JDBC, redis-py's ConnectionPool, etc.) or by a proxy in front of the database (PgBouncer, Amazon RDS Proxy). The database server does not have to 'support' it; any database with persistent connections can be pooled. | - |
| L-0126 | 4.4 | An in-process library is the common case, but external poolers exist and run as separate services: PgBouncer ('lightweight connection pooler for PostgreSQL') and Amazon RDS Proxy. They are the usual fix for the problem in L-0319/L-0320: many app servers multiplexed onto a few database connections. | - |
| L-0127 | 4.4 | The pushback against 'everything is a service' is fair for the in-app library pool, but pooling is sometimes deliberately run as a separate service (PgBouncer, Amazon RDS Proxy), when many servers or serverless functions would otherwise exhaust the database's connections. | - |
| L-0133 | 4.9 | Real load balancers usually check backends by pulling, not by receiving pushed heartbeats: an AWS Application Load Balancer 'periodically sends requests to its registered targets' (default every 30 s; 2 failures mark a target unhealthy). The idea (stop routing to a target that fails checks) is the same; the direction is reversed, because the LB can open connections to its backends. | A-OOI-17 |
| L-0146 | 4.6 | Memory is the dominant factor for a database. RDS sets the default max_connections purely from instance memory (MySQL about MB/12; PostgreSQL LEAST(memory/9531392, 5000)). The network side is real but indirect: EC2 caps the number of tracked connections per instance, and bandwidth limits throughput rather than connection count. | - |
| L-0157 | 4.5 | 3-5 is one convention, but HikariCP, a widely used pool, recommends the opposite: leave minimumIdle unset so the pool is fixed-size (min = max). Creating connections on the fly is exactly the latency the pool is meant to avoid. | A-OOI-12 |
| L-0163 | 4.6 | Scaling up and down is not free on most managed databases: some RDS modifications such as an instance-class change require a reboot and cause downtime (shortened by a Multi-AZ failover), so plan it before the spike, not during it. | - |
| L-0174 | 5.2 | In application terms a hard delete is gone, but databases often keep it recoverable for a while: InnoDB only physically removes a row at purge time, and backups / point-in-time recovery can restore it. It is not a substitute for soft delete for user-facing recovery. | - |
| L-0192 | 5.6 | Usually true, but in InnoDB DYNAMIC format long VARCHAR values can also go off-page: 'When a row is too long, the longest columns are chosen for off-page storage.' | - |
| L-0193 | 5.6 | Engine-dependent. InnoDB DYNAMIC: TEXT/BLOB values of 40 bytes or less are stored inline, and longer values move off-page (20-byte pointer) only when the row does not fit the page. PostgreSQL makes no short/long type distinction: TOAST compresses or moves any value out of line once the row is over ~2 kB. | A-D-14, A-D-15 |
| L-0194 | 5.6 | Off-page values do cost extra page reads (possibly several overflow pages), but these are usually buffer-pool hits, not disk calls. They are only paid when the column is selected: PostgreSQL pulls TOASTed values out only 'if selected at all'. | - |
| L-0208 | 5.7 | In major engines the native type is compact, not heavy: MySQL DATETIME is 5 bytes (DATE 3), PostgreSQL timestamp 8 bytes, close to an integer. 'Suboptimal in some cases' is fair but should not suggest native types are generally slow. | - |
| L-0231 | 5.9 | The overflow concern is real (signed 32-bit max 2,147,483,647, which is 19 Jan 2038 as epoch seconds), but the next step is a 64-bit integer (bigint), not a double. Epoch milliseconds already need 64 bits today, and 64-bit epoch seconds do not overflow in any practical horizon. | - |
| L-0234 | 5.9 | Teacher hedged ('let's say'). MySQL (5.6.4+) DATETIME takes 5 bytes plus 0-3 bytes for fractional seconds (8 bytes at microsecond precision); TIMESTAMP 4 bytes; DATE 3 bytes. | A-D-18 |
| L-0246 | 6.1 | A cache is basically a key-value map, plus a memory limit, an eviction policy and expiry; stores like Redis also offer typed values with server-side operations. | - |
| L-0247 | 6.1 | As of October 2026, Redis Open Source documents geospatial indexes, HyperLogLog and Bloom filters (with cuckoo filter, count-min sketch, t-digest, top-k) as built-in data types. Bloom filters used to need the RedisBloom module. The keyspace is a key-to-value lookup, but the values are separate encoded structures (sorted sets, streams, probabilistic sketches), not 'just hash tables'. | A-CC-16 |
| L-0266 | 5.5 | On a valid erasure request the controller must erase the data without undue delay, and must act on the request within one month (extendable by two more months), unless an Art. 17(3) exception such as legal claims applies. | A-CC-02 |
| L-0270 | 5.5 | Historical snapshots are usually not rewritten, but the erased user's data in them must be kept beyond use and must age out on the backup retention schedule. | A-CC-03 |
| L-0275 | 6.4 | True for values in the common case: Redis and Memcached store the bytes the client sends, and compressing them is the client's job (client libraries such as pymemcache offer opt-in zlib compression above a size threshold). Redis does compress internally in two narrow places: LZF compression of strings in RDB snapshot files (on by default), and optional LZF compression of inner list nodes (list-compress-depth, off by default). | A-CC-07 |
| L-0276 | 6.4 | Cache compression is usually done by the client library (for example pymemcache's CompressedSerde), not by the cache server. | A-CC-06 |
| L-0278 | 6.4 | CDNs compress text responses; images and video are already compressed by their formats, so generic recompression rarely helps. | A-CC-08 |
| L-0279 | 6.4 | The bandwidth argument is sound: compressing in the client means fewer bytes on the network and in the cache, which is why client libraries such as pymemcache do it. 'Caches should never offer compression' is the teacher's opinion, reasoned out live, not an industry rule. Redis does compress internally where it is cheap and transparent (RDB files, optional list nodes). | - |
| L-0284 | 5.4 | A DELETE already takes row locks inside its transaction; you do not need to lock first to prevent stale reads. The interviewer's real concern is lock duration and contention from a large delete, which affects latency and availability. That is why chunked deletes are advised. | - |
| L-0287 | 6.3 | Worst-case framing, which the teacher makes explicit later (L-0299). Databases cache hot table and index pages in RAM (for example the InnoDB buffer pool), so many database reads never touch disk. | A-CC-10 |
| L-0289 | 6.3 | Right in spirit: InnoDB and PostgreSQL indexes are multi-level B-trees, and a lookup walks from root to leaf. Because each page holds hundreds of keys, the tree is shallow (a few levels even for very large tables, so log base ~hundreds of n, not log2 n). The upper levels are usually cached in the buffer pool, so a lookup often needs only one or two actual disk reads. | - |
| L-0291 | 6.3 | The trade-off factors listed are right. 'Overall not much difference' holds only in the case the teacher describes, where the table's hot data sits in the database's RAM. Otherwise, a disk-backed lookup is still much slower than an in-memory hash lookup (see L-0288). | - |
| L-0298 | 5.4 | Database-side TTL is convenient, but timing is not guaranteed and the work still loads the database: MongoDB's TTL monitor runs every 60 s and deletion may lag 'depending on the workload', and DynamoDB TTL takes up to a few days. 'Always works' is too strong for a heavily loaded primary. | - |
| L-0304 | 3.3 | Fair for self-hosted vs managed operations, but availability is also a product property: AWS contractually commits to 99.99% (99.999% for global tables) for DynamoDB, and Redis's asynchronous replication can lose acknowledged writes on failover whatever the team does. | - |
| L-0324 | 4.7 | Query time is key (pool size needed is roughly throughput x average query time), but also track pool wait time and saturation. HikariCP's sizing guide ties the optimum to database cores and disks: past it, adding connections lowers throughput. | - |
| L-0330 | 2.3 | HTTP is stateless at the message level; connection reuse is separate: HTTP/1.0 opted in with Keep-Alive, HTTP/1.1 connections are persistent by default, and HTTP/2 connections are always persistent. | A-CC-13 |
| L-0331 | 2.3 | HTTP/2 connections are persistent (RFC 9113 9.1). WebSocket is a separate TCP-based protocol, but it starts as an HTTP request: its handshake is an HTTP Upgrade (RFC 6455 1.7), so it is set up over HTTP and then leaves it. | A-CC-14 |
| L-0335 | 2.3 | HTTP/1.1 and HTTP/2 run over TCP; HTTP/3 runs over QUIC, which runs over UDP. | A-CC-15 |

## 4. Unverifiable: attributed, no source link

| id | § | how the page words it |
|---|---|---|
| L-0022 | 1.1 | the instructor's experience over 10-11 years ('in my experience') (none) |
| L-0081 | 3.4 | an illustration of the stakes, not a figure about any company (none) |
| L-0083 | 3.4 | hedged as in class ('likely a deal; details unknown') (low) |
| L-0137 | 4.6 | the lecture's experience ('in most cases the class has seen') (low) |
| L-0180 | 5.2 | the instructor's story, in a margin note (none) |
| L-0182 | 5.2 | the instructor's story, in a margin note (none) |
| L-0214 | 5.8 | the instructor's story, heard from a friend (none) |
| L-0215 | 5.8 | part of the same story (none) |
| L-0223 | 5.8 | the instructor's experience, details not shared (none) |
| L-0227 | 5.8 | part of the same story, as the class answered it (none) |
| L-0255 | 6.5 | the instructor's story about an earlier cohort (none) |
| L-0272 | 5.5 | the instructor's own experience (none) |

## 5. Not flagged by the fact-check

38 ledger items had no verdict (course logistics and structure): L-0001, L-0002, L-0003, L-0004, L-0005, L-0006, L-0007, L-0008, L-0009, L-0010, L-0011, L-0012, L-0013, L-0014, L-0015, L-0016, L-0017, L-0018, L-0019, L-0020, L-0050, L-0102, L-0106, L-0164, L-0166, L-0167, L-0169, L-0237, L-0253, L-0254, L-0257, L-0259, L-0285, L-0306, L-0328, L-0329, L-0334, L-0337. The ones placed are course-structure facts or forward references and need no check. The dropped ones are listed in `placement.json`.

## 6. Verified additions not used

- A-OOI-03: optional; Redis's passive/active expiry is taught in Lecture 3, and the ForwardChip (L-0306) points there.
- A-OOI-07: optional; duplicates A-D-20 (the 2038 limit), which is used in SN-14.
- A-D-04: optional; duplicates A-OOI-02 (TTL lag) and A-OOI-04 (service deletions in Streams), both used.
- A-D-08: optional; duplicates A-CC-16 (Redis built-in types), which is used in 6.1.
- A-D-22: optional; SQLite's date storage choice adds a fourth database the class never discussed.
- A-D-23: optional; a law-firm summary of India's IT Rules 2021 whose later amendments were not checked; L-0181 stands as taught without it.
- A-CC-17: optional; dated ElastiCache pricing dimensions; L-0293's point (managed Redis has its own pricing) needs no figures.

## 7. Other fidelity fixes (not from the fact-check)

- L-0039: the batch endpoint uses the board's `/status/users`; the audio's '/data/users' is an ASR slip (`board/flag_resolutions.md`).
- L-0105: the class said '8 GB for 1 million entries'; earlier and on the board it is 1 billion. The page gives both correct figures (8 MB for 1M active rows, 8 GB for 1B) as an inline clarification (the fact-check marks it imprecise/low).
- L-0189: the bio was described as ~128 and ~140 characters; the page says 'about 140'.
- L-0209 / Fig 5·g: the board's epoch value `172562347162` (12 digits) is illustrative; the redraw uses `1648890096`, the epoch seconds for 2 April 2022 09:01:36 UTC, and says so in the caption.
- L-0159: the arithmetic slip (10 → 15 called '1.2×') is kept as said and corrected inline (1.5×), per the brief's 'arithmetic checked'.
- L-0283: the instructor's numbers shifted while speaking (1,000 rows an hour, 10,000 across 10 hours, 10,000 an hour); the page gives '10,000 an hour or about 1,000 at a time', the two he settled on.
- L-0072, L-0087, L-0292, L-0325: no clear verdict in class (status open or uncertain audio); the page states them as points raised, not as endorsed.
