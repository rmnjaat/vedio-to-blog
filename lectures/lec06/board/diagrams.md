# Lecture 06 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it is first drawn or shown. Colour notes: white = default ink; yellow = headings, key labels and the user→S3 upload path; pink/peach = side notes, the CDN→API origin path, the auxiliary store; light blue = the CDN-invalidation return path, queue inner lines, worker labels; purple = S3→API read line, `Notification System`; green = `READ`/`WRITE Path` labels and index markers. Temporary strokes (red highlighter, blue dashed laser loops) are left out except as "Emphasis". Shapes: rectangle = server/service, stacked rectangles = horizontally scaled service, cylinder = database/datastore, horizontal pipe = queue/Kafka topic, stick figure = user/client, cloud = CDN or S3, small square = a photo.

## D-01 - Serving a static image from a web server (00:05:45-00:13:15)
Frame: b_001200.jpg (also b_001100.jpg, b_001245.jpg)
- Top: URL `https://arpitbhayani.me/static/img/arpit.jpg`; a yellow brace under the host with a yellow arrow labelled `request` going down to a stick figure.
- Stick figure → line → rectangle `Server`; a small box below-right of the server (the server's disk).
- Right: yellow `Folder structure` with an indented tree `site/` → `static/` → `img/` → `arpit.jpg`, `logo.jpg`; `js/`; `css/`.
- Under it, the three steps: `- reads the URL` / `- reads the file from the server at the path` / `- sends the response`; and the S3 variant `- reads the URL` / `- reads the file from S3` / `- sends the response` with the Flask handler `@app.route('/raw/<path>')` / `def raw_handler(path):` / `raw_b = S3.read(path, BUCKET)` / `return raw_b`.
- Emphasis (00:12:00): red circle around `/static` in the URL (the path maps to the folder).

## D-02 - Gravatar schema and queries, Brainstorm page (00:31:45-01:31:15)
Frame: b_013230.jpg (final); b_010112.jpg / b_010145.jpg (full page before the strike-through)
- Top-left yellow `Brainstorm:`. Centre: table `users` with starred columns `* id`, `* email`, `* hash`, green `* active_photo_id`. Right: table `photos` with `id`, `user_id` (an `is_active : bool` column existed 00:36-01:03 and was erased).
- Left column between yellow `Tx` (top) and `Tx` (bottom): `update photos set is_active = False where user_id = ? and is_active = True`; `update photos set is_active = true where id = ? and user_id = ? and is_active = false` (both struck through with long diagonal lines from 01:05); `update users set active_photo_id = ? where hash = ?` (clean version from 01:31).
- Right column: `Select * from photos join on users on photos.user_id = users.id where users.hash = ?`; below it the same query plus `and photos.is_active = True`; below that, `↓` and a scrawled `Select * from photos where id = ?`.
- Emphasis: red circles on the first update (00:49:15) and on `active_photo_id` (01:02:33); blue dashed loop around the whole `Tx` block (01:01:45).

## D-03 - Photo upload with a signed URL (01:07:15)
Frame: b_010715.jpg (also b_013457.jpg)
- Header yellow `lets write our API server :` pink `api.gravatar.com`; yellow `Uploading photo`.
- Left: stick figure `user` with a small pink square (the photo) above it. A white line from the user to a rectangle `Photo Upload Service`. A white line from the service up-right to a cloud `S3` (a pink square beside the cloud).
- A light-blue arc goes from above the user directly to the S3 cloud (the user uploads straight to S3).
- Below: light-blue `Prepare for upload :` steps and the key `S3://gravatar-images/{user_id}/{random photo id}`; light-blue `Upload photo` / `- user uploads photo to S3`.

## D-04 - Gravatar tables with sample rows (01:08:00, 01:23:09)
Frame: b_010800.jpg (also b_012309.jpg)
- Top (partly cut): stick figure → rectangle `API` → cylinder `MySQL`.
- `Schema: photos`: columns `id | user_id | is_active`, row `7abe | 729 | True`.
- `Schema: users`: columns `id | email | hash`, row `729 | arpit@gmailcom | 0eafd172`.
- Denormalized version (b_012309): users `id | email | hash | active_photo_id` (yellow header), row `729 | arpit@gmailcom | 0eafd172 | cdae`, purple arrow up to `cdae` from `active_S3_key`, under yellow `Possible optimizations` / `- You can denormalize the table to avoid Joins`.

## D-05 - Gravatar architecture with CDN and invalidation (01:11:30-01:22:30)
Frame: b_011130.jpg (full view; also b_011345.jpg, b_012230.jpg)
- Top: light-blue label `gravatar.com → api.gravatar.com` above a cloud `CDN`. Left of it a stick figure `User 2` with a yellow arc to the CDN; below User 2 `< https://gravatar.com/h1 >` next to a yellow-outlined photo box (stick-figure portrait).
- Middle: cloud `S3` (pink square beside it). Stick figure `user` (pink square beside it) → line labelled yellow `upload` → rectangle `Photo Upload Service` → line up to S3. A yellow line goes from the user straight up and across to S3.
- From the user a diagonal line labelled yellow `add` / `update` to rectangle `API`; `API` → line → cylinder `MySQL`.
- A purple line from S3 down to API; a pink line from the CDN down the right side to API (CDN fetches from origin `api.gravatar.com` on a miss).
- `API` ↓ `update` → horizontal pipe (yellow outline, light-blue inner line: queue) ↓ → rectangle `CDN Invalidation` → light-blue line along the bottom and up the right edge back to the CDN.
- Emphasis: 01:12:45 path user → API → MySQL and API → queue → `CDN Invalidation` (circled); 01:13:00 `h1` circled; 01:13:15 CDN → API → MySQL / S3 (miss path).

## D-06 - Tag position as relative coordinates (01:58:45)
Frame: b_020100.jpg (also b_015900.jpg)
- A square image box; `(0,0)` outside its top-left corner, `(720,720)` outside its bottom-right corner.
- Inside: a yellow stick figure with a large round head; a pink arrow at the top-right of the head, labelled `(320,120)`.
- Right: `Relative positioning` / `location = ( 320/720 , 120/720 )`; `Allows us to handle multiple devic[es]` / `on-demand transformations at ea[ch]`; pink `LTRB / x,y,w,h`.
- Below: `schema: posts_tags` with header `post_id | user_id | location`.
- Emphasis (02:00:57): red circles on `LTRB` and `x,y,w,h`.

## D-07 - PHOTO_TAG event on Kafka (02:01:30)
Frame: b_020130.jpg (also b_020245.jpg)
- `Services to interact with:` list `Search`, `Face detection`, `Location`, `Notification`, `RBAC [Authorized to tag?]`.
- yellow `Key component for extensibility :` light-blue `Kafka`.
- pink `PHOTO_TAG event` `.... many consumers` → yellow `Search, Notification, An[...]` [cut off] / `Profile,`.
- An L-shaped line feeding a horizontal pipe (Kafka topic) drawn below.

## D-08 - Newly unread badge (02:03:00)
Frame: b_020345.jpg
- A paper-plane (send/messages) icon with a pink circled `3` at its top-right; arrow `← This is what we want to implement`.
- Text: `User can have 100s of unread messages but the number ③ indicates there are 3 people that you recently (newly) received.`

## D-09 - Unread-count schema, crude query (02:07:15-02:19:30)
Frame: b_021930.jpg (also b_021900.jpg)
- Three underlined tables side by side: `user` (`id`); `user_activity` (`user_id`, `last_read_at`); `messages` (`msg`, green-dotted `from`, `to`, `ts.`). Green `index (t[o…]` [cut off] to the right of `messages`.
- A box `CRUDE` below `user_activity` with an arrow up-right toward the tables.
- Query: `Select count(uniq(from)) from …` / `wher[e] to = ?` / `& ts > last_read_at`, with pink `INEFFICIENT` (double-underlined) to its left.
- Left (later): `user_id: unique_users set<   >`, `↑`, `delete set when user clicks "[paper-plane icon]" icon`; above it the struck-through `newly_unread_count: 3`.

## D-10 - Get and clear status against Redis (02:26:45-02:29:15)
Frame: b_022800.jpg
- Two stick figures on the left (one above the other).
- The lower one ↔ rectangle (service): white double arrow labelled `getStatus`, pink double arrow below labelled `clear`.
- Rectangle → cylinder `Redis` via a stepped white arrow (to Redis) and a stepped pink arrow (back).
- Right: `K.value store` / `value is set` / `Redis`.

## D-11 - Messaging service emits ON_MSG_UNSENT (02:29:30)
Frame: b_022942.jpg
- yellow `Websockets` `know if a user is connected or not, we use thi[s] to find the undelivered messages`.
- Two stick figures, each with a line labelled `WS` to stacked rectangles `Messaging Svc`.
- `Messaging Svc` → line right → three cylinders connected in a triangle, `partitioned chat db`.
- A yellow vertical line down from `Messaging Svc` to a queue pipe (yellow outline, light-blue inner lines), label `ON_MSG_UNSENT`; three stacked L-shaped lines leave the pipe (consumers).
- Left: yellow `or ONLINE/` / `OFFLINE service`.
- Emphasis (02:31:30): red arrow into the queue and circles around `ON_MSG_UNSENT` and the pipe.

## D-12 - Event as input, unique-user set (02:31:42)
Frame: b_023142.jpg
- yellow `ON_MSG_UNSENT` over a pipe with one line in from the left and three lines fanning out to the right; `Becomes the input to our system`.
- `Each event would contain { src: "A" / dest: "B" / msg: "____" }`.
- `We want # unread from` / `UNIQUE USERS` / `user_id : {u1, u2, u5}`; `B: {C, D}`.

## D-13 - Read path, write path and auxiliary Redis (02:32:00-02:55:45)
Frame: b_024045.jpg (full; also b_023215.jpg)
- Top: green `READ Path →`. Stick figure → line labelled `get_status` (above) / `clean_status` (below) → pink stacked rectangles `Status check API` → line → `Redis Cluster` (three cylinders linked together, top right).
- Pink note under the API: `can batch here` / `{ if part = recv id` (second line uncertain).
- Bottom-left: `ON_MSG_UNSENT` → arrow into a queue pipe (yellow outline, light-blue inner). From the pipe three lines fan out to three small squares, light-blue `Status update workers`; lines converge from the workers and one long line runs up to `Redis Cluster`. Green `WRITE Path →` under the pipe. A line from the pipe down to purple `Notification System`.
- A pink line from the workers and a pink line from `Status check API` both run down to a pink cylinder `Auxiliary Redis`.
- Right notes: `workers will update` / `the users in Redis` / `as it gets the event`; `B_C : True` / `B_D : True` (entries in the auxiliary store).
- Emphasis: 02:32:00 red line along get_status → Redis Cluster; 02:44:30 red arrow into `Auxiliary Redis`; 02:46:45 red loop Status check API → Redis Cluster → Auxiliary Redis.
