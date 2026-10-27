# Lecture 3 (lec05): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read the lecture in order: `lec05.mdx` frontmatter, `s0-header`, then `c1` to `c9`, plus figure `desc` text where it helped. I did not open the ledger, transcript or fact-check.

## Overall verdict

Build 1, the check-in (chapters 1–3), is very good. It has one concrete problem, real numbers (a handful of seats, 1.7 s, 147 ms, 7,260 evaluations), good pause-and-think prompts, and every section ends on the question the next one answers. Build 2, the key-value store, reads clearly clause by clause, but it has no driving situation. It has no user, no workload and no numbers to match "120 passengers at once", so it reads as a careful design exercise rather than a story. The hand-off between the builds (4.4) explains what carries over but never why you would build a key-value store at all. The page already contains the perfect bridge and doesn't use it: the cinema's ten-minute **hold** has to expire, which is exactly a key with a TTL. Chapter 9 grows the store well, but its centrepiece (a four-key operation) has no source in a single-key API.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 4 | 4 | 4 |
| 1 · 120 passengers tap "check in" | 4 | 3 | 5 |
| 2 · Add two words to the query | 4 | 4 | 4 |
| 3 · Correct, but everyone waits | 3 | 4 | 4 |
| 4 · Where else do 120 people want 120 seats? | 3 | 4 | 3 |
| 5 · Build a key-value store on one table | 4 | 4 | 3 |
| 6 · The key expired at 12:02 | 4 | 3 | 4 |
| 7 · PUT k1 v1, then PUT k1 v2 | 4 | 4 | 4 |
| 8 · What if the store lived in memory? | 4 | 3 | 4 |
| 9 · One MySQL can't keep up | 3 | 4 | 3 |

---

## Frontmatter and header

**F1. The page title spoils the first reveal.** `title: "Locking the airline seats"`. Chapter 1 builds toward "you need a lock" and chapter 2's whole hook is "two words". The title gives the answer away.
Fix: `title: "120 seats, one moment"` (or "Who gets seat 1A?").

**F2. A chapter summary spoils a pause answer.** c4 summary: "the ten-minute payment that must not hold one". That is the answer to the 4.2 pause ("Is that a lock?").
Fix: "Vaccine slots, train seats, cinema tickets: the shape that calls for locks, a seat held for ten minutes while someone pays, and why the second build begins."

**F3. The c7 summary slightly misleads.** "where the check-in's locks come back". In 7.3 the answer is that you build *nothing*, because the upsert locks the row by itself.
Fix: "…and whether two writers on one key need the check-in's locks."

**F4. "Six small versions" can't be counted from the page.** Header: "Six small versions of one booking program". Chapter 1 never numbers its versions. Chapter 2 then says "Approach 4 is approach 3 line for line", chapter 4 says "Approaches 0 to 3 proved the system could fail", and the first recall question says "Approach 3 (first free seat…)". On the page I can find only two no-check versions (passenger picks, system picks at random) plus first-free-seat. That makes three before `FOR UPDATE`, not four. "Approach 3" is used as a term before it is defined, and one approach seems to be missing.
Fix: label them as they appear. In 1.2: "**Approach 0:** the passenger names a seat and the program books it." Then "**Approach 1:** the system picks a random seat…". If there really is an approach 2, show it in one line; otherwise renumber everything to 0–4 and change the header to "Five small versions". In 1.3: "**Approach 3**: ask the database for the first seat nobody holds."

**F5. Header, "Where you are", is good.** It connects to the Lecture 2 clap counter cleanly. No change.

**F6. Build 2's blurb has no hook to match Build 1's.** Build 1 gets 120 people at one moment. Build 2 gets "a query that reads every row when it needs ten". There is no "who needs this store and how big is it?"
Fix: give Build 2 a one-line situation, for example "the store that remembers the cinema's ten-minute holds, or anyone's sessions and rate limits, with millions of keys each living its own number of seconds". Use only workload numbers the lecture actually has.

---

## Chapter 1 · 120 passengers tap "check in" at the same moment

Flow 4 · Clarity 3 · Engagement 5

**1a. The random-seat result is hard to believe.** "The plane comes out mostly empty, and two passengers each hold a pass for 7E." Fig 1·c: "Most of the plane is still empty, and 7E and 12E were each 'booked' by two passengers." 120 random picks over 120 seats should fill about 76 distinct seats (about 63%) and produce dozens of collisions. "Mostly empty" with only two doubled seats contradicts the arithmetic. An engineer who knows the birthday problem stops trusting the run here.
Fix: report what the run actually showed in counts, for example "76 seats filled, 44 empty, and dozens of seats with two or more passes; the map rings two of them". If the figure is only illustrative, say so in the caption ("two of the doubled seats ringed"). Then use the number as plot: "A random function called 120 times returns only about 76 different seats."

**1b. "Of the five tables" lists only four.** "Of the five tables, only one matters here." The prose names airlines, flights, trips and seats.
Fix: "Of the five tables (airlines, flights, trips, users, seats), only one matters here."

**1c. The approach code reads a value it never uses.** `txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID)`. The result is thrown away, and a reader wonders why it is there.
Fix: comment it: `// reads the seat, but never looks at user_id`. That also sets up the "no checks" point.

**1d. 1.4 repeats the stepper's step 3.** "Look at step 3 again. The slow passenger moved on to 1B, and the code had nothing to do with it… The condition moved it on, not the code." Step 3 of Fig 1·d already says exactly this, and recall question 1 says it a third time.
Fix: open 1.4 with the new idea instead: "The slow passenger moved on to 1B because its read came after a commit. That makes commit the hinge of the whole story." Cut "The condition moved it on, not the code."

**1e. The snapshot sentence is the densest one in the chapter.** "In MySQL's default isolation level, a transaction's plain reads all come from a snapshot taken at its first read, and here the SELECT is that first read, so a commit that landed before it is visible and one that landed after it is not." "Snapshot" arrives unexplained, and the sentence carries three ideas.
Fix: "Each transaction reads the database as it stood at its first read. Here that first read is the SELECT. A commit that landed before it is visible; one that landed after it is not."

---

## Chapter 2 · Add two words to the query. What happens to the 120?

Flow 4 · Clarity 4 · Engagement 4

**2a. A class voice leaks.** Pause wrong-answer text: "That was a popular guess. The run said otherwise." "Popular" with whom? It points at a class the reader never attended.
Fix: "Plausible, but the run said otherwise."

**2b. The timings contradict each other slightly.** Pause answer: "1.25 s, 1.73 s and 1.79 s on three runs". Later: "about 1.7 seconds to seat 120 people", and 4.3: "from 1.7 seconds to 147 milliseconds".
Fix: "1.25 to 1.8 seconds over three runs" in the reveal, and "about 1.7 seconds on a typical run" later.

**2c. A reference points at something never shown.** "Whichever transaction the engine schedules first takes the next seat, which is why 1A went to some passenger other than user 1." The reader was never told who got 1A.
Fix: put it in the run reveal: "…in seat order, 1A, 1B, 1C, though 1A went to user 37, not user 1." Use the real number from the run.

**2d. The shared-lock paragraph is a detour.** "The other kind is the shared lock… checking that a parent row exists before inserting its child." The check-in never uses `FOR SHARE`, and it is never needed again apart from one deadlock sentence.
Fix: move it into a "Go deeper: FOR SHARE" box, and keep one sentence in the main text: "Its sibling, FOR SHARE, lets many readers hold a row at once; the check-in doesn't need it."

**2e. The clap example lacks context.** "Two claps that must make 102".
Fix: "Two claps on a post at 100 that must make 102 (Lecture 2)".

**2f. The 7,260 count is said twice.** Stepper step 5: "For 120 passengers that is 7,260." Then 2.4 repeats the full derivation: "N + (N − 1) + … + 1 = N(N+1)/2 … 7,260 for one flight."
Fix: end step 5 at "3 + 2 + 1 = 6 for three transactions", and let 2.4 make the 7,260 reveal: "Scale that to 120 and the worst case is 7,260 evaluations." The number then lands once, where it drives the cost question.

---

## Chapter 3 · Correct, but everyone waits in line. Must they?

Flow 3 · Clarity 4 · Engagement 4

**3a. A page-level detail implies the wrong cause.** "The engine reads a whole disk page at a time, one B+ tree node that may hold hundreds of rows. When the first matching row on it is locked, the engine simply moves to the next one…" B+ tree is unexplained, and the sentence suggests that pages are why skipping is fast. The real reason is the next sentence: nobody waits.
Fix: cut the page sentence. Keep: "At a locked row the engine simply moves to the next matching row and locks that instead. Nobody waits for anybody, so there is no queue to drain: about 120 evaluations instead of up to 7,260."

**3b. BookMyShow is introduced twice.** In 3.3 it appears as "cinema booking on BookMyShow", and in 4.1 as if new: "On BookMyShow a screen has a fixed number of seats and people pick specific ones".
Fix: in 3.3, write "Airlines that let you choose your seat". Leave BookMyShow to chapter 4.

**3c. NOWAIT has no situation from the story.** "Sometimes there is no point in waiting at all: if someone else holds the row, someone else is dealing with it." I could not picture when this happens at a check-in kiosk.
Fix: add one concrete case first, for example "A passenger double-taps seat 67 and two requests race. The second should fail at once, not wait 50 seconds to learn the first one won." Or: "Two workers pull the same refund job; the second one should just move on." Then state the rule.

**3d. "Two usual causes" lists four.** "There are two usual causes. Either the holder really is doing long work… or the work finished and the code forgot to commit or abort. A transaction left open in some other session, or a long queue of waiters on one hot row, does it too."
Fix: "The usual causes: the holder is doing long work while holding the lock (raise the timeout or shorten the work); the code forgot to commit or abort; a transaction was left open in another session; or a long queue built up on one hot row."

**3e. The deadlock is abstract.** "Give each transaction two rows to lock, and that guarantee goes." The chapter leaves the seats exactly when a seat example would make the danger real.
Fix: "Say two passengers agree to swap seats. One transaction locks 12A, then 14C; the other locks 14C, then 12A." Then run the clip, and keep the "same order" defence tied to the swap: "lock the lower seat number first".

**3f. The last paragraph previews something not yet introduced.** "One engineer's first key-value store hit a string of deadlocks…" The key-value store hasn't been introduced, so this reads as a spoiler and a non-sequitur.
Fix: "One engineer's first storage project hit a string of deadlocks, then throughput problems…", or move it to chapter 7.3, where locks return in the store.

**3g. Structure.** Five sections, each introducing a tool, make 3.4 and 3.5 feel like a catalogue. The passengers vanish after 3.3. Fixes 3c and 3e bring them back.

---

## Chapter 4 · Where else do 120 people want 120 seats?

Flow 3 · Clarity 4 · Engagement 3

**4a. The rule is stated three times in a row.** "That combination is what forced the lock." Then the rule box: "Fixed inventory + contention = locking." Then the box body: "When you see that shape, the first thing that should come to mind is a lock."
Fix: cut the first sentence of the box body. Keep the rule and "When you see that shape, think lock first."

**4b. The hedge undermines the example.** "That is an inference from the shape, not from seeing its code."
Fix: "IRCTC… is exactly this shape, and a relational version of it would lean on `SKIP LOCKED` for throughput."

**4c. The hold relies on a column the schema doesn't have.** "A short transaction takes the lock for a moment, marks the seat as on hold, and commits." Fig 4·b: "a status in the row". The seats table in chapter 1 has only `user_id`.
Fix: "…marks the seat as on hold (a `status` column, HOLD, plus a `hold_until` time) and commits."

**4d. The hold's ending is left unanswered, and it is the hand-off.** "What happens after the payment belongs to a separate design, built around that hold." Any reader asks right away: what if they never pay? Who frees the seat after ten minutes? The page drops the question. Build 2's central problem (a value that must disappear on its own after N seconds) is the answer to it.
Fix: "And if the payment never comes? Ten minutes later the hold must vanish by itself, without anyone deleting it. Keep that question. It is the second build." Then 4.4 and 5 can open with "a store where every entry has its own lifetime".

**4e. "Do relational databases scale" arrives unmotivated.** "You will hear that relational databases don't scale." Nothing in the story raised scale.
Fix: lead in from the numbers: "1.7 seconds to 147 ms on one MySQL, with two words. So where does 'relational databases don't scale' come from?"

**4f. The hand-off says what carries over but not why.** 4.4 explains the habit that carries over, but never why the next build is a key-value store.
Fix: add the reason, for example "Every system you design leans on one: holds, sessions, caches, rate limits. It is small enough to build in an afternoon, and on MySQL every decision is a clause you can read." Combine this with 4d.

---

## Chapter 5 · Build a key-value store on one table. How does a key expire?

Flow 4 · Clarity 4 · Engagement 3

**5a. The build has no driving numbers.** Build 1 had 120 / 1.7 s / 147 ms. Build 2's only scale is "millions of keys" inside a pause prompt. Nothing like "X keys, Y expire per minute" makes the full-scan cost bite.
Fix: state a working size once at the top of chapter 5, taken from the lecture if it exists, and reuse it in 5.2's pause: "a full scan of 50 million rows every 10 minutes, forever".

**5b. The figure caption gives away the fix.** Fig 5·b sits between the pause and "The root problem is the computation", and its caption says: "Right: a stored expired_at turns cleanup into a range on an index". The reader sees the fix before the paragraph that discovers it.
Fix: move Fig 5·b below the `expired_at` code block, or change the caption to describe only the left panel until after the reveal.

**5c. The value-type detail is off the road.** "If users may query inside a value, say a field of a JSON document… generated column that extracts the field." The `BLOB` size classes are similar. Neither is needed for the story.
Fix: collapse both into "Go deeper: typing the value". Keep one sentence in the main text: "This store only ever looks things up by key, so the value is a black box: a BLOB."

**5d. The "far-future, not NULL" rule is given without its first reason.** "decide now what a key with no TTL holds: not NULL, but a far-future value, so that every comparison with now() still gives the right answer." The most obvious failure (GET's `expired_at > now()` would hide every no-TTL key) is never stated. 6.3 gives only the DELETE case, and the 7.4 table mentions GET in passing.
Fix: in 6.1, after the GET query, add: "This is where NULL would bite: `NULL > now()` is never true, so every key without a TTL would vanish from GET."

**5e. Hedging undercuts the batching argument.** "Engines like InnoDB soften this by only marking the row deleted and purging it later in the background, but batching the cleanup into one indexed sweep still reduces the work." If the engine already defers deletes, why batch? Chapter 8 rests on "a delete on disk is expensive".
Fix: name what batching saves concretely: "One indexed sweep replaces thousands of separate statements, each with its own trip to the database, its own transaction and its own random page writes."

**5f. The integer type is asserted here and justified a chapter later.** "Store expired_at as an integer, epoch seconds" gets its reason only in 6.2 (−1).
Fix: add "(you'll see in chapter 6 why an integer beats a TIMESTAMP)".

**5g. The 12:04 cliffhanger is good.** No change.

---

## Chapter 6 · The key expired at 12:02. The cleanup runs at 12:10.

Flow 4 · Clarity 3 · Engagement 4

**6a. A figure appears in the wrong place.** Fig 6·b "Batch deletion with a cron job" appears after the GET clause. It illustrates the 5.3 window, which has no figure of its own.
Fix: move Fig 6·b to the end of 5.3, just before "A GET for that key arrives at 12:04."

**6b. The clip retells what the prose already told.** Clip 6·1 comes at the end of 6.3, after GET, DELETE and the already-expired case are fully explained. The brief asks for one representation per idea.
Fix: place the clip at the top of chapter 6, as the picture of the window with the questions unanswered ("What does each operation do here?"), or cut it and keep the prose.

**6c. The "why must delete write anything" answer is incomplete, and it confuses.** "You might ask why the delete has to write anything. Why not let the batch job notice? Because a key with no TTL never expires." Even a key *with* a TTL would keep answering GETs until its expiry, because the batch job cannot know a user deleted it. The main reason is missing.
Fix: "Because nothing else knows the user deleted it. Without the mark, GET keeps returning the key until it expires, and a key with no TTL never would."

**6d. The scenario and the code disagree.** "A user deletes `k2` at 12:05." The code below uses `WHERE \`key\` = 'k1'`.
Fix: use `'k2'` in the 6.3 code block.

**6e. The DELETE argument is undercut again by hedging.** "The engine buffers those page changes rather than writing them to disk on the spot, but they are still work, and this clause removes them."
Fix: "That is two writes saved per such delete: the row, and its entry in the expired_at index."

**6f. The Apache Ignite story is vague.** "In Apache Ignite's code it looked pointless, until a load test that mimicked real traffic showed what it saves." Whose load test, and what did it show?
Fix: tell it as a story with the one number if one exists: "One engineer reading Apache Ignite's source thought this clause was pointless, until a load test with real traffic showed deletes of already-expired keys were a large share of all deletes." Otherwise cut it to "Apache Ignite's source has exactly this clause."

**6g. "Changes nothing that matters" needs one more word.** "rewrites expired_at from 12:02 to −1, which changes nothing that matters". It is true, but the reader needs to hear that it is still a disk write.
Fix: "…which changes nothing that matters, yet still costs a row write and an index write."

---

## Chapter 7 · PUT k1 v1, then PUT k1 v2. What breaks?

Flow 4 · Clarity 4 · Engagement 4

**7a. The check-in race is missed.** "Read the key, then UPDATE if it exists and INSERT if it doesn't? That works, and turns every put into a get plus a put." It doesn't fully work. Two PUTs of a new key both read "absent" and both INSERT, which is the check-in race from chapter 1.
Fix: "That mostly works. It turns every put into a get plus a put, and two puts of a new key can both read 'absent' and both insert, which is chapter 1's race in a new shape." This also makes 7.3 land better.

**7b. REPLACE INTO's cost goes unsaid.** "REPLACE INTO also works, but it deletes the old row and inserts a new one." In a chapter about costs, the "but" has no payoff.
Fix: "…which is two writes and an index update where one would do."

**7c. The trip count invites a quibble.** "four trips across the network" against "one request and one response". Readers think in round trips.
Fix: "two round trips against one" in the prose and the caption, with "four crossings" as a parenthetical if needed.

**7d. Wrong dialect.** "check existence with `SELECT TOP 1 1 … WHERE key = ?`". `TOP` is SQL Server syntax, in a MySQL story.
Fix: `SELECT 1 FROM store WHERE \`key\` = ? LIMIT 1`.

**7e. The upsert syntax is version-specific.** `VALUES (...) AS new` needs MySQL 8.0.19 or later.
Fix: add a code comment: `-- MySQL 8.0.19+; older versions use VALUES(value)`.

**7f. 7.4's closing paragraph is the best transition on the page.** No change.

---

## Chapter 8 · What if the store lived in memory?

Flow 4 · Clarity 3 · Engagement 4

**8a. The opening question is only half answered.** "The batch job, the clause on every read and the −1 marker were all answers to the cost of the disk. Which of them survive?" The chapter answers for the batch job only. The GET clause and the −1 marker are never revisited.
Fix: add to the end of 8.1: "The GET clause turns into this lazy delete. The −1 marker disappears: in memory a DELETE just removes the key. The batch job is the one piece that survives, in a new form." That also sets up 8.2.

**8b. A claim that is hard to believe.** "Most expired keys do get read again, and get deleted on the spot. One rough estimate puts lazy deletion's share near 90%." Whose estimate, for what workload? Many caches write keys that are never read again.
Fix: cut the number, or ground it: "In a typical cache, most expired keys are asked for again…". Better, make the argument without it: "The job only has to deal with keys nobody asks for."

**8c. The fact is stated twice: the old Redis rule, then the current one.** The text gives "As first designed… went again if more than 25%…", then the clip uses 25%, then "Current Redis (6.0 and later)… more than about 10%… walks the keys with a TTL in batches". This is the claim-then-correction pattern the brief forbids. "Walks… in batches" also contradicts "picked 20 random keys", and 8.3's argument rests on randomness ("20 random keys on disk means 20 random disk reads").
Fix: teach one version. Either describe the sampling idea in general terms ("check a small batch, delete the expired ones, go again while too many were expired, stop at a time budget") and give the current numbers once, or keep the classic random-sample version and drop the 6.0 paragraph to a one-line Go deeper. Rewrite 8.3 so it doesn't depend on "random" if the current version walks.

**8d. The exception sits awkwardly.** "Very large values are the exception: freeing one can block the server, so Redis can free those on a background thread instead." It comes straight after "Redis doesn't hand those deletes to a background job".
Fix: put it in a parenthesis after the rule paragraph: "(Redis can hand very large values to a background thread, the one case where freeing isn't cheap, which proves the rule.)"

---

## Chapter 9 · One MySQL can't keep up. What do you add first?

Flow 3 · Clarity 4 · Engagement 3

**9a. The list of loads repeats itself.** "'Load' isn't only the number of queries or the amount of storage. It can be network traffic, disk, the size of the data, or the number of queries fired".
Fix: "'Load' can be any of: queries per second, data size, disk IO, or network traffic. Any one of them can be the limit."

**9b. A figure is missing.** 9.1 describes the load balancer, the API servers and the cleanup job in prose, but no figure is shown. `s5-distributed.tsx` has a figure for exactly this.
Fix: show that single-node architecture figure in 9.1.

**9c. The stock-price example comes from nowhere.** "Someone asks for Google's current stock price." Stock prices have never been this store's job.
Fix: "A GET for the key `google` arrives. The API server sees it starts with g…"

**9d. A second unsourced "about 90%".** "by one estimate about 90% of sharded databases work this way". After 8.2's "near 90%", this reads as invented.
Fix: "Most sharded relational setups in practice use fixed ranges like this, because few systems need to add or remove shards on the fly."

**9e. The four-key operation has no source.** "look at an operation that touches four of them". The store's API is GET, PUT and DELETE on one key. The reader asks: what operation?
Fix: introduce it: "Say you add a multi-key PUT, `MSET k1 v1 k2 v2 k3 v3 k4 v4`, that must apply all or nothing. Three keys live on master 1, one on master 2." Or reuse the check-in: "a family of four checking in together, whose seats live on two shards".

**9f. The ending never returns to the 120 passengers.** The bullet list does, but the prose ending doesn't.
Fix: one line in 9.4: "…where a transaction and its row locks still work exactly as they did for the 120 passengers."

**9g. The Lecture 4 hand-off question is weak.** "starts there: the non-relational families… Then it puts them to work on Slack" reads as a table of contents.
Fix: end on a question: "What did Redis and DynamoDB give up to be fast and big, and when is that trade worth it? Lecture 4 asks it about Slack: one message, every member of a channel, the moment it's sent."

---

## Retelling in 7 sentences

1. 120 passengers check in at the same moment, and the obvious booking code (pick a seat, or take the first free one) double-books, because every transaction reads 1A as free before anyone commits.
2. Adding `FOR UPDATE` locks the row being read, so the others wait. When the holder commits, each waiter re-checks its WHERE and moves on to the next free seat: all 120 are seated correctly, but slowly (about 1.7 s, up to 7,260 re-checks).
3. When any free seat will do, `SKIP LOCKED` walks past locked rows (147 ms). A seat the user chose needs a plain `FOR UPDATE` on that seat, `NOWAIT` fails at once when waiting is pointless, and deadlocks come from taking locks in different orders.
4. Fixed inventory plus contention means locking (vaccine slots, trains, cinemas), but you never hold a lock across a payment: you lock briefly and mark the seat as on hold.
5. Then you build a key-value store with TTLs on one MySQL table: store an indexed absolute `expired_at`, sweep expired rows with a batch job, filter expired keys in GET's SQL, delete by setting `expired_at = -1` only for live keys, and replace read-then-write with one upsert.
6. In memory (Redis), deletes are cheap, so expired keys are deleted on access and a sampling job catches the rest, while on disk the cheap shape is the batch sweep.
7. To grow the store, add API servers, then read replicas when reads dominate, then range shards with routing in the API servers, accepting that ACID holds only inside a shard, which leads into the non-relational stores of Lecture 4.

**How hard was it?** Sentences 1–4 were easy: Build 1 has a spine and the numbers stick. Sentences 5–7 were harder. Build 2 retells as a list of clauses rather than a plot, because nothing drives it. I could not say in one sentence *why* we built the store, and the hand-off from the check-in to the store was the hardest join to write. Chapter 8's sampling rule (25% or 10%? random or walking?) was the one fact I wasn't sure I had right.

---

## Top 10 fixes, ranked by impact

1. **Give Build 2 a driving problem and make the hand-off real (4.2, 4.4, 5 opening, header).** Answer the question the hold raises ("who frees the seat if payment never comes?") with "a value that disappears by itself after N seconds", which is the key-value store with TTL. Add one working size (keys, expiry rate) and reuse it in 5.2 and 5.3.
2. **Define and fix the approach numbering (1.2, 1.3, 2.1, 4, recall Q1, header "six versions").** Label each approach where it appears, and make the count match. "Approach 3" is currently used before it is defined, and one approach seems missing.
3. **Correct the unbelievable random-seat run (1.2 prose and the Fig 1·c caption).** 120 random picks over 120 seats fill about 76 seats with dozens of collisions, not "mostly empty with two doubles". Report the real counts and use them as plot.
4. **State Redis expiry once and consistently (8.2, 8.3, Clip 8·1).** Drop the 25%-then-10% retelling. Reconcile "random sample" with "walks the keys in batches" so that 8.3's disk argument still holds.
5. **Motivate the four-key operation in 9.4.** The API is single-key. Introduce a multi-key PUT (or a family checking in together) before asking about cross-shard ACID.
6. **Fix the DELETE reasoning in 6.2.** The real reason a delete must write is that otherwise GET keeps returning the deleted key. Add the NULL-breaks-GET sentence to 6.1 (5d), and fix the k1/k2 mismatch in 6.3.
7. **Repair figure placement and repetition.** Move Fig 6·b to the end of 5.3. Move Clip 6·1 to the top of chapter 6 or cut it. Move Fig 5·b after the reveal. Keep the 7,260 reveal in 2.4 only. Trim the 1.4 retelling of stepper step 3.
8. **Add the hold's missing schema and its ending (4.2).** Name the `status` / `hold_until` columns the seats table never had, and close the "what if they never pay?" loop (this pairs with fix 1).
9. **Cut or ground the two "about 90%" claims and the hedges (8.2, 9.3, 4.1 IRCTC, 5.3 InnoDB, 6.3 buffering).** State the true reason plainly, as the brief asks, instead of an estimate or a qualifier that undercuts the argument.
10. **Remove spoilers and class leaks:** the page title "Locking the airline seats", the c4 summary ("must not hold one"), the c7 summary ("locks come back"), and "That was a popular guess". Also bring the passengers back into 3.4 (NOWAIT) and 3.5 (a seat swap for the deadlock), so chapter 3 stays a story instead of a catalogue of tools.
