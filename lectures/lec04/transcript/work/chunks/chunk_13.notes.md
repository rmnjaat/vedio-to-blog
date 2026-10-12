# chunk_13 notes (lec04, 02:21:32-02:34:42)

## New technical terms / names (not in term_decisions)
- 02:24:08 "atlashan", 02:24:24 "atlaction" -> Atlassian (TERM high; "mega outage where they deleted the data and it took them 14 days to recover"). Suggest a term_decisions row "Atlassian | atlashan; atlaction".
- 02:34:12 "B plus three" -> B+ tree (TERM high, glossary; disk traversal / log n reads). Suggest a row "B+ tree | B plus three".
- 02:24:01 "piis" -> PIIs (casing only).
- 02:22:22 "a lot of recall records" kept as spoken (may be a false start "rec- records"; not changed).

## Flags placed
- 02:21:40 "I'm going to raise your hand." (RATE 9 w/s) kept + `[check: high speaking rate, possibly garbled]`.
- 02:23:30 "on the truck" -> `[unclear: "truck"]` (probably "platform"; not guessed).
- 02:23:49-02:23:54 `[unclear: "had a so immediately pull this company"]`, `[unclear: "fii"]` (maybe "PII" / "your"; not guessed).
- 02:25:16 "make the entire or GDPR compliant" -> `[?org | asr: "or"]`.
- 02:27:31 "entire block body in cash" -> `[?blog | asr: "block"]` (blog schema has a body field; student also said "text blobs").
- 02:28:18 `[check: "CDN" may end the student's sentence]` (student's "transferred to the" / teacher-labelled "CDN said ...").
- 02:29:28 "send it story" -> `[?store it | asr: "story"]`.
- 02:34:31 "additional cause that you are bearing" -> `[?cost | asr: "cause"]` (next CTX line says "the cost that you would require is high").

## Speaker doubts
- 02:21:32-02:21:44: opening back-channel ("Take one. I'll count it. Hi. Hi. Got. ... Sorry. Yeah.") left under Teacher with `[check]`; the question "So basically in the client side, when we use local storage ..." split out as `Student?` (SPLIT, medium) - asker not named.
- 02:22:49-02:22:51 "Okay. Thank you. Got it." (TEACHER label) may be Ajay acknowledging; left under Teacher + `[check]`. 02:22:53 "for soft deletes when can you move an item ..." kept as Teacher (no clear evidence it is the student).
- 02:26:17 "Depends." (STUDENT_3) relabelled Teacher (SPEAKER medium): it answers Rahul's question and runs into the teacher's "Because then ... trade-off".
- 02:32:01 student called "Rajiv" = STUDENT_6 (who asked the cache-in-DB question at 02:20:22) -> labelled `Student 6 (Rajiv)`; other named students labelled `Student (Ajay)`, `Student (Rahul)`, `Student (Amrita)` (mixed labels STUDENT_2/STUDENT_3).
- 02:32:33: mid-segment split - "That's the reason we put Redis or as a," = Rajiv; "let's approach this from first" = teacher (continues into STUDENT_1 "principle, great question").
- All STUDENT_1 lines = Teacher (label split), one SPEAKER row.

## Hallucinations
- none removed. All PHRASE candidates in range (#2238, #2240, #2249, #2259, #2267, #2271, #2275, #2276, #2326, #2385, #2420, #2421) are real back-channel / thanks - kept. #2390 "You cannot do it." (REPEAT-SEG of #2389 "You can do it.") differs in meaning - kept, no flag. #2437 RATE row = real sentence. No gaps in range.

## For the lead
- Topic candidates: [02:22:19] Q&A - soft delete cleanup / GDPR right to be forgotten; [02:26:02] Q&A - compression in cache; [~02:30:05] Q&A - soft delete cron job and downtime; [~02:32:01] Q&A - Redis cache vs DB table for pre-computed results (continues into chunk_14).
- Verifier: 9 single-word "drops" are stutter-collapse artefacts (Hi. Hi., Thanks. Thanks., GDPR? GDPR, Decompression. Decompression, do it. It's, great great, Why? Why, that. That's x2) - words all present. To avoid a 2-word artefact, "Thanks." at 02:29:42 ends a paragraph and a new paragraph starts at [02:29:43].
