# Verdict review: second fact-checker, lecture 04

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated`, or with severity `medium`/`high`, in `online_offline_indicator_design_approach.jsonl`, `databases.jsonl` and `caching_compliance.jsonl` (21 items), plus 15 randomly sampled `accurate` verdicts (seed 10). I re-read each flagged ledger item and the transcript passage around it (L-0190 at 01:48:32, L-0311 at 02:48:04, L-0325 at 02:59:07). I opened and checked every URL cited below; all of them were reachable.

## Summary

- 21 flagged verdicts re-checked: I agree with 19. I dispute 2: one label (L-0098) and one severity (L-0266).
- 15 sampled `accurate` verdicts: all 15 agree (one with a caveat, L-0138). 12 of the 15 cite no source ("Correct as stated for this context"). They are definitions, opinions or design reasoning, so that is acceptable.
- 64 additions verified: 53 confirmed, 11 reworded, none rejected. 50 keep, 14 optional (mostly overlaps between groups, see `additions_verified.jsonl`).
- Version drift: nothing changes a verdict. Details are in the "Version drift" section below.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0098 | outdated / low | **simplified / low** | The checker's own note says "As of Oct 2026 the statement holds again". `outdated` means it was true and is no longer true, which is the reverse of this case. The Redis blog (https://redis.io/blog/agplv3/, 2025-05-01) says Redis moved to SSPL in March 2024, then added "the OSI-approved AGPL as an additional licensing option for Redis, starting with Redis 8". "Redis open source" is therefore correct today. It needs a history caveat (source-available from 2024 to 2025; AWS and Google "now maintain their own fork"), not an outdated label. |
| L-0266 | simplified / medium | **simplified / low** | "One month" is the right figure: Art. 12(3) says "in any event within one month of receipt of the request" (https://gdpr-info.eu/art-12-gdpr/). The missing nuance is the two-month extension and the Art. 17(3) exceptions, and the adjacent items already carry it with medium notes: L-0267 covers the timing and L-0273 covers scope and "erasure on grounds". A third medium note in the same 30-second passage over-flags. One inline clarification is enough here. |

## Agreements (with extra evidence where useful)

**Online/offline indicator and connection pooling**
- L-0070 (imprecise/medium): agree. Redis EXPIRE (https://redis.io/docs/latest/commands/expire/) says the timeout is "cleared by commands that delete or overwrite the contents of the key, including DEL, SET". Each heartbeat must therefore re-send the TTL (`SET ... EX 30`). The board text "move the expiration time forward" implies this, but the item doesn't say it. The DynamoDB TTL guide (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) says expired items are deleted "typically within a few days after their expiration" and tells you to "Use filter expressions to remove expired items from Scan and Query results". For DynamoDB, "absent = offline" is wrong unless reads check the expiry.
- L-0325 (imprecise/medium): agree. This is a student proposal (status open). The transcript has an ambiguous "Correct." right after it (02:59:24, flagged as possibly the teacher), so a reader could take it as upheld, and the medium severity is justified. HikariCP's pool-sizing wiki (https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing) says that past the optimum you will "see TPS rates starting to fall, and front-end response times starting to climb", and that you want "a small pool, saturated with threads waiting for connections".

**Databases: Redis vs DynamoDB, licensing, vendor lock-in**
- L-0079 (outdated/low): agree. TechCrunch (25 Nov 2022, https://techcrunch.com/2022/11/25/amazon-to-shut-down-food-delivery-business-in-india) says the service launched "in May 2020 in parts of Bengaluru" and was ending "December 29". Small wording fix: the article announces the shutdown in advance, so "shut down on 29 Dec 2022" should read "announced to close on 29 Dec 2022".
- L-0093 (imprecise/medium): agree. The DAX guide (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html) gives DynamoDB "single-digit milliseconds", and says AWS's own fix for microsecond latency is an in-memory cache that cuts latency "by an order of magnitude from single-digit milliseconds to microseconds". Being in memory is a main reason. The teacher's "not really" correction is the part that misleads.
- L-0094 (imprecise/medium): agree, and I considered `wrong`. The AWS SDK for JavaScript guide (https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html) says the SDK "reuses TCP connections by default", and for "Amazon DynamoDB queries, the latency overhead of setting up a TCP connection might be greater than the operation itself". So "you cannot create persistent connections" to DynamoDB is false as a transport claim. I keep `imprecise` because the teacher's real contrast, a stateful connection on which the server can push events (L-0097), is valid: DynamoDB has no such push channel.
- L-0097 (simplified/medium): agree. The keyspace-notifications page (https://redis.io/docs/latest/develop/pubsub/keyspace-notifications/) says expired events are generated "when the Redis server deletes the key and not when the time to live theoretically reaches the value of zero", that "there can be a significant delay", that they are "disabled by default" and Pub/Sub is "fire and forget", and that events are node-specific in a cluster.
- L-0311 (imprecise/medium): agree. The transcript (02:48:04) confirms the teacher said "There will be zero data loss." The persistence docs (https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/) say the default `everysec` means "you may lose 1 second of data if there is a disaster", and `always` is "Very very slow, very safe". The replication docs say acknowledged writes "can still be lost during a failover" even with WAIT.

**Databases: soft delete, storage internals, GDPR archival**
- L-0177 (simplified/medium): agree. GDPR Art. 17 (https://gdpr-info.eu/art-17-gdpr/) requires erasure "without undue delay". The Art. 17(3) exceptions (legal obligation, legal claims, public-interest archiving or research where erasure would seriously impair it) don't cover general reuse for ML by default. I softened A-D-24 to match.
- L-0185 (imprecise/medium): agree. MySQL 8.4: "InnoDB does not physically remove a row from the database immediately when you delete it", and purge removes it once no longer needed for MVCC or rollback (https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html). A page merges only below MERGE_THRESHOLD, which defaults to 50 (https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html). PostgreSQL: "an UPDATE or DELETE of a row does not immediately remove the old version of the row" (https://www.postgresql.org/docs/current/routine-vacuuming.html).
- L-0190 (wrong/medium): agree. The transcript (01:48:32) says it outright: "every row of your table needs to be a fixed length". The InnoDB row-format page (https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html) says the record header "contains the lengths of variable-length columns". Only when all columns are fixed-length and NOT NULL does "the record header [have] no variable-length part". The storage-requirements page gives VARCHAR as "L + 1 bytes ... L + 2 bytes". The teacher's real point, that a row's size is bounded so long values go off-page, still holds (see L-0193 and A-D-14).

**Databases: date/time storage**
- L-0213 (imprecise/medium): agree. MySQL 8.4 storage requirements: DATETIME is "5 bytes + fractional seconds storage" and TIMESTAMP is 4 bytes. PostgreSQL stores timestamp in 8 bytes (https://www.postgresql.org/docs/current/datatype-datetime.html). These are compact binary values, not multi-attribute objects.
- L-0224 (imprecise/medium): agree. MySQL "converts TIMESTAMP values from the current time zone to UTC for storage ... (This does not occur for other types such as DATETIME.)" (https://dev.mysql.com/doc/refman/8.4/en/datetime.html). PostgreSQL timestamptz: "stored internally as UTC, and the originally stated or assumed time zone is not retained". The student said "can capture", and some engines do store an offset, so this is `imprecise`, not `wrong`.
- L-0232 (wrong/low): agree. The MySQL TIMESTAMP range ends "'2038-01-19 03:14:07' UTC", and PostgreSQL `integer` maxes at +2147483647 (https://www.postgresql.org/docs/current/datatype-numeric.html). The point (4 bytes runs out, 8 bytes doubles the space) stands, and the year is a slip, so `low` fits.
- L-0235 (wrong/low): agree. MySQL DATETIME covers "'1000-01-01 00:00:00' to '9999-12-31 23:59:59'". The wide range belongs to PostgreSQL (4713 BC to 294276 AD in 8 bytes). The teacher hedged ("I think"), so `low` fits.

**Caching, GDPR and HTTP**
- L-0267 (imprecise/medium): agree. Art. 12(3): one month, "may be extended by two further months where necessary". Keeping data for a harassment case falls under Art. 17(3)(e) (legal claims), not the deadline.
- L-0268 (imprecise/medium): agree. ICO (https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/): organisations must "take steps to ensure erasure from backup systems as well as live systems". Data that can't be overwritten at once must be put "beyond use" until it is overwritten. Presenting recovery from logs as a "hack" teaches the wrong compliance model.
- L-0273 (imprecise/medium): agree. Art. 3 (https://gdpr-info.eu/art-3-gdpr/) limits scope to EU establishments, or to organisations offering goods or services to, or monitoring, people "in the Union". An organisation with no EU establishment is in scope only through Art. 3(2), so "every single organization" overstates it.
- L-0288 (imprecise/medium): agree. Pages are "usually 8 kB" in PostgreSQL (https://www.postgresql.org/docs/current/storage-page-layout.html), and "The default size of an index page is 16KB" in InnoDB (https://dev.mysql.com/doc/refman/8.4/en/innodb-physical-structure.html). A 1 KB read costs the same page IO as a 15-byte read. **Label as historical:** the Jeff Dean numbers on brenocon.com (100 ns memory reference, 10 ms disk seek) are undated on that page and date from about 2009, when disks were spinning. The direction of the argument holds for SSDs too, but don't present those figures as current.
- L-0332 (imprecise/medium): agree. RFC 9112 §9.3: "HTTP/1.1 defaults to the use of persistent connections". MDN Overview: "The default behavior of HTTP/1.0 is to open a separate TCP connection for each HTTP request/response pair." RFC 9113 §8.2.2 lists Keep-Alive among the connection-specific fields that "MUST be treated as malformed" in HTTP/2. This matches how Lecture 1 graded the same error (L-0289 there, medium).

## Spot-check of 15 `accurate` verdicts (random, seed 10)

I drew the sample with `random.seed(10); random.sample(accurate_rows_sorted_by_id, 15)` from 205 accurate rows.
IDs: L-0238, L-0031, L-0173, L-0199, L-0239, L-0026, L-0085, L-0188, L-0201, L-0121, L-0274, L-0069, L-0210, L-0138, L-0043.

All 15 agree. Evidence where an external fact applies:
- L-0085: the persistence page confirms RDB and AOF, and the "~1 s loss with default fsync" limitation in the checker's note.
- L-0069: Redis EXPIRE and DynamoDB TTL both exist as described. Their very different timing is handled under L-0070.
- L-0210: SQLite datatype3 §2.2 defines Unix Time as "the number of seconds since 1970-01-01 00:00:00 UTC". A milliseconds variant is common in practice, which the item also allows.
- L-0121: the pool grows on demand up to a cap. This is consistent with HikariCP, where the pool grows towards `maximumPoolSize` when `minimumIdle` is lower.
- L-0138 (agree, with caveat): vertical scaling and sharding are the two structural options. A connection proxy (RDS Proxy "queues or throttles application connections", https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html) also lets more clients share a fixed connection limit. This is worth a cross-reference to A-OOI-14, but it doesn't change the verdict.

The other 10 (L-0238, L-0239, L-0031, L-0173, L-0188, L-0199, L-0201, L-0026, L-0274, L-0043) are definitions, course framing or design heuristics with no external fact to check.

## Version drift

- **PostgreSQL**: 18 is current (the docs header reads "PostgreSQL 18.6 Documentation"). The pages cited under `/docs/current/` match what the checkers wrote.
- **Redis**: the data-types page now also lists an **Arrays** type, which A-CC-16 and A-D-08 don't mention. Redis 8.10 adds a `BACKUP` command family on the persistence page. Neither affects any verdict.
- **Debezium**: 3.7 is "latest stable", the same as the checker named.
- **ElastiCache**: serverless supports Valkey 7.2+, Memcached 1.6.22+ and Redis OSS 7.1, and public endpoints need Valkey 9.0+. This is consistent with A-D-07 as reworded.
- **MySQL**: the checkers cite the 8.4 LTS manual. All figures used (DATETIME and TIMESTAMP sizes and ranges, MERGE_THRESHOLD, row formats) are unchanged there.
- **Amazon Food**: closed on 29 Dec 2022 (L-0079). The teacher's example is historical.

## Notes on cited URLs

- All URLs were reachable. Several long pages were truncated by the fetcher. On RFC 9113 I read on to §8.2.2 with an offset, and on redis.conf I read on to `list-compress-depth`. For RFC 9112 I read §9.3 but not Appendix C.2.2, which no claim depends on. For Debezium I read only the connector overview, which is the part cited.
- https://www.pgbouncer.org/ (home page) supports only "lightweight connection pooler for PostgreSQL". The page doesn't describe pooling modes, so don't cite it for those.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-physical-structure.html gives the 16KB page size but doesn't say pages are the unit of disk-to-memory transfer. That part of A-CC-09 is reasoning.
- https://www.mongodb.com/docs/manual/core/transactions/ states feature-compatibility minimums (4.0 replica set, 4.2 sharded), not "since" dates. The release versions match.
- https://trilegal.com/knowledge_repository/information-technology-rules-2021/ is a law-firm summary dated 2 Mar 2021, not the gazetted Rules. A-D-23 is marked optional and attributed, and later amendments were not checked.
- https://brenocon.com/dean_perf.html is undated. Treat its latency table as historical (about 2009).
