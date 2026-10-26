# Reader review: Lecture 01 "Green dots and blog rows"

Reviewer stance: working engineer, never saw the class. Read s0 + c1..c8 in order, then about 15 screenshots (overview, chapter tops and middles, phone 390 px, dark/light), and only then `lectures/STORY_BRIEF.md`.

Overall: the first half (ch1–5) reads like one story. Each chapter opens on the problem the previous one left behind, the numbers work as plot (8 GB, then 6M writes, then 1,000 connections) and the "so far" diagram helps. The second half (ch6–8) is a good tour of three schema/caching decisions, but it is three essays more than one story, and ch7 never pays off its own title. The two biggest problems are not about prose. (a) After ch3 picks **managed Redis**, ch4–5 quietly switch to PostgreSQL facts (process per connection, `max_connections` 100) without saying which store has the 1,000-connection limit. (b) Several titles answer the pause-and-think directly below them.

---

## 1. The lecture in 7 sentences (after one read)

1. A green "online" dot built from login/logout calls lies as soon as a laptop dies, because a client can't announce its own death and a server can't pull a laptop over plain HTTP.
2. So clients push a heartbeat every 10 s, the store keeps the time of the last beat, 30 s of silence means offline, and since the data is tiny (8 GB for a billion users) you can let "no row" mean offline.
3. Instead of a cron job to delete silent rows (another box to run and be paged for), you pick a store with a native TTL, so Redis or DynamoDB.
4. Both work, so you decide on who operates it, lock-in, what the feature needs next and expiry notifications, and write down "managed Redis" with its limits.
5. The real load is writes (1M online × 6 beats a minute = 6M a minute), and on tiny writes the TCP/DB connection setup dominates, so you keep a pool of open connections.
6. Pools across a fleet must fit inside the database's connection limit (per-server max = limit ÷ most servers), or the servers a spike adds get nothing. The same heartbeat pattern also runs cluster membership and load balancers.
7. Then a blog: soft delete for recovery, archive and audit, then archive and hard delete in batches; keep rows small (big text out of line, dates in a format chosen for the query); a cache is anything that saves a disk read, network call or computation, and a shared cache-aside copy rescues the viral post. Lecture 2 picks up where else copies can live.

**Verdict:** easy for the dot. Sentences 1–6 came out without effort and in order. Sentence 7 had to cram the whole blog because I could not find one driving problem that links delete, row layout and cache. They feel like three separate prompts ("deleted by mistake", "home page slow", "viral"), and I could not say what the blog build as a whole was *for*. That is the gap.

---

## 2. Flow: where a paragraph did not follow, where I lost the thread

### Header (s0)
- Strong first screen: "the first version you would naturally write will lie" is a great hook.
- "What you'll build" then states every answer in advance: "a heartbeat every 10 seconds, a store that forgets a user 30 seconds after the last beat, a reasoned pick between Redis and DynamoDB, and a connection pool sized so that a traffic spike does not lock out the servers you add." See Spoilers.
- "A table in a figure only shows a schema, not a relational database." I had to re-read this and still don't know what it warns me about. It sits oddly in "Before you start".
- "Build the core yourself … building it shows you where a design falters." This is an exhortation with no pointer to what to build or when. It reads like a leftover.

### Ch1
- Intro, para 2 ("Where do you start? Not with boxes … When you have built something like this before, growing outward from a known core is the quickest route … When you haven't, you would instead ship the simplest whole system …"). This is methodology before I care about anything. I re-read it twice. It interrupts the battery hook.
- 1.1: "Pick the tool for the property you need, not the tool you happen to like: a team that isn't on AWS can't use DynamoDB however much it likes it." This is an unmotivated jump. DynamoDB has not been introduced, and the tool-choice moral belongs to ch3.
- 1.2: the pause answer ("The 'offline' call never leaves the machine…") is followed immediately by "Step through it and watch where the lie comes from." The stepper then retells the same thing in four steps. That is the same idea twice in a row. Step 5 also gives away the fix before 1.3 asks for it.
- 1.3 → 1.4: good. "Before taking it, try the fix most people reach for first" is a real reason-transition.
- 1.4 ends well ("the boolean in the store can't hold it").

### Ch2
- Flows well. 2.2 ("Before you optimise anything, measure it") is slightly unmotivated, because nothing yet asked for optimisation. It works because 2.3 uses it.
- 2.2 end: "It doesn't need shrinking, but ask anyway. At every step, ask: can I change this…" reads as a sermon. The reason to shrink (it simplifies the read rule and makes TTL possible) only becomes clear in 2.4.
- 2.4: "The details differ between the two, and both are traps." Good. The DynamoDB "within a few days" point is then repeated in 3.4 and in the 3.5 table, so I read it three times.

### Ch3
- 3.1 → 3.2 → 3.3 → 3.4 is a checklist rather than a chain. Each section is "another criterion", and none raises the next.
- 3.3 is the clearest "list of facts" in the lecture: Bengaluru food delivery, then Walmart, then $10M vs $10k, then Netflix, then "if your company will never leave…", then the orphan one-liner "Hiring adds to the pull towards open source…". By Netflix I was skimming.
- 3.4: "Before you decide, go deep on each candidate … The database is the most critical and most brittle part of your system." This is a sermon dropped mid-section. Then "One 'next' is close at hand" moves into keyspace notifications, which this design never uses again. It feels like a detour.
- 3.5 ending is excellent ("a number appears that is much scarier than 8 GB").

### Ch4
- 4.1: "A million users are online at once." Ch2 assumed **100,000** online (800 KB). The jump to a million is never acknowledged, and I scrolled back to check.
- 4.1, para 3: "A disk-based relational database committing 100,000 durable single-row updates every second … many teams would build this table on exactly that kind of database". This is the moment the story silently changes the store from the one ch3 chose. From here ch4–5 are about PostgreSQL-style connections.
- 4.2 → 4.3 → 4.4 flows nicely ("Nothing forces a connection to close…").
- 4.4: the pool is shown four times: Clip 4·1, Fig 4·b, the Python code and Stepper 4·c. Fig 4·b and the code say the same thing.

### Ch5
- 5.1, para 3 ("There are only four things that can run out on a machine…") is a good idea, but here it is a tangent. It pays off in ch8 8.1, which is nice.
- 5.2: the pause, then Fig 5·b whose caption restates the answer, then "A misconfigured pool quietly caps…". The answer is told three times in a row.
- 5.4 "Where else have you seen this dot?" is a pleasant step back, but it comes *after* the pool chapter. It would land better at the end of ch2/3, where the pattern is fresh. Here it separates the pool climax from the hand-off.

### Ch6
- Opening: the title promises a story ("A writer deletes a post by mistake. Can you give it back?"), but the chapter opens with a recap of the dot, then the method, then 6.1 "You are handed two tables". The mistaken-delete situation only appears in 6.2. "You are handed" is passive: nobody wants anything yet.
- Fig order differs from every other chapter: the schema (Fig 6·a) comes before the "so far" (Fig 6·b).
- 6.3: "An interviewer once asked how to handle 'the downtime' while such a job runs…" is an aside that breaks the batch-delete flow.
- 6.3, last para: the job "holds a connection or two from the pool you sized in chapter 5". That pool was for the presence store, not the blog database. I stopped here.
- 6.4 GDPR (one month + two, backups age out) is legal detail the brief says to cut or box. The Go-deeper box then adds more GDPR.

### Ch7
- The title and intro promise a slow home page. The chapter never shows it being slow or what made it slow. 7.1 is about storage layout. 7.2 concludes "The lesson is not 'native is slow'." 7.3 is a 2016 Redbus story about a different table. The end says "The home page is fast again." Nothing I read made it fast again. This is the weakest link in the chain.
- 7.2 → 7.3 contradiction: 7.2 says the major engines store dates in compact binary and "index them well". 7.3 says YYYYMMDD, "against the original date-time column, … buys speed". Which is it? I re-read both.
- 7.4 range and time zones is a list of trade-offs. It works with the table but has no forward pull.

### Ch8
- Good opening; this problem is concrete.
- 8.1 → 8.2 → 8.3 flows. 8.3's "So why use Redis at all?" is a real question.
- 8.4 recap then 8.5 "Your turn" is a fine ending.

---

## 3. Clarity

**Terms used before they are explained**
- "DynamoDB" in 1.1, before any store is introduced.
- "TTL" in the header's "What you'll be able to do", defined only in 2.4.
- "HyperLogLog, Bloom filters, geospatial indexes" (3.4), "Streams and Lambda" (3.4), "binlog", "Debezium", "change-data-capture" (3.5 box), "MQTT" (1.3 box). These are name-drops with no gloss. Fine in boxes, but not in 3.4 main text.
- "cache-aside" is defined; "CDN" (8.5) is not, which is acceptable for this reader.
- "row-oriented database" (7.1) is used as if known.

**Unclear sentences**
- s0: "A table in a figure only shows a schema, not a relational database."
- 4.2: "By the simple count, that is five network trips around a single request and its reply." Five of what? A 3-way handshake is 3, the teardown is usually 4, and request + reply is 2. I could not reproduce 5. 4.3 then says "The five trips are gone", but the request and reply are still there.
- 1.1: "When you haven't, you would instead ship the simplest whole system and fix what breaks under load." The choice between the two approaches is never used again.

**Numbers that don't add up or don't line up**
- Online users: 100,000 (2.3, Fig 2·c) vs 1,000,000 (4.1) with no bridge.
- 1.4: "two lost beats in a row still leave a live user green, and a third turns them grey". With 10 s beats and a 30 s TTL, the key expires at exactly the moment the third beat is due, so two lost beats plus a little jitter already turns a live user grey. This is true only at the boundary.
- Viral traffic: "running a million times" (end of ch7) vs "thousands of times a minute" (ch8 intro).
- 5.1: "PostgreSQL's max_connections is typically 100" vs the 1,000 limit in 5.2. That's fine as an example, but which database is it? The chosen store is managed Redis, whose ceiling is a different setting and order of magnitude. The reader is never told that ch4–5 assume a relational store.
- 2.2: "a 4-byte timestamp" then 7.4: a 4-byte epoch dies in 2038. Consistent, and nice. But 2.2 could add "(we'll see why that's risky in ch7)".

**Figures vs text**
- Fig 4·a caption: "the store is chosen, Redis or DynamoDB", and the diagram label says "redis or dynamodb". Ch3 just chose *managed Redis*, so the "so far" picture lags the decision.
- Fig 1·c step 5 shows the heartbeat fix in a chapter that is still asking what to do (seen dimmed but readable in `1440-light-1-still-green-mid.png`).
- Fig 2·c caption uses the 800 KB number from the *next* section.
- 7.1 / Fig 7·b: "The home page shows titles and excerpts, not bodies, so its query never touches the out-of-line text". But the ch7 intro says the home page shows "the first few lines", and with this schema those come from `body`. The image isn't in the schema either.

**Can't do it without the class**
- Nothing blocks a reader outright, and there are no class/teacher leaks (grep is clean). Two anecdotes are vague: "One engineer who did this exercise took an idea back to work at a large bank…" and "An interviewer once asked…". They read like class stories with the context removed.

---

## 4. Spoilers

| Where | What it gives away |
|---|---|
| Overview subtitle: "survives six million heartbeats a minute" | the ch4 pause answer |
| s0 "What you'll build", Build 1 paragraph | the 10 s heartbeat, 30 s expiry, Redis vs DynamoDB, and that the pool/spike is the trap: i.e. the answers to the pauses in ch1, ch2, ch3 and ch5 |
| Overview chapter list, ch3 blurb: "Persistence and speed don't decide it; who runs it, lock-in, next year's needs and expiry events do." | the ch3.1 pause answer |
| Ch1 Fig 1·c step 5 ("Replay with a beat every 10 s … after 30 s of silence…") | the 1.3/1.4 fix, before 1.3 asks "why can't the server just ask?" |
| Ch4 title "Six million heartbeats a minute" | the exact answer to the 4.1 pause ("How many writes per minute?" with 6 million as an option) |
| Ch5 title "…Why do they get nothing?" and 5.2 title "Twenty new servers, zero connections" | the 5.2 pause answer, printed as a heading right above the question |
| 8.1 title "Is a cache just data kept in RAM?" | leading; mild |
| Fig 2·c caption | 800 KB from 2.3 |

**Answers repeated right after a pause:** 1.2 (the stepper replays the answer), 2.2 (the next para and the Fig 2·c caption restate 8 GB), 5.2 (the Fig 5·b caption plus the next paragraph restate it). 7.3 is clean: the next paragraph moves on.

---

## 5. Hand-offs

**Ch5 → ch6.** Partly motivated. The end of ch5 is good: "Notice what it never had to answer: what a deleted row should mean, what goes inside a row, or how a copy of data can save work … Most data isn't like that." The ch6 opening ("They store things people wrote and care about") answers it. But the *why* is a curriculum reason, not a story reason: nothing in the dot's story requires a blog. And ch6 then drops the reader into "You are handed two tables" instead of the situation in its own title. It feels like "and now a blog". It needs one concrete moment, the mistaken delete, as the first thing in ch6.

**Ending → Lecture 2.** Good. "Your turn" plus the Fig 8·d tags, and "Lecture 2, 'Medium under load', opens with exactly this question on the same blog … Bring your list." That is a real set-up. Small issues: the "large bank" anecdote is vague, and "the four topics this lecture left out: scaling, delegating work, concurrency and communication" is the first time I heard of four topics. Fine, but it could connect to the ch4 sharding promise ("sharding … come in Lecture 2").

---

## 6. Scores (1–5) and length

Word counts: prose estimate excludes markup, imports and comments but includes captions, steps and pause text roughly; raw `wc -w` of the file is in brackets.

| Chapter | Clarity | Flow | Memorability | Words (prose est. / raw) |
|---|---|---|---|---|
| s0 Header | 4 | 4 | 4 | ~500 / 570 |
| 1 Still green | 4 | 4 | 5 | ~1,200 / 1,515 |
| 2 Silence | 4 | 4 | 4 | ~1,100 / 1,526 |
| 3 Which store | 4 | 3 | 4 | ~1,350 / 1,800 |
| 4 Six million | 3 | 4 | 4 | ~1,150 / 1,481 |
| 5 Spike | 3 | 4 | 5 | ~1,100 / 1,453 |
| 6 Delete | 4 | 3 | 4 | ~1,300 / 1,570 |
| 7 Home page | 3 | 2 | 3 | ~1,200 / 1,587 |
| 8 Viral | 4 | 3 | 4 | ~1,400 / 1,861 |
| **Avg (ch1–8)** | **3.6** | **3.4** | **4.1** | ~9,800 prose total |

Within the brief's 8–12k and 900–1,800 per chapter. The reading times shown (6–9 min) look honest.

### Check against STORY_BRIEF
- 1 Driving problem in first screen: **yes** (dead battery). Two builds announced: yes. Real hand-off: **weak** (see §5). Every chapter moves the problem: ch1–5 yes; ch7 no.
- 2 Every paragraph earns the next: mostly in ch1–2 and ch4–5; broken in 3.3, 3.4, 6.3 asides and 7.2→7.3.
- 3 One voice / no class leaks: **pass** (grep clean). Two class-flavoured anecdotes remain vague.
- 4 State facts once, confidently: mostly. But DynamoDB TTL lag appears three times, and 7.2 vs 7.3 contradict each other on date speed.
- 5 Protect the reveal: **fails** in the header, ch4 title, ch5/5.2 titles and Fig 1·c step 5.
- 6 Pictures: plenty. But it breaks "one representation per idea": the pool is shown by clip, figure, code and stepper; TTL by figure and clip; the battery by pause and stepper.
- 7 Numbers as plot: very good in ch2→4→5. 100k vs 1M inconsistency.
- 8 Length/off-road: GDPR detail in main text (6.4) and keyspace-notification config (3.4) are off-road.
- 9 Connect the course: first lecture, said so; ending sets up Lecture 2: **pass**.
- 10 Furniture: pass. "What you can now do" is concrete and there are 4 recall questions.
- Self-check "titles alone tell the story": ch1–5 yes; ch6–8 read as three separate situations.

---

## 7. Top 10 fixes (ranked)

**1. Say which database ch4–5 are about (store mismatch).** In c4 4.1, replace "How hard that bites depends on what sits behind the API. … because it is what they already run." with:
> "How hard that bites depends on what sits behind the API. Chapter 3 chose managed Redis, and a single Redis node handles roughly a hundred thousand simple `SET`s a second, so it is within range, with little headroom. But plenty of teams put this table in the relational database they already run, and that is where the next two chapters hurt most, so follow one heartbeat into PostgreSQL."

And at the top of 5.1 add: "Redis has a ceiling too (its `maxclients` setting); a relational database's is far lower, which is why this chapter uses one." (Fact-check the Redis wording before publishing.) Also update Fig 4·a's caption and label from "Redis or DynamoDB" to the store actually chosen.

**2. Unspoil ch4's title.** c4 Section s4 title: "Six million heartbeats a minute" → **"The table is tiny. Why is the store struggling?"** (crumb "4 Write rate"). Overview subtitle: "Build that dot so it never lies and survives six million heartbeats a minute" → "Build that dot so it never lies and keeps up when a million people are online".

**3. Unspoil ch5's headings.** Chapter title → **"A spike hits and autoscaling adds twenty servers. What do they get?"**. Section 5.2 title "Twenty new servers, zero connections" → **"Ten servers, one budget, and a spike"**. Drop the answer from Fig 5·b's caption or move the figure after the "misconfigured pool" paragraph, so the pause answer is stated once.

**4. Stop the header and overview giving away the answers.** s0 Build 1: replace "You start from one boolean … lock out the servers you add." with:
> "You start from one boolean per user and find out, one failure at a time, what it takes to keep it honest: what the store must remember, who deletes it, which store holds it, and what happens to the database when every user writes at once."

Overview ch3 blurb → "Redis and DynamoDB both pass the test. What actually decides between them?"

**5. Make ch7 deliver its title, or retitle it.** The chapter never shows a slow home page or a fix. Two options:
- (a) Retitle to **"Before the home page gets slow: what goes in a row?"**, and change the last paragraph's "The home page is fast again." → "The row is lean and the filter is a cheap compare."
- (b) Keep the title and add one sentence in the intro naming the cost. Only do this if the ledger supports it.

Also fix the 7.2/7.3 contradiction. In the 7.3 pause answer, replace "Against the original date-time column it buys speed *and* stays readable." with "Against the date-time column Redbus had, it bought speed too, because comparing those values was their bottleneck; on an engine that stores dates in compact binary, that gain would be small." Fix the excerpt problem: the intro "a title, the first few lines, an image" conflicts with "its query never touches the out-of-line text". Either drop "the first few lines, an image" or say excerpts are stored in their own short column (only if the source supports it).

**6. Remove the stepper spoiler and the double telling in 1.2.** Cut step 5 of Fig 1·c (move the "replay with heartbeats" view to 1.4, where the 10 s / 30 s numbers are introduced). Replace "That one asymmetry is the whole problem, and the last step of the figure already hints at the fix. Before taking it, try the fix most people reach for first." with:
> "That one asymmetry is the whole problem. The fix most people reach for first is to stop trusting the client and have the server check."

Shorten the pause answer to one line, since the stepper shows it.

**7. Write a real ch5 → ch6 hand-off and open ch6 on its situation.** Replace c6's first paragraph with:
> "It is midnight and a writer has deleted the wrong post: three months of work. With the green dot, losing data cost ten seconds until the next beat. Here it costs someone's work. That is the second build: an ordinary blog, a multi-user app like Medium, where the data is the product. What carries over from the dot is the method: start from what must be stored and how it is read, count before you optimise, and let the database do what it already does before you add a box."

Change 6.1's "You are handed two tables." → "Here is the whole schema; it fits on a napkin." Put Fig 6·b ("so far") before Fig 6·a, like the other chapters.

**8. Reconcile the online-user numbers.** In 4.1, before the pause, add:
> "Chapter 2 imagined 100,000 people online. A successful app has ten times that, so take a million."

In 1.4, change "so two lost beats in a row still leave a live user green, and a third turns them grey" → "so a live user survives a lost beat or two; after 30 seconds with no beat at all, they go grey."

**9. Fix "five network trips" (4.2 / 4.3).** Replace "Opening a TCP connection takes a three-way handshake; closing it takes a teardown. By the simple count, that is five network trips around a single request and its reply." with:
> "Before the write can even be sent, opening the connection costs a three-way handshake, and after the reply, closing it costs a teardown. The one request and one reply you actually wanted are wrapped in more trips than they contain."

In 4.3, "The five trips are gone." → "The handshake and the teardown are gone."

**10. Cut the fact-lists and asides that stall the flow.**
- 3.3: merge the Walmart/Netflix/scale sentences into one paragraph and delete the orphan "Hiring adds to the pull towards open source…" (or fold it in: "…and far more engineers already know an open tool than one vendor's product.").
- 3.4: drop "Before you decide, go deep on each candidate … most critical and most brittle part of your system."
- 6.3: delete the "An interviewer once asked…" paragraph and change "from the pool you sized in chapter 5" → "from the blog database's pool".
- 6.4: move the GDPR deadline and backup detail into the existing Go-deeper box and keep one sentence in the main text: "And sometimes the law decides: under the EU's GDPR a person can ask you to erase their data, so a soft delete can't be the end of the road."
- s0: delete "A table in a figure only shows a schema, not a relational database."

Also worth doing (not ranked): move 5.4 "Where else have you seen this dot?" to the end of ch2 or ch3, so the pool climax runs straight into the hand-off. Make 8.2's "thousands of times a minute" match the end of ch7's "a million times".
