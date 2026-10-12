# Lecture 05 - Board log

Source video: `vedio/5_6071352042910125153.mp4` (1280x720, 3:21:48). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change / screen share), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states (96 short-lived states kept).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen; `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant-tile column on the right.
- Handwriting note: the teacher writes the letter pair "te" as a joined stroke that looks like a "k" (e.g. "represenkd", "strakgies", "prokct", "updaks"). These are read as "te" (represented, strategies, protect, updates) and are not marked [sic]; genuine slips are.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow = headings and key terms, green = good/allowed/"read" or release, pink/red = bad/forbidden/"modify" or acquire, light purple = side notes and references ("Refer ..."). Grey-green rounded highlights mark emphasised words. Red freehand strokes are temporary emphasis.
- Most of the lecture is a prepared handwritten notebook (pre-written pages revealed by scrolling), with live additions in white/red during the class. From ~00:28 the screen alternates between the notebook, a code editor / terminal (Go program for the airline check-in demo, MySQL client), and back. Code on screen is logged at the level of what is visible and readable.
- A semi-transparent "ARPIT BHAYANI" watermark sometimes appears at the bottom right; it is not board content.
- Participant names/faces in the right-hand column are deliberately not recorded.

---

## S01 - 00:00:00-00:00:15 - Title slide (b_000015.jpg)
Topic: course title card (static slide).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on a magenta brush stroke) / `Databases`.
Change: first state.

## S02 - 00:00:30-00:01:45 - Agenda (b_000100.jpg, b_000145.jpg)
Topic: lecture agenda.
Text (heading `Agenda:`; items each preceded by `-`):
- `Relational Databases & Pessimistic locking`
- `Designing: Airline Checkin System`
- `Designing: KV Store on relational DB` (the "r" of "relational" has an extra leading stroke and looks like `trelational`; read as "relational")
Change: new page; b_000145.jpg is the same page scrolled up slightly, no new content.

## S03 - 00:02:00-00:04:00 - Relational databases (b_000200.jpg, b_000212.jpg, b_000400.jpg)
Topic: what a relational DB is; relations; ACID.
Text:
- Heading: `Relational Databases:`
- `Data is stored & represented in rows and column` [cut off at the tile column; "columns"] (`rows` and `column…` highlighted grey-green)
- Yellow: `Key highlight of relational database are`
- Green-outlined box: `Relations`, with a white arrow pointing down-left to
- `You pick relational databases for relations.` (`relations` in green)
- `Relational Databases are known for ACID` (`ACID` in yellow)
- Purple: `* Refer to pre-reads for understanding ACID`
Change: new page; b_000212.jpg identical; b_000400.jpg scrolled down, revealing the next heading `Database Indexes:`.

## S04 - 00:04:15-00:05:45 - Database indexes (b_000500.jpg, b_000545.jpg)
Topic: index trade-off.
Text:
- Heading: `Database Indexes:`
- `Indexes make reads faster` / `and writes slower` (`faster` green, `slower` pink, the rest yellow/purple)
- Purple: `* Refer my YT video :` / `How indexes make DB read faster ?`
Change: scrolled down; b_000545.jpg scrolled further, no new content.

## S05 - 00:06:00-00:06:15 - Database locking (b_000615.jpg)
Topic: pessimistic locking, core idea and flow.
Text:
- Heading (yellow): `Database Locking :` followed by purple `[ Pessimistic Locking ]`
- `Core idea: You acquire the lock before proceeding`
- `Typical Flow →` then a vertical sequence: `ACQ_LOCK()` (pink) / `READ UPDATE` (white) / `REL_LOCK()` (green)
- Yellow: `Two types of locking strategies` / `- Shared lock` (left) / `- Exclusive lock` (right)
Change: new page.

## S06 - 00:06:30-00:07:00 (b_000700.jpg)
Same page scrolled. Emphasis at 00:07:00: red freehand arrows drawn into `ACQ_LOCK()`, a red squiggle from `ACQ_LOCK()` down to `REL_LOCK()`, and a red arrow into `REL_LOCK()` (tracing the acquire - critical section - release flow).
Newly visible text: yellow `Why do we need locks` / `To protect the sanity of the data` (`sanity` highlighted).

## S07 - 00:07:15 (b_000715.jpg)
Topic: why locks.
Text: two purple arrows down from `sanity` to `Consistency` and `Integrity`; then `Protecting the data against concurrent updates` (`concurrent` underlined).
Change: scrolled down; red emphasis from S06 gone.

## S08 - 00:07:30-00:14:30 - Transactional deadlock (b_001430.jpg)
Topic: deadlock risk of pessimistic locking.
Text:
- Purple: `Risk: Transactional Deadlock !!`
- `The transaction that detects the deadlock kills itself !` (`kills itself` in pink)
Diagram (D-01): yellow circle `T1` on the left; pink arrow T1 → rectangle `Row 1` (top); a pink arrow leaves `Row 1` to the right and runs behind the tile column [cut off]; a pink arrow comes from the right [cut off] into rectangle `Row 2` (bottom); pink arrow `Row 2` → `T1`. The right-hand node (per audio, transaction T2) is hidden behind the participant tiles in every frame.
Change: scrolled down; the deadlock diagram stays on screen for the whole 7-minute explanation.

## S09 - 00:14:45 - Shared locks (b_001445.jpg)
Topic: shared (read) lock semantics.
Text (heading yellow `Shared locks :`):
- `- reserved for read by the current transaction` (`read` green)
- `- other transactions can read the locked rows` (`read` green)
- `- other transactions cannot modify the locked rows` (`modify` pink)
- `- if the current transaction wants to modify then` / `the locks will be upgraded to an exclusive lock` (`modify` yellow)
- Yellow: `Implementation`
- `SELECT * FROM ....... FOR SHARE;` (`FOR SHARE;` pink)
Change: new page.

## S10 - 00:15:00-00:16:27 - FOR SHARE example (b_001615.jpg, b_001627.jpg)
Topic: two transactions taking shared locks on overlapping rows.
Text: `SELECT * FROM ....... FOR SHARE;` at top, then:
- Yellow `Transaction 1` + purple `READ & MO` [cut off; "READ & MODIFY"]; `SELECT ....` / `WHERE user_id IN (1,2,6)` / `FOR SHARE;` (pink)
- Yellow `Transaction 2` + purple `READ & WAI` [cut off; "READ & WAIT"]; `SELECT ....` / `WHERE user_id IN (3,4,6)` / `FOR SHARE` (green)
- Live white addition under Transaction 2: `→ Updt __ set dest = "a";` (handwritten quickly; the column name reads `dest` or `desc`; not spoken in the audio)
Diagram (D-02): a table drawn with columns `id` | `user_id` | `....`; rows numbered `1`..`6` in the user_id column. Pink lines from rows 1, 2 and 6 converge on the Transaction 1 `WHERE` line; green lines from rows 3, 4 and 6 converge on the Transaction 2 `SELECT` line (row 6 is claimed by both).
Change: new section, scrolled down; b_001627.jpg identical.

## S11 - 00:16:30-00:17:00 (b_001700.jpg)
Scrolled back up to `Shared locks :` and its list. No new content.

## S12 - 00:17:12-00:19:00 (b_001712.jpg, b_001900.jpg)
Scrolled down again to `Implementation` and the D-02 table / two transactions. No new content.

## S13 - 00:19:12-00:19:15 (b_001912.jpg, b_001915.jpg)
Same D-02 table and two FOR SHARE transactions (b_001915.jpg scrolled up to show `SELECT * FROM ....... FOR SHARE;`). No new content.

## S14 - 00:19:18 (b_001918.jpg)
Scrolled up to `Shared locks :` list; at the bottom edge the start of the next block is visible with Transaction 1's label in full: `READ & MODIFY`. No new content.

## S15 - 00:19:30-00:19:42 - Exclusive locks (b_001930.jpg, b_001942.jpg)
Topic: exclusive (write) lock semantics.
Text (heading yellow `Exclusive locks :`):
- `- reserved for write by the current transaction` (`write` green)
- `- other transactions cannot read the locked rows` [last word cut off] (`read` pink)
- `- other transactions cannot modify the locked rows` [last word cut off] (`Modify` pink)
- Yellow: `Implementation`
- `SELECT * FROM ....... FOR UPDATE;` (`FOR UPDATE ;` pink)
- Start of the example: `Transaction 1   READ & MODIFY`
Emphasis at 00:19:42: red circle around `transactions` in "other transactions cannot read".
Change: new page.

## S16 - 00:19:45-00:21:42 - FOR UPDATE example (b_001945.jpg, b_002130.jpg, b_002142.jpg)
Topic: two transactions with exclusive locks on overlapping rows.
Text: `SELECT * FROM ....... FOR UPDATE ;` then
- Yellow `Transaction 1` + purple `READ & MO` [cut off; "READ & MODIFY"]; `SELECT ....` / `WHERE user_id IN (1,2,6)` / `FOR UPDATE ;` (pink)
- Yellow `Transaction 2` + purple `WAIT`; `SELECT ....` / `WHERE user_id IN (3,4,6)` / `FOR UPDATE ;` (green)
Diagram (D-03): same table and connector lines as D-02 (columns `id` | `user_id` | `....`, rows 1-6; pink lines 1, 2, 6 to Transaction 1; green lines 3, 4, 6 to Transaction 2).
Change: scrolled down.

## S17 - 00:21:45 (b_002145.jpg)
Scrolled back up to `Exclusive locks :`. No new content.

## S18 - 00:21:57 - Skip locked (b_002157.jpg)
Topic: SKIP LOCKED.
Text:
- Heading (yellow): `SKIP LOCKED` (the final D is drawn open and looks like `P`)
- `Removes the locked rows from the result set`
- Yellow: `SELECT * FROM t WHERE id = 2`
- Green: `FOR UPDATE  SKIP LOCKED;`
- A white arrow points up at `SKIP LOCKED` from: `if the row is locked it would skip it`
- Bottom edge: start of `NOWAIT` heading.
Change: new page.

## S19 - 00:22:00-00:22:45 (b_002245.jpg)
Back on the FOR UPDATE example (D-03). Emphasis at 00:22:45: red brackets around Transaction 1's query and Transaction 2's query, red dashes under `(1,2,6)` and `(3,4,6)` (the overlapping row 6).

## S20 - 00:23:00-00:23:24 (b_002315.jpg, b_002324.jpg)
b_002315.jpg: SKIP LOCKED page again (scrolled; `if the row is locked it would ski` [cut off]); `NOWAIT` heading and first line of its text visible at the bottom. b_002324.jpg: scrolled up to `Exclusive locks :` / `Implementation`. No new content.

## S21 - 00:23:30-00:23:45 (b_002345.jpg)
D-03 example (lower part, Transaction 2 `WAIT`). No new content; red emphasis from S19 gone.

## S22 - 00:24:00-00:25:15 - NOWAIT (b_002515.jpg)
Topic: NOWAIT.
Text:
- Heading (yellow): `NOWAIT`
- `locking read does not wait for the lock to be` [cut off] / `acquired. It fails immediately if the row is lo` [cut off] (`fails immediately` green)
- Yellow: `SELECT * FROM t WHERE id = 2`
- `FOR UPDATE` (green) `NOWAIT` (pink) `;`
- White arrow up at `NOWAIT` from: `if the row is locked kill the transaction` (`kill the transaction` pink)
- `ERROR 3572 : DO NOT WAIT FOR LOCK` (the second R of ERROR is overwritten)
Change: new page section.

## S23 - 00:25:30-00:25:57 (b_002530.jpg, b_002545.jpg, b_002548.jpg, b_002557.jpg)
Scrolling back and forth between the D-03 FOR UPDATE example (b_002530.jpg, b_002548.jpg) and the SKIP LOCKED page (b_002545.jpg, b_002557.jpg). No new content.

## S24 - 00:26:00-00:28:15 - Airline check-in system (b_002800.jpg, b_002815.jpg)
Topic: problem statement for the demo.
Text (heading yellow, centred `Airline Check-in System`):
- `- Multiple airlines`
- `- Every airline has multiple plane (flight)`
- `- Each flight has 120 seats`
- `- Every flight has multiple trips`
- `- User books a seat in one trip of a flight`
- Yellow: `* Handle multiple people trying to pick seats on the plane`
Change: new page; b_002815.jpg scrolled down (blank lines below), no new content.

## S25 - 00:28:30-00:29:15 - Schema of the check-in system (b_002830.jpg, b_002845.jpg, b_002915.jpg)
Topic: tables for the demo (a separate prepared page, narrower, on black background).
Diagram (D-04), five tables with pink table names:
- `airlines`: `id` | `name` - `1 AIRINDIA`, `2 INDIGO` (the G is drawn open and looks like `INDIKO`), `3 GOAIR`
- `flights`: `id` | `airline_id` | `name` - `1 1 AIRINDIA 101`, `2 1 AIRINDIA 279`, `3 2 INDIGO 6E101` (written like `INDIKO 6E101`)
- `trips`: `id` | `flight_id` | `fly_time` - `1 1 08/04/2022 10:00`, `2 1 09/04/2022 10:00`, `3 2 08/04/2022 9:00`, `4 3 09/04/2022 12:00`, `5 3 08/04/2022 07:00`
- `users`: `id` | `name` - ids 1-5 with five example first names (sample data)
- `seats`: `id` | `name` | `trip_id` | `user_id` - `1 1A 1 1`, `2 1B 1 3`, `3 1C 1 2`, `4 1D 1 5`, `5 1E 1 4`
Emphasis: 00:28:30 red loops around the flights `id` column and the `airline_id` column (foreign key to airlines); 00:28:45 red loop around trip 1's `fly_time` `08/04/2022 10:00` with a red arrow pointing at it.
Change: new page.

## S26 - 00:29:24-00:30:15 - High level architecture and locking demonstration (b_002924.jpg, b_002930.jpg, b_002945.jpg, b_003000.jpg, b_003009.jpg, b_003015.jpg)
Topic: architecture of the check-in system; the locking problem; similar systems.
Text and diagram (D-05):
- Heading (yellow): `High level Arch`
- Three stick-figure users on the left, each with a yellow line to a white-outlined rectangle `check-in`; above it `Drives end-user facing` / `checkins` with a small arrow down to the box.
- A line from `check-in` to a cylinder labelled `MySQL` on the right.
- A pink rectangle `Admin Svc` below, a pink line up to `MySQL`, a pink stick figure (admin) below `Admin Svc` joined by a short line; to its right, with an arrow pointing at `Admin Svc`: `Admin adds new` / `flights & trips &` / `keeps the states updates` (the last two words read like "states updates"; probably meant "status updated").
- Yellow heading: `locking Demonstration`
- `How will we handle when all 120 people flying in` / `one flight in the same trip check-in at the same time!`
- `Similar Systems` (yellow) `Fixed inventory + contention` (pink)
- `Cowin , IRCTC , BookMyShow , Flash Sale`
Emphasis at 00:30:00: red underline under `flights &` and under `trips` in the Admin Svc note.
Change: new section of the schema page. b_002945.jpg is a scroll-back to the `trips` / `users` / `seats` tables of D-04 (no new content).

## S27 - 00:30:30 (b_003030.jpg)
Screen share switched to the teacher's desktop (no board content).

## S28 - 00:30:33 (b_003033.jpg)
Gallery view, not kept for publication.

## S29 - 00:30:45-00:31:15 - Seats table in a DB client (b_003115.jpg)
Topic: the demo database.
Screen: Beekeeper Studio connected to a MySQL database `tbs`; entities `schema_migrations`, `seats`, `trips`, `users`. The `seats` table has columns `ID` (int), `NAME` (varchar), `TRIP_ID` (int), `USER_ID` (int); rows `1-A`, `1-B`, `1-C`, `1-D`, `1-E`, `1-F`, `2-A` ... `3-E` with `TRIP_ID` 1 and assorted user ids; footer shows `~120` rows.
Change: screen share.

## S30 - 00:31:24 (b_003124.jpg)
Desktop again (no board content).

## S31 - 00:31:30-00:33:33 - Approach 0 code (b_003230.jpg, b_003315.jpg, b_003324.jpg, b_003327.jpg, b_003330.jpg, b_003333.jpg)
Topic: the demo repository and the single-user booking program.
Screen: VS Code, repo `RETICKET`, folders `airline`, `approach0` ... `approach5`, `io`, `migrations`, `prepare`, each approach with `expl.md` and `main.go`. `approach0/main.go`:
- Header comments: `// books the given seat for the given user` / `// last one  wins`
- imports `os`, `strconv`, the repo's `airline-checkin-system/airline` and `.../io` packages, `go-sql-driver/mysql`, `logrus`
- `main`: `// Simulating airline check-in of the user whose` / `// ID is passed as a command line argument.`; `userID, err := strconv.Atoi(os.Args[1])`; `user := airline.GetUser(userID)`; `log.Debug("Hello, ", user.Name, " which seat do you want to book?")`; `seat := airline.GetSeat(io.ReadInt())`; `err = book(user, seat)`; on error `log.Errorf("%s could not book the seat", user.Name)`.
Change: screen share of code; dense frames are scrolls within the same file.

## S32 - 00:34:30-00:35:15 - Approach 0 run (extra frames b_003430.jpg, b_003515.jpg)
Topic: running approach 0.
Screen: `book()` body in approach0 shows `log.Debug("transaction got the seat")`, `io.Wait()`, then `txn.Exec("UPDATE seats set user_id = ? where id = ?", user.ID, seat.ID)`. Terminal: `INFO[0004] press enter to continue...` (twice), then `INFO[0006] <user> booked the seat 1-C`, followed by a seat map printed as 6 rows of 20 dots in two blocks of three rows, with one `x` (booked seat) at the start of the third row.
Change: extra frames pulled because the kept frames skip from the main() listing to approach 1.

## S33 - 00:33:45-00:37:00 - Approach 1 code (b_003600.jpg, b_003615.jpg, b_003624.jpg, b_003627.jpg, b_003630.jpg, b_003645.jpg, b_003657.jpg)
Topic: book one seat at random.
Screen: `approach1/main.go`:
- `// books one seat at random for the given user` / `// overriding possible`
- `func book(user *airline.User) (*airline.Seat, error) {` ... `seats := airline.Seats()`; `log.Debugf("total available seats: %d", len(seats))`; `// selecting a seat at random`; `rand.Seed(time.Now().UnixMilli())`; `seat := seats[rand.Intn(len(seats))]`; `// booking the seat`; `txn, _ := io.DB.Begin()`; `_, err := txn.Exec("UPDATE seats set user_id = ? where id = ?", user.ID, seat.ID)`; `err = txn.Commit()`.
- Terminal still shows the approach-0 run output (one seat `x`).
Change: screen share.

## S34 - 00:37:15-00:39:57 - Approach 2: all users at once (b_003715.jpg, extra b_003740.jpg, b_003815.jpg, b_003830.jpg, b_003845.jpg, b_003900.jpg, b_003909.jpg, b_003915.jpg, b_003930.jpg, b_003945.jpg, b_003948.jpg, b_003954.jpg, b_003957.jpg)
Topic: many concurrent users booking random seats.
Screen: `approach2/main.go`: `// all users booking seats at random with no checks` / `// last one  wins`; imports `math/rand`, `sync`, `time`; `main` loops `for ix := range users {` `go func(user *airline.User) {` `seat, err := book(user)` ... `log.Infof("%s booked the seat %s", user.Name, seat.Name)` ... `wg.Done()`. `book()` same random pick + `UPDATE seats set user_id = ? where id = ?` + `txn.Commit()`. Terminal: `go run approach2/main.go`; output scrolls `DEBU[0000] <user> with id <n> trying to book the seat` lines, then `INFO[0000] <user> booked the seat 11-E`, `... 12-E`, `... 7-E`, `... 7-E`, `... 12-E` (two different users each "booked" 12-E and 7-E), and a seat map with scattered `x` marks and many dots (far fewer than 120 seats taken).
Change: screen share; frames in between only differ by the participant column.

## S35 - 00:40:00-00:41:30 - Approach 3: first available seat (b_004015.jpg, b_004030.jpg, b_004115.jpg, b_004130.jpg)
Topic: pick the first free seat.
Screen: `approach3/main.go`: `// finding first available seat and booking it` / `// last one  wins`; imports `sync` etc.; `main` with `var wg sync.WaitGroup`, `wg.Add(len(users))`, `for ix := range users { go func(user *airline.User) {` `seat, err := book(user)` ... `log.Errorf("We could not assign the seat %s to %s", seat.Name, user.Name)`. `book()`: `// selecting the first available seat`; `row := txn.QueryRow(`SELECT id, name, trip_id, user_id from seats` / `where trip_id = 1 and user_id IS null` / `ORDER BY id LIMIT 1`)`. Terminal still shows the approach-2 output until 00:41.
Change: screen share.

## S36 - 00:41:45-00:45:45 (b_004300.jpg, b_004309.jpg, b_004312.jpg, b_004315.jpg, b_004318.jpg, b_004500.jpg, b_004545.jpg, b_004600.jpg)
Same approach-3 `book()` query on screen, terminal `go run approach3/main.go` typed but not yet run; `ORDER BY id LIMIT 1` line selected at 00:45. Frames differ only by the participant column. No new content.

## S37 - 00:46:15 - Approach 3 result (b_004615.jpg)
Terminal output: `INFO[0000] <user> was assigned the seat 1-C` repeated for every user shown (five lines visible, all `1-C`), and the seat map shows only three `x` marks (first seat of rows 1-3); all other seats are dots.
Change: program run.

## S38 - 00:46:30-00:49:30 - Approach 3 re-runs (b_004630.jpg, b_004830.jpg, b_004900.jpg, b_004930.jpg)
b_004630.jpg: another run - every visible line `was assigned the seat 1-C`, four `x` marks in the map (first seat of rows 1, 2, 3 and 4). b_004830.jpg: a later run - every visible line `INFO[0001] <user> was assigned the seat 1-B`, three `x` marks. 00:49:00-00:49:30: cursor on `where trip_id = 1 and user_id IS null` / `ORDER BY id LIMIT 1`. Same code; the result shows almost all users "assigned" the same seat and only a handful of seats actually filled.

## S39 - 00:49:45-00:53:45 - Approach 4 code: FOR UPDATE (b_004945.jpg, b_004957.jpg, b_005045.jpg, b_005115.jpg, b_005127.jpg, b_005130.jpg, b_005200.jpg, b_005212.jpg, b_005215.jpg, b_005230.jpg, b_005245.jpg, b_005300.jpg, b_005303.jpg, b_005315.jpg, b_005330.jpg)
Topic: pessimistic locking with FOR UPDATE.
Screen: `approach4/main.go` `book()`: `// selecting the first available seat` / `// and exclusively locking it`; `row := txn.QueryRow(`SELECT id, name, trip_id, user_id from seats` / `where trip_id = 1 and user_id IS null` / `ORDER BY id LIMIT 1 FOR UPDATE`)`. Terminal: approach-3 output (00:49), then `go run approach4/main.go` typed and waiting (00:50:45 onward) while the teacher explains. Frames differ only by selection highlight and the participant column.

## S40 - 00:53:45-01:00:00 (b_005430.jpg, b_005445.jpg, b_010000.jpg)
Same approach-4 code and un-run command (Q&A on the query while it waits). b_010000.jpg: cursor on `where trip_id = 1 and user_id IS null`. No new content.

## S41 - 01:00:15-01:04:30 - Approach 4 result (b_010015.jpg, b_010027.jpg, b_010030.jpg, b_010039.jpg, b_010042.jpg, b_010045.jpg, b_010315.jpg, b_010345.jpg, b_010400.jpg, b_010403.jpg, b_010430.jpg)
Terminal output: `DEBU[0000] simulating 120 users`, then each user `was assigned the seat` in order `1-A`, `1-B`, `1-C`, `1-D`, `1-E`, `1-F`, `2-A` ... up to `20-C`, `20-D`, `20-E`, `20-F`; the seat map is all `x` (6 rows x 20, all 120 seats filled). Timings of successive runs: `INFO[0001] took 1.2469734s`, `took 1.7339124s`, `took 1.7906213s`. b_010315.jpg-b_010430.jpg scroll through the assignment log (seats `5-C` ... `7-F` in order).
Change: program run (several runs).

## S42 - 01:04:45-01:05:15 (b_010500.jpg, b_010503.jpg, b_010515.jpg)
Approach-4 `FOR UPDATE` query with the cursor on `if row.Err() != nil {`; terminal shows the ordered assignment log. No new content.

## S43 - 01:05:30-01:11:15 - Approach 5: SKIP LOCKED (b_010530.jpg, b_010542.jpg, b_010600.jpg, b_010603.jpg, b_011045.jpg, b_011115.jpg)
Topic: skip locked rows.
Screen: `approach5/main.go` `book()`: `// selecting the first available seat`; `row := txn.QueryRow(`SELECT id, name, trip_id, user_id from seats` / `where trip_id = 1 and user_id IS null` / `ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED` / ``)`. Terminal: assignment log ending `... 20-A`, `20-B`, `20-C`, `20-D`, `20-E`, `20-F`; seat map all `x` (120/120); `INFO[0000] took 147.4798ms`.
Change: new file (approach 5) and run; frames after 01:06 differ only by the participant column (Q&A continues over this screen until 01:11).

## S44 - 01:11:30-01:13:00 (b_011300.jpg)
Same approach-5 SKIP LOCKED code and result during Q&A. No new content.

## S45 - 01:13:15-01:17:15 - Live edit: lock one specific seat (b_011500.jpg, b_011530.jpg, b_011715.jpg)
Topic: Q&A on locking a seat the user picked.
Screen: the approach-5 query edited live (unsaved) to `SELECT id, name, trip_id, user_id from seats` / `where trip_id = 1 and user_id IS null and id = 67` / `FOR UPDATE` (the `ORDER BY id LIMIT 1 ... SKIP LOCKED` line replaced).
Change: live code edit.

## S46 - 01:17:30-01:26:30 (b_012030.jpg, b_012130.jpg, b_012315.jpg, b_012330.jpg, b_012345.jpg, b_012400.jpg, b_012600.jpg, b_012615.jpg, b_012618.jpg, b_012624.jpg, b_012627.jpg)
Query restored to `where trip_id = 1 and user_id IS null` / `ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED` (file saved). 01:23:45 shows the rest of `book()`: `_, err := txn.Exec("UPDATE seats set user_id = ? where id = ?", user.ID, seat.ID)`, `err = txn.Commit()`, `return &seat, nil`; 01:24:00 shows `var seat airline.Seat` / `row.Scan(&seat.ID, &seat.Name, &seat.TripID, &seat.UserID)`. Q&A continues; frames differ only by cursor/scroll and the participant column. No new teaching content.

## S47 - 01:26:30 (b_012630.jpg)
Gallery view, not kept for publication.

## S48 - 01:26:45 (b_012645.jpg)
Blank (black) screen-share area, no board content.

## S49 - 01:26:48 (b_012648.jpg)
Gallery view, not kept for publication.

## S50 - 01:27:00-01:36:45 - Distributed KV store on a relational database (b_012730.jpg, b_012745.jpg, b_013300.jpg, b_013515.jpg, b_013545.jpg, b_013554.jpg, b_013557.jpg, b_013600.jpg, b_013615.jpg, b_013630.jpg, b_013633.jpg)
Topic: requirements of the second design problem (shown before and during the break, 01:26:52-01:33:31; b_013300.jpg has no participant column).
Text:
- Heading (yellow, centred): `Distributed KV store` / `on relational database`
- `Requirements:` / `- Infinitely Scalable` / `- GET, PUT, DEL, TTL`
- Pink box at right: `Apache Ignite`
- Yellow `Brainstorm :` then `Storage , optimize storage , Insert , Update, TTL` (`Update` written with the te-ligature, reads `Updak`; `TTL` cut off behind the tiles in most frames)
Change: new page; later frames scroll down to an empty area below the Brainstorm line.

## S51 - 01:36:45 - Store table started (b_013645.jpg)
Live writing below the Brainstorm line: `store` with a horizontal rule (start of table D-06).

## S52 - 01:37:00-01:41:18 - Schema: key and value types (b_013845.jpg, b_014100.jpg, b_014112.jpg, b_014115.jpg, b_014118.jpg)
Topic: column types of the store table.
Diagram (D-06, first form): table `store` with columns `key` | `value`. An arrow from the `key` column up to `PK ( varchra (16) )` [sic, "varchar(16)"; the closing parenthesis count is ambiguous, read as `PK (varchar(16))`]. An arrow from `value` to the right, to `(BLOB)` (added by 01:41).
Side sketch (yellow, top right, 01:41): `id → {` with a small circle and stacked lines and a curved arrow, then `}` (a JSON-like document with nested content; illustrates querying inside a value, per audio the MongoDB example).
Change: live drawing; b_014115.jpg / b_014118.jpg scrolled up to show `- GET, PUT, DEL, TTL` above.

## S53 - 01:41:30-01:42:18 - created_at and ttl_sec (b_014200.jpg, b_014215.jpg, b_014218.jpg)
Topic: student proposal for TTL columns.
Diagram D-06 rewritten: columns `key` | `value` | `created_at` (written `creakd-at`, te-ligature) | `ttl_sec` (added 01:42:15); the PK/BLOB annotations are gone. Top right edge: `Keyspe` [cut off; "Key specific"] with a small arrow below it.

## S54 - 01:42:30-01:43:15 - The bad delete query (b_014315.jpg)
Text (right side): `Delete store where` / `now() - create` [cut off] / `>` [cut off], enclosed in a blue dashed loop (laser/annotation emphasis, temporary).
Change: live writing (the student's proposed query: delete where now() - created_at >= ttl).

## S55 - 01:43:30-01:46:24 - expired_at and the background job (b_014545.jpg, b_014600.jpg, b_014615.jpg, b_014624.jpg)
Topic: store absolute expiry instead of created_at + ttl.
Diagram D-06: third column renamed `expired_at` (`created_at` / `ttl_sec` erased); a fourth, empty column added (right edge at x~670). A small `{` mark appears above the `expired_at` column at 01:46.
Text (right): `{` / `Delete store where` / `expired_at <= now` / `}`.
Change: live rewrite.

## S56 - 01:46:30-01:49:12 - Soft delete (b_014800.jpg, b_014830.jpg, b_014845.jpg, b_014848.jpg, b_014854.jpg, b_014857.jpg, b_014900.jpg, b_014909.jpg, b_014912.jpg)
Topic: delete as a soft delete, cleaned by a background job.
Text (right column, top to bottom):
- Yellow `BG Job` added above the `{ Delete store where expired_at <= now }` block
- `Soft delete` with, in yellow, `update str set` / `expired_at =` [cut off] ("str" = store)
- Yellow `BG Job` then `{` / `Delete store where` / `is_del = True` / `}`
Emphasis at 00:48:30 (01:48:30): red loops around the empty fourth column of D-06 (the column that would hold an `is_del` flag).
Diagram D-06: example row added in yellow at 01:49: `key` = `a`, `value` = `—` (01:49:12), `expired_at` = `-1` (01:49:00).
Change: live writing.

## S57 - 01:49:15-01:50:00 - Background job rewritten (b_014915.jpg, b_015000.jpg)
Text (left, below the table): `BG Job` / `{ Delete from store` / `where expired_at <= now();` / `}` (written out fully by 01:50:00). The right-hand `BG Job` / `is_del` block and the first `Delete store where` block are erased; `Soft delete` + `update str set expired_at =` remain.
Change: live rewrite (one job handles both expired and deleted keys).

## S58 - 01:50:15-01:52:00 - Delete and insert (b_015030.jpg, b_015045.jpg, b_015200.jpg)
Topic: delete = mark expired; insert.
Text (right):
- `Delete` / `↳ update store set exp_at = -1` / `where key = k` (the `= -1` is complete by 01:52)
- `Insert` / `↳ insert into store values` [last letters cut off] / `(k, v, e);` (added 01:51-01:52)
Diagram D-06: the empty fourth column removed (table back to `key` | `value` | `expired_at`).
Change: live writing; `Soft delete` text erased.

## S59 - 01:52:15-01:55:30 - Two puts on the same key (b_015215.jpg, b_015218.jpg, b_015245.jpg, b_015248.jpg, b_015345.jpg, b_015354.jpg, b_015357.jpg, b_015400.jpg, b_015415.jpg, b_015530.jpg)
Topic: PUT k, v1 then PUT k, v2 - insert conflicts.
Text (left, below the BG Job): `Put k, v1` / `Put k, v2` (written as subscripts: `Put k₁ v₁`, `Put k₁ v₂`).
Diagram D-06: the example row changed to `k₁` | `v₁` | (empty) at 01:53:45; by 01:55:30 `v₁` is overwritten with `v₂`, and an arrow from `key` up to `PK` is drawn (key is the primary key, so the second insert fails).
Also a small hooked arrow `↗` left of the insert statement (01:53:45).
Change: live writing.

## S60 - 01:55:39-01:57:45 - UPSERT (b_015539.jpg, b_015545.jpg, b_015615.jpg, b_015645.jpg, b_015700.jpg, b_015715.jpg, b_015730.jpg, b_015733.jpg, b_015800.jpg)
Topic: put = upsert.
Text (right):
- Yellow box: `UPSERT` (01:55:45; `UPS` at 01:55:39)
- The insert statement edited to `↳ upsert into store values` / `(k, v₂, e);` (01:56:15-01:56:45)
- `" Replace into "` (01:57:00) and `" ON Duplicate Key Update "` (01:57:15; full words visible in the zoomed-out view at 01:58:30, read `ON Duplical Key upd'` - truncated handwriting of "ON DUPLICATE KEY UPDATE")
Diagram D-06: row becomes `k₁` | `v₂` | `e` (01:56:45).
`Put k₁ v₁` / `Put k₁ v₂` grouped with a right brace `}` (01:58:00). Top right of page now reads `Keyspecific` with an arrow down to `TTL` in the Brainstorm line.
Change: live writing.

## S61 - 01:58:15-01:58:33 - Page overview (b_015815.jpg, b_015818.jpg, b_015830.jpg, b_015833.jpg)
Zoomed-out view of the whole KV-store page so far (D-06 and all queries). Emphasis: 01:58:15 red arc around `UPSERT`; 01:58:33 red loop around `Storage` in the Brainstorm line, the store table, the BG Job block and the two Puts (summary of what has been covered). No new content.

## S62 - 01:58:45-02:00:27 - GET (b_015900.jpg, b_015945.jpg, b_020000.jpg, b_020015.jpg, b_020027.jpg)
Topic: GET must hide expired keys.
Text (below Delete): `GET` / `Select * from store` / `where key = k, and` / `expired_at > now()` (the last line added 02:00:00 and double-underlined), with a right brace `}`.
Emphasis at 02:00:27: red loop around `upsert into store values`.
Change: live writing.

## S63 - 02:00:30-02:02:30 (b_020100.jpg, b_020115.jpg, b_020230.jpg)
b_020115.jpg: zoomed-out overview of the whole KV-store page with GET. b_020100.jpg / b_020230.jpg: zoomed back in. No new content.

