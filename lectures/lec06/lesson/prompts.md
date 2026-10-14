# Lecture 08 (lec06): pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and the teaching map's prompt id are given), rewritten in the page's voice with no dialogue and no names. Format: the design's sticky-note card (component #8). A question, two choice buttons, and a verdict text for **each** choice, then the shared reasoning. Without JS, both verdicts and the reasoning are visible.

---

### P1 · §1.3 · "Why isn't the card stored?"
- **From class:** P3, 00:18:57–00:19:54 ("Does this mean the image is stored on S3 by GitHub?… a lot of people think everything is pre-generated").
- **Question:** sharing a GitHub repository link shows a card with that repository's current stars and contributors. The card URL returns a real PNG. Does GitHub keep a pre-made card for every repository in storage?
- **Choice A:** "Yes: a nightly job renders one card per repository."
  - **Verdict A (wrong):** Not quite. There are millions of repositories, and their numbers change all the time. Rendering every card every day would burn compute on cards nobody shares, and they'd still be stale.
- **Choice B:** "No: the card is made when someone asks for it."
  - **Verdict B (right):** Yes. The card URL is a route handler, like `/raw`, behind a CDN.
- **Reasoning (shown after either):** a request goes to the CDN. On a miss, the origin fills a template with the repository's current numbers and returns the image, and the CDN keeps it until its TTL runs out. A valid image response says nothing about where, or whether, the image was stored.
- **Ledger:** L-0038, L-0039, L-0040, L-0041, L-0046.

### P2 · §2.3 · "How many rows does it read?"
- **From class:** P10–P11, 00:38:37–00:41:32 ("Let's say I have 10,000 rows. How many rows would this query scan?"). The class reached the answer itself, and the instructor then openly contradicted the previous lecture's rule.
- **Question:** you didn't store the email's hash, because it's derivable. The URL gives you a hash, so the query says `WHERE HASH(users.email) = ?`. With 10,000 users and an index on `email`, how many rows does the database look at to find one user?
- **Choice A:** "About one. The index on email finds it."
  - **Verdict A (wrong):** The index is on `email`, but the query asks about `HASH(email)`. The database can't tell which email hashes to your value without hashing them, so the index doesn't help.
- **Choice B:** "All 10,000. It must hash every email."
  - **Verdict B (right):** Yes. It's a full table scan on every request, before the join even starts.
- **Reasoning:** a computation in the WHERE clause hides the column from its index. Store the hash in its own column, index it, and query `WHERE hash = ?`: one lookup. (More precisely: an index built on the expression itself would also work. See SN-03.)
- **Ledger:** L-0077, L-0079, L-0080, L-0081, L-0083.

### P3 · §2.4 · "Find everything wrong with it" (staged)
- **From class:** P12–P15, 00:44:56–00:54:12. Four rounds of "what can go wrong?", three real bugs.
- **Card layout:** one question, then three hint rows revealed one at a time ("show next hint"). The binary choice sits on the first round only, so the card stays a sticky note and not a quiz.
- **Question:** to mark a photo active, the API runs `update photos set is_active = true where id = ?`. It's one line. Is it correct?
- **Choice A:** "Yes. id is the primary key, so it's exact."
  - **Verdict A (wrong):** It's exact about *which row* it touches, but that is the trouble. The old active photo stays active, so the user now has two.
- **Choice B:** "No, something else has to change too."
  - **Verdict B (right):** Right, and there's more than one thing.
- **Hints, revealed in order:** (1) *What happens to the photo that was active before?* → unset it first, with a second update, only on the active row. (2) *The process dies between your two updates. What do other sites see?* → no active photo, so a 404. Wrap both in a transaction. (3) *The photo id comes from the browser. Whose photo is it?* → add `and user_id = ?`, or anyone can flip someone else's photo. Better still, check first.
- **Hint text when stuck (from class):** "It's like writing one print statement and asking why the program doesn't run."
- **Ledger:** L-0086, L-0089, L-0093, L-0096, L-0097.

### P4 · §2.5 · "Where should 'active' live?"
- **From class:** P16–P17, 01:00:43–01:05:53. The instructor noted that every cohort starts with `is_active` on photos.
- **Question:** the most frequent Gravatar query renders a user's current photo. Should "which photo is active" be a flag on each photo, or a single column on the user?
- **Choice A:** "A flag on each photo: `photos.is_active`."
  - **Verdict A (works, but costs more):** It's correct, and it's what most people draw first, because "active" feels like a property of the photo. But every read needs a join, and every change needs two updates in a transaction.
- **Choice B:** "A column on the user: `users.active_photo_id`."
  - **Verdict B (better here):** Yes. The read becomes one lookup on `users` by hash, and marking active becomes a single UPDATE, which under auto-commit is already a transaction. It still needs the ownership check.
- **Reasoning:** Gravatar is read-heavy, so shape the data for the frequent read. The gain is small, and the lecture called it extreme nitpicking, but it also removes the bug-prone two-update dance.
- **Ledger:** L-0107, L-0109, L-0111, L-0112.

### P5 · §3.2 · "Why not point the CDN at S3?"
- **From class:** Q&A 01:18:26 ("a common question: why doesn't the CDN point to S3 directly?").
- **Question:** the photos sit in S3. Why does `gravatar.com`'s CDN fetch from the API server on a miss instead of straight from the bucket?
- **Choice A:** "Because the bucket is private, and a CDN can't read private buckets."
  - **Verdict A (not the real reason):** CDNs can read private buckets. CloudFront signs its requests with Origin Access Control (SN-05). Privacy is not what blocks this.
- **Choice B:** "Because S3 doesn't know which photo is active."
  - **Verdict B (right):** Yes. The URL names a user (by hash), not a file. Only the database knows which of that user's photos is active, so the origin must be code that asks it.
- **Reasoning:** the CDN only caches what the origin returns. The origin has to be the thing that holds the answer: the source of truth.
- **Ledger:** L-0138, L-0139, L-0140.

### P6 · §4.3 · "Five tags or ten thousand?"
- **From class:** P22, 01:46:37–01:48:12 ("Let me go to extreme: 5 versus 10,000").
- **Question:** product asks you to decide the maximum number of people tagged in one photo. Does it matter to the design whether the answer is 5 or 10,000?
- **Choice A:** "No. It's a validation rule, so just check the number."
  - **Verdict A (wrong):** It changes storage and the API, not just validation.
- **Choice B:** "Yes. It changes how tags are stored and served."
  - **Verdict B (right):** Five fits in an array inside the photo's record. Ten thousand needs one entry per tag (a document that big is costly to rewrite and read) and a paginated endpoint, since nobody wants 10,000 names at once.
- **Reasoning:** every requirement question should change the design. If it doesn't, it wasn't worth asking. Concurrency isn't the issue here, because only the owner tags their own photo.
- **Ledger:** L-0188, L-0189, L-0190, L-0191.

### P7 · §4.5 · "Where does the tag land?"
- **From class:** P27, 01:58:42 ("You cannot store 320,120 in the database. Why?").
- **Question:** on a 720×720 photo, the owner taps a friend's face at (320, 120). A low-end phone shows the same photo at 360×360. If you stored the tag as pixels `(320, 120)`, does it still land on the face?
- **Choice A:** "Yes. The phone scales the image, so the point scales with it."
  - **Verdict A (wrong):** The phone scales the *image*, not your stored numbers. Drawn at (320, 120) on a 360-pixel image, the tag sits near the right edge, far from the face, which is now at about (160, 60).
- **Choice B:** "No. Store it relative to the image size."
  - **Verdict B (right):** Store `(320/720, 120/720)` ≈ `(0.44, 0.17)`, and it lands right at any size with the same aspect ratio. Make it a box (LTRB, or x, y, w, h), since hovering shows the tag over a region.
- **Reasoning:** images get resized everywhere: different devices, and the on-demand transformations from §3. Positions must survive that.
- **Ledger:** L-0212, L-0213, L-0215, L-0216.

### P8 · §5.1 · "What is 3?"
- **From class:** P28 setup, 02:03:15–02:07:24 (the live badge demo and the "twisted" requirement).
- **Question:** the messages icon shows **3**. You have about 300 unread messages. In the design built here, what does 3 count?
- **Choice A:** "Three unread messages, the newest ones."
  - **Verdict A (wrong):** You have hundreds unread. The badge is not a count of unread messages.
- **Choice B:** "Three people who wrote since your last tap on the icon."
  - **Verdict B (right):** Yes. "Newly" means since you last tapped the icon, and the number is unique senders. Tapping clears it without reading anything.
- **Reasoning:** pin the definition before designing. "Unread", "unacknowledged" and "new since last tap" lead to three different systems.
- **Ledger:** L-0226, L-0227, L-0230, L-0231, L-0233.

### P9 · §6.1 · "Thirty messages, how many changes?"
- **From class:** P33, 02:32:45–02:36:03 ("Are you doing any unnecessary operations?"), with the instructor's own example of friends sending a string of short messages.
- **Question:** B is offline. C sends 30 short messages. Each one triggers a worker that adds C to B's set in the main Redis. How many of those 30 writes change B's set?
- **Choice A:** "All 30: each message is new."
  - **Verdict A (wrong):** Each message is new, but the set stores *senders*. C is already in it after the first one.
- **Choice B:** "Just 1. The other 29 change nothing."
  - **Verdict B (right):** Yes. The database still receives, reads, checks and discards each of the 29, all load on the most brittle component for no change.
- **Reasoning:** that waste is what the auxiliary database removes: a cheap store answers "already recorded?" so the main one is written once per sender.
- **Ledger:** L-0284, L-0285, L-0286, L-0287.
