# Lecture 01: figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `learn/lec01/board/diagrams.md` and the clearest frame in `learn/lec01/board/frames_kept/`. New figures say "new". Each entry lists parts, arrows, labels, marker colours, the step text for step-throughs, the mobile layout and the ledger ids it carries.

Totals: **44 drawn items** = 39 numbered figures (6 of them step-throughs) + 5 rule-box sketches (one per RuleBox, §1–§5). Clip posters are specified in `animations.md`. All 20 board diagrams (D-01..D-20) are redrawn. None is dropped.

---

## 0. The glyph kit (build these once, reuse everywhere)

Rules come from `learn/design/B-whiteboard-notebook/NOTES.md`. One stroke weight (1.7 px graphite), round caps, bow ≤ 1.3 px, jitter ≈ 0.3 px, no hachure, shapes filled with `--fig-bg`. One generator, with the seed per figure id.

| Glyph | Drawing | Label |
|---|---|---|
| reader / client (person) | stick figure, as on the board | hand: `reader`, `writer`, `client` |
| client (box) | rectangle with 3 px chamfered corners | mono `client` (D-15..D-19 draw the client as a box, keep that) |
| API server | rectangle, 3 px chamfer | mono `api` |
| fleet | 2 stacked offset copies behind the box | hand `×5` |
| load balancer | narrow vertical bar | mono `lb` |
| database / master | solid cylinder | mono `db` / `master` |
| replica | dashed cylinder (5/4) | mono `replica` |
| cache (local) | small filled dot at a box's top-right corner (board's pink dot), ink-filled | hand `cache` when first introduced |
| remote cache | small cube | mono `redis` |
| CDN | cloud (single stroke) | mono `cdn` |
| broker / queue / stream | horizontal pipe (two long lines, rounded ends) | mono `sqs`, `kafka`, `broker` |
| partition | thin line inside the pipe (light rule ink, not blue: blue is reserved for the request path) | mono `p0 p1 p2` at the left end |
| message | small square, 10 px | mono `m1`… or nothing |
| worker / consumer | small rectangle | mono `worker`, `consumer` |
| search index | cylinder with mono `es` | |
| step numeral | circled numeral on the time axis or arrow | matches the step text one-to-one |

**Arrows.** Solid = synchronous request. Dashed = async (replication, a hand-off into a broker that nobody waits on). Open chevron heads, **on the initiator's direction only**. Architecture views use orthogonal routing. Diagonals are only allowed in time-sequence views.

**Replication arrows (fixed rule):** a dashed arrow *starts at the replica and points at the master*, labelled hand `pulls changes` (or `async · replica pulls`). The replica is the initiator. Data flowing master→replica is never drawn as an arrow out of the master.

**Marker colours:** blue = request/data path, green = ack/success, red = failure / stale / hard limit, graphite = everything else. Colour never encodes box type. The board's pinks, yellows and purples are *not* carried over; they map to graphite, except where noted.

**Speech bubble:** at most one per section, and only for the section's misconception (§1: CDN, §2: master, §3: worker, §5: none).

**Accessibility:** every SVG gets a `<title>` = figure title and a `<desc>` that states the mechanism in one or two sentences (draft given as "desc" where the mechanism isn't obvious).

**Mobile:** figures with more than 7 glyphs or more than 2 panels get a separate portrait layout below 760 px (NOTES weakness #2). Each entry says how.

---

## Lecture header + §1 Caching

### Fig 1·a: Medium so far, with two kinds of cache (D-01 redraw)
- **Board:** D-01, frame `b_003030.jpg` (also `b_001615.jpg`). Emphasis state `b_003245.jpg`.
- **Parts:** reader (left); two `api` boxes stacked; each `api` has a local cache dot at its top-right; `db` cylinder (right); `redis` cube above the top `api` with mono `redis` and hand `remote cache` (the board's cut-off `Redis Rem c…`, completed).
- **Arrows:** reader → each `api` (solid, graphite); each `api` → `db` (solid); top `api` → `redis` (solid). The emphasis state (reader → top `api` blue, a ring round its cache dot) is drawn as a **second panel** "a request served from local memory", not as a red scribble.
- **Labels:** hand `local cache` with a leader line to one dot; hand `one copy each` between the two dots.
- **Colours:** panel 2: blue arrow reader→top api; green tick at the cache dot.
- **Mobile:** panels stack.
- **Ids:** L-0013, L-0018, L-0025 (caption: "for Medium, the dot can hold published stories").
- **Used in:** header "Medium so far" (panel 1 only) and §1.2 (both panels).

### Fig 1·b: Two servers, two copies (new StepThrough)
- **Layout:** swim lanes, time running down: `reader` · `api A` (with cache dot) · `api B` (with cache dot) · `db`.
- **Steps:**
  1. Reader asks for story 42 → `api A` (blue). A's dot is empty → `db` → A's dot filled, labelled mono `v1`. *"The first request misses on A, reads the database and fills A's cache."* (L-0018)
  2. The next request lands on `api B` (blue). B's dot is empty → `db` → B's dot `v1`. *"The next request lands on B. B never saw A's copy, so it misses and fills its own."* (L-0018)
  3. The writer edits story 42 → `db` now `v2` (graphite). Neither dot changes. *"The story is edited. The database has v2; both caches still hold v1."* (L-0015)
  4. B's TTL expires (hand `ttl` at B's dot, graphite) → B refetches → `v2`. A still `v1`, ringed red. *"B's entry expires first and refetches. A still serves v1: two readers, two answers."* (L-0014, L-0015, L-0021)
  5. Panel note: hand `fine for a published story · not for a clap count` (L-0023, L-0025).
- **Colours:** blue requests, red ring on stale A in step 4, green ticks on fills.
- **Ids:** L-0014, L-0015, L-0018, L-0021, L-0023, L-0025.

### Fig 1·c: What's on an API server (new)
- **Panel a: two bars.** RAM bar `8 GB` divided into hand-labelled blocks: `os`, `app server`, `other jobs`, and a thin blank slice `free`. Disk bar `20 GB`: a short block `os · jars · packages  2–3 GB`, then a long empty stretch labelled hand `unused`.
- **Panel b: latency ladder** (vertical, log-spaced, graphite with one red mark): `RAM read ~100 ns` · `SSD random read ~150 µs` · `round trip in one datacenter ~500 µs`. Small hand note under it: `classic reference numbers, c. 2012 (Jeff Dean / jboner gist)`. A bracket from the SSD rung to RAM: hand `a hot "disk" cache is served from the OS page cache in RAM`.
- **Ids:** L-0059, L-0060, L-0061 (with SN-03); additions A-CS-03, A-CS-05.
- **Mobile:** panels stack; the ladder stays vertical.

### Fig 1·d: The CDN answers, and caches closer still (D-02 redraw + new panel)
- **Board:** D-02, frame `b_002945.jpg` (state `b_002830.jpg`).
- **Panel a:** reader (left); `cdn` cloud above; `api` box; `db` cylinder. Arc reader → cdn (blue); arc cdn → api (graphite, dashed hand note `only on a miss`); api → db short solid arc. Under the reader: mono `GET /popular` (the board's `https// s~ . — /popular`, replaced by Medium's endpoint; caption credits the class example `search.abc.com/popular` and Giphy). Green return arrow cdn → reader labelled hand `served from the edge`.
- **Speech bubble** on the cloud (the §1 misconception bubble): `images, JSON… it's all bytes to me`.
- **Panel b (new):** reader → `isp cache` (small box labelled mono `isp`) → `cdn` → origin `api`. The blue path stops at `isp` with a green return. Hand labels `very popular shows`, `a show doesn't change once live`.
- **Ids:** L-0051, L-0053, L-0055, L-0056 (panel a); L-0344, L-0346, L-0347 (panel b).
- **Mobile:** panels stack.

### Fig 1·e: A materialized view (new)
- **Left:** two table blocks (drawn as ruled rectangles). `marks` (columns mono `student_id · maths · physics · chemistry`) and `people` (`id · name · city`).
- **Middle:** a solid arrow labelled mono `JOIN + maths+physics+chemistry`.
- **Right:** a table block `results_mv` with columns `name · city · maths · physics · chemistry · total`. The `total` column is outlined by a hand bracket labelled `derived column`.
- **Below:** a dashed arrow from base tables to the view, labelled hand `refresh` (with a small superscript ① linking to SN-02's note).
- **Bottom right:** hand `queries hit the view, not the tables`.
- **Caption mentions** the Medium equivalent (author stats: users + stories + claps).
- **Ids:** L-0031, L-0033, L-0034, L-0035, L-0036.

### Fig 1·f: One Medium request, every place it can be answered (new, layer map)
- **Layout:** a horizontal route (desktop), a vertical route (mobile). Seven numbered stops, matching the board's numbered list (board S20) plus Redis: ① `browser` (on the reader) · ② `cdn` · ③ `lb / api gw` · ④ `api ram` (dot) · ⑤ `api disk` (small disk glyph under the api box) · ⑥ `redis` · ⑦ `db (materialized view)`.
- **Arrows:** one blue request line threads all seven. Under each stop, a hand annotation of what it typically holds: `assets, some responses` · `near-static responses` · `responses (ttl)` · `hot stories` · `rendered stories` · `shared hot keys` · `pre-joined stats`.
- **Above the line:** a graphite bracket from ① to ③ labelled `never reaches your servers`; a bracket ④–⑤ labelled `no network hop`.
- **Ids:** L-0070 (plus the per-stop L-0042, L-0053, L-0068, L-0013, L-0059, L-0031 as labels).
- **Reused:** in §6 as Fig 6·a's base.

### Fig 1·g: A config platform that can't afford a miss (new, inside the MarginNote)
- **Parts:** `control plane` box → solid arrow labelled `snapshot` → `s3` bucket glyph (cube) and `cdn` cloud (`for mobile`). App box, containing a `memory` dot and a `disk` block. Arrows: s3 → disk (labelled `on boot`), disk → memory, a dashed loop `background fetch` from cdn/s3 into memory. Red hand note at the top: `+3 ms = no-go`.
- **Small side caption:** `every change: git + cdn, together`.
- **Ids:** L-0314, L-0315, L-0316, L-0320, L-0321.

### RuleBox sketch §1: question every box (new)
- A tiny request route: reader → cdn → lb → api → redis → db, with a hand `?` above each box. One `?` (over the api) is answered by a small cache dot. Ids: L-0058, L-0064, L-0069.

---

## §2 Scaling

### Fig 2·a: The vertical ladder (new; extends the sample's 2.4·a panel 1)
- **Parts:** a staircase of cylinders growing left to right, labelled mono `16 GB · 32 · 64 · 128 · 256 · 512 GB · 1 TB · 2 TB · 4 TB`. A red dashed horizontal line above the last step labelled hand `hardware ceiling`. Inset (lower right, framed): a phone outline with a card slot; a card labelled `512 GB` with a red ✕; the slot labelled `rated 256 GB`; hand `same bus, same limit`.
- **Ids:** L-0080, L-0082, L-0083, L-0084.
- **Mobile:** the staircase becomes 5 steps (16 GB, 64, 256 GB, 1 TB, 4 TB) with the full list in the caption.

### Fig 2·b: A good scaling plan (D-03 redraw)
- **Board:** D-03, frame `b_004430.jpg`.
- **Parts:** hand-drawn axes, now labelled hand `capacity` (y) and `product age` (x). A graphite curve rises steeply, then flattens. Arrow + hand label at the rise: `scale vertically`. At the plateau's end: `then horizontally`. Hand-ruled box on the right: `no premature optimization`.
- **Ids:** L-0095, L-0096.

### Fig 2·c: medium.com behind a load balancer (D-04 redraw)
- **Board:** D-04, frame `b_004600.jpg` (`b_004530.jpg` has the temporary red LB circle; omit it).
- **Parts:** reader → `lb` bar → three `api` boxes (fan-out, orthogonal). Above each api: mono `100 rps`. To the right, a bracket around the three, labelled `×5 → 500 rps` (show 3 drawn + hand `…×5`).
- **Ids:** L-0097, L-0087, L-0088.

### Fig 2·d: Capacity math and the spike (new)
- **Panel a (arithmetic, as a hand-lettered equation card):** `forecast 50,000 orders/s ÷ 5,000 rps per machine (load-tested) = 10 machines`. Footnote hand `numbers illustrative; capacity only from a load test`.
- **Panel b (timeline):** x = time, y = requests. A graphite line flat, then a near-vertical blue spike at a marker labelled `campaign sent`. A dashed graphite "capacity" line that steps up late, labelled `autoscaler reacts`. The gap between them shaded with red hatch-free outline and labelled red `users arrive first`. A second variant line (thin): capacity raised *before* the marker, labelled green `scaled first, then sent`.
- **Ids:** L-0089, L-0090, L-0091, L-0094.
- **Note:** the 50,000 / 5,000 figures are not from class. Mark them illustrative in the caption, or use symbols `N ÷ c` (recommended: symbols, so nothing invented is shown).

### RuleBox sketch §2: Scale bottom up (D-05 redraw; the sample's rule sketch)
- **Board:** D-05, frame `b_004600.jpg`. As in the sample: reader, `api`, `db` in a row; numeral ① under db `database first`; ② under api `then api servers`.
- **Ids:** L-0100.

### Fig 2·e: Three ways to give the database room (D-06 redraw, the sample's Fig 2.4·a)
- **Board:** D-06, frame `b_010530.jpg`.
- **Panels** (as in the sample): (a) `16 GB` cylinder → `32 GB … 4 TB`, red ceiling line; (b) `api` → writes (blue) to solid `master`, reads (blue) to dashed `replica ×N`. **Fix:** the dashed arrow starts at the replica and points at the master, labelled `replica pulls` / `async`. The sample's label `≈5 per master` becomes `a few per master` (SN-08). The speech bubble on the master stays: `still every write on me?` (the §2 misconception bubble). (c) `api` with mono `hash(user_id)` → three solid cylinders `shard 0/1/2`, each `⅓ of users`.
- **Ids:** L-0116, L-0121, L-0107, L-0109.
- **Mobile:** panels stack (as in the sample).

### Fig 2·f: Replication lag, step by step (the sample's Fig 2.4·b, StepThrough)
- **As in the sample**, five steps, lanes `api` · `master` · `replica`. **Fix (step 4):** the arrow `changes since my position?` runs replica → master (already correct in the sample), and the returning `story 42` arrow is drawn as the reply on that same exchange (dashed, graphite), not as a master-initiated push.
- **Ids:** L-0107, L-0109, L-0110, L-0113.

### Fig 2·g: Replicas of replicas (new)
- **Parts:** one solid `master` at the top; five dashed `replica` cylinders in a row below; under each, three smaller dashed cylinders (on desktop; on mobile, draw one full branch and `×5` beside it). **Every dashed arrow points upward from child to parent**, labelled once `pulls`.
- **Labels:** hand `5 × 3 = 15`, hand under the master `each puller costs CPU · memory · network`.
- **Ids:** L-0325, L-0328, L-0329.

### Fig 2·h: Splitting by rows vs by tables (new, small)
- **Panel a `horizontal sharding`:** one table outline sliced into three horizontal bands (`users 1–⅓`, …) going to three cylinders.
- **Panel b `vertical sharding`:** two table outlines `users`, `stories` going to two different cylinders.
- **Both:** the `api` box on top with one line per db, labelled hand `one pool each`.
- **Ids:** L-0128, L-0129, L-0126, L-0127.

---

## §3 Delegation

### Fig 3·a: "74 essays" (D-07 redraw)
- **Board:** D-07, frame `b_010630.jpg`.
- **Parts:** a card rectangle; stick-figure avatar; hand `A. Writer` / `Engineer, writer` (**generic name**, replacing the instructor's name drawn on the board); `74 essays` underlined; a graphite arrow up from the hand label `#blogs of a user`.
- **Ids:** L-0141.

### Fig 3·b: Delegate and respond (D-08 redraw; also the §3 RuleBox sketch, shrunk)
- **Board:** D-08, frame `b_010900.jpg`.
- **Parts:** `client` (stick), `api`, `broker` pipe, three `worker` boxes, `db`. Arrows: ① client → api (blue, solid); ② api → broker (dashed, labelled mono `task`); ③ api → client (green, labelled hand `response`; a hand bracket `request context ends here`); broker → workers (graphite, three); bottom worker → db (solid, labelled hand `update db`). Drop the board's API–DB vertical line (in this flow the API doesn't write).
- **Ids:** L-0144, L-0145, L-0146.

### Fig 3·c: Medium's blog count via SQS (D-09 redraw)
- **Board:** D-09, frame `b_011130.jpg`.
- **Parts:** top block: table header mono `users: id · name · bio · total_blogs`, with a hand arrow `stored pre-computed to skip the join` and hand `(a crude example)`. Below: reader → `api` → dashed arrow labelled mono `ON_PUBLISH` → pipe `sqs` → three `worker` → a bus into `db`; hand label over the workers mono `total_blogs++`. Footer line: mono `ON_DELETE → total_blogs--`.
- **Ids:** L-0141, L-0147, L-0153.

### Fig 3·d: One queue, three consumers (D-10 + D-11 top, StepThrough)
- **Board:** D-10 / D-11 top, frames `b_011400.jpg`, `b_011741.jpg`.
- **Layout:** pipe `sqs` (left), three `consumer` boxes (right), with time running down in a narrow strip beside it showing a `visibility timeout` bar.
- **Steps:**
  1. `m1 m2 m3` enter the pipe (dashed arrow in). *"Three ON_PUBLISH messages wait in the queue."* (L-0155, L-0160)
  2. `m1 → consumer 2`, `m2 → consumer 1`, `m3 → consumer 3` (blue). The taken messages fade to 38% in the pipe (hidden from others, not deleted). *"Each message goes to one consumer; the others can't see it while it's being worked on."* (L-0159, L-0161)
  3. Consumers 2 and 3 finish → green `delete` arrows back to the pipe; m1, m3 vanish. *"Done means deleted: the consumer deletes the message after processing."* (L-0212)
  4. Consumer 1 crashes (red ✕ on its box). The `visibility timeout` bar fills (hand `configurable: 10 s … 10 min`; SN-12 gives the 30 s default). *"Consumer 1 dies holding m2. Nothing deletes it."* (L-0210, L-0364)
  5. The timeout expires → m2 back at full ink → consumer 3 (blue) → processes → green delete. *"After the visibility timeout, m2 is visible again and another consumer finishes it."* (L-0210, L-0212)
- **Ids:** L-0155, L-0159, L-0160, L-0161, L-0210, L-0212, L-0364.

### Fig 3·e: Two writes, one crash (D-09 ES variant, StepThrough)
- **Board:** D-09 variant, frame `b_011615.jpg`; the "not a good design" text at `b_011728.jpg`.
- **Layout:** pipe `sqs` → one `worker` → two stores side by side: `db` with a big mono counter `total_blogs`, and `es` with a mono counter `indexed`. The speech bubble on the worker (§3 misconception): `two teams' jobs, one me`.
- **Steps:**
  1. Start: `total_blogs 74`, `indexed 74`. The ON_PUBLISH message arrives at the worker (blue). *"A new story is published. One worker must do two writes."* (L-0163)
  2. Worker → db: `75` (green tick). *"Write 1 succeeds: the count is 75."* (L-0165)
  3. The worker crashes before the es write (red ✕). `75` vs `74` ringed red. *"The worker crashes before indexing. Count 75, search 74."* (L-0165)
  4. Retry: the message is consumed again → db `76`, es `75`. Both green ticks, but the pair is ringed red. *"The retry runs both writes again. Count 76, search 75: still wrong."* (L-0166)
  5. Hand note: `doing two things in one shot is always a problem` (L-0167).
- **Ids:** L-0163, L-0165, L-0166, L-0167, L-0169.

### Fig 3·f: One event, two kinds of consumer (D-11 bottom + D-12 merged)
- **Board:** D-12 `b_011730.jpg` / `b_012115.jpg`; D-11 bottom final form `b_012030.jpg`.
- **Parts:** reader → `api` → dashed `ON_PUBLISH` → pipe `kafka` holding five message squares. Two consumer boxes hang below, with a fleet of ×3 behind `search service`, and `counter service`. Each is connected by a vertical tick to a **different** square (its own position), hand `own position`. search service → `es`; counter service → `db`.
- **Labels:** hand `same event, two consumers`; under the pipe, hand `nobody deletes: kept until retention`.
- **Ids:** L-0170, L-0173, L-0175, L-0178.

### Fig 3·g: A topic and its partitions (D-13 redraw)
- **Board:** D-13, frames `b_013100.jpg` (labels) and `b_012400.jpg` (messages placed).
- **Panel a:** pipe with three partition rules, `p0 p1 p2`, topic label mono `ON-PUBLISH` above. Incoming arrow labelled mono `key = user_id → hash`. Four squares, two of them marked `u7` (same author) both in `p1`, the others in `p0` and `p2`.
- **Panel b (annotation strip):** hand `in a partition: ordered`; red hand `across partitions: no order guarantee`.
- **Ids:** L-0181, L-0182, L-0183, L-0184, L-0188, L-0201.

### Fig 3·h: As many consumers as partitions (D-14 redraw)
- **Board:** D-14, frame `b_013430.jpg`.
- **Parts:** pipe `#partitions = 3`; three arrows to `search consumer 1/2/3` (one per partition, blue); two more boxes `consumer 4`, `consumer 5` with a red strike and a brace `no messages`. The board's second unlabelled group under the pipe becomes a separate small group labelled `counter group (its own 3)`, with dashed outline, hand `the cap applies per group`.
- **Ids:** L-0187, L-0189, L-0190, L-0191.

### Fig 3·i: Beyond the partition cap: Kafka → SQS (new)
- **Parts:** pipe `kafka` (3 partitions) → three small `forwarder` boxes (hand `read · push only`) → pipe `sqs` → a fleet labelled `workers ×100`. Hand note `one more component to run`. Small caption tag: `common for notifications`.
- **Ids:** L-0336, L-0337, L-0338.

### Fig 3·j: Commit, crash, resume (new StepThrough)
- **Layout:** a horizontal partition strip with offsets `0 1 2 3 4 5 6 7`; a graphite caret `committed` and a blue caret `read`; one `counter consumer` box; a mono counter `total_blogs` on the right.
- **Steps:**
  1. The consumer reads 0–3, processes them (counter +4), and commits → the `committed` caret moves to 4 (green). *"Read, process, commit: Kafka records the group's position."* (L-0193)
  2. It reads 4–7 and processes all four (counter +4). *"Four more processed…"* (L-0194)
  3. Crash before the commit (red ✕). The `committed` caret is still at 4. *"…and the consumer dies before committing."* (L-0194)
  4. A new consumer resumes from 4 and re-reads 4–7. The counter adds 4 again, ringed red. *"It resumes from the last commit and processes 4–7 again: at-least-once."* (L-0195, L-0196)
  5. Hand note: `queue → delete · stream → commit` (L-0213).
- **Ids:** L-0193, L-0194, L-0195, L-0196, L-0213.

### Fig 3·k: SNS + SQS, a Kafka look-alike (new, small)
- **Parts:** `sns` (small circle with radiating ticks) → two `sqs` pipes → `search` and `counter` consumers. Under the pipes, red hand `no history to replay` (SN-free; A-DC-21's nuance goes in the caption).
- **Ids:** L-0303, L-0306, L-0307, L-0311.

### RuleBox sketch §3: delegate and respond (D-08, shrunk)
- Fig 3·b reduced to client ①→ api ③← and api ②⇢ broker, with no workers. Ids: L-0137.

---

## §4 Concurrency

### Fig 4·a: The concurrency page (board S50, new compact redraw)
- **Source:** board S50, frame `b_014430.jpg` (text page, not a D-diagram).
- **Three rows of hand lettering with small glyphs:** `why` → `threads · processes` (two small wavy lines in one box); `issues` → `talking between threads` · `shared resources → database, in-memory variables`; `handling` → `locks (optimistic, pessimistic) · mutexes & semaphores · lock-free (CRDT)`.
- **Ids:** L-0217, L-0218.

### Fig 4·b: Two claps, one lost (new StepThrough)
- **Lanes:** `reader A's request` · `reader B's request` · `stories row (claps)`.
- **Steps:**
  1. A reads `claps = 100`. *"A's request reads 100."*
  2. B reads `claps = 100`. *"B's request reads 100 too: A hasn't written yet."*
  3. A writes `101` (green). *"A adds one and writes 101."*
  4. B writes `101` (red ring on the row). *"B adds one to the 100 it read and writes 101. One clap is gone."*
  5. A side panel shows the same thing as a thread race: `2 threads × 1,000 count++ → 1,997`.
- **Ids:** L-0219, L-0230.

### Fig 4·c: A traffic signal (new)
- **Parts:** a four-road junction from above; the centre square labelled hand `critical section`; one signal green, three red; one car glyph (small rectangle) in the centre. Hand note `one road at a time = a lock`.
- **Ids:** L-0224, L-0225.

### RuleBox sketch §4: protect the data (new)
- Two blue arrows `+1`, `+1` into one cylinder showing mono `claps = claps + 1`; green `102`. Ids: L-0231.

---

## §5 Communication

### Fig 5·a: The usual communication (D-15 redraw)
- **Board:** D-15, frame `b_015245.jpg`.
- **Parts:** `client` box, `server` box. Arrow client → server mono `REQ` (blue); server → client mono `RES` (green). Hand labels: `kept open with a timeout` (under the pair), `heavy lifting` with an arrow into the server.
- **Ids:** L-0236.

### Fig 5·b: Short polling (D-16 redraw)
- **Board:** D-16, frame `b_015500.jpg`.
- **Parts:** client ⇄ server; a small circular arrow above, hand `every few seconds`. Below: three returned labels mono `in progress · in progress · ready`, the first two in graphite with hand `redundant`. Hand: `cost: an HTTP request + response each time`.
- **Ids:** L-0238, L-0245.

### Fig 5·c: Long polling (D-17 redraw)
- **Board:** D-17, frames `b_015845.jpg`, `b_015915.jpg`.
- **Parts:** client → server `REQ` (blue); a long vertical gap (dotted) labelled hand `held until something changes`; server → client `RES` (green), hand `ball bowled / server ready`. Small footer: hand `timeout → reconnect, ask again`.
- **Ids:** L-0246, L-0249, L-0250.

### Fig 5·d: WebSockets (D-18 redraw)
- **Board:** D-18, frame `b_020500.jpg` (also `b_020230.jpg`).
- **Parts:** client ⇄ server, one thick double-headed arrow, hand `bidirectional · kept open`. Two small message squares travelling in opposite directions; the server-originated one labelled hand `server speaks first`.
- **Ids:** L-0254, L-0256.

### Fig 5·e: Server-sent events (D-19 redraw)
- **Board:** D-19, frame `b_020645.jpg`.
- **Parts:** client and server with two arrows. Top: client → server, short, labelled hand `subscribe (once)` (the board's yellow arrow → graphite). Bottom: server → client, long, blue, three message squares, labelled `events`. Hand `one-way after that`. Footer: hand `tickers · deploy logs`.
- **Ids:** L-0265, L-0267, L-0385.

### Fig 5·f: WebSockets behind a load balancer (new, inside the MarginNote)
- **Panel a:** three clients → `lb` → three servers; each client's line continues through the lb to *one* server (blue), hand `pinned for the connection's life`.
- **Panel b:** the middle server is struck red ✕; its clients' lines become dashed and re-attach to the other two servers, hand `reconnect to any healthy server`, `spread with backoff + jitter`.
- **Ids:** L-0341, L-0342, L-0374, L-0375, L-0386.

### Fig 5·g: The push path (new)
- **Parts:** `your server` → `fcm / apns` (cloud-ish box, hand `not yours`) → phone outline containing `os` (one persistent line, hand `one shared connection for all apps`) → app icons. A red dotted branch `may drop`. Side: a calendar icon with hand `local notification, no network`.
- **Ids:** L-0284, L-0285, L-0286.

### Fig 5·h: Medium, hop by hop (D-20 redraw)
- **Board:** D-20, frame `b_021345.jpg`.
- **Parts:** reader ⇄ `api` labelled mono `HTTP`; `api` ⇄ `db` labelled mono `persistent TCP · wire protocol`; `api` ⇄ `redis` (added small) labelled mono `RESP`; reader ⇄ `realtime likes` box labelled mono `WS`. A second reader on the far side receives a clap animation glyph (small 👏 replaced with a hand-drawn burst mark, no emoji).
- **Footer:** hand `twitter likes · medium claps · instagram live hearts`.
- **Ids:** L-0273, L-0274, L-0275, L-0290, L-0294.

### Fig 5·i: A wire-protocol packet (new, small)
- **Parts:** one long rectangle split into cells: `length (3 B)` · `seq (1 B)` · `command` · `SELECT … FROM stories …`. Above: hand `illustrative: MySQL-style framing`. Below: hand `the query is bytes in an agreed layout`.
- **Ids:** L-0291, L-0293.

### RuleBox sketch §5: pick by use case (new)
- Four tiny client–server pairs in a row: `↔ every few s` (short poll), `→ held` (long poll), `⇄ open` (websocket), `← open` (sse). Ids: L-0278.

---

## §6 What to keep

### Fig 6·a: Medium, end of Lecture 1 (new; built on Fig 1·f)
- **Parts:** Fig 1·f's route, plus `lb` + api fleet `×5`, `master` + dashed `replica ×N` (arrows replica → master), three shards as a ghost option, `kafka` with `search` / `counter` consumers, a `ws/sse` line back to the readers. Each box carries a small section tag `§1`…`§5` that links to the section.
- **Mobile:** a vertical list layout (box glyph + tag + one-line label) instead of the diagram.
- **Ids:** none new (recap); see placement for the heuristics card.
