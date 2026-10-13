# Term decisions — lec07 (frozen 2026-10-13, Pass 0b)

Copied from project `transcripts/term_decisions.md` (lec01-lec05 rows). lec07-specific decisions are in the
"Added for lec07" section below, the lec07 speaker map, lec07 structure notes and lec07 open questions.
Where a lec07 row conflicts with an older row, the lec07 row wins for this lecture.

lec07 = Week 5 Day 1 ("storage engines" week), spoken ENGLISH (Indian-accented), almost no Hindi. Same teacher (Arpit).
Topics: intro to ETL / tiered storage / CDC (Airbyte, Debezium, WAL/binlog, sinks, client story with 80% cost cut);
distributed cache on a single node (hash table, value object wrapper with type + LRU bits, memory accounting,
malloc / zmalloc, eviction LRU / LFU / random, approximated LRU, communication protocol: HTTP vs raw TCP, netcat, RESP;
TTL handling: lazy deletion + sampling 20 keys; concurrency: pessimistic / optimistic locking / single-threaded);
break; making it distributed (storage ranges, routing: proxy / smart client / forward-from-any-node with the bank
analogy, IPFS / BitTorrent / DHT / Kademlia, consistent hashing, virtual nodes, replicas, AOF persistence); Q&A
(malloc limits, CDC scaling, shared/exclusive locks from week 2, connection pooling in PHP, new beginners course, 1:1 slots).

---

(project file content follows)

Lecture 1 is almost entirely spoken ENGLISH (Indian-accented), with very little Hindi. Romanization rules apply only to the rare Hindi words.
Course context: system design class covering scaling, concurrency, delegation (queues/Kafka), communication (polling, WebSockets), caching, databases.

## Technical terms (canonical spelling + ASR forms seen)

| Canonical | ASR forms seen | Notes / decision evidence (first time, context) |
|---|---|---|
| cache | !cash; !catch | Only where the sentence is clearly about caching (e.g. 00:14:11 "consistency between cash" -> cache). Keep "catch" when it means catch (exceptions, "catch up"). |
| cached | !cashed | caching context only (00:25:32) |
| caching | !catching | caching context only (01:02:36 "question on catching" -> caching) |
| polling | !pulling | Only when the teacher is discussing polling as a communication pattern (short/long polling, 01:56+). KEEP "pulling" for replicas pulling changes, consumers pulling messages (pull-based) — those are correct. |
| long polling | !long pulling | communication section |
| short polling | !short pulling | communication section |
| WebSocket | web socket | keep plural "WebSockets" |
| Elasticsearch | elastic search | |
| Kinesis | kinases | AWS Kinesis, with Kafka |
| Kafka | kafka | capitalise |
| SQS | sqs | keep as spoken "SQS" — do NOT expand to "Amazon SQS" |
| SNS | sns | keep as spoken "SNS" — do NOT expand |
| S3 | | keep as spoken |
| RabbitMQ | rabbit MQ; rabbit mq | |
| MySQL | my SQL; my sequel | only when product is meant |
| SQL | !sequel | only when the language/DB is meant |
| NoSQL | no SQL; no-SQL | |
| ACID | !asset | only for "ACID properties"/transactions (01:50:04, 03:14:38) |
| TCP | DCP | 02:25:50 |
| endpoint | and point | 01:50:53 "rest and point" -> "REST endpoint" |
| CI/CD | CICD; cicd | |
| autoscaling | auto scaling; auto-scaling | keep as one word style "autoscaling group" |
| multi-master | multi master | |
| in-memory | in memory | only when adjectival ("in-memory cache"); "put cache in memory" stays |
| load balancer | load-balancer | |
| nginx | | lowercase per product |
| Redis | readies | |
| QUIC | !quick | only if teacher is clearly naming the protocol (03:07:52 context, HTTP/3). "quick response" stays. |
| shard | !shared | only in sharding context; "shared resources" stays |
| trie | !try | only if teacher clearly talks about the trie data structure; otherwise keep "try" |
| port | !part | almost always "part" is correct in this lecture — change ONLY in explicit networking context (port number). Do not bulk-change. |
| session | !section | "critical section" is CORRECT (concurrency) — keep |
| EC2 | !easy to | only in AWS instance context; 00:00:54 "it becomes easy to comprehend" stays |
| Prerender.io | | 25 min |
| Cloudflare | | |
| MQTT | | |

### Added from lec02 (2026-10-12)

| Canonical | ASR forms seen | Notes / decision evidence (first time, context) |
|---|---|---|
| Pub/Sub | pubsub; pub sub; pub-sub; PubSub; pubsup; pubs up; Pubser; popsob; pumps up; real type of sub; copsev; !pops up; !pop-up | non-word forms -> Pub/Sub in Pub/Sub context. "pops up"/"pop-up" -> Pub/Sub ONLY right after "real-time"/"Redis" (lec02 02:08:41, 02:39:12, 03:15:08); UI pop-ups stay. |
| Redis | red is; redisk; radius; !read; !studies | "red is"/"radius"/"read" -> Redis only inside a Redis/Pub/Sub sentence (lec02 02:45:45, 02:18:43, 02:46:37); otherwise flag `[?Redis]`. |
| WebSocket(s) | web pockets; pepsockets; !web software; !website | non-words -> WebSockets. "web software" (6x in lec02) and "website" are real words: correct only with strong WebSocket context, else `[?WebSocket \| asr: "web software"]`. Verifier counts "web socket" -> "WebSocket" joins as drop+add: log each join as TERM. |
| edge server(s) | ad server; head servers; age server(s) | edge-server design context (lec02 02:34-02:44). |
| key-value store | key value store; key values store; KeyValueStore; KVStore | hyphenate adjectival; "KVStore" -> "KV store". |
| sharding | sharting | non-word. REJECT "sharing" -> sharding when it is the shared-database pattern (lec02 03:05). |
| cross-shard | cross-sharp; cross-shot | lec02 00:13-00:14. |
| non-relational | known relational; non-resistant | medium conf. Keep "non-SQL" as spoken (different word from NoSQL). |
| DB / DBs | devs; DBS; !DV; !TV; !DDs | only in storage sentences; "DBS" -> "DBs". |
| graph (database) | !grab; !craft | only in "graph database(s)" context. |
| column-oriented / row-oriented | color-oriented; raw oriented | row vs column DB context. |
| disk | !desk | storage / disk-IO sentences only. |
| joins / self joins | joints; cell joints | DB query context. |
| exactly-once | exactly one (semantics) | message delivery context. |
| pull-based | full base | |
| cohort | court; !code | "court" corrected in course-cohort context; "code" stays flagged. |
| WiredTiger | Wiretigers | MongoDB storage engine. |
| TigerGraph / BadgerDB / Dgraph / Neo4j / Neptune | Tiger Graph; Badger DBS; D-graph | product casing. |
| DynamoDB | dynamo DB; !Daryl Abu Devi | spacing; "Daryl Abu Devi" left flagged in lec02. |
| CloudFront | cloud front | |
| microservices | micro services; micro-services | |
| master-slave | master slave | keep teacher's term; hyphenate only. |
| trade-off | trade off | noun only; verb stays. |
| REST / gRPC | rest; GRPC | casing. |
| Slack's | slags; slacks | "Slack's real-time communication" (lec02 00:54:08, 03:14:18). |
| von Neumann | one human's | CPU architecture context, medium. |
| toolings | !two links | teacher's own word "toolings"; "two links" left flagged in lec02 (00:44-00:46). |
| (REJECTED) SLO | slow | adjective "slow" every time in lec02. |
| (REJECTED) HDFS | HDFC | "HDFC Bank" is a real bank in the teacher's anecdote. |
| (REJECTED) DNS | DMs | "DMs" = direct messages. |
| (REJECTED) write-through | right through | lec02 01:34:57 = "batch write through" (WORD); "a synchronous" -> flag `[?asynchronous]` (meaning flips). |
| kick off | quick off | lec02 01:01:55, WORD medium. |
| Socket.io / Socket IO; WebTransport; timestamp | socket IO; web transport; time stamp | lec02 kept as ASR wrote them (casing only, no joins). |

### Added from lec03 (2026-10-13)

| Canonical | ASR forms seen | Notes / decision evidence (first time, context) |
|---|---|---|
| ID / IDs | IT; ITs; !idea; !ideas | Non-words IT/ITs -> ID(s) in ID-generation context. "idea(s)" only where an identifier is clearly meant (lec03 00:04:20, 02:16:42 "machine ideas", 02:23:15); "the idea is ..." always stays. |
| UUID | UID; uid(s) | UUID-vs-integer discussions (lec03 01:12-01:18). "UI" stays flagged `[?UUID]`. |
| epoch millisecond(s) | APOC-MEDISECOND; get up of; f of; !a pop many seconds | lec03 00:06:47, 00:09:23, 01:43:54. "a pop many seconds" flagged only. |
| Snowflake (Twitter ID algorithm) | Noflake; is no flag; snowflake | Capitalise when it names the algorithm/ID; physical snowflakes stay lowercase. |
| B+ tree | B plus three | lec03 01:12:01, 01:58:49. |
| pagination | imagination; mission; !the nation; !vegetation; !page initial | Non-word-in-context forms -> pagination; real words flagged. |
| where clause(s) | varic losses | lec03 01:48:44. |
| upsert | upset; !absurd | Only in an explicit upsert/"on duplicate key update" stretch (lec03 01:24). |
| locks | !logs | Concurrency / atomic-increment context, teacher speech (lec03 00:13:36). Student questions flagged `[?locks]`. |
| flush / flush frequency | !flash; plus frequency | Persist-to-disk context (lec03 00:22, 02:25:17). |
| concatenated | concordinated | non-word (lec03 00:28:39). |
| write(s) | !right; !rights | Only in write-conflict / write-volume sentences; "right?" tags stay. |
| hyphen | hyper; happen; !happened | Teacher dictating ID formats (lec03 00:11:34). "M1 happened 10" stays flagged. |
| cores | !codes | CPU/threads context only. |
| collision | coalition | ID-collision context. |
| NTP | NDP | clock-sync context (lec03 00:40:20). |
| Lamport clock | lampard clock | lec03 02:21:12. |
| load balancer | load balance; load valancer | |
| service(s) | surveys; !surface | "central ID surveys" etc. |
| microservice(s) | !Microsoft | Only inside a microservices point (lec03 02:04:56). |
| custom epoch | customer epoch | Discord/Instagram custom epoch (lec03 02:13:23). |
| per shard | per shot | lec03 02:12:50. |
| stub (Flickr ticket table column) | !stuff | Only where the stub column is meant. |
| primary key | primary care | lec03 02:27:01. |
| queue | Q | Spoken "Q" -> queue in queue context (lec03 02:23). |
| disk IOs | disk IOS; disk iOS | casing (plural of IO). |
| FYI | FII; fii | Teacher's tic "..., FYI" (lec03). Re-check lec02 02:28:21 FII. |
| PL/SQL | PLSQL; PL, SQL | Keep PL/SQL; do not change to PL/pgSQL. |
| nextval | next well; next file | Postgres sequence function - flag `[?nextval]` only, not confirmed. |
| cohorts | courts | course context (lec03 00:01:45). |
| Numberphile | number file | YouTube channel. |
| airline check-in system | airline checking system | course covered airline check-in (concurrency week). |
| ZooKeeper / Postgres / Prometheus / Flickr / Discord / Instagram / MongoDB | zookeeper; postgres | casing only. |
| (REJECTED) shard | shared | "shared service", "I shared a video" correct in lec03. |
| (REJECTED) port | part | No port-number context in lec03; never bulk-change. |

### Added from lec04 (2026-10-13)

lec04 = opening session of a new cohort (16th), spoken English: course rules, online/offline indicator (heartbeat, TTL), Redis vs DynamoDB, connection pooling, database (soft delete, varchar, date time / epoch), caching, Q&A.

| Canonical | ASR forms seen | Notes / decision evidence |
|---|---|---|
| cache / cached / caching | !cash; !cashed; !catching | lec04: all hits in caching sentences -> cache (TERM high). Outside caching sentences flag `[?cache]`. |
| in-memory | in memory | hyphen only when adjectival ("in-memory database"); predicate "it's in memory" stays. |
| connection pooling / connection pool | connection pulling; connection polling; correction pulling; connection pull; !pulling; !polling | lec04 01:05-01:34, 02:52-02:59. Bare "pulling/polling" -> pooling only in a connection-pool sentence; "pulling in a lot of data" stays. |
| connection | !correction | "database correction object" -> connection (lec04 01:15:28). |
| DynamoDB | dynamo tv; DynamiteDB; dynamic db | DynamoDB context (lec04 00:20:02, 02:47:02, 02:50:42 medium). Bare "Dynamo" and "DDB" stay as spoken. Bare "Dynamite" flagged only. |
| Redis | radius; Reddit side | "MySQL Radius Elasticsearch" (lec04 01:02:48); "Reddit side" (lec04 03:00:28). |
| (REJECTED) Redis | !read | lec04: "read" is the verb everywhere. |
| cron job | crown job | lec04 02:37:04. |
| distributed system | distribute system | WORD medium (lec04 01:18:12). |
| keep-alive | keep alive | hyphen ("keep-alive header"). |
| HTTP/2 | HTTP two; !HTTP to | "HTTP two" -> HTTP/2 (lec04 03:03:37); "HTTP to" flagged only. |
| stateful | state full | lec04 03:04:21. |
| endpoint | end point | join (lec04 00:25:11). |
| epoch / epoch integer | a POC integer; a poch; a open integer; !a pocket teacher | date-time section (lec04 01:53-02:11). "a pocket teacher" flagged only. Relates to lec03 "epoch millisecond(s)" row. |
| date time | daytime; Daytime | date-time storage stretch only (lec04 01:53-02:11); teacher's spoken form "date time", not "datetime". |
| Redbus | red was | lec04 02:05:53 date-time example. |
| integer comparison | integer comparizer | lec04 01:59:44, WORD medium. |
| CRUD API | crowd API | lec04 00:05:28. |
| cloud providers | crowd providers | lec04 00:56:40. |
| TTL / time to live | TTR; time to leave | heartbeat expiry (lec04 00:45:08, 00:44:13). |
| Aerospike | ArrowSpike | DB product list (lec04 01:00:52). "ArrowDB" flagged only. |
| Debezium | DBZM | CDC tool (lec04 02:52:09). |
| flash sale | FlashSane | lec04 01:33:10. |
| TCP | !PCM | lec04 01:20:05 flagged `[?TCP \| asr: "PCM"]` only. |
| day zero architecture | DAISY architecture | lec04 00:16:55 (TERM medium; "day zero architecture" said at 00:17:21, 00:18:31). |
| HyperLogLog(s) | hyperlog logs; hyperlog | Redis data-structure list (lec04 00:58:16, 02:14:37). |
| geospatial | geo special | "geospatial queries" (lec04 00:58:16, 02:14:37). |
| B plus tree | b plus 3; B plus 3; B plus three | lec04 kept the spoken words "B plus tree"; lec03 wrote "B+ tree" for the same ASR form. Both are the same term; pick one spelling per lecture. |
| varchar | where care; where cat | column types (lec04 01:48:49-01:51:21). |
| published at | published art | blogs-table column (lec04 01:52:39). |
| blog(s) / blogging | !block(s); !blocking | ONLY in the blogging-app schema / blog-caching stretch (lec04 01:41-02:28). "blocking queue" stays. |
| disk | disc; !desk | storage / disk-IO sentences (lec04 01:51:27, 02:16:50, 02:41-02:45). |
| byte | !by | byte-offset explanation only (lec04 01:49:12). |
| select star | select start | SQL "select *" spoken (lec04 01:54:30). |
| pre-reads | !periods | course pre-reads (lec04 00:45:52, WORD medium). |
| sync back | sink back; !sing back | "we'll sink back at 10.40" (lec04 01:34:03, 01:34:23) -> sync back, WORD medium. Likely also lec03 "We'll sing back at 10" (00:54:41). |
| fire a query | file a query | lec04 01:43:12. |
| ChatGPT | chat GPT | casing/join. |
| Atlassian | atlashan; atlaction | 14-day data-loss outage story (lec04 02:24:08). |
| Postgres | post-gree | lec04 02:41:17. |
| IOs | iOS | disk-IO context only (lec04 02:35:20). |
| RAM | ramp; !run | RAM-vs-disk sentences only (lec04 02:41:45). |
| constraints | constants | "relax some constants" (lec04 02:00:11, WORD medium). |
| (keep) vendor locking | vendor locking | teacher's form kept (real word); non-word "vendor lock and" -> vendor lock-in. |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try; tree; shared; link; code; section; slow; pocket; easy to; quick; up time; read through | lec04: all real words in context. Keep. |
| (flag only, undecided) | Dynamite; funder (funda?); simple max (simple math?); searches (surges?); AI (AOF?); app of integers; IDs (IDEs?); CCB (ElastiCache?); Spongebob (Pub/Sub?) | lec04 kept as `[?... \| asr: ...]` flags. |

### Added from lec05 (2026-10-13)

lec05 = Week 2 Day 1, spoken English: relational DBs / ACID, pessimistic locking (shared/exclusive, FOR UPDATE, SKIP LOCKED, NOWAIT, deadlocks), Golang airline check-in demo, KV store on MySQL (TTL, deletes, upsert, Redis expiry), Q&A (ORMs, JVM vs Go).

| Canonical | ASR forms seen | Notes / decision evidence |
|---|---|---|
| lock / locks / locked (DB locking) | !log; !logs; !logged; !login | AMBIGUOUS: -> lock(s) only in lock sentences ("shared log", "exclusive log", "acquired the log"; lec05 locking sections). Keep real logs (program output, "MySQL binlog"). "database login" flagged only. |
| skip locked / skip lock (`SKIP LOCKED`) | skip log; skip logged; skip block; keep locked; skip blocking | lec05 00:21-01:20, 02:48:48, 02:51:28. |
| for update / for share (SQL clauses) | four share; four update; forward date | lec05 01:15:44, 00:57:29, 02:47:35. |
| transaction | Transition; TransitionT1; !transition; !version | non-word "TransitionT1" -> transaction T1; "transition" only in DB-transaction sentences (lec05 01:17-01:18), else flag. |
| pessimistic lock / exclusive lock | pessimist slot; explosive lock | lec05 00:51:09, 01:08:20. |
| check-in (airline) | !checking | "airline checking system" -> check-in system (lec05 00:01:19, 00:26:04). |
| B+ tree | B plus 3; b plus three; b plus t | lec05 wrote "B+ tree" (as lec03). |
| semaphores | CMA purse | lec05 01:11:49. |
| upsert | absurd; absurd set; !upset; !an episode | upsert stretches only (lec05 01:55-02:02, 02:05:20, 02:29:24, 03:01:30). "an episode" flagged only. |
| expired at / created at (column names) | expired add; expired art; created add | written as spoken words, no underscores (lec05 01:44-01:49). |
| star (SQL `SELECT *`) | start | adds lec05 00:19:47, 02:06:50-02:07:29 to the lec04 "select star" row. |
| writes / write flow | !rights; !right flow | DB-write sentences only (lec05 00:55:55, 02:30:48). |
| TTL | DTL; ptl; !detail | expiry-clause context only (lec05 01:45:27, 02:03:20, 02:37:34). |
| disk-based | disk waste | lec05 02:08:02, 02:08:12. |
| shard | !shot | "within a shot" -> shard only in cross-shard context (lec05 02:42:06, medium); "one shot" stays. |
| batch delete / disk reads / commit | Badge delete; discreets; income | lec05 02:39:06, 02:47:13, 02:47:42 (medium). "bad job" (batch job?) flagged only. |
| database internals / Redis internals | database intervals; Reduce intervals | lec05 02:50:39, 03:12:19. "Redis interface" flagged only. |
| disk page | dispatch; display | lec05 02:50:17, 02:50:46 (medium). |
| Vert.x | Vertex | JVM toolkit vs Spring (lec05 02:58:40, medium - confirm). |
| top 1 1 (`SELECT TOP 1 1`) | top11; top 11 | student digits (lec05 03:01:46); teacher's "top one, one" kept as words. |
| lock wait timeout exceeded (MySQL error) | lock with time of exceeded; lock with timeout exceeded | lec05 03:04:59, 03:05:37 (medium). |
| where clause | very close | adds lec05 03:02:26 to the lec03 row. |
| blob | !block | lec05 01:40:57 (teacher says "blob" 01:40:33). "pick block" left `[unclear]`. |
| replace into (MySQL) / put | replacing to; !foot | lec05 01:58:08; "fire foot operations" -> put (01:52:11). |
| varchar | !worker; !where it; !where can | lec05: real words, flagged `[?varchar]` only (01:38:14-01:51:02). Non-word "where care/cat" (lec04) still corrects. |
| single node | !single load | flagged only (lec05 01:35:55, 02:03:09). |
| Raft / Paxos | draft; back source | consensus-algorithm list (lec05 01:34:24-01:34:29, medium). |
| ACID | !asset | "asset properties/guarantees" in DB-guarantee sentences (lec05 00:55:28, 02:40:41, 02:40:50). |
| JSON / JVM / MB / ORM | Jason; JBM; MP; ORF | lec05 01:38:37, 02:59:21, 02:59:25, 02:54:57. |
| FizzBuzz (Enterprise Edition) | FizBus; FIZZ, BUZZ | lec05 02:59:44. |
| C, C++ | c c plus plus; c cc++ | lec05 02:09:10 corrected; 01:19:39 flagged. |
| BookMyShow / KV API / goroutines / IOs | book my show; KvAPI; go routines; IOS | casing/joins (lec05). |
| semantic rejects (lec05) | read; part; shared; code; try; slow; easy to; quick; section; tree; pop up; rest; website; at least once | all real words in lec05 context. Keep. |

### Added for lec07 (2026-10-13, Pass 0b) — every term_scan.md row decided

Evidence = time of first hit / checked context in `raw_normalized.txt`. "AMB" = ambiguous: context rule, check every hit, never bulk-replace.

**A. Corrections (apply in every chunk)**

| # | Canonical | ASR forms (lec07) | AMB | Rule / evidence | Conf |
|---|---|---|---|---|---|
| 1 | cache / cache miss / distributed cache | cash; cash miss; distributed cash | AMB | All 62 lec07 hits checked are caching sentences (agenda "designing distributed cash" 00:01:05; "cash zero / cash two" 02:11; "cash miss ratio" 01:08:42). No money example in lec07 (bank analogy 01:59-02:05 uses "check"/"bribe", never "cash"). Correct per sentence; if a hit turns up outside caching, flag `[?cache \| asr: "cash"]`. | high |
| 2 | sink (CDC / ETL destination) | sync; SYNC | AMB | ONLY where it names the destination: 00:11:39 "sync databases", 00:11:47 "sync database", 00:14:10 "sync should always be a database", 00:14:12 "Kafka as a sync" (scan suggested "async": REJECTED), 00:14:18 "this is SYNC", 00:14:20 "SYNC can be Kafka, SQS, Kinesis", 02:43:48 "sync source", 03:05:15 "third kind of sync". Teacher says "data is a sink" correctly at 00:13:28. KEEP "data sync", "in/out of sync", "the sync between the two database" (00:16:58), "PG sync", "synchronize", "sync signal" (02:56:26, student, SIGABRT). 00:27:37 "or SYNC is JavaScript ... backend server is sending the event to your front end" -> flag `[?SSE \| asr: "SYNC"]` (SSE discussion), no correction. | high / flag |
| 3 | WAL / WAL file(s) / WAL directory / WAL logs | wall; vol file; WL logs | AMB | "wall" -> WAL only in CDC/WAL sentences (00:13:12 "It exposes wall file", 00:13:14, 00:20:10-00:20:33 student + teacher) - all lec07 hits are such. "vol file" 00:12:43-00:12:49 -> WAL file (medium). "WL logs" 02:44:12 -> WAL logs (medium). | high / medium |
| 4 | write-ahead log | write ahead log; right ahead lock | AMB | "write ahead log" -> hyphen (02:28:55, 02:45:03). "right ahead lock" (02:41:57, student CDC question) -> write-ahead log (TERM medium). | trivial / medium |
| 5 | writes | rights | AMB | 02:06:59 "Replica doesn't take rights" -> writes (high). 02:47:45 student "it's a paging rights" -> keep + `[unclear: "it's a paging rights"]`. All "right" / "right?" stay (write only in an explicit write sentence; none found besides #4). | high |
| 6 | lock / locks (concurrency, DB locking) | log; logs; log(s) in "shared/exclusive log" | AMB | -> lock(s) ONLY in locking stretches: optimistic-locking 01:42:03-01:45:10 ("optimistic that you don't need logs", "optimistic log" 01:43:27, "take logs", "don't need logs at all") and week-2 shared/exclusive lock Q&A 02:57:29-03:01:08 ("shared log(s)", "exclusive log(s)", "which row is getting which log", "that log got elevated", "transaction once log"). KEEP real logs: "commit log", "bin log", "log file" (00:12-00:29), "write ahead log", "login" (01:28:32 HTTP example). "red logs" 02:57:43 (student) -> flag `[?read locks \| asr: "red logs"]`. | high |
| 7 | change data capture / Change Data Capture | ChangeJataCapture; Chain data capture | | 00:12:49, 00:13:14; teacher defines "CDC stands for Change Data Capture" 00:10:48. | high |
| 8 | ETL and tiered storages | etla tier storages | | 00:01:11; teacher repeats "ETL and tiered storages" 00:02:45. | medium |
| 9 | Debezium | DBZM; DPZM | | CDC tools (00:10:59, 00:14:14, 00:14:30, 00:18:49, 00:18:56, 00:31:12); lec04 precedent. | high |
| 10 | Airbyte | AirBite | | Teacher's own form "Airbyte" at 00:10:59; AirBite 00:14:14-00:23:56. | high |
| 11 | Postgres / Elasticsearch / MySQL / NoSQL / gRPC | postgres; elastic search; my SQL; my sequel; mysql; no-sql; no SQL; GRPC; grpc | | casing/joins; "sequel" -> SQL only inside "my sequel" (00:16:29) -> MySQL. "PySQL" 03:01:37 ("plugin you can use with PySQL", Percona context) -> MySQL (TERM medium). | trivial / medium |
| 12 | Redis's | radius's | | 02:30:46 student routing question "in the radius's way of routing". | high |
| 13 | malloc / malloc'd | my lock; Nalloc; mallog; mallogged | AMB | ONLY in malloc sentences: 01:48:44 "you see my lock while you're allocating the Bloom filter", 01:48:49 "what Nalloc accepts", 02:39:05 "go to my lock my lock page", 02:39:19 "my lock doesn't return", 02:40:41 "mallogged ... mallog". "lock" elsewhere stays. | high |
| 14 | zmalloc | Zmela | | 01:49:35-01:49:47 Redis allocation wrapper ("Even this object allocation will be Zmela"); student at 00:53:23 proposes "our own wrapper around malloc". | medium |
| 15 | segfault | sec fault | | 02:39:19 student, malloc/heap context. | high |
| 16 | tcmalloc / jemalloc | TC malloc; J malloc | | 02:54:53 student list of mallocs. Keep "GNU malloc", "kmalloc", "U limits" as spoken. | medium |
| 17 | SIGABRT | SIG about | | 02:55:34 student. Bare "About" (02:56:05-02:56:27, "About is basically a signal") -> keep + `[?abort \| asr: "About"]` on first hit only. | medium |
| 18 | vCPU | VCU | | 02:52:59 "eight VCU CPU" -> "eight vCPU CPU" (only the token changes). | medium |
| 19 | hash map | has map | | 00:35:21, 00:35:45, 00:35:48 (student, hash table discussion). | high |
| 20 | consistent hash | consistent has | | 02:35:38 student; same student group says "consistent hash" 02:32:50. | medium |
| 21 | HyperLogLog | hyperlog blog | | 00:35:56 "set list bloom filter and hyperlog blog". | high |
| 22 | bloom filter | blue filter | | 00:51:32. | high |
| 23 | MB | MP | | 00:43:35 "one MP chunk every time you have one GB RAM". | high |
| 24 | eviction | erection | | 00:59:16 student "used for erection when the cache is sold" -> eviction; "sold" -> `[?full \| asr: "sold"]` (flag only). | high |
| 25 | LRU / LFU | LRE; LFE; "sell RU" / "sell a few" | AMB | eviction sentences only. 01:02:07 "LRU or LFE" -> LFU (high). 01:07:05 "LRE elephant" -> "LRU" + `[?LFU \| asr: "elephant"]`. 01:10:05-01:10:06 "When would you sell RU? When would you sell a few?" -> "use LRU" / "use LFU" (medium; teacher repeats "when would you use LRU" 01:10:15). 02:50:15 "LFU at LRE" -> "LFU at LRU" (token only, medium). 00:59:24 "LF in any case" -> flag `[?LFU \| asr: "LF"]`. | high / medium |
| 26 | clients | clans | | 01:29:51 "all Redis clans", 01:29:54 "Memcache has its own that all clans are the used to" (RESP / protocol context). | medium |
| 27 | semaphores | same offers; simupper | | 01:39:53 "mutex as same offers", 01:40:08 "mutex as a simupper" (lec05 precedent "CMA purse"). | medium |
| 28 | single node | single load | AMB | 01:39:08, 01:39:11 concurrency-on-one-machine; teacher says "single node" 01:38:55, 01:39:51. Elsewhere "load" stays. | medium |
| 29 | TCP | DTP | | 01:19:36 student answering "which communication protocol"; teacher continues with HTTP vs raw TCP. | medium |
| 30 | HTTP / HTTP/2 | H T T P; HTTP2 | | join / slash (01:25:44, 01:30:50). | trivial |
| 31 | connection pool | correction pool | | 03:03:50, connection-pooling Q&A (03:03:03). | high |
| 32 | virtual nodes / physical nodes | virtual notes; physical notes | AMB | 02:35:10 student; only in ring / node sentences ("notes" elsewhere = notes, e.g. 03:08:57 "I had notes prepared" stays). | high |
| 33 | AOF | AIF | | 02:28:57, 02:29:09; teacher says "AOF file format" 02:28:52 and "append only file". | high |
| 34 | blog | block | AMB | ONLY in the teacher's blog-publish example: 00:17:53 "every block published", 02:44:22 "every block publish" (same sentence says "you publish a blog"). KEEP "synchronize block in Java" (01:40:24), "memory block" (02:48:53). | medium |
| 35 | peon (bank analogy) | pune; PUNE | | Bank routing analogy 01:59:55-02:02:18: "the pune that is there on the door", "takes some commission", "point of contact", "There is no pune" -> peon (TERM medium). Not the city Pune. "The apparel says" 02:00:11 -> flag `[?peon \| asr: "apparel"]` only. | medium |
| 36 | storage engines | storage agents | | 03:05:39 "build two databases tomorrow on our own, our two storage agents"; week theme "storage engines" 00:00:06. | medium |
| 37 | Arpit | Arif | | 01:45:31 student opening "Arif, earlier we were discussing" (students address teacher as Arpit 00:28:45, 02:48:22, 02:50:24). WORD medium. Keep "ARPIT / A-R-P-I-T" at 01:25:05-01:25:07 (teacher's netcat example payload). "Hi, Arpit." 00:28:44 is DK speaking (see Speaker map). | medium |
| 38 | Rajiv | Raji | | 03:07:19 teacher call; next turn = STUDENT_3 (Rajiv elsewhere). | medium |
| 39 | sync back | sink back | | 01:50:35 "We'll sink back at 10.55" (lec04 precedent). | medium |
| 40 | pre-reads | periods | AMB | 02:13:40 "I've shared it in periods as well" (lec04 precedent). | medium |
| 41 | load balancer | load valancer; load-balancer | | 02:04:24; hyphen removed (02:06:13, 02:30:52). | high / trivial |
| 42 | key-value pair(s) / key-value store | key value pairs; key value store | | hyphen only when adjectival (00:34:01, 00:46:45, 01:34:40). | trivial |
| 43 | in-memory | in memory | AMB | hyphen only adjectival ("in-memory cache"); "it's in memory", "address in memory" stay. | trivial |
| 44 | trade-off / microservice / client-server / Big O | trade off; micro service; client server; big-O | | noun "trade-off" (verb stays); 02:12:12; 03:08:14 "client server model" -> client-server model; "big O of one" casing. | trivial |

**A2. Added for lec07 at Pass 5 (reconciled from chunk notes, 2026-10-13)** — all already applied in the chunks; grep of all corrected chunks found no leftover ASR form.

| # | Canonical | ASR forms (lec07) | AMB | Rule / evidence | Conf |
|---|---|---|---|---|---|
| 45 | consistent hashing | consistent dashing; consistent rushing; consistent touching; consider rushing; considered hashing | | non-words in consistent-hashing stretch 02:08-02:34 (teacher "Consistent hashing suffers from both" 02:33:22). Adds to row 20. | high |
| 46 | Redshift | threadshift | | 00:17:39; teacher "Let's say redshift" 00:17:09. "from a restaurant" 00:18:12 = flag only `[?Redshift \| asr: "restaurant"]` (real word). | medium |
| 47 | Airbyte | Airby | | 00:31:09; adds to row 10. | high |
| 48 | byte(s) | bite; bites | AMB | memory-size sentences only (00:41:42 "every single bite, every single bit", 00:47:30 "four bites"). | high |
| 49 | zmalloc / zfree | z malloc; Z malloc; Z free | | 00:53-00:55, 01:36:47; join; adds to row 14. | high |
| 50 | Redis's | Redisys | | 00:54:52 "Redisys code base"; adds to row 12. | high |
| 51 | linked list | linguist; Linguist | AMB | only in linked-list memory-overhead sentences 01:05:18-01:05:36 ("52,000 linked list" 01:05:44). "link list" stays (row B). | high |
| 52 | dive deep / stateless / tear down / TCP connection / evict | type deep, typing deep; state test; to go down; TCP collection; evite | | 01:13-01:22 (chunk_07); teacher "two-way tear down" 01:21:55. "protection system" 01:17:31 = flag `[?production]` only. | medium / high |
| 53 | hours | Rs ("9 plus Rs") | | 01:18:29 course length. | medium |
| 54 | compare and swap | component swap | | 01:43:17, 01:43:24. "comparison" (real word) 01:43:49 / 01:44:02 -> flag `[?compare and swap \| asr: "comparison"]` only. | high |
| 55 | C++ | c plus was; c plus plus | | 01:43:02 (medium), 02:39:25 (high); lec05 row "C, C++". | high / medium |
| 56 | optimistic locking | optimistic logging | | 01:42:00, 3 s before row A6 stretch; same explanation. Extends A6 start to 01:42:00. | high |
| 57 | network hop | network hog | | 02:05:21; teacher "add a network hop" 02:05:28. | high |
| 58 | data movement | data moments | | 02:10:45; teacher "does not do data movement" 02:12:48. | high |
| 59 | P2P networks / DHTs | B2B networks; dhds | | 02:25:23 DHT examples list ("BitTorrent, DHTs"); 02:24-02:26. | medium / high |
| 60 | malloc / segfaulted | Malak; sec faulted | | 02:46:55, 02:41:24 (adds to rows 13, 15). | high |
| 61 | SIGABRT | SIGABOT | | 02:56:41 (adds to row 17); "Singapore" 02:57:02 = flag only. | medium |
| 62 | virtual nodes | virtual loads | | 02:52:10-02:52:33 (adds to row 32). | high |
| 63 | repeatable read / cores | repeatable it; code | | 02:59:41 (teacher "repeatable read" 02:59:34); 02:53:18 "32 cores ... 31 cores". | medium / high |
| 64 | literal rows / worlds / sequential read / spin up / grand scheme / Here | literal rose; words; sequential lead; pin up; grind scheme; hear | | single WORD fixes 00:16-02:45 (see logs). | medium |

Decided flag-only (real words or unproven; keep flags, do not correct in later lectures without new evidence): `ETL` -> `[?TTL]` in "get, put, delete ETL" (00:32:14); `eps server` -> `[?API]` (02:46:11; the only "EPS" hit in lec07 - the "EPS (00:31:03)" line in Open questions has no hit at that time); `right` -> `[?write]` outside explicit write sentences (00:23:12, 02:06:57, 02:54:38); `cache file` -> `[?cache five]` (02:22:32-02:22:46, may be "cache one" - audio); `driver` -> `[?bribe]` (02:00:17); `caution` -> `[?question]` (02:02:24); `cashflow` -> `[unclear]` (00:42:25); `my value` kept lowercase as spoken (teacher's custom value type).

**B. Rejected / keep as spoken (real words in lec07 context — do NOT change)**

| ASR form (hits) | Suggested by scan | Decision / evidence |
|---|---|---|
| it / its (1009 + 8) | ID / IDs | REJECT. The scan matched English "it"/"its" case-insensitively; lec07 has no uppercase "IT"/"ITs" token (grep). |
| right (230) | write(s) | REJECT except row A4/A5. "right?" / "right." are tags. |
| part (66) | port | REJECT ("optimization part", "LFU part", "load part"). |
| by (50) | byte | REJECT ("captured by CDC"). Byte counts are already written as "bytes". |
| shared (42) | shard | REJECT ("shared by multiple threads", "I shared about consistent hashing", "shared lock(s)"). |
| read (39) | Redis | REJECT (verb: "papers i read"). |
| start (35) | star | REJECT (no SQL SELECT in lec07). |
| desk (30) | disk | REJECT: all hits are bank-desk analogy 02:00:50-02:03:41. |
| idea (25) | ID | REJECT. |
| try (22) | trie | REJECT. |
| happen / happened (16+8) | hyphen | REJECT. |
| code (15) | cohort | REJECT ("Redis source code"). |
| stuff (12) | stub | REJECT. |
| run (7) | RAM | REJECT ("Run it locally"). |
| detail (7) | TTL | REJECT ("go into detail"). |
| S3 / SQS | Amazon S3 / Amazon SQS | keep as spoken; never expand. |
| slow (5) | SLO | REJECT. |
| link (5) | Apache Flink | REJECT. "link list" (00:52:50, 01:02:59, 02:15:33) kept as spoken (teacher's/student's form); no change to "linked list". |
| FIFA (5) | FIFO | REJECT: "FIFA World Cup" / "FIFA pages" recency example 01:15:11-01:15:20. |
| where it / where can (5+2) | varchar | REJECT. |
| quick / QUICK (4+2) | QUIC | REJECT ("quick raise of hands"). |
| catch (4) | cache | REJECT ("catch up"). |
| a sync (2) | async | REJECT: 00:14:12 is "sink" (row A2); 02:56:26 "sync signal" kept. |
| blocking (2) / checking (2) / login (2) / website (1) / shot (1) / sharing (1) / version (1) | blog / check-in / lock / WebSocket / shard / sharding / transaction | REJECT: "It is not blocking", "if you are checking that out", "post slash login", "on my website", "in one shot", "was sharing that same thing", "its own version of protocol". |
| fan out (1) / event driven (1) | fan-out / event-driven | keep as spoken (verb; list item). |
| memcache (1) | Memcached | keep "Memcache" (teacher's spoken form; casing only). |
| foot (1) | put | REJECT put. 00:25:21 student "because of this uh foot patching would have solved like if they have batched" -> flag `[?batching \| asr: "foot patching"]`. |
| single load / rights / virtual notes | | see A rows (corrected). |
| CDC, BitTorrent, PHP, IoT, IPFS (+ "IPFS.io"), JavaScript, OS, GNU, CEO, BigQuery, MVP, RESP, XYZ, AOF, IO, CPU, UI, LinkedIn, Kademlia, Percona, netcat, Zoom, kmalloc, Kinesis, Kafka, Apache Spark | | real terms, keep (casing only). |
| "PG sync" (00:30:43, 00:30:54) | | keep as spoken (pgsync tool); no join. |
| "ARPIT" / "A-R-P-I-T" (01:25:05) | | teacher's example payload; keep. |

**C. Flag only (unknown, not guessed — see Open questions)**

`EBS ever` (00:10:37), `EKS` (01:19:16), `ETN` (01:38:35), `LH again example` (01:40:16), `ECB to SDB` (01:50:01), `used SQL rather` (00:27:52, SQS?), `lock it till June` (03:07:14, book?), `Computer, great week five day first` (00:00:00), `Very weird day` (00:10:56), `LF` / `elephant` / `sold` / `apparel` / `About` / `red logs` / `foot patching` / `SYNC is JavaScript` / `paging rights` (see rows above).

## Course-specific names (products, tools, people, companies the teacher uses)

| Canonical | ASR forms seen | Notes |
|---|---|---|
| (student names) | | Keep names exactly as ASR wrote them unless the same person is clearly spelled differently in the same chunk; if unsure, keep and add [check: name spelling]. Do not invent names. |
| Arpit | Arpit; Erfit | (lec02) students address the teacher as "Arpit" 4x - probably the teacher's name; also used in the teacher's own example. Never a label; label stays "Teacher". |
| Abhishek | | (lec02) addressed 3x (02:54:08, 03:11:56, 03:11:59); conflicts with "Arpit" - open question, keep as spoken. |
| lec02 student names | Pankaj, Ajay, Sunil, Jay, Vikram, Amrit/Amrik, Rajiv, Harsh ("harsh gone"), Sampat/Sampar, Summit (Sumit?), Jodhinder, Devasheesh, Matt, DP, Alex(a), Rahul, Alok | Attach to a label only for the turn right after the teacher calls the name (`Student 4 (Sunil)`); diarization labels mix people. |
| Arpit (lec03 forms) | Orpid; Apit; Arpeth | lec03: students address the teacher with these forms -> "Arpit" (WORD medium). |
| lec03 student names | Jay, Alok, Harsh, Rajiv ("rajin" flagged), Shriya, DK, Akshay (unclear who), Anupam, Simranath, Aditi, Mohit, Pankaj, Chathindar (= lec02 Jodhinder?) | Same attach rule. |
| Jeff Dean | Jeff Din; Jebdin | lec03 00:36 Google bit-flip story. |
| Sanjay Ghemawat | Ghimawat; Ghamawad; Ghaavar | Normalise only where a surname is in the ASR. |
| Arpit (lec04 forms) | arpit; Arpeth; Arpat | lec04: 5 direct addresses -> teacher is Arpit (WORD high). Settles lec02 "Arpit vs Abhishek" in favour of Arpit. |
| lec04 student names | Rahul, Shalimda [check], Jodhita / Jyothi [check], DK, Amrita ("Mirita's" flagged), Sandeep, Mohit, Shreya, Gaurav, Surya, Ajay, Rajiv, Nitin, Vishan [check], Anwar, Amrik Gaur [check], Deepak, Husha [check], Baba, Sankal [check] | Same attach rule (name only on the turn right after the call). |
| Redbus / Medium / Goldman Sachs / Stack Overflow / Atlassian / Redis Labs ("Redis lab" kept) | as written | companies/products in lec04 examples; casing only. |
| Hussain Nasser | Hussain Nasser | lec04 02:59:58 recommended video; probably YouTuber "Hussein Nasser" - kept as ASR wrote it (open question). |
| learn.relog.in | learn.relog.in; re-log | course learning portal URL (lec04 00:09:16); "re-log" (00:04:36) kept + `[check: name]`. |
| Arpit (lec05 forms) | Arpit; Arpej; Arpe; Apekt | lec05: "Arpej" (00:53:56), "Apekt" (02:25:51), "Arpe" (02:48:44) -> "Arpit" (WORD medium). |
| Abhishek / Avishek | Avishek | lec05 03:19:00 the teacher calls "Avishek" (a student) - confirms Abhishek is a student, not the teacher. Kept as ASR wrote + `[check: name spelling]`. |
| lec05 student names | Rahul, Rajiv, Anamol, Sampath, D Agrawal / "DPA", Avishek, Sandeep, Maverick, Devashish, Harsh, Amrik, Chandan, Aditi, Simran, Jodhinder, Ashish, Mohit, Pankaj, Sidesh, Ajay, Ashu, Prashant | Same attach rule. |
| Faker (library) / Golang / IRCTC / COVID portal / Apache Ignite / WhatsApp Web / Hacker News / Kotlin / Spring Boot / Django | as written | lec05 examples; casing only. Faker demo names kept as ASR wrote them. |
| lec07 student names | Rahul, DK, Rajiv (Raji), Hemant, Nitin, Gaurav, Shreya, Mohit, Anupam | Teacher calls: Rahul 00:20:03, 01:10:15; DK 00:28:42, 02:50:21; Rajiv 00:31:29, 00:58:14, 02:39:05, 03:07:19; Hemant 00:33:58; Nitin 00:42:49, 01:45:29, 02:32:47; Gaurav 00:45:47, 02:38:55, 02:48:09, 02:57:26; Shreya 01:04:03, 02:57:12, 03:04:32; Mohit 01:11:31; Anupam 01:50:15 (named, no turn). Same attach rule (name only on the turn right after the call). |
| Golang | GoLine | lec07 01:18:35 "Redis code walkthrough and implementation in GoLine" (teacher's Redis-internals course). TERM medium. |
| Percona / Kademlia / IPFS / BitTorrent / Wikipedia / Amazon / Zoom / Google Drive / Facebook | as written | lec07 examples; casing only. |
| Arpit Bhayani / arpitbhayani.me | Arpitbani; Arpitbani.me | lec07 02:21:38-02:21:40 "Arpitbani.me slash consistent hashing", "Google search Arpitbani consistent hashing" - very likely the teacher's full name / blog domain. Flag-only in lec07 (`[?arpitbhayani.me \| asr: "Arpitbani.me"]`); confirm with the board before correcting. |
| Jodhinder (lec02/05) = Jyotinder (lec07)? | Jyotinder; Chathindar; Jodhinder | lec07 00:47:49 "before I move to Jyotinder" - kept as ASR + `[check: name spelling]`. Project spelling still open. |
| Anubhav | Anubhaf | lec07 02:48:20 teacher call "Anubhaf, go on" -> "Anubhav" (WORD medium, project lec06 precedent 01:53:37); STUDENT_5 answers 02:48:22 ("Hey, Arpit") = Student 5 (Anubhav). |
| Grafana / Metabase / Tableau / Redshift / BigQuery / Google Analytics / Flask / Axios / Node.js / Spring Boot / Protobuf / Boost / Redis Sentinel / Kademlia / IRC / NFTs / Bitcoin | as written | lec07 examples; casing only. |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | |

## Speaker map

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 76% talk time, 180 words/turn, explains, runs class |
| STUDENT_1 … STUDENT_18 | Student N (keep the number, e.g. STUDENT_3 -> **Student 3:**) | short turns, questions, propose solutions when teacher asks. Diarization may be wrong: if a "STUDENT_n" line is clearly the teacher continuing an explanation (same thread, teacher-style, e.g. "okay so what X suggested..."), relabel to Teacher and log SPEAKER. If a TEACHER line is clearly a student question, use **Student?** (or the student number if evident) and log SPEAKER/SPLIT. |

Same teacher in lec02: TEACHER = Teacher (86.1% talk, 211 words/turn); STUDENT_1..STUDENT_17 -> Student n. Back-channel rule (lec02): a one-word "Correct."/"Right." under a STUDENT label inside that student's own explanation is often the teacher; relabel only with clear evidence (student asked "right?"), else leave.

Same teacher in lec03: TEACHER = Teacher (92.2% talk, 301 words/turn); STUDENT_1..STUDENT_10 -> Student n. Mixed labels in lec03: STUDENT_2 (Jay / Aditi / Chathindar?), STUDENT_3 (DK / Mohit / Pankaj), STUDENT_9 (teacher + students; decide per turn). Teacher name-calls often leak into the next student's segment ("Rajiv." / "Jay?") -> SPLIT to Teacher.

Same teacher in lec04, but diarization differs: TEACHER (45.1%) AND STUDENT_1 (43.6%) are BOTH the teacher (label split mid-sentence) -> relabel STUDENT_1 to Teacher, one SPEAKER log row per chunk. STUDENT_2..STUDENT_8 each mix several students and often begin with the teacher's lead-in ("great question amrita yeah so my question...") -> SPLIT. STUDENT_9 01:58:44-01:59:17 = teacher's battery/mic aside (`Teacher?`). STUDENT_10/11/14/15 = short interjections (`Student?` unless clear). Always check the speaker_stats for a split teacher before assuming TEACHER is the only teacher label.

Same teacher in lec05: TEACHER = Teacher (79.7% talk, 149.5 words/turn); STUDENT_N -> Student N. STUDENT_8 is mostly the teacher (poses questions, calls names, evaluates answers) -> relabel per turn with context (SPEAKER), else `Student?`. STUDENT_1 / STUDENT_2 / STUDENT_6 mix several students (teacher calls Sandeep/Ajay/Simran and STUDENT_1 answers) -> names only on the turn right after a call. Diarization boundaries often lag a speaker change by a phrase -> SPLIT at grammar boundaries.

### lec07 speaker map (FROZEN — this is the map for this lecture)

Evidence: speaker_stats.md + read 00:00-00:04 (start), 00:20-00:38 (first Q&A + brainstorm), 00:58-01:03 (~1 h), 01:49-01:59 (break / ~2 h), 02:30-03:11 (end Q&A). One teacher; no label split of the lec04 kind (TEACHER holds 83.3% talk time, 222 words/turn).

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 83.3% talk, 121 turns, 222.4 words/turn; opens class ("week five day first", agenda), runs brainstorms ("Raise your hands, I'll pull you in"), calls names, break + "see you folks tomorrow". Exceptions: 00:28:44 "Hi, Arpit." = DK greeting the teacher -> `Student 4 (DK)` (SPEAKER). |
| STUDENT_1 | Student 1 (Hemant on 00:34:00 / 02:34:43 turns) | answers right after "Yeah, Hemant?" 00:33:58; hash-table proposal 00:34-00:41; virtual-nodes question 02:34:43. MIXED with teacher: 00:35:53 "Now let me change the requirement a bit", 00:37:20 "I'm so loving how you are using the right term", 00:38:04 "How will you know what type the value is?", 00:38:18 "Perfect.", 00:38:48-00:39:00 "But why key? Why not value? ... imagine how will you store that", 00:41:21 "Brilliant point.", 01:57:26 "raise your hands quick raise of hands", 01:58:12 "Where would you store this?", 02:34:41 "Okay. Hemant." (teacher call) -> relabel Teacher per turn (SPEAKER/SPLIT). |
| STUDENT_2 | Student 2 (Nitin on turns after a "Nitin" call) | 00:21:59 cost-cut question; 00:43:23 after "Nitin, I'll throw a question"; 01:45:31 after "Nitin, go on" (addresses teacher "Arif"=Arpit); 02:32:50 after "Nitin?"; 02:52:47 single-threaded / malloc-limits explanation (long, real student content - keep Student). Teacher leaks: 00:26:11 "It's fine." (answer to own question?) -> `Student?` unless clear; 02:54:31 "Please, please, please." = teacher -> SPEAKER; 03:06:01-03:06:05 chat-upload suggestion is student. |
| STUDENT_3 | Student 3 (Rajiv on turns after a "Rajiv" call) | 00:58:16 after "Rajiv."; 02:39:19 after "rajiv go to my lock page"; 03:07:19 after "Raji". CDC questions 02:41:42-02:44:16. 00:58:16 "let's let's let's let's take it at the end" may be teacher deferring -> LOOP + `[check: speaker]`. |
| STUDENT_4 | Student 4 (DK on 00:28:45 / 02:50:24; Mohit on 01:11:36) | MIXES people: DK (after "DK, go on" 00:28:42 and "DK?" 02:50:21), Mohit (after "Mohit?" 01:11:31). Teacher leaks: 00:30:06 "Apache Spark solves that for you." and 00:30:34-00:30:35 "Key. Yes." -> Teacher/`Teacher?` (SPEAKER). 03:09:57 1:1 booking question. |
| STUDENT_5 | Student 5 (Anubhav on 02:48:22 turn only) | 00:50:14 memory-counter proposal (name not called -> plain Student 5); 02:30:42 routing question; 02:48:22 answers the teacher's "Anubhav, go on" 02:48:20 ("Hey, Arpit"). CORRECTED at Pass 5 (chunk_14): "Gaurav, go on" 02:48:09 is answered by Gaurav under the TEACHER label 02:48:12 -> Student 6 (Gaurav). |
| STUDENT_6 | Student 6 (Gaurav on 00:46:41 / 02:38:57 / 02:57:34 turns) | follows "Gaurav" calls 00:45:47, 02:38:55, 02:57:26; 03:03:03 PHP connection-pooling question. Back-channel "Correct." / "Go on." (00:47:09, 00:47:13) inside own answer may be teacher -> leave unless clear. |
| STUDENT_7 | Student 7 (Shreya on 01:04:36 / 03:04:33 turns) | LRU map+linked-list answer 01:02:22; after "Shreya?" 01:04:03 and 03:04:32 (CDC multi-sink question). |
| STUDENT_8 | Student 8 (Rahul) | 00:20:10 after "rahul go on" 00:20:03; 01:10:20 after "why Rahul when would you use LRU". 01:10:50 "see this is exactly where the thing is" = teacher taking over -> SPLIT. 00:38:33 "Hmm." back-channel. |
| STUDENT_9 | Teacher (mostly) — per turn | 14 turns, 5.7 words/turn, all teacher-style: 00:31:29 "Rajiv, I'll take your question", 00:36:39 "No, no, that is good. No, Java is good.", 00:51:47 "Because size of my value will give you this entire thing", 01:55:14-01:55:17 "Great. Mic speaker. Okay." (teacher's audio fix), 02:34:25 "you said you had few questions that's why i was waiting", 02:57:19 "Shreya? Shreya is gone.", 03:05:27 "Any other question anyone?". Relabel to Teacher (one SPEAKER log row per chunk). Short "Yes."/"Yeah."/"Okay."/"Works just fine."/"Thanks." under STUDENT_9: Teacher if it answers a student, else `Teacher?`. 02:56:02 "handle that signal then?" and 02:56:19-02:56:20 "I read it ... Instruction pipelines" = teacher reacting to Student 2 -> Teacher. |
| STUDENT_10 | Student? | 1 turn 01:16:03 "Wait, let me, do I have an example for that?" - could be teacher (`Teacher?`). Decide in chunk with context. |
| STUDENT_11 | Student? | 03:05:25 "Okay. Thank you.", 03:07:16 "thank you" - student thanks; keep as `Student?` (no number evidence). |
| STUDENT_12 | Student? | 00:31:27-00:31:28 "Yeah.", 01:19:33 "Yes, yeah.", 01:19:37 "Why?" (likely teacher probing "It's DTP" -> `Teacher?`). |
| STUDENT_16 | Student? | 01:19:36 "It's DTP." (-> "It's TCP.", row A29). |

Naming: Student N = label number (STUDENT_5 -> **Student 5:**). Add the name in parentheses ONLY on the turn right after the teacher's call (`Student 4 (DK)`). Diarization boundaries lag speaker changes by a phrase (lec05 pattern; e.g. 02:34:41 STUDENT_1 "Okay. Hemant." then Hemant's question) -> SPLIT at grammar boundaries.

## Known structure notes
- lec07 trouble zones:
  - 00:00:00 opening "Computer, great week five day first." - first words garbled -> `[unclear: "Computer"]`.
  - 00:20:03-00:31:30 first Q&A on CDC (many short STUDENT_2/4/9 turns; teacher leaks in student labels).
  - 00:33:53-00:41:21 hash-table brainstorm: teacher and Student 1 (Hemant) interleave under STUDENT_1 -> per-turn speaker fixes.
  - 00:58:16 #1046 LOOP "let's let's let's let's" (collapse, log LOOP; speaker check).
  - 01:19:25-01:21:11 protocol brainstorm with STUDENT_7/12/16 interjections (`Student?` labels).
  - 01:50:43-01:54:56 BREAK (teacher: "let's go on a break for five minutes ... sink back at 10.55"). Gap 202 s + 49 s. `[break ~01:50:43-01:54:56]` (not [missing]). #2040 "Thank you." 01:54:06 AFTER-GAP(202s) alone in silence -> remove, log HALLUCINATION. 01:54:59-01:55:17 speaker/mic fix = admin.
  - 01:59:41-02:05:04 bank analogy ("pune" = peon, row A35); #2169-#2170 "There is no pune." x2 = emphatic repeat -> keep both + `[check: possible ASR duplicate]`.
  - 02:38:55-02:57:30 malloc / OS memory side-discussion (STUDENT_2/3 long technical turns; malloc ASR forms row A13-A17).
  - 02:57:26-03:02:43 Student 6 (Gaurav) lec05 shared/exclusive-lock question: log->lock rule (A6); #3233 02:59:23 LOOP "it's it's it's it's" (collapse, log LOOP).
  - 03:05:34-03:05:49 teacher closes ("see you folks tomorrow morning. Bye-bye.") = real goodbye, keep. Then post-class chat 03:05:57-03:11:08 (chat-upload suggestion, new beginners course, 1:1 booking) = admin; 20 s gap 03:06:54-03:07:14; "so you can lock it till June" flagged. Tail 03:10:51-03:11:02 STUDENT_4 "okay/okay/so/okay" = real back-channel, keep.
  - REPEAT-SEG candidates (#500 00:28:29, #1282 01:11:11, #1332 01:13:03, #1602 01:29:01, #1933 01:46:14, #2061 01:55:57 "I'll give that answer / I'll give an answer", #2229 02:05:04, #2549 02:23:44, #3048 02:51:27, #3204 02:58:18, #3327 03:02:52, #3363 03:04:19): teacher repeats short lines for emphasis in this lecture - default keep + `[check: possible ASR duplicate]`; remove only if text is identical AND timing overlaps.
  - ~70 "Okay." / "Thanks." / "Thank you." PHRASE candidates are real back-channels / thanks in Q&A -> keep. RATE candidates (>7 w/s, e.g. 00:20:45, 00:32:42, 00:33:53, 02:38:17, 03:03:50) = fast speech, no removal.
  - No Devanagari / Hindi stretches seen; romanization rules practically unused.

- 01:38:25–01:44:37: break (teacher: "see you folks at 10 45"). Mark as admin, add `[break ~01:38:25-01:44:37]`, not [missing]. (lec01 carry-over - NOT lec07: in lec07 that stretch is continuous teaching on concurrency / optimistic locking.)
- Class opens with teacher discussing feedback from students (admin) then topics: scaling, concurrency, delegation, communication.
- lec05: break 01:27:55-01:33:13 (`[break ...]`, "Thank you." at 01:33:13 removed as HALLUCINATION); live Go demo 00:27-01:08 (program output read aloud); final Q&A 02:36:55-03:21:42.

## Open questions

- lec02: "web software" = WebSocket? (5 flags); "two links" = toolings? (4 flags); teacher name Arpit vs Abhishek; "OCS streaming" (02:39:04); "Daryl Abu Devi" (00:52:30, DynamoDB?); live-streaming product "randomized / come my documentation" (02:48:29).
- lec03: "SPS" (00:18:26); "64 bits in TV" (01:37:43); "lighting services" (01:43:26); "Charlotte partitioned" (02:00:10, sharded?); "of Atilla" / "two words back" (01:36); "fifth thing" = fifth week? (02:27:42-02:28:04); "local eat" (02:24:53); "We'll sing back at 10" (00:54:41); "2-264" = 2^64? (01:09:36); "round robin port" (01:28:15); "forex/forexes" = 4X? (01:18:57); "nextval" (02:12-02:20); "M1 happened" = M1 hyphen? (00:23:09, 00:24:15); who is "Akshay" (02:21:02).
- lec04: "re-log" (00:04:36, course platform?); "AOSN" (00:07:37); "Spongebob" (01:00:46, Pub/Sub?); "ArrowDB" (01:00:52); "CCB" (00:56:43, ElastiCache?); "DataWare" (02:07:32); "DVO" (02:47:19); "DBI" (02:53:03); "ECD" (02:59:47); "HTTP is TC" (03:05:23, cut off); "Hussain Nasser" spelling; "vendor locking" vs "vendor lock-in".
- lec05: "RANDUP" (00:39:57, Go `rand`?); "SSCs" (00:26:48, SSEs? also lec02 03:05:25 "SSC"); "commit blog" (02:35:35, Postgres commit log?); "TrustMeet" (01:20:11); "rapid time" (03:21:00, RabbitMQ?); "database login" (01:07:23); "for a bit" (01:21:15, for update?); "discalpe" (02:20:26, disk IO?); "copyright type" / "IKT" (01:39:54-01:40:03, value column types); "bad job" (batch job?); Vert.x (02:58:40) to confirm.
- lec07 (flag in transcript, do not guess):
  1. "EBS ever" 00:10:37 "Then we rely on EBS ever to push events to Kafka" (APIs / API servers?) -> `[unclear: "EBS ever"]`.
  2. "EKS" 01:19:16 "Which communication protocol, what kind of EKS would you use" (APIs?) -> `[unclear: "EKS"]`.
  3. "ETN" 01:38:35 "additional data structures to implement ETN" (TTL / expiration?) -> `[?TTL | asr: "ETN"]`.
  4. "LH again example" 01:40:16 (airline check-in example? said at 01:39:27) -> `[unclear: "LH again example"]`.
  5. "ECB to SDB" 01:50:01 student netcat question -> `[unclear: "ECB to SDB"]`.
  6. "used SQL rather because Kafka is expensive" 00:27:52 student (SQS?) -> `[?SQS | asr: "SQL"]`.
  7. "so you can lock it till June" 03:07:14 (book? 1:1 slots context 03:10:04) -> `[?book | asr: "lock"]`.
  8. "Computer, great week five day first" 00:00:00 -> `[unclear: "Computer"]`.
  9. "Very weird day" 00:10:56 (weird name?) -> keep + `[check: ...]`.
  10. "apparel" 02:00:11 (peon?), "elephant" 01:07:05 (LFU?), "LF" 00:59:24 (LFU?), "sold" 00:59:16 (full?), "About" 02:56:05 (abort/SIGABRT?), "red logs" 02:57:43 (read locks?), "foot patching" 00:25:21 (batching?), "SYNC is JavaScript" 00:27:37 (SSE?), "paging rights" 02:47:45 - flagged per rows A2/A5/A6/A17/A24/A25/A35/B.
  11. Medium-confidence decisions to confirm with the board (lecture-board-reader): Zmela -> zmalloc, pune -> peon, PySQL -> MySQL, GoLine -> Golang, storage agents -> storage engines, LRE -> LRU.
- Unknown acronyms as ASR wrote them: GCVM (00:29:35), EPS (00:31:03), MPT (00:38:25), FII (02:28:21), SSC (03:05:25), ACT (02:48:44), STD (02:06:45). Keep as-is with [?term | asr: "..."] if they don't make sense in context.
