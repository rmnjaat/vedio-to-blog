# Lecture 04 (lec02): design critic, final look (after the follow-up fixes)

**Verdict: `pass`.** No blocker, high or medium issue is open.

- C-01 to C-12 come from the first critique and C-13 to C-18 from the previous final look. All 18 are resolved.
- This look adds 2 new low issues: C-19 (a regression) and C-20 (an older defect that earlier critiques missed).
- Open now: 2 low.

Every judgement below comes from `lectures/lec02/qa/final_shots` (11:30 run). The fixers' reports were read only to find where to look.

## Still matches the sample

- **Fonts:** this run renders in the real Literata and Recursive. The font fallback noted last round is gone.
- **Look:** paper and blackboard tokens, graph-paper sheets, key-rule boxes, sticky-note pause-and-think cards and the notation key all match the sample.
- **Colour:** marker colours keep their meaning: blue is the request path, red is failure, green is a save or ack.
- **Rhythm:** paragraph, figure, paragraph throughout. The new sketches (Sketch 1·1, Sketch 5·1) fill the two former figure deserts at notation-key scale.
- **Navigation:** the three columns, the current chapter marked in both rails, and chapter openings and hand-offs. The rail now links 01, 02, 03 and 05, and the overview's "Slack so far" links into Lectures 01–03.
- **Dark mode:** checked at 1024 and 390, with no issues found.

## Re-check

| id | sev | status | evidence |
|---|---|---|---|
| C-01 | high | resolved | `step/1440-light-fig-6b-s6.png` |
| C-02 | high | resolved | `step/390-light-fig-8f-s7.png`: ⑦, SUBSCRIBE arrow, 'ws1: c1, c3' and the closing note all show inside the sheet |
| C-03 | medium | resolved | `step/1440-light-fig-10b-s6.png` |
| C-04 | medium | resolved | `sweep/390-light/8-scaling-websockets/031.png`, `fig/390-light-fig-8h.png` |
| C-05 | medium | resolved | `fig/390-light-fig-3b.png` |
| C-06 | medium | resolved | '■ kafka' in key, figures and clips (`clip/390-dark-l02-missed-message-fig-poster.png`) |
| C-07 | medium | resolved | `fig/390-dark-fig-1-names.png`, `fig/1440-light-fig-5-backstory.png` |
| C-08 | medium | resolved | `fig/1440-light-fig-9d.png` ('replicas pull a copy') |
| C-09 | low | resolved | caption unchanged since the last fix |
| C-10 | low | resolved | `1440-light-overview-top.png` rail |
| C-11 | low | resolved | `fig/1440-light-fig-7c.png` |
| C-12 | low | resolved | toy-limit tick in the gap (`sweep/1440-light/8-scaling-websockets/012.png`) |
| C-13 | low | resolved | halos on active-step labels (`step/1440-light-fig-8f-s3.png`, `-s5.png`) |
| C-14 | low | resolved | real webfonts throughout |
| C-15 | low | resolved | `390-dark-4-graph-databases-mid.png` |
| C-16 | low | resolved | `fig/390-light-fig-2a1.png` |
| C-17 | low | resolved | 'Sketch 1·1' and 'Sketch 5·1' lead labels |
| C-18 | low | resolved | bridge sentence (`sweep/1440-light/8-scaling-websockets/013.png`) |

## Open issues

1. **C-19 (low, design, regression): the overview pager has the wrong label.**
   - Since the C-10 fix, Lecture 03 counts as published in the reading order.
   - The overview's pager now reads "← Previous chapter · 6 · Craft, opinions, and what to keep". That is Lecture 03's last chapter, but nothing on the page says so.
   - On Lecture 04's overview, a reader takes it for this lecture's own chapter 6, which is "Slack: the problem and the schema".
   - Compare `1440-light-overview-end.png` with `critic_shots/1440-light-overview-end.png`, which had no previous link.
   - The ch10 end ("Next lecture · Lecture 05 · …") already names the other lecture, so the two hand-offs are inconsistent.
   - Fix: in `lib/lecture.ts` `around()`, when the stop is a chapter of another lecture, label it "Previous lecture" and prefix the lecture label, or point to that lecture's overview.
   - The code is shared, so re-check the same pager in lec01, lec04, lec05 and lec08.
2. **C-20 (low, animation): Clip l02-mesh-to-pubsub phone poster.**
   - '4 + 1 = 5' and '4 users + 1 link' sit on one line and read as one string (`clip/390-light-l02-mesh-to-pubsub-fig-poster.png`). The 1440 layout stacks them.
   - The same defect is in `critic_shots`, so it predates the fixes.
   - Fix: stack them in the portrait layout.

## Regressions

- **C-19** is the only regression. It comes from the shared cross-lecture reading-order change made for C-10.
- **Shared `StepThrough` change:** the step bar now becomes static at the last step of a phone "grow" figure. It does what it should for fig-8f and fig-10b, and the earlier steps stay sticky.
- **Other follow-up changes:** the fig-8f phone repack, the label halos, the new LectureLink text links and the bridge sentence broke nothing else in the screens sampled.
  - Sampled: overview, chapters 4, 6, 7, 8 and 10 at 1440, 1024 and 390, in light and dark.
  - Also checked: every step of fig-8f, the last steps of fig-6b and fig-10b, the sketches, the fig-8h step-1 figure, the pause-and-think cards and the clip posters.

## Caveats

- `step/` has shots only for fig-6b, fig-8f and fig-10b. fig-8h steps 2–5 were not shot, so its last phone step is not verified here. It uses the same shared last-step behaviour that fixed fig-8f.
- On phone, element shots of tall step-throughs (`step/390-light-fig-10b-s5.png`, `-s6.png`) show the sticky site header and "On this page" bar over the drawing. The same overlay is in `fixes_design_shots`, from before the follow-up. It is a side effect of how a figure taller than the 844 px viewport is captured, not a page change, so it is not logged as an issue.
