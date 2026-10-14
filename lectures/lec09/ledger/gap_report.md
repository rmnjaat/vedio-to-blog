# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G2-001->G-002, G2-002->G-003, G3-001->G-004.

## Part 1 (00:00:00-01:04:29)

Per-window coverage. "Covered" = part 1 items whose audio sources overlap the window (items spanning a boundary count in both). Every transcript sentence in each window was read and matched to an item.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 16 | 0 | - |
| 00:05-00:10 | 14 | 0 | - |
| 00:10-00:15 | 11 | 0 | - |
| 00:15-00:20 | 12 | 0 | - |
| 00:20-00:25 | 10 | 0 | - |
| 00:25-00:30 | 8 | 0 | - |
| 00:30-00:35 | 9 | 0 | - |
| 00:35-00:40 | 11 | 1 | G-001 |
| 00:40-00:45 | 11 | 0 | - |
| 00:45-00:50 | 8 | 0 | - |
| 00:50-00:55 | 9 | 0 | - |
| 00:55-01:00 | 8 | 0 | - |
| 01:00-01:04:29 | 12 | 0 | - |

Part 1 is well covered: 123 items, and every window has 8-16 items. The only substantive sentence with no item is the teacher's unfinished reason for a separate upload service, "Which would lower network bandwidth / by either, by being closer to the user" (G-001, low confidence, speaker in doubt). Unmatched sentences were all admin or filler: calling on students, "Don't jump", "Prashant Raji, I'll take your questions", "where's my Insta account? Demo", the demo file name convention "N underscore T ... YouTube ID", and "Talk to other ones. Just schedule the call with Android".

A previous draft of this file had an extra gap item for "If you can do that, do that" (00:29:08), the teacher's advice to call the CDN's invalidation API. That item was dropped because it duplicated K1-061, whose source and verbatim already contain the sentence. The recommendation is now a fix to K1-061 (see below).

Verbatims: 123/123 found word for word (validator `part`: PASS, 0 errors, 0 warnings). No spliced quotes found.

### Distortions

- **K1-055**: wrong speaker. The insight is the teacher's answer ("the backend sends it"), not the question, and the verbatim is the teacher's own words. Transcript: "**[00:24:56] Teacher (answer):** We'll send it from the backend, right?". Fix: `speaker` "teacher".
- **K1-111**: (a) "S3 is not meant for that" names a subject the teacher never said. The fragment is ambiguous. Transcript: "you cannot, see, it is not meant for, to do the, CDN is not a blob store." (b) It is typed `misconception` with `speaker` "student (question)" and `status` "endorsed", which contradict each other. Fix: statement "A student asked why not render images directly from S3, since it is blob storage; the teacher's fragmentary reply was 'you cannot ... it is not meant for ... CDN is not a blob store'". Set `speaker` "student (proposal)" and `status` "proposed_then_corrected", with the correction in `detail` and pointing to K1-110 (S3 is not public; only the CDN may read it). Keep confidence medium. Add flag `check: subject of "it is not meant for"`.
- **K1-116**: adds "(durability)", which the teacher never said. He only said "nine nines guarantee, something like that". Transcript: "S3 gives you nine nines guarantee, something like that. Right. CDN gives you different guarantees." Fix: remove "(durability)" and keep the hedge "something like that".
- **K1-091**: the URL is misquoted as "github.com/upload/policies/assets". Transcript: "it made the request to github.com slash upload slash policy slash assets". Fix: write "github.com/upload/policy/assets" (as read aloud). The fact-checker can verify the real path.
- **K1-068**: drops the teacher's hedge and the speaker flag. Transcript: "How big? 5MB? Yeah, probably. Yeah, 5MB. [check: speaker boundary 00:33:00-00:33:10]". Fix: write "probably about 5 MB" and add flag `check: speaker boundary 00:33:00-00:33:10` (the same flag as K1-067).
- **K1-061**: leaves out the teacher's recommendation. Transcript: "CDNs also provide APIs for you to explicitly invalidate the cache for a particular path. If you can do that, do that." Fix: add to `detail`: "The teacher recommends the explicit invalidation API over waiting for the TTL: 'If you can do that, do that.'"
- **K1-085**: leaves out the hedge that opening the bucket is possible. Transcript: "So which is why S3 cannot open. You can still do it, but in this use case, you don't have to do it". Fix: add to `detail`: "Opening the bucket is technically possible ('You can still do it'), but not needed in this use case."
- **K1-002**: adds "busts a lot of assumptions". The transcript says things will be busted, not assumptions: "A lot of things will be busted when we discuss this hashtag service." Fix: "... uncovers hidden components, and a lot of things will be busted".
- **K1-019**: the "not merely 'there to cache things'" clause overstates the point. The teacher's point is that people think a CDN just caches without knowing how, and imagine pushing content to it. He does not deny that it caches. Transcript: "A lot of people only think, hey, CDN is there just to cache things. But how? No, I'll push things to CDN. CDN is not something where you push things." Fix: statement "Many people think a CDN is just there to cache things without knowing how, and imagine they push things to it; a CDN is not something you push things to - CDNs now offer APIs, but that is not their main motive."
- **K1-063**: drops the teacher's "Yeah", which reads as a yes to "can CDN cache live content". Transcript: "Arpit, can CDN cache live content like something we watch, live matches on Hotstar? ... Yeah. We'll talk about it 7.3. 6.3." Fix: statement "Asked whether a CDN can cache live content (e.g. live matches on Hotstar), the teacher answered 'Yeah' and deferred the details to a later session ('7.3. 6.3')". Keep confidence medium and the existing flag.
- **K1-105**: "is faster" restates the teacher's slip. He said loading time increased. Transcript: "You see the high increase in loading time. It's because it is coming from [?CDN | asr: "seed"]". Fix: keep "faster" (the intended meaning is clear from context), but add to `detail`: "teacher's words: 'You see the high increase in loading time'" and flag `check: "high increase in loading time" - meant speed?`.
- **K1-011**: drops "six" from "those six components that we discussed in the first week" (he then lists five). Minor. Fix: "the six components discussed in the first week (listed: caching, database, communication, asynchronous processing, scaling)".

### Duplicates (within part 1)

- K1-077 / K1-079: both say S3 offers PUT and POST for pre-signed uploads and that the URL has a validity window. K1-077 adds the whole proposal: fetch the URL from the API server with the image name and S3 location, and the load moves off the API server. K1-079 isolates the PUT/POST and expiry facts with the student's own verbatim. Merge K1-079 into K1-077, or cut PUT/POST and validity out of K1-077's statement.
- K1-080 / K1-088: both say a direct upload avoids the double 5 MB transfer. K1-080 (00:39:25) adds the saved bandwidth on the service and "you pay for 2x". K1-088 (00:44:03) adds "flexible and efficient", no bulky upload servers, and the "1 times 5 MB" phrasing. Merge and keep both verbatims.
- K1-054 / K1-118: both say a CDN gets AWS keys to read a private S3 bucket. K1-054 adds that it is a plugin-like feature, that not every CDN supports AWS, and the "oversimplified" framing. K1-118 adds that a signed URL is needed only for private images and that public ones are read directly. Merge, or cross-link K1-118 -> K1-054.
- K1-056 / K1-060: both say the backend is responsible for sending the CDN URL and the frontend just renders it. K1-056 adds the IMG tag and "you don't send CDN configuration to the frontend". K1-060 adds the "utterly stupid" catchphrase. Merge, and keep K1-060's verbatim.
- K1-055 / K1-056: partial overlap ("the backend sends the CDN URL"). K1-055 is the Q&A framing and K1-056 the IMG-tag mechanism. Cross-link (already done via depends_on). Keep both.
- K1-058 / K1-059: both say the site does not "call" Akamai. K1-058 adds the abc.com setup and the "explicit, no automatic mass replacement" answer. K1-059 adds that the browser requests the CDN URL and the CDN forwards to the origin. Merge K1-059 into K1-058, or remove the Akamai clause from K1-058.
- K1-040 / K1-041: both say that for a CDN content is just a set of bytes. K1-040 adds the list (API/JSON responses, text, images, videos, fragments). K1-041 frames the "only images" misconception. Keep both as concept + misconception, or merge with the misconception in `detail`.
- K1-030 (detail) / K1-031: K1-030's detail repeats K1-031 (serve the near-static, huge part via the CDN). Drop the sentence from K1-030's detail. K1-031 owns it.
- K1-028 / K1-050 / K1-053 / K1-121: the same "sign up for a CDN and configure it yourself" advice, given four times. K1-028 adds the free trial and "nothing beats practical experience". K1-050 adds "use my website as origin; a dollar or two is peanuts". K1-053 adds "before asking about private content" and the next-day CDN discussion. K1-121 adds AWS/S3 and "$100 = 7,000-8,000 rupees". A fifth repeat at 00:18:22 ("sign up on a CDN, Akamai, Cloudflare, pick your favorite and build that") has no own item. Add `00:18:22-00:19:12` to K1-028's sources. Merge into one item with all the nuances, or cross-link. Do not drop the amounts.
- K1-019 / K1-062: both say you do not push content to a CDN. K1-019 covers general CDN usage and K1-062 covers invalidation. Cross-link (already done). Keep both.
- K1-083 / K1-084 / K1-087: K1-087 is the teacher's own one-sentence summary of the two phases in K1-083 and K1-084. Keep all three (detailed steps vs recap), or merge K1-087 into K1-083/K1-084 with its verbatim kept.

### Duplicates across parts (involving part 1)

- K1-040 / K3-007: a CDN caches any bytes, including JSON API responses. K3-007 applies this to the hashtag API. Cross-link, do not merge (different context: image vs hashtag API).
- K1-061 / K3-009: TTL vs explicit invalidation API. K3-009 adds the hashtag case: invalidate when the top-100 list or the count changes. Cross-link.
- K1-054 / K1-118 / K2-031: AWS keys uploaded to the CDN so it can read a private bucket. K2-031 restates this in the serving section. Merge K2-031's restatement into the K1 item, or cross-link.
- K1-109 / K2-034: the backend builds the CDN URL by string concatenation. K1-109 covers replacing the S3 bucket name with the CDN host. K2-034 adds the fixed CDN prefix + user ID + random image ID. Cross-link. K2-034 is the design-level version.
- K1-105 / K2-035: CDN miss -> read from S3 -> cache -> return. K1-105 is the GitHub demo and K2-035 the Instagram design. Cross-link.
- K1-083 / K1-084 / K1-087 / K2-013 / K2-026: the prepare-upload -> pre-signed URL -> direct S3 upload flow. K2-013 adds "the post table stores just the random image ID". K2-026 adds the post-service call after the upload completes. Cross-link. Do not merge (different lessons).
- K1-107 / K2-026: upload first, then a separate post call publishes it. K2-026 adds the post service creating the DB entry. Merge, or cross-link K2-026 -> K1-107.
- K1-101 / K2-047 / K2-055: expiry baked into a signed certificate, no server state, "like JWT". K1-101 is about the S3 upload policy. K2-047/K2-055 are about CDN read URLs. Partial overlap: cross-link, do not merge.
- K1-110 / K2-031 / K2-039: S3 is not public and only the CDN reads it, so images are always served via the CDN. K2-039 adds that this holds even for private accounts, for cost reasons. Cross-link.
- K1-122 / K2-038 / K2-044: "Instagram images are not private, a big myth". K1-122 is the forward reference. K2-038 is the claim and K2-044 the demo. Keep K1-122 as admin_reference and cross-link.
- K1-123 / K2-037: the recap "covered storage and data flow". K2-037 adds separation of concerns and privacy next. Merge into K2-037, or keep both as admin.
- K1-080 / K1-088 / K1-066 / K2-075: the K2-075 recap restates "storage chosen because it is cheap" and "via API servers doubles the copy, 2x bandwidth". Cross-link only. The recap adds no new nuance.
- K1-063 / K2-076: both defer live/OTT content. K1-063 is "7.3. 6.3" (Hotstar live). K2-076 is "sixth week" (OTT authorization). Cross-link. Together they hint that "6.3" means week 6.
- K1-017 / K1-039 / K2-086 / K2-087: BGP and geographic routing are skipped as advanced in part 1. K2-086/K2-087 later sketch them (DNS resolves to the nearest CDN IP, via BGP; proprietary). Cross-link the forward reference.
- K1-090 / K2-099: no overlap (checked). Not a duplicate.

## Part 2 (01:04:29-02:23:11)

Audit of `part2.jsonl` (148 items, K2-001..K2-148) against every transcript sentence in 01:04:29-02:23:11. Missed items are in `gaps_part2.jsonl` (G-002, G-003). Validator: `PASS gaps gaps_part2.jsonl (2 items) | errors 0 | warnings 0`. Own part: `PASS part part2.jsonl (148 items) | errors 0 | warnings 0`.

### Windows

"Covered" = part-2 items whose first audio range starts in the window. Every substantive sentence in each window was checked against an item, not just counted.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:04:29-01:09:29 | 15 (K2-001..K2-015) | 0 | - |
| 01:09:29-01:14:29 | 13 (K2-016..K2-028) | 0 | - |
| 01:14:29-01:19:29 | 12 (K2-029..K2-040) | 1 | G-002 |
| 01:19:29-01:24:29 | 7 (K2-041..K2-047) | 0 | - |
| 01:24:29-01:29:29 | 7 (K2-048..K2-054) | 0 | - |
| 01:29:29-01:34:29 | 15 (K2-055..K2-069) | 0 | - |
| 01:34:29-01:39:29 | 6 (K2-070..K2-075) | 0 | - |
| 01:39:29-01:44:29 | 9 (K2-076..K2-084) | 0 | - |
| 01:44:29-01:49:29 | 6 (K2-085..K2-090) | 0 | - |
| 01:49:29-01:54:29 | 0 | 0 | - (break ~01:47:51-01:54:29; 01:54:50 mic check is admin) |
| 01:54:29-01:59:29 | 8 (K2-091..K2-098) | 1 | G-003 |
| 01:59:29-02:04:29 | 13 (K2-099..K2-110, K2-115) | 0 | - |
| 02:04:29-02:09:29 | 12 (K2-111..K2-114, K2-116..K2-123) | 0 | - |
| 02:09:29-02:14:29 | 8 (K2-124..K2-131) | 0 | - |
| 02:14:29-02:19:29 | 10 (K2-132..K2-141) | 0 | - |
| 02:19:29-02:23:11 | 7 (K2-142..K2-148) | 0 | - |

The windows with fewer items are not under-covered. 01:19:29-01:29:29 is mostly the live Instagram demo (K2-044, K2-049 cover long stretches). 01:34:29-01:39:29 is the CDN resize walk-through and the recap (K2-072, K2-075 are long items). 01:44:29-01:49:29 contains the break.
- **G-002** (01:15:02): the teacher explicitly links the serving flow back to the earlier question "how would this get my CDN URL?" (K1-055). This backward reference had no item. It is an aside, but it shows that K2-033 answers K1-055.
- **G-003** (01:58:52, again at 02:19:52-02:20:05): the heuristic "don't assume past the boundary you established; the black box isn't yours". It existed only inside the details of K2-097 and K2-141. It is split out the same way K2-106 was split from K2-105. The editor may instead keep it as detail of K2-097 and cross-link K2-141.

Verbatims: 148/148 found word for word in the transcript (validator: 0 misses).

### Distortions

- **K2-054**: the statement presents "it already runs a fleet of more than 100,000 servers" as fact. The hedge appears only in `detail`. Transcript: "They are already running a fleet of more than 100,000 servers. That's what I've last heard. I'm not really sure." Fix: in the statement write "it reportedly runs more than 100,000 servers (teacher: 'that's what I've last heard, I'm not really sure')". Keep confidence medium.
- **K2-120**: the correction ("the key just passes through the hash function, which picks a partition") is credited to the teacher. In the transcript it sits inside the teacher's turn but reads like an inline student reply: "Why is that not a good [?partitioning key | asr: \"party\"]? Even if there are multiple values, then it's just, so it will pass to the hash function and pick one. Yeah, that's okay. Right. Yeah." The detail also hides that the student's *conclusion* (hashtag is not a good key) was upheld; only the reason ("so many of them") was replaced. The teacher's next words: "Correct. So that's problem number one." Fix: add flag `check: speaker of "Even if there are multiple values ... pick one" (may be Student 6)`. Add to detail: "the student's conclusion that hashtag is a poor key was upheld - for a different reason: one post has several hashtags (K2-121), and the post topic cannot be re-keyed (K2-122)". Keep confidence medium.
- **K2-114**: the statement says the *denormalized* approach "works without worrying about consistency". The transcript only says "this approach" and ends with a photo URL: "So in that case, you can just go with this approach and not just worry about consistency at all. ... given that I don't care about consistency, when a photo URL is there, it's good enough for me to proceed." Which approach is meant is not explicit. Denormalized is the plausible reading, since consistency is approach 2's problem, but it is inferred. Fix: add flag `check: "this approach" - presumably the denormalized copy (approach 2); board may resolve` and set confidence to medium.
- **K2-127**: the statement narrows the teacher's claim to "Redis (Pub/Sub) does not persist anything". The teacher said Redis, unqualified: "There is data loss, because Redis does not persist anything. It's real-time Pub/Sub." The parenthesis corrects the teacher, which is the fact-checker's job. Fix: statement "If that Redis goes down there is data loss, because Redis does not persist anything - it is real-time Pub/Sub", with no parenthetical.
- **K2-038**: drops the teacher's condition on "I can access them". Transcript: "I can access that. FYI. It's just that I need short term access for it as a basic hacker." Fix: add to detail "the teacher qualifies: he needs only short-term access (i.e. the URL while it is valid) 'as a basic hacker'".
- **K2-002**: credits created_at to the student's proposal. The student's turns never mention it; the teacher adds it: "Yeah, and then when it was created, [?created at | asr: \"created it\"], that's fine." Fix: "the student proposed user ID and post content/caption; the teacher accepted them and added when it was created (created_at)".
- **K2-094** (minor): the detail says "the photos table has no special hashtag column". The transcript also contains a contradictory sentence that is probably a rhetorical question: "And on photos table, you don't have special hashtag column. It's part of your caption, FYI, right? So there is a special column where you're storing hashtags there." Fix: add flag `check: "So there is a special column" - likely rhetorical "is there a special column?"`. The meaning stays the same.
- **K2-102** (minor): the image-ID ambiguity was raised by Student 1 ("if we store image ID, we will have to like specify which user's image ID is this"). The teacher only answered "Post ID solves that problem." Fix: in detail, say that a student raised the problem and the teacher said the post ID solves it. Speaker `teacher` can stay (the answer is the insight).

### Duplicates (within part 2)

- K2-006 / K2-012 / K2-020 (end) / K2-023 (end): all say "store the crux information, not the derived URL". K2-006 is the general rule (t-shirt repeat at 01:12:50). K2-012 adds "URL generation belongs in business logic". K2-020 adds "a stored S3 URL can't be served, so you'd do string manipulation". K2-023 adds the Instagram migration. Keep K2-006 as the rule and keep the others as applications; do not drop their specifics.
- K2-017 / K2-036: both say that generating the URL lets you use or balance two CDNs. K2-036 adds the concrete cloudflare.cdn.net/a/abc.png example and "seamlessly". Merge K2-036 into K2-017, or cross-link them.
- K2-018 / K2-022: the 20%-traffic-to-another-CDN idea. K2-018 is management's ask and why stored URLs block it. K2-022 is the random-number (0-0.2) implementation. Partial overlap; cross-link rather than merge.
- K2-016 / K2-034: both say to generate the path from user ID + image ID. K2-034 adds "fixed CDN prefix + user ID + random image ID + .png concatenation, put in the IMG tag". Partial overlap.
- K2-046 / K2-057: both say the CDN is 100% stateless with no state. K2-046 adds "no authentication; doesn't know who follows whom". K2-057 adds "each CDN has its own supported query parameters". Merge, keeping both nuances.
- K2-047 / K2-055: time-bounded certificate with expiry. K2-055 adds the JWT analogy and that the CDN validates the certificate and checks the expiry. Merge into K2-055, keeping K2-047's "so no one can change that time".
- K2-049 / K2-058: invalid or expired parameters give a bad-URL error from the CDN. K2-049 is the demo ("Bad URL timestamp"). K2-058 is the general check process. Partial overlap; cross-link.
- K2-038 / K2-052: "no privacy on the internet" vs "pseudo privacy". K2-052 adds "companies only make it difficult; valid until the key expires; scraping friend". Partial overlap.
- K2-060 / K2-147: "Kafka is the glue". K2-147 adds "...which is why Kafka became widely famous" in the hashtag/data-science context. Merge or cross-link.
- K2-061 / K2-085 / K2-118: a published post is pushed to Kafka for other services. K2-085 is the Q&A answer ("you need to tell those services"). K2-118 is the same push in the counting design. Partial overlap.
- K2-064 / K2-074: reuse what exists rather than build. K2-074 adds "pay a bit of money, problem solved" for CDN image processing. Partial overlap.
- K2-077 (detail) / K2-078: shipped code or APK can be decompiled, so a proprietary format is not secure. K2-078 generalizes ("code, jar; out in public"). Merge K2-078's wording into K2-077's detail, or keep K2-078 as the claim.
- K2-100 / K2-108: post IDs need less space. K2-100 is the student's answer (also "everything can be derived from it"). K2-108 is the teacher's formal version (also "lightweight to cache").
- K2-101 / K2-107 + K2-111: the two options for the top 100. K2-101 is the comparison; K2-107/K2-111 are the formal approaches 1 and 2. K2-101 can be absorbed into K2-107/K2-111.
- K2-103 / K2-111: copy the post object into the hashtag document (denormalized). K2-111 adds "bloats the DB, fine for 100 entries". Merge.
- K2-104 / K2-112: read one document, no extra call. K2-104 is the students' version (storage up, less to fetch). K2-112 is the formal one ("very fast retrieval"). Merge.
- K2-124 / K2-130: all posts of a hashtag must reach one server. K2-130 adds the re-ingest adapter mechanics. Partial overlap; cross-link.
- K2-131 / K2-133: count += n instead of count++. K2-133 adds the full multi-consumer path and carries the "particular user" flag. Merge K2-131 into K2-133, or keep K2-131 as the principle.
- K2-120 (detail) / K2-132: hashtag keys pass through a hash function to pick a partition. K2-132 adds "hash-based partitioning from week two; three partitions can hold millions of hashtags".
- K2-122 / K2-136: the post topic cannot be re-keyed. K2-122: otherwise the post service writes to two Kafkas (distributed consistency). K2-136: search, analytics and notifications already consume it, so an adapter is needed. Partial overlap; cross-link.
- K2-140 / K2-142 / K2-146: we store the top 100 ourselves rather than calling data science. K2-140 is about response time (no extra network IO). K2-142 is the correction of the student. K2-146 is the uptime/synchronous-dependency reason. Different reasons; cross-link, don't merge.
- K2-097 (detail) / K2-141 (detail) / G-003: the "black box, don't assume" boundary. G-003 holds the heuristic; the other two keep the student-specific corrections.

### Duplicates across parts (involving part 2)

- K2-031 / K1-018 + K1-054 + K1-118: the CDN sits transparently between user and origin/S3, and AWS keys are uploaded to the CDN for a private bucket. K2-031 adds nothing new beyond tying it to the image flow; merge into the K1 items (K1-118 has the access/secret key detail).
- K2-033 + K2-034 / K1-055 + K1-056 + K1-109: the backend generates the CDN URL and sends it in the response, and it goes into the IMG tag. K2-033 adds the post service's select-by-user and dynamic generation per CDN experiment. K1-109 adds "replace the S3 bucket name with the CDN host". G-002 is the explicit link. Cross-link.
- K2-035 / K1-036 + K1-037: on a CDN miss, fetch from the origin (S3), cache, serve. Near-duplicate. K2-035 adds only the instacdn.net example; merge.
- K2-026 / K1-087 + K1-107: upload via pre-signed URL, then a separate post call publishes. K2-026 adds that the post service creates the DB entry. Partial overlap.
- K2-013 / K1-083: the image service generates a random image ID. K2-013 adds "store just that ID in the post table". Partial overlap; cross-link.
- K2-015 / K1-094 + K1-099: the GitHub key/path. K2-015 adds that the "47-something" prefix is the teacher's GitHub user ID (per-user folders). Keep K2-015 and cross-link.
- K2-055 / K1-101: an expiry embedded in a signed certificate, "like JWT". K1-101 is about the S3 pre-signed POST policy; K2-055 is about CDN signed URLs. Same mechanism, different component; cross-link, don't merge.
- K2-037 / K1-123 + K1-122: the agenda recap (storage, data flow covered) and "privacy next; Instagram images are not private, a big myth". K2-037 adds separation of concerns as covered. K1-122 / K2-038 overlap on the "privacy is a myth" claim.
- K2-084 / K1-066: blob storage is dirt cheap. K2-084 applies it to orphaned uploads (cleanup optional). Partial overlap.
- K2-086 / K1-003: BGP is CDN-internal and not covered. K2-086 adds DNS resolution to the nearest CDN IP. Partial overlap.
- K2-065 / K3-027: we build our own image optimization service next class. K3-027 adds "message indicators" as the other topic. Merge.
- K2-130 + K2-133 / K3-001 + K3-003 + K3-023: the hashtag extractor re-ingests into a hashtag-partitioned Kafka and counting servers batch with count += n. The teacher restates the flow formally at 02:23:11. K3-001 adds "n hashtags give n entries". K3-003 adds "three partitions, three servers". Merge, keeping the K3 specifics.
- K2-136 / K3-004: the adapter pattern, because the post Kafka can't change. K3-004 adds the "two Kafkas" framing. Merge.
- K2-132 / K3-029 + K3-030: partitions are not one per hashtag, hash-based (week 2). K3-029 adds "define n partitions, measure throughput, increase if low". Merge K2-132 with K3-030; cross-link K3-029.
- K2-123 / K3-046: partitioned by user ID. K3-046 adds "not one partition per user; e.g. 1000 partitions for 1M users". Partial overlap; cross-link.
- K2-122 / K3-016: the post service should make a single write (one Kafka), otherwise distributed consistency/transactions. K3-016 frames it as write-path minimal work. Merge or cross-link.
- K2-145 / K3-010: data science pushes the top-100 event to Kafka and we consume and store. K3-010 names it the "popularity service". Merge.
- K2-140 / K3-011: we store the top 100 in our own DB for fast response. K3-011 adds "even if they store it too; we format and structure it our way". Merge.
- K2-146 / K3-043: model things asynchronously and decouple. K2-146 gives the uptime-dependency reason; K3-043 gives "nothing non-real-time should be synchronous". Partial overlap; cross-link.
- K2-147 / K3-024: Kafka as the glue. K3-024 is the summary takeaway (post Kafka feeds search/notification/feed, repartitioned, data science). Partial overlap.
- K2-126 + K2-127 / K3-035 + K3-036: Redis Pub/Sub loses messages, with no persistence. K3-035/K3-036 add "only the connected subscribers get it" and the contrast with chat. Keep both; K3 adds nuance, K2 adds "millions of channels is overkill/expensive".
- K2-134 / K3-022 + K3-025: per-event count++ means micro writes; batch instead. K3-022 adds the eight-hashtag example; K2-134 adds over-provisioning, and K2-135 the 100x bulk insert. Merge carefully.
- K2-139 / K3-005: render the hashtag page from one document. K3-005 is the read API serving that document. Partial overlap; cross-link.
- K2-030 / K1-002 / K3-020: think about the implementation, don't just draw boxes. Each is in a different context. Cross-link; don't merge blindly.
- K2-115 / K3-041: no single right way, everything is a trade-off. Partial overlap.

## Part 3 (02:23:11-03:26:37)

Audited: `part3.jsonl` (K3-001..K3-103, 103 items). Cross-checked against `part1.jsonl` (123) and `part2.jsonl` (148).
"Covered" = part-3 items whose first audio range starts in the window. Every transcript sentence of each window was
read and matched to an item. Pure admin was skipped: the 02:30:59 interruption, the 02:35:46 recording/notes logistics,
the 02:40:28 "don't raise questions now" exchange (its teaching point is K3-033), the 02:58:40 screen-share check and
the 03:26:36 "Thank you".

### Windows
| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:23:11-02:28:11 | 13 (K3-001..K3-013) | 0 | - |
| 02:28:11-02:33:11 | 9 (K3-014..K3-022) | 0 | - |
| 02:33:11-02:38:11 | 8 (K3-023..K3-030) | 0 | - |
| 02:38:11-02:43:11 | 5 (K3-031..K3-035) | 0 | - |
| 02:43:11-02:48:11 | 7 (K3-036..K3-042) | 0 | - |
| 02:48:11-02:53:11 | 8 (K3-043..K3-050) | 1 | G-004 |
| 02:53:11-02:58:11 | 10 (K3-051..K3-060) | 0 | - |
| 02:58:11-03:03:11 | 6 (K3-061..K3-066) | 0 | - |
| 03:03:11-03:08:11 | 6 (K3-067..K3-072) | 0 | - |
| 03:08:11-03:13:11 | 8 (K3-073..K3-080) | 0 | - |
| 03:13:11-03:18:11 | 9 (K3-081..K3-089) | 0 | - |
| 03:18:11-03:23:11 | 9 (K3-090..K3-098) | 0 | - |
| 03:23:11-03:26:37 | 5 (K3-099..K3-103) | 0 | - |

The 02:38-02:43 window has only 5 items, but it is not under-covered. Most of it is one Q&A thread: the hashtag/post
message and the hash table on the counting server (K3-031, K3-032), plus about a minute of non-technical back-and-forth
about questions. K3-029 starts at 02:37:51 and is counted in the previous window. The windows from 02:58 to 03:08 have
6 items each because their answers are long single explanations (checkpointing, profiling). Each answer was checked
for split points and none was missing.

**Missed (1):**
- **G-004** (02:51:54-02:52:56): Student 2 said Kafka's "uptime is all the time. It doesn't go down even for any
  time", and the teacher explicitly corrected it: "No, no, it can go down." K3-048 records the 99.9% fact but not the
  corrected student belief, which the skill requires as a `proposed_then_corrected` item.

Verbatims: 103/103 found word for word (validator `part`: PASS, 0 errors, 0 warnings).

### Distortions
- **K3-044**: "not only relational databases offer it" interprets a garbled sentence with no flag. Transcript: "We have a database has to provide that and not only the databases give you atomicity FYI." Fix: add flag `check: garbled "not only the databases give you atomicity FYI"` and set confidence to medium. Reword the clause to "atomicity is not exclusive to relational databases - MySQL and DynamoDB both give it", which is anchored on "MySQL gives you, DynamoDB gives you both of them".
- **K3-047**: credits the replication/failover explanation to the teacher, but Student 2 said it and the teacher only labelled it. Transcript: "Student 2: So, okay. If one goes down, another takes care of because the data is replicated. / Teacher: So that's availability." Fix: statement "Kafka is not a single instance but a cluster." Detail: "A student added that if one node goes down another takes over because data is replicated; the teacher called that availability."
- **K3-069**: drops a hedge. "often throw money at AWS" turns the teacher's "in some cases" into a general tendency. Transcript: "So in some cases, if your organization has some amount of money left in the bank or rather decent amount money left in the bank, they would like to throw it on AWS". Fix: "in some cases, organizations with a decent amount of money in the bank prefer to throw money at AWS for more machines rather than spend engineers' time optimizing".
- **K3-068**: turns the teacher's assumption into a stated condition ("only helps if"). Transcript: "One thing when you're scaling up, I'm assuming that your S3s can handle the request." Fix: "The teacher's answer assumes that the stateful component the servers depend on (S3) can handle the extra requests." It also duplicates K3-067 (see below).
- **K3-088**: the statement rests on a garbled sentence but has no flag and keeps confidence medium. Transcript: "You are not doing it for persistent just to count valuable information. It can be picked by other services". Fix: add flag `check: garbled "not doing it for persistent just to count valuable information"` and set confidence to low.
- **K3-028**: "read/write path is a way of approaching concerns" misreads the teacher. "Approach it as separate concerns" referred to the web server versus the asynchronous workers, not to read/write paths. Transcript: "We separate it, we approach it as separate concerns, because this is web server, this is asynchronous worker." Fix: end the statement with "...they were treated as separate concerns (web server vs asynchronous workers); the read/write split itself was not the reason." Also add flag `check: speaker of "Correct? Yes, that's correct."` (it sits inside the teacher's turn).
- **K3-045**: "(no reading and re-sorting)" is the student's concern, not something the teacher said. Transcript: "Student?: Because I think that would be inefficient to, you know, get that array out and, you know, sorting those values. / Teacher: ... You give me a hundred every time you go and simply replace it." Fix: drop the parenthetical, or move it to `detail` as "the student worried that reading and re-sorting the array would be inefficient".
- **K3-037**: "(in batches)" is credited to the teacher, but only the student said it. Transcript: "Teacher: Consumers are pull based. / Student 3 (Mohit): They are batching. Yeah. ... Those are batch mode." Fix: remove "(in batches)" from the statement. Optionally add to `detail`: "the student added that the consumers batch".
- **K3-097**: "is not covered in the course" is stronger than what the teacher said. He did not answer the coverage question directly. Transcript: "It's very data engineering specific. If I start talking about it, it would become, but I would still sprinkle upon the core idea". Fix: "The teacher does not go into MapReduce in depth because it is very data engineering specific, but sprinkles the core idea." Add flag `check: whether MapReduce is covered later was not answered directly`.
- **K3-102**: the item is not atomic (a rule plus a war story), and the story's wording is distorted. Transcript: "I took up a responsibility when I had no idea about big data, but I still became a leader of big data. That's how I had to learn all of those parts. And now I'm working on optimizing Spark." Fix: keep K3-102 as the rule only ("Implement what you learn: without implementation it is all theoretical; problems only appear when you implement"). The editor should split the story into a `war_story`: "The teacher took up a big data responsibility with no prior idea about big data, still became a leader of big data and learned it that way; now works on optimizing Spark."

### Duplicates (within part 3)
- K3-003 / K3-023: both say all tuples of one hashtag go to one server, which then batches and writes to the DB. K3-003 adds count += n vs count++ and "three partitions, three servers". K3-023 adds the re-ingest into a hashtag-partitioned Kafka, framed as write-path optimization.
- K3-012 / K3-026: both say "understand the read paths and write paths and tackle one at a time". K3-012 adds "how almost every senior engineer works". K3-026 (from the takeaways) adds "standard practice is to scale reads separately" (flagged unclear).
- K3-013 / K3-019: both say pick one path and check it. K3-013 adds that every system has write paths and read paths to the DB. K3-019 adds "very structured way to build robust systems" and "think of what can go wrong". Partial overlap; cross-link.
- K3-015 / K3-021 (and K3-008): read path = add a cache or a CDN. K3-015 adds "read path is easy, bare minimum latency". K3-021 adds the escalation order (partition -> replicas -> cache -> CDN). K3-008 adds the CDN-vs-cache choice and "CDN any day". Partial overlap; cross-link rather than merge.
- K3-022 / K3-025: naive per-event writes (count++ / eight micro writes) are not optimal. K3-022 has the eight-hashtag example. K3-025 lists it as a takeaway together with the adapter pattern. Partial overlap.
- K3-049 / K3-054: both say losing data is sometimes acceptable. K3-049 has all three options (DLQ, drop, buffer in memory). K3-054 adds "you don't always have to add yet another component". Partial overlap.
- K3-063 / K3-066: both cover where a consumer starts (horizon / last checkpoint / current). K3-063 adds the search-service example and "use-case specific". K3-066 adds the frequencies ("most cases last checkpoint", "very few from the most recent").
- K3-067 / K3-068: both carry "assuming S3 (the stateful dependency) can handle it". K3-067 adds the 400 rps / 3 servers / 1000 rps framing and horizontal vs vertical. Merge K3-068 into K3-067 after fixing its distortion.
- K3-085 / K3-086: both say to keep only the first page in the hashtag document. K3-085 adds the paginated / linked-list store and "rarely scrolled" (student). K3-086 adds the teacher's reason ("all 1 million will never be scrolled").
- K3-034 / K3-088: both say other services can consume the hashtag Kafka. K3-034 adds the data science example and "counting server is the only consumer today". K3-088 adds "Kafka is not just for counting" (garbled). Partial overlap.

### Duplicates across parts (involving part 3)
- K2-133 / K3-001 + K3-003: the full counting path (post -> extractor -> hashtag topic -> counting workers -> count += n). K2-133 adds multiple extractor consumers. K3-001 adds "n hashtags -> n entries" and "same Kafka, another topic". K3-003 adds three partitions / three servers.
- K2-131 / K3-003: count += n instead of count++ per post. K2-131 adds "n depends on the batch size".
- K2-136 / K3-004: the adapter pattern; the post topic cannot change because other services depend on it. K2-136 adds "found only by going into implementation details" and analytics. K3-004 adds "two Kafkas + a simple processor that only reorders/repartitions; very common practice".
- K2-130 + K2-124 / K3-023: re-ingest into a hashtag-partitioned Kafka so one server gets all of a hashtag. K2 adds the extractor mechanics and "otherwise you cannot batch". K3-023 adds the write-path framing.
- K2-134 / K3-022 + K3-025: count++ per event causes micro writes; batch instead. K2-134 adds "chokes the DB, forces over-provisioning". K3-022 adds the eight-hashtag example.
- K2-132 / K3-029 + K3-031: partitions do not equal hashtags. K2-132 adds hash-based partitioning and "three partitions can hold millions". K3-029 adds "define n, measure throughput, increase". K3-031 adds the (hashtag, post ID) message content.
- K2-132 / K3-030: both say Kafka partitioning was taught in week two. Merge the admin reference into one.
- K2-132 / K3-046: "not one partition per key" (hashtag vs user ID). K3-046 adds 1000 partitions / 1 million users / ~1000 users each. Partial; cross-link.
- K2-145 / K3-010: the data science team pushes top-100 updates to Kafka; we consume and update the hashtag DB. K2-145 adds "Kafka is the best place for such notifications". K3-010 adds "not very high throughput, so fine".
- K2-139 + K2-140 / K3-011: store the top 100 in our own DB for a fast response. K2-139 adds the one-document / minimum network I/O reasoning. K3-011 adds "they may also store it; we copy, format and structure it our own way".
- K2-146 / K3-043: model things asynchronously wherever possible. K2-146 adds "a synchronous dependency couples our uptime to theirs". K3-043 adds "decouple as much as you can" and the webhook context.
- K2-060 + K2-147 / K3-024: Kafka as glue. K2-147 adds "why Kafka became famous". K3-024 adds the three glue points in this design and the data science <-> backend interaction.
- K2-062 / K3-024: every consumer works at its own speed/pace. K2-062 adds extensibility. Partial.
- K2-126 + K2-127 / K3-035 + K3-036: Redis Pub/Sub is real-time and not persistent, so data is lost. K2 adds "a channel per hashtag overkills the infra". K3 adds real-time vs non-real-time, a down server never receiving, push vs pull and DB slowness (K3-037/K3-038).
- K2-122 / K3-016: writing to two places brings a distributed consistency problem. K2-122 is about the post service writing to two Kafkas. K3-016 frames it as "post service -> Kafka must be one API call". Partial; cross-link.
- K1-040 / K3-007: a CDN caches any bytes, including JSON API responses. K1-040 lists more content types. K3-007 applies it to the hashtag API.
- K1-061 + K1-062 / K3-009: TTL expiry or explicit invalidation, then a miss goes to the origin. K3-009 adds the API -> DB -> cache -> serve refill path for the hashtag page.
- K2-065 / K3-027: the image optimization service gets implemented in the next class. K3-027 adds "message indicators" as the other next-class problem.
- G-004 / K3-047 + K3-048: G-004 is the student's corrected belief. K3-048 is the teacher's 99.9% number. Keep both, cross-linked (G-004 depends_on K3-047).

