# Lecture 03 (lec05) pages: design critique

Built pages: the overview plus six chapter pages (`1-locks` … `6-craft-and-keep`). I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and against Lecture 1's finished pages.
Screenshots are in `lectures/lec05/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: every page at 1440, 1024 and 390, light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps. I read every third screen and every screen with a figure, clip or card.
- `fig/`: every figure and the before/after state of each pause-and-think card.
- `step/`: every step of fig-2d, fig-2e and fig-3a.
- `clip/`: the poster and a playing frame for each of the 4 clips.
- `report.json`: the machine checks. No failures.

## Verdict: PASS WITH FIXES

**The look matches the sample.**
- Paper and blackboard tokens, Literata and Recursive, graph-paper sheets, the key-rule box ("The rule for this whole chapter"), mustard pause-and-think cards, the course notation key plus this lecture's own key (`fig-l5-key`: transaction, row, lock held/granted, hourglass = waiting, not failure).
- The marker colours keep their meaning: blue for requests, green for ack/granted, red for failure and the dropped column, graphite plus hourglass for waiting.

**Navigation works.**
- All three columns are there. The left course rail marks the current chapter, and the right rail shows the §n.m outline with scrollspy and nested h3s.
- The breadcrumb carries the section number.
- Every chapter has a chapter-of-6 kicker, a hand-off paragraph, "Contents of this lecture ↑" and previous/next chapter links.

**Dark mode is clean** (`1440-dark-*`, `390-dark-*`, `fig/390-dark-*`).

**Phone figures are real redraws**: fig-1b, 1c, 2c, 3b and 5c are stacked vertically, not shrunk (`fig/390-light-fig-5c.png`).

**Pause-and-think verdicts are specific to each question and agree with the reveal**: "Right. Every run filled all 120 seats, in seat order…", "Right. With expired_at stored, the job is WHERE expired_at <= now()…".

**Clips work on phone**: portrait stages, legible lettering, posters that tell the outcome ("Lock rows in the same order and this loop can't form").

What needs fixing: the step-throughs never reach their last step, chapter 6 is a teacher-biography wall without a figure, collapsed asides leave blank bands, and the clips are drawn at a different scale from the sheets.

## Issues, ranked

### High

1. **C-01: Step-throughs lag one step behind the counter.** (design)
   - Where: `step/1440-light-fig-3a-s3.png`, `fig-3a-s5.png`, `fig-2d-s4.png`, `fig-2e-s5.png`, `step/390-light-fig-2e-s5.png`, `390-light-fig-3a-s5.png`.
   - At 3/5, step 2 is highlighted and step 3's drawing is still faded.
   - At the last step nothing is current. The 3+2+1=6 / 7,260 tally, the 1A-to-many seat map and the upsert row stay at future opacity, so the payoff is never shown. Lecture 1's step-throughs do this correctly.
   - Fix: check the step index mapping. If the page is right and the capture runs before the opacity transition ends, make the capture wait for `transitionend` and re-shoot.

### Medium

2. **C-02: Teacher-narration voice.** (content)
   - Examples: "ORMs suck, and he hates them", "he has scaled SQL systems massively", "a big supporter of formal education", "That is his inference", "by his estimate", "the instructor went through its source code".
   - Where: `sweep/1440-light/6-craft-and-keep/000–005.png`; also §2.5, §2.7, §3.1, §4.2 and §5.3.
   - This is the same problem as lec01 #14.
   - Fix: plain claims, with opinions flagged once and provenance kept in the meta lines.
3. **C-03: Chapter 6 is a figure desert.** (content)
   - Five desktop screens of paragraphs come before Fig 6·a.
   - Fix: cut about 30% and add one ORM-vs-SQL sheet or key-rule box, plus a card or short list in §6.3.
4. **C-04: Stacked collapsed asides leave blank bands.** (design)
   - Where: `sweep/1440-light/2-check-in/015.png` (three closed asides with about 50px of empty space between each), `3-kv-store/010.png`, `1-locks/018.png`.
   - Fix: give a closed `<details>` zero body height, and allow at most two asides in a row.
5. **C-05: The clips don't look like the same hand as the sheets.** (animation)
   - Clip lettering is about 18–22px with a heavy marker stroke. Static sheets are about 13px in pencil weight.
   - Fig 4·b and clip 4·1 draw the same grid at different scales.
   - Where: `sweep/1440-light/2-check-in/017.png`, `3-kv-store/021.png`, `4-redis-expiry/007.png`.
   - Fix: pin in-stage lettering at 15–16px and match the stroke width.
6. **C-06: Label collisions in the swim lanes.** (design)
   - fig-2d: the "1A" reply labels sit on the arrow shafts, "UPDATE, commit" crosses the lifelines, and the struck "1A = p1" box overlaps an arrowhead.
   - fig-2e: the bubble covers the T2/T3 lanes.
   - Where: `step/1440-light-fig-2d-s4.png`, `fig-2e-s5.png`.

### Low

7. **C-07: fig-1d arrows point into T2**, the initiator. Panel b's lines have no arrowheads, and "kills itself" overstates what NOWAIT does: it fails the statement and does not kill the transaction (`sweep/1440-light/1-locks/012.png`).
8. **C-08: The "random" sample of 20 in fig-4b and clip 4·1 is drawn as contiguous rectangles.** It reads as a block scan. Mark scattered cells instead.
9. **C-09: Spacing.** Prose runs flush under the §2.5 comparison table. The "coming later" chips crowd the paragraphs around them (`2-check-in/019.png`, `023.png`, `4-redis-expiry/010.png`).
10. **C-10: §2.4's predictions are an all-bold bulleted list**, followed by a "More precisely" box and the pause card, with one sentence between them (`2-check-in/012.png`).
11. **C-11: fig-6a caption grammar.** "whose rows writes lock" is ungrammatical.
12. **C-12: Three speech bubbles; NOTES allows one, for the misconception.** Keep fig-3b's ("just add an index on created_at?"). Turn fig-1c's and fig-2e's into plain annotations.

## Checked and fine

- The overview page: chapter list with section ranges, "Where we are".
- Code blocks: syntax colours, side notes such as "saves: a network round trip".
- Both comparison tables: the red ✕ marks the failing cell only.
- Clip controls: play/pause, scrubber, 0.5×, chapter chips, "The clip as text". Captions agree with the posters: 1.7 s vs 147 ms, 7/20 → 6/20 → 4/20.
- Fig 5·b, 5·c and 6·a: replica → master pull arrows are dashed and point the right way, routing is orthogonal, and nothing crosses.
- Fig 3·a / 3·b: red marks the dropped query, green its replacement, consistently on desktop and phone.
- No horizontal scroll at 390px, and no console failures in `report.json`.
