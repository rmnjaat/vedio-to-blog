# chunk_05 notes (lec08, 00:46:19-00:58:12)

## New technical terms / names (not in term_decisions)

- 00:51:40, 00:51:51, 00:52:01 "TCP collection" -> TCP connection (TERM high). New ASR form; suggest adding "collection" to the lec08 connection row (next to "correction").
- 00:52:49 "Load-by-lifter" -> Load balancer (TERM high). New ASR form for the load balancer row.
- 00:53:58 "TCP to" -> "TCP 2" (WORD high; connection numbering TCP 1 / TCP 2).
- 00:57:46-00:57:53 GitHub outage aside kept (structure note). "1.5." 00:58:06 and "LB.go." 00:58:07 kept as ASR wrote (file names on screen?).

## Flags placed (lead may decide)

- 00:46:55 "list for YYM" -> `[unclear: "YYM"]` (term_decisions open question).
- 00:46:57 "We call you a hash map." -> `[unclear: "We call you"] a hash map` (maybe "or call it"?).
- 00:47:34 "someone wants to collect" -> `[?connect | asr: "collect"]`.
- 00:51:31 "how simple it is to build by" -> `[unclear: "by"]` (build LB? build it?).
- 00:51:35 "what is uptake is" -> `[unclear: "uptake"]` (the takeaway?).
- 00:52:01 "you have to form whenever" -> `[?forward | asr: "form"]`.
- 00:53:45 "from this t-tick-tick packets" -> `[unclear: "t-tick-tick"]` (TCP packets?).
- 00:55:47 "three process listing on 8081" -> `[?listening | asr: "listing"]` (same form at 00:58:57 "LV server listing on port 9090" in chunk_06 - lead may promote to WORD for consistency).
- 00:57:37 "Dabbe dabbe, everyone can wait." -> `[unclear: "Dabbe dabbe"]`.
- 00:57:41 "And again, Kyle won't share." -> `[unclear: "Kyle won't share"]` (screen-share aside?).
- Kept unflagged as spoken: "10.0.0.7 colon 10.0.0.8.8081" (00:47:02), "10.001" / "port 9000 on 1000 on 10001" (00:47:49-00:48:24), "10 007 colon 80 at port 8081" (00:49:41), "8081, 802, 8083" (00:56:00), "pick all from all the lines of" (00:49:23), "you need to wait to horizontally scale" (00:55:18), "fire request or slash index.html" (00:47:45). 00:49:02 "Running on port 8081 that understands HTTP specifications." reads like a fragment after "So what would you do?" - no gap in gaps.md, no [missing] added.

## Speaker doubts

none - all owned segments are TEACHER, single monologue.

## Hallucination candidates in range

#766, #958, #977, #982 "Okay." (PHRASE) - real teacher back-channel/transition, kept. #952 00:57:08 REPEAT-SEG(#951) - not a duplicate ("from other TCP" vs "from this one TCP"; teacher contrasting the two directions), kept, no flag. No removals.

## Topic candidates

- 00:57:23 Load balancer code walkthrough ("Let me show you code very briefly").

## Verifier

PASS (retention 99.47%, additions 0.48%). One 1-word drop `then` 00:55:47 = single-word stutter "Then / Then because" across segments (clean verbatim).

## Per-chunk checklist

- [x] Only OWNED segments emitted; no CTX content.
- [x] Every paragraph starts with a raw segment timestamp.
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides (GitHub outage), repetitions kept.
- [x] No bold/italics on speech; no bullets from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] No hallucinations removed.
- [x] verify_content.py --strict = PASS.
- [x] New terms / open questions written here.
