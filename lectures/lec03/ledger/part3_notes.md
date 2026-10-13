# Lecture 03 ledger, part 3 (01:36:01 - 02:29:30): notes
File: `part3.jsonl`, 138 items (K3-001 .. K3-138), validator: PASS (0 errors, 0 warnings; all verbatims found word for word).

## Topic tree
- id-generation
  - snowflake: 001, 002, 003, 005, 008, 054
    - layout (41 | 10 | 12, 64 bits): 006, 007, 009, 011, 014, 015, 068
    - ordering (roughly sortable, before/after a time): 010, 024, 025, 026, 027, 113
    - architecture (library in Twitter's API servers): 012, 013
    - generation (bit manipulation, << 23): 016, 020, 021
    - capacity (4096 IDs/ms/machine, 1024 machines): 017, 018, 019
    - benefits (no moving part, no network call): 022, 023, 055, 061
    - custom-epoch (Discord 2015, range gain): 050, 051, 052, 053, 069, 071, 072
    - machine-id (ZooKeeper assignment): 114
  - epoch (current epoch number): 070
  - instagram: 073, 074, 075, 105, 106, 107, 110, 111, 112
    - requirements: 076, 077, 078
    - layout (41 since 2011 | 13 shard | 10 seq): 080, 081, 082, 083, 095
    - sharding: 085
    - stored-procedure (next_id, nextval mod 1024, shifts): 096, 097, 098, 099, 101, 102, 103, 104
  - monotonicity (Snowflake not strict; banks -> auto-increment): 116, 117, 136, 137, 138
  - flickr > gossip (Q&A): 123, 124, 125
  - amazon > batching (queue of ID ranges, Q&A): 126, 127
  - (implement everything yourself): 115
- pagination: 034
  - twitter: 028
  - limit-offset: 029, 030, 031, 032, 035, 036
  - id-based: 037, 038, 039, 040, 041, 044, 046, 047, 048, 049, 134
    - storage-engines (NoSQL, data locality): 063, 064
  - benchmark (teacher's 2016 MongoDB benchmark): 033, 042, 043, 062, 129
  - elasticsearch (10,000 limit, cursor API): 066, 067
- databases
  - internals: 065
  - sharding > logical-vs-physical: 086, 087, 088, 089, 090
  - sharding > rebalancing (dump/load): 091, 093, 094
  - sequences (sequencer, nextval, persistence): 100, 108, 109, 118, 119, 120, 121, 122, 130, 131
- engineering-mindset: 057, 058, 060, 128
  - microservices: 056, 059, 079
- admin
  - references (Numberphile, YouTube videos): 004, 045, 084
  - course-structure (week 5 sharding/CDC, next week social networks/CDNs, senior perspective): 092, 132, 133, 135

## Counts by type
| type | n |
|---|---|
| concept | 34 |
| claim | 26 |
| qa_insight | 18 |
| example | 12 |
| process | 10 |
| rule_of_thumb | 10 |
| admin_reference | 7 |
| number | 7 |
| tradeoff | 5 |
| comparison | 4 |
| war_story | 2 |
| definition | 2 |
| analogy | 1 |
| **total** | **138** |

Student proposals: 7 (K3-071 endorsed, medium confidence; K3-108, K3-118, K3-130 proposed_then_corrected, K3-126 endorsed, K3-136 rejected, K3-138 endorsed).

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 01:36:01-01:41:01 | 17 | Snowflake intro, naming, 64 bits, 41/10/12 layout, API-server flow |
| 01:41:01-01:46:01 | 14 | capacity, 3 lines of code, no moving part, roughly sortable, limit-offset |
| 01:46:01-01:51:01 | 12 | batch-job example, 2016 benchmark, why offset is slow, ID-limit steps |
| 01:51:01-01:56:01 | 12 | B+ tree log n + scan, WHERE-clause limitation, custom epoch, Discord, Sony |
| 01:56:01-02:01:01 | 12 | microservices opinion, Q&A: Prometheus, NoSQL/data locality, Elasticsearch |
| 02:01:01-02:06:01 | 19 | Q&A counter/custom epoch; Instagram requirements and 41/13/10 layout |
| 02:06:01-02:11:01 | 13 | logical vs physical shards, dump/load rebalancing, next_id default column |
| 02:11:01-02:16:01 | 10 | next_id body (sequence mod 1024, shifts), Q&A sequence not a column |
| 02:16:01-02:21:01 | 13 | API-server limit Twitter vs Instagram, ZooKeeper, monotonicity, sequences |
| 02:21:01-02:26:01 | 11 | gossip/Lamport, queue of ID ranges, atomicity, persistence, next week |
| 02:26:01-02:29:30 | 5 | (3.5 min, mostly Q&A/admin) string IDs, CDC deferred, no monotonicity in distributed setups |

## Doubts / open questions
- K3-019: the teacher equates "more than 4,000 requests per millisecond" to "400,000 requests per second" (kept as said; fact-checker to look at the arithmetic). Also "they can at max have 10 machines" - flagged, probably 2^10.
- K3-016: machine-ID range heard as "0 to 1, 0 to 1, pick one" - flagged; board shows no range.
- K3-013: "It's not a library. It's not a service. It's a library" - self-correction kept; board S67 says "runs in app servers as a native function".
- K3-085 vs K3-095: the teacher says Instagram uses Postgres, then talks about MySQL servers for the physical layer; both kept as said, detail notes the inconsistency.
- K3-064: DynamoDB / sequential-scanning sentence is garbled ("this would that the DynamoDB also") - confidence medium. Board S70 has "also used by sharded DB like DDB", which may support it.
- K3-071: student's "essentially subtracting the start time" - no explicit verdict, speaker boundary unclear ("Got it?"); marked endorsed with medium confidence and flags.
- K3-072: "35 years ... if you start today, 45 years" - numbers as heard; `[?bits]` flag.
- K3-136: teacher answers "You're not guaranteeing atomicity" where monotonicity seems meant; speaker boundary of "not guarantee monotonicity are you?" unclear.
- K3-134: teacher opens with "No, it's not comparable" then says strings are compared lexicographically - flagged.
- K3-123/124/125 and K3-126/127 refer back to Flickr gossip and Amazon batching from part 2 (cross-part depends_on left to the editor).
- Board (S67-S90) adds content not spoken word for word: "tie breaker on the right", Sonyflake / Go implementation, "No extra load on DB", "since_id" pagination, the epoch value 1314220021721 - the editor's board merge should handle these.
