## Part 3 (01:59:52-03:06:10)

Audited `part3.jsonl` (124 items, K3-001..K3-124) against every transcript sentence of 01:59:52-03:06:10. Cross-part duplicates were checked against `part1.jsonl` (121 items) and `part2.jsonl` (85 items). The part files were not edited.

### Windows

"Covered" = part 3 items whose first audio range starts in the window. Every substantive sentence in each window was traced to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:59:52-02:05 | 11 (K3-001..K3-011) | 0 | - |
| 02:05-02:10 | 7 (K3-012..K3-018) | 0 | - |
| 02:10-02:15 | 11 (K3-019..K3-029) | 0 | - |
| 02:15-02:20 | 12 (K3-030..K3-041) | 0 | - |
| 02:20-02:25 | 11 (K3-042..K3-052) | 1 | G3-003 |
| 02:25-02:30 | 9 (K3-053..K3-061) | 0 | - |
| 02:30-02:35 | 11 (K3-062..K3-072) | 0 | - |
| 02:35-02:40 | 15 (K3-073..K3-087) | 1 | G3-002 |
| 02:40-02:45 | 8 (K3-088..K3-095) | 0 | - |
| 02:45-02:50 | 6 (K3-096..K3-101) | 0 | - |
| 02:50-02:55 | 9 (K3-102..K3-110) | 1 | G3-001 |
| 02:55-03:00 | 5 (K3-111..K3-115) | 0 | - |
| 03:00-03:05 | 7 (K3-116..K3-122) | 0 | - |
| 03:05-03:06:10 | 2 (K3-123..K3-124) | 0 | - |

Notes on the windows:
- The low count at 02:05-02:10 is expected. It is a slow student dialogue about put and delete, and every step of it is covered (K3-012..K3-018).
- The low counts at 02:45-02:50 and 02:55-03:00 are expected too. Those windows are long Q&A answers (file creation, the 1 TB dictionary, S3 cost), and each answer is covered by one or two dense items.
- Nothing substantive was skipped. Left out on purpose:
  - pure admin: 02:41:59 recording upload, 02:42:51 "any questions on Bitcask", 03:01:27, 03:06:09 close;
  - pleasantries: 02:56:42, 03:05:47 "Thanks for asking";
  - garbled fragments with no teachable content: 02:11:12 "You make.", 02:41:18 "Just keep it in your case";
  - the student's "that's how this whole WAL thing goes" (02:52:54) - no content beyond K3-105.
- Missed items:
  - G3-001 (02:53:43-02:54:24, aside): systems that ignore integrity only *seem* to work; in reality they do not. Left out of K3-108.
  - G3-002 (02:36:23-02:37:28, aside): after a read the store "moves back to continue writing" - a read is a detour from the append stream. Not in K3-076. Low confidence (referent of "it" unclear, flagged).
  - G3-003 (02:21:10-02:21:57, supporting): after merge the new merged file is where reads go ("this becomes an active file. This is where the read comes in"). Not stated in K3-043/K3-044. Flagged because "active" here clashes with the write-file meaning of K3-039; the editor should not let that wording into the page.

Verbatims: 124/124 found word for word. `validate_ledger.py part` reports `PASS part part3.jsonl (124 items) | errors 0 | warnings 0`. No splices found on a manual check.

### Distortions

- **K3-122**: says the teacher answered that "a new sorted dictionary is created by the merge, so nothing is inserted in place". That is not what happened.
  - The teacher only asked "Why is that complex?" and pointed to the index ("You have index, index has offset to directly go to this offset reader"). The student then worked out the merge point from the slide, and the teacher confirmed with "Correct. This is sorted."
  - A sentence inside the student's turn sounds like the teacher's reply: "but you don't have to search anything. Right. It's direct lookup." No speaker flag for it.
  - Transcript: "Like, right. But inserting a new entry, how would you decide that? Where do I need to insert? So let's say, right. Here it is. This is what, how you're creating this new dictionary, right? Change. Okay. Got it."
  - Fix: statement "...the teacher answered that lookups go directly to the index offset; the student then realised from the slide that the new sorted dictionary is created by the merge (so nothing is inserted in place), and the teacher confirmed ('Correct. This is sorted.')"; add flag `check: speaker of "but you don't have to search anything. Right. It's direct lookup." inside Student 1's turn (03:04:26)`; keep confidence medium.
- **K3-020**: typed `misconception` / `proposed_then_corrected`, but the teacher explicitly asked for the naive approach and the student supplied exactly that.
  - Transcript: "Now for us to perform get, what is the naive way of doing it?" -> "Just start looking at all the entries and return the latest one." -> "Return the latest one that seems very poor, but you want the best performance out of get as well."
  - Fix: type `process` (the naive get baseline); status `rejected` (as the final design); detail adds "the teacher asked for the naive way first; the student's answer is the requested baseline, not a misconception", keeping "seems very poor".
- **K3-034**: the correction rests on a line whose speaker is doubtful, and the statement adds "including the file being written", which was never said.
  - Transcript: "**[02:17:18] Student 2:** No, like anytime reading and writing won't go to the same file because / **[02:17:23] Teacher:** whichever file my key is, right, it will go to that file."
  - Fix: add flag `check: speaker of "whichever file my key is" at 02:17:23`; reword to "the teacher countered that reading and writing are from the same file ('No, reading and writing are from the same file, right?')"; drop "including the file being written".
- **K3-114**: resolves the teacher's contradiction by inventing a split between "S3 calls" (not cheap) and "S3 storage" (very cheap). The teacher did not make that split; the item's own flag notes the contradiction.
  - Transcript: "Cost would be there, right? S3 is not cheap. Network IO is not cheap. S3 will take its own sweet time. It's not very performant as well, but it is very cheap."
  - Fix: statement "For infrequent reads higher latency is acceptable, so data can be read from S3: cost would be there - 'S3 is not cheap', network I/O is not cheap, and S3 is slow - 'but it is very cheap'." Leave the calls-vs-storage reading to the fact-checker; keep the flag.
- **K3-118**: status `endorsed`, but the only "confirmation" is "Right. Okay. Sure." inside the student's own turn (hard rule: no verdict from a student's own turn).
  - Transcript: "So offsets are the line numbers or the actual byte from where that, you know, record is starting that offset. Right. Okay. Sure."
  - Fix: status `open`, or merge into K1-048, which carries the teacher's own definition.
- **K3-091**: "spend about a week" drops the teacher's "two weeks".
  - Transcript: "Spend two weeks, two weeks period, one week of your time. Implement it."
  - Fix: "spend one to two weeks building it (he said 'two weeks', then 'one week of your time')".
- **K3-087**: "heavily used in production, as Riak's backend" drops the hedge "most of them".
  - Transcript: "And it's very heavily used in production by Riak. Riak, most of them have Bitcask as their backend."
  - Fix: "...heavily used in production through Riak; most Riak setups have Bitcask as their backend."
- **K3-100**: drops the hedge "In most cases".
  - Transcript: "In most cases, when a file is allocated, it's allocated like a huge chunk is marked as blocked".
  - Fix: start the statement with "In most cases, file systems ...".
- **K3-077**: "nothing waits idle for I/O" drops the hedge "in most cases".
  - Transcript: "and that's a good thing, because in most cases it's not that you are waiting for IO to happen."
  - Fix: "...which is good: in most cases you are not waiting for I/O, so you get the most out of the underlying hardware."
- **K3-084**: "with each Bitcask holding a mutually exclusive set of data" is more specific than the garbled line.
  - Transcript: "You'd still have, like, this is mutually exclusive set of data."
  - Fix: "with the data split into mutually exclusive sets", plus flag `check: "this is mutually exclusive set of data" (02:38:11) - what is partitioned is unclear`.
- **K3-012** (minor): the detail says the order is "first put, then get, then delete". The teacher's own sequence is garbled, and the order actually taught was put, delete, get.
  - Transcript: "Then we'll cover get. Then we'll cover delete and then we'll cover get." Delete is taught at 02:08:37 and get at 02:10:52.
  - Fix: detail "The teacher builds the design one operation at a time, starting with put (taught order: put, delete, get)."

### Duplicates (within part 3)

- K3-017 / K3-023: an append-only file can be read anywhere but written only at the end. K3-017 is the definition, given while rejecting overwrite-on-delete; K3-023 adds "random reads / random writes" and why the stored offset works.
- K3-033 / K3-039: only one file takes writes, the others are immutable/read-only. K3-039 adds the numbering (001, 002, ...) and that old files can still be read.
- K3-041 / K3-070: the in-memory index maps a key to a file and an offset. K3-070 adds record size, timestamp for conflicts, writes only to the active file, and recaps rotation (K3-040).
- K3-045 / K3-071 / K3-102: merge by iterating entries into a hash table, replacing stale keys, flushing to disk. K3-071 adds "not like the merge step of merge sort, entries unsorted"; K3-102 adds that deleted keys are removed from the buffer and this hash table is separate from the index.
- K3-043 / K3-101: merge and compaction skips stale and deleted entries of the read-only files. K3-101 adds the Q&A framing (how the delete marker is handled) and the "two read-only + one active" example.
- K3-047 + K3-048 / K3-072: keeping the sawtooth under the disk cap and the too-frequent vs too-rare trade-off. K3-072 adds that crossing the cap crashes the system and that the pattern also sets the maximum file size.
- K3-030 / K3-073: all keys must fit in memory. K3-030 is student-raised with "keys, not values"; K3-073 is the teacher's "main limitation": values on disk, keys and offsets in memory.
- K3-028 / K3-074: get, put and delete are O(1), the bare minimum. K3-074 adds what O(1) means (bare minimum the disk must do).
- K3-026 / K3-076 (+ G3-002): a read is one memory lookup plus one random read. K3-026 adds the 404 when absent; K3-076 states the cost; G3-002 adds the return to writing.
- K3-089 / K3-091 / K3-103: implement Bitcask yourself. K3-091 adds Prometheus monitoring and 1-2 weeks; K3-103 adds what you discover (same/different process for merges, index updates) and the offer of help. Partial overlap: merge, or cross-link.
- K3-088 / K3-098: read the Bitcask paper. K3-098 adds the college paper-reading story and "fabulous".
- K3-092 / K3-096: next week's topics. K3-092 has S3, video encoding, view counting, storage vs compute throughput; K3-096 adds SSTable, memtable, LSM trees with Bitcask as foundation. Partial overlap.
- K3-085 / K3-086 (partial): K3-085 says the append-only file is Bitcask's magic; K3-086 generalises it to every high-throughput persistent system. Cross-link, don't merge.
- K3-009 / K3-095 and K3-021 / K3-094 (partial): the early student pushes toward memtable/SSTable are answered in Q&A by the Bitcask vs SSTable differences (values in memory, buffering vs immediate persistence). Cross-link.
- K3-043 + K3-044 / G3-003 (partial): G3-003 adds that reads go to the merged file afterwards. Merge into K3-044's detail if the editor prefers.
- K3-108 / G3-001 (partial): G3-001 adds "systems only seem to work fine". Could be merged into K3-108's detail.

### Duplicates across parts (involving part 3)

- K1-048 / K3-118: an offset is the byte position where a record starts, not a line number. K1-048 is the teacher's definition; K3-118 is the student's later check (status issue above). Merge K3-118 into K1-048 as Q&A reinforcement.
- K1-079 + K1-081 / K3-119: the header stores the index size; read the header, then that many bytes of index, then serve. K3-119 adds that the index sits in the same file (not a pointer to another file), clearing a student's misunderstanding.
- K1-081 / K3-058 (cross-link): K3-058 explicitly likens the record header to "the metadata kind of header" of the dictionary problem.
- K1-103 / K3-002 + K3-003 (partial): SSDs are very costly. K1-103 is the cost of 100 servers' SSDs; K3-003 the general reason bulk data lives on magnetic disk. Cross-link.
- K2-031 / K3-120: the merged file is a complete new dictionary with its own header and index. K3-120 adds that the header is recreated on every update.
- K2-022 / K3-121: the dictionary must be sorted for the merge to be efficient. K3-121 adds why sorting was introduced late (only when the need appeared).
- K2-025 + K2-026 / K3-123: merging two sorted files is a one-pass, merge-sort-style step. K3-123 adds O(n) vs O(n^2) and that the output becomes the "old" file for next week's update.
- K1-012 + K1-100 + K1-103 / K3-111: the 1 TB dictionary and the cost of copying it to every server. K3-111 adds that 1 TB was chosen deliberately to force the cost argument, NAS and portability, justified by multimedia meanings.
- K1-057 + K1-059 / K3-115: 170,000 words give an index of only ~1.75 MB; number crunching matters. K3-115 adds "M is a million bytes, don't take MBs lightly". Partial overlap.
- K1-106 + K1-113 + K2-071 / K3-112: S3 supports pointed byte-range reads. K3-112 adds that querying S3 directly was meant to show this, and that real services add caching.
- K2-072 + K2-074 + K2-075 / K3-113 + K3-114: multi-tiered storage, cold data on S3 still queryable, cheap but slow. K2-072 has the Amazon six-months-of-orders example; K3-113 adds the order-ID pointed read and "next week"; K3-114 adds "S3 / network IO not cheap". Merge, keeping both examples.
- K2-076 / K3-113: Athena queries files on S3 via an index. K3-113 mentions Athena only in garbled form (flagged). Cross-link.
- K2-067 + K2-069 / K3-116: rolling deployment comes out of the box from the cloud provider. K3-116 adds, in Q&A, that the load balancer stays while servers are removed and added.
- K2-083 / K3-117: trigger a deployment instead of writing reload code; the infrastructure is ours. K3-117 adds the teacher's own story (Redis Pub/Sub and exposed APIs first considered).
- K2-085 / K3-001 + K3-008: the after-break agenda is a super fast key-value store with O(1) operations and persistence. K2-085 adds "file format beyond CSV"; K3-001 adds cheap magnetic disk / commodity hardware.
- K2-007 + K2-018 / K3-013 + K3-043 (contrast, do not merge): for the dictionary, appending updates plus later compaction was rejected (no repeated entries wanted); for Bitcask the same idea is the design. Cross-link to show the contrast.
- K2-020 + K2-025 / K3-071 (contrast, do not merge): the dictionary merge is merge-sort style on sorted files; the Bitcask merge is explicitly "not similar to merge of merge sort". Cross-link.
- K2-013 + K2-029 / K3-016 + K3-017 (partial): you cannot rewrite bytes in place on disk, so write new entries; part 3 turns this into the append-only rule. Cross-link.

### Missed items

`gaps_part3.jsonl`: 3 items (G3-001..G3-003). Validator: `PASS gaps gaps_part3.jsonl (3 items) | errors 0 | warnings 0`.
