# Term decisions — lec06 (Week 4 Day 2; frozen 2026-10-13, Pass 0b)

Copied from the project file `transcripts/term_decisions.md` (lec01-lec05 rows below are inherited and still apply).
lec06-specific decisions are in "### Added for lec06" (terms), "## Speaker map" (lec06 map first), "## Known structure notes" and "## Open questions".

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

### Added for lec06 (2026-10-13)

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

#### Added in Pass 5 (lead reconciliation of chunk notes, 2026-10-13)

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

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | |

## Speaker map

### lec06 (frozen)

Read: start 00:00-00:16, ~1 h 00:49-01:08, ~1 h 35 01:34-01:44 (break + tagging start), ~2 h 02:07-02:23, end 02:51-02:55; plus every STUDENT_* line.

| Diarization label | Role | Evidence (lec06) |
|---|---|---|
| TEACHER | **Teacher** (Arpit) | 79.2% talk, 158.8 words/turn, 142 turns. Sets agenda (00:00:02 "week four day second"), explains image serving / Gravatar / CDN, calls names ("Thanks, Shriya", "Chantan, what's wrong in this?", "Yes Priyanka", "Gaurav, I'll take a question at the end", "Yeah, Chandan, go on"), runs the break (01:34:52 "It's 10.35 ... come back at 10.41"), ends class (02:55:49 "see you folks next week. Bye-bye."). Addressed as "Arpit" by students. A few TEACHER lines carry a student's words at turn edges -> SPLIT only with clear evidence. |
| STUDENT_1 | **Student 1** | 5.8%, 44 words/turn. One main voice: proposes hash/select/join queries (00:36:31-00:41:24, 00:56:36-01:00:35), update query (00:45:35), transaction-fallback question (01:14:14-01:17:56), tagging (01:43:08-01:44:44), NoSQL set answer (02:25:42). Mixed spots: 00:45:23 "your query look like? Oh, okay. So this is just to pull only active photo, right? That's your" = teacher words at the start -> SPLIT; 01:00:35 "...got it yeah sitesh" = teacher's name-call leak -> SPLIT to Teacher; 01:17:56 "...yes yes yes yes yeah could you explain the CDN mapping that we were doing" = loop + a DIFFERENT student's question (STUDENT_5 follows up on "the mapping" at 01:19:02) -> SPLIT, question = `Student?` (or Student 5 if the answer flow confirms); 01:44:44 "no no no no you are not the owner of the" = quoted reaction inside the student's own example - keep with student. |
| STUDENT_2 | **Student 2**, but label MIXES several students | 4.0%, 35 turns. Different people by name/content: 00:32:20-00:35:29 (hash of email ID; fragmented 1-3 word segments 00:33:12-00:35:01 interleaved with teacher - several fragments such as "why", "no", "why not if you open Gravita", "In which what do you store?" are teacher prompts -> decide per segment, else `Student?`); 00:51:54 = Chandan (called "Chantan" just before); 01:00:42 = Sitesh (called at 01:00:35) and contains teacher lines "god what would you optimize" (= "go, what would you optimize"), "Which one? This entire one?", "Ah, gotcha. So now what would it do?" -> SPLIT to Teacher; 01:03:21, 01:19:15 ("Hi Arpit"), 01:33:52 (membership-table question); 02:43:21 "DK. Yeah." = teacher's call -> SPLIT, rest = DK; 02:51:39 resources question (teacher replies "Thanks, J.K." 02:55:26); 02:55:29 = Chandan (called 02:55:27). Keep label number "Student 2" throughout (one label = one number) unless a name call makes the speaker explicit -> `Student 2 (Chandan)` etc. |
| STUDENT_3 | **Student 3** | 3.5%, 49.5 words/turn. Main answerer for the newly unread indicator design (02:07:25-02:18:14). Contains teacher interjections inside long merged segments: 02:10:50 "are storing over here? That's the question now.", 02:11:00 "Correct. Yeah.", 02:11:08 "Yeah. So this is our messages table." / "It is a messaging table. Yes." (who says which is uncertain), 02:13:01 "Yeah, but you want the unique users counter. You don't want the message count." (teacher-style objection, answered by STUDENT_3 at 02:13:04) -> SPLIT where grammar is clear, else leave + `[check: possible teacher interjection]`. 00:32:41 "We should." and 01:47:29 "Okay. Yeah. That makes sense." = short student back-channel (`Student 3`). |
| STUDENT_4 | **Student 4**, contains teacher lines | 3.2%. Main student: Redis hash-map/set design 02:19:51-02:23:37, client-smartness + WebSocket point 02:28:16-02:29:17, user-level tag setting 01:52:23-01:52:59, Boolean vs enum question 01:31:54. Teacher lines under this label: 00:54:02 "I'll move to Mohit. Mohit gone." (teacher) / 00:54:05-00:54:11 Mohit's answer / 00:54:12 "Brilliant." (teacher) -> SPLIT; 01:52:52 "Rahul?" (teacher call) and 01:52:54 "Self removal of tag." (= Rahul) / "Correct." (teacher?); 02:22:11, 02:23:11 "Correct.", 02:22:37 "Do you really need this?" (teacher prompts) -> Teacher; 02:44:11 "radius. Not storing, I am just" = end of STUDENT_2's "auxiliary Redis" + teacher's reply; 02:45:00 "...got it got it got it got it yeah thank you uh i had question related to clear" = one student's thanks + a NEW student's question (continues as STUDENT_2 at 02:45:10) -> SPLIT; 02:46:51 "cluster at the same time, not required." = end of STUDENT_2 question + teacher's answer -> SPLIT. 02:20:53 "No, no, no, no." is the student's own (plausible) -> keep. |
| STUDENT_5 | **Student 5** | 2.6%. Consistent voice: "previously active image not marked inactive" (00:47:37-00:49:14), CDN-mapping confusion (01:18:25-01:19:08), verification of active-photo-ID query (01:30:56-01:31:50), tagging limits/concurrency (01:45:59-01:47:17), ML suggestions + peripheral teams (01:53:41-01:54:30), activity page (01:56:08), unsent-event question (02:50:01-02:51:04). Teacher bits inside: 01:46:11 "you in that's right but one which one would you want to play" and 01:46:37 "Photo, photo, let's keep it photo." (teacher choosing scope) -> SPLIT where clear. |
| STUDENT_6 | **Student 6** | 0.7%, 4 turns: tag notifications (01:49:13), celebrity-tag case (01:51:49), "100+" display optimization (02:42:15). 01:49:15 "Great." mid-segment = teacher -> SPLIT if clean. |
| STUDENT_7 | **Student 7**, mixes 2 students | 0.6%. 00:49:44-00:50:55 = Shriya (teacher thanks Shriya at 00:51:39); 00:53:12-00:53:55 = Priyanka (called 00:53:05 "Yes Priyanka. What could go wrong in the" -> the label's first words "second query?" finish the TEACHER's sentence -> SPLIT to Teacher). 00:50:07 "What could go wrong in this?" echoes the teacher (00:50:02) -> `Student?`/keep. 00:50:34 "Correct." duplicated by TEACHER 00:50:34 -> keep as student. 02:23:32 "Correct." and 02:46:19 "Right? Yeah." = probably teacher back-channel -> `Teacher?` only with evidence, else `Student?`. |
| STUDENT_8 | **Student 8** (except 01:19:10) | 01:19:10 "DK." = teacher's name-call (STUDENT_2 answers "Yeah. Hi Arpit.") -> Teacher (SPEAKER). 01:32:58-01:33:49 = a student asking about a join check on the third update -> Student 8. |
| STUDENT_9 | **Student?** (short interjections, mixed) | 26 words, 7 turns. 00:36:04 "Okay." / 00:36:10 "I think that's it." (student ending an answer), 01:07:24 "I have one question to this. Wait, wait, wait." (student; teacher defers), 01:34:15 "Membership table, yeah." (echo - teacher or student, unclear), 01:34:50 "Thank you. Yeah." (student), 02:49:54, 02:50:35 "Yeah."/"That's it." -> `Student 9` where it is clearly a student turn, else `Student?`. |
| STUDENT_11 | **Student?** | "Yeah, right." (00:32:49), "Yeah. Thanks." (01:32:54, plausibly STUDENT_4 finishing), "okay" (02:21:43). Back-channel only. |
| STUDENT_13 | **Student?** | single "Yeah." (01:50:04). |
| STUDENT_14 | **Student 14** | 01:01:59 "Yes. No, but my question was." - a student starting a question. |

Rules for lec06 chunks: (1) no TEACHER label split this time (unlike lec04) - TEACHER is the only teacher label; (2) teacher name-calls and short prompts ("Correct.", "Brilliant.", "Do you really need this?", "DK.", "Rahul?") leak into the next student label -> SPLIT/SPEAKER; (3) STUDENT_2, STUDENT_4, STUDENT_7 mix people -> name only on the turn right after the call; (4) uncertain one-word turns -> `Student?`, never guessed.

### Earlier lectures (reference)

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 76% talk time, 180 words/turn, explains, runs class |
| STUDENT_1 … STUDENT_18 | Student N (keep the number, e.g. STUDENT_3 -> **Student 3:**) | short turns, questions, propose solutions when teacher asks. Diarization may be wrong: if a "STUDENT_n" line is clearly the teacher continuing an explanation (same thread, teacher-style, e.g. "okay so what X suggested..."), relabel to Teacher and log SPEAKER. If a TEACHER line is clearly a student question, use **Student?** (or the student number if evident) and log SPEAKER/SPLIT. |

Same teacher in lec02: TEACHER = Teacher (86.1% talk, 211 words/turn); STUDENT_1..STUDENT_17 -> Student n. Back-channel rule (lec02): a one-word "Correct."/"Right." under a STUDENT label inside that student's own explanation is often the teacher; relabel only with clear evidence (student asked "right?"), else leave.

Same teacher in lec03: TEACHER = Teacher (92.2% talk, 301 words/turn); STUDENT_1..STUDENT_10 -> Student n. Mixed labels in lec03: STUDENT_2 (Jay / Aditi / Chathindar?), STUDENT_3 (DK / Mohit / Pankaj), STUDENT_9 (teacher + students; decide per turn). Teacher name-calls often leak into the next student's segment ("Rajiv." / "Jay?") -> SPLIT to Teacher.

Same teacher in lec04, but diarization differs: TEACHER (45.1%) AND STUDENT_1 (43.6%) are BOTH the teacher (label split mid-sentence) -> relabel STUDENT_1 to Teacher, one SPEAKER log row per chunk. STUDENT_2..STUDENT_8 each mix several students and often begin with the teacher's lead-in ("great question amrita yeah so my question...") -> SPLIT. STUDENT_9 01:58:44-01:59:17 = teacher's battery/mic aside (`Teacher?`). STUDENT_10/11/14/15 = short interjections (`Student?` unless clear). Always check the speaker_stats for a split teacher before assuming TEACHER is the only teacher label.

Same teacher in lec05: TEACHER = Teacher (79.7% talk, 149.5 words/turn); STUDENT_N -> Student N. STUDENT_8 is mostly the teacher (poses questions, calls names, evaluates answers) -> relabel per turn with context (SPEAKER), else `Student?`. STUDENT_1 / STUDENT_2 / STUDENT_6 mix several students (teacher calls Sandeep/Ajay/Simran and STUDENT_1 answers) -> names only on the turn right after a call. Diarization boundaries often lag a speaker change by a phrase -> SPLIT at grammar boundaries.

## Known structure notes
- 01:38:25–01:44:37: break (teacher: "see you folks at 10 45"). Mark as admin, add `[break ~01:38:25-01:44:37]`, not [missing].
- Class opens with teacher discussing feedback from students (admin) then topics: scaling, concurrency, delegation, communication.
- lec05: break 01:27:55-01:33:13 (`[break ...]`, "Thank you." at 01:33:13 removed as HALLUCINATION); live Go demo 00:27-01:08 (program output read aloud); final Q&A 02:36:55-03:21:42.

### lec06 (duration ~02:55:51, 3093 segments, 129 hallucination candidates, 2 gaps)
- Outline (topic candidates, not yet headings): 00:00:02 agenda + recap of the Kafka+SQS notification video (admin-ish); 00:05:38 how images are served (IMG tag, static folder, S3 proxy route); ~00:16:40 images generated on the fly (DiceDB GitHub OG image, Twitter example); 00:27:21 designing Gravatar (requirements 00:31, DB schema 00:32:09, queries/transactions 00:36-01:07, architecture + CDN 01:07:29-01:13:42); 01:14:13 Q&A; 01:23:29 on-demand image optimization (PIL, ImageMagick, 01:24:10-01:30:42); 01:30:56 Q&A; 01:34:52 break announcement; 01:40:40 tagging people in photos (senior engineer's three hats, requirements only); 02:02:56 newly unread message indicator (Redis set 02:19-02:33, auxiliary Redis 02:37:19-02:40:13); 02:41:01 pre-reads for next week (admin); 02:42:15-02:55:51 Q&A (auxiliary Redis, Gravatar privacy, DB learning resources); real close "Thanks folks ... see you folks next week. Bye-bye." KEEP.
- Break: 01:35:57-01:40:40 (teacher at 01:34:54-01:35:57: "take a break for five minutes ... come back at 10.41"). Gaps 01:36:00-01:39:42 (221 s) and 01:39:42-01:40:40 (57 s). Mark `[break ~01:35:57-01:40:40]`, admin, not [missing]. "Thank you." at 01:39:42 (#1726, PHRASE + AFTER-GAP, alone between two gaps) -> remove as HALLUCINATION (2 signals).
- Real thank-yous to KEEP: 01:23:01 TEACHER "Thank you." (#1476 - check: follows STUDENT_4 "That's right." at 01:23:01, probably a student's thanks under TEACHER label -> `Student?`), 01:31:50, 01:34:50, 02:51:04 students' "Thank you." after their answers; 02:43:13 "Thanks.", 02:46:40 "Thanks.", 01:32:55 "Thanks." - all conversational. The ~90 single "Okay." PHRASE candidates are real back-channel in a live class -> keep (never remove an "Okay." just because it is flagged).
- LOOP candidates: 00:43:11 "very quick, very, very, very, very quick" = natural emphasis -> keep; 00:57:50 "no no no no no no no no not photos id but photos dot is active" (teacher correcting a query) -> collapse to a plausible count (2-3 "no"), log LOOP; 01:17:56 "yes yes yes yes yeah" inside STUDENT_1 + new question -> collapse + SPLIT; 01:44:44 "no no no no" (student quoting) -> keep up to 3, log if collapsed; 01:46:06 "one one one one one one one okay" (teacher) -> LOOP, collapse; 02:20:53 / 02:22:46 "No, no, no, no." (STUDENT_4) -> plausible, keep; 02:45:00 "got it got it got it got it" -> collapse to "got it, got it" (LOOP).
- REPEAT-SEG candidates (00:12:32, 00:32:09, 00:36:28, 00:52:55, 00:54:17, 01:02:24, 01:30:01, 01:43:20, 02:04:31, 02:46:02, 02:53:11, 02:53:41, 02:54:13, 02:55:37) all fit the teacher's emphatic repeating style ("Let's start with database." x2, "It will be cluster." x2) -> KEEP both copies; at most `[check: possible ASR duplicate]` where timing is identical (00:32:09 #511/#512 same second).
- RATE candidates (00:05:38, 00:15:22, 00:22:31, 00:35:47, 00:36:04, 01:03:32, 01:06:51, 01:14:54, 01:43:01, 02:20:45, 02:38:50, 02:49:40) are short segments with tight timestamps, content fits -> keep. 00:22:31 "It is a template I used to watch it." reads oddly -> `[check: ...]` only if the context does not explain it.
- Lone "." at 01:11:09 (#1227) and "So" at 02:51:45 (#2986) -> drop "." silently as empty; keep "So".
- Crosstalk / fragmented zones (speaker splits likely, per-segment decisions): 00:32:20-00:35:30 (STUDENT_2 1-3 word segments interleaved with teacher), 01:00:35-01:01:40 (Sitesh + teacher inside STUDENT_2), 02:10:50-02:13:04 (teacher inside STUDENT_3), 02:20:20-02:23:37 (STUDENT_4 with teacher prompts), 02:43:21-02:49:04 (auxiliary-Redis Q&A; label boundaries cut sentences between STUDENT_2 / STUDENT_4 / TEACHER).
- Teacher reads URLs/paths aloud ("slash static slash IMG slash appy.jpg", "gravatar.com slash hash", "api.gravatar.com slash photos") -> keep spoken form ("slash"), do not convert to "/" paths. Hash digits "zero EAFD 172" kept.
- No Hindi / Devanagari in lec06 -> romanization rules unused.

## Open questions

- lec02: "web software" = WebSocket? (5 flags); "two links" = toolings? (4 flags); teacher name Arpit vs Abhishek; "OCS streaming" (02:39:04); "Daryl Abu Devi" (00:52:30, DynamoDB?); live-streaming product "randomized / come my documentation" (02:48:29).
- lec03: "SPS" (00:18:26); "64 bits in TV" (01:37:43); "lighting services" (01:43:26); "Charlotte partitioned" (02:00:10, sharded?); "of Atilla" / "two words back" (01:36); "fifth thing" = fifth week? (02:27:42-02:28:04); "local eat" (02:24:53); "We'll sing back at 10" (00:54:41); "2-264" = 2^64? (01:09:36); "round robin port" (01:28:15); "forex/forexes" = 4X? (01:18:57); "nextval" (02:12-02:20); "M1 happened" = M1 hyphen? (00:23:09, 00:24:15); who is "Akshay" (02:21:02).
- lec04: "re-log" (00:04:36, course platform?); "AOSN" (00:07:37); "Spongebob" (01:00:46, Pub/Sub?); "ArrowDB" (01:00:52); "CCB" (00:56:43, ElastiCache?); "DataWare" (02:07:32); "DVO" (02:47:19); "DBI" (02:53:03); "ECD" (02:59:47); "HTTP is TC" (03:05:23, cut off); "Hussain Nasser" spelling; "vendor locking" vs "vendor lock-in".
- lec05: "RANDUP" (00:39:57, Go `rand`?); "SSCs" (00:26:48, SSEs? also lec02 03:05:25 "SSC"); "commit blog" (02:35:35, Postgres commit log?); "TrustMeet" (01:20:11); "rapid time" (03:21:00, RabbitMQ?); "database login" (01:07:23); "for a bit" (01:21:15, for update?); "discalpe" (02:20:26, disk IO?); "copyright type" / "IKT" (01:39:54-01:40:03, value column types); "bad job" (batch job?); Vert.x (02:58:40) to confirm.
- lec06 (flag, do not guess): (1) "arvizhany.me" 00:10:11 - teacher's own domain arpitbhayani.me? -> `[?arpitbhayani.me | asr: "arvizhany.me"]`; (2) "TAPE" 00:09:32 in image-format list - TIFF? -> `[?TIFF | asr: "TAPE"]`; (3) "UJR has equal" 00:58:36 -> `[unclear: ...]`; (4) "ejective two" 01:00:09 - "is active true"? -> flag; (5) "sends it to the CD." 01:18:57 - CDN? -> flag; (6) "when you do a sync" 01:29:29 - async vs sync (meaning flips) -> flag; (7) "15th cohort of bike" 01:06:33 -> `[unclear: "of bike"]`; (8) "for car 74 to 75 contributors" 00:19:28 -> `[unclear: "for car"]`; (9) "J.K." 02:55:26 vs "DK" - same student?; (10) "Sitesh" (lec06) vs "Sidesh" (lec05) spelling; (11) "It is a template I used to watch it." 00:22:31; (12) "senior environment sub typically a cxo" 01:40:51 (senior management?) -> `[unclear: ...]`; (13) "today will bear the first hand" 01:42:35 ("wear the first hat"?) -> flag `[?wear the first hat | asr: "bear the first hand"]`; (14) "that's my strong quota" 02:53:31 (strong forte?) -> keep + `[check]`; (15) "phantom reads is obviously coming next week" 02:53:17 - correct term, keep. Added in Pass 5: (16) teacher's domain arvizhany.me / edge.* forms - confirm arpitbhayani.me by listening; (17) "Heyman"/"Heman"/"Hey man" - one student (Hemant?); (18) write vs right at 02:43:09, 02:44:30, 02:45:56-57, 02:48:13; (19) "predicate pushed up" vs predicate pushdown (01:21:52); (20) "over" = O(1)? (02:22:55, 02:23:26); (21) "account" = count? (02:46:13, 02:50:58); (22) J.K. vs DK (02:55:26).
- Unknown acronyms as ASR wrote them: GCVM (00:29:35), EPS (00:31:03), MPT (00:38:25), FII (02:28:21), SSC (03:05:25), ACT (02:48:44), STD (02:06:45). Keep as-is with [?term | asr: "..."] if they don't make sense in context.
