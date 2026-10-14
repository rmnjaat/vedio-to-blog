## Part 2 (00:58:02-02:08:02)

Summary: **missed 3** (G2-001..G2-003, all asides - no core concept was missing), **distortions 12** (mostly
small: an inferred word, a dropped hedge/reason, board-only content without a board source, missing speaker
flags), **duplicate groups 37** (16 within part 2, 21 across parts; most are cross-links, not blind merges). Part 2 is a dense, faithful extraction
(130 items); the analyst already flagged most ASR/speaker doubts.

### Windows

"Covered" = part 2 items whose audio ranges start in the window (recap items such as K2-023/K2-068 are counted
again in the 01:28-01:33 recap window). Every transcript sentence of every window was read against the items.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:58:02-01:03:02 | 13 (K2-001..K2-013) | 0 | - |
| 01:03:02-01:08:02 | 12 (K2-014..K2-025) | 0 | - |
| 01:08:02-01:13:02 | 9 (K2-026..K2-034) | 0 | - |
| 01:13:02-01:18:02 | 11 (K2-034..K2-044) | 0 | - |
| 01:18:02-01:23:02 | 9 (K2-045..K2-053) | 0 | - |
| 01:23:02-01:28:02 | 9 (K2-053..K2-061) | 0 | - |
| 01:28:02-01:33:02 | 17 (K2-061..K2-076, + recap re-sources) | 2 | G2-001, G2-002 |
| 01:33:02-01:38:02 | 10 (K2-077..K2-086) | 0 | - |
| 01:38:02-01:43:02 | 9 (K2-087..K2-095) | 0 | - |
| 01:43:02-01:48:02 | 8 (K2-096..K2-103) | 0 | - |
| 01:48:02-01:53:02 | 3 (K2-104..K2-106) | 0 | - (break from ~01:50:43; break logistics are pure admin) |
| 01:53:02-01:58:02 | 5 (K2-107..K2-111) | 0 | - (break until 01:54:56; mic check is pure admin) |
| 01:58:02-02:03:02 | 9 (K2-111..K2-119) | 1 | G2-003 |
| 02:03:02-02:08:02 | 11 (K2-120..K2-130) | 0 | - |

Deliberately not itemised (pure admin / no knowledge): Student 3's deferred question (00:58:16), "class will
extend by at least 15 minutes" (01:23:24), "Oh, I'm so happy today" (01:30:17), "We'll skip this. Don't need
this." (01:43:38), hand-lowering requests (02:02:09), break and mic logistics (01:50:12-01:55:18).

Verbatims: 130/130 found word for word (`validate_ledger.py part ... --prefix K2 --range 00:58:02-02:08:02`:
`PASS part part2.jsonl (130 items) | errors 0 | warnings 0`). No misses. G2 verbatims: 3/3 (gaps validator PASS).

### Distortions

- **K2-048**: implies the teacher rejected "payload size" as HTTP's disadvantage. He actually echoed it first and
  only corrected the student's *reason* (the value being large); later he shows the real payload problem is HTTP's
  request-line/header jargon (K2-063). Transcript: "Payload size is huge. Why? Why is payload size huge?" ...
  "That is true for anything that you use, right? The value that you have to transfer it". Fix: `detail` = "The
  teacher first echoes 'Payload size is huge. Why?', then corrects only the reason: transferring the value is true
  for any protocol. The overhead he later demonstrates is HTTP's request line and headers (see K2-063)."; editor
  cross-links K2-048 -> K2-063.
- **K2-057**: "followed by header lines such as User-Agent" - the audio only spells "u s e r"; "User-Agent" comes
  from the board (blog page, highlighted 01:25:45). Transcript: "h t t p slash 1.1 slash r [?slash n | asr: "slash
  l"] u s e r. This is exactly how it is sent." Fix: add `source.board: ["01:25:45"]`, and in `detail` say "audio
  spells 'u s e r'; the board shows `User-Agent: ...`, `Host`, `Accept-Language` ...".
- **K2-093**: the notation "CAS(a, 20, 10)" is board-only (written live at 01:43:30); audio only says "I want to
  change a to 20 when my current value is 10". Fix: add `source.board: ["01:43:30"]` (board text `CAS ( a, 20, 10 )`
  / `CAS ( a, 30, 10 )`).
- **K2-101**: "it cannot be done cheaply" - "cheaply" is inferred. Transcript: "You cannot do that. That's what I
  covered there. Right. ... It's very deep implementation. Right. So that's why go with random." Fix: statement =
  "Asked how to design LRU/LFU at a high level under memory constraints, the teacher answers 'You cannot do that' -
  it is a very deep implementation - so go with random eviction, which is very low on memory, needs no additional
  data and only risks deleting an important key."
- **K2-102**: (a) the O(1)-time LFU / high-memory point is Student 2's, which the teacher confirms ("Exactly") -
  the item reads as the teacher's own claim; (b) "that is why people don't use it" rests on an ambiguous sentence.
  Transcript: "implementing Big O of one, with, I mean, time complexity of LFU. Yeah. A very high memory
  consumption." / "Exactly. But then you see that thing, right? When you want better time, you're giving up on
  space." / "Right. But it's not that, which is why people don't use it." Fix: `detail` += "Raised by Student 2 (a
  resource the teacher shared: O(1) LFU with very high memory); the teacher confirms 'Exactly' and states the
  time/space trade-off."; add flag `check: "But it's not that, which is why people don't use it" - ambiguous`;
  keep confidence medium.
- **K2-083**: drops the teacher's reason why lazy deletion catches most keys. Transcript: "most of the keys in cache,
  that's how the cache works. You are very likely to access the key." Fix: `detail` = "Because keys in a cache are
  very likely to be accessed, most expired keys get caught on access."
- **K2-107**: drops "the data": the teacher says one node is not enough for the data *or* the load. Transcript:
  "storage is pretty much sorted at one node is not enough to handle the data or the load." Fix: statement "...when
  one node cannot handle the load (or hold the data)", add source `01:55:50-01:56:52`.
- **K2-117**: drops the hedge on the smart-client disadvantage. Transcript: "all of your clients needs to be
  notified about it. That's okay. But that is the disadvantage of that." Fix: `detail` = "The teacher calls the
  notification burden okay, but still the disadvantage."
- **K2-123**: the "pick by need" list omits the fourth (DNS-like redirect) option the teacher gives in the same
  passage. Transcript: "Make it like a DNS, you send this, it sends you where to forward it to. And then you go to
  that particular node directly on your own. Pick your favorite, whatever works, works for you." Fix: append to
  statement "; or make it like DNS - the node tells you where to go and you connect directly".
- **K2-007**: flag covers 24 vs 28 but not the other hedges. Transcript: "Again, you store four bits or something
  like that." and "So this becomes one integer. This becomes two integers." Fix: extend flag to `check: "four bits
  or something like that", "24 bits" then "28 bits", and "This becomes two integers" - sizing said loosely`; keep
  confidence medium.
- **K2-046**: the follow-up "Why?" is marked `Teacher?` in the transcript; no speaker flag on the item. Transcript:
  "**[01:19:37] Teacher?:** Why?". Fix: add flag `check: speaker of "Why?" (Teacher?)`.
- **K2-105**: rests partly on a `Teacher?` turn. Transcript: "**[01:48:35] Teacher?:** Value of node." Fix: add flag
  `check: speaker of "Value of node." (Teacher?)`; confidence stays high (the teacher's next turn carries the point).

### Duplicates (within part 2)

- K2-005 / K2-012: both pose the priority queue for eviction. K2-005 = student's proposal and the teacher's
  deferral; K2-012 = the teacher's explicit question "is priority queue the best way?". Cross-link, don't merge.
- K2-006 / K2-072: per-key wrapper object with type + LRU bits. K2-006 = the design decision (store eviction info in
  the existing object); K2-072 = recap that values in the hash table are such wrappers. Merge K2-072 into K2-006 as
  recap source.
- K2-022 / K2-043 / K2-100: Redis LRU/LFU too deep to cover. K2-022 adds "three years"; K2-043 adds "supports all
  three, superb algorithm using LRU bits"; K2-100 adds "28 LRU bits, ~two hours, in the Redis internals course".
  Merge K2-022 into K2-043; keep K2-100 as the Q&A item (or merge with its numbers kept).
- K2-023 / K2-076 (random part): zero memory overhead. K2-023 already carries the recap source; K2-076 adds
  "trades off correctness ... might delete the most important key" and the overall-benefit hedge "if that works
  well, the overall benefit might be significant".
- K2-024 / K2-027: random may evict an important key. K2-024 adds "it becomes a cache miss and is put back";
  K2-027 adds "odds are low with millions of keys". Keep both or merge with both nuances.
- K2-025 / K2-101: random needs no extra data so more keys fit. K2-101 is the Q&A restatement; adds "go with random"
  as the answer for memory-constrained LRU/LFU.
- K2-044 / K2-098: both point to the teacher's Redis course. K2-044 = 9+ hours, Golang implementation; K2-098 =
  free YouTube video on single threadedness. Partial; may merge into one resources item keeping both.
- K2-050 / K2-074: three options over TCP (HTTP, gRPC, custom). K2-050 = "all just TCP, differ only in format";
  K2-074 = per-option properties (stateless 1.1, stateful HTTP/2 + Protobuf). Merge keeping both.
- K2-051 / K2-052 / K2-070: HTTP/1.1 reconnect cost. K2-051 = mechanism (handshake/teardown per request);
  K2-052 = "very unperformant"; K2-070 = recommendation (keep connection open). K2-052 can merge into K2-051.
- K2-068 / K2-074: gRPC on HTTP/2, keeps connection open, compressed. K2-074 adds Protobuf + "stateful HTTP";
  K2-068 adds "best of all worlds". Merge into K2-068.
- K2-046 / K2-073: TCP. K2-046 = student's answer; K2-073 = the reason (statefulness, guaranteed delivery, acks; UDP
  fire-and-forget). Cross-link.
- K2-077 / K2-086: bare-minimum bytes in an in-memory cache. K2-077 = TTL must not cost much memory; K2-086 = Redis's
  lazy+sampling choice, "every single bit matters". Cross-link.
- K2-080 / K2-086: no priority queue for TTL. K2-080 = pointers cost; K2-086 = Redis has no such implementation.
  Merge K2-080 into K2-086 or cross-link.
- K2-097 / K2-103: single threadedness. K2-097 = the idea (no threads, Redis did it); K2-103 = Q&A "not blocked".
  Cross-link.
- K2-114 / K2-121: the four routing ways. K2-114 = bank analogy intro, "a fifth is welcome"; K2-121 = everyday
  practices translate as-is to distributed systems. Merge with both.
- K2-115 / K2-122 / K2-125 (proxy part): K2-115 = peon analogy; K2-122 = load balancer as single entry point;
  K2-125 = proxy works for a cache. Keep separate, cross-link.

### Duplicates across parts (involving part 2)

- K2-001 / K1-132: eviction is triggered when total size + B exceeds the cap. K1-132 = where in zmalloc; K2-001 =
  transition to strategies. Cross-link.
- K2-006 / K2-009 / K1-102: value wrapped in an object so meta information can be attached. K1-102 = Redis struct,
  extensible, "extra fields come up later"; K2-009 = that payoff (eviction bits). Cross-link K2-009 -> K1-102.
- K2-007 / K1-100: 4 type bits. K1-100 = why Redis caps type at 4 bits; K2-007 = 4 + 28 LRU bits = 32 bits. Keep
  both; K2-007 depends_on K1-100.
- K2-077 / K1-101: be cautious about every byte in memory. K1-101 = RAM is costly; K2-077 = applied to TTL. Cross-link.
- K2-076 (zmalloc part) / K1-125 / K1-126: recap "cache-full detection = zmalloc wrapping malloc + total size".
  K2-076 adds nothing new on zmalloc; drop that clause on merge, keep K1 items.
- K2-082 / K1-119 / K1-125: zfree is the counterpart of zmalloc (total size -= ...). K2-082 is the only place zfree is
  named; K1-119 = free semantics. Keep K2-082, depends_on K1-125.
- K2-105 / K1-123: everything (wrapper, bloom filter, set) allocated via zmalloc. K1-123 = the rule; K2-105 = the Q&A
  objection ("malloc only gets the struct size") and its answer. Merge K2-105 into K1-123 or cross-link.
- K2-072 / K1-090 / K1-097: single-node storage = hash table of MyValue wrappers. K2-072 is recap only. Merge into
  K1-097.
- K2-034 / K3-093: stock-market analogy for LFU. K2-034 = full story (bought, rose, fell; hold vs sell; not a use
  case but human behaviour); K3-093 adds "you hope it grows further" and frames it explicitly as LFU vs LRU. Merge
  into K2-034 keeping K3-093's wording in merged_verbatims.
- K2-033 / K2-035 / K3-092: when to use LFU. K2-033 = scan-resistance (student); K2-035 = keep keys whose access
  dipped; K3-092 adds "key popularity very asymmetric (some keys used by everyone) -> LFU, else LRU". Keep separate,
  cross-link; K3-092's asymmetry criterion is new nuance.
- K2-097 / K2-103 / K3-097..K3-100: single threadedness. Part 3 adds the costs (31 of 32 cores idle, run multiple
  shards per machine, saves context switches, simplifies malloc). Cross-link, don't merge.
- K2-127 / K3-061 / K3-064: Redis returns the master's IP when a write hits a replica. K2-127 = example of routing way
  4; K3-061 = "only for replicas"; K3-064 = "most common, almost all databases". Merge into K2-127 keeping both
  qualifiers.
- K2-120 / K3-060: DNS-like redirect routing. K3-060 adds why Redis uses it (no load balancer in front, simple
  infra). Cross-link.
- K2-123 / K3-058 / K3-063: no one right routing way, pick your battles. K3-058 = recap; K3-063 adds "real systems
  can mix approaches". Merge K3-058 into K2-123; keep K3-063.
- K2-119 / K3-047 / K3-048 (and G2-003 / K3-049): IPFS/BitTorrent. K2-119 = example of forwarding routing; K3-047/048
  = DHT examples, ipfs.io; K3-049 / G2-003 = the teacher's BitTorrent/Kademlia series. Cross-link.
- K2-124 / K3-041 / K3-044: the internet forwards requests machine to machine. K3-041 = internet is a DHT; K3-044 =
  nearest server forwards or redirects. Cross-link.
- K2-109 / K2-111 / K3-004 / K3-057: range ownership A-J / K-T / U-Z. K3-004 contrasts range vs hash routing; K3-057
  is the recap. Cross-link (K3-004 depends_on K2-109).
- K2-130 / K3-007: adding a node. K2-130 = the question; K3-007 = what happens under mod-N hashing. Cross-link.
- K2-104 / K1-085: consistent hashing is in the high-level part after the break. Merge (agenda).
- K2-044 / K2-098 / K2-100 / K1-004: the teacher's Redis internals course. K1-004 = the cache discussion is built on
  it; part 2 items add hours, Golang, free videos. Merge into one resources item or cross-link.
- K2-129 / K3-011 / K3-067: next-week forward references. K2-129 = hot partitions solved when designing S3; K3-011 =
  where consistent hashing sucks; K3-067 = hot partitions in consistent hashing. Different claims; cross-link only.
