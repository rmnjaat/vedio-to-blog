# Lecture 8 (lec06): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read `lectures/lec06/story/page_text.md` in order (overview, then chapters 1 to 8, with figure descriptions and clip text where they helped). To judge the joins, I also read the end of Lecture 7 (`lec09/c9-bad-days.mdx` §9.5, current state) and the opening of Lecture 9 (`lec07.mdx` frontmatter, `lec07/s0-header.mdx`, the start of `c1`). I did not open the ledger, transcript or fact-check.

## Overall verdict

Build 1 (Gravatar, chapters 1–4) is the strongest part of the page and one of the best stretches in the course so far. It has a concrete promise (one URL, your face, every site), and each step breaks the last one: the crossed-off hash comes back, one line of SQL grows to six statements and then collapses to one, and the CDN has to ask the database. The GitHub card in chapter 1 pays off Lecture 7's closing question ("who wrote that code?") very well, even though the page never says so out loud.

Build 3 (the badge, chapters 6–8) has a good spine: define the number, count it the crude way, keep it ready, then protect the store. But chapter 8's central claim, that the main Redis is in danger, is never shown with a number, so the auxiliary store feels like a solution looking for a problem. The chapter also contradicts itself twice (the threshold in 8.4 needs the read it just ruled out, and the clear in 8.3 deletes keys it cannot name).

Build 2 (tags, chapter 5) is a list of good questions, not a story. It has no failure chain and no numbers. One of its examples (a celebrity tagged by hundreds of people in one photo) contradicts its own rule that only the owner tags.

The hand-offs are uneven:

- **Builds 1→2:** good. "It also lives on these same photos… and that will matter" pays off in 5.6.
- **Builds 2→3:** thin. "The smallest signal of that kind" is a word bridge, not a reason.
- **Lecture 7→8:** solid on this side. Lecture 7's outgoing promise misdescribes this lecture: it says the badge "tells you a message is unread" and leaves out the tags build.
- **Lecture 8→9:** broken. This page promises Redis internals and storage engines. Lecture 9 opens with an analysts' CDC copy and only reaches Redis in chapter 3.

The spoiler hygiene in the overview needs a pass. The header answers the chapter 2 pause, and three chapter blurbs give away their chapter's turn.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 3 | 4 | 4 |
| 1 · A card nobody uploaded | 4 | 4 | 5 |
| 2 · One URL for your face. Which user is it? | 4 | 4 | 4 |
| 3 · One line changes your photo | 4 | 3 | 5 |
| 4 · Facebook adopts Gravatar | 4 | 4 | 4 |
| 5 · "Let people tag people." | 2 | 4 | 3 |
| 6 · The messages icon says 3. Three what? | 3 | 3 | 4 |
| 7 · Do you need the messages at all? | 4 | 4 | 4 |
| 8 · Thirty messages from one friend | 3 | 3 | 4 |

Hand-offs: Lecture 7→8: 3 · Build 1→2: 4 · Build 2→3: 2 · Lecture 8→9: 1.

---

## Header / overview

**H1. The header answers the chapter 2 pause.** "The obvious schema makes every request read the whole users table". Chapter 2's pause asks exactly "How many rows does the database look at?".
Fix: "The obvious schema hides a query that gets slower with every user who signs up, and the one-line query…" Better still, drop the clause: "Each looks like an afternoon's work" already does the job.

**H2. The dek and two blurbs give away chapter turns.**
- Dek: "then keep a badge ready and protect the database that holds it".
- Chapter 7 blurb: "Keep the answer ready instead, and work out who keeps it current" (the answer to the chapter title's question).
- Chapter 8 blurb: "what you can put in front of it" (the auxiliary store).
- Chapter 3 blurb: "and where 'active' should live" (3.5's reveal).
- "What you'll build", Build 3: "keep the answer ready instead".

Fixes:
- Dek: "…then make a red 3 cheap to show and find out what that costs the database underneath."
- Chapter 7 blurb: "The crude count reads every new message to find a few names. Is there a smaller thing to ask?"
- Chapter 8 blurb: "The badge works. Now count what its database does that changes nothing, and what to do about it."
- Chapter 3 blurb: "…and see how many ways it goes wrong."
- Build 3: "…compute it the slow, always-correct way, make it cheap, then find out what cheap does to the database underneath."

**H3. Three builds, no single driving problem.** "Underneath all three sits one question: where does the truth live, and what do you keep ready next to it?" This is a theme, not a problem the reader feels. The "profile page" frame (face, tag, red 3) is a good image, but it is dropped after the first paragraph and never comes back.
Fix: keep the profile-page frame as the spine. Give each build a one-line felt problem in "What you'll build":
- Build 1: "your face, on a million pages you never visit, changed in one click"
- Build 2: "one sentence from a CXO, and five teams who don't know yet that it lands on them"
- Build 3: "a red 3 that millions of screens ask for on every page load"

Then close the lecture by returning to the profile page (see 8.6 below).

**H4. Lecture 7 is recapped well, but its open question isn't picked up.** Lecture 7 ends "The CDN resized your photo. Who wrote that code?" This page answers it beautifully in chapter 1 and in 4.4 ("the feature Lecture 7 simply switched on"), but the header never says that is what is happening.
Fix: add to "Where you are": "Lecture 7 ended with a question: when the CDN resized a photo, who wrote that code? This lecture writes it."

**H5. "Breaks the last rule on purpose" is a good hook.** No change.

**H6. "Before you start" lists Redis, but not sets.** Chapter 7 leans on Redis sets and `SADD` return values.
Fix: "Redis as a key-value store (strings and sets)".

---

## Chapter 1 · A card nobody uploaded

Flow 4 · Clarity 4 · Engagement 5

**1a. The pause answer is given away just before the pause.** "And the card shows the repository's current numbers… it is always recent." The paragraph before it says the URL has no extension. A reader can answer "drawn on demand" without thinking.
Fix: move "And the card shows the repository's current numbers: become a contributor and the count on it changes" into the pause prompt itself, and cut "GitHub doesn't publish how soon a card catches up, but it is always recent" (it hedges and adds nothing).

**1b. The 40% hit rate undercuts the section it sits in.** The section asks "A million people open the same card. Who draws it?", and the answer is the CDN. Then the GitHub numbers say only "40% of requests are answered with a cached image", so 60% are drawn. A careful reader stops: so the CDN mostly doesn't help?
Fix: say why in one clause: "…40% of requests are answered with a cached image: most cards are shared rarely, so most requests are first requests (check source). For a card that goes viral, nearly every view is a hit."

**1c. "Why bother?" comes too late.** It sits after the mechanics, as a backward look. It is the motivation for the whole chapter.
Fix: move "Before these cards, sharing a GitHub link showed a big, plain avatar of the user" up into the opening paragraph, so the card has a before and after.

**1d. One small mismatch.** The prose says "four lines". Fig 1·b says "3–4 lines".
Fix: "four lines" in both.

---

## Chapter 2 · One URL for your face. Which user is it?

Flow 4 · Clarity 4 · Engagement 4

**2a. The reason for keeping the email is unbelievable.** "a lookup by hash alone risks a collision logging someone into another person's account". No engineer believes a SHA-256 collision is a design risk. The next section repeats it: "Set collisions aside (two people with the same hash couldn't be told apart anyway)".
Fix: use the reasons already on the page. "But users log in with their email, expect to see it, and need mail sent to it. And when Gravatar moved from MD5 to SHA-256, it could only re-hash because it still had every email (check source)." Cut the collision clause in 2.3.

**2b. 10,000 rows isn't a scary number.** "users has 10,000 rows". A full scan of 10,000 short rows takes milliseconds, so the reader shrugs. The scale that makes it hurt arrives only in chapter 4 (millions of embeds).
Fix: put the rate next to the scan: "…10,000 rows, and this query runs on every avatar on every page of every site that embeds Gravatar." Or use a larger user count if the lecture gives one (check source).

**2c. Voice wobble.** "Not every platform does this, but the idea is a neat one."
Fix: cut it. The next paragraph makes the point better.

**2d. The clip retells the pause answer.** The pause answer explains the scan. Clip 2·1 then retells it, and the rule paragraph states it a third time. It is acceptable because the clip adds the indexed-hash contrast, but the clip's last beat ("so store it") pre-empts the "Gravatar takes the column" paragraph.
Fix: end the clip at "one lookup, one row", and let the prose land the rule once.

**2e. The last paragraph earns its place.** "Drawing boxes is easy; the trouble hides in the details" is the lecture's thesis, said at the right moment. No change.

---

## Chapter 3 · One line changes your photo

Flow 4 · Clarity 3 · Engagement 5

**3a. The database changes mid-chapter.** Chapter 2's SQL says "MySQL 8", and 4.1 says "MySQL is fine". 3.4 switches to "Under PostgreSQL's default isolation…", then cites MySQL docs for `FOR UPDATE`. The reader can't tell which engine the story runs on, or whether the race happens on MySQL.
Fix: stay on one engine. "Under the default isolation level, two transactions can each clear the same old photo and then activate two different new ones (check source for MySQL's REPEATABLE READ behaviour)." Or say once: "PostgreSQL shows this most plainly; MySQL has the same gap."

**3b. A term appears before its explanation, and a step repeats the prose.** Fig 3·c, step 5: "Check first: a locking select on id = ? and user_id = ?". Locking reads are explained only in 3.4. The two paragraphs after the stepper then repeat steps 4 and 5 ("Step 4 is the trap…", "check that the photo exists and belongs to this user before writing anything").
Fix: end the 3·c stepper at step 4 (the trap). Turn the two paragraphs into the setup for 3.4: "So check first. But a check and a write are two statements, and between them another request can slip in." Introduce the locking select in 3.4 only.

**3c. "One visitor at a time" contradicts 3.4.** The chapter's last line: "Everything so far assumed one visitor at a time." 3.4 was entirely about two requests at once.
Fix: "Everything so far assumed one site asking for one face. Gravatar's whole point is that millions of pages embed it."

**3d. "One statement" versus "get first, then update".** 3.5 says "A single statement under autocommit is a transaction on its own, so the multi-statement dance goes away." The next sentence says "get first, then update", which is two statements again with no lock between them. The reader asks whether the race from 3.4 is back.
Fix: show the one-statement form that carries its own check (check source): `UPDATE users SET active_photo_id = ? WHERE id = ? AND EXISTS (SELECT 1 FROM photos WHERE id = ? AND user_id = ?);`, with the comment "0 rows: not your photo". Otherwise say why the gap no longer matters: there is now only one row to change, so two concurrent requests just leave the last one's choice.

**3e. Small class leaks and one non-sequitur.**
- "Swapping in a different join type wouldn't change anything." Nobody proposed a join type.
- "As one engineer who has put this question to fifteen cohorts tells it, every single cohort started there." "Cohorts" points at a class.
- "Spotting a bug in something this small is hard, like writing a single print statement and asking why the program doesn't run." I couldn't parse the analogy.

Fix: cut the join-type sentence. Use "Almost everyone who meets this problem starts with the flag" for the cohort line. Cut the print-statement analogy; the code-review analogy in 3.4 already makes the point.

**3f. A figure and the code disagree.** Fig 3·d's "before" update has `and is_active = false`. The code in 3.4 doesn't.
Fix: make the figure match the 3.4 code.

**3g. The `WHERE hash = ?` in the mark-active update is odd.** The user is logged in, so the app knows their id.
Fix: `UPDATE users SET active_photo_id = ? WHERE id = ?`.

---

## Chapter 4 · Facebook adopts Gravatar

Flow 4 · Clarity 4 · Engagement 4

**4a. The clip and the prose tell the purge twice.** Clip 4·1 (and its text) covers the photo_updated event, the Kafka worker, the purge, then the miss. The paragraph after it says the same thing step for step.
Fix: keep the clip as the explanation. Cut the prose to the reason it adds: "Gravatar can't wait out the TTL: someone who changes their photo expects to see it everywhere, now. Every CDN, Cloudflare and Akamai included, exposes a purge call." Keep the "calling it synchronously works too" sentence.

**4b. Kafka has no reason.** The page says both a Kafka worker and a direct synchronous call work, but never says why you would add Kafka. The reader is left with an extra box.
Fix: one clause (check source): "Kafka lets the purge retry when the CDN's API is slow or rate-limited, without holding up the user's request, and other teams can react to the same event."

**4c. The browser-cache limit is raised and then left open.** "a purge clears the CDN's edges, not the copies in browsers… That is why CloudFront recommends versioned file names". Gravatar can't version its URL, because the URL is the whole product. So does every browser keep the old face for two days?
Fix: tie it to chapter 1's `s-maxage`: "Gravatar can't rename its URL, so give browsers a short max-age and the CDN a long s-maxage: the edge holds the photo for days, browsers for minutes (check source)."

**4d. A garbled sentence.** "Don't upload, post a message, and have workers pre-create every variant. Transform the image when it is requested." It reads as an order not to upload.
Fix: "You could pre-create every variant at upload time: post a message and have workers render each size. Instead, transform the image when it is requested."

**4e. 4.2 re-explains hit and miss.** "on a hit the CDN answers, and only on a miss…" was taught in Lecture 7 and again in 1.4.
Fix: "Hit and miss work as in chapter 1; the new part is the origin."

**4f. No number in 4.5.** "A page loads two hundred comment avatars at w=32, and they are all cache misses." Chapter 1 has the number that makes this bite: about 280 ms to render one image.
Fix: "…200 misses. At a few hundred milliseconds of CPU each (chapter 1's card took 280 ms), one page is a minute of CPU." Use a resize time from the source if one exists (check source).

**4g. The closing two paragraphs are good.** "and that will matter" is a real hook. No change.

---

## Chapter 5 · "Let people tag people."

Flow 2 · Clarity 4 · Engagement 3

**5a. The celebrity example contradicts the chapter's own rule.** 5.3 says "only the owner tags people in their own photo, so concurrency isn't the hard part." 5.4 then says "a celebrity tagged by hundreds of people in one photo", and Fig 5·d shows "many people tag a celebrity in it". If only the owner tags, hundreds of people cannot tag a celebrity in one photo.
Fix (check source): "a celebrity tagged in hundreds of photos within an hour". Change Fig 5·d's description and labels to match. Also, 5.2 opened with "who may tag me", and the flood case fits there.

**5b. The chapter is a catalogue, not a chain.** Six sections, each a question with an answer. None of them breaks anything, and there are no numbers apart from the pause in 5.3. The best story move is buried. 5.5's activity page ("which photos is this user tagged in?") breaks 5.3's array, but the page doesn't present it as a break.
Fix: build the chapter around the one schema decision that keeps changing.
- 5.3: five tags fit an array.
- 5.5: the activity page asks the reverse question, the array breaks, and you switch to rows.
- 5.6: the rows need a location, and pixels break on chapter 4's resized copies.

Make that the spine, and fold "who gets told" and "which teams" in around it as the teams the event reaches. Say "you chose an array a section ago; this is where it breaks" explicitly.

**5c. Three-hats sermon.** 5.1 is three paragraphs of advice before any situation. The ending also preaches: "That is how an engineer earns influence across teams."
Fix: cut 5.1 to two sentences ("The reflex is to ask for the schema. With one line of brief, ask the product questions first: each answer will change the design or land on another team."). Let the situations show the hats. Cut the influence sentence.

**5d. The ACL point is made twice.** 5.2: "closer to an access control list than to roles". Fig 5·e: "per-user rule (an ACL), not a role". Fine in the figure. In the prose, say it once.

**5e. An unbelievable claim.** "one rule of thumb is that good apps send three to five notifications a week, and a daily one gets an app uninstalled". Plenty of apps the reader keeps send daily notifications.
Fix: soften it to "too many notifications is the top reason people mute or uninstall an app" (check source), or tell it as experience: "One team's rule of thumb was three to five a week."

**5f. Naming: "photo" in the prose, "posts_tags" in the table.**
Fix: one clause in 5.3: "(a post here is a photo, so the table is posts_tags)".

**5g. The Build 2→3 hand-off has no reason.** "The last build is the smallest signal of that kind on any screen: the red number on the messages icon." "Of that kind" links a tag notification to a message badge by wordplay only.
Fix: use the thread the map already carries. "Twice in Gravatar you stored an answer next to the truth because a frequent read needed it: the hash, then active_photo_id. The red 3 on the messages icon is the extreme case. Every screen asks for it on every page load, and its truth is a table of every message ever sent." That also gives Build 3 its driving problem.

**5h. 5.6 is the best section of the chapter.** The pixel pause is concrete, and its arithmetic is right. One gap: chapter 4 listed crops as a supported transformation, and fractions don't survive a crop.
Fix: "as long as the aspect ratio holds (a crop would need the tag recomputed)".

---

## Chapter 6 · The messages icon says 3. Three what?

Flow 3 · Clarity 3 · Engagement 4

**6a. The pause can't be answered.** "Your messages icon shows 3. You have about 300 unread messages. In the design built here, what is 3?" The answer is a definition the designer chose ("a twist chosen for this design"). No reader can reason their way to it.
Fix: turn it into a choice that is reasonable before the reveal. "Three what? Three messages, three conversations, or three people since you last looked? Pick the one that makes the badge cheapest to keep, and the one that makes it hardest." Or drop the pause and state the definition, then pause on something the reader can work out (for example, "A tap clears the badge. Did you read anything?").

**6b. "Not unacknowledged" contradicts the definition.** "tell the user about the presence of new messages. Not unread messages, and not unacknowledged ones." But the badge counts senders since your last tap, and the page itself says a tap means "You have only acknowledged that something new is there". So the badge counts exactly the unacknowledged.
Fix: "Not unread messages: messages you haven't acknowledged by tapping the icon, counted by sender."

**6c. Hedges and detours.**
- "Instagram doesn't document what its badge counts, so treat that as an observation…"
- "'In the last 24 hours' is one reading of 'newly' you might reach for"
- "It is tempting to jump straight to infrastructure, a queue per user partitioned by sender, say."

Fix: keep one sentence of the Instagram observation, without the disclaimer ("On Instagram the badge stays small while hundreds of messages wait, and a tap clears it while every conversation stays unread."). Cut the 24-hour sentence and the queue strawman.

**6d. Column names switch three times.** The schema is `messages(msg, from, to, ts)`, the SQL uses `sender_id` and `recipient_id`, and 6.3's prose uses `(to, from, ts)` while its code uses `(recipient_id, ts, sender_id)`.
Fix: name the columns `sender_id` and `recipient_id` in the schema sentence and in Fig 6·c ("`from` and `to` are reserved words"), and use them everywhere after that.

**6e. No load number.** "millions of users are loading pages at any moment". This is the number that makes chapters 7 and 8 necessary, and it is only a phrase.
Fix: if the lecture gives one, state badge reads per second once here and reuse it in 8.1 (check source).

**6f. The closing question is very good.** "to show who wrote, do you need the messages at all?" No change.

---

## Chapter 7 · Do you need the messages at all?

Flow 4 · Clarity 4 · Engagement 4

**7a. Client and backend are mixed in one paragraph.** "Start with the client, which has to be smart… If messaging runs over a WebSocket, the backend can see that B's socket is down". The first sentence says client, the example is the backend, and the pause then asks which part knows.
Fix: "One case is the client's: if B is already on the messaging screen, the badge needn't move. The rest is about the moment a message is sent. Which part of the system knows it couldn't reach B?" Then the pause.

**7b. v2 cuts the truth loose, and the page doesn't say so.** In v2, nothing reads `messages` or `user_activity` any more. The set is fed only by ON_MSG_UNSENT. If an event is lost, the badge is wrong until the next tap. Fig 8·a still says the badge v2's truth is "messages + the last tap".
Fix: say it in 7.2's cost paragraph: "The set is now its own truth for the badge: miss an event and it stays wrong until the next tap clears it." That also sets up 8.3's drift. Change the map row to "truth: the stream of undelivered messages".

**7c. 7.2 ties the lecture together well.** "the stored hash in chapter 2 and active_photo_id in chapter 3 are answers kept ready". This is the theme paying off. Consider moving a version of it into the Build 2→3 hand-off (5g).

**7d. The count/set paragraph is a small, satisfying beat.** "The count is redundant, so strike it." No change.

---

## Chapter 8 · Thirty messages from one friend

Flow 3 · Clarity 3 · Engagement 4

**8a. The danger is asserted, never shown.** "This one store is carrying a lot." "a pattern companies use to keep a working design from taking its database down". No number shows the main Redis near its limit. A skeptical engineer asks: why not add shards to the main cluster? The page's own concession makes it worse: "SET … NX on one Redis costs about what SADD costs on another, so what was saved? Not the total number of operations". So the auxiliary store, itself "a cluster too", appears to double the infrastructure to move the same load.
Fix: make the argument with numbers and blast radius. Use the read volume (6e) and how many ON_MSG_UNSENT writes a burst produces (30 messages → 30 writes; 29 change nothing). Then answer the "why not just scale main" question head-on: "You could shard main bigger. But every badge read in the product depends on main, and nothing depends on aux. Load you can afford to lose belongs on a store you can afford to lose." Mark any rate "(check source)".

**8b. The threshold idea contradicts 8.4's first idea.** 8.4 rejects read-before-write because "every instruction costs it some CPU… You don't want even the reads." Then: "if B's set is already above the threshold, the workers don't write even a new sender". To know the set's size, the worker must read main.
Fix (check source): "keep the cut-off in the auxiliary store too: a counter per recipient next to the existence keys, so the worker learns B is past 100 without asking main."

**8c. The clear can't find the keys it deletes.** "the status API deletes B's set in the main store and B's keys in the auxiliary store". The auxiliary keys are `B_C`, `B_D`, one per pair. Which keys belong to B? You would have to read main's set first, or scan the auxiliary store.
Fix (check source): "it reads B's set from main (it is about to delete it anyway) and deletes B_x for each sender in it". Or store B's pairs as fields of one hash, `B → {C, D}`, so a clear is one DEL.

**8d. The drift is real, but the obvious question goes unasked.** "If the auxiliary write succeeds and the main write fails…" The reader asks: then retry the main write, or delete the aux key on failure? The page jumps to "Should both writes then be one distributed transaction? Not here."
Fix: one sentence first (check source): "A worker that sees SADD fail can delete B_C and let Kafka redeliver; the drift is what's left when even that fails." Then the "not money" argument.

**8e. The Beauty and the Beast rose.** It reads as a classroom aside, and the brief wants the author's voice.
Fix: "It is the one store every badge read depends on: you don't want to touch it, even to read."

**8f. Repetition.** "Whenever a database does a lot of work that leads to no state change, cut that work, and protect the database however you can" (8.1). "When a brittle component, usually the database, is doing many operations that change nothing, an auxiliary store absorbs them" (8.2). The clip's last beat: "Shield the brittle database from work that changes nothing." The rule is said three times in a row.
Fix: keep it once, as the rule box at the end of 8.2. Cut the 8.1 version to "That is work you can cut."

**8g. "What you can now do" is concrete and good.** The recall questions cover all three builds except tags.
Fix: swap one Gravatar question for a tags question, for example "Product sets the tag limit at 10,000 and wants a 'photos you're tagged in' page. What does each answer do to the schema?"

**8h. 8.6 hands off to a lecture that doesn't start there (see below).**

---

## Hand-offs between lectures

**Lecture 7 → 8 (Lecture 7's side, `lec09/c9-bad-days.mdx` §9.5):** "Then it builds the small badge that tells you a message is unread". This contradicts 6.1, whose whole point is that the badge does *not* count unread messages. It also skips Build 2 entirely, although this page has three builds.
Fix in Lecture 7: "…for profile pictures served at every size. Then it takes a one-line feature request apart, and builds the red number on the messages icon, which ends at a pattern that sounds wrong at first and keeps the whole system alive."

**Lecture 7 → 8 (this page's side):** the recap is accurate (pre-signed uploads, CDN subdomain, resize by width, store the crux), and "breaks the last rule on purpose" is a good hook. It should name Lecture 7's open question (H4).

**Lecture 8 → 9:** 8.6 promises "Lecture 9 opens the box. What does a key-value store actually do with a key, on one machine, byte by byte… Storage engines are where the course goes next… how systems like Kafka work". Lecture 9 opens with "The analysts need a copy of production. What could it miss?" (change data capture, chapters 1–2) and reaches Redis only in chapter 3. Lecture 9's own header says "Lecture 8 ended by turning to storage itself", which matches neither page well. "Storage engines" and Kafka internals are not what Lecture 9 builds.
Fix in 8.6 (check source for Lecture 9's content, which I read): "Lecture 9 builds two copies of the blog's data. The first is a copy for analysts that must never miss a change. The second is the cache in front of the database, a Redis of your own, from one hash table on one machine to a ring of nodes. Every job Redis did here, the set, the TTL, the cluster, gets built from the inside." Change Lecture 9's "Where you are" line to "Lecture 8 leaned on Redis for a set per user, keys that expire, and a cluster it never opened."

**8.6 also never closes the profile page.** The lecture opened on "a small round face, a friend tagged, a red 3".
Fix: open 8.6 with one sentence: "The face, the tag and the red 3 are built. Each one came down to where the truth lives and what you keep ready." Then the Redis count.

---

## Retelling in 7 sentences

1. A URL doesn't have to point at a stored file. A handler can read bytes from S3 or draw an image on demand, the way GitHub draws repository cards on a CDN miss, and the browser just decodes whatever bytes come back.
2. Gravatar gives you one URL, built from a hash of your email, that returns your current photo on any site. The lean schema stores only the email, so every lookup hashes every row, and the fix is to store the derived hash in an indexed column: don't store what you can derive, unless a constant query needs it.
3. Marking a photo active looks like one UPDATE but needs the old photo cleared, a transaction, an ownership check and a lock against concurrent requests. Moving "active" to one column on the user makes it a single row change and drops the join.
4. Behind a CDN, the origin must be the API, not S3, because only the database knows which photo is current. A change publishes an event so a worker purges the CDN, and each requested width is resized on a miss by many-core machines.
5. A one-line request to "tag people" turns into questions that change the design or land on other teams: who may tag whom, how many tags (array or rows), notifications and throttling, ML suggestions with an SLA, the activity page, the feed, positions stored as fractions, and one Kafka event for everyone.
6. The red badge counts people who messaged you since your last tap. Counting it from the messages table is always right but scans every new message, so you keep a Redis set of senders per user instead, fed by the messaging service's "couldn't deliver" events.
7. Most of those writes repeat a sender already in the set, so a disposable auxiliary store absorbs the repeats with `SET NX`, accepting a little drift instead of a distributed transaction. Lecture 9 then opens Redis itself.

**How hard was it?** Sentences 1–4 came easily: Build 1 has a real plot, and each step's failure is concrete. Sentence 5 was the hardest. Chapter 5 retells only as a list, because nothing in it breaks and nothing drives it. Sentences 6–7 were easy to write but hard to believe: I could say *what* the auxiliary store does, but not convincingly *why* it beats scaling the main cluster, because the page never shows main in trouble. I also couldn't write a sentence joining Build 2 to Build 3, and the hand-off sentence in sentence 7 is wrong about what Lecture 9 does first.

---

## Top 10 fixes, ranked by impact

1. **Give chapter 8's danger a number and answer "why not just scale main?" (8.1, 8.2, 6e).** Show the read and write volume on the main Redis. Then argue blast radius: every badge read depends on main, nothing depends on aux, so the load you can afford to lose goes to the store you can afford to lose. Without this, the lecture's promised payoff reads as doubling the infrastructure to move the same load. Mark any rate "(check source)".
2. **Fix the Lecture 8 → 9 hand-off (8.6, and Lecture 9's "Where you are").** Lecture 9 opens with the analysts' CDC copy, not Redis internals or storage engines. Describe both of its parts, and make Lecture 9's recap line match. Close the profile-page frame in the same paragraph.
3. **Turn chapter 5 into a chain and fix the celebrity contradiction (5a, 5b, 5c).** "Only the owner tags" cannot coexist with "hundreds of people tag a celebrity in one photo". Rebuild the chapter around the schema that keeps breaking: array, then rows (the activity page), then location as fractions (resized copies). Cut the three-hats preamble.
4. **Write a real Build 2 → 3 hand-off (5g, H3).** Replace "the smallest signal of that kind" with the reason: Gravatar twice stored an answer next to the truth for a frequent read, and the red 3 is the extreme case. Give each build a one-line felt problem in the overview.
5. **Remove the overview spoilers (H1, H2).** The header answers the chapter 2 pause ("read the whole users table"). The dek and the chapter 3, 7 and 8 blurbs give away "where active should live", "keep the answer ready" and "put something in front of it".
6. **Resolve chapter 8's two internal contradictions (8b, 8c, 8d).** The "100+" threshold needs a read of main, which 8.4 just ruled out. The clear can't name B's `B_x` keys in the aux store. Add the obvious retry and compensation step before dismissing the distributed transaction.
7. **Fix the badge's definition and pause (6a, 6b, 7b).** The pause asks the reader to guess a designer's choice. "Not unacknowledged" contradicts "a tap acknowledges". And v2 silently stops using `messages` as its truth, which is the real cost and the setup for 8.3's drift.
8. **Fix chapter 3's engine switch and ordering (3a, 3b, 3c, 3d).** Stay on one database for the isolation race. Introduce the locking select in 3.4, not in the 3·c stepper, and cut the prose that repeats steps 4 and 5. Fix the "one visitor at a time" line. Show how one statement carries its own ownership check.
9. **Replace the unbelievable claims with ones the page already supports (2a, 2b, 1b, 5e).** Keep the email because Gravatar had to re-hash from MD5 to SHA-256, not because of collisions. Put the request rate next to the 10,000-row scan. Explain why only 40% of card requests hit. Soften or ground "a daily notification gets an app uninstalled".
10. **Tighten chapter 4 and the small class and voice leaks (4a, 4b, 4c, 4d, 3e, 8e, 8f, and Lecture 7's §9.5 line).**
    - Chapter 4: let Clip 4·1 carry the purge instead of retelling it, give Kafka a reason, answer the browser-cache question with `s-maxage` from chapter 1, and fix "Don't upload, post a message…".
    - Leaks: cut "fifteen cohorts", the join-type aside, the print-statement analogy and the Beauty and the Beast rose, and say the "work that changes nothing" rule once.
    - Lecture 7's §9.5: fix "a badge that tells you a message is unread", which contradicts this page.
