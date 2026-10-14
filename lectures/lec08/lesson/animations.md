# Lecture 05 (lec08): animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`: a concept gets a clip only if the change over time *is* the lesson. Four clips, at most one per chapter, never two without prose between them. Each entry is a shortlist row plus rough beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure/stale/expired, green = ack/acquired. Past states ghost at 38%.

## Shortlist

| id | section | dynamic | verdict |
|---|---|---|---|
| `l08-rr-vs-leastconn` | §2.4 | accumulation (long requests piling up) + contention | **animate** |
| `l08-stale-config` | §4.4 | a window in time (stale config between polls) | **animate** |
| `l08-lock-ttl` | §6.6 | a window in time (TTL) + interleaving (two consumers) | **animate** |
| `l08-redlock` | §7.2 | contention (clients racing for a majority) | **animate** |
| TCP proxy: bytes both ways | §3.3 | a sequence the reader studies | StepThrough Fig 3·b (§3 has no clip; the copy loop is not a timing phenomenon) |
| resolve, then connect | §5.2 | discrete protocol steps | StepThrough Fig 5·b |
| final design, two paths | §5.4 | architecture overview | static Fig 5·c |
| Redlock edge case (two holders) | §7.3 | discrete states to study | StepThrough Fig 7·b (§7 already has its clip) |
| sharing ladder, lock stores, LB vs proxy | §6, §5 | taxonomy | static figures and tables |

---

## 1. `l08-rr-vs-leastconn`: why long requests pile up (§2.4, about 30 s)
- **Mechanism:** two lanes on one time axis, same request stream, three identical servers each. Requests arrive steadily; most are short (1 s), a few are long (a bar that keeps growing). Top lane, round robin: the LB deals requests 1, 2, 3, 1, 2, 3 regardless of what is running, so two long requests land on server 1 while servers 2 and 3 sit idle between short jobs. Bottom lane, least connections: the LB sends each request to the server with the fewest open connections, so the second long request goes to a free server. Each server shows a live connection counter.
- **Why motion beats a static figure:** the lesson is accumulation. Round robin's failure only appears over time, as long requests keep being dealt onto a server that is already busy while its neighbours empty out. A still shows one moment; the clip shows the pile-up forming and the counters diverging.
- **Static twin:** StepThrough Fig 2·c (five requests, step by step) and Fig 2·b panel c; board D-02 (`b_004000.jpg`).
- **Ledger taught:** L-0070, L-0072, L-0074, L-0075, L-0077, L-0078. **Context only:** L-0053, L-0079, L-0090.
- **Fidelity notes:** the request mix (mostly 1 s, a few "long") is illustrative of the class's "1 second, 1 minute, 1 hour" (L-0075); the clip labels long requests `long` without claiming a duration. Ties under least connections are broken arbitrarily (L-0089). The clip does not show CPU (the LB never sees it, L-0079).
- **Beats:**
  - B0 (0–3 s) hold: two lanes, `lb → s1 s2 s3`, counters `0 0 0`. *"Same requests, same three servers. Top: round robin. Bottom: least connections."*
  - B1 (3–10 s) short requests flow in both lanes; counters rise and fall evenly. *"While every request is short, both look the same."*
  - B2 (10–16 s) request 4 is long; both lanes send it to a server (s1 on top, s2 below); its bar keeps growing. *"Request 4 runs long."*
  - B3 (16–23 s) request 7 is also long. Top: round robin deals it to s1 again (s1 counter 2, ringed red). Bottom: it goes to the server with the fewest connections. *"Round robin hands the next long one to the busy server. Least connections finds a free one."*
  - B4 (23–28 s) top: short requests queue behind s1 (red); bottom: counters stay level (green). *"Under high variance, round robin piles work on one box."*
  - B5 (hold ≥ 2.5 s) poster: both lanes' end state, hand `big variance → least connections`.
- **Predict line:** "Some requests take a second and some take an hour. Which algorithm keeps one server from drowning?" (follows P1).
- **After:** "The load balancer only counts connections; it never sees CPU (2.5)."

## 2. `l08-stale-config`: nine seconds of errors (§4.4, about 28 s)
- **Mechanism:** one time axis, 0–20 s. Three backends behind two LB servers, each LB with its config copy. At 1 s, backend 2's process crashes. The orchestrator's health check catches it and updates the DB. Top lane, polling every 10 s: the LBs keep sending requests to backend 2 from their stale copies until the 10 s poll; those requests turn red and an error-rate meter spikes. Bottom lane, push (meta port or Pub/Sub): the DB change is pushed at once, the LBs' copies drop backend 2, and the error meter barely moves.
- **Why motion beats a static figure:** the lesson is a window in time: the stale copy is "true for a while, then isn't", and the cost is the number of requests that fall inside the window. Only motion shows requests streaming into a dead backend while the copy is stale, and the window collapsing when the change is pushed.
- **Static twin:** Fig 4·d (poll vs push), board D-04 timeline (`b_012400.jpg`, `b_015051.jpg`).
- **Ledger taught:** L-0154, L-0164, L-0167, L-0169, L-0170, L-0171, L-0176. **Context only:** L-0178, L-0181.
- **Fidelity notes:** 10 s and "1 s in" are the class's numbers (L-0169). The orchestrator removing the backend from the DB is drawn as taught (L-0164). The push lane is labelled `push (meta port or pub/sub)` and does not show Pub/Sub delivery as guaranteed (SN-03): one LB server is shown as connected throughout.
- **Beats:**
  - B0 (0–3 s) hold: `orchestrator`, `db`, two `lb` with config squares listing `b1 b2 b3`, three backends. *"Two LB servers route from in-memory copies of the backend list."*
  - B1 (3–8 s) at 1 s, b2's process crashes (red ✕). The orchestrator's next check fails; it writes `remove b2` to the DB. *"Backend 2 crashes. The orchestrator notices and updates the database."*
  - B2 (8–15 s) top lane: the LBs still list b2; every third request goes to b2 and returns red; an error meter climbs. *"Polling every 10 s: the LBs don't know yet. Requests keep going to the dead backend."*
  - B3 (15–19 s) top lane: the 10 s poll arrives; config squares drop b2; errors stop. A red bracket labels the window `9 s`. *"At the next poll the copies catch up. Nine seconds of errors."*
  - B4 (19–25 s) bottom lane, replayed from 1 s: the DB change is pushed immediately (dashed arrows into both LBs); the squares drop b2 at once; one red request at most. *"Push the change instead, and the window is nearly zero."*
  - B5 (hold) poster: both lanes, the red 9 s bracket over the near-zero sliver.
- **Predict line:** "A backend dies one second after the last poll. With a 10-second poll, for how long do users see errors?" (P3 sits just before).
- **After:** "Push on change: a call to each LB's meta port, or one Pub/Sub message every LB server hears (4.5)."

## 3. `l08-lock-ttl`: a lock outlives its holder's time (§6.6, about 32 s)
- **Mechanism:** one time axis. A Redis key `queue7` with a TTL bar. Consumer 1 acquires the lock with a 5-minute expiry and starts working; its work bar runs past the TTL mark. The key expires on its own; consumer 2, which has been retrying, acquires it. Consumer 1 finishes and deletes the key: consumer 2's lock vanishes while consumer 2 is still working. Replay with the atomic Lua release: consumer 1's release checks ownership inside Redis and deletes nothing.
- **Why motion beats a static figure:** two windows overlap in time (C1's work and the key's TTL), and the bug lives in their misalignment. A still can show the states (the StepThrough does); the clip shows the TTL draining while C1 is unaware, C2's retries landing the instant the key disappears, and the delete arriving late.
- **Static twin:** StepThrough Fig 6·d; board D-09 and S63–S64 (`b_023554.jpg`, `b_022445.jpg`).
- **Ledger taught:** L-0257, L-0263, L-0264, L-0267, L-0268, L-0269, L-0270, L-0273. **Context only:** L-0271, L-0310.
- **Fidelity notes:** "5 minutes / 300 s" is the class's number (L-0263, L-0264); the clip's axis is compressed and the caption says so. Commands are shown in the one-command form `SET queue7 c1 NX EX 300` (A-LDA-01, woven in next to L-0264) with the lock value shown as `c1`/`c2` for legibility (A-LDA-02's random token is in prose). The get-then-delete race (L-0271) and fencing tokens (A-LDA-04) stay in the StepThrough and prose.
- **Beats:**
  - B0 (0–3 s) hold: `redis: queue7 = (empty)`, consumers C1, C2. *"Two consumers, one lock in Redis with a five-minute expiry."*
  - B1 (3–8 s) C1 `SET NX EX 300` → green; key `c1`; TTL bar starts draining; C1's work bar starts. C2's retries bounce off (graphite ticks). *"Consumer 1 takes the lock. Consumer 2 keeps trying."*
  - B2 (8–14 s) TTL bar empties while C1's work bar is still running; key turns red `expired`. *"Consumer 1 is slow. The lock expires underneath it."*
  - B3 (14–19 s) C2's next retry lands: green, key `c2`; C2 starts working. *"Consumer 2 gets the lock. Two consumers are now working."*
  - B4 (19–25 s) C1 finishes, sends `DEL queue7`; key `c2` disappears, ringed red. *"Consumer 1 releases, and deletes consumer 2's lock."*
  - B5 (25–32 s) replay of B4 with `EVAL: if get == c1 then del`: returns `0`, key `c2` stays (green). Poster. *"Release only if it's still yours, in one atomic step."*
- **Predict line:** "Consumer 1's job takes six minutes; its lock expires after five. What happens when it finally releases?" (P8 precedes the StepThrough).
- **After:** "The owner check stops the wrong delete. It does not stop consumer 1 from still working; that needs a fencing token (A-LDA-04)."

## 4. `l08-redlock`: winning a majority (§7.2, about 30 s)
- **Mechanism:** five independent Redis nodes in a row. Two clients try to acquire the same lock on all five at once, each request taking a little time. C1 gets r1, r2, r3; C2 gets r4, r5. C1 counts 3/5 within its time budget: acquired. C2 counts 2/5: failed, so it releases r4 and r5 immediately and waits a random delay. Then one node (r2) crashes: C1's lock stays valid until its TTL runs out, and a third client cannot reach three of five while r2 is down. Finally C1 releases on all five.
- **Why motion beats a static figure:** contention is the lesson: two clients racing across the same nodes, partial wins, and the loser giving its locks back. Order and timing decide who wins. Fig 7·a shows the end state; the clip shows how it is reached and why the loser's release matters.
- **Static twin:** Fig 7·a; board D-10 (`b_022930.jpg`).
- **Ledger taught:** L-0275, L-0278, L-0279, L-0280, L-0281, L-0282. **Context only:** L-0287, L-0314.
- **Fidelity notes:** the clip uses the documented rule (majority *and* elapsed time < TTL, A-LDA-05) and shows a random back-off on failure (A-LDA-06), both as small labels. The winner does **not** keep grabbing the remaining nodes (SN-08); the edge case where crashed nodes return empty is left to StepThrough Fig 7·b.
- **Beats:**
  - B0 (0–3 s) hold: five nodes `r1..r5`, empty; clients C1, C2. *"Five independent Redis nodes. No replication between them."*
  - B1 (3–10 s) both clients send `SET NX` to every node; arrows land in a mixed order; r1–r3 show `c1`, r4–r5 show `c2`. *"Both clients race for the lock on every node."*
  - B2 (10–15 s) counters: C1 `3/5` green `acquired (in time)`; C2 `2/5` red `failed`. *"More than half is a win. Two of five is not."*
  - B3 (15–20 s) C2 releases r4 and r5 (cells blank), then a small clock `random delay`. *"The loser gives back what it took, at once, and retries later."*
  - B4 (20–26 s) r2 crashes (red ✕). A third client C3 tries: gets r4, r5 only, `2/5` failed. C1 still holds. *"One node dies. C1's lock is valid until its TTL, and nobody else can reach three of five."*
  - B5 (hold) poster: C1 holding r1, r3 (r2 crashed), hand `fault tolerant, not faster`. *"Distributing the lock buys fault tolerance, and costs a round trip to every node."*
- **Predict line:** "Two clients race for one lock on five nodes. One gets three, the other two. What must the second one do now?"
- **After:** "Edge cases remain: what if nodes holding your lock crash and come back empty? (7.3)."

---

## Build notes (for the animator)
- Reuse `site/src/animations/lib/` primitives (the lab's hand kit). Frame 0 = the static twin's first state; the last frame = the poster used in the page's clip placeholder.
- Render load-light: `--concurrency=1`, stills first, one mp4 at the end.
- Every caption and label above is checked against the listed ledger ids. Anything else (the request mix in clip 1, the compressed TTL axis in clip 3, the C3 client in clip 4) is marked illustrative in the storyboard's `fidelity_notes`.
