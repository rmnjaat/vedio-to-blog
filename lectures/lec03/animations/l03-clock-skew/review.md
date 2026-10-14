# Review: `l03-clock-skew` (Four clocks, four requests)

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every line below was checked by looking at
renders in `learn/animations-lab/renders/l03-clock-skew/`: stills (`_sheet-{paper,blackboard}-full.png` at 540 px and
`_sheet-phone-{paper,blackboard}-phone.png` at 358 px), the full-size posters, the mp4 and three motion strips
(`strip-3.7.png`, `strip-16.3.png`, `strip-25.5.png`).

Clip: 1065 frames (35.5 s; 71 s at 0.5×), 7 beats (B0 hold, ①–④ requests, B5 order, B6 poster hold). Wide 1200×800,
phone 720×1070.

## Teaching and accuracy
- [x] **Motion test.** The list grows down a "real time" axis one request at a time; the dip (237 after 244) appears at
  the moment it is made. A still (Fig 3·d) shows the finished list only. (b3-m7 still: 237 lands under 244.)
- [x] **Every word traces.** `m2/m4/m7/m9`, `time: 23/24/23/23`, `get_id on mN`, `232 244 237 239`, "smaller than 244",
  "not monotonically increasing" are L-0071 / board D-08 / Fig 3·d. "ahead" states 24 > 23. "real time" names the
  axis (the board's call order). Captions B0–B5: L-0071 (B0 restates L-0062, context). B6: L-0072.
- [x] **Nothing invented.** No units on 23/24, no drift amounts, no NTP, no temperature (SN-01/SN-02 stay in prose), no
  spacing on the axis, no caller drawn. L-0073 ("almost impossible") is not stated.
- [x] **Simplifications listed** in `fidelity_notes` (machine names as `m2` above and in the list; underline under the
  time digits; unscaled axis).
- [x] **Causality / initiator.** Request arrowheads sit at the laptop (the call lands on the machine); row arrows point
  from the call to its ID; the red down-arrow reads the list top to bottom like the board's.
- [x] **Step numbering** ①–④ = Fig 3·d's steps 1–4 (m2, m4, m7, m9).
- [x] **Frame 0 = static twin** (b0 still: laptops, clocks, axis, empty slots, no requests). **Poster** (b6) holds the
  whole story without the caption: ringed `time: 24` "ahead", the four calls in order, 237 ringed "smaller than 244",
  red arrow "not monotonically increasing".

## Match with the storyboard
- [x] Beats at their frames (captions from `timeline.ts` = the YAML; the mp4 strips show the request-1 events at
  3.7–5.7 s, the B3 rings and labels at 16.4–19.3 s, the bracket at 25.6–26.6 s, as planned).
- [x] One primary motion at a time: arrow+packet, then re-ink, then row write, then ID write, then underline; in B3 the
  ring, "smaller than 244", ring on 24, "ahead" in sequence (strip-16.3).
- [x] Past states: spent request arrows settle from blue to graphite at 38% (all stills after b1); the list stays at full
  ink because it is the state being built. Nothing is removed.

## Legibility (phone sheet, 358 px)
- [x] Labels ≥ 40 px wide / 30 px phone, IDs 48 / 40, captions 48 / 32. All readable on the phone sheet.
- [x] Captions ≤ 2 lines inside the band in both layouts. No-break spaces keep "time 23", "ID 232", "clock 23" on one
  line (round 1 wrapped "time | 23").
- [x] No overlaps (see problems below for the two found and fixed).
- [x] Strokes 3.6 px+, dashed slots and rings still read as dashed on the phone sheet.

## Colour and contrast
- [x] Blue only for the requests (arrow, packet, laptop re-ink, step badges); red only for the out-of-order evidence
  (ring + "smaller than 244", ring + "ahead", arrow + "not monotonically increasing"); graphite for the rest. No green
  (nothing succeeds here).
- [x] Second cues: red items are dashed rings or words; blue requests carry step numerals.
- [x] Both themes checked (blackboard sheet, phone blackboard poster, wide blackboard f615): marker colours flip to the
  blackboard tokens; ghosted arrows faint but visible.
- [x] No hard-coded colours (all from `THEMES` / `useColor`).

## Motion quality
- [x] No zoom, bounce, slide-ins, pulsing, loops.
- [x] Easing from `anim.ts` (EASE_MOVE for the arrow/packet, EASE_PEN for pens and writes, EASE_FADE for fades). No
  linear motion (no speed-carrying quantity).
- [x] Packet rides the arrow with the pen tip (strip-3.7 frames 3–7).
- [x] Labels and IDs are wiped on (strip-16.3 "sma…", "smaller t…").
- [x] Holds: B0 3.5 s; each request beat holds ≥ 1 s after its underline (33 f in B1/B2/B4, 40 f in B3); B5 1.7 s after
  "increasing"; B6 final hold 5.3 s. Each caption is up ≥ max(2.5 s, chars/17).
- [x] 35.5 s total; 71 s at 0.5×.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l03-clock-skew`: `tsc ok`.
- [x] Deterministic (no random/Date/state); seeds named per element.
- [x] META complete: alt (mechanism), chapters at beat + 10 f, captions, posterFrame 1064, ledger, phone canvas.
- [x] `<id>`, `-dark`, `-phone`, `-phone-dark` all rendered.
- [x] Renders: stills, four sheets, mp4, strips in `renders/l03-clock-skew/`. No Studio or server left running.

## Problems found and fixed
| round | still | problem | fix |
|---|---|---|---|
| 1 | wide b1 / sheet | caption ① wrapped "time / 23" across lines | no-break spaces inside "time 23", "machine 2", "ID 232", "clock 23" etc. |
| 1 | wide poster | the time-digit underline sat on the dashed slot border, reading as a double line | ID baseline raised 3 px, underline at baseline + 8 (9 px clear of the border) |
| 1 | phone b3–b6 | "ahead" jammed against the `time: 24` ring and ran to the canvas edge (x ≈ 706) | phone "ahead" moved to the left of the ring (anchor end), in the free gap between the columns |
| 1 | wide + phone b3 | row arrowheads touched the red ring around 237 | row arrows shortened (wide 460→516, phone 358→390) |
| 2 | all | — | re-rendered f615/f1064 both layouts and themes, then the full sets: clean |
| 3 | wide b5 / poster | "not monotonically / increasing" sat directly above "smaller than 244" in one red column, so it read as one sentence ("…increasing smaller than 244") | wide label moved up to the top of the red arrow (y 386/434 → 352/396), ~70 px clear of "smaller than 244"; full wide + phone sets re-rendered, both themes clean, copied, site-check ok |

Review-time change by another hand: the final caption became "…clock skew affects correctness." (was "breaks"),
closer to L-0072's "it affects the correctness of a system". Accepted; storyboard updated to match.

## Known limits
- The request arrows are short, so the packet is on screen < 1 s; the re-ink and the row badge carry the cue.
- The axis has no scale; even spacing of the requests is the beats', not a claim.
- Wide: "ahead" is 10 px above the first ID slot, the tightest gap in the frame; it reads as part of the red ring.

## Fix round after the critique (C-07, design-fix follow-up)
- No change to the drawing. The former "static twin" (StepThrough Fig 3·d) was removed from the page by the design fix, so the storyboard and the source comment now point at board D-08 instead.
- C-07: the desktop stage is capped at 540 px by shared CSS; the page wraps the clip in a 540 px column so play, chips, caption and clip-as-text line up under the stage.
- Re-checked: `lab.sh tsc`, `check`, `check --phone` (wide paper sheet looked at; identical to the reviewed round), `check_clip.py` OK.

## For the section writer
- Predict line (after P4): "Four requests, one after another. Watch the IDs come out."
- `<AnimationClip id="l03-clock-skew" caption="Arrival order and ID order no longer match." />` (ledger L-0071, L-0072).
- After: "One clock would fix this. That is the next idea, and its catch."
