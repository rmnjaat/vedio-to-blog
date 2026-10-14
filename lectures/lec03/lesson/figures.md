# Lecture 06 (lec03): figure specs

This file is for the illustrator. Every figure on the page is listed here in reading order. Board redraws give the D-xx diagram from `lectures/lec03/board/diagrams.md` and the clearest frame in `lectures/lec03/board/frames_kept/` (look at it; never embed it). New figures say "new". Each entry lists parts, arrows, labels, marker colours, step text for step-throughs, the phone layout and the ledger ids it carries.

Totals: **38 drawn items** = 30 numbered figures (5 of them step-throughs) + 8 rule-box sketches (one per RuleBox, §1–§8). Clip posters are specified in `animations.md`. All 20 board diagrams (D-01..D-20) are redrawn; none is dropped. The screen-shared benchmark chart (01:50:42) is redrawn as a shape only (Fig 8·b).

---

## 0. The glyph kit (build these once, reuse everywhere)

Rules come from `learn/design/B-whiteboard-notebook/NOTES.md` and `site/FIGURES.md`: one 1.7 px graphite stroke (thin 1.1, heavy 3.2), round caps, bow ≤ 1.3, jitter ≈ 0.3, no hachure, shapes filled with `--fig-bg`, seeded per figure. Labels ≥ 12 px on screen; any figure wider than ~360 units gets a phone layout.

| Glyph | Drawing | Label |
|---|---|---|
| machine | laptop outline (screen + base), as on the board (D-01..D-04, D-08) | mono `m1`, `m2` above; mono `t = 1729` under |
| thread | two short wavy vertical lines inside the laptop screen (board's blue/purple squiggles), graphite | hand `t1`, `t2` |
| API server / service | `Box`, 3 px chamfer | mono `api`, `id server`, `photos svc` |
| fleet | `Fleet` (stacked offset copies) | hand `×n` |
| load balancer | `LoadBalancer` narrow bar (the board's unlabelled white bar is labelled mono `lb` here) | mono `lb` |
| database | `Cyl` | mono `mysql`, `orders db`, `ticket 1`, `photos db`, `tweets db` |
| logical shard | small rectangle with three dots inside a cylinder (D-19) | mono `insta5` |
| client / user | `Client` box (D-09, D-10) or `Actor` stick figure (D-15, D-18) | mono `client 1` |
| ID string | mono text on a short ruled baseline | `m1-1729`, `m1-t1-1729`, `m1-01` |
| bit-field bar | one long rectangle split into cells, cell widths proportional to bit counts (64 units = full width); field name under each cell in hand, bit count inside in mono; the **time** cell outlined `heavy` | used by Fig 4·c, 6·a, 6·c, 7·a, 7·d at the same scale |
| unused bit | 1-bit cell at the left, thin stroke, ink-3 fill, mono `0` | Fig 6·a, 6·c only |
| table block | ruled rectangle with a header row (mono column names) and up to 4 rows | `id | stub`, `service | counter` |
| counter cell | small square with a mono number; a struck-through old value beside it | `500 → 1000` |
| disk | `Disk` slab | mono `disk` |
| RAM | rounded rectangle with a chip notch | mono `ram` |
| B+ tree | three levels of small boxes, root → 2 internals → 4 leaves, leaves joined left→right by a thin line | — |
| clock | small circle with two hands | mono time (`23`) beside it |
| step numeral | `Num` on the time axis or arrow | matches step text 1:1 |

**Arrows.** Solid = synchronous request (an ID request, an insert). Dashed = async or periodic (a flush to disk every N, gossip). Heads on the initiator's direction only. Architecture views use orthogonal routing; diagonals only in time-sequence views.

**Marker colours.** Blue = request / data path (asking for an ID, the ID coming back, a query's seek path). Green = ack / success (a flush that reached disk, "unique" confirmed, the safe restart value). Red = failure, collision, crash, out-of-order ID, hard limit, an index spilled to disk. Graphite = everything else. The board's yellow / pink / orange / purple map to graphite; emphasis that meant "collision" or "crash" maps to red.

**Speech bubble:** at most one per chapter, only for the chapter's misconception: §2 none; §3 on the single ID server: "my clock never goes back" (a plain bubble; SN-02, right under the figure, corrects it in prose); §4 on the UUID bar: "I'm unique, what's the problem?"; §5 on the odd ticket server in Fig 5·d: "aren't we supposed to be in order?"; §6 none; §7 none; §8 on the offset query in Fig 8·a: "page 1,000 costs the same, right?".

**Accessibility:** every SVG has `<title>` = figure title and `<desc>` stating the mechanism in one or two sentences (drafted as "desc" below where the mechanism is not obvious).

---

## §1 Why build your own IDs

### Fig 1·a: Two masters, one ID space (D-11 redraw, extended)
- **Board:** D-11, frame `b_004557.jpg` (two unlabelled cylinders, 00:45:57).
- **Parts:** an `api` box (top centre); two `Cyl`s below, mono `master a` and `master b`; under each a short column of mono IDs `1 2 3 4` (the board's spoken example made visible).
- **Arrows:** `api` → each master, solid; hand label on the arrows `writes go anywhere`.
- **Labels:** between the two ID columns, the two `3`s joined by a thin bracket, hand `order 3 = two different orders`.
- **Colours:** both `3`s ringed red; the bracket red. Arrows graphite.
- **desc:** "Two database masters each auto-increment on their own, so both hand out 1, 2, 3, 4 and the IDs collide."
- **Mobile:** fits at 340 units (stack the two cylinders closer).
- **Ids:** L-0087 (also opening of §1, P1's picture).

### Rule-box sketch §1
A request box with a small mono `getid()` tag inside (ink), and to its right a dashed, greyed `id service` box with hand `later, if needed`. Ids: L-0010.

---

## §2 Building `getid()`

NotationKey (once, top of §2): machine, thread, api, lb, database, request (blue), ack (green), failure (red), async/periodic (dashed), bit-field bar with heavy time cell.

### Fig 2·a: One machine, one clock (D-01 redraw)
- **Board:** D-01, frame `b_000430.jpg`.
- **Parts:** one laptop glyph; beside it mono `get_id() → 1729`.
- **Labels:** hand under it: `fine on one machine, if never called twice in one ms`.
- **Colours:** graphite only.
- **Mobile:** small, fits.
- **Ids:** L-0011, L-0013.

### Fig 2·b: Collisions, and what was added to stop them (D-02 + D-03 redraw, two panels)
- **Board:** D-02, frame `b_000530.jpg` (also `b_000645.jpg`); D-03, frame `b_000945.jpg`.
- **Panel a "two machines":** laptops `m1`, `m2`; under each mono `t = 1729`. Row 1 (red): `1729   1729` with a red `=` between (collision). Row 2: `m1-1729   m2-1729` with the `m1-`/`m2-` prefixes underlined in ink and a green tick. Under the panel: mono `concat(machine_id, get_epoch_ms())`.
- **Panel b "threads inside a machine":** laptop `m1` with two thread squiggles `t1`, `t2`; laptop `m2` with `t1`, `t2`. Row 1 (red): `m1-1729  m1-1729` (two threads, same ms). Row 2: `m1-t1-1729 / m1-t2-1729 / m2-t1-1729 / m2-t2-1729` (the board's `m2-t3` slip corrected to `t2`), green tick. Under: mono `concat(machine_id, thread_id, get_epoch_ms())`.
- **Colours:** red for the colliding pair in each panel; green tick on the fixed row.
- **desc:** "Two machines calling in the same millisecond both return 1729; adding the machine ID separates them. Two threads on one machine collide again; adding the thread ID separates them."
- **Mobile:** panels stack.
- **Ids:** L-0014, L-0015, L-0016, L-0017, L-0019.

### Fig 2·c: From threads to a counter (D-04 redraw, StepThrough)
- **Board:** D-04, first form `b_001030.jpg`, final form `b_001430.jpg`.
- **Layout:** laptops `m1`, `m2` with thread squiggles across the top; a code line under them that changes per step; an ID column under each laptop.
- **Steps:**
  1. Code `concat(machine_id, thread_id, get_epoch_ms())`; IDs `m1-t1-1729 …`. *"Adding the thread ID works, but every new cause makes the ID longer."* (L-0021)
  2. Code `concat(machine_id, get_epoch_ms(), counter++)`; IDs `m1-1729-01`, `m1-1729-02`, `m1-1729-03`, then `m1-1730-01`. A small counter cell on `m1` ticks 1 → 2 → 3. *"One shared counter, incremented atomically on every call, separates any number of threads."* (L-0022, L-0023)
  3. `get_epoch_ms(),` struck through in red in the code line. *"The counter already increases on every call. The time part adds nothing."* (L-0027)
  4. Code `concat(machine_id, counter++)`; IDs `m1-01`, `m1-02`, `m1-03` / `m2-01`, `m2-02`, `m2-03` (board's `m3-03` corrected to `m2-03`), green tick. *"Shorter IDs: machine plus counter. Unique, as long as the counter never resets."* (L-0027, L-0029)
- **Colours:** red strike in step 3; green tick in step 4; counter cell graphite.
- **Mobile:** lane figure at 420 units; the two laptops sit side by side, IDs below.
- **Ids:** L-0021, L-0022, L-0023, L-0027, L-0029.

### Fig 2·d: Flush every 3, crash, restart safely (D-05 redraw, StepThrough; static twin of `l03-flush-crash`)
- **Board:** D-05, frame `b_002445.jpg`.
- **Layout:** two lanes, time running down. Left lane `memory` (the issued IDs `m1-01` … `m1-08`, one per row). Right lane `disk` (a counter cell). Dashed arrows from `m1-03` and `m1-06` to the disk lane, labelled hand `flush`.
- **Steps:**
  1. `m1-01`, `m1-02`, `m1-03` issued; dashed arrow `flush` from `03`; disk cell shows `03` with a green tick. *"Every third ID, the counter is written to disk."* (L-0042, L-0043, L-0044)
  2. `m1-04` … `m1-06`; flush; disk `03` struck, `06` with a green tick. *"After six IDs the disk holds 6."* (L-0044)
  3. `m1-07`, `m1-08` issued; a red ✕ across the memory lane, hand `crash`. Disk still `06`. *"Two more IDs, then the machine crashes. The disk says 6, but 8 was already handed out."* (L-0044)
  4. Ghost restart from `06`: `m1-07`, `m1-08` drawn in red, each beside its earlier twin. *"Restarting from 6 would hand out 7 and 8 a second time."* (L-0044)
  5. Real restart: hand `06 + 3 + 1 = 10`; `m1-10` with a green double underline; `m1-09` and `m1-08` shown greyed in a bracket labelled hand `never used: fine`. *"Start from the last flushed value plus the flush interval plus one. Two wasted numbers buy a correct system."* (L-0045, L-0046, L-0048)
- **Colours:** green ticks on flushes and on `m1-10`; red crash ✕ and red duplicate IDs in step 4.
- **Mobile:** 420-unit lane figure; fits.
- **Ids:** L-0042, L-0043, L-0044, L-0045, L-0046, L-0048.

### Fig 2·e: Six versions of `getid()` (new, summary ladder)
- **Layout:** a vertical ladder of six rungs. Each rung: left, the constraint in hand (`one machine`, `many machines`, `threads`, `shorter IDs`, `reboots`, `fewer disk writes`); right, the code line in mono (`epoch_ms`; `machine + epoch_ms`; `machine + thread + epoch_ms`; `machine + counter++`; `counter = load(); … save()`; `counter = load() + N; … if counter % N == 0: save()`).
- **Colours:** graphite; the part of each code line that changed from the rung above is underlined in ink (not coloured).
- **Mobile:** ladder is naturally vertical; fits at 340 units with the constraint above the code on each rung.
- **Ids:** L-0011, L-0015, L-0019, L-0027, L-0033, L-0043 (summary; the caption says "the whole chapter on one page").

### Rule-box sketch §2
Two ID strings `m1-1729` and `m2-1729`, the `m1`/`m2` prefixes underlined, with hand `add what caused the collision`. Ids: L-0016.

---

## §3 Order, and why clocks break it

### Fig 3·a: Which write came first? (D-06 redraw)
- **Board:** D-06, frame `b_002545.jpg`.
- **Parts:** mono `a = 10` at top; two thread squiggles below, `T1` with mono `a = 20`, `T2` with mono `a = 30`; hand question `which came first?`. Then a second row: `T1 → id 1`, `T2 → id 2`, hand `newer write wins: keep a = 30`.
- **Colours:** green tick on `a = 30`. The board's unexplained doodle is omitted.
- **Mobile:** fits.
- **Ids:** L-0052.

### Fig 3·b: Time first decides the order (D-07 redraw)
- **Board:** D-07, frame `b_002900.jpg`.
- **Parts:** a vertical list of eight-digit IDs `1729 0001`, `1729 0002`, `1730 0001`, `1730 0002`, `1730 0003`, `1731 0001`; the first four digits of each set in mono with a heavy underline (time), the last four normal (machine or counter). A left brace over the time digits, hand `decides the order`. Right annotations (hand): `most significant part`, `makes sorting simple`, `tie broken by the second half`.
- **Colours:** graphite (no colour for the time digits; the heavy underline carries it).
- **Mobile:** fits.
- **Ids:** L-0055, L-0056.

### Fig 3·c: A clock that runs fast, a clock that runs slow (new)
- **Layout:** a small chart. x-axis hand `true time`, y-axis hand `what the clock says`. A diagonal ink line `perfect clock`. Do not label lines "warm = fast, cold = slow": SN-01 says both temperature extremes slow a common crystal. Draw instead two lines labelled hand `clock A` (drifts ahead) and `clock B` (drifts behind), and small down-steps where a sync nudges them back toward the diagonal, labelled hand `sync`. A crystal glyph at the corner with hand `quartz: rate shifts with temperature`.
- **Colours:** the gap between `clock A` and the diagonal at one instant is bracketed red, hand `skew at the moment an ID is made`.
- **Mobile:** fits at 340 units.
- **Ids:** L-0065, L-0067 (with SN-01's wording in the caption), L-0068, L-0070.

### Fig 3·d: Four machines, four clocks (D-08 redraw, StepThrough; static twin of `l03-clock-skew`)
- **Board:** D-08, frame `b_003700.jpg` (also `b_003745.jpg`, `b_003812.jpg`).
- **Layout:** four laptops in a row labelled mono `2`, `4`, `7`, `9`; a small clock under each reading `23`, `24`, `23`, `23`. Below, a time axis running down with four request arrows (blue) in order.
- **Steps:**
  1. Request → machine 2 → ID `232`. *"First request: machine 2, clock 23. ID 232."*
  2. Request → machine 4 → `244`. *"Second: machine 4, whose clock reads 24. ID 244."*
  3. Request → machine 7 → `237`, ringed red with hand `smaller than 244`. *"Third: machine 7, clock 23. ID 237, smaller than the one before."*
  4. Request → machine 9 → `239`. Hand under the column: `not monotonically increasing`. *"The IDs come out 232, 244, 237, 239. Clock skew broke the order."*
- **Colours:** blue request arrows; red ring on `237` (and on the `24` clock as the cause, thin).
- **Mobile:** four laptops in a 2×2 grid above the lane; IDs in one column.
- **Ids:** L-0071, L-0072.

### Fig 3·e: One ID server (D-09 redraw)
- **Board:** D-09, frame `b_004100.jpg` (first `b_003930.jpg`).
- **Parts:** `Box` mono `id server` top centre with a small clock glyph inside; two `Client` boxes `client 1`, `client 2` below.
- **Arrows:** each client → id server (blue, solid), id server → client (blue return with a mono `id`).
- **Labels:** hand `same get_id(), one clock`. **Speech bubble** (§3's one) on the id server: `my clock never goes back`. The caption points to SN-02 directly below the figure.
- **Mobile:** fits.
- **Ids:** L-0074, L-0076, L-0077.

### Fig 3·f: Two ID servers must gossip (D-10 redraw)
- **Board:** D-10, frame `b_004130.jpg` (first form `b_004000.jpg`).
- **Parts:** two `Box`es mono `id server` side by side; an arc over their tops labelled hand `gossip: what's your last id?`; an `lb` bar below; `client 1`, `client 2` below the bar.
- **Arrows:** clients → lb → servers (blue); the gossip arc dashed, both heads (each initiates).
- **Labels:** hand `to fix the single point of failure: two servers`; hand `…which now must agree on every id`. The board's red scribble over the gossip becomes a red bracket on the arc with hand `slow, complex`.
- **Mobile:** fits at 340 units with servers closer.
- **Ids:** L-0079, L-0080.

### Rule-box sketch §3
Two small clocks reading `23` and `24`, under them two IDs `244` and `237` with a red ✕ between, and hand `relax what you don't need`. Ids: L-0081, L-0086.

---

## §4 How big should an ID be?

### Fig 4·a: An index is a smaller table (new)
- **Parts:** left, a table block `posts` with mono columns `post_id · user_id · title · body · …` and four rows. Right, a table block `idx_user_id` with columns `user_id · post_id`, the same four rows sorted by `user_id`. A thin arrow from the `post_id` column of the index back to the rows of `posts`, hand `points to the row`.
- **Labels:** under the index the `post_id` column is bracketed, hand `the ID is stored in every index entry`. Small inset: the same index with a 16-byte ID column drawn four times as wide, hand `1 GB → ~4 GB (vs 4-byte INT; ~2× vs 8-byte)`.
- **Speech bubble** (§4's one) on the wide inset column: `I'm unique, what's the problem?`
- **Colours:** the wide inset column outlined red.
- **Mobile:** tables stack; inset below.
- **Ids:** L-0133, L-0134, L-0135, L-0154.

### Fig 4·b: Where a query runs (new, two panels)
- **Panel a "indexes fit":** a `ram` box containing two small index blocks; a planner glyph (a small box mono `plan`) working inside RAM with blue arrows between the two indexes (`join on indexed columns`); one blue arrow at the end down to a `disk` slab, hand `last step: read the result rows`.
- **Panel b "indexes spilled":** the same, but one index block hangs half outside the RAM box onto the disk, outlined red; the planner's arrows now go to disk repeatedly (red dashed), hand `every lookup is a disk read`.
- **Labels:** caption carries SN-06's wording ("the hot part of the indexes").
- **Mobile:** panels stack.
- **Ids:** L-0136, L-0137, L-0138, L-0141.

### Fig 4·c: MongoDB's ObjectId (D-13 redraw)
- **Board:** D-13, frame `b_011100.jpg`.
- **Parts:** a byte bar (this one figure counts bytes, not bits: 12 equal cells grouped `4 | 5 | 3`), labels under cells: `time (seconds)`, `random`, `counter`; mono `4 B`, `5 B`, `3 B`. The time cell heavy. Hand beside: `12 bytes · time on the left`.
- **Inset row (for scale, the T1 comparison):** four thin bars on one axis: `INT 4 B`, `BIGINT / Snowflake 8 B`, `ObjectId 12 B`, `UUID 16 B`.
- **Mobile:** fits; inset bars stack.
- **Ids:** L-0146, L-0148, L-0149.

### Rule-box sketch §4
A `ram` box holding an index block; a second, larger index block spilling out onto a `disk` slab, outlined red. Ids: L-0136, L-0148.

---

## §5 Central services: Amazon and Flickr

### Fig 5·a: Ranges from one row (D-12 redraw, StepThrough)
- **Board:** D-12, frame `b_010812.jpg` (close-ups `b_005445.jpg`, `b_010245.jpg`).
- **Layout (desktop):** top right, the ID service: an outline box containing a `Cyl` mono `id db`, a `Fleet` mono `id api` (×4), and an `lb` bar. Top left, a table block `service | counter` with rows `orders`, `payments`. Bottom, two service boxes `orders` and `payments`, each with six small `server` boxes (`s1`…`s6`), a small range tag at the top-right of each server (the board's pink mark) that fills when the server holds a range.
- **Steps:**
  1. `orders s1` boots → blue call `get_id_batch(500)` → lb → api → `id db`. Counter cell `orders: 0` struck, `500`. Blue return `[0, 500)` to s1's tag. *"Orders server 1 boots and asks for 500 IDs. One update moves the counter to 500 and returns the range 0–500."* (L-0110, L-0111, L-0113)
  2. `orders s2` boots → `get_id_batch(500)`; counter `500` struck, `1000`; return `[500, 1000)`. *"Server 2 gets the next 500. Same row, one more update."* (L-0113, L-0118)
  3. `payments s1` → `get_id_batch(2000)`; the `payments` row `0` struck, `2000`; return `[0, 2000)`. *"Payments has its own row and its own counter, and asks for more."* (L-0113, L-0118)
  4. `orders s1`'s tag shows `490 / 500`; a new blue call; counter jumps (another server took 1000–3000 meanwhile, shown as ghost); return `[3000, 3500)`. *"Near the end of its range, server 1 asks again and gets whatever range is next."* (L-0119)
  5. A small lock glyph on the counter row and a mono line `SELECT … FOR UPDATE` beside it. *"Each hand-out is one locked read and one update in a transaction: two servers can't get the same range."* (L-0112)
- **Colours:** blue calls and returns; green tick on each returned range; graphite otherwise.
- **Mobile:** portrait layout: ID service on top, the counter table under it, then one service column (`orders` s1, s2; `payments` s1) as a list; steps unchanged.
- **Ids:** L-0105, L-0110, L-0111, L-0112, L-0113, L-0118, L-0119.

### Fig 5·b: Flickr's photo service with a ticket server (D-15 redraw)
- **Board:** D-15, frame `b_012657.jpg`.
- **Parts:** `Actor` (left) → two stacked `Box`es `photos svc s1`, `s2`; right, a `Cyl` mono `ticket server (mysql)`; below, a `Cyl` mono `photos db` drawn as three small cylinders side by side (sharded) with hand `sharded, multi-master`.
- **Arrows:** actor → s1/s2 (blue); s1 → ticket server (blue, hand `① get id`), ticket → s1 (blue return `id`), s1 → photos db (blue, `② store photo`).
- **Labels:** under the ticket server, red hand `one box: a single point of failure` (the board's blue warning line, red here because it names a failure).
- **Mobile:** fits at 340 units with the photos db below.
- **Ids:** L-0159, L-0174, L-0175.

### Fig 5·c: The ticket table (D-14 redraw)
- **Board:** D-14, frame `b_012115.jpg` (query form `b_012615.jpg`).
- **Parts:** a table block `tickets` with header `id | stub` and one row `74 | a`; an arrow to `a` from hand `a dummy value: just there to hit the unique key`. Beside: the schema in mono, as on the board (`id bigint unsigned not null auto_increment`, `stub char(1) not null default ''`, `primary key (id)`, `unique key (stub)`). Under the table, the row as it changes: `74` struck → `75` → `76` (green on `76`).
- **Mobile:** schema below the table.
- **Ids:** L-0162, L-0166, L-0172.

### Fig 5·d: Two ticket servers, odd and even (D-16 redraw)
- **Board:** D-16, frame `b_013130.jpg` (first `b_012630.jpg`).
- **Parts:** two `Cyl`s mono `ticket 1`, `ticket 2`; beside them mono `1 3 5 7` and `2 4 6 8`; an `lb` bar below with eight short request lines (blue) under it; hand `round robin`.
- **Labels:** under each cylinder, mono `auto_increment_increment = 2` / `auto_increment_offset = 1` (left) and `= 2` (right).
- **Speech bubble** (§5's one) on `ticket 1`: `aren't we supposed to be in order?` (answered in prose by L-0187).
- **Mobile:** settings text moves under the cylinders.
- **Ids:** L-0176, L-0177, L-0178.

### Rule-box sketch §5
A counter cell `500 → 1000` with a small lock glyph, and hand `any system with an atomic increment`. Ids: L-0304.

---

## §6 Snowflake: IDs without a service

### Fig 6·a: Snowflake's 64 bits (D-17 redraw)
- **Board:** D-17, frame `b_013730.jpg`.
- **Parts:** the kit bit-field bar at full width: a 1-bit unused cell `0`, then `41` (heavy, `time (ms since an epoch)`), `10` (`machine id`), `12` (`counter, per machine`). Under the bar, hand `time on the left · tie broken on the right`.
- **Labels:** under `10`: mono `2^10 = 1024 machines`; under `12`: mono `2^12 = 4096 ids per ms`.
- **Colours:** graphite; no colour on fields.
- **Mobile:** the bar keeps its proportions at 340 units; the two mono capacity labels go below in a list.
- **Ids:** L-0197, L-0199, L-0202, L-0203, L-0205.

### Fig 6·b: Snowflake inside the API servers, as taught (D-18 redraw)
- **Board:** D-18, frame `b_013915.jpg`.
- **Parts:** `Actor` (left) → three stacked `Box`es mono `api`, each with a small ink dot at its top-right (the function inside), hand on one dot `snowflake()`; right, three `Cyl`s mono `tweets db` (partitioned).
- **Arrows:** actor → api (blue); api → tweets db (blue), hand `id computed while storing the tweet`.
- **Caption:** "The design as taught. Twitter's own 2010 Snowflake ran as a separate service (see the note below)." This keeps the board and makes SN-13 visible.
- **Mobile:** fits.
- **Ids:** L-0200, L-0201.

### Fig 6·c: Decode a tweet ID (new)
- **Layout:** top, a mono placeholder ID (the page picks a real public tweet ID at build time and states it in the caption; no number is invented here). Middle, the kit bar from Fig 6·a with the ID's binary spread across it. Bottom, three outputs: `(id >> 22) + epoch → a date and time`, `(id >> 12) & 1023 → machine`, `id & 4095 → counter`.
- **Colours:** blue arrow from the time field to the date.
- **Mobile:** vertical stack.
- **Ids:** L-0214, L-0215.

### Fig 6·d: Where the 41 bits run out (new)
- **Layout:** two horizontal timelines on one year axis (1970 → 2090). Line 1 starts at 1970, ends at 2039 with a red ✕ and hand `41 bits used up`. Line 2 starts at 2015 (`discord`), ends around 2084. A bracket over 1970–2015 on line 1, hand `years a 2015 company would waste`. Mono on each line: `2^41 ms ≈ 69.7 years`.
- **Labels:** a small tick at 2023 on line 1, mono `1,676,784,716,000 ms ≈ 76% used`.
- **Mobile:** axis shortened to 1970 → 2090 with fewer tick labels.
- **Ids:** L-0237, L-0238, L-0252, L-0253.

### Rule-box sketch §6
An `api` box with a small dot inside and no arrow leaving it to any service, hand `just a function call`. Ids: L-0245.

---

## §7 Instagram: Snowflake inside the database

### Fig 7·a: Twitter's 64 bits and Instagram's 64 bits (D-20 drawn as a bar, under D-17)
- **Board:** D-20, frame `b_020345.jpg` (written as a list; the code page `b_021045.jpg`).
- **Parts:** two kit bars stacked: top `0 | 41 time | 10 machine | 12 counter` (Twitter), bottom `0 | 41 time since 2011 | 13 shard id | 10 sequence` (Instagram). Thin vertical guides show where the boundaries move.
- **Labels:** under Instagram's `13`: mono `2^13 = 8192 logical shards`; under its `10`: mono `1024 per ms per shard`.
- **Mobile:** both bars at 340 units; labels as a list below.
- **Ids:** L-0261, L-0262, L-0263, L-0264.

### Fig 7·b: Logical shards on a physical server (D-19 redraw)
- **Board:** D-19, frame `b_020900.jpg`.
- **Parts:** one large `Cyl` mono `physical server` holding five logical-shard glyphs mono `insta1`, `insta2`, `insta5`, `insta9`, `insta12`. Beside it hand: `1000s of logical shards → 10–15 physical servers`; mono `CREATE DATABASE insta5;` with hand `logical separation (a schema in Instagram's Postgres)`.
- **Mobile:** text below the cylinder.
- **Ids:** L-0267, L-0268.

### Fig 7·c: Moving a hot shard (new, two panels)
- **Panel a:** two physical-server cylinders; the left holds six shard glyphs, one outlined red with hand `hot`. The right is new and empty, hand `new server`.
- **Panel b:** the hot shard now in the right cylinder; a dashed arrow between the cylinders labelled hand `dump → load`; a green tick.
- **Labels:** hand under panel b: `no row-by-row picking: the shard moves whole`.
- **Mobile:** panels stack.
- **Ids:** L-0272, L-0274, L-0275.

### Fig 7·d: One insert, one ID (new, StepThrough)
- **Layout:** left, a mono `INSERT INTO insta5.photos (…) VALUES (…)` (no id); right, an empty kit bar (Instagram layout) that fills step by step; under it the running value of `result` in mono.
- **Steps:**
  1. The insert arrives with no `id`; the column default fires `insta5.next_id()` (blue arrow from the statement to the function). *"The insert gives no ID. The column's default calls next_id()."* (L-0278)
  2. `nextval('insta5.table_id_seq') % 1024` → `seq_id`. *"An atomic sequence gives the next number; % 1024 keeps 10 bits."* (L-0282)
  3. `(now_ms - epoch) << 23` fills the 41-bit time cell. *"Milliseconds since Instagram's epoch go into the top 41 bits."* (L-0283)
  4. `| (shard_id << 10)` fills the 13-bit cell with `5`. *"This database's shard number, hard-coded, goes in the middle."* (L-0284, L-0279)
  5. `| seq_id` fills the last cell. *"The sequence fills the last 10 bits."* (L-0284)
  6. The row lands in a small table block with the new `id`, green tick. *"The database stored the row with a Snowflake-style ID. The API server never touched it."* (L-0285, L-0287)
- **Colours:** blue for the call; green tick at the end.
- **Mobile:** 420-unit lane figure; bar above, code below.
- **Ids:** L-0278, L-0279, L-0282, L-0283, L-0284, L-0285, L-0287.

### Rule-box sketch §7
An `INSERT` arrow (blue) into a `Cyl`; on the cylinder a small mono tag `id default next_id()`. Ids: L-0287.

---

## §8 Pagination: the side effect

### Fig 8·a: Skip vs seek (new, two panels)
- **Panel a "LIMIT 10 OFFSET 9990":** a long column of row cells (drawn as a compressed strip with a break mark), a blue arrow running past 9,990 cells (hand `computed, then thrown away`), the last 10 cells ringed. **Speech bubble** (§8's one) on the query: `page 1,000 costs the same, right?`
- **Panel b "WHERE id > 9990 LIMIT 10":** a B+ tree glyph; a blue path root → internal → leaf, then a short blue arrow along the leaves covering 10 cells, hand `log n down, then 10 across`.
- **Colours:** panel a's long arrow red at its far end (the cost); panel b blue, green tick.
- **Mobile:** panels stack.
- **Ids:** L-0224, L-0228, L-0233.

### Fig 8·b: Skip-limit vs ID-limit, the benchmark's shape (redraw of the screen-shared chart, shape only)
- **Source:** screen share 01:50:42–01:53:15, frames `b_015100.jpg`, `b_015130.jpg` (the instructor's blog post; link it in the caption; do not embed the screenshot).
- **Parts:** x-axis hand `records paged through`; y-axis hand `response time`. One rising line mono `skip + limit` and one flat line mono `_id + limit`. A small shaded region near the origin, hand `about the same up to ~500–600`. Two annotations on the rising line: a spike, hand `disk throttling during a flush`; a later spike near the right, hand `other processes on the same laptop`.
- **Colours:** rising line red, flat line green (meaning: cost grows / stays flat). No numbers on the y-axis.
- **Mobile:** fits.
- **Ids:** L-0230, L-0231, L-0305.

### Rule-box sketch §8
A small B+ tree with one blue path to a leaf and a short blue arrow along the leaves, hand `know how your data sits on disk`. Ids: L-0249.

---

## §9 What to keep

### Fig 9·a: Where the ID is born (new, navigation map)
- **Layout:** one horizontal axis (vertical on phones) with four stops: `in your function` → `a central service` → `inside the database` → `a library on every server`. Under each stop, the schemes placed there as small tags linking to their sections: function: `getid() v1–v6 (§2)`, `time-first (§3)`; service: `one id server (§3)`, `amazon ranges (§5)`; database: `auto-increment (§1)`, `flickr tickets (§5)`, `instagram next_id() (§7)`; library: `snowflake (§6)`, `discord (§6)`, `mongodb objectid (§4)`, `uuid (§4)`.
- **Labels:** above the axis, hand arrows `more coordination ←→ less coordination` (graphite).
- **Mobile:** vertical; tags wrap.
- **Ids:** (summary; no new ids) L-0010, L-0287 as the two ends the lecture argued about.

---

## Board diagrams → figures (checklist)
| Board | Figure |
|---|---|
| D-01 | Fig 2·a |
| D-02, D-03 | Fig 2·b |
| D-04 | Fig 2·c |
| D-05 | Fig 2·d (+ clip `l03-flush-crash`) |
| D-06 | Fig 3·a |
| D-07 | Fig 3·b |
| D-08 | Fig 3·d (+ clip `l03-clock-skew`) |
| D-09 | Fig 3·e |
| D-10 | Fig 3·f |
| D-11 | Fig 1·a |
| D-12 | Fig 5·a |
| D-13 | Fig 4·c |
| D-14 | Fig 5·c |
| D-15 | Fig 5·b |
| D-16 | Fig 5·d (+ clip `l03-odd-even`) |
| D-17 | Fig 6·a, top bar of Fig 7·a |
| D-18 | Fig 6·b |
| D-19 | Fig 7·b |
| D-20 | Fig 7·a (bottom bar), Fig 7·d |
| screen share 01:50 | Fig 8·b (shape only) |
