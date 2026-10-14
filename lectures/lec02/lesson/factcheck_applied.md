# Lecture 04 (lec02): fact-check treatments applied

Policy (from the brief, applied mechanically):
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly after it with the precise version and its sources.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a source link where a fact is added). This lecture has no simplified-medium item.
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction. (`final.jsonl` marks these `inline`; the course policy, as in Lecture 02, leaves them as taught.)
- **unverifiable:** stated as the instructor's (or one learner's) experience, estimate or opinion, with no empty source link.

Verifier overrides from `verdict_review.md` are already in `final.jsonl` and are applied: **L-0320** is imprecise/low (was medium), so it gets an inline clarification instead of a note; **L-0096** is imprecise/low (was medium), also inline. Version drift noted by the verifier: Kafka docs are cited at 4.3, OWASP's current list is 2025 (A01 unchanged), Chromium values were re-checked on main.

Counts: 91 flagged items = 14 with a SourceNote (12 notes) + 14 inline clarifications + 47 left as taught + 16 attributed as unverifiable. 332 items were checked accurate; 18 ledger items had no verdict (section 5).

## 1. SourceNotes

### SN-01 · §2.4 · L-0143 (wrong/medium)
- **Teacher's point (kept):** Storing massive blob values of, say, 4 MB each would make relational databases 'cry their heart out', while DynamoDB would work better; p...
- **More precisely:** A single DynamoDB item is capped at 400 KB, attribute names included, so a 4 MB value cannot be stored in DynamoDB at all; neither DynamoDB nor a relational database is a good blob store. Keep large values in object storage (AWS suggests S3) and store the key or pointer in the database.
- **Additions used:** A-DC-01
- **Sources:** https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html · https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-use-s3-too.html

### SN-02 · §3.4 · L-0081 (imprecise/medium)
- **Teacher's point (kept):** Asked whether column-oriented databases are charged per read/write operation like cloud NoSQL databases: no - they run continuously, you...
- **More precisely:** It depends on the product. Provisioned warehouses do charge for reserved servers, but BigQuery's on-demand model bills each query by the bytes it reads (capacity/slot pricing is the reserved alternative), and Redshift Serverless bills for compute actually used, per second, with optional reservations.
- **Additions used:** A-DC-15
- **Sources:** https://docs.cloud.google.com/bigquery/docs/estimate-costs · https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-billing.html

### SN-03 · §4.4 · L-0130 (imprecise/medium)
- **Teacher's point (kept):** A graph database cannot be used transactionally by user-facing applications: you ingest data into it asynchronously and then derive somet...
- **More precisely:** Feeding a graph database asynchronously for analytics is common, but not a rule: transactional graph databases such as Neo4j ('Transactions comply with the ACID consistency model') and Amazon Neptune serve online, user-facing queries over billions of relationships in milliseconds.
- **Sources:** https://neo4j.com/docs/operations-manual/current/introduction/ · https://docs.aws.amazon.com/neptune/latest/userguide/intro.html

### SN-04 · §4.4 · L-0132 (imprecise/medium)
- **Teacher's point (kept):** Why a graph database instead of relational: finding something three levels deep is a simple graph traversal query, while in a relational...
- **More precisely:** One join per level is true for a hand-written fixed-depth query. SQL can walk any depth in one query with a recursive CTE (PostgreSQL's WITH RECURSIVE is 'typically used to deal with hierarchical or tree-structured data'); graph databases make deep traversals simpler to write and often faster. The same applies to the MLM hierarchy (L-0393, L-0394).
- **Additions used:** A-DC-16
- **Sources:** https://www.postgresql.org/docs/current/queries-with.html

### SN-05 · §4.4 · L-0134 (imprecise/medium)
- **Teacher's point (kept):** A relational database stores data on one data node; sharding exists, but graph databases give it to you out of the box.
- **More precisely:** Most graph databases scale reads with replicas but keep a single writer per graph: Neptune has one primary instance that performs all writes plus up to 15 read replicas, and in Neo4j only primaries can be the writer. Partitioning one graph across shards is hard (Neo4j has recently added sharded property databases, not the standard setup).
- **Additions used:** A-DC-19
- **Sources:** https://docs.aws.amazon.com/neptune/latest/userguide/intro.html · https://neo4j.com/docs/operations-manual/current/clustering/introduction/

### SN-06 · §8.3 · L-0275 (wrong/medium)
- **Teacher's point (kept):** Every server has a limited number of ports on which it can accept connections, so WebSocket servers have a limited capacity for WebSocket...
- **More precisely:** Ports are not the limit: every client connects to the same listening port, and a TCP connection is identified by the pair of sockets (client address and port plus server address and port). What bounds a WebSocket server is its file descriptors, memory and CPU, so it can still hold only a finite number of connections.
- **Sources:** https://www.rfc-editor.org/rfc/rfc9293

### SN-07 · §9.1 · L-0322 (wrong/low), L-0324 (wrong/medium), L-0325 (wrong/medium)
- **Teacher's point (kept):** The concurrent TCP connection limit per domain is six or eight: six for Chrome, eight for Firefox.
- **Teacher's point (kept):** A WebSocket is a persistent TCP connection, so it permanently takes one of the browser's six connections, leaving only five for all REST...
- **Teacher's point (kept):** A web page with 100 same-size images: with no WebSocket open the browser loads six images at a time; with one WebSocket open, five at a t...
- **More precisely:** Chrome and Firefox both allow 6 concurrent HTTP/1.1 connections per host (Firefox's max-persistent-connections-per-server is 6, not 8). WebSockets are counted in a separate pool, 255 per host in Chrome and 200 in Firefox, so an open WebSocket does not take one of the six or slow image loading; over HTTP/2 all requests share one multiplexed connection anyway. One WebSocket per product is still the right advice, for other reasons: every extra socket is another long-lived connection the server must hold and another reconnect the client must handle (this also covers the stated harm in L-0329).
- **Additions used:** A-SRW-08
- **Sources:** https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js · https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc · https://www.rfc-editor.org/rfc/rfc9113 · https://chromium.googlesource.com/chromium/src/+/refs/heads/main/net/socket/client_socket_pool_manager.cc

### SN-08 · §9.4 · L-0374 (imprecise/medium)
- **Teacher's point (kept):** If edge servers trust the client's membership claims, a user can falsely claim 'I am part of this channel, give me all the messages' and...
- **More precisely:** A user claiming a channel they are not in is an authorisation flaw, broken access control (OWASP A01 in 2021 and in the current 2025 list), not a man-in-the-middle attack, which intercepts traffic between two parties. The baseline is 'except for public resources, deny by default': check membership server-side.
- **Additions used:** A-SRW-17
- **Sources:** https://top10.owasp.org/2021/A01_2021-Broken_Access_Control · https://community.owasp.org/attacks/Manipulator-in-the-middle_attack · https://top10.owasp.org/2025/

### SN-09 · §9.4 · L-0360 (imprecise/medium)
- **Teacher's point (kept):** Since nothing critical sits on the exposed server, the worst an attacker can do is DDoS it, which a simple rate limiter can prevent.
- **More precisely:** With nothing sensitive on the edge server, DDoS is indeed the main risk, but a rate limiter only handles some request floods. The most common attacks (UDP reflection, SYN floods) are infrastructure-layer floods that need network capacity which scales faster than the attack, i.e. upstream DDoS protection.
- **Additions used:** A-SRW-18
- **Sources:** https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/infrastructure-layer-attacks.html

### SN-10 · §9.4 · L-0383 (imprecise/medium)
- **Teacher's point (kept):** Keeping edge servers public is fine because there is nothing sensitive on them: a route from the Balancer service that hands out IP addre...
- **More precisely:** A Kafka credential is still a secret: a compromised edge server can reach the internal Kafka and inject messages that consumers trust and persist. Give the edge a least-privilege credential (Kafka authenticates clients with SSL or SASL and authorises read/write per client), e.g. write-only to one topic, and have consumers validate what they read. Losing it is far less damaging than losing database credentials.
- **Additions used:** A-SRW-16
- **Sources:** https://kafka.apache.org/42/security/security-overview/ · https://kafka.apache.org/43/security/security-overview/

### SN-11 · §9.5 · L-0422 (imprecise/medium)
- **Teacher's point (kept):** After workers have processed messages from Kafka, you cannot recover a lost write by reading from Kafka again.
- **More precisely:** Kafka does not delete events when they are consumed; a topic keeps them for its retention period and they can be read as often as needed, so a consumer can rewind and reprocess. The teacher's real point stands: durability of the write should come from the database's own replication, not from re-reading Kafka.
- **Additions used:** A-DC-20
- **Sources:** https://kafka.apache.org/intro

### SN-12 · §9.5 · L-0424 (imprecise/medium)
- **Teacher's point (kept):** A replicated database never acknowledges (commits) a write until it has been written in three different places; a write lost before repli...
- **More precisely:** A synchronously replicated database acknowledges a write once the configured replicas, often a majority quorum, have persisted it; DynamoDB keeps three replicas in different Availability Zones and acknowledges when two of the three have the log record. Asynchronous replication (PostgreSQL's default) acknowledges earlier and can lose recent writes on failover. The core lesson stands: the storage engine replicates, not the workers.
- **Additions used:** A-DC-04
- **Sources:** https://www.usenix.org/system/files/atc22-elhemali.pdf · https://www.postgresql.org/docs/current/warm-standby.html

## 2. Light inline clarifications

| id | verdict | § | treatment on the page | sources |
|---|---|---|---|---|
| L-0036 | imprecise/low | 2.2 | DynamoDB supports both key-value and document models; you can filter on nested attributes, but efficient queries need the key or a secondary index. (+ A-DC-08) | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html · https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.FilterExpression.html |
| L-0073 | imprecise/low | 3.3 | Column-oriented warehouses are usually not the primary copy of transactional data; they are fed from operational databases for analytics. | https://clickhouse.com/docs/best-practices/selecting-an-insert-strategy |
| L-0082 | imprecise/low | 3.4 | Reserved capacity is one pricing option, not the only one; see L-0081 (BigQuery on-demand bills per bytes read). | https://docs.cloud.google.com/bigquery/docs/estimate-costs |
| L-0096 | imprecise/low; first pass imprecise/medium | 4.2 | Some teams drive recommendations through graph databases, but many large systems compute them offline (e.g. Amazon's item-to-item collaborative filtering) without one. | https://www.amazon.science/the-history-of-amazons-recommendation-algorithm · https://neo4j.com/use-cases/real-time-recommendation-engine/ |
| L-0122 | imprecise/low | 5.3 | High-ingestion workloads relax constraints and cross-node consistency; durability is still expected, especially for user messages. (+ A-DC-23) | https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html |
| L-0200 | imprecise/low | 7.2 | Receiving needs a server-push channel - WebSocket here, though Server-Sent Events or long polling also work; plain short polling is a poor fit for real-time messaging. (+ A-MLA-06) | https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events · https://www.rfc-editor.org/rfc/rfc6202.html · https://slack.engineering/real-time-messaging/ |
| L-0221 | imprecise/low | 7.3 | By default, Zoom in-meeting chat shows only messages sent while you are present; Zoom's optional continuous meeting chat persists them. (+ A-MLA-12) | https://www.zoom.com/en/blog/continuous-meeting-chat |
| L-0228 | imprecise/low | 7.5 | Slack's client sends messages with ordinary HTTPS API calls, with no fancy transport. | https://slack.engineering/real-time-messaging/ · https://docs.slack.dev/reference/methods/chat.postMessage · https://grpc.io/docs/platforms/web/basics/ |
| L-0320 | imprecise/low; first pass imprecise/medium | 9.1 | Over HTTP/1.1 browsers open at most about six concurrent connections per host; over HTTP/2 all requests share one multiplexed connection. (+ A-SRW-09) | https://chromium.googlesource.com/chromium/src/+/refs/heads/main/net/socket/client_socket_pool_manager.cc · https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js · https://www.rfc-editor.org/rfc/rfc9113 |
| L-0321 | imprecise/low | 9.1 | Browsers cap connections per server to be conservative with server resources and to avoid network congestion; it is not a DDoS defence. | https://www.rfc-editor.org/rfc/rfc9112#section-9.4 |
| L-0326 | imprecise/low | 9.1 | True for HTTP/1.1. Over HTTP/2 the browser sends all the requests concurrently as streams on one connection, limited only by the server's advertised concurrent-stream limit. | https://www.rfc-editor.org/rfc/rfc9113 · https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc |
| L-0354 | imprecise/low | 9.4 | Opinion, generalised. Exposing edge servers directly is a legitimate option, but 'big companies publicly expose their edge servers' does not describe the case study: Slack puts Envoy proxies in front of its WebSocket servers. An interviewer's concern about... | https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/ |
| L-0396 | imprecise/low | 10.1 | WhatsApp does not keep messages on its servers after delivery; undelivered messages are held encrypted for up to 30 days. (+ A-MLA-05) | https://www.whatsapp.com/legal/privacy-policy |
| L-0416 | imprecise/low | 10.2 | Vector clocks (with CRDT-style merging) can capture which messages causally precede others, but concurrent messages still need a tie-break; it is a heavy solution for chat. (+ A-MLA-13) | https://en.wikipedia.org/wiki/Vector_clock |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (not shown as a correction) | 'keep' addition woven in |
|---|---|---|---|
| L-0007 | 6.1 | Von Neumann's 1945 EDVAC design borrowed the idea of neuron-like logic elements from McCulloch and Pitts, an analogy to the brain, not a copy of it. | - |
| L-0013 | 1.2 | The teacher hedges ('not always true'). Many non-relational stores make consistency tunable rather than giving it up: DynamoDB offers strongly consistent reads (ConsistentRead=true) on tables and LSIs, and ACID transactions. | - |
| L-0016 | 1.2 | CAP consistency means linearizability: after a write completes, every subsequent read from any node returns that value or a newer one. | A-DC-02 |
| L-0017 | 1.2 | Board says 'in most cases'. Fine as a broad rule, but consistency is usually a per-request choice (e.g. DynamoDB eventually consistent by default, strongly consistent on request), not a fixed property of the database. | - |
| L-0018 | 1.2 | A single-primary relational database limits write scaling; with standby replicas and failover it can still be highly available. | A-DC-05 |
| L-0019 | 1.2 | Spreading data over nodes only keeps it available if each partition is also replicated; a sharded store without replicas loses the shard's data when that node fails (DynamoDB replicates each partition across three AZs). | - |
| L-0020 | 1.2 | Teacher hedges with 'exceptions'. Defaults differ: DynamoDB reads are eventually consistent by default but strongly consistent on request; 'most are eventual' is better read as 'most offer eventual consistency, often as the default'. | A-DC-03 |
| L-0027 | 2.1 | MongoDB is a document database; Elasticsearch stores JSON documents but is primarily a search and analytics engine (inverted indexes, aggregations), usually not used as the primary store. 'Closest to the relational world' is the teacher's opinion. | - |
| L-0035 | 2.3 | True for an opaque-blob store, but common key-value stores allow field-level updates: Redis HSET sets individual fields of a hash without rewriting the rest (DynamoDB also supports a document model with attribute updates). | A-DC-09 |
| L-0050 | 3.1 | Column orientation is a storage layout, not a separate 'non-relational' family: Redshift and BigQuery are SQL databases that store tables column by column. Do not confuse with 'wide-column' stores like Cassandra/HBase, which are not columnar in this sense. | A-DC-12 |
| L-0060 | 3.2 | Wide tables exist (BigQuery allows up to 10,000 columns per table), but thousands of columns is not typical. Columnar still wins with far fewer columns when queries touch few of them (Redshift's example uses 100). | - |
| L-0078 | 3.4 | General-purpose codecs used on column data are Snappy, GZIP, LZ4, ZSTD, Brotli (Parquet's list); Huffman coding appears inside GZIP/ZSTD rather than standalone. Bigger gains often come first from column encodings (dictionary, RLE/bit-packing). | - |
| L-0084 | 4.1 | Good intuition, but graph databases differ in storage: Neo4j stores relationships natively with the nodes, while JanusGraph stores its graph on Cassandra/HBase/Bigtable. 'Nothing special' undersells the traversal-oriented storage and query languages. | - |
| L-0087 | 4.1 | Strong opinion. Twitter's FlockDB precedent supports it for simple one-hop follow lists, but 'catastrophic' is rhetorical: a graph DB would work, just at higher cost/complexity than needed. | A-DC-17 |
| L-0088 | 4.1 | Partly true: Neo4j advises caching as much of the graph as possible in its page cache, and in Neo4j/Neptune a single writer handles writes. But distributed graph databases exist (Dgraph, TigerGraph), and 'legacy stack' is opinion. | - |
| L-0091 | 4.2 | Graph databases are marketed for recommendations (Neo4j, Neptune), but 'most common use' is opinion; large-scale recommenders like Amazon's item-to-item collaborative filtering precompute related-item lists offline without a graph database. | - |
| L-0094 | 4.2 | Illustrative example. Amazon actually moved to item-to-item collaborative filtering: related-item lists computed from co-purchase statistics and updated daily, rather than per-user cohorts. | A-DC-18 |
| L-0099 | 4.3 | Plausible illustration; real card-fraud systems combine many signals and models, and graph analysis (finding rings and shared assets) is one part. | - |
| L-0108 | 4.4 | TigerGraph is commercial and markets fraud detection to financial services (logos include JP Morgan Chase, American Express), but it also has a free Community Edition, and the claim that financial firms avoid open-source software for this is a generalisation. | - |
| L-0111 | 5.1 | That is the default (NO ACTION) / RESTRICT behaviour; with ON DELETE CASCADE the child rows are deleted automatically, and SET NULL/SET DEFAULT are also options. | - |
| L-0127 | 4.4 | Teacher calls it blunt. Real engines differ: Neo4j stores relationships natively alongside nodes for fast traversal; others (JanusGraph) map the graph onto a key-value/column store. | - |
| L-0137 | 2.2 | Direction is right (cross-shard transactions cost more), but 'anyone can guarantee' single-shard ACID is too broad: MongoDB warns even multi-document transactions cost more than single-document writes, and not every store supports multi-row transactions within a partition. | - |
| L-0161 | 6.3 | Two nullable either/or columns allow orphan rows unless a CHECK constraint enforces exactly one non-null value; modelling DMs as channels avoids the problem entirely. | A-SRW-03 |
| L-0169 | 6.4 | In Slack's API a DM is a conversation (is_im) with its own channel ID; conversations.open returns it, and chat.postMessage can also take a user ID and open the DM implicitly. | A-SRW-01 |
| L-0190 | 7.1 | The entities stay the same, but the physical model does not: Cassandra modelling is query-driven, has no joins and denormalises into one table per query, so a messages table is designed around its partition key (Discord partitions messages by channel plus a time bucket). A relational schema with... | A-SRW-07 |
| L-0209 | 7.3 | Slack Engineering (Apr 2023) confirms the send path is an HTTP call to the Webapp API and the receive path is WebSocket: Webapp -> Admin Servers -> Channel Servers -> Gateway Servers -> clients. The article does not state that the DB write completes before fan-out, so 'persist, then broadcast' re... | A-MLA-03 |
| L-0220 | 7.3 | Plain in-meeting Zoom chat behaves this way: participants see messages sent while they are present. But Zoom offers continuous meeting chat (blog first published June 2023, updated June 2026): 'messages can live on after a meeting in our persistent chat solution'. 'Zero persistence' describes pla... | - |
| L-0229 | 7.5 | Right for raw UDP datagrams (no delivery guarantee). But UDP is also the base for reliable transports: QUIC (RFC 9000, used by HTTP/3) carries its packets in UDP datagrams and adds the feedback needed for reliable delivery and congestion control. So 'UDP' alone doesn't mean 'drops data'; it means... | A-MLA-08 |
| L-0295 | 8.5 | In Redis Cluster, classic PUBLISH is propagated to every node over the cluster bus, so adding nodes does not scale Pub/Sub throughput. Sharding needs sharded Pub/Sub (SSUBSCRIBE/SPUBLISH, Redis 7.0+), which keeps each shard channel's messages within one shard. | A-SRW-11 |
| L-0307 | 8.6 | The teacher's personal build cannot be verified. The pattern is common: Socket.IO's Redis adapter broadcasts packets between servers through Redis Pub/Sub. But 'exactly how people build this' overstates it, because Slack itself uses a different design: Envoy-fronted Gateway Servers that subscribe... | A-SRW-13 |
| L-0327 | 9.1 | Good products multiplex all real-time features over one WebSocket, mainly to save server connections and reconnection complexity. | - |
| L-0329 | 9.1 | The advice is sound, but the stated harm (fewer parallel API calls) is not how browsers work: WebSockets live in a separate pool from HTTP connections. The cost of one socket per feature is on the server side (each user holds several long-lived connections) and in client reconnect handling. | - |
| L-0332 | 9.3 | Messages, once accepted, will always be persisted; the persisting consumer must make inserts idempotent because Kafka may redeliver after a crash. | A-MLA-09 |
| L-0353 | 9.4 | Both options exist. For this lecture's case study, though, Slack terminates WebSocket connections on proxies (formerly HAProxy, now Envoy) in edge regions near users and forwards them to backend servers, rather than exposing those servers directly. | A-SRW-15 |
| L-0356 | 9.4 | An L7 proxy (e.g. Envoy, ALB) terminates the client connection and opens a second one to the backend. An L4 load balancer such as AWS NLB instead forwards the flow: 'Each individual TCP connection is routed to a single target for the life of the connection.' Either way, a WebSocket stays pinned t... | A-SRW-19 |
| L-0358 | 9.4 | 'Zero credentials' sits alongside L-0359: the edge server does hold a Kafka connection, and in a secured Kafka cluster clients authenticate (SSL/SASL) and are authorised per operation. So the principle is really least privilege (a write-only credential), not zero credentials. | - |
| L-0359 | 9.4 | Right that only a low-value credential should sit on the edge. In a secured cluster Kafka clients authenticate with SSL or SASL and read/write operations are authorised by ACLs, so give the edge a credential that can only write to one topic, and have consumers validate what they read. | A-SRW-16 |
| L-0362 | 8.5 | Others can add a user to a channel while that user is offline (Slack's conversations.invite adds 1-1000 users to a public or private channel). So membership cannot rely only on the user acting while online. The lecture's broadcast-plus-periodic-meta-call scheme (L-0365, L-0367) covers this on rec... | - |
| L-0380 | 8.5 | A Redis cluster is right, but with classic Pub/Sub every message reaches every node; use sharded Pub/Sub (Redis 7.0+) so Slack-channel traffic is split across shards. | - |
| L-0387 | 8.4 | Right contrast, but Kafka's history is bounded: messages are not deleted on consumption, yet they are kept only for a configurable time- or size-based retention window (the docs' example is about a week), not forever by default. Redis Pub/Sub keeps nothing (at-most-once). | - |
| L-0393 | 4.4 | Graph DB is a fair option, but for a tree such as an MLM hierarchy a recursive CTE (WITH RECURSIVE) handles any depth in one SQL query; consider it before adding a new database. | - |
| L-0394 | 4.4 | Correct for a hand-written fixed-depth query; a recursive CTE avoids writing nine self-joins. | - |
| L-0412 | 10.2 | Fine when each channel's messages are written on one database node (as with sharding by channel id). With several writers or nodes, clocks differ and timestamps can tie, so systems usually assign a per-conversation unique ordering id; Slack's message 'ts' is 'essentially the ID of the message, gu... | A-MLA-11 |
| L-0419 | 10.2 | Right that it is costly; the concrete reason is that a vector clock holds one counter per participating process, so per-client vector clocks grow with the number of clients in a conversation and must be carried and compared on every message. | - |
| L-0420 | 9.5 | Sharding alone gives no redundancy: a shard without replicas loses its data if the node dies. The teacher corrects this immediately after (L-0421: replication factor three). | - |
| L-0427 | 9.5 | Opinion. Database-per-service is a widely recommended pattern (loose coupling, each service picks its store); a shared database is a valid trade-off but brings schema-change and runtime coupling. | A-DC-22 |
| L-0434 | 9.1 | Chromium groups connections per host (scheme, host, port), so different sub-domains do get separate HTTP/1.1 limits. The limits belong to the browser's socket pools, not to a tab (Chromium also caps a pool at 256 sockets in total), so tabs open to the same host share them. This was the student's... | - |

## 4. Unverifiable: attributed, no source link

| id | § | how it is presented |
|---|---|---|
| L-0076 | 3.4 | the instructor's figure or estimate, attributed ('in the instructor's experience') (number); fact-check: Teacher's own experience. Compression ratios depend heavily on data (cardinality, sort order, codec); treat 29x as an anecdote, not a norm. |
| L-0098 | 4.3 | the instructor's own story, told as his (no names) (war_story); fact-check: Personal anecdote. |
| L-0100 | 4.3 | as the instructor describes it, attributed (process); fact-check: Internal practice at financial companies as recounted by the teacher; no public source confirms the 50-60 parameters or per-person graphs. |
| L-0101 | 4.3 | the instructor's figure or estimate, attributed ('in the instructor's experience') (number); fact-check: Company-internal SLA relayed second-hand; no public source. |
| L-0102 | 4.3 | the instructor's own story, told as his (no names) (war_story); fact-check: Anecdote about the source of the figure. |
| L-0103 | 4.3 | as the instructor describes it, attributed (process); fact-check: Private process; note the 200 ms covers the automated decision, while the customer call happens afterwards. 'Whole system powered by graph analysis' is not p... |
| L-0114 | 5.2 | the lecture's view or recollection, worded as such (claim); fact-check: Historical motivation as the teacher tells it. The relational model was motivated mainly by data independence, and transaction processing (banking, reservati... |
| L-0138 | 2.2 | the lecture's view or recollection, worded as such (claim); fact-check: Teacher recalls similar advice in WiredTiger docs; I could not locate a specific WiredTiger statement. MongoDB's own transactions page carries the advice (se... |
| L-0328 | 9.1 | the lecture's illustration or one learner's observation, attributed (example); fact-check: Instagram's internal transport for live chat and reactions is not publicly documented. The general point (one connection carrying many real-time features) is... |
| L-0346 | 9.3 | the lecture's illustration or one learner's observation, attributed (example); fact-check: Plausible interpretation, but WhatsApp does not publicly document what the 'Checking for new messages' notice does internally; no public source confirms it m... |
| L-0355 | 9.4 | the instructor's estimate, attributed; the trade-off itself stands (tradeoff); fact-check: The 3-5 ms per load-balancer hop is the teacher's experience. No public figure confirms it, and an in-region L4 hop is usually much cheaper. The trade-off it... |
| L-0370 | 8.4 | the instructor's own story, told as his (no names) (war_story); fact-check: Teacher's personal experience; not publicly verifiable. |
| L-0382 | 9.4 | the instructor's estimate, attributed; the trade-off itself stands (tradeoff); fact-check: The ~5 ms per extra hop is the teacher's estimate and no public source confirms it; real cost depends on the load balancer type and placement. |
| L-0400 | 10.1 | the instructor's own story, told as his (no names) (war_story); fact-check: Teacher's personal project experience; not publicly verifiable. |
| L-0402 | 10.1 | the instructor's figure or estimate, attributed ('in the instructor's experience') (number); fact-check: A rough code-size estimate for a hypothetical architecture; no public source can confirm WhatsApp's or anyone's actual effort. |
| L-0408 | 10.2 | the lecture's illustration or one learner's observation, attributed (example); fact-check: Student's personal observation of Microsoft Teams; not publicly verifiable, and used only as a prompt for the duplicate/ordering discussion. |

## 5. Not flagged by the fact-check

18 ledger items had no verdict (course logistics and pointers): L-0001, L-0003, L-0004, L-0011, L-0069, L-0092, L-0135, L-0144, L-0145, L-0150, L-0239, L-0347, L-0349, L-0350, L-0391, L-0429, L-0435, L-0441. The placed ones are course-structure facts, reading pointers or exhortations and need no check. The dropped ones (L-0347, L-0435) are listed in `placement.json` with reasons.

## 6. Verified additions not used

- A-MLA-01: optional; duplicates A-SRW-10 (Redis Pub/Sub at-most-once), which is used in 8.4.
- A-MLA-02: optional; duplicates A-SRW-11 (sharded Pub/Sub), which is used in 8.5.
- A-MLA-04: optional; duplicates A-SRW-05 (Slack sharding messages by channel id), which is used in 7.1.
- A-MLA-10: optional; overlaps A-DC-20 (Kafka keeps consumed events), which is used in SN-11.
- A-MLA-15: optional; Parquet is already described by the class (L-0064) and A-DC-13 covers its encodings.
- A-MLA-16: optional; the von Neumann analogy (L-0007) is an aside left as taught; the EDVAC history adds nothing a reader needs.

## 7. Verified additions used outside a SourceNote

| addition | usefulness | § | how |
|---|---|---|---|
| A-DC-02 | keep | 1.2 | One sourced sentence after L-0016: CAP consistency = linearizability; ACID can hold without it. |
| A-DC-03 | keep | 1.2 | After L-0020: DynamoDB eventually consistent by default, ConsistentRead=true on request. |
| A-DC-05 | keep | 1.2 | After L-0018: standby replicas keep a single primary available; PostgreSQL streaming replication is async by default. |
| A-DC-06 | keep | 1.3 | After L-0022: Vitess shards MySQL and served YouTube. |
| A-DC-07 | keep | 2.3 | After L-0042: Redis Cluster hash slots; multi-key only within one slot. |
| A-DC-08 | keep | 2.2 | With L-0036's inline note: filter after the read; index needed. |
| A-DC-09 | optional | 2.3 | Optional, used: one sentence after L-0035 that Redis hashes allow field-level HSET. |
| A-DC-10 | keep | 2.2 | After L-0136: MongoDB's own wording on distributed transaction cost. |
| A-DC-11 | keep | 3.2 | Redshift's 100-column arithmetic beside the IO count. |
| A-DC-12 | keep | 3.1 | Columnar is a layout; BigQuery/Redshift are SQL; not 'wide-column'. |
| A-DC-13 | optional | 3.4 | Optional, used: Fig 3·d's dictionary + RLE panel caption. |
| A-DC-14 | keep | 3.3 | After L-0072: ClickHouse batches inserts. |
| A-DC-17 | keep | 4.1 | After L-0087: Twitter's FlockDB kept follow lists without multi-hop queries. |
| A-DC-18 | keep | 4.2 | After L-0094 / with L-0096's inline note: Amazon's item-to-item CF. |
| A-DC-21 | optional | 2.4 | Optional, used: one sourced sentence in the MarginNote 'The NAND gate of databases' after L-0129: CockroachDB's SQL layer turns statements into key-value operations. |
| A-DC-22 | keep | 9.5 | After L-0427: microservices.io's pros/cons of database-per-service vs shared. |
| A-DC-23 | keep | 5.3 | With L-0122's inline note: Cassandra's commit log keeps writes durable. |
| A-DC-24 | keep | 2.4 | After L-0140: Redis persistence (RDB, AOF). |
| A-SRW-01 | keep | 6.4 | After L-0169: Slack conversations (is_im), conversations.open. |
| A-SRW-02 | keep | 6.5 | After L-0175: last_read and conversations.mark. |
| A-SRW-03 | optional | 6.3 | Optional, used: after L-0161, a CHECK with num_nonnulls can forbid orphan rows (DM-as-channel avoids it anyway). |
| A-SRW-04 | keep | 7.1 | After L-0183: Slack on MySQL, Vitess. |
| A-SRW-05 | keep | 7.1 | With L-0314: Slack sharding message data by channel id. |
| A-SRW-06 | keep | 7.1 | With L-0189: Discord on Cassandra, then ScyllaDB. |
| A-SRW-07 | keep | 7.1 | After L-0190: Cassandra modelling is query-driven. |
| A-SRW-09 | keep | 9.1 | With L-0320's inline note: HTTP/2 multiplexes. |
| A-SRW-10 | keep | 8.4 | After L-0284: at-most-once; Redis Streams for at-least-once. |
| A-SRW-11 | keep | 8.5 | After L-0295: sharded Pub/Sub, Redis 7.0+. |
| A-SRW-12 | keep | 8.4 | MarginNote 'A ready-made version': Socket.IO's Redis adapter; Redis must stay inside the trusted network. |
| A-SRW-13 | keep | 8.6 | MarginNote 'How Slack actually does it': channel servers on a consistent-hash ring, gateway servers. |
| A-SRW-14 | keep | 8.6 | Same MarginNote: Slack's boot flow (token, nearest edge region, Envoy, gateway). |
| A-SRW-15 | keep | 9.4 | After L-0353: Slack terminates WebSockets on Envoy proxies. |
| A-SRW-19 | keep | 9.4 | After L-0356: L4 NLB pins a connection without terminating it. |
| A-SRW-20 | keep | 10.3 | One sourced line beside the WebTransport chip (Baseline 2026). |
| A-MLA-03 | keep | 7.3 | After L-0209: Slack's real send path (Webapp API, channel servers, gateway servers). |
| A-MLA-05 | keep | 10.1 | L-0396 inline: delivered messages deleted from servers; 30 days if undelivered. |
| A-MLA-06 | keep | 7.2 | L-0200 inline: SSE and long polling also push; back-link Lecture 02 §5. |
| A-MLA-07 | keep | 7.2 | After L-0199: HTTP/1.1 connections are persistent by default. |
| A-MLA-08 | keep | 7.5 | After L-0229: QUIC builds reliability over UDP. |
| A-MLA-09 | keep | 9.3 | After L-0332: idempotent inserts keyed by message id. |
| A-MLA-11 | keep | 10.2 | After L-0412: Slack's ts is unique per channel. |
| A-MLA-12 | keep | 7.3 | L-0221 inline: continuous meeting chat. |
| A-MLA-13 | keep | 10.2 | L-0416 inline: vector clocks give a partial order. |
| A-MLA-14 | keep | 10.3 | One sourced line beside the E2E chip: WhatsApp completed the Signal Protocol rollout in 2016. |
