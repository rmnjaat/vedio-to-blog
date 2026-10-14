# Review: `l09-presigned-upload` (36 s, 1080 f, 6 beats)

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in
`learn/animations-lab/renders/l09-presigned-upload/` (wide sheets paper + blackboard, phone sheets paper + blackboard,
full-size phone stills 746 and 1079, mp4 strips at 3.3 s, 10.8 s, 16.8 s, 23.8 s).

## Render-check rounds
1. **Earlier session (paper only):** built wide + phone layouts from the storyboard; wide paper sheet rendered.
2. **This session, round 1 (all four sheets):** every beat matched its storyboard state. One problem found:
   - phone m7 (frame 746) and poster: the `POST` label (x 118) sat right beside the arc, so the chip riding the arc
     passed within a few px of the label's first letter. **Fixed:** label moved to (142, 446); re-rendered 746 and 1079
     in both themes: clear gap between the arc and `POST`.
3. **Round 2 (final, after the last code change):** full wide + phone renders, light and dark, then the mp4 and four
   strips. Nothing further found.

## Teaching and accuracy
- [x] Motion test: the lesson is accumulation (the bar climbs one step per crossing while photos stream, B1–B2) and its
  absence (three photos ride the arc in B4 and the bar does not move). A still shows two routes, not the load.
- [x] Every word traces: `5 MB in`/`5 MB out`/`before`/`after` L-0078; `network card`, `full`, `waits` L-0072;
  `prepare`, tag `s3://images/<id>.png` L-0081; `valid 60 s` L-0084 (one of the class's 10/20/30/60 s); `POST` L-0082;
  arc bypassing the api L-0077/L-0085; order prepare → upload L-0076. `GET /feed` is the illustrative stand-in for
  "other API calls", listed in fidelity_notes.
- [x] Nothing invented: no money, egress or bill (SN-01); the bar has no unit; no S3 call in the prepare step (fact-check
  L-0085: signed locally) — checked in stills 526/562/590 (blue packet user→api, green packet back, nothing to s3).
- [x] Causality: arrowheads at api (upload, `GET /feed`), at s3 (copy, arc). Responses ride back as packets (green reply
  in B3), no second arrow.
- [x] Step numbering ①–④ matches the captions (Fig 3·b has no step-through).
- [x] Frame 0 (still 82) = Fig 3·b row b: user with chip → api → s3, empty bar `network card`. Poster (1079) works
  without caption: ghosted before-route with `5 MB in/out`, `full` gone, waiting `GET /feed`; blue `POST` arc with ✓;
  tag + clock; `before: 5 MB in + out` / `after: 5 MB, one trip`.

## Match with the storyboard
- [x] Beat stills 292/492/702/912/1079 show each beat's end state at its planned frame; captions change at 90/300/500/710/920.
- [x] One primary motion at a time: chips ride one leg at a time in B1; in B2 the stream and bar move together (the bar is
  the indicator the caption names); B3 pen → reply → tag in sequence; B4 arc then chips (bar static).
- [x] Ghosting: before-route, labels, `GET /feed` and red bar go to 38% at 500 (strip 16.8). The red fill is removed at
  714 only because the near-empty fill replaces it in place (strip 23.8).

## Legibility
- [x] Wide labels 40 px, captions 48; phone (720×1090) labels 30, captions 32 — all readable on the phone sheet; captions
  2 lines inside the band in every still.
- [x] No overlaps in any still (after the `POST` fix). `5 MB in` (ghosted) and `prepare` share the left of the in-leg on
  separate lines in both layouts.
- [x] Strokes visible at phone size; the `GET /feed` dashed outline reads as dashes.

## Colour and contrast
- [x] Blue = photo/request path (chips, re-inked legs, prepare, POST, after); red = full bar, `full`, `waits`, dashed
  `GET /feed` outline; green = reply packet and ✓; graphite rest. Red has words (`full`, `waits`), green has ✓.
- [x] Blackboard sheet: all colours flip (no stray dark ink); ghosted red reads as faint brown-red, legible as past context.
- [x] Colours only from `THEMES` tokens.

## Motion quality
- [x] No decorative motion. Easing from `anim.ts`; the bar steps with EASE_MOVE per crossing.
- [x] Chips/packets ride their lines and coincide with the pen tip (strips 3.3, 16.8, 23.8).
- [x] Labels wipe on (`5 MB `, `prepar`, `POS` partial wipes in strips).
- [x] Holds: B0 90 f; ≥ 30 f after the last motion of each beat (266→300, 470→500, 632→710, 870→920); final hold 96 f
  after `after:` is written. Captions 46–71 chars over 5.3–7 s (≤ 13.5 cps). Total 36 s (72 s at 0.5×).

## Engineering
- [x] `lab.sh tsc` clean. Deterministic (`random(seed)` only for the cloud geometry, computed once at module level).
- [x] META complete (id, title, 1200×800, phone 720×1090, fps, duration, poster 1079, chapters 10 f into ①–④, captions,
  alt describing the mechanism, ledger). Both themes and both layouts render.
- [x] Renders: stills, four sheets, mp4, strips in `renders/l09-presigned-upload/`. No Studio or server left running.

## Known limits
- Bar steps are illustrative. The user's held chip stays while a copy flies (it stands for the next photo).
- Stray stills `*-f746.png` / `*-f1079.png` from the `--frames` re-render remain in the stills folder (deletion was not
  permitted in this session); the sheets use the named stills.
