# Fact-check report: dictionary (Lecture 10)

Scope: the 140 ledger items in topic group `dictionary` (topics starting with `dictionary >`). This covers the word-dictionary-without-a-DB problem: requirements, file format, index sizing, the single-file layout, serving from S3 and the weekly update and reload flow. No admin items in this group. **140 items checked.** Checked on 2026-10-13. AWS S3/Athena/Auto Scaling docs, Redis docs and the Lucene 9.12 file-format docs were read as of that date.

## Counts

| Verdict | Count |
|---|---|
| accurate | 119 |
| simplified | 10 |
| imprecise | 9 |
| wrong | 1 |
| unverifiable | 1 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 4 |
| low | 16 |
| none | 120 |

Additions proposed: 17 (see `dictionary_additions.jsonl`).

Calibration: this is a design brainstorm. Most items are design moves, student proposals and the teacher's rulings, and these are judged as reasoning in context. They are `accurate` when the reasoning holds for the stated constraints: one file, read-heavy, weekly batch updates, no database. Items are flagged only where a concrete technical fact is off: the 4-byte offset, the word-length figure, the 'block storage' label, the Athena internals, S3 overwrite semantics and Lucene/ZIP file structure. The deliberately artificial 1 TB / 170,000-word sizing is treated as a given (the teacher explains it in L-0305). The arithmetic in the sizing items was recomputed.

## Items needing a decision (ordered by severity)

### L-0056 | wrong | severity: medium

- **Teacher/ledger statement:** The offset is an integer, which takes 4 bytes.
- **Verbatim:** "Offset is integer. Integer will take up 4 bytes." (teacher)
- **Issue:** The data file is 1 TB = 10^12 bytes. A 32-bit integer reaches only 2^31-1 (about 2.1 GB) signed, or 2^32-1 (about 4.3 GB) unsigned. Addressing 1 TB needs at least 40 bits, so in practice offsets are 64-bit (8-byte) integers. The 4-byte figure also feeds L-0051, L-0057/L-0058 and the prepared sizing L-0187.
- **Suggested note:** For a 1 TB file the offset must be a 64-bit (8-byte) integer, because a 4-byte integer can only address about 4 GB. The index is still only a few MB, so it still fits in RAM.
- **Sources:** [docs.oracle.com](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)

### L-0035 | imprecise | severity: medium

- **Teacher/ledger statement:** On AWS you can upload a plain CSV to S3 and query it with Athena. The detail, revisited at 01:46:23, says Athena creates an index kept handy with the file and on a request goes to the file, reads the records and serves them.
- **Verbatim:** "This is exactly what Athena is doing behind the scenes. It is creating an index, keeping it handy, along with that file." (teacher, 01:46:23)
- **Issue:** Querying CSV on S3 with Athena is correct. The internals are not. Athena is a scan-based SQL engine billed per TB scanned. Cost and speed come from compression, partitioning and columnar formats (Parquet lets Athena read only the needed columns), not from a per-row index on CSV. Learners may expect cheap pointed lookups from Athena.
- **Suggested note:** Athena runs SQL directly over files in S3 by scanning them (billed per TB scanned). Partitioning, compression and columnar formats like Parquet reduce how much it reads. It does not build a row index over a CSV the way this dictionary design does.
- **Sources:** [aws.amazon.com/athena/pricing](https://aws.amazon.com/athena/pricing/)

### L-0108 | imprecise | severity: medium

- **Teacher/ledger statement:** A common place accessible over the network is any block storage or a database. Databases are ruled out, so the gigantic file goes on block storage such as S3.
- **Verbatim:** "Any block storage or any database, but we cannot use database. So we have block storage ... We can just store this file on S3" (teacher)
- **Issue:** Wrong storage category. S3 is object storage. Block storage is Amazon EBS (volumes attached to an instance), and shared network file systems are file storage (Amazon EFS). An interview answer calling S3 'block storage' would be marked wrong.
- **Suggested note:** S3 is object storage (whole objects fetched over HTTP by key), not block storage (EBS) or file storage (EFS). Choosing S3 here is right.
- **Sources:** [aws.amazon.com](https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

### L-0153 | imprecise | severity: medium

- **Teacher/ledger statement:** Student answer on same-path upload, endorsed: there may be a short window where the file cannot be served while it uploads, and any deployment needs a rollback plan.
- **Verbatim:** "when you think about a deployment, you need to think about the rollback part." (student)
- **Issue:** The rollback point is valid. But on S3 a same-key overwrite has no unavailable or partial window. Single-key updates are atomic, and a concurrent GET returns "either the old data or the new data, but never partial or corrupt data". The real same-path problems are the stale index offsets (L-0158) and losing the old copy for rollback unless versioning is on.
- **Suggested note:** Overwriting the same S3 key is atomic, so readers get the old or the new object, never a partial one. The problems with the same path are that existing indexes stop matching the file and that the old copy is gone for rollback unless versioning is enabled.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

## Other non-accurate items (id | verdict | severity | one-line issue)

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0016 | simplified | low | You can stream-parse JSON without loading it all into memory (and JSON Lines exists), but a lookup is still a full scan. |
| L-0030 | imprecise | low | A ZIP has a central directory with member offsets, so one member can be read without extracting all; the real objection is many logical, compressed files. |
| L-0036 | simplified | low | Athena is a scan-based engine; the dictionary is a point-lookup KV store. They share only the idea of querying plain files on S3. |
| L-0037 | imprecise | low | A Lucene index is one or more segments, each a set of files (optionally one .cfs per segment), plus segments_N, so it is not one file. |
| L-0045 | imprecise | low | Reads do not make sectors 'go bad'. Drives have rated workloads (reads plus writes) and reliability declines above them. |
| L-0046 | simplified | low | Indexing is the main tool, not the only one (caching, layout, batching). |
| L-0051 | simplified | low | Comparison is right, but offsets must be 8 bytes for 1 TB (L-0056). |
| L-0055 | imprecise | low | 4.3-4.8 letters is the running-text average; distinct words average about 7.6 letters (Norvig). |
| L-0058 | simplified | low | Arithmetic right for its inputs; with 8-byte offsets and ~7.6-char words the index is ~3 MB. It still fits in RAM. |
| L-0117 | simplified | low | It is a read-only KV store; a 'database' usually also means writes, transactions, durability. |
| L-0121 | imprecise | low | A cron job is a batch job on a schedule (a K8s CronJob creates Jobs). The terms overlap. |
| L-0139 | simplified | low | Sorting is needed for the merge, but with a small changelog in a hash map an unsorted file can also be rewritten in one linear pass. |
| L-0157 | simplified | low | On S3 a failed upload leaves the old object intact (atomic overwrite). The real risks are stale offsets, bad-but-complete files and lost rollback copy. |
| L-0181 | imprecise | low | S3 returns ETag/Last-Modified on every GET, and If-Match makes a ranged GET fail with 412 if the file changed. |
| L-0187 | simplified | low | Prepared sizing arithmetic is right, but 4.7 is a running-text average and 4-byte offsets cannot address 1 TB. |
| L-0310 | simplified | low | The merge is O(n + m), but the alternative is not necessarily O(n^2) (hash-map single pass). |

## Unverifiable items (id | why no public source can confirm)

| ID | Why |
|---|---|
| L-0308 | Teacher's war story about his own services (first Redis Pub/Sub plus reload APIs, then a deployment trigger). This is private experience; the technique itself is standard (see L-0183). |

## Notes on sources

- The OED word count (171,476 in current use) was confirmed only on a secondary reference (alphadictionary.com). The Wayback copy of the old Oxford/Lexico page could not be fetched, and no oed.com page with the figure was found.
- S3 limits as of 2026-10-13: single PUT up to 5 GB, multipart objects up to 48.8 TiB (~50 TB), 10,000 parts of 5 MiB to 5 GiB (A-D-06).
- A Bitcask paper (riak.com PDF) was considered for an addition on append-plus-compaction but could not be read as text, so nothing cites it.
