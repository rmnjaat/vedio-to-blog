# chunk_08 notes (lec06, 01:19:14-01:31:54)

## New technical terms / names (not in term_decisions)

- Predicate pushdown: the ASR wrote "predicate pushed up" twice (01:21:52, 01:21:54) and a cut-off "predict" (01:21:50). The real SQL-optimizer term is "predicate pushdown", and the teacher's explanation ("whatever you need at the bottom of the tree") fits it. Because "pushed up" could be what was actually said, these are flagged `[?predicate pushdown | asr: "predicate pushed up"]` / `[?predicate | asr: "predict"]`, not corrected. Lead: decide.
- "join criteria" / "join key": the ASR wrote "joint" 5x (01:20:24-01:22:12). Corrected using the project row joints -> joins and the teacher's own "join criteria" at 01:20:47. Consider adding "joint -> join (DB join context)" to the lec06 table.
- "all demand image optimization" -> "on-demand" (01:23:16, 01:23:34): the teacher says "on demand" correctly at 01:23:23. Add to the table if it recurs.
- Cloudinary (01:28:34, "cloudflare cloudflare or cloudinary"): product name, casing only. "Akamai" (01:22:31) is correct as written.
- "Chandran Anubha" (01:23:05): name(s) the teacher addresses ("I'll take your question in some time"). Kept as the ASR wrote it, with `[check: name spelling]`. This may be "Chandan" (lec06 student) plus "Anubha".

## Speaker doubts

- 01:19:14: the STUDENT_2 turn follows the teacher's "DK." (01:19:10, under STUDENT_8 in chunk_07), so it is labelled `Student 2 (DK)` on that turn only. Later STUDENT_2 turns in the same exchange ("And second question would be", 01:22:16) are clearly the same person but are labelled plain `Student 2`, per the attach rule.
- 01:20:06: TEACHER "why can't we just search basis on the user ID itself? Why do we need to do it?" was relabelled Student 2 (SPEAKER, logged), because it finishes the student's sentence from 01:20:04.
- 01:20:18: TEACHER "But still we are not aware about the user ID" sounds like the student (Student 2 says "We are not aware about the user ID here" at 01:20:30). It stays with the Teacher, with `[check: possibly Student 2 speaking]`.
- 01:20:10: "You can do it because the input ... is the hash." The meaning suggests "can't". Kept as written, with `[check: "can" vs "can't" - meaning flips]`.
- 01:23:01: TEACHER "Thank you." -> `Student?` (SPEAKER medium, per the known-structure note).

## Flags left for the lead

- `[unclear]`: "huge terror" (01:20:57, maybe "filter"); "the buttons," (01:21:15); "SSHedon" (01:23:44, maybe "Assume CDN"; the teacher says "here I'm assuming CDN does not give you this feature" at 01:28:29); "would be by bad." (01:25:04); "apply.transformation.pass" (01:25:22).
- `[?Asynchronous | asr: "Our synchronous"]` (01:29:21): the following "we'll talk in six weeks when we discuss video streaming" points to async processing, but the meaning flips, so it is flagged only.
- `[?async | asr: "a sync"]` (01:29:29): per term_decisions.
- Kept as spoken, not flagged: "until long from 9 AM to 10 30 AM" (01:29:44, maybe "till now"); "16 cross section" (01:23:51, per term_decisions); "anywhere out of the box" (01:30:27).

## Verifier

PASS. Two 1-word drop runs are reported ("imagemagick" at 01:25:46 and "so" at 01:27:22). Both words are present in the corrected text: four ImageMagick tokens as in the raw, and "so. So" restored. These look like alignment artefacts and are below the failure threshold.
