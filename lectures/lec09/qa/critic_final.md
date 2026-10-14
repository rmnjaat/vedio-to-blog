# Lecture 07 (lec09): design critic, final look (after follow-up fixes)

**Verdict: pass.** No blocker, high or medium issue is open. Two low issues remain.

I judged the pages from `qa/final_shots` (shot 00:40) against the Whiteboard Notebook sample and Lecture 1. I did not
rely on the fixers' reports.

## Counts

- **Carried over:** 12 issues. These are the 11 from `critic.json` plus C-12 from the previous final look.
  - Resolved: 11 (C-01 to C-07, C-09 to C-12).
  - Still open: 1 (C-08, low).
- **New:** 1 (C-13, low, a regression).
- **Open in total:** 2, both low.

## Resolved, as seen on the new shots

- **C-01, fig-10a.** The offset row is clean at both widths, and the step labels no longer collide.
- **C-02, fig-3b on phone.** Every panel reads title, drawing, notes. This holds in the sweep, not only the figure shot.
- **C-03, phone step-throughs.** 10a, 2c, 4c, 6b, 8d and 3c all start cropped and grow. Prev/Next sits right under
  the first row.
- **C-04, figure deserts.** §10.5 now has Fig 10·c and Fig 10·d, and §3.5 has Fig 3·e. All three are clean on phone and
  in dark.
- **C-05, overview pager.** It reads "← Previous lecture · Lecture 06 · …".
- **C-06, Clip 5·1.** It matches Clip 2·1 in scale and stage width, and the request is full blue.
- **C-07, Clip 8·1 on phone.** The header is whole and clear of the cylinder and the stage top.
- **C-09, think cards.** The answer position varies, and most correct answers are definite.
- **C-10, code comment.** It fits.
- **C-11, labels in fig-6a and fig-9b.** Both are unambiguous.
- **C-12, fig-6b.** Only the `?w=360` slot fills, which matches the text.

## Open

1. **C-13 (low, design, regression from C-03).** The grow crop sets `overflow:hidden`, so phone labels that ran just
   past the viewBox are now cut off:
   - fig-6b steps 5–6: "resize on the CDN".
   - fig-3c steps 2–5: the right edge of the reply box and the "upload_url: …amazonaws.co" line.

   Fix: pull those labels inside the phone viewBox, or crop only the bottom edge.
2. **C-08 (low, content).** The asides and sentences named in the first critique are fixed. The same
   teacher-biography voice remains in these places:
   - The §8.5 aside "The instructor’s advice: where to start with data engineering" (s8b:118), and "In the
     instructor’s words…" (s8b:122).
   - "in the instructor’s experience" (s4:115).
   - "According to the instructor…" (s5:167).
   - "by the lecture’s account" (s10b:79).

## Regressions

- **C-13** comes from the grow crop, as described above.
- I found nothing else in the sweep sample (all pages at 1440 and 390, light and dark), the figures, the steps or the
  clips.

## Capture artifacts, not page defects

These are problems with the screenshots, not with the pages:

- Several tall phone element shots end in a blank band:
  - `fig/390-light-fig-3b.png`
  - `step/390-light-fig-6b-s5/s6`
  - `step/390-light-fig-10a-s6`
- `step/390-light-fig-3c-s2` shows the sticky step bar over the drawing.

The sweep frames of the same figures render whole: fig-3b is complete in `sweep/390-light/3-uploading-a-photo/007–008`.
In live use, `keepInView` scrolls each changed row above the sticky bar. So I did not log these as issues.
