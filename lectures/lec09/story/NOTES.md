# Lecture 7 (lec09) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and `lectures/STORY_WRITER.md`. Source: `site/src/content/lectures/lec09.mdx` + `lec09/{s0-header,c1…c9}.mdx`. Site review: `scratchpad/review/04-lec7-lec8.md` (Lecture 7 part).

## Chapters (words per built page: captions, code, tables, steps, hidden pause and recall answers and page chrome included; SVG desc/labels and collapsed clip-as-text excluded; same method gives lec03 13.7k, lec05 12.7k, lec08 12.3k)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook (14M users, 3 engineers, #sunset), two boxes (Fig 0·a), where you are (Lectures 2, 4, 6), the two builds, what you'll be able to do | 1,053 (incl. chapter list) | – |
| 1 | A photo in Singapore, a reader in the US. Who sends the bytes? | 1,370 | About 7 min |
| 2 | 5 million photos a day. How do they get in? | 1,621 | About 9 min |
| 3 | Should the posts table store the photo's URL? | 1,275 | About 8 min |
| 4 | This account is private. Who can open its photos? | 1,228 | About 7 min |
| 5 | The photo is up. Who else needs it, and at what size? (incl. hand-off to Build 2) | 1,169 | About 6 min |
| 6 | #sunset: a count and the top 100, in one request | 1,158 | About 7 min |
| 7 | Every #sunset post bumps the count. Can the database keep up? | 1,579 | About 9 min |
| 8 | Where does the top 100 come from, and how fast can the page be? | 1,322 | About 8 min |
| 9 | Kafka goes down, a counter crashes, a new team plugs in (incl. What you can now do, 4 recall questions, hand-off to Lecture 8) | 1,750 | About 10 min |

Total ≈ 13.5k (old page ≈ 36.7k mdx words, ≈ 29.8k prose). Script: scratchpad `lec09/wc.py` over `site.sh text` output.

**Spine.** Promise: two boxes, one level deeper, assumptions break (L-0002, L-0152). Build 1 (bytes): 10 MB from Singapore through the API servers → a CDN that pulls (pause on push vs pull) → property, DNS, host swap (stepper) → miss/hit (clip), bytes, Cache-Control, invalidation → open question: who writes the CDN URL → S3 (cheap, private, read only by the CDN) → upload ladder: chunks, async, crash (pause), bandwidth with arithmetic (5M/day ≈ 58/s ≈ 290 MB/s ≈ 2.3 Gbit/s each way) → dedicated upload service → pre-signed URL (clip), local signing, open bucket, stateless check like a JWT → GitHub demo (stepper), moderation → posts table, URL column, what-ifs (CloudFront → fbcdn, Bing price rise, 20% split, delete) (pause) → derive, don't store (SQL, Python) → image vs post service, profile load answers ch1's question → private-window test (pause) → signed URL anatomy (figure + clip) → API decides, pseudo privacy, cost of real privacy, middle ground, proprietary format → resize at the CDN (stepper) → Kafka post event → photos end to end → hand-off: bytes solved, now work; what carries over. Build 2 (work): the page and the boundary → design storage from the page, one document (pause on IDs) → IDs vs whole posts (table) → size (pause on the billion) → count++ vs batching → partition key (pause) → #sunset on three servers, hot row; Redis Pub/Sub vs Lecture 4 → adapter (clip) → one batch (stepper), atomic increment, recounts accepted → top 100: not a call, webhook vs their Kafka (pause), a process → CDN in front of JSON with s-maxage → whole service → read/write path method → bad days: Kafka down, retention and where to start (stepper + pause), partitions and key remapping → what you can do → Lecture 8.

## Figures and clips

- **Added** `site/src/figures/lec09/so-far.tsx`: `SoFarPhotos` (stages 0–5; 5 unused, kept as the complete map) and `SoFarHashtag` (stages 0–3), desk 640 + phone 330. Desk marks new pieces with a wash and "new"; phone with a wash and a legend line.
- **Kept and reused**: WithoutCdn, PropertyRequest, PrivateBucket, ThreePaths, GitHubUpload, PostsAndPath, ImageAndPostServices, ProfileLoad, IncognitoTest, SignedUrl, ResizeSteps, PostConsumers, PhotosEndToEnd, HashtagPage, TwoWays, FirstSketch, ThreeServers, OneBatch, HashtagService, TwoPaths, LossSketch, StreamSteps, OneCdnThreeJobs. All four clips.
- **Fixed**:
  - PropertyRequest, WithoutCdn and clip `l09-cdn-miss-hit`: hosts moved from the instructor's own site (`a.mycdn.net` → `arpitbhayani.me`, `/system-design/logo.png`) to Instagram's (`instacdn.net` → `instaimages.com`, `/A/1729.png`), per the review ("Instagram disappears in ch2"). Box widths adjusted; clip request label moved left. Posters regenerated (`site.sh posters lec09`) and checked.
  - WithoutCdn label "“a crime”, in the lecture’s word" → "“a crime”".
  - PostsAndPath: removed "* LinkedIn and CDNs also do this" (unverifiable, L-0134).
  - PostConsumers: removed the CDC arrow and labels ("cdc (board only)", "CDC · Lecture 5 / in depth · Lecture 9").
  - LossSketch: removed "(“dead letter queue” on the board)" and the matching desc.
  - ChTag map (`s3a-parts.tsx`), PhotosEndToEnd and OneCdnThreeJobs tags and desc renumbered to the new sections.
- **Dropped**: YearOne and WatchTheWave (stack history, fact-check conflicts with the board's Cassandra), LectureMarks (notation legend), UserCdnOrigin, InBetween, UrlRewrite (demo site), BrainstormList, SimpleSketch, CdnVsS3, DerivableRule, PrivacyRule, ReuseSketch, PageToDoc, Adapter (the clip shows it; HashtagService shows it whole), BatchSketch, OnePathSketch, TwoOrders, CanaryProfile, FourResources.
- **Files deleted**: `s1-instagram-year-one.tsx`, `s10b-running-the-pipeline-figs.tsx`; unused exports above removed from the surviving files. Old `s1…s11*.mdx` deleted; `s0-header.mdx` rewritten.

## Cut, and why

- Chapter 1's tech-stack waves (PHP/Facebook, Rust prediction, Go, ChatGPT, "vulnerable yet invincible"); only 14M users / 3 engineers survives, as the hook.
- The instructor's own site demo (`/static` origin), Giphy, live content, the agenda/brainstorm list, "play with a CDN before asking" admonitions (kept as one "try it" sentence).
- Akamai's 18 Indian locations, SSDs vs HDDs (one sentence on durability vs latency stays), BGP/anycast as a Go deeper box.
- DRM war story, piracy law, three complaints (a Go deeper box on DRM vs watermarking stays).
- Q&A tails: Kafka as a source of truth / first point of entry, profiling and canaries, CPU vs RAM, goroutines, leaderless replication, Spark and learning resources, in-memory queue vs Kafka, CQRS.
- Every "More precisely" box and provenance line; each correct fact is stated once (CloudFront not Cloudflare; ~1 KB per doc, billion = 1 TB; top 1M = 10,000×; 7-day retention; `latest` default; signature not certificate; egress facts; adding partitions remaps keys).

## Facts I chose to state (all from ledger or fact-check)

- Upload arithmetic is my derivation from L-0063 and L-0066 (5M/day, 5 MB): ≈58/s, ≈290 MB/s, ≈2.3 Gbit/s each way, "before any peak".
- Document size uses 64-bit post IDs (fact-check L-0343): ≈836 B ≈ 1 KB.
- "In one engineer's experience, roughly every two years" (L-0139), "By one engineer's estimate 50 to 100 times as many servers" (L-0176), "one rule of thumb" for CDN cost (L-0044) are hedged as experience.
- The CloudFront signed-URL + `?w=360` interaction (§5.1) is an inference from A-CDM-12 (a query parameter added after signing fails): flagged as a doubt.
- `Cache-Control: public, s-maxage=60` in §8.2 is an example value, said so in the text.

## Self-check

- `site.sh build lec09`: ok (13 pages). `links lec09`: zero broken. `figures lec09`: ok at 360/390/768/1440, light and dark (two long inline code spans fixed for 360).
- Banned-word grep (instructor|in class|the class|the board|as taught|lecture's view|More precisely|student) over built HTML (tags stripped, SVG desc/title included) and `page_text.md`: 0. Also 0 for arpit / mycdn / redrawn.
- Titles alone tell both builds; no title answers its own question. Pause answers are hidden; summaries reworded so ch3 and ch7 don't give away the URL column and the shared-topic reason.
- Opening picks up Lecture 6's hand-off (photo IDs → "the photo has to reach a phone"); lec03 c10 still mentions "what it ran in its first year" — this page keeps only one line of that (hook). Closing hands off to Lecture 8's three builds as now written in lec06.

## Incoming links

`grep lec="lec09"` outside lec09: none use `sec=`, so nothing to remap.
- `lec01/c1-copies.mdx:121` → Lecture 7 (no sec), unchanged.
- `lec06/s0-header.mdx` → Lecture 7 (no sec), unchanged.
- `lec06/s4-tagging.mdx` (old file; lec06 since rewritten) → Lecture 7 (no sec).
- `lec03/c10-instagram.mdx:172` → Lecture 7 (no sec), unchanged.

## For the coordinator: wording in lec06

lec06's overview says Lecture 7's CDN is "a CDN on its own subdomain", and §4.2 says "In Lecture 7 the CDN sat on a subdomain". This page uses a separate hostname, `instacdn.net` (from the ledger, L-0155/L-0157), not a subdomain. Suggested fixes in lec06:
- overview: "a CDN on its own hostname, `instacdn.net`, serves the photos and resizes them from a width in the URL"
- §4.2: "In Lecture 7 the CDN had a hostname of its own, `instacdn.net`; here the root domain itself is the CDN."

## Shared files

None edited.

## Unsure

- §5.1's sentence that on CloudFront the width must be in the URL before signing (inference from A-CDM-12).
- "Sachin Tendulkar uploads a 50 MB photo" is kept as the lecture's hypothetical (L-0187).
- The clip storyboard docs (`storyboard.md/yaml` for l09-cdn-miss-hit) still name the old hosts; not rendered.
- Total 13.5k by this count is at the top of the approved range (lec03 13.7k); prose alone is under 12k.

## Revision 2 (review_facts.md, review_reader.md)

### Word counts (same method)

| Page | Words |
|---|---|
| Overview | 1,057 |
| Ch1 | 1,310 |
| Ch2 | 1,501 |
| Ch3 | 1,339 |
| Ch4 | 1,096 |
| Ch5 | 1,194 |
| Ch6 | 1,136 |
| Ch7 | 1,527 |
| Ch8 | 1,092 |
| Ch9 | 1,706 |
| **Total** | **≈12.96k** (was 13.5k) |

### review_facts: every item applied

- **F-01 · one photo path.** The key is `<user_id>/<image_id>.png` everywhere.
  - §3.3 now says chapter 2's root-folder path changes, and the image service signs the per-user key. The CDN URL is the same key under the CDN host.
  - The Python `s3_key` returns `.png`, and `photo_url` builds its path from `s3_key`.
  - Fig 3·b labels and desc are updated. The phone layout was re-laid out so the longer key fits: the arrows are dropped and the label reads "built from user_id and image_id".
  - The §9.4 bullet is updated.
  - §2.3 keeps `s3://images/<random_id>.png` as the first sketch, as F-01 allows.
- **F-02 · caching JSON.** §8.2 now says Cloudflare decides by file extension, so `/hashtag/sunset` needs a cache rule. `s-maxage` then sets the lifetime, and CloudFront honours that header on its own. The §9.4 bullet now says "cacheable for a minute (`s-maxage`)".
- **F-03 · signed URLs and the width.** Done together with reader fix 6 (5a).
  - The main flow now has the app send its width with the posts request, and the backend signs URLs with `w=360` already in them. A custom policy with a trailing wildcard (`…/1729.png*`) is named as the alternative.
  - New sentence: `w` must be in the CDN's cache key (on CloudFront, a cache policy that includes `w`).
  - Stepper step 1, the ResizeSteps label ("w=360 in the URL") and its desc are updated.
- **F-04 · one write.** "saves it and puts one message on a Kafka topic".
- **F-05 · S3 path in GitHub's reply.** "The page renders the CDN URL, never the S3 one."
- **F-06 · bearer URLs.** "whoever held it / whoever holds it".
- **F-07 · S3 Regions.** "a bucket lives in one AWS Region". The India parenthetical is cut, per the reader.
- **F-08 · expiry is a choice.** "until the expiry the backend chose: here a minute, often just seconds". The §9.4 bullet says "a short expiry you choose".
- **F-09 · ID comment.** The SQL comment now reads "a 64-bit, time-sortable ID (Lecture 6)".
- **F-10 · Fig 9·c.** Relabelled "POST_HASHTAG, one partition" and "counting server"; retention is 7 days; desc updated.
- **F-11 · citation.** The highscalability cite is moved onto the CloudFront sentence. The fbcdn move is now backed by "as you will see in chapter 4".

### review_reader: what was applied

**Top-10 fixes**

1. **IDs vs whole posts.** §6.3 now decides on IDs: the page reads the document, then makes one call to the post service for the 100 posts, which also signs their URLs.
   - §6.2's line is now "One document holds all of the page's own data".
   - §8.1's argument is now "a third call, to a service you don't own".
   - §8.2's read now includes the post-service fetch.
   - Not on the page, so not taught: the ledger says only "an extra call" (L-0231). I wrote "one more call … for those 100 posts", not "batched".
2. **A rate for Build 2.** The ledger has no hashtag write rate (checked: no number beyond 5M uploads/day and "millions of hashtags"). So §7.1 now leads with the hot row: every sunset photo anywhere wants the same row. §5.3 adds "one number is wanted by every sunset photo in the world". No number was invented.
3. **Kafka down.** "Drop" now applies only to the extractors' writes to POST_HASHTAG. The post event, which search, feed and notifications also read, gets a fallback queue or the transactional outbox. Not from the lecture: it is reasoning from L-0314 and L-0181, approved by the coordinator.
4. **One photo path, and a per-image CDN split.** The path is F-01. The 20% split is now per image: `zlib.crc32(key) % 100 < 20`, so the same photo always gets the same CDN. The lecture said "a random number" (L-0143). The text still says you pick a share of traffic. Deterministic per image is the reader's (and coordinator's) cache argument.
5. **Captions that gave away the clips.** Neutral captions on Clips 1·1, 4·1 and 7·1.
   - Clip 2·1 now sits right under the 2.3 heading, before the text names pre-signed URLs. Its lead names "your API servers, or the upload service in row c".
   - The Fig 9·c stepper ends at step 5. Its step 6 is gone from the figure too, and the latest/earliest reveal now happens only in the pause.
   - Header bullets and the ch1 blurb reworded (H4).
6. **Resizing with signed URLs.** See F-03. The optional move of 5.1 into chapter 4 (5d) was **not done**: chapter 5 would drop to about 600 words, below the 900-word floor.
7. **Fig 6·a and the hand-off.** §8.4 now says "Go back to Fig 6·a, where the page had nothing behind it", instead of "two boxes", which the figure never drew. §5.3 ties the switch to the caption that chapter 3 stored as text.
8. **Retellings cut:**
   - the two-phase paragraph after Clip 2·1 (now one sentence);
   - the extractor retelling after Clip 7·1 (one sentence);
   - "Follow a post through it" (§8.3);
   - the field and ACL paragraph after the GitHub stepper (one sentence);
   - "most probably" now appears once, in the §4.2 prose. The Fig 4·c label is now "expiry", and the clip's "(most probably)" label and its alt are removed;
   - the black box explained once (§6.1);
   - the JSON default removed from chapter 1.
9. **§8.4** is now the method plus one example, about 150 words. The cache-or-CDN contradiction is fixed: the figure labels now read "or a cache" / "or the CDN", and §8.2 notes the alternative.
10. **Small fixes:**
    - 2a: the fleet-sizing sentence; no peak factor exists in the sources.
    - 1b: "the CDN bill is roughly what you save on servers" (L-0044 "almost an equivalent amount").
    - 7b: "a batch of 1,000 posts includes #A 10 times…".
    - 2g: one size, 179 KB, in the figure label and desc. The ledger's 173 KB is the PNG bytes as shown on screen; using one number avoids a puzzle.
    - 1a: "middle box"; the overview now says "two boxes behind the app".
    - H2: the "won't need much scale" sentence is deleted.
    - 6b: the top-million case is framed as a stress test.
    - 4d: "a platform that must check every single read … can't hand that check to a CDN".
    - 5b: "an unusually large photo, 50 MB, ten times a phone's". The reader's "pro camera" reason is not in the ledger and was not used.
    - 8a: the pause now offers both options.

**Per-chapter items**

- **Overview and ch1:** the dek and the opening now start on the felt problem (Singapore/US photo, #sunset). The 14M/3-engineers line now does work ("can't need an army to run"). The Fig 1·a label "“a crime”" becomes "wasted on a static file". 1e's spoiler is removed.
- **Ch3:**
  - 3d: "move to another cloud" replaces "point straight at S3".
  - 3e: the repeated rule is cut.
  - 3f: the classroom echo is reworded.
  - 3g: Bing is now one clause.
- **Ch4:**
  - 4c: the Fig 4·b bubble now says "private hides the list, not the photos".
  - 4e: the "question in your pocket" is cut.
  - 4f: the secret format is now one parenthesis; the DRM Go deeper is cut.
- **Ch5:**
  - 5c: the vendor list is shortened.
  - 5e: the "boxes" paragraph is cut.
- **Ch7:**
  - 7d: the clip retelling is cut.
  - 7e: Redis Pub/Sub moved into a Go deeper box (about 85 words).
- **Ch9:**
  - 9b: the stepper is retitled.
  - 9e: the thousand-partitions aside is cut.
  - 9f: the bullets are merged from 8 to 6.
  - The SLA sentence is cut, from the cuts list.

### Rejected or adapted

- **5d, moving resizing into chapter 4:** rejected, for the chapter-length floor. 5a is fixed in place instead.
- **2a peak factor and 7a write rate:** none in the ledger or transcript, so none was added.
- **5b "pro camera":** not in the source.
- **6a "batched call":** worded as "one more call", per L-0231.
- **Total length:** 12.96k, not 12k. The fixes added about 500 words (signing and cache key, the Kafka-down split, the IDs decision, the path change). Every item on the reader's cut list was applied.

### Clips

- `l09-signed-url-expiry`: the "(most probably)" label is removed and the alt text reworded.
- Posters regenerated (`site.sh posters lec09`) and checked.

### Checks

- build: ok, 13 pages.
- links: zero broken.
- figures: ok at 360/390/768/1440, light and dark.
- Banned-word grep: 0 in the built HTML (SVG text included) and in `page_text.md`.
- `page_text.md` regenerated.

### Incoming links

Unchanged. No other lecture uses `sec=` into lec09. The links without `sec=` are in lec01 c1:121, lec03 c10:172, and lec06 (overview and the c4 callback).

Correction to the incoming-link map. One link into lec09 does use `sec=`:
- `site/src/content/lectures/lec10/c4-many-servers.mdx:60`: `sec="s2-1"`. Its topic is S3 as object storage.
- §2.1 of this page is "Where do the photos live?", which puts the photos in S3. The target exists and matches the topic, so no remap is needed.

The other links into lec09 have no `sec=`:
- lec01 c1:121
- lec03 c10:172
- lec06 s0-header:26, c2:51 and c4:30
- lec10 s0-header:26 and c10:132

## Revision 3 (review_facts_final.md, exam_grade.md)

- **N1 (medium), applied with the review's text.** §8.2 changed in two places:
  - The hashtag API now returns only the document: tag, count and 100 post IDs. The app then asks the post service for those posts, with URLs signed for its own width and permissions.
  - The CDN paragraph adds "and this one is the same for every reader".
  - Figs 8·b and 8·c already show the hashtag API reading one document with no post-service call, so they now agree without any edit. §6.3's "one more call, to the post service" stays as it is: that call is the app's.
- **N2:** the §5.1 wildcard example is now `…/1729_4275.jpg*`, matching Fig 5·b.
- **N3:** the §3.3 sentence adds "that is a fifth of the photos, and roughly a fifth of the traffic". The code variable `bucket` is renamed `slot`.
- **N4 (optional):** applied. The extractor can skip the commit and reread the post topic once Kafka is back.
- **N5:** "opens the first one, and goes on to two more builds."
- **Q117 CUT-LOSS (L-0286):** the §8.4 read-path sentence now walks the escalation: partition and add replicas, then a cache, then the CDN of 8.2.
- **Q115 (L-0283), optional:** added as "The same walk asks whether the database is provisioned for the write path's pace."
- **Clips:** no clip text changed, so no posters were regenerated.
- **Checks:**
  - build: ok, 13 pages.
  - links: zero broken.
  - figures: ok at 360/390/768/1440, light and dark.
  - banned-word grep: 0 in the built HTML and in `page_text.md`.
  - `page_text.md` regenerated. Total ≈13.1k by the same count.
- **For the coordinator (out of scope):** `lec06/c4-million-faces.mdx:30` says "the upload service picks a random photo id". Lecture 7 calls that the **image service**.
