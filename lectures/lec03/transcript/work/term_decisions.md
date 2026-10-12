# Term decisions — lec03 (Distributed ID generators; frozen 2026-10-13 after Pass 0b)

Copied from the project file `transcripts/term_decisions.md` (lec01 + lec02 rows), then lec03 decisions added below
in "### lec03 decisions". Project rows apply unless a lec03 row overrides them.

Lecture 3 is again almost entirely spoken ENGLISH (Indian-accented), ~2 h 30 min, same teacher. Topic: distributed ID
generation — epoch-millisecond IDs, machine ID + counter, disk IO of persisted counters, central ID server, clock skew /
NTP, multi-master auto-increment, UUIDs and index size, break, Amazon batched ranges, Flickr ticket servers (`stub`
column, `on duplicate key update`), Twitter Snowflake (41/10/12 bits), ID-based pagination demo (limit/offset vs
ID, Elasticsearch 10,000 limit), Discord custom epoch, Instagram IDs in PL/SQL (`insta5.next_id`, sequences), Q&A.
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

### lec03 decisions (2026-10-13) — every row of `term_scan.md` plus terms found while reading

Rows from term_scan.md (scan row order). "REJECT" = the ASR form is the right word in every lec03 hit; leave it.

| Canonical | ASR forms (lec03) | Ambig. | Decision / rule (evidence) |
|---|---|---|---|
| (REJECTED) port | part (54) | AMB | All 27 lines with "part(s)" checked: "part of your business logic" (00:03:36), "third part" of the ID (00:18:33-00:20:30), "good parts", "moving part", "no SQL part" — all English "part". No port-number context in lec03. Never change. Special case 01:28:15 "configured in round robin port" -> keep ASR text + `[check: "round robin port" - port/fashion?]`. |
| Snowflake (algorithm) / Snowflake ID | snowflake (47) | rule | Casing only: capitalise "Snowflake" when it names Twitter's algorithm/ID ("algorithm called Snowflake" 01:36:28, "Snowflake ID" 01:43:04, "snowflakes are 64 bits" 01:37:43 -> "Snowflakes"). Keep lowercase "snowflake(s)" for the physical snowflake backstory 01:36:39-01:37:26 ("every single snowflake in the world", "actual snowflakes"). Never append "ID" where not spoken. |
| (REJECTED) Redis | read (20) | AMB | All 20 "read" hits are the verb (00:20:57 student "first time I read it", "read tweets", "read from the queue", "pre-reads"). Only real Redis mention: 02:23:54 "with redis also" -> casing "Redis". |
| (REJECTED) trie | try (16) | AMB | All verb "try" ("Try putting MySQL server in multi-master", "Try spinning up Elasticsearch"). No trie in lec03. |
| (REJECTED) shard | shared (14 + 7) | AMB | "shared service" (00:47:34-00:47:50, student + teacher: the DB is a shared central service) and "I shared a video" (01:11:34, 02:05:50-56) are correct. Keep all. |
| MySQL | my SQL (12); "my sql" | — | Product every time ("my SQL server" 00:43:25, 01:26:34, 01:26:43, 01:29:31, 02:07:23; "B plus three of my SQL" 01:58:49) -> MySQL, casing/spacing, silent. |
| in-memory | in memory (12) | rule | Hyphenate only when adjectival before a noun; "do it in memory" (00:21:08), "have in memory this range" (01:04:52) stay. |
| (REJECTED) cohort | code (10) | AMB | All real "code": "150 lines of code", "three lines of code", "source code", "hard code(d)". 02:14:24 "in the database code procedure" -> keep + `[?stored procedure \| asr: "code procedure"]` (teacher says "stored procedures" 02:09:50). |
| cohorts | courts (00:01:45) | — | "there are people from past courts" -> "past cohorts" (course context; project precedent court->cohort). TERM medium. |
| (REJECTED) SLO | slow (9) | — | Adjective "slow" every time (01:14:20 "my database is slow", 01:19:34, 01:45:44). Both scan rows (16, 17). |
| (REJECTED) QUIC | quick / QUICK (8+4) | AMB | "quick break" (00:54:17, 00:54:39), "quick process reboot" (01:31:26), "a very quick" (01:46:43). No protocol talk. |
| multi-master | multi master (8); multimaster (2) | — | Hyphenate, incl. "Multimaster mode" 00:45:40-42 -> "Multi-master mode". Silent (spacing). |
| Elasticsearch | elastic search / Elastic search (6) | — | 02:00:03, 02:00:08 -> Elasticsearch (teacher's next lines already "Elasticsearch"). Casing/spacing. |
| NoSQL | no SQL (6) | — | 01:58:54 (student), 01:59:06, 02:00:08 -> NoSQL. |
| cache | cash (6) | AMB | ONLY 02:24:44 "stored in cash, right?" (student), 02:24:51 "What cash?", 02:24:53 "Cash as in ..." -> cache: student asks whether Instagram's sequence variable should live in memory "not disks" (02:24:48) and teacher contrasts with "making a call to disk". TERM high. No payment "cash" in lec03. |
| trade-off | trade off (6) | — | noun hyphenate (00:44:07, 00:51:58, 00:54:35 "trade-off decisions"); verb stays. |
| (REJECTED) EC2 | easy to (4) | AMB | "Very easy to implement" (02:14:34, 02:17:40). |
| load balancer | load-balancer (4) | — | no hyphen. |
| queue | Q (4) | AMB | 02:23:24 "to Q readness", 02:23:27 "reading from the Q", 02:23:36 "from the Q", 02:23:45 "Q gives you atomicity" -> "queue" (student says "queue" 02:22:56, teacher "into the queue" 02:23:12-15). TERM high. Keep "readness" as spoken (do not invent "reads"); `[check: "queue readness"]` once. |
| DB | TV (3) | AMB | 01:39:02 "This is tweets TV, which is partitioned" -> "tweets DB" (teacher pointing at the tweets database box; partitioned) TERM medium. 01:37:43 "So snowflakes are 64 bits in TV." -> keep + `[unclear: "in TV"]` (could be "in size"; do not guess DB). 01:55:21 "sony the tv company" = real TV, keep. |
| UUID | UID (3) | — | 01:12:44 "changing it to UID", 01:15:35 "in terms of UID", 01:17:00 -> UUID (UUID vs integer index-size discussion; students say "UUID" 00:49:47, 01:10:57). TERM high. |
| round robin | round-robin (3) | — | no hyphen (noun use 01:28:15, 01:34:43, 02:28:29). |
| REST | rest (2) | — | "fire rest requests" 01:15:56, "handle rest request" 01:39:07 -> REST. casing. |
| (REJECTED) WebSocket | website (2) | AMB | "scrape out the entire website" 01:15:46, 01:16:01 — correct. |
| disk | desk (2) | AMB | 01:14:39 "go to the desk to read" (reading indexes from disk) and 01:51:37 "so much pressure on my desk" (teacher's disk-IO-at-100% demo, 01:58:33) -> disk. TERM high. |
| key-value store | key value store / key-value (2+1) | — | 01:24:37 "key value store" -> "key-value store" (spacing). |
| (REJECTED) polling | pulling (2) | AMB | 01:05:12 "pulling that out" = taking IDs from the in-memory range. Keep. |
| (REJECTED) Apache Flink | link (1) | AMB | 01:44:09 "look at the link, the tweet ID" = URL. Keep. |
| (REJECTED) Redis | studies (1) | AMB | 01:17:49 "case studies". Keep. |
| time stamp | time stamp (1) | — | Project rule: keep as ASR wrote (01:54:23); no join. |
| (REJECTED) edge server | ad server (1) | — | 00:19:45 "When you increment ad server startup" = "at server startup" (same student said "at server startup" 00:18:26) -> WORD "ad" -> "at", high. |
| exactly-once | exactly once (1) | — | 02:23:19 "exactly once delivery" -> "exactly-once delivery" (adjectival). |
| (REJECTED) horizontal scaling | horizontally scaling (1) | — | 02:08:34 grammatical as spoken. Keep. |

Unknown acronyms / tokens table (term_scan bottom):

| Token (count) | Decision |
|---|---|
| RAM (10), CPU (3), IO (9), UI (1), SRE (2), DevOps (2), FYI (3) | Correct as is; keep. Do not expand. |
| IOS (5) / "iOS" | "disk IOS" / "disk iOS" (00:17:39, 00:17:41, 00:17:50, 00:17:57, 00:18:23, 00:52:19) -> "disk IOs" (plural of IO; same speakers say "disk IOs" 00:21:29). Casing only. |
| CDC (8) | Keep "CDC" as spoken (02:27:37-02:29:44); do NOT expand. |
| FII (4) + "fii" | -> FYI. Non-word; teacher's tic "..., FYI" (01:02:43, 01:12:15, 02:20:42). Hits 00:59:56 "uh fii i know", 01:00:51, 01:01:22, 01:45:19, 01:47:55. TERM high. |
| UID (2) | -> UUID (row above). |
| TV (2) | rule above. |
| PLSQL (2) / PL (1) | -> "PL/SQL" (02:09:32 "college PL, SQL", 02:09:49, 02:09:50). Keep PL/SQL as spoken; do NOT change to PL/pgSQL. |
| APOC (1) | 00:06:47 "APOC-MEDISECOND" -> "epoch millisecond" (said 10+ times around it, 00:04:42-00:08:02). TERM high. |
| SPS (1) | 00:18:26 student "use that counter as part of SPS" -> keep + `[unclear: "SPS"]` (open question). |
| NDP (1) | 00:40:20 "sync with the NDP server" -> "NTP server" (clock sync / skew explanation). TERM high. Same sentence "the current type is not 24 but 23" -> keep + `[?time \| asr: "type"]`. |
| IT (1) | 00:51:44 "core idea behind IT generation" -> "ID generation". TERM high. |
| DK (1 + "dk" 00:48:59) | Student nickname: teacher "DK?" 01:33:06 -> STUDENT_3 "Yep."; STUDENT_3 says "okay dk yeah" 00:48:59. Keep "DK" as a name. |

Other lec03 terms found while reading (apply in chunks):

| Canonical | ASR forms (lec03) | Decision / evidence |
|---|---|---|
| epoch millisecond | f of millisecond | 01:43:54 "First 41 bits of f of millisecond" -> epoch (the 41 bits are "epoch milliseconds" at 01:38:27, 01:40:03, 01:44:16). TERM medium. |
| Lamport clock | lampard clock | 02:21:12 (student), 02:21:22 (teacher). Non-word in this context. TERM high. |
| B+ tree | B plus three | 01:12:01 "a new B plus three", 01:58:49 (student). TERM high. |
| pagination | imagination; !the nation | "ID based imagination" 01:53:12, "imagination logic works for all DB" 01:58:49 -> pagination (pagination section). TERM high. 02:26:55 "you said that the nation works fine" -> `[?pagination \| asr: "the nation"]` (flag). |
| primary key | primary care | 02:27:01 student "our columns are primary care" (IDs/ordering question) -> primary key. TERM medium. |
| Numberphile | number file | 01:36:59 "the number file has a great video on why snowflakes are unique" -> Numberphile (YouTube channel). TERM high. |
| stub (Flickr ticket table column) | !stuff | AMB: only 01:23:00 "another column called stuff", 01:32:58 "only stuff exists", 01:33:02 "no other reason for stuff" -> stub (teacher says "stub" 01:21:41, 01:25:33, 01:32:05). TERM high. All other "stuff" (tweeting stuff, fancy stuff, a lot of stuff) stay. "tickets stub" / "ticket stub" keep as spoken. |
| service(s) | surveys; surface | 01:42:58 "central ID surveys", 01:55:56 "no external surveys which needs to be scaled" -> service(s) TERM high. 01:01:18 "write this entire surface" -> service, TERM medium. |
| (unclear) | lighting services | 01:43:26 "a set of lighting services" -> keep + `[unclear: "lighting services"]` (maybe "ID-generation services"; do not guess). |
| (flag) sharded | Charlotte | 02:00:10 "It's also Charlotte partitioned work part." -> `[?sharded \| asr: "Charlotte"]`; rest of sentence as spoken. |
| flush | !flash | 02:25:17 "it would do a periodic flash" (DB persisting sequence to disk) -> flush. TERM medium. |
| (flag) confusion | !conclusion | 02:28:14 "minimize the conclusion that might happen" -> `[?confusion \| asr: "conclusion"]` (real word; flag only). |
| (flag) fifth week | fifth thing | 02:27:42, 02:27:59, 02:28:04 -> `[?fifth week \| asr: "fifth thing"]` (cf. "fourth fifth sixth week" 02:26:31). Flag, do not correct. |
| airline check-in system | airline checking system | 01:02:20 "Given that we covered airline checking system" -> check-in (course covered airline check-in in concurrency week). WORD medium. |
| Flickr / Twitter / Amazon / Instagram / Discord / MongoDB / DynamoDB / Sony | — | casing only. |
| insta5 | Insta 5; Insta5; insta5 | Instagram schema name in the teacher's SQL (02:10:16-02:11:28, 02:19:27). Keep spacing as spoken ("Insta 5" spoken form OK); casing not normalised. |
| (keep) Jeff Dean and Sanjay | — | 00:36:10 article; keep as spoken, no surname added. |
| (keep) node exporter | — | 01:58:28 Prometheus node exporter; keep as spoken. |
| (flag) number | "2-264" | 01:09:36 "Imagine big integer 2-264." -> keep + `[check: "2-264" - likely 2^64]`. Not an obvious split; no NUMBER fix. |

### lec03 decisions added in Pass 5 (reconciled from chunk notes, 2026-10-13)

Re-check done: all corrected chunks grepped for every ASR form below; remaining hits are either correct words (e.g. "the idea is", "what happened") or already flagged consistently. No further edits were needed.

| Canonical | ASR forms (lec03) | Decision / evidence |
|---|---|---|
| ID / IDs | !idea; !ideas; IT; ITs | Context-only: correct only where an identifier is clearly meant (00:04:20 "I get that idea and I use it", 01:08:05, 01:09:23, 02:16:42 "machine ideas", 02:22:05 "greatest ideas", 02:23:15 "one idea at a time, but batch of IDs"). "The idea is ..." stays everywhere (checked all chunks). |
| cores | !codes | CPU/threads context only (00:08:43 "threads running on multiple codes"). WORD medium. |
| epoch milliseconds | get up of; APOC; f of; !a pop many seconds | "get up of milliseconds" 00:09:23 -> "get epoch milliseconds" (high). 00:37:43 "a pop many seconds" stays flagged `[?epoch milliseconds]`. |
| hyphen | hyper; happen; !happened | Teacher dictating ID format: "hyper"/"happen" 00:11:34, 00:11:41 -> hyphen (high). "M1 happened 10/11/12" (00:23:09, 00:24:15) stays flagged `[?hyphen]` / `[check]` (real word; not corrected). |
| locks | !logs | Concurrency / atomic-increment context: 00:13:36 teacher "wrap it in logs" -> locks (medium). Student questions 00:47:43, 00:47:52 "take logs on it" stay flagged `[?locks]` (student speech, less clear audio). |
| flush frequency | plus frequency | Only in the flush-to-disk explanation (00:22:23, 00:22:33); teacher defines "flush frequency" 00:21:51. TERM medium. No other hits. |
| concatenated | concordinated | Non-word; teacher says "concatenation" 00:28:53 (00:28:39, 00:30:50). TERM medium. No other hits. |
| write(s) | !right; !rights | Only in write-conflict / write-volume sentences ("newer write overrides the older write" 00:27:20-00:27:34; "writes" 01:05:44). "right?" tag questions stay. 00:44:38 "integer rights" stays `[check]`. |
| upsert | upset; !absurd | Only in the Flickr upsert stretch 01:24:13-01:25:15 (teacher says "upsert" 01:23:33/01:23:40). TERM. "replaceInto"/"insertInto" kept as ASR wrote them. |
| even (server) / odd | event; end | Multi-master odd/even auto-increment context only (01:33:59-01:35:22). WORD. |
| Snowflake | Noflake; is no flag | Non-word / phrase in the Snowflake section (01:41:47, 02:01:02). TERM. |
| collision | coalition | ID-collision context (01:41:39). TERM medium. |
| where clauses | varic losses | Non-word (01:48:44); teacher says "where clauses" 01:50:52, 01:53:16. TERM high. |
| pagination | mission; !vegetation; !page initial; !page in it | "ID based mission" 01:51:53 -> pagination (medium). "vegetation" 01:54:04, "page initial" 01:46:02, "page in it" 02:00:06 stay flagged. |
| microservice | !Microsoft | 02:04:56 "a building Microsoft for every single thing" in the microservices point. TERM medium. |
| range | rage | 02:05:15 "massive rage to play with". WORD high. |
| UUID | UID; uid(s) | Rule covers lowercase/plural (01:15:20, 01:15:22, 01:17:05, 01:17:51). "The UI is just fine" 01:16:29 stays flagged `[?UUID]`. |
| load balancer | load balance; load valancer | 00:41:44, 01:28:13. TERM high. |
| custom epoch | customer epoch | 02:13:23 (Instagram custom epoch). TERM medium. |
| per shard | per shot | 02:12:50 "per shot sequence number". TERM high. |
| nextval | next well; next file | 02:12:42, 02:15:54, 02:20:02 -> flagged `[?nextval]` only (Postgres function; not confirmed by audio). |
| insta5 | insta pi | 02:12:42 flagged `[?insta5]`. |
| cache | !cash | Already decided (02:24:44-02:24:53). |
| too frequent | two frequent | 01:06:16 WORD. |
| ZooKeeper / Postgres / Prometheus | zookeeper; postgres | casing only. |
| (flag) 4X / 4Xes | forex; forexes | 01:18:57, 01:19:10 flagged (teacher says "4X larger" 01:15:22). Open. |

Names added (lec03):

| Canonical | ASR forms | Notes |
|---|---|---|
| Jeff Dean | Jeff Din; Jebdin | 00:36:10-00:37:08 (Google bit-flip story). Said correctly at 00:36:10, 00:36:26. |
| Sanjay Ghemawat | Ghimawat; Ghamawad; Ghaavar | Surname was spoken (ASR wrote variants) -> normalised spelling, WORD medium. Supersedes the "(keep) Jeff Dean and Sanjay" row only where a surname is actually in the ASR. |
| Numberphile | number file | already decided. |
| Aditi | Aditi | 00:47:31 teacher "Yeah, Aditi." -> STUDENT_2 question tagged `Student 2 (Aditi)`. |
| Mohit | mohit | 01:10:47 teacher "okay mohit"; question under STUDENT_3 labelled `Student?`. |
| Pankaj | Pankaj | 02:17:03 teacher calls Pankaj, STUDENT_3 answers -> `Student 3 (Pankaj)` for that exchange. |
| Chathindar | Chathindar | 01:35:15 name call before STUDENT_2; kept + `[check: name spelling]` (lec02 "Jodhinder" may be the same person). |

Speaker-map update: STUDENT_2 and STUDENT_3 are mixed labels (STUDENT_2: Jay 00:18, Aditi 00:47, Chathindar? 01:35; STUDENT_3: DK, Mohit 01:10, Pankaj 02:17). Names attach only to the turn right after the teacher's name call.

## Course-specific names (products, tools, people, companies the teacher uses)

| Canonical | ASR forms seen | Notes |
|---|---|---|
| (student names) | | Keep names exactly as ASR wrote them unless the same person is clearly spelled differently in the same chunk; if unsure, keep and add [check: name spelling]. Do not invent names. |
| Arpit | Arpit; Erfit; (lec03) Orpid; Apit; Arpeth | (lec02) students address the teacher as "Arpit" 4x - probably the teacher's name; also used in the teacher's own example. Never a label; label stays "Teacher". lec03: STUDENT_1 addresses "Orpid" 00:48:11, "Apit" 01:08:50/01:08:53, "Arpeth" 01:57:51; teacher's own example "Let's say Arpit made 10,000 tweets" 01:45:57 -> normalise the vocatives to "Arpit" (WORD, medium). |
| Abhishek | | (lec02) addressed 3x (02:54:08, 03:11:56, 03:11:59); conflicts with "Arpit" - open question, keep as spoken. |
| lec02 student names | Pankaj, Ajay, Sunil, Jay, Vikram, Amrit/Amrik, Rajiv, Harsh ("harsh gone"), Sampat/Sampar, Summit (Sumit?), Jodhinder, Devasheesh, Matt, DP, Alex(a), Rahul, Alok | Attach to a label only for the turn right after the teacher calls the name (`Student 4 (Sunil)`); diarization labels mix people. |
| lec03 student names | Jay (00:18:03), Alok (00:16:00), Harsh (00:20:43, 02:26:36; "harsh reality" 01:17:54 is the adjective), Rajiv (00:48:09, 01:08:14, 01:08:48; "rajin" 02:18:14), Shriya (01:21:59), DK (00:48:59, 01:33:06), Akshay (02:21:02, said by STUDENT_7 - unclear who), Anupam (02:28:21), Simranath (02:29:32) | Keep spellings as ASR wrote; "rajin" 02:18:14 -> keep + `[check: name spelling - Rajiv?]`. Same attach rule as lec02. |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | lec03 also English; no Hindi words seen in the stretches read. |

## Speaker map

Project history: same teacher in lec01/lec02/lec03; TEACHER label = Teacher; STUDENT_n -> Student n.

### lec03

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 92.2% talk, 301 words/turn, 74 turns. Opens class ("The third day ... it's all about distributed ID generators" 00:00:02), explains every approach, calls on students by name ("Alok?" 00:16:00, "harsh what else can we do" 00:20:43, "DK?" 01:33:06, "Anupam?" 02:28:21), manages break (00:54:17 "quick break for five minutes"), closes class (02:29:50 "Thanks, folks, for tuning in"). Known leaks to fix per turn: 01:08:32 TEACHER "yeah i have a question like oh wait wait ... problem with my mic" sits inside Rajiv's mic-trouble question (01:08:14-01:09:25) -> `Student?` for "yeah i have a question like", rest `[check: speaker]`; 02:26:36 "...see you next week go on harsh yeah actually i thought just we are" -> SPLIT after "go on harsh", remainder = Student 5 (Harsh); 01:32:28 TEACHER opens "sense of that." = end of Student 3's sentence (SPLIT). |
| STUDENT_1 | Student 1 (Rajiv) | 471 words, 13 turns; questions addressed to "Orpid/Apit/Arpeth" (= teacher Arpit); teacher says "Yeah, Rajiv, go on" 01:08:48. Leaks: turns opening "Rajiv." (00:48:09), "Rajiv?" (01:08:14), "any other questions anyone yeah rajin uh" (02:18:14) are the teacher's name-call -> SPLIT, that part = Teacher. 02:16:45 "we have" x7 = LOOP. |
| STUDENT_2 | Student 2 (Jay?) | 400 words; proposes the server-startup counter (00:18:06-00:20:00), shared-service question (00:47:34), blog graph + cache question (02:24:03-02:24:48). 00:18:03 "Jay?" under STUDENT_2 = teacher calling on Jay -> Teacher (SPLIT/SPEAKER); name tag "(Jay)" only on the 00:18:06 turn. |
| STUDENT_3 | Student 3 (DK) | 385 words, 19 turns; auto-increment-by-N and UUID proposals (00:48:36, 00:49:47), Flickr stub query questions (01:31:41-01:34:49). "okay dk yeah" 00:48:59; teacher "DK?" 01:33:06 -> STUDENT_3 "Yep." 01:32:22 STUDENT_3 opens with teacher's words "what id equal to id plus one." -> SPLIT (Teacher), rest Student 3. 02:19:43 STUDENT_3 "when we create that table and then we are." continues STUDENT_6's sentence (02:19:37) -> `Student?`. |
| STUDENT_4 | Student 4 | 138 words; DB-last-counter proposal (00:52:12-00:52:56), Discord epoch question (02:01:25). |
| STUDENT_5 | Student 5 (Harsh) | bank-of-IDs proposal right after "harsh what else can we do" (00:20:52); final pagination/primary-key question after "go on harsh" (02:26:55). |
| STUDENT_6 | Student 6 (Anupam) | Instagram sequence question 02:19:27; Snowflake round-robin question right after "Anupam?" (02:28:23). 02:28:37 turn opens "not guarantee monotonicity are you?" (likely teacher) and 02:28:42 TEACHER opens "monotonicity, you cannot" (end of the student's sentence) -> boundary bleed, fix with SPLIT only where clear, else `[check: speaker boundary]`. |
| STUDENT_7 | Student 7 | gossip / Lamport clock question (02:21:02), queue proposal (02:22:47-02:23:19). 02:21:02 opens "that because of this" = end of teacher's 02:20:56 sentence -> SPLIT; "thank you akshay" kept as spoken. 02:23:10 "Why not? You can do that." under STUDENT_7 is the teacher's answer -> Teacher (SPEAKER; teacher then continues "Keep generating the range"). |
| STUDENT_8 | Student 8 (Simranath) | CDC question 02:27:25-02:27:39; teacher 02:29:32 "Again, Simranath, I'll definitely take a question on CDC". 01:35:49 "Okay." back-channel. |
| STUDENT_9 | MIXED label — per-turn | 30 words, 6 turns, two voices. 00:16:02 "Back it up with the file locally." right after "Alok?" -> Student 9 (Alok). 00:20:17 "Thanks." right after teacher praises Student 2's approach -> `Student?`. 00:52:35 "So then you are writing to database every time?" -> `Student?` + `[check: speaker - teacher-style challenge]`. 01:08:48 "Yeah, Rajiv, go on." -> Teacher (decisive: teacher calls on Rajiv after fixing mic; log SPEAKER). 01:09:05 "Why would you want to do that?" -> Teacher (teacher-style challenge to Rajiv's proposal + teacher continues the same argument 01:09:28; log SPEAKER, medium). 01:31:39 "Yeah, man." -> `Student?`. |
| STUDENT_10 | Student 10 | 4 words: "Okay." back-channels only (01:09:35, 02:15:39-40, 02:19:22). Keep. |

Back-channel rule (lec02) applies: a one-word "Correct."/"Right."/"Okay." under a STUDENT label inside that student's own explanation may be the teacher; relabel only with clear evidence (e.g. 02:29:25 STUDENT_6 "Correct." after own sentence -> `[check: speaker]` at most).

## Known structure notes

lec01/lec02 (project):
- 01:38:25–01:44:37 (lec01): break (teacher: "see you folks at 10 45"). Mark as admin, add `[break ~01:38:25-01:44:37]`, not [missing].
- Class opens with teacher discussing feedback from students (admin) then topics: scaling, concurrency, delegation, communication.

lec03:
- Duration 00:00:02-02:29:52, 2,540 segments, English.
- **Break 00:54:56-00:59:55**: "See you folks in five minutes" (00:54:56), gap 232 s, "Thank you." 00:58:50 (#869, PHRASE + AFTER-GAP, 2 signals) then gap 64 s, "Let's start with the" 00:59:55 (#870, real resumption - keep). Mark admin + `[break ~00:54:56-00:59:55]`, not [missing]. #869: keep + `[check: possibly hallucinated in silence]` (teacher may really say thank you on return) — do not remove.
- Repeat clusters (decide per chunk): 00:19:20-00:19:21 "That's a good one." x3 (#306/#307 share the same start 00:19:21 -> #307 likely ASR DUPLICATE; teacher genuinely repeats praise nearby, so keep 2); 00:05:53 #95, 00:07:28 #130, 01:02:45 #911, 01:33:01 #1438, 01:34:24 #1494, 01:45:39 #1709, 02:02:01 #1982, 02:27:41 #2479 = teacher emphasis repeats -> keep both unless identical start time; 02:23:46/02:23:50 "Well, works for you." = parallel construction (queue / database) -> keep both; 02:24:27-02:24:30 "local machine" x2 = emphasis, keep.
- Loops: 00:11:16 "plus" x8 and 01:40:14 "plus" x8 (teacher saying "plus plus" = ++ ; collapse to the spoken "plus plus" count only if clearly a loop, log LOOP); 01:04:33 "plus plus" x4 = "++ ... += 500" real, keep; 00:20:43 "thanks" x4 -> LOOP collapse (keep natural 2); 01:53:49 "much" x5 -> keep at most 3 (emphatic), log LOOP; 02:11:52 "this 5" x5 (teacher pointing at hard-coded shard id) -> keep up to 3, log LOOP; 02:15:32 "No, no, no, no, no." -> natural, keep; 02:16:45 STUDENT_1 "we have" x7 (COMPRESS 2.9) -> LOOP collapse.
- RATE flags (00:48:06, 00:50:26, 01:27:23, 01:34:11-01:34:54, 02:23:27, 02:25:00, 02:27:53-57) are short sentences in fast back-and-forth; not hallucinations — keep.
- Lone "Okay."/"Thanks." PHRASE candidates (~50) are back-channels in live Q&A; keep (not outro hallucinations). 02:25:25 / 02:28:19 / 02:29:31 "Thanks." are the teacher's real thanks.
- Speaker trouble zones: 00:18:03; 00:48:09; 00:52:35; 01:08:14-01:09:48 (Rajiv's mic problem, labels swap between TEACHER/STUDENT_1/STUDENT_9); 01:32:16-01:32:34 (boundary bleed T<->S3); 02:18:14; 02:19:37-02:19:43; 02:21:02; 02:23:10; 02:26:36 (class "ends" then Harsh's question); 02:28:37-02:28:42.
- End-of-class: teacher closes at 02:25:27 "Any other question anyone?" -> admin announcements 02:25:32-02:26:36 (next week social networks, CDNs, recordings, pre-reads) -> Q&A 02:26:36-02:29:52 (Harsh, Simranath/CDC, Anupam/Snowflake) -> `## Q&A`. Earlier Q&A stretches: 01:31:32-01:35:49 (Flickr stub), 01:57:51-01:59:30, 02:15:25-02:24:53.
- 00:54:41 "We'll sing back at 10." -> keep + `[unclear: "sing back"]` (admin; probably "see you back"/"sync back").
- 01:36:01 "the two approaches of Atilla that we saw" -> keep + `[unclear: "of Atilla"]`; 01:36:32 "two words back" -> `[check: "two words back" - two weeks back?]`.
- 02:24:53 "Cash as in local eat" -> "Cache as in [unclear: "local eat"]".

## Open questions

- lec02 (carried): "web software" = WebSocket? (5 flags); "two links" = toolings? (4 flags); teacher name Arpit vs Abhishek; "OCS streaming" (02:39:04); "Daryl Abu Devi" (00:52:30, DynamoDB?); live-streaming product "randomized / come my documentation" (02:48:29).
- lec02 unknown acronyms as ASR wrote them: GCVM (00:29:35), EPS (00:31:03), MPT (00:38:25), FII (02:28:21 — lec03 shows FII = FYI; re-check lec02), SSC (03:05:25), ACT (02:48:44), STD (02:06:45). Keep as-is with [?term | asr: "..."] if they don't make sense in context.
- lec03 (flag, do not guess):
  1. "SPS" 00:18:26 (student: "use that counter as part of SPS").
  2. "64 bits in TV" 01:37:43 (in size? in DB?).
  3. "lighting services" 01:43:26.
  4. "Charlotte partitioned work part" 02:00:10 (sharded?).
  5. "of Atilla" 01:36:01; "two words back" 01:36:32.
  6. "fifth thing" 02:27:42-02:28:04 (fifth week?).
  7. "local eat" 02:24:53; "queue readness" 02:23:24.
  8. "We'll sing back at 10" 00:54:41.
  9. "big integer 2-264" 01:09:36 (2^64?).
  10. "round robin port" 01:28:15.
  11. "database code procedure" 02:14:24 (stored procedure?).
  12. "the nation works fine" 02:26:55 (pagination?); "conclusion" 02:28:14 (confusion?).
  13. "thank you akshay" 02:21:02 — who is Akshay (another name for the teacher, or a student)?
  14. STUDENT_9 is a mixed label (teacher + at least one student); 00:52:35 and 01:31:39 turns unresolved.
