# Lecture 1 (lec04) story rewrite: fact and faithfulness review

Scope: `site/src/content/lectures/lec04/s0-header.mdx`, `c1`–`c8`, text in the figures the page uses (`site/src/figures/lec04/*.tsx`: WhatUserSees, FourCallsOrOne, UsersPush, TwoCallsNotEnough, PulseTable, HowBig, WhoDeletes, FeedingCompetitor, HearingExpiry, PoolQueue, ThreeFour, PoolBudget, HeartbeatsReused, BlogSchema, DeletedLife, LongShortText, ThreeDates, EpochLine, WhatACacheSaves, YourTurn, SoFarDot/SoFarBlog), and the four `l04-*` clip captions.
Checked against: `ledger/ledger.jsonl` (337 items), `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`.

Summary: **10 errors / misrepresentations** (2 medium, 8 low), **5 inventions** (1 medium-high, 4 low), **5 important lost ideas** (1 of them partial), **0 leftovers**.

Overall the page is in good shape. The fact-check corrections are carried into the text correctly: AOF everysec, DynamoDB TTL lag and `expires_at`, Redis `SET` clearing the TTL, keyspace events being best-effort, the NAT/direction reason against pull, the memory cost of connections, external poolers, HikariCP defaults, the ALB health-check direction, Walmart's hybrid cloud, Amazon Food closing in 2022, GDPR deadlines and backups, InnoDB/TOAST, utf8mb4, the native date types being compact, 2038 and 64-bit, negative epochs, and the MySQL and PostgreSQL ranges. I checked every number on the page that can be checked: 8 B × 1B = 8 GB, 100k × 8 B = 800 KB, 6 beats/min × 1M = 6M/min ≈ 100k/s, 8 MB for 1M rows, 1,000 ÷ 100 = 10, 10 × 100 = 1,000, 15 × 100 = 1,500, and `1648890096` = 2022-04-02 09:01:36 UTC. All are correct. The lecture links also point to the right lectures: lec01 = Lecture 2 (sharding, WebSockets), lec07 = Lecture 9 (build a cache) and lec08 = Lecture 5 (load balancer).

---

## 1. Errors and misrepresentations

### E1 (medium): c1 §1.3, "Go deeper: how real chat apps hold the line open"
- **Page:** "The connection drops when the device dies, and that drop is the signal."
- **Problem:** When a device dies or loses power, it sends no FIN, so the server doesn't see a "drop". It finds out only through the protocol's own keep-alive pings (MQTT keep-alive, WebSocket ping/pong) or a TCP timeout. So a persistent connection still detects death by silence, which is the very idea this chapter teaches. As written, the sentence suggests persistent connections avoid the problem. This claim is not in the ledger or the fact-check (L-0101 only says production presence rides a persistent connection, MQTT for battery).
- **Fix:** "The server still learns that a device died from silence: these connections carry their own small keep-alive pings, and when the pings stop, the server closes the connection and marks the user offline."

### E2 (medium): c3 §3.1, the speed paragraph
- **Page:** "It is: Redis serves from RAM with sub-millisecond latency, while DynamoDB is an HTTPS API that answers in single-digit milliseconds. But a green dot doesn't need the difference. … Speed is the answer everyone gives first, and here it decides nothing."
- **Problem:** When a student said "in memory, so faster", the teacher answered "Not really". His point was that the time-sensitivity advantage comes from the **persistent connections** you hold to Redis, which DynamoDB, being stateless, doesn't give you (L-0094, core; transcript 01:00:14). He then used time sensitivity as a real reason to pick Redis: the expiry hook (L-0097). The fact-check (L-0093/L-0094) adds RAM and the protocol as reasons, but it doesn't remove the persistent-connection point. "Here it decides nothing" is the writer's verdict. It contradicts the lecture, and it contradicts §3.4 of the page, where time sensitivity (push on expiry) does count for Redis.
- **Source:** ledger L-0093, L-0094, L-0097; factcheck L-0093/L-0094 (medium, note).
- **Fix:** "It is: Redis serves from RAM over connections your server keeps open, with sub-millisecond latency, while DynamoDB is a request-and-response HTTPS API that answers in single-digit milliseconds. For reading a dot, the gap rarely matters, since a few milliseconds is invisible next to a 30-second threshold. Where time sensitivity does count is when you want to hear about a change the instant it happens, and that comes from the open connection, not raw speed (section 3.4)."

### E3 (low): c1 §1.3, the Go deeper note, link text
- **Page:** "<LectureLink lec="lec02">Lecture 4</LectureLink> looks at real-time presence the way Slack does it."
- **Problem:** Lecture 4 (lec02) designs Slack's real-time **messaging**, meaning WebSocket servers with Pub/Sub. It doesn't design presence. A grep of `lec02/*.mdx` finds "presence" only in its header, as a back-link to this lecture.
- **Fix:** "…and <LectureLink lec="lec02">Lecture 4</LectureLink> builds Slack's real-time messaging on those persistent connections."

### E4 (low): c3 §3.2
- **Page:** "Availability and autoscaling follow whoever operates the store, not its brand."
- **Problem:** This states the teacher's framing (L-0304, L-0313) as a universal fact. The fact-check on L-0304 says availability is also a property of the product: DynamoDB has a contractual 99.99% SLA, and Redis's asynchronous replication can lose acknowledged writes on failover whoever operates it.
- **Fix:** "Availability and autoscaling depend mostly on whoever operates the store, though the product sets limits too: AWS commits to 99.99% availability for DynamoDB, and Redis's asynchronous replication can lose acknowledged writes on a failover however good your team is."

### E5 (low): c3 §3.3, Netflix
- **Page:** "The counter-example is Netflix, which stayed on AWS after Amazon started a rival video service, most likely because moving that much code costs more than whatever deal keeps it there."
- **Problem:** The lecture gives two reasons. Moving means rewriting a lot of code, and there is probably a mutual deal because Netflix is a huge customer (the teacher hedged that he doesn't know the details). The page merges the two into a cost-versus-deal comparison the lecture never made. The fact-check (L-0083) confirms only that Netflix runs on AWS; the deal is not public.
- **Fix:** "The counter-example is Netflix, which stays on AWS even though Amazon now runs a rival video service: rewriting that much code would be enormous, and a customer that large may well have a deal that makes staying worthwhile, though its terms aren't public."

### E6 (low): c5 §5.3, the pool maximum
- **Page:** "It is tempting to go a little higher, say 15, because one server is sometimes busier than the rest. Know what that costs: …"
- **Problem:** In the lecture this was the teacher's own practice and recommendation: set the maximum somewhat above the fair share, a practice he has seen, not a standard (L-0159). The page turns it into a "temptation". The fact-check keeps the practice and adds the side effect.
- **Fix:** "Many teams set it a little higher, say 15, because one server is sometimes busier than the rest; it is a common practice, not a standard. Know what it costs: …"

### E7 (low): Fig 2·c (`HowBig`, s2b-green-dots.tsx lines 121 and 134)
- **Figure text:** "absence = offline (see 2.7)"
- **Problem:** This section number is left over from the old structure. The absence-means-offline idea is now in §2.3. (The caption already says "comes from the next section".)
- **Fix:** change the label to "(see 2.3)".

### E8 (low): Fig 2·b (`PulseTable`), its labels and desc
- **Figure text:** "on every heartbeat: UPDATE pulse SET last_hb = NOW() WHERE user_id = u1", "where NOW() is epoch seconds", "GET /status/<user_id> applies two rules".
- **Problem:** The text right below the figure says a plain UPDATE fails on a user's first beat and shows the upsert (fact-check L-0051). `NOW()` returns a timestamp, not epoch seconds. And the chapter's read endpoint is the batch `GET /status/users?ids=…`.
- **Fix:** label it "on every heartbeat: upsert last_hb = now (epoch s)", and in the desc write "every heartbeat upserts the user's row with the current time in epoch seconds; a status read applies two rules to each requested id: …".

### E9 (low): Clip 2·1 caption (c2 §2.4) and recall answer 1 (c8 §8.4)
- **Page:** "a single write without EX keeps a user green forever" / "a plain SET clears the expiry and the key never goes away".
- **Problem:** A write without EX clears the TTL, but the next beat with `EX 30` sets it again. The user stays green forever only if the write without EX was their **last** beat. The clip's own storyboard draws exactly that case.
- **Fix (caption):** "The store counts down on its own; if the last write before a user goes quiet forgot EX, that user stays green forever."
- **Fix (recall):** "…The mistake: a Redis write without `EX 30`. A plain `SET` clears the expiry, so if that was the user's last beat, the key never goes away."

### E10 (low): c7 §7.3, the PauseAndThink answer
- **Page:** "Against the original date-time column it buys speed *and* stays readable."
- **Problem:** §7.2 says native date types are compact binary that "index well" (fact-check L-0208/L-0213, medium). Saying an integer is faster than a native column in general contradicts that. The speed-up is Redbus's own reported experience, which can't be verified (L-0214, L-0227).
- **Fix:** "Against the date-time column Redbus had, it bought the speed they needed *and* stayed readable."

---

## 2. Inventions (stated as fact or as the lecture's advice, with no support in the lecture or fact-check)

### I1 (medium-high): c3 §3.5, the verdict (the writer flagged this)
- **Page:** "Now write the decision down, with its reason. For this dot, **managed Redis**: … If your team is tiny, already lives on AWS and wants nothing at all to operate, **DynamoDB** is a fine answer too…"
- **Problem:** The lecture gave no single verdict. Its message was that both work, and the choice depends on team size and expertise (lean team → managed: DynamoDB *or* managed Redis, L-0099, L-0139, L-0140), on lock-in concerns for big organisations (L-0098), on future extensibility (L-0089) and on the time-sensitivity hooks (L-0097). L-0311 says only that Redis as the primary store is *fine*. Also, the lecture's lean-team advice leaned **toward DynamoDB** ("you would be more tilted to go towards DynamoDB versus Redis", 01:21:10; "offload everything to DynamoDB… they become your extended engineering team", 02:49:21). The page puts DynamoDB in second place, which reverses that emphasis. Fig 4·a's so-far caption ("the store is chosen, Redis or DynamoDB") also disagrees with the single verdict.
- **Fix:** "Now write the decision down, with its reason. Two write-ups are both defensible here. A lean team that wants nothing to operate, already on AWS: **DynamoDB**, storing `expires_at` and checking it on every read. A team that wants to hear about expiries the moment they happen, may need richer data structures later, or wants to stay free to change clouds: **Redis**, managed unless you have people who have run it before, with `SET … EX 30` on every beat. Which one is right depends on your team, your cloud and what the feature will need next; what is not optional is writing the reason down."

### I2 (low): c1 §1.4
- **Page:** "…so two lost beats in a row still leave a live user green, and a third turns them grey."
- **Problem:** The lecture gives no reason for 10 s / 30 s. It only says the threshold is configurable business logic (L-0048). The reason also sits on a boundary: with the last beat at t = 0, the third beat is due at exactly t = 30.
- **Fix:** "This design sends a beat **every 10 seconds** and calls a user offline after **30 seconds** of silence, so one or two delayed or lost beats don't flicker a live user grey."

### I3 (low): c4 §4.1
- **Page:** "…and many teams would build this table on exactly that kind of database because it is what they already run."
- **Problem:** No source supports this claim about what teams do. The lecture only said the database "would start to choke" (L-0104).
- **Fix:** "A disk-based relational database committing 100,000 durable single-row updates every second is a much harder ask." (End the sentence there.)

### I4 (low): c7 §7.4
- **Page:** "Nearly everyone who stores times gets burned by zones once…"
- **Problem:** This generalises from one student's remark (L-0226).
- **Fix:** "Time zones burn a lot of teams, so the rule is simple: store UTC, …"

### I5 (low): c7 §7.3
- **Page:** "Custom date formats like this one run in plenty of production systems."
- **Problem:** This rests on the teacher's private, unverifiable experience (L-0223, an aside), stated as fact. YYYYMMDD integer keys are in fact common (for example as date keys in data warehouses), so a sourced or hedged wording is easy.
- **Fix:** "You will find custom date formats like this one in real production systems; `YYYYMMDD` integer keys are common in data warehouses."

Elaborations I checked and **accept** (they are reasonable and not presented as the lecture's teaching): the endpoint path `GET /status/users?ids=` (the lecture said `/data/users`, and the path is illustrative); the cron edge cases "a run that overlaps the next, a run that dies halfway" (L-0064 says only "edge cases"); "the next round of beats would rebuild the whole table within 10 seconds" (follows from the design); the "friends online near you / online today" examples for future data structures; "a large bank" for Goldman Sachs; and the soft-delete audit story told without saying it was the teacher.

---

## 3. Important ideas lost

I went through all 299 core and supporting ledger items. 271 ids are cited somewhere on the page. Most uncited items are admin, Q&A tangents or claims the fact-check rejected. These are the ones a learner should not miss:

1. **Redis is open source and DynamoDB is proprietary, and that is why these two were compared** (L-0098, core; transcript 01:02:13 "Redis open source, DynamoDB proprietary, big difference"). The page only implies it through lock-in and hiring. **Fits c3 §3.3**, e.g. as the first sentence: "The two candidates differ in one way that matters more than any feature: Redis is open source and runs anywhere, while DynamoDB is a proprietary AWS product."
2. **The persistent connection as Redis's real time-sensitivity advantage** (L-0094, core). It appears only indirectly in §3.4. **Fits c3 §3.1**; see the E2 fix.
3. **Six foundation components: database, caching, scaling, delegation, concurrency, communication** (L-0168, core). The page names only the four left for Lecture 2, and never the framework itself, or that every system, the green dot included, touches all six. **Fits c6 intro** (or c8 §8.5): "Every design decision falls under one of six topics: database, caching, scaling, delegation, concurrency and communication; this lecture works through the first two, and the green dot already touched all six."
4. **When you need more connections than the database allows: scale it up, then shard; vertical scaling has a ceiling, so design for horizontal** (L-0136, L-0138, L-0156, core). The page cites L-0136 for sizing but offers only PgBouncer/RDS Proxy as the structural fix (fact-check additions). The lecture's own answer appears only in the festival note. **Fits c5 §5.3**: "If the fleet truly needs more concurrent connections than one database can hold, the first answer is a bigger database; past what one machine can give, you split the data across several (sharding, Lecture 2), which is why a design that has to grow should be able to scale out, not only up."
5. **(partial) Two ways to build any system, spiral and incremental, with no hard rule and no hard line between them** (L-0022, L-0028, core). Both ideas are in c1 but unnamed, and the "no hard rule, use both" point is missing. **Fits c1 intro**: add "Neither is a rule; most real projects mix the two."

Cut on purpose, and fine to leave out: the B+ tree soft-delete rebalancing argument (L-0185, L-0186, L-0229, all core in the ledger). The fact-check marks it imprecise (medium) and says engines defer deletes. If the writer wants to keep the lecture's thread, a one-line Go deeper in c6 §6.3 would do: "You may hear that soft deletes spare the database a B+ tree rebalance; engines already defer physical deletion (InnoDB purge, PostgreSQL VACUUM), so batch hard deletes for lock and commit overhead, not rebalancing." Other cuts are also fine: fixed-width rows / C structs (fact-check: wrong), small versus large reads from disk (L-0288, imprecise), HTTP keep-alive versus HTTP/3 (tangent), Atlassian (it was an operational mistake, not a GDPR erasure), TigerGraph/Neo4j and Cassandra (asides).

---

## 4. Leftovers

None. I grepped all page MDX, the descs and labels of the figures in use, and the visible strings of the clips for teacher, instructor, student, class, board, as taught, "More precisely", "since the class", "the lecture" and `hh:mm:ss` timestamps. There are no hits in reader-facing text. The only matches are source comments (`// Lecture 01 (lec04)`, storyboard paths) and the illustrative `'2016-04-02 00:00:00'` SQL literal.

Side note (outside the scope of this review): `lec02/s2-documents-kv.mdx` links to this lecture as "Lecture 01 (§3, “Redis or DynamoDB?”)". §3 is now titled "Two stores pass the test. Which one goes in the box?". The anchor still resolves, but the quoted title is out of date.
