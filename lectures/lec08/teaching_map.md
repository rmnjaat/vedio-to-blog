# Teaching Map - Lecture 08 (Week 3, Day 1): Approaching distributed systems, Load balancer design, Remote and distributed locks

Source: `lectures/lec08/transcript/transcript.md` (03:36:34). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **day 1 of week 3** ("It's all about distributed systems this time", 00:00:02). It leans on week 2: database locking taught through the **airline check-in system** (00:02:34, 02:05:42), **Slack real-time communication** with a real-time Pub/Sub for membership changes (01:27:17, 01:28:39), the **online/offline indicator** heartbeats (01:19:05, 03:15:09, 03:31:46), SSE from "last week" (03:14:10), and week 1's connection pooling (00:26:17). No teaching map exists for the previous lecture, so backward references are taken from the transcript only. Unlike lecture 1, there is **no single product case study**: the spine is a *build-it-yourself* thread - a load balancer the class designs from one TCP proxy up to a full control plane (D-03 -> D-04 -> D-06), then a hypothetical "stupid" remote queue that motivates locks (D-08 -> D-09 -> D-10).

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:02 | 00:04:15 | 4 | Admin: agenda - how to approach distributed systems -> load balancer (design + ~10 lines of source) -> break -> remote and distributed locks; tomorrow distributed ID generators | Roadmap + framing ("most neglected subject... distributed systems are everywhere") | "But before that, just a couple of feedbacks" |
| 1 | 00:04:15 | 00:09:03 | 5 | Admin: feedback - pre-reads by email not Discord; focus in long sessions (pen and paper, phone in another room); why sessions are not split | - | "Now let's go to distributed systems. Most neglected subject, most important in real world" |
| 2 | 00:09:03 | 00:17:53 | 9 | **How to approach distributed systems** | **Misuse-of-term first** ("one of the most misused term in the age of social media") -> definition -> professor's love/hate quote | "Now let's talk about load balancer" |
| 2a | 00:09:03 | 00:12:34 | 3.5 | Definition (abstract out the distributedness; one coherent system to a contextual outsider), Facebook.com example, love/hate, Murphy's law, "assume anything and everything would go wrong" (L-0022, L-0026, L-0029) | Professor quote, Murphy's law | "How should we approach?" |
| 2b | 00:12:34 | 00:14:37 | 2 | **Day zero architecture**: one machine, one server, one DB, one cache -> scale each component independently -> load -> rectify -> repeat; microscope analogy (L-0030, L-0031, L-0034) | Personal heuristic ("take it with a pinch of salt") | "One key reason why you should be building distributed systems" |
| 2c | 00:14:37 | 00:17:53 | 3 | Horizontal scalability across every layer; non-scalable layer = SPOF; unit economics and linear amplification; cutting corners on the DB is fine if it holds the load (L-0037-L-0044) | Myth-busting ("people think they have distributed system... they don't") | "We'll talk about... when we discuss load balancer" |
| 3 | 00:17:53 | 00:40:20 | 22.5 | **Load balancer and load balancing algorithms** | **Black-box provocation** ("one rectangle box... we assume it magically works") + Flipkart had to build its own | "Now let's move to designing load balancer" |
| 3a | 00:17:53 | 00:19:52 | 2 | Why build our own LB; Flipkart on-prem story (L-0046-L-0048); D-01 | Provocation + war story | "On what basis would this load balancer decide...?" |
| 3b | 00:19:52 | 00:23:02 | 3 | Single point of entry; round robin; when to use (uniform infra + uniform load pattern) (L-0050-L-0058); D-02 | Rhetorical question (P1) | "There is another scheme to that" |
| 3c | 00:23:02 | 00:26:01 | 3 | Weighted round robin: 4/8/4 GB machines, 80% vs 40%, 1:2:1; reserved-instances blunder; "it's always about money" (L-0059-L-0068) | Number-first example + war story | "a really interesting one that a lot of people take for granted" |
| 3d | 00:26:01 | 00:33:24 | 7 | **Least connections**: open connection = busy server; high-variance workload (analytics: 1 s vs 1 h); RR piles long requests on one box; why not CPU-aware routing (microseconds) (L-0070-L-0082) | Connection-pool analogy, then walkthrough with request numbers (D-02 counts) | "Any questions up until this stage? I'll take three" |
| 3e | 00:33:24 | 00:40:20 | 7 | Q&A: persistent connections / least *active*; hour-long requests over raw TCP, keep-alive, gRPC; fifth request on busy server -> local optimization, data warehouses; closed browser + resubmit; cancelling jobs (Redshift/BigQuery) | Student-driven | "Now let's move to designing load balancer" |
| 4 | 00:40:20 | 00:57:23 | 17 | **Designing a load balancer - low level** | **Joy-of-building war story** (first LB in Go, March 2021, at the in-laws', 5-6x faster than Nginx "breakthrough" that wasn't) + **deliberate flip**: low level before high level this cohort | "Let me show you code very briefly" |
| 4a | 00:40:20 | 00:43:08 | 3 | War story; "implement everything"; low-level-first plan; requirements page (S12: balance load, tunable algorithm, scaling beyond one machine) (L-0095-L-0099) | Story | "terminology I would want to fix" |
| 4b | 00:43:08 | 00:44:00 | 1 | LB server vs backend server (L-0100, L-0101) | Definition | "let me just take you folks from 0 to 0.5" |
| 4c | 00:44:00 | 00:57:23 | 13 | One LB server (10.0.0.1:9000), three backends (10.0.0.7-9:8081), backend list; client TCP1 -> LB -> TCP2 to backend; source->target map in a hash table; read one socket, write the other; protocol-agnostic; 2X connections; run it all on localhost with three ports (L-0102-L-0125); D-03 | **Day zero again** ("Assume just single machine... Think simple") + first-principles narration ("this is exactly how I thought of building") | "this is low level implementation detail of a load balancer" |
| 5 | 00:57:23 | 01:08:17 | 11 | **Load balancer code walkthrough** (lb.go) | Live code (GitHub outage mid-demo) | "Now that you know the low level details... high level part" |
| 5a | 00:57:23 | 01:04:23 | 7 | lb.go: listen 9090, 4 Flask backends, `listener.Accept` loop, `proxy()`, `strategy.GetNextBackend`, dial, two `copy` calls in goroutines (blocking), round robin = index+1 mod n, static, hashed/consistent hashing (L-0126-L-0135) | Code read-along mapped onto D-03 | "Any questions on this? I'll take three" |
| 5b | 01:04:23 | 01:08:17 | 4 | Q&A: connection counts on disconnect; LB->API is not REST, raw TCP; copy until EOF; CDN buildable in an hour; **building vs scaling** (L-0137-L-0144) | Student-driven | Brainstorm |
| 6 | 01:08:17 | 01:40:27 | 32 | **Load balancer design brainstorm** (config, monitoring, availability, extensibility) | **Bottleneck math first**: 10,000-connection limit -> only 5,000 clients (L-0145), then four brainstorm factors (L-0146) | "The only thing that is remaining... two LB servers. Client has IP address of one" |
| 6a | 01:08:17 | 01:09:53 | 1.5 | Why one LB machine is a bottleneck; the four factors | Number first | "How would you store the configuration?" |
| 6b | 01:09:53 | 01:14:01 | 4 | Store config: backends (IP:port) + algorithm; DB per request = 3-5 ms too slow; in-memory copy pulled at start; out-of-sync problem (L-0147-L-0155) | **Socratic chain with S6** (P7-P9) | "You're killing it today" -> orchestrator |
| 6c | 01:14:01 | 01:19:52 | 6 | **Orchestrator** + health checks: what "up" means; /health endpoint in config; VM up but process crashed (divide by zero, NPE); orchestrator updates DB (L-0156-L-0165) | Names the student's idea ("fancy word... orchestrator") | "And now comes the problem" |
| 6d | 01:19:52 | 01:23:06 | 3 | How does the DB change reach the LB's in-memory map? Polling every 10 s -> 9 s stale window -> error-rate spike (L-0166-L-0170) | P11 to S7; timeline drawn (D-04 `poll`/`10sec`) | "So what's the solution?" |
| 6e | 01:23:06 | 01:27:17 | 4 | Push: meta/admin port 9091 called by whoever changes config; LB console as a second source of changes; "no one right answer" (L-0171-L-0175) | S4's proposal, refined (P12) | "I'll give other way to do it" |
| 6f | 01:27:17 | 01:30:20 | 3 | Reactive push via real-time Pub/Sub (Redis) fed by orchestrator, console or **CDC** (sneak peek); "make things reactive rather than polling" (L-0176-L-0182) | **Backward link** to Slack design | "let's touch upon a critical point" |
| 6g | 01:30:20 | 01:36:19 | 6 | Orchestrator watches LB servers too; scale LB servers on vitals; needs history not a snapshot; time series is not key-value config; "why re-implement" (L-0183-L-0196) | P13: long multi-student round | "No, don't go into alarm" |
| 6h | 01:36:19 | 01:40:27 | 4 | Central metrics store: telemetry agents on every VM -> **Prometheus** -> orchestrator queries; same idea as AWS autoscaling groups; recap of the build so far (L-0197-L-0203) | Teacher resolves + meta-comment ("how this discussion transpired is very interesting") | "The only thing that is remaining to discuss" |
| 7 | 01:40:27 | 01:59:39 | 19 | **Client reaching multiple LB servers - DNS and CoreDNS** | **Open problem** (P14) to S8 | Break |
| 7a | 01:40:27 | 01:50:52 | 10.5 | IP fixed to a machine -> domain name abstracts many IPs; payments.lb.google.com; **private DNS** (CoreDNS, every machine's resolver); DNS picks with RR/WRR; DNS is **not a proxy** - returns IP, client caches, connects; orchestrator updates DNS (L-0204-L-0221) | Socratic correction of S8 (public vs private; "isn't DNS a bottleneck?"; "request flow?") | "let me just show you final diagram" |
| 7b | 01:50:52 | 01:54:20 | 3.5 | Final design walk-through (D-05, D-06): request path and config path; Maglev paper; φ-accrual note on the page (L-0222-L-0230, L-0223) | Pre-written page, red traces | "I'll take three questions now" |
| 7c | 01:54:20 | 01:59:39 | 5 | Q&A: stale local DNS cache (toothache analogy); CoreDNS availability, "DNS for CoreDNS", base of recursion; traceroute 21 hops; external users -> public DNS; public LB DNS updates (proprietary, Maglev); one LB per homogeneous service, not an API gateway (L-0231-L-0239) | Student-driven | Break |
| 8 | 01:59:39 | 02:04:59 | 5 | Admin: break ("would not compromise on quality") | - | "Okay, remote locks, distributed locks" |
| 9 | 02:04:59 | 02:35:16 | 30 | **Remote locks and distributed locks** | **Definition + backward link** (lock manager; airline check-in rows locked in DB memory) -> **ladder of sharing**: threads -> processes -> machines | Further reading, "scale vs distribute" |
| 9a | 02:04:59 | 02:07:07 | 2 | Lock manager = remote machine tracking who locked what; threads synchronize through RAM (L-0241-L-0243); D-07 | Backward link (week 2) | "what if I want to synchronize two processes?" |
| 9b | 02:07:07 | 02:09:49 | 3 | **apt-get / dpkg.lock** war story (2008-09, two terminals "twice X fast"); processes share disk; machines share **network** (L-0244-L-0246) | Personal war story -> pattern completion (P20) | "practical beats theory any day" |
| 9c | 02:09:49 | 02:13:59 | 4 | Hypothetical "stupid" remote queue (queue 7), zero protection, one consumer at a time; class brainstorm - synchronized block, lock on queue server, intermediate layer, same-machine process - all rejected (L-0248-L-0253); D-08 | **Constrained puzzle** (P16) - black box, no access | "This discussion is going in random directions... let me sort it out" |
| 9d | 02:13:59 | 02:16:05 | 2 | DB as lock manager: key Q7 -> owner; release; contend (L-0254-L-0256) | Teacher resolves | "But now there is a catch" |
| 9e | 02:16:05 | 02:22:27 | 6.5 | Holder dies -> perpetual lock -> **TTL**; needs k-v + atomic + TTL -> Redis (Redlock name); acquire/read/release loop; `SET NX` with 300 s expiry; Redis commands atomic (L-0257-L-0267); D-08, D-09 | Failure-first ("what if consumer one... died off") | "Now what about releasing the lock?" |
| 9f | 02:22:27 | 02:26:18 | 4 | Release: plain delete is wrong; timeout edge case (C1 expires, C2 acquires, C1 deletes C2's lock); get-then-delete still races (L-0268-L-0272) | Rhetorical (P18) + step-by-step timeline | "This is where the distributed system has its glory" |
| 9g | 02:26:18 | 02:27:53 | 1.5 | Atomic release with Redis `EVAL` + Lua script; "after every single line something lags" (L-0273, L-0274) | Fix | "But, but, but it's still not done" |
| 9h | 02:27:53 | 02:32:29 | 4.5 | Single Redis = SPOF -> **distributed lock** (Redlock): 5 independent masters, majority (>50%), release on failure, throughput cost, edge cases remain (L-0275-L-0283); D-10 | Failure-first (P19) | "A few things that I want you all of you to read" |
| 9i | 02:32:29 | 02:35:16 | 3 | Reading: Chubby, Kleppmann's Redlock critique, teacher's distributed-transaction videos; **distribute for fault tolerance vs scale for throughput** (L-0284-L-0288) | Reading list + reframe | Wrap-up |
| 10 | 02:35:16 | 02:35:49 | 0.5 | Admin: wrap-up; tomorrow distributed ID generators | - | Q&A |
| 11 | 02:35:49 | 03:06:15 | 30.5 | **Q&A on locking** | Student-driven ("first locking", LB questions deferred) | "Is it the right time to ask the LB question now?" |
| 11a | 02:35:49 | 02:44:59 | 9 | Single-connection TCP-server lock (S2, "brilliant"); MySQL + cron TTL; Lua/EVAL; real queues already give the guarantee (OCI, SQS, RabbitMQ, Kafka); why consumers obey the lock; **MongoDB multi-shard transaction** as real use (L-0289-L-0307) | Student-driven | Next student |
| 11b | 02:44:59 | 02:50:12 | 5 | "Nearest shared storage" principle restated by a student; TTL bounds hold time; mutex vs network lock cost; single server -> plain mutex (L-0308-L-0313) | Student summary endorsed | Redlock edge case |
| 11c | 02:50:12 | 02:59:48 | 9.5 | Redlock edge case (lock-holding instances go down); "minimized, never fully mitigated"; simulate with 5 local Redis ports + injected delays; implementation habit; **digression: writing own malloc**; motivation (L-0314-L-0327) | Student-driven deep dive | "first locking" -> ZooKeeper |
| 11d | 02:59:48 | 03:06:15 | 6.5 | ZooKeeper vs Redis (same core properties; ZooKeeper notifications = real-time Pub/Sub; startups avoid ZooKeeper as "Java"); can a consumer read many messages (queue-specific; SQS 10 per call; week 7 broker) (L-0328-L-0336) | Student-driven | LB questions |
| 12 | 03:06:15 | 03:36:02 | 30 | **Q&A on the load balancer** | Student-driven over D-06 | Closing |
| 12a | 03:06:15 | 03:15:44 | 9.5 | DNS does not route by load; active-passive LBs (only active IP, or weight 0); "DNS is a stupid service"; sessions via consistent hashing, no session service, every service is a network hop; RR keeps one integer; CoreDNS has no brain; Prometheus vitals vs health checks; Pub/Sub vs SSE ("anything reactive"); heartbeats = online/offline indicator (L-0337-L-0350) | Student-driven | Next |
| 12b | 03:15:44 | 03:21:20 | 5.5 | Orchestrator SPOF -> leader-follower, leader election; private CoreDNS vs public DNS + API gateway; more layers in reality (L-0351-L-0361) | Student-driven | Next |
| 12c | 03:21:20 | 03:28:44 | 7.5 | LB = reverse proxy; API gateway = powered proxy; auth is business logic; Prometheus resources; orchestrator followers are stateless; Prometheus read load and scaling; when to use only a reverse proxy (L-0362-L-0370) | Student-driven | Next |
| 12d | 03:28:44 | 03:36:02 | 7.5 | Who sends the heartbeat (orchestrator pulls /health); success codes configurable; what health check verifies is the owner's call; why not push heartbeats; autoscaling as separate component; who monitors the orchestrator - global monitor, "base condition of the recursion" (L-0371-L-0381) | Student-driven | Closing |
| 13 | 03:36:02 | 03:36:34 | 0.5 | Admin: closing; tomorrow distributed ID generators | - | End |

Time budget: approach 9 min, LB algorithms 15.5 (+7 Q&A), LB low-level + code 24 (+4 Q&A), brainstorm 32, DNS 14 (+5 Q&A), locks 30, closing Q&A 60.5. Roughly **35% of the lecture is Q&A** and much of it adds real design content (orchestrator HA, heartbeat direction, LB vs reverse proxy, Redlock edge case, ZooKeeper) - fold it into topic sections, not an appendix.

**Introduction patterns observed** (reusable templates):
- **Black box -> "why can't we build it?" -> day-zero build -> code** (load balancer): the teacher strips the box to one TCP proxy, then shows ~10 lines that do it.
- **Bottleneck number -> scale-out problem chain** (one LB server -> config store -> stale copy -> health checks -> push -> metrics -> DNS): every fix exposes the next problem, each posed to a named student.
- **Socratic chain with one student** (S6 at 01:10-01:14, S8 at 01:41-01:49): ask, accept partly, ask "what's the disadvantage?" / "what's the request flow?" until the student reaches the planned answer.
- **Ladder of sharing** (threads -> RAM, processes -> disk, machines -> network): pattern completion; the student repeats it back at 02:44:59.
- **Constrained puzzle** (stupid remote queue): constraints stop shortcuts until the only answer left is an external lock manager.
- **Failure-first refinement** (lock): holder dies -> TTL; TTL expires mid-work -> ownership check; check races -> atomic Lua; one Redis dies -> Redlock; Redlock edge case -> "minimized, not mitigated".
- **Every section ends on "implement it locally"** (LB on three localhost ports, five Redis on 6379-6383, CDN in an hour).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:19:52 | "On what basis would this load balancer decide which server to forward the request to?" (rhetorical) | - | - | The load balancing algorithm: round robin, weighted round robin, least connections |
| P2 | 00:28:51 | "Some APIs might take one second, some one minute, some one hour. What kind of load is this?" (rhetorical) | - | Answers "Analytics" | High-variance load -> least connections |
| P3 | 00:31:23-00:32:16 | (voiced objection) "Why are we not capturing CPU and let load balancer use it?" | "Most common random thing people say" | "Imagine the complexities... adds up multiple milliseconds"; decision must take microseconds | Heuristic: open connections approximate busyness (L-0080, L-0081) |
| P4 | 00:35:45 | (student) With least connections, the fifth request may land on a server still running an hour-long query | S3 | "You are assuming a server can handle only one query. Why?"; "Why would you want to go for global optimization? Local optimization still works" | Add servers; local optimization; data warehouses use it (L-0088, L-0090) |
| P5 | 00:38:12 | (student) User closes browser and resubmits - two results? Can we stop the job? | S2 | "That's your business logic"; TCP broken is broken; do async; HTTP servers lack tooling but you can implement it | Business logic / async; Redshift/BigQuery cancel (L-0092-L-0094) |
| P6 | 01:00:07 | "What would be a first step when a client connects?" (rhetorical over code) | - | - | Pick the backend: `strategy.GetNextBackend` |
| P7 | 01:09:53 | "How would you store the configuration? What would you store?" | S6: backend IP addresses; algorithm; store in a DB; keep pulling / in-memory | "Bare minimum"; per-request DB call is 3-5 ms, too slow | Backends + algorithm in a DB; in-memory copy pulled at start (L-0147-L-0152) |
| P8 | 01:12:45 | "What is the disadvantage of this, of having this in sync?" | S6: config changes from console, a server goes down | "First of all, how would you know that a backend server went down?" | Copy goes stale (L-0154) |
| P9 | 01:13:26-01:14:43 | "How would you know that a backend server went down?" / "What do you mean when you say my server is up?" | S6: health check service; 200 on a health endpoint (not on all requests); S7: lightweight ping or TCP ping, no special endpoint | Names it **orchestrator**; "Have you configured a load balancer ever?"; VM up is not process up | /health endpoint in LB config; orchestrator fires continuous checks, updates DB (L-0156-L-0164) |
| P10 | 01:19:52 | "How would this change that orchestrator made in the DB get updated in the LB servers' in-memory hash map?" | S7: LB keeps polling (naive), adds latency to user requests; then "event-based solution" | "No, orchestrator is doing it"; polling frequency 10 s -> 9 s of requests to a dead server -> error spike | Don't poll; make it reactive (L-0167-L-0170) |
| P11 | 01:23:06 | "So what's the solution?" | S4: reserve a port on the LB to trigger a pull; also a separate "load balancer handler" service | Accepts the port (9091 meta port); rejects extra service ("Why I have one more service?"); "no one right answer... everything is a trade-off" | Explicit push call or Redis Pub/Sub fed by orchestrator/console/CDC (L-0171-L-0182) |
| P12 | 01:31:08 | "How would orchestrator know the CPU and memory metrics... How would it get it?" | S1: orchestrator calls each LB periodically; S3: same DB as config; S1: orchestrator DB fed by heartbeats; S?: "connection pooling"; S4: metrics, CloudWatch (manual); S3: telemetry agent -> log storage, alarms | "What if it needs historical data?"; "what you're storing is time series"; "Why are you re-implementing things...?"; "don't go into alarm"; "don't limit it to this system" | Telemetry agents on every VM -> Prometheus; orchestrator queries it (L-0186-L-0200) |
| P13 | 01:40:27 | "Now you have two LB servers. Client has IP address of one. How will client make request to other LB servers?" | S8: DNS holds the LBs' mapping | "google.com is not public, load balancers are private"; "Are all load balancers public?"; "What about private... only one LB server?" | DNS - private DNS (CoreDNS) with one domain per LB (L-0205-L-0213) |
| P14 | 01:47:00 | "Isn't all the requests routing through DNS making DNS a bottleneck? What's the request flow?" | S8: multiple DNS; DNS picks an IP and sends the request to that LB | "Then this is acting as a load balancer. That's a wrong thing" | DNS returns the IP to the client, which caches it and connects - DNS is not a proxy (L-0217-L-0219) |
| P15 | 02:09:03 | "When you think about multiple machines, what is shared between them? Disk? No." (rhetorical) | - | - | Network -> remote locks (L-0246) |
| P16 | 02:11:37 | "Only one consumer may read from queue 7 at a time. How will you implement this?" | S3: synchronized block around get/pop; S4: a lock on the queue's server; S12: an intermediate layer passing one request at a time; S7: another process on the queue's machine | "That's remote"; "Queue is black box for you"; "then that layer becomes a portal... We are talking about lock manager"; "you cannot" | DB as lock manager: key Q7 -> owner (L-0250-L-0256) |
| P17 | 02:16:05 | "What if consumer one took the lock and before it could delete it died off?" (rhetorical) | - | - | TTL; store must give k-v, atomic instructions, TTL -> Redis (L-0257, L-0258) |
| P18 | 02:22:27 | "Release lock: just delete the entry. What's the drawback of this?" (rhetorical) | - | Walks the timeout timeline C1/C2 | Delete only if you own it - atomically via Lua `EVAL` (L-0268-L-0273) |
| P19 | 02:27:53 | "This one instance of Redis... What if this goes down? Now what?" (rhetorical) | - | - | Distributed lock: majority over 5 independent Redis (L-0275-L-0280) |
| P20 | 02:35:49 | (student-proposed) Use the network itself: a server that accepts only one connection | S2 | "To be honest, that's a brilliant idea"; won't call it equivalent without comparing features | Single-connection TCP server lock (L-0289-L-0295) |
| P21 | 02:50:12 | (student) Redlock: holder has 3 of 5, two holders' nodes die and come back empty - two owners? | S2; follow-up "why would C1 keep acquiring?" | "That's what the edge case is... not foolproof, but it still minimizes the chances" | Minimized, never fully covered (L-0314-L-0322; see factcheck L-0316, L-0318) |
| P22 | 03:16:06 | "Orchestrator went down. How do you solve it?" | S3: three orchestrators, same code, rest idle | "Not idle... leader-follower" | Leader election (L-0351-L-0354) |
| P23 | 03:11:19 | (student) Doesn't CoreDNS's round robin re-create the bottleneck the LB algorithms solved? | S1 | "Which algorithm? Be specific"; "CoreDNS has no idea... there is no brain" | DNS just picks one IP; balancing stays in LB servers (L-0347) |
| P24 | 03:31:31 | (reverse) "Will backend server... do you know orchestrator's IP address?" | S1: why not have backends push heartbeats? | "Same thing that we discussed... online offline indicator"; "think from customer side" | Orchestrator pulls /health (L-0374-L-0376) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Your load balancer keeps its backend list in memory. A backend dies. How does every LB server find out - and what happens to user requests in the meantime?"** (P8-P11, 01:12:45-01:30:20). The lecture's central design chain; the 10-second poll -> 9 seconds of errors timeline gives the reader something to compute before the push/Pub/Sub answer.
2. **"Only one of three consumers may read from a remote queue at a time. You can't change the queue or touch its server. How?"** (P16, 02:11:37). Good because the obvious answers (synchronized, middle layer) are ruled out by the constraints, which leaves an external lock manager.
3. **"Consumer 1 holds the lock with a 5-minute TTL but takes 6 minutes. Walk the timeline: who deletes whose lock?"** (P18, 02:22:27-02:26:18). Concrete step-by-step race; then a second step: "you added an ownership check - why does it still fail?"
4. **"One LB server has a 10,000-connection limit. How many clients can it serve at once?"** (01:08:17, L-0145). Quick arithmetic (5,000), and the answer comes from the two-TCP-connections picture (D-03).
5. **"With two LB servers and one address, how does a client reach the second one? Is DNS now a bottleneck?"** (P13-P14, 01:40:27-01:49:01). Readers who answer "DNS forwards the request" get corrected: DNS is not a proxy.
6. **"Threads share RAM, processes share disk. What do two machines share - and what does that tell you about locking?"** (P15, 02:06:23-02:09:03 + apt-get story). Short pattern completion; easy to remember.
7. **"Half your queries take a second, some take an hour. Round robin or least connections? Why not just route by CPU?"** (P2-P3, 00:28:51-00:32:16). Two steps: pick the algorithm, then see why the clever CPU idea is impractical (microsecond budget).
8. **"Your lock store is a single Redis. It goes down. How do you keep locking working without replication?"** (P19, 02:27:53). Leads to the majority rule; follow with the Redlock edge case (P21).
9. **"Should backends push heartbeats to the orchestrator, or should the orchestrator call them?"** (P24, 03:28:44-03:32:15). Short design question with a clear reason (backends don't know the orchestrator's IP; a self-report can say "up" while the service is down).
10. **"The orchestrator watches everything. Who watches the orchestrator?"** (P22, 03:15:44; 03:34:22). Recursion question: leader election, then a minimal global monitor as the "base condition of the recursion".

Runner-up: "Do you need a session service if requests can go to any server?" (03:08:50) - better as a "don't add boxes" callout.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:14:15 | Microscope zooming into a culture; each zoom shows a new world (L-0034) | Iterative design: day zero -> load -> fix -> zoom further | Good opener for the "day zero" method |
| 00:26:17 | Think of least connections like DB connection pooling ("It's not a connection pool. I just use that as an example") (L-0071) | LB tracking connections per backend | Keep the teacher's own caveat |
| 01:00:58 | `copy` "literally copies from one file to another" - sockets as files | The LB core loop | Pair with the code snippet |
| 01:55:00 | **Toothache**: you don't wait for your periodic dentist visit if it hurts (L-0232) | Client invalidates DNS cache on connect failure, doesn't wait for TTL | Memorable; note factcheck L-0231 (clients usually try other IPs first) |
| 01:56:01, 03:35:30 | **"Base condition of the recursion"** - one tiny node with a standby at the top (L-0234, L-0381) | Who load-balances the DNS / who watches the orchestrator | Reuse for both; factcheck L-0234 says DNS root is widely replicated |
| 02:06:23-02:09:03 | Threads/RAM, processes/disk, machines/network ladder | Why remote locks exist | Turn into a 3-row visual |
| 02:26:18 | Redis Lua script as "a kind of transaction, kind of" | Atomic check-and-delete | Keep the hedge |
| 03:08:40 | "DNS is a stupid service. It just stores a hash map" (L-0339) | DNS has no load information | Callout |
| 03:21:35-03:21:49 | "Load balancers are reverse proxies... API gateways are powered proxies" (L-0362, L-0363) | Taxonomy of proxies | Small glossary box |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:10:16 | Facebook.com: one website to users, many services behind one home feed (L-0024) | Distributed system = one coherent system | Opener |
| 00:10:16 | Master's professor (many DS papers): "you'll love it and hate it when you understand it well" (L-0025) | Murphy's law framing | Quote box |
| 00:18:46 | Flipkart built its own LB because of on-prem data centres (L-0048) | You may really have to build one | "Why build" sidebar |
| 00:23:23 | 4 GB / 8 GB / 4 GB machines: 80% vs 40% utilization, ratio 1:2:1 (L-0060-L-0062) | Weighted round robin | Interactive request-counter (D-02) |
| 00:24:29 | Teacher's team bought AWS reserved instances of different sizes; used WRR instead of leaving them idle (L-0065) | WRR in practice; "it's always about money" | War-story card |
| 00:28:51 | Analytics: 1 s / 1 min / 1 h / 2 h queries (L-0075) | High variance -> least connections | Use the walkthrough numbers |
| 00:37:21 | Data warehouses (BigQuery, Redshift) use least-connection-style balancing (L-0091) | Real use | Show factcheck L-0091 note (workload management) |
| 00:34:30 | gRPC over HTTP/2, connection never terminates; server-to-server hour-long HTTP (L-0086) | Long requests over TCP | Inline note per factcheck L-0084 |
| 00:40:20-00:41:26 | First LB in Go, March 2021, COVID, at the in-laws'; explained to everyone; 5-6x faster than Nginx until realising Nginx/HAProxy do much more (L-0095-L-0097) | Joy of building; humility | Lead story of the build section |
| 00:44:00-00:46:41 | 10.0.0.1:9000 LB; backends 10.0.0.7/8/9:8081 (L-0103, L-0106) | Concrete addresses | Reuse exactly in D-03 |
| 00:57:23 | GitHub outage during the demo | (incidental) | Drop or footnote |
| 00:58:12 | lb.go: LB on 9090, four Flask backends on 8081-8084 on one machine (L-0126) | Build locally | Link to code snippet |
| 01:08:17 | 10,000-connection limit -> 5,000 clients (L-0145) | LB needs horizontal scaling | Prompt #4 |
| 01:12:03 | DB call 3-5 ms per request (L-0151) | Keep config in memory | Factcheck L-0151 inline |
| 01:21:48 | Poll every 10 s; crash at second 1 -> 9 s to dead backend (L-0169) | Polling's stale window | Animate the timeline (D-04) |
| 01:18:09 | Divide-by-zero / null pointer crash with VM still up (L-0162) | Health of service, not VM | Callout |
| 01:44:41 | CoreDNS, used across Kubernetes; "work on SRE teams for a year and a half" (L-0211, L-0212) | Private DNS exists | Sidebar |
| 01:43:45 | payments.lb.google.com (L-0209) | One domain per LB | Reuse in D-06 |
| 01:56:18 | Traceroute to google.com showing ~21 levels (L-0235) | Every level horizontally scalable but one | Factcheck L-0235 inline |
| 02:07:07 | apt-get upgrade in two terminals, `dpkg.lock` exists (2008-09, first year of college) (L-0244, L-0245) | Process synchronization via disk | Lead story of the locks section |
| 02:18:46 | Lock entry: queue7 -> consumer 2, expire 5 min (L-0263) | Lock record shape | D-09 |
| 02:19:41 | `SET NX` with 300 s expiry, returns 1/0 (L-0264, L-0265) | Acquire | Correct syntax per factcheck L-0265 |
| 02:29:13 | 5 Redis masters, 3 of 5 = majority (L-0278, L-0279) | Redlock | D-10 |
| 02:43:16 | MongoDB distributed transaction over shards 1/3/5 with its own lock manager (L-0305, L-0306) | Where remote locks really live | Factcheck note L-0305 |
| 02:55:38 | Five local Redis on 6379-6383, injected 1 s / 5 s / 15 s delays (L-0320, L-0321) | Simulate distributed failures locally | "Try it" box |
| 02:57:34 | Teacher writing their own malloc; heap location (L-0324) | Curiosity habit | Optional aside |
| 02:58:14 | ~180 repos on GitHub over 10 years (L-0326) | Implementation habit | Optional |
| 03:05:55 | SQS reads up to 10 messages per call (L-0336) | Queue guarantees differ | Q&A box |
| 03:09:33 | A good architecture with only four microservices handled petabytes; each hop 3-5-10 ms (L-0343, L-0344) | Don't add boxes | Callout |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:14:37 | Bunch of remote machines vs a distributed system | Horizontal scalability of every layer |
| 00:21:32-00:30:39 | Round robin vs weighted round robin vs least connections | Uniform infra + low variance / non-uniform infra / high response-time variance |
| 00:31:23 | Connection-count heuristic vs CPU/memory-aware routing | Microsecond decision budget |
| 00:43:08 | LB server vs backend server | What we build vs black box |
| 01:07:45 | Building vs scaling | Everyone can build locally; few get to scale |
| 01:11:38 | DB lookup per request vs in-memory config copy | Latency (3-5 ms) vs staleness |
| 01:21:48-01:29:13 | Polling vs push (admin port) vs Pub/Sub/CDC | Staleness window; "make things reactive" |
| 01:17:29 | VM health vs service (process) health | Process can crash on a live VM |
| 01:33:37 | Config (key-value) vs metrics (time series) | Different data, different store |
| 01:32:24 | Current snapshot vs historical trend | React at 60-80%, not at 100% |
| 01:44:41 | Public DNS vs private DNS (CoreDNS) | Who resolves: internal callers vs internet users |
| 01:49:01 | DNS as proxy vs DNS as resolver | DNS returns an IP; the client connects |
| 02:09:03 | Thread lock (RAM) vs process lock (disk) vs remote lock (network) | Nearest shared medium |
| 02:22:27-02:26:18 | Delete vs check-then-delete vs atomic Lua delete | Race window |
| 02:28:40, 02:34:23 | Single lock instance vs distributed lock; scaling horizontally vs distributing for fault tolerance | Availability vs throughput |
| 02:48:42 | Mutex (in-memory signal) vs network lock | Network is "the worst mode of communication" |
| 03:00:24 | ZooKeeper vs Redis-based locking | Same core properties; team comfort ("Java") |
| 03:13:07 | Prometheus vitals vs orchestrator health checks | Vitals stores don't generally do health checks |
| 03:14:10 | Redis Pub/Sub vs SSE vs ZooKeeper vs explicit HTTP | "Anything which is reactive works" |
| 03:21:35 | Load balancer vs reverse proxy vs API gateway | Homogeneous balancing; gateway = powered proxy |
| 03:28:56-03:32:17 | Orchestrator pulls /health vs backend pushes heartbeat | Backend doesn't know orchestrator's IP; simpler for developers |
| 03:33:04 | Autoscaling in orchestrator vs separate component | How bulky the orchestrator gets |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:11:48, 02:27:25 | "Assume anything and everything would go wrong"; "imagine after every single line something lag is coming" (L-0029, L-0274) | Opening principle + lock-section refrain |
| 00:12:34, 00:44:00 | "Always start with the day zero architecture... Don't think of scale on day zero" (L-0030, L-0104) | Method card |
| 00:01:20, 00:42:34 | "Drawing boxes, two-year-old kid can do that"; "high level, dappa dappa" (L-0007) | Tone for "build it" sections |
| 00:42:16, 01:04:23, 01:06:50, 02:38:00, 02:56:34 | "Implement everything that you see" (L-0098, L-0323) | "Try it locally" boxes |
| 01:07:45 | "There is a difference between building and scaling" (L-0144) | Callout |
| 00:25:16 | "It's always about money" / quantified impact (L-0066, L-0068) | WRR callout |
| 00:32:16 | "Always think about practicality whenever you suggest something" (L-0082) | Brainstorm prompts |
| 01:26:21 | "There is no one right answer... everything is a trade-off" (L-0175) | Push vs Pub/Sub |
| 01:29:13, 03:14:10 | "Make things reactive rather than polling based" (L-0181) | Config-path section |
| 01:34:34, 01:36:19 | "Why are you re-implementing things that are already implemented? Just reuse" / "don't limit it to this system" (L-0192, L-0198) | Prometheus section |
| 02:39:20, 03:02:34, 03:03:45 | "Focus on the core properties that you need from the database rather than the database itself" (L-0013, L-0298) | Lock store choice; ZooKeeper |
| 03:09:33 | "Don't add random boxes... every service is a network hop" (L-0342) | Sessions, LB handler, auth |
| 02:55:38 | "We never say it is fully mitigated. Minimized." (L-0322) | Redlock edge case |
| 02:32:14 | "A single node of X and you just make it distributed" (L-0283) | Summary, with factcheck L-0283 caveat |
| 02:09:49 | "Practical beats theory any day" (L-0247) | Section intro |
| 01:59:16 | "Load balancer... balancing across homogeneous set of servers" | LB vs gateway |

---

## 4. The build-it-yourself load balancer and the stupid remote queue (case-study thread, proposed spine)

This lecture has no product case study. Its spine is two things the class builds step by step. Each step adds one component because of a failure.

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:17:53 | The LB box we draw "magically works" | Build our own | Start from D-01 |
| 00:19:52-00:33:24 | Requests land on 3 backends (D-02 counts) | RR, WRR, least connections | Interactive request distributor |
| 00:44:00 | One LB server 10.0.0.1:9000, three backends 10.0.0.7-9:8081 | Day zero LB | D-03 |
| 00:47:34-00:54:08 | Client TCP1 -> LB -> TCP2 -> backend; map tcp1->tcp2 | TCP proxy core | Animate bytes both ways |
| 00:58:12 | lb.go on one laptop | Accept loop, strategy, two copies | Short code excerpt |
| 01:08:17 | 2X connections -> 5,000-client ceiling | Need many LB servers | Bridge to design |
| 01:09:53 | Where does the backend list live? | Config DB + in-memory copy | D-04 config block |
| 01:13:26 | A backend dies | Orchestrator, /health | D-04 hatched B Srv2 |
| 01:19:52 | DB changed, LB copy stale | Polling window, push, Pub/Sub, CDC | Timeline + D-05 |
| 01:30:20 | LB servers overloaded | Vitals, Prometheus, scale LB servers | D-05 second form |
| 01:40:27 | Two LB servers, one address | DNS / private CoreDNS | D-04 left side |
| 01:50:52 | Whole design | Request path + config path | D-06 with two traced paths |
| 03:15:44, 03:34:22 | Orchestrator dies / who watches it | Leader election, global monitor | Add to D-06 (`leaderElec`) |
| 02:09:49 | Remote queue 7 with zero protection, 3 consumers | Need mutual exclusion over the network | D-08 |
| 02:13:59 | Key Q7 -> owner in a DB | Lock manager | D-08 |
| 02:16:05 | Owner dies holding the lock | TTL; Redis SET NX | D-09 |
| 02:22:27 | Owner outlives its TTL | Ownership check, atomic Lua release | Timeline animation |
| 02:27:53 | Redis dies | Redlock across 5 masters | D-10 |
| 02:43:16 | MongoDB multi-shard transaction | Real use of remote locks | Close the lock section with this |

Gaps where the thread is *not* used but could carry the content (without inventing claims): the opening "how to approach distributed systems" (day zero, every layer horizontally scalable, unit economics) can be shown as the method the LB build follows - the teacher says so ("We'll touch upon all of those segments when we design load balancer", 00:13:26). The Q&A on sessions (03:08:50), auth (03:22:02) and reverse proxies (03:21:20) can sit on D-06 as "what the LB does *not* do". The lock section could reuse the LB design: ZooKeeper replacing the Redis Pub/Sub (03:01:09) links both halves.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:09:03, 00:14:37 | Any set of remote machines talking to each other is a distributed system (L-0021, L-0035) | General ("social media") | Must handle scale and be horizontally scalable at every layer (factcheck L-0035 inline: technically distributed, just not a good one) |
| 00:15:14 | Horizontal scalability = an autoscaling policy that adds servers (L-0040) | General | Know unit economics; every layer must scale |
| 00:17:53 | The LB is a magic box someone else builds (L-0046) | General | It is ~10 lines of core code; build it |
| 00:31:23 | The LB should route on backend CPU/memory (L-0080) | General ("most common random thing people say") | Too slow; use connection-count heuristics (factcheck L-0080: async load reports exist) |
| 00:33:32 | Least connections requires persistent connections to every backend (L-0083) | S7 | No; or with a pool count *active* connections |
| 00:34:19 | Hour-long requests can't happen over HTTP | S7 | Raw TCP / keep-alive / gRPC (factcheck L-0084 note: middleboxes time out) |
| 00:35:45 | A busy server can only handle one long query; need global optimization (L-0088) | S3 | Servers handle many; local optimization works; add servers |
| 00:38:12 | The LB could return two results to the same user IP (L-0092) | S2 | Statefulness is business logic; go async |
| 01:05:46 | LB talks REST to the API servers (L-0139) | S4 | Raw TCP copy, protocol-agnostic |
| 01:15:54 | A TCP ping is enough as health check (L-0158) | S7 | Process can be down behind a live port/VM; use the service's /health (factcheck L-0158) |
| 01:20:57 | Polling hurts because user requests wait on it | S7 | Polling's real cost is the stale window -> error spike |
| 01:23:53 | Add a separate "LB handler" service to watch config (L-0172) | S4 | Don't add services; let orchestrator/LB do it |
| 01:33:34 | Store metrics in the same config DB (L-0189) | S3 | Metrics are time series |
| 01:34:25 | Build a custom heartbeat DB in the orchestrator (L-0191) | S1 | Reuse an existing metrics tool (Prometheus) |
| 01:34:48 | Connection pooling collects metrics (L-0193) | S? | Dismissed |
| 01:41:55-01:42:38 | Load balancers should be public; only public IPs go in DNS (L-0207) | S8 | Many LBs are private (internal microservices) |
| 01:44:41 | DNS means public DNS only (L-0210) | General | Private DNS (CoreDNS) |
| 01:48:32 | DNS picks an LB and forwards the request to it (L-0218) | S8 | DNS returns an IP; the client connects; DNS is not a proxy |
| 02:12:02 | A synchronized block solves cross-machine exclusion (L-0250) | S3 | Remote queue, multiple machines |
| 02:13:09 | Put a gatekeeper layer in front of the queue (L-0252) | S12 | That's another layer to protect; we want a lock manager |
| 02:22:27 | Release = delete the key (L-0268) | Implied | Check ownership atomically |
| 02:25:00 | Get-then-delete in client code is safe (L-0271) | Implied | Race; use Lua EVAL |
| 02:28:40 | "Just run the lock store in a cluster" (L-0277) | Implied | Redlock: independent nodes + majority (factcheck L-0277: consensus systems do use clusters) |
| 02:34:23 | Distributing something always means scaling it (L-0287, L-0288) | General | Distributed lock reduces throughput; gains fault tolerance |
| 02:40:45 | The example queue should hide messages like OCI's (L-0302) | S1 | Hypothetical queue; real queues give that guarantee |
| 02:42:34 | Consumers could ignore the lock - nothing ties Redis to the queue (L-0304) | S4 | We write the consumer code; it acquires first |
| 02:48:24 | Implementing a mutex is harder than a network lock (L-0311) | S1 | Mutex is two lines; network is the costliest channel |
| 02:58:04 | malloc involves inodes (L-0325) | S2 | Inodes are file system |
| 03:00:35 | ZooKeeper is fundamentally different from what was built (L-0328, L-0329) | S3 | Same core properties; factcheck L-0328 notes stronger safety via consensus |
| 03:06:24 | DNS routes to another LB when one is loaded (L-0337) | S1 | DNS just maps a name to IPs |
| 03:08:50, 03:10:25 | Sessions need a separate session service, especially with round robin (L-0340, L-0345) | S8 | Consistent hashing in LB memory; RR is one integer |
| 03:11:19 | CoreDNS round robin re-creates the LB bottleneck (L-0347) | S1 | DNS has "no brain"; balancing stays in LBs |
| 03:16:12 | Standby orchestrators sit idle (L-0352) | S3 | Leader-follower; followers do work |
| 03:21:20, 03:27:46 | Reverse proxy is something different from an LB (L-0362) | S4, S1 | LBs are reverse proxies |
| 03:22:02 | Auth belongs in the LB (L-0364) | S11 | Business logic (factcheck L-0364: ALB can offload authentication) |
| 03:28:44, 03:31:19 | Backends should push heartbeats (L-0371, L-0374) | S7, S1 | Orchestrator pulls /health |
| 01:51:45 | (Teacher's own) Redis Pub/Sub "guarantees message delivery" (L-0227) | Teacher | See factcheck L-0227: at-most-once; re-pull config on reconnect |
| 03:27:14 | (Teacher's own) Prometheus mostly uses InfluxDB (L-0370) | Teacher | See factcheck L-0370: own local TSDB |
| 02:51:50, 02:54:33 | (Teacher's own) Majority holder keeps acquiring remaining nodes (L-0316, L-0319) | Teacher | See factcheck L-0316, L-0319 |
| 01:56:01, 03:16:39 | (Teacher's own) DNS bottoms out in one node + standby; CoreDNS uses leader election (L-0234, L-0353) | Teacher | See factcheck L-0234, L-0353 |
| 00:53:06 | (Teacher's own) TCP proxy forwards ICMP too (L-0118) | Teacher | See factcheck L-0118 |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Week 1-2 of this course: connection pooling (00:26:17), consistent hashing (01:03:34, 03:09:06), airline check-in locking with exclusive row locks (02:05:42), Slack real-time Pub/Sub for membership (01:27:17), online/offline indicator heartbeats (01:19:05), SSE (03:14:10), autoscaling groups.
- Networking basics: IP address + port, TCP connections, HTTP as a protocol over TCP, keep-alive, EOF (00:46:41, 00:48:36, 01:06:43).
- OS basics: threads vs processes, mutex/semaphore, atomic instructions, system calls, goroutines/threads for blocking calls (01:00:58, 02:06:23).
- Cloud basics: AWS console, reserved instances, VMs, CloudWatch.
- Redis basics (key-value, commands); DNS as name -> IP for public sites.
- CDC is used but explicitly deferred ("in case you don't understand it, it's fine", 01:28:39).

### Concept graph (A -> B means B builds on A)
```
Distributed system definition (one coherent system) + Murphy's law
  -> day zero architecture -> scale each component, load, fix, repeat (microscope)
  -> horizontal scalability at every layer -> non-scalable layer = SPOF -> unit economics / linear amplification

Load balancer = single point of entry (one name/IP)
  -> algorithm: round robin (uniform infra + load) -> weighted RR (non-uniform infra; money)
             -> least connections (needs: open connection = busy; high variance) -> no CPU routing (microsecond budget)
  -> LB server vs backend server
  -> TCP proxy: client TCP + backend TCP, connection map in memory, copy both ways (needs: TCP, ports, blocking calls)
       -> protocol-agnostic -> code (accept loop, strategy, copy in goroutines)
       -> 2X connections -> one LB server is a bottleneck -> many LB servers
  -> config (backends + algorithm) in DB -> in-memory copy (latency) -> staleness
       -> orchestrator + /health checks (service, not VM) -> updates DB
       -> propagate: polling (stale window) -> push (admin port) -> real-time Pub/Sub + CDC (from Slack design)
  -> monitoring LB servers -> vitals history -> telemetry agents -> Prometheus -> orchestrator scales LB servers (~ AWS autoscaling)
  -> many LB servers behind one name -> DNS (private CoreDNS) -> DNS is resolver not proxy -> client caches IP
       -> orchestrator updates DNS -> final design (D-06)
  -> HA of every box: orchestrator leader election; CoreDNS replicas; global monitor = base of recursion (Q&A)
  -> LB = reverse proxy; API gateway in front; private vs public DNS (Q&A)

Synchronization ladder: threads -> RAM (mutex) ; processes -> disk (dpkg.lock) ; machines -> network (remote lock)
  -> lock manager (resource -> owner)
  -> unprotected remote queue -> DB as lock manager
  -> holder dies -> TTL -> needs k-v + atomic + TTL -> Redis SET NX EX
  -> release: ownership check -> race -> atomic Lua EVAL
  -> single Redis = SPOF -> distributed lock (Redlock): independent nodes, majority, release on failure
       -> throughput cost; edge cases minimized not removed (Kleppmann)
       -> "distribute for fault tolerance" vs "scale for throughput"
  -> alternatives: MySQL + cron TTL; single-connection TCP server; ZooKeeper (same core properties)
  -> real use: MongoDB multi-shard transactions
```

Cross-links worth surfacing on the site:
- **Real-time Pub/Sub** appears in the LB config path (01:27:17), ZooKeeper notifications (03:01:55) and the Slack design (week 2).
- **Health checks / heartbeats** = online/offline indicator building block (01:19:05, 03:15:22, 03:31:46).
- **Single point of failure -> make it distributed** recurs: LB server, CoreDNS, orchestrator, Redis lock (00:15:14, 01:55:53, 02:27:53, 03:15:44).
- **"Base condition of the recursion"** closes both the DNS (01:56:01) and orchestrator (03:35:30) questions.
- **Network hop cost** (3-5 ms) drives both in-memory LB config (01:12:03) and "don't add boxes" (03:09:33).
- **Core properties over named tools**: k-v + atomic + TTL (locks), reactive broadcast (Redis/ZooKeeper/SSE), metrics store (Prometheus/CloudWatch).
- **Build locally**: three backend ports, five Redis ports.

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:02:34 | "Last week... database locking, we took an example of airline check-in system" |
| 00:26:17 | "As we had connection pooling for databases" |
| 01:03:34 | Consistent hashing ("I have a blog on it") |
| 01:19:05 | "Pick online off-line indicator" - health checks |
| 01:27:17 | "Learnings from our last session... when we designed Slack's real-time communication" |
| 01:28:39 | "How we listened to changes the last time for the membership information" |
| 02:05:42 | Airline check-in: rows locked exclusively, lock state in DB memory |
| 03:14:10 | "We just leverage what we studied in the last week" (SSE / reactive communication) |
| 03:20:10 | Student: "what we covered in the last class" (choose what to compromise) |
| 03:31:46 | "Same thing that we discussed last week... or last to last week. Basically online offline indicator" |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:00:02, 02:35:16, 03:36:02 | Distributed ID generators | Tomorrow |
| 01:06:50 | CDN in depth ("difficult to scale, not to build") | Next week |
| 01:27:17, 01:28:39 | CDC in depth | Fifth week |
| 01:53:05 | Pieces "floating around" in the final design | Coming weeks |
| 01:58:05, 03:17:59 | Public LB DNS layers / "seven more" proxy layers; Maglev | Not covered; read Maglev, ask in coming weeks |
| 03:05:11 | How queues let many consumer threads read for throughput; build our own message broker | Week 7 |
| 01:50:54 | φ-accrual failure detection (on the page only, L-0223) | Self-reading |
| 02:32:29-02:33:37 | Chubby paper; Kleppmann on Redlock; teacher's distributed-transaction videos | Self-reading |

Site handling: keep these as "coming in a later lesson" chips and a "further reading" box (Maglev, Chubby, Kleppmann, φ-accrual, Prometheus docs, CoreDNS docs).

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers should be redistributed into the topic they belong to (mapping below the options).

### Option A - "Build it, break it, fix it" (RECOMMENDED)
Keeps the lecture's order. Each section opens with a failure the reader is asked to solve first.
1. **How to approach distributed systems**: definition, love/hate, Murphy's law, day zero -> scale -> fix loop, every layer horizontally scalable, unit economics. One-line promise: "the load balancer below is built this way".
2. **Choosing a backend**: single point of entry -> RR -> WRR (money) -> least connections (prompt #7) -> why not CPU; Q&A boxes (persistent connections, hour-long TCP, local optimization, data warehouses, cancel jobs).
3. **Build a load balancer on one laptop**: war story -> terminology -> two TCP connections (D-03) -> code -> Q&A (no REST, copy until EOF) -> "building vs scaling".
4. **Scale it out (control plane)**: 5,000-client ceiling (prompt #4) -> config + in-memory copy -> backend dies (prompt #1) -> orchestrator + /health (heartbeat direction, success codes, what the check verifies from Q&A) -> polling window -> push / Pub/Sub / CDC (ZooKeeper, SSE alternatives from Q&A) -> vitals + Prometheus (Prometheus Q&A) -> DNS / CoreDNS (prompt #5; DNS cache, CoreDNS HA, public vs private, API gateway) -> final design D-06 with both paths -> "who watches the watcher" (prompt #10; leader election, autoscaling component) -> "what the LB does not do" (sessions, auth, reverse proxy).
5. **Locks across machines**: ladder (prompt #6, apt-get) -> stupid queue puzzle (prompt #2) -> DB lock manager -> TTL + SET NX -> release race (prompt #3) -> Lua -> Redlock (prompt #8) -> edge case + simulate locally -> alternatives (MySQL, TCP single-connection, ZooKeeper) -> real use (MongoDB) -> fault tolerance vs scale.
6. **Recap + reading**: heuristics card, further reading, next-lesson chips.

Pros: keeps the teacher's best move (each component exists because the previous step failed); the low-level-first order the teacher deliberately chose this cohort is preserved; Q&A slots naturally into the design chain. Cons: long; the Section 1 principles are abstract until the LB build uses them - needs explicit back-links.

### Option B - "Two systems, one principle"
Open with the principle "assume everything fails; find the SPOF; make it distributed", then present the LB and the lock as two worked examples of it, ending with a comparison table (LB server/CoreDNS/orchestrator/Redis: how each stops being a SPOF).
Pros: surfaces the meta-lesson and the repeated "base condition of the recursion" idea; good for revision. Cons: loses the low-level TCP-proxy build as the motivating start; algorithms (RR/WRR/LC) don't fit the SPOF theme and become a side section.

### Option C - "Request path / control path / coordination"
Three reference chapters: request path (DNS -> LB algorithms -> TCP proxy -> backend), control path (config, orchestrator, health, Pub/Sub, Prometheus, autoscaling, leader election), coordination (threads/processes/machines, locks, Redlock, ZooKeeper).
Pros: clean as a reference; maps 1:1 to D-06's two red traces. Cons: separates the problem from the fix (polling's failure no longer leads straight into Pub/Sub); weaker for a first read.

**Recommendation**: Option A for the main page, with Option C's request-path/control-path split as the interactive D-06 recap at the end of section 4, and Option B's SPOF table as the closing summary card for the whole page.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| Persistent connections / least *active* connections (00:33:32) | Least connections |
| Hour-long request over HTTP; raw TCP, keep-alive, gRPC (00:34:19) | Least connections - "how can a request last an hour?" box |
| Fifth request on a busy server; local optimization; data warehouses (00:35:45) | Least connections |
| Closed browser + resubmit; cancelling jobs, Redshift/BigQuery (00:38:12) | Least connections - business-logic box |
| Connection counts on disconnect; request-count statistic (01:04:43) | Code walkthrough |
| LB -> API is raw TCP, not REST (01:05:46) | TCP proxy |
| copy until EOF, two goroutines (01:06:27) | Code walkthrough |
| "What is this telemetry agent?" (01:35:44) | Prometheus / metrics |
| Stale local DNS cache, toothache (01:54:20) | DNS - client cache |
| CoreDNS down; which CoreDNS; traceroute levels (01:55:46, 01:55:55, 01:56:18) | DNS - HA of DNS ("base condition") |
| External users use public DNS; public LBs; public DNS updates (01:56:55, 01:57:27, 01:57:58) | DNS - public vs private |
| One LB per service, not an API gateway (01:59:01) | Final design - "what the LB does not do" |
| "It's mostly remote, right?" (02:11:54) | Queue puzzle |
| Another process on the queue's machine (02:13:39) | Queue puzzle - rejected ideas |
| Single-connection TCP server lock; cost; consumer death (02:35:49) | Locks - alternatives |
| MySQL as lock store + cron TTL (02:38:50) | Locks - core properties |
| Lua / EVAL; client code stays Python (02:39:39, 02:40:04) | Atomic release |
| OCI queue visibility; real queues' guarantees (02:40:45) | Queue puzzle - "real queues already do this" |
| Consumer can skip the lock; nothing ties Redis to queue; MongoDB use (02:42:07, 02:42:34) | Locks - real use (MongoDB) |
| Nearest shared storage; two distributed systems (02:44:59, 02:45:54) | Ladder of sharing |
| TTL bounds hold time; mutex vs network lock (02:47:41, 02:47:43) | TTL section; ladder (cost of network) |
| Single server -> mutex/synchronized (02:49:38) | Ladder of sharing |
| Redlock edge case; why holder keeps acquiring (02:50:12, 02:54:26) | Redlock - edge cases (with factcheck notes) |
| Implementation habit; malloc digression; motivation (02:57:34, 02:58:41) | Recap - "how to learn this" aside |
| ZooKeeper vs Redis locking; ZooKeeper notifications = Pub/Sub; startups avoid ZooKeeper (02:59:48, 02:59:49, 02:59:55) | Locks - alternatives; also config push |
| Consumer reading multiple messages; SQS 10 per call; week 7 (03:04:05, 03:04:08) | Queue puzzle - forward chip |
| DNS does not route by load (03:06:15, 03:06:24) | DNS - "DNS has no brain" |
| Active-passive LBs in DNS (03:07:10) | DNS - orchestrator updates DNS |
| Session handling; consistent hashing; RR needs no session (03:08:50, 03:10:25) | Final design - "don't add boxes" |
| CoreDNS round robin bottleneck; Prometheus vs health checks; Pub/Sub vs SSE; heartbeats = online/offline (03:10:54) | DNS; health checks; config push |
| Orchestrator SPOF, leader election (03:15:44) | Who watches the watcher |
| Private CoreDNS, public DNS, API gateway (03:17:27) | DNS - public vs private |
| LB vs reverse proxy; API gateway (03:21:20) | "What the LB does not do" / glossary |
| Where authentication sits (03:22:02) | "What the LB does not do" |
| Prometheus resources (03:23:28) | Prometheus - further reading |
| Orchestrator followers stateless (~03:23:53) | Who watches the watcher |
| Prometheus read load and scaling (~03:25:45) | Prometheus (factcheck L-0369, L-0370) |
| When to use only a reverse proxy (~03:27:46, 03:28:15) | Glossary |
| Who sends the heartbeat; endpoint stored in config (03:28:44, 03:29:26) | Health checks |
| Success codes; what /health should verify (03:29:43, ~03:30:06) | Health checks |
| Why backends don't push heartbeats (03:31:19) | Health checks (prompt #9) |
| Autoscaling separate from orchestrator (03:32:51) | Final design |
| Who monitors the orchestrator (03:34:22) | Who watches the watcher (prompt #10) |

### Things a reader-first version should fix (not drop)
- Admin segments (feedback on pre-reads and focus, break, closing) are not lecture content; the focus advice (pen and paper, 00:05:35) can become a one-line "how to study this page" note.
- Teacher's own inaccuracies carry fact-check notes: Redis Pub/Sub delivery guarantee (L-0227), Prometheus storage (L-0370), Redlock holder behaviour and risk window (L-0316, L-0318, L-0319), DNS/CoreDNS HA via one node/leader election (L-0234, L-0353), ICMP through a TCP proxy (L-0118), `SETNX` vs `SET NX EX` (L-0265). Keep the teacher's point, show the note.
- The "single point of failure" claim for every non-scalable layer is imprecise (factcheck L-0038): say "bottleneck; SPOF if it also has no standby".
- The orchestrator's job grew during the talk (health checks, DB updates, LB scaling, DNS updates, maybe autoscaling); use the prepared "Focussed responsibilities" page (D-05, board S52) as the canonical list.
- D-02 weighted-RR counts are partly cut off on the board; redraw from the 1:2:1 rule rather than copying the frame.
- Transcript uncertainties to check before quoting: "a portal" (02:13:22), speaker attribution in the 01:13-01:14 and 03:08 exchanges, "80 vs 180 repos" (02:58:14). See `lectures/lec08/transcript/review_flags.md`.
- Student names appear in the transcript; the site must use anonymous labels only.
