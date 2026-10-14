# Lecture 07: figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `lectures/lec07/board/diagrams.md` and the clearest frame in `lectures/lec07/board/frames_kept/` (look at it; never embed it: frames show participant tiles). New figures say "new". Each entry lists parts, arrows, labels, marker colours, step text for step-throughs, the mobile layout and the ledger ids it carries.

Totals: **43 drawn items** = 37 numbered figures (4 of them step-throughs) + 6 rule-box sketches (§1–§6). Clip posters are specified in `animations.md`. All 22 board diagrams (D-01..D-22) are redrawn; none is dropped (D-10 and D-11 are the two recap pages and get one figure each; D-22 was only glimpsed and is drawn small and labelled so).

---

## 0. Glyph kit additions (build once, reuse)

Base kit, stroke rules and colour rules are unchanged from `site/FIGURES.md` and `learn/design/B-whiteboard-notebook/NOTES.md`: one 1.7 px stroke, round caps, bow ≤ 1.3, jitter ≈ 0.3, shapes filled with `--fig-bg`, labels on the drawing, never in a legend. Existing parts used here: `Box`, `Cyl`, `Replica`, `Pipe` (Kafka), `Worker`, `Actor` (≤ 3 per figure), `Client`, `Cloud` (S3), `Arrow`, `Label`, `Num`, `Cross`, `Bracket`, `Lifeline`, `TimeAxis`, `Bubble`, `Step`.

New parts this lecture needs (add to `src/figures/kit/`, seeded like the others):

| Part | Drawing | Label |
|---|---|---|
| `LogStrip` | a thin horizontal strip of 6–10 cells attached under a `Cyl`, newest on the right; a small caret marks a read position | mono `binlog` / `wal`; caret hand `checkpoint` |
| `Struct` | a box with a mono header line `MyValue {` and one row per field, closing `}`; rows can be added between stages (same seed so rows don't wobble differently) | mono field names and widths (`type  4 bits`) |
| `BitBar` | a 32-unit horizontal bar split into labelled fields, tick marks every 4 bits | mono widths `4` `28`, `4` `4` `24` |
| `Heap` | a square with a dotted fill level (the board's pink dots → graphite dots) | mono `heap` |
| `Gauge` | a vertical bar with a fill and a horizontal cap line | mono `total_size`, `maxmemory 1 GB` |
| `Ring` | a circle with a small tick at 0 (top), positions written just inside; nodes are small rectangles straddling the circle; keys are small hatched squares | mono `0`, `3`, `cache 1`, `K1` |
| `CurlArrow` | a short clockwise arc along the ring from a key to its owner | hand `owner` |
| `Port` | a small rectangle on a box's left edge | mono `tcp`, `http`, `grpc` |
| `ListNode` | a small circle; nodes joined by `↔` double chevrons | none |
| `Desk` (bank) | the existing `Box` with a hand caption under it (`desk 13`) | hand |

**Arrows.** Solid = synchronous request. Dashed = async (CDC copy, replication, snapshot copy). Open chevron heads on the initiator's direction only. A CDC tool *pulls*: its arrow starts at the CDC box and points at the source's `LogStrip` (hand `reads`), then a second solid arrow CDC → sink (hand `writes`). Orthogonal routing in architecture views; diagonals only in time-sequence views and on the ring (arcs follow the circle).

**Marker colours:** blue = request / data path; green = ack, success, data that arrived; red = failure, lost or stale data, eviction, hard limit; graphite = everything else. The board's pinks, yellows, cyans and purples map to graphite. Colour never encodes box type, and never tells keys or nodes apart (NOTES weakness #3): use mono labels and position.

**Speech bubbles:** at most one per chapter, only for the chapter's misconception: §1 Fig 1·b (the API: "every change has an event, right?"), §2 Fig 2·b (the heap: "full heap → segfault?"), §3 Fig 3·b (the list: "everyone uses me"), §4 Fig 4·a (the HTTP box: "it's the payload size"), §5 none, §6 Fig 6·b (the ring: "I move your data for you").

**Accessibility:** every SVG gets `<title>` = figure title and a `<desc>` that states the mechanism (drafts given as **desc** where it isn't obvious).

**Mobile:** figures with more than 7 glyphs or more than 2 panels get a phone layout below 760 px (`<Desk>` / `<Phone>`). Each entry says how.

---

## §1 ETL and change data capture

### Fig 1·a: Day zero: the dashboard reads production (D-01 redraw)
- **Board:** D-01, frame `b_000500.jpg` (also `b_000415.jpg`).
- **Parts:** `Actor` hand `reader` (left); `Box` mono `api`; `Cyl` mono `mongodb`. Below the row: a small `Box` mono `metabase` with two `Actor`s hand `analysts`.
- **Arrows:** reader → api → mongodb (solid, graphite). metabase → mongodb (solid, **blue**, hand `fires queries on prod`). A second, dashed graphite arrow metabase → a dashed `Replica` beside mongodb, hand `usual first step: a replica` (A-E-01).
- **Labels:** hand `no warehouse yet`; mono `pii` tag on the mongodb cylinder (small).
- **Colours:** blue on the analyst query path; red ring around the `pii` tag (risk).
- **Mobile:** fits (6 glyphs).
- **Ids:** L-0012, L-0015 (+A-E-01), L-0018.

### Fig 1·b: Events through Kafka, and where they leak (D-02 redraw)
- **Board:** D-02, frame `b_000845.jpg` (also `b_000830.jpg`).
- **Parts:** top row: reader → `api` → `mongodb`. From `api` an elbow arrow down to a `Pipe` mono `kafka` with one cell labelled mono `blog_published{id}`. Three `Worker`s mono `consumer`. A `Cyl` mono `mysql`. Two `Actor`s hand `insights` with an arrow up into mysql.
- **Arrows:** api → kafka (solid blue, hand `publish`); kafka ← consumers (consumers pull; heads at kafka); consumers → mysql (solid blue). A thin graphite arrow consumer → mongodb, hand `fetch the rest` (thin event).
- **Red marks (the four gaps, numbered with `Num`, each a short hand label at the spot):**
  1. on mongodb: a small change mono `views++` with no arrow out, hand `no event` (L-0026); plus a tiny `Worker` mono `likes job` writing mongodb directly, hand `no API call at all` (L-0346).
  2. on the consumer → mongodb arrow: hand `event lacks data → extra reads` (L-0027).
  3. on the api → kafka arrow: a `Cross`, hand `saved, then crashed before publish` (L-0028).
  4. beside mysql: hand `new table? did someone add its event?` (L-0049).
- **Speech bubble** (§1) on the api: `every change has an event, right?`.
- **Caption line:** "Kafka never reads MySQL here: workers consume what the API published." (L-0345)
- **Mobile:** phone layout: vertical stack (api, kafka, consumers, mysql), gap markers keep their numerals, labels move under the stack as a numbered list tied to the numerals.
- **Ids:** L-0024, L-0026, L-0027, L-0028, L-0049, L-0345, L-0346.

### Fig 1·c: Change data capture (D-03 redraw)
- **Board:** D-03, frame `b_001330.jpg` (also `b_001045.jpg`).
- **Parts:** reader → `api` → `Cyl` mongodb with a `LogStrip` mono `oplog / binlog` under it. Below: a stack of three `Box`es mono `cdc` with hand `airbyte · debezium` beside it. `Cyl` mono `mysql` to the right. A small `Box` mono `transform` drawn inside the CDC stack as a band.
- **Arrows:** cdc → LogStrip (dashed graphite, hand `reads`), cdc → mysql (solid green, hand `writes, in your format`). A faint list of alternate sinks under mysql: mono `kafka · sqs · kinesis · disk` (L-0042).
- **Inset (small, right):** a `Blogs` table with three rows changing (`insert`, `update`, `delete`) and three small message squares out of the log: hand `one event per changed row` (L-0041).
- **Mobile:** inset moves below.
- **Ids:** L-0029, L-0031, L-0032, L-0041, L-0042.

### Fig 1·d: Two ways to read the source (new)
- **Panel a "scan the rows":** a table glyph (5 rows), a caret moving top to bottom, hand `iterate rows`, a red mark on a deleted row that the caret never sees: hand `a delete between scans is missed` (A-CDP-01).
- **Panel b "tail the log":** `Cyl` + `LogStrip` with commits `c1 … c6`; caret at `c4` hand `checkpoint`; arrow from cdc to the caret (dashed, `reads`). Commits c5, c6 drawn as a bracket hand `one transaction, written at commit` (L-0072).
- **Panel note under both:** hand `which one you get depends on what the database exposes` (L-0038, see SN-01).
- **Mobile:** panels stack.
- **Ids:** L-0036, L-0037, L-0038, L-0072; additions A-CDP-01, A-CDP-14.

### Fig 1·e: One source, many tiers (D-04 redraw)
- **Board:** D-04, frame `b_024345.jpg` (also `b_001645.jpg`).
- **Parts:** four columns with hand headings `transactional`, `search`, `analytics`, `backup`. Under them `Cyl` mysql, `Cyl` elasticsearch, `Cyl` redshift, `Cloud` s3. Three `Box`es mono `cdc`.
- **Arrows (orthogonal):** cdc → mysql's log (dashed `reads`), cdc → elasticsearch (solid green); cdc (bottom) → mysql's log, → redshift; cdc → redshift (`reads`), → s3 (solid green). Board's cyan arrows → graphite reads + green writes.
- **Labels:** caption line from the board footer: "Implement a quick CDC with Airbyte; we'll use it a lot." A small hand note on the first two cdc boxes: `could be one CDC with two sinks` (L-0374), and `one transform per sink → more memory` (L-0375).
- **Honest tag:** small hand `tiered storage: introduced here, built in a later week` at the bottom right.
- **Mobile:** phone layout: one column per tier, stacked top to bottom with cdc boxes between them.
- **Ids:** L-0047, L-0048, L-0051, L-0374, L-0375.

### Fig 1·f: Sixty machines down to two (new)
- **Panel a "before":** `api` → `Pipe` kafka → a grid of small `Worker`s (draw 12 with hand `×60, 32 GB each`) → `Cyl`; hand `one event, one read, one write`. A red `Cross` on a dropped message hand `silently out of sync`.
- **Panel b "after":** source `Cyl` + LogStrip → two `Box`es mono `ec2` hand `airbyte cdc` → target `Cyl`; green writes, hand `batched`.
- **Caption:** "The instructor's consulting story: that subsystem's infra cost fell about 80% (as he tells it)."
- **Mobile:** panels stack.
- **Ids:** L-0053, L-0060, L-0061, L-0062.

### Rule sketch §1
A `Cyl` with a `LogStrip`; one dashed arrow from a small `cdc` box to the log, one solid arrow to a second `Cyl`. Hand `source of truth` on the first cylinder. Ids: L-0031, L-0046.

---

## §2 One node, every byte counted

### Fig 2·a: The struct that grows, stage 1 (new; stages 2 and 3 in Fig 3·a, Fig 3·d)
- **Panel 1 (2.2):** a hash table (3 slots, mono `k1 k2 k3`), each slot's arrow to a value blob. Hand `storage = a hash table`.
- **Panel 2 (2.3):** the value blob is replaced by `Struct` `MyValue { value* ; type }`, `value*` arrowing to four small shapes (mono `string`, `set`, `list`, `bloom`). `BitBar` under `type`: only the first 4 bits filled, hand `4 bits = 16 types`.
- **Labels:** hand `the key stays a plain key` with a leader to `k2`; mono `0 string · 1 int · 2 set · 3 list`.
- **Mobile:** panels stack.
- **Ids:** L-0087, L-0094, L-0096, L-0097.

### Fig 2·b: When the heap fills (D-05 redraw, corrected panel)
- **Board:** D-05, frame `b_004530.jpg` (also `b_003445.jpg`, `b_023915.jpg` top right).
- **Panel a "the thought experiment":** `Heap` filling with dots; mono `malloc(1 MB) × 1024 = 1 GB`; a 1,025th block hovering above, hand `iteration 1025?`.
- **Speech bubble** (§2) on the full heap: `full heap → segfault?` (the class's answer, L-0104).
- **Panel b "what actually happens":** three short branches from the 1,025th malloc:
  1. mono `malloc → NULL` → green hand `check it, refuse the write`.
  2. hand `Linux overcommit: malloc succeeds` → later, touching pages → red mono `OOM killer · SIGKILL`.
  3. hand `use the NULL anyway` → red mono `SIGSEGV`.
  Small source line under the panel: `man malloc(3), signal(7)`.
- **Panel note:** hand `either way: cap the memory yourself` (L-0107).
- **Mobile:** panels stack.
- **Ids:** L-0101, L-0102, L-0104 (SN-03), L-0107; addition A-DCL-25.

### Fig 2·c: sizeof sees the wrapper, not the data (new)
- **Parts:** `Struct` `MyValue` with a bracket hand `sizeof = 16 B`; its `value*` arrow goes to a large block hand `bloom filter, 1 MB`. A second bracket over both: hand `what you actually use`.
- **Below:** two counters side by side: mono `size += sizeof(MyValue)` with red hand `misses 1 MB`; mono `size += b inside every malloc` with green tick.
- **Ids:** L-0112, L-0118, L-0120.

### Fig 2·d: zmalloc and the cap (D-06 redraw)
- **Board:** D-06, frame `b_023915.jpg` (also `b_005715.jpg`, `b_010200.jpg`).
- **Left:** the code as a `CodeBlock`-styled panel (mono, not hand): 
  ```
  zmalloc(b) {
    if total_size + b > maxmemory
        → evict            // our design
    o = malloc(b)
    total_size += b
    return o
  }
  ```
  Red on `> maxmemory`, a red arrow from `evict` to a small hand `§3`.
- **Right:** `Gauge` mono `total_size`, fill at ~90%, cap line mono `maxmemory 1 GB`, a tiny ghost bar behind it hand `machine: 32 GB`.
- **Caption note:** "Real Redis zmalloc only counts; the maxmemory check runs once per command." (framing of L-0122/L-0129, left as taught.)
- **Mobile:** code above, gauge below.
- **Ids:** L-0122, L-0123, L-0127, L-0128, L-0129.

### Rule sketch §2
`BitBar` split into small fields `4 | 4 | 24`, hand `every bit has a job`. Id: L-0098.

---

## §3 When the cache is full: eviction and expiry

### Fig 3·a: The struct that grows, stage 2 (new)
- **Parts:** `Struct` `MyValue { value*; type; lru_bits }` with the new row drawn in (stage 1 rows ghosted at 38%). Two `BitBar`s stacked: top mono `class: 4 type + 28 lru = 32`; bottom mono `redis: 4 type + 4 encoding + 24 lru` (A-DCL-01).
- **Labels:** hand `LRU: a timestamp · LFU: a counter` on `lru_bits`; hand `updated on every access`.
- **Ids:** L-0138, L-0139, L-0142, L-0143.

### Fig 3·b: The textbook LRU and its bill (D-07 redraw)
- **Board:** D-07, frame `b_013200.jpg` (also `b_010600.jpg`).
- **Top:** five `ListNode`s joined by `↔`; hand `head` on the first (double underline), a curved arrow into the head hand `accessed → move to head`. A small map glyph above with arrows to two nodes, hand `map → node`.
- **Bottom left:** `Struct` `node { next* 4 B; prev* 4 B; value* 4 B }` with a bracket mono `12 B` (and a small hand `24 B with 8-byte pointers`).
- **Bottom right:** mono `a : 2`, brackets `1 B` and `4 B`, underbrace `5 B`. A red arrow from `5 B` to `12 B`, hand `overhead > data`.
- **Speech bubble** (§3) on the list: `everyone uses me`.
- **Mobile:** stack top/bottom; bottom panels stack.
- **Ids:** L-0145, L-0146, L-0147, L-0148.

### Fig 3·c: Two access patterns (D-08 redraw)
- **Board:** D-08, frame `b_011915.jpg` (also `b_011848.jpg`).
- **Panel a "LRU · news":** axes (time →, reads ↑); a sharp spike near the origin decaying into a flat tail. Hand under: `google news · a reel's song`.
- **Panel b "LFU · wikipedia":** a zig-zag that keeps coming back up (stock-chart look), with one tall narrow spike labelled hand `world cup` that falls back. Hand under: `evergreen pages`.
- **Caption:** "LRU suits keys hit hard and then forgotten; LFU suits keys that keep coming back. The stock you hold through a dip is LFU."
- **Mobile:** panels stack.
- **Ids:** L-0166, L-0168, L-0170, L-0172.

### Fig 3·d: Expiry: the queue we don't build (D-12 redraw + struct stage 3)
- **Board:** D-12, frame `b_013545.jpg` (also `b_013515.jpg`).
- **Panel a "rejected":** mono row `k2:100 , k7:101 , k9:105 , k3:110` labelled hand `priority queue`; under `k2:100` hand `absolute expiry`; arrow `→ order`; a red `Cross` over the whole panel, hand `pointers per key`.
- **Panel b "what we do":** `Struct` stage 3 `MyValue { value*; type; lru_bits; expires_at }`, new row drawn in; hand `one number, no extra structure`.
- **Mobile:** panels stack.
- **Ids:** L-0213, L-0214.

### Fig 3·e: Lazy deletion and sampling (new StepThrough)
- **Layout:** lanes, time down: `client` · `cache (hash table, 8 keys with TTLs, 3 expired shown with a small red clock)` · `active cycle`.
- **Steps:**
  1. Client `GET k7` (blue). k7's `expires_at` is past → deleted now with `zfree`, counter drops (red then green tick). *"On access, an expired key is deleted on the spot. zfree also lowers total_size."* (L-0215, L-0216)
  2. Most keys go this way. *"Most expired keys are removed lazily, at the cost of one free."* (L-0217)
  3. Three expired keys are never read again (graphite, red clocks). *"Some expired keys are never touched again: memory leaks."* (L-0219)
  4. Active cycle: sample 20 keys that have a TTL (draw a bracket over a sample); free the expired. *"A cleanup pass samples 20 keys with a TTL and frees the expired ones."* (L-0212, L-0218)
  5. Sample again while many were expired. *"It repeats while more than a quarter of a sample was expired (Redis today: about 10%)."* (L-0218, SN-07)
  6. End state. *"The leak is temporary: lazy deletion or a later sample gets the rest."* (L-0219)
- **Ids:** L-0212, L-0215, L-0216, L-0217, L-0218, L-0219.

### Rule sketch §3
Two tiny curves side by side (spike-and-decay, comes-back), hand `read the key's life first`. Id: L-0174.

---

## §4 Talking to the cache, and taking turns

### Fig 4·a: The API talks to the cache over TCP (D-09 redraw)
- **Board:** D-09, frame `b_012215.jpg` (also `b_012145.jpg`).
- **Parts:** small `Box` mono `api` (left), big `Box` mono `cache` (right) with three checkboxes inside mono `☐ http/1.1`, `☐ grpc`, `☐ custom`. Three parallel lines between them labelled mono `tcp`.
- **Speech bubble** (§4) on the `http/1.1` checkbox: `it's the payload size`.
- **Labels:** hand `all three are just TCP; only the wrapping differs`. The board's `3/2` (handshake/teardown) is drawn as a small hand note on the lowest TCP line `3-way open / close`, with a pointer to SN-08.
- **Ids:** L-0181, L-0182.

### Fig 4·b: Bytes on the wire for `set a 1` (new)
- **Left column (HTTP/1.1):** a mono text block:
  ```
  POST /set HTTP/1.1\r\n
  Host: cache:8080\r\n
  Content-Type: application/x-www-form-urlencoded\r\n
  Content-Length: 9\r\n
  \r\n
  key=a&v=1
  ```
  A bracket hand `117 bytes`. (Illustrative, page-made; the class's point is the header jargon, L-0193.)
- **Right column (RESP):** mono `*3\r\n$3\r\nSET\r\n$1\r\na\r\n$1\r\n1\r\n`, bracket hand `27 bytes`.
- **Under both:** hand `same TCP, same value; different envelope`.
- **Mobile:** columns stack.
- **Ids:** L-0193, L-0195; addition A-DCL-10.

### Fig 4·c: One server, three doors, one table (D-11 redraw)
- **Board:** D-11, frame `b_013330.jpg` (also `b_013315.jpg`).
- **Parts:** `Box` mono `cache server` with three `Port`s on its left edge mono `tcp (custom)`, `http`, `grpc`; a line entering each; inside, a hatched rectangle mono `hash table` with all three ports arrowing to it.
- **Labels:** hand `expose all three if you like: one store underneath` (L-0200).
- **Ids:** L-0200.

### Fig 4·d: The single node so far (D-10 redraw)
- **Board:** D-10, frame `b_013224.jpg`.
- **Parts:** `Client` → `Box` mono `cache server`; inside: hash-table listing mono `key1 → obj{type: list}`, `key2 → obj{type: set}`; a `Struct` mini; a `Port` mono `tcp`; a `Gauge` mini mono `zmalloc`; hand tags `evict: lru · lfu · random`.
- **Ids:** L-0204, L-0208.

### Fig 4·e: Pessimistic locking (D-13 redraw, top half)
- **Board:** D-13, frame `b_014515.jpg` (also `b_013945.jpg`).
- **Left:** mono `ACQ_LOCK()` / `  DELETE K` / `REL_LOCK()`.
- **Right:** mono `a = 10`; two wavy vertical lines (threads, graphite) down to `a = 20` and `a = 30`; the second thread has a short red wait segment, hand `one waits for the other to finish`.
- **Ids:** L-0224.

### Fig 4·f: Two conditional updates, one winner (D-13 bottom, StepThrough)
- **Layout:** lanes, time down: `thread 1` · `a` · `thread 2`.
- **Steps:**
  1. `a = 10`. Both threads read it. *"Both threads see a = 10. Neither takes a lock."* (L-0227)
  2. Thread 1 sends `update a = 20 where a = 10`; thread 2 sends `update a = 30 where a = 10`. *"Each write says what it expects to find."* (L-0228)
  3. `CAS(a, 20, 10)` runs first: a becomes 20 (green). *"Compare-and-swap checks and writes as one atomic step."* (L-0229, L-0231)
  4. `CAS(a, 30, 10)` finds 20, not 10: no change (red). *"The second finds a is no longer 10 and does nothing."* (L-0228)
  5. Thread 2 re-reads and decides what to do. *"Only one succeeds. The loser retries or gives up: your choice."* (L-0227)
- **Ids:** L-0227, L-0228, L-0229, L-0231.

### Fig 4·g: One thread, many cores (new, small)
- **Panel a:** a CPU glyph with 8 small squares (cores); one filled, hand `redis: 1 busy`; seven empty.
- **Panel b:** same CPU, 8 squares each with a tiny mono `shard N`, hand `8 single-threaded shards on one box`.
- **Ids:** L-0354, L-0355.

### Fig 4·h: Two shared locks, two updates (new, inside the MarginNote of 4.6)
- **Layout:** lanes `T1` · `seat 7 row` · `T2`, time down, static (not a step-through).
- **Rows:** both take `S` (graphite); T2 `UPDATE` → asks for `X`, waits on T1's S (red wait); T1 `UPDATE` → asks for `X`, waits on T2's S (red wait); a red `Cross` hand `deadlock → InnoDB rolls one back` (per SN-10). Side note in hand: `the double booking usually came from a plain read + an UPDATE that didn't re-check the seat` (SN-11).
- **Caption:** "The instructor's guess was different (one transaction overwrites the other); the MySQL docs describe this deadlock instead."
- **Ids:** L-0364, L-0365.

### Rule sketch §4
`api` and `cache` joined by one thick line hand `stays open`; a small mono `resp / grpc` on the line. Id: L-0201.

---

## §5 Many nodes: splitting the keys and finding them

### Fig 5·a: Key ranges and the routing question (D-14 redraw, three panels)
- **Board:** D-14, frames `b_015900.jpg` (Routing box) and `b_020509.jpg` (table under the client).
- **Panel a:** three `Box`es staggered mono `c1 (a–j)`, `c2 (k–t)`, `c3 (u–z)`. Hand `same single-node cache × 3`.
- **Panel b:** `Client` → a small `Box` mono `routing` with a table mono `(a,j) → c1`, `(k,t) → c2`, `(u,z) → c3` → curved arrow to `c2` (blue, for key `kiwi`). Hand `ask first, then go`.
- **Panel c:** the table sits under `Client` (moved in); a direct blue arrow to `c2`. Hand `or the client keeps the table`.
- **Mobile:** panels stack.
- **Ids:** L-0243, L-0245.

### Fig 5·b: Four ways to route, at the bank (D-15 redraw)
- **Board:** D-15, frames `b_020700.jpg` (whole page) and `b_020645.jpg`.
- **Four quadrants**, each `Actor` (left) and three stacked `Box`es (desks / cache nodes, right). Titles under each panel (hand), with a one-line bank caption:
  1. **Proxy** · *"the peon at the door"*: actor → a `Box` mono `proxy` → three lines fanning to the nodes; blue on actor→proxy→c2 and back. Hand `the bribe = one extra hop`.
  2. **Smart client** · *"the regular who knows the desk"*: actor with a tiny table glyph → straight blue line to c2.
  3. **Forwarding** · *"the nearest desk walks it over"*: blue actor → c1; dashed blue c1 → c2; green back c2 → c1 → actor. Hand `ipfs-style overlays`; hand `not for a cache` (board's pink `NOT`).
  4. **Redirect** · *"go to counter 13"*: actor → c1 (blue), c1 → actor (graphite, hand `go to c2`), actor → c2 (blue). Hand `dns · redis`.
- **Mobile:** 2×2 becomes 4 stacked panels.
- **Ids:** L-0248, L-0249, L-0250, L-0252, L-0255.

### Fig 5·c: A distributed cache behind a proxy (D-16 redraw)
- **Board:** D-16, frame `b_020715.jpg`.
- **Parts:** `Actor` → long line → `Box` mono `proxy` → three `Box`es mono `cache 1`, `cache 2`, `cache 3`.
- **Labels:** above: hand "many single cache servers working as one coherent cache" (L-0263). Below: mono `hash: i = hash(key) % 3` and mono `range: c1 [a–j] · c2 [k–p] · c3 [q–z]` (board's `[j–p]` corrected to `[k–p]`; it is a slip of the pen).
- **Ids:** L-0263, L-0269.

### Rule sketch §5
The four tiny actor-to-box paths from Fig 5·b in a row, hand `pick your battle`. Id: L-0257.

---

## §6 Consistent hashing, DHTs and staying up

### Fig 6·a: `% 2` → `% 3` moves half the keys (D-17 redraw)
- **Board:** D-17, frame `b_021039.jpg` (also `b_020900.jpg`).
- **Two tables** side by side, columns mono `key · hash · node`. Hash values are given so both mods are checkable (page-made, consistent with the board's results): K1 = 6, K2 = 8, K3 = 7, K4 = 1, K5 = 3, K6 = 2.
  - `h % 2`: K1 0 c0 · K2 0 c0 · K3 1 c1 · K4 1 c1 · K5 1 c1 · K6 0 c0.
  - `h % 3` (cache 2 added): K1 0 c0 · K2 2 c2 · K3 1 c1 · K4 1 c1 · K5 0 c0 · K6 2 c2.
- **Marks:** moved rows K2, K5, K6 with a red `*` and the row in red; hand red `3 of 6 = 50% moved`. Small hand under: `on average ~N/(N+1) move`.
- **Mobile:** tables stack.
- **Ids:** L-0271, L-0273, L-0274.

### Fig 6·b: The ring decides ownership (D-18 redraw)
- **Board:** D-18, frame `b_021627.jpg` (also `b_021330.jpg`).
- **Parts:** `Ring` 0..15 (positions placed at true angles: 0 top, clockwise). Nodes: mono `cache 1` at 3, `cache 3` at 5, `cache 4` at 10, `cache 2` at 12. Key `K1` (hatched square) at 0. `CurlArrow` K1 → cache 1, hand `owner = next node clockwise`.
- **Heading under:** hand `consistent hashing: for determining ownership`.
- **Speech bubble** (§6) on the ring: `I move your data for you` (the misconception; RuleBox answers it).
- **Ids:** L-0284, L-0288, L-0289.

### Fig 6·c: Ring and array (new)
- **Left:** the same ring, small.
- **Right:** a mono array `[ 3:c1 | 5:c3 | 10:c4 | 12:c2 ]`; a key arrow mono `hash(K1) = 0`; hand `binary search: first position ≥ 0 → 3 → c1`; a second example mono `hash(K9) = 13` → hand `past the end → wrap to index 0 → c1`.
- **Caption:** "The ring is the picture; four numbers in a sorted array are the implementation."
- **Ids:** L-0279, L-0282, L-0286.

### Fig 6·d: Adding cache 5 (D-19 redraw)
- **Board:** D-19, frame `b_021915.jpg`.
- **Parts:** the Fig 6·b ring; new node `cache 5` at 1 (drawn in green). The arc 13..1 (wrapping past 0) is highlighted with a thin bracket; K1's `CurlArrow` now ends at cache 5 (green); the old arrow to cache 1 ghosted.
- **Labels:** hand `only keys in (12, 1] move: cache 1 → cache 5`; hand `everyone else: untouched`; caption from the board "we create cache 5 using cache 1, then add it to the ring".
- **Ids:** L-0291, L-0292.

### Fig 6·e: Removing cache 1: graceful or abrupt (D-20 redraw, StepThrough)
- **Board:** D-20, frame `b_022148.jpg` (also `b_022130.jpg`).
- **Layout:** the ring at the top (fixed), a lane strip under it with two branches (time down).
- **Steps:**
  1. Ring with cache 1 at 3, K1 at 0. *"We want to remove cache 1, say to stop paying for an over-provisioned node."* (L-0295)
  2. Graceful: dashed graphite arrow cache 1 → cache 3, hand `snapshot + copy`. *"Graceful: copy cache 1's data to cache 3 first."* (L-0297)
  3. Cache 1 crossed out; K1's arrow now ends at cache 3 (green). *"Then remove it. Requests for K1 land on cache 3 and find their data."* (L-0296, L-0297)
  4. Abrupt (reset): cache 1 crossed out in red, no copy; K1 → cache 3 arrives red (miss). *"Abrupt: the node just dies. Its whole load hits cache 3, cold."* (L-0298)
  5. All other arcs highlighted unchanged. *"Either way, every other key stays where it was."* (L-0299)
- **Ids:** L-0295, L-0296, L-0297, L-0298, L-0299.

### Fig 6·f: Adding cache 5 safely (new StepThrough)
- **Layout:** lanes `cache 1` · `cache 5` · `ring (router)` · `backend db`.
- **Steps:**
  1. A blank cache 5 is added at peak: requests for K1 → cache 5 → miss → db (red, db load bar rises). *"A blank node owns keys it doesn't have: misses, and the backend takes the load."* (L-0302)
  2. Instead: snapshot cache 1 (dashed copy to cache 5). *"Take a snapshot of cache 1 and build cache 5 from it."* (L-0303, L-0333)
  3. Add cache 5 to the ring; K1 → cache 5 hits (green). *"Now add it to the ring: K1's requests find their data."* (L-0303)
  4. Slowly delete moved keys from cache 1. *"Then slowly delete the keys cache 1 no longer owns."* (L-0303)
  5. Variant note: with a replication factor, cache 1 may keep them as a copy. *"With replicas on the ring, cache 1 might keep them anyway."* (L-0352)
- **Ids:** L-0302, L-0303, L-0333, L-0352.

### Fig 6·g: Virtual nodes: where a new node's data comes from (new)
- **Panel a "one token per node":** ring with 4 nodes; new node at one position; one dashed copy arrow from its single neighbour. Hand `one source, one copy`.
- **Panel b "virtual nodes":** ring with each node at 3 positions (mono `c1a c1b c1c…`); the new node at 3 positions, three short dashed copy arrows from three different nodes. Hand `same total (~1/N), from many sources`.
- **Labels under panel b, two short lines:** hand `the lecture: more places to copy from, harder to run` (L-0334, L-0336) · hand `Dynamo: load spreads evenly across the others` (SN-14, SN-15).
- **Mobile:** panels stack.
- **Ids:** L-0332, L-0334, L-0336.

### Fig 6·h: A distributed hash table (D-21 redraw)
- **Board:** D-21, frame `b_022703.jpg` (detail `b_022615.jpg`).
- **Top right:** vertical chain mono `key` ↓ `hash function` ↓ `i` → a cloud with four small `Cyl`s; mono `k2` by one, `k1 k3` by another. Hand under the cloud: `no load balancer!`.
- **Bottom:** `Actor` hand `request`; straight line hand `nearest` to one dot of a five-dot cloud; a curved arrow back hand `go to ②`; a long arc from the actor to the dot marked `②`. (Redirect-style lookup, which matches how Kademlia works; see the inline note on L-0253.)
- **Left text block (board list, as written):** hand `DHTs are used in building: distributed file systems · DNS servers · instant messaging · peer-to-peer sharing` with a small hand `(see "More precisely")` linking SN-17.
- **Mobile:** stack: chain, cloud, lookup, list.
- **Ids:** L-0307, L-0308, L-0311.

### Fig 6·i: Two ways to survive a node (D-20 bottom redraw + new RF panel)
- **Board:** D-20 bottom and the emphasis at 02:28:30, frame `b_022148.jpg`.
- **Panel a "a replica per node":** `cache 1` with a dashed `Replica` beside it, hand `standby takes over`.
- **Panel b "copies on the next nodes":** ring; key K at an arc; owner + next two nodes ringed green, hand `owner + next two` and mono `RF = 3 by the usual count ("RF 2" in class)`.
- **Ids:** L-0315, L-0316, L-0317.

### Fig 6·j: The orchestrator (D-22 redraw, small)
- **Board:** D-22, frames `b_023254.jpg` (partial) and `b_020930.jpg`.
- **Parts:** `Box` mono `orchestrator` with a `Cyl` mono `metadb` under it; three lines to `cache 1..3`, one labelled hand `heartbeat`; a small `Box` mono `prometheus`.
- **Corner tag:** hand `glimpsed on the board; layout approximate`.
- **Ids:** L-0329.

### Rule sketch §6
A small ring with one key and one `CurlArrow` to the next node, hand `who owns it. that's all.` Ids: L-0277, L-0278.

---

## §7 What to keep

### Fig 7·a: Our Redis, end of Lecture 9 (new)
- **Parts (left to right):** `Client`s → a `Box` mono `router (proxy / client / redirect)` → `Ring` with 5 nodes, two of them shown with a dashed `Replica`. One node is exploded into a zoom bubble: `Struct` (stage 3), `Gauge` (zmalloc + maxmemory), `Port` mono `resp`, a single-thread glyph, mono `evict: lru · lfu · random`, mono `ttl: lazy + sample`. On the far left, smaller: the §1 CDC strip (`Cyl` + LogStrip → cdc → `Cyl`).
- **Tags:** each part carries a small hand chapter tag `§2`, `§3`, `§4`, `§5`, `§6`, `§1`; on the page each part links to its chapter.
- **Mobile:** phone layout: vertical (CDC strip, router, ring, zoom bubble).
- **Ids:** restates placed ids; no new placement.
