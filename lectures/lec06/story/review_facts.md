# Lecture 8 (lec06) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec06.mdx`, `lec06/{s0-header,c1…c8}.mdx`, the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec06/` (`so-far`, `s1-images`, `s2a-gravatar-fig2a`, `s2b-gravatar-fig2c/2d/2e`,
`s3-serving` with `servingOnly`, `s4-tagging-decisions/events/position`, `s5a-badge`, `s5b-badge`, `s6-auxiliary`), and the
alt text, captions and on-screen labels of the four clips (`l06-hash-scan`, `l06-invalidate`, `l06-badge`, `l06-aux-redis`).
Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`,
`story/NOTES.md`, and the pages of Lectures 1, 2, 4, 5, 7 and 9 for callbacks. No page file was edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / code invalid for its system / design step that fails) | 0 | 3 | 2 | 5 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 0 | 3 | 3 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions (incl. figure vs text, course callbacks) | 0 | 0 | 7 | 7 |
| **Total** | **0** | **3** | **12** | **15** |

High and medium:
- **F-01 (medium, error)**: §3.4 explains the concurrent mark-active race with PostgreSQL's snapshot rule on a page whose SQL is MySQL 8. On InnoDB the same two-update transaction does not end with two active photos: the second `UPDATE` waits on the first's locks and then reads the latest rows. The PostgreSQL account is also a little loose ("both clear the same old photo").
- **F-02 (medium, error)**: §4.3 purges "that path", but §4.4 then caches every `?w=` width as its own object. A purge of the bare path leaves the old face cached at every width that was requested.
- **F-03 (medium, error)**: the Flask `/raw/<path>` route (§1.2 code and Fig 1·b) does not match `/raw/users/logo.jpg`. Flask's default converter stops at `/`, so the example the text walks through returns 404.

---

## Issues

### F-01 · ERROR · medium · §3.4: the race is PostgreSQL's, the page is MySQL
- **Where:** c3 §3.4, first paragraph (and, by implication, the recall answer in §8.5: "two concurrent requests can still leave two active unless the user's row is locked").
- **Current text:** "Atomic doesn't mean isolated. Under PostgreSQL's default isolation, each `UPDATE` picks its target rows from a snapshot taken when the statement starts, so both transactions can clear the same old photo and then activate two different new ones: two active photos again."
- **Problem:**
  1. *Wrong engine for the page.* Every other SQL block on the page is labelled or written for MySQL 8 (`SHA2`, `START TRANSACTION`, the MySQL locking-read citation one paragraph later). InnoDB treats `UPDATE` as a locking read. It locks every index record it scans and acts on the latest committed row versions, not on a snapshot. So with the chapter's two-update transaction, the second request's clearing `UPDATE` waits for the first to commit. It then sees the photo the first one activated, clears it, and activates its own: one active photo. On MySQL the student's "concurrency taken care of", which the teacher accepted, is close to right for this case (transcript 00:51:54–00:52:10). The fact-check's anomaly (A-GD-06) is specifically PostgreSQL READ COMMITTED.
  2. *Loose mechanism.* Even on PostgreSQL, the two transactions don't both clear the old photo. The second one blocks on the row, re-checks it after the first commits, and finds it already cleared, so it clears nothing. It also never sees the photo the first just activated, because that row wasn't active in its snapshot.

  The fix the page gives (lock the user's row; locking ownership check) is right on both engines and should stay.
- **Sources:** L-0095 (fact-check imprecise/medium, A-GD-06); SN-04 in `lesson/factcheck_applied.md`. Transcript 00:51:54–00:52:10. PostgreSQL 13.2.1 (Read Committed: `UPDATE` re-evaluates the WHERE on the updated row version). MySQL 8.4 §17.7.2.3 ("the snapshot … applies to SELECT statements … not necessarily to DML statements") and §17.7.3 (locks set by `UPDATE … WHERE`).
- **Replacement (first paragraph of §3.4):** "A user double-clicks, or has the settings page open on two devices, and two mark-active transactions start together. Atomic doesn't mean isolated, and what happens next depends on the engine. Under PostgreSQL's default isolation, each `UPDATE` picks its rows from a snapshot taken when the statement starts. The second request's clearing update waits for the first, finds the old photo already cleared, and never sees the photo the first one just activated. Then it activates its own, and the user has two active photos again <Cite href="https://www.postgresql.org/docs/current/transaction-iso.html">postgresql.org</Cite>. MySQL's InnoDB happens to be safer here: an `UPDATE` locks the rows it scans and reads their latest committed versions, so the second clear waits and then clears the first request's photo <Cite href="https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html">dev.mysql.com</Cite>. Don't lean on that difference. Say what you need."
- The next paragraph ("So the check needs locks…") and the code block can stay as they are.

### F-02 · ERROR · medium · purging one path when every width is cached separately
- **Where:** c4 §4.3 ("their only job is to call the CDN's API to purge that path"), §4.4 ("The CDN treats each width as its own cached object"), §8.5 recall answer 3, and "What you can now do" ("purge on change, resize on a miss"). Clip `l06-invalidate` shows "purge /h1". The clip can stay as it is, because it plays before widths are introduced.
- **Problem:** §4.4 makes `gravatar.com/h1?w=32` and `…?w=512` separate cache entries, but nothing goes back and widens §4.3's purge. As built, a changed face disappears from the bare URL and stays stale at every width that was ever requested, which is nearly every embed. That is exactly the bug the purge was meant to fix. How a CDN purges query-string variants varies. On CloudFront a path ending in `*` invalidates every version of the file, query strings included. Purge-by-URL APIs that need the exact cache key need every variant, or a prefix or tag purge. The lecture never covered this case (L-0129 purges `/h1` before resizing is introduced), so the page has to close the gap itself rather than imply the purge is complete.
- **Sources:** L-0129, L-0151, L-0152; transcript 01:12:47–01:13:29, 01:24:10–01:25:27. CloudFront developer guide, "Invalidate files" (wildcard `*` and query strings), already cited on the page.
- **Replacement (add at the end of §4.4's second paragraph):** "One consequence for chapter 4.3: a purge now has to clear every width, not just the bare URL, or the old face lives on at 32 pixels. On CloudFront, invalidating `/h1*` clears every query-string version of the file <Cite href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html">docs.aws.amazon.com</Cite>; with a CDN that purges by exact URL, purge each width you serve, or by prefix or tag."
- **Replacement (recall answer 3, last sentence):** "…a worker calls the CDN's purge API for the path and all its widths (or the API calls it directly), so the next request misses and fetches the new photo."

### F-03 · ERROR · medium · Flask's `<path>` does not match slashes
- **Where:** c1 §1.2 code block and the paragraph after it ("A request for `/raw/users/logo.jpg` now returns the object stored at `users/logo.jpg`"). Fig 1·b (`s1-images.tsx` TwoHandlers): the code lines `@app.route('/raw/<path>')` and the label `localhost:5000/raw/users/logo.jpg`.
- **Problem:** `@app.route` is Flask. In Flask a bare `<path>` uses the default `string` converter, which accepts "any text without a slash", so `/raw/users/logo.jpg` gets a 404. The `path` converter (`<path:path>`) is the one that accepts slashes. The board wrote it this way (L-0029), but the page presents the code as working and then walks through the exact request that fails. `S3.read(path, BUCKET)` is also pseudocode, not boto3; that is acceptable for a sketch if the comment says so.
- **Sources:** L-0029, L-0030; transcript 00:12:45–00:14:37; Flask docs, "Variable Rules" (converter types: `string`, "accepts any text without a slash"; `path`, "like string but also accepts slashes").
- **Replacement (code):**
  ```python
  @app.route('/raw/<path:key>')       # path: lets the key contain slashes
  def raw_handler(key):
      raw_b = S3.read(key, BUCKET)    # sketch: read the S3 object at this key
      return raw_b
  ```
- **Replacement (Fig 1·b code lines):** `@app.route('/raw/<path:key>')`, `def raw_handler(key):`, `  raw_b = S3.read(key, BUCKET)`. The desc's "/raw/<path> route" becomes "/raw/<path:key> route".

### F-04 · INTERNAL CONTRADICTION · low · three bugs or four?
- **Where:** overview hook ("the one-line query that changes your photo hides three bugs that can show a broken image on every site at once"); overview Build 1 ("a one-line update with three bugs"); c3 intro ("a mistake … and two more behind it").
- **Problem:** chapter 3 finds four: the old photo stays active, the crash halfway, someone else's id, and two requests at once (§3.4). The overview's own "What you'll be able to do" and the §8.5 recall both list four. Only two of them, the crash and the foreign id, give a broken image (404); the other two leave two active photos.
- **Sources:** L-0089, L-0093, L-0097, L-0095 (fact-check).
- **Replacement (hook):** "…and the one-line query that changes your photo hides four bugs, two of which can show a broken image on every site at once."
- **Replacement (Build 1):** "…a one-line update with four bugs…"
- **Replacement (c3 intro):** "It also hides a mistake that almost every engineer has seen in production, and three more behind it."

### F-05 · INTERNAL CONTRADICTION · low · the threshold needs the read the rose paragraph forbids
- **Where:** c8 §8.4, second paragraph.
- **Current text:** "So if B's set is already above the threshold, the workers don't write even a new sender to the main store. That is a genuine extra saving on top of the auxiliary store."
- **Problem:** the paragraph just before it rejects reading the main store at all ("You don't want even the reads"). To know that B's set is past 100, a worker has to ask the main store (`SCARD B`). The aux store "keeps no count, only existence" (§8.2), so it can't answer either. The lecture (02:42:15–02:43:12) endorsed the idea without saying where the size comes from. The page should not call the saving free.
- **Sources:** L-0300, L-0301, L-0304, L-0308.
- **Replacement:** "Second: stop counting past a point. Nobody needs to see that 10,000 people wrote; the app can show “100+”. Once B's set is past that threshold, even a new sender changes nothing the user can see, so the workers can skip the write. The catch is that knowing the size is itself a question for the main store, the read you just ruled out, so this saves something only for recipients whose sets are already huge and only if the size is known without asking main each time."

### F-06 · ERROR (design step that fails as written) · low · clearing "B's keys" in the auxiliary store
- **Where:** c8 §8.3, "When B taps the icon, the status API deletes B's set in the main store *and* B's keys in the auxiliary store". Fig 8·c (Paths aux): "a clear deletes here too".
- **Problem:** the aux store holds one key per pair (`B_C`, `B_D`) and is a cluster (§8.2), so the keys sit on different nodes. To delete "B's keys", the API must first learn which senders B has, by reading B's set from main before deleting it or by scanning every aux node. The page never says this, and a reader who builds it will discover the gap. The fact-check offered the standard fix: one hash per recipient, `HSETNX`, with clearing as a single `DEL` (A-PTU-15, confirmed). NOTES cut it as engine detail, but it is the step that makes the clear work. (The unused `FirstVsRepeats` figure's `DEL B_C B_D` would also fail on a cluster with CROSSSLOT. That figure is not on the page.)
- **Sources:** L-0295, L-0302 (fact-check simplified/low, A-PTU-15), L-0321. Transcript 02:39:55–02:40:07, 02:43:21–02:44:03.
- **Replacement (append to the §8.3 clear paragraph):** "With one key per pair, the API has to know which keys are B's. It can read them off B's set just before deleting it. Or keep B's pairs as fields of one hash in the auxiliary store: `HSETNX B C 1` is the same set-if-absent check, and the clear is one `DEL B` <Cite href="https://redis.io/docs/latest/commands/hsetnx/">redis.io</Cite>. Since Redis 7.4, `HEXPIRE` can give each field its own TTL."

### F-07 · INTERNAL CONTRADICTION (figure vs text) · low · `from` and `to` in the Crude figure
- **Where:** Fig 6·c (`s5a-badge.tsx`, Crude): labels `select count(distinct from)` / `from messages` / `where to = ?` / `and ts > last_read_at`, table `messages (msg, from, to, ts)`; desc "messages (msg, from, to, ts)".
- **Problem:** the SQL block right above it says "FROM and TO are reserved words, so the columns get other names" and uses `sender_id`/`recipient_id`. The figure shows the query the text calls invalid, and `count(distinct from)` is a syntax error in MySQL. It matches the board, but the figure presents it as the query.
- **Sources:** L-0235, L-0243 (fact-check imprecise/low, A-PTU-10).
- **Replacement (figure labels):** `select count(distinct sender_id)` / `from messages` / `where recipient_id = ?` / `and ts > last_read_at`; table `messages (msg, sender_id, recipient_id, ts)`. The desc becomes "messages (msg, sender_id, recipient_id, ts), with sender_id, recipient_id and ts marked for the index". Alternatively, keep `from`/`to` and backtick them everywhere.

### F-08 · INTERNAL CONTRADICTION (figure vs text) · low · the card's TTL stated as fact in Fig 1·c
- **Where:** Fig 1·c (`s1-images.tsx` RepoCard): label "TTL ~1 day"; desc "until its TTL runs out, about a day".
- **Problem:** §1.3 says "GitHub doesn't publish how soon a card catches up", and §1.4 says "say a day". The figure turns the teacher's estimate into a fact about GitHub.
- **Sources:** L-0039 (fact-check unverifiable: "GitHub publishes no refresh interval or cache lifetime"), L-0046.
- **Replacement:** label "TTL, say 1 day"; desc "…returns an image that the CDN keeps until its TTL runs out (say a day; GitHub doesn't publish it)…".

### F-09 · INTERNAL CONTRADICTION (course callback) · low · "a CDN on its own subdomain" in Lecture 7
- **Where:** overview "Where you are" ("a CDN on its own subdomain serves the photos"); c4 §4.2 ("In Lecture 7 the CDN sat on a subdomain; here the root domain itself is the CDN").
- **Problem:** Lecture 7 (`lec09`) as it stands on disk names its CDN property `instacdn.net`, a separate domain, not a subdomain, and never uses the word "subdomain". The class meant `edge.arpitbhayani.me` (L-0123), but the callback has to match the page it points to. NOTES says lec09 is being rewritten, so re-check after that rewrite.
- **Sources:** L-0123, L-0138; `lec09/c1-who-sends-the-bytes.mdx` (CDN property `instacdn.net`).
- **Replacement (overview):** "…a CDN on a hostname of its own serves the photos…"
- **Replacement (§4.2):** "In Lecture 7 the CDN had a hostname of its own, separate from the site; here `gravatar.com` itself, the name every embed uses, is the CDN." Use this unless lec09's rewrite brings back a subdomain.

### F-10 · DISTORTION · low · "a daily one gets an app uninstalled"
- **Where:** c5 §5.4 ("one rule of thumb is that good apps send three to five notifications a week, and a daily one gets an app uninstalled").
- **Problem:** the teacher said a daily notification is "a big turn-off that can lead to uninstalls" (L-0195). The page states it as a certainty, next to a figure the fact-check marked unverifiable (L-0196).
- **Replacement:** "…one rule of thumb is that good apps send three to five notifications a week, and a daily one can get an app uninstalled."

### F-11 · INTERNAL CONTRADICTION · low · "only the owner tags", right after a non-owner may change the photo
- **Where:** c5 §5.3 ("only the owner tags people in their own photo, so concurrency isn't the hard part").
- **Problem:** §5.2, one section earlier, establishes that a tagged non-owner may remove their own tag ("someone who doesn't own the photo is allowed to change it"). The fact-check (L-0188) names that, and a second device, as the remaining concurrent writers. The teacher's point holds (concurrency isn't the hard part), but the reason as stated contradicts §5.2.
- **Sources:** L-0188 (fact-check simplified/low), L-0201, L-0202. Transcript 01:46:57–01:47:32.
- **Replacement:** "You might worry about several people adding tags at the same moment, but only the owner adds tags to their own photo, so concurrency isn't the hard part; the other writers, someone removing their own tag or the owner on a second device, each change one tag at a time."

### F-12 · DISTORTION · low · `active_photo_id` as an "answer kept ready"
- **Where:** c7 §7.2, last paragraph ("the stored hash in chapter 2 and `active_photo_id` in chapter 3 are answers kept ready because a frequent read needed them").
- **Problem:** the same section defines "kept ready" by its cost: a copy that some other flow must keep current. The stored hash fits that definition (it is redundant with the email). `active_photo_id` does not. It replaced `is_active` and *is* the truth, with no second flow to maintain. Lumping them together blurs the distinction the chapter is teaching. The finished map (Fig 8·e) treats them as different kinds of row.
- **Sources:** L-0082, L-0083, L-0107, L-0111, L-0261.
- **Replacement:** "And you have been near this trade all lecture: the stored hash in chapter 2 is an answer kept ready because a frequent read needed it, and `active_photo_id` in chapter 3 moved the truth onto the row that read already fetches."

### F-13 · DISTORTION · low · "every system here … in a few hours"
- **Where:** overview "Before you start" ("Every system here can be prototyped on your own laptop in a few hours").
- **Problem:** the class gave estimates for specific pieces: the card in about an hour (L-0051), Gravatar in three or four hours (L-0061), and two days for the morning's sequence end to end (L-0166). "Everything can be prototyped locally" is L-0053, with no time attached. The page merges these into a single, shorter promise.
- **Replacement:** "Every system here can be prototyped on your own laptop: the card in about an hour, Gravatar in an afternoon, the whole avatar service with its CDN and resizing in a couple of days. Building it is what makes the reasons stick."

### F-14 · ERROR · low · "The URL is `gravatar.com/` followed by a hash" stated as Gravatar's
- **Where:** c2 §2.1, first paragraph.
- **Problem:** stated as a fact about Gravatar. On real Gravatar the image URL is `/avatar/<hash>`, while `gravatar.com/<hash>` is the profile page. The correction comes two paragraphs later ("This chapter keeps the short form"), so a reader first learns the wrong URL as fact. The fact-check marks L-0057 outdated: SHA-256 now, MD5 originally. Fix it in the first sentence instead of after.
- **Sources:** L-0055, L-0057, L-0058 (fact-check outdated/imprecise; A-GD-01, A-GD-02); docs.gravatar.com.
- **Replacement (first paragraph, third sentence):** "In the version you build here, the URL is `gravatar.com/` followed by a hash of your email, and it never changes: a hash function given the same input always returns the same output."
  - Leave the "Real Gravatar hashes…" paragraph as it is.

### F-15 · INTERNAL CONTRADICTION · low · the remedy for browser copies doesn't fit Gravatar
- **Where:** c4 §4.3, last paragraph ("That is why CloudFront recommends versioned file names for files that change often").
- **Problem:** the CloudFront fact is right. But Gravatar's whole promise (§2.1) is a URL that never changes, so the one remedy offered can't be used here, and the reader is left with stale faces in browsers and no fix. Chapter 1 already taught the tool that fits: `s-maxage` for the CDN, separate from the browser's `max-age`.
- **Sources:** L-0128 (fact-check addition on purge scope); MDN Cache-Control (already cited in §1.4); CloudFront "Invalidate files".
- **Replacement (append):** "Gravatar can't rename its one URL, so it uses chapter 1's header instead: a long `s-maxage` for the CDN, which a purge can clear, and a short `max-age` for browsers, which nobody can."

### Important losses
None. Every reusable method and core idea in the ledger is on the page:
- the static-folder-is-code idea;
- on-demand images behind a CDN;
- a computed WHERE that hides the index;
- "store what is derivable when a hot query needs it";
- a transaction around dependent writes;
- the ownership check, and check-then-write;
- moving "active" to the user;
- a CDN origin that has to ask the database, plus purge on change;
- resizing on a miss with large machines;
- every requirement question changing the design;
- product-level throttling;
- the synchronous dependency with an SLA and a fallback;
- relative positions and the bounding box;
- one Kafka event for every team;
- source of truth vs pre-computed;
- the umbrella `ON_MSG_UNSENT` event from the service that knows;
- auditing every path of the brittle store;
- the auxiliary store, accepting drift, and picking your battles.

Deliberate cuts in NOTES (the private-image open thread, predicate pushdown, the enum/TINYINT aside, the Slack membership comparison) are trivia or Q&A, not losses. Optional: SN-04 suggested a link to Lecture 3's live `SELECT … FOR UPDATE` from §3.4, which would be a cheap callback.

---

## The writer's flagged doubts (NOTES.md, "Unsure")

1. **Ch8 length (1,875 words).** Not a fact or fidelity question. F-05 and F-06 each add or reword one or two sentences in ch8.
2. **Phone layout of the map.** Not a fact question. The folded rows say nothing the desk rows contradict. Checked: no row appears before its chapter's reveal, and each row matches its chapter.
3. **Hook phrasing.** "Can show a broken image on every site at once" is fair for two of the bugs (crash and foreign id → 404, L-0093/L-0134). The bug count beside it is wrong; see F-04. "Pulls in team after team" is fair (L-0218/L-0219).
4. **Real Gravatar mentioned once, design keeps `gravatar.com/<hash>`.** Acceptable, and the real-Gravatar sentence is accurate:
   - SHA-256 of the trimmed, lower-cased email;
   - MD5 originally;
   - served under `/avatar/`;
   - a default image when the email has none;
   - `s=` for size, noted in §4.4.

   Only the first sentence of §2.1 needs "in the version you build here" (F-14).
5. **lec09 (Lecture 7) callbacks.** Pre-signed upload, width parameter, and "store only what can't be derived" all match lec09 as it is on disk. "On its own subdomain" does not (F-09). Re-check after lec09's rewrite.
6. **course.json topic strings.** Out of scope for this check, but the coordinator should update them at publish.

---

## Checked and found correct

**Chapter 1**
- Browser behaviour, fact-check applied:
  - the GET from `src`;
  - signatures `89 50 4E 47` and `FF D8 FF`;
  - decoders for PNG, JPEG, GIF, WebP and AVIF;
  - SVG identified by Content-Type, not by its first bytes (L-0021, L-0022).
- Static-folder mapping, with Django dropped (L-0024).
- The Content-Type and `safe_join` Go deeper box (L-0025). Werkzeug's `safe_join` is what `send_from_directory` uses.
- Open Graph `og:image` (L-0036). `opengraph.githubassets.com` next to `githubusercontent.com` (L-0042).
- On a miss the CDN calls a GitHub image service (L-0044, fact-check).
- `s-maxage` applies to shared caches only (MDN).
- GitHub's figures match the GitHub blog and the fact-check:
  - 280 ms per image;
  - about two million "unique-ish" images a day;
  - 40% of requests cached;
  - "a little Node.js app" with a headless browser.
- Pillow named as a separate library, not as ImageMagick-based (L-0047 wrong/low, fixed).
- The pause on pre-rendering vs on-demand (L-0040).

**Chapter 2**
- Gravatar's promise, requirements and the "why a hash" reasoning (L-0055–L-0062, L-0310).
- Unsalted, fast hash keeps the email out of plain sight and not much more (L-0054 medium, applied with the oss-sec source).
- Keeping the email; "hash and path derivable" (L-0064–L-0071).
- `SHA2(LOWER(TRIM(u.email)), 256) = ?` is valid MySQL 8 and matches Gravatar's normalisation (64 lowercase hex characters).
- The 10,000-row pause: a full scan, or a full scan of the email index; either way all entries.
- Expression and functional indexes with the exact-expression requirement (L-0081 medium, applied; MySQL 8.0.13+ functional key parts, PostgreSQL expression indexes). "Both ways, the derived value ends up stored" is accurate: a MySQL functional index is a hidden generated column.
- The stored-hash query and the bent Lecture 7 rule (L-0082, L-0083).
- Clip 2·1's text and numbers (10,000 vs 1 row; 30,000 vs 3 over three requests).

**Chapter 3**
- The pause: "both active" (L-0089).
- The two-update fold with `AND is_active = TRUE` (L-0090, L-0091).
- Fig 3·b's steps and the 404 (L-0093).
- The foreign-id pause and Fig 3·c (L-0097, L-0132, L-0134).
- "An UPDATE that matches no rows is not an error, nothing rolls back by itself" (L-0137, fact-check).
- The §3.4 code is valid MySQL 8:
  - `SELECT … FOR UPDATE` on `users` and on `photos`;
  - ROLLBACK on no row;
  - the guarded second `UPDATE`;
  - six statements.

  The MySQL quote "does not give enough protection" is the manual's wording (L-0135, A-GD-07).
- §3.5 read with the index on `photos.user_id` (L-0105 fact-check). `WHERE hash = ?` for the read and the update (L-0109, L-0111). Autocommit makes a single statement a transaction. The ownership check stays, as get-then-update (L-0171, as taught).
- Fig 3·d matches the board (old second update with `and is_active = false`; denormalisation note L-0147).
- "Fifteen cohorts" told as one engineer's experience (L-0114, unverifiable).
- `EXPLAIN ANALYZE` executes the statement (MySQL manual).

**Chapter 4**
- Upload reused, with `s3://gravatar-images/{user_id}/{photo_id}` (L-0117).
- `api.gravatar.com/photos/<hash>` as origin, and the root domain as the CDN property (L-0120–L-0124).
- The S3 pause answer: S3 doesn't know which photo is active, and a private bucket isn't the obstacle (L-0139 medium, applied with CloudFront OAC).
- Long TTL plus purge on change, via Kafka workers or synchronously (L-0125–L-0130, including the 01:22 Q&A "Synchronous. Yes.").
- "Every CDN … exposes such a call" (Cloudflare purge API, Akamai Fast Purge).
- A purge clears edges, not browsers or proxies. This is CloudFront's own reason for recommending versioning; see F-15 for how it fits Gravatar.
- `?w=` in the cache key, with real Gravatar's `s=` (A-GD-02).
- ImageMagick is C with C and C++ APIs; Pillow has its own `resize` (L-0153/L-0154/L-0155, all fixed).
- CPU-heavy, synchronous, large autoscaled machines (L-0159–L-0164).
- The half-remembered Cloudflare/Cloudinary blog is cut, which is correct (L-0162 unverifiable; contradicted for Cloudflare).

**Chapter 5**
- The brief, the three hats, and "who can tag me" (L-0176–L-0186).
- Self-removal and finer-grained authorization (L-0201, L-0202).
- The per-user rule as closer to an ACL than to roles (L-0218 fact-check). RBAC was removed from the labels and the desc.
- 5 vs 10,000 → array vs row-per-tag and pagination (L-0189, L-0190).
- Notification-team spike and product-level throttling, with "rule of thumb" hedged (L-0193–L-0197; but see F-10).
- The fan-out Go deeper:
  - classic consumer groups capped by partitions (L-0007);
  - SNS→SQS (L-0010);
  - 50–60k users in five seconds told as one engineer's experience (L-0012).
- Facebook's face-recognition shutdown on 2 November 2021 (L-0203, outdated, applied).
- Sync dependency, SLA and fallback as a product call (L-0204–L-0207).
- Arrays indexable (MongoDB multikey, PostgreSQL GIN), with row-per-tag still recommended (L-0209 medium, applied with the PostgreSQL docs).
- Feed as a product call (L-0211). One `PHOTO_TAG` event on Kafka (L-0219).
- Pixel arithmetic: 320/720 ≈ 0.44, 120/720 ≈ 0.17, the face at (160, 60) on 360 px. Fig 5·f's LTRB (0.38, 0.10, 0.56, 0.31) and x,y,w,h (0.38, 0.10, 0.18, 0.21) agree.
- The Graph API's tag `x`/`y` are percentage offsets from the left and top edges, so "as percentage offsets" is right. "Exactly this way" is fine: fractions vs percentages is only a factor of 100.
- `posts_tags(post_id, user_id, location)` matches the board (L-0214).

**Chapter 6**
- The Instagram observation is labelled undocumented (L-0226/L-0228 unverifiable). The design's definition: unique senders since the last tap, presence and not unread (L-0227–L-0233, including the 24-hour reading as an alternative).
- `messages`, `user_activity` (L-0235–L-0240).
- `SELECT COUNT(DISTINCT sender_id) … WHERE recipient_id = ? AND ts > ?` is valid MySQL 8 (L-0243 fact-check).
- `CREATE INDEX ix_unread ON messages (recipient_id, ts, sender_id)` is valid, and it covers the query.
- Index order and the equality-then-range rule (L-0246/L-0247, PostgreSQL multicolumn docs; the same holds for InnoDB). The one-prolific-sender worst case (L-0248).
- "Crude, not incorrect" (L-0250/L-0251).

**Chapter 7**
- The count is struck for the set; O(1) size (L-0252–L-0255; `SCARD` is O(1)).
- Source of truth vs pre-computed, and its upkeep cost (L-0258–L-0262).
- Redis set commands:
  - `SADD` returns 0 for a member already present;
  - `SCARD` returns 0 for a missing key;
  - `DEL` on a set is O(members);
  - `UNLINK` frees memory in the background (L-0257 fact-check, A-PTU-13);
  - `SADD B C` has the right argument order (key, then member).
- MongoDB `$addToSet` (L-0263).
- The smart client and the WebSocket check (L-0268/L-0269). The messaging service as source of truth for delivery (L-0271–L-0274).
- `ON_MSG_UNSENT` as an umbrella, and "offline only" as a product call (L-0272, L-0275, L-0311).
- Event shape `{src, dest, msg}`; the stream also feeds notifications (L-0276, L-0278).
- Go deeper: keyed messages go to one partition in order; Redis pipelining saves round trips (L-0277).
- Callbacks: Lecture 4's edge servers (lec02 c10) and Lecture 1's online/offline dot (lec04) match.

**Chapter 8**
- The load audit (L-0280–L-0283).
- Replicas for badge reads, applied as "if reads outgrow it", because a stale badge is fine (L-0282 fact-check, A-PTU-20).
- 29 of 30 / N−1 (L-0284–L-0287). Lecture 2's brittle-database rule matches lec01 c2/c3.
- `SET key value NX`: atomic, OK or nil; `EX` for a TTL (L-0292, A-PTU-14). It is the same command as Lecture 5's lock; lec08 c6 uses `SET … NX EX`.
- 10,000 messages → one aux write, one main write, 9,999 checks (L-0303). Aux has no count (L-0304) and is a cluster (L-0321).
- "Not fewer operations, they land elsewhere" (L-0291 fact-check).
- Clip 8·1's numbers:
  - 30 + 20 = 50 events;
  - 48 change nothing;
  - with aux, main gets 2;
  - D alone gives 20 writes, 19 of them no change.
- Failure analysis (L-0294). Clear both stores (L-0295; see F-06 for how).
- Drift undercounts until the next clear, and a TTL on aux keys heals it (L-0305 fact-check).
- No distributed transaction, pick your battles (L-0296, L-0297, L-0306, L-0307).
- Read-first rejected; the rose (L-0308, L-0309). Threshold idea (L-0300/L-0301; see F-05).
- Recall answers 1, 2 and 4 are consistent with the text. Answer 3 needs F-02's widths.
- Hand-off: Lecture 9 (lec07, "Build your own Redis", one machine to a ring of nodes) matches. "Storage engines are where the course goes next" matches L-0298 and Lecture 10.

**Clips and furniture**
- Alt text and captions of all four clips match the page's numbers and claims.
- Each clip's `section` field in `timeline.ts` still carries the old section numbers ("2.3", "3.3", "5.1", "6.2"). Nothing renders that field, so no reader sees it.
- The overview's callbacks to Lectures 2, 4 and 5 match those pages.
