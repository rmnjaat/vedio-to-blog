# Lecture 1 pilot page — shared build brief (read fully)

**Quality must not be reduced for quantity.** Every ledger item placed in your part must be on the page, faithfully, and look exactly like the chosen design.

## Sources of truth
- Lesson design: `lectures/lec01/lesson/outline.md` (sections, voice rules, component vocabulary), `placement.json` (ledger id → section/component), `figures.md` (every figure's exact structure), `animations.md`, `prompts.md`, `factcheck_applied.md`.
- Ledger: `learn/lec01/ledger/ledger.jsonl` (also copied at `lectures/lec01/ledger/ledger.jsonl`). Fact-check: `learn/lec01/factcheck/` (verified additions: `additions_verified.jsonl`). Board: `learn/lec01/board/board_log.md`, `diagrams.md`; board frames in `learn/lec01/board/frames_kept/` (look at them with Read to match redraws; never embed them).
- Design (followed EXACTLY, including its prose-paragraph + diagram rhythm): `learn/design/B-whiteboard-notebook/index.html` + `NOTES.md`.
- Site: `site/README.md`, `site/FIGURES.md`, components in `site/src/components/`, figure kit `site/src/figures/kit/`, reference MDX `site/src/content/samples/scaling-the-database.mdx` (copy its imports and rhythm). Animations: `site/src/animations/README.md`, `.claude/skills/explainer-animation/`.

## Rules
- Own voice: no teacher–student dialogue, no student names. Class Q&A insights become explanation.
- Teacher's points stay; apply `factcheck_applied.md` exactly (SourceNote / inline clarification with the source link).
- Tag every prose block/component with the ledger ids it carries: trailing `[[L-0012 L-0013]]` on prose, `k="..."` on components.
- Use the figure kit for every diagram (one hand, one stroke family, labels ≥ 12px, phone layout for big figures). Marker colours: blue request path, red failure/stale, green ack/success. Replication: replica connects to and pulls from the master.
- Write only the files assigned to you. Do not edit shared components, the kit, other sections, or `lec01.mdx` (the assembler owns it). If a shared component needs a change, note it in your report.

## Machine safety (the laptop crashed once from overload)
Heavy commands — `npm run build`, `astro dev`, Playwright, `remotion render/still` — only while holding the lock:
`until mkdir /tmp/vtb-heavy.lock 2>/dev/null; do sleep 15; done; <command>; rmdir /tmp/vtb-heavy.lock`
Always release it (also on failure). Remotion renders with `--concurrency=1`. Never leave a server or browser running.
For quick checks prefer type/MDX compile checks over full builds; do one full build + screenshots near the end.

## Report
Under 150 words: files written, ledger ids covered vs assigned (from placement.json), figures/clips built, checks run, anything the assembler must know.
