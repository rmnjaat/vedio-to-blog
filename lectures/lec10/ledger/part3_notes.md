# Lecture 10 ledger, part 3 (01:59:52 - 03:06:10): notes

File: `part3.jsonl`, 124 items (K3-001 .. K3-124), validator: PASS (0 errors, 0 warnings; all verbatims found word for word).

## Topic tree

- **Admin**
  - Next week (high throughput, S3, SSTable/LSM): K3-092, K3-093, K3-096
  - Resources (Bitcask paper, Kleppmann's book, Hussein Nasser's Postgres posts): K3-088, K3-097, K3-109
- **Storage engines**
  - Problem statement (fast KV store on cheap magnetic disk; put/get/delete with immediate persistence): K3-001, K3-008
  - Hardware: storage hierarchy K3-002; magnetic disk K3-003 to K3-007; SSD comparison K3-052
  - Bitcask
    - Append-only file: K3-010, K3-011, K3-017, K3-023, K3-085; creating one / file system allocation (Q&A): K3-099, K3-100
    - Put: K3-009 (memtable proposal corrected), K3-012, K3-013, K3-014, K3-024
    - Delete: K3-016 (overwrite proposal corrected), K3-018, K3-019, K3-025
    - Get: K3-015 (deferred idea), K3-020 (naive scan corrected), K3-021 (SSTable vs hash table), K3-026
    - In-memory index: K3-022, K3-041, K3-070
    - Crash recovery: K3-027, K3-029
    - Limitations: K3-030, K3-031, K3-073
    - File rotation: K3-032 to K3-040
    - Merge and compaction: K3-042 to K3-045, K3-071, K3-101, K3-102; sawtooth: K3-046 to K3-048, K3-072
    - Configuration (two parameters): K3-049, K3-050
    - Performance / strengths: K3-028, K3-051, K3-074 to K3-078, K3-090
    - Bitcask itself, embedded DB, Uber, Riak: K3-079 to K3-084, K3-087, K3-098
  - Append-only = high throughput: K3-086
  - Bitcask vs SSTable/memtable/LSM (Q&A): K3-094, K3-095
  - Record format: K3-053 to K3-059, K3-066, K3-069, K3-110
    - Integrity / CRC: K3-060 to K3-065, K3-067, K3-068, K3-104 to K3-108
- **Learning approach > implement** (build Bitcask, Prometheus, nitty-gritty): K3-089, K3-091, K3-103
- **Dictionary (first-half case study, Q&A)**: 1 TB sizing K3-111; S3 pointed reads K3-112; offsets K3-118; header/index size K3-119, K3-120; sorted merge K3-121 to K3-123; reload via rolling deployment K3-116, K3-117
- **Storage > S3 tiered storage**: K3-113, K3-114
- **Estimation > sizes** (MBs are not small): K3-115
- **Principles > sorted data**: K3-124

## Counts by type

| type | n |
|---|---|
| concept | 23 |
| claim | 22 |
| qa_insight | 18 |
| process | 14 |
| rule_of_thumb | 13 |
| misconception | 7 |
| admin_reference | 6 |
| definition | 6 |
| example | 5 |
| comparison | 3 |
| tradeoff | 3 |
| war_story | 3 |
| analogy | 1 |
| **total** | **124** |

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 01:59:52-02:04:52 | 11 | intro, magnetic disk, requirements, memtable proposal |
| 02:04:52-02:09:52 | 7 | append-only put/update, delete-by-overwrite proposal (long student turns) |
| 02:09:52-02:14:52 | 11 | delete as put, hash index, get, crash rebuild |
| 02:14:52-02:19:52 | 12 | limitations, multiple files, rotation criteria |
| 02:19:52-02:24:52 | 9 | rotation, merge and compaction, sawtooth, config |
| 02:24:52-02:29:52 | 11 | SSD comparison, record format, crash mid-write |
| 02:29:52-02:34:52 | 10 | CRC, final record, index entry, unsorted merge |
| 02:34:52-02:39:52 | 16 | limits/strengths, Bitcask, Uber/Riak |
| 02:39:52-02:44:52 | 8 | implement Bitcask, next week admin, Bitcask vs SSTable |
| 02:44:52-02:49:52 | 6 | memtable persistence, Kleppmann, append mode 'a', FS allocation |
| 02:49:52-02:54:52 | 9 | merge deletes, header atomicity, integrity, Hussein Nasser |
| 02:54:52-02:59:52 | 5 | Q&A on 1 TB and S3 cost (long student turns, re-shown pages) |
| 02:59:52-03:04:52 | 7 | MBs, rolling deployment, offsets, header, sorting |
| 03:04:52-03:06:10 | 2 | short tail: O(n) merge, sorted data |

## Doubts / open questions

- K3-034 / K3-035: two short teacher lines are labelled `Teacher?` (02:16:57, 02:18:22); speaker uncertain.
- K3-036: the teacher's acceptance of the student's "can't build indexes concurrently" point is only implied ("The biggest one of all").
- K3-073 / K3-086 / K3-084: unclear fragments ("he gave me", "see it in IT", "hash paste"); board S76/S77 notes may clarify.
- K3-101: speaker boundary flagged at 02:50:03.
- K3-106: header byte arithmetic is garbled ("eight bytes, four bytes, four bytes, four bytes ... 20 bytes"); board S71/S72 record-format bar (CRC | ts | KSZ | VSZ | K | V) may fix field sizes.
- K3-113: list of next-week designs (Athena, multi-tiered storage, "cost efficient auto solution for Amazon") is garbled.
- K3-114: teacher says "S3 is not cheap" and "it is very cheap" in the same breath (calls/network vs storage, presumably); kept as said.
- K3-118: the confirmation that offsets are bytes, not line numbers, sits inside the student's own turn; no separate teacher answer transcribed.
- K3-090: teacher self-corrects "six years" to "five years"; kept five.
- Cross-part: K3-111 to K3-123 revisit first-half dictionary items (1 TB sizing, S3 pointed reads, header with index size, sorted merge, rolling deployment); the editor should cross-link or merge them with part 1/2 items.
