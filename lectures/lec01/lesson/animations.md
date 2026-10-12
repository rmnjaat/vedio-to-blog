# Lecture 01: animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per top-level section, and never two clips without prose between them. Each clip below is a shortlist entry plus rough beats. The full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure/stale, green = ack. Past states ghost at 38%.

## Shortlist

| id | section | dynamic | verdict |
|---|---|---|---|
| `l01-cascade` | §2.4 | cascade + accumulation | **animate** (the clip placeholder is already in the design sample) |
| `l01-queue-vs-stream` | §3.5 | ordering / position over time | **animate** |
| `l01-count-race` | §4.2 | interleaving + accumulation | **animate** |
| `l01-polling` | §5.3 | repeated protocol on one time axis | **animate** |
| `l01-replica-lag` | §2.4 | window in time | **built, held in reserve**. §2 already has its one clip (cascade), and the lag is covered by the StepThrough Fig 2·f. Swap it in for the cascade only if the coordinator prefers it. |
| cache route ("how far does a request get") | §1.8 | none, a taxonomy of layers | static figure Fig 1·f |
| consumers joining a group | §3.6 | step-by-step assignment | static Fig 3·h + PauseAndThink P5 (§3 already has its clip) |
| local caches drift | §1.2 | window, but needs study at the reader's pace | StepThrough Fig 1·b |
| partial failure 74/75/76 | §3.4 | discrete states | StepThrough Fig 3·e |
| commit / re-consume | §3.7 | discrete states | StepThrough Fig 3·j |
| vertical ceiling, sharding | §2 | taxonomy | static figures |

---

## 1. `l01-cascade`: one database under five API servers (§2.4, about 24 s)
- **Mechanism:** a campaign spike widens the API fleet, so the queries reaching one unchanged database multiply. The database saturates, its responses slow and time out, the API servers block on it and fail, and the readers see errors.
- **Why motion beats a static figure:** the lesson is the *order and spread* of failure. Load accumulates first, and then failure travels backwards hop by hop. A still shows only the end state; the clip shows that the database fails first and takes everything else with it, which is what makes "scale bottom up" obvious.
- **Static twin:** the sample's clip poster (end state) and the RuleBox sketch (D-05).
- **Ledger taught:** L-0099, L-0101, L-0102. **Context only:** L-0100 (the rule comes after the clip, in prose and the RuleBox).
- **Fidelity notes:** "most outages" is softened per the fact-check ("a major cause"). The clip does not claim a share of outages. ×5 is the sample's illustrative fleet size and is not a class number.
- **Beats** (chips as in the sample: 0:00 spike arrives · 0:06 API fleet scales · 0:13 database saturates · 0:19 cascade):
  - B0 (0–2.5 s) hold on readers → lb → 1 api → db. *"Medium before the campaign: one API server, one database."*
  - B1 (2.5–6 s) a dense blue stream of readers arrives at the lb. *"The campaign goes out. Readers flood in."*
  - B2 (6–13 s) the api box grows into a ×5 fleet. Five blue query streams converge on the db. *"The API fleet scales to five. Every server sends queries to the same database."*
  - B3 (13–19 s) a fill gauge on the db rises to the top and turns red. *"The database saturates. Queries queue, then time out."*
  - B4 (19–24 s) red dashed timeouts flow db → apis. The apis are struck one by one, then the readers' requests return red. *"The servers wait on it and fail too: a cascading failure."*
  - B5 (hold ≥ 2.5 s) poster: annotated end state. *"Scale the database first, then the API servers."*
- **Predict line (before the clip):** "The campaign message goes out and five API servers are ready. Which box gives out first?" (the sample's line).
- **After:** "So the order matters more than the amount" → RuleBox.

## 2. `l01-queue-vs-stream`: same messages, two brokers (§3.5, about 32 s)
- **Mechanism:** two lanes on one time axis. Top: an SQS queue with three identical consumers. Each message is taken by one consumer and deleted, so the pipe empties. Bottom: a Kafka stream with a `search` and a `counter` consumer. Messages stay, and each consumer's cursor advances at its own pace. Elasticsearch goes down: search's cursor stops while counter's keeps moving. When search recovers it catches up from where it stopped. At the end, old messages fall off by retention, not by any consumer.
- **Why motion beats a static figure:** the difference *is* behaviour over time. "Deleted when read" vs "kept, with independent positions" can only be seen when messages are actually consumed and cursors move at different speeds, especially the moment one consumer stalls and the other doesn't.
- **Static twin:** Fig 3·d (queue) and Fig 3·f (stream); board D-11 (`b_012030.jpg`).
- **Ledger taught:** L-0155, L-0161, L-0170, L-0173, L-0174, L-0175, L-0176, L-0213. **Context only:** L-0168, L-0178.
- **Fidelity notes:** retention is shown as "after N days, by policy" (L-0174 gives 40/60/100 days as examples). No default value appears on screen; A-DC-08 lives in prose. Queue exclusivity is drawn as the class taught it; the at-least-once caveat (SN-11) lives in prose next to Fig 3·d, not in the clip.
- **Beats:**
  - B0 (0–3 s) hold: both lanes empty, five ON_PUBLISH squares waiting at the left. *"Same five ON_PUBLISH events. Top: a queue. Bottom: a stream."*
  - B1 (3–10 s) top: the messages flow into SQS, each goes to one consumer, then a green delete and the pipe empties. *"Queue: each message goes to one consumer, which deletes it when done."*
  - B2 (10–16 s) bottom: the messages land in the Kafka pipe and stay. Two cursors, `search` and `counter`, step along the same squares. *"Stream: messages stay. Each consumer type keeps its own position."*
  - B3 (16–23 s) `es` struck red, and the search cursor freezes at 2 while counter moves on to 5. *"Search is down. The counter keeps going at its own pace."*
  - B4 (23–29 s) es recovers (green), and the search cursor catches up 3 → 5. *"Search comes back and picks up where it stopped."*
  - B5 (29–32 s) the oldest squares fade out under a hand label `retention`. Poster. *"Nobody deletes from a stream. Old messages expire by retention."*
- **Predict line:** "Elasticsearch goes down for ten minutes. In which picture does the counter stop too?"
- **After:** "Queue: you delete. Stream: you iterate, and later you commit (3.7)."

## 3. `l01-count-race`: a thousand increments, three lost (§4.2, about 26 s)
- **Mechanism:** two threads run `count++` on a shared counter. Each `++` is read → add → write. Shown slowly once, they interleave so that both read the same value and one write overwrites the other. Then fast-forward: two lanes of 1,000 ticks each, and the counter ends at 1,997 instead of 2,000 (the lost updates flash red). Last, the atomic version: the same two lanes, each increment one indivisible step, ending at 2,000 (green).
- **Why motion beats a static figure:** an interleaving is a *timing* phenomenon, and the accumulation of rare lost updates over many iterations is a rate effect. The StepThrough Fig 4·b lets the reader study one interleaving; the clip adds the "it happens a few times in a thousand, silently" accumulation and the fixed version side by side.
- **Static twin:** StepThrough Fig 4·b. Board S52 (`b_014915.jpg`: "count should be += 2").
- **Ledger taught:** L-0219, L-0230, L-0231. **Context only:** L-0221, L-0223.
- **Fidelity notes:** 1,997 is the class's number (it says "something like 1997", so the clip caption says "about 1,997"). The atomic version is shown as one indivisible step labelled `atomic +1`, without naming a language API. SN-19's nuance (a transaction alone isn't enough under READ COMMITTED) stays in prose.
- **Beats:**
  - B0 (0–2.5 s) hold: `count = 0`, two thread lanes. *"Two threads, one shared counter. Each runs count++ 1,000 times."*
  - B1 (2.5–9 s) slow motion: T1 reads 41, T2 reads 41, T1 writes 42, T2 writes 42 (red ring). *"count++ is read, add, write. Here both read 41, and one increment is lost."*
  - B2 (9–15 s) fast-forward ticks. The counter runs up, and three red flashes mark lost updates. *"At full speed this happens rarely, and silently."*
  - B3 (15–19 s) the counter stops at about 1,997 (red); the expected 2,000 is ghosted beside it. *"Expected 2,000. Got about 1,997."*
  - B4 (19–24 s) replay with `atomic +1` blocks, and the counter lands on 2,000 (green). *"Make the increment one indivisible step, and every clap counts."*
  - B5 (hold) poster: both results side by side, with the Medium line `100 + 2 claps = 102`. *"Two claps at once: 100 must become 102."*
- **Predict line:** P6 (two claps on a post with 100) sits before the StepThrough. The clip follows the StepThrough with the lead-in "Now run it a thousand times."
- **After:** "The fix lives in the database: a transaction or an atomic operation (4.3)."

## 4. `l01-polling`: three ways to hear "ready" (§5.3, about 30 s)
- **Mechanism:** one time axis, three lanes, the same long-running job (a Medium import, standing in for the class's EC2 launch) that becomes ready at the 60 s mark. Lane 1, short polling: a request every 10 s, each answered immediately with "in progress", plus a request counter. Lane 2, long polling: one request held open until 60 s, then answered "ready" (counter 1). Lane 3, WebSocket / SSE: a connection opened once, and the server pushes "ready" at 60 s. Ends with the counters side by side, scaled by "× 1M readers" for the short-poll lane (6M requests per minute).
- **Why motion beats a static figure:** the lesson is who talks *when*, and how requests pile up while nothing changes. That is a repeated protocol over time. A static figure can't show the redundancy accumulating.
- **Static twins:** Fig 5·b, 5·c, 5·d/5·e; boards D-16, D-17, D-18, D-19.
- **Ledger taught:** L-0238, L-0243, L-0245, L-0246, L-0248, L-0250, L-0256, L-0265. **Context only:** L-0244 (per-request overhead, with SN-20 in prose).
- **Fidelity notes:** 10 s interval and 1M users are the class's numbers (L-0243). The axis covers 60 s rather than the class's "an hour" for legibility; the caption says so. Long polling is drawn as a held request, with no busy-loop shown (fact-check L-0248 nuance). The push lane is labelled `websocket / sse` and does not claim which one Medium uses.
- **Beats:**
  - B0 (0–3 s) hold: three lanes, the job box `importing…`. *"One job finishes at 60 s. Three ways for the browser to find out."*
  - B1 (3–12 s) short-poll lane: request/response pairs every 10 s, each mono `in progress` (graphite), counter 1…5. *"Short polling: ask every 10 s. Most answers are 'still in progress'."*
  - B2 (12–19 s) long-poll lane: one blue request, then a held dotted span grows toward 60 s. *"Long polling: ask once; the server holds the request until something changes."*
  - B3 (19–24 s) at 60 s, all three lanes resolve: the short poll's 6th request gets `ready`; long poll `ready` (green); the push lane gets a server-originated green `ready`. *"At 60 s: the 6th poll, the held reply and the push all say 'ready'."*
  - B4 (24–30 s) counters: `6 · 1 · 0 (+1 connection)`, then the short-poll counter scales to `× 1M readers = 6M requests / min`. *"Now multiply by a million readers."*
  - B5 (hold) poster: the annotated three-lane summary.
- **Predict line:** "The import takes 60 seconds. How many requests does each approach make?"
- **After:** "Long polling trades requests for held connections; WebSockets and SSE keep one connection open (5.4, 5.5)."

---

## Build notes (for the animator)
- Reuse `learn/animations-lab` primitives. Frame 0 = the page's static twin, and the last frame = the poster used in the page's clip placeholder.
- Render load-light: `--concurrency=1`, stills first, one mp4 at the end (transcription runs in the background on this machine).
- Every caption and label above is checked against the listed ledger ids. Anything else (the 60 s axis, ×5 fleet, 41→42 values) is marked illustrative in the storyboard's `fidelity_notes`.
