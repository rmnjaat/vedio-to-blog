# Lecture 4 (lec02) story rewrite: final fact and faithfulness re-check

Scope: the Revision 2 page: `site/src/content/lectures/lec02.mdx` (chapter list), `lec02/s0-header.mdx` and `c1`–`c10`; the text (titles, labels, desc) of every figure they import from `site/src/figures/lec02/` (including `so-far.tsx` stage 6, the GuaranteesDial, RedisThenNewChannel, AckAfterReplication, Exposed/BehindLb); the alt text, captions, clip-as-text and on-screen text of the four clips (`git diff` of `site/src/animations/clips/l02-*` plus the regenerated posters); and `story/page_text.md`, which matches the sources. Screenshots in `story/shots/fig/` and `shots/sweep/` were used for the drawings.
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`, `story/NOTES.md` (Revision 2). Callbacks checked against the current `lec05` (Lecture 3), `lec08` (Lecture 5), `lec01` (Lecture 2) and `lec04` (Lecture 1) pages. No page file was edited.

**Result:** all 11 earlier items are fixed. F-08 and F-09 each keep a small, documented residual, and neither is an error. The fresh pass found **1 medium** and **11 low** new issues, plus 2 optional notes.
- The medium one (N1) was introduced by Revision 2. The GuaranteesDial now points at ① with a solid path, but its persistence path still runs from the *edge server* to the database. So the rule box shows the edge server saving synchronously, which is the exact design chapter 6 and chapter 9 reject.
- Most of the low items are knock-on wording from the F-02/F-04 fixes ("one link" against "a connection or two"), from the new save-first Fig 10·b, and from two experience claims that lost their attribution in the trims (29×, a few hundred lines).

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| F-01 save-first stated as Slack's (medium) | **Fixed** | §6.2: “So the promise this build makes, and the likeliest reading of Slack’s, is: **a message is shown to others only after it is saved.**” and “Slack doesn’t publish whether the save finishes first; this design makes it so, because the promise demands it.” §10.2 no longer names Slack’s order (“That is the phone-first road, and you can build Slack that way too”). Fig 10·b: “The whole design on this build’s road”. Clip 9·1 caption: “On this build’s road the API server saves first”. Recall 2: “The guarantee this build gives: a message is shown only after it is saved”. Clip 6·1 alt: “Path 1, Slack as this build reads it, saving first”. On screen it still says “Slack (a hypothesis)”, as recommended. (Optional residual: O1.) |
| F-02 Redis echoes back to WS1 (medium) | **Fixed** (wording nit: N5) | §8.2: “WS1 is subscribed to `c1` too, so Redis hands the message back to it. Tag every published message with the id of the server that sent it (or keep the message id), and have each server skip its own.” Step 3: “Redis pushes it to every server subscribed to `c1`: WS2, and WS1 itself, which drops its own copy because it already delivered it.” Drawing label: “own echo: skipped”. Desc: “pushed to WS2 (and back to WS1, which skips its own message)”. |
| F-03 ch 7–8 send drawn A → WS1 (medium) | **Fixed** (figure nit: N6) | Fig 7·b step 3: “A’s `standup in 5` for C1, saved by the API server, reaches WS1.” Fig 8·b step 1: “A posts in Slack channel C1. The API server saves it and hands it to WS1.” The drawn arrow runs api → ws1 and is labelled “saved: standup in 5”. Clip 8·1 alt: “When A’s message arrives (saved by the API server), WS1 delivers it to B, C and D”. |
| F-04 SUBSCRIBE + PUBLISH on one connection (low) | **Fixed** (knock-on: N4) | Code: “# WS1's subscriber connection, when A connects…” / “# WS1's publisher connection, after pushing to B, C and D itself”. §8.2: “the server holds a connection or two to Redis, however many servers there are (a subscribed connection can’t publish, so in practice each server keeps a second one for `PUBLISH`).” |
| F-05 “persisted through Kafka, as always” (low) | **Fixed** | On-screen cue, timeline and storyboard: “The message is persisted (here through Kafka).” Alt: “The message is persisted, here through Kafka (chapter 6’s phone-first road)”. Poster regenerated. |
| F-06 cap of four, then seven (low) | **Fixed** | §7.1: “Say it has room for four users. Real servers hold far more.” Stepper step 1 says the same. Fig 7·e caption: “four serve users, three only reach other servers; under a real cap, that is three users it can’t take.” |
| F-07 one row per tick vs 10,000 rows (low) | **Fixed** | §3: “Keep it small: one row per company per day. … About 10,000 companies are listed, so that day has about 10,000 rows.” |
| F-08 clip filters ts with `=` (low) | **Fixed in text; residual on screen** | Alt: “The query SELECT avg(price), with ts on one day, runs over about 10,000 rows”. The on-screen `ts = '…'` placeholder is unchanged, as NOTES records. The page’s SQL block uses the correct half-open range, so this is acceptable. |
| F-09 messages table has no id (low) | **Fixed; minor residual** | Fig 5·d desc: “messages (id, from, channel_id, created_at, msg)”. Caption: “messages, each with its own id”. Residual: §5.1 still gives users “an optional nickname” and the figure doesn’t show one (“users (id, name)”). NOTES explains why it was left out of the figure. This is harmless. |
| F-10 Fig 9·b waits for 3 of 3; replicas pull (low) | **Fixed** | Labels: “copied to the replicas”, “says ‘done’ once enough copies have it”, “DynamoDB acks at 2 of 3”. Desc: “The writer sends message m42 to node 1, which sends a copy to nodes 2 and 3. Once the copies the database requires have it (DynamoDB: two of the three), node 1 acknowledges…”. The drawing (screenshot) has the arrows writer → node 1 → nodes 2/3 and the ack ③. |
| F-11 “Lecture 3 kept every value as an opaque blob” (low) | **Fixed** | §2: “The store you built in Lecture 3 treated a value as something it stores and returns without looking inside.” This matches `lec05/c5-expiry.mdx` §5.1 (“the value is a black box: a `BLOB`”, with the JSON type as a Go deeper). |

---

## 2. Fresh pass: new issues

### N1 (medium, internal contradiction, figure vs text): the GuaranteesDial now shows the edge server saving synchronously
- **Where:** the §10.2 rule box, `GuaranteesDial` in `s9-whole-system-figs.tsx`. The persistence path is drawn from the edge box (`[X(112), 76]`) down to the dial and on to `db`, and the needle is set to ①. The desc says: “The persistence path between the edge server and the database is a dial with three positions… set here to one, the setting this build uses for Slack.”
- **Problem:** with the needle on ① (sync), the miniature now reads “the edge server writes to the database synchronously”. The page rejects exactly that:
  - §6.4: “keep the edge server dumb: it relays messages and holds no database connection”.
  - §9.3: “The edge server never talks to the database and doesn’t even know what it is.”
  - Fig 10·b, directly above, shows the save on A → api → db.
  - Before Revision 2 the needle pointed at ②, where an edge → (Kafka) → db path is right (L-0338, board D-09). Moving the needle without moving the path created the contradiction.
- **Sources:** L-0209, L-0223, L-0225, L-0231, L-0338, L-0340. Transcript 01:31:22–01:32:58, 01:38:00–01:44:35, 02:26:10–02:27:47.
- **Replacement:**
  - **Drawing:** root the persistence path at the sender, not the edge box. For example, start it at A (or at a small `api` box under A) and run it to the dial and on to `db`. Keep the edge → Pub/Sub line as it is.
  - **Desc:** “The overall diagram in miniature: a user, an edge server, the real-time Pub/Sub and the database. How a message reaches the database is a dial with three positions: one, synchronous, through the API server before the edge server pushes; two, asynchronous, from the edge server through Kafka; three, none. It is set here to one, the setting this build uses for Slack. Swap the path and keep the rest.”
  - **Text-only fallback, if the drawing can’t change:** change the bottom label to “① sync via api · ② async via kafka · ③ none”, and the desc as above.

### N2 (low, distortion): two experience figures lost their attribution in the trims
- **Where:**
  - §3.4: “How much a column shrinks depends on the data, but gains of around 29 times are normal in practice for people who run these warehouses.”
  - §10.3: “on this design, deletion is roughly a few hundred lines of backend.”
- **Problem:** both are one person’s experience or estimate:
  - L-0076, “29x is a normal gain that I’m seeing”. The fact-check rates it unverifiable and says “treat 29x as an anecdote, not a norm”.
  - L-0402, “hardly 200 300 lines … if they were with this architecture”, rated unverifiable.

  The first-round text attributed both. The 29× sentence now states the anecdote as a norm for a whole profession. The brief says unverifiable stories stay as experience. NOTES (reader fix 10) limits “one engineer” to one use, so the replacements avoid that phrase.
- **Sources:** L-0076, L-0402 (fact-check: unverifiable). Transcript 00:27:20–00:28:12, 02:52:50–02:54:08.
- **Replacement:**
  - §3.4: “How much a column shrinks depends heavily on the data; someone who runs these warehouses reports gains of around 29 times as normal for his data.”
  - §10.3: “No new boxes, only a different guarantee: on this design, deletion is a rough estimate of a few hundred lines of backend.”

### N3 (low, distortion): the million-connections objection is answered by a number that doesn’t beat it
- **Where:** §7.3: “You might object that a real server can hold something like a million connections, so a few links are nothing. Count the fleet instead. Every new server needs a link to every existing one: 1 link for two servers, 6 for four, 4,950 for a hundred, 99 on each server.”
- **Problem:** the arithmetic is right: n(n−1)/2 gives 1, 6 and 4,950, with 99 per server. It also matches Clip 8·1 (1/3/6/10, “4 of 8”), recall 3 and the chapter 8 title. But the reply doesn’t answer the objection the way the lecture did:
  - 99 links out of about a million is 0.01%.
  - The fleet total of 4,950 is spread over a hundred machines.
  - In L-0273 the teacher himself makes this counter (a million per server, never more than 10,000 servers, “10,000 connections with ease”). He then concedes it and moves the point: the issue is not running out but *wasting* connections on non-user work (L-0277).

  “Count the fleet instead” suggests the totals refute the objection, and they don’t. The last sentence of the paragraph already carries the right point.
- **Sources:** L-0273, L-0276, L-0277. Transcript 02:05:29–02:07:58.
- **Replacement:** “You might object that a real server can hold something like a million connections, so a few links are nothing, and on capacity alone you would be right. The point is what they are for. Every new server needs a link to every existing one: 1 link for two servers, 6 for four, 4,950 for a hundred, 99 on each server. All of them are persistent connections held open purely so servers can talk among themselves, none of them serves a user, which is the server’s whole job, and the count grows with every server you add.”

### N4 (low, internal contradiction): “one link” to Redis vs “a connection or two”
- **Where:**
  - §8.1: “WS1 is back to its four users plus one link, however many servers there are.”
  - Fig 9·a desc: “both servers hold one connection to a Redis Pub/Sub”.
  - The same “one link per server” wording appears in Clip 8·1’s caption, §8.4, recall 3 and §10.5.
- **Problem:** after F-04, §8.2 says a server holds “a connection or two to Redis … in practice … a second one for `PUBLISH`”. Elsewhere the page still says exactly one. As a conceptual unit “one link” is fine. The flat “one connection” in the Fig 9·a desc, and the §8.1 sentence that comes before the correction, are what conflict.
- **Sources:** L-0278, L-0280; F-04. https://redis.io/docs/latest/develop/pubsub/
- **Replacement:**
  - §8.1: “WS1 is back to its four users plus one link to the middle (in practice a connection or two, 8.2), however many servers there are.”
  - Fig 9·a desc: “…both servers are linked to a Redis Pub/Sub instead…”.
  - Leave the other uses of “one link per server” as they are.

### N5 (low, wording): the echo-skip’s “(or keep the message id)” is unclear
- **Where:** §8.2: “Tag every published message with the id of the server that sent it (or keep the message id), and have each server skip its own.”
- **Problem:** the fix is correct. Redis delivers a `PUBLISH` to every subscriber, the publisher’s own subscriber connection included. But “keep the message id” doesn’t say who keeps it or how it is used, and a reader can’t act on it.
- **Sources:** L-0289, L-0292; F-02.
- **Replacement:** “Tag every published message with the id of the server that sent it and have each server skip messages carrying its own id, or have each server remember the ids of the messages it has just delivered and skip those.”

### N6 (low, figure vs step): Fig 8·b step 1 says “A posts” but A’s lane is empty
- **Where:** Fig 8·b desk and phone. Step 1: “A posts in Slack channel C1. The API server saves it and hands it to WS1.” The drawing (screenshot) starts the message at the `api` lane. Nothing leaves lane A.
- **Problem:** the reader sees the message appear at the API server with no send. Also, nothing on the page says how the API server picks WS1. The lecture only says “the WebSocket server” (L-0209), so this is a gap, not an error. It only matters because the stepper now makes the hand-off explicit.
- **Sources:** L-0209, L-0283, L-0292.
- **Replacement:**
  - Drawing: add a short blue arrow A → api above the current one, labelled “POST (http)”, the same style as step 5’s “create channel c3” arrow.
  - Step 1: “A posts in Slack channel C1 over HTTP. The API server saves it and hands it to WS1.”
  - Don’t add a mechanism for choosing WS1; the sources give none.

### N7 (low, internal contradiction): “the edge servers … stay exactly as they are”
- **Where:** §10.2: “Turn it to the asynchronous setting and the edge server does three things… The edge servers, the real-time Pub/Sub, the Balancer and the database stay exactly as they are.”
- **Problem:** on the asynchronous setting the edge server changes in two ways:
  - It now receives the send over the WebSocket and writes to Kafka (the same paragraph says so).
  - It holds a Kafka credential: §9.3 says “On this build’s road it needs no credential at all; if it feeds Kafka, as on the phone-first road, the most it holds is a Kafka credential”.

  L-0340 (“everything else stays the same”) is about the architecture’s boxes, and that remains true.
- **Sources:** L-0338, L-0340, L-0358, L-0359.
- **Replacement:** “The real-time Pub/Sub, the Balancer and the database stay exactly as they are; the edge servers only gain a write to Kafka.”

### N8 (low, figure vs text): the Exposed panel says the edge “holds only a Kafka credential”
- **Where:** Fig 9·c left panel. `EXP_DESC`: “…and holds only a Kafka credential, ideally a write-only one; database credentials never sit on it.” Label: “kafka conn string” drawn as held.
- **Problem:** §9.3 (Revision 2): “On this build’s road it needs no credential at all; if it feeds Kafka, as on the phone-first road, the most it holds is a Kafka credential”. The caption says “holding at most a Kafka credential”, which is correct, but the desc says it holds one.
- **Sources:** L-0357, L-0358, L-0359, L-0383.
- **Replacement (`EXP_DESC`):** “An exposed edge server faces the internet directly. It is hardened, ports hidden and SSH blocked, and holds at most a Kafka credential, only if it feeds Kafka and ideally a write-only one; database credentials never sit on it.” The label can stay, since the caption carries “at most”.

### N9 (low, internal contradiction): §9.4 lets the edge server ask “the database behind it”
- **Where:** §9.4: “When it is, the edge server asks a backend API, or the database behind it, which channels its users really belong to…”
- **Problem:** “or the database behind it” reads as the edge server querying the database. §9.3 says “The edge server never talks to the database”. The source has the edge server calling the backend’s API (L-0368), and the Fig 9·c desc says “a membership API, backed by the database”.
- **Sources:** L-0368, L-0375. Transcript 02:38:12–02:38:52.
- **Replacement:** “When it is, the edge server asks a backend membership API which channels its users really belong to…”

### N10 (low, internal contradiction): §2.3 says Redis and DynamoDB gave up “any question about the inside of a value”
- **Where:** §2.3: “So that is what Redis and DynamoDB gave up, the question Lecture 3 ended on: any question about the inside of a value.”
- **Problem:** two passages nearby say otherwise:
  - §2.2: “a Redis hash lets `HSET` set one field without rewriting the others”.
  - §2.4: “DynamoDB … also supports a document model: you can filter on nested attributes”.

  Lecture 3’s question (lec05 c9 §9.6) is answered correctly in spirit, since key-wise access is the core trade. But “any question” is contradicted by the page itself.
- **Sources:** L-0026, L-0032, L-0036, L-0041; A-DC-08, A-DC-09.
- **Replacement:** “So that is the core of what Redis and DynamoDB gave up, the question Lecture 3 ended on: questions about the inside of a value, which each bends a little (2.4). What they got back is that every operation lands on one shard.”

### N11 (low, two-sidedness): the Build 1 premise drops the teacher’s own “messaging → NoSQL” half
- **Where:**
  - Overview, dek and §1: “Use NoSQL. Messaging systems always do. It scales.”
  - §4.4: “When you have gigantic amounts of data to ingest at a fast pace, posts, logs, metrics, a non-relational store built for it fits better.”
- **Problem:** the new framing scene is acceptable as a device, and “always” makes it a generic statement to challenge, which ties neatly to the L-0025 rule. But the premise is the teacher’s own endorsed claim, stated as “typically” (L-0124, fact-check: accurate). His ingestion list includes messages, “a huge influx of messages on Instagram” (L-0121), and he names WhatsApp, Instagram and Tinder chat as Cassandra cases (L-0123 detail). §4.4 now lists “posts, logs, metrics” and leaves messages out. So the colleague looks simply wrong until §4.5’s Instagram sentence. One phrase in §4.4 keeps the lecture two-sided where the review turns: messaging at that rate *is* the NoSQL case, and Slack is not at that rate.
- **Sources:** L-0121, L-0123, L-0124, L-0183. Transcript 00:44:46–00:46:14, 01:17:47–01:19:03.
- **Replacement (§4.4):** “When you have gigantic amounts of data to ingest at a fast pace, a flood of chat messages, posts, logs, metrics, a non-relational store built for it fits better.”

### N12 (low, cosmetic): Fig 10·b’s SVG title still says “so far”
- **Where:** `so-far.tsx`, `SlackDesk`/`SlackPhone`: `title="The Slack design so far"` for every stage, stage 6 included. `page_text` shows “[figure title] The Slack design so far” above the stage-6 desc “The whole Slack design…” and the label “the whole Slack design”.
- **Problem:** the accessible title contradicts the figure’s own label and caption.
- **Replacement:** `title={stage === 6 ? 'The whole Slack design' : 'The Slack design so far'}` in both layouts.

### Optional notes
- **O1 (F-01 residual):** the chapter list blurb for chapter 6 says “What Slack promises about a sent message, and two other promises.” The body hedges this once, correctly. If you want it fully consistent: “What a Slack-like app should promise about a sent message, and two other promises.”
- **O2:** the Clip 6·1 clip-as-text line “If B reloads from the DB in the lag (Slack does)” is the first-round text, and the first review accepted it (L-0389, L-0390). It is listed here only because it is the one remaining place that states something about real Slack’s client behaviour without a hedge.

---

## 3. Revision 2 focus areas: checked and found correct

- **Build 1 situation and the L-0124 premise:** the scene (a design review for a Slack-like app’s message store) is a framing device, not a fact claim. The slogan is a generic statement the page then takes apart, with the L-0025 rule.
  - §1.4 closes on “no database, no workload and no trade-off”.
  - §4.4 opens “That completes the guide. Now use it”.
  - §4.5 returns to the review and answers it two-sidedly: Instagram Messenger → a store such as Cassandra; Slack → any shardable database, which is Slack on MySQL/Vitess (A-SRW-04).
  - §1.1 “Cassandra … a flood of writes; DynamoDB for lookups by key” is accurate (L-0123).
  - §1.2’s FK example now uses the chat app’s own tables (`messages.channel_id` → `channels.id`), and the RESTRICT/NO ACTION default still holds.
  - The only issue is N11.
- **Mesh-cost arithmetic (L-0273):** 1, 6 and 4,950 links, with 99 per server, are correct. They are consistent with Clip 8·1 (3, 6 and 10 links; 7 and 8 connections; “4 of 8”), Fig 7·e (“100 servers → 99 links each”), recall 3 and the chapter 8 title. Framing: N3.
- **Fig 10·b as the save-first road (L-0338, L-0236):**
  - SoFarSlack stage 6 draws A → api (send, http) → save → messages, then “then push” → ws1, with ws1/ws2 joined by Redis and the Balancer. The desc matches.
  - Both the drawing and the caption say “on this build’s road”, which matches L-0338’s detail (“For Slack it goes the way discussed earlier (synchronous persistence)”).
  - The Kafka road is described once, in §10.2, as the asynchronous setting. Its three edge steps (Kafka, local pool, send) match the board recap at 02:30:12. “You can build Slack that way too, paying with the refresh gap” matches L-0236 and L-0390.
  - The caption’s “goes over HTTP to the same API servers” matches L-0339.
  - The only problem is the dial (N1).
- **Redis echo-skip:** correct per the Redis Pub/Sub docs (a message goes to every subscriber of the channel). Both drawings carry “own echo: skipped”. Wording: N5.
- **API server → WS1 path:** consistent everywhere: Fig 7·a and later SoFar stages, Fig 7·b step 3, Fig 8·b step 1 and its arrow, Clip 8·1 alt, Clip 6·1 path 1, the §6.4 hand-off and the Fig 10·b desc. WS1 still delivers locally first, then publishes (L-0283, L-0292). Drawing gap: N6.
- **Posters and clip text that changed:**
  - l02-three-ways-to-persist poster shows “② Phone-first (hypothetical)” and keeps “① Slack (a hypothesis)”.
  - l02-missed-message poster and cue: “persisted (here through Kafka)”, captioned as the phone-first road.
  - Alt-only changes to l02-column-scan (“with ts on one day”) and l02-mesh-to-pubsub (“saved by the API server”) are accurate.
  - “WhatsApp-like” survives only in an MDX source comment, which is not rendered.
- **Other Revision 2 changes checked:**
  - Fraud timeline: hold-and-route decision within 200 ms, call after (L-0101, L-0103 fact-check), attributed to “one bank’s engineering lead”.
  - 50,000 vs 20,000 values.
  - “Three trades down”.
  - The SoFarGuide rows (“spreading for free: shard it yourself”, “column layout”).
  - `WITH RECURSIVE` first in §4.3.
  - Drafts stepper (six drafts in five steps; draft 6 “no destination”; types `reg`/`grp`/`user` match Fig 5·d).
  - Why Redis is still needed: E’s full server and the failover spread (L-0244, L-0303).
  - Timed fetch: 50 for a blink, a longer gap from the checkpoint (L-0333, L-0345, L-0175).
  - “Both are fine, until private channels need a server-side check” (L-0368, L-0375).
  - “buffer undelivered pushes in Kafka” (L-0334).
  - Cassandra commit log and “not with lost data” (L-0122 fact-check, A-DC-23).
  - The phone-first road in §6.3, the pause and §9.2 (“or, on the phone-first road, the worker”).
  - “Surprisingly simple, and satisfying” (L-0350, now without the unverifiable “happiest day”).
  - “One team of three … three and a half months” (L-0400, soft attribution kept).
- **Callbacks, against the pages as they are now:**
  - **Lecture 3 (`lec05`):**
    - Overview: “ended on a key-value store you built on one MySQL table and then split by key range … It also ended on a question: Redis keeps everything in memory, DynamoDB isn’t relational at all, so what did stores like these give up…”. This matches c9 §9.3 (A–M / N–Z masters) and §9.6 (“So what exactly did Redis and DynamoDB give up to be fast and big, and when is that trade worth it?”).
    - §1.2 “relational databases grew up around money” matches c1 (“Relational databases grew up around money”).
    - §1.3 `sec="s9-3"` exists (“Then the master can’t take the writes”, range shards).
    - §2 `sec="s5"` exists, and the black-box wording matches §5.1.
    - Lecture 3’s forward link (“Lecture 4 … starts there, with the non-relational families … Then it asks the question of Slack”) still describes this page.
  - **Lecture 5 (`lec08`):**
    - §10.6 “starting from one process on a laptop that copies bytes between two connections” matches the lec08 overview word for word.
    - The closing question (what the program does with each byte; what happens when its machine dies) matches lec08’s brief (“what a load balancer does to every byte of a request”, “what happens when *this one* dies?”).
    - lec08’s own references to Lecture 4 are consistent with this page:
      - s0-header: “pushed Slack’s messages between servers through a real-time Pub/Sub”.
      - c4-stale-copies:62: messages pushed to the servers that needed them, with the timed fetch kept as the fallback for a lost push.
    - The NOTES concern about lec08 c4 “polling … membership changes” no longer applies to the current lec08 text.
  - **Lecture 2 (`lec01`):** `s5` and `s3-7` anchors exist. “which server holds which reader” matches c5:83.
  - **Lecture 1 (`lec04`):** `s3` exists, and the green-dot persistent connection matches c1:84.
- **Banned words:** a grep of `page_text.md` for instructor, in class, the class, the board, as taught, lecture's view, More precisely, student and WhatsApp-like finds 0 hits.
