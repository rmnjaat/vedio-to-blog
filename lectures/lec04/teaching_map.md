# Teaching Map - Lecture 04 (Week 1, Day 1 of cohort 16): Online/offline indicator, Redis vs DynamoDB, connection pooling, database (soft delete, column types, date time), caching

Source: `lectures/lec04/transcript/transcript.md` (03:06:44). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **the first session of a new cohort** ("This is 16th cohort", 00:00:02; "This is day one", 00:13:05). Nothing earlier in the course is assumed except the pre-reads (Redis and DynamoDB were in them, 00:45:42). The teacher announces it as a no-brainstorming foundation week (00:10:51) and repeatedly says "we'll not worry about scale" (00:13:05, 00:14:13). It is the "day 1" that the Lecture 1 map (a different cohort's day 2) refers to: connection pooling, "cache = anything that saves an expensive computation/IO", the MySQL datetime docs pointer, the first Medium properties (database, caching). Of the six core components only database and caching are taught here; the other four are promised for "tomorrow" (01:40:25, 02:19:52).

Student labels: `S2`-`S8`, `S14`, `S15` follow the transcript's `Student N` labels. The transcript header warns each label mixes several voices, so a number is a voice label, not always one person. Students the transcript names but does not number get their own ids: `S16` (01:23:06, 02:30:05), `S17` (01:24:48, 02:46:47), `S18` (02:22:21), `S19` (02:36:58), `S20` (03:03:01). `S?` = unidentified.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:02 | 00:13:05 | 13 | Admin: cohort welcome, course rules (participate live, note new terms, revise, pre-reads, 1:1s, implement every core, feedback form, Discord), session flow, YouTube/Redis course/essays | - | "Coming to this session, the agenda for today..." |
| 1 | 00:13:05 | 00:15:22 | 2.5 | Agenda (online/offline indicator, then databases + caching on a Medium-like app) + **the brief**: green/grey dots (D-01) | **Product brief** from a familiar UI (Facebook, Twitter dots); explicit "day one, no scale" disclaimer | "When you're designing any system... two approaches" |
| 2 | 00:15:22 | 00:22:29 | 7 | **How to approach any system**: spiral vs incremental (D-02); core property and access pattern before tech; intuition over memorised designs | **Meta-method first**, from the teacher's 10-11 years; tech-affinity anti-pattern ("I'll use Redis because I love Redis") | "Now, if I start on online offline indicator..." |
| 3 | 00:22:29 | 00:45:42 | 23 | **Online/offline indicator, designed step by step** | **Spiral approach applied live**: pick the DB as the core, then add parts only as each question forces them | Final TTL design -> "given that we have two choices... which one would you choose?" |
| 3a | 00:22:29 | 00:26:07 | 3.5 | Storage int -> bool, key-value access pattern (D-03); API server; single vs **batch endpoint** (D-04) | "What do I need to render this?"; UI with four users -> four calls | "Reading is done. What about updating?" |
| 3b | 00:26:07 | 00:32:07 | 6 | Pull impossible (HTTP stateless) -> **push heartbeats** (D-05, D-06); why periodic not login/logout; "long enough" = 30 s business logic; schema becomes `pulse(user_id, last_hb)` + UPDATE query (D-07) | **Analogy** (heart beating) + **failure case** (battery dies, device unplugged) | "So now our get needs to change" |
| 3c | 00:32:07 | 00:33:50 | 1.5 | getStatus rules: no entry -> offline; last_hb < now-30 s -> offline; else online | Business logic spelled as if/else | "Now let's estimate the scale" |
| 3d | 00:33:50 | 00:38:47 | 5 | **Storage estimate**: 4 B + 4 B = 8 B/user -> 8 GB for 1B users (D-08); "storage is not the problem"; asides on asking critical questions and documenting every option | **Numbers first** ("seventh standard" maths), phone-storage comparison | "Can we optimize this 8 GB... hypothetically?" |
| 3e | 00:38:47 | 00:43:43 | 5 | **Absence = offline**; entries expire after 30 s; who deletes? **cron job** -> rejected as another moving part (uptime, telemetry) | Optimisation as a thought exercise; naive fix then implementation-cost critique ("never just draw boxes") | "If not cron job, ask this question: can you offload this to the database?" |
| 3f | 00:43:43 | 00:45:42 | 2 | **Offload expiry to the DB**: key-value + TTL; Redis and DynamoDB; SET with TTL 30 s on every heartbeat | "Don't reinvent the wheel" | Brainstorm prompt Redis vs DynamoDB |
| 4 | 00:45:42 | 01:04:14 | 18.5 | **Redis vs DynamoDB brainstorm** (D-09 tick table) | **Open problem to class** with raised hands; each student answer becomes a table row | "Let's see how our DB is doing" |
| 4a | 00:45:42 | 00:48:40 | 3 | Persistence and managed service (S4); team size (S2) | Socratic push: "Why would you need persistence for this?" | S2 raises vendor lock-in |
| 4b | 00:48:40 | 00:55:22 | 6.5 | **Vendor lock-in**: definition; S2's reasons (cost, infra move, security, GCP shutting services); teacher's **competition** reason (Amazon Foods vs Swiggy/Zomato, Walmart on GCP, Netflix counter-example) | Chain of "why?" questions to a student, then teacher's war-story layer | "Yes, Rahul?" |
| 4c | 00:55:22 | 00:59:38 | 4 | Redis persistence (AOF/RDB), managed Redis on every cloud, data types -> **future extensibility** (Bloom filters, HyperLogLog, geo); DynamoDB Streams + Lambda; "databases are converging" | Student proposals refined ("Even Redis has numbers") | Next student: time sensitivity |
| 4d | 00:59:38 | 01:04:14 | 4.5 | **Time sensitivity**: not "because in-memory" but persistent connections; Redis key-expiry hooks; recap of the three missed factors (future extensions, vendor lock-in, managed); "real online indicators use WebSockets" | Correction of a student's reason | "Let's see how our DB is doing" |
| 5 | 01:04:14 | 01:18:52 | 14.5 | **Write load and connection pooling** | **Numbers first** (10 s heartbeat x 1M active = 6M req/min, D-10) -> "storage is not a problem, computation is" | "Any questions on this, specifically connection pool" |
| 5a | 01:04:14 | 01:08:20 | 4 | Each heartbeat = one DB call; new TCP connection = 3-way handshake + 2-way teardown = "five network trips"; micro updates so setup dominates | **The line nobody thinks about** on the diagram | "So now what is connection pooling?" |
| 5b | 01:08:20 | 01:12:20 | 4 | Pool: 3 connections opened at startup, pick one, mark unavailable, reuse (D-11); two benefits: faster calls **and** less DB CPU/network | Mechanism walk-through + "why would DB load drop if queries are the same?" | "How many connections should you create?" |
| 5c | 01:12:20 | 01:15:23 | 3 | Min/max; 4th request waits or stretches the pool; max per server (3/100); DB connection limit across hundreds of servers; idle TTL (10 min) | Scenario stepping (3 busy, 4th arrives; 101st arrives) | "Where does this connection pool run?" |
| 5d | 01:15:23 | 01:17:40 | 2.5 | Pool = library in the API server, blocking queue, not a service; gain is large only for micro updates; "always a great option" | **Misconception first** ("everyone thinks everything is a service") | "Whatever we discussed... control C control V" |
| 5e | 01:17:40 | 01:18:52 | 1 | Same heartbeat design = **failure detection** in a distributed system (own AWS, own load balancer) | **Pattern transfer** | Q&A |
| 6 | 01:18:52 | 01:33:52 | 15 | Q&A on pooling and online/offline: DB connection limit when scaling servers, DynamoDB vs self-managed Redis for autoscaling, expired pool connections, "always 100?", connections as the scaling factor, how many connections a DB can hold, **four resources (memory, CPU, disk, network)**, pool min/max formula, festival spike | Student-driven; teacher adds green "micro reads/updates -> n/w bottleneck" to D-10 | Break |
| 7 | 01:33:52 | 01:39:55 | 6 | Admin: break (silent gap 01:34:39-01:39:54) | - | - |
| 8 | 01:39:55 | 01:40:56 | 1 | Six core components: database, caching, scaling, delegation, concurrency, communication (board S64) | Roadmap; explains he moved online/offline first because the theory "became too theoretical" | "We'll understand database" |
| 9 | 01:40:56 | 02:03:00 | 22 | **Database, on a multi-user blogging app (Medium-like)** | **Schema first** (users, blogs; D-12) then "importance of each field" | "Any questions on this database?" |
| 9a | 01:42:32 | 01:48:00 | 5.5 | **Soft vs hard delete**: recoverability (Google Drive trash), archival (S3, ML data), **audit (police station war story)**, B+ tree rebalancing | Provocation: "soft deletes are extremely important for performance. You'll say, how?" | "Next thing... bio and body" |
| 9b | 01:48:00 | 01:52:34 | 4.5 | **Column types**: VARCHAR inline vs LONGTEXT by reference (D-13); fixed-width rows like C structs; two disk reads; 5,000-char comment; list pages don't need the body | Contrast of two columns in the same schema | "The next one is an interesting one" |
| 9c | 01:52:34 | 01:57:06 | 4.5 | **Date time 1: native type**; how it is serialised on disk; string-parse cost for "last 7 days" query | Hypothetical worst case (stored as string) | "Other way, let's say this was slow" |
| 9d | 01:57:06 | 02:03:00 | 6 | **Date time 2: epoch integer** (20 B -> 4 B, fast, unreadable); **3: custom YYYYMMDD integer** (Redbus 2016 story); "be creative" (D-14) | **Count the bytes live** (1..20); war story via a friend | Questions |
| 10 | 02:03:00 | 02:11:51 | 9 | DB Q&A: custom format gives no perf gain over epoch (teacher concedes), time zones/UTC, Redbus use case, soft delete rebalancing only helps if batched, epoch range -> MySQL datetime docs | Student-driven, two real objections | "We'll move to caching" |
| 11 | 02:11:51 | 02:20:16 | 8.5 | **Caching**: definition (anything that saves heavy computation/IO), memoization, not only RAM (disk, network), glorified hash tables; remote shared cache in the blog architecture (D-15), cache-aside flow; **homework**: find every place to cache (Goldman Sachs story) | **Misconception first** ("people misunderstand caching a lot") | "Any questions on this?" |
| 12 | 02:20:16 | 02:39:53 | 19.5 | Q&A on DB + caching: pre-computed results in a DB table, local storage (deferred), soft-delete growth, **GDPR right to be forgotten** (Atlassian outage, snapshots, teacher built GDPR), **cache compression** (reasoned live), cron job "downtime" interview question, Redis vs DB table first principles, managed Redis cost, staggered deletion, uniqueness index | Student-driven | "Any other question across the entire session?" |
| 13 | 02:39:53 | 03:06:12 | 26 | **Open Q&A**: retention policy in DB, worst-case disk read, vendor lock-in when you are Google + talent argument, availability assumption, last seen, Redis TTL internals (deferred), indexes on disk, soft delete vs archival, Redis as primary DB, autoscaling, avoiding DB-specific features (Debezium), pool when scaling DB, downsides of pooling, 30k connections (Google it), TTL compute cost, building trade-off intuition, when to stop overthinking, HTTP stateless/keep-alive, HTTP vs TCP | Student-driven | Wrap-up |
| 14 | 03:06:12 | 03:06:43 | 0.5 | Admin: recording by tonight; "remember that fun exercise" (caching places) | - | End |

Time budget: admin 19.5 min; approach 7; online/offline design 23; Redis vs DynamoDB brainstorm 18.5; connection pooling 14.5 (+15 Q&A); database 22 (+9 Q&A); caching 8.5; Q&A blocks 19.5 + 26. About **37% of the lecture is discussion or Q&A** (brainstorm + four Q&A blocks), and much of it carries real content (GDPR, compression, pool downsides, pool sizing formula, four resources). It must be folded into the topic sections, not left as an appendix.

**Introduction patterns observed** (reusable templates):
- **Brief -> core -> forced questions** (online/offline): start from the product brief, pick the core (DB), then let each question ("who updates it?", "what if the device dies?", "how long is long enough?", "who deletes?") add exactly one part. The design grows only when a question forces it.
- **Numbers decide the bottleneck**: storage estimate (8 GB, "peanuts") rules storage out; request estimate (6M/min) rules computation in. The same two-step check is reused verbatim at 01:05:19.
- **Naive fix -> implementation cost -> offload**: cron job -> "you have to manage uptime, telemetry" -> DB-native TTL.
- **Brainstorm table** (Redis vs DynamoDB): each student answer becomes a ticked row; the teacher pushes each with "why?" and adds the one reason students missed (competition).
- **Field-by-field interrogation** (database): draw an ordinary schema, then ask why each column is the way it is (is_deleted, body vs bio, published_at).
- **Misconception first** for connection pool ("not a service") and caching ("not just RAM").
- **War stories as proof of "it's real"**: police station, GDPR build, Redbus, Goldman Sachs, Walmart/Netflix.

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:22:29 | "If I'd want to render this online offline stuff, what do I need?" (rhetorical) | - | Stores int + bool; "it's just access pattern, not kind of database" | Key-value: get many, get one, update one (L-0035, D-03) |
| P2 | 00:24:35 | Single-user endpoint: "to render this for four users, you will have to make four API calls" (rhetorical) | - | "First critical design decision" | Batch endpoint `/data/users?ids=...` (L-0038, D-04) |
| P3 | 00:26:07 | "Someone has to update this information... So now how do we go about this?" (rhetorical) | - | Pull impossible: HTTP stateless, server cannot call the client | Client pushes periodic heartbeats (L-0041, L-0042, D-05) |
| P4 | 00:27:33 | "Do you need [the heartbeat] periodically or just one time heartbeat call is fine? What if I send it once when I'm online and once when I log out?" | (posed as the common answer) | "The machine crashed... ran out of battery... someone just plugs off the device" | Must be periodic; offline cannot be announced (L-0045, L-0046) |
| P5 | 00:29:43 | "How long is long enough for me?" | - | "Subjective" (board), depends on the product | Business logic; 30 s here (L-0048, D-06) |
| P6 | 00:36:53 | "Can we optimize this 8 GB to something even smaller?" (hypothetically) | - | "Every single step... ask those critical questions" | Absence of entry = offline (L-0061) |
| P7 | 00:40:53 | "And so who will do this delete?" | (voiced as "you may think: a cron job") | Works for a startup, but "another moving part"; "never just draw boxes" | Offload to a DB with TTL (L-0063, L-0066, L-0068) |
| P8 | 00:45:42 | "Both give us key-value, both give us expiration. Which one would you choose for the system and why?" | S4: DynamoDB for persistence + managed; S2: team size, Redis avoids vendor lock-in; S3: Redis persistence, managed Redis, data types; S?: Redis for time sensitivity | "Why would you need persistence for this? ... your data is anyway deleted" (00:46:53); "Even Redis has numbers" (00:57:39); "Is it only because it's in memory?" (00:59:59) | Ticked table (D-09); the missed factors are future extensibility, vendor lock-in, managed vs self-managed (L-0100) |
| P9 | 00:48:40 | "Why is vendor lock-in such a big issue?" -> "Why would you switch a cloud provider?" -> "Anything else that you can think of apart from cost?" | S2: pricing, infra moving, better deals, security incidents (Azure), GCP discontinuing services | Adds **competition**: Amazon Foods vs Swiggy/Zomato, Walmart on GCP, Netflix stays on AWS | Lock-in matters for big customers and competitors (L-0077-L-0084) |
| P10 | 00:59:59 | "But why would it be faster? Is it only because it's in memory?" | S?: in-memory and better performance | "Not really": persistent connections vs DynamoDB's stateless calls; Redis key-expiry hooks | Time sensitivity row (L-0094, L-0097; see factcheck L-0094) |
| P11 | 01:04:14 | "What's the challenge when you have a billion users, what else can be challenging?" | - | 10 s heartbeat, 1M active | 6M updates/min; computation not storage (L-0103-L-0105, D-10) |
| P12 | 01:07:27 | "So where is the time going?" | - | Pointed one-row update; DB does the bare minimum | TCP setup/teardown, five trips (L-0109, L-0111) |
| P13 | 01:10:42 | "But why load on the database would be reduced? The number of queries are same." | - | Handshake packets cost DB CPU, network, OS buffers | Pooling saves DB CPU + network (L-0115-L-0117) |
| P14 | 01:12:20 | "How many connections should you create?" / 4th request: "There are no available connections... What do I do?" | - | Wait, or stretch; unbounded stretch is a problem | Min/max, max per server, idle TTL (L-0118-L-0125) |
| P15 | 01:15:23 | "Now, where does this connection pool run?" | - | "For some reason, nowadays, everyone thinks everything is a service. No." | Library + blocking queue in the API server (L-0126-L-0128) |
| P16 | 01:42:32 | "Why do people do soft deletes in database when database gives you delete query?" | - | "Soft deletes are extremely important to ensure the performance of your database. You'll say, how?" | Recoverability, archival, audit + B+ tree claim (L-0175-L-0186, D-12) |
| P17 | 01:51:27 | (reader's voice) "I'm making two disk reads, but here just one. Why can't I always do this?" | - | List pages read title/excerpt, not body | Keep rows minimal; large text as LONGTEXT (L-0198, L-0199, D-13) |
| P18 | 01:52:34 | "How are you storing date time? There are multiple ways." | - | Three approaches, each with a trade-off | Native / epoch int / custom int (L-0200-L-0220, D-14) |
| P19 | 02:03:20 | (student) "What is the benefit of the custom format? ... There is no performance improvement [over epoch]." | S3 | "They wanted readability... Correct, that's all" | Custom format buys readability, not speed over epoch (L-0221, L-0222) |
| P20 | 02:06:20 | (student) Soft delete rebalancing benefit vanishes if you hard delete later? | S5 | "Clubbing all the tree rebalancing into one" | Batch/staggered hard deletes (L-0228-L-0230; see factcheck L-0185) |
| P21 | 02:08:39 | (student) Epoch will max out int; isn't epoch the worst format? | S4 | "Your point is very true"; negative dates; read MySQL docs | Trade-off; MySQL serialised datetime (L-0231-L-0236) |
| P22 | 02:18:41 | (homework) "Find possible places where you can use as a cache with an example... where you can cache, what you can cache, and what problem it solves" | (deferred to next day) | Hints: centralized cache, CDN, load balancer | Next session's first 30 min (L-0255, L-0256) |
| P23 | 02:20:22 | (student) "Why can't we put the expensive computation [result] in the DB itself?" | S6 | "That is a possible place... Why not this? Why just this?" | A DB table can be a cache (L-0260, L-0261) |
| P24 | 02:26:04 | (student) "Do we implement compression on the caching side?" | S3 | Trade-off first; then reasons live: compress on the client to save network | "Caches should never offer you compression out of the box" (L-0274-L-0280) |
| P25 | 02:30:30 | (reverse, to S16) "Why would there be a downtime when you delete a soft deleted entry?" | S16: an interviewer said deletes cause downtime / table locks | "That's strong consistency, not availability"; staggered deletes | (L-0282-L-0284) |
| P26 | 02:32:33 | (student) Redis cache vs DB table for the same pre-computed result: same QPS? "Let's approach this from first principle" | S6 | Persistent connections equal; memory vs disk; small vs large reads; B+ tree log n; RAM cost | "Overall not much difference"; RAM costs more (L-0286-L-0294) |
| P27 | 02:54:50 | (student) "Are there any catches or cons... where using connection pooling might be detrimental?" | S2 | Hypothetical: DB max 1,000, pool min 100 per server, add 20 servers in a spike | A misconfigured pool caps your server count; tune TTL by avg query time (L-0319-L-0324) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"A user's laptop battery dies mid-session. Your app sent 'I'm online' when they logged in. What does everyone else see, and how do you fix it without the laptop's help?"** (P4, 00:27:33-00:29:43). The lecture's key insight: you can announce coming online but never going offline. It forces the reader to invent periodic heartbeats and "long enough" on their own.
2. **"1 billion users, one row each: user ID + last-heartbeat time. How much storage? Now 1M active users each send a heartbeat every 10 s: how many writes per minute? Which number should scare you?"** (P11 + 3d, 00:33:50, 01:04:14). Two quick sums that a reader can do, and the contrast (8 GB "peanuts" vs 6M/min) shows them where the real bottleneck is.
3. **"Your DB update touches one row by primary key. Where does most of the time go?"** (P12, 01:07:27). Counterintuitive answer (connection setup, not the query). It sets up pooling far better than a definition.
4. **"Only online users need a row. Who deletes the rows of users who went quiet 30 s ago - and would you want to run and monitor that thing?"** (P7, 00:40:53-00:44:40). Naive cron job, then the implementation cost, then "let the DB do it". It teaches the "don't add moving parts" habit.
5. **"Redis or DynamoDB for this? Both do key-value and TTL. Give three reasons that are not speed."** (P8 + P9, 00:45:42-01:03:03). Students' first answers (persistence, speed) are the weak ones; the payoff is managed vs self-managed, vendor lock-in (competition story) and future extensibility.
6. **"Why would a company keep `is_deleted = true` rows instead of just running DELETE? Name three reasons - one involves the police."** (P16, 01:42:32-01:46:52). Memorable war story; fact-check caveat on the fourth (B+ tree) reason must sit beside it.
7. **"Your DB allows 1,000 connections; each API server's pool keeps a minimum of 100. Traffic spikes and autoscaling adds 20 servers. What happens?"** (P27, 02:55:15). Clean arithmetic failure; turns "always pool" into "pool with a budget". Pair with the max-per-server formula (01:29:22).
8. **"`published_at > now - 7 days`: what does the DB have to do per row if dates are stored as text? As an epoch integer? As 20220402?"** (P18 + P19, 01:53:35-02:02:07). Three representations, one query; the student objection (YYYYMMDD gives no speed over epoch, only readability) is a good "check yourself" follow-up.
9. **"Is caching the same as 'put it in RAM'? Name a cache that lives on disk and one that is a DB table."** (P23 + 02:11:51). Breaks the main caching misconception; sets up the "every place you can cache" exercise (P22).
10. **"Should the cache compress values for you, or should your app do it? Think about the network."** (P24, 02:26:04-02:29:35). The teacher reasons it out live and changes his mind mid-answer. A good model of first-principles thinking.

Runner-up: "Why can't the server just ask each client 'are you alive?'" (P3, 00:26:33). Better as a short callout because it needs the fact-check's direction/NAT clarification (L-0041).

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:26:33 | **Heartbeat**: "so long as the heart is beating, you are alive" (L-0043) | Periodic liveness signal | Name of the whole mechanism; use as section title |
| 00:35:14 | 8 GB vs the 128 GB phone "in your pocket" (L-0057) | Storage is tiny | Keep; instant sense of scale |
| 00:51:52 | **"Feeding your competitor"** - your cloud bill funds Amazon's food business (L-0079) | Competition as a lock-in reason | Keep with the fact-check update (Amazon Food closed Dec 2022) |
| 01:21:10, 02:49:21 | "Throw money at cloud providers... they become your extended engineering team" (L-0313) | Managed services for lean teams | Good pull quote |
| 01:43:07 | **Google Drive trash**, 30 days (L-0176) | Soft delete for recoverability | Universal; lead the soft-delete section with it |
| 01:48:32 | Fixed-width rows "exactly like C structs" (L-0191) | Byte offsets of columns | Needs the factcheck qualifier (L-0190 wrong: VARCHAR rows are variable length) |
| 02:12:25 | Memoization in dynamic programming = caching (L-0240) | Cache = save repeated work | Bridges for CS readers |
| 02:14:25 | "Caches are just glorified hash tables" (L-0246) | What a cache is | Keep with factcheck nuance (eviction, TTL) |
| 01:17:40 | "Control C control V" the online/offline design into failure detection (L-0132) | Pattern transfer | Use as a closing "same idea elsewhere" box |
| 00:00:02 | Drawing boxes is something "you can do as a kid also" | Course stance: implementation over boxes | Framing line |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:13:05 | Facebook/Twitter green and grey dots | The brief | Opening visual (D-01) |
| 00:20:37 | Systems run at scale on relational DBs instead of Cassandra (L-0031) | Fit the access pattern, not hype | Short aside |
| 00:33:50-00:35:14 | 4 B + 4 B = 8 B/row; 1B users -> 8 GB (L-0055, L-0056) | Storage not the bottleneck | Interactive calculator; add factcheck overhead note |
| 00:41:00 (board) | 1B total, 100k active -> 100k rows, 800 KB (L-0065) | Absence = offline shrinks storage | Board-only number; show next to 8 GB |
| 00:49:18 | S2: Azure database access incident; GCP "infamous for discontinuing services" (L-0076) | Non-cost reasons to switch cloud | Student contribution, keep attributed to "a student" |
| 00:51:52-00:54:05 | Amazon Foods vs Swiggy/Zomato; **Walmart on GCP**; $10M/month bill; Netflix stays on AWS (L-0079-L-0083) | Competition and switching cost | Keep; factcheck: Walmart is hybrid Azure/GCP/own cloud |
| 01:04:14 | 10 s heartbeat -> 6/min -> 1M active -> **6M req/min** (L-0103) | Write load | Same calculator as storage |
| 01:06:25 | 3-way handshake + 2-way teardown = 5 trips (L-0109) | Cost of a new connection | Factcheck: TCP + DB login + TLS; keep the "five trips" picture with a note |
| 01:09:01 | Pool of 3 connections at startup; 4th request waits/stretches; min 3, max 100; idle TTL 10 min (L-0113-L-0125) | Pool mechanics | Animate (D-11) |
| 01:25:26 | AWS RDS shows a formula/UI for max connections (L-0147) | Finding the DB limit | Keep |
| 01:29:22 | DB 1,000 connections / 100 servers = 10 per server; set 15; "1.2x of the average" (L-0158, L-0159) | Pool max sizing | Flag: 15/10 is 1.5x (factcheck L-0159) |
| 01:31:29 | Festival doubles online users (S3) | Spike: scale DB up then down, retune pool | Keep; ties to flash sale (week 7) |
| 01:44:45-01:46:22 | **Harassment complaint; police station; printed traces** (L-0180, L-0182) | Audit as a soft-delete reason | Signature story; keep in the teacher's voice |
| 01:43:49 | Deleted blogs as ML training data, "build another ChatGPT" (L-0177) | Archival | Add factcheck GDPR caveat |
| 01:50:46 | 5,000-character comment = 5,000 bytes inline (L-0197) | Row bloat | Factcheck: utf8mb4 up to 4 B/char |
| 01:57:48 | Counting 20 characters of a date string vs a 4-byte integer (L-0211) | Space gain | Recreate as a byte strip |
| 02:00:04-02:02:07 | **Redbus 2016**: datetime comparisons bottleneck; YYYYMMDD integer (L-0214-L-0218) | Custom format, relax a constraint | Keep; student objection (L-0222) as a follow-up |
| 02:10:48 | MySQL datetime: "mind-blowingly awesome", BCE to ~20,000 years (L-0235) | Read official docs | Factcheck: 1000-9999 in 5 bytes (wrong range) |
| 02:17:50 | Earlier cohort: a Goldman Sachs engineer proposed a new cache place, manager approved, big speed-up (L-0255) | Why the caching exercise matters | Homework hook |
| 02:22:53-02:25:31 | Facebook right-to-be-forgotten; Atlassian 14-day recovery; snapshots not rewritten; **teacher made his org GDPR compliant in 2 months** (L-0266-L-0273) | Hard delete in practice | Keep with all factcheck notes (L-0267-L-0273); tone down "hacks" |
| 02:27:20 | Email ID: compression hurts; 10 KB blog body -> 1 KB helps (L-0277) | When to compress | Keep |
| 02:37:39 | 100,000 rows: delete ~1,000-10,000 per hour, staggered (L-0283) | Avoid big deletes | Keep |
| 02:43:10 | TigerGraph vs Neo4j hiring pool (L-0303) | Talent as a lock-in cost | Keep |
| 02:55:15 | DB max 1,000; pool min 100/server; +20 servers -> exhausted (L-0319) | Pool downside | Prompt #7 |
| 02:59:44 | Hussein Nasser video, Stack Overflow on 30k+ connections (L-0326) | Self-study pointer | "Go explore" chip |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:15:22-00:19:04 | Spiral vs incremental building | Known system vs ambiguity (startup) |
| 00:24:35 | Single-user endpoint vs batch endpoint | Number of front-end calls |
| 00:26:33 | Pull vs push liveness | Server cannot initiate to the client |
| 00:27:33 | Login/logout events vs periodic heartbeat | Offline cannot be announced |
| 00:32:07 vs 00:38:47 | Row per user with timestamp vs absence = offline | Storage vs "last seen" feature (02:44:20) |
| 00:40:53-00:44:40 | Cron job vs DB-native TTL | Moving parts to run and monitor |
| 00:45:42-01:03:03 | Redis vs DynamoDB | Managed/team size, vendor lock-in, future extensibility, time sensitivity (not speed alone) |
| 01:02:13 | Open source vs proprietary | Lock-in, talent (02:42:50) |
| 01:05:19 | Storage-bound vs computation-bound | 8 GB vs 6M writes/min |
| 01:16:23, 01:24:24 | Micro updates vs big analytic queries | Connection setup vs query time dominates |
| 01:27:14 | Memory vs CPU vs disk vs network bound | "Only four things in computer science" |
| 01:43:07 | Soft vs hard delete | Recoverability, archival, audit; uniqueness index (02:39:02), GDPR (02:22:53) |
| 02:45:57 | Soft delete vs archival | Soft delete gives time to archive |
| 01:49:33 | VARCHAR inline vs LONGTEXT by reference | Row size vs extra read |
| 01:52:56-02:02:07 | Native datetime vs epoch int vs custom int | Convenience vs performance vs readability |
| 02:14:47 | Remote shared cache vs per-server data | One copy everyone reads |
| 02:32:33-02:35:13 | Redis cache vs DB table for pre-computed results | Read size, IOs, RAM cost, load on the main DB |
| 02:28:58 | Compression in the cache vs in the app | Network bytes |
| 02:31:28 | Availability vs strong consistency (delete locking) | Different problems |
| 03:03:10 | Stateless HTTP vs keep-alive / HTTP/2 / WebSocket | Persistent connection is optional |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:00:02, 00:25:35, 00:43:13 | "I don't believe in drawing boxes" / "never just draw boxes for the sake of it" / "making your diagram look complex is the worst thing" | Page motto |
| 00:19:04, 00:20:37 | "Understand the core property and access pattern"; tech affinity "hampers the growth" | Callout before every tech choice |
| 00:36:53, 02:05:37, 02:36:21, 02:38:37 | "It's all about trade-offs" / "you get something, you lose something" / "there is no one right answer to anything" | Recurring "Trade-off" chip |
| 00:37:53, 02:52:09, 02:57:26 | "Document every single possibility... and tell why you took a certain path" / "be aware of the limitations of your design" | Design-review checklist |
| 00:43:43, 02:40:21 | "Why reinvent the wheel?" - offload to the database | TTL and retention sections |
| 01:00:36 | "Database is the most critical, most brittle component" | Connects to pooling and soft delete |
| 00:55:59, 01:46:52 | "Know how that is done" (AOF/RDB, B+ tree internals) | "Go deeper" boxes |
| 00:58:47, 02:48:04 | "Every database gives you everything. World is converging"; drop stereotypes | Redis as primary DB |
| 01:05:19, 02:54:21 | "Storage is not a problem, computation is" / "8 GB is peanuts" | Estimation section |
| 01:17:15 | "Having a connection pool is always a great option" - qualified at 02:55:53 "blindly using connection pooling is not a good idea" | Show both lines together |
| 01:18:18 | "Observe the pattern rather than the question and the answer" | Failure-detection box |
| 01:30:27, 02:57:26 | "Start with a conservative mindset, observe the metrics and then retune" | Pool sizing |
| 01:27:14, 02:13:35 | "Only four things in computer science: memory, CPU, disk, network" | Scaling and caching both use it |
| 02:11:51, 02:16:55 | "Caching is anything that helps you save a heavy computation" (disk IO, network IO, compute) | Caching definition card |
| 02:20:42 | "Why not this? Why just this?" | Prompt style for the caching exercise |
| 02:51:23 | "Draw a line where you need to stop overthinking... otherwise you'll eventually write your own database" | Balance to the "think of everything" rule |
| 00:04:47, 02:53:11 | "Implement the core"; "write a hello world with connection pooling" | End-of-section exercise |
| 02:59:44 | "Just a Google search" (offload basics) | Self-study chips |

---

## 4. The online/offline indicator + Medium blogging case-study thread (proposed spine)

The lecture has two case studies: the **online/offline indicator** carries the whole first half (design, Redis vs DynamoDB, connection pooling); a **multi-user blogging app like Medium** carries the second half (schema, soft delete, column types, date time, caching).

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:14:58 | Green/grey dots next to users (D-01) | The brief | Open with the picture |
| 00:22:56 | Store user -> online bool (D-03) | Access pattern = key-value | Name the access pattern before any DB |
| 00:24:35 | Render four users | Batch endpoint | |
| 00:26:33 | Client says "I am alive" (D-05, D-06) | Push vs pull, heartbeats | |
| 00:28:40 | Battery dies, device unplugged | Periodic heartbeats, timeout | Strongest "aha" |
| 00:30:43 | `pulse(user_id, last_hb)` + UPDATE (D-07) | Timestamp instead of boolean | Factcheck: use an upsert (L-0051) |
| 00:33:50 | 1B users | Storage estimate 8 GB | |
| 00:38:47 | Only online users need rows | Absence = offline, expiry | 800 KB board number |
| 00:40:53 | Who deletes? | Cron job vs TTL | |
| 00:45:42 | Which TTL store? | Redis vs DynamoDB trade-offs, vendor lock-in | Factcheck note L-0070 (DynamoDB TTL lag: check expires_at) |
| 01:04:14 | 6M heartbeats/min (D-10) | Write load, connection pooling (D-11) | |
| 01:17:40 | Same design for EC2 / load balancer health | Failure detection | Factcheck: LBs usually pull (L-0133) |
| 02:44:11, 02:53:48 | "Last seen" like WhatsApp | Product call: can't delete rows then | Good "requirement changes the design" box |
| 02:46:47 | Redis as primary DB for presence | Guarantees decide the store; AOF | Factcheck L-0311 (everysec loses ~1 s) |
| 01:03:03 | "Real online indicators use WebSockets" | Limits of this design | Forward chip |
| 01:40:56 | Medium-like app: users, blogs (D-12) | Schema design | Second spine starts |
| 01:41:37 | User deletes a blog -> `is_deleted` | Soft delete reasons | |
| 01:48:00 | `bio` vs `body` (D-13) | VARCHAR vs LONGTEXT | |
| 01:51:27 | Blog list page shows title/excerpt only | Why body goes off-row | |
| 01:52:34 | `published_at`; "blogs in last 7 days" query (D-14) | Date time storage | |
| 02:14:47 | Popular blog = 3-4 table join every read (D-15) | Remote shared cache, cache-aside | |
| 02:27:20 | Caching a 10 KB blog body | Compression trade-off | |
| 02:18:41 | "Every place you can cache" on this architecture | Homework | End of page exercise |

Gaps where the case studies are *not* used but could carry the content (without inventing claims - frame as "applied to..."): the four-resources answer (01:27:14) could be shown against the two workloads the lecture already has (heartbeat writes = network-bound; the blog join = CPU/memory, as the teacher himself contrasts at 01:24:24). GDPR right to be forgotten (02:22:53) is told with Facebook/Instagram but fits the blog `is_deleted` column directly. Staggered hard deletion (02:37:39) applies to the blogs table's soft-deleted rows. The uniqueness-index pitfall (02:39:02) is told with email/accounts, which is the `users` table. Connection pooling could also be tied back to the blog app's API servers (the lecture only uses the heartbeat load).

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:19:04 | Pick the tech you love ("I'll only use Redis") | General | Core property and access pattern first (L-0029, L-0030) |
| 00:26:33 | The server can poll clients for liveness | General | Client must push (L-0041; factcheck: the real reason is direction/NAT) |
| 00:27:33 | Two calls (login + logout) are enough | Common idea (L-0045) | Offline can't be announced; periodic heartbeat (L-0046) |
| 00:31:28 | A table on the board means a relational DB; SQL means only SQL | Students | Just a visualisation (L-0050) |
| 00:42:01 | More boxes (a cron service) = better design | "YouTube videos" | Every box must be built, run, monitored (L-0066, L-0067) |
| 00:46:53 | Presence data needs persistence | S4 | Data expires in 30 s anyway (L-0072) |
| 00:57:00 | Redis only has string types | S3 | Redis has numbers and many structures (L-0088, L-0089) |
| 00:59:59 | Redis is faster only because it is in memory | S? | Persistent connections (L-0093, L-0094; factcheck: RAM is the main reason - teacher's own imprecision) |
| 01:06:25 | The API->DB line on a diagram is free | General | Each new connection is expensive (L-0110) |
| 01:15:23 | A connection pool is a separate service | "Everyone" (L-0127) | Library in the API server (factcheck: external poolers like PgBouncer exist) |
| 01:22:55 | The pool always holds max connections | S? | Max is a ceiling; actual depends on load (L-0142) |
| 01:24:48 | DBs are scaled only for memory/size | S17 | Connections can be the bottleneck; four resources (L-0137, L-0151) |
| 02:11:51, 02:20:22 | Cache = in-memory / RAM | General, S6 | Anything saving compute/IO; disk, network, a DB table (L-0238, L-0241, L-0260) |
| 02:21:09 | (implied) A cache must be a separate component | S6 | Pre-computed DB table is a valid cache place (L-0260) |
| 02:30:36 | Hard-deleting soft-deleted rows causes downtime | S16's interviewer | It's about locking/consistency; stagger deletes (L-0282-L-0284; factcheck L-0284) |
| 02:41:08, 02:45:13 | An indexed field is always read from RAM / indexes live in RAM | S?, S5 | Design for worst case disk read; indexes are stored on disk (L-0300, L-0307) |
| 02:45:51 | Soft delete and archival are the same | S2 | Soft delete gives time to archive (L-0308) |
| 02:46:47 | Redis is only a cache, not a primary DB | S17 | Redis can be primary with AOF; depends on guarantees (L-0309-L-0311) |
| 02:50:11 | Avoid DB-specific features to stay portable | S5 (and their senior engineer) | Pick DBs for needed features; document migration steps (Debezium) (L-0314-L-0317) |
| 02:54:50 | Connection pooling has no downside | Implied by "always use" (01:17:15) | Misconfigured pools cap server count; TTL sweet spot (L-0319-L-0323) |
| 03:03:01 | HTTP connections can never be persistent | S20 | Keep-alive, HTTP/2; WebSocket (L-0330-L-0332) |
| 03:05:00 | HTTP cannot run on TCP | S? (from a resource) | HTTP is on TCP; it's a spec, could even run on UDP (L-0335, L-0336) |
| 02:06:20 | Soft-delete rebalancing benefit only if never hard deleted | S5 | Teacher: batching clubs rebalances (L-0229) - but see factcheck L-0185/L-0228: engines defer and merge by fill threshold |
| 02:08:39 | Epoch is the worst format (overflow) | S4 | Partly accepted by the teacher (L-0231); factcheck: go to 64-bit, not double |
| 01:46:52 | (teacher's own) Every hard delete triggers B+ tree rebalancing | Teacher | See factcheck L-0185 (InnoDB purge, VACUUM, merge threshold) |
| 01:48:32 | (teacher's own) Every row is fixed width | Teacher | See factcheck L-0190 (wrong: VARCHAR rows are variable length) |
| 01:10:42 | (teacher's own) Pooling saves "not really memory" | Teacher self-correction | See factcheck L-0117 (connections do cost memory) |
| 02:09:24 | (teacher's own) Epoch int overflows in 2032 | Teacher | See factcheck L-0232 (19 Jan 2038) |
| 02:10:48 | (teacher's own) MySQL datetime spans BCE to ~20,000 years | Teacher | See factcheck L-0235 (1000-9999) |
| 02:24:00 | (teacher's own) Atlassian recovery shows companies don't really hard delete | Teacher | See factcheck L-0269 (operational mistake restored from backups) |
| 01:29:22 | (teacher's own) 10 -> 15 described as "1.2x" | Teacher | See factcheck L-0159 (that is 1.5x) |
| 01:04:14 | (slip) "8 GB for 1 million entries" | Teacher | Earlier and board: 1 billion (L-0105; factcheck inline) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Client/API server/database request flow; HTTP request-response, REST endpoints, POST/GET (00:23:44, 00:27:33).
- TCP and the three-way handshake ("the infamous three-way handshake", 01:06:25), OS buffers.
- Unix epoch (defined briefly at 00:33:50), integer sizes (4 B int).
- SQL basics (UPDATE, SELECT, DELETE, WHERE), primary key, index; B+ tree as storage structure (named, not taught, 01:16:23, 01:46:52).
- Cron jobs; Redis and DynamoDB at pre-read level (00:45:42); AWS/GCP/Azure as vendors; managed services; RDS; S3.
- Vertical scaling and sharding as words (used at 01:20:05, deferred).
- C structs (01:48:32); dynamic programming / memoization (02:12:25).
- Load balancer as a box (D-15).
- GDPR as a name (explained briefly 02:25:31); CDC / Debezium (02:52:09).

### Concept graph (A -> B means B builds on A)
```
Approach: spiral vs incremental (00:15:22)
  -> core property + access pattern before tech (00:19:04)
  -> online/offline: DB as core (spiral) (00:22:29)
       -> key-value access pattern -> batch endpoint (00:24:35)
       -> pull impossible (HTTP stateless/direction) -> push heartbeats (00:26:33)
            -> offline can't be announced -> periodic + "long enough" timeout (00:28:40)
            -> last_hb timestamp schema -> getStatus rules (00:30:43, 00:32:07)
       -> storage estimate (epoch int 4 B + 4 B) -> 8 GB -> storage not the bottleneck (00:33:50)
            -> absence = offline -> entries must expire (00:38:47)
                 -> cron job -> moving-part cost -> DB-native TTL (00:40:53, 00:43:43)
                      -> Redis vs DynamoDB: managed vs self-managed, vendor lock-in, future extensibility, time sensitivity (00:45:42)
                      -> Redis as primary DB + AOF (02:46:47); last seen needs rows (02:44:11)
       -> request estimate (6M/min) -> computation bottleneck (01:04:14)
            -> TCP setup cost (needs handshake) + micro updates -> connection pooling (01:06:25)
                 -> min/max/idle TTL -> DB connection limit -> max per server formula (01:12:20, 01:29:22)
                 -> pool downsides: server cap, TTL sweet spot, avg query time metric (02:54:50)
                 -> four resources (memory, CPU, disk, network) -> vertical scaling vs sharding (01:27:14) [deferred]
       -> same pattern: failure detection (01:17:40)

Six core components (01:40:25)
  -> Database on Medium-like schema (01:41:37)
       -> soft delete: recoverability, archival, audit (+ B+ tree claim) (01:42:32)
            -> periodic/staggered hard deletes, GDPR right to be forgotten, uniqueness index (02:22:21, 02:37:39, 02:39:02)
            -> offload deletion to DB retention (02:40:05)  <- same idea as TTL offload (00:43:43)
       -> row storage: fixed offsets (C struct) -> VARCHAR inline vs LONGTEXT by reference (01:48:32)
       -> date time on disk: native -> epoch int (needs epoch, 4-byte int) -> custom int (01:52:56)
            -> epoch range limits -> MySQL datetime serialisation (02:09:24)
  -> Caching: anything saving compute/disk IO/network IO (needs the four resources) (02:11:51)
       -> remote shared cache, cache-aside flow (02:14:47)
       -> DB table as cache; Redis vs DB table (needs B+ tree, memory vs disk) (02:20:22, 02:32:33)
       -> compression trade-off (02:26:04)
       -> every place you can cache (next session)
```

Cross-links worth surfacing on the site:
- **Offload to the database** appears twice: TTL for presence (00:43:43) and retention policy for soft-deleted rows (02:40:21).
- **Epoch integer** appears twice: heartbeat timestamp in the 8-byte estimate (00:33:50) and the date-time section (01:57:06); the teacher links them himself at 01:48:32 ("the previous example... four byte and four byte").
- **Persistent connections** recur: Redis time sensitivity (01:00:14), connection pooling (01:08:20), Redis vs DB table (02:32:33), HTTP keep-alive (03:03:10), and the heartbeat pull model (00:26:33).
- **The four resources** frame both scaling (01:27:14) and caching (02:13:35).
- **Micro vs heavy queries** decide both pooling value (01:16:23) and the scaling dimension (01:24:24).
- **B+ tree** shows up in pooling (01:16:23), soft delete (01:46:52) and cache vs DB table (02:34:08).
- **Managed vs self-managed = team expertise** recurs: 01:02:13, 01:21:10, 02:43:49, 02:49:21.

---

## 7. Forward / backward references

### Backward (to earlier material)
| Time | Reference |
|---|---|
| 00:45:42 | Pre-reads asked students to read about Redis and DynamoDB |
| 01:48:32 | "Even with the previous example... four byte and four byte" (the 8-byte heartbeat row) |
| 02:17:50 | Same caching-places discussion in the third/fourth cohort, Goldman Sachs participant |
| 02:21:09 | Student returns to "the first slide, offline online indicator. We use DB" (picked up again at 02:32:01) |
| 03:03:01 | Student recalls "in the very beginning" HTTP is stateless (00:26:33) |
| 03:05:00 | "One of the resources that you shared previously" (pre-reads) |

No previous lecture in this cohort (this is day one); no previous teaching map was provided.

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:02:07 | Flash sale, message brokers, ad hoc systems | Week 7 |
| 00:10:51, 03:01:56 | System brainstorming sessions | From next week |
| 01:03:03 | How online indicators are really built (WebSockets), Slack real-time | Week 2, day 2 |
| 01:05:44 | Sharding and partitioning | Coming weeks |
| 01:20:05 | Vertical scaling and sharding of databases | Next week |
| 01:32:34 | A better answer to traffic spikes | Flash sale design (week 7) |
| 01:40:25, 02:19:52 | Scaling, delegation, concurrency, communication | Tomorrow |
| 02:17:00 | Distributed cache, key-value store, eviction, LRU/LFU | Weeks 3-5 (and tomorrow) |
| 02:18:41 | Every place you can cache (30-min discussion) | Tomorrow's first 30 min |
| 02:21:52 | Client local storage as a cache | Tomorrow |
| 02:31:28 | Strong consistency | Next week Saturday (databases) |
| 02:45:00 | How Redis TTL expiry is implemented | Week 3 (cache design) |
| 02:45:30 | How indexes make reads faster (YouTube video) | Next week's pre-reads |
| 02:53:11 | Horizontal scaling of databases and pooling | Next week |
| 02:59:44 | How a DB server holds 30,000+ connections | Week 3 if still unclear |
| 03:02:26 | Where to stop overthinking: three hats (manager, PM, engineer) | Week 6, day 2 |
| 03:04:16 | Stateful HTTP/2 in a real design | Week 5, day 2 |

Site handling: keep these as "coming in a later lesson" chips (with week number) rather than dropping them; they mark the boundary of this lesson.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers are redistributed into the topic they belong to (map below).

### Option A - "Two builds, one habit" (RECOMMENDED)
Keep the teacher's two case studies as two parts, each growing by forced questions:
1. **How to approach a design** (short): spiral vs incremental (D-02), core property + access pattern, intuition over recipes. One-line "how to use this page: implement the core" note from the admin rules.
2. **Build 1 - the online/offline indicator**: brief (D-01) -> key-value access pattern -> batch endpoint -> heartbeats (prompt #1) -> pulse table + getStatus -> **estimate** (prompt #2, part 1: 8 GB) -> absence = offline (+800 KB) -> cron vs TTL (prompt #4) -> Redis vs DynamoDB (prompt #5; vendor lock-in stories; Redis as primary DB; last-seen box; avoiding DB-specific features) -> **write load** (prompt #2, part 2: 6M/min) -> connection pooling (prompt #3; mechanics; library not service; min/max/TTL; sizing formula; downsides prompt #7; four resources) -> "same pattern: failure detection" -> "real systems use WebSockets" chip.
3. **Six core components** card (sets the second part and the next lessons).
4. **Build 2 - a Medium-like blog database**: schema (D-12) -> soft delete (prompt #6; reasons; lifecycle: batched/staggered hard delete, retention offload, GDPR, uniqueness index, soft delete vs archival) -> column types (D-13) -> date time three ways (prompt #8; Redbus; objections; time zones; overflow; MySQL docs).
5. **Caching on the same blog app**: definition and misconception (prompt #9) -> remote shared cache (D-15) -> DB table vs Redis -> compression (prompt #10) -> homework: every place to cache (P22).
6. **Recap**: heuristics card (access pattern first; estimate before optimising; don't add moving parts / offload to the DB; trade-offs + document them; know the internals; stop overthinking) + forward chips + HTTP-stateless sidebar.

Pros: matches the teacher's order, which is already story-ordered; each concept is introduced by the question that forced it; Q&A nuggets have natural homes. Cons: connection pooling and the four resources are general but sit inside the presence build; needs a "this applies to every app" note. Long first half; needs strong section navigation.

### Option B - "Topic-first foundations"
Reorder by the six components: Database (access patterns, TTL stores, Redis vs DynamoDB, soft delete, column types, date time, connection pooling) -> Caching -> Scaling seeds (estimates, four resources, DB connection limits). Use the presence indicator and blog app as worked examples inside each.
Pros: clean reference structure that lines up with the next lessons (the remaining four components). Cons: breaks the step-by-step build that is this lecture's main teaching move; prompts lose their motivation (TTL without the "who deletes?" story); harder to keep provenance.

### Option C - "Estimation-driven"
Organise around the two numbers: Part 1 "Is storage the problem?" (8 GB, 800 KB, row sizes, VARCHAR vs LONGTEXT, epoch 4 B vs 20 B string, soft-delete growth, compression). Part 2 "Is computation the problem?" (6M/min, TCP setup, pooling, four resources, B+ tree rebalancing, date comparison cost, caching).
Pros: surfaces the teacher's strongest thinking tool and unifies bits that look unrelated. Cons: mixes the two case studies; Redis vs DynamoDB and soft delete reasons (audit, recoverability) don't fit either bucket.

**Recommendation**: Option A for the main page. Use Option C's two questions ("storage or computation?") as a recurring callout, and Option B's component labels as tags on each section so the page lines up with the next lessons.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| S4 DynamoDB for persistence + managed (00:46:38-00:47:58) | Redis vs DynamoDB - persistence and managed rows |
| S2 team size; vendor lock-in reasons: pricing, infra move, deals, Azure security, GCP discontinuing (00:48:13-00:50:10) | Vendor lock-in |
| S3 Redis persistence (AOF/RDB), managed Redis/ElastiCache, data types (00:55:22-00:57:39) | Redis vs DynamoDB - persistence, managed, future extensibility |
| S4 DynamoDB Streams + Lambda; Redis CDC; databases converging (00:58:41) | Future extensibility |
| S? time sensitivity, Redis faster (00:59:38) | Time sensitivity (persistent connections, expiry hooks) with factcheck L-0093/L-0094/L-0097 |
| S4 new servers hit the DB connection limit (01:19:01-01:20:52) | Connection pooling - DB connection limit; vertical scaling vs sharding chip |
| S4 DynamoDB vs self-managed Redis for autoscaling (01:20:52) | Managed vs self-managed box |
| S2 expired pool connections (01:22:08) | Pool min/max/idle TTL |
| S? "every time 100 connections?" (01:22:55) | Pool min/max |
| S16 number of connections decides DB scale (01:23:06-01:24:48) | Micro reads/writes -> network bottleneck (D-10 green note) |
| S17 how many connections a DB can handle (01:24:48) | DB connection limit box (RDS formula, benchmark, network instances) |
| Two scaling parameters -> four resources (01:27:01) | Four resources box |
| S7 pool minimum and maximum size (01:28:32) | Pool sizing formula |
| S3 festival 2x spike (01:31:29) | Pool sizing - spikes (scale DB up/down, retune max) |
| S3 custom format benefit (02:03:20) | Date time - custom format follow-up |
| S8 time zones, UTC (02:04:35) | Date time trade-offs |
| S? why Redbus used custom (02:05:52) | Redbus story |
| S5 soft delete rebalancing objection (02:06:20) | Soft delete - batched hard deletes (with factcheck L-0185/L-0228) |
| S4 epoch overflow (02:08:39) | Date time - epoch limits; MySQL docs pointer |
| S6 pre-computed results in a DB table (02:20:22) | Caching - definition ("why not this?") |
| S6 online/offline uses DB (02:21:09) | Resumed at 02:32:01 -> Caching - Redis vs DB table |
| S? client local storage as cache (02:21:44) | Caching homework (P22) |
| S18 soft deletes grow DB size; GDPR right to be forgotten (02:22:21-02:26:02) | Soft delete lifecycle; GDPR box (with factcheck notes) |
| S3 compression in cache (02:26:04-02:29:43) | Caching - compression |
| S16 cron job "downtime" interview question (02:30:05) | Soft delete lifecycle - consistency vs availability |
| S6 Redis cache vs DB table, first principles (02:32:01) | Caching - where to keep pre-computed results |
| S6 managed Redis cost (02:35:48) | Caching - cost; managed vs self-managed |
| S19 hard delete impact under traffic (02:36:58) | Soft delete - staggered deletion |
| S19 cron job takes pool connections (02:38:19) | Soft delete - staggered deletion ("you gain some, you lose some") |
| S4 uniqueness index blocks re-signup (02:39:02) | Soft delete pitfalls (with factcheck partial index) |
| S7 retention policy in DB (02:40:05) | Soft delete - offload deletion to DB |
| S? index brings data to RAM? (02:41:08) | Caching - Redis vs DB table (worst case) |
| S? vendor lock-in when you are Google; talent (02:42:11) | Vendor lock-in - when it doesn't apply; hiring |
| S? availability not compared (02:43:40) | Redis vs DynamoDB - assumptions |
| S? last seen out of scope (02:44:11) | Online/offline - "last seen" box |
| S3 Redis TTL implementation (02:44:38) | Forward chip (week 3) |
| S5 indexes stored in RAM? (02:45:13) | Caching - Redis vs DB table sidebar |
| S2 soft delete vs archival (02:45:51) | Soft delete - archival |
| S17 Redis as primary DB (02:46:47) | Online/offline - final design (with factcheck L-0311) |
| S8 autoscaling DynamoDB vs self-managed Redis (02:48:53) | Managed vs self-managed box |
| S5 avoid DB-specific features; Debezium (02:50:11) | Online/offline - TTL choice; "stop overthinking" |
| S? pool when scaling the DB (02:52:51) | Connection pooling - hello-world exercise; forward chip |
| S? optimise last seen storage (02:53:48) | Online/offline - "last seen" box |
| S2 downsides of connection pooling (02:54:50) | Connection pooling - downsides (prompt #7) |
| S2 longer queries -> bigger pool? (02:59:07) | Pool tuning (with factcheck L-0325) |
| S4 30,000+ connections per DB server (02:59:31) | "Go explore" chip |
| S6 TTL compute cost in Redis (03:00:22) | Online/offline - TTL |
| S? how to build trade-off intuition (03:01:12) | Recap |
| S? when to stop overthinking (03:02:07) | Recap; forward chip (week 6) |
| S20 HTTP stateless / keep-alive (03:03:01) | Heartbeat sidebar "why the server can't pull" |
| S? HTTP on TCP (03:05:00) | Same sidebar |

### Things a reader-first version should fix (not drop)
- Admin segments (00:00:02-00:13:05, break, wrap-up) are not lecture content; the rules "implement the core of every system" and "note new terms and read later" can become a one-line "how to use this page" note. Promotions (YouTube membership, Redis course) drop.
- The teacher's "always use a connection pool" (01:17:15) and his later "blindly using connection pooling is not a good idea" (02:55:53) must sit together.
- The B+ tree soft-delete reason, fixed-width rows, 2032 overflow, MySQL range, "not really memory" and the Atlassian reading all need their fact-check notes beside them (see section 5). The teacher's point stays; the note corrects the detail.
- The student's custom-format objection (02:03:56) was conceded ("Correct, that's all"): present the custom format as a readability win, not a speed win over epoch.
- GDPR "hacks" language (02:24:43) should be reframed per factcheck L-0271 without dropping the snapshots/logs content.
- Transcript uncertainties to check before publishing claims: "206 million updates" (01:04:14, likely "to do 6 million"), the "8 GB for 1 million entries" slip (01:04:14), "two codes" per TCP connection (02:59:31, cores or ports?), and the unclear words in the Redis-as-primary answer (02:47:19). See `lectures/lec04/transcript/review_flags.md`.
