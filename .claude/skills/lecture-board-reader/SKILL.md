---
name: lecture-board-reader
description: Read every board/whiteboard state of a recorded lecture video frame by frame with vision - log the text verbatim, describe each diagram's structure, turn board content into ledger items (B-xxx), list diagrams for the illustrator (D-xx), and resolve transcript review flags using what was written. Use for "read the board", "board log", "extract whiteboard/diagrams" for lectures/<id>/.
---

# Lecture board reader

The board carries what the audio garbles: exact terms, numbers, diagram structure, headings. Your job is a complete,
literal record of every board state, plus what it means for the ledger and the transcript flags. You record; you
do not interpret beyond what is written or drawn.

`SK` = `<project>/.claude/skills/lecture-board-reader`. `LEC` = `<project>/lectures/<id>`. Quote paths.

## Hard rules

1. **Every kept frame is accounted for** in board_log.md - new content, re-shown content, or "no new content"
   (pan/zoom/gallery view). The validator fails on any kept frame you do not cite.
2. **Text is verbatim.** Copy text in backticks exactly as written, including the teacher's spelling, case,
   arrows and symbols. `[sic]` for a clear slip of the pen (give the intended word after it), `[illegible]`,
   `[cut off]` for text running off the page or behind tiles. Never silently fix spelling. Never guess a word:
   if two readings are possible, give both and say which the audio supports.
3. **Diagrams are structure, not vibes.** Shapes (rectangle = server/service, cylinder = DB/datastore,
   horizontal pipe = queue/stream/broker, stick figure = user/client, cloud = CDN/internet), every label, every
   arrow with direction and label, relative positions, colours that carry meaning. Leave out temporary strokes
   (red highlighter scribbles, laser-pointer marks) except as "emphasis at HH:MM:SS".
4. **Never record participants.** No names, faces, tile contents, chat names. Frames that only show the meeting
   gallery are logged as "gallery view, not kept for publication" with no description of people.
5. **Board items are faithful ledger items** (schema `<project>/learn/LEDGER_SCHEMA.md`), ids `B-001`..,
   `speaker: teacher`, `source.audio: []` unless you checked the transcript time, `source.board: ["HH:MM:SS"]`
   (every time it is on screen with new content), `verbatim` = the board text (<= 25 words; cut with `...`).
   One item per atomic thing written (a heading alone is an item only if it states something, e.g. an agenda).
6. **Flag resolution is evidence-based.** "Resolved" = the board shows the exact term at or right next to the
   flagged moment. "Supported" = the board shows the term in the same lecture/context, not at that moment.
   Anything weaker is not listed. The transcript is NOT edited.

## Process

1. Frames are prepared by the pipeline (`board_frames.py sample`): `LEC/board/frames/` (every 15 s),
   `LEC/board/frames_kept/b_HHMMSS.jpg` (one per board state + short-lived states from 3 s dense passes),
   `LEC/board/frames_index.md` (state list with first/last time). Read `frames_index.md` first.
2. Read EVERY kept frame with the Read tool (vision), in time order. Where a state looks like it changed between
   two kept frames (a line half-drawn, a list jumping from 2 to 4 items), pull extra frames:
   `python3 "$SK/scripts/board_frames.py" extract "<video>" "LEC/board" --at HH:MM:SS ...` and read them too.
   For a diagram that is built up over time, read its first and final frames and any frame where a part appears.
3. Write `board_log.md` as you go (one `## Snn` entry per board state; format `references/output-formats.md`).
4. Cross-check the transcript (`LEC/transcript/transcript.md`) around each state: what the teacher said while
   writing tells you which audio item a board line belongs to and whether a garbled word matches the board.
5. Write `diagrams.md` (final drawn form of each diagram D-01.., best frame, first time, structure), then
   `board_items.jsonl`, then `flag_resolutions.md` against `LEC/transcript/review_flags.md` (go through EVERY
   TERM?/UNCLEAR/CHECK flag and ask: does the board show this?). Add "Related notes (not flags)" for board text
   that contradicts or adds to the transcript.
6. Validate until PASS: `python3 "$SK/scripts/validate_board.py" "LEC/board" --review-flags
   "LEC/transcript/review_flags.md"`.

## Report format (last message)

```
BOARD <id>  VALIDATION <PASS|FAIL> (<validator summary line>)
states logged: <n> (kept frames <n>, extra frames pulled <n>)   diagrams: <n>   board items: <n>
flags: resolved <n>, supported <n> (of <n> reviewed)   notes: <n>
doubts: <illegible/cut-off text worth a human look, or "none">
```
