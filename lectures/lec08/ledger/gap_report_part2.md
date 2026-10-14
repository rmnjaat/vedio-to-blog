## Part 2 (01:08:17-02:35:16)

Audited: `part2.jsonl` (148 items, K2-001 .. K2-148). New items: `gaps_part2.jsonl` (3 items, G2-001 .. G2-003).
Gap file validator: `PASS gaps gaps_part2.jsonl (3 items) | errors 0 | warnings 0`.
Part validator: `PASS part part2.jsonl (148 items) | errors 0 | warnings 0`.

### Windows

"Covered" = part-2 items whose first audio range starts in the window. I checked every transcript sentence in each window against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:08:17-01:10 | 3 | 0 | - |
| 01:10-01:15 | 11 | 0 | - |
| 01:15-01:20 | 8 | 1 | G2-001 |
| 01:20-01:25 | 6 | 0 | - |
| 01:25-01:30 | 11 | 0 | - |
| 01:30-01:35 | 12 | 0 | - |
| 01:35-01:40 | 11 | 0 | - |
| 01:40-01:45 | 11 | 0 | - |
| 01:45-01:50 | 9 | 0 | - |
| 01:50-01:55 | 9 | 0 | - |
| 01:55-02:00 | 9 | 1 | G2-002 |
| 02:00-02:05 | 0 | 0 | - (break ~02:00:26-02:04:59, then only "let's start" admin) |
| 02:05-02:10 | 10 | 0 | - |
| 02:10-02:15 | 6 | 0 | - |
| 02:15-02:20 | 9 | 1 | G2-003 |
| 02:20-02:25 | 4 | 0 | - |
| 02:25-02:30 | 12 | 0 | - |
| 02:30-02:35:16 | 7 | 0 | - |

Notes on coverage:
- 01:20-01:25 (6) and 02:20-02:25 (4) look low, but they are not under-covered. The first is a long student dialogue that leads to two proposals. The second is one long code walkthrough (SET NX loop, naive release, timeout edge case), and K2-124..K2-129 cover it sentence by sentence.
- Missed content is minor. None of it is core: a backward link to the online/offline indicator (G2-001), a learning-approach remark (G2-002) and the teacher's recap of how the lock store was chosen (G2-003).
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
- **K2-100**: the word is "quality", not "depth". Transcript: "even if it's stretched it's okay, I would not compromise on quality at all." Fix: "would not compromise on depth" -> "would not compromise on quality". The learning point next to it is new item G2-002.
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
- G2-001 / K3-071 (+K3-099): health checks are the online/offline indicator building block. K3-071 makes the link explicit in Q&A. K3-099 adds why backends don't push. Merge G2-001 into K3-071 or cross-link.
- G2-003 / K1-013: K1-013 announces that the lesson is about the core properties a lock manager needs. G2-003 is the recap of how those properties were derived and led to Redis. Cross-link.

### Open questions for the editor

- The transcript's speaker labels are inconsistent within this part. "Student 4" is Aditi (01:06), Rahul (01:23:10) and the student answering after "Wait, I'm Alok" (01:34:55). "Student 7" is Anubhav (01:15:54) and Anwar (01:20:46). "Aditi" is called at 02:12:59 but labelled Student 12. Ledger items say "a student", so the content is unaffected. Student-numbered `detail` fields (K2-027, K2-051, K2-113, K2-023) may still point to the wrong person.
- K2-012 vs K3-094/K3-099: make sure the final ledger doesn't present backend-pushed health reports as endorsed.
