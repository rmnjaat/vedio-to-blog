# Verdict review: second fact-checker, lecture 10

Date: 2026-10-13. Scope: every verdict marked `wrong`/`outdated` or severity `medium`/`high` in `dictionary.jsonl`, `file_formats_design_principles.jsonl` and `storage_storage_engines.jsonl` (13 items: 9 medium, plus 1 wrong/low; there are no high or outdated verdicts), plus 15 randomly sampled `accurate` verdicts (Python `random.Random(16).sample` over the 238 sorted accurate ids, seed 16). I re-read each ledger item, its `verbatim` and the transcript passage around it. Every URL cited below was opened by me. When I couldn't open one, the entry says so.

## Summary

- 13 flagged verdicts re-checked: I agree with 12 and dispute 1 (a severity: L-0153 medium -> low).
- 15 sampled `accurate` verdicts: all 15 agree. 12 of the 15 cite no source ("Correct as stated for this context"). They are design reasoning or classroom moves, so that is acceptable. One (L-0199, "just 1.7 MB") inherits the 4-byte offset arithmetic of L-0056; with 8-byte offsets the index is still a few MB, so the point stands.
- 43 additions: 39 confirmed, 4 reworded (A-D-08, A-D-11, A-SSE-02, A-SSE-17), 0 rejected. See `additions_verified.jsonl`.
- Version drift since the first pass:
  - **Lucene**: the current release is 10.5.2 (https://lucene.apache.org/core/), but A-D-16 cited the 9.12 codec page. The 10.5.2 `lucene104` codec page has the same segment, segments_N and .cfs text, so I added it as the current source. The L-0037 verdict is unchanged.
  - **Cassandra**: the "latest" storage-engine page now shows 5.0, with a pre-release banner pointing to 6.0-alpha2. The commit-log/memtable/SSTable facts and the 10 s periodic sync default are unchanged. Cite it as "Cassandra 5.0 docs".
  - **PostgreSQL**: current docs are 18.6. All PG statements checked (8 kB pages, WAL CRC-32C, full_page_writes, pg_xact) hold.
  - **MySQL**: the checker pinned 8.4 (LTS). `binlog_checksum` default CRC32 is confirmed there. I did not check the 9.x innovation line.
  - **Riak**: docs "latest" is still 2.2.3, so no drift.
  - **S3**: the multipart limits (48.8 TiB, i.e. about 50 TB; 10,000 parts; 5 MiB to 5 GiB) and the 5 GB single PUT match the pages as of today.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0153 | imprecise / medium | **imprecise / low** | I agree on the substance. The S3 user guide says "Updates to a single key are atomic ... you will get either the old data or the new data, but never partial or corrupt data" (https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html), so there is no unavailable window. But the item is a student's side remark whose real point, that every deployment needs a rollback plan, is correct. Believing in a short outage window only makes a learner more cautious; it does not lead to a wrong design. The same misconception in L-0157 is graded simplified/low, and low keeps the two consistent. |

## Agreements (with extra evidence where useful)

**Dictionary: sizing and storage**
- L-0056 (wrong/medium): agree. The transcript confirms the offset points into the 1 TB data file. The Oracle Java tutorial says int is "a 32-bit signed two's complement integer ... maximum value of 2^31-1", unsigned up to 2^32-1, and long is 64-bit (https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html). 10^12 > 2^32, so the offset needs 8 bytes. Medium is right: code written from this would silently overflow. The knock-on items (L-0051, L-0058, L-0187, and L-0199 in the spot-check) are correctly graded low.
- L-0035 (imprecise/medium): agree. Transcript 01:46:23: "This is exactly what Athena is doing behind the scenes. It is creating an index, keeping it handy, along with that file." The Athena pricing page bills per TB scanned ("3 TB scanned is 3 * $5/TB = $15") and shows savings from GZIP and Parquet ("Athena only reads one-fourth of the file") (https://aws.amazon.com/athena/pricing/). **Source fix:** the checker's note and precise_version mention partitioning, but the pricing page does not. The Athena docs do: "By partitioning your data, you can restrict the amount of data scanned by each query, thus improving performance and reducing cost" (https://docs.aws.amazon.com/athena/latest/ug/partitions.html). Add that URL wherever partitioning is cited. Nuance: Parquet/ORC carry block min/max statistics that Athena uses to skip blocks (https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html), but nothing like a per-key index on a CSV.
- L-0108 (imprecise/medium): agree. The teacher's words are "Any block storage or any database ... So we have block storage ... We can just store this file on S3". The S3 guide opens "Amazon S3 is an object storage service"; the AWS comparison page places EBS under block, EFS under file and S3 under object storage (https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/). Medium fits: it is an interview-vocabulary error.

**Dictionary: updates**
- L-0153: disputed on severity only (see above).

**Storage: S3 as a file system**
- L-0112 (imprecise/medium): agree. Ranged reads are confirmed: GetObject "Downloads the specified byte range of an object", one range per request (https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html, https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html). "File system level semantics" overstates it. Mountpoint's SEMANTICS.md says it "does not implement all the features of a POSIX file system", "Renaming individual files is not supported by Amazon S3 general purpose buckets", and "All writes must be sequential" (https://github.com/awslabs/mountpoint-s3/blob/main/doc/SEMANTICS.md). Medium is justified: the same lecture goes on to build an append-only store, and a learner could wrongly assume S3 supports appends or in-place writes.

**Storage engines: CRC placement**
- L-0261 (imprecise/medium): agree. Transcript 02:30:15: "the first thing that you write, that you ensure that is at least flushed, is CRC ... You cannot write CRC in the end." Bitcask's own code builds the record with the CRC prepended, then writes it in a single `file_pwrite` (https://raw.githubusercontent.com/basho/bitcask/develop/src/bitcask_fileops.erl), so the CRC is not flushed first. LevelDB also puts the CRC first (https://github.com/google/leveldb/blob/main/doc/log_format.md). The PPP FCS sits after the data, before the closing flag (https://www.rfc-editor.org/rfc/rfc1662). "Cannot" is wrong as a rule; "convention" is right.
- L-0262 (wrong/medium): agree. `xlogrecord.h`: xl_tot_len, xl_xid, xl_prev, xl_info, xl_rmid, padding, then `xl_crc` as the last field of the fixed header (https://raw.githubusercontent.com/postgres/postgres/master/src/include/access/xlogrecord.h). `pg_xact` is "Subdirectory containing transaction commit status data" (https://www.postgresql.org/docs/current/storage-file-layout.html). The MySQL binlog event header starts with `timestamp` (https://dev.mysql.com/doc/dev/mysql-server/latest/page_protocol_replication_binlog_event.html), and the checksum is read at "event length - BINLOG_CHECKSUM_LEN", i.e. the event's trailing bytes (https://dev.mysql.com/doc/dev/mysql-server/latest/classmysql_1_1binlog_1_1event_1_1Log__event__footer.html). Small wording fix: the footer page does not itself say "4 bytes". That is the CRC32 width, which is correct but inferred.
- L-0263 (wrong/low): agree. RFC 1662 places the FCS after Information/Padding. RFC 9293 puts the TCP checksum after Window, before Urgent Pointer (https://www.rfc-editor.org/rfc/rfc9293). The note's "as Ethernet does" is correct but has no source among the URLs; drop it or cite IEEE 802.3 if the page shows it. Low fits: a supporting aside.

**Storage engines: Bitcask, Riak and Uber**
- L-0275 (imprecise/medium) and L-0276 (imprecise/medium): agree. Riak's post (May 7, 2015): "Riak acts as a persistent data store for a portion of new dispatching services" (https://riak.com/posts/technical/ubers-ringpop-and-riak/; the http:// URL redirects to https). That post does not mention Bitcask. Uber (January 12, 2016) "migrated Uber's core trips data from a single Postgres instance to Schemaless" and adopted Riak and Cassandra "in other areas of our infrastructure" (https://www.uber.com/blog/schemaless-part-one-mysql-datastore/). Riak's backend table marks Bitcask as the "Default Riak KV backend" (https://docs.riak.com/riak/kv/latest/setup/planning/backend/index.html). "Imprecise" rather than "wrong" is fair, because Uber did run Riak, whose default backend is Bitcask. The note should keep the "historical, around 2015" framing.
- L-0278 (wrong/medium): agree. Transcript 02:38:11 lists "Master, slave, architecture, distributedness, consensus, whatnot" as what Riak adds. That is a loose list, but a learner would come away thinking Riak is master-slave. Riak docs: "There is no \"master\" node; no node has more responsibilities than others" and "Riak is used as an eventually consistent system" (https://docs.riak.com/riak/kv/latest/learn/why-riak-kv/index.html). Writes go "to that vnode as well as to the vnodes responsible for the next N-1 partitions", and "any node may participate as the coordinating node" (https://docs.riak.com/riak/kv/latest/learn/concepts/clusters/index.html). Nuance: the ring's partitions are disjoint key ranges, so "mutually exclusive" is half right at the partition level. What is wrong is that data is not stored once; each key lives on N vnodes.

**Storage engines: Bitcask vs LSM**
- L-0288 (imprecise/medium): agree. Transcript 02:43:37: "in SSTable, you also store values in memory. Here we are not storing values in memory." Cassandra docs: memtables are flushed and "SSTables are immutable, and never written to again after the memtable is flushed" (https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html, 5.0 docs). Riak: "Bitcask keeps all keys in memory at all times" (https://docs.riak.com/riak/kv/latest/setup/planning/backend/bitcask/index.html). The key-in-RAM vs recent-writes-in-RAM contrast is the core interview point, so medium fits.
- L-0289 (imprecise/medium): agree. RocksDB: every update goes to the memtable and the WAL, and "write ahead logs can be used to completely recover the data in the memtable" (https://github.com/facebook/rocksdb/wiki/Write-Ahead-Log-%28WAL%29). Cassandra's periodic sync "can lose up to the sync period". Riak's Bitcask default `none` "writes data into operating system buffers", and `o_sync` "forces syncs on every write". Both halves of the item are off.

## Spot-check of 15 accurate verdicts (random, seed 16)

Sample: L-0004, L-0075, L-0077, L-0085, L-0096, L-0122, L-0134, L-0136, L-0145, L-0151, L-0155, L-0199, L-0206, L-0222, L-0267.

| ID | Agree? | Comment |
|---|---|---|
| L-0004 | yes | Requirement statement; no checkable fact. |
| L-0075 | yes | Fixed-size header is a design choice; the checker's Parquet contrast is correct (4-byte length field confirmed). |
| L-0077 | yes | The checker rightly notes O-U-R-D-I-C-T is 7 letters, while OUR_DICT is 8 bytes; PNG 8-byte signature confirmed. |
| L-0085 | yes | Portability claim correct for a self-describing file. |
| L-0096 | yes | Student proposal and the teacher's ruling, reported faithfully. |
| L-0122 | yes | Design step. |
| L-0134 | yes | Advice, no factual claim. |
| L-0136 | yes | Student proposal reported faithfully. |
| L-0145 | yes | Streaming merge does not need the whole file in memory. |
| L-0151 | yes | Matches the transcript ("parallel setup"). |
| L-0155 | yes | Advice. |
| L-0199 | yes | 1.7 MB inherits the 4-byte offset (L-0056); with 8-byte offsets it is about 2.4 MB, still small. The point (ship the index itself) holds. |
| L-0206 | yes | Seek and rotational latency dominate HDD I/O; standard. |
| L-0222 | yes | Matches Bitcask: append first, then update the keydir (bitcask_fileops.erl write path). |
| L-0267 | yes | Matches the real Bitcask record (CRC, tstamp, ksz, vsz, key, value). |

Result: 15/15 agree.

## Notes on cited URLs

- All URLs cited by the checkers for flagged items and additions were opened today, and all loaded.
- `http://riak.com/posts/technical/ubers-ringpop-and-riak/` is fetched over https (the tool upgrades it), dated May 7, 2015.
- `https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT` now serves APPNOTE 6.3.10 (Nov 2022). `pkwaredownloads.../APPNOTE-6.3.9.TXT` is the pinned older copy. The central-directory text is the same in both.
- `https://aws.amazon.com/athena/pricing/` does not mention partitioning (see L-0035, A-D-11). Use `https://docs.aws.amazon.com/athena/latest/ug/partitions.html` for that claim.
- The MySQL `Log__event__footer` page gives the checksum position as `event length - BINLOG_CHECKSUM_LEN` without stating the length; "4 bytes" comes from the CRC32 width.
- The OED 171,476 figure (L-0187) was confirmed only on alphadictionary.com ("contains full entries for 171,476 words in current use"), a secondary source, as the checker said.
- I did not open the Bitcask paper PDF (riak.com/assets/bitcask-intro.pdf); no verdict or addition relies on it.
- Version-pinned pages: Lucene 9.12 (current 10.5.2, same content), PostgreSQL 18.6, MySQL 8.4, Cassandra 5.0, Riak KV 2.2.3.
