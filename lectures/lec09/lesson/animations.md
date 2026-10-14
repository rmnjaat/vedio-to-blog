# Lecture 07 (lec09): animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`: a concept gets a clip only if the change over time *is* the lesson. Four clips, at most one per chapter (§2, §3, §5, §8), never two without prose between them (each sits in a different chapter page). Each entry is a shortlist row plus beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps, plus a **portrait phone composition 800×1200** per clip (described under each; the Player picks it below 760 px). Marker colours: blue = request/data path, green = hit/accepted/success, red = failure/expired/forbidden/limit. A cache miss going to the origin is graphite, not red. Past states ghost at 38%. Glyphs are the ones in `figures.md` §0 (cloud = CDN, cloud with bucket mark = S3, `PhotoChip` = the photo's bytes, key tag with clock = signed URL, `Pipe` with mono name = Kafka topic).

Caption budget: every caption is ≤ 2 lines and ≤ 17 characters per second of display; the character count / seconds is given after each caption.

## Shortlist

| id / candidate | section | dynamic | verdict |
|---|---|---|---|
| `l09-cdn-miss-hit` | §2.3 | accumulation (one origin request, then thousands of hits) + a window (the cached copy expires) | **animate** |
| `l09-presigned-upload` | §3.3 | accumulation (5 MB transfers filling an API server's network card) vs. the bytes leaving your servers' path | **animate** |
| `l09-signed-url-expiry` | §5.2 | a window in time (a forwarded URL works until its expiry, then doesn't) | **animate** |
| `l09-hashtag-repartition` | §8.3 | redistribution (the same events re-keyed so one hashtag converges on one server) | **animate** |
| one request through a CDN property | §2.2 | discrete protocol steps the reader studies | StepThrough Fig 2·c |
| origin image changed: TTL vs invalidation | §2.6 | a window, but §2 already has its clip, and the clip's last beat (expiry → refill) shows the TTL half | prose |
| three tempting upload paths | §3.2 | comparison / taxonomy | static Fig 3·b + T1 |
| GitHub's four network calls | §3.4 | a sequence to study at the reader's pace | StepThrough Fig 3·c |
| B loads A's profile | §4.4 | discrete steps | StepThrough Fig 4·c (§4 has no clip: storing IDs is not a timing phenomenon) |
| the incognito test | §5.1 | before/after stills say it all | static Fig 5·a (§5's clip is the expiry window) |
| `?w=360` resize on the CDN | §6.2 | discrete cache lookups | StepThrough Fig 6·b |
| post event fanned out to consumers at their own pace | §6.1 | position over time, already animated in Lecture 2 (`l01-queue-vs-stream`) | static Fig 6·a + back-link |
| top 100 as IDs or whole posts | §7.3 | comparison | TradeoffTable T4 |
| one counting batch, crash and replay | §8.4 | discrete states | StepThrough Fig 8·d (§8 already has its clip) |
| Redis Pub/Sub push vs Kafka pull | §8.5 | a repeated protocol, but §8 has its clip | TradeoffTable T5 |
| read path / write path | §9.3 | architecture | static Fig 9·b |
| Kafka down: buffer, drop, fall back | §10.1 | options | TradeoffTable T7 |
| horizon and last commit (`l09-horizon-checkpoint`) | §10.2 | position over time | **held in reserve**: StepThrough Fig 10·a covers the states; the outline's contract is four clips, and this one's crash-and-resume repeats Lecture 2's `l01-queue-vs-stream` / commit material. Swap it in only if the coordinator wants a fifth clip. |

---

## 1. `l09-cdn-miss-hit`: one fetch, then thousands of hits (§2.3, about 28 s)
- **Mechanism:** one CDN between viewers and the origin. The first GET for `a.mycdn.net/system-design/logo.png` misses; the CDN itself fetches the same path from `arpitbhayani.me`, puts the bytes in its cache slot and returns them. Then a stream of viewers asks for the same path; every one is served from the slot while a counter at the CDN climbs and the origin's counter stays at 1. Finally the slot's TTL drains; the next request misses once, the origin counter goes to 2, the slot refills, and hits resume.
- **Why motion beats a still:** the lesson is a *rate*: one origin request against an ever-growing number of hits, and the origin hearing from the CDN only once per expiry (L-0043's "a few requests each time the cache invalidates"). A still shows two arrows; the clip shows the counters diverge and the trickle.
- **Static twin:** Fig 2·b (User — CDN — origin) and StepThrough Fig 2·c; board D-02 (`b_001200.jpg`).
- **Ledger taught:** L-0036, L-0037, L-0038, L-0043. **Context only:** L-0034 (host swap, shown as the rewritten URL on the miss leg), L-0044, L-0058 (TTL).
- **Fidelity notes:** the counts (`1,000` hits, origin `1` then `2`) are illustrative, not class numbers; the caption says "thousands", not a figure. No TTL value is shown (CloudFront's 24 h default, A-CDM-04, stays in prose). The fact-check caveat on L-0036/L-0040 (only cacheable responses are stored; origin `Cache-Control` and the CDN's policy decide) is **not** shown in the clip: it sits in the prose right after it. One edge node only: geography (L-0039) is not claimed. The miss leg is graphite, not red.
- **Layout (1200×800):** viewers stacked on the left (three `Actor`s, the rest as a ghosted crowd mark with mono counter), `cdn` cloud centre with its cache slot and a thin TTL bar under the slot, `origin` box right with mono `arpitbhayani.me`. Counters: mono `cdn: n` under the cloud, `origin: n` under the origin. **Phone (800×1200):** same three glyphs in a column (viewers top, cdn middle, origin bottom), counters to the right of each.
- **Beats:**
  - B0 (0–3 s) hold: empty slot, both counters 0. *"One photo URL, one CDN. Its cache is empty."* (43 / 3 s = 14.3)
  - B1 (3–9 s) blue GET viewer → cdn, mono `a.mycdn.net/system-design/logo.png`; hand `miss` at the empty slot (graphite); cdn → origin (graphite) mono `arpitbhayani.me/system-design/logo.png`; origin counter → 1. *"First request: a miss. The CDN fetches the same path from the origin."* (69 / 6 s = 11.5)
  - B2 (9–13 s) green reply origin → cdn with a `PhotoChip`; it drops into the slot (green tick), then green to the viewer. *"It keeps a copy and sends it back."* (34 / 4 s = 8.5)
  - B3 (13–20 s) the crowd's requests arrive one by one, then faster; each answered green from the slot, hand `hit`; cdn counter runs to `1,000`; origin counter stays `1`. *"Every later request is a hit. The origin never hears about it."* (62 / 7 s = 8.9)
  - B4 (20–25 s) the TTL bar drains to empty (graphite), hand `ttl`; the next request misses, one graphite fetch, origin counter → `2`, slot refills, hits resume. *"When the copy expires, one request refills it."* (46 / 5 s = 9.2)
  - B5 (25–28 s, poster) end state: counters `cdn: 1,000+ · origin: 2`, both fetches ghosted on the origin leg. *"Thousands of views, a trickle at the origin."* (44 / 3 s = 14.7)
- **Predict line (before the clip):** "A thousand people open the same photo in one minute. How many requests reach the origin?"
- **After:** "That is all a CDN does: cached bytes if it has them, otherwise the same path from the origin. And it doesn't care what those bytes are."

## 2. `l09-presigned-upload`: the bytes leave your servers' path (§3.3, about 32 s)
- **Mechanism:** before: phones upload 5 MB photos to the `api`, which copies each to `s3`; every photo crosses the api's network card twice, its bandwidth bar fills to the red limit, and a small unrelated request (`GET /feed`) stalls. After (the before state ghosted at 38%): the phone first asks the same `api` for a pre-signed URL (a thin line, no bytes); the api signs it locally and returns a URL key tag `s3://images/<id>.png` with a clock `valid 60 s`; the phone POSTs the photo along a long arc straight to `s3`; the api's bar falls back near zero and stays there while more uploads go by.
- **Why motion beats a still:** the problem is accumulation: one 5 MB upload is fine; a steady stream of them fills a physical network card and starves everything else on it. The fix is visible only in motion: the uploads keep coming, but the bar stops moving.
- **Static twin:** Fig 3·b (rows b, c) and the RuleBox §3 sketch; board D-03 (`b_013115.jpg`, the arc and the moving photo icon at 00:39:30).
- **Ledger taught:** L-0068, L-0072, L-0076, L-0077, L-0078, L-0081, L-0082, L-0084, L-0085. **Context only:** L-0079 (cost; see fidelity), L-0080, L-0083.
- **Fidelity notes:** no money, egress or bill appears on screen: SN-01 says inbound internet traffic and same-Region EC2↔S3 transfer are free, so the clip claims bandwidth and transfers, not cost (L-0078's "5 MB in, 5 MB out" vs one transfer is the class's arithmetic and stays). The prepare step draws **no call to S3**: the URL is signed locally by the service (L-0085 inline clarification). The upload is drawn as `POST` (the GitHub flow, L-0082); the prose says a presigned PUT works too. `valid 60 s` is one of the class's examples (10, 20, 30, 60 s, L-0084). `GET /feed` is an illustrative stand-in for "other API calls" (L-0072); the bandwidth bar has no unit. The expiry is not exercised here (that is clip 3).
- **Layout (1200×800):** phone (left, with chip mono `5 MB`), `api` (centre, bandwidth bar under it, hand `network card`), `s3` bucket (right). The upload arc runs above the api. **Phone (800×1200):** phone top-left, api centre, s3 bottom-right; the arc runs down the left edge so it visibly bypasses the api.
- **Beats:**
  - B0 (0–3 s) hold: the three glyphs, bar empty. *"A 5 MB photo, uploaded through the API server."* (46 / 3 s = 15.3)
  - B1 (3–10 s) chip phone → api (blue) hand `5 MB in`, then api → s3 (blue) hand `5 MB out`; the bar rises a step per photo as more phones follow. *"Each photo crosses the API server twice: 5 MB in, 5 MB out."* (59 / 7 s = 8.4)
  - B2 (10–15 s) the bar reaches its `Ceiling` and turns red, hand `network card limit`; a small mono `GET /feed` request waits beside the api, outlined red. *"Uploads keep coming. The network card fills; other API calls wait."* (66 / 5 s = 13.2)
  - B3 (15–21 s) before-state ghosts to 38%. phone → api thin blue (no chip) mono `prepare`; the api produces a URL key tag mono `s3://images/<id>.png` with clock `valid 60 s`; green reply carries the tag to the phone. *"Pre-signed: first ask for a short-lived URL for one path. No bytes yet."* (71 / 6 s = 11.8)
  - B4 (21–28 s) the chip rides the long blue arc phone → s3 mono `POST`, green tick at the bucket; two more uploads follow the arc; the api's bar stays near empty. *"Then the photo goes straight to S3. Your servers never touch it."* (64 / 7 s = 9.1)
  - B5 (28–32 s, poster) both routes side by side, hand labels `before: 5 MB + 5 MB through your servers` / `after: 5 MB, straight to S3`. *"One transfer per photo, and nothing to run in between."* (54 / 4 s = 13.5)
- **Predict line:** "Your upload service handles 5 MB photos. How many times do those bytes cross a network your servers sit on, before and after pre-signed URLs?"
- **After:** "The bucket stays closed; only the holder of that one URL can write to that one path, until it expires."

## 3. `l09-signed-url-expiry`: a forwarded URL, before and after it expires (§5.2, about 33 s)
- **Mechanism:** a time axis across the top, `0 · 2 · 5 · 10 min`, with the URL's expiry marked at 5. B (follows A) asks the `api` for A's posts; the api checks `follows A?` and returns JSON with a signed URL (key tag `instacdn.net/…jpg?oh=…&oe=…`, clock `5 min`). C, who doesn't follow A, never asks the api. B copies the tag to C. At minute 2 C's GET reaches the `cdn`; a two-line checklist on the cloud ticks `signature ✓`, `not expired ✓` and the photo comes back green. At minute 10 the same GET fails the expiry check, red, `bad url`, though the photo is still in the CDN's cache slot. Finally C edits `oe` to a later time; the signature check fails, red.
- **Why motion beats a still:** the lesson is a window in time: the same URL, in the same hands, works and then doesn't, and nothing about the person changes. The playhead crossing the expiry is the point.
- **Static twin:** Fig 5·b (URL anatomy) and Fig 5·a (incognito test); notes `3. Privacy` (`b_012057.jpg`, `b_013045.jpg`).
- **Ledger taught:** L-0162, L-0164, L-0168, L-0169, L-0172, L-0177, L-0178. **Context only:** L-0163 (SN-04), L-0170, L-0171.
- **Fidelity notes:** the 5-minute expiry is the class's example (L-0177); minutes 2 and 10 are illustrative. `oe` is labelled on the poster as `oe: expiry, most probably` (the instructor's guess, L-0170). The CDN checks a **signature**, not a certificate (L-0169 inline clarification): the checklist says `signature`. "Even with the photo still cached" is SN-04 / A-CDM-13 (sourced addition: the expiry is checked per request, however long the object stays cached); the storyboard marks it. The refusal reads `bad url` (the notes page: "it returns bad url", L-0178); the demo's literal `Bad URL timestamp` (L-0171) was for *removed* parameters and is kept for the prose and the MarginNote, not attached to a case the class didn't show. No HTTP status code is claimed (A-CDM-12's 403 stays out). The tamper beat restates L-0169 ("so no one can change it"); the clip doesn't show how the signature is computed.
- **Layout (1200×800):** time axis along the top; `api` left, B and C (`Actor`s) centre-left, `cdn` cloud right with its cache slot (filled from the start) and the two-line checklist. **Phone (800×1200):** time axis vertical down the left edge; api, B, C stacked; cdn at the bottom with the checklist beside it.
- **Beats:**
  - B0 (0–3 s) hold: playhead at 0; slot already holds A's photo. *"A's account is private. B follows A; C doesn't."* (47 / 3 s = 15.7)
  - B1 (3–9 s) B → api (blue) mono `GET /users/A/posts`; at the api a hand check `follows A? ✓` (green); green reply with the key tag and clock `5 min`. *"The API server checks the follow and gives B a signed URL, valid 5 minutes."* (75 / 6 s = 12.5)
  - B2 (9–12 s) the tag slides B → C (dashed graphite: a copy, not a call). *"B copies the URL to C."* (22 / 3 s = 7.3)
  - B3 (12–18 s) playhead to 2 min; C → cdn (blue); checklist ticks `signature ✓`, `not expired ✓` (green); green reply with the photo. *"Minute 2: signature valid, not expired. C sees the photo."* (57 / 6 s = 9.5)
  - B4 (18–25 s) playhead to 10 min (past the expiry mark); C → cdn; `not expired` fails, red `Cross`, red reply mono `bad url`; the slot keeps its photo (graphite). *"Minute 10: expired. The CDN refuses, even with the photo still cached."* (70 / 7 s = 10.0)
  - B5 (25–30 s) C edits `oe=…` to a later value (the segment rewrites); C → cdn; `signature` fails, red. *"Change the expiry and the signature no longer matches."* (54 / 5 s = 10.8)
  - B6 (30–33 s, poster) end state with hand labels `api: decides who gets the URL`, `cdn: checks the URL, knows no one`, `oe: expiry, most probably`. *"The CDN checks the URL, not the person."* (39 / 3 s = 13.0)
- **Predict line:** "A follower forwards a photo URL with a five-minute expiry. The friend opens it after two minutes, and again after ten. What happens each time?"
- **After:** "So the CDN never decides who may see a photo. The API server does, by deciding who gets the URL (5.3)."

## 4. `l09-hashtag-repartition`: the same posts, re-keyed by hashtag (§8.3, about 35 s)
- **Mechanism:** a `post_publish` topic keyed by `user_id` with three partitions holds three posts from three users: `p31 #sunset #sun #nature` (the class's post 31), `p40 #sunset`, `p52 #sunset #sun`. Naively, one counter per partition: `#sunset` reaches three servers and becomes three thin red `count++` writes. Then the adapter (naive state ghosted): an extractor per partition reads each caption and emits one tuple per hashtag, `<#sunset, p31>`, `<#sun, p31>`, `<#nature, p31>`, …; the tuples flow into `POST_HASHTAG` keyed by hashtag, where `hash(tag)` sends every `#sunset` to the same partition. One counting server pulls them, its hash map reads `{ #sunset: 3 }`, and one heavy green write `count += 3` lands. The other two servers do the same for `#sun` (`+= 2`) and `#nature` (`+= 1`).
- **Why motion beats a still:** the lesson is redistribution: the same events scatter by user and converge by hashtag. Watching three `#sunset` squares that started on three partitions end up in one place is what makes "re-key, then batch" click; two stills hide which square went where.
- **Static twin:** Fig 8·b (the problem) and Fig 8·c (the adapter); board D-11 (`b_023400.jpg`), D-08 (`b_022245.jpg`).
- **Ledger taught:** L-0242, L-0243, L-0244, L-0247, L-0249, L-0250, L-0251, L-0267, L-0269, L-0270. **Context only:** L-0240, L-0254 (the faint `search · notifications` consumers on the post topic: why it isn't re-keyed), L-0297 (the hash map, taught in 8.4).
- **Fidelity notes:** posts p40 and p52 are illustrative; p31 and its three hashtags are the class's (L-0247). Three partitions follow the class's example (L-0270). Which partition each hashtag hashes to is illustrative; `hash(tag)` is generic and no partitioner is named (L-0251: three partitions can hold millions of hashtags, so the clip never implies one partition per tag). The naive beat shows one `#sunset` post per server, so "three single writes" is true even with per-server summing; the clip does not claim batching is impossible without re-keying (L-0243 inline clarification). Adding partitions later (A-HSD-03) and the over-count on a crash (L-0255) are not in the clip.
- **Layout (1200×800):** three horizontal bands: top `post_publish · key: user_id` pipe with counters/extractors under it; middle `POST_HASHTAG · key: hashtag` pipe; bottom three counting servers and the `hashtag db`. **Phone (800×1200):** the same three bands stacked with more height; partitions drawn as three rows inside each pipe so the squares stay ≥ 24 px.
- **Beats:**
  - B0 (0–4 s) hold: the post topic with p31 in p0, p40 in p1, p52 in p2; faint consumers `search · notifications` on it. *"Three posts from three users. The topic is keyed by user_id."* (60 / 4 s = 15.0)
  - B1 (4–10 s) a counter per partition pulls; three thin red arrows `#sunset: count++` into the db. *"#sunset sits on three servers: three single writes."* (51 / 6 s = 8.5)
  - B2 (10–17 s) naive state to 38%; extractors pull; p31 splits into three tuple squares `<#sunset, p31>`, `<#sun, p31>`, `<#nature, p31>` (blue), then p40 and p52 split. *"The extractor writes one message per hashtag. Post 31 becomes three."* (68 / 7 s = 9.7)
  - B3 (17–24 s) tuples move one by one into `POST_HASHTAG`, each passing a small mono `hash(tag)` gate; all three `#sunset` squares gather in one partition. *"A second topic keyed by hashtag: every #sunset lands on one partition."* (70 / 7 s = 10.0)
  - B4 (24–31 s) counting server 1 pulls its partition; hash map `{ #sunset: 3 }`; one heavy green arrow mono `count += 3`; servers 2 and 3 follow with `#sun += 2`, `#nature += 1`. *"One server, one batch: count += 3 instead of three count++."* (59 / 7 s = 8.4)
  - B5 (31–35 s, poster) both topics, the ghosted naive writes and the three batched writes, hand `adapter: re-key, then batch`. *"Same posts, re-keyed. That's the adapter."* (41 / 4 s = 10.2)
- **Predict line:** "Post 31 carries three hashtags. How many messages does it become, and on how many counting servers can `#sunset` land?"
- **After:** "That re-keying step is the adapter: the post topic stays as it is for everyone else, and counting gets its own topic (Fig 8·c)."

---

## Build notes (for the animator)
- Reuse `learn/animations-lab` / `site/src/animations/lib` primitives (`Sheet`, `Stage`, `Ink`, `Pen`, `Packet`, `Write`, `StepBadge`, `CaptionBand`). Frame 0 = the page's static twin; the last frame = the poster used in the clip placeholder.
- One thing in motion at a time: in clip 1 the counters tick only while requests move; in clip 4 the tuples move one at a time in B3, never as a swarm.
- Render load-light: `--concurrency=1`, stills first (every caption beat, light and dark, 358 px phone contact sheet), one mp4 at the end.
- Every on-screen word above is from the listed ledger ids or the board, except these, marked in each storyboard's `fidelity_notes`: illustrative counts (`1,000`, origin `2`), `GET /feed`, minutes 2 and 10, posts p40 and p52, partition assignment; sourced addition: "even with the photo still cached" (SN-04 / A-CDM-13).
