# Lecture 09 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and when it is first drawn or shown. Two sources: live handwriting (white ink, coloured labels) and pre-written notes pages (neat lettering, colour-coded: yellow = Kafka pipes / write-path arrows, purple = workers and processing, pink = services/topics of interest, cyan = API / read side, white = plain boxes and stores). Temporary strokes are left out: red highlighter scribbles and blue dashed laser marks. Shapes: rectangle = server/service, cylinder = database/datastore, horizontal pipe = queue/stream/topic, stick figure = user/client, cloud = CDN or object storage (the teacher draws `S3/GCS` as a cloud too). Stacked rectangles (several offset outlines) = a fleet of identical servers.

## D-01 - Instagram's year-1 architecture (00:01:15-00:05:45)
Frame: b_000215.jpg (also b_000545.jpg)
- Top row, left to right: rectangles `Nginx`, `Django`, `Celery`, joined by lines.
- Bottom row: cylinders `Cassandra`, `Poslgresal` [sic, PostgreSQL], `Memcached`, `Redis`, and a horizontal pipe `Rabbit...` (RabbitMQ, cut off at the right edge).
- Lines fan out from `Django` to all five stores, and from `Celery` to all five stores.
- Heading above: `Instagram's Year 1 Archikchere` [sic]. Caption below (b_000230.jpg): `Why famous ?` pink `1 year, 14 million, 3 engineers`.

## D-02 - CDN between user and origin (00:06:00-00:12:00)
Frame: b_001200.jpg (also b_000645.jpg, b_013230.jpg)
- Stick-figure user (left) -- line -- cloud `CDN` (middle) -- line -- rectangle `Origin` (right). Drawn twice on the page: once plain (yellow lines), once with addresses.
- Second copy: `https://a.mycdn.net` under the cloud with a down arrow to `https://arpitbhayani.me` (the CDN's configured origin); `https://arpitbhayani.me` under `Origin`.
- Text flow under it: `User hitting : https://a.mycdn.net/syskm-design/logo.png` -> `goes to CDN, which finds Origin for a.mycdn.net` -> `it then forwards request to https://`pink`arpitbhayani.me`/syskm-design/logo.png` -> purple `↗ caches it and returns`.
- Emphasis (00:29:45): red box around the path `/syskm-design/logo.png` (the path stays the same, only the host changes).

## D-03 - Image upload with a presigned URL (live board) (00:31:30-01:06:10)
Frame: b_013115.jpg (also b_013924.jpg, b_004445.jpg)
- Left: stick-figure user with a small purple rectangle (the photo) above it.
- Middle: rectangle `ImgUpld` (first labelled `API`), double-headed arrow user <-> `ImgUpld`.
- Right: cloud `S3/GCS` with `cheap` above it; double-headed arrow `ImgUpld` <-> `S3/GCS`.
- A long arc arrow from the user directly to `S3/GCS` (the upload bypasses the API server).
- Top-left text: `Bandwidth concern` / `Presigned URL with expiration`. Above the diagram: purple `Should upload ‸ go through your API server?` with pink `Not`.
- Right of the cloud: `'s3://img/<r.id>.png'` and an empty `https: ______` line.
- Below: `1. talk to img upload` / `r.id` with a brace and `prepare`; right: a `post` table list `user.id` / `Caption` / `url` (url circled, then struck through).
- Emphasis (00:39:30): the photo icon moved along the arc to the cloud.

## D-04 - Instagram photo upload and publish flow (notes) (01:08:15-01:15:27)
Frame: b_011515.jpg (also b_013100.jpg, b_014330.jpg, b_013742.jpg for the top half)
- Heading: `1. Uploading photos to S3 using signed URL`.
- Top: URL `https://instacdn.net/123/abc.jpg` above a cloud `CDN`. Orange arrows: from the CDN left and down to stick figure `B` (viewer); from the CDN right and down to rectangle `S3`, and back up (CDN <-> S3).
- Middle: stick figure `A` (uploader) with a small pink rectangle (photo) and yellow label `prepare Upload`. Yellow double arrow A <-> rectangle `Image Service`. Yellow elbow arrow from `Image Service` up into `S3`. Purple arrow labelled `upload` from A straight up and right into `S3`.
- Lower: pink box `Posts Service`; pink double arrow A <-> `Posts Service`; pink double arrow `Posts Service` <-> cylinder `MySQL`.
- Bottom: horizontal pipe `Kafka` (yellow outline, light-blue inner lines). A light-blue elbow line from `Posts Service` down into Kafka. A yellow elbow labelled `CDC` from `MySQL` down into Kafka. A yellow elbow from Kafka left/down to `Other Services` / light-blue `Search, Notification, Analytics`.
- Purple `Q: what would be the partition key on Kafka Topic?` with an up arrow to Kafka; answer `' user_id '`.
- Steps under the diagram: `1. user A talks to Image Service to prepare for upload` / `2. Image Service generates a random image ID and talks to S3`.

## D-05 - Posts service validates the image id (notes) (01:13:15-01:13:25)
Frame: b_011325.jpg (also b_014715.jpg)
- Stick-figure user <-> yellow-outlined box `Posts Service` <-> cylinder `Posts DB`.
- A line from the user up to a box `Image Svc`.
- Text: `Posts service can also validate that the image_id provided in the request belongs to the same user or not.`
- Same page, above: the `posts` table (`id → id generator`, `user_id → auther of post`, `image_id → random photo id from Image Svc`, `caption`) with connectors from `user_id` and `image_id` into `S3:// insta-images / <user_id> / <random photo id>`.

## D-06 - HashTag page mock (notes) (01:47:30-01:56:00)
Frame: b_015430.jpg (also b_014745.jpg)
- A tall rectangle (phone screen) with yellow `#sunset` at the top, pink `1.2m photos` below it, then a 2 x 3 grid of purple-outlined photo tiles.
- Pink leader lines to labels on the right: `hashtag` (from `#sunset`), `count of photos` (from `1.2m photos`), `top 100 photos` (from the grid).
- A large curly brace on the left side of the screen.
- Heading `HashTag Service` with arrow to `Best User Experience`.

## D-07 - Hashtag document and two ways to store the top 100 (live) (01:57:45-02:06:45)
Frame: b_020530.jpg (also b_022000.jpg)
- A cylinder (hashtag DB) on the right. Under it the document `{ tag: sunset / total_photos: 1.2m / top_100: [ ... ] }`.
- Option A (inside the list, right): `post_id1` / `post_id2` / `:`; notes under it: green `lastest dat` [sic, latest data], green `less space`, pink `talk to post DB`.
- Option B (left of the document): `{id, capt.., __ }` / `{ ____ }` and two more lines (full post objects); notes under it: pink `large space`, green `fast time`, pink `consistny` [sic, consistency].

## D-08 - Hashtag counting pipeline (live) (02:07:00-02:22:45)
Frame: b_022245.jpg (also b_022500.jpg)
- Top row: stick-figure user -- rectangle `posts` -> horizontal pipe labelled green `user_id` (first `hashtag`, replaced) -> a stack of three rectangles under the label `County` [sic, Counting]; the top two read `one ht` and `on ws` [illegible] -> arc arrow into a cylinder (hashtag DB). `Count +=n` written near the DB (top right). Several strokes fan into the `user_id` pipe from above (other consumers).
- Below the `posts` box: `p1: #sunset / #sun / #nolne` (nature).
- From the `user_id` pipe a vertical line down to two stacked rectangles labelled `htag extraptor` [sic, extractor]; triple lines down to a second pipe labelled `hashtag`; curved lines from that pipe up to each of the three counting boxes.
- Bottom-left: stick figure `DS` -> pipe -> small box -> long curve right and up into an arrow at the hashtag DB.
- The D-07 document and its option notes sit to the right of this sketch.
- Earlier form (02:07:00): one consumer box and green `Batching` over the arc to the DB.

## D-09 - HashTag Service architecture (notes) (02:23:12-03:26:15)
Frame: b_022445.jpg (also b_022312.jpg, b_025600.jpg for the DLQ note)
- Top: box `Post Svc` (hand-drawn over the printed `Image Service` at 02:23:30) -> yellow arrow -> yellow pipe `Kafka` -> yellow arrow -> purple stacked box `HashTag Extraction`.
- From `HashTag Extraction`, triple yellow arrows down and left into a long yellow pipe labelled pink `POST_HASHTAG`.
- From `POST_HASHTAG`, triple purple arrows left and down into purple stacked `Counting Servers`; triple yellow lines from `Counting Servers` right and down into the top cylinder of the DB group.
- Left: box `Popularity Svc` -> line labelled `per hashtag popular photos` -> down arrow into yellow pipe `Their Kafka`; pink `* Not high throughput`; purple line from `Their Kafka` down to purple `Workers`; purple line from `Workers` right into the same DB cylinder.
- Bottom: stick user <-> double arrow labelled yellow `GET /hastag/<tag>` <-> cloud `CDN` -> arrow -> cyan stacked `HashTag API` <-> double arrow <-> three cylinders `Partitioned DB`; a purple line from `HashTag API` down and right to cylinder `Cache`.
- Below: yellow `Key Takeaways:` `- Kafka as a glue` / `- Adapter pattern` / `- Effective batching and counting` / `- READ and WRITE path optimizations`.
- Live additions: `"Dead Letter Queue"` (02:54:46) and the D-12 sketch above the top row.

## D-10 - Read path and write path (notes) (02:25:03-03:16:09)
Frame: b_022818.jpg (also b_022842.jpg for the Image Service variant)
- Box `Post Service` -- line -- yellow pipe `Kafka` -- elbow down to pink stacked `HashTag Wrk`; yellow elbow from `HashTag Wrk` right and down into the top DB cylinder. Green arrow and label `WRITE Path` under the top row.
- Stick user -- line labelled yellow `GET /hastag/<tag>` -- cyan `HashTag API` -- line -- three cylinders `Partitioned DB` / `MySQL, MongoDB, DDB`. A purple line from `HashTag API` down to cylinder `Cache`. Green arrow and label `READ PATH`.
- Cyan text: `Key value based access` / `For a key (hashtag) get the value (details)`.
- A second notes page draws the same diagram with `Image Service` as the writer, headed `... counting : Batching → Partitioning` / `... HashTag API servers won't count.` / `worker nodes batch and update`, and followed by `A good way to optimize systems is to identify the READ PATH and WRITE PATH and optimize them indepenc...` and `READ PATH optimizations` (b_031609.jpg).

## D-11 - Adapter: hashtag extraction and repartitioning (notes) (02:33:45-02:41:48)
Frame: b_023400.jpg (also b_023345.jpg, b_024130.jpg for the live annotations)
- Box `Image Service` -- yellow pipe `Kafka` -> elbow arrow down into purple stacked `HashTag Extraction`. Purple `#consumers = # partitions` beside it.
- Right of the extraction box: yellow `post_1729:` with purple `#sunset`, `#sun`, `#nature`, each with a grey line running right (one event per hashtag).
- Triple yellow arrows from `HashTag Extraction` down into a yellow pipe; caption pink `Topic: POST_HASHTAG` cyan `partitioned by hashtag` (next block labels it `POST_HASHTAG`). Purple `Repartitioning and reindexing` beside the pipe.
- Triple purple arrows from the pipe left/down to purple stacked `Counting Servers`; triple yellow lines right and down to the DB cylinders. White `Batch and partially update [per hashtag]`.
- Bottom: user <-> `GET /hastag/<tag>` <-> cyan `HashTag API` <-> cylinders.
- Live annotation (02:39-02:41): `<h1, p1>` above the `POST_HASHTAG` pipe; `{ h1: int }` beside `Counting Servers`.

## D-12 - Kafka stream: horizon and last commit (live) (02:57:00-03:26:15)
Frame: b_030145.jpg (also b_032200.jpg)
- Green, top right of the D-09 page: a long horizontal line inside an ellipse, crossed by evenly spaced vertical ticks (messages), dotted between some ticks.
- `H` at the far left (horizon, the oldest retained message).
- `LC` above a circled message near the left (last commit / checkpoint).
- Another circled message near the right end, then `...` (newer messages).
- Emphasis (03:00:30): red circle on the D-09 `Kafka` pipe with a red arrow to a red box (a consumer).
