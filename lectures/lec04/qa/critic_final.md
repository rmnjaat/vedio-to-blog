# Lecture lec04: design critic, final look (after fixes, round 3)

**Verdict: pass.** No blocker, high or medium issue is open.

I judged the current screenshots in `qa/final_shots` (taken 09:14) on their own, without relying on the fixers' reports.

- **Resolved: 14 issues.** These are C-01 to C-11 from the first critique, plus C-12 to C-14 from the earlier final look.
- **Open: 5 issues, all low.**
  - C-15 to C-17 were raised in the earlier final look and are still unfixed.
  - C-18 and C-19 are new. Both are small label collisions on phone, side effects of the follow-up fixes (the C-13 widening of fig-2c, and the F-007 relabel of fig-7a).
- **Regressions: none in layout, navigation, dark mode or step-throughs.**

## What matches the sample

- **Figure rhythm:** the figure deserts in chapters 3 and 5 are gone.
  - Fig 3·b shows what a crash costs under AOF and RDB.
  - Fig 3·d sets Redis's built-in structures against DynamoDB → Streams → Lambda.
  - The §3.3 "who carries the work" table now has matching glyph headers.
  - Fig 5·i is the epoch number line, with a red 2038 wall and a dashed int64.

  All of these use the same hand, are redrawn for phone, and read in dark mode.
- **Voice:** the copy teaches directly.
  - "the instructor" appears 0 times, and there is no biography or turn-by-turn Q&A.
  - War stories sit in collapsed "From practice" asides.
- **Phone step-throughs:** with `grow`, the arrow that changed, Prev/Next and the step sentence share one screen (fig-2e s1, fig-4b s3/s5). The lane heads clear the sticky bars.
- **Notation:**
  - The api glyph is used throughout chapter 4.
  - Fig 4·d has a plain annotation instead of a bubble, so fig-6a has the lecture's only bubble.
  - Fig 6·b routes are readable, with hops at the crossings and the ✓ at the blue arrowhead.
- **Clips:**
  - The heartbeat-expiry phone poster is clean: "deleted" stands alone, the labels are in full ink, and "sped up" has its own line.
  - Staggered-delete now shows slowdown rather than failure ("slowed, never down" / "barely slowed").

## Re-check of earlier issues

| id | sev | status | evidence |
|---|---|---|---|
| C-01 | medium | resolved | sweep/1440-light/3-…/004, 007, 011; fig 3b, 3d |
| C-02 | medium | resolved | sweep/1440-light/5-…/019–021; fig 5i (placed just after the note, same screen) |
| C-03 | medium | resolved | page_text_r2: "instructor" 0; residue logged as C-17 |
| C-04 | medium | resolved | step/390-light-fig-2e-s1, 4b-s3, 4b-s5 |
| C-05 | low | resolved | fig/1440-light-fig-6b, 390-light-fig-6b |
| C-06 | low | resolved | fig 4c, 4e-s5, 4f, 4g |
| C-07 | low | resolved | fig 4d desk + phone |
| C-08 | low | resolved | clip/390-light-l04-heartbeat-expiry-fig-poster |
| C-09 | low | resolved | sweep 3-…/007, 016 |
| C-10 | low | resolved | step/390-light-fig-2e-s1 |
| C-11 | low | resolved | phone heights: ch4 −11%, ch5 −8% (with the new figure added) |
| C-12 | medium | resolved* | viewport shot followup/slow-390-fig-4e-s5 is fine; see the note below |
| C-13 | low | resolved | fig 2c: the api ⟷ db arrow has a shaft |
| C-14 | low | resolved | fig/390-light-fig-4d |
| C-15 | low | **open** | 6-cache/008: the §6.3 header glyphs (cube, cylinder + table, none) still don't match the columns |
| C-16 | low | **open** | 3-…/004 desk still cuts "can lose about". Phone clips both the §3.2 redis.conf block and the §5.8 SQL block |
| C-17 | low | **open** | "Built in: the first tick on the board", "(offered with an 'I think')" and "only partly audible on the recording" (§6.3) are still on the pages |

\*C-12: the pipeline's element shot `step/390-light-fig-4e-s5.png` still shows the step bar over row 5. Every phone step shot has the bar at the same offset (for example, 4b-s5 half-covers "5 trips…"), so this is how the harness captures the page, not how the reader sees it. Suggestion: switch the phone step captures to viewport shots.

## New issues (open)

1. **C-18 (low, design): fig-2c phone, right panel.** "GET /status/users" and "?ids=…" run into the api box outline. This is a side effect of the C-13 widening. Fix: end the labels about 6 units short of the box.
2. **C-19 (low, design): fig-7a phone.**
   - The relabelled store ("redis or / dynamodb"), "pool" and "ttl 30s" crowd into one corner under the cube.
   - The §5 tag sits on top of the "users" label.

   Fix: move "ttl 30s" by the clock, centre the store label under the cube, and nudge the §5 tag clear of "users".

## Pages sampled

- **Sweeps:**
  - Chapter 3 desk: 004, 005, 007, 009, 010, 011, 013, 016.
  - Chapter 5 desk: 018–021.
  - Phone: chapter 3 005; chapter 5 030 and 031; chapter 2 010.
  - Chapter 6 desk: 008 and 009.
- **Page shots:** dark at 1440 and 390, light at 1024, the phone overview and the chapter 7 end.
- **Figures:**
  - All new and changed figures (2c, 3b, 3d, 4c, 4d, 4f, 4g, 4h, 5g, 5i, 6b, 6e, 7a) on desk and on phone.
  - Phone and desk step shots for 2e, 4b and 4e.
  - The think cards for chapters 3 and 5.
  - The heartbeat-expiry and staggered-delete posters, plus a playing frame.
