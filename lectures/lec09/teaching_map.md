# Teaching Map - Lecture 09 (Week 4, Day 1): Social networks - how CDN works, image upload service (pre-signed URLs), hashtag service

Source: `lectures/lec09/transcript/transcript.md` (03:26:35). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **day 1 of week 4** ("Great week 4, day 1st, it's about social networks", 00:00:02). It opens the social-network block and leans on earlier weeks: the "six components" of week 1 (00:03:30), Kafka partitions / hash-based partitioning / consumers from "second week" (02:14:42, 02:37:57), commits and consumer groups (lecture 1 delegation), and the week-2 chat design that used real-time Redis Pub/Sub (student at 02:43:06, teacher at 02:46:24). Lecture 8 deferred "CDN in depth" to "next week" (lec08 map, 01:06:50) - this lecture delivers it, but explicitly as a **black box an engineer uses**, not CDN internals (00:00:45, 00:05:57). The spine is **Instagram**: its year-one stack (D-01), then two Instagram features designed end to end - photo upload/serving (D-03, D-04, D-05) and the hashtag page (D-06 -> D-09). Two live demos carry the first half: the teacher's own website behind a CDN alias (00:19:12) and GitHub's issue-attachment upload as a stand-in for Instagram's (00:44:54), plus a live "private" Instagram photo opened in an incognito window (01:20:56).

Speaker note: the transcript's `Student 1` label is a diarization bucket that covers **several different students** called on by name; this map keeps the transcript's labels (`S1`, `S2`, `S3`, `S4`, `S6`, `S8`, `S9`) and uses `S?` for unlabelled student turns, so "S1" in two rows is not necessarily the same person.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:02 | 00:01:12 | 1 | Admin: agenda - social networks, CDN as a black box, Instagram year one, hashtag service | Promise: "such a simple problem... it would still blow your mind" (00:00:02) | "Just want to tell some kind of story" |
| 1 | 00:01:12 | 00:05:57 | 5 | **Tech-stack waves; Instagram's year-one architecture** (D-01) | **Story first**: Facebook made PHP/MySQL the default 2008-2012; Instagram (14M users, 3 engineers) made Django/Celery/RabbitMQ/Redis/Postgres the default | "Now we are due for a new tech stack" -> "keep an eye on it" -> "before we jump into designing two systems... how CDN works" |
| 2 | 00:05:57 | 00:30:17 | 24 | **How CDN works** (as a black box) | **Misconception first** ("a lot of people don't know how CDN works", "CDN is not something where you push things") | Last question (live content) deferred -> "Now we'll move to the first system" |
| 2a | 00:05:57 | 00:10:34 | 4.5 | CDN transparently between user and origin; origin = anything; the bandwidth "crime" of serving 10 MB images from API servers; geography (Singapore -> US) | Definition, then **problem walk-through without CDN** (DNS -> LB -> backend reads image) (D-02) | "But now how? How is CDN actually configured?" |
| 2b | 00:10:34 | 00:19:12 | 8.5 | CDN property mapping (a.mycdn.net -> origin), DNS points to CDN, path replacement, first-request miss / later hit, no per-path config, "for CDN it is just bytes", saves backend bandwidth/cost, any URL can be an origin | **Mechanism traced request by request** on the board; "sign up for a free trial and configure it" | "Let me give you a quick demo" |
| 2c | 00:19:12 | 00:22:43 | 3.5 | Demo: teacher's site images served from his CDN alias; origin configured as `/static`; "normal string concat" | **Live demo** in the browser | "Any questions on this?" |
| 2d | 00:22:43 | 00:30:17 | 7.5 | Q&A: private content, how the user learns the CDN URL, replacing URLs in pages, invalidation (TTL or purge API), live content | Student-driven; teacher pushes "play around with CDN before you ask" | "Last question before you move forward" |
| 3 | 00:30:17 | 00:57:12 | 27 | **Image upload service: storage and data flow** | **Brainstorm agenda on the board** (storage, data flow, separation of concerns, privacy, extensibility, optimization; requirement 5M uploads/day - board, L-0063) | "Any questions on this before we go into other aspects?" |
| 3a | 00:30:17 | 00:32:03 | 2 | Where to store images -> blob storage (S3/GCS) because "dirt cheap" | **Open question to class** (P2) | "But now how would this image be uploaded?" |
| 3b | 00:32:03 | 00:39:25 | 7.5 | Upload through API servers: chunking rejected (5 MB fits one request), async rejected (UX), failure = retry, real problem = bandwidth/memory, dedicated upload service, student proposes pre-signed URLs | **Socratic ladder**: each student answer is met with "why?", "how big?", "what's the problem?", "can we do better?" (P3-P7) (D-03) | "Let me just basically converge on this" |
| 3c | 00:39:25 | 00:44:54 | 5.5 | Pre-signed URL formalised: saves server bandwidth and 2x transfer/egress; prepare phase (random image ID + signed path) -> direct POST to S3; why not an open bucket; expiry; fewer servers, native security | Teacher restates the student's proposal and names the gain | "Let me show you a demo" |
| 3d | 00:44:54 | 00:57:12 | 12 | GitHub demo: metadata-only first call, response with S3 upload URL + CDN href, form fields (key, ACL, policy, signature), direct POST to S3, image then served from GitHub's CDN; "this is actually your Instagram image upload" | **Live DevTools demo on a different product** ("system design is all about building blocks... Ctrl-C, Ctrl-V") | Questions |
| 4 | 00:57:12 | 01:04:29 | 7 | **Q&A**: content moderation, where the CDN URL comes from, why send the CDN URL, CDN vs S3 speed (geography, SSDs, guarantees, egress), how CDN reads a private bucket | Student-driven | "Take out $100 from a salary... play around"; teases privacy myth; "we discussed storage, how the data would flow" |
| 5 | 01:04:29 | 01:18:34 | 14 | **Separation of concerns** | **Open question** "What would your post table look like?" -> the predictable wrong answer (URL column) is struck through on the board (D-03, S30) | "Now what next? We covered storage, data flow, separation of concerns" |
| 5a | 01:04:29 | 01:13:20 | 9 | "If something is derivable, don't store it": store user_id + image_id, compute S3/CDN path; CDN/cloud switch stories (Instagram -> FB CDN, Bing pricing), 20% CDN A/B, deleting from S3 | **Wrong answer first** ("every single cohort... thinks of building it like this") then **what-if provocations** (change CDN, change cloud) | "This tells us... another interesting thing, a post service" |
| 5b | 01:13:20 | 01:15:02 | 1.5 | Post service; flow upload -> post; image and post linked only by image_id; videos/reels/stories reuse "post" | Notes pages (D-04, D-05); extensibility argument | "Now, how will this image be served?" |
| 5c | 01:15:02 | 01:18:34 | 3.5 | Serving: user B GETs A's posts, backend builds `instacdn.net/A/<id>.png` on the fly, IMG tag -> CDN -> S3 on miss; add a second CDN seamlessly | **Callback** to the 00:24:50 question ("coming to that question from the first discussion") | "Now, elephant in the room, privacy" |
| 6 | 01:18:34 | 01:31:34 | 13 | **Privacy** | **Provocation** ("There is nothing called privacy... I can access that") then **live proof** | "Now let's talk about extensibility" |
| 6a | 01:18:34 | 01:23:21 | 5 | Photos of private accounts are still on the CDN; anyone with the URL can open it until expiry; demo: copy a private-profile photo URL into incognito - "privacy is a myth" | **Live demo** (class confirms the profile is private) | "Now, let's see how it actually works" |
| 6b | 01:23:21 | 01:29:31 | 6 | URL anatomy (fbcdn.net, path, query params); CDN is stateless, no notion of users; removing params -> "Bad URL timestamp"; real privacy enforced by the API not returning URLs; pseudo privacy; true privacy = everything via API servers, 50-100x servers | Demo continues; **cost argument** for why Instagram accepts pseudo privacy | "So let me formally cover it" |
| 6c | 01:29:31 | 01:31:34 | 2 | Timed signatures "exactly same as JWT": expiry baked into URL + signature; CDN checks, returns image or "bad URL" | **Analogy to a known tool** (JWT) | "This is what I'll like skim through, extensibility" |
| 7 | 01:31:34 | 01:39:40 | 8 | **Extensibility and optimization; recap** | Checklist-driven (the brainstorm list from 00:30:17) | "I will take questions till 10:15" |
| 7a | 01:31:34 | 01:32:36 | 1 | Kafka as glue: post published -> search, analytics, notification, feed consume at own pace | Brief assertion, deferred depth | "And then the final part, optimization" |
| 7b | 01:32:36 | 01:37:33 | 5 | Optimization = reuse what exists: CDN image transforms via query param (`w=360`), frontend appends width, CDN processes once and caches; other transforms | **Human scenario** (Sachin Tendulkar's 50 MB photo, tier-3 user on Jio) | "This is what I wanted to cover" |
| 7c | 01:37:33 | 01:39:40 | 2 | Recap of image upload service; "I could have just drawn this box... that's not what real engineers do" | Summary | Questions before the break |
| 8 | 01:39:40 | 01:47:21 | 7.5 | **Questions before the break**: OTT auth (deferred), proprietary formats vs DRM (teacher's DRM/piracy story), orphan uploads, why Kafka, nearest CDN (BGP/DNS), how S3 locates an object | Student-driven | Break |
| 9 | 01:47:21 | 01:54:59 | 7.5 | Admin: break; mic check | - | - |
| 10 | 01:54:59 | 02:23:11 | 28 | **Hashtag service brainstorm** | **Product screen first** (D-06: `#sunset`, `1.2m photos`, top-100 grid) with explicit boundary: data science gives the top 100 ("black box") | "Just to basically formally cover it" -> full flow |
| 10a | 01:54:59 | 02:03:02 | 8 | Problem statement; storage: design from the page you render; one document per hashtag (tag, total, top-100 array); post IDs vs full posts; "don't add new requirements" | **Open question** (P17) with heavy redirecting of student answers (D-07) | "Let me formally cover this" |
| 10b | 02:03:02 | 02:06:35 | 3.5 | Two ways to store the top 100: post IDs (less space, cacheable, latest data, extra call) vs full posts (fast, large, consistency pain); "depends on the UX you provide" | **Contrast table** on the board (D-07) | "Now let's talk about counting" |
| 10c | 02:06:35 | 02:15:50 | 9 | Counting: not real time -> Kafka consumer batching; partition key must be user ID (multi-hashtag posts, same topic as other services); batching needs all posts of a hashtag on one server; Redis Pub/Sub rejected; hint post 31; adapter: extract + re-ingest into hashtag-partitioned topic; hash partitioning != one partition per hashtag | **Open question -> failure scenario** (#sunset on three servers) -> **hint** -> student reaches the answer (P18-P20) (D-08) | "This is a very standard principle of large volume counting" |
| 10d | 02:15:50 | 02:18:17 | 2.5 | Large-volume counting = batching (bulk insert ~100x); adapter pattern found only via implementation; recounts tolerated, relaxed consistency at scale | Principle named after it was derived | "We covered storage... counting... super fast response time" |
| 10e | 02:18:17 | 02:23:11 | 5 | Everything in one document for one-shot render; top 100 from data science via their Kafka, not a sync call (uptime coupling); "it's not a service, it's a process"; Kafka as glue; CQRS mention | **Open question** (P21) with a student who keeps proposing calls/services | "This is what our flow would look like" |
| 11 | 02:23:11 | 02:35:46 | 12.5 | **Hashtag service full flow, read/write paths, takeaways** | **Notes-page architecture** (D-09, D-10, D-11) | "Now I'll take questions" |
| 11a | 02:23:11 | 02:27:28 | 4 | Post svc -> Kafka -> extractor -> POST_HASHTAG -> counting servers (count += n) -> DB; hashtag API workers; CDN (caches JSON) or cache with TTL/invalidation; popularity service via their Kafka, low throughput | Walk the drawn architecture left to right | "Let me just formally cover it... very nice way of looking into systems" |
| 11b | 02:27:28 | 02:34:37 | 7 | **Read path / write path optimization**: identify both, tackle one at a time, "blow it out of proportion" at each step; read path = cache/CDN/replicas/partitions; write path = one write to Kafka, workers = partitions, atomic/partial updates, batching -> repartition | **Method lesson** ("how almost every single senior engineer works"), replayed on the hashtag design; an interruption breaks the flow (02:30:59) | Key takeaways |
| 11c | 02:34:37 | 02:35:46 | 1 | Takeaways: Kafka as glue, adapter pattern, effective batching and counting, read/write path optimization | Board list (D-09) | Wrap-up |
| 12 | 02:35:46 | 02:36:28 | 0.7 | Admin: next class - implement image optimization service; message-indicators problem; recording by evening | - | Q&A |
| 13 | 02:36:28 | 03:25:58 | 49.5 | **Open Q&A** | Student-driven | Class wrap-up |
| 13a | 02:36:28 | 02:43:06 | 6.5 | Read/write path vs separate services; how a counting server groups hashtags (hash map, tense exchange); popularity service consuming POST_HASHTAG | Student-driven | Next question |
| 13b | 02:43:06 | 02:51:20 | 8 | Redis Pub/Sub (chat) vs Kafka (counting): persistence, push vs pull, DB slowness; webhooks vs Kafka for popularity updates; atomic counts; replacing the top-100 array; partitions per user ID | Student-driven; teacher praises ("Great question. Loved it") | Next question |
| 13c | 02:51:20 | 03:03:37 | 12 | SLAs: Kafka is a cluster, ~99.9%, writes lost when down -> DLQ / buffer / drop; SLA = consumption speed, partitions + workers; stateful vs stateless; Uber SOS; leaderless replication; Kafka retention, horizon, commit/checkpoint, where a consumer starts, retention cost, archive to S3 (D-12) | Student-driven; drawn stream with `H` and `LC` | Next question |
| 13d | 03:03:37 | 03:11:37 | 8 | More servers vs optimizing (management/engineering cost), application-level profiling on a 10% canary slice, New Relic/Datadog/cProfile; CPU vs RAM ("CPU, memory, network and disk"); goroutines | Student-driven | Next question |
| 13e | 03:11:37 | 03:17:50 | 6 | Hashtag DB garbage collection -> size math (436 B/doc); thousand vs million vs billion; 1M images per hashtag -> paginate outside the document; in-memory queue vs Kafka for counting | Student-driven; teacher does **back-of-envelope live** | Next question |
| 13f | 03:17:50 | 03:25:58 | 8 | Kafka as storage (no: access pattern, transactions) vs Kafka as first point of entry (analytics ingestion); DLQ for Kafka writes (SQS/RabbitMQ), outbox; MapReduce/Spark can replace counting servers; how to learn Spark; "implement" | Student-driven; teacher delighted by the "first point of entry" question | Wrap-up |
| 14 | 03:25:58 | 03:26:36 | 0.6 | Admin: class wrap-up; tomorrow "another high level pattern, very counterintuitive" | - | End |

Time budget: tech-stack story 5 min, CDN 24 (7.5 of it Q&A), image upload 27 + Q&A 7, separation of concerns 14, privacy 13, extensibility/optimization/recap 8, pre-break Q&A 7.5, hashtag brainstorm 28, full flow + read/write path 12.5, open Q&A 49.5. Roughly **35% of the lecture is Q&A**, and the second-half Q&A carries real new content (Kafka retention/horizon/commit, DLQ, Kafka as first point of entry, profiling, size math) that must be folded into the topic sections, not left as an appendix.

**Introduction patterns observed** (reusable templates):
- **Black-box mechanism, request by request** (CDN): definition -> the costly world without it -> one request traced (miss) -> the next request (hit) -> "that's all a CDN does" -> live demo on the teacher's own site.
- **Socratic ladder with escalating "can we do better?"** (upload data flow): each student answer is either deflated with a number ("How big? 5 MB") or a user-experience scenario ("it takes one hour... poor user experience") until a student reaches the pre-signed URL; the teacher then formalises and demos.
- **Predict the wrong schema, strike it through** (separation of concerns): asks for the post table, waits for the URL column, circles and crosses it out, then states the rule and stress-tests it with what-ifs (switch CDN, switch cloud, 20% A/B, delete).
- **Myth -> live proof -> mechanism -> cost reason** (privacy): "privacy is a myth" -> incognito demo -> query-parameter anatomy -> JWT-like signatures -> why Instagram accepts pseudo privacy (50-100x servers).
- **Screen first, boundary declared, then build the pipeline by breaking it** (hashtag): mock page -> "data science is a black box" -> storage -> counting -> partition key conflict -> failure scenario (#sunset on three servers) -> hint -> adapter -> named principle.
- **Method lesson replayed on the design just built** (read path / write path).
- **Everything is a real product**: every abstract step is anchored on Instagram or a product the class can open (GitHub, the teacher's website, Instagram itself).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:08:29 | "What happens when someone hits this image path in the browser? What would happen?" (rhetorical) | - | Walks DNS -> LB -> backend -> image; "the bandwidth of my backend server is getting consumed for something which is almost static" | Serve near-static, heavy bytes from a CDN (L-0023, L-0024, L-0025) |
| P2 | 00:31:03 | "Where would you store these images and why?" | S1: blob storage (S3), cheaper, can compress, online support | "You can also do it on other places, but why this? Because it's dirt cheap" | S3/GCS, cost (L-0064) |
| P3 | 00:32:03 | "How would this image be uploaded? How does this entire communication happen?" | S1: persistent connection, send in chunks | "How big is your image? ... Why overkill? In one HTTP request you can send 5 MB"; "easy to build complex systems, exponentially difficult to build simple systems" | One plain HTTP request (L-0065, L-0066, L-0067) |
| P4 | 00:34:01 | "Will you send image like this? User makes an API call to the API server and then API server copies it to S3." | S1: accept and upload to S3 asynchronously | "Imagine you using Instagram... it takes one hour... Poor user experience" | Must be synchronous if it has to show instantly (L-0069, L-0070) |
| P5 | 00:35:10 | "What's the problem in this approach?" | S1: server can fail mid-upload and lose the image; S1: 5 MB requests eat bandwidth needed by other calls | Failure -> "you will send 5xx, user will do a retry. Simple." Bandwidth -> accepted and sharpened: network card physical limit + memory | Bandwidth/memory of API servers is the real problem (L-0071, L-0072) |
| P6 | 00:36:02 | "If you want to protect the bandwidth of your API servers, what will you do?" | S1: a specialised upload service with bigger network card that proxies to S3 | Draws it; "Okay, can we do better?" | Intermediate step (L-0073, L-0074, L-0075) |
| P7 | 00:37:23 | "Can we do better?" | S1: pre-signed URLs signed with IAM credentials; fetch URL from API server, then PUT/POST directly to S3, URL expires | Probes the student's half-answer: "What's your first step?", "Where are you uploading?", "How does that happen?" | Direct upload to S3 via pre-signed URL (L-0076, L-0077) |
| P8 | 00:39:18 | "With this, what you gain by uploading directly to S3 and not going via image upload?" | (teacher answers) | Saves bandwidth on the service + "twice the data transfer"; egress/ingress billed per hop | 1 x 5 MB transfer instead of 2 x (L-0078, L-0079 - see factcheck L-0079) |
| P9 | 00:42:01 | "Why do we need to over complicate the pre-signed URL?" (rhetorical) | - | Open bucket = anyone uploads their data on your bill | Signed, path-scoped, time-limited permission (L-0083, L-0084) |
| P10 | 01:04:29 | "Imagine Instagram. What would your post table look like? What all would you store?" | S2: user ID, caption, tags, created_at, photo URL (the pre-signed URL) | Tags are part of the caption; "Not pre-signed URL, the actual CDN URL" -> then "this is suboptimal": don't store derivable values | posts(id, user_id, image_id, caption); path computed (L-0121, L-0122, L-0123, L-0124, L-0125, L-0133) |
| P11 | 01:06:05-01:07:17 | "Will you store S3 URL? Will you store CDN URL? ... What if tomorrow you change your CDN provider? ... What if you change your cloud provider?" (rhetorical) | - | Instagram CDN migration after acquisition; Bing price hike 4-10x | Store the crux, derive URLs (L-0126, L-0127, L-0128, L-0129, L-0130) |
| P12 | 01:10:08 | "How will you implement putting 20% traffic on [another] CDN?" (rhetorical) | - | Impossible with stored URLs; with derived URLs a random number in the handler picks CDN A or B | Generate URL per request (L-0139, L-0142, L-0143) |
| P13 | 01:12:23 | "How will you delete something from S3 where you don't know the path?" (rhetorical) | - | "Trim off the CDN part and do this and that. Worst way to build a system" | Compute path from user_id + image_id (L-0145) |
| P14 | 01:15:02 | "How will my user get the CDN URL?" (callback to 00:24:50) | - | Backend generates `instacdn.net/A/<id>.png` in the response | Dynamically generated by backend (L-0153, L-0155, L-0156) |
| P15 | 01:21:00 | "Can someone just confirm my profile is private?" (demo participation) | Class: "it's private" (01:22:08) | Opens a photo URL in incognito - it loads | Anyone with the URL can view until expiry (L-0166) |
| P16 | 01:23:21 | "Then what is this privacy all about? How do these companies implement private photos?" | - | URL anatomy; remove params -> "Bad URL timestamp" | Signed, expiring URLs + API that withholds URLs (L-0167, L-0171, L-0172) |
| P17 | 01:56:20 / 01:57:38 | "How would you store data? Where would you store data?" -> "This is the page that you have to render. What are you storing in order to render this page?" | S2: tags table + tags in photos table; then tag table + KV store; then one store with tag, count, top-100 array of photo URLs or post IDs; S1: post IDs are derivable and smaller; full posts also possible; S?: "less data to fetch" | Photos table "out of question"; "two databases there"; data science computes top 100 - "why are you assuming?"; "What's the advantage of storing post ID?" asked three times; "If we don't think of all possibilities, whatever I think seems optimal, but it might not be" | One document per hashtag; post IDs vs full posts trade-off (L-0214, L-0215, L-0216, L-0217, L-0219, L-0220, L-0221, L-0222) |
| P17b | 02:02:34 | (student adds) Instagram shows all photos for a hashtag | S1 | "Don't add new requirements to the system, because that requires different design" | Stick to top 100 (L-0227, L-0228) |
| P18 | 02:06:35 | "How would you update total number of photos? ... You do count++ over here. How will you do that?" | S6: does not need to be real time; Kafka consumer extracts hashtags, holds ~1000 posts in memory, writes per-hashtag counts in batches | "So this is your post service... You push it to Kafka" | Async batched counting (L-0235, L-0236, L-0237, L-0238) |
| P19 | 02:08:00 | "What would be the partitioning key of this Kafka?" | S6: not sure hashtag is good "because there's so many of them" | "Even if there are multiple values... it will pass to the hash function"; real problems: a post has many hashtags, and it is the same topic every other service reads | Partition by user ID (L-0239, L-0240, L-0241, L-0242) |
| P20 | 02:10:05 / 02:11:54 | "What if hashtag sunset goes to three different servers? ... Post 31 is published: #sunset, #sun, #nature. How would this go over here? Now start." | S1: Redis Pub/Sub, one channel per hashtag; S1 (after hint): consumers parse hashtags and write them to another Kafka partitioned by hashtag, "like how search index works" | Pub/Sub: "millions of hashtags... overkilling the infra... potential data loss"; repartition: "that's exactly what I wanted to bring out" | Adapter: extractor re-ingests into POST_HASHTAG, counting servers do count += n (L-0243, L-0244, L-0245, L-0246, L-0247, L-0248, L-0249, L-0250) |
| P21 | 02:19:13 / 02:20:42 | "How would this top 100 come over here? ... How are they notifying us? Will they give us a call?" | S1: define the criteria and sort; call the data science service; a separate always-listening service | "Black box for us"; "We cannot call it. We have to store the data over here"; "It's not a service. It's a process" | Data science pushes to Kafka, a worker consumes and writes the document (L-0259, L-0260, L-0261, L-0262, L-0263) |
| P22 | 02:22:29 | "Why are we doing this?" (rhetorical) | - | Sync dependency couples our uptime to theirs | Model it asynchronously (L-0264) |
| P23 | 02:28:20-02:29:21 | "Have we optimized our read path? ... Are you doing enough on the write path?" (rhetorical, method) | - | Step-by-step questions per hop | Read path: cache/CDN; write path: one write, workers = partitions, batching (L-0280, L-0281, L-0282, L-0283) |
| P24 | 02:31:35 / 02:32:52 | "What can go wrong over here? ... I make eight writes onto this DB. Is this optimal or not?" | - | "Making everything blow out of proportion and fixing it. One path at a time" | Replicas/partitions/cache/CDN on read; batching via repartition on write (L-0285, L-0286, L-0287, L-0288) |
| P25 | 03:12:21 | (reverse, on a student's GC question) "What are you collecting? ... what you're storing is very minimal" | S2: TTL 7-8 days to remove garbage hashtags | Don't delete (old hashtag may become popular); size it: 436 B -> ~512 B per doc | Not worth collecting (L-0342, L-0343) |
| P26 | 03:15:04 | (reverse) "You said how many? 1 million? You just scaled your requirements by thousand X." | S2: paginated store outside the document | "Just the first page" in the document | Keep page 1 in-doc, rest elsewhere (L-0347, L-0348, L-0349 - see factcheck L-0347) |
| P27 | 03:18:23 | (reverse) "Lookups, get a post by ID, will you be able to do that on Kafka?" | S2: why not store data in Kafka | Access pattern + transactions | Kafka is a broker; first point of entry for high-volume ingestion (L-0352, L-0353, L-0354) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Your API servers receive 5 MB photos and copy them to S3. What is actually wrong with that - and how could the photo reach S3 without passing through your servers at all, without opening the bucket to the world?"** (P3-P9, 00:32:03-00:44:03). The lecture's best ladder: a reader can propose chunking, async, a dedicated service, and see each rejected for a concrete reason before the pre-signed URL appears. Strong because the obvious objection (server crash) is the wrong one and the real one (bandwidth, 2x transfer) is quantitative.
2. **"Design Instagram's posts table. Would you store the image URL? Now your company is acquired and must switch CDN - what breaks?"** (P10-P13, 01:04:29-01:12:50). The teacher predicts readers will add a URL column ("every single cohort"); the what-ifs (CDN switch, cloud price hike, 20% A/B, delete) make the rule "don't store derivable values" stick.
3. **"A private Instagram account's photo is served from a CDN that knows nothing about followers. Who can open that photo, and for how long?"** (P15-P16, 01:18:34-01:30:36). Counter-intuitive, verifiable by the reader in their own browser; leads to signed expiring URLs and the cost of true privacy.
4. **"Counting #sunset: your Kafka topic is partitioned by user ID and three #sunset posts land on three servers. Why can't you batch, why can't you just re-key the topic by hashtag, and what would you add?"** (P19-P20, 02:08:00-02:15:17). The core "aha" of the second half (the adapter / repartition); the two constraints (multi-hashtag posts, shared topic) are both discoverable.
5. **"The hashtag page must render in one request. What exactly is in the document, and for the top 100 - post IDs or whole posts?"** (P17, 01:56:20-02:06:13). A clean trade-off (space, speed, freshness, consistency) whose answer is "depends on the UX you show".
6. **"Data science recomputes the top 100 for a hashtag. Should your page call their service, receive a webhook, or read from a Kafka topic?"** (P21-P22, 02:19:13-02:22:29; Q&A 02:46:46). Three options, one sync-coupling lesson plus the "humans" argument about ownership.
7. **"Why does a 5 MB image not need chunking or a persistent connection?"** (P3, 00:32:57). Short, numeric, anti-over-engineering; pairs with "easy to build complex systems, exponentially difficult to build simple ones".
8. **"Your hashtag service is up, but Kafka goes down for a minute. What happens to the writes, and what are your three options?"** (Q&A 02:51:20-02:55:26). Buffer / drop / dead-letter queue, with "sometimes it's okay to lose data" and the Uber SOS counter-case.
9. **"A new search service starts consuming an old Kafka topic; an existing consumer crashes and restarts. Where should each start reading?"** (Q&A 02:57:02-03:03:07, D-12). Horizon vs last checkpoint vs latest - concrete and testable (note factcheck L-0328 on Kafka's default).
10. **"How big is a hashtag document? Is it worth garbage-collecting a billion of them?"** (P25, 03:12:21-03:13:49). Back-of-envelope exercise; on the site, have the reader do the math and catch the teacher's billion-scale slip (factcheck L-0344).

Runner-up: "Is a CDN only for images?" (00:16:18, 02:24:49) - better as a misconception callout, and already a lecture 1 callout.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:06:35 | CDN "transparently sits between your user and your origin" (a middleman you never address explicitly) | CDN as a pull-through proxy, not a push target | Use as the section's one-line definition (L-0018) |
| 00:21:40 | "It's normal string concat, like string replacement" | How the CDN builds the origin URL | Make it an interactive URL rewriter on the page (L-0048) |
| 00:28:03 | "Front end is utterly stupid... it just renders" the URL it is given | Who decides the image URL (the backend) | Keep the spirit, soften the wording (L-0056) |
| 00:51:27, 01:29:31 | Pre-signed policy / CDN timed signature "exactly same as JWT" | Stateless expiry check, no DB lookup | Strong reuse; note factcheck L-0169 (signature, not certificate) (L-0098, L-0169) |
| 00:44:54 | "System design is all about building blocks... Ctrl-C, Ctrl-V anywhere" | GitHub upload = Instagram upload | Use as the bridge sentence into the GitHub demo (L-0087) |
| 01:31:34, 02:22:29 | Kafka is "the glue that stitches almost all social networks together" / "backbone" | Async decoupling of services | Recurring visual: Kafka drawn as a central pipe (L-0180, L-0265) |
| 02:13:21 | "Adapter" between two Kafka topics | Re-keying a stream | Keep the name; add factcheck L-0254 (stream frameworks call it repartitioning) (L-0249, L-0254) |
| 03:19:56 | "The database might cry" under raw high-volume ingestion | Kafka as first point of entry | Tone device; fine as is (L-0355) |
| 01:14:30, 00:00:02 | "My two-year-old daughter can draw these boxes" | Implementation detail is the real work | Recurring framing for the whole course (L-0152) |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:01:12 | Every company 2008-2011 built on PHP/MySQL/Memcache because Facebook did | Tech-stack bandwagons | Context box; factcheck inline L-0006 (L-0006) |
| 00:02:13 | Instagram: 14 million users in year one with three engineers (D-01) | Why its stack became the template | Opening hook (L-0007) |
| 00:02:57 | Instagram year one: Django, Celery, RabbitMQ/Redis, Postgres, Cassandra, Memcached on AWS (D-01) | "Those six components" from week 1 | Diagram; factcheck inline L-0009 (L-0009, L-0011) |
| 00:04:15 | Next stack due "maybe Rust"; Go "failed to capture the market"; ChatGPT is AI/Python | Keep an eye on breakout companies | Sidebar, opinion (L-0012, L-0013, L-0015) |
| 00:09:14 | 1-10 MB images through API servers = "a crime" | Bandwidth argument for CDN | (L-0025) |
| 00:09:59 | Server in Singapore, user in the US, 10 MB image | Geography argument | (L-0027) |
| 00:17:19 | Giphy caches "so much of stuff" on CDN (teacher's YouTube video) | CDN for non-image bytes | Already used in lecture 1; link (L-0042) |
| 00:18:22 | "You can literally configure facebook.com as a backend of CDN" | Any URL can be an origin | (L-0045) |
| 00:19:12 | Demo: teacher's site images served from his CDN alias, origin `/static` | CDN config is one mapping | Recreate as a step-through (L-0046, L-0047) |
| 00:30:45 | Requirement: 5M photo uploads per day (board only) | Sizing context | Board-only; teacher never says it aloud (L-0063) |
| 00:33:06 | HD iPhone photo ~5 MB; "5 MB is peanuts for an HTTP server" | No chunking needed | (L-0066) |
| 00:39:25 | 2x data transfer and egress/ingress per hop | Cost of proxying uploads | Factcheck note L-0079 (L-0078, L-0079) |
| 00:45:28 | GitHub issue attachment: 179 KB PNG, four network calls; metadata-only first call; response with S3 upload URL + CDN href + form fields | Pre-signed POST in a real product | Best demo of the lecture; annotate screenshots (L-0088, L-0089, L-0090, L-0091, L-0094, L-0100) |
| 01:00:13 | Akamai: at least 18 locations in India (one in Bhopal); AWS two-three data centres | Why CDN beats S3 on latency | Factcheck inline L-0111 (L-0111) |
| 01:01:38 | CDNs might use SSDs; S3 "an ocean of data" doesn't | Storage-media difference (hedged) | Keep the hedge (L-0112) |
| 01:03:31 | "Take out $100 from a salary... 7,000 or 8,000 rupees. Play around" | Hands-on learning | "Try it" box |
| 01:06:42 | Instagram had to move to Facebook's CDN after acquisition | Why stored URLs hurt | Factcheck: it was CloudFront, not Cloudflare (L-0127, L-0144) |
| 01:07:17 | Microsoft made Bing API calls 4-10x costlier | Vendor lock-in risk | Factcheck inline L-0129 (L-0129) |
| 01:10:08 | "Once every two years your senior management... let's switch the CDN, put 20% traffic on other CDN" | A/B across CDNs needs derived URLs | Keep the scenario, drop the crude joke at 01:10:36 (L-0139, L-0143) |
| 01:20:56 | Live: private Instagram photo URL opened in incognito | Privacy is URL possession | Reader can reproduce; show annotated URL (L-0166) |
| 01:24:48 | fbcdn.net query params OE (expiry?), OH (hash), IG cache key; missing -> "Bad URL timestamp" | Signed URL anatomy | Teacher flags his own guesses - keep "most probably" (L-0170, L-0171) |
| 01:28:26 | True privacy via API servers = 50-100x servers on a fleet of "more than 100,000 servers" (teacher unsure) | Why pseudo privacy | Keep as hedged (L-0176) |
| 01:33:49 | Sachin Tendulkar uploads a 50 MB photo; a tier-3 user on Jio burns a day's data on 10 photos | Image optimization | Memorable; reuse verbatim (L-0187) |
| 01:34:52 | 10,000 x 10,000 px photo on a 360 px screen -> `w=360` | CDN resize param | Interactive slider (L-0190, L-0191) |
| 01:41:48 | Teacher implemented DRM, hacked his own platform for 10 days | DRM vs proprietary format | Sidebar (L-0200) |
| 01:42:32, 01:43:26 | Piracy with DRM proof = 3 years, non-bailable; teacher filed three complaints last month | DRM traceability | Sidebar; factcheck inline L-0202 (L-0202, L-0203) |
| 01:54:59 | `#sunset`, "1.2m photos", top-100 grid (D-06) | The page to design | Spine visual (L-0211) |
| 02:11:54 | Post 31 with #sunset, #sun, #nature | Fan-out of one post to many hashtag events | Animate (L-0247) |
| 02:15:50 | Bulk insert of 100 rows ~100x faster than 100 single inserts | Batching | Factcheck inline L-0253 (L-0253) |
| 02:17:20 | "1.2 million" shown, only 100 rendered - nobody checks the exact count | Relaxed consistency | (L-0255, L-0256) |
| 02:52:05 | Kafka ~99.9% availability, not four/five nines | Plan for Kafka downtime | Factcheck note L-0313 (L-0313) |
| 02:55:26 | Uber SOS button must never lose an event (teacher's YouTube video) | When data loss is unacceptable | (L-0320) |
| 03:03:59 | Student: pod benchmarked at 400 rps, three servers for 1000 rps | Scale out vs optimize | (L-0331) |
| 03:04:57 | "Throwing money at AWS, getting two more servers is very cheap as compared to salaries of engineers" | Engineering-cost decision | (L-0332) |
| 03:07:39 | Split production 90/10 behind an LB; profile the 10% | Profiling in production | (L-0335) |
| 03:08:12 | cProfile; "Instagram uses cProfile in production on one of their servers" | Simple profiler | (L-0338, L-0339) |
| 03:11:03 | Each goroutine holding 20 MB -> more goroutines need more RAM | CPU first, then RAM | Factcheck inline L-0341 (L-0341) |
| 03:12:37 | 32 B tag + 4 B count + 100 x 4 B IDs = 436 B, ~512 B per hashtag | Back-of-envelope | Factcheck L-0343/L-0344 (L-0343) |
| 03:18:45 | YouTube watch-time / Google Analytics events land in Kafka first | Kafka as first point of entry | (L-0354) |
| 03:20:36 | Teacher built several analytics systems, all ingesting into Kinesis first | Same pattern in practice | (L-0357) |
| 03:25:31 | Teacher took on big data with no background and became its lead; now optimizing Spark | "Implement to learn" | Closing note (L-0365) |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:06:35, 00:29:08 | Push to CDN vs CDN pulls from origin; purge API vs re-push | CDN is pull-through; you only invalidate a path (L-0019, L-0059) |
| 00:16:18, 02:24:49 | Images vs JSON on a CDN | No difference to the CDN - bytes (see factcheck L-0040, L-0273) |
| 00:32:57 | Chunked persistent upload vs single HTTP request | 5 MB is small |
| 00:34:16 | Async vs sync upload to S3 | User must see the post now |
| 00:36:31-00:44:03 | API server proxy vs dedicated upload service vs pre-signed direct upload | Bandwidth, 2x transfer, infra to manage, native security |
| 00:42:01 | Open bucket vs pre-signed URL | Abuse on your bill |
| 00:59:24-01:01:38 | CDN vs S3 for serving | Geography, storage media, guarantees, S3 egress cost (L-0109, L-0112, L-0113) |
| 01:05:37-01:12:23 | Store URL (CDN or S3) vs store IDs and derive | Flexibility: switch/A-B CDNs, change cloud, delete |
| 01:27:11 | Pseudo privacy (CDN + signed URLs) vs true privacy (every byte via API) | Cost at scale (50-100x servers) |
| 01:32:36 | Build an image optimizer vs use CDN transforms | Reuse what exists ("tomorrow we'll build our own") |
| 01:40:36-01:41:25 | Proprietary format vs DRM | Shipped code can be decompiled; DRM gives traceable proof |
| 02:03:02-02:06:13 | Top 100 as post IDs vs full posts | Space, cacheability, freshness vs one-read speed, consistency (D-07) |
| 02:08:29-02:09:45 | Partition by hashtag vs user ID | Multi-hashtag posts; shared topic for all consumers |
| 02:13:21-02:15:17 | count++ per event vs count += n per batch | DB micro-writes |
| 02:11:13, 02:44:19 | Redis Pub/Sub vs Kafka | Persistence, push vs pull, DB slowness throttles consumers; Pub/Sub right for chat latency (L-0300, L-0301, L-0302, L-0303, L-0304) |
| 02:20:42, 02:47:20 | Sync call / webhook vs Kafka from data science | Uptime coupling; who owns retries ("humans") |
| 02:25:57 | CDN vs cache in front of the hashtag API | "Pick your favorite"; teacher prefers CDN (L-0275) |
| 02:37:15 | Read path / write path vs separate services | Services were split by responsibility (web server vs async worker), not by path (L-0293) |
| 02:52:05-02:54:52 | Buffer in memory vs drop vs dead-letter queue | Criticality of the data (L-0314, L-0319) |
| 02:56:23 | Leader-replica failover vs leaderless / multi-master | Downtime vs conflict resolution (L-0321, L-0322) |
| 03:00:32 | Start at horizon vs last checkpoint vs latest | New consumer vs restart vs loss-tolerant (L-0328) |
| 03:04:57 | More servers vs optimizing | Money vs engineer time; then profile (L-0332, L-0333) |
| 03:09:43 | More CPU vs more RAM | Know the workload: "CPU, memory, network and disk" (L-0340) |
| 03:18:23-03:20:36 | Kafka as storage vs Kafka as first point of entry | Access pattern, transactions; high-volume ingestion (L-0352, L-0353, L-0354, L-0356) |
| 03:22:38 | Counting servers vs Spark jobs | Both are distributed computing (L-0361) |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:00:02, 01:14:30, 01:39:08 | "Boxes, boxes... my two-year-old daughter can draw these boxes" / "that's not what real engineers do. Think about implementation" | Lesson thesis; open and close with it |
| 00:10:34, 00:21:40, 01:03:31, 03:25:31 | "Nothing beats practical experience" / "get your hands dirty" / "implement... without implementation it's all theoretical" | "Try it yourself" boxes after CDN, pre-signed URL, privacy |
| 00:33:06, 02:16:44 | "It's easy to build complex systems. It's exponentially difficult to build simple systems" | Callout at the chunking prompt |
| 00:44:54 | "System design is all about building blocks... Ctrl-C, Ctrl-V" | Bridge to GitHub demo |
| 01:06:05, 01:10:08, 01:12:50, 01:17:45 | "If something is derivable, don't store it" ("I should put it in my t-shirt") | Headline rule card of the separation-of-concerns section |
| 01:07:55 | "You are not binding yourself to something" | Vendor-independence callout |
| 01:18:34, 01:30:36 | "When something is out on the internet, it is out on the internet" / "privacy is a myth" | Privacy section opener |
| 01:32:36, 01:36:44 | "Building real world systems implies reusing things that already exist rather than reinventing the wheel" | Optimization section |
| 01:46:56 | "S3 is black box for us. CDN is black box. That's the API contract" | Scope rule; pairs with "data science is a black box" (01:58:52) |
| 01:58:52, 02:02:51 | "We established the boundary" / "Don't add new requirements to the system" | Interview-style discipline box |
| 02:00:08 | "If we don't think of all possibilities, whatever I think seems optimal, but it might not be" | Before the post-IDs-vs-posts trade-off |
| 02:06:13, 02:47:20, 02:56:56 | "There is no one way to build this system" / "everything in computer science is a trade-off" / "You get some, you lose some" | Trade-off callouts |
| 02:15:50, 02:34:37 | "Whenever you can batch it, do batch it" | Counting section rule |
| 02:17:20 | "You can relax some constraints when you are doing things at scale" | Consistency callout |
| 02:22:29, 02:48:23 | Anything that does not need synchronicity should be done asynchronously (echoes lecture 1's Hotstar line) | Cross-link to lecture 1 delegation |
| 02:27:28-02:34:37 | "Understand what your read path and write paths are and tackle one at a time" / "blow it out of proportion" | Method card; reuse in later lessons |
| 02:54:52 | "You don't always have to add yet another component... sometimes it's okay to lose the data" | DLQ section |
| 03:08:12 | "Unless you have it measured, you can just assume" | Profiling callout |
| 03:09:43 | "At the end, you have four things... CPU, memory, network and disk" | Capacity callout |
| 03:13:49 | "As engineers, do the calculation... thousand to million and million to billion jump is very significant" | Back-of-envelope box |
| 03:18:45 | "Kafka is always a message broker. It can never be your source of truth. You can, but you should not" | Kafka limits box (factcheck inline L-0353) |

---

## 4. The Instagram case-study thread (proposed spine)

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:02:13 | Instagram year one: 14M users, 3 engineers, stack copied by every later startup (D-01) | Tech-stack waves; the six components | Opening hook and map of today's building blocks |
| 00:30:17 | Instagram image upload service, 5M uploads/day (board) | Storage, data flow | Section frame |
| 00:34:29 | "Imagine you using Instagram... takes one hour... poor user experience" | Sync upload requirement | Reader-facing UX constraint |
| 00:55:57 | GitHub issue = "your Instagram image upload. No difference at all" | Pre-signed URL in practice | Explicitly a stand-in; label it |
| 01:04:29 | Instagram posts table | Don't store derivable values | Strike-through moment |
| 01:06:42, 01:11:54 | Instagram moved to Facebook's CDN after acquisition | Why derived URLs | Use factcheck L-0127 wording (CloudFront, not Cloudflare) |
| 01:13:54 | "Instagram is not just about images... videos, shorts, reels, stories" | Separating posts from media | Extensibility argument |
| 01:15:02 | User B visits A's profile, `GET /users/A/posts`, `instacdn.net` URLs (D-04, board S36) | Backend-generated CDN URLs | Sequence diagram |
| 01:18:34-01:28:26 | Private Instagram account; live incognito demo; fbcdn.net signed URL | CDN privacy, pseudo privacy | Reader can try on their own account |
| 01:31:34 | Post published -> Kafka -> search, analytics, notification, feed (D-04 bottom; board also shows CDC from MySQL, never mentioned aloud) | Extensibility | Board-only CDC needs a note (see section 8 fixes) |
| 01:33:49 | Sachin Tendulkar's 50 MB photo on a Jio phone | Image optimization via CDN | Keep |
| 01:54:59 | Instagram hashtag page: `#sunset`, 1.2m photos, top 100 (D-06) | Hashtag service | Second spine screen |
| 02:07:19 | The post-published Kafka from 01:31:34 is reused | Partition-key conflict | Explicit back-link: "the exact same Kafka that we just drew" (02:09:05) |
| 02:19:13 | Data science "popularity service" pushes top photos | Async integration | |
| 02:24:49 | `GET /hashtag/<tag>` behind a CDN | CDN caching JSON (closes the CDN loop) | Back-link to 00:16:18 |
| 03:08:12 | Instagram uses cProfile in production (blog) | Profiling | Q&A nugget |

Gaps where Instagram is *not* used but could carry the content (without inventing claims - frame as "applied to Instagram"): the CDN basics section uses the teacher's own website, not Instagram (could reframe as "Instagram's photo CDN" while keeping the demo); content moderation (00:57:15) and orphan-upload cleanup (01:43:57) are Instagram-shaped questions answered briefly; Kafka retention/horizon (02:57:02) could use "a new search consumer on Instagram's post topic", which the teacher himself uses at 03:00:32; DLQ (02:52:05) could use the post-published write.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:06:35 | You push content to a CDN / a CDN is "just there to cache things" | General ("a lot of people") | CDN sits transparently and pulls from the origin (L-0019) |
| 00:16:18 | Only images can be cached on a CDN | General | Bytes are bytes - JSON, HTML, video (L-0041; factcheck L-0040) |
| 00:22:44 | CDNs only work for public resources | S1 | Private content possible via CDN-to-bucket integration (L-0050, L-0053) |
| 00:24:50 | The user/browser somehow discovers the CDN URL | S6 | The backend puts the CDN URL in the response; "understand how web works" (L-0054, L-0055) |
| 00:26:30 | Some automatic way exists to route existing URLs to the CDN | S? | You change the URLs you send, explicitly (L-0057) |
| 00:29:08 | Updating cached content = pushing the new image to the CDN | S? / teacher self-corrects mid-sentence | Wait for TTL or call the purge API for the path (L-0058, L-0059) |
| 00:32:37 | A 5 MB image needs a persistent connection and chunking | S1 | One HTTP request; keep it simple (L-0065) |
| 00:34:16 | Accept the image and upload to S3 asynchronously | S1 | User must see the post now (L-0069) |
| 00:35:16 | The main problem with proxying is losing the image on a crash | S1 | Client retries on 5xx; the real issue is bandwidth (L-0071) |
| 00:58:31 | The upload response should only contain the pre-signed S3 URL | S? | Also return the CDN URL so the frontend can render; S3 is not public (L-0107) |
| 00:59:04 | Why not render images directly from S3 / CDN is a blob store | S? | CDN is not a blob store; bucket is private, served via CDN (L-0108; factcheck inline) |
| 01:00:01 | CDN is faster only because of location | S? | Geography is the key reason, plus storage media and guarantees; benchmark (L-0110, L-0112) |
| 01:02:09 | The CDN must generate a signed URL to read a private bucket | S2 | It holds credentials and reads via SDK (L-0115, L-0116; factcheck inline on OAC) |
| 01:05:12 | Tags are a separate column in the post table | S2 | Hashtags are part of the caption (L-0122) |
| 01:05:31 | Store the pre-signed URL / CDN URL in the post table | S2 and "every single cohort" | Store user_id + image_id; derive (L-0123, L-0124, L-0125) |
| 01:18:34 | Private Instagram posts are private | General | Anyone with the URL can view until it expires (L-0160, L-0164) |
| 01:24:09 | The CDN knows who is allowed to see a photo | Implied | CDN is stateless; API decides who gets URLs (L-0168, L-0172; factcheck inline L-0168) |
| 01:40:17 | A proprietary image format would keep photos private | S1 | Shipped code can be decompiled; DRM is different (L-0197, L-0199) |
| 01:43:57 | Orphan uploads (uploaded, never posted) are a storage problem | S9 | Storage is dirt cheap; clean up via image entries if needed (L-0204) |
| 01:44:53 | The image service picks the nearest CDN node | S? | CDN-internal: DNS resolution + BGP (L-0206; factcheck inline) |
| 01:46:13 | We need to know where S3 physically stores the object | S2 | S3 is a black box behind the SDK (L-0209) |
| 01:57:04 | Store hashtags in the photos table / a tags table | S2 | Design storage from the page you render (L-0214, L-0215) |
| 01:58:38 | Our service should compute/maintain the top 100 | S2 | Data science owns it - respect the boundary (L-0217, L-0218) |
| 02:02:34 | The hashtag page must show all photos | S1 | Don't add requirements mid-design (L-0227) |
| 02:08:07 | Hashtag is a bad partition key because there are so many hashtags | S6 | Hashing handles many keys; real problems are multi-hashtag posts and the shared topic (L-0239, L-0240, L-0251) |
| 02:11:04 | Redis Pub/Sub with a channel per hashtag | S1 | Expensive and loses data (factcheck inline L-0245: cost argument overstated, data loss is the real reason) (L-0245, L-0246) |
| 02:14:42, 02:50:25 | Partitioning by hashtag / user ID means one partition per key | S4, S? | Hash-based partitioning: few partitions, many keys (L-0251, L-0310) |
| 02:20:36 | Just call the data science service when the page loads | S1 | Copy their data via Kafka; avoid sync uptime coupling (L-0260, L-0264) |
| 02:21:54 | Every consumer is a heavyweight "service" | S1 ("a lot of people") | It's a process consuming a topic (L-0262) |
| 02:36:28 | Read path and write path must be separate services | S1 | Split by responsibility, not by path (L-0293) |
| 02:45:17 | Ignoring persistence, Redis Pub/Sub is as good as Kafka for speed | S3 | Push-based bombards servers; pull lets consumers batch (L-0302, L-0303) |
| 02:46:46 | Webhooks from the popularity service are simpler than Kafka | S8 | Ownership of retries and downtime: decouple (L-0305, L-0307) |
| 02:51:34 | Kafka is a single instance | S2 | Kafka is a cluster (L-0311) |
| 02:52:00 | A replicated Kafka cluster never goes down | S2 | ~99.9%; plan for loss (L-0312, L-0313) |
| 02:56:10 | Leaderless replication removes downtime for free | S2 | Multi-master brings conflict resolution (L-0322) |
| 02:57:24 | Kafka keeps messages forever unless a deletion policy is set | Teacher | Factcheck L-0323: default retention is 7 days (L-0323) |
| 03:11:37 | Hashtag DB needs garbage collection | S2 | Documents are tiny; old tags may revive (L-0342, L-0343) |
| 03:13:30 | A billion half-KB documents is "half a gig" | S2, unchallenged by the teacher | Factcheck L-0344: ~500 GB (L-0344) |
| 03:15:04 | Top 100 -> top 1 million is "thousand X" | Teacher | Factcheck L-0347: 10,000x (L-0347) |
| 03:16:33 | Kafka is overkill just for counting; use an in-memory queue | S2 | Kafka data is reusable by other services; any partitioned broker is fine (L-0350, L-0351) |
| 03:17:50 | Kafka can be used as a data store since it retains data | S2 | Access pattern and transactions: use a DB; Kafka as entry point (L-0352, L-0353; factcheck inline L-0353) |
| 03:21:26 | Kafka has its own dead letter queue | S? | It does not; use SQS/RabbitMQ (L-0358) |
| 03:22:03 | Writing failures to your DB is the transactional outbox | S?, accepted by teacher | Factcheck L-0359: outbox writes every message in the business transaction (L-0359) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- How the web works: DNS resolution, HTTP request/response, IMG tags rendering whatever URL the backend sends (teacher says so explicitly at 00:25:39).
- Week 1: the six components (caching, DB, communication, async processing, scaling, concurrency) (00:03:30); lecture 1's CDN-caches-API-responses idea and Giphy.
- Week 2: Kafka topics, partitions, partition keys, hash-based partitioning, consumer groups, commits (02:14:42, 02:37:57); Slack/chat design using real-time Redis Pub/Sub (02:43:06, 02:46:24).
- Lecture 8 (week 3): load balancers and health checks; "distributed transaction / consistency problem" when one service writes to two systems (02:09:05, 02:29:21).
- AWS basics: S3 buckets, IAM credentials, SDK, egress pricing; JWT ("in case you are unaware about JWT, read about JWT", 01:29:31).
- Replication: leader/replica failover, multi-master (02:56:10).
- Load testing / benchmarking a pod (03:03:59).
- CDC (on the D-04 board, never explained), CQRS (named at 02:22:29), transactional outbox (named by a student, 03:22:03), MapReduce/Spark (03:22:38).

### Concept graph (A -> B means B builds on A)
```
DNS + HTTP + "backend sends the URL"
  -> CDN = transparent pull-through proxy (property -> origin mapping, path replacement)
       -> miss/hit, TTL, purge API
       -> "bytes are bytes" -> CDN caches JSON (hashtag API, 02:24:49)
       -> CDN reads private bucket with credentials
       -> CDN is stateless -> signed expiring URLs (JWT-like) -> pseudo privacy vs true privacy (cost)
       -> CDN image transforms via query params (w=360)

Blob storage (S3, cheap)
  -> upload through API servers -> bandwidth/memory problem (+2x transfer, egress)
       -> dedicated upload service -> pre-signed URL (signed, path-scoped, expiring; needs JWT idea)
            -> GitHub demo (metadata call -> S3 form POST -> CDN href)
  -> random image ID + S3 path convention (bucket/<user_id>/<image_id>)
       -> "don't store derivable values" -> posts(id, user_id, image_id, caption)
            -> backend-generated CDN URLs -> CDN switch / 20% A/B / delete by path
       -> post service separate from image service (separation of concerns) -> videos/reels reuse posts
  -> post published -> Kafka (glue; partitioned by user_id) -> search/analytics/notification/feed

Hashtag page (render in one request)
  -> one document per hashtag {tag, total, top_100}
       -> top 100 as post IDs vs full posts (space/freshness vs speed/consistency)
  -> counting: async via the post Kafka (above)
       -> batching needs all posts of a hashtag on one server
       -> partition key conflict (user_id topic shared by everyone; posts carry many hashtags)
       -> adapter: extractor re-ingests into POST_HASHTAG partitioned by hashtag (hash partitioning, week 2)
       -> counting servers: hash map + count += n; DB atomic increments; recounts tolerated (relaxed consistency)
       -> alternatives: Redis Pub/Sub (rejected: no persistence, push), Spark jobs (equivalent)
  -> top 100 from data science via their Kafka (no sync dependency; CQRS-like)
  -> read side: hashtag API -> CDN or cache (TTL/invalidation) -> partitioned DB
  => method: read path / write path optimization, one path at a time

Kafka operations (Q&A)
  -> cluster, ~99.9% -> producer-side loss -> buffer / drop / DLQ (SQS) / outbox
  -> retention / deletion policy -> horizon -> commit/checkpoint -> where to start (horizon / last commit / latest)
       -> retention cost -> archive to S3
  -> SLA = consumption speed = partitions x workers -> repartitioning online vs with downtime
  -> Kafka is a broker, not a source of truth -> but first point of entry for high-volume ingestion

Capacity (Q&A): benchmark pod -> more servers vs optimize -> application-level profiling (canary 10%) -> CPU vs RAM (four resources) -> goroutines
```

Cross-links worth surfacing on the site:
- **CDN** appears three times: basics (00:05:57), serving photos + privacy + transforms (01:15:02-01:37:33), and caching the hashtag JSON (02:24:49) - one concept, three uses.
- **"Don't store derivable values"** (01:06:05) returns in the hashtag document when a student says post IDs are "data that we can derive... anything from" (02:00:23).
- **The same post Kafka** (01:31:34) is the constraint that forces the adapter (02:09:05) - show it as one pipe in both diagrams.
- **Async over sync coupling**: Kafka glue (01:31:34), data science feed (02:22:29), webhooks vs Kafka (02:48:23); echoes lecture 1's "whatever does not need to be done in real time".
- **Black-box boundaries**: CDN internals (00:00:45), S3 internals (01:46:56), data science (01:58:52).
- **Relaxed consistency for counts** (02:17:20) mirrors lecture 1's "staleness is acceptable" theme.

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:03:30 | Instagram's stack shows "those six components that we discussed in the first week" |
| 00:16:18 | CDN caches API responses / "bytes are bytes" (lecture 1's "big misconception", restated) |
| 00:17:19 | Giphy-on-CDN video (also cited in lecture 1) |
| 00:30:17 | "Given that we now have understanding of CDN" - lecture 8 had deferred CDN in depth to this week (lec08 map, 01:06:50) |
| 02:09:05, 02:29:21 | Two writes from one service -> "distributed consistency problem" / distributed transactions (lectures 1 and 8) |
| 02:14:42 | "It's hash based partitioning that we discussed second week" |
| 02:37:57 | "We went in depth of Kafka partitioning... second week" |
| 02:43:06 | Student: Redis Pub/Sub "in our chat application design" (week 2 Slack/chat) |
| 02:46:24 | Teacher: Pub/Sub fit chat because latency had to be minimal |
| 02:48:23 | "Does not need to be done in real time... should not be done in a synchronous way" (lecture 1's Hotstar principle) |
| 03:09:43 | "As I always say, CPU, memory, network and disk" |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:05:57, 01:44:57 | CDN internals: BGP, nearest-edge routing | "I can do a deep dive on it later"; Cloudflare blog for self-reading |
| 00:23:35 | Another CDN discussion | Tomorrow |
| 00:30:09 | CDN for live content (live matches) | "6.3" (week 6, day 3) |
| 01:31:34 | Kafka in much more depth | Throughout the course |
| 01:32:36, 02:35:46 | Build our own image optimization service | Tomorrow |
| 01:40:09 | OTT authorization / video delivery | Sixth week |
| 02:35:46 | "Message indicators" problem statement | Tomorrow |
| 02:53:21 | How SLAs define a system | Week 7 Sunday (distributed task scheduler) |
| 03:22:38 | MapReduce / data engineering in depth | Not covered; O'Reilly Spark book for self-reading (03:24:35) |
| 03:25:58 | "Another high level pattern, very counterintuitive but essential for the system to survive" | Tomorrow |

Site handling: keep these as "coming in a later lesson" chips (with week numbers) and a "further reading" box (Cloudflare routing blog, teacher's Giphy and Uber SOS videos, Instagram cProfile blog, O'Reilly Spark book).

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers should be redistributed into the topic they belong to (mapping below the options).

### Option A - "Build Instagram's photo and hashtag features" (RECOMMENDED)
Keeps the lecture's order, opening each section with a prompt the reader tries first.
1. **Hook**: Instagram year one (14M users, 3 engineers, D-01) + tech-stack waves sidebar + lesson thesis ("boxes are easy; implementation is the work").
2. **CDN as a black box**: definition -> world without CDN (prompt P1) -> configure a property (string replacement) -> miss/hit -> bytes are bytes -> demo recreation -> Q&A boxes (private content, who sends the CDN URL, invalidation by purge not push, nearest edge via DNS/BGP).
3. **Uploading a photo**: storage (cheap) -> prompt #1 ladder (chunking, async, crash, bandwidth, dedicated service) -> pre-signed URL (prepare + upload, why not an open bucket, JWT-like expiry) -> GitHub demo annotated -> Q&A boxes (content moderation, CDN URL in response, CDN vs S3, CDN reading private buckets, orphan uploads, S3 as a black box).
4. **Storing the post**: prompt #2 (posts table) -> "don't store derivable values" -> CDN switch / cloud price / 20% A/B / delete -> post service vs image service -> serving flow (B visits A).
5. **Privacy**: prompt #3 -> incognito demo -> URL anatomy -> CDN is stateless -> timed signatures -> pseudo vs true privacy (cost) -> DRM vs proprietary format sidebar (with piracy-law note) -> OTT chip.
6. **Extensibility and optimization**: post Kafka (glue) -> CDN image transforms (Sachin/Jio) -> "reuse, don't rebuild" -> tomorrow chip.
7. **Hashtag page**: screen (D-06) + boundary -> prompt #5 document design -> prompt #4 counting/adapter (Redis Pub/Sub rejected; hash map + count += n; Spark alternative) -> batching principle + relaxed consistency -> prompt #6 data science feed (incl. webhooks Q&A) -> full architecture (D-09) -> CDN/cache on the read side.
8. **Method: read path / write path** (D-10, D-11) replayed on the hashtag design.
9. **Operating the pipeline (from Q&A)**: Kafka availability + prompt #8 (DLQ/buffer/drop, outbox), retention/horizon/commit + prompt #9, SLA = partitions x workers, Kafka as broker vs first point of entry, sizing prompt #10, 1M images pagination.
10. **Capacity sidebar (from Q&A)**: more servers vs optimize, profiling, CPU vs RAM, goroutines.
11. **Recap**: takeaways card (Kafka as glue, adapter, batching, read/write path, don't store derivable values, signed URLs) + next-lesson chips.

Pros: preserves the teacher's two strongest Socratic ladders (upload, hashtag counting) and his live-proof moments in their original order; the CDN section pays off three times; the 50-minute Q&A gets a real home (section 9). Cons: long page; sections 9-10 are Q&A-born and less narrative, so they need clear "operating it" framing.

### Option B - "CDN-centred"
Group everything around the CDN: (1) CDN basics, (2) CDN for uploads' read side + derived URLs, (3) CDN privacy, (4) CDN transforms, (5) CDN for API JSON (hashtag read path); then a separate "hashtag write path" lesson with Kafka.
Pros: one tool, many uses - excellent for revision; makes the "bytes are bytes" point unmissable. Cons: splits the image upload story (pre-signed URL ends up in a CDN chapter it doesn't belong to); breaks the hashtag design into read/write halves before the reader has seen the whole page; drifts from the lecture's provenance.

### Option C - "Two systems, two pages"
Page 1: CDN + image upload service (everything up to 01:47:21 with its Q&A). Page 2: hashtag service + read/write path + all second-half Q&A (Kafka operations, profiling).
Pros: matches the break; each page is a manageable length; page 2 is self-contained for readers who know CDNs. Cons: the hashtag page's CDN caching and "same post Kafka" links span pages and need explicit back-links; Instagram hook only on page 1.

**Recommendation**: Option A as the main page, with Option C's split as the chapter boundary if the site paginates (chapter 1 = sections 1-6, chapter 2 = sections 7-11), and Option B's "three uses of the CDN" as a small recap widget.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| CDN only for public resources? Private content via bucket integration (00:22:44, 00:24:03) | CDN - private content box |
| How does the user know the CDN URL? (00:24:50) | CDN - "who sends the URL"; callback in serving flow |
| Mass-replacing URLs for a site behind a CDN (00:26:30) | CDN - "who sends the URL" |
| Origin image changed: TTL or purge API, never push (00:28:47) | CDN - invalidation |
| CDN for live content (00:30:04) | Forward chip (week 6 day 3) |
| Content moderation in the direct-upload flow (00:57:15) | Uploading a photo - "what you give up" box |
| Where the CDN URL in the upload response comes from (00:57:47) | GitHub demo annotation |
| Why return the CDN URL and not only the S3 URL; S3 not public (00:58:31) | Uploading a photo - GitHub demo |
| Why not serve from S3; why CDN faster (geography, SSDs, guarantees, egress, benchmark) (00:59:04-01:01:38) | CDN vs S3 box |
| Does the CDN need a signed URL to read S3? Keys/integration (01:02:09) | CDN - private content box |
| "Take out $100... play around" (01:03:31) | Try-it box |
| OTT authorization (01:39:52) | Privacy - forward chip (week 6) |
| Proprietary image format; DRM; teacher's DRM hacking; piracy law and complaints (01:40:17-01:43:26) | Privacy - DRM sidebar |
| Uploaded but never posted - storage waste (01:43:57) | Storing the post - orphan uploads box |
| Why Kafka here (01:44:33) | Extensibility |
| How the nearest CDN is chosen - DNS/BGP, Cloudflare blog, Akamai history (01:44:53) | CDN - nearest edge box + further reading |
| How S3 locates an image by ID - S3 is a black box (01:46:13) | Storing the post - path convention |
| Redis Pub/Sub channel per hashtag (02:11:04) | Hashtag counting - rejected alternative |
| Read/write path vs separate services (02:36:28) | Read path / write path method |
| How a counting server groups hashtags - hash map, count++ then batch (02:37:51-02:41:23) | Hashtag counting - counting server internals |
| Partitions vs number of hashtags; increase partitions by throughput (02:38:12) | Hashtag counting - partitioning note |
| Popularity service consuming POST_HASHTAG (02:41:50) | Hashtag full architecture - other consumers |
| Redis Pub/Sub (chat) vs Kafka (counting): persistence, push vs pull, DB slowness (02:43:06) | Hashtag counting - rejected alternative (expanded) |
| Popularity via webhooks instead of Kafka (02:46:46) | Data science feed |
| Atomic counts in the DB (02:48:50) | Hashtag counting - DB requirement |
| Replacing the top-100 array wholesale (02:49:53) | Data science feed |
| Partitions per user ID (02:50:25) | Extensibility - post Kafka |
| Kafka cluster, ~99.9%, DLQ/buffer/drop (02:51:20) | Operating the pipeline - availability |
| SLA = consumption speed; partitions + workers; online repartitioning (02:52:56) | Operating the pipeline - SLA |
| Stateful vs stateless components; Uber SOS (02:54:07) | Operating the pipeline - availability |
| Leaderless replication vs failover downtime (02:56:10) | Operating the pipeline - availability sidebar |
| Kafka retention, deletion policy, horizon, commit (02:57:02) | Operating the pipeline - retention (D-12) |
| How far back to read: horizon / last checkpoint / latest (02:59:46) | Operating the pipeline - retention (prompt #9) |
| Retention length cost; archive to S3 (03:01:20) | Operating the pipeline - retention |
| More servers vs optimizing; application profiling; canary 10%; New Relic/Datadog/cProfile; Instagram cProfile (03:03:37) | Capacity sidebar |
| More CPU or more RAM (03:09:16) | Capacity sidebar |
| Goroutines: CPU first, then RAM (03:10:23) | Capacity sidebar |
| Hashtag DB garbage collection; 436 B per doc; thousand/million/billion (03:11:37) | Operating the pipeline - sizing (prompt #10) |
| More hashtags = more micro writes, but long-tail tags are cold (03:14:12) | Hashtag counting - batching note |
| 1 million images per hashtag - paginate outside the document (03:14:39) | Hashtag document design - extension box |
| In-memory queue vs persistent Kafka for counting (03:16:33) | Hashtag counting - alternative brokers |
| Kafka as storage vs first point of entry; analytics ingestion; Kinesis war story (03:17:50) | Operating the pipeline - Kafka's role |
| DLQ with Kafka (SQS/RabbitMQ); outbox (03:21:26) | Operating the pipeline - availability |
| MapReduce/Spark instead of counting servers (03:22:32) | Hashtag counting - alternative compute |
| How to learn Spark; "implement" (03:24:22) | Further reading + recap |

### Things a reader-first version should fix (not drop)
- **Factcheck notes to attach** (teacher's point stays): Instagram moved from Amazon CloudFront, not Cloudflare (L-0127, L-0144, L-0167); "half a gig" for a billion documents is ~500 GB (L-0344); top 100 -> 1M is 10,000x (L-0347); Kafka's default retention is 7 days, not forever (L-0323); "horizon" is Kinesis vocabulary, Kafka says earliest offset, and new Kafka consumer groups default to latest (L-0324, L-0328); CDNs cache JSON only when headers/rules allow (L-0040, L-0273); egress billing details (L-0079); S3 durability/availability numbers (L-0113); CDN expiry is set by the signer, not the cache TTL (L-0163); stronger privacy options (L-0175); Kafka availability depends on deployment (L-0313); outbox definition (L-0359); CQRS framing (L-0266).
- **Wording slips to fix silently**: "I'll store CDN URL in S3" (01:06:05) means in the posts DB; "certificate" for signature (01:24:09, 01:29:31); "Kafka is a single instance" at 02:51:49 is an ASR contradiction - keep "Kafka is a cluster".
- **Board-only content** must be stated in text since the teacher never says it: the 5M uploads/day requirement (L-0063), "Posts service can also validate that the image_id belongs to the same user" (L-0148, D-05), the board's Kafka partition-key question with answer `user_id` (01:15:00, D-04), CDC from MySQL into Kafka (D-04), and "pre-computed and pre-evaluated, returned in a single response" as the CORE requirement (board S73). The printed notes label the writer "Image Service" in D-10/D-11; the teacher corrects it to "Post Svc" at 02:23:11 - use Post service everywhere.
- **Tone**: the tense exchange with a student about "dispersing" questions (02:40:18-02:41:23) and the interruption complaint (02:30:59) are not content; keep only the hash-map answer. Drop the crude management joke (01:10:36) but keep the CDN-switch scenario. The "privacy is a myth / I can access that" provocation should be framed as "anyone you share the URL with" (factcheck inline L-0160).
- **Teacher hedges to keep visible**: fbcdn.net parameter meanings are his guesses (01:24:48); CDN storage media "we don't know" (01:01:38); Instagram server count "I'm not really sure" (01:28:26).
- **Speaker anonymity**: the transcript names students on call; the site must use none of them, and remember `Student 1` covers several people.
- **Demo URLs**: the teacher's own site and GitHub/Instagram network traces should be recreated as annotated screenshots or a mock, since live URLs and signed parameters expire.
