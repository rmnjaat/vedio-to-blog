# chunk_02 notes (lec04, 00:11:13-00:22:56, segments #167-#364)

## New technical terms / names (not in term_decisions)
- none. (Terms applied: DynamoDB x2 from "dynamo tv", WebSocket x1. Casing only: Facebook, Twitter, Medium-like, CDN, AWS.)

## Open terms applied as decided
- 00:16:55 "DAISY architecture" - kept + `[check: ...]` per term_decisions open question. Lead to decide: very likely "day zero architecture" - the teacher says "extremely simplistic day zero architecture" at 00:17:21 and "start with the day zero architecture" at 00:18:31 in the same explanation (incremental building). If the lead accepts, change to "day zero architecture" + TERM row.

## Flags placed
- 00:14:58 `[?online offline | asr: "on an offline"]` indicator - teacher says "online offline indicator" at 00:13:13 and 00:22:29; "on and offline" is also a real teacher form in lec04, so flagged, not corrected.

## Speaker doubts
- none. Whole chunk is one Teacher turn (TEACHER + STUDENT_1 label split, logged once as SPEAKER row 01). No student speech in range.

## Hallucination candidates in range
- #199, #227, #294, #356, #364 "Okay." - kept (teacher's own transition "Okay.").
- #233 REPEAT-SEG(#232) "Grey dots implies they are offline." - not a duplicate (#232 is "Green dots implies they are online."); kept, no flag.

## Left as spoken (possible ASR issues, no marker - not enough evidence)
- 00:12:33 "most only implemented it" / "All of those are their essays" (maybe "mostly" / "are there in essays").
- 00:13:11 "First is we'll start with the back."
- 00:18:10 "So that's a no brain." ; 00:18:57 "No lines there" (maybe "no hard lines").
- 00:22:09-00:22:14 "and you would exactly that" - segment break, words may be lost (no gap in gaps.md, so no [missing]).

## Verifier
- PASS, retention 99.85%, additions 0.00%. 3 single-word "dropped" items (`this` 00:15:18, `it` 00:18:59, `this` 00:22:44) are alignment artefacts: the words are present in the corrected text ("render this. This is the brief", "look at it. It just gives", "render this, this online offline stuff").

## Per-chunk checklist (references/checklist.md)
- [x] Only OWNED segments emitted; no CTX content.
- [x] Every paragraph / turn starts with a raw segment timestamp.
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, admin talk, repetitions kept.
- [x] No bold/italics on teacher's words (only `*(admin)*` tags); no bullet lists.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] Removed hallucinations logged (none removed).
- [x] verify_content.py --chunk chunk_02 --strict = PASS.
- [x] New terms / open questions written here.
