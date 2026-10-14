# chunk_10 notes (01:47:21-02:00:01, #1975-#2055)

## New technical terms / names (not in term_decisions)

- 01:56:06 "it's their heading we don't worry about it" - flagged `[?headache | asr: "heading"]` (data-science team's responsibility, "for us that is a black box"). Not corrected because "heading" is a real word.
- 01:57:04-01:57:14 Student 2 "one text table ... all the relevant text with their tag ID ... store those texts there" - flagged `[?tags | asr: "text"]` x2 and `[?tags | asr: "texts"]` (tag ID / hashtag context). Not corrected because "text" is a real word.
- 01:58:38 "maintain in a separate area like the latest photos" - flagged `[?array | asr: "area"]` (the student says "top 100 array" at 01:59:04, and the teacher says "this array" at 01:59:08).
- 01:59:04 "top 100 array in the same stories" - flagged `[?same store | asr: "same stories"]` (key-value store proposal 01:57:51).

## Applied term_decisions

- A2 "So like carpet" 01:57:04 -> `[unclear: "carpet"]`.
- B "photo stable" -> "photos table" (01:57:20, 01:57:30), A#34 "caption FII" -> "caption, FYI" (01:57:32), A#33 "key value store" -> "key-value store" (01:57:51).
- Break: `[break ~01:47:51-01:54:29]`. #1987 "Thank you." 01:54:29 removed as HALLUCINATION. 01:54:50 STUDENT_7 -> Teacher (admin).
- The PHRASE candidates "Okay." #2006 and #2049 were kept as real speech.

## Speaker doubts

- 01:58:28 "and by the way why do you need it because that's exactly what you want to render" (TEACHER label): this continues Student 2's sentence with no break. It could be the student justifying the count or the teacher challenging it. It is labelled `Teacher?`.
- 01:58:52 / 01:58:57 split (per the speaker map): Student 2 "...so we can like pop" / Teacher "We don't have to care ... doing it for us, right?" / Student 2 "So we can just store it in a like top 100 array...". Both inner boundaries use `[~...]` timestamps.
- 01:59:13 "The photo URLs again or the post ID." was kept as Student 2 (it answers the teacher's question). It could also be the teacher continuing his question.
- 01:57:56 "There are two tables, there are two databases there." was kept as Teacher, as the diarization says.

## For the lead

- I added a paragraph break at [01:57:38] inside the teacher's 01:57:20 turn. Raw display times are rounded: #2029 starts at 7066.6 s but is shown as 01:57:47. Without the break, the verifier's block bound snapped to 01:57:47 and 16 student words fell into the wrong block, which caused a false FAIL (97.76% / 2.24%). No text was changed. The new break sits at a natural restatement ("So here, this is ... the page that you have to render").
- 01:47:45 "7, 8, 8, 8 minutes from now" was kept as spoken. It is not a loop candidate.
- Verifier: PASS, retention 100.00%, additions 0.00%.

## Per-chunk checklist

- [x] Only OWNED segments emitted; no CTX content.
- [x] Every paragraph / turn starts with a timestamp copied from the raw (`[~...]` only for split segments).
- [x] Read side by side with the raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, admin talk, repetitions kept.
- [x] No bold/italics on the teacher's words; no bullet lists from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with Original copied exactly from the raw.
- [x] Removed hallucination logged.
- [x] verify_content.py --chunk chunk_10 --strict = PASS.
- [x] New terms / open questions written here.
