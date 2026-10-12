# chunk_03 notes (lec03, 00:24:05-00:35:37)

## New technical terms / names (not in term_decisions)
- "concordinated" -> concatenated (00:28:39, 00:30:50). Non-word; teacher says "concatenation" 00:28:53. Logged TERM medium. Check other chunks for the same form (e.g. earlier "machine ID and time" explanation ~00:07-00:12).
- "right" -> write (00:27:20, 00:27:25, 00:27:34) in "newer write overrides the older write" (conflict resolution / last write wins). Logged WORD high. Lead may want a lec03 rule: "right" -> write only in write-conflict sentences.
- "M1 happened 10 / 11 / 12" (00:24:15), cf. CTX 00:23:09 "m1 happened when it created this": probably "M1 hyphen 10" (IDs written "M1-1729"). Flagged `[?hyphen | asr: "happened"]` x3, not corrected. Lead: decide for chunk_02 too.

## Speaker doubts
- none (whole chunk is TEACHER monologue).

## Hallucination candidates in range
- #405 00:25:31 "Okay." and #493 00:32:15 "Okay." - teacher's own transition words; kept.

## Other things for the lead
- Verifier quirk: chunk raw timestamps are ROUNDED float starts, but the verifier's block boundary compares them as whole seconds, so a paragraph opened on a segment with fraction >= .5 (e.g. 00:34:12 = 2051.7 s) leaks that segment into the previous block and FAILs. Fixed here by opening the 2nd-block paragraph at 00:34:22 (2062.44 s). Assembly may hit the same thing.
- 00:24:19 "And then 12th day you do flush again." kept as spoken (maybe "12th, there").
- 00:26:16 "first request should always get ID, second request should get ID 2" - number after first "ID" not in ASR; not filled in.
- 00:34:24 segment starts "measured and that tells you" (no gap before) - kept as spoken.
- 00:32:46 "1729002 / 1729001" vs earlier "17290002" - kept as spoken (numbers not corrected).
