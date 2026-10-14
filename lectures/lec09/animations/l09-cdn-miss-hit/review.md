# Review: l09-cdn-miss-hit ("One fetch, then thousands of hits")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. All items were ticked by looking at the
renders in `learn/animations-lab/renders/l09-cdn-miss-hit/` (`stills/_sheet-{paper,blackboard}-full.png`,
`stills/_sheet-phone-{paper,blackboard}-phone.png`, the per-frame PNGs, `l09-cdn-miss-hit.mp4` and its strips).
Clip: 1080 frames = 36 s at 30 fps (72 s at 0.5×), 6 beats (B0 + ①–④ + B5 summary), wide 1200×800 and phone 720×960.

## Teaching and accuracy
- [x] **Motion test.** The lesson is a rate: the cdn counter climbs to 1,000, then 1,200, while the origin counter
  stays at 1 and moves to 2 only after the ttl bar empties. A still (Fig 2·b) shows the two arrows but not how often
  each one is used. Seen in b3-hits (1,000 / 1) → b4-expire (1,200 / 2).
- [x] **Every word traces.** The captions and labels map to L-0036 (miss → fetch the same path → keep → return),
  L-0037 (hit), L-0038 (that is all a CDN does, `on a miss`), L-0043 (the origin barely hears: counters, final
  caption "a few requests"). Context only: L-0034 (the hosts `a.mycdn.net` / `arpitbhayani.me` from the board, the same
  `GET logo.png` on both legs) and L-0058 (`ttl` bar). There are no additions.
- [x] **Nothing invented.** The counts are illustrative and say so (fidelity_notes; the captions say "every later",
  "over a thousand", "a few"). No TTL value and no geography. The fact-check caveat (only cacheable responses are
  stored) is left to the prose after the clip, and the clip never says "any response".
- [x] **Not to scale.** `(not to scale)` sits in a corner on every frame (top right on wide, bottom left on phone).
- [x] **Causality.** The CDN initiates the fetch: the arrowhead on the miss leg sits at the origin and the reply rides
  back as a green chip, never as an arrow into the CDN. The miss leg is graphite: a miss is not a failure.
- [x] **Step numbering.** ①–④ match the outline's §2.3 sequence (request, keep, hits, expiry).
- [x] **Frame 0 = Fig 2·b** with three viewers, an empty slot, an empty ttl bar and both counters at 0 (b0-intro).
  The poster (frame 1079) reads alone: `1,200 requests` under the cdn, `2 requests` under the origin, `✓ hit`,
  `on a miss` on the origin leg.

## Match with the storyboard
- [x] Beats at 0 / 90 / 280 / 420 / 690 / 970 (timeline.ts `BEAT`), each caption cued at its beat start.
  Chapters sit 10 frames into each beat (100, 290, 430, 700).
- [x] One primary motion per beat. The ttl drain is the slow secondary indicator, and the B4 caption refers to it.
  The B3 stream is one motion (requests answered in turn) with the counter as its indicator.
- [x] Past states ghost: both `GET logo.png` labels drop to 38% during the hits (b3-hits, m4-stream) and return to
  full when the refetch reuses them. `miss` / `✓ hit` replace each other in place.

## Legibility
- [x] Phone lettering is 30 canvas px, mono and hand, with 32 px captions. Wide labels use the shared `typeFor('wide')`.
  Everything reads on the 358 px phone sheet in both themes.
- [x] Captions are ≤ 2 lines on wide and ≤ 3 lines on phone (B1), always inside the band, never over the diagram.
- [x] No overlaps in any still, including the mid-motion ones (after the round-1 fixes below).
- [x] Strokes are visible at phone size. There are no dashes in this clip.

## Colour and contrast
- [x] Blue = request dots and the re-inked request path. Green = the photo's bytes (reply chips), the tick in the slot
  and `✓ hit`. Graphite = the fetch packet, the miss leg and everything else. There is no red: nothing fails.
- [x] Every colour has a second cue: `✓` + the word `hit`, the word `miss`, the chip shape for bytes, and dots for
  requests.
- [x] Both themes flip cleanly (blackboard sheets): no stray dark ink, and the markers stay distinct. The ghosted blue
  label on the blackboard is faint but readable, which is fine for past context.
- [x] No hard-coded colours: everything comes from `THEMES` / `useColor`.

## Motion quality
- [x] No zoom, bounce or slide-ins. Labels are written with the `Write` wipe (m1-request shows `GET logo.pn` mid-wipe
  with a clean edge).
- [x] Easing comes from `anim.ts` (`EASE_MOVE`, `EASE_FADE`). The counter uses ease-in cubic, so it reads as a rate
  building.
- [x] Packets ride their lines and the blue pen tip sits at the packet (m1-request, m6-refetch).
- [x] Holds: B0 3.0 s; the final hold runs from 1004 to 1080 (2.5 s) with the caption up from 970 (3.7 s); every
  beat holds ≥ 1 s after its last motion. Caption rates are 4.9–14.3 cps (≤ 17).
- [x] 36 s total.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l09-cdn-miss-hit` → `tsc ok`.
- [x] Deterministic: only `random(seed)` from remotion; no Math.random, Date or CSS transitions.
- [x] META is complete: id, title, ledger, width/height, phone {720×960}, fps, duration, posterFrame = 1079,
  chapters, captions, and alt text that states the mechanism.
- [x] Both themes and both layouts render (paper / blackboard × wide / phone sheets).
- [x] Renders are in `renders/l09-cdn-miss-hit/`: stills, sheets, mp4 and strips. No Studio or server was left
  running.

## Problems found and fixed
Round 1 (the first attempt's light-only stills, frames 82–1079):
1. **m3-reply (wide):** the green reply chip leaving the origin crossed the graphite `GET logo.png` on the miss leg
   (its descenders sat inside the chip's halo). Fix: both `GET logo.png` labels moved from baseline 270 to 262 on
   wide, so the chip and the hit chips on the trunk pass under the text.
2. **m3-reply (phone):** the chip's halo touched the `G` of the label beside the miss leg (label x = leg + 16).
   Fix: the phone request/fetch labels moved to the leg + 24.
3. **Phone composition:** about 150 px of blank sheet sat under a one-line caption, and the hosts beside the cloud
   sat on its scallops (x 452). Fix: the phone layout was re-flowed down the canvas (bus 180 → 195, cloud centre
   385 → 410, origin 610 → 650, caption band 744 → 790) and the host/counter column moved to x 462. A three-line
   caption (B1) still ends inside 960.
4. **Missing renders:** the first attempt was killed before the blackboard renders. Round 2 rendered paper +
   blackboard for both layouts.

Motion check (mp4, strips `strip-4.8.png`, `strip-9.8.png`, `strip-24.6.png`): the fetch label wipes on in step
with the graphite packet; the reply chip rides the miss leg into the cloud, and the slot fills with the tick as the
ttl bar fills; at expiry `✓ hit`, the slot copy and the tick fade together, then `miss` is written and the blue pen
and its packet move from viewer 1 along the bus. No jumps, no pop-ins, one primary motion at a time.

Round 2 (all 12 stills × 2 themes × 2 layouts): no new problems. The chips clear the labels, the counters and hosts
are clear of the cloud, and the dark theme flips cleanly.

Round 3 (fresh render of all 12 stills × paper/blackboard × wide/phone; wide sheets, phone sheets, and phone
m4-stream / b5-poster at full size):
1. **Phone `✓hit` (b3-hits, b4-expire, b5-poster, m4-stream):** the tick sat 6 px from the `h`, so at 358 px it read
   as one glyph. Fix: the word moved 8 px right (`hitX = S.x + tsz·2 + 14`); the poster now reads `✓ hit`.
2. Nothing else: no overlaps, captions inside the band, the ghosted `GET logo.png` faint but readable on blackboard.
3. Motion: new mp4 and strips at 3.3 s (request wipe + packet, cdn counter 0 → 1 on arrival), 9.6 s (green chip rides
   the miss leg back; slot and ttl bar fill on arrival), 18.5 s (stream), 24.6 s (`✓ hit` fades, `miss` written in
   place, refetch re-inked blue). No jumps or pop-ins; one primary motion at a time.

## Known limits
- The counts are illustrative (1,000 / 1,200 / 2). The class gave no numbers here.
- One edge node only. Geography (L-0039) is not shown.
- One refetch per expiry stands in for "a few requests every time the cache invalidates" (the caption keeps "a few").
- The cacheability caveat from the fact-check (Cache-Control, CDN policy) lives in the prose right after the clip,
  not in the clip.
- The path is shortened to `logo.png` (Fig 2·c on the page shows the full URLs).
