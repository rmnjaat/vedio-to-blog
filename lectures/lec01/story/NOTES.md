# Lecture 2 (lec01) story rewrite: notes

Second lecture rewritten to `lectures/STORY_BRIEF.md`, after the approved lec04 pilot. Source: `site/src/content/lectures/lec01.mdx` + `lec01/{s0-header,c1…c6}.mdx`. Built page text: `lectures/lec01/story/page_text.md` (`pipeline/bin/site.sh text lec01 …`).

## Chapters (visible words per built page, incl. headings, captions, stepper steps, code and hidden pause/recall answers; excl. SVG desc/labels and the collapsed "clip as text")

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook (Lecture 1's homework), what happens to the blog, what you'll be able to do, before you start | ~930 (incl. chapter list) | – |
| 1 | Where else could you keep a copy? | 1,799 | About 9 min |
| 2 | Marketing is about to message every user | 1,649 | About 9 min |
| 3 | Publishing a story does too much | 1,762 | About 10 min |
| 4 | Two readers clap at the same instant | 933 | About 5 min |
| 5 | Can the other reader see the clap without refreshing? | 1,550 | About 9 min |
| 6 | The app is closed. Can you still reach the reader? (incl. what you can now do, 4 recall questions, hand-off to Lecture 3) | 1,223 | About 7 min |

Total ≈ 9,860 counted this way (≈ 8.9k without the overview's chapter list and page chrome). The old page was ≈ 26–29k. Reading times ≈ words / 200.

Spine: Lecture 1's viral post is in one shared cache, but every hit still crosses the network → the homework answered, walking out from the API server: local RAM (two servers, two copies; fine for published posts, sticky sessions) → the mostly empty disk (pause; page cache; the bank engineer from Lecture 1 was this idea) → browser → CDN (API responses, /popular, ISP caches) → gateway (TTL) → the whole route; caches can't help with new work → marketing will message every user: what scaling means → vertical ceiling (pause) → horizontal, load-tested capacity, Prime Day division, autoscaling lag, scale first then send → five API servers, the cascade (clip) → bottom-up, the database is brittle → bigger machine, read replicas (replica pulls, app routes reads), lag (stepper), critical reads (pause: bank balance), sharding (hash trap → Lecture 9), no formula, multi-master last → every write still lands on one master; the key write is Publish → total_blogs counter → Hotstar rule, request context → delegate and respond, broker, protect the DB → queue, visibility timeout, at-least-once ("it comes back") → search wants the event: one worker, two writes, 74/75/76 (stepper) → stream, retention, own pace (clip), queue vs stream by cost → Kafka topics, partitions, key, per-partition order, consumer groups (pause: 5 consumers, 3 partitions) → commit, crash, +4 twice (stepper), at-least-once → "a second way to get a count wrong, no crash" → two claps on 100 (pause) → count++ is three steps (clip) → locks (traffic signal), optimistic, atomic, CRDT → a lock in one server can't see the other: let the database add (`claps = claps + 1`) → lost update vs double count → Lecture 3 → the other reader still sees 100 → request/response, REST → short polling (pause: 6M/min) → long polling → WebSocket (clip: three ways to hear "ready"), cost of state → Lecture 4 → SSE, ticker arithmetic both ways, claps via POST + SSE → none of these reach a closed app → push via FCM/APNs, 2015 story → what each hop speaks → final map, what you can now do, recall → Lecture 3's check-in.

Section ids keep the old numbering on purpose (1 caching, 2 scaling with s2-4 = replicas/sharding, 3 delegation with s3-1…s3-7 in the old order, 4 concurrency with s4-3 = the database +1, 5 communication with s5-5 = SSE), and chapters 1–5 keep their old slugs, so the 24 `LectureLink sec=` links from lec02, lec06, lec07, lec09 and lec10 still land on matching content.

## Figures

- **Added** `site/src/figures/lec01/so-far.tsx`: `SoFarMedium` (stages 0–6), desk 640 + phone 330, kit only. Stage 0 = where Lecture 1 left the blog (reader → api ×3 → shared cache, db); 1 caches along the route + RAM/disk; 2 api ×5 + replicas; 3 Kafka with counter and search consumers; 4 `claps = claps + 1`; 5 WebSocket for live claps; 6 push service. Each chapter opens on the previous stage's addition marked "new"; 6.3 shows stage 6 as the end state.
- **Kept**: TwoCopies (stepper), ApiServerSpace, CdnAndIsp, CacheRoute, CapacitySpike, F2fLag (stepper; step 3 text now the writer's own profile), BlogCountSqs, TwoWritesCrash (stepper), Fig3g, Fig3j (stepper), TrafficSignal, LongPolling, ServerSentEvents, PushPath, MediumHops; clips l01-cascade, l01-queue-vs-stream, l01-count-race, l01-polling. Captions rewritten without "redrawn from the board" and class times. `fig-5a.tsx` (helpers), `s1-parts.tsx` and `scaling-db.tsx` (used by `content/samples/scaling-the-database.mdx`) stay.
- **Dropped and deleted** (nothing imports them): fig-1a MediumSoFar/TwoKindsOfCache (superseded by so-far; duplicate of the stepper), fig-1e MaterializedView (Lecture 1 already taught it), fig-1g ConfigPlatform (story kept as a Go deeper), fig-2a VerticalLadder (pause carries it), fig-2b ScalingPlan, fig-2c MediumLB, fig-2e three-panel options, fig-2g ReplicaTree (→ Go deeper text), fig-2h RowsVsTables, fig-3a ProfileCard, fig-3b DelegateRespond (duplicate of 3c), fig-3d QueueConsumers stepper (one paragraph instead), fig-3f QueueStreamPoster (duplicate of the clip), fig-3h consumer cap (pause carries it), fig-3i Kafka→SQS (→ Go deeper), fig-3k SNS, fig-4a ConcurrencyPage (board list), fig-4b LostUpdate stepper (duplicate of the clip), fig-5b ShortPolling and fig-5d WebSockets (the clip covers them), fig-5f WsBehindLb (→ Go deeper text), fig-5i WirePacket (one sentence), fig-6a MediumEnd (superseded by so-far stage 6), rule-1…rule-5 sketches (slogans).
- The unused clip `l01-replica-lag` (no posters) was not used; the lag stays a stepper.

## Cut, and why

- Course admin (feedback, no transcripts, intros, Hotmail), agenda, deferral chips with week numbers, NotationKey, SectionEnd concept lists, per-chapter Check-yourself (one set of 4 recall questions at the end instead).
- All 28 "More precisely"/SourceNote boxes and the security "Correction": the fact-checked version is stated once in the text (in-process caching at every scale; EBS vs instance store and the page cache; Cloudflare defaults and `private`; ALB caches nothing, gateways can flush; Netflix Open Connect; vertical limits are also cost and single point of failure; scheduled scaling/warm pools; SRE book on cascades; replica pulls, primary streams; hash mod N → consistent hashing; RDS 15 replicas, Aurora failover; delegation moves writes, doesn't remove them; SQS at-least-once, 30 s default visibility, DLQ; Kafka 7-day retention, exactly-once only Kafka-to-Kafka, share groups in 4.2; optimistic takes no lock, binary semaphore, atomic increment, CRDTs; `claps = claps + 1` under READ COMMITTED and FOR UPDATE; REST as a style; HTTP/1.1 keep-alive; long-poll parking and RFC 6202; WebSocket upgrade; WebSocket cost is state, WhatsApp 2M; SSE EventSource reconnect, LLM APIs; ticker 40 GB/s at a million clients; FCM replaced GCM, APNs best-effort).
- Trivia and Q&A tangents: SD-card/USB bus detail beyond one paragraph, the college data-centre story, JWT/OWASP, offline-first service workers, Prerender.io, CDN RAM-vs-disk debate, Akamai history, SK Broadband lawsuit, video streaming, local Redis on the box, pub/sub cache invalidation (one line → Lecture 4), materialized-view mechanics (one line, Lecture 1 taught it), autoscaling group mechanics beyond one rule, libpq/Aurora routing, binlog access, hierarchical replica arithmetic, clustering/Oracle RAC, vertical sharding, leader election detail, SQS→Kinesis team story, SNS and SNS+SQS, RabbitMQ streams, tools converging/MongoDB ACID, Kafka "broadcast" (unverified), Kinesis shard limits and KCL leases, in-memory vs infrastructure queue, streams vs distributed transactions (one clause remains), visibility-timeout equivalents, SSE testing, on-prem outbound channels, L4 vs L7 detail, socket/port limits, UDP, compression, security/DDoS.
- The old example of a Medium "import" for polling (not from the lecture) is gone; polling uses the lecture's EC2 launch and cricket score.
- "To be honest about the example… manufactured" is replaced by the board's own reason: stored pre-computed to avoid a join on every profile view.
- `[[L-…]]`/`k=` tags kept on retained content; no coverage gate run.

## Shared-file change

None. `origin` and `footnote` frontmatter fields already exist from the pilot.

## Self-check

- `pipeline/bin/site.sh build lec01`: ok (10 pages). `links lec01`: zero broken. `figures lec01`: ok at 360/390/768/1440, light + dark (the first run caught a 435 px overflow from a long inline `UPDATE …` in ch3; moved to a code block).
- Grep of every built page (HTML stripped, incl. SVG `<desc>` and alt/aria/title/data attributes) for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student`: **0 hits** (two "the classic" matches were reworded).
- Titles alone: where else could you keep a copy? → marketing is about to message every user → publishing a story does too much → two readers clap at the same instant → can the other reader see the clap without refreshing? → the app is closed, can you still reach the reader? Reads as one blog's story. No title or blurb names the disk, the cascade, streams, the lost update or a channel; the 2.3 title asks "Who feels it?".
- Pauses (6): disk (1.3), hardware ceiling (2.1), bank balance (2.4), 5 consumers / 3 partitions (3.6), two claps (4.2), 6M polls (5.2). Answers are hidden until a choice is clicked; the paragraph after each moves on (1.3 → why it wins; 2.1 → the wrong answer and the cost/SPOF caveat; 4.2 → why count++ is three steps). The 74/75/76 crash is a predict-then-step stepper with no pause, so it isn't told twice.
- Go deeper boxes: ch1, ch2, ch3, ch5, one each, collapsed, each ≤ ~80 words. Lecture links: Lecture 1 (lec04), 3 (lec05), 4 (lec02), 7 (lec09), 9 (lec07), at most two per chapter.
- 7-sentence retell: (1) Copies can live at every stop of the route, browser, CDN, gateway, API RAM and disk, shared cache, materialized view; local ones trade consistency for a network hop, fine for posts that rarely change. (2) Scaling means concurrent requests; vertical hits hardware and cost limits, horizontal needs load-tested capacity and capacity raised before a known spike. (3) More API servers pass the load down and can cascade, so scale bottom up; grow the database with replicas (watch lag, send critical reads to the master), then shards. (4) Keep the request minimal and delegate through a broker; a queue for one job, at least once. (5) Two jobs in one worker break on a crash (74/75/76); a stream lets each consumer keep its own position; partitions cap parallelism and commits make delivery at-least-once. (6) Two concurrent claps lose one because count++ is three steps; let the database add, and make repeated writes safe. (7) For live claps, short polling costs requests, long polling holds them, WebSockets are two-way state, SSE is one-way and simple, and push reaches a closed app through FCM/APNs.

## Unsure

- Ch1 is at the ceiling (1,799) counting stepper steps and the hidden pause answer; ch4 (933) is just above the floor.
- 2.1's pause answer is the lecture's hardware-bus explanation; the next paragraph adds the fact-check's "cost and single point of failure usually stop you earlier". That is two sides, but the lecture itself gave only the hardware answer.
- 4.3's sentence that an in-process lock on one API server can't protect a clap that lands on another server is my reasoning, used as the bridge to "let the database add"; the lecture says to use transactions/atomic operations but doesn't spell out that step.
- 1.6 calls the local-copy trade "well worth making" for rarely changing data (the lecture: "the best thing ever").
- The so-far map shows "api ×5" from chapter 3 on (the lecture's 100 rps × 5 example and the cascade clip); Lecture 1 never fixed a server count beyond the "three servers" of its cache-aside clip.
- Story/post wording: the steppers and figures say "story 42" (Medium's word), the prose mostly "post"; 1.2 says once that Medium calls posts stories.
- Incoming links: anchors that other lectures use all exist (s1-1, s1-5, s2-4, s3-1…s3-7, s4-3, s5, s5-5); lec09/s10a links s3-7 with text "committing, and why messages come back", which still matches 3.7. lec02's header calls §5 "short polling, long polling, server-sent events and WebSockets", still true of chapter 5.

## Revision 2 (after review_reader.md and review_facts.md)

New counts (same method as above, i.e. built page incl. headings, captions, stepper steps and hidden answers; ≈ 75–115 words of each page are headings/§/meta/footer):

| # | Title | Words |
|---|---|---|
| – | Overview | 921 |
| 1 | Where else could you keep a copy? | 1,773 |
| 2 | Marketing is about to message every user | 1,742 |
| 3 | Publishing a story does too much | 1,799 |
| 4 | Two readers clap at the same instant | 904 |
| 5 | Can the other reader see the clap without refreshing? | 1,575 |
| 6 | The app is closed. Can you still reach the reader? | 1,282 |

Total ≈ 10,010.

**review_facts (all applied):**
- E1: FCM/GCM dates.
- E2: MySQL framing given as an example.
- E3: MDN example "fits on one screen".
- E4: EventSource sends the last ID only if events have IDs.
- E5: the DLQ is only there "if you configure one".
- I1: the "writer's own new post" rule is replaced by the general rule (decide which reads are critical; the balance is the example).
- D1: the vertical-scaling answer is now "the strangest answer"; the senior-engineer clause is dropped at the reader's request.
- D2: single-queue wording.
- D3: the fallback rule is now the general lesson.
- D4: Lecture 4 "picks the channel for Slack".
- D5: Lecture 4 forward reference made accurate.
- L1: the "what to delegate" list is in 3.1.
- L2: "the stream did not make the writes atomic; you still need a distributed transaction" is in 3.5.
- L3: partition count sized to the consumption rate.
- L4: horizontal scaling's fault tolerance and network-split cost.
- C1: 2.3 title is now "Five API servers now"; new clip caption.
- C2: Fig 1·e label and desc now say "no shared service" (not "no network hop").

**review_reader:**
1. **Live claps channel:** the blog keeps the WebSocket, which is the lecture's own choice and reason (L-0274, L-0279: claps go both ways). 5.4 says so and introduces the real-time likes service from Fig 6·c. 5.5 presents POST + SSE as the valid alternative. The Fig 6·a caption and so-far desc name the likes service.
2. **Campaign arithmetic:** uses only the ledger's 100 rps × 5 = 500 (L-0088), placed in 2.2 as the load-test division. 2.2 now says the blog already runs three servers behind a load balancer (Lecture 1). The clip is left as is (its own one-server example); its caption says so. The map stays 3 → 5.
3. **Delegation motive:** "one +1 is cheap, but it is never just one" (search index L-0163, an email notification L-0156, burst writes and the brittle database L-0149/L-0150, the join alternative L-0142), then the Hotstar rule and the L-0171 list.
4. **Clip retellings:** removed the 3.5 prose retelling. The ch4 section that duplicated the clip's setup is gone. The collapsed "clip as text" transcripts are kept (accessibility; rendered by the shared AnimationClip component).
5. "Didn't chapter 1 protect the database?" now opens 2.3.
6. **Ch1:**
   - EBS caveat finished: instance store is AWS's recommendation for caches.
   - Page cache said to use RAM the applications aren't using.
   - The proxy/gateway stop moved between the CDN and the ISP paragraph, and the ALB is called out as caching nothing. Fig 1·e stop 3 relabelled "proxy / api gw".
7. **Ch3 stepper:**
   - Step 4 now reads "Search is now right at 75, but the count says 76 for 75 stories".
   - 3.4 ends saying that splitting the jobs won't stop a repeated write.
   - "Why not two queues?" is answered from L-0306/L-0307 (SNS in front of per-team SQS queues; no history).
   - Repeat-safe counter: store the consumer's position in the same transaction as the +1 (the fact-check's "offsets stored with the data").
8. **Ch6:**
   - 6.1 calls back to chapter 2's campaign.
   - 6.2 is motivated by counting the connection kinds the lecture added.
   - The 2015 story is cut to one sentence.
9. **Detours:**
   - Old 4.1 "Why run many threads" is folded into the chapter opening. Ch4 sections are now 4.1 lost clap, 4.2 "Can a lock in your code fix it?", 4.3 the database +1, so the s4-3 anchor is kept.
   - Semaphore, atomics and CRDTs moved to a Go deeper box.
   - "An ordinary transaction is not enough" is now explained (default isolation, both read 100), from the fact-check on L-0231.
   - RPC/REST cut to one parenthesis.
   - Recommendations story and React Query cut from 1.4.
10. **Housekeeping:**
    - "Medium-style site" introduced once in the overview, plus the post/story/`blogs` naming in ch1.
    - Figure ids renumbered to match their numbers, so step links read e.g. `#fig-2c/step-3`: 1e, 2b, 2c, 3b, 3c, 3d, 3e, 5b, 5c.
    - Kicker and description now say "Lecture 2".
    - The mid-lecture Lecture 3 hand-off is cut from ch4.
    - Ch3, ch4 and ch6 blurbs de-spoiled.
    - Fig 3·b title is now "The blog count, delegated".
    - Other per-chapter items: the bank answer reworded; the read-routing decision stated in the body; the sharding paragraph split; short polling described as the usual tool for long jobs (L-0240) with its cost after; the million-readers number carried into long polling; the ticker assumption stated; "WebSockets cost the most to operate".
11. The ch5 intro was already free of furniture.

**Rejected or changed:**
- **"Lecture 02" in the chapter kicker and footer:** generated by the shared page templates (`pad(num)`) for every lecture. Not changed, to stay out of shared files.
- **Reader's "push the writer's own new post to the master" rule:** conflicts with I1 (not taught), so it is stated as a per-read decision instead.
- **Reader's "S3 is not a CDN" fix:** the ledger says mobile configs went to a CDN instead of S3 (L-0316). The sentence is reworded to "to S3, or to a CDN for mobile apps".
- **Hotstar "serves cricket to tens of millions":** not in the sources. It is now only "the Indian streaming service Hotstar".
- **Reader's "API server writes to both queues" argument:** not in the sources. The ledger's SNS + SQS fan-out with no history is used instead.
- **Reader's "remember counted story IDs":** replaced by the fact-check's "store the position with the data".
- **Reader's suggested 500 rps "campaign forecast":** the ledger's numbers are a generic example, so they are framed as "if a load test says 100 and the peak needs 500", not as marketing's forecast.
- **Reader's kernel page-cache "gives back under pressure" sentence:** shortened to "built from RAM the applications aren't using".
- **Clip internals (one-server start in l01-cascade):** not edited; only the caption explains it.

**Re-checked:** build ok (10 pages); links zero broken; figures ok at 360/390/768/1440 light+dark; banned-word grep on built HTML (incl. SVG desc and attributes) 0 hits; `page_text.md` regenerated.

## Revision 3 (review_facts_final.md, exam_grade.md)

- **N1–N8 applied with the given text:**
  - N1: Clip 3·1 lead.
  - N2: delegation motive points to the brittle master.
  - N3: the sharding trigger.
  - N4: the 2.3 opener.
  - N5: "reverse proxy" in the Fig 2·a caption, the so-far descs 1 and 6, and 6.3.
  - N6: "every push notification".
  - N7: "connections the blog now uses".
  - N8: the recall answer now says 500 requests a second.
- **CUT-LOSS sentences added, each checked against its ledger id and fact-check:**
  - Q087, §3.6: the SQS → Kinesis team story, L-0310/L-0312/L-0313, worded as a *standard* SQS queue.
  - Q098, §3.6: why a classic group gives each partition one owner, L-0361. It goes after the pause, so the hidden answer isn't restated.
  - Q097, §2.4: vendor clusters shard for you, plain MySQL/PostgreSQL don't, L-0356/L-0357/L-0358. It says "many vendor clusters", because the fact-check notes that shared-disk clusters exist.
  - Q090, §2.4 Go deeper: about five per master as a rule of thumb, then a tree of five feeding two each, L-0326/L-0329. The fact-check's "depends on write rate; RDS caps at 15" is kept.
  - Q109, §3.5: RabbitMQ streams, so check what a tool does today, L-0395/L-0396.
  - Q100, end of §1.4: the DevTools pointer, L-0369/L-0371.
- **Q023/Q026:** "linear amplification" and "premature optimization" are each named once in §2.2.
- **Compensating trims** in ch1–3 kept the chapters at the ceiling: 1,799 / 1,804 / 1,816 counted with headings and page furniture (≈ 1,700 of body text each). Ch4 904, ch5 1,575, ch6 1,286, overview 921; total ≈ 10,120.
- **Re-checked:**
  - build ok (10 pages);
  - links zero broken;
  - figures ok at 360/390/768/1440 light and dark;
  - banned-word grep 0 hits;
  - `page_text.md` regenerated.
