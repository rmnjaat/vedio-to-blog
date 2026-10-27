# Lecture 7 (lec09) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec09.mdx`, `lec09/{s0-header,c1…c9}.mdx`, the text (labels and `desc`, as rendered in
`story/page_text.md`) of every figure those files import from `site/src/figures/lec09/`, and the alt text, captions and
on-screen cues of the four clips (`l09-cdn-miss-hit`, `l09-presigned-upload`, `l09-signed-url-expiry`,
`l09-hashtag-repartition`). Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`,
`story/NOTES.md`, the callback targets in lec01 (Lecture 2), lec02 (Lecture 4), lec03 (Lecture 6) and lec06 (Lecture 8),
and, for the writer's flagged doubt, the CloudFront and Cloudflare docs (opened 27 Oct 2026). No page file was edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / wrong or broken code) | 0 | 2 | 3 | 5 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 0 | 2 | 2 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions | 0 | 0 | 4 | 4 |
| **Total** | **0** | **2** | **9** | **11** |

High and medium:
- **F-01 (medium, error)**: the S3 key and the CDN URL disagree. `photo_url` builds `/{user_id}/{image_id}.png`, while `s3_key`, Fig 3·b and the §9.4 bullet use `<user_id>/<image_id>` with no extension. The CDN keeps the path, so every miss asks S3 for a key that doesn't exist. Chapter 2's upload path, `s3://images/<random_id>.png`, isn't in the per-user layout either, and nothing says the image service must now sign the per-user key.
- **F-02 (medium, error)**: §8.2 cites Cloudflare for "many CDNs don't cache JSON by default", then says the fix is a `Cache-Control: public, s-maxage=60` header. On Cloudflare that header alone doesn't make an extensionless JSON URL cacheable; you also need a Cache Rule. The sample doesn't work on the system the page cites.

---

## Issues

### F-01 · ERROR · medium · The S3 key has no `.png`, the CDN URL does, and the upload path is never moved to the per-user layout
- **Where:** c3 §3.3 (Python block and the sentence before it); Fig 3·b (`PostsAndPath` label and desc "s3://insta-images/<user_id>/<image_id>"); c9 §9.4 bullet "photos live at `<user_id>/<image_id>`". c2 §2.3, "say `s3://images/<random_id>.png`", and clip `l09-presigned-upload` (label and alt "s3://images/<id>.png").
- **Current text (c3):**
  ```python
  return f"{host}/{user_id}/{image_id}.png"
  ...
  return f"{user_id}/{image_id}"    # inside the bucket insta-images
  ```
- **Problem:** chapter 1 establishes, and the page repeats in §3.4 step 3 and Fig 3·d, that the CDN swaps the host and keeps the path. A request for `instacdn.net/A/12345.png` therefore makes the CDN fetch the key `A/12345.png`, but `s3_key` says the object lives at `A/12345`. Run as written, the two functions point at different objects: a delete removes a key the CDN never serves, or the CDN misses on every photo.
  - The lecture itself mixed the forms. The board path has no extension (L-0135, 01:08:46–01:09:30); the URL built in code has `.png` (L-0156, 01:16:54–01:17:45). The page should settle on one.
  - Chapter 2 signs the upload for `s3://images/<random_id>.png`, at the root of a bucket named `images` (L-0081, 00:40:24–00:42:01). Chapter 3 then says "not every photo in the root folder, but a folder per user", but never says that the image service now signs the per-user key. Without that, the uploaded object and the derived path are still different keys.
- **Sources:** L-0081, L-0135, L-0136, L-0137, L-0145, L-0156, L-0157. Transcript 00:40:24–00:42:01, 01:08:46–01:10:08, 01:16:54–01:17:45.
- **Replacement:**
  - c3 §3.3 paragraph: "For this to work, lay out the bucket so the path can be computed: not every photo in the root folder, but a folder per user. In the bucket `insta-images` the key is `<user_id>/<image_id>.png`, and that is the path the image service signs its upload URL for. The CDN keeps the path, so the CDN URL is the same key under the CDN's host. That is why GitHub's upload key started with the uploader's ID."
  - Python: `return f"{user_id}/{image_id}.png"    # inside the bucket insta-images; the CDN URL uses the same path`
  - Fig 3·b label and desc: `s3://insta-images/<user_id>/<image_id>.png`.
  - c9 bullet: "photos live at `<user_id>/<image_id>.png`".
  - c2 §2.3 may keep `s3://images/<random_id>.png` as the first sketch, since §3.3 now says the layout changes.

### F-02 · ERROR · medium · A `Cache-Control` header alone doesn't make Cloudflare cache JSON
- **Where:** c8 §8.2, the paragraph before the `http` block, the block itself and the caption sentence after it. Also the c9 §9.4 bullet "the page's JSON sits behind the CDN with `s-maxage`".
- **Current text:** "The CDN only caches what it is told it may cache, and many CDNs don't cache JSON by default [Cite: developers.cloudflare.com]. So the hashtag API says so in its response, here allowing shared caches like the CDN to keep it for a minute…"
- **Problem:** the cited page says Cloudflare "only caches based on file extension and not by MIME type", does not cache HTML or JSON by default, and that to cache other content you "create a rule to cache everything" (Cache Rules). `/hashtag/sunset` has no extension, so on Cloudflare the response is never eligible, whatever its `Cache-Control` says. On CloudFront the header is enough: it honours `s-maxage` within the cache policy's min and max TTL (fact-check A-CDM-04).
  - The page's "So" makes the header sound sufficient, and the citation points the reader at the one major CDN where it isn't.
  - Fact-check L-0273 (simplified/medium) already said: "The origin must send Cache-Control (e.g. s-maxage) or a cache rule must make the hashtag API response eligible."
  - Chapter 1 gets this right ("the origin's `Cache-Control` header … or your cache rules decide"). §8.2 drops the second half.
- **Sources:** L-0272, L-0273, L-0276; fact-check L-0040, L-0273, A-CDM-03, A-CDM-04. Transcript 02:24:49–02:26:35. https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
- **Replacement (c8):** "The CDN caches only what it is allowed to. Cloudflare, for one, doesn't cache JSON by default: it decides by file extension, so `/hashtag/sunset` needs a cache rule that makes it eligible [Cite]. Then the hashtag API says how long the copy may live. Here it lets shared caches like the CDN keep it for a minute (the value is yours to choose); CloudFront honours this header on its own, within its TTL limits:" Keep the `http` block as it is.
  - c9 bullet: "the page's JSON sits behind the CDN, cacheable for a minute (`s-maxage`)".

### F-03 · ERROR (writer's inference, overstated) · low · CloudFront and `?w=360`: signing and the cache key
- **Where:** c5 §5.1, last two sentences of the paragraph after Fig 5·b.
- **Current text:** "One detail to get right with private photos: a signed URL covers its query string, so on CloudFront a parameter added after signing makes the request fail. There the width has to be in the URL before the backend signs it."
- **Verdict:** half right. "has to be" is too strong.
  - **Canned policy (true):** the signed resource is "the base URL including your query strings", so an appended `w=360` no longer matches, and CloudFront returns 403 (fact-check A-CDM-12).
  - **Custom policy (false):** the `Resource` may use wildcards. "A trailing asterisk in the path section implies an asterisk in the query string section", so a policy for `https://instacdn.net/A/1729.png*` accepts `…/1729.png?w=360` appended by the app. In other words, §5.1's own design (the app appends the width) works on CloudFront if the backend signs a custom policy with a trailing wildcard.
  - **What the page leaves out:** the width only produces separately cached sizes if it is part of the cache key. CloudFront's managed `CachingOptimized` policy excludes query strings, so every `?w=` would get the same cached copy and the parameter would never reach the resizer. Fig 5·b step 2 ("the path with `?w=360`") assumes a cache key that CloudFront doesn't use by default.
  - The page already says CloudFront has no built-in resizer, so this whole sentence is about a deployed add-on. Keep it short.
- **Sources:** L-0169, L-0189, L-0191, L-0192; fact-check A-CDM-12, A-CDM-17. Transcript 01:29:31–01:30:36, 01:33:49–01:36:44. https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-canned-policy.html · https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-creating-signed-url-custom-policy.html
- **Replacement:** "One detail to get right with private photos: the signature covers the URL it was made for. With CloudFront's simplest (canned) policy that is the exact URL, query string included, so a `?w=360` added afterwards makes the request fail. Either the backend signs the URL with the width already in it, or it signs a custom policy whose resource ends in a wildcard (`…/1729.png*`), which lets the app append the width. And the width must be part of the cache key (on CloudFront, a cache policy that includes `w`), or every size is served the same copy."

### F-07 · ERROR · low · "S3 lives in a few AWS Regions"
- **Where:** c2 §2.1, last paragraph.
- **Current text:** "S3 lives in a few AWS Regions (two in India, Mumbai and Hyderabad), while a CDN has edges in many cities".
- **Problem:** S3 runs in every AWS Region, more than thirty of them. The fact-check point (A-CDM-10) is about India: two Regions against many CloudFront edge cities.
- **Sources:** L-0109, L-0111; fact-check L-0111, A-CDM-10. Transcript 00:59:24–01:00:44.
- **Replacement:** "You can, but in India S3 lives in two AWS Regions, Mumbai and Hyderabad, while a CDN has edges in many cities, much closer to the reader."

### F-09 · ERROR (schema comment) · low · The posts table cites Lecture 6's ID scheme but uses MySQL types
- **Where:** c3 §3.3 SQL block; Fig 5·c ("write the post · mysql").
- **Current text:** `id BIGINT PRIMARY KEY,  -- from the ID scheme of Lecture 6` … `created_at DATETIME NOT NULL`
- **Problem:** Lecture 6 (lec03) says "Instagram ran PostgreSQL" and "computes the ID inside the database, in a function used as the column default". That scheme is a PostgreSQL function. This table is MySQL: it uses `DATETIME`, which PostgreSQL doesn't have, and Fig 5·c names MySQL, following the board (L-0181). The comment implies the Lecture 6 function fills the column, which it can't do in MySQL. The SQL itself is valid MySQL.
- **Sources:** L-0133, L-0181; lec03 c10. Transcript 01:08:00, 01:31:34–01:32:36.
- **Replacement:** `id BIGINT PRIMARY KEY,  -- a 64-bit, time-sortable ID (Lecture 6)`. The rest of the block is unchanged.

### F-08 · DISTORTION · low · Pre-signed URL expiry stated as a property of the URL, not a choice
- **Where:** c2 §2.4 ("until it expires, a few seconds to a minute later"); c9 §9.4 bullet ("expiring within a minute") and recall answer 1 ("expires within a minute").
- **Problem:** the lecture gave example lifetimes the backend picks ("10, 20, 30, 60 seconds", L-0084). The page reads as if pre-signed URLs always die within a minute. SDK-signed S3 URLs can last up to 7 days, and a URL signed with role credentials lasts until that session ends (fact-check A-IUT-08). It is a design choice, so call it one.
- **Sources:** L-0084, L-0098; fact-check A-IUT-07, A-IUT-08. Transcript 00:43:11–00:44:03.
- **Replacement (c2):** "Anyone who holds it can store content at its one path until the expiry the backend chose: here a minute, often just seconds." The c9 bullet and the recall answer can stay as they are ("within a minute" reads as this design's choice once §2.4 says so).

### F-11 · DISTORTION (citation) · low · The highscalability cite is placed after the fbcdn move it doesn't cover
- **Where:** c3 §3.2, first sentence pair.
- **Current text:** "Instagram served its photos from S3 through Amazon CloudFront. Then Facebook bought it, and the photos moved to Facebook's own CDN, `fbcdn.net` [Cite: highscalability.com]."
- **Problem:** the High Scalability write-up is from December 2011, before the April 2012 acquisition. It supports S3 + CloudFront, not the move. The move is backed by the live URLs in the lecture's own demo (L-0167/L-0171, the host `instagram.fblr22-1.fna.fbcdn.net`). The correction itself (CloudFront, not the lecture's Cloudflare) is right and stated once.
- **Sources:** L-0127, L-0144, L-0167, L-0171; fact-check L-0127. Transcript 01:06:42–01:07:17, 01:23:21–01:25:56.
- **Replacement:** "Instagram served its photos from S3 through Amazon CloudFront [Cite: highscalability.com]. Then Facebook bought it, and the photos moved to Facebook's own CDN: today their URLs are on `fbcdn.net`, as you will see in chapter 4."

### F-04 · INTERNAL CONTRADICTION · low · "One write" vs the figure's MySQL write plus Kafka event
- **Where:** c5 §5.2, paragraph 2, against Fig 5·c (desc: "The post service writes the post to MySQL and drops one 'post published' event on a Kafka topic"). Also c8 §8.4 ("Post service to Kafka: is it one call? It must be; with two, you would need distributed transactions").
- **Current text (c5):** "When a post is published, the post service makes one write, a message onto a Kafka topic, and is done."
- **Problem:** the figure and §3.4 show the post service saving the row and also publishing the event. That is two writes, and it is exactly the pair §7.2 and §8.4 say needs distributed consistency. The lecture's order was "store in the database first, then push an event" (L-0356). The page should say what the post service does, and leave "one write to Kafka" meaning one Kafka write, not one write in total.
- **Sources:** L-0181, L-0237, L-0281, L-0356; fact-check A-HSD-11. Transcript 01:31:34–01:32:36, 02:29:21–02:30:24, 03:20:36–03:21:26.
- **Replacement (c5):** "When a post is published, the post service saves it and puts one message on a Kafka topic, and is done." The c8 sentence can stay. Optional, if a clause fits: "(the database write and this event are themselves two writes; chapter 9's transactional outbox is how you make them one)".

### F-05 · INTERNAL CONTRADICTION · low · "The real S3 path is never exposed"
- **Where:** c2 Fig 2·d, step 2.
- **Current text:** "…the future image URL, `href`, which is a CDN URL … The real S3 path is never exposed."
- **Problem:** the same step lists the `key` field, and the paragraph after it says "`key` is the path the URL was signed for". The S3 path is in the reply. What the lecture said is that the URL used to render the image is the CDN one, not the S3 one (L-0092).
- **Sources:** L-0090, L-0092, L-0096. Transcript 00:47:04–00:50:00.
- **Replacement:** "The page renders the CDN URL, never the S3 one."

### F-06 · INTERNAL CONTRADICTION · low · Pre-signed URL: "one holder", or anyone who holds it?
- **Where:** c4 §4.2, last paragraph.
- **Current text:** "chapter 2's pre-signed URL let one holder write one path for a minute. This one lets any holder read one photo for a few minutes."
- **Problem:** §2.4 rightly says a pre-signed URL is a bearer token: "Anyone who holds it can store content at its one path… whoever has one can use it, repeatedly". The contrast "one holder" against "any holder" undoes that, and the real difference is write against read.
- **Sources:** L-0084; fact-check A-IUT-07. Transcript 00:43:11–00:44:03.
- **Replacement:** "chapter 2's pre-signed URL let whoever held it write one path for a minute. This one lets whoever holds it read one photo for a few minutes."

### F-10 · INTERNAL CONTRADICTION (figure vs text) · low · Fig 9·c is drawn on the post topic with a search consumer
- **Where:** c9 §9.2, Fig 9·c (`StreamSteps`): labels "post topic, one partition", "search consumer"; desc "the search consumer reads 3 to 5".
- **Problem:** the section's question is about the counting server that crashes and a data science group on `POST_HASHTAG` ("all on the hashtag design", per NOTES), and the steps say "A consumer". The figure brings in a search consumer and the post topic, which the text never mentions here.
- **Sources:** L-0323–L-0328. Transcript 02:57:02–03:01:20.
- **Replacement:** relabel the figure "POST_HASHTAG, one partition" and "counting server", and in the desc write "the counting server reads 3 to 5 …". Step 6's "brand-new consumer" stays, since it matches the data science pause.

### Important losses
None found that matter. The cuts in NOTES ("Cut, and why") are trivia, demo detail or Q&A tails. Every reusable method in the ledger is still on the page:
- the CDN property and path carry-over;
- pull, not push, and invalidation;
- the pre-signed two-phase upload;
- derive, don't store;
- privacy decided in the API;
- design storage from the page;
- batch, then re-key through an adapter;
- data science's results on Kafka;
- read path and write path, one hop at a time;
- the Kafka-down options, consumer start positions, and partitions as parallelism.

The Instagram year-one stack (L-0009) was dropped deliberately; it is history, not a method. Its board version (Cassandra) also conflicted with the fact-check, so the drop is safe.

---

## The writer's flagged doubts (NOTES.md)

1. **§5.1, the width must be in the URL before signing on CloudFront.** Half right. True for canned policies; false for custom policies with a trailing wildcard. The cache-key requirement is missing. See F-03 for the replacement text.
2. **Upload arithmetic (5M/day ≈ 58/s ≈ 290 MB/s ≈ 2.3 Gbit/s each way).** Correct.
   - 5,000,000 / 86,400 = 57.9/s.
   - × 5 MB = 289 MB/s.
   - × 8 = 2.31 Gbit/s.
   - "Each way" is right: in from the app, out to S3. "Before any peak" is the right hedge.
   - With MiB the figures are 303 MB/s and 2.4 Gbit/s, still "roughly 2.3". No change.
3. **Document size with 64-bit IDs (≈836 B ≈ 1 KB; a billion = 1 TB; top 1M = 10,000×).** Correct. 32 + 4 + 800 = 836 B. The page also applies the fact-check corrections to L-0343, L-0344 and L-0347, each stated once.
4. **`Cache-Control: public, s-maxage=60` as an example value.** The header is valid, and the text says the value is an example. But the header alone isn't enough on the cited CDN; see F-02.
5. **Hedged experience claims** ("one engineer's experience, every two years", "one engineer's estimate 50 to 100 times", "one rule of thumb"). Correctly hedged; they match fact-check L-0139, L-0176 and L-0044 (all unverifiable).
6. **Sachin Tendulkar's 50 MB photo.** Fine. The audio says 50 MB and the board says 5 MB (L-0187). The page presents it as a hypothetical ("Say…"), and 10 × 50 MB = 500 MB is consistent.
7. **Clip storyboard docs still name the old hosts.** Not rendered, so not in scope. Updating them would only stop the old hosts coming back in a future re-render.
8. **lec06 wording ("subdomain").** Already fixed in lec06: "In Lecture 7 the CDN had a hostname of its own, `instacdn.…`".

## Checked and found correct

- **Instagram year one:** 14 million users, three engineers (L-0007; High Scalability says "just over a year", close enough for a hook). Photos on S3 behind CloudFront, not the lecture's Cloudflare (fact-check L-0127/L-0144, corrected once). Today's photos on `fbcdn.net` (L-0167, L-0171). The stack itself is deliberately omitted.
- **Bing Search API prices:** up roughly 3–10× in 2023. This applies fact-check L-0129, which corrected the lecture's "4 to 10×", and drops the lecture's stated reason.
- **CDN basics:**
  - a property maps a host to an origin, and the CDN swaps the host and keeps the path, including an origin path such as `/static` (L-0030, L-0034, L-0035, L-0047, L-0048);
  - pull, not push (L-0019);
  - invalidation is not a push (L-0058, L-0059);
  - a private origin through keys or OAC (fact-check L-0053, L-0115, L-0116);
  - anycast and DNS steering (fact-check L-0206, L-0207);
  - cacheability set by headers or rules, and Cloudflare's defaults in §1.4 (fact-check L-0036, L-0040).
- **S3:** dirt cheap (L-0064); eleven nines of durability (fact-check L-0113); AWS's data-transfer charges, corrected from the lecture's "ingress billed" (fact-check L-0079, A-IUT-04).
- **Pre-signed upload semantics:**
  - signed locally by the SDK with no call to S3 (fact-check L-0085);
  - PUT or form POST (fact-check L-0082);
  - the signature covers bucket, key, method and expiry, and S3 checks it statelessly, like a JWT (L-0098 and its fact-check);
  - bearer tokens, valid until expiry (A-IUT-07);
  - an open bucket gets billed for strangers' storage (L-0083);
  - moderation becomes asynchronous, or uploads are proxied (L-0105, A-IUT-16);
  - orphaned uploads (L-0204).
- **GitHub demo:** 179 KB = 183,938 bytes; four calls; S3's `upload_url`; the `key`, `acl`, `policy` and `X-Amz-*` fields; S3 answers 204; then a PUT that returns 200; the `!` markdown; the CDN href with user ID 4745789 and image 221335625 (L-0088 to L-0102, L-0136). The `public-read` ACL note and "ACLs off by default" (fact-check L-0097, A-IUT-09).
- **Posts table and derivation:** id, user_id, image_id, caption, created_at (L-0121, L-0133); hashtags in the caption (L-0122); the CDN-switch, cloud, 20%-split and delete what-ifs (L-0127 to L-0145); the 20% coin flip (L-0143); the post service checks image ownership (L-0148); the profile load in Fig 3·d (L-0153 to L-0157).
- **Signed URLs:** the CDN keeps no user state (L-0168); "Bad URL timestamp" (L-0171); a signature, not a certificate, with CloudFront public/private keys against Cloudflare's HMAC (fact-check L-0169, A-CDM-15); `oe`/`oh` hedged as most probable (L-0170); expiry checked per request, so an in-flight download completes (A-CDM-13); IP-bound custom policies and signed cookies as middle ground (A-CDM-14); privacy enforced by the API (L-0172, L-0173); pseudo privacy (L-0174); no secure proprietary format (L-0197, L-0199); DRM and watermarking (A-HSD-19). The clip shows a 5-minute expiry, with a fetch at minute 2 that works and one at minute 10 that fails (L-0177).
- **Resizing:** CDNs take a width parameter (L-0189); the app appends it (L-0191); lookup order resized copy → original → origin (L-0192); CloudFront has no built-in resizer, and AWS offers a solution you deploy behind it (fact-check L-0186, A-CDM-17).
- **Hashtag page and top-K:**
  - one document per tag holding the tag, total and top_100 post IDs (L-0216, L-0219);
  - why post IDs and not image IDs (L-0223);
  - the IDs-against-whole-posts table matches the board (L-0224 to L-0234);
  - don't add requirements mid-design (L-0228);
  - don't garbage-collect tags (L-0342);
  - top 1M: first page in the document, the rest paginated (L-0347 to L-0349, 10,000× per fact-check);
  - data science's ranking is a black box (L-0212, L-0218);
  - no synchronous call: latency and uptime coupling (L-0257, L-0264);
  - webhook against their Kafka, both sides (L-0305);
  - replace the array wholesale (L-0309);
  - a process, not a service (L-0262).
- **Counting and Kafka:**
  - batch with count += n (L-0236, L-0238, L-0250, L-0252); 10 + 10 + 20 = 40 single increments;
  - bulk insert "many times faster" (fact-check L-0253);
  - two reasons not to key the post topic by hashtag (L-0240, L-0241); key by user_id (L-0242);
  - partial folding per server, k writes per batch (fact-check L-0243, so the page is two-sided);
  - Redis Pub/Sub rejected for data loss and push flow control, without the overstated cost argument (fact-check L-0245; L-0300 to L-0304);
  - the extractor writes (hashtag, post_id) pairs to `POST_HASHTAG` keyed by hashtag, on the same cluster (L-0249, L-0267, L-0269);
  - a hash picks the partition, so three partitions can hold millions of tags (L-0251);
  - Kafka Streams repartitions on groupBy (fact-check L-0254);
  - the per-server hash map (L-0297);
  - commit = next offset to read; a crash between write and commit replays the batch (at-least-once); over-counting accepted (L-0255, L-0256, fact-check L-0326);
  - atomic increments on MySQL and DynamoDB (L-0308).
- **Every code sample:** the `UPDATE hashtags SET total_photos = total_photos + 2 WHERE tag = 'sunset';` statement is valid and atomic in MySQL. The `http` block is valid syntax (but see F-02). The Python `photo_url` logic is right apart from F-01. The JSON-like document is shown as `text`, which is fine as a sketch.
- **Read side:** key-value access on MySQL, MongoDB or DynamoDB (L-0274); a CDN or a cache, preferring the CDN (L-0275); TTL plus invalidation (L-0276); read path and write path, one hop at a time (L-0277 to L-0293); in a consumer group the partition count caps parallelism (fact-check L-0282, A-HSD-04).
- **Bad days:**
  - Kafka can go down; the MSK and Confluent SLAs (fact-check L-0313, A-HSD-13);
  - producer buffering: `buffer.memory` 32 MiB and `delivery.timeout.ms` 120 s (A-HSD-09);
  - "fallback queue" in place of the board's "dead letter queue" (fact-check L-0314, L-0358), applied silently and consistently, with Fig 9·b relabelled;
  - SOS (L-0320);
  - transactional outbox (fact-check L-0359);
  - 7-day default retention, correcting the lecture's "forever" (fact-check L-0323);
  - trim horizon is Kinesis's word, Kafka's is earliest (fact-check L-0324);
  - commits per group and partition (fact-check L-0326);
  - a new group defaults to `latest`, shown alongside the lecture's "start from the horizon" (fact-check L-0328);
  - archive to S3 (L-0330);
  - 1,000 partitions for a million users (L-0310);
  - adding partitions remaps keys and doesn't move data (fact-check L-0294, A-HSD-03);
  - online repartitioning or downtime (L-0316).

  All four Kafka doc links resolve (HTTP 200).
- **Callbacks:**
  - Lecture 2 (lec01): Kafka keyed by `user_id`, at-least-once replay, "add partitions later and keys start landing elsewhere", the CDN caching `/popular`. All match.
  - Lecture 4 (lec02): Redis Pub/Sub "keeps nothing"; the message is saved first and only the push is lost. Matches "the database already held every message".
  - Lecture 6 (lec03): a 64-bit, time-sortable ID made inside the database. Matches (but see F-09).
  - Lecture 8 (lec06): Gravatar at every size, photo tags from a one-line brief, a badge counting people not messages. Matches.
- **Clips:** the captions, cues and alt text of all four clips agree with the text. The repartition counts are right: `#sunset` += 3, `#sun` += 2, `#nature` += 1. The pre-signed clip says "valid 60 s, without calling S3".
