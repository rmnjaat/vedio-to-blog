# chunk_05 notes (lec02, 00:50:04-01:03:30, segments #850-#985)

## New technical terms / names (not in term_decisions)
- WiredTiger (00:51:01, "Wiretigers documentation") -> corrected to "WiredTiger's documentation" (TERM, medium). MongoDB's storage engine; passage is about MongoDB's official docs on ACID. Lead may want to add "Wiretigers" as an ASR form.
- "Daryl Abu Devi" (00:52:30, "specialized KV store as well, like Daryl Abu Devi or Redis") - flagged `[?DynamoDB | asr: "Daryl Abu Devi"]`, not corrected. Evidence for DynamoDB: Student 2 repeats "DynamoDB or Redis" at 00:52:52; teacher named DynamoDB and Redis as KV stores at 00:51:57. Could also be another KV product (e.g. Aerospike), so left as a flag.
- "massive block values ... four MB size" (00:53:14) - flagged `[?blob | asr: "block"]`. "block" is a real word, so not corrected.
- "Sampar?" (00:51:20, teacher) - probably the teacher calling on a student by name before the next question. Kept + `[check: name]`.
- "holds ruba" (01:00:37) - list of chat apps; `[unclear: "holds ruba"]` per term_decisions Open questions.
- "a channel stable" (01:03:20, Student 1) -> "a channels table" (WORD, high): word-boundary error.
- Pankaj (01:03:01) - used `Student 1 (Pankaj)` per term_decisions.

## Speaker doubts / decisions
- 00:50:13 (#852, STUDENT_6) "Not performed." - may be the teacher answering "not performant" before "It's a distributed transaction. Slows down." Kept under Student 6, word unchanged, `[check: ...]` added.
- 00:51:20 (#874) STUDENT_4 -> Student 2 (SPEAKER, medium): one sentence continues into #875 STUDENT_2, and Student 2 asks the KV follow-ups. If the lead prefers, label the whole question `Student?`.
- 00:51:49 (#878) "No, no, no." STUDENT_2 -> Teacher (SPEAKER, high).
- 00:53:04 (#909) STUDENT_2 -> Teacher (SPEAKER, high): answer runs into #910 TEACHER.
- 00:52:26 (#899) STUDENT_2 "Correct." and #900 "What else?" inside Student 2's question - "Correct." may be a teacher back-channel. Left as Student 2 (no clear evidence).
- 00:53:41 (#918) "we are using something how we are using something okay all right thank you" is the end of the teacher's answer before the break announcement. Kept in one Teacher turn; `*(admin)*` placed where the break talk starts.

## Lead decisions / other
- Removed #928 "Thank you." (00:59:43) as HALLUCINATION per term_decisions. Added `[break ~00:54:25-00:59:43]` exactly as term_decisions prescribes.
- The turn for #929 is timestamped `[01:00:04]`, not the rounded `[01:00:05]` shown in the raw chunk. The segment's real start is 3604.68 s = 01:00:04.68. With 01:00:05, the verifier put this segment's raw words in block 1 and the paragraph in block 2, so block 1 failed retention. Lead: apply the same convention (or switch to rounding) when assembling.
- Logged the three "web sockets" -> "WebSockets" joins (rows 11-13), as chunk_07 did, so the verifier can match the joined token.
- Verifier lists one 1-word drop `this` at 01:00:49. This is a tokenizer artefact: norm_tokens merges the repeated "for this. This is" in the corrected text, while the raw keeps the two words in separate segments (#936/#937). The text is kept as spoken.

## Per-chunk checklist (references/checklist.md)
- [x] Only OWNED segments emitted (#850-#985); no CTX content.
- [x] Every turn / paragraph starts with a raw segment timestamp (01:00:04 = floored real start of #929, see above).
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, emphatic repeats ("how, how, how, why, why, why", "No, no, no"), admin break talk kept.
- [x] No bold/italics on teacher words; no lists.
- [x] Every guess is a marker (unclear 1, ?term 2, check 2).
- [x] Every non-trivial change logged (13 rows), Originals copied from raw (0 unmatched).
- [x] Removed hallucination logged (#928). Other PHRASE "Okay." candidates (#853, #895, #901, #917, #954, #972) kept as real back-channels; #970 REPEAT-SEG kept as teacher emphasis per term_decisions.
- [x] verify_content.py --chunk chunk_05 --strict = PASS (retention 99.92%, additions 0.00%).
- [x] New terms / open questions written here.
