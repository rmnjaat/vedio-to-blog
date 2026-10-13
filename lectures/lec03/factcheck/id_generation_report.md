# Fact-check report: distributed ID generation (Lecture 03)

Scope: 225 ledger items of topic group `id_generation` (topic root `id-generation`), as listed in `groups.json`; no admin items in the group. **225 items checked.** Checked 2026-10-13 against MySQL 8.4 docs, PostgreSQL 18 docs, RFC 9562, chrony 4.6 and ntpd 4.2.8 docs, the archived Twitter Snowflake repo, Flickr's 2010 ticket-server post, Discord and MongoDB docs as published on that date.

## Counts

| Verdict | Count |
|---|---|
| accurate | 164 |
| simplified | 19 |
| imprecise | 26 |
| wrong | 6 |
| outdated | 1 |
| unverifiable | 9 |

| Severity | Count |
|---|---|
| high | 1 |
| medium | 9 |
| low | 48 |
| none | 167 |

Additions proposed: 25 (see `id_generation_additions.jsonl`).

Calibration: the first hour of the lecture is a reasoning walk-through (epoch ms -> machine ID -> thread/counter -> persistence -> flush frequency -> monotonicity -> central service). Those steps were judged as reasoning and are mostly accurate. Flags went to concrete technical claims that a learner would carry into a design or an interview: clock behaviour, attributions of the Flickr/Twitter/Instagram designs, exact bit arithmetic, and absolute statements ('never', 'impossible', 'any queue'). Amazon-internal details are unverifiable, with low severity because the technique itself is standard. Student proposals were judged on what the teacher upheld. The Instagram engineering post (instagram-engineering.com) could not be opened; Instagram code details were checked against the published function reproduced by depesz.com, and claims needing the original post were not marked accurate on its authority.

## Items needing a decision (ordered by severity)

### L-0076 | wrong | severity: high

- **Teacher/ledger statement:** On a single machine, clock skew does not break ordering: when NTP sync finds the clock is ahead (24 instead of 23), the clock does not jump back; it slows its counting until real time catches up, so the clock never goes back in time.
- **Verbatim:** "Your clock slows down the counting and then it catches up and then it starts from 24." (teacher)
- **Issue:** The wall clock can go back. ntpd slews only offsets under 128 ms and steps the clock for larger ones; chrony steps under makestep; an admin or VM migration can set it too. Linux documents CLOCK_REALTIME as affected by discontinuous jumps; only CLOCK_MONOTONIC is not, and it is not wall time. Twitter's Snowflake has explicit protection against clocks that run backwards. Slewing is the normal small-offset case, not a guarantee.
- **Suggested note:** For small offsets NTP slews (slows or speeds) the clock instead of jumping, but the wall clock can still step backwards, so time-based ID generators must detect that and wait or refuse.
- **Sources:** [www.ntp.org](https://www.ntp.org/documentation/4.2.8-series/ntpd/), [chrony-project.org](https://chrony-project.org/doc/4.6/chrony.conf.html), [man7.org](https://man7.org/linux/man-pages/man2/clock_gettime.2.html), [github.com](https://github.com/twitter-archive/snowflake/tree/snowflake-2010)

### L-0077 | imprecise | severity: medium

- **Teacher/ledger statement:** If ID generation sticks to one server, its clock always moves forward, so it always produces monotonically increasing IDs regardless of where requests come from.
- **Verbatim:** "the clock on this machine is always moving forward, it will always have monotonically increasing IDs." (teacher)
- **Issue:** Only true if the generator guards against the wall clock stepping backwards (see L-0076). Snowflake refuses to issue IDs until time passes the last ID it generated, or else you can use a monotonic clock or keep the last value in memory and never go below it.
- **Suggested note:** Only true if the generator guards against the wall clock stepping backwards (see L-0076). Snowflake refuses to issue IDs until time passes the last ID it generated, or else you can use a monotonic clock or keep the last value in memory and never go below it.
- **Sources:** [github.com](https://github.com/twitter-archive/snowflake/tree/snowflake-2010), [man7.org](https://man7.org/linux/man-pages/man2/clock_gettime.2.html)

### L-0081 | imprecise | severity: medium

- **Teacher/ledger statement:** You cannot have an ID generation service that is distributed in nature and also guarantees strict monotonicity at high throughput - not possible.
- **Verbatim:** "you cannot have an ID generation service which is distributed in nature, which also guarantees strict monotonicity at high throughput." (teacher)
- **Issue:** Stated as an absolute, but distributed systems do issue strictly increasing timestamps at high throughput. TiDB's Placement Driver (a replicated cluster with an elected leader) hands out TSO timestamps that 'never regress'. Spanner's TrueTime gives monotonically increasing timestamps across all servers. What you cannot have is many independent generators with no coordination; strict order costs a leader or special clocks plus latency.
- **Suggested note:** Strictly monotonic IDs across machines need coordination - a single (replicated) timestamp oracle or specially bounded clocks - which costs latency and availability; independent generators can only be roughly ordered.
- **Sources:** [docs.pingcap.com](https://docs.pingcap.com/tidb/stable/tso/), [docs.cloud.google.com](https://docs.cloud.google.com/spanner/docs/true-time-external-consistency)

### L-0129 | imprecise | severity: medium

- **Teacher/ledger statement:** Companies at scale do not prefer UUIDs because they are extremely inefficient at scale.
- **Verbatim:** "They are extremely inefficient at scale." (teacher)
- **Issue:** The main cost is randomness, not just size: RFC 9562 says non-time-ordered UUIDs such as v4 'have poor database-index locality', so inserts scatter across the B-tree. In InnoDB a long primary key is also copied into every secondary index. Time-ordered UUIDv7 (2024) removes most of the locality problem, and UUIDs are used at large scale. 'Extremely inefficient' overstates it.
- **Suggested note:** Random (v4) UUIDs index poorly at scale because inserts land at random places in the index, and at 16 bytes they enlarge every index; time-ordered UUIDv7 or 64-bit IDs avoid most of this.
- **Sources:** [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9562.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)

### L-0143 | imprecise | severity: medium

- **Teacher/ledger statement:** UUIDs are good for security: they look random and the next one cannot be predicted, so it is hard for anyone to predict other IDs or scrape the whole website.
- **Verbatim:** "But they're good for security because you cannot predict what's next in terms of UUID." (teacher)
- **Issue:** RFC 9562 says implementations 'SHOULD NOT assume that UUIDs are hard to guess' and UUIDs 'MUST NOT be used as security capabilities'. Random v4 IDs are hard to enumerate, but time-based versions (v1, v6, v7) are partly predictable. OWASP: unguessable IDs reduce enumeration, but access control checks are still essential.
- **Suggested note:** Random (v4) UUIDs make IDs hard to enumerate, which slows scraping, but they are not a security control; every request still needs an authorization check.
- **Sources:** [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9562.html), [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)

### L-0172 | imprecise | severity: medium

- **Teacher/ledger statement:** Flickr's ID query: INSERT INTO tickets (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id + 1, with a constant stub value; the insert hits the existing 'a', so the update bumps the id (e.g. 74 to 75) and returns it; subsequent queries give 76, 77, 78 and so on.
- **Verbatim:** "insert into ticket stub a on duplicate key update ID equal to ID plus one. Simple." (teacher)
- **Issue:** Flickr's post uses REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID(); - REPLACE deletes and reinserts the row, so the auto-increment counter issues the next ID. The board's 'ON DUPLICATE KEY UPDATE id = id + 1' is a different mechanism: it bumps by 1 and ignores auto_increment_increment, breaking the odd/even split of L-0177. Reading the new value back also needs id = LAST_INSERT_ID(id + 1).
- **Suggested note:** Flickr gets an ID with REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID(); the REPLACE forces a fresh auto-increment value on the single row.
- **Sources:** [code.flickr.net](https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html)

### L-0201 | wrong | severity: medium

- **Teacher/ledger statement:** Snowflake is not a service: it is a library inside the API servers, just normal integer bit manipulation.
- **Verbatim:** "It's not a library. It's not a service. It's a library, normal, normal integer, normal bit manipulation." (teacher)
- **Issue:** Twitter's README: 'Snowflake is a network service for generating unique ID numbers at high scale', a Thrift server written in Scala, aiming at 2 ms responses plus network latency. Instagram's 2012 design (L-0256) existed precisely to avoid running such a service. Snowflake-style IDs can be generated in a library (as Sonyflake does), but that is not what Twitter did.
- **Suggested note:** Twitter's Snowflake ran as a separate network service (a Thrift server), but the same bit layout is often implemented as a library inside app servers, e.g. Sony's Sonyflake.
- **Sources:** [github.com](https://github.com/twitter-archive/snowflake/tree/snowflake-2010), [github.com](https://github.com/sony/sonyflake)

### L-0294 | imprecise | severity: medium

- **Teacher/ledger statement:** Snowflake is not monotonically increasing and does not guarantee strict monotonicity; some IDs can be out of order. If you need strict monotonicity, auto-increment is the way to go.
- **Verbatim:** "Snowflake is not monotonically increasing. It does not guarantee strict monotonic." (teacher)
- **Issue:** Snowflake is only roughly ordered: right. But auto-increment does not give strict order either. InnoDB's default interleaved mode interleaves values across concurrent statements, rolled-back values leave gaps, and a transaction holding a lower ID can commit after one holding a higher ID. For a strict ledger order you need a single writer, or a sequence assigned at commit under serialization.
- **Suggested note:** Snowflake IDs are only roughly time-ordered. A single database's auto-increment gives unique, increasing values per insert, but concurrent transactions can commit out of ID order.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html)

### L-0300 | wrong | severity: medium

- **Teacher/ledger statement:** Flickr only said abstractly that the servers need to gossip; how is up to you - it can be as simple as making network calls to check the greatest IDs, agreeing on a value and adding a buffer; you can write your own simple gossip.
- **Verbatim:** "It can be as simple as making network calls to check what the greatest IDs and then agree upon something" (teacher)
- **Issue:** Flickr's post says nothing about gossip. It explicitly avoids communication between the two ticket servers ('replicating between the boxes would be problematic, and locking would kill the performance') and accepts drift: 'The sides do drift a bit out of sync... but this hurts no one.' Odd/even offsets make agreement unnecessary.
- **Suggested note:** Flickr's two ticket servers never coordinate: odd/even auto-increment offsets keep IDs unique, and the sides are allowed to drift apart.
- **Sources:** [code.flickr.net](https://code.flickr.net/2010/02/08/ticket-servers-distributed-unique-primary-keys-on-the-cheap/)

### L-0303 | imprecise | severity: medium

- **Teacher/ledger statement:** Reading ranges from a queue offloads atomicity to the queue's reads; the core property is atomic reads, and any system that provides it - the database, a queue, DynamoDB, Redis - is good enough.
- **Verbatim:** "Queue gives you atomicity. Well, works for you." (teacher)
- **Issue:** Not every queue gives this. SQS standard queues are at-least-once: a copy may be delivered again, so a range could be handed to two servers and produce duplicate IDs unless consumers dedupe (or you use exactly-once processing such as FIFO deduplication). DynamoDB atomic counters and Redis INCRBY are fine: a retried increment overcounts, wasting a range but never duplicating one.
- **Suggested note:** Any store with an atomic increment-and-return (a SQL transaction, DynamoDB atomic counter, Redis INCRBY) can hand out ranges; an at-least-once queue can redeliver a range and needs deduplication.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html)

### L-0067 | wrong | severity: low

- **Teacher/ledger statement:** Heat (e.g. a high-intensity game heating the CPU) makes the quartz crystal vibrate faster so the clock runs fast; an extremely cold environment slows the vibration so the clock runs slow.
- **Verbatim:** "Quartz crystal would start to vibrate faster and your clock would move faster." (teacher)
- **Issue:** Common clock crystals do not run faster when hot and slower when cold. A 32.768 kHz tuning-fork crystal's frequency error follows a parabola around room temperature (about 25 C), so accuracy gets worse at both hot and cold extremes, by a similar amount on either side. The teacher's main point stands: temperature makes quartz clocks drift.
- **Suggested note:** Quartz frequency varies with temperature (for common 32.768 kHz crystals the error grows roughly with the square of the distance from about 25 C), so clocks drift and need syncing.
- **Sources:** [ecsxtal.com](https://ecsxtal.com/?p=1063)

### L-0093 | outdated | severity: low

- **Teacher/ledger statement:** Why not use a UUID instead of all this complexity? You can, if it is okay to relax the constraint - not everyone needs strict monotonicity; but with UUIDs you lose ordering (you get some, you lose some).
- **Verbatim:** "Relax the constraint. If it's okay for you to relax the constraint, then use UUID." (teacher)
- **Issue:** True for random UUIDv4. RFC 9562 (May 2024) added UUIDv7, which carries a Unix-epoch millisecond timestamp in its most significant bits and is time-ordered; PostgreSQL 18 ships uuidv7(). A UUID no longer has to mean no ordering.
- **Suggested note:** Random UUIDs (v4) lose ordering; time-ordered UUIDv7 (RFC 9562, 2024) keeps rough creation order at 128 bits.
- **Sources:** [www.rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9562.html), [www.postgresql.org](https://www.postgresql.org/docs/18/functions-uuid.html)

### L-0207 | wrong | severity: low

- **Teacher/ledger statement:** Snowflake would only see a collision if one machine handled more than 4096 requests in one millisecond; the teacher equates more than 4,000 requests per millisecond to 400,000 requests per second and says no one does that, so with at most 1024 machines Twitter is safe at its scale.
- **Verbatim:** "more than 4,000 requests per millisecond implies 400,000 requests per second. No one does." (teacher)
- **Issue:** Arithmetic slip: 4,096 IDs per millisecond is about 4.1 million per second per machine, not 400,000. Twitter's stated requirement was a minimum of 10,000 IDs per second per process, so the headroom is even larger than the teacher said.
- **Suggested note:** One Snowflake generator can issue up to 4,096 IDs per millisecond, about 4 million per second.
- **Sources:** [github.com](https://github.com/twitter-archive/snowflake/tree/snowflake-2010)

### L-0209 | wrong | severity: low

- **Teacher/ledger statement:** Snowflake generation is plain bit manipulation: take the current time, the machine ID and the static counter incremented atomically; left-shift the time by 23 bits and combine the parts with bitwise OR.
- **Verbatim:** "Left shift by 23 and set a time, and then set bitwise or, and basically create this ID" (teacher)
- **Issue:** For Twitter's layout (10-bit machine + 12-bit sequence) the time is shifted left by 22, with the machine ID shifted by 12. A 23-bit shift belongs to Instagram's layout (13-bit shard + 10-bit sequence).
- **Suggested note:** Snowflake ID = (ms_since_epoch << 22) | (machine_id << 12) | sequence.
- **Sources:** [github.com](https://github.com/twitter-archive/snowflake/tree/snowflake-2010), [www.depesz.com](https://www.depesz.com/2015/10/30/is-c-faster-for-instagram-style-id-generation/)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0022 | imprecise | low | A C/C++ static (or global) variable has static storage duration: it lives in the program's data/BSS area for the whole run, not on the heap (heap = dynamic storage from new/malloc). |
| L-0028 | simplified | low | 2^32 is about 4.29 billion only for an unsigned 32-bit integer; a signed 32-bit INT (the default in most databases and languages) tops out at 2,147,483,647 (about 2.1 billion). |
| L-0033 | simplified | low | Writing the counter to a file is not enough to survive a machine crash or power loss: the write may sit in the OS page cache. |
| L-0054 | imprecise | low | Terminology is swapped. |
| L-0060 | imprecise | low | Over-generalised: many widely used schemes have no time prefix - UUIDv4 is random, and Flickr's ticket servers and range allocators hand out plain counters. |
| L-0064 | simplified | low | In practice clock sync is a daemon (chronyd, ntpd, systemd-timesyncd) that runs continuously and disciplines the clock by gradually speeding it up or slowing it down, rather than a periodic job that resets it.. |
| L-0073 | simplified | low | Hedged correctly ('almost impossible'), but systems do provide globally increasing timestamps: Spanner's TrueTime gives monotonically increasing timestamps across all servers, and TiDB's PD hands out timestamps that never regress. |
| L-0083 | simplified | low | MySQL auto-increment values are unique and increasing, but not gap-free: values used by rolled-back transactions are lost, and with InnoDB's default interleaved lock mode concurrent inserts are interleaved.. |
| L-0084 | simplified | low | Unconfigured, yes. |
| L-0122 | simplified | low | Simple, yes, but the single database is now a single point of failure for every service that needs IDs, so in practice it is replicated or run as a pair (Flickr ran two ticket servers for this reason). |
| L-0127 | simplified | low | About 4.29 billion only for an unsigned 4-byte integer; a signed 32-bit INT stops at about 2.1 billion. |
| L-0135 | imprecise | low | 16 bytes is 4x a 4-byte INT but only 2x a BIGINT, the realistic comparison (Snowflake-style IDs are 8 bytes). |
| L-0151 | imprecise | low | Flickr launched on 10 February 2004 and was one of the most popular websites by 2007 (19th by Alexa rank), before Instagram's 2010 launch. |
| L-0185 | simplified | low | auto_increment_increment and auto_increment_offset are dynamic MySQL variables, so no process reboot is needed. |
| L-0189 | imprecise | low | Twitter's original Snowflake (2010) was 'a network service for generating unique ID numbers', a Thrift server in Scala, not in-process logic. |
| L-0190 | simplified | low | Twitter retired the open-source 2010 release (repo archived Sept 2021); the README says the internal version is a full rewrite on Twitter's infrastructure. |
| L-0197 | simplified | low | Twitter's 41-bit time field counts milliseconds from a custom epoch ('millisecond precision w/ a custom epoch gives us 69 years'), not from 1970. |
| L-0199 | imprecise | low | In Twitter's original design the 10-bit 'configured machine id' identified a Snowflake server process (the README's 'up to 1024 machines'), not a tweet API server, because Snowflake ran as a separate service.. |
| L-0200 | imprecise | low | A fair design sketch, but Twitter's 2010 Snowflake was a separate network service the API tier called for IDs, not a function inside the API servers.. |
| L-0202 | imprecise | low | The 10-bit field caps Snowflake generator processes at 1024 ('gives us up to 1024 machines'), not tweet API servers. |
| L-0203 | simplified | low | Layout right. |
| L-0208 | simplified | low | The core bit-packing is a few lines. |
| L-0210 | imprecise | low | The no-central-service benefit holds when the logic runs as a library (Sonyflake, Instagram's in-DB function). |
| L-0211 | imprecise | low | Twitter did run a separate Snowflake service (a Thrift server) and scaled it. |
| L-0237 | simplified | low | Twitter's own Snowflake already used a custom epoch ('millisecond precision w/ a custom epoch gives us 69 years'), so the custom epoch is part of the original design, not a later improvement.. |
| L-0238 | simplified | low | 41 bits of milliseconds last about 69.7 years from whichever epoch you choose (Twitter: '69 years'). |
| L-0240 | simplified | low | Sonyflake is Snowflake-inspired but uses a different layout: 39 bits of time in 10 ms units, 8-bit sequence and 16-bit machine ID. |
| L-0256 | imprecise | low | Instagram did not use Twitter's Snowflake. |
| L-0261 | imprecise | low | The epoch constant in Instagram's published function is 1314220021721 ms, which is 24 August 2011, 21:07 UTC, not 1 January 2011 (the board reader flagged the mismatch). |
| L-0276 | imprecise | low | Instagram's shards are PostgreSQL, not MySQL: logical shards are Postgres schemas spread over a few physical servers. |
| L-0277 | simplified | low | Instagram's function is written in PL/pgSQL (PostgreSQL's procedural language), not Oracle's PL/SQL, and is a function used as a column default.. |
| L-0280 | imprecise | low | The variables match Instagram's function, but the epoch value 1314220021721 is 24 August 2011, not 1 January 2011 (see L-0261).. |
| L-0283 | imprecise | low | The arithmetic (now_ms - epoch) << 23 is exactly Instagram's code, but the custom epoch is 24 August 2011, not 1 January 2011 (see L-0261).. |
| L-0291 | simplified | low | The API-server limit goes away, but the ceilings move to the database: 2^13 = 8192 logical shards and 1024 sequence values per shard per millisecond.. |
| L-0292 | imprecise | low | The 10-bit field limits Snowflake generator processes (1024 'machines'), not API servers; Twitter ran Snowflake as a separate service.. |
| L-0295 | simplified | low | Banks do prefer a single authoritative sequence over Snowflake-style IDs, but as L-0294's note explains, plain auto-increment is not commit order under concurrency. |
| L-0299 | imprecise | low | Flickr's post never mentions gossip; its servers do not talk to each other. |
| L-0301 | imprecise | low | Only for the optional aesthetic reset of L-0182. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0069 | The article is 'The Friendship That Made Google Huge' (The New Yorker, December 2018), not '...Google special'. The bug-hunting details (bit flip, explosion or solar storm) could not be checked against the original because the New Yorker page could not be opened. |
| L-0101 | Personal account of Amazon's internal ID service; no public Amazon source describing it was found. |
| L-0102 | Amazon's internal ID service design is not publicly documented; the claim rests on the teacher's experience. The batched-range technique itself is standard. |
| L-0105 | Amazon-internal architecture; not publicly documented. The described design (stateless API tier, load balancer, relational counter table) is a standard range-allocator pattern, e.g. the segment mode of Meituan's open-source Leaf. |
| L-0106 | Amazon-internal detail (relational database behind the ID service) cannot be confirmed from public sources. |
| L-0116 | Amazon-internal batch sizes cannot be confirmed; the throughput-dependent sizing logic is sound. |
| L-0147 | MongoDB documents ObjectId's 12-byte layout but not the motive; 'went smaller to save four bytes versus a UUID' is the teacher's inference. |
| L-0191 | Twitter's announcement and README do not explain the name; the snowflake-uniqueness reading is plausible folklore. |
| L-0288 | Instagram media IDs are still numeric, but no public source from 2026 confirms they are still generated by the 2012 PL/pgSQL scheme. |

## Notes on sources

- instagram-engineering.com (Sharding & IDs at Instagram) refused connections and the Medium mirror returned 403; Instagram details were checked against the next_id function reproduced on depesz.com.
- blog.x.com (Announcing Snowflake) returned 403; the archived GitHub repository (snowflake-2010 tag and main README) was used instead.
- newyorker.com could not be fetched; the article title was confirmed via simonwillison.net, but the bit-flip anecdote was not.
- Crystal datasheets (Raltron, Microchip, NXP PDFs) were blocked or unreadable; the ECS Inc. technical note was used for the temperature curve.
