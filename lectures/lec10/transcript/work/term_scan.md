# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| ID / IDs | IT | 759 |  | 0 | 00:00:39, 00:01:32, 00:01:48, 00:01:57 | …It's not something that's just theoretical… |
| write(s) | right | 514 | AMBIGUOUS | 0 | 00:03:22, 00:03:43, 00:03:52, 00:05:57 | …Right.… |
| in-memory | in memory | 232 |  | 290 | 00:06:24, 00:06:24, 00:20:59, 00:21:04 | …create this in-memory object and then check like in-memory ha… |
| (REJECTED) Redis | read | 135 | AMBIGUOUS | 0 | 00:03:15, 00:06:20, 00:10:25, 00:10:32 | …it's mostly read-only.… |
| Redis | read | 135 | AMBIGUOUS | 56 | 00:03:15, 00:06:20, 00:10:25, 00:10:32 | …it's mostly read-only.… |
| semantic rejects (lec05) | read | 135 |  | 0 | 00:03:15, 00:06:20, 00:10:25, 00:10:32 | …it's mostly read-only.… |
| semantic rejects (lec06) | read | 135 |  | 0 | 00:03:15, 00:06:20, 00:10:25, 00:10:32 | …it's mostly read-only.… |
| Amazon S3 | S3 | 98 |  | 1 | 00:17:40, 00:17:51, 00:17:54, 00:18:02 | …ng to keep it simple is on AWS, AWS has S3.… |
| desk (30) | disk | 84 |  | 0 | 00:13:41, 00:23:18, 00:23:25, 00:31:10 | …so that disk.io and seek and all those things is min… |
| O(1) (?) | over | 72 |  | 0 | 00:02:00, 00:04:02, 00:04:05, 00:07:57 | … that's not what we are trying to solve over here.… |
| hash / hashing | has | 62 | AMBIGUOUS | 0 | 00:04:25, 00:14:43, 00:17:40, 00:17:51 | …And the dictionary in total has 170,000 words.… |
| port | part | 60 | AMBIGUOUS | 6 | 00:02:21, 00:05:46, 00:15:30, 00:32:11 | …Let's focus on the core part of it that it's okay for us to have a l… |
| 43 | in-memory | 58 |  | 0 | 00:06:24, 00:06:24, 00:20:59, 00:21:04 | …create this in-memory object and then check like in-memory ha… |
| byte | by | 55 | AMBIGUOUS | 24 | 00:09:39, 00:11:06, 00:12:50, 00:15:40 | …ow because it's fun to discover it step by step right because that that solidifies… |
| to (messages-table column) | two | 47 | AMBIGUOUS | 0 | 00:00:08, 00:01:38, 00:05:05, 00:10:18 | …The agenda for today are two very interesting problem set points tha… |
| key-value store | key-value | 42 |  | 40 | 00:10:18, 00:52:56, 01:04:49, 01:04:50 | …I consider this thing as a key value store, where key is a word, well, you c… |
| star (SQL SELECT ) | start | 42 |  | 0 | 00:00:49, 00:00:50, 00:05:00, 00:08:43 | …So let's start with the first one.… |
| CDEFG / "B maps to see" | see | 40 |  | 0 | 00:19:28, 00:21:22, 00:21:26, 00:26:54 | …And that looks near real because if you see the Lucene index,… |
| key-value store | key value store | 40 |  | 40 | 00:10:18, 00:52:56, 01:04:49, 01:04:50 | …I consider this thing as a key value store, where key is a word, well, you can be … |
| foot (1) | put | 35 |  | 0 | 00:06:04, 00:11:46, 00:39:16, 00:58:08 | …A lot of us put a lot of data in Jason files.… |
| load balancer | load-balancer | 33 |  | 55 | 00:50:22, 00:50:26, 00:50:26, 00:50:32 | …load balancer.… |
| (REJECTED) port | part | 30 |  | 0 | 00:02:21, 00:05:46, 00:15:30, 00:32:11 | …Let's focus on the core part of it that it's okay for us to have a l… |
| semantic rejects (lec05) | part | 30 |  | 0 | 00:02:21, 00:05:46, 00:15:30, 00:32:11 | …Let's focus on the core part of it that it's okay for us to have a l… |
| semantic rejects (lec06) | part | 30 |  | 0 | 00:02:21, 00:05:46, 00:15:30, 00:32:11 | …Let's focus on the core part of it that it's okay for us to have a l… |
| by (50) | byte | 24 |  | 0 | 00:24:50, 00:25:06, 00:26:31, 00:39:40 | …nth byte from the beginning of the file up until… |
| (REJECTED) lock | log | 21 |  | 0 | 00:06:57, 01:07:18, 01:07:21, 01:07:49 | …, it will be something like write ahead log, which will… |
| hyphen | happen | 21 |  | 0 | 00:06:01, 00:25:16, 00:33:11, 00:52:31 | …aking this topic up, but now what would happen?… |
| key-value store | key value | 21 |  | 40 | 00:10:18, 00:52:56, 01:04:49, 01:04:50 | …I consider this thing as a key value store, where key is a word, well, you c… |
| lock / locks / locked | log | 21 |  | 0 | 00:06:57, 01:07:18, 01:07:21, 01:07:49 | …, it will be something like write ahead log, which will… |
| lock / locks / locked (DB locking) | log | 21 | AMBIGUOUS | 0 | 00:06:57, 01:07:18, 01:07:21, 01:07:49 | …, it will be something like write ahead log, which will… |
| semantic rejects (lec06) | log | 21 |  | 0 | 00:06:57, 01:07:18, 01:07:21, 01:07:49 | …, it will be something like write ahead log, which will… |
| semantic rejects (lec06) | happen | 21 |  | 0 | 00:06:01, 00:25:16, 00:33:11, 00:52:31 | …aking this topic up, but now what would happen?… |
| JSON | jason | 16 |  | 23 | 00:05:16, 00:05:25, 00:05:50, 00:05:51 | …And one terabyte dictionary, Jason format.… |
| JSON | Jason | 16 | AMBIGUOUS | 23 | 00:05:16, 00:05:25, 00:05:50, 00:05:51 | …And one terabyte dictionary, Jason format.… |
| JSON / JVM / MB / ORM | Jason | 16 |  | 0 | 00:05:16, 00:05:25, 00:05:50, 00:05:51 | …And one terabyte dictionary, Jason format.… |
| forks | folks | 14 | AMBIGUOUS | 0 | 00:21:37, 00:35:31, 01:40:38, 01:47:04 | … or let me let me cover that i know you folks would go into very fancy… |
| semantic rejects (lec06) | version | 14 |  | 0 | 00:42:48, 00:44:02, 00:44:07, 00:44:11 | …with some version number.… |
| transaction | version | 14 | AMBIGUOUS | 0 | 00:42:48, 00:44:02, 00:44:07, 00:44:11 | …with some version number.… |
| EC2 | easy to | 12 | AMBIGUOUS | 0 | 01:09:00, 01:12:14, 02:45:42, 02:45:45 | …Like see, again, as I always say, it's easy to build complex systems.… |
| Pub/Sub | pubsub | 12 |  | 0 | 01:32:14, 01:32:18, 01:32:26, 01:32:36 | …Remember Redis Pubsub?… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| (REJECTED) SLO | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | code | 11 |  | 0 | 01:12:20, 01:12:36, 02:27:31, 02:34:41 | …But when you are going to write the code, that's what I always say.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| 41 | load balancer | 11 |  | 0 | 00:50:22, 00:50:26, 00:50:26, 00:50:32 | …load balancer.… |
| SLO | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| brittle | little | 11 | AMBIGUOUS | 0 | 00:02:13, 00:02:21, 00:38:15, 00:38:15 | …So we are okay to have a little high response… |
| cohort | code | 11 | AMBIGUOUS | 0 | 01:12:20, 01:12:36, 02:27:31, 02:34:41 | …But when you are going to write the code, that's what I always say.… |
| semantic rejects (lec05) | code | 11 |  | 0 | 01:12:20, 01:12:36, 02:27:31, 02:34:41 | …But when you are going to write the code, that's what I always say.… |
| semantic rejects (lec05) | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| semantic rejects (lec06) | code | 11 |  | 0 | 01:12:20, 01:12:36, 02:27:31, 02:34:41 | …But when you are going to write the code, that's what I always say.… |
| semantic rejects (lec06) | slow | 11 |  | 0 | 00:23:18, 00:23:37, 00:32:31, 00:32:38 | …your things first of all very slow second it would degrade the performance… |
| ID / IDs | idea | 10 | AMBIGUOUS | 0 | 00:15:44, 01:29:19, 01:29:31, 01:35:56 | …The idea is about making it searchable by sortin… |
| ZooKeeper / Postgres / Prometheus / Flickr / Discord / Instagram / MongoDB | postgres | 10 |  | 0 | 00:01:05, 02:26:26, 02:30:59, 02:54:27 | …Like no MySQL, no Postgres, no MongoDB, no Redis, nothing.… |
| connection pooling / connection pool | polling | 10 | AMBIGUOUS | 0 | 01:32:01, 01:32:47, 01:33:47, 01:34:12 | …So instead of polling,… |
| semantic rejects (lec06) | idea | 10 |  | 0 | 00:15:44, 01:29:19, 01:29:31, 01:35:56 | …The idea is about making it searchable by sortin… |
| semantic rejects (lec06) | stuff | 9 |  | 0 | 01:28:49, 01:51:50, 02:09:29, 02:09:29 | …You didn't check a lot of stuff there.… |
| stub (Flickr ticket table column) | stuff | 9 | AMBIGUOUS | 0 | 01:28:49, 01:51:50, 02:09:29, 02:09:29 | …You didn't check a lot of stuff there.… |
| ID / IDs | ITs | 8 |  | 0 | 00:48:14, 01:14:32, 01:42:50, 02:04:37 | …it has its own encoder and decoder.… |
| SSTable | SS table | 8 |  | 2 | 02:03:39, 02:11:47, 02:43:37, 02:43:37 | …structure of a mem table or SS table works, you have something in memory as … |
| blogs | blocks | 8 | AMBIGUOUS | 1 | 00:00:28, 00:02:45, 00:20:38, 00:20:52 | …So there are a lot of building blocks, a lot of foundational concepts that wo… |
| read (39) | Redis | 8 |  | 0 | 00:01:05, 00:04:46, 01:32:14, 01:32:18 | …e no MySQL, no Postgres, no MongoDB, no Redis, nothing.… |
| shard | shared | 8 | AMBIGUOUS | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| trie | try | 8 | AMBIGUOUS | 0 | 01:27:31, 02:34:41, 02:41:13, 02:52:55 | …Rather than this, what we can try for is rather than dict2.dict, we can h… |
| 23 | MB | 7 |  | 0 | 00:30:26, 00:31:00, 00:34:06, 00:38:05 | …MB. That's it.… |
| catch (4) | cache | 7 |  | 0 | 01:27:59, 01:28:03, 01:28:11, 01:28:33 | …their cache.… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | easy to | 6 |  | 0 | 01:09:00, 01:12:14, 02:45:42, 02:45:45 | …Like see, again, as I always say, it's easy to build complex systems.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | easy to | 6 |  | 0 | 01:09:00, 01:12:14, 02:45:42, 02:45:45 | …Like see, again, as I always say, it's easy to build complex systems.… |
| Pub/Sub | PubSub | 6 |  | 0 | 01:32:14, 01:32:18, 01:32:26, 01:32:36 | …Remember Redis Pubsub?… |
| QUIC | quick | 6 | AMBIGUOUS | 0 | 00:32:01, 00:39:03, 01:24:55, 00:32:01 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| disk | desk | 6 | AMBIGUOUS | 252 | 00:11:42, 02:30:23, 02:41:07, 00:11:42 | …heavy on IO side or read side on desk.… |
| semantic rejects (lec05) | easy to | 6 |  | 0 | 01:09:00, 01:12:14, 02:45:42, 02:45:45 | …Like see, again, as I always say, it's easy to build complex systems.… |
| semantic rejects (lec06) | easy to | 6 |  | 0 | 01:09:00, 01:12:14, 02:45:42, 02:45:45 | …Like see, again, as I always say, it's easy to build complex systems.… |
| transaction | Transition | 6 |  | 0 | 01:22:35, 01:23:35, 01:43:42, 01:22:35 | …ut, but definitely making sure that the transition,… |
| varchar | where it | 6 | AMBIGUOUS | 0 | 00:11:52, 01:02:38, 01:02:55, 01:23:21 | …figure it out where it is and then change or add,… |
| 5 | writes | 5 |  | 10 | 01:52:29, 02:19:40, 02:22:44, 02:33:55 | …reads order one writes order one deletes with persistence righ… |
| RAM | run | 5 | AMBIGUOUS | 5 | 01:13:14, 01:17:49, 01:29:10, 02:20:52 | …time and, uh, later run some sort of compaction process after.… |
| disk | disc | 5 |  | 252 | 02:01:25, 02:01:38, 02:01:38, 02:02:37 | …tes like this in this motion while your disc spins.… |
| run (7) | RAM | 5 |  | 0 | 00:30:34, 00:55:18, 00:55:25, 02:15:08 | …you can fit it in RAM very easily.… |
| (REJECTED) blob | block | 4 |  | 0 | 00:20:48, 00:58:44, 00:58:49, 02:52:35 | …and you have eight kilobyte block.… |
| (REJECTED) shard | shared | 4 |  | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try | 4 |  | 0 | 01:27:31, 02:34:41, 02:41:13, 02:52:55 | …Rather than this, what we can try for is rather than dict2.dict, we can h… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | shared | 4 |  | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| 19 | hash map | 4 |  | 0 | 00:06:24, 00:31:27, 00:31:27, 01:41:12 | …ry object and then check like in-memory hash map or something… |
| 37 | Arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| Arpit (lec04 forms) | arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| Arpit (lec05 forms) | Arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| Arpit (lec06) | Arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| Arpit (lec08) | arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| Arpit (lec08) | Arpit | 4 |  | 0 | 00:14:30, 00:15:08, 00:43:48, 01:34:59 | …I have a bit different of Arpit there.… |
| REST / gRPC | rest | 4 |  | 0 | 01:13:55, 01:35:00, 01:35:08, 02:52:44 | …e in that file. And then append all the rest file to it.… |
| blob | block | 4 | AMBIGUOUS | 2 | 00:20:48, 00:58:44, 00:58:49, 02:52:35 | …and you have eight kilobyte block.… |
| check-in (airline) | checking | 4 | AMBIGUOUS | 0 | 01:25:20, 01:40:02, 02:47:09, 02:56:34 | …It is checking the offset, going to that location,… |
| idea (25) | ID | 4 |  | 0 | 00:19:11, 01:45:21, 02:30:47, 02:58:54 | …Lucene tries to figure out the document ID and name… |
| semantic rejects (lec05) | shared | 4 |  | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| semantic rejects (lec05) | try | 4 |  | 0 | 01:27:31, 02:34:41, 02:41:13, 02:52:55 | …Rather than this, what we can try for is rather than dict2.dict, we can h… |
| semantic rejects (lec05) | rest | 4 |  | 0 | 01:13:55, 01:35:00, 01:35:08, 02:52:44 | …e in that file. And then append all the rest file to it.… |
| semantic rejects (lec06) | try | 4 |  | 0 | 01:27:31, 02:34:41, 02:41:13, 02:52:55 | …Rather than this, what we can try for is rather than dict2.dict, we can h… |
| semantic rejects (lec06) | shared | 4 |  | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| semantic rejects (lec06) | checking | 4 |  | 0 | 01:25:20, 01:40:02, 02:47:09, 02:56:34 | …It is checking the offset, going to that location,… |
| semantic rejects (lec06) | block | 4 |  | 0 | 00:20:48, 00:58:44, 00:58:49, 02:52:35 | …and you have eight kilobyte block.… |
| session | section | 4 | AMBIGUOUS | 0 | 00:59:20, 00:59:30, 00:59:20, 00:59:30 | …random read in the data section.… |
| shard | shared | 4 |  | 0 | 00:51:59, 00:58:08, 00:58:14, 02:37:33 | …so can we have a shared disk storage for all the api servers th… |
| (REJECTED) QUIC | QUICK | 3 |  | 0 | 00:32:01, 00:39:03, 01:24:55 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | quick | 3 |  | 0 | 00:32:01, 00:39:03, 01:24:55 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| 51 | linked list | 3 |  | 0 | 01:15:30, 01:15:30, 01:15:30 | …linked list problem, merge two linked list, merge t… |
| BookMyShow / KV API / goroutines / IOs | IOS | 3 |  | 0 | 02:27:11, 02:41:01, 02:41:21 | …How many disk IOs are you making? That would make things … |
| Pub/Sub | pubs up | 3 |  | 0 | 01:51:12, 01:51:12, 01:51:12 | …nd file or do reactive or have reactive pubs up again.… |
| QUIC | QUICK | 3 |  | 0 | 00:32:01, 00:39:03, 01:24:55 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| WAL (write-ahead log) | wall | 3 | AMBIGUOUS | 0 | 02:53:05, 02:53:30, 02:53:48 | …wall thing goes.… |
| hyphen | happened | 3 | AMBIGUOUS | 0 | 00:31:47, 02:54:34, 02:57:40 | …our system very better because what has happened is instead of over… |
| memtable | mem table | 3 |  | 0 | 02:03:39, 02:43:30, 02:45:13 | …structure of a mem table or SS table works, you have something i… |
| part (66) | port | 3 |  | 0 | 01:36:30, 01:36:33, 01:36:42 | …like basically if you either give a new port to it… |
| read-heavy | read heavy | 3 |  | 6 | 00:10:25, 00:10:42, 00:22:58 | …hat word searchable via key plus it's a read heavy operation.… |
| semantic rejects (lec05) | quick | 3 |  | 0 | 00:32:01, 00:39:03, 01:24:55 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| semantic rejects (lec06) | quick | 3 |  | 0 | 00:32:01, 00:39:03, 01:24:55 | …verge on this discussion and give you a quick summary of it we started with storing t… |
| transaction | transition | 3 | AMBIGUOUS | 0 | 01:22:35, 01:23:35, 01:43:42 | …ut, but definitely making sure that the transition,… |
| transaction | transition | 3 |  | 0 | 01:22:35, 01:23:35, 01:43:42 | …ut, but definitely making sure that the transition,… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | section | 2 |  | 0 | 00:59:20, 00:59:30 | …random read in the data section.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | section | 2 |  | 0 | 00:59:20, 00:59:30 | …random read in the data section.… |
| 4 | write-ahead log | 2 |  | 21 | 00:06:57, 02:11:51 | …ould be like, it will be something like write ahead log, which will… |
| Elasticsearch | elastic search | 2 |  | 4 | 02:40:29, 02:40:29 | …distributed nothing but just like what elastic search did to lucene react does it with bitcas… |
| TTL | detail | 2 | AMBIGUOUS | 0 | 02:55:41, 03:00:27 | …But very into implementation detail,… |
| WAL (write-ahead log) | write ahead log | 2 |  | 0 | 00:06:57, 02:11:51 | …ould be like, it will be something like write ahead log, which will… |
| graph (database) | grab | 2 | AMBIGUOUS | 0 | 02:47:02, 02:47:27 | …you kind of create a file and up front grab 1gb space in that and so that that file… |
| polling | pulling | 2 | AMBIGUOUS | 20 | 01:30:36, 01:30:36 | …they will keep on pulling this metadata let's say at some frequen… |
| semantic rejects (lec05) | section | 2 |  | 0 | 00:59:20, 00:59:30 | …random read in the data section.… |
| semantic rejects (lec06) | detail | 2 |  | 0 | 02:55:41, 03:00:27 | …But very into implementation detail,… |
| semantic rejects (lec06) | section | 2 |  | 0 | 00:59:20, 00:59:30 | …random read in the data section.… |
| (REJECTED) Pub/Sub | pop-up | 1 |  | 0 | 03:01:27 | …e else? Any other question? No, Dan, no pop-up allowed.… |
| (REJECTED) Pub/Sub | pop up | 1 |  | 0 | 03:01:27 | …e else? Any other question? No, Dan, no pop-up allowed.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | tree | 1 |  | 0 | 00:20:33 | … is basically I'm getting into a B plus tree.… |
| 26 | clients | 1 |  | 2 | 01:18:52 | …tical thing is that we have to tell the clients who are using this… |
| 34 | blog | 1 |  | 0 | 02:55:33 | …but on medium blog post,… |
| 45 | consistent hashing | 1 |  | 0 | 02:38:57 | …hash paste, consistent hashing, data movement, whatnot.… |
| 58 | data movement | 1 |  | 0 | 02:38:57 | …hash paste, consistent hashing, data movement, whatnot.… |
| B+ tree | B plus tree | 1 |  | 0 | 00:20:33 | …getting is basically I'm getting into a B plus tree.… |
| ID / IDs | ideas | 1 | AMBIGUOUS | 0 | 01:35:51 | … that server is going to, so I have two ideas.… |
| JSON / JVM / MB / ORM | MP | 1 |  | 0 | 02:59:53 | …ike the per index entry turns out to be MP.… |
| Martin Kleppmann | Martin Kleppman | 1 |  | 0 | 02:45:25 | …out BitCask in the storage chapter from Martin Kleppman book.… |
| Memcached | memcache | 1 |  | 0 | 00:04:46 | …MongoDB, no Elasticsearch, no Redis, no Memcache, nothing, nothing, nothing.… |
| Pub/Sub | pops up | 1 | AMBIGUOUS | 0 | 01:43:42 | … to the same path, transition, reactive pops up, parallel setup. This is what we are do… |
| Pub/Sub | pop-up | 1 | AMBIGUOUS | 0 | 03:01:27 | …e else? Any other question? No, Dan, no pop-up allowed.… |
| Socket.io / Socket IO; WebTransport; timestamp | time stamp | 1 |  | 0 | 02:31:41 | …CRC time stamp just for conflicts key size value size … |
| TIFF (?) | TAPE | 1 |  | 0 | 02:00:38 | …ur ssds your magnetic disk storage your tape storage right so if this is your memory… |
| connection pooling / connection pool | pulling | 1 | AMBIGUOUS | 0 | 01:30:36 | …they will keep on pulling this metadata let's say at some frequen… |
| cores | codes | 1 | AMBIGUOUS | 0 | 00:47:35 | …the Jason decoder decodes curly braces, codes, it's string.… |
| flush / flush frequency | flash | 1 | AMBIGUOUS | 0 | 02:25:23 | …sk approach to write it they have their flash memories and whatnot it does… |
| image | email | 1 | AMBIGUOUS | 3 | 00:04:02 | … are given this new changelog file over email.… |
| load balancer | load balance or | 1 |  | 55 | 00:50:16 | …have a load balance or something where after which you get a b… |
| load balancer | load balance | 1 |  | 55 | 00:50:16 | …have a load balance or something where after which you get … |
| lock / locks / locked | logs | 1 |  | 0 | 00:07:02 | …have like, which will create some logs.… |
| lock / locks / locked (DB locking) | logs | 1 | AMBIGUOUS | 0 | 00:07:02 | …have like, which will create some logs.… |
| locks | logs | 1 | AMBIGUOUS | 0 | 00:07:02 | …have like, which will create some logs.… |
| replace into (MySQL) / put | foot | 1 | AMBIGUOUS | 0 | 02:08:17 | …But idea is always any foot comes, you go and add no matter what.… |
| rollback | roll back | 1 |  | 1 | 01:22:47 | …and if it does not goes we have to roll back and provide the previous file is necess… |
| semantic rejects (lec05) | tree | 1 |  | 0 | 00:20:33 | … is basically I'm getting into a B plus tree.… |
| semantic rejects (lec05) | pop up | 1 |  | 0 | 03:01:27 | …e else? Any other question? No, Dan, no pop-up allowed.… |
| semantic rejects (lec06) | tree | 1 |  | 0 | 00:20:33 | … is basically I'm getting into a B plus tree.… |
| shard | shot | 1 | AMBIGUOUS | 0 | 02:27:38 | …so that you get that entire data in one shot so that's what… |
| trie | tree | 1 | AMBIGUOUS | 0 | 00:20:33 | … is basically I'm getting into a B plus tree.… |
| write(s) | rights | 1 | AMBIGUOUS | 0 | 02:50:15 | …One is the active file and all the rights are happening and having two historical… |
| write-around | write around | 1 |  | 1 | 01:11:02 | …Let's say if I write around fruit, what would happen?… |
| writes / write flow | rights | 1 | AMBIGUOUS | 0 | 02:50:15 | …One is the active file and all the rights are happening and having two historical… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| CSV | 10 | 00:07:17 |
| CRC | 10 | 02:30:59 |
| BitCask | 10 | 02:37:28 |
| SS | 7 | 02:03:39 |
| CC | 3 | 01:16:25 |
| EE | 3 | 01:16:35 |
| FF | 3 | 01:16:40 |
| PubSub | 3 | 01:32:36 |
| ABC | 2 | 00:13:20 |
| ABCD | 2 | 00:27:34 |
| MP3 | 2 | 00:43:35 |
| AODB | 2 | 00:43:48 |
| SSD | 2 | 00:56:03 |
| DD | 2 | 01:16:35 |
| PM | 2 | 01:28:52 |
| NTFS | 2 | 02:18:59 |
| BitCast | 2 | 02:41:53 |
| MSN | 1 | 00:24:24 |
| MD | 1 | 00:37:35 |
| MP4 | 1 | 00:46:21 |
| TPT | 1 | 00:47:53 |
| PDF | 1 | 00:47:53 |
| TIF | 1 | 00:48:39 |
| SE | 1 | 00:58:59 |
| PSV | 1 | 01:10:02 |
| IDE | 1 | 01:11:22 |
| AA | 1 | 01:15:49 |
| NAS | 1 | 01:19:40 |
| SDK | 1 | 01:41:32 |
| PTRFS | 1 | 02:18:59 |
| FM | 1 | 02:37:54 |
| MAM | 1 | 02:44:20 |
| BTRFS | 1 | 02:48:40 |
| EXT234 | 1 | 02:48:40 |
| MBS | 1 | 02:56:37 |
| MP | 1 | 02:59:53 |
