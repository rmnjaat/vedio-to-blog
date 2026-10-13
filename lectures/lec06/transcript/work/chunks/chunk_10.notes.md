# chunk_10 notes (lec06, 01:43:08-01:56:24, segments #1777-#2028)

## New terms / names not in term_decisions

- `Anubhaf` -> `Anubhav` (01:53:37, WORD medium): student name; teacher says "Anubhav" at 01:45:56 and STUDENT_5 answers both calls. Lead may add Anubhav to the lec06 student names.
- `Vikram` (01:49:10), `Vishal` (01:52:13), `Rahul` (01:52:52), `Alok sir` (01:56:02): names called by the teacher, kept as ASR wrote them. Vishal/Rahul are in lec06 names already; Vikram and Alok are not.
- `site` -> `side` (01:52:21 "One point from your site.", WORD high; the teacher's fixed phrase).
- `weather` -> `whether` (01:52:36, student, WORD medium).
- Flags (not corrected): `attack` (01:44:11 -> `[?tag]`; CTX 01:57:01 "these people attack" may be the same mis-hearing); `some icons and` (01:44:35, unclear, probably "someone is"); `r` (01:45:07, unclear); `that's that's amenity` (01:45:13, unclear, maybe "that's what I meant"); `what you made it` (01:45:19 -> `[?what you meant]`); `won't have to do pagination` (01:48:35 -> `[?would have to]`, meaning flips; the teacher concludes "So you would have paginated endpoints"); `the him that just` (01:51:56, unclear); `who can that` (01:52:29 -> `[?who can tag]`); `calendar level` (01:53:17 -> `[?granular]`); `on the email` (01:55:21 -> `[?image]`); `protocol` (01:55:43 -> `[?product]` call, "it's still a product call" follows); `those slides` (01:55:56 -> `[?sides]`).
- Not changed, possible issues: "the response time of that service needs to be slow. should be fast enough." (01:54:44, the teacher corrects themselves - kept); "People are very likely to unlock or to basically uninstall" (01:51:10, kept); "which one would you want to play" (01:46:11, maybe "pick", kept); "all the photo is of user one" (01:53:17, maybe "although", kept); "Profile service activity." (01:56:16, could be a student's answer).

## Speaker doubts

- 01:44:44-01:44:50: "no no no you are not the owner of the" kept with Student 1 (speaker map); "image" moved to Student 1 (SPLIT medium). Whether "Still you are doing" is the teacher or the student is unclear.
- 01:45:13 "Yes, that's that's amenity, right?" inside the TEACHER label may be the student saying "yes, that's what I meant" -> `[check]`.
- 01:46:06-01:46:17: STUDENT_5 / TEACHER boundary lag, split into 4 turns (log 03-06).
- 01:49:15 "Great." moved to Teacher (speaker map); "If I say yes, then, then, then" left with Student 6 + `[check]` (could be the teacher playing product owner).
- 01:52:23 "or did that first point, first" + TEACHER "point, who can that." - probably the teacher saying "that's the first point, who can tag"; left as diarization put it + `[check]`.
- 01:52:57 "Correct." -> `Teacher?` (medium).
- 01:56:08: teacher called "Alok sir", but STUDENT_5 answered (same label that answered "Anubhav" twice). Plain `Student 5` + `[check]`.
- 01:50:04 STUDENT_13 "Yeah." -> `Student?`.

## For the lead

- Hallucination candidates in range: #1780 REPEAT-SEG kept (emphatic repeat); #1787, #1822, #1838, #1847, #1882, #1945, #2021 "Okay." kept (real back-channel); #1800 LOOP collapsed to 3 "no" (log 01); #1827 LOOP collapsed to "One, one" (log 04).
- No gaps in range (01:47:57-01:48:12 is a 15 s pause, below the 20 s gaps threshold; text continues).
- Verifier: PASS; 1 one-word dropped run `you` (from collapsing the stutter "you you you put it" at 01:45:19 to "you put it"; the verifier places it at 01:53:06).
- Topic candidates: 01:45:59 Max number of people tagged in a photo (storage schema); 01:49:13 Tag notifications - notification team, product-level throttling; 01:53:41 Tag suggestions - ML team dependency, SLA, fallback. All are subtopics of the tagging requirements topic that starts in chunk_09 (01:40:40 / 01:42:51) - probably `###`.

## Per-chunk checklist

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a timestamp from the raw (`[~...]` only for split segments).
- [x] Read side by side with the raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("very shitty photo"), repetitions-for-emphasis kept.
- [x] No bold/italics on speech; no bullet lists from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] No hallucinations removed (none in range); loops logged.
- [x] verify_content.py --strict = PASS.
- [x] New terms / open questions written here.
