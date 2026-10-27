# Lecture 5 (lec08) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec08.mdx`, `lec08/{s0-header,c1…c8}.mdx`, the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec08/` (`so-far`, `s2-algorithms`, `s3-one-laptop`, `s4a/s4b-control-plane`, `s5a-dns`,
`s5b-design`, `s6a/s6b-remote-locks`, `s7-distributed-locks`), and the captions, alt text and on-screen strings of the four clips
(`l08-rr-vs-leastconn`, `l08-stale-config`, `l08-lock-ttl`, `l08-redlock`).
Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`,
`story/NOTES.md`, and the current pages of Lectures 1–4 and 6 for callbacks. No page file was edited.

**The code was run, not just read.** I ran it in the scratchpad against Redis 8 (redis-py 8.1) and Go 1.25:
- **Python:** the acquire loop, the check-then-delete and the Lua release ran exactly as printed.
- **Go:** the proxy body ran verbatim inside a minimal harness, with three `net/http` backends and 30 requests. Then I ran the proposed fix the same way.
- **MySQL:** there was no server to test against, so `GET_LOCK` was checked against the MySQL 8.4 manual.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / code that misbehaves as written) | 0 | 2 | 3 | 5 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 0 | 2 | 2 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions | 0 | 0 | 3 | 3 |
| **Total** | **0** | **2** | **8** | **10** |

High and medium:
- **F-01 (medium, error):** the Go proxy never closes either connection. Run as written, every request leaks two sockets and two goroutines (30 requests left 60 goroutines behind). The page then counts connections as the scarce resource in chapter 3, so the leak cuts against the chapter. The snippet also isn't a compilable unit.
- **F-02 (medium, error):** "Whoever holds the open connection holds the lock" is not true of the one-connection server as described. The kernel completes every waiting client's handshake, so all of them hold an open connection. No client can tell whether it holds the lock until the server says so.

---

## Issues

### F-01 · ERROR · medium · The Go proxy leaks both connections on every request
- **Where:** c1 §1.2, the Go block, and the paragraph after the pause ("When a copy does return… that return is the place to update anything you track per backend").
- **Current text:**
  ```go
  ln, _ := net.Listen("tcp", ":9090")
  for { … go lb.proxy(…) }
  func (lb *LB) proxy(req IncomingReq) {
      …
      backend.NumRequests++
      go io.Copy(backendConn, req.srcConn) // request: client → backend
      go io.Copy(req.srcConn, backendConn) // response: backend → client
  }
  ```
- **Problem:**
  1. Nothing ever calls `Close` on `srcConn` or `backendConn`.
     - When the client hangs up, the request copy returns. The backend connection stays open, so the response copy blocks forever on a backend read.
     - With an HTTP/1.1 keep-alive backend, the backend never closes either, so both sockets and both goroutines stay alive for good.
     - Measured: the page's body inside a harness (three `net/http` backends, 30 sequential `GET /index.html`) left **65 goroutines**. The fixed version below left **5**: 60 leaked, two per request.
     - Chapter 3 is about the connection budget (10,000 → 5,000 clients). This proxy spends two descriptors per request and never gives them back.
  2. Both return values of `io.Copy` are thrown away (`go io.Copy(…)`). So the prose "that return is the place to update anything you track per backend" describes code the reader can't see.
  3. As printed, the block is not one Go unit: `ln, _ := net.Listen` and the `for` loop sit at top level with no function around them.
  4. Smaller points, which the replacement also fixes:
     - The `Accept` error is ignored.
     - `backend.NumRequests++` runs in concurrent goroutines, which is a data race (harmless for a demo counter).

  The code is faithful to the ARLB screen (L-0127, L-0128 detail), and the page calls it "trimmed". But the page presents it as the core that works, and that is the problem.
- **Sources:** L-0127, L-0128, L-0129, L-0130, L-0137, L-0138 (fact-check: `io.Copy` returns nil or an error, "that return is where you update counters"). Transcript 00:58:12–01:02:08, 01:04:43–01:05:46.
- **Replacement:** use this block. It has the same lines and comments as the page, plus the closes and the wait. Tested: no leak, and responses arrive.
  ```go
  func (lb *LB) Run() {
      ln, err := net.Listen("tcp", ":9090")
      if err != nil {
          log.Fatal(err)
      }
      for {
          srcConn, err := ln.Accept() // wait for the next client
          if err != nil {
              continue
          }
          go lb.proxy(IncomingReq{srcConn: srcConn, reqId: uuid.NewString()})
      }
  }

  func (lb *LB) proxy(req IncomingReq) {
      defer req.srcConn.Close()
      backend := lb.strategy.GetNextBackend(req) // which backend? (chapter 2)
      backendConn, err := net.Dial("tcp", backend.String())
      if err != nil {
          req.srcConn.Write([]byte("backend not available"))
          return
      }
      defer backendConn.Close()
      backend.NumRequests++
      done := make(chan error, 2)
      go func() { _, err := io.Copy(backendConn, req.srcConn); done <- err }() // request: client → backend
      go func() { _, err := io.Copy(req.srcConn, backendConn); done <- err }() // response: backend → client
      <-done // one side hung up: the deferred Closes end the other copy
  }
  ```
  - Lead-in sentence: change "Here they are in a small experimental Go load balancer (ARLB), trimmed." to "Here they are, lightly cleaned up from a small experimental Go load balancer (ARLB)."
  - Paragraph after the pause: "When a copy does return, that is how the LB server learns the connection is over. In Go, `io.Copy` returns `nil` at a clean EOF, or an error such as a reset. `proxy` waits for the first return, then closes both connections so the other copy ends too; skip that, and every request leaves two sockets open for good. That return is also the place to update anything you track per backend. This little load balancer tracks one thing, the number of requests each backend has handled, which is enough to check that the balancing works."
  - Next sentence: "It isn’t efficient: it starts as many goroutines as there are connections" → "It isn’t efficient: it starts three goroutines for every client".
- The pause question ("Why does each `io.Copy` get its own goroutine?") and its answer still hold unchanged.

### F-02 · ERROR · medium · The one-connection lock: every waiting client also has an open connection
- **Where:** c7 §7.3, the paragraph "A server that accepts one connection at a time…" and the next one ("Two details decide whether it holds up…"). Also Fig 7·b (`OneConnectionLock`): the caption, the desc and the label "holds the lock".
- **Current text:** "Whoever holds the open connection holds the lock." … "The other clients aren’t turned away: the operating system completes their connections and parks them in the server’s backlog, where they wait without knowing whether they hold the lock, and they are refused only once the backlog is full."
- **Problem:**
  - The second paragraph is right, and it undoes the first. Every client in the backlog has a fully open connection: its `connect()` has already returned. So "holding the open connection" can't be the lock.
  - As described, a consumer whose connect succeeds would go ahead and read queue 7 while it is still sitting in the backlog. That is exactly the double read the lock exists to prevent.
  - The design works only if the server tells the client it has been accepted, and the client waits for that message before reading the queue.
  - "Refused only once the backlog is full" is also imprecise. listen(2) says a client *may* get `ECONNREFUSED`. Linux TCP by default ignores the SYN, so the client retries and its connect eventually times out.
- **Sources:** L-0289, L-0291 (fact-check simplified/low: "Clients therefore wait in the backlog without knowing whether they hold the lock until the server accepts and responds"), L-0293. Transcript 02:35:49–02:37:49.
- **Replacement:**
  - First paragraph, from "Whoever holds…" to the end: "The server writes one byte, “granted”, to the connection it accepts, and every client blocks reading that byte before it touches the queue. Whoever has received it holds the lock until it closes the connection. It is a fundamental idea, and a few hours of work to build."
  - Second paragraph, first sentence: "The other clients aren’t turned away: the operating system completes their connections and parks them in the server’s backlog. Their `connect` has already succeeded, which is why they must wait for the byte: until it arrives, an open connection means nothing. Once the backlog is full, new clients are refused or simply left retrying, depending on the operating system."
  - Fig 7·b caption: "A lock with no Redis: a TCP server that serves one connection at a time. It has accepted consumer 1’s connection and sent it “granted”: that is the lock. The other consumers are connected too, but wait in the server’s backlog for their own “granted”."
  - Fig 7·b desc: add "The server writes “granted” to the connection it accepts; the waiting consumers’ connections are open but have received nothing."
  - Fig 7·b label: "holds / the lock" → "got “granted”".

### F-03 · ERROR · low · TCP keepalive: the Go accept loop the page builds on has it on
- **Where:** c7 §7.3, "(on Linux, TCP keepalive is off unless enabled, and starts only after two hours idle)".
- **Problem:**
  - True of a bare socket. But the paragraph tells the reader to build this server from "chapter 1’s accept loop", which is Go.
  - Go's `net.Listen` turns keepalive on for every accepted connection by default: 15 s idle, 15 s interval, 9 probes. So a dead host is noticed after about 2.5 minutes of silence, not two hours.
  - The conclusion still stands: a lock held that long by a dead machine needs its own timeout. Only the number misleads.
- **Sources:** L-0293 (A-LDA-15); Go `net.ListenConfig.KeepAlive` / `net.KeepAliveConfig` docs. Transcript 02:37:36–02:37:49.
- **Replacement:** "(TCP keepalive is off unless the program turns it on, and Linux's default waits two hours before the first probe. Go's listener does turn it on, and even then a dead peer takes a couple of minutes to notice), so this lock needs a timeout of its own."

### F-04 · INTERNAL CONTRADICTION · low · `GET_LOCK` "a crashed holder frees it", next to a paragraph that explains why that isn't always so
- **Where:** c7 §7.3, MySQL paragraph: "the lock is released when your session ends, normally or not, so a crashed holder frees it."
- **Problem:**
  - True for a crashed *process*: its connection closes and the session ends.
  - Two paragraphs later, the page explains why a dead or partitioned *machine* leaves the server's socket open. That applies here too: MySQL keeps the session, and the lock, until `wait_timeout` (28,800 s by default) or TCP keepalive ends it.
  - The `GET_LOCK` facts themselves are correct: it returns 1 when acquired, it is released on session end, and it lives on a single mysqld (A-LDA-11; MySQL 8.4 manual, locking functions).
- **Sources:** L-0296, L-0297 (A-LDA-11), L-0293. Transcript 02:38:50–02:39:39.
- **Replacement:** "…and the lock is released when your session ends, normally or not, so a crashed holder process frees it (a holder whose machine vanishes frees it only when MySQL drops the idle connection, which you should set to a short timeout). It lives on a single MySQL server."

### F-05 · ERROR · low · "Every consumer waits in its acquire loop forever"
- **Where:** c8 §8 intro: "If that server goes down, nobody can take the lock, every consumer waits in its acquire loop forever, and the system stalls."
- **Problem:** the acquire loop the page printed (§6.4) doesn't wait when Redis is down. `r.set(…)` raises `redis.exceptions.ConnectionError` (tested), so each consumer crashes or retries on errors, depending on what wraps it. The point, that the system stalls, holds.
- **Sources:** L-0275. Transcript 02:27:53–02:28:40.
- **Replacement:** "If that server goes down, nobody can take the lock: every consumer's `SET` fails, and the system stalls."

### F-06 · ERROR · low · `fsync=always` is not a Redis setting
- **Where:** c8 §8.3: "the alternative is to have every node write each lock to disk before answering (`fsync=always`)."
- **Problem:** Redis's Redlock page uses the phrase "fsync=always", but code formatting presents it as a setting, and it isn't one. In `redis.conf` it is `appendonly yes` with `appendfsync always`. A reader who pastes `fsync=always` gets an error.
- **Sources:** L-0315, L-0317, L-0329 (fact-check: "persistence (AOF fsync=always)"). Transcript 02:51:06–02:53:29, 03:00:35–03:01:09.
- **Replacement:** "…the alternative is to have every node write each lock to disk before answering (`appendonly yes` with `appendfsync always`, at a cost in write speed)."

### F-07 · INTERNAL CONTRADICTION · low · The LB server's port, and a second process editing the first one's memory
- **Where:** c4 §4.2: "Next to the main process on port `9090`, run one more small process on `9091`… its handler reads the database and replaces the in-memory copy."
- **Problem:**
  - The design's LB server listens on `9000`: §1.1, §1.3, Fig 1·b, and `SoFarLb` "10.0.0.1:9000". `9090` was ARLB's port.
  - The teacher said 9090 here (01:26:39) because he was pointing at his code. On the page, it reads as a different server.
  - A separate *process* can't replace another process's in-memory copy unless they share memory. The teacher said so (L-0182 detail: "via shared memory between its processes"), and the page dropped it.
- **Sources:** L-0171, L-0174, L-0182, L-0102, L-0108. Transcript 00:58:12, 01:26:39–01:27:17.
- **Replacement:** "Give every LB server a second door. Next to the port clients use, `9000`, open a second one, `9091`, a “meta” port: a small handler in the same process, or a second process that shares its memory. Whoever changes the configuration makes an ordinary call to that port, and its handler reads the database and replaces the in-memory copy."
  - Figures and clips need nothing: `ChangeReaches` and the stale-config clip mention only `9091`.

### F-08 · DISTORTION · low · One engineer's opinion becomes "engineers"
- **Where:** c8 §8.1: "In the experience of engineers who have built them, few companies ever need a distributed lock…"
- **Problem:**
  - The source is one person's opinion (L-0276; fact-check unverifiable/low). The plural makes it sound like a consensus.
  - The fact-check also notes that many ordinary teams do take simple locks (cron jobs, deduplication). So it should be pinned to multi-node locks.
- **Sources:** L-0276. Transcript 02:27:53–02:28:40.
- **Replacement:** "In one engineer's experience, few companies ever need a lock spread over several servers: managed cloud services already give most teams the guarantees they need, and the ones who must build it are the teams building those services. A single-server lock like the one in chapter 7 is far more common."

### F-09 · DISTORTION · low · Lecture 4 pushed messages "to every server"
- **Where:** overview "Where you are": "<Lecture 4> pushed Slack’s messages to every server through a real-time Pub/Sub". c4 §4.3: "changes were pushed to every server the moment they happened".
- **Problem:**
  - Lecture 4's design (current `lec02/c8-hundred-servers.mdx`, lines 46–48) explicitly rejects broadcasting every message to every server: each Slack channel gets its own Redis channel, and only servers with members of it subscribe.
  - The callback describes the version Lecture 4 throws away.
  - The part this lecture needs is correct in both places: real-time, keeps nothing, at most once.
- **Sources:** L-0177; `lec02/c8-hundred-servers.mdx`. Transcript 01:27:17–01:28:39.
- **Replacement:**
  - Overview: "<Lecture 4> pushed Slack’s messages between servers through a real-time Pub/Sub."
  - §4.3: "Polling couldn’t be relied on there either, and every message was pushed to the servers that needed it the moment it happened, through a real-time Pub/Sub."

### F-10 · INTERNAL CONTRADICTION · low · Fig 0·a names the load balancer `payments.example.com`
- **Where:** `OneEntryPoint` (`s2-algorithms.tsx`), the label on the box, wide and phone.
- **Problem:** everywhere else the load balancer's own name is `payments.lb.google.com` (§5.1, §5.5, Fig 5·a, 5·b, 5·d). §5.4 also uses `payments.google.com` for the *gateway* in front of it. A third name on the first figure invites the reader to connect it with the wrong one.
- **Sources:** L-0050, L-0209.
- **Replacement:** label `payments.lb.google.com`. Its phone layout may need the label to wrap.

---

## The writer's flagged doubts (NOTES.md, "Unsure")

1. **Numbers kept as the lecture's own.** All confirmed in the ledger or transcript:
   - 10,000 connections, stated as illustrative (L-0122).
   - 3–5 ms (L-0151), 10 s / 9 s (L-0169).
   - 5-minute TTL (L-0263), 1–2 s failover (L-0351).
   - 4/8/4 GB and 80%/40% (L-0060, L-0061).
   - Ports 9000/8081–8083 (L-0108, L-0123), 9090/9091 (00:58:12, 01:26:39), 8081–8084 (00:58:12), 6379–6383 (L-0321).

   The redis-py retry sleep (0.05–0.2 s) and the `GET_LOCK` timeout (10 s) are code parameters, not claims, and both are reasonable. Fine as they are. The 9090 port does need F-07.
2. **War stories told as experience.** Each matches the transcript:
   - **First Go load balancer:** March 2021, in-laws, "I explained load balancer to everyone I could find… No one understood", 5–6× faster than Nginx (00:40:20–00:42:16).
   - **Reserved instances:** told as "one team".
   - **apt-get:** "one engineer", around 2008.

   The exception is "few companies need distributed locks". It is told as the experience of "engineers", plural; see F-08.
3. **Framing that is the writer's own.**
   - **5.5 hand-off (leader election as a hidden case of taking turns):** sound and consistent with L-0351/L-0354.
   - **8.4 scale vs fault tolerance:** a faithful reading of L-0287/L-0288 applied back to Build 1. The "database standby serves no reads" link uses A-DSC-08 correctly.
   - **Fencing-token gloss:** correct, the standard definition from the Kleppmann post (A-LDA-09) and Redis's Redlock page (A-LDA-08). Nothing is invented.
4. **Callbacks to lec02/lec03 written while those were being rewritten.** Re-checked against the pages on disk:
   - **Lecture 4 (lec02):** "hands a message to every subscriber connected at that moment, and keeps nothing" matches `lec02/c8` and `c10`. The "to every server" wording does not; see F-09.
   - **Lecture 6 (lec03):** two masters, `1, 2, 3, 4` on each, order 3 twice, matches `lec03/s0-header.mdx` and `c1-order-three.mdx`. lec03's header also describes this lecture accurately.
   - **Lecture 1 (lec04):**
     - The day-zero design (users, LB, API server, DB) matches `c1-still-green.mdx` line 21.
     - The heartbeat "promise" matches `c5-spike.mdx` lines 83–90.
     - The home-router reason in §3.2 matches `c1` §1.3.
   - **Lecture 2 (lec01):**
     - Dividing peak by one machine's capacity matches `c2-campaign.mdx` line 53.
     - The autoscaling rule on average CPU behind the load balancer matches line 60.
   - **Lecture 3 (lec05):** the database kept the lock record. Consistent.
5. **Clip `l08-lock-ttl` shows `c1`/`c2` as stored values.** Acceptable: the clip's lead says they stand for each consumer's token, and §6.4 already insists on a unique token, so nothing contradicts. No re-render needed.

## Checked and found correct

**Code and commands (run or checked against primary docs)**
- **Round robin:** `s.Index = (s.Index + 1) % len(s.Backends)` is correct and matches the ARLB screen (L-0133).
- **`SET queue7 <token> NX EX 300`:** correct syntax. "OK if set, nil otherwise" is right (L-0265 fact-check). The warning against `SETNX` + `EXPIRE` and the 20-random-byte token match A-LDA-01/A-LDA-02.
- **redis-py acquire loop:** runs as printed.
  - `r.set(..., nx=True, ex=300)` returns `True`, and returns `None` for a second contender, so `while not …` is correct.
  - The TTL is 300 s.
  - `secrets.token_hex(20)` is 20 random bytes.
  - The randomized sleep matches L-0267's fact-check.
- **Check-then-delete:** `r.get("queue7") == token.encode()` is correct, because redis-py returns bytes by default. The race described (GET, expiry, consumer 2 takes it, DEL) is exact (L-0271).
- **Lua release:** runs as printed.
  - `r.eval(RELEASE, 1, "queue7", token)` matches redis-py's `eval(script, numkeys, *keys_and_args)`.
  - It returns 1 for the owner, 0 for the wrong token, and 0 for a missing key (Lua `false ~= ARGV[1]`).
  - The comment "1 if released, 0 if the lock wasn't ours" is accurate.
  - "While a script runs, Redis runs nothing else" and "Lua is nothing special; the atomicity is Redis's" both match L-0273/L-0299/L-0300.
- **`GET_LOCK('queue7', 10)`:** returns 1 when acquired, is released when the session ends normally or abnormally, and lives on one server (A-LDA-11). The cron job (coarse) vs `expires_at` in the acquire statement matches L-0297's fact-check. See F-04 for the one caveat.
- **Lease extension Go deeper:** the Redis script resets the TTL only if the token matches; DynamoDB lock client, 3 s heartbeat on a 10 s lease (A-LDA-10).

**Build 1 facts and fact-check corrections applied once, correctly**
- **Proxy basics:**
  - Two connections per client and the in-memory map (L-0112–L-0116).
  - A byte stream, not packets (L-0117 fact-check).
  - Protocol-agnostic over TCP, with ICMP dropped (L-0118 fact-check).
  - No REST between LB and backend (L-0139).
  - The TCP proxy vs L7/packet LBs sentence (L-0102/L-0112).
- **`io.Copy`:**
  - It blocks until EOF, and the pause answer is right (L-0130/L-0140/L-0141).
  - It returns nil or an error, with no panic (L-0138 fact-check).
- **Laptop setup and the build/scale distinction:** one laptop, ports 9000/8081–8083 (L-0123); five hours (L-0132); building vs scaling (L-0144).
- **Round robin, weighted round robin and least connections:**
  - Round robin conditions (L-0053–L-0057).
  - Weighted 1:2:1 with 80%/40%; the PanelWRR request order 1,5 / 2,3,6,7 / 4,8 is a correct 1:2:1 deal (L-0059–L-0062).
  - The ALB menu: round robin, least outstanding requests, weighted random (L-0064 fact-check).
  - Least connections with random tie-break (L-0070–L-0074, L-0089).
  - The in-flight request vs keep-alive nuance (L-0073 fact-check).
  - The clip's round-robin placement (4, 7 and 10 on s1) is arithmetically right.
- **Why not route on CPU:** microseconds (L-0079–L-0081); background load reports via gRPC WRR (A-LBL-19).
- **Capacity and config:**
  - 10,000 ÷ 2 = 5,000 (L-0122 detail); unit economics (L-0041/L-0042).
  - Config minimum, DB, copy at startup, 3–5 ms (L-0147–L-0153).
- **Health checks:**
  - Service not VM, `/health`, TCP checks weaker (L-0158 fact-check), owner decides what it checks (L-0372/L-0373).
  - Pull not push and its three reasons (L-0371, L-0374–L-0376).
  - Remove and keep checking (L-0164 fact-check).
- **Stale copies and push:**
  - The 10 s poll gives 9 s of errors, N − 1 in general (L-0169/L-0170).
  - Meta port push (L-0171/L-0174); no extra handler service (L-0172); console changes (L-0173).
  - Pub/Sub at-most-once with re-pull on reconnect or Streams: the L-0227 "wrong" verdict is corrected once and not restated.
  - CDC and other publishers (L-0178/L-0180); ZooKeeper one-time watches (L-0331 fact-check).
- **Vitals and scaling:**
  - Time series vs key-value (L-0189); history, not a snapshot (L-0186–L-0190).
  - Prometheus *pulls* (L-0200 fact-check); the InfluxDB and "replicate storage" claims are dropped (L-0369/L-0370).
  - The orchestrator scales LB servers (L-0202); separate health checks (L-0348); the autoscaling component (L-0377/L-0378).
- **DNS:**
  - An IP belongs to a machine, with Maglev ECMP as the aside (L-0208 fact-check).
  - Private DNS and CoreDNS (L-0207–L-0213); the orchestrator updates DNS (L-0221).
  - DNS answers and steps aside (L-0218/L-0219); round robin or shuffle, no load awareness (L-0215/L-0337/L-0347 fact-check).
  - ELB 60 s TTL (L-0220); clients try the other IPs first (L-0231); CoreDNS replicas with up to three nameservers, not leader election (L-0353 fact-check).
  - The DNS-single-node-with-standby claim is correctly dropped (L-0234/L-0235 fact-check).
- **Leader election:**
  - Grunt-work followers, 1–2 s, stateless takeover (L-0351–L-0354, L-0366/L-0367).
  - The global monitor with its standby as the base of the recursion; the transcript at 03:34:51 says "having its own leader… minimized by having a standby".
- **Maglev and the edge:**
  - Maglev as the design's source (L-0229).
  - Reverse proxy, API gateway, consistent-hash sessions, authorization as business logic (L-0239, L-0340, L-0357, L-0362–L-0364).
- **Bottleneck vs SPOF:** plus RDS Multi-AZ "isn't a scaling solution" (L-0038 fact-check, A-DSC-08).

**Build 2 facts**
- **Queue 7:**
  - The brief and its constraints (L-0248–L-0253).
  - Real queues are at-least-once (L-0303 fact-check).
  - The four rejected ideas in the pause (L-0250–L-0254).
- **Why lock:**
  - Two transactions on one row (L-0010).
  - Lecture 3's database as the lock manager (L-0242).
  - MongoDB's 5 ms wait-then-abort (L-0305/L-0306 fact-check). The "waits until commit" claim is correctly dropped.
- **Sharing ladder:**
  - Threads/RAM (L-0243).
  - apt-get: `/var/lib/dpkg/lock`, the kernel-held `fcntl` lock released on exit (L-0244/L-0245 fact-check).
  - The network as the nearest shared medium (L-0246/L-0308).
  - A mutex is cheap and the network expensive (L-0311–L-0313).
- **Lock basics:**
  - The lock manager stores two things (L-0256); the TTL (L-0257).
  - Properties first, product last, with Redis and DynamoDB (L-0258, L-0260, L-0262, L-0298).
  - Atomic single command (L-0266).
- **Release:**
  - A plain DEL deletes another holder's lock (L-0268/L-0269).
  - Never delete what isn't yours (L-0270).
  - Every line can lag (L-0274).
- **ZooKeeper:** the lock recipe (A-LDA-12) and consensus replication.
- **Replicas:** async replication breaks a replica-based lock (L-0277 fact-check), with ZooKeeper, etcd and Chubby using consensus.
- **Redlock:**
  - Majority *and* time < TTL, usable time = TTL − acquire time (L-0279 fact-check, A-LDA-05).
  - Release on all five and random retry (L-0280, A-LDA-06).
  - The cost (L-0281).
  - Kleppmann's efficiency/correctness line (A-LDA-09).
- **The restart edge case:** told correctly once (C1 doesn't go back, the window is the whole TTL, delayed restarts), so the L-0316/L-0318/L-0319 corrections are applied and the as-taught version is not shown.
- **Remaining gaps:** process pauses and wall-clock expiry lead to fencing tokens (A-LDA-08). "Minimized, never fully covered" (L-0315/L-0322).
- **Practice and the closing argument:**
  - Five Redis on 6379–6383 with injected delays (L-0320–L-0323).
  - Distribute vs scale (L-0287/L-0288).

**Figures and clips**
- The desc text and labels of all 16 imported figures were read. Apart from F-02 (Fig 7·b) and F-10 (Fig 0·a), each matches its section and the ledger.
- `TwoHolders` steps 1–5 match the corrected model.
- `FinishedDesign` desc no longer cites the board.
- `OneConnectionLock` now says "wait in the backlog". F-02 asks for one more word on top of that.
- The four clips' captions and alt text are consistent with the text:
  - **stale-config:** 10 s poll, 9 s, meta port 9091.
  - **lock-ttl:** `SET queue7 c1 NX EX 300`, refused retries shown as `nil`, blind DEL, EVAL returning 0.
  - **redlock:** 3 of 5 in time, release, random retry, one node down.
  - **rr-vs-leastconn:** placements as above.

**Important losses:** none. The only core ledger items not cited on the page are L-0036 (its idea is carried by 5.5 and 8.4), L-0234 (dropped on purpose, fact-check) and L-0307 (dropped on purpose, fact-check: a lock is not a distributed transaction).
