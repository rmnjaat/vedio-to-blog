# Lecture 05 (lec08): fact-check treatments applied

Policy (from `lectures/LESSON_DESIGN_BRIEF.md`, applied mechanically):
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its source.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added).
- **simplified-low:** left as taught. Where a verified addition attaches, it is woven in as a separate sourced sentence, never as a correction of the teacher's sentence.
- **unverifiable:** stated as the instructor's (or the class's) experience or opinion, with no empty source link. No unverifiable item here is medium or high, so none needs a "not independently verified" note.

Note on `policy_summary.md`: it proposes sourced notes for the three simplified-medium items (L-0084, L-0279, L-0282) and inline text for every simplified-low item. The brief is stricter and is followed here: simplified-medium gets a light inline clarification (with its source link and the attached additions, so nothing is lost), and simplified-low is left as taught.

The verifier's one override is applied (L-0293: simplified/medium → simplified/low; `verdict_overrides.jsonl`). Version wording follows `verdict_review.md`: Prometheus "3.15 docs", MongoDB "9.0 docs", Redis `DELEX … IFEQ` "since 8.4" (the lecture's Lua `EVAL` release stays valid for older versions).

Counts: 97 flagged items = 11 with a SourceNote (8 notes) + 20 inline clarifications + 49 left as taught + 17 attributed as unverifiable.

## 1. SourceNotes

### SN-01 · §1.3 · L-0038 (imprecise/medium)
- **Teacher's point (kept):** A layer that is not horizontally scalable is a single point of failure.
- **More precisely:** A layer that cannot scale horizontally is a bottleneck; if it also has no standby or failover, it is a single point of failure. RDS Multi-AZ is the counter-example: a synchronous standby gives failover, but AWS says it 'isn't a scaling solution'.
- **Additions used:** A-DSC-08
- **Sources:** https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html

### SN-02 · §2.4 · L-0091 (imprecise/medium)
- **Teacher's point (kept):** Data warehouses use least-connection-based balancing across clusters (per BigQuery / Redshift documentation), because a data warehouse classically mixes short-running and long-running queries.
- **More precisely:** Data warehouses face the same mixed short/long query problem, but neither the Redshift nor the BigQuery documentation describes least-connections balancing. They use workload management: separate queues for short and long queries, slots and fair scheduling.
- **Sources:** https://docs.aws.amazon.com/redshift/latest/dg/cm-c-implementing-workload-management.html · https://docs.cloud.google.com/bigquery/docs/slots

### SN-03 · §4.5 · L-0227 (wrong/medium)
- **Teacher's point (kept):** Using the real-time Pub/Sub broker guarantees message delivery of configuration changes to all LB servers.
- **More precisely:** Redis Pub/Sub broadcasts changes in real time, but its delivery is at-most-once: a subscriber that is disconnected or errors loses the message for good. Pair it with a full config re-pull whenever an LB server (re)connects, or use Redis Streams, which persist messages.
- **Additions used:** A-LBL-06
- **Sources:** https://redis.io/docs/latest/develop/pubsub/

### SN-04 · §4.6 · L-0369 (imprecise/medium), L-0370 (wrong/medium)
- **Teacher's point (kept):** Prometheus can be horizontally scaled easily: run multiple query engine servers and replicate the database, because it is just raw storage being scaled.
- **Teacher's point (kept):** Per the teacher, Prometheus mostly uses InfluxDB in the backend, though storage is configurable and TimescaleDB can be used as well.
- **More precisely:** Prometheus keeps its data in its own local time-series database (two-hour blocks plus a write-ahead log; Prometheus 3.15 docs). Local storage is single-node, not clustered or replicated. It scales by running more independent servers (sharding, federation) and by remote-writing to a clustered long-term store; InfluxDB or TimescaleDB attach only through those remote write/read APIs.
- **Additions used:** A-LBL-07
- **Sources:** https://prometheus.io/docs/prometheus/latest/storage/

### SN-05 · §6.3 · L-0303 (imprecise/medium)
- **Teacher's point (kept):** Real queues such as RabbitMQ, SQS and Kafka give the guarantee that a message is not handed to multiple consumers, so you do not have to build anything around it.
- **More precisely:** RabbitMQ, SQS and Kafka keep two consumers from receiving a message at the same time, but they deliver at-least-once: a message can come back, even to another consumer, so processing must be idempotent.
- **Additions used:** A-LDA-13
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html · https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html · https://kafka.apache.org/43/design/design/ · https://www.rabbitmq.com/docs/confirms

### SN-06 · §6.7 · L-0328 (imprecise/medium)
- **Teacher's point (kept):** ZooKeeper-based locking does exactly what was built with Redis; you either implement it with Redis or use ZooKeeper.
- **More precisely:** ZooKeeper solves the same problem by a different mechanism: each client creates an ephemeral sequential znode, the lowest one holds the lock, each waiter watches only the node before it (no polling), and the state is replicated by consensus. That gives stronger safety than a Redis TTL lock.
- **Additions used:** A-LDA-12
- **Sources:** https://zookeeper.apache.org/doc/current/recipes.html · https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html · https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html

### SN-07 · §6.8 · L-0305 (imprecise/medium), L-0306 (imprecise/medium)
- **Teacher's point (kept):** Where remote locks are used: a MongoDB distributed transaction updating three documents on shards one, three and five holds locks on those documents; another transaction wanting the same documents must wait. That lock...
- **Teacher's point (kept):** MongoDB gives these guarantees via its own lock manager that records which transaction holds a lock on which document of which shard; a second transaction asking for a locked document is told to wait until the first...
- **More precisely:** A MongoDB multi-shard transaction does take document locks on each shard it touches. A conflicting transaction does not wait for the first to commit: it waits up to 5 ms by default, then aborts and must be retried. Only a write outside a transaction waits for the transaction to end (MongoDB 9.0 docs).
- **Additions used:** A-LDA-14
- **Sources:** https://www.mongodb.com/docs/manual/core/transactions-production-consideration/

### SN-08 · §7.3 · L-0316 (imprecise/medium), L-0318 (imprecise/medium)
- **Teacher's point (kept):** Because losers keep releasing while the majority holder (C1) keeps trying to acquire the remaining instances, the system eventually converges to C1 holding the lock on all instances; only a majority is needed to move...
- **Teacher's point (kept):** The edge case needs the two instances on which the majority holder already has the lock to go down before it acquires the remaining two - a window of hardly two or three seconds - so its probability is very low.
- **More precisely:** In Redlock the winner holds only the majority it got in one pass; it does not keep acquiring the remaining nodes, and losers release everything and retry after a random delay. The risk window when lock-holding nodes restart empty is the lock's TTL, not a few seconds; Redis closes it by keeping a crashed node out for longer than the max TTL (delayed restarts) or with fsync=always.
- **Additions used:** A-LDA-07
- **Sources:** https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/

## 2. Light inline clarifications

| id | verdict | § | treatment on the page | additions | sources |
|---|---|---|---|---|---|
| L-0064 | imprecise/low | 2.3 | Check the load balancer's documented algorithm options; managed LBs expose a fixed set (e.g. ALB: round robin, least outstanding requests, weighted random) and some (NLB) are not configurable. | - | https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html · https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html |
| L-0073 | imprecise/low | 2.4 | An in-flight request (not merely an open connection) means the server is busy; with keep-alive, LBs count active connections or outstanding requests. | A-LBL-15 | https://www.rfc-editor.org/rfc/rfc9112#section-9.3 · https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html |
| L-0084 | simplified/medium | 2.6 | TCP itself never times out an idle connection, but load balancers, NATs and firewalls on the path do, so long-lived connections need keep-alives or periodic data. | A-DSC-01, A-DSC-02 | https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4 · https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-load-balancer-attributes.html |
| L-0085 | imprecise/low | 2.6 | HTTP/1.0 closed the connection after each response unless keep-alive was used; HTTP/1.1 keeps connections open by default. | A-DSC-03 | https://www.rfc-editor.org/rfc/rfc9112#section-9.3 |
| L-0093 | imprecise/low | 2.6 | Two corrections. (1) Some common servers do give tooling: Go's net/http cancels the request Context 'when the client's connection closes', so a handler can stop work. (2) The socket only reports a disconnect when a FIN or RST arrives. A peer that vanished (power loss, cable cut, dropped NAT entry) goes unnoticed until you write or keep-alive probes fail, because TCP 'does not inherently include a liveness detection capability' (RFC 9293). | A-DSC-05 | https://pkg.go.dev/net/http#Request.Context · https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4 |
| L-0117 | imprecise/low | 3.3 | A TCP proxy copies the byte stream, not packets: the kernel reassembles bytes on one socket and re-segments them into new packets on the other (io.Copy works reader-to-writer on bytes). | - | https://pkg.go.dev/io#Copy |
| L-0118 | imprecise/low | 3.3 | A TCP proxy is protocol-agnostic only for protocols carried over TCP (HTTP/1.1-2, WebSocket, RTMP). ICMP is part of the IP layer, not carried over TCP, so it cannot pass through this proxy (nor can UDP-based protocols). | - | https://www.rfc-editor.org/rfc/rfc792 |
| L-0138 | imprecise/low | 3.4 | In Go a closed connection does not panic: io.Copy returns (nil at EOF, or an error such as a reset), and that return is where you update counters. | - | https://pkg.go.dev/io#Copy |
| L-0200 | imprecise/low | 4.6 | Each VM runs an exporter; Prometheus scrapes (pulls) them, and the orchestrator queries Prometheus. | A-LBL-08 | https://prometheus.io/docs/introduction/overview/ · https://prometheus.io/docs/prometheus/latest/storage/ |
| L-0208 | imprecise/low | 5.1 | An IP address is not inherently tied to one machine: a virtual IP can move between machines (VRRP failover), and with ECMP/anycast many machines serve the same IP (Google's Maglev). DNS with multiple IPs is one valid approach, not the only one. | A-LBL-11 | https://www.rfc-editor.org/rfc/rfc5798 · https://research.google/pubs/maglev-a-fast-and-reliable-software-network-load-balancer/ |
| L-0234 | imprecise/low | 5.3 | DNS does not bottom out in one server with a standby: resolvers list several nameservers, and the root zone is served by 13 identities with about 2,047 anycast instances. | - | https://man7.org/linux/man-pages/man5/resolv.conf.5.html · https://root-servers.org/ |
| L-0236 | imprecise/low | 5.6 | End users resolve through a public recursive resolver, which asks the authoritative DNS (e.g. Route 53) for the domain. | - | https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html |
| L-0245 | imprecise/low | 6.2 | apt/dpkg serialise through an fcntl lock on /var/lib/dpkg/lock that the kernel releases automatically when the holding process exits. | A-LDA-16 | https://salsa.debian.org/dpkg-team/dpkg/-/raw/main/doc/spec/frontend-api.txt · https://man7.org/linux/man-pages/man2/fcntl_locking.2.html |
| L-0258 | imprecise/low | 6.4 | Redis offers key-value access, atomic commands and TTL, so the common remote lock is a single-instance Redis lock (SET key value NX EX ttl); Redlock is the multi-instance version of it. | - | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ |
| L-0279 | simplified/medium | 7.2 | You hold the Redlock only if you locked a majority (N/2+1) of instances and the time spent acquiring is less than the TTL; your safe window is the TTL minus that time. | A-LDA-05 | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ · https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html |
| L-0282 | simplified/medium | 7.2 | Redlock survives single node failures, but process pauses, clock jumps and fast restarts can still give two holders; correctness-critical uses need fencing tokens. | A-LDA-08 | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ · https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html |
| L-0307 | imprecise/low | 6.8 | The queue example is mutual exclusion (a lock), not a distributed transaction: there is no atomic commit or rollback across participants. Distributed transactions use locks, but a lock alone is not a transaction. | - | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ |
| L-0319 | imprecise/low | 7.3 | Same as L-0316: in Redlock a client that already has a majority does not keep trying the remaining instances. Restarted nodes are handled by delayed restarts and persistence, not by the holder grabbing more nodes. | - | https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ |
| L-0353 | imprecise/low | 5.5 | CoreDNS is not made highly available by leader election: it is stateless, so you run several replicas and clients list multiple nameservers (resolv.conf allows up to 3, tried in order). | - | https://man7.org/linux/man-pages/man5/resolv.conf.5.html |
| L-0355 | imprecise/low | 5.3 | The CoreDNS manual (checked Oct 2026) has no dedicated production or high-availability guide; it covers installation, plugins, configuration and example setups. | - | https://coredns.io/manual/toc/ |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (not shown as a correction) | addition woven in as a separate sentence |
|---|---|---|---|
| L-0035 | 1.1 | Remote machines talking to each other are technically a distributed system, but not a good one unless every layer scales and tolerates failure. | - |
| L-0036 | 1.3 | Distributed systems are built to scale horizontally and to tolerate failures of individual machines. | - |
| L-0039 | 1.3 | Stated as absolute, but the teacher relaxes it (L-0044: a non-scalable database is fine if it handles the load) and later uses a single active node with a standby. The real requirement for every layer is enough capacity for peak load and no unprotected single point of failure; scaling out is one way to get that, a standby is another. | - |
| L-0041 | 1.3 | Knowing per-server capacity is right. Two cautions: (1) linear growth is an ideal; shared dependencies (database, locks, coordination) make extra servers add less and less; (2) request count is a weak capacity unit when request costs vary. Google SRE recommends measuring capacity in resources (CPU) rather than queries per second. | A-DSC-09 |
| L-0061 | 2.3 | RAM size is not core count; utilization only halves if the bigger machine has proportionally more of the resource that actually bottlenecks (CPU, memory, I/O). The point (equal shares underuse a bigger machine) stands. | - |
| L-0079 | 2.5 | Many LBs only see connections, but some use backend-reported load: gRPC's weighted round robin computes weights from backend-reported utilization (per-call or out-of-band), and ALB's Automatic Target Weights shifts traffic based on error rates. | A-LBL-19 |
| L-0080 | 2.5 | Querying CPU on every request is impractical, but load reports can be collected asynchronously and used to adjust weights periodically, as gRPC's weighted round robin policy does; the per-request decision stays local and fast. | - |
| L-0086 | 2.6 | gRPC does use long-lived HTTP/2 connections that the protocol does not time out (server MAX_CONNECTION_IDLE and MAX_CONNECTION_AGE default to infinite). But proxies and load balancers can treat them as idle and drop them, which is why gRPC has HTTP/2 PING keepalives. Servers can also be configured to close connections or send GOAWAY. | A-DSC-04 |
| L-0089 | 2.4 | Random tie-breaking is fine; for reference, nginx breaks ties among least-connection servers with weighted round-robin. | A-LBL-02 |
| L-0102 | 3.2 | This describes a layer-4 TCP proxy. Many load balancers are layer-7 HTTP proxies (e.g. AWS ALB evaluates HTTP listener rules), and NLB/Maglev-style LBs forward packets per flow instead of running a normal TCP server. | - |
| L-0110 | 3.2 | True for HTTP/1.1 and HTTP/2; HTTP/3 runs over QUIC (UDP). | - |
| L-0112 | 3.2 | True for proxy-style (connection-terminating) load balancers. Packet-level LBs such as Google's Maglev forward the client's packets to a backend using connection tracking and consistent hashing, without opening a second TCP connection. | - |
| L-0122 | 4.1 | The 10,000 limit is illustrative. Real limits are file descriptors, memory and ephemeral ports: connections from one LB IP to one backend ip:port are bounded by the local port range (Linux default 32768-60999, about 28k). | A-LBL-14 |
| L-0151 | 4.2 | A same-datacenter round trip is about 0.5 ms (2012-era reference numbers); 3-5 ms is plausible for a full DB query. The conclusion (don't hit the DB per request) holds. | - |
| L-0158 | 4.3 | TCP health checks are a real, common option (AWS NLB's default health check protocol is TCP), but they prove only that the port accepts connections, not that the application can serve requests; HTTP checks on a health path are stronger. | - |
| L-0164 | 4.3 | Managed LBs mark failed targets unhealthy rather than deleting them, keep checking so they can return, and fail open (route to all) if every target is unhealthy. | A-LBL-03 |
| L-0178 | 4.5 | Redis Pub/Sub is at-most-once: a subscriber that is disconnected misses messages for good, so LB servers must re-pull the full config on reconnect (or use Redis Streams). | - |
| L-0197 | 4.6 | A single Prometheus server is autonomous and scales vertically well, but its local storage is not clustered; scaling past one server means sharding/federation or remote storage. | - |
| L-0215 | 5.2 | DNS 'load balancing' is cruder than LB algorithms: Route 53 supports weighted records, while plain round-robin DNS (e.g. CoreDNS loadbalance) just shuffles the order of all returned records. | A-LBL-20 |
| L-0216 | 5.2 | DNS often returns several IPs and the client chooses which to use (AWS: the DNS servers 'return one or more IP addresses'; 'The client determines which IP address to use'). | - |
| L-0220 | 5.2 | Clients and resolvers cache answers for the record's TTL (ELB uses 60 s precisely so IPs can be remapped quickly); not every client stack caches, and caching is bounded by the TTL. | - |
| L-0231 | 5.2 | In practice clients usually try the other addresses from the same DNS answer (Happy Eyeballs) before re-resolving; a fresh query can still return the cached answer from an intermediate resolver until the TTL ends. | - |
| L-0235 | 5.3 | Hop counts vary by path, and the top of the DNS hierarchy is itself widely replicated (13 root identities, about 2,047 instances), not a single node with a standby. | - |
| L-0243 | 6.2 | Threads (and database backends, whether threads or processes) coordinate through shared memory: mutexes, semaphores, atomic instructions. | - |
| L-0246 | 6.2 | Use the nearest thing the parties share: threads share memory; processes can share memory or a kernel-held file lock; machines share only the network. | - |
| L-0264 | 6.5 | Acquire with SET q <random token> NX EX 300 in a loop; the token must be unique per lock request. | A-LDA-01, A-LDA-02 |
| L-0265 | 6.5 | Mixes two commands. SETNX returns 1/0 but cannot set an expiry. SET with NX and EX returns OK when it sets the key and nil when it doesn't (redis-py: True/None). The never-overwrite behaviour is correct. | - |
| L-0267 | 6.5 | A tight while-true loop of SET NX hammers Redis with requests. Redis docs say to 'retry after some time' and, for Redlock, 'try again after a random delay' so contending clients desynchronise. | - |
| L-0277 | 7.1 | Right for Redlock: plain Redis replication with failover is unsafe because 'Redis replication is asynchronous' (a promoted replica may not have the lock key). But 'running it in a cluster' is how other lock services get fault tolerance: ZooKeeper, etcd and Chubby replicate state with a consensus protocol. The distinction is async replication versus consensus, not cluster versus no cluster. | - |
| L-0280 | 7.2 | Redis docs go one step further: a failed client should 'try to unlock all the instances (even the instances it believed it was not able to lock)'. A SET may have succeeded even though its reply was lost. This is safe because the release script only deletes the key if it holds this client's token. | A-LDA-06 |
| L-0281 | 7.2 | Fair for Redlock (N round trips per acquire). Kleppmann's nuance: if the lock is only for efficiency, a single Redis instance is enough. If it is for correctness, Redlock's timing assumptions are a problem, and a consensus system (ZooKeeper) plus fencing tokens is recommended. | A-LDA-09 |
| L-0283 | 7.5 | The example just shown (Redlock across five Redis nodes) was made distributed for fault tolerance, not for horizontal scale; the teacher says so in L-0287. 'Horizontally scalable like this' blurs the two; the point is that no piece should be a single instance whose failure stalls the system. | - |
| L-0291 | 6.7 | Works as a mutual-exclusion idea, but other clients are not refused. The kernel completes their TCP handshakes and parks them in the listen backlog ('completely established sockets waiting to be accepted'). They see ECONNREFUSED only when the backlog is full. Clients therefore wait in the backlog without knowing whether they hold the lock until the server accepts and responds. | - |
| L-0293 | 6.7 | A crashed process closes its connection, but a crashed or partitioned host does not; the lock server still needs a timeout (lease) to free the lock. | A-LDA-15 |
| L-0296 | 6.4 | Correct that MySQL can serve as a lock store. MySQL also has named locks built in: GET_LOCK(name, timeout) is exclusive and is released 'implicitly when your session terminates (either normally or abnormally)'. That is effectively a liveness-based TTL. GET_LOCK locks only a single mysqld, though. | A-LDA-11 |
| L-0297 | 6.4 | A cron job works but is coarse: a stale lock stays until the next cron run. Common alternatives are an expires_at column checked in the acquire statement itself (take the row only if it is free or expired), or GET_LOCK, which is released when the holder's session ends. | - |
| L-0302 | 6.3 | The student's description of OCI Queue is right: 'the message is hidden from other consumers for a pre-defined amount of time, which is known as its visibility timeout'. But this is not specific to OCI: SQS works the same way (default visibility timeout 30 s). In both, the message reappears if not deleted in time. | - |
| L-0308 | 6.2 | Same principle as L-0246 (student summary endorsed). Two processes on one host can also share memory (PostgreSQL backends coordinate through shared memory and semaphores), and file locks are kernel state, so the disk is not the only shared medium between processes. | - |
| L-0310 | 6.4 | Right that expiry is what prevents perpetual locks; ZooKeeper's equivalent is the session (ephemeral nodes vanish when the session ends). The student's bottleneck worry has a standard answer: the holder extends the lease while it is still working. Redis docs describe extending the TTL with a Lua script if the value is still yours; the DynamoDB lock client heartbeats to extend its lease. Use a short TTL and renew it, rather than a long one. | A-LDA-10 |
| L-0311 | 6.2 | Using a mutex is two lines (pthread_mutex_lock/unlock). Implementing one is not: it relies on atomic CPU instructions and OS support to block waiters. The teacher's point holds: in-memory locking is cheap (about 25 ns per lock/unlock) compared with network round trips. | - |
| L-0315 | 7.3 | Agreed that Redlock is not foolproof. But this case has a documented fix rather than only low probability: delayed restarts (a crashed node stays out for longer than the max TTL) or fsync=always persistence. | A-LDA-07 |
| L-0317 | 7.3 | The 'wait until the cluster is healthy' idea matches the documented fix: keep a crashed or replaced instance out for at least the max TTL (delayed restart), so it cannot grant a lock that is still active elsewhere. A newly spun-up empty node joining immediately is exactly the unsafe case. | - |
| L-0329 | 6.7 | Persistence (AOF fsync=always) fixes only crash-restart losses. It does not give Redis consensus or protect against clock jumps and client pauses, which is the student's point. The teacher's hedge ('not saying this is better') is fair. | - |
| L-0331 | 4.5 | ZooKeeper watches are one-time triggers sent over the client's session connection; a client must re-register after each notification and re-read the data. | A-LBL-17 |
| L-0332 | 4.5 | Close, but ZooKeeper watches are one-time triggers that must be re-set, and they carry an ordering guarantee (a client sees the watch event before the new data), unlike plain pub/sub. | - |
| L-0337 | 5.2 | Plain DNS has no load information, but managed DNS can be health-aware: Route 53 stops answering with records whose health checks fail. | - |
| L-0340 | 5.7 | Hash-based stickiness works, but adding or removing servers remaps some users (consistent hashing keeps this to a few keys) and a failed server loses its in-memory sessions. | A-LBL-12 |
| L-0343 | 5.7 | As a per-service-hop budget (serialization, TLS, queueing, handler time) 3-10 ms is plausible. The raw network is faster: a round trip within one datacenter is about 0.5 ms (Jeff Dean's ~2012 figures), and AWS describes inter-AZ latency as 'single-digit millisecond'. The point (every hop costs, so count hops) stands. | A-LDA-17 |
| L-0364 | 5.7 | Authorization (is A allowed to pay B) is business logic, but authentication can be offloaded to the LB: AWS ALB can authenticate users via OIDC/Cognito. Auth failures are usually 401/403, not 404. | A-LBL-21 |

## 4. Unverifiable: attributed, no source link

| id | § | type | how it is presented |
|---|---|---|---|
| L-0002 | 1.1 | claim | the instructor's opinion or observation, worded as such. |
| L-0021 | 1.1 | claim | the instructor's opinion or observation, worded as such. |
| L-0025 | 1.1 | claim | the instructor's opinion or observation, worded as such. |
| L-0045 | 2.1 | claim | the instructor's opinion or observation, worded as such. |
| L-0046 | 2.1 | claim | the instructor's opinion or observation, worded as such. |
| L-0048 | 2.1 | example | attributed as the instructor's experience or opinion. |
| L-0065 | 2.3 | war_story | the instructor's own story, in a margin note, attributed; A-LBL-13 (optional) follows as a separate sourced sentence. Fact-check aside: Teacher's experience. Note: Standard Linux/UNIX Reserved Instances can be modified to other sizes in the same family (same footprint), which may have been an alternative. |
| L-0068 | 2.3 | rule_of_thumb | the instructor's advice, worded as such. |
| L-0095 | 3.1 | war_story | the instructor's own story, in a margin note, attributed. |
| L-0097 | 3.1 | war_story | the instructor's own story, in a margin note, attributed. |
| L-0244 | 6.2 | war_story | the instructor's own story, in a margin note, attributed. |
| L-0276 | 7.1 | claim | the instructor's opinion or observation, worded as such. Fact-check aside not used as a correction: Opinion about industry usage; no public data. Managed services do hide most lock needs. But many ordinary teams take simple locks for cron jobs, leader election or deduplication (Redis SET NX, DynamoDB lock client, MySQL GET_LOCK). Chubby is a real Google lock service (Burrows, OSDI 2006). |
| L-0324 | 8 | war_story | the instructor's own story, in a margin note, attributed. |
| L-0326 | 7.4 | rule_of_thumb | the instructor's advice, worded as such. |
| L-0327 | 8 | war_story | the instructor's own story, in a margin note, attributed. |
| L-0333 | 6.7 | claim | the instructor's opinion or observation, worded as such. Fact-check aside not used as a correction: Opinion about startup preferences. Fact: ZooKeeper ships official client libraries in Java and C, so non-Java stacks can use it through C-based bindings; the server itself runs on the JVM. |
| L-0344 | 5.7 | war_story | the instructor's own story, in a margin note, attributed. |

## 5. Not flagged by the fact-check

22 ledger items had no verdict (mostly course logistics and reading lists): L-0001, L-0004, L-0006, L-0009, L-0012, L-0014, L-0015, L-0016, L-0018, L-0020, L-0099, L-0143, L-0146, L-0179, L-0223, L-0229, L-0230, L-0284, L-0285, L-0286, L-0301, L-0335. The placed ones are course-structure facts, forward references or reading advice and need no check. The dropped ones are listed in `placement.json`.

## 6. Verified additions not used

- A-DSC-10: usefulness 'drop' (verifier): duplicates A-LDA-03 (DELEX IFEQ), which is used in 6.6.

Every other verified addition (49) is placed: `keep` ones all, and the six `optional` ones (A-DSC-09, A-LBL-13, A-LBL-14, A-LBL-18, A-LBL-19, A-LDA-17) because each answers a question a reader would ask at that point. See `placement.json` → `additions`.
