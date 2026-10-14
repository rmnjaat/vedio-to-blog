# chunk_03 notes (lec09, 00:23:34-00:35:16, segments #392-#624)

## New terms / names not in term_decisions

- "Anamal." 00:24:45 - teacher calls a student; next turn is STUDENT_6 ("Hi Arpit ...", 00:24:50). Probably lec05's "Anamol". Kept as ASR wrote; turn labelled plain `Student 6` (the frozen speaker map says STUDENT_6 00:24:50 had no name call - it did). Lead: decide whether to label `Student 6 (Anamol)` and the spelling.
- "cloud fair" 00:27:06 ("whatever the cloud fair or cloud provides") - flagged `[?Cloudflare | asr: "cloud fair"]`; not in term_decisions (glossary has "cloud flare/flair" -> Cloudflare). Candidate for an A-row.
- "cast in CDN" 00:28:54 -> "cached in CDN" (TERM medium, caching context). Not in term_decisions.
- "CDMs" 00:30:49, 00:30:52 -> "CDNs" (TERM high). Not in term_decisions.
- "patches it back" 00:29:56 - flagged `[?fetches | asr: "patches"]` (cache miss -> origin).
- "separation of concepts" 00:30:32 - flagged `[?separation of concerns | asr: "separation of concepts"]` (real phrase; could be what the teacher said).
- "So I had this out" 00:24:51 - flagged `[?doubt | asr: "out"]`.
- "imd" 00:25:17 - flagged `[?img | asr: "imd"]` per A#3 (no "static" next to it, so not corrected); "arpeg.png" kept + `[check: demo file name]`.
- "it's what does it keep?" 00:25:11 - `[unclear]`.

## Speaker doubts

- 00:23:34 STUDENT_5 "Don't jump." -> `Teacher?` per map default.
- 00:26:30-00:28:11: a student's question under the TEACHER label ("So maybe my question is related to what he has asked ..."). Student and teacher alternate in 00:27:06-00:28:11; boundaries chosen at grammar breaks (Student? 00:27:06, Teacher 00:27:53, Student? 00:27:59, Teacher 00:28:03) with a `[check]`. 00:27:01 "Correct." kept with the teacher.
- 00:28:47 follow-up question (TTL / invalidation) under TEACHER -> `Student?`; STUDENT_11 thanks at 00:29:58 - probably the same student who asked at 00:26:30.
- 00:33:00-00:33:10: segment #592 "gonna how big 5mb yeah probably yeah 5mb why would you ..." split: "gonna" to Student 1, rest to Teacher; who says "Yeah, probably" is uncertain (`[check]`).
- 00:34:43 STUDENT_10 "Yes, that's correct." - the speaker map suggests `Teacher?`, but it directly answers the teacher's "Poor user experience. Correct?" so labelled `Student?` (STUDENT_10's default). Lead to confirm.
- 00:31:31 Student 1 = Sandeep (after "Sandeep?" 00:31:30); later Student 1 turns left unnamed (attach rule).

## Other

- #394 "First try out CDN." repeat kept + `[check: possible ASR duplicate]` (per structure note).
- "We'll talk about it 7.3. 6.3." 00:30:10 kept as spoken (session/section numbers?).
- Paragraph break placed at 00:34:01, not 00:33:35: segment #595 starts at 2014.62 s (shown 00:33:35), which falls before the verifier's block boundary, so a 00:33:35 paragraph tripped the per-block add check. No text moved.
