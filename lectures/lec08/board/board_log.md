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
