# chunk_02 notes (lec10, 00:11:22-00:23:53)

## New technical terms / names (not in term_decisions)
- Parquet / Avro (00:16:38 student "famous paracet" -> Parquet, TERM high; teacher "parquet, avro" 00:17:08, 00:18:37, 00:18:48 - casing only). Suggest adding "Parquet | paracet" and "Avro" to the lec10 term table.
- Athena (00:17:58-00:18:58) - already in term_decisions casing list; correct as spoken.
- Lucene (00:19:01-00:19:28) - already in casing list; correct.
- "disk.io" 00:13:41 -> "disk IO" (logged TERM high).
- "constant of portability" 00:13:55 -> "constraint of portability" (WORD medium; teacher says "adding this constraint" 00:14:56).
- "the nine way" 00:21:43 -> "the naive way" (WORD medium; "what is a naive way?" 00:22:33).
- "Dictory" 00:21:55 -> "Dictionary" (WORD medium).

## Flags left in the transcript (lead may decide)
- 00:12:50 `[?sorting | asr: "starting"]` - "So starting by key should be the way" (student just said "sorted via key", "if you do not sort it").
- 00:13:07 `[?shard | asr: "start"]` - "maybe I need to start it or partition it where there are multiple of files" (could also be "sort it").
- 00:14:30 `[check: ASR may have garbled "a bit different opinion"]` - per term_decisions.
- 00:19:57 "Sidesh" `[check: name spelling]` (Sidesh / Sitesh open question).
- 00:20:36 `[unclear: "I want in two"]` keys and values - maybe "I won't go into"?
- 00:20:52 `[check: start of sentence may be cut - overlapping speech]` - "go to blocks and I'll keep it very simple" (probably "Don't go to blocks"; not inserted).

## Speaker doubts
- 00:11:57 TEACHER "then it does not seems like a good design." relabelled Student 1 (completes the student's if-then sentence; logged SPEAKER medium). 00:12:00 "That's yeah." left with Teacher.
- 00:12:17 "processing." moved to Teacher (SPLIT), "Yes." onward = Student 1.
- 00:14:46 "No, but then you would still have to extract it to use it." under STUDENT_1 -> `Teacher?` (objection to the zip idea, followed by "Right." from the student and teacher "I'm also against it.").
- 00:18:51 "really simple on that" moved to Teacher (SPLIT); "okay just maybe a last line..." = Student 1.
- STUDENT_15 00:12:09 / 00:17:57 / 00:18:00 -> `Student?` per speaker map.
- 00:20:29 "How?" and 00:21:08 "So I can keep a lot." kept with diarization (Student 2 / Teacher); either could be the other speaker.
- Student 1 at 00:11:22 continues the 00:09:52 turn (Hemant per speaker map) - name not repeated (not right after a call).

## Verifier remarks
- PASS. 4 single-word "drops" are verifier artefacts: real cross-segment repeats ("Thanks. Thanks.", "that, that", "Okay. Okay.", "dictionary. Dictionary") are collapsed as stutters on the corrected side only. Text kept as spoken. The teacher's "Thanks. Thanks." (00:17:04) was given its own paragraph before "[00:17:05] Thanks so much..." so the 3x repeat is not reported as a 2-word run.

## Topic candidates
- [00:19:57] Searching the single file
- [~00:21:46] Naive approach - CSV text file and linear search (indexing starts at 00:23:44 / next chunk)
