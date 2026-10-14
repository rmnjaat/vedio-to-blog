# Lecture 10: fact-check treatments applied

Policy (from the lesson brief, applied mechanically):
- **wrong / outdated / imprecise-medium-or-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its sources.
- **imprecise-low / simplified-medium:** a light inline clarification, one clause or sentence, with a source link (this lecture has no simplified-medium items).
- **simplified-low:** left as taught. Where a verified addition is attached, it is woven in as a separate sourced sentence, not as a correction.
- **unverifiable:** stated as the instructor's (or the class's) experience or opinion, with no empty source link.
- Hedges stay hedges; opinions stay attributed.

Verdict override applied (`factcheck/verdict_overrides.jsonl`, from `verdict_review.md`): **L-0153** is imprecise/**low** (was medium), so it gets an inline clarification, not a SourceNote. Source fix from the verdict review: partitioning in SN-01 is cited to the Athena partitions page, not the pricing page. Version notes: Lucene 10.5.2 page cited beside 9.12 (A-D-16); Cassandra docs are 5.0; PostgreSQL 18.6; MySQL 8.4; Riak KV 2.2.3. L-0263 is wrong/low: the course policy puts every 'wrong' item in a SourceNote, so it gets SN-06 despite its low severity.

Counts: 50 flagged items (treatment ≠ none) = 12 with a SourceNote (10 notes) + 18 inline clarifications + 20 left as taught. Plus 7 unverifiable items (treatment none) attributed as experience or opinion. All 43 verified additions are used (35 keep, 8 optional).

## 1. SourceNotes

### SN-01 · §1.3 · L-0035 (imprecise/medium)
- **Teacher's point (kept):** Real-world use case: on AWS you can upload any plain CSV file to S3 and still query it seamlessly using a service called Athena.
- **More precisely:** Athena does not keep a per-key index for a CSV file: it runs SQL by scanning the files a query touches and bills per TB scanned. Partitioning, compression and columnar formats such as Parquet cut how much it reads. The dictionary shares the idea of querying plain files on S3 without a database server, but its design (in-memory key index plus ranged GETs) is a point-lookup store, not how Athena works inside.
- **Additions used:** A-D-11
- **Sources:** https://aws.amazon.com/athena/pricing/ · https://docs.aws.amazon.com/athena/latest/ug/partitions.html · https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html

### SN-02 · §2.3 · L-0056 (wrong/medium)
- **Teacher's point (kept):** The offset is an integer, which takes 4 bytes.
- **More precisely:** A 1 TB file holds 10^12 bytes, but a 4-byte integer reaches only about 2.1 billion (signed) or 4.3 billion (unsigned), so byte offsets into it must be 64-bit (8-byte) integers. With 8-byte offsets the 170,000-word index is 170,000 × (4.3 + 8 + 2) B ≈ 2.4 MB: still tiny, so the design stands.
- **Additions used:** A-D-01
- **Sources:** https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html

### SN-03 · §4.2 · L-0108 (imprecise/medium)
- **Teacher's point (kept):** A common place accessible over the network is any block storage or a database; databases are ruled out, so the gigantic file goes on block storage such as S3, which...
- **More precisely:** S3 is object storage, not block storage. AWS uses three terms: block storage (EBS) is a disk-like volume attached to one instance, file storage (EFS) is a shared network file system, and object storage (S3) holds whole objects fetched over HTTP by key. Databases are ruled out, so the file goes on shared storage such as S3 or a network file system.
- **Additions used:** A-D-12
- **Sources:** https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/ · https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html

### SN-04 · §4.2 · L-0112 (imprecise/medium)
- **Teacher's point (kept):** S3 gives file-system-level semantics, so it can also be used as a distributed file system: you do not have to read the entire file, you can ask for a given number of...
- **More precisely:** S3 supports ranged reads (ask for n bytes at an offset and get exactly those), which is all this read-only design needs, one range per GET. But it is an object store, not a file system: objects are written whole and cannot be appended to or modified in place, and tools that mount S3 as a file system say they do not implement full POSIX semantics.
- **Additions used:** A-SSE-10
- **Sources:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html · https://github.com/awslabs/mountpoint-s3/blob/main/doc/SEMANTICS.md

### SN-05 · §9.2 · L-0261 (imprecise/medium), L-0262 (wrong/medium)
- **Teacher's point (kept):** The CRC goes on the leftmost side of the record and is the first thing written and flushed, because it is the bare minimum needed to know something is corrupted; it...
- **Teacher's point (kept):** Good persistent record formats put the CRC on the leftmost side, e.g. the Postgres commit log file and the MySQL binlog.
- **More precisely:** Putting the CRC first is a convention, not a rule. Bitcask and LevelDB put it at the start of each record (and Bitcask writes the whole record, CRC included, in one write, so the CRC is not flushed separately). The Postgres WAL and the MySQL binlog also protect every record with a CRC (CRC-32C per WAL record; CRC32 per binlog event by default) but place it elsewhere: Postgres at the end of the record header, MySQL in the last 4 bytes of each event. Either works as long as the reader knows the record length and checks the CRC before trusting the data.
- **Additions used:** A-SSE-07, A-SSE-08
- **Sources:** https://raw.githubusercontent.com/basho/bitcask/develop/src/bitcask_fileops.erl · https://github.com/google/leveldb/blob/main/doc/log_format.md · https://raw.githubusercontent.com/postgres/postgres/master/src/include/access/xlogrecord.h · https://www.postgresql.org/docs/current/wal-reliability.html · https://dev.mysql.com/doc/refman/8.4/en/replication-options-binary-log.html · https://dev.mysql.com/doc/dev/mysql-server/latest/classmysql_1_1binlog_1_1event_1_1Log__event__footer.html

### SN-06 · §9.2 · L-0263 (wrong/low)
- **Teacher's point (kept):** Network formats also put the CRC first, because those are the first bytes received and tell whether the incoming data is corrupted.
- **More precisely:** Network frames carry checksums so the receiver can detect corruption, but often not first: the PPP frame check sequence comes after the data, and the TCP checksum sits in the middle of the header.
- **Sources:** https://www.rfc-editor.org/rfc/rfc1662 · https://www.rfc-editor.org/rfc/rfc9293#section-3.1

### SN-07 · §10.2 · L-0275 (imprecise/medium), L-0276 (imprecise/medium)
- **Teacher's point (kept):** Uber uses Bitcask in production for its main ride-hailing service.
- **Teacher's point (kept):** Since Bitcask is embedded, Uber uses Riak as its main database; Riak is a simple key-value store that uses Bitcask as its back-end.
- **More precisely:** Around 2015 Uber used Riak, whose default storage backend is Bitcask, for parts of its new dispatch services. Its core trip data lived in Postgres and then moved to Schemaless, a MySQL-based store. So Bitcask ran at Uber through Riak, but not as the store of the main ride-hailing data.
- **Sources:** https://riak.com/posts/technical/ubers-ringpop-and-riak/ · https://www.uber.com/blog/schemaless-part-one-mysql-datastore/ · https://docs.riak.com/riak/kv/latest/setup/planning/backend/index.html

### SN-08 · §10.2 · L-0278 (wrong/medium)
- **Teacher's point (kept):** Riak's responsibility is to make Bitcask distributed: master-slave architecture, consensus, a proxy that routes requests, consistent hashing and data movement, with the...
- **More precisely:** Riak is masterless: keys are hashed onto a ring split into partitions owned by vnodes, each write goes to the owning vnode and the next N−1, and any node can coordinate a request. Partitions are disjoint key ranges, but each key is stored on N vnodes, and each partition runs its own Bitcask instance underneath.
- **Additions used:** A-SSE-14
- **Sources:** https://docs.riak.com/riak/kv/latest/learn/why-riak-kv/index.html · https://docs.riak.com/riak/kv/latest/learn/concepts/clusters/index.html · https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html

### SN-09 · §10.3 · L-0288 (imprecise/medium)
- **Teacher's point (kept):** Bitcask vs SSTable/memtable (LSM trees): the big difference is that an SSTable design keeps values in memory, while Bitcask does not; SSTables are also sorted, for a...
- **More precisely:** In an LSM engine only the memtable (recent writes) is in memory; SSTables are sorted, immutable files on disk, written when a memtable is flushed. Every write first goes to an on-disk commit log. Bitcask, by contrast, keeps every key (not values) in memory.
- **Additions used:** A-SSE-13
- **Sources:** https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html · https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html

### SN-10 · §10.3 · L-0289 (imprecise/medium)
- **Teacher's point (kept):** Bitcask persists every write immediately to disk by default, prioritising persistence while still getting the most out of the disk; a memtable buffers writes and then...
- **More precisely:** Bitcask appends every write straight to its data file, while an LSM engine appends it to a write-ahead log and buffers it in a memtable, which the log can fully recover. In both, crash durability depends on how often the log is synced: Bitcask's default (sync_strategy none) leaves flushing to the OS, and o_sync forces a sync on every write at a throughput cost; Cassandra's default periodic sync can lose up to 10 s.
- **Additions used:** A-SSE-02
- **Sources:** https://github.com/facebook/rocksdb/wiki/Write-Ahead-Log-%28WAL%29 · https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html · https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html

## 2. Inline clarifications (imprecise-low)

| Id | § | Verdict | Clarification on the page | Additions | Source |
|---|---|---|---|---|---|
| L-0030 | 1.3 | imprecise/low | A zip of many folders is rejected because it is still many logical files, often compressed, so you cannot do a direct byte-offset read into the dictionary data. | A-D-10 | https://pkwaredownloads.blob.core.windows.net/pkware-general/Documentation/APPNOTE-6.3.9.TXT |
| L-0037 | 1.3 | imprecise/low | Lucene stores an index as one or more segments (each a set of files, optionally packed into one compound .cfs file), plus a segments_N file. | A-D-16 | https://lucene.apache.org/core/9_12_0/core/org/apache/lucene/codecs/lucene912/package-summary.html |
| L-0045 | 2.1 | imprecise/low | Scanning 0.5 TB per request is slow, wastes disk throughput and pushes drives past their rated workload, which reduces their reliability. | – | https://www.seagate.com/support/kb/annualized-workload-rate-005902en/ |
| L-0055 | 2.3 | imprecise/low | Average English word length is about 4.8 letters in running text, but about 7-8 letters across distinct dictionary words. | A-D-02 | https://norvig.com/mayzner.html |
| L-0078 | 3.2 | imprecise/low | Every PNG file starts with the same 8-byte signature (89 50 4E 47 0D 0A 1A 0A, which contains the letters 'PNG'), telling the decoder it is a PNG. | A-FFD-01 | https://www.w3.org/TR/png-3/ |
| L-0086 | 3.3 | imprecise/low | Parquet also stores metadata that tells readers where each column chunk lies, but it keeps it in a footer at the end of the file (after a leading 'PAR1' magic number), not in a header. | A-FFD-03 | https://parquet.apache.org/docs/file-format/ |
| L-0088 | 3.3 | imprecise/low | RFC 4180 allows an optional CSV header line (column names), signalled by the MIME parameter header=present/absent; that is a header in a different sense (column names, not metadata saying where sections lie). PDF does start with a '%PDF' version header, but its catalog is located through the trailer at the end of the file. | A-FFD-05 | https://www.rfc-editor.org/rfc/rfc4180 · https://www.loc.gov/preservation/digital/formats/fdd/fdd000030.shtml |
| L-0110 | 4.2 | imprecise/low | What is needed is networked storage that supports random (offset, length) reads - a NAS share, HDFS or an object store such as S3 all qualify. | – | https://aws.amazon.com/what-is/nas/ |
| L-0121 | 5.1 | imprecise/low | The update is a batch job triggered on a schedule (a cron job). | – | https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/ |
| L-0153 | 6.1 | imprecise/low (override) | Overwriting the same S3 key is atomic (readers get the old or the new object, never a partial one). But you lose the old copy for rollback unless versioning is on, and existing indexes no longer match. | – | https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html |
| L-0181 | 6.3 | imprecise/low | A plain text file does not carry an updated_at value in its content, as the teacher says. But S3 returns object metadata (ETag, Last-Modified) on every GetObject. A ranged GET can also be made conditional with If-Match, so the request fails with 412 Precondition Failed if the object changed. A server can therefore detect a stale index without an extra call per request. Rejecting per-request checks as polling and extra work is still a fair design choice. | – | https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html |
| L-0194 | 6.5 | imprecise/low | Table formats like Apache Hudi build on the same idea: they keep indexes (record key -> file id) and partition layouts so huge data on cheap storage can be queried without scanning everything. | A-SSE-12 | https://hudi.apache.org/docs/indexes |
| L-0235 | 8.2 | imprecise/low | Some file systems cap file size (FAT32 at 4 GB), but modern ones allow many terabytes; the stronger reason for small files is that merge, compaction and index rebuild work file by file. | – | https://www.kernel.org/doc/html/latest/filesystems/ext4/blocks.html · https://learn.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview · https://btrfs.readthedocs.io/en/latest/btrfs-man5.html |
| L-0249 | 8.4 | imprecise/low | Appends approach the disk's sequential bandwidth, but every get still costs one random seek on a magnetic disk (Bitcask's guarantee is 'never more than one disk seek'), so random-read latency stays far behind SSDs. 'Almost as fast as SSDs' holds for writes, not reads. | – | https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html |
| L-0250 | 8.4 | imprecise/low | SSDs do avoid mechanical seeks, but flash cannot be overwritten in place: it must be erased before rewriting, so random in-place updates cause garbage collection and write amplification. Sequential/append-only writes are still the flash-friendly pattern, which is why log-structured designs keep a real (smaller) benefit on SSDs. | A-SSE-17 | https://zonedstorage.io/docs/introduction/zoned-storage |
| L-0253 | 9.1 | imprecise/low | Reading one byte at a time until a newline makes one call per byte (the OS page cache absorbs the disk reads), which is slow; a length-prefixed format lets you read the whole record in one go. | A-SSE-15 | https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html |
| L-0280 | 10.2 | imprecise/low | A useful heuristic but an over-generalisation: many high-throughput persistent systems do use append-only logs (WAL, commit logs), yet throughput also comes from batching, group commit, relaxed sync (e.g. Cassandra acknowledges writes before its periodic commit-log sync) and in-memory designs. | – | https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html |
| L-0297 | 9.3 | imprecise/low | Neither POSIX nor disks promise that a small header write survives a crash whole: Postgres notes a power loss can leave some 512-byte sectors written and others not, and an unaligned header can straddle a sector. The CRC design does not need atomic headers anyway: a torn header or value simply fails the CRC check. | – | https://www.postgresql.org/docs/current/wal-reliability.html |

## 3. Left as taught (simplified-low)

The checker's note is for the writer's awareness; the page states the teacher's point unchanged. Where an addition is attached it is a separate sourced sentence. Where a SourceNote in the same section already covers the gap (L-0051, L-0058, L-0187 by SN-02; L-0036 by SN-01; L-0208 by SN-10), the page points to it.

| Id | § | Checker's note (not a page correction) | Addition woven in |
|---|---|---|---|
| L-0016 | 1.2 | A single big JSON file has no index, so finding one word means parsing through the file. Streaming parsers avoid loading it all into memory, but it is still a full scan. | A-D-15 |
| L-0036 | 1.3 | Good motivation, but the dictionary design (in-memory key index plus ranged GETs of single records) is a point-lookup key-value store, while Athena is a scan-based analytics engine. The shared idea is querying plain files on S3 without a database server. Athena does not work this way internally (see L-0035). | – |
| L-0046 | 2.1 | Classroom rule of thumb. Indexing is the main tool for avoiding scans, but caching, denormalisation, better data layout and batching also speed up reads. The teacher mentions caching himself in L-0006. | – |
| L-0051 | 2.2 | The comparison is correct: the index holds only keys and offsets, so scanning it is much cheaper than scanning the data. But offsets cannot be 4 bytes for a 1 TB file; they need 8 bytes (see L-0056). The index is still tiny, so the point stands. | – |
| L-0058 | 2.3 | The index is roughly 170,000 x (word + 8-byte offset + 2) bytes, a few MB, which fits easily in RAM. | – |
| L-0073 | 3.2 | Most file formats begin with identifying bytes and keep metadata that tells the reader where each part of the file lies; that metadata sits in a header at the start or, in many formats (ZIP, Parquet, PDF, MP4 by default), in a footer at the end. | A-FFD-04 |
| L-0084 | 3.3 | JPEG/JFIF files are a stream of marker-identified segments (SOI FF D8, an APP0 'JFIF' segment, then image data); a still JPEG is one image, not a sequence of frames like video. In MP4 the index of where audio and video samples lie (the moov box) is usually written at the END by muxers unless moved to the front with 'faststart'. Audio tracks hold compressed coded audio, not a raw waveform. | – |
| L-0087 | 3.3 | Right that JSON has no header or index: a JSON text is just a sequence of tokens (JSON-text = ws value ws), so finding a key means parsing sequentially. Streaming parsers can stop early and need not build the whole in-memory dictionary, but there is still no way to jump straight to an entry. | – |
| L-0117 | 4.3 | What is built is a read-only key-value store with point lookups. Calling it 'a database' is loose, because a database usually also provides concurrent writes, transactions, durability guarantees and query features. The teacher's point, that a database's core is a key-to-value lookup over files, is fair. | – |
| L-0139 | 5.3 | Sortedness is needed for the merge-sort-style merge and to keep the output sorted. It is not strictly needed for a single linear pass. Because the changelog is small, you can load it into a hash map, stream the unsorted dictionary once, replace changed entries and append new words, also in O(n + m). The teacher's choice keeps the file sorted, which makes the merge natural and keeps the file ordered for the next update. | – |
| L-0157 | 6.1 | On S3 a failed or interrupted upload does not damage the existing object. Single-key updates are atomic, so readers see the old or the new object, never a partial one. The real same-path risks are a file that uploads successfully but has corrupt content, and the stale-offset problem (L-0158). Overwriting also removes the old version needed for rollback unless versioning is enabled. | A-D-05 |
| L-0187 | 2.3 | The arithmetic checks out (4.7 + 3 + 8 = 15.7; 15.7 x 171,476 = 2,692,173.2 B, about 2.7 MB or 2.57 MiB), and 171,476 is the OED Second Edition count of words in current use. Two inputs are optimistic. 4.7 is a running-text average (distinct words average about 7.6 letters). And if the 2x4 is two 4-byte integers (offset and length), the offset cannot address a 1 TB file; it needs 8 bytes (see L-0056). The order of magnitude, a few MB, is right. | – |
| L-0208 | 7.2 | Student proposal, rejected as taught. Note that real memtable/SSTable (LSM) engines do persist every write immediately - to a write-ahead log - before inserting it into the memtable; the memtable is not the only copy. The real difference from Bitcask is that LSM keeps sorted on-disk files rather than a full in-memory key index. | – |
| L-0210 | 7.2 | Appends avoid seeks only while the disk serves just this write stream; gets (random reads) and merges on the same disk still move the head between the read location and the tail of the active file. | – |
| L-0247 | 8.4 | Fine as the two core knobs of the naive design, but real Bitcask exposes many more: sync strategy, merge policy/window, fragmentation and dead-bytes triggers and thresholds, small-file threshold, expiry and others. | – |
| L-0260 | 9.2 | CRCs (Postgres uses CRC-32C per WAL record) are the standard tool for detecting accidental corruption, but not the only one: other checksums and cryptographic hashes also work, and a CRC does not protect against deliberate tampering. | – |
| L-0277 | 10.2 | Elasticsearch is more than an HTTP wrapper: each shard is a Lucene index and Elasticsearch adds distribution across nodes, replication and a REST API. The analogy works: Riak likewise runs a Bitcask per vnode and adds the distribution layer. | – |
| L-0294 | 7.2 | ext4 does try to limit fragmentation (multi-block allocator, delayed allocation, spreading directories across block groups), but a growing file is not guaranteed contiguous room; files can still fragment. | – |
| L-0299 | 9.3 | A ~20-byte header is unlikely to be torn, but not certain (it can straddle a sector boundary); the CRC check is what makes the design safe regardless. | – |
| L-0310 | 5.3 | Merging two sorted files is linear, O(n + m). But the alternative to sorting is not necessarily O(n^2): with a small changelog in an in-memory hash map, one pass over an unsorted file is also linear (see L-0139). O(n^2) is the cost of the naive approach that scans the whole dictionary for each changelog word. | – |

## 4. Unverifiable: attributed

| Id | § | Severity | How the page states it |
|---|---|---|---|
| L-0089 | 3.3 | none | MarginNote 'Where the instructor learned this': stated as his experience. |
| L-0284 | 10.3 | none | Stated as the instructor's experience ('he implemented it about five years ago'). |
| L-0292 | 10.3 | none | Stated as the instructor's experience (college paper-reading course). |
| L-0301 | 9.3 | none | Stated as the instructor's view ('in his experience, overviews rarely cover integrity'). |
| L-0302 | 9.3 | none | Stated as the instructor's view. |
| L-0304 | 9.3 | none | Stated as the instructor's impression from those posts. |
| L-0308 | 6.4 | none | MarginNote 'From the instructor': stated as his experience with his own services. |

## 5. Additions and where they land

| Addition | Usefulness | § | Component | Use |
|---|---|---|---|---|
| A-D-01 | keep | 2.3 | SourceNote | SN-02: 1 TB needs 8-byte offsets; index still a few MB (L-0056). |
| A-D-02 | keep | 2.3 | Prose | Inline on L-0055: 4.8 letters in running text, ~7.6 across distinct words. |
| A-D-03 | keep | 4.2 | Prose | Sourced sentence with L-0105: GetObject takes an HTTP Range header. |
| A-D-04 | keep | 6.3 | Prose | Inline on L-0181: ETag/Last-Modified; If-Match ranged GET fails with 412 instead of garbage. |
| A-D-05 | keep | 6.1 | Prose | Sourced sentence with L-0157: S3 overwrite is atomic; the danger is stale offsets. |
| A-D-06 | keep | 6.1 | Prose | Sourced sentence with L-0149: 1 TB needs multipart upload (single PUT max 5 GB). |
| A-D-07 | keep | 6.3 | Prose | Sourced sentence with L-0171: Redis Pub/Sub is at-most-once. |
| A-D-08 | keep | 4.3 | Prose | Sourced sentence with L-0306: S3 latency 100-200 ms for latency-sensitive apps; cache in front. |
| A-D-09 | optional | 1.3 | Prose | Optional, used: SQLite is one portable disk file (with L-0029). |
| A-D-10 | keep | 1.3 | Prose | Inline on L-0030: ZIP's central directory holds each member's offset. |
| A-D-11 | keep | 1.3 | SourceNote | SN-01: Athena scans, billed per TB; partition/compress/Parquet (L-0035). |
| A-D-12 | keep | 4.2 | SourceNote | SN-03: block (EBS) vs file (EFS) vs object (S3) storage (L-0108). |
| A-D-13 | keep | 6.3 | Prose | Sourced sentence with L-0179: S3 versionId in meta.json pins each server to its version. |
| A-D-14 | optional | 6.4 | Prose | Optional, used: EC2 Auto Scaling instance refresh launches new before terminating old (L-0183). |
| A-D-15 | optional | 1.2 | Prose | Optional, used: JSON Lines streams record by record but has no index (L-0016). |
| A-D-16 | keep | 1.3 | Prose | Inline on L-0037: Lucene segments, segments_N, compound .cfs. |
| A-D-17 | optional | 4.2 | Prose | Optional, used: HDFS positioned reads (L-0113). |
| A-FFD-01 | keep | 3.2 | Prose | Inline on L-0078: the 8-byte PNG signature. |
| A-FFD-02 | keep | 3.2 | Prose | Sourced sentence with L-0081: header integers need a fixed byte order (PNG big-endian, Parquet little-endian). |
| A-FFD-03 | keep | 3.3 | Prose | Inline on L-0086: Parquet metadata in a footer after PAR1. |
| A-FFD-04 | keep | 3.2 | Prose | Sourced sentence with L-0073: ZIP and MP4 keep the directory at the end. |
| A-FFD-05 | keep | 3.3 | Prose | Inline on L-0088: RFC 4180 optional column-name header. |
| A-FFD-06 | optional | 3.3 | Prose | Optional, used: only Safari shows TIFF natively (Oct 2026), with L-0091. |
| A-FFD-07 | keep | 2.3 | Prose | Sourced sentence with L-0058/L-0307: MB = 10^6 B vs MiB = 2^20 B. |
| A-FFD-08 | optional | 2.1 | Prose | Optional, used: 8 kB pages are real; page trees matter when the index exceeds RAM (L-0038). |
| A-FFD-09 | keep | 4.1 | Prose | Sourced sentence with L-0100: cost optimization is a Well-Architected pillar. |
| A-SSE-01 | keep | 8.1 | Prose | Sourced sentence with L-0227: hint files speed up startup. |
| A-SSE-02 | keep | 10.3 | SourceNote | SN-10: Bitcask default sync_strategy none; o_sync per write (L-0289). |
| A-SSE-03 | keep | 8.2 | Prose | Sourced sentence with L-0236: Riak Bitcask rotates at 2 GB by default. |
| A-SSE-04 | keep | 8.4 | Prose | Sourced sentence with L-0247: merge triggers 60% dead keys / 512 MB dead bytes, merge window. |
| A-SSE-05 | keep | 9.2 | Prose | Sourced sentence with L-0264: Bitcask's source writes CRC, tstamp, ksz, vsz, key, value. |
| A-SSE-06 | keep | 9.2 | Prose | Sourced sentence with L-0266: LevelDB skips corrupt data, resyncs at next block. |
| A-SSE-07 | keep | 9.2 | SourceNote | SN-05: Postgres CRC-32C per WAL record (L-0262). |
| A-SSE-08 | keep | 9.2 | SourceNote | SN-05: MySQL binlog_checksum CRC32, last 4 bytes of the event (L-0262). |
| A-SSE-09 | keep | 9.3 | Prose | Sourced sentence with L-0298: Postgres torn 8 KB pages, full_page_writes. |
| A-SSE-10 | keep | 4.2 | SourceNote | SN-04: one byte range per GET; concurrent ranged GETs (L-0112). |
| A-SSE-11 | keep | 4.3 | Prose | Sourced sentence with L-0306: tens-of-ms median latency for small requests; cache in front of S3. |
| A-SSE-12 | optional | 6.5 | Prose | Optional, used: Hudi index maps record key to file id (L-0194). |
| A-SSE-13 | keep | 10.3 | SourceNote | SN-09: Cassandra commit log -> memtable -> immutable SSTables; 10 s sync window (L-0288). |
| A-SSE-14 | keep | 10.2 | SourceNote | SN-08: Riak ring, N vnodes per key, any node coordinates, no master (L-0278). |
| A-SSE-15 | keep | 9.1 | Prose | Inline on L-0253: the page cache serves nearby reads. |
| A-SSE-16 | keep | 10.2 | Prose | Sourced sentence with L-0274: SQLite reads and writes its file directly, no server. |
| A-SSE-17 | optional | 8.4 | Prose | Optional, used: zoned SSDs need sequential writes per zone (with L-0250 inline). |

## 6. Lecture-level framing fixes (no verdict attached)

- **Header name:** spoken 'O-U-R-D-I-C-T' is 7 letters; the page uses the board's 8-byte `OUR_DICT` (spot-check note on L-0077).
- **Byte offsets in the example:** the spoken 'amazon at two, book at three' are line-like numbers; the page uses real byte offsets (apple 0, amazon 14) and says offsets are bytes (Q&A 03:01:39, L-0049).
- **Board slip in D-15:** `K3 → f2, O3` is redrawn as `K3 → f1, O3`, because K3 V3 is in file 001 on the same board.
- **Riak figure (D-21):** drawn masterless per SN-08; the board's 'proxy' box stays as 'any node can route'.
- **1.7 MB in L-0199** inherits the 4-byte offset; left as taught (accurate in the spot-check: with 8-byte offsets it is ~2.4 MB, the point stands).
- **Course numbering:** back-references use course order (`lectures/course.json`): routing and consistent hashing Lecture 9; reactive config Lecture 5; Redis Pub/Sub Lecture 4; delete as `-1` Lecture 3; timestamp leftmost Lecture 6; caching at every level Lecture 2. Next week's topics are chipped 'coming later · week 6'.
