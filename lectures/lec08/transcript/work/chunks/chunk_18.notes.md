# chunk_18 notes (lec08, 03:22:43-03:36:36)

## New technical terms / names not in term_decisions

- `go lang based` 03:23:41 -> "Golang based" (TERM high, log 05). Lead may add "go lang" to a Golang row.
- `Pometheus` 03:26:57 -> "Prometheus" (TERM high, log 12). Add to the Prometheus row.
- `time scale DB` 03:27:30 -> "TimescaleDB" (TERM medium, log 13). New product row; confirm.
- `springboard server` 03:29:16 -> "Spring Boot server" (TERM high, log 19). Add to names row.
- `online offer indicator` 03:31:53 -> "online offline indicator" (WORD high, log 29) - lec04 topic. Lead may want the lec04 spelling ("online/offline indicator") instead.
- `separate company` 03:33:22 -> "separate component" (WORD medium, log 39).
- `auto skills orchestrator` 03:34:22 -> "autoscales orchestrator" (WORD medium, log 45).
- `How is less health endpoint` 03:29:22 -> "slash health" (WORD medium, log 21).
- Maglev (03:25:42) kept as ASR wrote it (Google's load-balancer paper). Correct spelling; maybe add it to the names table.
- Flagged, not corrected:
  - `[?let's say | asr: "less of"]` 03:22:45
  - `[unclear: "where I'll be console is there anyways"]`, `[unclear: "mainly lead run"]`, `[?replication | asr: "application"]`, `[unclear: "for system has that"]` 03:24:06-03:24:22 (Student 2, garbled)
  - `[?firing | asr: "finding"]` 03:24:40 ("finding queries"), `[?down | asr: "run"]` 03:24:40 (per term_decisions)
  - `[?generate | asr: "general"]` 03:25:59, `[?fully scalable | asr: "Philly's label"]` 03:26:07
  - `[?InfluxDB | asr: "InplexDB"]` 03:27:22 (per term_decisions open question)
  - `[?down | asr: "done"]` 03:29:14 ("If your server is done")
  - `[unclear: "load. Configuration is specific by"]` 03:29:31
  - `[unclear: "but is for it"]`, `[?success code | asr: "success quota"]` 03:30:00; `[unclear: "It's an open"]` 03:30:06
  - `[?orchestrator | asr: "or consider"]` 03:30:58; `[?orchestrator | asr: "orchestrate"]` 03:31:28
  - `[?know | asr: "No"]` 03:32:01 ("Do your business logic. No IP address of orchestra")
  - `[unclear: "implementation of you"]` 03:33:22; `[unclear: "as you very"]` 03:33:38
  - `[?whys | asr: "vives"]` 03:36:28
- Kept as spoken: "orchestra"/"orchestras responsibility" (term rule), "slash health", "12 36", "Keep asking discussion", "Think about what could go around", "load patterns" 03:26:41, "multi node mode".

## Speaker doubts

- 03:23:28 "no no prometheus yeah" left with Student 2 (Rajeev) + [check]; it may be the teacher starting the answer. "just" split to Teacher (log 03).
- 03:28:10 "Sorry? Have you used load balancer?" (STUDENT_1) -> Teacher (medium). 03:28:25 "Same, same." (STUDENT_1) -> `Teacher?`.
- 03:29:22 STUDENT_5 "How is slash health endpoint send something? No, it is set to receive the request." -> Teacher (medium). The speaker map's default was `Student?`, but the question gets answered in the same turn and follows on from the teacher's "You expose a slash health endpoint".
- 03:31:09 "Got it." under TEACHER may be Student 10. Left in place.
- 03:31:23 "Yeah." inside Student 1's question may be the teacher. Left in place.
- 03:32:17 STUDENT_5 "Yeah. Because you don't know IP address of orchestra." -> Teacher (medium). It could be Student 1 agreeing.
- 03:34:02 "yeah that's true" left inside the teacher turn + [check]. It may be Student 3.
- Student 2 = Rajeev (03:23:28), Student 1 = DK (03:27:46), Student 7 = Rahul (03:28:44), Student 3 = Sitesh (03:32:51). Names are attached only to the turn right after the call.

## For the lead

- Topic candidates: 03:23:28 Prometheus / orchestrator state, ~03:27:46 reverse proxy vs LB, 03:28:44 heartbeat / health check endpoint, 03:32:51 autoscaling vs orchestrator, 03:36:02 closing (admin). chunk_17 already has a "load balancer vs reverse proxy" candidate at 03:21:20; merge ~03:27:46 into it or keep it as a separate Q&A item.
- Hallucination candidates in range (PHRASE "Okay."/"Thanks.", REPEAT-SEG 03:23:08/03:23:12/03:28:28, final "See you tomorrow morning. Bye bye.") are all real speech, so all are kept. No removals.
- Verifier lists single-word drops at 03:25:16 "that", 03:28:28 "there", 03:29:30 "yeah", 03:31:15 "thanks". These words are all in the corrected text. They come from alignment around repeated words, not from lost content.

## Per-chunk checklist

- [x] Only OWNED segments emitted; no CTX content
- [x] Every turn/paragraph timestamped (`[~...]` only at splits)
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added
- [x] Rhetorical questions, jokes, asides, admin, repetitions kept
- [x] No bold/italics on speech; no bullets from speech
- [x] Every guess is a marker
- [x] Every non-trivial change logged with exact Original
- [x] No hallucination removals (none needed)
- [x] verify_content.py --strict = PASS
- [x] New terms / open questions written here
