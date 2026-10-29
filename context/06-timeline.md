# 06 · Timeline of the conversation

Dates are 2026. User requests are paraphrased (quoted where the wording matters).

## Phase 1: pipeline and first build (Oct 11–15)

- **Oct 11**: user asks to turn the recorded system design class videos into a learning website. Local ASR only,
  transcripts must not change content, unclear parts flagged. Pipeline started.
- **Oct 12**: design rounds. User rejects round 2 as "modification, not redesign"; picks round-1 **B, Whiteboard
  Notebook**, "follow the sample exactly". Decisions: one page per lecture in real course order, fact-check policy,
  pilot checkpoint after Lecture 1, reusable pipeline via `claude -p`, public repo, no paid frames in git.
- **Oct 13**: real course order detected from content (`lectures/course.json`). Lecture 1 pilot page approved.
- **Oct 13–15**: lectures 2–10 run through the pipeline. Laptop crashed once → one lecture at a time, later 2, then 3.
  Usage limits → account switches with `/login` + "continue". Network outages (ENOTFOUND) for hours.
  User checks in often: "done?", "why 4 is on hold", "How long this will take", "use opus 5.5".
  Deadline: "lecture 6 live by 15:40" → went live 15:43 (3 min late, admitted).
  Ops fixes: watchdog, publish watcher, dead-lock takeover, automatic second QA fix round.
- **Oct 15**: all 10 lectures pass QA and are live on GitHub Pages.

## Phase 2: hosting (Oct 15)

- Domain ideas; .com vs .dev; `designnotes.dev` checked (unregistered).
- Free hosting on **Cloudflare**. User: **"do not change anything in code"** → code edits reverted, CLI flags used.
- Step-by-step help filling the Cloudflare form; project renamed to `system` → https://system.designnotes.workers.dev.

## Phase 3: review and story rewrite (Oct 26–27)

- User: review the site as a student and as a teacher; "the storytelling is not that great… not able to connect the dots".
- Review artifact published (flow 2.9/5, archive problem).
- User restates the goal: "Vlog reading… replace those videos… connection in between". Pilot = Lecture 1; old version not needed.
- Lecture 1 rewritten (8 chapters, ~12k words), reviewed, blind-exam 96/119, fixes applied, published.
- User: **"fix till lecture 3"** → Lecture 1 fixes + Lectures 2 and 3 rewritten through the full check loop and published.
- User: **"move forward for other lectures"** → Lectures 4–10 in batches of 3 (4/5/6, then 7/8/9, then 10), each
  through writer → reader + fact review → revision → blind exam + final check → final fix → publish.
  A usage-limit stop mid-batch was resumed after reset ("please continue").
- Course-wide hand-off pass; "Lecture 02" labels → "Lecture 2"; all 10 live by 17:17 on Oct 27.

## Phase 4: Lecture 1 style iterations (Oct 27–28, later session)

- Versions/tags + `VERSIONS.md` added for easy revert.
- Lecture 1 v2 (question chaining) → user rejects question headings as "broken pieces" → v3 plain topic headings
  (newsletter.systemdesign.one style) → v4 relatable hook and standalone chapter openings.

## Phase 5: this context folder (Oct 29)

- User: "build a context folder and please write the full context of this chat in that folder" → `context/`.
