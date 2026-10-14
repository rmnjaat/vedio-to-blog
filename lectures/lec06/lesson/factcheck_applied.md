# Lecture 08 (lec06): fact-check treatments applied

Policy, from the lesson brief and applied mechanically. Where the fact-checker's own `treatment` column differs, the brief wins:
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its source.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added).
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction.
- **unverifiable:** stated as the instructor's (or the class's) experience or opinion, with no empty source link. Unverifiable-low items also get a light hedge.

Differences from `factcheck/policy_summary.md`: L-0054 (simplified/medium) gets an inline clarification here, not a note, because the brief puts medium-simplified inline. The 17 simplified-low items that the checker marked "inline" are left as taught, with their keep additions placed as separate sentences. The verifier's override (L-0047 wrong/medium → wrong/low) is applied, and it still needs a SourceNote. ImageMagick URLs use the corrected targets from `verdict_review.md`.

Counts: 49 flagged items = 9 with a SourceNote (8 notes) + 10 inline clarifications + 17 left as taught + 13 attributed as unverifiable.

## 1. SourceNotes

### SN-01 · §1.4 · L-0047 (wrong/low)
- **Teacher's point (kept):** PIL (Python Image Library) is typically the best library for generating images; it internally uses ImageMagick through a C++ binding and gives a native Python interface.
- **More precisely:** Pillow (the maintained fork of PIL) is a popular Python library for generating images; it has its own C imaging core built on libraries like libjpeg, zlib and FreeType. ImageMagick is a separate tool, used from Python via Wand.
- **Additions used:** A-ID-10
- **Sources:** https://pillow.readthedocs.io/en/stable/ · https://pillow.readthedocs.io/en/stable/installation/building-from-source.html · https://docs.wand-py.org/en/latest/

### SN-02 · §2.1 · L-0057 (outdated/low)
- **Teacher's point (kept):** The Gravatar URL is gravatar.com/<MD5 hash of the email>; it is constant because passing the same value to a hash function always gives the same output.
- **More precisely:** The Gravatar image URL is gravatar.com/avatar/<SHA-256 hash of the trimmed, lowercased email> (MD5 historically); it is constant because the same input always hashes to the same output.
- **Additions used:** A-GD-01
- **Sources:** https://docs.gravatar.com/general/hash/ · https://gitlab.com/gitlab-org/gitlab/-/issues/370057 · https://docs.gravatar.com/sdk/images/

### SN-03 · §2.3 · L-0081 (imprecise/medium)
- **Teacher's point (kept):** A computation in the where clause (e.g. HASH(email) = ?) prevents the database from using indexes: it has no way to know which email evaluates to that hash without...
- **More precisely:** A computation on a column in the WHERE clause cannot use a plain index on that column, so the query scans every row - unless you create an index on that exact expression (expression/functional index) or store the computed value in its own indexed column.
- **Additions used:** A-GD-04, A-GD-05
- **Sources:** https://www.postgresql.org/docs/current/indexes-expressional.html · https://dev.mysql.com/doc/refman/8.4/en/create-index.html

### SN-04 · §2.4 · L-0095 (imprecise/medium)
- **Teacher's point (kept):** Student point: with the transaction the update is atomic, so concurrent requests are taken care of.
- **More precisely:** Wrapping the updates in a transaction makes them atomic; to also make concurrent requests safe you need isolation, e.g. lock the user's row first or keep a single active_photo_id on users. Lecture 3 (airline check-in) shows `SELECT … FOR UPDATE` live; the note links there.
- **Additions used:** A-GD-06
- **Sources:** https://www.postgresql.org/docs/current/transaction-iso.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html

### SN-05 · §3.2 · L-0139 (imprecise/medium)
- **Teacher's point (kept):** A common question is why the CDN does not point to S3 directly; one reason given is that S3 is not public.
- **More precisely:** The CDN does not point straight at S3 because S3 does not know which photo is active - only the database does - so the origin must be the API server (a private bucket alone would not stop it: CDNs can read private buckets).
- **Additions used:** A-GD-11
- **Sources:** https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html

### SN-06 · §3.4 · L-0154 (wrong/low), L-0155 (wrong/low)
- **Teacher's point (kept):** The Python Image Library (PIL) has two bindings: a native Python binding and ImageMagick.
- **Teacher's point (kept):** ImageMagick is written purely in C++, and almost every language has C++ bindings, so ImageMagick can be invoked natively from your preferred language.
- **More precisely:** In Python, Pillow (the maintained fork of PIL) is a standalone imaging library; ImageMagick is used from Python through a separate binding such as Wand. ImageMagick is written in C, with C (MagickCore, MagickWand) and C++ (Magick++) APIs, so most languages can call it natively through bindings. For Magick++ (the C++ API) see https://imagemagick.org/magick++/ (URL corrected per verdict_review.md).
- **Additions used:** A-GD-15
- **Sources:** https://pillow.readthedocs.io/en/stable/ · https://pillow.readthedocs.io/en/stable/about.html · https://docs.wand-py.org/en/latest/ · https://imagemagick.org/ · https://imagemagick.org/magick-core/ · https://pillow.readthedocs.io/en/stable/reference/Image.html

### SN-07 · §4.4 · L-0203 (outdated/low)
- **Teacher's point (kept):** A student proposed tag suggestions ("this photo looks like this person from your friends list", as Facebook does), which needs face recognition and recommendation ML...
- **More precisely:** Some products suggest tags using face recognition (Facebook did until it shut the feature down in November 2021); this needs face-recognition and recommendation ML services.
- **Additions used:** A-PTU-05
- **Sources:** https://about.fb.com/news/2021/11/update-on-use-of-face-recognition/

### SN-08 · §4.4 · L-0209 (imprecise/medium)
- **Teacher's point (kept):** Tags must be stored queryably: you must be able to ask in which photos a given user is tagged, so they cannot sit in an unindexable array; they go into a database that...
- **More precisely:** Tags must support the query 'which photos is this user tagged in'; arrays can be indexed (MongoDB multikey, PostgreSQL GIN), but for large tag lists a separate row-per-tag table indexed on user_id is simpler and scales better.
- **Additions used:** A-PTU-02
- **Sources:** https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/ · https://www.postgresql.org/docs/current/gin.html · https://www.postgresql.org/docs/current/arrays.html

## 2. Inline clarifications (imprecise-low, simplified-medium)

| Id | Verdict | § | Treatment on the page | Sources |
|---|---|---|---|---|
| L-0009 | imprecise/low | 4.3 | Clause after the claim: the cap is on delivery parallelism, so per-user delivery work is handed to a queue that many workers can drain. | https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka · https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/ |
| L-0022 | imprecise/low | 1.1 | Clause: the web's common set is PNG, JPEG, GIF, WebP, AVIF plus SVG rendering; TIFF works natively only in Safari (MDN link). | https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types |
| L-0054 | simplified/medium | 2.1 | simplified/medium: one sentence + A-GD-03: the hash keeps the address out of plain sight, but it is unsalted and fast, so anyone holding a guessed address can confirm it (oss-sec link). | https://seclists.org/oss-sec/2024/q3/273 · https://docs.gravatar.com/general/hash/ |
| L-0058 | imprecise/low | 2.1 | Clause + A-GD-02: if the email has no Gravatar, a default image comes back; `s=` and `d=` set size and fallback (Gravatar docs link). | https://docs.gravatar.com/sdk/images/ · https://docs.gravatar.com/rest/profiles/ |
| L-0109 | imprecise/low | 2.5 | Clause: the URL carries the hash, so the read is `where hash = ?` (as the class later confirmed); a unique indexed lookup is as cheap as the primary key. | (reasoning; no outside fact added) |
| L-0137 | imprecise/low | 2.4 | Sentence + A-GD-08: a zero-row UPDATE is not an error, so nothing rolls back unless the app reads ROW_COUNT() and issues ROLLBACK (MySQL manual link). | https://dev.mysql.com/doc/refman/8.4/en/information-functions.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-autocommit-commit-rollback.html |
| L-0218 | imprecise/low | 4.6 | Clause + A-PTU-06: 'who can tag me' is a per-user, relationship-based rule, closer to an ACL than classic RBAC (NIST, Zanzibar links). The board's 'RBAC' label is kept. | https://csrc.nist.gov/projects/role-based-access-control · https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/ |
| L-0243 | imprecise/low | 5.2 | Board query kept as taught; the CodeBlock shows `COUNT(DISTINCT sender_id)` with A-PTU-10 (FROM/TO are reserved words). | https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html · https://dev.mysql.com/doc/refman/8.4/en/keywords.html |
| L-0257 | imprecise/low | 5.3 | Clause + A-PTU-13: DEL is O(number of members), cheap for small sets; UNLINK frees memory in the background (Redis docs links). | https://redis.io/docs/latest/commands/del/ · https://redis.io/docs/latest/commands/unlink/ |
| L-0282 | imprecise/low | 6.1 | Clause + A-PTU-20: if read load grows, Redis replicas can serve get-status reads, since a slightly stale badge is acceptable. | https://redis.io/docs/latest/operate/oss_and_stack/management/replication/ · https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/ |

## 3. Left as taught (simplified-low)

| Id | § | Checker's note (for the writer's awareness, not shown as a correction) | Treatment |
|---|---|---|---|
| L-0007 | 4.3 | In a classic Kafka consumer group, parallelism is capped by the number of partitions; Kafka 4.2+ share groups (queues) lift that cap. | Left as taught. A-ID-01 (Kafka 4.2 share groups) added as a separate sourced sentence. |
| L-0008 | 4.3 | When an account with ~90 million followers (e.g. Justin Bieber on X) posts, a notification may need to reach tens of millions of users. | Left as taught (the class's '10-15 million' stays). |
| L-0021 | 1.1 | On a successful response the browser looks at the first bytes of the body (the format signature, e.g. PNG's 89 50 4E 47...), picks the matching decoder and renders the pixels; SVG is identified by its Content-Type... | Left as taught. A-ID-03 and A-ID-04 added as separate sentences / Fig 1-a inset. |
| L-0024 | 1.2 | Every framework named can map a URL prefix to a folder (nginx root/alias, Flask static folder, Spring Boot static resources), but Django serves static files itself only in development: its docs (Django 6.1) say this... | Left as taught. A-ID-07 (Django serves static only in development) as a separate sentence. |
| L-0025 | 1.2 | The mechanism is right, with two details a builder needs: (1) static servers set the response Content-Type from the file extension (nginx 'types' 'Maps file name extensions to MIME types of responses'); (2) the path... | Left as taught. A-ID-05 (path traversal, safe_join) woven in as a separate sentence. |
| L-0044 | 1.4 | On a CDN miss the CDN calls the origin, a GitHub image service that fetches the repository data and generates the image on the fly. | Left as taught. |
| L-0068 | 2.2 | Some relational databases can store several values in one column (PostgreSQL arrays, JSON columns), so it is possible; but the PostgreSQL docs themselves advise a separate table with one row per element because it is... | Left as taught. |
| L-0105 | 2.5 | The teacher's conclusion (cheap) is right, but is_active itself is not indexed in this schema: the rows are narrowed through the user_id lookup, and is_active is then checked on those few rows. That requires an index on... | Left as taught. A-GD-09 (index on photos.user_id) added as a separate sentence. |
| L-0135 | 2.4 | Check-then-write is right, but a plain SELECT inside a transaction does not stop another transaction from changing or deleting the row before the updates run (MySQL manual). Use a locking read (SELECT ... FOR UPDATE)... | Left as taught. A-GD-07 (use SELECT ... FOR UPDATE for the check) as a separate sentence; also step 5 of Fig 2-d. |
| L-0153 | 3.4 | ImageMagick is a long-standing, widely used open-source image suite (its site says it is 'widely used'), but 'the world's most popular' has no public measure; libvips, Pillow and others are also widely used for web... | Left as taught, attributed as the lecture's view ('the world's most popular'). |
| L-0188 | 4.3 | Owner-only tagging avoids most write contention; the remaining concurrent edits (self-removal, multiple devices) are handled by atomic single-record updates. | Left as taught. |
| L-0246 | 5.2 | A (to, from, timestamp) index lets the query jump to the recipient's entries, but it still reads all of them; (to, timestamp, from) lets the timestamp range limit the scan too. | Left as taught. A-PTU-09 attaches to the (to, ts, from) refinement (L-0247) and Fig 5-c. |
| L-0264 | 5.5 | The ledger detail says any key-value store is 'partitionable by default (all of them are)'. A standalone Redis server is a single node; partitioning across nodes needs Redis Cluster, which spreads keys over 16384 hash... | Left as taught. |
| L-0291 | 6.2 | Adding the auxiliary store costs one more network hop and moves the repeated duplicate writes to a separate cluster, protecting the cluster that serves reads; it does not reduce total operations. | Left as taught. |
| L-0292 | 6.2 | The worker does an atomic set-if-absent on the auxiliary Redis (SET B_C 1 NX); only when the key was newly created does it add the sender to the main Redis set. | Left as taught. A-PTU-14 (SET ... NX EX) as a separate sentence; Fig 6-b uses it. |
| L-0302 | 6.2 | The auxiliary store can keep per-pair existence flags; storing them as fields of one hash per user (HSETNX) keeps the check O(1) and makes clearing a single delete. | Left as taught. A-PTU-15 (HSETNX, one hash per receiver) as a separate sentence. |
| L-0305 | 6.3 | If the two writes get out of sync the badge can under-count, possibly until the next clear; writing the main store first and giving auxiliary keys a TTL limits this. | Left as taught. |

## 4. Unverifiable: attributed

| Id | Severity | § | Treatment |
|---|---|---|---|
| L-0012 | none | 4.3 | Attributed: 'the instructor once had to…' inside the MarginNote. |
| L-0017 | none | 1.1 | Attributed as the lecture's view of platforms. |
| L-0039 | low | 1.3 | Light hedge: 'a day or two' is the instructor's estimate; GitHub publishes no refresh interval. |
| L-0061 | none | 2.1 | Attributed: 'three or four hours' is the instructor's estimate. |
| L-0114 | none | 2.5 | Attributed: the instructor's experience across cohorts. |
| L-0162 | low | 3.5 | Light hedge kept verbatim ('Cloudflare or Cloudinary, not sure which, read six or seven years ago'); A-GD-17 (optional) adds that Cloudflare's resizing is written in Rust. |
| L-0196 | low | 4.3 | Light hedge: 'the instructor's rule of thumb'. |
| L-0226 | none | 5.1 | Stated as the definition used for this exercise, from the live demo; no claim about how Instagram counts. |
| L-0228 | none | 5.1 | Stated as what the demo showed. |
| L-0281 | none | 6.1 | Kept as the course's heuristic (also Lecture 2), attributed. |
| L-0299 | none | 7 | Attributed: the instructor's own story. |
| L-0312 | none | 7 | Attributed: the instructor's own account. |
| L-0319 | none | 7 | Attributed: the instructor's own account. |

## 5. Additions

52 of 54 verified additions are used: every 'keep' (49) plus 3 of the 5 'optional' (A-GD-10, A-GD-15, A-GD-17). Placement is in `placement.json` → `additions`. The text used on the page is each addition's `final_text` (the verifier's rewording where there is one).

Not used:
- **A-GD-14**: optional; Cloudflare purge-by-URL rate limits add nothing that L-0130 and A-GD-13 don't already say.
- **A-PTU-04**: optional; YOLO's normalized box format is an ML-dataset detail. L-0216 and A-PTU-03 already show the relative x,y,w,h form.

## 6. Items not fact-checked

13 ledger items have no fact-check row: L-0001, L-0002, L-0003, L-0004, L-0005, L-0006, L-0116, L-0146, L-0165, L-0174, L-0298, L-0314, L-0315. All are `admin_reference` items (agenda, course structure, resources). They are placed (or dropped) per `placement.json`, and none makes a technical claim that needs a source.
