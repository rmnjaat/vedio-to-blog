# Lecture 2 "Medium under load": fresh-reader review

Reviewer stance: a working engineer who has never seen the video. I read `page_text.md` once, in order, judged against `lectures/STORY_BRIEF.md`. I did not read the ledger, transcript or fact-check, so where I propose added text that goes beyond what is on the page, it is marked **(check source)**.

Overall: this reads like a story, not class notes. The voice is consistent, nothing is attributed to a teacher or a student, and the chapter-to-chapter hand-offs are the strongest part. Every chapter ends on a sentence that makes you want the next one. The weak spots are a few contradictions a careful reader will catch (WebSocket or SSE for claps? 1, 3 or 5 API servers?), one fix whose motivation isn't believable (delegating a single `+1`), clip content told twice, and chapter 6.2, which is an appendix with no problem driving it.

## Scores

| Chapter | Flow | Clarity | Engagement |
|---|---|---|---|
| Overview | 4 | 4 | 4 |
| 1. Where else could you keep a copy? | 4 | 3 | 4 |
| 2. Marketing is about to message every user | 4 | 3 | 4 |
| 3. Publishing a story does too much | 4 | 4 | 4 |
| 4. Two readers clap at the same instant | 4 | 4 | 3 |
| 5. Can the other reader see the clap without refreshing? | 3 | 4 | 4 |
| 6. The app is closed. Can you still reach the reader? | 3 | 4 | 3 |

---

## Overview

**Works:** It opens on what you already know from Lecture 1 and names four concrete pressures. "Each fix adds a box to the picture below, and each box has a price that sets up the next chapter" is a good promise, and the page mostly keeps it.

Issues:

1. **"Medium" appears with no introduction.** The title is "Medium under load", but the text says "the blog". Then ch1 has "(Medium calls them stories)", and the figures say "Medium's blog count via SQS" and "One Medium request". As a reader I wondered whether the blog *is* Medium or only looks like it. Lecture 1 may have said so, but this page should say it once.
   - Fix (first paragraph of the overview): "The blog is a Medium-style site: writers publish stories, readers read and clap for them."
2. **Naming drift: post / story / blog.** Prose says "post", Medium's word is "story", the column is `total_blogs` and the table in ch4 is `blogs`. Each one makes you stop for a second.
   - Fix: add one line where stories are introduced in ch1: "Medium calls a post a story; in the database, the table is `blogs`."
3. **Chapter blurbs give away a little:**
   - ch3: "and then search wants the event too" gives away §3.4's turn.
   - ch4: "who should do the adding" hints at the answer (the database adds).
   - Fix ch3: "An author's story count has to go up on every publish. What belongs in the request, and what happens to the rest when a worker crashes."
   - Fix ch4: "A post with 100 claps gets two more in the same instant. Where does the count end up?"
4. **Furniture in the ch6 blurb.** "what you can now do, and the question Lecture 3 opens with" lists page furniture, not a situation.
   - Fix: "Reaching a reader whose app is asleep, and what each hop of the blog speaks."
5. **"Lecture 02" vs "Lecture 2".** The brief says "Lecture N". The leading zero looks like a file name.
6. **Fig 0·a and Fig 1·a are the same figure, a screen apart**, and the overview's first paragraph is then restated as ch1's opening paragraph. On a single-page read this is a visible repeat. This may be fine if the overview and chapters are separate pages.

## Chapter 1: Where else could you keep a copy?

**Works:**
- The opening ("The database is spared; the network is not") sets up the chapter well.
- The two-servers stepper earns its place.
- The disk pause-and-think is the best "aha" in the lecture.
- The CDN and Netflix examples feel real.
- The closing transition into the campaign is excellent.

Issues:

1. **"“Caching at several layers reduces latency” names no layer."** Who said that? A quote arrives from nowhere.
   - Fix: "Asked where to cache, many people say “at several layers, to reduce latency”. That names no layer."
2. **"This chapter walks Lecture 1's homework list."** Lecture 1 ended on one question, not a list, so this reads like a leftover from class.
   - Fix: "This chapter answers Lecture 1's question one stop at a time, starting where…"
3. **The EBS parenthetical undercuts the idea it supports:** "(On AWS the default disk is an EBS volume, itself network-attached; the truly local disks are called instance store.)" I just accepted that the disk wins because it avoids a network call. Now I learn the default disk *is* a network call. The page leaves that hanging.
   - Fix: either cut it, or finish the thought: "…so on AWS the honest version of this trick uses instance store, or relies on the page cache keeping hot entries in RAM." **(check source)**
4. **A tension with "RAM is the scarce part".** The section says RAM is nearly all spoken for, then says the disk cache wins because Linux serves it from page cache *in RAM*. I asked: whose RAM?
   - Fix, one sentence: "The kernel lends that page cache whatever RAM is free and takes it back under pressure, so you get memory speed when there's room and disk speed when there isn't, and both beat the network." **(check source)**
5. **The ALB note contradicts the list.** "(AWS's Application Load Balancer caches nothing)" sits right before §1.6 lists "the load balancer or gateway" as a stop, and Fig 1·e labels stop 3 "lb / api gw".
   - Fix: in §1.6 and in the figure label, say "the gateway or reverse proxy (nginx, an API gateway)", not "load balancer".
6. **The order of stops breaks.** §1.5 goes out to the ISP ("closer still"), then "One stop remains" jumps back inward to the reverse proxy. That stop belongs between the CDN and the API server.
   - Fix: move the reverse-proxy paragraph before the Netflix paragraph, and open it with "Behind the CDN, in front of your servers, sits one more stop…"
7. **The browser recommendations story is off-road for a blog.** "cache 50 and show a random 10 on each visit" is a nice trick, but it is about e-commerce feel, not load. It costs momentum.
   - Fix: keep it as a one-line aside, or move it into the chapter's Go deeper box.
8. **The Go deeper box says "snapshotted to S3 (a CDN for mobile apps)".** S3 is not a CDN, and a reader will stumble.
   - Fix: "snapshotted to S3, from which the mobile apps downloaded them".
9. **The bank story calls back to Lecture 1 ("Lecture 1 told of an engineer at a large bank…") but doesn't say what the exercise was.**
   - Fix: "…who came out of this same where-else-can-I-cache exercise…"

## Chapter 2: Marketing is about to message every user

**Works:**
- The campaign is a great driving situation.
- Capacity = peak ÷ tested capacity is clear.
- "Scale first, then let marketing send" is memorable.
- The cascade clip is the right moment for motion.
- The replication-lag stepper is clear.
- The closing transition into Publish is excellent.

Issues:

1. **The numbers don't drive this chapter.** The brief wants numbers as plot, but the campaign never gets one. The "100 a second, need 500 → five machines" example is generic. Then §2.3 says "five API servers" as if derived, and the derivation shows up only in the ch6 recall question.
   - Fix (§2.2): "Say a load test shows one API server handles 100 requests a second, and marketing's forecast for the campaign peak is 500. You need five." **(check source for whether these were the blog's numbers.)** Then §2.3 inherits "five" naturally.
2. **The fleet size contradicts itself.**
   - The map (Fig 0·a, 1·a, 2·a) shows **three** API servers.
   - The clip and its text say "Before the campaign: one API server, one database… The API fleet scales to five."
   - §2.2 ends with "For the blog: a bigger API server first, then a load balancer and more of them." The blog already has a load balancer and three servers.
   - Fix: make the clip text read "Before the campaign: three API servers, one database." Rewrite §2.2's last line as: "The blog went past that stage in Lecture 1; it already runs three servers behind a load balancer."
3. **"Didn't chapter 1 just protect the database?"** That was my first thought at the cascade. The answer ("you can't cache all of it: readers spread across many posts, profiles and lists") is buried in §2.4.
   - Fix: move it into §2.3, before the clip: "Chapter 1's caches absorb the viral post, but a campaign sends readers everywhere, to profiles, lists and older posts, and every miss lands on the database."
4. **The cascade is said three times.** The clip's text summary, the paragraph after it ("Before a campaign, one reader goes through…" through "scale the database first, then the API servers"), and the next paragraph ("One component falls over…") all retell it. "Scale the database first" appears three times.
   - Fix: delete the paragraph that retells the clip. Keep "One component falls over… sre.google" and "So scale from the bottom up".
5. **The read-your-writes rule is never stated in the body.** The stepper shows the writer's own new post going missing. The banking pause gives the rule for balances. But "send a writer's own new post to the master" appears only in ch6's "What you can now do".
   - Fix, after the stepper: "So route a read to the master when its reader has just written: the writer's view of their own new story, a balance after a transfer."
6. **The banking pause answer is muddled:** "A friend says the money is sent and the balance still shows the old number". Whose balance, the sender's or the friend's?
   - Fix: "You send money; your balance read goes to a replica that hasn't caught up and still shows the old amount. The balance is a critical read and goes to the master."
7. **The vertical-ceiling answer is weak.** "…a data centre either has it or doesn't" then moves straight to "explains nothing". This is fine. I would cut "even from senior engineers", which is the only line in the chapter that sounds like a lecturer, not an author.
8. **The sharding paragraph is dense.** It packs "exclusive subsets", hashing, connection pools per shard, the `% N` trap, consistent hashing, fixed buckets and Lecture 9 into one paragraph.
   - Fix: split before "Hashing with hash(user_id) % N has a trap".

## Chapter 3: Publishing a story does too much

**Works:**
- "Nobody is hurt if it says 74 for a few seconds after the 75th story goes up" is perfect.
- The two-writes-one-crash stepper is the best figure in the lecture.
- Queue vs stream is well motivated by a second team.
- The partitions pause is well placed.
- The commit/crash stepper lands at-least-once.
- The ending sets up ch4 well.

Issues:

1. **The motivation for delegating isn't believable.** The +1 is one cheap `UPDATE`. The case for moving it out of the request is a quote ("a VP of engineering at Hotstar…") and the abstract claim that "a burst of publishes no longer becomes a burst of database writes". A working engineer will think "that's one indexed update; a broker costs more than it saves". The figure even admits "(a crude example)".
   - Fix: say so and make the real point the list, not the item. "One +1 is cheap. The trouble is that it is never just one: today the count, tomorrow the search index, then emails to followers. Each one added inline makes every publish slower and makes the campaign peak hit the database all at once. Decide now which work belongs in the request." **(followers emails: check source; otherwise use only count and search.)**
2. **Hotstar may be unknown to readers outside India.**
   - Fix: "Hotstar, the Indian streaming service that serves cricket to tens of millions at once" **(check source)**, or just "a large streaming company".
3. **The figure title "Medium's blog count via SQS" names SQS before §3.3 explains queues.** It is a minor spoil.
   - Fix: "The blog count, delegated".
4. **The stepper conclusion is wrong-sounding:** "Count 76, search 75: still wrong." Search 75 is *right* (75 stories). The count is the wrong one. The figure label "still don't match" is accurate; the bullet is not.
   - Fix: "Search is now right at 75, but the count says 76 for 75 stories."
5. **Readers will expect the stream to fix the crash, and it doesn't.** §3.4 ends on "The deeper fault is one worker owning two teams' jobs", which implies that separating them fixes the inconsistency. Only at the end of §3.7 do you learn the double count survives.
   - Fix (end of §3.4): "Splitting the jobs won't stop a retry from repeating a write; that comes back at the end of this chapter. It will stop one team's failure from re-running the other team's work."
6. **The obvious question is unanswered: "why not two queues?"** "A queue can't give you that, because a consumed message is deleted" ignores the move most engineers would try first: one queue per team.
   - Fix: "You could give each team its own queue and have the API server write to both, but then every new consumer means changing the publisher and writing one more time inside the request. A stream lets the publisher write once." **(check source)**
7. **The clip is told twice again.** The paragraph "The same five ON_PUBLISH messages go to two brokers… retention policy expires them." retells the clip. The next paragraph then restates it again ("Each kind of consumer keeps its own position…").
   - Fix: delete the retelling paragraph. Start the next one at "A queue suits identical consumers doing one job…"
8. **"Make the write safe to repeat" is never shown.** It is the takeaway of §3.7 and of ch4's comparison, but you never see how to make `total_blogs + 1` repeat-safe.
   - Fix, one sentence: "For the counter, that means remembering which story IDs you have already counted, in the same transaction as the +1, and skipping repeats." **(check source)**
9. **Kafka vs Kinesis in the cost paragraph.** "When several kinds of consumer need the same events, Kafka is the usual default" follows a cost comparison done with Kinesis. That's fine, but say "a stream (Kinesis, or a Kafka cluster you run all the time)" so the cost argument covers both.

## Chapter 4: Two readers clap at the same instant

**Works:**
- The pause ("What can the count end at?") is perfect.
- "Nothing crashed and nothing logged an error" is the right emphasis.
- Putting the fix in the database because the two claps may be on two servers is well argued.
- Setting "lost update vs double count" next to each other is the most useful paragraph in the lecture.

Issues:

1. **§4.1 "Why run many threads at all?" is a detour.** It is generic ("It is at the heart of every system that works at scale") and breaks the tension the opening just built. Engagement drops here.
   - Fix: cut the section. Fold one sentence into §4.2: "Servers run many requests at once on many threads; that is how one machine earns its keep, and it is why two claps can interleave."
2. **§4.3 is a term avalanche.** Pessimistic locking, mutex, semaphore with one permit, optimistic locking, version number, AtomicInteger and CRDTs all arrive in one paragraph, and then the next paragraph says none of them is the answer. CRDTs especially come from nowhere.
   - Fix: keep the traffic signal, a pessimistic lock (mutex) and optimistic locking (one line each). Move the semaphore and CRDTs into a Go deeper box or cut them.
3. **"Wrapping the same read-then-write in an ordinary transaction is not enough."** This is surprising and unexplained; most engineers believe the opposite.
   - Fix: "…not enough: under the default isolation level both transactions can still read 100 and both write 101." **(check source)**
4. **There are two hand-offs to Lecture 3.** "This was a first taste… Lecture 3 begins, live, on an airline check-in" here, and again at the end of ch6. The mid-lecture one weakens the final one.
   - Fix: cut it here. Ch6's ending already does this job better.
5. **The clip text plus its prose paragraph repeat the clip** ("Two threads share one counter… two claps on 100 give 102."). Same fix as above.
6. **"blogs" vs "stories".** `UPDATE blogs SET claps…` is the first time the table is called `blogs`. See the overview note.

## Chapter 5: Can the other reader see the clap without refreshing?

**Works:**
- The million-readers arithmetic (6 M/min, about 100 k/s) is exactly "numbers drive the plot".
- Tying WebSockets back to Lecture 1's connection pool is a great bridge.
- The clip comparing three ways to hear news at 60 s is well chosen.
- The ticker filter arithmetic is a nice lesson in restraint.

Issues:

1. **The chapter never decides, and the map then picks something the chapter argued against.**
   - §5.5 says "For the claps, SSE works too. A clap goes up as an ordinary POST… new counts come down over SSE… There is no universal winner."
   - Fig 6·a then adds "a WebSocket… which carries live claps", and Fig 6·c shows WS to a "realtime likes service".
   - The chapter's own logic (prices flow one way, so SSE; the clap goes up as a POST) points to SSE. I finished the chapter not knowing what the blog uses.
   - Fix: end §5.5 with a decision and a reason. Either "For the blog, take SSE: claps already go up as POSTs, and only counts come down", and change the maps to SSE. Or "The blog uses a WebSocket because…", with a real reason **(check source)**.
2. **The RPC/REST/Fielding paragraph in §5.1 is off-road.** It is accurate but irrelevant to "how does the other reader see the clap". The definition of RPC and the REST-vs-HTTP aside cost a paragraph of momentum right after the hook.
   - Fix: cut it to the burger analogy plus "The server only ever answers. It can't speak first." Put REST/RPC in a Go deeper box if it must stay.
3. **"Natural fit" vs "wasted".** §5.2 calls short polling "the natural fit for a job that takes a while to finish". The next paragraph says an hour-long server launch gets "an hour of requests that each return the same 'in progress'".
   - Fix: "It is the natural fit for a job that finishes in seconds to minutes and a handful of watchers. Stretch either and the waste shows."
4. **Long polling isn't scored against the million readers.** The number set up in §5.2 is dropped.
   - Fix (§5.3): "For the million readers that means about a million held requests instead of 100,000 new ones a second."
5. **The SSE arithmetic needs its assumption:** "about 10,000 listed companies at 4 bytes a price is 40 KB a second".
   - Fix: "…if every price changes once a second, 10,000 × 4 bytes is 40 KB a second."
6. **"WebSockets cost the most to run" vs the §5.4 point** that an idle WebSocket mostly costs memory, at 2 M per server. The reconciliation is in §5.4 ("What is expensive is everything around them"). Echo it here: "WebSockets cost the most to *operate*: routing, reconnect storms."

## Chapter 6: The app is closed. Can you still reach the reader?

**Works:**
- "Who delivers to a sleeping phone? Not you." is a great reveal.
- The local calendar notification as the exception is clever.
- "What you can now do" is concrete and complete.
- The four recall questions are good and in story order.
- The Lecture 3 hand-off ("Most real problems are not that kind") is excellent.

Issues:

1. **It misses the best callback in the lecture.** Ch2's campaign *was* a push notification to every user. Chapter 6 explains push without ever saying "that campaign went through this path".
   - Fix (opening of §6.1): "Remember marketing's campaign in chapter 2? Every one of those notifications went through this path."
2. **§6.2 has no problem driving it.** Nothing in the story asks "what does each hop speak?". It reads as an appendix, the one place where the "every paragraph earns the next" chain breaks.
   - Fix: motivate it with what the reader now sees. "Count the kinds of connection you have added in this lecture: HTTP from the browser, pooled TCP to the database, RESP to Redis, a socket for live claps, the phone's link to FCM. They are not the same thing; here's what each one speaks." Or shrink it to a Go deeper box.
3. **"realtime likes service" (Fig 6·c) is a box never introduced in text.** It also contradicts Fig 6·a, where the WebSocket comes from "the API servers".
   - Fix: make the figure say "api" or explain the service in one sentence in §5.4.
4. **The 2015 GCM/APNs/SNS/OneSignal story is vendor detail.** "Integrate with FCM once using its documentation anyway" is good advice. The story could be trimmed to one sentence.
5. **"What you can now do" has a rule the body never stated:** "Send critical reads, such as a balance or a writer's own new post, to the master". See ch2 item 5.

---

## Retell in 7 sentences

1. Lecture 1's shared cache spared the database, but every read still crosses the network, so you look for copies at every stop on the route (browser, CDN, gateway, API-server RAM, API-server disk, shared cache, materialized view). Each one trades consistency between servers for distance saved.
2. A marketing campaign brings every user at once. One bigger machine hits hardware and cost ceilings, so you add machines (forecast peak ÷ load-tested capacity) and scale before the message goes out, because autoscaling arrives late.
3. More API servers mean more load on the database, which can fail and take everything down in a cascade. So you scale bottom-up: a bigger database, then read replicas (with lag, so critical reads go to the master), then shards.
4. Publishing should do only what's essential inside the request and hand the rest (the author's story count) to a broker and workers. A queue gives each message to one worker and deletes it, at least once.
5. When search also wants every publish event, a stream like Kafka keeps the messages so each consumer group reads at its own pace, with parallelism capped by partitions and resumption from committed offsets. Delivery is still at least once, so writes must be safe to repeat.
6. Two concurrent claps can lose an update because count++ is read-add-write, and a lock in one server can't see another server, so you let the database do `claps = claps + 1`.
7. To show claps live you choose short polling (6 M requests a minute for a million readers), long polling, WebSockets or SSE by the shape of the conversation, and you use FCM/APNs to reach closed apps. Lecture 3 then opens the database to see how locks handle a whole flight checking in at once.

**How hard was it?** Moderately easy for chapters 1–4: each has one clear problem and one clear fix, and the transitions practically write the retell. Sentence 7 was hard. Chapter 5 has no decision for the blog (and the map contradicts the text), and §6.2 (protocols per hop) didn't fit into any sentence, which suggests it isn't part of the story.

---

## Top 10 fixes, ranked by impact

1. **Decide the live-claps channel and make the maps agree (ch5 §5.5, Fig 6·a, Fig 6·c).** The text argues for SSE (claps go up as POSTs, counts flow one way), then the map silently adds a WebSocket and an unexplained "realtime likes service". End §5.5 with one sentence that picks and justifies, and align both figures.
2. **Give the campaign a number and fix the fleet arithmetic (ch2).** Use "100 per server, 500 at peak → five" inside the story, not only in the recall question. Fix the clip's "one API server" (the map shows three) and the "bigger server first, then a load balancer" line (the blog already has both).
3. **Make the delegation motive believable (ch3 §3.1).** One `+1` is cheap. Say so, and argue from the growing list of side jobs and the campaign-peak burst on the database (from ch2), not from a quote.
4. **Delete every prose retelling of a clip and the paragraph that repeats it** (§2.3 cascade told three times, §3.5, §4.2). One representation per idea; this alone removes roughly 400 words of déjà vu.
5. **Pre-empt "didn't chapter 1 protect the database?" (ch2 §2.3).** Move "you can't cache all of it: readers spread across many posts, profiles and lists" in front of the cascade clip.
6. **Resolve the self-undermining facts in ch1:** the EBS parenthetical (the default disk is network-attached), page cache vs "RAM is scarce", and "ALB caches nothing" vs stop 3 labelled "load balancer". Finish each thought or cut it.
7. **Fix the ch3 crash story's logic.** "Count 76, search 75: still wrong" should say search is right and the count is double. At the end of §3.4 say that splitting the jobs won't stop double counts. Answer "why not two queues?". Show one concrete way to make `total_blogs + 1` safe to repeat.
8. **Give ch6 a reason to exist in the story.** Call back to chapter 2's push campaign in §6.1. Motivate §6.2 by counting the connection types the lecture added, or shrink it to a Go deeper box.
9. **Trim the off-road term dumps that stall momentum:** §4.1 (generic concurrency), §4.3 (semaphore, CRDT), §5.1 (RPC/REST/Fielding). Explain the one surprising claim that stays: why an ordinary transaction doesn't prevent the lost update.
10. **Housekeeping a reader trips on:**
    - Introduce "Medium-style blog" and the post/story/`blogs` naming once.
    - State the read-your-own-writes rule in the ch2 body, not only in the summary.
    - Fix stepper anchors that don't match their figure numbers: `#fig-2f` on Fig 2·c, `#fig-3e` on Fig 3·c, `#fig-3j` on Fig 3·e.
    - Use "Lecture 2", not "Lecture 02".
    - Cut the mid-lecture Lecture 3 hand-off in ch4.
    - Remove the small spoilers in the ch3 and ch4 blurbs.
