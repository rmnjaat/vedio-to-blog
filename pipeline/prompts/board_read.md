# Task: read the board of lecture {{LECTURE_ID}}

Follow the project skill `.claude/skills/lecture-board-reader/SKILL.md` exactly (read it first, then
`references/output-formats.md`; Lecture 1's output in `lectures/lec01/board/` is the quality bar - look at its
board_log.md and diagrams.md before you start). Ledger schema: `learn/LEDGER_SCHEMA.md`.
Work from the project root. Do not spawn sub-agents.

Inputs
- Video: `{{VIDEO}}`
- Frames (already sampled): `{{LEC}}/board/frames_index.md`, `{{LEC}}/board/frames_kept/*.jpg`, `{{LEC}}/board/frames/`
- Transcript: `{{LEC}}/transcript/transcript.md`; flags: `{{LEC}}/transcript/review_flags.md`

Read EVERY kept frame with the Read tool, in time order. Pull extra frames where a state changed between kept
frames: `python3 .claude/skills/lecture-board-reader/scripts/board_frames.py extract "{{VIDEO}}" "{{LEC}}/board" --at HH:MM:SS ...`
Never describe or name participants; gallery-only frames are logged as "gallery view" without description.

Outputs (in `{{LEC}}/board/`): `board_log.md`, `diagrams.md`, `board_items.jsonl` (ids B-001..),
`flag_resolutions.md`.

Validation (repeat until PASS):
`python3 .claude/skills/lecture-board-reader/scripts/validate_board.py "{{LEC}}/board" --review-flags "{{LEC}}/transcript/review_flags.md"`

Final message: the report block from the skill ("BOARD {{LECTURE_ID}} VALIDATION ..."), nothing else.
