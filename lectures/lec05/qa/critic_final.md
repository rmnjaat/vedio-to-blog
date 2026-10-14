# Lecture 05 (site "Lecture 03"): final design critique

**Verdict: pass.** No blocker, high or medium issue is open. 17 earlier issues were re-checked: all 17 are resolved
(C-01–C-12 from `critic.json`, plus C-13–C-17 raised on the previous final look). There are 3 new low issues, one of
them a small regression from the voice pass (C-18).

Judged on `lectures/lec05/qa/final_shots` (top/mid/end at 1440, 1024 and 390, light and dark). I sampled sweeps of every
page at 1440 and 390, both themes, and looked at every figure, step and clip shot used below. I did not trust the
fixers' reports.

## What matches the sample
- Paper and blackboard tokens, Literata body, Recursive labels, graph-paper sheets and the three-column layout with the
  current chapter marked. The breadcrumb, the "On this page" rail and the chapter hand-offs (ch 6 → "Next lecture") all
  work in both themes.
- The prose, figure, prose rhythm now holds in chapter 6. It has the ORM table, the key-rule box "Ship with an ORM;
  write the big queries in native SQL", a bold-lead list for §6.3, then the ten lines and Fig 6·a.
- Step-throughs are correct: step N lights text N and draws row N, the last step included (fig-2d/2e/3a, desktop and
  phone).
- The figures and clips look like one hand. Clip lettering is about 15px in pencil weight, like the sheets. Fig 1·e and
  the deadlock clip agree (rolled back, ERROR 1213).
- Pause-and-think: §2.4's "More precisely" now comes after the card and explains the answer rather than giving it away.

## Re-check of earlier issues
| id | sev | status | evidence |
|---|---|---|---|
| C-01 | high | resolved | step/1440-light-fig-3a-s3.png, -s5, 2d-s4, 2e-s5; 390 equivalents |
| C-02 | medium | resolved | no instructor/he/his on sampled screens; ch 6 000–005 (but see C-18) |
| C-03 | medium | resolved | ch 6 002–003 table + key-rule box |
| C-04 | medium | resolved | 1-locks/018, 3-kv-store/010: pairs share one rule |
| C-05 | medium | resolved | clip posters at 1440 vs fig-4b, fig-1e |
| C-06 | medium | resolved | step 2d-s4, 2e-s5, 390 2e-s3 |
| C-07 | low | resolved | fig 1d (desktop, phone dark) |
| C-08 | low | resolved | fig 4b rings; clip poster in-place picks |
| C-09 | low | resolved | 2-check-in/019, 023 |
| C-10 | low | resolved | 2-check-in/011–013 |
| C-11 | low | resolved | 6-craft-and-keep/006 caption |
| C-12 | low | resolved | fig 1c phone, fig 2e |
| C-13 | medium | resolved | 2-check-in/012–013 order |
| C-14 | low | resolved | fig-3a s5 "12:00" |
| C-15 | low | resolved | 6-craft-and-keep/002 |
| C-16 | low | resolved | fig 1e "rolled back (ERROR 1213)" |
| C-17 | low | resolved | redis-sampling posters |

## New issues (all low, open)
1. **C-18 (content, regression from the voice pass):** swapping "he" for "the lecture" personifies the page:
   "the lecture's view of them is blunt: it hates them" (3-kv-store end of §3.2, `sweep/1440-dark/3-kv-store/006.png`),
   "The lecture's verdict is blunt: ORMs suck", "by the lecture's figure". Fix: state each as a marked opinion.
2. **C-19 (design):** the phone versions of Fig 5·b and 5·c squeeze "pulls changes / from master" between the
   cylinders, touching both outlines (`fig/390-light-fig-5b.png`, `fig/390-dark-fig-5c.png`). Fix: widen the gap.
3. **C-20 (design):** in the §3.5 upsert code block at 1440, two lines are cut off at the right edge with no sign
   that the block scrolls (`sweep/1440-light/3-kv-store/013.png`). Fix: re-wrap the lines.

Screenshot-crop artefacts, not page bugs: the bottoms of some `fig/` captions (fig-2e, fig-1c, fig-5c) are cut off,
and the phone clip shots end in blank space. The sweeps show these captions and clips in full.
