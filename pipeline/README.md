# Lecture pipeline

One command turns a class recording into a checked knowledge base: corrected transcript, board log, knowledge
ledger, two-pass fact-check and teaching map. Page stages (lesson, animate, page, qa) plug in later.

Every judgement step is a Claude Code headless call (`claude -p`) on your subscription, driven by a prompt file
in `pipeline/prompts/` and a project skill in `.claude/skills/`. There are no API keys and no direct API calls.
Every LLM step is followed by a validation script, and the pipeline stops if one fails.

## Run it

```bash
pipeline/run.sh vedio/new-class.mp4          # new video: registered in lectures.tsv as the next lecNN, all stages run
pipeline/run.sh lec03                        # a known lecture: runs every stage that isn't done yet
pipeline/run.sh lec03 --from ledger          # rerun ledger and every later stage
pipeline/run.sh lec03 --only board           # rerun just one stage
pipeline/run.sh --all                        # every lecture in lectures.tsv, one after another
pipeline/run.sh lec03 --dry-run --only correct   # print the claude calls instead of making them (machine steps still run)
pipeline/run.sh lec01 --smoke                # one tiny real claude -p call through the wrapper
```
Lecture 1 was built by hand. `pipeline/migrate_lec01.sh` copies its artifacts into `lectures/lec01/` and marks
those stages done. It copies and never moves, so the old paths keep working.

## Stages

| Stage | Kind | What it does | Gate (must pass) |
|---|---|---|---|
| ingest | script | 16 kHz audio (`audio/<id>.wav`); board frames every 15 s, split into board states, plus 3 s dense passes to catch short-lived states (`board_frames.py`) | files exist |
| asr | script | `asr_parallel.sh -a 1 -d 0 <id>`: language check, then mlx-whisper | `out/<id>/<id>.segments.json`; stops if the lecture is Hindi-heavy |
| diarize | script | `asr_parallel.sh -a 0 -d 1 <id>`: sherpa-onnx | `out/<id>/<id>.diar.json` |
| merge | script | `merge_speakers.py` | `<id>.merged.json`, copied to `lectures/<id>/asr/` |
| correct | script + Claude | prepare and scans; **decide** (term decisions and speaker map, 1 call); **chunks** (~16 calls, 4 at a time); **assemble** (reconcile notes, headings, header, flags, project term merge; 1 call, under a lock) | `verify_content.py --chunk` per chunk; full `--strict` verify (≥98% retention, ≤2% additions); no TODO or topic-candidate left |
| board | Claude | reads every kept frame with vision: board_log, diagrams (D-xx), board items (B-xxx), flag resolutions | `validate_board.py` |
| ledger | script + Claude | split into 3 parts at `##` headings; **3 analysts** in parallel; **3 gap hunters** in parallel (5-minute windows, distortions, duplicates); `merge_gaps.py`; **editor** | `validate_ledger.py part / gaps / final` (every original K/G/B id maps to an L id) |
| factcheck | script + Claude | `make_groups.py` (3 topic groups); **3 checkers** in parallel (web); **independent verifier**; `apply_policy.py` | `validate_factcheck.py checker / verifier / final` |
| teachmap | Claude | teaching map | `validate_teaching_map.py` |
| lesson, animate, page, qa | hooks | not built yet. Add `pipeline/stages/<stage>.sh`, then move the name into `STAGES` in run.sh | the stage's own validator |

Board runs after correct because it resolves the transcript's review flags. The ledger editor needs the board
items, so board runs before ledger.

## Where outputs go

```
out/<id>/                     machine ASR workspace (shared with asr_parallel.sh / asr_sequential.sh)
lectures/<id>/
  asr/                        merged.json / merged.txt, lang.json
  transcript/                 transcript.md, corrections_log.md, review_flags.md, verification_report.md
  transcript/work/            segments.jsonl, scans, term_decisions.md, chunks/ (raw, corrected, log, notes, verify)
  board/                      frames/, frames_kept/, frames_index.md, board_log.md, diagrams.md, board_items.jsonl, flag_resolutions.md
  ledger/                     parts.json, part1-3.jsonl, part*_notes.md, gaps_part*.jsonl, gap_report*.md, gaps.jsonl,
                              ledger.jsonl, id_map.json, ledger_changes.md
  factcheck/                  groups.json, <group>.jsonl / _additions.jsonl / _report.md, additions_verified.jsonl,
                              verdict_review.md, verdict_overrides.jsonl, final.jsonl, policy_summary.md
  teaching_map.md
  lesson/  qa/                page stages (later)
  logs/                       run.log, calls.tsv, per call: <name>.prompt.md, .aN.json (raw CLI output), .aN.stderr,
                              .aN.validate.txt, .result.md (the agent's report), <step>.jobs.json; validate.<gate>.txt
  .done/                      sentinels: <stage> and <stage>.<step> (e.g. correct.chunk_07, ledger.analyst2)
```
`transcripts/term_decisions.md` stays project-wide. Each lecture's assemble step merges its new terms into it.

## Resuming

Each stage writes `lectures/<id>/.done/<stage>` when it finishes. Each LLM call writes its own sub-sentinel once
its validation passes. Rerunning the same command skips everything with a sentinel. After a crash, a usage limit
or a failed gate, run the same command again and it picks up at the first unfinished call. If 3 of 16 chunks are
done, only the other 13 run.
- `--from STAGE` and `--only STAGE` delete the sentinels of the stages they rerun. The agents then fix or
  overwrite the outputs already there.
- To redo a single call, delete its sub-sentinel, e.g. `rm lectures/lec03/.done/correct.chunk_07`.
- Machine stages are idempotent. They skip when the output exists, and they use the same `mkdir` locks as
  `asr_parallel.sh`. If `asr_sequential.sh` is working on the same lecture, run.sh waits for its output instead
  of starting a second copy. After a crash, remove a stale lock (`out/<id>/.asr.lock`, `.diar.lock`,
  `.audio.lock`) only if no process is using it (`pgrep -fl "transcribe|diarize"`).
- Note: `asr_parallel.sh` waits for *any* running diarization to finish before it exits. While
  asr_sequential.sh is diarizing another lecture, run.sh's asr/diarize stage can sit in that wait.

## Calls, retries and rate limits

`pipeline/lib/claude_call.py` makes every call:
```
claude -p --output-format json --permission-mode acceptEdits --permission-prompts none \
  --allowedTools Read Write Edit Glob Grep Skill TodoWrite "Bash(python3 *)" "Bash(ls *)" ... [WebFetch WebSearch | "Bash(ffmpeg *)"] \
  --disallowedTools Agent Task --add-dir <root> --model $PIPE_MODEL --max-turns $PIPE_MAX_TURNS [--effort $PIPE_EFFORT]
```
- The prompt goes in on stdin. The working directory is the project root, so the project skills resolve. The
  tool list is an allow-list: anything else is denied, never prompted. Calls cannot spawn sub-agents.
- **Success** means the CLI exited 0 with `is_error: false`, every expected output exists and is non-empty, and
  the step's validator exits 0.
- **Retry once.** On any other failure the call runs a second time. The failure reason and the validator output
  are appended to the prompt: "fix the existing outputs, do not start over". If the second attempt also fails,
  the stage stops.
- **Usage and rate limits** (429, "usage limit", "overloaded", "resets ...") never count as a failure. The call
  waits `PIPE_RL_WAIT` seconds (default 900) and tries the same attempt again, for up to `PIPE_RL_MAX` seconds
  (default 6 h). If the limit lasts longer, the stage stops and a rerun resumes it.
- **Concurrency is bounded.** Chunks run `PIPE_CORRECT_PARALLEL` at a time (default 4). Analysts, gap hunters
  and checkers run `PIPE_PARALLEL` at a time (default 3). Lower these to spend the subscription's usage more
  slowly. `--all` processes lectures one after another.
- `PIPE_MODEL` defaults to `opus`. Don't lower it for the judgement stages: quality must not drop for quantity.

## Quality gates encoded (from Lecture 1)

- Transcript: the chunk verifier uses exact segment ownership (`--chunk`, from chunks/index.json). The whole
  lecture must pass a strict verify. The skill's hard rules forbid paraphrase, translation and silent guessing.
- Board: every kept frame is accounted for, text is verbatim, participants are never recorded, and flags are
  only "resolved" with exact evidence.
- Ledger: verbatims are found word for word in the transcript, sources are exact, low confidence always carries
  a flag, and every original id (parts, gaps, board) maps to a final L id. Merges are logged and keep their nuance.
- Fact-check: every source is opened, two independent passes run, the verifier re-opens every source and
  reviews every wrong, outdated, medium and high verdict, and the policy keeps the teacher's point.
- Teaching map: the skeleton covers the whole lecture without gaps, every Q&A item is redistributed, and every
  time and ledger id is valid.

## Files

`run.sh` (orchestrator), `lib/claude_call.py` (call wrapper), `prompts/*.md` (one per stage and role, `{{VARS}}`
filled in by run.sh), `migrate_lec01.sh`, `asr_parallel.sh` / `asr_sequential.sh` (machine ASR), `lectures.tsv`
(id to video). Skills: `hinglish-transcript-correction`, `lecture-board-reader`, `lecture-ledger`,
`lecture-factcheck`, `lecture-teaching-map`.
