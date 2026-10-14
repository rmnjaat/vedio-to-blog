# Lecture 04: animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per chapter, and never two clips without prose between them. Each clip below is a shortlist entry plus rough beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure/stale, green = ack and the online dot. Past states ghost at 38%. Clip ids use the prefix `l04-`.

## Shortlist

| id | section | dynamic | verdict |
|---|---|---|---|
| `l04-heartbeat-expiry` | §2.8 | window in time (a TTL pushed forward, then running out) | **animate** |
| `l04-connection-pool` | §4.3 | repeated protocol on one time axis + accumulation | **animate** |
| `l04-staggered-delete` | §5.4 | contention over time (one long delete vs small batches under traffic) | **animate** |
| `l04-cache-aside` | §6.2 | accumulation / rate (database load with and without a shared cache) | **animate** |
| login/logout vs heartbeats | §2.4 | discrete states the reader should study | StepThrough Fig 2·e (§2 has its clip in 2.8) |
| five trips per connection | §4.2 | a sequence to read one arrow at a time | StepThrough Fig 4·b; the clip in 4.3 shows its cost over many requests |
| pool min/max/stretch | §4.5 | discrete scenarios | StepThrough Fig 4·e (§4 already has its clip) |
| pool exhaustion after autoscaling | §4.7 | accumulation, but the arithmetic is the lesson | static Fig 4·f + PauseAndThink P6 |
| Redis vs DynamoDB | §3 | none (a comparison) | static Fig 3·a + TradeoffTable T1 |
| B+ tree rebalancing on delete | §5.3 | redistribution | **not animated**: the lecture's claim carries SN-07 (engines defer and merge by fill). A clip would teach the imprecise version as motion. Static Fig 5·c shows both. |
| date compare cost | §5.7 | rate | not animated: the "stored as string" case is the lecture's hypothetical, and SN-12 says native types are compact. Static Figs 5·g, 5·h. |

---

## 1. `l04-heartbeat-expiry`: every beat moves the deadline (§2.8, about 28 s)
- **Mechanism:** one user's key in the store with a 30 s TTL timer, drawn as a draining bar under the key. A heartbeat arrives every 10 s and refills the bar (`SET … EX 30`). On a friend's screen the dot is green while the key exists. The laptop's battery dies right after a beat. The bar drains for 30 s with no refill; at zero the key disappears and the friend's dot turns to the offline ring. A ghost lane underneath shows what would happen with a plain `SET` and no `EX`: the bar never drains and the dot never goes grey.
- **Why motion beats a static figure:** the lesson is a window in time. The TTL is pushed forward on every beat, and offline is the moment the window closes after the last one. A still shows a key with a TTL; only motion shows the deadline moving and then being reached. The ghost lane makes A-OOI-01's trap (a plain SET clears the TTL) visible in the same timing.
- **Static twin:** Fig 2·i panel b; Fig 2·f (D-06); board `b_004430.jpg`.
- **Ledger taught:** L-0046, L-0047, L-0048, L-0062, L-0068, L-0070. **Context only:** L-0069, L-0327.
- **Fidelity notes:** 10 s and 30 s are the class's numbers. The clip shows Redis (`SET … EX 30`). DynamoDB's lag of up to days (SN-02) is not animated; the caption under the poster says "DynamoDB deletes late: check `expires_at`". The ghost lane is labelled "without `EX`" and is the fact-check's addition, marked as such in the storyboard's `fidelity_notes`. The death is at t = 12 s after a beat at 10 s, so the dot goes grey at 40 s on the clip clock: the caption says "30 s after the last heartbeat", never "30 s after death".
- **Beats:**
  - B0 (0–3 s) hold: user (laptop), store with key `presence:u7` and a full timer bar, friend's screen with a green dot. *"Every heartbeat sets the key with a 30-second TTL."*
  - B1 (3–10 s) three blue pulses at 10 s intervals (clock compressed); each refills the bar to full. *"Each beat moves the deadline 30 seconds forward."*
  - B2 (10–14 s) the battery icon flashes red and the laptop greys. No more pulses. *"The battery dies. No 'offline' call is ever sent."*
  - B3 (14–21 s) the bar drains with a mono countdown `30 → 0`; the dot stays green. *"The store keeps counting down on its own."*
  - B4 (21–25 s) the bar hits zero; the key fades out (dashed: the store's own expiry); the friend's dot becomes the ring. *"30 seconds after the last beat, the key is gone: absent means offline."*
  - B5 (25–28 s, hold ≥ 2.5 s) the ghost lane appears below: same beats, plain `SET` without `EX`, bar never drains, dot green forever, ringed red. Poster: both lanes. *"Forget the TTL on one write and the user never goes offline."*
- **Predict line (before the clip):** "The laptop's battery dies right after a heartbeat. How long until the dot turns grey?"
- **After:** "So the only thing a client must do is keep beating; the store does the deleting (RuleBox §2)."

## 2. `l04-connection-pool`: where a heartbeat's time goes (§4.3, about 32 s)
- **Mechanism:** one time axis, two lanes, the same five heartbeat writes. Lane 1, no pool: each write opens a connection (three handshake ticks), sends one tiny query (one blue tick), gets a green OK, and closes (two teardown ticks). A stacked time bar under each request colours setup and teardown graphite and the query blue, so most of the bar is graphite. Lane 2, a pool of three open connections: each write takes a free line (it turns blue), sends the query, gets OK and puts the line back. Requests finish far sooner. A counter on the database shows handshakes processed: lane 1 climbs with every request, lane 2 stays at 3 (the startup connections). Last beat: both lanes scale to "× 6m per minute".
- **Why motion beats a static figure:** the point is a repeated protocol and what it adds up to. One request with five trips is a static sequence (Fig 4·b); the waste only shows when the same overhead repeats request after request while the actual work stays tiny, and the database's handshake counter climbs in one lane and not the other.
- **Static twin:** StepThrough Fig 4·b; Fig 4·c (D-11); board `b_010530.jpg`, `b_012230.jpg`.
- **Ledger taught:** L-0109, L-0111, L-0112, L-0113, L-0114, L-0115, L-0116. **Context only:** L-0103, L-0129, L-0131.
- **Fidelity notes:** "five trips" is the lecture's count (L-0109); the setup block is labelled `connect (+ login)` per the inline note, not "TCP only". No millisecond values on screen (the lecture gives none); bar lengths are illustrative and the storyboard marks them so. The pool's min of 3 is the class's number. "× 6m per minute" is the class's number.
- **Beats:**
  - B0 (0–3 s) hold: two lanes, `api` and `db` in each; five heartbeat squares waiting. *"Five heartbeat writes. Top: a new connection each time. Bottom: a pool of three."*
  - B1 (3–11 s) top lane: write 1 plays slowly: SYN, SYN-ACK, ACK, `UPDATE` (blue), OK (green), FIN, FIN/ACK. Its time bar fills mostly graphite. *"Five trips to open and close, one trip of real work."*
  - B2 (11–17 s) top lane: writes 2–5 at speed; the db's handshake counter climbs 1 → 5. *"Every write pays it again, and so does the database."*
  - B3 (17–24 s) bottom lane: three lines already open (counter shows 3 from startup). Writes 1–5 each take a free line, query, release; bars are short and mostly blue. *"With a pool, a write grabs an open line, fires the query and gives it back."*
  - B4 (24–29 s) side by side: total time per write, top long, bottom short; db counters `5` vs `3`. *"Faster calls, and less work for the database, with the same number of queries."*
  - B5 (29–32 s, hold) poster: both lanes, with mono `× 6m writes / min` over the top lane's counter. *"Now do it six million times a minute."*
- **Predict line:** "A write takes 1 ms inside the database. How much of each heartbeat's time is the write?"
- **After:** "Pooling gives the most for exactly this kind of micro update (4.3); for a 15-table report it barely matters."

## 3. `l04-staggered-delete`: one big delete vs many small ones (§5.4, about 30 s)
- **Mechanism:** a `blogs` table with a block of 100,000 soft-deleted rows, and a steady stream of user requests (blue dots) reading and writing other rows. Lane 1: one `DELETE … WHERE is_deleted` runs as a single long bar; while it holds its locks and fills the log, user requests queue up behind it (dots pile up and turn red at a timeout line). Lane 2: the same rows deleted 1,000 at a time, spread along the axis (short bars with gaps); user requests flow through the gaps with only small bumps. Both lanes end with the soft-deleted block gone.
- **Why motion beats a static figure:** the lesson is contention over time. The same total work, done in one shot or spread out, has a completely different effect on the traffic running alongside it. A still can show the two schedules but not the queue building behind the long delete and draining through the gaps.
- **Static twin:** Fig 5·d (the lifecycle timeline); the CodeBlock in 5.4.
- **Ledger taught:** L-0263, L-0283, L-0295, L-0298. **Context only:** L-0282, L-0284, L-0230.
- **Fidelity notes:** 100,000 rows and ~1,000 per batch are the class's numbers (L-0283; the lecture also gave 10,000 an hour, and the caption says "e.g. 1,000 at a time, spread across the day"). What makes the big delete hurt is drawn as **lock and log time**, per the fact-check on L-0284 and L-0230 (batching cuts lock, commit and log overhead), with no B+ tree rebalancing on screen (SN-07). No downtime is shown: requests slow and some time out, in line with "a cron job has nothing to do with availability" being the lecture's framing (L-0282).
- **Beats:**
  - B0 (0–3 s) hold: the table, a graphite block labelled mono `100,000 rows · is_deleted = 1`, and the request stream. *"100,000 soft-deleted rows to remove, during peak traffic."*
  - B1 (3–11 s) lane 1: one long delete bar starts; requests touching the table start queueing behind it. *"One DELETE holds its locks for as long as it runs."*
  - B2 (11–16 s) the queue grows; the oldest dots cross a dashed timeout line and turn red. *"Requests wait behind it, and some give up."*
  - B3 (16–24 s) lane 2: short `DELETE … LIMIT 1000` bars with gaps; requests pass between them; a mono counter `rows left 100,000 → 0`. *"Delete a thousand at a time, spread out, like garbage collection."*
  - B4 (24–27 s) both lanes end with the block gone; lane 1 shows red casualties, lane 2 none. *"Same rows removed. Only one of them hurt the users."*
  - B5 (27–30 s, hold) poster: both lanes side by side. *"Stagger the hard delete, or let the database's retention do it."*
- **Predict line:** "100,000 soft-deleted rows, peak traffic. One DELETE, or many small ones?"
- **After:** "Offload it and stagger it; and if a unique email blocks re-signup, that row has to go now (5.4)."

## 4. `l04-cache-aside`: one join, then hits from every server (§6.2, about 26 s)
- **Mechanism:** the D-15 architecture: users → lb → three API servers → database, plus one shared cache. Reads for one popular blog arrive at a steady rate and the lb spreads them across the three servers. Lane 1 (no cache): every read runs the 3–4-table join on the database; a load gauge on the db climbs and stays high. Lane 2 (shared cache): the first read misses, runs the join once, writes the result to the cache, and returns; every later read, whichever server it lands on, hits the cache (green), and the db gauge falls back to near zero. A join counter on the database: lane 1 counts every read, lane 2 stays at 1.
- **Why motion beats a static figure:** the lesson is the rate: the expensive work happens once instead of on every read, and it holds no matter which server a read lands on. A static figure shows the boxes; motion shows the reads accumulating and the database's work flattening.
- **Static twin:** Fig 6·b (D-15); board `b_021645.jpg`, `b_021900.jpg`.
- **Ledger taught:** L-0248, L-0249, L-0250, L-0251, L-0252.
- **Fidelity notes:** "3–4 table join" is the class's description. Read counts and gauge levels are illustrative. The cache is drawn logically between the API servers and the database, as taught. Invalidation and TTL are not shown (not taught here; Lecture 2 and 9 cover them), and the caption avoids implying the copy stays fresh forever.
- **Beats:**
  - B0 (0–3 s) hold: the architecture, a popular blog `b42`. *"One popular post, read again and again through three API servers."*
  - B1 (3–9 s) lane 1: reads land on servers 1, 2, 3 in turn; each sends a blue query to the db; the join counter climbs; gauge rises. *"Without a cache, every read runs the same expensive join."*
  - B2 (9–14 s) lane 2: first read on server 1: cache miss (graphite), db join, result written to the cache, response. *"First read: miss, join once, keep the result."*
  - B3 (14–20 s) reads on servers 2, 3, 1 all hit the cache (green ticks); the db join counter stays at 1; gauge falls. *"Every later read, on any server, gets the same copy."*
  - B4 (20–23 s) side by side: joins `n` vs `1`; a small mono on the cache arrow `still one network hop`. *"The hop to the cache remains; the join doesn't."*
  - B5 (23–26 s, hold) poster. *"Save the expensive computation once; read it many times."*
- **Predict line:** "Three API servers, 1,000 reads of one popular post. How many joins does the database run?"
- **After:** "A cache doesn't have to be RAM or Redis, either; a table can be one (6.3)."

---

## Build notes (for the animator)
- Reuse `learn/animations-lab` primitives and `site/src/animations/lib/`. Frame 0 = the page's static twin; the last frame = the poster used in the page's clip placeholder. Add the four new glyphs (status dot, pulse, TTL timer bar, table block) to the lab once, shared with the page figures.
- Render load-light: `--concurrency=1`, stills first, one mp4 at the end.
- Every caption and label above is checked against the listed ledger ids. Anything else (compressed clock in clip 1, bar lengths in clip 2, read counts in clip 4, the "without EX" ghost lane) is marked illustrative or as a fact-check addition in the storyboard's `fidelity_notes`.
