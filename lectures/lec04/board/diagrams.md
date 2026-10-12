# Lecture 04 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it's first drawn or shown. Colour notes: white = default ink; yellow = headings, key labels and the cache path; pink/salmon = notes, table headers and table rules; light blue = annotations and type arrows; green = additions made late in the explanation; green/grey dots = online/offline. Temporary strokes are left out except as "Emphasis": red highlighter scribbles. Shapes: rectangle = server/service, cylinder = database/datastore, stick figure = user/client.

## D-01 - Online/offline indicator, what the user sees (00:14:15-00:24:45)
Frame: b_002245.jpg (also b_001500.jpg)
- Under the heading `Online Offline Indicator` (yellow), a column of four labels: `user 1`, `user 4`, `user 5`, `user 3`.
- To the right of each label, a small filled dot: green for `user 1` and `user 4` (online), grey for `user 5` and `user 3` (offline).
- Beside it, the pink note `Note: Since it is day 1, we keep thing simple and do not put a lot of focus on Scaling` and white `We have a lot of time to talk about it!`.
- Emphasis (00:15:00): red scribble circles around the first three users.

## D-02 - Incremental building loop (00:15:15-00:18:45)
Frame: b_001745.jpg
- Yellow heading `Incremental building`; numbered list: `1. start with a Day Zero architechure` [sic], `2. See how each component would behave` (sub-points `↳ under load`, `↳ at scale`), `3. identify the bottleneck`, `4. re-architect`, `5. repeat`.
- A yellow curved arrow runs from `5. repeat` on the left side back up to item `2.` (the loop: evaluate, find bottleneck, re-architect, repeat).
- Above the list (same page): a light-blue spiral beside `Decide the core & build your system around it`, with `Core is use-case specific` / `Database, communication` (cut off at the page edge).

## D-03 - Storage model and access pattern (00:19:00-00:22:30)
Frame: b_002230.jpg (also b_002215.jpg)
- `Storage:` (yellow) then `user → online/ offline`.
- Light-blue arrows down: `user` → `int`, `online/offline` → `bool`.
- Right: a yellow cylinder with `[not yet decided]` below and pink `We still have not picked which DB to use`.
- Below: `Access : Key Value` (purple).

## D-04 - Interfacing API (00:22:30-00:24:15)
Frame: b_002415.jpg
- Stick figure labelled `User` with a small pink rectangle above it (device). Double-headed arrow to a rectangle `API Server`. Double-headed arrow from `API Server` to a cylinder labelled `Database`.
- Below: `GET /status/users ? ids = u1 , u2 , u3 , u4`. A light-blue curly brace under the four ids, labelled `user ids for whom status need to be fixed` (written word `fixed`).

## D-05 - Updating the database, push model (00:26:00-00:27:30)
Frame: b_002615.jpg (emphasis in b_002730.jpg)
- Three stick figures stacked on the left. Each has a double-headed arrow to one rectangle `API` (top and bottom arrows angled, middle horizontal).
- Double-headed arrow from `API` to a cylinder `DB`.
- A yellow dotted line runs from the top user, over the top of the `API` box, to the `DB`: the path of a status update.
- Text below: `Push based model : Users push their status periodically`; pink `Our API servers cannot "pull" from client because we cannot proactively talk to client`; light blue `* unless there is a persistent connection`.
- Emphasis (00:27:30): red ovals around the three users.

## D-06 - Heartbeat as a periodic pulse (00:27:45-00:30:15)
Frame: b_002945.jpg
- Stick figure on the left, then a horizontal row of five dots (the heartbeats), then a rectangle `API` on the right.
- A white arrow points up at the middle dot, labelled `periodic pulse`.
- Above: `POST /heartbeat → the authenticated user will be marked as "alive"`.
- Below: `So, when is a user offline ?` / pink `When we did not receive "heartbeat" for long enough`, with `Subjective!` and an arrow to `long enough`.

## D-07 - pulse table and update query (00:30:30-00:32:57)
Frame: b_003057.jpg (emphasis in b_011642.jpg)
- A two-column table titled `pulse` (pink title, pink rules): header `user_id` | `last_hb`; rows `u1` `1000`, `u2` `1050`, `u3` `1060`.
- Right of it, white `when you receive the heartbeat`, then yellow SQL: `UPDATE pulse` / `SET last_hb = NOW()` / `WHERE user_id = u1`. Pink note `epoch seconds` with an arrow to `NOW()`.
- Below: `* User sends heartbeat every 10 seconds`; `Get Status API`: `GET /status/<user_id>` / `if no entry in the database for user → offline` / `if entry and entry.last_hb < Now() - 30sec → offline` / `Online`.
- Emphasis (01:16:42): red oval around the whole UPDATE statement.

## D-08 - Storage estimate and requirement (00:33:45-00:39:15)
Frame: b_003515.jpg
- Left: `100 users → 100 entries`, `1000 users → 1000 entries`, `1m users → 1m entries`, `1B users → 1B entries`; `Total storage required for 1B entries = 8 GB`.
- Right: `Each entry has 2 columns` (cut off), `user_id , last_hb` with arrows down to `int (4B)` and `int (4B)`; `Size of each entry = 8B`.
- `Can we do better on storage ?` (yellow); `Requirement :` with `user 1` (grey dot), `user 2` (green dot), `user 3` (green dot), a curly brace on the right and `all we care is online/ offline`.

## D-09 - Redis vs DynamoDB comparison table (00:44:45-01:03:24)
Frame: b_010200.jpg (also b_005015.jpg)
- Above: `Which one would you pick & why ?` (yellow) and pink `* Cost Estimation`.
- A T-table with pink rules: header `Redis` (left column) | `DynamoDB` (right column).
- Each row is a white tick in the winning column with a long white line running right to a label outside the table:
  - DynamoDB ✓ ——— `persistnce` [sic, "persistence"]
  - DynamoDB ✓ ——— `managed (* team size)` with `& experte` below (reads as "& expertise")
  - Redis ✓ ——— `vender lockin` [sic] `(cost/ issue/` (parenthesis left open)
  - Redis ✓ ——— `future extensibility` (scrawled)
  - Redis ✓ ——— `time sensitivity`
- Rows were added one at a time: persistence 00:46:57, managed 00:47:00-00:47:42, team size / vendor lock-in by 00:50:15, future extensibility ~00:58:30, time sensitivity ~01:00:30.

## D-10 - Heartbeat load on the DB (01:04:15-01:33:54)
Frame: b_010445.jpg (also b_012600.jpg)
- Two stick figures on the left, each with a line to one slightly trapezoidal rectangle `API`; a straight line from `API` to a cylinder (the DB).
- Right: `Our DB needs to handle 6m updates per minute !!`; added later in green (01:24:45-01:26:00): `micro reads/ updates` with an arrow down to `Hence n/w bottleneck`.
- Above: `Heartbeat is sent every 10 seconds` / `So, one user in 1 minute sends 6 heartbeats` / `If there are 1m active users, our system will get 6m req/min` (`6m req` double-underlined) / `Each heartbeat request results in 1 DB call`.

## D-11 - Connection pool (01:05:00-01:33:54)
Frame: b_010530.jpg (emphasis in b_012230.jpg, b_012430.jpg)
- Pink label `Connection Pool` on the left, a short white line to a rectangle `Server` (drawn with a second outline offset behind it: more than one server).
- Three or four parallel horizontal lines (pink, white, yellow, white) run from `Server` to a cylinder labelled `DB`: the open connections.
- A pink arrow from below points up at the lines: `pre-established connections`.
- Above: `How to make it better ?` / `What's hectic ? creating a new connection everytime`.
- Emphasis (01:22:30): the top connection line traced in red with a red looping arrow over it (one connection reused). Emphasis (01:24:30): red oval where the lines meet the DB.

## D-12 - Blogging platform schema, users and blogs (01:41:00-02:08:42)
Frame: b_020830.jpg (also b_014130.jpg)
- `Database` (yellow). Two column lists with pink underlines:
  - `users`: `- id`, `- name`, `- bio`
  - `blogs` (two sub-columns): `- id`, `- author_id`, `- title` | `- is_deleted`, `- published_at`, `- body`
- Below: `Importance of is_deleted [soft delete]`; `when user invokes delete blog , instead of DELETE we UPDATE`; `Key reasons: Recoverability, Archival, Audit` (light blue); `+ Eazy on the database engine [No tree re-balancing]`.
- Emphasis (01:52:39): red oval around `- published_at`.

## D-13 - Column type: long text vs short text (01:48:15-01:52:15)
Frame: b_015215.jpg
- Pink heading `Coulumn Type: body v/s bio` [sic].
- Left, `long text`: a horizontal row of five cells (a table row); from one cell a vertical line drops to a small document icon (lined page). Labels: yellow `large text`, white `stored as a reference`; below, pink `LONGTEXT`.
- Right, `short text`: a row of five cells where the middle cell contains horizontal text lines (the value is inline). Labels: yellow `short text`, white `stored along with other columns`; below, pink `VARCHAR`.

## D-14 - Three ways to store datetime (01:52:33-02:11:48)
Frame: b_015645.jpg (also b_021130.jpg)
- Pink heading `Storing datetime in DB`; green `MySQL` added top right at ~02:11 (reads `MyQQL`).
- Row 1: `datetime as datetime` with an up-arrow from yellow `conventient` [sic] / `sub-optimal` / `heavy on size and index`; right: `02-04-2022 T 09:01:36 Z` with an up-arrow from `serialized in some format`.
- Row 2: `datetime as epoch integer` with an up-arrow from yellow `efficient` / `optimal , light weight`; right: `seconds since 1st Jan 1970` and the value `172562347162`.
- Row 3: `datetime as custom format (int)`; right: `YYYYMMDD - 20220402`.
- Emphasis (01:57:48): red oval around `172562347162`. Emphasis (01:58:00): red dotted underline under `02-04-2022 T 09:01:36 Z`.

## D-15 - Blogging platform with a shared cache (02:11:45-02:19:00)
Frame: b_021645.jpg (also b_021330.jpg)
- Three stick figures on the left. Elbow (right-angled) lines from each user join into a rectangle `LB` (load balancer).
- From `LB`, elbow lines fan out to three stacked rectangles `API`.
- From each `API`, elbow lines run right and join into a cylinder labelled `Database`.
- A yellow elbow line rises from the top `API` and runs right to a yellow cylinder labelled `Cache` (top right).
- Added 02:14:45-02:16:45: two green curved lines from the `Cache` cylinder down to the middle and bottom `API` boxes (all three API servers share one central cache).
- Above the diagram: `Caching` text block (`Reduces response times by saving any heavy computation`, `* Cache are not only RAM based`, `Typical use: reduce disk I/O or network I/O or compute`, green `computation` added 02:14, `Caches are just glorified Hash Tables` → `with some advanced data structures`).
- Emphasis (02:19:00): red strokes from `Cache` down towards the top `API`.
