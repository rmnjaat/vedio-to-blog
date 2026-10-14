# Lecture 07 (lec09): pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id are given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal that states the verdict first and then the reasoning. Each prompt has its own right and wrong verdict lines, shown under the reveal for the choice the reader made. Without JS the answer is visible.

---

### P1 · §2.5 · "Who tells the browser about the CDN?"
- **From class:** the question at 00:24:50 ("how does the user know the CDN URL?"), followed by the URL-replacement exchange (00:26:30). Teaching-map misconceptions table, rows 00:24:50 and 00:26:30; P14 (01:15:02) is its callback.
- **Question:** Instagram has just put its photos behind a CDN at `instacdn.net`. Nothing in the app was changed. The next time a user opens a profile, do the photos come from the CDN?
- **Choices:** "Yes: DNS and the CDN route existing image URLs automatically" · "No: the backend has to start sending CDN URLs"
- **Reveal:** No. The browser fetches exactly the URL it is given and doesn't know a CDN exists. Until the backend puts `instacdn.net/...` URLs in its API responses or HTML, every image request still goes to the origin. There is no automatic mass rewrite and the site never "calls" the CDN; you change the URLs you send, explicitly. §4.4 shows Instagram's post service doing exactly that per request.
- **If right:** "Right. The CDN only sees requests for URLs the backend handed out."
- **If wrong:** "Not quite. DNS for your old hostname still points at your origin; nothing sends traffic to the CDN until the URLs change."
- **Ledger:** L-0054, L-0056, L-0057, L-0154.

### P2 · §3.2 · "Does a 5 MB photo need chunks?"
- **From class:** P3, 00:32:03 ("How would this image be uploaded? How does this entire communication happen?"). The first proposal was a persistent connection sending chunks.
- **Question:** a user shares a 5 MB HD photo. Should the app open a persistent connection and send it in chunks?
- **Choices:** "Yes: an image is too big for one request-response" · "No: one ordinary HTTP request carries it"
- **Reveal:** No. About 5 MB is peanuts for one HTTP request (S3 itself takes a single PUT of up to 5 GB). Chunking and persistent connections add complexity this size doesn't need. It is easy to build complex systems and exponentially difficult to build simple ones, which is this chapter's rule.
- **If right:** "Right. Keep it one request; save chunking for files measured in gigabytes."
- **If wrong:** "Not quite. 5 MB fits comfortably in one request; the chunks would be complexity with no payoff."
- **Ledger:** L-0065, L-0066, L-0067.

### P3 · §3.2 · "What's actually wrong with uploading through the API?"
- **From class:** P5, 00:35:10 ("What's the problem in this approach?"). Two answers came back: a crash mid-upload, and bandwidth.
- **Question:** photos go phone → API server → S3, synchronously. What is the real problem?
- **Choices:** "A server can crash mid-upload and lose the photo" · "5 MB uploads eat the API servers' bandwidth and memory"
- **Reveal:** bandwidth and memory. A crash is not the problem: the server returns a 5xx and the client retries. But a steady stream of 5 MB requests saturates the network cards (every card has a physical limit), slows every other API call on those servers, and raises their memory needs. A dedicated upload service moves the problem; a pre-signed URL removes it (§3.3).
- **If right:** "Right. Retries handle crashes; nothing handles a saturated network card except not sending the bytes there."
- **If wrong:** "Not quite. A failed upload is cheap to retry. The cost that never goes away is the bytes themselves crossing your API servers."
- **Ledger:** L-0068, L-0070, L-0071, L-0072.

### P4 · §4.1 · "Store the photo's URL?"
- **From class:** P10–P11, 01:04:29–01:07:17 ("What would your post table look like?" then "Will you store the S3 URL? The CDN URL? What if you change your CDN provider?").
- **Question:** your posts table has `id`, `user_id`, `caption`. Images are served from the CDN. Should you add a `photo_url` column holding the CDN URL?
- **Choices:** "Yes: it's what the app renders, so store it" · "No: store the image ID and build the URL"
- **Reveal:** No. Store the crux, `user_id` and `image_id`, and derive the URL in the API handler. A stored URL turns every CDN switch, cloud move, 20% CDN experiment or delete into a migration over every row. Instagram had to change CDNs after its acquisition; derived URLs make that a config change. If something is derivable, don't store it.
- **If right:** "Right. The URL is a function of two IDs and today's CDN choice."
- **If wrong:** "Not quite. Almost every cohort adds this column. It works until the day the CDN changes, and then every row is wrong."
- **Ledger:** L-0123, L-0124, L-0125, L-0127, L-0132, L-0137.

### P5 · §5.1 · "Who can open a private photo?"
- **From class:** P15–P16, 01:18:34–01:23:21 (the provocation that private posts aren't private, the incognito demo, then "how do these companies implement private photos?").
- **Question:** A's account is private. B follows A and copies the URL of one of A's photos into a chat with C, who doesn't follow A. C clicks it a minute later. What does C see?
- **Choices:** "An error: the CDN knows C doesn't follow A" · "The photo"
- **Reveal:** the photo. The CDN has no idea who C is or who follows whom; it only checks that the URL's signature is valid and its expiry hasn't passed. Privacy is enforced earlier, by the API server deciding who receives the URL at all. Once a valid URL is handed on, anyone holding it can open it until it expires. That is why the lecture calls it pseudo privacy.
- **If right:** "Right. The CDN checks the URL, not the person."
- **If wrong:** "Not quite. The CDN is stateless about users. The only gate it applies is the signed expiry in the URL."
- **Ledger:** L-0162, L-0164, L-0166, L-0168, L-0172, L-0174.

### P6 · §7.3 · "Post IDs or whole posts?"
- **From class:** P17, 01:57:38–02:06:13 ("What are you storing to render this page?" then "What's the advantage of storing post ID?", asked three times, and the two-approach table on the board).
- **Question:** the hashtag document holds the top 100. Should it hold post IDs, or full copies of the posts?
- **Choices:** "Post IDs, always" · "It depends on what the page shows"
- **Reveal:** it depends. Post IDs are small, cheap to cache and always fresh, but every render makes a second call to the post service. Whole posts render in one read but take more space, and every like or caption edit must be copied into each hashtag document. If the page shows only photos and a tap opens the post, the copy has nothing to go stale and is the fast choice; if it shows live like counts, IDs are safer. Know the pros and cons, and pick by the experience you promise.
- **If right:** "Right. Space, speed, freshness and consistency trade against each other; the UX decides."
- **If wrong:** "Not quite. IDs are a fine default, but they cost a second read on every render. Whole posts win when nothing on the page can go stale."
- **Ledger:** L-0222, L-0224, L-0225, L-0226, L-0230, L-0231, L-0232, L-0233, L-0234.

### P7 · §8.2 · "Re-key the post topic by hashtag?"
- **From class:** P19, 02:08:00 ("What would be the partitioning key of this Kafka?") and P20, 02:10:05 ("What if hashtag sunset goes to three different servers?").
- **Question:** counting needs every `#sunset` post on one server. The post topic is keyed by `user_id`. Should you just change its key to the hashtag?
- **Choices:** "Yes: then each hashtag lands on one partition" · "No: the post topic can't be keyed by hashtag"
- **Reveal:** No, for two reasons, and neither is "there are too many hashtags" (hashing maps millions of keys onto a few partitions). First, one post carries several hashtags, so it has no single key. Second, search, notifications and analytics already read this topic; you can't change it for them, and writing to a second Kafka from the post service brings back the dual-write problem. So you add an adapter: extract the hashtags and re-publish one event per hashtag to a topic keyed by hashtag (§8.3).
- **If right:** "Right. A post with three hashtags has three keys, and the topic belongs to everyone."
- **If wrong:** "Not quite. Hashing copes with millions of hashtags; what it can't do is give one post three keys or re-key a topic other teams depend on."
- **Ledger:** L-0239, L-0240, L-0241, L-0242, L-0244, L-0249, L-0251.

### P8 · §9.1 · "How should the top 100 reach you?"
- **From class:** P21–P22, 02:19:13–02:22:29 ("How are they notifying us? Will they give us a call?" "Why are we doing this?") and the webhook proposal in Q&A, 02:46:46.
- **Question:** data science recomputes the top 100 for `#sunset` every so often. Should your hashtag page call their service when it renders, or get the result some other way?
- **Choices:** "Call their API on each render: it's always fresh" · "Consume their updates from Kafka and store them"
- **Reveal:** consume from Kafka and store a copy. A synchronous call on every render makes your page's uptime and latency depend on their service, and the page must render in one read. Webhooks into your API are better but put retries and your downtime on their plate: if your API is down, the update is lost. With their Kafka, a small process reads at its own pace and replaces the top-100 array in your document. Anything that doesn't need to be synchronous shouldn't be.
- **If right:** "Right. Copy their output into your own store; don't borrow their uptime."
- **If wrong:** "Not quite. Fresh on every render means down whenever they are, and slower every time."
- **Ledger:** L-0260, L-0263, L-0264, L-0305, L-0307, L-0309.

### P9 · §10.2 · "Where does a new consumer start?"
- **From class:** the retention and checkpoint exchange, 02:57:02–03:03:07 ("how far back should a consumer read?"), drawn as D-12. Teaching map top-10 prompt #9.
- **Question:** a new search service starts consuming Instagram's year-old post topic, which keeps 30 days. It must index every post Kafka still holds. Does a brand-new consumer group read the retained history on its own?
- **Choices:** "Yes: new consumers start from the oldest retained message" · "Only if you configure it to"
- **Reveal:** only if you configure it to. The class's rule is right in intent: a new consumer should start at the horizon (Kafka's earliest retained offset), a crashed one at its last checkpoint, and only loss-tolerant ones at the latest message. But Kafka's default for a group with no committed offset is `auto.offset.reset = latest`, so the new search service would skip all history unless you set `earliest`.
- **If right:** "Right. The intent is 'start from the horizon', and in Kafka you have to say so."
- **If wrong:** "Not quite. That's what you want, but Kafka's default is 'latest': without `earliest`, the new consumer sees only new posts."
- **Ledger:** L-0324, L-0325, L-0326, L-0327, L-0328.
