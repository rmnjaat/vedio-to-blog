# Teaching Map - Lecture 01 (Week 1, Day 2): Caching levels, Scaling, Delegation, Concurrency, Communication

Source: `transcripts/corrected/lec01/transcript.md` (03:15:09). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **day 2 of week 1**. Day 1 (not in this source) covered connection pooling, "cache = anything that saves expensive computation/IO", the MySQL datetime docs pointer, and the first properties of the Medium design. Today finishes "the other four" properties: scaling, concurrency, delegation, communication (00:00:00), plus caching-at-levels carried over from day 1 (00:05:33).

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:00 | 00:05:33 | 5.5 | Admin: feedback (no transcripts, no post-reads, no intros) | - | "Now we'll move to the actual stuff" |
| 1 | 00:05:33 | 00:06:36 | 1 | Agenda: caching levels -> scaling -> delegation -> concurrency (5-10 min, deep dive next week) -> communication | Roadmap | Straight into caching |
| 2 | 00:06:36 | 00:35:18 | 29 | **Caching at different levels** | **Open problem to class**: "What all places would you cache, what will you cache, and how it would benefit?" Teacher pushes students for *where* (concrete placement) | Recap list of every layer (00:33:49) -> "question every single step" -> defers remaining student hands to open forum |
| 2a | 00:06:36 | 00:17:19 | 11 | API server RAM cache (student-led), inconsistency, sticky sessions, Medium blogs nearly static | Student proposal refined by Socratic "where? disadvantage? why inconsistency? how solve?" | Next student |
| 2b | 00:17:19 | 00:20:47 | 3.5 | Materialized views (student "DB views" -> teacher names it) | Student proposal, teacher elaborates with marks/total example | Calls next student |
| 2c | 00:20:47 | 00:29:06 | 8 | Browser local storage; personalized-recommendation cache (student war story); CDN caching API responses | Student proposals, teacher amplifies; CDN "big misconception" | Student adds disk idea |
| 2d | 00:29:06 | 00:35:18 | 6 | **API server disk as cache**; load balancer / API gateway caching; full layer recap | "This is exactly what I wanted to cover" - teacher's planted punchline delivered via student | "Next part where we'll discuss scaling" |
| 3 | 00:35:18 | 01:05:42 | 30 | **Scaling** | **Definition first** ("ability to handle large number of *concurrent* requests") | Q&A then "Let's move to delegation" |
| 3a | 00:35:57 | 00:40:47 | 5 | Vertical scaling and *why* it has a limit | **Provocation question** ("what's stopping AWS?") + wrong-answer story + SD card analogy | "which is where we don't do vertical scaling" |
| 3b | 00:40:47 | 00:48:35 | 8 | Horizontal scaling, linear amplification, predictive scaling, autoscaling limits, load testing, start-vertical-then-horizontal, bottom-up scaling, cascading failures | Benefit-first ("7th standard mathematics"), Amazon Prime Day scenario | "But there is a catch... what about the database?" -> DB scaling |
| 3c | 00:48:35 | 00:49:26 | 1 | Scaling a database: vertical first | Heuristic: DB is "most critical and most brittle" | "vertical has a limit, so how do you do horizontal?" |
| 3d | 00:49:26 | 00:54:20 | 5 | Read replicas: read/write skew, async pull replication, two connection objects, critical vs non-critical reads (bank balance) | **Data/observation first** (90:10 / 99:1 reads) | "what happens when you get more traffic than that on your master?" |
| 3e | 00:54:20 | 00:57:38 | 3 | Sharding: mutually exclusive subsets, hash(user_id) routing in API server, naive-first | Problem first ("load so huge one node cannot handle") | "Any questions on scaling?" |
| 3f | 00:57:38 | 01:05:42 | 8 | Q&A: master failure/leader election, single connection string (proxy), connection pools per DB, sharding vs copies, vertical sharding, autoscaling = horizontal, who defines scaling rules | Student-driven | "We almost covered everyone" |
| 4 | 01:05:42 | 01:30:58 | 25 | **Delegation** | **War story/principle first** (Hotstar VP talk: "whatever does not need to be done in real time should not be done in real time") then **Medium hook** (total_blogs count) | Kafka essentials close with "Kafka is not salt" warning |
| 4a | 01:08:24 | 01:11:25 | 3 | Core delegation flow: API -> broker -> workers -> DB; protect the DB ("iPhone") | Diagram walk-through on Medium count | "this broker is heart and soul" |
| 4b | 01:11:25 | 01:14:07 | 3 | Message queues: homogeneous consumers, pull, exclusive read, delete after processing | Definition + diagram | "Now let me walk you through what the problem is" |
| 4c | 01:14:07 | 01:21:28 | 7 | Message streams: why (Elasticsearch indexing + counter in one worker -> team fights + partial failure 74/75/76) -> heterogeneous consumers iterate at own pace, retention | **Problem first, failure scenario walked numerically** | "Kafka is backbone... essentials" |
| 4d | 01:21:28 | 01:27:45 | 6 | Kafka topics, partitions, partition key (user_id), consumer groups, ordering within partition only, parallelism = #partitions | Terminology layered on the Medium on_publish topic | "One final thing..." |
| 4e | 01:27:45 | 01:30:58 | 3 | Committing (offset), at-least-once, Kinesis shards = partitions, Kafka not a magic solution | Mechanism + failure (crash before commit) | Q&A |
| 5 | 01:30:58 | 01:37:34 | 6.5 | Q&A delegation: ordering, round robin with fewer consumers, queue vs stream choice (cost: SQS per message vs Kinesis per hour), partition count, batch commit, visibility timeout, delete = success signal, in-memory queue vs infra queue | Student-driven | Break |
| 6 | 01:37:34 | 01:44:56 | 7 | Break (admin) | - | - |
| 7 | 01:44:56 | 01:50:38 | 5.5 | **Concurrency** (deliberately brief) | **Purpose first** ("extract most out of a single machine") -> classic count++ race (2000 vs 1997) | Medium claps (100 -> 102) -> "just a sprinkled taste" |
| 8 | 01:50:38 | 02:23:22 | 33 | **Communication** | **Misconception first** ("folks don't know what REST is") -> RPC as baseline (restaurant analogy) -> alternative paradigms each via a product example | Medium layer-by-layer protocols -> "implement hello world of each" -> Q&A |
| 8a | 01:53:13 | 01:56:22 | 3 | Short polling: AWS console EC2 status, Cricbuzz; cost math (10 s period -> 6M req/min for 1M users) | Familiar UI example first | "what's the other way?" |
| 8b | 01:56:22 | 01:59:25 | 3 | Long polling: server holds until change; you implement the loop | Same EC2 + cricket examples reused | "Then the next one is WebSockets" |
| 8c | 01:59:25 | 02:04:33 | 5 | WebSockets: persistent bi-directional TCP, WS/WSS, parallel to HTTP; chat, stock ticker, Zoom chat, multiplayer, MQTT | **Backward link** to day-1 connection pool | "what if it does not have to be bi-directional?" |
| 8d | 02:04:33 | 02:08:49 | 4 | Server-sent events (not "server-side"): stock ticker, deployment log streaming (Vercel/Netlify), remote terminals; MDN example, Socket.io | Derived by removing a requirement from WebSockets | Medium communication map |
| 8e | 02:08:49 | 02:10:49 | 2 | Medium: user->API HTTP, API->DB persistent TCP, real-time claps via WebSocket; Twitter likes, Instagram Live hearts | Apply to case study | Q&A |
| 8f | 02:10:49 | 02:23:22 | 12.5 | Q&A: socket limits, long-polling holding connections, SSE for claps, server crash, ticker data size (40 KB/s), push notifications (GCM/APNs war story), DB wire protocols/dialects, RESP | Student-driven | Wrap-up |
| 9 | 02:23:22 | 02:25:43 | 2.5 | Wrap-up: next week = databases (SQL demo of transactions/locking Saturday; NoSQL + Slack real-time Sunday) | - | Open Q&A |
| 10 | 02:25:43 | 03:15:09 | 50 | **Open Q&A** (UDP deferred, video streaming deferred, SNS, LB cache invalidation, SNS+SQS, config-platform multi-level cache story, API-gateway-like service, replica load on master + hierarchical replicas, CDN deferred/disk vs RAM, Kafka -> SQS fan-out, sticky LB for WS, Netflix at ISPs, compression/security/clustering, Kinesis = Kafka, commit meaning, streams vs distributed transactions, visibility timeout, browser cache how-to, worker delete order, sharding formula, WS reconnect storm, React Query, SSE close, testing SSE, read-heavy design, SSE strictly unidirectional, proxies/L4 vs L7, SSE in on-prem production, RabbitMQ persistent queues & tool convergence) | Student-driven | End |

Time budget: caching 29 min, scaling 30 (+8 Q&A), delegation 25 (+6.5 Q&A), concurrency 5.5, communication 20 (+12.5 Q&A), open Q&A 50. Roughly **25% of the lecture is Q&A** and much of it carries real content (see section 2 and 4 of this doc) - it must be folded into the topic sections on the site, not left as an appendix.

**Introduction patterns observed** (reusable templates):
- **Crowdsourced exploration** (caching): open question -> student answer -> teacher forces concreteness ("where?") -> asks for downside -> elaborates -> next student. The teacher's planned punchline (disk cache) is held back until a student reaches it.
- **Provocation -> wrong answer -> first principles** (vertical limit).
- **Principle/war story -> case-study hook -> mechanism** (delegation).
- **Problem -> naive fix -> failure walkthrough with numbers -> better tool** (queue -> stream).
- **Familiar product UI -> mechanism -> cost math -> next paradigm by relaxing a constraint** (polling -> long polling -> WebSocket -> SSE).
- **Every section ends by re-anchoring on Medium** (blogs static, blogging read-heavy, total_blogs, on_publish topic, claps).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:06:36 | "What all places would you cache, what will you cache, and how it would benefit?" | S6: caching reduces latency at multiple layers (vague); S6: cache a frequent user's ID | "Where? Give me a concrete example. What you're caching, where, what benefit?" (00:07:26); rejects "just one centralized cache" (00:07:48) | Answered over 30 min via P2-P7 and the layer recap (00:33:49) |
| P2 | 00:08:38-00:09:13 | "Where exactly would this cache be placed? In your architecture, where?" | S3: application-level hash map in main memory | "Now we are talking... main memory of API server" | API server RAM, alongside Redis |
| P3 | 00:09:25 | "So what is the disadvantage of this?" | S3: limited size, lost on crash, different instances -> inconsistency | Accepts | - |
| P4 | 00:10:39 | "Why would there be inconsistency?" | S3: per-instance refresh differs, some users see stale view | Accepts | Local memory not visible to other servers (00:11:54) |
| P5 | 00:11:24 | "How will you solve this?" | S3: centralized Redis shared by both instances | "Because it is a single source of truth... then you cannot have this" - then **reframes**: the point of the local cache is not consistency, it's saving a network hop; works with sticky sessions or nearly static data (Medium blogs) | Multi-level cache; accept staleness where use case allows; TTL essential |
| P6 | 00:16:14 (open turn) | (continuation of P1) | S11: DB views save query execution | Renames to **materialized views**; adds joins, derived columns, refresh via triggers, only for infrequently changing data | Materialized views save expensive joins/computation |
| P7 | 00:20:24 | "Rahul, what would you cache? Where would you cache?" | S4: browser, CDN like Netflix; S4 later: pub/sub invalidation across API servers | Takes browser only ("one, one"); **cuts off** pub/sub idea to avoid confusing beginners - deferred to next week (00:22:12) | Browser local storage (assets, API responses, JWT, offline web workers) |
| P7b | 00:22:41 | (continuation) | S2: personalized recommendations cached in browser with tuned refresh | Generalises: show 10 random of 50 cached, refresh daily - "excellent hack" | - |
| P7c | 00:24:54 | (continuation) | S7: Cloudflare caching whole responses + Prerender.io | Highlights the non-obvious part: **CDN caches API responses, not just images** | CDN is a proxy; bytes are bytes (Giphy popular searches) |
| P7d | 00:28:39 | (continuation) | S2: cache on API server **disk** | "This is exactly what I wanted to cover" | Disk cache saves network IO; LB/API gateway caching added |
| P8 | 00:36:56 | "Why can't you go beyond [4 TB]? What's stopping AWS from giving you that?" | (No live answer; teacher quotes a senior engineer's "AWS doesn't show the option") | "Most weird answer"; SD card 256 vs 512 GB; buses/hardware protocol | Physical hardware interface limits |
| P9 | 00:48:35 | "How do you scale a database?" (rhetorical, answered by teacher) | - | "Not talking about simple stuff... actual implementation" | Vertical -> read replicas -> sharding |
| P10 | 00:54:20 | "What happens when you get more traffic than that on your master?" (rhetorical) | - | - | Shard: mutually exclusive subsets, routing by hash(user_id) |
| P11 | 01:15:32 / 01:16:21 | "You know what happens when you collaborate with other teams?" / "Worker crashed [after count++ before indexing]. Now what would happen?" (rhetorical, walked through) | - | Walks 74 -> 75 (search 74) -> retry -> 76 (search 75) | "Doing two things in one shot is always a problem in distributed systems" -> message streams |
| P12 | 01:26:30 | "What happens when you add fourth and fifth consumer [with 3 partitions]?" (rhetorical) | - | - | They idle; parallelism = #partitions |
| P13 | 01:45:38 | "count++ on two threads 1000 times: why 1997 not 2000?" (rhetorical) | - | "Just a Google search in case you are not from CS" | Not atomic; locks / transactions |
| P14 | 01:49:39 | "Two people clapped at the exact same time... how do you do that?" | - | 100 must become 102 not 101 | DB transactions / atomic operations |
| P15 | 01:53:13 | "Without you refreshing, the interface changed from in progress to ready. How did this happen?" | - | - | Short polling |
| P16 | 02:04:33 | "What if it does not have to be bi-directional?" | - | Corrects "server-side events" -> server-sent | SSE |
| P17 | 02:11:54 | (reverse) "It's exactly like WebSocket... You are having long running connection. What's the difference?" | S7: long polling not scalable because connections block | "It is scalable"; pick by use case; WebSockets expensive, short polling suffers surges | No universal answer; fit use case |
| P18 | 02:13:07 | (student-proposed) SSE for real-time claps instead of WebSocket | S4: optimistic UI + HTTP POST + SSE fan-out | "You can do that" - deferred to Slack design next week | Valid alternative |
| P19 | 02:15:44 | Ticker per-watchlist filtering - "How many companies are listed? 10,000?" | S4 worried about sending per-client subsets | Back-of-envelope: 10,000 x 4 B = 40 KB/s; "I stay away from over complication" | Send all, filter on client |
| P20 | 02:40:10 / 02:40:58 | "What exactly are you caching on CDN?" / "Would you store images in RAM?" | S4: CDN uses RAM then disk then central | Disk/SSD is enough; CDN already close to user | CDN data on disk |
| P21 | 02:55:50 | "See the logic... how would Kafka keep track if two consumers read the same partition?" | S6: does Kinesis avoid the consumer limit? | "Think of implementation" | Fundamental limit; same for Kinesis |
| P22 | 02:57:36 | (student) Does a stream replace distributed transactions? | S8: yes? | "Not really" - streams fit independent processing of one message | Strong consistency across two stores still needs distributed transactions |
| P23 | 03:09:34 | (student) Can a replica take writes? | S8 | That is multi-master: conflicts, use-case specific | Read replicas -> sharding -> multi-master only if forced |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Your API servers already have RAM and a 20 GB disk you barely use. Where else, besides Redis, could you cache Medium's published posts - and what do you give up?"** (P1/P2/P7d, 00:06:36-00:33:49). The lecture's signature "aha"; the teacher deliberately holds the disk answer back. Strong because the intuitive answer (centralized cache) is wrong-ish, and the trade-off (consistency vs a network hop) is the real lesson.
2. **"Why can't you keep doubling the database machine forever? AWS has supercomputers - what actually stops you?"** (P8, 00:36:56). Pre-loaded wrong answer ("there's no option in the dropdown") makes a great reveal; first-principles payoff (hardware buses, SD card).
3. **"A worker increments the blog count, then crashes before indexing in Elasticsearch. It retries. What are the count and the search index now?"** (P11, 01:16:21). Concrete numeric failure (74/75/76); readers can compute it. Motivates streams far better than a definition.
4. **"Two readers clap at the same instant on a post with 100 claps. What could the count end at, and why?"** (P14 + P13, 01:45:38/01:49:39). Tiny, Medium-native, verifiable; bridges to transactions.
5. **"Kafka topic has 3 partitions; you start 5 search consumers. What do consumers 4 and 5 do? Now try to design Kafka so they could help - what breaks?"** (P12 + P21, 01:26:30, 02:55:50). Two-step prompt: predict, then reason from implementation (ordering + offset tracking).
6. **"Which reads in a banking app can go to a replica, and which must hit the master?"** (00:52:33). Forces the reader to own the routing decision; clear answer (profile vs balance) with an emotional hook.
7. **"Polling every 10 s, 1M concurrent users - how many requests per minute? And what if the EC2 instance takes an hour?"** (P15, 01:55:09). Back-of-envelope plus redundancy insight; sets up long polling.
8. **"The server only ever pushes stock prices; the client never sends anything. Do you need a WebSocket?"** (P16, 02:04:33). Derive SSE by removing a requirement - teaches requirement-driven protocol choice.
9. **"Send each user only their watchlist ticks, or all 10,000 prices? Do the math first."** (P19, 02:15:44). Short, punchy anti-over-engineering lesson with arithmetic.
10. **"Can you put a local in-memory cache on each API server if requests from one user can land on any server? What if your load balancer is sticky?"** (P4/P5, 00:10:39-00:14:16). Good follow-up to #1; sticky sessions flip the answer.

Runner-up: "Is CDN only for images?" (P7c, 00:25:32) - better as a misconception callout than a prompt.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains |
|---|---|---|
| 00:37:05 | Smartphone SD card slot rated 256 GB; 512 GB not recognized | Hardware interface limits -> vertical scaling ceiling |
| 00:37:55 | USB stick golden lines = buses; college microprocessor/computer architecture course | Bus/protocol compatibility |
| 01:10:04 | **Database = your new expensive iPhone / pampered child** - put a cover on it | Protect the DB, reduce synchronous load |
| 01:47:47 | **Traffic signal at a road crossing**; centre of the square = critical section | Pessimistic locking / semaphores |
| 01:52:25 | **Ordering a burger at a restaurant**; kitchen does the heavy lifting | Client-server RPC |
| 03:04:19 | Memoization / dynamic programming | "No one wants to do repetitive computation" = caching mindset |
| 01:48:30 | "Entire domain of CS... heavily inspired on how humans behave" | Meta-heuristic for analogies |

### Real-world examples, war stories, numbers
| Time | Example | Point |
|---|---|---|
| 00:01:27-00:02:24 | Teacher's no-post-reads philosophy, serendipity | Self-directed exploration |
| 00:14:16 | Startups use local-memory caching as a hack; LinkedIn/Medium blogs nearly static | Cheap performance wins |
| 00:23:57 | Student: e-commerce recommendation cache in browser, tuned refresh; teacher: Amazon, 50 cached / 10 random shown | Perceived freshness |
| 00:24:54 | Student: Cloudflare caching full responses, Prerender.io | CDN for responses |
| 00:26:21 | Giphy popular search terms on CDN; `search.abc.com/popular` | Near-static API responses on CDN |
| 00:30:38 | "That guy from Goldman Sachs" got the disk-cache idea during a discussion (referenced from earlier) | Disk cache in production |
| 00:37:05 | A senior engineer answered "AWS doesn't give the option" | Anti-example |
| 00:39:10 | Teacher worked in a college data center in 3rd year; professor demo | Credibility / first principles |
| 00:40:47 | 1 machine = 100 rps -> 500 rps needs 5 machines | Linear amplification |
| 00:41:37 | Amazon Prime Day: BI predicts orders -> machines = N / per-machine capacity | Predictive scaling |
| 00:42:35 | Marketing campaign SMS/push spike; autoscaling too slow; coordinate with marketing | Autoscaling limits, team game |
| 00:43:31 | "No magic formula that a 32 GB machine handles 5000 rps" | Load testing |
| 00:47:28 | Teacher reads many outage reports: cascading failures cause most outages | Bottom-up scaling |
| 00:49:26 | Read:write 90:10 or 99:1; blogs, YouTube | Read replicas |
| 00:52:33 | Bank: profile from replica, balance from master ("friend sent money, you freak out") | Critical reads |
| 01:05:42 | 2020 lockdown talk by Hotstar VP Engineering (credit to Akamai for video) | Delegation principle |
| 01:15:32 | Two teams on one worker codebase -> fights, blocked deploys | Organizational motive for streams |
| 01:16:21 | Count 74 -> 75 -> 76 vs search 74 -> 75 | Partial failure + retry |
| 01:33:14 | SQS bills per message; Kinesis bills per running duration | Cost-driven tool choice |
| 01:45:38 | Two threads x 1000 count++ = 1997 not 2000 | Race conditions |
| 01:49:39 | Medium claps 100 -> 102 not 101 | Atomicity |
| 01:53:13 | AWS console EC2 "in progress -> ready" | Short polling |
| 01:54:18 | Cricbuzz / ESPNcricinfo live score | Short/long polling |
| 01:55:09 | 10 s period = 6 req/min/user; 1M users -> 6M req/min; 1-hour EC2 spin-up | Polling cost |
| 01:58:16 | Long poll returns when next ball is bowled | Long polling |
| 02:02:32 | Groww / Robinhood ticker; Zoom chat; multiplayer games; MQTT | WebSocket use cases |
| 02:05:48 | Deployment log streaming (Vercel, Netlify), remote terminals | SSE use cases |
| 02:07:10 | MDN SSE example ~21 lines; Socket.io; "my two-year-old daughter can draw boxes" | Implement it |
| 02:08:49 | Twitter live like counts; Instagram Live hearts | Real-time interactions |
| 02:15:44 | 10,000 tickers x 4 bytes = 40 KB/s | Back-of-envelope over complexity |
| 02:19:02 | 2015 fresher: built push notifications natively on GCM/APNs because SNS delivery was poor, OneSignal new | Push is a different beast |
| 02:16:48 | Calendar app raising its own local notification offline | Mimicking push |
| 02:21:06 | MySQL/Postgres/MongoDB dialects; Redis RESP | Wire protocols over TCP |
| 02:30:34 | Student: config platform, <3 ms budget: S3/CDN snapshot -> disk -> in-memory; fallback-as-main-path | Multi-level caching in prod |
| 02:38:24 | Need 15 replicas, DB allows 5 -> replicas of replicas (5 x 2-3) | Hierarchical replication |
| 02:43:15 | Kafka (3 partitions) -> SQS -> 100 workers; common in notification systems | Fan-out beyond partition limit |
| 02:48:14 | Netflix caching popular shows at ISPs (ACT), Squid Game ISP lawsuit, Cloudflare blog | Caching closer than CDN |
| 03:12:14 | Student: on-prem VMs allow only outbound connections -> client-initiated channel | SSE/WS in production |
| 03:13:31 | MongoDB now ACID; MySQL/Postgres JSON; Hudi transactions; "databases converging" | Avoid generic claims |

### Contrasts / comparisons
- Centralized remote cache vs local API-server RAM vs API-server disk (00:11:54-00:31:41) - axis: consistency vs network hop.
- RAM vs disk vs network latency: "network is pathetically slow compared to local disk read" (00:31:41).
- Vertical vs horizontal; and "it's not either/or - sweet spot" (00:44:49).
- API-server scaling easy (stateless) vs DB scaling hard (00:56:54).
- Replica pulls vs master pushes (00:50:55).
- Read replicas vs sharding vs multi-master (00:54:20, 03:10:01).
- Horizontal vs vertical sharding (01:02:24).
- Message queue (homogeneous, delete) vs message stream (heterogeneous, iterate, retention) (01:17:41); "Queue mein you delete, stream mein you commit" (01:36:25).
- Kafka partitions = Kinesis shards (01:29:24, 02:55:16).
- SQS vs SNS vs Kinesis; SNS+SQS mimics Kafka minus history (02:27:13-02:27:42).
- In-memory queue (connection pool wait queue) vs infrastructure queue (01:37:16).
- REST vs HTTP; RPC as generic (01:50:38).
- Short vs long polling (client load vs server work) (01:58:16).
- WebSocket (bi-directional) vs SSE (uni-directional, lightweight) (02:07:10).
- WebSocket/SSE vs push notifications (GCM/APNs) (02:16:48).
- Optimistic vs pessimistic locking; locks vs lock-free (CRDTs) (01:46:37, 01:49:02).
- At-least-once vs exactly-once (01:28:46).

### Recurring heuristics and catchphrases
| Catchphrase / heuristic | Times |
|---|---|
| "Cache is anything that helps you save an expensive computation or an expensive IO" | 00:29:06, 02:36:00, 03:04:19 |
| "Question every single component... can I cache something here?" / "be extremely curious" | 00:30:38, 00:32:38, 00:34:48 |
| "There is always a trade-off" / "use case specific" | 00:14:16, 00:32:38, 00:33:49, 02:12:15, 02:14:17 |
| "Database is the most critical and most brittle component" / protect it | 00:48:35, 01:10:04 |
| "Whatever does not need to be done in real time should not be done in real time" (Hotstar) | 01:06:28 |
| "Premature optimization is the root of all evil" / "I like to build simple systems" | 00:44:49, 02:16:01 |
| "Know the naive way first, then the fancy proxy layer" | 00:53:36, 00:56:04, 01:00:12 |
| "Implement it / write hello world - without implementation everything is theoretical" | 00:19:24, 02:07:10, 02:10:11, 02:14:17 |
| "Just a Google search away" (offload basics) | 00:19:24, 00:50:19, 01:45:38, 02:51:38 |
| "CS fundamentals go a very long way" / "at the end everything is hardware" / "at the end it's TCP" | 00:39:10, 00:40:26, 02:03:00, 02:11:04 |
| "Not magical solutions" - Kafka "sprinkled like salt", consistent hashing | 01:30:32, 01:36:40 |
| "Own sweet pace/time" (stream consumers) | 01:18:55-01:20:47 |
| "Cost is one factor you should always think about" | 01:33:14 |
| "Load testing is the only way" (unit economics of a machine) | 00:43:31 |
| "Bottom-up scaling" / "cascading failures cause most outages" | 00:46:41, 00:47:28 |
| "No magic number/formula" (sharding, capacity) | 00:43:31, 03:02:18 |
| "Avoid generic statements; tools keep evolving and converging" | 03:13:31 |
| "Next week / we'll go in depth" (scaffolding promise) | throughout, see section 7 |

---

## 4. The Medium case-study thread (proposed spine)

| Time | Medium feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:00:00 | "We'll talk in context of Medium" | Frame | Open the page with Medium's architecture from day 1 (user -> API servers -> DB + Redis) |
| 00:09:25 | Users -> API servers -> DB + centralized Redis diagram | Baseline architecture for caching | The diagram that every later layer is added to |
| 00:14:16 | **Published blogs are nearly static**; staleness acceptable | Local RAM cache on API servers, giving up strong consistency | Strongest Medium hook for caching |
| 00:33:49 | Request route browser -> CDN -> LB -> API (RAM, disk) -> Redis -> DB (materialized views) | Caching at every layer | Make this one interactive layered diagram |
| 00:44:49 | "In the context of Medium": start vertical, then LB + horizontal API servers | Scaling progression | Medium as a startup that grows |
| 00:49:26 | **Blogging is read-heavy** (many readers, few writers) | Read replicas | |
| 00:51:53 | Reading a profile -> replica connection; **creating a blog -> master connection** | Read/write routing in business logic | (Bank example is the non-Medium contrast) |
| 00:55:19 | Shard by user_id, hash routing (implicitly Medium users) | Sharding | Teacher doesn't say "Medium" explicitly here; site can frame it as Medium's users table |
| 01:07:37 | **Show number of essays a user wrote**: `total_blogs` column, count++ on publish (teacher admits it's "manufactured"; a join would work) | Delegation, async worker, protect DB | Be honest: it's a teaching device |
| 01:09:07 | `on_publish` message into SQS/RabbitMQ, worker updates count | Message queue | |
| 01:14:07 | **Also index the blog in Elasticsearch for search** | Message streams, heterogeneous consumers, team decoupling | Partial-failure walk (74/75/76) |
| 01:21:28 | `on_publish` Kafka topic, partition key = user_id -> a user's blogs ordered within a partition | Topics, partitions, ordering, consumer groups | |
| 01:27:45 | Analytics (counter) consumer commits offsets | Commit, at-least-once | Ties back: at-least-once means count++ may repeat -> idempotency worry (implicit, not stated) |
| 01:49:39 | **Two people clap at the same time** (100 -> 102) | Concurrency, transactions/atomic ops | |
| 02:08:49 | Medium communication map: user->API HTTP; API->DB persistent TCP (not WebSocket) | Protocol per hop | |
| 02:08:49 | **Real-time claps animation for co-readers** | WebSockets (and Twitter/Instagram analogues) | |
| 02:13:07 | Student: claps via HTTP POST + optimistic UI + SSE | SSE alternative, deferred to Slack design | Good "your turn" design exercise |

Gaps where Medium is *not* used but could carry the content on the site (without inventing claims - frame as "applied to Medium"): materialized views (e.g., author stats join), browser cache (post assets), CDN API responses (popular/trending posts list, like Giphy), LB caching, vertical limit, bottom-up scaling (campaign/newsletter spike), short/long polling (e.g., status of a post import - would be site's own example; keep teacher's EC2/cricket originals).

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:07:48, 00:29:06 | Cache = one centralized remote cache / cache must be in RAM | Students; general | Cache anywhere you save expensive compute/IO; disk is fine because network is slower |
| 00:11:27 | Local cache inconsistency must be "solved" by centralizing | S3 | Local cache's value is skipping the hop; accept staleness or use sticky sessions |
| 00:25:32 | CDNs only cache static images/videos ("big misconception") | General | CDN is a proxy; bytes are bytes; cache API responses |
| 00:37:05 | Vertical scaling limit = AWS doesn't offer bigger instance | A senior engineer | Hardware bus/interface limits |
| 00:42:35 | Autoscaling groups handle spikes | General | Too slow for sudden spikes; pre-scale with marketing coordination |
| 00:43:31 | Machine capacity can be guessed from specs | General | Load test |
| 00:45:45 | Horizontal scaling = add API servers, done | General | Dependencies (DB, cache, services) must scale first (bottom-up) |
| 00:50:55 | Master pushes writes to replicas | Common phrasing | Replica pulls from master |
| 00:59:59 | "We always use one connection string" -> routing isn't the app's job | S1 | That's an abstraction/proxy; naive way is in the API server |
| 00:58:48 | Leader election always happens in production | S1 | Often cloud does failover; implementing it yourself is rare |
| 01:02:06 | Sharding = three identical copies | S3 | Mutually exclusive subsets |
| 01:31:20 | Consumers coordinate to restore global order | S9 | No global ordering; only per-partition |
| 01:31:37 | A consumer subscribes to one partition only | S9 | Kafka assigns; fewer consumers read round robin |
| 01:33:14 | Streams are strictly more powerful so always use them | Implied | Cost: SQS per message vs Kinesis per hour |
| 01:30:32 | Kafka (and consistent hashing) are magic solutions to sprinkle everywhere | General | Know strengths and weaknesses |
| 01:36:20 | Commit is automatic / not in your code | S2 | You commit, or configure auto/periodic commit |
| 01:37:01 | Connection-pool wait queue = message queue | S8 | In-memory data structure vs infrastructure component |
| 01:50:38 | HTTP endpoints = REST | General | REST is a specification; HTTP is a medium; generic = RPC |
| 02:04:33 | "Server-side events" | General | Server-**sent** events |
| 02:00:17 | WebSocket runs on top of HTTP | Implied | Parallel protocol (WS/WSS) over TCP |
| 02:11:51 | Long polling isn't scalable | S7 | It is; choose per use case |
| 02:16:41 | SSE can implement push notifications | S3 | Can mimic, not implement; GCM/APNs different guarantees |
| 02:20:36 | HTTP connections aren't persistent / app-DB uses WebSockets | S6 | HTTP is TCP you explicitly close; DB uses its own wire dialect |
| 02:41:10 | CDNs keep cached data in RAM | S4 | Disk/SSD; already close to users |
| 02:42:22 | Kafka can't serve workloads needing many workers | S1 | Kafka -> SQS fan-out |
| 02:57:36 | Streams replace distributed transactions | S8 | Only for independent consumers; strong consistency still needs distributed tx |
| 03:07:52 | SSE is bi-directional TCP the client just doesn't use | S10 | Protocol spec disallows client sends (TCP itself could) |
| 03:09:34 | Replicas can take writes | S8 | That's multi-master with conflicts |
| 03:13:31 | Tool categories are fixed (e.g., NoSQL has no ACID, RabbitMQ is only a queue) | S3 | Tools evolve and converge |
| 03:13:04 | (Teacher self-hedge) Kafka "broadcast" feature | S1 at 02:44:38 | Teacher unsure, "made a note" - flag as unverified |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Day 1 of this course: Medium base architecture, connection pooling, "cache = save expensive compute/IO", centralized cache (Redis).
- Basic client-server/HTTP request-response, TCP 3-way handshake (01:55:09), TCP connections being stateful (01:01:31).
- SQL joins, tables, DB triggers (named, not taught), DB connection strings/objects (00:51:53).
- Cloud basics: EC2/GCP VM, AWS console, load balancer (as a box), autoscaling groups.
- CS fundamentals: buses (college microprocessor), threads/processes, atomicity ("Google it if not CS", 01:45:38), hashing, round robin.
- Sticky sessions (used, not explained, 00:12:40).
- Elasticsearch (as a search index), JWT, web workers.

### Concept graph (A -> B means B builds on A)
```
Day-1 cache definition (save expensive compute/IO)
  -> API-server RAM cache -> [consistency trade-off] -> sticky sessions / nearly-static data (Medium blogs)
  -> API-server disk cache (needs: RAM vs disk vs network latency ordering)
  -> materialized views (needs: joins, triggers)
  -> browser cache, CDN response cache, LB/API gateway cache
  => "cache at every layer of the request route" (layer map)

Scaling definition (concurrent requests)
  -> vertical scaling -> hardware limit (buses)
  -> horizontal scaling -> linear amplification -> unit economics -> load testing -> predictive scaling
       -> autoscaling limits (spikes) -> org coordination
  -> start vertical, then horizontal (premature optimization)
  -> horizontal API servers need stateless servers + LB
  -> dependencies must scale first (bottom-up) <- cascading failures
  -> DB scaling: vertical -> read replicas (needs read:write skew, async replication, two connection objects; day-1 connection pool)
                          -> critical vs non-critical reads (staleness again; links to cache trade-off)
                          -> replica load on master -> hierarchical replicas (Q&A)
                          -> sharding (needs hashing, routing in API server, connection pool per DB)
                          -> multi-master (Q&A; conflicts)
                          -> failover / leader election (deferred)

Delegation principle (Hotstar) + "protect the DB" (from DB-is-brittle heuristic)
  -> broker + workers (async, eventual update of total_blogs)
  -> message queue (homogeneous, pull, delete, visibility timeout)
  -> problem: one worker doing two writes -> partial failure + retry double count (needs: retry, consistency)
  -> message stream (heterogeneous consumers, retention, own pace)
       -> Kafka topic -> partitions + partition key (hashing again, like sharding) -> ordering per partition
       -> consumer group -> parallelism = #partitions -> Kafka->SQS fan-out (Q&A)
       -> commit/offset -> at-least-once
       -> Kinesis = same model; SNS = broadcast; SNS+SQS ~ Kafka minus history
  -> queue vs stream choice by cost
  -> streams vs distributed transactions (Q&A)

Concurrency: threads/processes -> race (count++) -> correctness vs throughput -> locks (pessimistic/optimistic, mutex/semaphore) / lock-free (CRDT)
  -> DB transactions/atomic ops (Medium claps) [deep dive next week]
  (links back: at-least-once delivery + concurrent count++ are both correctness problems on the same counter)

Communication: RPC/HTTP baseline (REST vs HTTP)
  -> short polling (cost math) -> long polling (server holds, you implement loop)
  -> WebSocket (needs day-1 connection pool idea: persistent TCP; bidirectional) -> sticky LB (Q&A)
  -> SSE (WebSocket minus client->server)
  -> push notifications are different (Q&A)
  -> per-hop protocol map on Medium (HTTP, persistent TCP + DB dialect/RESP, WebSocket for claps)
```

Cross-links worth surfacing on the site:
- **Hashing by user_id** appears in sharding (00:55:19) and Kafka partition key (01:23:00) - same idea twice.
- **Staleness is acceptable** recurs: local caches (00:14:16), replicas (00:52:33), async count (01:10:04), LB cache TTL-only invalidation (02:28:21), Netflix ISP (02:49:08).
- **Persistent TCP** recurs: connection pool (day 1), DB connections, WebSockets, long polling, SSE.
- **Protect the DB** links caching, replicas, delegation.
- **Pull not push**: replicas pull (00:50:55), queue consumers pull (01:12:04), Kafka consumers iterate.
- **Naive first, proxy later**: replicas, sharding, connection strings.

---

## 7. Forward / backward references

### Backward (to day 1 / earlier)
| Time | Reference |
|---|---|
| 00:01:27 | "Three pointers I discussed yesterday" (new this cohort) |
| 00:02:24 | Reading MySQL datetime implementation docs (yesterday) |
| 00:05:33 | Agenda "as we discussed yesterday" |
| 00:07:48 | "That's what we discussed yesterday - where are you caching?" |
| 00:29:06 | "What I said yesterday: don't just think of cache as something in memory" |
| 00:30:38 | "That guy from Goldman Sachs" disk-cache story (told earlier/previous cohort) |
| 00:35:18 | "As I said yesterday, we'll talk about databases part" |
| 01:37:01 | Connection pooling max connections (yesterday) |
| 01:59:25 | WebSockets "very similar to what we talked about yesterday as connection pool" |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:05:33, 01:44:56 | Concurrency in depth, how DB concurrency falls apart | Week 2 day 1 |
| 00:22:12 | Pub/sub-based cache invalidation across API servers | "Next week" |
| 00:25:32, 02:39:28 | CDN in depth | Weeks 3-5 ("third week" at 02:39) |
| 00:44:49 | Designing a load balancer | Week 3 |
| 00:53:36 | Intermediate DB proxy layer for replicas | Week 5 or 6 |
| 00:56:04 | Sharding proxy layers | Week 5 |
| 00:56:54 | DB transactions/concurrency | Next week |
| 00:59:21-00:59:55 | Leader election ("at three different places") | Next to next week |
| 01:03:15 | Fault tolerance of databases, no-outage restructure | Week 5 |
| 01:30:02-01:30:32 | Where Kafka "fails miserably" | "Week ..." (cut off, unspecified) |
| 01:46:37 | Optimistic/pessimistic locking | Weeks 3-6 |
| 01:49:02 | CRDTs - mentioned, explicitly not covered | - |
| 01:49:39 | Transactions in depth | Next week; weeks 3, 6, 7 |
| 02:01:30 | Scaling WebSockets, Slack real-time | Next week Sunday |
| 02:13:01-02:13:48 | Real-time claps architecture / SSE alternative | Slack session next week |
| 02:21:42 | HTTP specification, when not to use it | Week 3 |
| 02:23:22 | SQL demo of transactions/locking (Sat), NoSQL + Slack + 3 messaging apps (Sun) | Next week |
| 02:25:58 | UDP | Week 4 |
| 02:26:36 | Video streaming ("it's all CDN") | Week 6 |
| 02:47:08 | How Kafka manages large retained data | Week 6 |
| 03:07:33 | Caching strategies | "To some extent", later |
| 02:50:35 | Security - out of scope | Not covered |

Site handling: keep these as "coming in a later lesson" chips (with week number) rather than dropping them; the deferrals themselves tell readers what the boundary of this lesson is.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers should be redistributed into the topic they belong to (mapping below the options).

### Option A - "Grow Medium" narrative spine (RECOMMENDED)
Order follows the life of a Medium request and the company's growth:
1. **Setup**: Medium baseline architecture (from day 1) + the four properties + this lesson's scope/deferrals.
2. **Readers flood in - make reads cheap (Caching)**: prompt #1 -> layer-by-layer walk *along the request route*: browser -> CDN (API responses, Giphy) -> LB/API gateway (TTL-only invalidation) -> API RAM (sticky sessions, static blogs) -> API disk -> Redis -> materialized views. Close with Netflix-at-ISPs and the config-platform story as "how far this goes"; React Query; memoization.
3. **More readers than one box (Scaling)**: prompt #2 vertical limit -> horizontal + linear amplification + load testing + spikes -> bottom-up + cascading failures -> DB: read replicas (blogging read-heavy; bank prompt #6; hierarchical replicas) -> sharding (user_id) -> multi-master/clustering/failover as "boundaries".
4. **Publishing does too much (Delegation)**: Hotstar principle -> total_blogs async -> queue -> Elasticsearch failure prompt #3 -> streams -> Kafka topic/partition/consumer groups prompt #5 -> commit -> queue vs stream decision (cost) -> Kafka->SQS fan-out, SNS.
5. **Two claps at once (Concurrency)**: prompt #4 -> count++ race -> locks (traffic signal) -> transactions; link back to at-least-once double count.
6. **Show claps live (Communication)**: RPC baseline + REST myth -> short polling (#7) -> long polling -> WebSocket (link to connection pool) -> SSE (#8) -> push notifications -> Medium per-hop protocol map + student's SSE claps design + ticker math (#9).
7. **Recap**: heuristics card (cache = save expensive IO; protect the DB; not real-time -> not in request; naive first; implement hello world) + "next lessons" chips.

Pros: uses the teacher's own spine (Medium) and preserves his order (it's already story-ordered); each section opens with a Medium problem, matching his best intros; concurrency sits right after the counter it breaks. Cons: some Medium links are thin (polling, vertical limit) - need clearly-labelled "outside Medium" sidebars; long page - needs strong section nav.

### Option B - "Problem-first trade-off ladder"
Organize by the trade-off being made rather than by topic: (1) Latency vs consistency (all caching, replicas, async count, LB TTL, Netflix ISPs), (2) Capacity vs complexity (vertical/horizontal, sharding, multi-master, Kafka partitions, Kafka->SQS), (3) Correctness under concurrency and failure (count++, claps, partial failure, at-least-once, visibility timeout, distributed transactions), (4) Freshness vs cost of communication (polling -> WS -> SSE, push, ticker math, queue vs stream cost).
Pros: surfaces the teacher's real meta-lesson ("there is always a trade-off", "use case specific"); strong cross-linking (staleness theme, pull-not-push). Cons: splits concepts (replicas appear in two sections; Kafka in two); harder for a first-time reader who wants "what is a message stream"; drifts from the lecture's structure, making provenance checks harder.

### Option C - "Request lifecycle / layer map"
One big interactive diagram of the Medium system (client -> CDN -> LB -> API servers -> broker -> workers -> cache/DB/Elasticsearch). Each layer is a chapter containing everything taught about it: Client (browser cache, polling, WS, SSE, push), Edge (CDN, ISP caching), LB (caching, sticky for WS, L4/L7), API servers (RAM/disk cache, horizontal scaling, autoscaling, routing to replicas/shards, connection pools), Broker (queue vs stream, Kafka), Workers (delegation, commit, visibility timeout), Data (materialized views, replicas, sharding, transactions, dialects/RESP).
Pros: excellent as reference/revision; the teacher's own "question every single component" heuristic becomes the navigation. Cons: loses the motivating problem narrative (why streams exist gets buried under "Broker"); concepts like scaling and concurrency are cross-cutting and get fragmented; weaker for first read.

**Recommendation**: Option A for the main page, with Option C's layer map as a recap/navigation widget at the end (and at the caching section, where the teacher himself walks the request route), and Option B's trade-off themes as small recurring callouts ("Trade-off: staleness") linking similar decisions.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| Leader election / failover (00:57:38) | Scaling - replicas, "what if master dies" box |
| Single connection string = proxy (00:59:59) | Read replicas |
| Connection pools per DB (01:00:36, 01:01:13) | Read replicas / sharding |
| Sharding vs copies; vertical sharding (01:02:06) | Sharding |
| Oracle RAC / no-outage clusters (01:02:52), DB clustering = sharding (02:52:20) | Sharding "boundaries" |
| Autoscaling = horizontal; who defines rules (01:03:42, 01:04:06) | Horizontal scaling |
| Ordering, round robin, N partitions = N consumers (01:31:03-01:32:40) | Kafka partitions |
| Queue vs stream: one operation -> queue; cost (01:33:04) | Queue vs stream decision |
| Partition count (01:33:53), batch commit (01:34:13) | Kafka |
| Queue = one consumer group (01:34:32) | Queue vs stream |
| Visibility timeout, delete = success, delete after processing (01:35:16, 02:58:28, 03:01:31) | Message queue |
| In-memory vs infra queue (01:37:01) | Message queue sidebar |
| Socket limits = TCP/ports (02:10:55) | WebSockets |
| Long polling holds connection (02:11:27), server crash (02:14:01) | Long polling |
| SSE for claps (02:13:07) | Medium communication map exercise |
| Ticker 40 KB/s (02:15:10) | WebSockets/SSE |
| SSE behind LB (02:16:26), WS sticky LB (02:46:02), proxies L4/L7 (03:08:40, 03:10:25) | Communication - "behind a load balancer" box |
| Push notifications + GCM story (02:16:41-02:19:02) | Communication - "not the same as push" |
| DB dialects, RESP, HTTP persistent-but-closed (02:20:36) | Medium per-hop protocol map |
| UDP, video streaming (02:25:43, 02:26:27) | Forward-reference chips |
| SNS; SNS+SQS (02:27:03-02:27:55) | Queue vs stream |
| LB cache invalidation TTL-only (02:27:58) | Caching - LB layer |
| SQS->Kinesis re-architecture for ordering (02:28:48) | Kafka partitions (real-world story) |
| Config platform multi-level cache + fallback anti-pattern (02:30:34) | Caching - closing case |
| Intermediate service = API-gateway-like cache (02:35:25) | Caching - LB/API gateway layer |
| Replica load on master; hierarchical replicas; -> sharding (02:37:13) | Read replicas |
| CDN RAM vs disk (02:39:02) | Caching - CDN layer |
| Kafka->SQS fan-out; Kafka broadcast (unverified) (02:42:22) | Kafka parallelism |
| Kafka large retention (02:46:53) | Forward chip |
| Netflix at ISPs (02:47:35) | Caching - closing |
| Compression, security out of scope (02:50:12) | Scope note |
| Kinesis = Kafka; why 2 consumers can't share a partition (02:54:04) | Kafka partitions (prompt #5 part 2) |
| Commit meaning (02:56:31); streams vs distributed transactions (02:57:36) | Kafka commit; message streams |
| Browser cache how-to, DevTools storage (02:59:50) | Caching - browser |
| Sharding formula: none, access patterns (03:01:58) | Sharding |
| WS reconnect storm (03:02:42) | WebSockets |
| React Query, memoization (03:03:52) | Caching - browser |
| SSE close (03:04:44), testing SSE (03:05:22), SSE strictly unidirectional (03:07:52) | SSE |
| Read-heavy API: only replicas (03:06:22) | Read replicas |
| Multi-master (03:09:07) | Sharding boundaries |
| On-prem outbound-only channels (03:11:38) | SSE/WS real-world |
| RabbitMQ persistent queues; tools converge (03:13:04) | Queue vs stream - closing caveat |

### Things a reader-first version should fix (not drop)
- Admin segments (feedback, Hotmail, break) are not lecture content; the no-post-reads philosophy (00:01:27-00:02:24) can become a one-line "how to use this page: go explore" note.
- Teacher's deferral of student's pub/sub cache-invalidation idea (00:22:12) - keep as a "coming later" chip with the idea stated.
- Transcript uncertainties to verify before publishing claims: Kafka "broadcast" feature (teacher unsure), "Slice" at 02:05:48, the cut-off "Kafka fails miserably in week ..." (01:30:02), the "Correct." duplicates. See `transcripts/corrected/lec01/review_flags.md`.
