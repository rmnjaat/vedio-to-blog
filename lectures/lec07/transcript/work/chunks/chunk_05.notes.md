# chunk_05 notes (lec07, 00:48:29-01:00:19)

## New technical terms / names (not in term_decisions)
- "z malloc" / "Z malloc" (00:53:30, 00:53:43, 00:53:48, 00:55:00, 00:55:40): new ASR form of zmalloc (row A14) - joined to "zmalloc" (TERM high). Suggest adding "z malloc" to A14's ASR forms.
- "Redisys code base" (00:54:52) -> "Redis's" (TERM high). Suggest adding to row A12.
- "one MVP" (00:51:35) "this pointer can point to a bloom filter, which might be like a one MVP" - likely "one MB" (A23 MP->MB) but B lists MVP as real term; flagged `[?MB | asr: "MVP"]`, not corrected.
- "size underscore alloc" (00:53:09) kept as spoken (variable name).
- "link list" (00:52:50) kept per row B.

## Flags added
- `[?lag | asr: "lack"]` x2 (00:50:39, 00:50:46) - student says teacher's voice is lagging (admin).
- `[unclear: ...]` 00:50:53 / 00:50:58 teacher's garbled network remark (admin); 00:51:09 student's "two point, the value point around the type pointer"; 00:51:30 "This white pointer is for white, this is for white" (void pointer / type? - board may resolve); 00:52:22 "that size of two size" (to total size?); 00:53:23 "malloc and lid" (malloc and free?); 00:57:16 "starts giving the data"; 00:59:16 "So home."
- `[?segue | asr: "set"]` 00:52:28 "that's a perfect set".
- `[?full | asr: "sold"]` 00:59:16 and `[?LFU | asr: "LF"]` 00:59:24 per rows A24 / A25.

## Speaker doubts
- 00:51:46 STUDENT_5 "That's okay." reads like the teacher reassuring Student 5 after "I actually misunderstood" -> labelled `Student?`.
- 00:58:16 #1046 "let's take it at the end" (in STUDENT_3) may be the teacher deferring Rajiv's question -> kept Student 3 + `[check: speaker]`.
- 00:58:21 #1047 teacher segment ends "least recently", #1048 STUDENT_3 starts "used LRU" - boundary probably lags; kept diarization + `[check: speaker boundary]`.
- 00:52:13-00:52:14 "Yes. Yes." under STUDENT_5 may be teacher confirming; left with Student 5 (no clear evidence).

## Topic candidates
- 00:53:28 zmalloc wrapper; 00:55:09 memory limit and triggering eviction; 00:58:02 eviction strategies - LRU and LFU. (00:48:29 malloc/free continues the memory-accounting topic from chunk_04.)
