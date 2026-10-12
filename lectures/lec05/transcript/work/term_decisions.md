# Term decisions — lec05 (Week 2 Day 1: relational databases, pessimistic locking, airline check-in demo, key-value store on a relational DB)

Copied from the project file `transcripts/term_decisions.md` (lec01 + lec02 rows) on 2026-10-13, then extended for lec05 in the
"lec05 decisions" sections below. Frozen after Pass 0b.

Lecture 5 is spoken ENGLISH (Indian-accented) with almost no Hindi, same teacher as lec01/lec02. Romanization rules apply only to the rare Hindi words.
Content: relational DBs / ACID, shared vs exclusive locks, `SELECT ... FOR UPDATE`, `SKIP LOCKED`, `NOWAIT`, deadlocks, live Golang demo
(airline check-in, 120 seats, 5 approaches), BookMyShow / IRCTC / COVID portal examples; break; then a (distributed) key-value store on
MySQL: schema, value types, TTL / `expired_at`, soft vs batch deletes, upsert, Redis expiry comparison, KV API routing + sharding by range,
ORMs, JVM vs Go, Q&A.

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

### lec05 decisions — every term_scan.md row (2026-10-13)

Non-ambiguous rows -> canonical; AMBIGUOUS rows -> context rule (never bulk-replace).

| term_scan row (canonical <- ASR form) | Hits | Decision for lec05 | Evidence |
|---|---|---|---|
| Redis <- read | 76 | **REJECT (keep "read")**. All checked hits are the verb/adjective "read" (read locks, read throughput, pre-reads, "you should read"). Change to Redis only if a sentence is unambiguously about Redis AND "read" is the subject noun — none expected; else keep. | 00:05:10 "you should read"; 00:16:30 "read logs" (= read locks, see lock row) |
| port <- part | 48 | **REJECT**. Every hit is "part" (accounting part, crux part, payment part, three parts). No networking context in lec05. | 00:03:28, 00:06:01, 02:34:21 |
| in-memory <- in memory | 46 | Hyphenate only when adjectival before a noun ("in-memory database", "in-memory layer"); predicative "stored in memory" stays. Casing/hyphen = silent. | 02:08:02 "in-memory database"; 02:26:29 |
| shard <- shared | 46 + 23 | **REJECT**. "shared lock(s)" is the correct DB term (shared vs exclusive locks, 00:07:18-00:19:32) and "I shared four articles / a video" is the verb. Sharding is said correctly at 01:26:48, 02:30:58-02:33:50. | 00:07:18 "First is shared lock. Second is exclusive lock" |
| key-value store <- key value store / key-value | 42 + 26 | "key value store" -> "key-value store" (hyphenate adjectival compound; silent). "key value pair" -> "key-value pair". "KV" stays "KV". | 00:01:35 onward, whole second half |
| cohort <- code | 36 | **REJECT**. Every "code" is source code ("code it out", "code base", "MySQL source code"). No cohort context. | 00:01:19, 01:16:02, 01:19:34 |
| trie <- try | 34 | **REJECT**. All verb "try/tries". No trie data structure in lec05. | 00:10:19, 00:17:22 |
| (REJECTED) SLO / SLO <- slow | 13 | **REJECT** — "slow" adjective every time (slow down throughput, pathetically slow). | 00:07:43, 02:10:04 |
| MySQL <- my SQL | 10 | -> "MySQL" (product; also "my sql's code base" split across segments 01:19:34 -> "MySQL's"). TERM, high. | 01:13:24 "My SQL is blocking it"; 01:20:00 "MySQL source code" said correctly |
| MySQL <- my sequel | 2 | 03:17:28-03:17:40 "a thread on my / sequel ... my sequel forum" -> "MySQL" (the first spans the segment boundary #3258/#3259: log as one TERM row per segment part). 03:18:32 "my SQL forum" -> "MySQL forum". high. | teacher repeats "2012, my SQL forum" at 03:18:32 |
| load balancer <- load-balancer | 8 | -> "load balancer" (silent). | 02:28:19, 03:15:16 |
| polling <- pulling; short/long polling <- short/long pulling | 8 / 4 / 4 | -> "short polling", "long polling" at 00:26:40-00:26:48 and 03:20:51 only (lists of communication patterns from the previous week's assignment). TERM high. No other "pulling" hits. | "all the four like short pulling, long pulling, SSCs and web sockets" |
| session <- section | 8 | **REJECT**. "critical section" (00:06:30) correct; "payment section section" (01:24:28, student) and "the last section that we discussed" (03:12:00) are real "section". | |
| ACID <- asset | 6 | -> "ACID" at 00:55:28 ("asset property"), 02:40:41 ("all asset guarantees"), 02:40:50 ("same asset properties in the KV"). TERM high (ACID said correctly 18x, DB guarantees context). | |
| EC2 <- easy to | 6 | **REJECT** — "it's easy to understand / code it out / mimic it". | 00:33:06, 01:16:02 |
| QUIC <- quick / QUICK | 6 / 3 | **REJECT** — "quick break". | 01:26:22, 01:26:52 |
| BookMyShow <- book my show | 4 | -> "BookMyShow" (product; TERM, high — verifier counts the join). | 01:10:15, 01:15:07 |
| SQL <- sequel | 4 + 2 | Only hits are the "my sequel" ones above -> MySQL. No standalone "sequel" to change. | 03:17:40 |
| WebSocket <- web socket | 4 | -> "WebSocket(s)"; log each join as TERM (lec02 rule). | 00:26:48 "web sockets", 03:10:51, 03:11:31 |
| JSON <- jason / Jason | 2 | -> "JSON" at 01:38:37, 01:38:48 (student: "storing Jason objects" in the value column). TERM high; JSON said correctly 4x nearby (01:39:43). | |
| WebSocket(s) <- web software | 2 | -> "WebSocket" at 03:10:54 ("disables web software connection", WhatsApp Web heartbeat discussion, "web socket" said at 03:10:51) and 03:21:37 ("we'll go very deep into scaling web software" = tomorrow's topic "scale WebSockets", said at 03:19:18). TERM medium-high. | |
| autoscaling <- auto scaling / auto-scaling | 2 | -> "autoscaling" (02:43:19, silent casing/joining but log as TERM if verifier flags). | |
| disk <- desk | 2 | -> "disk" at 01:11:17 ("every data is stored in the desk in some format ... offset") and 01:11:32 ("not happening at desk level"). TERM high (storage context). | |
| trie <- tree | 2 | **REJECT**. "binary tree" (02:08:52) and "LSM tree" (03:13:58) are correct. | |
| Pub/Sub <- pop-up | 1 | **REJECT**. 00:13:11 "It would never let this edge pop up" = deadlock / wait-for edge, real verb. | |
| REST / gRPC <- rest | 1 | **REJECT** — "for the rest of your life". | 01:08:36 |
| Raft <- draft | 1 | -> "Raft" at 01:34:29: "leader election and this and back source and / draft and whatnot" — distributed-consensus list. TERM medium. "back source" -> "Paxos" TERM medium (same list). | 01:34:24-01:34:29 |
| Redis <- red is | 1 | -> "Redis" at 02:15:47 ("access an expired key and then red is finding it out to be deleted" — Redis lazy expiry section). TERM high. | |
| TTL <- DTL | 1 | -> "TTL" at 01:45:27 (TTL said 49x; expiry clause). TERM high. | |
| WebSocket(s) <- website | 1 | **REJECT**. 02:18:42 "tagged in the redis's website" is a real website. | |
| at-least-once <- at least once | 1 | **REJECT**. 02:34:58 "do once, at least once implement this" — plain English, not delivery semantics. | |
| cohort <- court | 1 | **Override for lec05**: 03:14:51 "I had a bunch of deadlocks in my court when I was writing it" -> "code" (WORD, medium). Not cohort. | |
| joins <- joints | 1 | -> "joins" at 02:56:10 ("complex queries requiring joints of 10 or 15 tables"). TERM high. | |
| pull-based <- full base | 1 | -> "pull-based model" at 03:09:31; same line "push base model" -> "push-based model". TERM high. | |
| scale out <- scale-out | 1 | Keep "scale out" (verb, 01:34:35). | |

### lec05 decisions — other recurring mis-hearings found while reading (apply with the same rules)

| Canonical | ASR forms seen | Rule / evidence |
|---|---|---|
| lock / locks / locked (DB locking) | !log; !logs; !logged; !login | **AMBIGUOUS — context rule.** In lock sentences ("shared log", "read logs", "exclusive log(s)", "acquired the log", "row ... logged by any other transaction", "take exclusive log for update") -> lock/locks/locked, TERM high (locking section 00:07-01:26 + 02:05-02:06, 03:04:48; "lock" said correctly next to most hits). 00:10:05 "whenever you're taking logs, be it here, Java" -> "locks" (medium). 01:07:23 "you need to know database login" -> flag `[?database locking \| asr: "database login"]`. KEEP real logs: 00:46:54 "in the logs also you can see 1C" (program output), 02:35:35 "mysql bin log" (= binlog; casing only -> "MySQL binlog"), 01:24:33 "on hold and not log" -> flag `[unclear: ...]`. |
| skip locked / skip lock (SQL clause `SKIP LOCKED`) | skip log; skip logged; skip block; keep locked | "skip logged" -> "skip locked"; "skip log" -> "skip lock" (closest to sound; teacher says both "skip locked" 00:21:59 and "skip lock" 00:23:05); "bypass skip block" (01:17:38) -> "skip lock"; 02:48:48 "for updates keep locked" -> "for update, skip locked". TERM high. Keep spoken "skip lock" as is. Lowercase in prose; keep teacher's casing. |
| no wait (`NOWAIT`) | no wait | keep as spoken "no wait" (02:05:48, 00:24:05). |
| for update / for share (SQL clauses) | four share | 01:15:44 "four share suppose" / 01:15:50 "the four share one" -> "for share" (TERM high). 01:21:15 "when we just write for a bit" -> flag `[?for update \| asr: "for a bit"]`. |
| transaction | Transition; TransitionT1; !transition; !version | "TransitionT1" (00:11:22, 00:11:26) -> "transaction T1" (non-word, TERM high). STUDENT_9 01:17:38-01:18:25 "second transition came in", "third transition", "transition to" -> "transaction" (TERM medium, DB transactions taking seats). "second version failed" (01:17:44) -> flag `[?transaction \| asr: "version"]`. |
| check-in (airline) | !checking | "airline checking system" (00:01:19, 00:26:04, 00:26:05) -> "airline check-in system" (TERM high: teacher says "airline check-in system" 00:27:32, 00:27:38, "check-in service" 00:29:31). |
| B+ tree | B plus 3; b plus three; b plus t; B plus | -> "B+ tree" (TERM high; "why databases use B plus 3" 00:05:32, "B plus 3 rebalancing" 03:06:56-03:07:14). "b plus rebalancing" (03:06:37) -> "B+ rebalancing" casing only. 02:39:47 "rebalancing of binary tricks correct oh sorry b plus" -> "binary trees" WORD medium, keep teacher's self-correction. |
| semaphores | CMA purse | 01:11:49 "mutex or CMA purse are the only two constructs" -> "semaphores" (TERM high; "Mutex, the semaphores" said at 01:11:58). |
| upsert / Upsert | absurd; absurdly; !an episode | "absurd query" (01:55:33, STUDENT_10), "it's about absurd" (02:01:17) -> "upsert" TERM high ("Upsert" said 02:02:09/02:02:11). 02:00:23 "you realize absurdly wanted here" -> flag `[unclear: ...]`. 02:01:39 "he ran an episode" -> flag `[?an upsert \| asr: "an episode"]`. |
| expired_at / created_at (column names) | expired at; expired add; expired art; created add | Column `expired_at`: write as spoken words "expired at" -> keep "expired at" where it reads as words; "expired add"/"expired art" -> "expired at" (WORD high, 01:46:57, 01:49:18); "created add" -> "created at" (01:44:36). Do not add underscores. |
| N into N plus one by two | any to it plus one by two; into any plus one by two | 01:21:21-01:21:26 -> "N into N plus one by two" (NUMBER medium; said cleanly at 01:21:37-01:21:41). |
| goroutines | go routines | 00:57:07, 00:57:11 silent spacing. Golang stays. |
| JVM | JBM | 02:59:21 "Java JBM" -> "JVM" (TERM high; JVM said 02:57:09). |
| MB | MP | 02:59:25 "200 MP" (memory) -> "200 MB" (TERM high). |
| ORM | ORF; !RN | 02:54:57, 02:55:03 "ORF" -> "ORM" (TERM high; ORM discussion 02:52-02:55). 02:49:03 "from RN would still fire inquiries" -> flag `[unclear: "from RN would still fire inquiries"]` (not the ORM stretch). |
| FizzBuzz / FizzBuzz Enterprise Edition | FizBus; FIZZ, BUZZ | 02:59:44-02:59:59 "FizBus test (Enterprise Edition)" -> "FizzBuzz test" (TERM high; the famous satire repo). "FIZZ, BUZZ" -> "Fizz, Buzz" casing. |
| KV API | KvAPI; KVAPI; kv api | the teacher's routing service: "KV API" (casing only). |
| A, C, I and D | AC, I and D | 00:05:04 "four articles ... on AC, I and D" -> "A, C, I and D" (punctuation; teacher wrote 4 articles, one per letter). |
| Paxos | back source | see Raft row (01:34:24), medium. |
| fair share | pair share | 02:55:03 "my pair share of problems" -> "fair share" WORD medium. |
| demo | !demand | 00:27:32 "i'll show you a demand then we'll take questions" -> "demo" WORD medium. |
| commit log | commit blog | 02:35:35 "postgres has commit blog" -> flag `[?commit log \| asr: "commit blog"]` (Postgres WAL vs "commit log" naming uncertain). |
| SSE(s) | SSCs | 00:26:48 "long pulling, SSCs and web sockets" -> `[?SSEs \| asr: "SSCs"]` (4th communication pattern; medium; same form left open in lec02 03:05:25). |
| IOs | IOS | 01:25:51 "disk IOS" -> "disk IOs" (casing). |
| rand (function) | RAND; RANDUP | STUDENT_1 "RAND function" keep as "rand" casing-free (keep "RAND"). Teacher 00:39:57-00:40:08 "RANDUP function" -> flag `[?rand \| asr: "RANDUP"]` once per sentence; do not invent. |

### lec05 decisions — reconciled from chunk notes (Pass 5, 2026-10-13)

Cross-chunk grep of the corrected chunks after these decisions: every ASR form below is handled the same way in every chunk (no re-fixes needed).

| Canonical | ASR forms seen | Decision / evidence |
|---|---|---|
| star (SQL `SELECT *` read aloud) | start | "select start from" -> "select star from" in SQL-query context (00:19:47, 02:06:50, 02:07:26, 02:07:29). WORD high/medium. |
| upsert | upset; absurd set | "upset" -> upsert in the upsert/KV-write context (01:58:25, 02:29:24, 03:01:30), TERM high. "absurd set" (02:05:20) -> "upsert set", medium. |
| for update | four update; forward date | 00:57:29, 02:47:35 (SQL clause), TERM high/medium. |
| pessimistic lock | pessimist slot | 00:51:09, TERM medium. |
| exclusive lock | explosive lock | 01:08:20, TERM high. |
| flash sale | Plastil | 01:12:49-01:12:50 ("when we discuss flash sale" 01:10:48), TERM high. "build classes" (01:12:58) stays flagged `[?flash sales]`. |
| writes / write flow | !rights; !right flow | "parallel rights" (00:55:55) and "the right flow" (02:30:48, write path to master) -> writes / write flow, WORD only with DB-write context. "transaction 1 has exclusive rights on that" (chunk_02) stays. |
| TTL | ptl; !detail | "ptl" (02:03:20), "detail" (02:37:34 and chunk_12 row 05) -> TTL only in expiry-clause context; "details" (the noun) everywhere else stays. |
| disk-based | disk waste | 02:08:02, 02:08:12 ("disk based database" said 02:13:46), TERM high. |
| shard | !shot | 02:42:06 "within a shot" -> "within a shard" (cross-shard context), medium. "one shot" / "one more shot" (00:37, 00:58) stay. |
| batch delete | Badge delete | 02:39:06, TERM medium. "bad job" (02:24:24, 02:36:42) stays flagged `[?batch job]`. |
| disk reads | discreets | 02:47:13, WORD medium. |
| commit | income | 02:47:42, WORD medium. |
| database internals / Redis internals | database intervals; Reduce intervals | 02:50:39, 03:12:19, WORD/TERM high. 02:13:32 "Redis interface" stays flagged `[?internals]`. |
| disk page | dispatch; display | 02:50:17, 02:50:46 ("one disk page" said in the same explanation), TERM medium. |
| Vert.x | Vertex | 02:58:40, 02:58:49 (JVM toolkit vs Spring), TERM medium — listen to confirm. |
| top 1 1 (SQL Server `SELECT TOP 1 1`) | top11; top 11 | 03:01:46-03:02:01 student; teacher's own "top one, one" kept as words. |
| lock wait timeout exceeded (MySQL error) | lock with time of exceeded; lock with timeout exceeded | 03:04:59, 03:05:37, TERM medium. |
| where clause | very close | 03:02:26, TERM medium. |
| blob | !block | 01:40:57 -> blob (teacher says "blob" 01:40:33), TERM medium. 01:39:12 "pick block" stays `[unclear]`. |
| replace into (MySQL) | replacing to | 01:58:08, TERM. |
| put | !foot | 01:52:11 "fire foot operations" -> put, WORD high. |
| varchar | !worker; !where it; !where can | NOT corrected — flagged `[?varchar \| asr: "..."]` (01:38:14, 01:39:07, 01:41:03, 01:51:02). Real words; evidence not strong enough. |
| single node | !single load | flagged `[?single node]` both times (01:35:55, 02:03:09). |
| C, C++ | c c plus plus; c cc++ | 02:09:10 corrected (TERM high); 01:19:39 left flagged. |

## Course-specific names (products, tools, people, companies the teacher uses)

| Canonical | ASR forms seen | Notes |
|---|---|---|
| (student names) | | Keep names exactly as ASR wrote them unless the same person is clearly spelled differently in the same chunk; if unsure, keep and add [check: name spelling]. Do not invent names. |
| Arpit | Arpit; Erfit; Arpej; Arpe; Apekt | Teacher's name (students address the teacher): lec05 "Arpit" 4x correct (01:17:24, 01:36:05, 02:37:03, 02:42:34) + teacher uses "arpit" in his own example (02:31:54). "Arpej" (00:53:56), "Apekt" (02:25:51), "Arpe" (02:48:44) -> "Arpit" (WORD medium). Never a label; label stays "Teacher". |
| Abhishek | Avishek | lec05 03:19:00 the TEACHER calls "Avishek" (a student, inaudible) — so Abhishek is a student, not the teacher (resolves the lec02 Arpit-vs-Abhishek question). Keep "Avishek" as ASR wrote it + `[check: name spelling]`. |
| lec05 student names (more, from chunk notes) | Sandeep, Maverick, Devashish, Harsh, Amrik, Chandan, Aditi, Simran, Jodhinder, Ashish, Mohit, Pankaj, Sidesh, Ajay, Ashu, Prashant | Names the teacher calls; kept as ASR wrote them, `[check: name spelling]` where unclear. NOT attached to labels: the STUDENT_1 / STUDENT_2 / STUDENT_6 diarization labels mix several students (e.g. teacher calls Sandeep, Ajay, Simran and STUDENT_1 answers). Exception: "Student 10 (Mohit)" at 01:55:17-01:55:20. |
| lec05 student names | Rahul, Rajiv, Anamol, Sampath, D Agrawal, DPA, Avishek | Attach to a label only for the turn right after the teacher calls the name (see Speaker map). "DPA" (02:25:52 "This is DPA", self-intro) keep + `[check: name spelling]`. |
| Golang / Go | | demo language |
| Faker (library) | | 00:30:57 |
| BookMyShow, IRCTC, COVID portal (COVID-19) | book my show | examples |
| TW | | 00:03:19 teacher's father's typewriter tool — keep as spoken |
| IIT Delhi | | 02:42:40 (student) keep |
| Apache Ignite | | 03:12:26 keep |
| LinkedIn, GitHub, WhatsApp Web | | keep casing |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | |

## Speaker map

Project-level (lec01/lec02) rows kept for reference; lec05 mapping below is the one to apply.

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 76% talk time, 180 words/turn, explains, runs class |
| STUDENT_1 … STUDENT_18 | Student N (keep the number, e.g. STUDENT_3 -> **Student 3:**) | short turns, questions, propose solutions when teacher asks. Diarization may be wrong: if a "STUDENT_n" line is clearly the teacher continuing an explanation (same thread, teacher-style, e.g. "okay so what X suggested..."), relabel to Teacher and log SPEAKER. If a TEACHER line is clearly a student question, use **Student?** (or the student number if evident) and log SPEAKER/SPLIT. |

Same teacher in lec02: TEACHER = Teacher (86.1% talk, 211 words/turn); STUDENT_1..STUDENT_17 -> Student n. Back-channel rule (lec02): a one-word "Correct."/"Right." under a STUDENT label inside that student's own explanation is often the teacher; relabel only with clear evidence (student asked "right?"), else leave.

### lec05 speaker map (apply this)

Read: start (00:00-00:06), ~1 h (01:02-01:05), ~1:17-01:22 (Q&A), ~2 h (01:59-02:02), end (03:18-03:21), plus every non-1/2 student label.

| Label | Role | Evidence |
|---|---|---|
| TEACHER | **Teacher** | 79.7% talk, 149.5 words/turn, 175 turns; opens class ("Week second, day first ... agenda for today"), explains locking, runs the Golang demo, calls on students by name ("Rahul", "Sampath", "D Agrawal", "Avishek"), runs break ("see you folks in five minutes"), closes ("thanks folks for tuning in ... I'll upload a recording"). |
| STUDENT_1 | **Student 1 (Rahul)** | 10.2% talk, 36.9 w/turn; long questions ("Are you able to hear me now, Arpit?" 01:36:05; upsert scenario 02:01:17-02:02:01); teacher replies "That's very specific use case, Rahul" (02:02:20) and "Rahul?" right before STUDENT_1's question at 03:19:38. Use "Student 1" label; "(Rahul)" only on the turns right after the teacher names him. Caution: one-word "Correct." at 02:00:04 under STUDENT_1 after his own proposal is probably the teacher (lec02 back-channel rule) — relabel only with clear evidence. |
| STUDENT_2 | **Student 2** | 4.4% talk, 21 '?' segments; asks about mutex/disk (01:11), BookMyShow/payment hold (01:12-01:14, 01:24), skip lock evaluation (01:20-01:21), ACID in the KV (02:40), code snippets request (03:14). Name never given. |
| STUDENT_3 | **Student 3** | "Hi, Arpe. So my question is on the first discussion that we had on locking" (02:48:44); FOR UPDATE vs SKIP LOCKED evaluation question; 02:50-02:51 follow-ups. |
| STUDENT_4 | **Student 4** | proposes soft delete / background job / filter on read (01:46-01:49) when teacher asks about delete. Teacher-like lines inside it: "Think about it." (01:46:24) and "Perfect." (01:48:20) are probably the teacher — `Teacher` only with clear evidence, else leave. |
| STUDENT_5 | **Student 5** | JVM vs Golang/Python question (02:57:27), verbosity/boilerplate (02:58:09), "FIZZ, BUZZ" reply (03:00:02). |
| STUDENT_6 | **Student 6 (Anamol?)** | answers right after teacher asks "Anamol?" (01:05:42 -> "Yes, it would get filled" 01:05:46); "for share" question (01:15:44); 02:42-02:55 back-channel. Name only on the 01:05:46 turn, with `[check: name spelling]`. |
| STUDENT_7 | **Student 7 (D Agrawal / "DPA")** | teacher calls "D Agrawal" (02:25:45), STUDENT_7: "Hi, Apekt. This is DPA. So my question is ..." (in-memory layer for inserts, 02:25:51-02:27). Use "Student 7"; name with `[check: name spelling]`. |
| STUDENT_8 | **MIXED — default Student 8, check each turn** | 20 turns, 4.8 w/turn. Student-like: "Faker library, right?" (00:30:57), "order by ID limit one." (00:44:30), "Why deadlock?" (00:50:02). Teacher-like (poses question to class and calls a name, evaluates answers): "Will all 120 seats get filled? Yes, no. Anamol?" (01:05:38-01:05:42), "No, much more than that." (01:21:04), "I'll move on." (01:36:10), "You don't need created add at all." (01:44:36), "Now you just have one? You just have one." (01:48:21), "How do you do it without getting the key explicitly?" (01:54:18), "Implement if you want." (03:20:22). Relabel these to Teacher (log SPEAKER) when the surrounding turns confirm (teacher's thread / a student answers him); otherwise `Student?`. |
| STUDENT_9 | **Student 9 (Rajiv)** | "Yeah, Rajiv." (01:17:22, probably the teacher calling — relabel Teacher if the next line confirms) then "Arpit, regarding this skip lock thing..." (01:17:24-01:19:13), "you would refer mysql documentation right" (01:20:22). |
| STUDENT_10 | **Student 10** | goroutine scheduling answer (00:57:00-00:57:11); upsert query proposal (01:55:23-01:55:33); "Okay. Yeah." at end (03:18:30). |
| STUDENT_11 | **Student 11** | 2 turns, short thanks (03:07:33). |
| STUDENT_12 | **Student 12** | "Hey, are you able to hear me now?" (01:36:14); back-channel "Okay/Thank you" (02:38-02:55). |
| STUDENT_13, 14, 15, 16, 19, 20 | **Student 13 / 14 / 15 / 16 / 19 / 20** | 1-6 turns of 1-8 words: "thank you", "Okay", "Yeah", "One seat." (S20 00:45:07), "Because of this lesser equal to now." (S19 02:24:30). Keep the number; if a one-word back-channel sits inside a teacher thread and reads as the teacher, leave it (no guessing). |
| STUDENT_17 | **Student 17 / probably Teacher** | single turn "Brain stop. Think about it." (01:46:25) duplicates STUDENT_4's "Think about it." — likely the teacher prompting; mark `Student?` unless context is clear. |

## Known structure notes
- lec01 (project): 01:38:25–01:44:37: break (teacher: "see you folks at 10 45"). Mark as admin, add `[break ~01:38:25-01:44:37]`, not [missing].
- lec01 (project): Class opens with teacher discussing feedback from students (admin) then topics: scaling, concurrency, delegation, communication.

### lec05
- **Break 01:27:55–01:33:13 (317 s gap).** Teacher: "...key value store thanks folks see you folks in five minutes" (01:27:55). Mark admin + `[break ~01:27:55-01:33:13]`, not [missing]. Seg #1397 "Thank you." at 01:33:13 = PHRASE + AFTER-GAP (2 signals) -> remove as HALLUCINATION unless the next lines show the teacher actually greeting back.
- **02:37:54–02:38:15 (21 s gap)**: teacher "Wait, wait, wait, just a minute." then resumes "huh yeah go on" — a real pause (student unmuting), not lost speech. No [missing].
- **Loops to collapse (LOOP, log full original):** 01:48:57-01:48:59 "we'll, we'll ..." across #1679/#1681/#1682 (RATE 44 w/s) -> one "we'll come to that"; 01:19:22 "no no no no no no no no no no" (x10) -> natural count (2-3); 00:57:17 "We, we, we, we, we, we" -> stutter; 02:01:10 "i'll i'll i'll i'll i'll" -> stutter; 00:56:04 / 01:36:18 "Wait, wait, wait(, wait, wait)" and 01:56:57 "much, much, much, much" and 01:25:27 "checking, checking, checking, checking" and 01:23:07 "this, this, this, this" are plausible emphatic speech -> keep (maybe trim to 3), decide in chunk.
- **REPEAT-SEG candidates are mostly real repetition — keep:** 01:21:30-01:21:36 (#1271-#1275) is the teacher counting re-evaluation rounds ("would be re-evaluating / one would succeed" x3) before "N + N-1 + ... = N into N plus one by two" — teaching repetition, keep all. 01:00:28 (#878 "If I run it again, all 120 sets are filled up") check against #877 for a true duplicate. 01:20:20 "Do that correct.", 02:21:24, 02:21:34, 02:58:34, 03:00:22 — emphasis repeats, keep unless word-identical back-to-back with a gap.
- **"Okay." / "Thanks." PHRASE candidates (~110)**: real back-channel in a live class — keep all; none sit in silence except #1397.
- **RATE flags** (00:33:49, 00:48:59, 01:15:07, 01:37:43, 01:51:31, 02:22:17, etc.) are short fast segments of real speech; no action unless text is garbled.
- **Live-demo stretch 00:27:30–01:08:30**: teacher reads Golang code, SQL and program output aloud ("approach one/two ... five", "1A user ID one was Maria Harmon", "Daniel 4", "Jamaica something", "Barkas") — fake Faker names: keep as ASR wrote them, `[check: name spelling]` at most once; "sets"/"seed" -> "seats" only where clearly seat count (e.g. 01:00:28 "120 sets are filled up", 01:04:41 "third seed, fourth seed") WORD medium.
- **Noisy / garbled stretches to flag rather than fix:** 01:39:54 "copyright type", 01:40:03 "stored value as IKT", 01:39:12 STUDENT_8 "pick block", 02:00:23 "absurdly wanted here", 02:02:35 "UB should not operate", 02:49:03 "from RN would still fire inquiries", 03:17:44 "2012 card thread", 03:18:54 "pitch space", 03:21:00 "or rapid time you push some messages" (RabbitMQ?), 03:21:25 "it up is lock it", 01:20:11 "TrustMeet has helped me" (likely "trust me, it has helped me" — flag `[?trust me, it \| asr: "TrustMeet"]`).
- **Audio trouble**: 01:36:05-01:36:14 students "are you able to hear me now?"; 02:25:36 "Your voice is breaking Sampath"; 03:19:11 "We are not audible" (Avishek) — admin, keep.
- Class ends 03:21:41 "thanks folks I'll upload a recording by three bye" — real outro, keep.
- Topic map (for heading candidates): 00:00 agenda/relational DBs & finance; 00:05:47 pessimistic locking (shared/exclusive, FOR UPDATE, SKIP LOCKED, NOWAIT, deadlocks); 00:27:32 airline check-in demo (approaches 1-5); 01:08:30 real-world examples (COVID portal, IRCTC, BookMyShow) + Q&A; 01:27:55 break; 01:33:51 distributed KV store on relational DB (schema, value types, TTL, delete, put/upsert, get); 02:08 Redis expiry comparison; 02:22:17 Q&A then high-level architecture (KV API, sharding by range); 02:37 Q&A (ACID, ORM, JVM vs Go, soft deletion/MySQL forum, homework).

## Open questions

- lec02 (carried): "web software" = WebSocket? (5 flags); "two links" = toolings? (4 flags); "OCS streaming" (02:39:04); "Daryl Abu Devi" (00:52:30, DynamoDB?); live-streaming product "randomized / come my documentation" (02:48:29). Teacher name Arpit vs Abhishek -> **lec05 evidence: teacher = Arpit, Abhishek/Avishek = a student.**
- lec02 unknown acronyms as ASR wrote them: GCVM (00:29:35), EPS (00:31:03), MPT (00:38:25), FII (02:28:21), SSC (03:05:25), ACT (02:48:44), STD (02:06:45). Keep as-is with [?term | asr: "..."] if they don't make sense in context.
- lec05 open (flag, do not guess):
  1. "RANDUP function" (00:39:57-00:40:08) — Go `rand` call? flag.
  2. "SSCs" (00:26:48) — SSEs? flag.
  3. "copyright type" (01:39:54) — the column type for queryable JSON (JSON/JSONB?) — `[unclear]`.
  4. "IKT" (01:40:03) — a value type allowing range queries (int?) — `[unclear]`.
  5. "pick block" (01:39:12, STUDENT_8) — "pick blob"? — `[unclear]`.
  6. "UB should not operate" (02:02:35) — "you"/"DBA"? — `[unclear]`.
  7. "from RN would still fire inquiries" (02:49:03) — `[unclear]`.
  8. "commit blog" (02:35:35) — Postgres "commit log"? flag.
  9. "TrustMeet" (01:20:11) — "trust me, it"? flag.
  10. "DPA" (02:25:52) student self-name; "Anamol", "Avishek", "Sampath", "D Agrawal" spellings.
  11. "or rapid time you push some messages" (03:21:00) — RabbitMQ? flag.
  12. "database login" (01:07:23) — "database locking"? flag.
  13. "for a bit" (01:21:15, student) — "for update"? flag.
- Unknown acronyms decided (no action): ORM, IO, KV, OS, CPU, JVM, MP->MB (02:59:25), JBM->JVM, ORF->ORM, DTL->TTL, IOS->IOs, KvAPI/KVAPI->KV API, TransitionT1->transaction T1, CMA (purse)->semaphores, FizBus/FIZZ/BUZZ->FizzBuzz/Fizz, Buzz, COVID, IRCTC, IIT, TW, AC (->"A, C"), YML (keep as spoken), DM, UI, LinkedIn, GitHub, WebSockets, MongoDBs, DynamoDBs (keep as spoken plurals).
