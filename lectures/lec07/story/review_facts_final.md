# Lecture 9 (lec07) story rewrite: final fact and faithfulness re-check

Scope: the final `site/src/content/lectures/lec07.mdx` (chapter list), `lec07/s0-header.mdx` and `c1`–`c9`, and the text of every figure the page imports (`site/src/figures/lec07/*.tsx`: labels and descs). Also the alt text, captions and on-screen text of the four clips (`site/src/animations/clips/l07-*`) and the posters of the two clips that changed (`site/public/clips/l07-events-vs-cdc/`, `l07-four-routes/`). `story/page_text.md` is newer than every MDX, figure and clip file, and it carries the Revision 2 text.
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `transcript/`, `story/NOTES.md` (Revision 2), and the Redis source on GitHub (tags 7.4.0, 8.0.0, 8.2.0, 8.4.0 and `unstable`). For callbacks I checked the live pages of Lectures 1 (`lec04`), 2 (`lec01`), 3 (`lec05`) and 8 (`lec06`).

**Result:** all 18 earlier items are fixed. The fresh pass found **2 new low-severity issues** and 2 optional notes. There are no medium or high issues.
- **N1:** §5.5's new sentence says Redis keeps expiry times in `db->expires` "rather than in the object". That has been out of date since Redis 8.2.
- **N2:** §8.1 still opens with "Most systems use a function instead", which F-18 was meant to remove.

The C code compiles cleanly and behaves as the text says. The CAS step-through, the reordered chapter 2, the dual-write callback to Lecture 8, the two changed clips and their posters, and the callbacks to Lectures 1, 2, 3 and 8 are all correct.

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| F-01 "order for free" (medium) | **Fixed** | §2.2: "The checkpoint is what makes CDC lossless, and it reads the log in order. … so CDC reads them in that order. What arrives at the sink is a little weaker: one event per changed row, not one per transaction. Debezium, for example, keeps order per table, not across tables, unless you ask it for transaction markers." |
| F-02 MongoDB drawn with a binlog (medium) | **Fixed** | CdcReads label `oplog` on phone (l. 294) and desk (l. 323). DESC_1C: "Under MongoDB sits its log, the oplog, which CDC tools read through change streams." §2.1: "MongoDB exposes its oplog through change streams, which need a replica set." The clip poster's panel is labelled with the generic `log`. |
| F-03 binlog vs WAL | **Fixed** | §2.1: "PostgreSQL’s write-ahead log, or MySQL’s binary log, the binlog, a replication log kept apart from InnoDB’s own redo log." |
| F-04 zmalloc / zfree code | **Fixed** (compiled and run, see §3) | The first block has a size header, a NULL check and a `zfree` that reads the size noted at malloc. Below it: "`free` needs to know how many bytes to subtract … this `zmalloc` notes each block’s size in a small header in front of it. (Real allocators can often report a block’s size themselves; Redis uses that when it can.)" The capped block: `while (total_size + b > maxmemory) if (!evict_a_key()) return NULL;`. ZmallocCap panel: `while total_size + b > maxmemory → evict`. The desc says "for as long as total_size plus b would pass maxmemory". |
| F-05 `noeviction` default | **Fixed** | §4.3: "Under an eviction policy it evicts keys until usage is back under the cap; under the default, `noeviction`, it refuses the write with an error, the other branch of our design." |
| F-06 random saves memory only in a design | **Fixed** | §5.3: "In Redis the 24 bits sit in every key’s header whatever the policy, so there random saves work, not memory; the memory saving belongs to a design that keeps no recency data at all." §9.4: "Random keeps nothing". |
| F-07 CDC from a replica | **Fixed** | §2.2: "…where the database allows it. A MySQL replica must write its own binlog (`log_replica_updates`, on by default), and PostgreSQL allows logical decoding on a standby only from version 16." |
| F-08 one CDC → many sinks | **Fixed** | §2.3: "One CDC can often feed several sinks (Debezium writes once to Kafka topics …; an Airbyte connection, by contrast, links one source to one destination)…". Tiers desc: "With some tools the first two could share one read of the source". The labels say "could be one cdc with two sinks", and "could" is hedged enough. |
| F-09 AOF off by default | **Fixed** | §9.3: "Redis can keep an **append-only file**, the AOF (it is off by default; periodic snapshots are the default)…" |
| F-10 2^n − 1 | **Fixed** | §8.2: "from 0 up to 2<sup>n</sup> − 1, bent into a circle." |
| F-11 the single thread is why *our* counter is safe | **Fixed** | §6.5: "In our design the single thread is what makes `zmalloc` … correct without a single lock. (Real Redis, whose background threads also allocate and free, updates its counter with atomic instructions: compare-and-swap’s family, not a lock.)" Current `zmalloc.c` matches: per-thread slots with single-writer atomics, and atomic read-modify-write in the shared pool. |
| F-12 invented reason for lazy expiry | **Fixed** | §5.5: "In memory that is one cheap call, and it catches every expired key that somebody reads again." No reason is invented, and nothing is claimed about "most". |
| F-13 Airbyte "easier" | **Fixed** | §1.3: "…which the lecture found the easier of the two to set up." |
| F-14 Redis "owns the clients" | **Fixed** | §6.2: "Otherwise define your own format and publish it, as Redis did with RESP." |
| F-15 N/(N+1) citation | **Fixed** | §8.1: "a key stays only when both remainders agree, which happens for 1 key in N+1, so about N/(N+1) of all keys move … or, as Wikipedia puts it, nearly all keys are remapped". |
| F-16 `int type : 4` | **Fixed** | StructStage1 (`s2-one-node.tsx` l. 43), StructStage2 (`3a` l. 14) and ExpiryQueue (`3d` l. 14) all use `unsigned type : 4;`. SizeofVsData keeps `int type;`, which is allowed. The remaining `int type : 4;` / `lru_bits : 28;` row is in `SingleNode`, which no page imports. |
| F-17 DHT vs router | **Fixed** | §9.3: "Take away the router, so that any node can point you onward, and it has a general name: a **distributed hash table**". |
| F-18 "most common" vs Lecture 3 | **Fixed**, with one leftover sentence (see **N2**) | §8.1: "For a cache, hashing is the usual way, because a hash function spreads keys almost uniformly over the nodes. (Lecture 3 met the other side: sharded databases that rarely change their shard count often keep fixed ranges.)" |
| Optional RF sentence | **Applied** | §9.2: "That is two copies of every key, a replication factor of 2." The pause answer starts "Three." Each count fits its own shape: one extra copy is RF 2, and owner plus the next two is RF 3. |

---

## 2. New issues

### N1 · ERROR (outdated, contradicts the L-0213 fact-check) · low · where Redis keeps the expiry time
- **Where:** c5 §5.5, last paragraph. This sentence is new in Revision 2 (reader fix 5a).
- **Current text:** "To sample only keys that have a TTL, the job must be able to find them, so keep one more thing: a second hash table of just those keys. Redis does exactly this, and keeps the expiry times there rather than in the object."
- **Problem:** this was true up to Redis 8.0.
  - In 7.4.0 and 8.0.0, `getExpire` reads the time from the `db->expires` dict entry (`dictGetSignedIntegerVal(de)`).
  - Since 8.2.0, a key's expiry lives in its own object. `kvobjGetExpire` reads it from the object's metadata (`expirable` bit in 8.2/8.4, `metabits` in `unstable`), and `db->expires` only indexes the objects that have one.
  - The fact-check note on L-0213 says the same: "the current object header has metadata bits for an expiry attached to the key object".
  - The earlier review tested against Redis 8.10, so the page's "Redis" is the current Redis. Current Redis does what our design does (the number in the wrapper, plus an index of TTL keys), so the "rather than" contrast is backwards.
- **Sources:** L-0213 (fact-check note), L-0220; `redis/src/db.c` and `object.c` at tags 8.0.0, 8.2.0 and `unstable`. Transcript 01:34:30–01:36:20 (expiry design).
- **Replacement:** "To sample only keys that have a TTL, the job must be able to find them, so keep one more thing: a second hash table of just those keys. Redis does exactly this. Since Redis 8.2 it keeps each expiry time in the key’s own object, as our wrapper does, and the table only lists the keys that have one (earlier versions kept the times in the table itself). A plain table has no order to maintain, …" (the rest unchanged).
  - Shorter option: drop the clause and write "Redis does exactly this." If you take the short option, also check that the NOTES line "Redis keeps expiries in that table" is not repeated anywhere else (it is not in any figure text).

### N2 · INTERNAL CONTRADICTION (across lectures, F-18 leftover) · low · "Most systems use a function instead"
- **Where:** c8 §8.1, the paragraph's opening sentence.
- **Current text:** "Ranges need a table that somebody keeps up to date. Most systems use a function instead. In **hash-based routing**, …"
- **Problem:** two sentences later the page correctly limits the claim ("For a cache, hashing is the usual way … Lecture 3 met the other side: sharded databases … often keep fixed ranges"). But the unqualified "Most systems" still contradicts Lecture 3 §9.3 ("most sharded databases (by his estimate about 90%) work this way"), and it now also contradicts this page's own parenthesis. L-0270 is said about this routing context, not about all systems.
- **Sources:** L-0267, L-0270; lec05 L-0286 to L-0288. Transcript 02:09:35–02:10:34.
- **Replacement:** "Ranges need a table that somebody keeps up to date. A function needs none."

### Optional notes (not issues)
- **O1, `zfree(NULL)`:** the sample dereferences its argument, so `zfree(NULL)` crashes, while `free(NULL)` is a no-op and Redis's `zfree` returns early on NULL. The page never calls `zfree(NULL)`, so this is not an error. If wanted, add a first line to `zfree`: `if (o == NULL) return;`. Related: the header makes returned pointers only 8-byte aligned (measured: address mod 16 = 8), which is the same as Redis's own `PREFIX_SIZE` fallback. Fine for a sketch.
- **O2, an oversized request:** with the capped `while` loop, a request bigger than `maxmemory` evicts every key and then returns NULL (measured below). This is inherent to "evict until it fits", and Redis's `noeviction` default avoids it. No change needed.

---

## 3. Focus checks, re-run

**The C code (c4 §4.3).** I compiled `zmalloc`, `zfree` and the capped `zmalloc` exactly as on the page, with a 64-slot key list and an `evict_a_key` that calls `zfree`. The build was `cc -Wall -Wextra`: 0 warnings. The files are in the session scratchpad (`l9final/z.c`).
- Two mallocs (100 + 16) give `total_size` 116. Both frees bring it back to 0.
- Cap 1000: nine 100-byte keys give 900. A 450-byte request evicts 4 keys (one eviction would not have made room), and `total_size` ends at 950, under the cap.
- A 5000-byte request evicts everything left, then returns NULL (O2).
- The prose ("notes each block’s size in a small header", "Redis uses that when it can", i.e. `zmalloc_size` / `HAVE_MALLOC_SIZE`) matches the code and Redis.

**The CAS step-through (c6 §6.4, Fig 6·c).**
- The steps, the CasRace labels and the desc all tell the same story: both threads read 10, each prepares `a = 11 where a = 10`, thread 1's `CAS(a, 10 → 11)` wins, thread 2's `CAS(a, 10 → 11)` "finds 11, not 10: no change", then thread 2 re-reads 11 and runs `CAS(11 → 12)`, and `a` ends at 12.
- This matches the text in 6.3 ("The answer should be 12") and 6.4 (`set a = 11 where a = 10`).
- Atomicity comes from hardware (L-0231 applied). The `stepK` ids fit their steps.

**The expiry design (c5 §5.5, Fig 5·d).**
- One absolute expiry number per key goes in the wrapper (L-0213 accurate). The priority queue is rejected for its per-key pointers (L-0214).
- Lazy delete through `zfree` keeps `total_size` right.
- The active cycle samples 20 keys at a time while more than about 10% of a batch is expired. This matches L-0218 and Lecture 3 §8.2 word for word.
- A TTL-key index costs memory (L-0220 applied). Figure labels: "one number + a TTL-key index", "what we do", priority queue "rejected".
- Only the Redis side note is out of date (N1).

**The reordered chapter 2.**
- The chapter opens by answering chapter 1's two questions (the log, the checkpoint), in order.
- §2.3 now opens on the sixty-machine company ("Hold that number for 2.4"), and §2.4 picks it up ("Back to the sixty machines").
- The facts moved intact: more than sixty machines with 32 GB each, two EC2 instances, about 80% of that subsystem's cost, lag at a bare minimum, the pipeline losing data and the cron resync plan. All of it is still told as one engineer's consulting experience (L-0059 to L-0067).
- The outbox, raw data vs context, bulk vs one-by-one, the Tiers figure and §2.5's limits are unchanged and correct.
- The reorder adds no contradiction. Fig 2·b's caption ("c5 and c6 are one transaction, written together at commit") matches the TwoWays desc and §2.2.

**The dual-write callback to Lecture 8 (c1 §1.2 → `lec06` `s4-3`).**
- Link target: `lec06/c4-million-faces.mdx` §4.3 "You change your photo. Who tells the CDN?" exists. It says "The design puts the `photo_updated` event on Kafka and lets small workers make that call".
- Lecture 8's own recap (§8.5/8.6 area, l. 150) says "On a change, the API writes the database and puts an event on Kafka; a worker calls the CDN’s purge API".
- So "write the database, then put an event on Kafka for the worker that purges the CDN" matches Lecture 8.
- Lecture 8 doesn't use the words "dual write", but calling its flow one is a fair description: two writes, no spanning transaction.
- The only uncommitted change in lec06 is in §4.1 ("upload service" → "image service"), and it doesn't touch §4.3.

**The two changed clips and their posters.**
- `l07-events-vs-cdc`: the resume cue and storyboard B5 now read "CDC restarts and catches up." The alt ends "when CDC restarts it catches up and copies it". All of it matches the page caption and chapter 2.
  - The poster (paper and blackboard, desk and phone) shows: event copy 1 of 4, CDC copy 4 of 4, `back`, `checkpoint` beside the read arrow, `log` under MongoDB, and "Read the source of truth, not the API's events."
  - Keeping the word "checkpoint" on the canvas was a recorded partial rejection (1d). It is accurate and is explained in §2.2.
- `l07-four-routes`: "peon"/"bribe" became "runner"/"fee" in the cues, the canvas text and the alt, matching §7.2 ("The runner at the door. For a small fee…", "No runner, no regulars").
  - The posters (paper desk and blackboard phone viewed) show "the fee". The legs and round trips are unchanged and correct: proxy 4 legs / 1 round trip, smart client 2 / 1, forwarding 4 / 1, redirect 4 / 2.
  - No "bribe" or "peon" is left in either clip's rendered text.

**Callbacks to other lectures.**
- **Lecture 1** (`lec04`):
  - §8.2 (header, §2.5): a shared cache in front of the database, plus "the course builds a cache from scratch in Lecture 9".
  - §8.3 (c3): "RAM costs far more per gigabyte than disk".
  - §3 (c9 §9.3): the AOF's once-a-second flush.
  - Lecture 1's line "fixed buckets, which Lecture 9 builds" (lec01 c2) is answered by the Redis Cluster 16,384-slot sentence in §8.2.
- **Lecture 2** (`lec01`):
  - §3.4–3.5 (c1): publish puts one event in a topic, and search reads it at its own pace.
  - §4.1 (header, c6 §6.3): the lost clap as a read–add–write race between two threads.
  - §4.2 (c6): a mutex as pessimistic locking (semaphores appear in its margin note), and optimistic locking as "checks at write time whether anyone changed the value underneath".
- **Lecture 3** (`lec05`):
  - §8 (c5): an in-memory store, lazy deletion, and 20 at a time while more than 10% are expired.
  - §9.3 (c7, c8): range shards on two masters, with the API servers holding the ranges, as c7's smart client says. Lecture 3's "about 90% fixed ranges" estimate conflicts only with the leftover sentence in N2.
- **Lecture 8** (`lec06`):
  - §8.6 (header): "a set per user with an O(1) size, keys set only if absent and given a TTL, a cluster spread over machines … ended on" two copies, the analysts' first and then the cache "built from the inside".
  - c3: "kept a set per user in Redis and asked for its size in O(1)".
  - §4.3 (c1): see above.
- **Lecture 5** (`lec08` s1, c7) and **Lecture 10** (`lec10` header, c7 `s9-3`, c10 `s8-2`/`s9-1`): unchanged and correct. All three section ids exist.

**Incoming links (coordinator, not a page error):** `lec05` still links the old ids: `c4-same-shape.mdx:38` `s4`, `c8-in-memory.mdx:66` `s3`, and `c9-grow.mdx:68` `s6`. NOTES lists the remaps (`s6-4`, `s5-5`, `s8`). They still need applying at publish.

**Spot checks of other Revision 2 text:**
- §4.3 "maxmemory 0 … no limit".
- The §4 Go deeper (overcommit, SIGKILL, ENOMEM, SIGABRT).
- §5.3 sampling: 5 by default, 10 is close to true LRU.
- §9.2 RF wording and pause.
- §9.3: the AOF is appended after execution, so it is "a log of what happened rather than a write-ahead log", consistent with §2.1's WAL wording.
- The released Redis 8.2 and 8.4 headers still pack type 4 + encoding 4 + lru 24 into the first word, so StructStage2 and §5.1 stay correct.
