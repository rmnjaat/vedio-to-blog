# Lecture 4 (lec02): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read `lectures/lec02/story/page_text.md` in order: the overview, then chapters 1 to 10, including figure descriptions, clip text and pause answers. I did not open the ledger, transcript or fact-check. To judge the course connections I checked only the end of Lecture 3's page and the opening of Lecture 5's header.

## Overall verdict

Build 2 (Slack, chapters 5–10) is the strongest storytelling in the course so far. It has a concrete scene (A types "standup in 5", E is on another server), a toy number you can draw (four connections per server), and each chapter ends on the question the next one answers: send road, then E on WS2, then the mesh, then Pub/Sub, then what breaks. The schema chapter's "a DM is a channel with two people" lands well. Three things weaken it. (1) The two figures meant to sum up the design (Clip 9·1 and Fig 10·b, the whole-system picture) both show the *non-Slack* road, with the edge server persisting into Kafka. A reader comes away unsure which architecture they built. (2) The mesh's "real cost" (99 connections per server) is not believable once 8.3 says 20,000 connections are "nothing" for one server. (3) The hypothetical "WhatsApp-like" road saves to a backend through Kafka, and 10.3 then says WhatsApp deletes messages from its servers once delivered.

Build 1 (chapters 1–4, the field guide) reads clearly sentence by sentence but works as a catalogue, not a story. Its driver is a slogan ("NoSQL scales"). It has no situation and almost no numbers, and each chapter brings in a new, unrelated example (JSON settings, stock ticks, Twitter follows, a bank card) until 4.5 suddenly says "where would Slack keep its messages?". The fix is already half on the page: Fig 1·b uses `messages.channel_id → channels.id`. If the design review in chapter 1 were about *Slack's message store*, every family would be a candidate tried and judged against that one workload, and 4.5 would be a payoff instead of a pivot.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Overview / header | 4 | 4 | 4 |
| 1 · "Use NoSQL. It scales." What do you ask back? | 4 | 3 | 3 |
| 2 · Get a value by its key, or ask inside it? | 4 | 4 | 3 |
| 3 · One average over 10,000 rows | 4 | 3 | 4 |
| 4 · Who follows whom: a job for a graph database? | 3 | 4 | 4 |
| 5 · "Design Slack." Where do you even start? | 4 | 3 | 4 |
| 6 · You press send. Which road? | 4 | 3 | 5 |
| 7 · E is on another server | 4 | 4 | 5 |
| 8 · A hundred servers, 99 links each | 4 | 4 | 4 |
| 9 · WS2 blinked while A posted | 3 | 3 | 4 |
| 10 · Does the design survive two features nobody planned? | 3 | 3 | 3 |

---

## Overview and header

**H1. The overview spoils Build 2's two biggest reveals.** "What you'll be able to do: … Scale WebSocket servers with a real-time Pub/Sub and a service that decides where each user connects." That answers the pauses in 7.2, 8.1 and 8.3 before chapter 1 starts. Also "One design with one dial turned gives you something like Slack, something like WhatsApp or something like Zoom chat" gives away chapter 6's three roads and chapter 10's rule.
Fix: "Scale real-time delivery past one server without wasting the connections it exists to serve." Cut the "one dial" sentence from "What you'll build". Keep it for 10.2.

**H2. "Design a chat schema with no special case for direct messages" half-answers the 5.2/5.3 puzzle.**
Fix: "Design a chat schema where direct messages and unread counts need no extra machinery."

**H3. Build 1 has no felt problem.** "Someone in a design review says 'Use NoSQL, it scales.'" That is a slogan, not a situation. Lecture 1 opened on a green dot and Lecture 3 on 120 passengers.
Fix: make the review concrete and tie it to Build 2: "Your team is about to store every message of a Slack-like chat app. In the design review someone says 'Use NoSQL, it scales.'" Then 4.5 closes the loop instead of opening a new topic.

**H4. "Lecture 04" vs "Lecture 4".** The page header, the "facts checked" footer and the chapter meta say "Lecture 04", but the brief and the prose say "Lecture 3", "Lecture 5". Fix: "Lecture 4" everywhere.

**H5. "Where you are" is good.** It picks up Lecture 3's closing question word for word, and Lecture 2's WebSocket and Kafka. No change.

**H6. Reading time runs over.** The chapter times add up to about 59 minutes, above the 30–50 the brief asks for. Most of the excess is vendor detail in 2.4, 4.3, 8.2 and 9.2 (see below).

---

## Chapter 1 · "Use NoSQL. It scales." What do you ask back?

Flow 4 · Clarity 3 · Engagement 3

**1a. "Scales for a very specific workload" names no workload.** "Cassandra scales for a very specific workload. So do MongoDB and DynamoDB, each for its own." The reader wants to know which one, and doesn't learn until 4.4 (high-rate ingestion).
Fix: "Cassandra scales for a flood of writes; DynamoDB for lookups by key" (check source). Or say plainly that the answer comes in chapter 4.

**1b. "Almost highly available" is awkward.** "That bought an almost highly available, horizontally scalable system". Fix: "That bought horizontal scale and kept serving when one shard was busy, and it cost consistency across the shards."

**1c. "What comes back is the spread" is unclear.** The pause has just said what is given up. The reader then needs "what do you get for it?", and "What comes back" reads like "what returns to the story". Fix: "In exchange you get availability: a single relational primary without a standby takes everything down when it fails; data spread over replicated nodes keeps serving when one node fails."

**1d. The DynamoDB ConsistentRead detail is off-road here.** "…at twice the read cost". It is true but drags a pricing detail into the chapter's core idea. Fix: keep "Even that is a default, not a law" and move the ConsistentRead clause into a Go deeper box, or cut it.

**1e. There are no numbers in this chapter.** The brief wants numbers as plot. Fix: if the review is about Slack messages (H3), give the workload one line here (messages a day, users) and reuse it in chapters 2–4 (check source; only if the lecture has such numbers. If it doesn't, the 4.5 Vitess figure of 2.3 million queries a second can be foreshadowed).

**1f. The callback "As Lecture 3 put it, relational databases grew up around money" matches Lecture 3's page.** Good.

---

## Chapter 2 · Get a value by its key, or ask inside it?

Flow 4 · Clarity 4 · Engagement 3

**2a. The field guide contradicts chapter 1.** Fig 2·a onward: relational "gives up spreading: checks want one place". But 1.3 just said "'relational databases don't scale' is a very big misconception… anything that shards, scales."
Fix: label the cell "gives up: spreading for free (drop FKs and shard it yourself)".

**2b. Lecture 3's question is never answered by name.** Lecture 3 ended: "what exactly did Redis and DynamoDB give up to be fast and big?" 2.2 and 2.3 answer it, but never say so.
Fix: at the end of 2.3: "So that is what Redis and DynamoDB gave up: any question about the inside of a value. What they got back is that every operation lands on one shard."

**2c. 2.4 is a pile of vendor footnotes.** DynamoDB's document model and filters, MongoDB's ACID history and docs quote, Redis memory vs DynamoDB disk, the 400 KB item cap and object storage, and then a Go deeper box on top. Four ideas in three paragraphs, none of them moving the story.
Fix: keep one point, "families blur; pick by the features you need, and remember 'key-value' is an access pattern, not a storage engine", with the Lecture 1 callback. Cut the 400 KB / blob-store sentence, and either shorten the MongoDB paragraph to one sentence or fold it into the Go deeper box.

**2d. "Hiccups" is used twice and means little.** "thousands of partitions, without any hiccups" (2.3), and again "WebSockets scale without hiccups" (8.4). Fix: "without any query ever waiting on two machines".

**2e. The pause in 2.3 is well placed and its answer is not repeated.** Good. Fig 2·c's caption note ("The ids are placed one per shard for the example") is the right kind of honesty.

---

## Chapter 3 · One average over 10,000 rows. How much does the disk read?

Flow 4 · Clarity 3 · Engagement 4

**3a. The row count can't be right.** "one row per tick… About 10,000 companies are listed, so that day has about 10,000 rows." If there is one row per *tick*, a day has many ticks per stock, so millions of rows. An engineer stops at this sentence.
Fix: "one row per company per day, its closing price" (then 10,000 rows is right). Or keep ticks and say "millions of rows" (check source).

**3b. The chapter doesn't call column a "family" consistently.** 3.3: "Column orientation is a way of laying a table on disk, not a separate non-relational family". But Fig 1·a lists "five kinds of store" with column among them, 3.4 says "Three families down", and 10.5 says "Pick a family by its trade… Column". The page contradicts itself.
Fix: in the field guide, label the row "column layout". In 3.4 write "Three trades down". In 10.5 write "Pick a family, or a layout, by its trade."

**3c. Cassandra is left unplaced.** "a different idea from the 'wide-column' stores such as Cassandra". Then Cassandra carries 4.4 and 4.5 without the reader knowing where it sits in the guide.
Fix: one clause in 4.4: "Cassandra, a wide-column store that partitions by key, …" (check source).

**3d. The "29 times" sentence is garbled.** "one engineer who runs these systems calls 29 times normal in his experience." I can't parse it.
Fix: "In one engineer's experience, a column shrank to about a 29th of its raw size" (check source for what was compressed against what).

**3e. The arithmetic stops short.** The chapter title asks "how much does the disk read?" but the page never gives the amount for its own 10,000 rows. Fix: "The row store reads all 50,000 values to use 20,000; the column store reads exactly those 20,000."

**3f. The caption has furniture in it.** Fig 3·b: "On a phone the header says ts for timestamp." The table is introduced with `ts` in prose and `timestamp` in the figure. Fix: use `ts` in the figure everywhere and drop the sentence.

**3g. The chapter ending is good.** "it starts with a mistake almost everyone makes" is a real hook.

---

## Chapter 4 · Who follows whom: a job for a graph database?

Flow 3 · Clarity 4 · Engagement 4

**4a. The fraud story's timeline contradicts itself.** "before the payment went through his bank called to ask whether it was him", then "the automated decision must come within 200 milliseconds; the call comes after it." If the decision takes 200 ms, how did the call come before the payment went through?
Fix: "The payment was held, and within a minute his bank called to ask whether it was him. The hold was decided in under 200 milliseconds; the call came after." (check source)

**4b. 4.3's opening question points at the wrong example.** "How would you power that fraud check on a relational database? Three levels deep is one traversal". The fraud check was "a new edge outside a cluster", not a three-hop walk. The cohort was the multi-level example.
Fix: "How would you power that cohort, two or three levels deep, on a relational database?"

**4c. The figure says one thing and the next paragraph retracts it.** Fig 4·e: "rewritten for every depth… 10 levels → 9 self-joins: messy". Next paragraph: "SQL can walk any depth in one query with … WITH RECURSIVE… try that first." That is claim-then-retraction, which the brief bans.
Fix: lead with the honest version: "In SQL, three hops is a self-join per level, or one recursive query (WITH RECURSIVE), which handles any depth and is the first thing to try for a tree. Graph databases make deep traversals simpler to write and often faster." Change the figure's red "messy" label to "or WITH RECURSIVE".

**4d. "One bank's engineering lead" appears three times.** It is in the prose and twice in the Fig 4·d labels. Once is enough. Fix: keep it in the prose and drop it from the figure labels.

**4e. The end of 4.3 is a name list.** "Neo4j, one of the first; Dgraph, written in Go; TigerGraph…" plus the Neptune replica count. Fix: keep the single-writer point in one sentence and cut the list, or move it to a Go deeper box.

**4f. The chapter does three jobs.** Graphs, SQL-or-not, and Slack's store. 4.5 is the hand-off of the whole build and is buried as section five of a graph chapter. Fix: retitle the chapter so the reader sees the turn coming, for example "Who follows whom, and where would Slack keep its messages?", or open 4.4 with a one-line "That completes the guide. Now use it."

**4g. 4.5 is a real hand-off.** It names the carried-over habits and states Build 2's problem sharply ("What makes Slack hard isn't where a message is stored"). Keep it.

---

## Chapter 5 · "Design Slack." Where do you even start?

Flow 4 · Clarity 3 · Engagement 4

**5a. "The same architecture" comes before any architecture exists.** "The same architecture builds multiplayer games and live polls too. But don't jump straight to WebSockets." Fix: "What you build here also powers multiplayer games and live polls. But don't start with WebSockets; start with the schema."

**5b. The stepper's count is muddled.** Its title is "Five drafts of messages", the description says "Six steps", the prose bullets say "Draft 1", "Drafts 2 and 3", "Draft 4", "Draft 5", and then "Two last ideas". The reader can't tell how many drafts there were.
Fix: number every bullet as a draft (1–7), or title the figure "Six steps through the drafts" and label the "two last ideas" as drafts 6 and 7.

**5c. The stepper spoils 5.3.** Step 5, "Giving the two people a common channel works", and step 6, "What survives: from, channel_id, msg", answer 5.3's title question ("What kind of row is a chat between two people?") before it is asked. 5.3 then opens with "The draft that survived already said it". The section is a recap, not a reveal.
Fix: end the stepper at draft 5 (type enum), with "every draft treats a DM as a special case". Make 5.3 a Pause and think, "What if a DM weren't special at all?", with "a channel with two people" as the hidden answer.

**5d. Draft 1 is told twice in a row.** The pause answer explains the nullable-columns orphan, and the stepper's step 1 and bullet repeat it. Fix: start the stepper at draft 2 and say "Draft 1 you just saw."

**5e. The channel type names don't match.** The prose says "regular, group or DM", the figure says "type: grp/user/reg", and Fig 5·e says "type = user → bottom half". Fix: pick one set ("reg / grp / dm") and use it in prose and figures.

**5f. The vacation paragraph (5.4) foreshadows well.** Leave it.

---

## Chapter 6 · You press send. Which road does the message take?

Flow 4 · Clarity 3 · Engagement 5

**6a. The "WhatsApp-like" road contradicts 10.3.** 6.3: "Take a chat app whose phones keep their own copy… the way WhatsApp keeps yours… and suppose, as a thought experiment, it also wanted a backend copy… workers pull it from Kafka and store it later". The clip calls this "WhatsApp-like (hypothetical)", and 10.2 calls Fig 10·b "the WhatsApp-like road". Then 10.3 says WhatsApp deletes messages from its servers once delivered. A reader can't tell whether WhatsApp keeps a backend copy or not.
Fix: name the second road by its guarantee, "the phone-first road", and drop "WhatsApp-like" from 6.3, the clip text and 10.2. Keep WhatsApp only in 10.3, where its real behaviour is stated.

**6b. 6.3's opening sentence is too twisty.** It is one sentence with a hypothetical inside a hypothetical. Fix: "Now picture a chat app where every phone keeps its own copy, and the backend copy is only a backup. Slack's road would feel slow there. So the message goes over the open WebSocket…"

**6c. "A hint, not proof" is said three times.** It is in the figure label, the figure description and the prose. Fix: keep it in the prose only.

**6d. The hedge in 6.2 undercuts the chapter's thesis.** "Whether the save finishes before the fan-out isn't stated there; the grey-then-black delay and the enterprise promise both point to saving first, and this build saves first." The honesty is fine, but at the climax of the argument it reads as a retraction. The clip's "Slack (a hypothesis)" repeats it.
Fix: one short sentence after the citation: "Slack doesn't publish whether the save finishes first; this design makes it so, because the promise demands it." Drop "(a hypothesis)" from the clip text.

**6e. The 6.3 pause (workers lag ten minutes, B refreshes) is the best moment in the lecture.** It is a number used as plot and it has a surprising answer. Keep it.

---

## Chapter 7 · E is on another server. How does the message get there?

Flow 4 · Clarity 4 · Engagement 5

**7a. The opening paragraph doesn't pick up the hand-off.** Chapter 6 ended on "the members of #general aren't all connected to the same WebSocket server". Chapter 7 opens with "Whatever a company runs over WebSockets, Discord's chat or video streaming, is among its most critical features…", a general remark. Fix: open with the scene: "E's app connected a few seconds after the others, and landed on a different server. A posts. Before you fix that, notice why these servers matter so much: …"

**7b. The mesh's "real cost" is not believable as stated.** 7.3: "every link in the mesh takes one of its limited connections", and the climax is "100 servers → 99 links each". But "Real servers hold far more" than four is never quantified, and 8.3 then says "Twenty thousand connections are nothing for one WebSocket server". So 99 of 20,000+ is under 0.5%. An engineer will say the mesh's real costs are elsewhere: 4,950 links to manage across 100 servers, and every message sent to 99 peers whether or not they have members.
Fix: give the real per-server capacity once (check source), and make the cost land: "With 100 servers that is 4,950 links to keep alive, and every message crosses all 99 of them." If the lecture's point really is per-server connections, say why 99 matters at that capacity.

**7c. The pause "The other answers don't hold up" refers to options the text never shows.** It's fine on the interactive page, but the paragraph reads oddly in flow. Fix: "You might also suspect latency, fault tolerance or handshakes. None of them is the cost: …"

**7d. The hotel-room and dinosaur images work.** "before you jump to a fix, say exactly what the overhead is" is a strong closing line.

---

## Chapter 8 · A hundred servers, 99 links each. Now what?

Flow 4 · Clarity 4 · Engagement 4

**8a. The Balancer quietly makes chapters 7–8 look unnecessary, and the page doesn't address it.** 8.3: "If everyone in an organisation is on the same server, their messages never need Redis at all". The reader asks why E ever landed on WS2, and what happens to an organisation bigger than one server.
Fix: one sentence: "Redis remains for the cases that do cross servers: an organisation too big for one server, users reconnecting after a failure (8.4), and shared channels between organisations" (check source for which cases the lecture gives).

**8b. The routing-service paragraph comes from nowhere.** "A routing service that tells each server where every message goes is tempting, but…" Nothing raised it. Fix: "You might ask: why not a service that tells each server where every message goes? Because a network call per message…"

**8c. The stepper's last three steps (creating channel c3) are content the prose never mentions.** The text never says that new channels must be announced in real time, so steps 5–7 arrive unmotivated, and "It is drawn here as sent from the API server" is a meta note. Fix: add one prose sentence after the SUBSCRIBE code: "When A creates a new channel with D, the servers must learn about it the same way: a notice through Redis, then a SUBSCRIBE." Drop the meta sentence.

**8d. "Why not Kafka? It would slow this path down" is asserted before the reason.** Fix: put the reason first: "Kafka stores every message and lets consumers pull at their own pace; between edge servers you want the opposite, a push to whoever is connected now."

**8e. The Go deeper box (Slack's real design) is the right size and well placed.**

---

## Chapter 9 · WS2 blinked while A posted. Where is the message?

Flow 3 · Clarity 3 · Engagement 4

**9a. Clip 9·1 shows the wrong road.** Its caption: "Here the message is saved through Kafka, chapter 6's second road; on Slack's save-first road the push is lost the same way." The clip text has ws1 putting the message in Kafka and a worker saving it. But 9.1's prose says "The save happened before anything was pushed". The reader watches a design they rejected in 6.4.
Fix: re-cut the clip with the API server saving first (the "so far" figure already shows that road), or at minimum lead the caption with "The save is drawn through Kafka for brevity; the push is lost the same way on Slack's road."

**9b. The worker and Kafka from the other road leak into the Slack design.** 9.2: "Who makes those copies? Not the worker…". 9.3: the edge server "holds only a Kafka credential… for pushing into Kafka". On Slack's road the API server writes and the edge server never touches Kafka. Fix: "Not the API server (or, on the async road, the worker)…", and in 9.3: "If the edge server feeds Kafka, as on the async road, the most it holds is a Kafka credential…"

**9c. "Buffer messages in a second Kafka" has no first Kafka.** On Slack's road there is none. Fix: "When sockets drop for longer, another option is to buffer undelivered pushes in Kafka and replay them once the sockets are back."

**9d. The timed fetch leaves the obvious questions open.** How often? Only the open channel, or all of them? What if more than 50 were missed? Fix: one sentence covering the interval and the scope (check source). If the lecture doesn't say, add: "50 covers a blink; a longer gap is filled when the user opens the channel, which loads from the checkpoint (5.4)."

**9e. "Both are fine" is contradicted one section later.** 9.3: "If the latency is acceptable, use the load balancer; if not, expose the servers. Both are fine." 9.4: membership checks can only be done "safely as a private server, behind a load balancer". The reader also doesn't learn *why* an exposed server can't call an authenticated internal API.
Fix: in 9.3, "Both are fine until private channels need a server-side check (9.4)". In 9.4, give the reason in one clause (check source).

---

## Chapter 10 · Does the design survive two features nobody planned?

Flow 3 · Clarity 3 · Engagement 3

**10a. The whole-system figure isn't Slack.** Fig 10·b: "drawn with the persistence dial on its second setting: the edge server hands each message to Kafka". Then 10.2: "That is the WhatsApp-like road. Slack's saves through the API first". The one picture meant to show "the whole thing" shows the road chapter 6 rejected for Slack. Together with 9a, the reader's final mental image is wrong.
Fix: redraw Fig 10·b with the Slack road (HTTP → API → save → push via edge). Show the dial as a small inset (which the "Swap the persistence path" figure already is).

**10b. The "swap the persistence path" figure only restates the rule box, and it has no caption.** Fix: either make it the inset from 10a or cut it.

**10c. The chapter title promises two features, but the first two sections are about something else.** 10.1 (one socket) and 10.2 (the whole picture) come before either feature. Fix: retitle "Step back, then try to break it: delete and reorder", or move 10.1 into chapter 8, where sockets are being scaled.

**10d. The deletion cost paragraph wanders and is hard to believe.** "Products take long to ship features like this because, at WhatsApp's scale… The code is small: one engineer's estimate is a few hundred lines… a team of three needed three and a half months". It moves from WhatsApp's rollout to someone's team's chat build. Fix: keep one sentence: "No new boxes: deletion is a few hundred lines of backend on this design; what takes time at WhatsApp's scale is deciding and rolling it out." Cut the three-and-a-half-months clause or put it in the conclusion as the build's cost.

**10e. Exactly-once comes from nowhere.** "Do you need exactly-once delivery and strict ordering on screen? Nobody said either is required." Exactly-once was never raised. Then the parenthetical about doubled messages is a tangent. Fix: "Do you need strict ordering on screen? A screen isn't a pipeline; it can insert a message in the middle of a list." Cut the parenthetical.

**10f. Vector clocks and CRDTs arrive unexplained.** "Vector clocks with CRDT-style merging give only a partial order…" These terms are used once and never defined. Fix: cut the sentence, or "Per-client clocks that merge (vector clocks) still can't say which of two messages came first without a tie-break, and cost every client extra work."

**10g. Ordering by insertion time breaks on the drawn road.** 10.4 says the order is "the database's insertion time". On the async road in Fig 10·b, workers insert in batches minutes later, so insertion order isn't send order. This is one more reason to draw Slack's road in 10·b (10a), or add: "on the save-first road, insertion happens at send time".

**10h. "Happiest day of their life" is over the top.** "more than one engineer who built their own has called it the happiest day of their life." Fix: "Building a basic one is surprisingly simple, and satisfying."

**10i. The hand-off to Lecture 5 is a description, not a question.** It matches Lecture 5's opening ("Every lecture so far has drawn this box without opening it"), but the brief wants an ending question. Fix: end with "So what does the program inside that rectangle actually do with each byte, and what happens to your users when the machine running it dies?"

**10j. "One engineer" is a narrator who keeps reappearing.** The page has "one engineer who runs these systems" (3.4), "One engineer tells it from his own card" (4.2), "one engineer's experience" (9.3), "one engineer's estimate… by his account" (10.3), and "more than one engineer" (10.6). Five appearances read like a veiled teacher. Fix: tell the stories as stories ("A card holder learned this…", "In practice a load balancer adds 3–5 ms") and keep the attribution only where a number is soft.

**10k. "What you can now do" and the recall questions are concrete and well chosen.** Keep them. The recap's "Column: … analytics only" should follow 3b.

---

## Retelling in 7 sentences

1. "NoSQL scales" is a slogan: ask which database, for what workload, and what it gave up. Non-relational stores spread easily because they drop foreign-key checks (and relational data spreads too once you drop them), usually trading CAP's consistency (fresh reads everywhere), not ACID's.
2. Key-value stores allow only one-key operations, so they can split into thousands of partitions; document stores let you query and partially update inside the value, so cross-shard queries limit how far they split. The more complex the queries, the less you can distribute.
3. Column-oriented layout reads only the columns a query names and compresses well, which suits warehouses, not applications. Graph databases are for graph algorithms (degrees, cohorts, fraud edges), not for data that merely looks like a graph. Choose SQL when correctness is the feature and a high-ingestion store when volume is.
4. Slack's text chat needs a sharded store (Slack runs MySQL on Vitess, sharded by channel_id) and a schema where a DM is a channel of two and `membership` holds the read checkpoint behind unread badges.
5. A message is sent over HTTP, saved first, then pushed over WebSockets, because Slack promises a message is on record before anyone sees it. Phone-first apps can push first and save later via Kafka, and Zoom chat needn't save at all; the edge server stays dumb, with no database credentials.
6. When members sit on different WebSocket servers, a TCP mesh wastes connections, so each server keeps one link to a real-time Pub/Sub (Redis, one Redis channel per Slack channel). A Balancer places each organisation on one server so most messages never cross Redis, and moves users when a server dies.
7. Pushes can be lost (fixed by a timed fetch of the last 50), writes are safe once the database's replicas acknowledge them, private channels need a server-side membership check, and deletes and ordering fit the same design (database clock wins). Next, Lecture 5 opens the load balancer box.

**How hard was it?** Build 2 was easy to retell; its chain of problems is the story. Build 1 retold as a list. Sentences 2–3 are four mini-lectures joined by "and", and I had to stop and decide whether "column" is a family (the page says both). The one place I wasn't sure what I had built was the end of Build 2: two of the summary figures show the Kafka road, so "is the edge server saving through Kafka in my Slack?" took a re-read of 6.4 to settle.

---

## Top 10 fixes, ranked by impact

1. **Show Slack's own road in the summary figures (Fig 10·b, Clip 9·1, and 9.2/9.3 prose).** Redraw the whole-system figure with HTTP → API → save → push, keep the persistence dial as an inset, and rewrite "the worker" / "Kafka credential" passages so they apply to the save-first road. As it stands, the reader's final picture is the design they rejected.
2. **Give Build 1 a situation and tie it to Slack (header, 1 opening, 4.5).** Make the design review about storing a chat app's messages. Each family is then a candidate judged against one workload, and 4.5 is the payoff. Answer Lecture 3's Redis/DynamoDB question by name at the end of 2.3.
3. **Make the mesh's cost believable (7.3, Fig 7·e, 8.3).** Quantify real server capacity once, then make the cost land in numbers that matter at that scale (4,950 links, every message to 99 peers), or explain why 99 connections matter. Reconcile it with "20,000 connections are nothing".
4. **Remove the overview spoilers (H1, H2).** Pub/Sub plus connection service, the "one dial" line, and "no special case for direct messages" all give away pause answers.
5. **Stop calling the async road "WhatsApp-like" (6.3, Clip 6·1, 10.2).** Call it the phone-first road. WhatsApp's real behaviour (10.3, deletes from servers after delivery) contradicts a WhatsApp that saves every message through Kafka.
6. **Fix the schema stepper (5.2–5.3).** Make the draft count consistent, don't repeat draft 1 after the pause, and end the stepper before "a common channel", so that 5.3's question gets a real reveal.
7. **Fix the two numbers that break belief in Build 1:** "one row per tick… 10,000 rows" (3a) and the fraud timeline, where the bank calls before a 200 ms decision (4a). Also repair the garbled "29 times" sentence (3d).
8. **Resolve the self-contradictions in the field guide:** relational "gives up spreading" vs "anything that shards, scales" (2a), and column as a "family" vs "not a separate family" (3b, 10.5). Also lead 4.3 with WITH RECURSIVE instead of retracting the "messy self-joins" figure (4c).
9. **Answer the questions 8.3 and 9 leave open:** why Redis is still needed once the Balancer groups an organisation (8a), how often and how far the timed fetch looks (9d), "both are fine" vs the membership check that needs a private server (9e), and the orphan "second Kafka" (9c).
10. **Trim off-road detail and stray terms, and sharpen the endings:** 2.4's vendor paragraphs, 4.3's name list, the ConsistentRead pricing, exactly-once and vector clocks/CRDTs in 10.4, "happiest day", and the five "one engineer" attributions. Open chapter 7 with E instead of a general remark. End the lecture on a question for Lecture 5, and use "Lecture 4", not "Lecture 04". This also brings the reading time back toward 50 minutes.
