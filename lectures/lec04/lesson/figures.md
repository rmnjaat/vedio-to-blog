# Lecture 04: figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `lectures/lec04/board/diagrams.md` and the clearest frame in `lectures/lec04/board/frames_kept/` (look at it; never embed it). New figures say "new". Each entry lists parts, arrows, labels, marker colours, the step text for step-throughs, the mobile layout and the ledger ids it carries.

Totals: **41 drawn items** = 35 numbered figures (3 of them step-throughs) + 6 rule-box sketches (one per RuleBox, §1–§6). Clip posters are specified in `animations.md`. All 15 board diagrams (D-01..D-15) are redrawn, plus four board pages that are text-only on the board (S35/S38 auto-delete, S57 failure detection, S64 six components, S85 fun exercise) turned into figures. None is dropped.

---

## 0. The glyph kit

Use the shared kit (`site/src/figures/kit/`, rules in `site/FIGURES.md`, glyph table in `lectures/lec01/lesson/figures.md` §0): one 1.7 px graphite stroke, bow ≤ 1.3 px, jitter ≈ 0.3 px, no hachure, shapes filled with `--fig-bg`, one seed per part. Lecture 4 reuses: stick figure (user), `Box` (api, server, worker), `LoadBalancer`, `Cyl` (db), `Cube` (redis), `Pipe`, `Cloud` (cdn), `Disk`, `Num`, `Bracket`, `Bubble`, `Cross`.

New glyphs for this lecture (add to `figures/glyphs.tsx` and the NotationKey):

| Glyph | Drawing | Label |
|---|---|---|
| status dot, online | filled green dot, 9 px | none; hand `online` the first time |
| status dot, offline | hollow graphite ring, 9 px (not grey fill: it must read in Blackboard mode) | hand `offline` the first time |
| heartbeat pulse | small filled blue dot on the user→api line; a row of them = periodic pulses | hand `heartbeat` the first time |
| TTL timer | a small clock face (circle + one hand) beside a key or row; red when it runs out | mono `ttl 30s` |
| table block | ruled rectangle with a header row (the board's pink table rules become graphite) | mono table name above it, e.g. `pulse` |
| connection | a thin straight line between server and db; a **pool** is 3 parallel thin lines; a line in use is blue | hand `connection` the first time |
| trash can | small lidded bin, single stroke | none |

**Arrows, colours, speech bubbles, accessibility** as in Lecture 2's kit: solid = synchronous, dashed = async (the store's own expiry, a background job), heads on the initiator's side only. Blue = request/data path (heartbeats, reads), green = ack/success and the online dot, red = failure, stale, hard limit, graphite = everything else. At most one speech bubble per chapter, only for that chapter's misconception (§2: the server, "can't I just ask?"; §4: the pool, "I'm not a service"; §6: the cache cylinder, "I'm not just RAM"). Every SVG gets `<title>` and `<desc>`.

**Mobile:** figures with more than 7 glyphs or more than 2 panels get a portrait layout below 760 px (`<Desk>` / `<Phone>`); each entry says how.

---

## §1 How to approach a design

### Fig 1·a: Two ways to build (D-02 redraw)
- **Board:** D-02, frame `b_001745.jpg` (spiral and list together in `b_001800.jpg`).
- **Panel a "Spiral":** a single-stroke spiral, graphite, with a cylinder at its centre labelled mono `core`. Three small boxes sit on the spiral's outer turns, labelled mono `api`, `lb`, `…`. Hand note: `decide the core & build around it`. Under the panel: hand `core is use-case specific: database, communication`.
- **Panel b "Incremental":** a numbered list as the board writes it, `1 day-zero architecture` · `2 see how each component behaves` (sub-lines `under load`, `at scale`) · `3 identify the bottleneck` · `4 re-architect` · `5 repeat`, with a hand-drawn loop arrow from 5 back up to 2 (graphite, the board's yellow loop). A tiny day-zero sketch beside item 1: user → lb → api → db.
- **Colours:** graphite only (no request path is being shown).
- **Ids:** L-0023, L-0024, L-0025 (labels), L-0026, L-0027 (caption: "spiral when you've built it before; incremental when you're unsure").
- **Mobile:** panels stack.

### RuleBox sketch §1: the property first (new)
- A cylinder with hand `not yet decided` under it; above it, mono `access: key-value` written first, with a hand `?` over the cylinder. Ids: L-0029, L-0035.

---

## §2 Green dots

### Fig 2·a: What the user sees (D-01 redraw)
- **Board:** D-01, frame `b_002245.jpg` (also `b_001500.jpg`).
- **Parts:** a narrow card (a friends list), four rows: mono `user 1` green dot · `user 4` green dot · `user 5` offline ring · `user 3` offline ring (the board's order).
- **Labels:** hand `online` with a leader to the first green dot, `offline` to the first ring. The board's pink "day 1, no scaling" note becomes the caption: "Day one: no focus on scale yet."
- **Ids:** L-0021.

### Fig 2·b: Storage first, database later (D-03 redraw)
- **Board:** D-03, frame `b_002230.jpg`.
- **Parts:** mono `user → online/offline`; two short arrows down to mono `int` and `bool`. Right: a cylinder labelled hand `not yet decided`. Below: mono `access: key-value` and three small mono lines `get(ids…)` · `get(id)` · `set(id)`.
- **Ids:** L-0034, L-0035.

### Fig 2·c: Four calls or one (D-04 redraw + new panel)
- **Board:** D-04, frame `b_002415.jpg`.
- **Panel a:** user (with a small phone rectangle) → `api` → `db`. Four blue arrows user→api labelled mono `GET /status/u1` … `u4`. Hand note in red: `4 calls for 4 dots`.
- **Panel b:** the same three glyphs, one blue arrow labelled mono `GET /status/users?ids=u1,u2,u3,u4`; a hand brace under the ids: `the users on screen` (the board's "need to be fixed" wording is not reused). Green return arrow labelled mono `{u1: on, u2: on, …}`.
- **Ids:** L-0036, L-0037, L-0038, L-0039.
- **Mobile:** panels stack.

### Fig 2·d: Users push, the server can't pull (D-05 redraw)
- **Board:** D-05, frame `b_002615.jpg`.
- **Parts:** three stick figures (left), each with a blue arrow to one `api` box; `api` → `db`. A dashed graphite arrow from `api` back toward the users, with a red ✕ on it and hand `can't reach the client`.
- **Speech bubble** (§2's one bubble, on the `api`): `can't I just ask them?`
- **Labels:** under the figure, hand `users push their status periodically`; small hand `* unless there is a persistent connection` (board's light-blue line).
- **Ids:** L-0040, L-0041, L-0042.

### Fig 2·e: Two calls are not enough (new StepThrough)
- **Layout:** swim lanes, time running down: `user (laptop)` · `api` · `store` · `friend's screen` (shows the dot).
- **Steps:**
  1. Laptop sends `online` at login (blue). Store marks `u7 = online`. Friend's screen: green dot. *"At login the app says 'I'm online'. Everyone sees a green dot."* (L-0045)
  2. Ten minutes of use. Nothing new is sent. Friend's screen still green. *"Nothing else needs sending, under the two-call design."* (L-0045)
  3. The laptop's battery dies (laptop glyph struck through in red). No `offline` call leaves it. *"The battery dies. The app never gets to say 'offline'."* (L-0046)
  4. An hour later: friend's screen still green; the dot ringed red. *"The dot stays green for a user who has been gone an hour."* (L-0046)
  5. Replay with periodic heartbeats: blue pulses every `10s`, then silence after the battery dies; at `30s` of silence the store marks offline; friend's screen shows the ring. *"With a beat every 10 s, 30 s of silence is enough to call it."* (L-0047, L-0048)
- **Colours:** blue calls, red battery and stale dot (step 4), green dot, graphite ring in step 5.
- **Ids:** L-0045, L-0046, L-0047, L-0048.

### Fig 2·f: A periodic pulse (D-06 redraw)
- **Board:** D-06, frame `b_002945.jpg`.
- **Parts:** stick figure → a row of five blue pulse dots → `api` box. Arrow up to the middle dot, hand `periodic pulse`. Above: mono `POST /heartbeat` and hand `marks the authenticated user alive`.
- **Below:** hand `offline = no heartbeat for long enough`; a hand arrow to `long enough` labelled `subjective! here 30 s`; small mono `heartbeat every 10 s`.
- **Ids:** L-0044, L-0047, L-0048.

### Fig 2·g: The pulse table and the two rules (D-07 redraw)
- **Board:** D-07, frame `b_003057.jpg` (emphasis `b_011642.jpg`).
- **Left:** table block `pulse` with header `user_id | last_hb`, rows `u1 1000` · `u2 1050` · `u3 1060`.
- **Right:** mono `UPDATE pulse SET last_hb = NOW() WHERE user_id = u1`, with a hand note `epoch seconds` pointing at `NOW()`. (The CodeBlock below the figure shows the upsert; the figure keeps the board's statement.)
- **Below:** mono `GET /status/<user_id>` and two rule lines: `no entry → offline` · `last_hb < now − 30s → offline` · else `online` (green).
- **Ids:** L-0049, L-0051, L-0052, L-0053, L-0054.

### Fig 2·h: How big is it? (D-08 redraw)
- **Board:** D-08, frame `b_003515.jpg`.
- **Left:** a ladder of mono lines `100 users → 100 rows`, `1k → 1k`, `1m → 1m`, `1B → 1B`. Under it: mono `1B × 8 B = 8 GB`.
- **Right:** `user_id`, `last_hb` with arrows down to `int (4B)` and `int (4B)`; `= 8 B / row`. A small phone outline labelled hand `128 GB in your pocket`.
- **Inset (added for 2.7):** mono `absence = offline: 100k active → 100k rows = 800 KB`, set in a bracket beside `8 GB`.
- **Ids:** L-0055, L-0056, L-0057, L-0065.
- **Mobile:** inset moves below.

### Fig 2·i: Who deletes? (new, from board S38 and S41)
- **Board:** text pages `b_004100.jpg` (Approach 1 and 2) and `b_004430.jpg` (Never re-invent the wheel).
- **Panel a "a cron job":** a `cron` box (dashed outline, since it's a new process) with a loop mark, an arrow into a `db` table block, mono `DELETE … WHERE last_hb < now − 30s`. Around the cron box, three red hand tags: `host it`, `keep it up`, `monitor it`. Hand: `another moving part`.
- **Panel b "the store expires it":** `api` → cylinder with a TTL timer, mono `SET u42 EX 30`. A dashed arrow inside the cylinder (the store's own expiry) to a small ✕ on the key. Green tick: hand `nothing new to run`.
- **Ids:** L-0062, L-0063, L-0064, L-0066, L-0067, L-0068, L-0070.
- **Mobile:** panels stack.

### RuleBox sketch §2: never reinvent the wheel (new)
- A crossed-out cron box (graphite cross, not red: it is a choice, not a failure) beside a cylinder with a TTL timer. Ids: L-0068.

---

## §3 Redis or DynamoDB?

### Fig 3·a: The brainstorm table (D-09 redraw)
- **Board:** D-09, frame `b_010200.jpg` (rows building up in `b_004730.jpg`, `b_005015.jpg`).
- **Parts:** a T-table, header mono `Redis` | `DynamoDB`. Five rows, each a graphite ✓ in one column with a long line running right to a hand label outside: DynamoDB ✓ `persistence` · DynamoDB ✓ `managed (team size & expertise)` · Redis ✓ `vendor lock-in` · Redis ✓ `future extensibility` · Redis ✓ `time sensitivity`. Above: hand `which one would you pick & why?` and small `* cost estimation`.
- **Fidelity:** the ticks are drawn as the board has them (graphite, not green: they record the class's votes, not a verdict). The persistence row gets a small hand `?` beside it, because the class challenged it (L-0072). Board typos are corrected in the redraw.
- **Ids:** L-0071, L-0072, L-0073, L-0074, L-0089, L-0094 (row labels).
- **Mobile:** the outside labels move inside, under each tick.

### Fig 3·b: Feeding your competitor (new, small)
- **Parts:** a box `your company` → a blue arrow labelled mono `$ cloud bill` → a cloud `vendor`; from the vendor, a graphite arrow to a box `vendor's food business`, which faces `your company` with a red double-headed hand arrow `competes with you`. Caption: "The lecture's example: a food-delivery company paying a cloud vendor that runs a food business (Amazon's, 2020–2022)."
- **Ids:** L-0079, L-0080.

### Fig 3·c: Hearing about an expiry (new, two lanes)
- **Lane a "Redis":** `api` — one long-lived connection line (thin, persistent) — `redis` cube with a TTL timer. At the timer's end, a dashed arrow from redis back along the connection labelled mono `expired: u42` (graphite) and hand `pushed on the open connection, when Redis actually deletes the key`.
- **Lane b "DynamoDB":** `api` → table, separate short request/response pairs (each its own arrow pair). The expired item sits greyed with hand `deleted later (can take days)`; a dashed pipe to mono `streams` with hand `you hear about it from the stream`.
- **Caption** carries SN-05's gist in one line: "RAM is a big part of Redis's speed too; the difference that matters here is the push."
- **Ids:** L-0094, L-0097.
- **Mobile:** lanes stack.

### RuleBox sketch §3: the three missed factors (new)
- The T-table in miniature, three rows ticked: `future extensions`, `vendor lock-in`, `managed?`. Ids: L-0100.

---

## §4 Six million heartbeats a minute

### Fig 4·a: The write load (D-10 redraw)
- **Board:** D-10, frame `b_010445.jpg` (green note in `b_012600.jpg`).
- **Parts:** two stick figures → `api` → `db`. Above, the arithmetic as mono lines: `1 beat / 10 s → 6 / min / user` · `× 1m active users` · `= 6m requests / min` (double-underlined) · `1 request = 1 db write`. Right of the db: hand `6m updates per minute!!` in red.
- **Added in 4.6:** hand `micro reads / updates → network bottleneck` (graphite, the board's green note).
- **Ids:** L-0103, L-0104, L-0144.

### Fig 4·b: One heartbeat, five trips (new StepThrough)
- **Layout:** two lifelines, `api` and `db`, time down (diagonals allowed).
- **Steps:**
  1. Three handshake arrows: `SYN` api→db, `SYN-ACK` db→api, `ACK` api→db (graphite). *"Open a connection: the three-way handshake."* (L-0109)
  2. A small hand bracket on the db lifeline: `read packets · CPU · buffers` (and, light, `login, process`). *"The database does work just to accept it."* (L-0116)
  3. One blue arrow `UPDATE pulse …` and one green `OK`. A tiny mono `~1 row, by primary key`. *"The actual write: one row, by primary key. The bare minimum."* (L-0111)
  4. Two teardown arrows `FIN` and `FIN/ACK` (as the lecture counts it). *"Close the connection: two more trips."* (L-0109)
  5. Bracket over the whole: hand `5 trips of setup + teardown for 1 tiny write`. *"Most of the time went into the line nobody draws."* (L-0110)
- **Fidelity:** the five-trip count is the lecture's; the step-2 bracket and the caption carry the inline note (database login, TLS if used).
- **Ids:** L-0108, L-0109, L-0110, L-0111, L-0116.

### Fig 4·c: The connection pool (D-11 redraw)
- **Board:** D-11, frame `b_010530.jpg` (reuse emphasis `b_012230.jpg`).
- **Parts:** hand `connection pool` with a leader to three parallel connection lines between a `server` box (with a fleet offset copy behind it) and a `db` cylinder. A hand arrow from below: `pre-established connections`. One line blue with a small loop arrow over it: hand `reused`.
- **Above:** hand `what's hectic? creating a new connection every time`.
- **Ids:** L-0112, L-0113.

### Fig 4·d: The pool is a queue inside the server (new)
- **Parts:** a large `api server` box. Inside it: a small `handler` box and a horizontal queue of three connection tokens (small rounded bars) labelled mono `blocking queue`. Arrows: handler ← `take()` from the queue; handler → `put()` back. From each token, a thin line leaves the server box to the `db` cylinder outside.
- **Speech bubble** (§4's one bubble, on the queue): `I'm a library, not a service`.
- **Ids:** L-0126, L-0127, L-0128.

### Fig 4·e: Three connections, four requests (new StepThrough)
- **Layout:** a server with a pool of slots (drawn as three, later four, connection lines to `db`), and an incoming-request queue on the left. Time runs down; each step is one snapshot.
- **Steps:**
  1. `min 3`: three idle lines. Three requests arrive; each takes one line (lines turn blue). *"Three requests, three connections, all busy."* (L-0118)
  2. A fourth request arrives; it waits in the queue (hand `wait`). *"Option one: wait until a query finishes and frees a line."* (L-0120)
  3. Instead the pool opens a fourth line (dashed while opening, then solid). *"Option two: open one more and keep it. The pool stretches to four."* (L-0121)
  4. `max 100`: the 101st request waits (red hand `cap`). *"With a cap, the 101st request waits for a release, up to a timeout."* (L-0123, L-0122)
  5. A line idle for `10 min` fades and is removed (TTL timer). *"Idle too long? The pool closes it."* (L-0125, L-0142)
- **Ids:** L-0118, L-0120, L-0121, L-0122, L-0123, L-0125, L-0142.

### Fig 4·f: The pool budget (new)
- **Panel a "fits":** a `db` cylinder with mono `max 1,000 connections`. Above it, a strip of 100 tiny server boxes (drawn as 10 with `×10` fleet marks), each with mono `max 10`. Hand: `1,000 ÷ 100 servers = 10 each`.
- **Panel b "the spike":** the same db; servers each hold `min 100`; ten servers fill it (`10 × 100 = 1,000`); autoscaling adds more boxes (dashed), whose connection lines hit a red ✕ at the db. Hand in red: `new servers get nothing`.
- **Ids:** L-0124, L-0158, L-0319, L-0320.
- **Mobile:** panels stack.

### Fig 4·g: Four resources, two workloads (new)
- **Parts:** four labelled bars, hand `memory · cpu · disk · network` (equal size, graphite). Two tags pinned below: mono `heartbeat writes` with a blue line to `network`, and mono `12-table report` with blue lines to `cpu` and `memory`. A smaller grey tag `data warehouse` → `disk`.
- **Caption:** "Only four things decide scaling. The heartbeat store is network-bound; a big report is CPU- and memory-bound."
- **Ids:** L-0145, L-0151, L-0152, L-0153, L-0154, L-0155.

### Fig 4·h: Heartbeats, reused (new, board S57 text page)
- **Board:** `b_011845.jpg` (heading only: "Similar systems: failure detection in a distributed system").
- **Panel a "failure detection":** four node boxes each sending blue pulse dots to a central `tracker` box; one node's pulses stop (the node outlined red), and the tracker shows its dot as an offline ring.
- **Panel b "a load balancer":** an `lb` bar with arrows *out* to three backends labelled hand `health check` (the lb asks); one backend red ✕, and the lb's arrow to it is removed. Hand: `same idea, the lb asks`.
- **Ids:** L-0132, L-0133.
- **Mobile:** panels stack.

### RuleBox sketch §4: start conservative (new)
- A server with three connection lines to a cylinder; a small dial gauge on the server with its needle low. Ids: L-0161.

---

## §5 Blog rows

### Fig 5·a: Six foundation topics (new, board S64 text page)
- **Board:** `b_013945.jpg`.
- **Parts:** six cards in a 3 × 2 grid, hand `database · scaling · concurrency / caching · delegation · communication`. `database` and `caching` cards drawn solid (today); the other four dashed with a tiny mono `Lecture 2`. Hand under: `any decision touches one of these six`.
- **Ids:** L-0168.

### Fig 5·b: The blog schema (D-12 redraw)
- **Board:** D-12, frame `b_020830.jpg`.
- **Parts:** two table blocks, `users (id, name, bio)` and `blogs (id, author_id, title, body, published_at, is_deleted)`. A hand arrow from `blogs.author_id` to `users.id`. `is_deleted` ringed (graphite) with hand `soft delete`. Under it: hand `delete blog → UPDATE, not DELETE`.
- **Ids:** L-0171, L-0172, L-0173.

### Fig 5·c: Hard delete vs soft delete in the tree (new)
- **Panel a "hard delete, as taught":** a three-level B+ tree (root, two internal nodes, four leaves). One leaf key struck out red; hand arrows show a merge of two leaves and the parent updated. Hand: `rebalance → CPU`.
- **Panel b "soft delete, as taught":** same tree; the leaf key stays, with a tiny mono `is_deleted=1` tag. Green tick: `no rebalance`.
- **Panel c "what engines do":** same tree; the struck key is marked (dashed) and a clock with hand `purge / VACUUM later`; a leaf merges only when its fill gauge drops below a line labelled mono `50%`. Caption: "More precisely (SN-07): engines defer deletes and merge pages by fill, not per delete."
- **Ids:** L-0185, L-0186.
- **Mobile:** panels stack.

### Fig 5·d: The life of a deleted blog (new)
- **Parts:** a horizontal timeline. `user clicks delete` → row gets `is_deleted = 1` (trash can glyph) → hand `recoverable for N days` bracket → a dashed arrow (background job) to a `s3` cube labelled hand `archive` → a final mono `DELETE … LIMIT 1000` in small repeated blocks spread along the axis (hand `staggered, off-peak`).
- **Side branch:** a red ✕ where mono `UNIQUE(email)` meets a new signup with the same email; hand: `soft-deleted row blocks it → partial index or hard delete`.
- **Ids:** L-0178, L-0263, L-0264, L-0308, L-0283, L-0296.
- **Mobile:** timeline turns vertical.

### Fig 5·e: Where an erased user's data still lives (new)
- **Parts:** four boxes: `live db` (green tick, hand `erased now`), `logs`, `daily snapshots`, `backups`. The last three get a small clock and hand `beyond use, ages out` (graphite, not red). A mono line under all: `1 month to act (+2 if complex)`.
- **Caption:** keeps the lecture's point (snapshots aren't rewritten) and SN-09's precision in one sentence.
- **Ids:** L-0266, L-0268, L-0270.

### Fig 5·f: Long text vs short text (D-13 redraw)
- **Board:** D-13, frame `b_015215.jpg`.
- **Panel a "long text":** a row of five cells; one cell holds only a small mono `→ ref`; a line drops to a lined-page glyph elsewhere. Hand `stored as a reference`; mono `LONGTEXT`.
- **Panel b "short text":** a row of five cells; the middle cell holds a few text lines. Hand `stored with the other columns`; mono `VARCHAR`.
- **Caption:** "As taught. InnoDB moves long values off-page only when the row doesn't fit; PostgreSQL does it for any wide value (TOAST)."
- **Ids:** L-0189, L-0192, L-0193.
- **Mobile:** panels stack.

### Fig 5·g: Three ways to store a date (D-14 redraw)
- **Board:** D-14, frame `b_015645.jpg` (MySQL note `b_021130.jpg`).
- **Three rows:** `datetime as datetime` → mono `02-04-2022T09:01:36Z`, hand `convenient · can be sub-optimal`; `datetime as epoch integer` → mono `1648890096` with hand `seconds since 1 Jan 1970`, `efficient · light · unreadable`; `custom format (int)` → mono `YYYYMMDD → 20220402`, hand `readable · integer`.
- **Fidelity:** the board's `172562347162` is replaced by the real epoch for the same instant (2 April 2022 09:01:36 UTC = `1648890096`); the caption says "the board's value was illustrative". "Heavy on size and index" is dropped from the redraw label because SN-12 contradicts it; the prose keeps the teacher's point with the note.
- **Ids:** L-0200, L-0201, L-0203, L-0209, L-0216, L-0217.

### Fig 5·h: Twenty bytes or four (new byte strip)
- **Row a:** 20 small cells, each holding one character of `02-04-2022T09:01:36Z`, numbered 1–20 above (hand `counted live in class`). Mono `≈ 20 B`.
- **Row b:** 4 cells, mono `int32`, holding `1648890096`. Mono `4 B`.
- **Row c (smaller, graphite):** 5 cells, mono `MySQL DATETIME = 5 B` (from A-D-18), caption "what MySQL actually stores".
- **Ids:** L-0211.

### RuleBox sketch §5: three questions per table (new)
- A table row with `is_deleted = 1` and a trash can; three small hand tags: `recover?` `archive?` `audit?`. Ids: L-0183.

---

## §6 What a cache is

### Fig 6·a: What a cache saves (new, three panels)
- **Panel a "disk I/O":** `db` cylinder → small grid (hash table) in RAM; hand `keep the result in RAM`.
- **Panel b "network I/O":** `api` → a dashed long arrow to a distant `service` (cloud) replaced by a `Disk` slab on the api; hand `cache an expensive call on local disk`.
- **Panel c "computation":** a gear glyph (single stroke) → grid; hand `memoize`.
- **Speech bubble** (§6's one bubble, on panel b's disk): `I'm a cache too`.
- **Ids:** L-0241, L-0243, L-0244.
- **Mobile:** panels stack.

### Fig 6·b: One cache, three servers (D-15 redraw)
- **Board:** D-15, frame `b_021645.jpg`.
- **Parts:** three stick figures → `lb` bar → three `api` boxes → `db` cylinder (orthogonal routing). A `redis` cube labelled mono `cache` top right, with lines to all three `api` boxes (the board's green links). One request path in blue: user → lb → api 2 → cache (hit, green tick).
- **Caption:** "Logically between the API servers and the database; every server reads the same copy."
- **Ids:** L-0248, L-0250, L-0256.
- **Mobile:** the three users collapse to one with `×3`.

### Fig 6·c: Hash lookup vs tree walk (new)
- **Panel a "redis":** one blue arrow from key to a grid cell; mono `1 step, RAM`.
- **Panel b "db table":** a B+ tree, blue path root → internal → leaf (3 steps), each node a page labelled mono `8–16 KB page`. Hand: `log n page reads, worst case from disk`; a small RAM band over the top two levels labelled hand `often cached in RAM`.
- **Ids:** L-0287, L-0289, L-0299.
- **Mobile:** panels stack.

### Fig 6·d: Compress where? (new)
- **Row a "cache compresses":** `app` → blue arrow mono `10 KB` over the network → `cache` with an inner box `compress → 1 KB`. Red hand on the arrow: `10 KB on the wire`.
- **Row b "app compresses":** `app` with an inner box `compress` → blue arrow mono `1 KB` → `cache` storing `1 KB`. Green tick on the arrow.
- **Ids:** L-0277, L-0279, L-0280.

### Fig 6·e: Your turn (new, board S85 + D-15)
- **Board:** `b_021718.jpg` (fun exercise) over the D-15 layout.
- **Parts:** Fig 6·b's architecture, faint, with six empty numbered tags (dashed circles) on: the user's browser, a CDN cloud (added, faint), the lb, an api, the db, the existing cache (tag 1 filled: hand `central cache · saves db calls`). Hand: `what would you cache here, and what does it save?`
- **Ids:** L-0254, L-0256.

### RuleBox sketch §6: three things a cache saves (new)
- Three tiny icons, disk, network, gear, each with an arrow into one hash-table grid. Ids: L-0244, L-0246.

---

## §7 What to keep

### Fig 7·a: Two builds, one habit (new)
- **Left, "green dots":** user → (heartbeat pulses) → `api` (pool lines) → `redis` with TTL timer; tags `§2`, `§3`, `§4` on the parts they came from.
- **Right, "blog rows":** user → `lb` → `api` → `cache` + `db` with the two tables and `is_deleted`; tags `§5`, `§6`.
- Each tag links to its chapter (the figure doubles as navigation).
- **Ids:** none new (recap; restates placed ids only).
- **Mobile:** the two halves stack.
