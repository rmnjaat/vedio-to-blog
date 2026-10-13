# chunk_10 notes (lec08, 01:43:45-01:56:01, segments #1802-#2014)

## New technical terms / names not in term_decisions
- "Maglev, a fast and reliable software load balancer" (01:53:10) - paper the teacher recommends (Google's Maglev paper). Kept exactly as spoken; suggest adding `Maglev | as written` to the lec08 names table.
- "Shriya" (01:47:00) - the teacher addresses Shriya ("Shriya, my question to you, given that you propose the solution"), and STUDENT_8 answers at 01:47:22 -> labelled `Student 8 (Shriya)` per the attach rule. Not in the lec08 student-name list; please add it. (lec03 had a "Shriya" as well.)
- SRE (01:44:56), CDC (01:52:29), Redis broker (01:52:35): casing only.

## Speaker doubts
- 01:54:13-01:54:19 STUDENT_1 "I'll take three questions now. Uh, people who have not spoken, I'm just giving them. Everyone's is a known place." -> relabelled Teacher (log row 09, speaker map lists it as a teacher leak). Merged into the teacher paragraph that starts 01:53:05.
- 01:47:25 TEACHER "load balance between DNS." directly after Student 8's "We'll have multiple DNS." - kept as Teacher (diarization label), but it could be the student finishing the thought. Not flagged in the text.
- 01:54:20 Student 2 opens with "I bet I was thinking" -> `[?Arpit | asr: "I bet"]` (students address the teacher as Arpit in lec08; not certain enough to correct).

## Flags placed (for the lead)
- 01:47:50 `[unclear: "as in it since"]` (student's cut-off sentence).
- 01:48:20 `[?tree | asr: "free"]` ("DNS free, something like that" - DNS tree / hierarchy?).
- 01:49:12 `[?resolution | asr: "results"]` ("It does the results given a human readable name").
- 01:49:25 `[unclear: "as the board"]` ("basically as the board that DNS is not a proxy" - "assert"?).
- 01:50:21 `[?proxy | asr: "box"]` ("It's not acting as a box" - teacher said "cannot act as a proxy" 01:49:02).
- 01:50:42 `[?orchestrator | asr: "orchestrate"]` ("that's the job of an orchestrate").
- 01:51:45 `[unclear: "all that drawing user i can"]`.
- 01:54:19 `[unclear: "Everyone's is a known place."]`.
- 01:54:20 `[unclear: "in front days now"]`.
- 01:55:44 `[?fetches | asr: "fits"]` ("which fits me another IP address").
- 01:55:50 `[?infra | asr: "infrared"]` ("CoreDNS is a private infrared").

## Other (kept as spoken, no flag)
- 01:44:17 "I should not use this name in my employer now, but still check." - odd but plausible aside about using Google in examples.
- 01:47:31 "And now this is a transcending problem." - possibly "recursive problem" (teacher later says "base condition of the recursive" 01:56:15, next chunk); not flagged in text, lead may want a `[check]`.
- 01:49:17 "That's it." (REPEAT-SEG of #1894 01:49:11) - a different sentence sits between the two; genuine repetition, kept.
- 01:51:56 "lb.payments.google.com" (reversed vs "payments.lb.google.com" elsewhere) kept as spoken.
- 01:52:35/01:52:40 "because / Because" across a segment seam collapsed to one (single-word stutter).
- 01:49:52 "behind a sense" -> "behind the scenes" (WORD medium, logged).
- Verifier lists single-word "drops" for user / what / it at 01:46:55, 01:48:11, 01:49:11: the words are present in the output ("the user. User then", "Now what? What would", "That's it. It does"); they are adjacent repeats across segment seams. The two "dns" drops (01:52:03, 01:55:57) are the second halves of "core / dns" and "code / DNS" split across segments, covered by log rows 06 and 18.
- Topic candidates placed: 01:50:52 final load balancer design diagram; 01:54:20 questions before the break.
