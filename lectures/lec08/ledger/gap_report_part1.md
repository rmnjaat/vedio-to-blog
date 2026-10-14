## Part 1 (00:00:00-01:08:17)

### Windows

"Covered" means part-1 items whose first audio range starts in the window. I checked every transcript sentence in each window against the ledger. Admin talk was skipped on purpose: the audio prompts, GitHub being down, "Today's session will definitely get extended", and the batch experiments being reported to later cohorts.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 16 (K1-001..K1-016) | 0 | - |
| 00:05-00:10 | 8 (K1-017..K1-024) | 0 | - |
| 00:10-00:15 | 13 (K1-025..K1-037) | 0 | - |
| 00:15-00:20 | 16 (K1-038..K1-053) | 0 | - |
| 00:20-00:25 | 12 (K1-054..K1-065) | 1 | G1-002 |
| 00:25-00:30 | 11 (K1-066..K1-076) | 0 | - |
| 00:30-00:35 | 10 (K1-077..K1-086) | 0 | - |
| 00:35-00:40 | 6 (K1-087..K1-092) | 1 | G1-001 |
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
- **G1-001**: the tie-break between servers in least connections. The words sit inside a student turn, so the speaker is flagged.
- **G1-002**: an aside that uniform infrastructure is the common case.

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
