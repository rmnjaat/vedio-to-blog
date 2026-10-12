# chunk_13 notes (02:28:27 - 02:41:34, #2376-#2626)

## New technical terms / names (not in term_decisions)
- "ad server" / "head servers" (02:34:01, 02:40:48, 02:41:19) -> "edge server(s)" (TERM medium, rows 11/23/24). Lead may add an "edge server | ad server; head server" row to term_decisions.
- "pepsockets" (02:38:12) -> "WebSockets" (TERM high). "real-time pumps up" (02:29:06) -> "real-time Pub/Sub" (TERM medium; same Pub/Sub rule, new ASR form "pumps up").
- "load valancer" (02:35:31) -> load balancer.
- Socket IO (02:32:05 "Node.js process of socket IO") - written "Socket IO" (casing only); canonical product name is Socket.IO - lead decides.
- Rajiv (02:31:54, teacher calls on him; STUDENT_5 answers) -> label `Student 5 (Rajiv)`.
- Jay (02:40:08, teacher calls on him; STUDENT_4 label answers) - kept label `Student 4` + `[check]`: may be a different person than the Student 4 who asked at 02:35:52/02:38:53.
- Teacher addressed as "Arpit" (02:31:58, Student 5) and "Erfit" (02:40:11, Student 4) - kept as ASR + `[check: name]`. term_decisions has "Abhishek" (03:11:59) - names conflict; lead decides (label stays Teacher).
- "balance" (02:28:27-02:28:31, "I'm just giving him balance") - teacher naming the server-discovery service, continues chunk_12's Connector/orchestrator/"other balance". Kept as spoken.

## Flags placed
- `[?IP address of | asr: "IP out of"]` 02:28:36; `[unclear: "person"]` 02:28:46 ("same edge server person"); `[unclear: "whichever etc. etc. connect you to it"]` 02:29:10.
- `[unclear: "Pacific"]` 02:30:25; `[?cohort | asr: "code"]` 02:30:31 (teacher says "last cohort" at 02:31:37); `[unclear: "reason"]` 02:30:33 ("best I've covered this reason").
- `[?feel free | asr: "will free"]` 02:31:01.
- `[?a load balancer | asr: "the level inside"]` 02:32:19.
- `[?rate limiter | asr: "rate within"]` 02:35:13.
- `[?part of | asr: "parlap"]` 02:37:21.
- `[unclear: "us a word"]` 02:38:43 ("either user tells us a word or server gets...").
- `[unclear: "OCS"]` x2 02:39:04 (per term_decisions open question).
- `[?persistence | asr: "person"]` 02:39:55 ("No expiration, no person").
- `[unclear: "DPA"]` 02:40:46 (per term_decisions open question).

## Kept as spoken (possible doubts, not flagged)
- 02:32:28-02:32:29 "Interviews are stupid." x2 - emphasis (REPEAT-SEG), kept. 02:32:44/02:32:46 "another hop / another hops" (#2464) - emphasis, kept.
- 02:30:54 RATE, 02:32:30 RATE, 02:34:49 RATE - normal fast English, kept.
- 02:35:47 "Okay." / Student 4 "Thank you." / 02:35:48 "Okay.", 02:38:52, 02:40:05 "Okay.", 02:41:31 "Thanks." - real back-channels, kept.
- 02:34:08 "if I leave the credentials given" (maybe "leak") - plausible English, kept unflagged.
- 02:39:55-02:40:00 teacher sentence cut off "sending it to everyone who is" - no gap, left as fragment.

## Speaker doubts
- 02:33:30 STUDENT_5 segment opens "there is nothing you gain some you lose some right" - may be the teacher finishing "directly expose IP addresses over there, there is nothing [wrong]..." -> kept with Student 5 + `[check: diarization seam]`.
- 02:33:40 "yeah you get" (end of STUDENT_5 #2476) moved to the teacher's answer turn `[~02:33:44]` (SPLIT logged): teacher's #2477 continues "ton of them", and repeats "A ton of them" at 02:33:59.
- 02:39:04 TEACHER "from cloud providers like let's say OCS streaming..." may be the end of Student 4's question ("other streaming services also, right? from cloud providers...") -> kept Teacher + `[check: diarization seam]`.

## Topic candidates
- 02:30:13 Wrap-up and next week's plan (admin); 02:31:58 Q&A - exposing edge server IPs, security; 02:35:52 Q&A - edge servers and channel changes; 02:38:53 Q&A - why Redis Pub/Sub; 02:40:08 Q&A - bad actors / private channels.

## Verifier
- PASS, retention 99.96%, additions 0.00%. One single-word `right` listed as dropped at 02:40:57: count of "right" in raw and corrected is equal (31/31) and "All right. Right." is present - alignment artefact, not a failure.
