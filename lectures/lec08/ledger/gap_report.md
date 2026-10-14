# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G1-002->G-002, G2-001->G-003, G2-002->G-004, G2-003->G-005, G3-001->G-006.

## Part 1 (00:00:00-01:08:17)

### Windows

"Covered" means part-1 items whose first audio range starts in the window. I checked every transcript sentence in each window against the ledger. Admin talk was skipped on purpose: the audio prompts, GitHub being down, "Today's session will definitely get extended", and the batch experiments being reported to later cohorts.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 16 (K1-001..K1-016) | 0 | - |
| 00:05-00:10 | 8 (K1-017..K1-024) | 0 | - |
| 00:10-00:15 | 13 (K1-025..K1-037) | 0 | - |
| 00:15-00:20 | 16 (K1-038..K1-053) | 0 | - |
| 00:20-00:25 | 12 (K1-054..K1-065) | 1 | G-002 |
| 00:25-00:30 | 11 (K1-066..K1-076) | 0 | - |
| 00:30-00:35 | 10 (K1-077..K1-086) | 0 | - |
| 00:35-00:40 | 6 (K1-087..K1-092) | 1 | G-001 |
| 00:40-00:45 | 10 (K1-093..K1-102) | 0 | - |
| 00:45-00:50 | 8 (K1-103..K1-110) | 0 | - |
| 00:50-00:55 | 9 (K1-111..K1-119) | 0 | - |
| 00:55-01:00 | 6 (K1-120..K1-125) | 0 | - |
| 01:00-01:05 | 10 (K1-126..K1-135) | 0 | - |
| 01:05-01:08:17 | 6 (K1-136..K1-141) | 0 | - |

Coverage is dense and faithful. The low counts are not under-coverage:
- 00:35-00:40 is mostly student questions, answered by K1-087..K1-092.
- 00:55-01:00 is the code walkthrough, where GitHub was down for a minute.

Both missed items are small:
- **G-001**: the tie-break between servers in least connections. The words sit inside a student turn, so the speaker is flagged.
- **G-002**: an aside that uniform infrastructure is the common case.

Verbatims: 141/141 found word for word. The part validator says `PASS part part1.jsonl (141 items) | errors 0 | warnings 0`, so it lists no misses.

### Distortions

- **K1-108**: the statement says "forwarding is not just packet-level forwarding". That comes from a garbled sentence. It also contradicts K1-115 and K1-136, where the teacher says the load balancer forwards the packets bluntly. Transcript: "What does it mean, forwarding? It's not just forwarding, forwarding on the packet side of it." Fix: drop the clause "forwarding is not just packet-level forwarding". If it is kept, add the flag `check: garbled "It's not just forwarding, forwarding on the packet side of it"` and set confidence to medium.
- **K1-079**: the cause and effect are reversed. The item says the connection count "keeps the load balancer extremely stateless". The teacher says the load balancer *needs* to be stateless, and that is why it only uses connection counts. Transcript: "All it has is idea of network connection. So it needs to be extremely stateless. So it can just pick a server which is having least number of connections". Fix: "The load balancer has no idea of a backend's CPU or memory, only of its network connections; it needs to be extremely stateless, so it picks the server with the fewest connections as a rough estimate of how busy it is."
- **K1-139**: the statement drops the condition that the CDN in question is not distributed. Transcript: "CDN implementation, hardly one hour. Who are, who is asking you to distribute it?" Fix: add "(a non-distributed one; nobody is asking you to distribute it)" after "Even a CDN".
- **K1-095**: "but only because Nginx and HAProxy do much more" adds a causal "only". Transcript: "Mine was 5x or 6x faster than Nginx. I said, hey, I just had a breakthrough. But no, basically Nginx and HAProxy does much more than what my ... load balancer does." Fix: replace "but only because" with "but it was no breakthrough: Nginx and HAProxy do much more than his simple load balancer".
- **K1-076** (minor): the item says request 5 "picks another server", but the teacher names the server. Transcript: "Then the next request, it picked the first server." Fix: "request 5 then picks the first server".
- **K1-129** (minor): "as many goroutines as needed" softens the teacher's own words. Transcript: "Which I have just spun up as many goroutines as I can." Fix: "it just spins up as many goroutines as it can (two per connection)".
- **K1-093** (minor nuance missing): the teacher read papers first and then built the load balancer to get practical experience. Transcript: "I knew, I read few papers to understand it, but I wanted to get the practical experience". Fix: add this to `detail`.
- **K1-091** (minor nuance missing): `detail` does not record the student's reason for asking. Transcript: "if the browser goes off, that means the user was not really interested a lot of time. So is there any way that, I mean, practically are there a way we stop the job?" Fix: add to `detail`: "Student 2 asked because a closed browser suggests the user lost interest."

I checked every other item against the transcript and found no wrong status, speaker or missing flag. K1-137, the student's EOF statement, is correctly `endorsed`: the teacher confirmed it in his own turns ("End of file." / "Once it receives EOF, it stops.").

### Duplicates (within part 1)

- K1-042 / K1-044: both say unit economics means knowing how much load each server handles. K1-042 adds linear amplification. K1-044 adds the kinds of load (API, processing) and "not leaking money", which also overlaps K1-043.
- K1-038 / K1-040 (and K1-045): all three say every layer must be horizontally scalable. K1-038 says more machines or autoscaled API servers are not enough. K1-040 lists the components. K1-045 adds "the per-server limit varies with the service".
- K1-031 / K1-102: both say start with day zero and don't think of scale on day zero. K1-031 has the "one machine, one server, one DB, one cache" recipe and the pinch-of-salt hedge. K1-102 applies it to the single LB server and adds "worst way to build a system". Cross-link, don't merge blindly.
- K1-017 / K1-019: both are about pen and paper for focus. K1-017 adds the phone in another room. K1-019 adds "physically, not typing" because the browser distracts.
- K1-074 / K1-078: both say least connections sends requests to the least burdened (relatively free) machine. K1-074 adds quicker response times. K1-078 adds the condition "large variance in response/processing times".
- K1-080 / K1-081: both say CPU-aware routing adds latency, so a heuristic is used. K1-080 explains the extra system, query and history lookup. K1-081 gives the microseconds-versus-milliseconds budget.
- K1-128 / K1-138: both say the blocking copy runs in goroutines. K1-138 adds that copy returns only on EOF, with two goroutines in parallel. K1-137 also overlaps on EOF.
- K1-116 / K1-136: both say the load balancer forwards any protocol without caring. K1-116 lists HTTP, WebSocket, RTMP and ICMP. K1-136 is the Q&A answer "no REST calls, just TCP; HTTP, RPC, any packet".
- K1-111 / K1-112 / K1-123: K1-111 and K1-112 both cover the source-to-target TCP connection map. K1-112 only defines the two terms. K1-123 repeats the mapping as "this is how easy it is".
- K1-008 / K1-118 / K1-130: all say a load balancer is tiny and easy to write, but each gives a different figure: "hardly 10 lines of core code", "two lines of code", "five hours". Keep all three figures if merged.
- K1-096 / K1-133 / K1-141: all three urge you to implement everything and stay curious. K1-133 adds that you might need to write a lightweight proxy. K1-141 adds building versus scaling, with Docker as the example. Partial overlap.
- K1-055 / K1-131: both say round robin tracks the last index. K1-055 is the concept; K1-131 is the code's (index + 1) mod n. Cross-link.
- K1-091 / K1-135: both say you are notified when a TCP connection terminates. K1-091 says on the socket, to cancel a job; K1-135 says via a panic or exception, to update in-memory stats. Cross-link.
- K1-110 / K1-120: both say there are two TCP connections per request. K1-120 adds the consequence: 2X connections, so one LB server is not enough. Partial.
- K1-027 / K1-030: Murphy's law as a fact versus "assume everything goes wrong" as a rule. Partial; cross-link.
- K1-005 / K1-051: both say the load balancer hides the multiple backends. K1-005 says it makes distributed systems possible. K1-051 adds the single point of entry with a fixed IP or domain. Partial.

### Duplicates across parts (involving part 1)

- K1-120 / K2-001 / K2-002: all say one LB server is a bottleneck because of 2 TCP connections per request, so it must scale horizontally. K2-001 adds the numbers: a 10,000-connection limit means only 5,000 clients.
- K1-040 / K2-143: both say every piece of the architecture must be horizontally scalable. K2-143 adds "take a single node of X and make it distributed".
- K1-105 / K1-122 / K2-004 / K2-005: all say the LB configuration is the backend list (IP:port) plus the algorithm. K1-105 adds the console analogy. K2-005 says this is the bare minimum, extensible.
- K1-124 / K2-032: both mention the LB main process on port 9090. K2-032 adds the 9091 meta port for config updates.
- K1-131 / K3-065: both say round robin just keeps an integer index of the last backend. K3-065 adds "no session service needed".
- K1-132 (and K1-094) / K3-061: both cover consistent hashing in the teacher's load balancer. K3-061 adds that it is an in-memory array, not a service.
- K1-010 / K1-011 / K2-101: locks ensure the correctness and consistency of data. K1-010 adds the two-transactions-on-one-row example. K2-101 adds the lock-manager framing.
- K1-013 / K3-011 / K3-052: focus on the core properties you need, not on Redis or a specific database. K3-052 adds "and the stack you are comfortable with".
- K1-014 / K2-103: both cite the airline check-in example from last week. K2-103 adds the single-machine, in-memory lock table.
- K1-001 / K3-001: next class covers distributed ID generators. K3-001 adds what will be covered.
- K1-009 / K2-100: remote and distributed locks after the break. K2-100 adds "no compromise on depth".
- K1-096 / K1-141 / K3-040 / K3-041: implement what you read. K3-041 repeats that the load balancer is intimidating until implemented, then easy.
- K1-121 / K3-038: simulate distributed setups on one machine with several ports. K1-121 uses backend processes; K3-038 uses five Redis instances on ports 6379-6383. Partial; cross-link.
- K1-081 / K2-007 / K2-008 / K3-063: the load balancer must add as little latency as possible. K1-081 says microseconds per decision. K2-008 and K3-063 put a network call at 3-5 (to 10) ms. Partial; cross-link.
- K1-106 / K2-084: both say the client of a load balancer can be another server or microservice, not just an end user. Near duplicate.
- K1-008 / K3-083 / K3-093: K1-008 says people use NGINX as a reverse proxy; K3-083 and K3-093 say a load balancer is a reverse proxy. Partial; cross-link.
- K1-097 / K2-090: low-level first, then high-level. K2-090 recaps that both were covered.
- K1-030 / K2-134: assume everything goes wrong. K2-134 adds the line-by-line granularity ("after every line something lags"). Partial.
- K1-062 / K3-057: weighted round robin. K3-057 reuses it with weight 0 for a passive load balancer in DNS. Cross-link only.

## Part 2 (01:08:17-02:35:16)

Audited: `part2.jsonl` (148 items, K2-001 .. K2-148). New items: `gaps_part2.jsonl` (3 items, G-003 .. G-005).
Gap file validator: `PASS gaps gaps_part2.jsonl (3 items) | errors 0 | warnings 0`.
Part validator: `PASS part part2.jsonl (148 items) | errors 0 | warnings 0`.

### Windows

"Covered" = part-2 items whose first audio range starts in the window. I checked every transcript sentence in each window against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:08:17-01:10 | 3 | 0 | - |
| 01:10-01:15 | 11 | 0 | - |
| 01:15-01:20 | 8 | 1 | G-003 |
| 01:20-01:25 | 6 | 0 | - |
| 01:25-01:30 | 11 | 0 | - |
| 01:30-01:35 | 12 | 0 | - |
| 01:35-01:40 | 11 | 0 | - |
| 01:40-01:45 | 11 | 0 | - |
| 01:45-01:50 | 9 | 0 | - |
| 01:50-01:55 | 9 | 0 | - |
| 01:55-02:00 | 9 | 1 | G-004 |
| 02:00-02:05 | 0 | 0 | - (break ~02:00:26-02:04:59, then only "let's start" admin) |
| 02:05-02:10 | 10 | 0 | - |
| 02:10-02:15 | 6 | 0 | - |
| 02:15-02:20 | 9 | 1 | G-005 |
| 02:20-02:25 | 4 | 0 | - |
| 02:25-02:30 | 12 | 0 | - |
| 02:30-02:35:16 | 7 | 0 | - |

Notes on coverage:
- 01:20-01:25 (6) and 02:20-02:25 (4) look low, but they are not under-covered. The first is a long student dialogue that leads to two proposals. The second is one long code walkthrough (SET NX loop, naive release, timeout edge case), and K2-124..K2-129 cover it sentence by sentence.
- Missed content is minor. None of it is core: a backward link to the online/offline indicator (G-003), a learning-approach remark (G-004) and the teacher's recap of how the lock store was chosen (G-005).
- I looked at these and deliberately did not add them:
  - pure admin: "15, 20 minutes today's session will stretch", "I'll take three questions", break logistics.
  - personal asides: "I never thought I would work at Google", "This was the best discussion of load balancer I had".
  - the example URL `http://payments.lb.google.com/help`. It is already implied in K2-078/K2-085.
  - the teacher's opening jab at 01:41:55: "google.com is not public, load balancers are private". The editor may want to put it into K2-066 `detail`, because it is what provoked the student's "load balancers should be public".

Verbatims: 148/148 found word for word (part validator: 0 warnings). G2 verbatims: 3/3 found.

### Distortions

- **K2-012**: the statement says the health check service "keeps checking the backend servers". The student actually framed it as the *server sending* something: "Server should send some, I mean," / "there should be some health check service. Like I should keep on sending the details of the server." The teacher said "Correct" and only then made the orchestrator fire the checks (K2-013/K2-020). In the Q&A he explicitly rejects backend-pushed heartbeats (K3-094, K3-099). Transcript: "Server should send some, I mean," (01:13:39). Fix: statement -> "Before updating anything, the system must first detect that a backend server went down; a student proposed a health check service (framing it as the server sending its details), which the teacher accepted as the direction." Add to `detail`: "In the design the orchestrator pulls the health checks (K2-020); backend-pushed heartbeats are rejected later (K3-094, K3-099)." Add flag `check: student framed the health check as server-pushed`.
- **K2-023**: the status `proposed_then_corrected` is overstated. The teacher's "No, no, no. Orchestrator is doing it" was a misunderstanding. He withdrew it once the student clarified that the LB server polls: "This one, this one you're talking about. Okay. This would be keeping on polling on doing this." At 01:21:48 he then built on the student's load argument: "just one more point to add on that where you said that it is already handling because now it also has to pull much more than that." Fix: status `endorsed`. Rewrite `detail`: "Student 7's reason was that polling adds load and latency on the LB server; the teacher first thought the student meant the orchestrator's health checks, then accepted the point and added the main reason, staleness (K2-025, K2-026)."
- **K2-052**: wrong speaker, and one invented detail. The item is the *answer* (what a telemetry agent is), not the question, so `speaker` should not be `student (question)`. The parenthetical "(e.g. to CloudWatch or a metrics store)" was never said. Student 3 said "Probably some log storage" and the teacher redirected to a central metrics store (K2-053, K2-054). Transcript: "Basically it, I think it will mostly like emit metrics from the host." / "Let's say this is the telemetry agent that is running on the host, which is emitting metrics, emitting metrics to where?" Fix: speaker `student (proposal)` (Student 3; the teacher restated it), status `endorsed`. Statement -> "A telemetry agent is a process running on each host that emits that host's metrics." In `detail`, keep that another student asked what it is and where it is installed.
- **K2-077**: "which the teacher noted just moves the problem" is an interpretation of a phrase the analyst already flagged ("transcending problem" as heard), yet confidence is `high`. Transcript: "Load balance between DNS. Right. And now this is a transcending problem." Fix: confidence `medium`. Statement wording -> "the teacher replied 'load balance between DNS... a transcending problem [as heard]'". Add to `detail`: "The premise (all requests flow through DNS) is dissolved next: DNS only resolves names and is not in the request path (K2-078, K2-079)."
- **K2-094**: the teacher said "latency", not "load". Transcript: "So at one step that latency becomes so small that that one server is able to handle that." Fix: statement -> "...recursively, at some step 'that latency [as heard; probably load] becomes so small' that one server can handle it...". Add flag `check: "latency" as heard - probably load`. Confidence `medium`.
- **K2-098**: drops the teacher's number. Transcript: "I still have not covered seven different layers that cover it would make this highly complex but there are different layers in which resolution happens." Fix: "resolution happens across several layers" -> "there are seven different layers (not covered, to keep it simple) in which resolution happens".
- **K2-100**: the word is "quality", not "depth". Transcript: "even if it's stretched it's okay, I would not compromise on quality at all." Fix: "would not compromise on depth" -> "would not compromise on quality". The learning point next to it is new item G-004.
- **K2-126**: the generalisation "Every Redis command is atomic" comes from 02:26:18, which is not in the item's sources. At 02:20:32 the teacher says only "this command of Redis is an atomic command". Transcript (02:26:18): "So every command of Redis is atomic in nature." Fix: add `02:26:18-02:27:25` to `source.audio`. Optionally keep the 02:26:18 quote as a merged verbatim.
- **K2-029**: small wording drift. The statement says "changing the balancing algorithm or health check". Transcript: "changing load balancing algorithm, changing health check status". Fix: "health check" -> "health check status".

No spliced verbatims. No dropped hedges other than those above. All other statuses match the transcript.

### Duplicates (within part 2)

- K2-027 / K2-032: both describe the same push mechanism: a separate port on the LB server that the config changer calls, after which the server reads the DB. K2-027 adds that it was the student's proposal and that the orchestrator is the caller. K2-032 adds the concrete ports (main process 9090, meta port 9091) and that the port's handler updates the in-memory config. Merge into K2-027 and keep the ports.
- K2-066 / K2-067: both say a critical internal service's LB must not be public, and that a private LB cannot be a single LB server. K2-066 adds the student's claim and the correction (status). K2-067 adds "because of the DNS you're enforcing it to be public". Merge into K2-066.
- K2-107 / K2-108: both say machines synchronize over the network. K2-107 has the full threads -> memory, processes -> disk, machines -> network ladder. K2-108 adds only the rhetorical "Disk? No. Network." Merge K2-108 into K2-107 (keep its verbatim).
- K2-044 / K2-047: both say scaling needs historical data, not just a point-in-time reading. K2-047 adds the 100%-utilization-means-no-response argument and "react at 60, 70, 80%". Merge, or keep both and cross-link (K2-047 is the reason, K2-044 the requirement).
- K2-054 / K2-057: both say all vitals are ingested in one central place. K2-054 adds "an organization building LBs anyway has one, e.g. Prometheus". K2-057 adds that backend VMs count too, and "one place of ingestion and query". Merge into K2-057 and keep both nuances.
- K2-056 / K2-061: both are the "don't build something LB-specific, reuse a generic system" heuristic. K2-056 adds "thinking realistically leads to a cost-efficient solution". K2-061 names Prometheus as the generic system. Merge. K2-049 ("reuse, don't re-implement") is the parent; cross-link it.
- K2-076 / K2-081 / K2-085: three descriptions of the request path (resolve name -> get LB IP -> connect -> LB picks backend -> response). K2-076 adds that DNS picks one IP by round robin etc. (via K2-075). K2-081 adds "this is exactly what happens on any HTTP request" and that the client caches the IP. K2-085 is the final-diagram version, with CoreDNS and lb.payments.google.com. Merge K2-081 into K2-076 and keep K2-085 as the final-design restatement, or merge all three. Don't drop the "any HTTP request" line.
- K2-037 / K2-086: who publishes config changes to the broker. K2-037 says orchestrator, LB console or DB via CDC. K2-086 (final diagram) says CDC, "LB server itself" or orchestrator. K2-086 also adds the full alteration triggers (failed health check, autoscaling, developer change) and that LB servers update their in-memory copy. Keep both publisher lists (they differ). Merge K2-037 into K2-086 or cross-link.
- K2-033 / K2-038: both say polling fails and the config path must be reactive. K2-033 adds the "(almost) zero staleness" goal. K2-038 adds "on an event, use the pushed config or pull from the DB - implementation choice". Partial overlap: cross-link.
- K2-014 / K2-020: both say a 200 from the health check endpoint means healthy. K2-014 adds the student's endpoint vs all-requests clarification. K2-020 adds that the orchestrator makes the calls and that other protocols exist. Partial: cross-link.
- K2-119 / K2-123: both say a lock entry needs TTL so no lock is held forever. K2-119 adds the reason (the holder dies before deleting). K2-123 adds the concrete 5-minute expiry and the Redis entry wording. Partial: cross-link, or merge into K2-119 keeping "5 minutes".
- K2-141 / K2-147: both say distributed locks cost throughput. K2-141 adds "not used in high-throughput systems; used where correctness is required". K2-147 adds "what you gain is fault tolerance and availability, not scale". Partial: cross-link.
- K2-062 / K2-083: both summarise the LB design. K2-062 is the mid-way recap (01:39:44). K2-083 is the final diagram, which adds the LB console, the CoreDNS entry and Prometheus queried by the orchestrator. Partial: keep both, cross-link.

### Duplicates across parts (involving part 2)

- K2-001 / K1-120: both say one LB server needs two TCP connections per client, so it can't scale alone. K2-001 adds the numbers (10,000 limit -> 5,000 clients). K1-120 adds "2X connections" and that horizontal scaling is a separate topic. Merge and keep both.
- K2-004 / K1-105: both say the LB stores the backend servers' IP:port list. K1-105 adds the link to the console configuration. K2-004 adds the student's proposal. Merge.
- K2-005 / K1-122: both say the LB keeps a balancing-algorithm config. K2-005 adds "this is the bare minimum, infinitely extensible". Partial: cross-link.
- K2-101 / K1-011: both say remote/distributed locks ensure data correctness and consistency. K1-011 adds "heart and crux". K2-101 adds "most important things in distributed systems". Merge.
- K2-100 / K1-009: both are the "locks after the break" agenda. Merge (admin).
- K2-107 / K3-023: both describe the nearest-shared-storage ladder. K3-023 adds the student's summary ("two machines share an external database - anything over a network") and the teacher's "Excellent". Merge, keeping the student summary in `detail`.
- K2-108 / K3-025: both say machines share only the network. K3-025 adds "neither RAM nor disk". Merge.
- K2-119 / K3-009 / K3-026: TTL prevents perpetual locks. K3-009 adds the crash framing confirmed by the teacher. K3-026 adds that TTL bounds how long a holder can run, a limit every implementation has, and that without it the whole system stalls. Merge, keeping K3-026's trade-off.
- K2-133 / K3-012 (and K3-013, K3-014): both cover EVAL + Lua for atomic check-and-delete. K3-012..014 add that Lua itself does nothing magical (atomicity comes from Redis running the script server-side) and that client code stays in Python/Go. Merge, keeping the K3 nuances.
- K2-140 / K3-032: both say a client that fails to get a majority releases what it acquired. K2-140 adds "immediately, so others can contend; someone eventually wins". K3-032 adds the convergence argument (via K3-033). Merge.
- K2-142 / K3-030 (+K3-031): the edge case where lock-holding instances go down. K3-030 gives the full scenario (3 of 5, two go down, another client gets a majority). K3-031 adds "Redlock is not foolproof, only minimizes". K2-142 adds that one node down is no problem. Merge, keeping both.
- K2-020 / K3-098: the orchestrator makes HTTP calls to the health endpoint and checks the response. K3-098 adds that 300 is also accepted. Merge, keeping 200/300.
- K2-018 / K3-095: the health check endpoint is part of the LB configuration. K3-095 adds "stored in the DB, for all target servers". Merge.
- K2-014 / K3-096: success means 200. K3-096 says success is configurable (200, 300, sometimes even 400). Cross-link (K3-096 refines it).
- K2-075 / K3-056: DNS picks among multiple IPs by round robin etc. K3-056 adds that DNS has no load information and does not route on load. Merge, keeping the K3 nuance.
- K2-082 / K3-058: the orchestrator adds new LB IPs to DNS. K3-058 adds that it also handles LBs going down or coming back, so this is not manual. Merge.
- K2-079 / K3-059: DNS only resolves names / is a stupid hash map. Partial: cross-link (K3-059 adds the "hash map" framing).
- K2-086 / K3-069: Redis Pub/Sub broadcasts config to LB servers. K3-069 adds why (real-time to everyone out of the box) and alternatives (SSE, ZooKeeper, explicit HTTP calls). Merge or cross-link.
- K2-038 / K3-070: reactive, not poll-based, reusing last week's idea. K3-070 adds "Redis is just one option". Merge.
- K2-089 / K3-089: read the Maglev paper. K2-089 adds "easy, one of the first papers the teacher read". K3-089 adds "much of the design is taken from it". Merge.
- K2-008 / K3-063: a network call costs 3-5 ms. K3-063 extends this to "3 to 5 to 10 ms" and "teams challenge every hop". Merge, keeping both ranges with their times.
- K2-110 / K3-017: the hypothetical zero-protection queue. K3-017 adds that it is a deliberate constraint, not a real design. Merge.
- K2-122 / K3-019: consumer code acquires the lock, reads, releases. K3-019 adds that nothing connects Redis to the queue; protection comes from the consumer code. Merge, keeping the K3 nuance.
- K2-143 / K1-040: every piece of the architecture must be horizontally scalable. K1-040 lists the components. K2-143 adds "take a single node of X and make it distributed". Cross-link.
- K2-099 / K3-083: an LB balances across a homogeneous set of servers. K2-099 adds "not an API gateway; one LB per service". K3-083 adds "therefore LBs are reverse proxies". Partial: cross-link.
- K2-134 / K3-037: imagine lag or failure after every line. K3-037 turns this into a practice: inject delays under load. Partial: cross-link.
- K2-094 / K3-106: both are a "base condition of the recursion" (a single point of failure with a standby / global monitor). Different systems (DNS vs orchestrator), same pattern: cross-link, do not merge.
- G-003 / K3-071 (+K3-099): health checks are the online/offline indicator building block. K3-071 makes the link explicit in Q&A. K3-099 adds why backends don't push. Merge G-003 into K3-071 or cross-link.
- G-005 / K1-013: K1-013 announces that the lesson is about the core properties a lock manager needs. G-005 is the recap of how those properties were derived and led to Redis. Cross-link.

### Open questions for the editor

- The transcript's speaker labels are inconsistent within this part. "Student 4" is Aditi (01:06), Rahul (01:23:10) and the student answering after "Wait, I'm Alok" (01:34:55). "Student 7" is Anubhav (01:15:54) and Anwar (01:20:46). "Aditi" is called at 02:12:59 but labelled Student 12. Ledger items say "a student", so the content is unaffected. Student-numbered `detail` fields (K2-027, K2-051, K2-113, K2-023) may still point to the wrong person.
- K2-012 vs K3-094/K3-099: make sure the final ledger doesn't present backend-pushed health reports as endorsed.

## Part 3 (02:35:16-03:36:03)

Part 3 is the wrap-up line plus the long closing Q&A (locking, then load balancer design). 106 items (K3-001 .. K3-106); every sentence of 02:35:16-03:36:03 was read against them. Coverage is dense and faithful: only one small student turn was missed. Most findings are small over-statements and duplicates of part 2, which happen because the teacher repeats himself in Q&A.

### Windows

"Covered" = part 3 items whose first audio range starts in the window. Every substantive sentence in each window was checked.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:35:16-02:40:16 | 14 | 1 | G-006 |
| 02:40:16-02:45:16 | 9 | 0 | - |
| 02:45:16-02:50:16 | 7 | 0 | - |
| 02:50:16-02:55:16 | 7 | 0 | - |
| 02:55:16-03:00:16 | 9 | 0 | - |
| 03:00:16-03:05:16 | 8 | 0 | - |
| 03:05:16-03:10:16 | 10 | 0 | - |
| 03:10:16-03:15:16 | 7 | 0 | - |
| 03:15:16-03:20:16 | 10 | 0 | - |
| 03:20:16-03:25:16 | 7 | 0 | - |
| 03:25:16-03:30:16 | 9 | 0 | - |
| 03:30:16-03:35:16 | 8 | 0 | - |
| 03:35:16-03:36:03 | 1 | 0 | - |

Window notes
- 02:35:16-02:40:16: G-006 = Student 2's follow-up at 02:37:25 ("couldn't we prevent the cost? ... if Redis is hosted service") and the teacher's terse "Other parts. You need those things." Low confidence (unclear marker), aside.
- 02:40:16-02:50:16 windows with 7 items are short Q&A turns (hypothetical queue, nearest shared storage, TTL bottleneck, mutex vs network). Each turn has its own item. Off-hand lines ("That's a very vague term", "How many times are you making network call?") sit in `detail` of K3-024 / K3-028.
- 02:55:16-03:00:16: the motivation asides (malloc, 180 repos, studying, Netflix) are covered by K3-042..K3-045. The "Breaking Bad ... you win some, you lose some" remark is personal colour and is acceptably folded into K3-045.
- 03:15:16-03:20:16: the line "I now obviously cannot cover all the layers because there are seven more" (03:17:59) is not in any item. Treated as a missing nuance of K3-077 (see Distortions), not as a separate item.
- 03:25:23 "I'm so glad you folks are going into these details ... we have built a pretty decent system" is praise. Not an item. Its last sentence (Maglev) is K3-089.
- 03:35:16-03:36:03: only the end of the recursion explanation (K3-106). The closing at 03:36:02 is admin and was folded into K3-001's detail.

Verbatims: 106/106 found word for word (validator `part`: PASS, 0 errors, 0 warnings).

### Distortions

- **K3-004**: the statement adds "which releases the lock naturally". The student only said the queue knows the connection is down. Transcript: "If it dies also connection is gone. Queue knows, okay, connection is down. That's proper." Fix: statement -> "A student noted that if a consumer holding a single-connection lock dies, its TCP connection goes down and the server (queue) knows the connection is gone, which the student considered proper." Status `open` stays.
- **K3-014**: the detail says "the teacher said no", but the "No, no, no." turn is labelled `Teacher?` in the transcript, and the item has no flag. Transcript: "**[~02:40:14] Teacher?:** No, no, no." Fix: add flag `check: speaker of "No, no, no." (Teacher?) at 02:40:14`. Leave confidence high: the substance rests on the 02:40:17 Teacher (answer) turn.
- **K3-020**: the statement says the locks are on shards one, three and five. When the teacher restates where the locks are, he says shards one, two and five (a slip). Transcript: "acquired a lock on that document in shard one, that would document in shard two, that document in shard five." Fix: keep the statement. Add to `detail`: "The teacher first places the documents on shards one, three and five, then says the locks are on shards one, two and five (likely a slip)."
- **K3-030**: "when nodes come back" is not quite what the student said. The student talks about spinning up two new Redis nodes. Transcript: "we come up, we span across two Redis new nodes again, then there's another thread which is trying". Fix: "when two new Redis nodes are spun up, another client can acquire a majority ...".
- **K3-031**: "the known Redlock edge case" implies a well-known case. The teacher means the edge case he had already mentioned (02:31:34, K2-142). Transcript: "That's what I said. That's what the edge case is." Fix: "This is exactly the edge case the teacher mentioned earlier: Redlock is not foolproof ...".
- **K3-039**: the parenthetical "(keep trying the remaining instances / release on failure)" guesses which line "makes all the difference". The teacher does not name it at 02:55:38. The nearest pointer is "Look carefully. This line." at 02:51:06, followed by the release-on-failure rule. Transcript: "This one line that a lot of people miss on is the line that makes all the difference." Fix: drop the parenthetical. Put in `detail`: "The line is not named here; at 02:51:06 the teacher pointed at 'this line' before explaining that a client that fails to get the majority releases its locks (K3-032)." Add flag `check: which line "makes all the difference"`.
- **K3-055**: "up to 10 messages" adds a limit the teacher didn't state. Transcript: "SQS gives you ability to read 10 messages at a time in one call." Fix: "SQS gives a consumer the ability to read 10 messages at a time in one call ...". The fact-checker can add "up to" later.
- **K3-077**: misses the teacher's number for the layers he skipped. Transcript: "I, I now obviously cannot cover all the layers because there are seven more." Fix: add to `detail`: "The teacher said he could not cover all the layers because 'there are seven more'." Also add audio `03:17:59-03:18:33` to `source.audio`.
- **K3-085**: drops one of the two status codes. Transcript: "You send 404, you send 403 to user." Fix: "... which returns errors such as 404 or 403 to the user."
- **K3-089**: "Google's Maglev paper" adds knowledge. Neither here nor at 01:53:05 / 01:58:05 does the teacher say the paper is Google's. Transcript: "And by the way, a lot of things is taken from Maglev. So read that paper in any case." Fix: "Much of the load balancer design is taken from the Maglev paper; read it." (The fact-checker can attribute it.)
- **K3-104**: "Nothing autoscales the orchestrator" is not said, and the next turn contradicts it. At 03:35:30 the global monitor "just adds more worker nodes if it wants to". Transcript: "That's what we discussed. This is a leader election. So, so if master goes down, one of the leader, one of the followers would do about it and my entire orchestrator would never go down." Fix: "The orchestrator is kept available by leader election: it runs in multi-node mode (one master, multiple followers), so if the master goes down a follower takes over and the orchestrator as a whole never goes down." Add `depends_on` K3-105 / K3-106 for who monitors and scales it.
- **K3-105**: "a standby keeps its own failure probability low" pins an ambiguous referent on the global monitor. Transcript: "But probability of that going down is minimized by having a standby." "That" may be the master orchestrator or the monitor. Fix: "... the probability of that going down is minimized by having a standby (referent unclear: the master orchestrator or the monitor)". Add flag `check: referent of "that going down"` and set confidence to medium.

### Duplicates (within part 3)

- K3-040 / K3-041: both say the load balancer is the classic example of something intimidating that becomes easy once implemented. K3-040's `detail` already contains it. K3-041 adds the verbatim and the student's "it builds inertia" remark. Merge K3-041 into K3-040 and keep its verbatim in `merged_verbatims`.
- K3-072 / K3-073: both record the student's three-orchestrators-with-idle-standbys proposal and the teacher's "not idle - leader-follower" refinement. K3-072 is the proposal with speaker `student (proposal)`. K3-073 adds the SPOF framing, "followers do grunt work" and "one or two seconds downtime". Keep both. Strip the proposal sentence from K3-073's `detail` and link K3-073 -> K3-072, or merge them, keeping the downtime number.
- K3-073 / K3-104: both say leader-follower with automatic follower takeover keeps the orchestrator up. K3-073 adds the 1-2 s downtime. K3-104 adds "multi-node mode, the orchestrator as a whole never goes down" and that it answers "who autoscales the orchestrator". Cross-link, or merge into K3-073.
- K3-011 / K3-052: both say focus on the core properties you need, not the specific database. K3-011 comes from the MySQL-as-lock-store answer. K3-052 adds the ZooKeeper/Redis/DynamoDB/MySQL list and "adopt the stack you are comfortable with". Merge into K3-011 and keep the comfort nuance and the ZooKeeper context. The 03:02:34 restatement ("Focus on the core properties ... persistent connection in a real time") sits inside K3-050's source.
- K3-009 / K3-026: both say that without TTL a crashed holder leaves a perpetual lock. K3-009 adds the crash/key-removal reason and MySQL context. K3-026 adds the trade-off: TTL bounds how long a process can hold the lock, every implementation has this, and a stalled system is the bigger risk. Keep both and link them via `depends_on`.
- K3-083 / K3-093: both say load balancers are reverse proxies. K3-083 adds "balances load across a homogeneous system, exactly what a reverse proxy does". K3-093 adds the Nginx reverse proxy example, "if you used a load balancer you used a proxy" and "reverse proxy is the generic term". Merge into K3-083 and keep both nuances.
- K3-096 / K3-098: both say success status can be 200 or 300. K3-096 adds that it is configurable, even 400 in some cases. K3-098 adds that the orchestrator only needs the endpoint and makes HTTP requests to it. Partial overlap. Cross-link.
- K3-094 / K3-099: both say backends don't send heartbeats and the orchestrator asks. K3-094 covers the /health endpoint receiving requests (Spring Boot/Flask/Django). K3-099 gives the reason: the backend doesn't know the orchestrator's IP, same as the online/offline indicator. Partial overlap. Keep both and link them.
- K3-031 / K3-035 / K3-039: all say the Redlock edge case is minimized, not eliminated. K3-031 = "not foolproof, minimizes chances". K3-035 = why it is improbable (2-3 s window, losers keep releasing). K3-039 = the general rule "never say fully covered or mitigated". Distinct angles. Cross-link, don't merge.

### Duplicates across parts (involving part 3)

- K1-001 / K3-001: next class is distributed ID generators. K3-001 adds the scope (intuition, why, real-world scaling, implementation) and the ~2.5 h length. Merge into one admin item and keep K3-001's detail.
- K1-013 / K3-011 (+K3-052): focus on the core properties a lock manager / database must have, not the product. K1-013 adds "so you could build your own". K3-011 adds the MySQL-with-TTL application. Merge or cross-link.
- K2-119 / K3-009 (+K3-026): TTL prevents perpetual locks when a holder dies. K2-119 is the main teaching. K3-009 adds the student's crash framing. K3-026 adds the TTL-limits-hold-time trade-off. Merge K3-009 into K2-119. Keep K3-026 as its own trade-off item.
- K2-120 / K3-008 (+K3-010): the lock store needs key-value access, atomicity and TTL; Redis has all three. K3-008/K3-010 add that MySQL works if TTL is handled, e.g. by a cron job. Keep them and link them to K2-120.
- K2-133 / K3-012 / K3-013 / K3-014: atomic release via Redis EVAL with a Lua script. K2-133 is the core. K3-012 adds "read about EVAL". K3-013 adds "Lua does nothing magical, Redis runs it in-server". K3-014 adds "client code stays Python; you pass a script instead of a command". Merge K3-012 into K2-133. Keep K3-013/K3-014 as Q&A clarifications linked to it.
- K2-110 / K3-017: the hypothetical queue gives zero protection. K3-017 adds that it was a deliberate constraint for teaching, not a design to re-architect around. Cross-link, or merge with the nuance.
- K2-111 / K3-018: real queues like SQS give guarantees the hypothetical queue lacks. K3-018 adds RabbitMQ and Kafka and "you don't have to do anything around it". Merge into K2-111's detail or cross-link.
- K2-122 / K3-019: consumer code acquires the lock, then reads. K3-019 adds why it works with no Redis-queue link: we write the consumer. Keep K3-019 as a Q&A item that depends on K2-122.
- K2-107 / K3-023: synchronize via the nearest shared storage (threads RAM, processes disk, machines network). K3-023 is the student's restatement with the teacher's "Excellent. Anything over a network" and adds the external database for machines. Merge K3-023 into K2-107 as an endorsement, keeping the verbatim.
- K2-108 / K3-025: only the network is shared between machines, neither RAM nor disk. K3-025 adds "neither RAM nor disk" explicitly. Merge.
- K2-104 / K3-029: local synchronization uses mutex/synchronized/atomic instructions. K3-029 adds "on one single server you don't need Redis". Partial overlap. Cross-link.
- K2-142 / K3-031 (+K3-035): the Redlock edge case (lock-holding instances go down) remains but is minimized. K3-031/K3-035 add the probability argument (2-3 s window, losers keep releasing, holder keeps acquiring). Keep part 3 items as the elaboration, linked to K2-142.
- K2-140 / K3-032: a client that fails to get a majority releases its acquired locks. K2-140 adds "so others can contend; someone eventually wins". Merge K3-032 into K2-140.
- K2-140 / K3-033: "someone eventually wins" vs "system converges to C1 holding all instances". K3-033 adds the C1-C4 walkthrough and convergence. Partial overlap. Cross-link.
- K2-134 / K3-037: simulate lag/failure at every line vs inject 1/5/15 s delays under load. K3-037 adds the concrete delays and heavy load. Partial overlap. Cross-link.
- K2-035 / K3-069 (+K3-049, K3-050): Redis Pub/Sub is one implementation of config broadcast, not the only one. K3-069 adds why (out-of-the-box real-time broadcast vs multiple calls) and the alternatives (SSE, ZooKeeper, HTTP). K3-049/K3-050 add the ZooKeeper notification framework equivalence. Keep the part 3 items linked to K2-035.
- K2-038 / K3-070: reactive rather than poll-based config updates. K3-070 adds "reusing last week's material" and "Redis chosen because its guarantees need no worry". Merge or cross-link.
- K2-075 / K3-056 (+K3-067): DNS picks among multiple IPs by round robin. K3-056 adds "DNS has no load information, does not route by load". K3-067 says CoreDNS picks "at random", about 50 lines of code (inconsistent with "round robin"; noted in K3-067's detail). Keep the inconsistency visible when merging.
- K1-059 / K3-057: weighted round robin. K3-057 applies it to active-passive DNS (weight 0 / 1). Partial overlap. Cross-link only.
- K1-055 / K1-131 / K3-065: round robin keeps the index of the last backend. K3-065 adds "so no session service is needed". Merge K3-065's point into K1-055 or cross-link.
- K2-020 / K3-071: the orchestrator makes repeated HTTP calls for health. K3-071 adds that it is the same building block as the online/offline indicator. Cross-link.
- K2-014 / K2-020 / K3-098: health check needs HTTP 200. K3-098 adds "200 or 300". K3-096 adds that it is configurable (even 400). Merge and keep the configurable range.
- K2-017 / K2-018 / K3-094 / K3-095: /health endpoint, part of the LB config. K3-094 adds "the endpoint receives, it doesn't send heartbeats". K3-095 adds "stored in DB config for all target servers". Merge K3-095 into K2-018. Keep K3-094 as the direction-of-heartbeat Q&A.
- K2-019 / K3-097: the health check must verify the service, not just the VM. K3-097 adds that what it checks (e.g. a DB ping) is the owner's choice, and that most return okay. Partial overlap. Cross-link.
- K2-021 / K3-087: the orchestrator uses the config DB. K3-087 adds "stateless, so leader and followers need no replication". Cross-link.
- K2-054 / K2-058 / K3-068: Prometheus ingests vitals and the orchestrator reads them. K3-068 adds why separate heartbeats are still needed (vitals ingestion generally does no health checks). Cross-link.
- K2-055 / K3-091 (+K3-086): Prometheus scales amazingly. K3-091 adds how (multiple query engines, replicate storage). K3-086 adds "follow the docs, Golang-based, no video". Cross-link.
- K2-059 / K3-102: AWS autoscaling policies. K3-102 adds why autoscaling is a separate component (customer-configured policies via admin UI). Partial overlap. Cross-link.
- K2-093 / K3-074: CoreDNS is not a SPOF because multiple servers run. K3-074 lists HA for every component (clusters, LBs, DB, orchestrator and CoreDNS via leader election). Cross-link.
- K2-094 / K3-105 / K3-106: recursion ends at a single minimal node with a standby, "the base condition of the recursion". K2-094 is about DNS-for-CoreDNS. K3-105/K3-106 apply it to an orchestrator of orchestrators. Same device on a different subject. Cross-link, don't merge.
- K2-098 / K3-077: an intermediate proxy layer sits in front of the LBs; the design simplified it. K3-077 adds "LB servers not the first layer; private vs public is an architecture decision" (plus the "seven more" layers, see Distortions). Merge or cross-link.
- K2-073 / K3-079: private CoreDNS resolves LB names inside the infrastructure. K3-079 adds "the API gateway is the one resolving the LB's domain via private CoreDNS". Cross-link.
- K2-097 / K3-082: a public LB uses public DNS resolution. K3-082 adds that AWS/GCP let you put LB addresses in public DNS (bypassing the API gateway), which is fine, but in reality LBs stay private. Cross-link.
- K2-099 / K3-083: an LB balances across a homogeneous set of servers. K2-099 adds "it is not an API gateway". K3-083 adds "that is what a reverse proxy does". K3-084 adds "API gateways are powered proxies". Cross-link.
- K1-008 / K3-093: NGINX is used as a reverse proxy. K3-093 adds "reverse proxy is the generic term for a load balancer". Cross-link.
- K2-089 / K3-089: read the Maglev paper. K2-089 adds the title, ease and "first papers the teacher read". K3-089 adds "much of this design is taken from Maglev". Merge and keep both.

