# chunk_13 notes (lec05, 02:25:36-02:38:15)

## New technical terms / names (not in term_decisions)
- 02:26:50 "Bloom filter" (Student 7) — said correctly, kept.
- 02:27:36 "high level arc of that" — flagged `[?arch | asr: "arc"]` (architecture shorthand; next line "a basic one node architecture").
- 02:29:24 "upset" -> "upsert" (TERM high, list "select or update or upsert or delete"). Suggest adding "upset" to the upsert row ASR forms.
- 02:30:48 "the right flow" -> "write flow" (WORD medium). Suggest a lec05 rule: "right" -> "write" only where it is the write path to master.
- 02:35:10 "pin up" -> "spin up" (WORD high); "server to MySQL servers" -> "server, two MySQL servers" (NUMBER medium).
- 02:35:35 "commit blog" flagged `[?commit log | asr: "commit blog"]` per open question 8; "mysql bin log" -> "MySQL binlog".
- 02:37:34 "detail" -> "TTL" (TERM high, same as chunk_12 row 05). Suggest adding "detail" to a TTL row in term_decisions.

## Flags left for the listener
- 02:26:43 teacher reply starts mid-sentence ("design, but you can do all sorts of files") — `[check: reply starts mid-sentence]`; "all sorts of files" kept.
- 02:27:13 "all sorts of ads" kept as ASR (could be "adds"/"things"); not flagged.
- 02:33:24 "pars the query" -> `[unclear: "pars"]` (parses / passes / fires?).
- 02:35:58 "and what right do that" -> `[unclear: "what right"]` ("and write"? "and whatnot"?).
- 02:36:42 "one small company" -> `[?component | asr: "company"]`; "you don't need bad job now" -> `[?batch job | asr: "bad job"]` (batch cleanup job discussed 02:28:37, 02:31:24).
- 02:32:19 "If someone fires app stocks for Zomato" kept as ASR.

## Speaker doubts
- 02:37:03 (#2460, STUDENT_1): "other question that you might have something" continues the teacher's 02:36:59 sentence; split to Teacher (SPLIT, medium). Student 1 starts at "hey arpit".
- 02:37:27 (#2464, TEACHER): "yeah even by a user it the" moved to Student 1 (continues in #2465 "ttl should be less than now right"); SPLIT medium. Both split points use `[~02:37:03]` / `[~02:37:27]`.
- 02:37:53 "Wait, wait, wait, just a minute." stays Student 1 (diarization label; term_decisions structure note calls it the teacher, but the next line 02:38:15 "huh yeah go on so so my point is" is also STUDENT_1 and reads as the student resuming). Lead: confirm by listening.
- Student 7 not named in label (teacher called "D Agrawal" right before; student says "This is DPA" -> `[check: name spelling]`). Student 1 not called by name in this chunk -> plain "Student 1".

## For the lead
- Topic candidates: 02:27:36 high-level architecture of the distributed KV store (KV API, replicas, sharding by range); 02:36:55 Q&A on the second part.
- Verifier: 1 single-word drop "connections" at 02:31:43 is a diff alignment artefact — "connections" occurs 5x in raw and 5x in corrected.
- Paragraph 02:34:58 runs to 02:36:55 (~117 s): a paragraph break at raw seg #2449 (start 9364.58 s, shown as 02:36:05) made the verifier's block boundary split mid-segment, so it was merged.
