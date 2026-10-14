# Lecture 09 exam - coverage

Total questions: 154 (class 3:26:35, minimum 103). Each question goes in the window of the first timestamp in its `source`. No windows skipped: the break (~1:47:51-1:54:29) sits inside windows 10 and 11, and both also contain teaching.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda, tech-stack waves, Instagram year-1 architecture, what a CDN and an origin are | 8 |
| 0:10-0:20 | CDN property-to-origin mapping, DNS, miss/hit path, host swap, any bytes, cost | 8 |
| 0:20-0:30 | edge.arpitbhayani.me demo; Q&A: private content, CDN URL from the backend, invalidation | 5 |
| 0:30-0:40 | Upload brainstorm, 5m/day, S3/GCS, chunking/async rejected, bandwidth, presigned arc, 2x egress | 9 |
| 0:40-0:50 | Presigned URL steps, open-bucket risk, validity, benefits, GitHub demo calls/response | 10 |
| 0:50-1:00 | Form fields, embedded expiry, direct POST to S3, CDN serving, moderation, CDN URL in response | 6 |
| 1:00-1:10 | CDN vs S3 speed, CDN keys for private S3, don't store derived URL, posts table, S3 path, 20% CDN split | 8 |
| 1:10-1:20 | URL generated in handler, delete by path, post service flow, separation, D-04/D-05, overall flow, privacy myth | 11 |
| 1:20-1:30 | Instagram URL demo, query params, Bad URL timestamp, stateless CDN, API-side access, truly private cost | 8 |
| 1:30-1:40 | Timed signatures, CDN check steps, Kafka extensibility, CDN image optimization, w=360 | 6 |
| 1:40-1:50 | Q&A: proprietary format/DRM, unposted images, why Kafka, nearest CDN, S3 as black box; break | 6 |
| 1:50-2:00 | Hashtag page mock, assumptions, brainstorm, no photos-table column, document, post IDs in top_100 | 5 |
| 2:00-2:10 | IDs vs full posts trade-off, consistency, no new requirements, batching counts, partition key | 7 |
| 2:10-2:20 | user_id breaks batching, Redis Pub/Sub rejected, adapter, hash partitioning, bulk writes, approx counts, one document | 10 |
| 2:20-2:30 | Data-science feed via Kafka, async vs sync, final architecture, POST_HASHTAG, CDN/cache, takeaways, read/write paths | 10 |
| 2:30-2:40 | Blowing up the read path, 8-hashtag write path, challenge notes; Q&A: services split, partitions, hash-map counting | 5 |
| 2:40-2:50 | Q&A: popularity consumes POST_HASHTAG, Redis Pub/Sub vs Kafka, webhooks, atomic counts, replacing the array | 4 |
| 2:50-3:00 | Partitions vs users, Kafka availability, DLQ options, SLAs, Uber SOS, multi-master, retention/horizon, commit | 9 |
| 3:00-3:10 | Start positions, retention size, archiving to S3, servers vs optimizing, profiling, tools, CPU vs RAM | 7 |
| 3:10-3:20 | Goroutines, hashtag doc size/GC, 1M photos paginated, in-memory queues, Kafka not source of truth, Kafka first entry | 7 |
| 3:20-3:30 | Analytics ingestion order/Kinesis, DLQ with Kafka, transactional outbox, Spark for counting, learning resources | 5 |

## By kind

| Kind | Count |
|---|---|
| concept | 41 |
| qa | 26 |
| example | 19 |
| diagram | 16 |
| tradeoff | 14 |
| recall | 13 |
| misconception | 10 |
| heuristic | 8 |
| number | 7 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 46 |
| medium | 92 |
| hard | 16 |
