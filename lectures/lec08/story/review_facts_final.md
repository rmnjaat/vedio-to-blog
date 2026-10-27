# Lecture 5 (lec08): final fact re-check (check 4b)

Scope: the Revision 2 pages (`site/src/content/lectures/lec08.mdx`, `lec08/{s0-header,c1…c8}.mdx`), the figures changed in
Revision 2 (`s2-algorithms.tsx` Fig 0·a and Fig 2·b, `s6b-remote-locks.tsx` Fig 7·b) and the on-screen text of the four clips.
Checked against `review_facts.md` (F-01 to F-10), `NOTES.md` "Revision 2", the ledger, `factcheck/final.jsonl`, the transcript,
and `site/src/content/lectures/lec02/c8-*.mdx`, `c9-*.mdx` and `c10-*.mdx`. No page file was edited.

**Code was re-run, not just read** (scratchpad `l8test/`, Go 1.25.4, Redis 8, redis-py):
- **Go proxy (`l8test/goproxy2/`):** the page's `Run` and `proxy` were pasted verbatim. The only stand-in is a local `uuid.NewString()`. The harness has four `net/http` backends on 8081–8084, and the proxy listens on `:9090` as printed. `go vet` is clean.
  - 30 sequential `GET /index.html`: 30 responses, spread 7/8/8/7 by round robin. Goroutines after: **6, the same as the baseline**, so the F-01 leak is gone.
  - One keep-alive client with three requests on one connection: all three answered. Goroutines while it is connected: baseline + 4, which is the proxy's 3 plus the backend's own connection handler. After it closes, back to baseline. This confirms "three goroutines for every client".
  - Dead backend: the client receives `backend not available`, and the connection closes.
  - Client that half-closes (sends, then `CloseWrite`): **0 bytes back**. See N-01.
  - `-race`: reports the existing unsynchronised `RR.Index` update in `GetNextBackend` (and `NumRequests++`). This is not new. Review 1 called it harmless for a demo, and it is: the index is always computed modulo `len`.
- **Granted-byte TCP lock (`l8test/tcplock/`):** a server built as 7.3 describes. It accepts one connection, writes one byte, then reads until the client closes. Three clients:
  - All three `connect()` calls return at once (105, 114 and 126 ms), which confirms the backlog paragraph.
  - Only c1 gets the byte. c2 gets it at the instant c1 closes, then c3 when c2 closes. There is never more than one holder.
  - A holder *process* that exits without `Close` frees the lock: the next client got the byte 13 ms later.
  - `go doc net.KeepAliveConfig`: the defaults are 15 s idle, 15 s interval and 9 probes, about 2.5 min. That matches "a couple of minutes".
- **Redis lock (`l8test/lock_test.py`), unchanged code, re-run:**
  - Acquire gives TTL 300, and a second contender gets `None`.
  - The check-then-delete passes for the owner.
  - `EVAL` returns 0 for a wrong token, 1 for the owner's and 0 for a missing key.
  - With Redis down, the client raises `ConnectionError`, which supports the F-05 wording.
  - `CONFIG SET appendfsync always` → OK, and `CONFIG SET fsync always` → `ERR Unknown option`, which supports F-06.
- **Weighted round robin:**
  - Round robin: each server takes L/3. The small servers at 80% give L = 2.4 small-server units, and the 8 GB server sits at 0.8 / 2 = **40%**.
  - 1 : 2 : 1: the small servers take L/4 = 0.6 (**60%**), and the big one L/2 = 1.2 of its 2 units (**60%**).
  - Headroom: the first server hits 80% at L = 3.2, and 3.2 / 2.4 = **1.33**, so "about a third more traffic" is right.
  - The c2 text, the Fig 2·b gauges (80/40/80, 60/60/60), the desc and the caption all agree.

## Summary

| | Count |
|---|---|
| Old items fixed | 10 of 10 (F-01 to F-10) |
| Old items not fixed | 0 |
| New issues | 3, all low (N-01 to N-03) |
| High or medium | 0 |

---

## Old items

| Id | Status | Current text (quoted) |
|---|---|---|
| F-01 | **Fixed** | c1 §1.2: the block is now `func (lb *LB) Run()` with `if err != nil { log.Fatal(err) }`, `if err != nil { continue }` on `Accept`, `defer req.srcConn.Close()`, `defer backendConn.Close()`, `done := make(chan error, 2)` and `<-done // one side hung up: the deferred Closes end the other copy`. Lead-in: "lightly cleaned up from a small experimental Go load balancer (ARLB)". After the pause: "`proxy` waits for the first return, then closes both connections so the other copy ends too; skip that, and every request leaves two sockets open for good." Then "it starts three goroutines for every client". Run verbatim: no leak (above). The unsynchronised counters remain; acceptable, as review 1 said. |
| F-02 | **Fixed** | c7 §7.3: "The server writes one byte, “granted”, to the connection it accepts, and every client blocks reading that byte before it touches the queue. Whoever has received it holds the lock until it closes the connection." The backlog paragraph: "Their `connect` has already succeeded, which is why they must wait for the byte… Once the backlog is full, new clients are refused or simply left retrying, depending on the operating system." Fig 7·b: the caption and desc mention “granted”, and the label is "got / “granted”". Built and run: correct (above). |
| F-03 | **Fixed** | "(TCP keepalive is off unless the program turns it on, and Linux’s default waits two hours before the first probe. Go’s listener does turn it on, and even then a dead peer takes a couple of minutes to notice)". Matches the Go defaults (15 s + 9 × 15 s). |
| F-04 | **Fixed** | "so a crashed holder process frees it (a holder whose machine vanishes frees it only when MySQL drops the idle connection, which you should set to a short timeout). It lives on a single MySQL server." |
| F-05 | **Fixed** | c8 intro: "nobody can take the lock: every consumer’s `SET` fails, and the system stalls." |
| F-06 | **Fixed** | c8 §8.3: "(`appendonly yes` with `appendfsync always`, at a cost in write speed)". |
| F-07 | **Fixed** | c4 §4.2: "Next to the port clients use, `9000`, open a second one, `9091`, a “meta” port: a small handler in the same process, or a second process that shares its memory." c1 also has the note "(ARLB listens on `9090` and hardcodes four backends; the design on this page keeps `9000` and three.)" |
| F-08 | **Fixed** (moved to 8.4) | "In one engineer’s experience, few companies ever need a lock spread over several servers… A single-server lock like the one in chapter 7 is far more common." |
| F-09 | **Fixed** | Overview: "<Lecture 4> pushed Slack’s messages between servers through a real-time Pub/Sub." §4.3 is rewritten. See "4.3 polling wording" below. |
| F-10 | **Fixed** | `s2-algorithms.tsx` `OneEntryPoint`, wide and phone: the label is `payments.lb.google.com`. No `payments.example.com` is left anywhere under `figures/lec08` or the lec08 content. |

## The checks the coordinator asked for

### 6.1 is sourced from the lecture: yes
- **"Two transactions run in a distributed fashion… There is no single database whose memory holds the record":** transcript 00:02:34: "I have two transactions happening in a distributed fashion, both of them trying to update the same row… this is a distributed setup, not a single database" (L-0010). The "heart of keeping a distributed system’s data correct" line is L-0011 (00:02:34 and 02:05:12).
- **Lecture 3's database kept the lock in its own memory:** L-0242 (02:05:42). It matches `lec05/c2`/`c3`, where the airline check-in locks rows.
- **MongoDB on shards 1, 3 and 5:** transcript 02:43:16: "one lies in shard one, one lies in shard three, one lies in shard five" (L-0305). The page correctly uses 1/3/5, not the teacher's later "shard two" slip. Board B-052: "MongoDB transaction uses remote locks on involved rows".
- The old "waits until commit" claim (L-0306, fact-check imprecise/medium) is gone, and so is the 5 ms note. Nothing on the page now contradicts the fact-check. One leftover implication is N-02.

### c4 §4.3 polling wording against `lec02/c9-what-goes-wrong.mdx`: matches
The page says: "Waiting for a poll was too slow to deliver each message, so every message was pushed to the servers that needed it the moment it happened, through a real-time Pub/Sub, and a timed fetch on the client was kept only as the fallback for a push that got lost."

Lecture 4 says the same:
- **c6 line 32:** receiving has to be pushed; polling would be "a poor experience for something as real-time as chat".
- **c8:** each Slack channel has its own Redis channel, and only servers with members subscribe ("to the servers that needed it").
- **c9 line 39:** "run a small correction job on the client: every so often, fetch the channel’s last 50 messages… render whatever was missed, as if the push had arrived".
- **c10 lines 122 and 142:** "A timed fetch covers lost pushes".

c9 also offers a second option, "buffer messages in a second Kafka and replay them", for longer socket drops. "kept only as the fallback" reads as "only for lost pushes", not "the only fallback", so it does not contradict. It also agrees with L-0177 ("we could not rely on polling").

---

## New issues

### N-01 · ERROR · low · c1 §1.2: a client that half-closes gets no response
- **Where:** the Go block's last line (`<-done // one side hung up: …`) and the sentence "`proxy` waits for the first return, then closes both connections so the other copy ends too".
- **Problem:**
  - Some clients send their request and then shut down only their sending side (`CloseWrite`, `nc -N`, some HTTP/1.0 tools). The request copy then returns at EOF first, and `proxy` closes both connections before the backend has answered.
  - Measured: an HTTP/1.0 GET followed by `CloseWrite` got **0 bytes** back. With browsers, curl and Go's `net/http`, which don't half-close, every response arrived.
  - The code is correct for the page's purpose and the leak fix stands. The only thing wrong is the comment's assumption that the first EOF means "hung up".
- **Replacement (optional, prose only; keep the code):** after "…and every request leaves two sockets open for good.", add: "(This takes the first EOF as the end of the conversation. A client that only stops sending and still waits for the answer would lose it; production proxies pass that half-close on to the backend instead.)"

### N-02 · IMPRECISION · low · c6 §6.1: MongoDB's locks are kept per shard, not in a manager all machines reach
- **Where:** c6 §6.1, "Even a database spread over shards has to keep this record across machines: a MongoDB transaction that updates documents on shards 1, 3 and 5 holds locks on all three." This is followed by "What every one of these needs is a **lock manager**: something all the machines can reach, which keeps track of which item is locked by whom…"
- **Problem:**
  - The MongoDB sentence itself is right.
  - But "every one of these" places MongoDB under a lock manager "all the machines can reach". The fact-check (L-0305/L-0306, imprecise/medium) says the opposite: there is no shared remote lock store, and each shard holds the locks for its own documents locally.
  - Revision 2 cut the note that used to carry this correction, so the implication now stands alone.
- **Sources:** L-0305, L-0306 fact-check; MongoDB "Production Considerations" (transactions). Transcript 02:43:16–02:44:54.
- **Replacement:**
  - MongoDB sentence: "Even a database spread over shards has to keep this record across machines: a MongoDB transaction that updates documents on shards 1, 3 and 5 holds a lock on each of them, and each shard keeps the locks for its own documents. [[L-0305 L-0306]]"
  - Next paragraph, opening: "Outside a database, what you need is a **lock manager**: something all the machines can reach, which keeps track of which item is locked by whom and tells everyone else to wait. [[L-0241]]"

### N-03 · IMPRECISION · low · c4 §4.1: nginx's passive check trips after one failure by default
- **Where:** c4 §4.1, "nginx marks a server unavailable after a few failed attempts within a short window."
- **Problem:** in nginx's `max_fails`/`fail_timeout`, the default is **one** failed attempt within 10 s. The server is then kept out for 10 s (A-LBL-05, nginx `ngx_http_upstream_module`). "A few" undersells how quickly it reacts, although the point that follows ("that costs real requests first") still holds.
- **Replacement:** "nginx marks a server unavailable after a failed attempt (or as many as you configure) and keeps it out for ten seconds by default."

## Fresh pass on other Revision 2 text: found correct
- **Overview and dek:** the "how many seconds payments fail" hook is L-0046/L-0170. Lecture callbacks: Lecture 1's heartbeat promise, Lecture 2's peak ÷ one machine, Lecture 3's in-database locks, Lecture 4 "between servers". All are consistent with those pages.
- **c1:**
  - "the copying itself is two lines; with the accept loop and the dial, about ten" (L-0120).
  - The ARLB note (9090, four backends on 8081–8084), which matches the transcript at 00:58:12.
- **c2:**
  - "an hour or two" (L-0075).
  - The WRR arithmetic, recomputed above.
  - gRPC client-side WRR from background load reports (A-LBL-19).
- **c3:** the "(Which of them a client dials comes back in chapter 5…)" aside teaches nothing new.
- **c4:**
  - "up to almost N seconds", with 9 s in the pause, because the crash comes 1 s after a read.
  - One process calling every LB server (L-0349).
  - "delivers at most once" (lec02 c8, redis.io).
  - L-0202's reason, that the LB fleet is invisible to users.
  - The ZooKeeper watch sentence no longer makes the one-time-trigger claim.
- **c5:**
  - The 5.3 pause (operator vs automatic, 1–2 s) and the stateless takeover (L-0351/L-0366/L-0367).
  - The monitor watches the leader of every orchestrator cluster and triggers an election or adds nodes (L-0379–L-0381, transcript about 03:34).
  - The 5.5 hand-off no longer claims a leader-election link to Build 2, and rests on L-0010/L-0242.
- **c6:**
  - "reading and processing", which matches transcript 02:15:21 and 02:23:54.
  - The gatekeeper answer: it is itself a lock manager.
  - "queue 7 … the lock will be named after it" (02:11:37).
- **c7:**
  - The ZooKeeper recipe moved out, so "Each lock lives on exactly one server" is now true of all four stores named.
  - Clip 7·1 sits after EVAL, and its text matches.
- **c8:**
  - The ZooKeeper recipe in 8.1 is correct: sequential ephemeral nodes, lowest wins, and each waiter watches its predecessor.
  - The L-0281 placement criterion and Kleppmann's line.
  - "Redis measures expiry with the wall clock": correct, because key expiry is stored as an absolute Unix time.
  - The 8.5 checklist (10,000 connections → 5,000 clients; "close both when one side ends").
- **Clips:**
  - The redlock text is "r2 goes down. C1 still holds; no one else can win three of five." / "One node down, and the lock still holds." It is accurate, and the throughput claim moved to 8.4.
  - The stale-config and rr-vs-leastconn cues are unchanged in substance and still correct.
