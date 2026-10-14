# Task: lesson visuals - lecture {{LECTURE_ID}} (Lecture {{NUM}}): figures.md, animations.md, clips.json

You are the illustrator-planner for lecture {{LECTURE_ID}}. The lesson outline is written
(`{{LEC}}/lesson/outline.md`, `placement.json`, `chapters.json`, `prompts.md`, `factcheck_applied.md`). Write the
figure specs and the animation plan the section writers and animators will build from. **Quality must not be reduced
for quantity.** Work from the project root. Do not spawn sub-agents. Do not change placement.json except to add an
id to a figure/clip note; never move or drop ids.

## Read first
- Worked example: `lectures/lec01/lesson/figures.md` and `animations.md` (format, depth, the glyph-kit section, the
  shortlist table, the beats). Then `{{LEC}}/lesson/outline.md` (every "Fig N·x", clip and RuleBox sketch it names).
- The design: `learn/design/B-whiteboard-notebook/index.html` + `NOTES.md`; `site/FIGURES.md` (kit parts, scales,
  rules); the kit itself `site/src/figures/kit/Kit.tsx` (what parts exist).
- The board: `{{LEC}}/board/diagrams.md` (D-xx) and `board_log.md`; open the frames in `{{LEC}}/board/frames_kept/`
  for every diagram you redraw (never embed them).
- Animations: `.claude/skills/explainer-animation/SKILL.md` and `references/choosing.md` (only where change over time
  IS the lesson; 3–5 clips per lecture; at most one per top-level section; never two clips without prose between).
- Ledger `{{LEC}}/ledger/ledger.jsonl`, transcript `{{LEC}}/transcript/transcript.md` for exact numbers and wording.

## Outputs in `{{LEC}}/lesson/`
1. `figures.md`: as lec01's. Start with the glyph table (reuse lec01's glyphs; add only what this lecture needs, built
   from kit parts), arrow rules (initiator-side heads, replication = replica pulls, orthogonal routing in architecture
   views), marker colours (blue request/data path, green ack/success, red failure/stale/limit, graphite otherwise),
   the speech-bubble rule, accessibility (title + desc) and mobile rules (> 7 glyphs or > 2 panels → a portrait phone
   layout, labels ≥ 12 px at 360 px). Then every figure in reading order: `### Fig N·x: <title> (D-xx redraw | new
   | StepThrough)` with section, board frame refs, parts and positions, arrows, labels (exact words, from the class),
   marker colours, step texts for step-throughs (numbered, matching circled numerals), phone layout, desc draft, and
   the ledger ids it carries. Include every RuleBox sketch. **Every board diagram D-xx is redrawn or explicitly
   folded into another figure with a reason.**
2. `animations.md`: as lec01's: the shortlist table (candidates with verdict animate / static / step-through and
   why), then per clip: id `{{CLIP_PREFIX}}<slug>`, section, length (10–40 s), mechanism, why motion beats a still,
   the static twin, ledger ids taught (and context-only ids), fidelity notes (what is deliberately not claimed;
   fact-check softenings), beats with seconds and one caption each (≤ 2 lines, ≤ 17 chars per second shown), the
   predict line before the clip and the sentence after it. Canvas 1200×800 at 30 fps, plus a portrait phone layout.
3. `clips.json`: `[{"id": "{{CLIP_PREFIX}}<slug>", "section": "2.3", "title": "…", "seconds": 24,
   "ledger": ["L-0101", …], "predict": "…", "caption": "…"}]`, 3–5 clips, one per top-level section at most.

## Validate (repeat until OK)
`python3 pipeline/lib/check_lesson.py {{LECTURE_ID}} --stage all`
Then check by hand: every figure the outline names is specified; every D-xx is accounted for; step texts match the
numerals; every on-screen word of a clip is in the ledger or marked as a sourced addition.

Final message, under 100 words: figure count (numbered / step-throughs / rule sketches / phone layouts), board
diagrams redrawn, clips with lengths, the validator's last line.
