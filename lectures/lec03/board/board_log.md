# Lecture 03 - Board log

Source video: `vedio/5_6071343878177295384.mp4` (1280x720, ~2:30:00). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states add short-lived states (199 states, 116 of them from dense passes, 315 kept frames).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles on the right.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow is used for headings, `FLUSH`, key labels and the `id`/`stub` column names; pink/magenta for questions, warnings, function names (`save_counter()`, `next_id`) and the ID-server / ticket-DB boxes; lavender/purple for side notes (`* ...`); green for `get_epoch_ms()` / time values and the "relaxed constraints" phrase; red for `machine_id`; orange for `thread_id` / `counter ++`; light blue for `concat`, `We prepend ...`, `Safest !!` and later annotations. Red freehand strokes (circles, arrows, scribbles) are temporary emphasis and are noted only as "emphasis at HH:MM:SS".
- The board is one long scrolling notebook. Many kept frames re-show an earlier page or only scroll; those entries say "no new content". From 00:54:45 the teacher shows pre-written pages and reveals them while talking (text appears complete when first shown).
- 01:46:45-01:53:15 is a browser screen share of the teacher's blog (not the board); it is logged because it carries lecture content. Gallery-only frames are logged as "gallery view, not kept for publication".
- Participant names/faces in the right-hand column are deliberately not recorded. A watermark/logo of the teacher's site appears bottom right throughout and is ignored.

---

## S01 - 00:00:00-00:00:15 - Title slide (b_000015.jpg)
Topic: course title card (static slide).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on a magenta brush stroke) / `Distributed ID` / `Generators`.
Change: first state.

## S02 - 00:00:30-00:02:00 - Agenda (b_000100.jpg, b_000115.jpg, b_000200.jpg)
Topic: agenda of the lecture.
Text (heading `Agenda :` in yellow; items white, each with `-`):
- `Foundation for ID generation`
- `Monotonically increasing IDs`
- `Central ID generation service`
- `Database Ticket Servers`
- `Twitter's Insane Idea`
- `Instagram bettering it`
Change: new handwritten page at 00:00:30; 00:01:15 and 00:02:00 are scrolls of the same page, no new content.

## S03 - 00:02:15-00:02:45 - ID and problem statement (b_000245.jpg)
Topic: what an ID is; the problem statement.
Text:
- Yellow `ID :` white `Uniqueness to an object / row / document / event`
- Yellow `Problem statement :`
- `Assign a globally unique ID to "anything"`
- `Write a function` (double-underlined) `that spits out something` / `unique everytime it is invoked !` ("time" in `everytime` in yellow)
- Purple: `* The function we are writing is part of the application logic` / `and NOT a central service` (`NOT` in red)
- Bottom edge (partly in view): a yellow box and `always moves forward` (start of S04).
Change: new page.

## S04 - 00:03:00-00:03:15 - Time is unique (b_000315.jpg)
Topic: time as the source of uniqueness.
Text: pink `So, what is unique throught time ?` [sic, "throughout"]; a yellow box `TIME` with an arrow to `always moves / forward`; `func get_id() {` / `return get_epoch_ms();` (`get_epoch_ms()` green); on the right `Every time the functio[n]` ... `invoked the time would` ... (being written).
Change: content added below S03.

## S05 - 00:03:30-00:05:18 - Epoch ms as ID; the catch (b_000430.jpg, b_000439.jpg, b_000442.jpg, b_000500.jpg, b_000515.jpg, b_000518.jpg)
Topic: get_id returns epoch milliseconds; works only for one machine and no two calls in the same ms.
Text:
- `func get_id() {` / `return get_epoch_ms();` / `}`
- Right, white: `Every time the function` / `invoked the time would` / `have moved forward &` / `hence it seems unique !`
- Yellow: `So, whats the catch ?`
- `The ID generation logic works fine when there is just` / `one machine` (green double underline) `and the code is not` (`not` red highlight) `invoked twice within one ms.` (green double underline)
Diagram (D-01): a single laptop outline (one machine).
Change: lines added over 00:03:30-00:05:00; 00:05:15/00:05:18 are scrolls (a large site-name watermark flashes in the bottom right), no new content.

## S06 - 00:05:30-00:05:33 - Multiple machines (b_000530.jpg, b_000533.jpg)
Topic: two machines collide; prepend the machine id.
Text:
- Pink `So, what if there are multiple machines ?`
- `Function invoked at the same time` / `on two machines will generate` / `the same ID ... collision !!` (`collision !!` red/pink)
- Pink `id :  m1-1729   m2-1729`
- Blue `We prepend machine id to time...`
- `func get_id () {` / `return concat ( machine_id, get_epoch_ms() );` / `}` (`concat` blue, `machine_id` red, `get_epoch_ms()` green)
Diagram (D-02, first form): two laptops labelled `m1`, `m2`, each with `t = 1729` underneath.
Change: new section; b_000533 is a scroll back up to the S05 text, no new content.

## S07 - 00:05:45 (b_000545.jpg)
Scrolled back up to the `TIME` box and `So, whats the catch ?`. No new content.

## S08 - 00:06:00-00:06:30 (b_000630.jpg)
Same multiple-machines section. Emphasis (00:06:30): red circles around both `t = 1729`.

## S09 - 00:06:45 - Threads (b_000645.jpg)
Topic: threads on one machine can collide too.
Text (new):
- Pink `What if the program has threads ?`
- `Function can be invoked by two threads at the same time`
- Purple `1. Add thread_id as a differentiator`
- Purple `2. Add counter that resek every few minutes` [sic, "resets"]
Emphasis (00:06:45): red circles around `machine_id` and `get_epoch_ms()` in the `concat(...)` line.

## S10 - 00:07:00-00:08:00 (b_000745.jpg, b_000800.jpg)
Scrolls of the threads section; at 00:08:00 two laptops `m1`, `m2` with blue squiggles inside (threads) start to appear on the right. No new text.

## S11 - 00:08:15-00:09:45 - thread_id in the ID (b_000845.jpg, b_000900.jpg, b_000945.jpg)
Topic: machine_id + thread_id + time.
Text:
- `func get_id() {` / `return concat(` / `machine_id,` (red) / `thread_id,` (orange) / `get_epoch_ms()` (green) / `);` / `}`
- Pink: `thread: t1 and t2   t1 and` [cut off] / `id: m1 - t1 - 1729   m2 - t1 - 1729` / `m1 - t2 - 1729   m2 - t3 - 1729` (the last `t3` looks like a slip for `t2`; written with subscripts m₁, t₁)
Diagram (D-03): laptops `m1`, `m2`, each with two blue squiggly lines inside (threads), `t = 1729` under each.
Change: diagram and code added; b_000900 is a scroll back up, no new content.

## S12 - 00:10:00-00:10:30 - Static counter (b_001030.jpg)
Topic: replace thread id with a static counter.
Text:
- Pink heading `concaknating static counter` [sic, "concatenating"]
- `int counter =0;` / `func get-id() {` / `return concat(` / `machine_id,` (red) / `get_epoch_ms(),` (green) / `counter ++` (orange) / `);` / `}`
- Pink IDs: `m1 - 1729 - 01` / `m1 - 1729 - 02` / `m1 - 1729 - 03`; right column `m2 - 172`[cut off] / `m2 - 173`[cut off] / `m3 - 1730 - 03` (the `m3` looks like a slip for `m2`)
Diagram (D-04, first form): laptops `m1`, `m2` with purple thread squiggles, `t = 1729` under each.
Change: new page.

## S13 - 00:10:45-00:13:00 (b_001215.jpg, b_001300.jpg)
New text: pink `if we already have static counter , then time is redundant...`

## S14 - 00:13:15-00:14:39 - Time removed (b_001430.jpg, b_001439.jpg)
Topic: drop time from the ID.
Change: `get_epoch_ms(),` struck through in white; IDs rewritten without time: `m1 - 01` / `m1 - 02` / `m1 - 03`; `m2 - 01` / `m2 - 02` / `m3 - 03` (D-04 final form).

## S15 - 00:14:42 - Volatile counter (b_001442.jpg)
Topic: the static counter is lost on restart.
Text (new page):
- Pink `Static counter is in memory ... volatile`
- `if machine dies, or process rebooks` [sic, "reboots"] / `- counter starts again from 0` / `- regenerates the same IDs`
- Yellow `Quick Brainstorm`; yellow on the right `How to slove th`[cut off] [sic, "solve"]

## S16 - 00:14:45-00:15:42 (b_001530.jpg, b_001542.jpg)
Re-shows the struck-through counter page (S14). No new content.

## S17 - 00:15:45-00:16:03 (b_001545.jpg, b_001600.jpg, b_001603.jpg)
Re-shows the volatile page (S15). New at the bottom (00:16:00): pink `Store counter to disk (non-volatile)` and yellow `Fault Tolerance` on the right (partly behind the tiles).

## S18 - 00:16:09-00:16:15 - Save counter to disk (b_001609.jpg, b_001612.jpg, b_001615.jpg)
Topic: persist the counter on every call.
Text:
- Pink `Store counter to disk (non-volatile)`, yellow arrow up-right to `Fault To`[cut off] ("Fault Tolerance")
- `Everytime counter++ , we store it to the disk`
- `int counter = load();` (`load` purple)
- `func get-id() {` / `counter ++` (orange) / `save_counter();` (pink) `---> Disk I/o` (pink arrow) / `return concat( machine_id, counter );` / `}`
- Right, white: `We are making a`[cut off] / `Disk I/o upon eve`[cut off] / `invocation` (cut by the tiles; "We are making a Disk I/O upon every invocation")

## S19 - 00:16:30-00:21:00 (b_001745.jpg, b_002030.jpg, b_002045.jpg, b_002100.jpg)
Same save-to-disk page. Emphasis (00:17:45): red circle around `save_counter();`. No new content.

## S20 - 00:21:15-00:21:48 - Flush every 1000 (b_002130.jpg, b_002133.jpg, b_002145.jpg, b_002148.jpg)
Topic: batch the disk writes; start after a restart at load + flush frequency.
Text (new page):
- Pink `Instead of doing it every time, let's save counter every 10`[cut off] ("every 1000")
- `int counter = load() + 1000;` (`1000` highlighted) `---> Flush frequency`
- `func get-id() {` / `counter ++` (orange) / `if (counter % 1000 == 0) {` (`1000` highlighted) / `save_counter();` (pink) `---> Disk I/o` / `}` / `return concat( machine_id, counter );` / `}`
Change: b_002145/b_002148 scroll to the bottom of the code.

## S21 - 00:22:00-00:22:30 (b_002230.jpg)
New text below the code: `Say, disk flush happens every 3 values` and the first row `m1 - 01`.

## S22 - 00:22:45-00:24:45 - Flush-every-3 crash example (b_002300.jpg, b_002315.jpg, b_002318.jpg, b_002324.jpg, b_002327.jpg, b_002445.jpg)
Topic: after a crash, restart from the last flushed value + flush frequency + 1.
Diagram (D-05): a column of IDs `m1 - 01` / `m1 - 02` / `m1 - 03` `---> FLUSH` (yellow) / `m1 - 04` / `m1 - 05` / `m1 - 06` `---> FLUSH` / `m1 - 07` / `m1 - 08` struck through with a pink line `---> CRASH` (pink).
Text: pink `On disk values` / `03` (struck) `06`; `New starting value (safe) is` / `= 06 + 3 + 1` / `= 09 + 1` / `= m1-10` (yellow double underline) blue `Safest !!`
Change: built up over 00:22:45-00:24:45; final form b_002445.

## S23 - 00:25:00-00:25:15 (b_002500.jpg, b_002515.jpg)
b_002500 scrolls back to the flush-1000 code; b_002515 back to the flush table. No new content.

## S24 - 00:25:30-00:25:45 - Monotonically increasing IDs (b_002530.jpg, b_002539.jpg, b_002545.jpg)
Topic: why monotonic IDs (ordering of concurrent events).
Text (new page):
- Pink `What if we only want monotonically increasing IDs ?`
- `Why? Monotonically increasing IDs helps in conflict resolution` / `eg: who came first`
- Pink on the right: `How can we say that` / `T1 came before T2 ?`
- Bottom: `func get_id() {` / `return concat(` ... and `Instead of machine_time, c`[cut off]
Diagram (D-06): `a = 10` above two pink wavy lines (threads) `T1` with `a = 20` and `T2` with `a = 30`; a small white doodle `T1, T2` with a squiggle and arrow at the top right.

## S25 - 00:25:42-00:25:48 (b_002542.jpg, b_002548.jpg)
Short flips back to the flush table (S22). Emphasis (00:25:42): red arc over `m1 - 01`. No new content.

## S26 - 00:26:00-00:27:30 (b_002730.jpg)
New text: `func get_id() {` / `return concat(` / `get_time_ms(),` (green, highlighted) ...; `Instead of machine_time, we` / `now put`

## S27 - 00:27:45 - Time on the LHS (b_002745.jpg)
Topic: put time first for sortability.
Text:
- `func get_id() {` / `return concat(` / `get_time_ms(),` (green, highlighted) / `machine_id` (red) / `);` / `}`
- `Instead of machine_time, we` / `now put` / pink `time - machine`; a blue arrow up from blue `always moves forward`
- Purple `* All ID generation algorithms have time on LHS  "sortability"`
- `Time in epoch ms` / `↳ 1729 0001` ↙ `co`[cut off]; `LHS : Most significant part`[cut off]

## S28 - 00:28:00-00:33:00 - LHS decides the order (b_002900.jpg, b_003200.jpg, b_003227.jpg, b_003233.jpg, b_003300.jpg)
Topic: time part orders IDs; second part breaks ties.
Text:
- `LHS : Most significant part` / `Makes sorting simple` / `Conflict in the first half` / `↳ Tie breaking in the second`
- `Time in epoch ms` with an arrow to the yellow first four digits
Diagram (D-07): column `1729 0001` / `1729 0002` / `1730 0001` / `1730 0002` / `1730 0003` / `1731 0001` (first 4 digits yellow, last 4 pink); a left brace labelled `Decides the order`; arrows from `coun`[cut off] ("counter") and `Ma`[cut off] ("Machine") point at the right half (cut by the tiles).
Emphasis (00:32:27): small red tick after `0001`.
Change: b_003200/b_003227/b_003233/b_003300 re-show this page between flips (S29, S30).

## S29 - 00:32:15-00:32:30 - Clocks out of sync (b_003215.jpg, b_003230.jpg)
Topic: time-first IDs still not monotonic across machines.
Text (new page):
- `Although a good solution, but it still does not guarantee` / yellow `Monotonicity !`
- `Because clocks across machines can go out of sync`
- `at the same time instant we invoke get_id on 4 mach`[cut off]
Diagram (D-08, first form): four laptops with purple thread squiggles, labelled `2`, `4`, `7`, `9` above; below them `time: 23`, `time: 24`, `time: 23`, `time: 23`.

## S30 - 00:32:24 (b_003224.jpg)
Flip back to the monotonic-IDs / T1-T2 page (S24). No new content.

## S31 - 00:33:09-00:37:18 - Skewed IDs (b_003309.jpg, b_003700.jpg, b_003715.jpg, b_003718.jpg)
Text (new):
- `get_id on m2 -> 232` / `get_id on m4 -> 244` / `get_id on m7 -> 237` / `get_id on m9 -> 239` (values yellow)
- A red down-arrow and pink `Not monotonically / increasing`
- 00:37:15 bottom, pink: `Instead of keeping ID generation logic on the application logic,`[cut off]
D-08 final form.

## S32 - 00:37:30-00:37:45 (b_003745.jpg)
Emphasis (00:37:45): red upward arrows under `time: 23`, `time: 24`, `time: 23`. No new content.

## S33 - 00:38:00-00:38:12 (b_003800.jpg, b_003809.jpg, b_003812.jpg)
New text: pink `Instead of keeping ID generation logic on the application logic,` / `let's create a central ID service ....`
Emphasis: red circle around machine `2` (00:38:00); red circles around `2` and `23` of the first machine (00:38:12).

## S34 - 00:38:15-00:39:27 (b_003845.jpg, b_003900.jpg, b_003915.jpg, b_003918.jpg, b_003924.jpg, b_003927.jpg)
New text: a small hook arrow then `should solve the clock skew problem`.
Emphasis (00:39:24): red circles around machines `2`, `4`, `7`. b_003915 re-shows the four-machine page.

## S35 - 00:39:30 - Central ID generation service (b_003930.jpg)
Topic: one ID server that every client calls.
Text (new page):
- Purple `* Instead of thinking about ID generation, we are` / `talking Clock Synchronization`
- Yellow `Central ID generation service`
- Right, white: `We run the same` / `get_id function` / `in ID server to` / `generate monoto`[cut off]
Diagram (D-09): pink-outlined box `ID Server` at top centre; two white boxes below, `client 1` (left) and `client 2` (right); each client has a curved arrow up to the ID server and a curved arrow back down; a white `@` spiral between the arrows under the ID server.
Emphasis (00:39:30): red circle on `Server`.

## S36 - 00:39:45-00:40:00 - SPoF (b_004000.jpg)
New text: pink `But, this central ID service is a SPoF !`; `ID server could fail` / `Disk of the server could fail`.
Diagram (D-10, first form): two pink boxes `ID Server`, `ID Server` with a yellow `gossip` arc between them.

## S37 - 00:40:15-00:40:45 (b_004045.jpg)
Re-shows the four-machine clock-skew page (S29/S31). No new content.

## S38 - 00:41:00-00:41:15 (b_004100.jpg, b_004112.jpg, b_004115.jpg)
Central-ID page with the right-hand text complete: `We run the same / get_id function / in ID server to / generate monotonically / increasing IDs`. No other new content.

## S39 - 00:41:30-00:42:42 - Multiple ID servers behind a load balancer (b_004130.jpg, b_004133.jpg, b_004200.jpg, b_004215.jpg, b_004218.jpg, b_004224.jpg, b_004230.jpg, b_004242.jpg)
Topic: replicate the ID server; they must gossip to agree.
Text:
- Green `To solve SPoF, we add` / `multiple ID servers behind` / `a load balancer`
- Yellow `These ID servers need to` / `gossip` (pink) `to converge upon` / `an agreed value.`
- Pink `We made the entire process super complicakd !!` [sic, "complicated"]
Diagram (D-10, final form): two pink boxes `ID Server`, `ID Server` with a yellow `gossip` arc between their tops; each has up/down arrows to a long white bar (load balancer, unlabelled) below; below the bar `client 1` and `client 2` boxes with curved arrows to the bar.
Emphasis: red circle around the single `ID Server` and `@` of D-09 (00:41:33); red scribble over the gossip link (00:42:00).
Change: 00:42:15-00:42:42 are scrolls, no new content.

## S40 - 00:42:27-00:45:54 - Lesson: relax the constraints (b_004227.jpg, b_004300.jpg, b_004530.jpg, b_004545.jpg, b_004548.jpg, b_004554.jpg)
Topic: strict monotonicity cannot be distributed; real systems relax constraints.
Text (new page):
- `One thing we did learn from these evolutions is that`
- Purple box: `There is no way to distribute` / `and guarantee strict monotonicity`
- `So, the solutions we see out there have` green `relaxed constraints`; two arrows down to `Non- Integer` / `IDs` and `No monotonicity`
- Yellow `Questions ?`

## S41 - 00:45:57 - Two databases (b_004557.jpg)
Topic: multi-master auto-increment (audio 00:45:11).
Text: `relaxed constraints !` (`!` added).
Diagram (D-11): two plain white cylinders side by side below `Questions ?` (the second one still selected with editor handles).

## S42 - 00:46:00-00:47:33 (b_004715.jpg, b_004730.jpg, b_004733.jpg)
b_004715 / b_004733: scrolled to `Questions ?`, the two cylinders are gone (erased), area blank. b_004730 re-shows the lesson page. No new content.

## S43 - 00:47:45-00:52:45 (b_004800.jpg, b_004915.jpg, b_005015.jpg, b_005030.jpg, b_005245.jpg)
Q&A: re-shows of the central-ID page (b_004800, b_004915, b_005245) and the lesson page (b_005015, b_005030). No new content.

## S44 - 00:53:00-00:54:00 (b_005400.jpg)
Re-shows the flush-every-1000 code page (S20). No new content.

## S45 - 00:54:15-00:59:27 - Amazon: central ID service with batching (b_005445.jpg, b_005915.jpg, b_005924.jpg, b_005927.jpg)
Topic: Amazon's batched ID ranges (page shown pre-drawn around the break, 00:54:56-00:59:55).
Text:
- Yellow heading `Central ID service with Batching : Amazon's Way` (the `z` looks like an `r`: "Amaron's")
- Table `Service | counter`: `orders` `~~0~~ ~~500~~ 1000`; `payments` `~~0~~ 2000`
- Pink `get_id_batch(500)` (`500` green) with `← [0,500)` and `↙ [500, 1000)` next to two yellow lines into the left service box; on the right `(0, 2000) ↓` and `[2000,4000)` next to two yellow lines into the right service box
Diagram (D-12, final form shown first): a light-blue outlined box containing a pink cylinder, a pink line to a stack of pink boxes `APIs for ID Svc` (one in front, four outlines behind), a row of short vertical lines under it, and a white bar (load balancer) at the bottom; yellow lines run from the bar down to two grey service boxes.
Change: b_005915 has no tiles (break); b_005924/b_005927 same page.

## S46 - 00:59:30-00:59:33 (b_005930.jpg, b_005933.jpg)
Teacher resets the example to walk through it: counters back to `0` / `0` (00:59:30), then blank (00:59:33). The service boxes now show `Server1`, `Server 2` (left box: small pink squares; right box: small pink circles). Bottom right a range label partly behind the watermark, reads like `(4000, 1000)` [illegible].

## S47 - 00:59:39 (b_005939.jpg)
Brief flash of a previous lecture's page (load-balancer architecture: `Core DNS`, `LB Servers`, `Orchestrator`, `prometheus`, `Redis as PubSub`, `LB Console`, `Autoscaling`, `Backend Servers`, `Read this paper : Maglev: A fast and reliable software load balancer`). Not lecture-3 content.

## S48 - 00:59:42-01:03:03 - Amazon walkthrough setup (b_005942.jpg, b_010045.jpg, b_010054.jpg, b_010215.jpg, b_010224.jpg, b_010245.jpg, b_010254.jpg, b_010257.jpg, b_010300.jpg, b_010303.jpg)
Text: counters `0` / `0`; the right-hand `[2000,4000)` label is removed, `(0, 2000) ↓` stays. Scrolling down (01:02:45) shows:
- Two service boxes with six servers each: `Server1` ... `Server 6`, labelled `orders` (left) and `paymenk` [sic, "payments"] (right)
- `Anytime a server of a service` / `wants IDs, it makes a call to` / `ID generation service and asks` / `for a batch (500,1000, etc)`
- Right column: pink `orders : server 1 : get_id_batch (500)` / pink `orders : server 2 : get_id_batch (1000)` / yellow `payments : server 1 : get_id_batch (2000)` / yellow `payments : server 2 : get_id_batch (500)` / pink `orders : server 2 : get_id_batch (500)`
Change: pre-written content revealed by scrolling; b_010215-b_010303 alternate top/bottom views.

## S49 - 01:03:15-01:04:30 (b_010345.jpg, b_010430.jpg)
Live update of the table: `orders` `~~0~~ 500` (01:03:45), then `~~0~~ ~~500~~ 1000` (01:04:30); `payments` stays `0`.

## S50 - 01:04:45-01:07:24 (b_010515.jpg, b_010524.jpg, b_010527.jpg, b_010545.jpg, b_010615.jpg, b_010630.jpg, b_010633.jpg, b_010642.jpg, b_010645.jpg, b_010700.jpg, b_010715.jpg, b_010718.jpg, b_010724.jpg)
Scrolling over the Amazon page. New at 01:07:24: green `it re-asks when exhauskd` [sic, "exhausted"] under the batch text.
Emphasis: red arc around `paymenk` (01:06:30); red curved arrows from `Server1` of orders up to the ID service (01:06:33).

## S51 - 01:07:30-01:10:57 (b_010800.jpg, b_010809.jpg, b_010812.jpg, b_010830.jpg, b_010845.jpg, b_011045.jpg, b_011054.jpg, b_011057.jpg)
Zoomed-out view of the whole Amazon page (best overview b_010812), then zoomed back to the top (01:10:45). No new content.

## S52 - 01:11:00 - Why not UUID; MongoDB ObjectID (b_011100.jpg)
Topic: UUIDs index badly; MongoDB IDs.
Text (pre-written page):
- Yellow `Why are we building ID generation, if UUID already exists ?`
- `UUIDs are 128 bit integers` / `and are very inefficient at scale,` / `- they do not index well` / `- bloats up the index`
- Blue `+ they are random - good for security`
- Right: `4 byte int v/s 16 byte int` / `Your indexes are 4x larger.` / `Your index lookups are disk I/O` / `So, DB performance takes a hit`
- Yellow `MongoDB Object ID`; right `96-bits long - 12 bytes` / `they also do not index well`; purple `* Note: epoch_sec is on LHS`
- Yellow (bottom edge) `Database Ticket Servers : Flickr`
Diagram (D-13): a three-cell bar `epoch | random | counter` (`epoch`, `counter` yellow; `random` white) with `4byte`, `5bytes`, `3bytes` under the cells.

## S53 - 01:11:15-01:15:15 (b_011245.jpg, b_011515.jpg)
Same page. Emphasis: red strokes at `4x` and `performance` (01:12:45); red circle around `UUIDs` (01:15:15). No new content.

## S54 - 01:15:30-01:16:30 (b_011630.jpg)
New text under `Database Ticket Servers : Flickr`: `Why flickr needed its own ID generation ?`

## S55 - 01:16:45-01:18:00 (b_011800.jpg)
New text: `- Database was sharded` / `- To avoid collision & guarantee uniqueness`; pink `Why not UUIDs ?` white `Because they index badly`.

## S56 - 01:18:15-01:20:00 (b_012000.jpg)
New text, blue: `If you cannot fit the indexes in-memory, you cannot make your DB fast`

## S57 - 01:20:15-01:22:00 - Central ticket server (b_012115.jpg, b_012130.jpg, b_012200.jpg)
Topic: Flickr's MySQL ticket table.
Text:
- `Central Ticket Server: MySQL` / `- whoever wants an ID, fires a query to this DB`
- `CREATE TABLE `tickek` (` [sic, "tickets"] / `id bigint unsigned not null auto-increment,` (`id` yellow) / `stub char not null default ''` (`stub` yellow) / `PRIMARY KEY (id)` / `UNIQUE KEY (stub)` / `)`
- Yellow `Idea: Delek and re-insert the row` [sic, "Delete"] / `will make DB generak the next` [sic] / `id (autoincremenkd)` [sic]
- `Use this ID for your use case`
Diagram (D-14, first form): two-column table `id | stub` with one row: green `74` | `a`; an arrow up from `some dummy value / nothing special` to `a`.

## S58 - 01:22:15-01:23:15 (b_012315.jpg)
New text: `We can either  DELETE and then INSERT in one transaction` / `but it is extremely costly on the DB` / `So, what are the other ways...`

## S59 - 01:23:30-01:23:57 - Upserts (b_012330.jpg, b_012333.jpg, b_012345.jpg, b_012357.jpg)
Text (new page):
- `UPSERTS  (Delete + Insert = Upsert)`
- `MySQL provides 2 ways of doing it`
- Yellow `INSERT .......  ON DUPLICATE KEY UPDATE .......` / `tries to insert, if it fails due to UNIQUE KEY then` / `the update clause is execukd` [sic]
- Yellow `REPLACE INTO .....` pink `← This is 32x slower than ON DUPLICATE..` / `tries to insert, if it fails due to UNIQUE KEY then` / `the old row is delekd and the new row is inserkd.` [sic]
Change: b_012333 is a flip back to the ticket page with a red underline in the `id` column under `74` (emphasis, 01:23:33).

## S60 - 01:24:00-01:25:00 (b_012415.jpg, b_012427.jpg, b_012430.jpg, b_012500.jpg)
New text: blue `* Both of these are Atomic`; white `* Remember upsert in KV store?`; `What's our query then ?`; start of an `id | stub` table (01:25:00).
Emphasis (01:24:15): red arc around the `.......` after `INSERT`.

## S61 - 01:25:15-01:26:15 - The ticket query (b_012615.jpg)
Text: `INSERT INTO `tickets` (stub)` / `VALUES ('a')` / pink `ON DUPLICATE KEY UPDATE` / `id = id+1;`
Diagram (D-14, second form): `id | stub` table, green `74` | `a`; a second id value being written under `74` (behind the pen cursor).

## S62 - 01:26:30-01:26:57 - Flickr setup and two ticket servers (b_012630.jpg, b_012645.jpg, b_012648.jpg, b_012654.jpg, b_012657.jpg)
Topic: one ticket DB is a SPoF; use two with odd/even IDs.
Text (pre-written page):
- Yellow `Ticket Server` / `ID generation` next to the MySQL cylinder
- Blue `But this single DB server is a SPoF !` white `How to fix it ?`
- `Have two ticket servers` / `one: odd` / `other: even` with a brace `} Round Robin` / `b/w two`
- `Ticket Server 1 :` / `auto-increment-increment = 2` / `auto-increment-offset = 1`
- `Ticket Server 2 :` / `auto-increment-increment = 2` / `auto-increment-offset = 2`
- Right: `if one server goes down,` / `other continues to serve` (cut by the tiles; full at 01:30:48) / `eg: 2,4,6,8,.....,200,202` / `when odd comes back up` / `we reset the offset on` / `both DB by MAX + BUFFER` / `eg: 240 and 241`
Diagram (D-15): stick figure with lines to two boxes `Server 1`, `Server 2` (label `Photos Svc` below); pink lines from both servers to a pink cylinder labelled pink `MySQL`; a white line from `Server 2` to a white cylinder `Photos DB`.
Diagram (D-16, first form): two pink cylinders with lines down to a white bar (load balancer) with short vertical lines below.
Emphasis: red circle around `Photos DB` (01:26:30); red curved arrows from `Server 1` to `MySQL` (01:26:48); red arc above `MySQL` (01:26:54).

## S63 - 01:27:00-01:28:00 (b_012730.jpg, b_012745.jpg, b_012748.jpg, b_012800.jpg)
Same page scrolled. Emphasis: red circles around both ticket cylinders (01:27:30); red dots under `auto-increment-increment` (01:27:45). No new content.

## S64 - 01:28:15-01:31:42 - Odd/even numbers (b_012845.jpg, b_012900.jpg, b_012903.jpg, b_012915.jpg, b_012927.jpg, b_012945.jpg, b_013000.jpg, b_013003.jpg, b_013030.jpg, b_013039.jpg, b_013045.jpg, b_013048.jpg, b_013115.jpg, b_013130.jpg, b_013139.jpg, b_013142.jpg)
New: numbers beside the cylinders, left `1` / `3` / `5` / `7`, right `2` / `4` / `6` / `8` (quickly written; the right column reads `2`, `(`, `c`, `8`). D-16 final form. Rest is scrolling.

## S65 - 01:31:45-01:33:12 (b_013145.jpg, b_013200.jpg, b_013203.jpg, b_013209.jpg, b_013212.jpg, b_013300.jpg, b_013312.jpg)
Q&A flips back to the upsert query page (b_013145, b_013300) and the `CREATE TABLE` page (b_013200, b_013209, b_013212). At 01:32:03 the query page's `id | stub` table shows a second row `a` with an id being written (transient). b_013312 returns to the two-ticket-server page. No new lasting content.

## S66 - 01:33:15-01:35:45 (b_013500.jpg, b_013545.jpg)
Transient worked example on D-16 (Q&A): left column now `1` / `3` / `5`, `202` beside the even cylinder, and `239` / `240` under the load balancer (01:35:00); then those erased and `7` under the bar (01:35:45).

## S67 - 01:36:00-01:37:42 - Snowflake: Twitter (b_013730.jpg, b_013742.jpg)
Topic: Twitter's Snowflake ID layout.
Text (pre-written page):
- Yellow `Snowflake:` `Twitter`
- `Used for IDs of Tweets` with an arrow to `also adopkd at` [sic, "adopted"] / `Discord and Instagram`
- `Snowflakes are 64 bits integers`
- Blue `* time on the LHS` / `* tie breaker on the ri`[cut off] ("right")
- `Snowflake is not a central service, instead it runs in app servers` / `as a native function`
- A JSON snippet `{ tid : "—" }` (cut by the tiles)
Diagram (D-17): a bar split `41 | 10 | 12`, arrows down to `epoch millis`, `machine ID`, `counter` + blue `(per machine)`.

## S68 - 01:37:45-01:39:15 - Snowflake in the API servers (b_013800.jpg, b_013845.jpg, b_013915.jpg)
Diagram (D-18): stick figure with three lines to three grey boxes (API servers, each with a white dot top-right = the Snowflake function); lines from the servers to three white cylinders; blue labels `API Server` and `Tweek DB` [sic, "Tweets DB"].
New text (01:39:15): a pink arrow up to the bottom server from `while storing the tweet in DB` / `ID is computer` [sic, "computed"].

## S69 - 01:39:30-01:43:15 (b_013930.jpg, b_013933.jpg, b_013939.jpg, b_013942.jpg, b_014015.jpg, b_014115.jpg, b_014245.jpg, b_014315.jpg)
Same Snowflake page scrolled. Emphasis: red wavy underline under `API Server` (01:39:39); red circle on `10` / `machine ID` (01:39:42). No new content.

## S70 - 01:43:30-01:46:30 - Roughly sortable, pagination (b_014345.jpg, b_014415.jpg, b_014630.jpg)
Text (new page):
- `Snowflakes are Roughly Sortable`
- `First 41 bits are epoch milliseconds` / `↓` / `with every ms the ID will be moving forward`
- Pink `This gives us an ability to get objects` / `before/after a certain time` / `before/after a certain ID`
- Pink `Hence, pretty awesome for pagination`
- `Twitter's pagination is not limit/offset based,` / `instead it uses 'since_id' to paginakd` [sic, "paginate"] / `→ I read till this tweet, give me the next set`
- `This type of pagination is also used by sharded DB like DD`[cut off] ("DDB", fully visible at 01:54:00) / `and is extremely efficient`
- Yellow `let me show you the benchmark...`

## S71 - 01:46:45-01:46:57 (b_014645.jpg, b_014648.jpg, b_014654.jpg, b_014657.jpg)
Screen share switching to the browser: desktop with a webcam client window (b_014645, b_014654), gallery view, not kept for publication (b_014648), empty browser tab (b_014657). No board content.

## S72 - 01:47:00-01:47:57 - Screen share: MongoDB pagination article, approach 1 (b_014700.jpg, b_014712.jpg, b_014730.jpg, b_014742.jpg, b_014745.jpg, b_014757.jpg)
Teacher's blog: essay list, search `mongo`, articles "Fast and Efficient Pagination in MongoDB" and "Benchmark Pagination Strategies in MongoDB". Article section `Approach 1: Using cursor.skip and cursor.limit` with `db.students.find().limit(5)` / `db.students.find().skip(5).limit(5)` page examples.

## S73 - 01:48:00-01:50:39 - Screen share: approach 2, _id and limit (b_014915.jpg, b_014924.jpg, b_014927.jpg, b_014930.jpg, b_014945.jpg, b_014948.jpg, b_015030.jpg, b_015039.jpg)
Article text on screen: `Approach 2: Using _id and limit`; "a Mongodb ObjectId is a 12 byte structure containing - a 4-byte value representing the seconds since the Unix epoch, - a 3-byte machine identifier, - a 2-byte process id, and - a 3-byte counter, starting with a random value."; "ObjectId has natural ordering"; steps "1. Fetch a page of documents from database 2. Get the document id of the last document of the page 3. Retrieve documents greater than that id"; code `db.students.find({'_id': {'$gt': last_id}}).limit(10)`.

## S74 - 01:50:42-01:53:15 - Screen share: benchmark (b_015042.jpg, b_015100.jpg, b_015115.jpg, b_015118.jpg, b_015130.jpg, b_015133.jpg, b_015139.jpg, b_015142.jpg, b_015300.jpg, b_015309.jpg, b_015315.jpg)
Benchmark article: six charts "Mean and Count when Page Size is 10 / 40 / 100" and "P95 ..." comparing `skiplimit` (blue, rising with the number of records) and `idlimit` (green, flat); text "A key observation to note is that, till 500-600 count, both the approaches are comparable ... sudden rise in response time for skip and limit ... The approach using _id and limit almost gives constant performance and is i[ndependent of the] size of the result set."

## S75 - 01:53:30-01:53:57 (b_015330.jpg, b_015345.jpg, b_015357.jpg)
Gallery view, not kept for publication (b_015330); then a blank black shared screen (b_015345, b_015357).

## S76 - 01:54:00-01:54:03 (b_015400.jpg, b_015403.jpg)
Back on the board: a page-transition view shows `This type of pagination is also used by sharded DB like DDB` in full, next to the start of the Discord page; b_015403 re-shows the pagination page. No new content beyond the full `DDB`.

## S77 - 01:54:09-01:55:18 - Snowflake at Discord and Sony (b_015409.jpg, b_015412.jpg, b_015415.jpg, b_015424.jpg, b_015500.jpg, b_015515.jpg, b_015518.jpg)
Text (pre-written page):
- Yellow `Snowflake at Discord` / `Same logic as Twitter, jush epoch = 1st second of 2015` [sic, "just"] / `↓` pink `To get a larger range`
- Yellow `Snowflake at Sony` / `They call it Sonyflake and their Go-based implement`[cut off] / `is open sourced and can be found on GitHub`
- Blue `Twitter and other products scaled because of this` / `decentralized ID generation.`
Change: b_015415 / b_015424 flip back to the Snowflake Twitter page (S67).

## S78 - 01:55:30-01:55:42 (b_015530.jpg, b_015542.jpg)
New text: `The logic is handled by API servers which is excellent`

## S79 - 01:55:45-02:01:24 (b_015730.jpg, b_015745.jpg, b_015915.jpg, b_020045.jpg, b_020100.jpg, b_020115.jpg, b_020124.jpg)
New text: `- No moving part` / `- No service` / `- Just a function call [lib]` / `- No extra load on DB`. Rest of the stretch (Q&A) shows the same view.

## S80 - 02:01:30-02:03:00 (b_020300.jpg)
Re-shows the Discord/Sony page. No new content.

## S81 - 02:03:15-02:04:03 - Snowflake at Instagram (b_020345.jpg, b_020400.jpg, b_020403.jpg)
Text (pre-written page):
- Yellow `Snowflake at Instagram`
- `Instagram does Snowflake in the DB during INSERT` (underlined in blue)
- `Requirements` / `- IDs sortable by time` → yellow `filter & batch processing`, with a yellow arrow up to `pagination` / `- ~64 bits to be efficient on index` / `- No new service`
- `Structure` / `- 41 bits : epoch ms since Jan 1, 2011` / `- 13 bits : DB Shard ID` / `- 10 bits : per shard sequence number`
Change: b_020400 flips back to the Snowflake API-server diagram with red circles on the dots of the top two servers (emphasis, 02:04:00).

## S82 - 02:04:15-02:04:45 (b_020445.jpg)
New text: `(partitions)` above `Instagram has  Logical Shards on Physical DB servers`.

## S83 - 02:05:00-02:09:15 - Logical vs physical shards (b_020530.jpg, b_020542.jpg, b_020900.jpg, b_020915.jpg)
Text: arrows `↓ 1000s` under `Logical Shards` and `↓ 10/15` under `Physical DB servers`; `eg: MySQL server → Physical` (`Physical` yellow) / `CREATE DATABASE ....` / `↓` yellow `logical separation`.
Diagram (D-19): a large white cylinder containing five small blue-outlined rectangles with dots (logical databases inside one physical server).

## S84 - 02:09:30-02:11:54 - Instagram next_id stored function (b_021045.jpg, b_021100.jpg, b_021109.jpg, b_021115.jpg, b_021124.jpg, b_021127.jpg, b_021145.jpg, b_021154.jpg)
Text (pre-written page):
- `CREATE DATABASE insta5;` / `CREATE TABLE insta5.photos (` / `id bigint not null default insta5.next_id(),` (`insta5` yellow, `next_id` pink); pink `stored proc/` / `function` with an arrow to `next_id()`
- Four grey lines with a brace `} other columns in photos table` / `);`
- `CREATE OR REPLACE FUNCTION` / `insta5.next_id ( OUT result bigint ) AS $$` (`result` pink)
- `DECLARE` / `epoch bigint := 1314220021721` / `seq_id bigint` / `now_ms bigint` / `shard_id := 5` (`5` yellow)
- `BEGIN` / `SELECT nextual ('insta5.table_id_seq') %% 1024 AS seq_id;` (the function name is written like `nextual`, i.e. `nextval` with a rounded v; the operator is written `%.`-like, read as `%%`)
- `now_ms := ______` (a blank white bar)
- Pink `result` lines: `result := (now_ms - epoch) << 23;` / `result := result | (shard_id << 10);` / `result := result | (seq_id);`
- `END` / `$$`
Emphasis (02:11:45): red circle around `5` of `shard_id` and an underline.

## S85 - 02:12:00-02:13:15 (b_021230.jpg, b_021245.jpg, b_021254.jpg, b_021315.jpg)
Scrolling between the function page and the Instagram page (b_021254 is a page-transition view). Emphasis (02:12:45): red arc at the `10 bits` line. No new content.

## S86 - 02:13:30-02:14:15 (b_021330.jpg, b_021339.jpg, b_021342.jpg, b_021400.jpg, b_021412.jpg, b_021415.jpg)
Instagram page then the function page. Emphasis (02:13:39): red bracket over the `13 bits` and `10 bits` lines. No new content.

## S87 - 02:14:30-02:21:45 (b_021500.jpg, b_021503.jpg, b_021645.jpg, b_021800.jpg, b_021900.jpg, b_021915.jpg, b_022100.jpg, b_022145.jpg)
Q&A on the function page. Emphasis (02:15:03): red underline under `next_id`. No new content.

## S88 - 02:22:00-02:22:57 (b_022245.jpg, b_022257.jpg)
Function page, then (02:22:57) back to the Amazon batching page (S45-S50) for a question. No new content.

## S89 - 02:23:00-02:24:30 (b_022430.jpg)
Amazon page scrolled to the server boxes and batch calls. No new content.

## S90 - 02:24:45-02:29:15 (b_022630.jpg, b_022715.jpg, b_022815.jpg, b_022915.jpg)
Back on the Instagram function page during the closing Q&A. No new content.

## S91 - 02:29:30-02:29:45 (b_022930.jpg, b_022945.jpg)
Gallery view, not kept for publication. End of recording.
