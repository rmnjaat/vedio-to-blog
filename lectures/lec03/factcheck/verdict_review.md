# Verdict review: second fact-checker, lecture 03

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated` or with severity `medium`/`high` in `id_generation.jsonl`, `databases.jsonl` and `pagination_engineering_mindset.jsonl` (18 items), plus 15 randomly sampled `accurate` verdicts (seed 9, drawn with Python `random.seed(9); random.sample(...)` from the 202 accurate rows sorted by id). I re-read each ledger item and, where needed, the transcript. Every URL cited below was opened by me (WebFetch) and searched for the quoted sentence. When I couldn't open a URL, the entry says so.

## Summary

- 18 flagged verdicts re-checked: I agree with 16. I dispute 2, both on severity (L-0081 and L-0294: imprecise/medium -> imprecise/low). Both are in `verdict_overrides.jsonl`.
- 15 sampled `accurate` verdicts: all 15 agree. 10 of the 15 cite no source ("Correct as stated for this context"). They are reasoning or framing claims, so that is acceptable.
- 52 additions verified: 41 confirmed, 11 reworded, 0 rejected. 4 marked optional because they duplicate another addition or are volatile (A-D-06, A-IG-06, A-PEM-12, A-IG-24), plus A-PEM-13 and A-PEM-14 optional on usefulness.
- Version drift: see below. Nothing changes a verdict. Sonyflake v2 makes the bit layout configurable (A-IG-19 reworded). PostgreSQL `current` docs are 18.6.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0081 | imprecise / medium | **imprecise / low** | The checker's own precise version ("strictly monotonic IDs across machines need coordination") is the teacher's lesson with a qualifier. Of the two counter-examples, TiDB's TSO is allocated by one logical allocator, the Placement Driver (https://docs.pingcap.com/tidb/stable/tso/: the TSO "always moves forward and never regresses"), which is the "central service" the teacher already described. Only Spanner (https://docs.cloud.google.com/spanner/docs/true-time-external-consistency: "TrueTime enables applications to generate monotonically increasing timestamps ... across all servers") is a true distributed exception, and it needs special clock hardware. A learner who believes the item makes no wrong design decision. Keep the note, at low. |
| L-0294 | imprecise / medium | **imprecise / low** | The checker says InnoDB's interleaved mode "interleaves values across concurrent statements". The MySQL 8.4 page (https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html) says the opposite of what that implies: "auto-increment values are guaranteed to be unique and monotonically increasing across all concurrently executing 'INSERT-like' statements"; only "the values generated for the rows inserted by any given statement may not be consecutive". Gaps after rollback ("Such lost values are not reused") and commit order differing from ID order remain real caveats, but they are secondary to the student's question. Corrected note in the override. |

## Agreements (with extra evidence where useful)

**Clocks and monotonic IDs**
- L-0067 (wrong / low): agree. ECS Inc. (https://ecsxtal.com/?p=1063): a 32.768 kHz tuning-fork crystal has "a common parabolic coefficient ... 0.04 ppm/°C2" and shows "decrease of accuracy at extreme high and extreme low temperatures". Heat does not make it run fast; both extremes make it run slow. Side detail, so low is right.
- L-0076 (wrong / high): agree, including high. "The clock never goes back in time. Never." is the premise of the lecture's single-server ID design. ntpd (https://www.ntp.org/documentation/4.2.8-series/ntpd/): "the time is slewed if the offset is less than the step threshold, which is 128 ms by default", so larger offsets are stepped. chrony (https://chrony-project.org/doc/4.6/chrony.conf.html): `makestep` "forces chronyd to step the system clock if the adjustment is larger than a threshold value". clock_gettime(2) (https://man7.org/linux/man-pages/man2/clock_gettime.2.html): CLOCK_REALTIME "is affected by discontinuous jumps in the system time". Snowflake's README (https://github.com/twitter-archive/snowflake/tree/snowflake-2010): "Snowflake protects from non-monotonic clocks, i.e. clocks that run backwards." Slewing is the normal small-offset case, which is what the teacher described, but not a guarantee.
- L-0077 (imprecise / medium): agree. Follows from L-0076: a single server's IDs are monotonic only if the generator guards against backwards steps (Snowflake's protection, or CLOCK_MONOTONIC, which "is not affected by discontinuous jumps").
- L-0093 (outdated / low): agree, label and severity. RFC 9562 (https://www.rfc-editor.org/rfc/rfc9562.html, May 2024): UUIDv7 allocates "a Unix timestamp in milliseconds in the most significant 48 bits". PostgreSQL 18 (https://www.postgresql.org/docs/18/functions-uuid.html): uuidv7 "Generates a version 7 (time-ordered) UUID". The teacher's statement was right for v4, the UUID most people meant then.

**UUIDs**
- L-0129 (imprecise / medium): agree. RFC 9562: "UUID versions that are not time ordered, such as UUIDv4 ..., have poor database-index locality." MySQL (https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html): "If the primary key is long, the secondary indexes use more space". The cost is randomness plus size; "extremely inefficient" overstates it, and v7 removes most of the locality cost. Medium because it drives an ID-type decision.
- L-0143 (imprecise / medium): agree. RFC 9562: "Implementations SHOULD NOT assume that UUIDs are hard to guess" and UUIDs "MUST NOT be used as security capabilities". OWASP (https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html): "even with complex identifiers, access control checks are essential." "Good for security" invites a real design mistake, so medium.

**Flickr ticket servers**
- L-0172 (imprecise / medium): agree. Flickr's post (https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/) uses `REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();`, not the board's `ON DUPLICATE KEY UPDATE id = id + 1`. With Flickr's `auto-increment-increment = 2` / `auto-increment-offset = 1|2`, an explicit `id = id + 1` ignores the increment and would make the odd server issue even IDs. One addition to the checker's evidence: the cited insert-on-duplicate page does not mention `LAST_INSERT_ID(expr)`. The point that reading the bumped value back needs `id = LAST_INSERT_ID(id + 1)` is documented in https://dev.mysql.com/doc/refman/8.4/en/information-functions.html ("the value of the argument is returned by the function and is remembered as the next value to be returned by LAST_INSERT_ID()", with `UPDATE sequence SET id=LAST_INSERT_ID(id+1)`).
- L-0300 (wrong / medium): agree. Checked transcript 02:21:55: "they just told in an abstract way that they need to do gossip". The Flickr post says nothing about gossip; it says "replicating between the boxes would be problematic, and locking would kill the performance of the site" and "The sides do drift a bit out of sync ... but this hurts no one". Medium because it teaches that the odd/even design needs coordination, which is the opposite of its point.
- L-0171 (imprecise / medium, databases): agree. The 32x figure is the teacher's own benchmark (unverifiable). "Either works" is the problem: REPLACE "deletes" the old row before inserting and sets "missing columns ... to their default values" (https://dev.mysql.com/doc/refman/8.4/en/replace.html); create-trigger (https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html) lists REPLACE under both INSERT and DELETE triggers. Flickr depends on REPLACE's fresh auto-increment value.

**Snowflake**
- L-0201 (wrong / medium): agree. Snowflake README: "Snowflake is a network service for generating unique ID numbers at high scale", a "Thrift Server written in Scala", with "response rate 2ms (plus network latency)". The board's "not a central service; runs in app servers" is the reverse of Twitter's design. Instagram's post (https://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram) chose to bring generation "inside PostgreSQL" instead of running such a service. Sonyflake (https://github.com/sony/sonyflake) is the library-style counter-example.
- L-0207 (wrong / low): agree. 4,096 per ms = 4,096,000 per s, not 400,000. Twitter's stated need was "minimum 10k ids per second per process". The conclusion ("no one does that") still holds, so low.
- L-0209 (wrong / low): agree. With Twitter's "time - 41 bits", "machine id - 10 bits", "sequence number - 12 bits", time is shifted by 22. A 23-bit shift is Instagram's (13-bit shard + 10-bit sequence); depesz (https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/) shows `(now_millis - our_epoch) << 23` and `shard_id << 10`.

**ID ranges**
- L-0303 (imprecise / medium): agree. SQS (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html): "you might get that message copy again ... Design your applications to be idempotent." A redelivered range means duplicate IDs. DynamoDB (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html): atomic counter "updates are not idempotent" and can cause "overcounting", which only wastes a range. "Any queue is good enough" is a wrong design answer, so medium.

**Databases**
- L-0136 (imprecise / medium): agree. InnoDB buffer pool (https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html): "caches table and index data as it is accessed" and "the least recently used page is evicted". The working set has to fit, not every index. Medium: the absolute version leads to over-provisioning or wrong diagnoses.

**Pagination**
- L-0229 (imprecise / medium): agree. InnoDB: "the clustered index that stores row data" (true there). PostgreSQL CLUSTER (https://www.postgresql.org/docs/current/sql-cluster.html): "Clustering is a one-time operation: when the table is subsequently updated, the changes are not clustered." MongoDB (https://www.mongodb.com/docs/manual/core/clustered-collections/): "A non-clustered collection stores the _id index separately from the documents"; clustered collections are "New in version 5.3". The speed comes from the index seek. Quote nit: the checker's "'is a one-time operation'" fragment matches the page's "Clustering is a one-time operation".
- L-0234 (imprecise / medium): agree. use-the-index-luke (https://use-the-index-luke.com/sql/partial-results/fetch-next-page): filtering and multi-column keyset with `(sale_date, sale_id) < (?, ?)`, "Paging requires a deterministic sort order", and "you also cannot fetch arbitrary pages". https://use-the-index-luke.com/no-offset: "you cannot directly navigate to arbitrary pages". The stated disadvantage is the wrong one.

## Spot-check of 15 accurate verdicts (random, seed 9)

All 15 agree.

| ID | Group | Result |
|---|---|---|
| L-0003 | id_generation | Agree. Framing claim, no source needed. |
| L-0024 | id_generation | Agree. A plain `counter++` is not atomic; locks or atomics are the standard fix. |
| L-0041 | id_generation | Agree. Teaching reframe (periodic writes reduce disk I/O). |
| L-0053 | id_generation | Agree. Hedged ("one of the places"). |
| L-0085 | pagination_engineering_mindset | Agree. Engineering maxim. |
| L-0111 | id_generation | Agree. Range = start and end. |
| L-0112 | id_generation | Agree. SELECT ... FOR UPDATE inside a transaction serialises range handout. |
| L-0123 | id_generation | Agree. Correctly records the student's proposal and the teacher's rejection (2^64 space). |
| L-0163 | id_generation | Agree. Matches Flickr's framing of MySQL auto-increment as the ID source. |
| L-0176 | id_generation | Agree. Flickr: "We round robin between the two servers to load balance and deal with down time." (opened, verbatim). |
| L-0194 | id_generation | Agree. Snowflake README: "we need to keep our ids under 64bits". |
| L-0220 | pagination_engineering_mindset | Agree. Illustrative workload. |
| L-0224 | pagination_engineering_mindset | Agree. PG: skipped rows "still have to be computed inside the server"; MongoDB skip "requires the server to scan from the beginning of the input results set" (both opened). |
| L-0230 | pagination_engineering_mindset | Agree. Opened https://arpitbhayani.me/blogs/benchmark-and-compare-pagination-approach-in-mongodb/: "almost gives constant performance and is independent of size of the result set" and "till 500-600 count, both the approaches are comparable" (verbatim). |
| L-0262 | id_generation | Agree. Instagram post: "13 bits that represent the logical shard ID"; depesz shows `shard_id << 10`. |

## Version drift

- PostgreSQL: `docs/current` now serves 18.6. queries-limit, sql-cluster, functions-sequence, sql-createsequence, datatype-numeric and indexes-index-only-scans all say what the checkers quoted. uuidv7() is in 18 (as stated).
- MySQL: checkers pinned to 8.4 LTS; all quotes re-confirmed there. Interleaved (2) is the 8.4 default autoinc lock mode.
- Sonyflake: the README now documents v2, where BitsSequence, BitsMachineID and TimeUnit are configurable (defaults 8 / 16 / 10 ms) and the default start time is 2025-01-01. The 39/8/16 layout is the default, not fixed; A-IG-19 reworded.
- Twitter Snowflake: repo archived Sep 18, 2021; internal version "a full rewrite" (as A-IG-15 says).
- X API pricing (opened 2026-10-13): pay-per-usage, $0.005 per Post read, 3 million Post reads per billing cycle cap. Volatile; A-PEM-12 marked optional with its date.
- Elasticsearch: current docs still describe `index.max_result_window` (10,000) and no longer recommend scroll for deep pagination.
- MongoDB: clustered collections still "New in version 5.3"; ObjectId and BSON ordering caveats unchanged.

## Notes on cited URLs

- Opened and confirmed (all reachable): code.flickr.net ticket-servers post; github.com/twitter-archive/snowflake (snowflake-2010 and master); dev.mysql.com 8.4 pages innodb-index-types, innodb-auto-increment-handling, innodb-buffer-pool, innodb-preload-buffer-pool, replace, insert-on-duplicate, create-trigger, replication-options-source, integer-types, example-auto-increment, charset-general, information-functions; postgresql.org queries-limit, indexes-index-only-scans, functions-sequence, sql-createsequence, datatype-numeric, sql-cluster, docs/18 functions-uuid; mongodb.com cursor.skip, clustered-collections, bson-types, ObjectId; use-the-index-luke fetch-next-page and no-offset; elastic.co paginate-search-results; AWS Query.Pagination, SQS at-least-once, DynamoDB WorkingWithItems; docs.x.com pagination and pricing; martinfowler.com MonolithFirst; man7.org clock_gettime(2) and fsync(2); ntp.org ntpd 4.2.8; chrony-project.org 4.6 chrony.conf (read first 100,000 characters, which contain makestep); rfc-editor.org RFC 9562 (read first 100,000 characters, which contain all quoted sentences); docs.discord.com reference; github.com/sony/sonyflake; docs.cloud.google.com Spanner TrueTime; docs.pingcap.com TiDB TSO; github.com/Meituan-Dianping/Leaf; ecsxtal.com/?p=1063; instagram-engineering.tumblr.com sharding-ids; depesz.com Instagram-style ID post; arpitbhayani.me pagination benchmark.
- Unreachable: none.
- Not re-opened (cited only by non-flagged, non-sampled verdicts, outside this review's scope): simonwillison.net, mathworld.wolfram.com, en.wikipedia.org/wiki/Flickr, en.cppreference.com storage_duration, docs.x.com standard-to-twitter-api-v2 migration page, dev.mysql.com limit-optimization and create-table.
- Quote fixes made in additions: A-PEM-14 (the page's phrase is "the premium of microservices is a drag you should do without", not "microservice premium"); A-D-09 and A-IG-14 (MySQL's crash caveat means a value *can* be reused, the original read backwards); A-IG-13 (interleaving does not break monotonic allocation).
