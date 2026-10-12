# chunk_04 notes (lec02, 00:38:20-00:50:04)

## New technical terms / names (not in term_decisions)
- Neptune (00:39:12) - AWS managed graph DB; ASR correct, kept.
- Neo4j, Dgraph ("D-graph" at 00:39:22 -> Dgraph, casing/hyphen only), TigerGraph, BadgerDB - already in term_decisions.
- Sunil (00:40:13) - student name; teacher lowering his hand. Kept as spoken, not used as a label.
- "non-resistant databases" (00:45:50, 00:45:56) -> corrected to "non-relational" (medium). Lead may want to add "non-resistant" as an ASR form of "non-relational" in term_decisions.
- "Return in Go" (00:39:17, 00:39:26) -> "Written in Go" (WORD, medium).

## Flags placed (lead may want a lecture-wide rule)
- "two links" x4 (00:44:14, 00:44:29, 00:44:37, 00:46:20) - teacher says "toolings" at 00:45:56 in the same sense; flagged `[?toolings | asr: "two links"]`, not corrected. Candidate for a term rule.
- "discuss" as noun (00:38:51 "very trivial discuss", 00:44:54 "big data discuss") - probably "use case"; flagged `[?use case | asr: "discuss"]`.
- "pullings" (00:45:50 "live interaction pullings") - possibly "pollings"/"polls"; term_decisions keeps "pulling" for its two listed hits; this third form flagged.
- Unclear: "fall of all languages" (00:38:34, maybe follow/follower relations - chunk_03 discusses "follow following"), "shelving" (00:38:51), "bit scale" (00:39:17), "when do you see a comment" (00:43:48, probably "when do you use what"), "as if what is that" (00:44:14), "water" (00:45:22), "part-triotic" (00:49:40).
- `[?stored | asr: "toward"]` (00:47:11, Student 6), `[?layer | asr: "player"]` (00:47:28).

## Speaker doubts
- 00:49:51 (#848, STUDENT_4) "...just google search you're just a google search graph databases in" + #849 TEACHER "fraud detection ..." - the second half of #848 is probably the teacher answering; left in Student 4's turn with `[check: diarization seam]`, no words moved.
- 00:49:19 (#838) "Correct." under TEACHER mid-explanation after "write N self" - could be a student back-channel; left as Teacher (no clear evidence).
- 00:48:36 (#827) Student 4 "Typically create those models..." could be the teacher continuing, but teacher replies "Correct." at 00:48:42 -> kept Student 4.

## Per-chunk checklist (references/checklist.md)
- [x] Only OWNED segments emitted (#645-#849); no CTX content.
- [x] Every turn / paragraph starts with a raw segment timestamp (00:48:26 paragraph split inside Student 4's question so the turn at 00:48:30 is not misattributed by the verifier's block boundary; text unchanged).
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides (Sunil hand-lowering, marked *(admin)*), repetitions kept.
- [x] No bold/italics on teacher words; no lists.
- [x] Every guess is a marker (unclear 7, ?term 9, check 1).
- [x] Every non-trivial change logged (11 rows), Originals copied from raw.
- [x] No hallucinations removed (all PHRASE "Okay." candidates #659, #685, #749, #800 kept as real back-channels; #650 RATE hit kept, flagged unclear).
- [x] verify_content.py --strict = PASS (retention 99.69%, additions 0.26%; 1 single-word "right" alignment diff at 00:48:18, non-failing - both "right?" and "Right." are present in the text).
- [x] New terms / open questions written here.

## Other
- Sentence fragments kept as ASR produced them (no gap >= 2 s): 00:43:38 "bit deeper..." (start missing), 00:44:08 "of the data is..." (start missing), 00:49:13 "write N self" (cut off). No [missing] markers since no evident gap.
