# chunk_04 notes (lec08, 00:35:32-00:46:19)

## New technical terms / names (not in term_decisions)

- 00:45:24 "flask server springboard server" -> Flask, Spring Boot (corrected, TERM high; Spring Boot already in lec05 names). Suggest adding a lec08 row.
- 00:41:05 "normal go line to build one" -> flagged `[?Golang | asr: "go line"]` (teacher later does the Go LB code walkthrough ~00:42-01:08; strong guess, lead may promote to TERM).
- 00:41:54 / 00:42:01 / 00:42:08 / 00:42:13 "Nginx", "HAProxy" - kept as ASR wrote (lec08 NGINX rule: no casing churn). Note casing differs from 00:02:18 "NGINX"; lead to pick one spelling at assembly.
- 00:37:47 "BigQuery's Redshift documentation" kept as spoken.
- 00:38:08 student name "Rajiv" (teacher's call "I'll take one more Rajiv.") -> next turn labelled `Student 2 (Rajiv)`. term_decisions lists "Rajeev (03:23:24)"; spelling of the same/different person [check].

## Flags placed (lead may decide)

- 00:37:32 "three source you'd have far too many" -> `[?servers | asr: "source"]`.
- 00:37:51 "least connection-based balancing across structures" -> `[?clusters | asr: "structures"]`.
- 00:38:03 "to pick the best packet" - kept unflagged (could be "bucket"/"backend"; no evidence).
- 00:38:28 "load the answer", 00:38:45 "load presenter" -> `[?load balancer | ...]` (term_decisions open questions).
- 00:38:54 "you have to enter that it goes to that same machine" -> `[?ensure | asr: "enter"]`.
- 00:39:10 "a synchronous processing" -> `[?asynchronous | asr: "a synchronous"]` (meaning flips; lec02 rule).
- 00:39:29 "two links" -> `[?toolings | asr: "two links"]` (term_decisions rule).
- 00:42:12 "trade-way load balancer" -> `[unclear: "trade-way"]` (toy? tiny?).
- 00:44:31 "Now this added is a normal ... TCP server" -> `[unclear: "this added"]`.
- 00:39:44 "the connection has gone on" kept as spoken (maybe "gone off").

## Speaker doubts

- 00:37:21: diarization boundary - "third place" kept with Student 3, teacher turn starts "Why would you want..." `[~00:37:21]` (SPLIT, medium).
- 00:37:25 "yeah yeah right" inside teacher segment could be a student back-channel; left in teacher text.
- 00:39:46 "Yes, yes." kept as Student 2 (STUDENT_2 label; affirmation after teacher's "You know that."). Speaker map's 00:39:39-00:39:46 teacher-leak range may include it - lead to confirm.
- 00:38:06 "Thanks." STUDENT_14 -> `Student?` (one-word back-channel, per map).
- 00:46:01 STUDENT_5 segment relabelled Teacher (sentence continues from 00:45:54).

## Verifier

PASS (retention 98.89%, additions 0.95%). Three 1-word "dropped" items (00:39:33 `okay`, 00:39:52 `that`, 00:45:14 `server`) are alignment artifacts: those words are present in the corrected text at those times.

## Hallucination candidates in range

#634, #662, #663, #682, #685, #717 (PHRASE "Okay."/"Thanks.") - real back-channel, all kept. No removals.
