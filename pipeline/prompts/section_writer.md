# Task: section writer {{WRITER}} - lecture {{LECTURE_ID}} (Lecture {{NUM}}: {{TITLE}})

You write chapter(s) **{{CHAPTERS}}** of the lecture page: the MDX parts **{{PARTS}}** (sections {{SECTIONS}}) and
every figure they use. Other writers write the other chapters at the same time; the assembler writes the overview and
the lecture frontmatter. **Quality must not be reduced for quantity: every ledger id placed in your sections must be on
the page, faithfully, and look exactly like the chosen design.** Work from the project root. Do not spawn sub-agents.

## Read first (fully)
1. `{{LEC}}/BUILD_BRIEF.md` — sources of truth, voice, fact-check policy, tagging, figure rules, file ownership,
   machine safety. Follow it exactly.
2. Your part of the design: `{{LEC}}/lesson/outline.md` (header sections: voice rules and component vocabulary; then
   your chapters), `placement.json` (every id placed in {{SECTIONS}}, primary or `also`, with its note),
   `figures.md` (your figures), `prompts.md` (your pause-and-think prompts), `factcheck_applied.md` (your SourceNotes
   and inline clarifications), `clips.json` + `animations.md` (your clips: they are already built and in the site;
   the animator's report `{{LEC}}/logs/animate_<clip>.result.md` gives the predict line and caption).
3. The ledger items themselves (`{{LEC}}/ledger/ledger.jsonl`: statement, detail, verbatim, times) and the transcript
   around them (`{{LEC}}/transcript/transcript.md`) — write from what was actually said, keep hedges and conditions.
   Board frames for your redraws: `{{LEC}}/board/frames_kept/` (look, never embed).
4. The design sample `learn/design/B-whiteboard-notebook/index.html` (its rhythm: a paragraph, a figure, a paragraph;
   the voice and length of its paragraphs) and the worked example pages `site/src/content/lectures/lec01/*.mdx` with
   figures in `site/src/figures/lec01/` — copy their import block, Section/Figure/StepThrough/PauseAndThink/RuleBox/
   RecallQuestions usage and tagging. Kit: `site/FIGURES.md`, `site/src/figures/kit/Kit.tsx`.

## Voice: teach, do not report the recording
Write as a teacher explaining the idea directly ("A heartbeat every 10 s means…"), not as a summary of a class
("the instructor said…", "the class concluded…", "a participant asked…, met with a 'Right.'"). No teacher biography,
no turn-by-turn Q&A: fold class questions into the explanation. Attribute only where the fact-check policy needs it
(opinions, judgement calls, first-hand experience: "in the lecture's view", once, plainly); hedges stay hedges.
Budget: at most ~2 mentions of "the instructor" / "the class" / "the lecture" per chapter.

## Write (only these files)
- `site/src/content/lectures/{{LECTURE_ID}}/<part>.mdx` for each of {{PARTS}} (each currently a PIPELINE-STUB; replace it
  completely). Sections: `<Section id="s{N}-{M}" no="N.M" title="…" dek="…" meta="About X min · class HH:MM–HH:MM"
  crumb="N.M Short">`; a chapter opener that has its own text uses `id="s{N}"`. Section titles follow the outline.
- Figures: `site/src/figures/{{LECTURE_ID}}/<part>-*.tsx` (or `fig-<n><x>.tsx`), built only from the kit; phone layouts
  per FIGURES.md. Clips: `<AnimationClip clip="{{CLIP_PREFIX}}…" no="Clip N·1" lead="<predict line>" k="…" caption="…" />`
  exactly where the outline puts them.
- Tag every teaching paragraph `[[L-…]]` and every teaching component `k="L-…"`; StepThrough `stepK` per step where
  steps carry different ids. Untagged text is only for transitions.
- Cross-links: plain `#sN-M` hrefs to sections of this lecture; for other lectures use
  `/lectures/<id>/` links only if that lecture's page exists, else name it ("Lecture 05") in text or a ForwardChip.

## Check as you go (commands take the machine lock; never run npm/astro directly)
- `pipeline/bin/site.sh build {{LECTURE_ID}} --parts {{PARTS_CSV}} --tag w-{{WRITER}}` — builds only your parts
- `pipeline/bin/site.sh coverage {{LECTURE_ID}} --parts {{PARTS_CSV}} --tag w-{{WRITER}}` — your placed ids on the pages
- `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/writer-{{WRITER}} --tag w-{{WRITER}} --widths 1440,390` —
  screenshots of your pages (figures in `fig/`, steps in `step/`); **open them with Read** and fix what does not look
  like the sample or the lec01 pages: label collisions, scale, phone layouts, colours, spacing, dark mode.
Build once per round of edits, not after every small change.

## Validate (repeat until OK)
`python3 pipeline/lib/check_part.py {{LECTURE_ID}} {{WRITER}}`
(parts written, every section present, every placed id tagged, no dialogue/student names, figure imports exist, then an
isolated build of your parts and the coverage check on the built pages.) Then re-read your sections once against
`factcheck_applied.md` (each SourceNote right after the teacher's point it qualifies, the point kept) and against the
ledger statements (no invention, no lost condition or number).

Final message, under 150 words: files written, placed ids covered vs assigned, figures (and phone layouts), step-throughs,
prompts, clips embedded, checks run with their last lines, anything the assembler must know, any "Shared change needed".
