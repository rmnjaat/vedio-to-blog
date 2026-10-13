# Fact-check report: databases (Lecture 03)

Scope: the 36 ledger items of topic group `databases` in `groups.json` (indexes, fundamentals, MySQL upsert, logical vs physical sharding, rebalancing, sequences). No admin items in this group. **36 items checked.** Checked 2026-10-13 against MySQL 8.4 and PostgreSQL current (18) docs. The Flickr (2010) and Instagram (2012) engineering posts are historical.

## Counts

| Verdict | Count |
|---|---|
| accurate | 20 |
| simplified | 9 |
| imprecise | 6 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 1 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 2 |
| low | 14 |
| none | 20 |

Additions proposed: 12 (see `databases_additions.jsonl`).

Calibration: live-class simplification is expected. The index-in-RAM message and the logical-shard design are right in spirit and match the Flickr and Instagram posts. I flagged items only where a reader would take away a wrong rule: absolute "all indexes must fit in RAM", "REPLACE and ON DUPLICATE KEY UPDATE are interchangeable", and MySQL-vs-PostgreSQL differences (sequences, multiple auto-increment columns). Student proposals the teacher corrected are judged on the correction, and all three corrections hold.

## Items needing a decision (ordered by severity)

### L-0136 | imprecise | severity: medium

- **Teacher/ledger statement:** To get maximum performance a database must fit all its indexes in RAM; if they do not fit, no amount of other optimization will make it fast.
- **Verbatim:** "It should be able to fit all the indexes in RAM." (teacher)
- **Issue:** A sound heuristic, stated as an absolute. Database caches (e.g. the InnoDB buffer pool) hold index and data pages as they are accessed and evict the least recently used ones. What must fit is the hot working set, not every index in full. Cold indexes on disk don't make a database slow. Indexes in RAM also don't fix missing indexes or bad queries. L-0141 and L-0156 (RAM >= total index size; provisioning minimum) are the same over-generalisation and are flagged low.
- **Suggested note:** For consistently fast queries, the frequently used part of your indexes (and hot data) should fit in the database's memory cache. If hot index pages keep being read from disk, queries slow down sharply.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html)

### L-0171 | imprecise | severity: medium

- **Teacher/ledger statement:** REPLACE INTO is about 32x slower than INSERT ... ON DUPLICATE KEY UPDATE; the teacher personally benchmarked this on a MySQL server. Either works; what matters is doing an upsert.
- **Verbatim:** "replace into is 32 times slower than this. I personally benchmarked this." (teacher)
- **Issue:** The 32x figure is the teacher's own benchmark and can't be checked publicly; the ratio depends on indexes, triggers and foreign keys. "Either works" is the misleading part. REPLACE deletes and re-inserts: any column not given is reset to its default, DELETE triggers fire, and the row gets a new AUTO_INCREMENT value. ON DUPLICATE KEY UPDATE updates the existing row in place. Flickr's ticket server (the case study at this point) uses REPLACE INTO precisely because the re-insert yields a new ID.
- **Suggested note:** REPLACE INTO deletes and re-inserts the row. It is usually slower than ON DUPLICATE KEY UPDATE (the teacher measured ~32x on one setup) and resets columns you don't supply. Use ON DUPLICATE KEY UPDATE to update in place.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/replace.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html), [code.flickr.net](https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0132 | simplified | low | The row pointer is engine-specific: InnoDB secondary indexes store the primary key, PostgreSQL stores a tuple location. |
| L-0137 | imprecise | low | Only covering/index-only plans avoid the table; ordinary index scans fetch heap rows during execution, not as a last step (PostgreSQL docs). |
| L-0138 | simplified | low | Holds for covering plans; table pages are also cached in the buffer pool. |
| L-0140 | simplified | low | Pages are cached on demand and evicted by LRU, not kept forever; MySQL reloads only ~25% of recently used pages at boot by default. |
| L-0141 | imprecise | low | Hot working set, not total index size; the cache is usually ≤ ~80% of RAM, so RAM must exceed what you want cached. |
| L-0148 | simplified | low | AUTO_INCREMENT works on any integer type; INT = 4 bytes, BIGINT = 8 bytes (Flickr used BIGINT). |
| L-0156 | simplified | low | Provisioning rule ignores data pages, headroom and working set (see L-0136). |
| L-0167 | imprecise | low | "Delete + insert = upsert" is loose; ON DUPLICATE KEY UPDATE updates in place; only REPLACE is delete+insert. |
| L-0267 | simplified | low | Instagram's logical shards were PostgreSQL schemas, not separate databases (CREATE DATABASE is the teacher's MySQL illustration). |
| L-0269 | simplified | low | Same as L-0267. |
| L-0272 | simplified | low | Instagram moves logical shards but does not say it uses SQL dumps; a live move needs write handling during cut-over. |
| L-0281 | simplified | low | "Every database has a sequencer": true for PostgreSQL; MySQL has no sequence objects, only a per-table AUTO_INCREMENT counter. |
| L-0297 | imprecise | low | Several auto-increment columns are possible in PostgreSQL, but MySQL allows only one AUTO_INCREMENT column per table. |

## Unverifiable items

| ID | Why |
|---|---|
| L-0139 | Teacher's personal practice ("first thing I do is check index sizes", "in most cases") can't be confirmed by a public source; the check itself is sound. |

## Notes on sources

- Instagram's post at instagram-engineering.com (connection refused) and its medium.com mirror (HTTP 403) could not be opened. The same post was opened at its original Tumblr URL, which is the one cited.
- MongoDB's "Ensure Indexes Fit in RAM" page returned 404 and is not cited.
