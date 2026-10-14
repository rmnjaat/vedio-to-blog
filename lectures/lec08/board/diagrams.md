# Lecture 08 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it is first drawn or shown. Colour notes: white = default ink; yellow = headings / key labels / config copies; pink = emphasis labels, failure (hatched server), lock manager arrows; lilac = load balancer boxes; light blue = heartbeats, CDC, metrics paths; green = IP addresses and telemetry pushes. Temporary strokes are left out: red highlighter scribbles and blue dashed laser marks (listed as emphasis only). Shapes: rectangle = server/service, cylinder = database/datastore, horizontal pipe = queue/stream/broker, stick figure = user/client.

## D-01 - Load balancer in front of API servers (00:17:45-00:19:48)
Frame: b_001930.jpg
- Left: two stick-figure users, one above the other; a line from each to a single lilac rectangle `Load Balancer` in the middle.
- Right: three white rectangles stacked vertically, each labelled `API`; one line from the load balancer to each.
- No arrowheads; lines only.

## D-02 - Load balancing algorithms, request distribution (00:20:00-00:40:00)
Frame: b_002245.jpg (counts most readable in b_004000.jpg)
- Three small diagrams stacked down the right side, one per algorithm (text to their left: `Round Robin`, `Weighted Round Robin`, `least Connections`).
- Each: a rectangle (LB) on the left with three lines fanning out to three backend rectangles on the right; the numbers next to each backend are the request numbers it receives.
- Round robin: `1,4` / `2,5` / `3,6` (strict rotation).
- Weighted round robin: middle backend drawn wider with a yellow outline (bigger machine) and gets more requests (`2,3,6,[cut off]`); top `1,5`; bottom `4,8`.
- Least connections: top `1,5,7`, middle `2,4,8,9`, bottom `3,6,10`.
- Emphasis (00:36:15-00:36:30): red loops around the three least-connections backends and a red `0` in the top one (zero open connections).

## D-03 - One LB server, two TCP connections per request (00:44:15-01:09:42)
Frame: b_005715.jpg (also b_010800.jpg, b_005200.jpg for the first connection)
- Left: one rectangle `LB` (LB server) labelled `10.0.0.1 :9000` above it.
- Right: three stacked backend rectangles with `B`, `D` (likely "B"), `B` inside; addresses `10.0.0.7 : 8081`, `10.0.0.8 : 8081`, `10.0.0.9 : 8081` to their right.
- Under the LB: its in-memory list `B.Servs: [ 10.0.0.7 : 8081 / 10.0.0.8 : 8081 / 10.0.0.9 : 8081 ]`.
- Upper-left stick figure (user 1) → LB: yellow line `TCP1`, request label `/indexhtml` above it; LB → top backend: pink line `TCP2`. Dotted lines along both connections show the request going in and the response coming back.
- Lower-left stick figure (user 2) → LB: yellow line `TCP3`; LB → bottom backend: yellow line `TCP4`.
- Above: the LB's connection map `{ tcp1 → tcp2` / `tcp3 → tcp4 }`.
- Emphasis (01:09:00): red along TCP1 and TCP3.

## D-04 - Load balancer brainstorm: config, health, monitoring, DNS (01:09:45-01:50:51)
Frame: b_015051.jpg (final; also b_011330.jpg for the config/DB stage, b_012630.jpg for the console stage, b_013930.jpg for monitoring)
- Centre: main rectangle `LB` with a small yellow square (in-memory config) and a second small square in its top-right corner; green `10.0.0.2` below it. Above it a second rectangle `LB` with small circles `o` / `oo` (agents) and green `10.0.0.1` above it.
- Left: two stick-figure users with lines/arrows into the main LB.
- Right: three rectangles `B Srv1`, `B Srv2` (hatched over in pink = down), `B Srv3`; curved lines from the LB to each. Further right: a stack of three blank rectangles (more instances).
- Top: a stack of three rectangles, front one pink `Orchestrator` (written `Orchestrahe`). Light-blue curves labelled `hb` from it down to each backend with arrowheads; `/status` / `/health` and `8081` (double underlined) beside them. A yellow line from the orchestrator to the upper LB (it watches LB servers too). A white line from the orchestrator down and across into `DB`.
- Below the LB: cylinder `DB` joined to the LB by a vertical line. A horizontal pipe left of that line: light-blue curve from `DB` labelled `CDC` into the pipe, light-blue curve from the pipe up into the LB (config changes pushed to the LB). (Earlier form, 01:13: a yellow dotted curve `syn-` from the LB's square to DB = periodic sync.)
- Bottom: rectangle `LB Console API` with a line up into `DB`; stick figure `Dev` below it.
- Lower left: config block `{ b.servs: [ ip: pr. ], balancy: algo:, health_endpoint: " " }`.
- Top left: a time line with ticks, `10sec` under the first interval, a `1` mark, wavy marks between two ticks and the label `poll` (stale window between polls); `9091` boxed with a line to `Meta`, and `9090` below it (data port and admin/meta port of the LB server).
- Top right: cylinder `Metric` / `Vitals`, pink `Prometheus` to its left, light-blue `monitrng` [sic] under it; a light-blue line from the upper LB box to it; light-green curves from it to `B Srv1`-`B Srv3` and to the orchestrator.
- Far left: yellow `CoreDNS` above a rectangle `DNS`; green `paym.lb.` / `googl.com` → `10.0.0.1` / `10.0.0.2` / `10.0.0.3`; curved arrows between the top user and `DNS` (lookup and answer); a horizontal line from `DNS` to the orchestrator (the orchestrator updates DNS).
- Emphasis: 01:20:00 red circle on hatched `B Srv2`; 01:22:45 red circle on the stale window and `poll`; 01:48:30 red trace user → DNS → user → LB.

## D-05 - Orchestrator responsibilities and scaling inputs (prepared page, 01:50:54-01:50:57)
Frames: b_015054.jpg, b_015057.jpg
- Same layout as D-06 but at earlier stages: stick-figure `End Users` → lilac stacked `LB Servers` → two backend rectangles `Backend Servers`; pink stacked `Orchestrator` above with `hb` lines to the LB servers and to the backends and an `updates` line into `DB`; yellow pipe `Redis as PubSub` under the LB servers with three up-arrows into them; `CDC` arrow from `DB` into the pipe; pink `LB Console` / `APIs` under `DB` with a pink `Developer` stick figure.
- Second form adds a cyan cylinder `prometheus` (top right), cyan lines `CPU, mem, N/w` from the LB servers and `CPU, Mem, N/w` from the backends into it, and a highlighted `Query` arrow from the orchestrator to it.
- Text beside it: `Read about φ-accrual failure detection algorithm`; `Orchestrator [ Focussed responsibilities ]` with the three bullets (see board_log S52); `How will Orchestrator decide scaling LB servers ? Scaling will happen on CPU, Mem, # TCP connections`; `where do we have this data ? Monitoring Component ↳ Prometheus !!`.

## D-06 - Final load balancer design (prepared page, 01:50:59-03:36:30)
Frame: b_015105.jpg (also b_030845.jpg full page, b_032857.jpg with the paper reference)
- Top left: pink rectangle `Core DNS` with `↻` and `private infra` above it. Two pink vertical arrows between `Core DNS` and the top end user (query down, answer up). Pink arrow from the LB servers back to the user labelled `10.0.0.1`.
- Left: two stick figures `End Users`; pink `lb.payments.google.com` (written `lb.paymenb.google.com`) under the top one; white lines from both users to the LB servers. Below: `lb.paymenb.g.com/pay/arpit` (example URL).
- Centre: lilac stack `LB Servers` with a small yellow square (config copy). Below: yellow pipe `Redis as PubSub` with three yellow up-arrows into the LB servers; cylinder `DB` with a small square; yellow `CDC` line from `DB` up into the pipe.
- Right: two dark rectangles `Backend Servers`, white lines from the LB servers to each.
- Top: pink stacked `Orchestrator`; pink `hb` line to the LB servers and pink `hb` line to the backends; light-blue `updates` line into `DB`; yellow line from the orchestrator across to `Core DNS`; `leaderElec` above it.
- Top right: cyan cylinder `prometheus`; cyan line `CPU, mem, N/w` from the LB servers (running up and across the top) into it; cyan `CPU, Mem, N/w` line from the backends into it; highlighted `Query` arrow from the orchestrator to it.
- Bottom right: yellow box `Autoscaling` with a purple line from `prometheus` into it and a pink arrow into `LB Console`; pink `LB Console` / `APIs` with a pink line up to `DB`; pink stick figure `Developer` connected to `LB Console`. (03:34:00: a short white line added from `Autoscaling` towards `Developer`.)
- Bottom: `Read this paper : Maglev : A fast and reliable software load balancer`.
- Emphasis: 01:52:00 red loop user ↔ `Core DNS`, circle on `lb.payments.google.com`; 01:52:30 red trace `LB Console` → `CDC` → pubsub → LB servers; 01:52:45 red circle on the config square; 03:28:45 red loop along both `hb` lines.

## D-07 - Remote lock: central lock manager (prepared page, 01:59:45-02:47:30)
Frame: b_020015.jpg (also b_024730.jpg)
- Top: yellow rectangle `Lock Manager`.
- Bottom: three white rectangles `Machine 1`, `Machine 2`, `Machine 3`, each with an arrow up to the lock manager.
- Pink note to the right: `The 3 machines co-ordinate through a central lock manager`.

## D-08 - Unprotected remote queue, lock in a DB (02:09:45-03:01:18)
Frame: b_021745.jpg (also b_021030.jpg first form, b_030115.jpg with `k,v` / `Atomic` / `TTL` readable)
- An L-shaped arrow into the left end of a horizontal pipe (queue) labelled `Queue 7`, `Remok` [sic, "Remote"] under it; a row of small yellow squares (messages) near its right end.
- From the right end of the pipe, three lines down to `Consumer 1`, `Consumer 2`, `Consumer 3`.
- Below: a cylinder (database) with a line from each consumer into it; beside it `queue7 → C1` (first written `queue7 → C3`) and `TTL` below; at the right edge `k,v` / `Atomic` / `TTL`; to the left `Redlock` double-underlined.
- Emphasis: 02:14:15 red arcs from the queue end to Consumer 1 and Consumer 2 (two consumers reading at once); 02:17:45 red circle on `TTL`.

## D-09 - Redis as lock manager (prepared page, 02:22:15-03:06:27)
Frame: b_022215.jpg (also b_023554.jpg full page with code)
- Same queue and three consumers as D-08 at the top.
- From each consumer a pink line down then left with an arrowhead into a pink cylinder `Redis` / `lock Manager` (three parallel arrows).
- Below it the code `def acquire_lock (q): ...` and `def release_lock (q): ...` (text in board_log S63) and lilac `queue7 : consumer 1`.

## D-10 - Redlock: five independent Redis masters (prepared page, 02:27:45-03:04:48)
Frame: b_022930.jpg (also b_023500.jpg full page)
- Five identical white cylinders in a row, no connecting lines.
- Under them: `5 master nodes of Redis , No replication , All independent`, then the `Acquire lock:` steps (board_log S65-S66).
- Emphasis (02:50:27): red tick at the first cylinder (one node goes down).
