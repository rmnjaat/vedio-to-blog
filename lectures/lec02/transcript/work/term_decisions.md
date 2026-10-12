# Term decisions — lec02

Copied from project `transcripts/term_decisions.md` (lec01) and extended for lec02. Frozen after Pass 0b.

Lecture 2 is, like lec01, almost entirely spoken ENGLISH (Indian-accented), same teacher. Romanization rules apply only to rare Hindi words.
Topics: first half (~00:00–00:54) non-relational databases (document, key-value, columnar, graph; ACID vs CAP consistency; MongoDB, Cassandra, DynamoDB, Neo4j, Dgraph, TigerGraph, Elasticsearch); second half (01:00–03:15) designing Slack real-time (text) communication: schema (users, channels, membership, messages, checkpoint), message delivery models, WebSockets, WebSocket servers WS1..WS4, Redis Pub/Sub, edge servers / balancer service, persistence, Q&A.

## Technical terms (canonical spelling + ASR forms seen)

### Carried over from lec01 (apply as written there)

| Canonical | ASR forms seen | Notes / decision evidence (first time, context) |
|---|---|---|
| cache | !cash; !catch | Only where the sentence is clearly about caching. Keep "catch" when it means catch. lec02: see the 02:41:54 rule below. |
| cached | !cashed | caching context only |
| caching | !catching | caching context only |
| polling | !pulling | Only when the teacher is discussing polling as a communication pattern. KEEP "pulling" for pull-based reading. lec02: both hits (02:13:54 "web socket server is not pulling the message", 02:38:28 "pulling that information ... periodically") are the real word "pulling" -> KEEP. |
| long polling | !long pulling | communication section |
| short polling | !short pulling | communication section |
| WebSocket | web socket | keep plural "WebSockets". lec02: 172 hits of "web socket(s)" -> WebSocket(s), casing/spacing only (trivial). "web socket server" -> "WebSocket server". |
| Elasticsearch | elastic search | |
| Kinesis | kinases | |
| Kafka | kafka | capitalise |
| SQS / SNS / S3 | | keep as spoken, never expand |
| RabbitMQ | rabbit MQ; rabbit mq | |
| MySQL | my SQL; my sequel; mysql | only when product is meant. lec02 00:03:13 "non-mysql, postgres, oracle" -> "non-MySQL, Postgres, Oracle" (casing only; keep "Postgres" as spoken, do not expand to PostgreSQL) |
| SQL | !sequel | only when the language/DB is meant |
| NoSQL | no SQL; no-SQL; No SQL | lec02: 00:02:54, 00:03:27, 00:04:41, 00:45:44 — all "NoSQL databases" -> NoSQL (casing/spacing). "non-SQL" (00:04:41, 00:50:04 "non-sql") is a different spoken word -> keep "non-SQL". |
| ACID | !asset | only for "ACID properties"/transactions/compliance |
| TCP | DCP | |
| endpoint | and point | |
| CI/CD | CICD; cicd | |
| autoscaling | auto scaling; auto-scaling | |
| multi-master | multi master | |
| in-memory | in memory | only adjectival ("in-memory store"); "stored in memory" stays |
| load balancer | load-balancer | lec02: all 34 hits already "load balancer"; verb "load balance" stays |
| nginx | | lowercase |
| Redis | readies; red is; redis | capitalise product name (lec02 has lowercase "redis" several times -> "Redis", casing) |
| QUIC | !quick | only if teacher clearly names the protocol. lec02: no protocol use -> never. |
| shard | !shared | only in sharding context. lec02: NO occurrence qualifies (see rows below). |
| trie | !try; !tree | only if teacher clearly talks about the trie data structure. lec02: never. |
| port | !part | change ONLY in explicit networking context (port number). lec02: never (see below). |
| session | !section | "critical section" correct |
| EC2 | !easy to | lec02: never. |

### lec02 decisions (every row of term_scan.md)

| Canonical | ASR forms seen | Ambiguous? | Decision + evidence |
|---|---|---|---|
| WebSocket | web socket (172) | no | -> WebSocket / WebSockets / WebSocket server (trivial casing/spacing). |
| port | part (172) | AMBIGUOUS | RULE: keep "part" everywhere. Checked all networking-adjacent hits: "part of channel C1", "part of web socket server 2", "a very important part" — all mean part. Teacher says "ports" correctly at 02:06:55 and 02:33:50. Change only if a sentence speaks of a port NUMBER / listening on a part — none found. |
| load balancer | load-balancer (34) | no | already canonical; no edit. |
| trie | try (28) | AMBIGUOUS | RULE: keep "try" — every hit is the verb ("try to design", "try to learn", "try to recall", "tries to balance"). Never trie in lec02. |
| Pub/Sub | pubsub; pub sub; pub-sub; PubSub; pubsup | no | -> "Pub/Sub" ("Redis Pub/Sub", "real-time Pub/Sub", "Pub/Sub channel"). Glossary canonical. 02:07:59–02:46:18 and 02:18:18. |
| Pub/Sub | pubs up (02:38:53, 02:45:45, 02:45:52) | no | non-word in Pub/Sub context ("Redis pubs up", "red is pubs up and Kafka", "real time pubs up Kafka gives you") -> Pub/Sub, log TERM high. Glossary lists "pubs up". |
| Pub/Sub | !pops up; !pop-up | AMBIGUOUS | RULE: -> Pub/Sub ONLY when directly after "real-time"/"real time" or "Redis"/"redis" in the Pub/Sub discussion: 02:08:41 "real time pops up is very simple", 02:39:12/02:39:27 "real-time pop-up" (x3), 03:15:08 "redis pops up". Log TERM, conf high (same term said correctly in same explanation). Any other "pop-up"/"pops up" (UI pop-up) stays. |
| key-value store | key value store; key-value | no | -> "key-value store" / "key-value" when adjectival ("distributed key-value store", "key-value database"). "KVStore" (00:47:55) -> "KV store" (spacing). |
| ACID | asset (8) | AMBIGUOUS | RULE: -> ACID in 00:12:24–00:12:32 ("MongoDB could support asset properties", "We are not asset", "asset compliant" x2): ACID context, said correctly right after at 00:50:09/00:50:40. Log TERM high. 00:05:29 "consistency in acid" (lowercase) -> "ACID" casing. Any other "asset" (money/asset) stays. |
| NoSQL | no SQL; no-SQL | no | -> NoSQL. Keep "non-SQL"/"non-sql" as spoken (different word). |
| SLO | slow (8) | AMBIGUOUS | REJECT: all 8 hits are the adjective/verb "slow" ("It's so slow", "Kafka would slow it down", "API calls would slow down"). Never SLO. |
| in-memory | in memory (8) | AMBIGUOUS | RULE: hyphenate only adjectival before a noun; "stored in memory" (00:47:29) etc. stays. |
| shard | shared (6) | AMBIGUOUS | REJECT: 03:04:58 "shared the database between the workers and the API servers" (= shared database pattern; teacher replies "sharing a database is fine"), 03:10:00 "shared among the tabs", 03:14:56 "will be shared today" — all real "shared". Keep. |
| sharding | sharing (5) | AMBIGUOUS | REJECT: 03:05:04–03:06:12 "sharing a database" = shared-database pattern (teacher: "sharing a database fine with me ... sharing database as a pattern"). Keep "sharing". |
| sharding | sharting (01:20:49) | no | non-word, "partitioning and sharting" -> sharding. Log TERM high. |
| EC2 | easy to (01:42:23, 01:47:07) | AMBIGUOUS | REJECT: "easy to build complex systems", "easy to draw this part". Keep. |
| polling | pulling (02:13:54, 02:38:28) | AMBIGUOUS | REJECT: push vs pull wording; keep "pulling". |
| DNS | DMS / DMs (01:13:20, 02:19:38) | no | REJECT: "your DMs are channeled with two people", "DMs are just channel with two people" = direct messages. Write "DMs". |
| QUIC | quick; QUICK (01:01:55) | AMBIGUOUS | REJECT QUIC. Separate WORD rule: "We'll quick off our brainstorming" -> "kick off" (nonsense as is, idiom fits, ASR vowel confusion). Log WORD, conf medium. |
| SQL | sequel (00:50:04, Student 6) | AMBIGUOUS | RULE: "the uh sequel versus non-sql databases" -> "SQL versus non-SQL databases": DB-type comparison, unambiguous. Log TERM high. |
| cache | catch (02:41:54, Student 1) | AMBIGUOUS | RULE: "it can uh like it can catch the [users data]" — student proposing to keep the user->server mapping locally instead of calling a service; teacher answers about network calls. Topic fits caching but "catch" is a real word and the sentence crosses a diarization seam -> do NOT correct; mark `[?cache \| asr: "catch"]`. |
| trade-off | trade off | no | -> trade-off (noun). Verb "trade off" stays. |
| CloudFront | cloud front (01:44:25) | no | "it's not cloud front edge servers" -> CloudFront. Log TERM high. |
| DynamoDB | dynamo DB (03:04:41) | no | -> DynamoDB (spacing/casing). |
| HDFS | HDFC (00:35:46) | no | REJECT: "I immediately got a call from HDFC Bank" — real bank (personal anecdote). Keep "HDFC Bank". |
| InfluxDB | influx (00:45:00) | no | REJECT: "huge amount of influx of messages" = English "influx". Keep. |
| Redis | red is (02:45:45) | AMBIGUOUS | RULE: "can we conclude that red is pubs up and Kafka kind of same" -> "Redis Pub/Sub" (Pub/Sub context, teacher answers about Redis). Log TERM high. Other "red is" (colour) stays. |
| horizontal scaling | horizontally scaling (02:05:06) | no | REJECT: correct English as spoken. Keep. |
| master-slave | master slave (03:02:02) | no | Keep the term (teacher's word); hyphenate only: "master-slave architecture" (trivial). |
| microservices | micro services; micro-services (03:06:08) | no | -> microservices. |
| replica | replicate (03:03:50, Student 5) | AMBIGUOUS | REJECT: "to different, different replicate replications" = student's false start; keep as spoken (single-word stutter rule may drop "replicate" only if clearly a false start — prefer keep). |
| trie | tree (02:49:46) | AMBIGUOUS | REJECT: hierarchy/graph context ("store that entire tree and find a third level depth") — real "tree". Keep. |
| write-through | right through (01:34:57) | AMBIGUOUS | REJECT write-through (not the cache pattern). RULE for this one sentence: "can do batch right through a synchronous medium" -> "batch write through" ("right"->"write": preceding sentence is about not making synchronous DB calls to store; log WORD medium). "a synchronous" -> flag `[?asynchronous \| asr: "a synchronous"]` (meaning flips; next sentence says "asynchronously storing"). |

### lec02 product / proper-name terms (not in term_scan table)

| Canonical | ASR forms seen | Decision |
|---|---|---|
| TigerGraph | Tiger Graph (00:39:35–00:39:44, x3) | -> TigerGraph (spacing/casing of product). |
| BadgerDB | Badger DBS (00:39:31) | -> BadgerDB ("embedded database called Badger DBS", right after Dgraph/Go — Dgraph's BadgerDB). Log TERM high. |
| Dgraph / Neo4j / MongoDB / Cassandra / Elasticsearch / BigQuery / PostgreSQL / Postgres / Oracle | as ASR | keep as spoken, product casing ("cassandra", "mongo" -> "Cassandra", "Mongo"). |
| Slack's | slags (00:54:08 "We'll discuss slags, real-time communication") | -> "Slack's" (topic is Slack real-time communication). Log TERM high. "slacks, real-time" (03:14:18) -> "Slack's" same rule. |
| von Neumann | one human's (00:02:17 "the one human's architecture of the first CPU set") | -> "von Neumann architecture" (CPU architecture context; ASR rendered the name as common words). Log TERM, conf medium. |
| DB | !DV (03:02:35); !TV (03:04:33, 02:42:06) | AMBIGUOUS RULE: -> DB only in storage sentences: 03:02:35 Student 5 "It didn't write to the DV" -> DB (high); 03:04:33 Student 5 "the TV has committed" -> DB (medium); 02:42:06 "you can also make a call to tv and get it" -> DB (medium, data lookup context). Any other "TV" stays. |
| DBs | DBS (00:09:48 "any document DBS") | -> "DBs" (casing, plural). |
| WS1 / WS2 / WS3 / WS4 / WS | as ASR | keep; teacher's shorthand for WebSocket server 1..4. |
| KV, KV store | KV | keep. |
| IO, UI, CPU, FYI, OTP, IOPS, SSH, TLD, LinkedIn, JavaScript, NAND (gate), LZ (compression), VP, JP Morgan Chase, HDFC Bank, APP / LG (stock symbols in time-series example, 00:28:17), DM(s) | as ASR | keep — all correct in context. |
| A, B, C, D, E (users), C1/C2 (channels) | ABC; ABCD; BCD; bcd | user-letter lists ("sends to BCD", "four connections for ABCD"): keep letters as ASR grouped them; casing "bcd" -> "BCD" only. |

### lec02 Pass 5 reconciliation (from chunk notes; all chunks re-grepped, no leftover ASR forms)

| Canonical | ASR forms seen | Decision |
|---|---|---|
| Pub/Sub | Pubser (02:10:01); popsob (02:12:21); pumps up (02:29:06); real type of sub (02:27:21); copsev (02:43:21) | non-words in Pub/Sub explanation -> Pub/Sub (logged TERM). Adds to the Pub/Sub row. |
| Redis | redisk (02:17:41); radius (02:18:43, 02:43:45); read (02:46:37) | -> Redis only in the Pub/Sub-between-servers context (logged). "studies" (02:44:06) and "superior read" (02:46:35) stay flagged `[?Redis]`. |
| WebSocket(s) | web pockets (02:18:56); pepsockets (02:38:12) | non-words -> WebSockets (logged). |
| WebSocket | !web software (01:29:07, 01:46:55, 01:48:48, 02:57:32, 03:12:03, 03:12:11) | RULE: corrected only at 01:48:48 (strong context); every other hit stays `[?WebSocket \| asr: "web software"]` - real English words, listener confirms. Same rule for future lectures. |
| edge server(s) | ad server; head servers; age server(s) (02:34:01-02:44:26) | -> edge server(s) in the edge-server design section (logged TERM). |
| cross-shard | cross-sharp; cross-shot (00:13:26-00:14:17) | -> cross-shard (logged). |
| disk | !desk (00:16:38, 00:26:08) | -> disk only in storage/disk-IO sentences (logged WORD). |
| graph (database) | !grab; !craft (00:32:20-02:49:54) | -> graph only in "graph database(s)" context (logged). |
| column-oriented / row-oriented | color-oriented; raw oriented (00:27:54-00:29:45) | -> column-/row-oriented (logged). |
| non-relational | known relational (00:00:28); non-resistant (00:45:50, 00:45:56) | -> non-relational (logged WORD, medium). |
| DBs | devs (00:11:03) | -> DBs in database-type sentences (logged). |
| WiredTiger | Wiretigers (00:51:01) | -> WiredTiger's (MongoDB docs context; logged medium). |
| exactly-once (semantics) | exactly one semantics (02:54:18-02:54:24) | -> exactly-once (logged medium). |
| pull-based | full base (02:46:06) | -> pull-based (logged medium). |
| joins / self joins | joints; cell joints (02:49:54-02:50:01) | graph-DB context -> joins / self joins (logged). |
| cohort | court (00:35:01) | -> cohort (logged); 02:30:31 "code" stays flagged. |
| toolings | !two links (00:44:14-00:46:20, x4) | NOT corrected - teacher says "toolings" at 00:45:56, but "two links" is real English; stays `[?toolings \| asr: "two links"]`. |
| REST, gRPC | rest; GRPC | casing only. |
| Socket.io / Socket IO | socket IO | keep as ASR wrote it (casing only); no lecture-wide rewrite to Socket.IO. |
| WebTransport | web transport (03:12:04, 03:12:16) | kept as spoken ("web transport"); not joined. |
| timestamp | time stamp (02:58:41, 02:58:59) | kept as ASR wrote it (teacher also says "timestamp"). |
| C-store | C-store (00:24:44) | paper "C-Store"; kept ASR casing. |
| Parquet, Redshift, BigQuery, Neptune, Spring Boot, CRDT, vector clock, Signal protocol, Discord, Zoom chat | as ASR | correct as heard; casing only. |

## Course-specific names (products, tools, people, companies the teacher uses)

| Canonical | ASR forms seen | Notes |
|---|---|---|
| (student names) | | Keep names exactly as ASR wrote them unless the same person is clearly spelled differently in the same chunk; if unsure, keep and add [check: name spelling]. Do not invent names. |
| Abhishek | "Hey Abhishek" (03:11:59, Student 10); "Abhishek? No problem." (03:11:56); 02:54:08 (Student 7) | REVISED in Pass 5: students address the teacher as "Arpit" four times (01:22:15, 02:31:58, 02:40:11 "Erfit", 02:47:58) vs "Abhishek" twice - the teacher's name is probably Arpit; "Abhishek" may be a student/another person. Keep both as spoken, never as a label; open question. |
| Arpit | 01:22:15, 02:31:58, 02:47:58; "Erfit" 02:40:11; teacher's own example 00:36:18 | probably the teacher's name (see above). Keep as spoken; label stays "Teacher". |
| Sunil | 00:40:13, 01:24:28 | called on; STUDENT_4 answers at 01:24:37 -> `Student 4 (Sunil)` for that exchange only (STUDENT_4 also answers "Jay" at 02:40:08 - label mixes people). |
| Ajay | 00:25:56 | called on; STUDENT_1 answers - no name attached (STUDENT_1 = Pankaj at 01:03; label mixes people). |
| Vikram | 02:06:06, 02:43:13 | STUDENT_3 answers -> `Student 3 (Vikram)` for those exchanges. Amrik/Amrit 01:56:55 also answered by STUDENT_3 - no name attached there. |
| Rajiv | 02:31:54, 03:01:57 | STUDENT_5 answers -> `Student 5 (Rajiv)`. |
| Harsh | 02:04:04 ("harsh gone"), 02:48:38 | STUDENT_9 -> `Student 9 (Harsh)` at 02:48. |
| Sampat / Sampar | 03:07:41 ("Sampat"); 00:51:20 ("Sampar?") | STUDENT_2 answers at 03:07:44 -> `Student 2 (Sampat)`. |
| Sumit? | 01:26:56 "summit summit" | kept "Summit, Summit" + `[check: name spelling]`. |
| Jodhinder, Devasheesh, Matt, Jay, DP, Alex(a) | 02:02:19, 02:50:12, 02:47:54, 02:40:08, 01:09:05, 01:10:10 | names called; kept as spoken + `[check: name]`, not attached to labels. |
| Pankaj | 01:03:01 "Yeah, Pankaj." | teacher calls on STUDENT_1 -> may write `Student 1 (Pankaj)` for the 01:03 turn. |
| Rahul | 01:09:10 (Student 3: "what Rahul was saying") | refers to an earlier student; do not attach to a label without evidence. |
| Amrit | 02:05:03 "Amrit." -> STUDENT_12 answers | may write `Student 12 (Amrit)` for 02:05:05. |
| Alok | 03:14:47 "Alok sir, just stay back on the call." | admin aside; keep. |

## Romanization overrides

| Spoken word | House spelling | Notes |
|---|---|---|
| (none — English lecture) | | |

## Speaker map

Teacher = TEACHER (86.1% talk, 211 words/turn, 132 turns). Students STUDENT_1..STUDENT_17 (no STUDENT_ label is the teacher). One label = one student number: STUDENT_n -> **Student n**.

| Diarization label | Role | Evidence |
|---|---|---|
| TEACHER | Teacher | 86.1% talk time, 211 words/turn; opens class (00:00:02 "second day ... non-relational databases", agenda), calls the break (00:53:48 "five minutes break"), runs brainstorming ("Raise your hands. I'll pull you in. Yeah, Pankaj."), calls on students by name (Pankaj, Amrit), closes class (03:14:50 "Thanks folks for tuning in ... I'll upload the recording"). |
| STUDENT_1 | Student 1 (Pankaj at 01:03) | 3.4%, 29 short turns; answered teacher's call "Yeah, Pankaj" (01:03:04) with schema proposal (users/channels/messages/membership tables); 02:05:29 proposes connection limits; 02:41:38 proposes a routing service. |
| STUDENT_2 | Student 2 | 1.8%, short answers/questions, mid and end of class. |
| STUDENT_3 | Student 3 | 1.7%; 01:09:10 builds on "what Rahul was saying" (receiver type column); 01:55:38 "that would be slow, right?"; 02:45:45 Redis Pub/Sub vs Kafka question. |
| STUDENT_4 | Student 4 | 1.7%, 26 short turns, many "?" (13); 02:38:53 "any specific reason to choose Redis Pub/Sub"; 02:40:38 security question. |
| STUDENT_5 | Student 5 | 1.5%; end-of-class Q&A 03:02–03:05 (message lost / DB write, shared database between workers and API servers). |
| STUDENT_6 | Student 6 | 1.3%; 00:50:04 SQL vs non-SQL / "MongoDB also offers ACID properties" question; 02:03:24 overhead answer. |
| STUDENT_7 | Student 7 | 1.0%, questions ~02:59 (client-side time). |
| STUDENT_8 | Student 8 | 0.7%; 00:48:13 "Right. Right. Thank you."; 03:12:34 long Slack vs WhatsApp comparison question. |
| STUDENT_9 | Student 9 | 0.4%; called on at 02:04:04 ("harsh gone" — ASR of a name, keep + [check: name]); 02:48:40 sharding question; 02:49:29 multi-level-marketing hierarchy / graph DB question. |
| STUDENT_10 | Student 10 | 0.3%; 03:09:51 six-concurrent-connections / tabs / sub-domain question; 03:11:59 "Hey Abhishek, just one last thing". |
| STUDENT_11 | Student 11 (label mixes) | 3 words-ish turns. 01:03:40 "sent the message and." is the END of Student 1's sentence ("...the channel ID in which the user sent the message and") -> relabel Student 1, log SPEAKER. 01:04:10 "No, I didn't see that." answers teacher's question to Student 1 ("Looking over here?") -> Student 1 likely; use Student 1 only if chunk context confirms, else `Student?`. 02:05:40 "Why?" -> `Student?` (could be teacher prodding Student 1). |
| STUDENT_12 | Student 12 (Amrit) | 02:05:05 answers teacher's "Amrit." with server-discovery question. |
| STUDENT_13 | Student 13 | 03:13:22 "Yes.", 03:14:39 "Thank you." (end of class) — keep. |
| STUDENT_14 | Student 14 | 03:07:39–40 "Thanks. Thanks." — student thanking after an answer; keep both only if not a duplicate (see hallucination notes). |
| STUDENT_15 | Student 15 | 02:43:00 "Correct." — 1 word; could be teacher back-channel -> `Student?` unless context decides. |
| STUDENT_16 | Student 16 | 03:04:37 "Yes." |
| STUDENT_17 | Student 17 | 03:09:07 "Okay." |

Turn-level rules (from lec01, still valid):
- A one-word "Correct." / "Right." under a STUDENT label in the middle of that student's own explanation is often the TEACHER's back-channel (e.g. STUDENT_1 02:05:37 "Correct.", STUDENT_9 02:49:03 "Correct.", STUDENT_8 03:13:26 "Correct.", STUDENT_10 01:41:27 "Correct."). Split/relabel to Teacher only with clear evidence (the student is asking with "right?" and "Correct." confirms it); otherwise leave and do not guess.
- TEACHER segments that contain a student's words (e.g. #1971 02:03:48 "...small mice yeah i'm not able to think of it that's fine..." — "yeah i'm not able to think of it" is a student; #1974 02:04:04 ends "...yeah so i think" = Student 9 starting): SPLIT + log SPEAKER; use `Student?` if the student is not identifiable.
- A STUDENT line that is clearly the teacher continuing an explanation -> Teacher + log SPEAKER. A TEACHER line that is clearly a student question -> `Student?`/number + log SPEAKER/SPLIT.
- 02:41:54 (#2635) STUDENT_1 "do that that's not at all real time okay so i was thinking like it can uh like it can catch the" — first half ("do that that's not at all real time") continues the teacher's previous sentence; split at "okay so i was thinking" only if clear, else leave and `[check: diarization seam]`. Next TEACHER line #2636 "users data which is still slow..." starts with the student's object ("the users data") — seam; do not move words across turns, add `[check: diarization seam]`.

## Known structure notes

- 00:00:02–00:54:24: first half, non-relational databases overview.
- 00:53:48–00:54:24: teacher announces break ("five minutes break ... see you folks at 10 after 5", "Thanks folks").
- **00:54:25–00:59:43 (318 s gap): break.** Mark admin, add `[break ~00:54:25-00:59:43]`, not [missing]. Segment #928 00:59:43 "Thank you." (TEACHER) right after the gap: PHRASE + AFTER-GAP = 2 signals -> remove as HALLUCINATION unless chunk context shows the teacher returning ("Let's start with the second half" follows at 01:00:05, 22 s later — a silence-filled return; default remove + log).
- 01:00:05: second half starts — Slack real-time communication design (schema brainstorming from 01:02:11).
- Hallucination candidates are mostly benign:
  - 60+ isolated "Okay." / "Thanks." / "Thank you." PHRASE hits — real back-channels in a live class (teacher acks, students thanking after answers). KEEP by default; remove only an identical consecutive duplicate with no plausible second utterance (e.g. #989/#990 STUDENT_11 "Okay. Okay." 01:03:43, #1317/#1318 01:24:26–27, #1678/#1679, #2020/#2021, #3147/#3148 STUDENT_5, #3202/#3203 STUDENT_14 "Thanks. Thanks.") — doubt -> keep both.
  - REPEAT-SEG hits are mostly the teacher's emphasis ("This does not mean we are using relational database" 01:02:32/01:02:40 with "FYI" in between; "That's good. That's good."; "What's the overhead?" x3; "What's the problem?"; "Interviews are stupid."; "Use that once. / Use that one."). KEEP. Check: #54 00:02:52 "as non-relational databases" (inside one sentence, real), #298 00:17:52, #520 00:30:03, #530 00:30:21, #2464 02:32:46, #2742 02:47:09 (STUDENT_3), #3165/#3167 03:05:32–34 "I have a video on it." x3 (third copy is a likely ASR duplicate -> decide in chunk; doubt -> `[check: possible ASR duplicate]`).
  - LOOPs that are real speech: #420 00:25:39 "highly, highly, highly, highly recommended" (emphatic, keep up to as spoken? collapse to 3 max only if clearly looped — prefer keep, it is teacher style), #2774 02:48:14 "No, no, no, no, no, no." (keep, emphatic), #2283/#2285 02:23:30–02:23:42 "six six six six six" / "five five five five five five five" = teacher illustrating browser loading 6 / 5 images at a time — real content, KEEP. #1418 01:29:13 "wait, wait, wait, wait, wait" — likely real; keep up to natural count, `[check]` if garbled ("then when flows").
  - RATE hits (7–9 w/s) are short fast English sentences — not hallucinations; keep.
- Garbled spots to flag (not guess): see Open questions.
- 03:14:40–03:15:28: class close (teacher thanks, "I'll upload the recording by evening", "Next week distributed systems and ID generators", "Bye. Bye.") — real, keep (both "Bye." plausible).
- Possible diarization seams: 01:03:36–01:04:10 (Student 1/STUDENT_11), 02:03:43–02:04:12 (student words inside teacher segments), 02:41:50–02:42:06 (Student 1 / Teacher).

## Open questions

Keep ASR text and flag with `[?term | asr: "..."]` (if a guess exists) or `[unclear: "..."]`:
- 01:09:05 "DP, what would you do?" — probably a student's name/initials being called on; keep "DP" + `[check: name]`.
- 01:23:32 "Why there has to be a proper ISD, right?" — unknown; `[unclear: "proper ISD"]`.
- 01:57:42 Student 10 "both of the poor can communicate" — "peers"/"ports"? `[unclear: "both of the poor"]`.
- 01:00:37 "holds ruba teams teams insta facebook" — list of chat apps; `[unclear: "holds ruba"]`.
- 02:04:04 "harsh gone" — teacher calling on a student by name; keep + `[check: name]`.
- 02:05:26 "Hey, man." before Student 1 answers — possibly a name; keep + `[check: name]`.
- 02:12:53 "redis 8 would fire a command WS1 would fire a command" — "redis 8" likely a restart/garble; `[unclear: "redis 8"]`.
- 02:12:57 "Similarly BK late would fire subscribe" — likely "B, C, D" / "WS2"; `[unclear: "BK late"]`.
- 02:20:27 "your basic Kidditch diagram" — `[unclear: "Kidditch"]`.
- 02:20:33 "Any partition DBA would work." — likely "partitioned DB"; `[?DB | asr: "DBA"]`.
- 02:39:04 "OCS streaming OCS I'm not sure I just pick one" — a cloud provider's streaming product; `[unclear: "OCS"]`.
- 02:40:46 "you rely on a back end DPA call" — "DB call"/"API call"; `[unclear: "DPA"]`.
- 02:41:50 "that service is oververted" — `[unclear: "oververted"]`.
- 03:12:03 Student 10 "we discussed a lot about web software" — probably "WebSocket"; `[?WebSocket | asr: "web software"]`.
- 03:14:18 "slacks, real-time cover" — "Slack's real-time [communication]"; apply Slack's rule, `[unclear: "cover"]` only if nonsense.
- Lec01 leftover acronyms (GCVM, EPS, MPT, FII, SSC, ACT, STD) do not occur in lec02.
