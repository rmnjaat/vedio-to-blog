# chunk_17 notes (lec08, 03:10:25-03:22:43, #3300-#3594)

## New technical terms / names (not in term_decisions)
- "high ability" -> high availability (03:16:45, 03:16:49; WORD high, same list where the teacher says "high availability" twice). Suggest adding a row.
- "Mambo Jumbo" -> mumbo jumbo (03:12:48, WORD high); "grant work" -> grunt work (03:16:28, WORD medium); "you two comes in" -> user two (03:11:25, WORD high); "reputed, reputedly" -> repeated, repeatedly (03:15:28, WORD medium).
- "heart beats" -> heartbeats (03:13:26, join, logged).
- Flags placed, lead to decide:
  - "server-sent events": "normal service and events" 03:14:00 (student) and "We can use server sending" 03:14:34 (teacher) -> `[?server-sent events]`. Teacher refers to "what we studied in the last week" (reactive communication), which fits SSE.
  - "who keep her" 03:14:48 ("You replace Redis, who keep her, you put explicit HTTP calling") -> `[?ZooKeeper]`.
  - "all service" 03:22:33 / "off service" 03:22:35 -> `[?auth service]` (authentication question).
  - "this core DNS actually has an area of IP addresses" 03:11:09 -> `[?array | asr: "area"]`.
  - "It just picks one idea" 03:12:30 -> `[?IP]` (per decisions); "I want to appear at random" 03:12:32 -> `[unclear]` (one IP?); "He heard, there is no brain" 03:12:37 -> `[?Here]`.
  - "One is faster. Others are follower." 03:16:26 -> `[?master]` (next line "If master goes down").
  - "high ability lvc has a high ability" 03:16:45 -> `[?LBs | asr: "lvc"]`; "high availability code units leader election" 03:16:49 -> `[?CoreDNS | asr: "code units"]`.
  - "if one is done" 03:17:15 -> `[?down]`.
  - "I said cold in this would directly spit out machine of one of the loaders" 03:18:42-03:18:43 -> `[?CoreDNS | asr: "cold in this"]`, `[?load balancers | asr: "loaders"]`.
  - "public desk" 03:19:19 -> `[?DNS]` and "DC progression" 03:19:46 -> `[?TCP connection]` (both per decisions).
  - "has to talk to this audience" 03:21:14 -> `[?DNS | asr: "audience"]`.
  - "this load balancer of your computer" 03:10:54 -> `[unclear: "of your computer"]`; "codeways" 03:12:44 -> `[unclear]` (per decisions).
- Left as spoken (no marker): "LB.payment.google.com" 03:20:57 vs "lb.payments.google.com" 03:19:03 (teacher's own variation); "API gateways are powered proxies" 03:21:49; "I like it, it load balancer" 03:21:23; "what back end service orchestrator" 03:15:18; "orchestrator add leader election" 03:16:49.

## Speaker doubts
- 03:10:46 STUDENT_5 "Okay. No other service required." -> `Teacher?` (could be Student 8 confirming).
- 03:11:42 STUDENT_1 "Why is that a problem?" -> `Teacher?` (challenge question, student answers it).
- 03:12:26 TEACHER "all is all over here." -> `Teacher?` (may end Student 1's "least connections and").
- 03:16:34 / 03:16:37 STUDENT_1 "Right." / "Oh, I see. I missed that." -> `Student?` (Student 3 asked; "I missed that" echoes Student 3's "maybe I missed this").
- 03:16:55 STUDENT_3 "...and this is exactly where" -> kept with Student 3 + `[check]` (may be the teacher starting 03:17:02).
- 03:15:38 STUDENT_3 "Thanks.", 03:21:16 and 03:21:55 STUDENT_5 thank-yous, 03:12:11 STUDENT_9 "Okay. Round robin." -> `Student?`.
- Kept as diarized (not changed): 03:11:06 "The, okay." and 03:13:52 "You are talking about this." under Student 1; 03:14:04 "Hey." under Student 1; 03:20:10-03:20:18 "I think you'll at least have two more. More proxies, right? Yes. ..." under Student 3 (some may be the teacher).
- Student 11 = Harsh or Josh (teacher called both, 03:22:00) - name not attached.

## Hallucination candidates in range
- #3306/#3307 "Now this is where I want to send it." x2 (REPEAT-SEG + RATE): kept both + `[check: possible ASR duplicate]`.
- #3323 "Against the domain name." (student echoes teacher), #3520 "forward it to this load balancer." (different sentence), #3541 "Now I see." (natural repeat), #3583 (student repeats teacher's question): kept.
- #3438 RATE: short sentence, kept. All "Okay."/"Thanks."/"Thank you." PHRASE rows = real back-channel, kept. No removals.

## Verifier
- PASS (retention 99.65%, additions 0.00%). 7 single-word "drops" (it, prometheus, more, yeah, yeah, thanks, okay) are all at adjacent repeated words ("covered it. It just", "Prometheus. Prometheus", "more. More", "Yeah. Yeah.", "Thanks. Thanks.", "Okay. Okay."); the words are present.

## Topic candidates placed
- 03:15:44 orchestrator SPOF / leader election; 03:17:27 private CoreDNS, public DNS, API gateway; 03:21:20 load balancer vs reverse proxy; 03:22:02 where authentication sits. All inside the final Q&A stretch (### level).

## Per-chunk checklist (references/checklist.md)
- [x] Only OWNED segments emitted; no CTX content.
- [x] Every turn / paragraph starts with a raw segment timestamp (`[~03:16:55]` for the split segment).
- [x] Side-by-side read: same sentences, same order, nothing summarised / translated / added.
- [x] Rhetorical questions, asides, repetitions kept.
- [x] No bold/italics on speech; no bullet lists from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged, Original copied exactly.
- [x] No hallucinations removed (none needed).
- [x] verify_content.py --strict = PASS.
- [x] New terms / open questions written here.
