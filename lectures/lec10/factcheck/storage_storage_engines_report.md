# Fact-check report: storage, storage engines (Bitcask), communication (Lecture 10)

Scope: the 113 ledger items in topic group `storage_storage_engines` (topic roots storage, storage-engines, communication). No items were skipped. **113 items checked.** Checked 2026-10-13. Product facts are pinned to the docs as published on that date: Riak KV docs (latest published = 2.2.x), Bitcask `develop` source, PostgreSQL current docs (18), MySQL 8.4, Cassandra latest docs, S3 user guide.

## Counts

| Verdict | Count |
|---|---|
| accurate | 84 |
| simplified | 7 |
| imprecise | 14 |
| wrong | 3 |
| outdated | 0 |
| unverifiable | 5 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 8 |
| low | 16 |
| none | 89 |

Additions proposed: 17 (see `storage_storage_engines_additions.jsonl`).

Calibration: this is a from-first-principles build of Bitcask, and the core design (append-only file, tombstone deletes, in-memory keydir of file/offset, file rotation, merge and compaction, CRC + timestamp + key size + value size record) matches the real Bitcask implementation and Riak's docs closely, so most items are accurate. Simplifications made for teaching (zero seeks, two parameters, O(1)) are marked `simplified`/low or left accurate. Flags go where a learner would repeat a wrong fact in an interview or design review: the CRC-placement claims about Postgres, MySQL and network formats; Riak described as master-slave; Uber's use of Riak; and the Bitcask vs LSM/memtable contrast. Anecdotes and opinions are `unverifiable`/none. The Bitcask paper PDF (riak.com/assets/bitcask-intro.pdf) was fetched but its compressed text could not be extracted, so Bitcask claims are sourced to the Riak KV Bitcask docs and the Bitcask source code instead.

## Items needing a decision (ordered by severity)

### L-0262 | wrong | severity: medium
- **Teacher/ledger statement:** Good persistent record formats put the CRC on the leftmost side, e.g. the Postgres commit log file and the MySQL binlog.
- **Verbatim:** "Postgres commit log file, CRC on the leftmost side. MySQL bin log, CRC on the leftmost side." (teacher)
- **Issue:** Neither example is right. Postgres's commit log (pg_xact) holds transaction commit status data, not CRC'd records. In a Postgres WAL record, `xl_crc` is the last field of the fixed header (after xl_tot_len, xl_xid, xl_prev, xl_info, xl_rmid). A MySQL binlog event header starts with a timestamp, and the CRC32 checksum is the last 4 bytes of the event. Bitcask and LevelDB really do put the CRC first.
- **Suggested note:** Bitcask and LevelDB put the CRC at the start of each record. The Postgres WAL and MySQL binlog also checksum every record, but place the CRC elsewhere: at the end of the record header in Postgres, at the end of each event in MySQL.
- **Sources:** [raw.githubusercontent.com (postgres xlogrecord.h)](https://raw.githubusercontent.com/postgres/postgres/master/src/include/access/xlogrecord.h), [www.postgresql.org](https://www.postgresql.org/docs/current/storage-file-layout.html), [dev.mysql.com (event header)](https://dev.mysql.com/doc/dev/mysql-server/latest/page_protocol_replication_binlog_event.html), [dev.mysql.com (Log_event_footer)](https://dev.mysql.com/doc/dev/mysql-server/latest/classmysql_1_1binlog_1_1event_1_1Log__event__footer.html)

### L-0278 | wrong | severity: medium
- **Teacher/ledger statement:** Riak's job is to make Bitcask distributed: master-slave architecture, consensus, a proxy that routes requests, consistent hashing and data movement, with the data split into mutually exclusive sets.
- **Verbatim:** "So Riak's responsibility is to make Bitcask distributed." (teacher)
- **Issue:** Riak is masterless. Its docs say "There is no master node; no node has more responsibilities than others", and any node can coordinate a request. Consistent hashing over a ring of vnodes is right. But the data is not split into mutually exclusive sets: each object is stored on N vnodes. Riak is eventually consistent by default, not consensus-based.
- **Suggested note:** Riak distributes Bitcask Dynamo-style: a masterless ring with consistent hashing, each key replicated to N vnodes, and any node able to coordinate a request. A separate Bitcask instance runs per partition.
- **Sources:** [docs.riak.com (why Riak)](https://docs.riak.com/riak/kv/latest/learn/why-riak-kv/index.html), [docs.riak.com (clusters)](https://docs.riak.com/riak/kv/latest/learn/concepts/clusters/index.html), [docs.riak.com (Bitcask)](https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html)

### L-0112 | imprecise | severity: medium
- **Teacher/ledger statement:** S3 gives file-system-level semantics, so it can also be used as a distributed file system: you can ask for a given number of bytes at a given offset and get exactly those bytes.
- **Verbatim:** "S3 gives you all the file system level semantics because of which it can be used as a distributed file system as well." (teacher)
- **Issue:** S3 supports byte-range GETs, which is all this read-only design needs. But it is an object store, not a file system. Objects are written whole, with no in-place or random writes; renames are unsupported on general purpose buckets; the namespace is flat. AWS's Mountpoint for S3 says it "does not implement all the features of a POSIX file system".
- **Suggested note:** S3 supports ranged reads (n bytes at an offset), which is enough for this index-plus-data design. It is still object storage: objects are written whole and cannot be modified in place.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html), [github.com/awslabs/mountpoint-s3](https://github.com/awslabs/mountpoint-s3/blob/main/doc/SEMANTICS.md)

### L-0261 | imprecise | severity: medium
- **Teacher/ledger statement:** The CRC goes on the leftmost side of the record and is the first thing written and flushed; it cannot be written at the end.
- **Verbatim:** "You cannot write CRC in the end. You write CRC in the beginning." (teacher)
- **Issue:** CRC-first is a convention, used by Bitcask and LevelDB. It is not a requirement. Corruption detection works with the CRC anywhere, as long as the reader knows the record length and verifies the CRC: MySQL binlog events and PPP frames put it at the end. Bitcask's code builds the whole record (CRC included) and writes it in one call rather than flushing the CRC first.
- **Suggested note:** Many log formats (Bitcask, LevelDB) put the CRC first; others put it last. Either works if the reader knows the record length and checks the CRC before trusting the data.
- **Sources:** [bitcask_fileops.erl](https://raw.githubusercontent.com/basho/bitcask/develop/src/bitcask_fileops.erl), [leveldb log_format](https://github.com/google/leveldb/blob/main/doc/log_format.md), [dev.mysql.com](https://dev.mysql.com/doc/dev/mysql-server/latest/classmysql_1_1binlog_1_1event_1_1Log__event__footer.html), [rfc-editor.org RFC 1662](https://www.rfc-editor.org/rfc/rfc1662)

### L-0275 | imprecise | severity: medium
- **Teacher/ledger statement:** Uber uses Bitcask in production for its main ride-hailing service.
- **Verbatim:** "So Bitcask is used by Uber in production for their main ride-hailing service." (teacher)
- **Issue:** Historical and overstated. Riak's 2015 post says Uber used Riak as "a persistent data store for a portion of new dispatching services" (with Ringpop). Uber's core trip data moved from Postgres to Schemaless, its MySQL-based store (Uber Engineering, January 2016). Bitcask is Riak's default backend, but no Uber source I opened says which backend Uber ran.
- **Suggested note:** Around 2015 Uber used Riak (default backend Bitcask) for parts of its dispatch system. Its core trip data lived in Postgres and then in Schemaless, a MySQL-based store.
- **Sources:** [riak.com](http://riak.com/posts/technical/ubers-ringpop-and-riak/), [uber.com](https://www.uber.com/blog/schemaless-part-one-mysql-datastore/), [docs.riak.com](https://docs.riak.com/riak/kv/latest/setup/planning/backend/index.html)

### L-0276 | imprecise | severity: medium
- **Teacher/ledger statement:** Since Bitcask is embedded, Uber uses Riak as its main database; Riak is a simple key-value store that uses Bitcask as its back-end.
- **Verbatim:** "Uber uses Riak as their main database. Riak is a simple key-value store and Riak uses Bitcask as a back-end." (teacher)
- **Issue:** Riak as a key-value store with Bitcask as its default backend is correct. "Uber's main database" is not: Uber says it moved its core trips data from a single Postgres instance to Schemaless, and adopted Riak and Cassandra "in other areas of our infrastructure" (January 2016).
- **Suggested note:** Riak is a distributed key-value store whose default backend is Bitcask. Uber used it in parts of its dispatch platform around 2015, not as its main database.
- **Sources:** [uber.com](https://www.uber.com/blog/schemaless-part-one-mysql-datastore/), [riak.com](http://riak.com/posts/technical/ubers-ringpop-and-riak/), [docs.riak.com](https://docs.riak.com/riak/kv/latest/setup/planning/backend/index.html)

### L-0288 | imprecise | severity: medium
- **Teacher/ledger statement:** The big difference between Bitcask and SSTable/memtable (LSM) designs is that an SSTable design keeps values in memory and Bitcask does not; SSTables are also sorted.
- **Verbatim:** "But in SSTable, you also store values in memory." (teacher)
- **Issue:** Only the memtable (recent writes, keys and values) lives in memory. SSTables are immutable on-disk files. The real contrast: Bitcask keeps every key in RAM, so keys must fit in memory; an LSM tree keeps only recent writes in RAM and sorted keys and values on disk, so its keyspace can exceed RAM.
- **Suggested note:** In an LSM tree only the memtable (recent writes) is in memory; SSTables are sorted, immutable files on disk. Bitcask instead keeps every key, but no values, in memory.
- **Sources:** [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html), [docs.riak.com](https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html)

### L-0289 | imprecise | severity: medium
- **Teacher/ledger statement:** Bitcask persists every write immediately to disk by default; a memtable buffers writes and then writes them, so data can be lost if memory goes down.
- **Verbatim:** "In memtable, you buffer and then you write." (teacher)
- **Issue:** (1) LSM engines log every update to a WAL/commit log before the memtable (RocksDB, Cassandra) and replay it after a crash. Buffering in the memtable does not by itself lose data; how much is exposed depends on the log sync setting. (2) Riak's Bitcask defaults to `sync_strategy = none`, leaving flushes to the OS; per-write durability needs `o_sync`.
- **Suggested note:** Bitcask appends each write to its data file; an LSM engine appends to a write-ahead log and buffers in a memtable. In both, crash durability depends on how often the log is synced (Bitcask's default leaves it to the OS).
- **Sources:** [github.com/facebook/rocksdb wiki](https://github.com/facebook/rocksdb/wiki/Write-Ahead-Log-%28WAL%29), [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html), [docs.riak.com](https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html)

### L-0263 | wrong | severity: low
- **Teacher/ledger statement:** Network formats also put the CRC first, because those are the first bytes received.
- **Verbatim:** "Pick any network format, you'd always say CRC at the first, because that's the first byte or the first set of bytes that you..." (teacher)
- **Issue:** PPP (like Ethernet) carries its Frame Check Sequence at the end of the frame. TCP's checksum sits mid-header, after ports, sequence numbers and window. Receivers verify a frame once it has fully arrived.
- **Suggested note:** Network frames also carry checksums, often as a trailer (the PPP/Ethernet FCS), so the receiver can detect corruption.
- **Sources:** [rfc-editor.org RFC 1662](https://www.rfc-editor.org/rfc/rfc1662), [rfc-editor.org RFC 9293](https://www.rfc-editor.org/rfc/rfc9293#section-3.1)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0110 | imprecise | low | NAS means file-level storage (NFS/SMB); S3 is object storage; what's needed is any store with ranged reads. |
| L-0194 | imprecise | low | Hudi indexes map record key -> file id; Hive partitions are directory layouts; same family of ideas, not "exactly this". |
| L-0208 | simplified | low | LSM engines persist each write immediately to a WAL before the memtable; the rejection reason is weaker than stated. |
| L-0210 | simplified | low | "Zero seek" only while nothing else (gets, merges) moves the head. |
| L-0235 | imprecise | low | ext4 16 TiB, NTFS 16 TB+ (up to 8 PB), Btrfs 8 EiB; 1 TB is not a typical file size limit (FAT32's 4 GB is). |
| L-0247 | simplified | low | Real Bitcask has many more knobs (sync strategy, merge triggers/thresholds/window, expiry). |
| L-0249 | imprecise | low | Writes approach sequential bandwidth; gets still pay a random seek on HDD, far slower than SSD reads. |
| L-0250 | imprecise | low | Flash must be erased before rewrite; append/sequential writes still reduce write amplification on SSDs. |
| L-0253 | imprecise | low | Byte-at-a-time reads cost a call per byte; the page cache means not one disk I/O per byte. |
| L-0260 | simplified | low | CRC is standard but not the only checksum; it detects accidental corruption, not tampering. |
| L-0277 | simplified | low | Elasticsearch adds distribution, replication and REST over Lucene shards; more than an HTTP wrapper. |
| L-0280 | imprecise | low | Over-generalisation; throughput also comes from batching, relaxed sync, in-memory designs. |
| L-0294 | simplified | low | ext4 limits fragmentation but does not guarantee room for growing files. |
| L-0297 | imprecise | low | Header writes are not guaranteed atomic (torn sectors); the CRC catches torn headers anyway. |
| L-0299 | simplified | low | A tiny header is unlikely, not certain, to be torn; CRC is what makes it safe. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0284 | Teacher's personal Bitcask benchmark from about five years ago. |
| L-0292 | Personal college anecdote (the Sheehy & Smith 2010 Bitcask paper itself exists). |
| L-0301 | Opinion about what system design overviews cover. |
| L-0302 | Opinion; not a checkable claim. |
| L-0304 | Refers to an unnamed post about Postgres page metadata overhead. |
