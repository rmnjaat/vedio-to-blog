# Lecture 03 (lec05): figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `lectures/lec05/board/diagrams.md` and the clearest frame in `lectures/lec05/board/frames_kept/` (look at the frame, never embed it). New figures say "new". Each entry lists parts, arrows, labels, marker colours, the step text for step-throughs, the mobile layout and the ledger ids it carries.

Totals: **28 drawn items** = 23 numbered figures (3 of them step-throughs) + 5 rule-box sketches (one per RuleBox, chapters 1–5). Clip posters are specified in `animations.md`. All 10 board diagrams (D-01..D-10) are redrawn; none is dropped. Screen-shared code and terminal output (board_log S29–S46) are not diagrams: they become CodeBlocks and two new figures (Fig 2·c seat map, Fig 2·d / 2·e step-throughs) built from what the terminal showed.

---

## 0. The glyph kit (build these once, reuse everywhere)

Rules come from `learn/design/B-whiteboard-notebook/NOTES.md` and `site/FIGURES.md`: one stroke family (1.7 px, thin 1.1, heavy 3.2), round caps, bow ≤ 1.3, jitter ≈ 0.3, no hachure, shapes filled with `--fig-bg`, a distinct seed per part, labels ≥ 12 px on screen. Reuse the existing kit parts (`Box`, `Cyl`, `Replica`, `LoadBalancer`, `Actor`, `Arrow`, `Label`, `Num`, `Cross`, `Bracket`, `Lifeline`, `TimeAxis`, `Bubble`, `Step`, `Cube`). New parts for this lecture, to add to the kit:

| Glyph | Drawing | Label |
|---|---|---|
| transaction | circle, r ≈ 16, ink stroke (the board's `T1` circle) | mono `T1`, `T2`… inside |
| row | small rectangle 64×26 (board's `Row 1` box) | mono `row 1` |
| mini table | hand-ruled grid: header row + N body rows, column rule lines; body cells mono | header mono (`id`, `user_id`, `…`) |
| lock mark | tiny padlock: a 9×7 rounded rect with a 5 px shackle arc, at a row's right edge | none; colour by state (ink = held, green = just granted) |
| hourglass | 8×12 two-triangle glyph next to a waiting transaction | hand `waits` when first used |
| seat map | 6 columns (A–F) × N rows of 9 px dots; aisle gap after C; booked seat = filled ink dot; double-booked = red ring | mono row numbers on the left (`1`…`20`) |
| kiosk | narrow upright rectangle with a small screen rectangle inside | mono `k1`, `k2`… |
| passenger | `Actor` (≤ 3 per figure, per kit rule); more passengers are drawn as mono `p1`…`p120` labels | |
| cron clock | circle with two hands + small circular arrow (the board's "Batch Cleanup" loop) | mono `cron` |
| key-value table | the mini table with columns `key │ value │ expired_at` | |
| B+ tree (tiny) | three-level tree: one root box, two internal boxes, four leaf boxes, single strokes | mono `B+ tree` |
| hash table (tiny) | vertical strip of 6 slots, one chained entry hanging off a slot | mono `dict` |
| sample frame | a dashed rounded rectangle around a cluster of 20 small squares | hand `sample of 20` |
| cost badge (in CodeBlocks, not SVG) | small pill in Recursive casual after a SQL line | `saves: network IO`, `saves: disk IO` |

**Arrows.** Solid = synchronous request. Dashed = async (replication, the cron job). Open chevron heads on the initiator's direction only. Architecture views use orthogonal routing; diagonals only in time-sequence (swim-lane) views and in the board's lock-overlap tables (D-02, D-03), where the lines are **not arrows** but plain `Line` connectors (no heads), exactly as on the board.

**Replication arrows (kit rule 5):** dashed arrow from replica to master, hand `pulls changes`.

**Marker colours:** blue = request/data path (a query travelling, a row being read); green = ack/success (lock granted, commit, seat booked once); red = failure / stale / hard limit (double booking, deadlock cycle, killed transaction, wasted IO, the contested row). Graphite = everything else. **Waiting is graphite with an hourglass, never red** (waiting is not failure, L-0096). The board's yellow/pink/green/purple are not carried over; on the board pink = transaction 1 and green = transaction 2, which on the page becomes mono labels `T1`/`T2` and line style (T1 solid, T2 thin), never colour.

**Speech bubble:** at most one per chapter, only for the chapter's misconception: ch1 on the exclusive-locked row ("can nobody even read me?" → no; it is answered by SN-02, so the bubble is graphite and the caption points to the note), ch2 on the waiting transactions in Fig 2·e ("did we all get row 1?"), ch3 on the `created_at` query in Fig 3·b ("just add an index?"), ch4 none, ch5 none.

**Accessibility:** every SVG gets `<title>` = figure title and a `<desc>` stating the mechanism (draft given as "desc" where not obvious).

**Mobile:** figures with more than 7 glyphs or more than 2 panels get a `<Phone>` layout at ~340 units. Each entry says how.

---

## Chapter 1 · Locks, in theory

### Fig 1·a: Acquire, read and update, release (board redraw, S05/S06)
- **Board:** prepared page `Database Locking : [ Pessimistic Locking ]`, frames `b_000615.jpg` (clean) and `b_000700.jpg` (red tracing of the flow).
- **Parts:** two transaction circles `T1` (left) and `T2` (right, lower); one row box `seat 1A` in the middle; a vertical flow next to `T1`: mono `ACQ_LOCK()` → `READ · UPDATE` → `REL_LOCK()` (three stacked labels joined by short down arrows).
- **Arrows:** `T1` → row (solid, blue) with the lock mark turning ink; `T2` → row (solid, graphite) ending in an hourglass at the row's edge; after `REL_LOCK()` a green tick on the lock mark and `T2`'s arrow turns blue (second panel).
- **Panels:** a "T1 holds the lock" · b "T1 releases; T2 goes".
- **Labels:** hand `critical section` bracketing `READ · UPDATE`; hand `waits its turn` by T2's hourglass.
- **Colours:** blue = the holder's access; green = release/grant; graphite hourglass.
- **Mobile:** panels stack.
- **Ids:** L-0019, L-0021 (caption: "one at a time: correct, and slower").
- **desc:** "Transaction 1 acquires the lock on a row, reads and updates it, and releases it. Transaction 2 waits until the release, then gets the lock."

### Fig 1·b: Two shared locks on overlapping rows (D-02 redraw)
- **Board:** D-02, frame `b_001615.jpg` (also `b_001900.jpg`).
- **Parts:** left: mini table, columns `id │ user_id │ …`, six body rows numbered 1–6 in the user_id column. Right top: label mono `T1 · FOR SHARE`, query mono `SELECT … WHERE user_id IN (1,2,6) FOR SHARE;`. Right bottom: `T2 · FOR SHARE`, `… IN (3,4,6) FOR SHARE;`.
- **Connectors:** plain lines (no heads) from rows 1, 2, 6 to T1's query (solid) and from rows 3, 4, 6 to T2's query (thin). Row 6 has both lines and a small double lock mark.
- **Labels:** hand `both may read row 6`; under T2 a third mono line from the board's live addition: `→ UPDATE … row 6` with an hourglass and hand `waits for T1` (the board's `Updt __ set dest = "a"`, written as a generic update).
- **Colours:** row 6 lock marks ink; T2's attempted update hourglass graphite. No red: nothing failed.
- **Mobile:** table on top, the two queries below it; connectors become row-number tags (`1,2,6 → T1`, `3,4,6 → T2`) to avoid crossing lines at 340 units.
- **Ids:** L-0038, L-0039, L-0040, L-0041, L-0042 (caption ends: "More precisely, see the note below: T1 can't update row 6 either while T2 shares it", SN-03).

### Fig 1·c: Two exclusive locks on overlapping rows (D-03 redraw)
- **Board:** D-03, frame `b_002130.jpg`; emphasis `b_002245.jpg` (red brackets, dashes under the overlap).
- **Parts:** same layout as Fig 1·b; T1 `FOR UPDATE` (status hand `read & modify`), T2 `FOR UPDATE` (status hand `waits`, hourglass).
- **Connectors:** as in 1·b. Row 6 ringed **red** (the contested row), and a red dash under `6` in both `IN (…)` lists (the board's emphasis).
- **Labels:** hand `without row 6, T2 would finish with 3 and 4`.
- **Speech bubble (ch1's one):** on row 6, graphite: "can nobody even read me?" Caption: "On the board, nobody else may even read an exclusively locked row. More precisely, plain reads still see the last committed version (SN-02)."
- **Mobile:** as 1·b.
- **Ids:** L-0045, L-0046, L-0047, L-0048, L-0049.

### Fig 1·d: Skip or fail (new, from board S18 and S22)
- **Board:** `SKIP LOCKED` page `b_002157.jpg`, `NOWAIT` page `b_002515.jpg`.
- **Panels:** both use the six-row mini table with rows 1, 2, 6 lock-marked (held by T1, label `T1 holds`).
  - a "`FOR UPDATE SKIP LOCKED`": T2's query `… IN (3,4,6) FOR UPDATE SKIP LOCKED;`; lines to rows 3, 4 (green ticks) and a dashed grey line to row 6 crossed out with a small graphite slash; result tag mono `→ rows 3, 4` and hand `moves on at once`.
  - b "`FOR UPDATE NOWAIT`": same query with `NOWAIT`; line to row 6 ends in a red `Cross`; result tag mono `ERROR 3572: Do not wait for lock` in red; hand `kills itself`.
- **Mobile:** panels stack.
- **Ids:** L-0051, L-0053, L-0054, L-0055.

### Fig 1·e: A deadlock (D-01 redraw, T2 restored)
- **Board:** D-01, frame `b_001430.jpg`. The right-hand node is hidden behind the participant tiles in every frame; per the audio it is T2. Draw the intended cycle.
- **Parts:** `T1` circle (left), `T2` circle (right), `row 1` box (top middle), `row 2` box (bottom middle).
- **Arrows:** solid ink "holds" lines (no head, with a lock mark at the row) `T2 — row 1` and `T1 — row 2`; red solid arrows "wants" `T1 → row 1` and `T2 → row 2`. Together they form a red cycle T1 → row 1 → T2 → row 2 → T1 (the board's direction of travel).
- **Labels:** hand `holds` / `wants` on one of each; board captions under the drawing: hand `Risk: transactional deadlock` and `the transaction that detects it is killed` (the board's "kills itself", restated; SN-04 sits right after).
- **Colours:** red cycle; holds in ink.
- **Mobile:** fits at 340 (4 glyphs).
- **Ids:** L-0026, L-0032, L-0033.
- **desc:** "T1 holds row 2 and waits for row 1; T2 holds row 1 and waits for row 2. The waits form a cycle, so neither can move until the database rolls one of them back."
- **Note:** the clip `l05-deadlock` uses this as its poster's base layout.

### Rule-box sketch §1
- A tiny version of Fig 1·a panel a: one row box with a lock mark, `T1` arrow in, `T2` with an hourglass, a green tick over the row. 480 units wide. Ids L-0023.

---

## Chapter 2 · Building the airline check-in

### Fig 2·a: The check-in schema (D-04 redraw)
- **Board:** D-04, frame `b_002845.jpg` (also `b_002830.jpg`, `b_002945.jpg`).
- **Parts:** five mini tables, names in mono: `airlines(id, name)`: `1 AIRINDIA`, `2 INDIGO`, `3 GOAIR`; `flights(id, airline_id, name)`: `1 1 AIRINDIA 101`, `2 1 AIRINDIA 279`, `3 2 INDIGO 6E101`; `trips(id, flight_id, fly_time)`: the board's five rows (`1 1 08/04/2022 10:00` …); `users(id, name)`: ids 1–5 with placeholder names `user 1`…`user 5` (board names not reproduced); `seats(id, name, trip_id, user_id)`: `1 1A 1 1`, `2 1B 1 3`, `3 1C 1 2`, `4 1D 1 5`, `5 1E 1 4`, plus a sixth row `… 1F 1 NULL` (hand `a new trip starts all NULL`).
- **Arrows:** thin orthogonal key links (head at the referenced table): `flights.airline_id → airlines.id`, `trips.flight_id → flights.id`, `seats.trip_id → trips.id`, `seats.user_id → users.id`. The board draws none; the page adds them thin, as implied by the id columns.
- **Colours:** none (graphite). The `user_id` column of `seats` gets a blue underline: it is the only column the demo writes.
- **Mobile:** two columns of tables (airlines+flights+trips / users+seats); key links become mono `→ airlines.id` tags.
- **Ids:** L-0064, L-0066, L-0073.

### Fig 2·b: Check-in architecture (D-05 redraw)
- **Board:** D-05, frame `b_003000.jpg` (also `b_002924.jpg`).
- **Parts:** three `Actor`s (left) labelled hand `passengers`; `Box` `check-in`; `Cyl` `mysql`; below it `Box` `admin svc` with one `Actor` (`admin`).
- **Arrows:** passengers → `check-in` (solid blue), `check-in` → `mysql` (solid blue), `admin svc` → `mysql` (solid graphite, orthogonal).
- **Labels:** hand over `check-in`: `end-user facing check-ins`; hand by `admin svc`: `adds flights & trips, opens seats (user_id NULL)`; board footer as a caption line: "How will we handle all 120 people on one trip checking in at the same time?"
- **Mobile:** fits (6 glyphs).
- **Ids:** L-0063, L-0065, L-0066.

### Fig 2·c: After approach 2 (new, from the terminal, board_log S34)
- **Frame:** `b_003957.jpg` (seat map), log lines `b_003915.jpg`–`b_003948.jpg`.
- **Parts:** a seat map 20 rows × 6 seats (the terminal prints 6 rows of 20; rotate to plane orientation, rows down). A scattered handful of filled dots; seats **7E** and **12E** filled and ringed red with a small `×2` each. Most dots empty.
- **Labels:** mono `7-E ← p? and p?` (two passenger tags), hand `two passengers, one seat`, hand `most seats never booked`. Caption gives the counts only as "far fewer than 120" (the terminal doesn't show an exact total).
- **Mobile:** the map is narrow already (6 × 9 px columns); fits.
- **Ids:** L-0076, L-0078, L-0082.

### Fig 2·d: Three kiosks, one first seat (new StepThrough, approach 3)
- **Layout:** swim lanes, time down: `p1 (kiosk 1)` · `p2 (kiosk 2)` · `p3 (kiosk 3)` · `seats` (a 2-row slice of the map: 1A–1F). Three passengers stand in for 120 (hand note at the top: `3 of 120`).
- **Steps:**
  1. p1, p2, p3 each send `SELECT … user_id IS NULL ORDER BY id LIMIT 1` (blue arrows) and each get `1A` back (blue return). *"All three read at the same moment. All three see seat 1A as free."* (L-0084, L-0085, L-0090)
  2. p1 and p2 each `UPDATE seat 1A` (blue) and commit (green tick on each). 1A ends with p2's id; p1's write is overwritten, ringed red. *"Both book 1A. The last write wins, and p1 holds a boarding pass for a seat that is now p2's."* (L-0088, L-0090)
  3. p3 is slower: its read comes after p2's commit (draw p3's SELECT lower on the time axis in this step's variant: the step shows a second p3 read). It gets `1B`. *"p3 read after a commit landed, so `user_id IS NULL` skips 1A and returns 1B."* (L-0087, L-0091, L-0092)
  4. End state: map shows 1A and 1B filled, many passengers logged on 1A (mono `1-A × many`). *"A handful of seats fill, in order. How many depends on how many commits land before other reads: 2 to 4 in class."* (L-0086, L-0088, L-0093)
- **Colours:** blue requests, green commits, red on the overwritten booking.
- **Mobile:** lanes narrow to 3 + seats; labels mono 12.5.
- **Ids:** L-0084, L-0085, L-0086, L-0087, L-0088, L-0090, L-0091, L-0092, L-0093.

### Fig 2·e: Wait, signal, re-check (new StepThrough, approach 4)
- **Layout:** swim lanes: `T1` · `T2` · `T3` · `engine` (a narrow lane with a mono `lock table`) · `seats` (1A, 1B, 1C).
- **Steps:**
  1. T1, T2, T3 each run `… ORDER BY id LIMIT 1 FOR UPDATE`. The engine grants T1 the lock on 1A (green lock mark); T2 and T3 get no row, only hourglasses. *"T1 gets the lock on 1A. T2 and T3 get nothing back yet: the engine hands out a row only with its lock."* (L-0113, L-0114)
  2. T1 updates 1A and commits (green). The engine sends a signal (thin graphite arrow, mono `signal`) to T2 and T3. *"T1 commits. Its lock is released, and the engine wakes the waiters."* (L-0115)
  3. T2 and T3 re-evaluate the same statement inside the engine (a small circular arrow on each lane, mono `re-check`). 1A no longer matches `user_id IS NULL`; T2 gets the lock on 1B, T3 waits again. *"Each waiter re-checks its WHERE against the new row. 1A is taken, so the scan moves on: T2 locks 1B; T3 waits again."* (L-0115, L-0116, L-0148; A-C-11 in the step text: "at READ COMMITTED; PostgreSQL's REPEATABLE READ would error here and retry")
  4. T2 commits, signal, T3 re-checks and locks 1C. *"Again: commit, signal, re-check. Seats fill in order, and nobody busy-loops: waiters sleep until signalled."* (L-0113, L-0163)
  5. Panel note: mono `re-checks: 3 + 2 + 1 = 6 = N(N+1)/2 for N = 3`, hand `for 120 passengers: 7,260`. *"In the worst case every waiter re-checks after every commit."* (L-0155)
- **Speech bubble (ch2's one):** on T2/T3 in step 1: "did we all get 1A?" (the misconception, L-0114).
- **Colours:** green grants/commits; graphite hourglasses and signals; blue statements.
- **Mobile:** 3 transaction lanes + engine + seats is 5 lanes: on phone, drop the seats lane and show the seat on each grant as a mono tag (`1B`).
- **Ids:** L-0113, L-0114, L-0115, L-0116, L-0148, L-0155, L-0163.

### Fig 2·f: Two taps on seat 67 (new)
- **Board:** live edit S45, frame `b_011530.jpg` (`… AND id = 67 FOR UPDATE`).
- **Layout:** two swim lanes `kiosk 1` · `kiosk 2`, one row box `seat 67` on the right.
- **Arrows:** both send `SELECT … id = 67 AND user_id IS NULL FOR UPDATE` (blue). Kiosk 1 gets the lock (green), updates, commits (green). Kiosk 2 waits (hourglass), re-checks the same seat, matches **no rows** (red `Cross` on its return) → hand `seat's gone` in its lane.
- **Labels:** hand `pinned to id = 67: nowhere else to go`.
- **Mobile:** fits.
- **Ids:** L-0138, L-0139, L-0140, L-0141.

### Fig 2·g: Lock for a moment, hold for ten minutes (new)
- **Layout:** one horizontal time axis 0 → 10 min. Above it a short green bar at t ≈ 0 labelled mono `txn: lock seat → status = HOLD → commit` (a few ms wide, drawn as a thin sliver with a leader label). A long graphite band from 0 to 10 min labelled hand `seat on hold (a status, no lock)` with a mono `payment` box sitting on it. At 10 min a second green sliver `txn: status = BOOKED → commit`. Below the axis, struck through in red: a long red bar `one transaction for 10 minutes` with a red `Cross` and hand `throughput collapses`.
- **Mobile:** axis vertical (time down).
- **Ids:** L-0135, L-0137, L-0161, L-0162.

### Rule-box sketch §2
- Six seat dots, eight small arrows converging on one dot, a lock mark on it. Mono `fixed inventory + contention`. 480 units. Ids L-0126.

---

## Chapter 3 · A key-value store on MySQL

### Fig 3·a: The `store` table, built live (D-06 redraw as a StepThrough)
- **Board:** D-06, frames `b_014100.jpg` (types), `b_014218.jpg` (created_at, ttl_sec), `b_014545.jpg` (expired_at), `b_014900.jpg` (the `-1` row), `b_015830.jpg` (final, zoomed out).
- **Layout:** one key-value table, re-drawn per step; queries in mono to its right (as on the board).
- **Steps:**
  1. Columns `key │ value`. Arrow from `key` to mono `PK (VARCHAR(16))`; from `value` to `(BLOB)`. Side sketch (hand, small): `id → { … }` with hand `query inside? then not a blob`. *"Key as the primary key with a fixed size; the value a black box."* (L-0176, L-0179, L-0187)
  2. Columns `key │ value │ created_at │ ttl_sec`; query to the right ringed red: `DELETE … WHERE now() - created_at >= ttl`. *"The first idea for expiry: store when the key was made and how long it lives."* (L-0188, L-0190)
  3. Columns `key │ value │ expired_at`; `created_at`/`ttl_sec` struck through; query green: `DELETE FROM store WHERE expired_at <= now()`. *"Store the answer instead: the absolute expiry time, indexed."* (L-0194, L-0195)
  4. A fourth empty column ringed (the board's `is_del`) then struck; row `a │ — │ -1`; query `UPDATE store SET expired_at = -1 WHERE key = 'a'`. *"Delete becomes an update. No is_deleted column: -1 marks it, and the same cleanup job removes it."* (L-0199, L-0202, L-0231)
  5. Row `k1 │ v1 │ e`, then `v1` struck and `v2` written; mono `PUT k1 v1 / PUT k1 v2` with a brace; a yellow-board `UPSERT` box becomes a plain mono box `INSERT … ON DUPLICATE KEY UPDATE`. *"The second put replaces the value: an upsert, one statement."* (L-0205, L-0214)
- **Colours:** red ring on the step-2 query; green on its replacement; red strike on discarded columns.
- **Mobile:** table only (queries move to the step text).
- **Ids:** L-0176, L-0179, L-0187, L-0188, L-0190, L-0194, L-0195, L-0199, L-0202, L-0205, L-0214, L-0231.

### Fig 3·b: Why the index can't help (new)
- **Panels:**
  - a "`now() - created_at >= ttl`": a tiny B+ tree on `created_at` drawn greyed out (muted) with a red `Cross`; beside it the table with every row touched by a blue scan arrow running top to bottom; mono `rows read: all`.
  - b "`expired_at <= now()`": a B+ tree on `expired_at`; a blue arrow enters at the leftmost leaf and runs along the first two leaves only, stopping at a red tick labelled mono `now()`; mono `rows read: expired only`.
- **Speech bubble (ch3's one):** panel a: "just add an index on created_at?"
- **Mobile:** stack.
- **Ids:** L-0191, L-0192, L-0195, L-0012.

### Fig 3·c: Two trips or four (new)
- **Layout:** swim lanes `api` · `mysql`, two columns side by side.
  - left "get, then write": ① `SELECT … WHERE key = k1` (blue) ② row back (blue, mono `value: 10 MB?`) ③ `INSERT` or `UPDATE` (blue) ④ ack (green). Hand `4 trips`.
  - right "upsert": ① `INSERT … ON DUPLICATE KEY UPDATE` (blue) ② ack (green). Hand `2 trips`.
  - Under the left column a small variant line: mono `SELECT TOP 1 1 …` replaces ①, with hand `smaller, still a round trip`.
- **Mobile:** columns stack.
- **Ids:** L-0207, L-0215, L-0328, L-0329, L-0330.

### Fig 3·d: Batch deletion with a cron job (D-07 redraw)
- **Board:** D-07, frame `b_020700.jpg` (also `b_020630.jpg`).
- **Parts:** a horizontal time axis with six ticks; a brace under one interval labelled mono `t = 10 min`; above every tick a cron clock with a dashed arrow down to the axis, hand `hard delete`. Below: `Actor` → `Box` `kv store` → `Cyl` `mysql`; next to it mono `SELECT * FROM store WHERE key = k AND expired_at > now();` with hand `between runs, reads filter`.
- **Colours:** the cron arrows dashed graphite (async); the read path blue.
- **Mobile:** axis vertical.
- **Ids:** L-0236, L-0201.

### Rule-box sketch §3
- One mono SQL line `… WHERE key = k AND expired_at > now()` with three small hand tags hanging off it: `network`, `disk`, `rows`. Ids L-0223.

---

## Chapter 4 · If it were in memory

### Fig 4·a: Deleting on disk vs in memory (new)
- **Panels:**
  - a "on disk": tiny B+ tree; one leaf entry struck; a red curved arrow labelled hand `rebalance?` over two leaves; mono `B+ tree`. Under it hand `batch the deletes`.
  - b "in memory": tiny hash table strip (`dict`); one chained entry unlinked with a green tick, mono `free()`; hand `microseconds: delete right there`.
- **Caption** carries the SN-11 nuance: "On disk the cost is real but not catastrophic: InnoDB delete-marks and purges later (see the note)."
- **Mobile:** stack.
- **Ids:** L-0239, L-0240, L-0241, L-0338.

### Fig 4·b: A sample stands for the population (board redraw, S69)
- **Board:** Approach 3 page, frames `b_021530.jpg`, `b_021745.jpg`.
- **Parts:** a large field of ~200 small squares (keys with a TTL); about 30% drawn struck (expired) in graphite; a dashed sample frame around 20 of them, of which 6 are struck. Next to the frame, mono `6 / 20 = 30% > 25% → delete 6, sample again`; a second, later frame with mono `3 / 20 = 15% → delete 3, stop`.
- **Labels:** hand `population: keys with an expiry`; hand `sample: 20 at random`. Footnote line in the caption: "Classic Redis. Since 6.0: batches of 20, keep going above ~10% (SN-12)."
- **Colours:** deleted keys in the sample turn to green ticks (freed).
- **Mobile:** population field shrinks to ~80 squares; frames stack.
- **Ids:** L-0247, L-0249, L-0250, L-0251.

### Rule-box sketch §4
- Side by side: a tiny B+ tree with a red "rebalance" mark and a hash slot with a green tick. Ids L-0241.

---

## Chapter 5 · Making it distributed

### Fig 5·a: One MySQL behind many API servers (D-08 redraw)
- **Board:** D-08, frame `b_022730.jpg` (also `b_024200.jpg`).
- **Parts:** `Actor` → `LoadBalancer` → `Fleet` of three `Box` `kv-api` → `Cyl` `mysql`; below `mysql` a `Box` `batch cleanup` with the cron clock.
- **Arrows:** user → lb → each api → mysql (solid blue, orthogonal); cleanup → mysql dashed (async).
- **Labels:** hand under the fleet `add API servers while MySQL keeps up` (board caption).
- **Mobile:** vertical stack (user top, mysql bottom).
- **Ids:** L-0271, L-0272.

### Fig 5·b: Read replicas (D-09 redraw)
- **Board:** D-09, frame `b_023030.jpg` (also `b_024045.jpg`).
- **Parts:** as 5·a, `mysql` becomes `Cyl` `master` with two `Replica`s to its right; `batch cleanup` under the master only.
- **Arrows:** writes and critical reads api → master (solid blue); one api → replica (solid blue, hand `reads that can be a little stale`); replicas → master dashed, hand `pulls changes` (kit rule 5; the board draws plain lines).
- **Labels:** mono `reads : writes = 99 : 1` (board caption).
- **Mobile:** stack.
- **Ids:** L-0274, L-0275, L-0276.

### Fig 5·c: Two range shards (D-10 redraw)
- **Board:** D-10, frame `b_023600.jpg` (also `b_023430.jpg`, `b_023057.jpg`); emphasis at 02:43:30 (red loop on the top api) not carried.
- **Parts:** user → lb → three `kv-api`; two masters `master 1 [a–m]`, `master 2 [n–z]`, each with one `Replica` and its own `batch cleanup` box.
- **Arrows:** every api connects to both masters (solid thin lines, orthogonal through a shared vertical bus to avoid the board's crossing tangle); replicas → their master dashed `pulls`. One highlighted path in blue: mono `GET google` → api → `master 1`; a second in blue thin: `GET zomato` → `master 2`.
- **Labels:** on each api a tiny mono table `a–m → m1 · n–z → m2` (the routing lives here); hand caption from the board: `each master owns an exclusive fragment of the data`.
- **Mobile:** two masters stacked; api fleet as one box `kv-api ×3` with the routing table under it.
- **Ids:** L-0279, L-0280, L-0282, L-0283, L-0285, L-0289.

### Fig 5·d: One transaction, two shards (new, small)
- **Parts:** one `Box` `txn: 4 keys`; three key chips `k1 k2 k3` going to `master 1` (green ticks: `ACID here`), one chip `k4` going to `master 2`; between the two masters a red dashed bracket hand `no ACID across shards` and mono `2PC: slow`.
- **Mobile:** fits.
- **Ids:** L-0296, L-0297, L-0298.

### Rule-box sketch §5
- Three tiny states left to right: one cylinder → cylinder + two dashed replicas → two cylinders `[a-m]` `[n-z]`, joined by small graphite arrows. Ids L-0290.

---

## Chapter 6 · What to keep

### Fig 6·a: The store, end of Lecture 3 (new; extends Fig 5·c)
- **Parts:** Fig 5·c's architecture at small scale; each part carries a mono section tag linking to its section: `kv-api` → `§5.3 routing`, master → `§3 store table`, replica → `§5.2`, `batch cleanup` → `§3.7`, a small `T1/T2` lock mark on a master's row → `§1–2 locks`, a side bubble `if in memory → §4`.
- **Use:** navigation (each tag links to its section), as Lecture 2's Fig 6·a.
- **Mobile:** vertical stack, tags as a list under the drawing.
- **Ids:** L-0289 (restated; no new placement).

---

## Figure → id index (quick check)
| Figure | ids |
|---|---|
| 1·a | L-0019, L-0021 |
| 1·b | L-0038, L-0039, L-0040, L-0041, L-0042 |
| 1·c | L-0045, L-0046, L-0047, L-0048, L-0049 |
| 1·d | L-0051, L-0053, L-0054, L-0055 |
| 1·e | L-0026, L-0032, L-0033 |
| 2·a | L-0064, L-0066, L-0073 |
| 2·b | L-0063, L-0065, L-0066 |
| 2·c | L-0076, L-0078, L-0082 |
| 2·d | L-0084..L-0093 (minus L-0089) |
| 2·e | L-0113, L-0114, L-0115, L-0116, L-0148, L-0155, L-0163 |
| 2·f | L-0138, L-0139, L-0140, L-0141 |
| 2·g | L-0135, L-0137, L-0161, L-0162 |
| 3·a | L-0176, L-0179, L-0187, L-0188, L-0190, L-0194, L-0195, L-0199, L-0202, L-0205, L-0214, L-0231 |
| 3·b | L-0012, L-0191, L-0192, L-0195 |
| 3·c | L-0207, L-0215, L-0328, L-0329, L-0330 |
| 3·d | L-0201, L-0236 |
| 4·a | L-0239, L-0240, L-0241, L-0338 |
| 4·b | L-0247, L-0249, L-0250, L-0251 |
| 5·a | L-0271, L-0272 |
| 5·b | L-0274, L-0275, L-0276 |
| 5·c | L-0279, L-0280, L-0282, L-0283, L-0285, L-0289 |
| 5·d | L-0296, L-0297, L-0298 |
| 6·a | L-0289 |
| rule sketches | L-0023, L-0126, L-0223, L-0241, L-0290 |
