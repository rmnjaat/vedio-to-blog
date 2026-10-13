# Lecture 05 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it is first drawn or shown. Colour notes: white = default ink; yellow = headings, key labels and the "first" party (Transaction 1 lines, Master 1 links); pink = the "second" party / warnings (Transaction 2 links in D-10, admin service); green = allowed/read lines. Shapes: rectangle = server/service, cylinder = database, stick figure = user/client, circle = transaction. Temporary strokes (red highlighter loops, blue dashed annotation loop) are listed only as emphasis. Code shown by screen share (Go demo, terminal) is not a diagram and is described in board_log.md S29-S46.

## D-01 - Transactional deadlock (00:07:30-00:14:30)
Frame: b_001430.jpg
- Left: a yellow circle `T1`.
- Top middle: rectangle `Row 1`; bottom middle: rectangle `Row 2`.
- Pink arrow `T1` → `Row 1` (T1 holds / requests Row 1); pink arrow `Row 2` → `T1`.
- A pink arrow leaves `Row 1` to the right and one enters `Row 2` from the right; the node they connect to (transaction T2 per the audio) is hidden behind the participant tiles in every frame. Intended form: a cycle T1 → Row 1 → T2 → Row 2 → T1.
- Caption above: purple `Risk: Transactional Deadlock !!`; below: `The transaction that detects the deadlock kills itself !` (`kills itself` pink).

## D-02 - Shared locks on overlapping rows (FOR SHARE) (00:15:00-00:19:15)
Frame: b_001615.jpg (also b_001900.jpg)
- Left: a table with header `id` | `user_id` | `....`; six rows, numbered `1`-`6`.
- Right, top: yellow `Transaction 1` + purple `READ & MODIFY`; query `SELECT ....` / `WHERE user_id IN (1,2,6)` / pink `FOR SHARE;`. Pink lines run from rows 1, 2 and 6 of the table to this query.
- Right, bottom: yellow `Transaction 2` + purple `READ & WAIT`; query `SELECT ....` / `WHERE user_id IN (3,4,6)` / green `FOR SHARE`. Green lines run from rows 3, 4 and 6 to this query.
- Row 6 has both a pink and a green line (the contested row). A white hand-added line under Transaction 2: `→ Updt __ set dest = "a";` (T2 attempting an update).

## D-03 - Exclusive locks on overlapping rows (FOR UPDATE) (00:19:45-00:25:57)
Frame: b_002130.jpg (also b_002245.jpg for the emphasis)
- Same table and connector layout as D-02.
- Transaction 1 (`READ & MODIFY`): `WHERE user_id IN (1,2,6)` / pink `FOR UPDATE ;`.
- Transaction 2 (purple `WAIT`): `WHERE user_id IN (3,4,6)` / green `FOR UPDATE ;`.
- Emphasis (00:22:45): red brackets around both queries and red dashes under `(1,2,6)` and `(3,4,6)`, showing the overlap on row 6 that makes T2 wait.

## D-04 - Airline check-in schema (00:28:30-00:29:15)
Frame: b_002845.jpg (also b_002830.jpg, b_002945.jpg)
Five tables, names in pink, each with sample rows:
- `airlines` (`id`, `name`): `1 AIRINDIA`, `2 INDIGO`, `3 GOAIR`.
- `flights` (`id`, `airline_id`, `name`): `1 1 AIRINDIA 101`, `2 1 AIRINDIA 279`, `3 2 INDIGO 6E101`.
- `trips` (`id`, `flight_id`, `fly_time`): `1 1 08/04/2022 10:00`, `2 1 09/04/2022 10:00`, `3 2 08/04/2022 9:00`, `4 3 09/04/2022 12:00`, `5 3 08/04/2022 07:00`.
- `users` (`id`, `name`): five sample users (names not reproduced; use placeholders).
- `seats` (`id`, `name`, `trip_id`, `user_id`): `1 1A 1 1`, `2 1B 1 3`, `3 1C 1 2`, `4 1D 1 5`, `5 1E 1 4`.
- Relations implied by the id columns: flights.airline_id → airlines.id; trips.flight_id → flights.id; seats.trip_id → trips.id; seats.user_id → users.id (no arrows drawn).
- Emphasis: 00:28:30 red loops on flights `id` and `airline_id`; 00:28:45 red loop and arrow on a trip's `fly_time`.

## D-05 - Airline check-in high-level architecture (00:29:24-00:30:15)
Frame: b_003000.jpg (also b_002924.jpg)
- Left: three stick-figure users, each with a yellow line to one white rectangle `check-in` (note above: `Drives end-user facing` / `checkins`).
- `check-in` → line → cylinder `MySQL` (right).
- Below: pink rectangle `Admin Svc` with a pink line up to `MySQL`; a pink stick figure (admin) below it. Note with arrow: `Admin adds new` / `flights & trips &` / `keeps the states updates`.
- Under the diagram: `locking Demonstration` / `How will we handle when all 120 people flying in one flight in the same trip check-in at the same time!` and `Similar Systems` `Fixed inventory + contention` / `Cowin , IRCTC , BookMyShow , Flash Sale`.

## D-06 - KV store table, built live (01:36:45-01:58:33)
Frames: b_015830.jpg (final, zoomed out), b_014100.jpg (types), b_014545.jpg (expired_at), b_014900.jpg (delete row)
- Title `store` above a hand-ruled table. Final columns: `key` | `value` | `expired_at` (plus one empty column on the right during 01:43-01:50).
- An arrow from `key` up to `PK`. At 01:38-01:41 the arrows read `PK ( varchra (16) )` [sic] for key and `(BLOB)` for value.
- Evolution: `key` | `value` → `key` | `value` | `created_at` | `ttl_sec` (01:42) → `key` | `value` | `expired_at` | (empty, circled red at 01:48 as an `is_del` column) → back to three columns.
- Example rows over time: `a` | `—` | `-1` (deleted key, 01:49); `k₁` | `v₁` | (blank) (01:53:45); `k₁` | `v₂` | `e` (after upsert, 01:56:45).
- Queries written around it (final): `BG Job { Delete from store where expired_at <= now(); }`; `Delete ↳ update store set exp_at = -1 where key = k`; `Insert ↳ upsert into store values (k, v₂, e);` with yellow box `UPSERT`, `" Replace into "`, `" ON Duplicate Key Update "`; `Put k₁ v₁` / `Put k₁ v₂` }; `GET Select * from store where key = k, and expired_at > now()`.
- Side sketch (01:41, yellow): `id → { ... }` with a circle and stacked lines (a JSON document value).

## D-07 - TTL by batch deletion with a CRON job (02:06:30-02:11:00)
Frame: b_020700.jpg (also b_020630.jpg)
- A yellow horizontal timeline with six evenly spaced ticks. A brace under the interval between ticks 2 and 3 labelled `t minutes`; an arrow up to tick 4 labelled `Hard delete` (the job fires every t minutes).
- Below: stick-figure user — line — rectangle `KV Store` — line — cylinder `MySQL`; beside it the filtering read `select * from store where key = k and ttl > now();`.

## D-08 - KV store high-level architecture (single MySQL) (02:27:45-02:29:03)
Frame: b_022730.jpg (also b_024200.jpg)
- Left: stick-figure user — line — tall vertical rectangle with the letters `L O A D B` written top to bottom (load balancer).
- Three lines fan out from the LB to three stacked rectangles `KV - API`.
- Each `KV - API` has a line to one cylinder `MySQL` (right).
- Below `MySQL`: a vertical line down to a yellow rectangle `Batch Cleanup` with a circular arrow on its right (runs periodically).
- Caption: yellow `* We add as many KV API servers to support the load` ↓ pink `assuming MySQL is handling the incoming load`.

## D-09 - KV store with read replicas (02:29:15-02:31:00)
Frame: b_023030.jpg (also b_024045.jpg)
- Same left part as D-08 (user, `L O A D B`, three `KV - API`).
- The three `KV - API` lines go to a cylinder `Master`; `Master` has lines to two cylinders labelled `Replica` (upper right and right).
- A yellow dotted arc from the top `KV - API` to the upper `Replica` (reads served by a replica).
- `Master` ↓ yellow `Batch Cleanup` with circular arrow.
- Caption above: `If we have a 99:1 read requests and one DB is not able to handle it,` pink `we add read replicas`.

## D-10 - KV store partitioned by key range (02:30:54-02:44:00)
Frame: b_023600.jpg (also b_023430.jpg, b_023057.jpg)
- Left part as D-08 (user, `L O A D B`, three `KV - API`).
- Two cylinders on the right: `Master 1` labelled `[a-m]` (upper) and `Master 2` labelled `[n-z]` (lower).
- Every `KV - API` connects to both masters: yellow lines to `Master 1`, pink lines to `Master 2` (lines cross in the middle).
- Each master has a line to its own `Replica` cylinder on the right.
- Each master has its own yellow `Batch Cleanup` box with a circular arrow (above Master 1, below Master 2).
- Caption: pink `Each Master node owns an` `exclusive` (grey highlight) `fragment of the data`.
- Emphasis (02:43:30): red loop on the top `KV - API`.
