# Lecture 6 (lec03) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and `lectures/STORY_WRITER.md`, with the lec04/lec05 rewrites as models and the site review (`scratchpad/review/03-lec5-lec6.md`, Lecture 6 part) as the brief for what to fix. Source: `site/src/content/lectures/lec03.mdx` + `lec03/{s0-header,c1…c10}.mdx`.

## Chapters (words per built page: captions, code, tables, hidden pause and recall answers and page chrome included; SVG desc/labels and collapsed clip-as-text excluded)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook (two masters, order 3), Fig 0·a, where you are (Lectures 2, 3, 5), the two parts, what you'll be able to do, before you start | 1,060 (incl. chapter list) | – |
| 1 | Two databases, and both have an order 3 | 911 | About 5 min |
| 2 | The ID keeps growing. Then the machine reboots. | 1,273 | About 7 min |
| 3 | Which write came first? | 1,050 | About 6 min |
| 4 | One clock in one place. What if that place goes down? | 906 | About 5 min |
| 5 | Why not just use a UUID? | 976 | About 6 min |
| 6 | Amazon: must every order wait on the ID service? | 1,101 | About 6 min |
| 7 | Flickr: could MySQL itself be the ID service? | 1,167 | About 7 min |
| 8 | Tweets spike. Can the ID service disappear? | 1,348 | About 8 min |
| 9 | Page 1,000 of a profile crawls. Can the ID help? | 1,082 | About 6 min |
| 10 | Instagram wants no new service. Where does the ID go? (incl. bank question, finished ladder, What you can now do, 4 recall questions, hand-off to Lecture 7) | 1,559 | About 9 min |

Total ≈ 12.4k counted this way (≈ 11.4k without the overview’s chapter list and page chrome; code blocks count in full). The old page had ≈ 30.9k. Script: scratchpad `wc2.py` over `site.sh text` output.

**Spine.** Two masters both hand out order 3 → why one MySQL was fine (one engine owns the counter) → hold the “one-line config fix” question for chapter 7 → the job: `getid()`, a function, not a service → v1 epoch ms → + machine → + thread (“add what caused the collision”) → IDs keep growing → static atomic counter; time drops out → integer limits → reboot resets the counter → save to a file (fsync) → a disk write per ID → boot counter vs bank of IDs (pause) → flush every N → crash at 8: the safest value 10 (pause + clip) → unique, but which came first? → newer-write-wins needs order → increasing ≠ sequential → time on the left → clocks drift (quartz/temperature, sync daemons) → four clocks: 232, 244, 237, 239 (pause + clip) → strict order across machines almost impossible → one ID server, one clock; it must never go below its last value (clock steps) → shared DB with locks = same design → SPOF → two servers must gossip (pause) → distributed + strict + fast: pick two (TiDB/Spanner pay with coordination) → question the requirement → why not UUID? → every index entry carries the ID (pause: 1 GB) → plans run on indexes; hot part must fit in memory → UUIDs fine for small apps / unguessable (not a security control) / v7 → MongoDB 12 B → budget: 64 bits → Part 2 → Amazon (as one engineer tells it): central service, pause → batches; ranges from one counter row (stepper) = Lecture 3’s FOR UPDATE; decoupling; crash wastes a range; no order; don’t track waste (number sense); Go deeper: queue/Redis/DynamoDB → Flickr: ticket server, stub, upsert, `REPLACE INTO` (the delete is the point) → SPOF → two servers, pause → odd/even (chapter 1 question answered) → dies at 5: 7, 204 (pause + clip), reset cosmetic, Flickr doesn’t → Snowflake: 41 | 10 | 12 built from your own parts, pause (4,096/ms ≈ 4M/s), code + two guards, where it runs (Twitter: small uncoordinated Thrift service; or a library, e.g. Sonyflake), roughly sortable, decode a tweet ID, custom epoch (Discord) → pagination: offset recomputes (pause) → keyset seek (clip), since_id, the benchmark, limits, beyond SQL → Instagram: requirements, 41 | 13 | 10, logical shards (schemas), `next_id()` as the column default (code + stepper), sequence = static counter, must persist, API servers unlimited → would a bank use these? (pause) → finished ladder → what you can now do, recall → Lecture 7 (Instagram as a product).

## Figures

- **Added** `site/src/figures/lec03/so-far.tsx`: `SoFarGetId` (stages 0–10), the `getid()` ladder that grows chapter by chapter, with a “born in” column (your code / an ID service / the database) so the finished ladder (stage 10, Fig 10·e) doubles as the review’s “where the ID is born” map. Desk 640, phone 330 (phone uses short born tags with a legend, and a legend line instead of the “new” note). Stage 5 adds the footer “every ID: 64 bits or less” (chapter 5’s budget). Only kit parts.
- **Kept**: TwoMasters (now overview Fig 0·a), OneMachine, TwoMachinesPanel + ThreadsPanel, ThreadsToCounter (stepper), WhichWriteFirst, TimeFirst, DriftingClocks, OneIdServer, TwoIdServers, IndexTable, QueryRuns, ObjectIdBar, RangesFromRow (stepper), FlickrFlow, TicketTable, OddEven, SnowflakeBits, DecodeTweetId, EpochRunway, TwoLayouts, LogicalShards, OneInsertOneId (stepper). All four clips: l03-flush-crash, l03-clock-skew, l03-odd-even, l03-offset-vs-keyset (renumbered 2·1, 3·1, 7·1, 9·1; MDX captions rewritten, clip files untouched, so no poster regeneration).
- **Fixed figure text**:
  - OneIdServer: bubble “my clock never goes back” → “never below my last id”; desc rewritten (fact-check L-0076/L-0077: clocks can step back; the generator must guard).
  - IndexTable desc: “the lecture’s rough estimate … 1 GB to 4 GB” → a plain statement that the index grows by a multiple.
  - TicketTable: table renamed `Tickets64` (Flickr’s real name, matching the text) and desc now describes the REPLACE path (row replaced, new auto-increment id).
  - LogicalShards: “say, 10–15 of them” (unverifiable) → “far fewer of them”; `CREATE DATABASE insta5;` → `CREATE SCHEMA insta5;` + “one schema per logical shard”; desc dropped “(10 to 15 in the class’s example)” (banned word, unverifiable number); phone height trimmed.
- **Dropped from the page**: LectureMarks legend and NotationKey; FunctionFirst, AddTheCause, RelaxOrder, RuleSketch4, RuleSketch5, RuleSimple, RuleIdInDb, RuleDisk (slogan sketches); IncreasingStrip (one sentence does it); SixVersions (superseded by the growing ladder); SnowflakeInApi (titled “as taught”, and showed the library-only picture the fact-check corrects); MoveHotShard (sharding detail for Lecture 9); SkipPanel/SeekPanel (the clip is the one representation); the TradeoffTables; WhereBorn (folded into the finished ladder).
- **Files deleted** (nothing imports them; `content/samples` checked): `s9-keep-figs.tsx`. Unused exports left in surviving files: FunctionFirst, LectureMarks, SixVersions, AddTheCause, IncreasingStrip, RelaxOrder, RuleSketch4, RuleSketch5, SnowflakeInApi, RuleSimple, MoveHotShard, RuleIdInDb, SkipPanel, SeekPanel, RuleDisk.
- Old `s1-why-own-ids.mdx … s9-keep.mdx` deleted; `s0-header.mdx` rewritten; new `c1-order-three … c10-instagram`.

## Fact-check corrections, each stated once in the main text

- Clock never goes back (L-0076 wrong/high, L-0077): small offsets slewed, large ones stepped (ntpd 128 ms); generator never issues below its last value, waits or refuses (§4.1, code guard in §8.2).
- Quartz drift direction (L-0067 wrong): rate varies with temperature, worse away from ~25 °C either way (§3.3); the fire/ice analogy is cut.
- NTP as a continuous daemon (L-0064) (§3.3).
- Snowflake as a service (L-0189/0199/0200/0201/0202/0210/0211): said once in §8.3 — Twitter’s 2010 Snowflake was a small uncoordinated Thrift service; the 10 bits name generator processes; the same idea runs as a library (Sonyflake).
- 4,096/ms ≈ 4 million/s (L-0207), shift 22 not 23 (L-0209), wait-for-next-ms and clock-back guards (L-0203/0208) (§8.1–8.2).
- Flickr’s real query `REPLACE INTO Tickets64 … ; SELECT LAST_INSERT_ID();` (L-0172), REPLACE usually slower, 32× as one measurement (L-0171), and why the delete matters with step/offset (§7.1–7.2).
- Flickr never gossips or resets; sides drift, “hurts no one” (L-0300/0301/0185) (§7.3). The gossip/Lamport Q&A is cut.
- UUID 4× vs INT, 2× vs BIGINT (L-0135/0154); v4 poor index locality (L-0129); UUIDv7 (L-0093 outdated); not a security control (L-0143) (§5).
- Indexes: the hot part must fit; pages cached on demand and evicted (L-0136/0140); table rows read unless covered (L-0137/0138) (§5.2).
- Integer limits signed/unsigned (L-0028/0127) (§2.1).
- fsync (L-0033) (§2.2).
- Increasing vs sequential (L-0054) (§3.1).
- Keyset: works with filters/sorts an index matches; real cost is no page jumps (L-0234/0225/0235); efficiency from the index on the ID, InnoDB clustered PK (L-0229/0233); Elasticsearch `max_result_window` + `search_after` (L-0250); collation (L-0310) (§9).
- Instagram: own Snowflake-like layout (L-0256), epoch 24 Aug 2011 (L-0261/0280/0283), PostgreSQL schemas (L-0267/0269/0276), PL/pgSQL (L-0277) (§10).
- Auto-increment commit order / ledgers serialize per account (L-0294/0295) (§10.3).
- Strict order elsewhere costs coordination: TiDB TSO, Spanner (L-0073/0081) (§4.2).
- Flickr dates (L-0151): “the big photo site of the 2000s” (§7).

## Cut, and why

- **Admin and course plumbing**: agenda, break, week/day, YouTube/members-only videos, Numberphile, Prometheus anecdote, “interviews are crappy”, CDC deferral, “how this page reorders the class”.
- **Q&A tangents**: Lamport clocks and gossip at Flickr; MySQL Group Replication increment 7 (cut in the last trim for length); sequences per table / MySQL one AUTO_INCREMENT; sequence CACHE holes and InnoDB redo-log reissue; queue exactly-once (kept only as the ch6 Go deeper); “does every table get a sequence”; Discord’s 42-bit documentation and Sonyflake’s bit layout; X API pricing; benchmark spike at 6,000 records.
- **Engine internals**: buffer-pool 25% dump, 80% of RAM, covering indexes beyond one clause, InnoDB secondary-index detail beyond one sentence, PostgreSQL `serial` shorthand.
- **War stories trimmed or dropped**: Jeff Dean/Sanjay bit flip (details unverifiable, off-road); “database is the most brutal component” (Lecture 2 territory); Instagram “still does this” (unverifiable); 10–15 physical servers (unverifiable).
- **Kept but folded in**: Amazon “sat next to the team” (told as one engineer’s account), 150 lines of Python, batch sizes 10k–100k; the 2016 benchmark (told as one engineer’s story, “bored at Amazon”, the disk-throttle delight); “first check index size” (ch5 Go deeper as one engineer’s habit); the microservice opinion (ch8 Go deeper, with Fowler); the student ideas (boot counter, bank of IDs, max-row-ID, increment-by-N, random suffix, per-server prefix, track used IDs, cache the sequence, round robin for Snowflake) as the reader’s own questions; increment-by-N held back in ch1 and paid off in ch7.
- **Furniture**: notation legends, rule boxes and their sketches, check-yourself blocks per chapter (one set of 4 recall questions at the end), SectionEnd concept lists, ForwardChips, TradeoffTables, eight-habit list, class timestamps.

## Incoming links (other lectures into lec03), for the coordinator

- `site/src/content/lectures/lec09/s4-storing-the-post.mdx:67` `s7` → `s10-2` (how Instagram mints the post’s 64-bit id inside its database; `s10` for the whole chapter). Old `s7` now lands on Flickr.
- `site/src/content/lectures/lec10/s9-record-format.mdx:95` `s6-1` → `s3-2` (the timestamp on the leftmost side of an ID). Old `s6-1` now lands on Amazon.
- `site/src/content/lectures/lec08/c8-lock-store-dies.mdx:139` links `lec="lec03"` with no `sec`: no change needed. Its closing picture (two masters, order 3) is the same hook this lecture opens with; the overview now says Lecture 5 “ended on exactly the picture above”. Re-check if lec08 changes its ending.

Old → new section map for anything else: s1 (why own IDs) → s1-1; s2-1..s2-3 (v1–v4) → s1-3, s1-4, s2-1; s2-4 (reboot) → s2-2; s2-5/s2-6 (disk, flush, safest value) → s2-3/s2-4; s3-1..s3-5 (order, time-left, clocks, four clocks) → s3-1..s3-4; s3-6..s3-8 (one server, gossip, relax) → s4-1..s4-3; s4 (ID size) → s5; s5-2..s5-4 (Amazon) → s6; s5-5..s5-8 (Flickr) → s7; s6 (Snowflake) → s8 (custom epoch s6-6 → s8-5); s8 (pagination) → s9; s7 (Instagram) → s10-1/s10-2; s9-1 (bank) → s10-3.

## Self-check

- `pipeline/bin/site.sh build lec03`: ok (14 pages).
- `links lec03`: zero broken.
- `figures lec03`: ok at 360/390/768/1440, light + dark. The ladder’s phone labels were raised to 13.5 and two phone rows shortened to pass the 12 px floor at 360; two long inline code spans (ch9 pause answer, ch10 bullet) were split to stop horizontal scroll at 390.
- QA screenshots in `lectures/lec03/story/shots/` (chapters 2, 4, 7, 8, 10 at 1440 and 390, light and dark): no failures. Looked at the ladder (desk and phone, stages 1, 7, 10), Fig 4·b, 7·c, 10·c.
- Grep over every built lec03 page (HTML incl. SVG title/desc/aria) and `page_text.md` for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student`: **0 hits**.
- Snowflake code run in Python: 10,000 IDs unique and sorted; `snowflake(1676784716000, 7, 0)` = 1627179151913938944, matching Fig 8·c. MySQL and PL/pgSQL samples checked by reading (MySQL 8: `START TRANSACTION … FOR UPDATE`, `REPLACE INTO`, `LAST_INSERT_ID()`; Postgres: `CREATE SCHEMA/SEQUENCE`, PL/pgSQL function with `OUT result bigint`, `clock_timestamp()`).
- **Titles alone**: two databases both have an order 3 → the ID keeps growing, then a reboot → which write came first? → one clock in one place, what if it goes down? → why not just use a UUID? → Amazon: must every order wait? → Flickr: could MySQL be the service? → tweets spike, can the service disappear? → page 1,000 crawls, can the ID help? → Instagram wants no new service, where does the ID go? No title states its answer.
- **Pauses**: 11, every answer hidden until a choice is clicked; the paragraph after each was checked not to restate it. The ch1 config question is deliberately left open in prose and answered by the ch7 pause.
- **Limits**: one Go deeper per chapter at most (ch5, ch6, ch8, ch9), each under 120 words; no rule boxes.

## Shared files

None edited. No clip files changed.

## Unsure

- **Length.** 12.4k by the lec05 counting method (lec05 was 12.1k). Chapters 1 and 4 sit just over the 900 floor.
- **Twitter epoch constant** `1288834974657` in the §8.2 code and Fig 8·c is not in this lecture’s fact-check files (it is Twitter’s published `twepoch`); kept from the previous page.
- **The 2016 benchmark** is told as “one engineer” without naming the author; the old page linked the author’s blog. Left unlinked to avoid a personal attribution the ledger only gives first-hand.
- **`epoch` as a PL/pgSQL variable name** next to `EXTRACT(EPOCH FROM …)`: kept to match the stepper (`OneInsertOneId`) labels; Instagram’s original used `our_epoch`. Not run against a live Postgres.
- **§9.4 “an index on (user_id, id)”** is my application of the keyset fact-check (A-PEM-03), not a lecture example.
- **course.json** still carries the old topic strings for lec03 (shared file, untouched).

## Revision 2 (review_facts.md, review_reader.md)

### Word counts (same method)

| Page | Words |
|---|---|
| Overview | 1,060 |
| Ch1 | 887 |
| Ch2 | 1,413 |
| Ch3 | 1,106 |
| Ch4 | 924 |
| Ch5 | 1,036 |
| Ch6 | 1,086 |
| Ch7 | 1,287 |
| Ch8 | 1,393 |
| Ch9 | 1,230 |
| Ch10 | 1,627 |

Total ≈ 13.0k, up from 12.4k: the review asked for more than it removed (new §9.3, the two-master close in §7.2, Instagram's missing guards, the write-ahead/write-behind distinction).

### review_facts: every item applied

- **F-01 (high):** the flush code now saves the new start (`save_counter(counter)` after `load() + N`), with the "crashes again before its next flush" sentence in §2.4. The clip caption now reads "Restart past the flush window, and save that new start first, and they don't". The §10.4 bullet and recall 1 say the same. The teacher's board code had the same gap, and the page now states the corrected code as the method.
- **F-02:** §5.1 pause answer uses the review's 8 → 20 bytes text. "1 GB → 4 GB" is gone. "Either way it is a multiple" became "how much the whole index grows depends on what else its entries hold".
- **F-03:** the ch8 Go deeper box is reframed. The layout shows a service often isn't needed (Sonyflake, Instagram); it no longer says "Snowflake argues the other way".
- **F-04:** the keyset answer keeps `user_id = ?`, split into two code spans for 390 px.
- **F-05:** the ch8 opening now says "a coordinated ID service …".
- **F-06:** Fig 10·e caption notes that Twitter's first version ran Snowflake as a small service.
- **F-07:** the ch9 hand-off is reworded.
- **F-08:** the §2.4 pause answer and recall 1 are reasoned as "the save point itself may have gone out".
- **F-09:** `m1-1730-04` in the stepper step text and in ThreadsToCounter (labels and desc).
- **F-10:** `ENGINE=MyISAM -- as in Flickr's post`. §7.3 now says why the counter survives (MyISAM; InnoDB since 8.0).
- **F-11:** getid() blocks are fenced as `text`, plus "(The versions here are sketched in pseudocode.)" in §1.3.
- **F-12:** "waits or refuses" is cited to Twitter's Snowflake; the clock_gettime cite is kept only for CLOCK_MONOTONIC.
- **F-13:** "the year Discord launched", in the text and in the Fig 8·d desc.
- **F-14:** the §3.4 pause answer gives 232, 244, 237, 239.
- **F-15:** the PostgreSQL sentence is added in §5.1.
- **F-16:** "in 2016, by their own account".
- **F-17 (loss L-0160/0161):** "how to study another company's design" is added in §7.1.

### review_reader: applied

- **Top 1 / 3a:** v7 is now "version 6 with time put back in front: time, machine, counter" (code, TimeFirst labels/desc, ladder `epoch_ms + machine + counter`). §3.4 notes the counter is left off the 23/24 numbers. v8 = "v7, on one ID server" (4c).
- **Top 2 / 2a:** §2.2 says version 3's time part would have survived the restart, and that you dropped it for length.
  - The transcript (00:12:58–00:16:04) doesn't say this. It follows directly from what the page already shows, so it is stated as an observation, with no new fact.
- **Top 3 / 2b:** checked in the ledger. L-0040 (the student's bank: store +1000 first) and L-0042/43 (the teacher's flush code: save every N, start at load()+N) are two different schemes the lecture merged.
  - The page now says the bank writes ahead and the flush writes behind (option b).
- **Top 4 / 9a:**
  - The intro now says plainly that the profile fix needs any comparable ID.
  - The new §9.3 "And the batch job's 'last hour'?" turns "an hour ago" into a start ID, `(now_ms - 3600000 - EPOCH) << 22`. This is grounded in L-0215 (before/after a time from IDs alone) and L-0220/L-0226.
  - The pause question no longer mentions time-first.
- **Top 5 / 7a:** the lecture's reasoning, from transcript 00:48:36 and 01:17:56–01:22:26 with L-0091/L-0152/L-0164:
  - Step-by-N works on your two masters, with the drift 7.3 shows (the "slight disadvantage" the teacher deferred to Flickr).
  - Flickr's photos were sharded multi-master, so it moved ID generation to one central, separate ticket database.
  - No other reason is invented.
- **Top 6 / 8a, 8b:** chapter retitled "Tweets spike. Can the ID service stop coordinating?". §8.3 is now "Does Snowflake need a service at all?". Box fixed (F-03).
- **Top 7 / 5a, 5b, 8d:** F-02 text. Fig 5·b moved after the pause. The §8.1 pause moved before Fig 8·b.
- **Top 8 / 10a, 10c:**
  - One observation sentence on the missing guards. I didn't claim what Instagram intended, because the sources say nothing.
  - Sequence persistence is tied to chapter 2 (L-0306/L-0307). Postgres's WAL-ahead details are not in the sources, so they are not claimed.
- **Top 9 (repeats):**
  - Cut "So wherever you need order…" (folded into the clip caption).
  - Cut "The jump … not correctness".
  - The ch2 clip lead no longer re-asks.
  - The ch9 clip now follows the pause directly, and "Log n, then ten…" is cut.
- **Top 10, O1, O2, 1a, 3c, 4a, 6b, 9b, 9f:** summaries reworded; "sooner than they think" and "most misunderstood" cut; opening praise moved to the end of 10.2; dangling "Almost." fixed; "the cost chapter 4 set aside"; slowdown phrasing no longer contradicts 500–600 records.
- **Also:**
  - 1b: "as long as no single thread asks twice in one millisecond".
  - 1c: `get_id()` everywhere: prose, ladder title and frontmatter. It matches the clip's on-screen `get_id`.
  - 2c: clip lead.
  - 2d: "again in chapter 7".
  - 2e: ladder v5/v6 read "machine + counter, saved each call / every N".
  - 2f: boot-counter note in the Fig 3·a caption.
  - 3b: the T1/T2 example is now the two masters, via Lecture 2's multi-writer warning (checked on lec01 c2).
  - 3d: clock scale.
  - 4b: "add a buffer" dropped (the lecture gives no reason for it).
  - 4d: "In practice".
  - 5c: first paragraph no longer gives the answer.
  - 5d: RAM rule.
  - 6a: sourcing said once.
  - 7b: why delete then insert.
  - 8e: ch8 closing hand-off.
  - 9c: the (user_id, id) index is in 9.2.
  - 9e: anecdote cut, year hedged.
  - 10b: opening praise moved.
  - 10d: "41 + 13 + 10 = 64".

### review_reader: rejected, with reasons

- **O3 "Lecture 06" in footers and chrome:** my kicker and description now say "Lecture 6". The "Lecture 06 · … chapter N of 10" lines come from the shared page template, so I didn't edit them. Flagged for the coordinator.
- **6c "150 lines of Python":** it is in the ledger (L-0104), so it is kept.
- **7c "32×":** it is the teacher's own measurement (L-0171). It is kept, already hedged as "one benchmark on one setup". There is no link to give, and "the extra work is tiny" would be unsourced.
- **8c tweet-rate number:** the lecture gives none (L-0211), so none was added.
- **5a's "2.5 GB / full 4× in the PK index":** review_facts F-02 wins. No GB figure is given.
- **9e link to the benchmark post:** left unlinked (personal attribution). review_facts accepts that.

### Section ids

- New in ch9: `s9-3` (last hour), `s9-4` (benchmark, was s9-3), `s9-5` (limits, was s9-4). No other ids changed.
- **Incoming links: map unchanged.**
  - lec09 `s7` → `s10-2`.
  - lec10 `s6-1` → `s3-2`.
  - lec08 has no `sec`.

### Checks

- build: ok (14 pages).
- links: zero broken.
- figures: ok at 360/390/768/1440, light and dark.
- Banned-word grep (adding "teacher") over the built HTML and `page_text.md`: 0.
- `page_text.md` regenerated.

## Revision 3 (review_facts_final.md, exam_grade.md)

- **N-01:** the v7 code comment now says "fixed-width parts". §3.2 adds the sentence on fixed widths (machine 1 with counter 12 vs machine 11 with counter 2).
- **N-02:** the TimeFirst rows are now machine + climbing counter (1729 1001, 1729 2001, 1730 1002, 1730 2002, 1730 1003, 1731 2003), with the desc rewritten. The §3.2 examples are `1729 1001` …, and the flip example is `1729 2004` then `1729 1005`.
- **N-03:** the last-hour query uses `id >= :start_id`.
- **N-04:** §4.1 now reads "It runs version 7 in one place: time, machine, counter, with the same machine part on every ID."
- **N-05:** §2.3 now says the bank restarts "just past" the stored value.
- **N-06:** §1.1 asks for "a small configuration change"; §7.2 says "that pair of settings is the whole fix".
- **Q066 (CUT-LOSS, L-0157):** added in §5.2 before the rule of thumb. The sentence says the database is the hardest part of the infrastructure to scale: API servers keep no state, while the database stores everything, is queried for everything and carries the whole load. Checked against L-0157 and transcript 01:20:09.
- **Checks:**
  - build: ok (14 pages).
  - links: zero broken.
  - figures: ok at 360/390/768/1440, light and dark.
  - Banned-word grep over the built HTML and `page_text.md`: 0.
  - `page_text.md` regenerated. Total ≈ 13.1k.
- **Section ids:** unchanged; the incoming-link map stands.
