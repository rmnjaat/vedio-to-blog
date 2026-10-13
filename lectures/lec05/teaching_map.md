# Teaching Map - Lecture 05 (Week 2, Day 1): Relational databases, pessimistic locking (airline check-in demo), key-value store on a relational database

Source: `lectures/lec05/transcript/transcript.md` (03:21:42). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **week 2, day 1** ("Week second, day first", 00:00:02). It builds on week 1: the Medium clap counter and count++ race (00:07:18; Lecture 1 at 01:45:38/01:49:39), the four communication styles students already implemented (00:26:40), read replicas and sharding "exactly what we discussed last week" (02:29:28, 02:27:36), B+ tree rebalancing behind soft deletes (03:06:37; Lecture 4 at 01:42:32), and the online/offline indicator (03:09:28; Lecture 4 section 3). Pre-reads assumed: the teacher's four ACID articles and the index video (00:05:04). The lecture has two halves with two case studies: an **airline check-in system** coded live in Go (first half, locking) and a **key-value store on top of MySQL** brainstormed with the class (second half, schema and query micro-optimizations, plus a Redis expiry detour).

Student labels: `S1`-`S16`, `S19`, `S20` follow the transcript's `Student N` labels. The transcript header warns that `Student 1`, `Student 2` and `Student 6` mix several voices (the teacher calls on different students whose turns all carry these labels), so a number is a voice label, not always one person. The unnumbered student who proposes "valid till" at 01:44:58 is `S21`. `S?` = unidentified.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:02 | 00:02:02 | 2 | Admin: agenda - relational DBs briefly, locking in depth, airline check-in demo, break, KV store on a relational DB (L-0001, L-0004, L-0005) | Roadmap; "pessimistic locking... one of the most neglected topics" (L-0003) | "Okay, so that's the agenda for today. Let's start." |
| 1 | 00:02:02 | 00:05:47 | 4 | **Why relational databases matter**: rows/columns/relations; every foundational tech finds its first use in finance (spreadsheets/ledger, blockchain); financial origin -> ACID; pre-reads (L-0006-L-0015) | **Historical pattern first** + family anecdote (father's ledger tool) | "Okay, so enough of this background, let's jump into pessimistic locking" |
| 2 | 00:05:47 | 00:27:32 | 22 | **Pessimistic locking theory** | **Definition first**, then each lock type shown as a SQL query on a six-row board table (D-02, D-03) | "Theory, now we look at practical" -> airline check-in |
| 2a | 00:05:47 | 00:07:18 | 1.5 | Classic pessimistic lock: acquire, critical section, release (L-0016-L-0019) | "count plus plus is not atomic" (callback to week 1) | "Two types... shared lock... exclusive lock" |
| 2b | 00:07:18 | 00:09:08 | 2 | Why lock at all: Medium claps count+1 vs count+2; correctness over throughput, skip when correctness doesn't matter (L-0020-L-0024) | **Rhetorical question** ("why do we even need locking?... wouldn't it slow down throughput?") | "a very interesting side effect... deadlock" |
| 2c | 00:09:08 | 00:14:43 | 5.5 | **Deadlocks**: T1/T2 cycle (D-01), always a risk, arrange lock order; DB runs detection on every lock and kills the transaction that would close the cycle; reboot = downtime; reproduce locally (L-0025-L-0036) | Textbook example from OS course; "core computer science is not going anywhere" | "Now let's talk about... shared lock and exclusive lock" |
| 2d | 00:14:43 | 00:21:57 | 7 | **Shared (FOR SHARE) vs exclusive (FOR UPDATE)**: rows 1,2,6 vs 3,4,6, contested row 6; implicit elevation; read throughput vs exclusivity (D-02, D-03; L-0037-L-0050) | **Query first** ("let me directly jump into the SQL query"), overlapping-rows diagram | "Just an extension through that. Skip locked." |
| 2e | 00:21:57 | 00:24:03 | 2 | **SKIP LOCKED**: best effort, take rows 3 and 4, skip 6 (L-0051-L-0053) | Same diagram, relax the requirement ("it is okay if I don't get all these three rows") | "Another extreme of skip lock is no wait" |
| 2f | 00:24:03 | 00:25:51 | 2 | **NOWAIT**: kill yourself, retry per business; avoids waiting up to the query timeout (10 s) (L-0054-L-0058) | **Personification** ("transaction is going into existential crisis") | "These are basic constructs" |
| 2g | 00:25:51 | 00:27:32 | 1.5 | Learning method: build only the core you care about (the DB, not the whole airline system); praise for students who implemented polling/SSE/WebSockets; "85% of them... I've built myself" (L-0059-L-0061) | Meta-advice | "So let's briefly talk about airline check-in system" |
| 3 | 00:27:32 | 01:08:25 | 41 | **Airline check-in demo: approaches 0-5** | **Live-coded prototype** (Go, MySQL) with a prediction asked before every run | Recap "from approach zero to approach five... two, three words" -> catchphrase |
| 3a | 00:27:32 | 00:32:35 | 5 | Domain (airlines, flights, 120 seats, trips), schema (D-04), check-in + admin service (D-05), demo data, not a reservation system, **120 passengers at 120 kiosks at the same moment** (L-0062-L-0071) | **Scenario framing** | "let me start really small" |
| 3b | 00:32:35 | 00:35:48 | 3 | Approach 0: user picks seat, plain UPDATE, zero checks (L-0072-L-0075) | Sanity run on screen | "Now, let me do something different" |
| 3c | 00:35:48 | 00:37:20 | 1.5 | Approach 1: system picks a random seat - still duplicates (L-0076-L-0078) | "natural progression" | "Problem, right?" |
| 3d | 00:37:20 | 00:40:24 | 3 | Approach 2: 120 goroutines, random seat; run shows unfilled seats, two passengers on 7C (L-0079-L-0082) | **First class prediction** (P2) | "So now let's come to solution" |
| 3e | 00:40:24 | 00:49:38 | 9 | Approach 3: `WHERE user_id IS NULL ORDER BY id LIMIT 1`; chain of "why?" to one student; runs fill 2-4 seats; **commit** is why more than one fills (L-0083-L-0093) | **Socratic "why?" chain** (P3), then run, then explanation | "This is exactly why pessimistic locking is needed" |
| 3f | 00:49:38 | 01:00:02 | 10.5 | Approach 4 = approach 3 + `FOR UPDATE`; round of predictions (deadlock, starvation, one seat, 1-120, all 120); ACID/isolation detour (00:53:56-00:55:59); "you as database engineer" prompt (L-0094-L-0111) | **Two-word change + prediction round** (P4, P5) | "Let's run and see" |
| 3g | 01:00:02 | 01:05:01 | 5 | Run: all 120, in seat order, users scrambled; waiting transactions are **signalled to re-evaluate the query** (L-0112-L-0118) | Reveal + "this is the most critical part that people skip" | "Now let me move to the fifth approach" |
| 3h | 01:05:01 | 01:08:25 | 3.5 | Approach 5 = + `SKIP LOCKED`: 1.7 s -> 147 ms, all 120 filled; "relational databases scale beautifully"; recap of 0-5 (L-0119-L-0125) | **Number reveal** (P6) | "a phrase that I use very often" |
| 4 | 01:08:25 | 01:11:00 | 2.5 | **"Fixed inventory plus contention equal to locking"**: 120 seats; COVID vaccination portal, IRCTC, BookMyShow, flash sale (L-0126-L-0132; D-05 caption) | **Catchphrase + four real systems** | "let me take some questions and then we go on a break" |
| 5 | 01:11:00 | 01:26:52 | 16 | Q&A on locking: not disk level (mutex/semaphore); 10-minute payment hold is "hold" not lock; pointed seat query (no SKIP LOCKED); FOR SHARE then update -> "code it out" in two terminals; failed SKIP LOCKED holder; MySQL source code and docs; 120 vs N(N+1)/2 evaluations; plain UPDATE and isolation; commit releases locks; thread signalling not busy loop (L-0133-L-0164) | Student-driven | "I hope I made you fall in love with relational databases" -> break |
| 6 | 01:26:52 | 01:33:31 | 6.5 | Admin: break (preview: distributed KV store, Redis detours) (L-0165, L-0166) | - | - |
| 7 | 01:33:31 | 02:02:59 | 29.5 | **KV store on a relational DB - class brainstorm** (D-06 built live) | **Open problem to class**, one operation at a time; "detailed brainstorming rather than me just rambling" (L-0167) | "Let me basically cover a few of these details" -> slides |
| 7a | 01:33:31 | 01:35:40 | 2 | Framing: "distributed" added because folks love it; **single node first**; get/put/delete/TTL; Apache Ignite; five parts (L-0168-L-0174) | Anti-hype warning ("Paxos and Raft and whatnot. No.") | "So let's start with storage" |
| 7b | 01:35:40 | 01:41:15 | 5.5 | Schema: key as PK, key size VARCHAR(16) fixed forever; value type decided by **access pattern**, not content -> BLOB; MongoDB JSON contrast (L-0175-L-0187) | Student proposal refined (P7) | "any other column that you would need?" |
| 7c | 01:41:15 | 01:46:12 | 5 | TTL: created_at + ttl_sec -> "worst query you can write" (no index on computed value) -> store **expired_at**, index it, `DELETE ... WHERE expired_at <= now` (L-0188-L-0195) | Student naive design, teacher challenge (P8), second student (S21) gets it | "we have another operation called delete" |
| 7d | 01:46:12 | 01:50:50 | 4.5 | Delete: soft delete with is_deleted (two jobs) vs **expired_at = -1** (one job, one query matches both); reads must filter too (L-0196-L-0202) | Student proposes both, teacher asks "what does this save us?" (P10) | "Now let's talk about insert" |
| 7e | 01:50:50 | 01:55:37 | 5 | Insert: value-type column aside; naive INSERT; second PUT K1 V2 fails on PK; get-then-insert/update is expensive; "devil lies in the details" (L-0203-L-0211) | **Failure case walk** (P11) | Student names upsert |
| 7f | 01:55:37 | 01:58:25 | 3 | **Upsert**: atomic single statement, saves a network round trip; Postgres/MySQL clauses (D-06 yellow box) (L-0212-L-0218) | Student answer named and generalised | "TTL is remaining" |
| 7g | 01:58:25 | 02:02:59 | 4.5 | Get: filtering expiry in the API server ships a 10 MB value for nothing -> `AND expired_at > now`; student's newbie-upsert worry deferred (L-0219-L-0227) | Student proposal, cost exposed with a number (P12) | "We are still here to touch upon high level... and how Redis does that" |
| 8 | 02:02:59 | 02:27:36 | 24.5 | **Single MySQL node, consolidated** (slides) + Redis expiry detour | **Recap-and-deepen**: each brainstormed decision restated with its reason, then one extra optimization | "Let me quickly cover high level" |
| 8a | 02:02:59 | 02:04:38 | 1.5 | Schema store(key, value, TTL); no auto-increment ID by habit ("ORM sucks"); -1 instead of is_deleted; less B+ tree rebalancing (L-0228-L-0232) | "Do we really need every single column?" | Put |
| 8b | 02:04:38 | 02:06:29 | 2 | Put = upsert; concurrent puts via FOR UPDATE NOWAIT "just for fancy"; no right choice among SKIP LOCKED/NOWAIT/wait (L-0233-L-0235) | Links back to first half | "Now talking about TTL" |
| 8c | 02:06:29 | 02:08:02 | 1.5 | TTL approach 1: cron hard delete every 10 minutes (D-07); get must filter (L-0236) | Timeline diagram | "if I was doing an in-memory database" |
| 8d | 02:08:02 | 02:11:57 | 4 | **Lazy deletion** for in-memory stores (Redis): delete on access, cheap free(); not for disk (B+ tree); never-accessed keys still need a job (L-0237-L-0243) | **Contrast disk vs memory** ("warning, I'm reiterating") | "a bit of Redis internals kicks in" |
| 8e | 02:11:57 | 02:19:43 | 8 | **Redis sampling**: 20 random keys with TTL, delete expired, repeat if >25%; sample represents population; speed over completeness; single threaded; "central limit theorem"; 5 million keys (L-0244-L-0257) | **Algorithm walk with statistics** | "no one way to build a system" -> delete optimization |
| 8f | 02:19:43 | 02:22:17 | 2.5 | Delete micro-optimization: `... WHERE key = K1 AND TTL > now` saves two disk IOs; found in Apache Ignite (L-0258-L-0263) | **Rhetorical "why this clause?"** (P14) + war story | "Let me take questions on this" |
| 8g | 02:22:17 | 02:27:36 | 5 | Q&A: why -1 (keys with no TTL), any magic value; index on TTL; in-memory append-only layer in front (L-0264-L-0269) | Student-driven | "Let me quickly cover high level" |
| 9 | 02:27:36 | 02:36:55 | 9.5 | **Making it distributed** | **Grow one bottleneck at a time** on the same diagram (D-08 -> D-09 -> D-10) | "implement this" exercise -> Q&A |
| 9a | 02:27:36 | 02:29:28 | 2 | Why distribute (one node cannot handle network/disk/data/query load); user -> LB -> KV API -> MySQL + batch cleanup; add API servers while MySQL holds (D-08; L-0270-L-0273) | Backward link to last week's definition of load | "If you see that there are large number of read requests" |
| 9b | 02:29:28 | 02:30:48 | 1.5 | Read replicas: staleness OK for some reads, consistent reads/writes/deletes to master; KV API holds both connections (D-09; L-0274-L-0276) | "Exactly what we discussed last week" | "one master will not be able to handle the write" |
| 9c | 02:30:48 | 02:34:58 | 4 | Vertical first, then **range sharding** A-M / N-Z, each master with replicas and its own cleanup job; routing in KV API (Google stock -> master 1); 90% of sharded DBs are fixed ranges, resharding ~quarterly; split into three (D-10; L-0277-L-0290) | Concrete key example; hot partitions / consistent hashing deferred | "what I would recommend all of you to do once" |
| 9d | 02:34:58 | 02:36:55 | 2 | Exercise: two local MySQL servers, one API server with routing, stretch: binlog replica (L-0291-L-0293) | Assignment | "I'll take questions" |
| 10 | 02:36:55 | 03:19:11 | 42 | **Q&A** | Student-driven | "tomorrow we'll... scale WebSockets" |
| 10a | 02:36:55 | 02:51:57 | 15 | User delete vs batch delete confusion; ACID within a shard only; IIT Delhi booking app (no idea); mock the system locally; "deleted" vs "expired" in sampling; why sampling fails on disk (20 random IOs); autocommit; N(N+1)/2 is evaluations; SKIP LOCKED reads a whole page; LIMIT applied last (L-0294-L-0307) | Student-driven | Student asks about ORMs |
| 10b | 02:51:57 | 02:56:39 | 4.5 | ORMs: non-optimal queries, stored procedures, SELECT all columns, unreadable at complexity, DB-specific constructs, connection pooling; fine for startups; native queries inside ORM = good compromise (L-0308-L-0318) | Opinion + concession | Java question |
| 10c | 02:56:39 | 03:01:30 | 5 | Java vs Go: readability, injection, Go concurrency and GC, JVM 200 MB, FizzBuzz Enterprise Edition, "die a hero or live long enough to become an enterprise version" (L-0319-L-0327) | Opinion, student counterpoint (Vert.x, Kotlin) | "Simran?" -> upsert question |
| 10d | 03:01:30 | 03:04:48 | 3 | SELECT TOP 1 1 then update vs upsert: count network trips (4 vs 2); people forget upsert (L-0328-L-0331) | **Count the trips** | Next question |
| 10e | 03:04:48 | 03:06:18 | 1.5 | "Lock wait timeout exceeded": holder didn't commit/abort in time - long processing or forgotten commit (L-0332, L-0333) | Student's production error | Next |
| 10f | 03:06:18 | 03:07:36 | 1.5 | Why not hard delete immediately: B+ tree rebalancing; databases soft delete then batch (L-0334-L-0336) | Backward link to last week + video | Next |
| 10g | 03:07:36 | 03:09:28 | 2 | Why Redis doesn't delegate lazy deletes to a cron: free() is microseconds; delay keeps memory occupied (L-0337-L-0340) | Student-driven | Last week's topic |
| 10h | 03:09:28 | 03:12:00 | 2.5 | Online/offline: server can't connect to a user it has no IP for; WebSocket existence = presence, no heartbeat needed; try disabling WebSockets on WhatsApp Web (L-0341-L-0344) | **Reverse question** (P18) | "I hope that's not how actual KV stores are built" |
| 10i | 03:12:00 | 03:15:29 | 3.5 | Real KV stores: Redis in-memory, DynamoDB not on RDBMS; relational DB only a teaching vehicle; week 5 distributed cache, week 6 LSM tree; "write it, make mistakes" (no code shared); load balancer later (L-0345-L-0352) | Student-driven | Soft-deletion question |
| 10j | 03:15:29 | 03:19:11 | 3.5 | Why databases don't offer soft deletion: foundational layer, don't enter user space, cognitive load; DynamoDB claim; 2011-12 MySQL forum thread (L-0353-L-0357) | "Great question" + war story | Admin |
| 11 | 03:19:11 | 03:19:38 | 0.5 | Admin: tomorrow = NoSQL databases, then scaling WebSockets via Slack (L-0358) | - | Student question |
| 12 | 03:19:38 | 03:21:42 | 2 | Q&A: previous week's blogging assignment needs no frontend - implement the parts that matter (L-0359); sign-off | Student-driven | End |

Time budget: admin ~9 min (agenda, break, tomorrow); relational DB background 4; locking theory 22; airline demo 41 (+2.5 catchphrase, +16 Q&A); KV brainstorm 29.5; single-node consolidation + Redis 24.5 (incl. 5 Q&A); distributed 9.5; final Q&A 42 + 2. About **one third of the lecture is Q&A** (5, 8g, 10, 12), and the demo itself is mostly class predictions. Much of the Q&A carries real content (re-evaluation vs disk-page skipping, "hold" vs lock, ACID per shard, upsert vs TOP 1 1, lock wait timeout) and must be folded into the topic sections.

**Introduction patterns observed** (reusable templates):
- **Predict, then run** (airline demo): every approach is a tiny code change, the class predicts the outcome, the teacher runs it and only then explains. Wrong predictions (deadlock, one seat, 1-120) become the lesson.
- **Two-word changes**: approaches 3 -> 4 -> 5 differ by `FOR UPDATE` and `SKIP LOCKED`; the teacher keeps saying "I just added two words" (00:49:38, 01:05:01, 01:08:06), so the effect is clearly caused by the construct.
- **Socratic "why?" chain** on one student (00:42:13-00:44:32) until the cause (ORDER BY ... LIMIT 1 + concurrent reads) is named.
- **"You are the database engineer"** (00:58:13): flip the student into the implementer to reason about re-evaluation.
- **Brainstorm one operation at a time** (KV store): storage -> TTL -> delete -> insert/put -> get, each with a student's first idea, the teacher's "what does it cost?" and a cheaper SQL clause.
- **Recap-and-deepen** (02:02:59): the brainstorm is replayed as slides with the reason for each decision, plus one more optimization each time (NOWAIT puts, delete clause).
- **Disk vs memory contrast** as the frame for every deletion strategy (batch vs lazy vs sampling).
- **Grow the architecture by bottleneck** (D-08 -> D-09 -> D-10), each step justified by "when you are not able to sustain it".
- **Catchphrase + real systems** ("fixed inventory plus contention", COVID portal, IRCTC, BookMyShow, flash sale).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:07:18 | "Why do we even need locking? ... Only I want one transaction to do something at a time? Then wouldn't it slow down the throughput?" (rhetorical) | - | "Yes, it does affect"; two simultaneous Medium claps must end at count+2 | Lock where correctness matters more than throughput; skip it otherwise (L-0021-L-0024) |
| P2 | 00:38:37 | "Now when I run this code [approach 2]... any guesses what would happen?" / "So will all seats be filled?" / "Any particular pattern?" | S1: some users get the same seat; not all filled; depends on how rand is implemented | "Correct" | Not all seats filled; two passengers both "have 7C" (L-0081, L-0082) |
| P3 | 00:41:32 | "When I run approach three, will all the seats be filled? If yes, why? If no, why?" then "Which seat will be booked? Look at this query." and "Will there be only one seat that will be booked?" | S1: no, same seat offered to everyone because both see null "because they're concurrent"; S8: "Order by ID limit one"; S8, S20: one seat; S1: one seat unless an update commits before another read | Chain of "Why?" (00:42:48-00:44:25); "Order by is the reason" | Runs fill 2-4 seats; more than one only when a commit lands before a later read - "this is why commit is so important" (L-0084-L-0093) |
| P4 | 00:49:38 | "I just added two words at the end: for update. Now what would happen?" / "Will all 120 seats be filled?" | S2: deadlock; S1: starvation, all filled but slower; S1: the second transaction moves to the second row; S1: only one row (no SKIP LOCKED); S10: between 1 and 120; S2: all 120, waiters re-check and move on; S2 (later): not all 120 | "Waiting is not equal to deadlock" (00:50:17); "Why would it wait on the first row?"; "Not entirely true" | All 120 filled on every run; waiters are signalled and re-evaluate the query (L-0095-L-0118; factcheck L-0098, L-0106, L-0107, L-0110) |
| P5 | 00:58:13 | "Imagine you as database engineer... You implemented this database. How would you write that code where it says this row is not [free], you move to the next row?" | S2: the query must find user_id null | "There has to be a uniform way to handle both types of queries" - range (ORDER BY) and pointed (seat 67) | Engine re-evaluates the statement after the lock holder commits (L-0109, L-0115, L-0116) |
| P6 | 01:05:01 | "Only two-word change: skip lock. Will all 120 seats get filled? Yes, no?" / "What advantage would we get?" | S6: yes, removes the busy waiting; execution time is less | "Total execution time would be less" | 1.7 s -> 147 ms, all 120 filled (L-0120-L-0122) |
| P7 | 01:35:40 | "How will you store this data? What would be the schema?" | S1: an array; then key as primary key, value as string; "if we are not concerned about storage size"; value type depends on what we store (JSON vs integer) | "It's a database. We should always be concerned about it"; pick key size (VARCHAR(16)) once; value type depends on **how** it's accessed | key PK with fixed size, value BLOB (black box) (L-0175-L-0187) |
| P8 | 01:41:15 | "We want to implement insert, update, TTL. So any other column that you would need?" | S1: created_at + per-key TTL + job "delete if current time minus created_at >= TTL" | "This is the worst query that you can write. Why?" -> S1: full scan; "You don't need created at at all" | S21: store a "valid till" time and index it -> `expired_at`, `DELETE ... WHERE expired_at <= now` (L-0188-L-0195) |
| P9 | 01:46:12 | "How would you do delete?" / "What does this save us?" / "What is your SQL query of your job?" | S4: soft delete (is_deleted + background job) or set expired_at negative; saves a job, CPU, disk, storage; reads must filter | Pushes from is_deleted to the -1 variant and asks for the job query | One `DELETE ... WHERE expired_at < now` matches expired and deleted rows (L-0196-L-0202) |
| P10 | 01:51:59 | "Is this [insert] robust enough solution?" -> "Put K1 V2... what would happen?" -> "How do you do it without getting the key explicitly?" | S2: add a WHERE clause for expired; S2: mark previous key expired and insert new; S10: "insert... if exist, do update - an upsert" | "You're still getting it"; PK forbids two rows; get-then-write is a get + a put | Native upsert (L-0205-L-0218) |
| P11 | 01:58:25 | "How would you do key expirations?" / "What is your get query?" | S1: check expiry in the server after `SELECT * ... WHERE key = k1`; then add `AND expired_at > now` | "It's wasteful... 10 MB data transfer to your API eventually to realize [it] is expired" | Filter in SQL; save network IO (L-0220-L-0223) |
| P12 | 02:11:11 | "What about the keys that I never accessed?" (rhetorical) | - | Lazy deletion leaves never-accessed keys | Redis periodic sampling (L-0243-L-0247) |
| P13 | 02:17:58 | "Why 20 keys? Exactly 20, not 21, not 22, not 30, not 15?" (rhetorical) | - | - | "Because of central limit theorem" (see factcheck L-0255) |
| P14 | 02:19:43 | "Why this statement? Why this clause?" (`AND TTL > now` on user delete) (rhetorical) | - | Already-expired rows need no write | Saves two disk IOs (row + TTL index) (L-0258-L-0262) |
| P15 | 02:24:37 | (reverse, to S1's "why -1?") "What if TTL is not set for a key...? You are explicitly deleting a key. How will you do it?" | S1: expired_at already holds the time; no need to update | Keys without TTL never expire, so delete must write something; any magic value works | -1 or a date before 1970 (L-0264, L-0265) |
| P16 | 01:22:38 | (reverse) "What do you mean when you say queuing? What is queuing?" | S1: transactions waited in approach four until the lock opened | "Why was that waiting? Because you wanted to acquire a lock" | Plain UPDATE: isolation level decides; to lock, SELECT ... FOR UPDATE first; commit releases (L-0156-L-0160; factcheck L-0156, L-0158) |
| P17 | 02:48:43 | (student) N(N+1)/2 for FOR UPDATE - is SKIP LOCKED also first waiting on seat one? | S3 | "Not queries, evaluation of queries"; DB reads a whole disk page (B+ tree node) and moves to the next row | ~120 evaluations with SKIP LOCKED; LIMIT applied last (L-0306, L-0307; factcheck L-0307) |
| P18 | 03:10:03 | (reverse) "Does Facebook know your IP address if the HTTP connection is not established? ... Can you connect to user?" | S2: API server asking the user | "You cannot establish a TCP connection unless you know the IP address" | Push from user only; WebSocket presence needs no heartbeat (L-0341-L-0343; factcheck L-0343) |
| P19 | 03:03:09 | (student's TOP 1 1) "How many trips you are making?" | S1: production code does SELECT TOP 1 1 then update | "One, two, three, four. Four trips. With upsert... one, two, done" | Upsert saves a round trip; bulk of time is network (L-0328-L-0331) |
| P20 | 02:40:34 | (student) If MySQL gives ACID, does the partitioned KV store? | S2: we lose atomicity across partitions | "You cannot have ACID guarantees across partitions" | ACID within one shard; distributed transactions too slow (L-0295-L-0298) |
| P21 | 03:15:29 | (student) "Since it improves performance by a lot, why don't database engines provide [soft deletion] out of the box?" | S10 | "Great question" | DB is a foundational layer, doesn't enter user space; know what you don't want to build (L-0353-L-0357; factcheck L-0353) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"120 passengers hit 120 kiosks at the same moment. Each runs `SELECT ... WHERE user_id IS NULL ORDER BY id LIMIT 1`, then UPDATE. How many seats end up booked - and why not 120?"** (P3, 00:41:32-00:49:19). The lecture's central puzzle: the answer (a handful, varying per run, only because some commits land early) is counter-intuitive and the reader can reason it from the query.
2. **"Add two words - `FOR UPDATE` - to that query. Deadlock, one seat, some seats or all 120?"** (P4, 00:49:38-01:00:02). Five different class predictions give ready-made multiple-choice options; the reveal (all 120, every run) leads straight into re-evaluation.
3. **"You are writing the database engine. A transaction is blocked on a locked row that will no longer match `user_id IS NULL` once its holder commits. What should the engine do so the same rule also works for `WHERE id = 67`?"** (P5, 00:58:13). Turns the reader into the implementer; the answer (signal and re-evaluate the statement) is the "magic" the teacher says people skip.
4. **"Now add `SKIP LOCKED`. Still 120 seats? How much faster?"** (P6, 01:05:01). Short prediction with a striking number (1.7 s -> 147 ms); also asks when skipping is *not* acceptable (pointed seat choice, 01:13:43).
5. **"Your key-value store needs per-key TTL. You store created_at and ttl_sec and a job runs `DELETE WHERE now - created_at >= ttl`. What is wrong with this query, and what single column fixes it?"** (P8, 01:41:15-01:46:12). Classic index-unfriendly predicate; elegant fix (expired_at).
6. **"How can a user delete and TTL expiry share one background job and one query?"** (P9, 01:46:12-01:49:33). The -1 trick is the teacher's favourite "elegant" moment.
7. **"PUT K1 V1, then PUT K1 V2. The second INSERT fails. Fix it without reading the key first."** (P10, 01:52:10-01:55:37). Leads to upsert; pairs with the TOP 1 1 trip count (P19) as a follow-up.
8. **"A GET returns a 10 MB value that turns out to be expired. Where should the expiry check live?"** (P11, 01:58:25-02:00:05). Small, concrete network-IO lesson.
9. **"Redis checks only 20 random keys with a TTL and stops when fewer than 25% were expired. Why is that good enough, and why would it be a bad idea on a disk-based database?"** (P12/P13 + 02:45:21). Combines sampling statistics with the disk-vs-memory contrast; fact-check notes on current Redis must sit beside it.
10. **"Why is `UPDATE store SET ttl = -1 WHERE key = K1 AND ttl > now` better than the same statement without the last clause?"** (P14, 02:19:43). Tiny clause, two saved disk IOs, with an Apache Ignite war story.

Runner-ups: "Fixed inventory plus contention equals what?" (01:08:25) - better as a callout than a prompt; "Does the server know the user's IP?" (P18) - belongs to Lecture 4's online/offline page.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:02:41 | First apps of every foundational tech are financial: spreadsheets/ledger on early computers (father's black-and-white screen), blockchain and money (L-0008-L-0010) | Why relational DBs are built around strong guarantees (ACID) | Short intro; fact-check L-0010 (blockchain date) |
| 00:09:08 | Deadlock "you would have studied in operating system" (L-0026) | Transactional deadlock = OS deadlock | Link to CS fundamentals |
| 00:24:03 | **Transaction in "existential crisis"**: "someone else is doing it, why should I do it? So you kill yourself" (L-0056) | NOWAIT | Memorable; keep the humour |
| 00:31:36 | **120 passengers, 120 kiosks, same moment** (L-0069) | Contention on fixed inventory | The demo's framing image |
| 00:39:51 | Two passengers "fight in the air", both claiming 7C | Lost update / double booking | Light illustration |
| 01:13:10 | **"Hold" not "lock"** for a seat during payment (L-0137) | Business hold vs DB lock | Vocabulary callout |
| 01:25:31 | Thread wait queue + signalling (OS constructs) instead of a busy loop (L-0163, L-0164) | How waiting transactions wake up | "From your OS course" box |
| 02:08:02 | malloc/free, new/delete (C, C++) (L-0239) | Why in-memory deletes are cheap | Contrast with B+ tree rebalancing |
| 02:14:38 | **Sample vs population** (statistics) (L-0250) | Why 20 random keys estimate the expired share | Small diagram |
| 02:40:20 | "Heads you win, tails also you win" (S1's summary) | Delete clause + batch cleanup cover both cases | Student phrase, can be quoted |
| 03:01:12 | "Either a language dies as a hero or lives long enough to become an enterprise version of code"; circle of life (L-0327) | Why languages accumulate boilerplate | Aside only |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:07:18 | Medium claps: two people clap, count+1 instead of count+2 (L-0022) | Need for locking | Backward link to Lecture 1 |
| 00:24:53 | Query timeout 10 s: waiting wastes it (L-0058) | Why NOWAIT exists | |
| 00:26:40 | "85% of them is something that I've built myself" (L-0061) | Credibility of implementation advice | |
| 00:28:23 | Air India 101/279, Indigo 6E101 schema (D-04) | Demo data model | |
| 01:06:04 | **Approach 4: 1.7 s; approach 5: 147 ms**, "one 10th of the time" (L-0121) | SKIP LOCKED throughput | Headline number |
| 01:09:07 | **COVID vaccination portal 2020** (hospital slots), **IRCTC**, **BookMyShow**, **flash sale** (L-0128-L-0132) | Fixed inventory + contention | Use all four; flash sale deferred to week 7 |
| 01:19:22 | Teacher read MySQL's C/C++ source; "signals" vocabulary comes from it (L-0149, L-0150) | Learn internals from source | |
| 01:20:00 | "I've scaled SQL systems massively because of this" (L-0152) | Internals -> performance tuning | |
| 01:21:21 | **N(N+1)/2** worst-case re-evaluations for plain FOR UPDATE (L-0155) | Cost of waiting | Pair with 02:48:59 correction ("evaluation of queries") |
| 01:35:00 | Apache Ignite as the design's model (L-0173) | "Not some made up design" | Fact-check L-0173: Ignite is not built on an RDBMS |
| 01:37:25 | Key VARCHAR(16) (or 24, 32, 64) (L-0179) | Fix key size up front | |
| 01:59:31 | **10 MB value** shipped just to learn it's expired (L-0220-L-0222) | Filter in SQL | |
| 02:06:29 | Cron hard delete every 10 minutes (L-0236) | Batch TTL cleanup | D-07 timeline |
| 02:12:50 | Lazy deletion handles ~90% of expiry (L-0246) | Why sampling can be lazy | Teacher's estimate |
| 02:13:16 | **20 keys, >25% repeat**, 20-25% memory worst case, works up to 5 million keys (L-0247-L-0256) | Redis expiry | Fact-check L-0247 (outdated since Redis 6), L-0254, L-0255 |
| 02:21:08 | **Apache Ignite delete clause** - "I mimic the load. And then it struck me" (L-0261) | Read real code, then load test | War story for the delete clause |
| 02:29:28 | 99:1 read requests -> add replicas (D-09 caption) | Replica trigger | Board only |
| 02:31:50 | Google stock price -> master [a-m]; Zomato -> [n-z] (L-0282) | Range routing | |
| 02:33:32 | ~90% of sharded DBs are fixed ranges; resharding about once a quarter (L-0286, L-0287) | Keep sharding simple | Teacher's estimate |
| 02:42:34 | IIT Delhi booking app - "No idea about it" (L-0299) | - | Keep honest non-answer in Q&A |
| 02:45:59 | 20 random disk IOs on disk vs cheap in memory (L-0303) | Sampling only for in-memory | |
| 02:58:34 | S5's team picked Vert.x over Spring Boot for fine-grained control (L-0322) | Lean frameworks | Student story |
| 02:59:10 | JVM ~200 MB at start, "I can run an entire startup" (L-0323); FizzBuzz Enterprise Edition (L-0324); LinkedIn backlash (L-0325) | Teacher's Java opinion | Opinion, label as such |
| 03:03:09 | **TOP 1 1 + update = 4 network trips; upsert = 2** (L-0328-L-0330) | Round trips dominate | Pair with upsert |
| 03:04:00 | "I've seen a bunch of production systems where people do get and set" (L-0331) | People forget upsert | |
| 03:05:36 | S1's system often hits "lock wait timeout exceeded" (L-0332) | Real failure mode | |
| 03:14:36 | Teacher's own first build: many transactional deadlocks, then throughput problems (L-0351) | Why write it yourself | |
| 03:17:28 | 2011-12 MySQL forum thread proposing built-in soft delete; "know what you don't want to do" (L-0356, L-0357) | DB design philosophy | |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:14:43-00:21:57 | Shared (FOR SHARE) vs exclusive (FOR UPDATE) lock | Others may read (read throughput) vs full exclusivity (D-02, D-03) |
| 00:21:57-00:25:51 | Wait vs SKIP LOCKED vs NOWAIT | Do you need those exact rows, any free rows, or fail fast |
| 00:50:17 | Waiting vs deadlock | Deadlock needs a cycle (L-0096) |
| 00:54:05 | Serializable vs default isolation | Throughput; rows 1 and 100 shouldn't wait on each other (L-0103, L-0104) |
| 00:40:24-01:08:25 | Approach 3 vs 4 vs 5 | No lock (wrong) vs lock + wait (correct, slow) vs lock + skip (correct, fast) |
| 01:13:10, 01:24:33 | DB lock vs business "hold" | Lock for a moment; hold spans payment (L-0137, L-0161, L-0162) |
| 01:14:21 | Range pick (any seat) vs pointed pick (seat 67) | SKIP LOCKED only when any row will do; pointed -> "no rows matched" -> "seat's gone" (L-0138-L-0141) |
| 01:39:16 | Value type by content vs by access pattern | Query inside value (JSON type) or black box (BLOB) (L-0183-L-0187) |
| 01:43:25 | created_at + TTL vs expired_at | Computed predicate can't use an index (L-0191, L-0194) |
| 01:47:28 | is_deleted column vs expired_at = -1 | One job, one query, one less column (L-0200, L-0202) |
| 01:53:17 | Get-then-insert/update vs upsert | One atomic statement, no extra round trip (L-0207, L-0215) |
| 01:59:31 | Expiry check in API vs in SQL | Avoid shipping the value (L-0222) |
| 02:09:40 | Disk batch delete vs in-memory lazy/pointed delete | B+ tree rebalancing vs free() (L-0240, L-0241) |
| 02:11:57 | Delete all expired vs sample 20 | Completeness vs speed on a single thread (L-0245, L-0252) |
| 02:29:28 | Replica read vs master read | Staleness acceptable or not (L-0274, L-0275) |
| 02:33:32 | Fixed range shards vs dynamic resharding | Rarity of resharding (consistent hashing deferred) (L-0286) |
| 02:41:36 | ACID within a shard vs across partitions | Distributed transactions too slow (L-0296-L-0298) |
| 02:52:09-02:56:32 | ORM vs raw SQL | Startup velocity vs control/performance at scale (L-0308-L-0318) |
| 02:57:35 | Java vs Go | Readability, concurrency, GC, memory (opinion) |
| 03:01:30 | SELECT TOP 1 1 + write vs upsert | Network trips (L-0328-L-0330) |
| 03:07:52 | Lazy delete now vs delegate to a job (Redis) | Cheap op; free memory immediately (L-0337-L-0340) |
| 03:12:14 | KV store on RDBMS vs Redis/DynamoDB/LSM stores | Only the storage layer differs (L-0345, L-0348) |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 01:08:25, 01:10:15 | **"Fixed inventory plus contention equal to locking"** - "remember it for the rest of your life" (L-0126) | Section-closing callout of the locking half |
| 00:08:14 | "Correctness of data is more important than throughput" - where it matters (L-0023) | Rule box at "why lock" |
| 00:09:08, 00:10:01 | "Whenever you add pessimistic locking, you are risking a deadlock. Always." (L-0027, L-0028) | Warning box |
| 00:14:00, 01:25:31 | "Core computer science is not going anywhere"; "big supporter of formal education" (L-0036, L-0164) | "From your CS course" sidebars |
| 00:49:38, 01:05:01, 01:08:06 | "I just added two words" (L-0094, L-0119, L-0125) | Show the diff between approaches |
| 01:00:02 | "If we are adding two words to our query and it's still not making any difference, something might be wrong" (L-0111) | Debugging tip |
| 01:06:36, 01:26:19 | "Relational databases scale beautifully"; "never believe any generic statement" (L-0124, L-0165) | Myth box (fact-check L-0124) |
| 00:25:51, 02:34:58, 03:14:15, 03:20:45 | "Understand the core of the system and implement it"; "write it, make mistakes"; "focus on things that matter" (L-0059, L-0291, L-0350, L-0359) | "Try it yourself" boxes with the exercises |
| 01:33:31, 02:02:59, 02:34:30 | "Don't design it to be distributed on day zero... start simple and then scale out" (L-0170, L-0290) | Opening of the KV section |
| 00:26:40, 01:54:55, 02:00:05 | "The devil lies in the details"; "everyone can draw boxes" (L-0210) | Theme of the KV half |
| 02:00:05, 02:07:09, 02:21:08 | "Micro decisions/optimizations" for every query line (L-0223) | Tag each SQL clause with what it saves |
| 02:21:30 | "Do the disk IO only when it is needed" (L-0262) | Rule box |
| 02:05:25, 02:18:52 | "There is no one way to build a system"; "depends on the guarantees you want" (L-0235, L-0257) | Trade-off callouts |
| 01:20:00, 01:20:25 | "Dedicate one week... MySQL source code"; "Official documentation always rules" (L-0151, L-0153) | "Go deeper" links |
| 01:57:00, 02:18:20, 02:52:09 | "Google search about them" (offload syntax, paper, ORM critiques) | Reference links |
| 03:17:28 | "More important to know what you don't want to do versus what you want to do" (L-0357) | Closing thought |

---

## 4. The airline check-in and key-value store case-study thread (proposed spine)

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:07:18 | Medium claps (carried from week 1) | Why locking | One-line bridge from the previous lessons |
| 00:27:32 | Airline check-in: airlines, flights, 120 seats, trips; check-in and admin services (D-04, D-05) | Fixed inventory with contention | Interactive schema; stress "not a reservation system" (00:30:59) |
| 00:31:36 | All 120 passengers at kiosks at the same moment | Concurrency simulation (goroutines) | Animate 120 dots racing |
| 00:32:35-00:37:20 | Approaches 0-1: user-picked / random seat, no checks | Lost updates, double booking | Quick step-throughs |
| 00:37:20 | Approach 2: 120 goroutines, random | Concurrency makes it visible | Show seat map with gaps and doubles |
| 00:40:24 | Approach 3: first free seat, ORDER BY id LIMIT 1 | Concurrent reads see the same row; commit timing | Prediction widget |
| 00:49:38 | Approach 4: FOR UPDATE | Exclusive locks, waiting, re-evaluation | Prediction widget + "engine view" animation |
| 01:05:01 | Approach 5: SKIP LOCKED | Throughput, 1.7 s vs 147 ms | Timer comparison |
| 01:13:43 | User picks a specific seat (BookMyShow-style) | Pointed lock, no SKIP LOCKED, "seat's gone" | Variant box |
| 01:12:12, 01:23:58 | Seat held during a 10-minute payment | Hold vs lock (flash sale later) | Forward chip |
| 01:33:31 | KV store on MySQL: get/put/delete/TTL, infinitely scalable | Schema and query design | Single-node first |
| 01:35:40-01:41:15 | Storing key and value (D-06) | Column types by access pattern | |
| 01:41:15 | Per-key TTL | expired_at + index | |
| 01:46:12 | Delete | -1 sentinel, one cleanup job | |
| 01:52:10 | Put same key twice | Upsert | |
| 01:58:25 | Get an expired key | Filter in SQL | |
| 02:04:38 | Concurrent puts on one key | Reuse FOR UPDATE / NOWAIT from the first half | **The one explicit bridge between the halves** |
| 02:06:29-02:19:43 | Expiry cleanup | Cron batch delete (disk) vs Redis lazy + sampling (memory) | Redis as a sidebar ("if this were in memory") |
| 02:19:43 | User deletes an already-expired key | Conditional update saves disk IO | |
| 02:27:36-02:34:58 | KV store outgrows one node (D-08 -> D-10) | API servers, replicas, range shards, routing in KV API | Grow one diagram in three steps |
| 02:40:34 | Multi-key transaction on a sharded KV store | ACID only within a shard | Q&A fold-in |

Gaps where the case studies are *not* used but could carry the content (without inventing claims): the deadlock theory (00:09:08) uses abstract T1/T2/rows - the site can label it with two check-in transactions but should keep the teacher's abstract version as the source; shared locks (FOR SHARE) are never used in the demo - keep D-02's six-row table; the "fixed inventory" examples (COVID portal, IRCTC, BookMyShow, flash sale) can be framed as "same shape as the check-in" exactly as the teacher does. The KV store's batch cleanup per shard (02:31:05) and NOWAIT puts (02:05:50) already tie the halves; nothing else in the second half uses the airline example.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:50:00 | Adding FOR UPDATE causes a deadlock because the second transaction waits | S2 (L-0095) | "Waiting is not equal to deadlock"; deadlock needs a cycle (L-0096) |
| 00:52:10 | With FOR UPDATE the second transaction sees row 1 locked and moves to row 2 | S1 (L-0098) | That is SKIP LOCKED behaviour; plain FOR UPDATE waits (factcheck L-0098) |
| 00:53:56 | ACID is given by default, so why lock? | S1 (L-0100) | ACID is per transaction; isolation level decides concurrency; serializable is too slow (L-0102-L-0105) |
| 00:56:13 | Without SKIP LOCKED only one seat fills | S1 (L-0106) | Run fills all 120 (factcheck L-0106) |
| 00:57:00 | Between 1 and 120 seats, depending on goroutine scheduling | S10 (L-0107) | Every run fills 120; only the user order changes (factcheck L-0107) |
| 00:59:37 | Waiters see 1A filled and cancel | S2 (L-0110) | They re-evaluate and continue (factcheck L-0110) |
| 01:01:25 | All 120 transactions "got" the first row at once | Most of the class (L-0114) | The DB returns no row until the lock is granted; waiters re-evaluate (L-0115, L-0116) |
| 01:11:08 | Locking happens at the disk level | S2 (L-0133) | Engine level, CPU side: mutex/semaphore (factcheck L-0134: atomic instructions underneath) |
| 01:12:12, 01:23:58 | A seat is SQL-locked for 10 minutes while the user pays | S2 (L-0135) | "Hold", split into phases; never span a transaction across payment (L-0137, L-0161, L-0162) |
| 01:14:30 | With a pointed seat query, a waiting transaction gets another seat | S2 (L-0140) | Query can't; "no rows matched" -> "seat's gone" (L-0141) |
| 01:19:13 | The query is evaluated once at the start for every waiting transaction | S9 (L-0148) | Re-evaluation is re-triggered on signal (L-0147) |
| 01:20:52 | SKIP LOCKED: query executed exactly 120 times; without it, unknown | S2 | ~120 vs N(N+1)/2 evaluations (L-0154, L-0155) |
| 01:21:48 | A plain UPDATE without SELECT also queues/cancels the same way | S1 | Isolation level decides; lock explicitly with SELECT ... FOR UPDATE (L-0156-L-0159; factcheck L-0156, L-0158) |
| 01:23:35 | You have to explicitly unlock | S1 | Commit releases all locks (L-0160) |
| 01:25:12 | A waiting transaction busy-loops checking the lock | S2 (L-0163) | Thread wait queue + signalling (L-0164) |
| 01:37:25 | Storage size of the key doesn't matter | S1 (L-0177) | "It's a database. We should always be concerned" (L-0178-L-0180) |
| 01:38:36 | Value type depends on what is stored | S1 (L-0181) | Depends on how it's accessed (L-0183) |
| 01:41:33-01:43:12 | created_at + TTL and a job computing `now - created_at >= TTL` | S1 (L-0188, L-0190) | Unindexable; store expired_at (L-0191, L-0194) |
| 01:52:43 | Handle a repeat put by adding a WHERE clause on expiry | S2 (L-0206) | Upsert (L-0212) |
| 01:54:27 | Mark the old key expired and insert a new row with the same key | S2 (L-0209) | Still a read; PK forbids two rows (L-0209) |
| 01:58:45 | Fetch the key and check expiry in the API server | S1 (L-0220) | Filter in SQL (L-0221, L-0222) |
| 02:03:25 | Every table needs an auto-increment ID | Habit / ORMs (L-0229) | Add it only when needed |
| 01:33:31 | Design distributed from day zero (Paxos, Raft, leader election) | General (L-0170) | Single node first, then scale out |
| 02:22:23 | No need to set -1 on delete; the batch job compares times anyway | S1 (L-0264) | Keys without TTL never expire, so delete must write a marker (L-0264, L-0265) |
| 02:37:03 | The delete clause `TTL > now` should be `< now` | S1 (L-0294) | That's the user delete, not the batch cleanup (L-0294) |
| 02:43:49 | The 25% rule counts "expired" keys, not "deleted" keys | S2 | Same set: expired keys in the sample are the ones deleted (L-0249, L-0301) |
| 02:45:21 | Sampling on disk fails because you must read all rows first | S1 (L-0302) | You can pick 20 rows, but 20 random disk IOs are slow (L-0303, L-0304) |
| 02:47:35 | Autocommit=true breaks FOR UPDATE without explicit transactions | S1 (L-0305) | Autocommit applies to standalone statements |
| 02:48:43 | N(N+1)/2 queries are fired | S3 | Evaluations inside the engine, not queries (L-0155) |
| 02:50:26 | LIMIT 1 means only one row is read | S3 (L-0306) | Engine reads a whole page; LIMIT applied last (L-0307; factcheck L-0307) |
| 03:04:48 | "Lock wait timeout exceeded" only when the first transaction never commits | S1 (L-0332) | It's a timeout: long processing or forgotten commit/abort (L-0333) |
| 03:09:28 | Server could poll users (push model as server-initiated HTTP) | S2 (L-0342) | Server doesn't know the user's IP (L-0341) |
| 03:10:30 | WhatsApp Web should send heartbeat requests | S2 | WebSocket existence = presence (L-0343; factcheck L-0343: ping/pong still needed) |
| 03:12:00 | Real KV stores are built like this | S2 (L-0345) | Redis/DynamoDB are not; RDBMS only a teaching vehicle (L-0346, L-0348) |
| 01:26:19 | "Relational databases don't scale" | General (L-0165) | They do with the right constructs (L-0124; factcheck L-0124) |
| (teacher's own) 01:22:57 | "In update, you cannot do for update... you have never acquired a lock" | Teacher (L-0158) | An UPDATE always takes an exclusive row lock - see factcheck L-0158 |
| (teacher's own) 01:55:37 | Postgres: "just replace insert with upsert" | Teacher (L-0213) | Postgres uses INSERT ... ON CONFLICT DO UPDATE - see factcheck L-0213, L-0216 |
| (teacher's own) 00:19:28 | Exclusive locks stop others from even reading the rows | Teacher (L-0046) | Plain SELECTs still read the committed version - see factcheck L-0046 |
| (teacher's own) 01:35:00 | Apache Ignite is built on a relational DB | Teacher (L-0173) | Own storage engine - see factcheck L-0173 |
| (teacher's own) 02:13:16-02:18:20 | Redis samples exactly 20 keys, repeats above 25%, because of the CLT | Teacher (L-0247, L-0255) | Outdated since Redis 6 (~10% target), CLT reason unverified - see factcheck L-0247, L-0254, L-0255 |
| (teacher's own) 02:16:47 | "No multiple threads in Redis running anywhere" | Teacher (L-0253) | Single main command thread; background threads exist - see factcheck L-0253 |
| (teacher's own) 03:16:36 | DynamoDB always soft-deletes | Teacher (L-0355) | DeleteItem removes the item - see factcheck L-0355 |
| (teacher's own) 02:09:40 | Every micro delete on disk requires B+ tree rebalancing | Teacher (L-0240) | Engines delete-mark and purge - see factcheck L-0240 |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- SQL basics: SELECT/UPDATE/INSERT/DELETE, WHERE, ORDER BY, LIMIT, primary keys, indexes (pre-read video, 00:05:04).
- ACID (pre-read articles, 00:05:04); transaction begin/commit/abort; isolation level names (listed, not taught, 00:54:05).
- Operating-system fundamentals: threads, deadlock, mutex/semaphore/monitor, thread signalling (00:09:08, 01:11:47, 01:25:31).
- Go basics and goroutines ("like a thread", 00:37:20).
- B+ tree as the on-disk index structure and rebalancing on delete (Lecture 4; members video, 00:05:04, 03:06:37).
- Week 1: Medium claps race, replicas/sharding, load balancers, connection pools, communication styles, online/offline indicator.
- Basic statistics: random sample represents the population (02:14:38).

### Concept graph (A -> B means B builds on A)
```
Finance origin of relational DBs -> ACID guarantees (00:04:19)
  -> transactions + isolation levels (serializable too slow) (00:54:05)
  -> pessimistic locking: acquire / critical section / release (00:06:26)
       -> correctness vs throughput decision (00:08:14)
       -> deadlock risk -> detection (cycle) -> victim killed (00:09:08-00:12:48)
       -> shared lock (FOR SHARE) -> implicit elevation -> exclusive lock (FOR UPDATE) (00:14:43-00:20:30)
            -> SKIP LOCKED (00:21:57)   -> NOWAIT (00:24:03)
       -> airline demo:
            approach 0/1 (no checks) -> approach 2 (concurrency) -> approach 3 (first free seat; commit visibility)
            -> approach 4 (FOR UPDATE; wait + signal + re-evaluate; N(N+1)/2)
            -> approach 5 (SKIP LOCKED; page-level skip; 10x)
            -> pointed seat variant (no SKIP LOCKED) ; payment "hold" (deferred)
       => fixed inventory + contention = locking (COVID, IRCTC, BookMyShow, flash sale)

KV store on MySQL (single node first)
  -> schema: key PK with fixed size; value type by access pattern (BLOB)
  -> TTL: expired_at + index (needs: index can't serve computed predicates)
       -> batch cleanup DELETE ... expired_at <= now (needs: B+ tree delete cost from Lecture 4)
  -> delete = UPDATE expired_at = -1 (needs: soft delete) -> one job matches both
       -> conditional delete AND ttl > now (saves disk IO)
  -> put = upsert (needs: PK conflict; network round trips)
       -> concurrent puts reuse FOR UPDATE / NOWAIT (first half)
  -> get filters expiry in SQL (network IO)
  -> in-memory contrast: lazy deletion -> Redis sampling (statistics; single thread)
  -> distributed: more API servers -> read replicas (staleness; last week) -> vertical -> range sharding
       -> routing in KV API -> per-shard cleanup -> ACID within a shard only
       -> hot partitions / consistent hashing / dynamic resharding (deferred)
```

Cross-links worth surfacing on the site:
- **"Two words" theme**: FOR UPDATE, SKIP LOCKED, NOWAIT, AND expired_at > now, AND ttl > now - every big effect in the lecture comes from one SQL clause.
- **Network IO** recurs: upsert (01:56:35), expiry filter in get (02:00:05), TOP 1 1 trips (03:03:09).
- **Disk IO / B+ tree** recurs: soft delete + batch cleanup (02:03:55), lazy deletion not on disk (02:09:40), delete clause (02:21:08), random sampling on disk (02:45:59), hard delete Q&A (03:06:37).
- **Re-evaluation on signal** (01:02:37) explains both approach 4's correctness and the failed-holder case (01:18:58).
- **Staleness is acceptable** recurs from Lecture 1: replicas (02:29:28) and expired-but-not-deleted Redis keys (02:16:47).

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:05:04 | Pre-reads: four ACID articles, index video |
| 00:06:26, 00:07:18 | count++ not atomic; Medium claps race (Lecture 1, 01:45:38/01:49:39) |
| 00:26:40 | Students implemented short polling, long polling, SSE, WebSockets (Lecture 1 communication) |
| 02:27:36 | "As I spoke about in last week" - load is not just queries or storage |
| 02:29:28 | Replicas with staleness, consistent reads to master - "exactly what we discussed last week" (Lecture 1 scaling) |
| 03:06:37 | B+ tree rebalancing on delete - "we spoke about it last week also" (Lecture 4 soft delete) |
| 03:09:28 | Online/offline indicator, pull vs push (Lecture 4 section 3) |
| 03:19:38 | Previous week's blogging-platform implementation assignment |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:05:04 | Why databases use B+ tree (members video) | "Tomorrow", YouTube |
| 01:10:40, 01:12:49 | Flash sale design; seat hold during payment | Week 7 Sunday (prerequisites in weeks 3, 5, 6) |
| 01:57:00 | Upsert clauses in detail | "Today... in this discussion" (covered at 02:04:38) |
| 02:00:57 | "One more performance optimization" | Later in this lecture (delete clause, 02:19:43) |
| 02:01:17 | Student's accidental-upsert concern | "At the end" (not revisited) |
| 02:10:10 | Redis expiry internals in full | Teacher's Redis course (out of scope) |
| 02:27:13 | In-memory layers in front of the store | Weeks 5 and 6 |
| 02:32:24, 02:33:32, 02:34:58 | Hot partitions, dynamic resharding, consistent hashing | Weeks 5-7 |
| 03:12:58 | In-memory distributed cache (transport, locking, mutexes) | Week 5 |
| 03:13:35 | Two KV databases, one LSM tree | Week 6 |
| 03:15:16 | Implement a load balancer, read its source | When load balancers are covered |
| 03:19:11 | NoSQL databases; scaling WebSockets via Slack | Tomorrow |

Site handling: keep these as "coming in a later lesson" chips; the 02:01:17 deferral was never answered and should be logged as an open question, not invented.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers should be redistributed into the topic they belong to (mapping below the options).

### Option A - "Two builds" (RECOMMENDED)
Keep the lecture's two case studies as the two halves, each built step by step:
1. **Why relational DBs are strict** (finance -> ACID, 2 min read) and the "relational DBs scale" myth as a hook.
2. **Locks in theory**: why lock (claps) -> classic lock -> FOR SHARE / FOR UPDATE on the six-row table (D-02, D-03; fact-check L-0046 inline) -> SKIP LOCKED -> NOWAIT -> deadlock (D-01) moved *after* lock types so the reader knows what is being waited on. Fold in: locking at engine level (01:11:08), commit releases locks (01:23:35), plain UPDATE (01:21:48 + factcheck L-0158), autocommit (02:47:35), lock wait timeout (03:04:48).
3. **Build the check-in system**: scenario -> approaches 0-5 as prediction widgets (top-10 #1-#4) -> engine view of re-evaluation, N(N+1)/2, page-level skip (02:48:43) and LIMIT (02:51:28) -> pointed seat variant -> "hold" vs lock -> catchphrase + COVID/IRCTC/BookMyShow/flash sale.
4. **Build a KV store on MySQL**: single node first -> schema -> TTL -> delete -> put/upsert (+ TOP 1 1 trip count) -> get -> concurrent puts (bridge to locks) -> conditional delete -> consolidated SQL card.
5. **"If it were in memory"** sidebar: lazy deletion, Redis sampling (with fact-check notes), why not on disk, why not delegated to cron.
6. **Make it distributed**: D-08 -> D-09 -> D-10, ACID within a shard, exercise.
7. **Opinions and craft** box: ORMs, Java vs Go, read source/docs, make mistakes, implement only the core.
Pros: matches the teacher's order and both case studies; the prediction-run rhythm is preserved; the halves are linked through concurrent puts. Cons: long page; the Redis sidebar interrupts the KV build if not collapsed.

### Option B - "Every clause has a cost"
Organise by the resource each decision saves: correctness (locks, isolation), waiting time (SKIP LOCKED, NOWAIT, timeouts), network IO (upsert, get filter, TOP 1 1), disk IO (expired_at index, -1 sentinel, conditional delete, batch vs lazy deletion), scale (replicas, shards).
Pros: surfaces the teacher's real meta-lesson ("micro decisions", "do disk IO only when needed"); excellent revision view. Cons: breaks the airline demo apart; the predict-then-run puzzles lose their sequence; harder for a first read.

### Option C - "Theory, then two labs"
Section 1: all theory (locks, deadlock, isolation, upsert, TTL patterns, Redis expiry, sharding). Sections 2 and 3: the airline lab and the KV lab as hands-on exercises with the teacher's runs as "expected output".
Pros: matches the teacher's "implement it" advice; labs are reusable as assignments. Cons: theory first loses the teacher's best device (prediction before explanation); the KV half was taught as a brainstorm, not theory.

**Recommendation**: Option A for the page, with Option B's resource tags ("saves: network IO", "saves: disk IO") as small badges on each SQL clause and a final cost table built from them; Option C's exercises appear as "Try it yourself" boxes (two-terminal lock experiment 01:16:02, local two-MySQL routing 02:34:58).

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| Faker library for demo names (00:30:57) | Check-in setup (demo data footnote) |
| ACID by default? isolation levels, serializable too slow (00:53:56) | Locks in theory - "Why not just serializable?" box |
| Locking at disk level? mutex/semaphore (01:11:08) | Locks in theory - "Where do locks live?" |
| Lock a seat for 10 minutes / payment (01:12:12, 01:23:58) | Check-in - "hold vs lock" callout + flash sale chip |
| SKIP LOCKED when the user chooses a seat (01:13:43) | Check-in - pointed seat variant |
| FOR SHARE then update by the first transaction (01:15:35) | Locks in theory - "try it in two terminals" exercise (+ factcheck L-0042) |
| Failed holder under SKIP LOCKED (01:17:24) | Check-in - approach 5 engine view |
| MySQL source code / official docs (01:19:22, 01:20:22) | Opinions and craft box |
| Query executions with/without SKIP LOCKED, N(N+1)/2 (01:20:52) | Check-in - approach 4/5 engine view |
| Plain UPDATE, queuing, explicit lock, unlock = commit (01:21:48) | Locks in theory (factcheck L-0156, L-0158) |
| Busy loop vs thread signalling (01:25:12) | Check-in - re-evaluation |
| Value type column (01:50:56) | KV schema |
| Newbie misfired upsert (02:01:17) | KV put - open question note (deferred, unanswered) |
| Why -1 on delete; any magic value (02:22:23) | KV delete |
| Disk IO saving needs TTL index (02:25:03) | KV conditional delete |
| In-memory append-only layer in front (02:25:51) | KV put - "could you buffer writes?" sidebar + week 5/6 chip |
| User delete vs batch delete clause (02:37:03) | KV conditional delete |
| ACID after partitioning (02:40:34) | Distributed - ACID within a shard |
| IIT Delhi booking app (02:42:34) | Check-in - fixed inventory examples ("teacher: no idea") |
| Mock the distributed system locally (02:42:55) | Distributed - exercise |
| "Deleted" vs "expired" in sampling (02:43:49) | Redis sidebar |
| Why sampling fails on disk (02:45:21) | Redis sidebar - "why not on disk" |
| Autocommit and FOR UPDATE (02:47:35) | Locks in theory |
| N(N+1)/2 vs SKIP LOCKED page read; LIMIT applied last (02:48:43, 02:49:59, 02:51:28) | Check-in - engine view (factcheck L-0307) |
| ORMs, native queries compromise (02:51:57, 02:55:28, 02:55:44) | Opinions and craft box (also KV schema "no ID by habit") |
| Kotlin coroutines vs goroutines; why not JVM (02:56:49, 02:57:25) | Opinions and craft box (why the demo is in Go) |
| SELECT TOP 1 1 vs upsert (03:01:30) | KV put/upsert |
| Lock wait timeout exceeded (03:04:48) | Locks in theory - NOWAIT/timeouts |
| Hard delete immediately? B+ tree (03:06:18) | KV delete |
| Redis lazy delete vs cron (03:07:36) | Redis sidebar |
| Online/offline push vs pull, WhatsApp Web heartbeat (03:09:28) | Backward link to Lecture 4 online/offline page (factcheck L-0343) |
| Real KV stores vs this design (03:12:00) | KV intro + closing "what changes in real stores" |
| Share code snippets? (03:14:12) | Try-it-yourself boxes ("write it, make mistakes") |
| Why databases don't provide soft delete (03:15:29) | KV delete - closing "design philosophy" box (factcheck L-0353, L-0355) |
| Previous assignment needs no frontend (03:19:38) | Try-it-yourself guidance |

### Things a reader-first version should fix (not drop)
- Move deadlocks after the lock types (taught at 00:09:08, before shared/exclusive at 00:14:43) so the reader knows what a transaction waits on; keep the T1/T2 diagram (D-01).
- Several of the teacher's own claims need the fact-check note next to them, not a silent rewrite: FOR UPDATE inside UPDATE (L-0158), Postgres "upsert" keyword (L-0213, L-0216), exclusive locks blocking plain reads (L-0046), Apache Ignite on an RDBMS (L-0173), Redis sampling details and CLT (L-0247, L-0254, L-0255), Redis single-threaded (L-0253), DynamoDB soft delete (L-0355), deadlock victim choice (L-0033).
- The approach-4 prediction round has many contradictory student answers; present them as options, then the run, and mark each prediction's fate (factcheck L-0098, L-0106, L-0107, L-0110) instead of leaving them as stated facts.
- The KV slides use `TTL` and `expired_at` for the same column (02:03:55 vs 01:45:19); the site should name it once (expired_at = absolute expiry time) and note the alias.
- GET must also return keys with no TTL (factcheck L-0263); add this as an inline clarification on the final query card.
- Transcript uncertainties to verify before publishing: "120 days" at 01:21:09, "128th" coroutine at 00:47:48, speaker boundaries in the -1 Q&A (02:22:23-02:24:37) and the TOP 1 1 exchange (03:02:13-03:04:00), key sizes "30 to 60" at 01:37:25. See `lectures/lec05/transcript/review_flags.md`.
- Admin segments (agenda, break, tomorrow) are not content; the teacher's "implement the core only" advice (00:25:51, 03:20:45) becomes a one-line "how to use this page" note.
