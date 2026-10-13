# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| ID / IDs | IT | 1009 |  | 0 | 00:00:34, 00:00:45, 00:00:49, 00:00:50 | …I don't know how, but it just happened.… |
| write(s) | right | 230 | AMBIGUOUS | 0 | 00:06:07, 00:07:29, 00:08:08, 00:08:11 | …a till company till 10 000 50 000 users right it works just fine… |
| port | part | 66 | AMBIGUOUS | 2 | 00:00:12, 00:32:33, 00:42:25, 00:59:08 | … written, towards how very optimization part has done.… |
| cache | cash | 62 | AMBIGUOUS | 316 | 00:01:05, 00:01:11, 00:02:45, 00:03:19 | …enda for today is designing distributed cash… |
| in-memory | in memory | 51 |  | 51 | 00:32:55, 00:33:00, 00:33:51, 00:34:08 | …first one distributed cache assume it's in memory it's distributed i should be very… |
| byte | by | 50 | AMBIGUOUS | 8 | 00:10:51, 00:12:36, 00:12:40, 00:15:02 | …So any changes in data is captured by CDC.… |
| shard | shared | 42 | AMBIGUOUS | 0 | 01:39:34, 01:46:32, 02:12:00, 02:13:40 | …which cannot be shared by multiple threads in parallel.… |
| (REJECTED) Redis | read | 39 | AMBIGUOUS | 0 | 00:00:57, 00:06:59, 00:12:31, 00:13:16 | …lly happens but almost all the papers i read somehow are connected to… |
| Redis | read | 39 | AMBIGUOUS | 224 | 00:00:57, 00:06:59, 00:12:31, 00:13:16 | …lly happens but almost all the papers i read somehow are connected to… |
| semantic rejects (lec05) | read | 39 |  | 0 | 00:00:57, 00:06:59, 00:12:31, 00:13:16 | …lly happens but almost all the papers i read somehow are connected to… |
| star (SQL SELECT ) | start | 35 |  | 0 | 00:03:16, 00:03:17, 00:03:21, 00:03:53 | …I'll start with ETL.… |
| (REJECTED) port | part | 33 |  | 0 | 00:00:12, 00:32:33, 00:42:25, 00:59:08 | … written, towards how very optimization part has done.… |
| semantic rejects (lec05) | part | 33 |  | 0 | 00:00:12, 00:32:33, 00:42:25, 00:59:08 | … written, towards how very optimization part has done.… |
| cache / cached / caching | cash | 31 | AMBIGUOUS | 0 | 00:01:05, 00:01:11, 00:02:45, 00:03:19 | …enda for today is designing distributed cash… |
| disk | desk | 30 | AMBIGUOUS | 4 | 02:00:50, 02:01:00, 02:01:38, 02:02:22 | …nk for a very long time, you know which desk to go… |
| ID / IDs | idea | 25 | AMBIGUOUS | 0 | 00:04:12, 00:07:55, 00:24:50, 00:31:54 | …which would give you an idea of almost how data pipelines are built.… |
| lock / locks / locked (DB locking) | log | 25 | AMBIGUOUS | 0 | 00:12:40, 00:12:40, 00:12:59, 00:13:11 | …It reads table by the commit log or the bin log,… |
| trie | try | 22 | AMBIGUOUS | 0 | 00:34:55, 00:35:06, 00:39:00, 00:41:54 | …ng we may need to worry about is how we try to create the open addressing or chaini… |
| (REJECTED) shard | shared | 21 |  | 0 | 01:39:34, 01:46:32, 02:12:00, 02:13:40 | …which cannot be shared by multiple threads in parallel.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | shared | 21 |  | 0 | 01:39:34, 01:46:32, 02:12:00, 02:13:40 | …which cannot be shared by multiple threads in parallel.… |
| semantic rejects (lec05) | shared | 21 |  | 0 | 01:39:34, 01:46:32, 02:12:00, 02:13:40 | …which cannot be shared by multiple threads in parallel.… |
| shard | shared | 21 |  | 0 | 01:39:34, 01:46:32, 02:12:00, 02:13:40 | …which cannot be shared by multiple threads in parallel.… |
| hyphen | happen | 16 |  | 0 | 00:06:52, 00:11:55, 00:19:29, 00:22:34 | …database to those folks, now what would happen?… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | code | 15 |  | 0 | 00:01:20, 00:01:31, 00:44:21, 00:48:19 | …ver time, I deep dive into Redis source code.… |
| cohort | code | 15 | AMBIGUOUS | 2 | 00:01:20, 00:01:31, 00:44:21, 00:48:19 | …ver time, I deep dive into Redis source code.… |
| semantic rejects (lec05) | code | 15 |  | 0 | 00:01:20, 00:01:31, 00:44:21, 00:48:19 | …ver time, I deep dive into Redis source code.… |
| stub (Flickr ticket table column) | stuff | 12 | AMBIGUOUS | 0 | 00:31:20, 01:06:18, 01:06:18, 01:18:42 | …stuff there, right? Like… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try | 11 |  | 0 | 00:34:55, 00:35:06, 00:39:00, 00:41:54 | …ng we may need to worry about is how we try to create the open addressing or chaini… |
| semantic rejects (lec05) | try | 11 |  | 0 | 00:34:55, 00:35:06, 00:39:00, 00:41:54 | …ng we may need to worry about is how we try to create the open addressing or chaini… |
| REST / gRPC | GRPC | 10 |  | 0 | 01:21:34, 01:30:48, 01:31:06, 01:31:39 | …format is either HTTP packets or grpc format or your own custom form.… |
| key-value store | key-value | 10 |  | 2 | 00:34:01, 00:46:45, 00:46:49, 00:47:14 | …stly our requirement is like saving the key value pairs.… |
| lock / locks / locked (DB locking) | logs | 9 | AMBIGUOUS | 0 | 01:42:03, 01:45:01, 01:45:07, 01:45:10 | …re being optimistic that you don't need logs.… |
| locks | logs | 9 | AMBIGUOUS | 3 | 01:42:03, 01:45:01, 01:45:07, 01:45:10 | …re being optimistic that you don't need logs.… |
| ID / IDs | ITs | 8 |  | 0 | 01:15:36, 01:29:30, 01:29:54, 01:43:02 | …, you don't want recency effect to take its,… |
| ZooKeeper / Postgres / Prometheus / Flickr / Discord / Instagram / MongoDB | postgres | 8 |  | 0 | 00:20:18, 00:20:27, 00:20:27, 00:20:41 | …wall directory via postgres client or like it has instance level uh… |
| hyphen | happened | 8 | AMBIGUOUS | 0 | 00:00:34, 00:05:17, 00:17:26, 00:22:59 | …I don't know how, but it just happened.… |
| RAM | run | 7 | AMBIGUOUS | 7 | 00:14:32, 00:14:35, 01:42:13, 01:43:33 | …Run it locally, both open source.… |
| TTL | detail | 7 | AMBIGUOUS | 12 | 00:04:05, 00:04:27, 01:06:59, 01:32:15 | …we'll go into detail.… |
| distributed cache | distributed cash | 7 |  | 11 | 00:01:05, 00:01:11, 00:02:45, 00:03:19 | …where the agenda for today is designing distributed cash… |
| Amazon S3 | S3 | 6 |  | 0 | 00:18:12, 00:18:15, 00:18:19, 00:18:26 | … data from a restaurant and put it into S3.… |
| Arpit (lec04 forms) | arpit | 6 |  | 0 | 00:28:44, 00:28:45, 01:22:58, 01:25:05 | …Hi, Arpit.… |
| Arpit (lec05 forms) | Arpit | 6 |  | 0 | 00:28:44, 00:28:45, 01:22:58, 01:25:05 | …Hi, Arpit.… |
| Elasticsearch | elastic search | 6 |  | 12 | 00:16:29, 02:42:01, 03:04:33, 00:16:29 | …search is written in elastic search transaction is in my sequel now how do … |
| MySQL | my SQL | 6 |  | 24 | 02:43:25, 02:43:37, 02:43:37, 02:43:25 | …Kafka node, they were putting a load on my SQL database, right? Server to read data an… |
| WAL (write-ahead log) | wall | 6 | AMBIGUOUS | 0 | 00:13:12, 00:13:14, 00:20:10, 00:20:10 | …It exposes wall file.… |
| (REJECTED) SLO | slow | 5 |  | 0 | 00:18:00, 00:46:23, 02:17:27, 02:37:29 | …Very slow.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | link | 5 |  | 0 | 00:52:50, 01:02:59, 01:03:45, 02:15:33 | …locate, let's say we are implementing a link list.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | slow | 5 |  | 0 | 00:18:00, 00:46:23, 02:17:27, 02:37:29 | …Very slow.… |
| Apache Flink | link | 5 | AMBIGUOUS | 0 | 00:52:50, 01:02:59, 01:03:45, 02:15:33 | …locate, let's say we are implementing a link list.… |
| Debezium | DBZM | 5 |  | 0 | 00:10:59, 00:14:14, 00:18:49, 00:18:56 | …ens is there are tools like Airbyte and DBZM.… |
| FIFO | FIFA | 5 |  | 0 | 01:15:11, 01:15:12, 01:15:12, 01:15:12 | …Let's say there is FIFA World Cup.… |
| SLO | slow | 5 |  | 0 | 00:18:00, 00:46:23, 02:17:27, 02:37:29 | …Very slow.… |
| semantic rejects (lec05) | slow | 5 |  | 0 | 00:18:00, 00:46:23, 02:17:27, 02:37:29 | …Very slow.… |
| varchar | where it | 5 | AMBIGUOUS | 0 | 01:17:12, 02:18:57, 02:38:11, 02:47:17 | …would have your LRU implementation, but where it's more about that, Hey, what… |
| QUIC | quick | 4 | AMBIGUOUS | 0 | 01:57:26, 02:37:03, 01:57:26, 02:37:03 | …it raise your hands quick raise of hands heaven uh maybe the firs… |
| blob | block | 4 | AMBIGUOUS | 0 | 00:17:53, 01:40:24, 02:44:22, 02:48:53 | …as with application context, like every block published,… |
| cache | catch | 4 | AMBIGUOUS | 316 | 02:31:31, 02:31:35, 02:31:31, 02:31:35 | …s happening. I'm still yet to basically catch up on… |
| load balancer | load-balancer | 4 |  | 6 | 02:06:13, 02:30:52, 02:06:13, 02:30:52 | … forwards the request for you kind of a load balancer.… |
| trade-off | trade off | 4 |  | 4 | 01:09:23, 01:09:49, 01:09:23, 01:09:49 | …So here you see this trade-off.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | quick | 2 |  | 0 | 01:57:26, 02:37:03 | …it raise your hands quick raise of hands heaven uh maybe the firs… |
| MySQL | my sequel | 2 |  | 24 | 00:16:29, 00:16:29 | …ten in elastic search transaction is in my sequel now how do you populate the data… |
| NoSQL | no SQL | 2 |  | 2 | 00:26:15, 00:26:15 | …And if it was a no-sql type of database… |
| NoSQL | no-SQL | 2 |  | 2 | 00:26:15, 00:26:15 | …And if it was a no-sql type of database… |
| QUIC | QUICK | 2 |  | 0 | 01:57:26, 02:37:03 | …it raise your hands quick raise of hands heaven uh maybe the firs… |
| Redis | radius | 2 |  | 224 | 02:30:46, 02:30:46 | …So we, in the radius's way of routing, which is DNS like we … |
| SQL | sequel | 2 | AMBIGUOUS | 34 | 00:16:29, 00:16:29 | … in elastic search transaction is in my sequel now how do you populate the data… |
| WAL (write-ahead log) | write ahead log | 2 |  | 0 | 02:28:55, 02:45:03 | …which is redis's write ahead log… |
| async | a sync | 2 |  | 0 | 00:14:12, 02:56:26 | …You can have a Kafka as a sync.… |
| blog(s) / blogging | blocking | 2 | AMBIGUOUS | 0 | 01:48:00, 03:03:55 | …It is not blocking.… |
| check-in (airline) | checking | 2 | AMBIGUOUS | 0 | 00:54:52, 03:06:14 | …base or in Redisys code base if you are checking that out.… |
| key-value store | key value store | 2 |  | 2 | 01:34:40, 01:34:40 | …designing key value store we talk about how redis does it that sa… |
| lock / locks / locked (DB locking) | login | 2 | AMBIGUOUS | 0 | 01:28:32, 01:28:41 | …st looks something like this post slash login HTTP 1.1 content… |
| semantic rejects (lec05) | quick | 2 |  | 0 | 01:57:26, 02:37:03 | …it raise your hands quick raise of hands heaven uh maybe the firs… |
| single node | single load | 2 | AMBIGUOUS | 10 | 01:39:08, 01:39:11 | …ency because we are still talking about single load.… |
| varchar | where can | 2 | AMBIGUOUS | 0 | 00:15:15, 01:14:17 | …change data capture right okay now where can you use it you can see a lot of systems… |
| write(s) | rights | 2 | AMBIGUOUS | 0 | 02:06:59, 02:47:45 | …Replica doesn't take rights.… |
| writes / write flow | rights | 2 | AMBIGUOUS | 0 | 02:06:59, 02:47:45 | …Replica doesn't take rights.… |
| Amazon SQS | SQS | 1 |  | 0 | 00:14:20 | …SYNC can be Kafka, SQS, Kinesis, local disk,… |
| Big O | big-O | 1 |  | 1 | 01:46:32 | …eated that you shared that implementing big O of one, uh,… |
| HTTP | H T T P | 1 |  | 35 | 01:25:44 | …h t t p slash 1.1… |
| HyperLogLog(s) | hyperlog | 1 |  | 0 | 00:35:56 | …e could store set list bloom filter and hyperlog blog and whatnot.… |
| JSON / JVM / MB / ORM | MP | 1 |  | 0 | 00:43:35 | …ecause you're allocating, let's say one MP chunk every time you have one GB RAM af… |
| Memcached | memcache | 1 |  | 0 | 01:29:54 | …Memcache has its own that all clans are the used… |
| SQL | sequel | 1 |  | 34 | 00:16:29 | … in elastic search transaction is in my sequel now how do you populate the data… |
| WebSocket(s) | website | 1 | AMBIGUOUS | 0 | 02:13:37 | …It's there on my website.… |
| bloom filter | blue filter | 1 |  | 10 | 00:51:32 | …but this pointer can point to a blue filter,… |
| cache miss | cash miss | 1 | AMBIGUOUS | 4 | 01:08:42 | …keys with just very minimal increase in cash miss ratio.… |
| client-server | client server | 1 |  | 1 | 03:08:14 | …client server model,… |
| connection | correction | 1 | AMBIGUOUS | 28 | 03:03:50 | …That's what a correction pool is.… |
| event-driven architecture | event driven | 1 |  | 0 | 03:08:16 | …microservice architecture, event driven.… |
| fan-out | fan out | 1 |  | 1 | 03:04:58 | …But if you'd want to just fan out to multiple things, you can do that.… |
| load balancer | load valancer | 1 |  | 6 | 02:04:24 | …This is how your load valancer works.… |
| microservice | micro service | 1 |  | 2 | 02:12:12 | …it's not a micro service quote unquote consistent hashing is not… |
| pre-reads | periods | 1 | AMBIGUOUS | 1 | 02:13:40 | …And I think I've shared it in periods as well.… |
| replace into (MySQL) / put | foot | 1 | AMBIGUOUS | 0 | 00:25:21 | …because of this uh foot patching would have solved like if they… |
| semantic rejects (lec05) | website | 1 |  | 0 | 02:13:37 | …It's there on my website.… |
| shard | shot | 1 | AMBIGUOUS | 0 | 00:29:17 | …So all of the stages are written in one shot in your log file… |
| sharding | sharing | 1 | AMBIGUOUS | 2 | 00:49:16 | …to other process, to other thing was sharing that same thing.… |
| sync back | sink back | 1 |  | 0 | 01:50:35 | …We'll sink back at 10.55 in five minutes… |
| transaction | version | 1 | AMBIGUOUS | 50 | 01:29:30 | …So Redis has implemented its own version of protocol called RESP.… |
| virtual nodes | virtual notes | 1 |  | 9 | 02:35:10 | …And these virtual notes are on actual physical notes via groupi… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| CDC | 40 | 00:02:52 |
| BitTorrent | 6 | 02:03:26 |
| PHP | 6 | 03:03:05 |
| DBZM | 5 | 00:10:59 |
| AirBite | 5 | 00:14:14 |
| FIFA | 5 | 01:15:11 |
| IoT | 4 | 01:22:58 |
| IPFS | 4 | 02:03:24 |
| JavaScript | 3 | 00:27:20 |
| OS | 3 | 00:46:07 |
| PUNE | 3 | 02:00:42 |
| DK | 2 | 00:28:42 |
| PG | 2 | 00:30:43 |
| LRE | 2 | 01:07:05 |
| HTTP2 | 2 | 01:30:50 |
| AIF | 2 | 02:28:57 |
| GNU | 2 | 02:54:48 |
| CEO | 1 | 00:06:41 |
| BigQuery | 1 | 00:07:31 |
| EBS | 1 | 00:10:37 |
| ChangeJataCapture | 1 | 00:12:49 |
| DPZM | 1 | 00:14:30 |
| MP | 1 | 00:43:35 |
| MVP | 1 | 00:51:35 |
| LF | 1 | 00:59:24 |
| LFE | 1 | 01:02:07 |
| RU | 1 | 01:10:05 |
| GoLine | 1 | 01:18:35 |
| EKS | 1 | 01:19:16 |
| DTP | 1 | 01:19:36 |
| RESP | 1 | 01:29:30 |
| ETN | 1 | 01:38:35 |
| LH | 1 | 01:40:16 |
| ECB | 1 | 01:50:01 |
| SDB | 1 | 01:50:01 |
| XYZ | 1 | 02:00:08 |
| AOF | 1 | 02:28:52 |
| WL | 1 | 02:44:12 |
| IO | 1 | 02:44:41 |
| VCU | 1 | 02:52:59 |
| CPU | 1 | 02:52:59 |
| TC | 1 | 02:54:53 |
| SIG | 1 | 02:55:34 |
| UI | 1 | 02:58:26 |
| PySQL | 1 | 03:01:37 |
| LinkedIn | 1 | 03:07:22 |
