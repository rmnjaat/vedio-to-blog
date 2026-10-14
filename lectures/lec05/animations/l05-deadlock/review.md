# Review: l05-deadlock ("One cycle")

Checked 2026-10-13 against `references/review-checklist.md` by looking at renders in
`learn/animations-lab/renders/l05-deadlock/`: wide sheets `_sheet-paper-full.png` and `_sheet-blackboard-full.png`
(540 px cells), phone sheets `_sheet-phone-paper-phone.png` and `_sheet-phone-blackboard-phone.png` (358 px cells),
full-size posters, `l05-deadlock.mp4`, and strips `strip-7.0.png`, `strip-15.3.png`, `strip-20.6.png`, `strip-25.0.png`.
The clip is 1020 f (34.0 s) with 7 beats. Wide is 1200×800 and phone is 720×1000.

## Render-check rounds
**Round 0 (before code, timing arithmetic).** The draft timeline had a final hold of 72 f (2.4 s, under 2.5 s) and only 26 f of hold after B1's last motion. I fixed both: the duration went to 1020, and B1's events were tightened (hold1 90+28, lock1 114, holds label 120+16, hold2 138+26, lock2 160). I also moved the phone canvas from 960 to 1000 so a 3-line caption still fits inside the band.

**Round 1 (light wide).** Every beat matched the storyboard. Problems found:
1. `commits✓` touched T1's circle on the left and its tick touched the word. Fix: text starts at x 268 and the tick moved to x 462.
2. `retry` almost touched T2's circle. Fix: anchor-end moved from 940 to 930.

**Round 2 (phone, light + dark).** The re-flow read well at 358 px, and all lettering was legible. Problems found:
1. The phone `commits✓` tick was too tight. Fix: tick moved to x 436.
2. On the blackboard sheet, the ghosted red `cycle` at 38 % was nearly illegible. Fix: the label now ghosts to 55 % (its lines stay at 38 %). This is recorded in fidelity_notes.

**Round 3 (all four sheets re-rendered after the last code change).** Nothing new came up. The dark wide sheet's `cycle` is now readable, and every marker colour flips.

**Round 4 (final render-check after the storyboard copy was refreshed).** All four sheets were re-rendered and looked at again: wide light and dark at 540 px, phone light and dark at 358 px. They match rounds 1–3 and nothing new came up. The mid-grant still (786) briefly shows row 1 without a padlock while T1's green line is drawing. This is intended, because the slot changes owner. The validator now passes.

**Motion (mp4 strips).**
- 7.0 s: the blue packet rides the pen tip on T1 → row 1, the chevron inks at the end, and `wants` is wiped on afterwards.
- 15.3 s: the red loop is traced leg by leg (T1 → row 1, row 1 → T2, …), with nothing else moving.
- 20.6 s: T2's circle is re-inked red from 12 o'clock, then T2's `waits` fades out.
- 25.0 s: T2's padlock and T2's half fade, T1's red legs return to graphite, then the green pen draws T1 → row 1.

There are no jumps or pops, and only one primary motion runs at a time.

## Checklist
### Teaching and accuracy
- [x] **Motion test.** The order of the waits is the lesson: one wait (B2, held 3.3 s) is harmless, and the second wait closes the loop. A still can't show that.
- [x] **Every word traces to a source.** The words map as follows:
  - `holds`, `wants`, `waits`: L-0026 and L-0096
  - `cycle`: L-0032
  - `deadlock detected`: L-0031 and L-0025
  - `rolled back`: L-0033, softened per SN-04
  - `ERROR 1213`: A-C-02, sourced
  - `retry`: A-C-02 / SN-04
  - `commits ✓`: L-0033 ("the other proceeds")
  - `lock rows in one order`: L-0028 + A-C-04
  - The captions use the same items.
- [x] **Nothing invented.** There are no timing numbers, no detection delay (deadlock_timeout is left to prose), and no claim about why T2 was chosen. "Kills itself" does not appear in the clip.
- [x] **Simplifications are listed in fidelity_notes.** These are the request order, the victim, orthogonal routing, and the 55 % label ghost.
- [x] **Causality.** The `wants` heads sit at the row, because the requester points at what it wants. The `holds` lines have no head. The loop direction is T1 → row 1 → T2 → row 2 → T1.
- [x] **Step numbering.** The page has no step-through, so the clip has no badges.
- [x] **Frame 0 and poster.** Frame 0 (still b0, frame 72) shows the Fig 1·e parts without edges. The poster (1019) works without its caption: the stamp, T1 with `commits ✓` and both padlocks, T2 red with `ERROR 1213 / rolled back / retry`, the ghosted half-loop, and the fix note.

### Match with the storyboard
- [x] Every beat sits at its planned frames, since `timeline.ts` mirrors the YAML. Each caption appears with its event, and motion starts 10 f after the cue.
- [x] Each beat has one primary motion.
- [x] **Past states ghost; removals are replacements in place.** T2's side ghosts to 38 %. The two `waits` labels are removed and replaced in the same place by `commits ✓` and `retry`. T2's padlock is replaced by T1's in the same slot.

### Legibility
- [x] **Lettering sizes.** Wide lettering is 40 px and phone lettering is 30 px. Both read on their sheets without zooming.
- [x] **Captions.** Captions are 48 px wide and 32 px on phone, at most 2 lines, inside the band, and never over the diagram. The longest is 67 characters.
- [x] **No overlaps in any still, mid-motion stills included.** This holds after the round-1 and round-2 fixes.
- [x] **Strokes.** Strokes are 3.6 px. Ghosted lines are faint but visible on both sheets.

### Colour and contrast
- [x] **Marker colours.** Blue is the request (`wants` in flight) and graphite is the settled wait. Green marks a granted lock, the grant, and the commit. Red marks the cycle, the stamp, the victim, and the error.
- [x] **Second cues.** The padlock shape, the hourglass plus `waits`, the word `cycle`, `rolled back`, and the ✓ tick (a drawn stroke, not a font glyph).
- [x] **Contrast.** Marker text is readable in both themes. The ghosted `cycle` sits at 55 %.
- [x] **No hard-coded colours.** All colours come from THEMES. The padlock fill uses `greenWash`.

### Motion quality
- [x] No decorative motion. Easing comes from anim.ts. Packets ride their lines. Labels are wiped on.
- [x] **Holds.**
  - B0 is 80 f.
  - Each beat holds ≥ 30 f after its last motion: B1 32, B2 ~98, B3 38, B4 38, B5 34.
  - The final hold is 92 f (3.07 s).
  - Every caption stays up for ≥ max(2.5 s, chars/17).
- [x] **Length.** The clip is 34 s, which is 68 s at 0.5×.

### Engineering
- [x] `pipeline/bin/lab.sh tsc l05-deadlock` returns ok.
- [x] **Deterministic.** The hand geometry uses seeded `random()`. There is no Date, timer, or CSS transition.
- [x] **META is complete.** It has id, title, width/height, fps, durationInFrames, posterFrame = last frame, chapters (10 f into each beat), captions, alt, ledger, and phone {720, 1000}.
- [x] **All four compositions render** (wide and phone, paper and blackboard), and the stills, sheets, and mp4 are in renders/.
- [x] No Studio or server was left running. All renders went through lab.sh.

## Known limits
- Each row has one padlock slot, so who holds a row is read from its line.
- T1's granted arrow keeps its head in the poster, and there is no separate "holds" line for row 1.
- The phone layout leaves the band under T2 empty until B4, because that is where the verdicts land.
- The clip names InnoDB's error code. The page's SourceNote SN-04 gives the other engines' victim rules.

## For the section writer
- **Predict line (before the clip):** "T1 holds row 2, T2 holds row 1, and each now asks for the other's. What does the database do?"
- **Caption (`<AnimationClip>`):** "One wait is harmless; the second wait in the opposite order closes the cycle. The engine rolls one transaction back (InnoDB picks the smaller one) and your code retries it. Lock rows in the same order and the loop can't form."
- **After the clip:** SN-04.

## Fix round 2026-10-14 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip, the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page, the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px).
**Looked at.** Wide paper + blackboard sheets and the poster (1019) at full size; phone paper sheet. Every label
sits where it did with more clearance; captions are one or two lines inside the band; no collisions. Beats, captions,
chapters and the poster story are unchanged.
