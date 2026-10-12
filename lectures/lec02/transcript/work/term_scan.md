# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| WebSocket | web socket | 172 |  | 140 | 01:22:24, 01:22:31, 01:24:03, 01:24:06 | …So that like we have a web socket connection and, why do you need a socke… |
| port | part | 172 | AMBIGUOUS | 0 | 00:00:38, 00:01:22, 00:20:11, 00:44:08 | …y specific problems uh that's the first part we'll cover a bunch of… |
| load balancer | load-balancer | 34 |  | 34 | 02:31:14, 02:31:16, 02:31:19, 02:31:25 | …We will load balancer.… |
| trie | try | 28 | AMBIGUOUS | 0 | 00:01:17, 00:40:57, 00:40:57, 00:43:02 | …Now, when we do this, when we try to design the system,… |
| Pub/Sub | pubsub | 14 |  | 0 | 02:08:30, 02:08:36, 02:10:56, 02:11:01 | … and one connection with this real-time pubsub.… |
| key-value store | key-value | 10 |  | 7 | 00:07:30, 00:09:54, 00:10:49, 00:11:17 | …Yesterday, we built distributed key value store.… |
| Pub/Sub | pub sub | 9 |  | 0 | 02:07:59, 02:08:09, 02:08:13, 02:09:11 | …TCP connections here, but instead put a pub sub.… |
| Pub/Sub | pub-sub | 9 |  | 0 | 02:07:59, 02:08:09, 02:08:13, 02:09:11 | …TCP connections here, but instead put a pub sub.… |
| ACID | asset | 8 | AMBIGUOUS | 24 | 00:12:24, 00:12:29, 00:12:31, 00:12:32 | …ould have thought MongoDB could support asset properties?… |
| NoSQL | no SQL | 8 |  | 18 | 00:02:54, 00:03:27, 00:04:41, 00:45:44 | …or either no-SQL databases… |
| NoSQL | no-SQL | 8 |  | 18 | 00:02:54, 00:03:27, 00:04:41, 00:45:44 | …or either no-SQL databases… |
| SLO | slow | 8 |  | 0 | 01:34:00, 01:55:38, 02:08:12, 02:24:37 | …It's so slow.… |
| in-memory | in memory | 8 |  | 8 | 00:47:29, 00:52:03, 01:52:43, 02:38:08 | …It's obviously not stored in memory.… |
| key-value store | key value store | 7 |  | 7 | 00:07:30, 00:09:54, 00:10:49, 00:11:21 | …Yesterday, we built distributed key value store.… |
| shard | shared | 6 | AMBIGUOUS | 8 | 03:04:58, 03:10:00, 03:14:56, 03:04:58 | …And one more thing, uh, we had shared the database between the workers and th… |
| sharding | sharing | 5 | AMBIGUOUS | 7 | 03:05:04, 03:05:21, 03:05:25, 03:06:02 | …So sharing a database has its own sort of, I mean,… |
| EC2 | easy to | 4 | AMBIGUOUS | 0 | 01:42:23, 01:47:07, 01:42:23, 01:47:07 | … want to keep things simple and so it's easy to build complex systems.… |
| polling | pulling | 4 | AMBIGUOUS | 2 | 02:13:54, 02:38:28, 02:13:54, 02:38:28 | …terally pushed web socket server is not pulling the message web socket server is… |
| Pub/Sub | pubs up | 3 |  | 0 | 02:38:53, 02:45:45, 02:45:52 | …And any specific reason to choose Redis pubs up here, which one would you pick?… |
| shard | shared | 3 |  | 8 | 03:04:58, 03:10:00, 03:14:56 | …And one more thing, uh, we had shared the database between the workers and th… |
| DNS | DMS | 2 |  | 5 | 01:13:20, 02:19:38 | …So the way we model this is your DMs are channeled with two people… |
| QUIC | quick | 2 | AMBIGUOUS | 0 | 01:01:55, 01:01:55 | …We'll quick off our brainstorming and we'll cover a… |
| SQL | sequel | 2 | AMBIGUOUS | 36 | 00:50:04, 00:50:04 | …ah one more question relating to the uh sequel versus non-sql databases like these day… |
| cache | catch | 2 | AMBIGUOUS | 4 | 02:41:54, 02:41:54 | …was thinking like it can uh like it can catch the… |
| trade-off | trade off | 2 |  | 2 | 00:15:08, 00:15:34 | …How every single thing is a trade-off.… |
| CloudFront | cloud front | 1 |  | 0 | 01:44:25 | …edge server, it's not cloud front edge servers. It's the normal servers o… |
| DynamoDB | dynamo DB | 1 |  | 8 | 03:04:41 | …B exactly does that when you write to a dynamo DB internally, it gets… |
| HDFS | HDFC | 1 |  | 0 | 00:35:46 | …I immediately got a call from HDFC Bank.… |
| InfluxDB | influx | 1 |  | 0 | 00:45:00 | …For example, messages, huge amount of influx of messages… |
| QUIC | QUICK | 1 |  | 0 | 01:01:55 | …We'll quick off our brainstorming and we'll cover a… |
| Redis | red is | 1 | AMBIGUOUS | 102 | 02:45:45 | …hat it seems like, can we conclude that red is pubs up and Kafka kind of same.… |
| SQL | sequel | 1 |  | 36 | 00:50:04 | …ah one more question relating to the uh sequel versus non-sql databases like these day… |
| horizontal scaling | horizontally scaling | 1 |  | 0 | 02:05:06 | …scovery here be the overhead when we're horizontally scaling website?… |
| master-slave | master slave | 1 |  | 1 | 03:02:02 | …nt now, just give a thought that it's a master slave, uh, architecture… |
| microservices | micro services | 1 |  | 1 | 03:06:08 | …but in case you want to dive deeper the micro services… |
| microservices | micro-services | 1 |  | 1 | 03:06:08 | …but in case you want to dive deeper the micro services… |
| replica | replicate | 1 | AMBIGUOUS | 1 | 03:03:50 | …to different, different replicate replications, right?… |
| sharding | sharting | 1 |  | 7 | 01:20:49 | …So long as I'm partitioning and sharting, right?… |
| trie | tree | 1 | AMBIGUOUS | 0 | 02:49:46 | …ere you might need to store that entire tree and… |
| write-through | right through | 1 |  | 0 | 01:34:57 | …can do batch right through a synchronous medium over here and stil… |
| write-through | right through | 1 | AMBIGUOUS | 0 | 01:34:57 | …can do batch right through a synchronous medium over here and stil… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| DB | 21 | 00:07:03 |
| DM | 14 | 01:02:26 |
| KV | 11 | 00:47:44 |
| IO | 10 | 00:17:04 |
| UI | 10 | 00:43:29 |
| WS2 | 9 | 01:56:21 |
| PubSub | 9 | 02:10:56 |
| VP | 4 | 00:37:36 |
| WebSockets | 4 | 01:27:54 |
| WS1 | 4 | 01:53:10 |
| WS3 | 4 | 01:59:50 |
| DBS | 2 | 00:09:48 |
| BigQuery | 2 | 00:22:33 |
| NAND | 2 | 00:47:55 |
| FYI | 2 | 01:02:32 |
| WS4 | 2 | 02:09:37 |
| OCS | 2 | 02:39:04 |
| CPU | 1 | 00:02:19 |
| KeyValueStore | 1 | 00:15:17 |
| APP | 1 | 00:28:17 |
| LG | 1 | 00:28:17 |
| LZ | 1 | 00:28:56 |
| IOPS | 1 | 00:29:52 |
| LinkedIn | 1 | 00:31:26 |
| OTP | 1 | 00:35:39 |
| HDFC | 1 | 00:35:46 |
| JP | 1 | 00:37:42 |
| DP | 1 | 01:09:05 |
| ISD | 1 | 01:23:32 |
| BCD | 1 | 02:00:51 |
| ABC | 1 | 02:01:47 |
| ABCD | 1 | 02:08:30 |
| WS | 1 | 02:12:39 |
| BK | 1 | 02:12:57 |
| DBA | 1 | 02:20:33 |
| JavaScript | 1 | 02:29:43 |
| SSH | 1 | 02:33:50 |
| DPA | 1 | 02:40:46 |
| DV | 1 | 03:02:35 |
| TV | 1 | 03:04:33 |
| TLD | 1 | 03:10:26 |
