# Lecture 7 (lec09) story rewrite: final fact and faithfulness re-check (4b)

Scope: the final `site/src/content/lectures/lec09.mdx`, `lec09/{s0-header,c1…c9}.mdx`, the text of every figure they import (labels and descs, as rendered in `story/page_text.md`), and the alt text, captions and on-screen text of the four clips. `page_text.md` (16:39) is newer than every MDX, figure and clip file, so it was used as the rendered text. The regenerated `l09-signed-url-expiry` posters (desk and phone, paper) were opened and read.
Truth: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `story/NOTES.md` (Revision 2), the CloudFront custom-policy doc (opened 27 Oct 2026), and the live Lecture 8 page (`site/src/content/lectures/lec06.mdx`, `lec06/s0-header.mdx`, `c2`, `c4`, `c6`–`c8`). No page file was edited.

**Result:** all 11 earlier items are **fixed**. The fresh pass found **1 medium and 4 low** new issues, plus one note for the coordinator about Lecture 8's wording. Most come from Revision 2's new text: the hashtag read path and the §5.1 width signing.
- **N1 (medium):** the CDN caches the hashtag page's JSON, which now carries photo URLs signed for one viewer's width and permissions.
- **N2 (low):** in §5.1 the text and Fig 5·b use different photo names.
- **N3 (low):** the 20% split covers 20% of photos, not 20% of traffic.
- **N4 (low, optional):** a consumer can also just not commit when Kafka is down.
- **N5 (low):** the hand-off says "opens the first one, in three builds".

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| F-01 photo path (medium) | **Fixed** | §3.3: “Chapter 2 signed a random name in the root folder; change that to a folder per user. In the bucket `insta-images` the key is `<user_id>/<image_id>.png`, and that is the path the image service now signs its upload URL for. The CDN keeps the path, so the CDN URL is the same key under the CDN’s host.” Code: `return f"{host}/{s3_key(user_id, image_id)}"` and `return f"{user_id}/{image_id}.png"`. Fig 3·b: “s3://insta-images/ <user_id> / <image_id>.png”. Fig 3·d: `url = "https://instacdn.net/" + A + "/" + 12345 + ".png"`. §9.4: “photos live at `<user_id>/<image_id>.png`”. §2.3 and its clip keep `s3://images/<random_id>.png` as the first sketch, which F-01 allowed. Now consistent across §1.3, §3.1, §3.3, Fig 3·b, Fig 3·d and §9.4. See N2 for the photo name used in chapters 4 and 5. |
| F-02 Cloudflare JSON (medium) | **Fixed** | §8.2: “Cloudflare, for one, doesn’t cache JSON by default: it decides by file extension, so `/hashtag/sunset` needs a cache rule that makes it eligible … CloudFront honours this header on its own, within its TTL limits”. §9.4: “cacheable for a minute (`s-maxage`)”. |
| F-03 `w` and signing (low) | **Fixed** | §5.1: “with CloudFront’s simplest (canned) policy, a `?w=360` added afterwards makes the request fail. So the app sends its width when it asks for the posts, and the backend puts `w=360` into each URL before signing it. (On CloudFront the alternative is a custom policy whose resource ends in a wildcard, `…/1729.png*`, which lets the app append the width itself.)” After Fig 5·b: “the width must be part of the CDN’s cache key, or every size is served the same copy. On CloudFront that means a cache policy that includes `w`.” Checked against the custom-policy doc: “A trailing asterisk in the path section implies an asterisk in the query string section”, and your own parameters may come “in any order within the URL”, so appending after `Signature` is valid. Including only `w` in the cache key (not the signing parameters) is the right setting. Fig 5·b step 1 now says the URL is “signed by the backend, already carries `w=360`”. |
| F-04 one write (low) | **Fixed** | §5.2: “the post service saves it and puts one message on a Kafka topic, and is done.” §9.1 now names the transactional outbox for that pair. |
| F-05 S3 path exposed (low) | **Fixed** | Fig 2·d step 2: “The page renders the CDN URL, never the S3 one.” |
| F-06 bearer wording (low) | **Fixed** | §4.2: “chapter 2’s pre-signed URL let whoever held it write one path for a minute. This one lets whoever holds it read one photo for a few minutes.” |
| F-07 S3 Regions (low) | **Fixed** | §2.1: “a bucket lives in one AWS Region, while a CDN has edges in many cities”. |
| F-08 expiry is a choice (low) | **Fixed** | §2.4: “until the expiry the backend chose: here a minute, often just seconds.” §9.4: “with a short expiry you choose”. |
| F-09 ID comment (low) | **Fixed** | `id BIGINT PRIMARY KEY, -- a 64-bit, time-sortable ID (Lecture 6)` |
| F-10 Fig 9·c labels (low) | **Fixed** | Labels: “POST_HASHTAG, one partition”, “counting server”, “retention: 7 days”. Desc: “the counting server reads 3 to 5 and commits”. It now has five steps, and the latest/earliest reveal is left to the pause. |
| F-11 citation placement (low) | **Fixed** | §3.2: “Instagram served its photos from S3 through Amazon CloudFront [highscalability.com]. Then Facebook bought it, and the photos moved to Facebook’s own CDN: today their URLs are on `fbcdn.net`, as you will see in chapter 4.” |

---

## 2. Focus areas checked and found correct

- **Photo path:** one key everywhere (see F-01). `photo_url` builds from `s3_key`, so the CDN path and the S3 key can't drift apart again. The GitHub tie-in (“That is why GitHub’s upload key started with the uploader’s ID”) matches Fig 2·d (`…/4745789/221335625-….png`).
- **Per-image CDN split code:**
  - The code is valid Python 3.
  - `zlib.crc32` is stable across processes, unlike `hash()`, so the same photo always gets the same CDN. This is the right choice.
  - `s3_key` is defined after `photo_url`, which is fine at call time.
  - The lecture used a per-request random number (L-0143). The page now presents per-image hashing as its own design choice, with the cache reason given. That is reasoning, not a misquote. See N3 for the share wording.
- **Signing with `w`, the wildcard policy and the cache key:** correct (see F-03). The canned-policy claim matches fact-check A-CDM-12. The lecture's “the frontend appends `w=360`” (L-0191) survives as the public-photo case and the custom-policy alternative.
- **Cloudflare cache rule:** correct.
  - Cloudflare's default is by extension, and JSON is not cached by default.
  - A Cache Rule makes the response eligible. `s-maxage` then sets the edge TTL when the rule respects origin headers.
  - CloudFront honours `s-maxage` within the cache policy's min and max TTL.
  - The `http` block is valid.
- **Post IDs decision and the extra call:**
  - The table matches the board (L-0229–L-0233). “Two: the hashtag document, then the post service” is L-0231.
  - The two-sided framing is kept (“There is no single way…”, L-0226; the photos-only case, L-0234).
  - The lecture left the choice open. The page's “This design keeps the post IDs” is a decision with its reason given (“likes change all day … IDs never go stale”), and it doesn't misstate what was taught.
  - §8.1's “a third call, to a service you don't own” follows from it.
  - See N1 for how the extra call collides with the CDN cache.
- **Hot-row argument:**
  - §7.1 rests on L-0235: every post bumps the tag's count, so every #sunset post hits the same row. No write rate is invented.
  - §7.3 is two-sided, as fact-check L-0243 asked: per-server folding means k writes per batch, and repartitioning gives one writer per hashtag.
  - §9.3 is consistent: “Atomic increments keep the count right, but one-writer-per-hashtag is broken until the old messages drain.”
- **Kafka-down fallback queue and outbox:**
  - The producer defaults are right: `buffer.memory` is 32 MiB and `delivery.timeout.ms` is 120 s, which is two minutes (A-HSD-09).
  - The three options match L-0314. “Fallback queue” replaces the board's “dead letter queue”, per fact-check L-0314 and L-0358.
  - The outbox wording (“writes every outgoing message to a table in the same database transaction as the post itself and lets a relay publish it later”) is exactly fact-check L-0359 and A-HSD-11. It doesn't repeat the lecture's imprecise “write it to the DB after the Kafka write fails”.
  - Dropping the hashtag writes matches L-0319 (“sometimes it's okay to lose the data”).
  - Sending the post event to a fallback queue or outbox is reasoning from L-0314 and L-0181. NOTES records that the coordinator approved it. See N4.
- **Regenerated signed-URL clip:**
  - The “(most probably)” label is gone from the rendered clip. The timeline keeps an unused `probably` event and coordinates, which is harmless.
  - The posters (desk and phone) read “oe: expiry”, “bad url”, “signature” crossed out and “not expired” left unchecked after the edit. That is consistent with §4.2: the signature is checked, then the expiry.
  - The alt text and the six cues match §4.2–4.3. The hedge “most probably” now appears once, in the §4.2 prose.
  - Times: valid 5 min, works at minute 2, fails at minute 10 (L-0177).
- **Other Revision 2 text:**
  - §1.4 “the CDN bill is roughly what you save on servers” matches L-0044 (“almost an equivalent amount”), hedged as a rule of thumb.
  - §2.2's fleet-sizing sentence has no invented peak factor.
  - One size, “179 KB” (183,938 B ≈ 179.6 KiB), is consistent between the label, the desc and the stepper.
  - §5.1 “50 MB, ten times a phone's” matches §2.2's ~5 MB.
  - §6.4 is now framed as a stress test, and 10,000× is right.
  - §7.1 “a batch of 1,000 posts includes #A 10 times, #B 10 and #C 20 … three totals instead of forty single increments” is L-0238.
  - The Redis Pub/Sub Go deeper box matches Lecture 4 as checked in the first review.
  - §8.4 “Go back to Fig 6·a, where the page had nothing behind it” matches Fig 6·a.
  - The incoming `sec="s2-1"` from lec10 c4 targets §2.1 “Where do the photos live?”, which is on topic.

## 3. Hand-off to Lecture 8 (lec06, live)

The hand-off **matches**:
- **§9.5 heading.** “The CDN resized your photo. Who wrote that code?” is exactly what lec06's “Where you are” says Lecture 7 ended on (“when the CDN resized a photo, who wrote that code? This lecture writes it.”).
- **Gravatar.** “What the CDN fetches from its origin is a response from a handler you write yourself, served at every size” matches lec06 c1 (handler images), c4.2 (the CDN's origin is the API) and c4.4 (“The same face at 32 pixels and at 512”).
- **Photo tags.** “A one-line brief has to become the right questions before anyone draws a table” matches lec06's “one sentence from a CXO … before anyone draws a table”.
- **The badge.** “Counts people who have written to you, not messages” matches c6, where the badge counts distinct senders since the last tap.
- **The closing pattern.** “A pattern that … keeps the database underneath alive” matches c8.2–8.4: the auxiliary store protects the main store.
- **Lecture 8's callbacks into Lecture 7:**
  - the pre-signed upload;
  - `instacdn.net` as the CDN's own hostname;
  - “resizes them from a width in the URL”;
  - “the post stores only what can't be derived”;
  - “Lecture 7's rule bends”;
  - “the feature Lecture 7 simply switched on”.

  All match this page.

See N5 for one wording nit, and the coordinator note at the end.

---

## 4. Fresh pass: new issues

### N1 · INTERNAL CONTRADICTION · medium · §8.2: the CDN-cached hashtag JSON now holds per-viewer signed URLs
- **Where:** c8 §8.2, first paragraph (`c8-top-100-and-reads.mdx:53`), read together with the CDN paragraph after it, §5.1, §4.3/Fig 5·a, and Figs 8·b and 8·c.
- **Current text:** “Hashtag API servers answer `GET /hashtag/sunset` by reading the one document for `sunset`, fetching its 100 posts from the post service, and sending the page back.” Then: “Put the hashtag API behind a CDN, exactly as the photos are … `Cache-Control: public, s-maxage=60`”.
- **Problem:** Revision 2 put the post-service fetch inside the hashtag API's response. That response is then cached publicly at the CDN for a minute and served to every reader. But the page says, in two places, that the post service's output is per viewer:
  - **Width:** §5.1 says “the app sends its width when it asks for the posts, and the backend puts `w=360` into each URL before signing it”. A cached `/hashtag/sunset` would serve the first requester's width to every phone and tablet for that minute.
  - **Privacy:** Fig 5·a and §4.3 say the post service hands out signed URLs “only to people allowed to see the photo”. A shared cached response hands the same signed URLs to everyone.

  The figures also disagree with the text. Fig 8·b (“the API reads one document from the partitioned database”), Fig 8·c (“user → hashtag API → partitioned database or cache, a key-value lookup”) and §8.4 draw the read path without the post service.
  - The lecture's read path was the hashtag API reading one document and serving it, behind a CDN (L-0272, L-0274, L-0279). The post-detail fetch is a separate read (L-0231).
- **Sources:** L-0231, L-0272, L-0274, L-0275, L-0279; §4.3, §5.1, Fig 5·a.
- **Replacement (c8 §8.2, first paragraph):** “The read side is a plain GET. Hashtag API servers answer `GET /hashtag/sunset` by reading the one document for `sunset` and sending it back: the tag, the count and 100 post IDs. That is key-value access, a key in and a value out, so any partitioned store that does it well will do: MySQL, MongoDB, DynamoDB. The app then asks the post service for those 100 posts, as it does for a profile, and gets photo URLs signed for its own screen width and only for posts it may see.”
- **Replacement (c8, CDN paragraph, second sentence):** “To a CDN, a JSON response is bytes like any other, and this one is the same for every reader.”
- §6.3 (“rendering the page takes the document, then one more call, to the post service”), Figs 8·b and 8·c, §8.4 and the §9.4 bullet need no change once §8.2 says this.

### N2 · INTERNAL CONTRADICTION · low · §5.1: the text says `…/1729.png*`, Fig 5·b in the same section says `1729_4275.jpg?w=360`
- **Where:** c5 §5.1 parenthesis; Fig 5·b labels (`1729_4275.jpg?w=360`, `1729_4275.jpg`, `…/1729_4275.jpg?w=360`). The same name also appears in Fig 4·c and Fig 9·d.
- **Problem:** chapters 4 and 5 use the board's Instagram-style file name (L-0192: `instacdn.net/ul/1729_4275.jpg?w=360`; Fig 4·c presents it as “the shape of an Instagram photo URL”). Chapters 1–3 use the design's own key, `A/1729.png`. Across chapters this is defensible: Fig 4·c is about Instagram's real URLs. Inside §5.1, though, the wildcard example and the figure name two different files.
- **Replacement (c5):** “(On CloudFront the alternative is a custom policy whose resource ends in a wildcard, `…/1729_4275.jpg*`, which lets the app append the width itself.)”

### N3 · WORDING · low · The per-image split moves 20% of photos, not 20% of traffic
- **Where:** c3 §3.2 (“send 20% of the traffic to another CDN and compare”); c3 §3.3 code comment (`c3-the-url-column.mdx:87`): `# 20% of photos go to the other CDN; …`.
- **Problem:** hashing by image sends about a fifth of photos to the other CDN. The share of requests then depends on which photos are popular, so it is not a fixed 20% of traffic. The comment is accurate; the prose sets up a traffic share. Also, the code's variable `bucket` sits next to the comment “in the bucket insta-images”, which invites a misreading.
- **Replacement (c3 §3.3 sentence):** “The 20% experiment becomes a few lines (pick the CDN by image, so the same photo always goes to the same CDN and stays cached there; that is a fifth of the photos, and roughly a fifth of the traffic)”. In the code, rename `bucket` to `slot` (two places).

### N4 · OMISSION (reasoning) · low · optional · §9.1: an extractor needn't drop anything
- **Where:** c9 §9.1, “The extractors’ writes to POST_HASHTAG are where “drop it” is fine…”.
- **Problem:** dropping is a legitimate choice (L-0319), so this is not an error. But the extractor is also a consumer: §7.4 says POST_HASHTAG can live on the same cluster, and the post topic keeps its messages. An extractor whose write fails can simply not commit, and re-read those posts once Kafka is back, at no extra cost. The section is about choosing by cost, and this is the zero-cost option.
- **Replacement (append to that sentence):** “…and you don’t always have to add yet another component. (An extractor has an even cheaper way out: it doesn’t commit, and rereads those posts from the post topic once Kafka is back.)”

### N5 · WORDING · low · Hand-off: “Lecture 8 opens the first one, in three builds”
- **Where:** c9 §9.5, second paragraph.
- **Problem:** this reads as if all three builds open the CDN's black box. In lec06 only the Gravatar build does (c1 and c4). Photo tags and the badge are other problems.
- **Replacement:** “Lecture 8 opens the first one, and goes on to two more builds. First Gravatar: …” The rest is unchanged.

---

## 5. Note for the coordinator (out of scope, lec06)

- **`lec06/c4-million-faces.mdx:30`.** It reads “Gravatar reuses Lecture 7’s photo upload unchanged: the **upload service** picks a random photo id and hands the user a pre-signed URL”. In Lecture 7, “upload service” is the rejected row c of Fig 2·c: a service that carries every byte. The service that signs the URL is called the **image service** (§3.4, Fig 3·c). Suggested fix in lec06: “the image service picks a random photo id and hands the user a pre-signed URL”. Low severity, since lec06 is live. lec06's own key, `{user_id}/{photo_id}`, is its own bucket and needs no `.png`.
