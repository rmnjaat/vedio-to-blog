# Teaching Map - Lecture 03 (Week 3, Day 2): Distributed ID generators - epoch IDs, static counters, monotonicity, central ID service, Amazon, Flickr, Twitter Snowflake, pagination, Discord, Instagram

Source: `lectures/lec03/transcript/transcript.md` (02:29:51). All timestamps refer to that file / the video. Board references (`D-xx`) are to `lectures/lec03/board/diagrams.md`; ledger ids (`L-xxxx`) to `lectures/lec03/ledger/ledger.jsonl`; fact-check notes to `lectures/lec03/factcheck/policy_summary.md`.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: the teacher opens with "The third day second" (00:00:02, flagged; most likely week 3, day 2). The lecture leans on week-2 material that is **not in this corpus**: the airline check-in system with locking and `SELECT ... FOR UPDATE` transactions (00:26:40, 01:02:13, 01:07:22), the key-value store on a relational database where `REPLACE INTO` came up (01:24:28), and the week-2 pre-read video on how indexes make reads faster (01:11:11). From the corpus, Lecture 1 (`lectures/lec01/teaching_map.md`) introduced sharding, multi-master and "database is the most critical and most brittle component"; Lecture 2 (`lectures/lec02/teaching_map.md`) closed by announcing "next week distributed systems, ID generators" (lec02 ~02:30:12).

Unlike Lectures 1-2, there is **no single product case study**. The spine is **one function, `getid()`, rewritten again and again** (00:02:32-00:47:34), with a new constraint each time (more machines, threads, reboot, disk IO, ordering, clock skew, fault tolerance). The second half then shows **four companies (Amazon, Flickr, Twitter/Discord, Instagram) as four answers to the same question**, each reusing a piece built in the first half (batching = flush frequency, static counter = Snowflake sequence, safest value = Flickr reset, time-on-the-left = every scheme). The teacher points these callbacks out himself (01:01:26, 01:34:50, 01:39:44, 02:01:15, 02:20:10). Almost all board content is a **prepared deck** the teacher scrolls and annotates (D-01..D-20).

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:00 | 00:02:32 | 2.5 | Admin: agenda (Amazon, Flickr, Twitter, Instagram, "a very interesting side effect") + three reasons to learn ID generators (most misunderstood; beauty of CS; side effects) + "implement every single thing" (L-0001..L-0007) | Motivation first: "most companies hit that scale sooner than they think" | "So let's start with this" |
| 1 | 00:02:32 | 00:09:55 | 7.5 | **Problem statement and the first `getid()`: epoch ms -> machine ID -> thread ID** | **Definition + constraint first**: "a function that spits out something unique every time it is invoked" - explicitly *not* a central service | "Other way to do it is by adding a counter" |
| 1a | 00:02:32 | 00:04:29 | 2 | What an ID is; problem statement; function inside business logic, not a service (L-0008..L-0010, D-01) | Warning against the reflex "I'll start writing a new service" | "the first hint that we get is..." |
| 1b | 00:04:29 | 00:05:42 | 1 | Epoch millisecond as ID; millisecond granularity (L-0011..L-0013) | "We know time is unique... time always moves forward" + "something would break, otherwise everyone would be using this" | "So what if there are multiple machines?" |
| 1c | 00:05:42 | 00:08:02 | 2.5 | Two machines collide at 1729 -> `M1-1729`; rule "add the thing that led to the collision" (L-0014..L-0016, D-02) | Rhetorical "what would happen? Collision." | "But what if our program has threads?" |
| 1d | 00:08:02 | 00:09:55 | 2 | Threads collide -> `M1-T1-1729` (L-0017..L-0019, D-03) | Same move repeated one level down | "We have two approaches" |
| 2 | 00:09:55 | 00:25:35 | 15.5 | **Static counter and making it survive reboots** | Alternative to "always add the thing" (which gives gigantic IDs) | "Now let's move to some other constraints" |
| 2a | 00:09:55 | 00:14:41 | 5 | Atomic static counter; time becomes redundant -> `machine ID + counter` (`M101`); integer limit (L-0020..L-0029, D-04) | Code on the board, then "if you look carefully... time is redundant" | "Now what's next?" |
| 2b | 00:14:41 | 00:17:06 | 2.5 | Reboot resets the counter -> root cause volatile memory -> write to a local file (L-0030..L-0033) | Problem question to class; **S9 answers** | "But here there is a problem" |
| 2c | 00:17:06 | 00:21:51 | 5 | Disk IO on every ID (disk pressure, latency); S2's boot-counter idea; S5's "bank of IDs" (L-0034..L-0041) | Problem question to class, **two student proposals**, teacher challenges then praises | "let me walk you through... why I'm stressing on this approach, because this comes in handy at two different places" |
| 2d | 00:21:51 | 00:25:35 | 4 | Flush frequency (every 1000 -> 1000x fewer IOs); worked crash example with frequency 3; safest value = last flushed + frequency + 1 (L-0042..L-0048, D-05) | **Toy-number walkthrough** (flush at 3, 6; crash at 8; restart at 10) | Two "key takeaways": periodicity via `mod`; restart from the safest value |
| 3 | 00:25:35 | 00:39:26 | 14 | **Monotonically increasing IDs and why distributed clocks break them** | **New constraint + "why would someone need this?"** -> practical example | "So what do you do?" -> central service |
| 3a | 00:25:35 | 00:27:51 | 2.5 | Why monotonicity: week-2 airline check-in T1/T2, newer write wins in conflict resolution (L-0049..L-0053) | Backward reference to an earlier design | "Now, first of all, monotonically increasing IDs are..." |
| 3b | 00:27:51 | 00:32:52 | 5 | Monotonic vs sequential; **flip the order: time first** -> almost monotonic, stateless; within-ms misordering; "time is always on the leftmost side" (L-0054..L-0061, D-07) | "What if we flip the order?" | "But there is a problem even on the time side of things" |
| 3c | 00:32:52 | 00:39:26 | 6.5 | Clock skew: NTP sync jobs; quartz crystal and heat/cold; Jeff Dean & Sanjay Ghemawat bit-flip story; 4-machine skew example (232, 244, 237, 239); "strict monotonicity in a distributed system is almost impossible" (L-0062..L-0073, D-08) | **Physics detour** ("first of all, why do clocks go out of sync? That's a very fascinating thing") then numeric example | "Let's say instead of putting it on independent machines..." |
| 4 | 00:39:26 | 00:47:34 | 8 | **Central ID service, its limits, and why we need custom IDs at all** | Naive fix proposed by the teacher himself | "Okay, any questions?" |
| 4a | 00:39:26 | 00:44:03 | 4.5 | One ID server: single clock "never goes back" -> monotonic; SPOF -> two servers + LB -> must gossip -> "no way to distribute strict monotonicity at high throughput"; MySQL objection (L-0074..L-0084, D-09, D-10) | Build-up-and-break: each fix adds a new problem ("every time you think of something... new problem") | "So how do people go about it? ... relax" |
| 4b | 00:44:03 | 00:45:11 | 1 | Everything is a trade-off; ask critical questions; relax constraints (integer? UUID? no monotonicity?) (L-0085, L-0086) | Meta-lesson | "One final thing before we take questions" |
| 4c | 00:45:11 | 00:47:34 | 2.5 | Why ID generation at all: two MySQL masters both auto-increment 1, 2, 3, 4 -> conflict -> custom IDs (L-0087, L-0088, D-11) | **The "why" placed last**: "obviously, that should be the first thing... but now that we have the context" | Q&A |
| 5 | 00:47:34 | 00:54:17 | 6.5 | Q&A first half: shared DB with locks (S2); conflict resolution with non-unique IDs (S1, deferred); increment by number of servers (S3, deferred to Flickr); random ID / UUID (S3); per-ID-server prefix (S2/S3); read last row ID from DB on restart (S4) (L-0089..L-0099) | Student-driven | Break |
| 6 | 00:54:17 | 00:59:55 | 5.5 | Admin: break (~00:54:56-00:59:55); preview Amazon, Flickr, Twitter, Instagram and pagination "a very interesting side effect" (L-0100) | - | "Let's start with the second half" |
| 7 | 00:59:55 | 01:17:56 | 18 | **Amazon: central service handing out batched ranges; why not UUID; MongoDB IDs** | **Insider war story first** ("the team that did it sat right next to me") | "So let's take a look at what Flickr did" |
| 7a | 00:59:55 | 01:08:14 | 8 | API servers + LB + plain relational DB; ranges (start, end) of 500 per service row; `FOR UPDATE` transaction; decoupling lets order DB shard freely; range size trade-off; no monotonicity across servers (L-0101..L-0122, D-12) | **Callback**: "similar to how we did not write to the disk every time" + "Airline check-in system, Ctrl-C, Ctrl-V" | "This is how Amazon does it. Any questions?" |
| 7b | 01:08:14 | 01:10:54 | 2.5 | Q&A: track used IDs to avoid wasting ranges? (S1) -> overhead; we underestimate numbers; 4 billion orders; 2^64 (L-0123..L-0127) | Student-driven; teacher counters with number sense | Student asks "why not UUID?" |
| 7c | 01:10:54 | 01:16:38 | 5.5 | Why not UUID: 128-bit; indexes store row IDs; 16 B vs 4 B -> 1 GB index becomes 4 GB; indexes must fit in RAM; query plan runs on indexes; "first thing I check is index size"; UUIDs good for security (Facebook scraping); fine for small apps (L-0128..L-0145) | Student question turned into a mini-lecture on index internals | "MongoDB is just happy with 96 bits" |
| 7d | 01:16:38 | 01:17:56 | 1.5 | MongoDB ObjectID: 12 bytes = 4 time + 5 random + 3 counter; time on the left again; every case study rejects UUIDs (L-0146..L-0150, D-13) | Comparison with UUID size | Flickr |
| 8 | 01:17:56 | 01:36:01 | 18 | **Flickr ticket servers** | **Why first**: sharded multi-master DB + blog quote "UUIDs index badly" | "Now the next part..." -> Snowflake |
| 8a | 01:17:56 | 01:23:40 | 5.5 | Index in memory heuristic; DB provisioning = sum of index sizes; DB "most brutal component"; ticket table (`id` BIGINT auto-increment, `stub` unique); naive delete+insert -> upsert (L-0151..L-0167, D-14) | "Understand the beauty of this design... like your neighbours are fighting" | "MySQL provides two ways to do it" |
| 8b | 01:23:40 | 01:26:29 | 3 | Upsert: `INSERT ... ON DUPLICATE KEY UPDATE id = id + 1` vs `REPLACE INTO` (teacher benchmarked ~32x slower) (L-0168..L-0173) | Personal benchmark number | "But now what you see is like something like this" |
| 8c | 01:26:29 | 01:31:39 | 5 | SPOF -> two ticket DBs behind round-robin LB, odd/even via `auto_increment_increment = 2` / `auto_increment_offset`; odd server dies at 5, even reaches 202; optional max+buffer reset (240/241) "just for aesthetics"; who resets (SRE) (L-0174..L-0185, D-15, D-16) | Failure walkthrough with numbers; credits S3's 00:48:36 idea ("someone also recommended this approach") | "Any questions on this approach?" |
| 8d | 01:31:39 | 01:36:01 | 4.5 | Q&A: what the stub is for (S3); how the reset works (S3, teacher quizzes "what's the next ID?"); reset value (S3); "isn't it non-monotonic without reset?" (S2) -> "Where did we enforce monotonicity?" (L-0186..L-0188) | Student-driven, teacher turns questions back | "Now the next part" |
| 9 | 01:36:01 | 01:44:43 | 8.5 | **Twitter Snowflake**: decentralized logic; name story; 64 bits; 41 time / 10 machine / 12 counter; runs in API servers; 1024 machines; 4096 IDs per ms per machine; "three lines of code" bit shifts; roughly sortable -> tweet IDs carry time (L-0189..L-0215, D-17, D-18) | **Name story** (real snowflakes are unique) then bit layout | "This is a very interesting byproduct of having roughly sortable IDs" -> pagination |
| 10 | 01:44:43 | 01:54:04 | 9.5 | **Pagination: limit-offset vs ID-based** - Twitter API; deep pages slow (10,000-tweet profile, trending-topics batch job); 2016 MongoDB benchmark graph (linear vs constant, disk-throttle spike); B+ tree log n + sequential scan; no complex WHERE (L-0216..L-0235) | **The promised "side effect" + teacher's own benchmark demo** ("I never thought this would come in this handy") | "before I take question, let me just cover this Snowflake at Discord" |
| 11 | 01:54:04 | 02:03:18 | 9 | **Discord custom epoch, the anti-microservice rant, Snowflake Q&A** | Provocation: "why should I start my time from 1st January 1970?" | "Now let's go into how Instagram does it" |
| 11a | 01:54:04 | 01:57:49 | 4 | Custom epoch (Discord 2015); Sony open-source Snowflake; "good engineers never think like that... microservices are stupid in most cases"; simple systems scale (L-0236..L-0245) | Opinionated rant tied to Snowflake having no moving parts | "Any questions on this before we go to Instagram?" |
| 11b | 01:57:49 | 02:03:18 | 5.5 | Q&A: how he knew the disk throttled (S1, Prometheus node exporter); does ID pagination work in NoSQL (S1, storage engine, data locality, Elasticsearch 10,000 cap); what the counter is (S5, per server); why custom epoch helps (S4, 1676784716) (L-0246..L-0254) | Student-driven | Instagram |
| 12 | 02:03:18 | 02:18:14 | 15 | **Instagram: Snowflake inside the database** | **Admiration hook**: "they deserve to be multi-millionaires... I started cursing" | "Any other questions, anyone?" |
| 12a | 02:03:18 | 02:05:42 | 2.5 | Requirements (time-sortable, 64-bit, no new service); layout 41 time (2011 epoch) / 13 shard / 10 sequence vs Twitter's 41/10/12; "good engineers never think in microservices" (L-0255..L-0264, D-20) | Requirements list -> layout diff against Twitter | "Let's first go into... logical shards" |
| 12b | 02:05:42 | 02:09:26 | 3.5 | Logical shards vs physical servers; thousands of `CREATE DATABASE` per server, max 8192; same schema; migrations on all; dump-and-load to rebalance hot shards (L-0265..L-0276, D-19) | Glimpse of week-5 sharding material | "But now what Instagram does is brilliant" |
| 12c | 02:09:26 | 02:15:18 | 6 | Stored procedure as column default: `insta5.next_id()`; `nextval(...) % 1024`; `(now_ms - epoch) << 23`, `shard_id << 10`, OR sequence; "highly recommend you to implement this" (L-0277..L-0288) | Nostalgia hook ("PL/SQL, no one studied that") then line-by-line code read | "Any questions on this?" |
| 12d | 02:15:18 | 02:18:14 | 3 | Q&A: is `table_id_seq` a column? (S1, no, a sequencer); "we just lifted the logic into the DB?" (S1, no API-server limit now); comparing IDs across machines and who assigns machine IDs (S3, ZooKeeper); wrap-up "implement every single thing" (L-0289..L-0293) | Student-driven | "Any other questions?" |
| 13 | 02:18:14 | 02:25:27 | 7 | Q&A: monotonic inserts / bank vs Instagram (S1); sequences per table (S6); Lamport clocks for gossip (S7); queue of ranges for Amazon (S7); benchmark spike at 6,000 (S2); sequence in cache? (S2) (L-0294..L-0307) | Student-driven | Wrap-up |
| 14 | 02:25:27 | 02:26:36 | 1 | Admin: next week social networks + CDNs; weeks 4-6 senior-engineer perspective, ambiguous systems (L-0308, L-0309) | - | "Go on, [S5]" |
| 15 | 02:26:36 | 02:29:51 | 3 | Q&A: must IDs be numeric for ID pagination? (S5, strings are lexicographic); CDC question deferred to week 5 (S8); does Snowflake need round robin / can it be monotonic? (S6), banks reduce throughput (L-0310..L-0314) | Student-driven | End |

Time budget: foundations (`getid()` evolution, monotonicity, clocks, central service) 45.5 min; Q&A on it 6.5; break 5.5; Amazon + UUID + MongoDB 18; Flickr 18 (4.5 of it Q&A); Snowflake 8.5; pagination 9.5; Discord + rant + Q&A 9; Instagram 15; closing Q&A 10 min. About **22% is Q&A** (rows 5, 7b, 8d, 11b, 12d, 13, 15), and much of it carries real content (custom epoch arithmetic, sequences, bank vs social media, string IDs). It must be folded into the topic sections on the site.

**Introduction patterns observed** (reusable templates):
- **One function, many constraints** (00:02:32-00:39:26): state the simplest `getid()`, add one realistic condition (second machine, threads, reboot, high call rate, need for order, real clocks), show the exact collision, fix it with the smallest change. The teacher warns against jumping ahead: "Don't directly jump into that" (00:03:29).
- **Collision -> "add the thing that caused it"** (00:07:20), then **"what's the cheaper alternative?"** (static counter instead of thread ID, 00:09:55; flush frequency instead of every write, 00:21:51).
- **Toy numbers on the board** for every failure: 1729, `M1-T1-1729`, flush-at-3 crash (6 flushed, 8 issued, restart at 10), skewed clocks 23/24/23/23, odd/even 5 vs 202, range 0-500/500-1000.
- **Build-up-and-break toward an impossibility** (00:39:26-00:44:03): central server -> SPOF -> two servers -> gossip -> "not possible" -> **relax the constraint**.
- **Company design = callback to a first-half building block**: Amazon = flush-frequency batching (01:01:26) + airline transaction (01:07:22); Flickr = DB as ID service (S2's 00:47:34 question) + safest value (01:34:50) + S3's increment-by-N idea (01:27:02); Snowflake = static counter (01:39:44, 02:01:15) + time on the left; Instagram = Snowflake + sequencer as static counter (02:20:10).
- **"Why" placed late**: the reason custom IDs are needed (multi-master auto-increment conflict) comes at 00:45:11, after the class has felt the problem. Same with UUID (asked at 00:49:45, answered at 01:10:54).
- **Demo from his own past**: MongoDB pagination benchmark (01:46:19-01:53:37), REPLACE INTO benchmark (01:24:28).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:04:29 | "Why can't our ID generation function just return my current epoch millisecond?" (rhetorical) | - | "That should work fine, but obviously something would break, because if it was the case, then everyone would be using this" (00:05:00) | Fine on one machine if never called twice in a millisecond (L-0011..L-0013) |
| P2 | 00:05:42 | "What if there are multiple machines? ... When that happens, what would happen?" (rhetorical) | - | "Collision... both would generate the same ID" | Concatenate machine ID: `M1-1729`, `M2-1729`; "add something that led to the collision" (L-0015, L-0016) |
| P3 | 00:08:02 | "But what if our program has threads?" (rhetorical) | - | Two threads on two cores in the same millisecond | Append thread ID (`M1-T1-1729`) or use a static counter (L-0019, L-0020) |
| P4 | 00:11:51-00:12:58 | "Given that the counter is atomically increasing, time is redundant... So can we remove that?" (rhetorical) | - | "For sure can... our IDs would become shorter" | `machine ID + counter`: `M101, M102` (L-0027) |
| P5 | 00:14:41 | "What if your machine reboots? ... So how do you solve it?" | S9: "Back it up with the file locally" (00:16:02) | "Because volatility is the problem" - accepted; writes `load()` / `save_counter()` code | File-backed counter (L-0030..L-0033) |
| P6 | 00:17:06 | "We are making massive micro disk IOs. How do you mitigate this problem?" | S2 (00:18:06): a third part in the ID - a boot counter read and incremented once at startup, static counter restarts from 0 | Pushes back three times ("But how is the solving problem of frequent disk IOs?", "But you are still doing save counter every time, right?") until he gets it: "Okay, okay. That's a good one"; then "But then what's the downside of this?" - S2: startup increment must be atomic; longer ID. "I loved your approach" (00:20:01) | Accepted; long IDs flagged as a cost, revisited at 01:16:38 (L-0037..L-0039) |
| P6b | 00:20:47 | "[S5], what else can we do to minimize this?" | S5 (00:20:52): "bank of IDs" - read 1, store 1001, use 1000 in memory | Reframes: "you are minimizing the number of times you have to write to the disk by writing in a periodic manner"; "this comes in handy at two different places" (foreshadows Amazon) | Flush frequency (L-0040..L-0043) |
| P7 | 00:23:01-00:24:05 | "The last value that was written was 6. The ID that was generated was already 8. ... if I start from 6... So the safest value that...?" (rhetorical, worked on board) | - | Starting from 6 would reissue 7, 8 | Last flushed + flush frequency + 1 = 10; losing 8 and 9 is fine, "correctness of the system matters more" (L-0044..L-0046, D-05) |
| P8 | 00:25:35 | "What if I want to enforce a monotonically increasing constraint to my IDs? ... why someone would need this kind of monotonicity?" | - | "I'll give you a practical example" | Airline check-in T1 vs T2: ordered IDs decide which write is newer in conflict resolution (L-0050..L-0053) |
| P9 | 00:28:53 | "What if we flip the order? ... concatenation of time and then machine ID?" | - | Time = most significant bits; within one millisecond `17290002` may come before `17290001` | Almost monotonic, stateless, "pretty decent" (L-0055..L-0061, D-07) |
| P10 | 00:33:59 | "First of all, why do clocks go out of sync?" (rhetorical) | - | Quartz crystal; heat/cold changes vibration | Clocks drift; periodic NTP sync needed (L-0065..L-0068; see factcheck L-0067) |
| P11 | 00:37:13 | Four machines 2, 4, 7, 9 with times 23, 24, 23, 23; requests in order M2, M4, M7, M9 - which IDs come out? (worked on board) | - | 232, 244, 237, 239 - "this is not monotonically increasing" | Clock skew breaks ordering; strict monotonicity in a distributed generator "almost impossible" (L-0071..L-0073, D-08) |
| P12 | 00:40:04 | "In a single machine, clock skewness would not affect. ... Why? I'll tell you why." (rhetorical) | - | NTP slows the clock instead of moving it back | One server gives monotonic IDs, but is a SPOF (L-0076..L-0078; see factcheck L-0076, L-0077) |
| P13 | 00:41:12-00:43:04 | "You cannot have one machine... you add one more machine. ... So how do people go about it?" (rhetorical) | - | Two servers must gossip on every ID: lose throughput, "very messy" | "No way" to have distributed + strictly monotonic + high throughput -> relax constraints (L-0079..L-0082, D-10) |
| P14 | 00:43:04 | (voiced objection) "But MySQL server has monotonic IDs." | - | "Single machine. It's not distributed... Try putting MySQL server in multi-master mode with an auto-increment ID" | Monotonic only because one engine owns the counter (L-0083, L-0084) |
| P15 | 00:45:11 | "Why do we need ID generation? ... MySQL or any database, it has ID, MongoDB has ID." | - | Two MySQL masters both auto-increment 1, 2, 3, 4 | Multi-master / sharded writes need custom IDs (L-0087, L-0088, D-11) |
| P16 | 01:09:05 / 01:09:36 | "Why would you want to do that?" / "Imagine big integer 2^64. Will you ever exhaust that number?" | S1 (01:08:50): track used IDs so a rebooted server resumes its range instead of wasting 9,900 IDs | "Imagine the overhead... in order to keep track of every single one of them"; "we tend to underestimate the numbers" | Accept waste; use 64-bit (L-0123..L-0127) |
| P17 | 01:16:38 | "What's stopping them [MongoDB] from going for UUIDs? Nothing. To reduce by four bytes they went for [12]." | - | - | Smaller IDs index better; time on the left (L-0146..L-0149, D-13) |
| P18 | 01:22:26 | "You want to naively use a database as [the ID generator]... You would delete this and add a new row. When you add a new row, what would you get?" | - | "You cannot insert a row with nothing" -> stub column; delete + insert = upsert | `INSERT INTO tickets (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id + 1` (L-0165..L-0172, D-14) |
| P19 | 01:27:02 | "But how do you ensure uniqueness? How do you ensure that they don't conflict?" (two ticket DBs) | (S3's 00:48:36 idea, credited: "someone also recommended this approach") | Increment by 2, offset 1 / 2 | Odd/even servers behind round-robin LB (L-0176..L-0179, D-16) |
| P20 | 01:29:01 | "But what happens when it goes down? What do you do?" | - | Odd server dies at 5; even reaches 202; odd resumes 7, 9 next to 204, 206 - "doesn't look aesthetically pleasing" | Optional reset to max + buffer (240/241); "just for aesthetics" (L-0181..L-0183) |
| P21 | 01:33:45-01:34:15 | "Let's say it died off at five... If odd server comes back up, what would be the next ID that would be generated?" (to S3) | S3: "Whatever value was" -> "Seven" | Even side is at 204 | Reset optional; "you are the architect"; start from the safest value (L-0186) |
| P22 | 01:35:38 | "Where did we enforce monotonicity?" (to S2) | S2 (01:35:16): without max+buffer reset the IDs are not monotonic | "We are not enforcing monotonicity. It's a nice byproduct to have" | Social media does not need it (L-0187, L-0188) |
| P23 | 01:41:17 | "When would Snowflake even see a collision where same IDs are getting generated?" (rhetorical) | - | One machine handling more than 4096 requests in one millisecond | "No one can do that" (L-0205..L-0207; see factcheck L-0207 on the arithmetic) |
| P24 | 01:46:19 | "You'll say, why would someone scroll through person's profile? Okay. Let me give you another example." (rhetorical) | - | Batch job reading the last hour of tweets for trending topics | Deep iteration is common, so pagination cost matters (L-0219, L-0220, L-0226) |
| P25 | 01:54:04 | "If my company is starting in 2011 or 2015, why should I start my time from 1st January 1970? Can I not get a custom epoch?" | S4 (02:01:25): "epoch is just a number... how is it saving us?" | Shows 1676784716 ms and the 41-bit ceiling; S4: "we are essentially subtracting the start time" - accepted | ~35-45 more years of IDs (L-0237, L-0238, L-0252..L-0254) |
| P26 | 02:16:14 | (student) "We just lifted the logic from API server and put it in a DB, right?" | S1 | "So now you have large number. You can have more than 10,000, 50,000 API servers also... Twitter can only have 2^10" | Limit moves to 8192 logical DBs (L-0291, L-0292) |
| P27 | 02:18:48 | "Imagine bank, would bank use Snowflake ID?" | S1 (02:18:14): do Snowflake inserts guarantee monotonic order? | "Snowflake is not monotonically increasing... If you need strict monotonic, auto-increment is the way to go" | Social media tolerates disorder; banks do not (L-0294, L-0295) |
| P28 | 02:23:10 | (student) "Can't the servers read from a queue that the ID generator publishes to?" | S7 (02:22:47); S7: "exactly-once delivery?" | "Why not?... not one ID at a time, but batch"; "you are offloading the atomicity to the queue" | Core property = atomic reads; DB, queue, DynamoDB, Redis all fine (L-0302..L-0304; see factcheck L-0303) |
| P29 | 02:24:51 | "What cache? ... What if your database reboots? It would start from zero." | S2 (02:24:39): keep `table_id_seq` in cache, not disk | Same reboot logic as P5 | Sequence must be persistent; DB optimizes flushing itself (L-0306, L-0307) |
| P30 | 02:28:34 | "Not necessarily. Why? You're not guaranteeing [monotonicity]." | S6 (02:28:23): Snowflake requests must be round robin to increase? S6: for banks, reduce throughput? | "You cannot guarantee monotonicity in distributed setup... that's holy grail... written in stone" | Accept rough sortability, or give up throughput (L-0312..L-0314) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Your server saves its ID counter to disk only every 3rd ID. It flushed 6, handed out 7 and 8, then crashed. On reboot, which number is safe to start from - and why is wasting 8 and 9 fine?"** (P7, 00:23:01-00:24:45). Readers can compute it (answer 10), it is the lecture's most reused idea (the "safest value" returns at Flickr, 01:34:50), and it teaches correctness over neatness.
2. **"Saving the counter on every call hammers the disk. Find two ways to touch the disk far less often - without ever reissuing an ID."** (P6/P6b, 00:17:06-00:21:51). Two real student answers (boot counter, bank of IDs) give the reader something to compare against; the bank idea becomes Amazon's design an hour later.
3. **"Four servers have clocks reading 23, 24, 23, 23 ms. Requests hit machines 2, 4, 7, 9 in that order and IDs are time-then-machine. Write down the four IDs. Are they increasing?"** (P11, 00:37:13). Concrete arithmetic (232, 244, 237, 239) shows clock skew breaking order better than any definition.
4. **"Two MySQL masters both use AUTO_INCREMENT on the same table. What IDs do the first four writes on each get? How would you fix it with a single config change?"** (P15 + P19, 00:45:11, 01:27:02). Builds the "why custom IDs" motive and lets the reader invent odd/even before seeing Flickr.
5. **"Why not just put time on the right? Flip `machine-time` to `time-machine` and say what you gain, and what still can go wrong inside one millisecond."** (P9, 00:28:53-00:32:52). Gives the reader "time on the leftmost side", the pattern behind every scheme in the lecture.
6. **"Snowflake gives 41 bits to time, 10 to machine, 12 to a counter. How many machines can generate IDs? How many IDs can one machine make per millisecond before it would collide?"** (P23, 01:39:44-01:41:17). Bit arithmetic readers can do (1024; 4096) and reuse on Instagram's 41/13/10.
7. **"Your index is 1 GB with 4-byte IDs. You switch to UUIDs. Roughly how big is it now, and why does that matter more than disk space?"** (01:12:18, 7c). Turns "UUIDs index badly" into a size + fits-in-RAM argument; pair with factcheck L-0135 (vs BIGINT it is 2x).
8. **"Showing page 1,000 of a user's tweets with LIMIT 10 OFFSET 9990 gets slower the deeper you go. Your IDs start with a timestamp. Rewrite the query so every page costs the same."** (P24, 01:45:41-01:52:28). The lecture's promised "side effect"; the benchmark graph is the payoff.
9. **"The odd ticket server died at 5; the even one is now at 202. The odd one comes back. What does it issue next - and is that actually a bug?"** (P20-P22, 01:29:01-01:35:51). Students got this wrong live (S2 expected monotonicity), so it is a good test of "what did we actually promise?".
10. **"Would a bank use Snowflake IDs for its transaction list? Would Instagram? What does each give up?"** (P27 + P30, 02:18:48, 02:28:42). Short, memorable close on "relax the constraint" vs "pay with throughput".

Runner-ups: "Why start the 41-bit clock in 1970 if your company was founded in 2015?" (P25, 01:54:04) - better as a "now you try" after #6; "Can a database itself be your ID service?" (P18, 01:22:26) - better as the Flickr section opener.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:34:22 | Water heated by fire boils, cooled freezes - "when you throw energy at a thing, it vibrates faster" (L-0066) | Why quartz clocks drift with heat/cold | Keep as a side note; factcheck L-0067 says the drift direction is subtler than "heat = faster" |
| 01:20:38 | **Neighbours fighting**: you know both are wrong but it's their life; pick the good parts (L-0161) | How to read another company's design (beauty over fault-finding) | Good framing box before the four case studies |
| 01:36:39 | **No two snowflakes are alike** (Numberphile video) (L-0191, L-0192) | Why the algorithm is called Snowflake (uniqueness) | Opening line for the Snowflake section |
| 01:36:39 | "When we hear Windows, we think about operating system and not the physical windows" | Naming collisions in CS (aside) | Optional aside |
| 01:07:22 | "Airline check-in system, Ctrl-C, Ctrl-V over here" (L-0121) | Range allocation = the same locked read-update transaction | Link to the week-2 lesson when it exists |
| 02:12:09, 02:20:10 | Database sequencer = "exactly what a static counter did back in that other logic" (L-0298) | What `nextval` does | Callback box: "you already built this" |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:01:00, 02:14:07 | Past-cohort students implemented the schemes and "were so amused" (L-0007, L-0286) | Implement to understand | "Try it" boxes per scheme |
| 00:06:43 | Epoch 1729 -> `M1-1729`, `M2-1729`; `M1-T1-1729` (D-02, D-03) | Collision and its fix | Use the same number throughout, as he does |
| 00:13:57 | Integer limit ~4 billion; 2^64 "a massive number" (L-0028) | Counter overflow | factcheck inline: signed INT is ~2.1 billion |
| 00:21:51 | Flush every 1000 IDs -> disk IO cut by 1000x (L-0042) | Periodic persistence | - |
| 00:22:51-00:24:45 | Flush frequency 3: flushed 3, 6; issued up to 8; restart at 10 (L-0044, L-0045, D-05) | Safest value | Animate as a timeline |
| 00:26:40 | Week-2 airline check-in: T1 before T2, newer write wins (L-0051, L-0052) | Why ordering matters | - |
| 00:29:10 | `17290001, 17290002, 17300001` (L-0056, D-07) | Time-first IDs sort by time | - |
| 00:33:20 | SRE/DevOps teams run NTP sync jobs (L-0064) | Clocks drift in practice | factcheck inline: it's a daemon that slews |
| 00:36:10 | **Jeff Dean & Sanjay Ghemawat chasing a bit flipped by a natural phenomenon** ("friendship that made Google special") (L-0069) | "You cannot run away from nature" | Side story; keep the article pointer |
| 00:37:13 | Machines 2/4/7/9, clocks 23/24/23/23 -> 232, 244, 237, 239 (L-0071, D-08) | Clock skew breaks order | Prompt #3 |
| 00:46:02 | Two MySQL masters both issuing 1, 2, 3, 4 (D-11) | Why custom IDs | Prompt #4 |
| 00:59:55 | **Amazon ID team "sat right next to me"**; public tech talk (L-0101) | Credibility of the Amazon design | Keep attribution as the teacher's account |
| 01:00:53 | Amazon-style service in ~150 lines of Python (L-0104) | Simplicity; go build it | "Try it" box |
| 01:02:49-01:04:46 | Orders/payments; ranges 0-500, 500-1000, later 3000-3500; refill at 490 of 500 (L-0109..L-0119, D-12) | Batched range allocation | Diagram walk |
| 01:05:23 | Real batch sizes 10,000 / 50,000 / 100,000 (L-0116) | Tuning batch size to throughput | - |
| 01:09:52 | "The difference between a million and a billion is almost equal to a billion"; 4 billion Amazon orders (L-0126, L-0127) | Number sense: wasted ranges don't matter | Callout |
| 01:12:18 | 16-byte UUID vs 4-byte int: 1 GB index -> 4 GB (L-0135) | Index bloat | factcheck: 2x vs BIGINT; teacher hedges at 01:18:51 (L-0154) |
| 01:14:14 | "When someone says my database is slow, the first thing I do is check their index sizes" (L-0139) | Index-in-RAM rule | War-story callout |
| 01:15:12 | Facebook exposing 1, 2, 3 IDs -> `for i < 1 billion` scraping (L-0144) | UUIDs resist enumeration | factcheck L-0143: not a security control |
| 01:16:38 | MongoDB ObjectID 12 bytes = 4 time + 5 random + 3 counter (L-0146, D-13) | Smaller + time-first | - |
| 01:18:51 | Flickr blog: "if you cannot fit indexes in memory you cannot make your database fast"; provision RAM >= sum of index sizes (L-0155, L-0156) | Sizing heuristic | factcheck inline on buffer-pool headroom |
| 01:24:28 | **Teacher benchmarked `REPLACE INTO` ~32x slower than `ON DUPLICATE KEY UPDATE`** (L-0171) | Pick the cheaper upsert | factcheck L-0171/L-0172: Flickr actually uses REPLACE INTO |
| 01:29:01-01:30:01 | Odd dies at 5; even at 202; odd resumes 7 next to 204; reset to 240/241 (L-0181, L-0182, D-16) | Recovery and aesthetics | Prompt #9 |
| 01:39:44-01:41:17 | 2^10 = 1024 machines; 2^12 = 4096 IDs per ms per machine (L-0202, L-0205) | Snowflake capacity | factcheck L-0207: 4096/ms = ~4 million/s, not 400,000 |
| 01:43:36 | Click any tweet: the integer in the link is a Snowflake carrying its creation time (L-0214) | IDs are time-sortable | Have readers decode one |
| 01:45:41 | Scrolling an account with 10,000 tweets; pages 6, 7, 8 get slower (L-0219) | Deep offset is slow | - |
| 01:46:19 | Trending-topics batch job over the last hour of tweets (L-0220) | Iteration workloads | - |
| 01:46:19-01:51:48 | **2016 MongoDB pagination benchmark, "bored at Amazon"**: skip-limit linear, ID-based constant; disk-throttle spike "I was so happy" (L-0221, L-0230, L-0231) | The side effect, proven | Reproduce the graph shape (no new data) |
| 01:57:59 | Prometheus node exporter, running for a Wikipedia search engine he was building (L-0246) | How he saw the throttle | Footnote |
| 01:59:56 | Elasticsearch: hard 10,000-document cap on offset pagination, "use cursor" (L-0250) | Industry confirms the rule | factcheck inline: `index.max_result_window`, `search_after` |
| 01:55:09 | Discord epoch 2015; Sony's open-source Snowflake on GitHub (L-0239, L-0240) | Custom epoch; read real code | factcheck L-0240: Sonyflake layout differs |
| 02:01:37 | Current epoch 1676784716 s (+000 for ms) (L-0253) | Why a custom epoch buys range | Prompt follow-up |
| 02:03:18 | "When I first read that blog, I started cursing" - Instagram's early engineers "deserve to be multi-millionaires" (L-0255) | Admiration hook | Section opener |
| 02:06:36 | Up to 8192 logical shards on ~10-15 physical servers; `CREATE DATABASE Instagram 1..5000` (L-0268, L-0269, D-19) | Logical vs physical shards | factcheck: Postgres schemas |
| 02:09:26 | "PL/SQL, no one studied that... I did study this in college" (L-0277) | Neglected tools can be the elegant answer | - |
| 02:18:48 | Bank transaction list vs Instagram feed (L-0295) | When strict order matters | Prompt #10 |
| 02:24:22 | Benchmark spike at 6,000 records = other local processes contending (L-0305) | Benchmark noise | Footnote to the graph |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:03:29 | Function in business logic vs central ID service | Start simple; service only when needed |
| 00:09:55-00:12:10 | Append thread ID vs atomic static counter (L-0021, L-0026) | ID length |
| 00:17:06-00:21:51 | Save every time vs boot counter (S2) vs flush frequency (S5) | Disk IO count vs ID length |
| 00:28:53 | `machine-time` vs `time-machine` (L-0055) | Which part is most significant decides order |
| 00:27:51 | Strictly sequential vs monotonic (L-0054) | Gaps allowed |
| 00:40:04-00:42:02 | One clock (single server) vs many clocks (distributed) | Ordering needs one source; costs SPOF/gossip |
| 01:36:01 | Central service (Amazon, Flickr) vs decentralized logic (Snowflake) (L-0189) | Moving parts, network call per ID |
| 01:02:49 | Individual IDs vs (start, end) range (L-0111) | Network payload, call frequency |
| 01:06:01 | Small vs large batch (L-0117) | Call frequency vs IDs lost on crash |
| 01:11:11-01:17:56 | UUID 16 B vs MongoDB 12 B vs Snowflake 8 B vs MySQL INT 4 B (L-0135, L-0146, L-0148, L-0194) | Index size, RAM fit |
| 01:15:12 | UUID unpredictability vs sequential IDs (L-0143) | Scraping vs indexing |
| 01:24:28 | `INSERT ... ON DUPLICATE KEY UPDATE` vs `REPLACE INTO` (L-0170, L-0171) | Delete+insert cost |
| 01:30:01 | Correctness vs aesthetics (L-0183) | Uniqueness is the only promise |
| 01:47:55-01:52:28 | Limit-offset vs ID-based (keyset) pagination (L-0224, L-0225, L-0233, L-0234) | Deep pages vs complex WHERE |
| 01:59:03 | Storage with data locality vs hash-distributed (L-0247, L-0248) | Whether ID scans are sequential |
| 01:54:04 | 1970 epoch vs custom epoch (L-0237) | Usable range of 41 bits |
| 02:03:51, 02:05:03 | Twitter 41/10/12 in API servers vs Instagram 41/13/10 in the DB (L-0257, L-0264) | Where the logic lives; what the limit is (API servers vs shards) |
| 02:05:42 | Logical shard vs physical server (L-0267) | Cheap moves via dump/load |
| 02:18:48, 02:29:14 | Social media (rough order) vs bank (strict order) (L-0295, L-0314) | Need for order vs throughput |
| 02:23:24 | Atomicity from DB vs queue vs DynamoDB vs Redis (L-0303) | Any system with the core property |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:07:20 | "Whenever you see a collision, you try to add something that led to that collision" (L-0016) | Rule card in the foundations section |
| 00:24:05, 01:30:49, 01:34:50 | "Think of correctness. Think of the safest value that you would want to start with" (L-0045, L-0048) | Recurring "safest value" badge (counter restart, Flickr reset) |
| 00:24:05 | "Don't think of a thread and timer... as simple as a mod operation" (L-0047) | Simplicity note |
| 00:31:06, 01:16:38, 01:38:17, 01:52:28 | "Time is always on the leftmost side" (L-0060, L-0149) | Recurring pattern highlight in every layout diagram |
| 00:44:03, 00:50:05, 00:51:25 | "Everything in computer science is a trade-off" / "You get some, you lose some" (L-0085, L-0096) | Trade-off callouts |
| 00:44:03, 00:49:12, 00:49:50 | "Ask critical questions... can we not relax these constraints?" (L-0086) | Decision-guide intro |
| 00:43:04, 01:35:51, 02:18:48 | "Not everyone needs monotonicity" (L-0082, L-0188) | Recurring caveat |
| 00:01:00, 01:00:53, 02:14:07, 02:17:34 | "Implement every single one of these" (L-0007, L-0286) | "Try it" boxes |
| 00:03:29, 01:56:01, 02:04:39 | "Don't directly jump into [a service]" / "Good engineers never think in microservices. They think in problems and solutions" / "microservices are stupid in most cases" (L-0010, L-0241, L-0244) | Opinion box (label as the teacher's view) |
| 01:01:26, 01:56:01 | "I don't like to necessarily complicate things" / "simple systems scale" (L-0106, L-0245) | Section closer |
| 01:00:14 | "Batching is one of the most [effective ways to get] performance out of any system" (L-0103) | Links flush frequency and Amazon |
| 01:12:18, 01:14:14, 01:18:51 | "Fit all the indexes in RAM" / "the first thing he or she looks at is the index size" (L-0136, L-0139, L-0156) | Rule card (with factcheck L-0136 wording) |
| 01:20:09 | "Database is the most essential but most brutal component" (L-0157) | Backward link to lec01's "most critical and most brittle" |
| 01:09:52 | "Think about practicality at every step" / "we tend to underestimate the numbers" (L-0125, L-0126) | Number-sense callout |
| 01:16:20 | "Don't unnecessarily go for the best solution out there. See what works for you" (L-0145) | UUID section closer |
| 01:20:38 | "Focus on the beauty of design rather than pointing out the faults" (L-0160) | Case-study framing |
| 01:59:30 | "Understand how your database stores your data on the disk" (L-0249) | Pagination closer |
| 01:56:01 | "Make data driven decisions. If you show the data, why would they not adopt it?" (L-0243) | Opinion box |
| 02:23:24 | "Focus on the core property... if you get it from any system out there, it's good enough" (L-0304) | Amazon variants box |

---

## 4. The `getid()` evolution and company case-study thread (proposed spine)

There is no product case study; the spine is the evolving function plus the four companies. Each company row notes which earlier `getid()` step it reuses.

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:02:32 | `getid()` must "spit out something unique every time it is invoked", locally | Problem statement | One code box that the reader edits through the whole first half |
| 00:04:29 | `return epoch_ms` | Time is unique and moves forward | v1 |
| 00:06:43 | `machine_id + epoch_ms` | Collision across machines | v2 (D-02) |
| 00:09:02 | `machine_id + thread_id + epoch_ms` | Collision across threads | v3 (D-03) |
| 00:10:42-00:12:58 | `machine_id + ts + counter++` -> `machine_id + counter++` | Atomic static counter; time redundant | v4 (D-04) |
| 00:16:04 | `counter = load(); ... save_counter()` | Persistence across reboot | v5 |
| 00:22:20 | `counter = load() + flush_freq; if counter % 1000 == 0: save` | Flush frequency, safest value | v6 (D-05) |
| 00:28:53 | `epoch_ms + machine_id` | Time on the left -> rough order | v7 (D-07) |
| 00:37:13 | v7 on four skewed clocks | Clock skew | D-08 |
| 00:39:26-00:42:02 | Central ID server; then two behind an LB with gossip | Single clock vs SPOF vs gossip | D-09, D-10 |
| 00:45:11 | Two MySQL masters with auto-increment | Why custom IDs exist | D-11; consider moving to the page opening (section 8) |
| 00:59:55 | **Amazon**: ranges from a relational DB via `FOR UPDATE` (reuses v6 batching + airline transaction) | Central service, batching, decoupling | D-12 |
| 01:10:54 | Why not UUID (student question inside Amazon) | Index size, RAM | Shared "ID size" panel for all schemes |
| 01:16:38 | **MongoDB** ObjectID 4+5+3 | Time-first, 12 bytes | D-13 |
| 01:17:56 | **Flickr**: MySQL ticket table, stub, upsert; odd/even pair (reuses "DB as ID service" question from 00:47:34, S3's increment-by-N from 00:48:36, safest value from 00:24:05) | DB auto-increment as service; SPOF fix without coordination | D-14..D-16 |
| 01:36:01 | **Twitter Snowflake**: 41/10/12 in API servers (reuses v4 counter, v7 time-left) | Decentralized generation | D-17, D-18 |
| 01:43:36 | Tweet IDs carry time -> Twitter API pagination | Side effect: keyset pagination | Board adds `since_id` ("I read till this tweet, give me the next set", L-0212) |
| 01:54:04 | **Discord**: same layout, 2015 epoch | Custom epoch | - |
| 02:03:18 | **Instagram**: 41/13/10 in a Postgres function as column default (reuses sequencer = static counter) | Logic in the DB; logical shards | D-19, D-20 |

Gaps where the thread is *not* used but could carry the content (without inventing claims): the pagination section could reuse Instagram (the teacher says Instagram also processes recent items, 02:03:51) as well as Twitter; the UUID index argument could be shown on Amazon's orders table (the student asked it right there, 01:10:54); the "relax the constraint" lesson (00:44:03) could be revisited explicitly at each company (each states whether it needs monotonicity: Amazon no, 01:02:13; Flickr no, 01:27:02; Twitter/Instagram rough sort, 01:43:36, 02:03:51) - the teacher states these but never lines them up side by side.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:03:29 | ID generation = "I'll start writing a new service" | General ("a lot of people") | Start with a local function; service only if needed (L-0010, L-0241) |
| 00:04:29 | Epoch milliseconds alone are unique | Implied naive start | Collides across machines and threads (L-0012..L-0017) |
| 00:14:41 | An in-memory counter keeps IDs unique forever | Implied | Reboot resets it; persist (L-0030, L-0031) |
| 00:18:23-00:19:07 | (teacher, briefly) S2's boot counter still saves every call | Teacher misread, then corrected himself | Boot counter needs only one save per startup (L-0037) |
| 00:23:01 | Restart from the last flushed value | Implied | Restart at last flushed + frequency + 1 (L-0045) |
| 00:27:51 | Monotonic means 1, 2, 3, 4 with no gaps | General | Gaps allowed; only "greater than all previous" (L-0054; factcheck inline wording) |
| 00:32:52 | All machines' clocks are synchronized | Assumption made so far | Clocks drift; NTP sync (L-0062, L-0064) |
| 00:40:04 | "The clock never goes back in time. Never." | **Teacher** | Wall clocks can step backwards; generators must guard (see factcheck L-0076, L-0077) |
| 00:43:04 | "MySQL has monotonic IDs, so it's solved" | Voiced objection | Only on one machine; multi-master breaks it (L-0083, L-0084) |
| 00:45:11 | Database IDs are enough, why build ID generation | General | Not with multi-master / sharded writes (L-0087, L-0088) |
| 00:47:34 | A shared DB with locks is different from a central ID service | S2 | "That's exactly shared service" (L-0089) |
| 00:52:12 | Restart from the max row ID in the DB avoids periodic saves | S4 | Same as `load()`, and assumes every ID is written to a DB (L-0098, L-0099) |
| 01:08:50 | Wasted range IDs must be tracked and reused | S1 | Overhead not worth it; 64-bit space is vast (L-0123, L-0124) |
| 01:11:11 | "My company uses UUIDs, so they're fine at scale" (voiced hypothetical) | Teacher voicing a listener | Bloat indexes; fine only at small scale (L-0129, L-0145; factcheck L-0129) |
| 01:14:14 | Databases keep indexes in RAM by default | General | Loaded on demand; RAM must fit them (L-0140, factcheck inline) |
| 01:15:12 | UUIDs give security | Teacher (framed as an upside) | They slow enumeration but are not a security control (factcheck L-0143) |
| 01:31:41 | The stub column has some meaning | S3 | Dummy value to trigger the unique-key conflict (L-0166) |
| 01:35:16 | The Flickr reset is needed for correctness / Flickr guarantees monotonicity | S2 | "Where did we enforce monotonicity?" - aesthetics only (L-0183, L-0187) |
| 01:38:57 | Snowflake ran as a library inside Twitter's API servers; 10 bits = API servers | **Teacher** | Twitter's 2010 Snowflake was a separate Thrift service; 10 bits = generator processes (see factcheck L-0201; inline L-0189, L-0199, L-0202) |
| 01:41:17 | 4096 IDs/ms = 400,000 requests per second; "at max have 10 machines" | **Teacher** (arithmetic slips) | ~4 million per second; 1024 machines (see factcheck L-0207) |
| 01:42:21 | Snowflake = "left shift by 23" | **Teacher** (Instagram's shift applied to Twitter) | Twitter: `(ms << 22) OR (machine << 12) OR seq` (see factcheck L-0209) |
| 01:45:41 | Limit-offset is fine for deep pages | General | Linear cost; use ID-based (L-0218, L-0224) |
| 01:58:42 | ID pagination is only for SQL B+ trees | S1 | Any store with ordered locality (MongoDB, DynamoDB); not hash-scattered (L-0247, L-0248) |
| 02:01:25 | A custom epoch can't help - epoch is just a number | S4 | It frees the bits spent on 1970 to now (L-0252, L-0254) |
| 02:15:25 | `table_id_seq` must be a column | S1 | It's a sequencer object (L-0289, L-0290) |
| 02:16:14 | Moving Snowflake into the DB changes nothing | S1 | Removes the 1024-API-server cap (L-0291) |
| 02:18:14 | Snowflake inserts are strictly ordered | S1 | Only rough; banks use auto-increment (L-0294, L-0295) |
| 02:19:27 | Every table automatically gets one sequence | S6 | Only auto-increment columns create one; you can create any number (L-0296, L-0297) |
| 02:21:02 | Gossip uses Lamport clocks | S7 | Teacher: not as far as he knows; and **teacher's own claim that Flickr's servers gossip is wrong** - they never coordinate (see factcheck L-0300; inline L-0299, L-0301) |
| 02:23:19 | A queue gives exactly-once delivery of ranges | S7 (implied) | Atomic reads matter; at-least-once queues need dedup (see factcheck L-0303) |
| 02:24:39 | Sequence can live in cache, not disk | S2 | Must be persistent or a reboot restarts at 0 (L-0306, L-0307) |
| 02:26:36 | ID-based pagination needs numeric IDs | S5 | Strings compare lexicographically (L-0310, factcheck inline on collation) |
| 02:28:23 | Snowflake needs round-robin routing to increase | S6 | No; and monotonicity can't be guaranteed anyway (L-0312, L-0313) |
| 01:17:56 | Flickr = "Instagram of 2010s" | **Teacher** | Flickr launched 2004; "Instagram of the 2000s" (factcheck inline L-0151) |
| 01:25:17 | Flickr's query is `INSERT ... ON DUPLICATE KEY UPDATE` | **Teacher** | Flickr's published query is `REPLACE INTO ... ; SELECT LAST_INSERT_ID()` (see factcheck L-0172) |
| 02:05:03, 02:06:36 | Instagram epoch 1 Jan 2011; logical shards = MySQL `CREATE DATABASE`; PL/SQL | **Teacher** | Epoch 24 Aug 2011; Postgres schemas; PL/pgSQL (factcheck inline L-0261, L-0267, L-0276, L-0277) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Epoch time / Unix timestamp (defined briefly only at 01:54:04), integers and bit widths (2^32, 2^64), left shift / bitwise OR (01:42:21, 02:13:09).
- Threads, cores, heap/static variables, atomic increment, locks/mutex (00:10:42, 00:12:58: "wrap it in locks... or use a native atomic library").
- Volatile memory vs disk; disk IO cost (00:14:41, 00:17:06).
- NTP and clock sync jobs (00:32:52: "If you have worked in SRE team or DevOps team, you know").
- Load balancer and round robin (00:41:12, 01:27:43); single point of failure.
- Sharding and multi-master databases (lec01, used at 00:45:11, 01:17:56).
- SQL transactions with `SELECT ... FOR UPDATE` (week-2 airline check-in, not in corpus; 01:03:37).
- Indexes as B+ trees storing row IDs (week-2 pre-read video, 01:11:11); query execution plans (01:13:18).
- MySQL `AUTO_INCREMENT`, unique keys, `REPLACE INTO` (week-2 KV store, 01:24:28).
- MongoDB queries (`find`, `skip`, `limit`), SQL `LIMIT/OFFSET` (01:44:43).
- Postgres sequences, stored procedures, column defaults (taught lightly at 02:09:26-02:15:41).
- ZooKeeper (named only, 02:17:24), Prometheus/node exporter (named only, 01:57:59), Lamport clocks (student term, 02:21:02).

### Concept graph (A -> B means B builds on A)
```
Uniqueness requirement (00:02:32)
  -> epoch ms (time moves forward) (00:04:29)
       -> + machine ID (collision across machines) (00:06:43)
            -> + thread ID (collision across threads) (00:09:02)
            -> OR atomic static counter (00:09:55) -> time redundant -> machine + counter (00:12:58)
                 -> counter lost on reboot -> persist to disk (00:16:04)
                      -> disk IO per call -> boot counter (S2) / flush frequency (00:21:51)
                           -> safest value on recovery (00:24:05)
                           -> [batching] -> Amazon ranges (01:01:26)
                           -> [safest value] -> Flickr reset (01:30:01, 01:34:50)
                 -> [counter] -> Snowflake 12-bit sequence (01:39:44) -> Instagram 10-bit sequence = DB sequencer (02:12:09, 02:20:10)
  -> ordering requirement (conflict resolution, 00:26:40)
       -> time on the left (00:28:53) -> MongoDB ObjectID, Snowflake, Instagram (01:16:38, 01:38:17, 02:05:03)
            -> roughly sortable IDs -> ID-based (keyset) pagination (01:43:36, 01:48:40)
                 (needs: tables/indexes ordered by primary key, B+ tree log n + sequential scan, 01:52:28)
                 -> Elasticsearch cursor, NoSQL locality (01:59:03, 01:59:56)
            -> 41-bit time range -> custom epoch (Discord, Instagram) (01:54:04, 02:05:03)
       -> clock skew (quartz, NTP) (00:32:52) -> distributed strict monotonicity "almost impossible" (00:38:50)
            -> single central server (one clock) -> SPOF -> two servers + gossip -> impossible at high throughput (00:42:02)
            -> relax constraints (00:44:03) -> UUID allowed? (00:49:50) / no monotonicity (Amazon, Flickr)
            -> strict order only at low throughput: banks + auto-increment (02:18:48, 02:29:14)
  -> multi-master auto-increment conflict (00:45:11) -> custom IDs needed
       -> increment by N / odd-even offsets (S3 00:48:36 -> Flickr 01:27:02)
  -> ID size -> index size -> indexes must fit RAM (01:12:18)
       -> UUID 16 B rejected (01:15:12) -> MongoDB 12 B (01:16:38) -> Snowflake/Instagram 64-bit (01:37:30, 02:03:51)
       -> DB provisioning heuristic (01:18:51)
  -> where ID logic lives: app function (start) | central service (Amazon, Flickr) | API-server library (Snowflake) | inside the DB (Instagram)
       -> Instagram needs logical shards (13-bit shard ID) (02:05:42) -> easy rebalancing by dump/load (02:07:23)
```

Cross-links worth surfacing on the site:
- **Batching / periodic persistence** appears three times: flush frequency (00:21:51), Amazon ranges (01:01:26), and the queue-of-ranges variant (02:23:10).
- **Safest value** appears at counter restart (00:24:05) and Flickr reset (01:34:50).
- **Static counter** reappears as Snowflake's sequence (01:39:44, 02:01:15) and Instagram's DB sequencer (02:20:10); S2's persistence question for the sequencer (02:24:51) is the 00:14:41 reboot problem again.
- **Time on the leftmost side** connects MongoDB, Snowflake, Discord, Instagram and pagination.
- **Atomicity from a single source** connects the static counter, Amazon's `FOR UPDATE`, Flickr's upsert, Postgres `nextval`, and the queue variant ("core property", 02:23:24).

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:00:02 | "The third day second" (flagged; course position) |
| 00:26:40 | "In second week, when we were building airline check-in system... importance of locking", T1/T2 (not in corpus) |
| 01:02:13 | "Given that we covered airline check-in system, this becomes a piece of cake" |
| 01:07:22 | "Airline check-in system, Ctrl-C, Ctrl-V over here" |
| 01:11:11 | "In the second week pre-reads, I shared a video on how indexes make database read faster" |
| 01:17:56 | "Because database was sharded, which is what I always say" (sharding/multi-master, lec01) |
| 01:20:09 | "As I always say, database is the most... brutal component" (lec01 00:48:35 "most critical and most brittle") |
| 01:24:28 | "We saw this in key-value store on relational database. This replaceInto" (week 2, not in corpus) |
| 02:05:42 | "I hope you saw that video on sharding and partitioning that I put on my YouTube and shared in the readings" |
| 00:02:32 (whole lecture) | lec02 closed by promising "distributed systems, ID generators" next week (lec02 ~02:30:12) |

Within-lecture callbacks (useful for the site's internal links): 01:01:26 (flush batching -> Amazon), 01:21:59 (S2's 00:47:34 "use the database as ID service" -> Flickr), 01:27:02 (S3's 00:48:36 increment-by-N -> odd/even), 01:34:50 (safest value), 01:39:44 and 02:01:15 (static counter -> Snowflake), 02:20:10 (sequencer = static counter), 01:16:38 ("in the first half... ID becoming longer is a problem" -> S2's boot counter at 00:20:01).

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:20:01 | Disadvantages of long IDs | Same lecture, 01:11:11-01:17:56 |
| 00:48:22 | How to resolve conflicts when distributed IDs are not ordered (S1) | "We'll talk about that" - only partly answered (02:18:48 banks, 02:28:42) |
| 00:48:53 | Disadvantage of "increment by number of servers" (S3) | Same lecture, Flickr 01:27:02-01:30:01 |
| 00:50:05 | UUIDs, MongoDB IDs, where to use them | Same lecture, 01:10:54-01:17:56 |
| 00:54:17 | Amazon, Flickr, Twitter, Instagram, pagination | Same lecture, after break |
| 01:38:17 | "We'll take a look at pagination because of this" | Same lecture, 01:44:43 |
| 01:52:04 | How databases physically store data (B+ tree) | Teacher's members-only YouTube video (outside course) |
| 02:05:03 | Instagram's sharding structure | Same lecture, 02:05:42 |
| 02:07:23 | Moving logical partitions / sharding in depth | Week 5 |
| 02:21:22 | Name of the gossip protocol he used ("if I remember I'll tell you") | Unresolved |
| 02:25:27-02:26:00 | Social networks, CDNs in depth, building social network services | Next week (week 4) |
| 02:26:00 | Senior-engineer perspective, ambiguous systems, own requirements | Weeks 4-6 |
| 02:27:40, 02:29:29 | CDC (change data capture) in depth | Week 5 |

Site handling: keep these as "coming in a later lesson" chips (with week number). The in-lecture deferrals become internal "answered below" links.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student proposals) must survive. Q&A answers should be redistributed into the topic they belong to (mapping below the options).

### Option A - "Evolve one function, then meet the companies" (RECOMMENDED)
1. **Why custom IDs at all** (moved up from 00:45:11): two MySQL masters both issuing 1, 2, 3, 4 (prompt #4, D-11) + the three motivations (00:00:02-00:01:00) + "most companies hit that scale sooner than they think". Then the problem statement and "a function, not a service" (00:03:29).
2. **Build `getid()` step by step** (one editable code box): epoch ms -> machine ID -> thread ID or static counter -> drop time -> persist -> disk IO (student ideas: boot counter, bank of IDs; prompt #2) -> flush frequency + safest value (prompt #1). Close with the two key takeaways (00:24:05).
3. **Ordering**: why (airline T1/T2) -> monotonic vs sequential -> time on the left (prompt #5) -> clock skew (quartz, NTP, Jeff Dean side story, prompt #3) -> central server -> SPOF -> gossip -> "no way" -> **relax the constraint** card (UUID? no order? 00:44:03) + MySQL objection.
4. **How big should an ID be?** (moved forward from 01:10:54 as a shared panel): index bloat (prompt #7), indexes in RAM, provisioning heuristic, UUID security upside and small-app exception, MongoDB 12 B. Every later company refers back to this.
5. **Four company designs, each tagged with the building block it reuses**: Amazon (batching + transaction; queue-of-ranges variant; wasted-range number sense) -> Flickr (DB as service, stub, upsert, odd/even, recovery = safest value, prompt #9) -> Twitter Snowflake (41/10/12, prompt #6) + Discord custom epoch -> Instagram (41/13/10, logical shards, stored procedure).
6. **The side effect: pagination** (prompt #8): limit-offset vs ID-based, benchmark graph, B+ tree, Elasticsearch cap, NoSQL locality, string IDs.
7. **Close**: "would a bank use Snowflake?" (prompt #10), the anti-microservice opinion box, heuristics card, "coming later" chips.

Pros: keeps the teacher's best move (the one-function build-up, 45 min of tight Socratic narrative) intact and in his order; the companies land as payoffs because each reuses something the reader just built; only two moves (why-first, ID-size panel) change his order, both to answer questions students actually asked early (00:45:11 "should be the first thing", 00:49:45 UUID). Cons: pagination moves after Instagram (the teacher put it right after Snowflake), so the "tweet IDs carry time" hook needs a short bridge; long page.

### Option B - "Where is the ID born?" (placement ladder)
Organize by where the generation logic lives: (1) inside one app function (the whole first half), (2) a central service (single server, gossip pair, Amazon ranges), (3) the database itself (MySQL auto-increment, multi-master conflict, Flickr ticket servers, Instagram stored procedure), (4) a library in every server (Snowflake, Discord, Sony, MongoDB ObjectID), then pagination and the UUID size panel as cross-cutting chapters.
Pros: matches the teacher's strongest opinion (don't default to a service; Instagram "did not want to build a new service"); puts Flickr and Instagram side by side as "DB as ID generator". Cons: breaks the first-half narrative (the central server at 00:39:26 is part of the monotonicity story); splits Snowflake (library) from Instagram (DB) though Instagram is explicitly "Snowflake tweaked".

### Option C - "Requirements-first decision guide"
Start from the questions the teacher says to ask (00:44:03): unique only? roughly time-sorted? strictly ordered? 64-bit or can it be 128? throughput? no new service? Each answer routes to a scheme: UUID (small app), Amazon ranges (unique, central OK), Flickr (unique, DB already there), Snowflake/Discord (time-sorted, no service), Instagram (time-sorted, sharded DB, no service), auto-increment on one DB (strict order, banks). Foundations become an appendix "why these trade-offs exist".
Pros: excellent revision/reference tool; turns "relax the constraint" into navigation. Cons: loses the build-up that makes the lecture memorable; the student proposals (boot counter, bank of IDs) lose their context; weak for first read.

**Recommendation**: Option A for the main page. Add Option C's decision table as the recap at the end (it summarises "ask critical questions" well), and Option B's placement axis as a small diagram in the company section ("app / service / DB / library") so readers see where each scheme sits.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| S9: back counter up with a local file (00:16:02) | Build `getid()` - persist step |
| S2: boot counter as third ID part; downside atomic + longer ID (00:18:06-00:20:17) | Build `getid()` - disk IO step (student proposal 1); link to ID-size panel |
| S5: bank of IDs, +1000 (00:20:52) | Build `getid()` - flush frequency (student proposal 2); link to Amazon |
| S2: shared DB with locks instead of shared service (00:47:34) | Central server step; link forward to Flickr (01:21:59 credits it) |
| S1: resolving conflicts if distributed IDs aren't ordered (00:48:11) | Ordering - "relax" card; answered by bank vs social media (02:18:48) |
| S3: auto-increment by number of servers (00:48:36) | "Why custom IDs" opener as reader exercise; payoff at Flickr odd/even |
| S3: random ID instead of static counter (00:48:59) | Ordering - "relax" card (random gives no order) |
| S3: why not UUID instead of all this (00:49:45) | Relax card -> ID-size panel |
| S2/S3: each ID server appends its own ID (00:50:30-00:51:25) | Central server step (works, loses monotonicity; "no one right way") |
| S4: restart from last row ID saved in DB (00:52:12-00:53:35) | Build `getid()` - persist step (same as `load()`; assumes a DB write per ID) |
| S1: track used range IDs to avoid waste (01:08:16-01:10:54) | Amazon - batch size trade-off + number-sense callout |
| S?: why not UUID if monotonicity not needed (01:10:54) | ID-size panel (opener) |
| S3: what is the stub for (01:31:41-01:33:04) | Flickr - stub explanation |
| S3: how the reset with buffer works (01:33:09-01:34:38) | Flickr - recovery (prompt #9) |
| S3: what value to reset to (01:34:38) | Flickr - recovery; safest value badge |
| S2: without reset IDs aren't monotonic (01:35:16-01:35:51) | Flickr - "correctness vs aesthetics" callout |
| S1: how he knew the disk throttled (01:57:51) | Pagination - benchmark footnote |
| S1: does ID pagination work for NoSQL (01:58:42-02:01:01) | Pagination - storage engines, Elasticsearch cap |
| S5: what the counter is in Snowflake (02:01:02) | Snowflake - "you already built this" callback |
| S4: how a custom epoch saves range (02:01:25-02:03:13) | Discord - custom epoch worked example |
| S1: is `table_id_seq` a column (02:15:25) | Instagram - sequencer explanation |
| S1: logic just lifted into the DB? (02:16:14-02:16:59) | Instagram - Twitter vs Instagram limits |
| S3: comparing IDs across machines; who assigns machine IDs (02:17:06-02:17:30) | Snowflake - machine ID box (ZooKeeper) |
| S1: are Snowflake inserts monotonic; bank vs Instagram (02:18:14-02:19:25) | Close - prompt #10 |
| S6: does every table get a sequence (02:19:27-02:20:10) | Instagram - sequencer explanation |
| S7: Lamport clocks for gossip (02:21:02-02:22:47) | Central server step - gossip note (with factcheck L-0300 correction on Flickr) |
| S7: queue of ranges for Amazon; exactly-once (02:22:47-02:24:01) | Amazon - variants box ("core property") |
| S2: benchmark spike at 6,000 records (02:24:03) | Pagination - benchmark footnote |
| S2: keep sequence in cache, not disk (02:24:39-02:25:27) | Instagram - sequencer persistence (callback to reboot problem) |
| S5: must IDs be numeric for ID pagination (02:26:36-02:27:25) | Pagination - string IDs |
| S8: CDC question (02:27:25-02:28:21, 02:29:29) | Forward chip (week 5) |
| S6: Snowflake and round robin; monotonicity; banks reduce throughput (02:28:23-02:29:28) | Close - prompt #10 / Snowflake "roughly sortable" box |

### Things a reader-first version should fix (not drop)
- Put the "why do we need custom IDs" answer (00:45:11) first; the teacher himself says "that should be the first thing that we should answer".
- Correct the teacher's factual slips with the fact-check notes, keeping his point: clock "never goes back" (L-0076/L-0077), Snowflake as a separate Twitter service and what the 10 bits count (L-0201, L-0189, L-0199, L-0202), 4096/ms = ~4 million/s and "at max 10 machines" -> 1024 (L-0207, 01:42:21), Twitter shift 22 not 23 (L-0209), Flickr servers do not gossip (L-0300, L-0301), Flickr's real query uses `REPLACE INTO` (L-0172) - awkward next to the 32x benchmark, so say both, Flickr dates (L-0151), Instagram epoch, Postgres schemas and PL/pgSQL (L-0261, L-0267, L-0276, L-0277), UUIDv7 exists (L-0093), UUID "security" is only enumeration resistance (L-0143).
- The flush-frequency formula is said as "last flushed + flush frequency + 1" (00:24:05) while the code says `load() + flush_freq` (00:22:20); show the worked numbers (6 + 3 + 1 = 10) so readers don't trip on the off-by-one.
- The Twitter `since_id` pagination appears only on the board (L-0212); include it in the pagination section.
- Teacher's opinions ("microservices are stupid in most cases", "interviews are crappy", 01:18:51) - keep, labelled as his view.
- Admin (break, the 00:58:50 "Thank you" likely hallucinated in silence, recording upload times) is not content. The members-only YouTube video (01:52:04) can be a plain "further reading" mention without promotion.
- Transcript uncertainties to verify before publishing: "The third day second" (00:00:02), "2-264" (01:09:36, likely 2^64), the "8 by 20 meters 2x to 64" garble (01:09:52), Student 2/3 speaker swaps around 00:48:53-00:50:49, names in the speaker table must not appear (use S1..S10). See `lectures/lec03/transcript/review_flags.md` and `lectures/lec03/board/flag_resolutions.md`.
