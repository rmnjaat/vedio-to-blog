# Lecture 10 ledger, part 1 (00:00:00 - 01:05:16): notes

File: `part1.jsonl`, 121 items (K1-001 .. K1-121), validator: PASS (0 errors, 0 warnings; every verbatim found in the transcript word for word). All lines are valid JSON with every schema field present; verbatims are at most 25 words.

## Topic tree

- **Admin**
  - Agenda / transitions: K1-001, K1-002 (both systems used in production), K1-008, K1-013 (brainstorm axes), K1-093 (move to infrastructure)
  - Forward reference (applications of pointed reads on S3): K1-121
- **Dictionary: problem statement**: K1-003 (no traditional DB), K1-035 (S3 + Athena use case), K1-036 (exercise simulates that compute engine)
- **Dictionary: requirements**: K1-004 (scalable), K1-006 (high response time OK), K1-007 (portable), K1-009 (mostly read-only), K1-010 (weekly changelog), K1-011 (single-word lookup, 404), K1-012 (1 TB, 170,000 words), K1-021 (no repetitive entries), K1-024 (key-value, searchable via key), K1-025 (read-heavy, >1000:1), K1-026 (batch update = one huge processing is fine)
- **System design (general)**: storage vs compute K1-005; keep it simple K1-023, K1-034, K1-038, K1-039, K1-061; reasoning K1-099 (think through alternatives' disadvantages), K1-107 (properties before technology); cost K1-101, K1-102, K1-103
- **Dictionary: storage format**
  - Text vs JSON: K1-014, K1-015, K1-016 (JSON needs full read + deserialize), K1-017 (pick a text file); Parquet / Lucene digressions: K1-033, K1-037
  - CSV text file: K1-018 (WAL idea), K1-019 (apple,fruit), K1-020 (no duplicate words), K1-022 (unsorted), K1-027 (sort-by-key proposal), K1-040 (naive CSV design)
- **Dictionary: query**
  - Linear scan: K1-041 to K1-044
  - Indexing: K1-045 (rule: slow reads -> index), K1-046 to K1-050, K1-060 (in-memory hash map), K1-062 (pointed read)
  - Index size estimate: K1-051 to K1-059 (4.3 + 4 + 2 = 10.3 bytes x 170,000 = ~1.75 MB; number crunching)
- **Dictionary: portability**
  - One file, not many: K1-028 (sharding into files rejected), K1-029 (definition), K1-030 (zip rejected), K1-031, K1-032 (logical partitions, deferred), K1-092
  - Index + data in one file: K1-063 to K1-070 (two files; build-at-boot rejected; merge; separator; pre-allocate; stack; when to stop; reserved position)
- **File formats**
  - Header: K1-071 (byte offset instead of separator), K1-072 to K1-081 (header definition, sections, fixed size, 8-byte name, PNG, AODB, version, index size, 16 bytes, boot read)
  - Encoder / decoder, custom formats: K1-082 to K1-091 (compartments, MP4, shippable, Parquet, JSON/CSV have no header, own image format, encoder/decoder, TIF error, our decoder)
- **Dictionary: serving**
  - Architecture: K1-094 (LB + API servers), K1-095 (GET /word)
  - Central storage: K1-096 (shared disk), K1-097 (tedious updates - not a problem), K1-098 (inconsistency - not a problem), K1-100 (cost), K1-104 (central place), K1-105 (S3), K1-106 (byte-range get), K1-108 (network), K1-109 (block storage keeps portability)
  - Network attached storage: K1-110 to K1-114 (random reads, NAS, S3 file-system semantics, HDFS / network hard disks)
  - Read flow: K1-115 (S3 path as config), K1-116 (boot), K1-117 (GET / 404), K1-118, K1-119 (a key-value store on S3), K1-120

## Counts by type

| type | n |
|---|---|
| concept | 56 |
| claim | 11 |
| rule_of_thumb | 10 |
| number | 9 |
| process | 9 |
| example | 8 |
| admin_reference | 5 |
| definition | 5 |
| qa_insight | 3 |
| comparison | 3 |
| tradeoff | 1 |
| war_story | 1 |

Status: endorsed 105, proposed_then_corrected 11, open 5. Speaker: teacher 92, student (proposal) 29. Confidence: high 97, medium 24.

## Coverage by 5-minute window

(counted by each item's first audio timestamp)

| Window | Items | Note |
|---|---|---|
| 00:00-00:05 | 13 | agenda, problem statement, requirements |
| 00:05-00:10 | 13 | text vs JSON, CSV, no duplicates, sorting |
| 00:10-00:15 | 5 | mostly one long student turn (requirements, sorting, multiple files); K1-024..K1-030 cover it, and later windows add sources to it |
| 00:15-00:20 | 6 | student digressions (logical partitions, Parquet, Lucene) plus the Athena use case; the teacher deliberately keeps them out of scope |
| 00:20-00:25 | 11 | B+ tree rejected, naive CSV + linear scan, indexing |
| 00:25-00:30 | 11 | index read path, size estimate |
| 00:30-00:35 | 4 | mostly a recap (00:31:40-00:34:54); the recap timestamps were added as extra sources to K1-043, K1-045, K1-054, K1-056, K1-057, K1-060 |
| 00:35-00:40 | 6 | proposals for one file (build at boot, merge, separator, pre-allocate, stack) |
| 00:40-00:45 | 12 | byte offset, header fields, 16 bytes |
| 00:45-00:50 | 12 | custom file formats, encoder/decoder |
| 00:50-00:55 | 9 | LB + API servers, shared storage vs copies, cost |
| 00:55-01:00 | 10 | central storage, S3, network attached storage |
| 01:00-01:05 | 9 | S3 semantics, boot and GET flow, a key-value store on S3 |

## Doubts / open questions

- **K1-057 index size**: the student's product is heard as "17,000,000" bytes, which the teacher repeats before saying "1751 KB = 1.751 MB" (170,000 x 10.3 = 1,751,000 bytes). The figure is flagged, not fixed. The board (S16, 00:28:15-00:33:15) should show the written number.
- **K1-076 PNG**: the teacher says "the first 3 bytes is P-N-N-G". Recorded as said; this is for the fact-checker (the real PNG signature is 8 bytes).
- **K1-079 header field 3**: the teacher first says "start offset of data", then "rather ... index size", and later says the value stored is "1.7500". Recorded as index size, with the alternative in the statement. The board may show the final header layout.
- **K1-036**: the teacher says "we are trying to build AWS S3", but from context he means the Athena-style query engine over S3. The verbatim keeps his words, and the statement says "that compute engine".
- **Speaker doubts**: K1-015 ("Exactly." may be the teacher), K1-019/K1-020 (speaker boundaries), K1-022 ("Teacher?" asking whether the file will be sorted), K1-025 ("much more than thousand to one" may be the teacher), K1-030 ("Teacher?" on the zip), K1-068 ("wasting this much of space" may be the teacher).
- **ASR flags kept**: batching (K1-006), unmarshaling (K1-015), store (K1-019), B-trees (K1-023), value can (K1-024), sorting (K1-027), shard (K1-028), quotes (K1-086), PPT (K1-087), replicate (K1-108); `[unclear]` in K1-038, K1-054, K1-069, K1-070, K1-075.
- **Statuses**: the student's sort-by-key, logical-partition, Parquet and Lucene proposals (K1-027, K1-032, K1-033, K1-037) are `open`. The teacher deferred them ("we'll touch upon later") but did not correct them. K1-018 (the write-ahead-log idea) is also `open`. K1-067 (pre-allocated index) is `proposed_then_corrected` because the teacher praised it as a "very nice hack" but asked for something more frugal.
- Names in verbatims: K1-077 keeps "Arpit's outstanding database" (the teacher's own example name).
