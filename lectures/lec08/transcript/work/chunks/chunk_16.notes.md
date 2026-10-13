# chunk_16 notes (lec08, 02:58:14-03:10:25)

## New technical terms / names not in term_decisions

- `ccp connection` 03:01:59 -> corrected to "TCP connection" (TERM medium, log 09). Not in term_decisions; lead may add "ccp -> TCP" to the TCP row.
- `red ace` 03:00:32 -> corrected to "Redis" (TERM high, log 03). Lead may add "red ace" to the lec08 Redis row.
- `poor properties` 03:02:36 -> "core properties" (WORD high, log 10).
- Flagged, not corrected (open questions):
  - `[?load balancer | asr: "load balance of"]` 02:59:51 (Student 3: "on the load balance of thing")
  - `[?load balancer | asr: "node balancer"]` 03:01:18 ("what we talked about around uh in node balancer itself")
  - `[?use | asr: "are you"]` 03:01:06 ("if i just say are you zookeeper") and `[?use | asr: "you"]` 03:02:44 ("So you zookeeper if you are more comfortable")
  - `[?Redis | asr: "release"]` 03:03:19 ("They're very comfortable with release.") - context is ZooKeeper vs Redis, but "release" is a real word, so I flagged it per the Redis rule
  - `[unclear: "Java bomb"]` 03:03:06 ("They think zookeeper is Java bomb.") - maybe "Java-born"/"Java-heavy"?
  - `[unclear: "extracting by buildings"]` 03:02:19
  - `[unclear: "the kind of parent is it covers"]` 03:04:45
  - `[?machine | asr: "mission"]`, `[?cores | asr: "course"]` 03:04:49 (as term_decisions says)
  - `[?real time | asr: "L time"]` 03:05:07 (student said "In real time" at 03:04:25)
  - `[unclear: "Tell your learners"]` + `[?throughput | asr: "to put out"]` 03:05:21 ("wait till week seven ... we'll implement our own message broker. Tell your learners and how we get max to put out.")
  - `[unclear: "not load answer"]` 03:08:02 (student; cf. open question "load answer" 00:38:28)
- Kept as spoken: "Orchester is the one" 03:08:31 (same rule as "orchestra"), "Sidesh" (name spelling [check] already open), "Sunit" 03:04:05, "you win some you will" 02:59:37, "8 45" 02:59:06.

## Speaker doubts

- 02:58:36 STUDENT_5 "180 repos on GitHub" relabelled Teacher; kept both "80 repos"/"180 repos" with [check].
- 03:00:18 "Who wrote ZooKeeper?" at the end of Student 3's segment may be the teacher starting the answer ("How is ZooKeeper implemented?"). Kept with Student 3 + [check].
- 03:00:32 split: "but I mean the guarantees are different, right, like for example" moved to Student 3 (SPLIT, medium).
- 03:03:24 "I see." under TEACHER in the middle of the answer may be Student 3. Left in place + [check].
- 03:04:04 "Thanks." (STUDENT_1) is probably Student 3 thanking -> `Student?`. 03:04:05 "Okay. Sunit." -> Teacher.
- 03:04:20 "We did." (STUDENT_1) -> Teacher (medium).
- 03:05:28-03:05:37 "which queue? Message queue. This message queue. Yes. Yes." may be teacher/student back-and-forth. All left with Student 1 + [check].
- 03:06:15-03:06:23: "any other question on locking anyone?" -> `Teacher?` (SPLIT medium); "Okay, go on." -> Teacher.
- 03:06:56 "That's it." and 03:07:03 "No, that's what I said." (STUDENT_1) -> Teacher (medium).
- 03:08:36 "DNS has no brains." (STUDENT_1) may be the teacher (it comes right before "DNS is a stupid service"). Kept + [check].
- The student at 03:06:15 (LB / DNS active-passive questions) is labelled STUDENT_1 but may not be Sunit. No name given.

## For the lead

- REPEAT-SEG #3217/#3219 "That's not what I said." x3 (03:06:43-03:06:45): all kept (teacher's emphatic repetition is plausible), with one [check: possible ASR duplicate].
- REPEAT-SEG #3278 "That's it." 03:09:26 kept (the teacher's tag; it appears twice with different sentences between).
- All PHRASE candidates in range ("thank you", "Okay.", "Thanks.") are real back-channel. Kept.
- The verifier lists 4 single-word "drops" (yes 03:05:37, okay 03:08:34, it 03:09:24, it 03:09:27). These words are in the corrected text ("Yes. Yes.", "Okay. Okay.", "It all runs", "It finds"). The aligner mismatched repeated frequent words. They don't fail the run.
