# Lecture 09 (lec07): design critic, final look after fixes

**Verdict: pass.** No blocker, high or medium issue is open. Of the 23 carried-over issues (C-01–C-21 from the first
critique, plus C-22 and C-23 from the earlier final look), 22 are resolved. One is still open: C-07, the voice, which is
downgraded from medium to low. The fixes caused one new low regression (C-24, a phone crop in fig 6·e step 4). One
new low shared-navigation issue was also found (C-25).

These findings come from `lectures/lec07/qa/final_shots` (taken 22:20, after the follow-up fixes). I looked at every
figure at 1440 light and 390 light/dark, every step of 3e/4f/6e/6f (1440, plus the 390 steps of 6e/6f/3e), every clip
poster and playing frame, the page top/mid/end shots, and sweep samples at 1440 and 390. The fixers' reports were not
used as evidence. `report.json` lists no machine failures.

## What now matches the sample

- **Fig 6·e** now teaches. The ring inset follows the steps: c1 is crossed out and K1 swings to c3, a red
  "(12, 3] cold" arc appears at step 4, and a green "unchanged" arc at step 5. A router lane starts every request
  (`step/1440-light-fig-6e-s4`, `390-light-fig-6e-s3`, `s5`).
- **Clip 6·1 ring**: the keys are hatched dots, and only the moving slice gets the pink band and a red arc to c5. The
  poster reads "2 of 6 moved" at a glance, on phone and in dark mode too.
- **Clip 5·1**: one proxy → c2 request from the first frame, headless c1/c3 links, and green answers on the poster.
- **Fig 7·a** is a real portrait redraw on phone. On desktop the opened-node card has room, with a right-aligned
  § column.
- **Overview**: paragraph, then a four-panel "so far" sketch, then grouped back-in chips, then the hand-off, the same
  rhythm as Lecture 1's overview.
- **Clips** now sit flush left with their controls.
- **Pause-and-think**: the correct answer is first on 4 of 9 cards. Verdicts are question-specific, agree with the
  reveals, and show no raw tags.
- **Figures**: numbers are unique (5·a–5·d, 2·e). Marker colours are consistent (blue request, green answer, red
  failure, ink cross-refs). MyValue is drawn the same way in 4·d and 7·a. CAS reads `CAS(a, 10 → 20)`.

## Open issues (all low)

1. **C-07 voice residue (content, low; was medium).** The biography, pronouns, "the instructor" and the YouTube plugs
   are gone. Some leftovers remain:
   - §3.4 still advertises a nine-hour Redis-internals course "in Golang. Optional."
   - §5.4 narrates a hedge ("the lecture was 100% sure only about … not sure how routing works in today's Sentinel
     setup, and suggested watching talks"). The sourced note after it already says what is true.
   - Smaller ones: "the lecture's favourite topic", "It was added that…", "as it was put here".

   Fix: drop the course sentence and the hedge narration, and rephrase the three small residues as plain claims.
2. **C-24 fig 6·e phone step 4 crop (design, low, regression).** The step's visible height now ends through the red
   label "the whole slice lands here, cold" (`step/390-light-fig-6e-s4.png`). In the first round it fitted
   (`critic_shots/step/390-light-fig-6e-s4.png`). Fix: add about 20 px to the step-4 phone viewport, or lift the
   label.
3. **C-25 overview back link (design, low, shared).** "← Previous chapter · 7 · What to keep" goes to Lecture 08's
   last chapter, but reads as this lecture's chapter 7 (`1440-dark-overview-end.png`). Fix: when the stop is in
   another lecture, label it "Previous lecture" with the lecture number (`site/src/lib/lecture.ts`).

## Resolved

C-01, C-02, C-03, C-04, C-05, C-06, C-08, C-09 (all medium) and C-10–C-23 (low). Each one's recheck evidence is in
`critic_final.json`.
