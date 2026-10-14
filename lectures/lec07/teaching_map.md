# Teaching Map - Lecture 07 (Week 5, Day 1): ETL and CDC, designing a distributed cache, consistent hashing

Source: `lectures/lec07/transcript/transcript.md` (03:11:10). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: first day of **week 5, "storage engines" week** (00:00:00), promised at the end of lecture 6 (lec06 02:40:48). The lecture has two unrelated halves glued by the teacher's "form the dots" framing: a short **CDC introduction** on the familiar multi-user blogging app (the course's Medium-like app), then the main event, a **distributed in-memory cache** designed bottom-up - single node first (storage, memory cap, eviction, protocol, TTL, concurrency), then made distributed after the break (routing, consistent hashing, DHTs, availability). Redis is the implicit reference design throughout ("I deep dive into Redis source code", 00:00:57). It relies on earlier weeks for: Kafka essentials and the event-driven designs (CDC is contrasted against them), week 2's key-value store (TTL sampling) and airline check-in (pessimistic locking), DNS, connection pooling, read replicas. "Tiered storage" was announced in the agenda but only appears as the CDC multi-tier diagram (D-04); its real treatment is deferred.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:00 | 00:04:35 | 4.5 | Admin: week 5 = storage engines; teacher's love of databases (C grade story); agenda (ETL/CDC intro first, then distributed cache LLD, break, HLD); "Lego blocks" framing | - | "So let's start with tiered storage" |
| 1 | 00:04:35 | 00:20:03 | 15.5 | **ETL and CDC** | **Case study, day-zero growth story**: the blogging app grows until the CEO needs analysts (D-01) | "Any questions on this? We'll take questions till 9:26" |
| 1a | 00:04:35 | 00:08:23 | 4 | Day-zero analytics: Grafana/Metabase on the prod DB; Series A limit; analysts know SQL; prod DB is MongoDB with PII -> copy to MySQL | Company-growth narrative | "But how will data from MongoDB go to MySQL? That's the next question" |
| 1b | 00:08:23 | 00:10:45 | 2.5 | Naive pipeline: API events -> Kafka -> workers -> MySQL; what goes wrong (no misses allowed, not everything has an event, events lack data, extra reads) | **Natural-but-wrong first** ("you think, hey, we know Kafka"), then "Can we lose something?" (D-02) | "There has to be a better way... Which is where CDC comes in" |
| 1c | 00:10:45 | 00:15:15 | 4.5 | CDC: definition, Airbyte/Debezium, source/transform/sink, reads WAL/binlog or iterates rows, resumes after downtime, sinks need not be DBs | **Definition + tool names + "go install it"** (D-03) | "Now where can you use it?" |
| 1d | 00:15:15 | 00:20:03 | 5 | Where to use CDC: raw data vs application context; MySQL -> Elasticsearch, MySQL -> Redshift, Redshift -> S3 (multi-tier); bulk fetch/ingest; consulting story (80% cost cut) | Diagram of tiers (D-04) + war story | Questions |
| 2 | 00:20:03 | 00:31:31 | 11.5 | **Q&A on CDC**: client vs raw WAL, run CDC on a replica, the 80% story in detail (60 x 32 GB machines -> 2 EC2), silent data loss, batching, eventual consistency, CDC vs SSE, SQS vs Kafka, transaction order, Spark for joins, PG sync | Student-driven | "Rajiv, I'll take your question" -> moves on to the cache |
| 3 | 00:31:31 | 00:58:02 | 26.5 | **Distributed cache - single node: storage and memory cap** | **Requirements list + agenda of brainstorm topics** ("we are very greedy") | "Now you exactly know where to trigger eviction... that brings us to eviction" |
| 3a | 00:31:31 | 00:33:26 | 2 | Requirements (high throughput, low latency, distributed; get/put/delete/TTL); two brainstorms (low-level then high-level); topic list | Slide of requirements | "Let's start with the first one" |
| 3b | 00:33:26 | 00:35:53 | 2.5 | Storage = hash table | **Open question to class** (Hemant) | "Let me change the requirement a bit" |
| 3c | 00:35:53 | 00:42:45 | 7 | Multiple value types: pointer to object; where to keep the type (key vs value) -> `MyValue{value*, type}`; student's 4-bit idea = what Redis does | **Changed requirement** -> Socratic "why key, why not value?" | "Now let me talk about a pitfall" |
| 3d | 00:42:45 | 00:44:51 | 2 | Heap exhaustion -> segmentation fault (teacher's claim; see factcheck L-0104) | **Pitfall question** to Nitin + "I'll give you nostalgia" (D-05) | "So we have to cap the memory usage" |
| 3e | 00:44:51 | 00:53:28 | 8.5 | How to know memory used: OS command too expensive (syscall); own size counter; sizeof doesn't see pointed-to data; every allocation goes through malloc | **Question chain** (Gaurav, Anubhav) with a hint about malloc | Student: "create our own wrapper around malloc" |
| 3f | 00:53:28 | 00:58:02 | 4.5 | zmalloc / zfree wrapper with global total_size; configured cap (1 GB of 32 GB); check-then-evict inside zmalloc; "simple solutions" | **Named reveal** of the Redis solution after the student reaches it (D-06) | "So this is how you know your cache is full. And now it's time to do eviction" |
| 4 | 00:58:02 | 01:18:54 | 21 | **Eviction** | **Recall question** ("two most common strategies?") | "So eviction done" |
| 4a | 00:58:02 | 01:01:49 | 4 | LRU and LFU definitions; where to store per-key info -> LRU bits in the wrapper (4 + 28 = 32 bits) | Student defines; teacher steers from "data structure" to "where to store" | "How will we implement LRU or LFU?" |
| 4b | 01:01:49 | 01:07:12 | 5.5 | Map + doubly linked list LRU; 12 B overhead for 5 B of data; Linux kernel linked lists; Redis does not keep the list | **Textbook answer then cost estimate** ("What is the memory overhead here, Shreya?") (D-07) | "Let me spend a little more time into a third strategy" |
| 4c | 01:07:12 | 01:09:57 | 3 | Random eviction: zero metadata, more keys, slight miss increase; teacher's production change at 8 months | **War story** + correctness-vs-performance trade-off | "When would you use LRU, when LFU?" |
| 4d | 01:09:57 | 01:18:54 | 9 | LRU vs LFU: Mohit's scan answer; stock-market analogy; Wikipedia / FIFA World Cup (LFU); reels and Google News (LRU); understand access pattern; Redis supports all three; Redis course | **Open question** -> confusion -> best student answer -> analogy -> examples (D-08) | "So this is about eviction" |
| 5 | 01:18:54 | 01:34:27 | 15.5 | **Communication protocol** | **Open question** ("which protocol would you use to expose your cache?") | Recap of the single node, then TTL |
| 5a | 01:18:54 | 01:22:30 | 3.5 | HTTP vs WebSockets vs gRPC vs own protocol; "all just TCP"; HTTP/1.1 per-request handshake (teacher's claim; see factcheck L-0182) | Socratic: "what is the disadvantage of HTTP?" (D-09) | "The payload example that you gave, I just want to take a small detour" |
| 5b | 01:22:30 | 01:29:29 | 7 | Detour: IoT sensors + Flask; netcat raw TCP; sending "This is a sample" -> 400; hand-typed GET and POST work; HTTP overhead for key=a value=1 | **First-person war story** with live terminal output | "Is it worth it? Can you do better?" |
| 5c | 01:29:29 | 01:31:54 | 2.5 | Define your own protocol: RESP (Redis), Memcache's own; gRPC on HTTP/2; pick per use case | Answer to the story's question | "We are still not done with low-level implementation" |
| 5d | 01:31:54 | 01:34:27 | 2.5 | Recap of the single-node cache: hash table + object, TCP not UDP, three protocol options (gRPC to prototype), eviction, zmalloc | **Recap page** (D-10, D-11) | "Now talk about handling TTLs" |
| 6 | 01:34:27 | 01:38:52 | 4.5 | **TTLs**: store absolute expiry in the object; no priority queue; lazy deletion with zfree; sample 20 keys / 25% (from week 2) | **Backward link** to week 2 + byte-budget principle (D-12) | "Now, scaling is easy" |
| 7 | 01:38:52 | 01:50:12 | 11.5 | **Scaling and concurrency on a single node** | Vertical-only one-liner, then "three ways" | Break |
| 7a | 01:38:52 | 01:40:28 | 1.5 | Vertical scaling only; concurrency: pessimistic locking (week 2 airline check-in, mutex/semaphore) | Backward link (D-13) | "But optimistic locking we never spent time on" |
| 7b | 01:40:28 | 01:44:05 | 3.5 | Optimistic locking: `update a=20 where a=10`; compare-and-swap, CPU instruction, language libraries | SQL-like semantics then CAS (D-13) | "Now, the third part" |
| 7c | 01:44:05 | 01:45:23 | 1.5 | Single threadedness (Redis); "they challenged every single decision" | **Rhetorical**: "why do you need concurrency when you can be single threaded?" | "We'll take questions for five minutes" |
| 7d | 01:45:23 | 01:50:12 | 5 | Q&A: LRU bits depth, memory-constrained LRU -> random, O(1) LFU memory, single-threaded not blocking, consistent hashing deferred, zmalloc for every allocation, netcat as a hack | Student-driven | Break |
| 8 | 01:50:12 | 01:55:18 | 5 | Admin: break, audio check | - | "Let's start with the second half" |
| 9 | 01:55:18 | 02:08:02 | 12.5 | **Making the cache distributed: storage and routing** | **Why first** ("one node is not able to handle the load") + five-aspect agenda | "How will you add [a fourth node]?" -> consistent hashing |
| 9a | 01:55:18 | 01:56:52 | 1.5 | Storage: same single-node cache x N, key ranges A-J / K-T / U-Z | Teacher gives the answer directly (D-14) | "But now this adds a complexity" |
| 9b | 01:56:52 | 01:59:34 | 2.5 | Routing problem; Hemant's central routing table; respond vs forward | **Open question** + "who is redirecting?" | "Which is what I want to talk about next" |
| 9c | 01:59:34 | 02:07:26 | 8 | Four ways of routing via the **bank analogy**: peon/proxy, regular customer/smart client, any desk forwards (IPFS, BitTorrent, internet), "go to counter 13" redirect (DNS, Redis replica); which fit a cache | **Analogy-first, one scenario per way** (D-15, D-16) | "Now let's talk about availability" |
| 9d | 02:07:26 | 02:08:02 | 0.5 | Availability/scaling: add a fourth node (hot node deferred to S3 week) | Problem posed | "This is where... consistent hashing comes in" |
| 10 | 02:08:02 | 02:27:05 | 19 | **Consistent hashing and DHTs** | **Misconception-first** ("tons of misconceptions... let me sort that out") | "Okay, high availability" |
| 10a | 02:08:02 | 02:12:00 | 4 | Hash-based routing defines ownership; range vs hash; K1-K6 table, mod 2 -> mod 3 moves 3 of 6 keys (50%) | **Worked numeric example** (D-17) | "Now what consistent hashing solves" |
| 10b | 02:12:00 | 02:17:10 | 5 | Consistent hashing solves ownership only - not a service, no data movement, a sorted array + binary search; ring 0..2^4; nodes at 3/12/5/10; key goes to next node clockwise; lives in whatever layer routes | **Myth-busting definition** then ring walk-through (D-18) | "But now the advantage of this is..." |
| 10c | 02:17:10 | 02:21:51 | 4.5 | Add cache 5 at 1: only K1's range moves; remove cache 1: graceful (copy then remove) vs abrupt (load shifts to cache 3); "used it in production"; blog link | Same ring, one change at a time (D-19, D-20) | "Let's talk about practicalities" |
| 10d | 02:21:51 | 02:23:21 | 1.5 | Data transfer in practice: blank node -> cache misses; snapshot cache 1 -> build cache 5 -> add to ring -> delete moved keys | **"What would happen if..."** operational prompt | "What we just discussed is a distributed hash table" |
| 10e | 02:23:21 | 02:27:05 | 3.5 | DHT: our cache is a DHT; no central entity; minimal data movement; examples (BitTorrent, IPFS, and contested ones - see factcheck L-0305, L-0311); Kademlia video | **Generalisation** of the design (D-21) | "Okay, high availability" |
| 11 | 02:27:05 | 02:30:42 | 3.5 | **High availability and recap**: replicas/standby, copies on next nodes of the ring (replication factor); Redis AOF for durability; recap of storage/routing/availability/scaling | Standard practice stated (D-20 bottom) | "Any questions on high level part" |
| 12 | 02:30:42 | 03:05:34 | 35 | **Q&A** | Student-driven | "Any other question anyone?" |
| 12a | 02:30:42 | 02:39:19 | 8.5 | Redis routing without a LB; Sentinel/proxy (teacher unsure); mixing approaches; nodes too close; hot partitions ("everyone's playing by the odds"); **virtual nodes** - Hemant's doubt endorsed ("A thousand times. Yes") | Student-driven | "Rajiv, go to malloc page" |
| 12b | 02:39:19 | 02:48:22 | 9 | Rajiv corrects the segfault claim (malloc returns NULL); virtual vs physical pages; teacher's crash experiment; CDC instances, locks/offset store; why CDC loads the DB less than event workers (batching, async workers have no events) | Student challenge | "Anubhav, go on" |
| 12c | 02:48:22 | 02:57:29 | 7 | Growing a set (realloc and copy); LFU for asymmetric popularity; delete moved data unless replication factor; virtual nodes homework; single-threaded wastes cores -> several shards per machine; ulimits, malloc limits, SIGABRT | Student-driven; Nitin teaches the teacher on SIGABRT | "Gaurav, you had general questions" |
| 12d | 02:57:29 | 03:05:34 | 8 | Shared locks double-booking (week-2 assignment): isolation level, lock upgrade explanation (see factcheck L-0364), Percona; deadlock kills the transaction not the program; connection pooling is not a language property; one CDC to many sinks | Student-driven | "Any other question anyone?" |
| 13 | 03:05:34 | 03:11:10 | 5.5 | Admin: wrap-up (tomorrow: build two storage engines), chat export, beginner course vs this course, one-on-one booking window | - | End |

Time budget: CDC 15.5 min (+11.5 Q&A), single-node cache 26.5 (storage/memory) + 21 (eviction) + 15.5 (protocol) + 4.5 (TTL) + 11.5 (concurrency + Q&A), distributed part 12.5 (routing) + 19 (consistent hashing/DHT) + 3.5 (HA), Q&A 35. About **27% of the lecture is Q&A**, and it holds real corrections (malloc/segfault, SIGABRT), the virtual-node debate and the CDC load argument - fold them into the topics.

**Introduction patterns observed** (reusable templates):
- **Growth story -> natural-but-wrong pipeline -> list what breaks -> better tool** (analytics -> Kafka events -> CDC).
- **Socratic bottom-up build with a held-back reveal**: the teacher asks a chain of narrowing questions until a student says the punchline (hash table, wrapper around malloc), then names the Redis implementation (zmalloc, 4 type bits, 28 LRU bits).
- **Changed requirement** to force a design step ("Now imagine in the value we could store set, list, bloom filter...", 00:35:53).
- **Textbook answer -> byte-count it -> cheaper alternative** (linked-list LRU 12 B vs 5 B -> random eviction; priority queue -> lazy deletion + sampling).
- **Confusion -> best student answer -> human analogy -> product examples** (LRU vs LFU).
- **War-story detour that answers the student's half-right point** (IoT/netcat answers "HTTP payload is big").
- **Analogy with one scenario per option** (bank: peon, regular customer, any desk, "go to counter 13").
- **Myth-busting definition -> one-change-at-a-time walk-through on the same diagram** (consistent hashing: ownership; add a node; remove a node; operational steps).
- Recurring frame: **"every byte matters because RAM is costly"** - nearly every single-node decision is justified against it.

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:08:23 | "Relying on events generated from the API server, is this the best way to populate this database? Can we lose something?" (rhetorical) | - | No data misses allowed (business decisions), not everything has an event, events lack the full row (L-0025, L-0026, L-0027) | CDC from the source of truth (L-0031) |
| P2 | 00:33:26 | "How would you store the data in this node? It's an in-memory store." | S1 (Hemant): contiguous array of keys holding pointers to values; open addressing vs chaining | "To put it simply, hash table." "If hash maps already exist, why would you want to rebuild that logic?" (00:35:12) | Hash table (L-0087) |
| P3 | 00:35:53 | "Now imagine in the value we could store set, list, bloom filter and HyperLogLog... How will your value be represented?" | S1: as in Java, a general object - pointer to the object on the heap, primitives in place | "I'm so loving how you are using the right term, primitive values" | Pointer to an object (L-0091) |
| P4 | 00:37:20 | "How do you know what type your value is? ... How will you know what type the value is?" | S1: metadata with the key; later a few bits (4 bits = 16 types) to save space | "But why key? Why not value?" - prefixing a string key complicates lookups; then "Brilliant point. Which is why Redis does this. It uses four bits" (00:41:21) | `MyValue { value*, type }` with a 4-bit type (L-0094, L-0097) |
| P5 | 00:42:45 | "What happens when you exhaust the heap? ... What happens in the 1025 iteration?" | S2 (Nitin): eviction policy runs; then: moves data from memory to disk | "That cache runs eviction policy. But in the program heap..." -> "Segmentation fault" | Program crashes (teacher's answer; challenged at 02:39:19, see factcheck L-0104) |
| P6 | 00:45:53 | "How will you find how much memory your cache is using? Gaurav, what will you do?" | S?: use a command; S6 (Gaurav): number of keys x size, or `size += n` per add | Command = system call = interrupt, too slow (00:45:58); "But by how much will you add?" - sizeof doesn't capture what the pointer points to (00:47:22) | Maintain your own size counter (L-0110, L-0113) |
| P7 | 00:49:19 | "Given this is what you are doing, what would be the simplest way to keep track of the amount of memory used?" | S5 (Anubhav): counter of sizeof(my value) + 4 + 4; then: the bloom filter is also malloc'd; then: "create our own wrapper around malloc" | "This pointer can point to a bloom filter, which might be like 1 MB" (00:51:25); "Exactly" (00:53:28) | zmalloc: wrap malloc, `total_size += b` (L-0122) |
| P8 | 00:58:02 | "What are the two most common eviction strategies?" | S3 (Rajiv): LRU and "one more" | Teacher supplies "frequently used" | LRU, LFU (L-0134, L-0135) |
| P9 | 00:59:20 | "Where would you store this information - when was the key last used, how frequently?" | S3: a separate structure such as a priority queue | "You're talking about implementation. First, let's talk about storing this information" | LRU bits inside the per-key wrapper; 4 + 28 = 32 bits (L-0138, L-0139) |
| P10 | 01:01:49 / 01:03:56 | "How will we implement LRU or LFU? Is priority queue the best way?" / "What is the memory overhead over here, Shreya?" | S7 (Shreya): hash map + doubly linked list, O(1), move to head | "Everyone talks about this. But we are very constrained on memory" -> 12 B per key for a 5 B pair | Real caches avoid the list; random eviction as the cheap option (L-0147, L-0148, L-0155; see factcheck L-0149) |
| P11 | 01:09:57 | "When would you use LRU? When would you use LFU? ... and why?" | S8 (Rahul): LRU for streaming-like, LFU for repeated access, "a little bit confused"; S4 (Mohit): LFU when you scan a lot - one scan wipes out recency-based entries | "Everyone gets confused"; "Brilliant. This is the first time someone has very beautifully explained where you should use LFU" (01:12:22) | LFU when past popularity predicts future (Wikipedia); LRU when interest decays (News) (L-0165, L-0167, L-0172) |
| P12 | 01:18:54 | "Which communication protocol would you use to expose your cache to other systems?" | S?: TCP; S7: HTTP, stateless; disadvantage = payload size of the value; WebSockets; S?: "you can write your own" | "That is true for anything that you use" (01:20:27); "all these three are just TCP connections" | Keep a connection open: gRPC or a custom protocol (L-0181, L-0201) |
| P13 | 01:28:15 | "All I want to do is store key=a value=1, but I have this huge chunk of overhead... Is it worth it? Can you do better?" (rhetorical) | - | - | Define your own protocol, like RESP (L-0193, L-0195) |
| P14 | 01:41:11 | "When both of these [update a=20 where a=10 / update a=30 where a=10] fire at the same time, what would happen?" (rhetorical) | - | - | Only one succeeds; implement with compare-and-swap (L-0228, L-0229) |
| P15 | 01:44:05 | "Why do you need concurrency when you can make things single threaded? ... What if I don't support threads at all?" (rhetorical) | - | - | Single-threaded Redis (L-0233) |
| P16 | 01:56:52 / 01:58:45 | "How would my client know which one to talk to?" / "Where would you store this? Does the routing layer respond to the client or forward the request?" | S1 (Hemant): a central place holding the range -> node table; "pros and cons in both cases... different systems do a different way" | "Perfect. Thanks, you have very solid understanding" | Four ways of routing (L-0245, L-0246, L-0248) |
| P17 | 02:02:32 | "There is no peon. There is no central authority. Where would you go?" (rhetorical) | - | - | The nearest desk forwards for you (L-0252) |
| P18 | 02:07:26 | "Now I want to add the fourth node because three nodes are not able to handle the load. How will you add it?" (rhetorical) | - | - | Consistent hashing (L-0265, L-0266) |
| P19 | 02:10:34 | "Now let's say I added one more cache node into my system. Now what would happen?" (rhetorical, worked) | - | Walks K1-K6 from mod 2 to mod 3 | 3 of 6 keys move, 50% data movement (L-0273, L-0274) |
| P20 | 02:19:29 | "What if I'm removing a cache server?" | - | Two cases: graceful, abrupt | Graceful: copy to the successor then remove; abrupt: successor takes the load (L-0297, L-0298) |
| P21 | 02:21:51 | "If I just start a blank cache server and add it over here, what would happen? ... So how do you spin up this server?" | - | Blank node -> cache misses -> backend load | Snapshot cache 1, build cache 5, add to ring, delete moved keys (L-0302, L-0303) |
| P22 | 02:34:43 | (student-proposed) Are virtual nodes really a good strategy? Many small chunks on different servers means more movement when one goes down | S1 (Hemant) | "Yes. A thousand times. Yes... You are on fire today" - operational cost for stateful systems | Teacher avoids virtual nodes for stateful caches (L-0332, L-0335; see factcheck L-0336 for the counter-view) |
| P23 | 02:52:47 | (student-proposed) A single-threaded cache on an 8 vCPU box wastes seven cores? | S2: run eight shards on the same machine | "That's what people do to increase the hardware utilization" | Multiple instances per machine (L-0354, L-0355) |
| P24 | 02:57:49 / 02:58:09 | (reverse) "What was your isolation level?" | S6 (Gaurav): week-2 shared-lock seat booking double-allocated seats | Teacher's guess: shared lock upgrades, writer doesn't re-evaluate (see factcheck L-0364, L-0365) | Check isolation level, inspect locks (L-0362, L-0363) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Your cache must never exceed 1 GB. `sizeof(MyValue)` says 16 bytes, but that value points to a 1 MB Bloom filter. How do you always know how much memory you're using - without asking the OS each time?"** (P6 + P7, 00:45:53-00:53:28). The lecture's best Socratic chain; three wrong-ish steps (OS command, key count x size, sizeof) before the one-line answer (wrap malloc). The reveal is satisfying and generalises ("do it in one place").
2. **"A textbook LRU keeps a doubly linked list node per key. Your keys are 'a' -> 2. How many bytes of bookkeeping per byte of data? Would you still do it in a cache?"** (P10, 01:03:56). Readers can do the arithmetic (12 B vs 5 B; 24 B on 64-bit per factcheck L-0147), and it flips a memorised interview answer.
3. **"Your Wikipedia cache uses LRU. The FIFA World Cup starts. What happens to the evergreen pages - and which policy would protect them? What about a full-table scan?"** (P11, 01:09:57-01:15:11). Turns the everyone-confuses-them pair into a concrete prediction; Mohit's scan answer is the clincher.
4. **"Keys are placed with hash(key) mod 2. You add a third cache. Which of K1-K6 have to move?"** (P19, 02:10:34). Fully computable from the board table (D-17); sets up consistent hashing as a fix for one specific pain.
5. **"Your API publishes a Kafka event whenever a blog is published, and workers copy it into the analytics DB. List three ways the analytics copy silently drifts from the real database."** (P1, 00:08:23-00:10:45). Readers generate the failure list themselves; the consulting story (silent data loss, 00:24:24) confirms it.
6. **"A cache value can be a string, set, list or Bloom filter. Where do you record which one it is - in the key or in the value - and how many bits do you need?"** (P4, 00:37:20-00:41:21). Two-step: placement, then bit budget (4 bits); a student out-thinks the teacher's first answer, which is worth showing.
7. **"Three cache nodes own key ranges. How does a client find the right node? Give at least three different answers."** (P16 + P17, 01:56:52-02:04:22). Open design question; the bank analogy then lays out four answers to compare with.
8. **"You add a new, empty cache node to the ring at peak traffic. What do users and the database feel - and how would you add it instead?"** (P21, 02:21:51). Moves readers from the algorithm to operations; answer is a 4-step runbook.
9. **"Virtual nodes are supposed to fix imbalance on the ring. For a cache that holds state, what does adding one physical node now cost?"** (P22, 02:34:43). Good debate prompt: show the teacher's operational argument and the fact-check's counter-view (same total data, more sources; L-0332).
10. **"For a key-value cache, is HTTP worth it? Write out the exact bytes of a request that sets a=1."** (P12 + P13, 01:18:54-01:28:15). The netcat story makes it tangible; fix the per-request handshake claim (factcheck L-0182) and keep the header-overhead point.

Runner-up: "Redis runs one thread on a 32-core box. Is that waste?" (P23, 02:52:47) - better as a closing trade-off card.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:00:57, 00:02:15 | **Lego blocks / "control C, control V"** of patterns | Why designing one cache teaches many systems | Page intro line (L-0005, L-0006) |
| 01:12:33-01:14:17 | **Stock market**: you hold a stock that dipped because it did well in the past = LFU; selling on recent dip = recency (LRU) | LFU vs LRU as human behaviour | Strong; pair with D-08 curves; reprised in Q&A 02:50:02 (L-0166) |
| 01:16:09 | **Song trend on reels**: huge spike then nobody uses it | LRU access pattern | Use with D-08 left curve (L-0171) |
| 01:59:34-02:04:22 | **Visiting a bank**: peon at the door (proxy, takes a "bribe"), regular customer who knows the desk (smart client), any desk forwards your request (forwarding), "go to counter number 13" (redirect) | Four routing strategies | Signature device; make a 4-panel illustration (D-15) (L-0248-L-0255) |
| 02:01:38 | **The bribe = network latency** | Cost of the proxy hop | One-line caption in the analogy panel (L-0251) |
| 02:32:10 | Replica that says "I don't know, go find it" vs "this is where you should go" - "how the humans behave" | Reject vs redirect a write on a replica | Q&A side note (L-0327) |
| 02:13:48 | **The ring** as visual only; "implementation: an array with binary search" | Consistent hashing representation vs implementation | Show ring and the sorted array side by side (L-0279, L-0281) |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:00:00 | Teacher scored a C in database systems but loved it | Motivation, admin-ish | Optional aside (L-0002) |
| 00:02:15 | Built on tiered storage at Amazon | Credibility for the deferred topic | Forward chip (L-0008) |
| 00:06:07 | Querying prod DB from dashboards works till Series A, 10,000-50,000 users | When the day-zero setup breaks | Number callout (L-0016) |
| 00:19:07, 00:22:10-00:25:34 | **Consulting story**: data sync via Kafka, 60+ consumers on 32 GB machines, one event per update, no batching, silently out of sync; switched to Airbyte CDC -> 2 EC2 instances, 80% cut for that subsystem, less replication lag, no loss | CDC beats hand-built event sync for raw data | Lead war story for CDC (L-0053, L-0059-L-0064) |
| 00:25:34 | "There is always a service no one touches ever" | Legacy inertia | Caption (L-0067) |
| 00:30:41 | Student used PG sync to push Postgres to Elasticsearch without knowing it was CDC | CDC is something many already use | Reader recognition moment (L-0077; see factcheck L-0077) |
| 00:43:24 | malloc 1 MB in a loop with 1 GB RAM -> iteration 1025 | Heap exhaustion thought experiment | Keep with the corrected outcome (L-0102; factcheck L-0104) |
| 00:55:09 | Cap the cache at 1 GB on a 32 GB machine | maxmemory is a user setting | (L-0127) |
| 01:00:32 | 4 type bits + 28 LRU bits = 32 bits = one integer | Packing metadata | Show as a bit diagram; fact-check says 4+4+24 (L-0139) |
| 01:04:39 | Key 'a' (1 B) + value 2 (4 B) = 5 B of data vs 12 B list overhead | Cost of textbook LRU | Core number (L-0148) |
| 01:05:15 | Linux boots with at least 52,000 linked lists (friend who contributes to the kernel) | Lists are fine where memory isn't the constraint | Aside, unverified number (L-0151) |
| 01:08:33 | **Teacher, 8 months into industry, switched production cache to random eviction**: many more keys, minimal miss increase | Random eviction trade-off | Lead war story for eviction (L-0158) |
| 01:14:17-01:15:11 | Wikipedia pages; FIFA World Cup spike | LFU | (L-0168, L-0169) |
| 01:16:53 | Google News: nobody reads week-old news | LRU | (L-0172) |
| 01:22:30-01:28:15 | **2015 IoT story**: friends' Flask server, sensors only speak TCP; netcat "This is a sample" -> 400 Bad Request; hand-typed `GET /hello HTTP/1.1` -> hello world; raw POST /login works | HTTP is just text over TCP; its overhead | Interactive "type it yourself" box (L-0183-L-0192) |
| 01:37:02 | Sample 20 keys, repeat until < 25% expired | Active expiry | Fact-check: ~10% now (L-0218) |
| 02:09:35-02:11:45 | K1-K6, mod 2 -> mod 3, 3 of 6 move = 50% | Rehash cost | Table D-17 (L-0271-L-0274) |
| 02:14:21 | Ring 0..2^4 (16 slots) in the example; 2^128 in reality | Ring size | (L-0283) |
| 02:21:12 | Teacher used consistent hashing in production | Credibility | (L-0300) |
| 02:25:47 | Took three days to understand Kademlia; 45-min video | Optional deep dive | Link chip (L-0313) |
| 02:40:21 | Teacher deliberately crashed his own Redis by malloc-ing and touching pages | Where his segfault claim came from | Keep with the correction (L-0340, L-0341) |
| 02:53:08 | Redis on 32 cores uses one | Single-thread cost | (L-0354) |
| 02:57:29 | Week-2 assignment: 120 seats, shared locks, several people got the same seat | Lock semantics | Q&A box (L-0361-L-0365) |
| 03:01:19 | Percona tooling, used in 2015 | Lock debugging | (L-0367) |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:15:15 | CDC vs API events into Kafka | Raw data -> CDC; needs application context -> API events (L-0046) |
| 00:17:04 | CDC bulk read/write vs one event per change | Batching (L-0050) |
| 00:21:18 | CDC via DB client vs reading raw log files | Format changes handled by the client (L-0056) |
| 00:27:20 | CDC vs SSE | Backend DB sync vs server-to-browser push (L-0070) |
| 00:30:06 | CDC vs Apache Spark | Simple transforms vs joins/aggregations (L-0074, L-0075) |
| 00:39:06 | Type in key vs in value wrapper | Lookup simplicity; wrapper extensible (L-0094) |
| 00:45:58 | OS memory command vs own counter | System-call cost (L-0109) |
| 00:54:10 | Counter at every call site vs one wrapper | One place can't be forgotten (L-0125) |
| 01:02:22-01:09:57 | LRU (list) vs LFU vs random | Optimality vs memory/speed (L-0161) |
| 01:15:11 | LRU vs LFU | Decaying vs recurring popularity (D-08) |
| 01:21:40-01:31:16 | HTTP/1.1 vs gRPC vs custom (RESP) | Overhead, connection reuse, client support (L-0206) |
| 01:32:24 | TCP vs UDP | Delivery guarantees (L-0205) |
| 01:35:48 | Priority queue vs lazy deletion + sampling for TTL | Extra memory (L-0214, L-0220) |
| 01:39:05-01:44:05 | Pessimistic vs optimistic vs single-threaded | Contention, lock cost, simplicity (L-0223) |
| 02:08:22 | Range-based vs hash-based routing | Uniformity (L-0269, L-0270) |
| 02:10:34-02:18:09 | hash mod N vs consistent hashing | Data moved on resize (L-0274, L-0294) |
| 01:59:34-02:06:06 | Proxy vs smart client vs forwarding vs redirect | Extra hop vs client complexity (L-0257) |
| 02:19:29 | Graceful vs abrupt removal | Copy first vs absorb the load (L-0297, L-0298) |
| 02:27:23 | Dedicated replica/standby vs copies on next ring nodes | Cost vs redundancy (L-0315, L-0316) |
| 02:28:51 | Reliability vs durability (AOF) | Teacher self-corrects the word (L-0320) |
| 02:36:20 | One-snapshot add vs virtual-node add | Operational simplicity (L-0333, L-0334) |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:41:21, 00:41:58, 01:34:27, 01:37:50 | "When you're designing something in memory, be very cautious on every single byte, every single bit... RAM is very costly" | Running "byte budget" callout through the single-node section (L-0098, L-0210) |
| 00:56:57, 02:22:35, 02:38:08 | "Big systems are built on very simple solutions" / "simple systems scale" | Section closer (L-0130) |
| 01:08:33, 02:04:22, 02:29:21, 02:53:56 | "Computer science is filled with trade-offs" / "pick your battles" | Trade-off cards (L-0161, L-0257) |
| 00:10:45, 00:12:55, 02:45:26 | "Rely on the source of truth" | CDC thesis line (L-0031) |
| 02:12:00, 02:16:20 | "Consistent hashing solves for ownership. Done and dusted" | Pull quote (L-0277) |
| 02:18:09, 02:20:22, 02:22:35 | "Minimal data transfer" | Consistent hashing takeaway (L-0294) |
| 02:36:20, 02:52:04 | "Think about it operationally" | Operations sidebar (L-0353) |
| 00:10:45, 00:14:00, 01:43:38, 02:13:10, 03:03:21 | "Go install it / implement it / play around with it" (Airbyte, CAS, consistent hashing, connection pool in a day) | "Try it" boxes (L-0030, L-0232, L-0372) |
| 01:23:41, 01:26:11 | "Think on the first principles" | IoT story frame (L-0189) |
| 01:44:51 | "They challenged every single decision" (locks? atomics? no threads?) | Concurrency closer (L-0235) |
| 00:03:12, 00:18:10, 00:32:46 | "Form the dots in your head" | Intro framing for the CDC part |
| 01:17:26 | "Understand the life cycle of a key in your system" before picking a policy | Eviction decision card (L-0174) |
| 02:04:22, 02:06:06 | "Any distributed system's routing layer can be built on these four" | Routing generalisation (L-0262) |

---

## 4. The Redis-like cache (plus blogging-app) case-study thread (proposed spine)

The lecture has two threads: the **multi-user blogging app** carries the CDC part, and **"build your own Redis"** carries everything after 00:31:31 (Redis is named at almost every design decision).

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:04:35 | Day-zero blogging app: API + DB, dashboards on prod | Analytics needs a separate store | Reuse the course's blog app diagram (D-01) |
| 00:06:07 | CEO hires analysts who only know SQL; prod is MongoDB with PII | Why copy data out | |
| 00:08:23 | Blog-published events -> Kafka -> MySQL | Event pipeline and its gaps | D-02 with the four problems |
| 00:10:45 | CDC reads MongoDB's log and writes MySQL | CDC | D-03 |
| 00:15:15-00:18:10 | Same data to Elasticsearch (search), Redshift (analytics), S3 (backup) | Multi-tier storage via CDC | D-04; label as a preview of tiered storage |
| 02:45:26 | Async workers aggregating likes periodically - no API event | Why CDC catches what events miss | Move this Q&A example into the CDC section |
| 00:32:07 | Cache requirements: get, put, delete, TTL | Scope | Start of the "build Redis" thread |
| 00:39:06-00:41:58 | Value wrapper with a 4-bit type | Redis object header | D-06 struct |
| 00:53:28 | zmalloc / zfree | Memory accounting | D-06 code |
| 01:00:22 | LRU bits in the header | Eviction metadata | |
| 01:06:05-01:08:33 | Redis skips the linked list; supports random | Eviction choices | |
| 01:29:29 | RESP | Custom protocol | |
| 01:37:50 | Lazy deletion + sampling | TTL without extra structures | |
| 01:44:05 | Single-threaded Redis | Concurrency by avoidance | |
| 02:06:06 | Redis replica answers a write with the master's address | Redirect routing | Fact-check L-0261: Cluster MOVED; standalone replica refuses |
| 02:28:51 | Redis AOF | Durability | |
| 02:30:42-02:32:10 | Redis routing, Sentinel | Q&A on routing in practice | Teacher hedged; use factcheck L-0324 |

Gaps where the case study is *not* used but could carry the content (without inventing claims): the cache is never attached to the blogging app (e.g. "the blog app's API servers talk to this cache"), which would join the two halves; LRU/LFU examples use News/Wikipedia rather than the app; consistent hashing uses abstract K1-K6 and cache 1-5 (keep those - they match the board). Linking the halves on the site would be a framing choice, not a lecture claim.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:08:23 | Publishing events from the API to Kafka is the obvious way to feed an analytics DB | General ("you think, hey, we know Kafka") | Events miss changes and lack data; use CDC on the source of truth (L-0028; inline factcheck L-0028) |
| 00:06:07 | Read-only access to prod is safe enough for analysts | General | PII and risk (L-0018) |
| 00:24:24 | The Kafka sync pipeline was fine | The consulted company | It was silently losing data (L-0064) |
| 00:25:21 | Batching alone would have fixed it | S2 | "Would not have been as worse" - partial (L-0066) |
| 00:27:13 | CDC is close to server-sent events | S6 | Different layers entirely (L-0070) |
| 02:43:37 | Kafka read from MySQL in the old design | S3 | The API-service workers read MySQL (L-0345) |
| 00:35:12 | Rebuild hashing (open addressing/chaining) for the cache | S1 | Use the existing hash map (L-0088) |
| 00:38:08 | Value type belongs in the key | S1 | Wrapper in the value; but the bit-budget idea was right (L-0093, L-0097) |
| 00:43:23 | Heap exhaustion triggers the cache's eviction | S2 | Eviction is the cache's policy; the program heap is separate (L-0101) |
| 00:43:48 | OS moves data to disk to make space | S2 | Teacher said no; fact-check says swap makes this closer than implied (L-0103) |
| 00:43:56 | Exhausting the heap causes a segfault | **Teacher** | malloc returns NULL / OOM killer; challenged by S3 (02:39:19) and S2 (02:54:32); see factcheck L-0104, L-0341 |
| 00:45:53 | Ask the OS how much memory the process uses | S? | System-call cost; keep your own counter (L-0108, L-0109) |
| 00:47:22, 00:51:25 | sizeof(wrapper) gives the value's size | S6, S5 | Pointed-to data is allocated separately (L-0112, L-0118) |
| 00:59:33 | Use a priority queue for eviction order | S3 | Store bits in the object; avoid extra structures (L-0137, L-0138) |
| 01:05:15 | The textbook map + linked list LRU is how real caches do it | General | Memory overhead; Redis samples - but Memcached uses lists (factcheck L-0149) |
| 01:10:50 | LRU vs LFU is just "recent vs frequent" | General / S8 | Use the access-pattern test (L-0164) |
| 01:20:10 | HTTP's problem is the value's payload size | S7 | Value size is the same for any protocol; overhead is headers/connection (L-0179) |
| 01:21:40 | HTTP/1.1 opens a new TCP connection per request | **Teacher** | Keep-alive is the default; see factcheck L-0182 |
| 01:35:48 | TTLs need a priority queue | General | Lazy deletion + sampling; Redis does keep an expires table (factcheck L-0220) |
| 01:47:12 | A single-threaded cache blocks concurrent clients | S2 | Event loop, not blocked (L-0239) |
| 02:08:02, 02:12:00 | Consistent hashing is a service / a magic solution / moves data for you | General | It only decides ownership (L-0275, L-0278) |
| 02:15:02 | The ring is a heavy structure (linked list etc.) | General | An array of node positions (L-0286) |
| 02:21:51 | Adding a blank node to the ring is enough | Implied | Cache misses; snapshot first (L-0302) |
| 02:23:21, 02:24:57 | The internet, Bitcoin, DNS and IRC are DHTs | **Teacher** | See factcheck L-0305, L-0311 |
| 02:32:10 | Almost all databases return the master's address on a replica write | **Teacher** | Many just reject; see factcheck L-0326 |
| 02:33:17 | A huge ring range makes imbalance unlikely | **Teacher** | Few points, not range size, cause imbalance (factcheck L-0331) |
| 02:34:43 | Virtual nodes are the fix for hot spots | General | Teacher: operationally costly for stateful systems; fact-check: total moved stays ~1/N (L-0332, factcheck L-0336) |
| 02:54:32 | Exceeding limits raises SIGABRT | S2 (endorsed by teacher) | ENOMEM or OOM-killer SIGKILL; see factcheck L-0359 |
| 02:58:37 | Shared-lock upgrade without re-evaluation explains the double booking | **Teacher** (guess) | See factcheck L-0364, L-0365 |
| 03:02:46 | A deadlock crashes the program/database | S6 | It terminates the transaction (L-0369) |
| 03:03:02 | PHP can't do connection pooling; pooling is a language property | S6 | It's application/library logic over open TCP connections (L-0370, L-0371) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- The course's blogging app and event-driven designs with Kafka (consumers, workers) from earlier weeks.
- WAL / commit log / bin log as a concept (00:12:06, used not explained); read replicas (00:21:18).
- Data warehouses, SQL, MongoDB, Elasticsearch, Redshift, S3 by name.
- C memory model: heap, malloc/free, pointers, `void*`, sizeof, structs (00:48:29 explains malloc briefly).
- Hash maps, doubly linked lists, priority queues, Big-O.
- TCP three-way handshake, HTTP request format (shown, not taught), gRPC/HTTP/2 by name.
- Week 2: key-value store TTL sampling, airline check-in pessimistic locking, mutex/semaphore (01:40:05: "spend some time reading about it").
- Hash functions and mod; DNS resolution (02:03:35).
- Connection pooling (lec01) for the Q&A at 03:03:02.

### Concept graph (A -> B means B builds on A)
```
CDC part
Day-zero analytics on prod DB -> need for a separate SQL copy (analysts, PII)
  -> naive API events -> Kafka -> workers -> MySQL (00:08:23)
       -> failure list (missing events, partial events, extra reads, crash after write)
  -> CDC: read source of truth (WAL/binlog or row iteration) -> transform -> sink (00:10:45)
       -> checkpointing / resume (00:12:55) -> sinks can be Kafka/SQS/S3 (00:14:00)
       -> raw-data vs application-context rule (00:15:15)
       -> multi-tier storage (search, analytics, backup) (00:17:04) -> [tiered storage, deferred]
       -> batching advantage (00:17:04, 02:44:58) -> consulting story
       -> limits: eventual consistency (00:26:31), Spark for complex joins (00:30:06)

Cache part - single node
Requirements (get/put/delete/TTL) -> storage = hash table (00:34:46)
  -> multiple value types -> value wrapper {pointer, type} (00:39:06) -> bit budget (4 bits) (00:41:21)
  -> heap is finite -> must cap memory (00:44:51)
       -> need current usage -> OS command too slow -> own counter -> sizeof insufficient
       -> every allocation goes through malloc -> zmalloc/zfree wrapper (00:53:28)
       -> cap check inside zmalloc -> trigger eviction (00:56:13)
  -> eviction: LRU/LFU need per-key metadata -> LRU bits in the wrapper (01:00:22)
       -> list-based LRU too costly (01:04:39) -> random eviction (01:07:12)
       -> LRU vs LFU by access pattern (01:15:11)
  -> TTL: expiry in the wrapper -> lazy deletion via zfree -> sampling (01:35:13-01:37:02)
  -> communication: all TCP -> HTTP overhead (IoT story) -> gRPC / custom RESP (01:29:29)
  -> concurrency: pessimistic -> optimistic (CAS) -> single-threaded (01:39:05-01:44:05)
       -> single thread wastes cores -> shards per machine (Q&A 02:52:47)

Cache part - distributed
Single-node cache x N with key ranges (01:55:50)
  -> routing problem -> four routing ways (bank) (01:59:34)
  -> ownership: range vs hash routing (02:08:22)
       -> hash mod N moves ~50% on resize (02:11:45)
       -> consistent hashing = ownership via ring/sorted array (02:12:00)
            -> add node / remove node -> minimal data transfer (02:17:10-02:20:22)
            -> operational add via snapshot (02:21:51)
            -> problems: close nodes, hot partitions (Q&A) -> virtual nodes and their cost (Q&A)
       -> DHT generalisation, no central entity, Kademlia routing (02:23:21-02:25:47)
  -> availability: replicas / copies on the next ring nodes (replication factor) (02:27:23)
  -> durability: AOF (02:28:51)
```

Cross-links worth surfacing on the site:
- **"Source of truth"** is the CDC thesis and also the reason consistent hashing replaces the routing table (both: derive from one authoritative place).
- **The value wrapper** is reused four times: type (00:39:06), LRU bits (01:00:22), expiry (01:35:13), and it's what zmalloc allocates (00:49:19). Show one struct that grows.
- **zmalloc** links memory cap -> eviction trigger -> zfree in TTL deletion.
- **Batching** links the consulting story (00:22:10) and the CDC load Q&A (02:44:58).
- **Snapshot-then-switch** recurs: adding cache 5 (02:21:51), graceful removal (02:20:22), virtual-node cost (02:36:20).
- **Redirect routing** links DNS (02:03:35), Redis replicas (02:06:06), Kademlia-style lookups (02:24:03; factcheck L-0253 says DHTs are closer to redirect than forwarding).
- **Single thread** links concurrency (01:44:05), zmalloc's global counter being safe (Q&A 02:53:31), and hardware utilisation (02:53:08).

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:00:00 | Storage-engines week as promised at the end of lecture 6 (lec06 02:40:48) |
| 00:02:15 | "Up until now, we just wrote CDC" in earlier designs; "over these last four weeks... patterns" |
| 00:03:12 | Same approach as the "Kafka essentials" introduction |
| 00:04:35 | The multi-user blogging application (course case study since lecture 1) |
| 00:15:15 | "A lot of systems that we built where we were using Kafka" |
| 01:34:27, 01:35:48 | Week 2 key-value store: key expiration, sampling 20 keys |
| 01:39:27, 01:40:05 | Week 2 airline check-in: pessimistic locking |
| 02:03:35 | "When we discussed DNS" |
| 02:12:00 | "In the previous [session] I shared about consistent hashing"; blog in the pre-reads |
| 02:57:29 | Week 2 shared-lock seat-booking implementation (student) |
| 03:03:02 | Connection pooling discussed earlier |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:03:12 | ETL and tiered storage in practice; Amazon order system | "Tomorrow or next week" |
| 00:14:00 | Spark and data engineering basics | "Mostly next week" |
| 00:19:07 | CDC used heavily in data-engineering and multi-tier designs | Tomorrow / next week |
| 00:41:58 | Other Redis object meta information | "When we go into other features" |
| 01:06:05, 01:17:57, 01:45:43 | Redis's LRU/LFU bit algorithm | Not covered (Redis internals course) |
| 01:44:05, 01:47:45 | How single-threaded Redis isn't blocking | Teacher's free YouTube videos |
| 01:48:09 | Consistent hashing question | Same lecture, after the break |
| 02:07:26 | Hot nodes / hot partitions | Next week, S3 design |
| 02:12:00 | Where consistent hashing "sucks big time" | Next week |
| 02:25:47 | Kademlia routing | Teacher's BitTorrent video series |
| 02:31:21 | How Redis routes today (Sentinel/proxy) | Teacher to catch up |
| 02:51:52 | Virtual nodes discussion | "Let's discuss it tomorrow" |
| 02:57:01 | SIGABRT correction | Material refined next quarter |
| 03:05:34 | Build two storage engines | Tomorrow |

Site handling: show these as "coming in a later lesson" chips. Note that "tiered storage", announced at 00:00:57 and 00:04:22, was not taught beyond D-04 - say so explicitly instead of implying it was covered.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive.

### Option A - "Two chapters: CDC, then build a Redis from one box to a ring" (RECOMMENDED)
1. **Chapter 1 - Getting data out without losing it (CDC)**: blog app grows (D-01) -> prompt #5 (events pipeline drift) -> D-02 failure list -> CDC (D-03) with how it reads each DB (factcheck L-0038) -> raw vs context rule -> multi-tier fan-out (D-04, one CDC to many sinks Q&A) -> consulting story (60 machines -> 2) -> limits box (eventual consistency, Spark for joins, run on a replica, client vs raw log, transaction order) -> "try Airbyte" box -> tiered-storage chip.
2. **Chapter 2 - One cache node, every byte counted**: requirements -> hash table (P2) -> value wrapper and type bits (prompt #6) -> memory cap: prompt #1 -> zmalloc (D-06) with the segfault claim corrected in-line (Q&A 02:39:19 / 02:54:32) -> eviction: metadata bits -> prompt #2 list overhead (D-07) -> random eviction + war story -> prompt #3 LRU vs LFU (stock analogy, D-08, asymmetric-popularity Q&A) -> TTL (lazy + sampling, D-12) -> protocol: prompt #10 + IoT/netcat story -> RESP/gRPC (D-09, D-11) -> concurrency: pessimistic/optimistic/single-thread (D-13) + cores Q&A -> recap struct.
3. **Chapter 3 - Many nodes**: split by ranges (D-14) -> prompt #7 routing -> bank analogy (D-15) -> prompt #4 mod-N movement (D-17) -> consistent hashing as ownership (D-18) -> add/remove (D-19, D-20) -> prompt #8 operational add -> problems box (close nodes, hot partitions, virtual nodes prompt #9 with both views) -> DHT and Kademlia -> HA, replication factor, AOF.
4. **Recap**: heuristics card (byte budget, simple systems, source of truth, ownership, think operationally) + forward chips.

Pros: keeps the teacher's own order inside each part (it is already a well-built escalation); the single-node -> distributed split matches his "low-level then high-level" plan; Q&A corrections land next to the claims they correct. Cons: the CDC chapter and the cache chapters don't connect; the page is long and needs strong navigation.

### Option B - "Cache first, CDC as a separate short page"
Lead with the distributed cache (chapters 2-3 above), and publish CDC as its own short lesson that the next lecture (tiered storage / Amazon orders) can build on.
Pros: one coherent story per page; CDC sits next to where it will be used. Cons: departs from the lecture's order; splits one lecture into two pages, which makes provenance and "nothing lost" checks span two files.

### Option C - "Design-decision catalogue"
Organise the cache content as a list of decisions, each with options and the cost axis: storage layout, metadata placement, memory accounting, eviction, expiry, protocol, concurrency, partitioning, routing, rebalancing, availability.
Pros: excellent revision/reference; mirrors the teacher's "they challenged every single decision" message. Cons: loses the Socratic build-up (the reveals depend on order); weak for a first read; CDC doesn't fit.

**Recommendation**: Option A. Use Option C's decision list as the closing recap table, and keep the "byte budget" callout as a running side element through Chapter 2.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| CDC reads WAL via Postgres client or instance access (00:20:03) | CDC - how it reads |
| Client better than raw logs; low load; run on a replica (00:21:12) | CDC - how it reads / limits box |
| 80% saving detail, 60 machines -> 2, no batching (00:21:59) | CDC - consulting story |
| Lost performance? Gained; silent data loss (00:24:15) | CDC - consulting story |
| Batching would have helped; legacy service (00:25:21) | CDC - consulting story |
| CDC from a read replica (00:26:01) | CDC - limits box |
| Eventual consistency; synchronous needs (00:26:14) | CDC - limits box |
| CDC vs SSE (00:27:13) | CDC - misconception callout |
| Why not SQS instead of Kafka (00:27:47) | CDC - consulting story footnote |
| Transactions captured in commit order (00:28:44) | CDC - limits box |
| Complex joins -> Spark (00:29:34) | CDC - limits box |
| PG sync is a CDC (00:30:41) | CDC - "you may already use one" |
| Heap exhaustion question to Nitin (00:43:23) | Single node - memory cap |
| Rajiv's deferred previous-slide question (00:58:16) | Taken at 02:39:19 -> single node - memory cap correction |
| Redis LRU bits too deep (01:45:31) | Eviction - forward chip |
| Memory-constrained LRU/LFU -> random (01:45:59) | Eviction - with factcheck L-0237 approximated LRU |
| O(1) LFU costs memory (01:46:29) | Eviction - list overhead |
| Single-threaded not blocking (01:47:12) | Concurrency - single thread |
| Consistent hashing question deferred (01:48:06) | Chapter 3 (no content) |
| zmalloc for every allocation incl. Bloom filter (01:48:18) | Single node - zmalloc |
| netcat as a hack (01:49:52) | Protocol - IoT story |
| Redis routing without LB (02:30:42) | Routing - redirect |
| Reads in Redis: Sentinel/proxy (02:31:16) | Routing - redirect (with factcheck L-0324) |
| Mix of routing approaches (02:32:04) | Routing - closing note |
| Nodes too close on the ring (02:32:50) | Consistent hashing - problems box |
| Dense key areas, hot partitions (02:33:06) | Consistent hashing - problems box |
| Virtual nodes doubt (02:34:43) | Consistent hashing - prompt #9 |
| Gaurav's off-topic question deferred (02:38:57) | Taken at 02:57:29 -> concurrency side box |
| malloc returns NULL, not segfault (02:39:19) | Single node - memory cap correction |
| Multiple CDC instances, offset store (02:41:42) | CDC - how it reads |
| Kafka didn't read MySQL; workers did (02:43:25) | CDC - naive pipeline |
| CDC load vs event workers: batching, async workers lack events (02:43:48) | CDC - why CDC wins |
| Growing a set: reallocate and copy (02:48:22) | Single node - storage |
| LFU for asymmetric popularity (02:49:21) | Eviction - LRU vs LFU |
| Delete moved data unless replication factor (02:50:24) | Consistent hashing - operational add |
| Virtual nodes homework (02:51:42) | Consistent hashing - problems box |
| Single thread wastes cores; shards per box; malloc design relies on one thread (02:52:47) | Concurrency - single thread |
| ulimits, malloc limits, SIGABRT (02:54:32) | Single node - memory cap correction (with factcheck L-0359) |
| Shared locks double booking, Percona, deadlocks (02:57:29) | Concurrency side box "from week 2" (with factcheck L-0364) |
| Connection pooling in PHP (03:03:02) | Protocol section side note (persistent connections) |
| One CDC to many sinks; memory use (03:04:33) | CDC - multi-tier fan-out |
| Chat export (03:05:57) | Admin - drop |
| Beginner course vs this course (03:07:19) | Admin - drop |
| One-on-one booking window (03:09:57) | Admin - drop |

### Things a reader-first version should fix (not drop)
- Correct the teacher's heap-exhaustion = segfault claim where it is made (00:43:56), using the students' own Q&A corrections (02:39:19, 02:54:32) and factcheck L-0104, L-0341, L-0359; keep the "must cap memory" conclusion, which stands.
- HTTP/1.1 per-request handshake (01:21:40) -> keep-alive note (factcheck L-0182); the header-overhead point and the IoT story stay.
- Show both sides of the virtual-nodes debate (teacher's operational argument; factcheck L-0332, L-0336).
- DHT examples: mark DNS/internet/Bitcoin/IRC as contested (factcheck L-0305, L-0311).
- Redis specifics: 4+4+24-bit header (L-0139), zmalloc doesn't evict in real Redis (L-0122), sampling threshold ~10% (L-0218), replica write handling (L-0261, L-0326).
- Shared-lock explanation is the teacher's guess; present factcheck L-0364 / L-0365 alongside.
- "Tiered storage" was in the agenda but not taught; say "coming next" rather than implying coverage.
- Admin segments (intro, break, wrap-up, course plug, one-on-ones) are not content; the "Lego blocks" framing (00:00:57) and the teacher's Redis-course mentions can be one-line chips.
- Transcript uncertainties to verify before quoting: "Very weird day" (00:10:45), the name "Jyotinder" (00:47:49), speaker boundaries around 00:46:41 and 02:53:31, "28 bits" vs "24 bits" (01:00:32). See `lectures/lec07/transcript/review_flags.md`.
