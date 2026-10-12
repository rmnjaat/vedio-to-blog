# Lecture 01 lesson outline: "Medium under load"

**Promise (one line):** Follow a Medium story from the reader's browser to the database and back. For each box on the way you will know where it can cache, how it scales, what work it should hand off, how to keep a shared counter correct, and which channel to use to push a change to the reader.

**Dek (from the design sample, kept):** Caching at every level, then the rest of the framework (scaling, delegation, concurrency and communication), each worked through on Medium.

Source: Lecture 01 (week 1, day 2), 03:15:09 of class plus the board. Ledger `learn/lec01/ledger/ledger.jsonl` has 400 items: 392 placed and 8 dropped (see `placement.json`). The design is `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments are in `factcheck_applied.md`. Figures are in `figures.md`, clips in `animations.md`, and pause-and-think prompts in `prompts.md`.

---

## How to read this outline

### Spine
The spine is "Grow Medium" (teaching map, option A). Each section opens with something Medium is struggling with right now. The order is the lecture's own order with one swap: **Delegation comes before Concurrency**. The design sample's TOC lists Concurrency as 3, but the counter that delegation builds (`total_blogs++`) is exactly what concurrency breaks. With the swap, §4 can point back to §3's at-least-once double count, and the claps example gets its setup. The TOC in the page header changes to match. All other design-sample structure stays as it is.

Final section numbers: 1 Caching · 2 Scaling · 3 Delegation · 4 Concurrency · 5 Communication · 6 What to keep. §2.4 is the published sample section. It is reused nearly verbatim, with the fixes listed under §2.4.

### Voice rules (apply everywhere)
- The page speaks in its own voice. There is no teacher–student dialogue and no student names. Class Q&A becomes explanation. For example, the question "doesn't holding pools to every database load the API server?" becomes a sentence that answers it. When a proposal was corrected in class, the page states the tempting idea and then the correction ("It is tempting to think…; in fact…").
- Students' production stories become **"From practice"** margin notes ("One team building a config platform…"), with no names.
- The instructor's own war stories (the data center, the 2015 push service) can appear as "the instructor" in a margin note. There are only two, and both are asides.
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix.
- Outside facts appear inline, with a link to the source in the sentence or in a SourceNote.

### Component vocabulary (all from design B; numbers refer to NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph: the sample's rhythm. |
| **Figure** | #6 static figure (panels on graph paper; stack <760px) | Redraws of board diagrams D-xx and new figures. Spec in `figures.md`. |
| **StepThrough** | #7 step-through (time runs down, Prev/Next, deep link `#fig-x/step-n`) | Discrete sequences: drift, lag, crash/retry, commit, race. |
| **AnimationClip** | #10 clip (poster = end state, play pill, chapter chips, predict line before it) | 4 clips (one per section at most, per the explainer-animation skill) where change over time is the lesson, plus the already-built `l01-replica-lag` held in reserve. Spec in `animations.md`. |
| **RuleBox** | #5 key rule (hand-ruled box + small sketch, label "The rule for this whole chapter") | Exactly one per section. |
| **PauseAndThink** | #8 sticky-note card with two choice buttons and a reveal | 9 prompts. Spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table (glyph headers, one red ✕ cell, stacks <700px) | 5 tables. |
| **MarginNote** | #12 named collapsible aside (title + one-line "skip unless…" reason) | Side material: "From practice" stories, "See it yourself" how-tos, edge cases. The sample has no separate side-note element, so every margin note uses this component. |
| **SourceNote** | #9 sourced fact (block quote + source line), headed **"More precisely"** | Placed directly after the teacher's point. It keeps the point, gives the precise version and links the source. Only for wrong / outdated / imprecise-medium-or-high items: 31 ledger items, covered by 28 notes (SN-01..SN-28). Some notes cover two neighbouring items. |
| **CodeBlock** | the sample's `pre code` (Recursive mono, comment casual) | Short, runnable-shaped snippets only. |
| **ForwardChip** | small chip in Recursive casual: "coming later · week N" | Topics deferred in class. The deferral itself marks the edge of this lesson. |
| **RecallQuestions** | #13 recall (3 questions, `details` reveal) | Exactly 3 per section. |
| **AboutThisClass** | lecture header meta + a short `details` note under the TOC | Course-structure facts only. |
| **NotationKey** | #4 notation key, once per lecture | At the top of §1, extended with the glyphs §3 and §5 need (pipe = broker/stream, cloud = CDN, stick figure = reader). |

### Marker colours (NOTES.md, unchanged)
Blue = request / data path. Green = ack / success. Red = failure, stale read, hard limit. Graphite = everything else. Dashed = async (replication, queue hand-off). The replication arrow **starts at the replica and points at the master** ("pulls changes"): arrowheads show who initiates.

---

## Lecture header (unnumbered)

- **Kicker:** Lecture 01 · week 1, day 2 · running case: Medium
- **H1:** Medium under load. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** (design #2, "you are here") with the six sections below.
- **AboutThisClass** (collapsed `details`, about 120 words): this is day 2 of week 1 and finishes the course framework on Medium (L-0001). It covers caching levels, then scaling, delegation, concurrency and communication (L-0007; the page swaps delegation and concurrency). Concurrency is kept short here and gets its own deep session in week 2 (L-0008). The course runs 8 weeks / 16 sessions (L-0005). "How to use this page": there are no post-class reading lists, and the lesson order changes from cohort to cohort. When a term catches your eye, look it up in primary docs. The class's example was MySQL's documentation on how it stores datetimes, and serendipity beats a curated list (L-0003, L-0004).
- **Medium so far** (Prose, about 150 words, day-1 recap, no ledger ids): a reader → API servers → one database, plus a centralized Redis. This page grows that picture. Fig 1·a is introduced here and reused in §1.2.
- Estimated words: 350.

---

## 1 · Caching at every level
**Section dek:** Before buying more machines, stop doing the same work twice. Every box on a Medium request's route can keep a copy of something.
**Sec-meta:** about 20 min · class 00:06–00:35, Q&A 02:27–03:04
**Opening Medium problem:** a story goes viral. Thousands of readers open the same published post, and every view travels reader → load balancer → API server → Redis → database. Each hop costs time, and the shared cache and the database pay for every view.
**RuleBox (§1):** "A cache is anything that saves an expensive computation or an expensive I/O." (L-0058). Box body: for every component on the request route, ask whether you can cache something there and whether it would make the system better. If you assume a cache is RAM-based and centralized, you will never find the other places (L-0069, L-0064). Sketch: a request route with a "?" over each box.
**Estimated words:** 4,300
**Q&A folded in:** LB invalidation (02:27:58) → 1.6. Intermediate service = cache / API-gateway-like (02:35:25) → 1.1 and 1.6. CDN RAM vs disk (02:39–02:41) → 1.5. Netflix at ISPs (02:47) → 1.5. Config platform (02:30) → 1.8. Browser cache how-to and DevTools (02:59–03:00) → 1.4. React Query and memoization (03:03–03:04) → 1.4 and 1.1. Pub/sub invalidation idea (00:21:36) → 1.2 ForwardChip.

### 1.1 Where can a cache go?
- **Purpose:** replace "a cache is Redis" with "a cache is any saved copy", and set up the walk along the route.
- **Opens with:** the viral-story problem above.
- **Key points:** the question to ask at every layer is what you would cache there, where exactly it sits, and what it saves (L-0011). "It reduces latency" is not an answer; name the box. One centralized cache is the most natural answer, and that is why you should look past it (L-0012, L-0017). A cache only helps if the cached read is cheaper than the work it replaces (L-0066). Any intermediate copy that saves compute or I/O counts as a cache, even a whole service sitting between the front end and the API (L-0322). It is the same instinct as memoization in dynamic programming: nobody wants to repeat a computation (L-0377).
- **Components:** NotationKey (once), Prose, RuleBox §1, PauseAndThink **P1** (the reveal names the API server's RAM and disk and hands over to 1.2/1.3).
- **Words:** 450

### 1.2 The API server's own memory
- **Opens with:** every Medium API server already has RAM, and every request crosses the network to Redis anyway.
- **Key points:** a hash map in the API server's RAM, next to the central Redis (L-0013). The point is not consistency. It saves a network call, which makes it an underrated hack (L-0019, L-0022 with inline clarification, L-0024). Its costs: size is limited by what the app needs, the cache is lost on a crash, and each instance has its own copy (L-0014). Why the copies disagree: one server refreshes a hot key while another lags, and a server never sees what the others cached. A request that lands elsewhere misses, goes to the database and fills that server's own copy (L-0015, L-0018). Centralizing fixes this but gives up the local hop (L-0016). Two ways it still works: sticky sessions, where one user always reaches one server (L-0020, plus A-CS-21 inline: if that server dies the user moves and the cache is rebuilt), or data that is almost static (L-0023). **Medium hook:** a published story almost never changes, so two servers holding two copies is fine (L-0025). You are giving up strong consistency between the copies, and whether that is acceptable depends on the use case (L-0021). It is not either/or: real systems layer a local cache with expiry over Redis, which also takes load off Redis (L-0026, L-0027). RAM is small, so TTLs and flushing matter (L-0028, plus A-CS-12: give every local key a maximum TTL and cap memory).
- **ForwardChip:** keeping local caches in sync through pub/sub invalidation. Here is the idea: servers publish and subscribe to change events. It comes later (L-0046), plus A-CS-11: Redis 6 client-side caching with CLIENT TRACKING sends targeted invalidations.
- **MarginNote** "Or run Redis on the box": a local Redis on each API server (L-0029). Skip unless you're choosing a local-cache library.
- **Figures:** Fig 1·a (D-01 redraw). **StepThrough** Fig 1·b "Two servers, two copies" (steps: miss on A → fill A; next request lands on B → miss → fill B; a story edit updates the database; A still serves the old copy until its TTL runs out).
- **Words:** 750

### 1.3 The API server's disk
- **Opens with:** the 20 GB disk on that same API server holds the OS and a few jar files and is mostly empty.
- **Key points:** caching on the API server's own disk saves the network trip to the database or the cache (L-0057). It answers the 1.1 prompt. A cache does not have to fit in memory (L-0058 is restated through the RuleBox). The disk holds only the OS, bundles, jars and packages, so 2–3 GB of 20 GB are used (L-0059, plus A-CS-04 inline: on AWS that root disk is usually EBS, while instance-store disks are local, fit caches well, and are wiped on stop). RAM is scarce and expensive: of 8 GB, the OS, the app server and other jobs take most of it (L-0060). A local disk read beats the network round trip to a central cache (L-0061 → **SourceNote SN-03**). Use it only where cross-server inconsistency is acceptable (L-0062). **Statutory warning**, set in bold: there is no central view, so two servers can answer differently (L-0067). Think through every step yourself instead of taking components for granted (L-0065).
- **MarginNote** "From practice: it worked wonders": an engineer at a large bank applied disk caching after hearing this idea and it "worked wonders" (L-0063). Skip unless you want proof it ships.
- **Figure:** Fig 1·c "What's on an API server" (RAM bar vs disk bar, plus a latency ladder).
- **Words:** 500

### 1.4 Closer to the reader: the browser
- **Opens with:** the fastest request for a Medium story is the one the reader's browser never sends.
- **Key points:** the browser and the CDN are the two caches nearest the reader; this subsection takes the browser (L-0041). Cache static images and assets, and even some API responses, so the client never calls the backend (L-0042). After the first visit images load from the browser's cache, not from the CDN (L-0368). Local storage is a good place for a decent but limited amount of data (L-0045, L-0367 + A-CS-23: about 5 MiB, synchronous, use IndexedDB for large data). Modern browsers expose `localStorage.setItem/getItem` (L-0370, with an inline note that it stores strings only, so images belong in the HTTP cache or the Cache API). A JWT kept in the browser saves server work (L-0043 → **SourceNote SN-04**). Offline-first apps change data locally and sync later, which feels fast (L-0044, with an inline clarification: this is done with Service Workers and Background Sync). Client libraries such as React Query cache API responses in the JS runtime (L-0376). Recommendations: Amazon could, hypothetically, keep a user's recommendations in local storage and refresh them periodically (L-0048). The "50 cached, show 10 at random" trick makes daily-refreshed picks feel fresh (L-0049).
- **MarginNote** "From practice: caching for perception": one e-commerce team cached re-ranked recommendations on the client because reshuffling on every visit confused shoppers while a day-old ranking lost personalization. They ran experiments to find the right cache duration and accounted for the cache when building training data (L-0047). Skip unless you build recommendation UIs.
- **MarginNote** "See it yourself": open DevTools → Network on an image-heavy page, and look for cached responses with no network call. Then DevTools → Storage/Application → Local Storage shows what any site caches (L-0369, L-0371). Skip if you've done this.
- **Components:** Prose, two MarginNotes, SourceNote SN-04. No figure: the layer map in 1.8 shows the browser.
- **Words:** 550

### 1.5 The CDN, and caches closer still
- **Opens with:** Medium's "popular stories" list is the same for everyone for minutes at a time, yet every reader's request goes all the way to the API server.
- **Key points:** misconception: CDNs cache only images and video. A CDN is a proxy between you and the backend, everything that passes through it is bytes, and it can cache API responses too (L-0051, L-0332; A-CS-08 inline: Cloudflare does not cache JSON or HTML until you add a cache rule; A-CS-09: mark per-user responses `Cache-Control: private`). Near-static responses served from the CDN never reach your backend or your central cache (L-0053, L-0055). Giphy caches results for its most popular search terms (L-0054). An endpoint like `search.abc.com/popular` → for Medium, `/popular` (L-0056; A-CS-10: for content that changes, prefer versioned file names over invalidation). From practice: one team cached whole responses on Cloudflare and used Prerender.io (L-0050, with an inline clarification of what Prerender actually caches). Where a CDN keeps its data: disk/SSD rather than RAM, because the objects are huge and the CDN is already close to the user (L-0333 → **SN-05**, L-0334 → **SN-05**, L-0335 inline: the RAM → disk → origin tier model is broadly how CDNs work). **Beyond the CDN:** very popular shows can be cached inside ISPs, at PoPs nearer the users, which is faster and saves CDN cost (L-0344). An ISP with decent data centers can serve a show without going to the CDN (L-0346). This works because a show doesn't change once it is live (L-0347). Cloudflare's engineering blog covers working with ISPs (L-0348). A next level beyond the CDN, with Netflix as the best-known user (L-0349, inline: Akamai placed servers inside networks first). The ISP lawsuit over Squid Game traffic (L-0345, inline: it was SK Broadband in 2021).
- **ForwardChips:** CDNs in depth · weeks 3–5 (L-0052, L-0331; the page says "week 3 onward"). Video streaming · week 6 (L-0301).
- **MarginNote** "Video streaming is mostly CDN": L-0302 (simplified; leave). Skip unless you stream video.
- **Figure:** Fig 1·d (D-02 redraw, panel a) + panel b "ISP cache". Speech bubble (the one for §1) on the CDN cloud: "it's all bytes to me".
- **Words:** 650

### 1.6 The load balancer and the API gateway
- **Opens with:** every Medium request already passes through a load balancer. Could the answer wait there?
- **Key points:** load balancers and API gateways (nginx, AWS's load balancer, API gateways) can cache responses like a CDN, so the request never reaches the backend (L-0068 → **SN-06**). Invalidation is by time only. There is no API to evict an entry, so you live with the TTL (L-0308 → **SN-06**, L-0309: TTL is your main lever). A service in front of several backends that takes one query and fans it out works like an API gateway, and it is also a natural place for a cache (L-0323).
- **Components:** Prose, SourceNote SN-06 (covers L-0068, L-0308, L-0309, with A-CS-06 and A-CS-07).
- **Words:** 300

### 1.7 Inside the database: materialized views
- **Opens with:** an author's stats page joins users, stories, claps and follows on every load, and the numbers barely change during the day.
- **Key points:** the tempting idea is that a database view is a cache (L-0030 → **SN-01**: a plain view caches nothing). A materialized view stores a query's result, joins plus computations, as a pre-joined, pre-computed table. Queries hit the view (L-0031). Joins are the big relational cost. If 80% of load is a six-table join over slow-changing data, store the result (L-0033). A view can add derived columns (L-0034). Board example: marks in per-subject columns, plus a derived `total` and joined personal details (L-0035). It saves expensive computation, especially joins (L-0040). Mostly a relational feature, with some other databases too (L-0032). It must be refreshed. Triggers were the class's mechanism (L-0036 → **SN-02**). It pays off only when data changes rarely, because frequent refreshes slow things down (L-0037). Data engineers use these daily for analytics, and backend engineers often don't know them (L-0038). Read about views and MVs, then implement one, because without implementation it stays theory (L-0039).
- **Figure:** Fig 1·e "A materialized view" (base tables → view with a derived column; refresh arrow). **CodeBlock:** the board's example in PostgreSQL syntax: `CREATE MATERIALIZED VIEW results_mv AS SELECT p.name, m.maths, m.physics, m.chemistry, m.maths + m.physics + m.chemistry AS total FROM marks m JOIN people p ON p.id = m.student_id;` then `REFRESH MATERIALIZED VIEW results_mv;` (matches SN-02). One comment line gives the Medium equivalent: `-- Medium: author_stats = users ⋈ stories ⋈ claps`.
- **Words:** 550

### 1.8 One route, every layer
- **Opens with:** put it together. Here is every place one Medium request can be answered.
- **Key points:** the full list along the common request path: browser, CDN, load balancer / API gateway, API server RAM, API server disk, centralized remote cache, database materialized views (L-0070). Every cache is a trade-off. Local copies give up strong consistency, and if data changes rarely or a little staleness is fine, "it's the best thing ever" (L-0071). Don't assume one central cache is the only option. Use whatever layers help, especially the ones that make infrastructure cheaper (L-0318). **From practice (a config platform):** configs are tiny but latency-critical, and more than 3 ms added is a no-go (L-0314, L-0315). Changes are snapshotted to S3, and apps load them into memory and also onto local disk (L-0314). Mobile clients use a CDN instead (L-0316). Deep layering works because configs need little invalidation and some inconsistency is fine (L-0317). Design lesson: a rarely used fallback path is an anti-pattern, because it isn't exercised and is stale when needed. Make the "fallback" part of the normal path (L-0319). Here memory is empty on every start, so the disk path always runs. Reads always hit memory, a background thread pulls from the CDN, and every change goes to git and the CDN together (L-0320, L-0321).
- **Figure** Fig 1·f "One Medium request, every place it can be answered" (static layer map; a route walk is a taxonomy, not a time dynamic, so no clip). Lead-in line: "A reader opens `/popular` for the second time today. Which box answers?"
- **Figure:** Fig 1·g config platform (inside the MarginNote "From practice: a config platform that can't afford a miss").
- **TradeoffTable T1** "Cache layers": columns are Browser · CDN · LB/API gateway · API RAM · API disk · Redis · Materialized view. Rows: what you cache there · what it saves · who sees the same copy · how it's invalidated · size limit · Medium example. The one red ✕ goes on the LB/API gateway "how it's invalidated" cell: "TTL only, in class; see SN-06". Ids L-0014, L-0028, L-0037, L-0062, L-0068, L-0071, L-0308, L-0367.
- **RecallQuestions §1:** (1) Why is a local RAM cache acceptable for a published Medium story but risky for its clap count? (2) Your API servers have 6 GB free RAM and 17 GB free disk. Which do you use for a cache of rendered stories, and what must be true of the data? (3) Name three caches a request for `/popular` could hit before it reaches your API servers.
- **Words:** 550 (plus the table)

---

## 2 · Scaling
**Section dek:** more readers than one box can serve. What scaling means, the two directions, the spikes you can see coming, and why the database goes first. The section's weight is on how databases are actually scaled (L-0077).
**Sec-meta:** about 22 min · class 00:35–01:05, Q&A 02:37–03:10
**Opening Medium problem:** Medium launches a newsletter campaign. A million readers may arrive within minutes. One API server and one database have been fine until today.
**RuleBox (§2):** the sample's "Scale **bottom up**: the database first, then the API servers." (L-0100) sits in 2.4, as in the sample. The design label "The rule for this whole chapter" stays.
**Estimated words:** 4,600
**Q&A folded in:** autoscaling = horizontal; who writes the rules (01:03:42–01:04:06) → 2.3. Leader election (00:57:38) → 2.4 MarginNote. One connection string = proxy (00:59:59) → 2.4. Pools per database (01:00:36–01:01:13) → 2.4. Shards ≠ copies; vertical sharding (01:02:06–01:02:24) → 2.4. Oracle RAC (01:02:52), clustering = horizontal (02:52) → 2.4 MarginNote "Clusters". Replica load on master; hierarchical replicas (02:37–02:38) → 2.4. Read-heavy API = replicas (03:06) → 2.4. Multi-master (03:09) → 2.4 MarginNote. Sharding formula (03:01:58) → 2.4.

### 2.1 What scaling means
- **Opens with:** a million readers in a day is easy. A million in the same minute is the problem.
- **Key points:** scaling is the ability to handle a large number of *concurrent* requests. Concurrency is the hard part (L-0078). There are two strategies, vertical and horizontal. Vertical means more RAM and CPU on the same machine (L-0079). The board's names: **Hulk** makes the infrastructure bulky (L-0073). **Minions** add more machines (L-0075). Pros and cons: Hulk is easy to manage but risks downtime (L-0074). Minions give linear amplification and fault tolerance, but bring a complex architecture and network partitions (L-0076).
- **TradeoffTable T2** "Hulk vs Minions" (2 columns, glyph headers: one big box / a ×5 fleet). Rows: what you do · easy to manage? · downtime risk · capacity growth · failure tolerance · new problem. The red ✕ goes on Hulk's "where it stops" cell: "the largest machine the data center has".
- **Words:** 350

### 2.2 Vertical, horizontal, and the hardware ceiling
- **Opens with:** Medium's database sits on a 16 GB machine. Can you just keep clicking "bigger"?
- **Key points:** the vertical ladder is 16 → 32 → 64 → … → 4 TB by changing the instance type (L-0080). The wrong answer to "why does it stop?" is "AWS doesn't show a bigger option". Supercomputers exist (L-0081). A phone whose card slot supports 256 GB won't read a 512 GB card (L-0082). Components talk over buses with a hardware protocol, and both sides must support the size (L-0083). So vertical scaling ends where the physical hardware ends. Software is an abstraction over hardware (L-0084). CS fundamentals go a long way (L-0085). Horizontal means more machines, once one machine can't keep up. It is generally preferred (L-0087). Linear amplification: 100 rps per machine and 500 rps needed gives 5 machines (L-0088, with an inline note that the usual term is linear scalability and it holds only while shared dependencies keep up, which is the point of 2.4). It is not either/or. Start vertical while the product is young, then go horizontal, because horizontal complicates deployment (L-0095). Avoid premature optimization (L-0096). **For Medium:** scale the API servers vertically first, then put a load balancer in front and add servers (L-0097). Adding API servers is easy because they are stateless (autoscaling groups, HPA, LB). The data is where it gets interesting (L-0120).
- **PauseAndThink P2** (the ceiling).
- **MarginNote** "Where this comes from": the instructor learned it working in a college data center, where a microprocessor professor demonstrated the physical limits (L-0086). Skip if you just want the rule.
- **ForwardChip:** designing a load balancer · week 3 (L-0098).
- **Figures:** Fig 2·a "The vertical ladder" (ladder + ceiling + SD-card inset). Fig 2·b (D-03 redraw) "A good scaling plan". Fig 2·c (D-04 redraw) "medium.com behind a load balancer", with the 100 rps × 5 labels.
- **Words:** 750

### 2.3 Spikes you can see coming
- **Opens with:** Medium's marketing team is about to send a push notification to every user.
- **Key points:** predictive scaling. On Amazon Prime Day, BI forecasts orders, and machines needed = forecast ÷ per-machine capacity (L-0089). Per-machine capacity comes only from load testing. There is no formula that says a 32 GB machine does 5,000 rps (L-0094). Autoscaling groups are too slow for a sudden large spike (L-0090; leave + A-CS-20 inline: scheduled scaling, predictive scaling and warm pools exist for spikes you know about). The campaign case: prepare the infrastructure first, then tell marketing to send (L-0091). That takes cross-team coordination, because scaling is a team game (L-0092). Autoscaling is fine for small spikes (L-0093). An autoscaling group *is* horizontal scaling (L-0131). It only launches instances and registers them behind the LB. You write the scale-up and scale-down rules, e.g. "average CPU > 60% → add a node" (L-0132).
- **Figure:** Fig 2·d "Capacity math and the spike" (two panels: the arithmetic; the timeline where the campaign spike arrives before the autoscaler catches up).
- **Words:** 450

### 2.4 Scaling the database *(the published design sample: reuse, with fixes)*
- **Opens with (sample):** five API servers are ready for the campaign. The database is still one machine.
- **Key points (sample text, by h3):**
  - *Why the database goes first:* extra requests become load on dependencies (L-0099). Cascading failure. Outage reports keep showing it (L-0101, softened per fact-check: "a major cause of large outages; Google's SRE book treats it as its own failure class", with a link). **AnimationClip `l01-cascade`** (the sample's cascade clip, kept). RuleBox §2 bottom up, including "for massive campaigns this is an org-level effort; dependent teams document how they scale" (L-0100). The database is the most critical and most brittle component (L-0102).
  - *A bigger machine:* the easy first step (L-0103; the ladder refers back to 2.2 rather than repeating L-0080). The sample's ceiling paragraph is shortened to one sentence that points to 2.2.
  - *Read replicas:* 90:10 or 99:1 (L-0104). Blogs and YouTube (L-0105). Handle reads and most of the problem goes away (L-0106). Master + replica with async replication, almost a native feature you configure (L-0107; A-CS-14 one sentence: semi-synchronous replication if you can't lose a commit). SREs set this up daily, so search "how to set up MySQL replication" (L-0108). The replica pulls, the master doesn't push (L-0109, inline clarification via the sample's PostgreSQL quote: the replica connects, then the primary streams over that connection). The database doesn't route reads for you (L-0110). Two connection objects (L-0111, CodeBlock as in the sample). Tools and "magic layers" exist, but you decide which reads are critical (L-0112; A-CS-16 inline: Aurora reader endpoint, libpq `target_session_attrs`). With one connection string, a proxy does the routing (L-0125). Bank balance vs profile (L-0113; A-CS-13: lag is measurable, ReplicaLag, usually under 1 s in PostgreSQL). **PauseAndThink P3** (sample's prompt). **StepThrough** Fig 2·f replication lag (sample's, with the arrow fix). Replicas cost the master a little (L-0324, L-0325). How replicas fetch varies (L-0327, inline). About five per master (L-0326 → **SN-08**). Replicas of replicas: 5 × 3 = 15 (L-0328, L-0329, Fig 2·g new). If replicas start hurting the master, move to sharding (L-0330). Keep adding replicas as the API fleet grows (L-0383). When the data is too big to cache, replicas are the way to serve a read-heavy API (L-0382). The routing to a replica lives in the API server's business logic (L-0387).
  - *MarginNote "If the master dies"* (sample): leader election (L-0122 → **SN-07**, L-0123). ForwardChip: leader election, next-to-next week; it comes up in three places in the course (L-0124).
  - *Sharding:* when the master can't keep up after a vertical bump and replicas (L-0115). Mutually exclusive subsets on multiple nodes. Every shard is a master and can have replicas (L-0116). Three shards are not three copies (L-0128). Routing logic in the API server, `hash(user_id)`, and the mapping must stay fixed (L-0117, with a **light inline clarification** of the simplified-medium item, A-CS-17: `% N` remaps almost every key when N changes, so production routers use consistent hashing or fixed buckets). Naive sharding: one connection per shard, forward, return (L-0118, CodeBlock). Build the naive version locally first (L-0119). Pools per database: you need them anyway (L-0126). Pools can't be shared because TCP connections to a database are stateful, and a proxy can hold them instead (L-0127). Who shards for you depends on the database (L-0358, inline). No formula: analyze the data and access pattern (L-0373; A-CS-18: pick a key with many evenly accessed values). Vertical sharding = tables on different databases (L-0129, Fig 2·h new). The three ways in summary (L-0121).
  - *MarginNote "Why not let replicas take writes too?"* (sample): multi-master and conflicts (L-0388, L-0389). Order: replicas → sharding → multi-master only if you must (L-0390).
  - *MarginNote "Clusters"* (new, about 90 words): a database cluster is horizontal, not vertical (L-0356). A vendor cluster looks like one database but splits data internally (L-0357 → **SN-09**: Oracle RAC is shared-disk). Clustered servers like RAC to avoid outages are a valid design. There's no single way, and fault tolerance gets week 5 (L-0130; ForwardChip week 5). L-0114 ForwardChip: read/write proxy layers, week 5 or 6.
  - *TradeoffTable T3* (sample's "The three side by side", with the "Where it stops" replicas cell changed to "a handful per master in practice (RDS allows 15); a tree beyond that", per SN-08).
- **Fixes to the sample:** (1) every replication arrow goes replica → master, labelled "pulls"; (2) add SN-07, SN-08, SN-09 and the L-0117 inline clarification; (3) the sample's "≈5 per master" figure label becomes "a few per master"; (4) the sample says "MySQL, PostgreSQL and MongoDB all ship this as configuration", which is outside knowledge. Keep it with a link to each vendor's replication docs or cut it to "almost a native feature you configure" (L-0107). Recommend cutting.
- **Figures:** clip l01-cascade poster, rule sketch (D-05 redraw), Fig 2·e (D-06 redraw, sample 2.4·a), StepThrough Fig 2·f (sample 2.4·b), Fig 2·g hierarchical replicas (new), Fig 2·h vertical vs horizontal sharding (new, small).
- **RecallQuestions §2:** the sample's three are kept (cascade; sixth replica doesn't help writes; shards aren't copies). The second question's answer adds "beyond a handful of replicas, build a tree or shard".
- **Words:** 2,450 (the sample's ~1,900 + additions)

---

## 3 · Delegation
**Section dek:** publishing a story does too much inside one request. What to take out of the request, the two kinds of broker, and the Kafka essentials you need to design with (L-0134, L-0010).
**Sec-meta:** about 25 min · class 01:05–01:37, Q&A 02:27–03:14
**Opening Medium problem:** Medium wants to show "74 essays" under each author's name. Counting on every profile view is a join. Updating the count on publish puts another write inside the request.
**RuleBox (§3):** "Whatever does not need to be done in real time should not be done in real time." (L-0137). Board subtitle "The mantra for performance". Sketch: client ①→ API ③← with ②→ broker (D-08 shape, tiny).
**Estimated words:** 5,000
**Q&A folded in:** ordering / round robin / N consumers for N partitions (01:31) → 3.6. Queue vs stream by operation count and cost (01:33) → 3.8. Partition count, batch commit (01:33–01:34) → 3.6, 3.7. Queue = one consumer group (01:34:32) → 3.8. Visibility timeout, delete = success (01:35, 02:58) → 3.3. In-memory vs infra queue (01:37) → 3.3 MarginNote. SNS, SNS+SQS (02:27) → 3.8. SQS → Kinesis story (02:28) → 3.8 MarginNote. Kafka → SQS fan-out (02:42) → 3.6. Kafka broadcast (02:44) → 3.6 MarginNote. Kinesis = Kafka; why two consumers can't share a partition (02:54–02:55) → 3.6 / P5 reveal. Commit meaning, streams vs distributed transactions (02:56–02:58) → 3.7, 3.8. Queue partitions unseen (03:01) → 3.3. RabbitMQ persistent queues, tools converge (03:13) → 3.8.

### 3.1 Not everything belongs in the request
- **Opens with:** a Medium publish request today validates, saves, bumps a counter, indexes for search, and only then answers.
- **Key points:** delegation is the most underrated way to get performance (L-0135). In a 2020 talk, a VP of Engineering at Hotstar described the principle Hotstar runs its API side on (L-0136) → RuleBox. "Real time" means "inside the request context". Only the essential work happens there, and the rest goes to a worker (L-0138). The request context ends when the client gets its response (L-0145). This gives fast responses, little database load in the request, and everything else async (L-0139). Using it fully is what makes systems at scale work (L-0140). What gets delegated (board list): long-running tasks (spin up EC2, video encoding), heavy computation queries, batch-and-write, anything that can be eventual (L-0171).
- **Components:** Prose, RuleBox §3.
- **Words:** 400

### 3.2 Medium's `total_blogs` counter
- **Opens with:** the "74 essays" line on a profile card.
- **Key points:** add `total_blogs` to `users`, and count++ on every publish (L-0141). Honest framing: a join would also work, and this example is deliberately manufactured to teach delegation (L-0142). It's not a critical update, so it can be async (L-0143). The core flow: client → API (submit a task, respond) → broker → workers → DB (L-0144). The buffer is a **broker** (L-0146). Medium's flow: publish → API puts `ON_PUBLISH` on SQS/RabbitMQ → a worker runs `UPDATE … total_blogs = total_blogs + 1` → later reads show it (L-0147). An `ON_DELETE` event decrements it (L-0153). The writer sees the new count on the next page load, not instantly (L-0148). The trade: a processing delay in exchange for no synchronous write in the request, and fewer concurrent writes (L-0149). The database is the most brittle component, so protect it (L-0150), like a new expensive iPhone with a good cover (L-0151). The broker is the heart of delegation (L-0152).
- **Figures:** Fig 3·a (D-07 redraw, profile card, generic author name). Fig 3·b (D-08 redraw, numbered ①②③). Fig 3·c (D-09 redraw: users table block + SQS → workers → DB, ON_DELETE line).
- **CodeBlock:** the worker's `UPDATE users SET total_blogs = total_blogs + 1 WHERE id = $1` (it sets up §4: an in-SQL increment).
- **Words:** 600

### 3.3 Message queues
- **Opens with:** the `ON_PUBLISH` message is now sitting in SQS. Who picks it up, and what if they crash?
- **Key points:** there are two kinds of broker, queues and streams (L-0154). A message queue is a literal queue with **homogeneous** consumers that all run the same logic (L-0155). Typical tasks: spin up an EC2 instance, update a count, send an email or reminder (L-0156). SQS and RabbitMQ are queues (L-0157). Consumers pull, almost never push (L-0158 → **SN-10**). The queue is a buffer while consumers do the heavy lifting (L-0160). A message read by one consumer goes to no other (L-0161 → **SN-11**). Failure handling is the queue's job, not a manual replay. SQS's visibility timeout makes an undeleted message reappear (L-0210 → **SN-12**). It is configurable, for example 10 s or 10 min (L-0364). Not deleting *is* the failure signal, and you write the delete (L-0212). Different queues give different guarantees (L-0211). The same idea goes by other names, such as Pub/Sub's ack deadline, so learn the term once and look up your tool's equivalent (L-0365, inline nuance: RabbitMQ requeues on channel close instead). Queues expose no partitions (L-0372). SQS is a common workhorse in practice (L-0366, folded as "widely used").
- **StepThrough** Fig 3·d "One queue, three consumers" (steps: three messages enqueued; consumer 2 takes m1, consumer 1 takes m2, consumer 3 takes m3 (L-0159); consumer 1 crashes before deleting m2; the visibility timeout expires and m2 is visible again; a consumer processes and deletes it).
- **MarginNote** "Not the same queue": the wait queue for connections beyond a pool's limit is an in-memory data structure inside one process. A broker is a separate infrastructure component (L-0215). Skip if that was never confusing.
- **Words:** 650

### 3.4 When one worker does two jobs
- **Opens with:** Medium also wants every new story searchable, which means indexing it in Elasticsearch.
- **Key points:** the obvious move is to let the SQS worker do both the count++ and the Elasticsearch write (L-0163; A-DC-23: Elasticsearch search is near-real-time, about 1 s). Two teams in one worker codebase means fights, blocked deploys and messy branches (L-0164). It mixes two teams' concerns (board: "no separation of concern") (L-0169). Crash between the two writes: count 75, search 74 (L-0165). Retry: count 76, search 75 (L-0166). Doing two things in one shot is always a problem in distributed systems. Machines go down and distributed transactions are costly (L-0167; A-CS-25 one sentence: the outbox pattern is the usual workaround, eventual not strong).
- **PauseAndThink P4** (before the StepThrough). **StepThrough** Fig 3·e "Two writes, one crash" (D-09 ES variant).
- **Words:** 450

### 3.5 Message streams
- **Opens with:** give each team its own consumer of the same `ON_PUBLISH` event.
- **Key points:** message streams solve this on a different principle (L-0168). Kafka and Kinesis are streams (L-0162). Queue = homogeneous consumers. Stream = heterogeneous consumers (counter and search) reading the same messages (L-0170). Messages are buffered until retention ends (L-0172). Consumers don't pull messages out. They iterate, and nobody deletes (L-0173). Retention is yours to set, e.g. 40, 60, 100 days (L-0174; A-DC-08: Kafka's default is 7 days; A-DC-09: Kinesis is 24 h, up to 365 days). Each consumer type moves at its own pace (L-0175). If Elasticsearch is down, the counter keeps moving (L-0176). Medium with Kafka: the search service and the counter service each own their own codebase (L-0178). Decouple as much as possible (L-0179). Streams are among the most powerful tools in day-to-day engineering, and whole companies re-architect around them, partly because managing people is hard (L-0177).
- **AnimationClip `l01-queue-vs-stream`**. Predict line: "Elasticsearch goes down for ten minutes. In which picture does the counter stop too?"
- **Figure:** Fig 3·f (D-11 bottom + D-12 merged: API → Kafka `ON_PUBLISH` → Search service workers → Elasticsearch; Counter service workers → Database).
- **Words:** 500

### 3.6 Kafka essentials: topics, partitions, consumer groups
- **Opens with:** Medium's `ON_PUBLISH` topic, one author publishing twice in a row.
- **Key points:** Kafka is the backbone of modern systems, and many people misunderstand it (L-0180). A topic is like a named queue (L-0181). Each topic has N partitions, and the number varies by topic (L-0182). The producer gives a key, and Kafka hashes it to pick a partition (L-0183). With `user_id` as the key, one author's stories always land in the same partition (L-0184; same hashing idea as sharding in 2.4). Ordering is guaranteed only within a partition (L-0188; A-DC-16: the producer's idempotence keeps that order on retries). There is no global order, and consumers don't coordinate one (L-0201). Many consumers of one type, e.g. 3 search consumers (L-0185), form a **consumer group**. Kafka assigns partitions (L-0186; MarginNote with A-DC-13: KIP-848 moves assignment to the broker). Consumers never pick partitions (L-0359), and you never pin a consumer to one partition (L-0202). 3 partitions and 3 consumers gives one each (L-0187). Fewer consumers is fine, and one consumer reads all three (L-0192, inline: it is not strict round robin). A 4th and 5th consumer get nothing (L-0189). The biggest limitation: parallelism = partition count, per consumer type (L-0190, light inline clarification + link to SN-13; L-0191). Why two consumers can't share a partition: tracking plus ordering (L-0361 → **SN-13**, share groups). Kinesis is the same model with shards (L-0197; A-DC-10: shard throughput). Kinesis assigns shards for you too (L-0360, inline: the KCL does it). Choose partition count by the consumption rate you need (L-0207, light inline clarification + A-DC-14: adding partitions later remaps keys and you can't remove them). Routing one entity to one consumer also lets it cache locally and write in bulk (L-0313, hedged). **Beyond the partition cap:** a few Kafka consumers that only forward into SQS, and ~100 SQS workers (L-0336). One more component to run (L-0337). Common in notification systems, because sending is slower than consuming (L-0338).
- **PauseAndThink P5** sits right before Fig 3·h (the consumer-group dynamics are a step-by-step assignment, so they get a figure and a prompt, not a clip; §3 already has its one clip).
- **MarginNote** "Is there a Kafka 'broadcast' feature?": Kafka is traditionally a "dumb" broker. Producers push, consumers pull (L-0340). A broadcast feature was mentioned in class and noted to look up (L-0339). Kafka "now has broadcast" (L-0398 → **SN-14**). Skip unless you heard this claim elsewhere.
- **ForwardChip:** how Kafka stores and retains large data · week 6 (L-0343).
- **Figures:** Fig 3·g (D-13 redraw, topic + partitions + hash key). Fig 3·h (D-14 redraw, #consumers = #partitions). Fig 3·i "Kafka → SQS fan-out" (new).
- **Words:** 1,000

### 3.7 Committing, and why messages come back
- **Opens with:** the counter consumer has processed four `ON_PUBLISH` messages when its machine dies.
- **Key points:** a consumer commits to Kafka, and Kafka tracks per group how far it has read. A restarted consumer resumes from there (L-0193; A-DC-19: one integer offset per partition, so you can rewind). Crash after processing 4 but before committing means those 4 come again (L-0194). Kafka is at-least-once out of the box (L-0195 → **SN-15**). Your consumers must be fine with seeing a message twice (L-0196). For `total_blogs++` that means a double count. This links forward to §4. Commit per message is too chatty, so batch (L-0208). Commits are never magic. You commit in code or configure auto/periodic commit (L-0214; A-DC-18: auto-commit is every 5 s and is at-least-once only if you finish each batch before the next poll). In a queue you delete. In a stream you commit, and without a commit you restart from the last checkpoint (L-0213).
- **StepThrough** Fig 3·j "Commit, crash, resume".
- **Words:** 450

### 3.8 Choosing: queue, stream, or broadcast
- **Opens with:** Medium wants a welcome email on sign-up. Does that need Kafka?
- **Key points:** both are buffers with consumers working at their own pace (L-0203). One operation per message means a queue, "the best way to look at it" (L-0204). A queue has one group of homogeneous consumers. If you need more than one group, you need a stream (L-0209). Why not always use streams? Cost: SQS bills per message and Kinesis bills for running time (L-0205; A-DC-20 inline: the exact pricing dimensions). However fancy, a design that isn't cost-efficient won't see daylight (L-0206). Kafka is the default when you delegate to several consumer types (L-0198), but it is not salt to sprinkle everywhere. The same goes for consistent hashing: both are sometimes "very stupid solutions" (L-0200). ForwardChip: the one place Kafka fails miserably · a later week (L-0199). **SNS** is neither queue nor stream, just broadcast (L-0303). AWS's map: SQS queue · Kinesis stream · SNS pub/sub (L-0304). SNS doesn't persist (L-0305). SNS + SQS mimics Kafka's multiple consumer types (L-0306, L-0311, Fig 3·k) but without history (L-0307, inline + A-DC-21: SNS FIFO archive/replay now exists). Ordering and sharding are key criteria between SQS and Kinesis (L-0312). Streams do not replace distributed transactions. They fit independent consumers doing independent things (L-0362). For strong consistency across two stores you need distributed transactions (L-0363; A-CS-25 is in 3.4, so this links back). Tools converge: RabbitMQ has persistent queues that cover stream use cases (L-0395 → **SN-16**). MongoDB now supports ACID (L-0397). Databases converge on each other's features (L-0399, inline). So avoid "X doesn't support Y" statements and check current capabilities (L-0396).
- **MarginNote** "From practice: SQS to Kinesis": one team's SQS design let several consumers pick up messages for the same database object at once. Retries kept failing, so they moved to Kinesis for per-key ordering (L-0310 → **SN-17**: SQS FIFO would also have solved it). Skip unless you're on SQS today.
- **TradeoffTable T4** "Queue · Stream · Broadcast" (SQS/RabbitMQ · Kafka/Kinesis · SNS, plus a column for SNS+SQS). Rows: consumers · what happens to a read message · ordering · replay/history · scales consumers by · billing · reach for it when. Red ✕ on the SNS "replay/history" cell.
- **RecallQuestions §3:** (1) Why did moving the Elasticsearch write into its own consumer fix the 75/74 mismatch, and what problem does it *not* fix? (2) Your `ON_PUBLISH` topic has 6 partitions and you run 10 search consumers. How many are busy, and what can you do about it? (3) A queue consumer crashes mid-message. In SQS, what makes the message come back, and what must your code do to say "done"?
- **Words:** 950

---

## 4 · Concurrency
**Section dek:** two readers clap at the same instant. A sprinkled taste: what goes wrong when two workers touch one number, and the tools that keep it right. Deep dive in week 2 (L-0008).
**Sec-meta:** about 6 min · class 01:44–01:50
**Opening Medium problem:** a story has 100 claps. Two readers clap at the same moment. The count must become 102 (L-0230).
**RuleBox (§4):** board wording: "We protect our data through **transactions** and **atomic instructions**." (L-0231). Box body: the in-SQL increment `claps = claps + 1` (see SN-19). Sketch: two arrows into one cylinder, one ✓.
**Estimated words:** 1,300
**Q&A folded in:** none in class. The link back to 3.7 (at-least-once double count) is the page's own cross-reference.

### 4.1 Why bother with concurrency
- **Opens with:** one Medium worker machine handling one message at a time leaves most of its cores idle.
- **Key points:** concurrency is the heart of building at scale (L-0009). It gets the most out of one machine, whether server, database or async worker, through multiple processes or threads (L-0217). It brings two problems: communicating between threads ("I'm done, don't redo this") and stopping concurrent use of shared resources such as the database and in-memory variables (L-0218).
- **Components:** Prose. **Figure** Fig 4·a "The concurrency page" (board S50 redrawn as a three-row sketch: why → issues → handling).
- **Words:** 250

### 4.2 The lost update
- **Opens with:** the clap counter.
- **Key points:** the classic race: two threads each run `count++` 1,000 times and get ~1,997, not 2,000, because `count++` is not atomic (L-0219). In Medium terms, 100 → 101, and one clap is lost (L-0230). The 3.7 link: an at-least-once redelivery of `ON_PUBLISH` gives the opposite error on the same kind of counter, one count too many.
- **PauseAndThink P6** (before the StepThrough). **StepThrough** Fig 4·b "Two claps, one lost" (lanes: reader A's request, reader B's request, database row; read 100 / read 100 / write 101 / write 101). Then **AnimationClip `l01-count-race`**: the StepThrough studies one interleaving; the clip shows what that does over time (two threads × 1,000 increments, the counter drifting to 1,997) and then the atomic version landing on 2,000.
- **MarginNote** "Why isn't count++ atomic?": not from a CS background? Search why `count++` isn't thread-safe. It is a read, an add and a write (L-0220). Skip if you know it.
- **Words:** 350

### 4.3 Locks, lock-free, and letting the database do it
- **Opens with:** how do you make the two claps add up?
- **Key points:** locks protect the critical section and come in optimistic and pessimistic kinds (L-0221; simplified low, leave, with a light pointer to week 3–6). Classic fix: wrap `count++` in a semaphore so one thread enters at a time (L-0223; A-DC-25 inline: a one-permit semaphore, or skip the lock with an atomic increment). A traffic signal at a junction: the middle of the square is the critical section, and one road gets green at a time (L-0224, Fig 4·c). Pessimistic locking locks others out until you finish (L-0225) and is built from mutexes and semaphores (L-0227). CS borrows from how people behave (L-0226). Lock-free structures exist, CRDTs among them (L-0228 → **SN-18**). For Medium: transactions (ACID) or the database's atomic operations (L-0231 → **SN-19**, CodeBlock with the right and wrong versions).
- **ForwardChips:** optimistic vs pessimistic locking · weeks 3–6 (L-0222). Concurrency in databases, seen in action · week 2 (L-0229, L-0008).
- **Figure:** Fig 4·c "Traffic signal" (new).
- **CodeBlock:** `UPDATE stories SET claps = claps + 1 WHERE id = $1;` (safe) vs read-in-app-then-write (unsafe under READ COMMITTED).
- **RecallQuestions §4:** (1) Two threads, 1,000 increments each, and the result is 1,997. What happened to the other 3? (2) Why does wrapping the read-add-write in a transaction not by itself save the clap count under PostgreSQL's default isolation, and what does? (3) How is the §3 double count different from the §4 lost update, and what does each need?
- **Words:** 700

---

## 5 · Communication
**Section dek:** show claps live to every co-reader. Request-response, polling, long polling, WebSockets and server-sent events, and which hop in Medium uses which.
**Sec-meta:** about 25 min · class 01:50–02:23, Q&A 02:10–02:23, 02:46, 03:02–03:13
**Opening Medium problem:** two people are reading the same story. One claps. Can the other see the clap animate without refreshing (L-0274)?
**RuleBox (§5):** "No channel is right everywhere: pick the one the use case needs." (L-0278). Box body: build the hello world of each to really know them (L-0272), and stay away from over-complication (L-0282). It sits in 5.7, where the choice is made. Sketch: four tiny client–server pairs (↔ every few s, ⟶ held, ⇄ open, ⟵ open).
**Estimated words:** 4,600
**Q&A folded in:** socket limits (02:10:55) → 5.4 MarginNote. Long polling holds connections, and is still scalable (02:11:27) → 5.3. Per-use-case choice (02:12:09) → 5.7 RuleBox. SSE claps design (02:12:53) → 5.7. Server crash in long polling (02:14) → 5.3. Ticker 40 KB/s (02:15) → 5.4 P8. SSE behind LB (02:16:26) → 5.5. Push notifications (02:16–02:20) → 5.6. HTTP persistent, DB dialects, RESP (02:20–02:23) → 5.7. Sticky LB for WS (02:46) → 5.4. Reconnect storm (03:02) → 5.4. SSE close and testing (03:04–03:05) → 5.5. SSE strictly unidirectional (03:07) → 5.5. L4/L7 proxies (03:08–03:11) → 5.4 MarginNote. On-prem outbound (03:11) → 5.5. SSE in production (03:12) → 5.5.

### 5.1 The usual way, and what REST isn't
- **Opens with:** today a Medium reader loads a story with an ordinary request.
- **Key points:** communication is the most neglected part of system design. People expose a REST endpoint and stop (L-0232). An HTTP endpoint isn't automatically REST. REST is a set of rules for exposing endpoints, and HTTP is a medium (L-0233, inline: Fielding calls REST an architectural style). RPC is the generic term, and an HTTP server is one way to do RPC (L-0235). Request-response: the client asks and the server does the heavy lifting (DB, compute, crypto, auth) (L-0236). It's like ordering a burger: you ask, the kitchen cooks (L-0237).
- **MarginNote** "So you know REST?": the instructor's video on REST vs HTTP endpoints (L-0234). Skip if you've read Fielding.
- **Figure:** Fig 5·a (D-15 redraw, "kept open with timeout", "heavy lifting").
- **Words:** 350

### 5.2 Short polling
- **Opens with:** a writer imports an old blog into Medium, and the page shows "importing…" until it is done. (The page's own example. The class used EC2 and cricket, and both are kept.)
- **Key points:** the client asks the server again and again on a timer (L-0238). The AWS console flips EC2 from "in progress" to "ready" without a refresh (L-0239). It is for long-running jobs, and it is the refresh button in JavaScript (L-0240). Live cricket on Cricbuzz/ESPNcricinfo (L-0241). It is the simplest option (L-0242). The cost: every 10 s is 6 requests a minute per client, and 1M concurrent users means 6M requests per minute, about 100k per second (L-0243, accurate; worded as "per minute", not "concurrent"). Each poll is a full HTTP request (L-0244 → **SN-20**). Most answers are the same "still in progress" for an hour (L-0245).
- **PauseAndThink P7**. **Figure** Fig 5·b (D-16 redraw).
- **Words:** 500

### 5.3 Long polling
- **Opens with:** the same import, but the browser asks once and waits.
- **Key points:** the server doesn't answer until the state changes (L-0246; A-CM-03: keep timeouts around 30 s or proxies cut you off with 408/504). Nobody hands you this out of the box. You write it for your case (L-0247, inline + A-CM-04: Socket.IO falls back to it, and SQS exposes it as `WaitTimeSeconds`). Far fewer requests, but the server does the waiting (L-0248, light inline clarification: a good server parks the request and wakes it on an event instead of looping). Cricket: the answer comes when the next ball is bowled (L-0249). Short polling answers immediately, and long polling answers when something changes (L-0250). Long polling keeps a connection open, much like a WebSocket, and that is still scalable (L-0277, light inline clarification: you need an async server, and all clients re-request at once after each event). Like SSE, it keeps the TCP connection open (L-0378). If the server dies, the connection breaks and the client must resend, which is fine for scores and needs care for payments (L-0280). Board line: "connection re-established after timeout & retried."
- **AnimationClip `l01-polling`** "Three ways to hear 'ready'". Predict line: "The import takes 60 seconds. How many requests does each approach make?"
- **Figure:** Fig 5·c (D-17 redraw).
- **Words:** 550

### 5.4 WebSockets
- **Opens with:** claps should reach co-readers the instant they happen, and readers clap too.
- **Key points:** the most common way to build messaging and real-time apps (L-0251). Polling is "kind of" stateless. A WebSocket keeps a connection (L-0252). It is like the day-1 connection pool: an open connection skips the setup and teardown (L-0253). A bidirectional channel over a persistent TCP connection, speaking the WS protocol (L-0254). WSS is to WS what HTTPS is to HTTP, and WS is a separate spec "parallel to HTTP" (L-0255 → **SN-21**, A-CM-05). Either side can send, so the server can push (L-0256; A-CM-08: Ping/Pong frames for keepalive). Chat: the server pushes to the recipient, who never asks (L-0257). It is fast because nothing is re-established (L-0260). Tickers (Groww, Robinhood) (L-0261). Live experiences, multiplayer games, Zoom chat (L-0262). MQTT is a WebSocket-like protocol for games and devices (L-0263, inline + A-CM-25). MQTT, WS and HTTP are specs on top of TCP or UDP. "A persistent connection must be TCP" (L-0264 → **SN-22**, A-CM-21 QUIC). Persistent connections are expensive to manage (L-0258).
- **PauseAndThink P8** (ticker watchlist math): ~10,000 companies × 4 B = 40 KB/s, so send everything and filter on the client (L-0281, simplified low leave, plus a one-line scale note from the fact-check: × 1M clients it is ~40 GB/s egress, at which point server-side filtering matters). Stay away from over-complication (L-0282).
- **MarginNote** "Behind a load balancer" (about 220 words): a WebSocket through an LB must stay on the same server, so the LB is "sticky" and must support WSS (L-0341 → **SN-23**, A-CM-15, A-CM-16, A-CM-18). If the LB dies, the client reconnects (L-0342). Through a proxy or LB, the client's TCP connection is with the proxy (L-0386). L4 vs L7 hardly matters for pure relaying (L-0391; A-CM-14: idle timeouts differ by layer, so send heartbeats). L7 can make smarter routing decisions (L-0392). When a server with many connections dies, clients reconnect to any healthy server (L-0374). A thousand clients reconnecting at once is cheap for the server (L-0375 → **SN-24**, A-CM-19: backoff with jitter). Skip unless you deploy WebSockets.
- **MarginNote** "How many connections can one server hold?": the limit is physical, as for any TCP connection, "they connect on ports" (L-0276 → **SN-25**, A-CM-20). Skip unless you size servers.
- **ForwardChip:** scaling WebSockets; Slack's real-time design · week 2, Sunday (L-0259).
- **Figures:** Fig 5·d (D-18 redraw). Fig 5·f "WebSockets behind a load balancer" (new, inside the MarginNote).
- **Words:** 1,050

### 5.5 Server-sent events
- **Opens with:** a stock ticker, and Medium's clap count for someone who only reads.
- **Key points:** if the client never needs to send, use SSE. It is a persistent, one-way channel: the client opens it, then only the server sends (L-0265; A-CM-09: EventSource reconnects automatically with `Last-Event-ID`). The name is server-*sent*, not server-side (L-0266). Uses: tickers, deployment-log streaming (Vercel, Netlify), remote terminals (L-0267). Those vendors have since changed their model, but log streaming with a rich UI still shows SSE in action (L-0268, unverifiable, attributed). SSE and WS are usually browser-to-server and rarely server-to-server (L-0269, inline: LLM APIs stream SSE to backends today). Much simpler and lighter than WS, but one-way (L-0270; A-CM-11: about 6 connections per domain on HTTP/1.1; A-CM-12: text only). An implementation is a few lines. MDN's example is about 21 (L-0271). SSE is strictly one-way by spec, even though TCP isn't (L-0385). The connection closes when the client is done or the server dies (L-0379, inline: EventSource reconnects unless closed; A-CM-10: a 204 stops it). It can sit behind an LB so backends scale (L-0283, open; A-CM-13: send a comment line every ~15 s to keep proxies from cutting it). Test the business logic for each message type, not the connection (L-0380, L-0381, light caveat: do test reconnect behaviour). From practice: inbound connections to on-prem VMs are banned, so the VM opens an outbound WS/SSE/poll channel and commands flow back over it (L-0393). Few companies run SSE in production, and most choose WebSockets "in case" (L-0394, with the counterpoint: LLM APIs).
- **PauseAndThink P9** (do you need a WebSocket for a ticker?). **Figure** Fig 5·e (D-19 redraw).
- **Words:** 700

### 5.6 Push notifications are a different thing
- **Opens with:** a Medium writer's phone is locked, and their story just got its 1,000th clap.
- **Key points:** push notifications (GCM, APNs) are not WebSockets or SSE. They have different guarantees and protocols, and you don't control them. You can mimic them but not implement them (L-0284, accurate-low: today it's FCM). A calendar app raises its own local notification offline, mimicking a push (L-0285). Push can be lost too, and "a persistent connection to GCM would be inefficient" (L-0286 → **SN-26**, A-CM-23).
- **MarginNote** "From practice, 2015": the instructor's team built a push service directly on GCM and APNs because SNS delivery rates were poor and OneSignal was brand new. That pain is why OneSignal and Twilio now wrap it in one API call (L-0287). Try integrating with GCM once (L-0288 → **SN-27**: GCM is gone, so use FCM; A-CM-24). Skip unless you send mobile push.
- **Figure:** Fig 5·g "The push path" (new).
- **Words:** 350

### 5.7 Medium, hop by hop
- **Opens with:** back to the clap. Here is every hop it crosses.
- **Key points:** user → API server is plain HTTP request-response over TCP. API server → database is a persistent plain TCP connection, not a WebSocket (L-0273). Live claps for co-readers go over a WebSocket (L-0274). Twitter like counts and Instagram Live hearts work the same way (L-0275). An alternative design from class: send the clap as an ordinary HTTP POST, update the UI optimistically, and push counts back over SSE. The clap still has to travel up, so SSE alone doesn't carry it, but pairing SSE with the POST works: "you can do that". The full design comes with Slack next week (L-0279, simplified low, left as taught. The caveat and the approval are both kept, and nothing is reworded away). HTTP's TCP connection is persistent too, and "you close it after the response" (L-0289 → **SN-20**, the same note as 5.2). Databases don't use WebSockets. Each speaks its own protocol over persistent TCP: MySQL, Postgres, MongoDB (L-0290, inline: "wire protocol", not "dialect"). A wire protocol is a byte-level layout of the query on the connection (L-0291, inline + Fig 5·i). HTTP, WebSocket and SSE each have their own message format, and the spec says how to bundle a message (L-0293). Redis speaks RESP (L-0294). RuleBox §5 sits here.
- **ForwardChip:** the HTTP specification, and where not to use HTTP · week 3 (L-0292).
- **Figures:** Fig 5·h (D-20 redraw, Medium communication map). Fig 5·i "A wire protocol packet" (new, small).
- **TradeoffTable T5** "Four ways to hear about a change": Short poll · Long poll · WebSocket · SSE (+ Push as a narrow fifth column). Rows: who starts each exchange · connection · direction · requests for one change · server cost · good for · Medium use. Red ✕ on short polling's "requests for one change" cell: "one every interval, mostly redundant".
- **RecallQuestions §5:** (1) 1M readers poll every 10 s. What is the request rate, and which two options cut it? (2) Why does a live clap counter for a read-only viewer not *need* a WebSocket, and why might Medium use one anyway? (3) Which protocol runs on each hop of a Medium clap: reader → API, API → database, API → co-readers?
- **Words:** 650

---

## 6 · What to keep
**Section dek:** the heuristics that recur in every section, and where this lecture stops.
**Sec-meta:** about 3 min
**Opening Medium problem:** none. This is the recap: Medium's final picture, every box annotated.
**Key points:**
- **Figure** Fig 6·a "Medium, end of Lecture 1" (layer map from Fig 1·f extended with the LB + API fleet, replicas/shards, broker + consumers, WS/SSE channel; each box tagged with its section number). It doubles as navigation, with each box linking to its section (teaching map option C as a widget).
- **Heuristics card** (Prose list, 8 lines, each linking back): a cache is any saved expensive I/O (§1, L-0058). Question every component (§1, L-0064). Scale bottom up and protect the database (§2, L-0100, L-0150). Naive first, proxy later (§2, L-0119). Not real-time? Not in the request (§3, L-0137). Kafka is not salt, and neither is any tool (§3, L-0200, L-0396). Always think about cost (§3, L-0206). Pick the channel by use case and build the hello world (§5, L-0278, L-0272). Explore the primary docs yourself (L-0004). These restate placed ids; they add no new placement.
- **MarginNote** "Out of scope on purpose": security is not part of this high-level architecture course. Real designers must care about it, but it opens a Pandora's box, and the course topic list is on the instructor's site (L-0351, L-0352). Rate limiters, DDoS and SQL injection are well documented elsewhere (L-0353). "DDoS is essentially rate limiting" (L-0354 → **SN-28**, A-CS-24). SQL injection and CVEs have standard fixes (L-0355). Compression is basic: there are 3–4 algorithms, so pick one (L-0350, simplified low leave). Skip unless you were wondering.
- **ForwardChips ("Where this lecture stops"):** next week is databases. Saturday: relational, with a live demo of transactions, locking, concurrency and throughput (L-0296). Sunday: NoSQL, then Slack's real-time design and three messaging apps (L-0297). UDP · week 4 (L-0299; the instructor has used UDP twice in production and knows where it thrives, L-0300). Caching strategies · later (L-0384).
- **Components:** Figure, Prose, MarginNote, ForwardChips. No RuleBox, prompt or recall (the design's section end handles "Concepts in this section").
- **Words:** 500

---

## Totals
| Section | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 350 | (1·a shared) | – | – | – | – |
| 1 Caching | 4,300 | 1·a, 1·b(step), 1·c, 1·d, 1·e, 1·f, 1·g | – | P1 | T1 | SN-01..06 |
| 2 Scaling | 4,600 | 2·a, 2·b, 2·c, 2·d, rule sketch, 2·e, 2·f(step), 2·g, 2·h | l01-cascade | P2, P3 | T2, T3 | SN-07..09 |
| 3 Delegation | 5,000 | 3·a, 3·b, 3·c, 3·d(step), 3·e(step), 3·f, 3·g, 3·h, 3·i, 3·j(step), 3·k | l01-queue-vs-stream | P4, P5 | T4 | SN-10..17 |
| 4 Concurrency | 1,300 | 4·a, 4·b(step), 4·c | l01-count-race | P6 | – | SN-18..19 |
| 5 Communication | 4,600 | 5·a..5·i | l01-polling | P7, P8, P9 | T5 | SN-20..27 |
| 6 Keep | 500 | 6·a | – | – | – | SN-28 |
| **Total** | **~20,650** | **39 figures (6 step-throughs) + 5 rule-box sketches** | **4 (+1 built reserve)** | **9** | **5** | **28 notes (SN-01..28) covering 31 items** |

Reading time is about 95 minutes. The sticky rail and the per-section "about N min" do the navigation work. The NOTES.md weakness #1 (drift across many figures) applies here: all 39 figures (plus 5 rule-box sketches) must be built from one glyph kit, and `figures.md` lists the kit first.
