# Lecture 06 (Lecture 08) exam - coverage

Total questions: 134 (class 2:55:50, minimum needed 87). Window is assigned by the first timestamp in each question's `source`. No window skipped: the break (1:35:57-1:40:40) falls inside 1:30-1:40, which also holds Q&A.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; Kafka+SQS fan-out; browser and img tag; header-based decoding; static folder mapping | 7 |
| 0:10-0:20 | Static steps and folder tree; /raw S3 proxy handler; not only JSON; Open Graph; GitHub OG image on the fly | 8 |
| 0:20-0:30 | opengraph CDN miss flow; PIL/ImageMagick; Twitter example; prototype; Gravatar URL, MD5, PII; photo change everywhere | 9 |
| 0:30-0:40 | Requirements; store email; hash struck; photos table; join query; hash not reversible; collisions accepted | 7 |
| 0:40-0:50 | Full table scan; storing the hash column; mark-active update; primary key; unset old active; is_active = True filter | 8 |
| 0:50-1:00 | Transaction; ownership check; code-review analogy; active-photo query; inner vs left join; narrowing | 6 |
| 1:00-1:10 | active_photo_id in users; still need Tx; PK lookup; two designs; counter-intuitive attribute; single query; upload service; CDN reasons; render steps | 11 |
| 1:10-1:20 | CDN property/origin; hit/miss; Kafka invalidation; TTL vs invalidation; fallback check; why not S3 origin; runtime hashing | 7 |
| 1:20-1:30 | Join criterion; predicate pushdown; invalidation API; denormalized users; on-demand optimization, CDN internal steps, ImageMagick, CPU-bound, not async, blog | 11 |
| 1:30-1:40 | Q&A: clean update, bool vs enum, get-and-check, membership table; break | 4 |
| 1:40-1:50 | Tagging brief; three hats; product-side thinking; authorization; concurrency; max tag limit; notification team | 8 |
| 1:50-2:00 | Throttling; self-removal; ML suggestions SLA and fallback; profile/activity DB; feed; board list; absolute position problem | 7 |
| 2:00-2:10 | Relative position; bounding box LTRB/xywh; posts_tags; Kafka PHOTO_TAG; services; newly unread vs unread; unique people; requirements | 8 |
| 2:10-2:20 | Crude schema; count(uniq(from)) query; (to, ts, from) index; cost; crude but correct | 5 |
| 2:20-2:30 | Set length O(1); delete set on click; source of truth vs pre-computed; Redis/KV set; getStatus/clear; smart client | 7 |
| 2:30-2:40 | Messaging service as input; ON_MSG_UNSENT; event shape; read/write paths; main Redis loads; n-1 no-op writes; protect DB; auxiliary Redis | 11 |
| 2:40-2:50 | Aux down; clear both; accept inconsistency; 100+ threshold; aux key model; no distributed Tx; no read-before-write; no user ID in hash | 7 |
| 2:50-2:56 | Q&A: unsent definition; SQL optimization resources; aux Redis cluster | 3 |

## By kind

| Kind | Count |
|---|---|
| concept | 53 |
| diagram | 27 |
| example | 4 |
| heuristic | 8 |
| misconception | 6 |
| number | 3 |
| qa | 18 |
| recall | 7 |
| tradeoff | 8 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 40 |
| medium | 78 |
| hard | 16 |
