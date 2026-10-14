# Review: l10-sawtooth ("Keep it under the cap")

Checked 2026-10-14 against `.claude/skills/explainer-animation/references/review-checklist.md`, using the renders in
`learn/animations-lab/renders/l10-sawtooth/`: wide stills and sheets (paper + blackboard), phone stills and sheets
(paper + blackboard), `l10-sawtooth.mp4`, and strips at 4.8 s (first merge), 22.8 s (crash) and 26.6 s (dial 1).
Clip: 1080 frames = 36 s, 6 beats; wide 1200×800, phone 720×1024.

## Teaching and accuracy
- [x] Motion test: the same writes replayed with only the merge interval changed; a still can't show "halve the rate,
  hit the cap". b2/b3 stills show the two outcomes, and the mp4 shows the same slope reaching the cap.
- [x] Every word traces: `disk used`, `time`, `1 TB` (L-0245, board D-15), `merge & compaction` (L-0244), `CPU spent
  merging`, `too often`, `too rarely` (L-0246), `disk full: crash` (L-0245), `1. MC freq`, `2. file rotation` /
  `threshold` (L-0247, board), `monitor the sawtooth` (L-0248). Captions are checked against the same ids.
- [x] No invented numbers: `1 TB` is the only one. The CPU bar has no scale, and the time axis has no units.
- [x] Fact-check: L-0247 is "simplified", so the B4 caption reads "This design has two knobs", not "only two". The other
  four ids are accurate. A-SSE-04 stays in the prose.
- [x] Causality: usage drops exactly at each merge tick (strip 4.8 s: the drop, the tick and the CPU chunk land on the
  same frame). The crash comes from touching the cap (strip 22.8 s).
- [x] No step-through to number against: Fig 8·c is a still, so the captions carry no step numerals.
- [x] Frame 0 (b0) is Fig 8·c's empty plot: axes, red cap, `1 TB` and the empty bar. The poster (b5) works without
  the caption: three runs, the cap, the crash, two dials, `monitor the sawtooth`.

## Match with the storyboard
- [x] Beats land at 90 / 330 / 584 / 790 / 950, with captions at the same frames. Chapter chips are 10 frames into
  each beat.
- [x] One primary motion per beat: the pen line in B1–B3, then each dial and its label in turn in B4. Ticks and CPU
  chunks are stamps synced to the drop. Known limit: in B1 the `merge & compaction` label is written while the pen
  continues.
- [x] Past runs ghost to 38%, and their lettering to 55%. Nothing is removed. The healthy run returns to full ink in B4.

## Legibility
- [x] Wide labels are 40 canvas px and the caption is 48. Phone labels are 30 and its caption 32. Everything reads on
  the 358 px phone sheet.
- [x] Captions are ≤ 2 lines and sit inside the band in every still, wide and phone.
- [x] No collisions. `too often` sits at its line's end, and `too rarely` sits right of the steep line, clear of the
  healthy peaks by ≥ 25 px. `disk full: crash` sits above the cap, and the dial column is clear of `too often`.
- [x] Strokes are 3.6–4.2 canvas px. The dashed ticks still read as dashed on the phone sheet.

## Colour and contrast
- [x] Red marks the cap, `1 TB`, the curve that hits it, the ✕ and `disk full: crash`. Everything else is graphite.
  No blue or green: there is no request or ack in this clip.
- [x] Every red cue has a second cue: the ✕ shape, the words `1 TB` and `disk full: crash`.
- [x] Blackboard: the red cap and labels read. Ghosted red lettering held at 55% stays legible. The ink3 CPU fill is
  visible on both sheets.
- [x] Colours come only from `THEMES` (tokens.ts).

## Motion quality
- [x] No zoom, bounce, pulse or slide-ins. The line reveal is linear because its speed is time (the same speed for all
  three runs). Fades use EASE_FADE and the pen uses EASE_PEN.
- [x] The pen dot rides the line tip and drops with the line (strip 4.8 s). It stops at the ✕ (strip 22.8 s).
- [x] Labels are wiped on, never popped (strips 22.8 s and 26.6 s).
- [x] Holds: B0 3 s; B1 1.3 s after the line; B2 1.0 s; B3 1.1 s; B4 1.3 s; poster 3.0 s. Captions run at 9–12 ch/s.
  At 0.5× the clip runs 72 s.

## Engineering
- [x] `lab.sh tsc l10-sawtooth` is clean. The clip is deterministic: no random, Date, timers or state.
- [x] META is complete: alt, chapters, captions, posterFrame, ledger, and phone 720×1024.
- [x] All four compositions render (wide and phone, paper and blackboard). Stills, sheets and the mp4 are in renders/.
- [x] No Studio or server left running (lab.sh only).

## Problems found and fixed
1. Round 1, phone: the plot used only the top half, leaving about 200 px empty under the CPU bar. I stretched the plot
   (axis y 500 → 560, floor 460 → 515) and moved the merge label, bar and dials down, then moved `too rarely` right
   (x 300 → 312) to keep it clear of the steeper line.
2. Round 2, phone: the CPU row sat about 10 px under `merge & compaction`. I moved it down 12 px.
3. Wide light and dark had no issues in round 1. Round 2 re-checked the poster on both phone sheets.

## Known limits
See `storyboard.md` → Known limits. In short: the B1 label overlaps the pen; the wide right column stays empty until
B4; the bar shows two fills; and the ghost red sits on the healthy line's first rise.

## Fix round 2026-10-15 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip; the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page; the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px). Same fix as lec05 C-05.
**Looked at.** Wide paper sheet (all stills) after `lab.sh check`, plus the phone run. Every label sits where it did with
more clearance, captions are one or two lines inside the band, and nothing collides. Beats, captions, chapters and the
poster story are unchanged.
