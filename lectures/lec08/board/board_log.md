# Lecture 08 - Board log

Source video: `vedio/5_6073595677990980678.mp4` (1280x720, 3:36:34). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states add the short-lived states.

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen; `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles on the right.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow is used for headings, pink for key statements/notes and boxed rules, lilac/light purple for algorithm names and component boxes, green for underlined keywords. Red strokes are temporary highlighter / laser marks (noted only as emphasis).
- Page model: one long scrolling canvas of notes, most of it pre-written before class and scrolled through while teaching; some parts are added live. Many states are the same page at a different scroll position. In the middle part (00:57-01:08) the screen shows a code editor (load balancer code walkthrough) instead of the board.
- Participant names/faces in the right-hand column are deliberately not recorded.

---

## S01 - 00:00:00-00:00:12 - Title slide (b_000000.jpg, b_000012.jpg)
Topic: course title card (static slide, not handwriting).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on a magenta brush stroke) / `Distributed` / `Systems` (last line cut off at the bottom of the frame).
Change: first state; b_000012 is the same slide.

## S02 - 00:00:15-00:08:45 - Agenda (b_000845.jpg)
Topic: agenda for today.
Text (heading `Agenda:` in yellow; items in white, each preceded by `-`):
- `Approaching distributed systems`
- `Designing Load Balancer`
- `Remote and Distributed locks`
- `Synchronizing Consumers`
Change: new page.

## S03 - 00:09:00-00:10:15 - Distributed Systems (b_001015.jpg)
Topic: what a distributed system is.
Text:
- Heading (yellow, centred): `Distributed Systems`
- `Multiple Components` / `Multiple Machines` joined by a `}` brace to `Single coherent system` `↓` `Solves a bigger problem`
- Pink: `The best and the worst thing about distributed systems is`
- Pink box: `Anything that could go wrong would go wrong`
- Yellow: `Key to designing a good Distributed System` `↓`
- `Start with a Day0 architecture and scale each component` (`Day0` and `scale` in green, underlined)
Change: page scrolled to a new section.

## S04 - 00:10:30-00:12:00 - Design loop (b_001200.jpg)
Topic: iterative way to build a distributed system.
New text under `scale each component` `↓`: `see how it performs under load` / `rectify the system` / `re-architect`, with a curved pink arrow from the bottom of the list back up to the first line (a loop).
Change: scrolled down; loop lines visible.

## S05 - 00:12:15-00:12:30 (b_001230.jpg)
New text: fourth loop line `and repeat` (`repeat` in pink). Last line `see how it performs under l[cut off]`.
Change: scrolled; list complete.

## S06 - 00:12:45-00:14:30 - Why distributed systems? (b_001430.jpg)
Text: `Why distributed systems ?` / `- Scale` / `- Horizontal Scalability` / `- Fault Tolerance`.
Change: scrolled down; new section.

## S07 - 00:14:45-00:17:30 (b_001730.jpg)
Same "Why distributed systems?" list, scrolled further. No new content.

## S08 - 00:17:45-00:19:30 - Load Balancers (b_001930.jpg)
Topic: load balancer intro.
Text:
- Heading (yellow): `Load Balancers`
- Pink: `One of the most important component in any system - load Ba[cut off]` (runs behind the tiles; "load Balancer")
- `* We kind of take it for granted`
- Yellow: `Advantages of using a load Balancer` / `- Fault tolerance` / `- No over-clocked server`
- Yellow: `Load Balancing Algorithms` with pink `* which backend server to choose *`
Diagram (D-01): two stick-figure users on the left, a line from each to a lilac rectangle `Load Balancer`; three lines from it to three white rectangles `API`, `API`, `API` on the right.
Change: new page.

## S09 - 00:19:45-00:19:48 - Load balancing algorithms (b_001945.jpg, b_001948.jpg)
b_001945: scrolled down to the algorithms (same as S10 below, with least-connections counts `1,5,7` top and `3,6,10` bottom; middle count hidden behind a tile). b_001948: scrolled back up, same as S08. No new content beyond S10.

## S10 - 00:20:00-00:22:45 - Round robin, weighted round robin, least connections (b_002245.jpg)
Text (algorithm names in lilac, conditions in pink):
- `Round Robin` - pink `Uniform infrastructure` - `Distribute the load iteratively`
- `Weighted Round Robin` - pink `Non- Uniform infrastructure` - `Distribute the load iteratively but as per weights`
- `least Connections` - `Pick the server having the least connections from the load balancer` - pink `When response times has a big variance` `* Analytic[cut off]` ("Analytics", fully visible in S11)
Diagram (D-02): three small diagrams on the right, each an LB rectangle on the left with three lines to three backend rectangles; numbers next to each backend = which request numbers it gets:
- Round robin: `1,4` / `2,5` / `3,6`
- Weighted round robin: `1,5` / middle backend drawn wider and outlined in yellow (bigger machine; its numbers are behind the tile, [cut off]) / `4,8`
- Least connections: top `1,5,7` (seen in b_001945), middle `2,4,8,9,`, bottom `3,6,10`.
Change: scrolled down; sections shown.

## S11 - 00:23:00-00:35:15 (b_003515.jpg)
Same algorithms page, scrolled up. Least-connections request numbers are no longer shown beside the top two backends (bottom one behind a tile, `3,6,1[cut off]`). `* Analytics` fully visible.
Change: scroll; no new content.

## S12 - 00:35:30-00:35:39 - Design: Load Balancer (b_003530.jpg, b_003539.jpg)
Topic: designing a load balancer - requirements.
Text:
- Yellow: `Design : load Balancer`
- `Requirements : - balance the load` / `- tunable algorithm` / `- scaling beyond one machine`
- `Terminology : LB Server , Backend Server`
- `Brainstorm : LB configurations , Monitoring , Availability, Extensibility` (`Availability` partly behind a tile)
Change: page jumped to a later section; b_003539 same.

## S13 - 00:35:42 (b_003542.jpg)
Scrolled back to "Load Balancers" page (S08). No new content.

## S14 - 00:35:45-00:36:30 (b_003615.jpg, b_003630.jpg)
Algorithms page (S11) re-shown. Emphasis at 00:36:15: red highlighter traces the least-connections diagram, circling all three backends (all hold connections from the LB); at 00:36:30 a red `0` is written in the top backend (zero connections). No new written content.

## S15 - 00:36:45-00:39:45 (b_003800.jpg, b_003812.jpg, b_003915.jpg, b_003945.jpg)
Algorithms page (S11) re-shown during the least-connections Q&A; the red `0` emphasis has been cleared. No new content.

## S16 - 00:40:00 (b_004000.jpg)
Algorithms page zoomed out, so the counts behind the tiles become visible: weighted round robin middle (big) backend `2,3,6,[cut off]` (likely "2,3,6,7"); least connections top `1,5,[cut off]`, middle `2,4,8[cut off]`, bottom `3,6,10`. Confirms D-02.
Change: zoom; no new content.

## S17 - 00:40:15-00:43:00 (b_004245.jpg, b_004254.jpg, b_004300.jpg)
"Design: Load Balancer" page (S12) re-shown, fully visible (`Availability,` readable); b_004300 scrolled down to the empty area below `Brainstorm`. No new content.

## S18 - 00:43:15-00:44:00 (b_004400.jpg)
Same "Design: Load Balancer" page. No new content.

## S19 - 00:44:15-00:46:30 - One LB server, three backends (b_004600.jpg, b_004609.jpg, b_004612.jpg, b_004615.jpg, b_004618.jpg)
Topic: drawing the single LB server and its backend servers with addresses.
Diagram (D-03, first form), drawn live below `Brainstorm`: one rectangle (LB server) on the left labelled `10.0.0.1`; three rectangles stacked on the right (backend servers), labelled `10.0.0.7` (above the top one), `10.0.0.8` (between top and middle), each with port `8081` written to its right.
b_004612 is a deep zoom on the canvas (no new content); b_004615 a pan; b_004618 a zoomed-out overview of the whole page (title down to the D-03 boxes).
Change: new drawing started.

## S20 - 00:46:45-00:47:30 - LB config: list of backend servers (b_004730.jpg)
New text in D-03:
- next to the backends: `10.0.0.7 :` (with `7` underlined) / `10.0.0.8 :` / `10.0.0.9 :` (ports run behind the tiles, [cut off]; earlier `8081`)
- under the LB server: `B.Servs: [` / `10.0.0.7 : 8081` / `10.0.0.8 : 8081` / `10.0.0.9 : 8081` / `]` (the LB's in-memory list of backend servers)
- under the backends: `/index.h[cut off]` (start of "/index.html")

## S21 - 00:47:45-00:57:30 - Client to LB to backend: two TCP connections (b_004930.jpg, b_005200.jpg, b_005430.jpg, b_005715.jpg, b_005727.jpg)
Diagram (D-03, final form) built over these minutes (extra frames pulled at 00:49:30, 00:52:00, 00:54:30):
- 00:49:30 (b_004930): letters `B`, `D` [sic? likely "B"; the middle box reads "D"], `B` written inside the three backend boxes; LB box gets `LB` inside and its address becomes `10.0.0.1 :9000`; a stick-figure user on the left with a yellow line to the LB labelled `TCP`.
- 00:52:00 (b_005200): line label now `TCP1`; pink line from LB up to the top backend labelled `TCP2`; above, `{ tcp1 → tcp2 }` (the LB's connection map); `/indexhtml` above the user line (request path, written without the dot).
- 00:54:30 (b_005430): dotted lines along TCP1 (both directions) and along TCP2 (request going out, response coming back).
- 00:57:15 (b_005715): second stick-figure user (lower left) with a yellow line `TCP3` to the LB; yellow line from LB down to the bottom backend `TCP4`; map now `{ tcp1 → tcp2` / `tcp3 → tcp4 }` (second line written `tcp3 → tcp4`, last character cramped).
b_005727 same as b_005715 (camera tile only changed).
Change: diagram completed.

## S22 - 00:57:30-00:57:33 (b_005730.jpg, b_005733.jpg)
b_005730: screen switched to a web browser on a new tab (no board content). b_005733: gallery view, not kept for publication.

## S23 - 00:57:39-00:58:03 - Code: arlb repository (b_005739.jpg, b_005745.jpg, b_005757.jpg, b_005803.jpg)
Topic: the teacher's experimental load balancer code on GitHub.
Screen: browser typing a GitHub address (b_005739); GitHub "500 Ooops!!!" error page for `github.com/arpitbhayani/arlb` (b_005745, b_005757); then the repo page: files `.gitignore`, `README.md`, `go.mod`, `go.sum`, `lb.go`, `loadtest.py`, `main.go`, `strategy.go`; README heading `ARLB - Experimental Reverse Proxy and Load Balancer`, `Super simple, experimental reverse proxy (load balancer) in Golang.`, `go run .` (b_005803).
Change: screen share of browser, not the board.

## S24 - 00:58:00-00:59:03 - Code: lb.go structs, InitLB, Run (b_005800.jpg, b_005815.jpg, b_005845.jpg, b_005854.jpg, b_005857.jpg, b_005900.jpg, b_005903.jpg)
Screen: `arlb/lb.go` (135 lines).
- b_005800: `package main`, imports `"fmt"`, `"io"`, `"log"`, `"net"`, `"github.com/google/uuid"`; `type Backend struct { Host string; Port int; IsHealthy bool; NumRequests int }`; `func (b *Backend) String() string { return fmt.Sprintf("%s:%d", b.Host, b.Port) }`; `type Event struct {`.
- b_005845/b_005854/b_005857: `func InitLB()` - `backends := []*Backend{` four entries `&Backend{Host: "localhost", Port: 8081, IsHealthy: true},` ... ports `8082`, `8083`, `8084`; `lb = &LB{ events: make(chan Event), backends: backends, strategy: NewHashedBalancingStrategy(backends), }` (backends list highlighted at 00:58:57).
- b_005815/b_005903: `func (lb *LB) Run()` - `listener, err := net.Listen("tcp", ":9090")`, `defer listener.Close()`, `log.Println("LB listening on port 9090 ...")`, `go func() { for { select { case event := <-lb.events: switch event.EventName { case CMD_Exit: log.Println("gracefully terminating ...") return case CMD_BackendAdd: backend, isOk := event.Data.(Backend) ...`
- b_005900: accept loop - `for { connection, err := listener.Accept() ... // Once the connection is accepted proxying it to backend` / `go lb.proxy(IncomingReq{ srcConn: connection, reqId: uuid.NewString(), })` and `func (lb *LB) proxy(req IncomingReq) {` `// Get backend sserver [sic, "server"] depending on some algorithm`.

## S25 - 00:59:15-01:02:30 - Code: accept loop and proxy() (b_005915.jpg, b_005945.jpg, b_005948.jpg, b_010045.jpg, b_010057.jpg, b_010145.jpg, b_010200.jpg, b_010209.jpg, b_010212.jpg, b_010230.jpg)
Screen: `lb.go` lines 92-135.
- Accept loop (b_005915, b_005945, b_010212 with lines 100-103 highlighted): `connection, err := listener.Accept()` / `if err != nil { log.Printf("unable to accept connection: %s", err.Error()) panic(err) }` / `// Once the connection is accepted proxying it to backend` / `go lb.proxy(IncomingReq{ srcConn: connection, reqId: uuid.NewString(), })` (reqId line highlighted at 00:59:48).
- `func (lb *LB) proxy(req IncomingReq) {` (b_010045, b_010057 with line 118 highlighted, b_010200, b_010209): `// Get backend sserver [sic] depending on some algorithm` / `backend := lb.strategy.GetNextBackend(req)` / `log.Printf("in-req: %s out-req: %s", req.reqId, backend.String())` / `// Setup backend connection` / `backendConn, err := net.Dial("tcp", fmt.Sprintf("%s:%d", backend.Host, backend.Port))` (`tcp` highlighted at 01:00:45) / `if err != nil { log.Printf("error connecting to backend: %s", err.Error())` / `// send back error to src` / `req.srcConn.Write([]byte("backend not available"))` / `req.srcConn.Close()` / `panic(err) }`.
- End of proxy (b_010145, b_010230 with line 134 highlighted): `backend.NumRequests++` / `go io.Copy(backendConn, req.srcConn)` / `go io.Copy(req.srcConn, backendConn)` / `}`.

## S26 - 01:02:45-01:03:03 - Code: strategy.go (b_010245.jpg, b_010248.jpg, b_010254.jpg, b_010257.jpg, b_010300.jpg, b_010303.jpg)
b_010245: top of `arlb / lb.go` (repo marked Private; latest commit "consistent hashing."); b_010248 = end of proxy again; b_010254 GitHub page loading; b_010257 repo file list, cursor on `strategy.go`.
`strategy.go`:
- b_010303: interface methods `GetNextBackend(IncomingReq) *Backend`, `RegisterBackend(*Backend)`, `PrintTopology()`; `type RRBalancingStrategy struct { Index int; Backends []*Backend }`; `type StaticBalancingStrategy struct { Index int; Backends []*Backend }` (highlighted); `type HashedBalancingStrategy struct { OccupiedSlots []int; Backends []*Backend }`.
- b_010300: `func (s *RRBalancingStrategy) GetNextBackend(_ IncomingReq) *Backend { s.Index = (s.Index + 1) % len(s.Backends) return s.Backends[s.Index] }`; `RegisterBackend` appends; `PrintTopology` prints `[%d] %s`; `func NewRRBalancingStrategy(backends []*Backend) *RRBalancingStrategy {`.

## S27 - 01:03:15-01:03:54 - Code: round robin, hashing strategy (b_010315.jpg, b_010330.jpg, b_010333.jpg, b_010339.jpg, b_010342.jpg, b_010345.jpg, b_010348.jpg, b_010354.jpg)
- b_010315 / b_010333: round-robin `Init` (`s.Index = 0`, `s.Backends = backends`) and `GetNextBackend` (name highlighted; then `Index` highlighted).
- b_010330: `NewStaticBalancingStrategy`; `func hash(s string) int { h := md5.New() var sum int = 0 io.WriteString(h, s) for _, b := range h.Sum(nil) { sum += int(b) } return sum % 19 }`.
- b_010339: `func (s *HashedBalancingStrategy) Init(backends []*Backend)` - `key := hash(backend.String())`, keeps `OccupiedSlots` sorted using `sort.Search(len(s.OccupiedSlots), func(i int) bool { return s.OccupiedSlots[i] >= key })`.
- b_010342: inserts key and backend at `index`; `func (s *HashedBalancingStrategy) GetNextBackend(req IncomingReq) *Backend { slot := hash(req.reqId) index := sort.Search(... s.OccupiedSlots[i] > [cut off]) return s.Backends[index%len(s.Backends)] }` (consistent-hashing ring).
- b_010345: back to the top of `lb.go` (imports, Backend struct); b_010348: round-robin functions again (browser Back); b_010354: `InitLB()` again.

## S28 - 01:04:00-01:06:15 - Code: event loop and proxy end (b_010400.jpg, b_010415.jpg, b_010430.jpg, b_010445.jpg, b_010448.jpg, b_010454.jpg, b_010530.jpg, b_010545.jpg, b_010554.jpg, b_010557.jpg, b_010615.jpg)
- b_010400: event loop in `Run()` - `case CMD_Exit:` / `case CMD_BackendAdd: backend, isOk := event.Data.(Backend) ... lb.backends = append(lb.backends, &backend) lb.strategy.RegisterBackend(&backend)` / `case CMD_StrategyChange: strategyName, isOk := event.Data.(string) ... switch strategyName { case "round-robin":` (config can be changed at runtime through events).
- b_010415: accept loop again. b_010430-b_010615: end of `proxy()` (lines 119-135: dial backend, "backend not available", `backend.NumRequests++`, the two `go io.Copy(...)` lines). No new code.

## S29 - 01:06:30-01:07:00 (b_010700.jpg)
End of `proxy()`, `io.Copy(req.srcConn, backendConn)` highlighted (response copied back to the client). No new code.

## S30 - 01:07:15-01:07:42 (b_010715.jpg, b_010730.jpg, b_010742.jpg)
b_010715: gallery view, not kept for publication. b_010730, b_010742: blank black screen (screen share switching).

## S31 - 01:07:45-01:08:00 (b_010800.jpg)
Back on the board: D-03 (S21) re-shown in full. The connection map reads `{ tcp1 → tcp2` / `tcp3 → tcp4 }`; the second line's last digit is cramped and could also be read `tcp3` - the drawing (TCP3 from user 2, TCP4 to the backend) supports `tcp4`. No new content.

## S32 - 01:08:15-01:09:42 (b_010815.jpg, b_010818.jpg, b_010824.jpg, b_010827.jpg, b_010900.jpg, b_010915.jpg, b_010930.jpg, b_010939.jpg, b_010942.jpg)
D-03 re-shown while the teacher moves to the brainstorm (scrolls/zooms). Emphasis: 01:08:27 blue dashed laser loop around the whole drawing; 01:09:00 red highlighter along TCP1 and TCP3 (the client-side connections). b_010942 scrolled up: backend ports now visible `10.0.0.7 : 8081` (both `7` and `8081` underlined), `10.0.0.8 : 8081`, `10.0.0.9 : 8081`. No new content.

## S33 - 01:09:45-01:11:18 - LB configuration (b_011000.jpg, b_011015.jpg, b_011045.jpg, b_011054.jpg, b_011100.jpg, b_011103.jpg, b_011112.jpg, b_011115.jpg, b_011118.jpg)
Topic: what configuration the LB server holds.
Diagram (D-04, first form), new drawing below the Brainstorm line: rectangle `LB` (drawn at 01:09:45, b_011000 shows the empty box being placed); three rectangles on the right `B Srv` / `B Srv` / `B Srv` (01:10:15-01:10:45).
Text under the LB (white): `{` / `b.servs: [` / `ip: pr.` (`ip` underlined twice; "ip:port") / `],` / `balancing: algo:` (written `balancy: algo:`, handwriting cramped; audio "balancing algorithm") / `}`.
01:11:15: three curved lines from LB to the three B Srv boxes; blue dashed laser circle around the config block at 01:11:15 (emphasis). b_011118 scrolled up to show the Brainstorm line above.

## S34 - 01:11:30-01:13:48 - Where the config lives: DB and sync (b_011330.jpg, b_011342.jpg, b_011345.jpg, b_011348.jpg)
New in D-04:
- two stick-figure users on the left, each with a line to `LB`
- backends numbered `B Srv1`, `B Srv2`, `B Srv3`; `B Srv2` hatched over with pink zig-zag strokes (the server is down / removed)
- a small yellow square in the top-right corner of `LB` (in-memory copy of the config)
- a cylinder `DB` below the LB, joined by a vertical line; a yellow dotted curve from the LB's square down to the DB labelled `syn-` (sync, word cut short)
- the config block `{ b.servs: [ ip: pr. ], balancing: algo: }` moved to the lower left
b_011342/b_011348: zoomed-out views (blue dashed laser loop around everything at 01:13:48, emphasis). b_011345 = same.

## S35 - 01:14:00-01:14:27 - Orchestrator (b_011400.jpg, b_011415.jpg, b_011418.jpg, b_011424.jpg, b_011427.jpg)
New: above the diagram, a stack of three rectangles (several instances), the front one labelled in pink `Orchestrator` (written `Orchestrahe`, last letters cramped; [sic] "Orchestrator"). b_011418 shows the stacked box just drawn, before the label; b_011415 the label written. b_011424/b_011427 same.

## S36 - 01:14:30-01:15:45 - Orchestrator heartbeats (b_011515.jpg, b_011530.jpg, b_011533.jpg, b_011539.jpg, b_011545.jpg)
New: three light-blue curves from the orchestrator stack down to `B Srv1`, `B Srv2`, `B Srv3` (01:15:15), labelled `hb` (heartbeat, 01:15:30). b_011533 is a frame with a gallery strip; diagram unchanged. b_011545 slightly zoomed out.

## S37 - 01:16:00-01:17:48 - Health endpoint (b_011630.jpg, b_011645.jpg, b_011700.jpg, b_011715.jpg, b_011724.jpg, b_011727.jpg, b_011730.jpg, b_011733.jpg, b_011739.jpg, b_011742.jpg, b_011745.jpg, b_011748.jpg)
New in D-04:
- right of the heartbeat curves: `/status` (written `/stat[cut off]`, completed later as `/status`) above `/health`, and `8081` underlined twice (the backend's port the orchestrator pings) - written 01:17:15-01:17:30.
- in the config block: new line `health_endpoint: "  "` (written `health_endpo[cut off]:`, an empty quoted string; 01:17:48).
b_011630 short red emphasis stroke over `B Srv1`; b_011645/b_011700 pans; b_011739/b_011742 views of the config block; b_011745 zoomed-out view of the whole page.

## S38 - 01:18:00-01:18:45 (b_011830.jpg, b_011845.jpg)
Same D-04. b_011845 is a zoomed-out overview; red highlighter circles the orchestrator and the `health_endpoint` line (emphasis at 01:18:45). No new content.

## S39 - 01:19:00-01:20:15 - Orchestrator updates the DB (b_011930.jpg, b_012000.jpg, b_012015.jpg)
New in D-04: the heartbeat curves now end in arrowheads at `B Srv1`, `B Srv2`, `B Srv3` (orchestrator → backends); a vertical white line from the orchestrator down to the level of `DB`, then a horizontal line into `DB` (orchestrator writes backend health to the DB). Red highlighter circles the hatched `B Srv2` at 01:20:00 (emphasis). Config block closed with `}` below `health_endpoint`.

## S40 - 01:20:30-01:23:45 - Polling the DB every 10 s (b_012215.jpg, b_012245.jpg, b_012300.jpg, b_012303.jpg, b_012345.jpg, b_012400.jpg)
New, top left of D-04: a horizontal time line with tick marks, `10sec` under the first interval; at one tick a `1` above, with wavy marks above and below the line between two ticks (the window during which the LB's copy is stale) and the label `poll`. Red highlighter circles the wavy window (01:22:45) and the word `poll` (01:23:03) for emphasis.
01:23:45: a second small square drawn below the yellow square inside `LB` (second copy of the config, b_012345/b_012400).

## S41 - 01:24:15-01:26:30 - LB Console API (b_012630.jpg)
New in D-04: below the backends, a rectangle `LB Console API` with a line up into `DB` (it writes config to the DB); below it a stick figure labelled `Dev` connected to it; to the right of `B Srv3`, a stack of three blank rectangles (several instances).

## S42 - 01:26:39-01:27:15 - Admin port (b_012639.jpg, b_012642.jpg, b_012645.jpg, b_012715.jpg)
b_012639/b_012642 zoom/pan on D-04 (no new content). New: above `LB`, port `9090` (01:26:45), then `9091` boxed above it with a short line to the label `Meta` (01:27:15) - a second port on the LB server for config/metadata calls.

## S43 - 01:27:30-01:28:48 - CDC to the LB (b_012730.jpg, b_012830.jpg, b_012845.jpg, b_012848.jpg)
b_012730 zoomed-out view (no new content). New at 01:28:30: the dotted yellow `syn-` curve is gone; in its place a horizontal pipe (queue/stream) left of the LB-DB line, with a light-blue curve from `DB` labelled `CDC` into the pipe and a light-blue curve from the pipe up into `LB` (change data capture pushes config changes to the LB). b_012845/b_012848 same.

## S44 - 01:29:00-01:30:18 (b_012900.jpg, b_013000.jpg, b_013015.jpg, b_013018.jpg)
Same D-04, panned (b_013015 zoomed out). The stack of three blank rectangles to the right of `B Srv3` is visible. No new content.

## S45 - 01:30:30-01:34:15 - Multiple LB servers watched by the orchestrator (b_013200.jpg, b_013245.jpg, b_013257.jpg, b_013300.jpg, b_013315.jpg, b_013400.jpg, b_013415.jpg)
New in D-04: a second LB server box above the first, labelled `LB` with two small yellow circles (`o` / `o`) at its right; a yellow line from the orchestrator stack down to this LB area (the orchestrator monitors the LB servers too). The timeline and `9091`/`Meta`/`9090` now sit at top left. b_013300 is a zoomed-out overview of the whole page; b_013315-b_013415 same content.

## S46 - 01:34:30-01:36:42 - Metrics store (b_013545.jpg, b_013554.jpg, b_013557.jpg, b_013630.jpg, b_013639.jpg, b_013642.jpg)
New, top right of the page: a cylinder labelled `Metric` / `Vitals` (01:35:45). 01:36:30: a third small blue circle added in the upper LB box (`o` / `oo`) and a small blue circle in the main LB box; a light-blue line from the upper LB box up and across to the metrics cylinder (agents on the LB servers push vitals to the metrics store). b_013554/b_013557 same as b_013545; b_013630 zoomed on the centre; b_013642 same as b_013639.

## S47 - 01:36:45-01:39:30 - Prometheus (b_013700.jpg, b_013715.jpg, b_013718.jpg, b_013930.jpg)
New at the metrics cylinder: pink `Prometheus` to its left, light-blue `monitoring` under `Metric Vitals` (written `monitrng`, cramped). b_013700/b_013718 zoomed-out views.
01:39:30 (b_013930): light-green curves from the metrics cylinder down to `B Srv1`, `B Srv2`, `B Srv3` and to the orchestrator (backends' telemetry agents also push to Prometheus; the orchestrator reads utilisation from it).

## S48 - 01:39:45-01:41:12 (b_014030.jpg, b_014045.jpg, b_014048.jpg, b_014100.jpg, b_014109.jpg, b_014112.jpg)
Zoomed-out overview of the finished monitoring picture (D-04) while moving to the next question; b_014112 slightly zoomed in. No new content.

## S49 - 01:41:15-01:42:00 - Two LB servers need one address: DNS (b_014200.jpg)
New in D-04: green IPs on the two LB servers (`10.0.0.1` above the upper LB, `10.0.0.2` below the main LB); at left a rectangle `DNS` with green `10.0.0.1` / `10.0.0.2` under it (one name resolving to both LB servers).

## S50 - 01:42:15-01:50:30 - CoreDNS (b_014830.jpg, b_014845.jpg, b_015030.jpg, b_015045.jpg)
New: yellow `CoreDNS` above the `DNS` box; green `paym.lb.` / `googl.com` (handwriting compressed; audio: "payments.lb.google.com") with an arrow `→` to `10.0.0.1` / `10.0.0.2`. Red highlighter (01:48:30-01:48:45) traces user → DNS → back to user → LB (emphasis, the resolution path).
01:50:30 (b_015030): white curved arrows between the top user and `DNS` (ask / answer), two curved arrows from the users into the LB; a horizontal line from `DNS` to the orchestrator (the orchestrator updates DNS entries).
b_015045: zoomed-out overview of the page; a third entry `10.0.0.3` [partly illegible] appears under the DNS IPs.

## S51 - 01:50:48-01:50:51 (b_015048.jpg, b_015051.jpg)
D-04 with the third DNS entry now readable: `10.0.0.1` / `10.0.0.2` / `10.0.0.3` (third written `(0 -0.0.3`, cramped). No other new content.

## S52 - 01:50:54 - Pre-written page: Orchestrator responsibilities (b_015054.jpg)
Topic: a prepared summary page (neat handwriting, shown zoomed out), flipped through quickly.
Text:
- Top: `Read about` / `φ-accrual failure detection algorithm` (written `ϕ-accrual`), with an arrow from the heading below up to it.
- Yellow heading `Orchestrator` - right: `[ Focussed responsibilities ]`
- `- keeps an eye on the health of the backend servers` (`on the health` highlighted, `backend servers` underlined)
- `- if any backend server is unhealthy,` / `orchestrator updates the DB ———→ { b_servers : [ ..... ] }` / `changes then reach the` / `LB servers through pubsub`
- `- Monitors health of LB servers & scales them up and down` (`LB servers` underlined)
Diagram (D-05, first form): see diagrams.md - stick-figure users (`End Users`) → stacked `LB Servers` (lilac) → two backend rectangles (`Backend Servers`); pink stacked `Orchestrator` above with `hb` lines to the LB servers and the backends and an `updates` line into `DB`; yellow pipe `Redis as PubSub` under the LB servers with three up-arrows into them; `CDC` arrow from `DB` into the pipe; pink `LB Console` / `APIs` below `DB`, with a pink `Developer` stick figure.

## S53 - 01:50:57 - Pre-written page: how the orchestrator decides scaling (b_015057.jpg)
Text:
- `How will Orchestrator decide scaling LB servers ?`
- `Scaling will happen on CPU, Mem, # TCP connections`
- `where do we have this data ? Monitoring Component` (pink) / `↳ Prometheus !!`
Diagram (D-05, second form): as S52 plus a cyan cylinder `prometheus` top right; cyan line from the LB servers labelled `CPU, mem, N/w` and from the backends `CPU, Mem, N/w` into it; a highlighted `Query` arrow from the orchestrator to Prometheus.

## S54 - 01:50:59-01:52:30 - Pre-written page: final load balancer design (b_015059.jpg, b_015100.jpg, b_015105.jpg, b_015109.jpg, b_015112.jpg, b_015200.jpg, b_015230.jpg)
Topic: the complete design (D-06, final form; extra frames pulled at 00:50:59 and 01:51:05).
Text on the page: `↻` / `private infra` (above `Core DNS`); pink `lb.payments.google.com` under the top user (written `lb.paymenb.google.com`, the "ts" cramped); `10.0.0.1` on the DNS answer arrow; `End Users`; `lb.paymenb.g.com/pay/arpit` [sic, "lb.payments.g.com/pay/arpit"] (an example URL) below; `leaderElec` above the orchestrator; `Autoscaling` (yellow box); `LB Console` / `APIs`; `Developer`; bottom: `Read this paper : Maglev : A fast and reliable software load balancer`.
Emphasis: 01:52:00 red highlighter loops user ↔ `Core DNS` and circles `lb.payments.google.com` (DNS lookup then connect to LB); 01:52:30 red trace from `LB Console` through `CDC` / pubsub to the LB servers and the orchestrator (config-change path).

## S55 - 01:52:45-01:59:33 (b_015245.jpg, b_015257.jpg, b_015315.jpg, b_015345.jpg, b_015400.jpg, b_015545.jpg, b_015900.jpg, b_015915.jpg, b_015930.jpg, b_015933.jpg)
D-06 page re-shown during the questions on local DNS cache and CoreDNS availability (scrolled up/down; b_015315 shows the bottom line `Read this paper : Maglev : A fast and reliable software load balancer` in full; b_015930 zoomed out). Emphasis at 01:52:45: red circle on the small yellow square inside `LB Servers` (the in-memory config copy). No new content.

## S56 - 01:59:45-02:04:42 - Remote locks (b_020015.jpg, b_020430.jpg, b_020442.jpg)
Topic: second half of the lecture (break 01:59:39-02:04:59; the page was already on screen).
Text (pre-written page):
- Yellow `Remote locks:` `Locks managed by a central machine` `↓` `Lock Manager`
- Pink: `The 3 machines co-ordinate through a central lock manager`
- `Multiple threads synchronize through` pink `Mutex & Semaphore`
- `Multiple processes synchronize through` pink `Disk`
- `Multiple machines synchronize through` pink `Remote lock`
- pink bracket from the "processes" line to light-blue `Interesting example: "apt-get upgrade" cannot be run twice concurrently`
- `To understand remote locks better, lets synchronize` (continues below)
Diagram (D-07): yellow rectangle `Lock Manager` on top; three white rectangles `Machine 1`, `Machine 2`, `Machine 3` below, each with an arrow up to the lock manager.
b_020430/b_020442: same page, camera tile hidden.

## S57 - 02:04:45-02:09:30 (b_020515.jpg, b_020615.jpg, b_020930.jpg)
Same page zoomed in and scrolled (dpkg / apt-get discussion). b_020930 shows the next lines: yellow `To understand remote locks better, lets synchronize` / pink `multiple consumers` `over an` pink `unprotected remote queue`. Start of a drawing below (cut off).

## S58 - 02:09:45-02:10:30 - Unprotected remote queue (b_021030.jpg)
Text (pre-written, below the remote-locks page): `Queue is unprotected` / `We want one consumer to make call to the queue at a time`.
Diagram (D-08, first form): an L-shaped arrow into the left end of a horizontal pipe (queue) holding a row of small yellow squares (messages) near its right end; from the right end, three lines down to rectangles `Consumer 1`, `Consumer 2`, `Consum[cut off]` (Consumer 3).

## S59 - 02:10:45-02:14:15 - Brainstorm: locking (b_021145.jpg, b_021157.jpg, b_021245.jpg, b_021300.jpg, b_021303.jpg, b_021345.jpg, b_021415.jpg)
New page: yellow `Brainsterm :` [sic, "Brainstorm"] `locking , Core properties`; the queue drawing D-08 copied below it, the queue labelled `Queue 7` (blue dashed laser circle around it at 02:11:45, emphasis), consumers `Consumer 1`, `Consumer 2`, `Consumer 3`.
02:14:15: `Remok` [sic, "Remote"] written under the queue; red highlighter arcs from the queue's end to Consumer 1 and Consumer 2 (two consumers reading at once, emphasis).

## S60 - 02:14:30-02:17:45 - Lock in a database, TTL, Redlock (b_021545.jpg, b_021645.jpg, b_021700.jpg, b_021745.jpg)
New in D-08: a cylinder (database) below the consumers, with a line from each consumer down to it; beside it `queue7 → C3` (02:15:45), changed to `queue7 → C1` with short underlines under `queue7` and `C1` (02:16:45); `TTL` below; a `k` at the right edge [cut off]; `Redlock` written to the left of the cylinder and double-underlined (02:17:00). Red highlighter circles `TTL` and underlines `queue7 → C1` at 02:17:45 (emphasis).

## S61 - 02:18:00-02:18:57 - Consumer's pseudocode and lock-manager requirements (b_021845.jpg, b_021857.jpg)
Text (pre-written page):
- yellow `Consumer's pseudocode` then a purple double bar, pink `ACQ_LOCK()` / light-blue `READ_MSG()` (blue dashed laser oval around it at 02:18:45) / green `REL_LOCK()`
- `All consumers wait on` pink `ACQ_LOCK()` `while one of them` light-blue `READ_MSG()`
- yellow `Our requirements from the lock manager ?`
- `- Atomic Operations →` pink `so that two machines do not ACQ_LOCK()`
- `- Automatic Expiration →` pink `avoid perpetual locking` (written `perpehial`, [sic] "perpetual")
- yellow `So, which DB ?` `Redis , DynamoDB` with an arrow up to Redis from `Popular choice because in-mem (fast)`
- yellow `Implementation:` `Set the key in Redis that says which consumer holds the LOCK and can read the mes[cut off]` ("message")
- `eg:` pink `queue7 : consumer 2 [ex : 300]` with arrows up from `lock held by consumer 2` and `expiration : 5 min`

## S62 - 02:19:00-02:19:39 (b_021930.jpg, b_021939.jpg)
Same page scrolled to the `Implementation` / `eg:` lines. No new content.

## S63 - 02:19:45-02:22:15 - acquire_lock / release_lock pseudocode (b_021945.jpg, b_022000.jpg, b_022003.jpg, b_022009.jpg, b_022045.jpg, b_022100.jpg, b_022103.jpg, b_022115.jpg, b_022130.jpg, b_022133.jpg, b_022139.jpg, b_022145.jpg, b_022200.jpg, b_022209.jpg, b_022212.jpg, b_022215.jpg)
Topic: the teacher scrolls back and forth between the requirements page (S61) and the code page below it.
Diagram (D-09): `Consumer 1`, `Consumer 2`, `Consumer 3` boxes at the top, each with a pink line and arrow pointing left into a pink cylinder labelled `Redis` / `lock Manager` (b_022215).
Text (code page, pre-written):
- top right, lilac: `queue7 : consumer 1`
- `def acquire_lock (q):` / `consumer_id = get_my_id()` / `While True:` / `v = redis.setnx (q , consumer_id , ex = 300)` (`setnx` pink) / `if v == 1 : return` (`return` green) / `else : continue` (`continue` pink)
- `def release_lock (q):` / `consumer_id = get_my_id()` / `v = redis.get (q)` (`get` pink) / `if v == consumer_id : redis.delete (q)` (`delete` green)
- right of release_lock: pink `"EVAL"` and a brace `}` with pink `Executed atomically using LUA script` (end of line [cut off] in most frames).
Emphasis: 02:19:48 red dot; 02:20:09 red circle on `queue7 : consumer 2`; 02:20:45 red brace beside `setnx`; 02:21:03 red arc from `q` to `consumer_id`; 02:21:30 red circle on `ACQ` (acquire); 02:21:45 red loops around the while loop (busy wait); 02:22:00-02:22:09 blue laser marks on the double bar of the pseudocode; 02:22:12 blue dashed circle around `return` / `continue`.

## S64 - 02:22:18-02:24:48 - Building up release_lock (b_022218.jpg, b_022224.jpg, b_022227.jpg, b_022230.jpg, b_022233.jpg, b_022245.jpg, b_022300.jpg, b_022303.jpg, b_022330.jpg, b_022342.jpg, b_022345.jpg, b_022348.jpg, b_022415.jpg, b_022430.jpg, b_022433.jpg, b_022445.jpg, b_022448.jpg)
Topic: why release must check ownership. The teacher hides most of `release_lock` and reveals it again.
- 02:22:18-02:22:33: requirements page and code page alternately; blue laser marks on `ACQ_LOCK()` (02:22:18), circle around the while loop (02:22:27), circle on `READ_MSG()` (02:22:33).
- 02:22:45-02:24:45 (b_022245, b_022300, b_022303, b_022330, b_022415, b_022433, b_022445): under `def release_lock (q):` only `redis.delete (q)` is visible (the `consumer_id = ...`, `v = redis.get (q)` and `if v == consumer_id :` parts are hidden), with `"EVAL"` / `Executed atomically using LUA script` still beside it. Red circle on `redis.delete (q)` at 02:24:45 (emphasis: deleting without checking can release someone else's lock).
- b_022342, b_022348, b_022430, b_022448: requirements page (S61) re-shown; red circle on `READ_MSG()` at 02:24:48. b_022345: zoomed-out view of D-09 (queue, consumers, Redis lock manager).
No new written content.

## S65 - 02:25:00-02:29:39 - Full release_lock again; distributed locks / Redlock (b_022730.jpg, b_022745.jpg, b_022748.jpg, b_022800.jpg, b_022830.jpg, b_022845.jpg, b_022900.jpg)
b_022730/b_022748: full `release_lock` re-shown (as S63). b_022800/b_022845: D-09 re-shown.
New page (b_022745, b_022830, b_022900), pre-written:
- yellow `Where else do see this in action ?` [sic, missing "we"]
- `MongoDB transaction uses remote locks on involved rows`
- yellow `Distributed locks` pink `[Redlock]` `← Distributed locks with Redis` (`Distributed` written `Distribukd` throughout, "t" looped)
- yellow `Idea: What we did in remote lock, just distribute it`
- Diagram (D-10): five identical cylinders in a row.
- `5 master nodes of Redis , No replication , All independent`
- `Acquire lock:` / `- client goes through 5 nodes, trying to ACQ_LOCK` with `with timeout` inserted above (caret) / `- if lock acquired on > 50% then` green `ACQUIRED`

## S66 - 02:29:03-02:32:15 - Redlock acquire, failure, why (b_022903.jpg, b_022930.jpg, b_022939.jpg, b_023045.jpg, b_023054.jpg, b_023115.jpg, b_023200.jpg, b_023209.jpg, b_023212.jpg, b_023215.jpg)
Same page (S65) scrolled down, revealing:
- `- else release the lock on acquired instances and return` pink `FAILED`
- yellow `But why are we doing this?`
- pink, underlined: `With distributed locking we now do not have a SPoF`
b_022903/b_023215: scrolled back to the top of the page. No other new content.

## S67 - 02:32:30-02:35:00 - Further reading (b_023245.jpg, b_023315.jpg, b_023415.jpg, b_023424.jpg, b_023500.jpg)
Text (pre-written):
- yellow `Read this paper` / `- Chubby : lock service for loosely coupled distributed systems`
- yellow `Read these blogs:` / `- https://arpitbhayani.me/blogs` / `> 13 blogs on distributed systems` / `- REDLOCK . Martin Kleppmann and implementation on GitHub` (written `implementaion` [sic], `GitHub` partly cut off in close-ups)
- yellow `Watch these videos:` / `- Distributed Transactions & its implementation on AsliEngineering by Arpit Bhayani`
b_023500: zoomed-out overview of the Redlock page (S65-S66).

## S68 - 02:35:15-02:35:30 (b_023530.jpg)
Zoomed-out overview of the further-reading page. No new content.

## S69 - 02:35:45-02:44:15 - Q&A over the lock pages (b_023545.jpg, b_023548.jpg, b_023554.jpg, b_023557.jpg, b_023630.jpg, b_023715.jpg, b_023830.jpg, b_023930.jpg, b_024030.jpg, b_024045.jpg, b_024115.jpg, b_024130.jpg, b_024200.jpg, b_024415.jpg)
Wrap-up and Q&A. The teacher flips between earlier pages: Redlock page zoomed out (b_023545), further-reading page zoomed out (b_023548), the whole Redis lock-manager page zoomed out (b_023554: D-09 plus full `acquire_lock` / `release_lock`), then D-09 (b_023557 to b_023930, b_024115, b_024200, b_024415), full `release_lock` (b_024030, b_024045), and the `So, which DB?` / `eg: queue7 : consumer 2 [ex : 300]` lines (b_024130; the `Implementation` line now reads in full `... and can read the message`). No new content.

## S70 - 02:44:30-02:50:27 (b_024445.jpg, b_024500.jpg, b_024730.jpg, b_024900.jpg, b_024930.jpg, b_024939.jpg, b_024942.jpg, b_025000.jpg, b_025015.jpg, b_025024.jpg, b_025027.jpg)
Q&A continues (synchronizing over shared storage, lock TTL, mutex vs network lock, Redlock edge case). Pages re-shown: D-09 (b_024445, b_024500, b_025000), the remote-locks page with the threads/processes/machines lines (b_024730), the `So, which DB?` / `eg:` lines (b_024900), the full acquire/release code (b_024930-b_024942), the Redlock page with the five cylinders (b_025015, b_025024, b_025027). Emphasis at 02:50:27: a short red tick at the first cylinder (one Redis node going down). No new content.

## S71 - 02:50:30-03:01:18 (b_025930.jpg, b_030100.jpg, b_030115.jpg, b_030118.jpg)
Redlock page held on screen during the Redlock edge-case answer, the malloc digression and the ZooKeeper vs Redis question (b_025930, b_030100, b_030118). b_030115: the `Brainsterm : locking , Core properties` page (S59-S60) re-shown with the text at the right edge now readable: `k,v` / `Ato[cut off]` (`Atomic`, fully visible at 03:02:24) / `TTL` (properties the lock store needs: key-value, atomic, TTL; written at 02:17 behind the tiles, first legible here).

## S72 - 03:01:30-03:02:27 (b_030215.jpg, b_030224.jpg, b_030227.jpg)
b_030215: final load-balancer design page (D-06) re-shown. b_030224: horizontal pan across two pages - right edge of the brainstorm page (`k,v` / `Atomic` / `TTL` readable) and the consumer's pseudocode page. b_030227: D-09 re-shown. No new content.

## S73 - 03:02:30-03:06:27 (b_030345.jpg, b_030400.jpg, b_030403.jpg, b_030430.jpg, b_030445.jpg, b_030448.jpg, b_030600.jpg, b_030615.jpg, b_030627.jpg)
Q&A (ZooKeeper vs Redis, can a consumer read multiple messages). Redlock page (S65-S66) re-shown (b_030345-b_030430, b_030448); b_030445 a horizontal pan between the D-09 page and the Redlock page; D-09 re-shown (b_030600, b_030615, b_030627). No new content.

## S74 - 03:06:30-03:36:30 - Final design page during the closing Q&A (b_030630.jpg, b_030830.jpg, b_030845.jpg, b_031030.jpg, b_031045.jpg, b_031300.jpg, b_031530.jpg, b_032100.jpg, b_032315.jpg, b_032715.jpg, b_032730.jpg, b_032830.jpg, b_032845.jpg, b_032857.jpg, b_032930.jpg, b_033245.jpg, b_033400.jpg, b_033415.jpg, b_033418.jpg, b_033424.jpg, b_033427.jpg, b_033630.jpg)
D-06 (final load balancer design) held on screen for the remaining questions (DNS and active-passive LBs, sessions, orchestrator SPOF / leader election, private CoreDNS vs public DNS, LB vs reverse proxy, auth, Prometheus, heartbeats, autoscaling). Emphasis: 03:13:00 small red mark at the left edge of `LB Servers`; 03:28:45 red loop tracing the `hb` lines from the orchestrator to the LB servers and to the backend servers (who sends heartbeats); 03:28:57 scrolled down to show `Read this paper : Maglev : A fast and reliable software load balancer`.
New at 03:34:00 (b_033400, b_033415, b_033418, b_033424, b_033427): a short white vertical line drawn from `Autoscaling` down towards `Developer` (b_033424/b_033427 zoomed in on the bottom part: `Redis as PubSub`, `CDC`, `DB`, `Autoscaling`, `LB Console` / `APIs`, `Developer`). b_033630: last frame, D-06 zoomed. No other new content.
