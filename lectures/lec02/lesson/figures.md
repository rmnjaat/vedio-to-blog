# Lecture 04 (lec02): figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `lectures/lec02/board/diagrams.md` and the clearest frame in `lectures/lec02/board/frames_kept/` (open the frame; never embed it). New figures say "new". Each entry lists parts and positions, arrows, labels (exact words, from the class or the board), marker colours, the step text for step-throughs, the phone layout, a `desc` draft and the ledger ids it carries. Labels in `mono` are identifiers; everything else is hand lettering.

Totals: **46 drawn items** = 35 numbered figures (6 of them step-throughs: 6·b, 8·a, 8·b, 8·f, 8·h, 10·b) + 10 rule-box sketches (one per chapter) + 1 notation key. **13 drawn items get a separate `<Phone>` layout** (12 figures + the notation key, listed at the end). Clip posters are specified in `animations.md`. All 13 board diagrams are accounted for: **9 redrawn** (D-01, D-02, D-03, D-04, D-05, D-06, D-08, D-10, D-11) and **4 folded** into another figure with a reason (D-07 → Fig 7·a, D-09 → Fig 9·b, D-12 → Fig 8·a′ + Fig 9·b + Fig 9·c, D-13 → Fig 8·b + Fig 8·d). See the board-diagram ledger at the end.

---

## 0. The glyph kit (build these once, reuse everywhere)

Rules come from `learn/design/B-whiteboard-notebook/NOTES.md` and `site/FIGURES.md`. One stroke family (1.7 px regular, 1.1 px `thin`, 3.2 px `heavy`), round caps, bow ≤ 1.3 px, jitter ≈ 0.3 px, no hachure, no double strokes, shapes filled with `--fig-bg`. Every part comes from `site/src/figures/kit/Kit.tsx`; no hand-written path data. Distinct seed per part (`` `${figId}-ws1` ``). Files go in `site/src/figures/lec02/`.

### Reused from Lecture 02 (lec01), unchanged

| Glyph | Kit part | Label |
|---|---|---|
| user / client (person) | `Actor` (≤ 3 per figure; more users are drawn as a letter on a short stub line, as on the board) | mono `A`, `B`, … |
| API server | `Box` (3 px chamfer) | mono `api` |
| fleet | `Fleet n` | hand `×3` |
| load balancer | `LoadBalancer` | mono `lb` |
| database | `Cyl` | mono `db`, `mysql`, … |
| shards | 3 × `Cyl` in a row, hand `×N` beside the last | mono `shard 1/2/3` only where it matters |
| broker / stream (Kafka) | `Pipe` (two long lines, rounded ends), message squares inside when history matters | mono `kafka` |
| worker / consumer | `Worker` | mono `worker` |
| message | `Dot`-sized square, 10 px | mono `m` or the text in a bubble |
| step numeral | `Num` | matches the step text one-to-one |
| cloud ("our infra") | `Cloud` | hand `our infra` |
| table block | ruled `Box` with header row (lec01 Fig 1·e) | mono column names |
| phone outline | lec01 Fig 2·a inset phone, built from `Box` + `Line` | — |
| hulk-and-jar doodle | `TH_GLYPHS.hulk` from `figures/glyphs.tsx` | — |

**Kafka stays a horizontal pipe.** The board draws Kafka as a vertical striped cylinder (D-09, D-11), and the outline's NotationKey line repeats that. We keep Lecture 02's pipe instead: in this kit a cylinder always means a database, and readers met Kafka as a pipe in Lecture 02 §3.5. The pipe may run vertically in Fig 9·b to follow the board's layout.

### New in this lecture (all built from kit parts)

| Glyph | Built from | Drawing | Label |
|---|---|---|---|
| **edge server** (WebSocket server) | `Box` + two `Mark` prongs | box with a small two-prong plug mark at its top-right corner | mono `ws1`, `ws2` … or `edge server` |
| **connection slots** | 4 × small `Box` (8×8) along the box's bottom edge, inside it | the board's yellow dots, as squares. Empty = outline; taken by a user = blue fill; the user cap = a short red `Ceiling` tick after slot 4. Server-to-server links are extra slots drawn *after* the cap tick: red fill for a mesh peer link, graphite fill for the one Pub/Sub link (the class counts them on top of the four users: 4 + 3 = 7, L-0276) | hand `4 users (toy limit)` on first use |
| **WS line** | two parallel `Line thin`, 3 px apart, no head | a WebSocket connection; it has no direction. A message travelling on it is a square with its own small chevron | mono `WS` |
| **TCP link** (server ↔ server) | one `Line` regular, no head | plain persistent TCP between two servers | mono `tcp` |
| **real-time Pub/Sub** | `Pipe` + three `Line thin dotted` inside + three short `Mark` ticks radiating from the top centre (lec01's `sns` broadcast mark) | pipe with dotted lanes (nothing stored) and a broadcast mark; never holds message squares | mono `redis pub/sub`; lanes mono `c1 c2 c3` only where channels matter |
| **Balancer** | `Box` + a small compass (circle `Mark`s with one needle `Mark`) at its top-left | the connection-assigning service. Not a load balancer: never the narrow `lb` bar | mono `balancer` |
| **column file** | `Box` with a folded top-right corner (`Mark`) and thin ruled lines | one file per column | mono `price.col` … |
| **row strip / column block** | ruled `Box` split into cells | D-01's long row strip and short column block | mono `R1`, `c1` |
| **graph node / edge** | small circle (`Cyl` top ellipse only, rx = ry) + `Line` | node and edge; a new edge may be red | mono node name |
| **document** | `Box` with `{ }` in mono at its top-left | a JSON document | mono field names |
| **chat bubble** | `Bubble` with no tail lettering role (it is a message, not a speech bubble) | a message as the user sees it | mono `standup in 5` |
| **key** | small circle + shaft `Mark` + two teeth | a credential held by a server | mono `kafka: write-only` / `db creds` |
| **clock** | small circle + two hands (`Mark`) | waiting / a timer | — |

### Arrows
- **Solid = synchronous request, dashed = asynchronous** (edge → Kafka, worker ← Kafka, ingest job → warehouse, background refresh). Open chevron heads **on the initiator's direction only**. A reply on the same exchange is a return arrow in the reply's colour.
- **Architecture views use orthogonal routing** (Figs 7·a, 7·c, 8·d, 8·e, 8·g, 9·b, 9·c, 9·d). Diagonals only in time-sequence views (step-throughs, Fig 10·b) and in the mesh (Fig 8·b step 3), where the diagonals are the point and follow D-05.
- **Replication = the replica pulls** (lec01's fixed rule): the arrow starts at the replica and points at the node it copies from (Fig 9·d). Data flowing to a replica is never an arrow out of the primary.
- **Kafka is pulled:** the arrow runs worker → `kafka` (dashed, hand `pull`), never kafka → worker (L-0386). A producer's arrow runs edge → `kafka` (dashed).
- **Redis pushes:** the arrow runs `redis pub/sub` → server (L-0293). `PUBLISH` runs server → pipe; `SUBSCRIBE` runs server → pipe (solid, graphite, mono).
- **The Balancer is asked:** client → `balancer` (hand `where do I connect?`), the reply returns as mono `ws1` (graphite); then the client opens its WS line.

### Marker colours
Blue = request / data path (a message travelling, a query reading a file). Green = ack / success (persisted, delivered, write acknowledged). Red = failure, stale read, hard limit (the 4-connection cap, a lost Pub/Sub message, the 200 ms SLA, wasted IO, an orphan row, a rejected draft). Graphite = everything else. Colour never encodes box type. **The board's colours are not carried over**: its white / green / blue paths in "3 ways to persist" (white Slack, green WhatsApp, blue Zoom) become graphite paths numbered ①②③; its yellow TCP links, pink edge boxes and purple Balancer become graphite.

### Speech bubble
At most one per chapter, and only for that chapter's misconception: §1 Fig 1·c on the router `relational DBs don't scale?`; §7 Fig 7·c on the edge server `the socket's open, send on me?`; §8 Fig 8·c on WS1 `just 3 links…`; §9 Fig 9·c on the exposed edge `public = unsafe?`. Chapters 2, 3, 4 (the outline asks for no bubble in Fig 4·a), 5, 6 and 10 have none. The §1 rule sketch's `X scales!` is a quoted claim inside the RuleBox, not a figure bubble.

### Accessibility
Every SVG gets `<title>` = figure title and `<desc>` = the mechanism in one or two sentences (drafts below). Step-throughs: each step's text is the aria-live narration; without JS every step and text is visible.

### Mobile
- Scale: wide figure 880 units, one of three panels 300, step-through lane figure 420, rule sketch 480 (`site/FIGURES.md`). Labels ≥ 12 px on a 360 px screen: annotation 14, mono 14, small 12.5.
- **A figure with more than 7 glyphs or more than 2 panels gets a portrait `<Phone>` layout** (`layout="phone"`, about 340 units wide). Two-panel figures stack below 760 px without a separate layout when each panel is ≤ 360 units. Step-throughs are authored 420 wide with time running down, labels at 14, which stays ≥ 12 px at 360 px; they need no second layout. Each entry says what it gets.

---

## Lecture header + NotationKey

### Notation key (once, top of chapter 1)
- **Row of glyphs, each with a one-line hand label:** shards `three cylinders ×N` → `a sharded database`; column file → `one file per column (Ch 3)`; graph node/edge → `a node and an edge (Ch 4)`; edge server with slots → `edge server: holds users' WebSockets`; WS line → `WS: a WebSocket connection`; TCP link → `tcp: server to server`; Pub/Sub pipe → `redis pub/sub: pushes, keeps nothing`; Kafka pipe with two squares → `kafka: keeps messages, consumers pull`; Balancer → `balancer: tells a client where to connect`.
- **Colour strip** (as lec01): blue `a message / request travelling`, green `saved / delivered`, red `failure, limit, lost`.
- **Phone:** the row becomes a two-column list.
- **Ids:** none (notation).

---

## §1 "NoSQL" is not one thing

### Fig 1·a: Two consistencies (new)
- **Section:** 1.2. Board: none (spoken).
- **Panel a `ACID consistency`:** three state boxes in a row, mono `state 1 ✓` → `state 2 ✓` → `state 3 ✓`, joined by solid arrows labelled mono `txn`. Above: hand `correct → correct`. Under the panel: hand `the data stays correct`.
- **Panel b `CAP consistency`:** two `Cyl` nodes side by side, mono `node 1` and `node 2`. A writer `Actor` → `node 1`, blue, mono `write x = 2`. A reader below → `node 2`, blue, mono `read x`. Two outcomes stacked at the reader: green mono `2` with hand `strong: visible right away`; red mono `1` with hand `eventual: old value for a while`. A dashed arrow from node 2 to node 1, hand `catches up` (the replica pulls).
- **Under both:** hand `same word, two meanings` (L-0014).
- **Colours:** blue write/read, green strong result, red stale result.
- **desc:** "ACID consistency means each transaction moves the data from one correct state to another. CAP consistency means a read right after a write sees it; an eventually consistent store may return the old value for a while."
- **Phone:** two panels, stack.
- **Ids:** L-0014, L-0015, L-0016, L-0020.

### Fig 1·b: One instance vs spread out (new)
- **Section:** 1.2.
- **Panel a `relational, one instance`:** one `Cyl` mono `db`, a red `Cross` over it, three users with red ✕ at their request arrows. Hand red `everything down`.
- **Panel b `spread over nodes`:** three `Cyl` mono `node 1 · node 2 · node 3`, node 2 crossed red; users' requests (blue) route around it to nodes 1 and 3, green ticks. Hand green `others still serve`.
- **Small footnote under panel a (graphite, hand):** `a standby replica can keep one primary available` (A-DC-05, sourced in the prose).
- **desc:** "All the data in one database instance means one failure takes everything down. Data spread across nodes keeps being served when one node fails."
- **Phone:** two panels, stack.
- **Ids:** L-0017, L-0018, L-0019.

### Fig 1·c: Anything that shards, scales (new; Lecture 03's router redrawn small)
- **Section:** 1.3.
- **Parts:** a client `Actor` → `Box` mono `router` → two `Cyl` labelled mono `mysql` with sub `A–M` and `N–Z`. On the router→shard lines: mono `key = "mango"` routes to `A–M` (blue), mono `key = "pear"` to `N–Z` (blue). Keys are illustrative; the ranges are Lecture 03's.
- **Board box, hand-ruled, right:** `NoSQL DBs scale does not mean SQL does not → anything that shards, scales` (the board's words).
- **Speech bubble** (§1 misconception) on the router: `relational DBs don't scale?`
- **Hand note under the shards:** `gave up cross-shard consistency, got horizontal scale` (L-0023).
- **desc:** "Lecture 03's key-value store on MySQL routes keys A to M to one database and N to Z to another, which is the same move non-relational databases make."
- **Phone:** ≤ 7 glyphs, single panel; author at 340 units, no second layout.
- **Ids:** L-0022, L-0023, L-0024.

### RuleBox sketch §1 (1.3): never believe a generic statement (new)
- A speech bubble mono `X scales!`; a hand-drawn `?` beside it; under it hand `for what workload?` and a small counter-example arrow to `?` labelled hand `find the counter-example`.
- **Ids:** L-0025.

---

## §2 Documents and key-value stores

### Fig 2·a: Partial update vs read, change, write back (new; panel 1 in 2.1, both panels in 2.3)
- **Panel 1 `document: partial update` (2.1):** a document glyph with mono lines `_id: 7` · `settings: {` · `theme: "dark"` · `tz: "UTC"` · `}`. The `tz` line is outlined blue, with a short blue arrow from mono `$set settings.tz = "IST"` (from the page's CodeBlock) and the value crossed and rewritten `"IST"`. Hand `only this field changes`.
- **Panel 2 `key-value: read, change, write back` (2.3):** an `api` box and a `Cyl` mono `kv`, with the key mono `user:7` above it and the value drawn as a closed grey blob mono `{ … 2 KB … }`. Three numbered arrows: ① `api` → kv mono `GET user:7` (blue), the whole blob returns (graphite, dashed outline of the blob travelling); ② inside the api box the blob is opened and one line changed, hand `change one field`; ③ `api` → kv mono `PUT user:7 {…}` (blue), green tick. Hand `the whole value travels out and back`.
- **Footnote under panel 2:** hand `Redis hashes allow HSET on one field` (A-DC-09, optional; drop it if the prose drops A-DC-09).
- **desc:** "A document database updates one attribute in place. A key-value store holds an opaque value, so changing one field means reading the whole value, changing it and writing it all back."
- **Phone:** two panels, stack (2.1 shows panel 1 only).
- **Ids:** L-0034, L-0035.

### Fig 2·b: One key vs IN (1, 2, 3) (new; also the §2 RuleBox sketch, shrunk)
- **Section:** 2.3.
- **Parts:** an `api` box on the left; three shard `Cyl`s on the right, mono `shard 1 · shard 2 · shard 3` holding `id 1`, `id 2`, `id 3`.
- **Top lane:** mono `GET 2` → one blue arrow to shard 2 only, green tick, hand `one shard answers`.
- **Bottom lane:** mono `WHERE id IN (1, 2, 3)` → three blue arrows fanning to all three shards, then three return arrows merging back at the api; red hand `cross-shard: very expensive`.
- **Hand note right:** `every op names one key → thousands of partitions, no hiccups` (L-0042, L-0044).
- **desc:** "A get by key touches exactly one shard. A query for ids 1, 2 and 3 may hit three shards and must wait for all of them, which is why key-only access shards so easily."
- **Phone:** 5 glyphs; author at 340, the two lanes stacked vertically; no second layout.
- **Ids:** L-0042, L-0043, L-0044, L-0047.

### RuleBox sketch §2 (2.3): the more complex the queries, the less you can distribute (Fig 2·b, tiny)
- Fig 2·b reduced to three cylinders: a single `GET k` arrow hitting one, beside an `IN (1,2,3)` arrow fanning out to three. No labels except the two mono queries.
- **Ids:** L-0045.

---

## §3 Column-oriented databases

### Fig 3·a: Row-oriented vs column-oriented on disk (D-01 redraw)
- **Board:** D-01, frame `b_001845.jpg` (also `b_001715.jpg`, `b_002245.jpg`).
- **Top:** a table block mono `stock_ticks` with header `symbol | price | name | exchange | timestamp` and an empty ruled body.
- **Left, panel title `row-oriented`:** three long strips, each 5 cells, mono `R1 R2 R3` on the left; a thin graphite line runs lengthwise through each strip (one row stored contiguously). Hand `a row's columns sit together`.
- **Right, panel title `column-oriented`:** five short blocks stacked, mono `c1 symbol` … `c5 timestamp` on the right, each 3 cells; mono `R1 R2 R3` across the top with three thin vertical lines down through all five blocks. Hand `one column's values sit together`.
- **Emphasis dropped:** the red circles and scribbles (00:17–00:26) are not drawn; the read pattern they pointed at is the clip's job (`l02-column-scan`, whose frame 0 is this figure).
- **Colours:** graphite only (structure).
- **desc:** "In a row store the five values of each row are stored next to each other. In a column store the values of each column are stored together, so row 1 is one cell in every column block."
- **Phone:** 11 glyphs → **phone layout**: the table header on top (header in mono 12.5 with `ts` for `timestamp`, the caption says so), the row panel below it, the column panel below that, each 340 wide.
- **Ids:** L-0051, L-0052, L-0053, L-0054.

### Fig 3·b: One file per column (new)
- **Section:** 3.1.
- **Parts:** five column-file glyphs in a row, mono `symbol.col · price.col · name.col · exchange.col · ts.col`. Line numbers `1 2 3` down the left of each. `symbol.col` shows mono `AAPL · GOOG · AAPL` (the class's Apple/Google); the others show short ink dashes as values.
- **Annotation:** a thin graphite horizontal bracket across line 2 of all five files, hand `row 2 = line 2 of every file`. Hand under: `a very crude, very naive model`.
- **desc:** "As a naive mental model, a column store keeps one file per column, and line n of every file holds row n's value."
- **Phone:** five files at 880 units shrink below 12 px → **phone layout**: two rows (3 + 2) at 340 units, the bracket becomes a hand note under the rows.
- **Ids:** L-0055.

### Fig 3·c: Primary store → job → warehouse (new)
- **Section:** 3.3.
- **Left, panel title `primary copy`:** an `api` box → `Cyl` mono `mysql` (solid, graphite); a second `Cyl` mono `dynamodb` below it (another service's store). Hand `transactional: whole rows`.
- **Middle:** one dashed arrow from both cylinders into a box mono `ingest job` → dashed arrow onward.
- **Right, panel title `warehouse`:** a box filled with five thin vertical column strips, mono `warehouse`, sub mono `bigquery / redshift`. An analyst `Actor` → warehouse, blue, mono `SELECT avg(price) …`.
- **Labels:** hand at the warehouse `usually not the primary copy` (inline clarification of L-0073); hand on the dashed path `just for analytics`.
- **desc:** "Applications write to their primary databases. A job copies the data into a column-oriented warehouse, and analysts query only the warehouse."
- **Phone:** 7 glyphs, 3 panels → **phone layout**: vertical, primary stores on top, job, warehouse, analyst at the bottom.
- **Ids:** L-0073, L-0074, L-0063.

### Fig 3·d: Why columns compress (new)
- **Section:** 3.4.
- **Row 1:** a column strip mono `symbol` with values `AAPL AAPL GOOG GOOG GOOG AAPL`; hand `homogeneous`.
- **Row 2:** a small dictionary card mono `AAPL → 0 · GOOG → 1`, hand `a small fixed-size code`; the strip becomes mono `0 0 1 1 1 0`. Hand `a few distinct values fit in one byte` (L-0079).
- **Row 3:** the run-length line mono `0×2 1×3 0×1`, hand `run-length encoding: read about it`.
- **Contrast strip (bottom, graphite):** one row strip mono `AAPL · 187.2 · Apple · … · 09:15` with hand `a row mixes types: compresses less`. (The price is a dash in the build if no example value is wanted; it is illustrative.)
- **Side note:** hand `Huffman, Snappy, LZ work well here` (L-0078).
- **desc:** "A column holds one kind of value, so repeated symbols become small codes and then runs. A row mixes strings and numbers, which compresses less."
- **Phone:** 3 rows + strip, single column already; author at 340, no second layout.
- **Ids:** L-0075, L-0077, L-0078, L-0079, L-0080.

### RuleBox sketch §3 (3.3): the query decides the layout
- A row strip (5 cells) and a column block stack (5 blocks); mono `SELECT avg(price) … ts` above; on the row strip all five cells get a red tick-through (read), on the column stack only `price` and `ts` get blue ticks. Hand `rows → transactional`, `columns → analytics`.
- **Ids:** L-0066.

---

## §4 Graph databases

### Fig 4·a: An adjacency list is the whole idea (new)
- **Section:** 4.1.
- **Left:** four graph nodes mono `A B C D` with edges A–B, A–C, B–D, C–D.
- **Right:** the adjacency list as mono lines `A: B, C` · `B: A, D` · `C: A, D` · `D: B, C`, with a hand bracket `stored as is` and a box outline around it labelled hand `+ data APIs on top`.
- **Corner doodle (bottom right, small, no bubble):** the `hulk` glyph next to a jar, hand `opening a glass jar` (L-0090). No speech bubble (outline).
- **desc:** "A graph database stores each node's adjacency list as is and puts data APIs on top. Using one only to store follow lists is the Hulk opening a glass jar."
- **Phone:** 6 parts; author at 340 with the list under the graph; no second layout.
- **Ids:** L-0084, L-0090.

### Fig 4·b: A cohort (new)
- **Section:** 4.2.
- **Parts:** a product node mono `iPhone` in the centre; five buyer nodes mono `u1 … u5` around it, each with an edge labelled once hand `bought`. `u3` gains a blue edge to a node mono `AirPods`. Dashed graphite arrows from `AirPods` to `u1, u2, u4, u5`, hand `recommend`.
- **Hand notes:** `similar users = everyone who bought one` (L-0094); bottom `one level here; real cohorts go 2–3 levels deep` (L-0095).
- **desc:** "Everyone who bought an iPhone forms a cohort. When one of them buys AirPods, AirPods are recommended to the rest."
- **Phone:** 7 nodes, single panel; author at 340 (radial), labels at 14; no second layout.
- **Ids:** L-0093, L-0094, L-0095.

### Fig 4·c: A new edge outside the cluster (new; reserve clip candidate)
- **Section:** 4.3.
- **Panel a (graph):** a node mono `you`; five merchant nodes around it, mono `grocery · fuel · rent · telecom · pharmacy`, inside a dashed hand-drawn boundary, hand `domestic: a closely knit cluster`. One red edge from `you` to a node outside the boundary, mono `overseas merchant`, hand red `a new edge: suspicious`.
- **Panel b (timeline, left to right):** mono `card + OTP` → `graph check` → `decide` → `route to an executive` → phone glyph `call: "is this you?"`. A red `Bracket` over `graph check` → `route to an executive`, hand red `200 ms SLA` with a small graphite hand note `as relayed in class`. The call sits after the bracket (outline: the call follows the decision).
- **Small hand note under panel a:** `50–60 parameters per transaction, by the instructor's account` (L-0100).
- **desc:** "A customer's history forms a tight cluster of domestic merchants. A sudden international transaction is a new edge outside it; the bank's check flags it and routes it to an executive within a 200 ms SLA."
- **Phone:** 9 glyphs, 2 panels → **phone layout**: the cluster on top (340 wide), the timeline turned vertical below it.
- **Ids:** L-0099, L-0100, L-0101, L-0103.

### RuleBox sketch §4 (4.1): graph algorithms, not graph-shaped data
- The jar with the `hulk` fist, crossed out in graphite, next to a three-hop path `A → B → C → D` ticked green. Hand `algorithms ✓ · "it looks like a graph" ✗`.
- **Ids:** L-0089.

### Fig 4·d: Three hops: one traversal vs three self-joins (new)
- **Section:** 4.4.
- **Panel a `graph`:** nodes `A → B → C → D`, the path blue, hand `one traversal`.
- **Panel b `relational`:** three copies of a table block mono `edges(from_id, to_id)` aliased `e1`, `e2`, `e3`, chained with mono `JOIN … ON e1.to_id = e2.from_id` and `JOIN … ON e2.to_id = e3.from_id`. Red hand `N levels = N self-joins, rewrite per depth`. Graphite hand under it `10 levels → 9 self-joins: messy` (L-0394).
- **Footnote (small, graphite):** hand `SQL can also recurse: see "More precisely"` (points at SN-04, no claim in the figure).
- **desc:** "In a graph, finding a node three levels away is one traversal. In SQL written level by level it takes one self-join per level, and the query changes with the depth."
- **Phone:** two panels, stack.
- **Ids:** L-0132, L-0133, L-0394.

---

## §5 Why they scale, and when to pick SQL

### Fig 5·a: What a foreign key checks (new)
- **Section:** 5.1. Uses Slack's own tables so chapter 6 echoes it.
- **Panel a `insert`:** table blocks mono `channels (id)` with rows `1, 2` and mono `messages (channel_id)`; a new row mono `channel_id = 9` arrives (blue) and stops at a red `Cross`, hand red `no channel 9: rejected`.
- **Panel b `delete`:** `DELETE channel 1` (blue) stops at a red `Cross` on the `channels` row 1, with two child rows in `messages` pointing at it; hand red `children exist: blocked`.
- **Panel c `on two shards`:** `channels` on `shard 1`, `messages` on `shard 2` (two cylinders); the FK check is a dashed red arrow crossing between machines, hand red `the check would cross machines`. Hand graphite `drop the FK → it partitions like any store` (L-0024 restated).
- **desc:** "A foreign key rejects a child row whose parent doesn't exist and blocks deleting a parent that still has children. Both checks need the related rows in one place, which ties the data to one database."
- **Phone:** 3 panels → **phone layout**: stacked panels, each 340 wide.
- **Ids:** L-0110, L-0111, L-0112, L-0116.

### RuleBox sketch §5 (5.3): correctness → SQL, ingestion → non-relational (very broad)
- A hand-drawn balance: left pan a `Cyl` with mono `ACID ✓`; right pan a fire-hose (three heavy `Mark` lines ↓) into three small cylinders `×N`. Hand under it `a very broad rule`.
- **Ids:** L-0125.

---

## §6 Slack: the problem and the schema

### Fig 6·a: The requirements card (new)
- **Section:** 6.1.
- **Left:** a hand-ruled card (asymmetric radii, sheet colour, not the PauseAndThink yellow) with five numbered lines: `① one organisation, many users` · `② many channels` · `③ DM a user or post in a channel` · `④ real time` · `⑤ scroll history`. A small chip on the card: hand `text only`.
- **Right:** a small Slack-like sidebar sketch (the Fig 6·d glyph at 60%), hand `this, done well`.
- **desc:** "The design covers one part of Slack: one organisation with many users and channels, DMs and channel posts, delivered in real time, with scrollable history."
- **Phone:** card above sketch, no second layout.
- **Ids:** L-0147, L-0148.

### Fig 6·b: Five drafts of `messages` (D-02 intermediate forms, StepThrough)
- **Section:** 6.3. **Board:** D-02 build-up, frames `b_010630.jpg` (01:06:30), `b_010845.jpg` (01:08:45), `b_010945.jpg` (01:09:45), `b_011145.jpg` (01:11:45). Drafts 2, 3 and 5 were spoken, not drawn; they are drawn here in the same table style.
- **Layout:** the `users`, `channels` and `membership` column-lists stay fixed at the top in graphite (as on the board, small). The `messages` column-list is redrawn at each step. Rejected parts are struck through in red with the one-line reason in red hand lettering beside them. Past steps ghost at 38%.
- **Steps:**
  1. `messages`: mono `sender_id · channel_id · receiver_id · msg`, a brace over `channel_id`/`receiver_id` with hand `one is always null`. A red ghost row below with both null, hand red `both null = an orphan row`. *"Draft 1: a channel id and a receiver id, one of them always null. Nothing stops a row where both are null."* (L-0159, L-0161)
  2. Two small tables side by side, mono `channel_messages` and `direct_messages`, the same columns in both; red hand `every new column = two migrations`. Beside it a third mini-table mono `receiver_ids: [B, C, D]`, red hand `breaks when someone joins`. *"Drafts 2 and 3: two tables means double migrations; a receiver array breaks as soon as the channel changes."* (L-0160, L-0162)
  3. `messages`: mono `from · to · msg`, with `to` values mono `CH-42` and `usr-7`; red hand `string processing to pick the join`. *"Draft 4: one `to` column with a CH- or usr- prefix. Every query must parse the id to know which table to join."* (L-0163)
  4. `messages`: mono `from · to · type: ch/u · msg`, the board's curved arrow from `to` back to `channels` drawn graphite and crossed red, hand red `no foreign key on to`; hand red `ifs and elses everywhere`. *"Draft 5: add a type enum. Still no foreign key on `to`, and the business logic fills with ifs and elses."* (L-0164, L-0165)
  5. `messages`: mono `from · msg` (no destination), red hand `then how do you render a channel?` Beside it the good half of the last suggestion: a channel glyph with two users, green hand `give two people a common channel`, and a red-struck mono `+ pub/sub topic`, hand red `unnecessary complication`. *"Two last ideas: a message that doesn't know where it goes can't be rendered by channel. Giving a DM its own channel works; the pub/sub part doesn't."* (L-0166, L-0167)
  6. `messages`: mono `from · channel_id · msg` (board `b_011145.jpg`), green tick, hand `one channel_id, always`. *"What survives: every message has one channel_id. 6.4 makes a DM a channel."* (L-0168)
- **Colours:** red strikes and reasons; green for the surviving parts.
- **desc:** "Six steps through the class's drafts of the messages table, each rejected for a concrete reason, ending with one channel_id per message."
- **Phone:** lane figure at 420; the fixed tables shrink to their headings only (`users · channels · membership`).
- **Ids:** L-0159, L-0160, L-0161, L-0162, L-0163, L-0164, L-0165, L-0166, L-0167, L-0168.

### Fig 6·c: The Slack schema (D-02 redraw; built up in 6.2, finished in 6.4)
- **Board:** D-02, frame `b_011730.jpg` (build-up `b_010400.jpg`, `b_010500.jpg`, `b_010600.jpg`). The `user.channel` → `Membership` rename is at `b_010500.jpg`/`b_010600.jpg`.
- **Parts:** four column-lists side by side, each heading underlined: `users` (`id`, `name`) · `channels` (`id`, `org`, `name`, `type : grp/user/reg`) · `membership` (`user_id`, `channel_id`, `[ checkpoint ]`) · `messages` (`from`, `channel_id`, `created_at`, `msg`). Above: hand `Brainstorm: channels, messages, checkpoints, realtime communication (membership)`.
- **Under `users`:** hand `DM = channel with 2 people` (the board's words).
- **6.2 state (built up):** only the three headings `users · channels · membership`, with `membership` written over a struck-through mono `user_channel` (graphite strike, not red: it is a naming lesson), hand `a noun gets a persona`.
- **6.4 state (final):** everything above; `type` and `[ checkpoint ]` are the two lines added last, drawn at full ink with a small hand `+` beside each. Thin graphite connector lines: `membership.channel_id` → `channels.id`, `messages.channel_id` → `channels.id`, `membership.user_id` → `users.id` (orthogonal).
- **Colours:** graphite only.
- **desc:** "Four tables: users, channels with a type, membership with a checkpoint, and messages that always point at one channel. A direct message is a channel with two people."
- **Phone:** 4 lists → **phone layout**: a 2 × 2 grid (`users` `channels` / `membership` `messages`), connectors dropped, the caption names the keys.
- **Ids:** L-0156, L-0157, L-0168, L-0172, L-0174, L-0175.

### Fig 6·d: The sidebar (new; shared by 6.4 and 6.5)
- **Section:** 6.4 (left half), 6.5 (both).
- **Left, a Slack-like sidebar:** heading hand `channels` with mono `# general` (unread badge mono `12`), `# standup`; a rule; heading hand `direct messages` with mono `user B`, `user C`. Leader lines: hand `type = reg / grp → top half`, `type = user → bottom half`.
- **Right (6.5), the open channel pane:** five message lines (short ink dashes), a dashed graphite rule across between line 2 and 3, hand `you last read until here`, and a small down-chevron hand `jump here`. Leader from the badge `12` and the rule to a mono chip `membership.checkpoint`.
- **Colours:** graphite only. The unread badge is a graphite filled circle with `--fig-bg` lettering, not Slack's red (red means failure here).
- **desc:** "The channel type decides whether a conversation sits with channels or with direct messages. The checkpoint on membership gives the unread count, the 'last read' line and the jump."
- **Phone:** two panels, stack.
- **Ids:** L-0172, L-0175, L-0176, L-0177.

### RuleBox sketch §6 (6.5): nouns, and piggyback
- Mono `user_channel` struck through, `membership` written over it in hand; a new column mono `checkpoint` sprouting from it with a `+`. Hand `no ifs and elses`.
- **Ids:** L-0157, L-0181.

---

## §7 Sending a message: guarantees first

### Fig 7·a: Two kinds of connection, one sharded store (D-03 redraw, with D-07 folded in)
- **Board:** D-03, frame `b_014645.jpg` (also `b_012445.jpg`). D-07, frame `b_022027.jpg`, is folded in (reason below).
- **Parts:** two `Actor`s mono `A` (top) and `B`. Middle: a `Fleet 3` mono `api` (top) and a `Fleet 3` of edge servers mono `ws` (below), joined by a vertical line (the board's 01:45 line, graphite). Right: three shard `Cyl`s under hand `any DB you can shard` (the board's `MySQL / Cassandra / Mongo`, written as mono `mysql / cassandra / mongo` small beneath).
- **Arrows (orthogonal):** A → `api` and B → `api` solid; A and B to the `ws` fleet with WS lines (two each, as the board's yellow arcs). `api` → shards solid, labelled mono `channel_id → shard`.
- **D-07 folded:** the `api` fleet gets a thin outline box around it labelled hand `messaging service` with a small `lb` bar at its left edge, and the A → `api` arrow is labelled mono `send_message(from_user, to_channel, text)` + hand `REST`. Under the shards: hand `a channel's messages all in one shard` (L-0314). **Reason for folding:** D-07 draws the same API path to a partitioned DB with the REST call written under it. A separate figure would repeat Fig 7·a's top half; the call itself is the 7.1 CodeBlock.
- **Board text not redrawn:** `Socket?? Definitely / Freq Commⁿ` (the student proposals) live in 7.2's prose, not the figure.
- **Colours:** graphite (architecture). In 7.2 (reuse) the two connection types are labelled hand `HTTP to the API` and `WS to the edge` only.
- **desc:** "Users hold two kinds of connection: HTTP to the API servers and a WebSocket to the WebSocket servers. The API servers write each message to the shard chosen by its channel id."
- **Phone:** 8 glyphs → **phone layout**: users on top, `api` and `ws` fleets side by side under them, shards at the bottom; the `send_message` label moves into the caption.
- **Ids:** L-0187, L-0194, L-0314, L-0316, L-0317.

### Fig 7·b: Grey, then black (new)
- **Section:** 7.2.
- **Parts:** two frames of one chat bubble mono `standup in 5`: left in `--ink-3` (grey) with hand `sending…`; right in full ink with hand `sent`. Between them a small clock glyph and hand `a visible delay`.
- **Under:** hand `a hint, not proof` (L-0203).
- **desc:** "On Slack a sent message first shows grey, then turns black after a short delay. That delay hints that sending goes through an ordinary request rather than the open WebSocket."
- **Phone:** frames stack, no second layout.
- **Ids:** L-0202, L-0203.

### Fig 7·c: 3 ways to persist the message (D-04 redraw)
- **Board:** D-04, frame `b_022045.jpg` (heading at `b_014609.jpg`, `b_014630.jpg`).
- **Parts (desktop, as the board):** left, two `Actor`s (users). An `lb` bar → `Fleet 3` mono `api` → three shard `Cyl`s top right (orthogonal elbows). Middle: a `kafka` pipe; right of it three `Worker`s mono `worker`, each with an elbow up into the shards. Bottom centre: the edge-server glyph mono `edge server`. Users → edge server: two WS lines labelled mono `WS`. `api` (lowest) → edge server: solid line. Edge server → `kafka`: dashed.
- **Arrows:** ① user → `lb` → `api` → shard (solid), then `api` → edge server (solid, hand `then tell the edge`) → the other user over WS. ② user → edge server over WS → the other user; edge server → `kafka` (dashed); worker → `kafka` (dashed, hand `pull`); worker → shard (solid). ③ user → edge server over WS → the other user; nothing else.
- **Numerals and names:** circled `Num` ① above the `api` column, ② above the pipe, ③ above the edge server, as on the board. Under each numeral, hand: `① Slack (the instructor's hypothesis)`, `② a WhatsApp-like app (hypothetical)`, `③ Zoom chat`.
- **Caption line on the figure (bottom):** hand `Depending on criticality of "persistence" we pick one over other` (the board's words).
- **Speech bubble** (§7 misconception) on the edge server: `the socket's open, send on me?`
- **Colours:** **graphite only.** The board's white/green/blue paths are not reused (see Marker colours). The red emphasis routes (01:39–02:20) are dropped.
- **NotationKey reminder:** a small boxed pair beside the figure: the `kafka` pipe (`keeps messages, consumers pull`, as in Lecture 02) and the edge-server glyph (`a WebSocket server, not a CDN edge`).
- **desc:** "Three ways to persist a message on one system. ① Over HTTP to an API server that saves it and then tells the edge server to deliver it. ② Over the WebSocket to the edge server, which delivers it at once and hands it to Kafka for workers to save later. ③ Over the WebSocket, delivered and never saved."
- **Phone:** 14 glyphs → **phone layout**: three stacked strips, one per path, each with only its own parts: ① `user → lb → api → db ✓ → edge → user`; ② `user → edge → user` with `edge ⇢ kafka ⇠ worker → db` under it; ③ `user → edge → user`. Numerals and names at each strip's left.
- **Ids:** L-0204, L-0205, L-0209, L-0214, L-0220, L-0222.

### RuleBox sketch §7 (7.3): different guarantees, different architecture
- One user on the left with three tiny paths fanning right, numbered ①②③, each ending in two small marks in order: ① green `saved` then `shown`; ② `shown` then green `saved` (dashed); ③ `shown` only. Hand under: `pick by how critical persistence is`.
- **Ids:** L-0219, L-0222, L-0186.

---

## §8 Scaling WebSocket servers

### Fig 8·a: Four connections, five users (D-05 first form, StepThrough) with Fig 8·a′ inside
- **Section:** 8.1. **Board:** D-05, frames `b_015845.jpg` (two servers) and `b_020445.jpg` (membership lists); D-12 `b_023012.jpg` (local connection pool, folded in, below).
- **Layout:** left, a fixed list hand `Channel 1 (C1)` with mono `A B C D E`. Middle, two edge-server glyphs mono `ws1` and `ws2`, each with 4 connection slots. Users as letters on short stub lines above/left of the servers, as on the board.
- **Steps:**
  1. `ws1` alone, its four slots empty, a red cap tick after slot 4, hand red `limit: 4 (toy number; real servers hold far more)`. *"Assume a WebSocket server can hold four connections. Real servers hold far more."* (L-0242)
  2. A, B, C, D connect: four blue-filled slots, WS lines. E arrives, `ws1` is full, E connects to `ws2` (one slot). *"A, B, C and D fill WS1, so E connects to WS2."* (L-0243, L-0244)
  3. A sends `standup in 5` (blue square on A's WS line) → `ws1` → B, C, D (three blue arrows); A gets nothing back, hand `sender skipped`. *"WS1 knows who is in C1, skips the sender and sends to B, C and D."* (L-0250)
  4. E on `ws2` gets nothing: a red `?` at E. Hand `like two friends in another hotel room` (L-0252). *"But E is in C1 too, on another server. How does it get the message?"* (L-0251)
- **Fig 8·a′ (static panel under the step strip, always visible):** the membership each server keeps (board `b_020445.jpg`): under `ws1` mono `A→C1 · B→C1 · C→C1 · D→C1`; under `ws2` mono `E→C1`. Inside the `ws1` box, the D-12 detail: a small yellow-on-board box of squares redrawn graphite, hand `local connection pool` (left leader) and mono `socket.io server` (right leader). Hand under: `the client sends its channels after connecting` (L-0247) and `kept eventually consistent` (L-0249).
- **desc:** "Five users in one channel, a four-connection limit: A to D share WS1 and E lands on WS2. WS1 delivers locally to B, C and D, but nothing reaches E."
- **Phone:** lane figure at 420; Fig 8·a′ lists move under each server.
- **Ids:** L-0242, L-0243, L-0244, L-0245, L-0247, L-0248, L-0249, L-0250, L-0251, L-0252.

### Fig 8·b: TCP links → mesh (D-05 + D-13, StepThrough; steps 1–2 in 8.2, step 3 in 8.3)
- **Board:** D-05, frames `b_015845.jpg` (two-server TCP), `b_020115.jpg` (three servers), `b_020445.jpg` (final mesh). D-13, frame `b_023009.jpg` (`We Bridge the Gap`, the recap), is folded into step 1's hand label (reason: it restates step 1 in the recap).
- **Layout:** the Fig 8·a end state (ws1 with A–D, ws2 with E) carried over at 38%, then:
- **Steps:**
  1. A plain line `ws1` — `ws2`, mono `tcp` (not WS), hand `we bridge the gap`. The message (blue square) travels A → `ws1` → B, C, D and along the `tcp` link → `ws2` → E, green tick at E. Each server gains one red peer slot after its cap tick. *"WS1 opens one plain TCP connection to WS2 and relays the message. WS2 finds E and delivers."* (L-0258, L-0259, L-0260)
  2. `ws3` appears below `ws2` with user F (mono `F→C1`); a second `tcp` line `ws1` — `ws3`. The message reaches E and F, green ticks. *"F joins C1 on WS3. WS1 opens a second link, and everyone in C1 gets the message."* (L-0261)
  3. (8.3) A fourth server (unlabelled on the board → mono `ws4`); `tcp` lines between every pair: the square plus both diagonals, six links (the board's form, `TCP` at the crossing). Each server's slot strip now shows 3 red peer slots. The board's blue dashed loops around the ws1–ws2 link become one graphite hand loop with hand `every server ↔ every other`. *"Add servers and every one links to every other: a mesh."* (L-0265)
- **desc:** "WS1 reaches E with one TCP link to WS2, then F with a link to WS3. With four servers, every server is linked to every other: a mesh of six links."
- **Phone:** lane figure at 420; the mesh step uses a 2 × 2 server grid (as the board).
- **Ids:** L-0258, L-0259, L-0260, L-0261, L-0265.

### Fig 8·c: Where WS1's seven connections go (new)
- **Section:** 8.3.
- **Parts:** one horizontal bar of 7 slots under mono `ws1`: slots 1–4 blue-filled, mono `A B C D`; slots 5–7 red-filled, mono `ws2 ws3 ws4`. A red `Bracket` over 5–7, hand red `3 serve no user`. A blue bracket over 1–4, hand `the job: serve users`.
- **Speech bubble** (§8 misconception) on `ws1`: `just 3 links…` (the class's "you have to do it, there's no other way", L-0263).
- **Small hand note right:** `100 servers → 99 links each` (D-13's question, arithmetic from L-0265).
- **desc:** "In a four-server mesh, a server with four users holds seven connections, and three of them only talk to other servers."
- **Phone:** single bar, author at 340; no second layout.
- **Ids:** L-0276, L-0277, L-0263.

### RuleBox sketch §8 (8.2): start simple, then make it better
- Three steps with `→` between: `ws1` —`tcp`— `ws2`; then four servers on one pub/sub pipe; then a small `balancer` box above them. Hand under each: `the bare minimum`, `then better`, `then better`.
- **Ids:** L-0264, L-0259.

### Fig 8·d: One Pub/Sub in the middle (D-06 redraw, without the Balancer; D-13 question folded in)
- **Section:** 8.4. **Board:** D-06, frames `b_021000.jpg`, `b_021130.jpg` (pipe, before the Balancer), final `b_021900.jpg`. D-13, frame `b_023009.jpg`.
- **Parts:** the same four edge servers as Fig 8·b step 3 (mesh erased). A horizontal pub/sub pipe in the middle, mono `redis` with hand `real-time pub/sub` (the board's `Redis / Realtime PubSub`). Short orthogonal elbow lines from each server into the pipe (one each, mono `tcp` once). WS1 with A–D, WS2 with E, F, WS3 with G, H (as `b_021900.jpg`), WS4 empty.
- **Slot strips:** each server shows its user slots blue and, after the cap tick, **one** graphite slot for its pub/sub link (no red slots any more); hand under ws1 `4 users + 1 link` (L-0280).
- **D-13 folded:** a hand note top-left, `100 servers, every one to every other? Not a great idea! Can we do better?` (the board's words, recap page). **Reason:** D-13 is the recap of D-05 → D-06 with no new structure.
- **Hand notes:** `pushes to whoever is subscribed right now` (L-0281), `keeps nothing` (L-0282), `real-time, not Kafka` (L-0279).
- **desc:** "Each WebSocket server keeps one connection to a real-time Pub/Sub instead of one to every other server. The Pub/Sub pushes each message to the servers subscribed at that moment and stores nothing."
- **Phone:** 9 glyphs → **phone layout**: the pipe vertical in the centre, servers alternating left and right of it, users as letters only.
- **Ids:** L-0278, L-0279, L-0280, L-0281, L-0282, L-0283.

### Fig 8·e: One edge server, its users' Slack channels (D-10 redraw)
- **Section:** 8.5. **Board:** D-10, frame `b_022515.jpg` (also `b_023003.jpg`).
- **Parts:** an edge-server glyph mono `edge server`, users `B`, `A` above and `C`, `D` at the left on stub lines. Beside each user, mono channel lists: `A (c1, c2, c3)`, `B (c2, c4, c5)`, `C (c1, c3)`, `D (c4)`. One solid arrow edge server → pub/sub pipe, mono `SUB(c1,c2,c3,c4,c5)`. The pipe shows its dotted lanes labelled mono `c1 … c5`. Under the pipe: hand `real-time pub/sub [redis]`.
- **Labels:** hand with an arrow to the pipe `one pub/sub channel for each Slack channel`; small hand `* can be optimized` (the board's note, L-0337). Hand under the server: `the server subscribes, not the user` (L-0290).
- **desc:** "An edge server collects the Slack channels of all its connected users and subscribes once to the matching Redis channels: c1 to c5."
- **Phone:** 7 glyphs; author at 340 with the channel lists stacked under the server; no second layout.
- **Ids:** L-0289, L-0290, L-0291, L-0336, L-0337.

### Fig 8·f: One message through Redis, then a new channel (new, StepThrough)
- **Section:** 8.5.
- **Layout:** lanes, time running down: `A` · `ws1 (A B C D)` · `redis pub/sub` · `ws2 (E F)` · `ws3 (G H)`. Subscriptions shown as mono tags under each server: `ws1: c1`, `ws2: c1`, `ws3: c2`. An `api` + `db` pair sits at the right edge for steps 5–7.
- **Steps:**
  1. A → `ws1`, blue, mono `C1: "standup in 5"`. *"A posts in Slack channel C1. WS1 receives it."* (L-0292)
  2. `ws1` → B, C, D, blue. *"WS1 delivers to its own C1 members first: B, C, D."* (L-0283, L-0250)
  3. `ws1` → pipe, blue, mono `PUBLISH c1`. Pipe → `ws2`, blue (head at ws2), hand `pushed, not pulled`. No arrow to `ws3`, hand `subscribed to c2 only`. *"WS1 publishes on Redis channel c1. Redis pushes it to WS2, the only other server subscribed to c1."* (L-0292, L-0293, L-0287)
  4. `ws2` → E, F, blue, green ticks. *"WS2 delivers to E and F. Minimal connections, and only servers that need it."* (L-0292, L-0294)
  5. A → `api` → `db`, blue, mono `create channel c3 (A, D)`; green tick at db. *"A creates channel c3 with D: an API call updates the database."* (L-0364)
  6. `api` → pipe, dashed graphite, mono `new channel c3: A, D`; pipe → `ws1`, `ws2`, `ws3`, graphite (head at each server). Hand `who publishes isn't specified in class; drawn from the API server`. *"A "new channel" notification goes through Redis to the edge servers, and A and D see it in real time."* (L-0365)
  7. A's and D's clients → `ws1`, mono `I'm in c3 too`; `ws1` updates its tag to `ws1: c1, c3` and → pipe mono `SUBSCRIBE c3`. Footer hand `also: a periodic meta call listing my channels` (L-0367). *"The clients tell WS1 they are in c3. WS1 updates its memory and subscribes to c3."* (L-0366, L-0367)
- **desc:** "A message for C1 is delivered locally by WS1, published once to Redis and pushed only to WS2, which delivers to E and F. A new channel is created through the API, announced through Redis, and WS1 subscribes to it."
- **Phone:** lane figure at 420 (five lanes at ~80 units each; server names in mono 12.5).
- **Ids:** L-0250, L-0283, L-0287, L-0292, L-0293, L-0294, L-0364, L-0365, L-0366, L-0367.

### Fig 8·g: Ask the Balancer, then connect (D-06 redraw, with the Balancer)
- **Section:** 8.6. **Board:** D-06, frame `b_021900.jpg` (Balancer at `b_021530.jpg`, `b_021545.jpg`).
- **Parts:** Fig 8·d's servers and pipe at 38% except `ws1`. User `A` (Actor) above `ws1`. A Balancer glyph mono `balancer` to A's right (the board's purple box, graphite).
- **Arrows:** ① A → `balancer`, solid graphite, hand `where do I connect?`; ② `balancer` → A, graphite return, mono `ws1`; ③ A → `ws1`, WS line drawn, blue. Board label kept as hand: `balance connections` (the board's `Balance Connectn`).
- **Hand notes:** `like DNS, not DNS` (L-0298); `same org → same server: Redis only for the worst case` (L-0342, L-0381); `not a load balancer` (L-0341).
- **desc:** "Before connecting, the Slack client asks the Balancer which edge server to use and gets an address. The Balancer keeps an organisation's users on one server so their messages rarely touch Redis."
- **Phone:** focus crop (A, balancer, ws1, pipe stub) → **phone layout** at 340.
- **Ids:** L-0297, L-0298, L-0341, L-0342, L-0381, L-0301.

### Fig 8·h: A server dies (new, StepThrough)
- **Section:** 8.6.
- **Layout:** lanes `org's users A B C D` · `balancer` · `ws1` · `ws2` · `ws3` · `redis pub/sub`. Start: A–D all on `ws1` (blue slots), hand `one org, one server`.
- **Steps:**
  1. `ws1` crossed red, its slots empty, A–D's WS lines dashed red. *"WS1 dies. Its users lose their connections."* (L-0302)
  2. A–D → `balancer`, graphite, hand `where do I connect?`; the balancer marks `ws1` with a red ✕ in a small list. *"They ask the Balancer again. It notices WS1 is gone."* (L-0302)
  3. Replies mono `ws2` to A, B and `ws3` to C, D; new WS lines (blue). *"It hands out other servers. For a while the organisation is split across WS2 and WS3."* (L-0303)
  4. A posts in C1: `ws2` → B (blue); `ws2` → pipe `PUBLISH c1`; pipe → `ws3` → C, D (blue). Hand `Redis carries it for now: perfectly fine`. *"Their messages now go through Redis. That's fine for a while."* (L-0303)
  5. The balancer moves C, D to `ws2` (a periodic rebalance: their `ws3` lines end, new lines to `ws2`); the pipe goes quiet for this org, hand `Redis IO back to the worst case only`. *"Later the Balancer regroups them on one server, and Redis is out of the path again."* (L-0304, L-0300)
- **desc:** "When an edge server dies, its users ask the Balancer again and are spread over other servers, so their messages travel through Redis until the Balancer regroups them."
- **Phone:** lane figure at 420.
- **Ids:** L-0300, L-0302, L-0303, L-0304.

---

## §9 The whole system

### Fig 9·a: One WebSocket to our infra, a fleet of edge servers (D-08 redraw)
- **Section:** 9.1. **Board:** D-08, frames `b_022057.jpg` (part 1) and `b_022445.jpg` (part 2).
- **Panel 1:** one `Actor` → WS line, mono `WS` → `Cloud` hand `our infra`. Hand with an arrow at the line: `persistent TCP`. Hand under: `1 websocket for anything and everything realtime` (the board's sentence, shortened).
- **Panel 2:** three `Actor`s, each with a WS line mono `WS`, to a `Fleet 4` of edge servers, mono `ws edge servers`. Hand right: `chat, notifications, … all go through here` (the board's `Any service chat, notification, etc …`).
- **Board text not redrawn:** `Because WebSockets are expensive and browsers have a 6 concurrent TCP connection limit` is the claim SN-07 corrects; it stays in the prose with its note, not in the figure.
- **desc:** "Each user keeps one WebSocket open to the backend for everything real-time. Those connections land on a fleet of edge servers that every real-time service goes through."
- **Phone:** two panels, stack (panel 2 has 5 glyphs).
- **Ids:** L-0319, L-0323, L-0327, L-0330.

### Fig 9·b: The overall architecture (D-11 redraw; D-09 and D-12's flow folded in)
- **Section:** 9.2. **Board:** D-11, frames `b_022945.jpg` and `b_022730.jpg` (Balancer added from 02:28:00). D-09 `b_022500.jpg` and D-12 `b_023012.jpg` folded in (reasons below).
- **Desktop (880 units), as the board:**
  - Top left: hand `overall architecture`; the Balancer glyph mono `balancer` with a graphite arrow pair to user A (asked, answered).
  - Left: users mono `A`, `B`, `C` (letters on stubs; one `Actor` for A) with WS lines mono `WS` to a `Fleet 3` of edge servers, mono `edge servers`, hand `(membership)` above.
  - Right of the edge servers: a horizontal pub/sub pipe, mono `redis pub/sub` hand `[clustered]`; a vertical line mono `tcp` from the pipe up to a second edge-server box (top right) with users `D`, `E` on WS lines.
  - Down from the edge servers: dashed arrow into a vertical `kafka` pipe; three `Worker`s mono `messaging service workers` each with a dashed arrow back up to `kafka` (hand `pull`, once); workers → three shard `Cyl`s mono `messages db (partitioned)`, solid.
  - Bottom left: user C → `lb` → `Fleet 3` mono `api servers` → the messages db, solid. Hand list beside the api servers: `non-realtime API · channel scroll · muted channels`.
- **D-12 folded (the edge's three steps):** small circled numerals on the A → edge → B path: ① at edge → `kafka` hand `persist in kafka`, ② inside the edge box hand `find B in the local pool`, ③ at edge → B hand `send to B` (the board's `1. Persist message in Kafka 2. Find B in the local pool 3. Send message to B`). **Reason:** D-12 is the zoomed-in recap of exactly this path; drawing it again would be a fourth edge-server diagram.
- **D-09 folded:** D-09 (`Edge Server → Kafka → workers → Messages DB`, `Messaging Svc` for non-realtime) is the left half of D-11 drawn earlier; every part and label is in this figure. Its insight text (`Messages once sent will always be persisted …`) is 9.3's opening (prose + clip), not a figure label.
- **Colours:** graphite (architecture), except a thin blue path for one message A → edge → ① `kafka` / ③ B, so the numerals have something to sit on. The board's red emphasis arcs are dropped.
- **Persistence dial (for the §9 RuleBox, not here):** see the rule sketch.
- **desc:** "Users hold one WebSocket each to the edge servers, which share messages through a clustered Redis Pub/Sub and hand them to Kafka; workers write them to a partitioned messages database. A separate load balancer and API servers handle non-real-time requests such as scrolling a channel. A Balancer tells each client which edge server to use."
- **Phone (required, outline):** **phone layout** at 340: a vertical real-time column (balancer → users → edge servers → pub/sub → second edge servers) on top; under it the persistence column (`kafka` → workers → db); the API column (user → `lb` → api servers → the same db) stacked last with a hand `non-realtime` label. Numerals ①②③ kept; the api hand list moves into the caption.
- **Ids:** L-0335, L-0338, L-0339, L-0310.

### RuleBox sketch §9 (9.2): change only the guarantees
- The overall diagram in miniature (users, edge, pub/sub, db) with the persistence path drawn as a small three-position dial mono `① sync · ② async · ③ none`, the pointer on ②. Hand `swap the path, keep the rest`.
- **Ids:** L-0340.

### Fig 9·c: Two ways in (new; D-12's membership sketch folded in)
- **Section:** 9.4.
- **Panel a `exposed`:** client `Actor` → WS line → edge-server glyph (no `lb`). Inside the edge box a small key glyph mono `kafka: write-only`; a crossed-out key mono `db creds` beside it, hand red `never here`. Hand `hardened: ports hidden, no SSH` (L-0357).
- **Speech bubble** (§9 misconception) on the exposed edge: `public = unsafe?`
- **Panel b `behind a load balancer`:** client → `lb` → edge-server glyph; hand on the `lb` hop `+3–5 ms per hop (instructor's estimate)`; hand `sticky: one connection to the lb, one to the server` (L-0356). The same `kafka: write-only` key inside the edge.
- **Panel b, lower row (D-12 folded):** the private edge server → `Box` mono `membership api` → `Cyl` mono `db`, solid graphite, hand `private channels: check membership here` (L-0375). **Reason:** D-12's bottom sketch (`edge server → Membership → DB`, "a channel with 50 people") is the board's only drawing of an edge server consulting membership; it belongs with the server-side check the class arrived at in 9.4.
- **desc:** "An edge server can face the internet directly, holding only a write-only Kafka credential, or sit behind a load balancer for a few milliseconds more. Behind one it can safely ask a membership API before serving private channels."
- **Phone:** 2 panels, 9 glyphs → **phone layout**: panels stacked, panel b's membership row under its edge server.
- **Ids:** L-0353, L-0355, L-0356, L-0357, L-0358, L-0359, L-0375.

### Fig 9·d: Ack after replication (new)
- **Section:** 9.5.
- **Parts:** a `Worker` → `Cyl` mono `node 1` (solid blue, mono `write m42`). Two `Cyl`s mono `node 2`, `node 3` to the right of node 1. **Replicas pull:** solid graphite arrows node 2 → node 1 and node 3 → node 1 (head at node 1), labelled once hand `copy`. Then a green return node 1 → worker, mono `ack ✓`, drawn last with a small numeral ③ (① write, ② copies, ③ ack).
- **Hand notes:** `replication factor 3` (L-0421); `never says "done" before the copies` (L-0424); small caption line `DynamoDB: 2 of 3, see SN-12` (outline).
- **Hand note under the worker:** `holds the message until the commit` (L-0425).
- **desc:** "The worker writes to one node; the write is copied to two more, and only then is it acknowledged. A write lost before that point was never accepted."
- **Phone:** 4 glyphs; author at 340; no second layout.
- **Ids:** L-0421, L-0424, L-0425.

---

## §10 Deleting, ordering, and what to keep

### Fig 10·a: Two ways to delete (new)
- **Section:** 10.1.
- **Panel a `WhatsApp-style`:** two phone glyphs, each holding the same chat bubble mono `standup in 5`. A dashed graphite arrow from phone 1 → (via a small edge-server glyph) → phone 2, mono `delete permanently` (an event). Both bubbles crossed out (graphite strike, not red: a deliberate delete). Hand `the copies live on the devices`.
- **Panel b `Slack-style`:** a messages `Cyl` with the row mono `m42 standup in 5` struck through (graphite), then a blue arrow from the db side (api) → edge server → two users, mono `deleted: m42`, green tick on arrival. Hand `delete in the store, then tell everyone in real time`.
- **desc:** "Where messages live on devices, deleting means telling both devices to drop their copies. Where they live in the backend, you delete the stored row and notify users in real time."
- **Phone:** two panels, stack.
- **Ids:** L-0396, L-0397, L-0398, L-0399.

### Fig 10·b: Two out-of-order cases (new, StepThrough)
- **Section:** 10.2.
- **Layout:** lanes, time running down: `A` · `database` · `B's screen`. Messages mono `①` (`hey`) and `②` (`standup in 5`). The database lane shows insertion order with mono `t1 < t2` (database clock).
- **Steps:**
  1. A sends ① then ②; both stored in order in the database (`t1`, `t2`), green ticks. *"A sends 1 then 2. The database stores them in that order, by its own clock."* (L-0410, L-0412)
  2. Case 1: ② reaches B first, then ①. B's screen shows `② ①` in arrival order (graphite), hand `shown as they arrive`. *"Case 1: message 2 arrives first. Show them in the order they arrive."* (L-0406)
  3. B refreshes (or a background job fetches the last 50): the screen reloads `① ②` from the database, green. *"A refresh, or a job that fetches the last 50, puts them in the database's order."* (L-0406, L-0411)
  4. Case 2: B's state is a list ordered by timestamp. ② arrives and is shown. *"Case 2: keep the screen's list ordered by timestamp. Message 2 arrives first."* (L-0407)
  5. ① arrives late and is spliced in above ②, not appended; a small graphite zigzag hand `flicker`. *"Message 1 arrives late and is inserted in place, with a brief flicker."* (L-0407)
  6. A side note: a client clock mono `01-01-1970` crossed out, hand `never trust the client's clock`; hand `the database's order is the truth`. *"The order is the database's insertion time, never a client clock."* (L-0412, L-0413, L-0415)
- **Colours:** blue for messages travelling, green for the corrected order, no red (nothing failed; out-of-order is expected).
- **desc:** "Messages can reach a screen out of order. Show them as they arrive and let a refresh restore the database's order, or keep the list sorted by timestamp and insert a late message in place."
- **Phone:** lane figure at 420.
- **Ids:** L-0406, L-0407, L-0410, L-0411, L-0412, L-0413, L-0415.

### RuleBox sketch §10 (10.2): design realistic systems
- A hand-ruled list headed hand `100 loopholes`, eight short ink lines, six struck through, two left with green ticks. Hand `how likely? do you need it?`
- **Ids:** L-0418.

---

## Board diagram ledger (every D-xx accounted for)

| D | Board frame | Becomes | How |
|---|---|---|---|
| D-01 Row vs column storage | `b_001845.jpg` | Fig 3·a; clip `l02-column-scan` frame 0 | redrawn |
| D-02 Slack data model | `b_011730.jpg` (+ build-up) | Fig 6·c (6.2 state + final); Fig 6·b steps 1, 3, 4, 6 | redrawn |
| D-03 API, WS, sharded DB | `b_014645.jpg` | Fig 7·a | redrawn |
| D-04 3 ways to persist | `b_022045.jpg` | Fig 7·c; clip `l02-three-ways-to-persist` | redrawn |
| D-05 TCP links and mesh | `b_020445.jpg`, `b_015845.jpg`, `b_020115.jpg` | Fig 8·a, 8·a′, 8·b; clip `l02-mesh-to-pubsub` | redrawn |
| D-06 Redis Pub/Sub + Balancer | `b_021900.jpg` | Fig 8·d (without Balancer), Fig 8·g (with); clip end state | redrawn |
| D-07 Basic REST flow | `b_022027.jpg` | **folded into Fig 7·a** (the `messaging service` outline, `lb`, `send_message` label) | same path as D-03's API half; the call is the 7.1 CodeBlock |
| D-08 One WS to our infra; edge fleet | `b_022057.jpg`, `b_022445.jpg` | Fig 9·a | redrawn (without the 6-connection reason, see SN-07) |
| D-09 Async persistence via Kafka | `b_022500.jpg` | **folded into Fig 9·b** | D-11 contains every part and label of D-09; its insight text opens 9.3 |
| D-10 SUB(c1..c5) | `b_022515.jpg` | Fig 8·e | redrawn |
| D-11 Overall architecture | `b_022945.jpg` | Fig 9·b (with phone layout); its "transient issue" text drives clip `l02-missed-message` | redrawn |
| D-12 Edge internals, local pool | `b_023012.jpg` | **folded into Fig 8·a′** (local connection pool, Socket.IO), **Fig 9·b** (the 1-2-3 steps) and **Fig 9·c** (edge → membership → db) | a zoomed recap of parts already drawn; each piece goes where its point is taught |
| D-13 Bridge the gap → Pub/Sub | `b_023009.jpg` | **folded into Fig 8·b step 1** (`we bridge the gap`) and **Fig 8·d** (the "100 servers… Can we do better?" note) | a recap of D-05 → D-06 with no new structure |

## Phone layouts (13)
Fig 3·a, 3·b, 3·c, 4·c, 5·a, 6·c, 7·a, 7·c, 8·d, 8·g, 9·b, 9·c, plus the NotationKey list form. Every other figure is either ≤ 7 glyphs at ≤ 360 units, a two-panel stack, or a 420-unit step-through. Each clip has its own portrait layout, specified in `animations.md`.
