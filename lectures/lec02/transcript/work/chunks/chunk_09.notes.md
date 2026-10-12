# chunk_09 notes (01:39:48 - 01:52:08)

## New technical terms / names (not in term_decisions)
- gRPC (01:41:59, ASR "GRPC") - casing only.
- Socket.io / Socket IO (01:50:24 "Socket.io", 01:50:29-01:50:45 "socket IO" x3) - kept "Socket.io" where ASR wrote it, others cased "Socket IO". Lead may want one form lecture-wide.
- UDP, TLS, HTTP, HTTPS, TCP (01:39:55-01:43:16) - as ASR.
- Discord (01:47:39) - as ASR.
- "web software" (01:46:55, 01:48:48) = WebSocket: corrected at 01:48:48 (strong context, logged), flagged `[?WebSocket | asr: "web software"]` at 01:46:55. Supports the open question at 03:12:03.

## Flags placed
- 01:39:48 `[?sending | asr: "a signing"]` (Student 1).
- 01:42:10 `[unclear: "very high in the ocean"]` - maybe "very high ingestion"/"video/gaming"? no guess.
- 01:43:27 `[?overwhelmed | asr: "over well"]`.
- 01:45:27 `[?Slack | asr: "stack"]` ("simple stack based application").
- 01:45:29 `[?asynchronous | asr: "a synchronous"]` (same pattern as term_decisions 01:34:57 rule).
- 01:46:55 `[?WebSocket | asr: "web software"]`.
- 01:50:45 `[check: ...]` 13 s segment ending "You" before "B, C and D are connected to me" - possible lost words.

## Speaker doubts
- 01:41:27 STUDENT_10 "Correct." - after teacher's question "who will tell B ...?"; could be teacher back-channel or a student; kept Student 10 per rule (no clear evidence).
- 01:40:05 Student 1 turn contains several "Okay." - may be teacher back-channels merged into student segments; left in Student 1's turn (not clearly distinguishable).

## Other
- Verifier quirk (for the lead): raw display times are rounded (#1753 starts 6610.56 s, shown 01:50:11), so a paragraph starting there falls on the wrong side of the 10-min block bound and fails the add% check. I moved the paragraph break to 01:49:55 (#1749, 6595.2 s) instead. No text changed.
- "web socket" -> WebSocket joins logged as TERM rows (09-24), like chunks 05/07, because the verifier counts the joined token as a change.
- 01:44:35/01:44:37 "Okay." x2 (#1678/#1679) kept both (2 s apart, plausible).
- Topic candidate 01:46:41: Scaling WebSocket servers.
