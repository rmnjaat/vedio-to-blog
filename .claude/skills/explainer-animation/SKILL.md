---
name: explainer-animation
description: Plan, storyboard, build and render-check short (10-40 s) animated explainer clips for the system design lecture site, made with Remotion in the Whiteboard Notebook style (graph paper, hand-feel ink, blue = request path, red = failure/stale, green = ack) and played in-page with @remotion/player. Covers choosing what deserves motion (only where change over time is the lesson, 3-5 per lecture), a storyboard spec tied to ledger item IDs, the motion style guide, the Remotion build guide (file layout, shared primitives, props, fonts, determinism), the render-check loop (stills at caption beats, phone-width contact sheet, light and dark), and a review checklist. Use when asked to make, plan, storyboard, animate, render, review or fix a lecture clip, explainer animation, Remotion composition, or "clip placeholder" for lectures/<id>, or to pick which concepts of a lecture get animated.
---

# Explainer animation (Remotion, Whiteboard Notebook)

You make the short animated clips that sit inside a lecture page. Each one is a static figure from the page that comes alive for 10–40 s to show one thing that changes over time. They are not decoration, trailers or slides. A clip is finished only when it has been **researched, storyboarded, built, rendered, looked at, and fixed**. Never ship a placeholder, and never cut quality to make more clips.

Reference implementation (follow it): `learn/animations-lab/src/clips/l01-replica-lag/` (storyboard.yaml, storyboard.md, timeline.ts, ReplicaLag.tsx) with renders in `learn/animations-lab/renders/l01-replica-lag/`.

## Inputs you must read first
1. The lecture's ledger `learn/<lec>/ledger/ledger.jsonl` (the source of truth for *what was taught*) and the teaching map if it exists.
2. The board `learn/<lec>/board/diagrams.md` (the drawn form of each figure; your glyphs follow it).
3. The design: `learn/design/B-whiteboard-notebook/index.html` and `NOTES.md` (tokens, glyphs, arrow rules). Do not invent a new look.
4. `references/research.md` once, so you know why the rules are what they are.
5. If `site/src/animations/README.md` exists, read it. The site engineer owns Player plumbing. You only add compositions there.

## The process (do every step, in order)

**1. Choose** (see `references/choosing.md`). List the lecture's candidate dynamics. Keep only those where *change over time is the lesson*: rate, accumulation, ordering, a race, a window, a cascade. Pick 3–5 per lecture. Everything else becomes a static figure or a step-through. Write the shortlist with one line each: "why motion, what the static twin is".

**2. Storyboard** (see `references/storyboard-spec.md`; template in `templates/`). Write `storyboard.yaml` + `storyboard.md` before any code. They must give beats with frame ranges, one caption per beat synced to its event, the glyphs and their positions, every motion, the ledger IDs taught, what is deliberately *not* claimed, the poster frame and the reduced-motion stills. Check every on-screen word against the ledger. If the lecture didn't say it, either cut it or mark it as an explicit, sourced addition.

**3. Build** (see `references/build-guide.md` and `references/motion-style.md`). Put timing in `timeline.ts` (pure TS, mirrors the YAML) and drawing in `<Clip>.tsx` using the shared primitives (`Sheet`, `Stage`, `Ink`, `Pen`, `Packet`, `Write`, `StepBadge`, `CaptionBand`, hand geometry). Frame 0 equals the static figure on the page. The last frame is the annotated poster.

**4. Render-check** (see `references/render-check.md`). Run `node scripts/check.mts <clip-id>`. It renders a still at every caption beat plus mid-motion frames, in paper and blackboard, and builds full-size and phone-width (358 px) contact sheets. **Open the images and look at them.** Compare each one against its storyboard beat. Fix, re-render the frames you touched, and repeat until every item in `references/review-checklist.md` passes. Then render one mp4 preview.

**5. Review** with `references/review-checklist.md`, covering accuracy against the storyboard and ledger, legibility at 390 px, contrast in both themes, no decorative motion, and timing. Record the result in the storyboard (`status: reviewed`) along with any known limits.

## Non-negotiables
- **Only one thing is in motion at a time.** A slow secondary indicator such as a growing span or a playhead is allowed. Nothing moves that the caption isn't talking about.
- **Marker colour is meaning:** blue for the request/data path, red for failure or stale, green for ack or success, graphite for everything else. Colour never encodes box type.
- **Captions are burned in, appear as the event starts, one at a time**, ≥ 2.5 s each, ≤ 2 lines, ≤ 17 characters per second of display time.
- **Past states persist** at 38% opacity (ghosting) so nothing vanishes before it has been understood. The end frame is a complete static summary.
- **10–40 s per clip**, readable at 0.5×. No zooms, no bounce, no particles, no camera moves, no motion for its own sake.
- **Faithful to the lecture.** No numbers, mechanisms or names the teacher didn't give, unless they are sourced and labelled as additions in the storyboard.
- **Deterministic:** no `Math.random`, no `Date`, no CSS transitions. Everything is a pure function of `useCurrentFrame()`.
- **Load-light rendering:** `--concurrency=1`, stills first, one mp4 at the end. Close Studio when done.

## Files in this skill
- `references/choosing.md`: what to animate and how many
- `references/storyboard-spec.md`: the storyboard format (YAML + markdown) with field rules
- `references/motion-style.md`: motion in the notebook look (pen reveals, ink, marker semantics, easing, speeds, durations)
- `references/build-guide.md`: Remotion project layout, primitives, props, fonts, Player handoff
- `references/render-check.md`: the render-and-inspect loop, commands, what to look for
- `references/review-checklist.md`: the sign-off checklist
- `references/research.md`: the evidence and sources behind the rules
- `templates/storyboard.template.yaml`: a blank storyboard to copy
