# Fact-check report: locks, design approach, asides, delegation (Lecture 8)

Scope: the 87 ledger items of group `locks_design_approach` (topic roots locks / design-approach / aside / delegation) in `groups.json`. No admin items skipped. **87 items checked.** Checked 2026-10-13 against: Redis docs (latest, 8.4-era: SET, SETNX, EVAL intro, distributed-locks page, latency page), ZooKeeper 3.9 docs, MongoDB manual (current), AWS SQS docs, Kafka 4.3 design docs, RabbitMQ docs, MySQL 8.4 manual, PostgreSQL 18 docs, Linux man-pages, the dpkg frontend-api spec, and Kleppmann (2016).

## Counts

| Verdict | Count |
|---|---|
| accurate | 50 |
| simplified | 22 |
| imprecise | 10 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 5 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 9 |
| low | 25 |
| none | 53 |

Additions proposed: 17 (see `locks_design_approach_additions.jsonl`).

Calibration: the remote-lock derivation (resource + owner, TTL, SET NX, owner-checked release, atomic Lua release, Redlock majority) matches Redis's own documentation closely and is marked accurate. Board pseudo-code shortcuts (e.g. `setnx(..., ex=300)`) are `simplified/low`. Items are flagged medium only where a learner would carry a wrong design idea or interview answer. Examples: real queues "never" hand a message to two consumers; MongoDB transactions queue behind a central lock manager; Redlock holders keep acquiring the remaining nodes; a 2-3 s risk window; ZooKeeper locking is "exactly" the Redis loop. The teacher himself flagged Redlock's edge cases and pointed to Kleppmann's critique (02:33), so those items are judged as "incomplete", not "wrong". Student claims are judged only where they make a checkable claim (L-0293 TCP liveness).

## Items needing a decision (ordered by severity)

### L-0303 | imprecise | severity: medium

- **Teacher/ledger statement:** Real queues such as RabbitMQ, SQS and Kafka give the guarantee that a message is not handed to multiple consumers, so you do not have to build anything around it.
- **Verbatim:** "If you talk about RabbitMQ, SQS, Kafka and whatnot, they give you this guarantee. So you don't have to do anything around it." (teacher)
- **Issue:** All three prevent *concurrent* delivery in normal operation (SQS visibility timeout; Kafka assigns each partition to exactly one consumer per group; RabbitMQ dispatches each delivery to one consumer). But all are at-least-once. SQS: "you might get that message copy again"; Kafka "guarantees at-least-once delivery by default"; RabbitMQ: "a consumer can receive a message that was previously delivered to another consumer". So you don't need a lock, but you do need idempotent consumers.
- **Suggested note:** RabbitMQ, SQS and Kafka keep two consumers from receiving a message at the same time, but they are at-least-once: a message can be redelivered (even to another consumer), so processing must be idempotent.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html), [kafka.apache.org](https://kafka.apache.org/43/design/design/), [www.rabbitmq.com](https://www.rabbitmq.com/docs/confirms)

### L-0306 | imprecise | severity: medium

- **Teacher/ledger statement:** MongoDB gives these guarantees via its own lock manager that records which transaction holds a lock on which document of which shard; a second transaction asking for a locked document is told to wait until the first commits or rolls back.
- **Verbatim:** "what MongoDB does is it gives you those guarantees, but how it is implementing it, it is having its own lock manager" (teacher)
- **Issue:** Locks are taken locally on each shard; there is no cluster-wide lock table. A conflicting transaction does not wait for commit. MongoDB: "transactions wait up to 5 milliseconds to acquire locks ... If the transaction cannot acquire its required locks within the 5 milliseconds, the transaction aborts." Only non-transactional writes wait until the transaction ends.
- **Suggested note:** MongoDB tracks document locks on each shard; a transaction that can't get a lock within 5 ms (default) aborts and must be retried, while plain writes wait for the transaction to finish.
- **Sources:** [www.mongodb.com](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

### L-0305 | imprecise | severity: medium

- **Teacher/ledger statement:** A MongoDB distributed transaction updating documents on shards 1, 3, 5 holds locks on them; another transaction wanting the same documents must wait. That lock information must be stored somewhere shared - a remote lock.
- **Verbatim:** "Imagine MongoDB distributed transaction across multiple shards." (teacher)
- **Issue:** Locking documents is right. But the lock state lives on each shard (no shared remote lock store), and a conflicting transaction waits only up to 5 ms by default, then aborts and retries.
- **Suggested note:** A MongoDB multi-shard transaction takes document locks on each shard it touches; a conflicting transaction waits briefly (5 ms by default) and then aborts and retries.
- **Sources:** [www.mongodb.com](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

### L-0316 | imprecise | severity: medium

- **Teacher/ledger statement:** Because losers keep releasing while the majority holder (C1) keeps trying to acquire the remaining instances, the system eventually converges to C1 holding the lock on all instances.
- **Verbatim:** "So eventually your system will converge into the fact that on all the instances C1 would have the locks" (teacher)
- **Issue:** Not in Redlock as specified. A client makes one acquisition pass; it holds the lock if it got a majority within the validity time. It does not keep acquiring the rest. Losers "unlock all the instances" and retry "after a random delay".
- **Suggested note:** In Redlock the winner holds only the majority it got in one pass; losers release everything and retry after a random delay.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)

### L-0318 | imprecise | severity: medium

- **Teacher/ledger statement:** The edge case needs two of the holder's instances to go down before it acquires the remaining two, a window of hardly two or three seconds, so its probability is very low.
- **Verbatim:** "for it to acquire lock on these two, it would hardly take two or three seconds, not more than that." (teacher)
- **Issue:** It rests on L-0316's premise. The real exposure is the whole lock TTL: any lock-holding instance that restarts empty, or is replaced, before the TTL expires lets another client reach a majority. Redis docs require delayed restarts (out for longer than the max TTL) or fsync=always, not low probability.
- **Suggested note:** The risk window is the lock's TTL, not a few seconds; Redis docs close it by keeping crashed nodes out for longer than the max TTL.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)

### L-0328 | imprecise | severity: medium

- **Teacher/ledger statement:** ZooKeeper-based locking does exactly what was built with Redis; you either implement it with Redis or use ZooKeeper.
- **Verbatim:** "It does exactly what I talk about. Exactly this. So either you implement with Redis or do you use ZooKeeper." (teacher)
- **Issue:** Same goal, different mechanism and guarantees. ZooKeeper uses ephemeral sequential znodes, with each waiter watching its predecessor ("There is no polling or timeouts"), session-bound release and consensus-replicated state. The Redis loop polls and relies on TTL and clocks. Kleppmann recommends ZooKeeper-style consensus with fencing when correctness matters.
- **Suggested note:** ZooKeeper solves the same problem with ephemeral sequential nodes, watches (no polling) and consensus replication, which gives stronger safety than a Redis TTL lock.
- **Sources:** [zookeeper.apache.org](https://zookeeper.apache.org/doc/current/recipes.html), [martin.kleppmann.com](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)

### L-0279 | simplified | severity: medium

- **Teacher/ledger statement:** You own the distributed lock only if you acquired it on more than 50% of the nodes; holding the majority means no other contending process can also hold it.
- **Verbatim:** "if you succeed in acquiring lock on more than 50 percent of nodes" (teacher)
- **Issue:** Redlock also requires that the time spent acquiring is less than the lock validity time; the usable validity is the TTL minus that time. Mutual exclusion holds only while the holder finishes within it. Pauses and clock jumps can still produce two holders (Kleppmann).
- **Suggested note:** You hold the Redlock only if you locked a majority (N/2+1) of instances and the time spent acquiring is less than the TTL; your safe window is the TTL minus that time.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/), [martin.kleppmann.com](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)

### L-0282 | simplified | severity: medium

- **Teacher/ledger statement:** Because the lock is distributed, one Redis node going down is no problem; edge cases remain but their probability is reduced to a bare minimum.
- **Verbatim:** "there are still edge cases, there is still problem with correctness in it, but still reduces the probability of hitting that to a bare minimum" (teacher)
- **Issue:** The remaining failures are not only node crashes. A paused client (GC, slow I/O) keeps working after its lock expires, and Redis TTL uses the wall clock, so clock jumps matter. Redis's own docs say "You should implement fencing tokens". Fast restarts without fsync=always break safety unless restarts are delayed.
- **Suggested note:** Redlock survives single node failures, but process pauses, clock jumps and fast restarts can still give two holders; correctness-critical uses need fencing tokens.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/), [martin.kleppmann.com](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)

### L-0293 | simplified | severity: medium

- **Teacher/ledger statement:** (student) If a consumer holding a single-connection lock dies, its TCP connection goes down and the server knows the connection is gone.
- **Verbatim:** "The consumer dies then because the consumer dies, the TCP goes down, right? If it dies also connection is gone." (student (proposal))
- **Issue:** True for a process crash on a live host (the kernel sends FIN/RST). If the host dies or is partitioned, nothing is sent. The server finds out only via an application timeout or TCP keepalive, which is off unless SO_KEEPALIVE is set and starts after 7200 s idle by default.
- **Suggested note:** A crashed process closes its connection, but a crashed or partitioned host does not; the lock server still needs a timeout (lease) to free the lock.
- **Sources:** [man7.org](https://man7.org/linux/man-pages/man7/tcp.7.html)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0243 | simplified | low | DB transactions are not always threads: PostgreSQL uses a process per connection, coordinated via shared memory |
| L-0245 | imprecise | low | dpkg uses a kernel fcntl lock on /var/lib/dpkg/lock (auto-released on exit), not an exists-then-create file |
| L-0246 | simplified | low | Processes can share memory too (PostgreSQL backends); "processes sync via disk" is one option, not the rule |
| L-0258 | imprecise | low | Single-instance SET NX lock is not "Redlock"; Redlock is the multi-instance algorithm |
| L-0264 | simplified | low | Use SET key val NX EX 300 (SETNX has no expiry); value must be a unique random token, not a host name |
| L-0265 | simplified | low | SETNX returns 1/0; SET NX EX returns OK/nil |
| L-0267 | simplified | low | Retry with a (random) delay instead of a tight spin |
| L-0277 | simplified | low | Consensus-replicated clusters (ZooKeeper/etcd/Chubby) do remove the SPOF; it's async replication that fails |
| L-0280 | simplified | low | Docs: unlock all instances, even ones you think you failed on |
| L-0281 | simplified | low | Kleppmann: efficiency locks need only one Redis; correctness locks want consensus plus fencing |
| L-0291 | simplified | low | Other clients aren't rejected; they queue in the listen backlog |
| L-0296 | simplified | low | MySQL GET_LOCK is a built-in named lock released when the session ends |
| L-0297 | simplified | low | Cron TTL is coarse; check expiry in the acquire statement, or use GET_LOCK |
| L-0302 | simplified | low | Visibility timeout is not OCI-specific; SQS does the same |
| L-0307 | imprecise | low | The queue example is mutual exclusion, not a distributed transaction |
| L-0308 | simplified | low | Same as L-0246 |
| L-0310 | simplified | low | Answer to the "TTL bottleneck": extend/renew the lease while working |
| L-0311 | simplified | low | Using a mutex is two lines; implementing one is not (atomics plus OS support) |
| L-0315 | simplified | low | This edge case has a documented fix (delayed restarts / fsync=always) |
| L-0317 | simplified | low | "Wait for cluster healthy" ≈ documented delayed-restart fix; an empty new node joining at once is the unsafe case |
| L-0319 | imprecise | low | Redlock holder does not keep acquiring the remaining instances |
| L-0329 | simplified | low | Persistence fixes crash-restart only, not clock or pause issues |
| L-0343 | simplified | low | Raw intra-DC RTT is ~0.5 ms; 3-10 ms is a per-service-hop budget |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0244 | Personal anecdote (note: the real file is /var/lib/dpkg/lock, not dpkg.lock) |
| L-0276 | Opinion about how many companies use distributed locks; no usage data |
| L-0324 | Personal aside (writing own malloc) |
| L-0333 | Opinion about startups and ZooKeeper/Java; ZooKeeper does ship Java and C clients |
| L-0344 | Private anecdote (4 microservices, petabytes) |
