# Review checklist (sign-off)

Tick every line by looking at renders, not by reading code. A single "no" means the clip isn't done.

## Teaching and accuracy
- [ ] The clip passes the motion test in `choosing.md`: the change over time is the lesson, and a still would miss it.
- [ ] Every caption and every on-screen label traces to a `ledger.taught` ID, or to a sourced addition listed in the storyboard.
- [ ] Nothing the lecture didn't say is shown: no invented numbers (latencies, counts), no products or mechanisms beyond the ledger.
- [ ] Any simplification is listed in `fidelity_notes`, and anything not to scale is labelled on screen (for example "time (slowed down)").
- [ ] The direction of causality is correct, including who initiates (the arrowhead owner). Example: the replica pulls from the master (L-0109).
- [ ] Step numbering matches the page's step-through figure, if there is one.
- [ ] Frame 0 matches the static twin. The last frame is a complete annotated summary, and the poster works without the caption.

## Match with the storyboard
- [ ] Every beat appears at its planned frames (± 6 f), and every caption appears with its event.
- [ ] Each beat has exactly one primary motion. Any secondary motion is a slow indicator the caption refers to.
- [ ] Past states are ghosted at 38%, not removed. Things are removed only when something new replaces them in the same place.

## Legibility (phone sheet, 358 px per frame)
- [ ] Every label is ≥ 40 px on the canvas and readable on the phone sheet without zooming.
- [ ] The caption is ≥ 48 px, ≤ 2 lines, fully inside the band, and never over the diagram.
- [ ] No overlaps between labels, lines and shapes in any still, including mid-motion stills.
- [ ] Strokes stay visible at phone size (≥ 3.6 px on the canvas). Dashes are still recognisable as dashes.

## Colour and contrast (paper and blackboard sheets)
- [ ] Only the marker colours are used, and each means the right thing (blue = request path, red = failure/stale, green = ack/success, graphite = the rest).
- [ ] Every colour cue has a second cue: a shape (✕/✓), dashing, or a word.
- [ ] In both themes, labels in marker colours are readable on the sheet. Target ≥ 4.5:1 for text. Measured on `#FDFBF6`: blue 5.9, red 5.7, green 5.0, ink-2 6.6. On `#232927`: blue 6.5, red 6.0, green 7.6, ink-2 7.4. Ghosted text is allowed to drop lower because it is past context.
- [ ] No hard-coded colours outside `tokens.ts`.

## Motion quality
- [ ] There is no decorative motion: no zoom, bounce, overshoot, shake, particles, pulsing, looping, or slide-ins from off-canvas.
- [ ] Easing is from `anim.ts`. Linear is used only where speed means something (playhead, growth).
- [ ] Packets ride their lines, and the pen tip and packet coincide.
- [ ] Labels are written on with a wipe, not popped in or typed.
- [ ] Holds: B0 ≥ 2 s, the final hold ≥ 2.5 s, ≥ 1 s after the last motion of each beat, and each caption is up for ≥ max(2.5 s, chars/17).
- [ ] Total length is 10–40 s, and nothing feels stuck at 0.5× or rushed at 1×.

## Engineering
- [ ] `npx tsc --noEmit` is clean.
- [ ] The code is deterministic: no Math.random, Date, CSS transitions or timers.
- [ ] `META` is complete: alt text describing the mechanism, chapters, captions, and posterFrame.
- [ ] Both compositions (`<id>`, `<id>-dark`) render.
- [ ] The renders are in `renders/<id>/`: the stills, both contact sheets, and one mp4.
- [ ] Studio and dev servers are closed.
