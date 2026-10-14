# Lecture 10 exam - coverage

Total questions: 126 (class 03:06:31, minimum required 93). The window is set by the first timestamp in each question's `source`. No window was skipped: the break (01:53-01:59:52) falls inside window 11, which also has teaching and Q&A from 01:50-01:52.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; dictionary requirements (no DB, portable, weekly changelog, 1 TB / 170,000 words); brainstorm axes; JSON rejected; CSV format; no duplicates; sorting? | 10 |
| 0:10-0:20 | Read-heavy, batched updates; multiple files / zip rejected (portability); Athena-on-S3 motivation | 3 |
| 0:20-0:30 | B+ tree over-engineering; linear scan cost; "slow reads -> indexing"; key+offset index; 26-letter idea; index entry size | 8 |
| 0:30-0:40 | 1.751 MB index fits in RAM; number crunching; lookup flow; two files break portability; separator, fixed 2 MB, stack options | 8 |
| 0:40-0:50 | Header with byte offset; 16 B header fields; magic bytes/version; boot read; MP4 sections; JSON/CSV vs headered formats; encoder/decoder; final file layout | 8 |
| 0:50-1:00 | LB + API servers; copy per server (update, inconsistency, cost); cost principle; network storage; S3 range GET; NAS random read | 6 |
| 1:00-1:10 | HDFS / network HDD; server boot reads from S3; GET flow and 404; pointed reads; update server; append-at-end and hashing rejected | 7 |
| 1:10-1:20 | In-place overwrite corrupts next entry; three hats; tombstone rejected; merge-sort merge; sorted precondition; merge example; streaming merge; 2 TB disk; rollback | 8 |
| 1:20-1:30 | Same-path upload serves garbage (apple 100,1024); new versioned paths; invalidation ping / timed switch rejected; one-file-per-word rejected; prepared transitions page | 7 |
| 1:30-1:40 | meta.json with a static path and polling; why poll; Redis Pub/Sub and its cost; latest flag / per-request checks still polling; reload hint | 6 |
| 1:40-1:50 | S3 versioning = meta file; reload by rolling deployment; eventual consistency; Deploy arrow; step order; prepared procedure; multi-tiered storage; Athena/Hudi/Hive | 9 |
| 1:50-2:00 | Q&A: reload endpoints / push the index; preview of the KV store; break; KV requirements | 3 |
| 2:00-2:10 | Memory/SSD/HDD scale; disk mechanics; immediate persistence; append-only PUT; overwrite as append; delete = PUT(K,-1) | 6 |
| 2:10-2:20 | In-memory key->offset hash table; random read vs random write; hash-table walkthrough; GET and crash rebuild; keys-in-RAM limit; file grows huge; rotation; active vs read-only files | 9 |
| 2:20-2:30 | Merge and compaction; sawtooth; two config parameters; SSD vs HDD gain; read-until-newline; KSZ/VSZ; crash mid-write | 7 |
| 2:30-2:40 | CRC first; record layout; partial writes; index entry with file id; unsorted merge; limitation/strengths; Bitcask embedded; Riak/Uber; append-only = throughput | 9 |
| 2:40-2:50 | Implement Bitcask; Bitcask vs SSTable/memtable; append mode 'a'; deletes in compaction | 4 |
| 2:50-3:00 | Header write atomicity; why 1 TB; S3 cost of pointed reads; MB is a million bytes | 4 |
| 3:00-3:06 | Rolling deployment out of the box; offsets are bytes / index size in header; header rebuilt each merge; sorted -> O(n) merge | 4 |

## By kind

| Kind | Count |
|---|---|
| concept | 32 |
| diagram | 25 |
| qa | 15 |
| tradeoff | 12 |
| recall | 10 |
| misconception | 10 |
| heuristic | 9 |
| number | 7 |
| example | 6 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 61 |
| medium | 58 |
| hard | 7 |
