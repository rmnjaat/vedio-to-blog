# Term decisions — project (lec01; lec02 rows added 2026-10-12; lec03, lec04, lec05, lec06, lec07, lec08, lec09, lec10 rows added 2026-10-13)

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

### Added from lec06 (2026-10-13)

lec06 = Week 4 Day 2, spoken English (no Hindi seen): how images are served (static folder, S3 proxy route), on-the-fly images (GitHub/DiceDB OG image, Twitter example), designing Gravatar (users/photos schema, hash of email, is active vs active photo ID, transactions, CDN in front of api), on-demand image optimization (PIL, ImageMagick), Q&A, break, tagging people in photos (requirements / product hat, ML team dependency, RBAC, LTRB coordinates), newly unread message indicator (Redis set per user, auxiliary Redis, write path), resources Q&A.

Every term_scan.md row decided below. The scan matches case-insensitively, so the large counts for `IT`, `right`, `read`, `by`, `part` are almost all ordinary words.

| Canonical | ASR forms seen | Decision for lec06 (evidence) |
|---|---|---|
| (REJECTED) ID / IDs | IT (755); ITs (3) | All 755 hits are the pronoun "it"; there is NO upper-case "IT" token in lec06 (grep). "ITs" = "its" ("manages its own app"). Never change. "ID" is already written correctly everywhere ("email ID", "user ID", "photo ID"). |
| (REJECTED) ID | idea (7); ideas (2) | "no idea what's happening", "the idea of Gravatar", "product ideas" - real words. Keep. |
| write(s) | !right (234); !rights (2) | AMBIGUOUS. -> "write" ONLY in "right path" (write path, unread-indicator section 02:27:45, 02:32:21, 02:32:53, 02:48:06 "read before right") and "read before right" (02:48:06) and "All the rights / n-1 rights" (02:39:22-02:39:23, auxiliary-Redis write load) -> writes. Every "Right?"/"right" tag, "right hand side", "right thing" stays. 00:24:37 "right cash on the CDNs" = leave "right" as is (could be tag or "write"). TERM medium per hit. |
| (REJECTED) port | part (54) | No port-number context ("part of this HTTP request", "part of a backend code"). Never change. "localhost 5000" is handled in its own row. |
| (REJECTED) byte | by (48) | "sort it by", "by doing this" etc. "bytes" is already written correctly when meant. Keep. |
| (REJECTED) Redis | read (46) | "read image", "read the file", "read messages", "read path" - all the verb/noun read. Keep. |
| Redis | radius (8); redis | radius -> Redis in every lec06 hit: all are inside the unread-indicator / auxiliary-Redis discussion (02:44:11 "auxiliary radius", 02:48:06, 02:55:29 "radius cluster", 02:55:32). TERM high. Lower-case "redis" -> "Redis" (casing). |
| (REJECTED) trie | try (28); tree (4) | "try to hunt that same path", "evaluation tree" (query evaluation, 01:21-01:22) - real words. Keep. |
| S3 | S3 (25); !SP | Keep "S3" as spoken; do NOT expand to "Amazon S3". 01:18:57 "goes to SP, gets the image" -> S3 (TERM medium; same flow said with "S3" at 01:05:40, 00:13:28). |
| star (SQL `SELECT *`) | start (in "select start"/"select your start"/"select a star") | -> "select star" ONLY after "select" (00:37:18, 00:38:04 "Select your start" -> keep "your", change start->star, 01:05:36, 01:19:32, 01:31:16 "select start from users"). All other "start" (start rendering, start with) stays. TERM high. |
| (REJECTED) hyphen | happen (17); happened (4) | "what would happen?", "what happened" - real words, no ID-format dictation in lec06. Keep. |
| (REJECTED) shard | shared (14); shot (2) | "shared the link", "was shared", "in one shot" - no sharding in lec06. Keep. |
| (REJECTED) sharding | sharing (5) | "image sharing platform", "social sharing stuff" - correct. Keep. |
| (REJECTED) cohort | code (12) | "PNG decoder code", "piece of code" - correct. "cohort" is already said correctly (00:05:28, 01:06:33). Keep. |
| Arpit (teacher) / arpit (email example) | arpit (8) | 00:28:20-00:28:22 "arpit.gmail.com" = the teacher's example email: keep as spoken (lower case, ASR form, do not fix to "arpit@gmail.com"). Direct addresses "Arpit" (01:03:21, 01:19:15, 02:13:34, 02:55:29) are correct - teacher is Arpit (lec04/lec05 decision). |
| (REJECTED) QUIC | quick (8); QUICK | "very quick", "quick break" - real word. Keep. |
| (REJECTED) check-in | checking (8) | "Checking the result", tagging "checks" - no airline. Keep. |
| (REJECTED) stub | stuff (7) | "social sharing stuff", "a lot of stuff" - real word. Keep. |
| in-memory | in memory (6) | hyphen only when adjectival ("in-memory bytes" already present); predicate stays. |
| (REJECTED) RAM | run (5) | "run only when", "run the explain statement", "run on massive servers" - verb. Keep. |
| (REJECTED) disk page | display (5) | "need to display that email ID" - real word. Keep. |
| (REJECTED) QUIC/session/SLO/EC2/Flink | section; slow; easy to; link | "cross section", "pathetically slow", "very easy to guess", "shared the link" - real words. Keep. |
| (REJECTED) TTL | detail (4) | "implementation detail", "one detail I might have missed" - real. Keep. |
| TTL | TDL | 01:22:45 student: "we are not depending on the TDL here" (CDN cache-invalidation question) -> TTL. TERM high (non-word + caching context). |
| WebSocket | web socket (4) | -> "WebSocket" (02:28:48, 02:50:13). Log each join as TERM (verifier counts joins). |
| (REJECTED) lock | log; login; logged | "log into Gravatar", "login me arpit.gmail.com", "logged into Gravatar", "log into your production console" - real. Keep. |
| select star | select start (4) | see star row above. |
| trade-off | trade off (4) | noun only (02:37:40, 02:37:50) - already hyphenated in places; casing/hyphen trivial. |
| (REJECTED) Apache Flink | link (3) | "shared the link", "Twitter link". Keep. |
| CDN | CDM (3) | 00:14:38 "I'm not designing a new CDM", 01:13:26 "serve from the CDM", 01:13:42 "leverage CDM" -> CDN. TERM high (non-word in CDN stretch; "CDN" said 70x). |
| timestamp | time stamp (3); time step | Project rule (lec02): "time stamp" kept as ASR wrote it (casing only, no join). "time step" (02:09:08, student, "message ... and a time step") -> "time stamp" WORD medium (said "time stamp" 30 s earlier, 02:08:39). |
| fan-out | fan out (3) | noun "high degree of fan out" -> fan-out (trivial). |
| key-value store | key value store; key value; key value database | hyphenate adjectival ("key-value store", "key-value database"); student's list "a document, key value," -> "key-value" (trivial). |
| (REJECTED) varchar | where it (3) | "where it is like" - real. Keep. |
| SQS | SQS (2) | keep as spoken; do NOT expand to "Amazon SQS". |
| iOS | IOS; ios | 00:07:31 "ios app", "android os ios thing" = Apple iOS (platform list) -> "iOS" (casing). NOT "IOs". |
| autoscaling | auto scaling (01:30:24) | -> "autoscaling" (project style). |
| cache | !cash (2 counted, 1 hit) | 00:24:37 "right cash on the CDNs" -> "cache on the CDNs" (TERM medium: CDN-caching sentence; "right" untouched). Only hit. |
| (REJECTED) endpoint | and point | 01:52:13 "go into those details and point them" - real words. Keep. "API endpoint" already correct (01:09:18). |
| (REJECTED) session | section (2) | "16 cross section" keep. |
| (REJECTED) transaction | version (2) | "byte serialized version", "templatized version" - real. Keep. |
| FYI | FII; fii | 02:16:15 "And FII just to clear out, you will create an index" -> FYI (project tic, TERM medium). |
| (REJECTED) Pub/Sub | pop-up; pop up | "pop up that notification" - UI pop-up. Keep. |
| (REJECTED) WebSocket | website | "go to any website" - real. Keep. |
| async | a sync; !a synchronous | AMBIGUOUS, meaning flips. 01:29:29 "when you do a sync, this is what we talk about image processing synchronous" and 01:28:05 "this is a synchronous request" / 01:55:12-01:55:31 "synchronous dependency" (ML-team API) -> do NOT change; flag `[?async \| asr: "a sync"]` only at 01:29:29. "a synchronous" stays as written (sync dependency is plausible). |
| (REJECTED) blob | block | "building block" - real. Keep. |
| blogs | !blocks | 02:54:22 "that typically blocks overlook" -> blogs (WORD medium: parallel to "typically videos overlook" and "not some blogs or videos" at 02:54:11). Only this hit. 01:28:45 "the shortest blog i've read" already correct. |
| (REJECTED) microservice | Microsoft | "Twitter or Gmail or Microsoft ... account" - company. Keep. |
| pre-reads | !periods | 02:41:01 "I will share the periods for the next week" -> pre-reads (WORD medium, lec04 precedent 00:45:52). |
| (REJECTED) service | surface | "scratch the surface". Keep. |
| Gravatar / gravatar.com | Gravita; gravita.com; gravata; gravata.com | -> "Gravatar" / "gravatar.com" (also "api.gravatar.com"). TERM high: the teacher says "Gravatar"/"gravatar.com" correctly in the same stretch (00:27:54-00:28:01, 00:30:29, 01:23:29); "Gravita" is how the ASR renders the same word. Applies to student turns too (00:33:32, 00:33:36). One log row per segment group. |
| Kinesis | kindnesses | 00:05:17 "club kindnesses or Kafka with SQS" -> Kinesis (TERM medium; lec01 "kinases" -> Kinesis, same Kafka/Kinesis pairing). |
| RabbitMQ | EBITMQ | 00:05:17 "SQS or EBITMQ" -> RabbitMQ (TERM medium; non-word, message-broker list). |
| IMG tag | AMG tag | 00:08:33 -> "IMG tag" (TERM high; "IMG tag"/"IMG SRC" said 6x around it). |
| CDN | CD | 01:18:57 "sends it to the CD." -> flag `[?CDN \| asr: "CD"]` only (could be cut-off). |
| DiceDB | dies DP | 00:19:40 "become a contributor and dies DP" -> "DiceDB" (TERM medium; teacher's DiceDB repo shown 00:16:40-00:17:43). |
| OG image | OZ image | 00:24:09 "the OZ image that is generates" -> "OG image" (TERM medium; Open Graph / "OG image" explained 00:18:14-00:21:15). |
| Spring Boot | Springboard | 00:10:35 "Configure this on Springboard" (list: NGINX, Flask, Django) -> Spring Boot (TERM medium; lec05 Spring Boot). |
| localhost:5000 | local as 5000 | 00:14:21 "HTTP call a slash, slash local as 5000 slash raw" -> keep words, write "localhost 5000" (TERM medium). "a slash, slash" stays as spoken. |
| nginx | NGINX | lowercase per project rule (00:10:33). |
| ImageMagick | image magic | 01:28:45 "we use image magic library" -> ImageMagick (TERM high; ImageMagick named 4x at 01:25:35-01:25:56). |
| ML team | MLT | 01:55:52 "coming from your MLT" -> "ML team" (TERM medium; "ML team" at 01:55:01, 01:55:21). |
| API call | a ZPI call | 02:33:21 "you making a ZPI call to get the unread messages" -> "an API call" (TERM medium; "an API" heard as "a ZPI"; one log row with Original "a ZPI call"). |
| read-heavy | readavis | 01:01:29 "This is a readavis system" -> "read-heavy" (TERM high, non-word; student explaining why to store active photo ID in users table). |
| photos table | photo stable | 01:04:53, 01:07:58 -> "photos table" (WORD high, re-spacing; "photos table" said elsewhere). |
| is active | !adjective; !ejective; activist | AMBIGUOUS. 00:36:41 "filter it via adjective" -> "is active" (TERM medium, the is_active filter just discussed). 00:49:56 "is activist true" -> "is active is true" (TERM medium, echoes student at 00:49:49). 01:00:09 "on ejective two" -> flag `[?is active true \| asr: "ejective two"]`. Write as spoken words "is active", no underscore (lec05 column-name style). |
| hash / hashing | !has; hasing | AMBIGUOUS. "has" -> "hash" ONLY where a hash value/column is clearly meant: "which is coming as has equal to" (00:38:12), "we have to have a has stored" (00:38:27), "user that has equal to" (00:43:02), "user has equal to user ID" (00:59:10), "get that the has now out of those has" (00:41:16), "where has what we have provided" (00:57:09), "where user has is this" (00:57:40). TERM medium each. Every verb "has" stays. "hasing" -> "hashing" (non-word, high). |
| last read time / last read at | last red time | 02:09:13, 02:09:19 -> "last read time" (WORD high; "last read time" said 02:07:59, "last read at" 02:12:37). |
| Open Graph | open graph | casing "Open Graph protocol" (00:18:14). |
| PIL / Python Imaging Library | PIL; Python image library | keep "PIL" and the teacher's spoken "Python image library" as spoken (do not fix to "Imaging"). |
| HTTP GET | HTTP get | casing at 00:08:21-00:08:25 ("HTTP get to this") -> "HTTP GET". |
| arpitbhayani.me (?) | arvizhany.me | 00:10:11 teacher's example domain. Probably the teacher's own site, but not confirmed in audio -> keep ASR form + `[?arpitbhayani.me \| asr: "arvizhany.me"]`. See Open questions. |
| https | hdps | 00:29:21 "hdps colon slash slash" -> "https" (TERM high; "https colon slash" said 00:29:05). |
| TIFF (?) | TAPE | 00:09:32 "PNG, JPG, TAPE, SVG" -> flag `[?TIFF \| asr: "TAPE"]` ("tiff has a header" at 00:09:05). Not corrected. |
| UJR | UJR | 00:58:36 student "UJR has equal." -> `[unclear: "UJR has equal"]` (maybe "user hash equal"). |
| LTRB / RBAC / MD5 / XYZ / ML / IO / UI / PNG / JPG / SVG / HTML / SRC / GET / CPU / GitHub / LinkedIn / Twitter / Facebook / Instagram | as written | correct as spoken (LTRB defined by teacher 02:01:00; RBAC 02:01:39). Casing only. |
| CDEFG / "B maps to see" | CDEFG; see | 02:43:28-02:43:35 student lists set members B, C, D, E, F, G -> keep "CDEFG"; "B maps to see" -> "B maps to C" (WORD medium; set-member letters, "B to C" said 02:45:10). |
| EAFD 172 | zero EAFD 172 | hash digits read out (00:29:21) - keep as spoken. |
| DK / DP / AM / SP / OZ / ZPI | | DK = student name (see names); "9 AM to 10 30 AM" = time; others decided in rows above. |
| poet.so | poet.so | real tool (tweet-to-image), 00:24:05. Keep. |
| 15th cohort | "15th cohort of bike" | 01:06:33 - "of bike" unclear -> `[unclear: "of bike"]`. |
| semantic rejects (lec06) | read; part; try; tree; shared; code; quick; checking; stuff; display; sharing; detail; log; login; section; version; website; block; surface; slow; easy to; Microsoft; happen; idea | all real words in lec06 context. Keep. |

#### lec06 Pass 5 additions (lead reconciliation of chunk notes)

| Canonical | ASR forms seen | Decision for lec06 (evidence) |
|---|---|---|
| ImageMagick | image magic | extends the row above: also 00:22:46 (chunk_02), 00:25:47 (chunk_03). TERM high. |
| Gravatar | gaveta; api.gaveta.com | extends the Gravatar row (01:11:04, 01:11:08, TERM medium). "apatradar.com" (01:18:51) stays flagged `[?api.gravatar.com]`. |
| Bannerbear | banner bear | 00:23:42 image-generation API for on-the-fly social images (TERM medium, lead). |
| rows | !roads; !rose | table-row sentences only (00:41:24, 01:14:46, WORD medium). |
| where clause | wear class; !word class | "wear class" corrected (00:41:31, non-word in query). "word class" (00:57:30) = real words -> stays flagged `[?where clause]`. |
| join / join criteria / join key | joint; joints | DB join context (01:20:24-01:22:12), project "joints -> joins" row. |
| predicate pushdown (?) | predicate pushed up; predict | flag only (01:21:50-01:21:54): "pushed up" may be what was said. |
| on-demand (image optimization) | all demand | 01:23:16, 01:23:34 (teacher says "on demand" 01:23:23). |
| tiny int | tiny end | 01:32:48 (TERM high; "tiny int" 01:32:15). |
| last read time / last read at | last thread time; last red ad | extends the row above (02:08:13, 02:11:36, 02:13:18). |
| to (messages-table column) | !two | only where the from/to column is clearly meant (02:13:18-02:17:14, WORD medium); garbled run 02:16:56-02:17:05 kept + `[check]`. |
| on message unsent (event / Kafka topic) | on message and send; on message and sent; unsend | 02:30:22-02:32:27, 02:49:57. Teacher's own name "on message unsent" (02:31:22). |
| brittle | !little | only in the catchphrase "the most brittle component" (02:33:42; said 02:36:50, 02:39:40). |
| unique users count | unique user scout | 02:12:25 re-spacing. |
| write(s) | !right | extends the write row: 02:39:20 "No right would happen" and 02:46:26 "one right succeeds, other right fails" -> write (lead, TERM medium). STILL FLAGGED only: 02:43:09, 02:44:30 (x2), 02:45:56-57 "right field" (write failed?), 02:48:13. |
| image | !email | IMG-tag context only (00:11:53 corrected). 01:55:21 "on the email" stays flagged `[?image]`. "email ID" everywhere else is correct. |
| forks | !folks | GitHub repo stats only (00:17:47). |
| local disk | !local test | 00:12:56 ("local disk" said 00:13:40). |
| side | !site | teacher's phrase "one point from your side" (01:52:21). |
| O(1) (?) | over; over and over | flag only (02:22:55, 02:23:26). |
| count (?) | account | flag only (02:46:13, 02:50:58 unread count). |
| log n (?) | login | flag only (00:46:58, complexity sentence). |
| hash (?) | has (00:38:51 "Has ID"; 00:58:56, 00:59:14 "user has") | flag only; outside the decided hash list. |
| Beauty and the Beast | beauty in the beast | teacher's analogy (02:48:41); "car" left unclear. |
| Voldemort / Deathly Hallows (?) | world emote; deathly halos | Harry Potter aside (02:37:00) - flag only. |
| source of trust | source of trust | 02:30:45, 02:31:10 kept as spoken (teacher said "source of truth" earlier); not changed. |

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

### Added from lec08 (2026-10-13) — every term_scan.md row + unknown-token table + Pass 5 reconciliation

lec08 = Week 3 Day 1, spoken English (very little Hindi): feedback/admin (00:00-00:09), approaching distributed systems
(day zero architecture, horizontal scalability), load-balancing algorithms (round robin, least connections), live Go
load-balancer code walkthrough (~00:42-01:08), LB design brainstorm (config store, health checks, orchestrator,
reactive config push via Redis Pub/Sub, monitoring, scaling LB servers, CoreDNS), break, remote/distributed locks
(threads -> processes -> machines, dpkg lock, hypothetical unsafe queue, Redis SET NX + TTL + Lua, Redlock, Chubby,
Kleppmann critique), Q&A on locks and LB (sessions, CoreDNS HA, orchestrator HA, Prometheus, health-check endpoint).

**Non-ambiguous rows -> canonical form (apply everywhere):**

| Canonical | ASR forms (lec08) | Decision / evidence |
|---|---|---|
| load balancer | load-balancer; load balance (noun); load valancer; low balances (-> load balancers) | noun only: "when we design load balance" 00:13:46 -> load balancer; "load valancer does not have..." 00:31:24; "low balances" 03:12:54. Verb "load balance"/"load balancing" stays. |
| LB / LB server(s) | LV; LP; LD | LB-server context everywhere (00:58:57 "LV server listing on port 9090", 01:31:57 "one LP server", 01:00:48 "LD server creating a TCP connection"; "LB server" said correctly 75x). TERM high. |
| in-memory | in memory | hyphen only adjectival ("in-memory copy/state"); "store it in memory" stays. |
| round robin | round-robin | keep teacher's spoken noun "round robin"; hyphen only if adjectival ("round-robin fashion"). |
| autoscaling | auto scaling; auto-scaling | join (log each join TERM, verifier sees drop+add): "auto-scaling policy" 00:15:55, "auto scaling policies" 03:33:17. |
| ZooKeeper | zookeeper; Zookeeper; zoociper | casing; "zoociper" 03:00:46 -> ZooKeeper (same student, same sentence thread). |
| distributed system(s) | distribute system(s); Distribute Systems | WORD medium (lec04 rule), e.g. 00:00:31, 00:12:04, 00:16:19. "distribute locks" 02:05:09 -> distributed locks, same rule. |
| transaction | transition; Transition | "distributed transition things break" 00:11:48; "this transition so wait so the transaction would wait" 02:44:28. TERM high. |
| queue / queues / message queue | Q; Q's; message Q; cube | All hits are the hypothetical-queue stretch (02:18:46, 02:37:47, 03:04-03:05). "cube" 02:42:24 ("get the values from the cube") -> queue, TERM medium. |
| MySQL | my SQL | 02:39:06 "your problem is my SQL" -> MySQL (student just asked "can't we use a MySQL system"). |
| Pub/Sub | pub sub; pub-sub; pubs up; PubServe; pub server | "real-time pub sub" 01:27:59, "real time pubs up" 01:52:40, "Redis PubServe" 03:01:25, "Redis as pub server" 03:13:46 -> Pub/Sub. |
| WebSocket | web socket | 00:52:49, 00:53:10. |
| goroutine(s) | go routine(s) | Go code walkthrough 01:01:54, 01:06:58, 01:07:01. |
| key-value store | key value store; key-value | adjectival hyphen; "This is the key value." 01:33:37 stays as spoken (no "store"). |
| multi-master | multi master | 02:29:30. |
| trade-off | trade off | noun 01:26:32. |
| microservice | micro service | 01:51:50. |
| leader-follower | leader follower | 03:16:22 (adjectival). |
| time-series database | time series database | 03:23:28. |
| leader election | literary election | 03:16:35, 03:35:39 (teacher says "This is a leader election" 03:34:30). TERM high. |
| Slack's | slacks | 01:27:45 "slacks real-time communication". |
| airline check-in system | airline checking system; airline jengen system | 02:06:30; 02:05:42 "airline jengen system" (WORD medium; same story as lec05). |
| REST / gRPC | rest (API); GRPC | "rest API calls" 01:05:46, "anywhere rest" 01:05:54, "just a rest API" 01:14:51 -> REST. "rest of them" 03:16:19 stays. GRPC 00:35:14 -> gRPC. |
| HTTP/2 | HTTP to | 00:35:14 "gRPC ... works on top of HTTP to the connection never terminates" -> HTTP/2 (gRPC runs on HTTP/2), TERM medium. |
| HTTP | HTP; HEDP; STTP | 00:39:29 "normal HTP web servers", 01:06:07 "It may send HEDP, it may send RPC calls", 03:31:03 "make STTP request ... 200" -> HTTP, TERM high. |
| CPU | CP | 00:32:28 "check the CP usage" -> CPU usage, TERM high. |
| FYI | FII | 01:36:45 teacher tic (lec03 row). |
| connection / connection pool | correction(s); correction pool | 00:30:18, 00:33:56, 00:34:03 ("correction pool of let's say a hundred" -> connection pool), 00:53:42 ("TCP correction") -> TERM high. |
| least connection(s) | lease connection(s) | algorithm name: 00:35:45, 03:12:05 -> least connection(s), TERM high. |
| health check / health check endpoint / health endpoint | hell check; LCHIC (endpoint); helitine point | 01:13:47, 01:25:45 "hell check" -> health check; 01:15:54 "specialized LCHIC endpoint" -> health check endpoint (medium); 03:32:31 "exposing a helitine point" -> health endpoint (medium). |
| heartbeats | hardbeats | 03:32:30. |
| backend server | bacon server | 03:22:29 (student), WORD high. |
| worker nodes | worker notes | 03:35:39 "adds more worker notes" -> worker nodes, TERM medium. |
| CoreDNS | core DNS; code DNS; Code DNS | Product: teacher names "open source project called CoreDNS" 01:45:15. All "core DNS"/"code DNS" in the DNS sections (01:45-01:59, 03:11-03:19) -> CoreDNS. "code DNS codeways 50 lines of code" 03:12:44 -> "CoreDNS code ..." only the "code DNS" part; "codeways" flagged. |
| Redlock | red log; redis law | Teacher says "Redis based implementation called Redlock" 02:16:58. Student "we have used red log" 02:38:51/02:38:57, "five instance of redis law" 02:50:12 -> Redlock, TERM high/medium. |
| lock / locks / locked | log; logs; logged (lock sentences) | see AMBIGUOUS rules below. |
| remote lock | remote block | 02:17:22 "Redis based remote block implementation", 02:43:54 "in a remote block" -> remote lock, TERM high. |
| dpkg lock file | dpkg.log | 02:08:18, 02:08:48 "dpkg.log file exists / creates a dpkg.log file" in the lock-file story -> `dpkg.lock` TERM medium (the dpkg lock file; teacher describes a lock file). |
| semaphore(s) | SimaPur; semifers; Semaphore | 02:06:58 "Mutex, SimaPur" , 02:09:03 "mutex and semifers" -> semaphore(s), TERM high. |
| mutex | Manutex | 02:45:41 student "Manutex and Semaphore" -> mutex, TERM high. |
| Prometheus | promethe is; prometheus | 03:23:36 "a promethe is very easy to set up" -> a Prometheus (casing + join), TERM high. |
| Martin Kleppmann | Martin Kleppman | name spelling 02:33:13 (casing/spelling only, NAME medium). |
| The Chubby Lock Service for Loosely-Coupled Distributed Systems | Block Service for Loosely Coppled Distributed Systems | paper title read out 02:32:44 -> "Lock Service for Loosely Coupled Distributed Systems", TERM high (only the two words). |
| edge case | H case | 02:54:45 "your H case would happen when" (teacher said "edge case" 02:33:10) -> edge case, TERM medium. |
| pre-reads | periods | 00:04:20 "why not share periods on discord channel" (teacher says "pre-reads" 00:05:10, 00:05:19) -> pre-reads, WORD high. |
| Discord / relog | discord; relog | casing "Discord"; "on relog as well" 00:05:24 = course portal (lec04 learn.relog.in) - keep "relog". |
| Python | PyHood | 00:55:41 "Java, PyHood, pick whatever language" -> Python, TERM medium. |
| Vim | BIM | 02:07:55 "So BIM and water cover and the package" -> Vim (Ubuntu packages story), TERM medium; "water cover", "Moo and cat" flagged `[unclear]`. |
| apt-get | APT, get | 02:08:01 "do APT, get updated, upgrade" -> "apt-get update, upgrade" only the "APT, get" join (TERM medium); "updated" stays. |
| sync back | sing back; see back | 01:59:48 "We'll sing back at 11 of five", 02:00:19 "we'll see back at 11 of 5" -> sync back (lec04 row, WORD medium). "11 of five" kept as spoken. |
| RabbitMQ's | RabbitMQS | 03:04:41 casing. |
| NGINX | NGINX | ASR already "NGINX" 00:02:18-00:02:20; keep as ASR wrote (do not lowercase in lec08 - casing churn only). |
| SQS / S3 / EOF / CDC / OS / UI / IO / HTML / GitHub / CloudWatch / BigQuery / Redshift / RTMP / ICMP / Kubernetes / Ubuntu / Docker / Lua / Chubby / inodes / SET NX | as written | correct as ASR wrote them; keep. Do not expand ("Amazon SQS", "Amazon S3" rows of the scan = NO expansion). "set nx" kept as ASR wrote. "IO trips" 01:54:31 kept. |
| idea | ID (00:31:24, 00:31:29) | "load valancer does not have an ID of CPU or memory ... All it has is ID of network connection" -> idea, WORD medium (grammar "have an ID of" = idea). Every other "ID" (distributed ID generators, consumer ID, queue's ID) is correct. |
| disk | desk (01:31:39); IST (02:47:30) | "lb cpu memory network desk everything" -> disk (metric list); "neither RAM nor IST" -> disk (teacher just taught threads=RAM, processes=disk), TERM medium. "public desk" 03:19:19 flagged only. |
| cache | cash (01:54:27) | "the client uses local DNS cash" -> cache (student repeats "local DNS cache" 01:54:43), TERM high. |
| Redis | red is (02:21:40) | "who cannot set their key in red is" -> Redis, TERM high. |
| API gateway | APEG | 03:20:03 "APEG is typically not the first point of entry" right after "API gateway" 03:19:46 -> API gateway, TERM medium. |
| TCP | TP (02:37:40) | "the consumer dies, the TP goes down" -> TCP (connection-down argument), TERM medium. |

**AMBIGUOUS rows -> context rules (check every occurrence; never bulk-replace):**

| ASR form | Rule for lec08 |
|---|---|
| right (-> write) | REJECT. 268 hits = "right?" tags / "right place" / "right time". No write-sentence found. |
| part (-> port) | REJECT. Teacher/ASR say "port" correctly in all port contexts (port 9090, IP address and port). |
| read (-> Redis) | REJECT. Verb "read" every time. Separate: "You don't need ready for that" 02:50:03 -> `[?Redis \| asr: "ready"]` flag only. |
| try (-> trie) / code (-> cohort) / by (-> byte) / stuff (-> stub) / run (-> RAM) / slow / easy to / section / session / link / website / shot / shared / sharing / happen(ed) / hyphen / detail / checking / where it / where can / worker (varchar) / single load / replicate / scale-out / reverse proxies / horizontally scaling / S three / start (star) | REJECT - real words in lec08 context. ("worker notes" handled above as worker nodes; "checking" -> check-in only in "airline checking system".) "scale up or run" 03:24:40 -> `[?down \| asr: "run"]` flag only. |
| idea (-> ID) | REJECT (24 hits, all "the idea is..."). Exception "It just picks one idea." 03:12:30 (CoreDNS picks one IP?) -> `[?IP \| asr: "idea"]` flag only. |
| log / logs / logged (-> lock/locks/locked) | -> lock(s)/locked ONLY in locking sentences: "remote logs and distributed logs" 00:03:14, 02:09:21, 02:31:21, 02:41:25 ("remote logs"); "owns the log" 02:15:00-02:15:05; "now you own the log" 02:22:12; "releasing the log" 02:22:27; "acquired the log" 02:24:00; "the log and processes the message" 02:31:17; "understand log" 02:42:07; "without acquiring the log" 02:42:24; "keeping track of logs" 02:44:41; "acquiring the log" 02:47:43; "network log" 02:48:33/02:48:38; "we logged some rows" 02:05:42 -> locked. TERM high (teacher) / medium (students). KEEP real logs: "log it down" 00:59:48, "metrics logged" 01:35:01, "log storage" 01:36:08. "places a log" 02:41:08 (student describing SQS visibility) -> `[?lock \| asr: "log"]` flag. |
| block / blocking (-> blob / blog) | REJECT (blocking call, synchronized block). "remote block" -> remote lock (above); "Block Service" (paper title) above. |
| polling / pulling (-> pooling / polling) | REJECT connection-pooling mapping: lec08 "polling" is genuine polling of the DB/targets (01:21-01:30). "pulling" (01:11:33, 01:12:37, 01:20:46) = student's "keep pulling from the DB" - real word, keep. |
| cash / catch (-> cache) | "cash" -> cache (DNS cache, above). "But now there is a catch." 02:16:05 and "I didn't catch that" 03:17:57 -> keep catch. |
| desk (-> disk) | 01:31:39 -> disk (above). 03:19:19 "What would you configure there on public desk?" -> `[?DNS \| asr: "desk"]` flag only (DNS section). |
| correction (-> connection) | all 4 hits are connection (above). |
| Q (-> queue) | all hits queue (above). |
| EC2 / easy to | REJECT ("extremely easy to build", "very easy to set up"). |
| transition (-> transaction) | both hits transaction (above). |
| Microsoft (-> microservice) | 01:56:55 "external users and not internal Microsoft" and 01:57:48 "how you configure your Microsoft is" -> `[?microservices \| asr: "Microsoft"]` flag only (cannot tell). |
| website (-> WebSocket) | REJECT ("For us, it's just one website", "core DNS website"). |
| two links (-> toolings) | 00:39:29 "they don't give you those two links to do that" -> `[?toolings \| asr: "two links"]` flag (project open question). Note "links links links links" 00:04:29 is real "links" (Discord channel). |
| sharing (-> sharding) | REJECT ("stopped sharing things"). |
| mission (-> pagination) | REJECT pagination. 03:04:49 "Each consumer is a mission has like no multiple, like no course" -> `[?machine \| asr: "mission"]` and `[?cores \| asr: "course"]` flags only. |
| single point of view | 00:15:32 "If it is not, then that is a single point of view" -> `[?single point of failure \| asr: "single point of view"]` flag only. 01:34:30 "at that point of view" (student) keep. |
| orchestra | KEEP as spoken (used by teacher and students consistently as short form of orchestrator, 01:37:01, 03:24-03:35). Do not change to orchestrator. |

**Unknown acronyms / tokens (bottom table of term_scan.md):**

| Token | Decision |
|---|---|
| LB (75) | correct, keep. |
| CPU, GitHub, CloudWatch, CoreDNS, BigQuery, EOF, CDC, OS, HTML, RTMP, ICMP, IO, UI | correct, keep. |
| LV (10), LP (8), LD (1) | -> LB (above). |
| HLB (01:32:30 "orchestrator would make API call to HLB") | flag `[?each LB \| asr: "HLB"]` - open question. |
| CP | -> CPU. |
| HTP, HEDP, STTP | -> HTTP. |
| LCHIC | -> health check (endpoint), medium. |
| YYM (00:46:55 "you have a list for YYM") | flag `[unclear: "YYM"]` - open question. |
| PyHood | -> Python. |
| FII | -> FYI. |
| SimaPur | -> semaphore. |
| BIM | -> Vim. |
| APT | -> apt-get (only "APT, get" 02:08:01). |
| CVS (02:17:55 "We've CVS database gives you this three") | flag `[unclear: "We've CVS database"]` - open question. |
| TP | -> TCP (02:37:40). |
| OCI (02:41:57 "to OCI queue implementation") | keep + `[check: OCI = Oracle Cloud queue?]` - open question. |
| IST | -> disk (02:47:30). |
| PPA (02:47:52 "store the process ID ... and also the PPA") | flag `[?TTL \| asr: "PPA"]` - open question. |
| PubServe | -> Pub/Sub. |
| RabbitMQS | -> RabbitMQ's. |
| DC (03:19:46 "establishing the DC progression with the load balancer") | flag `[?TCP connection \| asr: "DC progression"]` - open question. |
| APEG | -> API gateway. |
| InplexDB (03:27:22 "it uses InplexDB in the backend", Prometheus context) | flag `[?InfluxDB \| asr: "InplexDB"]` - open question. |
| DBS (01:18:47 "which you configure in your DBS part of load balancing configuration") | flag `[?DB's \| asr: "DBS"]` - not a plural of DB here; open question. |

**Reconciled after the chunk pass (lead, 2026-10-13) — new ASR forms decided from chunk notes:**

| Canonical | ASR forms (lec08) | Decision / evidence |
|---|---|---|
| load balancer | load violence; Load-by-lifter; load barrensor | non-words in LB sentences (00:32:41, 00:46:49, 00:52:49, 02:36:52), TERM high. Real-word forms "load answer", "load presenter", "load register", "load by", "load by answer", "load balance of", "node balancer" stay flagged `[?load balancer]`. |
| load balancing algorithm | load financing algorithm | 01:25:51, TERM high. |
| weighted round robin | weighted round-round; waited round; weighted round rob now | 00:24:02-00:25:23 (glossary "waited round robin"). "waited round" without "robin" -> "weighted round" only. |
| round robin | round problem | 00:21:29, TERM medium. |
| connection | collection (TCP collection); zero condition | "TCP collection" 00:51:40-00:52:01 high; "zero condition" 00:29:53 medium. |
| TCP connection | ccp connection | 03:01:59, TERM medium. |
| backend server | backhand server | 01:22:17, 01:22:30 (adds to "bacon server" row). |
| health check(s) | help checks | 01:32:17 (student), TERM medium. "slash status or slash help" 01:17:22 stays flagged `[?health]`. |
| slash health (endpoint) | less health | 03:29:22, WORD medium. |
| orchestrator | Orkoset; Orkastator; Orchristrator | non-words 01:17:59, 01:21:17-01:21:20, 01:39:16. "orchestra"/"Orchester" kept as spoken (rule above); "orchestrate", "or consider" flagged `[?orchestrator]`. |
| keep-alive | keepalive | 00:35:03 (lec04 row). |
| APIs | apks | 00:29:34. |
| variance | variant | 00:29:28 corrected (medium); "introduced variants" 00:29:34 flagged `[?variance]`. |
| listening (on port) | listing | port-listening sentences only: 00:55:47 "three process listing on 8081", 00:58:57 "LV server listing on port 9090" (teacher: "listening on port 9090" 00:58:21), WORD medium. |
| listener.Accept (Go) | listener.except; listener.xf | Go net.Listener walkthrough 00:59:21, 00:59:57, TERM medium. "system code" 01:01:09 stays flagged `[?system call]`. |
| Golang | go lang; go line | 03:23:41 high; 00:41:05 "normal go line to build one" (teacher's LB = Go code walked through) medium. |
| Flask / Spring Boot | flask; springboard (server) | 00:45:24, 03:29:16, TERM high. |
| staleness | stillness | "zero stillness" 01:27:35 (after "stale data"), WORD high. |
| push-based | push base | 01:29:18, WORD medium. "whole base thing" 01:29:13 flagged `[?pull-based]`. |
| fifth week | fifth way | 01:29:11 (teacher's promise "in fifth week" 01:28:24), WORD high. |
| overall | oral | "oral infrastructure utilization" 01:33:12, WORD medium. |
| behind the scenes | behind a sense | 01:49:52, WORD medium. |
| exclusive lock | exclusive law | 02:05:50 (row-locking story; lec05 "exclusive lock"), TERM medium. |
| thread safe | thread set | "queue.pop is not thread set" 02:10:26, TERM high. |
| consumer two / consumer won | consumer to; consumer three one | consumer numbering 02:18:03, 02:25:48, 02:26:08, 02:51:28 (WORD medium/high); "consumer three won" 02:15:38. Infinitive readings ("one consumer to read", "consumer to acquire" 02:26:03) stay / flagged. |
| automatic expirations | automatic expressions | 02:18:58 (teacher "TTL, automatic expiration" 02:16:36), TERM medium. |
| Redis | red (storing in red); red ace | 02:18:58, 03:00:32, TERM high. "release" 03:03:19 and "ready" 02:50:03 stay flagged `[?Redis]`. |
| edge case(s) | each case(s); H case; h case | 02:32:00, 02:53:24, 02:54:35-02:54:45 (TERM medium). "in each case is there" 02:31:49 and "hk system" 02:54:58 flagged only. |
| shard(s) | !chart; !charts | ONLY the MongoDB distributed-transaction example 02:43:20-02:44:19 (TERM high). "this show" 02:44:23 flagged `[?shard]`. |
| Redis ports 6379-6383 | 637963806381 6382 6383 | 02:55:49 ASR merged numbers, NUMBER high. |
| core properties | poor properties | 03:02:36, WORD high. |
| high availability | high ability | 03:16:45, 03:16:49 (teacher says "high availability" twice in the list), WORD high. |
| mumbo jumbo / grunt work | Mambo Jumbo; grant work | 03:12:48 high, 03:16:28 medium. |
| user two | you two | 03:11:25, WORD high. |
| repeated / repeatedly | reputed / reputedly | 03:15:28, WORD medium. |
| heartbeats | heart beats | 03:13:26 join. |
| TimescaleDB | time scale DB | 03:27:30, TERM medium. |
| Prometheus | Pometheus | 03:26:57, TERM high. |
| online offline indicator | online offer indicator | 03:31:53 (lec04 topic), WORD high. |
| separate component | separate company | 03:33:22, WORD medium. |
| autoscales | auto skills | "auto skills orchestrator" 03:34:22, WORD medium. |
| on-premise / pain points / horizontally scalable | a non-premise; paid points; hazardly scalable | 00:19:26 high, 00:13:32 medium, 00:17:39 medium. |
| Maglev (Google LB paper) | Maglev | 01:53:10, 01:58:34, 03:25:42 - correct as ASR wrote. |
| Route 53 / GCP / Flipkart / AWS / Lua / EVAL / HAProxy / Nginx | as written | casing only; "Nginx" (00:41:54+) and "NGINX" (00:02:18) both kept as ASR wrote (NGINX rule above: no casing churn). |
| Q7 | Q7 | 02:20:23, 02:24:06 - name of the locked key; NOT converted by the Q -> queue rule. |
| (flag only, lec08) | crawl job (cron job?); blocks (blogs?, REJECT rule); system code (system call?); goes on (goes down?); threat (thread?); server sending / service and events (server-sent events?); who keep her (ZooKeeper?); all service / off service (auth service?); cold in this / code units (CoreDNS?); lvc (LBs?); Challah (Chalo?); locket / a lot (lock?) | flagged `[?...]` in the chunks; real words or too uncertain. |
### Added for lec09 (2026-10-13, Pass 0b) — every term_scan.md row + unknown-token table decided

lec09 = Week 4 Day 1 ("social networks"), spoken English (one Hindi word seen: "pehle" 03:21:09). Content: intro
(tech-stack waves: PHP/MySQL -> Instagram year-one stack: Django, Celery, RabbitMQ/Redis, Postgres, AWS) 00:00-00:06;
how a CDN works as a black box (origin, CDN property, DNS CNAME, live demo with the teacher's own domain and
edge.* host) 00:06-00:31; image upload design (API server vs direct to S3, pre-signed URLs, GitHub upload demo)
00:31-00:57; Q&A (CDN URL, S3 cost vs CDN, Akamai PoPs in India); post/photo storage (store image ID not URL,
"if something is derivable, don't store it", signed URLs, Instagram FBCDN URL params OE/OH, on-the-fly resize,
DRM/proprietary-format Q&A) 01:04-01:47; BREAK; hashtag service (top-100 photos per hashtag, data-science black
box, counting at scale, Kafka partitioned by hashtag/user ID, counting servers, batching, read/write path)
01:54-02:36; Q&A (Kafka partitions, Redis Pub/Sub vs Kafka, popularity webhooks, SLAs/stateful components, Kafka
retention, profiling/RAM vs CPU, hashtag GC, Kafka as first point of entry, dead letter queue, MapReduce/Spark)
02:36-03:26.

The scan matches case-insensitively, so the large counts for `IT` (1085), `right`, `S3`, `over`, `see`, `has`,
`read`, `by`, `part`, `start`, `two`, `put` are ordinary words. There is NO upper-case "IT"/"ITs" token in lec09 (grep).

**A. Corrections (apply in every chunk)**

| # | Canonical | ASR forms (lec09) | AMB | Rule / evidence | Conf |
|---|---|---|---|---|---|
| 1 | arpitbhayani.me (teacher's own domain) | arpitpani.me; arpitbhani.me; arpidhani.me; arvidbari.me; arpitbany.me; arpitbani.me; Artitani.me; arpidani.me; arpitbhane.me; arpidbhani.me; "any.me" (00:13:00) | | CDN-demo stretch 00:07:42-00:25:17 ("my own website" 00:07:42). Board evidence in the project: lec07 board 01:24:00 screen-shared URL "arpitbhayani.me/blogs/..." (ledger K3-015), lec04 board. Correct the domain token only (TERM medium, one log row per segment group). "any.me" 00:13:00 -> keep + `[?arpitbhayani.me \| asr: "any.me"]` (could be "any domain"). | medium |
| 2 | edge.arpitbhayani.me | edge.arpetbhany.me; edge.arpitbhane.me; edge.arpegbari.me; h.arpidbhani (00:21:04); h.arpitbhany.me (00:48:30) | | teacher: "took a fancy name, edge..." 00:19:56, 00:20:36. "h." = "edge" mis-heard (same host, same demo). | medium |
| 3 | (image file names in the demo) | arpid.png; arpitbhane.png; arpidbhani.png; arpeg.png; "imd" | | File name not knowable from audio -> keep ASR form, add `[check: demo file name]` once per chunk. "imd" -> keep + `[?img \| asr: "imd"]` (teacher says "slash img slash" 00:20:53, 00:21:21) - real path segment is "img": correct "imd" -> "img" ONLY in a path read aloud next to "static" (TERM medium). | flag / medium |
| 4 | Arpit Bhayani | Arpit Bari | | 00:18:52 "only Arpit Bari, like only the site you own" (teacher's own name) -> TERM medium. | medium |
| 5 | mycdn.net | mycedient.net; mycedon.net | | teacher says "a.mycdn.net" 00:14:57 for the same CDN property (00:12:06, 00:13:06). | high |
| 6 | S3 | Esri; Esri's; ST; NS3 ("an S3"); | AMB | "Esri gives you nine nines", "Esri doesn't store on SSDs", "Esri's egress cost" 01:01:08-01:01:32 -> S3 (high; S3 named 01:01:05). "uploaded to ST" 00:44:31, "raw ST path" 01:10:00 -> S3 (medium). "make an NS3 call" 01:02:54 -> "an S3 call" (medium). Keep "S3" as spoken; never expand to "Amazon S3". "SD server" 00:57:54 and "SE service" 03:03:53 -> flag `[?S3 \| asr: "SD"]` / `[?S3 \| asr: "SE"]` only. | high / medium |
| 7 | CDN | Cedian; CD; cd and | | "Cedian gives you different guarantees" 01:01:11, 01:01:29 (high). "served from the CD." 00:18:08, "CD" 01:05:38 ("the actual cd and url" -> "the actual CDN URL"), 01:10:47 -> CDN when the sentence is about CDN serving (TERM medium); if cut off, `[?CDN \| asr: "CD"]`. "CDL on the fly" 01:38:28 -> CDN (medium, "change your CDN" 01:10:04). | high / medium |
| 8 | Akamai | Akama | | 00:59:56, 01:00:31, 01:00:39; teacher says "Akamai" 00:01:00, 01:45:49. | high |
| 9 | pre-signed URL | present URL; side URL | AMB | "present URL" (00:38:51-00:39:05 student, 00:42:11-00:47:26, 01:05:38 teacher) -> pre-signed URL (TERM high; "pre-signed URL" said 40+ times in the same stretch). 01:02:48 "generating that side URL" -> signed URL (medium). "pre-URLs" 03:03:53 keep + `[?pre-signed URLs \| asr: "pre-URLs"]`. "signed URL" stays as spoken (teacher uses both). | high / medium |
| 10 | Redis / Redis Pub/Sub | Reddit's PubSub; Reddit pubs up; Reddit (02:44:28); redis | | Student 3's Pub/Sub question 02:43:13-02:44:14 opens with "redis pub sub" -> "Reddit's PubSub" -> "Redis Pub/Sub", "Reddit pubs up" -> "Redis Pub/Sub" (high). Teacher 02:44:28 "whichever server is connected to Reddit" -> Redis (medium). "a resist" 02:45:26 -> flag `[?Redis \| asr: "a resist"]`. Lower-case "redis" -> "Redis". | high / medium |
| 11 | Pub/Sub | pubs up; pub sub; pub-sub; PubSub; !pops up | AMB | all Pub/Sub sentences (02:11:04, 02:43:13-02:44:55). "real time pops up" 02:11:37 ("redis does not persist anything it's real time pops up") -> Pub/Sub (project rule: after "real-time"/"Redis"; high). | high |
| 12 | Kafka | kafta; Kappa | | "ingested in kinases not kafta" 03:21:02 (high). "instead of like having a separate Kappa" 02:46:58 student (popularity service, Kafka in the design) -> Kafka (medium). | high / medium |
| 13 | Kinesis | kinases; Kyrus | | "kinases" 03:21:02 (project row). "Kafka or Kyrus" 02:57:53 and "Kafka, Kyrus, Flume, Flink" 03:23:50 -> Kinesis (TERM medium: streaming-system list; teacher pairs Kafka/Kinesis in lec01/lec06). | medium |
| 14 | Flink | fling | | "flume fling map reduce" 03:25:08 (teacher says "Flume, Flink" 03:23:50, 03:24:02). | high |
| 15 | MapReduce | map reduce; map-reduce | | join -> "MapReduce" (03:22:35, 03:25:10-03:25:16; "Hadoop MapReduce" 03:22:51 already). Log each join TERM (verifier drop+add). Keep "spark map" 03:23:30 as spoken. | trivial |
| 16 | transaction outbox pattern | transition outbox pattern | | 03:22:06; teacher repeats "transaction outbox pattern" 03:22:10. | high |
| 17 | dead letter queue | dead letter Q; data queue (03:21:48) | | "What you need to know is dead letter Q." 02:54:46 -> queue (high). "as your data queue for that" 03:21:48 -> flag `[?dead letter queue \| asr: "data queue"]` only. | high / flag |
| 18 | write(s) / write path | !right; !rights | AMB | -> write ONLY in read/write-path sentences: "Have we optimized our right path?" 02:28:52, "Are you doing enough on the right path?" 02:29:24, "if this is my right path" 02:29:26, "Same thing goes for right path." 02:32:52, "think of what the right paths are" 02:35:39, student "when the right path" 02:37:57 (read path / write path contrast 02:36:30, 02:36:58), "I make eight rights onto this DB" 02:33:31, "a lot of micro rights onto database" 02:33:38, "the right would take time" 02:46:03 (DB overwhelmed) -> write(s) (TERM high/medium). 03:21:09 "let's accept the rights that are there from the user" -> writes (medium, Kafka-as-first-entry ingestion). 03:14:24 "micro register database" -> flag `[?micro writes on the database \| asr: "micro register database"]`. Every "right?"/"right." tag stays. | high / medium |
| 19 | cache | !cash | AMB | "So either CDN or cash, pick your favorite." 02:26:32 and "you may add cash if it" 02:32:24 -> cache (high; caching / TTL / invalidation stretch). "Now I can catch who is doing mischief" 01:41:54 and "don't catch me on that" 03:16:55 = real "catch", keep. | high |
| 20 | ID | !idea | AMB | ONLY 02:09:41-02:09:45 "Either user idea or post ID." / "User idea." / "Probably user idea." (partition key; teacher says "partitioned by user ID" 02:11:56) -> user ID (high). All other "idea" ("the idea is", "rough idea", "no idea") stay. | high |
| 21 | Hotstar | hot stuff | | 00:30:04 student (Gaurav): "live matches on hot stuff" (Indian live-cricket streaming) -> Hotstar (TERM medium). | medium |
| 22 | New Relic, Datadog | neural link data dog | | 03:06:20 "profiling ... using neural link data dog or any sort of open telemetry system" -> "New Relic, Datadog" (TERM medium; APM/profiling tool list). "open telemetry" -> casing "OpenTelemetry" (trivial). | medium |
| 23 | local disks | local days | | 01:01:17 "They are storing it on local days. They might be storing it on the SSDs." (WORD medium). | medium |
| 24 | LAMP stack | LAP, STEC | | 00:02:22 "PHP, MySQL, LAP, STEC and whatnot" (college stack, PHP era) -> "LAMP stack" (TERM medium; one log row). | medium |
| 25 | hashtag service | hashtag survey | | 00:00:02 agenda "when we discuss this hashtag survey" -> service (WORD medium; "hashtag service" 01:47:29, 01:54:59). | medium |
| 26 | city | CT | | 01:34:01 "one poor guy in tier 3 CT on geo internet" -> "tier 3 city" (WORD medium). "geo" keep as spoken (= Jio? flag `[?Jio \| asr: "geo"]`). | medium / flag |
| 27 | asynchronously / async | a synchronously; a synchronous | AMB, meaning flips | Never change silently. 02:55:08 "Third, write to a dead letter queue. And then a synchronously process." -> keep + `[?asynchronously \| asr: "a synchronously"]`. 02:48:32 "...should not be done in a synchronous way" -> keep as written; chunk adds `[check: sync vs async]` only if the sentence contradicts itself. "async job" 00:34:23 is already correct. | flag |
| 28 | Arpit | Arfit | | 02:36:28 student "So, Arfit, one question" (students address the teacher as Arpit, e.g. 00:24:50, 00:57:47) -> WORD medium. | medium |
| 29 | goroutines | go routines; Go routine | | 03:10:33-03:11:22, 03:10:57 (lec08 row). | trivial |
| 30 | iOS | IOS; iOS | | 01:17:03 "whatever is an iOS" (client platform: browser / Android / iOS) - keep "iOS". | trivial |
| 31 | EC2 | ec2 | | 03:09:43 "aws ec2 instance" -> casing "AWS EC2". | trivial |
| 32 | CloudFront | Cloud front | | 00:27:17 CDN product list. | trivial |
| 33 | NoSQL / multi-master / key-value store / load balancer / in-memory / trade-off / round robin | no SQL; no-SQL; multi master; key value store; key-value; load-balancer; in memory; trade off; round-robin | | project rules: hyphen/join; "in-memory" only adjectival ("in-memory queues" 03:17:19, "in-memory thing" 03:17:12); "hold some posts in memory" 02:07:43, "drop it in memory" 02:52:44, "Buffer in memory" 02:55:02 stay. "trade-off" noun only. "round robin" keep spoken noun. Log joins as TERM. | trivial |
| 34 | FYI | FII; fii | | teacher's tic (lec03 row): 00:46:36 "This is the YouTube ID FII." -> FYI (medium), 00:56:26, 01:43:01, 01:57:32 (check each; FYI where it is the sentence tag). 03:15:10 "FYI." already correct. | medium |
| 35 | githubusercontent.com | GitHubusercontent.com | | 00:48:28 casing per product domain (lowercase). | trivial |
| 36 | queue (dead letter) / Q | Q | | see #17. | high |

**A2. Flag only (real words or unproven - mark, never correct)**

| ASR text (time) | Flag |
|---|---|
| "Dappe dappe, boxes, boxes, my toy or kit can draw." 00:00:02 | `[unclear: "Dappe dappe, boxes, boxes, my toy or kit can draw"]` - probably Hindi ("dabbe dabbe" = boxes; "koi bhi draw kar sakta"?) mis-decoded; do NOT back-translate. |
| "state material" 00:00:02 | `[unclear: "state material"]` |
| "GP uses CDN" 00:17:19 ("I have a video on my YouTube channel on how GP uses CDN") | `[unclear: "GP"]` (product name not recoverable) |
| "wattage map to ABC." 00:26:59 | `[unclear: "wattage"]` |
| "OneQ with a RabbitMQ or Redis" 00:03:01 | `[unclear: "OneQ"]` |
| "IAM role in the ADEM, right?" 00:37:38-00:37:45 (student) | `[unclear: "ADEM"]` |
| "This is the actual PNG3, RDA format, RDA syntax." 00:54:15 | `[unclear: "PNG3, RDA"]` |
| "B would make a APAC or look" 01:15:54 | `[?API call \| asr: "APAC"]` |
| "CDN cocks up" 01:04:19 | keep + `[check: "cocks up" - CDN kicks in?]` |
| "And some EDN, some certificate" 01:25:12 | keep + `[check: URL parameter name]` |
| "CRS CDN's IP address" 01:45:21 | `[unclear: "CRS"]` |
| "So like carpet, we can have one text table" 01:57:04 (student) | `[unclear: "carpet"]` (name? "Arpit"?) - not corrected |
| "Buffer in memory, loss, like letter data be lost." 02:55:02 | `[unclear: "letter data be lost"]` (let the data be lost?) |
| "you have partition DBI" 02:56:10; "But the digital is a leaderless components" 02:56:34 (student) | `[unclear: "DBI"]`, `[unclear: "the digital"]` |
| "leader, leader and applicators" / "applicator too" 02:56:13-02:56:16 (student) | `[?replicas \| asr: "applicators"]` (replicators?) |
| "Kafka is something which rules up a system around" 02:51:37 (student) | keep + `[check: ...]` |
| "thanks rajay" 03:22:21 | `[?Rajiv \| asr: "rajay"]` (teacher called "Go on Rajiv" 01:44:51) |
| "do we cover map reduce in this code course" 03:22:35 | `[?cohort \| asr: "code"]` |
| "Kafka, Kyrus" -> see A#13 (decided); "Normal VMs, spark map, it is" 03:23:30 | keep + `[unclear: "spark map, it is"]` |
| "Start with a book for effective Spark." 03:24:36, "effective spark is mostly the name of the book" 03:25:20 | keep as spoken (book title not verified; no correction) |
| "geo internet" 01:34:01 | `[?Jio \| asr: "geo"]` |
| "Yeah, Azure window is not visible." 01:22:42 (STUDENT_1; teacher replies "Oh, sorry ... I should always share my full screen") | `[?your window \| asr: "Azure window"]` |
| "Asset is what the meta information was" 00:48:14, 00:53:35 | keep "asset" (GitHub asset/attachment metadata) - REJECT ACID. |

**B. Rejected / keep as spoken (real words in lec09 context - do NOT change)**

| ASR form (hits) | Suggested by scan | Decision / evidence |
|---|---|---|
| it / its (1085 + 8) | ID / IDs | REJECT. No upper-case IT/ITs token in lec09; all pronoun "it"/"its" ("it is asking its image upload service"). |
| right (438) / rights (4) | write(s) | REJECT except the explicit write sentences in A#18. |
| S3 (127) | Amazon S3 | keep as spoken; never expand. Same for SQS (03:21:46, 03:21:58). |
| over (85) | O(1) | REJECT ("go over here"). |
| ID (79) | idea | REJECT reverse mapping - "random image ID", "post ID" are correct IDs. |
| see (75) | C / CDEFG | REJECT (verb). |
| has (70) | hash | REJECT (verb; the lecture's hash word is "hashtag", already correct). |
| read (69) | Redis | REJECT ("ACL public read", "read path"). Redis forms are in A#10. |
| by (67) | byte | REJECT. |
| part (56) | port | REJECT ("this part", "persistence part"). |
| start (38) | star | REJECT (no SQL SELECT). |
| two (37) | to | REJECT ("one or two years", "two Kafka"). |
| put (35) | foot | REJECT (scan row inverted; "put load on my backend" correct). |
| cache (27) / catch (4) | catch / cache | cache already correct; catch handled in A#19. |
| happen (26) / happened (4) | hyphen | REJECT. |
| idea (22) | ID | REJECT except A#20. |
| try (20) | trie | REJECT ("not try random BGP protocol", "try with that"). |
| easy to (14) | EC2 | REJECT ("very easy to spot", "easy to implement", "easy to learn"). Real EC2 at 03:09:43 (A#31). |
| MB (12) | (scan row "23") | keep "MB" ("10 MB of image"). |
| folks (12) | forks | REJECT (people). |
| stuff (12) | stub | REJECT. |
| RAM (10) | run | keep RAM (03:04-03:11 RAM vs CPU, correct). |
| Arpit (9) | | correct (students addressing the teacher; teacher's own name 00:18:52 A#4). |
| Redis (9) | read | correct. |
| website (8) | WebSocket | REJECT ("my own website"). |
| account (8) | count | REJECT ("Create an AWS account"). |
| code (7) | cohort | REJECT ("Android code", "source code"); exception flag 03:22:35 (A2). |
| writes (7) | | already correct. |
| asset (6) | ACID | REJECT (A2). |
| TTL (6) / detail (3) | detail / TTL | TTL correct (00:29:11, 01:20:24, 02:26:15); "in much more detail" stays. |
| disk (5) / desk | | "disk" correct (01:46:36, 03:02:12, 03:10:13, 03:18:12); no "desk" hit. |
| link (4) | Flink | REJECT ("copy image link"). Real Flink A#14. |
| go routines (4) | goroutines | A#29. |
| quick / QUICK (4) | QUIC | REJECT ("quick demo"). |
| little (4) | brittle | REJECT ("a little bit"). |
| key value store (4) | key-value store | A#33. |
| blog (3) | | correct ("Cloudflare has a blog on it"). |
| CD (3) | CDN | A#7. |
| site (3) | side | REJECT ("only the site you own"). |
| where it (3) | varchar | REJECT. |
| slow (1) | SLO | REJECT ("slow things down"). |
| block (1) / blocks (1) | blob / blogs | REJECT ("building block(s)"). "blob storage" already correct (00:31:31, 00:50:30, 00:59:14). |
| hash map (1) | | correct. |
| clients (1) | | correct ("WebSocket clients"). |
| Rajiv (1) | | correct (01:44:51 teacher call). |
| hours (1) | | correct. |
| salary (1) | Celery | REJECT: 01:03:35 "Take out $100 from a salary." = money example. "Celery" already correct (00:02:57). |
| relog (1) | | keep "relog" (teacher's own product, project row). |
| memcache (1) | Memcached | keep "Memcache" (spoken form, casing only). |
| rest (1) | REST | REJECT ("rest all the workers"). |
| Decision (1) | Token | REJECT ("decision making"). |
| async (1) | | correct (00:34:23). |
| a synchronous (1) | async | A#27 (flag rule). |
| consumer to (1) | consumer two | REJECT: 03:00:36 "a new consumer to this Kafka" (infinitive/preposition). |
| grab (1) | graph | REJECT ("grab the image"). |
| email (1) | image | REJECT ("notified over email"). |
| shot (1) | shard | REJECT ("in one shot"). |
| worker (1) | varchar | REJECT ("asynchronous worker"). |
| pulling (2) | polling / pooling | REJECT: 02:46:30 "push ... rather than users pulling it out" (push vs pull) - real word. |
| Microsoft (2) | microservice | REJECT: 01:07:31-01:07:34 "Microsoft changed their billing of Bing APIs" (company). |
| log (2) | lock | REJECT ("log into any of the CDN"). |
| photo stable (2) | photos table | A: "Photo stable is out of question" 01:57:20, 01:57:30 -> "photos table" (WORD high, project row). |
| cohort (1) | code | correct ("Every single cohort" 01:05:54). |
| Transition (2) | transaction | A#16. |
| Q (1) | queue | A#17. |
| semantic rejects (lec05/lec06) rows | | same real words as above - keep. |

**C. Unknown acronyms / tokens (bottom table of term_scan.md)**

| Token | Decision |
|---|---|
| DRM (10), PHP (7), BGP (4), GCS (3), US (2), HREF (2), ACL (2), SSD (2), OTT (2), SDK (2), IAM (1), APK (1), DBA (1), SOS (3, "Uber's SOS emergency"), GC (2, student defines "Garbage collection" 03:11:58), AB (01:10:04 "AB testing" -> keep "AB testing"), PC (01:15:24), AI (00:05:02), GoDaddy, ABC (00:26:59, example letters), IG (01:25:09 "IG cache key", URL param) | correct as ASR wrote; keep (casing only). |
| FBCDN (3) | correct: "FBCDN.net" read off Instagram URL (01:23:43-01:26:14); keep casing as spoken "FBCDN". |
| OE (3), OH (2), OW (1) | Instagram/CDN URL parameters read from screen (01:24:48-01:34:41: "OE ... expiry", "OH is the hash", "W or width or OW") - keep. |
| PubSub (2) | -> Pub/Sub (A#11). |
| ST (2), NS3 (1) | -> S3 (A#6). |
| SD (1), SE (1) | flag `[?S3]` (A#6). |
| CT (1) | -> city (A#26). |
| CDL (1) | -> CDN (A#7). |
| LAP / STEC | -> LAMP stack (A#24). |
| OneQ, ADEM, PNG3, RDA, CRS, DBI, GP, EDN, APAC | flag only (A2). |
| GitHubusercontent | -> githubusercontent.com (A#35). |

#### lec09 Pass 5 additions (lead reconciliation of chunk notes, 2026-10-13)

Each row was re-checked against every corrected chunk (grep of corrected + raw files); only the chunk named had the form. P = Pass 5 row.

| # | Canonical | ASR forms (lec09) | Decision / evidence | Conf |
|---|---|---|---|---|
| P1 | Cloudflare | cloud player; Cloud Fair; cloud fair; !Cloudflare (for AWS) | CDN-provider sentences only: 00:11:25 "let's say cloud player", 00:13:18 "your Cloud Fair" (chunk_02), 00:27:06 "whatever the cloud fair or cloud provides" (chunk_03, upgraded from a flag at Pass 5 for consistency) -> Cloudflare. 00:10:58 "even AWS Cloudflare" stays flagged `[?CloudFront]` (teacher may have misspoken). | medium |
| P2 | arpitbhayani.me (A#1 extended) | artedhany.me; urbanvary.me; !Dorpidmany.me | 00:14:00, 00:14:05 corrected (chunk_02). "Dorpidmany.me" 00:09:26 has "to" fused in -> stays flagged `[?arpitbhayani.me]`. | medium |
| P3 | a.mycdn.net (A#5 extended) | A.mycedian.net | 00:13:41-00:13:56 (4x, chunk_02); "Cedian" = CDN (A#7). | high |
| P4 | pre-signed URL (A#9 extended) | pre-send URL; pre-site URL; !present (no "URL") | 00:43:22, 00:44:45 corrected (chunk_04). 00:52:52 "asking for a present" stays flagged. | high |
| P5 | CDN(s) | CDMs; !seed | 00:30:49, 00:30:52 "CDMs" -> CDNs (high, lec06 CDM row). 00:55:48 "coming from seed" flagged only. | high |
| P6 | cached | cast (in CDN) | 00:28:54 "cast in CDN" -> cached (medium, caching sentence). | medium |
| P7 | DB | DP | 00:52:26 "store it in DP" -> DB (high; "database" 00:52:08). | high |
| P8 | EC2 | e-c2 | 00:40:03, 00:40:08 casing/hyphen (A#31). | trivial |
| P9 | billed | built (for egress) | 00:40:18 WORD medium. | medium |
| P10 | instacdn.net | Insta CDN.net | 01:16:41 (ASR writes "instacdn.net" 01:17:35). "Insta CDN over here" stays. | high |
| P11 | DOM | dome; !dog | 01:16:54 "in the dome" -> DOM (medium, front-end render). 01:35:40 "in the dog" flagged only (real word). | medium / flag |
| P12 | grant access; theoretical; URL; toggle | grant taxes; heretical; you are; tagal | 01:20:51, 01:20:56, 01:21:37, 01:22:53 (chunk_07, WORD). | high / medium |
| P13 | batch it | !patch it | 02:33:48 batching sentence only (chunk_13). 00:29:56 "patches it back" (cache miss) flagged `[?fetches]`. | medium |
| P14 | count plus plus | count us plus; !call plus plus | 02:39:58 corrected; 02:06:58 "call plus plus" flagged `[?count]`. | medium / flag |
| P15 | pull based | full based | 02:45:41, 02:45:49 push vs pull sentence (chunk_14). | high |
| P16 | cProfile | C profile; cpropyl | 03:08:35-03:09:02 Python profiler (chunk_16). Nagios kept as spoken. | high / medium |
| P17 | SRE | sre | 02:53:26 casing. "sra" 02:53:38 flagged `[?SLA]`. | trivial |
| P18 | NoSQL | noisequill | 02:49:44 (chunk_15). | medium |
| P19 | Giphy (?) | GP; Jiffy | 00:17:19 / 00:17:25 "how GP uses CDN ... how beautifully Jiffy leverages CDN" - probably the teacher's Giphy-CDN video; NOT confirmed from audio -> both stay flagged (`[unclear: "GP"]`, `[?Giphy]`). Open question. | flag |
| P20 | (flag only, chunk-local) | shots (shorts?); overflow (overall flow?); selects are (select star?); firepower (Firefox?); rpd underscore behind me (teacher's Instagram handle); scheme (schema?); serial (CDN URL?); Forex (4x?); skis (keys?); image stack (IMG tag?); ur (URL?); heading (headache?); area (array?); text/texts (tags?); party (partitioning key?); Roller; accounting services; Hashtag extension (extraction?); synchronous workers (asynchronous?); rights 02:52:19 (writes?); foreign (400?); five access (5xx?) | real words or unproven -> kept as `[?...]` / `[unclear]` flags in the chunks. Not corrected. | flag |

### Added for lec10 (2026-10-13, Pass 0b) — every term_scan.md row decided

lec10 = "Week 5, day 2" (00:00:01), spoken English, no Hindi/Devanagari seen. Part 1 (00:00-01:53): build a word dictionary (1 TB, 170,000 words, weekly changelog, Sundays) WITHOUT a traditional database — text vs JSON file, sorted file, index + header + data in one file ("AODB"), index-size estimate (17,000,000 / 1.7 MB), API servers + network attached storage (S3 / HDFS / network hard disk) with range reads, weekly updates (merge of sorted dictionary + sorted changelog, new S3 path, metadata file, polling vs reactive Redis Pub/Sub vs triggering a redeploy / rolling deployment), Athena / cold storage. Break 01:53:04-01:59:52. Part 2 (01:59:52-02:42:50): super-fast key-value store on magnetic disk (head/sector/seek), append-only file, put/get/delete with in-memory hash table of key -> offset, delete marker, merge & compaction of immutable files, record format (CRC, timestamp, key size, value size, key, value), this is Bitcask (embedded, Riak). Q&A 02:42:50-03:06:32.

The scan matches case-insensitively and also produces rows from the inherited decision tables (rows whose "Canonical" cell is a number or a "(REJECTED)"/"semantic rejects" label, and reversed rows like "by (50) | byte"). Those rows are decided below too.

#### A. Inherited / generic rows

| Canonical (scan) | ASR form | Decision for lec10 (evidence) |
|---|---|---|
| ID / IDs | IT (759); ITs (8) | REJECT. Pronoun "it"/"its" ("It's not something...", "it has its own encoder"). Never change. Only odd hit: 02:39:56 "And this is where you see it in IT." -> keep + flag `[unclear: "see it in IT"]` (see Open questions). |
| ID / IDs | idea (10); ideas (1) | REJECT. "The idea is about...", "I had an idea", "I have two ideas". Keep. "idea (25) \| ID" row: "document ID", "order ID" already correct. |
| write(s) | right (514) — AMBIGUOUS | Context rule: -> "write" ONLY in (a) "right ahead" 02:04:46, 02:04:47 -> "write-ahead" (student said "write ahead log" 00:06:57; STUDENT_3 02:11:51), TERM high; (b) "on every right" 02:44:44 -> "write" (memtable-flush-per-write point), TERM medium; (c) any other hit where "right" is the object of put/flush/append ("every right/each right/the rights") -> TERM medium per hit. Every "Right."/"right?" tag, "right sector", "right exact point", "right term" stays. |
| write(s) / writes | rights (1) — AMBIGUOUS | 02:50:15 "all the rights are happening" (active file) -> "writes", TERM high. |
| in-memory | in memory (232 scan; 58 "43" row) | Hyphen only when adjectival before a noun ("in memory hash table" 00:34:18, 01:03:02 -> "in-memory hash table"; trivial). Predicate / adverbial "in memory" stays ("build it up in memory", "store values in memory"). Rows "43 \| in-memory" = already canonical. |
| (REJECTED) Redis / Redis | read (135) — AMBIGUOUS | REJECT. "read-only", "read heavy", "random read", "read path". "read (39) \| Redis" row: "Redis" (8) already correct (00:01:05, 00:04:46, 01:32-01:43). |
| Amazon S3 | S3 (98) | Keep "S3" as spoken; never expand. Lower-case "s3" -> "S3" (casing). "SE" 00:58:59 "this one file on SE" -> "S3" (TERM high: previous sentence 00:58:52 "store this file on S3"). |
| desk (30) / disk | disk (84); desk (6) — AMBIGUOUS | "disk" correct. "desk" -> "disk" in all lec10 hits (00:11:42 "read side on desk", 02:30:23 "write to the desk", 02:41:07 "on desk key value store" -> "on-disk key-value store"), TERM high/medium: all in disk-IO sentences. |
| disk | disc (5) | 02:01:25-02:02:37 magnetic-disk stretch ("your disc spins", "translated to a particular disc") -> "disk" (project spelling, lec04 precedent; silent spelling normalisation, log once TERM low if the verifier lists it). |
| O(1) (?) | over (72) | REJECT. Every hit is "over here" / "over email" / "over network". Spoken "order one" (01:52:21, 02:10:36, 02:14:12, 02:35:39, 02:36:19) stays as spoken words - do NOT write O(1). |
| hash / hashing | has (62) — AMBIGUOUS | REJECT in lec10. All hits are the verb ("dictionary in total has 170,000 words", "S3 has", "it has its own"). "hash table"/"hash map" are already written correctly everywhere. |
| port / (REJECTED) port / part (66) | part (60) — AMBIGUOUS | REJECT "part" (core part, calculation part). "port" (3) 01:36:30-01:36:42 "give a new port to it ... changes the port" = correct (LB/networking). Keep both. |
| byte / by (50) | by (55); byte (24) | REJECT "by" ("step by step", "line by line", "by, by offset"). "byte" correct. 03:01:46 "byte byte byte byte" = LOOP (see structure notes). |
| to (messages-table column) | two (47) — AMBIGUOUS | REJECT. "two very interesting problem sets", "two files". No from/to column in lec10. |
| key-value store | key value store (40); key value (21); key-value (42) | Hyphenate adjectival "key-value store", "key-value database", "key-value pairs" (trivial). "key values" (plural noun, 02:44:20 "sorted key values") stays. |
| star (SQL SELECT *) | start (42) | REJECT. No SQL select in lec10 ("let's start", "start serving"). |
| CDEFG / "B maps to see" | see (40) | REJECT. Verb "see". The teacher's merge example letters are already written as letters ("A, A dash", "CC dash", "DD dash EE dash", "FF dash") - keep as spoken. |
| foot (1) / replace into / put | put (35); foot (1) — AMBIGUOUS | "put" correct. 02:08:17 "any foot comes, you go and add" -> "any put comes" (TERM high: put/get/delete stretch; lec05 precedent). |
| load balancer | load-balancer (33); load balance or (1); load balance (1) | "load balancer" spelled open. 00:50:16 "have a load balance or something" -> "a load balancer or something" (TERM high; "load balancer" said 00:50:22). Rows "41 \| load balancer" = already canonical. |
| (REJECTED) lock / lock / locks | log (21); logs (1) — AMBIGUOUS | REJECT. "write ahead log", "MySQL bin log", "Postgres commit log", "create some logs" = real logs. No locking in lec10. |
| hyphen | happen (21); happened (3) | REJECT ("what would happen?"). Note: the teacher's spoken "dash" (A dash, CC double dash) stays as the word "dash". |
| JSON / JSON / JVM / MB / ORM | Jason (16); jason | -> "JSON" in every lec10 hit (00:05:16-00:47:35; all "Jason format/file/decoder"), TERM high (format discussion, "JSON" written 23x in the same stretch). One log row per segment. |
| forks | folks (14) — AMBIGUOUS | REJECT ("you folks", "see you folks"). |
| transaction | version (14); Transition / transition (6 / 3) — AMBIGUOUS | REJECT. "version number" (00:42:48+, header version), "transition be smooth enough" (deployment, 01:22:35, 01:23:35, 01:43:42). Keep. |
| EC2 / (REJECTED) EC2 | easy to (12 / 6) — AMBIGUOUS | REJECT ("it's easy to build complex systems", "easy to understand"). |
| Pub/Sub | pubsub (12); PubSub (6/3); pubs up (3); pops up (1) — AMBIGUOUS | "Redis Pubsub/PubSub" (01:32:14-01:43:16) and "Radis PubSub" (03:00:58) -> "Redis Pub/Sub" (casing/slash; "Radis" -> Redis TERM high). "reactive pops up" 01:43:42 and "reactive pubs up" 01:51:12 -> "reactive Pub/Sub" (TERM medium: recap of the Redis Pub/Sub option). |
| (REJECTED) Pub/Sub | pop-up / pop up (1) | 03:01:27 "No, Dan, no pop-up allowed." - keep (real phrase; whole line `[check]` for the name). |
| SLO / (REJECTED) SLO | slow (11) | REJECT ("very slow"). |
| cohort / (REJECTED) ... | code (11) | REJECT ("write the code", "line of code"). |
| brittle | little (11) — AMBIGUOUS | REJECT ("a little high response time", "a little more deeper"). |
| stub | stuff (9) — AMBIGUOUS | REJECT ("a lot of stuff"). |
| ZooKeeper / Postgres / ... | postgres (10) | casing "Postgres". |
| connection pooling | polling (10) — AMBIGUOUS | REJECT. "polling" is correct here (API servers polling the metadata file, 01:32-01:39). Keep. |
| polling / connection pooling | pulling (2) — AMBIGUOUS | 01:30:36 STUDENT_5 "they will keep on pulling this metadata let's say at some frequency" -> do NOT change; flag `[?polling \| asr: "pulling"]` (student says "continuously poll" 01:31:45, but "pull" is plausible). "pull the metadata" 01:51:12 / "pull it" 01:33:40 stay. |
| SSTable | SS table (8); sstable | -> "SSTable" (TERM trivial: spacing/casing; 02:03:39, 02:11:43, 02:43:30-02:45:13). |
| memtable | mem table (3); MAM table (1); Memetable (2) | -> "memtable". "mem table" spacing trivial; "MAM table" 02:44:20, "Memetable" 02:44:41, 02:44:59 -> TERM high (non-words, memtable discussed 02:43:30-02:45:13). |
| blogs / blob / (REJECTED) blob | blocks (8); block (4) — AMBIGUOUS | REJECT ("building blocks", "eight kilobyte block", "add more blocks", "marked as blocked"). "medium blog post" 02:55:33 already correct. |
| shard / (REJECTED) shard | shared (8/4); shot (1) | REJECT ("shared disk storage", "shared storage", "in one shot"). |
| trie / (REJECTED) trie | try (8/4); tree (1) | REJECT ("we can try", "B plus tree"). |
| MB / 23 | MB (7); MD (1); MP / MPs (1/1); MBS (1) | "MB" correct. 00:37:35 "1.751 MD" -> "1.751 MB" (TERM high: index size; "1.7 MB" 01:51:44). 02:59:53 "turns out to be MP" -> "MB", 02:59:58 "we take MPs very lightly, but M stands for a million, a million bytes" -> "MBs" (TERM high; lec05 MP->MB precedent). 02:56:37 "an MBS of record" -> "MBs" (casing; student, "per MB records" 02:57:45). |
| cache / catch (4) | cache (7) | "cache" correct (CPU cache, L1 cache, 01:28 "their cache"). No "cash" in lec10. |
| QUIC / (REJECTED) QUIC | quick (6); QUICK (3) — AMBIGUOUS | REJECT ("a quick summary"). |
| varchar | where it (6) — AMBIGUOUS | REJECT ("figure it out where it is"). |
| writes / 5 | writes (5) | correct. |
| RAM / run (7) | run (5); RAM (5) — AMBIGUOUS | REJECT "run" ("run some sort of compaction", "job ran"). "RAM" correct. |
| (REJECTED) QUIC/session/... / session | section (4/2) — AMBIGUOUS | REJECT ("data section"). |
| hash map / 19 | hash map (4) | correct. |
| Arpit (lec04/05/06/08 forms) | Arpit (4); arpit; Arbit; Arvit; Arpet; ARPIT's | Teacher = Arpit (project). "Hi, Arbit." 00:27:26, "Yeah, Arvit." 00:20:09, "But Arpet now" 03:03:07 -> "Arpit" (WORD medium). "AODB, ARPIT's outstanding database" 00:43:48 -> "Arpit's" (casing). 00:15:08 teacher "It might seem like Arpit is adding random constraint" = teacher speaking of himself, keep. 00:14:30 STUDENT_1 "I have a bit different of Arpit there." -> keep + `[check: ASR may have garbled "a bit different opinion"]`. |
| REST / gRPC | rest (4) | 01:35:00 "expose a rest endpoint" -> "REST endpoint" (casing). Other "rest" ("the rest file", "rest of") stay. |
| check-in (airline) | checking (4) — AMBIGUOUS | REJECT ("checking the offset"). |
| BookMyShow / ... / IOs | IOS (3) | 02:27:11, 02:41:01, 02:41:21 "disk IOs" -> "IOs" (casing; disk-IO context). |
| WAL (write-ahead log) | wall (3); well (2); val (1) — AMBIGUOUS | "wall" -> "WAL" at 02:53:05 "wall thing goes", 02:53:30 "a separate wall system", 02:53:48 "write it in a wall file" (TERM high: durability/fsync discussion). STUDENT_3 02:12:01 "as soon as it's appended to the well", 02:12:08 "go to the offset in the well", 02:13:45 "go to the val and you go to the offset" -> "WAL" (TERM medium: same turn opened with "write ahead log" 02:11:51). Every other "well" ("as well", "Well, okay") stays. |
| WAL / write-ahead log / 4 | write ahead log (2) | -> "write-ahead log" (hyphen; 00:06:57, 02:11:51). Do NOT shorten to WAL. |
| hyphen | happened (3) | REJECT. |
| read-heavy | read heavy (3) | -> "read-heavy" when adjectival ("a read-heavy operation", "read-heavy searchable system"). |
| Elasticsearch | elastic search (2) | -> "Elasticsearch" (02:40:29). |
| TTL / (REJECTED) TTL | detail (2) — AMBIGUOUS | REJECT ("implementation detail", "one detail there"). |
| graph (database) | grab (2) — AMBIGUOUS | REJECT ("up front grab 1gb space"). |
| linked list / 51; clients / 26; blog / 34; consistent hashing / 45; data movement / 58 | as written | already canonical. |
| B+ tree | B plus tree (1); b plus trees | -> "B+ tree" / "B+ trees" (lec03/lec05 style; 00:20:33, 01:14:19). |
| JSON / JVM / MB / ORM | MP (1) | -> "MB" (see MB row). |
| Martin Kleppmann | Martin Kleppman (1); martin | 02:45:25 -> "Martin Kleppmann" (spelling, TERM high: DDIA storage chapter). "the martin book" 02:46:21 stays as spoken. |
| Memcached | memcache (1) | 00:04:46 "no Memcache" - keep the teacher's word "Memcache" (casing only). Do not change to Memcached. |
| Socket.io / ... / timestamp | time stamp (1) | 02:31:41 "CRC time stamp" - project rule: keep "time stamp" (no join). |
| TIFF (?) | TAPE (1) | REJECT - 02:00:38 "your tape storage" is real (storage hierarchy). |
| flush | flash (1) — AMBIGUOUS | REJECT ("flash memories", 02:25:23). But 02:03:54 STUDENT_1 "if you have to immediately plus it" -> "flush it" (TERM medium: teacher said "immediately flush to the disk" 02:03:47). |
| cores | codes (1) — AMBIGUOUS | 00:47:35 "the JSON decoder decodes curly braces, codes, it's string" -> do not correct; flag `[?quotes \| asr: "codes"]`. |
| image | email (1) — AMBIGUOUS | REJECT ("changelog file over email"). |
| rollback | roll back (1) | verb "roll back" 01:22:47 stays. |
| write-around | write around (1) | REJECT - 01:11:02 "if I write around fruit" = inserting a word near "fruit" (file-IO insert example), not the cache policy. Keep. |
| (REJECTED) trie / ... | tree (1) | see B+ tree row. |

#### B. lec10-specific terms (found while reading the raw)

| Canonical | ASR forms seen | Decision for lec10 (evidence) |
|---|---|---|
| storage engines | standard engines | 00:00:01 "continue our discussion on standard engines" -> "storage engines" (TERM high: "storage engine" 00:03:45; storage week; lec07 open item "storage agents -> storage engines"). |
| portability | quotability | 00:04:56 "around storage query, quotability and seamless updates" -> "portability" (TERM medium: goal stated as "portability" 00:02:28-00:02:54). |
| changelog | change lock; change log | "change lock" 03:04:04, 03:05:10, 03:05:15, 03:05:24-29 -> "changelog" (TERM high: "changelog file" 00:03:36+, 01:15:06). "change log" (01:09:10) -> "changelog" (join, TERM low). |
| Bitcask | BitCask; bitcask; BitCast; bitcast | -> "Bitcask" everywhere (official name; teacher "The database that we just designed is called BitCask" 02:37:28). "BitCask"/"bitcask" = casing (silent). "BitCast"/"bitcast" (02:40:22-02:42:51, 02:41:53, 02:43-02:45, 02:55:24) -> TERM high (non-word in the same Bitcask stretch). One log row per segment. |
| Riak | React; React's | AMBIGUOUS. ONLY in 02:38:17-02:40:29 ("React is a simple key value store and React uses Bitcask as a back-end", "React is a wrapper over BitCask", "React's responsibility is to make BitCask distributed", "react most of them have bitcast as their backend", "react does it with bitcast") -> "Riak" / "Riak's" (TERM medium: Riak is the distributed KV store whose default backend is Bitcask; React.js is not a KV store). "reactive" (polling vs reactive, 01:32-01:51) stays. Confirm with the board. |
| Redis | Radis | 03:00:58 "Radis PubSub" -> "Redis Pub/Sub" (TERM high). |
| cloud provider | Cloud Prodder | 03:00:40 "By default, Cloud Prodder gives you this out of the box" -> "cloud provider" (TERM medium; rolling deployment out of the box; lec04 "crowd providers" precedent). |
| BTRFS | PTRFS | 02:18:59 "PTRFS has its limitation, NTFS has its limitation" -> "BTRFS" (TERM medium; teacher says "BTRFS, NTFS, EXT234" 02:48:40). "EXT234" kept as ASR wrote (= ext2/3/4 spoken as one run; casing only). |
| CSV | PSV | 01:10:02 STUDENT_1 "replace ... the whole line of the PSV" -> "CSV" (TERM medium: the file is the CSV format set up 00:22:11-00:39:09). |
| K1 V1 | K1 B1 | 02:06:30 STUDENT_1 "So put K1 B1" -> "put K1 V1" (WORD high: echoes teacher "put K1 V1" 02:06:23). Key/value labels k1/v1/k2/o2 -> upper-case "K1", "V1", "O1" (casing). |
| lightning fast | lightning pass | 01:52:44 "another database which is lightning pass database" -> "lightning fast" (WORD medium: "super fast db" 01:52:15-01:52:21). |
| Anubhav | Anupak; kyanav | 00:56:18 "the thing that is on it with Anupak" -> "Anubhav" (WORD medium: 00:58:08 "what first Anubhav said, let's put it in a shared storage" = STUDENT_3 00:51:59 proposal). 00:51:56 STUDENT_11 "kyanav" = teacher's call -> flag `[?Anubhav \| asr: "kyanav"]` + SPEAKER Teacher. |
| Hemant | Heman; himan; hey man; Heyman; Amen; heaven | Student name (lec07 Hemant). 00:08:51 "before I move to Heman", 00:09:45 "uh himan", 00:09:24 "hey man" (call leaked into STUDENT_4), 01:24:22 "what Heyman said", 02:11:38 "what hey man had mentioned earlier" -> "Hemant" (WORD medium; teacher says "Hemant" 00:47:04). 02:03:26 "Amen." (call answered by STUDENT_1, whose SSTable/memtable idea STUDENT_3 attributes to "hey man" 02:11:38) -> "Hemant." (WORD medium). 02:43:05 "go on heaven" -> flag `[?Hemant \| asr: "heaven"]`. |
| Rahul | Raul; Raghun | 00:06:55 "Raul, what will be the format" -> "Rahul" (WORD medium: same STUDENT_4 answers "Rahul?" 01:38:03; "Anyone except Rahul" 00:35:31). 00:05:03 "Go on, Raghun." -> keep + `[check: name spelling]` (probably Rahul). |
| (names kept as ASR) | Sidesh; Siddesh; Sitesh | 00:19:57 "Sidesh", 01:34:56 "Sidesh.", 01:50:26 "Sitesh", 02:14:36 "Siddesh", 02:51:51 "Sitesh." - one student (STUDENT_2), project spelling still open -> keep each as ASR wrote + `[check: name spelling]` once per chunk. |
| AODB | AODB | 00:43:48, 00:43:58 teacher's joke file-format name "AODB, Arpit's outstanding database" - keep. |
| HDFS / Athena / NAS / SDK / IDE / SSD(s) / CRC / NTFS / MP3 / MP4 / PDF / TIF / CSV(s) / Lucene / Uber / Oxford / Dell / AWS | hdfs; csvs; ssds; api | casing only ("HDFS", "CSVs", "SSDs", "API", "AWS SDK"). "TIF format" 00:48:39 kept (valid spelling). |
| LSM trees | lsm trees | casing (02:43:12, 02:45:13). |
| range reads (spoken "random read", "read at") | as written | keep as spoken ("do a read at", "random read"). |

#### C. Flag-only (do not correct; marker in transcript)

| ASR text | Time | Marker |
|---|---|---|
| "caching, matching and all" | 00:02:18 | `[?batching \| asr: "matching"]` |
| "Apple or MSN" | 00:24:24 | keep + `[check: "MSN"]` |
| "TPT format, PDF format" | 00:47:53 | `[?PPT \| asr: "TPT"]` |
| "not ready to oblique the data across" | 00:58:16 | `[?replicate \| asr: "oblique"]` |
| "Subha. I'll just pull in in a minute." | 00:57:42 | keep + `[check: name spelling]` |
| "DD dash rotten over here" | 01:16:37 | `[?written \| asr: "rotten"]` |
| "magnet is discard best for that" / "why magnet is discard best for append only thing?" | 02:05:03, 02:05:08 | `[unclear: "magnet is discard best"]` (magnetic disk is the best?) |
| "the first metric removes over" | 02:12:57 | `[unclear: "the first metric removes"]` |
| "BitCask is an embedded database S-FM." | 02:37:54 | `[unclear: "S-FM"]` |
| "hash paste, consistent hashing" | 02:38:57 | `[unclear: "hash paste"]` |
| "see it in IT" | 02:39:56 | `[unclear: "see it in IT"]` |
| "The artist is getting flushed." | 02:55:49 | `[unclear: "The artist"]` (dirty page / buffer?) |
| "Hussain Nasir" | 02:55:29 | keep + `[check: name spelling]` (project "Hussain Nasser" open question) |
| "have APIs Expos and whatnot" | 03:01:02 | `[?APIs exposed \| asr: "APIs Expos"]` |
| "Thanks sir. ... No, Dan, no pop-up allowed." | 03:01:27 | keep + `[check: name / "Thanks sir"]` |
| "merging ... becomes order and operation" | 03:05:29 | `[?order n \| asr: "order and"]` |
| "AWS S3 Athena will build a multi-tiered storage, a cost efficient auto solution for Amazon next week" | 02:58:42-02:58:46 | keep + `[check: garbled list of next-week designs]` |
| "So that's why my team." (STUDENT_5) | 02:57:37 | `[unclear: "So that's why my team."]` |
| "It may be a good, but not very good." | 00:11:26 | keep (RATE only) |
| "Did you mean cron job, batch job?" / "See, batch job is batch processing." under STUDENT_1 | 01:06:24-01:06:31 | teacher interjections inside Vikram's turn -> SPLIT/SPEAKER if clear, else keep |

#### D. lec10 Pass 5 additions (lead reconciliation of chunk notes, 2026-10-13)

| Canonical | ASR forms seen | Decision for lec10 (evidence) |
|---|---|---|
| Parquet / Avro | paracet; parquet; avro | 00:16:38 "famous paracet" -> Parquet (TERM high; teacher "parquet, avro" 00:17:08, 00:18:37, 00:47:11). Casing "Parquet", "Avro". |
| MB / MBs | MVs; mbp (add to row A "MB") | 00:26:31 "iterating around MVs of data" -> MBs (TERM medium); 02:52:48 "1 mbp" -> "1 MB" (TERM medium). |
| offset | !opposite | 00:27:54 only (index-offset sentence, TERM high). Real word elsewhere. |
| disk IO | disk.io | 00:13:41 (TERM high). Teacher's "I.O." at 02:28 left as ASR wrote. |
| changelog | change law (add to row B) | 01:17:34 (TERM high). |
| metadata / meta.json | matter data; matter dot Jason | 01:30:01 -> metadata; 01:38:46-01:38:59 -> "meta dot JSON" (spoken "dot" kept), TERM high. |
| hash table | hashtag | 02:13:12 "memory hashtag" -> hash table (TERM medium). |
| merge and compaction | merger compaction; Merger Compaction; margin complexion; merger compact | 02:22:29, 02:22:51, 02:32:24, 02:34:17 (TERM medium/high). "mergers and compaction" 02:35:14 and "this merger" 03:03:23 = real words, keep. |
| Bitcask | bitcars (add to row B) | 02:41:29 (TERM medium). |
| Hemant | Hey, man (01:18:26) | teacher's call, Student 1 answers -> "Hemant." (WORD medium, row B pattern). |
| (kept as spoken) | network attached storage; get object; graveyard entries; blindfoldedly; file rotation; sawtooth pattern; Hudi; Hive; Jenkins; data lake | correct or teacher/student's own words; casing only. |
| (flag only, new) | marshaling (unmarshaling?) 00:05:26; breaking (bringing?) 00:05:58; score (store?) 00:07:23; the trees (B-trees?) 00:09:32; starting/start (sorting/shard?) 00:12:50-00:13:07; downturn (downtime?) 01:19:25; graduated (uploaded?) 01:21:49; reactor (reactive?) 01:35:06; bursting (versioning?) 01:40:44; a stone process (tombstone?) 02:08:10; torque 02:21:07; fedis 02:26:26; backlit disk 02:41:13; bit custom repetition 02:51:07; keep on the keeper 03:05:00 | chunk agents placed `[?...]`/`[unclear]` markers; left for listening. |

New student names (calls answered right after; `[check: name spelling]`): Anmol (00:37:11 -> STUDENT_10 = `Student 10 (Anmol)`), Amrita (00:40:10, 01:33:59 -> STUDENT_3 = `Student 3 (Amrita)`), Jodhinda (01:12:50 -> STUDENT_3 = `Student 3 (Jodhinda)`; project "Jodhinder"/"Jyotinder"), Abdur (01:29:22 -> STUDENT_8 = `Student 8 (Abdur)`), Mohit (02:46:31 -> STUDENT_1). STUDENT_3 therefore mixes Anubhav, Amrita and Jodhinda; un-called STUDENT_3 turns stay plain `Student 3`.

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
| Arpit (lec06) | Arpit | lec06: addressed as "Arpit" 01:03:21, 01:19:15 ("Hi Arpit"), 02:13:34, 02:55:29 (all STUDENT_2 label). Label stays "Teacher". |
| Chandan | Chantan; Chandan | lec06 00:51:44 "Chantan, what's wrong in this?" and 02:55:27 "Chandan, go on" -> both "Chandan" (WORD medium; lec05 Chandan). |
| lec06 student names | Shriya (00:51:39), Chandan, Priyanka (00:53:05), Mohit (00:54:02 "Mohit gone" = "Mohit, go on"), Sitesh (01:00:35, = lec05 Sidesh?), DK (01:19:10, 02:43:21), Rahul (01:52:52), Vishal (01:52:13), Gaurav (01:34:52), J.K. (02:55:26 "Thanks, J.K." - maybe DK) | Same attach rule (name only on the turn right after the call). "Mohit gone" -> "Mohit, go on." is WORD medium. "J.K." kept + `[check: name spelling]`. |
| Justin Bieber / poet.so / Flask / Django / NGINX / Facebook / Twitter / LinkedIn / GitHub issues / DiceDB / Slack | as written | lec06 examples; casing only. DiceDB = teacher's open-source project (00:16:40). |
| lec06 student names (added Pass 5) | Sunil (00:45:02); Jyothi (00:47:32); Shreya/Shriya (00:49:38 / 00:51:39, same student, `[check]`); Harsh (01:32:56); Anubhav (Anubhaf, 01:53:37 -> Anubhav); Vikram (01:49:10, 02:42:13); Alok (01:56:02, "Alok sir"); Pankaj (02:28:11); Sitesh (Silesh, 01:00:04 -> Sitesh); Sandy (02:19:28, `[check]`, Sandeep?); Heman / Heyman / "Hey man" (00:36:13, 01:14:12, 02:25:36 - Hemant?, open); "Chandran Anubha" (01:23:05, `[check]`); "Chalda" (01:33:50, unclear) | Same attach rule. |
| opengraph.githubassets.com / githubusercontent.com / Cloudinary / Akamai / PIL | as written | lec06 casing/joins only. |
| edge.arpitbhayani.me (?) | edge.arbitpending.me; edge.arpeedbhany.me; edge.arkipani.me | teacher's CDN demo host from the previous class; same open question as arvizhany.me - flagged each time, not corrected. |
| lec07 student names | Rahul, DK, Rajiv (Raji), Hemant, Nitin, Gaurav, Shreya, Mohit, Anupam | Teacher calls: Rahul 00:20:03, 01:10:15; DK 00:28:42, 02:50:21; Rajiv 00:31:29, 00:58:14, 02:39:05, 03:07:19; Hemant 00:33:58; Nitin 00:42:49, 01:45:29, 02:32:47; Gaurav 00:45:47, 02:38:55, 02:48:09, 02:57:26; Shreya 01:04:03, 02:57:12, 03:04:32; Mohit 01:11:31; Anupam 01:50:15 (named, no turn). Same attach rule (name only on the turn right after the call). |
| Golang | GoLine | lec07 01:18:35 "Redis code walkthrough and implementation in GoLine" (teacher's Redis-internals course). TERM medium. |
| Percona / Kademlia / IPFS / BitTorrent / Wikipedia / Amazon / Zoom / Google Drive / Facebook | as written | lec07 examples; casing only. |
| Arpit Bhayani / arpitbhayani.me | Arpitbani; Arpitbani.me | lec07 02:21:38-02:21:40 "Arpitbani.me slash consistent hashing", "Google search Arpitbani consistent hashing" - very likely the teacher's full name / blog domain. Flag-only in lec07 (`[?arpitbhayani.me \| asr: "Arpitbani.me"]`); confirm with the board before correcting. |
| Jodhinder (lec02/05) = Jyotinder (lec07)? | Jyotinder; Chathindar; Jodhinder | lec07 00:47:49 "before I move to Jyotinder" - kept as ASR + `[check: name spelling]`. Project spelling still open. |
| Anubhav | Anubhaf | lec07 02:48:20 teacher call "Anubhaf, go on" -> "Anubhav" (WORD medium, project lec06 precedent 01:53:37); STUDENT_5 answers 02:48:22 ("Hey, Arpit") = Student 5 (Anubhav). |
| Grafana / Metabase / Tableau / Redshift / BigQuery / Google Analytics / Flask / Axios / Node.js / Spring Boot / Protobuf / Boost / Redis Sentinel / Kademlia / IRC / NFTs / Bitcoin | as written | lec07 examples; casing only. |
| Arpit (lec08) | arpit; Arpit | lec08: students address the teacher "arpit" 02:35:49, "Hi, Arpit" 02:38:50-02:38:51, "Hey, Arpit" 03:32:51 -> capitalise "Arpit". Never a label. |
| lec08 student names | Rahul (00:05:13), Aditi (01:06:25), Shalendra (01:10:17), Gaurav (01:32:03, 02:47:41), Shreeram (01:56:52), Heyman [check] (01:58:59), Sampai [check] (02:44:57), Sidesh / Sitesh (02:59:48, 03:15:40, 03:32:49 - same person, spelling [check]), Sunit (03:04:05), Harsh, Josh (03:22:00), Rajeev (03:23:24), DK (03:27:41) | Same attach rule: name only on the turn right after the teacher's call (e.g. `Student 6 (Shalendra)` 01:10:19, `Student 4 (Aditi)` 01:06:27, `Student 3 (Sitesh)` 03:32:51). The call itself often leaks into the student label - SPLIT to Teacher. Added after the chunk pass: Rajiv (00:38:08, 02:17:09; = Rajeev 03:23:24? spelling [check]), Anupab (00:33:30 [check], lec03 "Anupam"), Anubhav (01:15:38) and Anwar (01:20:42) - both answered by STUDENT_7, Rahul (01:23:08, 03:28:44), Alok (01:34:52 [check]), Akshay (01:35:29, 02:11:49 - not attached), Shreya (01:41:04) / Shriya (01:47:00) - both STUDENT_8, probably one person, kept as ASR wrote, Salpolio [unclear] (02:11:46). |
| Facebook / Twitter / Instagram / WhatsApp / TikTok / Ubuntu / Docker / Kubernetes / Redshift / BigQuery / AWS / Google / Chubby (Google paper) | as written | lec08 examples; casing only. |
| Arpit (lec09) | Arpit; Arfit | students address the teacher "Hi Arpit" 00:24:50, 00:57:47, 02:48:50; "Arpit" 00:30:04, 03:03:37, 03:24:22; "Arfit" 02:36:28 -> Arpit (A#28). Never a label. |
| lec09 student names | Rahul (00:22:43 "Go on, Rahul."), Gaurav (00:30:02 "Go on Gaurav."), Sandeep (00:31:30, 02:11:56, 02:19:47), Anubhav ("Anubav" 00:35:12 -> Anubhav, WORD medium, project spelling), Amrit (01:39:48 "Yes, Amrit."), Harsh (01:43:54), Rajiv (01:44:51; "rajay" 03:22:21 flagged), Mohit (02:10:59 "Let me pull in Mohit. Mohit got." = "Mohit, go on"? -> keep "Mohit got." + `[check]`; 02:41:49), Mohan (02:30:59, 02:40:04, 02:40:31, 02:40:50, 02:57:00), DK (02:19:24, 03:03:35, 03:24:21) | Same attach rule: name only on the turn right after the teacher's call. Mohit vs Mohan = two different students (Mohan's Kafka-partition question 02:37:51 under STUDENT_4; Mohit's questions 02:11:04 STUDENT_1 and 02:41:51 STUDENT_3) - keep both spellings as ASR wrote. |
| lec09 student names (added Pass 5) | Anamal (00:24:45 call, = lec05 Anamol? STUDENT_6 00:24:50, label kept plain `Student 6`); chira / Chirak / siraq (00:37:23-00:40:24, probably Chirag; credited with the pre-signed URL proposal; Student 1 turns 00:37:29+ unnamed); Devashish (00:57:12, STUDENT_1 00:57:15); Prashant (01:03:47 "Prashant Raji" = Prashant, Rajiv? `[check]`) | Kept as ASR wrote + `[check: name spelling]` where flagged; no speaker relabel. |
| Instagram / Django / Celery / RabbitMQ / Postgres / Memcache / Facebook / ChatGPT / Rust / Golang / Akamai / Cloudflare / CloudFront / Route 53 / GoDaddy / Namecheap / Netflix / Udemy / Uber / GitHub / Bing / Spark / Hadoop / Flume / O'Reilly / Google Analytics / Hotstar / New Relic / Datadog | as written (after A-row fixes) | lec09 examples; casing only. |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | |
| ki | ki | lec09 02:58:21 "you can tell kafka ki hey i am this consumer" - second Hindi word in lec09; keep as spoken. |
| pehle | pehle | lec09 03:21:09 "pehle let's accept the rights ..." - only Hindi word seen in lec09; keep as spoken (house spelling), do not translate. |

## Speaker map

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 76% talk time, 180 words/turn, explains, runs class |
| STUDENT_1 … STUDENT_18 | Student N (keep the number, e.g. STUDENT_3 -> **Student 3:**) | short turns, questions, propose solutions when teacher asks. Diarization may be wrong: if a "STUDENT_n" line is clearly the teacher continuing an explanation (same thread, teacher-style, e.g. "okay so what X suggested..."), relabel to Teacher and log SPEAKER. If a TEACHER line is clearly a student question, use **Student?** (or the student number if evident) and log SPEAKER/SPLIT. |

Same teacher in lec02: TEACHER = Teacher (86.1% talk, 211 words/turn); STUDENT_1..STUDENT_17 -> Student n. Back-channel rule (lec02): a one-word "Correct."/"Right." under a STUDENT label inside that student's own explanation is often the teacher; relabel only with clear evidence (student asked "right?"), else leave.

Same teacher in lec03: TEACHER = Teacher (92.2% talk, 301 words/turn); STUDENT_1..STUDENT_10 -> Student n. Mixed labels in lec03: STUDENT_2 (Jay / Aditi / Chathindar?), STUDENT_3 (DK / Mohit / Pankaj), STUDENT_9 (teacher + students; decide per turn). Teacher name-calls often leak into the next student's segment ("Rajiv." / "Jay?") -> SPLIT to Teacher.

Same teacher in lec04, but diarization differs: TEACHER (45.1%) AND STUDENT_1 (43.6%) are BOTH the teacher (label split mid-sentence) -> relabel STUDENT_1 to Teacher, one SPEAKER log row per chunk. STUDENT_2..STUDENT_8 each mix several students and often begin with the teacher's lead-in ("great question amrita yeah so my question...") -> SPLIT. STUDENT_9 01:58:44-01:59:17 = teacher's battery/mic aside (`Teacher?`). STUDENT_10/11/14/15 = short interjections (`Student?` unless clear). Always check the speaker_stats for a split teacher before assuming TEACHER is the only teacher label.

Same teacher in lec05: TEACHER = Teacher (79.7% talk, 149.5 words/turn); STUDENT_N -> Student N. STUDENT_8 is mostly the teacher (poses questions, calls names, evaluates answers) -> relabel per turn with context (SPEAKER), else `Student?`. STUDENT_1 / STUDENT_2 / STUDENT_6 mix several students (teacher calls Sandeep/Ajay/Simran and STUDENT_1 answers) -> names only on the turn right after a call. Diarization boundaries often lag a speaker change by a phrase -> SPLIT at grammar boundaries.

Same teacher in lec06: TEACHER = Teacher (79.2% talk, 158.8 words/turn, only teacher label); STUDENT_N -> Student N. Teacher name-calls and short prompts ("DK.", "Rahul?", "Mohit gone" = "Mohit, go on", "Correct.", "Brilliant.", "Do you really need this?") leak into the next student label -> SPLIT/SPEAKER. STUDENT_2, STUDENT_4, STUDENT_7 mix several students (Chandan / DK / Sitesh; Mohit / Vishal / Rahul / Pankaj; Shriya / Priyanka) -> names only on the turn right after a call. STUDENT_9 / STUDENT_11 / STUDENT_13 = back-channel -> `Student?` unless clearly a student turn.

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

### lec08 speaker map (same teacher, Arpit)

Same teacher (Arpit). Source: speaker_stats.md + raw stretches 00:00-00:16, 01:04-01:14, 01:59-02:11, 03:30-03:36,
plus every STUDENT_5/9/11-20 line and the STUDENT_1-10 lines.

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 81.2% talk, 194 words/turn; opens class ("Week number three, day first"), runs feedback/admin, explains, calls names ("Aditi." 01:06:25, "Yes, Shalendra." 01:10:17), announces break 01:59:39, closes "See you tomorrow morning. Bye bye." 03:36:34. |
| STUDENT_1 | Student 1 (mixes several students + teacher leaks) | Real student turns: 01:04:43 question (LB connection count), 02:38:50 "Hi, Arpit ... red log", 02:45:00 sync principle, 03:04:08 queue question, 03:06:15 DNS / active-passive, 03:11:09 CoreDNS round robin, 03:13:00 Prometheus. TEACHER LEAKS (relabel Teacher, log SPEAKER/SPLIT): name calls "Gaurav?" 01:32:03, "Heyman." 01:58:59, "Gaurav." 02:47:41, "Sunit." 03:04:05; "I'll take three questions now. People who have not spoken..." 01:54:13-01:54:19; teacher answers inside student turns ("If you can take care of TTL, your problem is MySQL" 02:39:06, "Otherwise there will be perpetual lock" 02:39:36, "Implementing mutex is two lines of code in C. That's it." 02:48:42, "No, network is much more costly any day..." 02:49:02-02:49:05, "Look here. How many times are you making network call?" 02:49:12-02:49:16, "No, no, no. That's not what I said." 03:06:43, "What you are not able to understand?" 03:11:01, "Which algorithm? Be specific on that." 03:12:02, "Prometheus is for vital checking." 03:13:07, "Wait." 03:14:03, "That's what the leader election." 03:16:35). Decide per turn; doubt -> `Student?`/`Teacher?`. |
| STUDENT_2 | Student 2 | 00:38:12 browser-close question, 01:54:20 local DNS cache, 01:55:46 CoreDNS down, 02:35:49 "arpit ... network locking via port", 02:50:12 Redlock 5 instances, 02:56:24 implementation/papers, 03:24:02 orchestrator. Teacher leaks: "How this, that's your business logic." 00:38:52, "No." 00:39:23, "You can very well implement it. When the TCP breaks off..." 00:39:39-00:39:46, "No, no." 02:58:06 -> SPLIT to Teacher. |
| STUDENT_3 | Student 3 (Sitesh / Sidesh) | 00:35:42 least-connection question, 02:11:54 synchronized block, 03:00:05 ZooKeeper question, 03:15:44 orchestrator SPOF, 03:17:31 CoreDNS question, 03:32:51 "Hey, Arpit ... autoscaling" (teacher called "Yes, Sitesh." 03:32:49). "Sidesh" 02:59:48 = teacher's call leaked -> SPLIT to Teacher. Leaks: 03:16:06 "No, no, no." / 03:33:27 boundary lag -> SPLIT at grammar boundary. |
| STUDENT_4 | Student 4 (Aditi at 01:06; later turns may be other students) | 01:05:46 REST question, 01:06:27 "Yes. I'm a little confused..." right after teacher "Aditi." -> `Student 4 (Aditi)` for that turn. 01:23:10 config-push proposal, 01:34:55 CloudWatch, 02:12:25 lock proposal, 02:42:18 Redis-queue doubt, 02:49:38 mutex question. Leaks: "That's a good one. CloudWatch is that. You do it manually." 01:35:18-01:35:23 = teacher -> SPLIT. |
| STUDENT_5 | MOSTLY TEACHER -> relabel per turn to Teacher (log SPEAKER) | 00:08:44-00:09:00 "I have two systems in mind where I will be taking those breaks ... Those were it. I received two early notes" = teacher finishing feedback; 00:35:36 "please raise your hand the next time"; 01:09:38 "let me open up, I'll also copy this for my reference"; 01:56:52 "Yeah, Shreeram." (call); 02:36:46-02:38:48 "that's a brilliant idea, I loved it ... do that do that"; 02:58:36 "180 repos on GitHub. Think how many things I've implemented."; 03:08:40 "DNS is a stupid service"; 03:15:40 "Sitesh."; 03:22:00 "Harsh, Josh."; 03:23:24 "Uh, Rajeev."; 03:31:13-03:31:32 "Brilliant discussion ... Think about it."; 03:32:39-03:32:47 "Let's keep life simple. Great."; 03:34:09; 03:36:08. EXCEPTION real student: 01:59:01-01:59:13 "So here you gave one domain name for one service as an example ... will every LB server be load balancing for all the services" (teacher answers 01:59:18) -> `Student?`. 03:29:22 "How is less health endpoint send something?" -> decide in context (student question vs teacher), default `Student?`. |
| STUDENT_6 | Student 6 (Shalendra) | 01:10:19-01:15:23 config-storage brainstorm right after "Yes, Shalendra." 01:10:17. Teacher leaks inside: "So what would you store?" 01:10:23, "Correct." 01:13:42, "You're killing it today." x2 01:13:44 (also REPEAT-SEG), "Okay. Brilliant." 01:13:45-01:13:46, "Correct." 01:13:52, "What would it health check on?" 01:14:32, "For all requests 200?" 01:15:03 -> SPLIT to Teacher. |
| STUDENT_7 | Student 7 | 00:33:32 persistent-connections question, 01:15:54 TCP-ping health check, 01:20:46 polling vs reactive, 02:13:39 same-machine process. One voice, consistent. "Not really." 01:16:15 / "Got it." 01:21:47 check context. |
| STUDENT_8 | Student 8 | 01:41:07-01:48:55 DNS-mapping answers; 03:08:50 session-handling question (possibly another student - keep Student 8 unless evidence). "Okay. Are all load balancers public?" 01:42:07 = teacher question inside -> SPLIT. |
| STUDENT_9 | MOSTLY TEACHER -> relabel per turn | Teacher: "Sampai." 02:44:57, "Excellent. Anything over a network." 02:45:51, "What do you mean by distributed system? That's a very vague term." 02:46:17, "You don't need [?Redis] for that." 02:50:03, "We added a hypothetical concept..." 03:04:21, "It's not fine. Orchestrator went down. How do you solve it?" 03:16:06, "Any other question? Anyone? Yes, Sitesh." 03:32:48, "That's very much proxy." 03:28:14. Student-like (keep `Student?`): "Connection pooling." 01:34:48, "What is this telemetry agent? Where it is installed? What it does?" 01:35:44, "Actually, this was the first paper I read." 02:32:55 (teacher says "So Chubby was the first paper I ever read" 02:32:57 - likely teacher, decide in context), one-word "Yeah."/"Correct."/"Okay."/"Round robin." -> `Speaker?`-level, default keep `Student?`. |
| STUDENT_10 | Student 10 | 01:56:55 public vs CoreDNS question, 01:57:58, 03:30:38 "Is it implemented that way?", 03:34:22 "who monitors orchestrator". |
| STUDENT_11 | Student 11 (Harsh or Josh - teacher called "Harsh, Josh." 03:22:00; do not pick) | 03:22:02-03:22:43 authentication question. |
| STUDENT_12 | Student 12 | 01:35:34 "Yeah."; 02:13:09 "introduce a layer in between" proposal. |
| STUDENT_20 | Teacher? | 03:22:12 "What do you want to authenticate?" = teacher's clarifying question (student 11 repeats it 03:22:13, REPEAT-SEG) -> `Teacher?`/Teacher with SPEAKER log. |
| STUDENT_13, STUDENT_14, STUDENT_15, STUDENT_16, STUDENT_17, STUDENT_19 | Student? (one-word back-channel) | "Thank you." 02:50:08/02:59:45 (13), "Thanks." 00:38:06 (14), "All right. Yeah." 03:06:09 (15), "Okay." 01:11:19 (16), "No." 03:31:45 (17, answers teacher's question -> student), "Right?" 00:35:22 (19). Keep as `Student?` (or merge into context if clearly the teacher's own tag). |

Diarization boundaries lag speaker changes by a phrase (e.g. 01:09:38 "what we are doing right okay" teacher text under STUDENT_5; 01:13:11/01:13:25 Shalendra vs teacher mid-segment; 03:33:27, 03:34:09) -> SPLIT at grammar boundaries, log SPLIT.

### lec09 speaker map (FROZEN — this is the map for this lecture)

Same teacher (Arpit). Evidence: speaker_stats.md + raw stretches 00:00-00:09 (start), 00:57-01:03 (~1 h),
01:44-02:00 (break / ~2 h), 03:20-03:26 (end), plus every STUDENT_1..STUDENT_15 line and every teacher name-call.
One teacher label, no lec04-style split: TEACHER = 85.7% talk, 130 turns, 225.5 words/turn. BUT in lec09 the
TEACHER label also swallows several whole student questions (Q&A turns right after a name call) and two student
labels (STUDENT_5, STUDENT_7) are mostly the teacher.

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | opens "Great week 4, day 1st, it's about social networks" 00:00:02, explains CDN / upload / hashtag designs, calls names, announces break 01:47:21 ("take a break till 10.55"), closes "Thanks, folks, for tuning in. See you folks tomorrow" 03:25:58-03:26:29. **Student turns under TEACHER (relabel, log SPEAKER/SPLIT):** 00:30:04 "Arpit, can CDN cache live content like ... live matches on hot stuff?" = `Student (Gaurav)` (after "Go on Gaurav." 00:30:02; next label unknown -> `Student?` number, name in parentheses); 00:57:47-00:57:56 "Hi, Arpit. So Arpit, my question is, in the URL ... trying to upload the image to the SD server. So from where that CDN URL has been generated." = student (continues under STUDENT_5 00:58:44 "front end know what URL to enter") -> `Student?`; 01:44:53 "How does the image service know that what is the nearest CDN to a user?" = Rajiv (after "Go on Rajiv." 01:44:51) -> `Student? (Rajiv)`; 02:19:29-02:19:33 "Sorry, I wanted to ask some questions later. After this, after this." = DK answering "DK?" 02:19:24 -> `Student? (DK)` (then 02:19:33 "We have changed the context." onward = teacher, decide boundary in chunk); 02:48:50-02:49:xx "Hi Arpit. So Arpit first, my first question is related to the DB here." = student -> `Student?` (read to the teacher's answer); 03:03:37 "So Arpit, I have a question related to the SLA here." (after "DK?" 03:03:35) -> `Student? (DK)`; 03:21:26-03:21:38 "So, uh, you have mentioned that we can use a dead letter queue ... does Kafka also has its own dead letter queue?" = student (teacher answers 03:21:44; teacher later says "thanks rajay" 03:22:21) -> `Student?` (name only as flag `[?Rajiv]`); 03:22:06-03:22:13 "We rather can put it in our database also if we are not using transition outbox pattern." / "Okay, yes." = same student interjecting -> SPLIT `Student?` (teacher: "Sorry? Either way. Basically transaction outbox pattern is what you are talking about."); 03:24:22-03:24:33 "Just a small question, Arpit. So I never got a chance to work on data engineering problems ... I can start with Spark." (after "DK?" 03:24:21) -> `Student? (DK)`; 03:25:29 "okay thanks" = DK -> `Student?`. Decide each boundary at grammar breaks. |
| STUDENT_1 | Student 1 (mixes several students; name only after a call) | Real student turns: 00:22:44-00:23:30 CDN-for-private-content question = **Rahul** (after "Go on, Rahul." 00:22:43); 00:31:31-00:32:53 blob storage / persistent-connection proposal = **Sandeep** (after "Sandeep?" 00:31:30); 00:35:16-00:39:13 upload-failure + pre-signed URL proposal = **Anubhav** (after "Anubav, what's the problem in this approach?" 00:35:12); 00:57:15 content-moderation question; 01:39:52-01:41:48 OTT/DRM questions = **Amrit** (after "Yes, Amrit." 01:39:48); 02:00:23-02:02:43 storage-schema answers; 02:11:04-02:14:40 Redis Pub/Sub per hashtag / sharding proposal = **Mohit** (after "Let me pull in Mohit." 02:10:59); 02:19:48-02:21:52 top-100 flow = **Sandeep** (after "Sandeep?" 02:19:47); 02:36:28-02:37:11 read/write-path separate-services question ("So, Arfit"). TEACHER LEAKS (relabel Teacher): 00:32:57 "How big is your image?", 00:37:36 "What are pre-signed URLs?", 01:42:28 "Basically, you became white hat hacker." (teacher's own story 01:42:00-01:42:19 -> likely Teacher, `Teacher?` if unsure). 01:22:42 "Yeah, Azure window is not visible." = a student telling the teacher the screen is not shared -> keep `Student 1`. 00:37:51 "no, no, no, no, no, no, no" LOOP (see notes). |
| STUDENT_2 | Student 2 (mixes several students + teacher leaks) | Real student turns: 01:02:09 S3 signed-URL question, 01:04:58-01:05:31 post schema, 01:44:57? (see below), 01:46:13-01:46:54 S3 location question, 01:57:04-02:00:06 hashtag/tag table + top-100 array, 02:51:20-02:56:53 SLAs / stateful components / leaderless, 03:11:37-03:13:48 hashtag GC question, 03:14:12-03:15:21 1M images, 03:15:25-03:18:22 paginated store + Kafka just for counting + Kafka as storage, 03:19:50?, 03:22:30 batching question. TEACHER LEAKS (relabel Teacher, log SPEAKER/SPLIT): 01:44:57 "I mean, that's CDN internal." (teacher repeats "That's CDN internal." 01:44:59 and continues - default Teacher); 01:58:52 "we don't have to care that's what i said why are you assuming" (mid-segment split), 01:59:08 "What will you store in this array?"; 03:11:56 "GC is what?" (student answers "Garbage collection. Sorry." 03:11:58-03:11:59); 03:14:54 "You said how many?"; 03:15:04-03:15:10 "You just scaled your requirements by ... FYI."; 03:15:17 "Correct." / 03:15:18 "Let's do it."? (decide in context); 03:16:31 "Correct."; 03:18:27 "Kafka does not give you that database has transaction properties." (teacher's line, repeated 03:21:44); 03:19:50 "Ingestion high ingestion rate was the use case." (likely teacher summarising - `Teacher?`); 03:22:30 "from the previous one or the new one" = teacher asking, then "no no this is a new one uh for batching i had read about" = student, then 03:22:35 TEACHER "map reduce do we cover..." starts mid-question (student) -> SPLIT at grammar boundaries. |
| STUDENT_3 | Student 3 (Mohit on 02:41:50-02:46:23) | 02:41:49 "Mohit." = teacher's call leaked -> SPLIT to Teacher; 02:41:50-02:42:33 popularity-service adapter question and 02:43:06-02:46:23 Redis Pub/Sub vs Kafka question = **Mohit**. One voice, consistent. |
| STUDENT_4 | Student 4 (Mohan) | 02:37:51-02:39:36 Kafka-partitioning / counting-server question (teacher: "What are you asking Mohan?" 02:40:04, "It's not being sharp Mohan." 02:40:31) = **Mohan**; 02:40:18-02:40:26 "not everybody is as sharp as you ... please don't disperse the questions" = Mohan; 02:57:02-02:59:48 Kafka retention question after "Yes, Mohan?" 02:57:00 = **Mohan**; 03:01:20-03:01:37 retention horizon. Leaks: 02:38:39-02:38:52 run-on segments mix teacher ("that's how kafka works ... yes no wait wait") -> SPLIT at grammar boundaries; 02:40:26 "No, I'm not disperse the question." = teacher replying -> SPLIT/`Teacher?`; 02:58:42 "showing something that i cannot no it's there on the screen is it not there" = screen-share exchange (mixed) -> SPLIT with care; 03:01:36-03:01:37 "Big difference. Big difference." = teacher answering ("Is that a big difference?") -> Teacher. |
| STUDENT_5 | MOSTLY TEACHER -> relabel per turn to Teacher (log SPEAKER) | Teacher calls/prompts: "Sandeep?" 00:31:30, 02:19:47; "Okay, great. Anubav, what's the problem in this approach?" 00:35:10-00:35:12; "So are you saying it will upload directly to S3? Yes." 00:38:38-00:38:40; "No, it does not. It has AWS access keys and secret keys." 01:02:50; "OTT will talk later." 01:40:09; "That's exactly. That's the black box for us. Why would we know which server to go to?" 01:46:56-01:46:58; "So this is your post service where the post is made. You push it to Kafka." 02:07:19-02:07:22; "go over here? Now start." 02:12:27; "It's a simple server processor service service. It's not a service." 02:21:39; "What service are you talking about?" 02:36:52; "you were talking about read path and write path this is that only ..." 02:36:58; "Persistence and speed of consumption." 02:45:14; "Right." 02:47:12; "MySQL gives you, DynamoDB gives you both of them." 02:49:49; "What you need to know is dead letter Q." 02:54:46; "For hashtag service?" 03:11:49; "But then you show that number to investors and ask for more money." 03:13:42; "You are not doing it for persistent just to count valuable information. It can be picked by other services" 03:16:58-03:17:05. EXCEPTIONS (keep student): 00:23:34 "Don't jump." (could be either -> `Speaker?`... default `Teacher?`); 00:58:44 "front end know what URL to enter." = end of the 00:57:47 student question -> `Student?`; 01:46:36 "So why would we need to know the disk where S3 is storing it?" = teacher probing Student 2 (Student 2 replies "No, no, that's not the question") -> Teacher; 02:41:43-02:41:47 "And then that's how we move forward. Right. Sure. Thank you." = end of Mohan's exchange -> `Student?` (decide in context). |
| STUDENT_6 | Student 6 | 00:24:50-00:26:06 "Hi Arpit. ... how would the user know about the CDN URL?" (no name called); 02:07:03-02:09:45 hashtag batching / partition-key proposal ("User idea" -> user ID, A#20); 02:48:44-02:48:45 "Got it. Thank you." One voice. Possible teacher leak: 02:07:06 "Correct." / 02:09:45 "Correct." inside the student's run -> teacher back-channel, SPLIT only if clear, else leave. |
| STUDENT_7 | MOSTLY TEACHER -> relabel per turn | Teacher: 01:39:48 "Yes, Amrit." (call); 01:54:50 "let's start with the second half just confirming if mic and speaker are correct yeah okay" (admin); 02:56:56-02:57:00 "You get some, you lose some. Right? Okay. Great. Yes, Mohan?"; 03:11:27 "... also need 20 mb extra right you need that yeah yeah sure thanks for that thank you" (mixed: teacher answer + student thanks -> SPLIT at "thanks for that"); 03:15:23 "Now,"; 03:18:32 "lookups get a post by id will you be able to do that on kafka no not this use case ..." (teacher); 03:21:13 "do with that great i'm excited for that question okay any other question anymore" (teacher). Student-like back-channel (keep `Student?`): 02:40:17 "Okay.", 02:51:14 "Got it. Got it. Got it. Yeah.", 03:03:06 "Okay. Thank you.", 03:03:32-03:03:33 "Makes sense. Thank you." (03:03:34 "Great." = teacher), 03:15:22 "Okay.". 01:54:29 "Thank you." = HALLUCINATION (see notes). |
| STUDENT_8 | Student 8 | 02:46:46-02:47:18 popularity service via webhooks instead of separate Kafka question; 01:40:51 "Okay." back-channel. |
| STUDENT_9 | Student 9 (Harsh on 01:43:57 turn) | 01:43:57-01:44:47 storage-wasted / why-Kafka question = **Harsh** (after "Yes, Harsh?" 01:43:54). 02:11:46 "right" back-channel -> `Student?`/leave. |
| STUDENT_10 | Student? (back-channel; some teacher) | "Got it." 01:00:59, 01:01:36, 02:51:02; "Right, right." 02:50:54 = student back-channel. 00:34:43 "Yes, that's correct." = likely teacher confirming Student 1 -> `Teacher?`; 01:22:05 "inspect" = teacher (browser inspect demo) -> Teacher; 03:16:46 "I mean, I was thinking, I was thinking like," = Student 2's voice continuing (03:16:50 STUDENT_2) -> `Student?`. |
| STUDENT_11 | Student? | "Okay. Got it. Thank you." 00:29:58-00:29:59 (answer to Gaurav-era question - student thanks), 01:41:23 "Okay.", 02:53:19 "Number of workers. Yeah." (student answering), 02:54:49 "Okay.". |
| STUDENT_12 | Student? | 02:02:05 "Less data to fetch." (student answer). |
| STUDENT_13 | Student? | 00:57:41-00:57:42 "Okay. Thanks." |
| STUDENT_14 | Student? | 03:11:47-03:11:49 "I didn't get it. What?" (reply to Student 2's GC question - student). |
| STUDENT_15 | Student? | 03:23:35 "Okay." |

Naming: Student N = label number for STUDENT_1/2/3/4/6/8/9 (`**Student 4 (Mohan):**` only on turns right after a
call). STUDENT_10-15 one-word labels -> `Student?`. Student questions under the TEACHER label get `Student?`
(+ name in parentheses when a call precedes) and a SPEAKER/SPLIT log row. Diarization boundaries lag speaker
changes by a phrase -> SPLIT at grammar boundaries.


### lec10 speaker map (FROZEN — this is the map for this lecture)

Same teacher (Arpit: "Hi, Arbit" 00:27:26, "Yeah, Arvit" 00:20:09, "Hey, Arpit" 01:34:59, "But Arpet now" 03:03:07; teacher's "AODB, Arpit's outstanding database" 00:43:48). Source: speaker_stats.md + raw read 00:00:01-00:11:02 (start), 00:57:37-01:06:31 (~1 h), 01:51:25-02:06:59 (break + ~2 h), 02:41:50-02:49:51 and 02:55:24-03:06:32 (end Q&A), plus every line of STUDENT_3/5-17 and every teacher name call. One teacher label; no lec04-style split (TEACHER 72.5% talk, 145.7 words/turn). Student labels are long here (brainstorm-heavy lecture) and the teacher's calls/short reactions leak into them.

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 72.5% talk, 152 turns, 145.7 words/turn; opens "Week 5, day 2nd ... storage engines" 00:00:01, sets the problem, calls names ("Go on, Raghun." 00:05:03, "Sidesh, given this file" 00:19:57, "Harsh." 00:27:23, "Alok." 00:35:45, "Gaurav, what else can you do?" 00:38:25, "Pankaj." 00:56:39, "Vikram?" 01:06:13, "Sidesh." 01:34:56, "Rahul?" 01:38:03, "Amen." 02:03:26, "Pankaj, how will you do deletes?" 02:08:41), break 01:52:05-01:53:04, closes "See you next week. Bye-bye." 03:06:23-03:06:28. EXCEPTIONS: 00:56:43 "so can can we use something like amazon s3 in this case to store this file" = Pankaj (STUDENT_5 continues 00:56:50; teacher: "So what Pankaj said" 00:57:50) -> Student 5 (Pankaj), SPEAKER. 00:05:25 "a Jason format?" = tail of teacher's question begun under STUDENT_4 00:05:20 (boundary lag). 03:04:04-03:04:09 / 03:05:32-03:05:36 boundary lags with STUDENT_1 -> SPLIT at grammar boundary. |
| STUDENT_1 | Student 1 — MIXES several students; name only on the turn right after a call | 14.7% talk. Hemant: 00:09:52 after "uh himan" 00:09:45 (key-value/read-heavy framing), 02:03:28 after "Amen." (= Hemant; "memtable or SS table" idea attributed to "hey man" by STUDENT_3 02:11:38), probably 02:43:12 after "go on heaven" (LSM / Bitcask / Kleppmann question - `[check]`). Gaurav: 00:38:27 after "Gaurav, what else can you do?". Vikram: 01:06:15 after "Vikram?" (batch/cron job update). Mohit: 02:46:31 "thanks mohit yeah a bit like my question may sound naive" -> the append-only-file question that follows is Mohit's. Unnamed: 00:14:29 multi-file/zip idea, 01:08-01:22 update flow, 01:49:57, 03:01:39-03:05:42 offsets/sorting question. TEACHER LEAKS (SPLIT/SPEAKER to Teacher): 00:11:00 "What did you say about the last thing when you are modifying something?"; 00:38:27-00:38:29 "These are two good approaches. What else can you do?" (teacher echo before Gaurav answers - decide in chunk); 01:06:24 "Did you mean cron job, batch job?" and 01:06:31 "See, batch job is batch processing." (teacher probing Vikram - Teacher if clear, else `Teacher?`); 02:06:01 "Perfect." inside Hemant's append-only explanation; 02:46:07-02:46:31 "do read the paper in case you have it that's a fabulous paper ... thanks mohit" (teacher, split before Mohit's question); 03:04:24 "Why is that complex?" and 03:04:09 "very efficient." (teacher continuing 03:04:04), 03:05:36 "new file created. You don't have to do n square complexity." (tail of teacher 03:05:32). |
| STUDENT_2 | Student 2 (Sitesh / Sidesh) | 5.3% talk. Turns after "Sidesh" calls: 00:20:09 "Yeah, Arvit." (search proposal), 01:34:59 "Hey, Arpit. I would either expose a REST endpoint", 02:51:53 after "Sitesh." (implementation question, checksum / fsync / WAL 02:51-02:53), long Q&A 02:56:05-03:01:23 (1 TB justification, S3 cost, redeployment) - same voice, keep Student 2; add "(Sitesh)" only on the turns right after a call. TEACHER LEAKS: 00:09:32 "the trees or something like that wait wait wait wait wait we'll come to that" (teacher deferring Rahul's B-tree idea; LOOP) -> Teacher; 01:13:29 "Uh, Shreya." (teacher call) -> Teacher; 02:43:01-02:43:05 "no no questions on bitcast right it was that simple super go on heaven" -> "no questions on Bitcast" may be a student reply but "super, go on, [Hemant]" is the teacher -> SPLIT, doubt `Teacher?`; 02:51:51 "Sitesh." (call) -> Teacher; 02:56:42-02:56:43 "You know, great. Like you should ask this critical question." -> Teacher; 03:02:41-03:02:43 "This is the size of the index. Yes, the size of the index." -> Teacher (answers STUDENT_1). |
| STUDENT_3 | Student 3 (Anubhav) | 00:51:59 "can we have a shared disk storage for all the api servers" = the proposal the teacher credits to Anubhav ("what first Anubhav said, let's put it in a shared storage" 00:58:08; "with Anupak" 00:56:18), preceded by the call "kyanav" 00:51:56 (leaked under STUDENT_11). Other turns: 00:40:13 reserve index slot, 01:12:53 graveyard (tombstone) entries + compaction, 01:34:02 version in header, 02:11:08-02:14:19 WAL + in-memory hash table ("what hey man had mentioned"), 02:49:23 delete-in-merge question. Name "(Anubhav)" only on 00:51:59 (turn right after the call); others plain Student 3. |
| STUDENT_4 | Student 4 (Rahul) | 00:05:05 after "Go on, Raghun." (text vs JSON), 00:06:57 after "Raul, what will be the format" (write-ahead-log-like text file), 01:38:05 after "Rahul?" (upload to same path); teacher 00:35:31 "Anyone except Rahul". Label = Rahul throughout -> `Student 4 (Rahul)` on the turns after a call. Leaks: 00:05:20-00:05:25 "how do you, how do you query a Jason format?" = teacher -> SPLIT; 00:09:03-00:09:04 "No, there is no constraint. Will you keep it sorted?" = teacher restating -> SPLIT/`Teacher?`; 00:09:24 "...okay fine okay hey man" = teacher's call to Hemant -> SPLIT; 01:38:17 "Just a second." (REPEAT-SEG) keep. |
| STUDENT_5 | Student 5 (Pankaj) | 00:56:50-00:57:37 S3 + GetObject byte-range proposal right after "Pankaj." 00:56:39 (teacher: "So what Pankaj said" 00:57:50); 01:30:01-01:33:40 metadata file / polling proposal right after "uh pankaj" 01:29:52 (call leaked under STUDENT_8); 02:08:54-02:10:23 delete with -1 marker right after "Pankaj, how will you do deletes?" 02:08:41. Consistent voice -> Student 5 (Pankaj) on those turns. Leaks: 01:34:12 "But you're still polling for that." = teacher -> SPEAKER (`Teacher?`); 02:57:37 "So that's why my team." -> `[unclear]`, `Student?`. |
| STUDENT_6 | Student 6 (Harsh) | 00:27:28-00:30:05 index-size estimate (26-letter index, "17,000,000") right after "Harsh." 00:27:23. 00:28:00 "That's your concern." / 00:28:02 "Right." may be teacher -> decide in chunk. |
| STUDENT_7 | Student 7 (Alok) | 00:35:47-00:37:07 "Do we need to create a file for the index? ... build it up in memory", one file with partition line - right after "Alok." 00:35:45. |
| STUDENT_8 | Student 8 | 01:29:25-01:29:47 latecomer "What if we had each word in one file?" (name not called). TEACHER LEAKS: 01:29:52 "having everything okay i don't have anything okay uh pankaj" (teacher wrapping up + call) -> Teacher; 03:05:47 "These are the details" (continues into TEACHER 03:05:48 "I want. Thanks for asking this question") -> Teacher (SPLIT/SPEAKER). |
| STUDENT_9 | Student 9 (Shreya) | 01:13:33-01:14:03 naive rewrite-the-file approach right after the call "Uh, Shreya." 01:13:29. Leak: 01:14:03 "no no it's not naive it's not naive it's kind of" = teacher -> SPLIT. |
| STUDENT_10 | Student 10 | 00:37:15-00:38:22 pre-allocate index space proposal (name not called). 01:34:32 "Okay.", 02:09:19 "Yeah.", 02:56:51 "Okay, yeah." back-channel -> `Student?` unless in a student's exchange. |
| STUDENT_11 | MOSTLY TEACHER -> relabel per turn | 00:07:39 "There are no columns. You only have words and meanings." (teacher answering Rahul's CSV point) -> Teacher; 00:37:25 "What do you mean by pre-allocate?" (teacher probing Student 10) -> Teacher; 00:51:56 "kyanav" (call to Anubhav) -> Teacher. EXCEPTION: 00:27:25-00:27:26 "Yeah. Hi, Arbit." = Harsh greeting the teacher after "Harsh." -> `Student 6 (Harsh)` (SPEAKER; same student as STUDENT_6 00:27:28). |
| STUDENT_13 | Student? | 01:50:20 "Sure.", 02:49:17-02:49:18 "Okay. Right." (after the append-only answer to Mohit -> could be Mohit) - back-channel. |
| STUDENT_14 | Student? / Teacher? per turn | 01:08:18 "Correct.", 01:09:46-01:09:47 "Okay. Correct." (inside Student 1's update discussion - may be the teacher confirming -> `Teacher?` if it answers the student's "right?"), 03:05:45 "So yeah, that's good." (student wrap-up) -> `Student?`. |
| STUDENT_15 | Student? | 00:12:09 "Yes.", 00:17:57 "Yes.", 00:18:00 "I know." - one-word answers to the teacher's questions. |
| STUDENT_17 | Student? | 01:10:55 "Yeah. Correct." (answers "Will this entry move down?"), 02:18:54 "Yeah.". |

Naming: Student N = label number. Name in parentheses ONLY on the turn right after the teacher's call (`Student 4 (Rahul)`, `Student 5 (Pankaj)`, `Student 1 (Hemant)`, `Student 1 (Vikram)`, `Student 1 (Gaurav)`, `Student 1 (Mohit)`, `Student 3 (Anubhav)`, `Student 6 (Harsh)`, `Student 7 (Alok)`, `Student 9 (Shreya)`, `Student 2 (Sitesh)` - spelling as the call was written, `[check: name spelling]`). Name calls that leaked into a student label (00:09:24, 00:51:56, 01:13:29, 01:29:52, 02:43:05, 02:51:51) -> SPLIT to Teacher. Boundary lag of a phrase is common (00:05:20-00:05:25, 03:04:04-03:04:09, 03:05:32-03:05:36, 03:05:47-03:05:48) -> SPLIT at grammar boundaries, log SPLIT.

## Known structure notes
- 01:38:25–01:44:37: break (teacher: "see you folks at 10 45"). Mark as admin, add `[break ~01:38:25-01:44:37]`, not [missing]. (lec01 carry-over - NOT lec07: in lec07 that stretch is continuous teaching on concurrency / optimistic locking.)
- Class opens with teacher discussing feedback from students (admin) then topics: scaling, concurrency, delegation, communication.
- lec05: break 01:27:55-01:33:13 (`[break ...]`, "Thank you." at 01:33:13 removed as HALLUCINATION); live Go demo 00:27-01:08 (program output read aloud); final Q&A 02:36:55-03:21:42.
- lec06: spoken English, no Hindi. Break 01:35:57-01:40:40 (`[break ...]`, "Thank you." at 01:39:42 removed as HALLUCINATION). Real close at 02:55:49 kept. Teacher reads URLs/paths aloud ("slash", "gravatar.com slash hash") -> keep spoken form. The ~90 flagged single "Okay." and the emphatic repeated segments are real -> keep. Final Q&A 02:42:10-02:55:51.
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
- lec08 (03:36:34 long, 3922 segments, ends 12:36 per teacher):
  - 00:00:02-00:09:03 admin: agenda + feedback (pre-reads on Discord, session length / focus). Mark `*(admin)*`.
  - ~00:42-01:08 live Go load-balancer code walkthrough (lb.run, proxy function, goroutines, io copy until EOF); GitHub outage aside 00:57:44-00:57:53 (keep). Code terms read aloud stay as spoken.
  - 01:59:39-02:04:59 BREAK: teacher "We'll take five minutes break ... see you folks in five minutes" 02:00:23; gap 02:00:26-02:04:27 (241 s) + gap 02:04:28-02:04:59 (30 s). Write `[break ~02:00:26-02:04:59]`, not [missing]. "Thank you." #2109 02:04:27 (TEACHER, AFTER-GAP 241 s, outro phrase = 2 signals) -> remove, log HALLUCINATION. "half in second, fifth of today" 02:04:59-02:05:06 garbled restart -> keep + `[unclear: ...]`.
  - LOOP candidates: #59 00:04:29 "links links links links" (teacher complaining Discord full of links - emphatic; collapse to 3 max, log LOOP, or keep as is with doubt); #1159 01:07:06 "highly x4" and #1719 01:39:39 "brilliant x4" = teacher's emphatic style (keep up to 3, log LOOP if trimmed); #2239 02:12:31 "you, you, you, you cannot" = stutter -> "you cannot" (clean verbatim, single-word stutter).
  - REPEAT-SEG candidates to decide with context (likely ASR duplicates at short segment boundaries): #30 00:02:30 "That's it.", #952 00:57:08, #1004 00:59:28, #1040 01:01:23, #1064 01:02:38, #1267 01:13:44 "You're killing it today." (STUDENT_6, teacher praise), #1327 01:16:18, #1896 01:49:17, #3030 02:57:46 "I am obsessed.", #3045/#3046 02:58:07-02:58:08 "Inodes is file system." (teacher repeating to correct student - plausible emphasis), #3060 02:58:36 "180 repos on GitHub." (STUDENT_5 = teacher; 80 vs 180 - keep both, `[check]`), #3217/#3219 03:06:43-03:06:45 "That's not what I said." x3, #3278 03:09:26, #3307 03:10:44 "Now this is where I want to send it.", #3323 03:11:19 "Against the domain name.", #3520 03:19:43, #3541 03:20:19, #3583 03:22:13 (student repeats teacher's question - keep, different speakers), #3610/#3611 03:23:08-03:23:12, #3729 03:28:28. Doubt -> keep + `[check: possible ASR duplicate]`.
  - ~140 "Okay."/"Thanks."/"Thank you." PHRASE candidates are real back-channel in a live class -> keep. Final "Right. See you tomorrow morning. Bye bye." 03:36:34 = real ending, keep.
  - RATE candidates (7-10 w/s, e.g. 02:32:52 10.4 w/s, 01:34:12 9.3 w/s) are short fast sentences - no other signal, keep.
  - Heavy speaker-mixing zones: 00:08:44-00:09:00 (STUDENT_5 = teacher), 01:10-01:16 (Shalendra/teacher interleaved), 01:32-01:36 (STUDENT_1/4/9 + teacher calls), 02:36:46-02:38:48 (STUDENT_5 = teacher), 02:38-02:50 (STUDENT_1 and STUDENT_9 contain teacher answers), 03:04-03:16 (STUDENT_1 interleaves teacher), 03:29-03:34 (STUDENT_5 = teacher). Q&A stretch ~02:35:49-03:36:08 (lock questions, then LB questions from 03:06:15).
  - 03:30:33-03:31:10 very short (1-3 word) teacher segments - merge into sentences, no content issue.
- lec09 (03:26:36 long, 3821 segments, 17 chunks; class "wrap by 11.30"):
  - 00:00:02 #0 opening run-on segment (28 s) with garbled bits ("Dappe dappe, boxes, boxes, my toy or kit can draw", "state material") -> keep + `[unclear: ...]` (A2); "hashtag survey" -> service (A#25).
  - 00:06-00:25 CDN demo: teacher reads URLs/paths aloud ("slash static slash img") - keep spoken form; domain forms -> arpitbhayani.me (A#1-3). REPEAT-SEG #326 00:20:50 "I configured arpitbhane.me slash static as my origin." = teacher repeating #324 for emphasis (different sentence between) -> keep + `[check: possible ASR duplicate]`. #394 00:23:37 "First try out CDN." (repeat of #393) -> same rule.
  - 00:22:43-00:39:13 first Q&A/brainstorm (Rahul, Gaurav under TEACHER label 00:30:04, Sandeep, Anubhav under STUDENT_1; teacher prompts under STUDENT_5/10). #493 00:28:15 "No, no, no, no." (teacher, emphatic) -> keep up to 3, log LOOP if trimmed. #663 00:37:51 STUDENT_1 "...to kind of, no, no, no, no, no, no, no." = LOOP x7 (probably teacher interrupting) -> collapse to "no, no, no" + `[check: speaker]`, log LOOP.
  - 00:40-00:56 pre-signed URL explanation + GitHub upload demo (teacher reads request fields "Key, ACL, policy ... content type", "PNG3, RDA" unclear).
  - 00:57:47-01:03:30 Q&A: student under TEACHER label 00:57:47; Akamai PoP list for India 01:00:14-01:00:49 is chopped into 1-3-word segments -> merge, no content issue.
  - 01:06:03-01:06:06 #1199 "This is suboptimal." repeat and #1202 "Always, always, always, always remember" = teacher's emphatic style (cf. 00:03:30 "always, always, always remember") -> keep (max 3-4 as spoken; LOOP log only if trimmed). #1335 01:13:10 "so, so, so, so simple" same. #1493 01:22:47 "My bad, my bad, my bad, my bad." emphatic -> keep or trim to 3 with LOOP log. #1506 01:23:19, #1590 01:28:02, #1619 01:29:29, #1972 01:47:11 ("For this system, CDN is black box" after "S3 is black box" = parallel, NOT a duplicate), #2272 02:12:06, #2441 02:20:53, #3716 03:21:45 "Kafka does not give you that." x2 -> default keep + `[check: possible ASR duplicate]` (teacher repeats for emphasis in this course).
  - 01:22:42-01:22:48 screen-share admin ("Azure window is not visible" -> flag; "I should always share my full screen").
  - 01:23-01:35 Instagram FBCDN URL dissection (OE/OH/IG/EDN/OW params read off screen) - keep tokens as spoken.
  - 01:37:44-01:47:50 last questions before break (Amrit DRM 01:39:48, Harsh 01:43:54, Rajiv under TEACHER 01:44:53, Student 2 S3 question).
  - **BREAK 01:47:21-01:54:59**: teacher "We'll take a break till 10.55 ... See you folks at 10.55, 7, 8 minutes from now ... Thanks folks." 01:47:21-01:47:50; gap 01:47:51-01:54:29 (398 s). Write `[break ~01:47:51-01:54:29]` (not [missing]). #1987 01:54:29 STUDENT_7 "Thank you." = AFTER-GAP(398 s) + outro phrase (2 signals) -> remove, log HALLUCINATION. 01:54:50 STUDENT_7 "let's start with the second half just confirming if mic and speaker are correct" = teacher, admin.
  - 01:54:59-02:36 hashtag service design (problem statement 01:55:02; brainstorm with Student 2/1/6; "User idea" -> user ID 02:09:43). #2268 02:12:01 "Wait, wait, wait, wait, wait, wait, wait, wait." LOOP x8 + COMPRESS 2.6 -> collapse to "Wait, wait, wait." log LOOP.
  - 02:36:28-03:26 long Q&A. Heavy speaker-mixing zones: 02:36:28-02:41:47 (STUDENT_1/4/5 + teacher, Mohan exchange), 02:43:06-02:46:23 (Mohit, Redis Pub/Sub), 02:48:50 (student under TEACHER), 03:03:35-03:04 (DK under TEACHER), 03:11:27-03:19:50 (STUDENT_2 interleaves teacher lines), 03:21:13-03:25:31 (student questions under TEACHER label: dead letter queue 03:21:26, outbox 03:22:06, batching/MapReduce 03:22:30-03:22:35, DK resource question 03:24:22).
  - 03:21:09 "pehle" = only Hindi word (keep).
  - 03:25:58-03:26:29 real goodbye ("Thanks, folks, for tuning in. See you folks tomorrow ... bye") -> keep. #3820 03:26:36 TEACHER "Thank you." 7 s after "bye", last segment -> plausible real closing OR outro hallucination (only 1 signal: PHRASE at end) -> keep + `[check: possibly hallucinated in silence]`.
  - ~95 single "Okay."/"Thanks."/"Thank you."/"Got it." PHRASE candidates = real back-channel in a live class -> keep. RATE candidates (7-11.3 w/s: #1160, #1290, #1455, #1459, #1604, #1705, #1765, #1770, #1814 11.3 w/s "and then we're going to break.", #2422, #2989, #2999, #3035, #3083 "Let's, let's, let's start.", #3157, #3269, #3465, #3503 10.9 w/s) = short fast sentences, no second signal -> keep. #2285 02:12:33 STUDENT_1 lone "so" = real filler fragment, keep/clean-verbatim.
  - No gap other than the break (gaps.md has one row). No Devanagari / Urdu script seen.

- lec10 (03:06:32 long, 3207 segments, 15 chunks; spoken English, no Hindi/Devanagari - romanization rules unused):
  - 00:00:01-00:05:03 problem statement (word dictionary, no DB); no admin opening. 00:00:01 "standard engines" -> storage engines (row B).
  - 00:05:03-00:11:30 Rahul / Hemant exchange: heavy boundary lag between TEACHER, STUDENT_4, STUDENT_2, STUDENT_1 (00:05:20-00:05:25, 00:09:03-00:09:45) -> per-turn SPLIT. #195 00:09:32 LOOP "wait" x5 (teacher, under STUDENT_2) -> collapse to 2-3, log LOOP.
  - 00:21:04 #385 "Now, wait, wait, wait, wait, why only 1000 keys" = teacher's emphatic style -> keep up to 3, log LOOP if trimmed.
  - 00:29:26-00:29:53 gap 26 s ("Take your time.") = students computing the index size - real silence, NOT [missing]. 00:29:53-00:30:05 "17,000,000." x5 (#529 STUDENT_6, #530 TEACHER, #532/#533 STUDENT_6, #534 TEACHER) = student answer + teacher repeating it back -> keep one per speaker turn that is plausibly spoken; drop only exact back-to-back same-speaker copies (#533 after #532, 2 s apart) as DUPLICATE; doubt -> keep + `[check: possible ASR duplicate]`.
  - 00:39:16 #706 "hash table, hash table, hash table, hash table" = teacher drawing entries one by one -> keep (counting), or collapse to 3 with LOOP log; prefer keep + `[check]`.
  - 00:57:42 #1010 "Great, great, great, great, great." -> collapse to 3, log LOOP.
  - 01:06:37 #1140 "periodic periodic periodic periodic job" and 01:06:50 #1144 "where, where, where, where" (STUDENT_1 stutters) -> single-word stutter, clean verbatim ("periodic job"; "where" kept once), log LOOP.
  - 01:15:20-01:16:49 merge-of-two-sorted-files board walkthrough (A, A dash, CC double dash, DD dash, EE dash, FF dash): REPEAT-SEG #1318 "This is sorted.", #1348 "This is the updated one.", #1354 "Then FF dash EE dash." = teacher re-reading as he writes -> keep + `[check: possible ASR duplicate]` unless timing overlaps.
  - 01:32:02 #1618 "we can make things reactive" (REPEAT-SEG) and 01:39:05 #1764 "That is still polling." (REPEAT-SEG) = emphatic -> keep.
  - 01:36:38 #1706 STUDENT_2 "Complex, complex, complex, complex, complex, complex." (LOOP + COMPRESS 2.5 = two Whisper signals) -> collapse to "Complex, complex." max, log LOOP; `[check]`.
  - 01:38:17 #1737 "Just a second." (STUDENT_4 REPEAT-SEG) -> keep.
  - BREAK 01:52:05-01:59:52: teacher "we'll go on a break ... break till 11 ... see you folks at 11." (01:52:05-01:53:04). Gap 01:53:04-01:59:52 filled by TWELVE "Thank you." segments #2015-#2026 (01:53:32 ... 01:59:03, every 30 s, TEACHER label, each AFTER-GAP 27-30 s) = classic silence hallucination (outro phrase + gap + periodic loop = 3 signals) -> remove all 12, log each HALLUCINATION; write `[break ~01:53:04-01:59:52]` (not [missing]). Resume "okay let's start with the second half" 01:59:52 (topic change: super-fast key-value store / magnetic disk).
  - 02:03:26-02:06:59 Hemant append-only proposal: "right ahead" -> write-ahead (row A), "plus it" -> flush it, "magnet is discard best" flagged, #2088 "why, why, why, why" stutter -> "why" (clean verbatim, LOOP log), #2107 "What, what, what, what will you do?" (teacher) -> keep up to 3 / log LOOP.
  - 02:37:28-02:41:58 Bitcask reveal: Bitcask / Riak decisions (row B), Uber claim kept as said, "S-FM", "hash paste", "see it in IT" flagged.
  - 02:41:59-02:42:50 teacher closes the planned content ("Folks who may want to drop off ... I'll upload the recording by evening ... Next week is all about high throughput systems") = admin, keep. #2711 "Next week is all about high throughput systems." REPEAT-SEG of #2709 = teacher restarting after "Yeah." -> keep both + `[check]`.
  - Q&A 02:42:50-03:06:09 (LSM/memtable vs Bitcask, append-only file creation, delete in merge, checksum/WAL/fsync, Hussain Nasir recommendation, S3 cost / 1 TB justification, redeployment, offsets & sorted merge) -> `## [02:42:51] Q&A`. Many teacher leaks in STUDENT_1/STUDENT_2 (see speaker map).
  - 03:01:46 #3089 "the actual byte byte byte byte" (STUDENT_1) -> "byte" (stutter, LOOP log). 03:04:29 #3148 "what, what, what, what" -> stutter, LOOP log.
  - 03:05:05-03:05:07 #3168-#3171 "This is sorted." x4 (teacher pointing at original dictionary / changelog / new file in turn) -> keep, at most collapse exact copies <1 s apart; default keep + `[check: possible ASR duplicate]`.
  - 03:06:09-03:06:28 real close ("Thanks folks for tuning in ... See you next week. Bye-bye.") -> keep. 03:06:32 #3206 "Thank you." (last segment, after "Bye-bye.") = plausibly real or outro hallucination (1 signal) -> keep + `[check: possibly hallucinated in silence]`.
  - ~95 PHRASE candidates "Okay."/"Thanks." = real back-channel -> keep. RATE candidates (7-10 w/s: 00:00:49, 00:33:46, 02:07:14 9.8 w/s, 03:05:09 10.0 w/s) = short fast sentences, no second signal -> keep.

## Open questions

- lec02: "web software" = WebSocket? (5 flags); "two links" = toolings? (4 flags); teacher name Arpit vs Abhishek; "OCS streaming" (02:39:04); "Daryl Abu Devi" (00:52:30, DynamoDB?); live-streaming product "randomized / come my documentation" (02:48:29).
- lec03: "SPS" (00:18:26); "64 bits in TV" (01:37:43); "lighting services" (01:43:26); "Charlotte partitioned" (02:00:10, sharded?); "of Atilla" / "two words back" (01:36); "fifth thing" = fifth week? (02:27:42-02:28:04); "local eat" (02:24:53); "We'll sing back at 10" (00:54:41); "2-264" = 2^64? (01:09:36); "round robin port" (01:28:15); "forex/forexes" = 4X? (01:18:57); "nextval" (02:12-02:20); "M1 happened" = M1 hyphen? (00:23:09, 00:24:15); who is "Akshay" (02:21:02).
- lec04: "re-log" (00:04:36, course platform?); "AOSN" (00:07:37); "Spongebob" (01:00:46, Pub/Sub?); "ArrowDB" (01:00:52); "CCB" (00:56:43, ElastiCache?); "DataWare" (02:07:32); "DVO" (02:47:19); "DBI" (02:53:03); "ECD" (02:59:47); "HTTP is TC" (03:05:23, cut off); "Hussain Nasser" spelling; "vendor locking" vs "vendor lock-in".
- lec05: "RANDUP" (00:39:57, Go `rand`?); "SSCs" (00:26:48, SSEs? also lec02 03:05:25 "SSC"); "commit blog" (02:35:35, Postgres commit log?); "TrustMeet" (01:20:11); "rapid time" (03:21:00, RabbitMQ?); "database login" (01:07:23); "for a bit" (01:21:15, for update?); "discalpe" (02:20:26, disk IO?); "copyright type" / "IKT" (01:39:54-01:40:03, value column types); "bad job" (batch job?); Vert.x (02:58:40) to confirm.
- lec06 (flag, do not guess): (1) "arvizhany.me" 00:10:11 - teacher's own domain arpitbhayani.me? -> `[?arpitbhayani.me | asr: "arvizhany.me"]`; (2) "TAPE" 00:09:32 in image-format list - TIFF? -> `[?TIFF | asr: "TAPE"]`; (3) "UJR has equal" 00:58:36 -> `[unclear: ...]`; (4) "ejective two" 01:00:09 - "is active true"? -> flag; (5) "sends it to the CD." 01:18:57 - CDN? -> flag; (6) "when you do a sync" 01:29:29 - async vs sync (meaning flips) -> flag; (7) "15th cohort of bike" 01:06:33 -> `[unclear: "of bike"]`; (8) "for car 74 to 75 contributors" 00:19:28 -> `[unclear: "for car"]`; (9) "J.K." 02:55:26 vs "DK" - same student?; (10) "Sitesh" (lec06) vs "Sidesh" (lec05) spelling; (11) "It is a template I used to watch it." 00:22:31; (12) "senior environment sub typically a cxo" 01:40:51 (senior management?) -> `[unclear: ...]`; (13) "today will bear the first hand" 01:42:35 ("wear the first hat"?) -> flag `[?wear the first hat | asr: "bear the first hand"]`; (14) "that's my strong quota" 02:53:31 (strong forte?) -> keep + `[check]`; (15) "phantom reads is obviously coming next week" 02:53:17 - correct term, keep. Added in Pass 5: (16) teacher's domain arvizhany.me / edge.* forms - confirm arpitbhayani.me by listening; (17) "Heyman"/"Heman"/"Hey man" - one student (Hemant?); (18) write vs right at 02:43:09, 02:44:30, 02:45:56-57, 02:48:13; (19) "predicate pushed up" vs predicate pushdown (01:21:52); (20) "over" = O(1)? (02:22:55, 02:23:26); (21) "account" = count? (02:46:13, 02:50:58); (22) J.K. vs DK (02:55:26).
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
  12. Added at Pass 5: "ETL" in "get, put, delete ETL" 00:32:14 (TTL?); "eps server" 02:46:11 (API server? - the only EPS hit in lec07, so the "EPS (00:31:03)" acronym line below is not lec07); "Arpitbani.me" 02:21:38 (arpitbhayani.me, same question as lec06); "cache file" x4 02:22:32-02:22:46 (cache five or cache one?); "Jyotinder" 00:47:49 spelling (= Jodhinder?); "Philosophia's Unix book" 02:56:35.
- lec08 (flag, do not guess): "HLB" (01:32:30, each LB?); "YYM" (00:46:55); "CVS database" (02:17:55); "OCI queue implementation" (02:41:57, Oracle Cloud?); "PPA" (02:47:52, TTL?); "DC progression" (03:19:46, TCP connection?); "InplexDB" (03:27:22, InfluxDB?); "DBS part" (01:18:47); "public desk" (03:19:19, public DNS?); "single point of view" (00:15:32, single point of failure?); "internal Microsoft" / "configure your Microsoft" (01:56:55, 01:57:48); "two links" (00:39:29, toolings?); "It just picks one idea" (03:12:30, IP?); "ready for that" (02:50:03, Redis?); "places a log" (02:41:08, lock?); "Each consumer is a mission ... no course" (03:04:49, machine / cores?); "scale up or run" (03:24:40, down?); "unit tech economic" (00:16:04, unit economics?); "load presenter" (00:38:45, load balancer?); "load answer" (00:38:28) / "load register" (01:33:06); "infinite clue" (02:36:57) / "infinite tube" (02:49:10) (infinite loop?); "rapid use mutex" (02:49:55); "codeways" (03:12:44); "answering those vives" (03:36:28, whys?); "water cover" / "Moo and cat" (02:07:55-02:07:58, Ubuntu packages); "Rahul please go and view it" (00:05:13, mute it?); "half in second, fifth of today" (02:04:59-02:05:06); "orchestras responsibility" kept as spoken; "lead run" (03:24:11); name spellings Heyman, Sampai, Sidesh/Sitesh, Shalendra. After the chunk pass: "crawl job" (02:39:21, cron job?); "system code" (01:01:09, system call?); "server sending" / "service and events" (03:14:00-03:14:34, server-sent events?); "who keep her" (03:14:48, ZooKeeper?); "all service" / "off service" (03:22:33, auth service?); "Prometheus Overkill" (01:38:15); "Java bomb" (03:03:06); STUDENT_7 = Anubhav or Anwar (01:15-01:21); Shreya vs Shriya (STUDENT_8); Rajiv vs Rajeev.
- Note: the inherited structure note "01:38:25-01:44:37: break" belongs to lec01; lec08's only break is 02:00:26-02:04:59.
- Unknown acronyms as ASR wrote them: GCVM (00:29:35), EPS (00:31:03), MPT (00:38:25), FII (02:28:21), SSC (03:05:25), ACT (02:48:44), STD (02:06:45). Keep as-is with [?term | asr: "..."] if they don't make sense in context.
- lec09 (flag in transcript, do not guess):
  1. "Dappe dappe, boxes, boxes, my toy or kit can draw" / "state material" 00:00:02 (Hindi mis-decoded?) -> `[unclear]`.
  2. "GP uses CDN" 00:17:19 (which company's CDN video?) -> `[unclear: "GP"]`.
  3. "wattage map to ABC" 00:26:59; "OneQ" 00:03:01; "ADEM" 00:37:45; "PNG3, RDA" 00:54:15; "CRS" 01:45:21; "EDN" 01:25:12; "DBI" / "the digital" / "applicators" 02:56:10-02:56:34; "carpet" 01:57:04; "letter data be lost" 02:55:02; "spark map, it is" 03:23:30 -> `[unclear]` / `[check]`.
  4. "SD server" 00:57:54, "SE service" 03:03:53 (S3?); "APAC" 01:15:54 (API call?); "a resist" 02:45:26 (Redis?); "data queue" 03:21:48 (dead letter queue?); "micro register database" 03:14:24 (micro writes?); "pre-URLs" 03:03:53; "geo internet" 01:34:01 (Jio?); "Azure window" 01:22:42 (your window?); "code course" 03:22:35 (cohort course?); "any.me" 00:13:00 -> `[?...]` flags.
  5. Sync vs async (meaning flips): 02:55:08 "a synchronously process", 02:48:32 "should not be done in a synchronous way".
  6. Demo image file names (arpid.png / arpitbhane.png / arpidbhani.png / arpeg.png) - not knowable from audio; board reader may confirm.
  7. Medium-confidence decisions to confirm with the board (lecture-board-reader): arpitbhayani.me + edge.arpitbhayani.me domain forms (A#1-2), Kyrus -> Kinesis (A#13), Kappa -> Kafka (A#12), neural link data dog -> New Relic, Datadog (A#22), LAP, STEC -> LAMP stack (A#24), hot stuff -> Hotstar (A#21), ST/NS3 -> S3 (A#6), CDL -> CDN (A#7).
  8. Names: "Mohit got." 02:11:02 (= "Mohit, go on"?); "rajay" 03:22:21 (Rajiv?); who asked at 00:57:47, 02:48:50, 03:21:26 (student under TEACHER label, no name call); Mohit vs Mohan are treated as two students.
  9. "Start with a book for effective Spark" 03:24:36 / "effective spark is mostly the name of the book by O'Reilly" 03:25:20 - title as spoken, not verified; keep.
  10. Added at Pass 5: "GP" / "Jiffy" 00:17:19-00:17:25 = Giphy? (row P19); "Dorpidmany.me" 00:09:26; "AWS Cloudflare" 00:10:58 (CloudFront?); student names Anamal (Anamol?), chira/Chirak/siraq (Chirag?), "Prashant Raji" 01:03:47; who speaks 02:12:30-02:14:40 (Mohit called 02:10:59 vs Sandeep addressed 02:11:56); "Kafka is not single instance. Kafka is a single instance." 02:51:49 (ASR may have dropped "not"); "19 to 10 ratio" 03:07:39 (90 to 10?).
- lec10 (flag in transcript, do not guess; unknown-token table decided as follows - CSV, CRC, BitCask/BitCast (-> Bitcask), SS (-> SSTable), CC/DD/EE/FF/AA/ABC/ABCD (board letters, keep), PubSub (-> Pub/Sub), MP3/MP4/PDF/TIF/SSD/NTFS/NAS/SDK/IDE/PM/BTRFS/EXT234 (correct, casing only), AODB (teacher's joke name, keep), MD/MP/MBS (-> MB/MBs), SE (-> S3), PSV (-> CSV), PTRFS (-> BTRFS), MAM (-> memtable); remaining open items below):
  1. "MSN" 00:24:24 student's example word ("Apple or MSN") -> keep + `[check]`.
  2. "TPT format" 00:47:53 (PPT?) -> `[?PPT | asr: "TPT"]`.
  3. "S-FM" 02:37:54 ("BitCask is an embedded database S-FM") -> `[unclear: "S-FM"]`.
  4. "React" = Riak? (02:38:17-02:40:29) - corrected at TERM medium; confirm with the board (lecture-board-reader).
  5. "caching, matching" 00:02:18 (batching?); "oblique the data" 00:58:16 (replicate?); "rotten" 01:16:37 (written?); "magnet is discard best" 02:05:03-08; "the first metric removes" 02:12:57; "hash paste" 02:38:57; "see it in IT" 02:39:56; "The artist is getting flushed" 02:55:49; "APIs Expos" 03:01:02; "order and operation" 03:05:29 (order n?); "So that's why my team." 02:57:37; "a cost efficient auto solution for Amazon next week" 02:58:46.
  6. Names: "Raghun" 00:05:03 (= Rahul?); "Subha" 00:57:42; "Dan" 03:01:27 and "Thanks sir" (Thanks, Sitesh?); "Sidesh"/"Siddesh"/"Sitesh" spelling (project-wide); "Hussain Nasir" 02:55:29 vs project "Hussain Nasser"; "heaven" 02:43:05 (= Hemant?); "kyanav" 00:51:56 (= Anubhav?); STUDENT_1 02:43:12 = Hemant or another student.
  7. 00:14:30 STUDENT_1 "I have a bit different of Arpit there." (a bit different opinion?) -> keep + `[check]`.
  8. Added at Pass 5 (lead): new student names Anmol (STUDENT_10), Amrita and Jodhinda (STUDENT_3), Abdur (STUDENT_8), Mohit (STUDENT_1) - spellings unconfirmed; flag-only items from chunk notes listed in row D of the lec10 terms block (marshaling, breaking, score, the trees, downturn, graduated, reactor, bursting, a stone process, torque, fedis, backlit disk, bit custom repetition, keep on the keeper).
