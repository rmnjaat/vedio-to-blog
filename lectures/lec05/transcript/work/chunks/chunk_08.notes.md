# chunk_08 notes (lec05, 01:26:19-01:39:05)

## New terms / names (not in term_decisions)
- 01:35:57 "Sandeep" - teacher calls a student by name; STUDENT_1 answers ("I would store it in an array"). Speaker map has STUDENT_1 = Rahul; here the teacher then says "Rahul, go on" (01:36:11). STUDENT_1 label may mix Sandeep and Rahul in this stretch - kept "Student 1", no name attached.
- 01:35:55 "Single load?" - flagged `[?Single node | asr: "Single load"]` (teacher said "single node thing" at 01:34:18).
- 01:38:14 "you pick where can I say 16" - flagged `[?varchar | asr: "where can"]` (string key size).
- 01:38:18 "24, 30 to 60" - kept as spoken; `[check]` may be "32, 64".
- 01:35:40 "this what will bring someone" - `[unclear]`.

## Speaker doubts
- 01:36:03 STUDENT_1 "Sandeep, inaudible." - reads like the teacher telling Sandeep he is inaudible; labelled `Student?` + check.
- 01:36:44 STUDENT_1 "Relational data is what? Ahre?" - may be a teacher interjection inside the student's answer; kept + check.
- 01:37:18/01:37:25 boundary: "storage size" (TEACHER label) may finish Student 1's sentence "if we are not concerned about"; kept teacher label + check.
- 01:38:21/01:38:22 STUDENT_1 "Based on the requirements." x2 - possible ASR duplicate or teacher echo; kept both + check.

## For the lead
- Break 01:27:55-01:33:13 marked `[break ~01:27:55-01:33:13]`; "Thank you." at 01:33:13 removed (HALLUCINATION) per term_decisions.
- Student 1 turn at seg #1458 stamped `[~01:36:21]`: raw start is 5781.86 s (shown rounded as 01:36:22 in the chunk), and `[01:36:22]` made the verifier's block boundary split the segment from its paragraph.
- Verifier lists one 1-word drop "bigger" (01:38:53); the text keeps "a bigger, bigger string" as spoken, so this looks like stutter normalization in the verifier. Not a failure.
- Kept "relation database(s)" (01:26:44-48) and "distribute key-value store" (01:27:52) as spoken.
