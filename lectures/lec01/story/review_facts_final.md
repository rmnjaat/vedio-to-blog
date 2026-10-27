# Lecture 2 (lec01) story rewrite: final fact and faithfulness re-check

Scope: the final `site/src/content/lectures/lec01.mdx`, `lec01/s0-header.mdx` and `c1`–`c6`, the text of every figure the pages import (`site/src/figures/lec01/so-far`, `fig-1b`, `1c`, `1d`, `1f`, `2d`, `2f`, `3c`, `3e`, `3g`, `3j`, `4c`, `5c` (LongPolling), `5e`, `5g`, `5h`: labels and descs), the clip leads, captions and "clip as text", and the built text in `story/page_text.md` (Revision 2).
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `factcheck/additions_verified.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`, `lectures/STORY_BRIEF.md`.
No page files were edited.

**Result:** all 17 earlier items are fixed (5 errors, 1 invention, 5 distortions, 4 losses, 2 contradictions). The fresh pass found **8 new low-severity issues**. Most are in sentences added in Revision 2: the delegation motive, the 2.3 opener, the sharding trigger, the 6.1 call-back and the 6.2 opener. One is a clip lead question that the clip cannot answer. There are no medium or high issues. The WebSocket/SSE choice, the 100 → 500 rps arithmetic, the 74/75/76 stepper and the rest of 6.1–6.2 check out against the sources.

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| E1 c6 §6.1 FCM/GCM | **Fixed** | “Firebase Cloud Messaging for Android (GCM’s successor; Google deprecated GCM in 2018 and announced its removal for April 2019), Apple’s APNs for iPhones.” |
| E2 c6 §6.2 wire framing | **Fixed** | “A database wire protocol says how a SQL query is framed on the connection. MySQL’s, for example, sends a length, a sequence number, a command byte, then the query text.” |
| E3 c5 §5.5 MDN lines | **Fixed** | “What you get in exchange is simplicity: MDN’s working example, server and page together, fits on one screen.” |
| E4 c5 §5.5 EventSource | **Fixed** | “…the browser’s `EventSource` reconnects by itself if it drops and, if the server gave its events IDs, tells the server the last one it saw.” |
| E5 c3 §3.3 DLQ | **Fixed** | “A dead-letter queue, if you configure one, catches a message that keeps failing.” |
| I1 c6 §6.3 critical read | **Fixed** | “Decide which reads are critical, such as an account balance, and send those to the master; everything that can be a little old goes to a replica.” (§2.4 also: “Which reads can tolerate that window is a decision you make for each read in your code, not a database setting.”) |
| D1 c2 §2.1 “answer you hear most” | **Fixed** | “‘The console doesn’t show a bigger option’ is the strangest answer to this, and it explains nothing.” (The senior-engineer clause was dropped at the reader reviewer’s request. That loses an anecdote, not a fact, and is acceptable.) |
| D2 c3 §3.5 queue | **Fixed** | “A single queue can’t give you that: each message goes to one consumer at a time, which deletes it when done, so only one kind of job ever processes it.” |
| D3 c1 Go deeper fallback | **Fixed** | “The general lesson: a fallback that rarely runs is never tested, so make it part of the normal path, as this design did.” |
| D4 c5 §5.5 Lecture 4 and SSE | **Fixed** | “It is a common, valid pattern; Lecture 4 picks the channel for Slack.” |
| D5 c1 §1.2 Lecture 4 and local caches | **Fixed** | “Making many local copies agree the moment a post changes is a harder problem; it needs the servers to tell each other about changes, a publish/subscribe channel like the one Lecture 4 builds for Slack.” |
| L1 c3 §3.1 what to delegate | **Fixed** | “The same test sorts most work: long-running jobs (launching a server, encoding a video), heavy queries, writes that can be batched, and anything allowed to be eventually right belong outside the request.” |
| L2 c3 §3.5 stream ≠ distributed transaction | **Fixed** | “Notice what the stream did not do: it never made the two writes atomic. It works here because the count and the index are independent jobs that may each lag and catch up. When two stores must agree at every moment, you still need a distributed transaction.” |
| L3 c3 §3.6 partition count | **Fixed** | “(Size the count to the consumption rate you expect, and choose it up front: add partitions later and keys start landing elsewhere, and you can’t remove them.)” |
| L4 c2 §2.2 horizontal pros/cons | **Fixed** | “You also gain fault tolerance, since losing one machine no longer loses the service, and you pay with a more complex architecture and a network between machines that can split.” |
| C1 c2 §2.3 three vs five | **Fixed** | Title: “Five API servers now. Who feels it?” Clip 2·1 caption: “Five API servers send all their queries to one database that was never scaled. It saturates, the servers time out waiting on it, and the site goes down with it. (The clip starts from a single server to keep the picture small.)” §2.2 now adds: “it already runs three servers behind a load balancer.” (A smaller leftover in the 6.4 recall answer is N8 below.) |
| C2 Fig 1·e “no network hop” | **Fixed** | `fig-1f.tsx` label and bracket: “no shared service”; desc: “stops 4 and 5 answer without calling a shared service.” The §1.3 prose now matches: “served from memory without calling a shared service”. |

---

## 2. Fresh pass: new issues

### N1 (low): c3 §3.5, the lead question for Clip 3·1 has no answer in the clip
- **Current text (lead):** “Before you play it: Elasticsearch goes down for ten minutes. In which picture does the counter stop too?”
- **Source:** L-0175, L-0176. The clip (`l01-queue-vs-stream`, timeline and “clip as text”) puts three identical count++ consumers on the queue and search plus counter only on the stream. In neither picture does the counter stop.
- **Problem:** The question implies that one of the two pictures shows the counter stalling. The intended contrast is with §3.4’s single worker that does both jobs, and the clip doesn’t show that. A reader who commits to an answer finds no picture that matches it.
- **Replace with:** “Before you play it: Elasticsearch goes down for ten minutes. In the stream, does the counter have to wait for search?”

### N2 (low): c3 §3.1, the delegation motive misstates what chapter 2 showed
- **Current text:** “…and each job added inline makes every publish slower and lands one more write on the database at the same instant as everyone else’s. At a campaign peak, that is the load chapter 2 watched take the site down.”
- **Source:** L-0149, L-0150 (delegation removes synchronous write load, so protect the brittle database), L-0099–L-0101 (chapter 2’s cascade: queries from more API servers swamp an unscaled database). Chapter 2 itself ends: “The campaign lands and the site holds.”
- **Problem:** Chapter 2 never showed publish writes taking the site down. Its clip showed reads from five API servers against an unscaled database, and the chapter then says the site held. The callback makes up an event and contradicts chapter 2’s ending.
- **Replace with:** “At a campaign peak, those writes pile onto the one master that chapter 2 called the most brittle part of the system.”

### N3 (low): c2 §2.4, a sharding trigger the lecture didn’t give
- **Current text:** “When the master can’t take its writes even on the biggest machine, or when serving the replicas starts to weigh on it, you shard…”
- **Source:** L-0115 (shard when the master gets more traffic than it can handle after replicas and vertical scaling). The lecture’s answer to replication load on the master was a replica tree, L-0328, which the page’s own Go deeper box gives (“Need more? Let replicas feed replicas, a tree.”). Replication cost: L-0326 fact-check.
- **Problem:** “Serving the replicas starts to weigh on it” as a reason to shard isn’t in the sources, and it clashes with the Go deeper box two paragraphs later, which gives a different fix for that problem.
- **Replace with:** “When the master still can’t take its writes even on the biggest machine, with the replicas taking the reads, you shard…”

### N4 (low): c2 §2.3, an assumption about where campaign readers go
- **Current text:** “Didn’t chapter 1 protect the database? Its caches absorb the posts everyone reads, but a campaign sends readers everywhere, to profiles, lists and older posts, and every miss lands on the database.”
- **Source:** L-0099 (the extra requests the API servers accept are passed to their dependencies), L-0091 (the campaign brings a sudden spike). Nothing in the lecture says where campaign readers go.
- **Problem:** “Sends readers everywhere, to profiles, lists and older posts” is stated as fact but was invented for the bridge. The point needs only the general claim.
- **Replace with:** “Didn’t chapter 1 protect the database? Its caches absorb what they hold, but every request they can’t answer still lands on the database, and a spike brings many of those.”

### N5 (low): Fig 2·a, so-far descs and §6.3 place a cache “at the load balancer”, against §1.5
- **Current text:** Fig 2·a caption: “Marked new: copies along the whole route, in the browser, at the CDN and load balancer, and in each API server’s RAM and disk.” `so-far.tsx` desc 1: “…caches along the route, in the reader’s browser, at the CDN and at the load balancer…”; desc 6: “browser, CDN and load balancer caches”. §6.3 bullet 1: “Browser, CDN, load balancer or gateway, API-server RAM…”
- **Against:** §1.5: “a plain load balancer such as AWS’s ALB only routes and caches nothing”, and Fig 1·e stop 3, now labelled “proxy / api gw”. Source: L-0068 (imprecise/medium: nginx as a reverse proxy and API gateways cache, the ALB doesn’t).
- **Problem:** Chapter 1 moved the cache from the load balancer to the reverse proxy or gateway, but the map and the summary still put it on the load balancer. (The lecture’s “load balancers like nginx” is the source of the wording, but the page has already corrected it.)
- **Replace:** Fig 2·a caption → “Marked new: copies along the whole route, in the browser, at the CDN and the reverse proxy, and in each API server’s RAM and disk.” `so-far` desc 1 → “…in the reader’s browser, at the CDN and at the reverse proxy beside the load balancer, and on each API server’s own RAM and disk.” `so-far` desc 6 → “browser, CDN and reverse-proxy caches”. §6.3 → “Browser, CDN, reverse proxy or gateway, API-server RAM, …”

### N6 (low): c6 §6.1, the SMS in the campaign call-back
- **Current text:** “Remember marketing’s campaign in chapter 2? Every one of those notifications took this path.”
- **Source:** L-0091 (the campaign sends “an SMS or a message or a push notification”). Chapter 2 opens: “a push notification and an SMS to every user”.
- **Problem:** Read against chapter 2, “every one of those notifications” takes in the SMS, which goes through a carrier, not FCM or APNs.
- **Replace with:** “Remember marketing’s campaign in chapter 2? Every push notification it sent took this path.”

### N7 (low): c6 §6.2, connections “this lecture has added”
- **Current text:** “Count the kinds of connection this lecture has added: HTTP from the browser, pooled connections to the database and to Redis, a socket for live claps, the phone’s link to FCM.”
- **Source:** L-0253 and §5.4/§6.2 (“the pooled kind you met in Lecture 1”); the overview (Lecture 1 left the blog with API servers, a shared cache and a database).
- **Problem:** HTTP from the browser and the pooled database and Redis connections came from Lecture 1. A few lines later the same section says the pool is “the pooled kind you met in Lecture 1”.
- **Replace with:** “Count the kinds of connection the blog now uses: HTTP from the browser, pooled connections to the database and to Redis, a socket for live claps, the phone’s link to FCM.”

### N8 (low): c6 §6.4 recall 2, “five times the queries”
- **Current text (answer):** “Five API servers. But first make sure the database and every other dependency can take five times the queries, or the extra servers just pass the overload down and the whole site cascades.”
- **Source:** L-0088 (100 rps each, 500 rps → 5 machines), L-0099. This is the leftover from C1: the page’s blog goes from three API servers to five, not one to five.
- **Problem:** “Five times” of what is unclear. Against the blog’s three servers it repeats the 3 → 5 ≠ 5× mismatch that C1 removed from chapter 2.
- **Replace with:** “Five API servers. But first make sure the database and every other dependency can take the queries that 500 requests a second bring, or the extra servers just pass the overload down and the whole site cascades.”

---

## 3. Checked and correct (fresh pass)

Revision 2 changes:
- **WebSocket/SSE choice (§5.4–5.5, Fig 6·a, Fig 6·c, so-far 5/6):** both sides are given. The blog keeps the lecture’s WebSocket and its reason (“claps travel both ways”, L-0274, L-0279), and POST + SSE is presented as “a common, valid pattern” (L-0279 fact-check, simplified/low). The “real-time likes service” comes from the board (L-0274, board 02:09:30). “No universal winner… long polling suits waits of a few seconds” matches L-0278 (“5–10 s”). “WebSockets cost the most to operate (routing, reconnect storms)” matches L-0258/L-0278 and the L-0258 fact-check.
- **Campaign arithmetic (§2.2, Fig 2·b):** 100 rps per server, a 500 rps peak, five servers (L-0088). Framed as “if a load test says…”, as NOTES intends. Prime Day forecast ÷ tested capacity (L-0089). “BI” in Fig 2·b is the ledger’s own word. The three-server sentence agrees with Lecture 1’s page (`lec04/c8-viral.mdx`: “Three API servers…”).
- **Delegation motive (§3.1):** count → search index → email notification are all lecture examples (L-0156, L-0163). The join alternative is acknowledged in Fig 3·b’s “(a crude example)” (L-0142). Hotstar is told as a 2020 talk by a VP of engineering (L-0136, unverifiable, told as experience). See N2 for the one bad sentence.
- **Stepper logic (Fig 3·c):** 74 → 75 → crash (75/74) → retry (76/75) matches L-0165/L-0166. “Search is now right at 75, but the count says 76 for 75 stories” is correct. The follow-up (“Splitting them won’t stop a retry from repeating a write… but it will stop one team’s failure from re-running the other team’s work”) is sound and agrees with §3.7. “Why not two queues?” is answered from L-0306/L-0307 (SNS → per-team SQS, no history), consistent with the L-0307 fact-check. The repeat-safe counter (“storing the consumer’s position in the same database transaction as the +1”) is the fact-check’s “offsets stored with the data” (L-0195, SN-15).
- **§6.1:** the shared OS connection (L-0286 wrong/medium, applied), APNs best-effort with one pending notification (A-CM-23), mimic but not build (L-0284), calendar local notification (L-0285), the 2015 team cut to one sentence and told as experience (L-0287), FCM from its documentation (L-0288). See N6.
- **§6.2:** wire protocol, not dialect (L-0290 fact-check), RESP (L-0294), HTTP/1.1 persistent by default (L-0289), QUIC/HTTP/3 as the exception (L-0264 wrong/medium). Fig 6·c agrees with the text. See N7.
- **Ch1 additions:** instance store as AWS’s choice for caches (A-CS-04 verified: “ideal for buffers, caches and scratch data”). The page cache is built from RAM the applications aren’t using (L-0061 fact-check). The proxy/gateway stop and the ALB caching nothing (L-0068). Fig 1·e stop 3 “proxy / api gw”. Giphy for popular searches (L-0054). Netflix appliances inside ISPs (L-0347 fact-check). The bank engineer as experience (L-0063, matching Lecture 1’s telling). The config story is the student’s design, told as one team’s (L-0314–L-0320).
- **Ch4 re-sectioning:** the opening on threads (L-0217–L-0219, data correctness and throughput). The lost update and ~1,997 (L-0219, L-0230). The traffic signal (L-0224). Optimistic locking takes no lock (L-0221). The Go deeper semaphore/atomic/CRDT box (L-0223, L-0228, SN-18). “An ordinary transaction is not enough… both read 100” is the L-0231 fact-check (imprecise/medium), stated once.
- **§5.2–5.3:** EC2 “in progress” and Cricbuzz polling (L-0239, L-0241). An hour of identical responses (L-0245). The million readers carried into long polling (derived from L-0243). Parked requests and RFC 6202 ~30 s (L-0248, L-0277 fact-checks). “Does it scale? Yes” (L-0277, the teacher’s answer, confirmed by the fact-check). Harmless for a score, needs thought for a payment (L-0280).
- **Ticker (§5.5):** 10,000 × 4 B = 40 KB/s, and the 40 GB/s at a million clients (L-0281 and its fact-check), with the assumption stated.
- **Forward references:** Lecture 3 (lec05) is the airline check-in with row locks, then a key-value store on MySQL (its own description says so). Lecture 9 (lec07) builds consistent hashing. Lecture 7 (lec09) uses a CDN. Lecture 4 (lec02) builds WebSockets and Pub/Sub for Slack.
- **Figures in use:** all labels and descs agree with the text, apart from N5 (`so-far` descs 1 and 6). Fig 1·b, 1·c, 1·d, 1·e, 2·b, 2·c, 3·b, 3·c, 3·d, 3·e, 4·b, 5·b, 5·c, 6·b and 6·c were re-read. The clip leads, captions and texts for Clips 2·1, 4·1 and 5·1 agree with their timelines. Clip 3·1’s lead is N1.
- **Brief rules:** no “in class / the board / student / More precisely” wording in reader-facing text. Each correction is stated once. War stories (bank engineer, config team, Hotstar talk, 2015 push team) are told as experience.
