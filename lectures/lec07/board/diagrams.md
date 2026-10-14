# Lecture 07 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it is first drawn or shown. Colour notes: white = default ink; yellow = headings and key labels; pink = sub-labels, warnings and the CDC boxes; cyan = data-flow arrows in the multi-tier diagram; green = tools and the LRU linked list; pale blue = boxes on the "four ways of routing" page. Temporary red highlighter strokes are left out (listed as Emphasis). Shapes: rectangle = server/service, cylinder = database/datastore, horizontal pipe = queue/stream, stick figure = user/client, cloud = S3 / cluster of nodes, ring = consistent-hash space.

## D-01 - Blogging app on a transactional DB (00:03:30-00:07:57)
Frame: b_000500.jpg (also b_000415.jpg)
- In a row: stick-figure user, line, rectangle `API`, line, cylinder `MongoDB`.
- Context text: insights team only knows SQL; CEO wants dashboards.
- Emphasis (00:04:45): red circles on `API` and `MongoDB`; (00:07:45) red arrow at `MongoDB`.

## D-02 - Events from the API through Kafka into MySQL (00:08:00-00:08:45)
Frame: b_000845.jpg (also b_000830.jpg)
- D-01 row at the top (user -- `API` -- `MongoDB`).
- An elbow arrow from `API` down to a horizontal yellow-outlined pipe with blue internal lines (Kafka).
- Three light-blue arrows from the pipe to three small rectangles (workers).
- Three arrows from the workers into a pink cylinder `MySQL`.
- Three stick figures labelled `Insights` with an arrow up into `MySQL`.
- Beside it: the four `↳` problems with events (context of the app, missing data, not everything has an event, change done but event failed -> consistency).

## D-03 - Change Data Capture from MongoDB to MySQL (00:10:45-00:13:30)
Frame: b_001330.jpg (also b_001045.jpg)
- Row: user -- `API` -- cylinder `MongoDB`.
- Pink arrow down from `MongoDB` to a pink stack of three rectangles labelled `Change Data Capture`; green `Airbyte` / `Dbezium` [sic] beside it.
- Arrow from the CDC stack to a blue cylinder `MySQL`.
- Text: CDC reads the `COMMIT-LOG / BIN-LOG`, optionally transforms, puts into a "sink" database; sinks can be `Kafka, SQS, Broker`.
- Emphasis (00:13:30): red scribble on `MongoDB` and a red curved arrow `MongoDB` -> `MySQL`.

## D-04 - CDC builds multi-tiered storage (00:15:15-00:16:45; re-shown 02:41-02:48)
Frame: b_024345.jpg (also b_001645.jpg)
- Four columns with purple headings: `Transactional`, `Search`, `Analytics`, `Backup`.
- Under them: cylinder `MySQL`, cylinder `ElasticSearch`, cylinder `Redshift`, cloud `S3`.
- Three pink stacked boxes `CDC`, cyan arrows:
  - `MySQL` -> right into the first `CDC` -> up into `ElasticSearch`.
  - `MySQL` -> down and along the bottom -> second `CDC` (bottom middle) -> up into `Redshift`.
  - `Redshift` -> right into the third `CDC` -> up into `S3`.
- Footer: `Implement quick CDC using Airbyte (if you have never used it)` / `we will be using it a lot in future System discussions`.
- Added at 02:43:15 (Q&A): a small cylinder under the first `CDC` box joined by a short line (the CDC instance's own store); erased by 02:43:45.
- Emphasis (00:18:15-00:18:33): red circles on `Redshift`, the third `CDC` and `S3`.

## D-05 - Single cache node filling the heap (00:33:45-00:44:45)
Frame: b_004530.jpg (also b_003445.jpg)
- A square at the top right = one cache node's memory (heap); pink `← Heap` label to its right.
- Final form: the square is filled with pink dots (stored values); pink `Seg Fault` under it.
- Surrounding text: `Storage: Key and Value in Hash Table!`, `Cap the memory usage`.

## D-06 - zmalloc wrapper with a memory cap (00:52:00-01:01:30)
Frame: b_023915.jpg (also b_005715.jpg, b_010200.jpg)
- Code block, not boxes. Left: `zmalloc ( int size_alloc )` / `zfree` (pink `z` added in front of `malloc` / `free`).
- Middle: box `total_size`, `1GB` under it.
- Right: `zmalloc ( int b ) {` / pink `if total_size + b > maxm` -> pink `eviction` arrow to `{ ≡ }` / `o = malloc (b)` / `total_size += b` / `return o` / `}`.
- Struct to the left of it: `key →` `MyValue {` / `value * void/Object` / `type int4` / green `lru_bits 28` / `}`; and `o = (myvalue *)` / `malloc( sizeof(` / `myvalue))`.

## D-07 - LRU as a doubly linked list and its overhead (01:02:15-01:09:15)
Frame: b_013200.jpg (also b_010600.jpg)
- Top: five green circles joined by `↔`; a green squiggle arrow points to the first circle (head, double-underlined); a bracket `I` after the last.
- Pink struct: `Stu node {` [sic] / `next * 4B` / `prev * 4B` / `value * 4B`, a brace giving `12B` / `}`.
- Right: pink `a:2`, arrows up from `1B` (key `a`) and `4B` (value `2`), underbrace `5B`; a pink arrow from `5B` to `12B` (12 bytes of overhead for 5 bytes of data).
- Also on the page: `Eviction` / `LRU` / `LFU` / pink `Random`; `Priority Queue` at the top right.

## D-08 - Access patterns: LRU (News) vs LFU (Wikipedia) (01:11:00-01:17:45)
Frame: b_011915.jpg (also b_011848.jpg)
- Two hand-drawn axes side by side.
- Left, headed `LRU`, labelled `News` below: a sharp spike near the origin that decays into a long flat tail.
- Right, headed `LFU`, labelled `Wikipedia` below: a zig-zag line that keeps rising (stock-chart look) with an arrow along it.
- The recap page (01:33:45) repeats this as small icons beside `LRU ... (CDN, Google News)` and `LFU ... (Wikipedia)`.

## D-09 - API talks to the cache over TCP (01:19:00-01:22:15)
Frame: b_012215.jpg (also b_012145.jpg)
- Small grey box `API` (left), three parallel lines labelled `TCP` above them, big grey box `Cache` (right).
- Inside the cache box, three checkboxes: `☐ http1.1`, `☐ gRPC`, `☐ custom`.
- `3/2` at the right edge (TCP 3-way handshake / 2-way teardown per audio).
- Emphasis (01:21:30, 01:31:30-01:31:48): red circle on `http`, red underline on `gRPC`, red over the lower TCP lines.

## D-10 - Single node cache recap (01:32:15)
Frame: b_013224.jpg
- Stick figure -- line -- box `Cache Server` (right side slanted), small yellow hatched rectangle in its top-right corner, pink `↓ Storage` pointing at it.
- Below: `key ——→ object`, `object struct { type list / data ≡ }`, and the hash-table listing `key 1 → Object { type list }`, `key 2 → object { type set }`.

## D-11 - One cache server, three protocols (01:32:45)
Frame: b_013330.jpg (also b_013315.jpg)
- Top: stick figure -- line -- rectangle `Cache Server` with a small yellow rectangle labelled pink `↓ Hash Table`.
- `Communication:` yellow `TCP protocol` branching to pink `Raw TCP` (up), pink `HTTP` (down), and on to pink `gRPC`.
- Bottom: one box with three small yellow port rectangles on its left edge `TCP`, `HTTP`, `gRPC` (third cut at frame bottom), a line entering each port from the left, and a yellow hatched rectangle inside labelled pink `Hash Table` (all ports share one store).

## D-12 - TTL clean-up with a priority queue (01:34:30)
Frame: b_013545.jpg (also b_013515.jpg)
- One line of entries: `k2:100 , k7:101 , k9:105 , k3:110` (pink `Priority Queue` to the left).
- `↑ absolute expiration time` under `k2:100`, arrow `→ order` to the right.
- Pink curved arrow from pink `Free happens here` up to `k2:100` (the head is freed first).
- Below: `Sampling [Redis]`, `lazy del^n`, `Sample 20 keys, free the expired ones, repeat until the sample < 25% expired`.

## D-13 - Pessimistic locking with two writers (01:39:30)
Frame: b_014515.jpg (also b_013945.jpg)
- Left: `ACQ_LOCK()` / indented `DELETE K` / `REL_LOCK()`.
- Right: `a = 10` at the top; two pink wavy vertical lines (threads) down to `a=20` and `a=30`; `one waits for other to fini[sh]` below.
- Below: optimistic version `update a=20 where a=10` / `update a=30 where a=10` with a brace `Only one would succeed.` and `CAS ( a, 20, 10 )` / `CAS ( a, 30, 10 )`.

## D-14 - Key ranges over three nodes and a routing table (01:55:45-02:01:45)
Frame: b_020509.jpg (routing table under the client; also b_015900.jpg with the `Routing` box)
- Left: rectangle `Client`.
- Right, staggered: `c1` box `(a,j)`, `c2` box `(k,t)`, `c3` box (slightly trapezoid) `(u,z)`.
- First form (01:59:00): a curved line from `Client` to a small box `Routing` holding `(a,j) → c1`, `(k,t) → c2`, `(u,z) → c3`, `Table` (double-underlined).
- Final form (02:01:45): the `Routing` box is erased and the table sits directly under `Client` (client-side routing).
- Emphasis (02:05:45): red chain `Client` -> `c1` -> `c2` -> `c3` (node-to-node forwarding).

## D-15 - Four ways of routing (01:59:12; labels 02:02:12)
Frame: b_020645.jpg (bottom half) and b_020700.jpg (whole page)
- Four quadrants, each: stick figure on the left, three stacked pale-blue boxes (cache nodes) on the right.
- Top left (pink `Cache`): figure -- line -- one box (proxy/router) -- three lines fanning out to the nodes.
- Top right (pink `Cache`): figure -- one long line straight to the middle node (smart client).
- Bottom left (yellow `IPFS`, pink `NOT`): pink line from the figure to the top node; a pink dotted curve from the top node down to the second node (node forwards on the client's behalf).
- Bottom right (white `Cache` / `(Redis)`; white `DNS` between the bottom two): a pink loop from the figure to the top node and back (node replies "go there"), then a yellow line from the figure to the bottom node (client goes there directly).
- Emphasis (02:04:00-02:06:30, 02:32:30): red traces on the redirect loop, the proxy fan-out and the smart-client figure.

## D-16 - Distributed cache behind a proxy (02:07:15)
Frame: b_020715.jpg
- Stick figure -- long line -- box `Proxy` -- three lines to boxes `Cache 1`, `Cache 2`, `Cache 3` (stacked).
- Above: `Distributed cache : Multiple single cache servers working together as a single coherent cache`.
- Below: `Hash-based routing  i = hash(key) % 3`; `Range-based routing  cache 1: [a - j]`, `cache 2: [j - p]` [as written], `cache 3: [q - z]`.

## D-17 - Hash-mod routing moves data when a node is added (02:08:15)
Frame: b_021039.jpg (also b_020900.jpg)
- Table 1 (`key  hash`, two caches, `h = f(n) % 2`): K1 0 cache 0; K2 0 cache 0 *; K3 1 cache 1; K4 1 cache 1; K5 1 cache 1 *; K6 0 cache 0 *.
- `New cache server added : cache 2`.
- Table 2 (three caches): K1 0 Cache 0; K2 2 cache 2 *; K3 1 Cache 1; K4 1 cache 1; K5 0 cache 0 *; K6 2 cache 2 *.
- Pink asterisks mark the moved keys (K2, K5, K6 = 3 of 6); pink `50% data movement`.
- Hash numbers in purple, cache names in yellow.
- Emphasis (02:10:42-02:11:48): red on `f(n)`, on K1 staying on cache 0, and on the unchanged K3/K4.

## D-18 - Consistent hashing ring: ownership (02:12:00)
Frame: b_021627.jpg (also b_021330.jpg)
- Large circle (grey fill). Ring positions written inside: `0` (top), `3`, `5`, `10`, `12`.
- Small yellow rectangles on the ring: `cache 1` at 3 (upper right), `cache 3` at 5 (lower right), `cache4` at 10 (lower left), `cache 2` at 12 (upper left).
- Pink hatched square `Key K1` at 0; pink curved arrow clockwise from it to `cache 1`, labelled `Ownership` (a key is owned by the next node clockwise).
- Heading: `Consistent Hashing: For determining ownership`.

## D-19 - Adding cache 5 to the ring (02:17:30)
Frame: b_021915.jpg
- Same ring; new yellow rectangle `cache 5` at `1` between `0` and `3`.
- The arrow from `Key K1` now curves to `cache 5` (only keys between 0 and 1 move from cache 1 to cache 5).
- Right: `we create cache 5 using cache 1 and then add it to the ring`, `Minimal Data Transfer`, pink note on virtual nodes and stateful applications.

## D-20 - Removing cache 1 from the ring (02:19:30)
Frame: b_022148.jpg (also b_022130.jpg)
- Ring (no fill) with `cache 2`/12, `cache 1`/3, `cache 3`/5, `cache4`/10; `cache 1` is hatched and crossed by a pink diagonal line (removed).
- `Key K1` at 0 with a curved arrow (its owner moves on clockwise).
- Right: `1. Graceful shut down` / `2. abrupt outage` / `Minimal Data Transfer`.
- Bottom: `High availability: - Replicas (state data) - Standby nodes`; `Reliability: - Write ahead logging`.
- Emphasis (02:28:30-02:28:42): red loop from `cache 1` to a red box beside it (its replica/standby) and a red arc to `cache 3` (copy on the next node).

## D-21 - Distributed hash table and decentralized lookup (02:23:24)
Frame: b_022703.jpg (whole page; detail b_022615.jpg)
- Right column: `data (key)` ↓ `Hash Function` ↓ `i`; a yellow line from `i` into a cloud containing four cylinders (nodes); `k2` next to the top-right cylinder, `k1`/`k3` next to the bottom-middle one. `No load balancer!!` (yellow) under the cloud.
- Bottom: `Decentralized`. Word `request` on the left; a straight line labelled `nearest` to a dot (node) at the left of a cloud of five dots; a curved arrow back from that node labelled `goto ②`; a long arc labelled `request` from the client over the top to the node marked `②` on the right.

## D-22 - Orchestrator monitoring cache servers (glimpsed only, 02:09:30 and 02:32:54)
Frame: b_023254.jpg (partial, page-slide transition; also b_020930.jpg)
- Box `Orchestrator` with three lines to `Cache 1` (line labelled `heartbeat`), `Cache 2`, `Cache 3`; a cylinder `MetaDB` hanging under the orchestrator.
- Text: `Orchestrator  Monitor uptime of cache [servers]` / `Failovers`; `Servers are monitored through prometheus.`; `Dynamic Scaling up & down:` / `Say we are building a truly elastic cache &...`.
- The 02:09:30 glimpse shows the boxes connected to a box `Prometheus` with a cylinder under it instead; the page was never shown in full, so the exact final layout is unknown.
