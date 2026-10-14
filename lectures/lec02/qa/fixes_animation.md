# Lecture 04 (lec02) clips: fixes after the design critique

The critic gave the animation owner one issue, C-12, in `l02-mesh-to-pubsub`. No other clip had an animation issue, so no other clip was touched.

## What changed

**l02-mesh-to-pubsub (C-12): the toy-limit tick sat on D.**
- **Cause.** The red cap tick was placed in the ordinary 10-canvas-px gap between slot D and the first peer slot. On the page that gap is about 4.5 px. With the hand wobble and the tick's stroke, the tick landed on D's right edge, and the grey Pub/Sub slot almost touched it.
- **Fix (`geometry.ts`).** The tick now has a gap of its own:
  - It sits 14 canvas px right of D (12 on phone).
  - The peer and Pub/Sub slots start 14 px after the tick (12 on phone). This mirrors `SlotStrip` in `site/src/figures/lec02/s8a-websockets-parts.tsx`, where the cap tick sits just past the last user slot and the extra slots start 6 px beyond it.
- **Follow-on (wide layout).** The wider bar would have crowded `4 + 4 = 8` (B3), so the totals and note column moved from x 725 to 745.
- **What did not change.** The phone canvas (720×1010), lettering sizes (40/30 px labels, 48/32 px captions), beats, captions, chapters, alt text and the page's `<AnimationClip>` caption are all unchanged. The story is the same. The storyboard (`slot_bar`) now records the cap-tick gap, in both `lectures/lec02/animations/l02-mesh-to-pubsub/storyboard.yaml` and the copy in the clip folder.
- **Review.** `review.md` has a Round 3 entry for C-12.
- **Posters.** I regenerated them with `site.sh posters lec02`: wide and phone, paper and blackboard, in `site/public/clips/l02-mesh-to-pubsub/`.

## Checks run
- `pipeline/bin/lab.sh tsc l02-mesh-to-pubsub`: tsc ok.
- `pipeline/bin/lab.sh check l02-mesh-to-pubsub` and `--phone`, run twice: once after the tick move and again after the totals shift. I looked at:
  - the wide b3 and poster stills in paper and blackboard
  - the phone poster in blackboard
  - the wide paper sheet and the phone paper sheet

  The tick is clear of D, of the red peer slots, of the grey slot and of `toy limit` in every frame. `4 + 4 = 8` is clear of the last red slot.
- `pipeline/bin/lab.sh copy l02-mesh-to-pubsub`, then `python3 pipeline/lib/check_clip.py lec02 l02-mesh-to-pubsub`: OK.
- `site.sh build lec02` (14 pages), then `site.sh posters lec02`, then `site.sh build lec02` again (ok).
- `site.sh qa lec02 lectures/lec02/qa/fixes_animation_shots --widths 1440,390`: no failures. I looked at the in-page poster at 1440 dark and at 390 light, and at the playing clip at 390 dark. The tick sits in its own gap in each.

## Critic issues (owner: animation)

| id | clip | status | what was done |
|---|---|---|---|
| C-12 | l02-mesh-to-pubsub | fixed | Cap tick moved into its own gap, 14 px right of D (phone 12). Peer and Pub/Sub slots start 14 px after it, matching fig 8a's SlotStrip. Totals column moved to x 745. Re-rendered, copied and posters regenerated. Verified in the lab stills and the page shots. |
