# Term decisions — project (lec01; lec02 rows added 2026-10-12; lec03, lec04, lec05, lec06, lec07, lec08 rows added 2026-10-13)

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
