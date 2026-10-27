# Lecture 5 (lec08) story rewrite: notes

Follows `lectures/STORY_BRIEF.md`, `lectures/STORY_WRITER.md` and the lec04/lec05 models. Source: `site/src/content/lectures/lec08.mdx` + `lec08/{s0-header,c1…c8}.mdx`. Site review addressed: `scratchpad/review/03-lec5-lec6.md`, Lecture 5 part.

## Chapters (words per built page: captions, code, tables, hidden pause and recall answers and page chrome included; SVG desc/labels and collapsed clip-as-text excluded)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook, Fig 0·a, where you are (Lectures 1–4), the two builds, what you'll be able to do, before you start | 1,107 (incl. chapter list) | – |
| 1 | What is inside the box labelled “load balancer”? | 1,369 | About 7 min |
| 2 | Three servers, one request. Which one gets it? | 1,163 | About 6 min |
| 3 | One LB server can hold 10,000 connections. How many clients is that? | 1,013 | About 6 min |
| 4 | The database says backend 2 is dead. The LB servers haven’t heard. | 1,315 | About 7 min |
| 5 | Ten LB servers. Which address does the client dial? | 1,620 | About 9 min |
| 6 | Three machines, one queue that protects nothing. Who reads next? | 1,461 | About 8 min |
| 7 | The job takes six minutes. The lock lasts five. | 1,021 | About 6 min |
| 8 | All locking runs through one Redis. What happens when it dies? (incl. What you can now do, 4 recall questions, build-it, hand-off to Lecture 6) | 1,760 | About 9 min |

Total ≈ 11.8k counted this way (scratchpad `wc2.py` over `site.sh text`). The old page had ≈ 34k.

**Spine.** One question drives both builds: *this box runs on one machine; what happens when it dies, or isn't enough?*

- **Build 1, the load balancer (ch1–5).** The box everyone draws → day zero, LB server vs backends → one request = two TCP connections and a map → copy bytes both ways (Go code, pause on why two goroutines), the laptop setup, the first-build story, building vs scaling → `GetNextBackend`: round robin (one integer), weighted 1:2:1 (pause: 80% vs 40%, money, the reserved-instance story), least connections (clip; why a connection count means load), why not CPU (microseconds; background load reports are fine) → 10,000 connections = 5,000 clients (pause), unit economics → config in a DB, in-memory copy, never per request → the orchestrator, `/health`, the service not the VM, pull not push (pause; Lecture 1 callback) → polling's 9 s of errors (pause) → meta port push (clip) → fifty LB servers: real-time Pub/Sub, CDC, re-pull on reconnect, ZooKeeper alternative (rule box) → vitals, history, Prometheus scrapes, the orchestrator scales the fleet → one address: names not IPs, private DNS (CoreDNS) → DNS answers and steps aside (stepper), caching, retry/re-resolve, CoreDNS replicas → who watches the orchestrator (pause; leader election, stateless, global monitor = base of the recursion) → the whole design, two paths (climax) → what every box had in common: bottleneck vs single point of failure, one coherent system → hand-off.
- **Hand-off (5.5 → 6).** Everything now runs on many machines, and many machines reach for the same thing at once. Leader election already hid one case (only one leader). Inside one database (Lecture 3) the database kept the lock record; across machines nobody does unless you build it. What carries over: the "what if this one dies" question (asked again of the lock store in ch8), Redis (Pub/Sub → lock store), chapter 1's accept loop (→ the one-connection lock server), ZooKeeper (config watches → lock recipe), and the habit of assuming every line can lag.
- **Build 2, the lock (ch6–8).** Queue 7, three consumers, one unprotected call → why machines take turns (two transactions, one row; Lecture 3; MongoDB) → threads/RAM, processes/a kernel-held file lock (apt-get story), machines/the network (ladder) → the constrained puzzle (pause, four options) → lock manager: resource → owner, consumers obey it because you write them → holder dies: TTL → choose by properties (k-v, atomic, expiry) → `SET … NX EX` with a unique token, atomic commands, randomized retry (code) → a plain `DEL` deletes another's lock (pause + clip) → check-then-delete races → Lua `EVAL` (code), every line can lag; Go deeper: lease extension → other stores: MySQL row / `GET_LOCK`, one-connection TCP server (backlog, dead hosts), ZooKeeper → one Redis = SPOF → why not a replica (pause; async replication; consensus systems) → Redlock: majority + time < TTL, release on all, random delay (clip), the cost, Kleppmann + fencing tokens → the restart edge case told correctly once (stepper), delayed restarts, minimized not removed, simulate on a laptop → distribute for fault tolerance vs scale for throughput, tied back to Build 1 → what you can now do, recall → Lecture 6 (two masters, order 3 twice).

## Figures

- **Added** `site/src/figures/lec08/so-far.tsx`: `SoFarLb` (stages 0–4) and `SoFarLock` (stages 0–2), desk 640 + phone 330, built only from kit parts (+ `TimeSeries` from `s3-one-laptop-parts`). Each chapter opens on the design as it stands, with the previous chapter's piece marked "new". Render-checked at 1440 and 390 (screenshots in scratchpad `l8/shots/`).
- **Kept**: OneEntryPoint (overview), TwoConnections, OneLaptop, PanelWRR, ConfigCopy, OrchestratorAsks, ChangeReaches, VitalsFlow, ResolveConnect (stepper), BaseOfRecursion, FinishedDesign (climax), SharingLadder, QueueSeven state 2, OneConnectionLock, TwoHolders (stepper). All four clips: rr-vs-leastconn (2.3), stale-config (4.2), lock-ttl (7.1), redlock (8.2).
- **Fixed**:
  - TwoHolders: step 4 was “as taught: unlikely, a window of 2–3 s”, step 5 “more precisely… the real window is the TTL”. Now one correct model: C1 doesn't go back for more nodes, the window is the whole TTL; step 5 is the delayed-restart fix. Desc rewritten; figure height trimmed.
  - OneConnectionLock: red crosses and “turned away, or wait” → the others wait in the server's backlog (fact-check L-0291). Desc updated.
  - FinishedDesign desc: “(the board wrote leaderElec above it)” → “runs as an elected leader with followers”.
  - Clip `timeline.ts` `section:` metadata now names the new sections (not rendered; posters unaffected, so not regenerated).
- **Dropped from the page** (one representation per idea, or slogan/decoration): DayZeroLoop, CheckEveryLayer, Rule1Anything (approach chapter dissolved), LbSoFar (its labels gave away chapter answers), PanelRR, PanelLC, LeastConnSteps (the clip carries least connections), Rule2Pick, ProxyRequest (code + figure carry it), BuildThenScale, HalfBudget (would restate the 5,000 pause), PollVsPush (the clip carries it), ReactiveSketch, OneNameMany, DnsReturnsAddress, FrontDoor (API gateway is in a Go deeper box), LockManager, NearestStorage, QueueSeven state 1 (the lock so-far stage 0 shows it), RedisLockManager, WhoDeletes (the clip carries it), FiveNodes (the clip carries it), ScaleVsDistribute.
- **Files deleted** (nothing imports them): `figures/lec08/s0-header.tsx`, `figures/lec08/s1-approach.tsx`; the `ShardLocks` export (it drew the “as taught” vs MongoDB split) removed from `s6b-remote-locks.tsx`. Other unused exports are left in their files (as lec05 did). Old `s1-approach … s8-keep.mdx` deleted; `s0-header.mdx` rewritten.

## Cut, and why

- **The abstract “how to approach distributed systems” chapter** is dissolved and taught where used: day zero (1), unit economics (3), Murphy's law, bottleneck vs SPOF and “one coherent system” (5.5), every-line-can-lag (7.2), distribute vs scale (8.4). Cut: the professor's love/hate quote, Facebook home feed, microscope analogy, “misused term”, linear amplification as a term (Lecture 2 owns it).
- **Every “More precisely”/SourceNote box.** Each correct fact is stated once in the main text: TCP proxy vs L7/packet LBs; bytes not packets; ICMP dropped from the protocol list; `io.Copy` returns, no panic; ALB algorithm menu; in-flight request = busy; background load reports (gRPC WRR); 10,000 is illustrative; TCP health checks are weaker; LBs keep checking a removed backend; Pub/Sub at-most-once + re-pull/Streams; Prometheus pulls; DNS answers can carry several IPs; ELB 60 s TTL; clients try other IPs first; CoreDNS replicas, not leader election; Maglev ECMP as the network-level alternative; dpkg's kernel-held `fcntl` lock; real queues are at-least-once; MongoDB's 5 ms wait-then-abort; `SET NX EX` returns OK/nil, unique token, no `SETNX`+`EXPIRE`; randomized retry; listen backlog; keepalive defaults; Redis async replication; Redlock's time condition and release-on-all; the TTL-long window and delayed restarts; clock jumps and pauses → fencing tokens; Kleppmann's efficiency/correctness line; Multi-AZ isn't scaling.
- **Claims dropped because the fact-check found them wrong or unsupported:** Prometheus “mostly uses InfluxDB” and “scale by replicating storage”; Redis Pub/Sub “guarantees delivery”; DNS bottoming out in one node with a standby (the recursion now ends only at the orchestrators' global monitor, where it is sourced); C1 “keeps acquiring the remaining nodes” and the 2–3 s window; data warehouses using least connections; “a queue lock is a distributed transaction”; MongoDB's second transaction “waits for commit”; ICMP through a TCP proxy; the ephemeral-port aside.
- **Q&A tangents and off-road material:** hour-long HTTP/gRPC/keep-alive idle timeouts, closed browsers and BigQuery cancellation, persistent-connection pools, the “fifth request” worry beyond one sentence, Flipkart (unverifiable company claim), φ-accrual, the SRE-team advice, the CoreDNS Corefile, “seven more layers”, public vs private LB DNS updates, active-passive DNS weights, the hop-latency numbers, four-microservices story, ZooKeeper-is-Java opinion, SQS 10 messages/call, OCI visibility, `DELEX` (not in the fact-check), Raft, Chubby/Kleppmann/YouTube reading lists, malloc, 180 repos, Netflix, study logistics, course admin.
- **Kept but folded in:** the provocation, the first-build story (now inline, told as one engineer's story), the reserved-instance war story (“one team”), apt-get story (“one engineer”), toothache analogy, “base of the recursion”, “minimized, never fully covered”, simulate-on-a-laptop, the four rejected queue ideas (as pause choices), sessions/auth/reverse proxy/API gateway (one Go deeper box in 5.4), autoscaling component (Go deeper in 4.4), lease extension (Go deeper in 7.2).
- **Furniture:** class timestamps, legends, the “About this class” block, SectionEnd concept lists, per-chapter Check-yourself blocks (one set of 4 recall questions at the end), ForwardChips, SourceNotes, TradeoffTables, the eight-row SPOF table and “Ten lines to keep”.

## Self-check

- `pipeline/bin/site.sh build lec08`: ok (12 pages: overview + 8 chapters + 3 site pages).
- `links lec08`: zero broken.
- `figures lec08`: ok at 360/390/768/1440, light + dark.
- Grep of every built page (HTML, incl. SVG desc/title/aria) and of `page_text.md` for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student`: **0 hits**.
- **Titles alone** tell the story: what's inside the box → which server → 10,000 connections, how many clients → the database knows, the LB servers don't → which address → three machines, one unprotected queue → six-minute job, five-minute lock → the one Redis dies. No title states an answer.
- **Pauses** (1.2, 2.2, 3, 3.2, 4.1, 5.3, 6.3, 7.1, 8.1): answers hidden until a choice; the paragraph after each was checked not to restate it. 5.2 has no pause on purpose: the stepper is the representation of “DNS answers and steps aside”. Blurbs and the dek were reworded where they gave away an answer (ch2 CPU, ch7 atomic release, ch8 replica).
- **Limits:** one Go deeper per chapter at most (4, 5, 7), each under 120 words; one rule box in the lecture (4.3).
- **Opening and close:** opens on Lectures 1–4 (day-zero LB, heartbeats → health checks promise, capacity division, row locks inside one DB, real-time Pub/Sub), states both builds with their own problems up front, real hand-off in 5.5, ends on Lecture 6's two-masters picture (matches `lec03/s0-header.mdx` and `lec03/c1` on disk now; lec02's new `c10-whole-system.mdx` hand-off into this lecture also matches).

## Incoming links (for the coordinator)

| file:line | old sec → new sec | topic |
|---|---|---|
| `site/src/content/lectures/lec07/s0-header.mdx:44` | s5-2 → s5-2 (unchanged) | the load balancer and DNS |
| `site/src/content/lectures/lec07/s5-routing.mdx:85` | s5-7 → s5-4 | what a load balancer is (now the “what a load balancer is not” Go deeper in 5.4) |
| `site/src/content/lectures/lec07/s5-routing.mdx:97` | s5-2 → s5-2 (unchanged) | DNS answers; it doesn't forward |
| `site/src/content/lectures/lec07/s1a-etl-and-cdc.mdx:130` | s4-5 → s4-3 | CDC as one way to put a config change on the broker |
| `site/src/content/lectures/lec07/s1a-etl-and-cdc.mdx:175` | s6 → s6 (unchanged) | remote locks (Build 2 starts at ch6) |
| `site/src/content/lectures/lec09/s6-extend-and-optimize.mdx:44` | s4-5 → s4-3 | CDC sneak peek |
| `site/src/content/lectures/lec10/s6a-switching-servers.mdx:125` | s4-5 → s4-3 | making config changes reactive |

Links without `sec` (overview, still valid): `lec09/s10b-running-the-pipeline.mdx:57`, `lec09/s2-cdn.mdx:50`, `lec02/c10-whole-system.mdx:157`, `lec03/s0-header.mdx:20`, `lec03/c4-one-clock.mdx:45`, `lec04/c5-spike.mdx:90`. The old `lec02/s8b-websockets.mdx:53` (s4-5) no longer exists on disk after the lec02 rewrite.

## Shared files

None edited. lec08-owned clip files changed: `site/src/animations/clips/l08-{rr-vs-leastconn,stale-config,lock-ttl,redlock}/timeline.ts` (the `section:` metadata string only).

## Unsure

- **Numbers kept as the lecture's own:** 10,000 connections (stated as illustrative), 3–5 ms per DB call, 10 s poll / 9 s errors, 5-minute TTL, 1–2 s failover, 4/8/4 GB and 80%/40%, ports 9000/9090/9091/8081–8084/6379–6383. The redis-py retry sleep (0.05–0.2 s) and the `GET_LOCK` 10 s timeout are my choices for runnable code, not from the lecture.
- **War stories told as experience:** the first Go load balancer (2021, in-laws, 5–6× Nginx), reserved instances in the wrong sizes, apt-get in college, “few companies need distributed locks”. All unverifiable by the fact-check; framed as one engineer's or one team's experience.
- **Framing that is mine:** the 5.5 hand-off (leader election as a hidden case of taking turns), the 8.4 reading of Build 1's moves as scale vs fault tolerance (built on L-0287/L-0288), and the fencing-token gloss (standard definition from the Kleppmann post the fact-check cites; the fact-check itself only says “use fencing tokens”).
- **lec02 and lec03 were being rewritten at the same time.** The opening's Lecture 4 callback (“pushed Slack's messages to every server through a real-time Pub/Sub”, and 4.3's “hands a message to every subscriber connected at that moment, and keeps nothing”) and the closing's Lecture 6 picture (two masters, order 3 twice) were checked against what is on disk now; re-check after those land.
- **Clip lock-ttl** shows the stored values as `c1`/`c2`; the clip lead now says they stand for each consumer's token, so the clip wasn't re-rendered.

## Revision 2 (review_facts.md, review_reader.md, coordinator items)

### Word counts (same method)

| Page | Words | Meta |
|---|---|---|
| Overview | 1,134 | – |
| Ch1 | 1,373 | 7 min |
| Ch2 | 1,165 | 6 min |
| Ch3 | 1,031 | 5 min |
| Ch4 | 1,354 | 6 min |
| Ch5 | 1,533 | 8 min |
| Ch6 | 1,435 | 7 min |
| Ch7 | 1,060 | 5 min |
| Ch8 | 1,673 | 8 min |

Total ≈ 11.8k, with chapters ≈ 10.6k. The reading-time metas now add up to 52 min, down from 58. Built-page counts include code, captions and hidden answers, so prose reading is close to 50 min.

### review_facts: every item applied

- **F-01:** the tested Go block from review_facts replaces the proxy. It is a `Run()` function with `Accept` error handling, deferred `Close` on both connections, and two copy goroutines that signal on a channel. `proxy` waits on the first copy to finish.
  - The lead-in sentence is now "lightly cleaned up".
  - The paragraph after the pause explains the close: skip it, and every request leaves two sockets open.
  - "three goroutines for every client".
- **F-02:** the one-connection lock now writes a "granted" byte, and clients block until they read it. The backlog paragraph is rewritten: an open connection means nothing until the byte arrives, and a full backlog either refuses new clients or leaves them retrying.
  - Fig 7·b caption, desc and label "got “granted”" updated.
- **F-03:** keepalive. Off unless the program turns it on, and Linux's default is 2 h; Go's listener turns it on, and even then a dead peer takes a couple of minutes to notice.
- **F-04:** `GET_LOCK` is freed by a crashed holder *process*; a holder whose machine vanishes frees it only when MySQL drops the idle connection.
- **F-05:** when Redis is down, "every consumer's `SET` fails" (it no longer "waits forever").
- **F-06:** `appendonly yes` with `appendfsync always`, at a cost in write speed.
- **F-07:** the meta port is `9091`, next to the client port `9000`. It is a handler in the same process, or a second process that shares its memory.
- **F-08:** "In one engineer's experience… a lock spread over several servers… a single-server lock is far more common". Moved to 8.4 (reader 8a).
- **F-09:** Lecture 4 pushed messages "between servers", and in 4.3 "to the servers that needed it".
- **F-10:** Fig 0·a now uses the label `payments.lb.google.com`.

### Coordinator items

- **Lecture 4 polling wording (c4 §4.3):** the text said polling "couldn't be relied on" in Slack. That contradicted lec02 c9, where a timed fetch on the client is the correction fallback.
  - It now reads: waiting for a poll was too slow to deliver each message, so every message was pushed to the servers that needed it, and a timed fetch on the client was kept only as the fallback for a lost push.
  - This agrees with L-0177 and `lec02/c9-what-goes-wrong.mdx`.
- **Reader fix 1 (Build 2's motivation):**
  - **Checked:** the lecture never connects leader election to the lock build. "Leader" appears only in the orchestrator Q&A (03:15–03:35); the locking section's motivation is at 00:02:34 and 02:05:12–02:05:42.
  - So the 5.5 hand-off no longer mentions leader election, and chapter 8 doesn't close an orchestrator loop (reader 8e rejected).
  - The lecture's real motivation is now the spine: two transactions running "in a distributed fashion… not a single database" (L-0010), where no single machine's memory holds the lock record, as Lecture 3's database did (L-0242). MongoDB's multi-shard transactions are the real case of the same record kept across machines (L-0305).
  - 6.1 is rewritten around that. The "database does it for you" framing and the 5 ms detail are cut, and the queue is introduced as the smallest case of "nothing in the middle keeps the record".
- **Reader fix 2 (weighted round robin):** recomputed.
  - Under round robin each server takes a third of the load L. The small servers at 80% mean L = 2.4 small-server units, and the 8 GB server sits at 0.8 / 2 = 40%.
  - With 1 : 2 : 1, the small servers get L/4 = 0.6 (60%) and the big one L/2 = 1.2 of its 2 units (60%).
  - At 80% everywhere the total load would be 3.2, which is a third more than 2.4.
  - Changes: the text says "every server now sits near 60%… about a third more traffic fits before any reaches 80%"; the Fig 2·b gauges show 60/60/60 (the gauge goes red only under 50%); the desc and caption are updated.
  - The reader's own sum (0.8 + 0.8 + 0.4 = 2.0) was off, but the 60% conclusion holds.

### Reader items applied

- **H1, opening:** the first screen now opens on the payments situation: three servers, one crash, how many seconds payments fail. It uses only the lecture's own setup, with no new numbers. The dek is reworded to match.
- **Spoilers:**
  - **H2:** the ch8 blurb no longer gives away two holders.
  - **2b:** the Clip 2·1 caption is neutral.
  - **7a:** Clip 7·1 moved to the end of 7.2, as the recap after EVAL has been taught. The 7.1 pause answer now tells the blind-DEL timeline in two sentences.
  - **8b:** the Clip 8·1 lead asks only the open part.
  - **8c:** the clip's last caption, its alt text and the on-canvas takeaway ("fault tolerant, not faster") are now "One node down, and the lock still holds" / "one node down: still locked". 8.2 keeps only "five servers instead of one", and the throughput cost moved to 8.4. Posters regenerated (`site.sh posters lec08`).
- **Chapter 1:**
  - **H4:** "no overloaded server".
  - **H5:** "the copying itself is two lines; with the accept loop and the dial, about ten".
  - **1a:** a note after the code that ARLB uses 9090 and four backends while the design keeps 9000 and three.
  - **1b:** done through F-01.
  - **1c:** the opening is cut to two sentences.
- **Chapter 2:**
  - **2c:** the text says "an hour or two", matching the title (L-0075).
  - **2d:** "Least connections works like this"; the third "use least connections" is cut.
- **Chapter 3:**
  - **3b:** a parenthesis saying which LB server a client dials comes back in chapter 5.
- **Chapter 4:**
  - **4a:** "up to almost N seconds" in 4.1 and in What you can now do. The 9 s in the pause and clip stays, because the crash is one second after a read.
  - **4b:** nginx's passive checks, from fact-check A-LBL-05: they cost real requests first, so the list still has to change.
  - **4c:** calling fifty ports is one process calling every LB server on each change (L-0349).
  - **4d:** "delivers at most once" in prose, and "autoscaling (4.4)" named among the publishers.
  - **4e:** the ZooKeeper watch detail is cut.
  - **4f:** the "because" is replaced by L-0202's own reason: the LB fleet is invisible to users.
  - **4g:** the clip lead is shortened.
- **Chapter 5:**
  - **5a:** Maglev is now "covers the same ground at far larger scale, including the network-level road this design skipped".
  - **5b:** the transcript says only "doing the grunt work", unspecified, so it is cut. The pause now asks how a replacement takes over (operator vs automatic). The figure label is "any follower can take over".
  - **5c:** the transcript says the monitor "monitors the master nodes of all orchestrators… triggers leader election… or adds worker nodes". The text says that; "one orchestrator per load balancer" is not claimed.
  - **5d:** the sentence is split.
  - **5e:** "every LB server listens on the same port, 9000".
  - **5f:** the sessions sentence is cut from the Go deeper.
- **Chapter 6:**
  - **6a:** the "real queues" note is now a parenthesis after the constraints.
  - **6c:** "a gatekeeper could work, but only because it would itself be a lock manager… chapter 7 builds one".
  - **6d:** checked in the transcript. The 02:15:21 "done processing" and the 02:23:54 "timeout was set for 5 minutes to read and process the message" support it, so the rule is now "reading and processing", and the protocol, code comment and ch7 intro say read, process, release.
  - **6e:** "its ID is queue 7, and the lock will be named after it" (02:11:37).
- **Chapters 7 and 8:**
  - **7b:** the ZooKeeper recipe moved to 8.1, so 7.3's "each lock lives on exactly one server" is true.
  - **7c:** 5.5 is shortened to "assume anything that can go wrong will".
  - **8a:** done with F-08.
  - **8d:** Redlock's place, in the lecture's own terms (L-0281): it fits where a lock must survive its server dying and correctness and availability matter more than throughput. Then Kleppmann's line.
- **Trims for length:**
  - The Go deeper on autoscaling the backends (ch4) is cut.
  - The war story, apt-get paragraph, DNS paragraph, 5.4 paragraph, 5.5 bottleneck paragraph, 8.3–8.4 paragraphs, What you can now do and 8.6 are tightened.
  - The ALB algorithm menu sentence in 2.2 is cut. The ALB "least outstanding requests" mention in 2.3 stays.

### Rejected, and why

- **H3, neutral domain names:** F-10 asks for the lecture's own `payments.lb.google.com` (L-0209) on Fig 0·a, and review_facts wins. The gateway's `payments.google.com` in the 5.4 Go deeper is the lecture's own example (L-0357). The names are now consistent, but not renamed.
- **1a, meta port 9001:** F-07 keeps `9091` (the lecture's number, also in Fig 4·b and the clip).
- **3a, why the LB servers don't check backends themselves:** the ledger and transcript give no reason, and the reader's proposed reason would be invented. The orchestrator is introduced as the lecture introduces it (L-0155, L-0156).
- **6a/8e, tying Build 2 to orchestrator leader election:** the lecture doesn't connect them (see Coordinator items).
- **8d's proposed wording** ("a rare double holder is tolerable"): not in the sources. The lecture's own L-0281 criterion is used instead.

### Checks

- build: ok (12 pages).
- links: zero broken.
- figures: ok at 360/390/768/1440, light and dark.
- Banned-word grep: 0 hits in the built HTML and `page_text.md`.
- Figures re-checked by screenshot: Fig 2·b, Fig 0·a (phone), Fig 5·c, Fig 7·b and the redlock poster.

### Incoming links

Section ids are unchanged, so the map above still holds.

## Revision 3 (review_facts_final.md, exam_grade.md)

- **N-01:** added the optional sentence after the leak explanation in c1 §1.2. The proxy treats the first EOF as the end of the conversation, so a half-closing client would lose the answer; production proxies pass the half-close on to the backend instead. The code is unchanged.
- **N-02:** in c6 §6.1, each MongoDB shard now keeps the locks for its own documents (L-0305/L-0306 fact-check). The next paragraph opens with "Outside a database, what you need is a **lock manager**…".
- **N-03:** in c4 §4.1, nginx marks a server unavailable after one failed attempt by default (or as many as you configure) and keeps it out for ten seconds (A-LBL-05).
- **CUT-LOSS A (Q011/Q013):** in the c3 intro, after "many LB servers instead of one", added the every-layer test. An autoscaling policy for API servers doesn't make a system horizontally scalable, and a layer may stay on one machine if it carries the peak load and has a standby. Checked against L-0037, L-0040 and L-0044; the standby wording follows the L-0039 fact-check.
- **CUT-LOSS B (Q074):** in c4 §4.3, before the rule box: "Neither push is the one right answer; the call to each meta port and the broadcast each fit some situations." Checked against L-0175 and L-0182.
- **Q069 (optional):** in c4 §4.1, added "(the health checks themselves run on the orchestrator, so no user request waits on them)". Checked against L-0167, whose detail records exactly this correction.
- **Checks:**
  - build: ok (12 pages).
  - links: zero broken.
  - figures: ok at 360/390/768/1440, light and dark.
  - Banned-word grep: 0 hits in the built HTML and `page_text.md`.
  - `page_text.md` regenerated. Total ≈ 11.9k words.
- Section ids are unchanged, so the incoming-link map still holds.
