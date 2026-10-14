# Lecture 04 (lec02) pages: design critique

Built pages: overview plus 10 chapter pages under `site/dist/lectures/lec02/`. I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and against Lecture 1's finished pages.
Screenshots are in `lectures/lec02/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: every page at 1440, 1024 and 390, light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps. I read about one screen in three on every page, plus every screen with a figure, clip or card.
- `fig/`: every figure, plus the pause-and-think before/after states. `step/`: every step of the 6 step-throughs. `clip/`: the poster and a playing frame for each of the 4 clips.
- `report.json`: no machine failures.

## Verdict: PASS WITH FIXES

### What matches the sample

- **Look:**
  - Paper and blackboard tokens, Literata body text and Recursive for UI and lettering.
  - Graph-paper sheets for every figure.
  - The key-rule box ("The rule for this whole chapter"), with a small sketch inside, in chapters 3, 5, 7 and 8.
  - The lecture's own notation key, and sticky-note pause-and-think cards.
  - The sample's marker colours, used with the same meanings: blue for request/message, green for saved/ack, red for failure.
- **Dark mode** is clean on every page I sampled (`1440-dark-9-the-whole-system-mid.png`, `390-dark-3-column-stores-mid.png`).
- **Rhythm:** paragraph, figure, paragraph holds through chapters 2–4 and 6–10. Chapters 8 and 9 alternate prose with figures, step-throughs and clips without stacking components. The two exceptions are in C-07.
- **Figures:**
  - The static figures look drawn by one hand: about 13–15px lettering, the same stroke weight, the same marks as lec01.
  - The phone versions are real redraws: fig-5a stacks its three panels, fig-7c stacks its three paths, fig-9b is re-flowed vertically, and fig-6b gets a portrait layout.
- **Pause-and-think:** all 9 cards have question-specific verdict lines that agree with the reveal (for example, "Right: projection filters after the read; the column store is the one that skips files."). The lec01 templating bug has not come back.
- **Clips:** all 4 have a server-rendered poster that tells the story ("Persistence is guaranteed. The real-time push is not."), beat chips, a caption that matches the poster, and a text alternative. All 4 have real portrait compositions at 390, with lettering of about 14px or more.
- **Navigation:**
  - Three columns: course rail with the current chapter marked, prose, and an "On this page" rail with scrollspy that lists h3s.
  - On phone, a "§x.y" bar and a drawer.
  - Each chapter opens with "Lecture 04 · Slack in real time · chapter n of 10", a promise line and a time estimate.
  - Each chapter ends with "Check yourself", concepts, "Contents of this lecture ↑" and previous/next hand-offs. Cross-reference chips ("coming later · Lecture 05") are in place.

### What is not acceptable yet

- One desktop step-through cuts off its own answer.
- One phone step-through cuts off its closing label and isn't a redraw.
- Labels collide in three places.
- Phone swim lanes still separate an arrow from its sentence.
- The notation key's kafka mark is never used.
- Two sections are figure deserts.

## Issues, ranked

### High

1. **C-01: the Fig 6·c step-through (fig-6b) is clipped at desktop width.**
   - Evidence: `step/1440-light-fig-6b-s6.png`.
   - The sheet ends before the drawing does. The row that step 6 is about, the green `from | channel_id | msg`, and its "one channel_id, always" label are cut off. The phone redraw (`step/390-light-fig-6b-s6.png`) is complete.
   - Fix: size the sheet to the viewBox, or remove the overflow clip on the drawing column. Re-shoot at 1440 and 1024.

2. **C-02: on phone, fig-8f loses its last label, and the drawing isn't a phone redraw.**
   - Evidence: `step/390-light-fig-8f-s7.png`.
   - "also: a periodic meta call listing my channels" is cut by the sheet edge. Six lanes are squeezed to 358px, with headers at the 12px floor and "c2 only: nothing" sitting on a lifeline.
   - Fix: redraw for phone with four lanes (A, ws1, redis, ws2), with ws3 and api as a note, and stacked step labels.

### Medium

3. **C-03: fig-10b labels collide on desktop.**
   - Evidence: `step/1440-light-fig-10b-s6.png`, `step/1440-light-fig-10b-s3.png`.
   - The struck-out "01-01-1970" runs into "never trust the client's clock". The rotated "time" label sits on step marker ①.
   - Fix: stack the line under the clock as the 390 version does, and move "time" clear of the marker column.

4. **C-04: phone swim lanes are mostly empty, so the arrow and its sentence are never on screen together.**
   - Evidence: `sweep/390-light/8-scaling-websockets/030.png`, `031.png`, `035.png`, `036.png`.
   - The lanes in fig-8f, fig-8h and fig-10b are about 650px tall at step 1. The sticky Prev/Next bar covers the only populated row as the figure scrolls in. This is lec01 critic issue 6 again.
   - Fix: on phone, crop the viewBox to the rows reached so far.

5. **C-05: fig-3b's row labels are struck through by its own dashed line.**
   - Evidence: `fig/1440-light-fig-3b.png`.
   - Every "2" renders as "-2-", on the row the figure is about.
   - Fix: break the dash around each label.

6. **C-06: the notation key's kafka glyph is never used.**
   - Evidence: `fig/1440-light-fig-l02-key.png` against `sweep/1440-light/7-sending-a-message/009.png` and `clip/1440-light-l02-missed-message-fig-poster.png`.
   - The key draws a pipe with two circles. The figures use a plain pipe, and the clips use "■ kafka".
   - Fix: pick one glyph and use it everywhere. The clips' version is the most distinct.

7. **C-07: §5.2 and §1.1 are figure deserts.**
   - Evidence: `sweep/1440-light/5-sql-or-nosql/002.png`–`003.png`, `sweep/1440-light/1-nosql-is-not-one-thing/002.png`.
   - §5.2 is about two screens of prose. §1.1 has six paragraphs before the first figure.
   - Fix: add one small sketch to each: the backstory scale for §5.2, the "NoSQL" blanket over named stores for §1.1.

8. **C-08: replication arrows in fig-9d and fig-1a point against the data.**
   - Evidence: `sweep/1440-light/9-the-whole-system/016.png`, `sweep/1440-light/1-nosql-is-not-one-thing/003.png`.
   - "② copy" runs from nodes 2 and 3 into node 1. "catches up" runs from node 2 to node 1. Both read as the replica pushing to the primary.
   - Fix: draw node 1 → replicas, or label the arrow "pull". Also lift "write m42" off node 1's lid.

### Low

9. **C-09: the Fig 6·c caption says "Time runs down" for a stack of schema drafts.**
   - The numbering also jumps from 6·a to 6·c (`sweep/1440-light/6-slack-schema/006.png`).

10. **C-10: the course rail shows Lecture 02, "Medium under load" (lec01), as "coming soon".**
    - Possibly only because this QA build contains lec02 alone. Verify in the full build (`1024-light-overview-top.png`).

11. **C-11: fig-7c uses green "saved" marks on phone but not on desktop.**
    - Evidence: `fig/390-light-fig-7c.png` against the desktop drawing.

12. **C-12: the mesh-to-pubsub clip poster's red toy-limit tick collides with the "D" chip.**
    - Evidence: `clip/1440-dark-l02-mesh-to-pubsub-fig-poster.png`.

## Counts

| severity | design | content | animation |
|---|---|---|---|
| high | 2 | 0 | 0 |
| medium | 6 | 0 | 0 |
| low | 2 | 1 | 1 |

All 12 can be handled by the fixers. None needs a page rework.
