# 01 · The project

## Goal

Turn 10 recorded live classes of a system design cohort into a public learning website that **replaces the
videos**: a reader who never saw the class should be able to learn everything that matters by reading.

- Source videos: `vedio/` (10 files, Hinglish live whiteboard classes, ~2.5–3 h each, ~28 h total).
- Teacher: Arpit Bhayani (paid cohort). His board frames and third-party screenshots are **kept out of git**
  (paid content); the site text is written fresh from the transcript and fact-checked.
- Readers: working software engineers, reading on laptop or phone.

## Hard constraints (from the user, never relax)

1. **Transcription is local and free**: ASR runs on the Mac (mlx-whisper turbo; sherpa-onnx diarization). No paid ASR.
2. **Corrected transcripts never change what was said**: only fix mis-hearings; unclear spots are flagged, not guessed.
3. **Quality is never traded for quantity.**
4. **Reusable pipeline**: a new video should go through `pipeline/run.sh` with no manual steps.
5. **LLM work runs through Claude Code on the user's subscription** (`claude -p` + prompt files + skills).
   No API keys, no direct API calls. Model pinned to Opus (`PIPE_MODEL=claude-opus-5-5`); the user asked for Opus explicitly.
6. **Git identity**: the git-personal identity, `rmnjaat` / `ramanjangu01@outlook.com`. Commits end with the
   Co-Authored-By trailer given by the harness.
7. **Do not track** course board frames, third-party screenshots, QA PNGs, logs, `.done/` sentinels, lab renders.
8. Commit/push only when the work is verified (clean-worktree full build + zero broken links).

## Course order

The video filenames are not in teaching order. Real order (detected from content; source of truth `lectures/course.json`):

| Lecture | id | Topic (story version) |
|---|---|---|
| 1 | lec04 | Online indicator (green dot), then a blog's database decisions |
| 2 | lec01 | Medium under load: caching layers, scaling, queues/streams, the lost clap, live updates |
| 3 | lec05 | Airline check-in with row locks, then a key-value store on MySQL |
| 4 | lec02 | Database families ("use NoSQL, it scales"), then Slack real-time |
| 5 | lec08 | Building a load balancer, then locks across machines |
| 6 | lec03 | Minting unique IDs (getid, Flickr, Snowflake, Instagram, pagination) |
| 7 | lec09 | Instagram photos (CDN, upload, privacy), then hashtag counting |
| 8 | lec06 | Gravatar, photo tagging, unread badge |
| 9 | lec07 | CDC for the analysts' copy, then building your own Redis |
| 10 | lec10 | Files as a database (dictionary on S3, then Bitcask); closes the course |

## Machine and accounts

- Mac laptop; it crashed once under load, so heavy work is limited: at most 3 lectures/agents of heavy work at a
  time (user agreed to 3 after first "one at a time", then "2 at once"). Builds share `/tmp/vtb-heavy.lock`.
- Usage limits: when Claude hits a limit, the user switches accounts with `/login` and says "continue";
  stuck runs/agents are then resumed (agents via SendMessage, pipeline runs by restarting).
- Network drops (ENOTFOUND) happen; long calls can hang for hours. Resume, don't restart from zero.
