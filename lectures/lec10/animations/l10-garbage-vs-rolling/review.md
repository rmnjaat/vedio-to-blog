# Review: l10-garbage-vs-rolling ("Same path vs a rolling deployment", §6.4)

1072 frames (35.7 s) at 30 fps, 6 beats (B0–B5), wide 1200×800 and phone 720×1050. Renders in
`learn/animations-lab/renders/l10-garbage-vs-rolling/` (stills + sheets for paper/blackboard × wide/phone, mp4, strips).

## Render-check rounds

**Round 1** (stills from the earlier build, re-rendered fresh; wide + phone, light + dark):
1. Phone: `GET apple` sat at the top right above the job box, so it read as a label on the job, far from the answer bars. → Moved to the `reload` row, right-anchored over the top tracks (`phone-paper-1071-b5-poster.png`).
2. Phone: the bottom lane's dashed deploy line ran down x 690, 27 px from the dashed upload trail (x 663): two parallel dashes that read as one path. → On the phone the job's v2 chip sits at the job's left and `job` at its right, so the upload trail drops at x ≈ 557, 133 px clear of the deploy line; no crossings.
3. No on-screen cue that the bars are a time axis. → Hand `time →` (ink2) under the tracks, right-anchored; the red label shortened from `until each one reloads` to `until each reloads` so the two fit on one row (wide). Phone: top lane only (bottom under-row is full; one shared scale).
4. Wide: `meta.json: dict2` ended 8 px from the api boxes. → Listing moved 6 px left (x 34, bracket x 22).

**Round 2** (all 11 stills × 4 sheets): no issues found. Posters on their own tell both stories.

**Motion** (mp4 + strips at 3.8 s, 9.9 s, 19.8 s, 25.8 s): v2 chip rides its dashed trail with the pen tip; dict1's v1 → v2 swap is one fade; server tags re-ink red then swap on reload with a wipe; old boxes fade while new boxes are pen-drawn; labels wipe left→right. No teleports, no pop-ins, one primary motion at a time (the playhead/bars are the slow indicator the captions talk about).

## Checklist

### Teaching and accuracy
- [x] Motion test: the window (top) vs the handover (bottom) only exists over time; both end states look alike (all v2). Poster shows both bars side by side.
- [x] Every word traces: `same path` L-0157; `new path`, `dict1`/`dict2` L-0161 + D-06; `meta.json` L-0177/L-0196; `deploy` L-0178/L-0183; `reload`, `until each reloads` L-0159; `garbage` L-0158; `a fruit`/`a round fruit` L-0129 (context); `boots: reads meta.json` L-0177; `never garbage`, "eventually consistent" L-0184; `v1`/`v2` illustrative (fidelity note); `time →` axis label.
- [x] No invented numbers: no seconds, intervals, counts, offsets.
- [x] Fact-check: S3 overwrite is drawn atomic (L-0153/L-0157 clarification, A-D-05); upload failure/corruption not shown; A-D-14 new-before-old left to prose.
- [x] Causality: deploy arrow head at the servers (job initiates); upload trail leaves the job.
- [x] Frame 0 = the two-lane static figure (`paper-0100-b0-intro.png`); last frame = annotated poster.

### Match with the storyboard
- [x] Beats at 0/105/292/480/684/966, captions on their beat frames; chapters 10 f in.
- [x] One primary motion per beat (B1 swap → red; B2 reloads one at a time; B3 upload → meta.json → deploy in order; B4 replacements one at a time).
- [x] Top lane ghosts to 38% in B3–B4 (`paper-0678-b3-new-path.png`, `paper-0960-b4-roll.png`) and returns to full ink in B5; nothing removed except old→new tags/boxes in place.

### Legibility
- [x] Wide lettering 40 px, captions 48; phone lettering 30, captions 32; all readable on `_sheet-phone-*-phone.png` and `_sheet-*-phone-shrunk.png`.
- [x] Captions ≤ 2 lines inside the band (wide y 652, phone y 942).
- [x] No label/line overlaps in any still incl. mid-motion (`m1-upload` 132, `m2-garbage` 248, `m3-reload` 352, `m4-deploy` 618, `m5-replace` 794).
- [x] Strokes and dashes visible at phone size.

### Colour and contrast
- [x] Red = garbage/stale tags/window, green = new correct answer, graphite = old-but-consistent `a fruit`, everything else ink. Each colour paired with ✕ / ✓ / a word.
- [x] Blackboard sheets: all colours flip; ghosted red/green labels faint but readable.
- [x] Colours only from tokens (`THEMES[theme]`).

### Motion quality
- [x] No zoom/bounce/particles; easing from `anim.ts`; linear only for the playhead (time).
- [x] Holds: B0 3.5 s; ≥ 32 f after each beat's last motion; final hold 3.5 s; captions 10–16 chars/s.
- [x] 35.7 s total (71 s at 0.5×).

### Engineering
- [x] `lab.sh tsc` clean; deterministic (seeded `random`, frame-driven only).
- [x] META complete (alt, chapters, captions, posterFrame, phone); STILLS = beat ends + 5 mid-motion + poster.
- [x] Both themes and both layouts render; mp4 rendered once.

## Known limits
- `time →` has no "(not to scale)" (no room); fidelity notes cover it.
- Only row 1 of each lane is worded; rows 2–3 carry ✕/✓ only.
- Phone bottom lane has no `time →` (shared scale with the top lane).
- A replaced server's bar keeps growing during its swap (answers for that slot behind the LB), not per-request routing.

## For the section writer
- Caption: "At the same path, servers read the new file with last week's offsets and serve garbage until each reloads. With a new path, meta.json and a rolling deployment, answers are briefly mixed but never garbage."
- Predict: "Same new file, two ways to switch. In which one does a user ever get bytes from the middle of another word?"

## Fix round 2026-10-15 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip; the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page; the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px). Same fix as lec05 C-05.
**Looked at.** Wide paper sheet (all stills) after `lab.sh check`, plus the phone run. Every label sits where it did with
more clearance, captions are one or two lines inside the band, and nothing collides. Beats, captions, chapters and the
poster story are unchanged.
