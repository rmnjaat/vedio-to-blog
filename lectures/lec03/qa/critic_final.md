# Lecture 06 (lec03): final design critique, after the follow-up fixes

**Verdict: pass.** No blocker, high or medium issue is open.

Of the 17 issues carried over (C-01 to C-15 from the first critique, C-16 and C-17 from the previous final look), all 17 are resolved. One new issue was added: C-18 (low, content), a few leftover narrating lines. No regressions from the follow-up round.

I judged from `lectures/lec03/qa/final_shots` alone and did not rely on the fixers' reports. I looked at:
- every figure at 1440 and 390, light and dark;
- every step of 2c, 5a and 7d at both widths;
- the clip posters and playing frames;
- the pause cards;
- phone and desktop sweeps of the changed pages (§2.6, §3.4–3.5, §4.2, §5.2, §8.4);
- page tops, mids and ends at 1024 and 390, light and dark.

`report.json` has no failures.

## What matches the sample
- **One telling per story.** §2.6 and §3.5 run pause card → resolving paragraph → clip → prose. Fig 2·d is now a six-rung summary ladder and reads cleanly at both widths.
- **Phone step-throughs.** The bar sits under the drawing, and every step shows its whole drawing:
  - fig-2c step 4 shows m1-01…m2-03;
  - fig-5a steps 3 and 5 show payments s1 and [0, 2000);
  - fig-7d's result lines have room.
- **fig-4a on the phone (C-16).** Each size label sits on its own line, "8 B / entry" and "20 B / entry". The bubble covers nothing and nothing crosses the frame (`fig/390-light-fig-4a.png`, `fig/390-dark-fig-4a.png`, `sweep/390-light/4-id-size/004.png`).
- **Clips.** Stage, controls, chips, caption and "clip as text" form one centred 540px column (`sweep/1440-light/3-order-and-clocks/008.png`). Clip 2·1's flush is a solid write arrow.
- **Figure fixes hold.**
  - 6c: bits grouped, legible.
  - 3c: labels stacked and clear.
  - 9a: chips apart.
  - 6d: agrees with the Discord paragraph.
  - 5a caption: says "tick".
  - 3.5 pause card: options are balanced.
- **Voice.** The prose no longer narrates the recording or the teacher's biography. References to the lecture or class are now below Lecture 1's rate, and they are mostly opinion attributions, as in lec01.
- **Unchanged and correct:** the tokens, fonts, three columns, current-page marks, chapter hand-offs and dark mode.

## Still open
1. **C-18 (low, content): four narrating lines remain.**
   - §8.4: "A quick 2016 benchmark by the lecture's author (then at Amazon, and deep into MongoDB)" (`1024-light-8-pagination-mid.png`).
   - §3.1: "came up in class … the class did not come back to it".
   - The Flickr gossip paragraph: "as far as the lecture knew".
   - §7.3: "on the instructor's YouTube channel".

   Fix: state each point plainly, for example "A 2016 benchmark (arpitbhayani.me) compared…".

## Resolved
C-01 to C-17. Two of them in detail:
- **C-17: a capture artifact.** The element shots cut the phone step text, but the 390×844 viewport sweep (`sweep/390-light/5-central-services/005.png`) shows the panel whole.
- **C-03: resolved against the Lecture 1 reference.** Every example that was cited is gone. The few lines left over are logged as C-18 (low).
