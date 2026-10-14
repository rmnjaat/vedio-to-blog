# Lecture 09 (lec07) clips: fixes after the design critique

Covers every critic issue with owner `animation`: C-03 (the ring panel of Clip 6·1), C-11 (the proxy panel of Clip 5·1) and C-17 (clip scale on desktop, all four clips). The clip code fixes were already in the lab sources from an earlier round. In this round I re-verified each clip from fresh renders, copied all four clips to the site, re-rendered the posters, rebuilt the site and looked at the clips in the page.

## What changed per clip

| clip | wide | phone canvas | beats / captions / chapters |
|---|---|---|---|
| l07-mod-vs-ring | ring redrawn in Fig 6·d's hand (C-03); lettering 34, caption 36 | 720×1070, unchanged size; ring r 160 at (360, 640) | ③ draws only K1 → c1 (the board's arrow); ④ adds two red arcs into c5 and the (12, 1] band; times unchanged; chapters 10 f into each beat |
| l07-four-routes | proxy panel matches Fig 5·b and has green return legs (C-11); lettering 34, caption 36 | 720×1010; desks 120 → 110 wide, routeR 702 → 704 so the answer lines fit | event lines gain the return pens; beat times, captions and chapters unchanged |
| l07-events-vs-cdc | lettering 34, caption 36 (C-17) | 720 phone, unchanged | unchanged |
| l07-lru-vs-lfu | lettering 34, caption 36 (C-17) | phone unchanged | unchanged |

**l07-mod-vs-ring: the ring (C-03).** The storyboard was changed first: glyphs and the B3 and B4 events.
- Nodes are small rectangles straddling the circle, 50×20 (phone 44×18). Names sit outside the ring, 12 px from the box. Position numbers sit inside at r−56 (phone r−50).
- Keys are hatched 22 px squares on the circle, Fig 6·d's key glyph, with their names inside the ring. No key has an ownership arrow except the ones that move.
- ③ draws K1 → c1 inside the ring, the board's arrow. In ④ that arrow ghosts to 38%, and K1 and K6 each get a short red clockwise arc outside the ring into c5: K1 on the inner track (r+20) and K6 on the outer one (r+42). A translucent red band lays the (12, 1] slice on that segment, labelled outside at top-left.
- Positions match Fig 6·d: c1 at 3, c3 at 5, c4 at 10, c2 at 12, c5 at 1, K1 at 0.
- The poster tells "2 of 6 moved" at a glance: two red keys, two red arcs into c5 and the band. Everything else is plain graphite.
- Checked: `paper-1179-b5-poster` and `phone-paper-1179-b5-poster` at full size, plus both full sheets and the phone sheets in paper and blackboard. No label touches a box: K2 / 3, K3 / 5 and K1 / 1 stay apart, and the arcs never cross the ghosted old arrow. The page poster at 1440 shows the new ring.

**l07-four-routes: the proxy panel (C-11).**
- proxy → c1 and proxy → c3 are headless wires. Only proxy → c2 carries an arrowhead, as in Fig 5·b. This is already visible at frame 0.
- Every answer pens its own green line back to the sender, parallel to its request, 13 px offset (phone 11), corners included. In redirect, "go to c2" is graphite. The lines stay on the sheet, so each panel's count (4 / 2 / 4 / 4 legs) can be counted off the drawing.
- Checked: wide and phone posters at full size, and the paper sheet including the mid-motion stills (packets on their lines, "1 leg" written only as a leg lands). Phone "4 legs · 2 round trips" ends about 13 px inside the 720 edge: tight but whole.

**All four clips: desktop scale (C-17, clip part).** Wide labels went from 40 to 34 canvas px and the burned-in caption from 48 to 36. At the 540 px stage (×0.45) that is about 15 px and 16 px, close to the sheets' 13–14 px. Each clip does this with a local `typeFor` and a `Captions` wrapper that scales the shared `CaptionBand`. `learn/animations-lab/src/lib/` is untouched. Phone lettering stays at 30/32, which renders at 15–16 px on a 358 px phone.

**Posters.** `site.sh posters lec07` re-rendered wide and phone posters, paper and blackboard, for all four clips. The site was rebuilt afterwards.

**Page.** The MDX `<AnimationClip>` captions and predict lines still match the clips, so the MDX is unchanged.

## Checks run
- `pipeline/bin/lab.sh tsc <clip>`: `tsc ok` for all four.
- `pipeline/bin/lab.sh check <clip>` and `--phone` for all four, paper and blackboard. I looked at the wide paper sheets of all four, the phone sheets of mod-vs-ring (blackboard) and events-vs-cdc (paper), and the mod-vs-ring and four-routes posters at full size. Nothing collides. Captions are one or two lines inside the band. Mid-motion wipes cut cleanly. Blackboard colours flip.
- `pipeline/bin/lab.sh copy <clip>` and `python3 pipeline/lib/check_clip.py lec07 <clip>`: `OK` for all four.
- `site.sh build lec07` → `site.sh posters lec07` → `site.sh build lec07`: `build ok: 11 pages`.
- `site.sh qa lec07 lectures/lec07/qa/fixes_animation_shots --widths 1440,390`: `ok: no failures`. I looked at the mod-vs-ring poster at 1440 and the four-routes clip playing at 390 dark.
- Review notes: `lectures/lec07/animations/<clip>/review.md`, which now has a "Fixes after the page critic" section and a re-verification line.

## Issues

| id | owner | issue | fix | evidence |
|---|---|---|---|---|
| C-03 | animation | Clip 6·1's ring is tangled: six hooked arrows, a red zig-zag through the ring, labels jammed against nodes, and it doesn't match Fig 6·b/6·d | Redrawn in Fig 6·d's hand: hatched key squares with no arrows, node names outside and numbers inside, only K1 and K6 get short red clockwise arcs outside the ring into c5 over a red (12, 1] band, and the old K1 → c1 arrow ghosts | `learn/animations-lab/renders/l07-mod-vs-ring/stills/paper-1179-b5-poster.png`, `phone-paper-1179-b5-poster.png`, `fixes_animation_shots/clip/1440-light-l07-mod-vs-ring-fig-poster.png` |
| C-11 | animation | The proxy panel has arrowheads into c1, c2 and c3, which reads as a fan-out, and has no green answers | The proxy has one blue arrow, to c2. c1 and c3 are headless links. Green return legs are drawn back from c2 → proxy → client, so the "4 legs" count is visible, and every other panel's answers are drawn too | `learn/animations-lab/renders/l07-four-routes/stills/paper-1181-b6-poster.png`, `phone-paper-1181-b6-poster.png`, `_sheet-paper-full.png` |
| C-17 | animation | On desktop the clip stages letter at 16–18 px next to 13 px figures, and the chips and caption are flush left under a centred stage | Clip part done: all four clips letter at 34 / 36 canvas px, about 15 / 16 px at the 540 px stage. The chip and stage alignment lives in shared CSS (`notebook.css` `.clip-player .clip-box`) and the shared player, which this role may not edit, so it is listed under "Shared change needed" | `learn/animations-lab/renders/l07-*/stills/_sheet-paper-full.png`, `fixes_animation_shots/clip/1440-light-*-poster.png` |

## Shared change needed
- C-17, alignment: `.clip-player .clip-box{max-width:540px;margin-inline:auto}` centres the stage while the chips row, play button and caption stay flush left. Either left-align the clip box (drop `margin-inline:auto`) or centre the chips, play button and caption with it. This is a design-fixer change under the shared lock, and it affects every lecture.

## Known limits
- Mod-vs-ring, phone: the lower half is empty until ③, because that is the space the ring is drawn into.
- Four-routes, phone: the redirect count ends about 13 px inside the canvas edge.
