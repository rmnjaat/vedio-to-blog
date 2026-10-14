# Review: l03-offset-vs-keyset ("Page 1, page 10, page 1,000")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`, ticked against the renders in
`learn/animations-lab/renders/l03-offset-vs-keyset/` (wide sheets at 540 px, phone sheets at 358 px, paper + blackboard, mp4 strips).
Wide 1200×800, phone 720×1064, 1140 frames (38 s; 76 s at 0.5×).

## Render-check rounds
**Round 1 (light, wide).**
1. Poster/b5: the ✕ after "grows with depth" and the ✓ after "same at any depth" sat on the final "h". Fixed: marks moved right (wide +400 / +422, phone +302 / +320).
2. b0: the ID-limit glyph (three nodes in a diagonal line) read as a chain, not an index. Fixed: it is now a small tree (a root and two children). The seek goes root → right child → the ringed ten rows, and the left child shows the branching.
3. b3: the caption wrapped as "ID-" / "limit". Fixed: a word joiner (U+2060) after the hyphen in every caption that says ID-limit.

**Round 2 (wide light + dark, phone light + dark).**
4. Phone: each `OFFSET n` label sat almost on the strip of the row above it (rows 70 px apart). Fixed: offset rows are now 76 px apart and labels sit higher in the row, the ID block moves down 14 px, notes and the caption band move with it, and the phone canvas grows from 1050 to 1064.
5. Wide dark and wide light after round 1: no new problems.

**Round 3 (phone light + dark after fix 4, final wide re-render).** Labels clear the strips. The ID root clears the header rule. Nothing crosses anything else. Both themes pass.

## Checklist
### Teaching and accuracy
- [x] Motion test: the lesson is the offset walk restarting at row 1 on every page and taking longer each time (the pen speed is constant, so page 1,000's walk takes 4 s), against one identical short seek. A still shows the lengths but not the re-walk or the time.
- [x] Every word traces to a source. Headers "limit-offset"/"ID-limit" (L-0217, L-0225). `LIMIT 10 OFFSET m`, `OFFSET 0/90/990/9990` (L-0217, L-0224, Fig 8·a). `WHERE id > last`, `LIMIT 10`, `id > 90/990/9990` (L-0228). "computed, thrown away" (L-0224, Fig 8·a). "log n + 10 rows", "same at any depth" (L-0233). "grows with depth" (L-0218/L-0224). The B6 caption is clips.json's page caption (L-0227 + L-0229 in SN-15's wording).
- [x] No invented numbers: no times or units. The offsets are only the arithmetic of LIMIT 10. The depths are illustrative (fidelity notes).
- [x] Simplifications are listed in `fidelity_notes`: gap-free IDs, the ring as a highlight that is not to scale, no ORDER BY on screen, the index seek rather than physical order (SN-15).
- [x] Causality: the offset walk always starts at row 1. The ID seek goes down the index to the rows. No arrowheads are needed (no initiator/target pair).
- [x] Step numbering: Fig 8·a is not a step-through. The clip has no step numerals; chapters are pages.
- [x] Frame 0 is Fig 8·a's two mechanisms laid out as a table. The poster is a complete summary that reads without the caption (staircase vs identical seeks, with ✕/✓ verdicts).

### Match with the storyboard
- [x] Beats at their planned frames: b1 225, b2 415, b3 575, b4 865 and b5 1035 each show their beat's end state. Mid stills: 292 (descent half drawn), 660 (walk half way), 932 ("grows with dept" mid-wipe).
- [x] One primary motion at a time: within each page the offset walk runs first, then the ID seek, then the label.
- [x] Past rows ghost to 38% when the next page starts. B5 brings all four rows back to full ink so they can be compared (storyboard event at 872).

### Legibility
- [x] Wide labels are 40 px and the caption 48 px. Phone labels are 30 px and the caption 32 px. Both are readable on the 358 px phone sheet, ghosted rows included.
- [x] Captions stay inside the band, at most 2 lines, never over the diagram.
- [x] No overlaps in any still (fixes 1 and 4).
- [x] Strokes: the strip outline is 2.8 px, the walk 11 (wide) / 9 (phone), the rings 3.6.

### Colour and contrast
- [x] Blue is the data path (the seek path and the ten rows returned). Red is the cost (page 1,000's walk, "grows with depth"). Green is "same at any depth". Everything else is graphite.
- [x] Every colour has a second cue: ✕ with red, ✓ with green, the ring shape for the returned rows.
- [x] Both themes are readable (blackboard sheets checked). Tokens come only from `THEMES`: `T.sheet`, `T.blueWash`, `T.red`, `T.green`.

### Motion quality
Motion check, mp4 `renders/l03-offset-vs-keyset/l03-offset-vs-keyset.mp4`, strips at 10 fps:
- `strip-3.5.png` (page 1): `OFFSET 0` wipes on left to right, then the blue ring and bar ink in. Nothing pops in.
- `strip-19.8.png` (page 1,000): the label is written, then the walk grows by the same amount each frame (linear: speed means work). Rows 1–3 are at 38%. The ID side doesn't move while the walk runs.
- `strip-29.4.png` (compare): the rows return to full ink, then the red re-ink runs along the trail, then "grows with depth" starts writing. These are strictly in sequence.
- [x] No decorative motion: no zoom, bounce, pulse or slide-in.
- [x] Easing comes from `anim.ts` (EASE_PEN for pen and lettering, EASE_MOVE for the seek, EASE_FADE for ghosting). Linear is used only for the walks and the red re-ink, where speed is the cost.
- [x] Labels are wiped on, never typed or faded up. Marks (✕ ✓) fade in over 8 f, as the stamp rule allows.
- [x] Holds: B0 100 f, poster 100 f. After each beat's last motion: B1 44, B2 60, B3 54, B4 48, B5 42 f (all ≥ 30). Each caption is up ≥ max(2.5 s, chars/17).
- [x] 38 s total, 76 s at 0.5×.
- [x] Both compositions, wide and phone, render in paper and blackboard. No Studio or dev server was started; everything ran through `lab.sh` under the lock.

### Engineering
- [x] `lab.sh tsc` is clean. The code is deterministic: frame-only, no random, no state.
- [x] META is complete: alt, chapters 10 f into each beat, captions, posterFrame 1139, phone canvas, ledger.

## Known limits
- Page 10's walk is 4 px. That is true to scale, and it is the point that small depths barely differ (L-0230), but it is nearly invisible. The `OFFSET 90` label and the caption carry it.
- The ring around the ten returned rows is the same size at every depth. It is a highlight, not to scale.
- IDs are drawn gap-free, so `id > 90` equals `OFFSET 90`. Real IDs have gaps; only their order matters (prose 8.3).
