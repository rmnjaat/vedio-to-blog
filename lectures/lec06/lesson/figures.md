# Lecture 08 (lec06): figure specs

This file is for the illustrator. Every figure on the page is listed here in reading order. Board redraws name the D-xx diagram from `lectures/lec06/board/diagrams.md` and the clearest frame in `lectures/lec06/board/frames_kept/`. Redraw from the frame, and never embed it: frames carry webcam tiles and participant names. New figures say "new". Each entry lists parts, arrows, labels, marker colours, the step text for step-throughs, the mobile layout and the ledger ids it carries.

Totals: **33 drawn items** = 27 numbered figures (3 of them step-throughs) + 6 rule-box sketches (one per RuleBox, §1–§6). Clip posters are specified in `animations.md`. All 13 board diagrams (D-01..D-13) are redrawn. D-11 and D-12 merge into one figure, and D-13 appears twice (without and with the auxiliary store). None is dropped.

---

## 0. The glyph kit

Use the site kit (`site/src/figures/kit/`, `site/FIGURES.md`) and lecture 1's glyph table unchanged: stick-figure `Actor`, chamfered `Box` for services, `Fleet` for stacked services, `Cyl` for databases, `Cloud` for CDN and S3, `Pipe` for Kafka and queues, `Worker` for consumers, `Arrow`, `Label`, `Num`, `Cross`, `Bubble`. One stroke family (1.7 / 1.1 thin / 3.2 heavy), non-scaling, with a seed per part.

New glyphs this lecture needs. Build them once as kit parts and reuse them:

| Glyph | Drawing | Label |
|---|---|---|
| browser window | rectangle with a thin top bar and three tiny dots, 3 px chamfer | mono `browser` |
| `<img>` tag | mono text in a small rounded pill | mono `<img src=…>` |
| byte strip | a row of 8 small cells, the first 4 shaded `--ink-2`, holding hex | mono `89 50 4E 47 …` |
| picture | small square with a single-stroke mountain-and-sun mark | none |
| photo (board's "small square") | 10 px square, ink stroke | mono id when needed (`7abe`) |
| table | a header row and up to 3 data rows, ruled with `thin` lines; column names mono; a `*` before an indexed column | mono table name under it |
| S3 bucket | `Cloud` with mono `s3` (board draws S3 as a cloud; keep it, distinct from the CDN by label only) | mono `s3` |
| messages icon with badge | paper-plane outline; a circled numeral at top-right | numeral mono |
| set | curly braces around mono members `{C, D}` | hand `set` |
| hat | single-stroke cap/fedora outline, three variants | hand `PM`, `architect`, `engineer` |
| index leaf run | a long thin rectangle divided into cells, with a bracket marking the cells read | hand `read` |

**Arrows.** Solid = synchronous request. Dashed = async (a Kafka hand-off, an invalidation call made by a worker). Heads point only in the initiator's direction. The CDN-to-origin arrow starts at the CDN ("on a miss"). Consumer arrows start at the consumer and point at the pipe ("pulls"). Architecture views use orthogonal routing. Diagonals appear only in time-sequence views.

**Marker colours:** blue = request/data path, green = served / success / ack, red = failure / stale copy / wasted (no-op) work / hard limit, graphite = everything else. The board's yellow, pink, purple and light blue map to graphite. The two exceptions are the board's green `READ Path`/`WRITE Path` labels, which become plain hand labels, and the board's pink `INEFFICIENT`, which becomes red because it marks a cost.

**Speech bubble:** at most one per chapter, and only for that chapter's misconception (§1: the browser, "is it a .jpg? no idea"; §2: the hash column, "derivable, so don't store me?"; §3: the CDN, "why not straight to S3?"; §4: none; §5: the badge, "3 unread? no: 3 people"; §6: none).

**Accessibility:** every SVG gets a `<title>` (the figure title) and a `<desc>` that states the mechanism in one or two sentences. Drafts are given where the mechanism isn't obvious.

**Mobile:** a figure wider than ~360 units or with more than 2 panels gets a separate phone layout at about 340 units (FIGURES.md rule 3). Each entry says how.

**No names:** board text containing a real email or name (`arpit@gmailcom`) is replaced by `ana@example.com`. The URL path `/static/img/arpit.jpg` becomes `/static/img/logo.jpg`. Both are figure-level substitutions; the prose may quote the board example as the class's.

---

## §1 Images are just responses

### Rule-box sketch §1
- `<img src>` pill → a box `handler` → a byte strip with the first cells labelled mono `PNG` → a picture glyph. Under the handler, hand `stored? made just now? doesn't matter`.
- **Ids:** L-0033.

### Fig 1·a: From `<img>` to pixels (new)
- **Layout:** left to right, four stages in one row (stacks to two rows on phone).
- **Parts:** (1) browser window containing mono `<img src="/static/img/logo">` (no extension, on purpose). (2) Blue arrow `GET /static/img/logo` → a `server` box. (3) Return arrow (green) carrying a byte strip `89 50 4E 47 0D 0A 1A 0A …`, with a bracket over the first four cells: hand `header says PNG`. (4) A small `decoder` box labelled mono `png` inside the browser window, then a picture glyph.
- **Labels:** at the `<img>` pill, hand `this is the only reason it expects an image`. **Speech bubble** on the browser: `.jpg? no idea. I read the bytes.`
- **Inset (small, right):** a 4-row signature table in mono: `PNG 89 50 4E 47` · `JPEG FF D8 FF` · `GIF "GIF89a"` · `BMP "BM"`. Footnote, hand: `SVG isn't sniffed: needs Content-Type image/svg+xml`.
- **Colours:** blue GET, green response.
- **desc:** "The img tag makes the browser send a GET. The server returns bytes; the browser reads the first bytes to recognise the format, picks a decoder and paints the picture. The file extension plays no part."
- **Ids:** L-0015, L-0018, L-0019, L-0020, L-0021; additions A-ID-03, A-ID-04.

### Fig 1·b: Two handlers, one idea (D-01 redraw)
- **Board:** D-01, frame `b_001200.jpg` (also `b_001100.jpg`, `b_001245.jpg`).
- **Panel a "static folder":** URL `https://example.com/static/img/logo.jpg` at the top, with `/static` circled (graphite, as on the board's emphasis). Actor → `server` box with a small disk slab below-right. To the right, the folder tree: `site/` → `static/` → `img/` → `logo.jpg`, `avatar.jpg`; `js/`; `css/`. A blue leader runs from the circled `/static` to `static/`. Under it, hand steps: `① reads the URL ② reads the file at that path ③ sends the bytes`.
- **Panel b "your own handler":** the same server box. Its arrow goes to an `s3` cloud instead of the disk. Mono code block beside it: `@app.route('/raw/<path>')` / `def raw_handler(path):` / `  raw_b = S3.read(path, BUCKET)` / `  return raw_b`. Hand steps: `① reads the URL ② reads the file from S3 ③ sends the bytes`. Caption line under the panel, hand: `3–4 lines: a proxy for S3`.
- **Colours:** blue request arrows; green return arrows in both panels.
- **Mobile:** panels stack; the tree goes under the server.
- **Ids:** L-0024, L-0025, L-0026, L-0029, L-0030.

### Fig 1·c: The repo card, made on a miss (new)
- **Layout:** a request route with two returns, like lecture 1's Fig 1·d panel a.
- **Parts:** browser window showing a small social card (title line, 3 stat glyphs). Mono `og:image = https://opengraph.githubassets.com/…/owner/repo` above it. A `cdn` cloud. An origin box `card service`, with a small template inset: a rectangle with slots labelled hand `title`, `icon`, `stars · forks · contributors`. A `github api` box (graphite) to its right, for fetched stats.
- **Arrows:** browser → cdn (blue). Hit: cdn → browser (green, hand `cached copy`). Miss: dashed hand `only on a miss` cdn → card service (blue), card service → github api (graphite, `fetch stats`), and card service → cdn (green, hand `PNG bytes`). At the cdn, mono `TTL ~1 day` (hand note `then the next request misses and re-renders`).
- **Small side note,** hand: `~280 ms to render · ~40% of requests served cached (GitHub, 2021)`.
- **desc:** "The page names an og:image URL. The CDN serves a cached card; on a miss it asks the card service, which fills a template with the repository's current numbers and returns an image that the CDN keeps until its TTL runs out."
- **Ids:** L-0041, L-0043, L-0044, L-0045, L-0046; additions A-ID-08, A-ID-11.
- **Mobile:** vertical stack, browser top, cdn, card service, github api.

---

## §2 Gravatar: the query decides the design

### Rule-box sketch §2
- A mono `users` header with three columns: `id`, `email`, and `hash`. The `hash` column is first struck through (graphite), then rewritten beside it with a `*` and hand `indexed`. A tiny arrow labelled hand `the query needed it`.
- **Ids:** L-0082, L-0085.

### Fig 2·a: Two tables, sample rows (D-04 redraw)
- **Board:** D-04, frame `b_010800.jpg` (also `b_012309.jpg` for the denormalized version used in Fig 2·e).
- **Parts:** table `users` with columns `* id | * email | hash`. The hash column is drawn struck through in this figure, because §2.2 hasn't restored it yet. Sample row `729 | ana@example.com | 0eafd172`. Table `photos`, columns `id | user_id | is_active`, rows `7abe | 729 | true`, `c1d0 | 729 | false`. A thin arrow `photos.user_id → users.id`. Beside `photos`, hand `path? derive it: s3://gravatar-images/729/7abe`.
- **Ids:** L-0067, L-0069, L-0071 (and the derived path from L-0121).
- **Mobile:** tables stack.

### Fig 2·b: Two WHERE clauses (new; static twin of `l06-hash-scan`)
- **Panel a `WHERE HASH(email) = ?`:** a tall `users` table of 10 visible rows plus a fade-out `… 10,000 rows`. Every row has a small red tick and a mono `md5(…)` beside it. A red bracket down the whole side: hand `every row hashed, then compared`.
- **Panel b `WHERE hash = ?`:** a small index tree (3 levels, B-tree outline) on `hash`. A blue path goes from the root to one leaf, then to one row, which gets a green tick. Hand `one lookup`.
- **desc:** "With the hash computed inside the WHERE clause, the database must hash every email to find a match. With a stored, indexed hash column, it walks the index straight to one row."
- **Ids:** L-0080, L-0081, L-0083.
- **Mobile:** panels stack.

### Fig 2·c: Crash between two updates (new StepThrough)
- **Layout:** swim lanes, time running down: `app` · `db: photos (user 729)` · `facebook.com`.
- **Steps:**
  1. `photos` shows `7abe active`, `c1d0 inactive`. *"User 729 wants c1d0 to be the active photo."* (L-0086)
  2. App runs `update photos set is_active = false where user_id = 729 and is_active = true`. Now both are inactive. *"The first update clears the current active photo."* (L-0090, L-0091)
  3. Red ✕ on the app lane: `process crashes`. *"The process crashes before the second update. There's no transaction."* (L-0093)
  4. facebook.com lane: blue `GET gravatar.com/0eafd172` → red `404`. *"Every site rendering this user's photo now gets a 404: no photo is active."* (L-0093)
  5. Redo with `BEGIN … COMMIT` brackets around both updates. The crash now rolls back, and `7abe` stays active (green tick). *"Inside one transaction, a crash undoes the first update. The user keeps the old photo."* (L-0092, L-0093)
- **Colours:** red crash and 404; green tick in step 5.
- **Ids:** L-0086, L-0090, L-0091, L-0092, L-0093.

### Fig 2·d: Somebody else's photo id (new StepThrough)
- **Lanes:** `attacker's app (user 729)` · `db: photos`, showing two users' rows: `729: 7abe active` and `812: 9f00 inactive`.
- **Steps:**
  1. Request "make `9f00` my active photo", where 9f00 belongs to user 812. *"The photo id comes from the front end, so anyone can send any id."* (L-0097)
  2. First update clears user 729's active photo. *"The first update is scoped to the caller and clears their photo."*
  3. Second update `… where id = 9f00` (no user check) marks 812's photo active (red). *"Without `and user_id = ?`, the second update flips another user's photo."* (L-0097)
  4. Fixed query `… where id = ? and user_id = ? and is_active = false`: 0 rows updated, shown as a graphite `0 rows` badge. *"With the ownership check nothing changes on 812's side, but 729 has already lost their active photo."* (L-0132, L-0134)
  5. Check first: `select … where id = ? and user_id = ? for update` → not found → stop (green). *"Check first, then write: no row, no updates."* (L-0135, L-0136, A-GD-07)
- **Ids:** L-0097, L-0132, L-0134, L-0135, L-0136; addition A-GD-07.

### Fig 2·e: The board's queries, final state (D-02 redraw)
- **Board:** D-02, frame `b_013230.jpg` (full page before the strike-through: `b_010112.jpg`, `b_010145.jpg`).
- **Layout:** two columns, as on the board. Left column, "mark active": the two `update photos …` statements in mono, bracketed by hand `Tx` top and bottom, both struck through with one long graphite diagonal each; below them, clean, `update users set active_photo_id = ? where hash = ?` with a green tick. Right column, "read": `select * from photos join users on photos.user_id = users.id where users.hash = ? and photos.is_active = true` struck through lightly; below it `select * from users where hash = ?` with a green tick and hand `no join`.
- **Top strip:** `users (* id, * email, * hash, active_photo_id)`, where `active_photo_id` takes the board's green, rendered as ink with a small hand `new`.
- **Small note, bottom:** hand `possible optimization: denormalize to avoid joins (active_photo_id, or the active S3 key)` (from D-04's `b_012309.jpg`).
- **Ids:** L-0102, L-0111, L-0147.
- **Mobile:** columns stack, read first.

### Fig 2·f: Predicate pushdown (new, inside the MarginNote)
- **Parts:** an evaluation tree drawn bottom-up. Leaves: `users` with filter `hash = ?` (blue) and `photos`. Middle node: `join on user_id`. Top: `filter is_active = true` → `result (1 row)`. Row counts on each edge, mono: `users 1` · `photos 10` · `after join 10` · `after filter 1`.
- **Labels:** hand `filters pushed down to the leaves`, hand `evaluated bottom → top`.
- **Ids:** L-0142, L-0144, L-0145.

---

## §3 Serving Gravatar at every size

### Rule-box sketch §3
- `cdn` cloud → `api` box → small `db` cylinder, circled, with hand `knows which photo is active`. An `s3` cloud hangs off the api with hand `just bytes`.
- **Ids:** L-0140.

### Fig 3·a: Upload with a signed URL (D-03 redraw)
- **Board:** D-03, frame `b_010715.jpg` (also `b_013457.jpg`).
- **Parts:** actor `user` with a photo glyph; `photo upload service` box; `s3` cloud; `api` box; `db` cylinder.
- **Arrows:** ① user → upload service, hand `prepare: random id + signed URL`. ② user → s3 directly (blue, the board's arc), hand `upload with the signed URL`. ③ user → api → db (blue), hand `register the photo`.
- **Key, mono:** `s3://gravatar-images/{user_id}/{random photo id}`.
- **Ids:** L-0117.
- **BackChip caption:** "Lecture 7's upload service, reused unchanged."

### Fig 3·b: Gravatar end to end (D-05 redraw)
- **Board:** D-05, frame `b_011130.jpg` (also `b_011345.jpg`, `b_012230.jpg`).
- **Panel a "serving":** actor `site visitor` (the board's "User 2") → `cdn` cloud labelled mono `gravatar.com` (blue). The `cdn` connects to `api` labelled mono `api.gravatar.com/photo/<hash>`, with a dashed hand note `only on a miss` (blue, head at api). `api` → `db` (`which photo is active?`) and `api` → `s3` (`read bytes`), then green returns api → cdn → visitor. Hand note on the cdn: `caches, TTL 1–2 days`. **Speech bubble** at the cdn: `why not straight to S3?`.
- **Panel b "invalidation":** actor `user` → `api` (blue, `update photo`) → `db`. `api` → kafka `pipe` (dashed, `photo_updated`). A `cdn invalidation` worker pulls from the pipe (arrow from the worker to the pipe). Worker → `cdn` (dashed, mono `purge /h1`). A red ✕ on the cached old photo glyph inside the cloud.
- **desc:** "Visitors hit the CDN at gravatar.com. On a miss the CDN calls the API, which asks the database which photo is active and reads it from S3. When a user changes the photo, the API writes the database and puts an event on Kafka; an invalidation worker tells the CDN to drop its copy."
- **Ids:** L-0119, L-0120, L-0122, L-0124, L-0125, L-0129.
- **Mobile:** panels stack; each panel is vertical.

### Fig 3·c: One original, any width (new)
- **Parts:** two `<img>` pills on the left: mono `gravatar.com/h1?w=32` and `…/h1?w=512`. Both go to the `cdn` (blue). A miss arrow goes to an origin `api` (a fleet glyph, ×n, with hand `many cores`). The origin reads `s3`, which holds one `1024×1024` original. The original passes through a small `resize` box (mono `imagemagick`) and returns two picture glyphs of visibly different sizes, labelled mono `32×32` and `512×512` (green returns).
- **Labels:** at the cdn, hand `cache key includes ?w=`. At the origin, hand `the one extra step: transform`.
- **Ids:** L-0149, L-0151, L-0152.

---

## §4 Tagging: wear the product hat

### Rule-box sketch §4
- A speech bubble `"tag people in photos"` with six thin arrows out to six tiny boxes labelled mono `authz`, `notify`, `ml`, `search`, `feed`, `profile`.
- **Ids:** L-0191 (and L-0179 via the hats in Fig 4·a).

### Fig 4·a: Three hats (new, small)
- **Parts:** three hat glyphs in a row, each over one hand line: `PM: requirements, what nobody thought of` · `architect: extensible tomorrow` · `engineer: optimal at every layer`. One bracket under all three: hand `at the same time`.
- **Ids:** L-0179, L-0180, L-0181, L-0182.

### Fig 4·b: Pixels vs fractions (D-06 redraw)
- **Board:** D-06, frame `b_020100.jpg` (also `b_015900.jpg`).
- **Panel a "stored as pixels":** a 720×720 square photo with corner labels `(0,0)` and `(720,720)`, a stick figure with a round head, and a tap mark at mono `(320, 120)` on the head (green dot). Beside it, the same photo shown at 360×360: the dot is drawn at x=320, y=120 of the small square, off the head near the right edge (red ✕), with hand `same pixels, wrong place`.
- **Panel b "stored as fractions":** the same two sizes. The dot lands on the head in both (green ticks). Mono `location = (320/720, 120/720) = (0.44, 0.17)`.
- **Panel c "a box, not a point":** a dashed bounding box around the head, with two notations in mono: `LTRB (0.38, 0.10, 0.56, 0.31)` and `x,y,w,h (0.38, 0.10, 0.18, 0.21)`. Hand: `pick what the front end likes`.
- **Footer, mono:** `posts_tags(post_id, user_id, location)`.
- **Ids:** L-0212, L-0213, L-0214, L-0215, L-0216.
- **Mobile:** three panels stack. Panel a keeps its two sizes side by side, at 300 units.

### Fig 4·c: One PHOTO_TAG event, many consumers (D-07 redraw)
- **Board:** D-07, frame `b_020130.jpg` (also `b_020245.jpg`).
- **Parts:** `tagging service` box → kafka pipe labelled mono `PHOTO_TAG` (dashed). Six consumer workers below, each pulling (arrow from worker to pipe): `search`, `notification`, `analytics`, `profile / activity`, `feed`, `face detection`. A separate `authz` box beside the tagging service with a solid arrow from the service: hand `allowed to tag? (sync check)`.
- **Label:** hand `key component for extensibility: Kafka`. On the authz box, small hand `per-user rule (an ACL), not a role`.
- **Ids:** L-0218, L-0219; addition A-PTU-06.

---

## §5 The newly unread badge

### Rule-box sketch §5
- Left: a big `messages` cylinder with a long blue arrow and hand `exact, expensive`. Right: a tiny set `{A, B, C}` with a short blue arrow and hand `cheap, you keep it updated`.
- **Ids:** L-0258, L-0259.

### Fig 5·a: Three people, not three messages (D-08 redraw)
- **Board:** D-08, frame `b_020345.jpg`.
- **Parts:** messages icon with badge `3`. To its right, three small conversation rows: `A · 212 unread`, `B · 61 unread`, `C · 27 unread`. A bracket over the three: hand `3 = three people since your last tap`. A second state below: tap (hand pointer), badge gone, rows unchanged and still `unread`. **Speech bubble** on the badge: `3 unread? no: 3 people`.
- **Ids:** L-0226, L-0227, L-0231.

### Fig 5·b: CRUDE (D-09 redraw)
- **Board:** D-09, frame `b_021930.jpg` (also `b_021900.jpg`).
- **Parts:** three tables: `user (id)` · `user_activity (user_id, last_read_at)` · `messages (msg, from, to, ts)`, with `to`, `ts`, `from` marked `*` for the index. A boxed hand `CRUDE` with an arrow up to the tables. The query in mono: `select count(distinct from) from messages where to = ? and ts > last_read_at`, with a red double-underlined hand `INEFFICIENT` beside it.
- **Small note,** hand: `correct every time: these tables are the source of truth`.
- **Ids:** L-0235, L-0240, L-0243, L-0250.

### Fig 5·c: Which index order reads less (new, small)
- **Two index leaf runs**, each a long strip of cells for recipient `B` (other recipients' cells greyed at both ends).
  - `(to, from, ts)`: cells grouped `A A A A … C C …`; the red bracket covers *all* of B's cells, with hand `reads every entry for B`.
  - `(to, ts, from)`: cells ordered by time; a vertical tick `last_read_at`; the bracket covers only the cells after the tick (blue), with hand `stops at last_read_at`.
- **Caption line under both, hand:** `still: one sender × 10,000 messages = 10,000 entries to learn "1"` (red).
- **Ids:** L-0246, L-0247, L-0248; addition A-PTU-09.

### Fig 5·d: One set per user (new layout of D-09's left side)
- **Parts:** mono `B → {C, D}`. Struck-through above it: `newly_unread_count: 3` (from the board). Three event chips enter from the left: `C→B` (adds nothing, already in set, graphite), `E→B` (adds `E`, green). The badge reads `|set| = 3`. A tap icon → set deleted (graphite ✕), badge gone.
- **Labels:** hand `size is O(1)`, hand `tap → delete the set`.
- **Ids:** L-0254, L-0256, L-0257.

### Fig 5·e: Get and clear (D-10 redraw)
- **Board:** D-10, frame `b_022800.jpg`.
- **Parts:** actor → `status api` box → `redis` cylinder. Two arrow pairs between actor and api: `getStatus` (blue) and `clear` (blue). The api → redis arrows are labelled mono `SCARD B` and `DEL B`. Beside redis, hand `k/v store · value is a set`.
- **Ids:** L-0265, L-0266.

### Fig 5·f: Who knows a message wasn't delivered (D-11 + D-12 redraw)
- **Board:** D-11 `b_022942.jpg`; D-12 `b_023142.jpg`.
- **Parts:** two actors, each with a line labelled mono `ws` to a `messaging svc` fleet. Fleet → `partitioned chat db` (three linked cylinders). An `online/offline service` box beside the fleet (thin line, hand `or ask this`). Fleet ↓ (dashed) → kafka pipe mono `ON_MSG_UNSENT`. Under the pipe, an event card in mono: `{ src: "C", dest: "B", msg: "…" }`. Hand note: `becomes the input to our system`.
- **Labels:** at the ws lines, hand `knows if B is connected`. At the pipe, hand `umbrella event: offline, other tab, …`.
- **Ids:** L-0271, L-0273, L-0274, L-0275, L-0276.

### Fig 5·g: Read path, write path (D-13 redraw, without the auxiliary store)
- **Board:** D-13 at `b_023215.jpg` (before the auxiliary store is added).
- **Top row "read path":** actor → `get_status / clean_status` → `status check api` (fleet) → `redis cluster` (three linked cylinders).
- **Bottom row "write path":** `ON_MSG_UNSENT` pipe ← three `status update workers` pull from it → one line up to `redis cluster` (mono `SADD B C`). A thin branch from the pipe down to a box `notification system`.
- **Small hand note** near the workers: `can batch if partitioned by recipient` (board note, partly illegible; drawn as text, not as a claim of the figure).
- **Ids:** L-0278 (and L-0277 for the note).
- **Mobile:** rows stack.

---

## §6 Protect the database: the auxiliary database

### Rule-box sketch §6
- A cylinder `main` under a single-stroke glass dome (the rose-in-a-jar image). A smaller cylinder `aux` beside it catches four arrows that would otherwise have hit the dome. Only one arrow reaches `main`.
- **Ids:** L-0288, L-0290, L-0309.

### Fig 6·a: Where the load goes (new)
- **Parts:** the `redis cluster` in the centre with three incoming lanes:
  - `get_status`: many blue arrows, hand `millions of refreshes · must read: source of truth`.
  - `clear`: a few blue arrows, hand `must delete`.
  - `write path`: 30 arrows from `C→B` events; the first is blue with a green tick (`added C`), and the other 29 are red with hand `no change`.
- **Labels:** hand at the write lane: `29 of 30 writes change nothing`.
- **Ids:** L-0280, L-0282, L-0283, L-0284.

### Fig 6·b: First message vs repeats (new StepThrough)
- **Lanes:** `worker` · `aux redis` · `main redis cluster`.
- **Steps:**
  1. Event `C→B #1`. Worker → aux: mono `SET B_C 1 NX` → `OK` (newly set). *"First message from C: the auxiliary store has no B_C yet, so it records it."* (L-0292, A-PTU-14)
  2. Worker → main: `SADD B C` (green). *"Only then is the main store written: C joins B's set."* (L-0292, L-0293)
  3. Event `C→B #2`. Worker → aux: `SET B_C 1 NX` → `nil` (exists). No arrow to main. *"Second message: the auxiliary store already has B_C, so main isn't touched."* (L-0293, L-0303)
  4. Events #3..#30 collapse into one row: `28 more checks`, all in aux. Main still has one write. *"Thirty messages: one write to aux, one to main, and the rest are existence checks."* (L-0303, L-0304)
  5. B taps the icon: `DEL B` on main and `DEL B_C, B_D` on aux (both green). *"Clearing deletes the entries in both stores. The next message starts over."* (L-0295)
- **Ids:** L-0292, L-0293, L-0295, L-0303, L-0304; addition A-PTU-14.

### Fig 6·c: With the auxiliary Redis (D-13 full redraw)
- **Board:** D-13, frame `b_024045.jpg`.
- **Parts:** as Fig 5·g, plus a cylinder `auxiliary redis` below the workers, which have a line to it, with mono entries `B_C : true`, `B_D : true`. The board also draws a line from `status check api` to the auxiliary store; keep it, labelled hand `clear deletes here too`. Beside the main store, mono `B : {C, D}`.
- **Label:** hand `checks here, writes there`.
- **Ids:** L-0292, L-0302.
- **Mobile:** vertical: read path on top, write path, then the aux store at the bottom.

### Fig 6·d: Which failure hurts (new, two panels)
- **Panel a "main down":** main cluster outlined red, the read path red, the badge glyph shows `?`. Hand: `everything is down`.
- **Panel b "aux down":** aux outlined red with ✕. The worker arrows reroute straight to main, all 30 of them; main stays up (green ring) with hand `back to the old load`.
- **Inset under both, hand:** `aux and main out of sync → badge shows 2 while 300 messages wait; fixed at the next tap`.
- **Ids:** L-0294, L-0305.

---

## §7 What to keep

### Fig 7·a: Four systems, one afternoon (new)
- **Layout:** 2×2 grid of thumbnails, each reusing an earlier figure's glyphs at reduced detail: (1) `<img>` → handler → bytes (§1); (2) `users`/`photos` with `hash*` and `active_photo_id` (§2–3, with the CDN cloud); (3) `PHOTO_TAG` pipe with consumers (§4); (4) `ON_MSG_UNSENT` → workers → aux → main (§5–6). Each tile carries its habit in hand lettering: `it's just bytes` · `write the exact query` · `every question changes the design` · `pre-compute, then protect the DB`. Each tile links to its chapter.
- **Ids:** L-0033, L-0082, L-0191, L-0259, L-0288.
- **Mobile:** single column.
