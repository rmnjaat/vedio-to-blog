# Lecture 2 (lec01) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 109 questions from `story/page_text.md` alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed.

## Score

| | count |
|---|---|
| correct | **82** |
| partial | 11 |
| wrong | 4 |
| missing (NOT ON PAGE) | 12 |
| **total** | 109 |

- Strict: **82 / 109 (75.2%)**
- Half credit for partials: **87.5 / 109 (80.3%)**
- The old long version scored 104/109 correct (95.4%), or 106/109 (97.2%) with half credit (`qa/exam_grade.md`).

Causes of the 27 non-correct answers: CUT-OK 18, CUT-LOSS 6, PAGE-ERROR 0, READER-MISS 3 (the page covers it; the blind reader got it wrong).

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q002 | Why only 5-10 min on concurrency? | missing | CUT-OK | Admin/agenda. Ch6 §6.4 already hands locks on to Lecture 3. |
| Q011 | What can be cached in browser storage? | partial | CUT-OK | Images, assets and API responses are there. JWT and web workers were dropped; the JWT-in-localStorage idea is a security anti-pattern anyway. |
| Q012 | Student's recommendations hack, teacher's 50-show-10 extension | missing | CUT-OK | Student Q&A. Optional for §1.4: "Keep 50 recommendations, show 10 at random; a daily refresh feels fresh." (L-0049) |
| Q019 | The six board caching places, in order | partial | CUT-OK | A board list. §1.6 gives every stop in route order, which is what a learner needs. |
| Q023 | What is linear amplification? Worked example | wrong | READER-MISS | §2.2 has "it scales linearly" and the 100 rps / 500 rps / five servers example. The reader confused the term with load passed to the DB. Optional: name the term in §2.2. |
| Q026 | "Good scaling plan" curve; "No pre-mature optimizations" | wrong | READER-MISS | §2.2's last paragraph says it: a young product scales vertically and moves to horizontal when it has to. The reader matched the question to Fig 2·b instead. |
| Q035 | The three sub-diagrams of "Scaling DB" | partial | CUT-OK | Board drawing. The three moves (bigger machine, replicas, shards) are in §2.4. |
| Q036 | Master fails: leader election? | partial | CUT-OK | Go deeper in §2.4 gives the fact-checked version (RDS manual promotion, Aurora automatic). The "you rarely build it yourself" framing is a Q&A tangent. |
| Q055 | Kafka warning: not magic to sprinkle everywhere | wrong | READER-MISS | §3.5: "it isn't salt to sprinkle on every system". The question's mention of consistent hashing led the reader away. |
| Q060 | Is the connection-pool wait list a queue? | missing | CUT-OK | Q&A misconception (in-process data structure vs infrastructure broker). |
| Q075 | MQTT; persistent connection must be TCP | partial | CUT-OK | §6.2 has "a reliable stream, usually TCP; HTTP/3 over QUIC is the exception", which is more accurate than the original. MQTT was a passing mention. |
| Q076 | SSE naming: server-sent, not server-side | partial | CUT-OK | The page uses the right name throughout; the correction itself isn't needed. |
| Q084 | When the course covers UDP and video streaming | missing | CUT-OK | Course admin. |
| Q087 | Why a team moved from SQS to Kinesis | missing | CUT-LOSS | Ch3 §3.6, after "in the order published": "That order is a reason to pick a stream even for one kind of job: a standard SQS queue can hand two messages about the same story to two workers at once, while a partition key sends all of one author's events to one consumer, in order, which can then cache and batch them." (L-0310, L-0312) |
| Q089 | Fan-out middle service: caching? like what? | missing | CUT-OK | Student Q&A. The cache definition in §1.1 answers half of it. |
| Q090 | Replicas' cost to master; typical count; reaching 15 | partial | CUT-LOSS | Ch2 §2.4 Go deeper, after "you don't hang dozens off one master": "In practice a master feeds about five; to reach 15, build a tree, say five replicas that each feed two." (L-0326, L-0329) |
| Q092 | Do CDNs cache in RAM or on disk? | missing | CUT-OK | The teacher hedged ("hasn't worked at a CDN"). Q&A tangent. |
| Q094 | Load balancer in front of WebSockets; LB goes down | partial | CUT-OK | Go deeper in §5.5 covers the upgrade and correctly says plain WebSockets don't need sticky sessions. "If the LB dies, the client reconnects" follows from §5.4. |
| Q096 | Compression and security in the course | missing | CUT-OK | Course admin. |
| Q097 | Is a DB "cluster" vertical or horizontal; who shards? | missing | CUT-LOSS | Ch2 §2.4, after the API-server routing sentence: "A managed database cluster is horizontal scaling: it looks like one database but shards across its machines for you. With a database that doesn't shard natively, the routing above is yours to write." (L-0356, L-0357) |
| Q098 | Kinesis same limit? Why can't two consumers share a partition? | partial | CUT-LOSS | Ch3 §3.6, after "Parallelism equals the number of partitions": "Why not let two consumers share one? Kafka would have to track which consumer took which message and could no longer keep the partition in order, so a classic consumer group gives each partition one owner." (L-0361; "classic" because Kafka 4's share groups relax this) |
| Q100 | How browser caching works; how to see it | partial | CUT-LOSS | Ch1 §1.4, end: "To see it, open DevTools: the Network tab marks responses served from the browser's cache, and the Application (Chrome) or Storage (Firefox) panel shows what a site keeps in localStorage." (L-0369, L-0371) |
| Q102 | Server with many sockets crashes: is the reconnect storm big? | partial | CUT-OK | Deliberate fact-check change: the teacher said "nothing much", while §5.4 says reconnect storms are expensive and need randomised back-off. The page's version is the safer lesson. |
| Q103 | When is the SSE TCP connection closed? | missing | CUT-OK | Q&A detail ("when the client is done, or the server dies"). |
| Q107 | L4 vs L7 LB for WebSocket/SSE | missing | CUT-OK | Q&A tangent with no firm answer. |
| Q108 | SSE in production | wrong | CUT-OK | The teacher's opinion ("few use it; most pick WebSockets") was replaced by §5.5's "a common, valid pattern" (LLM streaming makes that true now). Optional clause in §5.5: "many teams still default to a WebSocket in case they later need two-way" (L-0394). |
| Q109 | RabbitMQ persistent queues as a stream; general advice | missing | CUT-LOSS | Ch3 §3.5, after "it isn't salt to sprinkle on every system": "Labels blur over time: RabbitMQ is mostly a queue but now has persistent streams too, so check what a tool does today rather than repeating 'X can't do Y'." (L-0395, L-0396) |

## What was lost

- **Mostly Q&A and admin residue (18 CUT-OK).** These are course admin (the agenda reason, UDP/video weeks, security), board drawings and lists (the six places, the Scaling DB sketch), student tangents (recommendations hack, fan-out service, CDN RAM vs disk, L4 vs L7, SSE close) and three places where the fact-check knowingly replaced the teacher's claim (reconnect storms, SSE adoption, "persistent must be TCP"). A learner doesn't need any of them.
- **Real but small conceptual gaps (6 CUT-LOSS), all in the late Q&A that the story rewrite dropped:**
  - Ordering per key as a reason to pick a stream over a queue (Q087). This is the most useful one; it was the student's real migration story.
  - Why a partition has one consumer per group (Q098).
  - Managed DB clusters shard for you, otherwise you route yourself (Q097).
  - About five replicas per master, then a tree (Q090).
  - Check what a tool does today instead of trusting its category (Q109). This is the same convergence point that lec04's exam flagged.
  - A DevTools pointer to see browser caching (Q100).
- **No page errors among the graded answers.** Two small inconsistencies turned up while reading. Neither cost a question, but both are worth a look:
  - Fig 2·a's caption and the §6.3 recap list the load balancer as a cache stop, while §1.5 says a plain load balancer (ALB) "only routes and caches nothing" (the reverse proxy or gateway caches).
  - §6.1 says "Every one of those notifications took this path", but §2 says the campaign was a push *and an SMS*, and SMS doesn't go through FCM/APNs.
- **Three READER-MISS** (Q023, Q026, Q055): the page has the content, but it doesn't use the teacher's names for it ("linear amplification", "no premature optimization"), so a reader working from the question's wording missed it. Naming the term once in §2.2 would close Q023 and Q026.

Net: one sentence each in §1.4, §2.4 (×2), §3.5 and §3.6 (×2) would recover the six CUT-LOSS items. That would lift the strict score to about 88/109 (80.7%) and the half-credit score to about 92/109 (84.4%). The rest of the gap to the old 104/109 is deliberate cutting of Q&A and admin.
