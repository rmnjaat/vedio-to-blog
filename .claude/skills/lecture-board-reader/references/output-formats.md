# Board output formats (match Lecture 1: `lectures/lec01/board/`)

## board_log.md
```
# Lecture NN - Board log

Source video: `vedio/<file>.mp4` (<w>x<h>, <duration>). Frames sampled every 15 s (...), segmented where the
board region changed by >300 px in a 108x70 grayscale thumbnail, last frame of each segment kept in
`frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states.

Conventions
- Text in `code` is copied as written ... `[sic]`, `[illegible]`, `[cut off]`.
- Colours: <board background; ink colours and what each is used for>.
- <page model: one scrolling canvas / slides / pages>.
- Participant names/faces are deliberately not recorded.

---

## S01 - 00:00:00-00:05:30 - <Title> (b_000530.jpg)
Topic: <what the state is about>.
Text: `...` / `...`  (or a bullet list mirroring the board's own list structure and indentation)
Diagram (D-01, first form): <structure>.
Change: <new page | item added | scrolled | re-shows S04, no new content>.
```
Every kept frame appears in at least one entry, either as the entry's frame or in a list like
`(b_020300.jpg, b_020330.jpg, ...)` for a run of frames of the same state.

## diagrams.md
```
# Lecture NN - Diagrams (final drawn form)
For the illustrator. <colour and shape conventions>.

## D-01 - <title> (HH:MM:SS-HH:MM:SS)
Frame: b_003030.jpg (also b_001615.jpg)
- <element-by-element structure: shapes, labels in backticks, arrows with direction and labels, positions>
- Emphasis (HH:MM:SS): <what was circled/highlighted and what it shows>
```

## board_items.jsonl
Ledger schema items, ids `B-001`..: e.g.
`{"id": "B-001", "type": "admin_reference", "statement": "Lecture 1 agenda: ...", "detail": "Likely also in audio around 00:05:33.", "topic": "course > agenda", "case_study": null, "source": {"audio": [], "board": ["00:05:45"]}, "speaker": "teacher", "status": "endorsed", "verbatim": "Agenda - Caching at different levels - Scaling ...", "depends_on": [], "confidence": "high", "flags": [], "importance": "supporting"}`

## flag_resolutions.md
```
# Lecture NN - Review flags the board resolves
Source: `transcript/review_flags.md` (<n> flags). The transcript was NOT edited.
"Resolved" = ... "Supported" = ... Flags not listed get no help from the board.

## Resolved (<n>)
| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F010 | 00:11:16 | [?inconsistent / asr: "consistent"] | Item 1 sub-point `↳ inconsistency` written during this exchange | b_001615.jpg |

## Supported (<n>)
(same table)

## Related notes (not flags)
- <board text that contradicts / refines the audio; things to check>
```
