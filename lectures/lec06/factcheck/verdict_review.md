# Verdict review: second fact-checker, lecture 06

Date: 2026-10-13. Scope: every claim verdict marked `wrong` or `outdated`, or with severity `high`/`medium`, in `images_delegation.jsonl`, `gravatar_databases.jsonl` and `photo_tagging_unread_indicator.jsonl` (10 items), plus 15 randomly sampled `accurate` verdicts (Python `random.seed(12)`, `random.sample` over the 259 sorted accurate ids). I checked every flagged item against its ledger row and the transcript. I opened and read every URL cited below. When a URL didn't resolve, this file says so.

## Summary

- 10 flagged verdicts re-checked. I agree with 9 outright and dispute 1 (a severity).
- 15 sampled `accurate` verdicts: all 15 agree. 13 of the 15 cite no source ("Correct as stated for this context"). They are reasoning, opinion or classroom-exchange items, so that's acceptable.
- 54 additions re-verified: 41 confirmed and 13 reworded (wrong quotes, overstated wording or an unsourced clause). None rejected. 5 are marked optional.
- Cross-group inconsistency found: two checkers judged the same misconception ("PIL uses ImageMagick") at different severities: L-0047 wrong/medium and L-0154 wrong/low. I set both to low. See Disputes.
- Version drift since the first pass: no change affects any verdict.
  - Kafka 4.3.1 (June 25, 2026) is the current release (https://kafka.apache.org/community/downloads/), and 4.2.2 is a later patch on the 4.2 line. A-ID-01 and L-0007 say "since 4.2 (Feb 2026)", which is still correct.
  - Other versions I saw: Django docs 6.1 (A-ID-07), PostgreSQL 18.6, Pillow 12.3.0 and ImageMagick 7.1.2-33. The checker wrote "7.1.2", which is the same line.
  - Gravatar's hash page still specifies SHA-256 and doesn't mention MD5.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0047 | wrong / medium | **wrong / low** | I agree on the substance. Pillow is "the friendly PIL fork" (https://pillow.readthedocs.io/en/stable/). Its build dependencies are libjpeg, zlib, libtiff, libfreetype, libwebp and others, and ImageMagick is never mentioned (https://pillow.readthedocs.io/en/stable/installation/building-from-source.html). Wand is "a ctypes-based simple ImageMagick binding for Python" (https://docs.wand-py.org/en/latest/). But this is the same misconception as L-0154, which the gravatar_databases checker graded **low**, and one claim should get one severity. It's a library-internals slip. The transcript (00:25:17) shows the teacher's actual advice: pick an image library, build a local prototype, expose an endpoint. That advice works as given with Pillow, and the error changes no design decision. Interviewers don't ask which C library Pillow links. Low matches L-0154 and L-0155. The wrong verdict still gets a sourced note under the policy. |

## Agreements (with extra evidence where useful)

### Gravatar URL and hashing
- **L-0054 simplified / medium: agree.** The board says only "→ security PII". The oss-sec post by Solar Designer (Sep 25, 2024, https://seclists.org/oss-sec/2024/q3/273) says Gravatar URLs "by design allow for quick checking of email addresses against them", calls MD5 → SHA-256 "almost no change", and notes both hashes "are very fast". A learner who believes hashing protects PII would make a wrong privacy design call, so medium is right.
- **L-0057 outdated / low: agree.** Gravatar's hash page (https://docs.gravatar.com/general/hash/) now says trim, lowercase, "hash the final string with SHA256" and has no MD5 mention. GitLab issue 370057 (https://gitlab.com/gitlab-org/gitlab/-/issues/370057) has a 2024-01-22 update: "Gravatar now supports SHA256". The image path is /avatar/HASH (https://docs.gravatar.com/sdk/images/). The determinism point the teacher was making stands, so low is right.

### Databases (indexes, transactions)
- **L-0081 imprecise / medium: agree.** PostgreSQL 18.6 docs on expression indexes (https://www.postgresql.org/docs/current/indexes-expressional.html) say a query on lower(col1) "can use an index if one has been defined on the result of the lower(col1) function", and that "the speed of the search is equivalent to any other simple index query". MySQL 8.4 supports functional key parts (https://dev.mysql.com/doc/refman/8.4/en/create-index.html). The teacher stated "cannot leverage indexes" as a general rule (00:41:32, and again at 01:19:15), which is a well-known interview point with a known exception. Medium is right. Small correction: the MySQL page states the same-expression requirement only through its SUBSTRING example, so I reworded A-GD-05.
- **L-0095 imprecise / medium: agree.** In the transcript (00:51:54-00:52:10) the student says "it becomes atomic in nature ... I don't see that we will fail in concurrent request", and the teacher replies "So concurrency taken care of" and moves on. PostgreSQL (https://www.postgresql.org/docs/current/transaction-iso.html) says Read Committed is the default and that UPDATE "will only find target rows that were committed as of the command start time", then re-evaluates WHERE on the newer row version. I re-derived the race independently. With the `AND is_active = true` refinement, T2 waits on the old active row, re-checks it, finds it now false and skips it. T2 never sees T1's new active row, because that row wasn't active in T2's snapshot. T2 then activates its own photo, and two photos end up active. Under InnoDB the outcome differs (locking reads see the latest committed version), so the race is engine-dependent. That supports "imprecise" over "wrong". Mixing up atomicity and isolation is a classic interview error, so medium is right.

### CDN
- **L-0139 imprecise / medium: agree.** In the transcript (01:18:26) the teacher says "Because S3 is not public" and then immediately gives the real reason: "Only my database knows which photo is active." CloudFront's docs (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) show that OAC signs requests to a private bucket, with a bucket policy limited to the distribution, and that viewers "can't use Amazon S3 URLs to access your files outside of CloudFront". A learner who thinks a CDN can't front a private bucket might make a bucket public just to put a CDN in front of it. That's a wrong design decision with security cost, so medium stands even though the correct reason follows in the same breath.

### Image libraries
- **L-0154 wrong / low: agree.** Pillow's about page (https://pillow.readthedocs.io/en/stable/about.html) says "The last PIL release was in 2009 (1.1.7)" and never mentions ImageMagick. Wand is the ImageMagick binding. Low is consistent with my L-0047 override.
- **L-0155 wrong / low: agree.** imagemagick.org says "It is written in C and can be used on a variety of operating systems". MagickCore is "a low-level interface between the C programming language and the ImageMagick image processing libraries". Magick++ "is the object-oriented C++ API to the ImageMagick image-processing library". The teacher's real point (callable from almost any language) holds. **URL note:** the checker's `https://imagemagick.org/script/magick-core.php` now only redirects to `/magick-core/`. I read the target page, https://imagemagick.org/magick-core/, and for Magick++ I used https://imagemagick.org/magick++/. Use those URLs on the page.
- **L-0047:** disputed above (severity only).

### Photo tagging
- **L-0203 outdated / low: agree.** Meta's newsroom post (https://about.fb.com/news/2021/11/update-on-use-of-face-recognition/, Nov 2, 2021) says "We're shutting down the Face Recognition system on Facebook" and "People will no longer be able to turn on face recognition for suggested tagging". The claim came from a hedged student ("I think"), and the design point (suggestions need ML services) is unaffected, so low is right.
- **L-0209 imprecise / medium: agree.** MongoDB (https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/) says an index on an array field automatically becomes multikey. One correction: it creates one entry "for each distinct value in the array", not one per element, and I reworded A-PTU-02 to match. PostgreSQL GIN `array_ops` supports &&, @>, <@ and = (https://www.postgresql.org/docs/current/gin.html). The PostgreSQL arrays tip (https://www.postgresql.org/docs/current/arrays.html) backs the teacher's conclusion: "Consider using a separate table with a row for each item that would be an array element." Saying "arrays are unindexable" in an interview is a wrong answer, so medium is right.

## Spot-check of 15 accurate verdicts (random, seed 12)

Sample: L-0010, L-0016, L-0099, L-0100, L-0150, L-0177, L-0180, L-0224, L-0235, L-0238, L-0242, L-0276, L-0288, L-0297, L-0306. **15/15 agree.**

- L-0010 (Kafka + SQS for high fan-out): agree. The checker's source (https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html, opened) shows the managed SNS→SQS fan-out form.
- L-0016 (browser is "dumb", with fixed behaviour): agree. This is classroom framing, and browser behaviour is fixed by specs such as WHATWG MIME Sniffing (opened for A-ID-03).
- L-0099 (transaction + ownership check + stored hash gives an efficient, correct system): agree in context. The concurrency caveat is already flagged on L-0095, so it doesn't need repeating here.
- L-0100 (code-review nitpicking analogy): agree. It's an observation, not a technical claim.
- L-0150 (on-demand optimization vs pre-generated variants): agree. This is a definition within the lecture.
- L-0177, L-0180, L-0297 (senior-engineer mindset, PM hat, pick your battles): agree. These are opinion and advice.
- L-0224, L-0235, L-0238, L-0242 (unread-indicator scenario, messages data model, student scalability remark, SELECT * returning one row per message): agree. Each is correct as a description of the class exchange. L-0242's row-per-message point follows from plain SQL semantics.
- L-0276 (unsent events in Kafka, sender added to recipient's set in Redis): agree. SADD semantics confirmed for A-PTU-12.
- L-0288 (minimise no-op DB operations, since the DB is the most brittle tier): agree. It's a design heuristic, and the generalisation is labelled as one.
- L-0306 (accept some badge inconsistency for throughput): agree that this is a sound trade-off as taught. The worst-case nuance (a persistent under-count) is already flagged on L-0305 as simplified/low, so it doesn't need repeating here.

## Additions: notable corrections

13 reworded, 0 rejected. Each correction is in `additions_verified.jsonl`.

- A-GD-16: the quote "no pre-generated variants needed" isn't verbatim on Cloudflare's page, so I dropped the quote marks.
- A-GD-17: the Cloudflare blog never mentions ImageMagick, so I softened "rather than built on ImageMagick".
- A-GD-12: Cloudflare's page doesn't state the DNS rule, so I added RFC 1034 §3.6.2.
- A-GD-08: by default ROW_COUNT() counts *changed* rows, so re-activating an already-active photo gives 0. The naive "0 → rollback" check would misfire, and the text now says so.
- A-PTU-07: "failing fast" isn't among the AWS article's alternatives. I replaced it with caller retries and continuously exercised paths.
- A-PTU-08: Android "may" auto-group notifications. The checker's wording said it always does.
- A-PTU-03: the Graph API page doesn't say "floats", so I removed the word.
- A-PTU-06: narrowed to what the Zanzibar abstract actually says.
- A-PTU-21: EXPLAIN wording aligned with the manual. The text now also warns that EXPLAIN ANALYZE on a data-changing statement changes data.
- A-GD-04, A-GD-05, A-PTU-02, A-ID-06: exact wording fixes (non-HOT updates, the SUBSTRING example, per distinct value, an unsourced S3 clause).

Five additions are marked optional:

- A-GD-15 duplicates A-ID-10.
- A-GD-10, A-GD-14, A-GD-17 and A-PTU-04 are useful but peripheral.

## Notes on cited URLs

- All checker-cited URLs opened. One partial exception: `https://imagemagick.org/script/magick-core.php` now only returns a redirect notice. I followed it to https://imagemagick.org/magick-core/.
- `https://imagemagick.org/Magick++/` (capital M, which I tried first) returns 404. The working page is https://imagemagick.org/magick++/.
- Pillow's `Image.resize` is documented on https://pillow.readthedocs.io/en/stable/reference/Image.html, not on the index page the checker cited for A-GD-15. I added the reference page as a source.
- Long pages that I read only in part, where the cited passage was in the part I read: KIP-932 wiki (first 100k characters), PNG spec, RFC 6455 and RFC 1034 (sections read by anchor).
- Kafka's downloads page lists 4.2.2 (Sep 29, 2026) after 4.3.1 (June 25, 2026). That's a patch release on the older line, not an inconsistency.
- Version-pinned pages: MySQL 8.4 manual. Pages that move with releases: PostgreSQL "current" (18.6 when checked), Django "stable" (6.1), Pillow "stable" (12.3.0) and Redis "latest".
