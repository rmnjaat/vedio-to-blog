# Lecture 1 (lec04) story rewrite: final fact and faithfulness re-check

Scope: the final `site/src/content/lectures/lec04/s0-header.mdx` and `c1`–`c8`, plus the text of every figure the page imports (`site/src/figures/lec04/*.tsx`: labels, descs; captions live in the MDX).
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`.

**Result:** all 20 earlier items are fixed (10 errors, 5 inventions, 5 lost ideas). The fresh pass found **4 new low-severity issues**, 3 of them in the rebuilt chapters 6–8 and 1 in a figure desc. There are no medium or high issues. One optional attribution note follows.

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| E1 c1 §1.3 Go deeper | **Fixed** | “The server still learns that a device died from silence: these connections carry their own small keep-alive pings, and when the pings stop, the server closes the connection and marks the user offline.” |
| E2 c3 §3.1 speed | **Fixed** | “Redis serves from RAM over connections your server keeps open … For reading a dot, the gap rarely matters … Where time sensitivity does count is when you want to hear about a change the instant it happens, and that comes from the open connection, not raw speed (section 3.4).” |
| E3 c1 §1.3 link text | **Fixed** | “<LectureLink lec="lec02">Lecture 4</LectureLink> builds Slack’s real-time messaging on those persistent connections.” |
| E4 c3 §3.2 availability | **Fixed** | “Availability and autoscaling depend mostly on whoever operates the store, though the product sets limits too: AWS commits to 99.99% availability for DynamoDB, and Redis’s asynchronous replication can lose acknowledged writes on a failover however good your team is.” |
| E5 c3 §3.3 Netflix | **Fixed** | “…rewriting that much code would be enormous, and a customer that large may well have a deal that makes staying worthwhile, though its terms aren’t public.” |
| E6 c5 §5.3 pool max | **Fixed** | “Many teams set it a little higher, say 15, because one server is sometimes busier than the rest; it is a common practice, not a standard. Know what it costs: …” |
| E7 Fig 2·c “see 2.7” | **Fixed** | The section reference is gone; the label now reads “absence = offline: 100k active → 100k rows = 800 KB (rows of silent users are deleted)”. |
| E8 Fig 2·b PulseTable | **Fixed** | Labels: “UPSERT pulse / SET last_hb = now / WHERE user_id = u1”, “epoch seconds”, “for each id in GET /status/users”. Desc: “every heartbeat upserts the user’s row with the current time in epoch seconds … a status read applies two rules to each requested id”. (The label is pseudo-SQL; the exact upsert is in the code block below the figure.) |
| E9 Clip 2·1 caption + recall 1 | **Fixed** | Caption: “if the last write before a user goes quiet forgot EX, that user stays green forever.” Recall: “A plain `SET` clears the expiry, so if that was the user’s last beat, the key never goes away.” |
| E10 c7 PauseAndThink | **Fixed** (now §7.4) | “Against the date-time column Redbus had, it bought the speed they needed *and* stayed readable.” |
| I1 c3 §3.5 single verdict | **Fixed** | “Two write-ups are both defensible here. A lean team … **DynamoDB** … A team that wants to hear about expiries … **Redis**, managed unless … Which one is right depends on your team, your cloud and what the feature will need next.” §3.2 now also says lean teams are pulled “towards DynamoDB”, and Fig 4·a’s caption (“Redis or DynamoDB”) now agrees. |
| I2 c1 §1.4 beats rationale | **Fixed** | “…so one or two delayed or lost beats don’t flicker a live user grey.” |
| I3 c4 §4.1 “many teams” | **Fixed** | “A disk-based relational database committing 100,000 durable single-row updates every second is a much harder ask.” |
| I4 c7 time zones | **Fixed** | “Time zones burn a lot of teams, so the rule is simple: store UTC, …” |
| I5 c7 custom formats | **Fixed** | “`YYYYMMDD` integer keys are common in data warehouses.” (The unsourced general claim is gone.) |
| Lost 1 open source vs proprietary | **Fixed** | c3 §3.3: “Redis is open source and runs anywhere, while DynamoDB is a proprietary AWS product. [[L-0098]]” |
| Lost 2 persistent connection | **Fixed** | Via the E2 fix in §3.1, and again in §3.4 and Fig 3·c. |
| Lost 3 six components | **Fixed** | c6 intro: “Almost every design decision falls under one of six topics: database, caching, scaling, delegation, concurrency and communication. The green dot touched them all; the blog’s month works through the first two…” |
| Lost 4 scale up, then shard | **Fixed** | c5 §5.3: “…the first answer is a bigger database. Past what one machine can give, you split the data across several (sharding, in Lecture 2), which is why a design that has to grow should be able to scale out, not only up.” |
| Lost 5 spiral/incremental | **Fixed** | c1 intro: “Neither is a rule, and most projects mix the two.” |

The side note on `lec02/s2-documents-kv.mdx` (a stale quoted section title) was outside scope and was not re-checked.

---

## 2. Fresh pass: new issues

### N1 (low): c7 §7.1, the version-1 date column
- **Current text:** “In version 1, `published_at` went in as text, exactly as the editor sent it: `'2022-04-02 09:01:36'`. To answer `published_at > :week_ago`, the database has to cast that string to a date on every row it checks, and an index on the column can’t help.”
- **Problem:** The example string is in ISO order (year-month-day hour:minute:second), and ISO strings sort correctly as plain text. Compared against a text parameter in the same format, an ordinary index on the column *does* work, so the sentence is not true as written. The lecture’s own example was the board’s `02-04-2022 T 09:01:36 Z` (day first), which does not sort as text and forces the per-row parse the teacher described (L-0203, L-0204; transcript 01:53:35–01:55:29). The claim “an index can’t help” isn’t in the ledger or the fact-check.
- **Fix:** “In version 1, `published_at` went in as text, exactly as the editor sent it: `'02-04-2022 09:01:36'`, day first. Text in that order doesn’t sort by date, so to answer `published_at > :week_ago` the database has to parse the string into a date on every row it checks, and an ordinary index on the text can’t answer the comparison.”

### N2 (low): c7 §7 intro, scale that doesn’t match the symptom
- **Current text:** “It looks harmless, and with a few hundred posts it was. A month in, with thousands, it is the slowest page on the site.”
- **Problem:** This is the writer’s narrative, not the lecture. A scan of a few thousand rows, even with `SELECT *`, is not slow on any real database, so a reader who knows databases will not believe it. The lecture gives no row count (L-0204 only names the query).
- **Fix:** “It looks harmless, and while the table was small it was. As the posts pile up, it becomes the slowest page on the site.”

### N3 (low): c6 §6.3, batch size disagrees with the code, the figure and the ledger
- **Current text:** “Spread it across the day instead, a few thousand rows at a time at a steady pace…”
- **Problem:** The SQL directly below uses `LIMIT 1000`, Fig 6·c says “DELETE … LIMIT 1000”, and the lecture’s figure was “about 1,000 rows at a time” (or 10,000 an hour) (L-0283).
- **Fix:** “Spread it across the day instead, about a thousand rows at a time at a steady pace…”

### N4 (low): the `YourTurn` figure desc (Fig 8·d, `s6-cache.tsx` line 297), a stale cross-reference
- **Current text:** “The blog architecture from Fig 6·b drawn faint: users, a CDN cloud in front, …”
- **Problem:** On the final page, Fig 6·b is the blog *schema* (`BlogSchema`), not the architecture. This number is left over from the old structure.
- **Fix:** “The blog architecture drawn faint: users, a CDN cloud in front, the load balancer, three API servers, the shared cache and the database.”

### Optional (attribution, low): c7 §7.4, Redbus
- **Current text:** “There is a third way, and it comes from a real team. In 2016, the bus-booking site Redbus had a table…”
- **Note:** The fact-check marks L-0214, L-0215 and L-0227 *unverifiable*: it is a second-hand story that the teacher heard from a friend who did it, and there is no public source. The policy in `factcheck_applied.md` is to present unverifiable items as experience, not established fact. Naming the company makes this matter more than it does for the anonymous startup stories.
- **Suggested:** “There is a third way, from a team at the bus-booking site Redbus, as an engineer who worked on it tells the story. In 2016 they had a table…”

---

## 3. What I checked and found correct (chapters 6–8, rebuilt)

- **c6:** the schema (bio is about 140 characters; the teacher said both 128 and 140, L-0171/L-0189); the hard-delete wording “your application can’t get it back” (matches the L-0174 nuance); the three reasons and Google Drive’s 30 days; the GDPR caveat on archival (L-0177 fact-check); the harassment story told without saying it was the teacher (accepted earlier); soft delete gives time to archive (L-0308); staggered deletion, and “locks briefly, commits quickly” (L-0230 fact-check); MySQL `DELETE … LIMIT`; the pool-connection cost (L-0295); MongoDB TTL every 60 s (L-0298 fact-check); the partial unique index (L-0296 fact-check); GDPR one month (+2), Art. 17(3) exceptions, backups kept beyond use, and territorial scope (L-0266/0267/0268/0270/0273); the six topics and “Lecture 2 takes the other four on the same blog” (L-0168, L-0259; lec01 = “Medium under load”, sections caching, scaling, delegation, concurrency, communication).
- **c7:** the seven-day query (L-0204); the row store without the “fixed-width” error (L-0190 fact-check: wrong, correctly dropped); InnoDB’s 20-byte off-page pointer, PostgreSQL TOAST at about 2 kB, the half-page row limit and utf8mb4 at 4 bytes (L-0193/L-0197 fact-check); the excerpt column (L-0198); DATETIME at 5 B, PostgreSQL timestamp at 8 B and native types indexing well (L-0208/L-0213 fact-check); the epoch value `1648890096` = 2022-04-02 09:01:36 UTC (recomputed); Redbus’s YYYYMMDD format, readability over epoch and the analytics-like workload (L-0215–L-0222, L-0227); UTC and native zone handling (L-0224 fact-check); 2038, 64-bit, negative epochs, and the MySQL 1000–9999 and PostgreSQL 4713 BC–AD 294276 ranges (L-0231–L-0235 fact-check); the trade-off table (L-0220).
- **c8:** the cache definition, with three things saved (L-0239–L-0244); memoization; hash table plus limit, eviction and expiry (L-0246 fact-check); a remote cache logically between the API servers and the database (L-0248); cache-aside (L-0249); one copy and the network hop (L-0250–L-0252); Lecture 9 builds a cache (lec07); a table or materialized view as a cache (L-0260/L-0261); the hash lookup against a B+ tree walk, worst case from disk, and the buffer-pool caveat (L-0286–L-0289, L-0299/L-0300 fact-check); RAM cost, a cache table loading the same database, and managed Redis pricing (L-0290, L-0293, L-0294); compressing in the app (L-0277/L-0279); the CDN and load balancer hints and the client-device question (L-0256, L-0262); the Goldman Sachs participant described as “a large bank” (L-0255); lec01 opening with “Where can a cache go?”; all four recall answers.
- **Figures in use for chapters 6–8** (BlogSchema, DeletedLife, LongShortText, ThreeDates, EpochLine, WhatACacheSaves, YourTurn, SoFarBlog stages 0–3): all labels and descs agree with the text, except N4.
- **Chapters 1–5 re-read:** no new issues. Spot-checked again: Redis at about 100k SET/s (L-0104 fact-check); HikariCP’s 30 s wait and 10 min idle timeout; PostgreSQL `max_connections` 100; the ALB’s 30 s interval and threshold of 2; Amazon Food 2020–2022; PostgreSQL’s 23 B header and 4 B pointer; 1B ≈ an eighth of the world.
- **Leftovers:** none in reader-facing text (no teacher, student, class or timestamp references).
