# Lecture 4 (lec02) story rewrite: notes

Follows `lectures/STORY_BRIEF.md`, `lectures/STORY_WRITER.md` and the Lecture 3 model. Source: `site/src/content/lectures/lec02.mdx` + `lec02/{s0-header,c1…c10}.mdx`. Site review used: scratchpad `review/02-lec3-lec4.md`, Lecture 4 part.

## Chapters (words per built page: captions, code, tables, hidden pause and recall answers and page chrome included; SVG desc/labels, collapsed asides and clip-as-text excluded; scratchpad `wc2.py` over `site.sh text`)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: two hooks, where you are (Lectures 1–3), the two builds, what you’ll be able to do, before you start (incl. chapter list) | 1,061 | – |
| 1 | “Use NoSQL. It scales.” What do you ask back? | 1,042 | About 5 min |
| 2 | Get a value by its key, or ask inside it? | 984 | About 5 min |
| 3 | One average over 10,000 rows. How much does the disk read? | 883 | About 5 min |
| 4 | Who follows whom: a job for a graph database? (incl. SQL or not, and the hand-off) | 1,284 | About 7 min |
| 5 | “Design Slack.” Where do you even start? | 1,257 | About 6 min |
| 6 | You press send. Which road does the message take? | 1,187 | About 6 min |
| 7 | E is on another server. How does the message get there? | 1,002 | About 5 min |
| 8 | A hundred servers, 99 links each. Now what? | 1,237 | About 6 min |
| 9 | WS2 blinked while A posted. Where is the message? | 1,091 | About 6 min |
| 10 | Does the design survive two features nobody planned? (incl. What you can now do, 4 recall questions, build it, hand-off to Lecture 5) | 1,562 | About 8 min |

Total ≈ 12.6k (12,590) counted this way (≈ 11.5k for the ten chapters alone). The old page had ≈ 30.9k prose words.

**Two builds.** Build 1 (ch 1–4) has its own problem: “Use NoSQL, it scales” in a design review, and what to ask back. Build 2 (ch 5–10) has its own: A’s message must reach B–E instantly, E sits on another server, and a refresh must still show it. The hand-off is §4.5: the field guide’s last question (which store holds Slack’s messages) is the first Slack decision; it has an easy answer (any shardable DB, Slack runs sharded MySQL/Vitess), so the real problem moves from storage to delivery. What carries over: shard by the key every operation uses, and choose by the guarantee you owe.

**Spine.** Slogan → name the database and workload → why no relations lets data spread (FK checks need one place; relational backstory) → Lecture 3’s A–M/N–Z MySQL: anything that shards, scales → which consistency is traded (pause: ACID vs CAP; linearizability; eventual; DynamoDB ConsistentRead) → document (query inside, partial update) vs key-value (one key per op) → pause on IN (1,2,3) → thousands of partitions, Redis Cluster slots, rule → blurry lines (DynamoDB doc model, MongoDB ACID cost), KV is an access pattern, 400 KB cap → stock_ticks, row vs column, pause + clip, Redshift 5%, why not everything columnar, inserts, never the primary copy, compression → follow/following (pause), adjacency list, Hulk, FlockDB → degrees, cohorts (Amazon caveat once), fraud story + 200 ms (attributed) → joins vs traversal, recursive CTE once, single writer → SQL or not → Slack’s messages: Instagram vs enterprise, Vitess numbers → hand-off. Build 2: scope cut, requirements card, schema ≠ relational → membership as a noun → nullable pair (pause), CHECK, drafts stepper → DM = channel (Slack API), type → checkpoint, unread, no replay → shard by channel_id → send: receive must push, send is separate, overhead arguments fail, grey→black → Slack’s promise: saved then shown (Slack Engineering: HTTP send, WS receive; save-first order stated once as this build’s choice) → WhatsApp-like show-then-save (pause on the 10-minute refresh), Zoom chat, clip, rule → dumb edge → toy 4 connections, membership on the server (stepper) → simplest: one TCP link (pause, stepper) → mesh → its real cost (pause), file descriptors not ports, dinosaur → real-time Pub/Sub (clip), at-most-once, not Kafka → Redis channels per Slack channel, server subscribes (stepper incl. new channel), sharded Pub/Sub → Balancer (pause: one org per server) → server dies (stepper), Go deeper: Slack’s real design → lost push (clip), timed fetch of last 50, idempotent consumer (aside) → node dies mid-write: engine replicates, ack after copies (DynamoDB 2 of 3) → edge exposure, no DB credentials, least-privilege Kafka credential, DDoS → client-claimed membership (pause), broken access control → one socket per product (true reasons only) → whole system with the persistence dial (Kafka drawn as the dial’s 2nd setting; Slack = 1st) → delete (where copies live; WhatsApp retention) → ordering (pause on the clock, stepper), DB clock works because a channel lives on one shard, vector clocks → What you can now do, recall, build it → Lecture 5 opens the load-balancer box.

## Figures

- **Added** `site/src/figures/lec02/so-far.tsx`: `SoFarGuide` (build 1, stages 0–3: a five-row “good at / gives up” card filled chapter by chapter) and `SoFarSlack` (build 2, stages 0–5: users + sharded store → tables → send road → ws2 + tcp link → Redis Pub/Sub + Balancer → timed fetch / three replicas / no DB credentials). Desk 640 + phone 330, kit parts only. Each chapter opens on it with the previous chapter’s piece on a blue wash marked “new”. Checked in screenshots (1440 light/dark, 390 light); the desk guide overflowed its columns once and was re-laid out.
- **Kept**: TwoConsistencies, AnythingShards, ForeignKeyChecks, PartialUpdate, OneKeyVsIn, RowVsColumn, PrimaryToWarehouse, WhyCompress, AdjacencyList, Cohort, FraudEdge, ThreeHopsGraph/Sql, RequirementsCard, MessageDrafts (stepper), SlackSchema, Sidebar, OpenChannel, TwoConnections (`conn` variant), GreyThenBlack, FourConnections (stepper), TcpLinks (stepper), Mesh, SevenConnections, RedisThenNewChannel (stepper), AskBalancer, ServerDies (stepper), AckAfterReplication, Exposed, BehindLb, Architecture, GuaranteesDial (in the ch10 rule box), DeleteOnDevices, DeleteInStore, OutOfOrder (stepper). All four clips: l02-column-scan, l02-three-ways-to-persist, l02-mesh-to-pubsub, l02-missed-message.
- **Fixed text** (no instructor/class/board provenance, no stale cross-references):
  - FraudEdge: “by the instructor’s account” / “as relayed in class” labels and desc → “as one bank described it”.
  - ThreeHopsSql: “see ‘More precisely’” → “WITH RECURSIVE”; “N levels = N self-joins” → “one more self-join per level” (matches “10 levels → 9 self-joins” on the same figure).
  - AnythingShards desc: “Lecture 03” → “Lecture 3”, “The board’s box” → “The note under it”.
  - PrimaryToWarehouse desc: dropped “as taught”.
  - MessageDrafts / SlackSchema desc: dropped “the class’s drafts” and “Redrawn from the class board at 01:17”.
  - BehindLb label “(instructor’s estimate)” → “(one engineer’s estimate)”; Exposed desc “the note below…” → “ideally a write-only one”.
  - AckAfterReplication label “DynamoDB: 2 of 3, see the note below” → “DynamoDB acks at 2 of 3”.
  - Clip l02-three-ways-to-persist alt text: “Slack as the instructor’s hypothesis” → “Slack, saving first”; “(the class’s example: about 10 minutes)” → “(about 10 minutes in this example)”. Alt text only; nothing drawn changed, so posters were not regenerated.
- **Dropped from the page**: LectureMarks + NotationKey legend, NamedStores, OneVsSpread, NeverBelieveRule, DistributeRule, LayoutRule, FilePerColumn (one picture of the layout is enough), Rule4, Backstory, Rule5, SchemaStart, the duplicate Sidebar (`again`), Rule6, ThreeWays static figure + SendingKey (the clip carries the three roads), GuaranteesRule, StartSimpleRule, PubSubMiddle (the clip covers it), SubscribeChannels (the stepper covers it), OneSocket/EdgeFleet, RealisticRule. Every TradeoffTable (they retold prose).
- **Files deleted** (nothing imports them): `site/src/figures/lec02/s7-sending-fig-7c.tsx`, `s7-sending-rule.tsx`. Unused exports left in surviving files: LectureMarks, NamedStores, OneVsSpread, NeverBelieveRule, FilePerColumn, LayoutRule, DistributeRule, Rule4, Backstory, Rule5, SchemaStart, Rule6, StartSimpleRule, PubSubMiddle, SubscribeChannels, OneSocket, EdgeFleet, RealisticRule. `content/samples/` imports nothing from lec02.
- Old `s1-nosql.mdx … s10-deleting-ordering.mdx` (incl. s8a/s8b) deleted; `s0-header.mdx` rewritten.

## Cut, and why

- **Fake Slack hooks in the database half** (settings blob, average message length, membership as a graph, “does Slack need NoSQL”). Build 1 now has its own honest problem; Slack enters only at §4.5.
- **Say-then-unsay.** Each correct fact stated once: CAP C = linearizability; DynamoDB ConsistentRead; MongoDB ACID cost; DynamoDB 400 KB cap; column orientation is a layout; Amazon item-to-item; recursive CTEs; single writer per graph; Cassandra commit log; Slack’s send path (HTTP, save-first as this build’s choice); keep-alive HTTP; ports vs file descriptors; Redis at-most-once; sharded Pub/Sub; Kafka retention; replication ack (2 of 3); broken access control; least-privilege Kafka credential; DDoS upstream; WhatsApp server retention; Slack `ts`; vector clocks give a partial order.
- **The six-connections-per-browser argument for one WebSocket** (fact-check L-0322/0324/0325 wrong): dropped from the body entirely; only the true reasons (server-held connections, reconnect handling) are given.
- **Designs that “deliberately conflict”.** Slack is save-first throughout; the final diagram’s Kafka path is presented as the dial’s second (WhatsApp-like) setting, and the missed-message clip’s caption says so.
- **Q&A tangents, admin, trivia:** About-this-class box, timestamps, notation legend, Check-yourself blocks per chapter, SectionEnd lists, ForwardChips; C-Store paper; pricing of warehouses; BadgerDB; “AWS copies everything”; the multi-level-marketing story (one clause survives); NAND gate kept as the ch2 Go deeper; the nine wrong mesh answers (three survive as pause choices); routing-service idea (one sentence); UDP over TLS; the interviewer story; shared database vs database per service; microservices playlist; end-to-end encryption; WebTransport; live streaming; channel-creation event details beyond the stepper; “one WebSocket per tab or per domain”; recap-board alternate schema (`workspace`, `ts`); von Neumann aside; Teams reshuffle anecdote (kept as a hedged parenthetical).
- **Kept as stories, attributed as experience:** the bank call and the 200 ms budget (“one engineer”, “one bank’s engineering lead”), 29× compression, 3–5 ms per hop, a few hundred lines for delete and three engineers × 3.5 months, the “happiest day” of building a load balancer.

## Self-check

- `pipeline/bin/site.sh build lec02`: ok (14 pages). `links lec02`: zero broken. `figures lec02`: ok at 360/390/768/1440, light + dark (one horizontal-scroll failure from long inline SQL in §5.2 was fixed by moving it to a block).
- QA screenshots: `lectures/lec02/story/shots/` (chapters 2, 4, 6, 8, 10 at 1440 and 390, light and dark), no failures.
- Grep of every built page (HTML stripped; SVG desc, alt, aria-label and title included) and of `page_text.md` for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student`: **0 hits** (three uses of “the classic” were reworded because they matched “the class”).
- **Titles alone:** NoSQL scales, what do you ask back? → key or inside? → how much does the disk read? → a graph database for who-follows-whom? → “Design Slack”, where to start? → you press send, which road? → E is on another server → a hundred servers, 99 links each → WS2 blinked, where is the message? → does the design survive two unplanned features? No title names an answer; ch9’s title was changed from “Redis kept nothing…” so the contents list doesn’t reveal ch8’s Pub/Sub.
- **Pauses:** 11, answers hidden; the ordering pause was moved before its stepper because the stepper’s last step gave the answer; the mesh pause no longer states the 7/3 arithmetic, which the figure after it shows.
- **Limits:** at most one Go deeper per chapter (ch2 NAND gate, ch8 Slack’s real design, ch9 idempotent consumer), each under 120 words; at most one rule box per chapter (ch3, ch8 and ch9 have none; “design realistic systems” in ch10 is plain text).
- **Open and close:** opens on Lecture 3’s ending question (what Redis/DynamoDB gave up) and Lecture 2’s WebSockets/Kafka; ends on Lecture 5 (lec08 on disk now: “The box everyone draws”, starting from one process copying bytes between two connections).

## Incoming links (other lectures into lec02), to remap

- `site/src/content/lectures/lec06/s2a-gravatar.mdx:109` s6-2 → s5-1 (Slack’s membership table)
- `site/src/content/lectures/lec06/s5b-badge.mdx:84` s8 → s7 (scaling WebSocket servers; s7 = one link and the mesh, s8 = Pub/Sub and Balancer)
- `site/src/content/lectures/lec09/s8b-counting-hashtags.mdx:93` s8-5 → s8-2 (Redis channels for Slack channels) — **s8-5 no longer exists**
- `site/src/content/lectures/lec10/s6a-switching-servers.mdx:126` s8-4 → s8-1 (Redis Pub/Sub)
- Links without `sec` (lec01 c1:67, c5:83, c5:100; lec04 c1:84; lec05 c9:136; lec08 s0-header:23, c4-stale-copies:63) still land on the overview.

Wording in other lectures that no longer matches (for the coordinator, not edited):
- `lec01/c5-live.mdx:83` “Scaling WebSockets properly is where Lecture 4 starts, with Slack.” Lecture 4 starts with the database families; WebSocket scaling is ch7–8.
- `lec08/c4-stale-copies.mdx:63` “Polling couldn’t be relied on there either, and changes were pushed to every server …” Lecture 4 doesn’t discuss polling for membership changes; it pushes a new-channel notice through Redis to the edge servers (§8.2).
- `lec08/s0-header.mdx:23` “pushed Slack’s messages to every server through a real-time Pub/Sub”: accurate enough, though messages go only to servers subscribed to that channel.

## Shared files

None edited. One lec02-owned clip file changed: `site/src/animations/clips/l02-three-ways-to-persist/timeline.ts` (alt text only; posters unchanged).

## Unsure

- **Word count** is ≈ 12.6k with the overview’s chapter list and chrome, ≈ 11.5k for the chapters: a little above Lecture 3 (11.6k on the same measure).
- **Slack’s save-first order** is stated as this build’s choice, supported by grey→black and the enterprise guarantee; Slack Engineering confirms HTTP send / WebSocket receive but not the order (fact-check L-0209).
- **Two clips draw the Kafka path** (missed-message, and the final Architecture figure). Captions frame it as the dial’s second setting; re-animating the missed-message clip with a save-first path would remove the need for that caption.
- **Clip three-ways-to-persist** still shows “Slack (a hypothesis)” on screen; consistent with the text but slightly hedged. Changing it needs new posters.
- Kept as experience, unverifiable: 29× compression, the 200 ms bank budget and 50–60 parameters, 3–5 ms per hop, delete in a few hundred lines, 3.5 months for the first chat.

## Revision 2

Inputs: `story/review_facts.md` (F-01…F-11, 0 high / 3 medium / 8 low) and `story/review_reader.md` (top 10 plus per-chapter items).

### Fact items (all applied)

- **F-01:** save-first is now “this build’s Slack” everywhere. Changed in §6.2 (“the promise this build makes, and the likeliest reading of Slack’s”), §10.2, the Fig 10·b caption, the Clip 9·1 caption, recall 2 and the Clip 6·1 alt text (“Slack as this build reads it”). The on-screen “Slack (a hypothesis)” is kept, as review_facts recommends; reader item 6d asked to drop it and was overruled by facts.
- **F-02:** Redis echoes the message back to WS1. §8.2 now says so and gives the fix: tag each published message with the sending server’s id (or keep the message id) and skip your own. Fig 8·b step 3, its drawing (a return arrow labelled “own echo: skipped”, desk and phone) and both descs were updated.
- **F-03:** in chapters 7–8 the message now starts at the API server. Changed: Fig 7·b step 3, Fig 8·b step 1, Fig 8·b’s drawing (the blue arrow now runs api → ws1, “saved: standup in 5”), and the Clip 8·1 alt text.
- **F-04:** the code comments now say subscriber connection and publisher connection, and §8.2 explains that a subscribed connection can’t publish.
- **F-05:** the Clip 9·1 cue now reads “The message is persisted (here through Kafka).” The alt text and storyboard were updated to match.
- **F-06:** §7.1 and the stepper now say “room for four users”. The Fig 7·e caption adds “under a real cap, that is three users it can’t take”.
- **F-07:** stock_ticks is now “one row per company per day”.
- **F-08:** the Clip 3·1 alt text now says “with ts on one day”. The on-screen query keeps its `ts = '…'` placeholder; changing it would need a relayout and new posters.
- **F-09:** Fig 5·d now has `messages.id`, and the foreign-key line was moved to the right row. The optional user nickname was not added to the figure because it would collide with the users line.
- **F-10:** Fig 9·b now shows the writer sending to node 1, which copies to the replicas, and the acknowledgement “once enough copies have it” (DynamoDB: two of three). The worker is relabelled “writer”, the arrows reversed and the desc rewritten.
- **F-11:** §2’s opening now reads “treated a value as something it stores and returns without looking inside”.

### Reader items

- **Fix 1, summary road:** L-0338’s detail confirms that the lecture’s Kafka diagram is the level-2 road and that Slack goes synchronous.
  - Fig 10·b is no longer the Kafka `Architecture` drawing. It is now `SoFarSlack` stage 6, “the whole Slack design”, on this build’s road.
  - The Kafka road is described in §10.2 as the asynchronous setting of the dial. Slack can be built that way too (L-0236), at the cost of the refresh gap.
  - The GuaranteesDial needle now points to ① and its path is solid.
  - Clip 9·1 is kept, captioned “draws the save on the phone-first road; on this build’s road … lost exactly the same way”. The clip was not re-cut.
  - The §9.2 and §9.3 prose now covers both roads: “Not the API server (or, on the phone-first road, the worker)”, and “On this build’s road it needs no credential at all; if it feeds Kafka…”.
- **Fix 2, a situation for Build 1:** the overview, the dek and the §1 opening now set the scene as “your team is about to store every message of a Slack-like chat app; someone says ‘Use NoSQL. Messaging systems always do. It scales.’” The “messaging systems” premise comes from L-0124.
  - §1.2 uses the app’s own tables. §1.4 ends on “questions about the message store”.
  - §4.4 opens “That completes the guide. Now use it”, and §4.5 returns to the review.
  - §2.3 now answers Lecture 3’s Redis/DynamoDB question by name.
- **Fix 3, mesh numbers:** §7.3 takes L-0273’s “something like a million connections” objection, then counts the fleet: 1, 6 and 4,950 links (99 per server), none of which serves a user. Recall 3 was updated to match.
- **Fix 4, spoilers:** the overview no longer names Pub/Sub, the connection service, the one-dial line or “no special case for DMs”.
- **Fix 5, the phone-first road:** “WhatsApp-like” is gone from §6.3, §10.2 and Clip 6·1. The clip’s lane title is now “Phone-first” and its posters were regenerated. WhatsApp stays as the example of phones keeping their own copy, and in §10.3.
- **Fix 6, drafts:** the stepper now holds six numbered drafts. Draft 1 is one line (“the one you just judged”), and the stepper ends at draft 6, the message with no destination. The common-channel reveal is now a pause in §5.2, and §5.3 no longer recaps it. Type names now match the figure (`reg`/`grp`/`user`).
- **Fix 7, numbers:**
  - Rows per day: F-07, above.
  - Fraud timeline: the payment is held, the hold-and-route decision takes 200 ms, and the call comes after (L-0098, L-0103).
  - 29× sentence rewritten (L-0076).
- **Fix 8, guide contradictions:**
  - Relational now “gives up spreading for free: shard it yourself”.
  - The row is now “column layout”, §3 ends “Three trades down”, and the recap says “a family, or a layout”.
  - §4.3 now leads with the two SQL options (self-joins or `WITH RECURSIVE`). The figure label “messy” became “or one query: WITH RECURSIVE”.
- **Fix 9, open questions:**
  - Why Redis is still needed: E’s full server and failover spread (L-0244, L-0303). Shared channels between organisations were not added; they aren’t in the ledger.
  - The timed fetch: 50 covers a blink, and a longer gap is filled from the checkpoint.
  - “Both are fine, until private channels need a server-side check”, with the reason: an internal API needs credentials that an exposed server must not hold.
  - The orphan “second Kafka” is now “buffer undelivered pushes in Kafka”.
- **Fix 10, trims:**
  - Cut: the 400 KB/blob sentence, ConsistentRead pricing, the graph product list, exactly-once, the Teams parenthetical, CRDT jargon (rephrased), the CHECK snippet, and the edge’s Kafka string from §6.4.
  - “Happiest day” became “surprisingly simple, and satisfying”.
  - “One engineer” now appears only once (the soft 3–5 ms). The 3.5-months story moved to §10.6.
  - Chapter 7 now opens with E.
  - The ending is a question for Lecture 5.
  - The kicker says “Lecture 4”. The page chrome comes from the shared template and now also renders “Lecture 4”.
- **Per-chapter items** applied: 1a (Cassandra a flood of writes, DynamoDB key lookups; L-0123), 1b, 1c, 1d, 2a–2d, 3a–3f (3e: 50,000 vs 20,000 values), 4a–4f (chapter 4 retitled “Who follows whom, and where would Slack keep its messages?”), 5a–5e, 6a–6c (the “a hint, not proof” labels were removed from Fig 6·c), 7a–7c, 8a–8d, 9a–9e, 10a–10j (chapter 10 retitled “Step back, then try to break it: delete and reorder”).
- **Rejected:** 6d’s dropping of “(a hypothesis)”, because review_facts wins. 10c’s move of §10.1 into chapter 8: the retitle covers it.

### Clips and posters

On-screen text changed in l02-three-ways-to-persist (“Phone-first”) and l02-missed-message (the cue). `site.sh posters lec02` regenerated all four clips’ posters. Alt-only changes were made to l02-mesh-to-pubsub and l02-column-scan.

### Checks (Revision 2)

- `build lec02` succeeds (14 pages), `links lec02` finds zero broken links, and `figures lec02` passes at all widths in light and dark.
- The banned-word grep over `page_text.md` finds 0 hits.
- QA: the sweep screenshots in `shots/sweep/` and the pause screenshots in `shots/fig/` (chapters 5, 8, 9, 10) show no failures.
- Words (wc2): overview 1,076 and chapters 1–10 at 1,080 / 970 / 895 / 1,247 / 1,234 / 1,173 / 1,101 / 1,339 / 1,131 / 1,577, for ≈ 12.8k in total (≈ 11.7k without the overview). The chapter metas now sum to 55 minutes, down from 59.

### Incoming links

Section ids are unchanged in this revision, so the map above still applies: lec06 s6-2 → s5-1, lec06 s8 → s7, lec09 s8-5 → s8-2 (broken until remapped), lec10 s8-4 → s8-1.

## Revision 3

Inputs: `story/review_facts_final.md` (N1–N12, O1–O2) and `story/exam_grade.md` (Q151 CUT-LOSS). These are small, targeted edits.

- **N1:** GuaranteesDial now draws the persistence path from A through a small `api` box to the dial and on to `db`. The edge → Pub/Sub line is unchanged. The desc spells out the three positions (sync through the API, async from the edge through Kafka, none), set to ①. Checked at 390 px.
- **N2:**
  - The 29× figure is attributed again: “someone who runs these warehouses reports … for his data”.
  - Deletion is “a rough estimate of a few hundred lines”.
- **N3:** §7.3 concedes the capacity objection (“on capacity alone you would be right”) and puts the weight on what the links are *for*, and on the count growing with every server.
- **N4:** §8.1 now says “one link to the middle (in practice a connection or two, 8.2)”. The Fig 9·a desc says “linked to a Redis Pub/Sub”.
- **N5:** the echo-skip wording now gives two concrete options: skip messages tagged with your own server id, or skip the ids you have just delivered.
- **N6:** Fig 8·b step 1 now draws an A → api arrow labelled “POST (http)” (desk and phone), with the text “A posts … over HTTP”. No mechanism for choosing WS1 was added; the sources give none.
- **N7:** §10.2 now reads “the Pub/Sub, the Balancer and the database stay exactly as they are; the edge servers only gain a write to Kafka”.
- **N8:** Fig 9·c `EXP_DESC` now says “at most a Kafka credential, only if it feeds Kafka”.
- **N9:** §9.4 now has the edge server ask “a backend membership API”; it no longer queries the database directly.
- **N10:** §2.3 now reads “the core of what Redis and DynamoDB gave up … questions about the inside of a value, which each bends a little (2.4)”.
- **N11:** §4.4’s ingestion list now starts with “a flood of chat messages”.
- **N12:** the SoFarSlack SVG title reads “The whole Slack design” at stage 6, desk and phone.
- **O1:** the chapter 6 blurb now reads “What a Slack-like app should promise …”.
- **O2:** the Clip 6·1 cue now reads “(a Slack client can)”, replacing “(Slack does)”. The storyboard was updated and all posters regenerated.
- **Q151:** the CUT-LOSS sentence was added at the end of the second §9.2 paragraph, after checking it against the sources. L-0425 is the student’s proposal (status open), but the fact-check marks it accurate: an at-least-once hold/retry until the database acknowledges, which needs idempotent writes. The sentence: whoever writes holds and retries until the ack; on this build’s road the API server answers A only after the ack; on the phone-first road the worker keeps the message until it commits and a crashed worker’s messages are re-read from Kafka, made harmless by the unique id.

### Checks (Revision 3)

- `build lec02` succeeds (14 pages), `links lec02` finds zero broken links, and `figures lec02` passes at all widths in light and dark.
- `posters lec02` was regenerated.
- The banned-word grep over the built HTML (SVG desc, alt, aria and title included) and over `page_text.md` finds 0 hits, “WhatsApp-like” included.
- The QA sweep of chapter 10 at 1440 and 390 shows no failures.
- Words (wc2): ≈ 12.9k (12,949). Section ids are unchanged, so the incoming-link map above stands.
