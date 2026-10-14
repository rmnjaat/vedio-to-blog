# Lecture 10: design critic, final look (after fixes)

**Verdict: pass.** No blocker, high or medium issue is open. Of the 18 first-round issues, 17 are resolved and 1 low
stays open (C-15, half fixed). Two new low issues were added (C-19, C-20). None of them is a regression in the
page itself.

Judged from `lectures/lec10/qa/final_shots` (all pages at 1440, 1024 and 390, light and dark; sweeps; every figure; every
step; every clip), against the Whiteboard Notebook sample and Lecture 1. I re-ran the phone shots of chapter 3
(`qa/critic_extra`) to check the step captures.

## What now matches the sample

- **Figures are one hand, and the clips joined it.** Clip lettering dropped to about 15px with a pencil weight. Clip 6·1 over Fig 6·d
  (`sweep/1440-light/6-switching-servers/014.png`) now reads as one notebook. Before the fixes it read as two.
- **The map is right.** Fig 7·c (renumbered) routes K3 → 03 and K1 → 04 on nested elbows, on desktop and phone.
- **Phone step-throughs grow.** Fig 4·c step 1 is one row, then Prev/Next and its sentence. Fig 3·c and 5·b do the
  same (`step/390-light-fig-4c-s1.png`, `3c-s1`, `5b-s1`).
- **The overview has its 'so far' drawing.** It has two panels (Lecture 9 Redis, Lecture 3 MySQL with the magic-value delete) and
  three chips, and stacks cleanly on the phone in dark mode (`fig/390-dark-fig-sofar.png`).
- **The text no longer argues with itself.** §10.2 marks the taught claims and points straight at the notes, and agrees
  with Fig 10·b's masterless ring. Teacher narration is down to the attribution clauses the fact-check policy requires.
- **Pause-and-think no longer gives itself away.** The right answer is first on five of nine cards, and option lengths are balanced.
- The smaller items are all fixed: 7·b/7·c numbering, Fig 5·c pointers past the end, Fig 10·a arrowheads and 'writes go here', separate
  reads in 4·b/6·d, the 9·c CRC slot from step 4, chip margins, the §6.3 table stacked at 1024, and Lecture 07 linked in the rail.

## Open issues (all low)

1. **C-15 (animation): Clip 8·1 still says "1. MC freq".** Fig 8·c now says "1. merge frequency", so figure and clip
   disagree one screen apart (`clip/1440-light-l10-sawtooth-fig-poster.png`). The content fixer handed it on, but no
   one changed it. Fix: `Sawtooth.tsx:285`, then re-render the posters.
2. **C-19 (design, shared): the clip stage is still 540px and left-aligned** in the 920px column, leaving empty paper
   to its right (`sweep/1440-light/6-switching-servers/014.png`). The cause is `notebook.css:487` and it affects every
   lecture. Centre it in a shared pass.
3. **C-20 (design / QA tooling): several phone element captures are cut off around 600px.** Fig 3·c steps 5–6 have no
   sentence or caption, 4·c steps 4 and 6 are cut, and so are the 6·b inset, 10·a's caption and the sawtooth chapter chips. The viewport sweeps show
   the same figures whole, and the first-round shots of these steps were whole, so this looks like a capture-timing
   problem (smooth scroll or sticky bar on grown figures), not a broken page. One thing can't be confirmed from these shots: that Fig 3·c's
   step 5–6 text is visible on a phone. Spot-check it, and make page_qa wait for the scroll to settle.

## Regressions

None found in the pages. The only new oddity is the clipped phone captures (C-20), which come from the capture
process. They do mean the final-step phone shots of Fig 3·c and 4·c can't serve as evidence until it is fixed.
