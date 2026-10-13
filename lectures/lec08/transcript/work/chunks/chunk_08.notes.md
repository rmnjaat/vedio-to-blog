# chunk_08 notes (lec08, 01:21:35-01:32:59, segments #1403-#1605)

## New term mappings not in term_decisions (applied, logged)
- `backhand server` -> backend server (01:22:17, 01:22:30). Same family as the existing "bacon server" row; teacher says "backend server" 01:22:02, 01:22:45. Suggest adding "backhand server" to the backend server row.
- `load financing algorithm` -> load balancing algorithm (01:25:51), TERM high.
- `zero stillness, almost zero stillness` -> staleness (01:27:35); "stale data" 01:27:33. WORD high.
- `in fifth way` -> in fifth week (01:29:11); same promise "in fifth week" 01:28:24. WORD high.
- `push base thing` -> push-based thing (01:29:18), WORD medium.
- `help checks` -> health checks (01:32:17, student), TERM medium.
- `LP` -> LB at 01:32:07 ("between DB and LP"), in addition to the listed 01:31:57 hit.

## Flagged, not corrected (lead may decide)
- 01:21:41 "Maybe in base solution" -> `[?event-based | asr: "in base"]`
- 01:22:25 "first segment of a polling frequency" -> `[?second | asr: "segment"]`
- 01:22:30 / 01:22:45 "backend server too" -> `[?two | asr: "too"]` (teacher pointing at backend server 2 on the board? check board)
- 01:23:10 "touch polling and resolve a port" -> `[?ditch | asr: "touch"]`, `[?reserve | asr: "resolve"]`
- 01:29:13 "whole base thing wasn't working" -> `[?pull-based | asr: "whole base"]`
- 01:30:32 "healthy and healthy" -> `[?unhealthy | asr: "healthy"]`
- 01:32:15 "I've set the content." -> `[unclear: ...]`
- 01:32:30 "HLB" -> `[?each LB | asr: "HLB"]` (per term_decisions open question)
- 01:29:36-01:29:38: 2 s gap, next segment starts mid-sentence ("it or you ask ...") -> `[missing ~01:29:36-01:29:38]`
- 01:30:20: 11.6 s segment ends mid-sentence ("there is a chance of my back-end servers") -> `[check: sentence cut off ...]`

## Speaker doubts
- 01:21:47 "Got it." under STUDENT_7 right after the student's own proposal; kept Student 7 + `[check]` (speaker map says check context; could be the teacher).
- 01:24:38 "No, that all, let," (STUDENT_4) relabelled Teacher (diarization lag into teacher's "let LB server itself..."), conf medium.
- 01:23:10 `Student 4 (Rahul)` - name attached because the teacher called "Rahul" at 01:23:08 (attach rule). Rahul is not in the lec08 names list (Rahul only at 00:05:13) - add 01:23:08.
- 01:32:03 "Gaurav?" (STUDENT_1) relabelled Teacher per speaker map; following turn `Student 1 (Gaurav)`.

## Clean-verbatim stutter removals
- Cross-segment stutters "let," x3 (01:24:39-01:24:41) and "yeah," x3 (01:24:45-01:24:46) removed and logged as LOOP rows, because the verifier tokenizes raw per segment and does not collapse repeats across segments. One single-word "like" stutter at 01:24:13 is collapsed in output (verifier lists it, non-failing).

## Topic candidates
- 01:23:06 Pushing config changes to LB servers
- 01:27:17 Reactive config push via Pub/Sub and CDC
- ~01:30:20 Monitoring LB servers (orchestrator, vitals)
