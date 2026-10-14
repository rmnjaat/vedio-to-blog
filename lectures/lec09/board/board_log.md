# Lecture 09 - Board log

Source video: `vedio/5_6073595677990980679.mp4` (1280x720, 3:26:37). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail, last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states. Six extra frames were pulled where a state changed between kept frames (b_010610, b_010820, b_010825, b_010840, b_011320, b_011325).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles.
- Colours: the board is a dark-grey ruled notebook page. Live handwriting is mostly white; yellow for headings and labels, pink/red-pink for warnings and key terms, purple (lavender) for questions and asides, green for positives / labels (`Batching`, `user_id`), light blue for some list items and Kafka inner lines. Red highlighter strokes are temporary emphasis and fade after a few seconds; they are logged only as "emphasis at HH:MM:SS".
- Page model: two kinds of pages. (1) A live, scrolling handwritten canvas (agenda, Instagram year-1 architecture, "How CDN works?", "Image Upload Service", the live HashTag storage/counting sketch). (2) Pre-written, neatly lettered notes pages with coloured diagrams (photo upload/publish flow, privacy, image optimizations, HashTag Service final architecture, read/write paths, adapter), which the teacher scrolls through and occasionally annotates. Many states are the same page scrolled or zoomed.
- Screen-share demos (browser, GitHub, Instagram, devtools) are logged by what is on screen; account content is not described beyond the URLs and fields the teacher points at.
- Participant names/faces in the right-hand column are deliberately not recorded. Gallery-only frames are logged as "gallery view, not kept for publication".

---

## S01 - 00:00:00-00:01:09 - Agenda (b_000100.jpg, b_000109.jpg)
Topic: lecture agenda.
Text (heading yellow `Agenda:`; items white, each preceded by `-`):
- `Instagram's Year 1 archikchere` [sic, "architecture"]
- `How CDN works ?`
- `Uploading photos at scale`
- `HashTag Service`
Change: first state (b_000109.jpg is the same page, cursor only).

## S02 - 00:01:15-00:02:15 - Instagram's year-1 architecture (b_000215.jpg)
Topic: the stack Instagram ran on in its first year.
Text: heading yellow `Instagram's Year 1 Archikchere` [sic, "Architecture"].
Diagram (D-01): three rectangles in a row `Nginx` -> `Django` -> `Celery`; below them cylinders `Cassandra`, `Poslgresal` [sic, "PostgreSQL"], `Memcached`, `Redis`, and a horizontal pipe `Rabbit` [cut off, "RabbitMQ"]; lines fan from `Django` and from `Celery` to every one of the five stores.
Change: new page.

## S03 - 00:02:30 - Why it became famous (b_000230.jpg)
Text (scrolled down below D-01):
- `Facebook made PHP MySQL famous .... everyone did that`
- `Instagram made above arch famous .... everyone is doing it`
- `Why famous ?` then pink `1 year, 14 million, 3 engineers`
Change: lines added under the diagram.

## S04 - 00:02:45-00:05:45 (b_000345.jpg, b_000545.jpg)
Same page scrolled back up to D-01. No new content.

## S05 - 00:06:00-00:06:45 - How CDN works (b_000645.jpg)
Topic: a CDN sits transparently between user and origin.
Text:
- heading yellow `How CDN works ?`
- `CDN transparently sits b/w your user and the origin`
- `Say, your origin is https:// arpitbhayani.me`
- `and there is a path that returns some response`
- yellow `JSON, Bytes, Image, HTML, Video, anything`
- pink `https://arpitbhayani.me/system-design/logo.png`
- `CDN has its own domain, say https:// a.mycdn.net`
Diagram (D-02, first form): stick-figure user -- yellow line -- cloud `CDN` -- yellow line -- rectangle `Origin`.
Change: new page.

## S06 - 00:07:00-00:08:00 (b_000745.jpg, b_000800.jpg)
Page scrolled down; a second copy of the user -- `CDN` -- `Origin` diagram is drawn below the text. No new text.

## S07 - 00:08:15-00:10:39 (b_001030.jpg, b_001039.jpg)
New text under the second diagram: `https://a.mycdn.net` under the cloud, `https://arpitbhayani.me` under `Origin` (partly cut off at the page edge in b_001030), and a down arrow under the CDN domain.

## S08 - 00:10:45-00:11:15 - Request path through the CDN (b_001115.jpg)
New text:
- under the down arrow: `https://arpitbhayani.me` (the origin configured for the CDN domain)
- yellow `User hitting :` white `https://a.mycdn.net/syskm-design/logo.png` [sic, "system-design"]
- `goes to CDN, which finds Origin for a.mycdn.net`
- `it then forwards request to` ... purple `↗ caches it and returns`

## S09 - 00:11:30-00:12:00 (b_001200.jpg)
New line completing the sentence: `https://` + pink `arpitbhayani.me` + `/syskm-design/logo.png` [sic] (the CDN host is replaced by the origin host, same path).

## S10 - 00:12:15-00:19:15 (b_001245.jpg, b_001330.jpg, b_001830.jpg, b_001845.jpg, b_001848.jpg, b_001915.jpg)
Same CDN page. Emphasis at 00:13:30: red ellipse around the `User hitting` CDN URL. No new content.

## S11 - 00:19:27 (b_001927.jpg)
Gallery view, not kept for publication.

## S12 - 00:19:30-00:22:42 - Browser demo: image via CDN subdomain (b_001930.jpg, b_001939.jpg, b_001942.jpg, b_002000.jpg, b_002015.jpg, b_002045.jpg, b_002054.jpg, b_002100.jpg, b_002130.jpg, b_002145.jpg, b_002157.jpg, b_002200.jpg, b_002230.jpg, b_002239.jpg, b_002242.jpg)
Screen share of a browser (not handwriting).
- 00:19:30-00:19:42: the teacher's homepage `https://arpitbhayani.me`.
- 00:20:00: typing `https://edge.arpitbhayani.me/img/arpit.png` in a new tab.
- 00:20:15-00:20:54: image opened from the origin at `https://arpitbhayani.me/static/img/arpit.png` (tab title `arpit.png (PNG Image, 3000 × 3000 ...`).
- 00:21:00-00:21:45: same image at `https://edge.arpitbhayani.me/img/arpit.png` (CDN subdomain; `/img/arpit.png` selected in the URL bar at 00:21:30).
- 00:21:57-00:22:30: homepage and `https://arpitbhayani.me/blogs/` list.
- 00:22:39-00:22:42: an unrelated GitHub "new issue" tab; no content.

## S13 - 00:22:45-00:22:57 (b_002245.jpg, b_002248.jpg, b_002254.jpg, b_002257.jpg)
Gallery view, not kept for publication (b_002257 is a blank screen while sharing switches).

## S14 - 00:23:00-00:30:03 (b_002430.jpg, b_002615.jpg, b_002815.jpg, b_002830.jpg, b_002930.jpg, b_002945.jpg, b_003000.jpg, b_003003.jpg)
Back on the CDN page (S05-S09 content). Emphasis at 00:29:45: red box and scribble around the path `/syskm-design/logo.png` in the `User hitting` URL (the path is what is forwarded to the origin). No new content.

## S15 - 00:30:15-00:31:15 - Image Upload Service: requirements (b_003045.jpg, b_003115.jpg)
Topic: designing the photo upload service.
Text:
- heading yellow `Image Upload Service`
- `Requirements:` / `- 5m photos upload per day`
- yellow `Brainstorm:` white `storage, data flow, separation of concern, privacy, extensibility, optimization`
- purple `- Should upload ‸ go through your API server?` with a pink caret mark after "upload" and pink `Not` written under it (reads "Should upload not go through your API server?")
Change: new page.

## S16 - 00:31:30-00:32:33 (b_003145.jpg, b_003200.jpg, b_003203.jpg, b_003215.jpg, b_003230.jpg, b_003233.jpg)
Diagram (D-03, first form): cloud `S3/GCS` on the right with `cheap` above it; a stick-figure user on the left (00:32:15); an empty rectangle in the middle (00:32:30); lines user -- rectangle and rectangle -- cloud (00:32:33).

## S17 - 00:32:45-00:35:30 (b_003315.jpg, b_003530.jpg)
The lines from S16 are removed and redrawn: the rectangle is labelled `API`; double-headed arrows user <-> `API` and `API` <-> `S3/GCS`. A small purple rectangle (the photo) is drawn above the user. Emphasis at 00:35:30: blue dashed laser circle around the photo.

## S18 - 00:35:45-00:37:15 - Bandwidth concern (b_003630.jpg, b_003642.jpg, b_003645.jpg, b_003700.jpg, b_003709.jpg, b_003712.jpg, b_003715.jpg)
New text top-left: `Bandwidth concern`.
Diagram: at 00:36:45 a second rectangle is drawn above `API` with curves user -> it -> `S3/GCS` (an alternative path); by 00:37:12 that rectangle and its curves are erased. At 00:37:00-00:37:09 the `API` box is relabelled `ImgUpld` (image upload service).

## S19 - 00:37:30-00:39:15 - Presigned URL (b_003730.jpg, b_003739.jpg, b_003742.jpg, b_003800.jpg, b_003815.jpg, b_003845.jpg, b_003915.jpg)
New text under `Bandwidth concern`: `Pre` (00:37:30) -> `Pre sign` (00:37:39) -> `Presigned URL` (00:37:42) -> `Presigned URL with expiration` (00:39:15; the last word is cramped, "expiratim"-like).
Diagram: a long arc arrow from the user directly to `S3/GCS` (00:38:30-00:38:45); a short underline mark under the `ImgUpld` box (00:38:15).

## S20 - 00:39:30-00:40:45 (b_003945.jpg, b_004045.jpg)
The purple photo icon is moved onto the arc next to `S3/GCS` (photo travelling directly to storage), then back beside the user (00:40:00). Emphasis: blue laser circle. No new text.

## S21 - 00:41:00-00:45:03 - Prepare step and storage path (b_004215.jpg, b_004445.jpg, b_004500.jpg, b_004503.jpg)
New text:
- below the user: `1. talk to img upload` / `r.id` with a right brace `}` and `prepare`
- right of `S3/GCS`: `'s3://img/<r.id>.png'` ("img" underlined; the end of the line is cut off at the page edge until 01:04:27)
- below it: `https: ________` (an empty URL line)
b_004500.jpg (00:45:00) is a gallery view, not kept for publication; b_004503 shows the same board again.

## S22 - 00:45:09-00:45:45 - GitHub upload demo: setup (b_004509.jpg, b_004512.jpg, b_004515.jpg, b_004518.jpg, b_004530.jpg, b_004539.jpg, b_004542.jpg, b_004545.jpg)
Screen share. b_004509 is a blank screen (switching). A GitHub new-issue page `https://github.com/arpitbhayani/obsidian-hackernews/issues/new` with browser devtools Network tab open (XHR filter); 00:45:39-00:45:45 an OS file-picker selecting a PNG to attach.

## S23 - 00:46:00-00:47:00 - Upload request (b_004645.jpg, b_004700.jpg)
After the upload the comment box holds `![n_t0lO0mq5Q](https://user-images.githubusercontent.com/4745789/221335625-6060fc97-ace7-4df7-9752-efd20be8e4f1.png)`. Network list: `201 POST github.com assets`, `200 OPTIONS github-pr... /`, `204 POST github-pr... /`, `200 PUT github.com 221335625`, then GETs. Payload of `POST assets` (highlighted at 00:47:00): `name: n_t0lO0mq5Q.png`, `size: 183938`, `content_type: image/png`, `authenticity_token`, `repository_id`.

## S24 - 00:47:15-00:53:00 - Upload response: pre-signed S3 form (b_004945.jpg, b_004954.jpg, b_005000.jpg, b_005045.jpg, b_005130.jpg, b_005145.jpg, b_005148.jpg, b_005215.jpg, b_005300.jpg)
Response JSON of `POST assets`, expanded and scrolled:
- `upload_url: "https://github-production-user-asset-6210df.s3.amazonaws.com..."`
- `asset: { id: 221335625, name: "n_t0lO0mq5Q.png", size: 183938, content_type: "image/png", href: "https://user-images.githubusercontent.com/4745789/221335625-...png", original_name }`
- `form: { key: "4745789/221335625-6060fc97-ace7-4df7-9752-efd20be8e4f1.png", acl: "public-read", policy: <base64>, X-Amz-Algorithm: "AWS4-HMAC-SHA256", X-Amz-Credential: "AKIA.../20230225/us-east-1/s3/aws4_request", X-Amz-Date: "20230225T000000Z", X-Amz-Signature: ..., Content-Type: "image/png", Cache-Control: "max-age=2592000", x-amz-meta-Surrogate-Control: "max-age=31557600" }`
- `same_origin: false`, `asset_upload_url: "/upload/assets/221335625"`, `upload_authenticity_token`, `asset_upload_authenticity_token`.
00:52:30-00:53:00: `201 POST github.com assets` row selected again.

## S25 - 00:53:15-00:54:45 - Direct upload to S3 and confirm (b_005415.jpg, b_005445.jpg)
- `204 POST github-p... /` selected: request payload is the raw image bytes (binary, not legible).
- `200 PUT github.com 221335625` selected: payload only `authenticity_token` (the confirm call back to GitHub).

## S26 - 00:54:57-00:56:00 - Image served from the asset domain (b_005457.jpg, b_005530.jpg, b_005600.jpg)
New tab at `https://user-images.githubusercontent.com/4745789/221335625-6060fc97-ace7-4df7-9752-efd20be8e4f1.png`; the uploaded image (a video thumbnail graphic) renders; the URL path is selected at 00:55:30.

## S27 - 00:56:15-01:03:54 - Issue posted (b_005615.jpg, b_005630.jpg, b_005642.jpg, b_005645.jpg, b_005700.jpg, b_005715.jpg, b_005730.jpg, b_005733.jpg, b_005900.jpg, b_010100.jpg, b_010115.jpg, b_010200.jpg, b_010330.jpg, b_010345.jpg, b_010348.jpg, b_010354.jpg)
Back on the issue tab (PUT row still selected); 00:56:42 browser validation `Please fill out this field.` on the empty title; from 00:56:45 the created issue `https://github.com/arpitbhayani/obsidian-hackernews/issues/7` shows the image rendered from `user-images.githubusercontent.com/...png` (status-bar URL). This page stays on screen during discussion until 01:03:54. No new content.

## S28 - 01:03:57-01:04:15 (b_010357.jpg, b_010400.jpg, b_010403.jpg, b_010415.jpg)
b_010357: a new tab loading `https://www.instagram.com` (feed content not described). b_010400, b_010403: gallery view, not kept for publication. b_010415: blank screen.

## S29 - 01:04:24-01:04:45 (b_010424.jpg, b_010427.jpg, b_010445.jpg)
Back on the Image Upload Service page, zoomed out and scrolled. The storage path is now fully visible: `'s3://img/<r.id>.png'`. No new content.

## S30 - 01:05:00-01:06:10 - Post table: do not store the URL (b_010515.jpg, b_010530.jpg, b_010539.jpg, b_010542.jpg, b_010600.jpg, b_010610.jpg)
New list right of the prepare step: `post` (underlined, as a table header) / `user.id` / `Caption` (01:05:00); `url` added and circled with several white loops (01:05:30-01:05:42); `url` struck through with a long diagonal stroke (01:05:45, still struck at 01:06:10).

## S31 - 01:06:15-01:08:00 - Notes: posts table (b_010800.jpg)
Pre-written notes page (section "2. Publish photos", heading visible at 01:14:00).
Text:
- `User keeps track of the random image id it got from Image Svc` ("random image id" underlined green)
- `It uses this to create the entry in posts table`
- yellow `posts` (table header, underlined) with rows: `id` → pink `id generator`; `user_id` → pink `auther of post` [sic, "author"]; `image_id` → pink `random photo id from Image Svc`; `caption` (followed by four white placeholder lines)
- purple `* LinkedIn also does this` / `* CDNs also do this`
- `Photo's S3 path can be compulrd at` [sic, "computed"]
- `S3:// insta-images / <user_id> / <random photo id>` (green `<user_id>`, purple `<random photo id>`); a yellow connector runs from the `user_id` row to `<user_id>`, a light-blue connector from the `image_id` row to `<random photo id>`.
Change: switch from the live board to the notes.

## S32 - 01:08:15-01:08:30 - Notes: upload via signed URL (b_010820.jpg, b_010825.jpg, b_010830.jpg)
Page above the posts table (heading `1. Uploading photos to S3 using signed URL`, visible at 01:19:15).
Diagram (D-04, first form): see diagrams.md. Text under it: `1. user A talks to` pink `Image Service` `to prepare for upload` / `2.` pink `Image Service` `generates a` green `random image ID` `and talks to S3` (further steps cut off at the bottom).
Emphasis at 01:08:25: red highlighter traces A -> Image Service -> S3.

## S33 - 01:08:40-01:13:00 (b_010840.jpg, b_011300.jpg)
Posts-table notes page again (S31). Emphasis at 01:08:40: red underline under `image_id`. No new content.

## S34 - 01:13:15-01:13:25 - Notes: Posts service validates image ids (b_011315.jpg, b_011320.jpg, b_011325.jpg)
New area of the notes page (zoomed out): `Posts service can also validate that the image_id provided in the request belongs to the same user or not.` Small diagram (D-05): stick user <-> yellow box `Posts Service` <-> cylinder `Posts DB`; a line from the user up to a box `Image Svc`.

## S35 - 01:13:30-01:15:27 - Notes: full photo flow and Kafka partition key (b_011345.jpg, b_011430.jpg, b_011445.jpg, b_011448.jpg, b_011515.jpg, b_011524.jpg, b_011527.jpg)
Diagram D-04 in final form (Posts Service, MySQL, CDC, Kafka, Other Services). New text: purple `Q: what would be the partition key on Kafka Topic?` with an up-arrow to `Kafka`; at 01:15:00 the answer `' user_id '` is shown under it. Section heading `2. Publish photos` visible at 01:14:00. Emphasis at 01:13:45: red scribbles tracing the whole flow. b_011445 is a zoom transition (half screen).

## S36 - 01:15:30-01:17:15 - Notes: overall flow (b_011615.jpg, b_011627.jpg, b_011715.jpg)
Text:
- pink `Overall Flow:`
- `user A uploads photo using Image Service`
- `user A posts the photo` / `↳ creates an entry in post table`
- `user B visits A's profile` / `GET /users/A/posts`
- response sketch: `[ { id: ___ , user_id: ___ , caption: ___ , url: " " } ]`, with an arrow under `url` to `Dynamically generated by backend` and `"https://instacdn.net/A/1234.png"`
- `The image urls are rendered in <IMG /> tag`
- `The photo are loaded from "instacdn"` and `and rendered` (pink curved arrow from "instacdn" to the URL)

## S37 - 01:17:30-01:19:00 (b_011815.jpg, b_011827.jpg, b_011900.jpg)
D-04 notes page re-shown (a small pen mark near the CDN <-> S3 arrow at 01:17:30), zoomed out at 01:18:27; 01:18:30-01:19:00 the live Image Upload Service page scrolled. No new content.

## S38 - 01:19:15-01:20:57 - Notes headings; privacy page (b_012045.jpg, b_012054.jpg, b_012057.jpg)
b_012045: yellow heading `1. Uploading photos to S3 using signed URL` above D-04. b_012054: pan between notes pages.
b_012057: notes page yellow `3. Privacy`:
- purple `Are instagram's private photo really private?` pink `No`
- `Every photo URL has signature (timed) attached in the URL`
- `https://instacdn.net/ul/1729_4275.jpg?` yellow `ig_cache_key = .... &` / `oh = ..... &` / `oe = ..... &` / `nc_sid = ....`
- `when the URL is rendered through IMG tag,` (rest below the fold)

## S39 - 01:21:00-01:22:33 - Instagram demo: inspecting an image URL (b_012115.jpg, b_012118.jpg, b_012124.jpg, b_012127.jpg, b_012130.jpg, b_012145.jpg, b_012148.jpg, b_012157.jpg, b_012200.jpg, b_012203.jpg, b_012209.jpg, b_012212.jpg, b_012215.jpg, b_012218.jpg, b_012230.jpg, b_012233.jpg)
Screen share. `https://www.instagram.com` (01:21:00), devtools Network (01:21:18), then the teacher's own profile `https://www.instagram.com/arpit_bhayani/` (01:21:24 on) with a post opened and the Inspector panel. At 01:22:15-01:22:33 the post's `<img>` element is highlighted: `src="https://instagram.fblr22-1.fna.fbcdn.net/v/t51.2885-15/326657964_1320425908807836_8091776355025969857_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.fblr22-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=...&edm=...&ccb=7-5&ig_cache_key=...&oh=00_AfC8t47...&oe=63FF3A01&_nc_sid=1527a3"` (`crossorigin="anonymous"`, a `srcset` with the same host). Photo contents are not described.

## S40 - 01:22:45-01:29:18 - Signed URL demo: tampering gives "Bad URL timestamp" (b_012300.jpg, b_012500.jpg, b_012530.jpg, b_012542.jpg, b_012545.jpg, b_012548.jpg, b_012600.jpg, b_012603.jpg, b_012609.jpg, b_012700.jpg, b_012845.jpg, b_012900.jpg, b_012903.jpg, b_012909.jpg, b_012912.jpg, b_012915.jpg, b_012918.jpg)
- 01:22:45-01:23:00: the image URL opened in a private-browsing window (image loads).
- 01:23:15-01:25:00: the query string selected in the URL bar: `ig_cache_key=MzAyMTQ1MjU2OTE3MjQ1MTQ5MQ%3D%3D.2-ccb7-5&oh=00_AfC8t47xYY5AmSuW2jr31aFmENKX7hYjVEROrUgjle...`
- 01:25:15-01:25:42: after editing the URL the page shows only `Bad URL timestamp`.
- 01:25:45 onward: with the original URL the image loads again; the teacher toggles between the profile tab and the private window (01:26:00-01:29:09).
- b_012912 and b_012918: gallery view, not kept for publication; b_012915: blank screen.

## S41 - 01:29:30-01:30:57 - Notes: how the CDN checks signed URLs (b_013015.jpg, b_013030.jpg, b_013033.jpg, b_013039.jpg, b_013042.jpg, b_013045.jpg, b_013048.jpg, b_013057.jpg)
Rest of the `3. Privacy` page:
- `when the URL is rendered through IMG tag,` / `the request goes to CDN,`
- `CDN validates the request using the attached keys and` / `if certs are valid and not expired`
- green `it returns the image`
- `Otherwise`
- pink `it returns bad url`
- purple `* The URL is short lived because certs are short lived` (visible from 01:30:42)
Emphasis at 01:30:39: small red pen dash near the URL line.

## S42 - 01:31:00-01:32:42 (b_013100.jpg, b_013115.jpg, b_013118.jpg, b_013215.jpg, b_013230.jpg, b_013233.jpg, b_013239.jpg, b_013242.jpg)
Recap zooms: D-04 notes page zoomed out (01:31:00, 01:31:18); live Image Upload Service page zoomed out showing all its content (01:31:15); D-04 lower half (01:31:30-01:32:15); live CDN page and Image Upload Service page tops (01:32:30-01:32:42). No new content.

## S43 - 01:32:45-01:34:00 - Notes: image optimizations (b_013330.jpg, b_013400.jpg)
Text:
- yellow `4. Image Optimizations`
- `Users belong to different geographies, different network bandwidth,` / `different mobile devices, different processing power`
- light blue `So, sending 5MB photo uploaded by your favourik celeb to all the followers` [sic, "favourite"] / pink `is a very bad idea !`
- to the right, a boxed stick figure with a large head (the celebrity)
- `So we should have different resolutions of photos ready to serve to the users depending on their "stak"` (last word cramped: reads as "stats" or "state"; the audio does not settle it)
- purple `* Instead of building our image optimizer service,` / green `we use CDN that gives this feature out-of-the-box` (01:33:45)

## S44 - 01:34:15-01:37:39 - Notes: resize via CDN query parameter (b_013415.jpg, b_013418.jpg, b_013424.jpg, b_013427.jpg, b_013730.jpg, b_013739.jpg)
New text: `https://instacdn.net/ul/1729_4275.jpg?` yellow `w = 360` (curly brace under `w = 360`) / purple `CDN loads the photo, transforms it to 360px` / `caches it, and sends the transformed photo to the user`. Rest of the period: same page scrolled.

## S45 - 01:37:42-01:39:27 (b_013742.jpg, b_013745.jpg, b_013900.jpg, b_013915.jpg, b_013918.jpg, b_013924.jpg, b_013927.jpg)
Recap scrolls: D-04 notes page (01:37:42, 01:39:27 showing steps 1-2), live Image Upload Service page (01:37:45-01:39:24, including the post / `user.id` / `Caption` / struck `url` list). No new content.

## S46 - 01:39:30-01:47:24 (b_014100.jpg, b_014330.jpg, b_014333.jpg, b_014345.jpg, b_014348.jpg, b_014357.jpg, b_014400.jpg, b_014403.jpg, b_014415.jpg, b_014430.jpg, b_014433.jpg, b_014600.jpg, b_014615.jpg, b_014618.jpg, b_014624.jpg, b_014715.jpg, b_014724.jpg)
Q&A on the D-04 notes page (zoomed out, then zoomed into the upper and lower halves), a pan across the Privacy page (01:46:15), the `4. Image Optimizations` page (01:46:24) and the posts-table page (01:46:30-01:47:24). No new content.

## S47 - 01:47:30-01:56:00 - Notes: HashTag Service (b_014745.jpg, b_015430.jpg, b_015500.jpg, b_015600.jpg)
Pre-written page.
Text:
- yellow `HashTag Service` with an arrow up-right to `Best User Experience`
- page mock (D-06): see diagrams.md; labels `hashtag`, `count of photos`, `top 100 photos`
- right: `- millions of hashtogs` [sic, "hashtags"] / `- assume there is a service that notifies us when it generaks "top" photos for a hashtag` [sic, "generates"]
- yellow `Brainstorm:` `Storage, counting, inter-service communication,`; yellow `large volume` with an arrow to `counting`; purple-star `* super-fast response times`; a down arrow under "communication" to `posts svc to HashTag svc`
- pink `atomicity, partial update` (below, on screen until 01:56:00)
b_015430: participant column hidden (board only).

## S48 - 01:56:15-01:57:30 (b_015630.jpg, b_015645.jpg, b_015648.jpg, b_015654.jpg, b_015657.jpg, b_015700.jpg, b_015703.jpg, b_015730.jpg)
The pink line `atomicity, partial update` is gone (removed by 01:56:15). Page scrolled down to empty ruled space (01:57:00) and back. No new content.

## S49 - 01:57:45-01:58:57 - Live: hashtag document (b_015845.jpg, b_015857.jpg)
Below the Brainstorm block (live writing, white): cylinder (database) on the right; under it a document `{` / `tag: sunset` / `total_photos: 1.2m` / `top_100: [` ... `]` / `}`.

## S50 - 01:59:00-02:01:00 (b_020100.jpg)
Inside the list: `post_id1,` / `post_id2 ...,`; purple `amount of data` below the document.

## S51 - 02:01:15-02:02:15 (b_020215.jpg)
Left of the document: a down arrow and a brace block `{ id / caption / [scribbled-out word] }` (storing the whole post object); a small arrow points at `post_id1`.

## S52 - 02:02:30-02:03:09 (b_020245.jpg, b_020300.jpg, b_020309.jpg)
The list contents, the left object and `amount of data` are erased; only `{ tag: sunset, total_photos: 1.2m, top_100: [ ] }` remains.

## S53 - 02:03:15-02:06:45 - Two ways to store the top 100 (b_020530.jpg, b_020545.jpg, b_020548.jpg, b_020600.jpg, b_020603.jpg, b_020615.jpg, b_020645.jpg)
Text (D-07):
- right option, inside `top_100: [`: `post_id1` / `post_id2` / `:` / `}`; below it green `lastest dat` [sic, "latest data"; cramped] / green `less space` / pink `talk to post DB`
- left option: `{id, capt.., __ }` / `{ ____ }` and two more lines (a list of full post objects); below it pink `large space` / green `fast time` / pink `consistny` [sic, "consistency"]
Emphasis at 02:05:45: red highlighter on one photo tile of the D-06 mock. 02:05:48-02:06:45: scrolls only.

## S54 - 02:07:00-02:08:30 - Counting with batching (b_020800.jpg, b_020815.jpg, b_020830.jpg)
Diagram (D-08, first form): stick user -- `posts` rectangle -> horizontal pipe (queue) -> empty rectangle (consumer) -> arc arrow to the hashtag DB cylinder; green `Batching` above the consumer -> DB arc.

## S55 - 02:08:45-02:09:48 (b_020845.jpg, b_020900.jpg, b_020930.jpg, b_020945.jpg, b_020948.jpg)
Green `hashtag` written above the queue (02:08:45). 02:09:15-02:09:48: the D-04 notes page is re-shown (partition key question with answer `' user_id '`), with a pan past the Privacy page at 02:09:45. No other new content.

## S56 - 02:10:00-02:11:30 (b_021030.jpg, b_021045.jpg, b_021130.jpg)
Queue label changed to green `user_id` (the `hashtag` label replaced). The consumer is now a stack of three rectangles. Emphasis at 02:10:30: red loop around the three consumers with an arrow from the queue.

## S57 - 02:11:45-02:13:15 (b_021215.jpg, b_021315.jpg)
Below the queue: `p1: #sunset #sun #n...` (02:12:15), rewritten as a list `p1: #sunset` / `#sun` / `#nolne` (02:13:15; audio: "hashtag nature"). The `Batching` label and the queue -> consumer arrow are removed.

## S58 - 02:13:30-02:15:15 - Hashtag extractor and second Kafka (b_021415.jpg, b_021430.jpg, b_021515.jpg)
New: a vertical line from the `user_id` queue down to a rectangle labelled at left `htag extraptor` [sic, "extractor"]; a line down from it (triple lines) to a second horizontal pipe labelled `hashtag` underneath; curved lines from that pipe up to each of the three consumer boxes, now labelled `one ht` and `on ws` [illegible abbreviations; audio: counting servers that each own some hashtags]; top right `Count +=n` (partly behind the participant tiles, read in full as `Count t=n'` at 02:17:45). Emphasis at 02:15:15: red circle on the `user_id` queue and red line down to the extractor.

## S59 - 02:15:30-02:20:15 (b_021730.jpg, b_021745.jpg, b_021800.jpg, b_021803.jpg, b_021815.jpg, b_021824.jpg, b_021827.jpg, b_021900.jpg, b_021930.jpg, b_021942.jpg, b_022000.jpg, b_022003.jpg, b_022015.jpg)
New: the extractor is drawn as two stacked rectangles; `County` [sic, "Counting"] above the counter boxes; several strokes fanning into the `user_id` queue from above (other readers of the same topic). Emphasis: red ellipse on the D-06 photo tiles (02:17:45), red ellipse on `* super-fast response times` (02:18:24), red circles on the full-object list and on the `post_id` list (02:18:27), red circle on the `post_id` list (02:19:30), red underline under `assume there is a service that notifies us when it generates "top" photos` (02:20:15). No other new content.

## S60 - 02:20:30-02:23:09 - Data-science feed (b_022115.jpg, b_022245.jpg, b_022300.jpg, b_022309.jpg)
02:20:30-02:21:15: the `hashtag` pipe is lasso-selected (no new content). New at 02:21:30-02:22:45: bottom-left stick figure `DS` -> line -> horizontal pipe -> line -> small trapezoid box (consumer) -> long line curving right and up into an arrow pointing at the hashtag DB cylinder.

## S61 - 02:23:12-02:25:00 - Notes: HashTag Service architecture (b_022312.jpg, b_022315.jpg, b_022400.jpg, b_022430.jpg, b_022445.jpg, b_022448.jpg, b_022500.jpg)
Pre-written page with diagram D-09 (see diagrams.md) and:
- yellow `Key Takeaways:` / `- Kafka as a glue` / `- Adapter pattern` / `- Effective batching and counting` / `- READ and WRITE path optimizations`
Change at 02:23:30: the top-left box `Image Service` is overwritten by a hand-drawn white box `Post Svc` (audio 02:23:11: "not image service, but this is your post service").
Emphasis at 02:24:45: red circles on the user and on `HashTag API`. b_022500 (02:25:00): the live D-08 sketch zoomed out (with the DS path), no new content.

## S62 - 02:25:03-02:28:00 - Notes: read path and write path (b_022503.jpg, b_022509.jpg, b_022700.jpg, b_022715.jpg, b_022718.jpg, b_022727.jpg, b_022730.jpg, b_022800.jpg)
Pre-written page with diagram D-10 (Post Service variant) and:
- cyan `Key value based access` / `For a key (hashtag) get the value (details)`
- yellow `WRITE PATH Optimization` / `- Ingestion in kafka` (rest below the fold); right yellow `Requirements from storage ?` / `- Partial updates`
b_022509: pan showing half of the next notes page (`challenge: POST_PUBLISH to...`, see S64). 02:25:15-02:27:27: D-09 page re-shown; emphasis at 02:27:18: red scribble tracing `Popularity Svc` -> `Their Kafka` -> `Workers` -> DB and a circle on `Partitioned DB`.

## S63 - 02:28:15-02:29:15 - Notes: alternate read/write page (b_022815.jpg, b_022818.jpg, b_022824.jpg, b_022830.jpg, b_022839.jpg, b_022842.jpg, b_022915.jpg)
A second notes page with the same read/write diagram but `Image Service` as the writer. Above it: `... counting : Batching → Partitioning` (start cut off at the page edge; "Large volume" by context) / `... HashTag API servers won't count.` / `worker nodes batch and update`. Below it: purple `A good way to optimize systems is to identify the` (next line under the fold at this time; full line in S72). b_022824 pans past a pink box `HashTag Service` with an up arrow and the text `for a hashtag` on the page to the left. Emphasis at 02:28:30-02:28:39: red circles on `HashTag API`, the user, and the DB (read path). 02:28:45-02:29:15: back to the D-10 page lower half (`WRITE PATH Optimization`, `Requirements from storage ?`).

## S64 - 02:29:24-02:33:42 - Notes: the partitioning challenge (b_022924.jpg, b_023030.jpg, b_023042.jpg, b_023115.jpg, b_023127.jpg, b_023130.jpg, b_023145.jpg, b_023148.jpg, b_023230.jpg, b_023245.jpg, b_023248.jpg, b_023254.jpg, b_023257.jpg, b_023330.jpg, b_023342.jpg)
Notes page (shown 02:29:24 and 02:32:57; full width at 02:38:15):
- yellow `challenge :` pink `POST_PUBLISH topic is partitioned by post_id or user_id`
- `But for our batching and counting to work, we need an event per hashtag.`
- `Post Service` -- yellow pipe `Kafka` (line down to the next block)
- right: `if a post has 8 hashtags we would need one event for each hashtag so that we can count and batch` green `efficiently`
- purple `So, we have to write an adapter that`
- `- reads` pink `POST_PUBLISH` `events from kafka`
- `-` pink `extracts` `all hashtags from the post`
Between those times the D-10 page is on screen (02:29:30-02:33:42); emphasis at 02:32:30: red circles on the GET request, the `Cache`, and the DB arrow (read path).

## S65 - 02:33:45-02:34:15 - Notes: hashtag extraction and repartitioning (b_023345.jpg, b_023400.jpg, b_023415.jpg)
Continuation of the challenge page:
- `- creates 'n' new events on topic` pink `POST_HASHTAG` `for n hashtags` / purple `partitioned by hashtag`
- Diagram D-11 (see diagrams.md) with `post_1729:` / `#sunset` / `#sun` / `#nature`, pink `Topic: POST_HASHTAG` cyan `partitioned by hashtag`
- next block: purple `#consumers = # partitions`; purple `Repartitioning and reindexing`; white `Batch and partially update [per hashtag]`
Emphasis at 02:33:45: red arrow from the `Kafka` pipe into `HashTag Extraction`.

## S66 - 02:34:30-02:38:45 (b_023500.jpg, b_023515.jpg, b_023518.jpg, b_023527.jpg, b_023630.jpg, b_023700.jpg, b_023730.jpg, b_023800.jpg, b_023815.jpg, b_023818.jpg, b_023845.jpg)
Recap scrolls: D-09 page (emphasis at 02:35:00: red circle around `Their Kafka` and a dash over `Popularity Svc`), D-10 page (02:37:15-02:38:00, 02:38:18), challenge page full width (02:38:15), D-11 page (02:38:30-02:38:45). No new content.

## S67 - 02:39:00-02:41:48 - Live annotation: tuples and counts (b_024130.jpg, b_024145.jpg, b_024148.jpg)
Written on the D-11 page: white `<h1, p1>` above the `POST_HASHTAG` pipe (hashtag, post tuple) and `{ h1: int }` (in braces) left of `Counting Servers` (an in-memory count per hashtag). Both are erased by 02:41:45.

## S68 - 02:42:00-02:53:00 (b_024500.jpg, b_024545.jpg, b_024630.jpg, b_024830.jpg, b_024845.jpg, b_024857.jpg, b_024945.jpg, b_024957.jpg, b_025015.jpg, b_025100.jpg, b_025300.jpg)
Q&A on the D-09 page (zoomed, scrolled to the takeaways and back). Emphasis at 02:48:30: red curve around `Popularity Svc` and its `per hashtag popular photos` arrow. No new content.

## S69 - 02:53:15-02:56:45 - Dead letter queue (b_025600.jpg, b_025612.jpg, b_025645.jpg)
New white text above D-09: `"Dead Letter Queue"` (in quotes; written around 02:54:46, audio "What you need to know is dead letter queue. Look up this.").

## S70 - 02:57:00-03:11:33 - Kafka horizon and last commit (b_030030.jpg, b_030145.jpg, b_030315.jpg, b_030330.jpg, b_031115.jpg, b_031130.jpg, b_031133.jpg)
New green sketch at the top right (D-12): a long horizontal stream inside an ellipse with tick marks (messages); `H` at the left end (horizon), `LC` above a circled message (last commit), another circled message near the right end, `...` beyond. Emphasis at 03:00:30: red circle on the `Kafka` pipe with a red arrow down to a red box (a consumer); at 03:03:15: red strokes at `H`, near the right end (a red `C` [cut off]) and an arrow down from `"Dead Letter Queue"`.

## S71 - 03:11:45-03:16:03 (b_031200.jpg, b_031415.jpg, b_031500.jpg, b_031545.jpg, b_031600.jpg, b_031603.jpg)
Scrolls of the D-09 page (takeaways, middle section) and the D-10 page top (03:16:00). No new content.

## S72 - 03:16:09 - Notes: read path optimizations (b_031609.jpg)
Lower part of the alternate read/write page (S63):
- purple `A good way to optimize systems is to identify the` / green `READ PATH` `and` green `WRITE PATH` purple `and optimize them indepenc` [cut off, "independently"]
- yellow `READ PATH optimizations:` / `- Centralized cache` / `- Hashtag API to do bare minimum work ✓` / `- DB should be able to handle reads ✓` (green ticks)

## S73 - 03:16:15-03:16:42 - Notes: key requirement (b_031630.jpg, b_031642.jpg)
Text:
- yellow `Key requirement:` purple `Superfast response times`
- `One request /hashtag/<tag> →` pink document `{ tag: "___", total_photos: ___, top_photos: [ (four pink lines) ] }`
- light blue `Anything and everything we need, should be`
- `1. returned in a single response`
- `2 pre-compuked and pre-evaluakd` [sic, "pre-computed and pre-evaluated"]
- yellow `CORE of our system` with an arrow up to the two points

## S74 - 03:16:45-03:26:15 - Wrap-up on the architecture (b_031700.jpg, b_031730.jpg, b_032115.jpg, b_032200.jpg, b_032215.jpg, b_032245.jpg, b_032330.jpg, b_032400.jpg, b_032412.jpg, b_032615.jpg)
D-09 page with the DLQ note and D-12 sketch. Emphasis at 03:17:00: red circles around the `POST_HASHTAG` pipe and `Counting Servers` with red arrows radiating up from `POST_HASHTAG` (other services can also consume it). Remaining frames are scrolls to the end of the session. No new content.
