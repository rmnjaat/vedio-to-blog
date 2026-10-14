## Part 2 (01:04:29-02:23:11)

Audit of `part2.jsonl` (148 items, K2-001..K2-148) against every transcript sentence in 01:04:29-02:23:11. Missed items are in `gaps_part2.jsonl` (G2-001, G2-002). Validator: `PASS gaps gaps_part2.jsonl (2 items) | errors 0 | warnings 0`. Own part: `PASS part part2.jsonl (148 items) | errors 0 | warnings 0`.

### Windows

"Covered" = part-2 items whose first audio range starts in the window. Every substantive sentence in each window was checked against an item, not just counted.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:04:29-01:09:29 | 15 (K2-001..K2-015) | 0 | - |
| 01:09:29-01:14:29 | 13 (K2-016..K2-028) | 0 | - |
| 01:14:29-01:19:29 | 12 (K2-029..K2-040) | 1 | G2-001 |
| 01:19:29-01:24:29 | 7 (K2-041..K2-047) | 0 | - |
| 01:24:29-01:29:29 | 7 (K2-048..K2-054) | 0 | - |
| 01:29:29-01:34:29 | 15 (K2-055..K2-069) | 0 | - |
| 01:34:29-01:39:29 | 6 (K2-070..K2-075) | 0 | - |
| 01:39:29-01:44:29 | 9 (K2-076..K2-084) | 0 | - |
| 01:44:29-01:49:29 | 6 (K2-085..K2-090) | 0 | - |
| 01:49:29-01:54:29 | 0 | 0 | - (break ~01:47:51-01:54:29; 01:54:50 mic check is admin) |
| 01:54:29-01:59:29 | 8 (K2-091..K2-098) | 1 | G2-002 |
| 01:59:29-02:04:29 | 13 (K2-099..K2-110, K2-115) | 0 | - |
| 02:04:29-02:09:29 | 12 (K2-111..K2-114, K2-116..K2-123) | 0 | - |
| 02:09:29-02:14:29 | 8 (K2-124..K2-131) | 0 | - |
| 02:14:29-02:19:29 | 10 (K2-132..K2-141) | 0 | - |
| 02:19:29-02:23:11 | 7 (K2-142..K2-148) | 0 | - |

The windows with fewer items are not under-covered. 01:19:29-01:29:29 is mostly the live Instagram demo (K2-044, K2-049 cover long stretches). 01:34:29-01:39:29 is the CDN resize walk-through and the recap (K2-072, K2-075 are long items). 01:44:29-01:49:29 contains the break.
- **G2-001** (01:15:02): the teacher explicitly links the serving flow back to the earlier question "how would this get my CDN URL?" (K1-055). This backward reference had no item. It is an aside, but it shows that K2-033 answers K1-055.
- **G2-002** (01:58:52, again at 02:19:52-02:20:05): the heuristic "don't assume past the boundary you established; the black box isn't yours". It existed only inside the details of K2-097 and K2-141. It is split out the same way K2-106 was split from K2-105. The editor may instead keep it as detail of K2-097 and cross-link K2-141.

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
- **K2-135** (minor): the statement says a bulk insert is "about 100x faster". "About" is a hedge the teacher did not use. Transcript: "Bulk insert is 100x faster than single doing that insert one at a time." Fix: drop "about", so it reads "a bulk insert is 100x faster than inserting one at a time". The fact-checker can scope the number later.
- **K2-144**: "heavyweight" is an inferred adjective. Also, the statement turns the teacher's "It's not just a simple set of servers" into "(a simple set of servers)". The flag is there, but the statement still claims the opposite reading. Transcript: "a lot of people I see make this mistake. Oh, service. It's not just a simple set of servers doing something. It's a process that is running whose job is to, like, your data science team." Context: the student worried that "you need to have a separate service who is constant", and the teacher replied "It's a simple server processor service service. It's not a service." Fix: statement "A common mistake is to think every consumer needs a separate, costly 'service'; here it is just a process that runs and consumes the events". Drop "heavyweight" and the parenthesis. Keep the flag and medium confidence.
- **K2-141** (omission): the detail leaves out the teacher's last sentence of the correction. Transcript: "black box for us, data science does it. We don't care how they do it. We don't get the most recent hundred." Fix: add to detail "teacher adds 'We don't get the most recent hundred' (garbled; probably that the top 100 is not simply the most recent 100)" and add flag `unclear: "We don't get the most recent hundred"`.
- **K2-079** (minor): "as used e.g. by Udemy for videos" is the student's claim. The teacher never confirmed it. Transcript: Student: "if we see like Udemy, Udemy also like handles videos in DRM context, right?" Teacher: "DRM is different. Proprietary format is different." Fix: "DRM (which a student cited Udemy as using for videos) is very different from a proprietary format".
- **K2-048** (minor): the hedge on OH is dropped. The statement says "OH is the hash" as fact. Transcript: "OH is the hash is what I got to know." Fix: "OH is, as far as he has heard, the hash".
- **K2-043** (minor): "for seeing how real systems work" is an inferred purpose. Transcript: "your best friend through this session, you would have already known that your best is Chrome dev tools or whatever." Fix: "Browser dev tools (Chrome dev tools; the teacher uses Firefox's) are your best friend through this session".
- **K2-101** (minor): the "store the actual post" option was first proposed by a student. The teacher then restated it. Transcript: Student 1: "Other way we can store is basically have actual post, actual post, right? Image ID and whatnot." Fix: add to detail "the second option was proposed by a student and restated by the teacher". The speaker can stay `teacher`.

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
- K2-097 (detail) / K2-141 (detail) / G2-002: the "black box, don't assume" boundary. G2-002 holds the heuristic; the other two keep the student-specific corrections.

### Duplicates across parts (involving part 2)

- K2-031 / K1-018 + K1-054 + K1-118: the CDN sits transparently between user and origin/S3, and AWS keys are uploaded to the CDN for a private bucket. K2-031 adds nothing new beyond tying it to the image flow; merge into the K1 items (K1-118 has the access/secret key detail).
- K2-033 + K2-034 / K1-055 + K1-056 + K1-109: the backend generates the CDN URL and sends it in the response, and it goes into the IMG tag. K2-033 adds the post service's select-by-user and dynamic generation per CDN experiment. K1-109 adds "replace the S3 bucket name with the CDN host". G2-001 is the explicit link. Cross-link.
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
