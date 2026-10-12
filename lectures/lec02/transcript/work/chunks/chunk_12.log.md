| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:17:41 | TERM | through this redisk | through this Redis | non-word; same sentence ends "minimize the IO that happens over Redis" (02:17:53-02:17:59); messages moved between WebSocket servers via Redis | high |
| 02 | 02:18:43 | TERM | over radius | over Redis | repeats 02:17:53 "minimize the IO that happens over Redis"; Redis Pub/Sub discussed just before (02:18:18-02:18:22) | high |
| 03 | 02:18:56 | TERM | web pockets are scale | WebSockets are scale | non-word in context; same passage "how web sockets are scaled" (02:18:02), "this is how web socket server scale" (02:19:15) | high |
| 04 | 02:19:24 | TERM | slacks real-time | Slack's real-time | term_decisions "Slack's" rule (slags/slacks -> Slack's); topic = Slack design | high |
| 05 | 02:20:24 | TERM | database note | database node | "one database note definitely would not be able to handle the load" - sharded database context; "note" nonsensical | high |
| 06 | 02:21:58 | TERM | firebox | Firefox | browser connection limits: "six is for chrome eight is for firebox" | high |
| 07 | 02:27:21 | TERM | real type of sub | real-time Pub/Sub | "real-time pubsub" for inter-server messaging said at 02:18:12-02:18:18; list item "for inter-edge server communication" = Redis Pub/Sub role | medium |
| 08 | 02:18:02 | TERM | how web sockets are scaled | how WebSockets are scaled | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token, as chunk_08) | high |
| 09 | 02:18:09 | TERM | scale web sockets | scale WebSockets | same as 08 | high |
| 10 | 02:18:12 | TERM | introducing a real-time pubsub | introducing a real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub (glossary canonical) | high |
| 11 | 02:18:18 | TERM | real-time pubsub like Redis | real-time Pub/Sub like Redis | same as 10 | high |
| 12 | 02:18:22 | TERM | Redis PubSub, highly | Redis Pub/Sub, highly | same as 10 | high |
| 13 | 02:19:15 | TERM | how web socket server scale | how WebSocket server scale | same as 08 | high |
| 14 | 02:21:03 | TERM | it's web sockets | it's WebSockets | same as 08 | high |
| 15 | 02:22:10 | TERM | typically have just one web socket connection | typically have just one WebSocket connection | same as 08 | high |
| 16 | 02:22:28 | TERM | establishing web socket to | establishing WebSocket to | same as 08 | high |
| 17 | 02:22:35 | TERM | create one web socket for | create one WebSocket for | same as 08 | high |
| 18 | 02:22:50 | TERM | because web socket is a | because WebSocket is a | same as 08 | high |
| 19 | 02:22:54 | TERM | create one web socket connection, one is gone | create one WebSocket connection, one is gone | same as 08 | high |
| 20 | 02:23:14 | TERM | no web socket connections | no WebSocket connections | same as 08 | high |
| 21 | 02:23:36 | TERM | one web socket connection open | one WebSocket connection open | same as 08 | high |
| 22 | 02:23:48 | TERM | two web socket connections | two WebSocket connections | same as 08 | high |
| 23 | 02:23:57 | TERM | additional web socket connections | additional WebSocket connections | same as 08 | high |
| 24 | 02:24:04 | TERM | will have just one web socket connection | will have just one WebSocket connection | same as 08 | high |
| 25 | 02:24:16 | TERM | through that same web socket connection | through that same WebSocket connection | same as 08 | high |
| 26 | 02:24:21 | TERM | same web socket connection. | same WebSocket connection. | same as 08 | high |
| 27 | 02:24:45 | TERM | just one web socket connection | just one WebSocket connection | same as 08 | high |
| 28 | 02:25:18 | TERM | this basically web socket | this basically WebSocket | same as 08 | high |
| 29 | 02:25:36 | TERM | here are the web socket connections | here are the WebSocket connections | same as 08 | high |
| 30 | 02:28:06 | TERM | get which web socket server | get which WebSocket server | same as 08; term split across segments #2371/#2372 | high |
