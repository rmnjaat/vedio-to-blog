| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:05:37 | SPEAKER | Student 1 | Teacher | STUDENT_1 "Correct." right after Student 1's own "..., right?" = teacher confirming; term_decisions turn-level rule cites this exact line | medium |
| 02 | 02:05:40 | SPEAKER | Student 11 | Student? | STUDENT_11 "Why?" between Student 1 lines; could be teacher prodding; term_decisions says `Student?` | medium |
| 03 | 02:06:12 | SPLIT | Student 3 | Teacher | "no no no they're just once" inside STUDENT_3 segment is the teacher's reply; continues "once once the tcp connection is established" in TEACHER segment 02:06:18 | high |
| 04 | 02:08:41 | TERM | real time pops up | real-time Pub/Sub | term_decisions RULE (02:08:41 named): "pops up" right after "real time" in Pub/Sub discussion; "real-time pubsub" said at 02:08:36 | high |
| 05 | 02:09:49 | TERM | real time pubsup | real-time Pub/Sub | non-word; term_decisions lists "pubsup" as Pub/Sub form; same explanation | high |
| 06 | 02:10:01 | TERM | real time Pubser | real-time Pub/Sub | non-word; same explanation of real-time Pub/Sub; Redis named as example right after | high |
| 07 | 02:12:02 | WORD | not be the server | not B, the server | "not be the server" is nonsense; user B was just named ("b connects"); next clause "the server here is subscribing ... not the user" | medium |
| 08 | 02:12:21 | TERM | redis popsob | Redis Pub/Sub | non-word; "Redis PubSub backbone" said at 02:11:22 | high |
| 09 | 02:06:32 | TERM | the web socket connection the web Socket servers | the WebSocket connection. The WebSocket servers | term_decisions: web socket -> WebSocket | high |
| 10 | 02:07:01 | TERM | every web socket server has to connect to every other web socket server | every WebSocket server has to connect to every other WebSocket server | term_decisions: web socket -> WebSocket | high |
| 11 | 02:08:30 | TERM | this real-time pubsub | this real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub | high |
| 12 | 02:08:36 | TERM | what is real-time pubsub | what is real-time Pub/Sub | term_decisions: pubsub -> Pub/Sub | high |
| 13 | 02:10:56 | TERM | on Redis PubSub side | on Redis Pub/Sub side | term_decisions: PubSub -> Pub/Sub | high |
| 14 | 02:11:01 | TERM | called PubSub channel | called Pub/Sub channel | term_decisions: PubSub -> Pub/Sub | high |
| 15 | 02:11:13 | TERM | Redis PubSub is the one | Redis Pub/Sub is the one | term_decisions: PubSub -> Pub/Sub | high |
| 16 | 02:11:22 | TERM | Redis PubSub backbone | Redis Pub/Sub backbone | term_decisions: PubSub -> Pub/Sub | high |
| 17 | 02:12:17 | TERM | having web socket connection | having WebSocket connection | term_decisions: web socket -> WebSocket | high |
| 18 | 02:12:25 | TERM | connects to web socket server it tells its membership web socket server | connects to WebSocket server it tells its membership WebSocket server | term_decisions: web socket -> WebSocket | high |
| 19 | 02:13:46 | TERM | web socket server two is subscribed | WebSocket server two is subscribed | term_decisions: web socket -> WebSocket | high |
| 20 | 02:13:46 | TERM | sent to web socket server two | sent to WebSocket server two | term_decisions: web socket -> WebSocket | high |
| 21 | 02:13:54 | TERM | web socket server is not pulling the message web socket server is | WebSocket server is not pulling the message WebSocket server is | term_decisions: web socket -> WebSocket; "pulling" kept per term_decisions | high |
| 22 | 02:16:01 | TERM | web socket server for one organization | WebSocket server for one organization | term_decisions: web socket -> WebSocket | high |
| 23 | 02:16:13 | TERM | for a web socket server | for a WebSocket server | term_decisions: web socket -> WebSocket | high |
| 24 | 02:16:15 | TERM | one web socket server for each | one WebSocket server for each | term_decisions: web socket -> WebSocket | high |
