# chunk_08 notes (01:27:03 - 01:39:48, #1370-#1579)

## New technical terms / names (not in term_decisions)
- Spring Boot (01:28:01, "spinning up Spring Boot instances") - correct as ASR, kept.
- Zoom chat (01:37:15-01:37:38) - product, kept as ASR.
- REST (01:27:42, 01:30:19 "rest call", "normal rest") - casing only -> REST. Lead may add to term_decisions.

## Flags placed (lead may want to decide globally)
- 01:29:07 "it is not a web software" -> `[?WebSocket | asr: "web software"]` (same ASR form as Open question 03:12:03; teacher is arguing message sending is probably not over WebSocket). If the lead accepts "web software" -> WebSocket as a rule, both spots can be corrected.
- 01:29:13 "wait, wait, wait, wait, wait, then when flows" - 5x "wait" kept (term_decisions says likely real); "then when flows" -> `[unclear]`.
- 01:31:44 "this kind of messaging, salutes, web socket" -> `[unclear: "salutes"]`.
- 01:32:28 "sends this message to user in real life" -> `[?real time | asr: "real life"]`.
- 01:32:31 "sending normal HTTP receiving or web socket" -> `[?over | asr: "or"]`.
- 01:34:57 "batch right through a synchronous medium" -> "batch write through" (WORD, per term_decisions) + `[?asynchronous | asr: "a synchronous"]`.
- 01:37:04 "Second is we are doing a synchronous part" -> `[?asynchronous | asr: "a synchronous"]` (same pattern as 01:34:57; second type = asynchronous persistence).
- 01:38:38 "already handing a ton of TCP connection" -> `[?handling | asr: "handing"]`.
- 01:39:02 "you see where it folders" -> `[?falters | asr: "folders"]`.

## Kept as spoken (possible doubts, not flagged)
- 01:37:18/01:37:21 "Zoom chat has zero persistence. Zoom chat persists." - contradictory but teacher content; kept.
- 01:27:06/01:27:07 STUDENT_1 "Definitely. Definitely." - consecutive duplicate, kept both (doubt -> keep), teacher echoes "Definitely. It's a strong word."
- Fragments left as is: 01:32:50 "misquote on" (cut), 01:33:55 "in the database and then comes back" (no gap, nothing marked missing), 01:37:48 "more than that.", 01:39:35 "three different types".

## Speaker doubts
- none. Student 1 (STUDENT_1) answers the teacher's question at 01:27:03-01:27:52; no Q&A block (answering a teacher prompt, not asking). Chunk ends with the teacher's "any questions on this?"; Student 1's question starts in chunk_09.

## Topic candidates
- 01:28:08 Slack message sending - guarantees; 01:29:19 three types of communication; 01:32:58 second type (WhatsApp hypothetical, async via Kafka); ~01:36:57 third type (Zoom chat, no persistence); 01:38:24 why no DB calls from the WebSocket (edge) server.

## Verifier
- PASS; 1 single-word residual "definitely" at 01:27:06 is an alignment artifact (all three "Definitely" are present in the output).
- "web socket" -> "WebSocket" joins logged as TERM rows (8), following chunk_07, because the verifier treats the join as a drop/add.
