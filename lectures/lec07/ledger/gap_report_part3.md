## Part 3 (02:08:02-03:11:03)

Audited `part3.jsonl` (123 items, K3-001..K3-123) against every transcript sentence of 02:08:02-03:11:03, with
`part1.jsonl` / `part2.jsonl` used for cross-part duplicates. "Covered" = part-3 items whose first audio range
starts in the window. Every substantive sentence of each window was matched to an item.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:08:02-02:13:02 | 14 (K3-001..014) | 0 | - |
| 02:13:02-02:18:02 | 12 (K3-015..026) | 0 | - |
| 02:18:02-02:23:02 | 13 (K3-027..039) | 0 | - |
| 02:23:02-02:28:02 | 14 (K3-040..053) | 0 | - |
| 02:28:02-02:33:02 | 13 (K3-054..066) | 0 | - |
| 02:33:02-02:38:02 | 7 (K3-067..073) | 0 | - |
| 02:38:02-02:43:02 | 7 (K3-074..080) | 1 | G3-001 |
| 02:43:02-02:48:02 | 10 (K3-081..090) | 0 | - |
| 02:48:02-02:53:02 | 7 (K3-091..097) | 0 | - |
| 02:53:02-02:58:02 | 8 (K3-098..105) | 0 | - |
| 02:58:02-03:03:02 | 7 (K3-106..112) | 0 | - |
| 03:03:02-03:08:02 | 9 (K3-113..121) | 1 | G3-002 |
| 03:08:02-03:11:03 | 2 (K3-122..123) | 0 | - |

Part 3 is dense and faithful. The lower counts in 02:33-02:43 and 02:48-03:03 come from dialogue-heavy Q&A
(virtual nodes, malloc debate, lock walkthrough), where each item spans several turns; re-read sentence by sentence,
nothing technical is missing there. The two misses are small: a CDC deployment remark buried in a student turn
(G3-001) and a course-structure answer (G3-002). Deliberately not itemised (pure admin / personal): Gaurav's
"not related to today's topic" hand-off (02:38:57-02:39:19), the teacher's B-Tech Unix-book recollection
(02:56:32), "Shreya is gone" (02:57:12), the enrolment-response anecdote (03:08:48-03:09:17), "you can book it
till June" (03:07:14; covered in spirit by K3-123).

- **G3-001** (02:41:42): "Active standby both works" - multiple CDC instances can run active-standby or all
  active. K3-079 only carries this sentence as a flag, not as content. Speaker unclear, confidence low.
- **G3-002** (03:07:46-03:08:46): the beginner course treats Kafka/message queues from a usage angle and does not
  repeat implementation deep dives like today's two hours on the distributed cache; K3-121/K3-122 give audience
  and mutual exclusivity but not this content difference.

Verbatims: 123/123 found word for word (validator `part`: PASS, errors 0, warnings 0). No spliced quotes found on
manual check.

### Distortions

- **K3-016**: statement says the implementation "is different" from the ring. The teacher only pointed to the
  blog for the implementation. Transcript: "everyone just draw this ring and that's the simplest way to do it. But
  implementation, read that part." Fix: "...that is the simplest visual representation; for the implementation,
  read the blog."
- **K3-014**: "it takes very little space" strengthens the teacher's wording. Transcript: "It's a simple array with
  binary search, that is it. It does not take a huge amount of space." Fix: "it does not take a huge amount of
  space". Minor.
- **K3-077**: statement says the crash happened "repeatedly at the same point", which is said only at 02:46:31,
  outside the item's source (02:40:21-02:41:42). Transcript: "it failed multiple times, repetitively at the same
  point and my program crashed". Fix: add `02:46:31-02:47:07` to `source.audio` (or drop the phrase; it is also in
  K3-087).
- **K3-103**: "SIGABRT cannot really be handled" drops Student 2's hedge. Transcript: "No, no. [?abort | asr:
  \"About\"] is not something that you can. I mean, there are ways you can handle." Fix: "SIGABRT is mostly not
  something you can handle (there are some ways): it signals that the instruction pipeline is done; you can still
  execute some last code, but the process is killed."
- **K3-110**: "the teacher used it in 2015" rests on a garbled phrase and carries no flag. Transcript: "It has
  lock, lock viewer or I forgot the name. Use it 2015. I don't recall". Fix: add flag `check: "Use it 2015"
  (probably "used it in 2015")`, confidence medium.
- **K3-111**: drops the hedge on deadlock data. Transcript: "In most cases, when you see this deadlock file, I
  think that data is very hard to figure out what's happening behind us." Fix: "in most cases the deadlock file's
  data is, he thinks, very hard to interpret".
- **K3-117**: speaker `student (question)`, but the insight (one CDC can fan out to several sinks; separate CDCs
  were drawn only for visual clarity) is the teacher's answer. Transcript: "It does that. I drew it separately so
  that it's very visual." Fix: speaker `teacher` (keep Student 7's question in `detail`).

Nuance missing (not a distortion, for the editor): K3-122 omits the teacher's reason database types overlap in
both courses: "because you folks also need to know when not to use a particular database". Add it to `detail`.

### Duplicates (within part 3)

- K3-038 / K3-094: both give the add-cache-5 procedure (snapshot cache 1, create cache 5, add to ring, delete moved
  keys). K3-038 is the lecture version with the "cache five" ASR flag and the cache-miss motivation (K3-037);
  K3-094 is the Q&A version that settles that the data is deleted on cache 1 and adds why (cache 1 is no longer the
  first owner). Merge into K3-038, take K3-094's wording, which resolves the flag. K3-070 restates the same procedure
  in the virtual-nodes answer. Cross-link it, don't merge it: its point is "simple because one source".
- K3-029 / K3-039: both say minimal data transfer is the one benefit of consistent hashing. K3-039 adds "a lot of
  people use it for that", "no magic sauce", "simple and beautiful in hindsight". Merge, keep both phrasings.
- K3-080 / K3-081: both say CDC instances keep their read position in a small database of their own. K3-080 adds
  remote locks / contention; K3-081 adds parallel reading of multiple tables and the "last point read, committed"
  checkpoint. Merge, keep both.
- K3-072 / K3-096: both say not to use virtual nodes for stateful applications. K3-072 adds "not for the hot
  partition problem; companies still do it, there are hacks"; K3-096 adds the "think operationally: how many places
  would you copy from" prompt and the homework. Partial: merge or cross-link.
- K3-071 / K3-073: both say virtual nodes force copying from many places. K3-071 adds "might miss something, one
  slow node slows everything"; K3-073 adds "which is what consistent hashing was meant to reduce". Partial.
- K3-075 / K3-087: both say malloc returns NULL when it cannot allocate. K3-075 is Student 3's claim with the C++
  bad_alloc and the check-for-NULL practice; K3-087 is the teacher's later concession plus his repeated crash.
  Cross-link (different speakers), or merge keeping both.
- K3-078 / K3-089: both give the teacher's claim that the crash comes when used pages exceed physical memory, not
  from malloc. K3-089 adds the logical vs physical page framing and Student 3's base-address remark. Merge, keep
  both.
- K3-102 / K3-103: both say the program does crash with SIGABRT when limits are exceeded. K3-102 adds "the kernel
  kills the process to save itself"; K3-103 adds that it cannot really be handled and that the teacher will refine
  the material. Partial.
- K3-010 / K3-022: both say consistent hashing "is not a service". K3-022's core is "it replaces the routing
  table". Keep both; drop the repeated clause from K3-022 only if merged.
- K3-014 / K3-021: both say the implementation is a simple array. K3-014 adds binary search and small space;
  K3-021 adds "four elements for four nodes, no linked list". Merge, keep both.
- K3-045 / K3-046: both tie DHTs to minimal data transfer on node up/down. K3-045 adds the reason consistent-hashing
  techniques are used; K3-046 is the categorisation rule. Partial.
- K3-061 / K3-064: both cover the redirect to the master on a write to a replica. K3-061 is Redis-specific ("only
  for replicas"); K3-064 generalises to almost all databases. Cross-link.
- K3-057 / K3-004: the recap restates hash vs range based routing as the two common ways to assign ownership.
  K3-057 adds "two very common ways". Partial (recap).

### Duplicates across parts (involving part 3)

- K2-127 / K3-061: Redis returns the master's IP when a write hits a replica. K2-127 adds "replicas don't take
  writes"; K3-061 adds "it does this only for replicas, not every time". Merge, keep both.
- K2-121 / K2-123 / K3-058: four routing ways apply to any distributed system; pick your battles. K3-058 is the recap
  wording ("not everyone will suit everywhere"); K2-123 has the concrete trade-offs. Merge K3-058 into K2-123.
- K2-112 / K3-063: routing approaches can be mixed. K2-112 says different systems do it differently; K3-063 says
  one system can mix two or more for different operations. Partial: cross-link.
- K2-111 / K3-004: range ownership A-J -> C1, K-T -> C2, U-Z -> C3. K3-004 contrasts it with hash-based ownership and
  carries the "A to T" slip. Cross-link. Do not merge: K3-004's point is the contrast.
- K2-130 / K3-025 (and K3-026): K2-130 asks how to add a fourth node; K3-025/026 answer it via consistent hashing
  (the example scales four -> five). Cross-link with depends_on.
- K2-129 / K3-011 / K3-072: K2-129 says hot partitions are solved next week with S3; K3-011 says next week shows
  where consistent hashing sucks; K3-072 says virtual nodes are not the fix for hot partitions. Probably the same
  forward reference. Cross-link; the editor could merge K3-011 into K2-129 if the board confirms.
- K2-119 / K2-124 / K3-044 / K3-047 / K3-048: IPFS and BitTorrent route by forwarding (part 2), and are DHTs that
  converge by forwarding/redirect (part 3). Part 3 adds the DHT framing, DNS, IRC and ipfs.io. Cross-link, don't
  merge.
- K1-026 / K3-085 / K3-086: not everything has an event (K1-026: count++ on views; K3-085: async workers
  periodically aggregating likes). K3-086 also repeats K1-031/K1-041 (read the source of truth). K3-085's example is
  new: keep it. Merge K3-086 into K1-031 or cross-link.
- K1-027 / K3-083: a blog-published event may carry only the blog ID, so the consumer must fetch from the DB.
  K3-083 adds the alternative (whole object: huge message, large network IO) and the DB-load cost. Merge into K3-083
  keeping K1-027's "complex logic" nuance.
- K1-051 / K1-068 / K3-084: CDC bulk-reads and bulk-writes versus one event per blog. K3-084 adds "the data volume
  is the same; batching is the gain". Merge, keep both.
- K1-060 / K1-070 / K3-079: run CDC from a replica. K1-060 adds "cuts load on master"; K3-079 adds "all replicas have
  the same data, so read from just one". Merge, keep both.
- K1-035 / K1-057 / K1-067 / K3-080 / K3-081: CDC tracks how far it has read (checkpointing). Part 3 adds the
  multi-instance angle (a small database plus remote locks). Cross-link. Don't merge: part 3 is about scaling.
- K1-042 / K1-048 / K3-117: CDC sinks (Elasticsearch, Redshift, etc.). K3-117 adds one CDC fanning out to several
  sinks; K3-118 adds the memory cost. Cross-link.
- K2-034 / K3-093: the stock-market analogy for LFU (hold a stock that did well despite a recent dip). K2-034 is the
  full version (human behaviour, not a use case); K3-093 adds "the analogy I always go with" and the recency-bias
  wording. Merge into K2-034.
- K2-035 / K3-092: LFU keeps keys that were popular in the past even if not recently accessed. K3-092 adds Student
  5's asymmetric-popularity framing (LFU for asymmetric, LRU otherwise), endorsed with the refinement. Merge or
  cross-link, keep the student framing.
- K1-107 / K1-109 / K3-075 / K3-078 / K3-089 / K3-101 / K3-102: part 1 says going beyond the heap causes a segfault.
  Part 3 refines it: malloc returns NULL (Student 3), crashes come when used physical pages run out (teacher), and
  ulimits / malloc-library limits produce SIGABRT and a kernel kill (Student 2). The teacher says he will refine
  the material. This is a correction chain, not a duplicate. The editor should cross-link with depends_on so the
  page does not present K1-107 unqualified.
- K2-097 / K2-103 / K3-099 / K3-100: single-threadedness avoids concurrency problems. K3-099/100 add context-switch
  savings, CPU under-utilisation and multiple Redis nodes per machine. Partial: cross-link.
- K1-090 / K3-091: the cache's single-node storage is a hash table; K3-091 adds the grow-by-doubling (reallocate and
  copy) behaviour. Cross-link only.
