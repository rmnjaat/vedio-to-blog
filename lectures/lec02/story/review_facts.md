# Lecture 4 (lec02) story rewrite: fact and fidelity review

Scope:
- `site/src/content/lectures/lec02.mdx` and `lec02/{s0-header,c1…c10}.mdx`.
- The text (titles, labels and `desc`) of every figure those files import from `site/src/figures/lec02/`, read from source and from `story/page_text.md`.
- The alt text, captions and clip-as-text of the four clips: `l02-column-scan`, `l02-three-ways-to-persist`, `l02-mesh-to-pubsub` and `l02-missed-message`.

Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`, `story/NOTES.md` and `lectures/STORY_BRIEF.md`. The Slack real-time messaging article was re-opened for the send-path doubt. No page file was edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / invalid code or design step) | 0 | 1 | 3 | 4 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 1 | 1 | 2 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions | 0 | 1 | 4 | 5 |
| **Total** | **0** | **3** | **8** | **11** |

High and medium:
- **F-01 (medium, distortion)**: in four places, saving first is stated as a fact about Slack. The teacher called it "my hypothesis, I may be wrong", and Slack Engineering does not state the order.
- **F-02 (medium, error)**: the page says that when WS1 publishes on Redis channel `c1`, Redis pushes the message only to WS2. WS1 is also subscribed to `c1`, so Redis sends the message back to WS1 too. Without a filter, B, C and D see every message twice.
- **F-03 (medium, contradiction)**: chapter 6 settles the send road as HTTP to the API server, then save, then push. Chapters 7 and 8 then draw A sending straight to WS1, which is the WhatsApp-like road.

---

## Issues

### F-01 · DISTORTION · medium · Slack's save-first order stated as fact
- **Where:**
  - c10 §10.2: "Slack’s saves through the API first", and the Fig 10·b caption "Slack’s setting saves through the API first".
  - c9 Clip 9·1 caption: "on Slack’s save-first road the push is lost the same way".
  - c10 recall question 2 answer: "The guarantee: a message is shown only after it is saved".
  - Clip 6·1 alt/clip-as-text: "Path 1, Slack, saving first". The clip itself shows "Slack (a hypothesis)".
  - c6 §6.2: "So the promise is: **a message is shown to others only after it is saved.**" This sentence reads as Slack's promise. The hedge comes only two paragraphs later.
- **Problem:** the teacher hedged this explicitly: "First is Slack. That's my hypothesis. I may be wrong" (01:29:19). The fact-check (L-0209, simplified/low) confirms only half of the flow. Slack Engineering (Apr 2023) confirms the HTTP send and the WebSocket receive. Re-opened for this review, the article still gives no order: its only mention of persistence is that transient events "are not persisted in the database".
  - §6.2 already carries the hedge once, as this build's choice. That is the right single statement.
  - The four places above then restate the order as Slack's own, which undoes the hedge. The brief's rule is that each correction is stated once and not contradicted later.
- **Sources:** L-0203, L-0206, L-0209, L-0210, L-0410; fact-check L-0209 (A-MLA-03). Transcript 01:28:08–01:32:58. https://slack.engineering/real-time-messaging/
- **Replacement:**
  - §6.2, first sentence of the second paragraph: "So the promise this build makes, and the likeliest reading of Slack’s, is: **a message is shown to others only after it is saved.**"
  - §10.2: "That is the WhatsApp-like road. This build’s Slack saves through the API first; Zoom chat’s skips saving."
  - Fig 10·b caption: "… This build’s Slack setting saves through the API first; the real-time half is the same."
  - Clip 9·1 caption: "… on this build’s save-first road the push is lost the same way. …"
  - Recall 2 answer: "The guarantee this build gives: a message is shown only after it is saved, since a refresh reads the database and an enterprise needs the record. …"
  - Clip 6·1 alt text: "Path 1, Slack as this build reads it, saving first: …". This matches the on-screen "Slack (a hypothesis)".

### F-02 · ERROR · medium · Redis also pushes the message back to WS1
- **Where:** c8 §8.2: the code block, step 3 of the Fig 8·b stepper ("Redis pushes it to WS2, the only other server subscribed to `c1`"), and the Fig 8·b desc ("published once to Redis channel c1 and pushed only to WS2"). The phone desc has the same text.
- **Problem:** WS1 subscribed to `c1` when A connected, and the code block shows that `SUBSCRIBE`. Redis Pub/Sub delivers a `PUBLISH` to every subscriber of the channel, the publishing server included. So WS1 receives "standup in 5" back from Redis right after it has already pushed the message to B, C and D. If WS1 handles that copy like any other, B, C and D see the message twice.
  - The lecture's walk-through (L-0292) skips this as well. Even so, the design on the page is wrong as drawn, and Fig 8·b reinforces the error.
- **Sources:** L-0283, L-0289, L-0291, L-0292. Transcript 02:08:36–02:14:20. https://redis.io/docs/latest/develop/pubsub/
- **Replacement:**
  - Stepper step 3: "WS1 publishes on Redis channel `c1`. Redis <span class="term blue">pushes</span> it to every server subscribed to `c1`: WS2, and WS1 itself, which drops its own copy because it already delivered it. WS3 is subscribed to `c2` only and gets nothing."
  - Add after the code block: "WS1 is subscribed to `c1` too, so Redis hands the message back to it. Tag every published message with the id of the server that sent it (or keep the message id), and have each server skip its own."
  - Fig 8·b desc: "… published once to Redis channel c1 and pushed to WS2 (and back to WS1, which skips its own message) …".

### F-03 · INTERNAL CONTRADICTION · medium · chapters 7–8 draw the send as A → WS1
- **Where:**
  - c7 Fig 7·b, step 3: "A sends `standup in 5` to C1. WS1 knows who is in C1, skips the sender…".
  - c8 Fig 8·b, step 1: "A posts in Slack channel C1. WS1 receives it." The figure's blue arrow runs from lane A to ws1, labelled "C1: standup in 5", although the api lane is in the same figure.
  - Clip 8·1 text: "When A sends a message, WS1 delivers it…".
- **Problem:** chapter 6 ends with "Sending is settled: HTTP to an API server, saved, then handed to the WebSocket server to push". The SoFar figures for chapters 7–9 draw the same thing (api → ws1). The steppers in the next two chapters then show A sending straight to its WebSocket server, which is the WhatsApp-like road chapter 6 rejected for Slack.
  - The lecture's own whiteboard took that road. The teacher's later diagram was Kafka-based on purpose (L-0236). But the page chose save-first throughout (NOTES, "Cut"), so a reader now sees two different send roads in the same build.
- **Sources:** L-0209, L-0236, L-0250, L-0283, L-0292. Transcript 01:31:22–01:32:58, 01:54:09–01:55:21, 02:13:24–02:14:20.
- **Replacement:**
  - Fig 7·b step 3: "A’s message for C1, saved by the API server, reaches WS1. WS1 knows who is in C1, skips the sender and sends it to B, C and D."
  - Fig 8·b step 1: "A posts in Slack channel C1. The API server saves it and hands it to WS1."
  - In the figure, start the blue arrow at the api lane, or label it "saved, via api".
  - Clip 8·1 text: "When A’s message arrives (saved by the API server), WS1 delivers it to B, C and D…". This is a text change only; nothing drawn changes.

### F-04 · ERROR · low · one Redis connection can't both SUBSCRIBE and PUBLISH (RESP2)
- **Where:**
  - c8 §8.2 code block (`SUBSCRIBE c1` … `PUBLISH c1 "standup in 5"`, both "# WS1"), together with "the server holds one connection to Redis".
  - §8.1: "every WebSocket server opens a single connection to it".
- **Problem:** under RESP2, the default protocol, a connection that has issued `SUBSCRIBE` accepts only (P|S)SUBSCRIBE, (P|S)UNSUBSCRIBE, PING, RESET and QUIT. A `PUBLISH` on it fails. Client libraries therefore keep one subscriber connection and one command connection; Socket.IO's Redis adapter uses a pub client and a sub client. The point about connection count still holds, because the number is constant per server and not one per peer.
- **Sources:** L-0278, L-0280, L-0290. Transcript 02:07:58–02:08:36, 02:11:34–02:12:32. https://redis.io/docs/latest/develop/pubsub/
- **Replacement:** change the code comments to "# WS1’s subscriber connection, when A connects…" and "# WS1’s publisher connection, after pushing to B, C and D itself". In §8.2, write "the server holds a connection or two to Redis, however many servers there are". Alternatively, add one clause: "(a subscribed connection can’t publish, so in practice each server keeps a second one for PUBLISH)".

### F-05 · INTERNAL CONTRADICTION · low · "persisted through Kafka, as always"
- **Where:** Clip 9·1 clip-as-text: "The message is persisted through Kafka, as always", and "The message is persisted as always: ws1 puts it in Kafka".
- **Problem:** nothing on this page persists through Kafka "always". Kafka is the second dial setting, and this build's Slack is save-first. The caption corrects the clip, but the text track contradicts the caption.
- **Sources:** L-0236, L-0338, L-0344. Transcript 01:45:27–01:46:41, 02:28:27–02:30:12.
- **Replacement:** "The message is persisted, here through Kafka (chapter 6’s second road): ws1 puts it in Kafka, a worker pulls it and saves it in the database." Bullet: "The message is persisted (here through Kafka)."

### F-06 · INTERNAL CONTRADICTION · low · a cap of four connections, then seven
- **Where:** c7 §7.1 ("a WebSocket server can hold only so many connections. Say four.") against §7.3, Fig 7·e and recall 3 ("WS1’s seven connections", "four of its seven").
- **Problem:** with a hard cap of four, a mesh server can't hold four users and three links. The figure draws the links past the cap tick. The text then says "Every link in the mesh is one fewer user that server can take", which is the correct reading, but it conflicts with the seven connections drawn. The teacher used the same two numbers (L-0242, L-0276).
- **Sources:** L-0242, L-0260, L-0276, L-0277. Transcript 01:48:19–01:49:18, 02:06:46–02:07:58.
- **Replacement:** in §7.1, "Say it has room for four users. Real servers hold far more." Fig 7·e caption: "… four serve users, three only reach other servers: under a real cap, three users it can’t take. …"

### F-07 · INTERNAL CONTRADICTION · low · "one row per tick", yet 10,000 rows a day
- **Where:** c3 §3 intro: "one row per tick … About 10,000 companies are listed, so that day has about 10,000 rows."
- **Problem:** one row per tick gives far more than one row per company per day. The two statements come from two places in the lecture (L-0052 "one entry per tick", L-0057 "about 10,000 entries for the date"), and on the page they sit in adjacent sentences.
- **Sources:** L-0052, L-0056, L-0057. Transcript 00:16:12–00:20:16.
- **Replacement:** "… `ts`, the timestamp. Keep it small: one row per company per day. You want one number from it, … About 10,000 companies are listed, so that day has about 10,000 rows."

### F-08 · ERROR · low · clip text filters a timestamp with `=`
- **Where:** Clip 3·1 clip-as-text: "The query SELECT avg(price) WHERE ts = '…'".
- **Problem:** an equality test on a timestamp matches one instant, not one day. The page's SQL block uses the correct half-open range. The teacher said `WHERE timestamp = something` (L-0056).
- **Sources:** L-0056. Transcript 00:18:40–00:19:21.
- **Replacement:** "The query SELECT avg(price) … WHERE ts falls on one day runs over about 10,000 rows…".

### F-09 · INTERNAL CONTRADICTION · low · the messages table has no id
- **Where:** Fig 5·d (`s6-slack-schema.tsx`): `messages = ['from', 'channel_id', 'created_at', 'msg']`. The desc and the caption say the same.
- **Problem:**
  - §5.4 lets the checkpoint be "a message id".
  - Chapter 9's Go deeper says "Write each message under its unique id".
  - §10.4 orders by insertion time and cites Slack's `ts` as the message id.

  The schema those passages rely on has no message id. Separately, §5.1 gives users an "optional nickname" that the figure doesn't show (minor).
- **Sources:** L-0154, L-0173, L-0174, L-0177, L-0178, L-0332 (A-MLA-09). Transcript 01:03:04–01:03:44, 01:13:36–01:17:09.
- **Replacement:** messages = `id, from, channel_id, created_at, msg`. Desc: "messages (id, from, channel_id, created_at, msg)". Optionally users = `id, name, nickname?`. If the schema is ever shown as SQL, `from` must be quoted or renamed `sender_id`, because it is a reserved word.

### F-10 · ERROR · low · Fig 9·b waits for all three copies, and the replicas "pull"
- **Where:** Fig 9·b (`s9-whole-system-figs.tsx`): the desc "Nodes 2 and 3 pull a copy from node 1. Only then does node 1 acknowledge…", and the labels "replicas pull a copy" next to "DynamoDB acks at 2 of 3".
- **Problem:**
  - The drawing acknowledges after three of three copies, while its own label and the text say DynamoDB acknowledges at two of three.
  - In DynamoDB the leader sends its log record to its peers and acknowledges once a quorum has persisted it. Nothing pulls.
  - The text is correct ("until the copies it requires have the write"); the figure is stricter than the text it illustrates.
- **Sources:** L-0421, L-0424; fact-check L-0424 (imprecise/medium, A-DC-04). Transcript 03:02:17–03:04:03. https://www.usenix.org/system/files/atc22-elhemali.pdf
- **Replacement:** desc: "The worker writes message m42 to node 1, which sends a copy to nodes 2 and 3. Once the copies the database requires have it (DynamoDB: two of the three), node 1 acknowledges the write to the worker, which waits for that ack. A write lost before that point was never accepted." Change the label "replicas pull a copy" to "copied to replicas".

### F-11 · DISTORTION (course callback) · low · "Lecture 3 kept every value as an opaque blob"
- **Where:** c2 §2 intro: "The store you built in Lecture 3 kept every value as an opaque blob."
- **Problem:** Lecture 3 (lec05 c5 §5) already handles the case of querying inside a value. It suggests MySQL's `JSON` type and an indexed generated column, and treats `BLOB` as one option among several. "Every value as an opaque blob" overstates what that page did. The idea here is that a value is opaque by default and that querying inside it is the next wish (L-0028), and that idea is still right.
- **Sources:** L-0028; `site/src/content/lectures/lec05/c5-expiry.mdx` line 38. Transcript 00:08:33–00:09:28.
- **Replacement:** "The store you built in Lecture 3 treated a value as something it stores and returns without looking inside. The wish that comes up next is natural: put JSON in that value and query inside it."

### Important losses

None found. Every `core` ledger item that is not admin or Q&A was traced to the page, except the following, and none of these is a loss:
- Items dropped deliberately for fact-check reasons, each with a recorded reason: L-0130 (graph DBs not transactional, SN-03), and L-0320/L-0324/L-0325 (the browser six-connection argument, wrong).
- L-0230, "simple systems scale": it survives as the §7.2 rule and the closing of §8.4 ("the fix was the simplest one that worked").
- L-0426/L-0428 (shared database, business first): `supporting` Q&A, cut as listed in NOTES.

---

## The writer's flagged doubts (NOTES.md, "Unsure")

- **Word count (≈ 12.6k):** a reader-check question, not a fact one. No comment.
- **Slack's save-first order:** the doubt is justified, and it is handled correctly once, in §6.2.
  - What the sources say: the teacher himself called it "my hypothesis, I may be wrong" (01:29:19) and later said Slack could also take the Kafka road (L-0236). The Slack article I re-opened confirms the HTTP send and the WebSocket receive but gives no ordering.
  - Verdict: keep save-first as this build's choice, but stop restating it as Slack's own in four places (F-01).
- **Two clips draw the Kafka path:** acceptable as captioned. The teacher's final diagram used Kafka on purpose (L-0236, L-0331), so this is faithful. The text track of the missed-message clip still says "as always" (F-05). Re-animating the clip is not needed for accuracy.
- **Clip three-ways-to-persist shows "Slack (a hypothesis)":** keep it. It is the teacher's own word and the most faithful label on the page. It is the alt text that should move toward it (F-01), not the other way round.
- **Unverifiable stories kept as experience:** all are correctly attributed and none is stated as fact:
  - 29× compression: "one engineer … in his experience".
  - The 200 ms budget and the 50–60 parameters: "one bank’s engineering lead".
  - 3–5 ms per hop: "a few milliseconds in one engineer’s experience".
  - A few hundred lines: "one engineer’s estimate".
  - Three engineers for 3.5 months: "by his account".

  The page also drops the JPMorgan/HDFC names, as the policy requires.

---

## Checked and found correct

**Build 1: databases**
- The slogan, naming the database, and "you can build a non-relational DB that doesn't scale" (L-0002, L-0008–L-0012, L-0021).
- FK insert and delete checks, with RESTRICT/NO ACTION as the default (L-0110/L-0111 fact-check). Checks need one place (L-0113, L-0116). The money backstory matches Lecture 3's c1 wording (L-0114).
- No FKs means a relational database partitions too; Lecture 3's A–M/N–Z store, with the `s9-3` anchor verified; "anything that shards, scales" (L-0022–L-0024).
- The two consistencies; CAP C as linearizability (Kleppmann); ACID without linearizability (L-0014–L-0016, A-DC-02). DynamoDB `ConsistentRead` at twice the read cost (A-DC-03). Standby and replication (L-0018/L-0019).
- Document stores: queries inside, aggregations, partial update. Both MongoDB lines are valid shell (`find` on a dotted path; `updateOne` with `$set`) (L-0029–L-0034). Teams move off SQL to documents, not KV (L-0031).
- KV: one key per operation and read-modify-write (L-0035, L-0041). The `HSET` exception (A-DC-09). Redis Cluster's 16,384 slots and the same-slot rule for multi-key commands (A-DC-07). `IN` and ranges cross shards (L-0042–L-0049).
- Blurry lines: DynamoDB filters run after the read (A-DC-08). MongoDB's BASE→ACID history and its documented cost quote (L-0040, A-DC-10). KV is an access pattern; Redis is in memory and DynamoDB on disk, with Lecture 1's `s3` callback verified. The 400 KB cap and S3 pointer (SN-01). The NAND gate and CockroachDB (L-0129, A-DC-21).
- Row vs column layout, the naive file per column, and why the row store passes over every cell (L-0051–L-0059). The SQL block's half-open day range is valid. Redshift's 5-of-100 ≈ 5% (A-DC-11). `SELECT *` apps, Redshift/BigQuery, Parquet (L-0063–L-0066). Columnar is a layout, not wide-column (A-DC-12). ClickHouse parts and ≥1,000-row batches (A-DC-14). Never the primary copy (L-0073/L-0074 inline). Dictionary + RLE in Parquet (A-DC-13).
- Graphs:
  - The follow-list instinct, the adjacency list, the Hulk, and FlockDB's "multi-hop non-goal" (A-DC-17).
  - LinkedIn degrees; cohorts, with Amazon's item-to-item caveat (A-DC-18).
  - The fraud story, with the 200 ms covering the decision and the call after (L-0103 fact-check).
  - Self-joins per level and `WITH RECURSIVE` (SN-04).
  - Single writer, and Neptune's one primary plus 15 replicas (SN-05).
  - Neo4j, Dgraph and TigerGraph lines (L-0104–L-0108).
- SQL or not: correctness → SQL, tooling not automatic (L-0119/L-0120). Ingestion → Cassandra, commit log (L-0121–L-0124, A-DC-23).
- Hand-off: Instagram vs enterprise (L-0183–L-0189). Slack on MySQL from the start, Vitess from 2017, 99% and 2.3M QPS by 2020 (A-SRW-04).

**Build 2: Slack**
- Scope and the five requirements (L-0145–L-0148). Schema before database (L-0153).
- Membership as a noun (L-0155–L-0158). The nullable pair and orphan rows; `CHECK (num_nonnulls(channel_id, receiver_id) = 1)` is valid PostgreSQL (A-SRW-03). The six drafts match L-0159–L-0168.
- DM = channel; Slack conversations, `is_im`, `conversations.open` (A-SRW-01). Type and why a two-person private channel isn't a DM (L-0172, L-0431–L-0433).
- The checkpoint, `last_read`/`conversations.mark` (A-SRW-02), and membership as the key table (L-0175–L-0180). No replay over the socket (L-0437–L-0439).
- Shard by `channel_id`, Slack's Vitess key (A-SRW-05, L-0313–L-0315).
- Receive must be pushed (L-0200 inline, back-link to Lecture 2 `s5` verified). HTTP/1.1 persistent by default, RFC 9112 §9.3 (A-MLA-07). Grey → black as a hint, not proof (L-0202/L-0203).
- The enterprise credibility argument (L-0196, L-0207/L-0208).
- The WhatsApp-like road as a thought experiment, with the ten-minute refresh pause (L-0211–L-0218, L-0389/L-0390). Zoom default plus continuous meeting chat (L-0221 inline).
- Dumb edge, edge ≠ CDN, Kafka string only (L-0223–L-0235).
- Toy numbers, Socket.IO handshake, client-sent membership kept eventually consistent (L-0242–L-0250). One TCP link, F on WS3 (L-0258–L-0261).
- Mesh of six links for four servers. The real cost is connections; file descriptors, not ports (SN-06). The dinosaur (L-0269–L-0277).
- Real-time Pub/Sub, at-most-once (A-SRW-10). Not Kafka; push vs pull; Kafka retention (L-0279–L-0285, L-0386–L-0388).
- Redis channel per Slack channel, server-side subscribe (L-0286–L-0290), and the new-channel flow (L-0364–L-0367). Sharded Pub/Sub, `SSUBSCRIBE`/`SPUBLISH` in 7.0+, classic `PUBLISH` reaching every node (A-SRW-11).
- The Balancer: not DNS, not a load balancer, one organisation per server, 200 to 20,000 employees (L-0297–L-0301, L-0341/L-0342, L-0381). The routing-service rebuttal (L-0376–L-0378). A server dies, temporary Redis traffic, rebalancing (L-0302–L-0305).
- Go deeper on Slack's real design, re-verified against the article:
  - Channel Servers on a consistent-hash ring, about 16 million channels per host at peak.
  - Gateway Servers.
  - Webapp boot info, then the nearest edge region, then Envoy.
  - "Delivers messages across the world in 500ms".
- The lost push and persistence guaranteed (L-0344, L-0379). Timed fetch of the last 50, second-Kafka buffer (L-0333/L-0334, L-0345). Idempotent consumer, with the Lecture 2 `s3-7` callback verified (A-MLA-09).
- RF3, the storage engine replicates rather than the workers, DynamoDB 2 of 3, PostgreSQL async by default, Kafka retention not the safety net (SN-11, SN-12).
- The edge: Node.js/Socket.IO; expose or LB; Slack on Envoy (A-SRW-15); sticky for life (A-SRW-19). Hardening, no DB credentials, least-privilege Kafka credential (SN-10). DDoS upstream (SN-09). Broken access control, OWASP A01, deny by default (SN-08); membership API only from a private server (L-0368, L-0375).
- One socket per product, with only the true reasons (SN-07, L-0327/L-0329).
- Whole-system halves (L-0335, L-0339). The persistence dial and buffet (L-0340, L-0392).
- Delete: WhatsApp server retention of 30 days undelivered (A-MLA-05); event vs row delete (L-0396–L-0399). Rollout time vs code size (L-0400–L-0402).
- Ordering: challenge the requirement (L-0404/L-0405). Two screen cases (L-0406/L-0407). Duplicates explained (L-0409). DB insertion clock vs client clock, 1 Jan 1970 (L-0412–L-0415). One shard per channel and Slack `ts` (A-MLA-11). Vector clocks as a partial order (A-MLA-13). Design realistic systems (L-0418).
- Callbacks:
  - Lecture 2: WebSocket claps and "which server holds which reader" (lec01 c5:76–83); Kafka.
  - Lecture 1: the green dot's persistent connection (lec04 c1:84).
  - Lecture 5: hand-off, "one process on a laptop that copies bytes between two connections" (lec08 s0-header:29), with the happiest day (L-0350).

**Figures and clips**
- No problems found:
  - TwoConsistencies, AnythingShards, ForeignKeyChecks, PartialUpdate, OneKeyVsIn.
  - RowVsColumn, PrimaryToWarehouse, WhyCompress.
  - AdjacencyList, Cohort, FraudEdge, ThreeHopsGraph/Sql ("ten levels → nine self-joins" matches L-0394).
  - RequirementsCard, MessageDrafts, Sidebar, OpenChannel, TwoConnections, GreyThenBlack.
  - TcpLinks, Mesh, AskBalancer, ServerDies, Exposed, BehindLb.
  - Architecture (captioned as dial setting 2), GuaranteesDial, DeleteOnDevices, DeleteInStore, OutOfOrder.
  - SoFarGuide stages 0–3 and SoFarSlack stages 0–5.
- Problems found:
  - FourConnections: F-03.
  - SevenConnections: F-06.
  - RedisThenNewChannel: F-02 and F-03.
  - SlackSchema: F-09.
  - AckAfterReplication: F-10.
- Clips:
  - l02-column-scan matches L-0053–L-0062 except F-08.
  - l02-three-ways-to-persist matches L-0204–L-0222 (alt text: F-01).
  - l02-mesh-to-pubsub: the link counts 1/3/6/10 and 7 vs 8 connections are correct (alt: F-03).
  - l02-missed-message: F-05.

**Rules from STORY_BRIEF.md / STORY_REVIEW.md**
- Nothing invented: every number and product claim traces to a ledger item or a verified addition.
- Each fact-check correction is stated once, with no "More precisely" boxes. The only one restated against itself is F-01.
- Two-sided where the lecture was:
  - three persistence roads;
  - exposed vs behind a load balancer ("Both are fine");
  - Redis vs Kafka ("neither superior");
  - SQL vs not ("a very broad sense rather than as a law").
- Code checked: the MongoDB shell lines, the SQL `avg` query, the PostgreSQL CHECK and the Redis commands (apart from F-02 and F-04).
- The banned-word grep reproduces NOTES' result: zero hits for instructor, in class, the class, the board, as taught, lecture's view, More precisely, student.
