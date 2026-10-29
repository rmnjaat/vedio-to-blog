# 03 · The pipeline (video → checked knowledge → site)

Full reference: `pipeline/README.md`. This is the summary plus what was learned running it.

## Run

```bash
pipeline/run.sh vedio/new-class.mp4     # new video → next lecNN, all stages
pipeline/run.sh lec03                   # resume every stage not done
pipeline/run.sh lec03 --from ledger     # rerun from a stage
pipeline/run.sh lec03 --only board      # one stage
pipeline/run_pool.sh -n 3 lec02 lec06…  # several lectures in parallel (counts '^/bin/bash ./pipeline/run.sh lec')
python3 pipeline/status.py              # status dashboard (also learn/status/index.html)
```

## Stages (each followed by a validation gate; the pipeline stops if one fails)

`ingest → asr → diarize → merge → correct → board → ledger → factcheck → teachmap → lesson → animate → page → qa`

- **asr/diarize**: mlx-whisper turbo + sherpa-onnx, local.
- **correct**: Hinglish transcript correction (skill `hinglish-transcript-correction`), verified ≥98% retention,
  ≤2% additions; unclear spots flagged.
- **board**: vision read of every kept board frame → board log, diagrams, board items (skill `lecture-board-reader`).
- **ledger**: 3 analysts + 3 gap hunters + editor → `ledger.jsonl`, one item per atomic thing taught, stable `L-xxxx` ids.
- **factcheck**: 3 topic checkers (web) + independent verifier → `factcheck/final.jsonl`.
- **teachmap**: how the class taught it (hooks, war stories, numbers).
- **lesson / animate / page**: lesson design, Remotion clips, section writers + assembler.
- **qa**: examiner (questions from transcript + board), faithfulness audit, design critic, blind reader + grader,
  content/design/animation fixers, round 2, plus an **automatic second fix round** (`prompts/fix_followup.md`,
  sentinel `qa.followup`). Pass = `lectures/<id>/qa/PASS`.

Each LLM call: `pipeline/lib/claude_call.py` (`claude -p` wrapper, waits/retries on rate limits about every 15 min,
takes `pipeline/.locks/site-shared` for shared-site edits; detects a dead lock holder by pid and takes over).
Sentinels in `lectures/<id>/.done/`; logs in `lectures/<id>/logs/` (`calls.tsv`).

## Ops tools

- `pipeline/bin/site.sh build|links|figures|qa|posters|gates|text <id>`: isolated lecture builds under `/tmp/vtb-heavy.lock`.
- `pipeline/bin/publish.sh`: for each lecture with `qa/PASS` and `status: draft` → publish, commit, clean-worktree
  build + link check, push. `publish_watch.sh` runs it when a new PASS appears.
- `pipeline/bin/watchdog.sh`: exits (waking Claude) on a new rate-limit/error row, a new PASS, a run count drop,
  a dead lock owner, or a `claude -p` call older than 6000 s.

## Lessons learned (costly ones)

- Never `pkill` broad patterns: it killed two lectures' QA runs. Kill exact process trees only.
- A killed lock holder left a stale `site-shared` lock that blocked runs ~2 h → claude_call now takes over dead-owner locks.
- A watchdog false alarm ("old lock") stopped monitoring for ~4 h → alarms are now dead-owner/error/long-call based.
- Network drops hang calls for hours; restart only the stuck run.
- Restarting a run right after a step finished but before its sentinel was written made it redo/wait; write the
  sentinel by hand when the output is verified.
- The first commit staged 14k QA PNGs → `.gitignore` now excludes QA images, logs, `.done/`, lab renders, story shots.
- Figure gate: labels that pass at 390/1440 can fail at 360/768; long inline code causes phone horizontal scroll → use code blocks.

## First-version results (2026-10-15, archive style)

All 10 lectures passed QA. Blind exam: L1 98.3%, L3 99.3%, L4 100%, L5 97.6%, L6 100%, L7 100%, L8 99.3%, L9 98.3%,
L10 100% (L2 was the hand-built pilot). These pages were later replaced by the story versions (see 05).
