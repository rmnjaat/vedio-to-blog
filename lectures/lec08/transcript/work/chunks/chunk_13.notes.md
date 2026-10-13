# chunk_13 notes (lec08, 02:19:41-02:32:14, #2380-#2588)

## New technical terms / names (not in term_decisions)
- "Q7" (02:20:23, 02:24:06): name of the resource/queue key being locked ("set for my Q7", "Q7 against which is stored Consumer 1"). Kept as ASR wrote it; the lec08 "Q -> queue" rule was NOT applied (it reads as a key name, not as the spoken word "queue"). Lead: confirm.
- "eval" / "Lua script" (02:26:31-02:26:50): Redis EVAL + Lua, correct as heard; only casing changed ("lua" -> "Lua").
- "consumer to" -> "consumer two" (02:25:48, 02:26:08, logged WORD medium); 02:26:03 "between this consumer to acquire the lock" flagged `[?consumer two | asr: "consumer to"]` (could be the infinitive).
- "each case(s)" -> edge case(s): 02:32:00 "each cases" corrected (TERM medium); 02:31:49 "in each case is there" flagged `[?an edge case | asr: "in each case"]`. Suggest adding "each case(s) -> edge case(s)" to the lec08 edge-case row.

## Flags placed (do not guess)
- 02:21:36 "infinite value" -> `[?loop]` (same family as open questions "infinite clue" 02:36:57 / "infinite tube" 02:49:10).
- 02:22:22 "continue in this volume" -> `[?while loop]`.
- 02:27:47 "I'll have a lot." and 02:31:02 "not able to get a lot" -> `[?lock]` ("lot" is a real word; lock context).
- 02:28:08 "Who would take care of it subtype?" -> `[unclear: "subtype"]`.
- 02:29:30 "no multi master application" -> `[?replication]` (multi-master hyphenated per decisions).
- 02:30:25 "contained for it", 02:31:02 "content for it" -> `[?contend]`.

## Left as spoken (possible ASR issues, no marker)
- 02:21:46 "because some keys already sets of consumers already having the lock" and 02:21:49 "V is equal to zero else continues." (code read aloud, garbled). Lead may want `[unclear]` after listening.
- 02:28:34 "you have to take care of offline"; 02:30:00 "I'm not like three, four or five nodes"; 02:30:43 "Most of things are are building it, Chubby great example".

## Speaker doubts
- none. Every owned segment is TEACHER, all monologue, no student turns.

## Hallucination candidates in range
- #2444 RATE 02:23:36 "Then what's the use of that?" (short, fits context): kept. #2522 "Okay." 02:27:51: real back-channel, kept. No removals.

## Verifier
- PASS. 4 single-word "drops" (02:27:17 this, 02:28:50 this, 02:30:07 here, 02:30:43 are) all sit at adjacent repeated words ("on this. This way", "over here, here, here", "are are"). The words are present in the corrected text.

## Per-chunk checklist (references/checklist.md)
- [x] Only owned segments emitted; no CTX content.
- [x] Every paragraph starts with a raw segment timestamp.
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("I've seen it. I've used it."), repetitions kept.
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged, Original copied from raw.
- [x] No hallucinations removed (none needed).
- [x] verify_content.py --strict = PASS.
- [x] New terms / open questions written here.
