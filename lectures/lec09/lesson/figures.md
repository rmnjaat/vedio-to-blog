# Lecture 07 (lec09): figure specs

This file is for the illustrator. Every figure on the page is listed here in reading order. Board redraws name the D-xx diagram from `lectures/lec09/board/diagrams.md` and the clearest frame in `lectures/lec09/board/frames_kept/` (look at it; never embed it). New figures say "new". Each entry gives parts and positions, arrows, labels (exact words), marker colours, the step text for step-throughs, the phone layout, a desc draft and the ledger ids it carries.

Totals: **37 drawn items** = 27 numbered figures (6 of them step-throughs) + 10 rule-box sketches (one per RuleBox, §1–§10), plus one trade-off-table header sketch (T4, which carries D-07). **23 figures get a separate portrait phone layout** (listed per entry; the other 4 numbered figures and all rule sketches are drawn at ≤ 360 units and need none). Clip posters are specified in `animations.md`.

**Board accounting.** All 12 board diagrams are redrawn; none is dropped. Four are split because the board's final state carries several ideas at once (NOTES weakness #2: dense figures don't fit the notebook idiom):

| D-xx | Where it goes | Why split / folded |
|---|---|---|
| D-01 Instagram year one | Fig 1·a | – |
| D-02 CDN between user and origin | Fig 2·b (plain copy), Fig 2·c (copy with addresses, StepThrough), RuleBox §2 sketch | the board drew it twice; each copy teaches a different thing |
| D-03 Image upload with a presigned URL | Fig 3·a (the brainstorm text above it), Fig 3·b rows b–c (user ⇄ ImgUpld ⇄ S3), clip `l09-presigned-upload` + RuleBox §3 sketch (the long arc user → S3), Fig 4·a (the `post` list with `url` struck) | one live page carried four chapters of content |
| D-04 Upload and publish flow | Fig 4·c (top: B ← CDN ⇄ S3), Fig 4·b (middle: A, Image Service, Posts Service, MySQL), Fig 6·a (bottom: Kafka, CDC, other services) | three chapters on one notes page |
| D-05 Posts service validates the image id | Fig 4·a (table + path connectors), Fig 4·b (validation note) | table and flow belong to different subsections |
| D-06 HashTag page mock | Fig 7·a | – |
| D-07 Hashtag document, two ways to store top 100 | TradeoffTable T4 (the outline makes it a table) + the T4 header sketch below; the document itself is the §7.2 CodeBlock | its content is a two-column comparison with pros/cons: exactly a table |
| D-08 Hashtag counting pipeline (live) | Fig 8·a (earlier form, `Batching`), Fig 8·b (pipe relabelled `user_id`, the three-server problem); its final form (extractor → `hashtag` pipe → counting) is redrawn neat as Fig 8·c, and its `DS` → pipe → worker → DB branch as the popularity row of Fig 9·a | the live sketch is the messy first draft of D-11 and D-09; drawing it once more would repeat both |
| D-09 HashTag Service architecture | Fig 9·a; its live `"Dead Letter Queue"` note → RuleBox §10 sketch + T7; the D-12 sketch drawn above it → Fig 10·a | – |
| D-10 Read path and write path | Fig 9·b | – |
| D-11 Adapter: extraction and repartitioning | Fig 8·c; the live annotations `<h1, p1>` / `{ h1: int }` → Fig 8·d | – |
| D-12 Kafka stream, H and LC | Fig 10·a | – |

---

## 0. The glyph kit (build these once, reuse everywhere)

Everything in `site/FIGURES.md` applies: one stroke family (1.7 px regular, 1.1 thin, 3.2 heavy), seeded wobble (bow ≤ 1.3, jitter 0.3), no hachure, shapes filled with `--fig-bg`, labels ≥ 12 px on screen, distinct seeds per part (`` `${figId}-<part>` ``). Lec01's glyphs are reused unchanged; the additions below are thin wrappers around kit parts (no hand-written path data). Put them in `site/src/figures/lec09/parts.tsx`.

| Glyph | Drawing (kit parts) | Label |
|---|---|---|
| user / viewer (person) | `Actor` (≤ 3 per figure), as on the board | hand `user`, `A`, `B`, `C`, `follower`, `not a follower` |
| app / browser (box) | `Client` | mono `app`, `browser` |
| service / API server | `Box`, 3 px chamfer | mono `api`, `image svc`, `upload svc`, `post svc`, `hashtag api`, `popularity svc`, `origin` |
| fleet | `Fleet` (stacked offset copies) | hand `×n` only where the class gave a number; otherwise no count (`countLabel={false}`) |
| load balancer | `LoadBalancer` bar | mono `lb` |
| DNS | small `Box` with a folded top-right corner (two `Line`s), as in lec08 | mono `dns` |
| database | `Cyl` | mono `posts db`, `mysql`, `hashtag db` |
| partitioned database | three `Cyl` in a row (front one full ink, the other two the same) | hand `partitioned db` under them |
| cache (k/v) | `Cache` | mono `cache` |
| **CDN** | `Cloud` (single stroke) | mono `cdn`, or the host in mono under it (`a.mycdn.net`) |
| **CDN cache slot** | a `Cache` with `rows={1}` tucked into the cloud's lower right; empty = blank row, filled = a photo chip in the row | hand `cached copy` on first use |
| **S3 bucket (new)** | `Cloud` (the board draws S3/GCS as a cloud too) with a small bucket mark inside its lower half: a trapezoid of three `Line`s (top 22, bottom 16, height 12). Never confuse with the CDN: the CDN cloud has no mark | mono `s3` |
| **private bucket lock (new)** | a 12×9 `Box` with a thin `Line` arc above it, on the bucket's top-right | none |
| **photo bytes (new)** | a 14×10 `Box` with no label, filled with the marker tone (`PhotoChip`): the board's small purple/pink rectangle above the stick figure. It appears **only** where the 5 MB actually travels; metadata calls are thin lines without it | mono `5 MB` beside it on first use |
| **phone screen (new)** | tall `Box` (ratio 1:1.9, 6 px chamfer) with a 14-unit `Line` at the top for the speaker slot | none, or hand `phone` |
| **browser window (mock, new)** | `Box` with a `Line` 18 units under its top edge; the URL in mono in that bar (truncated with `…`); a private window has a **dashed** outline and hand `private window` | mono URL |
| **URL key tag (new)** | a small `Box` (chamfered tag) with a 4-unit `Dot` hole at its left end, holding a mono URL fragment; a tiny clock beside it (circle `Dot` ring + two `Line` hands) = expiry | mono `…?oh=…&oe=…`, hand `expires` |
| Kafka topic | `Pipe` with the mono topic name above it; partitions as thin inner rules (light rule ink, never blue: blue is the data path) with mono `p0 p1 p2` at the left end; the key in mono under the pipe | mono `kafka`, `post_publish`, `POST_HASHTAG`, `their kafka`; mono `key: user_id` / `key: hashtag` |
| message / event | 10-unit square; a tuple event is a 10-unit square with a mono label beside it | mono `p31`, `<#sunset, p31>` |
| consumer / worker | `Worker` (round box with loop mark) | mono `search`, `counting server`, `extractor`, `workers` |
| document | ruled rectangle (a `Box` plus thin `Line` rules) holding mono lines | mono `{ tag: sunset … }` |
| table block | ruled rectangle with a header row (lec01's table block) | mono column names |
| bandwidth bar (network card) | thin horizontal gauge: `Box` 80×10 with a fill rectangle inside; graphite fill normally, red fill when at the limit, with a `Ceiling` tick at the right end | hand `network card` |
| offset strip | a row of 10-unit cells with mono offsets under them (`0 1 2 …`); carets are small `Arrow`s pointing down onto a cell | mono `H`, `LC` |
| step numeral | `Num` circled numeral on the arrow or time axis | matches the step text one-to-one |

**Arrows.** Solid = synchronous request. Dashed = asynchronous (a hand-off into Kafka nobody waits on, CDC, a consumer's pull). Open chevron heads, **on the initiator's direction only**. Architecture views use orthogonal routing; diagonals only in time-sequence (swim-lane) views and the one long upload arc (the board's own gesture, kept because the arc *is* the point: the bytes skip everything in between).

Fixed direction rules for this lecture:
- **The CDN pulls.** The CDN → origin / CDN → S3 arrow starts at the CDN (it fetches on a miss). Nothing is ever drawn as an arrow *into* the CDN from the origin, and nothing pushes to a CDN (L-0019). Invalidation (§2.6, prose only) would be your server → CDN `invalidate path`, graphite, never carrying bytes.
- **Responses** ride the same exchange: a return arrow (green when it carries what was asked for) drawn as the reply, not as a new initiative.
- **Kafka is pulled.** Producer → topic is a dashed arrow from the producer. Consumers are linked by a dashed arrow **from the consumer to the pipe**, labelled hand `pulls` once per figure; messages moving pipe → consumer in step-throughs are drawn as squares travelling, not as pushes. The one contrast is Redis Pub/Sub (T5 header glyph only): an arrow from the broker to subscribers, labelled `pushes`.
- **Replication** (only §10.1 prose mentions leader/replica; no figure needs it): if ever drawn, replica → leader `pulls changes`, as in lec01.

**Marker colours.** Blue = request / data path (a GET for a photo, the photo bytes on their way up, a post event on Kafka, a tuple moving to its partition). Green = ack / success (a cache hit served, an upload accepted, `count += n` landing, a valid signature). Red = failure, stale, forbidden or a hard limit ("Bad URL timestamp", an expired URL, a private bucket refusing a direct read, a network card at its limit, an over-count, a database that "might cry"). **A cache miss going to the origin is not red**: it is the CDN working as designed (graphite). Graphite = everything else. The board's pinks, yellows, purples and cyans are not carried over; they map to graphite. The board's red emphasis boxes and circles are temporary and become graphite hand rings (red would read as "failure").

**Speech bubble** (at most one per section, misconception only): §2 on the CDN cloud in Fig 2·b `nobody pushes to me` (L-0019). §5 on the private-profile lock in Fig 5·a `I hide the list, not the photos` (L-0172 against the "private means private" myth, L-0118). §8 none in figures (the Pub/Sub misconception lives in T5). All other sections: none.

**Accessibility.** Every SVG gets a `<title>` = the figure title and a `<desc>` that states the mechanism in one or two sentences (drafts below as **Desc**). Step-throughs: each step's text is also the live-region text for that step.

**Mobile.** Figures with more than 7 glyphs, more than 2 panels, or wider than ~360 units get a separate portrait layout drawn at ~340 units inside `<Phone>` (`layout="phone"`), with labels ≥ 12 px at 360 px (`Label` clamps to 12.5 units; at 340 units on a 360 px screen that is ≥ 12.5 px). Each entry says how. Rule sketches are authored at 480 units but contain ≤ 5 glyphs and scale cleanly; they are checked at 360 px with `check-figures` like everything else.

**Hosts and names.** The instructor's site appears as the demo used it (`arpitbhayani.me`, `edge.arpitbhayani.me`, `a.mycdn.net`), never with a personal name in a label. The board's slips are written properly: `system-design` (board `syskm-design`), `PostgreSQL` (`Poslgresal`), `RabbitMQ` (`Rabbit…`), `#nature` (`#nolne`), `hashtag` (`hastag`), `Counting` (`County`), `extractor` (`extraptor`), and **post svc** wherever the printed notes say `Image Service` (L-0268).

---

## Lecture header + §1 Instagram's first year

### Fig 1·a: Instagram, end of year one (D-01 redraw)
- **Section:** 1.1. **Board:** D-01, frame `b_000215.jpg` (caption `b_000230.jpg`; also `b_000545.jpg`).
- **Parts and positions (desktop, 880 × 380):** top row, centred at y = 70: three `Box`es 110 × 44, mono `nginx` (x 180), `django` (x 385), `celery` (x 590). Bottom row at y = 250: four `Cyl`s mono `cassandra`, `postgresql`, `memcached`, `redis` (x 120, 300, 480, 660) and a `Pipe` mono `rabbitmq` (x 760–860), all one size.
- **Arrows/lines:** plain `Line`s (no heads: the board drew connections, not calls) nginx — django — celery; orthogonal bus lines from `django` down to all five stores and from `celery` down to all five (route both through two horizontal buses at y = 150 and y = 170 so ten diagonals become two clean buses).
- **Labels:** heading hand `Instagram's year-one architecture` above the top row; under the bottom row, hand `on AWS`. Caption strip under the figure, hand: `why famous?  1 year · 14 million · 3 engineers` (the board's pink line, graphite here).
- **Sourced ghost (38% ink, right edge):** a small `s3` bucket + `cdn` cloud with hand `photos: S3 + CloudFront (source, not on the board)`: the fact-check's clarification of L-0009, and the bridge to §2.
- **Colours:** all graphite.
- **Phone (portrait, 340 wide):** three app boxes stacked in a column on the left; the five stores in a column on the right; one bus between them labelled hand `django and celery use all five`; the ghost and the caption strip below.
- **Desc:** "Nginx in front of Django, with Celery for background work; both use Cassandra, PostgreSQL, Memcached, Redis and RabbitMQ, all on AWS, as drawn in class."
- **Ids:** L-0007, L-0009, L-0011.

### RuleBox sketch §1: watch whoever grows fastest (new)
- **Section:** 1.2. A tiny timeline (x axis hand `years`) with two bumps drawn as `Line` curves, labelled mono `PHP/MySQL` (first bump, hand `2008–2011` under it) and `Django/Celery` (second); a third dashed bump at the right with a hand `?`. A tiny stick figure under the `?`, hand `need it?`.
- **Ids:** L-0010, L-0014.

---

## §2 A CDN as a black box

### NotationKey (§2.1, once per lecture; not numbered)
The kit's notation key, extended with this lecture's glyphs: cloud = `cdn`; cloud with a bucket mark = `s3 / gcs`; `PhotoChip` = "the photo's bytes"; `Pipe` with a mono name = Kafka topic (`POST_HASHTAG`); stacked boxes = fleet of workers; phone outline = app screen; key tag with a clock = signature + expiry on a URL; dashed arrow = asynchronous; arrowhead = who starts the call. Marker legend: blue request/data, green success, red failure/forbidden/limit.

### Fig 2·a: Without a CDN (new)
- **Section:** 2.1. **Board:** none (the class described it aloud, L-0023).
- **Parts (desktop, 880 × 300):** `Actor` hand `user (US)` at x 60; `dns` box above the path at x 220, y 40; `lb` bar at x 470; `Box` mono `api` at x 620 with a `Disk` under it hand `image on disk`; a **bandwidth bar** on the api's right side, hand `network card`. Far right, a hand location tag `Singapore` above the lb/api pair; under the user, `US`.
- **Arrows:** ① user → dns `resolve` (thin blue), dashed graphite reply dns → user mono `IP of lb`; ② user → lb → api (blue, solid, mono `GET /system-design/logo.png`); ③ api → user (green, long return along the bottom) carrying a `PhotoChip` with mono `10 MB`.
- **Labels:** a long hand bracket under the return arrow `Singapore → US: slow` (L-0027). The bandwidth bar fill is red at ~90% with hand red `every image on the same card as every API call` (L-0025). Small hand at top right, attributed: `"a crime"`.
- **Colours:** blue request; green return carrying bytes; red bar.
- **Phone:** vertical: user at top, dns to its right, lb, api below; the return arrow runs up the right edge; the bracket becomes a hand note under the api.
- **Desc:** "The image URL resolves to the origin's load balancer; an API server reads the 10 MB image and sends it back across the world, spending its own network card on every view."
- **Ids:** L-0023, L-0024, L-0025, L-0027.

### Fig 2·b: User — CDN — origin (D-02 redraw, plain copy)
- **Section:** 2.1. **Board:** D-02, frame `b_001200.jpg` (also `b_000645.jpg`).
- **Parts (desktop, 640 × 220):** `Actor` hand `user` (x 60); `Cloud` mono `cdn` (x 300) with an empty cache slot; `Box` mono `origin` (x 560) with hand under it `S3 bucket, backend, anything`.
- **Arrows:** user → cdn (blue, solid); cdn → origin (graphite, solid, head at the origin) hand `fetches on a miss`; return arrows green on the reply leg only (origin → cdn → user drawn as the reply line under each).
- **Speech bubble (§2's one):** on the cloud, `nobody pushes to me`.
- **Colours:** blue request; green replies; the miss leg graphite.
- **Phone:** not needed (3 glyphs, drawn at 340 wide: cloud between, labels under each glyph).
- **Desc:** "A CDN sits between the user and the origin. It answers from its cache, and only it ever calls the origin, on a miss."
- **Ids:** L-0018, L-0019, L-0020, L-0026.

### RuleBox sketch §2: transparently in between (D-02, shrunk)
- **Section:** 2.1. Stick figure — `cdn` cloud — `origin` box, the cdn → origin line with its head on the origin and hand `pulls`. Nothing else.
- **Ids:** L-0018, L-0038.

### Fig 2·c: One request through a CDN property (D-02 redraw, copy with addresses; StepThrough)
- **Section:** 2.2. **Board:** D-02 second copy, frame `b_001200.jpg`; emphasis state 00:29:45 (`b_013230.jpg` area, the red box round the path).
- **Layout (lane figure, 420 wide):** lanes, time running down: `browser` · `dns` · `cdn  a.mycdn.net` · `origin  arpitbhayani.me`. Above the cdn lane a small property card (table block, 2 rows): mono `a.mycdn.net → arpitbhayani.me`, hand `CDN property`.
- **Steps** (circled numerals on the arrows, one-to-one):
  1. browser → dns (blue) mono `a.mycdn.net?`; reply mono `CDN's IP`. *"The browser only sees a hostname. DNS answers with the CDN provider's IP; the browser has no idea it is a CDN."* (L-0032, L-0033)
  2. browser → cdn (blue) mono `GET a.mycdn.net/system-design/logo.png`; the property card's row rings graphite. *"The CDN looks up the origin configured for this property."* (L-0030, L-0034)
  3. On the cdn lane, the URL rewritten in two mono lines: `a.mycdn.net/system-design/logo.png` over `arpitbhayani.me/system-design/logo.png`, with a graphite hand-drawn box round the path in both and hand `same path`. *"It swaps the host and keeps the path, so any path under the property works without configuring it."* (L-0034, L-0035)
  4. cdn → origin (graphite, the pull) mono `GET /system-design/logo.png`; origin → cdn reply with a `PhotoChip`. *"The origin answers as it always does; it can't tell the CDN from any other client."* (L-0036)
  5. Chip drops into the cdn's cache slot (green tick); cdn → browser green reply with the chip. *"The CDN caches the bytes and returns them."* (L-0036)
- **Note:** the board's red emphasis box becomes a graphite ring: red means failure on this site.
- **Phone:** the lane figure is 420 wide → phone layout at 340 with lane headers abbreviated to mono `browser · dns · cdn · origin`, the hosts moved into the step text, and the rewrite in step 3 broken after the host.
- **Desc:** "Five steps: DNS sends the browser to the CDN; the CDN maps its property to the origin, swaps the host, keeps the path, fetches, caches and returns."
- **Ids:** L-0030, L-0032, L-0033, L-0034, L-0035, L-0036.

### (clip `l09-cdn-miss-hit`, §2.3, see `animations.md`)

### Fig 2·d: The URL rewrite (new)
- **Section:** 2.4. **Board:** none (the live demo on the instructor's site, recreated).
- **Parts (desktop, 720 × 200):** two URL strips, one above the other, each a row of segment boxes in mono:
  - top (what the page asks for): `https://edge.arpitbhayani.me` | `/img/arpit.png`
  - bottom (what the CDN fetches on a miss): `https://arpitbhayani.me/static` | `/img/arpit.png`
- **Connectors:** dotted vertical `Line`s from top path to bottom path, hand `unchanged`; under the bottom host a `Bracket` (graphite) round `/static`, hand `origin path, set once in the property`. Left of the strips, hand `the page asks` / `the CDN fetches (miss)`.
- **Footer (mono):** `fetch(origin + path)` with hand `string concatenation, nothing more`.
- **Colours:** top path segment blue (the request), bottom graphite; no red.
- **Phone:** each URL breaks into two lines (host, path); connectors stay vertical; at 340 wide.
- **Desc:** "The CDN host is replaced by the configured origin, which here includes /static; the path after it is carried over unchanged."
- **Ids:** L-0046, L-0047, L-0048, L-0049.

---

## §3 Uploading a photo

### Fig 3·a: The brainstorm list (new; text from the D-03 page)
- **Section:** 3.1. **Board:** the Image Upload Service page, frame `b_013115.jpg` (top half).
- **Parts:** a hand-lettered card: heading mono `image upload service`, under it hand `requirement: 5M photo uploads / day`. Then six hand check-box rows, each ending in a small chapter chip (mono): `storage → §3.1`, `data flow → §3.2–3.4`, `separation of concerns → §4`, `privacy → §5`, `extensibility → §6.1`, `optimization → §6.2`. The privacy row carries a tiny hand aside `not what you think`.
- **Colours:** graphite; the chips are links.
- **Phone:** not needed (single column, drawn at 340).
- **Desc:** "The six items the class listed for the upload service, each tagged with the chapter of this page that covers it."
- **Ids:** L-0061, L-0062, L-0063.

### Fig 3·b: Three paths for one photo (D-03 redraw, rows b–c; row a new)
- **Section:** 3.2. **Board:** D-03, frames `b_013115.jpg`, `b_004445.jpg` (the `ImgUpld` box first labelled `API`).
- **Layout:** three rows (panels), each 820 × 110, the photo's route left to right. Every row starts with `Actor` hand `user` holding a `PhotoChip` mono `5 MB` and ends with the `s3` bucket.
  - **Row a `a persistent connection, in chunks`:** user ⇄ `api` drawn as a double `Line` (a held connection) with four small chip fragments on it; a graphite strike across the row and hand `unnecessary: one HTTP request carries 5 MB` (L-0065, L-0066).
  - **Row b `through the API server`:** user → `api` → `s3`, both legs blue and each carrying a chip, hand `5 MB in` / `5 MB out`. The api's bandwidth bar at the limit, red, hand red `network card limit: other API calls suffer`. A small graphite aside under the api: `crash mid-upload? send a 5xx, the client retries` with a green tick (not the problem) (L-0068, L-0069, L-0070, L-0071, L-0072). A thin hand note above: `must be synchronous: users want to see it now`.
  - **Row c `a dedicated upload service`:** user → `upload svc` → `s3`, chips on both legs; the upload svc's bar drawn longer (bigger card), graphite, hand `takes load off the API servers` (L-0073, L-0074, L-0075). Over the row, a dashed arc from the user toward `s3` that stops short, ending in a hand `?`: `can we do better?`
- **Colours:** blue request legs; red bar only in row b.
- **Phone:** rows already stack; each row redrawn at 340 wide with the labels moved under the glyphs (3 panels → portrait layout).
- **Desc:** "Three ways to move a photo into S3: chunked over a held connection (unnecessary), through the API server (5 MB in and 5 MB out on its network card), or through a dedicated upload service, which still carries every byte."
- **Ids:** L-0065, L-0066, L-0068, L-0069, L-0070, L-0071, L-0072, L-0073, L-0074, L-0075.

### RuleBox sketch §3: simple is hard (D-03's arc)
- **Section:** 3.2. User (with chip) → a long blue arc → `s3` cloud. Under the arc, a small `api` box crossed out in graphite. Hand `one request, signed, short-lived`.
- **Ids:** L-0067.

### (clip `l09-presigned-upload`, §3.3, see `animations.md`)

### Fig 3·c: GitHub's attachment upload, call by call (new, annotated mock DevTools; StepThrough)
- **Section:** 3.4. **Board:** screen share S22–S25 (frames `b_004509.jpg`–`b_005615.jpg` range; network rows read in `board_log.md` lines on S23–S24).
- **Layout (lane figure, 420 wide):** left, a mock **DevTools Network** panel (table block, mono rows, one per call); right, three lanes `browser` · `github.com` · `s3`, plus a fourth lane `cdn  user-images.githubusercontent.com` that appears in step 5. Rows (as on screen):
  - `201  POST  github.com  assets`
  - `200  OPTIONS  github-production-user-asset… (s3)` (faint, 38%: on screen, not a step)
  - `204  POST  github-production-user-asset….s3.amazonaws.com`
  - `200  PUT  github.com  221335625`
- **Steps:**
  1. Row 1 highlights; browser → github.com (thin blue, no chip) with a payload card mono `name: n_t0lO0mq5Q.png · size: 183938 · content_type: image/png · authenticity_token`. *"Attaching a 179 KB PNG fires four calls. The first registers the intent to upload and sends only metadata: no image yet."* (L-0088, L-0089)
  2. github.com → browser (green reply) with a response card in three blocks: mono `upload_url: https://github-production-user-asset-6210df.s3.amazonaws.com`, `form: { key, acl, policy, X-Amz-Algorithm, X-Amz-Credential, X-Amz-Date, X-Amz-Signature, … }`, `href: https://user-images.githubusercontent.com/4745789/221335625-….png`. Hand labels: on upload_url `S3's URL, not GitHub's`; on `policy` `signed: expiry inside`; on href `a CDN URL`. *"The response holds S3's upload URL, the signed form fields, and the future image URL, which is a CDN URL."* (L-0090, L-0091, L-0092, L-0094, L-0096, L-0098)
  3. Row 3 highlights; browser → s3 (blue, carrying a `PhotoChip` mono `≈173 KB`) with hand `form fields + file`; green reply mono `204`. *"The browser POSTs the form fields and the file straight to S3. GitHub's servers never see the bytes."* (L-0095, L-0100)
  4. Row 4 highlights; browser → github.com (thin blue) mono `PUT …/221335625`; green `200`; the comment box shows mono `![…](https://user-images.githubusercontent.com/…png)` with hand `"!" = render as image`. *"A small PUT tells GitHub the upload is done, and the markdown for the image goes into the comment."* (L-0093, L-0100)
  5. The cdn lane appears: browser → cdn (blue) `GET …/221335625-….png`; cdn → s3 (graphite, the pull) hand `miss: read the key`; s3 → cdn → browser green with chip; a second GET below, served from the cdn slot, hand `next load: hit`. *"Opening the image: the CDN misses, reads the key from the S3 origin, caches it and serves; the next load is faster."* (L-0102)
- **Colours:** blue requests; green replies; the chip only on step 3 and the step-5 reply.
- **Phone:** the DevTools panel moves above the lanes; rows truncated to `201 POST assets`, `204 POST s3`, `200 PUT 221335625`; cards wrap to 3 lines at 340 wide.
- **Desc:** "GitHub registers the upload with metadata only, gets back S3's signed form and a CDN URL, POSTs the file straight to S3, confirms with a PUT, and later serves the image through its CDN."
- **Ids:** L-0088, L-0089, L-0090, L-0091, L-0092, L-0093, L-0094, L-0095, L-0096, L-0098, L-0100, L-0102.

### Fig 3·d: Private bucket, public CDN (new)
- **Section:** 3.5. **Board:** none (Q&A 00:58–01:03).
- **Parts (desktop, 640 × 240):** `Actor` hand `user` (x 60); `cdn` cloud (x 300) with a URL key tag on its lower edge holding hand `keys (third-party CDNs) or OAC (CloudFront)`; `s3` bucket (x 560) with the **lock** mark.
- **Arrows:** user → cdn (blue); cdn → s3 (graphite, the pull) hand `authenticated read with the SDK`; green replies. A dashed blue arrow user → s3 directly along the bottom, ending in a red `Cross` at the bucket, hand red `private: only the CDN may read`.
- **Labels:** under the user, mono `the app renders the CDN URL`.
- **Colours:** blue, green, one red cross.
- **Phone:** not needed (3 glyphs; drawn at 340 with the key-tag label wrapped under the cloud).
- **Desc:** "The bucket stays private. The CDN reads it with credentials (keys for third-party CDNs, origin access control for CloudFront) and the app only ever gets CDN URLs."
- **Ids:** L-0106, L-0107, L-0108, L-0115, L-0116, L-0117.

---

## §4 Storing the post

### Fig 4·a: `posts`, and the path it implies (D-03 bottom-right + D-05 top redraw)
- **Section:** 4.1. **Board:** D-05 top, frame `b_011325.jpg`; the struck `url` from D-03, `b_013115.jpg` / `b_013924.jpg`.
- **Parts (desktop, 760 × 300):** left, a table block `posts` with five rows, each with a hand gloss after a `→`:
  `id → from an id generator` · `user_id → author of the post` · `image_id → random photo id from the image svc` · `caption` · `url` — the last row ringed graphite and struck through with one heavy `Line`, hand `derivable: don't store it`.
- **Connectors:** two orthogonal `Line`s from the `user_id` and `image_id` rows run right and up into the matching segments of a mono path on the right: `s3://insta-images/<user_id>/<image_id>`. Hand above it: `the photo's S3 path can be computed`. Small hand note top right (the board's aside): `CDNs also do this`.
- **Colours:** graphite only (nothing is moving).
- **Phone:** table on top at 340 wide; path below on two lines (`s3://insta-images/` / `<user_id>/<image_id>`); connectors become two short down-arrows.
- **Desc:** "The posts table keeps id, user_id, image_id and caption; the URL column is struck out because the S3 path is built from user_id and image_id."
- **Ids:** L-0123, L-0132, L-0133, L-0134, L-0135, L-0137.

### RuleBox sketch §4: derivable, so not stored (new)
- **Section:** 4.1. A three-row `posts` mini table (`user_id`, `image_id`, `url` struck). An arrow from the first two rows to mono `cdn/<user_id>/<image_id>.png`, hand `built when asked`.
- **Ids:** L-0125.

### Fig 4·b: Image service and post service (D-04 middle + D-05 bottom redraw)
- **Section:** 4.3. **Board:** D-04 frame `b_011515.jpg` (middle); D-05 `b_011325.jpg` (bottom: validation note).
- **Parts (desktop, 760 × 320):** `Actor` hand `A` (x 70, y 160) with a `PhotoChip`. Upper right: `image svc` box (x 330, y 70); `s3` bucket (x 620, y 70). Lower right: `post svc` box (x 330, y 250); `posts db` cylinder (x 620, y 250). A dashed graphite horizontal divider between the two pairs with hand on its right end `linked only by image_id`. Beside `image svc`, two dashed ghost boxes (38%) mono `video svc`, `reels svc`, hand `add later; the post doesn't change`.
- **Arrows:** ① A → image svc (blue) hand `prepare upload`; green reply hand `signed URL + image_id`. ② A → s3 (blue, carrying the chip) hand `upload`. ③ A → post svc (blue) mono `create post (image_id, caption)`; post svc → posts db (blue); green reply to A. Under post svc, hand: `checks image_id belongs to A`.
- **Dropped from the board:** the `Image Service → S3` elbow: signing is local to the service (L-0085 inline clarification), so no call to S3 is drawn during prepare.
- **Colours:** blue requests; green replies; chip only on ②.
- **Phone:** portrait: A at top; image svc and s3 in one row; the divider; post svc and posts db in the next row; ghost boxes move under image svc.
- **Desc:** "A asks the image service to prepare an upload, uploads the photo straight to S3, then asks the post service to create the post with the image ID; posts and media are linked only by that ID."
- **Ids:** L-0146, L-0147, L-0148, L-0149, L-0150, L-0151.

### Fig 4·c: B loads A's profile (D-04 top redraw; StepThrough)
- **Section:** 4.4. **Board:** D-04 top, frames `b_011515.jpg`, `b_013742.jpg`; notes S36 (`b_011615.jpg`: `GET /users/A/posts`, `url: "Dynamically generated by backend"`, `https://instacdn.net/A/1234.png`).
- **Layout (lane figure, 420 wide):** lanes `B's app` · `post svc` · `posts db` · `cdn  instacdn.net` · `s3`.
- **Steps:**
  1. app → post svc (blue) mono `GET /users/A/posts`. *"B opens A's profile; the app asks the post service for A's posts."* (L-0153)
  2. post svc → posts db (blue) mono `WHERE user_id = A`; reply rows mono `(id, A, 12345, caption)`. *"The post service reads A's rows: IDs and captions, no URLs."* (L-0155)
  3. On the post svc lane a small card: mono `"https://instacdn.net/" + A + "/" + 12345 + ".png"`, hand `built per request, maybe per CDN experiment`; green reply to the app with JSON mono `[{ id, user_id, caption, url }]`. *"For each row it builds the CDN URL in business logic and sends it in the JSON: this is how the app learns the CDN URL."* (L-0154, L-0155, L-0156)
  4. On the app lane, a small phone screen with an image tile, mono `<img src=…>`; app → cdn (blue) `GET /A/12345.png`. *"The app puts the URL in an image tag, which GETs it from the CDN."* (L-0156)
  5. cdn → s3 (graphite, pull) hand `miss`; green reply chip s3 → cdn → app; cdn slot fills. *"First view: a miss. The CDN reads the photo from S3, caches it and returns it."* (L-0157)
  6. A second viewer `C's app` (a ghost lane label replacing B's for this step) → cdn, green reply from the slot. *"The next viewer gets a hit. S3 isn't touched."* (L-0157)
- **Phone:** lanes abbreviated to mono `app · post · db · cdn · s3` at 340; the URL card wraps.
- **Desc:** "B's app asks the post service for A's posts; the service reads image IDs, builds CDN URLs on the fly and returns them; the CDN serves the photos, fetching from S3 only on a miss."
- **Ids:** L-0153, L-0154, L-0155, L-0156, L-0157, L-0158.

---

## §5 Who can see a private photo?

### Fig 5·a: The incognito test (new; mock of the live demo)
- **Section:** 5.1. **Board:** screen share S39–S40 (`b_012145.jpg`, `b_012230.jpg`, `b_012300.jpg`); no account content is drawn.
- **Panels (desktop, two panels of 380 × 260):**
  - **Panel a `a follower's view`:** a browser window mock showing a profile grid (2 × 2 tiles) with a lock mark and hand `private account`; an inspector strip below it in mono `<img src="https://…fbcdn.net/…_n.jpg?…&oh=…&oe=…">`. `Actor` hand `follower` beside it.
  - **Panel b `a private window`:** a dashed-outline browser window, URL bar mono `https://…fbcdn.net/…_n.jpg?…&oh=…&oe=…`, one large photo tile, green tick hand `loads`. `Actor` hand `not a follower`.
- **Arrow between panels:** a URL key tag travels follower → not a follower (graphite, dashed: a copy, not a call), hand `copy the URL, send it`.
- **Speech bubble (§5's one):** on the lock in panel a: `I hide the list, not the photos`.
- **Colours:** green tick; graphite otherwise. No red: nothing failed, which is the point.
- **Phone:** panels stack (2 panels; the windows are wider than 360 → portrait layout at 340).
- **Desc:** "A follower copies a photo URL from a private profile and sends it on; opened in a private window by someone who doesn't follow the account, it loads."
- **Ids:** L-0161, L-0162, L-0164, L-0166.

### Fig 5·b: One signed URL (new; the notes page's URL shape)
- **Section:** 5.2. **Board:** notes `3. Privacy`, frame `b_012057.jpg`; the real host from `b_012230.jpg`.
- **Parts (desktop, 860 × 220):** one mono URL across the figure, split into segment boxes: `https://instacdn.net` · `/ul/` · `1729_4275.jpg` · `?ig_cache_key=…` · `&oh=…` · `&oe=…` · `&nc_sid=…`.
- **Braces (Bracket, graphite) with hand labels under each:** `cdn domain` · `cdn path` · `image name (random id)` · `instagram's cache key` · `hash (the signature)` · `expiry, most probably` · `the CDN's own`. Over the `oh` + `oe` pair, one longer brace above the URL, hand `signed: change one and the check fails`.
- **Under the figure:** a small strip mono `instagram.fblr22-1.fna.fbcdn.net` with hand `the real host: Facebook's CDN`.
- **Colours:** graphite; the `oh`/`oe` segment boxes outlined in the key-tag glyph's style.
- **Phone:** the URL breaks into a vertical list, one segment per line, each with its label to the right (portrait layout at 340).
- **Desc:** "An Instagram photo URL is a CDN host, a path, an image name and query parameters; oh is a hash over the URL and oe most probably its expiry, so the CDN can check both."
- **Ids:** L-0167, L-0169, L-0170.

### (clip `l09-signed-url-expiry`, §5.2, see `animations.md`)

### RuleBox sketch §5: privacy lives in the API (new)
- **Section:** where the RuleBox is placed (L-0172 in 5.3; its body quotes L-0160). An `api` box hands a URL key tag (with clock) to a stick figure (solid arrow, green); a second stick figure holds a copy of the tag (dashed graphite). Hand under the api: `decides who gets the URL`; under the clock: `until it expires`.
- **Ids:** L-0160, L-0172.

---

## §6 Extend and optimize

### Fig 6·a: One post, many consumers (D-04 bottom redraw)
- **Section:** 6.1. **Board:** D-04 bottom, frame `b_011515.jpg` (also `b_014330.jpg`).
- **Parts (desktop, 820 × 300):** `post svc` box (x 120, y 60) → `mysql` cylinder (x 420, y 60). A `Pipe` mono `kafka` (x 200–560, y 170) with mono `key: user_id` under it. Four `Worker`s in a row at y 260: mono `search`, `notification`, `analytics`, `feed`.
- **Arrows:** post svc → mysql (solid graphite, the write); post svc → kafka (dashed blue) hand `post published`; mysql ⇢ kafka (dashed graphite) hand `cdc (on the board, not discussed)`. Each worker → kafka dashed graphite, the first labelled hand `pulls`.
- **Labels:** hand under the workers `each at its own pace`; small mono chips `CDC · Lecture 5`, `in depth · Lecture 9` near the cdc line.
- **Colours:** blue event hand-off; graphite otherwise.
- **Phone:** portrait: post svc and mysql on top; kafka across; the four workers in a 2 × 2 grid.
- **Desc:** "The post service writes the post and drops one event on Kafka; search, notifications, analytics and feed each pull it at their own pace."
- **Ids:** L-0180, L-0181, L-0182, L-0205, L-0242.

### RuleBox sketch §6: reuse what exists (new)
- **Section:** 6.2. A `cdn` cloud; incoming arrow labelled mono `?w=360`; out of it a small `PhotoChip` (green) next to a ghosted large one. Hand `already built: pay a little`.
- **Ids:** L-0184, L-0194.

### Fig 6·b: `?w=360` through the CDN (new; notes S44; StepThrough)
- **Section:** 6.2. **Board:** notes `4. Image Optimizations`, frames `b_013400.jpg`, `b_013424.jpg` (`https://instacdn.net/ul/1729_4275.jpg? w = 360`).
- **Layout (lane figure, 420 wide):** lanes `app` · `cdn` · `s3`. The cdn lane holds two cache slots, labelled mono `1729_4275.jpg?w=360` and `1729_4275.jpg`.
- **Steps:**
  1. The app (phone screen glyph, hand `360 px wide`) takes the URL from the backend and appends mono `?w=360`; app → cdn (blue). *"The app knows its screen, so it appends w=360 to the URL the backend gave it."* (L-0189, L-0190, L-0191)
  2. The `?w=360` slot rings graphite, empty. *"The CDN first looks for the resized copy. None yet."* (L-0192)
  3. The original slot rings graphite, empty. *"Then for the original. Not cached either."* (L-0192)
  4. cdn → s3 (graphite, pull); reply chip (large) green into the original slot. *"So it fetches the original from the origin, S3."* (L-0192)
  5. On the cdn lane, a resize mark (large chip → small chip, hand `resize on the CDN`); both slots filled; green reply with the small chip to the app. *"It resizes on the CDN server, caches the result and sends the small one."* (L-0192)
  6. A second app → cdn `?w=360`, green reply straight from the resized slot. *"The next request for the same width is a hit on the resized copy."* (L-0192)
- **Phone:** 3 lanes fit at 340; slot labels shorten to mono `?w=360` and `original`.
- **Desc:** "A request with w=360 is served from the CDN's resized copy if present; otherwise the CDN uses or fetches the original, resizes it, caches both and serves the small one."
- **Ids:** L-0189, L-0190, L-0191, L-0192.

### Fig 6·c: Instagram photos, end to end (new; recap)
- **Section:** 6.3. **Board:** none (assembled from D-03, D-04, D-05).
- **Parts (desktop, 880 × 380):** `Actor` `A` (left, upper); `image svc`; `s3` bucket (with lock); `cdn` cloud; `Actor` `B` (right, upper); `post svc` + `posts db`; `kafka` pipe with three small workers `search · feed · …`. Each box carries a small mono chapter tag: image svc `§3`, s3 `§3`, cdn `§2 §5 §6.2`, post svc `§4`, posts db `§4`, kafka `§6.1`, B's arrow `§4.4`.
- **Arrows:** A → image svc (blue, prepare); A → s3 (blue arc with chip); A → post svc (blue); post svc → posts db; post svc ⇢ kafka (dashed); B → post svc (blue, `GET /users/A/posts`) and B → cdn (blue, `GET` photo); cdn → s3 (graphite pull). Workers pull from kafka.
- **Labels:** hand under the figure: `boxes are the easy part; the details at each step are the work`.
- **Colours:** blue requests; graphite otherwise; no state shown.
- **Phone:** **vertical list layout** (as lec01's Fig 6·a): one row per component, glyph + chapter tag + one-line hand label (`image svc §3: signs an upload URL`, `s3 §3: holds the bytes, private`, `cdn §2 §5 §6.2: serves, checks signatures, resizes`, `post svc §4: stores ids, builds URLs`, `kafka §6.1: tells everyone`).
- **Desc:** "The upload service on one page: A uploads straight to S3 with a signed URL and posts via the post service; B gets CDN URLs from the post service and photos from the CDN; Kafka tells every other service."
- **Ids:** L-0152, L-0195.

---

## §7 The hashtag page: what to store

### Fig 7·a: The hashtag page (D-06 redraw)
- **Section:** 7.1. **Board:** D-06, frame `b_015430.jpg` (also `b_014745.jpg`).
- **Parts (desktop, 640 × 340):** a phone screen (x 120, 160 × 300) with mono `#sunset` at the top, hand `1.2m photos` under it, then a 2 × 3 grid of square tiles (thin outline). A large hand `{` brace along the screen's left edge. Heading hand `hashtag service` with a short arrow to hand `best user experience`.
- **Leader lines (thin graphite) to labels on the right:** `hashtag` (from `#sunset`), `count of photos` (from `1.2m photos`), `top 100 photos` (from the grid).
- **Side notes (right column, hand, small):** `millions of hashtags` · `top 100: from a data-science service (black box)`.
- **Colours:** graphite.
- **Phone:** not needed when drawn at 340 (screen 120 wide, labels at right in 12.5 units; side notes move under the screen).
- **Desc:** "The hashtag page shows the tag, its photo count and a grid of the top 100 photos; the top 100 come from someone else's service."
- **Ids:** L-0211, L-0212.

### RuleBox sketch §7: from the page to the storage (D-06 + D-07)
- **Section:** 7.2. The D-06 phone screen at small size; three thin arrows from `#sunset`, `1.2m photos` and the grid to the three lines of one document card mono `{ tag, total_photos, top_100: [ ] }`.
- **Ids:** L-0215, L-0218, L-0228.

### T4 header sketch: two ways to hold the top 100 (D-07, folded into TradeoffTable T4)
- **Section:** 7.3. **Board:** D-07, frame `b_020530.jpg` (also `b_022000.jpg`).
- Two small document glyphs as the column headers of T4 (the kit's `TH_GLYPHS` style, ≤ 120 units each): column 1 mono `top_100: [post_id1, post_id2, …]`; column 2 mono `top_100: [{id, caption, …}, {…}]`. The board's notes become T4's rows (`less space` / `large space`, `talk to post DB` / `fast`, `latest data` / `consistency`), not hand labels on a figure. The red ✕ cell (T4: "whole posts / what changes when a post changes: every hashtag copy") is the board's pink `consistency`.
- **Ids:** L-0229, L-0233.

---

## §8 Counting hashtags

### Fig 8·a: First sketch: one consumer, batching (D-08 earlier form)
- **Section:** 8.1. **Board:** D-08 first form, frames `b_020800.jpg`, `b_020830.jpg`.
- **Parts (desktop, 720 × 180):** `Actor` `user` — `post svc` box → `kafka` pipe (mono `post_publish`) → one `Worker` mono `consumer` → `hashtag db` cylinder.
- **Arrows:** user → post svc (blue); post svc ⇢ kafka (dashed blue); consumer ⇢ kafka (dashed, `pulls`); consumer → db (solid graphite arc) with hand green `batching` over it.
- **Labels:** under the consumer, mono `1,000 posts → #A: 10 · #B: 10 · #C: 20` (the class's example).
- **Colours:** blue path; green word `batching` (a success marker for the idea that works); graphite otherwise.
- **Phone:** chain turns vertical (5 glyphs, but 720 wide → portrait at 340).
- **Desc:** "Posts go to Kafka; one consumer reads a batch, adds up the hashtags in memory and writes the totals to the database."
- **Ids:** L-0236, L-0237, L-0238.

### Fig 8·b: Three `#sunset` posts, three servers (new; from D-08's relabelled pipe)
- **Section:** 8.2. **Board:** D-08, frame `b_022245.jpg` (pipe `hashtag` → `user_id`); notes "challenge: POST_PUBLISH topic is partitioned by post_id or user_id".
- **Parts (desktop, 760 × 300):** a `Pipe` mono `post_publish` with three partition rules `p0 p1 p2`; under it mono `key: user_id` with a ghost (38%) struck mono `hashtag` beside it. One message square per partition: `p1 #sunset` in p0, `p2 #sunset` in p1, `p3 #sunset` in p2 (three posts from three users). Three `Worker`s mono `counting server 1/2/3`, one per partition, each pulling (dashed). A `hashtag db` cylinder at the right.
- **Arrows:** three thin red arrows, one from each server into the db, each mono `#sunset: count++`.
- **Labels:** hand red `nothing to batch: three single writes`; hand graphite under the pipe `a user's posts land on one partition`.
- **Colours:** red on the three writes; graphite otherwise.
- **Phone:** portrait: the pipe on top (340 wide), the three servers in a column, the three red writes converging on the db at the bottom.
- **Desc:** "The post topic is keyed by user ID, so three #sunset posts from three users sit on three partitions and reach three counting servers, which can only write one at a time."
- **Ids:** L-0240, L-0242, L-0243, L-0244.

### (clip `l09-hashtag-repartition`, §8.3, see `animations.md`)

### Fig 8·c: The adapter (D-11 redraw)
- **Section:** 8.3. **Board:** D-11, frame `b_023400.jpg` (also `b_023345.jpg`); D-09 `b_022445.jpg` for the corrected `Post Svc`.
- **Parts (desktop, 860 × 420), top to bottom:**
  - Row 1: `post svc` box → `Pipe` mono `kafka · post_publish` (mono `key: user_id` under it). Two faint workers above the pipe's right end mono `search`, `notifications`, hand `already depend on this topic: don't re-key it`.
  - Row 2: `Fleet` (3) mono `hashtag extraction`, hand `#consumers = #partitions`. To its right a callout: mono `post_1729:` and three short lines `#sunset`, `#sun`, `#nature`, each with a thin line running right (one event per hashtag).
  - Row 3: `Pipe` mono `POST_HASHTAG` with partition rules, mono `key: hashtag` under it; hand beside it `repartitioning and reindexing`; one tuple square on it mono `<#sunset, post_1729>`.
  - Row 4: `Fleet` (3) mono `counting servers` → three `Cyl` hand `partitioned db`; hand beside the arrow `batch and partially update [per hashtag]`, mono on the arrow `count += n`.
- **Arrows:** post svc ⇢ kafka (dashed blue); extraction ⇢ kafka (dashed, `pulls`); extraction ⇢ POST_HASHTAG (dashed blue, triple line as on the board, hand `n events for n hashtags`); counting ⇢ POST_HASHTAG (dashed, `pulls`); counting → db (solid green, heavy: the batched write).
- **Colours:** blue event path; green batched write; graphite otherwise.
- **Phone:** portrait chain, one row per glyph; the post_1729 callout moves under the extraction box; the search/notifications note becomes a hand line under row 1.
- **Desc:** "The post topic stays keyed by user ID. An extractor reads each post and writes one (hashtag, post) event per hashtag to a second topic keyed by hashtag, so each counting server sees all of its hashtags and writes count += n."
- **Ids:** L-0249, L-0250, L-0251, L-0254, L-0267, L-0269, L-0270.

### RuleBox sketch §8: batch it (new)
- **Section:** 8.4. Left: eight thin arrows into a cylinder whose outline is red, hand `count++ × 8`. Right: one heavy green arrow into a calm cylinder, mono `count += 8`. Hand under both: `one server per hashtag makes the batch whole`.
- **Ids:** L-0252, L-0253, L-0288.

### Fig 8·d: One batch on one counting server (new; D-11 live annotations; StepThrough)
- **Section:** 8.4. **Board:** D-11 live annotations, frame `b_024130.jpg` (`<h1, p1>` above the pipe, `{ h1: int }` beside the servers).
- **Layout (lane figure, 420 wide):** lanes `POST_HASHTAG p0` (an offset strip `0 1 2 3 4 …` with tuple labels) · `counting server` (a hash-map card) · `hashtag db` (rows `#sunset 1,200,000`, `#sun …`). A caret mono `committed` on the strip.
- **Steps:**
  1. The server reads offsets 0–2 (blue squares moving to it): mono `<#sunset, p31>`, `<#sun, p31>`, `<#sunset, p40>`. *"The server pulls a batch. Each message carries a hashtag and a post ID, so it can group them even though one partition holds many hashtags."* (L-0296)
  2. The hash-map card fills: mono `{ #sunset: 2, #sun: 1 }`. *"It keeps a hash map from hashtag to a counter that starts at 0, and adds one per message."* (L-0297)
  3. A hand mark `batch full` on the card. *"When the batch is big enough, it writes."* (L-0297)
  4. server → db (green, heavy) mono `UPDATE … SET total_photos = total_photos + 2 WHERE tag = '#sunset'` (and `+ 1` for `#sun`); the db row ticks. *"One write per hashtag: count += n instead of count++ per post."* (L-0270)
  5. The `committed` caret moves to offset 3 (green). *"Then it commits its position on the topic."* (L-0270)
  6. Replay variant: the caret is back at 0, a red `Cross` on the server between step 4 and step 5; on restart the batch is read again and `#sunset` gets `+ 2` a second time, ringed red; hand `accepted: the page says 1.2m; nobody checks`. *"If it crashes after writing but before committing, the batch is counted twice. The design accepts it."* (L-0255, L-0256)
- **Phone:** 3 lanes at 340; the SQL shortens to mono `total_photos + 2` with the full statement in the step text.
- **Desc:** "A counting server groups a batch of (hashtag, post) messages in a hash map, writes one increment per hashtag, then commits; a crash between the write and the commit replays the batch and over-counts, which the design accepts."
- **Ids:** L-0255, L-0256, L-0270, L-0296, L-0297.

---

## §9 The whole hashtag design

### Fig 9·a: The hashtag service (D-09 redraw)
- **Section:** 9.2. **Board:** D-09, frame `b_022445.jpg` (also `b_022312.jpg`, `b_030145.jpg` for the full page with `Post Svc`).
- **Parts (desktop, 880 × 460), three bands:**
  - **Write band (top):** `post svc` → `kafka` → `Fleet` `hashtag extraction` → `POST_HASHTAG` pipe → `Fleet` `counting servers` → the top cylinder of the `partitioned db` group (right edge).
  - **Popularity band (middle left):** `popularity svc` box → hand `per hashtag popular photos` → `their kafka` pipe → `Worker` `workers` → the same db cylinder. Graphite hand note (the board's pink): `* not high throughput`.
  - **Read band (bottom):** `Actor` `user` ⇄ mono `GET /hashtag/<tag>` ⇄ `cdn` cloud → `Fleet` `hashtag api` ⇄ `partitioned db` (three `Cyl`); `hashtag api` → `cache` cylinder below it.
- **Arrows:** producers ⇢ topics dashed blue; consumers ⇢ topics dashed `pulls` (label once); counting servers → db and workers → db solid graphite; user → cdn blue; cdn → hashtag api graphite (the pull on a miss); hashtag api → db and → cache solid graphite; replies green on the read band only.
- **Labels:** board typo `hastag` written `hashtag`; `Post Svc` (not the printed `Image Service`). Footer, hand, desktop only: `Kafka as a glue · adapter pattern · effective batching and counting · read and write path optimizations` (the board's Key Takeaways; on phone it moves to the caption).
- **Left out here, placed elsewhere:** the `"Dead Letter Queue"` note (→ RuleBox §10 sketch, T7) and the H/LC sketch (→ Fig 10·a).
- **Colours:** blue requests/events; green read replies; graphite otherwise.
- **Phone:** portrait, three stacked bands (write, popularity, read), each a vertical chain at 340; the shared db drawn once at the bottom with three incoming lines.
- **Desc:** "Posts flow through Kafka, an extractor and a hashtag-keyed topic to counting servers; data science's top 100 arrives on its own Kafka; readers fetch one document through a CDN and the hashtag API."
- **Ids:** L-0263, L-0268, L-0271, L-0272, L-0274, L-0275, L-0289.

### Fig 9·b: The two paths (D-10 redraw)
- **Section:** 9.3. **Board:** D-10, frame `b_022818.jpg` (also `b_022842.jpg`, `b_031609.jpg`).
- **Parts (desktop, 820 × 340):** top row: `post svc` → `kafka` → `Fleet` `hashtag wrk` → top `Cyl` of `partitioned db`. Bottom row: `Actor` `user` → mono `GET /hashtag/<tag>` → `hashtag api` → `partitioned db` (three `Cyl`, hand `MySQL, MongoDB, DDB`); `hashtag api` → `cache`.
- **Path labels:** a long graphite hand arrow under the top row labelled `WRITE PATH` (dashed, like the async hand-offs it spans); a long graphite hand arrow under the bottom row labelled `READ PATH` (solid). The board drew both green; here colour stays meaning (green = success), so the two paths are told apart by line style and label, and both carry blue data arrows.
- **Labels:** hand at bottom left: `key value based access: for a key (hashtag), get the value (details)`. Small hand under `hashtag api`: `won't count`; under `hashtag wrk`: `batch and update`.
- **Colours:** blue data arrows on both rows; graphite path labels.
- **Phone:** portrait: write row as a vertical chain on the left, read row on the right, the db group shared at the bottom; the key-value note under it.
- **Desc:** "The write path runs post service → Kafka → workers → database; the read path runs user → hashtag API → database or cache, a key-value lookup."
- **Ids:** L-0274, L-0277, L-0279, L-0280, L-0291, L-0293.

### RuleBox sketch §9: one path at a time (new)
- **Section:** 9.3. Two long arrows: dashed `WRITE` on top, solid `READ` underneath, both graphite; a small magnifier (circle + handle, `Line`s) over one hop of the top arrow, hand `what if this gets a huge load?`.
- **Ids:** L-0277, L-0285.

---

## §10 Running the pipeline

### RuleBox sketch §10: decide what a loss costs (D-09's live DLQ note)
- **Section:** 10.1. **Board:** `"Dead Letter Queue"` on the D-09 page, frame `b_030145.jpg`.
- A fork with three tines from a short arrow labelled mono `kafka down`: `buffer`, `drop`, `fallback queue`; a tiny hand footnote `("dead letter queue" on the board)`. Beside it, a balance scale (two `Line` pans) with hand `cost of a lost message`: the left pan mono `#sunset count`, light; the right pan mono `SOS button`, heavy.
- **Ids:** L-0314, L-0319, L-0320, L-0336.

### Fig 10·a: A stream with H and LC (D-12 redraw; StepThrough)
- **Section:** 10.2. **Board:** D-12, frame `b_030145.jpg` (also `b_032200.jpg`).
- **Layout (420 wide):** a horizontal offset strip of 12 cells (mono `0 … 11`), the board's ellipse kept as a thin outline round it; a time axis is not needed (offsets are the time). Carets: graphite `H` (horizon), green `LC` (last commit). Below the strip: one `Worker` mono `search consumer`; a second ghost worker for step 6.
- **Steps:**
  1. Cells 0–8 fill with message squares (blue as they arrive). *"Messages arrive on a partition, oldest on the left."* (L-0323)
  2. Cells 0–2 fade out (graphite strike), `H` moves to 3, hand `retention: older than 30 days`. *"A deletion policy removes the oldest. The horizon is where the last deletion stopped; nothing before it can be read."* (L-0323, L-0324, L-0325)
  3. The consumer reads 3–5, then `LC` lands on 6 (green). *"The consumer reads a batch and commits: Kafka records how far it got."* (L-0326)
  4. It reads 6–8, then a red `Cross` on the consumer. *"It processes three more and crashes before the next commit."* (L-0327)
  5. Restart at `LC`: cells 6–8 are read again, ringed red, hand `reprocessed`. *"On restart it resumes from the last commit and processes 6–8 again."* (L-0327)
  6. A new ghost consumer appears with two dashed starting arrows: one to `H` (hand `from the horizon: read history`), one to cell 9, the latest (red hand `Kafka's default for a new group: latest; set earliest`). *"A brand-new consumer should start at the horizon. Kafka's default starts it at the latest message, skipping history."* (L-0328)
- **Phone:** the strip shortens to 9 cells at 340 wide (mono offsets 3–11 after step 2); labels move under the strip.
- **Desc:** "Retention trims the oldest messages and moves the horizon; a consumer commits its position, and after a crash it resumes from the last commit and reprocesses what came after; a new consumer chooses horizon or latest."
- **Ids:** L-0323, L-0324, L-0325, L-0326, L-0327, L-0328.

### Fig 10·b: Two orders (new)
- **Section:** 10.4. **Board:** none (Q&A 03:17–03:22).
- **Panels (desktop, two rows of 820 × 120):**
  - **Row a `usual: database first`:** `api` → `db` (solid blue) ⇢ `kafka` (dashed blue, hand `then the event`) → two workers `consumers` (pulling).
  - **Row b `high-volume ingestion: Kafka first`:** many thin blue arrows (hand `every event`) into `api` → `kafka` (hand `first point of entry`) → `Fleet` mono `aggregators` → two `Cyl` mono `analytics stores`. A red dashed branch from `api` to a red-outlined `Cyl` hand red `"might cry"` (the direct write that isn't taken).
- **Labels:** hand right of row b `Google Analytics, YouTube watch time`; hand right of row a `the usual order`.
- **Colours:** blue paths; red for the overloaded direct-write branch.
- **Phone:** rows become two vertical chains side by side at 340, or stacked (2 panels; stacked chosen).
- **Desc:** "Usually the database is written first and an event follows; for massive analytics ingestion the API puts every event on Kafka first and aggregates later, because the database couldn't take the raw write rate."
- **Ids:** L-0354, L-0355, L-0356.

---

## §11 What to keep

### Fig 11·a: One CDN, three jobs (new)
- **Section:** 11. **Board:** none (teaching map option B).
- **Parts (desktop, 640 × 260):** a `cdn` cloud in the centre; three spokes to three small cards:
  - `serve photos` with a `PhotoChip`, mono chips `§2 · §4.4`;
  - `signatures + resizing` with a URL key tag and mono `?w=360`, chips `§5 · §6.2`;
  - `cache the hashtag JSON` with a document card mono `{ tag, total_photos, top_100 }`, chip `§9.2`.
- **Colours:** graphite; chips are links.
- **Phone:** the three cards stack under the cloud (portrait at 340).
- **Desc:** "The same CDN serves photos, enforces signed URLs and resizes images, and caches the hashtag page's JSON."
- **Ids:** L-0038, L-0169, L-0192, L-0272.

---

## Phone layouts (checklist)
Separate portrait layouts (23): Figs 1·a, 2·a, 2·c, 2·d, 3·b, 3·c, 4·a, 4·b, 4·c, 5·a, 5·b, 6·a, 6·b, 6·c, 8·a, 8·b, 8·c, 8·d, 9·a, 9·b, 10·a, 10·b, 11·a. Drawn once at ≤ 360 units (4): Figs 2·b, 3·a, 3·d, 7·a. Run `node scripts/check-figures.mjs <url> --width 360` and `--width 390` on every chapter page.
