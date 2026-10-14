# Teaching Map - Lecture 06 (Week 4, Day 2): How images are served, Gravatar, on-demand image optimization, tagging people in photos, newly unread message indicator

Source: `lectures/lec06/transcript/transcript.md` (02:55:50; last timestamped turn 02:55:35). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **week 4, day 2** ("week four day second, after this will be completed 50% of the course", 00:00:02, L-0001). It leans heavily on **"yesterday"** (week 4, day 1, not in this source set): the CDN digression and CDN image transformations, the photo upload service with pre-signed URLs, the GitHub-issues image upload and PNG header bytes, the `edge.arpitbhayani.me` CDN property, and the rule "whatever is derivable, don't store it" - which this lecture deliberately contradicts (00:41:32). From earlier lectures in this source set it reuses Kafka's partition-bound parallelism and Kafka->SQS fan-out (Lecture 1, 02:43:15), "the database is the most brittle component" (Lecture 1, 00:48:35), transactions (Lecture 5), the online/offline indicator (Lecture 4, via Lecture 5's map) and WebSockets (Lecture 1, 01:59:25). The previous map in this folder is Lecture 5 (week 2, day 1); weeks 2 day 2 to week 4 day 1 are not in the source set, so some backward references point at lectures we cannot cite by time.

The lecture is **four short systems, each chosen to teach one habit** (the teacher says so at 00:01:07 and 01:34:52): (1) serving images is just a route handler -> on-the-fly images; (2) Gravatar -> *the devil is in the query*; (3) tagging -> *the senior engineer's product-manager hat*; (4) newly unread indicator -> *pre-compute vs source of truth*, and the **auxiliary database** high-level pattern.

Student labels: `S1`-`S9`, `S14` follow the transcript's `Student N` labels. The transcript header warns that `Student 2`, `Student 4`, `Student 5` and `Student 7` each mix several voices (the teacher calls different people whose turns all carry that label), so in this map a number is a **voice label, not one person**; where two different people share a label in one exchange, the map says "a second S4" etc. `S?` = unidentified.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:02 | 00:05:38 | 5.5 | Admin: agenda (four systems; "throwing you into situations senior engineers face"), plus a content pointer: the Instagram-notification video and the **Kafka + SQS fan-out** pattern (L-0006-L-0012) | Roadmap + promise of "a very interesting high level pattern" for the last system (00:02:09) | "So this is the agenda for today" |
| 1 | 00:05:38 | 00:27:22 | 22 | **How images are served** | **Demystify a phrase**: "we just say images are served. How?" (00:05:38) -> first principles of the browser | "Given we have built enough context on this... talk about Gravatar. Now this becomes an easy problem" |
| 1a | 00:05:38 | 00:12:04 | 6.5 | IMG tag -> HTTP GET; browser is "dumb", reads the format header, decodes; static folder mapping `/static` -> disk (D-01) | Misconception first (extension tells the browser? "No, browser does not have a clue", 00:06:43) | "Which means that instead of relying on /static, I can do anything there" |
| 1b | 00:12:04 | 00:16:16 | 4 | `/raw/<path>` handler reading from S3 = a 3-4-line S3 proxy; servers can return bytes, not just JSON; the image need not exist yet | Generalise the mechanism by swapping one line (disk -> S3) | "Now, where do we see this in action?" |
| 1c | 00:16:16 | 00:18:09 | 2 | Live demo: sharing the teacher's DiceDB repo renders a repo-specific social card | **Screen demo** of a familiar UI | "By the way, how is this image rendered?" |
| 1d | 00:18:09 | 00:23:42 | 5.5 | Open Graph `og:image`; GitHub's image is generated **on demand** behind `opengraph.githubassets.com`; CDN miss -> origin renders from a template (PIL/ImageMagick) -> CDN caches with TTL | View-source in the demo; misconception "everything is pre-generated" (00:19:54) | "And now you can see this feature at hundreds of places" |
| 1e | 00:23:42 | 00:27:22 | 3.5 | Bannerbear; hypothetical native Twitter tweet card; old GitHub avatar card; "build it in one hour"; "nothing is theoretical" | Product imagination + build challenge | "Nothing beats practical" -> Gravatar |
| 2 | 00:27:22 | 01:07:29 | 40 | **Designing Gravatar - data model and queries** | **Product explained, then requirements, then open brainstorm** ("How would you start?", ~00:31:17) | "Let me formally cover it before we take questions" -> architecture |
| 2a | 00:27:22 | 00:32:08 | 5 | What Gravatar is: one embeddable URL `gravatar.com/<hash(email)>` (board: "security PII", L-0054); change once, changes everywhere; requirements (upload many, mark one active, URL returns active) | Product walkthrough with an `<img>` example | "Let's start with database" |
| 2b | 00:32:08 | 00:36:12 | 4 | Schema brainstorm: store the email? (yes - login, profile page, collisions); hash "derivable" -> crossed off; photos table, no stored path (derive it), `is_active` | **Socratic challenge of every column** ("Why? If you are just using hash, why store the email?") | "Let's write queries" |
| 2c | 00:36:12 | 00:44:56 | 9 | All-photos query: input is a hash, not a user id -> join; "decrypt the hash?" -> hashing is lossy; `HASH(email) = ?` -> full table scan -> **store an indexed hash column** (contradicts yesterday) | **Write the exact query, then ask how it executes** ("10,000 rows - how many would this scan?", 00:39:45) | "This implementation detail, I want all of you to focus on" |
| 2d | 00:44:56 | 00:56:15 | 11 | Mark a photo active: single update -> old active not unset -> two updates -> only unset the active one -> **transaction** (crash = no active photo, 404) -> **ownership check** `and user_id = ?` | **Bug hunt on a "hello world" query**, student after student ("What can go wrong?") | Code-review analogy -> "one small minor optimization" |
| 2e | 00:56:15 | 01:03:48 | 7.5 | Active-photo read query; inner vs left join is not it; student proposes `active_photo_id` on `users` (read-heavy) - avoids the join on the most frequent query | "Can anyone spot it?" open nitpick hunt; teacher lets a student reach the answer | Student asks why keep `is_active` at all |
| 2f | 01:03:48 | 01:07:29 | 3.5 | Two designs compared: `is_active` on photos vs `active_photo_id` on users; mark-active becomes one auto-committed query; "counterintuitive - we are trained to think in attributes"; "15th cohort, everyone starts with is_active" | **Reflection on the class's own path** ("natural progression") | "Already 1 hour 10 minutes... we have enough" |
| 3 | 01:07:29 | 01:14:03 | 6.5 | **Gravatar architecture**: reuse yesterday's photo upload service (D-03); `api.gravatar.com/photo/<hash>` origin; `gravatar.com` as the CDN property; photo update -> Kafka -> CDN-invalidation workers (D-05) | **Plug-and-play reuse** of a previous design + "at Facebook scale" pressure | Recap of the details that mattered -> questions |
| 4 | 01:14:03 | 01:23:08 | 9 | Q&A (Gravatar): wrong photo id inside the transaction, CDN mapping, why not CDN -> S3, runtime hashing, join criterion vs filter, predicate pushdown, invalidation by API call | Student-driven | "Chandran Anubha, I'll take your question in some time" -> image optimization |
| 5 | 01:23:08 | 01:34:52 | 11.5 | **On-demand image optimization** + Q&A | **"Now this becomes a piece of cake"** - extend Gravatar's origin | Break |
| 5a | 01:23:08 | 01:30:43 | 7.5 | Same photo at 16/32/256/512 px; query params like `w=32`; origin reads S3, transforms with ImageMagick, returns; CPU-heavy -> bulky machines; cannot be async; Cloudflare/Cloudinary short blog; "build it in two days" | Problem first (many sizes), contrast with async pre-generated variants | "Any questions on anything from 9 to 10:30?" |
| 5b | 01:30:43 | 01:34:52 | 4 | Q&A: cleaned-up `update users ... where hash = ?`; Boolean vs tiny-int enum; check photo belongs to user; Slack membership table vs one-to-many | Student-driven | Break announcement with a preview of "a different hat" |
| 6 | 01:34:52 | 01:40:40 | 6 | Admin: break (announced with the framing of the next segment: "We will not design system... how this simple system affects so many other systems") | - | "Let's start with the second for today" |
| 7 | 01:40:40 | 02:02:56 | 22 | **Tagging people in photos - requirements only** | **Role-play**: "a CXO comes to you and says let's allow people to tag people in photos. That's your product briefing" (01:40:40) | "So this is just a quick brainstorming... think as an end user" |
| 7a | 01:40:40 | 01:45:59 | 5 | Three hats (product manager, architect, engineer); rule: no engineering answers; who can tag **me** -> separate authorization layer | Teacher rejects the first (schema) answer: "Nothing around engineering" | "Anubhav, what other part?" |
| 7b | 01:45:59 | 01:49:13 | 3 | Max people per photo: 5 vs 10,000 -> array in a document vs separate entries + pagination | **Push to extremes** ("let me go to extreme, 5 versus 10,000") | "Every single question that we ask... should positively influence our design" |
| 7c | 01:49:13 | 01:53:41 | 4.5 | Notify tagged people -> interface with the notification team (scale up) + product-level throttling (3-5/week); celebrity case; profile setting (already covered); self-removal -> granular authorization | One requirement per student, teacher converts each into a cross-team consequence | "Anubhav, which other feature?" |
| 7d | 01:53:41 | 01:58:42 | 5 | Tag suggestions -> synchronous dependency on the ML team -> SLA + fallback (a product call); activity page -> tags must be queryable ("which photos is X tagged in") -> database choice; feed team "honorable mention" | "How would this affect your design and peripheral teams?" | "Now on a bit of mathematical details" |
| 7e | 01:58:42 | 02:02:56 | 4 | Tag position: relative coordinates (320/720), bounding box LTRB or x,y,w,h (D-06); services to interface with, "put it in Kafka no matter what" (D-07); engineers can propose product ideas | Teacher-led worked example on the board | "Now the final system for today" |
| 8 | 02:02:56 | 02:37:16 | 34 | **Newly unread message indicator** | **Live product demo** (Instagram badge) to pin down a subtle definition, then a twisted requirement | "Lot of people would stop designing over this stage... no, this is not good. Why?" |
| 8a | 02:02:56 | 02:07:24 | 4.5 | Demo; "newly unread" is not "unread"; click clears the badge without reading; twist: number = unique senders (D-08) | **Definition by demo** + "listen to the problem statement really well" | "How would you approach this problem? Let's brainstorm" |
| 8b | 02:07:24 | 02:19:28 | 12 | Crude relational design: messages + user_activity(last_read_at); `count(distinct from) ... where to = ? and ts > last_read_at`; composite index (to, ts, from); still iterates 10,000 entries -> "crude, not incorrect" (D-09) | **Student builds, teacher asks "what is the problem in this query?" repeatedly** | "Rahul, how will you optimize this?" |
| 8c | 02:19:28 | 02:25:32 | 6 | Pre-computed per-user set of senders; set length O(1); delete on click; **query the source of truth vs keep it pre-computed** | Student proposal trimmed ("Do you really need this?"), then teacher names the general pattern | "Which database would you pick?" |
| 8d | 02:25:32 | 02:32:45 | 7 | Redis (any KV with a set value); get-status / clear APIs (D-10); write path input = messaging service; WebSocket knows delivery; `ON_MSG_UNSENT` umbrella event -> Kafka -> status-update workers -> Redis cluster (D-11, D-12, D-13) | Student (S4) supplies the input idea; "now that the cat is out of the bag" | "But no, this is not good. Why?" |
| 8e | 02:32:45 | 02:37:16 | 4.5 | Redis is overburdened; audit each path for unnecessary operations; the write path does N-1 no-op set inserts; "database is the most brittle component... protect it" | **Path-by-path audit** ("Get status. No option... Clear status... Let's talk about this path") | "How do we minimize it by using an auxiliary database?" |
| 9 | 02:37:16 | 02:40:48 | 3.5 | **Auxiliary database pattern**: auxiliary Redis absorbs existence checks; main Redis written once per sender; failure analysis (aux down = old behaviour); clear deletes both; accept slight inconsistency; "pick your battles" | Named as "the high-level pattern" promised at 00:02:09 | Admin: next week |
| 10 | 02:40:48 | 02:42:10 | 1.5 | Admin: next week = storage engines (with a content aside: the teacher guessed Kafka's internals from storage-engine intuition, L-0299) | - | "Folks who want to drop off, I'll take questions" |
| 11 | 02:42:10 | 02:51:05 | 9 | Q&A: "100+" threshold, auxiliary Redis key model, existence not count, sync failure, no distributed transaction, no read-before-write (Beauty and the Beast rose), no user ID in the Gravatar hash, what "unsent" means | Student-driven | "Any other question? ... Done" |
| 12 | 02:51:05 | 02:55:35 | 4.5 | Admin: closing; late Q&A - how to get good at query optimization (college textbooks, members-only series, EXPLAIN + official docs, staging experiments); the auxiliary Redis is also a cluster | Student-driven | End |

Time budget: images 22 min, Gravatar 40 (+6.5 architecture, +9 Q&A), image optimization 7.5 (+4 Q&A), tagging 22, unread indicator 34 + auxiliary pattern 3.5, closing Q&A 13.5, admin ~13. Roughly **15% is Q&A**, less than Lecture 1, but much more of the *main* segments is student-driven: in 2b-2e and 8b-8d almost every design decision is a student proposal that the teacher probes. The site must keep those dialogues as "try it" steps, not collapse them to the final answer.

**Introduction patterns observed** (reusable templates):
- **Demystify a phrase -> mechanism -> generalise -> real product** (images: "served how?" -> GET + decoder -> handler -> S3 proxy -> GitHub OG card).
- **Write the exact query, then ask how it executes** (Gravatar hash column, unread count index). The teacher refuses box-drawing answers: "You tell me the query, exact query" (00:37:59).
- **"What can go wrong?" bug hunt on a trivially simple query** (mark-active: 4 rounds, 4 students, 3 bugs).
- **Role-play brief -> requirement questions only -> each answer turned into a design/cross-team consequence** (tagging).
- **Live demo to fix a definition -> twist the requirement -> crude correct design -> pre-computed design -> audit for wasted work -> named pattern** (unread indicator).
- **Each system reuses the previous one**: images -> Gravatar origin -> on-demand optimization on Gravatar's origin; Kafka appears in Gravatar invalidation, tagging fan-out and the unread write path.

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:05:38 | "How are these images actually served? ... How do we serve a static file?" (rhetorical) | - | "The first thing you people say... someone has wrote that code" (L-0014) | IMG tag -> GET -> handler reads bytes -> browser decodes by header (L-0018-L-0025) |
| P2 | 00:06:43 | (implicit) Does the browser know it's an image from the `.jpg`? | Some people "four or five weeks back" thought so | "Browser does not have a clue... a dumb, stupid piece of software" | The IMG context + format header decide (L-0015, L-0021) |
| P3 | 00:18:57 / 00:19:54 | "Does this mean the image is stored on S3 by GitHub? ... Why would GitHub spend computation generating one for every repo every day?" (rhetorical) | - | "A lot of people think everything is pre-generated. No" | Generated on demand at the origin, cached on the CDN with a TTL (L-0040, L-0044, L-0046) |
| P4 | ~00:31:17 / 00:32:08 | "How would you start? How would you approach this problem? ... What kind of table, what schema, what would you store?" | S2: store the hash of the email in a users table | "Which tables would you have? Start with each table" | users + photos (L-0063, L-0067, L-0069) |
| P5 | 00:32:35 / 00:32:45 / 00:33:13 | "Will you store the actual email ID or not? ... If you are just using the hash, why store the email? ... Why do all social platforms store your actual email instead of its hash?" | S3: we should; S?: agrees not to; S2: email/hash derivable, saves space, Gravatar never displays the email | "How would they log into Gravatar? ... you go to the profile page, you want to see your email... in case of hash collision you are locked in someone else's account" | Store email; hash written then **crossed off as derivable** (L-0065, L-0066, L-0067) |
| P6 | 00:34:37 | "How would you store multiple paths in a single column of a relational DB?" | S2: we won't be able to | Leads S2 to a photos table | One row per photo (L-0068, L-0069; factcheck L-0068 on arrays) |
| P7 | 00:35:19 | "Do we really need to [store the paths]? Recall yesterday's discussion. Can you not derive it?" | S2: you can, but there are multiple photos | "So there would be multiple rows. What's the problem?" | Path derived from user id + photo id (L-0070, L-0121) |
| P8 | 00:36:12 | "Write the query to find all photos of a user." | S1: `select * from photos where user_id = ?`, filter/sort by is_active; select only ids | "We show all of them... Here, do we have the user ID? ... what you are getting is a hash of the email" | Need a join with users on the hash (L-0072-L-0074) |
| P9 | 00:37:59 | "So what's your query now? You tell me the query, exact query." | S1: decrypt the incoming hash | "You cannot get email from the hash. It's not encryption. It's hashing. So it's lossy" | (L-0075) |
| P10 | 00:38:37 / 00:38:49 | "Can you not just pass the hash function, where hash(email) = the one you provided? ... Anything wrong with this?" | S1: collisions; S1: extra computation per query | "That we have accepted... assume hashes are unique" | (L-0077-L-0079) |
| P11 | 00:39:45 / 00:40:51 | "Let's say I have 10,000 rows. How many rows would this query scan? ... Why does it have to do that entire scan?" | S1: full scan - hash every row's email, then filter, then join | "Brilliant. This is the pain point... let me contradict yesterday" | Computation in WHERE defeats the index -> store an indexed `hash` column; "not always true that what is derivable you should not store" (L-0080-L-0084; factcheck L-0081: expression indexes) |
| P12 | 00:44:56 | "What would be the query to mark a particular photo as active?" | S1: `update photos set is_active = true where id = ?` (+ user_id) | "Do you really need user ID if id is the primary key?" | (L-0086) |
| P13 | 00:46:01 / 00:47:12 | "What's the disadvantage of this query? What could go wrong? ... Three-line query, almost hello world... what's wrong?" | S1: pass user_id to shrink the scan; S5: the previous active photo is not unset; S5: counter hack, three queries, then "mark all false, then one true" | "No, ID is primary key, scan would anyway be log n"; "Can you simplify it?"; "Try writing an update query" | Two updates (L-0088-L-0090) |
| P14 | 00:49:15 / 00:50:07 | "We marked all as false and then one as true. What can go wrong?" | S7: only unset the row that is active (`and is_active = true`); S7: second must run after the first -> "make it a transaction" | "It sounds obvious, but we don't call it out explicitly... process crashed... Facebook renders a 404" | Wrap both in a transaction (L-0091-L-0094) |
| P15 | 00:51:44 / 00:52:10 | "Now we also had a transaction. What can go wrong? Look at the query very carefully, especially the second query. That's a hint." | S2: atomic, so concurrency is handled; a second S7: which photo id? -> user id?; S4: "a user should be allowed to change only his or her photos" | "Concurrency taken care of" (see factcheck L-0095); "Why, if photo ID is the primary key?"; to S4: "Brilliant" | Add `and user_id = ?` to the second update: security + correctness (L-0095, L-0097) |
| P16 | 00:56:15 / 00:56:55 | "One small, very minor optimization - can anyone spot it? ... Write the query to pick the active photo of a user." | S1: join + `photos.is_active = true`; S1: evaluation order; S1: the is_active filter; a second S2: skip update if already active; **store active_photo_id in users (read-heavy)** | "Inner join would work exactly the same as left"; "it's anyway indexed... index lookup"; to active_photo_id: "Correct... you would still need this transaction" | `active_photo_id` on users removes the join on the most frequent query (L-0101-L-0109) |
| P17 | 01:03:48 | (teacher's reflection) is_active on photos vs active_photo_id on users - which? | S2 (01:03:21) asks why keep is_active at all | "Counterintuitive... we tend to think in attributes of an entity" | Mark-active = one auto-committed query; read = PK/hash lookup (L-0111, L-0112) |
| P18 | 01:10:34 | "When the request for gravatar.com/hash comes in, this request would go where?" (rhetorical) | - | - | CDN; on a miss, origin `api.gravatar.com` (L-0124) |
| P19 | 01:11:52 | "When a photo is updated, what do we do? ... Why Kafka?" (rhetorical) | - | - | Kafka event -> workers call the CDN invalidation API (L-0125-L-0130) |
| P20 | 01:27:05 | "How do you scale the system?" (on-demand optimization, rhetorical) | - | "It cannot be made async" | Bulky many-core machines, autoscaled (L-0159-L-0161) |
| P21 | 01:42:34 | "What questions would you ask - not to the manager but to yourself, your team? How would you brainstorm?" | S1: schema for storing tags; S1: only the owner can tag | "Nothing around engineering... think on the product side"; "But can someone else tag **you** or not?" | Authorization layer: who may tag me (L-0183-L-0186) |
| P22 | 01:46:37 / 01:47:32 | "How would it define your system if the max limit is 5 vs 10 vs 100 vs infinite? ... Let me go to extreme, 5 versus 10,000." | S5: per-photo vs album limit; S5: concurrency when several people tag | "You are the one tagging in your photo... concurrency is not a challenge"; teacher answers himself (01:48:12) | 5 -> array in the document; 10,000 -> separate entries + paginated endpoints (L-0187-L-0191) |
| P23 | 01:49:13 | (open turn) S6: should tagged people get notifications? | S6: yes; S6: celebrity tagged by many | "Great... imagine someone tagging you in a very shitty photo" | Interface with the notification team; product-level throttling (L-0192-L-0198) |
| P24 | 01:52:23 / 01:52:54 | (open turns) | S4: profile setting "can anyone tag me"; a second S4: self-removal of tags | "Covered on the first one"; "Correct... authorization becomes more granular" | (L-0200-L-0202) |
| P25 | 01:54:05 | "So now what would this entail - how would this affect your design and peripheral teams?" (tag suggestions) | S5: face-recognition / recommendation inputs on upload, shown to the user | "Response time... needs to be fast... SLA"; "What if that API does not respond in time?" | Synchronous dependency -> SLA + fallback, which is a product call (L-0203-L-0207) |
| P26 | 01:56:16 | "Profile service activity. Now, how would this affect your system?" | S5: push the information asynchronously; who can see it | "I'll just add... they need to be indexed" | Tags stored queryably ("in which photos is this user tagged") -> database choice (L-0208, L-0209) |
| P27 | ~01:58:42 | "You cannot store 320,120 in the database. Why?" (rhetorical) | - | - | Image resizing -> relative coordinates + bounding box (L-0212-L-0216) |
| P28 | 02:06:55 | "How would you approach this problem? Let's brainstorm." (newly unread) | S3: newly = since last click; read flag, last_read_at, filter unique senders; S3 jumps to a message queue partitioned on from-user | "Let's go step back. What is the input to the system? Are you storing all the messages...?" | messages + user_activity (L-0233-L-0240) |
| P29 | 02:12:33 / 02:13:09 / 02:14:07 | "What's your query to get the unique users count? ... What is the problem in this query?" (asked three times as the query improves) | S3: order the messages; S3: count unique `from`; S3: index on timestamp, then (to, ts, from) | "You just want to render the count. Why order?"; composite index (to, from, ts); agrees to S3's order; "still expensive... 10,000 entries to find the count is one" | Crude but correct; inefficient at scale (L-0241-L-0250; factcheck L-0246) |
| P30 | 02:19:28 | "How will you optimize this?" | S4: non-relational store, per-user key with a count and a unique-users set | "What is the difference between this and this? ... Do you really need this? Every set keeps track of its length" | Per-user set of senders, delete on click (L-0252-L-0257) |
| P31 | 02:25:32 | "Which database would you pick to store this?" | S1: NoSQL (MongoDB-like), user id -> set of user ids | "Let's use Redis... any key-value store that gives you set functionality" | Redis (L-0263, L-0264) |
| P32 | 02:27:52 | "How will you update this Redis with the data you need?" | S4: client must be smart (already on the tab); backend checks the WebSocket connection | "Brilliantly put" | Messaging service emits `ON_MSG_UNSENT` -> Kafka -> workers (L-0267-L-0276) |
| P33 | 02:32:45 / 02:33:47 | "You are almost converged onto the design, but no, this is not good. Why? ... Are you doing any unnecessary operations?" (rhetorical, walked path by path) | - | - | Write path does N-1 no-op set inserts (L-0279-L-0287) |
| P34 | 02:39:07 | "What's the worst case? ... What if this [auxiliary Redis] goes down?" (rhetorical) | - | - | All writes fall back to the main cluster - the pre-pattern behaviour (L-0294) |
| P35 | 02:45:27 | (to a student) "What is the edge case that you're talking about? Help me understand." | S2/S?: auxiliary and main getting out of sync after a clear | "Not even denying that... but it's not the end of the world" | Accept inconsistency; no distributed transaction (L-0305-L-0307) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"Gravatar URLs carry `md5(email)`. You decided not to store the hash because it's derivable. Write the query that finds a user's photos - how many of 10,000 rows does it read?"** (P8-P11, 00:36:12-00:42:24). The lecture's signature "aha": the class arrives at the full scan itself, and the teacher openly contradicts the previous day's rule. Strong because the "clean" design is the slow one.
2. **"`update photos set is_active = true where id = ?`. Three lines. Find everything wrong with it."** (P12-P15, 00:44:56-00:54:12). Four rounds, three real bugs (old photo stays active, crash between updates, someone else's photo id). Perfect as a staged reveal: one hint per round, as the teacher gave them.
3. **"Where should 'active' live - on the photo, or on the user?"** (P16-P17, 01:00:43-01:05:53). Counterintuitive answer that deletes the transaction problem from prompt 2; teacher notes every cohort starts with `is_active`.
4. **"The badge on your messages icon says 3. You have 300 unread messages. What exactly is 3, and what makes it go to 0?"** (P28, 02:03:15-02:07:24). Forces precise requirements before design; the demo makes it concrete.
5. **"Your Redis set already contains user B. B sends you 29 more messages while you're offline. How many writes hit the database, and how many changed anything?"** (P33, 02:34:23-02:36:03). Readers can count; sets up the auxiliary-database pattern.
6. **"The CXO says: 'let's allow people to tag people in photos.' List five questions - none of them about the schema."** (P21-P26, 01:40:40-01:57:46). The teacher's "no engineering answers" rule is the exercise; each answer maps to a team or schema consequence.
7. **"Max 5 tags per photo vs max 10,000: what changes in storage and in the API?"** (P22, 01:47:32). Clean extreme-values comparison with a crisp answer (array vs rows + pagination).
8. **"A user taps at (320, 120) on a 720x720 photo. A phone shows the photo at 360x360. Where does the tag land if you stored pixels?"** (P27, 01:58:42). Arithmetic the reader can do; payoff is relative coordinates and bounding boxes.
9. **"Why doesn't the CDN point straight at S3 for gravatar.com/<hash>?"** (01:18:26). Short, and the right answer (only the database knows which photo is active) is a source-of-truth lesson. Use the fact-check wording (L-0139).
10. **"Why isn't GitHub storing a social image for every repository?"** (P3, 00:19:54). Opens the lecture's first idea (on-demand generation behind a CDN) with a question readers can reason about (millions of repos, data changes daily).

Runner-up: "Count the unique senders with SQL - which composite index order lets the timestamp cut the scan?" (P29, 02:16:15-02:17:12) - good for an "advanced" toggle; the student corrects the teacher's first order.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:06:43 | Browser = "a dumb, stupid piece of software"; platforms (browser, Android, iOS SDKs) must be basic building blocks | Why the browser relies on fixed behaviour (GET + header), not on the extension (L-0016, L-0017) | Good one-line callout at the top of the images section |
| 00:52:54 | "Like you wrote one print statement and ask why my program is not running" | How hard it is to spot a bug in a tiny query (L-0096) | Use as the hint text when the reader is stuck on prompt 2 |
| 00:55:57 | Code review: 5 lines -> 50 comments, 500 lines -> "looks good to me" | Simple systems get (and deserve) the most scrutiny (L-0100) | Pair with the mark-active bug hunt |
| 01:41:39 | Senior engineer wears **three hats at once**: product manager, architect, engineer | Frame for the tagging exercise (L-0179-L-0182) | Make a 3-part visual; tagging covers hat 1 |
| 02:36:33 | Database = Voldemort's Deathly Hallows - keep it protected "by all the magical charms" | Protect the brittle database (L-0289) | Light touch; keep it short |
| 02:48:21 | The rose in *Beauty and the Beast* under a glass jar | Even a read on the main Redis is load you don't want (L-0309) | Best placed on the "why not read-before-write?" box |
| ~02:29:22 | "Now that the cat is out of the bag" | Teacher switches from Socratic to telling once a student names the input | Not content; note only |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:02:52 | Justin Bieber posts -> notifications to 10-15 million followers | Fan-out beyond Kafka's partition parallelism (L-0008; factcheck inline L-0008) | Forward/backward chip to Lecture 1's Kafka->SQS fan-out |
| 00:04:16 | Teacher's own job: 50,000-60,000 notifications in 5 seconds for aggressive marketing; Kafka/Kinesis + SQS/RabbitMQ | Real use of the stream + broker pattern (L-0012) | War-story box |
| 00:04:16 | First-ever YouTube video, first cohort ("March 20"), notification system | Where to learn more (L-0006) | Link chip |
| 00:11:16 | `/static/img/appy.jpg` mapped to the static folder | Static file serving is code (L-0026, D-01) | Diagram D-01 |
| 00:13:40 | `/raw/<path>` -> S3 in "three, four lines of code" | Web server as an S3 proxy (L-0029, L-0030) | Show the Flask handler from D-01 |
| 00:16:16-00:18:09 | DiceDB repo shared on social media: card with contributors, issues, stars, forks | On-the-fly images (L-0034, L-0035) | Use a screenshot-free description or the teacher's own example |
| 00:18:57 | Contributor count "74 to 75"; "if you become a contributor the count will change" | Image reflects current state, so it can't be pre-generated (L-0039) | |
| 00:20:48 | `opengraph.githubassets.com` vs `githubusercontent.com` | GitHub runs a separate CDN for OG images (L-0042) | |
| 00:22:16 | Template + PIL / ImageMagick | How the origin renders (L-0045, L-0047; factcheck note L-0047: Pillow is not built on ImageMagick) | Use the corrected library wording |
| 00:23:42 | Bannerbear; Twitter could natively render a tweet card instead of LinkedIn screenshots / poet.so | Product value of dynamic images (L-0048, L-0049) | Hypothetical - label as such |
| 00:25:17 | "You can literally build this in hardly one hour" | Prototype challenge (L-0051) | "Build it" box |
| 00:26:10 | Old GitHub shares showed the user's "big flashy" avatar | Poor UX that motivated the feature (L-0052) | |
| 00:28:12-00:28:56 | `arpit@gmail.com` -> `gravatar.com/0eafd172` in an `<img>` | Gravatar URL mechanics (L-0057, L-0058; factcheck note L-0057: SHA-256 now, MD5 historically) | Must carry the outdated-hash note |
| 00:30:54 | Gravatar prototype in three or four hours | Build it (L-0061) | |
| 00:39:45 | 10,000 rows | Full scan from `HASH(email) = ?` (L-0080) | |
| 00:50:57 | Facebook renders a profile photo -> 404 because no photo is active | Why the transaction matters (L-0093) | Make this the visual failure state |
| 01:05:53 | "15th cohort... every single cohort people start with is_active" | Trained habits (L-0114) | Quote it |
| 01:08:25 | Facebook/Instagram adopting Gravatar -> millions of hits; "your AWS bill will shoot up" | Serve via CDN (L-0119) | |
| 01:11:52 | CDN TTL 1-2 days for photos | Why explicit invalidation (L-0127, L-0128) | |
| 01:12:47 | Cloudflare, Akamai invalidation APIs | (L-0130) | |
| 01:23:23 | Facebook profile photo at 16x16 / 32x32, 256x256, 512x512 | Same image, many sizes (L-0149) | |
| 01:24:10 | `w=32` query parameter | On-demand transform (L-0151) | |
| 01:28:00 | Cloudflare or Cloudinary "shortest blog": ImageMagick on 32/64-core servers, scale the fleet | Nothing magic (L-0162; teacher unsure which company) | Keep "teacher unsure which" |
| 01:32:15 | Boolean = 8 bits ("8 bytes" corrected to bits); tiny-int enum | Column type choice (L-0169, L-0170) | |
| 01:40:40 | CXO's one-line product briefing | Requirements are your job (L-0176) | Opening of the tagging section |
| 01:47:32 | 5 vs 10,000 tags | Requirement -> storage schema (L-0189, L-0190) | |
| 01:49:32 | "Someone tagging you in a very shitty photo and you don't even know" | Why notify (L-0192) | Soften wording on the site |
| 01:50:40 | Good apps send ~3-5 notifications a week; daily ones get uninstalled | Product-level throttling (L-0195, L-0196) | |
| 01:51:49 | Student: a celebrity tagged by many people | Notification flood (L-0198) | |
| 01:53:02 | Being tagged in an obscene photo | Self-removal requirement (L-0201) | |
| 01:53:41 | Facebook-style "this looks like your friend" suggestions | ML dependency (L-0203; factcheck note: Facebook shut face recognition in Nov 2021) | Must carry the outdated note |
| 01:57:46 | "Someone tagged Arpit - do Arpit's followers see it in their feed?" | Feed team impact (L-0211) | |
| 01:58:42 | 720x720 image, tap at (320,120), device shows 360x360 | Relative coordinates (L-0212, L-0213, D-06) | Interactive slider candidate |
| 02:03:30-02:04:43 | Live Instagram badge demo (LinkedIn/Twitter empty; "Flying taxi" chat) | Newly unread vs unread (L-0225, L-0228) | Recreate as an animated badge |
| 02:05:58 | Badge 3 = 300 messages from 3 people | Unique-senders twist (L-0231) | |
| 02:17:18 | One sender, 10,000 messages -> 10,000 index entries to learn "1" | Why the indexed query is still expensive (L-0248) | |
| 02:35:05 | Friends send 5, 10, 15, 20, 30 short messages ("Hey, what are you doing? Come here") | N-1 no-op writes (L-0285) | |
| 02:41:19 | Teacher guessed Kafka's internals before reading them, from storage-engine intuition | Why next week matters (L-0299) | Forward chip |
| 02:42:15 | Student: show "100+" and stop writing past a threshold | Threshold optimization (L-0300, L-0301) | |
| 02:45:50 | Worst case of the inconsistency: badge shows 2 while 300 messages wait | Acceptable error (L-0305) | |
| 02:52:05-02:54:26 | Teacher learned query optimization from college textbooks; EXPLAIN in a production console + official docs, one query at a time, 3-4 months | How to get good at it (L-0312-L-0320) | "Further practice" box |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:02:52 | Kafka alone vs Kafka + SQS | Partition count caps parallelism; a broker gives fan-out (L-0009, L-0010) |
| 00:13:40 | `/static` (local disk) vs `/raw` (S3) | Same handler idea, different source (L-0030) |
| 00:19:54, 01:24:10 | Pre-generated / async variants vs on-demand generation | Freshness and the sheer number of objects; on-demand must be synchronous (L-0040, L-0150, L-0161) |
| 00:38:15 | Encryption vs hashing | Hashing is lossy, can't be reversed (L-0075) |
| 00:41:32 | Don't store derivable vs store it | Store it if deriving it kills index use on a frequent query (L-0082) |
| 00:46:58 | Passing user_id for speed vs for ownership | PK lookup is already log n; user_id is for security (L-0088, L-0097) |
| 00:58:23 | Inner vs left join | Same performance here - not the optimization (L-0103) |
| 01:03:48 | `is_active` on photos vs `active_photo_id` on users | Frequent read avoids a join; write becomes one query (L-0111, L-0112) |
| 01:18:26 | CDN origin = API server vs = S3 | Only the DB knows which photo is active (L-0139, L-0140) |
| 01:20:43 | Join criterion vs filter | The hash filter narrows first; the user_id join is just the foreign key (L-0141, L-0142) |
| 01:22:52 | TTL expiry vs explicit CDN invalidation | User expects to see the new photo immediately (L-0128) |
| 01:32:15 | Boolean vs integer enum vs string | Tiny int, extensible; never strings (L-0168, L-0170) |
| 01:34:23 | Slack membership table vs Gravatar one-to-many FK | Membership carried extra per-pair data (L-0173) |
| 01:48:12 | Tags as array in a document vs separate rows | Max limit size (L-0189, L-0190) |
| 01:50:40 | Infrastructure throttling vs product-level notification throttling | User annoyance, not load (L-0195) |
| 01:59:44, 02:00:23 | Absolute vs relative coordinates; point vs bounding box; LTRB vs x,y,w,h | Resizing; hover area; whatever the front end prefers (L-0213-L-0216) |
| 02:04:03 | Unread vs newly unread | Acknowledging presence vs reading (L-0226, L-0227) |
| 02:16:15-02:17:12 | Index (to, from, ts) vs (to, ts, from) | Timestamp range can cut the scan (L-0246, L-0247) |
| 02:18:14 | Crude vs incorrect | Correct but inefficient (L-0250) |
| 02:23:39 | Query the source of truth vs keep pre-computed data | Strong consistency vs efficiency; who keeps it updated (L-0258-L-0262) |
| 02:39:07 | Main Redis down vs auxiliary Redis down | Main = product down; aux = back to old load (L-0294) |
| 02:46:20 | Distributed transaction vs accept inconsistency | Not money; what's the worst that would happen (L-0296, L-0306) |
| 02:48:21 | Read-before-write on main vs auxiliary store | Any instruction on the brittle DB costs CPU (L-0308) |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:44:11, 02:01:16 | "Drawing boxes is easy... the devil lies in the details" | Section epigraph for Gravatar and tagging |
| 00:25:17, 00:27:05, 00:30:54, 01:29:36 | "Nothing is theoretical... build a local prototype" (one hour / three-four hours / two days) | One "Build it" box per system |
| 00:41:32, 01:08:10 | "Today I will contradict yesterday" - store derivable data when it makes queries fast | Rule-with-exception callout |
| 00:47:12, 00:54:55, 01:05:53 | "A very simple use case has so many hidden intricacies" / "always challenge your own beliefs, unlearn, relearn" | Close of the Gravatar section |
| 00:59:44, 01:02:29, 01:04:20 | "I'm extremely nitpicking" | Label the optimization honestly as micro |
| 01:33:27 | "If we take care of security here and lapse over here, that would not work" | Security callout on every write query |
| 01:40:40, 01:51:56, 01:57:46, 02:01:16 | "Senior management has not thought this through... it's your responsibility" | Tagging section framing |
| 01:48:12 | "Every single question that we ask... should positively influence our design" | Requirements checklist rule |
| 02:01:16 | "Anything that you're interfacing with, you will put it in Kafka no matter what" | Extensibility callout (D-07) |
| 02:02:03 | "Engineers can propose product ideas... think as an end user" | Closing of tagging |
| 02:18:14, 02:25:10 | "Crude, not incorrect" / "neither is wrong; it depends on your scale" | Before every optimization step |
| 02:23:39 | "You either query the source of truth, or you keep things pre-computed" | Named pattern card |
| 02:33:01, 02:36:33, 02:48:21 | "Database is the most brittle component... protect it" (also Lecture 1, 00:48:35) | Cross-lecture heuristic card |
| 02:37:16, 02:40:07 | "It's all about trade-off" / "pick your battles" | Auxiliary pattern close |
| 02:46:51, 02:47:37 | "What's the worst that would happen?" / "you feel you are cheating... in the real world it really does not matter" | Consistency-budget callout |
| 01:27:05, 01:29:09, 01:30:18 | "Nothing magic... throw money, bulky machines" | On-demand optimization close |
| 01:21:24, 02:53:34 | "Just Google that" (predicate pushdown, EXPLAIN) | Link out to docs |

---

## 4. The Gravatar -> tagging -> unread-badge case-study thread (proposed spine)

The lecture has no single running product; it has a **chain of four small systems**, each reusing the previous one's parts. The spine is that chain.

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:00:02 | "Instagram private images are not really private - what if we want to make one?" (from yesterday) | Why we control serving ourselves | Teacher promised it but never returned to "private" explicitly; don't invent the private-platform design |
| 00:07:44-00:12:04 | `<img src>` -> GET -> static handler (D-01) | Image serving is code | Foundation for everything below |
| 00:12:45 | `/raw/<path>` from S3 | Handler can read anywhere | Becomes Gravatar's origin at 01:09:07 |
| 00:16:16-00:23:04 | GitHub repo social card | On-demand generation behind a CDN | Becomes on-demand optimization at 01:24:45 |
| 00:27:22 | Gravatar: one URL for your photo everywhere | Product framing | Start of the Gravatar spine |
| 00:32:08-00:36:12 | users / photos tables (D-02) | Schema by questioning every column | |
| 00:36:12-00:44:56 | "Show all my photos" given only a hash | Index-friendly WHERE, stored derived column | Prompt #1 |
| 00:44:56-00:56:15 | "Mark this photo active" | Transactions, ownership/security | Prompt #2 |
| 00:56:15-01:07:29 | "Render my active photo" (most frequent query) | Denormalize: active_photo_id | Prompt #3 |
| 01:07:29-01:13:29 | Upload (reuse) + serve via CDN + invalidate via Kafka (D-03, D-05) | CDN property and origin, invalidation workers | |
| 01:23:08-01:30:18 | Same Gravatar photo at 32 px and 512 px | On-demand image optimization at the origin | Teacher frames it as "for our Gravatar use case" (01:24:45) |
| 01:40:40-02:02:03 | Tagging people in (Instagram-like) photos | Requirements, cross-team impact, relative coordinates, Kafka for extensibility (D-06, D-07) | Separate social product; link via "photos" |
| 02:02:56-02:40:35 | Messages badge on Instagram/LinkedIn/Twitter | Pre-computed vs source of truth; auxiliary database (D-08-D-13) | Reuses WebSocket / online-offline knowledge |

Gaps where the case studies are *not* used but could carry the content (without inventing claims): the Kafka + SQS fan-out pointer (00:02:52) could sit in the tagging section next to "tag notifications" since both are notification fan-out - but present it as the teacher's pointer, not a design he did here; the tagging section never draws a schema beyond `posts_tags(post_id, user_id, location)` (board, L-0214) - keep it to that; the auxiliary-database pattern is only shown on the unread badge - the site may *ask* whether Gravatar's CDN invalidation or tag notifications have no-op writes, but must not answer for the teacher; "private image platform" (00:00:02) is never designed - list as an open thread.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:05:38 | "Images are served" - as if it happens by itself | General | Someone wrote the handler that reads and returns bytes (L-0014) |
| 00:06:43 | The browser knows a URL is an image from its `.jpg` extension | Students "four or five weeks back" | Browser makes a GET and decodes by the format header (L-0015; factcheck inline L-0021: SVG by Content-Type) |
| 00:14:37 | A web server can only return JSON | General | It can return any bytes, including images (L-0032) |
| 00:19:54 | Social card images are pre-generated and stored | General | Generated on demand and cached on a CDN (L-0040) |
| 00:22:16, 01:25:27 | PIL "internally uses ImageMagick"; ImageMagick "purely C++" | **Teacher** | See factcheck L-0047, L-0154, L-0155: Pillow has its own C core; ImageMagick is C with C/C++ APIs |
| 00:28:12 | Gravatar uses MD5 of the email | **Teacher** (historically true) | See factcheck L-0057: SHA-256 now, MD5 historically; L-0054: an unsalted hash hides the email only from casual view |
| 00:32:51 | Store only the hash, not the email (it's derivable, saves space) | S2, S? | Need the email for login, profile display; collisions would lock you into someone else's account (L-0065, L-0066) |
| 00:37:48 | You can "decrypt" a hash to get the email back | S1 | Hashing is lossy, not encryption (L-0075) |
| 00:41:32 | "Whatever is derivable, don't store it" is always right | Yesterday's rule (teacher's own) | Store it when computing it in WHERE defeats indexes (L-0081, L-0082; factcheck L-0081: expression indexes also exist) |
| 00:46:51 | Adding user_id to a PK update makes the scan smaller | S1 | PK lookup is already log n; user_id is needed for ownership, not speed (L-0088, L-0097) |
| 00:50:57 | Two dependent updates are fine without an explicit transaction | General ("people skip it") | A crash between them leaves no active photo -> 404 (L-0093, L-0094) |
| 00:51:54 | A transaction makes concurrent requests safe | S2 (teacher agreed) | See factcheck L-0095: atomicity is not isolation - lock the user row or use active_photo_id |
| 00:58:23 | Inner vs left join is the optimization | S1 (asked) | Same performance here (L-0103) |
| 01:00:09 | The is_active filter is the extra work | S1 | It's a cheap lookup on the user's few rows (L-0105; factcheck inline: is_active itself isn't indexed) |
| 01:04:20 | `is_active` is obviously a property of the photo | Everyone, "every cohort" | `active_photo_id` on users is simpler and faster (L-0112, L-0114) |
| 01:15:28 | A zero-row update inside a transaction will roll back by itself | S1 (01:17:32) | Check first / read affected rows; see factcheck L-0135, L-0137 |
| 01:18:26 | The CDN should point directly at S3 | "One common question" | S3 doesn't know which photo is active; DB is the source of truth (L-0139, L-0140; factcheck L-0139: private buckets aren't the reason) |
| 01:19:15 | Hashing at runtime in the query is fine | S2 (DK) | Full table scan (L-0081) |
| 01:19:52 | The query should filter on user_id | S2 | user_id is only the join criterion; the input is the hash (L-0141) |
| 01:24:10 | Image optimization = upload, then workers create variants | General | On-demand: transform synchronously at the origin per request (L-0150) |
| 01:28:00 | On-demand optimization can be made async | General | The URL load needs the image now (L-0161) |
| 01:43:08 | Requirements brainstorming starts with the schema | S1 | "Nothing around engineering" - product questions first (L-0184) |
| 01:43:37 | The important tagging rule is that only the owner can tag | S1 | More important: who is allowed to tag **me** (L-0185, L-0186) |
| 01:46:57 | A tag limit implies concurrency problems | S5 | Only the owner tags, so concurrency is not the challenge (L-0188; factcheck inline L-0188) |
| 01:57:46 | "Allow tagging" is a one-team feature | Senior management | Touches notification, ML, feed, search, profile, authorization (L-0210, L-0218) |
| 01:58:42 | Store the tag's pixel coordinates | General | Relative coordinates + bounding box (L-0212, L-0213) |
| 02:04:03 | The badge counts unread messages | General | It counts newly unread (since last click), here unique senders (L-0226, L-0231) |
| 02:09:26 | Start the unread design with a message queue partitioned by sender | S3 | Step back: what is the input? (L-0237) |
| 02:12:33 | Fetch/order the messages to get the count | S3 | You only need a count (L-0241) |
| 02:14:36 | An index on timestamp fixes the count query | S3 | Composite (to, ts, from) helps, but iterating N entries is still expensive (L-0244-L-0248) |
| 02:20:02 | Keep a separate count next to the set | S4 | A set tracks its own length - O(1) (L-0255) |
| 02:32:45 | Read path + write path = design done | "Lot of people" | Audit for unnecessary load on the brittle DB (L-0279) |
| 02:34:23 | Each write is "bare minimum" | Implied | With a set value, N-1 writes change nothing (L-0284) |
| 02:44:03 | The auxiliary Redis stores every message / increments a count | S2 | Existence only - one write per sender pair (L-0303, L-0304) |
| 02:46:42 | Both stores must be updated in a distributed transaction | S2 | Not worth it for a badge (L-0306, L-0307) |
| 02:47:58 | A read-before-write on the main store is as good as an auxiliary store | S2 | Even reads consume the protected DB's CPU (L-0308) |
| 02:55:29 | The auxiliary Redis can be a single node | S2 (asked) | It also needs to be a cluster (L-0321) |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- **Yesterday (week 4, day 1, not in the source set)**: CDN basics, CDN properties and origins (`edge.arpitbhayani.me`), CDN image transformations via query params, photo upload service with pre-signed S3 URLs, GitHub issues image upload / PNG bytes, "don't store what's derivable", document-size limits ("like what we discussed yesterday", 01:48:12).
- Earlier lectures: Kafka partitions and consumer parallelism, Kafka -> SQS fan-out (Lecture 1); "DB is the most brittle component" (Lecture 1); transactions and atomicity (Lecture 5); online/offline indicator (Lecture 4); WebSockets (Lecture 1); Slack design with a membership table (week 2, day 2 - not in the source set).
- HTTP GET, response codes (2xx), HTML `<img>`, web frameworks' static folders (nginx, Spring Boot, Flask, Django).
- SQL: SELECT/UPDATE/JOIN, primary/unique keys, indexes, composite indexes, auto-commit; query optimizer (named), B-tree log n lookups.
- Hash functions (MD5), collisions; Redis sets; S3 keys and buckets.
- Image formats (PNG/JPEG headers), image libraries (PIL, ImageMagick) named only.

### Concept graph (A -> B means B builds on A)
```
IMG tag -> HTTP GET -> browser decodes by header (00:07:44)
  -> static folder mapping is code (00:09:58)
  -> custom handler (/raw -> S3) = web server returns any bytes (00:12:45)
  -> image need not exist: generate on the fly (00:15:30)
  -> OG image + CDN in front + origin renders template + TTL (00:18:09-00:23:04)
       -> Gravatar origin api.gravatar.com/photo/<hash> (01:09:07)
       -> on-demand image optimization at the origin (01:24:45) -> CPU-heavy, synchronous -> bulky autoscaled fleet (01:27:05)

Gravatar product: hash(email) URL (00:28:12)
  -> schema questioning (email kept; hash "derivable"; path derived) (00:32:08)
  -> query by hash -> computation in WHERE -> full scan -> stored indexed hash column (00:41:32)
       [needs: indexes; contradicts "don't store derivable"]
  -> mark active: unset old -> two updates -> transaction (00:50:57) -> ownership check (00:54:12)
       [needs: transactions, Lecture 5]  -> check-before-update / affected rows (Q&A 01:15:28)
  -> active-photo read -> predicate pushdown / join criterion (Q&A 01:21:24)
  -> active_photo_id on users (denormalize) -> single-query write (01:03:48)
  -> CDN property gravatar.com, origin API (DB is source of truth for "active") (01:09:48, 01:18:26)
  -> photo update -> Kafka -> invalidation workers -> CDN purge API (01:11:52)

Senior engineer three hats (01:41:39)
  -> product hat on "tag people in photos":
       who can tag me -> authorization layer -> self-removal -> granular authz
       max tags -> storage schema (array vs rows) -> pagination
       notifications -> notification team scale + product throttling
       suggestions -> synchronous ML dependency -> SLA -> fallback (product call)
       activity/profile -> tags queryable by user -> database choice
       feed -> feed team scale
  -> engineer hat: relative coordinates -> bounding box (LTRB / x,y,w,h)
  -> architect hat: PHOTO_TAG event on Kafka, many consumers (extensibility)

Newly unread definition (02:04:03) -> unique-senders twist (02:06:30)
  -> crude: messages + last_read_at + COUNT(DISTINCT from) -> composite index (to, ts, from) -> still O(messages)
  -> pre-computed per-user set; O(1) size; delete on click  => SOURCE OF TRUTH vs PRE-COMPUTED (02:23:39)
  -> Redis (any KV with set values) -> get / clear APIs
  -> write path input: messaging service knows delivery [needs: WebSockets, online/offline service]
       -> ON_MSG_UNSENT umbrella event -> Kafka -> status-update workers -> Redis cluster
  -> audit: DB is brittle + N-1 no-op writes
  -> AUXILIARY DATABASE pattern (existence checks) -> failure analysis -> accept inconsistency
  -> Q&A: threshold "100+", key model B_C, no distributed tx, no read-before-write, aux is a cluster
```

Cross-links worth surfacing on the site:
- **Source of truth** appears three times: DB (not S3) knows the active photo (01:18:26); messages table vs pre-computed set (02:23:39); messaging service knows delivery (02:30:36).
- **Denormalize / pre-compute for the frequent read**: stored hash (00:43:15), active_photo_id (01:02:29), the per-user set (02:24:25) - the same move three times.
- **"Store what's derivable when it pays"** ties the hash column to the unread set.
- **Kafka as the extension point**: CDN invalidation (01:11:52), PHOTO_TAG consumers (02:01:16), ON_MSG_UNSENT (02:31:34), plus the opening fan-out pointer (00:02:52).
- **Protect the database** (Lecture 1 heuristic) now gets a concrete pattern (auxiliary DB).
- **On-demand behind a CDN** links the GitHub card, Gravatar serving and image optimization.

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:00:02 | Yesterday's CDN digression; "Instagram private images are not really private" fork; "CDN gives us image optimization" (L-0002, L-0003) |
| 00:02:52 | "Yesterday also we saw" Kafka parallelism limited by partitions; Kafka + SQS fan-out (also Lecture 1, 02:43:15) |
| 00:06:43 | "Four or five weeks back" students thought the extension tells the browser |
| 00:08:46 | Yesterday's GitHub-issues image upload: PNG header bytes |
| 00:20:48, 01:10:34, 01:18:03 | `edge.arpitbhayani.me` CDN property from yesterday |
| 00:35:19, 00:41:32, 01:08:10 | Yesterday's rule: don't store what's derivable (contradicted today) |
| 01:07:29 | Yesterday's photo upload service with pre-signed URLs, reused unchanged |
| 01:26:21 | Yesterday: CDNs offer transformations via query params |
| 01:33:52 | Slack design: users, channels and a membership table (student) |
| 01:48:12 | "Like what we discussed yesterday" - one document growing too big |
| 02:28:16, 02:30:36 | WebSocket connections and the online/offline indicator service (Lecture 4; WebSockets Lecture 1, 01:59:25) |
| 02:33:01 | "As I always say, database is the most brittle component" (Lecture 1, 00:48:35) |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 01:07:25, 01:23:02, 01:34:52 | Questions from S9 ("we'll come back"), a student ("I'll take your question in some time") and another ("at the end") | Not visibly revisited in the transcript - open |
| 01:29:09 | Asynchronous processing | "In six weeks", with video streaming |
| 01:41:39 | Senior engineer's three hats | "I will also repeat it next week, next to next week" |
| 02:11:15 | Scale of the messages table | "We'll touch upon that later" - not revisited |
| 02:40:48 | Storage engines: build three, internals of databases | Next week |
| 02:53:07 | Phantom reads, SQL query optimization, indexing evaluation | Teacher's YouTube members series |
| 02:54:26 | "I should create a video on this" (query-optimization practice) | Unscheduled |

Site handling: keep these as "coming in a later lesson" chips; the unanswered deferred questions and the never-designed "private image platform" belong in an "open threads" note, not invented answers.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets and student war stories) must survive. Q&A answers are redistributed into the topic they belong to (mapping below the options).

### Option A - "Four systems, four habits" (RECOMMENDED)
Keep the teacher's order, but make each system's *habit* the section title:
1. **Intro**: lecture goal (senior-engineer thinking), four systems, the Kafka + SQS fan-out pointer as a "from earlier" chip.
2. **Images are just responses** (habit: know what really happens): IMG -> GET -> header -> handler (D-01) -> `/raw` S3 proxy -> prompt #10 (GitHub card) -> OG image on demand behind a CDN -> Bannerbear/Twitter -> build-it box.
3. **Gravatar: the devil is in the query** (habit: write the exact query): product + requirements -> schema prompts (email? hash? paths?) -> prompt #1 (hash in WHERE, stored column) -> prompt #2 (mark-active bug hunt, staged hints) -> prompt #3 (active_photo_id) -> architecture: upload reuse, CDN property/origin, prompt #9 (why not S3), invalidation via Kafka (D-05). Q&A folded in (check-before-update, predicate pushdown, Boolean vs enum, membership table, why no user id in the hash).
4. **On-demand image optimization** as the Gravatar epilogue: sizes problem -> query params -> origin transforms -> CPU-heavy, synchronous, bulky fleet -> "two-day prototype" box.
5. **Tagging: the product hat** (habit: every question changes the design): three hats -> prompt #6 (five questions) -> authz, limit (#7), notifications + throttling, self-removal, ML suggestions + SLA + fallback, activity/queryability, feed -> engineer hat: #8 relative coordinates + bounding box -> architect hat: PHOTO_TAG on Kafka.
6. **Newly unread badge: pre-compute vs source of truth** (habit: then audit the load): demo + #4 -> crude SQL + index order -> per-user set -> named pattern card -> Redis + get/clear -> write path via messaging service and ON_MSG_UNSENT -> #5 (N-1 writes) -> **auxiliary database pattern** with failure analysis, threshold "100+", key model, consistency budget, no read-before-write, aux is a cluster.
7. **Recap**: habit cards + heuristics (devil in details, store derived when it pays, protect the DB, crude not incorrect, pick your battles) + next-week chip (storage engines) + "how to get good at query optimization" box + open threads.

Pros: preserves the teacher's deliberate build-up (each system reuses the previous); the habits are his own stated goals (00:01:07, 01:34:52); student-driven discoveries stay as staged prompts. Cons: the four systems are loosely related - needs explicit "what you'll learn here" headers; long page.

### Option B - "Patterns first"
Organize around the three reusable patterns: (1) **On-demand behind a CDN** (GitHub card, Gravatar serving, image optimization); (2) **Pre-compute / denormalize for the frequent read** (hash column, active_photo_id, unread set) with the source-of-truth trade-off; (3) **Protect the brittle DB** (auxiliary database, CDN offloading). Tagging becomes a separate "requirements workshop".
Pros: strongest cross-linking; reads like a pattern catalogue for revision. Cons: breaks Gravatar into three places; loses the staged bug hunt context; tagging sits apart awkwardly.

### Option C - "Two pages"
Page 1: images + Gravatar + on-demand optimization (one product end-to-end). Page 2: tagging + unread badge (senior-engineer thinking and the auxiliary pattern).
Pros: shorter pages; clean break where the teacher himself breaks (01:34:52, "we'll wear a different hat"). Cons: the "protect the DB / pre-compute" link between Gravatar and the badge needs explicit cross-page links; course navigation gets one more node.

**Recommendation**: Option A for the main page, with Option B's three pattern cards as recurring callouts ("Pattern: pre-compute for the frequent read" appears at the hash column, active_photo_id and the unread set). If the page is too long, split as in Option C at the break, keeping Option A's order inside each page.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| Hint request for the minor optimization (00:56:51) | Gravatar - active-photo query (prompt #3 hint) |
| Why keep is_active in photos at all? (01:03:21) | Gravatar - is_active vs active_photo_id |
| S9 "one question" deferred (01:07:24) | Open threads note (never asked on record) |
| Wrong photo id inside the transaction; check before update; zero-row alarm; app vs rollback (01:14:14-01:17:32) | Gravatar - mark-active, "keep exactly one active" box (with factcheck L-0135/L-0137) |
| CDN mapping explained; why not CDN -> S3 (~01:17:56-01:19:02) | Gravatar architecture - CDN property/origin + prompt #9 |
| Runtime hashing = full scan (01:19:15) | Gravatar - hash column |
| Join criterion vs filter; predicate pushdown; evaluation tree bottom-up (01:19:52-01:21:24) | Gravatar - active-photo query, "how the DB runs it" box |
| CDN invalidation by API call, not TTL; UX (01:22:15) | Gravatar architecture - invalidation |
| Cleaned-up `update users set active_photo_id ... where hash = ?` (01:30:56) | Gravatar - final queries (board D-02) |
| Boolean vs tiny-int enum vs string (01:31:54) | Gravatar - schema, column-type note |
| Check the photo belongs to the user; security everywhere (01:32:58) | Gravatar - ownership check |
| Slack membership table vs one-to-many (01:33:52) | Gravatar - schema, "why no join table" note |
| "100+" threshold, skip writes past it (02:42:15) | Unread badge - auxiliary pattern, extra optimization |
| Auxiliary key model `B_C: true` vs a set (~02:43:21) | Auxiliary pattern - data model |
| Aux stores existence, not every message, no count (~02:44:03-02:45:00) | Auxiliary pattern - write flow |
| Clear status and resync; one write fails (~02:45:00-02:46:20) | Auxiliary pattern - failure/consistency box |
| Transactional update of both stores - not required (02:46:42) | Auxiliary pattern - consistency budget |
| Read-before-write instead of aux; Beauty and the Beast rose (02:47:58) | Auxiliary pattern - "why not just read first?" |
| Why no user ID in the Gravatar hash (02:48:52) | Gravatar - product/URL section (universal function, any site with your email can render it) |
| What "on message unsent" means; product call (02:49:57) | Unread badge - write path input |
| Resources for query and DB optimization (02:51:47) | Recap - "get good at query optimization" box |
| Auxiliary Redis must be a cluster (02:55:29) | Auxiliary pattern - deployment note |
| In-segment student turns treated as Q&A: tagging proposals (01:43:08-01:56:42), unread proposals (02:07:24-02:28:16) | Already the body of those sections (prompts P21-P32) |

### Things a reader-first version should fix (not drop)
- Carry the fact-check notes where the teacher's own statement is off: PIL/ImageMagick (L-0047, L-0154, L-0155), Gravatar hash algorithm (L-0057) and what the hash protects (L-0054), expression indexes (L-0081), transaction vs isolation (L-0095), CDN -> S3 reason (L-0139), Facebook face recognition shut down (L-0203), indexing arrays (L-0209); add the inline clarifications for check-then-write (L-0135), zero-row updates (L-0137), index order (L-0246), Redis DEL cost (L-0257), set-if-absent (L-0292), aux under-count (L-0305).
- The mark-active queries changed several times on the board (D-02: written, struck through, rewritten at 01:31); show the final versions clearly and the earlier ones as steps.
- The Kafka + SQS fan-out (00:02:52) is a pointer to another video, not taught here - present it as a "from earlier / watch" chip, with the factcheck inline on Kafka share groups (L-0007).
- "Instagram private images" (00:00:02) is promised but not designed; say so rather than fill it in.
- The tagging segment is requirements-only by design; resist adding a full schema or API beyond what was said (`posts_tags(post_id, user_id, location)`, bounding box, Kafka event).
- Admin segments (agenda framing, break, next week, closing) are not content, except the senior-engineer framing (00:01:07), the storage-engine/Kafka-intuition aside (02:41:19) and the query-optimization advice (02:52:05-02:54:40), which stay.
- Transcript uncertainties to verify before publishing claims: "Chandran Anubha" and other name spellings (only matter for anonymization), "8 bytes" -> "8 bits" self-correction (01:32:15), "API.com" turn at 01:18:03, "can" vs "can't" at 01:20:10, `can batch here {if part = recv id` board note (L-0277, uncertain), "strong quota" (02:53:07). See `lectures/lec06/transcript/review_flags.md` and `lectures/lec06/board/flag_resolutions.md`.
