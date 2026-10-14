# Lecture 05 (lec08): figure specs

This file is for the illustrator. Every figure on the page is listed here in reading order. Board redraws name the D-xx diagram from `lectures/lec08/board/diagrams.md` and the clearest frame in `lectures/lec08/board/frames_kept/` (look at it; never embed it). New figures say "new". Each entry gives parts, arrows, labels, marker colours, the step text for step-throughs, the phone layout and the ledger ids it carries.

Totals: **33 drawn items** = 27 numbered figures (5 of them step-throughs) + 6 separate rule-box sketches (§1–§6; §7's sketch is Fig 7·c). Clip posters are specified in `animations.md`. All 10 board diagrams (D-01..D-10) are redrawn; none is dropped. D-04 is split across Figs 4·b, 4·c, 4·d and 5·a because the board's final state carries five ideas at once (NOTES weakness #2: dense figures don't fit the notebook idiom).

---

## 0. Glyph kit additions (build once, before any figure)

Everything in `site/FIGURES.md` applies: one stroke family (1.7 px, 1.1 thin, 3.2 heavy), seeded wobble, labels ≥ 12 px on screen, phone layout for anything wider than ~360 units, `title` + `desc` on every SVG, distinct seeds per part.

| Glyph | Drawing | Label |
|---|---|---|
| LB server | the kit's `LoadBalancer` bar for architecture views; a `Box` with mono `lb` when it needs an address under it | mono `lb`, mono `10.0.0.1 :9000` |
| LB server fleet | `Fleet` of `lb` boxes | hand `LB servers ×n` |
| backend server | `Box` | mono `backend`, or `b srv1` as on the board |
| orchestrator | `Fleet` of 3 boxes, front box labelled; on §5 figures the front box carries a tiny crown tick for "leader" | mono `orchestrator` |
| DNS server | small `Box` with a folded corner (a "book" mark) | mono `coredns` / `dns` |
| config DB | `Cyl` | mono `config db` |
| in-memory config copy | small filled square at the LB box's top-right corner (the board's yellow square) | hand `config copy` on first use |
| Pub/Sub broker | `Pipe`, no partition rules | mono `redis pub/sub` |
| time-series store | `Cyl` with a 4-point sparkline drawn on its body | mono `prometheus` |
| exporter / agent | tiny circle on a box's lower-left corner (the board's `o` / `oo`) | hand `agent` on first use |
| lock record | a key-tag shape (rectangle with a hole) holding mono text | mono `queue7 → c1` |
| Redis node | `Cyl` | mono `redis` |
| queue (unprotected) | `Queue` (cells, oldest on the right) with no lock mark | mono `queue 7` |
| consumer | `Worker` | mono `consumer 1` |
| laptop | rounded rectangle with a hinge line (only Fig 3·c and the §3 rule sketch) | hand `one laptop` |

**Arrows.** Solid = synchronous request/connection; dashed = async (config push, Pub/Sub, CDC, scrape). Heads on the initiator's direction only:
- health check: **orchestrator → backend** `/health` (the orchestrator asks; L-0371). The `200` reply is a small green tick at the backend, not a second arrow.
- metrics: **prometheus → agent** labelled `scrape` (A-LBL-08). The board drew agents pushing; the caption says "Prometheus pulls; the class described it as a push" (L-0200 inline).
- DNS: client → `coredns` `lookup`, then a reply arrow back labelled with the IP (the reply is part of the same exchange, dashed graphite).
- lock: consumer → `redis` (`SET NX`), never Redis → consumer.

**Colour.** Blue = request/data path (client → LB → backend; consumer reading a message). Green = 200 OK, lock acquired, success. Red = dead backend, stale window, expired lock, two holders, hard limit. Graphite for everything else, including the **config path** (dashed, circled letters Ⓐ Ⓑ Ⓒ Ⓓ) and heartbeats. The board's pinks, yellows, lilacs and cyans are not carried over.

**Speech bubbles** (one per section, misconception only): §2 LB "CPU? I only see my connections." · §5 DNS "I just hand out addresses." · §6 consumer "I'll just delete the key." · others none.

---

## Lecture header + §1 How to approach distributed systems

### Fig 1·a: The day-zero loop (board S03–S05 redraw)
- **Board:** S03 `b_001015.jpg`, S04 `b_001200.jpg`, S05 `b_001230.jpg` (text pages, not a D-diagram).
- **Parts:** left, a tiny day-zero stack in one dashed outline: `server`, `db`, `cache` boxes, hand label `day 0: one of each`. Right, a loop of four hand-lettered stations around a circle: `scale each component` → `see how it performs under load` → `rectify` → `re-architect` → back to the first, with hand `and repeat` on the return arc.
- **Arrows:** graphite, clockwise, open chevrons. One arrow from the day-zero stack into `scale each component`.
- **Inset (small, lower right):** a magnifier circle over the loop with hand `zoom in, find the next detail` (L-0034).
- **Ids:** L-0030, L-0031, L-0033, L-0034.
- **Phone:** loop becomes a vertical list with a return arrow up the left side.

### Fig 1·b: Check every layer (new)
- **Parts:** a vertical stack of seven layer rows, each a glyph + mono name: `cdn` (cloud), `lb` (bar), `api` (fleet ×3), `cache` (cube), `stateful svc` (box), `db` (cylinder), `dns` (box). Beside each, a hand check-box. Six get a green tick with hand `scales out`; the `db` row is ringed red with hand `one machine` and two hand annotations under it: graphite `bottleneck if it can't keep up` and red `SPOF if it also has no standby`. A small dashed second cylinder drawn beside the db, labelled hand `+ standby = no SPOF, still no scale-out` (SN-01, A-DSC-08).
- **Caption:** "Autoscaled API servers are one layer of seven. A non-scalable database is fine while it holds the load (L-0044)."
- **Ids:** L-0037, L-0038, L-0039, L-0040, L-0043, L-0044.
- **Phone:** already vertical; annotations move under each row.

### RuleBox sketch §1: anything that can go wrong (new)
- One `server` box with three small hand marks around it: a red zigzag `crash`, a graphite clock `lag`, a red cut line on its network lead `partition`, and a hand `?` beside each. Ids: L-0026, L-0029.

---

## §2 Choosing a backend

### Fig 2·a: One entry point (D-01 redraw)
- **Board:** D-01, frame `b_001930.jpg`.
- **Parts:** two stick-figure clients (left), one `lb` bar (centre) with mono `payments.example.com` above it (the board has no name; a neutral name, caption says "one name or IP that never changes"), three `api` boxes (right).
- **Arrows:** client → lb (blue, solid); lb → each api (graphite, orthogonal fan). Hand label under the lb: `single point of entry`. Hand list beside it (from the board's "advantages"): `fault tolerance · no over-clocked server`.
- **Ids:** L-0049, L-0050, L-0051.

### Fig 2·b: Three ways to pick a backend (D-02 redraw, three panels)
- **Board:** D-02, frames `b_002245.jpg`, `b_004000.jpg` (counts).
- **Each panel:** `lb` box left, three backend boxes right, fan of three lines. Request numbers in mono beside each backend. Panel titles under the drawing (hand).
- **Panel a `round robin`:** equal boxes, `4 GB` each; numbers `1, 4` / `2, 5` / `3, 6`. Hand: `uniform infra · uniform load`.
- **Panel b `weighted round robin`:** middle box drawn twice as wide, mono `8 GB`, outer boxes `4 GB`; weights `w=1 · w=2 · w=1` in mono on the lines. Numbers drawn from the 1:2:1 rule (the board's are cut off): `1, 5` / `2, 3, 6, 7` / `4, 8`. Hand: `non-uniform infra · as per weights`. Small bar under each box showing utilisation: plain RR would give `80% · 40% · 80%` (ghosted, 38%), weighted gives `80% · 80% · 80%` (graphite). The 40% bar is outlined red.
- **Panel c `least connections`:** equal boxes; numbers as on the board `1, 5, 7` / `2, 4, 8, 9` / `3, 6, 10`. Hand: `big variance in response times · analytics`.
- **Ids:** L-0053, L-0057, L-0059, L-0061, L-0062, L-0070, L-0078.
- **Phone:** panels stack.
- **Placement:** 2.2 shows panel a on its own (`Fig 2·b(a)`), 2.3 shows panel b on its own (`Fig 2·b(b)`), and the end of 2.4 shows all three panels together as the recap.

### Fig 2·c: Least connections, one request at a time (new StepThrough)
- **Layout:** time runs down. Lanes: `lb` (with a small mono counter table `s1 s2 s3`) · `server 1` · `server 2` · `server 3`. Each request is a blue arrow from the lb lane to a server lane; a long request is drawn as a tall bar in its server lane, a short one as a short bar.
- **Steps:**
  1. Requests 1, 2, 3 arrive; one goes to each server. Counter `1 1 1`. *"Three requests, three servers: one connection each."* (L-0072)
  2. Request 2 (short, 1 s) finishes on server 2: green tick, counter `1 0 1`. *"Request 2 was a one-second call. Its connection closes, so server 2 is free."* (L-0072, L-0076)
  3. Request 4 arrives; the lb reads the counters and sends it to server 2 (blue). Counter `1 1 1`. *"Request 4 goes to the server with the fewest connections: server 2."* (L-0070, L-0076)
  4. Request 4 turns out to be long (its bar grows). Request 5 arrives; servers 1 and 3 tie at 1; the lb picks server 1 (a small hand `tie → pick one` note). *"Request 4 is long-running. Request 5 goes to server 1; a tie is broken at random."* (L-0076, L-0089)
  5. Side panel: the same five requests under round robin, with request 4 and request 1 (both long) stacked on server 1, ringed red. Hand `round robin: long requests pile up`. *"Round robin would have sent request 4 to server 1, which was already busy."* (L-0077)
- **Speech bubble** on the lb in step 5: `CPU? I only see my connections.` (L-0079, L-0080)
- **Ids:** L-0070, L-0072, L-0076, L-0077, L-0079, L-0089.

### RuleBox sketch §2: pick by infrastructure and load (new)
- Three tiny `lb → 3 boxes` fans in a row, labelled mono `rr`, `wrr` (middle box wide), `lc` (one tall bar in a box). Ids: L-0055, L-0062, L-0078.

---

## §3 A load balancer on one laptop

### Fig 3·a: Two TCP connections per request (D-03 redraw)
- **Board:** D-03, frame `b_005715.jpg` (also `b_005200.jpg` for the first connection).
- **Parts:** two stick-figure clients (left). `lb` box (centre) with mono `10.0.0.1 :9000` under it and the in-memory list under that: mono `backends: 10.0.0.7:8081 · 10.0.0.8:8081 · 10.0.0.9:8081`. Three backend boxes (right) with mono `10.0.0.7 :8081`, `10.0.0.8 :8081`, `10.0.0.9 :8081` (the board's `D` in the middle box is a `B`; all three read `backend`).
- **Arrows:** client 1 → lb mono `tcp1` (blue, solid); lb → top backend mono `tcp2` (blue). Client 2 → lb `tcp3` (graphite); lb → bottom backend `tcp4` (graphite). Request label mono `GET /index.html` above tcp1. A dotted return along tcp2 then tcp1 labelled hand `response copied back` (green).
- **Above the lb:** the connection map as a small ruled table, mono `tcp1 → tcp2`, `tcp3 → tcp4`, hand `in-memory hash table`.
- **Ids:** L-0103, L-0106, L-0107, L-0112, L-0113, L-0114, L-0116, L-0121.
- **Phone:** stack vertically (clients top, lb middle with map, backends bottom).

### Fig 3·b: One request through the proxy (new StepThrough)
- **Layout:** swim lanes, time down: `client` · `lb (accept loop)` · `backend 10.0.0.7`.
- **Steps:**
  1. Client opens a TCP connection to `:9000` (blue). The lb's `Accept` returns `srcConn`. *"The client connects to the LB's port. Accept hands back the source connection."* (L-0108, L-0127)
  2. The lb asks the strategy for a backend; mono `GetNextBackend() → 10.0.0.7:8081`. *"The strategy picks a backend: round robin, hashed or random."* (L-0111, L-0128)
  3. The lb dials the backend (blue): `backendConn`. The map gets `tcp1 → tcp2`. *"The LB opens a second connection, to the backend, and remembers the pair."* (L-0112, L-0113)
  4. Two parallel arrows: `io.Copy(backend, client)` carries `GET /index.html` right; `io.Copy(client, backend)` carries `hello world` left (green). *"Two copies run at once, one per direction. The LB never parses HTTP."* (L-0117, L-0119, L-0129, L-0141)
  5. The client closes; EOF arrives; both copies return; a hand `update counters here` note. *"At EOF each copy returns. That return is where the LB learns the connection ended."* (L-0138 inline, L-0140)
- **Ids:** L-0108, L-0111, L-0112, L-0113, L-0117, L-0119, L-0127, L-0128, L-0129, L-0138, L-0140, L-0141.

### Fig 3·c: One laptop, four processes (new, small)
- **Parts:** a laptop outline. Inside: one `lb` box mono `:9000` and three backend boxes mono `:8081`, `:8082`, `:8083`, with hand `localhost`. Blue arrows lb → each backend. Under it, hand `no cloud · no VMs · no Docker`. (The demo code used `:9090` and four backends 8081–8084; the caption says so.)
- **Ids:** L-0123, L-0126.

### RuleBox sketch §3: build, then scale (new)
- The Fig 3·c laptop at half size on the left (`build`), and on the right a ghosted (38%) rack of five `lb` boxes labelled hand `scale (later)`. Ids: L-0125, L-0144.

---

## §4 The control plane

### Fig 4·a: Half the budget goes to backends (new)
- **Parts:** one `lb` box with a horizontal bar beneath it, `10,000 connections` (mono). The bar is split in two equal halves: left half hatched-free graphite outline labelled hand `client ↔ lb`, right half labelled `lb ↔ backend`. Above, a hand equation `10,000 ÷ 2 = 5,000 clients`. A red tick at the bar's end, hand `limit`.
- **Caption:** "10,000 is the class's number. For scale: on Linux one LB IP can open about 28k connections to one backend address (A-LBL-14)."
- **Ids:** L-0122, L-0145.

### Fig 4·b: An in-memory copy of the config (D-04, config stage)
- **Board:** D-04 at `b_011330.jpg` (config + DB + `syn-` curve); config block from `b_015051.jpg` lower left.
- **Parts:** two `lb` boxes (centre), each with the small `config copy` square. One `config db` cylinder below. A ruled card beside the db, mono: `{ backends: [ip:port, …], algorithm: "round_robin", health_endpoint: "/health" }` (the board's `b.servs`, `balancy`, `health_endpoint`).
- **Arrows:** db → each config square, dashed graphite, hand `pulled once, at startup`. A blue request arrow client → lb → backend that does **not** touch the db, hand `no db call per request`. A small red label near the db: `3–5 ms per call: too slow per request`.
- **Ids:** L-0147, L-0148, L-0149, L-0150, L-0151, L-0152, L-0154.

### Fig 4·c: The orchestrator asks; backends answer (D-04 orchestrator part)
- **Board:** D-04 `b_015051.jpg` (top: orchestrator stack, `hb` curves, `/status /health`, `8081`); health endpoint stage `b_011745.jpg`.
- **Parts:** `orchestrator` stack (top). Three backend boxes `b srv1`, `b srv2`, `b srv3`, each with a tiny inner box labelled mono `:8081 /health`. `b srv2` is struck through in red (the board's pink hatch), with a hand note `vm up, process crashed` and a red ✕ inside its inner box. `config db` (bottom left).
- **Arrows:** orchestrator → each `/health` (graphite, thin, labelled `hb` once). Green ticks at srv1 and srv3 (`200`). At srv2 a red `no 200`. Orchestrator → db solid graphite, labelled mono `remove b srv2` (L-0164, as taught; caption adds A-LBL-03: "AWS ALB fails open if every target is unhealthy").
- **Ids:** L-0156, L-0157, L-0159, L-0162, L-0163, L-0164, L-0371.
- **Phone:** backends in a row under the orchestrator; db below.

### Fig 4·d: Poll vs push (D-04 timeline + meta port; static twin of `l08-stale-config`)
- **Board:** D-04 top-left `b_015051.jpg`; polling stage `b_012400.jpg`; meta port `b_012645.jpg`.
- **Panel a `poll every 10 s`:** a horizontal time axis 0–20 s with ticks at 0, 10, 20 labelled `poll`. A red marker at `1 s`: `b srv2 dies`. The span 1 s → 10 s is a red bracket labelled `9 s of requests to a dead backend`. Under the axis, a row of small blue request dots; those inside the bracket turn red.
- **Panel b `push`:** the same axis. At `1 s`, `b srv2 dies`; immediately a dashed graphite arrow from `orchestrator` to the LB's mono `:9091 meta` port (an `lb` box drawn with two port stubs, `:9090` data and `:9091 meta`), then the lb → db `pull config` (dashed). The red bracket shrinks to a sliver, hand `near zero`.
- **Ids:** L-0169, L-0170, L-0171, L-0174, L-0176.
- **Phone:** panels stack.

### Fig 4·e: Three ways a change reaches the LB servers (D-04 / D-05 redraw)
- **Board:** D-04 `b_012830.jpg` (CDC into the pipe), D-05 `b_015054.jpg` (Redis as PubSub with three up-arrows), console `b_012630.jpg`.
- **Parts:** `config db` (centre bottom). Three sources of change along the bottom: `orchestrator` (health check failed), `lb console api` with a stick figure `developer`, and a hand `autoscaling`. All three write to the db (solid graphite). Above the db: a `redis pub/sub` pipe; above that three `lb` boxes each with a config square.
- **Arrows (config path, dashed graphite, circled letters):** Ⓐ any source → db; Ⓑ db → pipe labelled mono `cdc` (or orchestrator/console → pipe, two thin dashed alternatives labelled hand `or publish directly`); Ⓒ pipe → each lb (three up-arrows); Ⓓ each lb refreshes its square (small circular arrow). A side stub: the meta-port alternative, a dashed arrow `orchestrator → lb :9091`, hand `option 1: call each LB`.
- **Red caveat** at the pipe: hand `at-most-once: an LB that was offline re-pulls on reconnect` (SN-03).
- **Ids:** L-0171, L-0173, L-0178, L-0180, L-0182, L-0226, L-0227.
- **Phone:** sources stack on the left, pipe and LBs on the right.

### Fig 4·f: Vitals flow into one place (D-05 second form redraw)
- **Board:** D-05 `b_015057.jpg`; metrics stage `b_013930.jpg`.
- **Parts:** `prometheus` time-series cylinder (top right). Two `lb` boxes and three backend boxes, each with the small `agent` circle. `orchestrator` (top left).
- **Arrows:** prometheus → each agent, dashed graphite, labelled once mono `scrape: cpu · mem · n/w · disk` (caption: "the class drew agents pushing; Prometheus actually pulls"). Orchestrator → prometheus solid, mono `query avg cpu (last 30 min)`. Orchestrator → a ghosted third `lb` box, dashed, hand `add an LB server` (green).
- **Labels:** hand `history, not a snapshot`; hand under prometheus `time series ≠ key-value config`.
- **Ids:** L-0185, L-0187, L-0189, L-0199, L-0200, L-0202, L-0368.

### RuleBox sketch §4: reactive, not polling (new)
- Left: a clock face with a red wedge (the stale window), struck through with a graphite ✕. Right: a dashed lightning arrow `change` into an `lb` box whose config square is green. Ids: L-0181.

---

## §5 One name, many LB servers

### Fig 5·a: One name, many LB servers (D-04 left part)
- **Board:** D-04 `b_015051.jpg` left side (CoreDNS, `paym.lb. googl.com → 10.0.0.1 / 10.0.0.2 / 10.0.0.3`), `b_014830.jpg`.
- **Parts:** a `coredns` box with a ruled two-column card: mono `payments.lb.google.com` → `10.0.0.1 · 10.0.0.2 · 10.0.0.3`. Hand above it: `private infra: every machine's resolver`. Three `lb` boxes on the right with those IPs under them. `orchestrator` above.
- **Arrows:** orchestrator → coredns, solid graphite, hand `adds 10.0.0.3 when it scales out` (L-0221). The third IP and third lb are drawn in green (just added).
- **Ids:** L-0206, L-0209, L-0212, L-0213, L-0221.

### Fig 5·b: Resolve, then connect (new StepThrough)
- **Layout:** lanes, time down: `client` · `coredns` · `lb 10.0.0.1` · `backend`.
- **Steps:**
  1. Client → coredns: mono `payments.lb.google.com?` (graphite, dashed). *"The client asks DNS for the load balancer's name."* (L-0216)
  2. coredns → client: mono `10.0.0.1` (dashed reply). Hand `picks one IP (round robin / shuffle)`. *"DNS answers with one LB server's IP. That is all it does."* (L-0215, L-0219)
  3. A ghosted wrong path: coredns → lb drawn in red dotted line and struck through, with the speech bubble on coredns `I just hand out addresses.` *"DNS does not forward the request. If it did, it would be the load balancer."* (L-0218)
  4. Client caches `10.0.0.1` (a small card on the client lane, hand `cached for the TTL`), then client → lb (blue), lb → backend (blue), reply back (green). *"The client connects to that IP itself, and the usual proxying takes over."* (L-0216, L-0220, L-0225)
  5. `10.0.0.1` goes down (red ✕ on lb). The client's connect fails; it tries again with another address from DNS (blue to `10.0.0.2`). *"If that LB server is dead, the client doesn't wait out the TTL: it asks again."* (L-0231)
- **Ids:** L-0215, L-0216, L-0218, L-0219, L-0220, L-0225, L-0231.

### Fig 5·c: The finished load balancer (D-06 redraw, two traced paths)
- **Board:** D-06 `b_015105.jpg` (also `b_030845.jpg`).
- **Parts (desktop, ~880 units):** top left `coredns` (`private infra`); left two clients with mono `lb.payments.google.com`; centre `LB servers` fleet with config square; below it `redis pub/sub` pipe and `config db`; right two backend boxes; top `orchestrator` stack with hand `leader election`; top right `prometheus`; bottom right `autoscaling` box, `lb console / apis` with a stick-figure `developer`.
- **Request path (blue, circled numerals):** ① client → coredns lookup; ② `10.0.0.1` back; ③ client → LB servers; ④ LB servers → backend; ⑤ response back (green).
- **Config path (dashed graphite, circled letters):** Ⓐ developer / autoscaling / orchestrator → `config db`; Ⓑ db → pipe `cdc`; Ⓒ pipe → LB servers (three up-arrows); Ⓓ LB updates its config square.
- **Control lines (thin graphite):** orchestrator → backends and → LB servers `hb`; prometheus → agents `scrape`; orchestrator → prometheus `query`; orchestrator → coredns `add/remove LB IPs`; prometheus → autoscaling.
- **Footer:** hand `read: Maglev, a fast and reliable software network load balancer`.
- **Ids:** L-0222, L-0225, L-0226, L-0229.
- **Phone:** two portrait panels: (a) request path only (coredns, client, LB servers, backend); (b) config path only (sources, db, pipe, LB servers). Control lines appear only on desktop; the caption lists them.

### Fig 5·d: Base of the recursion (new)
- **Parts:** three tiers, top to bottom: `global monitor` (one small box + one dashed `standby` box, hand `tiny job: watch the masters`); `orchestrator` as one leader box (crown tick) + two follower boxes (hand `followers do grunt work, not idle`); bottom row `LB servers` and `backends`.
- **Arrows:** global monitor → orchestrator leader `hb`; orchestrator leader → bottom row `hb`. A dashed config line orchestrator ↔ `config db` (side), hand `all state lives here: followers copy nothing`.
- **Failure overlay:** the leader box outlined red ✕; one follower gains the crown tick, hand `takes over in 1–2 s`.
- **Ids:** L-0351, L-0352, L-0354, L-0366, L-0367, L-0379, L-0380, L-0381.

### Fig 5·e: Public front door, private load balancer (new)
- **Parts (left to right):** stick-figure user; `public dns` box mono `payments.google.com → gateway ip`; `api gateway` box (hand `powered proxy`); `coredns` box (hand `private`); `lb` bar mono `lb.payments.google.com`; backend fleet. A dashed vertical line between the gateway and coredns, hand `public | private`. Ghosted (38%) stack of small proxy boxes before the gateway, hand `often 3–4 more proxy layers`.
- **Arrows:** user → public dns (lookup, dashed), user → gateway (blue); gateway → coredns (lookup, dashed); gateway → lb (blue); lb → backends (blue).
- **Ids:** L-0236, L-0356, L-0357, L-0358, L-0359, L-0361.
- **Phone:** vertical chain.

### RuleBox sketch §5: DNS returns an address (new)
- client ⇄ `dns` (two short dashed arrows: `name?`, `10.0.0.1`), then a separate blue arrow client → `lb`. A thin red ✕ on a ghosted dns → lb arrow. Ids: L-0218, L-0219.

---

## §6 Remote locks

### Fig 6·a: From one machine to many (D-07 redraw + board S56 ladder)
- **Board:** D-07 and S56 `b_020015.jpg`; S57 `b_020615.jpg`.
- **Part 1 (used in 6.1):** `lock manager` box (top) and three boxes `machine 1/2/3` below, each with a solid graphite arrow up (machines ask). Hand: `the 3 machines coordinate through a central lock manager`.
- **Part 2 "the sharing ladder" (used in 6.2), three rows:**
  - `threads`: two wavy thread marks inside one box, sharing a small RAM chip glyph; hand `mutex · semaphore · atomic instructions`.
  - `processes`: two small boxes sharing a disk glyph with mono `/var/lib/dpkg/lock`; inset hand `apt-get upgrade ×2 → second one refuses`.
  - `machines`: two machines joined only by a network cloud; hand `remote lock`.
  - A graphite arrow down the left side: hand `nearest storage they share`.
- **Ids:** L-0241, L-0243, L-0245, L-0246, L-0308.
- **Phone:** parts stack; ladder rows stay one per line.

### Fig 6·b: Queue 7 and three consumers (D-08 redraw, two states)
- **Board:** D-08 first form `b_021030.jpg`, brainstorm `b_021415.jpg`, final `b_021745.jpg`, requirements `b_030115.jpg`.
- **State 1 (6.3):** `queue 7` (cells with messages, mono `remote · unprotected`) → three `consumer` boxes. Red arcs from the queue's head to consumer 1 and consumer 2, hand `both got the same message`. Hand `no lock, no access to its server`.
- **State 2 (6.4):** adds a `db` cylinder below the consumers with one line from each consumer into it (consumers initiate). Beside it the lock tag mono `queue7 → c1` and hand `TTL`. At the right edge a hand list `k,v · atomic · ttl`. Consumer 1's line is green (`holds it`), the others graphite (`wait`).
- **Ids:** L-0248, L-0249, L-0254, L-0256, L-0257, L-0258.

### Fig 6·c: Redis as the lock manager (D-09 redraw)
- **Board:** D-09 `b_022215.jpg`, full page `b_023554.jpg`.
- **Parts:** the queue and three consumers on top; a `redis` cylinder labelled hand `lock manager`; each consumer → redis (solid graphite, mono `SET NX` on one). Lock tag mono `queue7 : consumer 1  ex 300`. No code in the figure (the code is a CodeBlock in prose).
- **Speech bubble** on consumer 3 (the §6 misconception): `I'll just delete the key.` (L-0268)
- **Ids:** L-0261, L-0263, L-0264, L-0266.

### Fig 6·d: Who deletes whose lock? (new StepThrough)
- **Layout:** lanes, time down: `consumer 1` · `redis (key queue7)` · `consumer 2`. A TTL bar on the redis lane fills as time passes.
- **Steps:**
  1. C1 → redis `SET queue7 c1 NX EX 300` → green `OK`. The key shows `c1`; the TTL bar starts. *"Consumer 1 takes the lock for five minutes."* (L-0263, L-0264)
  2. C1's work runs long (its activity bar passes the TTL mark). The key expires: red `expired`, value empty. *"Consumer 1 is slow. After five minutes Redis deletes the key on its own."* (L-0269)
  3. C2 → redis `SET … NX` → green `OK`; key shows `c2`. *"Consumer 2 asks and gets the lock."* (L-0269)
  4. C1 finishes and sends `DEL queue7` (blue); the key `c2` vanishes, ringed red. *"Consumer 1 releases 'its' lock and deletes consumer 2's."* (L-0268, L-0269)
  5. Replay with the owner check: C1 `GET → c1` (green), then a red sliver labelled `expires here`, C2 acquires, C1 `DEL` → still deletes `c2` (red). *"Checking first doesn't help: the key can change hands between GET and DEL."* (L-0270, L-0271)
  6. Fix: one box spanning GET+DEL labelled mono `EVAL (Lua): if get == me then del` drawn as a single indivisible block; C1's call returns `0` and `c2` survives (green). *"Run the check and the delete as one atomic step inside Redis."* (L-0273, L-0299)
- **Ids:** L-0263, L-0264, L-0268, L-0269, L-0270, L-0271, L-0273, L-0299.

### Fig 6·e: Locks on three shards (new, small)
- **Parts:** three shard cylinders mono `shard 1`, `shard 3`, `shard 5`, each holding one small document square with a lock-tag `txn A`. A second transaction box `txn B` with dashed arrows to the same documents, a hand `waits up to 5 ms, then aborts and retries` (SN-07) and, above it, a graphite hand note `as taught: waits until A commits or rolls back` (kept, not struck; the red note is the SourceNote's precise version).
- **Ids:** L-0305, L-0306, L-0307.

### RuleBox sketch §6: nearest shared storage (new)
- Three tiny rows (chip, disk, cloud) each with two boxes, the Fig 6·a ladder in miniature. Ids: L-0246, L-0308.

---

## §7 Distributed locks

### Fig 7·a: Five independent nodes (D-10 redraw)
- **Board:** D-10 `b_022930.jpg`, full page `b_023500.jpg`.
- **Parts:** five `redis` cylinders in a row, no lines between them, mono `r1 … r5`, hand `no replication · all independent`. One client box above.
- **Arrows:** client → each node (solid graphite, mono `SET NX` once). Green ticks on r1, r2, r3; red ✕ on r4 (taken by another client), dash on r5 (timeout). Hand `3 of 5 > 50% → acquired` with a small hand `and in less than the TTL` (A-LDA-05).
- **Lower strip:** hand list from the board: `fail → release on every node, retry later`.
- **Ids:** L-0278, L-0279, L-0280.
- **Phone:** nodes in a 3 + 2 grid.

### Fig 7·b: Two holders (new StepThrough)
- **Layout:** five node columns `r1..r5` with a lock value cell each; client lanes `c1` and `c2` on the left.
- **Steps:**
  1. C1 locks r1, r2, r3 (green `c1` in each). *"C1 holds a majority: three of five."* (L-0279, L-0314)
  2. r1 and r2 crash (red ✕) and restart empty (cells blank). *"Two of C1's nodes crash and come back with no memory of the lock."* (L-0314)
  3. C2 locks r1, r2, r4 (green `c2`). C1's r3 and C2's three both look like majorities; ring both red. *"C2 now also holds three of five. Two clients think they own the lock."* (L-0314, L-0315)
  4. Hand note: `as taught: unlikely, a window of 2–3 s while C1 grabs the rest` (graphite). *"In class: the window is a few seconds, so the chance is small."* (L-0318)
  5. Correction panel: the restarted nodes kept out (dashed, hand `stay down > max TTL`), so C2 cannot win. *"More precisely: the window is the whole TTL. The fix is to keep a crashed node out for longer than the TTL."* (SN-08, A-LDA-07)
- **Ids:** L-0279, L-0314, L-0315, L-0317, L-0318.

### Fig 7·c: Scale out vs distribute (new; also the §7 RuleBox sketch)
- **Panel a `scale out`:** three `api` boxes sharing incoming blue arrows, hand `3× the requests`.
- **Panel b `distribute`:** five `redis` cylinders all holding the same key tag, one struck red ✕, two more ghosted; hand `same one lock · survives 2 down · slower per acquire`.
- **Ids:** L-0283, L-0287, L-0288.
- **Phone:** panels stack.

---

## Clip posters
Posters for `l08-rr-vs-leastconn`, `l08-stale-config`, `l08-lock-ttl` and `l08-redlock` are their end states, specified in `animations.md`. Each clip's static twin above (Fig 2·c, 4·d, 6·d, 7·a) is drawn from the same parts so the reader sees one hand.
