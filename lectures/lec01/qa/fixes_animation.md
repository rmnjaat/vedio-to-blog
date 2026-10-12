# Lecture 1 clips: fixes after the design critique

Covers critic.md #2 (phone legibility), #3 (clip scale), #4 (count-race contradiction), #18 (cascade labels), #22 (chapter seeks), plus the coordinator's 100 → 102 story and poster requests.

## What changed

**Phone compositions (#2).** All four clips now have a portrait layout. Each component takes `layout: 'wide' | 'phone'`, and each `META.phone` sets the canvas. The player (`ClipPlayer.tsx`, already wired by the design fixer) picks the phone layout at ≤ 640 px.

| clip | phone canvas | re-flow |
|---|---|---|
| l01-cascade | 720×1040 | Flows top to bottom: readers row → lb bar → api ×5 in one row → queries converge on the db below |
| l01-queue-vs-stream | 720×850 | Queue above stream. Waiting messages sit above each pipe and drop in. Consumers and stores are in a right-hand column. |
| l01-count-race | 720×910 | Lane labels sit above the rails. Results are stacked. |
| l01-polling | 720×960 | Three stacked lanes. "ready at 60 s" is on its own top row, the counts are on the lane titles, and the 1M sum is on its own row. |

Phone lettering is 30 canvas px and captions are 32, which renders at 15–16 px at 358 px wide. Nothing is below 14 px.

**Scale (#3).** I added one rule to `notebook.css`: `.clip-player .clip-box` has max-width 540 px (440 px on phone). The 1200 px wide stage now shows at ×0.45, so lettering is about 18 px and ink about 1.6 px. Page figures are 14–17 px with 1.7 px ink. Tokens and comments in `lib/tokens.ts` document this.

**Count race (#4).** The clip now tells one story, matching the page caption and Fig 4·b:
1. Two claps on a count of 100: both read 100, both write 101, and the red note says "should be 102".
2. Part two, labelled "from 0, 1,000 each": the count reaches 1,997 against an expected 2,000.
3. Atomic replay: the count reaches 2,000.
4. Closing note: "2 claps on 100 / atomic: 102".

The beats, chapters, alt text and `META.ledger` (L-0219, L-0230, L-0231) are all updated, and the storyboard is rewritten.

**Cascade (#18).**
- "unchanged" now reads "same size".
- "5× queries" stays fully inked, so it no longer fades to pale blue over the red timeouts.

**Polling (wide).** The 1M sum crossed the sixth poll and the ready line. It now reads "1M: 6M req/min" and ends left of the 60 s line.

**Chapter seeks (#22).** Every chapter mark sits 10 frames into its beat, so a chip lands on a settled frame with its caption fully up. Before, it landed on the frame between two captions, where neither was shown.

**Posters (#7 support).** I re-ran `site/scripts/clip-posters.mjs` under the lock. That produced 16 PNGs in `site/public/clips/<id>/`: wide and phone, in paper and blackboard. The site was rebuilt afterwards.

## Files
- Source of truth: `learn/animations-lab/src/clips/*` and `learn/animations-lab/src/lib/{tokens.ts,primitives.tsx}`. The cascade and queue-vs-stream clips are now in the lab as well. These files are copied into `site/src/animations/{lib,clips}`.
- Lab plumbing:
  - `Root.tsx` registers `<id>[-phone][-dark]`.
  - `scripts/check.mts --phone` renders the phone composition. Its sheet is 358 px wide, and the wide sheet is 540 px.
- Storyboards: all four in `lectures/lec01/animations/*/storyboard.{yaml,md}`. Count-race has new beats. The others record the phone canvas and chapter offsets.
- `site/src/styles/notebook.css`: the clip-box max-width rule (two lines).

## Checks
- Lab `tsc --noEmit` is clean. `npm run build` passes.
- I looked at the light stills at every beat and mid-motion frame, wide and phone, for all four clips. I also looked at the dark posters. Two issues came up and were fixed: titles running together on the phone layout ("queuesqs") and "lost" labels touching other labels.

## Known limits / for others
- The `site/src/animations/Root.tsx` Studio root still registers only the demo clips. It is optional.
- The chapter chips' own font size (critic #21) is in shared CSS and was not touched.
- The lead line above Clip 4·1 ("Now run it a thousand times…") still fits the clip.
