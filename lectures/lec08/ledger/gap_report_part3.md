## Part 3 (02:35:16-03:36:03)

Part 3 is the wrap-up line plus the long closing Q&A (locking, then load balancer design). 106 items (K3-001 .. K3-106); every sentence of 02:35:16-03:36:03 was read against them. Coverage is dense and faithful: only one small student turn was missed. Most findings are small over-statements and duplicates of part 2, which happen because the teacher repeats himself in Q&A.

### Windows

"Covered" = part 3 items whose first audio range starts in the window. Every substantive sentence in each window was checked.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:35:16-02:40:16 | 14 | 1 | G3-001 |
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
- 02:35:16-02:40:16: G3-001 = Student 2's follow-up at 02:37:25 ("couldn't we prevent the cost? ... if Redis is hosted service") and the teacher's terse "Other parts. You need those things." Low confidence (unclear marker), aside.
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
