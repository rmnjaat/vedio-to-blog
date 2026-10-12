# chunk_12 notes (lec03, 02:09:20-02:20:10)

## New technical terms / names (not in term_decisions)

- **nextval** (Postgres sequence function) - ASR "next well" (02:12:42, 02:20:02) and "next file" (02:15:54). Flagged
  `[?nextval | asr: ...]`, not corrected. If the lead confirms, could become a TERM decision (teacher reads Instagram's
  `nextval('insta5.table_id_seq')`).
- **insta pi** 02:12:42 ("next well insta pi dot table id sequence") - flagged `[?insta5 | asr: "insta pi"]` (schema
  name is insta5 everywhere else).
- **custom epoch** - "since your customer epoch" 02:13:23 corrected to "custom epoch" (medium). Lead may want a row.
- **per shard** - "per shot sequence number" 02:12:50 -> "per shard" (high).
- **machine IDs** - "Because of machine ideas" 02:16:42 -> "machine IDs" (high).
- **ZooKeeper** 02:17:26 - casing only ("zookeeper").
- **Postgres** 02:14:35 - kept as spoken.
- **Pankaj** 02:17:03 - teacher calls "So, uh, Pankaj." and STUDENT_3 answers "Yeah." Name attached as `Student 3 (Pankaj)`
  for that exchange (02:17:05-02:17:20). Conflicts with speaker map (STUDENT_3 = DK) - diarization label probably mixes
  people; lead to decide.

## Unclear spots left flagged

- 02:14:41 "Post on the previous batch did it" (Folks/Most of?).
- 02:14:59 "Earlier, if you don't buy you to auto increment" (if you don't pass, it used to?).
- 02:15:25 "under dot table underscore added or sequence" (insta5.table_id_seq?).
- 02:16:51 "And here we have bottleneck five."
- 02:17:24 "that any machine that can get separating".
- 02:17:40 "that begins easy to implement".
- 02:18:06 "not do that one life engineering is all we have ... but not good" - only "not do that one life" and "but not good" wrapped.
- 02:14:24 "database code procedure" -> `[?stored procedure]` per term_decisions.

## Speaker doubts

- 02:16:09/02:16:14 boundary bleed: "separate column." moved to Teacher (SPLIT, logged).
- 02:18:14 teacher name-call "any other questions anyone yeah rajin" split out as Teacher; "rajin" kept + `[check: name spelling - Rajiv?]`.
- 02:19:43 STUDENT_3 segment continuing Student 6's sentence -> `Student?`.
- 02:16:50 "Correct." under STUDENT_1 at the end of the student's own statement - left as Student 1 (could be teacher).
- 02:17:30-31 STUDENT_7 "Okay. Okay. Yeah." after Pankaj's question - left as Student 7.
- Student 6 at 02:19:27 not tagged "(Anupam)" - name only called at 02:28:21.

## Verifier

PASS; 5 single-word drops reported (`default`, `this` 02:10:29; `okay` 02:15:40; `yeah` 02:16:44; `okay` 02:17:30) are
alignment artefacts of repeated words - all those words are present in the corrected text.
