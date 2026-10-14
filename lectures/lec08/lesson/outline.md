# Lecture 05 lesson outline: "Building a load balancer"

**Promise (one line):** Build a load balancer from one TCP proxy on your laptop up to a full control plane (configuration, health checks, push updates, metrics, DNS), then keep three machines from reading the same message with a lock that lives on the network.

**Dek:** How to approach any distributed system, shown by building the box everyone draws and nobody opens, and then by locking things across machines.

Source: lecture id `lec08`, course position 5 (week 3, day 1; `lectures/course.json`), 03:36:34 of class plus the board. Ledger `lectures/lec08/ledger/ledger.jsonl` has 381 items: 376 placed and 5 dropped (see `placement.json`). The design is `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments are in `factcheck_applied.md`. Figures are in `figures.md`, clips in `animations.md`, and pause-and-think prompts in `prompts.md`.

---

## How to read this outline

### Spine
This lecture has no product case study. The spine is a **build-it-yourself thread** (teaching map, option A "build it, break it, fix it"): a load balancer the reader builds from one TCP proxy (D-03) to a full control plane (D-04 → D-06), then a deliberately "stupid" remote queue that forces a lock across machines (D-08 → D-10). Every chapter opens with the thing that just broke in the previous one. The lecture's own order is kept, including the instructor's deliberate choice to go low level before high level this cohort (L-0099). Q&A (about 35% of class time) is folded into the topic it belongs to, never an appendix.

The brainstorm part of the class (one 32-minute block plus 60 minutes of closing Q&A) is split into two chapters so that each page stays readable: §4 is the control plane (configuration, health, push, metrics), §5 is how clients reach many LB servers (DNS) plus the finished design. The locking half is likewise split: §6 remote locks, §7 distributed locks.

Final chapter numbers: 1 How to approach distributed systems · 2 Choosing a backend · 3 A load balancer on one laptop · 4 The control plane · 5 One name, many LB servers · 6 Remote locks · 7 Distributed locks · 8 What to keep.

Option C (request path / control path) is used as the two traced paths on the final design figure (Fig 5·c). Option B (every box, and how it stops being a single point of failure) is the closing table in §8.

### Voice rules (apply everywhere)
- The page speaks in its own voice. No teacher–student dialogue, no student names, no "Student 6". Class proposals become "It is tempting to…; in fact…" or "One idea raised in class…". A proposal that the class refined (the meta port, the orchestrator name, health endpoints) is stated as the design step it became.
- The instructor's own stories (first Go load balancer in 2021, `apt-get` in two terminals, the reserved-instance blunder, five Redis on one laptop, writing malloc) appear as "the instructor" in margin notes. Students' production stories become **"From practice"** notes with no names.
- The instructor's own resources (blog, ARLB repo, distributed-transaction videos) are named as "the instructor's …" with no personal name or personal URL.
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix. Hedges stay hedges ("kind of a transaction", "take it with a pinch of salt").
- Outside facts appear inline with a link, or in a SourceNote.

### Component vocabulary (all from design B; numbers refer to NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph. |
| **Figure** | #6 static figure (panels on graph paper; stack <960px per site) | Redraws of board diagrams D-01..D-10 and new figures. Spec in `figures.md`. |
| **StepThrough** | #7 step-through | Discrete sequences: least connections, one proxied request, resolve-then-connect, who deletes whose lock, the Redlock edge case. |
| **AnimationClip** | #10 clip | 4 clips (one per chapter at most), spec in `animations.md`. |
| **RuleBox** | #5 key rule | Exactly one per chapter, §1–§7. |
| **PauseAndThink** | #8 sticky note | 9 prompts, spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table | 6 tables. |
| **MarginNote** | #12 named collapsible aside | "From practice", "The instructor's…", "See it yourself", Q&A detours. |
| **SourceNote** | #9 sourced fact, headed **"More precisely"** | Only for wrong / outdated / imprecise-medium-or-high items: 11 ledger items covered by 8 notes (SN-01..SN-08). |
| **CodeBlock** | `pre code` | Short, runnable-shaped snippets: the Go proxy core, round robin, acquire/release, the Lua release. |
| **ForwardChip** | "coming later · Lecture N" chip | Topics deferred in class, mapped to the real course order. |
| **BackLink** | the same chip style, "from Lecture N" | Week 1–2 material this lecture leans on (airline check-in, Slack Pub/Sub, online indicator, connection pooling). Uses `ForwardChip` with `when="Lecture N"`; no new component. |
| **RecallQuestions** | #13 recall | Exactly 3 per chapter, §1–§7. |
| **AboutThisClass** | header `details` note | Course-structure facts only. |
| **NotationKey** | #4, once per lecture | At §1.2 (the first figure). |

### Cross-links (from `lectures/course.json`)
Back: online/offline indicator, heartbeats, connection pooling → Lecture 1 (lec04, "Green dots and blog rows"). Autoscaling groups, SSE, queues vs streams, SQS visibility timeout → Lecture 2 (lec01, "Medium under load"). Airline check-in, row locks → Lecture 3 (lec05, "Locking the airline seats"). Slack real-time Pub/Sub for membership changes → Lecture 4 (lec02, "Slack in real time").
Forward: distributed ID generators → Lecture 6 (lec03, "Minting unique IDs", tomorrow). CDN in depth → Lecture 7 (lec09). CDC in depth, consistent hashing, routing through DNS for a cache → Lecture 9 (lec07, "Build your own Redis"). Building your own message broker (week 7) → a later session not in this series.

### Marker colours (NOTES.md, unchanged)
Blue = request / data path. Green = ack / success (200 OK, lock acquired). Red = failure, stale config, expired lock, hard limit. Graphite = everything else. Dashed = async (config push, Pub/Sub, CDC, metrics scrape). The **config path** is never blue: it is dashed graphite with circled numerals, so the request path stays the only blue line on the final design. Arrowheads sit on the initiator: health checks point **orchestrator → backend** (the orchestrator asks), metrics point **Prometheus → exporter** (Prometheus scrapes, per A-LBL-08), the DNS lookup points client → DNS.

---

## Lecture header (unnumbered)

- **Kicker:** Lecture 05 · week 3, day 1 · running case: a load balancer you build yourself
- **H1:** Building a load balancer. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** with the eight chapters below.
- **AboutThisClass** (collapsed `details`, about 180 words): week 3 is about distributed systems; this session covers how to approach them, then designing a load balancer (a realistic design plus a short walk through a tiny load balancer's source), and after the break remote and distributed locks (L-0004, L-0006, L-0009). The next session is distributed ID generators (L-0001; ForwardChip Lecture 6). The lecture leans on Lectures 1–4: name them as BackLinks (online indicator, connection pooling, SSE, airline check-in, Slack Pub/Sub). "How to study this page" (the class's own advice, kept as one paragraph): real design discussions run three or four hours straight, and re-setting context costs about 20 minutes, so read a chapter in one sitting (L-0019); keep your phone in another room and a pen and paper beside you, and sketch rather than type, because a browser tab is one click from distraction (L-0017).
- Estimated words: 300.

---

## 1 · How to approach distributed systems
**Section dek:** before building anything, a definition that holds up, the one assumption that keeps a design honest, and the loop every real system grows by.
**Sec-meta:** about 9 min · class 00:09–00:18
**Opening problem:** you are about to design something that runs on many machines. Where do you start, and what does "distributed" even promise?
**RuleBox (§1):** "Assume ==anything and everything will go wrong==, then check whether your code and your system handle it." (L-0029). Box body: the board line "the best and the worst thing about distributed systems is: anything that could go wrong would go wrong" (L-0026). Sketch: one box with three small lightning marks (crash, lag, network cut) and a "?" over each.
**Estimated words:** 1,900
**Q&A folded in:** none in class; the chapter's promise ("the load balancer below is built this way") points forward to §3–§5.

### 1.1 What "distributed" means
- **Purpose:** replace "a bunch of machines" with a definition the rest of the page can test against.
- **Opens with:** "distributed systems" is one of the most misused terms in the age of social media: people call anything a distributed system (L-0021).
- **Key points:** distributed systems were among the most neglected subjects in the instructor's degrees, yet they are everywhere in industry (L-0002). The algorithms in the literature are the foundation, and real systems show how the pieces fit (L-0003). Definition: a distributed system abstracts out the distributedness. To an outsider it is one coherent system, while many machines each do their job behind it (L-0022, board: multiple components on multiple machines → single coherent system → solves a bigger problem). The "outsider" is contextual: an end user, another microservice, an internal portal (L-0023). Facebook.com is one website to its users, and a college student may think they can build it, but rendering one home feed takes many services (L-0024). Misconception: remote machines talking to each other are not automatically a (good) distributed system (L-0035, left as taught; 1.3 says what a good one needs). Love and hate: the instructor's professor said you love distributed systems when you understand them well, and hate them when you understand them well (L-0025, attributed). The hate part: when a distributed transaction breaks into a state you never designed for, you get data corruption (L-0027). The love part: you can scale horizontally (L-0028). Murphy's law sets up the RuleBox (L-0026).
- **Components:** Prose, RuleBox §1, MarginNote "Why this subject gets skipped" (L-0002, L-0003; skip unless you like the history).
- **Words:** 550

### 1.2 Day zero, then scale each component
- **Opens with:** a team about to build "for a million users" on its first day.
- **Key points:** always start with the day-zero architecture and don't overcomplicate it: one machine, one server, one database, one cache (L-0030; the instructor's own approach, "take it with a pinch of salt"). Then scale each component independently, see how it performs under load, rectify, re-architect, and repeat (L-0031, board loop). The pain points under load are low-level details: spend time at the code level on what goes wrong and how to fix it (L-0032). This is the incremental approach, and complex systems are always built this way (L-0033). It is like looking at a culture under a microscope: each zoom shows a new world of finer detail to fix (L-0034). Thinking about scale on day zero is "the worst way to build a system" (L-0104, restated in §3.2 when the load balancer starts as one machine).
- **Components:** NotationKey (once; extended with the glyphs this lecture adds: orchestrator = stacked box, DNS = small box with a book mark, Pub/Sub = pipe, time-series store = cylinder with a sparkline, lock record = key tag), Figure **Fig 1·a** "The day-zero loop" (board S03–S05 redraw).
- **Words:** 450

### 1.3 Every layer must scale out
- **Opens with:** "we have autoscaling on the API servers, so we're horizontally scalable."
- **Key points:** a distributed system handles scale with many machines, and above all it must be horizontally scalable; that is why you build one (L-0036; the board's list also names fault tolerance). Horizontal scalability is not just more machines or autoscaled API servers: check every layer (L-0037). A layer that does not scale horizontally is a single point of failure (L-0038 → **SourceNote SN-01**: it is a bottleneck; it is a SPOF only if it also has no standby, with A-DSC-08 RDS Multi-AZ as the counter-example). Every component must scale out: database, cache, stateful and stateless services, API servers, load balancer, CDN (L-0039; the instructor relaxes it himself with L-0044 below). An autoscaling policy is not horizontal scalability (L-0040). Know your unit economics: how many requests one server handles, so you can scale linearly (L-0041, left as taught; A-DSC-09 follows as a separate sourced sentence: Google's SRE book measures capacity in CPU because request costs vary). Without per-server capacity you are playing with fire: leaking money, under- or over-provisioning (L-0042). Capacity varies by service, and every layer counts, not only API servers (L-0043). You may cut corners: a database that doesn't scale out is fine as long as it handles the load (L-0044).
- **Figure:** Fig 1·b "Check every layer" (new).
- **RecallQuestions §1:** (1) A friend's startup runs 40 autoscaled API servers in front of one database. Is it a distributed system in this chapter's sense, and what would you check first? (2) Why is "a layer that cannot scale out" not automatically a single point of failure? (3) Describe the day-zero loop in five steps, and say where low-level details come in.
- **Words:** 900

---

## 2 · Choosing a backend: load balancing algorithms
**Section dek:** the box every diagram has and nobody opens. What it promises, and three ways it picks a server, each tied to a kind of infrastructure and a kind of load.
**Sec-meta:** about 22 min · class 00:17–00:40, Q&A 00:33–00:40, 03:10
**Opening problem:** three API servers sit behind one load balancer. A request arrives. Which server gets it, and does it matter?
**RuleBox (§2):** "Pick the algorithm by ==your infrastructure and your load pattern==." Box body, the board's three lines: uniform infrastructure → distribute the load iteratively (round robin); non-uniform infrastructure → iteratively but as per weights; big variance in response times → the server with the least connections (L-0055, L-0062, L-0078). Sketch: three tiny LB → 3-server fans labelled `rr`, `wrr`, `lc`. The box sits at the end of 2.4, where the three choices are complete.
**Estimated words:** 3,600
**Q&A folded in:** persistent connections and least *active* connections (00:33:32) → 2.4. Hour-long requests over TCP, keep-alive, gRPC (00:34:19) → 2.6. Fifth request on a busy server, local optimization, data warehouses (00:35:45–00:37:21) → 2.4. Closed browser and resubmit; cancelling jobs (00:38:12–00:39:47) → 2.6. Round robin needs only one integer (03:10:25) → 2.2.

### 2.1 The box we take for granted
- **Opens with:** a diagram with one rectangle labelled "Load Balancer", assumed to work by magic.
- **Key points:** the load balancer is typically the core component that makes distributed systems possible, because it hides the many backend servers (L-0005). It is the one box drawn in every system and taken for granted, yet it is code someone wrote, so there is no reason to treat it as a black box (L-0046; board "we kind of take it for granted"). Build the intuition from first principles (L-0047). The instructor has changed algorithms in practice to get performance, so they are covered practically (L-0045, attributed). Advantages: fault tolerance and no over-clocked (overloaded) server (L-0049, board). A single point of entry: one domain name or IP that never changes, so clients don't need to know the servers (L-0050). Its job is to forward each request to one backend (L-0051), and the algorithm decides which (L-0052).
- **MarginNote** "From practice: when you must build your own": Flipkart runs private, on-premise data centres, so it had to build and scale its own load balancer; you may land in the same spot (L-0048, attributed, unverifiable). Skip unless you run on-prem.
- **Figure:** Fig 2·a (D-01 redraw) "One entry point".
- **Words:** 450

### 2.2 Round robin
- **Opens with:** three identical 4 GB servers, and requests 1, 2, 3, 4, 5, 6.
- **Key points:** round robin is the most common algorithm and the default almost everywhere: 1, 2, 3, 1, 2, 3 (L-0053). The LB remembers which server got the last request and sends the next one to the next server (L-0054); it needs no session service, just one integer, the index of the last backend (L-0345). Use it with uniform infrastructure and a uniform load pattern (L-0055). Uniform load means any API answers within a fixed range, say under a second, so it barely matters which server gets which request (L-0056). Then sending requests in turn spreads load almost equally; it is the easiest scheme (L-0057). Uniform infrastructure is true in most cases (L-0058, hedged as said).
- **CodeBlock:** the board/screen line `s.Index = (s.Index + 1) % len(s.Backends)` (also shown in 3.4).
- **Figure:** Fig 2·b panel a (D-02 redraw, round robin).
- **Words:** 400

### 2.3 Weighted round robin
- **Opens with:** one of the three servers has 8 GB instead of 4 GB.
- **Key points:** weighted round robin gives each machine a weight and sends requests in proportion (L-0059; A-DSC-07: nginx's default upstream method is weighted round robin, `weight` default 1). Non-uniform infrastructure happens, for example when reserved instances you already paid for would otherwise lose money (L-0060). With plain round robin on 4/8/4 GB, if the 4 GB machines run at 80% the 8 GB machine runs at about 40%: under-utilized (L-0061). Use weights 1:2:1 (L-0062). Every load balancer offers a set of algorithms with their own configuration; read its documentation (L-0063). If your cloud hides the option, raise a support ticket (L-0064, inline: managed LBs expose a fixed set, e.g. ALB round robin, least outstanding requests, weighted random; NLB is not configurable). It is always about money: does the infrastructure get used well? (L-0066). A 60 GB machine behind plain round robin is waste (L-0067). Saving money is a quantified impact, which makes the promotion pitch easy (L-0068, attributed opinion).
- **MarginNote** "The instructor's reserved-instance blunder": the team bought AWS reserved instances of different sizes, AWS would not change them, so instead of leaving them idle they put them into existing workloads with weighted round robin (L-0065, attributed). One line from the fact-check (A-LBL-13): standard Linux reserved instances can now be modified to other sizes in the same family, as long as the footprint stays the same. Skip unless you buy reserved capacity.
- **Figure:** Fig 2·b panel b (D-02 redraw, weighted; drawn from the 1:2:1 rule because the board's numbers are cut off).
- **Words:** 550

### 2.4 Least connections
- **Opens with:** an analytics service where one query answers in a second and the next takes two hours.
- **Key points:** three algorithms are covered, and the intuition carries to others; least connections is the one people take for granted (L-0069). On each request the LB picks the backend with the fewest connections from the LB (L-0070). Think of it like database connection pooling, with the instructor's own caveat: it is not actually a pool, just an example (L-0071). The LB counts active connections per backend; a finished request frees its connection (L-0072). Without pooling, an open connection means a busy server (L-0073, inline clarification + A-LBL-15: with keep-alive and multiplexing, an in-flight request, not an open connection, is what means busy; ALB multiplexes many client connections onto one backend connection). So least connections sends work to the least burdened machine and improves the odds of a quick answer (L-0074). High variance: some APIs take a second, some a minute, some an hour; analytics is the classic case (L-0075). Walkthrough: requests 1–3 go to servers 1–3; request 2 finishes in a second, so request 4 goes to server 2; if 4 is long, request 5 goes to server 1 (L-0076). Blunt round robin can pile long requests onto one already-busy server (L-0077). Rule: very large variance in response or processing time → least connections (L-0078; A-LBL-01: ALB's "least outstanding requests" is the managed version, recommended when requests vary in complexity). Q&A folded in: least connections needs no persistent connections to every backend; the LB can be stateless, or keep a pool and count only *active* connections (100 in the pool, 2 in use = 2 active) (L-0083). The worry "request 5 may land on a server still busy with an hour-long query" assumes a server runs one query at a time; if that is true you need more servers (L-0088). A tie is broken at random (L-0089; A-LBL-02 as a separate sentence: nginx breaks ties in weighted round-robin order). Least connections is a local optimization, and that is enough: with real workloads you have far more than three servers (L-0090). Data warehouses balance this way per BigQuery/Redshift docs (L-0091 → **SourceNote SN-02**: they face the same mixed-query problem but solve it with workload management and slot scheduling, not least connections).
- **StepThrough** Fig 2·c "Least connections, one request at a time" (L-0076 walkthrough). Then **AnimationClip `l08-rr-vs-leastconn`**. Then Fig 2·b panel c (D-02, least connections, as a static recap with the board's counts).
- **PauseAndThink P1** before the StepThrough.
- **RuleBox §2** at the end of 2.4.
- **TradeoffTable T1** "Three ways to pick a backend": columns Round robin · Weighted round robin · Least connections. Rows: what the LB remembers · infrastructure it suits · load it suits · state it needs · what goes wrong if misused · example. The red ✕ goes on round robin's "what goes wrong if misused" cell: "long requests pile onto one server". Ids L-0053, L-0055, L-0059, L-0062, L-0070, L-0077, L-0078, L-0345.
- **Words:** 1,050

### 2.5 Why not route on CPU?
- **Opens with:** the most common clever suggestion in class: "just send each request to the server with the lowest CPU".
- **Key points:** the LB knows nothing about backend CPU or memory, only its own connections; it has to stay extremely stateless, so connection count is the rough estimate of busyness (L-0079; A-LBL-19 as a separate sourced sentence: some LBs do use backend-reported load, collected asynchronously, e.g. gRPC's weighted round robin). Routing on CPU per request means another system, a query and history, so added network latency; a load balancer must be lightning fast (L-0080). Algorithms are heuristics because the decision must take microseconds, while gathering CPU from every server costs milliseconds (L-0081). Always think about practicality when you suggest a design idea (L-0082).
- **Speech bubble** (the §2 misconception) on the LB in Fig 2·c's last step: `CPU? I only see my connections.`
- **Words:** 350

### 2.6 Long requests and users who leave
- **Opens with:** "how can one HTTP request take an hour?", asked in class.
- **Key points:** an hour-long request need not be plain HTTP; think raw TCP: a TCP connection never breaks by itself, only through a network interruption or one side closing it (L-0084, **light inline clarification** of the simplified-medium item with A-DSC-01 and A-DSC-02: TCP itself never idles out, but LBs, NATs and firewalls on the path do, ALB after 60 s by default, so send keep-alives or a byte before each idle period; TCP keep-alives default to off and to at least two hours). HTTP tells both sides to close after the response, but keep-alive keeps the connection open; the instructor has had very long HTTP requests server-to-server, not from end users (L-0085, inline + A-DSC-03: HTTP/1.1 keeps connections open by default; 1.0 needed keep-alive). gRPC over HTTP/2 is the classic non-terminating connection (L-0086; A-DSC-04 as a separate sentence: gRPC sends HTTP/2 PINGs so proxies don't drop it). A user closes the browser and resubmits: the new request may land on another VM while the old job runs. Whether they get two results is business logic; with a broken TCP connection the response has nowhere to go, so do this kind of work asynchronously (L-0092). Ordinary web servers give no tool to stop a job when the client leaves, but you can build it, because the socket tells you when the connection breaks (L-0093, inline + A-DSC-05: Go's net/http already cancels the request Context on client disconnect; and a host that vanished sends no FIN, so you only notice on the next write or a keep-alive). Redshift and BigQuery let you cancel a long query (L-0094; A-DSC-06: cancellation is best effort and may still be billed).
- **MarginNote** "How can a request last an hour?" holds the TCP/keep-alive/gRPC detail (L-0084, L-0085, L-0086), so the main column keeps only one paragraph. Skip unless you run long requests through a load balancer.
- **RecallQuestions §2:** (1) Four servers of 4, 4, 8 and 16 GB, identical CPU per GB: which algorithm and which weights? (2) Why does least connections beat round robin for an analytics API, and what does it still not know? (3) Why doesn't the load balancer just ask each server for its CPU before routing?
- **Words:** 800

---

## 3 · A load balancer on one laptop
**Section dek:** strip the box down to what it really does: accept a TCP connection, open another, and copy bytes both ways. Then read the ten lines that do it.
**Sec-meta:** about 28 min · class 00:40–01:08, Q&A 01:04–01:08
**Opening problem:** one LB server at `10.0.0.1:9000`, three backends at `10.0.0.7–9:8081`, and a browser asking for `/index.html`. What exactly happens to the bytes?
**RuleBox (§3):** "There is a difference between ==building and scaling==: everyone can build it locally; few get to scale it." (L-0144). Box body: building a single-machine load balancer from first principles is just a mapping, "when I get something on this TCP connection, send it to that one"; scaling is a separate matter (L-0125). Sketch: a laptop outline with four tiny boxes inside (`:9090`, `:8081`, `:8082`, `:8083`).
**Estimated words:** 3,000
**Q&A folded in:** connection counts on disconnect (01:04:43) → 3.4. LB → API is raw TCP, not REST (01:05:46) → 3.3. `copy` until EOF (01:06:27) → 3.4. CDN in an hour (01:06:50) → 3.5.

### 3.1 Why build one
- **Opens with:** the instructor's first load balancer.
- **Key points:** the class walks a realistic LB design and briefly the source of a tiny load balancer the instructor wrote, to see the core logic instead of drawing boxes; it is in no way productionizable (L-0006). Drawing boxes anyone can do; the granular implementation is what sets you apart (L-0007). The core is hardly ten lines, "and even ten is an exaggeration"; an engineer wrote NGINX, which everyone now uses as a reverse proxy (L-0008). Implement everything you see, and you'll learn details most people don't know (L-0098). This cohort goes low level first, then the high-level picture, including why one server can't be the load balancer (L-0099). The design requirements on the board: balance the load, a tunable algorithm, scale beyond one machine (L-0087).
- **MarginNote** "The instructor's first load balancer": built in Go around March 2021, during COVID, while preparing the first cohort, to show a real demo; he had read a few papers but wanted the practice (L-0095). It balanced with consistent hashing, round robin, weighted round robin and static routing (L-0096). Benchmarked against Nginx and HAProxy it was 5–6× faster than Nginx, which turned out to be no breakthrough: Nginx and HAProxy do much more (L-0097, attributed). Skip unless you want the story.
- **Words:** 450

### 3.2 Two kinds of server, two TCP connections
- **Opens with:** the terms fixed before any drawing.
- **Key points:** LB server = the machine running the load balancer, itself a process (L-0100). Backend servers = where requests go (payment, auth, profile); a black box for the LB (L-0101). Spinning up a load balancer means a VM running a normal TCP server process, not even an HTTP server (L-0102). Day zero again: a single LB machine with static IP `10.0.0.1`; don't think about scale yet (L-0103, L-0104). Backends run any HTTP framework serving `hello world` on port 8081 (L-0105). To connect you need IP and port: `10.0.0.7`, `.8`, `.9` (L-0106). The LB keeps the list of backends, which is what you type into the cloud console (L-0107). A client sending a request means opening a TCP connection to the LB, so the LB listens on a port, e.g. 9000 (L-0108); the request reaches it because the client only knows the LB's address (L-0109). Backends accept HTTP on 8081, and HTTP runs over TCP (L-0110). The LB picks a backend by its algorithm, randomly in the simplest case (L-0111), then opens a second TCP connection to it: one request, two connections (L-0112). It keeps a map of source connection → target connection (L-0113), source = client↔LB and target = LB↔backend (L-0114). This is exactly how the instructor first thought of it: first principles, nothing fancy (L-0115). The map is an in-memory hash table; a database would be useless, because TCP connections live on this server (L-0116).
- **Figure:** Fig 3·a (D-03 redraw) "Two TCP connections per request".
- **Words:** 750

### 3.3 Copy one socket to the other
- **Opens with:** bytes arrive on TCP1. Now what?
- **Key points:** the LB looks up the map and forwards whatever it received to the target connection, bluntly (L-0117, inline: it copies a byte stream, not packets; the kernel re-segments). It doesn't care what protocol is inside: HTTP, WebSocket, RTMP, ICMP; it reads one socket and writes the other (L-0118, inline: protocol-agnostic only for protocols carried over TCP, so ICMP and UDP-based protocols can't pass a TCP proxy). The backend sees a well-formed HTTP request, answers on its connection, and the LB copies the answer back on TCP1 (L-0119). Read client → write backend, read backend → write client: that is the whole load balancer, two lines (L-0120). A second client gets its own pair, TCP3 → TCP4 (L-0121). Q&A: there are no REST calls between LB and API server, just a TCP connection, and the LB copies anything across (L-0139). It is "just a mapping" (L-0125; also the RuleBox body).
- **StepThrough** Fig 3·b "One request through the proxy".
- **Words:** 450

### 3.4 Reading the code
- **Opens with:** the instructor's Go load balancer, `lb.go` in the ARLB repo ("experimental reverse proxy and load balancer").
- **Key points:** the LB listens on 9090; four backends are hardcoded, Flask hello-world processes on four local ports (8081–8084 on screen) (L-0126). The main loop calls `listener.Accept`, wraps each connection with a request ID and hands it to `proxy` (L-0127). `proxy` first asks the strategy for the next backend and dials it (L-0128). With two connections, call `copy` twice, request and response, each in its own goroutine (L-0129). `copy` blocks until the connection ends; without its own goroutine, the response would never be read (L-0130); it copies until EOF (L-0140), so the two copies run in parallel, one per direction (L-0141). The implementation isn't efficient: it spins up as many goroutines as it likes (L-0131). Strategies: round robin, static, hashed; round robin is `(index + 1) mod n` (L-0133). The consistent-hashing strategy is a bit longer but still simple; the instructor's blog covers it (L-0134; BackLink: consistent hashing is used again in Lecture 9). A run loop listens on an events channel for exit, backend add and strategy change (L-0136). Keep an algorithm configuration, and pick per connection (L-0124). Q&A: this LB keeps no connection counts, only requests handled per backend (to check round robin works) (L-0137). You learn a connection ended because it "raises a panic/exception" you can catch (L-0138, inline: in Go nothing panics; `io.Copy` returns, nil at EOF or an error, and that return is where you update counters).
- **CodeBlock** (from the screen, trimmed to about 15 lines): `ln, _ := net.Listen("tcp", ":9090")` · accept loop · `backend := lb.strategy.GetNextBackend(req)` · `backendConn, err := net.Dial("tcp", backend.String())` · `go io.Copy(backendConn, srcConn)` · `go io.Copy(srcConn, backendConn)`. Comment line: `// two goroutines: each io.Copy blocks until EOF`.
- **Words:** 700

### 3.5 Build it locally
- **Opens with:** "I don't have three servers." You don't need them.
- **Key points:** run the LB as a process on port 9000 and the backends on 8081, 8082, 8083 of the same laptop; no cloud, no VMs, no Docker (L-0123). With basic networking it is a five-hour project; everything else is the strategy (L-0132). Be curious: you may have to write a lightweight proxy because existing ones aren't fast enough (L-0135). Even a (non-distributed) CDN is buildable in an hour if you know how content is served and cached; it is hard to scale, not to build (L-0142; ForwardChip: CDN in depth, Lecture 7, L-0143). Building and scaling differ: Docker started with someone building locally, and only scaling needs many machines, so there is no excuse not to build (L-0144 → RuleBox).
- **Figure:** Fig 3·c "One laptop, four processes" (new, small).
- **PauseAndThink P2** at the end of 3.5 (the connection ceiling; it hands over to §4).
- **RecallQuestions §3:** (1) Name the two TCP connections behind one proxied request and the one data structure the LB needs. (2) Why does each `io.Copy` run in its own goroutine? (3) Can this load balancer forward a WebSocket? A DNS query over UDP? Why?
- **Words:** 450

---

## 4 · The control plane: keeping every LB server right
**Section dek:** one LB server runs out of connections, so you run many. Now each needs the same configuration, fresh, all the time. Configuration, health checks, pushing changes, and watching the LB servers themselves.
**Sec-meta:** about 32 min · class 01:08–01:40, Q&A 03:01–03:34
**Opening problem:** one LB server holds two TCP connections per client. With a 10,000-connection budget it serves at most 5,000 clients (L-0122, L-0145). You need many LB servers, and every one must know the backend list.
**RuleBox (§4):** "Make systems ==reactive rather than polling-based==." (L-0181). Box body: on a change event, the LB server either uses the pushed config or pulls the latest from the database; that part is an implementation choice. Sketch: a clock with a red stripe (polling window) crossed out, next to a lightning arrow into an LB box.
**Estimated words:** 5,200
**Q&A folded in:** ZooKeeper notifications vs Redis Pub/Sub (03:01:09–03:02:59) → 4.5. Prometheus vitals vs health checks (03:12:52) → 4.6. Why Redis Pub/Sub; SSE as an alternative (03:13:41) → 4.5. Heartbeats = online indicator (03:15:09) → 4.3. Prometheus resources, read load, scaling, storage (03:23:28–03:27:14) → 4.6. Who sends the heartbeat; endpoint in config; success codes; what /health checks; why backends don't push (03:28:44–03:32:15) → 4.3. Autoscaling as its own component (03:32:51–03:33:25) → 4.6.

### 4.1 One LB server is not enough
- **Opens with:** the 2X-connections arithmetic.
- **Key points:** an LB server manages two TCP connections per client request, which is why one is not enough and LB servers must scale horizontally (L-0122; A-LBL-14 as a separate sourced sentence: on Linux the ephemeral port range lets one LB IP open about 28k connections to one backend ip:port). The LB servers themselves need horizontal scaling, and the brainstorm also shows how load balancers are scaled internally (L-0145). The brainstorm has four factors: LB configuration, monitoring, availability, extensibility (L-0146).
- **Figure:** Fig 4·a "Half the budget goes to backends" (new).
- **Words:** 300

### 4.2 Where the configuration lives
- **Opens with:** three new LB servers boot. How does each learn the backend list?
- **Key points:** the configuration stores IP and port of every backend (L-0147). The bare minimum is the algorithm plus the backend list; you can make it infinitely fancier later (L-0148; board block `{ b.servs: [ip:port], balancy: algo, health_endpoint }`). Store it in a database as a simple start (L-0149). The LB must add as little latency as possible: a DB call per request makes every request slower (L-0150), and a DB call costs about 3–5 ms, too much to pay per request (L-0151). So each LB server pulls the config at startup and keeps an in-memory copy; requests are routed with no network call (L-0152). In the demo code it is just an in-memory list (L-0153). The catch: the copy goes stale when the config changes, for example when a backend dies (L-0154).
- **Figure:** Fig 4·b (D-04 config-stage redraw) "An in-memory copy of the config".
- **Words:** 550

### 4.3 The orchestrator and health checks
- **Opens with:** backend 2's process just crashed. Who notices?
- **Key points:** first you must detect it: a health check service is the direction (L-0155). The component that runs health checks is the **orchestrator**, the mastermind of the LB system (L-0156). "Up" means the backend's dedicated health endpoint, not every user request, returns 200 (L-0157). One idea raised in class: skip the special endpoint and use a lightweight ping or a TCP ping (L-0158, open in class; the next sentences give the class's reason for an explicit endpoint). A VM runs hundreds of processes (SSH, nginx, other HTTP servers); only the web server you balance matters, e.g. the profile service on 8081 (L-0159). Every HTTP server you build should expose `/status` or `/health` (L-0160). The health endpoint is part of the LB configuration, next to the algorithm (L-0161). VM up is not enough: the process can crash on divide-by-zero or a null pointer while the VM is fine; check the service, not the server (L-0162). The orchestrator fires continuous HTTP checks and needs a 200 (L-0163; HTTP is a simplification). It reads the config DB to know servers and endpoints, and when a check fails it updates the DB, removing the dead backend (L-0164; A-LBL-03 as a separate sentence: AWS ALB fails open and routes to all targets if every target fails its checks). Same building block as the online/offline indicator (L-0165, L-0350; BackLink Lecture 1). Q&A folded in: backends do not send heartbeats; the orchestrator asks, and `/health` only receives (L-0371). The success status is configurable: 200, 300, sometimes even 400 (L-0372). What `/health` verifies is the service owner's call: most return OK if the web server runs, some also ping the database (L-0373, + A-LBL-04: a deep check on a shared dependency can fail every server at once). Why not push: the app doesn't know the orchestrator's IP, as with the online indicator (L-0374); a self-report can say "up" while the process is down (L-0375, hedged, as taught); and a heartbeat thread is far more complex for developers than an endpoint, so keep their life simple (L-0376). Further reading: φ-accrual failure detection (L-0223).
- **Figure:** Fig 4·c "The orchestrator asks; backends answer" (D-04 orchestrator part, `hb` arrows orchestrator → `/health`, B Srv2 struck).
- **PauseAndThink P4** (push or pull heartbeats).
- **Words:** 1,050

### 4.4 Getting the change to every LB server
- **Opens with:** the orchestrator has updated the database. Every LB server still routes from its old in-memory copy.
- **Key points:** the key problem: how does a DB change reach every LB server's in-memory map? (L-0166). Naive: each LB server polls the DB; not optimal (L-0167). It is tempting to think the cost is extra load or latency on each request; in fact the main cost is staleness, next. An event-based idea: let the change itself trigger a message (L-0168). Polling every 10 s: a backend that dies one second into the interval gets requests for the remaining nine (L-0169; A-LBL-05: nginx's passive checks mark a server down after real request failures, which shrinks this window between checks). Because the LB routes from memory without asking the DB, a stale copy means failed user requests for that whole window: an error-rate spike; that is why polling can't be used (L-0170). Push: reserve a second port on the LB server (9091, the "meta" port beside 9090); whoever changes the config calls it, and the handler pulls the new config from the DB (L-0171). A separate "LB handler" service was proposed; rejected: why one more service, when the orchestrator or the LB can do it (L-0172). Changes come from developers too, through LB console APIs (add backends, change algorithm, health check) (L-0173). With push, the update is near immediate (L-0174). There is no one right answer: the push call and the next idea each fit some situations (L-0175). The goal is almost zero staleness, so every change is pushed immediately (L-0176).
- **PauseAndThink P3** before the clip. **AnimationClip `l08-stale-config`**. **Figure** Fig 4·d "Poll vs push" (D-04 timeline redraw + meta port; static twin of the clip).
- **Words:** 750

### 4.5 Make it reactive: Pub/Sub and CDC
- **Opens with:** fifty LB servers. Does the orchestrator call fifty meta ports?
- **Key points:** the same problem came up in Slack's real-time design: polling couldn't be trusted and membership changes had to be pushed (L-0177; BackLink Lecture 4). One implementation: a real-time Pub/Sub such as Redis; a DB change pushes a message to the broker, for example via CDC, and every LB server listens (L-0178; its delivery caveat is SN-03, below). CDC is only a sneak peek here (L-0179; ForwardChip Lecture 9). The message can come from the orchestrator, the LB console, or the database through CDC (L-0180). Make systems reactive rather than polling-based; on an event use the pushed config or pull the latest (L-0181 → RuleBox). Two reactive options: an explicit call asking the LB to pull, or Pub/Sub pushing the config; either way the LB updates its in-memory copy (shared memory between its processes) (L-0182). The broker guarantees delivery of config changes to all LB servers (L-0227 → **SourceNote SN-03**: Redis Pub/Sub is at-most-once; pair it with a re-pull on reconnect or use Streams; A-LBL-06). Because each LB server routes from a pushed in-memory copy, load balancing loses no performance (L-0228). Q&A folded in: Redis Pub/Sub was chosen because it broadcasts in real time out of the box; otherwise one process calls every server; any real-time broadcast works: SSE, ZooKeeper, explicit HTTP calls (L-0349; BackLink Lecture 2 for SSE). ZooKeeper can replace Redis Pub/Sub: it has a distributed config store that notifies everyone on change, over persistent connections (L-0331; A-LBL-17 as a separate sentence: standard watches are one-time triggers, and 3.6+ adds persistent watches). Its notification framework is real-time Pub/Sub over a pool of TCP connections, so the design works with either (L-0332).
- **Figure:** Fig 4·e "Three ways a change reaches the LB servers" (D-04/D-05 redraw: meta-port call; Pub/Sub fed by orchestrator/console/CDC).
- **TradeoffTable T2** "Getting a config change to every LB server": columns Poll the DB · Call the meta port · Pub/Sub (Redis) · ZooKeeper watch. Rows: who starts it · staleness · extra moving parts · what if an LB server is offline at that moment · from class. Red ✕ on Poll's staleness cell: "up to one interval of requests to a dead backend". Pub/Sub "offline" cell: "misses it; re-pull on reconnect (SN-03)". Ids L-0167, L-0170, L-0171, L-0178, L-0227, L-0331.
- **Words:** 850

### 4.6 Watching the LB servers: metrics and Prometheus
- **Opens with:** an LB server at 95% CPU. Who adds another?
- **Key points:** someone must watch the LB servers too, not only for health but for overload (CPU, memory, …): the orchestrator (L-0183). On high CPU it adds an LB server, and removes one when load drops (L-0184). It needs vitals per LB server: CPU, memory, network, disk (L-0185; board also "# TCP connections"). Tempting: the orchestrator calls each LB server for its current numbers; but a point-in-time reading is not enough (L-0186). Scaling needs history, so a rising trend can be acted on (L-0187). Don't limit monitoring to the orchestrator and the LB: you want infrastructure-wide trends, stored somewhere (L-0188). Not in the config DB: config is key-value, metrics are time series (L-0189). Asking at the moment is too late: at 100% a server may not even answer; react at 60, 70, 80% using trends (L-0190). An orchestrator DB fed by LB heartbeats re-implements what exists (L-0191): always reuse existing tools (L-0192). "Connection pooling" as the collector was dismissed (L-0193). Vitals are metrics to log, with scaling on top; one team uses CloudWatch and scales manually, the right kind of tool (L-0194, "From practice"). A telemetry agent is a process on each host emitting its metrics (L-0195). Don't go into alarms here (L-0196). Prometheus is brilliant and scales amazingly; see prometheus.io (L-0197). Think about the whole organization, not just this system, and you reach the cost-efficient answer (L-0198): one central place where vitals of every VM, backend and LB alike, are ingested and queried (L-0199). Agents on every VM push to Prometheus; the orchestrator periodically checks averages and scales LB or backend servers (L-0200, inline + A-LBL-08: Prometheus pulls (scrapes) exporters; push goes through a Pushgateway for short jobs). That is what AWS autoscaling policies do: a rule like "average CPU above X", evaluated against a metrics store (L-0201; BackLink Lecture 2; A-LBL-16 target tracking). Users can't see LB servers, so the orchestrator scales them itself (L-0202). Recap so far: low-level details, config store, reactive updates, health checks, an orchestrator that scales, telemetry into Prometheus (L-0203). Q&A folded in: Prometheus is for vitals; health checks stay separate because vitals stores don't generally health-check, and the design must not depend on one that does (L-0348; A-LBL-18: Prometheus does record `up` per target). Learn Prometheus from its official docs: well written, easy to set up, Go-based, easy to extend (L-0365). Read load is small: one orchestrator reading the last 30 minutes, so one Prometheus can serve 50–100 load balancers if you know its capacity (L-0368). Prometheus scales out easily by running more query servers and replicating storage (L-0369 → **SourceNote SN-04**). It mostly uses InfluxDB in the backend, TimescaleDB optionally (L-0370 → **SN-04**: Prometheus has its own local TSDB; InfluxDB/TimescaleDB attach only through remote write/read; A-LBL-07). Autoscaling is its own service in the design because customers configure policies through their own UI; the orchestrator scales LB servers, and backend scaling can be done by the orchestrator or by that component (L-0377); whether to split it depends on how bulky the orchestrator gets, and a policy-config endpoint is needed anyway (L-0378).
- **Figure:** Fig 4·f "Vitals flow into one place" (D-05 second form redraw).
- **ForwardChip:** CDC in depth · Lecture 9 (L-0179).
- **RecallQuestions §4:** (1) Your LB servers poll the config DB every 30 s. A backend dies. For how long can users get errors, and what two designs shrink that to near zero? (2) Why store metrics in Prometheus rather than the config database? (3) Give two reasons the orchestrator calls `/health` instead of waiting for backends to report in.
- **Words:** 1,400

---

## 5 · One name, many LB servers
**Section dek:** clients know one address, but there are now many LB servers. DNS, private DNS, the finished design with its two paths, and who keeps the keeper alive.
**Sec-meta:** about 30 min · class 01:40–01:59, Q&A 01:54–01:59 and 03:06–03:36
**Opening problem:** you now run two LB servers, `10.0.0.1` and `10.0.0.2`. The client only knows `10.0.0.1`. How does any request ever reach the second one? (L-0204)
**RuleBox (§5):** "DNS is ==not a proxy==: given a name, it returns an IP address, nothing more, nothing less." (L-0219). Box body: the client then connects to that IP itself (L-0218); "DNS is a stupid service: it just stores a hash map" (L-0339). Sketch: client ⇄ DNS (lookup, answer), then a separate blue arrow client → LB.
**Estimated words:** 4,300
**Q&A folded in:** stale local DNS cache (01:54:20) → 5.2. CoreDNS availability, DNS for CoreDNS, traceroute levels (01:55:46–01:56:55) → 5.3. External users and public DNS; public LBs (01:56:55–01:57:58) → 5.6. One LB per homogeneous service (01:59:01) → 5.7. DNS doesn't route by load; active-passive; "stupid service" (03:06:24–03:08:34) → 5.2. Orchestrator updates DNS (03:07:53) → 5.2. Sessions and consistent hashing; network hops (03:08:50–03:10:25) → 5.7. CoreDNS has no brain (03:11:03–03:11:19) → 5.2. Orchestrator SPOF, leader election, stateless followers, global monitor (03:15:44–03:35:30) → 5.5. API gateway, private/public, layers (03:17:59–03:21:49) → 5.6. LB = reverse proxy; auth (03:21:20–03:23:28) → 5.7.

### 5.1 Two LB servers, one address
- **Opens with:** the problem above.
- **Key points:** DNS: the load balancers are mapped in DNS, which hands out one of the LB servers (L-0205). The entry holds machine IPs (`10.0.0.1`, `10.0.0.2`), not ports (L-0206). It is tempting to think every load balancer is public; in fact a load balancer in front of a critical internal service should not be, and a private LB can't be one server either ("what if that goes down?") (L-0207). Handing clients one LB machine's IP doesn't scale: an IP is fixed to a machine and two machines can't share it (L-0208, inline + A-LBL-11: virtual IPs can move between machines, and Maglev serves one IP from many machines via ECMP; DNS with many IPs is one valid approach). A domain name abstracts many IPs; every load balancer gets its own, e.g. `payments.lb.google.com` (L-0209). Misconception: DNS means public DNS; it can be private, and the LB's domain is private (L-0210). Work on an SRE team for at least a year and a half; it teaches things like private DNS (L-0211, attributed advice). You can run your own DNS server, a light process; CoreDNS is a good open-source one used across Kubernetes (L-0212). A private CoreDNS runs in your infrastructure, every machine uses it as its resolver, so it resolves every name they look up (L-0213). Cloud providers run many DNS servers configured this way (L-0214).
- **Figure:** Fig 5·a "One name, many LB servers" (D-04 left part redraw: CoreDNS, `payments.lb.google.com → 10.0.0.1, 10.0.0.2, 10.0.0.3`).
- **PauseAndThink P5** at the end of 5.1 (does DNS forward the request?).
- **Words:** 700

### 5.2 DNS answers; it doesn't forward
- **Opens with:** "if every request goes through DNS, isn't DNS the new bottleneck?", asked in class.
- **Key points:** with many IPs for one name, DNS picks one with the same kinds of strategy: round robin, weighted (L-0215; A-LBL-20 as a separate sentence: CoreDNS's `loadbalance` plugin shuffles the order of the records it returns). The answer goes to the client, which connects and the normal LB flow takes over; this is what happens behind every HTTP request (L-0216). If all requests went through DNS it would be a bottleneck acting as a load balancer; "multiple DNS servers" just moves the problem (L-0217, open in class; the premise dissolves next). Correction: DNS does not pick an LB and forward the request; then DNS would *be* the load balancer; it sends the IP back and the client makes the request (L-0218). DNS is a name-resolution service, not a proxy (L-0219 → RuleBox). The client caches the resolved IP for a while (L-0220). The anyone-can-be-a-client point: another microservice resolving a name is a client too (L-0224). Scaling the LB tier = the orchestrator spins up an LB server and adds its IP (`10.0.0.3`) to the DNS entry; it knows all LB IPs, so this is automatic (L-0221; A-LBL-09: AWS ELB does exactly this with a 60 s TTL). A cached IP pointing at a dead LB server: the client doesn't wait for the TTL; when it can't connect it invalidates and asks again (L-0231) — like a toothache: you don't wait for your next dentist visit (L-0232). DNS doesn't route to another LB when one is loaded; it holds name → IPs and round-robins with no load information (L-0337). Active-passive: DNS holds only the active LB's IP, or weights 0 and 1 (L-0338; A-LBL-10: Route 53 answers with weight-0 records only when all others fail). "DNS is a stupid service: it stores a hash map" (L-0339). CoreDNS holds the array of LB IPs against the name (L-0346). Worry: doesn't CoreDNS round robin recreate the LB bottleneck? No: CoreDNS has no idea about load, picks an IP ("at random" here, "round robin" earlier, both kept as said), has no brain, and is about 50 lines for this (L-0347).
- **StepThrough** Fig 5·b "Resolve, then connect".
- **Speech bubble** (the §5 misconception) on DNS in step 3: `I just hand out addresses.`
- **Words:** 950

### 5.3 Who keeps DNS up?
- **Opens with:** CoreDNS is now on every request's path. Is it the new single point of failure?
- **Key points:** no: you run several CoreDNS servers (L-0233). Which one to reach? DNS for CoreDNS, recursively, until the load is so small one server handles it: one node with a standby, the base condition of the recursion (L-0234, "latency" as heard, probably load; inline: DNS doesn't bottom out in one server; resolvers list several nameservers, and the root is 13 identities on about 2,047 anycast instances). A traceroute to google.com shows about 21 levels; every level scales horizontally except one tiny SPOF with a standby that takes over in seconds (L-0235). Explore CoreDNS hands-on: set it up, configure a domain, read its docs, use it privately, then think about exposing it (L-0355, inline: the CoreDNS manual has no dedicated production/HA guide; it covers install, plugins, configuration and examples).
- **MarginNote** "See it yourself: a private DNS in ten minutes" (L-0355 as a how-to). Skip if you've run CoreDNS.
- **Words:** 400

### 5.4 The whole design
- **Opens with:** put every piece on one page.
- **Key points:** final design: many LB servers, an orchestrator, the config DB, an LB console for developers, Prometheus receiving vitals from all servers; the orchestrator queries Prometheus, scales LB servers and writes entries to CoreDNS (L-0222). Request path: the name (`lb.payments.google.com`) resolves via CoreDNS, the client connects to that LB server, the LB picks a backend by its strategy, the backend answers back through it (L-0225). Config path: any change (failed check, autoscaling, developer) updates the DB; CDC, the LB or the orchestrator publishes to Redis Pub/Sub, which reaches every LB server's in-memory copy (L-0226). Much of this design comes from Google's Maglev paper, "A fast and reliable software network load balancer": easy reading, and one of the first papers the instructor read (L-0229). Some pieces floating around are previews of later weeks (L-0230).
- **Figure:** Fig 5·c (D-06 redraw) "The finished load balancer" with two traced paths (request path blue with ①–⑤, config path dashed graphite with Ⓐ–Ⓓ). Mobile: two separate panels, one per path.
- **Words:** 450

### 5.5 Who watches the watcher?
- **Opens with:** the orchestrator now updates the DB, DNS and the LB fleet. What if it goes down?
- **Key points:** the orchestrator would be a SPOF, and downtime is not fine: leader–follower, one master plus followers doing grunt work, and if the master dies a follower takes over in one or two seconds: leader election (L-0351). Proposed in class: three identical orchestrators, two idle; refined: not idle, followers do work (L-0352). Every component is highly available: backends via autoscaling, LB servers, the DB, the orchestrator via leader election, CoreDNS via leader election (L-0353, inline: CoreDNS is stateless; you run several replicas, and clients list up to three nameservers; no leader election). Leader election replaces a human spinning up a replacement: automatic takeover (L-0354; A-DSC-12: ZooKeeper's recipe, the lowest ephemeral sequential znode leads, and its watcher takes over). Followers need no replicated state: the orchestrator is stateless, and all state lives in the DB (L-0366). After failover the new leader just starts sending health checks; servers answer whoever asks (L-0367). Who monitors and scales the orchestrator? It runs as one master plus followers, so as a whole it never goes down (L-0379). Above it, as in any infrastructure, a global monitor (Prometheus-like) watches all VMs and the master orchestrators, with its own leader and minimal duties, and a standby (L-0380, referent of "that going down" left as unclear). It is the base condition of the recursion: an orchestrator for the orchestrators, final because its job is tiny (L-0381).
- **Figure:** Fig 5·d "Base of the recursion" (new).
- **ForwardChip:** leader election appears again later in the course (no lecture in this series covers it in depth; the chip says "later in the course").
- **Words:** 600

### 5.6 Public front doors, private load balancers
- **Opens with:** a customer types `payments.google.com`. Do they ever see `lb.payments.google.com`?
- **Key points:** external users resolve through the public DNS configured in their OS, e.g. Route 53, not your private CoreDNS (L-0236, inline: through a public recursive resolver that asks the authoritative DNS). A load balancer serving external users is public, and resolution is public DNS (L-0237). Adding LB servers "kind of" updates public DNS, but there is an intermediate proxy layer, seven layers in all, kept out to stay simple; the details are proprietary, and Maglev explains more (L-0238). The design oversimplified: LB servers are not the first layer; more machines and proxies sit in front, and the architecture decides what is public (L-0356). You expose `payments.google.com`; public DNS points to the API gateway, the user's TCP connection ends there, and the gateway's config forwards a path to a particular load balancer (L-0357). Private CoreDNS comes in when the gateway connects to the LB by name: gateway public, LB private (L-0358). The gateway is usually not the first entry either; three or four proxy layers can sit in front (L-0359). On AWS/GCP you *can* put the LB address in public DNS and skip the gateway, which is fine; in practice you expose payments and keep LBs private; whoever connects to LB servers talks to private DNS (L-0361). A summary offered in class, "choose what has least configuration and accepts a compromise under partition", got no reply and is left as the class's open thought (L-0360).
- **Figure:** Fig 5·e "Public front door, private load balancer" (new).
- **ForwardChip:** the extra proxy layers ("seven more") were not covered; read Maglev (L-0238, L-0356).
- **Words:** 550

### 5.7 What a load balancer is, and is not
- **Opens with:** three requests from class: put sessions in the LB, put auth in the LB, and is an LB the same as a reverse proxy?
- **Key points:** a load balancer balances across a homogeneous set of servers; it is not an API gateway; each service has its own LB, LB servers and CoreDNS entries (L-0239). Sessions: route a user's requests to the same server with consistent hashing in the LB, rather than adding a session service that costs a network hop (L-0340; A-LBL-12 as a separate sentence: nginx's `hash $key consistent` remaps only a few keys when servers change). Consistent hashing isn't a service: it is an array in the LB's memory (L-0341). Don't add boxes for their own sake: every service is a network hop; find the shortest path unless there is a very good reason (L-0342). Each hop adds roughly 3–5 to 10 ms; at scale teams fight for every microsecond (L-0343; A-LDA-17 as a separate sentence: a round trip inside one datacentre is about 0.5 ms, so a 3–10 ms hop budget is mostly serialization, TLS, queueing and handler time). A good architecture the instructor saw had four microservices and handled petabytes (L-0344, attributed). Load balancers are reverse proxies; reverse proxy is the generic term (L-0362). API gateways are "powered proxies" (L-0363). Authentication is not the LB's job; it is business logic (is this really A paying B?), so the backend answers with errors such as 404 or 403 (L-0364; A-LBL-21 as a separate sentence: AWS ALB can authenticate users through OIDC or Cognito before forwarding).
- **MarginNote** "From practice: four services, petabytes" (L-0344). Skip unless you're arguing about microservice count.
- **TradeoffTable T3** "Who does what in the finished design": columns DNS (CoreDNS) · LB server · Orchestrator · Prometheus · Pub/Sub. Rows: holds · decides · on the request path? · if it dies · how it stays up. Red ✕ on DNS's "decides" cell: "nothing about load". Ids L-0219, L-0222, L-0226, L-0339, L-0351, L-0353, L-0369.
- **RecallQuestions §5:** (1) Walk the request path for `lb.payments.google.com` in four steps, and mark which step DNS is not part of. (2) A cached IP points at a dead LB server. What does the client do, and why not wait for the TTL? (3) Why can the orchestrator's followers take over in seconds without copying any state?
- **Words:** 650

---

## 6 · Remote locks
**Section dek:** three consumers, one queue that protects nothing, and no access to its server. Lock across machines through the network: what to store, why it must expire, and how not to delete someone else's lock.
**Sec-meta:** about 30 min · class 02:05–02:35, Q&A 02:35–03:06
**Opening problem:** queue 7 is remote and dumb: its only API is `pop`, which is not thread safe. Three consumers on three machines may get the same message. Only one may read at a time (L-0248, L-0249).
**RuleBox (§6):** "To synchronize two things, use ==the nearest storage they share==." (L-0308). Box body, the board's ladder: threads → memory (mutex, semaphore), processes → disk, machines → the network (a remote lock) (L-0246). Sketch: three rows, two small boxes per row joined by a RAM chip, a disk, and a network cloud.
**Estimated words:** 5,000
**Q&A folded in:** single-connection TCP server lock (02:35:49–02:38:00) → 6.7. MySQL as lock store, cron TTL (02:38:50–02:39:20) → 6.4. Lua/EVAL, client stays Python (02:39:39–02:40:14) → 6.6. OCI visibility; real queues' guarantees (02:40:45–02:41:20) → 6.3. Consumer could skip the lock (02:42:07) → 6.3. MongoDB transactions (02:43:16–02:44:03) → 6.8. Nearest shared storage; two distributed systems (02:44:59–02:46:31) → 6.2. TTL bounds hold time (02:47:43) → 6.4. Mutex vs network lock; single server → mutex (02:48:24–02:49:38) → 6.2. ZooKeeper vs Redis (02:59:55–03:03:45) → 6.7. Reading many messages; SQS 10; week 7 (03:04:08–03:05:49) → 6.3.

### 6.1 Why lock across machines
- **Opens with:** two distributed transactions both trying to update the same row.
- **Key points:** distributed locking is needed because processes must coordinate to keep data consistent: one transaction must stop the other (L-0010). Remote and distributed locks are the heart of data correctness in distributed systems (L-0011). The order here: why you need a lock (the more important question), then how to build it with Redis (L-0012). Beyond Redis, what matters is the core property a store needs to act as a lock manager, so you could build your own (L-0013). Last week's airline check-in locked rows inside one database (BackLink Lecture 3); here the example is a deliberately hypothetical synchronization problem (L-0014). A lock manager is a remote machine that tracks which item is locked by which machine (L-0241). In the airline check-in, the database kept lock ownership in its own memory, one machine and one process; many machines need a remote lock manager (L-0242).
- **Figure:** Fig 6·a part 1 (D-07 redraw, lock manager with three machines).
- **Words:** 450

### 6.2 Threads, processes, machines
- **Opens with:** the instructor's first-year experiment: two `apt-get upgrade` runs side by side, "to go twice as fast".
- **Key points:** threads synchronize through memory: mutex, semaphore, explicit locks, atomic instructions; each database transaction in the check-in system is a thread (L-0243). Around 2008–09, in the first year of college, on Ubuntu, the second `apt-get` failed: the dpkg lock exists (L-0244, attributed; the fact-check notes the file is `/var/lib/dpkg/lock`). apt-get synchronizes processes through the disk: lock file exists → exit; else create it, work, delete it (L-0245, inline + A-LDA-16: it is an fcntl lock on that file, which the kernel drops when the process exits, so a crash leaves no stale lock). Threads → memory, processes → disk, machines → network (L-0246). Practical examples beat theory (L-0247). Q&A folded in: the principle restated in class, "look for the nearest storage two entities share", endorsed: "anything over a network" (L-0308 → RuleBox). Two separate distributed systems still share a network, so the same shared store applies (L-0309). It is tempting to think a mutex is harder than a network lock; in fact a mutex is two lines in C, because everything is in one RAM (L-0311). The network is the costliest channel; in-memory signalling is peanuts, so prefer it any day (L-0312). If the critical section is on one server, use the local primitives; you don't need Redis (L-0313).
- **Figure:** Fig 6·a part 2 "The sharing ladder" (board S56 redraw + `apt-get` inset).
- **PauseAndThink P6** (what do machines share?).
- **MarginNote** "The instructor's `apt-get` story" (L-0244). Skip unless you like the origin.
- **Words:** 750

### 6.3 A queue that protects nothing
- **Opens with:** the opening problem, drawn (Fig 6·b).
- **Key points:** the queue is hypothetical and gives zero protection: any consumer that asks gets the message (L-0248). Requirement: three consumers, only one reads at a time; throughput doesn't matter (L-0249). Rejected ideas, each with its reason: a synchronized block (the queue is remote, consumers on other machines) (L-0250); a lock on the queue's server (black box, no access) (L-0251); a gatekeeper layer in front ("one more layer"; the aim is a lock manager) (L-0252); another process on the queue's machine (black box) (L-0253). Since the queue only offers an unprotected network API, the protection must be built (L-0259). Q&A folded in: some real queues, e.g. OCI's, hide a received message from others for a time; that's those queues, not this example (L-0302; BackLink: SQS's visibility timeout was covered in Lecture 2). Real queues such as RabbitMQ, SQS and Kafka give the "not to two consumers" guarantee, so you build nothing (L-0303 → **SourceNote SN-05**: they keep two consumers from receiving a message *at the same time*, but they are at-least-once, so redelivery happens and processing must be idempotent; A-LDA-13). "A consumer could just read without the lock": nothing ties Redis to the queue; the protection holds because we write the consumer code, which takes the lock first; that is the problem statement (L-0304). Can one consumer read many messages in parallel? Depends on each queue's guarantees; this one allows one (L-0334); SQS lets a consumer read 10 per call (L-0336). How queues serve many consumer threads is queue-internal (L-0335; ForwardChip: building your own message broker, week 7, beyond this series).
- **Figure:** Fig 6·b (D-08 first form redraw) "Queue 7 and three consumers", with the board's red arcs as the failure (two consumers reading at once).
- **PauseAndThink P7** (the puzzle) before the rejected ideas.
- **Words:** 750

### 6.4 A database as lock manager, and why locks must expire
- **Opens with:** a shared table with one row per resource.
- **Key points:** use a database: key `Q7`, value = the consumer allowed to read; others see a different name and wait (L-0254). The holder removes its name when done; the rest race to write theirs (L-0255). A classic lock manager stores two things: the resource and its owner (L-0256). If a holder dies before deleting, the lock is held forever, so every lock needs a TTL (L-0257). The store must give key-value access, atomic instructions and TTL; Redis gives all three, which is why the common remote lock is Redis-based, "Redlock" (L-0258, inline: the single-instance Redis lock is the common one; Redlock is its multi-instance version, §7). How the store was chosen: what to store → the edge case → required features → only then a database (L-0260). Redis and DynamoDB are both choices; Redis is popular because it is in memory (L-0262). Lock entry: `queue7 : consumer 2`, expiring in 5 minutes (L-0263). Q&A folded in: MySQL works, a row plus atomicity, if you handle TTL (L-0296; A-LDA-11 as a separate sentence: MySQL's built-in `GET_LOCK()` is released when the holder's session ends, on one mysqld). TTL by cron job (L-0297). Focus on the properties you need from a store, not on the store (L-0298). A TTL bounds how long you can hold the lock, but without it you risk a perpetual lock that stalls everything (L-0310; A-LDA-10 as a separate sentence: long jobs extend the lease while still working instead of taking a long TTL).
- **Figure:** Fig 6·b second form (D-08 final: DB with `queue7 → C1`, `TTL`, `k,v / Atomic / TTL`).
- **Words:** 700

### 6.5 Acquire with SET NX
- **Opens with:** every consumer's loop: acquire, read, release.
- **Key points:** each consumer acquires, reads, releases; all keep trying, one wins and reads, and the next gets in after release (L-0261, board `ACQ_LOCK() READ_MSG() REL_LOCK()`). Acquire: the consumer knows its own ID and loops on `SET NX` with a 300 s expiry (L-0264; A-LDA-01 and A-LDA-02 as separate sourced sentences: `SET q <token> NX EX 300` sets value and expiry in one command, and Redis's docs ask for a token unique per lock request). `SET NX` sets only if absent and returns 1 or 0, so an existing lock is never overwritten (L-0265). Every Redis command is atomic: while one runs, nothing else does, so only one of many consumers succeeds (L-0266). Win → leave the loop and read; else keep looping (L-0267).
- **CodeBlock:** `acquire_lock` as on the board, then A-LDA-01's one-command form `r.set(q, token, nx=True, ex=300)`.
- **Figure:** Fig 6·c (D-09 redraw) "Redis as the lock manager".
- **Words:** 450

### 6.6 Release: never delete a lock that isn't yours
- **Opens with:** "release = delete the key". What could go wrong?
- **Key points:** plain delete is wrong: a process could delete a key it doesn't own (L-0268). Timeout case: C1 holds a 5-minute lock, takes too long, Redis expires the key, C2 acquires, then C1 reaches its release and deletes C2's lock (L-0269). Rule: never delete a lock that is not yours; get the owner and delete only if it is you (L-0270). Even get-then-delete fails in client code: between seeing you own it and deleting, the key can expire and C2 acquire it (L-0271; A-LDA-04: the owner check still lets C1 keep working after expiry; the standard fix is a fencing token checked by the storage). These edge cases are where distributed systems show their "glory": miss one and the system is incorrect (L-0272). Make check-and-delete atomic with Redis `EVAL`: a Lua script Redis runs in one shot, "a kind of transaction" (L-0273, A-LDA-03: since Redis 8.4, `DELEX key IFEQ value` does it without Lua). Lua does nothing magical; the atomicity comes from Redis running the script inside the server (L-0299). The client stays in Python or Go; only the script is Lua, passed via `EVAL` (L-0300). The habit: imagine after every single line something lags or goes down, and check the system still works (L-0274).
- **StepThrough** Fig 6·d "Who deletes whose lock?" Then **AnimationClip `l08-lock-ttl`**.
- **PauseAndThink P8** before the StepThrough.
- **CodeBlock:** the board's `release_lock`, then the Lua script `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end` called with `r.eval(script, 1, q, token)`.
- **Words:** 800

### 6.7 Other ways to build the lock
- **Opens with:** "why Redis at all?"
- **Key points:** an idea from class: use the network itself; a server that accepts only one connection at a time, so whoever is connected holds the lock (L-0289, called "brilliant"). It had been held back because the queue was declared a black box (L-0290). As a normal TCP server: accept one connection and handle it, so only one client is connected until it finishes; it ties back to the LB code (L-0291). It could avoid paying for hosted Redis; reply: "you still need the other parts" (L-0292, open). If the holder dies its connection drops and the server knows (L-0293, open; A-LDA-15 as a separate sentence: if the holder's *host* crashes or is cut off, the server's socket stays open until a timeout or keepalive fires). The instructor wouldn't call it equivalent to Redis without a side-by-side feature comparison (L-0294). It is valued because it is fundamental: the lock is simply refusing others; a few hours to build, so build it (L-0295). ZooKeeper: does exactly what was built with Redis; implement with Redis or use ZooKeeper (L-0328 → **SourceNote SN-06**: same problem, different mechanism, ephemeral sequential nodes, watches and consensus; stronger safety than a Redis TTL lock; A-LDA-12). An objection from class: ZooKeeper gives more guarantees; answer: you can add persistence to Redis too, and this is another implementation, not a better one (L-0329). Know how ZooKeeper works inside, don't just say "use ZooKeeper" (L-0330). Many startups avoid ZooKeeper: they see it as Java, find it intimidating, and prefer a scrappy Redis solution (L-0333, attributed opinion).
- **TradeoffTable T4** "Choosing a lock store": columns Redis `SET NX EX` · MySQL row + TTL · MySQL `GET_LOCK` · single-connection TCP server · ZooKeeper. Rows: what holds the lock · how a dead holder is freed · atomic acquire? · survives the store dying? · from class. Red ✕ on Redis's "survives the store dying?" cell: "no: one instance is a SPOF (§7)". Ids L-0258, L-0291, L-0293, L-0296, L-0297, L-0328.
- **Words:** 800

### 6.8 Where remote locks really live: MongoDB
- **Opens with:** a MongoDB transaction updating three documents on shards 1, 3 and 5.
- **Key points:** it holds locks on those documents, and another transaction wanting them must wait; that lock state must live somewhere shared: a remote lock (L-0305 → **SourceNote SN-07**). MongoDB records which transaction holds which document's lock; a second transaction waits until the first commits or rolls back (L-0306 → **SN-07**: a conflicting *transaction* waits up to 5 ms, then aborts and retries; only non-transactional writes wait; A-LDA-14). The queue example is the same pattern: contenders for a resource, a tracked lock, one moves forward: "effectively a distributed transaction" (L-0307, inline: it is mutual exclusion; a lock is not a transaction, which also needs atomic commit or rollback).
- **Figure:** Fig 6·e "Locks on three shards" (new, small).
- **RecallQuestions §6:** (1) Why does a remote lock need TTL, and what new problem does TTL create? (2) Why is "check the owner, then delete" still unsafe in client code, and what fixes it? (3) Name the nearest shared storage for two threads, two processes and two machines.
- **Words:** 350

---

## 7 · Distributed locks
**Section dek:** your lock store is one Redis. When it dies, nobody can lock anything. Spread the lock over five independent nodes, win a majority, and learn why "minimized" is the honest word.
**Sec-meta:** about 20 min · class 02:27–02:35, Q&A 02:50–02:59
**Opening problem:** the single Redis lock manager goes down. Every consumer spins in its acquire loop; the system stalls (L-0275).
**RuleBox (§7):** "Scale out for ==throughput==; distribute for ==fault tolerance==. They are different patterns." (L-0288). Box body: distributing the lock doesn't handle scale, it reduces throughput; what it buys is fault tolerance and availability (L-0287). Sketch: left, three boxes sharing load (`×3 rps`); right, five cylinders all holding one key (`survives 2 down`).
**Estimated words:** 2,600
**Q&A folded in:** Redlock edge case (02:50:12–02:53:29) → 7.3. Why the holder keeps acquiring (02:54:26) → 7.3. Simulating with five local Redis (02:55:00–02:56:18) → 7.4. Implementation habit, 180 repos (02:58:14) → 7.4.

### 7.1 One Redis is a single point of failure
- **Opens with:** the opening problem.
- **Key points:** a single Redis lock instance is not fault tolerant: if it dies nobody can acquire, and everything stalls (L-0275). Very few companies use distributed locks; most startups never need them because the cloud gives those guarantees, but at AWS or GCP you build them; Chubby is a great example (L-0276, attributed opinion). Distributed locks exist only to remove that SPOF; "run it in a cluster" is not an answer; the instructor has used them (L-0277).
- **PauseAndThink P9** (Redis down; keep locking without replication).
- **Words:** 350

### 7.2 Redlock: a majority of five
- **Opens with:** five Redis servers, no replication, no master between them.
- **Key points:** run five fully independent Redis servers and try to acquire the lock on all of them, one after another or in parallel (L-0278). You own the lock only if you got it on more than half (3 of 5); a majority means no other contender can hold it too (L-0279, **light inline clarification** of the simplified-medium item + A-LDA-05: *and* only if acquiring took less than the TTL; your safe window is TTL minus acquire time; A-DSC-11 for why majorities matter: a 5-node Raft cluster survives 2 failures). Fail to get a majority → release what you got at once, so others can contend; everyone retries and someone wins (L-0280; A-LDA-06 as a separate sentence: Redis's docs say unlock all instances, even ones you think you missed, and retry after a random delay). Distributed locks cost throughput, so they're used where correctness and fault tolerance matter, not in high-throughput paths (L-0281; A-LDA-09 as a separate sentence: Kleppmann's rule, a lock only for efficiency needs one Redis; one for correctness needs consensus plus fencing). One node down is no problem; edge cases remain, but their probability is reduced to a bare minimum (L-0282, **light inline clarification** + A-LDA-08: Redis's own page says implement fencing tokens, and its TTLs don't use a monotonic clock, so a clock jump can make two holders).
- **Figure:** Fig 7·a (D-10 redraw) "Five independent nodes".
- **AnimationClip `l08-redlock`** after the figure.
- **Words:** 650

### 7.3 The edge case
- **Opens with:** C1 holds the lock on nodes 1, 2, 3. Nodes 1 and 2 crash and come back empty.
- **Key points:** raised in class: two new empty nodes let another client win a majority, so two clients hold the lock (L-0314). This is exactly the edge case mentioned earlier: Redlock is not foolproof, it only minimizes the chances (L-0315; A-LDA-07 as a separate sentence: Redis documents delayed restarts, keeping a crashed node out for longer than the max TTL, or fsync=always). Because losers keep releasing while C1 keeps trying the remaining nodes, the system converges to C1 holding all of them (L-0316 → **SourceNote SN-08**). If lock-holding nodes go down, a client looping for a majority sees only three; one option is a global "cluster unhealthy, wait for two more nodes" state, otherwise it proceeds on a majority of what remains, and that is where it can be wrong (L-0317). The window is the two nodes going down before C1 grabs the rest, hardly two or three seconds, so the probability is very low (L-0318 → **SN-08**: the real window is the TTL). A client with a majority still keeps acquiring the rest, because that minimizes the edge case (L-0319, inline: in Redlock it doesn't; restarts are handled by delayed restarts). Edge cases are minimized, never claimed fully covered; the one line people miss makes all the difference (L-0322; the board's "release on acquired instances" line is the one pointed at).
- **StepThrough** Fig 7·b "Two holders" (L-0314 timeline, with SN-08's correction as the last step).
- **Words:** 650

### 7.4 Simulate it on one machine
- **Opens with:** "I don't have five servers."
- **Key points:** test distributed behaviour by simulating it: heavy load plus injected delays (1 s, 5 s, 15 s) to mimic edge cases (L-0320). The instructor ran five Redis on one laptop, ports 6379, 6380, 6381, 6382, 6383 (L-0321). Read papers and always implement them, digging into the edge cases with explicit delays; five processes instead of five servers; the load balancer is the classic example of the intimidating made easy (L-0323). The devil is in implementation details: the instructor could answer the Redlock question only because he'd built it, and has built some 180 projects in ten years (L-0326, "80 vs 180" left as heard: about 180).
- **MarginNote** "See it yourself: Redlock on one laptop" (five `redis-server --port 6379..6383`, a script that sleeps between acquire and release). Skip unless you'll run it.
- **Words:** 450

### 7.5 Distribute for fault tolerance, scale for throughput
- **Opens with:** you just made the lock *slower* on purpose.
- **Key points:** the idea of distributed systems: take a single node of X and make it distributed; every piece must scale horizontally like this (L-0283; the next sentence, L-0287, is the instructor's own distinction). Distributing the lock doesn't handle scale; it lowers throughput and buys fault tolerance and availability (L-0287). Two patterns, two phrases: scale horizontally for load; distribute for fault tolerance, reliability, availability (L-0288 → RuleBox).
- **MarginNote** "Read next" (the class's list): Google's Chubby paper, a lock service for loosely coupled distributed systems, still in production and the first paper the instructor read (L-0284); Martin Kleppmann's post on why not to use Redlock, a rare edge case (L-0285); the instructor's three or four YouTube videos and blogs on distributed transactions using locks (L-0286). Skip unless you want the primary sources.
- **Figure:** Fig 7·c "Scale out vs distribute" (new, two panels; also the RuleBox sketch).
- **TradeoffTable T5** "Three ways to lock across machines": columns Single Redis · Redlock (5 nodes) · ZooKeeper. Rows: survives a store failure · cost per acquire · safety under pauses/clock jumps · used for · from class. Red ✕ on Single Redis's "survives a store failure" cell. Ids L-0275, L-0278, L-0281, L-0282, L-0287, L-0328.
- **RecallQuestions §7:** (1) Five Redis nodes: how many must you lock, and what must you do if you don't get them? (2) Why does Redlock *lower* throughput, and why use it anyway? (3) Describe the "two holders" edge case and the documented fix.
- **Words:** 500

---

## 8 · What to keep
**Section dek:** the heuristics that ran through both halves, every box and how it stops being a single point of failure, and what comes next.
**Sec-meta:** about 4 min
**Opening problem:** none; this is the recap.
**Key points:**
- **TradeoffTable T6** "Every box, and how it stops being a single point of failure" (teaching map option B): rows LB server · CoreDNS · Orchestrator · Config DB · Prometheus · Redis lock. Columns: what it holds · what kills it · how it stays up (from class) · more precisely. Red ✕ on Redis lock's "how it stays up" cell for a single instance. Restates placed ids only (L-0221, L-0233, L-0351, L-0353, L-0369, L-0275, L-0278).
- **Heuristics card** (Prose list, 9 lines, each linking back): assume everything fails (§1, L-0029); day zero, then scale each part (§1, L-0030); every layer must scale out, and know your unit economics (§1, L-0039, L-0041); it is always about money (§2, L-0066); think about practicality (§2, L-0082); build it, then scale it (§3, L-0144); make it reactive, not polling (§4, L-0181); reuse tools and don't add boxes (§4–5, L-0192, L-0342); nearest shared storage (§6, L-0308); minimized, never fully mitigated (§7, L-0322). These restate placed ids; they add no placement.
- **MarginNote** "How the instructor learns" (about 150 words): understand the intuition, don't memorize; he'd stretch a session rather than cut quality (L-0240). Currently writing his own malloc, to see how a program gets memory and where the heap lives (L-0324). A class suggestion that malloc needs inodes was corrected: inodes belong to file systems; malloc is in-memory allocation (L-0325). He builds the scrappiest version, reads docs before class (that morning, until 8:45, the system calls that allocate memory) and trades Netflix for it (L-0327). Skip unless you want the habit.
- **ForwardChips ("Where this lecture stops"):** distributed ID generators, tomorrow · Lecture 6 (L-0001). CDN in depth · Lecture 7 (L-0143). CDC in depth · Lecture 9 (L-0179). Message broker internals · week 7, after this series (L-0335).
- **Components:** TradeoffTable, Prose, MarginNote, ForwardChips. No RuleBox, prompt or recall.
- **Words:** 500

---

## Totals
| Section | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 300 | – | – | – | – | – |
| 1 Approach | 1,900 | 1·a, 1·b, rule sketch | – | – | – | SN-01 |
| 2 Algorithms | 3,600 | 2·a, 2·b, 2·c(step), rule sketch | l08-rr-vs-leastconn | P1 | T1 | SN-02 |
| 3 One laptop | 3,000 | 3·a, 3·b(step), 3·c, rule sketch | – | P2 | – | – |
| 4 Control plane | 5,200 | 4·a, 4·b, 4·c, 4·d, 4·e, 4·f, rule sketch | l08-stale-config | P3, P4 | T2 | SN-03, SN-04 |
| 5 DNS + design | 4,300 | 5·a, 5·b(step), 5·c, 5·d, 5·e, rule sketch | – | P5 | T3 | – |
| 6 Remote locks | 5,000 | 6·a, 6·b, 6·c, 6·d(step), 6·e, rule sketch | l08-lock-ttl | P6, P7, P8 | T4 | SN-05, SN-06, SN-07 |
| 7 Distributed locks | 2,600 | 7·a, 7·b(step), 7·c (= rule sketch) | l08-redlock | P9 | T5 | SN-08 |
| 8 Keep | 500 | – | – | – | T6 | – |
| **Total** | **~26,400** | **27 numbered figures (5 step-throughs) + 6 separate rule-box sketches** | **4** | **9** | **6** | **8 notes covering 11 items** |

Reading time is about 120 minutes over eight pages; no page is longer than about 26 minutes. All figures are built from the site kit (`site/FIGURES.md`); the new glyphs (orchestrator stack, DNS box, time-series cylinder, lock tag) are added to the kit once, before any figure.
