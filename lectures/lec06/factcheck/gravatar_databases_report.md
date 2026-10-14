# Fact-check report: Gravatar, databases, image optimization, engineering mindset, CDN (Lecture 6)

Scope: 116 ledger items of topic group `gravatar_databases` (roots: gravatar, databases, image-optimization, engineering-mindset, cdn); 0 admin items skipped. **116 items checked.** Date of check: 2026-10-13 (PostgreSQL 18 docs, MySQL 8.4 manual, Gravatar docs, ImageMagick 7.1.2, Pillow 12.3.0).

## Counts

| Verdict | Count |
|---|---|
| accurate | 100 |
| simplified | 5 |
| imprecise | 6 |
| wrong | 2 |
| outdated | 1 |
| unverifiable | 2 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 4 |
| low | 11 |
| none | 101 |

Additions proposed: 20 (see `gravatar_databases_additions.jsonl`).

Calibration: this part of the lecture is mostly design reasoning (schema, queries, transactions, CDN flow) that is correct for its context, so most items are `accurate`. I flagged items only where a careful reader would leave with a wrong idea: a general rule stated too broadly (computed predicates and indexes, transactions and concurrency, "S3 is not public"), a product fact that changed (Gravatar's hash), or a library fact that is wrong (PIL/ImageMagick). Student proposals were judged on what the teacher upheld. Engineering-mindset opinions and anecdotes are `accurate` (sound advice) or `unverifiable` (personal experience).

## Items needing a decision (ordered by severity)

### L-0081 | imprecise | severity: medium
- **Teacher/ledger statement:** A computation in the where clause (e.g. HASH(email) = ?) prevents the database from using indexes: it has no way to know which email evaluates to that hash without computing it for every row, so every query is a full table scan.
- **Verbatim:** "the where clause itself contains a computation, which means that it cannot leverage indexes over here" (teacher)
- **Issue:** True for an ordinary index on the column, but not as a general rule. PostgreSQL supports indexes on expressions, and a query with the same expression in WHERE runs "equivalent to any other simple index query". MySQL 8 supports functional key parts. Storing an indexed hash column (the lecture's fix) is one valid option; an expression index is another.
- **Suggested note:** A plain index on email can't serve WHERE hash(email) = ?, so that query scans every row unless you index the expression itself (PostgreSQL expression index, MySQL functional key part) or store the computed value in its own indexed column.
- **Sources:** [postgresql.org](https://www.postgresql.org/docs/current/indexes-expressional.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/create-index.html)

### L-0095 | imprecise | severity: medium
- **Teacher/ledger statement:** Student point: with the transaction the update is atomic, so concurrent requests are taken care of.
- **Verbatim:** "Once we have added transaction, it becomes atomic in nature, right?" (student, teacher accepted "concurrency taken care of")
- **Issue:** Atomicity ≠ isolation. Under PostgreSQL's default Read Committed, an UPDATE finds target rows using a snapshot from the start of the statement. Two concurrent mark-active transactions (especially with the "and is_active = true" refinement) can each clear only the old active row and then each activate their own photo, leaving two active photos.
- **Suggested note:** A transaction makes the two updates all-or-nothing; making concurrent requests safe needs isolation too: lock the user's row first (SELECT ... FOR UPDATE), use SERIALIZABLE, or keep a single active_photo_id on users.
- **Sources:** [postgresql.org](https://www.postgresql.org/docs/current/transaction-iso.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)

### L-0139 | imprecise | severity: medium
- **Teacher/ledger statement:** A common question is why the CDN does not point to S3 directly; one reason given is that S3 is not public.
- **Verbatim:** "One common question that ask is why CDN not pointing to S3 directly? Because S3 is not public." (teacher)
- **Issue:** CDNs routinely read private buckets: CloudFront Origin Access Control signs requests to a non-public bucket, and viewers still can't use S3 URLs directly. The real reason is the next item (L-0140): S3 doesn't know which photo is active.
- **Suggested note:** The CDN can't go straight to S3 because S3 doesn't know which photo is active; only the database does. A private bucket alone would not stop it, since CDNs can read private buckets.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)

### L-0054 | simplified | severity: medium
- **Teacher/ledger statement:** The URL uses a hash of the email rather than the email itself for security, because the email is PII.
- **Verbatim:** "→ security PII" (board)
- **Issue:** An unsalted, fast hash of an email is only pseudonymous. Anyone with a candidate address can hash it and check for a match, so guessable addresses can be identified from Gravatar URLs. Solar Designer (oss-sec, 2024) notes the move from MD5 to SHA-256 is "almost no change" for this.
- **Suggested note:** Hashing keeps the email out of plain sight, but anyone who can guess an address can confirm it, so it is not real protection of PII.
- **Sources:** [seclists.org](https://seclists.org/oss-sec/2024/q3/273), [docs.gravatar.com](https://docs.gravatar.com/general/hash/)

### L-0057 | outdated | severity: low
- **Teacher/ledger statement:** The Gravatar URL is gravatar.com/<MD5 hash of the email>; it is constant because passing the same value to a hash function always gives the same output.
- **Verbatim:** "It's an MD5 hash of my email ID." (teacher)
- **Issue:** MD5 is historical. As of October 2026 the Gravatar docs specify SHA-256 of the trimmed, lowercased email, a change from about January 2024. The image path is /avatar/<hash>.
- **Suggested note:** Gravatar now uses gravatar.com/avatar/<SHA-256 of the trimmed, lowercased email> (MD5 originally). The URL stays constant because the hash is deterministic.
- **Sources:** [docs.gravatar.com](https://docs.gravatar.com/general/hash/), [gitlab.com](https://gitlab.com/gitlab-org/gitlab/-/issues/370057), [docs.gravatar.com](https://docs.gravatar.com/sdk/images/)

### L-0154 | wrong | severity: low
- **Teacher/ledger statement:** The Python Image Library (PIL) has two bindings: a native Python binding and ImageMagick.
- **Verbatim:** "Python image library PIL has two bindings. One is native Python binding. Second is ImageMagick." (teacher)
- **Issue:** PIL (maintained today as Pillow) is a standalone library with its own C code, not an ImageMagick binding. Python reaches ImageMagick through a separate package such as Wand.
- **Suggested note:** In Python, Pillow (the PIL fork) is its own imaging library; ImageMagick is used through a separate binding such as Wand.
- **Sources:** [pillow.readthedocs.io](https://pillow.readthedocs.io/en/stable/), [docs.wand-py.org](https://docs.wand-py.org/en/latest/)

### L-0155 | wrong | severity: low
- **Teacher/ledger statement:** ImageMagick is written purely in C++, and almost every language has C++ bindings, so ImageMagick can be invoked natively from your preferred language.
- **Verbatim:** "ImageMagick is purely written in C++." (teacher)
- **Issue:** ImageMagick "is written in C". MagickCore and MagickWand are C APIs; Magick++ is a C++ API on top. The point that most languages can bind to it still stands.
- **Suggested note:** ImageMagick is written in C (with C and C++ APIs), so most languages can call it through bindings.
- **Sources:** [imagemagick.org](https://imagemagick.org/), [imagemagick.org](https://imagemagick.org/script/magick-core.php)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0058 | imprecise | low | Image is at gravatar.com/avatar/<hash>; gravatar.com/<slug> is the profile page; missing avatars get a default image or 404 (d=404). |
| L-0068 | simplified | low | Arrays/JSON columns can hold multiple values, though PostgreSQL docs themselves recommend a separate table, as taught. |
| L-0105 | simplified | low | is_active isn't indexed; the cheap part is the user_id index lookup. PostgreSQL doesn't auto-index FK columns, InnoDB does. |
| L-0109 | imprecise | low | The read is by hash (where hash = ?), not by user ID; the teacher fixed this later (L-0111). |
| L-0135 | simplified | low | A plain SELECT check doesn't lock the row; use SELECT ... FOR UPDATE or check affected rows. |
| L-0137 | imprecise | low | A zero-row UPDATE isn't an error; the transaction won't roll back by itself. The app must check ROW_COUNT() and ROLLBACK. |
| L-0153 | simplified | low | "Widely used" is supported; "world's most popular" has no public measure (libvips, Pillow also common). |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0114 | Teacher's experience across 15 cohorts. |
| L-0162 | Half-remembered blog (Cloudflare or Cloudinary, 6-7 years ago); not found. Cloudflare says its Image Resizing was developed in Rust, so the ImageMagick description doesn't fit Cloudflare's current product. |
