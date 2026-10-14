# Lecture pipeline

One command turns a class recording into a checked knowledge base (corrected transcript, board log, knowledge
ledger, two-pass fact-check, teaching map) and then into a finished, verified lecture on the course site (lesson
design, animations, pages, review and fixes): the process Lecture 1 was built with by hand, made reusable.

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
| lesson | Claude | **designer** (outline, placement, factcheck_applied, prompts, chapters.json) then **visuals** (figures.md, animations.md, clips.json). An existing complete design (lesson/DONE from `lectures/LESSON_DESIGN_BRIEF.md`, passing its own check_placement.py) is accepted; one short **finish** call adds chapters.json/clips.json. Writes `BUILD_BRIEF.md` | `check_lesson.py` (every id placed or admin-dropped, SourceNote policy, additions, chapters, 3-5 clips) |
| animate | Claude | one **animator** per clip, 2 at a time: storyboard, build in the lab, render-check (wide + phone, light + dark), review, copy into the site | `check_clip.py` (reviewed storyboard, META.phone, fresh sheets, site copy = lab, type-check) |
| page | script + Claude | scaffold (lecture MDX + stub parts); **section writers**, one per writer group, 3 at a time; **assembler** (overview, frontmatter, consistency, posters, QA screenshots) | `check_part.py` per writer (ids tagged, isolated build, coverage); `site.sh gates` (build, coverage of every placed id on its chapter page, links, check-figures 360-1440 light/dark) + Playwright QA with zero failures |
| qa | script + Claude | **examiner** (transcript + board only), **faithfulness auditor**, **design critic** (on fresh screenshots) in parallel; **blind reader** (page text only) + **grader**; **content fixer** → **design fixer** (holds the shared-site lock) → **animation fixer**; rebuild, posters, gates; round 2: blind reader + grader, faithfulness re-check, critic final look | gates pass; exam correct/total ≥ 95% after fixes; every faithfulness issue resolved (no new high/medium); critic final verdict `pass` (no open blocker/high/medium). Writes `qa/REPORT.md`; `qa/PASS` on success, else stops with the report |

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
  BUILD_BRIEF.md              generated per lecture from pipeline/templates/BUILD_BRIEF.md (every page agent reads it)
  lesson/                     outline.md, placement.json, factcheck_applied.md, prompts.md, figures.md, animations.md,
                              chapters.json (pages, parts, writer groups, page meta), clips.json, DONE
  animations/<clip>/          storyboard.yaml / .md, review.md
  qa/                         gates_*.txt, assembly_report.md, assembly_shots/, page_text*.md, exam.json, exam_questions.json,
                              blind_answers*.json, exam_grade*.{json,md}, faithfulness*.{json,md}, critic*.{json,md},
                              critic_shots/, final_shots/, fixes_{content,design,animation}.md, REPORT.md, PASS
site/src/content/lectures/<id>.mdx, <id>/<part>.mdx    the pages (overview + one part file or more per chapter)
site/src/figures/<id>/        the lecture's figures (kit only)
learn/animations-lab/src/clips/<clip>/ -> site/src/animations/clips/<clip>/   clips (auto-discovered, no registry)
site/.builds/<id>[-tag]/      isolated builds (gitignored)
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

## Page stages: how they work

```bash
pipeline/run.sh lec02 --from lesson      # lesson -> animate -> page -> qa (the knowledge base must be complete)
pipeline/run.sh lec05 --only qa          # just the review/fix/re-check loop
```
- **Site and lab work goes only through `pipeline/bin/site.sh` and `pipeline/bin/lab.sh`.** Every heavy step (astro
  build, Playwright, Remotion) takes the machine lock `/tmp/vtb-heavy.lock`, waits for it, always releases it and
  never leaves a server running; renders use concurrency 1. Agents get them through the `site` / `site_web` tool
  presets of `claude_call.py` and cannot run npm/astro/remotion directly. The rule is repeated in BUILD_BRIEF.md and
  every page prompt.
  `site.sh build <id> [--parts a,b --tag T]` (isolated: `VTB_ONLY`/`VTB_PARTS`/`VTB_OUT` → `site/.builds/<id>[-T]`),
  `coverage`, `links`, `figures`, `qa <id> <outdir> [--sweep]` (`lib/page_qa.mjs`), `posters`, `text` (page as reading
  text for the blind reader, `lib/page_text.py`), `gates <id> <file>`, `build-all`.
  `lab.sh tsc|check|mp4|strip|copy|site-check <clip>` (render checks bundle a one-clip entry, so a half-written clip of
  another lecture never breaks yours).
- **Many lectures at once.** Nothing per lecture touches a shared file: pages, figures, clips, storyboards, builds and
  QA live in per-lecture folders; clips are discovered by `import.meta.glob` (site) and `require.context` (lab); nav
  and titles come from `lectures/course.json`. Isolated builds mean another lecture's broken draft never fails yours.
  The only shared edits (components, styles, kit) are made by the design fixer while holding
  `pipeline/.locks/site-shared`, and it must re-run the other lectures' gates afterwards.
- **Concurrency inside a lecture:** animators `PIPE_ANIM_PARALLEL` (2), section writers `PIPE_WRITER_PARALLEL` (3), the
  three reviewers 3 at a time; everything heavy is serialised by the lock anyway.
- **Course order:** `lectures/course.json` positions give the displayed lecture numbers, nav order and prev/next
  lecture links; the lesson designer gets it for cross-references ("Lecture 05"). Without it, ids are used.
- **Resume:** sub-sentinels `lesson.design`, `lesson.visuals`, `lesson.finish`, `animate.<clip>`, `page.writer_<w>`,
  `page.assemble`, `qa.exam`, `qa.faith`, `qa.critic`, `qa.blind1`, `qa.grade1`, `qa.fix_content`, `qa.fix_design`,
  `qa.fix_animation`, `qa.posters`, `qa.blind2`, `qa.faith_verify`, `qa.critic_final`, `qa.grade2`, plus machine steps
  `qa.build1/2`, `qa.shots1/2`. Delete one to redo that call.
- **When qa fails** after its one fix round, it stops with `qa/REPORT.md` naming the failed gates and why. Read it
  and the round-2 reviews. To run another fix round without redoing the review: delete the fixer sentinels and every
  round-2 sentinel (`qa.fix_content qa.fix_design qa.fix_animation qa.posters qa.build2 qa.shots2 qa.blind2 qa.grade2
  qa.faith_verify qa.critic_final`) and run `pipeline/run.sh <id>`; the fixers then work from the round-1 reviews and
  the current page. `pipeline/run.sh <id> --only qa` redoes the whole review from scratch.

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
- Lesson: every ledger id placed (only admin logistics dropped, with reasons); SourceNote for wrong / outdated /
  imprecise-medium+; every flagged item treated in factcheck_applied.md; every 'keep' addition used.
- Clips: storyboarded, rendered and looked at (stills at every beat, wide and portrait phone, light and dark), reviewed
  against the skill's checklist; the site copy is the checked lab copy.
- Page: every placed id tagged and present on its own chapter page; build, links and check-figures clean; Playwright
  walks every step-through, card and clip at 1440/1024/390 in both themes with no errors.
- Review: an exam written from the class only, answered blind from the page (≥ 95% correct after fixes); a
  faithfulness audit whose every issue is independently re-checked as resolved; a design critique against the sample
  that ends in `pass`. Lessons from Lecture 1's reviews are baked into BUILD_BRIEF.md (hedges kept, no invented
  history, board lists in order, answers next to their questions, phone clip layouts, specific verdict copy).

## Files

`run.sh` (orchestrator), `stages/{lesson,animate,page,qa}.sh` (+ `common.sh`), `lib/claude_call.py` (call wrapper),
`prompts/*.md` (one per stage and role, `{{VARS}}` filled in by the stage scripts: lesson_design, lesson_visuals,
lesson_finish, animator, section_writer, assembler, examiner, blind_reader, grader, faithfulness, faithfulness_verify,
critic, critic_verify, fix_content, fix_design, fix_animation), `templates/BUILD_BRIEF.md`, `bin/site.sh`, `bin/lab.sh`,
validators `lib/check_{lesson,clip,part,coverage,qa}.py`, `lib/{make_brief,scaffold_page,page_text}.py`,
`lib/page_qa.mjs`, `migrate_lec01.sh`, `asr_parallel.sh` / `asr_sequential.sh` (machine ASR), `lectures.tsv`
(id to video). Skills: `hinglish-transcript-correction`, `lecture-board-reader`, `lecture-ledger`,
`lecture-factcheck`, `lecture-teaching-map`, `explainer-animation`.
