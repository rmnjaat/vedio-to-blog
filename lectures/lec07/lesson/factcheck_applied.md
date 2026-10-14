# Lecture 07: fact-check treatments applied

Policy (from the lesson brief, applied mechanically):
- **wrong / outdated / imprecise-medium:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its source.
- **imprecise-low** (and simplified-medium, of which this lecture has none): a light inline clarification, one clause or sentence, with a link where a fact is added.
- **simplified-low:** left as taught. Where a verified addition is attached, it is woven in as a separate sourced sentence, not as a correction. Where the class's design differs from real Redis (zmalloc evicting), the page labels it "our design": framing, not a fix.
- **unverifiable:** stated as the instructor's (or the class's) experience or opinion, with no empty source link. Unverifiable-low items also get a light hedge.
- Hedges stay hedges ("the instructor's guess", "he was not sure"); opinions stay attributed.

Verdict override applied (`verdict_overrides.jsonl`, from `verdict_review.md`): **L-0343** is imprecise/**low** (was medium), so it gets an inline clarification, not a SourceNote. Version drift from the verdict review is reflected: Redis active expiry is dated to Redis 6.0 (SN-07); the Redis object header wording follows the reworded A-DCL-01; PGSync is worded "as of Oct 2026" (SN-02); Kafka wording uses 4.3 (A-E-07).

Counts: 98 flagged items = 18 with a SourceNote (17 notes) + 18 inline clarifications + 41 left as taught + 21 attributed as unverifiable. Plus 11 accurate items that carry a verified addition. All 49 additions are used (46 keep, 3 optional).

## 1. SourceNotes

### SN-01 · §1.4 · L-0038 (imprecise/medium)
- **Teacher's point (kept):** How CDC reads depends on the bindings a database offers: MongoDB might choose not to expose its commit log, so CDC iterates collections; Elasticsearch does not offer one, so CDC iterates; MySQL has bin log support and...
- **More precisely:** How CDC reads depends on what the database exposes: MySQL's binlog, PostgreSQL's logical decoding and MongoDB's change streams (replica sets only) give a log; stores without one, like Elasticsearch, can only be re-scanned.
- **Additions used:** A-CDP-02
- **Sources:** https://debezium.io/documentation/reference/stable/connectors/mongodb.html · https://docs.airbyte.com/integrations/sources/elasticsearch · https://debezium.io/documentation/reference/stable/connectors/mysql.html

### SN-02 · §1.7 · L-0077 (outdated/low)
- **Teacher's point (kept):** PG sync, a tool a student had used to push Postgres data into Elasticsearch, is an example of a Postgres-based CDC - it only works with Postgres but does exactly what a CDC does.
- **More precisely:** PGSync is a CDC tool that syncs to Elasticsearch/OpenSearch via PostgreSQL logical replication. As of its GitHub README checked 2026-10-13, it also supports MySQL and MariaDB (via the binary log), so 'only works with Postgres' no longer holds.
- **Sources:** https://github.com/toluaina/pgsync

### SN-03 · §2.4 · L-0104 (wrong/medium)
- **Teacher's point (kept):** Allocating beyond your allocated heap causes a segmentation fault: you are entering someone else's territory and your program crashes.
- **More precisely:** When memory runs out, malloc returns NULL (or, with Linux overcommit, the OOM killer kills the process later); a segfault only happens if the program then uses an invalid pointer such as that unchecked NULL.
- **Additions used:** A-DCL-25
- **Sources:** https://man7.org/linux/man-pages/man3/malloc.3.html · https://man7.org/linux/man-pages/man7/signal.7.html

### SN-04 · §2.4 · L-0359 (imprecise/medium)
- **Teacher's point (kept):** When you exceed those limits you generally get a SIGABRT and the program does crash: the kernel kills the process to save itself.
- **More precisely:** Exceeding a ulimit makes allocation fail (NULL/ENOMEM); exhausting system or cgroup memory gets the process killed by the OOM killer with SIGKILL; SIGABRT comes from the program calling abort().
- **Sources:** https://man7.org/linux/man-pages/man3/malloc.3.html · https://man7.org/linux/man-pages/man7/signal.7.html · https://man7.org/linux/man-pages/man3/abort.3.html

### SN-05 · §3.2 · L-0149 (imprecise/medium)
- **Teacher's point (kept):** This overhead is a huge waste of memory, and it marks the difference between the theoretical implementation usually taught ('just use a linked list') and what real caches do.
- **More precisely:** Linked-list LRU costs pointers per key; Redis avoids it by sampling, while caches such as Memcached accept the overhead and keep doubly linked LRU lists.
- **Additions used:** A-DCL-20
- **Sources:** https://raw.githubusercontent.com/memcached/memcached/master/doc/new_lru.txt · https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html · https://redis.io/docs/latest/develop/reference/eviction/

### SN-06 · §3.3 · L-0237 (imprecise/medium)
- **Teacher's point (kept):** Asked how to design LRU/LFU at a high level under memory constraints, the teacher answers 'You cannot do that' - it is a very deep implementation - so go with random eviction, which is very low on memory, needs no...
- **More precisely:** Under memory constraints use approximated LRU/LFU: keep a few bits of access time or frequency per key and, on eviction, sample a handful of keys and evict the worst - as Redis does.
- **Additions used:** A-DCL-02
- **Sources:** https://redis.io/docs/latest/develop/reference/eviction/

### SN-07 · §3.5 · L-0218 (outdated/low)
- **Teacher's point (kept):** For keys that expire but are never accessed: among keys with an expiration set, sample exactly 20, delete the expired ones, and repeat until fewer than 25% of a sample are expired-but-not-deleted.
- **More precisely:** Redis's active expiry checks keys with a TTL in small batches (20 per loop) and keeps going while more than about 10% of checked keys are expired, within a CPU time budget.
- **Additions used:** A-DCL-06
- **Sources:** https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c

### SN-08 · §4.1 · L-0182 (wrong/medium)
- **Teacher's point (kept):** With stateless HTTP/1.1 each request establishes a TCP connection (three-way handshake), sends the data, gets the response and terminates the connection (two-way teardown), so every time an API server talks to the cache...
- **More precisely:** HTTP/1.1 reuses TCP connections by default (keep-alive); its overhead for a cache is the text request line and headers on every call and one outstanding request per connection, not a new handshake per request.
- **Additions used:** A-DCL-08
- **Sources:** https://www.rfc-editor.org/rfc/rfc9112 · https://www.rfc-editor.org/rfc/rfc9293

### SN-09 · §4.3 · L-0206 (imprecise/medium)
- **Teacher's point (kept):** Over TCP there are typically three options: completely stateless HTTP/1.1 (connect, query, response, disconnect each time), gRPC (stateful, HTTP/2, connection kept open, highly compressed, Protobuf), or your own custom...
- **More precisely:** Over TCP the usual choices are HTTP/1.1 (text, keep-alive connections), gRPC (HTTP/2, binary Protobuf, multiplexed) or a custom binary/text protocol like Redis's RESP.
- **Sources:** https://www.rfc-editor.org/rfc/rfc9112 · https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md

### SN-10 · §4.6 · L-0364 (wrong/medium)
- **Teacher's point (kept):** Teacher's guess at the bug, reduced to two transactions on one row: both take a shared lock; T2 writes first, so its lock is elevated to exclusive; T1 still holds its shared lock, waits until the exclusive lock is...
- **More precisely:** With shared locks two transactions that both try to update the same row deadlock and InnoDB rolls one back; double-booking usually means the availability check used a non-locking read and the update did not re-check the condition.
- **Additions used:** A-DCL-22
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html

### SN-11 · §4.6 · L-0365 (imprecise/medium)
- **Teacher's point (kept):** The overwrite happens because the waiting transaction does not re-evaluate its statement after the lock is released.
- **More precisely:** UPDATE/DELETE in InnoDB act on the latest committed row versions even under REPEATABLE READ ('The snapshot ... applies to SELECT statements ... not necessarily to DML'). PostgreSQL READ COMMITTED re-evaluates the WHERE clause after waiting. An overwrite happens when the UPDATE has no condition on the seat's state (e.g. WHERE id = ?) after a stale snapshot read, not because the database skips re-evaluation.
- **Additions used:** A-DCL-23
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html · https://www.postgresql.org/docs/current/transaction-iso.html

### SN-12 · §5.4 · L-0261 (imprecise/medium)
- **Teacher's point (kept):** Redis uses the redirect approach: when you fire a write on a replica, it returns the master's IP address and asks you to write on the master, because replicas don't take writes.
- **More precisely:** Redis Cluster nodes answer with a MOVED redirect naming the right node; a standalone Redis replica just refuses writes, and clients learn the master's address from Sentinel.
- **Additions used:** A-DCL-13
- **Sources:** https://redis.io/docs/latest/operate/oss_and_stack/management/replication/ · https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/ · https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/

### SN-13 · §5.4 · L-0326 (imprecise/medium)
- **Teacher's point (kept):** Returning the master node's IP address when a write hits a read replica is the most common approach; almost all databases adopt it.
- **More precisely:** Overgeneralised. Many databases reject a write on a replica with an error rather than returning the primary's address: a PostgreSQL hot standby errors on INSERT/UPDATE/DELETE, and a standalone Redis replica rejects writes. Drivers, Sentinel or connection strings find the primary. Address-returning redirects (Redis Cluster's MOVED) are one approach, not 'almost all'.
- **Sources:** https://www.postgresql.org/docs/current/hot-standby.html · https://redis.io/docs/latest/operate/oss_and_stack/management/replication/ · https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/

### SN-14 · §6.5 · L-0332 (imprecise/medium), L-0336 (imprecise/medium)
- **Teacher's point (kept):** Virtual nodes (dividing the ring into many small virtual parts mapped to physical nodes) work against consistent hashing's goal: if one server goes down, many non-consecutive chunks have to move instead of a single...
- **Teacher's point (kept):** Virtual nodes bring back a lot of network transfer, copying from many places instead of one, which is exactly what consistent hashing was adopted to reduce.
- **More precisely:** With virtual nodes the total data moved is still about 1/N; it just comes from (or goes to) many nodes instead of one neighbour. Dynamo treats that as a benefit: a failed node's load 'is evenly dispersed across the remaining available nodes', and a new node 'accepts a roughly equivalent amount of load from each of the other available nodes'. The real costs are operational: more streams to coordinate, and Cassandra notes higher outage probability with many tokens.
- **More precisely:** Virtual nodes do not increase the total data transferred when a node joins or leaves (still about 1/N of the data). They change where it comes from: many nodes in parallel instead of one neighbour.
- **Sources:** https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html · https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html

### SN-15 · §6.5 · L-0335 (imprecise/medium)
- **Teacher's point (kept):** Adding virtual nodes is not a good idea to solve the hot partition problem in a stateful use case; companies still do it and there are hacks around it.
- **More precisely:** Virtual nodes are a trade-off for stateful systems: better balance and parallel rebuilds (Dynamo, Cassandra) versus more complex data movement and more nodes involved in each range.
- **Additions used:** A-DCL-15
- **Sources:** https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html · https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html

### SN-16 · §6.6 · L-0305 (imprecise/medium)
- **Teacher's point (kept):** The entire internet, the BitTorrent network and the Bitcoin network are distributed hash tables.
- **More precisely:** BitTorrent's trackerless mode uses a Kademlia DHT; the Internet's routing and Bitcoin's peer discovery are not DHTs.
- **Sources:** https://www.bittorrent.org/beps/bep_0005.html · https://developer.bitcoin.org/devguide/p2p_network.html

### SN-17 · §6.6 · L-0311 (imprecise/medium)
- **Teacher's point (kept):** DHTs are everywhere: distributed file systems (the teacher calls our distributed cache an example of one), DNS servers, instant messaging / IRC clients, P2P networks like BitTorrent, and IPFS.
- **More precisely:** DHTs can be used to build such services (Wikipedia lists DNS, instant messaging and file sharing as possible uses), but deployed DNS is a hierarchical delegated system, not a DHT, and IRC is client-server. True DHT examples: BitTorrent Mainline DHT, IPFS, Kad.
- **Sources:** https://en.wikipedia.org/wiki/Distributed_hash_table · https://www.bittorrent.org/beps/bep_0005.html

## 2. Inline clarifications (imprecise-low)

| Id | § | Teacher's point (kept) | Clarification woven in | Additions |
|---|---|---|---|---|
| L-0103 | 2.4 | A student guessed that on heap exhaustion the system moves data from memory to disk to make space. | The student's guess is closer than the item suggests: under memory pressure the OS can page memory out to swap on disk. Running out of heap does not cause a segfault by itself (see L-0104). malloc returns NULL, or on Linux with overcommit the OOM killer ends a process when pages are touched. | – |
| L-0115 | 2.5 | malloc allocates memory on the heap: you pass the size you want, malloc internally fires a system call, grabs memory in... | malloc returns memory from the process's heap, asking the OS for more (sbrk/mmap) only when its free memory runs out. | – |
| L-0116 | 2.5 | free deallocates: it marks the location as free for the operating system, which can then allocate that same chunk to... | free marks the block reusable by the process's allocator; memory goes back to the OS only in some cases (heap trimming, large mmap'd blocks). | – |
| L-0139 | 3.1 | Redis stores 4 type bits plus 28 LRU bits per object; together they make 32 bits, i.e. one integer, keeping the per-key... | Redis packs type (4 bits), encoding (4 bits) and a 24-bit LRU/LFU field into one 32-bit word of each object header. | A-DCL-01 |
| L-0147 | 3.2 | The linked-list LRU needs one node per key-value pair with a next pointer, a previous pointer and a value pointer: 4 +... | On a 64-bit machine each list node adds three 8-byte pointers, about 24 bytes per key before allocator overhead. | – |
| L-0153 | 3.2 | In real-world implementations of eviction, a lot of databases choose not to use a linked list or anything similar. | Some do and some don't. Memcached (doubly linked LRU per slab class) and InnoDB's buffer pool (LRU list with midpoint insertion) use lists. Redis samples instead. | – |
| L-0212 | 3.5 | Every cache server runs a cleanup process that frees expired keys (free(obj)); the garbage collector then picks them up. | In a C cache like Redis there is no garbage collector: the cleanup cycle calls free (via zfree), which returns the memory to the allocator immediately. Redis's active expiry runs in its main event loop (serverCron and between event-loop iterations), not as a separate process. | – |
| L-0220 | 3.5 | Redis chose lazy deletion plus sampling because neither requires an additional data structure - Redis has no... | Redis has no priority queue for TTLs, but it does keep an extra index: db->expires, 'Timeout of keys with a timeout set', a second table of the keys that have a TTL, which the active cycle walks. Redis docs note that setting an expire 'costs memory'. | A-DCL-07 |
| L-0236 | 3.3 | Asked about the low-level LRU/LFU implementation, the teacher says Redis's 28 LRU bits algorithm is too deep to cover... | Redis's LRU/LFU is not that deep. It samples a few keys (maxmemory-samples, default 5), evicts the one with the oldest access time (or lowest LFU counter), and since 3.0 keeps a pool of good candidates. The docs explain it in a few paragraphs. | – |
| L-0253 | 5.3 | IPFS (InterPlanetary File System) works this way, and BitTorrent works on the same kind of overlay network. | IPFS and BitTorrent's DHTs (Kademlia) use iterative lookups. A queried node returns peers closer to the key, and the requester contacts them itself; nodes do not forward. That is closer to the 'redirect' way than to forwarding. | – |
| L-0317 | 6.7 | The ring lets you set a replication factor: with replication factor 2 (as stated) the node that owns a key stores it... | In standard terminology (Dynamo, Cassandra), owner + the next two nodes is a replication factor of 3: RF counts total copies, and the coordinator replicates to the N-1 clockwise successors. | A-DCL-17 |
| L-0324 | 5.4 | For reads both ways exist in Redis: Redis Sentinel addresses it and Redis now also has a proxy that holds routing... | Sentinel does monitoring, failover and service discovery: clients ask Sentinels for the current master's address. It does not route reads. Open-source Redis has no built-in routing proxy. The teacher hedged. | – |
| L-0331 | 6.5 | Companies still use consistent hashing despite these problems because it makes scaling up and down simple enough, and... | A bigger hash range does not fix imbalance. Imbalance comes from having few random points on the ring, whatever its size, which is why Dynamo added virtual nodes. Teacher also said 2^120 for the 2^128 given earlier. | – |
| L-0341 | 2.4 | malloc does return NULL, but when you not only allocate but also use the allocated pages beyond the limit, the program... | On Linux, touching more overcommitted memory than RAM + swap usually ends with the OOM killer terminating a process (SIGKILL), not a segmentation fault. A segfault would come from using a pointer whose allocation failed, for example an unchecked NULL. The teacher hedged this. | – |
| L-0343 | 1.4 | Multiple CDC instances reading the same source can be run either active-standby or all active; both work. | One log stream has one active reader (with a standby for failover); to run several active CDC instances, give each a separate slice of tables with its own slot/offset. | A-CDP-12 |
| L-0358 | 2.4 | Memory use beyond limits is controlled in practice by kernel-level ulimits per process and by limits configurable in... | Per-process limits (RLIMIT_AS/RLIMIT_DATA via ulimit) make malloc fail with ENOMEM rather than killing the process. Container/cgroup limits trigger the OOM killer instead. 'People generally don't use GNU malloc' is an overgeneralisation: glibc malloc is the default for most Linux programs, though Redis builds with jemalloc by default on Linux. | – |
| L-0360 | 2.4 | SIGABRT is mostly not something you can handle (there are some ways): it signals that the instruction pipeline is done;... | SIGABRT can be caught, but if the handler returns, abort() resets the default action and still terminates the process. The signal that truly cannot be handled is SIGKILL. 'Instruction pipeline is done' is not what SIGABRT means: it is 'Abort signal from abort(3)'. | – |
| L-0366 | 4.6 | Repeatable read is almost the most common isolation level out there; the teacher assumes it for his explanation,... | REPEATABLE READ is InnoDB's default, but PostgreSQL defaults to READ COMMITTED, so it is not 'the most common' across databases. | – |

## 3. Left as taught (simplified-low)

The checker's note is kept here for the writer's reference only; the page does not correct these. Attached additions are woven in as separate sourced sentences.

| Id | § | Checker's note (not shown as a correction) | Addition woven in |
|---|---|---|---|
| L-0018 | 1.1 | Read-only access still exposes personal data to people who do not need it and lets heavy analytical queries slow down the production database. | A-E-02 |
| L-0021 | 1.1 | Every major data warehouse speaks SQL, and data lake table formats such as Iceberg are queried with SQL through engines like Spark, Trino or Athena. | A-E-03, A-E-04 |
| L-0022 | 1.1 | Fair as an aside: MongoDB's native query language is MQL, not SQL. But MongoDB does offer a read-only SQL-92-compatible SQL Interface (MongoSQL over JDBC/ODBC) for BI tools (as of Oct 2026; the... | A-E-05 |
| L-0028 | 1.2 | Publishing events from the API is common, but writing to the database and to Kafka separately is not atomic, so events can be missed; reading changes from the database (CDC or an outbox) avoids this. | A-E-08 |
| L-0030 | 1.3 | Both are open source. Debezium is a dedicated log-based CDC platform. Airbyte is a general data-movement (ELT) platform with a CDC mode for some database sources: Postgres, MySQL, SQL Server,... | A-CDP-15 |
| L-0036 | 1.4 | Reading tables row by row (query-based or polling CDC) works only incrementally if each table has a column like LAST_UPDATE_TIMESTAMP. It also misses hard deletes and intermediate updates between... | A-CDP-01 |
| L-0037 | 1.4 | CDC reads the database's change log: PostgreSQL's WAL via logical decoding, or MySQL's binary log (a replication log separate from InnoDB's redo log). | A-CDP-14 |
| L-0040 | 1.4 | CDC resumes from its offset only if the log is still there. Debezium says that after a restart the connector 'continues reading the WAL where it last left off', and a PostgreSQL replication slot... | A-CDP-03, A-CDP-04 |
| L-0057 | 1.4 | Streaming from the log is much lighter than polling queries. Two caveats: the initial snapshot that most tools run first (Debezium, Airbyte) does full table reads, and a PostgreSQL slot whose... | – |
| L-0058 | 1.4 | You can usually point CDC at a replica to offload the primary: on MySQL the replica needs log_replica_updates (default on), and on PostgreSQL this needs version 16+. | A-CDP-07, A-CDP-08 |
| L-0070 | 1.7 | The contrast holds, but SSE is not 'front-end JavaScript'. It is an HTTP server-push standard: the server sends a text/event-stream response, and EventSource is the browser API that reads it. Both... | – |
| L-0072 | 1.4 | The logs do hold committed transactions in commit order. MySQL writes the whole transaction to the binlog at COMMIT, and PostgreSQL decodes only committed transactions, between begin and commit... | A-CDP-10 |
| L-0073 | 1.4 | Correct at the source: PostgreSQL decodes concurrent transactions 'in commit order', and the MySQL binlog is 'logged in commit order'. Downstream ordering is only as strong as the pipeline.... | – |
| L-0105 | 2.4 | A segfault is an invalid memory reference inside your own address space: an unmapped or protected address such as NULL, freed memory or out of bounds. It is not memory 'allocated by someone else';... | – |
| L-0109 | 2.5 | A system call is a trap into the kernel that costs the calling thread a mode switch (plus, here, reading and parsing /proc). It does not slow down the entire system. It is still too slow to run on... | – |
| L-0112 | 2.5 | On 64-bit Unix systems (LP64), pointers are 8 bytes, so a {void *value; int type} struct is 16 bytes with padding, not 4. The point stands that sizeof covers only the wrapper, not the data it points... | – |
| L-0122 | 2.6 | Real zmalloc only does the accounting: it calls malloc, adds the size to used_memory and calls an OOM handler if malloc returns NULL. The maxmemory check and eviction are not inside the allocator.... Page labels the evict-in-zmalloc code "our design" (framing). | – |
| L-0129 | 2.6 | As a design this works. Redis does the same thing per command, not per allocation: before executing a command it checks memory and evicts keys until usage is back under maxmemory. Docs note a large... Page labels the evict-in-zmalloc code "our design" (framing). | – |
| L-0143 | 3.1 | In Redis the same 24-bit field is reused, but under LFU it is split: 16 bits of last-decrement time and an 8-bit logarithmic (Morris) counter that decays over time. It is not a plain ++ frequency... | A-DCL-03 |
| L-0150 | 3.2 | Memory-constrained caches do use linked lists, for example Memcached's per-slab-class doubly linked LRU. Whether the per-key pointer overhead is worth it depends on item size and the accuracy you... | – |
| L-0154 | 3.3 | Redis offers noeviction plus allkeys-/volatile- variants of LRU, LFU and random, volatile-ttl, and (since Redis 8.6) LRM. LRU and LFU are approximations: sample maxmemory-samples keys (default 5) and... | A-DCL-05 |
| L-0155 | 3.3 | Zero overhead holds for a design that adds metadata only for LRU/LFU. In Redis the 24-bit lru field is part of every object header whatever the policy, so switching to allkeys-random saves CPU, not... | – |
| L-0157 | 3.3 | True for a cache that drops per-key recency data when it uses random eviction. Redis keeps the lru field in every object anyway, so there the gain is speed rather than capacity. | – |
| L-0190 | 4.2 | Worked against Flask's lenient dev server. Strictly, an HTTP/1.1 request MUST carry a Host header (a compliant server answers 400 without it), and the header section ends with an empty line (CRLF... | A-DCL-09 |
| L-0199 | 4.3 | gRPC runs over HTTP/2, so a connection stays open and is multiplexed. Messages are length-prefixed and usually Protobuf, a compact binary format. Message compression is optional (only with a... | A-DCL-11 |
| L-0205 | 4.1 | TCP's reliable, ordered delivery is the right choice. But TCP does not make the cache lose-proof: it only guarantees delivery while the connection is alive. Some caches do offer UDP; memcached... | – |
| L-0217 | 3.5 | Depends on access patterns. Redis docs say passive expiry 'is not enough as there are expired keys that will never be accessed again', which is why the active cycle exists. | – |
| L-0231 | 4.5 | CAS is atomic because the hardware performs the compare and the write as one indivisible read-modify-write visible to all cores (e.g. x86 LOCK CMPXCHG). Context switching is not the issue; a single... | – |
| L-0233 | 4.5 | Redis runs commands on one main thread, but it is 'mostly single threaded': background threads handle things like UNLINK lazy-free and fsync, and optional I/O threads (Redis 6+) do socket reads,... | A-DCL-12 |
| L-0283 | 6.2 | Ring size depends on the hash: IPFS uses SHA-256 (0 to 2^256-1), Chord SHA-1 (2^160), and many libraries use 32- or 64-bit hashes. 2^128 is one example (e.g. MD5). | – |
| L-0293 | 6.3 | With one copy per key, only the new node's successor (the next node clockwise) hands over keys; the predecessor keeps its range. With replication more neighbours are touched. | – |
| L-0304 | 6.6 | Functionally yes: keys are partitioned across nodes. 'DHT' usually refers to decentralised peer-to-peer lookup systems (Kademlia, Chord). A proxied cache cluster is more often called a partitioned or... | – |
| L-0319 | 6.7 | AOF logs every write and is replayed on restart, but it is not strictly write-ahead: Redis appends after executing commands. With the default 'appendfsync everysec' up to about one second of writes... | A-DCL-18 |
| L-0334 | 6.5 | True that a new node streams from many nodes. Cassandra lists 'many smaller pieces of data from more ring neighbors' and more repair operations as costs, but the same spreading avoids overloading one... | A-DCL-16 |
| L-0339 | 2.4 | Right that malloc reserves virtual memory and physical pages come on first touch. How far overcommit goes depends on vm.overcommit_memory: the default heuristic mode refuses 'obvious overcommits', so... | – |
| L-0344 | 1.4 | The idea is right: each tool persists its position. The mechanisms differ: Debezium stores offsets in the Kafka Connect offsets topic, and Kafka Connect, not app-level remote locks, decides which... | – |
| L-0353 | 6.5 | Copying from many ranges is more coordination, but Dynamo and Cassandra use vnodes in stateful stores. 'Better not to use' is a preference, not a rule (see L-0335). | – |
| L-0354 | 4.5 | Command execution uses one core, but Redis has background and optional I/O threads. The FAQ adds that CPU is rarely the bottleneck (Redis is usually memory or network bound) and suggests several... | – |
| L-0367 | 4.6 | Percona is a company. Its Percona Toolkit (command-line tools for MySQL) includes pt-deadlock-logger ('Log MySQL deadlocks'). MySQL itself exposes lock state in performance_schema.data_locks. | – |
| L-0373 | 4.3 | Servers do close idle connections: MySQL's wait_timeout defaults to 28800 s (8 h). Pools must validate or refresh connections rather than assume the server never closes them. | A-DCL-24 |
| L-0374 | 1.5 | Depends on the tool. Debezium writes once to Kafka, and any number of sink connectors read those topics. Debezium Server has a single sink type per instance. An Airbyte connection links one source to... | A-CDP-16 |

## 4. Unverifiable: attributed

| Id | § | Severity | How the page states it |
|---|---|---|---|
| L-0004 | 2.1 | none | Attributed (the instructor's story / view) |
| L-0013 | 1.1 | none | Attributed (the instructor's story / view) |
| L-0016 | 1.1 | low | Attributed (the instructor's story / view); light hedge; the real limit is query cost and headroom, not user count |
| L-0053 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0059 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0060 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0061 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0062 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0063 | 1.6 | low | Attributed (the instructor's story / view); light hedge; consulting story marked 'as he tells it' |
| L-0064 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0071 | 1.6 | none | Attributed (the instructor's story / view); consulting story marked 'as he tells it' |
| L-0075 | 1.7 | none | Attributed (the instructor's story / view) |
| L-0131 | 2.6 | none | Attributed (the instructor's story / view) |
| L-0151 | 3.2 | low | Attributed (the instructor's story / view); light hedge; 'per a kernel-contributor friend' |
| L-0158 | 3.3 | none | Attributed (the instructor's story / view) |
| L-0183 | 4.2 | none | Attributed (the instructor's story / view) |
| L-0235 | 4.5 | none | Attributed (the instructor's story / view) |
| L-0300 | 6.2 | none | Attributed (the instructor's story / view) |
| L-0337 | 6.5 | none | Attributed (the instructor's story / view) |
| L-0340 | 2.4 | none | Attributed (the instructor's story / view) |
| L-0368 | 4.6 | none | Attributed (the instructor's story / view) |

## 5. Accurate items with a verified addition

| Id | § | Addition(s) | Where |
|---|---|---|---|
| L-0015 | 1.1 | A-E-01 | Prose |
| L-0027 | 1.2 | A-E-06, A-E-07 | Prose |
| L-0035 | 1.4 | A-CDP-05 | Prose |
| L-0046 | 1.5 | A-CDP-06 | Prose |
| L-0051 | 1.5 | A-CDP-13 | Prose |
| L-0065 | 1.4 | A-CDP-09 | Prose |
| L-0127 | 2.6 | A-DCL-04 | Prose |
| L-0165 | 3.4 | A-DCL-21 | Prose |
| L-0195 | 4.3 | A-DCL-10 | Prose |
| L-0270 | 6.1 | A-DCL-14 | Prose |
| L-0314 | 6.6 | A-DCL-19 | Prose |

## 6. Lecture-level framing fixes (no verdict attached)

- **Tiered storage** was announced (L-0003, L-0007) but taught only as the multi-tier CDC diagram. The page says so in About and in 1.5 and does not imply coverage.
- **Hash-mod arithmetic** (L-0274): the board's 3 of 6 (50%) is checked against page-made hash values (Fig 6·a) and the page adds that on average about N/(N+1) of keys move.
- **Board slip** in D-16 (`cache 2: [j–p]`) is redrawn as `[k–p]`.
- **Course numbering**: back-references use course order (`lectures/course.json`): week 2's KV store and airline check-in are Lecture 3; Kafka essentials Lecture 2; DNS and the load balancer Lecture 5; tomorrow's storage engines Lecture 10. Topics deferred to weeks 6+ are chipped as "a later week".
