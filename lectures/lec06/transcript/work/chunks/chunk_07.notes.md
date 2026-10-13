# chunk_07 notes (lec06, 01:08:10-01:19:14, segments #1175-#1379)

## New terms / names not in term_decisions

- `gaveta` -> `Gravatar` (01:11:04, 01:11:08 "api.gaveta.com", TERM medium): new ASR form of Gravatar; "What's the origin?" answered right after origin was configured as api.gravita.com. Lead may add `gaveta` to the Gravatar row.
- `apatradar.com` (01:18:51, "CDN falls back to apatradar.com"): very likely "api.gravatar.com" (CDN origin), but too garbled to correct -> flagged `[?api.gravatar.com | asr: "apatradar.com"]`.
- `edge.arpeedbhany.me` (01:10:41) and `edge.arkipani.me` x2 (01:18:14): teacher's CDN demo domain from yesterday, same open question as `arvizhany.me` (00:10:11) -> flagged `[?edge.arpitbhayani.me | asr: "..."]` each time, not corrected.
- `rose` -> `rows` (01:14:46, WORD medium): "So no rose update, it would happen." Same pattern as chunk_04 roads->rows; lead may add a "rows | !roads; !rose" row.
- `in consistent state` -> `inconsistent state` (01:17:22, WORD medium, re-spacing).
- `Heman` (01:14:12, teacher "Go on, Heman."; STUDENT_1 answers): student name, kept as ASR wrote + `[check: name spelling]`. Probably the same student as chunk_04's `[unclear: "Heyman"]` at 00:36:13 (also followed by STUDENT_1 answering) - lead may decide a name (Hemant?) and add to lec06 names. Label left as plain `Student 1`.
- Flags (not corrected): `survey a` (01:08:40, "We want to survey a CDN" -> `[?serve via]`); `a stream` (01:10:19, "reading from a stream" -> `[?S3]`); `their ID` (01:14:28 -> `[?where]`); `this to them` (01:16:59 -> `[?these two]`, "you do these two" at 01:17:29); `CD` (01:18:57 -> `[?CDN]`, per term_decisions); unclear `It with Matt meets that day` (01:16:44, probably "If it matches then") and `That use` (01:16:57).
- Not changed, possible issues: "Your AWS will go to shoot up." (01:09:01, maybe "AWS bill"); "This way the photo is entered." (01:09:47, maybe "rendered"); "Like another photo is active, right?" (01:15:55).

## Speaker doubts

- 01:17:56 STUDENT_1 segment split per speaker map: question "could you explain the CDN mapping that we were doing there" given to `Student 5` (medium - Student 5 replies "the mapping that was there" at 01:19:05). "there" taken from the TEACHER segment 01:18:03 (diarization lag). The collapsed "Yes, yes, yeah." left at the end of Student 1's turn - could be the teacher acknowledging or Student 5 starting; listen.
- 01:18:25 TEACHER "API.com." - possibly a student's answer (teacher immediately says "No, no.") -> kept as Teacher + `[check: ...]`.
- 01:19:10 STUDENT_8 "DK." -> Teacher (per speaker map).
- STUDENT_1 "Hmm. Hmm." (01:14:19-01:14:20) kept (student waiting while teacher scrolls back).

## For the lead

- Hallucination candidates in range: #1227 "." dropped silently (per term_decisions); #1280, #1284, #1378 "Okay." kept (real back-channel); #1299 RATE kept (content fits); #1353 LOOP collapsed + split (log 22-25).
- No gaps in range.
- Verifier: PASS, 1 one-word dropped run `cdn` at 01:11:20 - alignment artefact; every CDN in 01:11:16-01:11:28 is present in the output.
- Topic candidates: 01:08:25 Serving Gravatar photos via CDN (continues the 01:07:29 architecture topic - may be a `###`); 01:11:52 CDN invalidation on photo update (Kafka, consumers); 01:14:03 Q&A (transaction fallback, CDN mapping).

## Per-chunk checklist

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw timestamp (`[~...]` only for the split turns 01:17:56, 01:18:03).
- [x] Read side by side with the raw: same sentences, same order, nothing summarised, translated or added.
- [x] Rhetorical questions, asides, repetitions-for-emphasis kept ("millions and millions and millions", "In most cases, in most cases", "no matter what" x2).
- [x] No bold/italics on speech; no lists.
- [x] Every guess is a marker (unclear 2, ?term 9, check 2).
- [x] Every non-trivial change logged (30 rows), Original copied from raw; 0 unmatched rows.
- [x] Removed hallucinations logged (none removed except the empty "." segment, silent per term_decisions).
- [x] verify_content.py --chunk chunk_07 --strict = PASS.
- [x] New terms / open questions written above.
