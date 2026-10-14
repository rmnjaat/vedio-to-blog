# chunk_13 notes (lec10, 02:26:00-02:39:26, segments #2457-#2650)

## New technical terms / names (not in term_decisions)
- 02:26:26 "mysql postgres mongodb redis fedis pick any database" - "fedis" unknown (another DB in the list; DiceDB? FerretDB?). Flagged `[unclear: "fedis"]`, not guessed.
- 02:28:34 "the metadata kind of header that we discussed in the previous product kind of header" - flagged `[?problem | asr: "product"]` (the dictionary problem's index/header, part 1).
- 02:32:07 "you see the CRC doesn't matter because there is some corruption" - flagged `[?match | asr: "matter"]` (real word; not corrected).
- 02:32:37 "And have a record for better." - flagged `[?record format | asr: "record for better"]`.
- 02:32:54 "when we're designing a storage check" - flagged `[unclear: "storage check"]` (storage engine?).
- 02:34:19 "We add it through all the files." - flagged `[?iterate | asr: "add it"]`.
- 02:35:39 "sounds very fancy he gave me order one put order one delete everything order by" - flagged `[unclear: "he gave me"]` (get?) and `[?order one | asr: "order by"]`.
- Applied frozen decisions: desk -> disk (02:30:23), React -> Riak (02:38:11-02:39:00), BitCask -> Bitcask (casing), `[unclear: "S-FM"]` 02:37:54, `[unclear: "hash paste"]` 02:38:57.
- Corrected outside the explicit lists (logged, lead may review): "new light" -> "new line" (02:27:23, 02:27:31, high), "first bite" -> "first byte" (02:31:24, high), "margin complexion" -> "merge and compaction" (02:32:24, high), "the right never came your way" -> "write" (02:32:27, medium), "merger compact" -> "merge and compact" (02:34:17, medium), "so on this there are keys and values" -> "on disk" (02:36:01, medium).

## Speaker doubts
- none (whole chunk is TEACHER monologue; no student turns).

## For the lead
- React -> Riak: 02:38:11 "Uber uses React as their main database" lies 6 s before the decision's stated range (02:38:17-02:40:29) but is the same sentence group; applied (TERM medium, row 09). 02:38:43 and 02:39:00 hits also applied (in range, not individually listed).
- Kept as spoken (no comment): "11 standard kids" (02:27:23), "writing 110" (02:29:34), "CRC time stamp" (project rule), "separate server server" (02:38:04), "doing very frequent mergers and compaction" (02:35:14), "Master, slave, architecture", Uber/Bitcask production claim.
- 02:33:24 "then a new file then a new point in time only one file would be active" - ASR likely dropped words ("... At any point in time"); kept as is, no marker.
- Disk "I.O." kept in ASR form (02:28:27, 02:28:45) because the verifier treats "IO" vs "I.O." as a word change; assemble pass may normalise to "IO" (lecture form) if desired.
- Verifier: PASS with one single-word non-failing drop item ("first" at 02:31:07); the text "You are first, first thing" is present - alignment artefact.
- hallucination_candidates in range: #2501 02:29:19 "Okay." and #2570 02:34:05 "Okay." = real back-channel, kept. No gaps in range.
