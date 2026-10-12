# Teaching Map - Lecture 02 (Week 2, Day 2): Non-relational databases, Slack's real-time text communication

Source: `lectures/lec02/transcript/transcript.md` (03:15:25). All timestamps refer to that file / the video. Board references (`D-xx`) are to `lectures/lec02/board/diagrams.md`; ledger ids (`L-xxxx`) to `lectures/lec02/ledger/ledger.jsonl`.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **day 2 of week 2** ("Great week, second day", 00:00:02). Day 1 of week 2 (not in this corpus) built a distributed key-value store on a relational database, sharded A-M / N-Z, and discussed storing a JSON value and querying inside it (00:07:03, 00:08:33, 00:51:20). Lecture 1 (week 1 day 2, `lectures/lec01/teaching_map.md`) introduced WebSockets, message queues/streams/Kafka and sharding, and explicitly deferred "scaling WebSockets, Slack real-time" and "NoSQL + Slack" to this session (lec01 02:01:30, 02:23:22). Almost all board content is a **prepared scrolling page** revealed as the teacher talks; only a few strokes are live (board_log header), so the board is a reliable summary but not evidence of what was said first.

The lecture has two halves with very different teaching styles:
- **First half (00:02:47-00:53:41): a lecture-style tour** of database families (document, key-value, column-oriented, graph) built on one running example (`stock_ticks`, D-01), one war story (bank fraud call) and a strong meta-message: *never trust a generic claim about a database*.
- **Second half (01:00:04-02:30:12): a Socratic design session** on Slack's real-time text chat, where the teacher repeatedly poses a question, collects 3-6 student proposals, rejects each with a one-line reason, and only then reveals the design. The single big idea is **"different guarantees, different architecture"** (three persistence types: Slack / WhatsApp / Zoom).

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:00 | 00:02:47 | 3 | Admin: agenda (two halves) + framing "system design = patterns / Lego blocks", CS mirrors how humans work (L-0004..L-0007) | Roadmap + promise: "you can switch from one message delivery model to another... Slack, WhatsApp, Zoom chat" | "Okay, so let's start with that." |
| 1 | 00:02:47 | 00:15:38 | 13 | **Non-relational databases: framing, document DBs, key-value stores** | **Provocation against the term itself**: "there should not be any term as non-relational databases" (L-0008); attacks "NoSQL scales" (L-0009) | Trade-off maxim (00:15:05) -> "The next type of database" |
| 1a | 00:02:47 | 00:04:36 | 2 | Naming: say the specific type, not "NoSQL" | Opinion first | "a very general distinction..." |
| 1b | 00:04:36 | ~00:08:33 | 4 | Broad split: give up consistency for scalability/availability; **two meanings of consistency (ACID vs CAP)**; "RDBs don't scale" myth; never believe generic statements (L-0013..L-0025) | Definition, then immediate self-hedge ("not always true"), backward link to yesterday's sharded KV store | "Now the first type... document databases" |
| 1c | ~00:08:33 | 00:12:46 | 4 | Document DBs: closest to relational, JSON, complex queries, partial updates vs KV read-modify-write; DynamoDB blurs the line; MongoDB went BASE -> ACID (L-0027..L-0040) | Feature list, then **counter-example to its own classification** | "let's move to the second type" |
| 1d | 00:12:46 | 00:15:38 | 3 | Key-value stores: key-wise ops only -> no cross-shard queries -> thousands of partitions; "the more complex the queries, the less you can distribute" (L-0041..L-0049) | Restriction -> benefit chain; IN-operator cross-shard example (00:13:26) | "Every single thing is a trade-off" |
| 2 | 00:15:38 | 00:30:09 | 14.5 | **Column-oriented databases** | **Personal enthusiasm** ("I am personally fan of") + one running table `stock_ticks` (D-01) | Q&A on storage/compression/pricing, then "Let's move to... graph databases" |
| 2a | 00:15:38 | 00:24:23 | 9 | Row layout vs column layout; "one file per column" model; `SELECT avg(price) WHERE ts=...` reads 2 of 5 columns; analytics vs transactional; Redshift/BigQuery/Parquet; "go find your company's warehouse" (L-0050..L-0068) | **Same query, two layouts**, disk IO counted column by column | Paper recommendation |
| 2b | 00:24:23 | 00:25:45 | 1.5 | C-Store paper recommendation, "don't get spoon-fed, just Google" (L-0069, L-0070) | Personal story (sixth paper read, master's) | "Any questions?" |
| 2c | 00:25:45 | 00:30:09 | 4.5 | Q&A: SELECT still reads whole row; insertion heavy -> never primary, fed by async job; 29x compression, RLE; reserved-capacity pricing (L-0071..L-0082) | Student-driven | "Let's move to one of the most misunderstood databases" |
| 3 | 00:30:09 | 00:40:01 | 10 | **Graph databases** | **Misconception first**: "Twitter follow/following -> graph DB" is the wrong instinct (L-0083, L-0087) | Product list -> "these are all basics" |
| 3a | 00:30:09 | 00:35:17 | 5 | What a graph DB is (adjacency list + APIs), hard to scale, Hulk-opening-a-jar; where they thrive: LinkedIn degrees, collaborative filtering (iPhone -> AirPods cohort) (L-0084..L-0096) | Definition from college DSA, then use case | "Another use case, far more interesting" |
| 3b | 00:35:17 | 00:40:01 | 5 | Fraud detection: teacher's own Grammarly/HDFC call; new edge outside the cluster; 50-60 parameters; 200 ms SLA from a JP Morgan Chase VP; Neo4j, Neptune, Dgraph, BadgerDB, TigerGraph (L-0097..L-0108) | **Personal war story first**, mechanism second, source credited | "we will use each one of them in the coming weeks" |
| 4 | 00:40:01 | 00:53:41 | 13.5 | **Why non-relational DBs scale; when SQL vs NoSQL; first-half Q&A** | **First-principles question**: "why do people say non-relational databases scale?" | Q&A ends at KV store blob sizes -> break |
| 4a | 00:40:01 | 00:43:48 | 4 | No relations = no FK checks on insert/delete; RDBs chose correctness because of financial backstory; drop FKs and a relational DB partitions the same way (L-0109..L-0118) | Mechanism (FK insert/delete rules) -> **"everyone has a backstory"** | "the biggest question of all time" |
| 4b | 00:43:48 | 00:47:11 | 3.5 | SQL when correctness/ACID is the product; NoSQL for gigantic ingestion (messages, logs, metrics), Cassandra (L-0119..L-0126) | Rule of thumb, explicitly "very broad" | "Any questions on this part?" |
| 4c | 00:47:11 | 00:53:41 | 6.5 | Q&A: graph storage (KV store = NAND gate of databases); graph DB is async, not transactional; N self-joins; MongoDB "use ACID sparingly"; KV is an access pattern, not a store; Redis vs DynamoDB engines; 4 MB blobs (L-0127..L-0143) | Student-driven; teacher reverses one question ("how would you power fraud detection on a relational DB?") | Break announcement |
| 5 | 00:53:41 | 01:00:04 | 6.5 | Admin: break (~00:54:25-00:59:43), preview "how, how, how, why, why, why at every single step" | - | "Let's start with the second half" |
| 6 | 01:00:04 | 01:17:47 | 17.5 | **Slack real-time communication: scope and schema** | **Scope-cutting**: hates "design entire Slack" -> text-only real-time chat (L-0146, L-0147); requirements list (L-0148) | "Two big key takeaways: noun-based naming, piggybacking instead of ifs and elses" (01:17:09) |
| 6a | 01:00:04 | 01:02:11 | 2 | Scope, requirements (one org, users, channels, DMs, real time, scrollable history), same architecture powers games/polls (L-0145..L-0151) | Requirements first; "directly jumping to WebSockets is not a good idea" | "Let's start with brainstorming... Schemas" |
| 6b | 01:02:11 | 01:06:23 | 4 | Student schema (users, channels, messages) -> "how do you know who is in which channel?" -> **membership**; naming entities as nouns vs `user_channel` (L-0152..L-0158) | **Open problem to class** (P1), teacher praises an unprompted good name | "And in messages, what would you store?" |
| 6c | 01:06:23 | 01:12:12 | 6 | Five student variants of DM vs channel messages, each rejected with one reason (nullable pair, two tables, receiver array, prefixed IDs, type enum, message without destination, pub/sub) (L-0159..L-0167) | **Socratic elimination** (P3) | Student reaches "DM = channel" |
| 6d | 01:12:12 | 01:14:19 | 2 | DMs are channels with two people (Slack's own API does this); `type` on channel; generalize, avoid ifs and elses (L-0168..L-0174; D-02) | **Real-world proof** ("this is not made up, this is there on Slack's API") | "And now the beauty of this design" |
| 6e | 01:14:19 | 01:17:47 | 3.5 | Membership as a noun unlocks `checkpoint` (unread count, last read), mute, favourite, notification prefs; time vs message granularity (L-0175..L-0181) | Payoff of the naming rule shown on a UI feature | "Now let's go into high-level part" |
| 7 | 01:17:47 | 01:28:08 | 10 | **High-level design: message DB, and how to send a message** | Assumption stated ("hypothetically... a relational database which is sharded") | Students keep defending WebSocket -> teacher: "Let me talk about it in a little more detail" |
| 7a | 01:17:47 | 01:21:17 | 3.5 | DB choice: sharded MySQL is enough for enterprise chat; Cassandra for Instagram Messenger; "product and requirement, not affinity to a stack" (L-0182..L-0190; D-03) | **Contrast of two products' traffic** | "Now, comes a really interesting point" |
| 7b | 01:21:17 | 01:28:08 | 7 | "How should a sent message be persisted?" Students: WebSocket for sending (have it anyway; less overhead; frequent; handshake) -> teacher: receiving yes, sending why? (L-0191..L-0200) | **Open problem + repeated "why?"** (P4, P5); observation prompt "what do you see on Slack?" | "Let me talk about it" |
| 8 | 01:28:08 | 01:46:41 | 18.5 | **Message sending guarantees: three persistence types** | **Observation-first**: Slack message shows grey then black (L-0202, L-0203) -> "think of the guarantees" | "So these are three types... In my final diagram I've done it with Kafka" -> scaling WebSockets |
| 8a | 01:28:08 | 01:29:19 | 1 | Grey -> black delay as a *hint* (not proof) that sending isn't over WebSocket | Product observation | "I want to introduce three types of communication" |
| 8b | 01:29:19 | 01:32:58 | 3.5 | Type 1 Slack: persist (HTTP -> API -> DB) then notify edge server -> WebSocket to receivers; credibility / misquoting argument (L-0204..L-0210; D-04 white path) | **One diagram, three coloured paths** (D-04) | "Because also one more reason..." |
| 8c | 01:32:58 | ~01:36:57 | 4 | Type 2 hypothetical WhatsApp: device keeps a copy -> WS -> edge -> Kafka -> workers -> DB asynchronously; why it is bad for Slack (refresh before persistence) (L-0211..L-0219; D-04 green path) | Hypothetical, loudly flagged ("WhatsApp doesn't do it") | "Now the third type" |
| 8d | ~01:36:57 | 01:38:24 | 1.5 | Type 3 Zoom chat: no persistence, only real time (L-0220..L-0222; D-04 blue path) | Familiar product behaviour (leave meeting, history gone) | "One more reason why you should not do it via WebSocket" |
| 8e | 01:38:24 | 01:39:48 | 1.5 | No DB calls from the WebSocket/edge server: load, security (credentials on internet), blast radius (L-0223..L-0225) | Infrastructure reason added after the product reason | "Any questions on this?" |
| 8f | 01:39:48 | 01:46:41 | 7 | Q&A: UDP over TLS for sending (rejected: retries, who broadcasts, keep it simple); WS "persistence" = connection, not DB; edge servers most vulnerable; "edge" isn't CloudFront; Kafka variant equally valid, "I deliberately keep it conflicting" (L-0226..L-0238) | Student-driven | "now let's spend some time talking about scaling" |
| 9 | 01:46:41 | 02:07:58 | 21 | **Scaling WebSocket servers: the cross-server problem and the TCP mesh** | **Toy numbers**: connection limit = 4, channel C1 with users A-E (L-0242..L-0244; D-05) | Mesh overhead revealed -> "So how do you make it better?" |
| 9a | 01:46:41 | 01:55:21 | 8.5 | Why persistent connections power the most critical features; each server knows its users (Socket.io) and their channel membership, kept eventually consistent; in-server fan-out; E is on WS2 (L-0239..L-0252) | **Toy scenario** + hotel-room analogy (01:54:09) | "How will you do that? Raise your hands." |
| 9b | 01:55:21 | 01:57:35 | 2 | Students: via API server; cache user info; Kafka; a relay server (L-0253..L-0257) | **Open problem** (P7); "start simple" | "Why can't these two machines talk to each other?" |
| 9c | 01:57:35 | 02:02:45 | 5 | Plain TCP link WS1-WS2, then WS3 with user F; "what is a disadvantage?" (L-0258..L-0264; D-05) | **Bare-minimum solution first** | Student names "mesh" |
| 9d | 02:02:45 | 02:07:58 | 5 | Mesh: students list keep-alive, failures, unnecessary sends, async, discovery, connection count, per-message handshake; teacher withholds answer ("dinosaur behind you"), then reveals: inter-server links hog the server's connection budget (3 of 7) (L-0265..L-0277) | **Withheld answer** (P8) + "understand the problem before the solution" (02:04:42) | "So how do you make it better?" |
| 10 | 02:07:58 | 02:19:38 | 11.5 | **Real-time Pub/Sub (Redis) between WebSocket servers + the connection-balancing service** | Solution stated immediately after the problem: one connection per server to a real-time Pub/Sub, "not Kafka" (L-0278..L-0285; D-06) | "Let me formally cover it" -> recap |
| 10a | 02:07:58 | 02:10:09 | 2 | Real-time Pub/Sub = send to whoever is subscribed right now, zero persistence, no delivery guarantee; Redis | Definition | "there is a conflicting term, channel" |
| 10b | 02:10:09 | 02:14:57 | 5 | Redis channels vs Slack channels; servers (not users) subscribe per Slack channel; push not pull; cluster it; co-locate users of the same channels (L-0286..L-0296) | Terminology warning + refinement of the broadcast | "first step... how did A get the IP address of WebSocket server one?" |
| 10c | 02:14:57 | 02:19:38 | 4.5 | Service that tells clients which server to connect to ("like DNS, not DNS"); one server per organization (200-20,000 employees is nothing); failover by reconnect; rebalancing; "I built it myself" (L-0297..L-0309; D-06 purple box) | **Rhetorical question + failure question** ("what if this server goes down? Oh my God, life ended. No...") | "Let me formally cover that and then I'll take questions" |
| 11 | 02:19:38 | ~02:30:12 | 10.5 | **Recap of the Slack design (prepared page)** | Scroll through prepared notes (D-07..D-13) | "any questions on this?" |
| 11a | 02:19:38 | 02:21:08 | 1.5 | DM = channel; sharded message DB by channel_id; basic REST send flow; three persistence types and their colours (white Slack, green WhatsApp, blue Zoom) (L-0310..L-0319; D-07, D-04) | Recap | "one thing... which I did not cover" |
| 11b | 02:21:08 | 02:24:58 | 4 | Browser limit of six concurrent TCP connections per domain; one WebSocket per product; 100 images loading 6/5/4 at a time (L-0320..L-0330; D-08) **- see factcheck L-0324/L-0325** | New point added in the recap, with a numeric demo | "this is what I was talking about, the Kafka-based thing" |
| 11c | 02:24:58 | 02:27:47 | 3 | Overall architecture: edge servers (membership), Redis Pub/Sub cluster, Kafka -> workers -> partitioned DB, API servers for non-real-time (scroll, muted channels); "insight: messages once sent will always be persisted" (board) (L-0331..L-0340; D-09, D-10, D-11) | Final diagram, deliberately the *other* persistence choice | "one piece of component I should have drawn" |
| 11d | 02:27:47 | ~02:30:12 | 2.5 | "Balancer" naming; Redis drops messages -> periodic background refresh ("checking for new messages" on WhatsApp); board: correction job, replay buffer (L-0341..L-0346, L-0333, L-0334; D-11, D-12, D-13) | Naming on the spot; failure case | Wrap-up |
| 12 | ~02:30:12 | 02:31:58 | 2 | Admin: "best I've covered this", implement hello worlds; next week distributed systems, ID generators, load balancer code walkthrough (L-0347..L-0351) | - | "more than happy to take the questions" |
| 13 | 02:31:58 | 03:10:51 | 39 | **Q&A** (edge-server exposure and security; channel changes; why Redis; bad actors/private channels; routing service; Redis vs Kafka; Kafka delay; streaming out of scope; "best way"; MLM hierarchy graph; deletion; ordering/exactly-once/timestamps; DB node failure; shared DB; E2E encryption; channel type; six connections per sub-domain) | Student-driven | - |
| 13a | 02:31:58 | 02:35:52 | 4 | Exposing edge-server IPs vs load balancer (3-5 ms per hop, sticky); "interviews are stupid"; hardening; zero DB credentials, only a Kafka string; DDoS + rate limiter (L-0352..L-0361) | Student-driven | next hand |
| 13b | 02:35:52 | 02:45:44 | 10 | Channel changes reach edge servers via client + Pub/Sub broadcast + periodic meta call; any real-time Pub/Sub would do; no expiry; bad actors falsely claiming membership -> server-side check; per-message routing service too slow; notification not guaranteed, persistence is; Redis cluster + balancer co-location; public IP again (L-0362..L-0383) | Student-driven | - |
| 13c | 02:45:44 | 02:54:08 | 8.5 | Redis Pub/Sub vs Kafka (push vs pull, zero vs historical persistence); async persistence delays storage, not delivery; live streaming out of scope; "no best way - buffet"; MLM hierarchy -> graph DB; deletion WhatsApp vs Slack; why WhatsApp took long (3.5 months / 3 engineers story) (L-0384..L-0403) | Student-driven | - |
| 13d | 02:54:08 | 03:02:02 | 8 | Ordering and exactly-once: "who said?"; two front-end ordering cases; Teams glitches explained by the architecture; DB insertion time is the only clock; vector clocks/CRDTs exist but not worth it (L-0404..L-0419) | Student-driven; teacher **challenges the premise** | - |
| 13e | 03:02:02 | 03:10:51 | 9 | DB node failure: replication factor 3, ack only after replicas (DynamoDB); shared DB between workers and API is fine; E2E encryption - teacher declines to answer; channel `type` vs private/public; six-connection limit is per host name (L-0420..L-0434) | Student-driven | Admin request |
| 14 | 03:10:51 | 03:11:59 | 1 | Admin: one-on-one request, recording must start (L-0435) | - | Next question |
| 15 | 03:11:59 | 03:14:40 | 2.5 | Q&A: WebTransport (teacher hasn't heard of it); Slack vs WhatsApp loading data on reconnect (API + checkpoint vs push to device); "one pattern fits everywhere" (L-0436..L-0440) | Student-driven | Close |
| 16 | 03:14:40 | 03:15:25 | 1 | Admin: close; implement Redis Pub/Sub hello world; next week (L-0441) | - | End |

Time budget: database tour 51 min (+ ~11 min Q&A inside), break 6.5, Slack schema 17.5, send path + guarantees 28.5 (+7 Q&A), WebSocket scaling 32.5, recap 10.5, open Q&A ~42. Roughly **30% of the lecture is Q&A**; the second-half Q&A carries real design content (security of edge servers, membership trust, deletion, ordering, replication) and must be folded into the design sections.

**Introduction patterns observed** (reusable templates):
- **Attack the label, then the generic claim** (NoSQL naming 00:02:47; "NoSQL scales" 00:02:47; "RDBs don't scale" 00:07:03; MongoDB ACID 00:12:08). Every family is introduced with its own counter-example.
- **One table, two layouts, count the IO** (row vs column, 00:16:12-00:22:04).
- **Wrong instinct -> right use case -> personal war story** (graph DBs: follow/following -> recommendations -> fraud call, 00:30:09-00:38:20).
- **Mechanism -> backstory** ("why relational chose correctness: financial use cases", 00:41:25).
- **Socratic elimination with one-line rejections** (schema 01:06:23-01:12:12; sending 01:21:17-01:28:08; cross-server delivery 01:55:21-01:57:46; mesh overhead 02:01:32-02:06:46). The teacher keeps asking "why?" until the student's real reason is exposed, then gives the answer.
- **Observe the product before designing it** (grey -> black on Slack 01:28:08; Zoom chat history 01:36:57; Slack API DMs 01:12:12; WhatsApp "checking for new messages" 02:29:24).
- **Toy numbers that make the problem visible** (connection limit 4, five users, 01:48:19; 4 user + 3 inter-server = 7 connections, 02:06:46).
- **Bare minimum first, then fix its real problem** (TCP link -> mesh -> real-time Pub/Sub -> balancer).
- **Deliberately conflicting designs** (Slack drawn synchronous, final diagram asynchronous via Kafka, 01:45:27, 02:24:58) to force the reader to choose by guarantee.

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:16:12-00:18:40 | (rhetorical) "Now what do we gain by this [column layout]? Say we want the average price of the entire stock market for a particular day." | - | Walks the row store reading symbol, name, exchange for nothing (00:20:16) | Column store reads only `price` and `ts` files (L-0062; D-01) |
| P2 | 00:30:09 | (rhetorical) "Let's build our Twitter follow/following relationship. You would always think: let me use graph databases." | - | "They might not be the best choice"; Hulk opening a jar (00:32:07) | Graph DBs for core graph algorithms (recommendations, fraud), not for storing edges (L-0083, L-0089) |
| P3 | 00:40:01 | "Why do people say that non-relational databases scale?" (rhetorical) | - | FK checks on insert/delete; backstory of financial use | No relations -> partition freely; drop FKs in SQL and it scales the same (L-0109, L-0116) |
| P4 | 00:43:48 | "The biggest question of all time": when SQL vs NoSQL? (rhetorical) | - | "Very broad sense" | Correctness/ACID -> SQL; gigantic ingestion, sharding out of the box -> NoSQL (L-0125) |
| P5 | 00:48:48 | (reverse question to S4, who asked why a graph helps) "How would you power fraud detection on top of a relational DB?" | S4: understands the benefit, not why RDB can't | N-level traversal = N self-joins, rewritten per depth; one data node | Graph traversal in one query; sharding out of the box (L-0132; see factcheck L-0132 on recursive CTEs) |
| P6 | 01:02:11 | "How would you go about designing a basic schema for only these features? ... What would be a schema?" | S1: users (id, name, nickname), channels (org id, channel id), messages (channel id, ...) | "Before that... how do you know which users are part of which channel?" (01:03:44) | S1: membership table (L-0155) |
| P7 | 01:04:03 | "How did you come up with this name? Membership?" | S1: didn't see it on the board | Praises it; most people write `user_channel`; nouns let you add columns (01:04:12-01:05:19) | Name entities as nouns (L-0156, L-0157) |
| P8 | 01:05:19 / 01:06:23 | "In messages, what would you store?" -> "If you do this [channel ID + receiver ID], what is the disadvantage? Either one can be null." | S1: two tables (channel msgs, DMs); S1: receiver array; S1: `from`/`to` with `CH-`/`usr-` prefixes; S3: receiver-type enum; S2: message shouldn't know where it goes; S2: common channel for a DM, as a pub/sub topic | Two tables -> double migrations (01:06:57); nullable pair -> orphan rows (01:07:17); array -> breaks when members change; prefixes -> string processing in every query (01:08:46); enum -> no FK on `to`, ifs and elses (01:09:49); no destination -> can't render a channel (01:11:00); pub/sub -> "unnecessary complication, focus" (01:11:43) | **DM = channel with two people**, `type` on channel (L-0168, L-0172; D-02) |
| P9 | 01:21:17 | "When a user sends a message, how should that message be persisted in this database?" | S1: WebSocket between users and API server for sending, since we need server->client anyway | "Why do you need a WebSocket?"; "This does not mean sending also needs to be done on WebSocket"; "Just because you have it does not mean you have to use it" (01:23:32) | Receiving over WS; sending is a separate decision (L-0193, L-0200) |
| P10 | 01:24:26 | "API or a special WebSocket server to send message?" | S4: saves per-message overhead vs REST; frequent communication | "Why does REST even exist?"; "Is Slack really as frequent as your Instagram Messenger?"; "What is more critical for enterprise?" (01:25:13) | Persistence matters more than overhead for enterprise (L-0196, L-0197) |
| P11 | 01:26:08 | "When you send a message on Slack, what happens? What kind of behaviour do you see?" | S4: expectation is it shows immediately; S1: "definitely WebSocket" because REST needs a handshake | "Not expectation. What do you see as a user?"; "Then the entire world should use just WebSockets... why are you spinning up Spring Boot instances?" (01:27:54) | Grey -> black: visible delay, a hint it's not sent over WS (L-0202, L-0203) |
| P12 | 01:38:24 | (rhetorical) "One more reason why you should not do it via WebSocket" | - | - | Edge server must not hold DB connections/credentials (L-0223, L-0232) |
| P13 | 01:40:59 | (to S1's UDP-over-TLS idea) "How many times would you want to retry? ... When A sends a message to B over UDP, who will tell B the message is there?" | S1: UDP is lighter than HTTPS | "Pros versus cons... don't overcomplicate"; "simple systems scale" (01:41:46) | Server broadcasts; HTTP send is fine (L-0226..L-0230) |
| P14 | 01:55:21 | "Then you have to do something such that this message reaches E. How will you do that?" | S3: via the API server (slow); S3: cache user info on each WS; S3: Kafka/messaging service; S3: another relay server | "You already have that information"; "The messaging service slows down... start simple" (01:57:05); "Why do you need another server? Why can't these two machines talk to each other?" (01:57:35) | One plain TCP connection between WS servers (L-0258, L-0259) |
| P15 | 02:00:42 | "What is a disadvantage of this architecture?" | S3: E/F get it later; S3: too many connections; S6: mesh, keep-alive overhead; S6: server down -> missed message; S6: sending to servers that don't need it; S9: make it asynchronous; S12: server discovery; S1: can't have infinite connections; S3: 3-way handshake per message | Latency fine ("real time"); failures = fault tolerance, not overhead; global state fixes unneeded sends; "a dinosaur behind you... worried about a small mice" (02:03:34); "three people have used the term overhead, but no one explained it" (02:04:42); handshake is once only (02:06:12) | Inter-server links eat the server's connection budget: 3 of 7 connections not serving users (L-0276, L-0277; D-05) |
| P16 | 02:07:58 | (rhetorical) "So how do you make it better?" | - | "It's a real-time Pub/Sub, not Kafka. Kafka would slow it down." | One connection per server to Redis Pub/Sub (L-0278..L-0280; D-06) |
| P17 | 02:10:09 | (rhetorical) "Why should this message be sent to WS3 and WS4? It should not." | - | Introduces Redis channels; servers subscribe, not users | Subscribe per Slack channel (L-0287..L-0291) |
| P18 | 02:14:57 | (rhetorical) "How did A get the IP address of WebSocket server one?" | - | "Like DNS, not DNS" | Connection-balancing service, one server per org (L-0297, L-0300) |
| P19 | 02:16:37 | (rhetorical) "What if this server goes down? Oh my God, life ended. No, no, nothing would happen." | - | - | Clients reconnect via the balancer; Redis covers the transition (L-0302, L-0303) |
| P20 | 02:41:43 | (student-proposed) A service that tells each server which client to send to | S1, then S1: cache the users' data | "Far too expensive... not real time"; "adding a service for the sake of it" (02:42:01) | Keep routing state in the edge server (L-0376..L-0378) |
| P21 | 02:40:40 | (student-proposed, S4) Bad actors / private channels with client-reported membership | S4 | "I have deliberately designed it in a way that makes you ask these questions" | Server-side membership check, edge behind LB/private (L-0374, L-0375; factcheck L-0374) |
| P22 | 02:54:24 | (to S7's ordering/exactly-once question) "Who said exactly-once semantics is there? ... Who said the message has to be up and down?" | S7: need ordered dialogue; Teams shows missing/duplicate/out-of-order | Two front-end cases; explains Teams glitches with the three types | DB order is source of truth; refresh or background job fixes order (L-0404..L-0411) |
| P23 | 02:59:01 | "Are you sending time from the client side? ... My first question is why?" | S7: client timestamps | "I can just change my clock to 1 January 1970"; vector clocks exist but not worth it (03:00:11) | Use DB insertion time (L-0412, L-0417) |
| P24 | 03:08:33 | (to S2, who proposed private/public instead of type) "How will you differentiate between a channel with two people and a DM?" | S2: private two-member channel = DM | "In DM I cannot add more people"; different rendering | Keep `type`; extensible (L-0431..L-0433) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"You send a message in Slack. It appears grey, then turns black a moment later. What does that tell you about how Slack sends it - and why would an enterprise chat choose that over sending on the WebSocket that's already open?"** (P9-P11, 01:21:17-01:28:08). The lecture's signature move: read the architecture off the product, then justify it by the customer's guarantee (persistence, credibility), not by overhead.
2. **"Same chat system, three products: Slack, WhatsApp, Zoom chat. For each, when is the message saved, and when is it shown to the others?"** (01:29:19-01:38:00, D-04). Readers fill a 3x2 grid; the payoff is "different guarantees, different architecture" (L-0219, L-0222).
3. **"A is on WebSocket server 1, E on server 2, both in #general. How does A's message reach E? Start with the simplest thing that could work."** (P14, 01:55:21). Students reached for Kafka, a relay service, the API server; the bare answer (one TCP link) is the teaching moment.
4. **"Now there are 100 WebSocket servers, each linked to every other. What is the real cost? (Hint: it is not latency, failures or extra messages.)"** (P15, 02:00:42-02:06:46). The withheld-answer prompt; readers can compute 4 users + 3 links = 7 connections, 3 wasted.
5. **"Design the tables for users, channels, DMs and messages. Where do DMs go - and what breaks if `messages` has both a nullable `channel_id` and a nullable `receiver_id`?"** (P6, P8, 01:02:11-01:12:12). Five plausible wrong answers, each with a crisp rejection; ends in "DM = channel with two people" backed by Slack's API.
6. **"You named the table `user_channel`. Rename it. Now where would you store 'last read' and 'muted'?"** (P7, 01:04:03; 01:14:19). Short, memorable; the noun name visibly unlocks the checkpoint feature.
7. **"Average price of all stocks today from a 5-column (or 100-column) `stock_ticks` table: how many columns does a row store read from disk, and how many does a column store read?"** (P1, 00:18:40, D-01). Numeric, verifiable, and explains why warehouses are columnar and never the primary store.
8. **"Would you use a graph database to store who-follows-whom? What would you use one for?"** (P2, 00:30:09; fraud story 00:35:17). Counter-intuitive answer plus a war story with a hard number (200 ms SLA).
9. **"Two messages arrive at B out of order. Do you need exactly-once delivery, vector clocks, or client timestamps? What does the UI actually need?"** (P22, P23, 02:54:24-03:01:03). Teaches challenging the requirement before engineering for it.
10. **"Your edge servers are exposed to the internet and trust the client's list of channels. What can a malicious user do, and what's the smallest fix?"** (P21, 02:40:11; with 02:31:58-02:34:52). Security trade-off the teacher designed in on purpose; pairs with "zero DB credentials on the edge".

Runner-up: "Why do people say NoSQL scales? Could you make MySQL scale the same way?" (P3, 00:40:01) - better as the opening provocation of the database section than as a pause prompt.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:01:08, 03:14:18 | System design = looking at patterns / Lego blocks (L-0006, L-0440) | Same pieces rebuild Slack, WhatsApp, Zoom | Opening and closing frame of the Slack section |
| 00:02:02 | CS mirrors how humans work; von Neumann architecture like the brain (L-0007) | Pattern thinking | Optional; factcheck inline note on L-0007 |
| 00:17:26 | "One file for each column" - "very crude, very naive" (L-0055) | Column-store layout | Keep as the mental model; label it naive as the teacher did |
| 00:32:07 | Graph DB for follow/following = using the Hulk to open a glass jar (L-0090) | Overkill tool | Strong, keep verbatim |
| 00:35:59 | International transaction "sticks out like a sore thumb" / new edge outside the circle | Fraud = anomalous edge | Animate as a new edge outside a cluster |
| 00:47:46 | KV store is the NAND gate of databases (L-0129) | Every DB can be modelled on KV | Great sidebar in the KV section (it came from a Q&A) |
| 01:54:09 | Friends in one hotel room having fun while two friends are in another room (L-0252) | Cross-server delivery problem | Use as the hook of the scaling section |
| 02:03:34 | "A dinosaur behind you staring, but you are worried about a small mice" (L-0269) | Missing the main overhead | Use in the mesh-overhead reveal |
| 02:14:57 | The connection service is "like DNS, not DNS" (L-0298) | Balancer's role | Keep with the caveat |
| 02:49:04 | "I have laid an entire buffet; create your own plate" | No single best design | Closing line for the three-types section |
| 02:20:36 | Colour coincidence: white Slack, WhatsApp green, Zoom blue | Mnemonic for D-04 | Use the same colours on the site's diagram |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:07:03 | Yesterday's KV store sharded A-M / N-Z (L-0023) | Relational can scale by giving up constraints | Backward link to week 2 day 1 |
| 00:11:09 | DynamoDB is KV but lets you query within the document (L-0036) | Category lines are blurry | Factcheck inline note |
| 00:12:08 | MongoDB "we are BASE, not ACID" -> now ACID compliant (L-0040) | Generic claims expire | Pair with 00:50:16 Q&A |
| 00:13:26 | `WHERE id IN (1,2,3)` across three shards (L-0043) | Cross-shard query cost | Small diagram |
| 00:16:12 | `stock_ticks(symbol, price, name, exchange, timestamp)`, 10,000 listed companies (L-0052, L-0057) | Row vs column IO | Running example for the whole column section (D-01) |
| 00:21:03 | Data warehouses have thousands of columns (L-0060) | Column stores thrive on few-of-many | Factcheck inline note on L-0060 |
| 00:22:04 | Redshift, BigQuery, Parquet (L-0063, L-0064) | Column stores in practice | "Go find your company's warehouse" (00:23:42) as an exercise |
| 00:24:23 | C-Store paper: teacher's sixth paper, master's course, "you can wrap it up in four days" (L-0069) | Depth of research | Reading box |
| 00:27:26 | 29x compression is normal (L-0076); symbols as small discrete set (00:28:16); Huffman, Snappy, LZ, RLE (00:28:52) | Homogeneous columns compress | Q&A content, move into column section |
| 00:31:21 | LinkedIn 1st/2nd/3rd-degree connections (L-0086) | Graph algorithm use case | - |
| 00:33:20 | Amazon cohort: everyone who bought an iPhone; one buys AirPods -> recommend to the cohort (L-0094) | Collaborative filtering | Factcheck inline note (Amazon uses item-to-item) |
| 00:35:17 | Teacher bought Grammarly, HDFC Bank called within moments to confirm (L-0098) | Fraud detection via graphs | Signature war story of the first half |
| 00:36:54 | 50-60 parameters per transaction; 200 ms SLA (L-0100, L-0101) | Real-time graph analysis | - |
| 00:37:31 | A VP Engineering of JP Morgan Chase explained it to the fifth cohort (L-0102) | Source of the 200 ms number | Keep the attribution, not the person's name (none given) |
| 00:39:02 | Neo4j, Neptune ("AWS copies everything"), Dgraph (teacher learned Go from it), BadgerDB, TigerGraph (L-0104..L-0108) | Graph DB landscape | Product chips |
| 00:41:25 | Relational DBs' first use cases were financial (L-0114) | Backstory explains design | - |
| 00:44:46 | Instagram messages, posts, logs, metrics ingestion; Cassandra (L-0121, L-0123) | NoSQL use case | - |
| 00:50:16 | MongoDB docs: "use ACID sparingly", cross-shard ACID via distributed transactions; same in WiredTiger docs (L-0136..L-0138) | ACID cost at scale | Q&A content |
| 00:53:04 | 4 MB blob values make relational DBs "cry their heart out" (L-0143) | Workload decides performance | **factcheck L-0143 (wrong/medium): DynamoDB caps items at 400 KB** |
| 01:12:12 | Slack API: to DM a user you first create a channel with them (L-0169) | DM = channel | Strong proof point |
| 01:14:19 | Unread count, "you last read until here", jump to that point (L-0176) | Checkpoint on membership | Show a Slack-like UI mock |
| 01:20:04 | Instagram Messenger (Cassandra) vs Slack enterprise (MySQL fine) (L-0189) | DB choice by product | - |
| 01:28:08 | Slack message grey -> black (L-0202) | Sending isn't instant | Lead the guarantees section with it |
| 01:32:58 | WhatsApp stores messages on the device (hypothetical backend copy) (L-0211) | Async persistence is safe there | Keep the "hypothetical" flag |
| 01:35:48 | 10-minute async lag on Slack: refresh shows nothing (L-0218) | Why type 2 fails for Slack | Numeric failure walk |
| 01:36:57 | Zoom chat: leave and rejoin, history gone (L-0221) | No persistence | Factcheck inline note (continuous meeting chat exists) |
| 01:46:41 | Discord chat, video streaming: persistent connections power critical features (L-0240) | Why WS scaling matters | - |
| 01:48:19 | Connection limit 4; channel C1 with A-E; WS1 full, E on WS2 (L-0242..L-0244) | Toy model | Keep the small numbers (D-05) |
| 02:05:46 | "I would not have more than 10,000 servers. I can create 10,000 connections with ease" | Raw connection count isn't the issue | - |
| 02:06:46 | 4 user connections + 3 inter-server = 7, 3 wasted (L-0276) | Mesh overhead | Make the arithmetic explicit |
| 02:15:49 | Slack orgs of 200, 500, 10,000, 20,000 employees are nothing for one WS server (L-0299) | One server per org | - |
| 02:18:02, 02:39:04 | Teacher built this exact design with Redis (L-0307, L-0370) | Credibility | Factcheck inline note: Slack itself uses a different design |
| 02:21:08 | Six concurrent TCP connections per domain (Chrome 6, Firefox 8) (L-0322) | Browser limits | **factcheck L-0322 (wrong/low): both 6** |
| 02:23:02 | 100 images: 6-6-6, then 5-5-5 with one WS, 4-4-4 with two (L-0325) | One WebSocket per product | **factcheck L-0324/L-0325 (wrong/medium): WebSockets use a separate pool** - keep the advice, fix the reason |
| 02:24:00 | Instagram live chat + heart animation over the same WebSocket (L-0328) | Multiplex real-time features | - |
| 02:29:24 | WhatsApp "checking for new messages" after reconnect (L-0346) | Catch-up refresh for lost Pub/Sub messages | - |
| 02:30:54 | Students message the teacher: "I've just implemented my load balancer... happiest day of my life" (L-0350) | Everything is implementable | Motivation box |
| 02:32:28 | Three big companies publicly expose edge-server IPs; each LB hop adds 3-5 ms; live class streaming (L-0354, L-0355) | Expose vs LB | Factcheck inline notes L-0353/L-0354 (Slack uses Envoy) |
| 02:49:28 | Student's multi-level-marketing hierarchy painful in SQL; 10 levels = 9 self-joins (L-0393, L-0394) | Graph DB fit | Move to graph section; factcheck inline on recursive CTE |
| 02:52:10 | Teacher's team: 3 engineers, 3.5 months to build real-time text chat (L-0400); deletion = 100-300 lines in this architecture (L-0402) | Design vs delivery effort | - |
| 02:56:33 | Student: Microsoft Teams shows missing, duplicate, out-of-order messages, later reshuffled (L-0408) | Ordering in practice | Explained via the three types (L-0409) |
| 02:59:12 | "I can just change my clock to 1 January 1970" | Never trust client timestamps | Keep verbatim |
| 03:04:39 | DynamoDB writes to three storage nodes before acknowledging (L-0424) | Replicated commit | Factcheck note L-0424 |
| 03:05:31 | Teacher's microservices playlist (17-18 videos) on shared vs separate DBs (L-0429) | Shared DB is fine | Link-out |
| 03:13:37 | Back from vacation: "200 unread messages" - not pushed, just there (L-0438) | Slack loads via API + checkpoint | Ties back to membership checkpoint |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:05:10 | Consistency in ACID vs consistency in CAP (L-0014..L-0016) | Correct state transitions vs read-your-latest-write visibility |
| 00:05:57 | Relational (one instance) vs non-relational (spread out) (L-0017..L-0020) | Strong consistency vs availability/horizontal scale |
| 00:09:28-00:10:20 | Document DB vs KV store (L-0031..L-0035) | Querying inside/partial updates vs opaque blob, read-modify-write |
| 00:13:26-00:15:05 | Simple key-wise access vs complex queries (L-0045, L-0049) | Partitionability ("the more complex the queries, the less you can distribute") |
| 00:16:12-00:22:57 | Row-oriented vs column-oriented (L-0066; D-01) | Read whole rows (transactional) vs few of many columns (analytics) |
| 00:26:45 | Primary DB vs warehouse (L-0073, L-0074) | Warehouse fed asynchronously, never primary |
| 00:49:02 | Graph traversal vs N self-joins (L-0132) | Depth of relationship queries |
| 00:43:48-00:46:14 | SQL vs NoSQL (L-0125) | Correctness tooling vs ingestion rate/out-of-box sharding |
| 00:51:49 | KV access pattern vs KV store (Redis in memory, DynamoDB on disk) (L-0139, L-0140) | Storage engine |
| 01:04:12 | `user_channel` vs `membership` (L-0156) | Extensibility of a noun |
| 01:06:23-01:12:12 | Polymorphic `to`/nullable pair/two tables vs DM-as-channel (L-0161, L-0165, L-0168) | No orphan rows, FK possible, no ifs and elses |
| 01:20:04 | Cassandra for Instagram Messenger vs sharded MySQL for Slack (L-0189) | Message frequency / product |
| 01:22:53-01:27:54 | Sending over HTTP vs over WebSocket (L-0193, L-0210) | Guarantee needed, not overhead |
| 01:29:19-01:38:00 | Sync persistence (Slack) vs async via Kafka (WhatsApp) vs none (Zoom) (L-0204, L-0318; D-04) | Criticality of persistence |
| 01:42:55 | Persistent connection vs database persistence (L-0231) | Terminology |
| 01:57:46-02:07:58 | TCP mesh vs real-time Pub/Sub (L-0265, L-0278) | Connection budget per server |
| 02:07:58, 02:45:51 | Redis Pub/Sub vs Kafka (L-0386..L-0388) | Push + zero persistence (real time) vs pull + history |
| 02:10:09 | Redis channels vs Slack channels (L-0286) | Terminology clash; servers subscribe |
| 02:32:14-02:34:52 | Expose edge IPs vs behind a load balancer (L-0355, L-0361) | 3-5 ms per hop vs attack surface |
| 02:38:12 | Client reports membership vs edge pulls it from backend (L-0368) | Public vs private edge |
| 02:51:13 | WhatsApp-style deletion vs Slack-style deletion (L-0397, L-0398) | Where the copy lives |
| 02:58:41 | Client timestamps vs DB insertion time (L-0412) | Trustworthy clock |
| 03:00:11 | Simple DB order vs vector clocks/CRDTs (L-0416, L-0417) | Complexity vs a rare edge case |
| 03:05:10 | Shared DB vs DB per microservice (L-0426, L-0427) | Cost/performance vs coupling (factcheck inline L-0427) |
| 03:08:38 | DM vs private two-person channel (L-0432, L-0433) | Can add members; rendering |
| 03:13:37 | WhatsApp pushes stored messages to device vs Slack loads via API + checkpoint (L-0437..L-0439) | Where the source of truth is |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:08:09, 00:12:08, 00:42:38 | "Anytime you hear a generic statement, even from me, from anyone, don't believe it" (L-0025) | Recurring "Generic claim?" callout in the database section |
| 00:02:47, 00:03:47 | Name the specific database type, not "NoSQL" (L-0008) | Style rule for the page itself |
| 00:15:05, 00:26:45, 02:33:30 | "Every single thing is a trade-off. You get something, you lose something" (L-0048) | Trade-off chips |
| 00:41:25 | "Everyone has a backstory" (L-0115) | Box per database family |
| 00:42:38 | Understand what a database gives up to be great; "see if you can mimic that on your database" (L-0117, L-0118) | - |
| 01:19:03, 01:20:04 | "Picking a database depends on the product and the requirement, not your affinity to a particular stack" (L-0186) | Decision checklist |
| 01:04:39, 01:17:09 | Name entities as nouns (L-0157, L-0181) | Schema rule card |
| 01:09:49, 01:12:54 | "Ifs and elses are the worst when it comes to databases"; generalize storage (L-0165, L-0171) | Schema rule card |
| 01:23:32 | "Just because you have it does not mean you have to use it" (L-0193) | Send-path callout |
| 01:35:48, 01:45:27, 02:48:47, 02:51:13 | "Different guarantees, different architecture"; "every system can be built in 10 different ways" (L-0219, L-0237, L-0392) | Spine of the whole Slack section |
| 01:45:27, 02:24:58, 02:40:40 | "I deliberately keep it conflicting so that it makes you think" (L-0238, L-0331) | Explain why the final diagram uses Kafka |
| 01:41:46, 02:18:02, 03:00:11, 03:01:03 | "Simple systems are harder to build... simple systems scale"; "design realistic systems" (L-0230, L-0309, L-0418) | Closing heuristics card |
| 01:57:05, 02:02:07, 02:18:02 | "Start simple"; "started with a problem, solved it with basic fundamentals, now we make it better" (L-0264, L-0308) | Structure of the scaling section |
| 02:04:42 | "Before jumping into the solution, we have not even covered the problem yet" (L-0271) | Prompt #4 framing |
| 01:38:24, 01:43:35, 02:33:44 | Never let the edge/WebSocket server talk to the database; zero credentials on internet-facing servers (L-0223, L-0232, L-0358) | Security callout (factcheck inline L-0358: least privilege) |
| 02:07:58, 02:18:02, 02:39:04 | "Real-time Pub/Sub, not Kafka" - pick the tool by the property you need (L-0279, L-0369) | - |
| 01:49:55, 02:18:02, 02:28:27, ~02:30:12, 02:52:50, 03:14:40 | "Write a hello world" (Socket.io, Redis Pub/Sub, balancer, deletion flow) (L-0246, L-0306, L-0343, L-0348, L-0403) | "Build it" exercise boxes |
| ~02:30:12, 02:30:54 | "The devil lies in the details. Implement everything" (L-0351) | - |
| 00:24:23, 00:49:56 | "Don't build a habit of getting spoon-fed. Just Google." (L-0070) | Reading links |
| 03:05:31 | "Business and product comes first, engineering is all okay" (L-0428) | Shared-DB sidebar |

---

## 4. The Slack case-study thread (proposed spine)

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 01:00:04 | "Design Slack" is too big -> only real-time text chat (L-0146, L-0147) | Scoping | Open the section with the scope cut |
| 01:00:56 | One org, users, channels, DMs, real time, scroll history (L-0148) | Requirements | Requirements card |
| 01:03:44 | Who is in which channel? | Membership table | - |
| 01:05:49-01:11:23 | DM vs channel message | Schema generalization | Five wrong turns as a click-through |
| 01:12:12 | Slack API: DM = channel created first (L-0169) | DM = channel with two people | Factcheck inline L-0169 (is_im) |
| 01:13:36 | DMs bottom half, channels top half of the sidebar | `type` field drives rendering | UI mock |
| 01:14:19 | Unread count, "last read" jump, mute, favourite (L-0175..L-0179) | Checkpoint on membership | - |
| 01:17:47-01:20:58 | Enterprise message volume (not Instagram) | Sharded relational is enough (L-0183, L-0187) | Link back to first half (SQL vs NoSQL) |
| 01:21:17-01:28:08 | Sending a message | HTTP send vs WS receive | Prompt #1 |
| 01:28:08 | Grey -> black on send | Visible persistence step | - |
| 01:30:06-01:32:19 | Enterprise must not broadcast unsaved messages (misquoting) (L-0206, L-0208) | Type 1 sync persistence | D-04 white |
| 01:35:48 | Slack users refresh channels | Why async (type 2) breaks Slack | - |
| 01:48:19-02:19:38 | One channel's members spread over several WS servers | TCP link -> mesh -> Redis Pub/Sub -> balancer | D-05, D-06 |
| 02:15:49 | An org's employees fit on one WS server | Org-affine placement | - |
| 02:21:08-02:24:00 | One WebSocket for all real-time features | Browser connection limits | Factcheck L-0324/L-0325 |
| 02:24:58-02:27:21 | Overall architecture with Kafka (deliberately the WhatsApp-like choice) (L-0335..L-0340) | Async persistence, API for scroll/muted channels | D-11; state clearly it conflicts with type 1 on purpose |
| 02:29:24 | Lost Pub/Sub messages | Periodic refresh / correction job (L-0345, L-0334) | - |
| 02:35:52-02:38:12 | Channel created / joined | Membership updates to edge servers | Q&A content |
| 02:40:11 | Private channels, bad actors | Server-side authorisation | Factcheck L-0374 |
| 02:50:15 | Deleting a message | Same architecture, different guarantee | Q&A content |
| 02:54:08 | Order of messages in a channel | DB order as source of truth | Q&A content |
| 03:07:44 | Channel type vs private/public | DM vs two-person private channel | Q&A content |
| 03:13:37 | Back from vacation: 200 unread | Checkpoint + API, not push | Closes the loop to 01:14:19 |

Second running example (first half): **`stock_ticks`** (00:16:12-00:28:52) carries row vs column storage, compression and the analytics/transactional split.

Gaps where Slack is *not* used but could carry the content (without inventing claims - label as "applied to Slack" site examples): the teacher himself links messages to Cassandra/MongoDB at 01:17:47, so the first-half "when SQL vs NoSQL" (00:43:48) can be previewed with that decision; column stores could be framed as analytics over message data (site's own example, not the teacher's); KV store as the in-memory membership map on each edge server is the teacher's own structure (01:52:08) but was not called a KV store; graph databases have no Slack tie-in in the lecture - keep the teacher's fraud/recommendation examples.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:00:02 | You should always use NoSQL databases (L-0002) | General / vendor marketing | Databases solve specific problems; learn where *not* to use them |
| 00:02:47 | "NoSQL databases scale" as a blanket claim (L-0009) | General | You can build a non-relational DB that doesn't scale; name the type |
| 00:05:10 | Consistency means one thing (L-0014) | General ("computer scientists are bad at naming") | ACID consistency ≠ CAP consistency |
| 00:07:03 | Relational databases don't scale (L-0022) | General, "a very big misconception" | Drop constraints and shard; yesterday's KV store did |
| 00:09:28 | Teams moving off relational jump straight to a KV store (L-0031, L-0032) | Implied | They usually adopt a document DB; KV is very restrictive |
| 00:11:09 | Database categories have hard boundaries (L-0037) | General | Lines are blurry (DynamoDB queries inside documents) |
| 00:12:08 | MongoDB is BASE, not ACID (L-0040) | Older claim | Now ACID compliant, at a cost (00:50:16) |
| 00:22:57 | Column stores fit any workload (L-0065) | Implied | Transactional apps read whole rows; use row stores |
| 00:26:08 | Selecting only some columns makes a row store read only those (L-0071) | S1 | Disk still reads whole rows |
| 00:30:09, 00:31:21 | If you can visualise it as a graph, use a graph DB (L-0083, L-0087) | General | Use graph DBs for graph algorithms, not to store edges |
| 00:47:44 | (partially right) A graph DB is "basically a KV store" (L-0128) | S6 | Every DB can be modelled on KV ("NAND gate") |
| 00:51:20 | Whether to put a KV store on SQL or NoSQL depends on "no relations" (L-0139) | S2 | KV is an access pattern; storage engines differ |
| 00:52:44 | A KV store on MySQL, DynamoDB or Redis all scale the same (L-0142) | S2 | Depends on value size, access, throughput, partitioning |
| 01:02:11 | Designing a schema means choosing a relational DB (L-0153) | Pre-empted by teacher | Schema = entities and attributes; DB chosen by guarantees |
| 01:04:12 | `user_channel` is a fine name for the mapping (L-0156) | "A lot of people" | Name it `membership` |
| 01:06:51-01:11:43 | DMs need their own table / nullable columns / polymorphic `to` / pub/sub topics (L-0160..L-0167) | S1, S2, S3 | DM = channel with two people |
| 01:22:15-01:27:38 | Since a WebSocket is open, send messages over it too; REST handshake overhead matters (L-0192, L-0195, L-0199) | S1, S4 | Choose by guarantee; persistence first for enterprise; HTTP send is fine |
| 01:26:32 | Users expect a message to appear instantly, so it must be instant (L-0198) | S4 | Observe the product: grey -> black |
| 01:39:48 | UDP over TLS would be a lighter way to send (L-0226) | S1 | Retries, client-side broadcast; don't micro-optimise |
| 01:42:50 | WebSockets offer persistence (L-0231) | S3 | Persistent *connection*, not database persistence |
| 01:43:35 | "Edge server" means CloudFront edge (L-0235) | Pre-empted | Here it is the WebSocket server |
| 01:55:35-01:57:24 | Cross-server delivery needs Kafka, the API server or a relay service (L-0253..L-0257) | S3 | Start simple: a TCP link |
| 02:03:05, 02:04:04 | Server failure is the mesh's overhead / make it async (L-0267, L-0270) | S6, S9 | That's fault tolerance, not overhead |
| 02:05:05 | Server discovery is the overhead (L-0272) | S12 | Different problem |
| 02:06:07 | Each inter-server message needs a 3-way handshake (L-0274) | S3 | TCP handshake happens once |
| 02:07:58 | Kafka is a fine Pub/Sub between WebSocket servers (L-0279) | Implied (S3 at 01:57:00) | Needs real-time push; Kafka would slow it |
| 02:11:34 | Users subscribe to Redis channels (L-0290) | Pre-empted | The server subscribes, not the user |
| 02:16:37 | If a WebSocket server dies, real-time chat is down (L-0302) | Pre-empted ("Oh my God, life ended. No") | Clients reconnect via the balancer |
| 02:24:00 | One WebSocket per real-time feature is fine (L-0329) | General | One per product (but see factcheck L-0324/L-0325 on the reason) |
| 02:32:21 | Exposing edge-server IPs is inherently unsafe (interview claim) (L-0354) | S5's interviewer | Fine if hardened and holding no secrets; LB adds a hop (factcheck inline L-0354) |
| 02:41:34 | A central routing service should tell servers where to send (L-0376) | S1 | Too slow; keep it in the edge server |
| 02:45:44, 02:45:57 | Redis Pub/Sub and Kafka are kind of the same / Kafka is "just asynchronous" (L-0384, L-0385) | S3 | Push + zero persistence vs pull + history |
| 02:46:48 | With async persistence a message can be *delivered* a day late (L-0389) | S3 | Delivered immediately; *stored* late |
| 02:48:40 | There is one best way to build it (L-0392) | S9 | "No best way"; pick by guarantee |
| 02:50:15 | Deletion must be synchronous with both flows; deletion is hard in this design (L-0395) | S6 | Same architecture, alter by guarantee |
| 02:54:08 | Chat needs exactly-once delivery and strict on-screen order (L-0404, L-0405) | S7 | Challenge the requirement; DB order is truth |
| 02:58:53 | Order messages by client timestamps (L-0413) | S7 | Clocks can be changed; use DB insertion time |
| 03:02:02 | Message store needs master-slave replication / workers should write to 3 DBs (L-0420, L-0423) | S5 | Sharded store; replication is the DB engine's job (factcheck inline L-0420) |
| 03:04:54 | Sharing a database between services is wrong (L-0426) | S5 | Teacher: perfectly fine (opinion; factcheck inline L-0427) |
| 03:08:15 | A two-member private channel = a DM, so `type` is redundant (L-0431) | S2 | DMs can't add members; rendering differs |
| 02:21:08, 02:23:02 | **(teacher's own)** An open WebSocket uses up one of the browser's six HTTP slots, so pages load 5 images at a time (L-0324, L-0325) | Teacher | **see factcheck L-0324, L-0325**: WebSockets use a separate pool; keep "one WebSocket per product" for other reasons |
| 02:21:08 | **(teacher's own)** Firefox allows 8 connections per domain; limit exists to stop DDoS (L-0322, L-0321) | Teacher | see factcheck L-0322 (both 6) and inline L-0321 |
| 02:06:46 | **(teacher's own)** Each connection needs its own port on the server (L-0275) | Teacher | see factcheck L-0275 (shared listening port; limits are FDs/memory) |
| 00:53:04 | **(teacher's own)** DynamoDB handles 4 MB blobs better than a relational DB (L-0143) | Teacher | see factcheck L-0143 (400 KB item cap) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Week 2 day 1 (not in corpus): KV store built on a relational DB, sharding by key range, JSON values (00:07:03, 00:08:33, 00:51:20).
- Lecture 1: WebSockets as persistent bidirectional TCP, sticky load balancers for WS, Kafka topics/consumers/commit, message queue vs stream, sharding, read replicas (used without re-teaching at 01:21:17, 01:30:06, 02:32:28, 03:02:09).
- ACID, CAP theorem (named, only "consistency" disambiguated, 00:05:10), BASE (00:12:08).
- Foreign keys, self-joins, IN operator, aggregations (00:13:26, 00:40:18, 00:49:02).
- Graph data structures / adjacency lists from a DSA course (00:30:45); NAND gate (00:47:46).
- TCP connections and 3-way handshake, ports (01:27:38, 02:06:12); UDP, TLS (01:39:48); DNS (02:14:57).
- Socket.io / Node.js WebSocket servers (01:49:55, 02:32:05); Redis as a product; React state (02:55:56).
- Compression codecs (Huffman, Snappy, LZ, RLE) - named, "read about it" (00:28:52).
- Distributed transactions (00:50:16), vector clocks and CRDTs (03:00:11) - named, not taught.

### Concept graph (A -> B means B builds on A)
```
Generic-claim skepticism (00:08:09)
  -> "NoSQL" is not one thing -> name the type (00:02:47)
  -> two consistencies (ACID vs CAP) (00:05:10)
       -> non-relational = give up (CAP) consistency for availability + horizontal scale (00:05:57)
  -> relational can scale too (yesterday's sharded KV store) (00:07:03)

Access pattern restricts -> partitionability (00:13:26)
  -> document DB (query inside, partial updates) (00:08:33)
  -> KV store (key-wise only -> thousands of partitions, massive parallelism) (00:12:46)
       -> KV as access pattern vs storage engine (Redis RAM, DynamoDB disk) (00:51:49)
       -> every DB can be modelled on KV ("NAND gate") (00:47:46)
  -> storage layout: row vs column (00:16:12)
       -> analytics reads few of many columns -> column store wins (00:21:03)
       -> homogeneous columns compress (29x) (00:27:26)
       -> insertion heavy -> never primary, fed async (00:26:45)
  -> graph DB = adjacency list + graph algorithms (00:30:45)
       -> recommendations (collaborative filtering), fraud (new edge, 200 ms) (00:32:56, 00:35:17)
       -> vs relational: N self-joins (00:49:02)
FK constraints = correctness (00:40:18) -> backstory: financial use (00:41:25)
  -> drop FKs -> partition like NoSQL (00:41:54)
  -> SQL when correctness is the product; NoSQL for gigantic ingestion (00:43:48)
       -> Slack messages: sharded relational is enough; Instagram -> Cassandra (01:17:47)

Slack scope + requirements (01:00:56)
  -> schema: users, channels, membership (noun naming) (01:04:12)
       -> DM = channel with 2 people + type (01:12:12) -> rendering; DM vs private 2-person channel (03:08:33)
       -> membership checkpoint -> unread count / last read (01:14:19) -> Slack loads unread via API (03:13:37)
  -> send vs receive split (lec01 WebSockets) (01:22:53)
       -> guarantees: sync persistence (Slack) / async via Kafka (WhatsApp; needs lec01 Kafka) / none (Zoom) (01:29:19)
            -> no DB from edge server (load, credentials, blast radius) (01:38:24)
            -> deletion, ordering, duplicates explained by the chosen type (02:50:15, 02:57:04)
            -> async: delivered now, stored later (02:47:14)
  -> each WS server: connection limit + in-memory membership (01:48:19, 01:52:08)
       -> cross-server delivery: TCP link (01:57:46) -> full mesh -> wastes connection budget (02:06:46)
            -> real-time Pub/Sub (push, zero persistence) (02:07:58)
                 -> Redis channel per Slack channel, servers subscribe (02:10:56)
                 -> cluster it + co-locate org users (02:14:20)
                 -> lost messages -> periodic refresh / correction job (02:29:24)
                 -> vs Kafka (pull, history) (02:46:03)
            -> balancer service tells clients where to connect (02:14:57) -> failover by reconnect (02:16:37)
  -> client side: browser connection limit -> one WebSocket per product (02:21:08) [factcheck L-0324]
  -> overall architecture (02:24:58)
       -> edge exposure vs LB, zero credentials, DDoS (02:32:14)
       -> membership trust -> server-side check for private channels (02:40:40)
       -> DB durability: replication factor 3, ack after replicas (03:02:40)
       -> shared DB between workers and API servers (03:05:10)
```

Cross-links worth surfacing on the site:
- **Restrict access -> gain partitioning** recurs: KV stores (00:13:26), drop FKs (00:41:54), shard messages by channel (02:19:38).
- **Persistence is a guarantee you choose**: column stores fed async (00:26:45), graph DBs fed async (00:48:30), WhatsApp async via Kafka (01:34:06), Redis Pub/Sub keeps nothing (02:08:36), Zoom keeps nothing (01:36:57).
- **Push vs pull**: Redis pushes, Kafka consumers pull (02:46:03); Slack unread is pulled via API, WhatsApp pushes to the device (03:13:37).
- **Generic claims expire**: MongoDB ACID (00:12:08, 00:50:16), "NoSQL scales", "edge IPs unsafe" (02:32:28), "always put WS behind LB" (02:34:52).
- **Membership** appears three times: schema table (01:04:12), edge-server cache (01:52:08), Redis subscriptions (02:11:34).

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:07:03 | "Yesterday, we built distributed key-value store, sharding... one database holds keys from A to M, second N to Z" (week 2 day 1) |
| 00:08:33 | "Very similar to what we discussed yesterday... storing my value as a JSON and I want to query within that" |
| 00:51:20 | S2: "yesterday we tried to design the KV store on relational databases" |
| 00:12:08 | MongoDB now ACID - echoes lecture 1's "databases converging" (lec01 03:13:31) |
| 00:37:31 | JP Morgan Chase VP spoke to "this cohort, fifth cohort" (earlier session, not in corpus) |
| 01:00:04 | The Slack session itself is the one lecture 1 deferred ("Scaling WebSockets, Slack real-time - next week Sunday", lec01 02:01:30; real-time claps/SSE alternative deferred to "Slack session", lec01 02:13:01) |
| 01:22:15 | WebSockets used without re-teaching (introduced in lecture 1 at lec01 01:59:25) |
| 01:30:06 | Kafka as broker, consumers/workers, commit (lecture 1, lec01 01:21:28-01:30:58), used again at 03:02:40 |
| 01:55:35 | S3: "through the API server... as in the last time" |
| 02:32:28 | Sticky connections behind a load balancer (lecture 1 Q&A, lec01 02:46:02) |
| 03:02:09 | Master-slave replication/replicas (lecture 1 scaling, lec01 00:49:26) raised by S5 |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:00:02 | Going deeper into each database type | "[fourth?] week, fifth week, sixth week" |
| 00:32:56 | Recommendations with graph DBs - "I'll talk about recommendations"; also the teacher's YouTube video | Same lecture (00:33:20) + external video |
| 00:39:47, 00:53:41 | "We will use each one of them in the coming weeks" | Later weeks |
| 01:45:27 | Kafka-based final diagram | Same lecture (02:24:58) |
| 02:30:54, 03:14:40 | Distributed systems; distributed ID generators; load balancer implementation + code walkthrough | Next week (Saturday / Sunday) |
| 02:48:14 | Live streaming (Hotstar) | Week 6 or 7 |
| 03:04:16 | Distributed database internals (replicated writes) | "going very deep" - not scheduled |
| 03:05:31 | Shared vs separate DBs per microservice | Teacher's YouTube microservices playlist |
| 03:06:29 | End-to-end encryption / Signal protocol | Not covered (teacher declined) |
| 03:12:13 | WebTransport | Teacher will look into it and share |

Site handling: keep these as "coming in a later lesson" / "outside this course" chips; the declined E2E question and the unknown WebTransport are honest scope boundaries, not gaps to fill from outside.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers are redistributed into the topic they belong to (mapping below the options).

### Option A - "Pick the database, then build Slack's chat" two-part page (RECOMMENDED)
Keep the lecture's two halves but make each reader-first:
1. **Setup**: two promises from the agenda (database tour; one design that becomes Slack, WhatsApp or Zoom) + "never trust a generic claim" card.
2. **Databases by access pattern** (not by "NoSQL"): open with prompt "why does NoSQL scale - could MySQL?" (P3) -> two consistencies -> document DB -> KV store (with the NAND-gate Q&A, Redis vs DynamoDB engines, KV-as-access-pattern) -> column store on `stock_ticks` (prompt #7, compression 29x, never primary, pricing) -> graph DB (prompt #8, Hulk, recommendations, fraud war story, self-joins, MLM-hierarchy Q&A, not transactional) -> FK/backstory -> SQL vs NoSQL decision card (MongoDB ACID cost Q&A, 4 MB blob note).
3. **Bridge**: "Which database for Slack messages?" (01:17:47) - applies the decision card immediately.
4. **Slack schema**: prompt #5 + #6 -> DM = channel -> membership checkpoint (+ channel-type Q&A, vacation-unread Q&A).
5. **Sending a message**: prompt #1 -> three persistence types (prompt #2, D-04) -> no DB on edge -> UDP Q&A -> deletion, ordering/timestamps, async-delay Q&A as "apply the types" exercises (prompt #9).
6. **Scaling WebSocket servers**: hotel-room hook -> prompt #3 -> TCP -> prompt #4 mesh -> real-time Pub/Sub (Redis vs Kafka Q&A) -> Redis channels -> balancer + failover -> lost-message refresh.
7. **Overall architecture + client side**: final diagram (explain the deliberate Kafka choice) -> one WebSocket per product (with factcheck fix) -> edge security (prompt #10: exposure, credentials, bad actors) -> DB durability, shared DB.
8. **Recap**: heuristics card + "build it" exercises (Socket.io, Redis Pub/Sub, balancer, deletion) + next-lesson chips.

Pros: preserves the teacher's order and both running examples; the bridge (step 3) turns the first half from a detached survey into the tool kit the second half uses; each design step opens with the teacher's own question. Cons: long page; the first half has no case study, so it needs strong visuals (D-01) to hold attention; the recommended reading order moves several first-half Q&A items into the middle of sections.

### Option B - "Slack first, databases on demand"
Start with the Slack design (steps 4-7 of Option A); introduce each database family where the design needs a decision: sharded relational vs Cassandra for messages (SQL vs NoSQL, FKs, document/KV), Redis as an in-memory KV/Pub/Sub, Kafka; put column stores and graph DBs in "beyond chat" boxes at the end (analytics on messages; fraud/recommendations).
Pros: one narrative from the first line; strong motivation for every concept. Cons: column and graph databases have no real hook in the Slack design and become appendices, against the teacher's emphasis (C-Store, fraud story); invents connections the teacher didn't make; breaks provenance order.

### Option C - "Guarantee ladder"
Organize everything by the guarantee being traded: (1) correctness vs scale (FKs, ACID vs CAP, SQL vs NoSQL, MongoDB ACID, replication factor), (2) query power vs partitionability (document, KV, column, graph), (3) persistence vs latency (three message types, Redis vs Kafka, deletion, ordering), (4) simplicity vs theoretical perfection (TCP -> Pub/Sub, vector clocks, UDP, routing service, shared DB, edge exposure).
Pros: surfaces the teacher's real meta-lesson ("you get some, you lose some"; "different guarantees, different architecture"); excellent for revision. Cons: fragments the Slack design across sections; weak for a first read; harder to match to the video.

**Recommendation**: Option A for the main page, with Option C's four trade-offs as small recurring "Trade-off" chips linking similar decisions across both halves, and Option B's idea reduced to the single bridge step (01:17:47) rather than a restructure.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| SELECT with named columns still reads all columns (00:26:00) | Column store - row vs column IO |
| Insertion heavy -> never primary, async ingest (00:26:38) | Column store - "never your primary copy" |
| Space comparison, 29x compression (00:27:20) | Column store - compression |
| How compression works: discrete symbols, Huffman/Snappy/LZ, RLE (00:28:12) | Column store - compression |
| Pricing: reserved capacity (00:29:30, 00:30:01) | Column store - cost note (factcheck note L-0081) |
| Graph storage internals, KV = NAND gate (00:47:11, 00:47:44) | KV store sidebar + graph DB definition |
| Graph DB not transactional, fed async (00:48:17, 00:48:36) | Graph DB - where it sits (factcheck note L-0130) |
| Why graph vs relational: N self-joins (00:48:44, 00:49:02) | Graph DB - prompt P5 (factcheck note L-0132) |
| Resources: just Google (00:49:45) | Graph DB - reading links |
| MongoDB ACID, "use sparingly", distributed transactions (00:50:04) | SQL vs NoSQL decision card |
| KV on SQL vs NoSQL; KV = access pattern; Redis vs DynamoDB engines (00:51:20) | KV store |
| How to decide for a KV use case (00:52:14) | KV store / decision card |
| Do they all scale the same? 4 MB blobs (00:52:44) | Decision card (factcheck note L-0143) |
| UDP over TLS for sending (01:39:48, 01:41:28) | Sending a message - "why not UDP?" box |
| Do WebSockets offer persistence? (01:42:50) | Sending a message - terminology + no DB on edge |
| Server discovery as overhead (02:05:05) | Scaling WS - mesh prompt (wrong-answer list) |
| What edge servers are; exposing their IPs (02:31:58, 02:32:10, 02:32:21) | Edge security section |
| Security threats of exposed IPs; zero credentials; DDoS (02:33:30) | Edge security section (factcheck notes L-0360, L-0383) |
| Channel changes reaching edge servers; creating channel 3 (02:35:52, 02:36:22) | Redis channels / membership updates |
| Why Redis; any real-time Pub/Sub (02:38:53) | Real-time Pub/Sub |
| No expiry, no persistence (02:39:47) | Real-time Pub/Sub definition |
| Bad actors, private channels (02:40:11) | Edge security - prompt #10 (factcheck note L-0374) |
| Central routing service; cache it (02:41:34, 02:41:54) | Scaling WS - "why not a routing service?" box |
| Persistence guaranteed, notification not (02:42:40) | Overall architecture - lost messages |
| Subscribing at scale: Redis cluster + balancer co-location (02:43:14) | Balancer section (factcheck inline L-0380) |
| Public edge IP again: LB adds 3-5 ms (02:44:11) | Edge security section |
| Redis Pub/Sub vs Kafka (02:45:44, 02:45:57) | Real-time Pub/Sub - comparison table |
| Async persistence: delivered now, stored a day later (02:46:48) | Three persistence types - type 2 |
| Live streaming out of scope (02:47:58) | Forward chip |
| "Best way?" - no best way, buffet (02:48:40) | Three persistence types - closing line |
| Multi-level marketing hierarchy -> graph DB (02:49:28) | Graph DB - real-world example (factcheck inline L-0393) |
| Message deletion WhatsApp vs Slack (02:50:15) | Three types - "apply it" exercise |
| Why WhatsApp took long; 3.5 months, 200-300 lines (02:52:02) | Three types - effort sidebar |
| Ordering, exactly-once; two front-end cases (02:54:08, 02:54:33) | Three types - prompt #9 |
| Teams duplicates/out-of-order explained (02:56:33) | Three types - prompt #9 |
| Client vs DB timestamps; vector clocks (02:58:21, 02:58:53) | Three types - prompt #9 (factcheck inline L-0412) |
| DB node failure, replication factor 3, ack after replicas (03:02:02) | Overall architecture - durability box (factcheck notes L-0422, L-0424) |
| Sharing a DB between workers and API servers (03:04:54) | Overall architecture - shared DB box |
| End-to-end encryption, public keys (03:06:29) | Forward chip ("not covered") |
| Channel type vs private/public (03:07:44) | Schema - DM = channel |
| Six-connection limit across tabs / sub-domains (03:09:51) | Client side - one WebSocket per product (factcheck inline L-0434) |
| WebTransport (03:11:59, 03:12:04) | Forward chip |
| Slack vs WhatsApp loading data on reconnect (03:12:34) | Schema - checkpoint (closing loop) |

### Things a reader-first version should fix (not drop)
- **Factcheck "wrong" items to carry as sourced notes, keeping the teacher's point**: browser six-connection demo (L-0324, L-0325, L-0322) - keep "one WebSocket per product", fix the reason; per-connection ports (L-0275); 4 MB blobs in DynamoDB (L-0143). Medium notes on graph DBs (L-0130, L-0132, L-0134), pricing (L-0081), security (L-0360, L-0374, L-0383) and durability (L-0422, L-0424).
- **The deliberate conflict** between "Slack = synchronous persistence" (01:30:06) and the Kafka-based final diagram (02:24:58) must be stated up front, or readers will think the page contradicts itself. Also note factcheck inline L-0209 (Slack really sends over HTTP; persist-then-broadcast remains the teacher's hypothesis) and L-0307/L-0353 (Slack's real fan-out uses Envoy-fronted gateway servers).
- **Board-only items** shown in the recap but not spoken (L-0313..L-0317 basic REST flow and shard-by-channel_id, L-0330 "any service talks to users through edge servers", L-0332..L-0334 "messages always persisted", correction job, replay buffer; D-07, D-09, D-11) - fold into the overall-architecture section and mark as from the teacher's notes.
- **Hypotheticals flagged by the teacher** stay flagged: WhatsApp backend storage ("WhatsApp doesn't do it"), "my hypothesis, I may be wrong" for Slack (01:29:19).
- **Diarization uncertainties** in the schema brainstorm (01:05:19-01:11:43) and mesh discussion (02:01:32-02:05:40): several turns may belong to the other speaker; students' proposals are attributed by label only. See `lectures/lec02/transcript/review_flags.md`. Student names spoken in the audio must not appear on the site.
- **Teacher declined/unsure answers** (E2E encryption 03:07:05, WebTransport 03:12:13) - keep as honest "outside this lesson" notes; don't fill them in from outside sources on the main page.
- Admin segments (break, one-on-one request, recording worries) are not content; the "implement a hello world" exhortations become exercise boxes.
- The "interviews are stupid" remark (02:32:28) should be reframed as the trade-off it is (factcheck inline L-0354), not dropped.
