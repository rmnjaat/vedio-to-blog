# chunk_01 notes (lec10, 00:00:01-00:11:22, segments #0-#222)

## New technical terms / names not in term_decisions
- 00:05:26 STUDENT_4 "marshaling and marshaling" - probably "unmarshaling and marshaling" (or "marshaling and unmarshaling"); flagged `[?unmarshaling | asr: "marshaling"]`. Not corrected.
- 00:05:58-00:06:01 TEACHER "thank you for breaking this topic up" - probably "bringing"; flagged `[?bringing | asr: "breaking"]`.
- 00:07:23 TEACHER "let's say I score apple comma fruit" - probably "store"; flagged `[?store | asr: "score"]`.
- 00:09:32 "the trees or something like that" (Rahul) - probably "B-trees" (speaker map calls it Rahul's B-tree idea); flagged `[?B-trees | asr: "the trees"]`.
- 00:10:18 STUDENT_1 "where key is a word, well, you can be a two line, three line" - probably "value can be"; flagged `[?value can | asr: "well, you can"]`.
- 00:02:18 "caching, matching" flagged `[?batching | asr: "matching"]` per term_decisions row C (not new).

## Speaker doubts
- 00:05:20 split per speaker map: "Yeah, that's a bad way to go, but like just as a reference," kept as Student 4; "how do you, how do you query a JSON format?" -> Teacher [~00:05:20].
- 00:05:33 "Exactly." under STUDENT_4 between the student's "expensive process" and "That's why I'm more inclined..." - may be the Teacher; kept Student 4 + `[check]`.
- 00:07:20-00:07:21 boundary "yeah you can | say that right so let's say..." - diarization kept; `[check]` added (could be all Teacher or all Student).
- 00:08:05-00:08:09 "But that's not | now I'm adding. out of the box, right?" - boundary unclear; diarization kept + `[check]`.
- 00:08:21-00:08:23 "But let's keep it simple | because this one constraint that I'm adding" - "let's keep it simple" could be the teacher's; diarization kept, no flag.
- 00:08:43-00:08:48 TEACHER "Is this format according to you okay enough to start with? Yeah. For starters, it is okay." - "Yeah. For starters, it is okay." may be Student 4 answering; kept Teacher (one weak signal).
- 00:09:03 "No, there is no constraint. Will you keep it sorted?" -> `Teacher?` (speaker map).
- 00:09:24-00:09:39 split into Student 4 / Teacher "Hemant," / Student 4 "else, else I will go with [?B-trees] or something like that." / Teacher "Wait, wait, wait..." per speaker map (STUDENT_2 label for #195 replaced). Lead may want to re-check against audio.
- 00:10:32-00:10:40 STUDENT_1 "Much more than that, to be honest. It's much more than thousand to one." could be the teacher interjecting; kept Student 1 (no evidence).
- 00:05:05 Student 4 left without name: the call was "Raghun" (`[check: name spelling]`, probably Rahul); name added only after "Rahul" call 00:06:55.

## For the lead
- Verifier lists 6 single-word drops (`this`, `compute`, `same`, `okay` x2, `that`) at immediate-repeat positions; all words are present in the corrected text (e.g. "how will you do this? This thing", "compute. Compute", "same, same words"). Looks like a stutter-collapse artefact; non-failing.
- Per-chunk checklist (references/checklist.md) ticked: owned segments only, no CTX text; timestamps on every turn/paragraph ([~] only on split segments); side-by-side read, nothing summarised/translated/added; rhetorical questions, repetitions kept; no bold on speech; every guess is a marker; every non-trivial change logged with exact Original; LOOP logged; verify --strict PASS; new terms/doubts noted here.
