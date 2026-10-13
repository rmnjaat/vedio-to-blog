# chunk_03 notes (00:25:34-00:36:15)

## New terms / names not in term_decisions (flagged, not corrected)

- 00:28:48 "in my skills, some transactions are happening" (DK, CDC question) -> `[?MySQL | asr: "my skills"]`. Likely MySQL.
- 00:29:45 "like in my school, I have two tables" (DK) -> `[?MySQL | asr: "my school"]`. Same guess.
- 00:30:47 "push our post-based data to Elasticsearch" (DK, PG sync) -> `[?Postgres-based | asr: "post-based"]`; teacher says "Postgres based CDC" at 00:30:56.
- 00:28:14 "Kafka and SQL's cost" (teacher, answering the 00:27:52 "used SQL rather" question = open question 6) -> `[?SQS's | asr: "SQL's"]`.
- 00:32:14 "Get put, delete ETL, the four functionalities" -> `[?TTL | asr: "ETL"]`; TTL is in the agenda at 00:33:13. Lead: decide whether to correct (would be a new AMB row: ETL -> TTL only in the get/put/delete list).
- 00:31:31 "around, it tells what it is because" -> `[unclear: "it tells what it is"]` (maybe "ETL ..."?).
- 00:26:43 "So the system is built on our." -> sentence cut off, `[unclear: "our."]`.
- 00:30:34 "Key." -> `[unclear: "Key."]` (map: teacher leak).
- 00:31:09 "Airby" (no "te") -> Airbyte, logged under row A10 (form not listed in A10; please add "Airby").

## Speaker doubts

- 00:26:11 STUDENT_2 "It's fine." -> `Teacher?` (answers Student 2's own read-replica question; map said `Student?` unless clear). Merged with STUDENT_9 "Works just fine." (00:26:12, Teacher).
- 00:29:22 TEACHER "Okay, so it is then reading it in the same sequence, whatever." -> `Student?`; 00:29:26 STUDENT_4 "Correct." -> Teacher (diarization lag, medium).
- 00:30:12 "you know." moved to Student 4's turn (SPLIT).
- 00:30:52 "one, right?" left at start of the teacher turn; may be the student's sentence tail ("...to Elasticsearch one, right?"). Not changed.
- Left as diarized (possible student back-channels under TEACHER, no clear evidence): 00:28:09 "Got it.", 00:30:31 "Okay. Got it.", 00:31:25 "Got it. Got it."; under STUDENT_1: 00:34:07 "Okay.", 00:35:31 "Correct.", 00:35:44-00:35:48 "Right? That's a simple hash map..." (could be teacher summarising).
- #500 00:28:29 REPEAT-SEG: kept, it is a self-correction ("legacy service. Oh, sorry. ... basic service"), no flag.

## Verifier residue

PASS. Remaining single-word drops `transaction` (00:29:05), `yeah` (00:31:26), `no` (00:35:40) and add `no` are alignment artefacts of repeated words; all words are present in the output.

## Topic candidates

00:31:31 Distributed cache - requirements and agenda; 00:33:26 Storage on a single node; 00:35:53 Multiple value types.
