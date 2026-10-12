# Lecture 01: faithfulness audit

Scope: the page sections `site/src/content/lectures/lec01/*.mdx` and the figure texts in `site/src/figures/lec01/*.tsx`. They were checked against `learn/lec01/ledger/ledger.jsonl` (using the `[[L-xxxx]]` and `k=` tags), `transcripts/corrected/lec01/transcript.md`, `lectures/lec01/lesson/factcheck_applied.md` and `learn/lec01/board/diagrams.md`. No site files were edited.

## Summary

| | Count | Medium | Low |
|---|---|---|---|
| Distortion | 19 | 4 | 15 |
| Invention (untagged and unsourced) | 10 | 1 | 9 |
| Fact-check application | 8 | 1 | 7 |
| Voice | 2 | 0 | 2 |
| Figures (beyond those counted above) | 0 | 0 | 0 |
| **Total** | **39** | **6** | **33** |

There are no high-severity issues.

**Coverage.** About 334 of about 363 paragraphs were checked (92%), across every section:

| Section | Paragraphs checked |
|---|---|
| s0 | 6/6 |
| s1 | 82/88 |
| s2 | 46/54 |
| s3a + s3b | ~105/115 |
| s4 to s6 | ~95/100 |

All 31 `<SourceNote>` components (SN-01 to SN-28) were checked, and so were all 36 inline clarifications and all 44 figure modules on the page.

**Fact-check application.** A mechanical check found every SourceNote from `factcheck_applied.md` beside its tagged claim with its listed source URLs. Two URLs are not on the page:
- RFC 8441 in SN-21. It is optional and not needed for the point.
- the MongoDB transactions link for L-0358. That is acceptable, because the Vitess link is used.

Every inline item is tagged on the page. The teacher's point survives in every SourceNote. The fact-check problems found are about *wording*: a correction replaces the teacher's point instead of sitting beside it, a citation is missing for one specific sentence, or an unverifiable item is not attributed.

**Voice.** No teacher–student dialogue and no student names were found on the page or in the figures. A grep for common AI-slop phrases found nothing. "The instructor" appears 4 times, each time for a first-person war story, which is acceptable.

### Most serious

1. `s0-header.mdx:21` (Distortion, medium): the page claims it "swaps" delegation before concurrency. The class already taught them in that order (agenda at 00:05:33).
2. `s1-caching.mdx:236,244` (Distortion, medium): CDN storage "on disk, not in RAM" is stated as fact. The teacher hedged it ("I don't know if they cache something on RAM or not", 02:41:54).
3. `s1-caching.mdx:378` (Distortion, medium): a student's view that "fallback is an anti-pattern" is presented as a rule. The teacher pushed back (L-0319, 02:32:25–02:33:13).
4. `s2-scaling.mdx:275,278` and Fig 2·g (Distortion, medium): "five each feeding three … fifteen in all" is arithmetically 20.
5. `s3a-delegation.mdx:34` (Invention, medium): the class's invented publish pipeline is stated as how real Medium works today.
6. `s5-communication.mdx:116` (Fact-check, medium): the L-0277 inline note has no RFC 6202 cite, and it turns a cost into a requirement.

Issue format: **[TYPE] severity** `file:line`, then the problem, the evidence and the fix.

---

## §0 Header and §1 Caching


- **[Distortion] medium** `site/src/content/lectures/lec01/s0-header.mdx:21` — Says "This page swaps the last two pairs into delegation before concurrency". False: the class itself taught delegation before concurrency (agenda: "scaling, then delegation, then concurrency, and then communication"; Delegation 01:05:42, Concurrency 01:44:56), and the page keeps that order. The sentence seems to come from L-0001's opening line ("Scaling, concurrency, delegation, and communication", 00:00), not the agenda. Evidence: L-0007 / transcript 00:05:33. Fix: drop the swap claim; e.g. "The page follows the class's order. Delegation comes before concurrency because the counter that delegation builds is exactly the thing concurrency breaks."
- **[Distortion] medium** `site/src/content/lectures/lec01/s1-caching.mdx:236,244` — "On disk, not in RAM" is stated as fact, and the teacher's hedge is lost: he said he has never worked for a CDN provider and doesn't know whether CDNs cache in RAM ("They can, if they want to"). Line 244 also brings in the "tiered model" without saying it was a student's proposal that the teacher answered with "I don't see a need". Evidence: L-0333, L-0335 / transcript 02:41:07, 02:41:54 ("I don't know if they cache something on RAM or not"). Fix: "In the class's view, a CDN keeps this on disk rather than in RAM…", and add "(the class added it had no inside knowledge of how CDN providers do it)". Introduce the tiered model as a proposal from the class.
- **[Distortion] medium** `site/src/content/lectures/lec01/s1-caching.mdx:378` — A student's opinion is stated as a general rule: "A rarely used fallback path is an anti-pattern… Make the 'fallback' part of the normal path". The ledger status is `open`. The teacher pushed back ("but then it's kind of fallback… you go to CDN and fetch it") and only called the design "pretty interesting". He did not endorse the rule. Evidence: L-0319 / transcript 02:32:25–02:33:13. Fix: "The team treated a rarely used fallback path as an anti-pattern…", and keep the teacher's pushback that memory→disk→CDN is still a fallback chain.
- **[Factcheck] low** `site/src/content/lectures/lec01/s1-caching.mdx:252` — The L-0349 inline treatment replaces the teacher's point instead of keeping it. The page says "Netflix is the best-known user of this level. It wasn't the first", but the teacher's hedged claim was that Netflix was "mostly the pioneer". Policy says the teacher's point stays and the Akamai fact is added. Evidence: L-0349 / transcript 02:49:50 ("I'm not sure if they were, but Netflix was mostly the pioneer"). Fix: "The class named Netflix as most likely the pioneer here (with a hedge); in fact Akamai placed servers inside ISPs from the late 1990s, and Open Connect (2011) is the best-known single-provider version."
- **[Factcheck] low** `site/src/content/lectures/lec01/s1-caching.mdx:181` — The L-0370 inline clarification contradicts the teacher's point ("cache images and what not" in localStorage) without ever stating it. A reader can't see what was taught. Evidence: L-0370 / transcript 03:00:30. Fix: "The class mentioned caching images there too; in fact it stores strings only, so images belong in…"
- **[Distortion] low** `site/src/content/lectures/lec01/s1-caching.mdx:67` (PauseAndThink q) and `:392` (Recall q) — "8 GB of RAM and a 20 GB disk, most of it unused" reads as if the RAM is mostly free, and the recall question gives "6 GB of free RAM". Both contradict the taught point that API-server RAM is scarce and mostly spoken for. Evidence: L-0060 / transcript 00:29:59–00:30:38. Fix: "…a 20 GB disk that is mostly unused", and make the recall's free RAM small (for example "1 GB of free RAM and 17 GB of free disk").
- **[Distortion] low** `site/src/content/lectures/lec01/s1-caching.mdx:112` — "for a few minutes" adds a duration that wasn't taught. The class said "it's okay if it updates in some time". Evidence: L-0025 / transcript 00:14:16. Fix: "for a while".
- **[Distortion] low** `site/src/content/lectures/lec01/s1-caching.mdx:120` — The ForwardChip says "a later week". The teacher deferred pub/sub invalidation to "next week". Evidence: L-0046 / transcript 00:21:36–00:22:41. Fix: `when="week 2"`, or "next week".
- **[Distortion] low** `site/src/content/lectures/lec01/s1-caching.mdx:286` (meta of §1.7) — The meta says "class 00:13–00:18", but the views and materialized-views segment runs 00:16:14–00:20:24. Evidence: L-0030 (00:16:14), L-0040 (00:20:24). Fix: "class 00:16–00:20".
- **[Invention] low** `site/src/content/lectures/lec01/s0-header.mdx:31` — The "Medium so far" day-1 recap (two API servers added when one wasn't enough, one shared Redis next to the DB) has no tag and no source in this lecture's ledger. Only the board at 00:30 (cited in the caption) supports the picture. Evidence: no L-id; board 00:30 only (L-0013 detail). Fix: tag [[L-0013]] for the picture, and either reference day 1's page for the history or soften it to "Medium's picture so far".
- **[Invention] low** `site/src/content/lectures/lec01/s1-caching.mdx:361–362` (TradeoffTable) — Some cells were never taught and have no source: Redis invalidation "TTL, or on write", LB/gateway size "Small", Mat. view size "The database's disk". Evidence: none in L-0014/0028/0037/0068/0308/0367. Fix: drop these or mark them "—". Alternatively cite (Redis on-write invalidation could point to the 1.2 redis.io link).

---

## §2 Scaling


- **[Distortion] medium** `site/src/content/lectures/lec01/s2-scaling.mdx:275` and Fig 2·g caption `:278` — "Five replicas at the top, each serving three of its own (two would also do), gives fifteen" / "each of those feeds three more, fifteen in all". Five plus 5×3 is twenty replicas, not fifteen in all; "two would also do" only reaches 15 if the top five are counted (5 + 5×2). The teacher's sentence is ambiguous ("five at the top layer and then everyone gets three … or other two, two, two … complete your 15 replicas"). The figure itself labels "5 × 3 = 15" for the second layer only. Evidence: L-0329 / transcript 02:38:38. Fix: "Five replicas at the top, each feeding three, gives fifteen on the second layer (twenty in all); with two each, five plus ten makes fifteen." Caption: "…each of those feeds three more: fifteen on the second layer."
- **[Invention] low** `s2-scaling.mdx:36` and `:44` — "newsletter campaign … a million readers may arrive within minutes" and "A million readers spread over a day … about a dozen requests a second" are tagged [[L-0077]]/[[L-0078]], but neither item (nor the transcript 00:35:18–00:35:57) has a million, a newsletter or the per-second arithmetic. It also clashes with §2.3 `:132`, where the same campaign is a push notification (the teacher's examples are SMS/push, L-0091). Fix: make the framing scenario plainly the page's own (no ledger tag on the numeric sentence, or move the tag to the concurrency sentence only), and use "SMS or push notification" consistently.
- **[Distortion] low** `s2-scaling.mdx:94` (MarginNote L-0086) — "demonstrated the physical limits behind vertical scaling on real machines". The transcript says only "he actually showed me a demonstration of that, that how changing one helps you get the other"; "on real machines" is added. Evidence: L-0086 / 00:39:10. Fix: "…and showed him a demonstration of why a bigger part needs matching hardware."
- **[Distortion] low** Fig 2·e caption `s2-scaling.mdx:190` — "Redrawn from the class board at 00:56", but the board diagram (D-06, frame b_010530, listed at 00:46:15) draws a white arrow master → replica; the page reverses it to replica → master (the teacher's spoken point, L-0109) without saying so. The time also doesn't match D-06. Fix: "Redrawn from the class board (D-06); the replica arrow is reversed to show the pull the teacher described at 00:50:40."
- **[Factcheck] low** `s2-scaling.mdx:212` (SourceQuote, PostgreSQL §26.2.5) — the second quoted sentence leaves out the docs' parenthetical "(see Section 26.2.8)" between "asynchronous by default" and ", in which case" with no ellipsis. The quote is otherwise faithful and the URL is plausible. Fix: insert "…" at the cut, or quote the parenthetical.
- **[Distortion] low** `s2-scaling.mdx:198` — "most young products should stay on it as long as they can". L-0103 says only that vertical is the easy first step; L-0095/L-0096 say start vertical and avoid premature optimisation, not "as long as they can". Fix: "It is the easy first step, and a young product starts there (2.2)."

No voice issues found: there is no dialogue and no student names. "The instructor" appears twice (`:94`, `:170`), which is acceptable. L-0330 (a student proposal) is presented as fact at `:283`, which is fine because the teacher endorsed it at 02:38:55 ("Correct.").

---

## §3 Delegation (s3a, s3b)


- **[Invention] medium** `s3a-delegation.mdx:34`: "Today a publish request on Medium does everything before it answers. It validates the story, saves it, bumps the author's count, indexes the story for search..." has no tag, and it states as fact how real Medium works. The class built the pipeline step by step as a made-up example (the count is "deliberately manufactured", L-0142). Search indexing only appears later, as an extension (L-0163). Evidence: L-0141/L-0142/L-0163; transcript 01:07:50 "I'm just manufacturing this use case". Fix: make it hypothetical ("Suppose a publish request does everything before it answers: ...") and drop "Today ... on Medium".
- **[Invention] low** `s3a-delegation.mdx:174`: "Google Pub/Sub has the same thing under the name *ack deadline*. RabbitMQ gets there another way: it has no per-message timeout, and it requeues unacknowledged messages when the consumer's channel closes." These are outside facts with no Cite. They come from the factcheck note on L-0365 (§3 "left as taught", with no source given). It also quietly contradicts the teacher's claim that RabbitMQ has an equivalent, without marking that as a correction. Evidence: L-0365 (02:59:23 "equivalent ... in RabbitMQ and Google Pub/Sub"). Fix: add Cites (cloud.google.com Pub/Sub ack-deadline doc; rabbitmq.com/docs/confirms), or cut the sentences back to the teacher's point.
- **[Distortion] low** `s3a-delegation.mdx:174`: "SQS itself is used very widely in practice. [[L-0366]]" turns the teacher's personal experience into a general industry claim. Evidence: L-0366 "The teacher has used SQS very widely" (02:59:23 "I've used SQS very widely"). Fix: "The class leans on SQS a lot in practice" or similar, or drop it.
- **[Distortion] low** `s3b-delegation.mdx:251`: "SNS doesn't keep the messages for later readers. A subscriber that wasn't listening misses them. [[L-0305]]" states a student's remark as course fact. The ledger has it as student/open (the teacher didn't respond), and the factcheck says it holds only for standard SNS (FIFO topics archive). The page fixes the FIFO point 9 lines later but not here. Evidence: L-0305 (02:27:29 "So can SNS has no persistence", status open). Fix: "Standard SNS doesn't keep messages for later readers (a point raised in class)..." with "standard" added.
- **[Invention] low** `s3b-delegation.mdx:305,308` (TradeoffTable rows "Ordering" and "Billing"): these cells have no k tag and no source. "None on standard topics" and "Only with FIFO topics and queues" (SNS FIFO ordering isn't cited anywhere on the page), and "SQS requests for every copy, plus SNS" (SNS pricing isn't cited). Fix: add a source line under the table (SNS FIFO docs, aws.amazon.com/sns/pricing), or say "not covered in class" as the Billing/Broadcast cell already does.
- **[Factcheck] low** `s3b-delegation.mdx:36`: L-0174 is "left as taught + A-DC-08 woven in as a separate sourced sentence, not as a correction". The page says "the default is not 'almost forever'", which quotes the teacher's wording (ledger detail 01:21:50 "persisted almost forever") as a rebuttal, without saying it was the class's phrase. Evidence: L-0174 detail; factcheck_applied §3 row L-0174. Fix: drop the rebuttal clause and keep the sourced default-retention sentence as a plain addition.
- **[Voice] low** `s3b-delegation.mdx:237`: "That is the class's rule, and it holds up." is an unsourced editorial endorsement (filler). Evidence: L-0206 (unverifiable, should be "worded as the class's opinion"). Fix: cut "and it holds up".

---

## §4 Concurrency, §5 Communication, §6 What to keep


### s4-concurrency.mdx
- **[Invention] low** `s4-concurrency.mdx:26` — framing "one machine that pulls one message… most of the time it is waiting on the database, and most of its cores sit idle. Run eight or sixty-four of those loops…" is not in the lecture; only the last sentence (heart and soul of systems at scale) is L-0009. Teacher's motivation was "extract the most out of your single machine" (01:44:56), no idle-core/8-or-64 argument. Evidence: L-0009 (00:06:00), L-0217 / transcript 01:44:56. Fix: mark as the page's own bridge (one short sentence) or cut the idle-cores/8-64 specifics; keep L-0217's wording.

### s5-communication.mdx
- **[Factcheck] medium** `s5-communication.mdx:116` — L-0277 is simplified/medium; factcheck_applied requires the inline sentence *with* https://www.rfc-editor.org/rfc/rfc6202. The sentence is there but has no Cite. Also the wording turns a cost into a requirement: "What it needs is an async, event-driven server: … and after each event every client re-requests at once" (the re-request burst is a cost, not something it needs). Evidence: factcheck_applied §2 row L-0277. Fix: add `<Cite href="https://www.rfc-editor.org/rfc/rfc6202">RFC 6202</Cite>` and reword: "It needs an async, event-driven server; each waiting client still holds a connection and a request, and after each event every client re-requests at once."
- **[Distortion] low** `s5-communication.mdx:116` — page says "It is tempting to conclude… In fact it holds up", dropping that the teacher first *agreed* the held connection is a disadvantage. Evidence: L-0277; transcript 02:11:46 "Correct. That's a disadvantage, that your connection is open until you get the response." then 02:11:54 "It is scalable". Fix: "Holding a connection open until the answer comes is a real disadvantage. It doesn't stop long polling from scaling, though: …"
- **[Distortion] low** `s5-communication.mdx:269` — the teacher explicitly told the class to "Implement WebSockets with Socket.io" (twice); the page reduces this to "The board named Socket.IO next to WebSockets" and then steers readers away from it, so the teacher's recommendation is no longer visible. Evidence: L-0272; transcript 02:07:30 "Implement WebSockets with Socket.io", 02:10:11 "write WebSocket using Socket.io". Fix: "The class suggested Socket.IO for the WebSocket hello world. Note that Socket.IO isn't a plain WebSocket implementation: … To learn raw WebSockets, …"
- **[Factcheck] low** `s5-communication.mdx:36` — L-0232 ("most neglected part of system design") is listed in factcheck_applied §4 as "the class's opinion or heuristic, worded as such", but the page states it as fact. Evidence: factcheck_applied §4 row L-0232; transcript 01:50:38. Fix: "In the class's view, communication is the most neglected part of system design."
- **[Factcheck] low** `s5-communication.mdx:259` — L-0271 is unverifiable (number) "worded as such"; "MDN's working example is about 21 lines of code" is stated as checked fact. Evidence: L-0271, transcript 02:07:30. Fix: "The class's estimate was hardly 14 lines, and it put MDN's working example at about 21."
- **[Factcheck] low** `s5-communication.mdx:221-223` — SN-25 lists https://www.rfc-editor.org/rfc/rfc9293 as a source (for the 4-tuple claim), but the note cites only Cloudflare and WhatsApp. Fix: add an RFC 9293 Cite after the 4-tuple sentence. (Similarly SN-21 at :157 omits RFC 8441 — optional.)
- **[Distortion] low** `s5-communication.mdx:265` — "SSE can be set up behind a load balancer…" is a student statement (L-0283 status `open`; teacher's affirmation unclear, transcript 02:16:26 `[check: "Yes" may be the Teacher answering]`), presented as settled class content. It is true, so no correction needed. Fix: "A question in class raised that SSE can also sit behind a load balancer, so the backend scales out like any other; that works." or attach a source.
- **[Distortion] low** `s5-communication.mdx:197` — L-0392 ("a layer 7 LB can make intelligent routing decisions") was a student's counter-point (status `open`) to the teacher's "it does not matter"; page appends it as "And…" as if part of the same conclusion. Evidence: transcript 03:10:42-03:11:11. Fix: "One student added that a layer 7 balancer can still make intelligent routing decisions, which a pure layer 4 tunnel can't."
- **[Invention] low** `s5-communication.mdx:84` — "The cost is the number of requests, not their size" is the page's own claim and slightly undercuts the teacher's "far too much of HTTP overhead" (01:55:09). Fix: "The cost is the sheer number of requests, each with its full HTTP overhead."
- **[Invention] low** `s5-communication.mdx:44` — "Worth twenty minutes" asserts a video length that appears nowhere in the lecture or ledger (L-0234). Fix: drop "twenty minutes" ("Worth watching if…").
- **[Distortion] low** `s5-communication.mdx:253` — Vercel/Netlify are given as typical SSE users, then the next sentence says they switched away from it. Evidence: L-0267 detail / L-0268, transcript 02:05:48 "They used to leverage it. Now they switched". Fix: first sentence: "deployment logs streaming into the browser while a build runs in CI/CD tools," and leave the Vercel/Netlify mention only in the attributed second sentence.
- **[Voice] low** `s5-communication.mdx` (whole section) — ~22 attribution phrases ("the class's answer/view/words/design/experience/estimate/verdict", "as the class put it" ×2, "According to the class"). Most are required by the unverifiable/SourceNote policy, but several aren't: e.g. :127 "The class's example was an hour-long job", :323 and :370 "in the class's design", :165 "as the class put it" (the SourceNote already sits right there). Fix: keep attribution only where a SourceNote or the unverifiable policy needs it; trim the rest.

### s6-keep.mdx
- **[Distortion] low** `s6-keep.mdx:61` — "has used UDP twice **in production**": the teacher said only "I've used UDP twice" (transcript 02:25:58; L-0300 "in practice"). Fix: drop "in production".
- **[Invention] low** `s6-keep.mdx:30` — the heuristic links the `count++` race (§4.2) to "computer architecture"; the teacher's CS-fundamentals point (L-0085, 00:39:20) was about the vertical-scaling hardware ceiling only. Fix: cite only §2.2, or say "and, by the same token, the count++ race in §4.2" as the page's own link.

No other issues: s4 lost-update and lock text, s5 short/long polling semantics, WebSocket/SSE direction, push notifications and wire protocol all match the ledger and transcript; no student names; no AI-slop phrases found.

---

## Figures (check 5)

Checked all 44 lecture-1 figure modules imported by the page (fig-1a … fig-6a, rule-1 … rule-5) by their visible labels and `<desc>` text, against `learn/lec01/board/diagrams.md` (D-01 … D-20), `lectures/lec01/lesson/figures.md` and the ledger.

What matches (no action):
- **Replication direction** (Fig 2·e, 2·f, 2·g, 6·a): dashed arrows run replica → master, labelled `replica pulls` / `pulls`; Fig 2·f step 4 is "changes since my position?" replica → master, with the reply on the same exchange. This matches the teacher's point (L-0109, 00:50:40 "Replica is pulling the changes from the master") and the SN-08 / L-0109 inline note. The board's white arrow (D-06b) is master → replica; the redraw deliberately follows the spoken correction, which is right.
- **Kafka** (Fig 3·g, 3·h, 3·j): key = user_id hashed to a partition, "u7 → always p1", ordered within a partition, no order across partitions (L-0183, L-0184, L-0188, L-0201); `#partitions = 3`, two extra consumers get no messages, "the cap applies per group" with a second group having its own 3 (L-0187, L-0189, L-0191, D-14); commit after 0–3 → committed 4, crash before commit, re-read 4–7, at-least-once, "queue → delete · stream → commit" (L-0193 – L-0196, L-0213).
- **Queue semantics** (Fig 3·d): m1 → consumer 2, m2 → consumer 1, m3 → consumer 3, delete after processing, crash → visibility timeout "10 s … 10 min, whatever you configure" (L-0159, L-0364, L-0210).
- **Two writes, one crash** (Fig 3·e): 74 → 75, crash before the ES write, retry → 76 vs 75 (L-0165, L-0166, L-0167).
- **Polling** (Fig 5·a – 5·e): REQ/RES "kept open with a timeout" + heavy lifting (D-15, L-0236); short polling every few seconds, redundant answers, cost per request (D-16, L-0238, L-0245); long polling held until data is available, "timeout → reconnect, ask again" (D-17, L-0246, L-0249, L-0250); 10 s interval → 6 requests/min × 1M = 6M/min (L-0243, with the "per minute, not concurrent" wording from the L-0243 treatment); WebSocket bidirectional, kept open, server speaks first (D-18); SSE subscribe once, then one-way (D-19, L-0265, L-0385).
- **Medium hop by hop** (Fig 5·h): HTTP reader ↔ api, persistent TCP ↔ db ("not WebSocket"), WS to a separate `realtime likes` box, RESP to redis (D-20, L-0273, L-0274, L-0294).
- **Fig 1·c** 8 GB RAM mostly used, 20 GB disk with 2–3 GB used (L-0059, L-0060); **Fig 1·g** matches L-0314 – L-0321; **Fig 2·a** 16 GB → 4 TB ladder and the 256 GB slot / 512 GB card (L-0080, L-0082); **Fig 2·c** 100 rps × 5 = 500 rps (L-0088); **Fig 4·b** 100 + 2 claps = 102, 2 threads × 1,000 → ~1,997 (L-0219, L-0230).
- Fig 3·a replaces the board's real name on the profile card (D-07) with "A. Writer"; acceptable.

Issues:
- **[Distortion] medium** Fig 2·g (`site/src/figures/lec01/fig-2g.tsx:33,69,70`) and its caption (`s2-scaling.mdx:278`): this is the same issue as §2's first item, and it is counted there. The label `5 × 3 = 15` beside "the master feeds 5 replicas; each of those feeds 3" reads as 15 in total, but that is 20. Evidence: L-0329 / 02:38:38 ("five at the top layer and then everyone gets three … or other two, two, two … complete your 15"). Fix: label it `5 × 3 = 15 on the second layer`, or draw 2 per branch with `5 + 5 × 2 = 15`.
- **[Distortion] low** Fig 2·e caption (`s2-scaling.mdx:190`): this is the same issue as in §2 and is counted there. The redraw reverses the board's D-06 master → replica arrow, which is right per L-0109, but the caption says only "redrawn from the class board". Fix: say that the arrow follows the spoken correction.
- **Note (not counted):** `site/src/figures/lec01/scaling-db.tsx:80` still says `≈5 per master`, which is the label SN-08 replaced. The Lecture 1 page does not import this file (only `content/samples/scaling-the-database.mdx` does), so it does not affect this page. Fix: if the sample is kept, change the label to `a few per master` there too.
