# Lecture 07 exam - coverage

Total questions: 120 for a 03:11:10 class (validator minimum 95). Each question's window comes from the first timestamp in its `source`. No windows skipped: the break (~01:50:43-01:54:56) sits inside window 11, which also has teaching.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; day-zero blogging app; analysts know only SQL; events through Kafka and their problems | 6 |
| 0:10-0:20 | CDC idea, tools, source/transform/sink, WAL/binlog vs iteration, resume, sinks, CDC vs events, multi-tier diagram, 80% story | 10 |
| 0:20-0:30 | Q&A on CDC: client vs WAL files, replica, 60 -> 2 machines, performance, eventual consistency, SSE, transaction order | 8 |
| 0:30-0:40 | Spark vs CDC; cache requirements and brainstorm list; hash table; MyValue type wrapper; type on key vs value | 6 |
| 0:40-0:50 | 4-bit type; heap exhaustion and segfault; cap memory; OS command cost; sizeof limit; malloc/free | 6 |
| 0:50-1:00 | Counting at allocation; zmalloc; one wrapper; 1 GB soft cap; eviction inside zmalloc; LRU/LFU definitions | 6 |
| 1:00-1:10 | 28 LRU bits; linked-list LRU and its 12 B overhead; Linux kernel lists; random eviction and production story | 7 |
| 1:10-1:20 | When LRU vs LFU: scans, stock analogy, Wikipedia, access-pattern graphs, Google News, choosing | 6 |
| 1:20-1:30 | TCP options in the cache box; HTTP 3/2 handshake cost; IoT netcat story; HTTP overhead; RESP | 6 |
| 1:30-1:40 | gRPC, picking a protocol, TCP vs UDP, cache-full recap, TTL storage, priority queue, lazy deletion, sampling, vertical scaling, concurrency list, pessimistic locking | 12 |
| 1:40-1:50 | Optimistic locking and CAS; single-threadedness; Q&A on memory-light LRU, single-thread blocking, zmalloc coverage | 6 |
| 1:50-2:00 | Break; why distribute; storage by key range; routing table; bank analogy way 1 (proxy) | 4 |
| 2:00-2:10 | Ways 2-4 (smart client, forwarding/IPFS, redirect/DNS/Redis); choosing; hash vs range routing; hash-mod 50% movement | 8 |
| 2:10-2:20 | What consistent hashing solves; ring positions; where it lives; ownership; adding and removing a node | 6 |
| 2:20-2:30 | Snapshot-based node add; DHTs and uses; Kademlia; high availability; AOF | 6 |
| 2:30-2:40 | Q&A: Redis redirect; nodes close or hot spots on the ring; virtual nodes; malloc NULL vs segfault | 4 |
| 2:40-2:50 | Q&A: CDC instances coordinating; CDC batching vs event workers; no-event changes; growing a set; LRU vs LFU | 5 |
| 2:50-3:00 | Q&A: keep data on cache 1 after adding cache 5; single-threaded core waste; SIGABRT and memory limits; shared-lock upgrade | 4 |
| 3:00-3:10 | Q&A: deadlock; connection pooling; CDC fan-out; next class | 4 |

## By kind

| Kind | Count |
|---|---|
| concept | 36 |
| diagram | 11 |
| example | 13 |
| heuristic | 8 |
| misconception | 8 |
| number | 8 |
| qa | 18 |
| recall | 9 |
| tradeoff | 9 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 18 |
| medium | 84 |
| hard | 18 |
