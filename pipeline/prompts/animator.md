# Task: animator - clip {{CLIP_ID}} for lecture {{LECTURE_ID}} (Lecture {{NUM}})

You make ONE explainer clip, `{{CLIP_ID}}`, end to end: research, storyboard, build, render-check, look, fix, review,
and hand it to the site. Follow the project skill `.claude/skills/explainer-animation/` (SKILL.md and every file in
`references/`) step by step: **a clip is finished only when it has been storyboarded, built, rendered, looked at and
fixed.** Never ship a placeholder; never cut quality. Work from the project root. Do not spawn sub-agents.

Read `{{LEC}}/BUILD_BRIEF.md` first (rules, file ownership, machine safety).

## This clip
- Plan: `{{LEC}}/lesson/animations.md` (the entry for `{{CLIP_ID}}`: mechanism, beats, captions, predict line,
  fidelity notes) and `{{LEC}}/lesson/clips.json`. The section it sits in: `{{LEC}}/lesson/outline.md`; its static
  twin and glyphs: `{{LEC}}/lesson/figures.md`.
- Truth: `{{LEC}}/ledger/ledger.jsonl` (every on-screen word traces to a ledger id or is a labelled sourced
  addition), `{{LEC}}/transcript/transcript.md`, `{{LEC}}/factcheck/final.jsonl` + `{{LEC}}/lesson/factcheck_applied.md`
  (a clip never states a claim the fact-check corrected; use the softened wording), `{{LEC}}/board/diagrams.md`.
- Worked examples (the quality bar): the four Lecture 1 clips `learn/animations-lab/src/clips/l01-*` with their
  storyboards in `lectures/lec01/animations/*/` and the fixes Lecture 1's critic forced in
  `lectures/lec01/qa/fixes_animation.md`. Build them in from the start:
  - a **portrait phone composition**: `META.phone = {width: 720, height: 9xx–10xx}` and the component takes
    `layout: 'wide' | 'phone'` and re-flows (not a shrunk copy); phone lettering ≥ 30 canvas px, captions 32;
  - chapter marks sit 10 frames into their beat (a chip lands on a settled frame with its caption up);
  - the clip tells exactly one story that matches the page caption and the static figure;
  - labels never cross lines or other labels; nothing fades into illegibility over another colour.

## Files (yours only)
- Lab: `learn/animations-lab/src/clips/{{CLIP_ID}}/` with `timeline.ts` (META: id, title, width 1200, height 800, fps 30,
  durationInFrames, posterFrame = last frame, chapters, captions, alt, ledger, phone; and STILLS) and exactly ONE
  capitalised component file `<Name>.tsx` with a default export (helper files lower-case). Use the shared primitives
  in `learn/animations-lab/src/lib/` (tokens, hand, anim, primitives) — **never edit `src/lib/`, `Root.tsx`,
  `compositions.tsx`, `scripts/` or another clip**; clip-specific helpers live in your folder.
- Storyboard: `{{LEC}}/animations/{{CLIP_ID}}/storyboard.yaml` + `storyboard.md` (template
  `.claude/skills/explainer-animation/templates/storyboard.template.yaml`; copy both into the clip folder too).
- Review: `{{LEC}}/animations/{{CLIP_ID}}/review.md` — the review checklist (`references/review-checklist.md`) item by
  item with what you saw in which still, every problem found and how it was fixed, known limits.

## Commands (they take the machine lock; never run remotion/npx/node directly)
- `pipeline/bin/lab.sh tsc {{CLIP_ID}}` — type-check your clip
- `pipeline/bin/lab.sh check {{CLIP_ID}}` and `pipeline/bin/lab.sh check {{CLIP_ID}} --phone` — stills at every STILLS
  frame, light + dark, contact sheets in `learn/animations-lab/renders/{{CLIP_ID}}/stills/`; `--frames=a,b` re-renders
  only the frames you touched while iterating
- `pipeline/bin/lab.sh mp4 {{CLIP_ID}}` then `pipeline/bin/lab.sh strip {{CLIP_ID}} <start-s> <dur-s>` — motion check
- `pipeline/bin/lab.sh copy {{CLIP_ID}}` — copy into `site/src/animations/clips/` (clips are discovered automatically)
- `pipeline/bin/lab.sh site-check {{CLIP_ID}} {{LECTURE_ID}}` — proves the copy builds in the site

**Look at every still and sheet with Read** (wide sheet at 540 px, phone sheet at 358 px, light and dark). Compare each
against its storyboard beat; fix; re-render; repeat until the review checklist passes (2–3 rounds is normal). Then the
mp4 and strips around each event. Set `status: reviewed` in the storyboard only when everything passes.

## Validate (repeat until OK)
`python3 pipeline/lib/check_clip.py {{LECTURE_ID}} {{CLIP_ID}}`
(storyboard reviewed, ids placed, META incl. phone, one default-export component, fresh light/dark wide and phone
sheets, review.md, site copy identical to the lab, type-check.) Run the final render-check AFTER your last code change.

Final message, under 120 words: clip length, beats, ledger ids taught, phone layout, what the render-check rounds
found and fixed, the validator's last line, anything the section writer must know (the exact `<AnimationClip>` caption
and predict line to use).
