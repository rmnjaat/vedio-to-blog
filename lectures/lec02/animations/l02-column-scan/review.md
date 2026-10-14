# Review: l02-column-scan ("One average, two layouts")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every item was ticked by looking at the renders in `learn/animations-lab/renders/l02-column-scan/`: wide sheets `_sheet-{paper,blackboard}-full.png` (540 px), phone sheets `_sheet-phone-{paper,blackboard}-phone.png` (358 px), full-size stills, the mp4 `l02-column-scan.mp4` and the strips `strip-3.8.png` (B1 sweep), `strip-14.5.png` (B2 boundary), `strip-25.6.png` (B4 comb).

Clip: 1030 frames = 34.3 s (68.7 s at 0.5×). Wide 1200×800, phone 720×1040. Six beats B0–B5. Ledger taught: L-0053, L-0056, L-0057, L-0058, L-0059, L-0062.

## Teaching and accuracy
- [x] **Motion test.** The lesson is how much each layout has to touch. In the B1 strip the head passes over every hatched cell of R1 before it reaches R2. In B3 (still m3, frame 548) only the price file is being read. A still can show which cells are marked, but it can't show that the row store has to go through all of them.
- [x] **Every word traces.** Query `SELECT avg(price) WHERE ts = '…'` and "100 columns" → L-0056 (board D-01). "× 10,000" and "about 10,000 rows" → L-0057. "reads 5, uses 2" and "every row is read whole" → L-0053. "symbol, name and exchange too" and "discarding 98 of them" (board's words) → L-0058. "row boundary" and "it must find where the row ends" → L-0059. "read", "no IO" and "2 files read" → L-0062. "(naive)" → L-0055 (context). `stock_ticks` and the five columns → L-0052 (context).
- [x] **No invented numbers.** The plan's illustrative `values read: 50,000 / 20,000` counter was dropped in favour of the per-row "reads 5, uses 2". No bytes, speed-up or "5%" appears (A-DC-11 stays in prose). "Thousands of columns" (L-0060, fact-check: not typical) is not on screen.
- [x] **Simplifications listed and labelled.** The fidelity notes cover the 100-cell comb (not to scale), the price/ts positions (illustrative), side-by-side files, `ts` for timestamp, and the naive one-file-per-column model, which is labelled "(naive)" on screen from frame 0.
- [x] **Causality and direction.** There are no arrows. The only mover is the blue read head, travelling left to right in reading order.
- [x] **Step numbering.** There is no step-through for §3.2, so the clip has no step badges.
- [x] **Frame 0 and poster.** Frame 0 (still b0) is the query plus Fig 3·a's row strips R1–R3 with the header and the five column files, all graphite. The poster (frame 1029) works without its caption: "reads 100, uses 2 / discarding 98 of them" over a red comb, set against "2 files read" with read / no IO under each file.

## Match with the storyboard
- [x] **Beat timing.** Every beat lands at its planned frame (timeline.ts mirrors storyboard.yaml). The B4 event frames in the YAML were corrected to the code (header at 750, comb at 774, counter at 836, discard at 862). Captions change exactly at 0 / 100 / 330 / 520 / 730 / 920.
- [x] **One primary motion per beat.** B1: the head on one strip at a time. B2: the slow head on R3, then the tick and label. B3: the price file, then the ts file, then the labels. B4: the header, the comb sweep, then the labels, in sequence (strip-25.6).
- [x] **Past states persist.** The B1 marks stay through B3, and the B3 file marks stay to the poster. Only the 5-cell marks are removed in B4, and the 100-cell comb replaces them in the same place.

## Legibility (phone sheet, 358 px)
- [x] **Labels.** Labels are 40 canvas px (wide) and 30 canvas px (phone), and every label reads on the phone sheet. The phone layout is a real re-flow: the query on two lines, the row store full width, the files in a 3 + 2 grid, and "2 files read" in the empty sixth slot.
- [x] **Captions.** Captions are 48 px (wide) and 32 px (phone), two lines, inside the band below the dashed rule, never over the diagram.
- [x] **No overlaps** in any still, mid-motion stills included. The B4 headers "price" and "ts" sit clear of "row store" and the canvas edge, and "row boundary" sits clear of "reads … uses 2".
- [x] **Strokes.** Strokes are 3.6 px, and the read head is 6 px. The hatch is still recognisable as diagonal stripes on the phone sheet.

## Colour and contrast
- [x] **Marker meanings.** Blue = data read and used (price, ts, the read head, "read"). Red = wasted (hatched cells, "discarding 98 of them"). Graphite = everything else. Green isn't used because there is no ack.
- [x] **Second cue.** Red always comes with the diagonal hatch or the word "discarding". Blue comes with "read" or the blue header word.
- [x] **Both themes.** **Found in round 1:** on the blackboard the red hatch at 0.62 opacity read as brown, not red (`_sheet-blackboard-full`, b1–b4). **Fixed:** in dark mode the hatch is heavier (3.6 px stripes at 0.9) and the comb fill is stronger. Re-checked in `blackboard-0322` and the dark poster: the hatch now reads red. The "no IO" ink2 labels are legible in both themes.
- [x] **No hard-coded colours.** Every colour comes from `THEMES` (tokens.ts).

## Motion quality
- [x] **Nothing decorative.** No zoom, bounce or pulsing.
- [x] **Easing.** Linear easing is used only for the read-head sweeps, where speed means reading. Everything else uses EASE_PEN / EASE_FADE from anim.ts.
- [x] **Cell fills follow the head.** Each cell fills at the moment the head reaches it (strip-3.8). There are no packets in this clip.
- [x] **Labels are wiped on.** "row boundary" is written left to right (strip-14.5). Nothing pops in.
- [x] **Holds.** B0 is 3.3 s. Every beat holds 1.07–1.27 s after its last motion. The final hold is 3.7 s. The densest caption is 70 characters over 7 s, which is 10 cps.
- [x] **Length.** 34.3 s, within 10–40 s.

## Engineering
- [x] **Types.** `pipeline/bin/lab.sh tsc l02-column-scan` → `tsc ok`.
- [x] **Deterministic.** No random, Date, timers or state.
- [x] **META.** Includes id, title, ledger, width/height, phone {720, 1040}, fps, duration, posterFrame, chapters (10 frames into each beat: 110, 340, 530, 740), captions and alt (which describes the mechanism).
- [x] **Compositions.** Wide and phone each render in paper and blackboard.
- [x] **Renders.** Stills, four contact sheets, the mp4 and three strips are in `renders/l02-column-scan/`.
- [x] **Cleanup.** No studio or server was left running (all renders went through `lab.sh`).

## Problems found and fixed (render-check rounds)
1. **Round 1, dark.** The wasted-cell hatch looked brown on the blackboard. Fixed with heavier dark-mode hatch and comb ink.
2. **Round 1, phone/wide B4.** The blue price/ts columns in the 100-cell comb were slivers that blended into the strip outline. Fixed: each gets a blue cap 5 px above and below the strip, still one cell wide (not widened, which would misstate 2 of 100).
3. **Storyboard vs code.** The B4 event frames in the YAML disagreed with timeline.ts. The YAML was corrected to the code. The page caption was aligned with `clips.json`.
4. **Round 2 (after the fixes).** A full re-render of both layouts and both themes found nothing further.

## Known limits
- The 100-cell comb is not to scale, and the price/ts positions are illustrative.
- In B4 the column store still draws five files, not 100. "2 files read" and the caption carry the comparison.
- The column files sit side by side (Fig 3·b-like) where Fig 3·a stacks them.
- A few stray single-frame debug stills (`*-f322.png`, `*-f1029.png`) remain in `stills/`. Deleting them needed approval, which was unavailable. They are not part of the sheets.

## For the section writer
- Predict line (before the clip, after P1): "Five columns, 10,000 rows. How much does each layout read to answer one average?"
- `<AnimationClip>` caption: "SELECT avg(price) on 10,000 rows: the row store reads every row whole and discards three columns; the column store opens two files. With 100 columns it is 100 against 2."
