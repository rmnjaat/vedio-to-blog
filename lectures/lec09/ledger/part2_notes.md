# Lecture 09 ledger, part 2 (01:04:29 - 02:23:11): notes
File: `part2.jsonl`, 148 items (K2-001 .. K2-148), validator: PASS (0 errors, 0 warnings; all verbatims found word for word).

## Topic tree
- data-modeling
  - separation-of-concerns: 001-005 (post-table prompt, student columns, tags in caption, URL proposal), 027-029 (image vs post, media types, post concept stable)
  - derived-values: 006-024 (don't store derivable data, Cloudflare -> FB CDN, S3/Bing pricing, per-user S3 path, GitHub key, generate URL in the handler, 20% CDN split, delete via path), 036 (two CDNs balanced)
- image-upload
  - post-service: 025
  - flow: 026
  - serving: 031-035 (CDN between user and S3, /user/A/posts, backend-generated URL, IMG tag GET, CDN miss -> S3)
  - cleanup: 084 (uploaded but never posted)
  - storage: 089 (S3 and CDN are black boxes)
- cdn
  - privacy: 038-042, 044, 050-054, 077-078 (no privacy on the internet, CDN URL = access, TTL, live Instagram demo, API-server-enforced privacy, 15-20 photos JSON, pseudo privacy, truly private = no CDN, 50-100x servers, proprietary format, decompiling)
  - signed-urls: 045-049, 055-058 (URL anatomy, stateless CDN, time-bounded certificates, OE/OH/IG cache key, Bad URL timestamp, JWT analogy, 5-minute expiry, validation flow)
  - image-optimization: 064, 066-074 (reuse over rebuild, Sachin 50 MB / Jio, w=360 param, frontend appends, CDN processing and caching, capabilities, pay and done)
  - routing: 086-088 (DNS + BGP to nearest node, undisclosed details, Akamai first)
- extensibility > kafka: 060-062 (Kafka glue, post event fan-out, own pace), 085 (why Kafka), 147 (why Kafka became famous)
- security > drm: 079-083 (DRM vs proprietary format, teacher's DRM war story, Indian law, complaints)
- hashtag-service
  - requirements: 091, 092 (page, data science black box), 105 (only top 100)
  - storage: 094-098, 100-104, 107-114 (page-driven storage, one document, post IDs vs actual post, denormalized copy, trade-offs, consistency)
  - counting: 116-119, 124-125, 128-131, 133, 137 (count++, batching proposal, consumer, one server per hashtag, #sunset, post 31, adapter, count += n, counting service, recount tolerated)
  - response-time: 139-140 (everything in one document, top 100 stored locally)
  - top-100: 141-143, 145 (black box, don't call it, Kafka feed from data science)
- delegation
  - kafka > partitioning: 120-123 (hashtag key doubts, multiple hashtags, same topic, user ID key), 132 (hash-based partitioning)
  - kafka > adapter: 136
  - redis-pubsub: 126-127
  - async: 146
  - cqrs: 148
- scaling > batching: 134-135 (large-volume counting rule, bulk insert 100x)
- consistency > relaxed: 138
- engineering mindset: 030 (boxes vs nitty-gritties, repeated 01:36 and 01:39), 043 (dev tools), 099 (think of all possibilities), 106 (no new requirements), 115 (no one way / depends on guarantees), 144 ('service' misconception)
- admin: agenda 037, 059, 090, 093; course-structure 063 (Kafka later), 065 (own image optimization service tomorrow), 076 (OTT in week six); recap 075

## Counts by type
| type | n |
|---|---|
| concept | 39 |
| example | 25 |
| claim | 17 |
| rule_of_thumb | 14 |
| process | 13 |
| misconception | 11 |
| admin_reference | 9 |
| tradeoff | 8 |
| qa_insight | 5 |
| war_story | 4 |
| comparison | 2 |
| number | 1 |

Speakers: teacher 128, student (proposal) 19 (8 proposed_then_corrected, 2 rejected, 9 endorsed - accepted or refined), student (question) 1.

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 01:04:29-01:09:29 | 15 | post table, derived values |
| 01:09:29-01:14:29 | 13 | generate URL on the fly, CDN switching, post service |
| 01:14:29-01:19:29 | 12 | separation of concerns, serving flow |
| 01:19:29-01:24:29 | 7 | privacy demo (screen share heavy, little new content) |
| 01:24:29-01:29:29 | 7 | signed-URL params, API-side privacy, pseudo privacy |
| 01:29:29-01:34:29 | 15 | timed signatures, Kafka extensibility, CDN optimization |
| 01:34:29-01:39:29 | 6 | w=360 flow, CDN capabilities, recap (one recap item for a 1.5 min summary) |
| 01:39:29-01:44:29 | 9 | Q&A: OTT, proprietary format, DRM, cleanup |
| 01:44:29-01:49:29 | 6 | Q&A: Kafka, nearest CDN, S3 black box; break from 01:47:51 |
| 01:49:29-01:54:29 | 0 | break (no content) |
| 01:54:29-01:59:29 | 8 | hashtag problem, storage brainstorm |
| 01:59:29-02:04:29 | 13 | post IDs vs actual post |
| 02:04:29-02:09:29 | 12 | trade-offs, counting, Kafka partitioning key |
| 02:09:29-02:14:29 | 8 | one server per hashtag, Redis Pub/Sub, adapter |
| 02:14:29-02:19:29 | 10 | hash partitioning, batching rule, bulk insert, recount, one document |
| 02:19:29-02:23:11 | 7 | top-100 feed via Kafka, async, CQRS |

## Doubts / open questions
- K2-004: speaker of "Yeah, basically, yeah" (01:05:37) may be Student 2; the teacher's "not pre-signed URL, the actual CDN URL" reads as describing what people would store, before calling it suboptimal.
- K2-009: "4x" from ASR "Forex"; "CDN URL" from "serial". The board may confirm.
- K2-048: Instagram URL parameters (OE = expiry, OH = hash, IG cache key, "EDN") are the teacher's guesses; the board/screen frames S39-S40 may show the actual parameter names.
- K2-054: "fleet of more than 100,000 servers", then "assume it's 100 servers ... tomorrow 500": numbers are inconsistent as spoken and hedged; kept as said, for the fact-checker.
- K2-082: "three years in jail, no bail" for DRM-proven piracy in India is the teacher's claim; fact-checker should look at it.
- K2-086 to K2-088: CDN nearest-node routing via DNS + BGP; Akamai-first / Cloudflare-hired-from-Akamai is hedged ("something around that").
- K2-096: speaker of "and by the way, why do you need it?" (labelled Teacher? at 01:58:28).
- K2-117: "Correct." inside Student 6's own turn (02:07:03) may be the teacher; status left endorsed with lowered confidence.
- K2-133: the teacher says "all the posts of a particular user will go to one server" at 02:15:17; context implies a particular hashtag. Flagged, not fixed.
- K2-144: "It's not just a simple set of servers doing something" reads opposite to the intended point ("it's not a service, just a process"); medium confidence.
- K2-148: "The CQRS pattern ... is because of this" is the teacher's claim; candidate for fact-check.
- K2-127: "Redis does not persist anything" is said of Redis in general in the Pub/Sub context; fact-checker should scope it.
- Board items for this range (S30-S61: posts-table notes, privacy page, image optimization notes, hashtag sketches, data-science feed) are left to the editor; S35 mentions a "Kafka partition key" note at 01:13:30-01:15:27 that has no matching audio sentence in this part.
