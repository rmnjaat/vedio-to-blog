# Review: l05-wait-vs-skip

The checklist is `.claude/skills/explainer-animation/references/review-checklist.md`. Every line was judged from renders in `learn/animations-lab/renders/l05-wait-vs-skip/`:
- stills and contact sheets: wide 540 px and phone 358 px, paper and blackboard
- the mp4, with strips at 3.4 s, 8.3 s, 18.2 s, 24.3 s, 26.6 s and 35.8 s

The clip is 1186 frames (39.5 s) with 7 beats.

## Teaching and accuracy
- [x] **Motion test.** Both lanes end on the same seat map (stills b4/b5 look the same in the strips), so a still would hide the lesson. The queue at one seat (b1, b2), the re-check rounds (m2) and the stream of skipping dots (m4, m5) exist only in motion.
- [x] **Every word traces to the ledger.**
  - Captions: L-0112, L-0113, L-0115, L-0155, L-0122, L-0121, L-0119.
  - Labels: "119 wait…116 wait" (L-0113), "re-check" (L-0115, with the fact-check wording A-C-11), "up to 7,260 evaluations" (L-0155, the page's arithmetic), "about 120 evaluations" (L-0154), "1.7 s" / "147 ms" / "≈ 1/10 the time" (L-0121), "two words" (L-0119), "…20F" (L-0112's terminal 1-A … 20-F).
  - "waits, re-checks" and "skips, never waits" summarise L-0113/L-0115 and L-0122.
- [x] **Nothing invented.**
  - There are no per-seat timings and no running clock numbers. The bars are proportional to the seats booked.
  - The worst-case count is labelled "up to", and the 10× is "in this demo" (fact-check L-0123).
  - The bottom lane never shows a re-check (L-0306).
- [x] **Simplifications are listed in `fidelity_notes`**: symbolic dot counts, the sequential runs, the shared-scale bars, and the 1.7 s class figure against the 1.25/1.73/1.79 s shown on screen. Playback is labelled "slowed down" on screen.
- [x] **Causality.** The lock holder is the dot over the seat (green, padlock). Waiters are graphite with an hourglass and are never red (figures.md rule). The re-check happens after the commit (m2: 1A booked, then the crowd turns blue).
- [x] **Step numbering.** There are no step badges, because Fig 2·e's four steps are a different granularity. Nothing contradicts that figure.
- [x] **Frame 0 = the static twin; the poster works alone.**
  - Frame 0 (b0) is the two lanes with crowds, empty seats and empty tracks.
  - The poster (b6) has both strips green with ✓, the bars 1.7 s vs 147 ms, the counters, the lane tags and the "two words" underline, and reads without its caption.

## Match with the storyboard
- [x] **Beats are at their planned frames.** b1 at 234: 1A locked, "119 wait", 120 evaluations. b2 at 532: 1A–1C booked, 1D held, "116 wait", 474. b3 at 712: all green, 1.7 s, up to 7,260. b4 at 948: 147 ms, about 120. b5 at 1058: ≈ 1/10. b6 at 1185: the poster.
- [x] **One primary motion per beat.**
  - The bar and counter are secondary indicators that the captions talk about.
  - In B4 the dots leave one after another: one wave. Strip 24.3 shows that several dots in flight read as a single stream.
- [x] **Nothing vanishes unreplaced.**
  - Labels are removed only when they are replaced in the same place: "N wait" ↔ "re-check".
  - The bottom dashed track fades only as "147 ms ≈ 1/10" is written over it.
  - Dots fade only as they become booked seats.
  - The past state persists as booked seats, so no ghosting was needed.

## Legibility (phone sheet at 358 px, wide sheet at 540 px)
- [x] **Label sizes.** Labels are 40 px (wide) and 30 px (phone), and captions 48/32. Everything on the phone sheet is readable, including the "re-check" and "N wait" labels.
- [x] **Captions** are ≤ 70 characters, take 2 lines, and stay inside the band in both layouts.
- [x] **No overlaps** in any still after the fixes below.
- [x] **Strokes.** Seat outlines are 2.8 px when free and 3.6 px when locked or booked. The bar is 8 px. The dashed track stays visible as a dotted line on both sheets.

## Colour and contrast
- [x] **Marker colours.**
  - Blue: a query being evaluated (crowd sliding or re-checking, dots travelling).
  - Green: lock granted (padlock, holder dot) and seat booked (outline plus fill, ✓ at the tail).
  - Graphite: waiting and everything else.
  - There is no red, because nothing fails.
- [x] **Every colour has a second cue**: the padlock shape, the fill, ✓, the word "re-check", or the hourglass.
- [x] **Both themes are readable.**
  - Blackboard sheets: green fills, blue dots and ink2 tags are all readable.
  - The seat labels stay ink on the light green fill in paper, and on the dark green fill in blackboard.
- [x] **No hard-coded colours.** Everything comes from `THEMES`. The booked fill is `T.green` at fillOpacity 0.2.

## Motion quality
- [x] **No decorative motion.** There is no zoom, bounce or pulsing. The crowd turns blue once per re-check event.
- [x] **Easing.**
  - From `anim.ts`: EASE_MOVE for the slides and dots, EASE_PEN for writing, EASE_FADE for fades.
  - Linear only for the fast-forward and the bars (seats booked over time).
- [x] **Dots ride their rails.** Strips 24.3 and 26.6 show no jumps.
- [x] **Labels are written with a wipe** (visible in m2: "re-chec").
- [x] **Holds.** B0 is 3.2 s. Every beat holds ≥ 1 s after its last motion (B2: 504 → 540; B3: 690 → 720; B4: 932 → 956). The final hold is 1110 → 1186 = 2.5 s. Every caption is up longer than chars/17.
- [x] **Length.** 39.5 s total, 79 s at 0.5×.

## Engineering
- [x] **Type-check:** `lab.sh tsc` is clean.
- [x] **Deterministic:** no random, Date, state or timers.
- [x] **META** has the alt text (the mechanism), 5 chapters at beat + 10, captions, the poster frame, the ledger and the phone canvas 720×900.
- [x] **All four compositions render:** wide/phone × paper/blackboard.
- [x] **Renders:** stills, the four sheets, the mp4 and the strips are in `renders/l05-wait-vs-skip/`. No Studio or server was left running.

## Problems found and fixed
1. **Round 1 (wide paper).** The bottom lane's dashed track ran through "147 ms ≈ 1/10 the time", so a label crossed a line. Fixed: the bottom track fades out as the reading is written in its place. The top track is covered by the full bar.
2. **Round 1.** The SKIP LOCKED stream dots started at the centre of the crowd and overlapped the waiting dots. Fixed: they now leave from the crowd's right edge.
3. **Round 2 (phone paper).** "waits, re-checks" ran into "slowed down" on the phone title row. Fixed: on phone, "slowed down" has its own line at y 40, the lanes moved down 26 px and the caption band moved to 756.
4. **Round 2 (m5 wide).** A committing dot dropped onto its seat label ("2B") for a few frames. Fixed: dots now sink to the seat's top edge as they fade.
5. **Design change against `animations.md`.** I replaced the plan's simultaneous lanes and running clocks with sequential runs and shared-scale time bars. The reason is one motion at a time and no invented mid-run numbers. This is recorded in the storyboard.

## Known limits
- On-screen durations (about 14 s vs 6 s) are not the real ratio. The bars carry the real ratio, and both the caption and the "slowed down" label say so.
- The crowd and stream dots are symbolic (at most 12 drawn). The counters and labels carry the real numbers.
- The bottom time bar is short by design: 35 px wide and 24 px on phone. That is the point of the clip.
- The 1.7 s figure is the class's quote. The runs printed 1.25, 1.73 and 1.79 s; Table T2 and the prose give those numbers.

## Fix round 2026-10-14 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip, the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page, the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px).
**Also.** The two time bars were 8 px (3.6 px on the page, heavier than any sheet stroke); now 7 px (≈ 3.2 px, the
sheets' `.heavy`). **Looked at.** Wide paper + blackboard sheets (all 12 stills incl. the stream mid-frames) and the
poster; phone sheets. Readings, counters and `two words` read cleanly; no collisions. Beats, captions, chapters
unchanged.
