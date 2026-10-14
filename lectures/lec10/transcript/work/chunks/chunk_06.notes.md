# chunk_06 notes (01:02:35-01:13:48)

## New technical terms / names not in term_decisions
- 01:12:50 "Jodhinda, how would you solve this problem?" - teacher calls Jodhinda (= project "Jodhinder" / lec07 "Jyotinder"?). Kept as ASR wrote + `[check: name spelling]`. STUDENT_3 answers (graveyard entries + compaction). Speaker map says STUDENT_3 = Anubhav and 01:12:53 = plain `Student 3`, so labelled plain `Student 3`. Lead: STUDENT_3 seems to mix Anubhav and Jodhinda (as chunk_04 found Amrita) - consider `Student 3 (Jodhinda)` on 01:12:53.
- "graveyard entries" (01:12:53, student's word for tombstones) - kept as spoken.
- "blindfoldedly" (01:11:19) - teacher's word, kept.

## Speaker doubts
- 01:07:07 "Now we are talking." (STUDENT_1) -> `Teacher?` (praise; teacher continues 01:07:08).
- 01:06:58 "where ... it would update what?" kept under Student 1 + `[check]` (may be teacher probing).
- 01:07:25 "So where is dictionary?" and 01:07:35 "How?" kept under Student 1 (could be teacher probes; no clear evidence).
- 01:08:18 STUDENT_14 "Correct." -> `Student?`; 01:09:46 STUDENT_14 "Okay. Correct." -> `Teacher?`.
- 01:09:27 TEACHER "Challenges is to generate the diff actually." -> `Student?` (which student unknown).
- 01:10:53 TEACHER "Yeah, we have to." -> `Student?`; 01:10:56 "We have to do that happen in file IO." kept Teacher + `[check]` (may be student; teacher replies "No.").
- 01:13:27 STUDENT_2 "Yeah." kept as Student 2 (could be teacher before the "Shreya" call).

## Flags left in text
- 01:06:31 `[check]` word before "job is periodic updates" may be missing (cron?).
- 01:10:45 `[check]` "by this? Yes." - start missing or student's answer.
- 01:12:06 "Thanks, but thanks for making this." after 14 s pause - kept + `[check]` (one signal only, not removed).

## For the lead
- changelog: term_decisions row lists only 01:09:10 for "change log" -> "changelog"; applied to every "change log" hit in this chunk (11 rows, TERM high, join). The decision row says conf "low", but output-format has no `low`, so logged `high`.
- Kept as spoken (teacher content): "we are just built our database", "We just build a key value store", "the beauty of the system up right now", "This is an even weekly update. So have it very clean up it directly.", "if I write around fruit" (term_decisions: not write-around).
- Verifier: PASS (3 single-word "drops" are stutter-collapse artefacts: "dictionary? Dictionary", "and and", "Yeah. Yeah." are all kept in the text).

## Per-chunk checklist
- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw segment timestamp.
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("three hats"), repetitions kept.
- [x] No bold/italics on speech; no bullet lists from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] Removed loops logged (no hallucinations removed).
- [x] verify_content.py --chunk chunk_06 --strict = PASS.
- [x] New terms / open questions written here.
