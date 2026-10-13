# Lecture 06 - Board log

Source video: `vedio/5_6071352042910125289.mp4` (1280x720, 2:55:57). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail, last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states added short-lived states. 14 extra frames were pulled with `board_frames.py extract` where a state changed between kept frames (b_002710, b_004045, b_004230, b_010759, b_010827, b_010943, b_010944, b_011008, b_011801, b_011802, b_020930, b_021300, b_021600, b_022200).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow = headings, key labels and inserted clauses; pink/peach = side notes, warnings and "transformation"/"security" annotations; light blue = sub-headings (`Prepare for upload`, `Upload photo`), the CDN-mapping label and queue inner lines; green = the column added later (`active_photo_id`), index markers and `READ`/`WRITE Path` labels; purple = SQL inside the API flow and `Notification System`. Red strokes and blue dashed loops are temporary emphasis (laser / highlighter) and are noted only as "emphasis at HH:MM:SS".
- Page model: one long scrolling canvas per topic. Several pages were written before class and are revealed by scrolling (marked "pre-written"); others are written live. Many states only re-show earlier content during Q&A.
- Several stretches are browser screen-shares (GitHub, Twitter, Instagram, LinkedIn demos). Only what is on screen that matters to the lesson is recorded; personal feeds, contact lists and message contents are not.
- Participant names/faces in the right-hand column are deliberately not recorded. Frames that only show the meeting gallery are logged as "gallery view, not kept for publication".

---

## S01 - 00:00:00 - Agenda (b_000000.jpg)
Topic: agenda for the lecture.
Text (handwritten page): heading `Agenda`; items `- Designing Gravatar`, `- On-demand Image Optimization`, `- Tagging Photos`, `- Designing Newly Unread Message Indicator`; below: `Building a Notification System` ... `is already put on YouTube`, with a yellow `watch it` and arrow.
Change: first state.

## S02 - 00:00:03 - Title slide (b_000003.jpg)
Topic: course title card (static slide).
Text: `SYSTEM DESIGN` / `MASTERCLASS` / `Social Networks`.
Change: momentary switch to the title slide.

## S03 - 00:00:15-00:05:33 - Agenda re-shown (b_000115.jpg, b_000127.jpg, b_000230.jpg, b_000245.jpg, b_000248.jpg, b_000515.jpg, b_000530.jpg, b_000533.jpg)
Topic: same agenda page, scrolled up and down while the teacher talks about the notification-system video (00:02:52).
Change: no new content. b_000515 / b_000533 show only the `Building a Notification System ... YouTube` line and blank page below.

## S04 - 00:05:45-00:12:18 - How images are served (b_001100.jpg, b_001200.jpg, b_001218.jpg)
Topic: how a web server serves a static image file.
Text:
- Heading (yellow): `How images are served`
- `https://arpitbhayani.me/static/img/arpit.jpg` with a yellow brace under the host and a yellow arrow labelled `request`
- Right column, yellow `Folder structure`, tree: `site/` > `static/` > `img/` > `arpit.jpg`, `logo.jpg`; `js/`; `css/` (added by 00:12:00)
- `Once the request hits the server`
  - `- reads the URL`
  - `- reads the file from the server at the path`
  - `- sends the response`
Diagram (D-01): stick figure (client) to rectangle `Server`, with a small box below-right (disk).
Emphasis (00:12:00): red circle around `/static` in the URL.
Change: new page; tree and list written during 00:05:45-00:12:00. b_001218 is the same state without the red circle.

## S05 - 00:12:15 - img tag (b_001215.jpg)
Topic: the browser renders the bytes it gets back.
Text: `<img src="https://arpitbhayani.me/static/img/arpit.jpg"` (closing quote/bracket cut off), up arrow, `Bytes from the response are rendered as image`.
Change: scrolled down to new lines.

## S06 - 00:12:30-00:13:03 - Serving from S3 instead of local disk (b_001245.jpg, b_001300.jpg, b_001303.jpg)
Topic: same flow, but the handler reads from S3.
Text:
- Second list: `- reads the URL` / `- reads the file from S3` (highlighted) / `- sends the response`
- Code (decorator in yellow): `@app.route('/raw/<path>')` / `def raw_handler(path):` / `raw_b = S3.read(path, BUCKET)` / `return raw_b`
- Right, purple: `< GitHub og:image >`, down arrow, `dynamically gen[erated]` / `image for social sharing` (partly behind the watermark)
Emphasis (00:12:45): red outline and grey highlight on `- reads the file from the server at the path`.
Change: new lines below S04.

## S07 - 00:13:15-00:16:33 - Local raw endpoint (b_001615.jpg, b_001633.jpg)
Topic: calling the handler.
Text: down arrow to `http://localhost:5000/raw/users/arpit.jpg`, brace under `/users/arpit.jpg` labelled `request.path`. A line at the bottom (cloud shape and `...ogimage/...`) is cut off at the page edge [cut off].
Change: new line. b_001633 re-shows it after a camera-tile glitch.

## S08 - 00:16:30-00:18:42 - Demo: GitHub repo link card and og:image (b_001630.jpg, b_001639.jpg, b_001642.jpg, b_001645.jpg, b_001700.jpg, b_001703.jpg, b_001709.jpg, b_001712.jpg, b_001745.jpg, b_001800.jpg, b_001815.jpg, b_001830.jpg, b_001833.jpg, b_001842.jpg)
Topic: screen-share demo (not the board). b_001630 is gallery view, not kept for publication; b_001639 is the desktop while switching share.
On screen: the GitHub page `github.com/dicedb/dice` (stats 10 Contributors, 53 Issues, 2 Discussions, 265 Stars, 74 Forks); a Twitter search for `dicedb` and a tweet whose GitHub link renders as a card ("DiceDB/dice", "An extremely simple Golang-based in-memory KV store to rule them all.", same stats); then "View Page Source" on the GitHub page, find `og:image`: `<meta property="og:image" content="https://opengraph.githubassets.com/c587254eb0b3848afa7ca1edf40892490e9178b3b67b37ef0cd2da99d40a2603/DiceDB/dice"` (also `twitter:image:src` with the same URL).
Change: screen-share, no board content.

## S09 - 00:18:45-00:26:30 - Demo: the generated OG image (b_001900.jpg, b_001930.jpg, b_002015.jpg, b_002200.jpg, b_002600.jpg, b_002615.jpg, b_002618.jpg, b_002630.jpg)
Topic: the og:image URL opened in its own tab: "dice (PNG Image, 1200 x 600 pixels)", the DiceDB/dice card with the repo stats. At 00:20:30-00:22:00 (b_002200) the host `https://opengraph.githubassets.com/` is selected in the address bar (another CDN host). b_002615 is gallery view, not kept for publication; b_002630 is a black frame while switching share.
Change: screen-share, no board content.

## S10 - 00:26:45-00:27:10 - Back to the board (b_002700.jpg, b_002710.jpg)
Topic: re-shows S06/S07 (S3 handler code, localhost URL). Bottom line still cut off.
Change: no new content.

## S11 - 00:27:15-00:28:45 - Gravatar (b_002815.jpg, b_002845.jpg)
Topic: what Gravatar is.
Text:
- Heading (yellow): `Gravatar`
- `What is Gravatar?`
- `Gravatar is your single embedable URL for profile picture` (`embedable` as written)
- `https://gravatar.com/{hash(email)}` (`{hash(email)}` in yellow), pink arrow `→ security PII`
- `if hash("arpit@gmail.com") = 0eafd172`
- (00:28:30) `<img src="https://gravatar.com/0eafd172" />`
Change: new page (pre-written, revealed by scrolling).

## S12 - 00:29:00-00:31:30 - Gravatar requirements (b_003100.jpg, b_003130.jpg)
Text:
- A white square containing a yellow box with a stick-figure portrait, `← Renders the current profile picture`
- `Requirements`
  - `- user can upload multiple pictures`
  - `- user can mark one as active`
  - `- active one should be returned as part of the response`
Change: scrolled to new lines on the same page.

## S13 - 00:31:45-00:36:27 - Brainstorm: tables (b_003215.jpg, b_003300.jpg, b_003545.jpg, b_003615.jpg, b_003627.jpg)
Topic: Gravatar schema, built live.
Text: yellow `Brainstorm:` (new blank page); table `users` (underlined): `id`, `email`, `hash` (struck through by 00:35:45); table `photos`: `id`, `user_id`, `is_active` (by 00:36:00).
Change: new page, written live.

## S14 - 00:36:30-00:37:57 - Query for a user's photos (b_003645.jpg, b_003700.jpg, b_003703.jpg, b_003712.jpg, b_003730.jpg, b_003745.jpg, b_003748.jpg, b_003757.jpg)
Text: `Select * from photos` / `where user_id = ?` (00:36:30), extended by 00:37:15 to `Select * from photos` / `join on users` / `on photos.user_id = users.id` / `where user_id = ?`.
Emphasis (00:37:48): blue dashed loop around `0eafd172` in the img src on the Gravatar page (b_003748).
Change: query added; b_003700, b_003712, b_003748 re-show the Gravatar page.

## S15 - 00:38:00-00:42:30 - Where clause on the hash (b_003815.jpg, b_003900.jpg, b_003909.jpg, b_003912.jpg, b_003930.jpg, b_004045.jpg, b_004230.jpg)
Text: last line erased to `where` (00:38:00), then `where HASH(email) = ?` (00:38:30).
Change: where clause rewritten; extra frames b_004045, b_004230 confirm it is unchanged until at least 00:42:30.

## S16 - 00:42:45-00:45:03 - Stored hash column (b_004415.jpg, b_004430.jpg, b_004445.jpg, b_004454.jpg, b_004457.jpg, b_004500.jpg, b_004503.jpg)
Text: `users` now `* id`, `* email`, `* hash` (hash rewritten, no longer struck; a `*` before each column); query last line `where users.hash = ?`.
Change: hash column restored with `*` markers; where clause changed.

## S17 - 00:45:15 - is_active type (b_004515.jpg)
Text: `photos` column now `is_active : bool`.
Change: type added.

## S18 - 00:45:30-00:47:00 - Mark a photo active (b_004545.jpg, b_004630.jpg, b_004700.jpg)
Text (left): `update photos` / `set is_active = true` / `where id = ?` (the where line first started as `where user_...`).
Change: new query.

## S19 - 00:47:15-00:49:30 - Unset the old active photo (b_004915.jpg, b_004930.jpg)
Text (above S18's query): `update photos` / `set is_active = False` / `where user_id = ?`.
Emphasis (00:49:15): red circle around this update.
Change: new query.

## S20 - 00:49:45-00:50:45 - Only unset the active one (b_005000.jpg, b_005012.jpg, b_005030.jpg, b_005045.jpg)
Text: first update becomes `where user_id = ? and` / `is_active = True`.
Emphasis (00:50:00, 00:50:12): blue dashed loops around the second update and around the select query.
Change: clause added; select query block moved right.

## S21 - 00:51:00-00:53:00 - Transaction (b_005130.jpg, b_005230.jpg, b_005245.jpg, b_005300.jpg)
Text: yellow `Tx` above the first update and yellow `Tx` below the second (transaction begin/end).
Change: markers added.

## S22 - 00:53:15-00:56:45 - Ownership check (b_005500.jpg, b_005615.jpg, b_005630.jpg, b_005642.jpg, b_005645.jpg)
Text: second update's where clause becomes `where id = ?` + yellow ` and user_id = ?`.
Change: clause added.

## S23 - 00:57:00-00:57:48 - Query for the active photo (b_005715.jpg, b_005730.jpg, b_005742.jpg, b_005745.jpg, b_005748.jpg)
Text: below the first select, briefly `Select * from photos` / `where hash = ?` (b_005715); replaced at 00:57:42 by a copy of the join query `Select * from photos` / `join on users` / `on photos.user_id = users.id` / `where users.hash = ?` and a started `and photos.id =` (b_005745), erased to `and photo...` (b_005748).
Change: second query being written; b_005730 shows the page scrolled up.

## S24 - 00:58:00-01:00:57 - Active photo filter (b_005845.jpg, b_005900.jpg, b_010030.jpg, b_010045.jpg, b_010057.jpg)
Text: second select ends `and photos.is_active = True`.
Change: clause added; zoomed views.

## S25 - 01:01:00-01:01:45 - Guard on activation, active_photo_id column (b_010100.jpg, b_010109.jpg, b_010112.jpg, b_010115.jpg, b_010118.jpg, b_010130.jpg, b_010133.jpg, b_010139.jpg, b_010142.jpg, b_010145.jpg)
Text: second update gets `and is_active = false` (01:01:09); `users` gets a 4th column, green `* active_photo_id` (01:01:30).
Emphasis: red circle around users columns (01:01:18); blue dashed loop around `active_photo_id` (01:01:33); blue dashed loop around the whole left `Tx` block (01:01:45).
Change: clause and column added. b_010112 / b_010145 are the clearest full-page views.

## S26 - 01:02:00-01:03:30 - Update users instead (b_010215.jpg, b_010230.jpg, b_010233.jpg, b_010245.jpg, b_010315.jpg, b_010330.jpg)
Text: inside the Tx, a third statement written fast: `update user[s]` (reads `updak user.`) / `set active_photo_id = ~` (value is a squiggle) / `wher[e] ⊗ id = ?` (a blotted character before `id`). Below the selects (01:03:00): `↓` / `Select * fr[om]` / `photos wher[e]` (scrawl, reads `φ crus wh` [illegible]) / `id = ?`.
Emphasis (01:02:33): red circle around `* active_photo_id`.
Change: statement and query added.

## S27 - 01:03:45-01:07:12 - is_active dropped (b_010345.jpg, b_010357.jpg, b_010515.jpg, b_010530.jpg, b_010545.jpg, b_010548.jpg, b_010554.jpg, b_010557.jpg, b_010615.jpg, b_010627.jpg, b_010700.jpg, b_010709.jpg, b_010712.jpg)
Text: `photos` table loses `is_active : bool` (erased by 01:03:45; photos is now `id`, `user_id`); both `update photos` statements struck through with long diagonal lines (by 01:05:15). Only `update users ... active_photo_id` remains between the `Tx` markers.
Change: content removed/struck; then no new content (Q&A).

## S28 - 01:07:15-01:08:03 - API server: uploading a photo (b_010715.jpg, b_010718.jpg, b_010724.jpg, b_010727.jpg, b_010745.jpg, b_010754.jpg, b_010757.jpg, b_010759.jpg, b_010803.jpg)
Topic: pre-written page.
Text:
- Yellow `lets write our API server :` + pink `api.gravatar.com`
- Yellow `Uploading photo`
- Diagram (D-03): see diagrams.md
- Light blue `Prepare for upload :`
  - `- user requests Photo upload service for a new upload`
  - `- photo upload service generates a random id`
  - `- photo upload service generates signed URL for`
  - `S3://gravatar-images/{user_id}/{random photo id}` (braced parts yellow)
  - `- photo upload service sends signed URL to user`
- Light blue `Upload photo`
  - `- user uploads photo to S3`
Change: new page.

## S29 - 01:08:00-01:08:24 - Schema with sample rows (b_010800.jpg, b_010815.jpg, b_010824.jpg)
Topic: pre-written, further down the same page.
Text: top (partly cut): stick figure to rectangle `API` to cylinder `MySQL`. Table `id | user_id | is_active` with row `7abe | 729 | True` (values yellow), label `Schema: photos`; `Schema: users` table `id | email | hash` with row `729 | arpit@gmailcom | 0eafd172` (`gmailcom` as written, no dot).
Change: scrolled to new content.

## S30 - 01:08:27-01:09:44 - Render the active photo (b_010827.jpg, b_010915.jpg, b_010927.jpg, b_010930.jpg, b_010933.jpg, b_010939.jpg, b_010942.jpg, b_010943.jpg, b_010944.jpg)
Text:
- Yellow `Render the active photo`
- `https://api.gravatar.com/photos/{hash}`
- `- get hash from the URL`
- `- get active photo id from the database`
  - purple: `select * from photos join users` / `where` / `users.hash = {hash} and` / `is_active = True`
- `- read the file from S3`
  - `S3://gravatar-images/{user_id}/{photo id}` (braced parts yellow)
- `- return the response`
- `<img src="https://api.gravatar.com/photos/0eafd172" />`, up arrow `Renders Arpit's photo`
Emphasis: red underline under `api.gravatar.com` (01:09:15); red circle on `*` in the select (01:09:30).
Change: scrolled to new content. Between this section and S31 a section showing a multi-row photos table (rows starting `7ab…`, `8al…` with an arrow, `cdo…`, `e72…`) scrolls past without being captured; only its edge is visible in b_011800 and its last row `e1215 | 729 | False` in b_011015.

## S31 - 01:09:45-01:11:15 - Serve it through the CDN (b_011000.jpg, b_011008.jpg, b_011015.jpg, b_011115.jpg)
Text:
- peach `So, we have got everything working at` / `https://api.gravatar.com/photos/{hash}` (red-circled, 01:10:15)
- peach `But we want` / `https://gravatar.com/{hash}`
- yellow `let's use CDN to serve it`
- `Configure  gravatar.com ——→ api.gravatar.com/photos`, with `CDN` written under `gravatar.com`
- `https://gravatar.com/hash ——→ https://api.gravatar.com/photos/hash` (`hash` underlined in yellow)
- `We get, speed and scale of CDN & ease of use for user`
Emphasis (01:10:08): red circle around `gravatar.com` on the Configure line.
Change: scrolled to new content.

## S32 - 01:11:30-01:14:12 - Gravatar architecture (b_011130.jpg, b_011145.jpg, b_011215.jpg, b_011245.jpg, b_011300.jpg, b_011315.jpg, b_011330.jpg, b_011342.jpg, b_011345.jpg, b_011400.jpg, b_011409.jpg, b_011412.jpg)
Diagram (D-05): full architecture, pre-drawn; see diagrams.md.
Emphasis: 01:12:45 red trace user → API → MySQL, API ↓ `update` → queue → circle on `CDN Invalidation`; 01:13:00 red circle on `h1` in the URL and scribble in the CDN cloud; 01:13:15 red trace CDN → pink line → API → MySQL (circled) and S3 purple line (cache-miss path).
Change: new page.

## S33 - 01:14:15-01:22:30 - Q&A, re-shows (b_011430.jpg, b_011515.jpg, b_011530.jpg, b_011533.jpg, b_011745.jpg, b_011800.jpg, b_011801.jpg, b_011802.jpg, b_011803.jpg, b_011815.jpg, b_011830.jpg, b_012015.jpg, b_012030.jpg, b_012033.jpg, b_012100.jpg, b_012130.jpg, b_012145.jpg, b_012215.jpg, b_012224.jpg, b_012227.jpg, b_012230.jpg, b_012300.jpg)
Topic: questions on the transaction, CDN mapping, hashing at runtime, predicate pushdown, CDN invalidation. Alternates between the Brainstorm page (S27 state) and the architecture diagram (S32).
Change: no new content. b_011800 is a mid-scroll frame that partly shows the uncaptured multi-row photos table (see S30).

## S34 - 01:23:09 - Possible optimizations (b_012309.jpg, b_012312.jpg)
Topic: pre-written.
Text: yellow `Possible optimizations` / `- You can denormalize the table to avoid Joins`; `Schema: users` table `id | email | hash | active_photo_id` (last header yellow) with row `729 | arpit@gmailcom | 0eafd172 | cdae`; purple up arrow under `cdae` and `active_S3_key`; then yellow `Questions`.
Change: new content.

## S35 - 01:23:15-01:24:48 - On-demand image optimization (b_012330.jpg, b_012430.jpg, b_012448.jpg)
Text: yellow heading `On-demand Image Optimization`; `Brainstorm`; right, yellow `1024 x 1024` and white `Render : 32x32`; `<img src="https://gravatar.com/h1?w=32" />` with a brace under `?w=32` labelled peach `Transformation`.
Change: new page (pre-written).

## S36 - 01:24:45-01:30:57 - What the CDN does internally (b_012445.jpg, b_012500.jpg, b_012745.jpg, b_012830.jpg, b_013030.jpg, b_013042.jpg, b_013045.jpg, b_013048.jpg, b_013054.jpg, b_013057.jpg)
Text:
- `URL driven image manipulations`
- `https://edge.arpitbhayani.me/img/arpit.jpg ?w=240` (`?w=240` peach), brace → `Query param` / `contains the transformati[on]` [cut off by tiles]
- `CDNs give this feature out of the box` ↓ `This is what CDN does internally`
  - `- reads the URL`
  - `- if it has the file,` / `return`
  - `- if not read the file from origin` (`origin` yellow)
  - `- transform as per the given transformations`
  - `- cache the file locally`
  - `- return the response`
- Right: `Extra transf^n` / `step added`, arrow to a brace beside the transform line
- yellow `CPU intensive!`, pink `Cannot be ASYNC`, white `large servers (size & numbers)`
- `"imagemagik"` [sic: ImageMagick]
Emphasis (01:25:00): red circle on `- reads the URL`.
Change: scrolled to new content; then held through Q&A.

## S37 - 01:31:00-01:34:57 - Q&A: cleaned-up update (b_013100.jpg, b_013103.jpg, b_013230.jpg, b_013245.jpg, b_013315.jpg, b_013330.jpg, b_013445.jpg, b_013454.jpg, b_013457.jpg)
Text: on the Brainstorm page the scrawled third Tx statement is rewritten cleanly: `update users` / `set active_photo_id = ?` / `where hash = ?` (by 01:31:15).
Change: statement rewritten; b_013103 and b_013457 re-show the architecture and upload pages.

## S38 - 01:35:00-01:43:15 - Tag in photos (b_013545.jpg, b_014000.jpg, b_014245.jpg, b_014300.jpg, b_014303.jpg, b_014315.jpg)
Text: yellow `Tag in photos`; `Brainstorm` + pink `[ Think around requirements ]`; `Questions:`.
Change: new page; held through the break (01:35:57-01:40:40).

## S39 - 01:43:30-01:58:30 - Requirement questions (b_014345.jpg, b_014545.jpg, b_014615.jpg, b_014745.jpg, b_015215.jpg, b_015245.jpg, b_015330.jpg, b_015345.jpg, b_015530.jpg, b_015545.jpg, b_015600.jpg, b_015603.jpg, b_015700.jpg, b_015715.jpg, b_015730.jpg, b_015733.jpg, b_015745.jpg, b_015748.jpg, b_015754.jpg, b_015757.jpg, b_015800.jpg, b_015803.jpg, b_015809.jpg, b_015812.jpg, b_015830.jpg)
Text (list under `Questions:`, built one bullet at a time):
- `- who can tag (authorization)` (01:43:30-01:45:45)
- `- max limit of people tag in a photo` (01:46:30)
- `- notification & throttling` (01:48:00-01:52:15)
- `- self-removal` (01:53:00)
- `- Face recognition & suggestion (SLA)` (01:54:00)
- `- profile/activity (DB)` (01:56:15; `(DB)` added 01:57:30)
- `- Feed` (01:58:12)
Diagram (right, 01:48-01:52): `[ . . . . . ]` (an array/document) above a stack of six short horizontal lines (a long list of tags).
Change: bullets added; b_015733 is a moment where `(DB)` is not visible (being rewritten).

## S40 - 01:58:45-02:01:15 - Tag people in photos (b_015900.jpg, b_020015.jpg, b_020045.jpg, b_020054.jpg, b_020057.jpg, b_020100.jpg, b_020115.jpg)
Topic: pre-written page.
Text and diagram (D-06): yellow `Tag people in photos`; image box with `(0,0)` at top-left and `(720,720)` at bottom-right, yellow stick figure inside, pink arrow at the head labelled `(320,120)`; `Relative positioning` / `location = ( 320/720 , 120/720 )`; `Allows us to handle multiple devic[es]` / `on-demand transformations at ea[ch]` [cut off by tiles in most frames; fullest in b_020100]; pink `LTRB / x,y,w,h`; `schema: posts_tags` table header `post_id | user_id | location`; `Services to interact with:` `Search`, `Face detection`, `Location`...
Emphasis (02:00:57): red circles around `LTRB` and `x,y,w,h`.
Change: new page.

## S41 - 02:01:30-02:02:54 - Services and Kafka (b_020130.jpg, b_020142.jpg, b_020245.jpg, b_020254.jpg)
Text: `Services to interact with:` `Search` / `Face detection` / `Location` / `Notification` / `RBAC [Authorized to tag?]`; yellow `Key component for extensibility :` + light blue `Kafka`; pink `PHOTO_TAG event` + `.... many consumers`, yellow `Search, Notification, An[...]` [cut off] / `Profile,`; an L-shaped line into a queue pipe (D-07).
Emphasis (02:01:30): red tick-arrows beside Search, Face detection, Location, Notification.
Change: scrolled to new content.

## S42 - 02:03:00-02:03:45 - Newly unread indicator (b_020345.jpg)
Topic: pre-written page.
Text: yellow `Newly unread indicator`; `Brainstorm`; `We need to inform users about presence of` / `new messages (not unread / unacked).`; paper-plane (send) icon with a pink circled `3`, `← This is what we want to implement`; `User can have 100s of unread messages but the` / `number ③ indicates there are 3 people` / `that you recently (newly) received.`
Change: new page.

## S43 - 02:03:54-02:05:45 - Demo: message badges (b_020354.jpg, b_020400.jpg, b_020412.jpg, b_020415.jpg, b_020418.jpg, b_020427.jpg, b_020430.jpg, b_020445.jpg, b_020448.jpg, b_020454.jpg, b_020457.jpg, b_020500.jpg, b_020509.jpg, b_020512.jpg, b_020515.jpg, b_020530.jpg, b_020539.jpg, b_020542.jpg, b_020545.jpg)
Topic: screen-share. Instagram web: the `Messages` nav item shows a red badge `3`; opening the inbox (the conversation list is not recorded). LinkedIn: the `Messaging` nav item and the messaging page with per-conversation unread counts (contents not recorded). b_020354, b_020539, b_020542 are gallery view, not kept for publication; b_020545 is a black frame while switching share.
Change: screen-share, no board content.

## S44 - 02:05:57-02:07:18 - Requirements (b_020557.jpg, b_020615.jpg, b_020700.jpg, b_020709.jpg, b_020712.jpg, b_020718.jpg)
Text (further down the S42 page): `Requirements:` / `* near-realtime` / `* update upon new messages received` / `from user`; `# new unreads = # different people from` / `which message received` / `and is unread`.
Emphasis: short red stroke by the icon (02:06:15); red loops around both requirement bullets (02:07:12).
Change: scrolled to new content.

## S45 - 02:07:15-02:11:15 - Working page: first tables (b_020715.jpg, b_020724.jpg, b_020727.jpg, b_020930.jpg, b_021115.jpg)
Text: a second, blank copy of the page header: yellow `Newly unread indicator` / `Brainstorm` (02:07:15). Right side, written live: table `lastread` (`user`, `last_read`) and table `msgs` (`msg`, `from`, `to`, `ts.`) (02:09:30); `msgs` renamed `messages` by 02:11:15.
Change: new working page.

## S46 - 02:11:30-02:19:00 - Schema and count query (b_021300.jpg, b_021600.jpg, b_021900.jpg)
Text:
- table `user` (`id`) added at left; `lastread` renamed `user_activity` (`user_id`, `last_read_at`) (by 02:13:00)
- query (02:16:00): `Select count(uniq(from)) from` [cut off] (`count(uniq(from))` yellow) / `wher[e] to = ?` / `& ts > last_read_at` [cut off]
- green dots before `from`, `to`, `ts.`; green `index (t[o…]` [cut off at right edge]; a box `CRUDE` with an arrow up-right toward the tables (by 02:19:00)
Diagram (D-09).
Change: tables extended, query and markers added.

## S47 - 02:19:15-02:19:30 - INEFFICIENT (b_021930.jpg)
Text: pink `INEFFICIENT` (double underline) left of the select.
Change: label added.

## S48 - 02:19:45-02:22:00 - Pre-computed value per user (b_022045.jpg, b_022200.jpg)
Text (far left): `user_id: {` / `count` / `count` / `}` (02:20:45), then `user_id: {` / `newly_unread_count: 3` / `unique_users: set<   >` / `}` with the `3` red-circled (02:22:00).
Change: new block.

## S49 - 02:22:15-02:23:00 - Count struck (b_022300.jpg)
Text: `newly_unread_count: 3` struck through with yellow lines; `user_id:` / `unique_users: set<   >` remain.
Change: line struck.

## S50 - 02:23:15-02:25:15 - Set per user (b_022330.jpg, b_022339.jpg, b_022342.jpg, b_022345.jpg, b_022348.jpg, b_022354.jpg, b_022357.jpg, b_022400.jpg, b_022403.jpg, b_022412.jpg, b_022415.jpg, b_022445.jpg, b_022500.jpg, b_022515.jpg)
Text: rewritten as `user_id: unique_users set<   >` / `↑` / `delete set when user clicks "[icon]" icon` (a small paper-plane drawn inside the quotes; `icon` added by 02:23:45).
Emphasis (02:24:00): red arc over `user_id: unique_users set<   >`.
Change: line rewritten; then held.

## S51 - 02:25:30-02:26:30 - Store choice (b_022630.jpg)
Text (right): `K.value store` / `value is set` / `Redis`.
Change: lines added.

## S52 - 02:26:45-02:29:15 - getStatus / clear (b_022745.jpg, b_022800.jpg, b_022915.jpg)
Diagram (D-10): see diagrams.md; cylinder labelled `Redis` at 02:28:00.
Change: new diagram.

## S53 - 02:29:30-02:31:39 - Input from the messaging service (b_022930.jpg, b_022942.jpg, b_023130.jpg, b_023139.jpg)
Topic: pre-written.
Text: yellow `Websockets` + `know if a user is connected or not, we use thi[s]` / `to find the undelivered messages`; diagram (D-11); `ON_MSG_UNSENT`; `partitioned chat db`; yellow `or ONLINE/` / `OFFLINE service`.
Emphasis (02:31:30): red arrow into the queue, circles around `ON_MSG_UNSENT` and the queue, hook to the consumers.
Change: new page.

## S54 - 02:31:42-02:31:48 - Event shape (b_023142.jpg, b_023145.jpg, b_023148.jpg)
Topic: pre-written, further down.
Text: yellow `ON_MSG_UNSENT` above a queue with three fan-out lines (D-12); `Becomes the input to our system`; `Each event would contain` `{` `src: "A"` / `dest: "B"` / `msg: "____"` `}`; `We want # unread from` / `UNIQUE USERS` / `user_id : {u1, u2, u5}`; `B: {C, D}`; start of `READ Path →` (green) and the pink `Status check` box.
Change: scrolled to new content.

## S55 - 02:32:00-02:49:00 - Read path, write path, auxiliary Redis (b_023200.jpg, b_023215.jpg, b_023218.jpg, b_023230.jpg, b_023700.jpg, b_023715.jpg, b_023718.jpg, b_023745.jpg, b_024015.jpg, b_024030.jpg, b_024045.jpg, b_024200.jpg, b_024300.jpg, b_024315.jpg, b_024327.jpg, b_024430.jpg, b_024500.jpg, b_024615.jpg, b_024630.jpg, b_024645.jpg, b_024715.jpg, b_024745.jpg, b_024900.jpg)
Diagram (D-13): see diagrams.md. Text on the diagram: green `READ Path →`, `get_status` / `clean_status`, pink `Status check API`, `Redis Cluster`, pink `can batch here` / `{ if part = recv id` (reading of the second line uncertain, see doubts), `ON_MSG_UNSENT`, green `WRITE Path →`, light blue `Status update workers` (written `Status updak`), purple `Notification System`, pink `Auxiliary Redis`, `workers will update` / `the users in Redis` / `as it gets the event`, `B_C : True` / `B_D : True`.
Emphasis: 02:32:00-02:32:18 red line along get_status → Redis Cluster; 02:43:00 red arc from Redis Cluster toward the workers; 02:44:30 red arrow curving down into `Auxiliary Redis`; 02:46:45 red loop from Status check API to Redis Cluster and down to Auxiliary Redis.
Change: pre-written diagram revealed (Auxiliary Redis label visible from 02:32:15); then held through the auxiliary-Redis explanation and Q&A. b_024045 is the clearest full view.

## S56 - 02:49:15-02:49:57 - Gravatar page re-shown (b_024945.jpg, b_024957.jpg)
Topic: re-shows S11/S12 (`Gravatar`, `hash(email)`, `security PII`, img tag, profile-picture box, `Requirements`) for the question on why there is no user ID in the URL.
Change: no new content.

## S57 - 02:50:00-02:55:45 - Read/write diagram re-shown (b_025130.jpg, b_025515.jpg, b_025545.jpg)
Topic: closing Q&A over the S55 diagram.
Change: no new content.
