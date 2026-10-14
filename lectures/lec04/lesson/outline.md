# Lecture 04 lesson outline: "Green dots and blog rows"

**Promise (one line):** Design an online/offline indicator from heartbeats and TTLs, then make the everyday database and caching calls for a Medium-like blog.

**Dek:** Two builds on one page. First the green dot next to a user's name: what to store, who reports it, who deletes it, which store to pick and why six million heartbeats a minute make you pool connections. Then the rows of a blog: soft deletes, text columns, dates, and what a cache really is.

Source: Lecture 04 (course position 1, week 1, day 1), 03:06:44 of class plus the board. Ledger `lectures/lec04/ledger/ledger.jsonl` has 337 items: 327 placed and 10 dropped (see `placement.json`, checked by `check_placement.py`). The design is `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments are in `factcheck_applied.md`. Figures are in `figures.md`, clips in `animations.md`, pause-and-think prompts in `prompts.md`.

---

## How to read this outline

### Spine
The spine is the teaching map's option A, "Two builds, one habit". It keeps the lecture's own order, which is already story-ordered: each part of the design appears only when a question forces it.
- **Build 1, the online/offline indicator** (chapters 2–4). The brief, the key-value core, heartbeats, the 8 GB estimate, absence = offline, cron vs TTL, the Redis vs DynamoDB brainstorm, then the 6M-writes-a-minute load and connection pooling.
- **Build 2, a Medium-like blog** (chapters 5–6). The schema, soft delete, column types, dates, then caching on the same app.
- Chapter 1 (how to approach a design) comes first because the class did, and because every later chapter applies it. Chapter 7 is the recap.

Each chapter is its own page: its header gives an opening problem in the running case, and a **Hand-off** line names the bridge to the next page.

Two deliberate moves away from the class order, both to keep each chapter self-contained as its own page:
1. **The Redis vs DynamoDB brainstorm gets its own chapter (3).** In class it sits between the TTL design and the load estimate. It is 18 minutes of discussion plus late Q&A (Redis as primary, portability, autoscaling), too much to bolt onto chapter 2.
2. **All Q&A is folded into its topic** (teaching map §8 redistribution map). About 37% of the class was discussion; none of it is an appendix.

The teaching map's option C ("is it storage or computation?") is used as a recurring line: §2.6 rules storage out, §4.1 rules computation in, §4.8 gives the four resources, §6.1 reuses them for caching. Option B's component labels (database, caching, scaling, concurrency, communication) appear as small tags in each chapter's sec-meta so the page lines up with Lecture 2.

Final chapter numbers: 1 Approach · 2 Green dots · 3 Redis or DynamoDB · 4 Six million heartbeats · 5 Blog rows · 6 What a cache is · 7 What to keep.

### Voice rules (apply everywhere)
- The page speaks in its own voice. No teacher–student dialogue, no student names (the ledger carries some; never print them). Class Q&A becomes explanation: "asked in class" is fine, anonymous. A student proposal the class corrected is written as the tempting idea, then the correction ("It is tempting to think…; in fact…").
- Students' production stories become **"From practice"** margin notes without names (the Azure database incident, the "burned their hands" time-zone story, the interview question about deletes and downtime, the senior engineer who called a TTL-plus-streams design Dynamo-only).
- The instructor's own war stories (the police station, building GDPR compliance in two months, Redbus via a friend, the earlier-cohort Goldman Sachs participant) appear as "the instructor" in margin notes or as one attributed sentence. They are told as experience, never as sourced fact (they are `unverifiable` in the fact-check).
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix. Hedges stay hedges ("I think", "let's say").
- Outside facts appear inline with a link, or in a SourceNote.
- Day one framing: this is the course's first session, so the page assumes only HTTP, TCP's handshake, basic SQL and the pre-reads on Redis and DynamoDB. Every course cross-link names the lecture by its **course position** (Lecture 2 = `lec01`, Lecture 3 = `lec05`, Lecture 4 = `lec02`, Lecture 5 = `lec08`, Lecture 8 = `lec06`, Lecture 9 = `lec07`), from `lectures/course.json`.

### Component vocabulary (all from design B; numbers refer to NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph. |
| **Figure** | #6 static figure | Board redraws D-01..D-15 and new figures. Spec in `figures.md`. |
| **StepThrough** | #7 step-through | Discrete sequences the reader studies at their own pace: the dead battery, five network trips, a pool running out, one request through the shared cache. |
| **AnimationClip** | #10 clip | 4 clips, at most one per chapter, where change over time is the lesson. Spec in `animations.md`. |
| **RuleBox** | #5 key rule | Exactly one per chapter 1–6. |
| **PauseAndThink** | #8 sticky note | 9 prompts. Spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table | 4 tables. |
| **MarginNote** | #12 named collapsible aside | Side material: "From practice" stories, the instructor's stories, "Go deeper" internals, the HTTP sidebar. |
| **SourceNote** | #9 sourced fact, headed **"More precisely"** (or **"Since the class"** for SN-04) | Placed directly after the teacher's point. Only for wrong / outdated / imprecise-medium items: 17 items in 16 notes (SN-01..SN-16). |
| **CodeBlock** | the sample's `pre code` | Short snippets: the heartbeat write, the Redis TTL write, the blocking-queue pool, the partial unique index. |
| **ForwardChip** | "coming later · Lecture N" | Topics deferred in class, linked to the lecture where they are taught (course order). |
| **RecallQuestions** | #13 recall | Exactly 3 per chapter 1–6. |
| **AboutThisClass** | header meta + `details` | Course-structure facts only. |
| **NotationKey** | #4 notation key | Once, at the top of chapter 2 (the first chapter with architecture figures). Extended with: green/grey dot = online/offline, pulse dot = heartbeat, ⏱ = TTL timer, ruled block = table. |

### Marker colours (NOTES.md, unchanged)
Blue = request / data path (heartbeats, reads). Green = ack / success, and the **online** dot. Red = failure, stale, hard limit (exhausted pool, dead battery). Graphite = everything else, including the **offline** dot (drawn as a hollow graphite dot, not grey fill, so the meaning survives in Blackboard mode). Dashed = async (TTL expiry done by the store, a background archive job). The board's yellows, pinks and purples map to graphite.

---

## Lecture header (unnumbered)

- **Kicker:** Lecture 01 · week 1, day 1 · running cases: an online/offline indicator, then a Medium-like blog
- **H1:** Green dots and blog rows. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** (design #2) with the seven chapters.
- **AboutThisClass** (collapsed `details`, about 180 words): this is the first session of the course, eight weeks of system design aimed at raw intuition and the implementation side, not drawing boxes (L-0001; boxes "you can do as a kid also"). It does not prepare you for interviews: the goal is the joy of engineering and building any system from first principles with simple designs that scale (L-0003). Every system in the course is implementable on a laptop (L-0008); implement the core of each one over the next year or so, because implementing shows where a design falters and real teams expect it (L-0009, L-0010). Day one keeps scale out of focus on purpose: scale comes in weeks two to four (L-0019 agenda, L-0020). The first week is foundations only, and system brainstorming starts next week (L-0016). The class opens with a build rather than theory because theory-first "became too theoretical" (L-0167). **How to use this page:** the course is built around live brainstorming (L-0002), so pause at every prompt. Note new terms and look them up yourself; this is an intermediate course (L-0004). Revise: the weeks chain together, and by week 7 a flash sale takes about ten minutes to design (L-0005). The pre-reads (Redis, DynamoDB) cover what you need (L-0006).
- **Notation note** (one line under the TOC, from L-0050): tables drawn on these pages only visualise a schema; they do not mean a relational database, and SQL is just an easy way to show the idea.
- Estimated words: 300.

---

## 1 · How to approach a design
**Section dek:** Before any box: decide whether you are building outward from a known core or growing a day-zero design, and pick tools by the property you need, not the tool you like.
**Sec-meta:** about 6 min · class 00:15–00:22 · tag: approach
**Opening problem:** a product team asks for green dots next to user names. Where do you even start?
**RuleBox (§1):** board wording: "Understand the core property & access pattern. Affinity towards a tech comes second." (L-0029). Box body: the third board line "Build an intuition towards building systems" (L-0032). Sketch: a "?" over a cylinder labelled `not yet decided`, with `access: key-value` written first.
**Estimated words:** 900
**Hand-off to 2:** "Apply it: the green dot, built spiral-style from its core."
**Q&A folded in:** none in class (the board's "Points to remember" page). Late echoes: "drop stereotypes" (02:48:25) → 1.2.

### 1.1 Two ways to build
- **Purpose:** give the reader the two build strategies the rest of the page uses.
- **Opens with:** the green-dot brief, and the question "start from the database, or from a whole small system?"
- **Key points:** in 10–11 years the instructor has seen two approaches to building any system, spiral and incremental, and which to use depends on the system (L-0022, unverifiable: worded as the instructor's experience). **Spiral:** decide the core (in most cases the database), make it the single point of focus, then add components as needed (L-0023, inline: "spiral" is the course's term, not Boehm's risk-driven Spiral model). The core can be a schema or a communication layer: in a messaging app the WebSocket layer is the core (L-0024). Use spiral when the system is a no-brainer you have built before (L-0026). **Incremental:** start with a day-zero architecture (user, LB, API server, DB), watch each component under load and at scale, find the bottleneck, re-architect, repeat (L-0025). Use it when the path is uncertain; it fits startups that ship day zero and re-architect over time (L-0027). In a multi-year project at a big organisation you start from some parts and grow organically; there are no hard lines between the two (L-0028, with its "which approach" ambiguity kept vague).
- **Components:** Prose, Figure 1·a (D-02 redraw: spiral panel + loop panel).
- **Words:** 450

### 1.2 The property before the tool
- **Opens with:** "I'll use Redis because I love Redis."
- **Key points:** for every technical decision, first find the core property and access pattern you need, then see which tools fit; choosing by affinity hampers the system's growth (L-0029 → RuleBox). It fails in practice: a company not on AWS cannot use DynamoDB; a company without Redis still has to ship (L-0030). The course drops Cassandra in many places: a relational database solves many simple cases, and some systems at scale run on relational databases instead (L-0031). Go deep on every candidate, know its pros and cons, stay open (L-0092). Drop stereotypes like "DynamoDB is only for this, SQL only for that"; what matters is knowing how to use a tool (L-0312, said in the late Q&A about Redis as a primary store; echoed in 3.2). There is no single way to build a system, systems keep evolving, and you will build ones that don't exist yet, which is where intuition matters (L-0032).
- **Components:** Prose, RuleBox §1, RecallQuestions §1.
- **RecallQuestions §1:** (1) You have built three chat apps before and now build a fourth. Spiral or incremental, and what is its core? (2) Your startup is unsure how a new feature will be used. Which approach, and what are its five steps? (3) Why is "we use Redis everywhere" a weak reason to pick Redis for the next feature?
- **Words:** 450

---

## 2 · Green dots: the online/offline indicator
**Section dek:** Build the indicator one forced question at a time: what to store, how to read many users at once, who reports being alive, how long silence means offline, and who cleans up.
**Sec-meta:** about 25 min · class 00:22–00:45, Q&A 02:44–03:05 · tags: database, communication
**Opening problem:** the product brief. Show a list of users with a green dot (online) or a grey dot (offline), as Facebook and Twitter do (L-0021).
**RuleBox (§2):** board wording "Never re-invent the wheel!" (S41). Box body: if a database can expire entries natively, don't run your own deleter (L-0068). Sketch: a crossed-out cron box beside a cylinder with a ⏱. It sits in 2.8.
**Estimated words:** 3,900
**Hand-off to 3:** "Two stores do key-value with a TTL. Which one?" (the chapter ends on the Redis/DynamoDB code and the brainstorm question from the board).
**Q&A folded in:** last seen (02:44:11, 02:53:48) → 2.7 MarginNote. TTL compute cost in Redis (03:00:22) → 2.8. Redis TTL internals (02:44:38) → 2.8 ForwardChip. HTTP stateless / keep-alive / HTTP on TCP (03:03–03:05) → 2.3 MarginNote.

### 2.1 The brief, and the core
- **Opens with:** the board's list: user 1 and user 4 green, user 5 and user 3 grey (Fig 2·a, D-01; L-0021).
- **Key points:** spiral in action: pick the database as the core, the easiest place to start, and ask what is needed to render a dot (L-0033). First schema: user ID (int) → online (bool) (L-0034). The access pattern is key-value: get many users' status, get one, update one. This names the access pattern, not yet the database; the board says "we still have not picked which DB to use" (L-0035).
- **Components:** NotationKey (once), Prose, Figure 2·a (D-01), Figure 2·b (D-03).
- **Words:** 350

### 2.2 Reading many dots at once
- **Opens with:** a friends list renders four users.
- **Key points:** an API server queries the database; the first idea is an endpoint that takes one user ID (L-0036). Four users means four calls from the front end: a poor experience and a lot of calls for the backend (L-0037). First critical design decision: a batch endpoint that takes many IDs, so the front end makes one call and the backend does the heavy lifting (L-0038). The board writes it `GET /status/users?ids=u1,u2,u3,u4` (L-0039; the page uses the board's path, since "/data/users" in the audio is an ASR slip). Knowing *why* an endpoint is shaped this way is the kind of detail this course cares about.
- **Figure:** Fig 2·c (D-04 redraw, two panels: four calls vs one batch call).
- **Words:** 300

### 2.3 Who says a user is alive?
- **Opens with:** reading is solved. Something has to update each user's state (L-0040).
- **Key points:** two ways to learn it: pull or push (L-0040). Pull, where the API server asks each client "are you alive?", is not possible: HTTP is stateless and the server cannot talk to the client, so the client must talk to the server; the board adds "unless there is a persistent connection" (L-0041, left as taught + A-OOI-22 woven in as a separate sentence: WebSocket gives two-way messages over one connection, which is the board's "unless"). So clients **push** heartbeats: each client periodically calls the backend saying "I am alive" (L-0042). The name comes from the heart: while it beats, you're alive (L-0043). Endpoint: `POST /heartbeat` marks the authenticated user alive (L-0044).
- **MarginNote "Is HTTP really stateless?"** (about 220 words; skip unless the "can't pull" step bothered you): asked at the end of class. HTTP is designed stateless, one request and one response, but a connection can stay open with the keep-alive header (L-0330, left as taught + A-CC-13: the Keep-Alive header matters only in HTTP/1.x). HTTP/2 keeps connections persistent; WebSocket is not HTTP but also persistent; no rule says you must close (L-0331, + A-CC-14: a WebSocket starts as an HTTP Upgrade). Normally the server closes after responding; with keep-alive it doesn't (L-0332 → **SN-01**, A-CC-12: HTTP/1.1 is persistent by default). Still, think of HTTP as stateless because it simplifies design; when you need state use WebSockets or MQTT (L-0333). Asked in class: can HTTP run without TCP? HTTP runs on TCP (L-0335, + A-CC-15: HTTP/3 runs on QUIC over UDP). HTTP is a specification and TCP a layer-4 protocol, so in principle HTTP messages can go over UDP (L-0336, inline: HTTP needs a reliable ordered transport, which QUIC provides). ForwardChip: a stateful HTTP/2 design · week 5 (L-0334; HTTP/2 appears in Lecture 9).
- **Figure:** Fig 2·d (D-05 redraw: push model).
- **Words:** 550 (incl. MarginNote)

### 2.4 Why the beat must repeat
- **Opens with:** "Why not send one call at login and one at logout?" (L-0045).
- **Key points:** the common idea: one heartbeat when coming online, one "offline" call at logout (L-0045). It fails: a client can announce coming online but cannot reliably announce going offline. If the machine crashes, the battery dies or someone pulls the plug, no offline call is made and the dot stays green (L-0046). So heartbeats are periodic, and if none arrives for long enough the backend marks the user offline (L-0047). "Long enough" is subjective (board) and business logic: 10 minutes in one product, 10 seconds or a minute in another; this design uses 30 s, with a heartbeat every 10 s (L-0048).
- **PauseAndThink P1** (before the StepThrough). **StepThrough** Fig 2·e "Two calls are not enough". **Figure** Fig 2·f (D-06 redraw: periodic pulse + "when is a user offline?").
- **Words:** 450

### 2.5 A timestamp instead of a boolean
- **Opens with:** a boolean can't say "silent for 30 s".
- **Key points:** store the time of the last heartbeat: table `pulse(user_id, last_heartbeat)`, updated on every `POST /heartbeat` (L-0049). The write: `UPDATE pulse SET last_heartbeat = now() WHERE user_id = ?` (L-0051, left as taught + A-OOI-06 woven in: write it as an upsert, `INSERT … ON CONFLICT (user_id) DO UPDATE`, so a user's first heartbeat creates the row). getStatus, rule 1: no entry → offline, the user never came online (L-0052). Rule 2: entry with `last_heartbeat < now − 30 s` → offline; else online (L-0053). The same rules run for the batch call. The timestamp is epoch seconds: seconds since 1 January 1970 (L-0054; Chapter 5 returns to epoch integers).
- **Figure:** Fig 2·g (D-07 redraw: pulse table + UPDATE + getStatus).
- **CodeBlock:** the upsert and the two getStatus rules as a five-line function.
- **Words:** 400

### 2.6 Is storage the problem?
- **Opens with:** a billion users. How much space?
- **Key points:** each row is two integers, 4 B + 4 B = 8 B per user, one row per user (L-0055, left as taught; the 4-byte epoch's 2038 limit is picked up in 5.9 with SN-14). 1 billion users (about an eighth of the world; Facebook has more) gives 8 GB (L-0056, left as taught + A-OOI-08 woven in: real rows carry overhead, about 36 B each in PostgreSQL before any index, so the footprint is several times 8 GB; the conclusion holds). 8 GB is less than a phone's 128 GB and fits in a cheap machine's RAM, so storage is not this system's challenge (L-0057). "Storage" here means the space to hold the data (L-0058). The class still asked whether 8 GB could shrink: at every step ask "can I change this, is there an alternative?", because design is hundreds of trade-offs (L-0059). Stay open, document every option you considered and why you took your path; "no, I didn't think of that" earns nothing. That is the heart of being a senior engineer (L-0060).
- **PauseAndThink P2** (storage half; its computation half returns in 4.1).
- **Figure:** Fig 2·h (D-08 redraw: storage estimate, with the 800 KB line from S38 added in 2.7).
- **Words:** 450

### 2.7 Absence means offline. Who deletes?
- **Opens with:** the dot only needs online or offline (board: "all we care is online/offline").
- **Key points:** treat absence of an entry as offline, so only online users have rows (L-0061). Then entries must expire: each heartbeat resets a 30 s timer, and when it runs out the entry goes; entries = users online now (L-0062). Board numbers: 1B total, 100k active → 100k rows, 800 KB (L-0065). The simplest deleter is a cron job that removes rows older than 30 s; getStatus then only checks existence (L-0063). It would work for a startup on day one, but it is not robust; edge cases need handling (L-0064). It also adds a moving part: a separate process to host and keep running, with its own uptime, monitoring and telemetry (L-0066). Never draw a box for its own sake: would you want to build, run and monitor it? If not, find a better way; a complex-looking diagram is the worst outcome (L-0067).
- **PauseAndThink P3** (who deletes?).
- **MarginNote "What about 'last seen'?"** (asked twice in class; skip unless your product shows it): "last seen" was out of scope. If the product wants it (as WhatsApp shows), you cannot delete rows; the last heartbeat *is* the last-seen time, and there is nothing to optimise because 8 GB is peanuts. Deleting offline rows was a stretch to make the class think (L-0305).
- **Figure:** Fig 2·i "Who deletes?" (board S35/S38 + S41 as two panels: cron job vs the store's TTL).
- **Words:** 500

### 2.8 Let the database expire it
- **Opens with:** board: "Approach 2: can we not offload this to our datastore?"
- **Key points:** offload expiry to the database; when stores do it natively, don't reinvent the wheel or add components (L-0068 → RuleBox §2). Requirement: key-value access plus expiration (TTL); two common stores are Redis and DynamoDB, chosen also to drive the next discussion (L-0069). Final logic: on every heartbeat set the user's entry with a 30 s TTL ("every heartbeat moves the expiration time forward"); the store deletes it on expiry; present = online, absent = offline; the app is just REST endpoints on this store (L-0070 → **SN-02**: Redis `SET user:<id> 1 EX 30` on each heartbeat, A-OOI-01, because a plain SET clears the TTL; DynamoDB deletes expired items "typically within a few days", so store `expires_at` and treat `expires_at < now` as offline, A-OOI-02). The TTL was there because space mattered; if space doesn't matter, skip it and keep the rows, and Redis's in-memory deletion costs "peanuts" anyway (L-0327, asked in class).
- **AnimationClip `l04-heartbeat-expiry`**. Predict line: "The laptop's battery dies right after a heartbeat. How long until the dot turns grey?"
- **CodeBlock:** `SET presence:42 1 EX 30` and `EXISTS presence:42`; a DynamoDB comment line `# expires_at = now + 30; online if expires_at > now`.
- **ForwardChip:** how Redis expires keys inside (lazy deletion and sampling) · Lecture 3, and building a cache with TTL · Lecture 9 (L-0306; the class said "week 3").
- **MarginNote "Not how production does it"** (skip unless you build presence): real online indicators keep a persistent connection, with many tunings; today's design was about details, intuition and trade-offs (L-0101, left as taught + A-OOI-18: WebSocket is one option; Facebook Messenger used MQTT to save battery). ForwardChips: WebSockets · Lecture 2 §5.4 (the class said "next week"; they came the next day), and real-time presence with Slack · Lecture 4 (L-0102).
- **RecallQuestions §2:** (1) Why can't a client's logout call be the only way to go offline? (2) With heartbeats every 10 s and a 30 s threshold, how many heartbeats can be lost before a live user shows grey? (3) What must every Redis heartbeat write include, and what must a DynamoDB read check, for "absent = offline" to hold?
- **Words:** 650

---

## 3 · Redis or DynamoDB?
**Section dek:** Both give key-value access and a TTL, so speed is not the deciding question. Persistence, who runs it, lock-in, room to grow and how fast you learn about an expiry decide it.
**Sec-meta:** about 20 min · class 00:45–01:04, Q&A 01:20–01:22, 02:42–02:52 · tag: database
**Opening problem:** the presence store needs key-value plus TTL. Two candidates do both (L-0071). Which one, and why?
**RuleBox (§3):** "Three factors people miss when choosing a database: **future extensions, vendor lock-in, managed vs self-managed**." (L-0100). Sketch: the D-09 T-table in miniature with three ticked rows.
**Estimated words:** 3,300
**Hand-off to 4:** "Whichever store you pick, look at how it's doing: 6 million writes a minute are coming."
**Q&A folded in:** persistence and managed (00:46–00:48) → 3.2, 3.3. Vendor lock-in reasons (00:48–00:55) → 3.4. Redis persistence, managed Redis, data types (00:55–00:57) → 3.2, 3.3, 3.5. Streams + Lambda (00:58) → 3.5. Time sensitivity (00:59) → 3.6. DynamoDB vs self-managed Redis (01:20:52, 02:48:53) → 3.3. Lock-in when you are the vendor; talent (02:42) → 3.4. Availability (02:43:40) → 3.3. Redis as primary (02:46:47) → 3.2. Avoiding DB-specific features (02:50:11) → 3.7.

### 3.1 Same features, different choice
- **Opens with:** board: "Which one would you pick & why? *Cost estimation".
- **Key points:** both give key-value access and expiration, so the choice needs other criteria; cost estimation is one the board lists (L-0071). They were picked because Redis is open source and DynamoDB proprietary, a big difference a large organisation may choose on (L-0098, left as taught + A-D-07: Redis was source-available from March 2024 until Redis 8 added AGPLv3 in May 2025; AWS and Google back the Valkey fork). Beyond the common answers, three factors are often missed: future extensions, vendor lock-in, managed vs self-managed (L-0100 → RuleBox).
- **PauseAndThink P4** (before the table builds up).
- **Figure:** Fig 3·a (D-09 redraw, the tick table, rows in the order the class added them).
- **Words:** 350

### 3.2 Persistence, and Redis as the primary store
- **Opens with:** the first answer in class: "DynamoDB, because the data should persist."
- **Key points:** the tempting answer is persistence; the challenge: this data is deleted after 30 s anyway, so why would it need to persist? (L-0072, open: the class later summarised the pick as "persistence and managed" without a verdict on persistence itself; the page keeps the question open). Redis can persist too, configured if needed, with a few limits (L-0085). Know *how* a feature works, not just that it exists: for Redis persistence, AOF and RDB files, how to configure them, flush frequency (L-0086). Asked late in class: why start with Redis or DynamoDB as the main store rather than a database plus a cache? Redis can be the primary database (L-0309). Whether you need a primary database with Redis on top, or Redis alone, depends on the guarantees your system must give (L-0310). For presence, Redis as primary is fine: configure AOF persistence for on-disk durability with "zero data loss", as the lecture put it, keep the speed, and 8 GB fits in RAM (L-0311 → **SN-03**: with the default `everysec` fsync a crash can lose about 1 s, "zero loss" needs `always`; A-D-01, A-D-02: replication is asynchronous and failover can lose acknowledged writes; for presence that loss is harmless).
- **Words:** 450

### 3.3 Managed or self-managed
- **Opens with:** the second answer in class: "DynamoDB, because AWS runs it."
- **Key points:** a managed service offloads infrastructure to the vendor so the team works on business logic; an in-memory Redis you run yourself can go down (L-0073, board: "managed (*team size) & expertise"). Managed Redis exists on every cloud (e.g. ElastiCache), so you can be managed and still portable (L-0087, open: no clear verdict in class; stated as a point raised). Lean teams of 5–10 go managed to avoid infrastructure pressure or for lack of expertise; every database (MySQL, Redis, Elasticsearch) has its own operational pain: observability, profiling and more (L-0099). Asked: does managed DynamoDB beat a self-managed Redis you must autoscale? For a small lean team, go managed (L-0139). Self-host Redis only with the expertise and bandwidth; otherwise use a managed Redis (Redis Labs, AWS, GCP) and "throw money at cloud providers": they become your extended engineering team (L-0140). Availability was assumed equal in the comparison: with Redis your engineers provide it, with DynamoDB AWS does; availability is a property of engineers, not the database (L-0304, left as taught; the fact-check nuance stays in `factcheck_applied.md`). The same goes for handling sudden surges: if counted, self-hosted Redis needs expertise to scale and react, which counts against it (L-0313).
- **Words:** 450

### 3.4 Vendor lock-in
- **Opens with:** "Redis avoids lock-in" (asked in class), then the chain of "why does that matter?"
- **Key points:** a managed solution depends on team size, and Redis can help avoid lock-in because DynamoDB ties you to AWS and is hard to leave (L-0074). Reasons raised in class to switch clouds: pricing that becomes unmanageable, the rest of the infrastructure moving, better deals elsewhere, though it often isn't a big issue in the end (L-0075). Non-cost reasons: security incidents, a bigger concern for banks; a provider infamous for discontinuing services; loss of trust or a vendor too complex to use (L-0076, as **MarginNote "From practice: why teams switched clouds"**). **Definition:** vendor lock-in is being tied to a vendor because a tool exists only there (DynamoDB is AWS-only), so leaving means rewriting code (L-0077). Moving clouds rewrites a lot of code, so mature organisations think about it a lot (L-0078). The reason people miss is **competition**: if your vendor enters your business, your bill funds your competitor; Amazon launched a food business in India, so a food-delivery company on AWS would fund it (L-0079 → **SN-04** "Since the class": Amazon Food ran in Bengaluru from May 2020 and was announced to close on 29 Dec 2022; the instructor was not sure which companies were on AWS). Walmart is not on AWS because Amazon is its competitor (L-0080, inline: Walmart runs a hybrid of Azure, Google Cloud and its own cloud). A $10M-a-month customer would be paying a competitor $10M a month; Amazon is one example, Microsoft, Google and Alibaba are others (L-0081, unverifiable: an illustration). A very early startup with a $10k bill need not care; big customers always do (L-0082). Counter-example: Netflix predates Prime Video and still runs on AWS, because moving means rewriting so much; as AWS's biggest customer it probably has a deal, details unknown (L-0083, unverifiable-low: kept hedged). Lock-in is why many teams prefer open-source technology (L-0084). When it doesn't matter: if you work at Google you are the vendor; a company sure to stay on AWS need not worry (L-0301). A manager's hat adds talent: it is easier to hire for a widely used open-source tool (L-0302), e.g. many developers know Neo4j, few know TigerGraph (L-0303).
- **Figure:** Fig 3·b "Feeding your competitor" (new, small).
- **Words:** 750

### 3.5 Room to grow
- **Opens with:** "Redis only has strings; DynamoDB has numbers."
- **Key points:** the tempting claim: Redis only has string types. In fact Redis has numbers and many data structures (L-0088). The real point is future extensibility: if the feature may later need Bloom filters, HyperLogLogs or geospatial queries, you may lean to Redis, though it may not matter for presence (L-0089). DynamoDB can do similar things with Streams and Lambda; databases keep evolving and Redis also offers change capture (L-0090, inline: Redis has keyspace notifications or app-written Streams, best-effort, not a durable change feed). Databases converge: MongoDB supports ACID, SQL databases now shard (L-0091, left as taught + A-D-25: MongoDB multi-document transactions since 4.0/4.2; SQL engines mostly shard through Citus or Vitess). Each database has its own features (Redis Pub/Sub, DynamoDB's own, Aerospike) (L-0095, inline: Aerospike has an AGPLv3 Community Edition). The database is the most critical, most brittle component: know its features and performance numbers early (L-0096).
- **Words:** 350

### 3.6 How fast you hear about an expiry
- **Opens with:** "Redis, because presence is time-sensitive and Redis is in memory."
- **Key points:** the class's correction: being in memory is "not really" the reason (L-0093 → **SN-05**). The lecture's view: Redis lets you hold persistent connections, giving very low latency at a cost, while DynamoDB is stateless and you cannot hold one (L-0094 → **SN-05**, A-D-05, A-D-06: RAM *is* a main reason Redis is sub-millisecond; DynamoDB is an HTTPS API with single-digit-millisecond latency, its SDKs do reuse connections, and AWS's own route to microseconds is the DAX in-memory cache; the valid contrast is a connection the server can push events on). To show a user offline the moment the key expires, Redis can tell you over that connection that a key just expired; DynamoDB exposes expiry only through streams, which takes long (L-0097, light inline clarification, simplified-medium, + A-D-03: expired events fire when Redis actually deletes the key, possibly late, are off by default and fire-and-forget).
- **Figure:** Fig 3·c "Hearing about an expiry" (new, two lanes).
- **Words:** 400

### 3.7 Staying portable, and where to stop
- **Opens with:** "Shouldn't we avoid database-specific features like TTL?" (asked in class).
- **Key points:** TTL was chosen because expiry was needed, so the store was picked for it; you need some features (TTL, ACID) and would move only to a store with the same, or re-implement it, e.g. a cron job (L-0314). Draw a line on how far you abstract: drop unrealistic concerns or you end up writing your own database (L-0315). If you leave DynamoDB you lose Streams, but change-data-capture tools give the same: with MySQL, Debezium (L-0316, + A-OOI-05: it reads the binlog into Kafka topics; + A-OOI-04: DynamoDB marks TTL deletions in Streams as service deletions, so an archiver can tell them apart). **MarginNote "From practice: Dynamo-only?"**: one student's design (TTL plus streams for archival) was challenged by a senior engineer as tied to DynamoDB; the answer above is the class's (L-0316 detail). Document your design's limits and the steps you'd take to migrate (L-0317).
- **TradeoffTable T1** "Redis or DynamoDB for presence": columns Redis (self-hosted) · Redis (managed) · DynamoDB. Rows: TTL behaviour · persistence · who runs it · lock-in · room to grow · push on expiry · typical latency. Red ✕ on DynamoDB's "TTL behaviour" cell: "deletes 'within a few days'; check expires_at" (SN-02). Ids L-0070, L-0073, L-0077, L-0089, L-0094, L-0097, L-0311.
- **RecallQuestions §3:** (1) Why is "Redis is faster" a weak reason for this choice, and what is the stronger timing argument? (2) Give two cases where vendor lock-in is a real risk and one where it isn't. (3) A five-person startup with no ops engineer: which store, and what does it trade away?
- **Words:** 550 (plus the table)

---

## 4 · Six million heartbeats a minute
**Section dek:** Storage was never the problem. Writes are. Why each tiny write spends most of its time opening a connection, how a pool fixes it, how to size one, and when it breaks.
**Sec-meta:** about 30 min · class 01:04–01:19, Q&A 01:19–01:34, 02:52–03:00 · tags: concurrency, scaling
**Opening problem:** 1M active users each send a heartbeat every 10 s (L-0103). Every one becomes a database write (L-0104).
**RuleBox (§4):** "Start with a conservative mindset, observe the metrics, then retune." (L-0161). Box body: the two lines the class said three hours apart: "having a connection pool is always a great option" (L-0131) and "blindly using connection pooling is not a good idea" (L-0320). Sketch: a server with three lines to a cylinder and a small gauge. It sits in 4.5, where sizing is decided.
**Estimated words:** 4,600
**Hand-off to 5:** Fig 4·h (failure detection) closes build 1; the six-components card opens build 2: "Same habits, an ordinary app: a blog."
**Q&A folded in:** new servers past the DB limit (01:19:01) → 4.5. Expired pool connections (01:22:08), "always 100?" (01:22:55) → 4.5. Connections decide DB size (01:23:06) → 4.6. How many connections a DB holds (01:25:26) → 4.6. Two scaling parameters → four resources (01:27:01) → 4.8. Pool min/max (01:28:32) → 4.5. Festival spike (01:31:29) → 4.6. Pool when scaling the DB (02:52:51) → 4.6. Downsides (02:54:50) → 4.7. Bigger pool for slower queries (02:59:07) → 4.7. 30,000 connections (02:59:31) → 4.6.

### 4.1 The other number
- **Opens with:** "What's the challenge with a billion users, if not storage?"
- **Key points:** a heartbeat every 10 s is 6 a minute per user; 1M **active** users send 6M requests a minute (L-0103). Each heartbeat is one database update, so one database absorbs about 6M updates a minute and starts to choke (L-0104, left as taught + A-OOI-09: that is 100k writes/s, within one Redis node's benchmark range but hard for a disk-based relational database). This is the classic case where storage is not the problem but computation is (L-0105, inline: the class's "8 GB for 1 million entries" is a slip; 1M active rows are 8 MB, 8 GB is for 1 billion). Sharding and partitioning are the other answers, deferred (L-0106 → ForwardChip: hash sharding · Lecture 2, range sharding · Lecture 3).
- **PauseAndThink** P2's second half is answered here ("which number should scare you").
- **Figure:** Fig 4·a (D-10 redraw).
- **Words:** 350

### 4.2 The line nobody thinks about
- **Opens with:** the line from API server to database on every diagram.
- **Key points:** connection pooling is an optimisation few people talk about and everyone should know for a write-heavy load (L-0107). Each heartbeat is an HTTP POST over a TCP connection; to write it, the API server opens a second TCP connection to the database (L-0108). A fresh connection costs a three-way handshake and a two-way teardown: five network trips for every call, as the lecture counts it (L-0109, inline: plus the database login, and TLS if used; teardown is FIN/ACK). That one line, drawn without thought, stands for an expensive setup (L-0110). The write itself is a micro update: one row by primary key, so the database does the bare minimum and most of the time goes into connecting (L-0111, left as taught + A-OOI-16 in the next sentence). Connecting is expensive for the database too: it reads the handshake packets, spends CPU and bandwidth and OS buffers (L-0116, inline + A-OOI-16: PostgreSQL spawns a whole backend process per connection, and authentication runs).
- **PauseAndThink P5** (before the StepThrough). **StepThrough** Fig 4·b "One heartbeat, five trips".
- **Words:** 450

### 4.3 Keep the connections open
- **Opens with:** board: "What's hectic? Creating a new connection every time."
- **Key points:** connection pooling: keep a set of connections open between server and database and reuse them, instead of closing each one (L-0112). Example: on startup the API server opens three connections and keeps them handy; any query (select, update, insert) takes one nobody is using (L-0113). A request picks a free connection, marks it busy, fires the query and gets the response, saving the setup and teardown (L-0114). Two benefits: the API call is much faster, and the database's load drops even though the number of queries is the same (L-0115). It saves the database mainly CPU and network work; the lecture first said memory, then "not really memory" (L-0117, inline: memory is part of the cost too; each connection has its own buffers or process, and RDS sizes max_connections from memory). Libraries manage pools for MySQL, Postgres and Redis (L-0119, left as taught). The gain is huge here because each update goes straight to one B+ tree leaf by primary key (L-0129). For a big SQL query the query time dwarfs the setup, so the pool matters less (L-0130). With many micro updates, and in general, a pool is "always a great option"; check whether your codebase has one (L-0131, set beside 4.7's caveat).
- **AnimationClip `l04-connection-pool`**. Predict line: "A write takes 1 ms inside the database. How much of each heartbeat's time is the write?"
- **Figure:** Fig 4·c (D-11 redraw).
- **Words:** 550

### 4.4 Where the pool lives
- **Opens with:** "Is the pool a separate service?"
- **Key points:** a common misconception today is that everything must be a service (L-0127, left as taught). The pool here is a library inside the API server, not a separate process (L-0126, left as taught; the external-pooler case comes in 4.7 with A-OOI-14). Implementation: at boot, create several connection objects and put them in a blocking queue; a caller pops one if available, otherwise waits until someone puts one back (L-0128).
- **CodeBlock:** a 12-line blocking-queue pool (`get()` blocks on `queue.take()`, `release(c)` does `queue.put(c)`), comment: "the idea behind every pool on GitHub".
- **Figure:** Fig 4·d "The pool is a queue inside the server" (new).
- **Words:** 300

### 4.5 How many connections?
- **Opens with:** three connections, and a fourth request arrives.
- **Key points:** a pool has a minimum and a maximum (e.g. a minimum of three to start) (L-0118). All busy? Option one: wait for a running query to release one (L-0120). Option two: open a new connection, use it and add it to the pool, which stretches from three to four (L-0121). Stretching without a limit breaks with millions of requests (L-0122). So set a maximum, e.g. min 3, max 100: a server never opens more than 100, and the 101st concurrent request waits (L-0123, + A-OOI-10: HikariCP's caller waits up to `connectionTimeout`, 30 s by default, then errors). Every database caps its TCP connections, so hundreds of servers × 100 is trouble (L-0124, + A-OOI-19: PostgreSQL's default `max_connections` is 100, minus 3 reserved). The pool also closes connections idle past a TTL, e.g. 10 minutes (L-0125, + A-OOI-11: HikariCP's `idleTimeout` defaults to 10 minutes). Asked in class: if 50 of 100 expired and requests rise, the pool opens new ones up to the max, with the same expiry (L-0141); and it does not always hold 100, which is a ceiling (L-0142). A new server that can't get a connection because the database is full waits until another server releases one (L-0135, inline: in practice the database refuses with an error and the pool waits only up to its timeout). **Sizing:** minimum typically 3 or 5, since connections can be opened on demand (L-0157, left as taught + A-OOI-12: HikariCP recommends the opposite, a fixed-size pool with min = max). Maximum per server = database max connections ÷ the most servers you'll run, e.g. 1,000 ÷ 100 = 10 (L-0158). Set it a little above the average, e.g. 15 instead of 10, since one server can get more traffic; "typically 1.2×", a practice the instructor has seen, not a standard (L-0159, inline: 10 → 15 is 1.5×, and 100 servers × 12 = 1,200 can exceed the database's 1,000). Have telemetry on the pool; a week in production tells you how to tune it (L-0160). Start conservative, observe, retune (L-0161 → RuleBox).
- **StepThrough** Fig 4·e "Three connections, four requests".
- **TradeoffTable T2** "Pool settings": columns Minimum · Maximum · Idle TTL. Rows: what it controls · too low · too high · the class's starting point. Red ✕ on Maximum's "too high" cell: "servers × max > database limit: refused connections". Ids L-0118, L-0123, L-0125, L-0157, L-0158, L-0159, L-0323.
- **Words:** 800 (plus the table)

### 4.6 The database's ceiling
- **Opens with:** a special event; autoscaling adds API servers and they want connections the database doesn't have.
- **Key points:** the fix is to scale the database up to hold more connections: its size depends on the concurrency you want, since that sets the concurrent connections (L-0136). In most cases the most common database bottleneck is its maximum connections, so know that number (L-0137, unverifiable-low: stated as the lecture's experience). Past it, scale vertically or shard, the two common ways (L-0138; ForwardChip: scaling the database · Lecture 2 §2.4). Asked: does the connection count, not the data, decide the database's size here? Yes, because updates are tiny and access is key-value (L-0143). With micro reads and writes and no heavy analytics, the bottleneck becomes the network, specifically opening connections (L-0144; board green note "micro reads/updates → hence n/w bottleneck"). With 10–15-table aggregations, focus on CPU and memory instead (L-0145). How many connections can a server hold? It depends on RAM and on the network card (L-0146, left as taught + A-OOI-15: RDS derives the default from memory, about MB/12 for MySQL). Managed services publish a formula and show the limit (L-0147). Self-managed: benchmark on a machine with high network capacity; the number depends on the load (L-0148). You usually need an instance with dedicated network capacity; every cloud has a high-network-bandwidth class (L-0149, inline + A-OOI-20: those raise bandwidth, not connection count; EC2 also caps tracked connections per instance). **Go explore:** how one server holds 30,000+ connections was left to a search (Hussein Nasser's video, Stack Overflow, hardware specs), promised for week 3 if still unclear (L-0326, + A-OOI-21: Redis has been benchmarked past 60,000 clients). **Spikes:** for a festival that doubles online users, scale the database up: "Always" (L-0162). Scale up, then back down; the database must support the target concurrency first, then tune the pool's maximum (L-0163, left as taught; the fact-check's reboot caveat sits in `factcheck_applied.md`). A better answer to spikes comes with flash sales (L-0164 → ForwardChip: week 7, not in these notes yet). Know your tech unit economics and have monitoring (L-0165). Asked: do pools multiply when the database goes from one to two? It depends how you scale; write a hello world with a pool against a local database today (L-0318; ForwardChip: horizontal database scaling · Lecture 2 and 3).
- **MarginNote "Go explore: 30,000 connections"** carries L-0326.
- **Words:** 750

### 4.7 When pooling hurts
- **Opens with:** asked in class: are there cases where pooling is detrimental?
- **Key points:** the database allows 1,000 connections and each server's pool keeps a minimum of 100; adding servers works until a spike adds 20 more and the database runs out (L-0319). A misconfigured pool limits how many API servers you can run: the cap is the database's max over the pool's per-server minimum, so blind pooling is a bad idea (L-0320, + A-OOI-14: a central pooler such as PgBouncer or RDS Proxy multiplexes many servers onto few connections). If pools grow freely you can't have many servers; with a long idle expiry one server hogs connections and new servers can't get any, an outage for their users (L-0321). Grass is not always green: know where it breaks, document, find a near-optimal answer and move on (L-0322). The connection TTL should be neither too short nor too long; long-running queries need longer (L-0323). The most important tuning metric is the average query time (L-0324, left as taught + the A-OOI-13 sentence below). Asked: if a hot query's time rises, should the pool grow? (L-0325 → **SN-06**: find out why first; a bigger pool helps only if the database has spare capacity and requests queue for connections; A-OOI-13: HikariCP's starting point is `cores × 2 + spindles`, and past the optimum throughput falls).
- **PauseAndThink P6** (before Fig 4·f). **Figure** Fig 4·f "The pool budget" (new).
- **Words:** 500

### 4.8 Only four things
- **Opens with:** asked: are connections and size the two parameters for scaling a database?
- **Key points:** the class broadened it (L-0150): there are only four things in computer science, memory, CPU, disk and network (GPU counts as CPU), and they decide scaling (L-0151). CPU-bound: massive aggregations (L-0152). Memory-bound: pulling in lots of data, massive joins (L-0153). Disk-bound: storing so much that disk is the limit, as in data warehouses (L-0154). Network-bound: the queries a server can take are capped by its network (L-0155); the heartbeat store is this case. Scaling, vertical or horizontal, is defined on these four; vertical has a limit, so a good distributed system scales horizontally, which is where sharding comes in (L-0156).
- **Figure:** Fig 4·g "Four resources, two workloads" (new: heartbeat writes on network, the blog join on CPU/memory; the lecture's own contrast at 01:24).
- **Words:** 300

### 4.9 The same pattern: failure detection
- **Opens with:** board: "Similar systems: failure detection in a distributed system".
- **Key points:** copy the indicator almost as-is: every node sends heartbeats to a central server, and a node whose heartbeats stop is down, e.g. when building your own AWS from EC2 machines (L-0132). Building your own load balancer, the same check tells you to stop sending to a dead backend (L-0133, left as taught + A-OOI-17 woven in: an AWS ALB health-checks each target every 30 s and drops it after 2 failures, so the load balancer asks rather than waits to be told). Observe the pattern and the properties a system needs instead of memorising question and answer (L-0134, echoed in 1.2).
- **ForwardChip:** heartbeats as load-balancer health checks · Lecture 5. Heartbeats in an unread-badge service · Lecture 8.
- **Figure:** Fig 4·h "Heartbeats, reused" (new).
- **RecallQuestions §4:** (1) A heartbeat write takes well under a millisecond in the database. Where does the rest of its time go without a pool? (2) The database allows 1,000 connections, you run at most 100 servers. What maximum per server, and why might 15 be risky? (3) Name the resource that limits the heartbeat store and the one that limits a 12-table report.
- **Words:** 300

---

## 5 · Blog rows: database decisions
**Section dek:** A Medium-like blog has two plain tables. Every column hides a decision: whether delete means delete, where long text lives, and how to store a date.
**Sec-meta:** about 35 min · class 01:40–02:11, Q&A 02:20–02:46 · tag: database
**Opening problem:** one user writes many blogs, many users (L-0170). A writer deletes a post by mistake and wants it back.
**RuleBox (§5):** "Ask of every table: does it need **recoverability, archival or audit**? If yes, soft delete." (L-0183). Box body: a second line from the board: "when user invokes delete blog, instead of DELETE we UPDATE". Sketch: a row with `is_deleted = true` and a small trash can.
**Estimated words:** 5,200
**Hand-off to 6:** "The blog is stored. A popular post still costs a join on every read."
**Q&A folded in:** custom-format benefit (02:03:20), time zones (02:04:35), why Redbus (02:05:52) → 5.8, 5.9. Rebalancing objection (02:06:20) → 5.3. Epoch overflow (02:08:39) → 5.9. Soft deletes grow the DB; GDPR (02:22:21–02:26) → 5.4, 5.5. Delete "downtime" interview question (02:30) → 5.4. Staggered deletion (02:36:58), cron takes pool connections (02:38:19) → 5.4. Uniqueness index (02:39:02), retention policy (02:40:05), soft delete vs archival (02:45:51) → 5.4.

### 5.1 Six components, and the blog schema
- **Opens with:** board: "Foundation topics in system design" (S64).
- **Key points:** six components shape most systems: database, caching, scaling, delegation, concurrency, communication; any decision touches one of them, and the indicator already showed all six (L-0168). Today covers database and caching; the other four are in Lecture 2 (L-0259 → ForwardChip). The case: a multi-user blogging app like Medium, no fancy recommendations (L-0170). `users(id, name, bio)`: auto-increment id, name to render, a short bio (~128 characters) (L-0171). `blogs(id, author_id, title, body, published_at, is_deleted)` (L-0172).
- **Figures:** Fig 5·a (board S64: the six components card), Fig 5·b (D-12 redraw: schema).
- **Words:** 350

### 5.2 Delete, or mark deleted?
- **Opens with:** "Why do people soft delete when the database gives you DELETE?"
- **Key points:** **soft delete** = an `is_deleted` column set to true instead of removing the row (L-0173). **Hard delete** = a `DELETE` query; the data can't be recovered (L-0174, left as taught). Reason 1, recoverability: let users undo (L-0175). Google Drive's trash keeps files for 30 days (L-0176). Reason 2, archival: content people worked on is rich data, e.g. to train ML models (L-0177, light inline clarification, simplified-medium + A-D-24: where users have a right to erasure, reusing deleted content needs its own legal basis or anonymisation). A job moves soft-deleted rows to S3 or other blob storage for training and other uses (L-0178). Reason 3, audit: deleted data may be needed as evidence (L-0179). Consumer platforms must hand such information to authorities, who don't want harassment evidence to vanish (L-0181, left as taught; A-D-23 not used). Design every table with these questions (L-0183 → RuleBox), from a holistic view rather than just building things (L-0184). In general, tables of user-generated content soft delete (L-0188).
- **MarginNote "From the instructor: the police station"** (skip unless you like war stories): at a startup, one user harassed another with a filthy comment; the victim went to the police, the police asked the platform for everything about the user, and the harasser deleted the comment on hearing of the complaint. A hard delete would have destroyed the evidence (L-0180). The instructor went to the police station himself with printed traces, something no engineer expects to do (L-0182).
- **PauseAndThink P7** (before the three reasons are revealed).
- **Words:** 600

### 5.3 The B+ tree argument
- **Opens with:** board: "+ Easy on the database engine [no tree re-balancing]".
- **Key points:** the lecture's fourth reason: most engines store data as a B+ tree; a hard delete removes an entry and unbalances a node, so the tree rebalances and burns CPU (L-0185 → **SN-07**). A soft delete only updates a column, so no rebalancing (L-0186, inline: it is still a write; an indexed-column UPDATE is a delete-mark plus insert in that index, and PostgreSQL writes a new row version). Know your engine's internals to judge this (L-0187). Asked in class: doesn't the benefit vanish once rows are finally hard deleted? The answer given: accumulate and hard delete in one batch, so the tree rebalances once or a few times instead of per row (L-0228, inline). Clubbing deletes clubs rebalancing (L-0229, inline). Deleting 100 rows per commit cuts rebalances 100× (L-0230, inline: batching cuts lock, commit and log overhead; page merges depend on fill, + A-D-11: MySQL's `DELETE … LIMIT` loop).
- **Figure:** Fig 5·c "Hard delete vs soft delete in the tree" (new; two panels as taught, a third panel "what engines actually do" for SN-07).
- **Words:** 450

### 5.4 The soft-delete lifecycle
- **Opens with:** soft-deleted rows pile up. Now what?
- **Key points:** soft deletes grow the database, so they are hard deleted periodically, e.g. once a day (L-0263). Or moved elsewhere instead: that is archival (L-0264). When to hard delete is subjective (L-0265). Soft delete and archival differ: soft delete *gives you time* to archive later in a batch; hard-deleting and copying each row to S3 immediately would be slow (L-0308). **Under traffic:** never delete 100,000 rows in one shot; stagger it across the day like garbage collection, e.g. 10,000 an hour or about 1,000 at a time (L-0283). **MarginNote "From practice: the interview question"**: an interviewer asked how to stay available while a cron job hard-deletes; a cron job has nothing to do with availability (L-0282). Their worry about locking rows is about strong consistency (no stale read of a row being deleted), not availability (L-0284, left as taught; ForwardChip: strong consistency · Lecture 3, L-0285). An hourly job also takes connections from the pool, while not deleting lets data grow: you gain some and lose some (L-0295). A database retention policy still means someone deletes: a database thread, the cron job offloaded (L-0297, + A-D-13: MongoDB's TTL monitor runs every 60 s and can lag). For regular deletes, offload to the database and stagger (L-0298, left as taught; same "offload" idea as 2.8). **Pitfall:** soft delete clashes with a unique index on email; a user who deletes their account can't sign up again, so here the row must be hard deleted (L-0296, inline + A-D-12: or use a partial unique index).
- **AnimationClip `l04-staggered-delete`**. Predict line: "100,000 soft-deleted rows, peak traffic. One DELETE, or many small ones?"
- **CodeBlock:** `CREATE UNIQUE INDEX users_email_live ON users(email) WHERE NOT is_deleted;` and a batched delete loop (`DELETE … WHERE is_deleted LIMIT 1000` repeated).
- **Figure:** Fig 5·d "The life of a deleted blog" (new).
- **Words:** 650

### 5.5 The right to be forgotten
- **Opens with:** a Facebook user asks the company to delete everything it holds on them.
- **Key points:** under GDPR's right to be forgotten, Facebook has to hard delete everything the user created within one month (L-0266, left as taught + A-CC-02: the right is not absolute; Art. 17(3) exceptions). It needn't be immediate; the one-to-two-month window gives room for cases like the user having harassed someone (L-0267 → **SN-08**, A-CC-01). PII is deleted at once, but logs hold everything, so data can be recovered (L-0268 → **SN-09**, A-CC-03). Atlassian's outage, where deleted data took 14 days to restore, shows companies don't hard delete everything ever created; they delete from tracked places while logs and snapshots keep it (L-0269, inline + A-CC-05: it was a deletion-script mistake restored from backups, not an erasure request). Daily snapshots are not rewritten after an erasure; the transactional system just holds no trace (L-0270, left as taught + A-CC-03: backups must be "beyond use" and age out). These are "compliance hacks", and legal helps (L-0271, inline: reframed as recognised practices, not loopholes). GDPR lets a user demand erasure and enforces it on every organisation (L-0273 → **SN-10**, A-CC-04: scope is EU establishments or people in the EU).
- **MarginNote "From the instructor: making an org GDPR compliant"**: it took him two months, building the infrastructure-level pieces (L-0272).
- **Figure:** Fig 5·e "Where an erased user's data still lives" (new).
- **Words:** 500

### 5.6 `bio` vs `body`: where long text lives
- **Opens with:** the same table has a 140-character bio and a blog body of thousands of words.
- **Key points:** bio uses a short text type, body a long text type; the database handles the difference (L-0189; the class said ~128 and ~140 characters, the page says "about 140"). A row store keeps a row together; the lecture says rows are fixed width so the database knows each column's byte offset (L-0190 → **SN-11**), exactly like a C struct (L-0191, inline: the analogy holds for fixed-length columns only). VARCHAR is stored inline with the row (L-0192, left as taught). LONGTEXT goes to a separate place on disk with only a reference in the row (L-0193, left as taught + A-D-14, A-D-15: InnoDB moves long values off-page only when the row doesn't fit; PostgreSQL's TOAST does it for any wide value). So reading long text costs two disk reads, short text one (L-0194, left as taught). Rows have to stay bounded: huge text can't sit in rows, and small rows scan easily (L-0195, + A-D-16: InnoDB's in-page row limit is just under 8 KB). Email, bio and names are short text; a body or a long comment is long text (L-0196). A 5,000-character comment is 5,000 bytes inline, a waste in every row (L-0197, inline + A-D-17: up to 4 bytes per character in utf8mb4). Why not always inline? List pages need title, excerpt and image, not the body; the body is read only when someone opens the post (L-0198). Keep rows to a bare minimum (L-0199).
- **Figure:** Fig 5·f (D-13 redraw).
- **Words:** 550

### 5.7 Three ways to store a date
- **Opens with:** "blogs published in the last 7 days."
- **Key points:** `published_at` can be stored three ways, each with its own advantages (L-0200). **1. The native type** (L-0201). A database serialises a date to disk in some format and parses it back into a date object to compare (L-0202). Hypothetically, if it were stored as a string like `02-04-2022T09:01:36Z` (L-0203), `WHERE published_at > now − 7 days` would read every row's string, pull out date, month, year, hour, minute, second and compare in C++ (L-0204). That is expensive; how your database stores data decides its performance (L-0205). Not every database stores a string: MySQL, Postgres and MongoDB each have their own format, some epoch seconds, some milliseconds (L-0206). Know how yours stores dates; if it's not fast enough, store them another way (L-0207). Native is extremely convenient but can be suboptimal and ruin performance in some cases (L-0208, left as taught + A-D-18 in the next paragraph: MySQL DATETIME is 5 bytes). **2. Epoch integer:** an integer column holding seconds or milliseconds since 1 January 1970, "where the clock started ticking"; many companies do this (L-0209, L-0210). The board's example value `172562347162` is illustrative (12 digits; 2022 epoch seconds have 10). As a 20-character string a date takes about 20 bytes; as an epoch integer, 4 bytes (L-0211). Efficient and light, but unreadable (L-0212). And light on the index: an integer compare is the cheapest operation there is (L-0213 → **SN-12**: native types in MySQL and PostgreSQL are compact binary too and index almost as well).
- **PauseAndThink P8** sits in 5.8 after the custom format.
- **Figures:** Fig 5·g (D-14 redraw). Fig 5·h "Twenty bytes or four" (new byte strip).
- **Words:** 650

### 5.8 Redbus and the custom format
- **Opens with:** a 2016 bus-booking table where date comparisons became the bottleneck.
- **Key points (attributed: the instructor knows it through a friend; unverifiable):** in 2016 Redbus stored dates as datetime, and massive date comparisons slowed things down (L-0214). Epoch would lose readability: engineers read raw values in SQL IDEs and the UI (L-0215). **3. Custom format:** relax a constraint you don't need; they needed the date, not the time (L-0216). They stored an integer `YYYYMMDD`, e.g. `20220402` for 2 April 2022 (L-0217). Readable, and an integer compare and index: fast (L-0218). The use case was production, more analytics than transactional (L-0227). The instructor has seen several places use custom formats (L-0223). Be creative and alter constraints; that is where the next level of optimisation comes from (L-0219). Every format has trade-offs; choose by whether you need readability, performance or convenience (L-0220). **Asked in class:** isn't `YYYYMMDD` inflexible if time is ever needed? Redbus knew it never would (L-0221). And it gives no speed over epoch, which you could format on the client? Agreed: same integer benefit; they chose readability, "their decision" (L-0222). The page states this plainly: the custom format buys readability, not speed over epoch.
- **PauseAndThink P8**.
- **Words:** 450

### 5.9 Time zones and running out of numbers
- **Opens with:** the questions after the date section.
- **Key points:** a native type can capture time zone information, mostly lost in epoch and custom formats (L-0224 → **SN-13**, A-D-21: native types mostly normalise to UTC and drop the zone; store the zone separately if you need it). "You get something, you lose something." With epoch storage, render in the viewer's local zone (L-0225). One epoch value is different local times in different zones, so keep everything in UTC (L-0226, as **MarginNote "From practice: burned by time zones"**). Asked: epoch keeps growing and will max out a 4-byte int (L-0231, left as taught). It is 4 bytes today and runs out "as soon as we hit 2032", and moving to 8 bytes doubles the space (L-0232 → **SN-14**, A-D-20: a signed 32-bit epoch ends 19 January 2038). Dates before 1970 need negative numbers, "wrong on so many levels" (L-0233, inline: negative epochs are normal; MongoDB dates are signed). An alternative is a compressed serialised datetime covering the whole range in "let's say" about 6 bytes; MySQL is the example (L-0234, left as taught + A-D-18: DATETIME is 5 bytes plus 0–3 for fractions). MySQL covers a huge range, BCE to about 20,000 years "I think", in very few bytes (L-0235 → **SN-15**, A-D-19: MySQL DATETIME is years 1000–9999; the wide range is PostgreSQL's). Read MySQL's datetime docs, not a blog or video (L-0236).
- **TradeoffTable T3** "Storing `published_at`": columns Native datetime · Epoch integer · Custom `YYYYMMDD` int. Rows: size (lecture's figures, with the fact-check's in brackets) · compare cost · readable? · time zone · range · convenience. Red ✕ on the epoch "readable?" cell. Ids L-0208, L-0211, L-0212, L-0213, L-0218, L-0224, L-0232.
- **RecallQuestions §5:** (1) Give the three reasons to soft delete, and one case where you must hard delete anyway. (2) A blog list page shows titles and excerpts. Why does storing `body` as long text help it? (3) Redbus's `YYYYMMDD`: what did it buy over epoch, and what did it give up?
- **Words:** 550 (plus the table)

---

## 6 · What a cache is
**Section dek:** A cache is not "RAM" and not "Redis". It is anything that saves an expensive disk read, network call or computation. One shared cache for the blog, a database table as a cache, and whether to compress.
**Sec-meta:** about 20 min · class 02:11–02:20, Q&A 02:20–02:42 · tag: caching
**Opening problem:** a popular blog post costs a three- or four-table join on every read (L-0251).
**RuleBox (§6):** "A cache is anything that saves one of three things: an **expensive disk I/O, network I/O or computation**." (L-0244). Box body: "Caches are just glorified hash tables… with some advanced data structures" (board). Sketch: three small icons (disk, network, gear) feeding one hash-table grid.
**Estimated words:** 3,000
**Hand-off to 7:** the exercise (6.5) is the bridge to Lecture 2; chapter 7 collects the habits first.
**Q&A folded in:** a DB table as a cache (02:20:22) → 6.3. Local storage (02:21:44) → 6.5. Compression (02:26–02:29) → 6.4. Redis vs a DB table (02:32–02:36) → 6.3. Managed Redis cost (02:35:48) → 6.3. Index in RAM? (02:41:08, 02:45:13) → 6.3.

### 6.1 Not just RAM
- **Opens with:** "people misunderstand caching a lot" (L-0238).
- **Key points:** this chapter is short on purpose: caching got a few minutes on day one and returns all through the course (L-0169), and it sets up the first discussion of Lecture 2 (L-0237). Caching is not just in-memory caching (L-0238). A cache is anything that saves a heavy computation or operation so you don't redo it (L-0239). Memoization in dynamic programming is classic caching (L-0240). Caches are not only RAM: disk and the network can be caches too (L-0241). Caching usually cuts disk or network I/O; the RAM habit comes from RAM being faster than disk (L-0242). If a network call is expensive, keep its result on local disk (L-0243). The rule: disk I/O, network I/O or computation (L-0244 → RuleBox; the four resources from 4.8 reappear). Be creative about where (L-0245). Caches are glorified key-value hash tables (L-0246, left as taught). Redis offers HyperLogLog, Bloom filters and geo queries, but underneath it's key-value (L-0247, left as taught + A-CC-16: as of Oct 2026 these are built-in types; values are separate encoded structures).
- **Figure:** Fig 6·a "What a cache saves" (new: three panels).
- **Words:** 450

### 6.2 One shared cache for the blog
- **Opens with:** the blog's architecture: users → LB → three API servers → database (D-15).
- **Key points:** the blog's cache is typically remote: any API server can reach it; logically it sits between the API servers and the database (L-0248). Read flow: check the cache; on a hit return; on a miss read the database, put it in the cache, return (L-0249). Every API server reads the same cache, so there is one copy everyone reads (L-0250). A popular blog would repeat an expensive join on each read; cache it centrally and the database load drops by a massive margin (L-0251). The remote cache still costs a network hop, but reading a precomputed result beats recomputing (L-0252).
- **AnimationClip `l04-cache-aside`**. Predict line: "Three API servers, 1,000 reads of one popular post. How many joins does the database run?"
- **Figure:** Fig 6·b (D-15 redraw).
- **ForwardChip:** caches at every layer (browser, CDN, LB, API RAM and disk, materialized views) · Lecture 2 §1. Building a distributed cache, eviction, LRU/LFU · Lecture 9 (via L-0253 in 6.5).
- **Words:** 400

### 6.3 A table can be a cache
- **Opens with:** asked in class: why not store the precomputed result in a database table?
- **Key points:** that is a possible place too (L-0260, + A-CC-11: a PostgreSQL materialized view stores a query's result; reads fall from 188 ms to 0.117 ms in the docs' example, and data is as fresh as the last refresh). Ask "why not this, why just this?"; what matters is that the product works and performs (L-0261). **Redis vs a table, from first principles** (asked in class): the app holds persistent connections to both, so connection cost cancels (L-0286). Redis reads memory; the database reads disk (L-0287, left as taught + A-CC-10: the buffer pool caches hot pages in RAM). Memory wins big for tiny reads (10–15 bytes); for 1 KB the gap is small (L-0288 → **SN-16**, A-CC-09: databases read whole 8–16 KB pages, so a 15-byte and a 1 KB read cost the same page I/O; the cited latency numbers are c. 2009). A disk database walks a B+ tree, about log n reads; a hash gets the value in one step (L-0289, left as taught). Memory costs more and is smaller, disk is bigger and cheaper; that cost is the biggest factor (L-0290). It's subjective: weigh read size, data layout, I/Os, the real gain, how much you store; overall not much difference (L-0291, left as taught). It holds if the computation saved is large (L-0292, the exact claim uncertain in the audio: kept as a short agreed caveat). Managed Redis has its own pricing (L-0293; A-CC-17 not used). A table in the app's own database adds reads to that database (L-0294). **Worst case:** the comparison assumes a disk read; a small table may sit in RAM and then there's no difference (L-0299). An index doesn't guarantee RAM reads; if it doesn't fit, you read disk, so design for the worst case (L-0300). Indexes are stored on disk, always (L-0307; ForwardChip: how indexes speed reads · Lecture 3).
- **Figure:** Fig 6·c "Hash lookup vs tree walk" (new).
- **TradeoffTable T4** "Where to keep a precomputed result": columns Redis · table in the app database · table in a separate database. Rows: read path · cost per GB · size limit · extra load on · freshness. Red ✕ on "table in the app database" "extra load on" cell: "the database already serving users". Ids L-0286, L-0287, L-0289, L-0290, L-0294.
- **Words:** 650 (plus the table)

### 6.4 Should the cache compress?
- **Opens with:** asked in class: do we compress on the cache side?
- **Key points:** it's a trade-off: decompression costs time, so compress only big values (massive text blobs) where it beats reading more bytes and paying for more memory (L-0274). Most caches are key-value and won't do it for you: compress before storing, decompress after reading (L-0275, left as taught + A-CC-07: Redis compresses only RDB files and optional list nodes). There may be plugins; the instructor has never needed one (L-0276, left as taught + A-CC-06: client libraries like pymemcache compress above 400 bytes). Compressing an email ID loses; a 10 KB blog body stored as 1 KB wins (L-0277). CDNs distribute images and video, and nothing stops compression (L-0278, left as taught + A-CC-08: text compresses well; images and video are already compressed). Reasoned live: caches should never compress for you, because compressing in the client sends 1 KB over the network instead of 10 KB (L-0279, left as taught; stated as the lecture's reasoning, not an industry rule). Flow: compress, send, store, receive, decompress, return (L-0280). Keep asking questions; they surface cases a lecture misses (L-0281).
- **PauseAndThink P9** (before the live reasoning). **Figure** Fig 6·d "Compress where?" (new).
- **Words:** 450

### 6.5 Exercise: every place you could cache
- **Opens with:** board: "Fun exercise: find possible places you can use as a cache, with an example."
- **Key points:** the exercise: on the blog's architecture find every place you could cache, with what you'd cache and what problem it solves; Lecture 2 opens with it (L-0254). One place is covered: the central application-level cache that every API server talks to, which saves DB calls; the CDN and the load balancer are hints (L-0256). The point is to spark ideas and see the "hacks" people use to squeeze performance (L-0257). Client-side local storage was asked about and deferred to that discussion (L-0262). Caching internals (eviction, LRU, LFU) are built later (L-0253 → ForwardChip Lecture 9).
- **MarginNote "From an earlier cohort"**: about two years earlier the same exercise led a participant at Goldman Sachs to propose a new cache place to his manager; it was approved and gave a big speed-up (L-0255, unverifiable: told as the instructor's story).
- **Figure:** Fig 6·e "Your turn" (board S85 + D-15 with numbered blank tags).
- **RecallQuestions §6:** (1) Name a cache that lives on disk and one that is a database table. (2) When does a Redis cache barely beat a table holding the same precomputed rows? (3) Why compress a 10 KB blog body in the app rather than in the cache?
- **Words:** 350

---

## 7 · What to keep
**Section dek:** The habits that ran through both builds, and where this lecture stops.
**Sec-meta:** about 3 min
**Opening problem:** none. Recap: both builds side by side.
**Key points:**
- **Figure** Fig 7·a "Two builds, one habit" (the final indicator design and the final blog design side by side, each box tagged with its chapter; doubles as navigation).
- **Heuristics card** (Prose list, 9 lines, each linking back): property and access pattern before the tool (§1, L-0029). Estimate before you optimise: is it storage or computation? (§2.6, §4.1, L-0105). Don't add moving parts; offload to the database (§2.7–2.8, L-0067, L-0068). Know how a feature works inside (§3.2, L-0086). Pool connections, with a budget (§4, L-0131, L-0320). Start conservative, observe, retune (§4.5, L-0161). Every table: recoverability, archival, audit? (§5.2, L-0183). Keep rows minimal (§5.6, L-0199). A cache is any saved I/O or computation (§6.1, L-0244). These restate placed ids; they add no new placement.
- **Trade-offs, always:** the domain is full of trade-offs and there is no one right answer; when you use something you gain something and lose something (L-0258). The trade-off intuition is built over eight weeks; from next week every design is argued for hours, and brainstorming won't move without the "why" (L-0328). Where to stop overthinking: a later session looks at one system through manager, product manager, senior and junior engineer "hats" (L-0329 → ForwardChip: week 6; the senior engineer's view on requirements appears in Lecture 8). Keep asking questions (L-0281 in 6.4, linked).
- **ForwardChips ("Where this lecture stops"):** tomorrow, Lecture 2: every place to cache, then scaling, delegation, concurrency and communication on Medium (L-0259 in 5.1, L-0254 in 6.5). Real-time presence on WebSockets · Lecture 4 (L-0102). Strong consistency · Lecture 3 (L-0285). Redis TTL internals · Lecture 3 and 9 (L-0306). Flash sales · week 7 (L-0164).
- **Components:** Figure, Prose, ForwardChips. No RuleBox, prompt or recall (the design's section end lists "Concepts in this section").
- **Words:** 400

---

## Totals
| Chapter | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 300 | – | – | – | – | – |
| 1 Approach | 900 | 1·a, rule sketch | – | – | – | – |
| 2 Green dots | 3,900 | 2·a, 2·b, 2·c, 2·d, 2·e(step), 2·f, 2·g, 2·h, 2·i, rule sketch | l04-heartbeat-expiry | P1, P2, P3 | – | SN-01..02 |
| 3 Redis or DynamoDB | 3,300 | 3·a, 3·b, 3·c, rule sketch | – | P4 | T1 | SN-03..05 |
| 4 Six million heartbeats | 4,600 | 4·a, 4·b(step), 4·c, 4·d, 4·e(step), 4·f, 4·g, 4·h, rule sketch | l04-connection-pool | P5, P6 | T2 | SN-06 |
| 5 Blog rows | 5,200 | 5·a, 5·b, 5·c, 5·d, 5·e, 5·f, 5·g, 5·h, rule sketch | l04-staggered-delete | P7, P8 | T3 | SN-07..15 |
| 6 What a cache is | 3,000 | 6·a, 6·b, 6·c, 6·d, 6·e, rule sketch | l04-cache-aside | P9 | T4 | SN-16 |
| 7 Keep | 400 | 7·a | – | – | – | – |
| **Total** | **~21,600** | **35 figures (3 step-throughs) + 6 rule-box sketches** | **4** | **9** | **4** | **16 notes (SN-01..16) covering 17 items** |

Reading time is about 100 minutes, spread over seven chapter pages (the longest, chapter 5, is about 25 minutes). The glyph kit in `figures.md` §0 is shared with Lecture 2 and adds four glyphs (status dot, heartbeat pulse, TTL timer, table block).
