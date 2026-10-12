# Lecture 1: content fixes (section files `site/src/content/lectures/lec01/s*.mdx`)

Each item was checked against `transcripts/corrected/lec01/transcript.md` and `learn/lec01/ledger/ledger.jsonl` before it was changed. Every new outside fact has an inline `<Cite>` to a page that was opened.

Verification:
- Build: one `npm run build` under the lock, exit 0.
- Coverage: `coverage.mjs`, 392/400. The 8 missing are unplaced admin asides (L-0002, 0006, 0072, 0133, 0216, 0295, 0298, 0400).
- No `[[L-]]` or `k=` tag was removed.

## 1. Blind-exam fixes (exam_grade.md)

| Q | Change |
|---|---|
| Q019 | §1.8: added the board's six numbered places in board order, plus "the centralized remote cache was there all along" (board S20). Tagged `[[L-0011 L-0013 L-0031 L-0045 L-0053 L-0057 L-0068]]`, the items whose board text these lines are. |
| Q011 | §1.4: the first browser paragraph now carries the JWT ("saves a bunch of computation", L-0043) and web workers working offline and syncing back (L-0044), as taught at 00:20:47. The OWASP SourceNote moved right after it as the caveat. The Service Worker / Background Sync sentence now follows as how offline-first is built. |
| Q012 | §1.4: the recommendations case now comes first as "suggested in class from practice" (L-0047). It is followed by "The teacher restated it as a hack: hypothetically, Amazon…" (L-0048) and "Then he added a cheap trick…" (50 cached, show 10 at random, L-0049). There are no names and no dialogue. The separate "From practice: caching for perception" margin note was folded into this prose. |
| Q079 | §5.3 L-0277: "Holding a connection open… is a real disadvantage", plus "not a drop-in replacement for short polling: understand the use case… (the rule at the end of this section)" (02:11:46, 02:12:15). |
| Q097 | §2.4 "Clusters" note: "Do you then handle the sharding yourself? It depends on the database vendor: if they charge you, they handle it; with an open-source database that doesn't shard natively, you implement it" `[[L-0358]]` (02:53:32). |

## 2. Faithfulness audit (faithfulness.md)

### §0 and §1
- **s0:21 swap claim (medium):** removed. The page now says it follows the class order (L-0007, agenda 00:05:33), and keeps the delegation→concurrency rationale.
- **s0:31 untagged day-1 history:** reworded as "Medium's picture as this class starts" and dropped the invented "when one wasn't enough" history. Tagged `[[L-0013]]`, plus `k="L-0013"` on the figure.
- **s1:236/244 CDN disk (medium):**
  - It is now "In the class's view, on disk rather than in RAM", with the hedge that the class had no inside knowledge of how CDN providers do it (02:41:54).
  - The tiered model is now presented as a proposal from class, answered with "they can if they want, but there is no need; configs in RAM maybe, not gigantic user data" (L-0335).
  - The Fastly fact follows as a separate sourced sentence.
- **s1:378 fallback anti-pattern (medium):** now "The team treated a rarely used fallback path as an anti-pattern…". The page adds that this is their rule, not a settled one: memory→disk→CDN is still a fallback chain, and the class called the design interesting rather than endorsing the rule (L-0319, 02:33:13).
- **s1:252 L-0349:** "The class named Netflix as most likely the pioneer here, with a hedge. In fact Akamai…"
- **s1:181 L-0370:** "…and the class mentioned caching images there too. In fact it stores strings only…"
- **s1:67 / :392 RAM:**
  - The PauseAndThink now says "a 20 GB disk that is mostly unused".
  - The recall question now has 1 GB free RAM and 17 GB free disk, and its answer says RAM is scarce.
- **s1:112:** "for a few minutes" changed to "for a while".
- **s1:120:** ForwardChip changed to `when="next week"`.
- **s1:286:** the §1.7 meta is now "class 00:16–00:20".
- **s1 TradeoffTable:** three untaught cells (Redis invalidation "TTL, or on write", LB size "Small", mat. view size) are now "Not covered in class".

### §2
- **s2:275/278 replica arithmetic (medium):**
  - Text: "each feeding three, gives fifteen on the second layer (twenty in all); with two each, five plus ten makes fifteen in all."
  - Caption: "…feeds three more: fifteen on the second layer." The figure label `5 × 3 = 15` belongs to the figures agent (see below).
- **s2:36/44 invented million/newsletter/dozen-per-second:**
  - The opener is now the page's own framing: an SMS or push campaign, the same as L-0091 and §2.3.
  - `[[L-0077]]` now sits only on the database-focus sentence.
  - The per-second arithmetic was removed.
- **s2:94 L-0086:** "on real machines" removed. It now reads "showed him a demonstration of why a bigger part needs matching hardware".
- **Fig 2·e caption:** "Redrawn from the class board at 00:46 (D-06); the board's arrow ran master → replica, and it is reversed here to show the pull described at 00:50."
- **s2:212 PostgreSQL quote:** an ellipsis now marks the cut parenthetical.
- **s2:198:** "most young products should stay on it as long as they can" changed to "a young product starts there (2.2)".

### §3
- **s3a:34 (medium):** now "Suppose a publish request does everything before it answers…". "Today… on Medium" and the search-indexing step were dropped.
- **s3a:174 Pub/Sub / RabbitMQ:**
  - It now first says the class named RabbitMQ and Pub/Sub as having equivalents (L-0365).
  - Pub/Sub's ack deadline is cited to docs.cloud.google.com/pubsub/docs/lease-management.
  - RabbitMQ is "less direct: no per-message timeout, requeues unacked deliveries when the channel or connection closes", cited to rabbitmq.com/docs/confirms.
- **s3a:174 L-0366:** now "SQS is the one the class has leaned on most in practice."
- **s3b:251 L-0305:** now "Standard SNS doesn't keep messages for later readers, a point raised in class: …"
- **s3b TradeoffTable Ordering/Billing:**
  - Ordering cells: "Strict only on FIFO topics, per message group" and "Only with FIFO topics and FIFO queues".
  - Billing cells: "Per publish request and per delivery" and "SNS publishes (no per-message charge for delivery to SQS), plus SQS requests for every copy".
  - A source line under the table cites SNS FIFO, SNS pricing and SQS FIFO (all opened).
- **s3b:36 L-0174:** the "not 'almost forever'" rebuttal was dropped. The default-retention facts stay as a plain addition.
- **s3b:237 voice:** "and it holds up" cut.

### §4–§6
- **s4:26:** the idle-cores and 8-or-64 loops framing was cut. A short bridge remains, plus L-0009's "heart and soul".
- **s5:116 L-0277 (medium):** the RFC 6202 Cite was added and the sentence reworded. Each waiting client still holds a connection and a request, and after each event every answered client sends its next request straight away (RFC 6202 §2.1). It also keeps the teacher's "real disadvantage" (see Q079).
- **s5:269 Socket.IO:** now "The class suggested Socket.IO for the WebSocket hello world. Note that…"
- **s5:36 L-0232:** now "In the class's view, communication is the most neglected part…"
- **s5:259 L-0271:** now "…and it put MDN's working example at about 21."
- **s5:221 SN-25:** RFC 9293 Cite added after the 4-tuple sentence (§3.4.1, "A connection is defined by a pair of sockets").
- **s5:157 SN-21:** RFC 8441 Cite added: "(Over HTTP/2 the opening is an extended `CONNECT` request instead.)"
- **s5:265 L-0283:** now "A question in class raised that SSE can also sit behind a load balancer…; that works."
- **s5:197 L-0392:** now "A point raised in class adds that a layer 7 balancer can still make intelligent routing decisions…"
- **s5:84:** now "The cost is the sheer number of requests, each with its full HTTP overhead…"
- **s5:44:** "Worth twenty minutes" changed to "Worth watching".
- **s5:253 Vercel/Netlify:** removed from the first sentence. They stay only in the attributed "used to, then switched" sentence.
- **s5 voice:** trimmed these attributions:
  - "The class's example was an hour-long job"
  - "in the class's design" (×2, plus a table cell)
  - "as the class put it" (×2)
- **s6:61:** "in production" dropped.
- **s6:30:** the `count++` link is now marked as the page's own ("By the same token…"), and L-0085 is tagged on the §2.2 sentence only.

## 3. Critic text items (critic.md)

- **#5 Pause-and-think verdicts:**
  - All 9 cards now pass their own `right` and `wrong` strings: 18 strings, no duplicates.
  - Each right verdict agrees with its answer. Card 0 now prints "Right: Redis is one place among several." and its answer begins "No…".
  - Wrong verdicts end in a lead-in to the answer.
  - Not done here: marking the correct option after a wrong pick needs `PauseAndThink.astro`.
- **#8 Figure numbers:**
  - "Medium so far" (s0) is now unnumbered, so Fig 1·a appears only once.
  - Fig 5·e and 5·f were renumbered in reading order: WebSocket-behind-LB is now Fig 5·e, SSE is now Fig 5·f. Their ids (`fig-5e`, `fig-5f`) are unchanged.
- **#4 Clip 4·1 caption:** now tells the 100 → 102 story ("two claps on a count of 100, both threads read 100… 101 instead of 102"), matching Fig 4·b.
- **#10 ON-PUBLISH:** text and the Fig 3·g caption now say `ON_PUBLISH`.
- **#14 Copy voice:**
  - "Statutory warning" replaced by "**There is no central view.**"
  - The outage-reports biography became "Across the many outage reports the class has read…".
  - "in the class's experience, you get fights" trimmed.
  - The L-0086 note is shortened.
  - Attribution that the faithfulness policy requires (unverifiable or SourceNote items) was kept, so the "the class" count stays roughly level. Where the critic and the audit conflict, the audit wins.
- **#20 Chapter 5 pattern:** 5.1–5.7 are now `<Section>` blocks (`§ 5.x` kicker + h2, with dek, meta and crumb). The ids `s5-1`…`s5-7` are unchanged, and meta times come from ledger timestamps.
- **#15 Pacing:**
  - Not done in this pass: cutting 15% of the prose and capping "More precisely" boxes at one per §. That would remove fact-check content that `factcheck_applied.md` requires.
  - Only the recommendations margin note was folded into the prose.

## For other agents
- **Fig 2·g** (`fig-2g.tsx`): change the label to "5 × 3 = 15 on the second layer".
- **Fig 3·g** (`fig-3g.tsx`): spell the topic `ON_PUBLISH`.
- **Clip `l01-count-race`:** the chips, beats and clip-as-text should tell the 100 → 102 story to match the new caption.
- **`PauseAndThink.astro`:**
  - The default verdict strings are now unused by lec01.
  - It could highlight the correct choice after a wrong pick.
- **Fig 1·a** left panel still repeats "Medium so far" (critic #8). That is a figure change.

## Follow-up: captions matched to redrawn figures
- Fig 1·a (s1): the left panel is now "served by Redis, one network hop"; the right panel is "answered from local memory". Tags kept.
- Fig 3·d (s3a): the caption now explains dashed = consumer asks (pull), blue = message back, green = delete, red = crash and visibility timeout. Tags kept.
- Rebuilt under the lock (exit 0); coverage 392/400.
