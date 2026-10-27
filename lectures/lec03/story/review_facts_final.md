# Lecture 6 (lec03): final fact re-check (check 4b)

Scope: the Revision 2 pages, `site/src/content/lectures/lec03/{s0-header,c1…c10}.mdx`, the figure text they import, and the four
clip captions. Checked against `review_facts.md` (F-01 to F-17), `NOTES.md` (Revision 2), the ledger and fact-check files. Revision 1
was never committed, so there is no diff. Every chapter was read in full, with extra attention on the text NOTES lists as changed.
No page file was edited.

## How the code was re-run

Scripts and output are in the session scratchpad (`f4b/`). Results:

- **Flush every N with save-on-start (§2.4).** The page's code was modelled with crash loops of 1 to 6 boots. Each run crashed at a
  random point, and the last periodic save before a crash landed or not at random (20,000 runs each, N = 3 and N = 1000).
  - With `save_counter(counter)` after `load() + N`: **0 runs with a duplicate**.
  - Without that line, as in Revision 1: 8,844 of 20,000 runs (N = 3) and 10,790 (N = 1000) issued a duplicate.
  - Walkthrough: disk 6 → counter 9, 9 saved → first ID 10. Recall 1: disk 5,000 → 6,000 saved → first ID 6,001. Both match the text.
  - **Correct.**
- **v7 time + machine + counter (§3.2).** `concat(get_epoch_ms(), machine_id, counter++)` was run as a number in three variants.
  - Fixed-width parts: unique and time-ordered across 4 machines and 100 ms (2,707 IDs).
  - Variable-width parts: `concat(1729, 1, 12)` = `concat(1729, 11, 2)` = 1729112, so two IDs collide.
  - Variable-width order also breaks: `concat(1729, 1, 100)` = 17291100 is larger than the later `concat(1730, 2, 5)` = 173025.
  - The page's examples (`1729 0001`) imply fixed width, but the code and prose never say so. The examples also imply a counter
    that resets every millisecond, which the code doesn't do. See N-01 and N-02.
- **"Last hour" start ID (§9.3), `(now_ms - 3600000 - EPOCH) << 22`.**
  - Python, with Twitter's EPOCH and now_ms = 1,676,784,716,000: start_id = 1,627,164,052,419,510,272. It fits a signed BIGINT and
    decodes back to exactly now − 1 h.
  - 200,000 random Snowflakes from a 2-hour window: no ID from before the hour is included, and no ID inside it is excluded,
    except the single ID at exactly that millisecond with machine 0 and counter 0. That ID equals start_id, so `>` drops it. See N-03.
  - PostgreSQL 14.20, 300,000 Snowflake-ID rows: `id > :start_id` counted 150,332 rows. Decoding every ID and filtering on time
    counted 150,332. Paging the hour in keyset batches of 1,000 also gave 150,332. The plan is an index scan on `tweets_pkey`.
  - **Correct** (one off-by-one at the boundary).
- **Keyset query (§9.1), `WHERE user_id = ? AND id > :last_id ORDER BY id LIMIT 10`, with the `(user_id, id)` index from §9.2.**
  - PostgreSQL 14.20: all 146 pages for one user (1,452 rows) matched `LIMIT 10 OFFSET n` row for row, with 0 mismatches.
  - The plan is an index scan on `(user_id, id)`, with both conditions in the index condition.
  - The Revision 1 form, without `user_id`, returned 10 of 10 rows from other users.
  - **Correct.**
- Also re-run because it is cheap: the §10.2 Instagram block runs unchanged on PG 14.20 and decodes to shard 5, seq 1 and 2. The
  stepper value 3041413094946379657 recomputes.

## Status of every review_facts.md item

| Item | Sev. | Status | Current text |
|---|---|---|---|
| F-01 flush code never saves new start | high | **Fixed** | c2 §2.4 code: `int counter = load() + N;` / `save_counter(counter);                // remember the new start before handing anything out`. Prose: “Then save that new start before handing out anything. Otherwise, if the machine crashes again before its next flush, the disk still says 6, and the restart hands out 10 a second time.” Clip 2·1 caption: “Restart past the flush window, and save that new start first, and they don’t.” §10.4: “… restarted at the safest value (last saved + N + 1), and that start saved before the first ID.” Recall 1: “… and saves 6,000 as its new start before handing out 6,001.” The clip's own on-screen text doesn't show the start being saved, but it doesn't contradict that step. Simulation: 0 duplicates. |
| F-02 “index heads toward 4 GB” | medium | **Fixed** | c5 §5.1 pause: “The ID part of every entry is four times wider. With a 4-byte `user_id` beside it, each entry goes from 8 to 20 bytes, so the index grows by a multiple, not a few percent.” No GB figure is left. |
| F-03 “Snowflake argues the other way” | medium | **Fixed** | c8 Go deeper: “The Snowflake layout shows how often that isn’t needed: an ID that needs only local values can be a few lines inside the app, as Sonyflake and Instagram run it.” |
| F-04 keyset drops `user_id` | medium | **Fixed** | c9 §9.1 pause: “`WHERE user_id = ? AND id > :last_id`, then `ORDER BY id LIMIT 10`.” Verified on PG. |
| F-05 ch8 opens as if Twitter removed the service | low | **Fixed** | “Put a coordinated ID service in that path, one that must agree with itself or a database on every ID, and it becomes one more tier …”. The title is now “Can the ID service stop coordinating?”. |
| F-06 ladder shows Snowflake born in your code | low | **Fixed** | Fig 10·e caption: “Snowflake is marked where its few lines can run, in your code; Twitter’s first version ran them as a small service of its own.” |
| F-07 “no ID service” in the last four chapters | low | **Fixed** | c9 end: “One company took time on the left and 64 bits from the last four chapters, refused to run any ID service at all, …” |
| F-08 why not 9 / 5,001 | low | **Fixed** | §2.4 pause: “The disk only proves that 6 went out. The next save point is 9, and 9 itself may have gone out before its write reached the disk. … 6 + 3 + 1 = 10.” Recall 1: “6,001. The machine could have handed out anything up to the next save point, 6,000, even 6,000 itself …” |
| F-09 stepper resets the counter | low | **Fixed** | Fig 2·b step 2: “`m1-1729-01`, `-02`, `-03`, then `m1-1730-04`.” ThreadsToCounter labels and desc show `m1-1730-04`. (The same reset survives in Fig 3·c. See N-02.) |
| F-10 MySQL counter on disk | low | **Fixed** | Code: `) ENGINE=MyISAM;                     -- as in Flickr's post`. §7.3: “… its auto-increment counter survives a restart (Flickr’s MyISAM table stores it with the table; InnoDB has done the same since MySQL 8.0).” |
| F-11 pseudocode fenced as js | low | **Fixed** | All 8 `get_id()` blocks in c1–c3 are now ```` ```text ````. §1.3: “(The versions here are sketched in pseudocode.)” The one remaining ```` ```js ```` block is the MongoDB loop, which is valid mongosh. |
| F-12 clock_gettime cited for waits/refuses | low | **Fixed** | §4.1: “… or refuses to issue, as Twitter’s Snowflake did <Cite …snowflake-2010>. (The wall clock can jump; a monotonic clock, `CLOCK_MONOTONIC`, can’t <Cite …clock_gettime.2>.)” |
| F-13 Discord “year the company started” | low | **Fixed** | §8.5: “… the first second of 2015, the year Discord launched.” Fig 8·d desc: “(Discord’s launch year)”. |
| F-14 recall cites IDs the text never shows | low | **Fixed** | §3.4 pause: “The IDs come out 232, 244, 237, 239: the third request gets a smaller ID than the second.” |
| F-15 “every entry of every index” | low | **Fixed** | §5.1: “PostgreSQL’s indexes point to a row location instead, so there the ID’s size lands on its own index and on every other column and index that stores it.” |
| F-16 benchmark year | low | **Fixed** | §9.4: “One engineer benchmarked it on MongoDB in 2016, by their own account, …” |
| F-17 loss L-0160/0161 | low | **Fixed** | §7.1: “You could object that a query per ID is slow. When you study another company’s design, look for the parts worth taking; the trade-offs were theirs to make. [[L-0160 L-0161]]” |

**17 of 17 fixed. None reopened.**

## New issues (fresh pass over Revision 2)

| Id | Type | Severity | Where |
|---|---|---|---|
| N-01 | error (code) | low | c3 §3.2 v7 code: `concat` of variable-width parts can collide and mis-order |
| N-02 | internal contradiction | low | c3 §3.2 prose + Fig 3·c (`TimeFirst`): the counter resets each millisecond |
| N-03 | error (code) | low | c9 §9.3: `id > :start_id` drops the boundary ID |
| N-04 | internal contradiction | low | c4 §4.1: “version 7, time then counter” |
| N-05 | imprecise | low | c2 §2.3: the bank “start from it” after a crash |
| N-06 | imprecise | low | c1 §1.1 / c7 §7.2: “one-line” fix is two settings |

No high or medium issues. No inventions. The new Revision 2 material checks out against the sources and the code runs:
§2.2 (version 3's time part), §2.3/§2.4 (write-ahead vs write-behind), §3.1 (T1/T2 on the two masters), §7.2 (step-by-N on your
masters vs Flickr's central ticket DB, L-0091/L-0152/L-0164), §9.3 (last hour) and §10.2 (missing guards, sequence persistence).

### N-01 · ERROR (code) · low · v7 `concat` needs fixed-width parts
- **Where:** c3 §3.2 code block and the sentence “And if the machine ID is an integer, the whole ID is just a number.”
- **Current code:** `return concat(get_epoch_ms(), machine_id, counter++);   // time first; machine and counter break ties`
- **Problem:** v2–v4 kept their parts apart with hyphens (`m1-1729`). v7 is read as one number, and without fixed widths the parts run
  together. Machine 1 with counter 12 and machine 11 with counter 2 are both 1729112. Machine 1 with counter 100 at 1729
  (17291100) is larger than machine 2 with counter 5 at 1730 (173025), so time no longer decides the order. The page's own examples
  (`1729 0001`) assume a fixed width without saying so. A fixed-width counter also has to wrap, which is safe only while one machine
  makes fewer IDs in a millisecond than the field holds. That is exactly the 12-bit rule chapter 8 states, so one clause sets it up.
- **Replacement (code):**
  ```text
  func get_id() {
    return concat(get_epoch_ms(), machine_id, counter++);   // fixed-width parts: time first; machine and counter break ties
  }
  ```
  **(prose)** after “… The machine and the counter only break ties inside one millisecond.”: “Give each part a fixed width, so the
  digits line up; otherwise machine 1 with counter 12 and machine 11 with counter 2 both read 1729112.”

### N-02 · INTERNAL CONTRADICTION · low · Fig 3·c and §3.2 restart the counter every millisecond
- **Where:** c3 §3.2 (“`1729 0001`, `1729 0002`, `1730 0001`”). `TimeFirst` rows in `site/src/figures/lec03/s3-order-and-clocks.tsx` and its
  desc (“1729 0001, 1729 0002, 1730 0001, 1730 0002, 1730 0003, 1731 0001”). The flip example (“`17290002` and then `17290001`”).
- **Problem:** this is the same problem as F-09, on a later figure. The tail is labelled “machine + counter”. The code's `counter++` is a
  static counter that never resets (F-09's fix made Fig 2·b say so). Yet the tail goes back to `0001` in every new millisecond, three
  times. That only happens if the counter resets each millisecond. In the flip example, the tail is the machine number alone.
- **Replacement:** make the tail a machine digit plus a 3-digit counter, on two machines whose counters keep climbing.
  - `TimeFirst` rows: `['1729','1001'], ['1729','2001'], ['1730','1002'], ['1730','2002'], ['1730','1003'], ['1731','2003']`.
  - Desc: “Six eight-digit IDs from machines 1 and 2: 1729 1001, 1729 2001, 1730 1002, 1730 2002, 1730 1003, 1731 2003. The first
    four digits are the time …; the last four are the machine, then its counter, and only break ties within one millisecond.”
  - §3.2: “so the IDs come out in time order: `1729 1001`, `1729 2001`, `1730 1002`.”
  - Flip: “If the first request goes to machine 2 and the next to machine 1, you get `1729 2004` and then `1729 1005`.”
  - The width of the `TimeFirst` columns is unchanged, so the figure needs no re-layout. Re-run `figures lec03` anyway.

### N-03 · ERROR (code) · low · the last-hour query drops the ID exactly at the boundary
- **Where:** c9 §9.3 SQL: `SELECT * FROM tweets WHERE id > :start_id ORDER BY id LIMIT 1000;`
- **Problem:** `start_id` is the smallest ID that can exist in the first millisecond of the hour (machine 0, counter 0). A tweet with
  exactly that ID is in the hour, and `>` leaves it out. This was confirmed by construction: `snowflake(T, 0, 0) == start_id`. The
  next pages correctly use `>` on `:last_id`, because that row has already been read.
- **Replacement:** `SELECT * FROM tweets WHERE id >= :start_id ORDER BY id LIMIT 1000;` (the two comment lines stay as they are).

### N-04 · INTERNAL CONTRADICTION · low · “version 7, time then counter”
- **Where:** c4 §4.1: “It runs version 7, time then counter, just in one place. [[L-0077]]”
- **Problem:** Revision 2 redefined v7 as time, machine, counter: in the §3.2 code, Fig 3·c and the ladder (`epoch_ms + machine + counter`;
  v8 = “v7, on one ID server”). This sentence still has the old two-part v7.
- **Replacement:** “It runs version 7 in one place: time, machine, counter, with the same machine part on every ID.”

### N-05 · IMPRECISE · low · the bank “start from it” after a crash
- **Where:** c2 §2.3: “Notice that the bank writes *ahead*: what is on disk is the end of a block nobody has received yet, so after a
  crash you simply start from it.”
- **Problem:** in the page's own example the bank reads 1, stores 1,001 and hands out the next thousand, which is 2 to 1,001. The stored
  value is the last ID of the block, and it does go out (“when you reach the stored value, add another 1,000”). Read literally,
  “start from it” reissues 1,001. The flush code in §2.4 uses the “counter = stored; first `++`” convention, so the intent is
  clear, but this sentence is the only one that states the rule.
- **Replacement:** “Notice that the bank writes *ahead*: what is on disk is the end of the current block, and nothing past it has gone
  out, so after a crash you start just past it.”

### N-06 · IMPRECISE · low · the “one-line” configuration fix is two settings
- **Where:** c1 §1.1 (“Is there a one-line configuration change …”). c7 §7.2 (“that setting is the one-line fix”).
- **Problem:** the answer chapter 7 gives is `auto_increment_increment` and `auto_increment_offset`, two lines per server in the page's own
  `.ini` block. The point (no service, no coordination, just configuration) is right. Only the count is off.
- **Replacement:** c1: “Is there a small configuration change …”. c7: “And for your shop’s two order masters, that pair of settings is the
  whole fix: …”.

## Summary for the writer (Revision 3)

All 17 earlier items are fixed. The four pieces of code that Revision 2 changed or added run correctly as written:
- the flush-with-save-on-start code;
- the keyset query;
- the last-hour expression;
- the v7 layout, given fixed widths.

The six new items are all low:
- three one-line text edits: N-03, N-04, N-06;
- one code comment plus one sentence: N-01;
- one sentence: N-05;
- one small figure-data change in `TimeFirst`, plus its desc and two prose numbers: N-02.
