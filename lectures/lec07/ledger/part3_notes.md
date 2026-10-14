# Lecture 07 ledger, part 3 (02:08:02 - 03:11:03): notes

File: `part3.jsonl`, 123 items (K3-001 .. K3-123), validator: PASS (errors 0, warnings 0).

Arc: hash based routing and its data-movement pain (02:08-02:12) -> what consistent hashing is and is not
(ownership only) -> ring, lookup, adding/removing a node, operational snapshot-based data transfer (02:12-02:23)
-> distributed hash tables and Kademlia (02:23-02:27) -> high availability via replicas / replication factor on the
ring, Redis AOF (02:27-02:29) -> recap -> long Q&A: Redis routing, ring limitations and hot partitions, virtual
nodes (teacher: bad idea for stateful systems), malloc/segfault debate with two students (SIGABRT, ulimits),
CDC scaling and CDC vs event-based sync, growing a set, LRU vs LFU, single-threaded cache utilisation, shared ->
exclusive lock elevation, deadlocks, connection pooling, CDC fan-out -> wrap-up and course admin (03:05-03:11).

## Topic tree

- distributed-cache
  - routing
    - ownership: K3-003
    - hash-based: K3-002, K3-004, K3-005, K3-006
      - data-movement: K3-007, K3-008, K3-009
    - redis: K3-060, K3-061, K3-062, K3-064, K3-065
    - four-ways: K3-058, K3-063
  - consistent-hashing: K3-001, K3-010, K3-012, K3-013, K3-022, K3-029, K3-035, K3-036, K3-039
    - implementation: K3-014, K3-020, K3-021
    - ring: K3-016, K3-017, K3-018, K3-019
    - lookup: K3-023, K3-024
    - adding-node: K3-025, K3-026, K3-027, K3-028
      - operations: K3-037, K3-038, K3-094, K3-095
    - removing-node: K3-030, K3-031, K3-032, K3-033, K3-034
    - limitations: K3-066, K3-067, K3-068
    - virtual-nodes: K3-069, K3-070, K3-071, K3-072, K3-073, K3-074, K3-096
  - availability: K3-054
    - replication: K3-051, K3-052, K3-053
  - durability > redis-aof: K3-055, K3-056
  - recap: K3-057
  - memory > malloc: K3-075, K3-076, K3-077, K3-078, K3-087, K3-088, K3-089, K3-090, K3-101, K3-102, K3-103
  - storage > data-structures: K3-091
  - concurrency > single-threaded: K3-097, K3-098, K3-099, K3-100
- distributed-hash-table: K3-040, K3-042, K3-043, K3-045, K3-046
  - examples: K3-041, K3-047, K3-048
  - routing: K3-044
    - kademlia: K3-050
- etl-cdc
  - event-based-sync: K3-082, K3-083
  - cdc: K3-084, K3-085, K3-086
    - scaling: K3-079, K3-080, K3-081
    - fan-out: K3-117, K3-118
- eviction > lru-vs-lfu: K3-092, K3-093
- concurrency
  - locking > shared-exclusive: K3-104, K3-105, K3-108, K3-109
  - locking > debugging: K3-106, K3-110, K3-111
  - locking > deadlock: K3-112
  - isolation-levels: K3-107
- communication > connection-pooling: K3-113, K3-114, K3-115, K3-116
- admin
  - forward-reference: K3-011
  - references: K3-015, K3-049
  - recap: K3-059
  - agenda: K3-119
  - logistics: K3-120, K3-123
  - course-structure: K3-121, K3-122

## Counts by type

| type | n |
|---|---|
| qa_insight | 28 |
| claim | 24 |
| concept | 22 |
| example | 10 |
| admin_reference | 9 |
| rule_of_thumb | 9 |
| process | 5 |
| comparison | 4 |
| definition | 3 |
| number | 2 |
| misconception | 2 |
| war_story | 2 |
| tradeoff | 2 |
| analogy | 1 |
| **total** | **123** |

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 02:08:02-02:13:02 | 14 (001-014) | hash routing, mod 2 -> mod 3 example, what consistent hashing is not |
| 02:13:02-02:18:02 | 12 (015-026) | ring, node placement, lookup, adding cache 5 |
| 02:18:02-02:23:02 | 13 (027-039) | minimal data transfer, removing a node (graceful/abrupt), snapshot operations |
| 02:23:02-02:28:02 | 14 (040-053) | DHTs, Kademlia, replicas, replication factor |
| 02:28:02-02:33:02 | 13 (054-066) | redundancy, Redis AOF, recap, Q&A Redis routing, nodes too close |
| 02:33:02-02:38:02 | 7 (067-073) | Q&A: hot partitions, virtual nodes (dialogue-heavy, re-read: covered) |
| 02:38:02-02:43:02 | 7 (074-080) | virtual nodes wrap-up, malloc debate, CDC instances (dialogue-heavy, re-read: covered) |
| 02:43:02-02:48:02 | 10 (081-090) | CDC vs event workers, batching, malloc follow-up |
| 02:48:02-02:53:02 | 7 (091-097) | set growth, LRU vs LFU, adding-node Q&A, virtual nodes homework (re-read: covered) |
| 02:53:02-02:58:02 | 8 (098-105) | single-threaded utilisation, ulimits, SIGABRT, shared locks |
| 02:58:02-03:03:02 | 7 (106-112) | lock elevation walkthrough, Percona, deadlocks |
| 03:03:02-03:08:02 | 9 (113-121) | connection pooling, CDC fan-out, wrap-up admin, beginner course |
| 03:08:02-03:11:03 | 2 (122-123) | admin only (course tiers, one-on-one booking); enrolment anecdote skipped as pure admin |

## Doubts / open questions

- K3-038 / K3-094: at 02:21:51-02:23:21 the teacher says "take the snapshot of cache five" and "delete the data from
  cache five" ([?cache five | asr: "cache file"]); the Q&A at 02:50:52 says snapshot of cache 1 and delete on cache 1.
  Item follows the Q&A; board (cache 5 placement drawing) may resolve.
- K3-004: teacher said "A to T are owned by cache 2" for the middle range (likely K to T); kept as said, flagged.
- K3-053: "replication factor of, let's say, 2" yet "two nodes immediately after" hold the data (owner + 2 = 3 copies);
  kept as said; fact-checker territory.
- K3-068: range said as "two raised to power 120" vs 2^128 at 02:14:21; kept as said, detail cross-references.
- K3-075..K3-103 malloc thread: teacher's claim (crash beyond physical pages) vs Student 3 (malloc returns NULL) and
  Student 2 (ulimits / malloc-library limits, SIGABRT, kernel kills the process); teacher accepted both corrections
  and said he will refine the material. Several speaker boundaries flagged (02:46:26, 02:53:31).
- K3-079: "active standby both works" inside Student 3's turn may be the teacher; flagged.
- K3-082: status proposed_then_corrected (Kafka never reads from MySQL); 02:43:40 segment speaker mixed, flagged.
- K3-108: teacher swaps T1/T2 mid-explanation and labels it his guess; confidence medium.
- K3-113: teacher first says pooling is a property of the database, then "not even property of database ... of the
  application logic or the library"; both kept in the statement; possible student interjection at 03:03:58 flagged.
- Board may help: ring diagram positions (cache 1=3, cache 2=12, cache 3=5, cache 4=10, cache 5=1), mod 2/mod 3 key
  table (K3-006/K3-008), CDC fan-out drawing (K3-117).
