# Fact-check report: distributed cache, distributed hash tables, concurrency, communication, learning approach (Lecture 07)

Scope: every ledger id of group `distributed_cache_learning_approach` in `groups.json` (topic roots distributed-cache, learning-approach, distributed-hash-table, concurrency, communication); no items skipped. **273 items checked.** Checked 2026-10-13 against current docs and source (Redis `unstable` branch and redis.io as of Oct 2026, including Redis 8.6 LRM policies; MySQL 8.4; PostgreSQL current; RFC 9112/9293).

## Counts

| Verdict | Count |
|---|---|
| accurate | 204 |
| simplified | 26 |
| imprecise | 29 |
| wrong | 3 |
| outdated | 1 |
| unverifiable | 10 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 15 |
| low | 45 |
| none | 213 |

Additions proposed: 25 (see `distributed_cache_learning_approach_additions.jsonl`).

Calibration: the lecture is a live, design-from-first-principles walk-through of a Redis-like cache, so board pseudo-code (zmalloc with eviction inside, 4-byte pointers, the ring with 16 slots) is judged as teaching simplification unless it would leave a wrong idea about how real systems behave. Items are flagged medium where a learner repeating them in an interview or design review would be wrong: the segfault-on-heap-exhaustion explanation, HTTP/1.1 as connection-per-request, 'almost all databases return the master's IP', the Internet/DNS/Bitcoin as DHTs, the virtual-node claims, the 'LRU is impossible under memory limits' answer, and the shared-lock lost-update explanation in the MySQL Q&A. Student proposals were checked only where the item records them as upheld. Anecdotes and opinions are `unverifiable` with severity none, except the Linux '52,000 linked lists' figure (low).

## Items needing a decision (ordered by severity)

### L-0104 | wrong | severity: medium

- **Teacher/ledger statement:** Allocating beyond your allocated heap causes a segmentation fault: you are entering someone else's territory and your program crashes.
- **Verbatim:** "Segmentation fault. Right? Your program crashes." (teacher)
- **Issue:** Exhausting memory does not by itself raise a segmentation fault, and a process cannot enter 'someone else's territory', because every process has its own virtual address space. malloc returns NULL with errno ENOMEM when it cannot allocate. On Linux with overcommit, malloc can succeed and the OOM killer later kills a process when memory runs out. A segfault (SIGSEGV, 'invalid memory reference') comes when the program dereferences the unchecked NULL or another invalid address.
- **Suggested note:** When memory runs out, malloc returns NULL (or, with Linux overcommit, the OOM killer kills the process later); a segfault only happens if the program then uses an invalid pointer such as that unchecked NULL.
- **Sources:** [man7.org](https://man7.org/linux/man-pages/man3/malloc.3.html), [man7.org](https://man7.org/linux/man-pages/man7/signal.7.html)

### L-0182 | wrong | severity: medium

- **Teacher/ledger statement:** With stateless HTTP/1.1 each request establishes a TCP connection (three-way handshake), sends the data, gets the response and terminates the connection (two-way teardown), so every time an API server talks to the cache it re-establishes the connection.
- **Verbatim:** "Establishing TCP connection is a three-way handshake and two-way tear down." (teacher)
- **Issue:** HTTP/1.1 'defaults to the use of persistent connections' (RFC 9112 §9.3): one TCP connection carries many requests, and clients pool them. A new connection per request was HTTP/1.0 behaviour. HTTP being stateless refers to application state, not connections. TCP teardown is a FIN/ACK in each direction, not a two-way exchange. HTTP/1.1's real costs for a cache are verbose text headers and one in-flight request per connection.
- **Suggested note:** HTTP/1.1 reuses TCP connections by default (keep-alive); its overhead for a cache is the text request line and headers on every call and one outstanding request per connection, not a new handshake per request.
- **Sources:** [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9112), [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9293)

### L-0364 | wrong | severity: medium

- **Teacher/ledger statement:** Teacher's guess at the bug, reduced to two transactions on one row: both take a shared lock; T2 writes first, so its lock is elevated to exclusive; T1 still holds its shared lock, waits until the exclusive lock is released, then writes to the same row, overwriting it.
- **Verbatim:** "When it is trying to write it, it waits until an existing exclusive lock is released. Once it released, it wrote to the same location." (teacher)
- **Issue:** In InnoDB this sequence cannot happen. While T1 holds an S lock on the row, T2's request for an X lock 'cannot be granted immediately', so T2 cannot write first. If both hold S locks and both try to update, that is a deadlock: InnoDB rolls one transaction back. Lost updates in a seat-booking exercise usually come from reading availability with a plain (non-locking) consistent read and then updating unconditionally.
- **Suggested note:** With shared locks two transactions that both try to update the same row deadlock and InnoDB rolls one back; double-booking usually means the availability check used a non-locking read and the update did not re-check the condition.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html)

### L-0149 | imprecise | severity: medium

- **Teacher/ledger statement:** This overhead is a huge waste of memory, and it marks the difference between the theoretical implementation usually taught ('just use a linked list') and what real caches do.
- **Verbatim:** "This is a huge waste of memory." (teacher)
- **Issue:** Too broad. Memcached, a production in-memory cache, keeps a doubly linked LRU list per slab class (now split into HOT/WARM/COLD), and MySQL's InnoDB buffer pool manages pages as an LRU list. Redis chose to avoid the list and approximate LRU by sampling. That is a design choice, not what all 'real caches' do.
- **Suggested note:** Linked-list LRU costs pointers per key; Redis avoids it by sampling, while caches such as Memcached accept the overhead and keep doubly linked LRU lists.
- **Sources:** [raw.githubusercontent.com](https://raw.githubusercontent.com/memcached/memcached/master/doc/new_lru.txt), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html), [redis.io](https://redis.io/docs/latest/develop/reference/eviction/)

### L-0206 | imprecise | severity: medium

- **Teacher/ledger statement:** Over TCP there are typically three options: completely stateless HTTP/1.1 (connect, query, response, disconnect each time), gRPC (stateful, HTTP/2, connection kept open, highly compressed, Protobuf), or your own custom format.
- **Verbatim:** "when you go with TCP, we typically have three options, a completely stateless HTTP, HTTP 1.1" (teacher)
- **Issue:** HTTP/1.1 is not connect-query-disconnect: persistent connections are the default (RFC 9112 §9.3). gRPC messages are compact Protobuf over HTTP/2; compression is optional rather than 'highly compressed'.
- **Suggested note:** Over TCP the usual choices are HTTP/1.1 (text, keep-alive connections), gRPC (HTTP/2, binary Protobuf, multiplexed) or a custom binary/text protocol like Redis's RESP.
- **Sources:** [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9112), [github.com](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md)

### L-0237 | imprecise | severity: medium

- **Teacher/ledger statement:** Asked how to design LRU/LFU at a high level under memory constraints, the teacher answers 'You cannot do that' - it is a very deep implementation - so go with random eviction, which is very low on memory, needs no additional data and only risks deleting an important key.
- **Verbatim:** "So that's why go with random. That's very low on memory. You don't need any additional data." (teacher)
- **Issue:** LRU under tight memory is possible: approximated LRU stores one small timestamp per key (24 bits in Redis), samples a few keys at eviction time and evicts the oldest. Redis docs say this is 'virtually equivalent' to true LRU for typical workloads. Random eviction is one valid option, not the only one.
- **Suggested note:** Under memory constraints use approximated LRU/LFU: keep a few bits of access time or frequency per key and, on eviction, sample a handful of keys and evict the worst - as Redis does.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/reference/eviction/)

### L-0261 | imprecise | severity: medium

- **Teacher/ledger statement:** Redis uses the redirect approach: when you fire a write on a replica, it returns the master's IP address and asks you to write on the master, because replicas don't take writes.
- **Verbatim:** "when you're firing a query on replica, it spits out the IP address of master and ask you to go write on master." (teacher)
- **Issue:** In plain Redis replication, a read-only replica rejects writes with an error and does not hand back the master's address. Clients find the master through Sentinel, which acts as a 'configuration provider'. Address-returning redirects are a Redis Cluster feature: a node replies '-MOVED <slot> <ip:port>' for keys it does not own, and replicas redirect clients to the authoritative master.
- **Suggested note:** Redis Cluster nodes answer with a MOVED redirect naming the right node; a standalone Redis replica just refuses writes, and clients learn the master's address from Sentinel.
- **Sources:** [redis.io](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/), [redis.io](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/), [redis.io](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/)

### L-0305 | imprecise | severity: medium

- **Teacher/ledger statement:** The entire internet, the BitTorrent network and the Bitcoin network are distributed hash tables.
- **Verbatim:** "The entire internet is a distributed hash table. The BitTorrent network is a distributed hash table." (teacher)
- **Issue:** BitTorrent's Mainline DHT is a DHT (Kademlia-based, for trackerless peer discovery). The Internet as a whole is not: IP routing and hierarchical DNS are not DHTs. Bitcoin finds peers through DNS seeds and addr gossip; its docs mention no DHT.
- **Suggested note:** BitTorrent's trackerless mode uses a Kademlia DHT; the Internet's routing and Bitcoin's peer discovery are not DHTs.
- **Sources:** [www.bittorrent.org](https://www.bittorrent.org/beps/bep_0005.html), [developer.bitcoin.org](https://developer.bitcoin.org/devguide/p2p_network.html)

### L-0311 | imprecise | severity: medium

- **Teacher/ledger statement:** DHTs are everywhere: distributed file systems (the teacher calls our distributed cache an example of one), DNS servers, instant messaging / IRC clients, P2P networks like BitTorrent, and IPFS.
- **Verbatim:** "DNS servers are DHTs. Instant messaging app, IRC clients, you might have heard of those, were DHTs." (teacher)
- **Issue:** DHTs can be used to build such services (Wikipedia lists DNS, instant messaging and file sharing as possible uses), but deployed DNS is a hierarchical delegated system, not a DHT, and IRC is client-server. True DHT examples: BitTorrent Mainline DHT, IPFS, Kad.
- **Suggested note:** DHTs can be used to build such services (Wikipedia lists DNS, instant messaging and file sharing as possible uses), but deployed DNS is a hierarchical delegated system, not a DHT, and IRC is client-server. True DHT examples: BitTorrent Mainline DHT, IPFS, Kad.
- **Sources:** [en.wikipedia.org](https://en.wikipedia.org/wiki/Distributed_hash_table), [www.bittorrent.org](https://www.bittorrent.org/beps/bep_0005.html)

### L-0326 | imprecise | severity: medium

- **Teacher/ledger statement:** Returning the master node's IP address when a write hits a read replica is the most common approach; almost all databases adopt it.
- **Verbatim:** "That is the most common way. Almost all databases adopt this." (teacher)
- **Issue:** Overgeneralised. Many databases reject a write on a replica with an error rather than returning the primary's address: a PostgreSQL hot standby errors on INSERT/UPDATE/DELETE, and a standalone Redis replica rejects writes. Drivers, Sentinel or connection strings find the primary. Address-returning redirects (Redis Cluster's MOVED) are one approach, not 'almost all'.
- **Suggested note:** Overgeneralised. Many databases reject a write on a replica with an error rather than returning the primary's address: a PostgreSQL hot standby errors on INSERT/UPDATE/DELETE, and a standalone Redis replica rejects writes. Drivers, Sentinel or connection strings find the primary. Address-returning redirects (Redis Cluster's MOVED) are one approach, not 'almost all'.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/hot-standby.html), [redis.io](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/), [redis.io](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/)

### L-0332 | imprecise | severity: medium

- **Teacher/ledger statement:** Virtual nodes (dividing the ring into many small virtual parts mapped to physical nodes) work against consistent hashing's goal: if one server goes down, many non-consecutive chunks have to move instead of a single neighbour transfer.
- **Verbatim:** "Then if one server goes down, I see a lot of chunks has to move, in place of the current strategy that you have." (student (proposal))
- **Issue:** With virtual nodes the total data moved is still about 1/N; it just comes from (or goes to) many nodes instead of one neighbour. Dynamo treats that as a benefit: a failed node's load 'is evenly dispersed across the remaining available nodes', and a new node 'accepts a roughly equivalent amount of load from each of the other available nodes'. The real costs are operational: more streams to coordinate, and Cassandra notes higher outage probability with many tokens.
- **Suggested note:** With virtual nodes the total data moved is still about 1/N; it just comes from (or goes to) many nodes instead of one neighbour. Dynamo treats that as a benefit: a failed node's load 'is evenly dispersed across the remaining available nodes', and a new node 'accepts a roughly equivalent amount of load from each of the other available nodes'. The real costs are operational: more streams to coordinate, and Cassandra notes higher outage probability with many tokens.
- **Sources:** [www.allthingsdistributed.com](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html), [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html)

### L-0335 | imprecise | severity: medium

- **Teacher/ledger statement:** Adding virtual nodes is not a good idea to solve the hot partition problem in a stateful use case; companies still do it and there are hacks around it.
- **Verbatim:** "So adding virtual nodes is not a good idea to solve hot partition problem. And it is stateful use case, not a good idea." (teacher)
- **Issue:** Stated as a general rule this conflicts with practice: Dynamo and Cassandra, both stateful stores, use virtual nodes precisely for load balance and faster, spread-out recovery. Cassandra 3.x+ reduced the token count with a deterministic allocator rather than dropping vnodes. Fine as the teacher's preference for small, simple clusters.
- **Suggested note:** Virtual nodes are a trade-off for stateful systems: better balance and parallel rebuilds (Dynamo, Cassandra) versus more complex data movement and more nodes involved in each range.
- **Sources:** [www.allthingsdistributed.com](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html), [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html)

### L-0336 | imprecise | severity: medium

- **Teacher/ledger statement:** Virtual nodes bring back a lot of network transfer, copying from many places instead of one, which is exactly what consistent hashing was adopted to reduce.
- **Verbatim:** "They're doing, still doing a lot of network transfer, which you started consistent hashing just to reduce that." (teacher)
- **Issue:** Virtual nodes do not increase the total data transferred when a node joins or leaves (still about 1/N of the data). They change where it comes from: many nodes in parallel instead of one neighbour.
- **Suggested note:** Virtual nodes do not increase the total data transferred when a node joins or leaves (still about 1/N of the data). They change where it comes from: many nodes in parallel instead of one neighbour.
- **Sources:** [www.allthingsdistributed.com](https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html), [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html)

### L-0359 | imprecise | severity: medium

- **Teacher/ledger statement:** When you exceed those limits you generally get a SIGABRT and the program does crash: the kernel kills the process to save itself.
- **Verbatim:** "the program does crash, right? Where you hit the program will crash because kernel will kill you the moment you exceed those limits." (student (proposal))
- **Issue:** Hitting a memory limit does not normally deliver SIGABRT from the kernel. RLIMIT_AS/RLIMIT_DATA make malloc return NULL (ENOMEM), and the kernel's OOM killer sends SIGKILL, which cannot be caught. SIGABRT comes from abort(3) inside the process, for example an uncaught std::bad_alloc in C++ or glibc detecting heap corruption.
- **Suggested note:** Exceeding a ulimit makes allocation fail (NULL/ENOMEM); exhausting system or cgroup memory gets the process killed by the OOM killer with SIGKILL; SIGABRT comes from the program calling abort().
- **Sources:** [man7.org](https://man7.org/linux/man-pages/man3/malloc.3.html), [man7.org](https://man7.org/linux/man-pages/man7/signal.7.html), [man7.org](https://man7.org/linux/man-pages/man3/abort.3.html)

### L-0365 | imprecise | severity: medium

- **Teacher/ledger statement:** The overwrite happens because the waiting transaction does not re-evaluate its statement after the lock is released.
- **Verbatim:** "So, which means that it is not revaluating the statement." (teacher)
- **Issue:** UPDATE/DELETE in InnoDB act on the latest committed row versions even under REPEATABLE READ ('The snapshot ... applies to SELECT statements ... not necessarily to DML'). PostgreSQL READ COMMITTED re-evaluates the WHERE clause after waiting. An overwrite happens when the UPDATE has no condition on the seat's state (e.g. WHERE id = ?) after a stale snapshot read, not because the database skips re-evaluation.
- **Suggested note:** UPDATE/DELETE in InnoDB act on the latest committed row versions even under REPEATABLE READ ('The snapshot ... applies to SELECT statements ... not necessarily to DML'). PostgreSQL READ COMMITTED re-evaluates the WHERE clause after waiting. An overwrite happens when the UPDATE has no condition on the seat's state (e.g. WHERE id = ?) after a stale snapshot read, not because the database skips re-evaluation.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html), [www.postgresql.org](https://www.postgresql.org/docs/current/transaction-iso.html)

### L-0218 | outdated | severity: low

- **Teacher/ledger statement:** For keys that expire but are never accessed: among keys with an expiration set, sample exactly 20, delete the expired ones, and repeat until fewer than 25% of a sample are expired-but-not-deleted.
- **Verbatim:** "you sample exactly 20 keys, see how many of them are expired, you delete those keys and re-iterate this process" (teacher)
- **Issue:** Sampling 20 keys and repeating while more than 25% are expired is Redis's older algorithm. Current Redis source (unstable branch, checked Oct 2026) walks the expires table incrementally with a cursor, 20 keys per loop. It repeats while expired keys exceed ACTIVE_EXPIRE_CYCLE_ACCEPTABLE_STALE (10% by default, tunable with active-expire-effort), within a CPU-time budget.
- **Suggested note:** Redis's active expiry checks keys with a TTL in small batches (20 per loop) and keeps going while more than about 10% of checked keys are expired, within a CPU time budget.
- **Sources:** [raw.githubusercontent.com](https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0103 | imprecise | low | The student's guess is closer than the item suggests: under memory pressure the OS can page memory out to swap on disk. Running out of heap does not cause a segfault by itself (see L-0104). malloc returns NULL, or on Linux with overcommit the OOM killer ends a process when pages are touched. |
| L-0115 | imprecise | low | malloc does not make a system call on every call. It hands out memory the process already holds and grows the heap with sbrk (or uses mmap for blocks above MMAP_THRESHOLD) only when needed. |
| L-0116 | imprecise | low | free() normally returns the chunk to the allocator's free lists for reuse by the same process; it is not immediately handed back to the OS for other processes. glibc returns memory to the system only when free space at the top of the heap passes M_TRIM_THRESHOLD, or for blocks allocated with mmap. |
| L-0139 | imprecise | low | Redis's header uses 4 type bits + 4 encoding bits + 24 LRU bits (LRU_BITS is 24) = 32 bits, not 4 + 28. The teacher first said 24 and then settled on 28. Current Redis also packs refcount (23 bits) and metadata bits in the header. |
| L-0147 | imprecise | low | On 64-bit systems pointers are 8 bytes, so a prev/next/value node costs 24 bytes per key (plus allocator overhead), not 12. That makes the teacher's point stronger. |
| L-0153 | imprecise | low | Some do and some don't. Memcached (doubly linked LRU per slab class) and InnoDB's buffer pool (LRU list with midpoint insertion) use lists. Redis samples instead. |
| L-0212 | imprecise | low | In a C cache like Redis there is no garbage collector: the cleanup cycle calls free (via zfree), which returns the memory to the allocator immediately. Redis's active expiry runs in its main event loop (serverCron and between event-loop iterations), not as a separate process. |
| L-0220 | imprecise | low | Redis has no priority queue for TTLs, but it does keep an extra index: db->expires, 'Timeout of keys with a timeout set', a second table of the keys that have a TTL, which the active cycle walks. Redis docs note that setting an expire 'costs memory'. |
| L-0236 | imprecise | low | Redis's LRU/LFU is not that deep. It samples a few keys (maxmemory-samples, default 5), evicts the one with the oldest access time (or lowest LFU counter), and since 3.0 keeps a pool of good candidates. The docs explain it in a few paragraphs. |
| L-0253 | imprecise | low | IPFS and BitTorrent's DHTs (Kademlia) use iterative lookups. A queried node returns peers closer to the key, and the requester contacts them itself; nodes do not forward. That is closer to the 'redirect' way than to forwarding. |
| L-0317 | imprecise | low | In standard terminology (Dynamo, Cassandra), owner + the next two nodes is a replication factor of 3: RF counts total copies, and the coordinator replicates to the N-1 clockwise successors. |
| L-0324 | imprecise | low | Sentinel does monitoring, failover and service discovery: clients ask Sentinels for the current master's address. It does not route reads. Open-source Redis has no built-in routing proxy. The teacher hedged. |
| L-0331 | imprecise | low | A bigger hash range does not fix imbalance. Imbalance comes from having few random points on the ring, whatever its size, which is why Dynamo added virtual nodes. Teacher also said 2^120 for the 2^128 given earlier. |
| L-0341 | imprecise | low | On Linux, touching more overcommitted memory than RAM + swap usually ends with the OOM killer terminating a process (SIGKILL), not a segmentation fault. A segfault would come from using a pointer whose allocation failed, for example an unchecked NULL. The teacher hedged this. |
| L-0358 | imprecise | low | Per-process limits (RLIMIT_AS/RLIMIT_DATA via ulimit) make malloc fail with ENOMEM rather than killing the process. Container/cgroup limits trigger the OOM killer instead. 'People generally don't use GNU malloc' is an overgeneralisation: glibc malloc is the default for most Linux programs, though Redis builds with jemalloc by default on Linux. |
| L-0360 | imprecise | low | SIGABRT can be caught, but if the handler returns, abort() resets the default action and still terminates the process. The signal that truly cannot be handled is SIGKILL. 'Instruction pipeline is done' is not what SIGABRT means: it is 'Abort signal from abort(3)'. |
| L-0366 | imprecise | low | REPEATABLE READ is InnoDB's default, but PostgreSQL defaults to READ COMMITTED, so it is not 'the most common' across databases. |
| L-0105 | simplified | low | A segfault is an invalid memory reference inside your own address space: an unmapped or protected address such as NULL, freed memory or out of bounds. It is not memory 'allocated by someone else'; the OS isolates processes from one another. |
| L-0109 | simplified | low | A system call is a trap into the kernel that costs the calling thread a mode switch (plus, here, reading and parsing /proc). It does not slow down the entire system. It is still too slow to run on every allocation, which is the real point. |
| L-0112 | simplified | low | On 64-bit Unix systems (LP64), pointers are 8 bytes, so a {void *value; int type} struct is 16 bytes with padding, not 4. The point stands that sizeof covers only the wrapper, not the data it points to. |
| L-0122 | simplified | low | Real zmalloc only does the accounting: it calls malloc, adds the size to used_memory and calls an OOM handler if malloc returns NULL. The maxmemory check and eviction are not inside the allocator. Redis runs performEvictions() 'before execution of commands'. The board version that evicts inside zmalloc is the teacher's simplified design. |
| L-0129 | simplified | low | As a design this works. Redis does the same thing per command, not per allocation: before executing a command it checks memory and evicts keys until usage is back under maxmemory. Docs note a large command can still temporarily overshoot. |
| L-0143 | simplified | low | In Redis the same 24-bit field is reused, but under LFU it is split: 16 bits of last-decrement time and an 8-bit logarithmic (Morris) counter that decays over time. It is not a plain ++ frequency count. |
| L-0150 | simplified | low | Memory-constrained caches do use linked lists, for example Memcached's per-slab-class doubly linked LRU. Whether the per-key pointer overhead is worth it depends on item size and the accuracy you need. |
| L-0154 | simplified | low | Redis offers noeviction plus allkeys-/volatile- variants of LRU, LFU and random, volatile-ttl, and (since Redis 8.6) LRM. LRU and LFU are approximations: sample maxmemory-samples keys (default 5) and keep a pool of good candidates. The idea is not exotic. |
| L-0155 | simplified | low | Zero overhead holds for a design that adds metadata only for LRU/LFU. In Redis the 24-bit lru field is part of every object header whatever the policy, so switching to allkeys-random saves CPU, not memory. |
| L-0157 | simplified | low | True for a cache that drops per-key recency data when it uses random eviction. Redis keeps the lru field in every object anyway, so there the gain is speed rather than capacity. |
| L-0190 | simplified | low | Worked against Flask's lenient dev server. Strictly, an HTTP/1.1 request MUST carry a Host header (a compliant server answers 400 without it), and the header section ends with an empty line (CRLF CRLF). |
| L-0199 | simplified | low | gRPC runs over HTTP/2, so a connection stays open and is multiplexed. Messages are length-prefixed and usually Protobuf, a compact binary format. Message compression is optional (only with a grpc-encoding header), and HTTP/2 compresses headers. 'Very compressed' really means compact binary encoding. |
| L-0205 | simplified | low | TCP's reliable, ordered delivery is the right choice. But TCP does not make the cache lose-proof: it only guarantees delivery while the connection is alive. Some caches do offer UDP; memcached documents a UDP interface. |
| L-0217 | simplified | low | Depends on access patterns. Redis docs say passive expiry 'is not enough as there are expired keys that will never be accessed again', which is why the active cycle exists. |
| L-0231 | simplified | low | CAS is atomic because the hardware performs the compare and the write as one indivisible read-modify-write visible to all cores (e.g. x86 LOCK CMPXCHG). Context switching is not the issue; a single instruction cannot be interrupted midway anyway. |
| L-0233 | simplified | low | Redis runs commands on one main thread, but it is 'mostly single threaded': background threads handle things like UNLINK lazy-free and fsync, and optional I/O threads (Redis 6+) do socket reads, writes and parsing. |
| L-0283 | simplified | low | Ring size depends on the hash: IPFS uses SHA-256 (0 to 2^256-1), Chord SHA-1 (2^160), and many libraries use 32- or 64-bit hashes. 2^128 is one example (e.g. MD5). |
| L-0293 | simplified | low | With one copy per key, only the new node's successor (the next node clockwise) hands over keys; the predecessor keeps its range. With replication more neighbours are touched. |
| L-0304 | simplified | low | Functionally yes: keys are partitioned across nodes. 'DHT' usually refers to decentralised peer-to-peer lookup systems (Kademlia, Chord). A proxied cache cluster is more often called a partitioned or sharded key-value store. |
| L-0319 | simplified | low | AOF logs every write and is replayed on restart, but it is not strictly write-ahead: Redis appends after executing commands. With the default 'appendfsync everysec' up to about one second of writes can be lost. AOF is off by default; RDB snapshots are the default persistence. |
| L-0334 | simplified | low | True that a new node streams from many nodes. Cassandra lists 'many smaller pieces of data from more ring neighbors' and more repair operations as costs, but the same spreading avoids overloading one neighbour. |
| L-0339 | simplified | low | Right that malloc reserves virtual memory and physical pages come on first touch. How far overcommit goes depends on vm.overcommit_memory: the default heuristic mode refuses 'obvious overcommits', so a single 40 GB request on a 4 GB machine usually fails, while mode 1 allows it and mode 2 forbids overcommit. |
| L-0353 | simplified | low | Copying from many ranges is more coordination, but Dynamo and Cassandra use vnodes in stateful stores. 'Better not to use' is a preference, not a rule (see L-0335). |
| L-0354 | simplified | low | Command execution uses one core, but Redis has background and optional I/O threads. The FAQ adds that CPU is rarely the bottleneck (Redis is usually memory or network bound) and suggests several instances per box. |
| L-0367 | simplified | low | Percona is a company. Its Percona Toolkit (command-line tools for MySQL) includes pt-deadlock-logger ('Log MySQL deadlocks'). MySQL itself exposes lock state in performance_schema.data_locks. |
| L-0373 | simplified | low | Servers do close idle connections: MySQL's wait_timeout defaults to 28800 s (8 h). Pools must validate or refresh connections rather than assume the server never closes them. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0004 | Teacher's background (Redis source deep dive, separate course); not a technical claim. |
| L-0131 | Personal opinion on how readable the Redis code base is. |
| L-0151 | The '52,000 linked lists at boot' figure comes from a friend and no public source gives it. The point it supports holds: the Linux kernel uses intrusive doubly linked lists (list_head) everywhere. |
| L-0158 | Teacher's production war story (switching to random eviction); private, cannot be checked. |
| L-0183 | Personal 2015 IoT anecdote; the networking point it leads to (HTTP is text over TCP) is checked at L-0187/L-0190. |
| L-0235 | Narrative about the Redis authors' design process; no public source states it this way. The single-threaded design itself is documented (see L-0233). |
| L-0300 | Teacher's own production experience. |
| L-0337 | Stated as personal engineering preference ('simple systems scale'); the factual parts about virtual nodes are checked at L-0332/L-0335/L-0336. |
| L-0340 | Teacher's own experiment. Why it crashed (OOM killer vs segfault) is discussed at L-0341. |
| L-0368 | Opinion about deadlock logs being hard to read and production surprises. |

## Notes on sources

- The Dynamo and Kademlia PDFs could not be text-extracted here. Dynamo is cited via Werner Vogels' HTML copy of the paper (allthingsdistributed.com/2007/10/amazons_dynamo.html), which I opened and quoted. Kademlia behaviour is cited via BitTorrent BEP 5 and the IPFS DHT docs.
- The glibc MallocInternals wiki was blocked by bot protection; free()/trim behaviour is cited from the man7 mallopt(3) page instead.
- Redis source files are cited from the `unstable` branch as fetched on 2026-10-13; the active-expiry constants (20 keys per loop, 10% acceptable stale) are from `src/expire.c` there.
