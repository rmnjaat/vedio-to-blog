# Lecture 07: animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson ("if I showed the before and after as two stills, would the reader miss the point?"). There are 4 clips, at most one per chapter, never two without prose between them. Each entry is a shortlist item plus rough beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure/lost/stale/evicted, green = ack/arrived. Past states ghost at 38%. Clip ids use the prefix `l07-`.

## Shortlist

| id | section | dynamic | verdict |
|---|---|---|---|
| `l07-events-vs-cdc` | §1.3 | ordering + a window (crash between write and publish) + accumulation of drift | **animate** |
| `l07-lru-vs-lfu` | §3.4 | accumulation over time: a scan / spike flushes one cache and not the other | **animate** |
| `l07-four-routes` | §5.3 | repeated protocol on one time axis (who talks to whom, how many hops) | **animate** |
| `l07-mod-vs-ring` | §6.3 | redistribution: keys moving when a node is added | **animate** |
| zmalloc counter filling to the cap | §2.6 | accumulation, but the lesson is *where* the check sits, not how fast it fills | static Fig 2·d (code + gauge) |
| lazy deletion and sampling | §3.5 | discrete states the reader should study | StepThrough Fig 3·e (§3 already has its clip) |
| compare-and-swap race | §4.5 | contention, but two steps; the point is which write wins | StepThrough Fig 4·f |
| graceful vs abrupt removal; snapshot add | §6.3–6.4 | discrete runbooks | StepThroughs Fig 6·e, 6·f (§6 already has its clip) |
| LRU linked-list overhead | §3.2 | none (a byte count) | static Fig 3·b + P4 |
| virtual nodes | §6.5 | redistribution, but contested; a static side-by-side keeps both views visible | static Fig 6·g |
| DHT lookup | §6.6 | protocol, but a single path | static Fig 6·h |

---

## 1. `l07-events-vs-cdc`: the same changes, two pipelines (§1.3, about 32 s)
- **Mechanism:** two lanes on one time axis, both copying the blogging app's database into an analytics MySQL. Top: API → Kafka → consumer → MySQL. Bottom: the database's log → CDC → MySQL. Four changes happen to the source: a post is published (has an event), a `views++` (no event), the API saves a post and crashes before publishing (event lost), and a background job updates a like count (no API call at all). The top copy ends with one of four; the bottom copy ends with all four, and when the CDC tool is stopped and restarted it resumes from its checkpoint.
- **Why motion beats a static figure:** the failure is *when* the crash lands (after the database write, before the publish) and how drift accumulates silently while nothing looks broken. A still of the end state shows two tables that differ; the clip shows which change went missing and why, and that CDC picks up after downtime from where it stopped.
- **Static twin:** Fig 1·b (the four gaps) and Fig 1·c.
- **Ledger taught:** L-0026, L-0028, L-0033, L-0034, L-0040, L-0346. **Context only:** L-0031 (the rule follows in 1.5).
- **Fidelity notes:** the class's crash example is "change done but event failed" (board, L-0028). The like-count job is the class's own Q&A example (L-0346). The resume beat shows the checkpoint only; the clip doesn't claim exactly-once (A-CDP-09: duplicates are possible, said in the prose).
- **Beats** (chips: 0:00 two pipelines · 0:06 publish · 0:12 views++ · 0:18 crash · 0:24 likes job · 0:28 restart):
  - B0 (0–3 s) both lanes idle; source DB in the middle with its log strip. *"Two ways to copy the blog database into analytics."*
  - B1 (3–9 s) a post is published: the event flows through Kafka (blue) to MySQL (green); the same row appears in the log and flows through CDC (green). *"A published post: both copies get it."*
  - B2 (9–15 s) `views++` happens in the DB: no event in the top lane (a faint red gap); the log gets it and CDC copies it. *"A view count changes. No event exists for it."*
  - B3 (15–21 s) the API saves a post, then a red ✕ on the API before publish. Top lane: nothing. Bottom: the log has the row, CDC copies it. *"The API crashes after saving, before publishing."*
  - B4 (21–27 s) a small worker updates likes directly; top: nothing; bottom: copied. CDC box then dims (stopped), two more log rows arrive, CDC wakes and its caret catches up from the checkpoint. *"A background job changes likes; CDC was down for a minute and resumes where it stopped."*
  - B5 (hold ≥ 2.5 s) poster: top MySQL 1/4 rows (three red gaps), bottom 4/4 (green). *"Read the source of truth, not the API's events."*
- **Predict line (before the clip):** "The API saves a post and crashes before publishing its event. A worker bumps a like count with no event at all. Which copy ends up complete?"
- **After:** "That is the whole argument for CDC. Now, how does it read the database?" → 1.4.

## 2. `l07-lru-vs-lfu`: a scan and a spike (§3.4, about 30 s)
- **Mechanism:** two caches of 6 slots side by side, one LRU and one LFU, fed the same request stream. First, steady traffic to four evergreen pages (Wikipedia-like), so the LFU counters grow and LRU timestamps stay fresh. Then a burst: a nightly scan reads 6 one-off articles once each (or a World Cup page spikes). LRU evicts the evergreen pages to make room for the scan; LFU keeps them because their counts are high. Then traffic returns to the evergreen pages: LRU misses (red) and refills; LFU hits (green).
- **Why motion beats a static figure:** the lesson is an accumulation over time (counts building, recency shifting) and a flush that happens during a burst. Two stills (before/after) would show different contents but not that one burst of cold reads did it, or that the misses come *afterwards*.
- **Static twin:** Fig 3·c (the two access curves).
- **Ledger taught:** L-0165, L-0167, L-0169, L-0170. **Context only:** L-0174 (the rule follows in the RuleBox).
- **Fidelity notes:** the scan case is the class's best answer (L-0165); the World Cup spike is the instructor's example (L-0169). The clip uses exact LRU/LFU for clarity; a caption line under the poster says Redis approximates both by sampling (SN-06). It does not show LRU's own strengths in this clip; the prose follows immediately with the news case (L-0172), where LRU wins.
- **Beats** (chips: 0:00 steady · 0:08 the scan · 0:18 morning traffic · 0:26 tally):
  - B0 (0–2 s) two empty caches. *"Same cache size, same requests: one evicts by recency, one by frequency."*
  - B1 (2–8 s) evergreen pages A–D requested repeatedly; LFU counters climb (small mono numbers); LRU order shuffles. *"Evergreen pages, read all day."*
  - B2 (8–18 s) six one-off reads S1–S6 arrive fast. LRU evicts A–D one by one (red); LFU evicts only the newest one-offs (red on S-cells). *"A nightly scan reads six articles once each."*
  - B3 (18–26 s) A–D requested again: LRU misses (red) and refetches; LFU hits (green). *"Morning: readers want the evergreen pages back."*
  - B4 (26–30 s, hold ≥ 2.5 s) poster: hit/miss tallies under each cache. *"When past popularity predicts the future, frequency wins."*
- **Predict line:** "A nightly report scans every article once. Which cache still holds the evergreen pages in the morning?"
- **After:** "So when does LRU win?" → the news case and RuleBox §3.

## 3. `l07-four-routes`: four banks, one request (§5.3, about 36 s)
- **Mechanism:** four small panels in a 2×2 grid, each with a client and three nodes (plus a proxy in panel 1). The same request ("key in c2") plays in each, one after another, with a leg counter: proxy (client → proxy → c2 → proxy → client: 4 legs, one client round trip), smart client (client → c2 → client: 2 legs), forwarding (client → c1 → c2 → c1 → client: 4 legs, one client round trip, the node does the extra hop), redirect (client → c1 → client, then client → c2 → client: 4 legs and **two client round trips**). Then a topology change (c2's range moves to c3): only the smart client's panel turns red until its table is updated.
- **Why motion beats a static figure:** the difference between the four is *who sends the next message and when*, a repeated protocol on a time axis. Fig 5·b shows the paths; the clip shows the order of hops and who initiates each, which is exactly what tells forwarding from redirect.
- **Static twin:** Fig 5·b (D-15).
- **Ledger taught:** L-0249, L-0250, L-0251, L-0252, L-0255. **Context only:** L-0257, L-0259 (choice for a cache follows in 5.4).
- **Fidelity notes:** the bank captions are the instructor's analogy. Hop counts are the page's illustration of "the bribe is network latency" (L-0251), not class numbers. Forwarding is labelled "IPFS-style overlay" with no claim that IPFS forwards (inline note on L-0253).
- **Beats** (chips: 0:00 proxy · 0:08 smart client · 0:14 forwarding · 0:22 redirect · 0:30 topology change):
  - B0 (0–8 s) proxy panel lit; blue client → proxy → c2, green back via proxy. Counter `hops: 4 legs`. *"The peon at the door: you only talk to the proxy."*
  - B1 (8–14 s) smart client: blue straight to c2, green back. `2 legs`. *"The regular customer walks to the right desk."*
  - B2 (14–22 s) forwarding: blue to c1, dashed blue c1 → c2, green back c2 → c1 → client. `4 legs, nodes forward`. *"The nearest desk walks it over for you."*
  - B3 (22–30 s) redirect: blue to c1, graphite "go to c2" back, blue client → c2, green back. `4 legs, client goes twice`. *"Or the desk tells you: go to counter 13."*
  - B4 (30–36 s, hold ≥ 2.5 s) c2's range moves to c3 in all panels; proxy, forwarding, redirect panels update silently; smart-client panel flashes red until its table updates. Poster: all four, hop counts, the red flag on the smart client. *"No middle hop for the smart client, but every client must hear about every change."*
- **Predict line:** "Same request, four banks. Which one costs the client two round trips?"
- **After:** → 5.4 "Which way for a cache?".

## 4. `l07-mod-vs-ring`: add one node, count what moves (§6.3, about 30 s)
- **Mechanism:** left half: six keys K1–K6 on two nodes by `h % 2`; a third node is added and every key recomputes `h % 3`; K2, K5, K6 slide to new nodes (3 of 6). Right half: the ring with four nodes at 3, 5, 10, 12 and keys scattered (K1 at 0 plus five more keys at other positions); cache 5 is added at 1 and only the keys in (12, 1] slide from cache 1 to cache 5; everything else stays still. Tallies tick up as keys move.
- **Why motion beats a static figure:** redistribution is the canonical case: the lesson is how many keys *move* when the node appears. Watching every key on the left re-evaluate and half of them travel, then watching the right side where almost nothing moves, is the point. Stills show only before/after positions.
- **Static twin:** Fig 6·a (D-17) and Fig 6·d (D-19).
- **Ledger taught:** L-0272, L-0273, L-0274, L-0291, L-0292, L-0294.
- **Fidelity notes:** the left side uses the board's exact K1–K6 mapping (hash values from Fig 6·a). The right side uses the board's ring positions; the five extra keys are page-made positions (none in (12, 1] except K1 and one more, so "2 of 6 move" on the ring vs "3 of 6" with mod is the honest tally for this layout). On average `% N` → `% (N+1)` moves ~N/(N+1) of keys and a ring moves ~1/(N+1); one caption line says so.
- **Beats** (chips: 0:00 two nodes · 0:06 mod 3 · 0:14 the ring · 0:22 cache 5 · 0:27 tally):
  - B0 (0–6 s) left: K1–K6 sitting on c0/c1 with mono `h % 2`. *"Six keys on two nodes, placed by hash mod 2."*
  - B1 (6–14 s) c2 appears; every key flashes (recompute), K2, K5, K6 slide (red trails). Tally `3/6 moved`. *"Add a node: every key is rechecked, and half of them move."*
  - B2 (14–20 s) right: ring with four nodes, six keys, curl arrows to owners. *"The ring: each key belongs to the next node clockwise."*
  - B3 (20–27 s) cache 5 appears at 1 (green); only keys in (12, 1] re-point and slide from cache 1 (green trails). Tally `2/6 moved`. *"Add cache 5: only its slice moves, all from one neighbour."*
  - B4 (27–30 s, hold ≥ 2.5 s) poster: both tallies side by side. *"Consistent hashing doesn't move less by magic: it just changes fewer owners."*
- **Predict line:** "Six keys, two nodes, add a third. How many keys move with `% N`, and how many on the ring?"
- **After:** "Ownership changed for a few keys. Moving their data is still your job." → removal and 6.4.
