# Lecture 9 (lec07) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec07.mdx`, `lec07/{s0-header,c1…c9}.mdx`, and the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec07/`: DayZero, EventLeaks, CdcReads, TwoWays, Tiers, SixtyToTwo, SoFarCopy, SoFarCache,
HashTable, StructStage1, SizeofVsData, ZmallocCap, StructStage2, TextbookLru, ExpiryQueue, BytesOnWire, CasRace, OneThreadCores,
KeyRanges, RoutingQuestion, OwnershipRing, RemoveCache1, AddSafely, VirtualNodes and SurviveNode. Also the alt text, captions and on-screen
cues of the four clips: `l07-events-vs-cdc`, `l07-lru-vs-lfu`, `l07-four-routes` and `l07-mod-vs-ring`.

Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `factcheck/additions_verified.jsonl`, `lesson/factcheck_applied.md`,
`transcript/transcript.md`, `story/NOTES.md`, and the pages of Lectures 1, 2, 3, 5, 8 and 10 that this lecture calls back to or hands
off to. No page file was edited.

Code, protocol bytes and arithmetic were run, not only read. Scratch files are in the session scratchpad.
- **Bytes on the wire:** the HTTP request in Fig 6·b is 117 bytes, and the RESP `SET a 1` is 27 bytes. Both were counted in Python. The RESP bytes were also sent raw with `nc` to a scratch `redis-server` 8.10, which answered `+OK`, and `GET a` returned `1`.
- **Redis defaults on that server:** `maxmemory 0`, `maxmemory-samples 5`, `appendonly no`, `appendfsync everysec`, `maxmemory-policy noeviction`.
- **Replica writes:** a write to a scratch replica returned `READONLY You can't write against a read only replica.`
- **The C samples:** compiled with `cc -Wall`. `sizeof(struct MyValue)` is 16, and a three-pointer list node is 24. The c4 `zfree` does not compile (F-04). A signed `int type : 4` stores 12 as −4 (F-16).
- **The Python ring code:** run for every h from 0 to 15. It matches the ring in Fig 8·b: `owner(0)` and `owner(13)` both return cache 1.
- **Resharding with % N:** six keys with hashes 6, 8, 7, 1, 3 and 2 move 3 of 6 when going from % 2 to % 3, which matches the pause. Brute force over N(N+1)·1000 hashes moves N/(N+1) of the keys for N = 2, 3, 4 and 9: exactly 2/3, 3/4, 4/5 and 9/10.
- **Raw HTTP:** a raw `GET /hello HTTP/1.1` with a Host line and bare-LF line endings got `200` from a lenient Python server. "This is a sample" got `400`.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / fact-check not applied / invalid code) | 0 | 2 | 9 | 11 |
| Inventions | 0 | 0 | 1 | 1 |
| Distortions | 0 | 0 | 3 | 3 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions (incl. figure vs text, and across lectures) | 0 | 0 | 3 | 3 |
| **Total** | **0** | **2** | **16** | **18** |

High and medium:
- **F-01 (medium, error)**: §2.2 says the checkpoint "buys you order for free" and that CDC "writes them in that order". The fact-check (L-0072, L-0073) says CDC emits one event per row, the sink does not apply a transaction as a unit, and Debezium keeps order per topic, not across tables. None of that reached the page.
- **F-02 (medium, error / figure vs text)**: Fig 1·d (CdcReads) labels MongoDB's log "binlog" on phone and "oplog / binlog" on desk, and its desc says the same. MongoDB has no binlog. §2.1 itself says MongoDB exposes change streams.

The replication-factor change (RF 2 in class → 3 on the page) **is justified**. See "The writer's decisions" below.

---

## Issues

### F-01 · ERROR (fact-check not applied) · medium · "order for free"
- **Where:** c2 §2.2, the paragraph after the pause.
- **Current text:** "The checkpoint is what makes CDC lossless, and it is sequential, which buys you order for free. A transaction may run ten statements, but they reach the log together when it commits, and transactions land in the log in the order they commit. CDC reads them in that order and writes them in that order. [[L-0065 L-0072 L-0073]]"
- **Problem:** the source side is right. The log holds whole committed transactions, in commit order. The delivery side is wrong.
  - L-0072 (simplified/low, inline): CDC tools emit one event per changed row, so the sink does not apply a transaction atomically by default. Debezium adds transaction boundaries only when `provide.transaction.metadata` is set, and it defaults to false.
  - L-0073 (simplified/low, inline): "Downstream ordering is only as strong as the pipeline". Debezium orders per topic, that is per table, not across tables.
  - The page drops both caveats and strengthens the teacher's claim into "order for free". An engineer who designs on that sentence gets a sink that briefly shows half a transaction, or a child row before its parent.
- **Sources:** L-0065, L-0072, L-0073; fact-check additions on L-0072 (Debezium transaction metadata) and L-0037 (binlog in commit order). Transcript 00:24:15–00:25:21, 00:28:44–00:29:34.
- **Replacement:** "The checkpoint is what makes CDC lossless, and it reads the log in order. A transaction may run ten statements, but they reach the log together when it commits, and transactions land in the log in the order they commit, so CDC reads them in that order. What arrives at the sink is a little weaker: one event per changed row, not one per transaction. Debezium, for example, keeps order per table, not across tables, unless you ask it for transaction markers. [[L-0065 L-0072 L-0073]]"

### F-02 · ERROR / FIGURE vs TEXT · medium · MongoDB drawn with a binlog
- **Where:** Fig 1·d `CdcReads` (`s1a-etl-and-cdc-figs.tsx`): phone label `binlog` (line 294), desk label `oplog / binlog` (line 323), and `DESC_1C` "Under MongoDB sits its log (oplog or binlog)".
- **Problem:** the production database in this story is MongoDB. MongoDB has an oplog, and CDC tools read it through change streams. A binlog is MySQL's. On a phone, readers see "binlog" under a MongoDB cylinder.
  - §2.1 then says correctly that "MongoDB has change streams, which need a replica set", so the figure contradicts the text.
  - The fact-check corrected exactly this point. L-0038 is imprecise/medium, the lecture's only medium CDC item.
- **Sources:** L-0037, L-0038 and its addition (Debezium's MongoDB connector uses change streams). Transcript 00:12:06–00:14:00.
- **Replacement:** label `oplog` on both layouts. The desc becomes "Under MongoDB sits its log, the oplog, which CDC tools read through change streams." If a generic label is wanted instead, use `log`.

### F-03 · ERROR (fact-check not applied) · low · the binlog is not MySQL's write-ahead log
- **Where:** c2 §2.1.
- **Current text:** "Every commit a database makes is appended to its write-ahead log, called the binlog in MySQL."
- **Problem:** L-0037 (simplified/low, inline) says MySQL's binary log is "a replication log separate from InnoDB's redo log". InnoDB's write-ahead log is the redo log. PostgreSQL is the database whose WAL CDC reads.
- **Sources:** L-0037 and its addition. Transcript 00:12:06–00:12:55.
- **Replacement:** "The second is the log. Every commit a database makes is also recorded in a log of changes: PostgreSQL’s write-ahead log, or MySQL’s binary log, the binlog, a replication log kept apart from InnoDB’s own redo log. The CDC tool reads that log and pushes the changes onwards. [[L-0037]]"

### F-04 · ERROR (code) · low · the zmalloc sketches: `zfree` doesn't compile, and one eviction may not make room
- **Where:** c4 §4.3, both C blocks, and the ZmallocCap code panel.
- **Problems:**
  1. **`size_of(o)` is not a function.** In C, nothing knows a block's size from its pointer. The block fails with "call to undeclared function 'size_of'".
     - Redis gets the size from the allocator (`zmalloc_size`). Where the allocator can't tell, Redis keeps a size prefix in front of the block.
     - Our `zmalloc` adds the requested `b`, so subtracting anything else would make the count drift.
  2. **`total_size += b` runs even when `malloc` returned NULL.**
  3. **The capped version evicts one key, then allocates anyway.** One eviction may free fewer than `b` bytes, so the cap can be passed. The text says Redis evicts "until usage is back under the cap".
- **Sources:** L-0121, L-0122, L-0128, L-0129, L-0216; fact-check on L-0122. Transcript 00:53:28–00:56:57, 01:36:20–01:37:02.
- **Replacement** (compiled and run: the counter returns to 0 after the frees, and the capped call evicts until there is room):
  ```c
  size_t total_size = 0;  // bytes held, all of them

  void *zmalloc(size_t b) {
      size_t *p = malloc(sizeof(size_t) + b);  // room to note the size
      if (p == NULL) return NULL;              // caller refuses the write
      *p = b;
      total_size += b;
      return p + 1;
  }

  void zfree(void *o) {
      size_t *p = (size_t *)o - 1;             // the size noted at malloc
      total_size -= *p;
      free(p);
  }
  ```
  Second block:
  ```c
  // our design: the cap inside the wrapper
  void *zmalloc(size_t b) {
      while (total_size + b > maxmemory)
          if (!evict_a_key()) return NULL;     // nothing left: refuse
      ...                                      // then as above
  }
  ```
  - If the page should stay shorter, keep the original first block and change only the `zfree` comment to: `// size_of: the size noted when it was allocated (real allocators can report it)`. Also add `if (o == NULL) return NULL;` after `malloc`, and turn the `if` in the second block into the `while` above.
  - In the ZmallocCap panel, change `if total_size + b > maxmemory → evict` to `while total_size + b > maxmemory → evict`.

### F-05 · ERROR (incomplete) · low · Redis's default is to refuse, not to evict
- **Where:** c4 §4.3.
- **Current text:** "Redis splits the same two jobs differently: its `zmalloc` only counts, and the `maxmemory` check runs once per command, before the command executes, evicting keys until usage is back under the cap."
- **Problem:** this is right only when an eviction policy is set. Redis's default `maxmemory-policy` is `noeviction` (confirmed on Redis 8.10). Under that default, a write that would pass `maxmemory` gets an OOM error and nothing is evicted.
  - The page's own design offers both options: "refuse the write with an error, or make room first".
  - The fact-check addition lists the policies (noeviction and the allkeys/volatile variants).
- **Sources:** L-0128, L-0129, L-0154 and its addition. Transcript 00:55:09–00:56:57.
- **Replacement:** "…and the `maxmemory` check runs once per command, before the command executes. Under an eviction policy it evicts keys until usage is back under the cap; under the default, `noeviction`, it refuses the write with an error, the other branch of our design. [[L-0122 L-0129 L-0154]]"

### F-06 · ERROR (fact-check not applied) · low · random eviction saves memory in a design, not in Redis
- **Where:** c5 §5.3. Also the c9 §9.4 bullet "Random costs nothing".
- **Current text:** "In return, a design that evicts at random needs no per-key bookkeeping at all, so the same memory holds more keys…" Later: "Redis supports LRU, LFU and random, and it runs LRU and LFU on just those 24 bits by sampling."
- **Problem:** L-0155 and L-0157 (simplified/low, inline) note that in Redis the 24-bit `lru` field is in every object header whatever the policy. So switching Redis to `allkeys-random` saves CPU, not memory. Read together, the two sentences imply that Redis users gain memory by picking random.
  - The war story ("the cache took in a much larger number of keys") is told as experience and stays.
- **Sources:** L-0155, L-0157, L-0158. Transcript 01:07:12–01:09:57.
- **Replacement:** after "…by sampling. [[L-0154]]", add: "In Redis the 24 bits sit in every key’s header whatever the policy, so there random saves work, not memory; the memory saving belongs to a design that keeps no recency data at all. [[L-0155 L-0157]]" In §9.4, change "Random costs nothing" to "Random keeps nothing".

### F-07 · ERROR (fact-check not applied) · low · CDC from a replica has preconditions
- **Where:** c2 §2.2.
- **Current text:** "You can take even that off the primary: spin up a replica and point the tool at it. One is enough, since every replica holds the same data."
- **Problem:** L-0058 (simplified/low, inline) sets two preconditions.
  - MySQL needs `log_replica_updates`, which is on by default in 8.4.
  - PostgreSQL can create a logical slot on a standby only from version 16. On PostgreSQL 15 and earlier the advice does not work.
- **Sources:** L-0058, L-0342 and both additions. Transcript 00:21:12–00:21:59, 02:41:42–02:42:28.
- **Replacement:** "…spin up a replica and point the tool at it, where the database allows it: a MySQL replica must write its own binlog (`log_replica_updates`, on by default), and PostgreSQL allows logical decoding on a standby only from version 16. One is enough, since every replica holds the same data. [[L-0058 L-0342]]"

### F-08 · ERROR (fact-check not applied) · low · "One CDC can feed several sinks" depends on the tool
- **Where:** c2 §2.3, and the Tiers caption and desc ("could be one CDC with two sinks").
- **Current text:** "One CDC can feed several sinks, though a transformation per sink makes it hungrier for memory."
- **Problem:** L-0374 (simplified/low, inline) says this depends on the tool. An Airbyte connection links one source to one destination, and Airbyte is the tool the page recommends. Debezium fans out through Kafka topics instead.
- **Sources:** L-0374, L-0375 and its addition. Transcript 03:04:33–03:05:25.
- **Replacement:** "One CDC can often feed several sinks (Debezium writes once to Kafka topics that many sink connectors read; an Airbyte connection, by contrast, links one source to one destination), though a transformation per sink makes it hungrier for memory. [[L-0374 L-0375]]"

### F-09 · ERROR (fact-check not applied) · low · the AOF is off by default
- **Where:** c9 §9.3.
- **Current text:** "Redis keeps an **append-only file**, the AOF: every write is appended to a file on disk…"
- **Problem:** L-0319 (simplified/low, inline) says AOF is off by default, and RDB snapshots are the default persistence. Confirmed: `appendonly no` on Redis 8.10. "Redis keeps" reads as always on. The rest of the paragraph applies the other half of the fact-check correctly: commands are appended after they run, and `everysec` can lose about 1 s.
- **Sources:** L-0319 and its addition. Transcript 02:28:51–02:29:21.
- **Replacement:** "Redis can keep an **append-only file**, the AOF (it is off by default; periodic snapshots are the default): every write is appended to a file on disk, and after a restart Redis replays the file to rebuild memory. [[L-0319]]"

### F-10 · ERROR · low · the ring runs to 2^n − 1
- **Where:** c8 §8.2.
- **Current text:** "The ring is the hash function’s whole output range, from 0 up to 2<sup>n</sup>, bent into a circle."
- **Problem:** an n-bit hash takes values from 0 to 2^n − 1. The page's own example has 16 positions, 0 to 15, and the OwnershipRing desc says "0 to 15".
- **Sources:** L-0281, L-0283. Transcript 02:13:48–02:15:02.
- **Replacement:** "…from 0 up to 2<sup>n</sup> − 1, bent into a circle."

### F-11 · ERROR · low · the single thread is why *our* counter is safe, not Redis's
- **Where:** c6 §6.5.
- **Current text:** "The single thread is what makes `zmalloc`, and everything else on this node, correct without a single lock."
- **Problem:** two paragraphs earlier the page says Redis has "a few background threads for chores such as freeing large values". Those threads allocate and free through zmalloc too. That is why Redis updates its memory counter with atomic operations (per-thread counters in recent versions), not plain `+=`.
  - For the page's own design with no helper threads, the sentence is right. As written it reads as a claim about Redis.
- **Sources:** L-0233 and its addition ("mostly single threaded"), L-0356. Transcript 01:44:05–01:44:51, 02:53:31–02:53:56.
- **Replacement:** "In our design the single thread is what makes `zmalloc`, and everything else on this node, correct without a single lock. (Real Redis, whose background threads also allocate and free, updates its counter with atomic instructions: compare-and-swap’s family, not a lock.)"

### F-12 · INVENTION · low · why most expired keys go lazily
- **Where:** c5 §5.5.
- **Current text:** "In memory that is one cheap call, and since cached keys tend to be read, most expired keys go this way."
- **Problem:** the teacher said that most keys are deleted lazily. "Since cached keys tend to be read" is a reason the page added. L-0217 (simplified/low) says it depends on the access pattern, and the Redis docs say passive expiry "is not enough". The next sentence partly covers this, but the invented reason states it as fact.
- **Sources:** L-0215, L-0216, L-0217. Transcript 01:36:20–01:37:02.
- **Replacement:** "In memory that is one cheap call, and in the lecture’s view most expired keys go this way, the ones that are read again. [[L-0215 L-0216 L-0217]]"

### F-13 · DISTORTION · low · "the easier of the two" is an opinion
- **Where:** c1 §1.3.
- **Current text:** "…and Airbyte, a general data-movement tool with a CDC mode, and the easier of the two to set up."
- **Problem:** L-0030's fact-check says "'Easiest to set up' is the teacher's opinion". The rules ask for opinions to be attributed.
- **Sources:** L-0030. Transcript 00:10:45–00:12:06.
- **Replacement:** "…and Airbyte, a general data-movement tool with a CDC mode, which the lecture found the easier of the two to set up."

### F-14 · DISTORTION · low · Redis doesn't "own the clients"
- **Where:** c6 §6.2.
- **Current text:** "If they support gRPC well, or you are prototyping, use it. If you own the clients, as Redis does, define your own format."
- **Problem:** the teacher's rule was to use gRPC if clients support it well, and "otherwise define your own custom format, as Redis does" (L-0201). Redis does not own its clients; most are third-party. Redis owns the protocol (RESP), which every client implements. The page states a condition the lecture didn't give.
- **Sources:** L-0200, L-0201, L-0207. Transcript 01:30:17–01:31:54.
- **Replacement:** "If they support gRPC well, or you are prototyping, use it. Otherwise define your own format and publish it, as Redis did with RESP. [[L-0200 L-0201 L-0207]]"

### F-15 · DISTORTION (citation) · low · the Wikipedia link doesn't give N/(N+1)
- **Where:** c8 §8.1.
- **Current text:** "…on average about N/(N+1) of all keys move: two thirds going from 2 nodes to 3, nine in ten going from 9 to 10 <Cite href="https://en.wikipedia.org/wiki/Consistent_hashing">Wikipedia</Cite>."
- **Problem:** the figure is correct (brute-forced above). But the Wikipedia article only says a change of slot count "causes nearly all keys to be remapped". The cite sits on a number it does not contain. The page's own reasoning ("a key stays only when both remainders agree") is the real support.
- **Sources:** L-0274 (fact-check), L-0290. Transcript 02:11:45–02:12:00.
- **Replacement:** "…a key stays only when both remainders agree, which happens for 1 key in N+1, so about N/(N+1) of all keys move: two thirds going from 2 nodes to 3, nine in ten going from 9 to 10, or, as Wikipedia puts it, nearly all keys are remapped <Cite …>Wikipedia</Cite>."

### F-16 · INTERNAL CONTRADICTION (code vs figures) · low · `unsigned type : 4` vs `int type : 4`
- **Where:** c3 code block (`unsigned type : 4;`) versus the struct rows in StructStage1 (`int type : 4;`), StructStage2 and ExpiryQueue (`int type : 4;`), and SizeofVsData (`int type;`).
- **Problem:** the text is right. With `int`, compilers such as clang and gcc make a 4-bit field signed (−8 to 7). Storing 12 gave −4 when tested. That contradicts the same figures' "4 bits = 16 types".
- **Sources:** L-0094, L-0096, L-0097. Transcript 00:39:06–00:41:58.
- **Replacement:** in all three struct figures, change the row to `unsigned type : 4;`, matching c3. SizeofVsData may keep `int type;` or use `unsigned type : 4;`. sizeof is 16 either way on 64-bit; both were checked.

### F-17 · INTERNAL CONTRADICTION · low · a DHT has no centre, but our design has a router
- **Where:** c9 §9.3 and the "Go deeper: distributed hash tables" margin note.
- **Current text:** "Step back and look at what you built. It is a hash table spread over machines, with a rule that tells anyone where each key lives. That has a general name: a **distributed hash table**." The margin note then says: "What makes one a DHT is no central entity…"
- **Problem:** the design the page just finished has "many nodes on a ring behind a router" (Fig 9·d). L-0304 (simplified/low, inline) says "DHT" usually means a decentralised peer-to-peer system, and a proxied cache cluster is usually called a partitioned or sharded store. The two sentences disagree unless the reader removes the router.
- **Sources:** L-0304, L-0307, L-0310. Transcript 02:23:21–02:25:47.
- **Replacement:** "Step back and look at what you built. It is a hash table spread over machines, with a rule that tells anyone where each key lives. Take away the router, so that any node can point you onward, and it has a general name: a **distributed hash table**. [[L-0304 L-0307]]"

### F-18 · INTERNAL CONTRADICTION (across lectures) · low · "by far the most common" vs Lecture 3's "about 90%" ranges
- **Where:** c8 §8.1, "Hashing is by far the most common way, because a hash function spreads keys almost uniformly over the nodes."
- **Problem:** Lecture 3 (`lec05/c9-grow.mdx` §9.3) says, as one engineer's estimate, that "most sharded databases (by his estimate about 90%)" split by fixed ranges. A reader of both lectures gets opposite claims about what is most common. The teacher said both, in different contexts: caches here, sharded databases there.
- **Sources:** L-0270 (this lecture); lec05 L-0286 to L-0288. Transcript 02:09:35–02:10:34.
- **Replacement:** "For a cache, hashing is the usual way, because a hash function spreads keys almost uniformly over the nodes. (Lecture 3 met the other side: sharded databases that rarely change their shard count often keep fixed ranges.) Not randomly: the same key always lands on the same node. [[L-0270]]"

### Important losses
None. The core methods are all present: read the source of truth, checkpoint, at least once, events for context versus CDC for raw data, the wrapper and the bit budget, counting in one allocator wrapper, the eviction choice by the key's life, the expiry without a queue, protocol by bytes, the three concurrency answers, four routing ways, ownership, % N versus the ring, adding a node from a snapshot, replicas and RF, and the AOF.

Cuts considered and accepted as Q&A tangents, trivia or another lecture's material:
- connection pools (L-0370 to L-0373, core-tagged but an end-of-class Q&A);
- the seat double-booking thread (L-0361 to L-0369, Lecture 3's material);
- multiple CDC instances (L-0343, L-0344);
- SSE versus CDC; PGSync; the DHT example list; the orchestrator.

---

## The writer's decisions (NOTES.md)

NOTES.md has no "Unsure" list. These are its stated decisions and corrections, each judged.

- **RF 2 → 3 (§9.2, SurviveNode). Justified.** At 02:27:23 the teacher said: "replication factor of, let's say, 2, which means the node that owns it stores it and two nodes immediately after that in the ring would have the data."
  - With the definition he gave (owner plus the next two), the standard count is 3. L-0317 is imprecise/low, inline, and its verified addition says Dynamo stores each key on N nodes, the coordinator plus N − 1 successors, and Cassandra RF=3 means three copies.
  - The pause states the counting rule once and gives the class's "2" as the wrong option ("2: two extra copies"). That is the correction stated once.
  - One nuance, not counted as an issue. The teacher's worked example just before the number ("whatever data is on cache 1, I have one copy of it in cache 3") is one extra copy, which really is RF 2. At 02:50:50 he says "replication factor of two" again. So the class's "2" fits his example, and his "next two" phrase is the odd one out.
  - The page uses the one-copy example in the §9.2 text and the owner-plus-two shape in the pause and the figure, and names neither the example's RF nor the link between them.
  - Optional, to make the counting rule visible on both shapes: after "…cache 4 already has its data and serves its requests. [[L-0316]]" add "That is two copies of every key, a replication factor of 2." The pause then extends it to the next two nodes and 3.
- **StructStage2 drops the 4 + 28 bar and shows 4 + 4 + 24. Correct** (L-0139 and its addition). The `lru : 24;` rows in StructStage2, ExpiryQueue and SoFarCache match. The 4-bit type row has its own signedness issue (F-16).
- **ZmallocCap "chapter 3" → "chapter 5". Correct:** eviction is chapter 5. The panel's `if` should be a `while` (F-04).
- **SurviveNode "(RF 2 as said in class)" → "replication factor 3 / three copies in all". Correct.** The desc names c1, c3 and c4, which matches the ring order 3, 5, 10, 12.
- **VirtualNodes "the lecture: … / Dynamo: …" → "cost / gain". Correct.** The trade is stated once in §9.1, with the Dynamo quote and the operational cost (L-0332 to L-0336, medium, all applied). "Same total (~1/N)" is right: 1/(N+1) on a join, 1/N on a leave.
- **Each correction in the NOTES list was verified on the page:** heap exhaustion, syscall cost, sizeof 16 B, malloc/free, zmalloc only counts / per-command check / maxmemory 0, the 4+4+24 header, the LFU log counter, list LRU 12/24 B, Memcached lists, sampling (5 default, 10 ≈ true LRU), active expiry 20 / >10% (matches Lecture 3 §8.2 word for word), db->expires, keep-alive, Host, gRPC, CAS atomic in hardware, mostly single-threaded, MOVED / READONLY / Sentinel, Kademlia iterative, N/(N+1), 2^128 / 2^160, 16,384 slots, the bigger ring not fixing imbalance, AOF after execution / everysec, initial snapshot, at least once → upserts, log retention and outbox.
  - All are present and stated once.
  - Exceptions: the order caveat from L-0072/0073 was not applied (F-01), and several low inline clarifications were dropped (F-03, F-06 to F-09).
- **War stories told as experience. Correct.** All five are framed as one engineer's experience: 60 → 2 machines ("a consulting case, as the engineer who advised them tells it"), random eviction, the 2015 netcat story, the crash experiment, and consistent hashing in production. So is the 10,000–50,000 users rule ("a rule of thumb from experience"). The 80% is scoped to "that subsystem" (L-0059).
- **Cuts. Accepted.** None removes a reusable method. See Important losses.
- **Incoming links.** This review did not check them; that is the coordinator's step. Lecture 3 still links `sec="s6"` (`lec05/c9-grow.mdx`), and lec10 still links `s5-2` and `s6-7`, which NOTES already lists for remapping.

---

## Checked and found correct

**Callbacks to other lectures:**
- **Lecture 1** (`lec04` §8.2, §8.3, §3): a shared cache in front of the database. "The course builds a cache from scratch in Lecture 9", including "how a cache decides what to throw out". RAM costs far more per GB than disk. The AOF's once-a-second flush losing about a second.
- **Lecture 2** (`lec01` §3.4–3.5, §4.1–4.2): the publish event, search consuming at its own pace, the lost clap, a mutex as pessimistic locking, and optimistic locking as "checks at write time whether anyone changed the value underneath".
- **Lecture 3** (`lec05` §8.2, §9.3): lazy deletion plus sampling 20 at a time while more than 10% are expired, and range shards on two masters with routing in the API servers.
- **Lecture 5** (`lec08` §1 and DNS): the load balancer as a TCP proxy, and "DNS answers and steps aside".
- **Lecture 8** (`lec06` §8.6): a set per user, keys set if absent with a TTL, a cluster, ending on "what is inside it".
- **Lecture 10 hand-off** (`lec10` header): two storage engines in files, and the append-only file coming back.

**Protocol and code:**
- HTTP 117 B with a 9-byte body; RESP 27 B. `*3` and `$n` are explained correctly, and the 27 bytes were accepted by a live Redis.
- The netcat block. A Host line is shown, and the text says a strict server requires it (L-0190). It is a cleaned-up rendering of the class story, which the text frames as "a request typed in the format the HTTP specification describes".
- HTTP/1.1 keep-alive by default (L-0182, wrong/medium, applied). TCP not UDP. gRPC over HTTP/2, multiplexed, Protobuf (L-0199, L-0206 medium, applied). Memcached has its own protocol.
- CAS: `update a = 20 where a = 10`, and atomicity from hardware, not from "no context switch" (L-0231, applied). The CasRace stepper and desc match the text.
- Python `bisect` ring: `owner(0)` = `owner(13)` = cache 1, matching Fig 8·b and the OwnershipRing desc.
- `sizeof(MyValue)` = 16 on 64-bit, and the three-pointer node = 24 B (12 B with 4-byte pointers), matching the TextbookLru labels.

**Redis internals:**
- The 4-bit type and why it is capped. The header packs 4 type + 4 encoding + 24 LRU into one 32-bit word.
- Under LRU the field is a timestamp. Under LFU it is an 8-bit logarithmic counter that decays.
- Sampling: 5 by default, and 10 is close to true LRU. Redis keeps no list, while Memcached keeps doubly linked LRU lists (L-0149 medium, applied). An O(1) LFU costs memory.
- `maxmemory 0` means no limit on 64-bit. zmalloc only counts, and the check runs per command (L-0122, L-0129, applied). Redis still reads the OS figure occasionally. jemalloc is Redis's allocator on Linux.
- Expiry: no priority queue, the `db->expires` index costs memory, lazy deletion through `zfree`, and active expiry 20 per batch while more than about 10% are expired (L-0218 outdated, applied).
- Mostly single-threaded, with background threads (L-0233, applied). Redis Cluster's `MOVED`. A standalone replica refuses writes (`READONLY`, tested), and Sentinel gives the master's address (L-0261 medium, applied). L-0326's "almost all databases return the master" is not repeated.
- Redis Cluster uses 16,384 hash slots, not a ring.

**Memory and the heap:** malloc returns NULL; C++ `new` throws `bad_alloc`; Linux overcommit leads to the OOM killer; a segfault comes only from using the NULL (L-0104 wrong/medium, applied). In the Go deeper: `ulimit` gives ENOMEM, the OOM killer sends SIGKILL, and SIGABRT comes from `abort()` (L-0359 medium, applied). The crash experiment is hedged as "died".

**CDC:**
- The four leaks: no event, thin events, dual write, new tables. The whole blog in an event makes messages large (02:44:22).
- Polling misses deletes and intermediate updates (L-0036). MySQL binlog, PostgreSQL logical decoding, MongoDB change streams on a replica set, and Elasticsearch scan-only (L-0038 medium, applied in the text; the figure is wrong, F-02).
- Initial snapshot. Log retention forces a re-snapshot. A checkpoint gives at least once, so the sink upserts.
- Reading through the client. The outbox pattern, described correctly: an event row in the same transaction, which CDC carries to Kafka.
- Eventual consistency; Spark for joins.
- The clip `l07-events-vs-cdc` (1 of 4 vs 4 of 4, the stopped tool resuming from its checkpoint) matches §1.2–1.3 and the clip's lead and caption.

**Eviction choice:** the scan argument, the stock analogy, Wikipedia and the World Cup, the viral song, Google News, lopsided popularity (L-0351), and "most systems see no difference" (L-0173). The `l07-lru-vs-lfu` alt simulation is consistent: six slots, a six-article scan flushes A–D under LRU, and LFU keeps them.

**Routing:**
- Five concerns. Ranges a–j, k–t, u–z.
- The four bank ways and their trade-offs. The internet forwards. Forwarding is not used for a cache (L-0260). The redirect avoids an extra component (L-0323). Mixing ways is allowed.
- The `l07-four-routes` legs and round trips: the redirect is the one with 2 round trips, which answers the clip's lead.
- Kademlia lookups are iterative, the redirect way (L-0253, applied in the margin note).

**Consistent hashing:**
- The six-key example (6, 8, 7, 1, 3, 2): K1 stays, K3 and K4 stay, K2 → c2, K5 → c0, K6 → c2, so 3 of 6. On average N/(N+1) moves under % N and about 1/(N+1) on the ring. The `l07-mod-vs-ring` alt and cues match.
- Ownership only; the myths. Node positions 3/12/5/10. K1 at 0 goes to cache 1; cache 5 at 1 takes K1.
- Removing cache 1 hands its slice (12, 3] to cache 3; graceful versus abrupt. Adding at peak: snapshot, add to the ring, delete (12, 1]. With replicas on the next nodes cache 1 may keep the keys, because cache 1 is cache 5's successor.
- Only the successor hands over keys (L-0293, applied).

**Virtual nodes and replication:**
- Virtual nodes: the total stays about 1/N, the Dynamo quote, and the operational cost (L-0332, L-0335, L-0336 medium, applied). A bigger ring doesn't fix imbalance (L-0331, applied).
- Replica per node versus copies on the next nodes. RF counts every copy (see above).
- The AOF appends after execution, and `everysec` loses about 1 s.

**Unverifiable items, all attributed:** the 10–50k users rule, the 60 → 2 machines and 80% story, random eviction eight months in, the 2015 IoT story, the crash experiment, consistent hashing in production, and reading the Redis source "by the fifth or sixth day".

**Not checked as content:** the clip `section` metadata in the four `timeline.ts` files still holds old numbers ("5.3", "3.4", "6.3"). `AnimationClip.astro` does not render it, so readers never see it.
