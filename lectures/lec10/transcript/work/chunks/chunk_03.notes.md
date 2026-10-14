# chunk_03 notes (lec10, 00:23:53-00:37:11, #423-#670)

## New technical terms / ASR forms (not in term_decisions)
- "MVs" (00:26:31, "iterating around MVs of data") -> corrected to "MBs" (TERM medium). Suggest adding "MVs" to the lec10 MB row.
- "opposite" -> "offset" (00:27:50, TERM high). Real word; only this hit corrected (index-offset context).
- "index.index.of dictionary" / "Data.dictionary" (00:35:02-00:35:06) - file names as heard, kept + `[check: file names as heard]` (maybe "index.dictionary").

## Flags placed (not corrected)
- 00:24:24 "Apple or MSN" -> `[check: "MSN"]` (per term_decisions C).
- 00:24:59 "Amazon is offset to which points over here" -> `[?two | asr: "to"]` (sequence Apple / Amazon / "book with offset three"; lec10 "two"->"to" REJECT row is the reverse direction, so flagged only).
- 00:32:44 "reads were slow to make it first we create an index" -> `[unclear: "to make it first"]` (could be "to make it fast" or "to make it fast, first").
- 00:33:47 "So it's 4.3 as it's R4.4." -> `[unclear: "as it's R4.4"]` (probably "4.3 or 4.4").
- 00:33:50 "4.3 plus 4 by to store this integer" -> `[?byte | asr: "by"]` (lec10 rejects "by"->byte generally; this hit is the 4-byte integer, so flagged rather than corrected - lead may decide to correct).
- 00:35:56 "you have to iterate through this entire" - sentence cut off, 3 s pause before 00:36:02 -> `[check: sentence cut off, 3 s pause follows]` (not [missing]: gap short).

## Speaker doubts
- 00:24:50 #437 TEACHER "nth byte from the beginning ... with that line starts" continues Student 2's "So offset is the" with no pause (boundary lag?) -> kept Teacher + `[check: speaker boundary]`.
- 00:24:33 #435 "point to what?" at the start of Student 2's turn could be the teacher's question - kept Student 2.
- 00:28:00-00:28:02 #492-#493 "That's your concern. Right." (STUDENT_6) -> `Student?` + `[check: may be Teacher]`, logged SPEAKER.
- 00:27:25 STUDENT_11 -> Student 6 (Harsh), per speaker map.

## Lead decisions
- 00:29:53-00:30:05 "17,000,000." x5: kept #529 (Student 6), #530 (Teacher), #532 (Student 6), #534 (Teacher); removed only #533 (DUPLICATE) per term_decisions. Note the teacher's own arithmetic (10.3 x 170,000 = 1,751,000 -> "1751 KB") suggests the students may have said "17,51,000" (Indian grouping) - numbers kept as ASR wrote them, no change.
- 00:34:01 "10.3 into 17" kept as spoken (teacher's arithmetic).
