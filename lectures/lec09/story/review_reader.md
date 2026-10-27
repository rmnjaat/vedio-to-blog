# Lecture 7 (lec09): fresh-reader review

Reviewer stance: a working engineer who never saw the class. I read `lectures/lec09/story/page_text.md` in order (overview, then chapters 1 to 9) and opened the source MDX only to confirm the text of a figure or code sample. I did not open the ledger, transcript or fact-check. For the course links I read only the closing lines of Lecture 6 (`lec03/c10`) and the opening of Lecture 8 (`lec06/s0-header`).

## Overall verdict

Build 1, the photos (chapters 1–4), is the strongest stretch of any lecture in this series so far. Each chapter ends on the exact question the next one opens with: who sends the bytes, then how they get in, then what the row stores, then who may open it. The numbers work as plot (58 uploads a second, 290 MB/s, 2.3 Gbit/s each way), and the two "open your browser" moments (the GitHub upload and the incognito test) are memorable. Chapter 5 is the weak join. It is half leftovers (resizing) and half hand-off (Kafka fan-out). The resizing half also contradicts chapter 4's signed URLs.

Build 2, the hashtag page (chapters 6–9), reads clearly but has no workload numbers, so the count problem is asserted rather than shown. Its central design has one unresolved contradiction: the page is "one document, one read", yet the chosen top_100 holds post IDs that need a second call. Chapter 7's adapter (re-keying through POST_HASHTAG) is well built: a wrong instinct, two concrete reasons it fails, a clip, then the fix. Chapter 8.4 and chapter 9 drift into retrospective and a list of Kafka facts. They have less story and more repetition, and that is where most of the length can come from.

**The hand-off between builds (5.2–5.3, 6 opening) is real and mostly works.** It says why we switch: the bytes are now small and the work is big. It names the question that changes, from "where do the bytes go?" to "how much work happens here, and how often?". It names what carries over: the post event already on Kafka, keyed by user_id; the caption holding the hashtags, planted in 3.1; and the store-the-crux habit. Three things weaken it.
(1) Build 2 gets no number to match Build 1's "5 million uploads a day". "Millions of hashtags" is a size, not a rate, so the reader can't feel the count++ flood that chapter 7 depends on.
(2) Chapter 8.4 says "Go back to the two boxes this build started with: a hashtag service and a database", but Fig 6·a never draws those two boxes. The callback lands on nothing.
(3) The reason to build the hashtag page at all is only "Now tap a hashtag". One sentence tying it to the planted caption detail ("the caption you stored as plain text in chapter 3 is now a feature with millions of pages") would make the switch feel caused rather than scheduled.

**Course connection.** In from Lecture 6: fine. "Where you are" picks up the 64-bit ID, and Lecture 6's last line promises exactly this product. Out to Lecture 8: 9.5 ends on "who wrote that code?", which Lecture 8's header quotes back. Because Lecture 8 is still under revision, the 9.5 paragraph listing its three builds (Gravatar, tagging, the unread badge) must be re-checked against Lecture 8 once it settles.

**Length.** About 13.5k words of prose. The best ~1.6k of cuts are listed after the top 10.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 3 | 3 | 4 |
| 1 · A photo in Singapore, a reader in the US | 4 | 4 | 4 |
| 2 · 5 million photos a day. How do they get in? | 4 | 3 | 5 |
| 3 · Should the posts table store the photo's URL? | 5 | 3 | 4 |
| 4 · This account is private. Who can open its photos? | 4 | 4 | 5 |
| 5 · The photo is up. Who else needs it, and at what size? | 3 | 3 | 3 |
| 6 · #sunset: a count and the top 100, in one request | 4 | 3 | 3 |
| 7 · Every #sunset post bumps the count | 4 | 3 | 4 |
| 8 · Where does the top 100 come from, and how fast? | 3 | 4 | 3 |
| 9 · Kafka goes down, a counter crashes, a new team plugs in | 3 | 4 | 3 |

---

## Header / overview

**H1. The blurb and the opening paragraph say the same thing twice.** The description reads "Drawn on a whiteboard, Instagram is two boxes… nearly every assumption those boxes made breaks." Two paragraphs later: "Draw that on a whiteboard and you get two boxes… nearly every assumption those two boxes made gets broken."
Fix: keep the image once, in the body. Make the description concrete instead: "A 10 MB photo in Singapore, a reader in the US, and a #sunset page whose count every new post changes."

**H2. "You won't even need much scale for this lecture" contradicts the page.** The same screen promises 5 million uploads a day and millions of hashtags.
Fix: delete the sentence. "It looks like a simple problem, and it is one. Yet go one level deeper…" reads fine without it.

**H3. The first screen has no felt problem.** "14 million users, three engineers" is a fact that is never used again. The concrete problems (the Singapore/US photo, the #sunset count) first appear in "What you'll build", below the figure.
Fix: open on the photo itself. "Your servers are in Singapore. Someone in the US opens a 10 MB photo. Then they tap #sunset and expect '1.2m photos' and the top 100 instantly." Keep the 14 million line only if it does work (for example, "three engineers can't run a fleet that copies every byte").

**H4. Spoilers in the promises.** In "What you'll be able to do": "get uploads into storage without your servers touching the bytes" answers 2.2–2.3, and "re-keying a stream other teams depend on" answers the 7.2 pause. The c1 blurb "Why your API servers shouldn't send it" answers 1.1's heading question.
Fix: "Get photos in and out at Instagram's volume without your API servers paying for it." / "Keep a count that millions of posts a day change, on a stream other teams already depend on." c1 blurb: "A 10 MB photo in Singapore, a reader in the US. Who should send the bytes, and how does the thing in between work, from the first view to the thousandth?"

**H5. "Where you are" is good.** It names exactly what comes back (the CDN, Kafka partitions and consumer groups, Pub/Sub, the 64-bit ID). No change.

---

## Chapter 1 · A photo in Singapore, a reader in the US. Who sends the bytes?

Flow 4 · Clarity 4 · Engagement 4

**1a. "The second box" is the wrong box.** "Start with the second box in the picture, the API servers". The overview called the two boxes "an app server and a database". Fig 0·a then draws three: app, API servers, db.
Fix: "Start with the middle box in the picture, the API servers…". Make the overview say "two boxes behind the app: API servers and a database."

**1b. A sentence that doesn't parse.** "You pay the CDN instead; by one rule of thumb, roughly what you save, and what you buy is speed."
Fix: "You pay the CDN instead. By one rule of thumb the CDN bill is roughly what you save on servers, so the real gain is speed." (check source)

**1c. A figure label quotes someone.** Fig 1·a has the label `"a crime"` in quotation marks. Whose words are they? It reads as a quote from the class.
Fix: drop the quotes, or change the label to "wasted on a static file".

**1d. Cache-Control comes too early, and is said twice.** The paragraph on Cache-Control, s-maxage and "Cloudflare doesn't cache JSON or HTML by default" has nothing to do here: photos are cacheable. It is repeated in 8.2, where it is the plot.
Fix: cut it to "The origin's Cache-Control header, or your cache rules, decide how long a copy lives; photos, which never change, can live a long time." Keep the JSON default only in 8.2.

**1e. A small spoiler.** "most CDNs can also be given access to a private one, which chapter 2 will want." It gives away 2.1.
Fix: end at "The simplest origin is public."

**1f. Good.** The 1.4 clip with its "a thousand views, a few origin requests" arithmetic, and the open question about how the app gets CDN URLs, which chapter 3.4 answers. No change.

---

## Chapter 2 · 5 million photos a day. How do they get in?

Flow 4 · Clarity 3 · Engagement 5

**2a. The bandwidth number may not convince a reader who does the next division.** "roughly 2.3 Gbit/s each way before any peak… on the network cards that are supposed to answer 'load my feed'". Spread over a fleet of, say, 50 API servers, that is under 50 Mbit/s each. An engineer can conclude the network card is not the problem.
Fix: say what the number does to the fleet. Either "you'd be sizing the API fleet for photo bytes instead of API calls" or a peak factor, if the source has one. (check source)

**2b. The clip's question comes after its answer.** The heading and the first paragraph of 2.3 have already said "That is a pre-signed URL… then sent the photo straight to S3". Only then comes "How many times do those bytes cross a network your servers sit on, before and after pre-signed URLs?"
Fix: put the question and the clip directly under the heading, before the paragraph that names pre-signed URLs.

**2c. The clip compares against the wrong baseline.** 2.2 ends on the dedicated upload service (row c). The 2.3 question even says "Your upload service handles 5 MB photos". But Clip 2·1 compares against "the API server".
Fix: make the question say "your API servers (or the upload service)". Or note in the clip text that the upload service behaves the same way.

**2d. The text retells the clip.** After Clip 2·1, "It takes two phases. In the prepare phase… In the upload phase…" repeats the clip's steps.
Fix: cut it to one sentence: "The service makes a random image ID and signs a URL for exactly that one path; the app then sends the photo there." Keep the "signed locally, no call to S3" paragraph, which is new.

**2e. The object path changes between chapters.** 2.3 signs `s3://images/<random_id>.png`, a random ID in the root of a bucket called `images`. 3.3 then says "not every photo in the root folder, but a folder per user: in the bucket insta-images, the key <user_id>/<image_id>", with no extension.
Fix: use `s3://insta-images/<user_id>/<image_id>.png` from 2.3 onward. Or have 3.3 say explicitly "change chapter 2's path to…". See 3b.

**2f. Off-road detail.** "(two in India, Mumbai and Hyderabad)": the story is in Singapore and the US. The transfer-billing paragraph at the end of 2.3 ("AWS doesn't charge for data coming in…") is also off-road.
Fix: cut the parenthetical. Cut the billing detail to "The saving is in servers and bandwidth, not the transfer bill."

**2g. Three sizes for one file.** "size 183938 bytes", "179 KB" and "≈173 KB" all describe the same GitHub attachment.
Fix: if 173 KB is the request body without the form fields, say so. Otherwise use one number everywhere. (check source)

**2h. The text after the GitHub stepper repeats step 2.** "key is the path the URL was signed for, policy carries the expiry…, X-Amz-Signature signs it… acl: public-read… new S3 buckets switch such ACLs off" restates step 2 and adds ACL history.
Fix: keep two sentences. "What makes it pre-signed is the signed fields in the POST body, not the URL." and "The key starts with 4745789, the uploader's user ID: GitHub files uploads per user. Chapter 3 will want that."

**2i. Good.** The pause answer "Bandwidth", the "why not open the bucket" section and the moderation consequence. No change.

---

## Chapter 3 · Should the posts table store the photo's URL?

Flow 5 · Clarity 3 · Engagement 4

**3a. The best chapter for flow.** The URL column, then living with it (a CDN switch, a price rise, a 20% split, a delete), then the pause, then the rule. The open question from 1.4 is answered in 3.4, and the private-account hook at the end is excellent.

**3b. The CDN path and the S3 key don't match.** Chapter 1 taught that the CDN "swaps the host and keeps the path". The code builds the CDN URL `/{user_id}/{image_id}.png`, but `s3_key` returns `{user_id}/{image_id}` with no `.png`. By chapter 1's rule the CDN would fetch a key that doesn't exist.
Fix: make the key `{user_id}/{image_id}.png`, here and in Fig 3·b, or drop `.png` from the URL. Do this together with 2e.

**3c. A per-request random split defeats the cache.** `host = othercdn if random.random() < 0.2 else instacdn`. The same photo flips between CDNs on every request, so both caches miss more often, and an engineer will notice.
Fix: split deterministically, for example `if hash(image_id) % 100 < 20`, and comment "same photo, same CDN". (check source)

**3d. "Point straight at S3" contradicts the private bucket.** "switch the CDN whenever you like, point straight at S3, or run two CDNs at once". 2.1 made the bucket readable only by the CDN, and two paragraphs later the page says "the bucket is private".
Fix: "switch the CDN whenever you like, move to another cloud, or run two CDNs at once."

**3e. The pause answer is repeated at once.** The pause answer says "store those, and nothing that can be derived". The next paragraph opens "If something can be derived, don't store it."
Fix: open 3.3 with what's new: "That one rule makes every scenario above easy…"

**3f. A faint classroom echo.** "Most people write down…" and "Nearly everyone designs the table with this column."
Fix: "You probably wrote down…" and "It is the natural design, and it works."

**3g. Off-road.** The Bing API price rise is a good fact, but the CloudFront to fbcdn move already makes the point.
Fix: cut the Bing sentence, or keep it as the "price rise" clause in one line.

---

## Chapter 4 · This account is private. Who can open its photos?

Flow 4 · Clarity 4 · Engagement 5

**4a. The clip caption spoils the clip's question.** "A follower forwards a photo URL with a five-minute expiry… What happens each time?" The visible caption directly under it answers: "a forwarded URL works until it expires, and changing the expiry breaks the signature."
Fix: caption "Clip 4·1: One signed URL, forwarded, at minute 2 and minute 10." The same pattern occurs in Clips 1·1 and 7·1 (see top 10, item 5).

**4b. "Most probably" appears three times.** It is in Fig 4·c, in the 4.2 prose and in the clip text.
Fix: hedge once, in 4.2 ("Facebook doesn't document them; oe is most probably the expiry"). Elsewhere just say "the expiry, oe".

**4c. A first-person figure label.** Fig 4·b reads "I hide the list, not the photos". Who is "I"?
Fix: "Private hides the list, not the photos."

**4d. An absolute claim the next paragraph undercuts.** "A truly private platform can't serve through a CDN at all." Then: "There is middle ground: shorter expiries, IP-limited signed URLs, signed cookies".
Fix: "A platform that must check every single read against who-follows-whom can't hand that check to a CDN, because only your servers know."

**4e. A dangling thread.** "Keep one question in your pocket: if a client truly needed private photos, how would you build that platform? This design doesn't answer it, on purpose." Nothing in this lecture, or in Lecture 8's announced builds, picks it up.
Fix: cut it, or point to where it is answered.

**4f. Off-road.** The secret-format paragraph and the DRM / watermarking Go-deeper box (about 150 words) don't move the story.
Fix: cut both, or keep only "a secret format ships its decoder in the APK, so it isn't secret" as one sentence.

---

## Chapter 5 · The photo is up. Who else needs it, and at what size?

Flow 3 · Clarity 3 · Engagement 3

**5a. The main flow does something the next paragraph says fails.** "So it takes the URL the backend gave it, appends ?w=360, and puts that in the image view" (stepper step 1 too). Later: "a signed URL covers its query string, so on CloudFront a parameter added after signing makes the request fail. There the width has to be in the URL before the backend signs it." Since chapter 4, every photo URL is signed.
Fix: make the main flow the working one. "The app tells the backend its width; the backend puts w=360 in the URL before signing it." Or: "on CDNs that sign only the path, the app can append it."

**5b. The photo sizes contradict.** Chapter 1 said "1, 2, 5, sometimes 10 MB", and 2.2 said "an HD phone photo is about 5 MB". Then "Sachin Tendulkar uploads a 50 MB photo".
Fix: "Say a cricketer posts photos straight off a pro camera, 50 MB each, far above a phone's 5 MB…". The celebrity name is fine, but it needs the reason the file is so large.

**5c. The vendor list is off-road.** "Cloudflare, Fastly and Akamai all sell one, while Amazon CloudFront has none built in, and AWS instead offers a resizing solution you deploy…"
Fix: "Most CDNs sell this as a separately billed feature; check yours." Keep the signing detail (moved into the main flow by 5a).

**5d. The chapter has two halves that don't touch.** Resizing (5.1) and fan-out (5.2) share only the title's "and". Resizing is really a fourth CDN job and sits naturally after chapter 4's URL parameters. Fan-out is the bridge to Build 2.
Fix (structural, optional): move 5.1 to the end of chapter 4 as "The URL can carry more than a signature: ?w=360". That also fixes 5a in place. Then chapter 5 becomes the hand-off chapter: fan-out, end to end, tap a hashtag.

**5e. The end-to-end figure is retold.** "You could have drawn this as a box labelled 'image upload service' in ten seconds… That is the work." It restates the figure's own label ("boxes are the easy part; the details at each step are the work").
Fix: keep the label and the one-paragraph recap, and cut this paragraph.

**5f. Good.** The hand-off paragraphs ("It is a different kind of problem… That is the second build") are among the best writing on the page. See the verdict for what to add: one rate, and a line tying it to the caption detail planted in 3.1.

---

## Chapter 6 · #sunset: a count and the top 100, in one request

Flow 4 · Clarity 3 · Engagement 3

**6a. "One read" vs post IDs.** This is the biggest internal contradiction on the page. 6.2 ends "One document, one read, the whole page." 6.3's own table then says post IDs need "Two: the hashtag document, then the post service". 6.3 ends "Which wins depends on the page you promise" without deciding, yet Fig 7·a and everything after it use `top_100: [post IDs]`. 8.1 then argues against calling data science because "the point of the hashtag document was to render the page in one shot… do the bare minimum of network calls". The reader is left asking where the 100 photos' URLs come from.
Fix: decide in 6.3. "This design keeps IDs: the page reads the document, then fetches the 100 posts from the post service in one batched call, which also builds their signed URLs. Two reads, both yours." Change 6.2's line to "One document holds the whole page's data." Change 8.1's argument to "a third call, to a service you don't own, on every open". (check source for whether a batched post read was taught.)

**6b. "Don't add requirements halfway", then add one.** The end of 6.3 says "Don't add requirements halfway through a design". 6.4 then says "Scale the requirement instead… top 1 million photos per hashtag".
Fix: introduce 6.4's scale-up as a stress test, not a new requirement: "To check the design isn't fragile, imagine the top 100 became a top million." Or cut the top-million paragraph (about 60 words).

**6c. The black box is explained twice.** First "That is their headache. For this design it is a black box." Then "Respect that boundary… you declared it a black box, so you don't assume how it works."
Fix: merge into one paragraph and cut the second.

**6d. Build 2 has no "two boxes" start.** 8.4 says "Go back to the two boxes this build started with: a hashtag service and a database", but Fig 6·a draws a post service, Kafka, a user and a page.
Fix: draw "hashtag svc → db" in Fig 6·a as the naive start, or change 8.4 to "Go back to Fig 6·a".

**6e. Good.** "Start from the page", the post-ID pause, and the 836 bytes, 1 KB, 1 TB arithmetic with its pause.

---

## Chapter 7 · Every #sunset post bumps the count. Can the database keep up?

Flow 4 · Clarity 3 · Engagement 4

**7a. The flood is asserted, never computed, and at the page's own scale it may not exist.** "Across every post on Instagram, that is a flood of tiny writes… the database either chokes". The only rate on the page is Build 1's 5 million posts a day. At 8 hashtags each, that is about 460 increments a second, which one MySQL handles. The real problem shows up in 7.3: a popular tag is a hot row with many writers.
Fix: give one rate for the count writes (check source). Lead with the hot row: "#sunset alone gets thousands of posts a minute, and every one wants the same row." Add the number to the 5.3 hand-off too.

**7b. The batch example's numbers don't add up.** "After a batch of, say, 1,000 posts it might hold #A: 10, #B: 10, #C: 20… instead of forty single increments". 1,000 posts produce only 40 hashtag increments?
Fix: "a batch of 40 posts" (and update Fig 7·b's label), or "1,000 posts, and among them #A 10 times, #B 10, #C 20, so three writes instead of forty for these tags".

**7c. The clip caption spoils the 7.3–7.4 question.** 7.3 ends "How would you get each of its hashtags to the server that counts it?" 7.4 asks "How many messages does it become…?" The visible caption answers both: "An extractor re-publishes one event per hashtag on a topic keyed by hashtag."
Fix: caption "Clip 7·1: Post 31, #sunset #sun #nature, on a topic keyed by user."

**7d. The text after the clip retells it.** "Read the post topic, and write a new one. A set of hashtag extractors… A post with n hashtags becomes n messages… count += n." This is the clip again.
Fix: keep the new facts (same cluster, separate name, three partitions carry millions of tags) and the "adapter" naming. Cut the retelling to one sentence.

**7e. Redis Pub/Sub arrives unasked.** "What about Redis Pub/Sub, a channel per hashtag?" Nothing in the flow proposed it, and it breaks the momentum between "one writer per hashtag" and "how would you get each hashtag there?"
Fix: cut it (about 110 words), or make it a three-line Go-deeper box.

**7f. Good.** The 7.2 pause (two reasons plus the two-writes trap), the "k writes per batch" nuance, the 7.5 stepper with the crash, and "a count that is a little off" as a decision.

---

## Chapter 8 · Where does the top 100 come from, and how fast can the page be?

Flow 3 · Clarity 4 · Engagement 3

**8a. The pause answers a question it didn't ask.** "How should it reach your hashtag document?" The answer opens "With a webhook, the data science team has to build and run the calls…", as if the reader had proposed a webhook.
Fix: "Data science can call your API with a webhook, or write each new top 100 to a Kafka topic. Which one, and why?"

**8b. The cache advice contradicts itself.** 8.2 says "A cache in front of the database would work too; pick one. With a CDN you don't need the cache." 8.4 says "Add a cache… and if that isn't enough, a CDN in front", and Figs 8·b and 8·c both show "cache (optional)" alongside the CDN.
Fix: in 8.4, "a cache or a CDN in front of it (8.2 chose the CDN)". In the figures, label the cache "or a cache".

**8c. The text after Fig 8·b retells the figure.** "Follow a post through it…" restates Fig 8·b's description step by step.
Fix: cut it and go straight to "Count the times Kafka appears", which is the new insight.

**8d. 8.4 is mostly repetition.** The read-path paragraph repeats 8.2 (cache, CDN, the API reads one document). The write-path paragraph repeats 7.2 (one call to Kafka, else distributed transactions) and 9.3 (partitions cap parallelism, said again in 9.4's bullets). "Almost every senior engineer works the same way" is a slogan.
Fix: keep 8.4 as about 120 words. Name the method (find the write paths and read paths, and at each hop ask "what if this gets a huge load, and is this the bare minimum?"). Then give one example of it finding something: "eight writes for eight hashtags: not the bare minimum, which led to batching, which led to re-keying." Keep Fig 8·c.

---

## Chapter 9 · Kafka goes down, a counter crashes, a new team plugs in

Flow 3 · Clarity 4 · Engagement 3

**9a. A logic gap: the post event isn't only the hashtag count's.** "Pick per system. For #sunset's count, losing a minute of posts is nothing". But in 9.1 the write that fails is the post service's single event, the one search, feed and notifications also consume (5.2). You can't drop it because one consumer doesn't care.
Fix: "The post event feeds search, the feed and notifications too, so the post service shouldn't drop it: a fallback queue, or the outbox. The extractor's writes to POST_HASHTAG are where 'drop it' is acceptable." (check source)

**9b. A term arrives before its definition.** Fig 9·c is titled "A stream with H and LC", but H and LC are defined only in steps 2–3 and the caption.
Fix: title it "Where can a consumer start reading?"

**9c. The figure and the text spoil the pause.** Fig 9·c step 6 says "Kafka's default for a new group starts it at the latest message instead… unless you set earliest". The paragraph under it repeats it. Then the pause asks "What does it read first?"
Fix: end the stepper at step 5. Move "where should a brand-new consumer start?" into the pause and reveal latest/earliest only in the answer.

**9d. Retention numbers clash.** The text says "7 days unless you change it", while the figure uses "older than 30 days".
Fix: use 7 days in the figure, or label it "a topic set to 30 days".

**9e. A stray aside.** "(Keyed by user, the post topic might be a thousand partitions for a million users…)" Instagram has far more than a million users, so the example jars.
Fix: cut it.

**9f. The ending is good.** "What you can now do" is concrete, the four recall questions cover both builds, and 9.5's "who wrote that code?" hands off cleanly. Trim the eight bullets to six by merging "Connect teams" into "Design storage from the page" and "Count at volume". Re-check the Lecture 8 paragraph once Lecture 8 is final.

---

## Retelling in 7 sentences

1. Photos are big and never change, so instead of your API servers sending them from Singapore, a CDN property maps a hostname to your origin, keeps the path, pulls on a miss and serves every later hit from near the reader.
2. Photos live in a private S3 bucket only the CDN reads. Uploads skip your servers: the service signs a short-lived URL for one path, locally, and the app sends the bytes straight to S3, which is what GitHub's attachments do too.
3. The posts table stores only what can't be derived (user ID, image ID, caption), and the post service builds every URL per request, so switching or splitting CDNs, changing cloud or deleting a photo is a one-function change.
4. The CDN knows no one, so privacy means the API gives URLs only to allowed viewers, and those URLs are signed and expire. A forwarded URL works until then: pseudo privacy, which is the only kind a CDN-served platform can afford.
5. Each new post goes out once on Kafka (keyed by user) for every other team. A hashtag page is one ~1 KB document per tag (tag, count, top 100 post IDs), designed from what the page shows.
6. Counting batches increments, but a user-keyed topic scatters each hashtag across servers and can't be re-keyed, so extractors re-publish one (hashtag, post) message per tag on POST_HASHTAG, where one server per tag writes an atomic count += n and accepts the occasional double count.
7. Data science's top 100 arrives on their own Kafka topic, the page's JSON is cached on the CDN with s-maxage, and on bad days you decide per message what loss costs, start new consumers at earliest, and know that adding partitions moves keys. Then Lecture 8 asks who builds the CDN's resizer.

**How hard was it?** Easy for Build 1: sentences 1–4 came out in chapter order with no lookups. Sentence 5 was the hardest join. I had to remember why the hashtag page follows the photos, and I could only say "because hashtags are in the caption and the post is already on Kafka". That is a real link, but not a felt problem. In sentence 6 I wasn't sure whether the problem was write volume or the hot row (7a). In sentence 5 I couldn't say how the page gets the 100 photos' URLs from post IDs (6a).

---

## Top 10 fixes, ranked by impact

1. **Resolve "one read" against post IDs (6.2, 6.3, 8.1, 8.2, 8.4).** Decide in 6.3 that top_100 holds post IDs. Say the page then makes one batched call to the post service, which also signs the URLs. Reword "one document, one read, the whole page" and 8.1's "render in one shot" argument so they stop contradicting the chosen design.
2. **Give Build 2 a rate and motivate counting with the hot row (5.3, 7.1, 7.3).** At the page's own 5M posts/day, count++ is a few hundred writes a second, not a flood. Add the lecture's real write rate if there is one (check source). Lead 7.1 with "every #sunset post wants the same row". That also makes the 5.3 hand-off match Build 1's numeric opening.
3. **Fix the Kafka-down decision (9.1).** The post event also feeds search, the feed and notifications, so "drop it" can't be decided for the post topic by the hashtag count. Move "drop" to POST_HASHTAG and keep a fallback queue or outbox for the post event.
4. **Make the photo path one thing across chapters 1–3 (2.3, 3.3, Fig 3·b, the code).** Use `insta-images/<user_id>/<image_id>.png` from 2.3 on, so chapter 1's "keep the path" rule actually lands on an object. Make the 20% CDN split deterministic per image, not per request.
5. **Stop captions and steppers answering the question just asked.** Neutral captions for Clips 1·1, 4·1 and 7·1. End Fig 9·c before step 6 so the 9.2 pause has something to reveal. Ask the clip question in 2.3 before naming pre-signed URLs. Remove the spoilers in the header bullets and the c1 blurb (H4).
6. **Make resizing correct with signed URLs, and consider moving it (5.1).** The main flow appends ?w=360 after signing, then says that fails. Put the width in before signing in the main flow. Moving 5.1 to the end of chapter 4 fixes this and leaves chapter 5 as a clean hand-off chapter.
7. **Strengthen the build hand-off's two loose ends (Fig 6·a, 8.4, 5.3).** Draw Build 2's naive "hashtag svc + db" in Fig 6·a so 8.4's "two boxes this build started with" lands. Add one sentence in 5.3 tying the switch to the caption-as-text detail planted in 3.1.
8. **One representation per idea: cut the retellings.** Cut the two-phase paragraph after Clip 2·1 (2d), the extractor retelling after Clip 7·1 (7d), "Follow a post through it" after Fig 8·b (8c), the field list after the GitHub stepper (2h), "most probably" twice (4b), the black box twice (6c), and the JSON-default fact in chapter 1 (1d).
9. **Compress 8.4 to the method plus one example (about 120 words).** It currently repeats 8.2, 7.2 and 9.3. Also fix the cache-or-CDN contradiction between 8.2 and 8.4 (8b).
10. **Fix the small believability and clarity breaks.** The 2.3 Gbit/s argument across a fleet (2a). "roughly what you save" (1b). The 1,000 posts giving 40 increments (7b). The three file sizes for one GitHub upload (2g). "The second box" (1a). "You won't even need much scale" (H2). "Don't add requirements" followed by a top-million requirement (6b). "Truly private can't use a CDN" (4d). The 50 MB photo after a 10 MB ceiling (5b). The webhook answer to an unasked question (8a).

---

## Cuts to reach ~12k words (about 1,600 words, best first)

| Where | What | ≈ words |
|---|---|---|
| 8.4 | Compress to the method plus one example (fix 9) | 250 |
| 2.3 / 2.5 | Two-phase retelling after the clip; billing paragraph to one clause; field/ACL paragraph after the GitHub stepper to two sentences | 220 |
| 4.3 | Secret-format paragraph, DRM Go-deeper box, "keep one question in your pocket" | 190 |
| 7.3 / 7.4 | Redis Pub/Sub paragraph; post-clip retelling; "Notice how you found it" to one clause | 200 |
| 1.4 | Cache-Control / Cloudflare JSON paragraph to one sentence (it lives in 8.2) | 80 |
| 5.1 / 5.3 | Vendor list; "You could have drawn this as a box…" paragraph | 110 |
| 6.1 / 6.3 / 6.4 | Second black-box paragraph; "One more temptation"; top-million paragraph | 140 |
| 8.3 | "Follow a post through it" | 90 |
| Header | Duplicate two-box paragraph and the 14-million line if unused; "won't need much scale" | 70 |
| 9.1 / 9.3 / 9.4 | Kafka SLA sentence; thousand-partitions aside; merge 8 bullets into 6 | 110 |
| 2.1 / 3.2 | India Regions parenthetical; Bing price example | 60 |
| **Total** | | **≈1,520–1,600** |

None of these cuts removes a step of either build or a figure. They take out retellings, vendor detail and two detours (Redis Pub/Sub, DRM).
