# Lecture 2 (lec01) story rewrite: fact and faithfulness review

Scope: `site/src/content/lectures/lec01.mdx`, `lec01/s0-header.mdx`, `lec01/c1…c6.mdx`, the text (labels and `desc`) of every figure those pages import (`so-far`, `fig-1b`, `1c`, `1d`, `1f`, `2d`, `2f`, `3c`, `3e`, `3g`, `3j`, `4c`, `5c` (LongPolling), `5e`, `5g`, `5h`), the clip captions and "clip as text" in `page_text.md`, and the writer's doubts in `NOTES.md`.
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `factcheck/additions_verified.jsonl`, `transcript/transcript.md`, `lectures/STORY_BRIEF.md`.
No page files were edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors | 0 | 0 | 5 | 5 |
| Inventions | 0 | 0 | 1 | 1 |
| Distortions | 0 | 0 | 5 | 5 |
| Important losses | 0 | 2 | 2 | 4 |
| Internal contradictions | 0 | 0 | 2 | 2 |
| **Total** | **0** | **2** | **15** | **17** |

No high-severity problems. Every medium/high fact-check correction that applies to retained content is applied, and stated once, in the main text. The two medium items are both missing lecture ideas in chapter 3 (what to delegate; streams do not replace distributed transactions). Everything else is wording.

---

## 1. Errors

### E1 (low): when FCM replaced GCM
- **Current (c6, 6.1):** "Firebase Cloud Messaging for Android (it replaced GCM in 2019)"
- **Source:** L-0284, L-0288 (outdated/medium), A-CM-24: "Google deprecated GCM in April 2018 and said its server and client APIs would be removed as soon as April 11, 2019; FCM replaced it." Transcript 02:16:41–02:20:36.
- **Problem:** FCM existed well before 2019. The 2019 date is when GCM's APIs were to be removed, and the verified addition words that as a plan ("as soon as"), not as an event.
- **Replace with:** "Firebase Cloud Messaging for Android (GCM’s successor; Google deprecated GCM in 2018 and announced its removal for April 2019)"

### E2 (low): one protocol's framing presented as every database's
- **Current (c6, 6.2):** "A database wire protocol says how a SQL query is framed on the connection: a length, a sequence number, a command byte, then the query text."
- **Source:** L-0291 (imprecise/low; treatment: "give the real MySQL framing (3-byte length + 1-byte sequence id)"). Transcript 02:21:06–02:22:20.
- **Problem:** The length, sequence id and command byte layout is MySQL's. PostgreSQL's messages begin with a type byte and then a length, with no sequence number. The sentence applies the fact-check's MySQL example to all databases.
- **Replace with:** "A database wire protocol says how a SQL query is framed on the connection. MySQL’s, for example, sends a length, a sequence number, a command byte, then the query text."

### E3 (low): "MDN’s working example is about twenty lines"
- **Current (c5, 5.5):** "What you get in exchange is simplicity: MDN’s working example is about twenty lines."
- **Source:** L-0271 (unverifiable): "MDN's 'Using server-sent events' page has a short PHP server example (about 25-30 lines, including the client). The exact '21 lines' could not be confirmed." Transcript 02:07:30–02:07:50.
- **Problem:** The number is stated as a checked fact, but the fact-check could not confirm it and measured more lines.
- **Replace with:** "What you get in exchange is simplicity: MDN’s working example, server and page together, fits on one screen."

### E4 (low): EventSource and the last event
- **Current (c5, 5.5):** "the browser’s `EventSource` reconnects by itself if it drops, telling the server the last event it saw"
- **Source:** L-0265 (simplified/low, A-CM-09/10), L-0379 ("reconnects by itself unless the client calls close() or the server answers 204"). Transcript 02:04:33–02:05:48.
- **Problem:** The browser sends `Last-Event-ID` only when the server tagged its events with an `id`. Without IDs it reconnects but cannot say where it stopped.
- **Replace with:** "the browser’s `EventSource` reconnects by itself if it drops and, if the server gave its events IDs, tells the server the last one it saw"

### E5 (low): the dead-letter queue presented as automatic
- **Current (c3, 3.3):** "A dead-letter queue catches one that keeps failing"
- **Source:** L-0210 (imprecise/medium): "Retries end at a dead-letter queue after maxReceiveCount, if you set a redrive policy." Transcript 01:35:16–01:36:03.
- **Problem:** SQS has no dead-letter queue by default. Without one, a message that keeps failing keeps coming back until its retention period runs out.
- **Replace with:** "A dead-letter queue, if you configure one, catches a message that keeps failing"

---

## 2. Inventions

### I1 (low): "a writer’s own new post" as a critical read
- **Current (c6, 6.3 bullet 3):** "Send critical reads, such as a balance or a writer’s own new post, to the master."
- **Source:** L-0112, L-0113 (the lecture's only example of a critical read is the bank balance; profile reads go to the replica). Transcript 00:52:33–00:53:36.
- **Problem:** The lecture never said that a writer reading their own new post is a critical read. The idea follows reasonably from the Fig 2·c stepper, but in "What you can now do" it reads as a rule that was taught.
- **Replace with:** "Decide which reads are critical, such as an account balance, and send those to the master; everything that can be a little old goes to a replica."

---

## 3. Distortions

### D1 (low): how common the "no bigger option" answer is
- **Current (c2, 2.1):** "“The console doesn’t show a bigger option” is the answer you hear most, even from senior engineers, and it explains nothing."
- **Source:** L-0081. Transcript [00:37:05]: "That's the most weird answer that I have got. I've … actually heard this answer from a senior engineer."
- **Problem:** The lecture called it the *weirdest* answer and said it came from *a* senior engineer. It did not say this is the answer you hear most often.
- **Replace with:** "“The console doesn’t show a bigger option” is the strangest answer to this, and you can hear it even from a senior engineer. It explains nothing."

### D2 (low): the queue in 3.5 is stated too strongly, and clashes with 3.3
- **Current (c3, 3.5):** "A queue can’t give you that, because a consumed message is deleted: whoever takes it is the only one who sees it."
- **Source:** L-0209 (simplified/low: "True of a single queue. Fan-out … is also possible with queue tech (SNS to multiple SQS queues…)"), L-0306 (the lecture itself: "You can mimic Kafka with SNS plus SQS"), L-0161 (imprecise/high, at-least-once). Transcript 01:34:32–01:35:15, 02:27:34–02:27:42.
- **Problem:** The lecture's point was about *one* queue. "The only one who sees it" also contradicts 3.3, which correctly says a message can arrive twice and go to another consumer.
- **Replace with:** "A single queue can’t give you that: each message goes to one consumer at a time, which deletes it when done, so only one kind of job ever processes it."

### D3 (low): the lecture's general rule is credited to one team
- **Current (c1, Go deeper box):** "Their reasoning: a fallback that rarely runs is never tested, so make it the normal path."
- **Source:** L-0319 (the teacher's general rule: "falling back is an anti-pattern because … you never test that part of your code"), L-0320/L-0321 (the team's design). Transcript 02:32:25–02:33:03.
- **Problem:** "Falling back is an anti-pattern" is a reusable rule the lecture stated for all designs. Crediting it to one team's reasoning makes it look like a local choice.
- **Replace with:** "The general lesson: a fallback that rarely runs is never tested, so make it part of the normal path, as this design did."

### D4 (low): what Lecture 4 does with SSE
- **Current (c5, 5.5):** "It is a common, valid pattern; <LectureLink lec="lec02">Lecture 4</LectureLink> weighs it against WebSockets for Slack."
- **Source:** L-0279 ("You can do that. We'll discuss it next week."). Transcript 02:12:53–02:13:56. The lec02 page mentions SSE only in passing (`lec02/s7-sending.mdx`: "though server-sent events or long polling also push").
- **Problem:** "Weighs it against" promises a comparison that the Lecture 4 page does not contain.
- **Replace with:** "It is a common, valid pattern; <LectureLink lec="lec02">Lecture 4</LectureLink> picks the channel for Slack."

### D5 (low): what Lecture 4 does with local-cache consistency
- **Current (c1, 1.2):** "Making many local copies agree the moment a post changes is a harder problem; <LectureLink lec="lec02">Lecture 4</LectureLink> comes back to it."
- **Source:** L-0046 (deferred to "next week"). Transcript 00:21:36–00:22:41. The Lecture 4 page uses Redis Pub/Sub to fan out chat messages between WebSocket servers, not to invalidate local caches.
- **Problem:** The forward reference promises something Lecture 4 does not deliver. Its Pub/Sub is the same tool, used for a different job.
- **Replace with:** "Making many local copies agree the moment a post changes is a harder problem; it needs the servers to tell each other about changes, a publish/subscribe channel like the one <LectureLink lec="lec02">Lecture 4</LectureLink> builds for Slack."

---

## 4. Important losses

### L1 (medium): which work to delegate
- **Missing:** L-0171 (board, 01:17:41): "Tasks that are delegated: long running tasks (spin up EC2 / video encoding), heavy computation query, batch & write, anything that could be eventual."
- **Why it matters:** This is the reusable test behind chapter 3. The page applies it once (the `total_blogs` count) but never gives the reader the general list, so they can't apply it to their own system.
- **Insert in c3, 3.1, after "…what changes is when, and who decides how fast. [[L-0139 L-0149]]":**
  "The same test sorts most work: long-running jobs such as launching a server or encoding a video, heavy queries, writes that can be batched, and anything that is allowed to be eventually right all belong outside the request. [[L-0171]]"

### L2 (medium): a stream does not replace a distributed transaction
- **Missing:** L-0362 (02:57:13–02:58:01): "Streaming does not replace distributed transactions … streaming works because two independent processes do two independent things with the same message, each at its own pace; in some cases you still need distributed transactions." L-0363 (02:58:01–02:58:25), fact-checked simplified/low with the outbox as an alternative (A-CS-25).
- **Why it matters:** The lecture explicitly addressed this misconception. Without it, 3.4 → 3.5 reads as though the stream solved the 74/75/76 inconsistency. It didn't: it made the two writes independent, and each can catch up on its own.
- **Insert in c3, 3.5, after "…owned by their own team. [[L-0178]]":**
  "Notice what the stream did not do: it never made the two writes atomic. It works here because the count and the index are independent jobs that may each lag and catch up. When two stores must agree at every moment, you still need a distributed transaction. [[L-0362 L-0363]]"

### L3 (low): how many partitions
- **Current (c3, 3.6):** "(Add partitions later and keys start landing elsewhere, so choose the count up front.)"
- **Missing:** L-0207's criterion: size by the consumption rate you expect (01:33:53–01:34:13). The fact-check (simplified/medium) adds the caveat that you can't remove partitions and that keyed mappings change. The page keeps the caveat but drops the lecture's actual answer.
- **Replace with:** "(Size the count to the consumption rate you expect, and choose it up front: add partitions later and keys start landing elsewhere, and you can’t remove them.)"

### L4 (low): what horizontal scaling buys and costs
- **Missing:** L-0076 (board 00:35:15, 00:40:30): pros are linear growth and fault tolerance; cons are a complex architecture and network partitions. The page has linearity and "deployment harder" but not fault tolerance or network partitions.
- **Insert in c2, 2.2, after "…any server can answer any request. [[L-0120]]":**
  "You also gain fault tolerance, since losing one machine no longer loses the service, and you pay with a more complex architecture and a network between machines that can split. [[L-0076]]"

---

## 5. Internal contradictions

### C1 (low): three servers or one, then "five times"
- **Current:** the c2 2.3 title "Five times the API servers. Who feels it?"; the Clip 2·1 caption "Five API servers forward five times the queries"; the clip text "Before the campaign: one API server". Against these: Fig 0·a / 1·a ("three API servers"), Fig 3·a ("five API servers instead of three") and the so-far map (api ×3 → api ×5).
- **Source:** L-0088 (100 rps × 5 = 500 rps), L-0099. Transcript 00:40:47–00:41:37, 00:45:45–00:46:41.
- **Problem:** On the page's own map the fleet goes from 3 to 5, which is not five times. The clip starts from one server.
- **Replace:** title → "Five API servers now. Who feels it?"; Clip 2·1 caption → "Five API servers send all their queries to one database that was never scaled. It saturates, the servers time out waiting on it, and the site goes down with it." (Leave the clip itself alone; its "one server" start is its own self-contained example.)

### C2 (low): the disk stop "needs no network hop"
- **Current (Fig 1·e, `fig-1f.tsx` label and desc):** "stops 4 and 5 need no network hop" / label "no network hop" over RAM and disk.
- **Against:** c1 1.3: "On AWS the default disk is an EBS volume, itself network-attached". Fact-check L-0061 (imprecise/medium), L-0059. Transcript 00:30:38–00:31:05.
- **Problem:** The page correctly says the default cloud disk is network-attached, and then the figure says reading it needs no network hop. What the disk cache saves is the call to a shared remote service; hot reads come from the page cache.
- **Replace:** label "no network hop" → "no call to a shared service"; in DESC, "stops 4 and 5 need no network hop" → "stops 4 and 5 answer without calling a shared service".

---

## 6. The writer's doubts (NOTES.md "Unsure")

1. **Ch1 at 1,799 words, ch4 at 933.** Not a fact issue. Both are inside the brief's 900–1,800 range.
2. **2.1: the hardware answer plus "cost and single point of failure usually stop you earlier".** Acceptable. The pause keeps the lecture's answer as the correct choice. The follow-up sentence is the verified fact-check nuance for L-0084 (simplified/low), and it says "in practice you usually stop earlier", which adds to the lecture's point rather than overruling it. No change. (D1 is a separate wording issue in the same section.)
3. **4.3: "a lock in one server’s memory means nothing to the other".** Acceptable. It is a direct, correct deduction from facts on the page: claps can land on different servers (L-0099/L-0120), and an in-process mutex is per process (L-0227). It doesn't contradict the lecture, which pointed to database transactions and atomic operations (L-0231), and the next sentence goes to exactly that. Optional tightening: "a mutex in one server’s memory can’t be seen by another".
4. **1.6: "well worth making" vs the lecture's "the best thing ever".** Fine. It is weaker than the lecture, not stronger, and it keeps the two conditions (data that rarely changes, stale-for-a-while acceptable) from L-0071.
5. **"api ×5" from chapter 3 on, and Lecture 1's three servers.** The 3 → 5 map is fine on its own (L-0088's 100 → 500 rps example). The problem is the "five times" wording and the clip's one-server start: see C1.
6. **Story vs post wording.** Fine. "Medium calls them stories" is true and harmless.
7. **Incoming links.** Not a fact question. The anchors exist. The lec02 header's description of §5 still holds.

---

## 7. Checked and correct

Fact-check corrections applied, stated once, no "More precisely" boxes:
- In-process caching at every scale (L-0022). Sticky-session failover loses the local copy (L-0020).
- EBS is network-attached and the page cache is why a disk cache wins (L-0059, L-0061, SN-03). Fig 1·c's latency ladder (100 ns / 150 µs / 500 µs, c. 2012) matches the jboner gist.
- localStorage is strings only, about 5 MiB, with IndexedDB for more (L-0045, L-0370). React Query keeps responses in page memory (L-0376).
- A CDN obeys headers, Cloudflare doesn't cache JSON by default, and personal data is marked `private` (L-0051).
- Netflix places its own servers inside ISPs (L-0347).
- nginx and API Gateway cache, the ALB caches nothing, and TTL is the main lever with flushing possible (L-0068, L-0308, L-0309, SN-06).
- Materialized views must be refreshed and pay off only for rarely changing data (L-0036, L-0037). No trigger claim survives.
- Vertical limits are also cost and a single point of failure (L-0084). Scheduled scaling and warm pools (L-0090, A-CS-20).
- Linear scaling holds only with no shared bottleneck (L-0088).
- Cascading failure worded as "a large share" and attributed to the SRE book (L-0101, unverifiable/low).
- Read:write rule of thumb hedged for logging, metrics and chat (L-0104).
- The replica asks and the master streams (L-0109, L-0327).
- The database doesn't route queries "in the plainest version" (L-0110).
- `% N` remaps keys, so real systems use consistent hashing or buckets (L-0117, simplified/medium).
- RDS allows 15 replicas, RDS replicas are promoted by you, Aurora promotes automatically in under a minute (L-0326, L-0122, SN-07, SN-08).
- Delegation moves writes, it doesn't remove them (L-0139, L-0149).
- SQS is at-least-once with a 30 s default visibility timeout (L-0161 imprecise/high, L-0210 imprecise/medium); see E5 for the DLQ wording.
- Kafka retention defaults to 7 days (L-0172, L-0174). Exactly-once only Kafka-to-Kafka, and external writes need idempotency or offsets stored with the data (L-0195, SN-15). Share groups in 4.2 (L-0190, SN-13).
- Cost: SQS per request vs Kinesis per shard-hour (L-0205).
- Optimistic locking takes no lock, a single-permit semaphore or mutex, AtomicInteger, and CRDTs as replicated types (L-0221, L-0223, L-0228, SN-18).
- `claps = claps + 1` under READ COMMITTED, `FOR UPDATE`, and "a plain transaction is not enough" (L-0231, SN-19).
- REST as Fielding's architectural style (L-0233). RPC nuance (L-0235).
- 6M requests a minute ≈ 100k a second (L-0243). HTTP/1.1 keep-alive, with request count as the real cost (L-0244 wrong/medium, L-0289).
- Long polling parks the request, with RFC 6202's ~30 s (L-0248, L-0277). Ready-made change detection is yours to write (L-0247).
- WebSocket upgrade handshake and wss (L-0255). Idle cost, WhatsApp's 2M, and backoff on reconnect storms (L-0258, L-0375).
- No sticky sessions for plain WebSockets, nginx headers, 60 s idle timeouts (L-0341, L-0391).
- SSE: one-way protocol over a TCP connection that could carry both directions (L-0385). LLM APIs as the counterexample (L-0269). The ticker at 40 KB/s per client and 40 GB/s at a million (L-0281). SSE claps via POST is valid (L-0279).
- The OS keeps one shared connection to the push service (L-0286 wrong/medium). APNs is best-effort, keeps one pending notification, may reorder (A-CM-23). Integrate FCM, not GCM (L-0288 outdated/medium).
- QUIC/HTTP/3 as the non-TCP exception (L-0264 wrong/medium). Wire protocol, not dialect, and RESP (L-0290, L-0294).

Lecture content faithfully kept:
- The homework list of cache places (L-0070) and the three-part answer (L-0011).
- The cache definition (L-0058, L-0066), two servers with two copies (L-0018, L-0021), published posts as nearly static (L-0025), multi-level caching with TTL and a cap (L-0026–L-0028).
- The 8 GB RAM / 20 GB disk example (L-0059, L-0060).
- The bank engineer told as experience. It matches Lecture 1's own telling (lec04 L-0255), and transcript [00:30:38] confirms "this was the exact optimization".
- The 50-show-10 trick (L-0049). Recommendations told as one team's story (L-0047). `/popular` at the CDN and Giphy (L-0053–L-0056).
- Scaling means concurrency (L-0078). Hulk/Minions (L-0073, L-0075). The SD-card and bus explanation (L-0082, L-0083).
- Load testing as the only way to know capacity (L-0094). Prime Day division (L-0089). Autoscaling rules (L-0131, L-0132). Small vs sudden spikes, so both sides kept (L-0090, L-0093). Team sport (L-0092). Vertical first for a young product (L-0095–L-0097).
- Bottom-up scaling (L-0100). The database as most brittle (L-0102). Bigger machine → replicas → shards (L-0121).
- The naive two-connection split (L-0111). Bank balance to the master (L-0113). Sharding into exclusive subsets (L-0116, L-0128, L-0330). One pool per shard (L-0127). No formula (L-0373). Multi-master conflicts (L-0388–L-0390). Replica trees (L-0328).
- Hotstar told as a talk the reader hears about (L-0136, L-0137). Request context (L-0138, L-0145). Delegate and respond with a broker (L-0144, L-0146).
- ON_PUBLISH/ON_DELETE (L-0147, L-0153). The next-refresh delay (L-0148). The iPhone-cover analogy (L-0151).
- The 74/75/76 stepper matches L-0165/L-0166 exactly. Distributed transactions are costly (L-0167). Separation of concerns (L-0169).
- Homogeneous vs heterogeneous consumers (L-0170). Own pace and search down (L-0175, L-0176).
- Topic, partition, key and per-partition order (L-0181–L-0188, L-0201). Consumer groups (L-0186, L-0359). Consumers 4 and 5 idle (L-0189). The per-group cap (L-0191). One consumer reading all partitions (L-0192). Kinesis shards (L-0197). Kafka→SQS fan-out (L-0336–L-0338).
- Commit, crash and +4 twice (L-0193, L-0194, L-0213). Batch commits (L-0208, L-0214).
- 100 → 102 not 101 (L-0230). The 1,000 × 2 threads → ~1,997 race in Clip 4·1 is the lecture's own number (L-0219). The traffic signal (L-0224).
- EC2 and Cricbuzz polling (L-0239–L-0241). The "server dies mid long-poll" Q&A (L-0280).
- WebSocket as a connection pool to the browser (L-0253). Chat, tickers, games, meeting chat (L-0257, L-0261, L-0262). Live claps over WebSocket (L-0274). No universal winner (L-0278). Build the hello worlds (L-0272).
- The calendar local notification (L-0285). The 2015 push story told as one team's experience (L-0287). What each hop speaks (L-0273).
- The forward references hold: Lecture 3 (lec05) is the airline check-in and the key-value store on MySQL (L-0296); Lecture 9 (lec07) builds consistent hashing; Lecture 7 (lec09) uses a CDN; Lecture 4 (lec02) scales WebSockets for Slack (L-0259).

Figures checked (labels and desc):
- `so-far` stages 0–6 agree with the chapter captions.
- Fig 1·b, 1·c, 1·d, 2·b (CapacitySpike, curves marked illustrative), 2·c, 3·b, 3·c, 3·d, 3·e, 4·b, 5·b, 5·c, 6·b and 6·c agree with the prose and the ledger. Fig 1·e is the exception, see C2. The "realtime likes" box in Fig 6·c comes from the board (L-0274, board 02:09:30), and "(a crude example)" in Fig 3·b is the board's own hedge (L-0142).
- `PollingPoster` in `fig-5c.tsx` still says "one import job", but no page imports it, so it isn't rendered. The page and the clip use "a job".

Brief rules: no remaining "in class / the board / student / More precisely" wording found in the chapters. War stories (bank engineer, recommendations team, config team, Hotstar talk, 2015 push team) are all told as experience, not as established fact.
