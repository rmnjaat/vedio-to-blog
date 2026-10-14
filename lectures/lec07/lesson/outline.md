# Lecture 07 lesson outline: "Build your own Redis"

**Promise (one line):** Meet ETL and change data capture on the blogging app, then build a cache like Redis on one node, counting every byte, and make it distributed with routing, consistent hashing and replicas.

**Dek:** Copying data out without losing it, then a cache built from one hash table up to a ring of nodes, with the cost of each decision measured in bytes, hops and data moved.

Source: lecture id `lec07`, course position 9 (week 5, day 1), 03:11:10 of class plus the board. Ledger `lectures/lec07/ledger/ledger.jsonl` has 381 items: 374 placed and 7 dropped (see `placement.json`, checked by `check_placement.py`). The design is `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments are in `factcheck_applied.md`. Figures are in `figures.md`, clips in `animations.md`, and pause-and-think prompts in `prompts.md`.

---

## How to read this outline

### Spine
The spine is teaching-map option A, "Two parts: CDC, then build a Redis from one box to a ring", split into page-sized chapters. The lecture's own order is kept inside every chapter, because it is already a well-built escalation: each step is forced by the one before (a hash table, then typed values, then a memory cap, then eviction...). Two moves away from the class order:
1. **Q&A is folded into the topic it belongs to.** About 27% of the class was Q&A, and it holds real corrections (malloc and segfaults, SIGABRT), the virtual-node debate and the CDC load argument. Each lands next to the claim it refines.
2. **TTL moves next to eviction (§3).** In class, TTL came after the protocol recap. Both are "what leaves the cache, and when", and both reuse the per-key wrapper, so they read better together. The protocol and concurrency parts become §4.

Chapters (each a separate page): 1 ETL and change data capture · 2 One node, every byte counted · 3 When the cache is full: eviction and expiry · 4 Talking to the cache, and taking turns · 5 Many nodes: splitting the keys and finding them · 6 Consistent hashing, DHTs and staying up · 7 What to keep.

**The two halves.** CDC (§1) and the cache (§2–§6) were unrelated in class, glued by the "form the dots" framing (L-0009). The page says so plainly in "About this class" and does not invent a link. §1 runs on the course's blogging app. §2–§6 run on "our Redis", the cache we build, with Redis named as the reference design at each decision, as the class did (L-0004).

**Tiered storage.** It was announced in the agenda (L-0003, L-0007) but only appears as the multi-tier CDC diagram. The page says this explicitly in 1.5 and in "About this class" ("introduced here, built in a later week"), and does not imply it was covered.

### Voice rules (apply everywhere)
- The page speaks in its own voice. There is no teacher–student dialogue and no student names. Class Q&A becomes explanation. Proposals the class corrected become "It is tempting to…; in fact…".
- Students' production stories become **"From practice"** margin notes or prose, with no names. The instructor's own stories (consulting, random eviction at eight months, the 2015 IoT netcat story, crashing his own Redis) appear as "the instructor" and are attributed as experience, not as checked fact.
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix. Hedges stay hedges ("the instructor's guess", "he was not sure").
- Outside facts appear with a source link (SourceNote or an inline sourced sentence).
- **Byte budget.** The recurring frame "every byte matters because RAM is costly" (L-0098, L-0210) runs as a small hand-lettered tag `byte budget` in the margin of §2 and §3 wherever a decision is justified by it. It is a visual tag on existing prose, not a new component.

### Component vocabulary (all from design B; numbers refer to NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph: the sample's rhythm. |
| **Figure** | #6 static figure (panels on graph paper; stack <760px) | Board redraws D-xx and new figures. Spec in `figures.md`. |
| **StepThrough** | #7 step-through (time runs down, Prev/Next, deep link) | Discrete sequences the reader studies: lazy expiry, CAS, graceful removal, the snapshot runbook. |
| **AnimationClip** | #10 clip (poster = end state, play pill, chapter chips, predict line before it) | 4 clips, at most one per chapter. Spec in `animations.md`. |
| **RuleBox** | #5 key rule (hand-ruled box + small sketch, label "The rule for this whole chapter") | Exactly one per chapter (§1–§6). |
| **PauseAndThink** | #8 sticky-note card, two choices, reveal | 9 prompts. Spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table (glyph headers, one red ✕ cell, stacks <700px) | 6 tables. |
| **MarginNote** | #12 named collapsible aside (title + one-line "skip unless…") | Side material: Q&A threads, "From practice", "See it yourself", "Go deeper". |
| **SourceNote** | #9 sourced fact, headed **"More precisely"** | Directly after the teacher's point, for wrong / outdated / imprecise-medium items: 18 ledger items in 17 notes (SN-01..SN-17). |
| **CodeBlock** | the sample's `pre code` | Short structs and snippets from the board (C-like, as taught). |
| **ForwardChip** | chip "coming later · …" / "back in Lecture N" | Deferred topics and back-references. Uses course order from `lectures/course.json`. |
| **RecallQuestions** | #13 recall (3 questions, `details` reveal) | Exactly 3 per chapter (§1–§6). |
| **AboutThisClass** | lecture header meta + short `details` note | Course-structure facts only. |
| **NotationKey** | #4 notation key, once per lecture | Top of §1, extended with: ring, key square, struct block, log strip. |

### Marker colours (NOTES.md, unchanged)
Blue = request / data path. Green = ack / success / data that arrived. Red = failure, lost or stale data, hard limit, eviction. Graphite = everything else. Dashed = async (CDC copy, replication). Arrowheads on the initiator's direction: a CDC tool *pulls* from the source log, so its arrow starts at the CDC box and points at the log ("reads").

### Course links used on this page (course order from `lectures/course.json`)
Lecture 1 (lec04, Green dots and blog rows): what a cache is, TTL, connection pooling. Lecture 2 (lec01, Medium under load): Kafka essentials, queues vs streams, read replicas, `hash % N` sharding, SSE. Lecture 3 (lec05, Locking the airline seats): KV store on MySQL, lazy deletion and 20-key sampling, pessimistic locking, the seat-booking exercise. Lecture 5 (lec08, Building a load balancer): load balancer as proxy, DNS, CDC sneak peek. Lecture 10 (lec10, Files as a database): the next session, two storage engines built from files. Topics promised for weeks 6+ (tiered storage on Amazon orders, Spark, hot partitions on S3, where consistent hashing fails) are not in this course's ten recorded sessions; their chips say "a later week".

---

## Lecture header (unnumbered)

- **Kicker:** Lecture 09 · week 5, day 1 · running case: build-your-own Redis
- **H1:** Build your own Redis. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** (design #2, "you are here") with the seven chapters.
- **AboutThisClass** (collapsed `details`, about 170 words): week 5 is storage-engines week, the instructor's favourite topic (L-0001); one line that databases were his favourite subject even with a C grade, and he still built a deep understanding (L-0002). Agenda: a distributed cache, plus ETL and tiered storage (L-0003). CDC had only been written into earlier designs; this session goes deeper (L-0007). The order is unusual: ETL comes first, only as an introduction "to form the dots", like the Kafka essentials session in Lecture 2. Its practical use comes when the course designs Amazon's order system (L-0009), one detailed example of how data pipelines are built from one or two basic ideas (L-0010). The instructor built on tiered storage at Amazon (L-0008). The cache is his favourite discussion, full of nitty-gritty questions (L-0079). It has two brainstorms: low-level implementation first, then the distributed design after the break (L-0082). The cache design draws on his reading of the Redis source and how Redis made its decisions (L-0004). Honest note: tiered storage appears here only as one diagram (1.5).
- **Prerequisites strip** (small ForwardChips "back in…"): Lecture 2 (Kafka, replicas, sharding), Lecture 3 (KV store, TTL sampling, locking), Lecture 5 (load balancer, DNS).
- Estimated words: 300.

---

## 1 · ETL and change data capture
**Section dek:** The blogging app's analysts need their own SQL copy of production. The obvious event pipeline drifts silently. Change data capture reads the database itself.
**Sec-meta:** about 18 min · class 00:04–00:20, Q&A 00:20–00:31, 02:41–02:48, 03:04–03:05
**Opening problem (blogging app):** the multi-user blogging app has grown. The CEO wants detailed reports and has hired analysts who only know SQL. Production runs on MongoDB and holds personal data.
**RuleBox (§1):** "Rely on the source of truth." Box body: move raw data with CDC; publish an event from the API only when you need application context (L-0031, L-0046). Sketch: a database cylinder with a log strip, one dashed arrow out of the log into a second cylinder. Sits in 1.5.
**Estimated words:** 3,300
**Q&A folded in:** WAL via client or files (00:20:03) → 1.4. Client vs raw logs, load, run on a replica (00:21:12) → 1.4. 80% saving detail, 60 machines (00:21:59–00:22:10) → 1.6. Performance, silent loss (00:24:15) → 1.6. Batching (00:25:21) → 1.6. Eventual consistency (00:26:14–00:26:45) → 1.7. CDC vs SSE (00:27:13) → 1.7. Why not SQS (00:27:47) → 1.6. Transaction order (00:28:44–00:29:22) → 1.4. Spark for joins (00:29:34–00:30:32) → 1.7. PG sync (00:30:41) → 1.7. CDC instances, offset store (02:41:42–02:42:34) → 1.4. Kafka didn't read MySQL (02:43:25) → 1.2. Async workers with no event (02:45:26) → 1.2. One CDC, many sinks (03:04:33–03:05:03) → 1.5.

### 1.1 Day zero: dashboards on the production database
- **Purpose:** set the scene and show why analysts need a separate SQL copy.
- **Opens with:** the blogging app on day zero.
- **Key points:** day zero: a user, an API server and a database. Users never reach the database directly; the API abstracts it (L-0012). A new company rarely measures anything at first; DAU, MAU or Google Analytics come once people use it (L-0013, attributed as the lecture's generalisation). Then it measures blogs published, active users, likes in the first hour (L-0014). There is no warehouse yet: Grafana, Metabase or Tableau point straight at production and fire queries (L-0015, plus A-E-01: analytics is the most common reason to add a read replica, the usual first step before a warehouse). That works well for a Series A company up to roughly 10,000–50,000 users (L-0016, attributed as the instructor's rule of thumb: the real limit is query cost and headroom). As the business grows, the CEO wants detailed reporting and hires an insights team (L-0017). Exposing production to analysts is risky even read-only, because it holds personal data (L-0018, plus A-E-02: GDPR data minimisation; analytics copies drop or mask PII). Production may be MongoDB, chosen because it sounded good or fit (L-0019). Analysts know SQL very well (L-0020). Every warehouse (Redshift, BigQuery) and lake format speaks SQL: the lecture's "hard truth" (L-0021, plus A-E-03: Iceberg is a table format, the engines provide the SQL; A-E-04: Redshift is PostgreSQL-based but columnar). SQL analysts handed MongoDB would not know what to do (L-0022, plus A-E-05: MongoDB's SQL Interface exists today, but the PII and load reasons stand). So the company writes a pipeline from MongoDB into MySQL, the one SQL database it knows. The question is how the data gets there (L-0023).
- **Components:** NotationKey (once), Prose, Figure Fig 1·a (D-01).
- **Words:** 450

### 1.2 The obvious pipeline: API events through Kafka
- **Opens with:** "we know Kafka": publish an event whenever a blog is published.
- **Key points:** the natural progression: the API publishes to Kafka on publish, a consumer writes MySQL rows in a set format (L-0024). Back in Lecture 2 for Kafka. The bar: the analytics copy must have no misses. Not real time, but eventually consistent with the source, because decisions are made on it (L-0025). What goes wrong: (1) not everything has an event: "blog published" might, a `views++` does not, because events are application context and analytics wants raw data (L-0026). A second example from class: an async worker that periodically aggregates a post's likes changes the database with no API event at all (L-0346). (2) Events don't carry all the data: a "published" event may carry only the blog id, so the consumer fetches the rest, adding load (L-0027, plus A-E-06: Fowler's Event Notification vs Event-Carried State Transfer; A-E-07: Kafka's ~1 MB default record cap). (3) The change is done but the event failed: the copy drifts (board line; L-0028, plus A-E-08: the dual write; the outbox pattern). (4) A warehouse fed from events means remembering, for every new table, whether its event was added (L-0049). Sounds obvious, isn't; there has to be a more seamless way (L-0028). A correction from Q&A: in that design Kafka never reads MySQL; workers consume events the API published (L-0345).
- **PauseAndThink P1** (before the figure). **Figure:** Fig 1·b (D-02 redraw) with the four gaps as red marks on the path.
- **Words:** 500

### 1.3 Change data capture: read the source of truth
- **Opens with:** stop asking the API what changed; ask the database.
- **Key points:** CDC = change data capture: any change in data is captured (L-0029). Instead of API events, it relies on the source of truth, the database itself (L-0031). A tool typically lets you configure source, transformation and sink; it pulls from the source and writes the sink in the format you want (L-0032). Updates with no application event are still captured (L-0033). If the API crashes while pushing an event, nothing is lost, because the pipeline never depended on it: "the highlight of CDC" (L-0034). Board example: every insert, update or delete on `Blogs` yields one CDC event per changed row (L-0041). Sinks need not be databases: Kafka, SQS, Kinesis, local disk, whatever the plugins support (L-0042). CDC is a great way to build replication across databases with light transformation (L-0043). Tools: Airbyte and Debezium; install one locally, Airbyte being the instructor's pick as easiest (L-0030, plus A-CDP-15: Airbyte CDC needs primary keys and misses TRUNCATE/ALTER).
- **AnimationClip `l07-events-vs-cdc`.** Predict line: "The API saves a post and crashes before publishing its event. A worker bumps a like count with no event at all. Which copy ends up complete?"
- **Figure:** Fig 1·c (D-03 redraw).
- **Words:** 450

### 1.4 How a CDC tool reads, and where to point it
- **Opens with:** what does "reads the database" actually mean?
- **Key points:** at heart a CDC tool tracks what it has read, where it writes, and its checkpoint; how it does so has no hard rule (L-0055). It tracks how far it has read, which rows and columns (L-0035, plus A-CDP-05: tools start with a full snapshot, then stream from the log position). Two ways to read: iterate tables row by row (L-0036, plus A-CDP-01: polling needs a timestamp column and misses deletes) or read the commit log / binlog, the WAL, where every commit is appended (L-0037, plus A-CDP-14: MySQL writes the whole transaction to the binlog at commit). Which one depends on what the database exposes (L-0038 → **SourceNote SN-01**, A-CDP-02: MongoDB exposes change streams on replica sets; Elasticsearch has no log). For you it doesn't matter: configure source, sink, transform (L-0039). If the source is down, nothing is captured; when it returns the tool resumes from its point (L-0040, plus A-CDP-03: a PostgreSQL slot retains WAL meanwhile and can fill the disk; A-CDP-04: if MySQL purged the binlog position, a re-snapshot is needed). Checkpointing in order is why CDC does not lose data (L-0065, plus A-CDP-09: it prevents loss, not duplicates; make sinks idempotent). Transactions: a commit writes all its statements to the log in one shot, and CDC reads them in commit order (L-0072, plus A-CDP-10: events are per row; Debezium can add transaction boundaries; L-0073). **Reading in practice (Q&A):** the basic setup reads via the database's own client; some plugins read WAL files directly (L-0054). The client is better: if the log format changes the plugin needn't (L-0056). It is a sequential read, so the load is light (L-0057). Point CDC at a new replica rather than the master (L-0058, plus A-CDP-07: PostgreSQL 16+ allows slots on a standby; A-CDP-08: MySQL needs `log_replica_updates`). One replica is enough, since all hold the same data (L-0342). Several CDC instances can run active-standby or all active (L-0343, light inline clarification + A-CDP-12: one log stream has one active reader, so "all active" means each takes its own slice of tables). They keep their read position in a small store of their own and coordinate with simple remote locks (L-0344; back in Lecture 5 for remote locks).
- **Figure:** Fig 1·d "Two ways to read" (new: row scan vs log tail, with a checkpoint marker).
- **MarginNote** "Several CDC instances": L-0343, L-0344 detail. Skip unless you run CDC at high volume.
- **Words:** 650

### 1.5 CDC or events? Raw data, and many tiers
- **Opens with:** the blog app now wants search too.
- **Key points:** many earlier course designs (API pushes to Kafka, a consumer acts) could use CDC instead; that doesn't make one better; start with what works (L-0045). The bifurcation: raw data → CDC; application context ("when this happens on the API server") → the API pushes to Kafka (L-0046, plus A-CDP-06: the outbox pattern combines the two) → **RuleBox §1**. MySQL → Elasticsearch for search: the Kafka way or CDC with an optional transform you may have to write; CDC then keeps the two in sync (L-0047). MySQL → Redshift for analytics (L-0048). On raw data CDC can bulk fetch and bulk ingest; one event per publish, consumed one by one, is very slow (L-0050). Redshift → S3 for backup via a plugin, though S3 is not a database and Redshift has its own export (L-0051, plus A-CDP-13: Redshift's UNLOAD). One CDC can push to several sinks; the board drew separate boxes only for clarity (L-0374, plus A-CDP-16: Debezium writes once to Kafka and sinks fan out; Airbyte needs a connection per destination). A fan-out CDC uses more memory, a different transformation per sink, so it must scale up (L-0375). **Tiered storage, honestly:** this diagram is the only tiered-storage content in the class. ForwardChips: CDC in data-engineering and multi-tier designs · a later week (L-0052); Amazon's order system · a later week (L-0009, L-0010 are in About).
- **Figure:** Fig 1·e (D-04 redraw), with the board footer "we will be using it a lot" as a caption line.
- **Words:** 500

### 1.6 From practice: sixty machines down to two
- **Opens with:** the instructor's consulting story.
- **Key points:** (all attributed as the instructor's experience; not independently verifiable.) Consulting for a couple of organisations, he saw data sync built on Kafka with high infra cost; switching to CDC cut that cost by 80% with more reliability (L-0053). The 80% was for that subsystem only (L-0059). The API pushed every update to Kafka; consumer workers transformed and wrote one event at a time. They could have batched, but didn't, "because that's how they thought systems are built" (L-0060). Without batching they needed 60+ consumers on 32 GB machines just to keep up (L-0061). He suggested a simple Airbyte CDC with a simple transform straight into the other database: 60 machines plus Kafka became two EC2 instances (L-0062). Performance improved: lag dropped to a bare minimum, because these tools are multi-threaded, fetch in parallel and checkpoint fast (L-0063, hedged; plus A-CDP-11: Airbyte runs CDC as scheduled syncs, so a change waits up to one interval). The old pipeline had been silently losing data; their fix was going to be a resync cron and "losing data is okay"; with CDC they stopped losing it (L-0064). Batching alone would have helped, "not as bad", but the code was the most basic thing to write and a legacy design nobody changed (L-0066). There is always one service nobody touches (L-0067). Why Kafka rather than cheaper SQS? Decisions get made a certain way; at their load the costs were similar; the service started basic and was never refactored (L-0071).
- **Figure:** Fig 1·f "Before and after" (new).
- **Words:** 450

### 1.7 What CDC is not
- **Opens with:** CDC is not a magic sync button.
- **Key points:** CDC is eventually consistent; it does not give strong consistency between source and sink, so pairing it with an eventually consistent NoSQL store is fine (L-0068). Where you need strong consistency you need synchronous processing, so asynchronous CDC is out (L-0069). It is not like server-sent events: SSE pushes from a backend to a browser; CDC pulls from a database and pushes into another (L-0070; back in Lecture 2 for SSE). For complex transformations (multi-table joins, aggregations, several jobs) use Apache Spark, not CDC (L-0074); Spark is "the king of big-data tools" in the lecture's view (L-0075). CDC is for simple cases: consume, extract, put elsewhere with light transformation (L-0076). ForwardChip: Spark and data-engineering basics · a later week (L-0044). You may already use one: PG sync, which pushes Postgres into Elasticsearch, is a CDC; the class described it as Postgres-only (L-0077 → **SourceNote SN-02**) and it could be swapped for Airbyte or Debezium with richer plugins (L-0078).
- **TradeoffTable T1** "API events · CDC · Spark": rows: what it reads · catches changes with no event? · batching · consistency · transformations · reach for it when. Red ✕ on API events, "catches changes with no event?".
- **RecallQuestions §1:** (1) Name two ways an API-event pipeline can leave the analytics copy incomplete even when Kafka never loses a message. (2) Why is it better for a CDC tool to read through the database's client than to parse log files directly, and why point it at a replica? (3) A report needs a join of five tables and a monthly aggregate. CDC or Spark, and why?
- **Words:** 350

---

## 2 · One node, every byte counted
**Section dek:** Build the cache on one machine first: a hash table, values of many types, and a hard cap on memory that the cache can always check cheaply.
**Sec-meta:** about 25 min · class 00:31–00:58, Q&A 01:48, 02:39–02:48, 02:54–02:57
**Opening problem (our Redis):** we are writing a cache like Redis. It must answer `GET`, `PUT`, `DELETE` and `TTL` with high throughput and low latency, and it must never crash.
**RuleBox (§2):** "In memory, be cautious about every single byte and bit." Box body: RAM is costly; reduce space to the bare minimum you can work with (L-0098). Sketch: a 32-bit word split into small labelled fields. Sits in 2.3.
**Estimated words:** 3,300
**Q&A folded in:** zmalloc for every allocation incl. Bloom filters (01:48:18) → 2.6. malloc returns NULL (02:39:19), virtual pages (02:39:50), the crash experiment (02:40:21, 02:46–02:47) → 2.4 MarginNote. Growing a set (02:48:22) → 2.2. ulimits, malloc limits, SIGABRT (02:54–02:57) → 2.4 MarginNote.

### 2.1 What we're building
- **Opens with:** the requirements slide.
- **Key points:** requirements: high throughput, low latency, distributed: "we are very greedy", with scale given (L-0080). Four functions: get, put, delete, TTL (L-0081). The core operations in one line each: GET checks the table and returns, PUT adds, DEL deletes (L-0222, CodeBlock). Explicitly a distributed in-memory cache (L-0083). The low-level list: storage, knowing the cache is full, eviction, communication, concurrency, TTL (L-0084). One node first; distribution later (L-0085). The instructor calls these "low-level implementation details" rather than LLD (L-0203). Why bother building one: the decisions are reusable Lego blocks you can "control C, control V" into other systems (L-0005), because there are only a few ways to achieve anything and patterns recur (L-0006). The design leans on how Redis made its decisions (L-0004, attributed).
- **Components:** Prose, CodeBlock (`GET k` / `PUT k v` / `DEL k`).
- **Words:** 300

### 2.2 Storage is a hash table
- **Opens with:** where does a key and its value live in RAM?
- **Key points:** a proposal from class: a contiguous array of keys, each holding a pointer to its value; in a word, a hash table (L-0086). Single-node storage is a hash map of keys to values (L-0087). It is tempting to rebuild hashing yourself (open addressing vs chaining for a fixed-size table); in fact hash maps exist, so use one (L-0088). The class jumped to "what if there are several machines?"; that waits for §5 (L-0089, ForwardChip to §5). When a value outgrows its block (a set past 1,024 bytes), do what hash tables do: allocate, and when full double it, reallocate and move; an expensive step (L-0350).
- **Components:** Prose, small Figure Fig 2·a panel 1 (key → value pointer).
- **Words:** 250

### 2.3 Values of many types
- **Opens with:** changed requirement: a value can be a string, set, list, Bloom filter or HyperLogLog.
- **Key points:** how is such a value represented (L-0090)? As in Java: a general object; store a pointer to it on the heap, or primitives in place (L-0091). The cache must know the type, because commands depend on it: add on a set, push on a list (L-0092). It is tempting to put the type with the key, since everything is reached by key (L-0093); in fact the key stays a plain key and the value becomes a wrapper `MyValue { void *value; int type }` with 0 = string, 1 = int, 2 = set, 3 = list (L-0094). A typed command reads the type, checks it supports the op, casts and runs (L-0095). The class's sharper point: there are only 5–10 types, so a few bits suffice: 4 bits = 16 types (L-0096). Redis does exactly this: 4 bits for the type, capped (L-0097). → **RuleBox §2** (L-0098). The wrapper is a C struct in Redis and holds more metadata, which makes it extensible: eviction comes later (L-0099). ForwardChip: other Redis object fields · "when we go into other features".
- **PauseAndThink P2** (key or value, and how many bits). **Figure:** Fig 2·a "The struct that grows", stage 1 (value pointer + 4-bit type). **CodeBlock** `MyValue`.
- **Words:** 500

### 2.4 What happens when the heap runs out
- **Opens with:** every value lives on the heap. What if it fills?
- **Key points:** `malloc` or `new` allocates on the program's heap (L-0100). It is tempting to say "the eviction policy runs"; in fact that is the cache's policy, and the program's heap is a separate matter (L-0101). Thought experiment: malloc 1 MB in a loop with 1 GB of RAM; after 1,024 iterations it is all used; what happens on iteration 1,025 (L-0102)? Another guess from class: the OS moves data to disk (L-0103, light inline clarification: closer than it sounds, since the OS can page to swap; the outcome is below). The class's answer: going beyond your heap is a segmentation fault, "someone else's territory", and the program crashes (L-0104 → **SourceNote SN-03**, A-DCL-25). Everyone who coded C in first year met segfaults (L-0105, left as taught). Crashing is a main reason never to exceed your memory (L-0106). The conclusion stands whatever the mechanism: the cache must never crash, so it caps its own memory, and first needs to know how much it uses (L-0107).
- **MarginNote** "The class came back to this" (about 280 words; skip unless you write C or run memory-bound services): a correction from class: malloc does not segfault when memory runs out; it returns NULL (C++ throws `bad_alloc`), so check the return (L-0338). malloc hands out virtual pages; physical pages arrive only on first use, so 4 GB of RAM can back 40 GB of allocations (L-0339, left as taught). The instructor's experiment: building his own Redis, he allocated pages, filled them, kept allocating, and it crashed at the same point every time (L-0340, his experiment). He concedes malloc returns NULL, but says touching pages beyond the limit crashes the program, hedging that he may be wrong (L-0341, light inline clarification: on Linux that is usually the OOM killer's SIGKILL, not a segfault; L-0347). A crash happens whenever a program touches memory it shouldn't (L-0348). He says paging is not his deep area (L-0349). In practice limits are per-process ulimits and allocator settings (GNU malloc, tcmalloc, jemalloc), so one service cannot fill a shared node (L-0358, light inline clarification: a ulimit makes malloc fail with ENOMEM; glibc malloc is the common default, Redis uses jemalloc). Beyond those limits "you get a SIGABRT and the kernel kills the process" (L-0359 → **SourceNote SN-04**). SIGABRT can't really be handled, and the material would be refined (L-0360, light inline clarification: SIGABRT can be caught but abort() still ends the process; SIGKILL is the one you cannot catch).
- **Figure:** Fig 2·b (D-05 redraw, two panels: the heap fills; what actually happens). Speech bubble (the §2 misconception) on the full heap: "full heap → segfault?".
- **Words:** 700 (incl. MarginNote)

### 2.5 Knowing how much memory you use
- **Opens with:** the cap is 1 GB. How do you know where you are, on every write?
- **Key points:** "run a command" was the first idea (L-0108). A system call traps into the OS; doing it on every check would slow everything (L-0109, left as taught). So the cache writes its own size function (L-0110). Count keys × size, refined to a running counter, `size += n` on every add (L-0111). But add how much? `sizeof(MyValue)` is a fixed few bytes, while the pointer may point at far more (L-0112, left as taught). Every cache keeps its own counter because the command is too expensive (L-0113). Hint: look at how memory is allocated, in any language (L-0114). `malloc` takes a size, gets memory and returns an address (L-0115, light inline clarification: from the process's heap, asking the OS only when it runs low). `free` releases it (L-0116, light inline clarification: back to the allocator; to the OS only sometimes). A new key means `o = (MyValue *) malloc(sizeof(MyValue))` (L-0117). A proposal: count `sizeof(MyValue) + 4 + 4` per allocation (L-0118); another: the pointed-to data need not be on the heap (L-0119). In fact everything (wrappers, Bloom filters, sets, list nodes) is on the heap and comes through malloc, so update a counter on every malloc (L-0120). The class's punchline: write your own wrapper around malloc (and free) (L-0121).
- **PauseAndThink P3** (the 1 MB Bloom filter). **Figure:** Fig 2·c "sizeof sees the wrapper, not the data" (new).
- **Words:** 550

### 2.6 zmalloc: one wrapper, one counter, one cap
- **Opens with:** the wrapper Redis actually uses.
- **Key points:** Redis wraps malloc in `zmalloc`, same signature: malloc b, `total_size += b`, return (L-0122, left as taught; the page says real zmalloc does only the accounting, as in the CodeBlock comment). The global total always tells you usage, with no OS call (L-0123). Redis still checks the OS figure occasionally, but mostly uses the counter (L-0124). One wrapper beats updating a count at 50,000 call sites, any one of which you could forget (L-0125). In Redis code you never see malloc, only zmalloc (L-0126). Every allocation, Bloom filters included, goes through it. You configure the limit, e.g. 1 GB on a 32 GB machine, a user-set soft limit (L-0127, plus A-DCL-04: `maxmemory 0` means no limit; replication and AOF buffers aren't counted). Enforce it: if `total_size + b > max`, return an error (L-0128), or evict a key first, then allocate: this is where eviction plugs in (L-0129, left as taught and labelled "our design"; Redis checks once per command). Big systems are built on very simple solutions (L-0130); think simple, not fancy, in any system (L-0132). The Redis code base is one of the easiest to skim, five or six days in (L-0131, the instructor's view). Once the counter says full, it is time to evict (L-0133) → §3.
- **Figure:** Fig 2·d (D-06 redraw: the code + a `total_size` gauge with a 1 GB cap line). **CodeBlock:** `zmalloc` / `zfree` as on the board.
- **RecallQuestions §2:** (1) Why does the cache keep its own byte counter instead of asking the OS? (2) `sizeof(MyValue)` is 16 bytes. Why can't the counter just add 16 per key, and what does zmalloc do instead? (3) Which is cheaper to get wrong: a cap checked at every call site, or in one wrapper? Why?
- **Words:** 550

---

## 3 · When the cache is full: eviction and expiry
**Section dek:** Which key goes when memory runs out, and how expired keys disappear, without spending memory on bookkeeping.
**Sec-meta:** about 25 min · class 00:58–01:18, 01:34–01:38, Q&A 01:45–01:47, 02:49
**Opening problem (our Redis):** `total_size + b > maxmemory`. A key has to go. Which one?
**RuleBox (§3):** "Understand the life cycle of a key before you pick a policy." Box body: how your users access a key, then LRU, LFU or random (L-0174). Sketch: two tiny access curves, a spike that decays and a line that keeps coming back. Sits in 3.4.
**Estimated words:** 3,500
**Q&A folded in:** Redis's LRU bits too deep (01:45:31) → 3.3. Memory-constrained LRU/LFU (01:45:59) → 3.3. O(1) LFU memory (01:46:29) → 3.2. Asymmetric popularity (02:49:21) → 3.4.

### 3.1 LRU, LFU, and where their bookkeeping lives
- **Opens with:** the two strategies everyone names.
- **Key points:** LRU keeps each key's last access time and evicts the least recently used (L-0134). LFU keeps how often each key is used and evicts the least frequently used (L-0135). First decide where that per-key information lives (L-0136). It is tempting to add a separate structure such as a priority queue (L-0137). Instead put it in the wrapper that already exists: next to the type, keep LRU bits (L-0138). Redis: 4 type bits + 28 LRU bits = 32 bits, one integer (L-0139, light inline clarification + A-DCL-01: Redis packs 4 type + 4 encoding + a 24-bit LRU/LFU field). Every database has something similar (L-0140). Wrapping the value was a good call: all per-key metadata lives in one place (L-0141). Every access updates the bits: a timestamp or an increment (L-0142). The same field serves either policy (L-0143, plus A-DCL-03: Redis's LFU uses an 8-bit logarithmic counter that decays).
- **Figure:** Fig 3·a "The struct that grows", stage 2 (+ `lru_bits`; a 32-bit word bar).
- **Words:** 400

### 3.2 The textbook LRU, priced in bytes
- **Opens with:** the interview answer: hash map plus doubly linked list.
- **Key points:** next question: how to implement, and is a priority queue best (L-0144)? The textbook LRU: list nodes hold entries, the map points at each node; get/put move the node to the head in O(1) (L-0145, L-0146). The cost: each node has next, prev and value pointers: 4 + 4 + 4 = 12 bytes (L-0147, light inline clarification: 24 bytes with 8-byte pointers). Key `a` (1 B) and value `2` (4 B): 5 bytes of data carry 12 bytes of overhead (L-0148). That gap is the difference between textbook and real caches (L-0149 → **SourceNote SN-05**, A-DCL-20). Lists are fine where memory isn't tight; a cache is memory-bound (L-0150, left as taught). The Linux kernel is full of linked lists, at least 52,000 at boot, per a kernel-contributor friend (L-0151, attributed and hedged). Redis does not keep the list; it would rather spend memory on user data (L-0152). Many databases skip a list (L-0153, light inline clarification: some do, some don't: Memcached and InnoDB use lists). An O(1)-time LFU also costs a lot of memory: time vs space (L-0238). A board pointer: read up on constant-time LRU and LFU (L-0209).
- **PauseAndThink P4** (bytes of bookkeeping per byte of data). **Figure:** Fig 3·b (D-07 redraw).
- **Words:** 500

### 3.3 Random eviction
- **Opens with:** what if you keep nothing at all?
- **Key points:** Redis supports LRU, LFU and random, with LRU/LFU done efficiently on the bits by an algorithm the class did not cover (L-0154, plus A-DCL-05: the full policy list). Random: pick any key and evict it, no extra information (L-0155, left as taught). You may evict a key you needed; if it is hot it misses once and comes back (L-0156). No per-key data means more keys fit (L-0157, left as taught). From practice: eight months into his first job, the instructor switched a production cache to random: many more keys, a very small rise in misses (L-0158, his experience). It relies on luck, but with millions of keys the odds favour you (L-0159). Eviction becomes fast: not optimal, but fast (L-0160). The trade-off: true LRU needs space to track recency; give up exactness and eviction gets cheaper (L-0161). Asked in class how to do LRU/LFU under tight memory, the answer given was "you cannot, go random" (L-0237 → **SourceNote SN-06**, A-DCL-02: approximated LRU by sampling). Redis's bit algorithm was called too deep for class (L-0236, light inline clarification: it is a few paragraphs in the Redis docs: sample 5 keys, keep a pool). Recap from the board: three strategies, random has zero overhead and trades correctness for capacity (L-0208).
- **MarginNote** "Go deeper": the instructor's Redis-internals course covers the bit algorithm (L-0175). Skip unless you want the Redis code walk.
- **Words:** 500

### 3.4 LRU or LFU? Follow the key's life
- **Opens with:** when would you use which, and why? (not only for caches) (L-0162).
- **Key points:** a first answer from class: LRU for streaming, LFU for things used again and again, "a bit confused" (L-0163). Everyone confuses them: the names are easy, a differentiator is not; the instructor got it only after writing both (L-0164). The clincher: LFU makes sense when you scan a lot: one scan wipes recency-based entries, while frequency keeps the heavy hitters (L-0165, plus A-DCL-21: InnoDB's midpoint insertion makes LRU scan-resistant). Stock-market analogy: holding a stock that dipped because it did well before is LFU; it ignores recency bias (L-0166). Use LFU when past popularity predicts future (L-0167): Wikipedia keeps pages that were hot before even if quiet now (L-0168); a FIFA World Cup spike shouldn't evict evergreen pages (L-0169). LRU fits keys hit hard and then forgotten (L-0170): a reel song trend (L-0171), Google News, where week-old news is rarely read (L-0172). Asymmetric popularity → LFU; otherwise LRU (L-0351). Neither always wins; most systems see no difference, extremes do (L-0173). → **RuleBox §3** (L-0174).
- **PauseAndThink P5** (World Cup and a scan). **AnimationClip `l07-lru-vs-lfu`.** Predict line: "A nightly report scans every article once. Which cache still holds the evergreen pages in the morning?" **Figure:** Fig 3·c (D-08 redraw).
- **Words:** 650

### 3.5 Expiry without extra structures
- **Opens with:** a key's TTL runs out. Who deletes it?
- **Key points:** the same budget applies: if TTLs needed lots of data, it would be futile (L-0210). Backward link: Lecture 3 built key expiry for the KV store; same apparatus (L-0211). Store the absolute expiry time in the per-key object, the minimum needed (L-0213). It is tempting to keep a priority queue of expiries; it costs pointers, so no (L-0214). Lazy deletion: on access, if the expiry is in the past, delete now (L-0215), with `zfree`, which decrements the counter (L-0216). Most keys go this way, cheaply (L-0217, left as taught). For keys never touched again: sample 20 keys with a TTL, delete the expired, repeat until fewer than 25% of a sample are expired (L-0218 → **SourceNote SN-07**, A-DCL-06). Memory leaks, but not forever (L-0219). Redis chose this because neither part needs an extra structure (L-0220, light inline clarification + A-DCL-07: Redis does keep a second table of keys with a TTL). The board's cleanup line: every server runs a cleanup that frees expired keys (L-0212, light inline clarification: in C there is no garbage collector, and it runs in the event loop).
- **Figures:** Fig 3·d (D-12 redraw: the rejected priority queue beside the struct with `expires_at`; struct stage 3). **StepThrough** Fig 3·e "Lazy deletion and sampling".
- **TradeoffTable T2** "Eviction policies": textbook LRU (list) · LRU on bits (sampled) · LFU · random. Rows: per-key memory · eviction cost · keeps scan-survivors? · fits · Redis. Red ✕ on textbook LRU "per-key memory": "12 B (24 B on 64-bit) for 5 B of data".
- **RecallQuestions §3:** (1) Where do the LRU bits and the expiry time live, and why not in a separate structure? (2) A cache of news articles: LRU or LFU, and what single observation would change your answer? (3) What deletes an expired key that nobody ever reads again?
- **Words:** 650

---

## 4 · Talking to the cache, and taking turns
**Section dek:** How other systems reach the cache (all of it is TCP; the question is the format), and how one node stays correct when two clients touch the same key.
**Sec-meta:** about 25 min · class 01:18–01:34, 01:38–01:50, Q&A 02:52–03:04
**Opening problem (our Redis):** the blog app's API servers need to call our cache thousands of times a second. What do they speak? (This framing joins the two halves of the page; it is the page's, not the lecture's.)
**RuleBox (§4):** "Don't open a new connection per call: keep one open, and pick the format your clients can speak." Box body: gRPC if your clients support it well, otherwise your own format, as Redis does (L-0201). Sketch: API box and cache box joined by one thick open line. Sits in 4.3.
**Estimated words:** 3,500
**Q&A folded in:** netcat as a hack (01:49:52) → 4.2. Single-threaded not blocking (01:47:12) → 4.5. Single thread wastes cores (02:52:47–02:53:56) → 4.5. Shared locks and double booking, Percona, deadlocks (02:57–03:02) → 4.6. Connection pooling in PHP (03:03) → 4.3 MarginNote.

### 4.1 Which protocol? It's all TCP
- **Opens with:** which protocol would you expose?
- **Key points:** how do others talk to the cache (L-0176)? Answers from class: TCP (L-0177); HTTP, so the server stays stateless (L-0178); HTTP's problem is a big payload (L-0179), but in fact the value is the same size whatever the protocol; the overhead is elsewhere. Options: HTTP, WebSockets, gRPC, your own (L-0180). All are just TCP; only the wrapping differs (L-0181). The class's claim: stateless HTTP/1.1 opens a TCP connection per request, handshake and teardown each time (L-0182 → **SourceNote SN-08**, A-DCL-08). TCP not UDP: the cache needs delivery and acks; UDP is fire-and-forget, and a cache is a "quote unquote database" (L-0205, left as taught).
- **Figure:** Fig 4·a (D-09 redraw).
- **Words:** 400

### 4.2 From practice: HTTP typed by hand
- **Opens with:** the instructor's 2015 IoT story.
- **Key points:** two friends' IoT sensors could only open TCP; the backend was Flask (L-0183, his story). The experiment: netcat opens a raw TCP connection to the server (L-0184). Every HTTP call shows headers in and out: how does the server know it got HTTP (L-0185)? After a connection is open you can send any bytes; the server decides what they mean (L-0186). HTTP is plain text: `GET /hello.html HTTP/1.1\r\n` plus headers (L-0187). Sending `This is a sample\r\n` got 400 Bad Request: the server was parsing HTTP (L-0188). Typing `GET /hello HTTP/1.1\r\n` got hello world, no library on the client (L-0190, left as taught, plus A-DCL-09: a strict server also needs `Host:` and a blank line). So a TCP-only device can call a Python backend without requests, Axios or Spring Boot (L-0191). A raw POST to `/login` with Content-Type and Content-Length worked too (L-0192), and a query-string GET (L-0194). Think from first principles (L-0189). It is just raw text your server understands, usable as a hack anywhere (L-0240).
- **MarginNote** "See it yourself": open `nc localhost 3000` against any local server and type the request. Skip if you've done it.
- **CodeBlock:** the three typed requests.
- **Words:** 450

### 4.3 Your own protocol, or gRPC
- **Opens with:** to store `a = 1`, all that text goes over the wire.
- **Key points:** HTTP adds a big chunk of overhead to every message, and the more bytes, the more the cache parses (L-0193). Define your own: Redis's RESP, followed by every Redis client, just as servers follow HTTP (L-0195, plus A-DCL-10: RESP's length-prefixed arrays, and inline commands typed in telnet: the same trick as netcat). Memcache has its own too (L-0196). Underneath is raw TCP; your handler decides (L-0197). It keeps the format in Redis's hands (L-0198). gRPC runs on HTTP/2, keeps the connection open and compresses: "best of all worlds" (L-0199, left as taught, plus A-DCL-11: framing; compression only with `grpc-encoding`). Choose by your use case and clients; you may even expose all three, configurable (L-0200). → **RuleBox §4** (L-0201). The recap's three options: stateless HTTP/1.1, gRPC, custom (L-0206 → **SourceNote SN-09**). Prototyping? Just use gRPC (L-0207).
- **PauseAndThink P6.** **Figures:** Fig 4·b "Bytes on the wire for `set a 1`" (new), Fig 4·c (D-11 redraw).
- **MarginNote** "Connection pools aren't a language feature" (asked in class; skip unless you've wondered): pooling isn't a property of the language; the instructor first said database, then the application logic or library (L-0370). A pool is several open TCP connections plus a queue (L-0371); you can write one in a day with a blocking queue (L-0372). The only need: the database keeps a connection open until asked (L-0373, left as taught, plus A-DCL-24: MySQL closes idle connections after `wait_timeout`, so pools validate). Back in Lecture 1 for pooling.
- **TradeoffTable T3** "HTTP/1.1 · gRPC · custom (RESP)": rows: format · connection · bytes per `set a 1` · client support · reach for it when. Red ✕ on HTTP/1.1 "bytes per `set a 1`".
- **Words:** 600

### 4.4 The single node so far
- **Opens with:** a recap page before going on.
- **Key points:** an in-memory hash table whose values are wrapper structs with a type and the data (L-0204). TCP, three protocol choices. When full, evict by LRU, LFU or random; random has zero overhead; full is known from zmalloc (L-0208 is in 3.3; this restates it in the figure only).
- **Figure:** Fig 4·d (D-10 redraw, recap: client → cache server → hash table of `key → object{type}`).
- **Words:** 150

### 4.5 Concurrency: lock, compare-and-swap, or one thread
- **Opens with:** two clients update the same key at the same instant.
- **Key points:** on one node, scaling is easy: vertical only (L-0221). Three ways to handle concurrency (L-0223). **Pessimistic:** take a lock around the critical step; one thread enters, the other waits; mutexes or semaphores (L-0224); back in Lecture 3, where the airline check-in used it. Read up if needed; Java's `synchronized` is pessimistic (L-0226). **Optimistic:** assume conflicts are rare, take no lock, ensure only one of two concurrent writers succeeds (L-0227): `update a = 20 where a = 10` vs `update a = 30 where a = 10` (L-0228). The check-and-write must be atomic: compare-and-swap, `CAS(a, 20, 10)` (L-0229). CAS is a CPU instruction every language wraps (Go's atomic, C++ Boost) (L-0230); it is the best way because the instruction is atomic: nothing else runs while it runs, and the OS doesn't context-switch in the middle (L-0231, left as taught). Exercise: write one yourself (L-0232). **Single-threaded:** no threads, no concurrency control: Redis's choice (L-0233, plus A-DCL-12: "mostly single threaded"). ForwardChip: how single-threaded Redis isn't blocked · the instructor's free videos (L-0234). Its authors challenged every decision: locks? atomics? no threads at all? (L-0235, attributed). A single thread is not "blocked" when two clients write different keys; that is how such systems are built (L-0239). The cost: Redis on 32 cores uses one (L-0354, left as taught); people run several shards per machine (L-0355). The single-node design, malloc counter included, works because it is single-threaded; threads would cause havoc, and one thread saves context switches (L-0356). Trade-offs everywhere (L-0357). Exercise from the board: how would you make MySQL serve as a cache with the same throughput (L-0225)?
- **Figures:** Fig 4·e (D-13 redraw, pessimistic). **StepThrough** Fig 4·f "Two conditional updates, one winner". Fig 4·g "One thread, 32 cores" (new, small).
- **TradeoffTable T4** "Pessimistic · optimistic · single thread": rows: what you pay · under heavy contention · code complexity · uses all cores? · example. Red ✕ on single thread "uses all cores?".
- **Words:** 750

### 4.6 From class: the double-booked seats
- **Opens with:** a question carried over from Lecture 3's seat-booking exercise.
- **MarginNote** "Shared locks and the double booking" (about 300 words; skip unless you did the Lecture 3 exercise): someone's shared-lock booking gave several people the same seat. A transaction holding a shared lock that updates the row has it elevated to exclusive (L-0361). That shouldn't happen; check the isolation level first (L-0362). Debug in the MySQL console, which shows who holds which lock (L-0363). The instructor's guess: two transactions take shared locks; T2 writes first and goes exclusive; T1 waits, then overwrites (L-0364 → **SourceNote SN-10**, A-DCL-22), because the waiting statement isn't re-evaluated (L-0365 → **SourceNote SN-11**, A-DCL-23). He assumed repeatable read, "almost the most common", and said it was a guess (L-0366, light inline clarification: InnoDB's default; PostgreSQL defaults to read committed). Percona's tools show lock state; he used them in 2015 (L-0367, left as taught). It could also be a bug, and deadlock logs are hard to read: practice vs production (L-0368, his view). A deadlock doesn't crash the database or program; it ends a transaction (L-0369).
- **Figure:** Fig 4·h "Two shared locks, two updates" (new, inside the MarginNote).
- **RecallQuestions §4:** (1) Why does HTTP cost a cache more than RESP even on a kept-alive connection? (2) Two clients send `update a=20 where a=10` and `update a=30 where a=10`. What does each see, and what instruction makes that safe? (3) Redis uses one core of 32. Why is that acceptable, and how do people use the rest?
- **Words:** 400

---

## 5 · Many nodes: splitting the keys and finding them
**Section dek:** One node can't take the load. Split the keys across nodes, and then decide who tells a client where its key lives.
**Sec-meta:** about 15 min · class 01:55–02:07, Q&A 02:30–02:32
**Opening problem (our Redis):** one node can no longer handle the load or hold the data.
**RuleBox (§5):** "There is no one right routing approach: pick your battles." Box body: a smarter client saves a hop; a proxy makes clients simple; huge decentralised systems forward; or redirect like DNS (L-0257). Sketch: the four small figure-to-boxes paths from D-15. Sits in 5.4.
**Estimated words:** 2,200
**Q&A folded in:** Redis routing without an LB (02:30:42) → 5.4. Sentinel / proxy (02:31:21) → 5.4. Mixing approaches (02:32:04) → 5.4. Replica writes, redirect vs reject (02:32:10) → 5.4.

### 5.1 Why distribute, and splitting the keys
- **Opens with:** the single-node cache is maxed out.
- **Key points:** make it distributed when one node can't handle the load or hold the data (L-0241). Five aspects: storage, routing, availability, reliability, scaling (L-0242). Storage: run the same single-node cache N times, each owning a mutually exclusive range: A–J, K–T, U–Z (L-0243) (back in Lecture 3 for range sharding). The question parked in 2.2 lands here (L-0089). A distributed cache = many single servers working as one coherent cache, e.g. behind a proxy (L-0263, board definition).
- **Figure:** Fig 5·a (D-14 redraw, panel a: three nodes with ranges).
- **Words:** 300

### 5.2 The routing problem
- **Opens with:** a client wants key `kiwi`. Which node?
- **Key points:** splitting adds routing: how does a client know which node owns a key (L-0244)? A first answer from class: a central place holding the range → node table that clients ask first (L-0245). Does that layer answer "go there" or forward the request? Both work, with pros and cons, and systems differ: a very solid answer (L-0246). This holds for any distributed storage (L-0247).
- **PauseAndThink P7** (find the node: name three ways). **Figure:** Fig 5·a panels b and c (routing box; table moved into the client).
- **Words:** 300

### 5.3 Four ways to route: a visit to the bank
- **Opens with:** you walk into a bank with a form.
- **Key points:** four ways (a fifth welcome), via a bank visit (L-0248). (1) **Proxy:** the peon at the door who, for a commission, gets it done; you never learn the desks (L-0249). A load balancer works this way, one entry point (L-0256) (back in Lecture 5). (2) **Smart client:** the regular who walks straight to the right desk; routing lives in the client (L-0250). If desks change, every client must hear; but no middle hop, so no "bribe", which here is network latency (L-0251). (3) **Forwarding:** no peon; the nearest desk forwards for you and relays the answer; no central authority (L-0252). IPFS and BitTorrent work this way (L-0253, light inline clarification: their Kademlia lookups are iterative, closer to redirect). The instructor has a video series on such overlays (L-0254). The internet itself forwards packets (L-0258). (4) **Redirect:** "I'm busy, go to counter 13", and you go yourself: DNS returns the IP and you connect (L-0255) (back in Lecture 5 for DNS).
- **AnimationClip `l07-four-routes`.** Predict line: "Same request, four banks. Which one costs the client two round trips?" **Figure:** Fig 5·b (D-15 redraw, four panels).
- **Words:** 600

### 5.4 Which way for a cache?
- **Opens with:** now pick one for our Redis.
- **Key points:** → **RuleBox §5** (L-0257). For a cache, a central proxy holding the table and forwarding works, like a load balancer; a smart client works too, but must learn every topology change (L-0259). Forwarding is rarely used for a cache: too many complications (L-0260). Redis redirects: a write on a replica returns the master's address (L-0261 → **SourceNote SN-12**, A-DCL-13). The four are a lens for any routing layer, and simple to build (L-0262). Asked in class: Redis's redirect avoids a load balancer, keeping infrastructure simple (L-0323). For reads, Sentinel and a proxy exist; the instructor was not sure how routing works today and suggested talks (L-0324, light inline clarification: Sentinel gives clients the master's address; it doesn't route reads). A real system can mix approaches (L-0325). Returning the master's address on a replica write is "the most common approach" (L-0326 → **SourceNote SN-13**). The alternative: reject and let the client find the master; like people, some say "find it yourself", others tell you where to go (L-0327).
- **Figure:** Fig 5·c (D-16 redraw: distributed cache behind a proxy; hash vs range routing lines).
- **TradeoffTable T5** "Four ways to route": Proxy · Smart client · Forwarding · Redirect. Rows: hops per request · who knows the topology · on a topology change · example · fit for our cache. Red ✕ on Forwarding "fit for our cache": "too many complications".
- **RecallQuestions §5:** (1) In the bank analogy, what is the "bribe", and which routing way avoids paying it? (2) Why is a smart client harder to run when nodes come and go? (3) What does a Redis Cluster node answer when you send it a key it doesn't own?
- **Words:** 700

---

## 6 · Consistent hashing, DHTs and staying up
**Section dek:** Adding a node with `hash % N` moves half the data. Consistent hashing decides ownership so only a slice moves. Then: running it in production, its weak spots, the general idea (DHTs), and replicas.
**Sec-meta:** about 30 min · class 02:07–02:30, Q&A 02:32–02:39, 02:50–02:52
**Opening problem (our Redis):** three nodes can't keep up. Add a fourth (L-0265).
**RuleBox (§6):** "Consistent hashing solves for ownership. Nothing else." Box body: it decides who owns which key; it does not move data, migrate anything or keep you up (L-0277, L-0278). Sketch: a ring with one key and a curved arrow to the next node. Sits in 6.2.
**Estimated words:** 4,200
**Q&A folded in:** nodes too close (02:32:50) → 6.5. Hot partitions (02:33:06–02:33:17) → 6.5. Virtual nodes (02:34:43–02:38:08) → 6.5. Delete moved data unless replicated (02:50:24) → 6.4. Virtual nodes homework (02:51:42) → 6.5. Orchestrator page glimpse (02:32:54) → 6.7.

### 6.1 Who owns a key?
- **Opens with:** add a fourth node.
- **Key points:** consistent hashing is "the most famous algorithm of all time", buried in misconceptions (L-0266). Hash-based routing: the router hashes each key and the result names the node (L-0267). Routing defines ownership; ownership is the key concept (L-0268). Range routing assigns owners by key range; hash routing by hash (L-0269). Hash routing is by far the most common because the hash spreads load near-uniformly and deterministically (L-0270, plus A-DCL-14: Redis Cluster uses 16,384 hash slots, not a ring). Back in Lecture 2 for `hash(user_id) % N`. Six keys on two caches: K1, K2, K6 → cache 0; K3, K4, K5 → cache 1 (L-0271). Add a node: mod 2 becomes mod 3 and every key must be rechecked (L-0272). K1, K3, K4 stay; K2 → cache 2, K5 → cache 0, K6 → cache 2 (L-0273). Three of six moved: 50% (L-0274; arithmetic checked: with plain `% N` → `% (N+1)` about N/(N+1) of keys move on average, so 50% is the lucky case here). Moving that much over the network is slow; consistent hashing aims to fix it (L-0290).
- **PauseAndThink P8** (which of K1–K6 move). **Figure:** Fig 6·a (D-17 redraw, both tables, moved rows marked red).
- **Words:** 550

### 6.2 What consistent hashing is, and isn't
- **Opens with:** three myths first.
- **Key points:** it is not a service or microservice, and not magic (L-0275). It solves ownership and nothing else (L-0277) → **RuleBox §6**. It does no data movement or migration and gives no uptime guarantee (L-0278). Not even really a data structure: a sorted array and a binary search, small (L-0279). Drawn as a ring for intuition; read the instructor's blog for code (L-0281, L-0280: blog with Python source; it's in the pre-reads). Nodes are placed by hashing their ids (L-0282). The ring is the hash range 0..2^n: 2^4 = 16 in the example, as large as 2^128 in reality (L-0283, left as taught). Example: cache 1 → 3, cache 2 → 12, cache 3 → 5, cache 4 → 10 (L-0284). The ring lives wherever routing lives: client, proxy or the DNS-like component (L-0285). For four nodes it's an array of four, nothing more (L-0286). It replaces the routing table with a more elegant mapping (L-0287). A key's owner: hash the key, take the first node clockwise (L-0288). K1 hashes to 0; next is 3, so cache 1 owns it (L-0289). The instructor has used it in production (L-0300); stay away from internet myths and learn the one problem it solves (L-0301).
- **Figures:** Fig 6·b (D-18 redraw). Fig 6·c "Ring and array" (new: the ring beside `[3:c1, 5:c3, 10:c4, 12:c2]` and a binary search for 0). **CodeBlock:** 6-line owner lookup (bisect over the sorted positions, wrap to index 0).
- **Words:** 650

### 6.3 Adding and removing nodes
- **Opens with:** back to the fourth node, now a fifth.
- **Key points:** cache 5 hashes to 1, so K1 now belongs to cache 5 (L-0291). Only keys in the new node's slice move, from cache 1 to cache 5; all others are untouched: minimal data transfer (L-0292). Only the neighbours of the new position are affected (L-0293, left as taught). That is the whole benefit (L-0294). Removing a node (say, scaling down an over-provisioned cluster) has two cases (L-0295): K1 goes to cache 3, the next node (L-0296). Graceful: snapshot cache 1, copy to cache 3, then remove cache 1, so no misses (L-0297). Abrupt: cache 1's whole load lands on cache 3, and you live with it (L-0298). Other keys are unaffected either way (L-0299).
- **AnimationClip `l07-mod-vs-ring`.** Predict line: "Six keys, two nodes, add a third. How many keys move with `% N`, and how many on the ring?" **Figures:** Fig 6·d (D-19 redraw). **StepThrough** Fig 6·e (D-20 redraw) "Graceful or abrupt".
- **TradeoffTable T6** "`hash % N` · ring · ring + virtual nodes": rows: data moved on add · moved from where · ownership lookup · balance · operations. Red ✕ on `hash % N` "data moved on add".
- **Words:** 550

### 6.4 Never add a blank node
- **Opens with:** at peak, you add an empty cache 5 to the ring.
- **Key points:** its keys aren't there: misses, and the backend takes the load (L-0302). Operationally: snapshot cache 1, build cache 5 from it, add it to the ring so K1 is found, then slowly delete moved keys from cache 1 (L-0303). With a replication factor you may keep the data on cache 1 anyway; without, snapshot, create, delete (L-0352). For a stateful cache that is simple: one quick snapshot, one load, nothing fancy (L-0333).
- **PauseAndThink P9** (blank node at peak). **StepThrough** Fig 6·f "Adding cache 5 safely".
- **Words:** 350

### 6.5 Where the ring hurts: close nodes, hot spots, virtual nodes
- **Opens with:** the ring is not perfect, as the class pointed out.
- **Key points:** nodes can land too close together; you don't control placement (L-0328). Hot partitions: you trust the hash to spread keys; with a bad key distribution one node runs hot, and you add a node just to dilute it (L-0330). Companies use it anyway: scaling is simple, and with a hash range "so long" everyone plays by the odds (L-0331, light inline clarification: imbalance comes from too few points, not range size; Dynamo's answer was virtual nodes). ForwardChip: hot partitions, solved when the course designs S3 · a later week (L-0264). ForwardChip: the case where consistent hashing performs badly · a later week (L-0276). **The virtual-node debate:** virtual nodes split the ring into many slices mapped to physical nodes; the class's concern: a failure then moves many scattered chunks instead of one neighbour's (L-0332 → **SourceNote SN-14**), bringing back network transfer from many places, what the ring was adopted to cut (L-0336 → SN-14). A new node at many positions loads from many nodes: hard to run, easy to miss something, as slow as the slowest source (L-0334, left as taught, plus A-DCL-16: Cassandra's documented costs and its newer allocator). The lecture's verdict: not a good way to fix hot partitions in a stateful system; companies do it with hacks (L-0335 → **SourceNote SN-15**, A-DCL-15). Not the worst, "just bad enough"; fine if you accept the transfer; the instructor prefers copy-one-node simplicity, because simple systems scale (L-0337, his preference). Homework: count the places you'd copy from (L-0353, left as taught). ForwardChip: virtual nodes, promised for the next session (Lecture 10).
- **Figure:** Fig 6·g "Virtual nodes: where a new node's data comes from" (new: one neighbour vs many slices).
- **Words:** 650

### 6.6 The general idea: distributed hash tables
- **Opens with:** what did we just build?
- **Key points:** our cache is a distributed hash table (L-0304, left as taught). A DHT is generic: in memory it's a cache, on disk it's storage (L-0306). No central entity; a cache can skip the central router too (L-0307). At internet scale you ask the nearest node; it answers, forwards, or tells you where to go; the lookup converges (L-0308). Adding or removing nodes must move little data, hence consistent-hashing-like techniques (L-0309). No centre + minimal transfer = a DHT (L-0310). Examples given: the internet, BitTorrent, Bitcoin (L-0305 → **SourceNote SN-16**); distributed file systems, DNS servers, IM/IRC, P2P, IPFS (L-0311 → **SourceNote SN-17**). IPFS stores things like blockchain and NFT data (L-0312). Kademlia solves DHT routing: no node knows all others, yet lookups converge (L-0314, plus A-DCL-19). Go deeper: the instructor's 45-minute Kademlia video; it took him three days (L-0313).
- **Figure:** Fig 6·h (D-21 redraw).
- **Words:** 500

### 6.7 Staying up: replicas, copies on the ring, and the AOF
- **Opens with:** cache 3 dies. Where is its data?
- **Key points:** high availability, for a cache as for storage: give each node a replica that takes over, at the cost of the extra node (L-0315). Or keep copies on the next nodes of the ring: cache 3's data also on cache 4 (L-0316). The ring lets you set a replication factor: "RF 2" as stated, the owner plus the two next nodes (L-0317, light inline clarification + A-DCL-17: by the usual definition that's RF 3, since RF counts all copies). Redundancy is how you get HA, even for a cache (L-0318). Durability: Redis's AOF appends every write and replays it on restart (L-0319, left as taught, plus A-DCL-18: off by default; `everysec` can lose about a second). An append-only file is the standard way to durability; the instructor corrected "reliability" to "durability" (L-0320). The board's glimpsed page: an orchestrator watches heartbeats, handles failover, keeps metadata in a MetaDB, with Prometheus monitoring and elastic scaling (L-0329). Recap: storage on separate nodes with ownership logic, hash or range (L-0321); single node in depth, routing, replicas, consistent hashing for minimal transfer (L-0322).
- **Figures:** Fig 6·i "Two ways to survive a node" (D-20 bottom redraw + RF panel). Fig 6·j (D-22 redraw, small, marked "glimpsed on the board").
- **RecallQuestions §6:** (1) With `% N`, going from 2 to 3 nodes moved 3 of 6 keys. On the ring, adding cache 5 at position 1 moves which keys? (2) Name the two ways to remove a node and what each costs. (3) Virtual nodes: what does the lecture say they cost, and what does Dynamo say they buy?
- **Words:** 500

---

## 7 · What to keep
**Section dek:** the decisions, the heuristics, and where the next lessons pick up.
**Sec-meta:** about 3 min
**Opening problem:** none. This is the recap.
**Key points:**
- **Figure** Fig 7·a "Our Redis, end of Lecture 9" (the single node's struct + zmalloc, the protocol port, the ring with replicas and a router; each part tagged with its chapter number; doubles as navigation).
- **Decision table** (Prose list, the teaching map's option C as recap, 11 lines): storage layout (§2) · type metadata (§2) · memory accounting (§2) · eviction (§3) · expiry (§3) · protocol (§4) · concurrency (§4) · partitioning (§5) · routing (§5) · rebalancing (§6) · availability (§6). Each line: the choice made and the cost axis. These restate placed ids; no new placement.
- **Heuristics card** (8 lines, each linking back): rely on the source of truth (§1, L-0031); count every byte (§2, L-0098); simple solutions build big systems (§2, L-0130); understand a key's life cycle (§3, L-0174); keep connections open (§4, L-0201); pick your routing battle (§5, L-0257); consistent hashing = ownership (§6, L-0277); think operationally (§6, L-0353).
- **ForwardChips ("Where this lecture stops"):** next session, the class builds two storage engines from files (L-0376 → Lecture 10). Restated from their sections: Spark and data engineering (L-0044), CDC in multi-tier designs (L-0052), hot partitions on S3 (L-0264), where consistent hashing fails (L-0276).
- **Components:** Figure, Prose, ForwardChips. No RuleBox, prompt or recall.
- **Words:** 400

---

## Totals
| Section | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 300 | – | – | – | – | – |
| 1 ETL and CDC | 3,300 | 1·a, 1·b, 1·c, 1·d, 1·e, 1·f | l07-events-vs-cdc | P1 | T1 | SN-01..02 |
| 2 One node | 3,300 | 2·a, 2·b, 2·c, 2·d | – | P2, P3 | – | SN-03..04 |
| 3 Eviction and expiry | 3,500 | 3·a, 3·b, 3·c, 3·d, 3·e(step) | l07-lru-vs-lfu | P4, P5 | T2 | SN-05..07 |
| 4 Protocol and concurrency | 3,500 | 4·a, 4·b, 4·c, 4·d, 4·e, 4·f(step), 4·g, 4·h | – | P6 | T3, T4 | SN-08..11 |
| 5 Routing | 2,200 | 5·a, 5·b, 5·c | l07-four-routes | P7 | T5 | SN-12..13 |
| 6 Consistent hashing | 4,200 | 6·a, 6·b, 6·c, 6·d, 6·e(step), 6·f(step), 6·g, 6·h, 6·i, 6·j | l07-mod-vs-ring | P8, P9 | T6 | SN-14..17 |
| 7 Keep | 400 | 7·a | – | – | – | – |
| **Total** | **~20,700** | **37 figures (4 step-throughs) + 6 rule-box sketches** | **4** | **9** | **6** | **17 notes covering 18 items** |

Reading time is about 95 minutes over seven pages. All 22 board diagrams (D-01..D-22) are redrawn; none is dropped. The NOTES.md weakness #3 (three marker colours, no identity) bites in §6: keys and nodes are told apart by mono labels (`K1`, `c3`) and position on the ring, never by colour. Figures use one glyph kit; `figures.md` lists the additions to it first.
