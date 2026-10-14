# Lecture 06 (lec03): fact-check treatments applied

Policy (from `lectures/LESSON_DESIGN_BRIEF.md`, applied mechanically):
- **wrong / outdated (any severity), imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely"; "Since the class" for the outdated item) sits directly beside it with the precise version and its source.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added). There are no simplified-medium items in this lecture.
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, never as a correction. The checker's nuance is recorded below for the writer, not shown as a fix.
- **unverifiable:** stated as the lecture's (or the instructor's first-hand) account or opinion, with no empty source link. All unverifiable items here are low or none severity, so none needs the 'not independently verified' tag.
- Hedges stay hedges ("almost impossible", "rough estimate, don't quote it", "35 years"); opinions stay attributed; arithmetic is shown where the lecture gives numbers (outline "Voice rules").

Verdict overrides from `verdict_review.md` are applied (they are already in `final.jsonl`): **L-0081** imprecise/low (was imprecise/medium) and **L-0294** imprecise/low (was imprecise/medium), so both get inline clarifications, not SourceNotes. The L-0294 inline text uses the corrected MySQL reading (allocation stays increasing; commit order can differ). Additions reworded by the verifier are used in their reworded form (`final_text`).

Counts: 299 items checked; 97 flagged = 16 with a SourceNote (16 notes) + 26 inline clarifications + 39 left as taught + 16 attributed as unverifiable. 15 ledger items had no verdict (section 5). Additions: 49 used, 3 not used.

## 1. SourceNotes

### SN-01 · §3.4 · L-0067 (wrong/low)
- **Teacher's point (kept):** Heat (e.g. a high-intensity game heating the CPU) makes the quartz crystal vibrate faster so the clock runs fast; an extremely cold environment slows the vibration so the clock runs slow.
- **More precisely:** Quartz frequency varies with temperature (for common 32.768 kHz crystals the error grows roughly with the square of the distance from about 25 C), so clocks drift and need syncing.
- **Additions used:** A-IG-25
- **Sources:** https://ecsxtal.com/?p=1063

### SN-02 · §3.6 · L-0076 (wrong/high)
- **Teacher's point (kept):** On a single machine, clock skew does not break ordering: when NTP sync finds the clock is ahead (24 instead of 23), the clock does not jump back; it slows its counting until real time catches up, so the clock never goes...
- **More precisely:** For small offsets NTP slews (slows or speeds) the clock instead of jumping, but the wall clock can still step backwards, so time-based ID generators must detect that and wait or refuse.
- **Additions used:** A-IG-01, A-IG-02
- **Sources:** https://www.ntp.org/documentation/4.2.8-series/ntpd/ · https://chrony-project.org/doc/4.6/chrony.conf.html · https://man7.org/linux/man-pages/man2/clock_gettime.2.html · https://github.com/twitter-archive/snowflake/tree/snowflake-2010

### SN-03 · §3.6 · L-0077 (imprecise/medium)
- **Teacher's point (kept):** If ID generation sticks to one server, its clock always moves forward, so it always produces monotonically increasing IDs regardless of where requests come from.
- **More precisely:** Only true if the generator guards against the wall clock stepping backwards (see L-0076). Snowflake refuses to issue IDs until time passes the last ID it generated, or else you can use a monotonic clock or keep the last value in memory and never go below it.
- **Sources:** https://github.com/twitter-archive/snowflake/tree/snowflake-2010 · https://man7.org/linux/man-pages/man2/clock_gettime.2.html

### SN-04 · §3.8 · L-0093 (outdated/low)
- **Teacher's point (kept):** Why not use a UUID instead of all this complexity? You can, if it is okay to relax the constraint - not everyone needs strict monotonicity; but with UUIDs you lose ordering (you get some, you lose some).
- **Since the class:** Random UUIDs (v4) lose ordering; time-ordered UUIDv7 (RFC 9562, 2024) keeps rough creation order at 128 bits.
- **Additions used:** A-IG-05
- **Sources:** https://www.rfc-editor.org/rfc/rfc9562.html · https://www.postgresql.org/docs/18/functions-uuid.html

### SN-05 · §4.1 · L-0129 (imprecise/medium)
- **Teacher's point (kept):** Companies at scale do not prefer UUIDs because they are extremely inefficient at scale.
- **More precisely:** Random (v4) UUIDs index poorly at scale because inserts land at random places in the index, and at 16 bytes they enlarge every index; time-ordered UUIDv7 or 64-bit IDs avoid most of this.
- **Additions used:** A-IG-04
- **Sources:** https://www.rfc-editor.org/rfc/rfc9562.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html

### SN-06 · §4.3 · L-0136 (imprecise/medium)
- **Teacher's point (kept):** To get maximum performance a database must fit all its indexes in RAM; if they do not fit, no amount of other optimization will make it fast.
- **More precisely:** For consistently fast queries, the frequently used part of your indexes (and hot data) should fit in the database's memory cache; if hot index pages keep getting read from disk, queries slow down sharply.
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html

### SN-07 · §4.4 · L-0143 (imprecise/medium)
- **Teacher's point (kept):** UUIDs are good for security: they look random and the next one cannot be predicted, so it is hard for anyone to predict other IDs or scrape the whole website.
- **More precisely:** Random (v4) UUIDs make IDs hard to enumerate, which slows scraping, but they are not a security control; every request still needs an authorization check.
- **Additions used:** A-IG-07
- **Sources:** https://www.rfc-editor.org/rfc/rfc9562.html · https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html

### SN-08 · §5.4 · L-0303 (imprecise/medium)
- **Teacher's point (kept):** Reading ranges from a queue offloads atomicity to the queue's reads; the core property is atomic reads, and any system that provides it - the database, a queue, DynamoDB, Redis - is good enough.
- **More precisely:** Any store with an atomic increment-and-return (a SQL transaction, DynamoDB atomic counter, Redis INCRBY) can hand out ranges; an at-least-once queue can redeliver a range and needs deduplication.
- **Additions used:** A-IG-22, A-IG-23
- **Sources:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html · https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html

### SN-09 · §5.6 · L-0171 (imprecise/medium)
- **Teacher's point (kept):** REPLACE INTO is about 32x slower than INSERT ... ON DUPLICATE KEY UPDATE; the teacher personally benchmarked this on a MySQL server. Either works - what matters is doing an upsert.
- **More precisely:** REPLACE INTO deletes and re-inserts the row, so it is usually slower than INSERT ... ON DUPLICATE KEY UPDATE (the teacher measured ~32x on one setup) and it resets columns you don't supply; prefer ON DUPLICATE KEY UPDATE unless you want a fresh row.
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/replace.html · https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html · https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html · https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/

### SN-10 · §5.6 · L-0172 (imprecise/medium)
- **Teacher's point (kept):** Flickr's ID query: INSERT INTO tickets (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id + 1, with a constant stub value; the insert hits the existing 'a', so the update bumps the id (e.g. 74 to 75) and returns it;...
- **More precisely:** Flickr gets an ID with REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID(); the REPLACE forces a fresh auto-increment value on the single row.
- **Additions used:** A-IG-09
- **Sources:** https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/ · https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html

### SN-11 · §5.8 · L-0300 (wrong/medium)
- **Teacher's point (kept):** Flickr only said abstractly that the servers need to gossip; how is up to you - it can be as simple as making network calls to check the greatest IDs, agreeing on a value and adding a buffer; you can write your own...
- **More precisely:** Flickr's two ticket servers never coordinate: odd/even auto-increment offsets keep IDs unique, and the sides are allowed to drift apart.
- **Sources:** https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/

### SN-12 · §6.2 · L-0207 (wrong/low)
- **Teacher's point (kept):** Snowflake would only see a collision if one machine handled more than 4096 requests in one millisecond; the teacher equates more than 4,000 requests per millisecond to 400,000 requests per second and says no one does...
- **More precisely:** One Snowflake generator can issue up to 4,096 IDs per millisecond, about 4 million per second.
- **Sources:** https://github.com/twitter-archive/snowflake/tree/snowflake-2010

### SN-13 · §6.3 · L-0201 (wrong/medium)
- **Teacher's point (kept):** Snowflake is not a service: it is a library inside the API servers, just normal integer bit manipulation.
- **More precisely:** Twitter's Snowflake ran as a separate network service (a Thrift server), but the same bit layout is often implemented as a library inside app servers, e.g. Sony's Sonyflake.
- **Additions used:** A-IG-15
- **Sources:** https://github.com/twitter-archive/snowflake/tree/snowflake-2010 · https://github.com/sony/sonyflake · https://github.com/twitter-archive/snowflake

### SN-14 · §6.4 · L-0209 (wrong/low)
- **Teacher's point (kept):** Snowflake generation is plain bit manipulation: take the current time, the machine ID and the static counter incremented atomically; left-shift the time by 23 bits and combine the parts with bitwise OR.
- **More precisely:** Snowflake ID = (ms_since_epoch << 22) | (machine_id << 12) | sequence.
- **Sources:** https://github.com/twitter-archive/snowflake/tree/snowflake-2010 · https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/

### SN-15 · §8.3 · L-0229 (imprecise/medium)
- **Teacher's point (kept):** ID-limit pagination is very efficient because MongoDB collections and SQL tables are physically stored ordered by primary key.
- **More precisely:** ID-limit pagination is efficient because an index on the ID (in InnoDB, the clustered primary key) lets the database seek directly to the last ID and read the next rows in order, so cost does not grow with depth.
- **Additions used:** A-PEM-05, A-PEM-06
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html · https://www.postgresql.org/docs/current/sql-cluster.html · https://www.mongodb.com/docs/manual/core/clustered-collections/

### SN-16 · §8.5 · L-0234 (imprecise/medium)
- **Teacher's point (kept):** Disadvantage of ID-based pagination: you cannot apply complex WHERE clauses; that is acceptable when it fits your use case.
- **More precisely:** Disadvantage of ID/keyset pagination: you cannot jump to an arbitrary page, and it needs a deterministic sort key with an index covering the filter and sort; queries that do not fit an index still fall back to offset.
- **Additions used:** A-PEM-03, A-PEM-04
- **Sources:** https://use-the-index-luke.com/sql/partial-results/fetch-next-page · https://use-the-index-luke.com/no-offset · https://www.mongodb.com/docs/manual/reference/method/cursor.skip/

## 2. Light inline clarifications (imprecise, low)

| id | verdict | § | treatment on the page | sources |
|---|---|---|---|---|
| L-0022 | imprecise/low | 2.3 | A static counter is a single process-wide variable (static storage, not heap) that every thread shares, so its increment must be atomic. | https://en.cppreference.com/w/cpp/language/storage_duration |
| L-0054 | imprecise/low | 3.2 | Strictly increasing means every new ID is larger than all earlier ones (gaps allowed); gap-free 1, 2, 3, ... is a stronger property usually called sequential or consecutive. | https://mathworld.wolfram.com/StrictlyIncreasingFunction.html |
| L-0060 | imprecise/low | 3.3 | Time-sortable ID schemes put the timestamp in the most significant bits, so IDs sort roughly by creation time. | https://www.rfc-editor.org/rfc/rfc9562.html · https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/ |
| L-0081 | imprecise/low (override) | 3.7 | Strictly monotonic IDs across machines need coordination - a single (replicated) timestamp oracle or specially bounded clocks - which costs latency and availability; independent generators can only be roughly ordered. Uses A-IG-20, A-IG-21. | https://docs.pingcap.com/tidb/stable/tso/ · https://docs.cloud.google.com/spanner/docs/true-time-external-consistency |
| L-0135 | imprecise/low | 4.2 | 16 bytes is 4x a 4-byte INT but only 2x a BIGINT, the realistic comparison (Snowflake-style IDs are 8 bytes). Index size also does not scale linearly with key size, because entries carry row pointers and page overhead (the teacher hedges this in L-0154). In InnoDB the primary key is repeated in every secondary index, so a long PK grows all of them. | https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html |
| L-0137 | imprecise/low | 4.3 | The planner uses indexes to find matching rows cheaply; if the index covers every column the query needs it may never touch the table, otherwise it fetches table rows as it goes. Uses A-D-03. | https://www.postgresql.org/docs/current/indexes-index-only-scans.html |
| L-0141 | imprecise/low | 4.3 | Size the database's memory cache (e.g. InnoDB buffer pool) to hold the hot indexes and data; RAM must exceed that, since the cache is usually at most ~80% of RAM. | https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html |
| L-0151 | imprecise/low | 5.5 | Flickr launched on 10 February 2004 and was one of the most popular websites by 2007 (19th by Alexa rank), before Instagram's 2010 launch. 'Instagram of the 2000s' would be the accurate comparison. | https://en.wikipedia.org/wiki/Flickr |
| L-0167 | imprecise/low | 5.6 | A delete-then-insert in one transaction can be replaced by a single upsert statement (insert, or update the existing row if the key already exists). | https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html · https://dev.mysql.com/doc/refman/8.4/en/replace.html · https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html |
| L-0189 | imprecise/low | 6.1 | Twitter's original Snowflake (2010) was 'a network service for generating unique ID numbers', a Thrift server in Scala, not in-process logic. The decentralised in-library pattern the teacher describes is valid and widely used; it just isn't how Twitter first deployed it. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0199 | imprecise/low | 6.2 | In Twitter's original design the 10-bit 'configured machine id' identified a Snowflake server process (the README's 'up to 1024 machines'), not a tweet API server, because Snowflake ran as a separate service. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0200 | imprecise/low | 6.3 | A fair design sketch, but Twitter's 2010 Snowflake was a separate network service the API tier called for IDs, not a function inside the API servers. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0202 | imprecise/low | 6.2 | The 10-bit field caps Snowflake generator processes at 1024 ('gives us up to 1024 machines'), not tweet API servers. With Snowflake as a separate service, the API tier could grow independently. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0210 | imprecise/low | 6.3 | The no-central-service benefit holds when the logic runs as a library (Sonyflake, Instagram's in-DB function). Twitter's own 2010 Snowflake was a separate network service; its decentralisation was that Snowflake servers did not coordinate with each other ('Uncoordinated'). | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 · https://github.com/sony/sonyflake |
| L-0211 | imprecise/low | 6.3 | Twitter did run a separate Snowflake service (a Thrift server) and scaled it. What made it scale was that generator nodes need no coordination with each other. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0250 | imprecise/low | 8.6 | Elasticsearch's from/size pagination is capped by default at 10,000 hits (index.max_result_window); beyond that use search_after with a point in time. Uses A-PEM-09. | https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results |
| L-0256 | imprecise/low | 7.1 | Instagram did not use Twitter's Snowflake. It built its own Snowflake-like 64-bit layout (41-bit ms time, 13-bit shard, 10-bit sequence) as a PL/pgSQL function in each PostgreSQL schema, which avoided running a separate ID service. | https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/ |
| L-0261 | imprecise/low | 7.2 | The epoch constant in Instagram's published function is 1314220021721 ms, which is 24 August 2011, 21:07 UTC, not 1 January 2011 (the board reader flagged the mismatch). The custom-epoch idea is right. | https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/ |
| L-0276 | imprecise/low | 7.3 | Instagram's shards are PostgreSQL, not MySQL: logical shards are Postgres schemas spread over a few physical servers. The 13-bit field caps logical shards at 8192. The exact physical-server count could not be checked because the Instagram post would not open. | https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/ |
| L-0280 | imprecise/low | 7.4 | The variables match Instagram's function, but the epoch value 1314220021721 is 24 August 2011, not 1 January 2011 (see L-0261). | https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/ |
| L-0283 | imprecise/low | 7.4 | The arithmetic (now_ms - epoch) << 23 is exactly Instagram's code, but the custom epoch is 24 August 2011, not 1 January 2011 (see L-0261). | https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/ |
| L-0292 | imprecise/low | 7.6 | The 10-bit field limits Snowflake generator processes (1024 'machines'), not API servers; Twitter ran Snowflake as a separate service. | https://github.com/twitter-archive/snowflake/tree/snowflake-2010 |
| L-0294 | imprecise/low (override) | 6.5 | Snowflake IDs are only roughly time-ordered. A single database's auto-increment gives unique, increasing values per insert, but concurrent transactions can commit out of ID order. | https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html |
| L-0297 | imprecise/low | 7.5 | In PostgreSQL a table can have several sequence-backed columns; MySQL allows only one AUTO_INCREMENT column per table. | https://dev.mysql.com/doc/refman/8.4/en/create-table.html · https://www.postgresql.org/docs/current/datatype-numeric.html |
| L-0299 | imprecise/low | 5.8 | Flickr's post never mentions gossip; its servers do not talk to each other. Lamport clocks are logical clocks for ordering events and can appear in gossip-based systems, so 'not used for gossip' is too strong, but the answer has little practical weight. | https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/ |
| L-0301 | imprecise/low | 5.8 | Only for the optional aesthetic reset of L-0182. Flickr's actual design needs no consensus: the odd/even split keeps IDs unique without the servers agreeing on anything. | https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/ |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (for the writer; not shown as a correction) | 'keep' addition woven in |
|---|---|---|---|
| L-0028 | 2.3 | 2^32 is about 4.29 billion only for an unsigned 32-bit integer; a signed 32-bit INT (the default in most databases and languages) tops out at 2,147,483,647 (about 2.1 billion). 2^64 (about 1.8 x 10^19) is effectively inexhaustible. | - |
| L-0033 | 2.4 | Writing the counter to a file is not enough to survive a machine crash or power loss: the write may sit in the OS page cache. Only fsync() (or opening with O_SYNC/O_DSYNC) forces it to the device so it can be retrieved after a crash; that is also what makes each save expensive. | A-IG-03 |
| L-0064 | 3.4 | In practice clock sync is a daemon (chronyd, ntpd, systemd-timesyncd) that runs continuously and disciplines the clock by gradually speeding it up or slowing it down, rather than a periodic job that resets it. | - |
| L-0073 | 3.5 | Hedged correctly ('almost impossible'), but systems do provide globally increasing timestamps: Spanner's TrueTime gives monotonically increasing timestamps across all servers, and TiDB's PD hands out timestamps that never regress. They pay for it with coordination (a single elected timestamp oracle, or special clocks plus waiting). Uncoordinated generators cannot do it. | - |
| L-0083 | 3.7 | MySQL auto-increment values are unique and increasing, but not gap-free: values used by rolled-back transactions are lost, and with InnoDB's default interleaved lock mode concurrent inserts are interleaved. | A-IG-13 |
| L-0084 | 3.7 | Unconfigured, yes. But MySQL provides auto_increment_increment/offset for exactly this (source-to-source replication), and Group Replication in multi-primary mode sets them automatically (increment 7, offset = server ID). You get uniqueness, not monotonicity. | A-IG-12 |
| L-0122 | 5.3 | Simple, yes, but the single database is now a single point of failure for every service that needs IDs, so in practice it is replicated or run as a pair (Flickr ran two ticket servers for this reason). Range batching keeps it off the hot path, so a short outage is survivable. | - |
| L-0127 | 5.3 | About 4.29 billion only for an unsigned 4-byte integer; a signed 32-bit INT stops at about 2.1 billion. Moving to 64 bits is the right fix. | - |
| L-0132 | 4.2 | Right picture: a B-tree/B+tree index stores the indexed values plus a pointer to the row, managed by the database. What the 'row ID' is depends on the engine. In InnoDB (MySQL 8.4) each secondary-index record holds the primary-key columns and InnoDB uses that value to look up the row in the clustered index. PostgreSQL indexes point to a physical tuple location instead. | - |
| L-0138 | 4.3 | Holds for covering/index-only plans. Otherwise table rows are read during execution too. Those reads are often RAM hits as well, because the buffer pool caches table data as well as index pages (InnoDB, MySQL 8.4). | - |
| L-0140 | 4.3 | Index pages are loaded into memory on demand and cached, but they are not kept indefinitely. InnoDB caches table and index data as it is accessed and evicts least-recently-used pages when room is needed. At boot, MySQL 8.4 by default reloads only the most recently used 25% of pages, saved at the previous shutdown, not all indexes. | A-D-02 |
| L-0148 | 4.5 | AUTO_INCREMENT works on any MySQL integer type. INT is 4 bytes (unsigned max 4,294,967,295) and BIGINT is 8 bytes; Flickr's ticket table itself uses bigint unsigned auto_increment. MySQL advises the smallest type that holds the maximum value you need. Once the type's upper limit is reached, the next insert fails. | A-D-07 |
| L-0156 | 4.3 | Rule of thumb from the teacher's experience. A more careful version sizes for the hot working set of indexes and data and leaves headroom: the buffer pool usually takes at most ~80% of RAM, so RAM must be larger than whatever you want cached. | - |
| L-0185 | 5.8 | auto_increment_increment and auto_increment_offset are dynamic MySQL variables, so no process reboot is needed. Flickr did not reset at all; it lets the two sides drift ('this hurts no one'). | - |
| L-0190 | 6.1 | Twitter retired the open-source 2010 release (repo archived Sept 2021); the README says the internal version is a full rewrite on Twitter's infrastructure. Tweet IDs are still Snowflake-format 64-bit integers. | - |
| L-0197 | 6.2 | Twitter's 41-bit time field counts milliseconds from a custom epoch ('millisecond precision w/ a custom epoch gives us 69 years'), not from 1970. The top bit is unused, so IDs stay positive as signed 64-bit integers (1 + 41 + 10 + 12 = 64). | - |
| L-0203 | 6.2 | Layout right. Two details: 41 + 10 + 12 = 63, so one top bit stays zero to keep IDs positive. And the sequence 'rolls over every 4096 per machine (with protection to avoid rollover in the same ms)' - if 4096 IDs are used up within one millisecond the generator waits for the next. | - |
| L-0208 | 6.4 | The core bit-packing is a few lines. A correct generator also has to wait for the next millisecond when the 4096 sequence values are exhausted, and handle the clock moving backwards (Snowflake refuses to issue IDs until time catches up). | - |
| L-0212 | 8.1 | Twitter/X paginates timelines by tweet ID cursors (since_id for newer, max_id/until_id or a next_token for older), not by limit/offset. | A-PEM-11 |
| L-0217 | 8.1 | Limit-offset: SELECT ... WHERE user_id = ? ORDER BY id LIMIT 10 OFFSET 0, then OFFSET 10, 20 ...; without a unique ORDER BY the pages are not stable. | A-PEM-02 |
| L-0222 | 8.4 | This is right for the common engines: PostgreSQL, MongoDB and Elasticsearch docs all say deep offsets are costly, and that seek/range queries are the fix. 'Literally every database' over-generalises. How much offset costs and how much keyset helps depend on the engine and on whether an index matches the sort. | - |
| L-0225 | 8.1 | Keyset (ID-based) pagination is not limited to plain table iteration. It works with WHERE filters and other sort orders when an index matches the filter plus sort columns, e.g. an index on (sale_date, sale_id) with a row-values predicate. Its real limits are a deterministic sort order and no jumping to arbitrary pages. | - |
| L-0227 | 8.3 | ID-limit pagination needs comparable IDs; auto-increment, ObjectId and Snowflake IDs all compare, though time-based IDs are only roughly time-ordered. | A-PEM-07, A-PEM-08 |
| L-0228 | 8.3 | db.students.find({_id: {$gt: lastId}}).sort({_id: 1}).limit(10) (SQL: WHERE id > ? ORDER BY id LIMIT 10), repeated with the last id seen. | A-PEM-01 |
| L-0233 | 8.3 | This exactly describes an InnoDB clustered primary key, whose leaf pages hold the rows. In heap-based stores (PostgreSQL, non-clustered MongoDB) the database does an index range scan, then fetches each row: still roughly constant per page, but not one sequential scan of the data. 'Does not increase' is approximate, since log n grows slowly with table size. | A-PEM-15 |
| L-0235 | 8.5 | The advice is sound (use keyset for deep iteration, don't rewrite everything). The stated reason is too strong: see L-0234. Keyset does handle WHERE clauses when an index matches the filter and sort columns. | - |
| L-0237 | 6.6 | Twitter's own Snowflake already used a custom epoch ('millisecond precision w/ a custom epoch gives us 69 years'), so the custom epoch is part of the original design, not a later improvement. | - |
| L-0238 | 6.6 | 41 bits of milliseconds last about 69.7 years from whichever epoch you choose (Twitter: '69 years'). The gain equals the gap between 1970 and your epoch: about 40 years for a 2010 epoch, 45 for Discord's 2015 one. '35 years' is in the right range, but the general rule is 69 years from the chosen epoch. | - |
| L-0240 | 6.6 | Sonyflake is Snowflake-inspired but uses a different layout: 39 bits of time in 10 ms units, 8-bit sequence and 16-bit machine ID. That gives a 174-year lifetime and 2^16 machines, but only 2^8 IDs per 10 ms per instance. | A-IG-19 |
| L-0247 | 8.6 | 'Depends on the storage engine' is right. In MongoDB it works through the _id index, even though a normal collection is not physically ordered by _id (see L-0229). | - |
| L-0248 | 8.6 | Keyset/cursor pagination is efficient wherever the store can resume a scan from a key (B-tree tables, DynamoDB sort keys); hash-distributed layouts lose cheap global ordered ranges, not cursors. | A-PEM-10 |
| L-0267 | 7.3 | The concept is right: Instagram used 'several thousand logical shards that are mapped in code to far fewer physical shards'. Instagram ran PostgreSQL, though, and each logical shard was a Postgres schema inside a database, not a separate CREATE DATABASE. The MySQL CREATE DATABASE picture is the teacher's illustration of the same idea. | A-D-11 |
| L-0269 | 7.3 | Illustrative. In Instagram's PostgreSQL setup each logical shard was a schema (e.g. insta5), not a separate database. See L-0267. | - |
| L-0272 | 7.3 | Instagram rebalances by 'moving a set of logical shards from one database to another'. A dump-and-load is one way to do it, but moving a live shard also needs writes to that shard to be paused or replicated during the cut-over. The post doesn't say Instagram used SQL dumps. | - |
| L-0277 | 7.4 | Instagram's function is written in PL/pgSQL (PostgreSQL's procedural language), not Oracle's PL/SQL, and is a function used as a column default. | - |
| L-0281 | 7.5 | True for PostgreSQL, where serial/identity columns are backed by sequence objects whose nextval is atomic across sessions. MySQL has no sequence objects: InnoDB keeps a per-table AUTO_INCREMENT counter, and there is no nextval to call outside an insert. 'Every database' is too broad, though the atomic-counter idea holds. | - |
| L-0291 | 7.6 | The API-server limit goes away, but the ceilings move to the database: 2^13 = 8192 logical shards and 1024 sequence values per shard per millisecond. | - |
| L-0295 | 9.1 | Banks do prefer a single authoritative sequence over Snowflake-style IDs, but as L-0294's note explains, plain auto-increment is not commit order under concurrency. Ledgers usually serialize postings per account. | - |
| L-0310 | 8.6 | String keys are comparable, but the order follows the column's collation, not plain bytes. MySQL: 'A collation is a set of rules for comparing characters', and case-insensitive collations treat 'a' and 'A' as equal. Numeric strings also sort lexicographically ('10' < '9'), so string IDs page correctly only if their sort order is the order you want (e.g. fixed-width or zero-padded). | A-PEM-13 |

Two notes on left-as-taught items where the page's own wording must stay true without correcting the teacher:
- **L-0197, L-0237 (Twitter's epoch):** the page says "milliseconds from an epoch" and "a company can choose its own epoch". It never says Twitter counted from 1970, so nothing false is taught and nothing is corrected.
- **L-0238 ("35 more years"):** the hedge stays. The page adds its own worked arithmetic (2^41 ms ≈ 69.7 years from any epoch; a 2015 epoch lasts to about 2084), which is calculation, not a correction.

## 4. Unverifiable: attributed, no source link

| id | severity | § | how it is presented |
|---|---|---|---|
| L-0069 | low | 3.4 | a story told in class, attributed; the article is named by its real title (The New Yorker, 'The Friendship That Made Google Huge', 2018) (war_story) |
| L-0101 | none | 5.2 | the lecture's view or the instructor's first-hand account, worded as such (claim) |
| L-0102 | low | 5.2 | attributed (concept) |
| L-0105 | low | 5.2 | attributed (concept) |
| L-0106 | low | 5.2 | attributed (rule_of_thumb) |
| L-0116 | none | 5.3 | the instructor's account of the numbers, attributed (number) |
| L-0139 | low | 4.3 | a first-hand story, attributed to the instructor (war_story) |
| L-0147 | low | 4.5 | worded as the lecture's inference about MongoDB's motive (claim) |
| L-0191 | none | 6.1 | the lecture's reading of the name; Twitter never explained it (analogy) |
| L-0221 | none | 8.4 | a first-hand story, attributed to the instructor (war_story) |
| L-0226 | none | 8.1 | an illustration, kept as one (example) |
| L-0231 | none | 8.4 | a first-hand story, attributed to the instructor (war_story) |
| L-0241 | none | 6.7 | attributed (rule_of_thumb) |
| L-0244 | low | 6.7 | labelled as the lecture's opinion in a margin note; A-PEM-14 (Fowler, 'monolith first') gives the mainstream milder form (claim) |
| L-0246 | none | 8.4 | attributed (qa_insight) |
| L-0288 | low | 7.4 | 'says the lecture': no public 2026 source confirms the generator (claim) |

## 5. Not checked by the fact-check

15 ledger items had no verdict (all `admin_reference`: agenda, references, course structure): L-0001, L-0006, L-0094, L-0097, L-0100, L-0108, L-0131, L-0142, L-0192, L-0232, L-0265, L-0273, L-0308, L-0309, L-0311. They are course-structure facts or reading pointers and need no check. None is dropped; each is placed (AboutThisClass, ForwardChip, MarginNote or a one-clause back-link).

## 6. Verified additions

Used (49): every 'keep' addition is placed; three of the six 'optional' ones are used where they genuinely help (A-IG-24 in 9.2, A-PEM-13 in 8.6, A-PEM-14 in 6.7). Where each one goes is in `placement.json` → `additions`.

Not used:
- A-D-06: optional; duplicates A-IG-09 (Flickr's REPLACE INTO query), which SN-10 uses instead.
- A-IG-06: optional; duplicates A-D-01 (InnoDB secondary indexes carry the primary key), which 4.2 uses instead.
- A-PEM-12: optional; X API pricing is volatile and no class point needs it (L-0216 says only that the API is paid now).
