# Lecture 02 - Review flags the board resolves

Source: `transcript/review_flags.md` (198 flags; the 192 TERM?/UNCLEAR/CHECK flags were reviewed, SPEAKER? flags skipped). The transcript was NOT edited.
"Resolved" = the board shows the exact term (or its board abbreviation, e.g. `WS` for WebSocket) at, or right next to, the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at that moment or not in the same words. Flags not listed (names, diarization seams, garbled phrases, words like "this"/"open") get no help from the board.

## Resolved (20)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F004 | 00:14:22 | [?Document / asr: "You can do a"] | Heading `Document DBs` on screen (key-value page, 00:12:45-00:15:15), directly above the KV list being discussed | b_001515.jpg |
| F008 | 00:20:16 | [?exchange / asr: "action"] | stock_ticks header `Symbol | price | name | exchange | timestamp` on screen 00:20:15-00:20:45 ("reading symbol, name and exchange") | b_002045.jpg |
| F015 | 00:30:09 | [?store / asr: "start"] | `Graph Databases - stores data in nodes and edges` on screen from 00:30:15 | b_003930.jpg |
| F023 | 00:38:20 | [?use case / asr: "discuss"] | `- solid use case: Fraud detection` on screen 00:30:15-00:39:30 | b_003930.jpg |
| F059 | 01:11:43 | [?direct / asr: "tarik"] | `DM = channel` written at 01:12:00, then `DM = channel with 2 people` | b_011200.jpg, b_011215.jpg |
| F063 | 01:22:53 | [?WebSocket / asr: "best topic"] | `Socket ??` written at 01:22:30 and the `WS` server stack drawn 01:22:45-01:23:45 | b_012230.jpg, b_012345.jpg |
| F083 | 01:46:41 | [?WebSocket / asr: "web software"] | "Scaling WebSocket servers" starts with D-03's `WS` stack on screen (01:46:45) | b_014645.jpg |
| F096 | 02:05:05 | [?WebSocket / asr: "website"] | Mesh of `WS1`/`WS2`/`WS3` servers with `TCP` links on screen | b_020530.jpg |
| F098 | 02:05:29 | [?WS / asr: "AWS"] | Same `WS1`/`WS2`/`WS3` mesh; the board's own term is `WS` | b_020530.jpg, b_020539.jpg |
| F100 | 02:06:07 | [?WebSocket / asr: "website"] | Same mesh, `TCP` link WS1-WS2 circled at 02:06:30 | b_020600.jpg, b_020630.jpg |
| F113 | 02:19:38 | [?type / asr: "time"] | Recap channels table: `, type` added live after `name` at 02:19:45 (also `type : grp/user/reg` in D-02) | b_021945.jpg, b_011730.jpg |
| F114 | 02:19:38 | [?DB / asr: "DBA"] | `pick any DB that you can shard .... even SQL works !` (02:20:15) and `Partitioned DB` (02:20:27) | b_022015.jpg, b_022027.jpg |
| F116 | 02:22:10 | [?WS / asr: "w's"] | `WS Edge Servers` with three `WS` lines, on screen 02:22:15-02:24:45 | b_022445.jpg |
| F121 | 02:27:47 | [unclear: "other balance"] | `Balancer` (purple) written above a new box in the Overall architecture at 02:28:00-02:28:30, while he names the component | b_022830.jpg |
| F130 | 02:32:14 | [?a load balancer / asr: "the level inside"] | `load Balancer` in D-11, on screen through the Q&A | b_023530.jpg |
| F146 | 02:43:33 | [?balancer / asr: "balance"] | `Balancer` box in D-11 on screen | b_024315.jpg, b_024430.jpg |
| F147 | 02:43:33 | [?the balancer / asr: "to balance or"] | Same `Balancer` box | b_024315.jpg |
| F148 | 02:43:33 | [?Redis / asr: "studies"] | `Redis PubSub [clustered]` in D-11 on screen | b_024315.jpg |
| F151 | 02:46:03 | [?Redis / asr: "read"] | `Redis PubSub [clustered]` on screen | b_024830.jpg |
| F152 | 02:46:48 | [?DBs / asr: "DDs"] | D-11 path `Kafka` → `Messaging Service Workers` → `Messages DB (partitioned)` on screen ("goes through Kafka and then to DBs") | b_024830.jpg |

## Supported (12)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F013 | 00:27:26 | [?columnar / asr: "collaborative"] | `Column Oriented database` on screen (board says "column oriented", not "columnar") | b_002730.jpg |
| F031 | 00:44:46 | [?use case / asr: "discuss"] | `solid use case: Fraud detection` earlier (graph DBs); not on screen at 00:44 | b_003930.jpg |
| F040 | 00:52:30 | [?DynamoDB / asr: "Daryl Abu Devi"] | Key-value examples `Redis, DynamoDB, Aerospike` (00:08:30); the student names "DynamoDB or Redis" | b_000830.jpg |
| F044 | 01:04:12 | [?user / asr: "our"] | `user.channel` written as the first name of the join table at ~01:05:00 (renamed `Membership`) | b_010500.jpg |
| F061 | 01:19:03 | [?DB / asr: "degree"] | `MySQL / Cassanda / Mongo` over the three DB cylinders (01:19:30-01:22:15); later `even SQL works !` | b_012200.jpg, b_022015.jpg |
| F070 | 01:28:08 | [?WebSocket / asr: "web software"] | `Socket ??` and the `WS` stack on screen | b_012915.jpg |
| F081 | 01:45:27 | [?Slack / asr: "stack"] | Heading `Designing : Slack's Realtime Communication (Text)`; at 01:45 the board shows D-03 (no Slack text) | b_010045.jpg |
| F110 | 02:18:02 | [?communication / asr: "combination"] | Same heading `Slack's Realtime Communication` (00:54-01:00) | b_005830.jpg, b_010045.jpg |
| F166 | 02:57:04 | [?WebSocket / asr: "web software"] | D-11 `WS` lines to `Edge Servers` on screen | b_025900.jpg |
| F192 | 03:11:59 | [?WebSocket / asr: "web software"] | D-11 `WS` lines on screen | b_031215.jpg |
| F193 | 03:12:04 | [?WebSocket / asr: "web software"] | Same | b_031215.jpg |
| F196 | 03:13:22 | [?WebSockets / asr: "web servers"] | Same; recap `WebSockets` heading (02:21) | b_031315.jpg, b_022100.jpg |

## Related notes (not flags)

- F005 [unclear: "select and select"] (00:16:12): the board's query is `SELECT avg(price) WHERE ts = '___';` and `all you care is two columns 'price' and 'ts'` (shown from 00:17:15). The garble may be "select price and ts" style wording; the board does not show it at 00:16, so this is not a resolution.
- F050 [unclear: "books"] (01:08:10): the board at 01:08:45 shows `to : → ch/usr` and at 01:09:30 `type : ch/u` - the teacher is saying `to` can be a channel id or a user id.
- F104 [unclear: "redis 8"] (02:12:32): the board at 02:13:00 shows `WS1 → SUB(C1)` - the sentence is about WS1 firing a SUBSCRIBE for C1 on Redis.
- Board spellings that differ from the audio: `Cassanda` (= Cassandra), `Key Value stere` / `we stere it` (= store, the "o" is written like "e"), `Slach channel` (= Slack), `A very basis flow` (= basic), `Defintly` (= Definitely), `mutd channels` (= muted), `RedShift`.
- Data-model naming differs between the live sketch and the recap notes: live `channels(id, org, name, type)` and `Messages(from, channel_id, created_at, msg)`; recap `channels(id, workspace_id, name, type)` and `messages(id, channel_id, message, user_id, ts)`. Same design, different field names.
- The live join table was first written `user.channel` and renamed `Membership` - matches the audio at 01:14:19 ("Why I named it membership because it's a noun").
- The board states a flat `6 concurrent TCP connection limit` for browsers; the audio (02:21:08) says six for Chrome and eight for Firefox, per domain. Worth a fact-check note.
- D-04's colours match the audio (02:20:36): white = Slack (sync persist via API), green = WhatsApp (async via Kafka), blue = Zoom (no persistence).
- Several recap pages were shown only briefly or zoomed out (02:25:15-02:30:18): `* can be optimized` on the Pub/Sub idea, `[ Socket IO library manages this ]`, `local Connection Pool`, `Hence when the message is sent from A to B the edge server will 1. Persist message In Kafka 2. Find B in the local pool 3. Send message to B`, and `Insight : Messages once sent will always be persisted ... Unique Key failed`. These are board-only or barely spoken; the ledger editor should check whether the audio covers them.
- The recap line `Just for the sake of correction !` reads like "comection"; the audio at 02:25:24 ("correction job") supports "correction", not "connection".
