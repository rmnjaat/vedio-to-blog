| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:22:17 | TERM | go to backhand server. | go to backend server. | "backhand" non-term; teacher says "your backend server crashed" 01:22:02, "backend server" 01:22:45 | high |
| 02 | 01:22:30 | TERM | request to backhand server | request to backend server | same as 01 | high |
| 03 | 01:24:38 | SPEAKER | Student 4 | Teacher | "No, that all, let," (STUDENT_4, #1457-#1459) runs straight into teacher's "let LB server itself, let the orchestrator do that" 01:24:39 - diarization lag; teacher rejecting the extra-service proposal | medium |
| 04 | 01:24:39 | LOOP | let, | (removed) | single-word stutter split across ASR segments (#1459 "let," then #1460 "let LB server itself"); clean verbatim | high |
| 05 | 01:24:40 | LOOP | let, | (removed) | single-word stutter, own segment #1461, before "let the orchestrator" 01:24:41 | high |
| 06 | 01:24:41 | LOOP | let, | (removed) | single-word stutter, own segment #1462, before "let the orchestrator" 01:24:41 | high |
| 07 | 01:24:45 | LOOP | yeah, | (removed) | teacher "Yeah, yeah, yeah" = three one-word segments #1465-#1467; one "Yeah" kept | high |
| 08 | 01:24:45 | LOOP | yeah, | (removed) | same as 07 | high |
| 09 | 01:24:46 | LOOP | yeah, | (removed) | student "yeah, yeah, sure" #1468-#1470 split across segments; one "Yeah" kept | high |
| 10 | 01:25:45 | TERM | hell check through here | health check through here | term_decisions lec08 ("hell check" 01:25:45 -> health check) | high |
| 11 | 01:25:51 | TERM | load financing algorithm | load balancing algorithm | non-phrase; LB algorithms (round robin, least connections) covered earlier; list of LB config changes | high |
| 12 | 01:27:35 | WORD | zero stillness, almost zero stillness | zero staleness, almost zero staleness | previous sentence "operating on the stale data" 01:27:33 | high |
| 13 | 01:27:45 | TERM | uh slacks real-time | Slack's real-time | term_decisions lec08 (Slack's, 01:27:45); "uh" pause filler dropped | high |
| 14 | 01:27:59 | TERM | real-time pub sub and | real-time Pub/Sub and | term_decisions lec08 Pub/Sub row (01:27:59) | high |
| 15 | 01:28:12 | TERM | real-time pub sub like redis | real-time Pub/Sub like Redis | same as 14; Redis casing | high |
| 16 | 01:29:11 | WORD | in fifth way. | in fifth week. | same promise "we'll talk about cdc in depth in fifth week" 01:28:18-01:28:24 | high |
| 17 | 01:29:18 | WORD | push base thing | push-based thing | "push-based mechanism" 01:25:12; contrast "polling based" 01:29:23, "poll based" 01:29:44 | medium |
| 18 | 01:31:39 | TERM | network desk everything | network disk everything | term_decisions lec08 (desk 01:31:39 -> disk; metric list CPU/memory/network) | medium |
| 19 | 01:31:57 | TERM | one LP server | one LB server | term_decisions lec08 (LP -> LB, 01:31:57) | high |
| 20 | 01:32:03 | SPEAKER | Student 1 | Teacher | "Gaurav?" = teacher's name call leaked into STUDENT_1 (speaker map lec08: "Gaurav?" 01:32:03) | high |
| 21 | 01:32:07 | TERM | between DB and LP | between DB and LB | term_decisions LP -> LB; "communication between DB and LB" = config DB to LB server discussed 01:21-01:30 | high |
| 22 | 01:32:17 | TERM | help checks | health checks | "status and help checks ... between orchestrator and" = orchestrator health checks discussed 01:23:25-01:24:13 | medium |
