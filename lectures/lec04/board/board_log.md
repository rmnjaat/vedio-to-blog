# Lecture 04 - Board log

Source video: `vedio/5_6071352042910125147.mp4` (1280x694, 3:06:50). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states add short-lived states.

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles or the watermark.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow is used for headings and key labels, pink/salmon for notes, URLs and warnings, light blue for diagram annotations and arrows, green for "points to remember" style headings; green/grey dots mark online/offline. Red scribbles are temporary highlighter emphasis; a pink rounded highlight marks emphasised words.
- The page is one long scrolling canvas, so many "states" are the same page scrolled to a different position. Entries note when a state only re-shows earlier content.
- Participant names/faces in the right-hand column are deliberately not recorded.

---

## S01 - 00:00:00-00:00:45 - Title slide (b_000045.jpg)
Topic: course title card (static slide, not handwriting).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on a magenta brush stroke) / `Foundational topics in` (rest cut off at the bottom).
Change: first state.

## S02 - 00:01:00-00:03:00 - To get the most out of this course (b_000300.jpg)
Topic: course rules (admin).
Text (heading yellow, items white, each preceded by `-`):
- `To get the most out of this course`
- `Participate live`
- `lot of new terms , note them down & read later`
- `Revise regularly`
- `Read the pre-reads` with an arrow to `learn.relog.in` / `beneath the video`
- `Blocking 1:1 is through relog`
- `Implement the core of every system we discuss`
- `Continuous Feedback` (cut off at the bottom of the frame)
Change: new handwritten page (written before the recording started).

## S03 - 00:03:15-00:03:45 (b_000345.jpg)
Same list scrolled up. Next line partly visible at the bottom [cut off]; it is `Share a great article/ video / link on Discord` (see S04). No new content.

## S04 - 00:04:00-00:04:30 (b_000430.jpg)
Scrolled. Full line: `- Share a great article/ video / link on Discord`. Yellow heading `Ensure` begins below.

## S05 - 00:04:45-00:07:45 - Ensure (b_000745.jpg)
Text (heading `Ensure` yellow):
- `You have the calendar invite`
- `You have joined the discord server`
- `You have access to` (cut off at bottom; full line in S06)

## S06 - 00:08:00-00:09:45 (b_000945.jpg)
Scrolled. Last line: `You have access to https:// learn.relog.in` (URL in yellow).

## S07 - 00:10:00-00:11:12 - Flow of each session (b_001100.jpg, b_001112.jpg)
Topic: session flow and extra resources (admin).
Text:
- `Flow: Each session has section at the end of which we take questions. In the interest of time we would take some questions at the end!` (`Flow:` yellow)
- Right column: `* Brainsterming [sic, "Brainstorming"] starts next week`
- `Apart from the things we discuss`
  - `1. Go through my YT videos & consider membership`
  - `2. Other courses can be accessed through` `courses.arpitbhayani.me` (pink) with `* redis internals` to the right
b_001112.jpg (dense pass) is identical.

## S08 - 00:11:15-00:12:30 (b_001230.jpg)
New text: `3. There are a bunch of detailed essays on` `arpitbhayani.me` (pink; `essays` underlined in red). Then `Agenda:` (yellow) begins:
- `Designing online/offline indicator`
- `How to approach System Design`
- `Designing a multi user blogging platform` (cut off at bottom)

## S09 - 00:12:45-00:14:00 - Agenda (b_001400.jpg)
Text (`Agenda:` yellow):
- `Designing online/ offline indicator`
- `How to approach System Design`
- `Designing a multi user blogging platform`
  - `Database`
  - `Caching`

## S10 - 00:14:15-00:15:00 - Online Offline Indicator (b_001500.jpg)
Topic: online/offline indicator brief; approach to system design.
Text:
- Heading (yellow): `Online Offline Indicator`
- Diagram (D-01): a column `user 1`, `user 4` (digit half-hidden under a red scribble here; clear in S15), `user 5`, `user 3`, each followed by a dot: green for user 1 and user 4, grey for user 5 and user 3 (green = online, grey = offline). Red scribble circles around the first three users (emphasis at 00:15:00).
- Pink note: `Note: Since it is day 1, we keep thing simple and do not put a lot of focus on Scaling`; white below: `We have a lot of time to talk about it!`
- `Approaching System Design:` (yellow) begins: a light-blue spiral drawing, `Decide the core & build your system around it`; right: `Core is use-case specific` / `Database, communica` (yellow, cut off by the watermark).
Change: new page section.

## S11 - 00:15:15-00:16:30 - Incremental building (b_001630.jpg)
Text:
- Right column now `Core is use-case specifi` [cut off] / `Database, communicatio` [cut off] (yellow; cut at the page edge).
- `Incremental building` (yellow)
  - `1. start with a Day Zero architechure` [sic, "architecture"]
  - `2. See how each component would behave` / `↳ under load` / `↳ at scale`
  - `3. identify the bottleneck`
  - `4. re-architect`
  - A yellow curved arrow rises from below item 4 back to item 2 (loop).

## S12 - 00:16:45-00:18:45 - Incremental building, repeat (b_001745.jpg, b_001800.jpg, b_001830.jpg, b_001839.jpg, b_001845.jpg)
New text: `5. repeat`; the yellow loop arrow now runs from `5. repeat` back up to item 2 (D-02).
b_001800.jpg and b_001845.jpg are scrolled up to show `Approaching System Design:` together with the list; b_001830.jpg and b_001839.jpg show the list alone. No other new content.

## S13 - 00:19:00-00:22:15 - Points to remember / Storage (b_002215.jpg)
Topic: core property and access pattern of the online/offline indicator.
Text:
- `Points to remember:` (green)
  - `Understand the core property & access pattern`
  - `Affinity towards a tech comes second`
  - `Build an intuition towards building systms` [sic, "systems"] (`intuition` in a pink rounded highlight)
- `Storage:` (yellow) `user → online/ offline`; light-blue arrows down from `user` to `int` and from `online/offline` to `bool` (D-03, first form).
- Right: a yellow cylinder (database) with `[not yet decided]` below, and in pink `We still have not picke` [cut off] / `which DB to use` (partly cut off at the bottom).
- Bottom edge: `Access : Key Value` (pink/purple, cut off at the bottom).
Change: new page section.
## S14 - 00:22:30 - Interfacing API (b_002230.jpg)
Topic: the get-status API.
Text:
- Full lines now visible: `Access : Key Value` (purple); right: `We still have not picked which DB to use` (pink).
- `Interfacing API` (yellow)
- Diagram (D-04): stick figure `User` (a small pink rectangle above the user = device) ⟷ rectangle `API Server` ⟷ cylinder `Database`; both arrows double-headed.
- `GET /status/users ? ids = u1 , u2 , u3 , u4`, with a light-blue curly brace under the ids; the label under the brace is cut off at the bottom (full in S17).

## S15 - 00:22:45-00:22:57 (b_002245.jpg, b_002254.jpg, b_002257.jpg)
Scrolled back to the top of the page (b_002245.jpg, b_002254.jpg: `Online Offline Indicator` section; b_002257.jpg: `Points to remember` / `Storage`). With the red scribbles gone, the second user in D-01 clearly reads `user 4`: the list is `user 1` (green), `user 4` (green), `user 5` (grey), `user 3` (grey). No new content.

## S16 - 00:23:00-00:23:45 (b_002345.jpg)
Scrolled to `Storage` / `Access : Key Value` / `Interfacing API` (D-04). No new content.

## S17 - 00:24:00-00:24:15 (b_002415.jpg)
New text under the brace (light blue): `user ids for whom status need to be fixed` (reads `fixed`; the audio context is fetching statuses, so probably meant "fetched"; written word is `fixed`).

## S18 - 00:24:30-00:24:45 (b_002445.jpg)
Scrolled back to `Online Offline Indicator` (D-01). No new content.

## S19 - 00:25:00-00:25:45 (b_002545.jpg)
Same as S17 (Interfacing API). No new content.

## S20 - 00:26:00-00:26:15 - Updating the database (b_002615.jpg)
Topic: push-based status updates.
Text:
- `Updating the database` (yellow)
- Diagram (D-05): three stick figures stacked on the left, each joined by a double-headed arrow to one rectangle `API`; `API` ⟷ cylinder `DB` (double-headed arrow). A yellow dotted line runs from the top user over the `API` box to the `DB` (path of the update).
- `Push based model :` (pink) `Users push their status periodically` (white)
- Pink: `Our API servers cannot "pull" from client because we cannot proactively talk to client`; light blue: `* unless there is a persistent connection` (last letters cut off at the page edge).
Change: new page section.

## S21 - 00:26:30 - Heartbeat (b_002630.jpg)
New text:
- `Every user periodically sends "heartbeat" to the service` (yellow)
- `POST /heartbeat → the authenticated user will be marked as "alive"` (`POST` pink; the word reads `authenticaked` because of the teacher's "t" shape; meaning "authenticated")

## S22 - 00:26:45-00:27:30 (b_002730.jpg)
Scrolled up to D-05. Emphasis at 00:27:30: red scribble ovals around the three users and a red dot on the top user's dotted path. No new content.

## S23 - 00:27:45-00:29:54 - Periodic pulse; when is a user offline (b_002945.jpg, b_002954.jpg)
New text and diagram:
- Diagram (D-06): stick figure on the left, a row of five dots, then rectangle `API`; a white arrow points up at the middle dot, labelled `periodic pulse`.
- `So, when is a user offline ?` (yellow)
- `When we did not receive "heartbeat" for long enough` (pink), with `Subjective!` (pink, above right) and a white arrow from it down to `long enough`.
b_002954.jpg (dense pass) is identical.

## S24 - 00:30:00-00:30:15 (b_003015.jpg)
Scrolled down: heartbeat lines, D-06 and the offline question together. No new content.

## S25 - 00:30:30-00:30:57 - Offline via business logic; pulse table (b_003045.jpg, b_003057.jpg)
Topic: storing the last heartbeat time.
Text:
- `Offline : When we do not recieve [sic, "receive"] heartbeat long enough` (`Offline :` yellow); white arrow down from `long enough` to `say 30 seconds`; hooked arrow from `Offline` to `Handling through business logic`.
- `In database store "time you received the last heartbeat"`
- Table (D-07) titled `pulse` (pink): columns `user_id` | `last_hb`; rows `u1` `1000`, `u2` `1050`, `u3` `1060` (pink table lines).
- Right of the table: `when you receive the heartbeat` (white), then in yellow `UPDATE pulse` / `SET last_hb = NOW()` / `WHERE user_id = u1`; pink note `epoch seconds` (first letter oddly shaped) with an arrow to `NOW()`.
- Bottom edge: `* User sends heartbeat every 10 seconds` (cut off; full in S26).
b_003057.jpg (dense pass) is identical.

## S26 - 00:31:00-00:32:00 - Get Status API (b_003200.jpg)
Text:
- `* User sends heartbeat every 10 seconds`
- `Get Status API` (yellow)
- `GET /status/<user_id>`
  - `if no entry in the database for user → offline` (`offline` yellow)
  - `if entry and entry.last_hb < NOW() - 30sec → offline` (`offline` yellow, cut off at the page edge)
- Emphasis at 00:32:00: a short red stroke beside `1000` in the pulse table.

## S27 - 00:32:15 (b_003215.jpg)
Scrolled back to `Interfacing API` (D-04, S17). No new content.
## S28 - 00:32:18-00:32:57 - Get Status API, online (b_003218.jpg, b_003230.jpg, b_003245.jpg, b_003254.jpg, b_003257.jpg)
New text: `Online` (yellow) under the two `offline` rules of `GET /status/<user_id>` (the fall-through case). The second rule now reads in full `if entry and entry.last_hb < Now() - 30sec → offline`.
b_003218.jpg shows the pulse table and the rules before `Online` was added; b_003254.jpg and b_003257.jpg are scrolled up to the pulse table / UPDATE statement. No other new content.

## S29 - 00:33:00-00:33:30 (b_003330.jpg)
Same as S28 (Get Status API with `Online`). No new content.

## S30 - 00:33:45-00:34:00 - Let's estimate the scale (b_003400.jpg)
Topic: storage estimate.
Text:
- `Let's estimate the scale` (yellow)
- `100 users → 100 entries` / `1000 users → 1000 entries` / `1m users → 1m entries` / `1B users → 1B entries`
- Right: `Each entry has 2 colum` [cut off, "columns"] / `user_id , last_hb`, arrows down to `int (4B)` and `int (4B)` / `Size of each entry = 8B`
- `Total storage required for` / `1B entries = 8 GB`
- `Can we do better on storage ?` (yellow)
- `Requirement : user 1` (grey dot), next lines cut off at the bottom, with a brace and `all we care is` (see S33).
Change: new page section.

## S31 - 00:34:15-00:34:30 (b_003430.jpg)
Scrolled back to `Offline :` / pulse table / UPDATE statement (S25). No new content.

## S32 - 00:34:45-00:35:12 (b_003500.jpg, b_003512.jpg)
Same as S30, scrolled. Emphasis at 00:35:12: short red tick strokes on the `100 entries` / `1000 users` / `1000 entries` lines.

## S33 - 00:35:15-00:38:30 - Can we do better on storage (b_003515.jpg, b_003527.jpg, b_003615.jpg, b_003630.jpg, b_003700.jpg, b_003715.jpg, b_003718.jpg, b_003830.jpg)
Text (D-08): `Requirement :` with a column `user 1` (grey dot), `user 2` (green dot), `user 3` (green dot); a white curly brace to the right of the dots with `all we care is online/ offline`.
The frames are the same page at different scroll positions (b_003715.jpg shows the requirement block alone, empty page below). No new content after 00:35:15.
## S34 - 00:38:45-00:39:15 (b_003915.jpg)
Same as S33 (storage estimate and requirement block). No new content.

## S35 - 00:39:30 - What if absence == offline (b_003930.jpg)
Topic: deleting entries of inactive users.
Text:
- `what if absence == offline ?` (yellow)
- `Idea: if user not present in the DB, we return offline.`
- `So, let's expire the entries after 30 seconds` (pink), arrow down to `delete` (white)
- `if we delete entries → we save a bunch of space by not storing data of inactive users` (`not` in a pink rounded highlight)
- `Total entries = Active users` (light blue)
- Bottom edge: `if 1B total users and 100k active then total entries = 100k` (cut off; full in S38)
Change: new page section.

## S36 - 00:39:45 (b_003945.jpg)
Scrolled back to `Offline :` / pulse table (S25). No new content.

## S37 - 00:40:00-00:40:57 (b_004045.jpg, b_004057.jpg)
Same as S35. No new content.

## S38 - 00:41:00-00:41:12 - How to auto delete (b_004100.jpg, b_004112.jpg)
Text:
- `Total entries = Active users` (light blue)
- `if 1B total users and 100k active then total entries = 100k` / `total size = 800KB` (`800` double-underlined)
- `How to auto delete ?` (yellow)
- `Approach 1: Write a CRON job that deletes expired entries`
  - `- Not a robust solution`
  - `- we need to handle edge case in the business logic`
- `Approach 2: Can we not offload this to our datastore ?`
b_004112.jpg (dense pass) is identical.

## S39 - 00:41:15-00:41:33 (b_004115.jpg, b_004130.jpg, b_004133.jpg)
Scrolling: b_004115.jpg and b_004133.jpg re-show `Offline :` / pulse table (S25); b_004130.jpg shows the delete / `Total entries` / approaches block (S38). No new content.

## S40 - 00:41:45-00:43:45 (b_004345.jpg)
Scrolled to `How to auto delete ?` and both approaches (S38). No new content.

## S41 - 00:44:00-00:44:30 - Never re-invent the wheel (b_004430.jpg)
Topic: DB with key-value + expiration.
Text:
- Pink-outlined box: `Never re-invent the wheel !`
- `DB with KV + expiration` (yellow) with two arrows to `Redis` and `DynamoDB` (yellow)
- `Upon receiving an heartbead` [sic, "heartbeat"]
  - `- update entry in Redis/ DynamoDB with ttl = 30 sec`
- Right (pink): `Every heartbeat move the expiration time forward !` (`move` cut at the page edge)
- `Which one would you pick & why ?` (yellow); `* Cost Estimation` (pink)
Change: new page section.
## S42 - 00:44:45-00:46:09 - Redis vs DynamoDB table (b_004530.jpg, b_004600.jpg, b_004609.jpg)
New: the slip in S41 is fixed, the line now reads `Upon receiving an heartbeat`. Below `Which one would you pick & why ?` a two-column table (D-09) is started: pink header `Redis` | `DynamoDB`, pink horizontal rule under the headers and a long pink vertical divider; body still empty.
b_004600.jpg and b_004609.jpg are scrolled up to show `Never re-invent the wheel !` through the table header. No other new content.

## S43 - 00:46:15-00:46:30 (b_004615.jpg, b_004630.jpg)
Scrolled to the empty Redis | DynamoDB table. No new content.

## S44 - 00:46:45 (b_004645.jpg)
New in D-09: under the `DynamoDB` column a white tick `✓` followed by a long horizontal line running to the right (label not yet written).

## S45 - 00:46:57 (b_004657.jpg)
New: the line ends in the label `persistence` (written `persistnce` [sic, "persistence"]; the "e" after "t" is missing in the handwriting).

## S46 - 00:47:00-00:47:42 (b_004730.jpg, b_004742.jpg)
New row: DynamoDB `✓` ——— `managed`.

## S47 - 00:47:45-00:48:15 (b_004815.jpg)
New: `managed (*` begun, the parenthesis open (completed in S48).

## S48 - 00:48:30-00:56:39 - Redis vs DynamoDB, vendor lock-in (b_005015.jpg, b_005045.jpg, b_005054.jpg, b_005200.jpg, b_005430.jpg, b_005530.jpg, b_005630.jpg, b_005639.jpg)
Text (D-09 rows so far):
- DynamoDB `✓` ——— `persistnce` [sic, "persistence"]
- DynamoDB `✓` ——— `managed (* team size)`, with `& experte` below it (cramped; reads as "& expertise")
- Redis `✓` (left of the divider) ——— a line across both columns to `vender lockin` [sic, "vendor lock-in"] `(cost/ issue/` (parenthesis left open; `issue` written `isue`-like)
The table is unchanged from 00:50:15 to 00:56:39; the frames differ only in scroll position. No new content after 00:50:15.
## S49 - ~00:58:30 - Future extensibility (b_005830.jpg, extra frame)
New row in D-09: Redis `✓` ——— `future extensibility` (scrawled; letters after "exten" run together, reads as "future extensibility"; the audio at 00:57:39 says "future extensibility").

## S50 - ~01:00:30-01:03:24 - Time sensitivity (b_010030.jpg extra frame, b_010200.jpg, b_010315.jpg, b_010324.jpg)
New row in D-09: Redis `✓` ——— `time sensitivity` (written `time sensitivity` with the last letters cramped).
Final table (D-09): DynamoDB ✓ `persistnce`; DynamoDB ✓ `managed (* team size)` / `& experte`; Redis ✓ `vender lockin (cost/ issue/`; Redis ✓ `future extensibility`; Redis ✓ `time sensitivity`. No new content after ~01:00:30.

## S51 - 01:03:30-01:04:00 - How is our DB doing (b_010400.jpg)
Topic: heartbeat load on the DB.
Text:
- Light blue: `Note: In real world, WebSockets are used in such systems, but this is Day 1, hence we keep things simple.`
- `How is our DB doing ?` (yellow)
  - `Heartbeat is sent every 10 seconds`
  - `So, one user in 1 minute sends 6 heartbeats` (last letters read `heartbeaks`, the teacher's "t")
  - `If there are 1m active users, our system will get 6m req/min` (`6m req` double-underlined)
  - `Each heartbeat request results in 1 DB call`
- Bottom edge: `Our DB needs to handle` (cut off; see S52)
Change: new page section.

## S52 - 01:04:15-01:04:45 (b_010445.jpg)
New:
- Diagram (D-10): two stick figures on the left, each with a line to a slightly trapezoidal rectangle `API`; a line from `API` to a cylinder (DB).
- Right: `Our DB needs to handle 6m updates per minute !!`
- `How to make it better ?`

## S53 - 01:05:00-01:05:30 - Connection pool (b_010530.jpg)
Topic: connection pooling.
Text:
- `What's hectic ? creating a new connection everytime`
- `Connection Pool` (pink) —— diagram (D-11): rectangle `Server` (with a second outline behind it, i.e. stacked servers) and four parallel lines (pink, white, yellow, white) running to a cylinder `DB`; an arrow from below points up at the lines, labelled `pre-established connections` (pink).
## S54 - 01:05:45-01:16:15 (b_010845.jpg, b_010900.jpg, b_011615.jpg)
Same page as S52-S53 (DB load, D-10, connection pool D-11). The number and colours of the parallel connection lines between `Server` and `DB` vary between frames (four lines at 01:05:30; three at 01:08:45 and 01:16:15), so the teacher redrew some of them while explaining; no new text. Board unchanged from 01:09:15 to 01:16:15 while the minimum/maximum pool-size discussion ran in audio.

## S55 - 01:16:30-01:16:54 (b_011630.jpg, b_011633.jpg, b_011639.jpg, b_011642.jpg, b_011645.jpg, b_011648.jpg, b_011654.jpg)
Fast scrolling back through the page: b_011630.jpg (auto-delete approaches, S38), b_011633.jpg (connection pool, S53), b_011639.jpg (storage requirement, S33), b_011642.jpg and b_011648.jpg (`Offline :` / pulse table, S25), b_011645.jpg (a sideways page-swipe transition showing two pages split), b_011654.jpg (`what if absence == offline ?`, S35).
Emphasis at 01:16:42: a red oval around the `UPDATE pulse / SET last_hb = NOW() / WHERE user_id = u1` statement (the per-heartbeat DB write). No new content.

## S56 - 01:17:00-01:17:30 (b_011730.jpg)
Back at the connection pool section (S53). No new content.

## S57 - 01:17:45-01:18:54 - Similar systems (b_011845.jpg, b_011854.jpg)
Text:
- `Similar Systems :` (yellow)
- `- Failure detection in a distributed system` (pink)
Change: new page section.
## S58 - 01:19:00-01:22:00 (b_012200.jpg)
Back at the connection pool section (S53). No new content.

## S59 - 01:22:15-01:22:30 (b_012230.jpg)
Emphasis at 01:22:30: the top (pink) connection line is traced over in red with a red looping arrow above it (one connection being re-used). No new content.

## S60 - 01:22:45-01:23:00 (b_012300.jpg)
Red emphasis gone; same as S53. No new content.

## S61 - 01:23:15-01:24:30 (b_012430.jpg)
Emphasis at 01:24:30: a red scribble oval where the connection lines meet the `DB` cylinder (connections terminating at the DB). No new content.

## S62 - 01:24:45-01:26:00 - Micro reads/updates (b_012600.jpg)
New text (green), under `Our DB needs to handle 6m updates per minute !!`: `micro reads/ updates` (first word reads `miuro`; meaning "micro"), arrow down to `Hence n/w bottleneck`.
## S63 - 01:26:15-01:33:54 (b_012700.jpg, b_012830.jpg, b_012900.jpg, b_012945.jpg, b_013045.jpg, b_013115.jpg, b_013345.jpg, b_013354.jpg)
Same page as S62 (DB load, D-10, `micro reads/ updates → Hence n/w bottleneck`, connection pool D-11) during the Q&A on DB connection limits, scaling resources and festival traffic. Frames differ only in the participant column. No new content.

## S64 - 01:34:00-01:39:45 - Break; Foundation Topics in System Design (b_013415.jpg, b_013430.jpg, b_013945.jpg)
Topic: second half - six core components; multi-user blogging platform (break in audio 01:33:52-01:39:55; the board shows this page throughout; b_013945.jpg has no participant column).
Text:
- Heading (yellow): `Foundation Topics in System Design`
- Six topics (pink), two rows: `Database` `Scaling` `Concurrency` (written `Concurrency` with cramped letters) / `Caching` `Delegation` `Communication`
- `Any and every decision would affect one of these 6 facters` [sic, "factors"]
- `We design a Multi-user blogging platform (Medium.com)` (yellow)
  - `- one user multiple blogs`
  - `- multiple users`
- Yellow-outlined box: `We take a look at key design decisions`
- `Database` (yellow); below, `users` and `blogs` (pink, cut off at the bottom; see S66)
Change: new page (pre-written).

## S65 - 01:40:00-01:40:57 (b_014045.jpg, b_014057.jpg)
Same as S64. No new content.
## S66 - 01:41:00-01:41:30 - Database: users and blogs; soft delete (b_014130.jpg)
Topic: schema of the blogging platform; soft delete.
Text (D-12, two column lists with pink underlines):
- `users` (pink): `- id` / `- name` / `- bio`
- `blogs` (pink), two columns: `- id` / `- author_id` / `- title` and `- is_deleted` / `- published_at` / `- body`
- `Importance of is_deleted [soft delete]` (`Importance of is_deleted` pink, `[soft delete]` yellow)
- `when user invokes delete blog , instead of DELETE we UPDATE` (cut off at the page edge here)
Change: scrolled down the pre-written page.

## S67 - 01:41:45-01:43:00 - Soft delete reasons (b_014300.jpg)
New text:
- `Key reasons: Recoverability, Archival, Audit` (reasons light blue; `Recoverability` written with a doubled "l"-like stroke)
- `+ Eazy [sic, "Easy"] on the database engine [No tree re-balancing]`

## S68 - 01:43:15-01:48:12 (b_014745.jpg, b_014800.jpg, b_014812.jpg)
Same page (S66-S67) at different zoom/scroll; b_014800.jpg and b_014812.jpg show the full line `when user invokes delete blog , instead of DELETE we UPDATE`. No new content.

## S69 - 01:48:15-01:52:15 - Column type: body vs bio (b_015215.jpg)
Topic: long text vs short text columns; storing datetime.
Text:
- `Coulumn [sic, "Column"] Type: body v/s bio` (pink)
- Diagram (D-13), two rows of cells side by side:
  - Left, `long text`: a row of five cells; one cell has a line down to a small document icon; labels `large text` (yellow) and `stored as a reference`; below `LONGTEXT` (pink)
  - Right, `short text`: a row of five cells with the middle cell holding horizontal text lines (data inline); labels `short text` (yellow) and `stored along with other columns`; below `VARCHAR` (pink)
- `Storing datetime in DB` (pink)
- `datetime as datetime` with an arrow up from below; right: `02-04-2022 T 09:01:36 Z` with an arrow up from below (cut off; see S71)
Change: scrolled to the next pre-written section.

## S70 - 01:52:30-01:52:42 (b_015230.jpg, b_015233.jpg, b_015239.jpg, b_015242.jpg)
Quick scrolling between the users/blogs lists (b_015230.jpg, b_015239.jpg, b_015242.jpg; S66-S67) and the datetime section (b_015233.jpg; see S71). Emphasis at 01:52:39: a red oval around `- published_at` in the blogs list (b_015239.jpg); gone by 01:52:42. No new content.

## S71 - 01:52:45 - Storing datetime (b_015245.jpg)
Text (first seen in full at 01:52:33, b_015233.jpg):
- `datetime as datetime` → up-arrow from `conventient` [sic, "convenient"] / `sub-optimal` / `heavy on size and index` (yellow); right: `02-04-2022 T 09:01:36 Z` ← up-arrow from `serialized in some format` (the "o" in format is open, reads `fermat`)
- `datetime as epoch integer`; right: `seconds since 1st Jan 19` [cut off, "1970"] and `172562347162` below; yellow `efficient` / `optimal , light weight` with an up-arrow
- Bottom: `datetime as custom format YYYYMMDD - 20220402` (cut off at the bottom; see S72)
## S72 - 01:53:00-01:57:45 - Storing datetime, full (b_015645.jpg, b_015700.jpg, b_015703.jpg, b_015730.jpg, b_015745.jpg)
Full text of the datetime section (D-14 is the three-option comparison):
- `datetime as datetime` / `02-04-2022 T 09:01:36 Z`; `conventient` [sic] / `sub-optimal` / `heavy on size and index` (yellow); `serialized in some format`
- `datetime as epoch integer` / `seconds since 1st Jan 1970` / `172562347162`; `efficient` / `optimal , light weight` (yellow)
- `datetime as custom format (int)` / `YYYYMMDD - 20220402`
Frames differ only in scroll position. No new content.

## S73 - 01:57:48 (b_015748.jpg)
Emphasis at 01:57:48: a red oval around the epoch value `172562347162`. No new content.

## S74 - 01:58:00 (b_015800.jpg)
Emphasis at 01:58:00: a red dotted underline under `02-04-2022 T 09:01:36 Z` (the serialized string). No new content.

## S75 - 01:58:15-02:02:45 (b_020000.jpg, b_020015.jpg, b_020030.jpg, b_020200.jpg, b_020245.jpg)
Same datetime section (S72), scrolled / zoomed; b_020245.jpg is a zoomed-out view showing `seconds since 1st Jan 1970` in full. No new content.
## S76 - 02:02:57-02:06:18 (b_020257.jpg, b_020300.jpg, b_020400.jpg, b_020415.jpg, b_020445.jpg, b_020515.jpg, b_020530.jpg, b_020600.jpg, b_020615.jpg, b_020618.jpg)
Zoomed-out view of `LONGTEXT` / `VARCHAR` and the datetime section (S72) during the date-time Q&A. Frames differ only in the participant column. No new content.

## S77 - 02:06:30-02:08:42 (b_020830.jpg, b_020842.jpg)
Zoomed-out view of the users/blogs lists and soft delete section (S66-S67) during the soft-delete / tree-rebalancing question. No new content.
## S78 - 02:08:45 (b_020845.jpg)
Back to the zoomed-out datetime section (S76). No new content.

## S79 - 02:09:00-02:11:48 - MySQL (b_021130.jpg, b_021148.jpg)
New text (green), above the right column of the datetime section: `MySQL` (the "S" is formed like a "Q", so it reads `MyQQL`; the audio at 02:10:15-02:10:48 recommends reading MySQL's datetime documentation). Written between 02:09:00 and 02:11:30.

## S80 - 02:11:45 - Caching (b_021145.jpg)
Topic: caching for the blogging platform (zoomed-out view of a new pre-written page).
Text:
- `Caching` (yellow)
- `- Reduces response times by saving ^ heavy computation`, with `any` inserted above the caret in a grey rounded highlight (reads "saving any heavy computation")
- `* Cache are not only RAM based`
- `Typical use: reduce disk I/O or network I/O or compute` (the three options yellow; `compute` written `compuk`, cut at the edge)
- `Caches are just glorified Hash Tables` (`Hash Tables` in a grey rounded highlight), arrow down to `with some advanced data structures` (pink)
- Diagram (D-15): three stick figures on the left, each with an elbow line into a rectangle `LB`; three elbow lines from `LB` to three stacked rectangles `API`; elbow lines from each `API` to a cylinder `Database`. A yellow elbow line rises from the top `API` to a yellow cylinder `Cache` above.
Change: new page section.

## S81 - 02:11:54-02:11:57 (b_021154.jpg, b_021157.jpg)
Zoomed in on the caching text and the top of D-15 (S80). No new content.
## S82 - 02:12:00-02:13:33 (b_021245.jpg, b_021315.jpg, b_021330.jpg, b_021333.jpg)
Caching page (S80) zoomed to normal size and scrolled; b_021330.jpg shows D-15 in full: three users → `LB` → three `API` → `Database`, top `API` → `Cache`. No new content.

## S83 - 02:13:45-02:14:30 - Computation (b_021415.jpg, b_021424.jpg, b_021427.jpg, b_021430.jpg)
New text (green): `computation` (cramped, reads `computatn`) written above `network I/O` on the `Typical use` line, i.e. a third option for what a cache saves. b_021427.jpg shows D-15 alone. No other new content.

## S84 - 02:14:45-02:16:45 - Cache shared by all API servers (b_021645.jpg)
New in D-15: two green curved lines from the `Cache` cylinder down to the middle and bottom `API` boxes (so all three API servers connect to the one cache).

## S85 - 02:17:00-02:17:18 - Fun exercise (b_021700.jpg, b_021715.jpg, b_021718.jpg)
Topic: assignment for the next class.
Text (b_021700.jpg, b_021718.jpg):
- `Fun exercise:` (yellow)
- `Find possible place that you can use as a cache with an example` (pink)
- `eg: Central cache (RAM) for application-level cache`, arrow down to `Saves DB computations` (pink)
- `* This will be the first thing we discuss tomorrow` (yellow)
b_021715.jpg is scrolled back to the top of the caching page (S83). 
Change: new page section.
## S86 - 02:17:24-02:18:45 (b_021724.jpg, b_021727.jpg, b_021745.jpg, b_021800.jpg, b_021803.jpg, b_021845.jpg)
Switching between D-15 (b_021724.jpg, b_021727.jpg, b_021800.jpg: final form with the green cache links) and the `Fun exercise:` section (b_021745.jpg, b_021803.jpg, b_021845.jpg). No new content.

## S87 - 02:19:00 (b_021900.jpg)
Emphasis at 02:19:00 on D-15: two red strokes from the `Cache` cylinder down towards the top `API` box, ending in a small red hook (a request path to the shared cache). No new content.

## S88 - 02:19:03-02:20:03 (b_021903.jpg, b_021930.jpg, b_021945.jpg, b_022000.jpg, b_022003.jpg)
`Fun exercise:` section (S85). Emphasis at 02:19:03: a short red stroke through the end of `Central` (b_021903.jpg); gone by 02:19:30. No new content.
## S89 - 02:20:15-03:06:50 - Fun exercise during Q&A and wrap-up (b_022015.jpg, b_022130.jpg, b_022145.jpg, b_022200.jpg, b_022315.jpg, b_022345.jpg, b_022630.jpg, b_023000.jpg, b_023009.jpg, b_023145.jpg, b_023200.jpg, b_023215.jpg, b_023330.jpg, b_023645.jpg, b_023930.jpg, b_024000.jpg, b_024015.jpg, b_024018.jpg, b_024045.jpg, b_024100.jpg, b_024145.jpg, b_024200.jpg, b_024515.jpg, b_024530.jpg, b_024630.jpg, b_024815.jpg, b_024845.jpg, b_025015.jpg, b_025018.jpg, b_025230.jpg, b_025315.jpg, b_025615.jpg, b_025915.jpg, b_030000.jpg, b_030100.jpg, b_030109.jpg, b_030245.jpg, b_030415.jpg, b_030530.jpg, b_030630.jpg)
The `Fun exercise:` page (S85) stays on screen, unchanged, for the rest of the session (questions on databases and caching, soft delete / GDPR, cache compression, Redis vs DB table for pre-computed results, Q&A, wrap-up). The kept frames in this run differ only in the participant column. No new content.
