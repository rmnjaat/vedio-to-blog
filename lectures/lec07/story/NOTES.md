# Lecture 9 (lec07) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and `lectures/STORY_WRITER.md`, with lec03/lec05/lec08 as models and the site review (`scratchpad/review/05-lec9-lec10.md`, Lecture 9 part) as the brief for what to fix. Source: `site/src/content/lectures/lec07.mdx` + `lec07/{s0-header,c1…c9}.mdx`.

## Shape

Two builds, both framed as copies of the blog's data whose source of truth is the database:
- **Part 1, a complete copy (ch 1–2):** the analysts' copy fed by Lecture 2's Kafka events misses changes → CDC. Kept short (CDC was a 15-minute preview in class; the old page gave it 6.5k words).
- **Part 2, a fast copy: our Redis (ch 3–9):** one node on a byte budget (3–6), then many nodes priced in hops and keys moved (7–9).
- **Hand-off 2→3:** CDC's copies are complete and a little behind; the copy the API reads on every request is Lecture 1's shared cache, which may drop a key because the database still has it (L-0156). Lecture 1 promised to build it.
- **Lecture opens with:** the overview hook names both problems (views++ never reaches the analysts' copy; the cache is a box nobody opened), then chapter 1 starts with CDC. Redis starts at chapter 3. The overview's recap of Lecture 8 matches lec06 §8.6 ("leaned on Redis… ended by asking what is inside it"), and Part 2 is introduced as "the box Lecture 8 asked about".
- **Hand-off out:** §9.5, everything fits in RAM → Lecture 10, data in files.

## Chapters (words per built page, counted with scratchpad `wc2.py` over `site.sh text`: captions, pause answers, chrome included; SVG text and clip-as-text excluded)

| # | Title | Words |
|---|---|---|
| – | Overview (hook, where you are, two parts, can-do, before you start; incl. chapter list) | 1,200 |
| 1 | The analysts need a copy of production. What could it miss? | 1,191 |
| 2 | Sixty machines kept one copy in sync. How many did it need? | 1,489 |
| 3 | Build the box. Where does a value live, and what is it? | 1,135 |
| 4 | How full is the box? | 1,146 |
| 5 | The box is full. Which key goes? | 1,597 |
| 6 | Every API server calls the box. What do they send, and who goes first? | 1,515 |
| 7 | One box isn’t enough. Who knows where kiwi lives? | 1,202 |
| 8 | A fourth box joins. How many keys have to move? | 1,573 |
| 9 | A box dies. Where are its keys? (incl. what you can now do, 4 recall questions, hand-off) | 1,455 |

Total ≈ 13.5k counted this way (≈ 12.7k without the chapter list and page chrome). Old page ≈ 34k.

## Figures

- **Added** `site/src/figures/lec07/so-far.tsx`: `SoFarCopy` (stages 0–2, chapters 1–3) and `SoFarCache` (stages 0–6, chapters 4–9 and the finished map Fig 9·d). Desk 640, phone 330, kit parts only.
- **Kept:** DayZero, EventLeaks, CdcReads, TwoWays, Tiers, SixtyToTwo, HashTable, StructStage1, SizeofVsData, ZmallocCap, StructStage2, TextbookLru, ExpiryQueue, BytesOnWire, CasRace (stepper), OneThreadCores, KeyRanges, RoutingQuestion, OwnershipRing, RemoveCache1 (stepper), AddSafely (stepper), VirtualNodes, SurviveNode. All four clips (renumbered 1·1, 5·1, 7·1, 8·1; MDX captions only, clip files untouched, so no poster regeneration).
- **Fixed figure text:** StructStage2 drops the "class: 4 + 28" bar, shows Redis's 4+4+24 only, row `lru : 24;`; ExpiryQueue row `lru : 24;`; ZmallocCap "chapter 3" → "chapter 5"; SurviveNode "(RF 2 as said in class)" → "replication factor 3 / three copies in all"; VirtualNodes "the lecture: …" / "Dynamo: …" → "cost: … / gain: …", desc rewritten.
- **Deleted files** (nothing imports them; content/samples checked): `s0-header-sofar.tsx`, `s7-keep-7a.tsx`, `s3-eviction-and-expiry-3c.tsx`, `-3e.tsx`, `-rule.tsx`. Unused exports left in surviving files: LectureMarks, RuleSourceOfTruth, HeapFills, EveryBit, ProtocolChoices, ThreeDoors, SingleNode, Pessimistic, SharedLocks, KeepItOpen, FourWays, ProxyCache, PickYourBattle, ModTables, RingAndArray, AddCache5, OwnershipRule, DhtFigure, Orchestrator.
- Old `s1a…s7-keep.mdx` deleted; `s0-header.mdx` rewritten; new `c1…c9`.

## Fact-check corrections, each stated once in the main text

- Heap exhaustion (L-0104, L-0341, L-0359): malloc returns NULL / C++ bad_alloc; Linux overcommit → OOM killer; segfault only from using NULL (§4.1); ulimit ENOMEM, SIGKILL, SIGABRT in the ch4 Go deeper.
- Syscall cost (L-0109): slows the cache, not "the whole system" (§4.2). sizeof = 16 bytes on 64-bit (L-0112).
- malloc/free (L-0115/0116) (§4.3). zmalloc only counts in real Redis; maxmemory checked per command; maxmemory 0 = no limit (L-0122/0129, A-DCL-04) (§4.3).
- Redis header 4 type + 4 encoding + 24 LRU (L-0139); LFU log counter (L-0143) (§5.1).
- List LRU 12 B / 24 B on 64-bit (L-0147); Memcached keeps lists (L-0149/0153) (§5.2).
- "You cannot do that" (L-0237/0236) → Redis samples 5 keys, 10 ≈ true LRU (§5.3).
- Active expiry: 20 per batch, >~10% (L-0218), matching Lecture 3; db->expires index (L-0220) (§5.5).
- HTTP/1.1 keep-alive by default (L-0182); Host header required (L-0190) (§6.1). gRPC: HTTP/2, multiplexed, Protobuf (L-0199/0206) (§6.2).
- CAS atomic in hardware, not "no context switch" (L-0231); Redis mostly single-threaded (L-0233) (§6.4–6.5).
- Redis Cluster MOVED; standalone replica refuses; Sentinel gives master address (L-0261/0324/0326) (§7.4). Forwarding vs Kademlia iterative lookups (L-0253) → ch9 Go deeper.
- % N → average N/(N+1) moved (L-0274) (§8.1). Ring size 2^128 MD5 / 2^160 SHA-1 (L-0283); Redis Cluster 16,384 slots (A-DCL-14) (§8.2).
- Bigger ring doesn't fix imbalance (L-0331); virtual nodes total ~1/N, Dynamo's view vs operational cost stated as one trade (L-0332/0335/0336) (§9.1).
- Replication factor counts all copies: owner + next two = 3 (L-0317) (§9.2).
- AOF appends after execution; everysec ≈ 1 s loss (L-0319) (§9.3).
- CDC: what each DB exposes (L-0038), polling misses deletes (L-0036), initial snapshot, at-least-once → upserts (L-0065), log retention (L-0040), outbox (L-0046) (ch2).

## Cut, and why

- The double-booked-seats Q&A (old §4.6: belongs to Lecture 3), Linux 52,000 lists, PGSync, CDC vs SSE, SQS vs Kafka, multiple CDC instances/offset stores, Debezium/PG/MySQL config knobs, Kafka message.max.bytes, Airbyte limits, eviction-policy menu, connection pools, orchestrator glimpse, DHT example list (DNS/IRC/Bitcoin), Kademlia video, Redis-course plugs, admin, "LLD" naming, MySQL-as-cache exercise, TradeoffTables, rule-box sketches, per-chapter recall blocks, SectionEnd lists, class timestamps, the 28-vs-24 bit history, the 2^120 slip.
- War stories kept and told as experience: consulting 60→2 machines (ch2), random eviction "eight months into his career" (ch5), the 2015 netcat/IoT story (ch6), the crash-a-Redis-prototype experiment (ch4 Go deeper), consistent hashing in production (ch8/9).

## Incoming links (other lectures into lec07), for the coordinator

- `site/src/content/lectures/lec05/c4-same-shape.mdx:38` `s4` → `s6-4` (optimistic locking built with compare-and-swap).
- `site/src/content/lectures/lec05/c8-in-memory.mdx:66` `s3` → `s5-5` (Redis-like cache comes back to expiry).
- `site/src/content/lectures/lec05/c9-grow.mdx:68` `s6` → `s8` (hot ranges and consistent hashing; hot partitions are §9.1).
- (Revision 2) lec09 no longer links here; lec10's rewrite links `c7-append.mdx:66` `s9-3` (AOF, correct) and `c10-name.mdx:53` `s8-2` (ring) and `s9-1` (virtual nodes), both correct.
- No `sec`, no change: lec01/c2-campaign.mdx:116, lec04/c8-viral.mdx:72, lec03/c10-instagram.mdx:48, lec06/c8-thirty-messages.mdx (§8.6), lec09/s6, lec09/s11. lec10's text "yesterday's session built a cache…ring…append-only file" still matches.

## Self-check

- `site.sh build lec07`: ok (13 pages). `links lec07`: zero broken. `figures lec07`: ok at 360/390/768/1440, light + dark.
- QA screenshots in `lectures/lec07/story/shots/` (all pages, 1440 and 390): no failures; so-far maps checked at stages 1, 2, 4, 6 desk and phone; fixed a NaN path (wrong roundRect args) and label collisions found there.
- Banned-word grep over built HTML (incl. SVG desc/alt/title): 0 hits.

## Revision 2

Inputs: `review_facts.md` (0 high, 2 medium, 16 low) and `review_reader.md`. Facts win on conflict.

**review_facts, all applied:** F-01 order is per table at the sink (§2.2, text as given). F-02 MongoDB's log is the oplog (CdcReads labels + desc; TwoWays' generic panel label `binlog` → `log`; §2.1 "exposes its oplog through change streams"). F-03 binlog vs WAL vs redo log (§2.1). F-04 the tested `zmalloc`/`zfree` with a size header and NULL check, plus a sentence on why; capped version uses `while … if (!evict_a_key()) return NULL`; ZmallocCap panel `if` → `while` and desc. F-05 `noeviction` default (§4.3). F-06 random saves work, not memory, in Redis (§5.3); §9.4 "Random keeps nothing". F-07 replica preconditions (§2.2). F-08 one CDC → many sinks depends on the tool (§2.3; Tiers caption/desc). F-09 AOF off by default (§9.3). F-10 2^n − 1 (§8.2). F-11 "in our design" + Redis uses atomics (§6.5). F-12 invented reason removed (§5.5; reworded to "it catches every expired key that somebody reads again" because the suggested "in the lecture’s view" trips the banned-word grep). F-13 Airbyte "easier" attributed. F-14 "define your own format and publish it, as Redis did with RESP". F-15 N/(N+1) derived, Wikipedia cited only for "nearly all keys". F-16 `unsigned type : 4;` in StructStage1, StructStage2, ExpiryQueue. F-17 "take away the router" before naming the DHT. F-18 "for a cache, hashing is the usual way" + Lecture 3's ranges. Optional RF sentence added ("two copies of every key, a replication factor of 2"), pause answer now starts "Three."

**review_reader, applied:** L8-1/Fix 1 (overview recap matches lec06 §8.6: two copies, analysts' first, then the cache; overview hook made conditional, H1); L8-2 (Lecture 8's photo-change flow named as the dual write in 1.2, linked to lec06 `s4-3`); L8-3 (Where you are: Lectures 1, 2, 8 only); H2 (ch8 blurb); 1a/1e (day-zero collapsed, circular SQL line fixed, Fig 1·a desc "copy that search reads"); 1c; 1d (clip caption "CDC restarts and catches up", alt and storyboard updated); 1f; 2a/Fix 7 (chapter 2 retitled "The tool stopped and still caught up. How?", opens by answering ch1; sixty machines moved to the top of 2.3 as the answer to "Should every Kafka event become CDC?"); 1b (2.3 "Take a transactional store in MySQL, as in the figure"); 2d; P1/Fix 4 (2.5 ends on the three unanswered questions about the box); P2 (9.3 AOF tied to chapter 2's log); P3; 3a, 3b, 3c (grow-by-doubling cut), 3d (typed values motivated by Lecture 8's set per user), 3e/3f (other 28 bits filled in ch5; padding sentence), 3h; 4a (OOM folded into one Go deeper), 4b, 4c, 4e; 5a (expiry: one number per key + a TTL-key index, Redis keeps expiries in that table; Fig 5·d label and desc), 5b, 5c (stock and song cut), 5d, 5e; 6a/Fix 3 (increment race; CasRace figure, desc and stepper now CAS 10→11, retry 11→12), 6b (netcat to two sentences), 6c, 6d, 6e; 7a, 7b ("runner"/"fee" in prose, clip cue, clip canvas and alt), 7d, 7e; 8b, 8c, 8d, 8e (removal stepper Fig 8·c replaced by two sentences; Fig 8·d renumbered 8·c), 8f (AddSafely step 5 removed from figure and stepper; ch8 deletion line cut; 9.2 reworded); 9a, 9b, 9c, 9d (Dynamo paragraph trimmed, DHT box cut, naming kept), 9e (new can-do bullet); N1 (Lecture 10's terabyte dictionary).

**Rejected or partial:**
- 2b (what the other 20% was): the source gives only "80% of that subsystem's cost"; nothing to name without inventing.
- 4d ("50,000 places" unbelievable): it is the source's own example (L-0125); kept, marked "say,".
- 7c (name forwarding's complications): the source gives none; the verdict stays as stated.
- 8g (writes during the snapshot): not in the source; not added.
- 6c per-second figure: none in the source; only the qualitative consequence added.
- 1d partly: the clip still writes the word "checkpoint" on its canvas; only the caption and alt changed.
- Stock analogy (L-0166) and viral song (L-0171) cut as the reader suggested; Wikipedia and Google News carry LFU/LRU.

**Posters:** regenerated for lec07 (`l07-events-vs-cdc` and `l07-four-routes` text changed; the run rewrites all four).

**Checks:** build ok (13 pages); links zero broken; figures ok at 360/390/768/1440 light+dark; QA screenshots no failures; banned-word grep 0.

**Words (wc2.py):** overview 1,163; ch1 1,074; ch2 1,583; ch3 1,011; ch4 1,153; ch5 1,581; ch6 1,522; ch7 1,150; ch8 1,418; ch9 1,564; total 13,219 (≈ 12.4k without the chapter list and page chrome; was 13,505).

**Incoming links after revision 2:** lec05 `c4-same-shape.mdx:38` `s4` → `s6-4`; `c8-in-memory.mdx:66` `s3` → `s5-5`; `c9-grow.mdx:68` `s6` → `s8`. lec10 `c7-append.mdx:66` `s9-3`, `c10-name.mdx:53` `s8-2` and `s9-1`: correct as is. No-sec links (lec01, lec03, lec04, lec06, lec10 header and c10:132): no change.

## Revision 3

Final round (STORY_REVIEW step 5), small targeted edits only.
- **N1** (§5.5): Redis since 8.2 keeps each expiry time in the key’s own object, as our wrapper does; `db->expires` only lists the keys (earlier versions kept the times in the table). Text as given in `review_facts_final.md`.
- **N2** (§8.1): "Most systems use a function instead" → "A function needs none."
- **O1** (§4.3): `zfree` starts with `if (o == NULL) return;`.
- **CUT-LOSS sentences** from `exam_grade.md`, each checked against its ledger id:
  - Q051 stock analogy (§5.4, L-0166);
  - Q071 vertical-only scaling (§7 intro, L-0221);
  - Q040 maxmemory as a soft limit (§4.3, L-0127);
  - Q063 several protocols over one hash table (§6.2, L-0200).
- **Anchor:** the "Adding cache 5 safely" step-through id `fig-8d` → `fig-8c`, so its step hint reads `#fig-8c/step-3`. Nothing else links to it.
- **Checks:** build ok (13 pages); links zero broken; figures ok at 360/390/768/1440 light and dark; banned-word grep 0; `page_text.md` regenerated. No clip text changed, so posters were not regenerated.
- **Words (wc2.py):** 13,352 total.
