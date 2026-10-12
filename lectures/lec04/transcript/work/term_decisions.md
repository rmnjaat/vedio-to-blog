# Term decisions — lec04 (frozen 2026-10-13, Pass 0b)

Copied from project `transcripts/term_decisions.md` (lec01 + lec02 rows), then lec04 decisions added below each section.

Lecture 4 is almost entirely spoken ENGLISH (Indian-accented), same teacher (Arpit). It is the opening session of a new cohort ("This is 16th cohort", "next eight weeks"): course rules / admin, then online-offline indicator (heartbeat), Redis vs DynamoDB, connection pooling, storing date time (string vs epoch integer vs custom integer, Redbus example), soft delete vs hard delete, caching intro, final Q&A.
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

### Added for lec04 (2026-10-13) — one row per term_scan row (scan rows in order, then unknown tokens)

Ambiguous rows are CONTEXT RULES: check every occurrence; never bulk-replace.

| Canonical | ASR forms seen | Decision / rule (lec04 evidence) |
|---|---|---|
| port | !part (54) | AMBIGUOUS. REJECT by default: every sampled hit is the English word "part" ("the more interesting part", "on and offline part", "cash part"). Change to "port" only if a port number / networking socket is named in the same sentence. |
| Redis | !read (39) | AMBIGUOUS. "read" is the real verb almost everywhere (reads/writes, "read about them later", "read through all three"). Change only when "read" cannot be a verb AND the sentence is about Redis; otherwise keep (no flag needed unless nonsense). |
| cache / caching | !cash (30) | AMBIGUOUS rule, but all lec04 hits fall in the caching section (02:17:18-02:47) or in caching questions ("separate cash component", "cash results in DB", "data in cash", "the cash part"). No money/payment example exists in lec04 -> cache (TERM, high) in those sentences. Any hit outside a caching sentence -> `[?cache \| asr: "cash"]`. "cash it" (02:22:01 "where you can cash it") -> "cache it". |
| in-memory | in memory (22) | Hyphenate only when adjectival before a noun ("in-memory database", "in-memory deletion"); "Redis is in memory database" -> "in-memory database". "it's in memory" (predicate) stays two words. |
| trade-off | trade off (22) | noun only ("those trade-off decisions", "the trade-offs"); verb "trade off X" stays. |
| (REJECTED) trie | !try (20) | REJECT: "try to", "try it on" — verb every time; lec04 has no trie discussion. Keep "try". |
| load balancer | load-balancer (12) | spacing/hyphen normalization only. |
| (REJECTED) shard | !shared (12 + 6 duplicate row) | REJECT: every hit is "shared" (links, recordings, articles "shared on the chat"). Keep. |
| connection pooling / connection pool | connection pulling; connection polling; correction pulling; !pulling (10) | lec04 has NO polling topic; it has a long connection-pooling section (01:05-01:34, Q&A 02:52-02:59). Rule: "connection pulling" / "connection polling" / "correction pulling" -> "connection pooling" (TERM, high: 01:28:44, 01:31:47, 02:53:40, 02:53:44). Bare "pulling"/"polling" -> "pooling" only if the same sentence is about the connection pool (01:06:25 "polling." right after "connection pooling" highlight -> pooling, medium; 02:53:16 "pulling local database" -> flag `[?pooling \| asr: "pulling"]`). KEEP "pulling in a lot of data" (01:27:39). |
| key-value | key value (9) | hyphenate when adjectival ("key-value use case", "key-value store"). |
| DynamoDB | dynamo DB; dynamo db (8); dynamo tv (2); DynamiteDB (1); dynamic DB (1) | "dynamo DB" -> DynamoDB (spacing). "dynamo tv" (00:20:02, 00:20:08, "company not on AWS cannot use dynamo tv") -> DynamoDB, TERM high. "DynamiteDB" (02:47:02, "proposed either DynamiteDB or Redis") -> DynamoDB, TERM high. "dynamic db" (02:50:42 "a database that gives us a dynamic db gives you redis") -> DynamoDB, TERM medium. Bare "Dynamo" (teacher's short form) and "DDB" (02:43:40) stay as spoken. |
| (REJECTED) Apache Flink | !link (6) | REJECT: Google-form link, article links, "link here". Keep. |
| WebSocket | web socket (6) | join + casing (log TERM per lec02 rule); "web sockets" -> "WebSockets". |
| autoscaling | auto scaling; auto-scaling (6) | 01:21:03 "do auto scaling on the fly" -> autoscaling. |
| (REJECTED) cohort | !code (6) | REJECT: lec04 hits are source code ("rewrite a bunch of their code", "underlying code will be the same"). 00:51:17 "entire code thinking about that other technology" -> keep "code" (fits "rewrite their entire code"). The real word "cohort" is already said correctly 8x. |
| (REJECTED) session | !section (6) | REJECT: "each session has a bunch of sections", "next section", "find section which says discuss one-on-one" — all real "section". |
| (REJECTED) SLO | slow (5) | "making your read slow" etc. — adjective. Keep. |
| (REJECTED) trie | !tree (5) | REJECT: B-tree / index context ("tree balancing", "tree node", "rebalancing") — "tree" is correct. Keep. |
| MySQL | my SQL (4) | casing/join. 01:15:02 "if my SQL connection or if my TCP connection" -> "MySQL connection" (product, parallel to TCP; medium-high). 02:52:15 "If you're using my SQL use DBZM" -> MySQL. |
| DBs | DBS (3) | "relational DBS" -> "relational DBs"; "documentation of DBS" -> DBs; "specific to some dbs" -> DBs. |
| REST | rest (3) | "rest based service" -> "REST-based service" (00:43:01); other hits same rule only when API style is meant. |
| (REJECTED) packet | !pocket (3) | REJECT: "8 GB is right there in your pocket" (00:36:00), "goes into Amazon's pocket" (00:52:23) are real. 02:05:56 "a pocket teacher" is NOT packet -> see epoch row. |
| S3 | S3 (2) | keep as spoken "S3"; do NOT expand to "Amazon S3". |
| DB / DBs | !TV (2) | covered by DynamoDB row ("dynamo tv"). |
| (REJECTED) EC2 | !easy to (2) | 00:02:18 "it's easy to get the most out of" — real phrase. Keep. |
| (REJECTED) QUIC | !quick; QUICK (3) | 02:11:53 "a quick question" — real. Keep. |
| Redis | radius (2) | 01:02:48 "MySQL Radius Elasticsearch" (DB product list) -> Redis, TERM high (both hits in that segment). |
| TigerGraph | Tiger Graph; tiger graph (2) | casing/join (02:43:11, 02:43:20). |
| cron job | crown job (2) | 02:37:04, 02:37:25 soft-delete cleanup job; "cron job" said correctly 14x. TERM high. |
| disk | !desk (2) | 01:59:49 "for your database, for your desk, for everything, for your computer" (integer comparison efficiency) -> disk, medium; 02:16:50 "reduce an expensive desk io network io computation" -> "disk IO", high. |
| distributed system | distribute system (2) | 01:18:12, 01:18:30 -> "distributed system", WORD medium (glossary term; "-d" dropped by ASR). |
| (keep) horizontally scaling | horizontally scaling (2) | grammatical as spoken ("if you're horizontally scaling your DB"). No change. |
| keep-alive | keep alive (2) | "keep alive header" -> "keep-alive header" (hyphen only). |
| key-value store | key value store (2) | hyphenate. |
| HTTP/2 | HTTP two (1) | 03:03:37 "connection support HTTP two keeps the persistent connections" -> HTTP/2, TERM high. 03:04:39 "we'll use HTTP to specifically and we'll keep it stateful" -> flag `[?HTTP/2 \| asr: "HTTP to"]`. |
| Redis | red is (1, listed twice) | 02:44:38 student "my question is about red is actually ... TTL" -> Redis, TERM high. |
| endpoint | end point (1) | 00:25:11 join, TERM (verifier join rule). |
| (REJECTED) read-through | read through (1) | 03:05:18 "I read through all three" — verb. Keep. |
| stateful | state full (1) | 03:04:21 "making it state full" -> stateful, TERM high (03:04:39 "keep it stateful" said correctly). |
| (REJECTED) uptime | up time (1) | 01:22:16 "at the boot up time" -> keep words; "boot-up time" hyphen allowed, no join to uptime. |
| epoch / epoch integer | a POC integer; a poch; a pocket teacher; a open integer | Date-time storage section (01:53-02:11): teacher says "epoch" correctly ("epoch integers", "epoch milliseconds"). "a POC integer" (02:00:48, 02:00:51, 02:10:00) -> "an epoch integer", TERM high. "a poch" (02:03:39) -> "an epoch", TERM high. "a pocket teacher" (02:05:56 "didn't use daytime as a pocket teacher") -> `[?an epoch integer \| asr: "a pocket teacher"]` (flag, too garbled). "a open integer" (02:02:32) -> "an epoch integer", medium. |
| date time | daytime; Daytime | Date-time section only (01:53-02:11): "daytime object", "Daytime has become performance", "store daytime as daytime" -> "date time" (teacher's spoken form, as in "store date time as epoch integers"). WORD high. Not outside that section. |
| Redbus | red was | 02:05:53, 02:05:56 "why red was, red was didn't use..." -> Redbus (teacher's example, "Redbus" said correctly 02:00:26, 02:02:41). TERM high. |
| integer comparison | integer comparizer | 01:59:44 "It's just integer comparizer" -> "integer comparison", WORD medium. |
| CRUD API | crowd API | 00:05:28 "every crowd API and all those" (implement the core, not every CRUD API) -> CRUD API, TERM high. |
| cloud providers | crowd providers | 00:56:40 "all of the crowd providers that I know, AWS ..." -> cloud providers, WORD high. |
| TTL | TTR | 00:45:08 "every time you receive a heartbeat, you reset the TTR to 30 seconds" -> TTL, TERM high (TTL/expiration used throughout the heartbeat design). |
| Aerospike | ArrowSpike (3) | 01:00:52-01:00:54 database list ("ArrowSpike is proprietary") -> Aerospike, TERM medium-high. |
| Debezium | DBZM (2) | 02:52:09 "your CDCs, DBZM gives you that", 02:52:15 "using MySQL use DBZM to capture all this" -> Debezium (CDC tool), TERM high. |
| flash sale | FlashSane (1) | 01:33:10 "When we discuss FlashSane" -> flash sale (said correctly at 00:03:23-00:03:40), TERM high. |
| TCP connections | PCM (1) | 01:20:05 "scale up your database to handle large number of PCM" -> flag `[?TCP connections \| asr: "PCM"]` (could also be "connections"). |
| (keep) BCE | BCE (1) | 02:10:57 "from BCE to, you know," — dates before 1970 discussion; real abbreviation. Keep. |
| (keep) RAM, CPU, IO, UI, OS, GDPR, GPT, AI, GitHub, RDS, AOF, RDB, DM, DK, POC | as written | real acronyms/names as spoken; "io" -> "IO" casing. POC only where not "a POC integer" (see epoch row). AOF/RDB = Redis persistence modes (00:56:15), correct. DK = student name (see names). |

### Added for lec04 in Pass 5 (reconciled from chunk notes, 2026-10-13)

| Canonical | ASR forms seen | Decision / rule (lec04 evidence) |
|---|---|---|
| day zero architecture | DAISY architecture | 00:16:55 -> "day zero architecture" (TERM medium): teacher says "day zero architecture" at 00:17:21 and 00:18:31 in the same explanation. |
| HyperLogLog(s) | hyperlog logs; hyperlog | Redis advanced data-structure list (00:58:16 high, 02:14:37 medium). |
| geospatial | geo special | "geospatial queries" in the Redis data-structure list (00:58:16, 02:14:37). |
| B plus tree | b plus 3; B plus 3; B plus three | Keep the teacher's spoken words "B plus tree" (not "B+ tree") in index / rebalancing context (01:46:59-01:47:23, 02:34:12). |
| varchar | where care; where cat | column-type discussion short text vs long text (01:48:49-01:51:21), TERM high. |
| published at | published art | blogs-table column (01:52:39, 01:57:18). |
| blog(s) / blogging | !block(s); !blocking | ONLY in the blogging-app schema / caching-the-blog stretch (01:41-02:28): "blocking application" -> blogging, "Block body" -> blog body. "blocking" in connection-pool context (blocking queue) stays. Doubtful hits -> `[?blog \| asr: "block"]`. |
| disk | disc; !desk | spelling "disc" -> "disk" in storage sentences (01:51:27, 02:41:25-02:45:19), WORD high. |
| byte | !by | byte-offset explanation only (01:49:12, 01:49:21). |
| select star | select start | SQL "select *" spoken (01:54:30). |
| time to live | time to leave | TTL expansion spoken by teacher (00:44:13). |
| pre-reads | !periods | 00:45:52 course pre-reads, WORD medium. |
| connection pool | connection pull | "where does this connection pull run" (01:15:23) -> connection pool. Adds to the connection-pooling row. |
| connection | !correction | "database correction object" (01:15:28, 01:15:35) -> connection. |
| sync back | sink back | "we'll sink back at 10.40" (01:34:03, 01:34:23) -> sync back, WORD medium. |
| fire a query | file a query | 01:43:12 "file a delete query" -> fire, WORD medium. |
| ChatGPT | chat GPT | casing/join. |
| Atlassian | atlashan; atlaction | 02:24:08, 02:24:24 (14-day data-loss outage), TERM high. |
| Postgres | post-gree | 02:41:17 "post-gree or MySQL", TERM high. |
| IOs | iOS | "How many IOs would happen" (02:35:20) — disk IO context only. |
| RAM | ramp; !run | RAM-vs-disk sentences only (02:41:45, 02:41:49). |
| Redis | Reddit side | 03:00:28 "Reddit side" -> Redis (TTL question). Adds to the Redis rows. |
| constraints | constants | 02:00:11 "relax some constants" -> constraints (WORD medium). |
| (keep, flagged) vendor locking | vendor locking | teacher's "vendor locking" kept as spoken (real word); only the non-word "vendor lock and" -> vendor lock-in. |
| (flag only) | Dynamite; funder; simple max; searches (surges); AI (AOF); app of integers; IDs (IDEs); hyperlog -> decided above | kept as `[?... \| asr: ...]` flags in lec04; not decided. |

## Course-specific names (products, tools, people, companies the teacher uses)

| Canonical | ASR forms seen | Notes |
|---|---|---|
| (student names) | | Keep names exactly as ASR wrote them unless the same person is clearly spelled differently in the same chunk; if unsure, keep and add [check: name spelling]. Do not invent names. |
| Arpit | Arpit; Erfit | (lec02) students address the teacher as "Arpit" 4x - probably the teacher's name; also used in the teacher's own example. Never a label; label stays "Teacher". |
| Abhishek | | (lec02) addressed 3x (02:54:08, 03:11:56, 03:11:59); conflicts with "Arpit" - open question, keep as spoken. |
| lec02 student names | Pankaj, Ajay, Sunil, Jay, Vikram, Amrit/Amrik, Rajiv, Harsh ("harsh gone"), Sampat/Sampar, Summit (Sumit?), Jodhinder, Devasheesh, Matt, DP, Alex(a), Rahul, Alok | Attach to a label only for the turn right after the teacher calls the name (`Student 4 (Sunil)`); diarization labels mix people. |

### Added for lec04

| Canonical | ASR forms seen | Notes |
|---|---|---|
| Arpit (teacher) | Arpit; arpit; Arpeth; Arpat | lec04 confirms: students address the teacher "Arpeth" (00:58:41), "hey arpit" (01:19:01), "Hi, Arpit" (01:24:48), "Arpat" (02:20:22), "arpit going back to" (02:32:01). Normalize Arpeth/Arpat -> Arpit (WORD, high). Never a speaker label. |
| lec04 student names | Rahul (00:58:39), Shalimda (00:58:47, keep + [check: name spelling]), Gaurav (03:02:59), Baba (03:05:09), Sankal (03:05:40, [check: name spelling]), Amrita (01:23:06, 02:30:05), Sandeep (02:08:39), Ajay (02:22:19), Rajiv (02:32:01), DK (01:24:46, 02:46:44) | Teacher calls the name, the next voice is that student. Attach name only to that turn. |
| Redbus | Redbus; red was | bus booking company in the date-time example. |
| Google Drive, AWS, Azure, GCP, Lambda, Instagram, Cassandra, MongoDB, Postgres, Elasticsearch | as written | casing only. "DynamoDB streams" casing. |
| more lec04 student names (Pass 5) | Jodhita / jyothi (00:48:09, 00:51:38, [check: name spelling]), Mohit (01:02:13, 01:33:52), Sandeep (01:02:13), Shreya (01:02:13), Surya (02:06:19, 02:45:12), Nitin (02:36:55), Vishan (02:38:57, [check]), Anwar (02:39:39), Amrik Gaur (02:52:42, [check]), Deepak (02:59:29), Husha (03:00:19, [check]) | keep as ASR wrote them; attach only to the turn right after the call. "Mirita's" (02:36:58) flagged `[?Amrita's]`. |
| Hussain Nasser | Hussain Nasser | 02:59:58 teacher recommends his video; probably YouTuber "Hussein Nasser" — kept as ASR wrote it (open question). |
| Medium, Goldman Sachs, Stack Overflow, Redis Labs ("Redis lab" kept) | as written | casing only. |
| learn.relog.in | learn.relog.in; re-log | learning-portal URL (00:09:16); "re-log" (00:04:36) kept + `[check: name]` — platform name not confirmed. |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | lec04 also English; no Devanagari seen in scan. |

## Speaker map

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 45.1% talk, 76 words/turn; opens class ("Thank you so much for joining this cohort... 16th cohort"), runs admin, explains every topic, closes ("Thanks folks for tuning in... See you folks tomorrow morning", 03:06:13). BUT this label also swallows student speech: e.g. 01:24:48 "Hi, Arpit." (student), 03:01:12 "so today i mean i quite learned..." (student), 03:03:01-03:03:08 Gaurav's question "You mentioned in the very beginning that HTTP is a stateless...", 03:05:00-03:05:07 "in one of the resources that you shared previously ... Is it true?". Split those turns to `Student?` / `Student (Name)` with SPLIT/SPEAKER logs when a name was just called. |
| STUDENT_1 | **Teacher** (label split of the teacher's voice) | 43.6% talk, 75 words/turn — same size as TEACHER; continues the teacher's sentences mid-clause across label switches (00:03:05 "through it understand it on your own right third is revise regularly" continues TEACHER 00:02:59; 01:58:11-02:02:06 Redbus/date-time explanation; 03:01:32 "So at the end of eight weeks... you'll have this intuition"). Relabel to Teacher everywhere (log one SPEAKER row per chunk noting the label-split rule, not per line). Exception: short student back-channel inside STUDENT_1 after a student's question (03:05:37-03:05:40 "Right. So that's fine. Thank you. Sure." = the student who asked; "Sankal." at 03:05:40 = teacher calling next name) -> `Student?` unless the asker is named. |
| STUDENT_2 | Student 2 (mixes people) | Distinct student voices asking questions (00:48:13 managed service / vendor lock-in; 01:22:08 TTL connection question; 02:22:22 soft-delete size; 02:30:05 cron job interview question). Mixed: some segments START with the teacher's words ("but it's fine go on okay" 01:22:08; "thank you yeah amrita um hi" 01:23:06; "great question amrita yeah so my question..." 02:30:05) -> split the teacher's lead-in, then the student. If teacher just called a name, use `Student (Amrita)` etc. |
| STUDENT_3 | Student 3 (mixes people) | Redis persistence/AOF points 00:55:22-00:57:38; festival connection-pool question 01:31:29; Redbus custom-format pushback 02:03:20; cache compression 02:26:04; Redis TTL question 02:44:38. 02:26:17 "Depends." under STUDENT_3 is likely the teacher answering -> SPEAKER only with clear evidence. |
| STUDENT_4 | Student 4 (mixes people) | DynamoDB argument 00:46:38-00:47:54; 00:58:39 "Thanks Rahul for adding that." is the teacher, then student "Arpeth, in that case..."; 01:19:01 "any question on this on and offline part yes" = teacher lead-in, then "hey arpit so one question..." student; 02:08:39 "before we move to caching sandeep go on" = teacher, then Sandeep's epoch question; 02:39:02 uniqueness-index question. |
| STUDENT_5 | Student 5 | soft-delete / Google Drive question 02:06:20-02:08:07; 02:50:31 "should we try to avoid features specific to some DBs". |
| STUDENT_6 | Student 6 | caching-in-DB question 02:20:22 ("Yeah, Arpat."), 02:32:12, Redis cost 02:35:50; "Great. Thanks." 03:02:56. |
| STUDENT_7 | Student 7 | connection-pool min/max question 01:28:32; "video was stopping for me" 01:31:13; retention policy 02:40:02. |
| STUDENT_8 | Student 8 | time-zone point 02:04:35-02:05:47; closing "Thank you. Bye." 03:06:43 (real, keep). |
| STUDENT_9 | **Teacher?** at 01:58:44-01:59:17, else Student? | 01:58:44 "right just a minute my battery went off" / 01:59:17 "Let me check on the mic in this." falls mid-teacher-explanation (date-time) and the teacher resumes "Got it. Okay. So the first option..." -> most likely the teacher's mic/battery -> `Teacher?` (flag). Other STUDENT_9 lines are one-word back-channel ("Yeah.", "Got it.", "Okay.") -> `Student?`. |
| STUDENT_10, STUDENT_11, STUDENT_14, STUDENT_15 | Student? (short interjections) | 1-3 segments each, 1-5 words ("How you can configure it?", "All of them.", "Hello. Go ahead.", "Got it. Yeah. Thanks."). 02:41:07 STUDENT_14 "Hello. Go ahead." is likely the teacher inviting a speaker -> Teacher only with clear evidence. Number them Student 10/11/14/15 when clearly a student. |

Back-channel rule (lec02) still applies. Diarization quality in lec04 is POOR (teacher split across 2 labels; student labels start with teacher lead-ins). Expect many SPLIT/SPEAKER rows around every Q&A.

## Known structure notes
- 00:00:02-~00:16: cohort opening / course rules (admin): participate live, pre-reads, three one-on-ones, implement the core, feedback form, recordings. Mark `*(admin)*`.
- 01:34:40-01:39:55: break (284 s gap; teacher "See you folks at 10.40 in five minutes" ~01:34:3x). `[break ~01:34:40-01:39:24]`; the lone "Thank you." at 01:39:24 (STUDENT_1, after 284 s gap, PHRASE) = HALLUCINATION candidate with 2 signals -> remove + log unless context supports it. Second gap 01:39:24-01:39:55 (30 s), then "great we'll start with the second half".
- 01:58:44-01:59:17: 30 s gap — battery/mic issue ("my battery went off"); not missing content, mark admin aside.
- Hallucination candidates: 108 rows, almost all single "Okay."/"Thanks." back-channels -> KEEP (real). Repeat-segment rows (#233, #441, #544, #895, #1037, #1720, #1811, #1941, #2390, #2622, #2794) -> teacher repeats for emphasis in this style; keep both + `[check: possible ASR duplicate]` unless truly identical at a 30 s window edge. Loops: 00:29:38 "I'm alive" x4 = teacher acting out a heartbeat (keep, teaching device); "much" x4 (01:12:14), "massive" x4 (01:16:23), "much" x6 (02:16:20), "always" x4 (02:45:30), "how" x4 (02:45:05), "No" x5 (02:07:08): teacher genuinely stacks intensifiers (00:04:01 "much, much, much better") -> collapse only to 3 if 5+; log LOOP. High-rate rows (7-9 w/s) are short sentences, not hallucinations.
- Topic flow (for headings later): admin/course rules -> online/offline indicator (heartbeat, TTL, Redis vs DynamoDB, ~00:13-01:05) -> connection pooling (~01:05-01:34) -> break -> storing date time (string / epoch / custom, Redbus, ~01:40-02:12) incl. soft delete vs hard delete -> caching intro (~02:12-02:32) -> Q&A (soft delete, Redis cost/TTL, DB-specific features, connection-pool downsides, HTTP stateless, ~02:32-03:06).
- Class ends at 03:06:41 with real goodbyes (teacher "Bye-bye", Student 8 "Thank you. Bye.") — keep.

## Open questions

- lec02 (carried): "web software" = WebSocket? "two links" = toolings? teacher name Arpit vs Abhishek -> **lec04 supports Arpit** (5 direct addresses); "OCS streaming"; "Daryl Abu Devi"; live-streaming product "randomized / come my documentation"; acronyms GCVM, EPS, MPT, FII, SSC, ACT, STD.
- lec04 unknown terms (keep ASR form, flag with `[?...]` only where a guess is given):
  - "re-log" (00:04:36 "You can block it through re-log") — course platform / booking tool name? keep + `[check: name]`.
  - "AOSN" (00:07:37 "the first ever link that was shared was AOSN") — unknown article/site; keep + `[check: term]`.
  - "DAISY architecture" (00:16:55) — DECIDED in Pass 5: "day zero architecture" (see Pass 5 rows).
  - "Spongebob" (01:00:46 "like Redis has Spongebob, DynamoDB has its own set of features") — likely "Pub/Sub" (Redis feature); flag `[?Pub/Sub | asr: "Spongebob"]`.
  - "ArrowDB" (01:00:52 "Now there is ArrowDB, ArrowSpike") — Aerospike repeated / AlloyDB / ArangoDB? flag `[?term | asr: "ArrowDB"]`.
  - "AWS CCB" (00:56:43 student: "AWS CCB as a managed service") — ElastiCache? flag `[?ElastiCache | asr: "CCB"]`.
  - "DataWare" (02:07:32 "So DataWare has to do rebalancing once versus many times") — "database"? flag `[?database | asr: "DataWare"]`.
  - "DVO" (02:47:19 "I use Redis as a primary DVO worker") — unclear -> `[unclear: "primary DVO worker"]`.
  - "DBI" (02:53:03 "from one DBI, uh, switch to two") — "DB"? flag `[?DB | asr: "DBI"]`.
  - "ECD" (02:59:47 "Google search to ECD") — unclear -> `[unclear: "Google search to ECD"]`.
  - "TC" (03:05:23 "Uh, HTTP is TC.") — cut-off "TCP"? keep + `[check: cut off]`; do not complete.
  - "interior" (00:04:01 "much, much, much better interior") — "engineer"? flag `[?engineer | asr: "interior"]`.
  - "persistent relations" (01:00:21) — "connections"? flag `[?persistent connections | asr: "persistent relations"]`.
  - "participant life" (00:02:23 "participant life no matter what") — "participate live" (the teacher's point #1 wording at 00:02:07); WORD medium -> correct + log.
