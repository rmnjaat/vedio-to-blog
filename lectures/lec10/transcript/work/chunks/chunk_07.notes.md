# chunk_07 notes (01:13:48-01:26:15)

## New technical terms / names not in term_decisions
- 01:18:26 "Hey, man." (teacher call, STUDENT_1 answers) -> "Hemant." (WORD medium, per Hemant row pattern; this time was not listed). Student 1 labelled `Student 1 (Hemant)` on 01:18:29 only.
- 01:13:48 first owned segment continues Student 9's turn begun after "Uh, Shreya." (01:13:29, chunk_06) -> labelled `Student 9 (Shreya)`; the assembler seam will show two consecutive Student 9 turns - merge at Pass 5.
- 01:17:34 "change law" -> changelog (TERM high) - new ASR form, add to the changelog row.
- 01:17:49 "pin up" -> "spin up" (WORD high), 01:25:22 "meeting" -> "meaning" (WORD high).
- Canary (01:20:59), NAS (01:19:40) - already correct.

## Speaker doubts
- 01:18:39-01:18:47 TEACHER "And now just a bit, which means that now that we have this, we also have headers ... ready to upload to S3." sits inside Hemant's answer; kept Teacher (diarization), could be Hemant continuing.
- 01:19:19 "Correct." under STUDENT_1 kept in Student 1's turn (no evidence of teacher).
- 01:14:03 split to Teacher (speaker map); "correct? Yeah, yeah" (01:14:09) kept in the teacher's turn.

## Flags left in text
- 01:15:20, 01:16:30, 01:16:40 `[check: possible ASR duplicate]` (structure-note REPEAT-SEGs #1318, #1348, #1354 - teacher re-reading the board).
- 01:16:37 `[?written | asr: "rotten"]` (term_decisions flag row).
- 01:19:25 `[?downtime | asr: "downturn"]`.
- 01:21:49 `[?uploaded | asr: "graduated"]` ("What if you have graduated to the same path?").

## For the lead
- Kept as spoken: "merge of merge sort" / "merge of merge sorted" (x4, probably "merge step of merge sort"); "it's not a approach" 01:14:14; "All them referring to merge of sorted array" 01:17:11 (maybe "Although I'm referring"); "AA'" 01:15:49 (board notation, teacher otherwise says "A, A dash"); "I just explain karna" 01:15:59 (Hindi "karna", casing only); "Let me prove you" 01:21:13 / "proving you all" 01:23:42 (teacher's recurring "probe"? - kept, also CTX 01:26:32); "A to B" 01:20:20 (A/B?); "will provide it" 01:22:24.
- Verifier lists 2 single-word drops (`headers` 01:18:44, `index` 01:25:29) - both words are present in the output ("headers, headers, index", "Index was read"); alignment artifacts, non-failing.
