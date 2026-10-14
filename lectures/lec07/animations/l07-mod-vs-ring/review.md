# Review: l07-mod-vs-ring ("Add one node")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. I ticked each item by looking at the renders in
`learn/animations-lab/renders/l07-mod-vs-ring/`:
- wide sheets at 540 px and phone sheets at 358 px, paper and blackboard;
- full-size stills `paper-1179-b5-poster`, `paper-1040-b4-c5` and `phone-paper-1179-b5-poster`;
- mp4 strips `strip-5.3` (recheck), `strip-9.7` (K6 slide), `strip-17.9` (ring pen) and `strip-29.4` (c5 packets).

The clip runs 1180 frames, which is 39.3 s at 1× and 78.7 s at 0.5×. Wide is 1200×800 and phone is 720×1070.

## Teaching and accuracy
- [x] **Motion test.** On the left, every key is rechecked one by one and three of them travel. On the right, four keys and their arrows never move while two re-point. Two still pictures would show where the keys end up, but not that `% N` touches every key while the ring leaves the rest alone.
- [x] **Every word traces to the ledger or a listed addition.**
  - `node = h % 2 → 3` and the recheck caption trace to L-0272.
  - The three moves trace to L-0273, using the board's exact mapping: K6 and K2 go c0→c2, K5 goes c1→c0.
  - `3 of 6 moved = 50%` traces to L-0274.
  - c5 at 1 taking K1 traces to L-0291.
  - `(12, 1]` and "all from one neighbour" trace to L-0292. This matches the fact-check on L-0293: only the successor hands over keys.
  - The two tallies trace to L-0294.
  - The ring caption traces to L-0288 and L-0289 (context).
  - The averages are the sourced addition in `storyboard.yaml`, which is already a page addition in `factcheck_applied.md` §6.
- [x] **No invented numbers.** The ring keys K2–K6 are at page-made positions, and `2 of 6` is the honest tally for that layout. Both are listed in fidelity_notes.
- [x] **Simplifications are listed.** These are the c1..c5 names, the ring's own positions, the different N on the two sides (as on the board), and the fact that the copy procedure (§6.4) is not shown.
- [x] **Causality.**
  - Each ownership arrow runs clockwise from the key and its head lands just short of the owner node. I checked this after round 2 (below).
  - The data packets travel from c1, the old owner, to c5.
- [x] **Frame 0 and poster.** Frame 0 is Fig 6·a's first table, drawn as nodes. The poster works without the caption: it shows both panels, both tallies and both averages.

## Match with the storyboard
- [x] **Beat timing.** Beats start at 0, 90, 282, 528, 790 and 1050, and each caption starts its beat. The stills at 80, 275, 520, 780, 1040 and 1179 each show their beat's complete state.
- [x] **One primary motion at a time.** The recheck runs as a sequential re-ink (strip-5.3). The moves happen one key at a time (strip-9.7). On the ring, the packet runs first and the arrow re-pen follows (strip-29.4).
- [x] **Ghosting.**
  - The left panel ghosts to 38% during ③–④ and returns to full ink for the summary. Its tally stays at full ink throughout.
  - Old arrows for K1 and K6 ghost; they are not removed.
  - Vacated slots stay as dashed red outlines.

## Legibility
- [x] **Sizes.** Wide lettering is 40 and captions are 48. Phone lettering is 30 and captions are 32. Everything is readable on the 358 px phone sheet.
- [x] **Captions** are at most 66 characters and at most 2 lines, inside the band.
- [x] **No overlaps.** I checked the slice label against K6 and K1, the position numbers against the node boxes, and the moving chips, which use the lane under the stacks and never cross another chip.
- [x] **Strokes** are 3.6 (thin 2.8). The dashed outlines still read as dashed on the phone sheet.

## Colour and contrast
- [x] **Colour meanings.**
  - Blue is the recheck, a lookup.
  - Red marks moved keys, the slice, the data packets and the tallies. Each red element has a second cue: the `*`, a dashed empty slot, a re-pointed arrow, or the word "moved".
  - Everything else is graphite.
- [x] **Dark theme.** All colours flip on the blackboard. Ghosted red chips are faint but readable, which is acceptable for past context.
- [x] **No hard-coded colours.** Everything comes from `THEMES`.

## Motion quality
- [x] No zoom, bounce or pulsing. Easing comes from `anim.ts`: EASE_MOVE for slides and packets, EASE_PEN for pens and writes.
- [x] Labels are written on with a wipe. The changed digit is wiped out and rewritten in the same place.
- [x] **Holds.**
  - B0 is 3 s and the final hold is 2.7 s after the last write.
  - Each beat holds at least 1 s after its last motion.
  - Every caption is up for longer than chars/17.

## Engineering
- [x] `lab.sh tsc` is clean.
- [x] The clip is deterministic.
- [x] META is complete, including `phone`, chapters 10 f into each beat, captions, alt and posterFrame.
- [x] Four compositions render: wide and phone, each in both themes.
- [x] The stills, sheets, mp4 and strips are in `renders/`.
- [x] The site copy builds (`site-check ok`).

## Problems found and fixed
1. **Round 1, wide poster.** The ownership arrows ran on a track only 32 px inside the ring, so they read as a doubled ring. Their heads stopped under the node boxes, where they were hidden. I moved the tracks deeper, to r−52, r−74 and r−96.
2. **Round 1, tallies.** SVG collapsed the leading space, so the tally read "3of 6". I positioned the tally text explicitly.
3. **Round 2.** The arrows still ended in empty space inside the ring. I added a radial last leg that stops 8 px short of the owner's box, computed from where the ray meets the box edge. Keys with the same owner now merge into one head at that owner.
4. **Phone, round 1.** The ring was small (r 140) and there was spare room. I tightened the top panel and enlarged the ring to r 155.

## Fixes after the page critic (C-03, C-17)
- **C-03, ring redrawn in Fig 6·d's hand.** The storyboard changed first (glyphs, B3 and B4 events), then the code.
  - Nodes are small 50×20 rectangles straddling the circle (phone 44×18). Names sit outside, 12 px from the box. Position numbers sit inside at r−56 (phone r−50).
  - Keys are hatched 22 px squares on the circle (Fig 6·d's key glyph), with names inside at r−56.
  - Only the keys that move get arrows. ③ draws K1 → c1 inside the ring, the board's arrow. In ④, K6 → c5 (outer track, r+42) and K1 → c5 (inner track, r+20) are short red clockwise arcs outside the ring, each with a radial lead from its key. K1's old arrow ghosts to 38%. The arcs and the old arrow never overlap.
  - The slice (12, 1] is a translucent red band laid on the ring under the two arcs, labelled outside at the top-left.
  - Ring: wide centre (900, 290), r 180; phone (360, 640), r 160.
  - The poster now shows "only K1 and K6 moved" at a glance: two red keys, two red arcs into c5, and the band.
- **C-17, wide lettering.** Labels went from 40 to 34 canvas px (about 15 px at the 540 px stage) and the burned-in caption from 48 to 36 (about 16 px). This uses a local `typeFor` and a `Captions` wrapper that scales the shared `CaptionBand`; the shared lib is untouched. The phone layout is unchanged (30/32).
- Checks: `lab.sh tsc` ok. `lab.sh check` and `--phone` rendered in paper and blackboard. I looked at every beat still, the mid frames (m3 arrow, m4 packet) and all four sheets. The page posters were re-rendered.

## Known limits
- On the phone, the lower half is empty until ③. This is the space the ring is drawn into.
- ③ shows the clockwise rule on one key, K1, as Fig 6·b and the board do. The other keys' owners are given by the caption, not by arrows (critic C-03).
- The two examples differ in N (2→3 against 4→5), as on the board. The closing average line carries the general claim.

## Re-verification (2026-10-14)
- `lab.sh tsc` ok. `lab.sh check` and `--phone` re-rendered in paper and blackboard. I looked at the paper full sheet, the phone blackboard sheet and both posters at full size; the ring matches Fig 6·d's positions and no label touches a box.
- `lab.sh copy` and `check_clip.py lec07 l07-mod-vs-ring` OK. The posters were re-rendered and the clip was checked in the page (`qa/fixes_animation_shots/`). No new problems.
