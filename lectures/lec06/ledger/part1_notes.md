# Lecture 06 ledger, part 1 (00:00:00 - 01:07:29): notes
File: `part1.jsonl`, 116 items (K1-001 .. K1-116), validator: PASS (0 errors, 0 warnings; all verbatims found word for word).

## Topic tree
- admin
  - agenda: K1-001, K1-002, K1-003, K1-004, K1-005, K1-116
  - references (notification-system YouTube video): K1-006
- delegation
  - kafka > partitions: K1-007
  - fan-out (Kafka/Kinesis + SQS/RabbitMQ, Justin Bieber example, 50-60k in 5 s war story): K1-008 .. K1-012
- images
  - serving (who serves an image): K1-013, K1-014, K1-023
  - browser (no idea of type, IMG tag -> HTTP GET, header, decoders, platforms are dumb): K1-015 .. K1-019, K1-021, K1-022
  - file-formats (headers): K1-020
  - serving > static-folder (/static mapping, nginx/Spring Boot/Flask/Django): K1-024 .. K1-027
  - serving > custom-handler (/raw/<path> S3 proxy, not only JSON): K1-028 .. K1-032
  - on-the-fly (image need not exist): K1-033
  - on-the-fly > open-graph (GitHub DiceDB social card, og:image, not pre-generated, opengraph.githubassets.com): K1-034 .. K1-042, K1-048, K1-054
  - on-the-fly > cdn (CDN hit, miss -> origin API server, TTL): K1-043, K1-044, K1-047
  - on-the-fly > generation (template, PIL/ImageMagick, Bannerbear, Twitter hypothetical, UX, build a prototype): K1-045, K1-046, K1-049 .. K1-053
- learning approach (prototype everything; build prototypes): K1-055, K1-062
- gravatar
  - concept (single embeddable URL, MD5 of email, returns bytes, change once everywhere): K1-056 .. K1-061
  - requirements: K1-063
  - schema: K1-064
  - schema > users (hash proposal, store email, hash crossed off then restored + indexed, unique keys): K1-065 .. K1-068, K1-081, K1-083
  - schema > photos (separate table, id/user_id, no path, is_active bool): K1-069 .. K1-072
  - schema > active-photo-id: K1-106, K1-109, K1-110
  - queries > all-photos (join on hash): K1-073, K1-074
  - queries > hashing (not reversible, HASH(email) in where, collisions accepted, full scan): K1-075 .. K1-079
  - queries > mark-active (update, unmark previous, is_active = true clause, transaction, user_id ownership check, single query with auto commit): K1-085, K1-086, K1-088 .. K1-092, K1-094 .. K1-096, K1-105, K1-107, K1-111
  - queries > active-photo (join query, nitpick optimization, index lookup): K1-100, K1-101, K1-103, K1-104, K1-108
  - queries (efficient and correct summary): K1-098
- databases
  - indexing > computed-predicates (computation in where clause kills index use): K1-080
  - schema-design > redundancy (store derivable data when it slows things down): K1-082
  - schema-design (is_active as photo attribute is the trained instinct): K1-112, K1-114
  - joins (inner vs left join same here): K1-102
- engineering mindset (devil in details, hello-world query, code-review analogy, no one way, unlearn/relearn): K1-084, K1-087, K1-093, K1-097, K1-099, K1-113, K1-115

## Counts by type
| type | n |
|---|---|
| concept | 38 |
| claim | 20 |
| process | 17 |
| rule_of_thumb | 12 |
| example | 9 |
| misconception | 8 |
| admin_reference | 7 |
| war_story | 2 |
| analogy | 1 |
| qa_insight | 1 |
| comparison | 1 |

Student turns: 19 items with speaker `student (proposal)` / `student (question)`; 5 `proposed_then_corrected` (K1-066, K1-071, K1-075, K1-086, K1-104), 2 `open` (K1-103, K1-105).

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 00:00-00:05 | 12 | agenda, notification video, Kafka+SQS fan-out |
| 00:05-00:10 | 13 | browser, IMG tag, headers, decoders |
| 00:10-00:15 | 7 | static folder, /raw S3 handler |
| 00:15-00:20 | 9 | on-the-fly images, GitHub og:image |
| 00:20-00:25 | 10 | CDN + origin generation, Bannerbear, Twitter |
| 00:25-00:30 | 9 | prototype advice, Gravatar concept |
| 00:30-00:35 | 10 | requirements, users/photos schema debate |
| 00:35-00:40 | 9 | photos table, all-photos query, hashing not reversible |
| 00:40-00:45 | 6 | full scan, hash column, derivable-storage rule; long single teacher turns |
| 00:45-00:50 | 5 | mark-active update; long student back-and-forth, each step its own item |
| 00:50-00:55 | 7 | transaction, ownership check |
| 00:55-01:00 | 6 | code-review analogy, active-photo query, nitpick |
| 01:00-01:05 | 9 | active_photo_id in users |
| 01:05-01:07:29 | 4 | closing points (2.5-minute window) |

## Doubts / open questions
- K1-090 (00:50:57): the teacher says the crash leaves "every photo is marked as active and you don't have any active photo"; the meaning seems to be "inactive". Flagged `check:`, statement uses the evident meaning; the board (`Tx` markers, S21) may confirm.
- K1-107 vs K1-111: at 01:01:43-01:02:29 the teacher says the transaction is still needed with active_photo_id (select from photos + update users), but at 01:03:48-01:05:53 says a single update with auto commit is enough and no multi-query transaction is needed. Both kept faithfully; fact-checker / editor should see them together.
- K1-108: the read query is stated as "select * from users where ID is equal to this", while the input is the email hash; the item keeps "(hash)" ambiguous - board may show the exact where clause.
- K1-065: the student's "store the hash" proposal is marked endorsed because the hash column ends up in the design (K1-081), although the teacher first crossed it off (K1-068).
- K1-100 (00:56:55): the "very minor optimization" the teacher hints at is never named explicitly before a student proposes active_photo_id; it may be the active_photo_id design itself (01:02:29 "extreme nitpicking") - left as stated.
- K1-103 / K1-105: student reasoning under heavy `[unclear]` markers, confidence low, no teacher verdict.
- K1-104, K1-106-K1-110: STUDENT_2 label mixes several students (Sitesh, Chandan); speaker check flag on K1-106.
- Board-only nuance for the editor: the Gravatar page shows `https://gravatar.com/{hash(email)}` with a pink `-> security PII` note (S11, 00:27:15-00:28:45), not said in audio in part 1.
