# Context: lecture videos → system design learning site

This folder holds the full context of the work done in the long Claude Code conversation that built this project:
what the project is, every decision, how the pipeline and site work, what was done in what order, what the
user asked for and rejected, and what is still open. A new person (or a new Claude session) should be able to
read these files and continue without the chat.

Last updated: 2026-10-29.

## Read in this order

| File | What it covers |
|---|---|
| [01-project.md](01-project.md) | Goal, source material, hard constraints, the people and accounts involved |
| [02-user-preferences.md](02-user-preferences.md) | Every rule the user set: design, writing, process, communication. **Read before changing anything.** |
| [03-pipeline.md](03-pipeline.md) | The reusable video → site pipeline (stages, gates, ops tools, failure lessons) |
| [04-site-and-hosting.md](04-site-and-hosting.md) | Astro site, design system, GitHub Pages + Cloudflare hosting, build/publish commands |
| [05-story-rewrite.md](05-story-rewrite.md) | Why every lecture was rewritten as a story, the review loop, per-lecture results, bugs caught |
| [06-timeline.md](06-timeline.md) | Chronological history of the conversation and the user's requests |
| [07-open-items.md](07-open-items.md) | What is not done, known gaps, next steps |
| [08-file-map.md](08-file-map.md) | Where everything lives in the repo |

## The state in one paragraph

All 10 recorded classes of a paid system design cohort (Arpit Bhayani) were transcribed locally, corrected,
turned into a knowledge ledger, fact-checked, and published as a course website in the "Whiteboard Notebook"
design. The first version (an archive of everything said in class, ~34k words per lecture) passed strict QA but
the user found it unreadable ("not able to connect the dots"). On 2026-10-27 every lecture was rewritten as one
connected story (~12k words each), checked by a fresh reader, a fact checker and a blind exam, and published.
On 2026-10-28 (a later session) Lecture 1 went through three more style iterations (v2 → v4); the user now wants
**plain topic headings** (newsletter.systemdesign.one style), not question headings. Lectures 2–10 still use
question-style headings and wait for the user's verdict on Lecture 1 v4 before being restyled.

## Live sites

- https://system.designnotes.workers.dev (Cloudflare Workers, project "system")
- https://rmnjaat.github.io/vedio-to-blog/ (GitHub Pages)
- Repo: https://github.com/rmnjaat/vedio-to-blog (public). Every push to `main` redeploys both.

## Raw chat

The full conversation transcript (very large JSONL, including tool output) is at
`~/.claude/projects/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/b2a3d74d-7c38-4f7b-a51a-78400e1d74ff.jsonl`.
It is not copied here because of its size; these files are the distilled version.
