# chunk_03 notes (lec06, 00:23:42-00:35:15, segments #381-#615)

## New technical terms / names (not in term_decisions)

- 00:23:42 "banner bear" - probably the product Bannerbear (image-generation API, fits "always specializing in doing this" = on-the-fly social images). Flagged `[?Bannerbear | asr: "banner bear"]`, not corrected. Lead: decide and add to term_decisions.
- 00:25:47 "image magic" -> ImageMagick corrected here (TERM high). term_decisions lists only 01:28:45; extend the row to cover 00:25:47 (and CTX 00:22:46 "image magic" in chunk_02).
- 00:35:06 "the photo step" -> "the photos table" (WORD medium). New ASR form for the existing "photos table" row ("photo stable").
- 00:32:45 "hash Y to store" -> "hash, why to store" (WORD medium; spoken "why" rendered as letter "Y").
- "local host" (00:26:05, "serve it via your local host") kept as two words - not the "localhost 5000" row.
- "rp.gmail.com" (00:28:12) kept as spoken, like "arpit.gmail.com".

## Unclear spots (flagged, not guessed)

- 00:24:37 "Twitter can build this as a name" - maybe "as a native (feature)" (cf. 00:24:09 "native feature of Twitter"). `[unclear: "as a name"]`.
- 00:25:24 "We lost a local prototype." - maybe "Build a local prototype". `[unclear: "We lost"]`.
- 00:28:46 "If you pass the value, I repeat, I direct gmail.com to the same hash function" - probably "arpit@gmail.com" read out. `[unclear: ...]`.
- 00:29:41 "when we are reading from a message and survey data" - maybe "rendering from S3 and serving data". `[unclear: ...]`.
- 00:30:58 "we'll build this very safe" - `[unclear: "very safe"]` (maybe "very same / very thing").
- 00:31:09 "not really good scan is difficult" - maybe "building at scale is difficult". `[unclear: "good scan is"]`.
- 00:31:51 "Let's directly kick off grades." - `[unclear: "grades"]`.
- 00:31:55 "Raise your hands or pull you in." - `[unclear: "pull you in"]` (maybe "unmute").
- Kept without flag (grammatical as heard): 00:25:32 "I've worked with Python for in order to build this" (maybe "PIL for"), 00:27:19 "Nothing beats practical structure" (maybe "practical stuff"), 00:33:45 "While authentication people pass it ... you are locked in some others account".

## Speaker doubts

- 00:32:08-00:35:10 fragmented STUDENT_2 / TEACHER zone resolved per segment (log rows 15, 16, 18, 20, 21, 22, 23, all SPEAKER medium):
  - #531 "why" -> Teacher; #542 "that that would" -> Student 2; #555-#556 "why not if you open Gravita" -> Teacher; #583 "image paths." -> Student 2; #590-#594 "Yeah, we won't be able to. That is why I said." -> Student 2; #599-#601 "In which what do you store?" -> Teacher; #610-#611 "The, the The primary key of the photo step." -> `Student?` (could be the teacher answering their own question).
- 00:34:47 "Yep." (TEACHER label, after "So let's say you have a photos table.") left in the teacher turn - could be the student's acknowledgement.
- 00:32:49 STUDENT_11 "Yeah, right." -> `Student?` per speaker map.
- 00:32:57 STUDENT_2 "Correct." kept with Student 2 (student agreeing, then continues).
- Student 2 in this chunk = one voice throughout (hash/email ID/photos table answers); no name call.

## Hallucination candidates in range

- #442, #510, #570, #574, #578, #613, #614 "Okay." PHRASE - real back-channel, kept.
- #512 REPEAT-SEG "Let's start with database." (same second as #511) - kept both + `[check: possible ASR duplicate]`.
- No removals in this chunk.

## Topic candidates

- [00:27:22] Designing Gravatar; [~00:31:17] Gravatar requirements; [00:32:08] Gravatar database schema.

## Verification

- `verify_content.py --chunk chunk_03 --strict`: PASS | retention 99.24% | additions 0.49% | drops 5 (long 0) | adds 0 | unapplied log rows 0.
- The 5 single-word drops (`this`, `it`, `why`, `the`, `okay`) are cross-segment stutter collapses by the verifier ("doing this. This is", "version of it. It", "why, why", "The, the The", "Okay. Okay.") - only the third "the" stutter was actually dropped (allowed).

## Per-chunk checklist (references/checklist.md)

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw segment timestamp (`[~00:31:17]` for the split segment #501).
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, repetitions-for-emphasis kept ("Hardly one hour." x2, "Highly, highly, highly", "Let's start with database." x2).
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker (8 unclear, 1 ?term, 1 check, 2 Student?).
- [x] Every non-trivial change logged with exact Original (0 unmatched rows).
- [x] No hallucinations removed (none needed).
- [x] verify --strict = PASS.
- [x] New terms / open questions written here.
