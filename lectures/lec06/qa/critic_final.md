# Lecture 08 (lec06): final design critique, after fixes

**Verdict: pass.** I judged this on the current screenshots in `qa/final_shots`. All 20 issues from the first critique are
resolved. Of the five issues from the previous final look (C-21 to C-25), four are resolved, including the medium
regression C-21. One low issue stays open (C-22). There are three new low issues (C-26 to C-28). No blocker, high or
medium issue is open. No regression from the follow-up round is above low.

| | blocker | high | medium | low |
|---|---|---|---|---|
| resolved | 0 | 3 | 10 | 11 |
| open | 0 | 0 | 0 | 4 (C-22, C-26, C-27, C-28) |

## What matches the sample
- **Rhythm.** Chapter 4 now follows paragraph, figure, paragraph through §4.2–§4.4, with sheets 4·b–4·e
  (`sweep/390-light/4-tagging/009.png`, `015.png`). No other figure deserts turned up in the sampled sweeps.
- **Chapter openings** for 4–6 match 1–3: § kicker, title, dek, time, frame, then § N.1. The opener no longer echoes §4.1.
- **Fig 2·e** now matches its caption. The read-side join is drawn unstruck, and the spoken
  `select * from users where hash = ?` sits in a dashed "said in class, not written" box (`fig/1440-light-fig-2e.png`,
  `fig/390-light-fig-2e.png`).
- **Step-throughs** 2·c, 2·d and 6·b are readable at every step. Lifelines break behind the labels, the phone step
  circles clear their labels, and 6·b's clear starts at the status API.
- **Pause-and-think:** every verdict opens "Right: …" and restates the option that was picked.
- **Clips:** both posters tell the caption's story with the same numbers (50 / 48 / 2 / 48; badge 3 → 1, unread 300 → 301).
  Phone playback is a portrait layout and legible in dark mode.
- **Notation:** the key's "redis as store" cylinder is used throughout. Only the two misconception bubbles remain.
- **New §3.4 board list** (the six CDN steps) renders as a clean numbered list.
- **Machine QA** (`report.txt`) reports no failures.

## Open issues, ranked
1. **C-22 (low, content, carried over).** Some biography voice remains, one sentence each:
   - §7: "the instructor's own foundation… in college", "how the instructor built the skill", "The instructor didn't know Kafka's internals, guessed them…", and the members-only series.
   - §3.5: "The instructor recalls… they aren't sure which, read it six or seven years ago".
   - §2.2: "In the instructor's estimate…".
   - §1: "the instructor's own repository, DiceDB".

   Fix: state the claims directly.
2. **C-26 (low, design, new).** On the 390 layout of Fig 5·e, "getStatus" sits flush against the sheet's left edge
   (`fig/390-light-fig-5e.png`, `sweep/390-dark/5-badge/021.png`).
3. **C-27 (low, content, new).** Fig 3·b's caption says "Left / Right", but the phone layout stacks the panels.
   Refer to the panels as (a) and (b), which they are already labelled (`fig/390-light-fig-3b.png`).
4. **C-28 (low, design, new).** In Fig 6·d's "aux down" panel, main redis is drawn about 1.5× the standard cylinder.
   This is the size-for-emphasis that C-06 removed from 6·a (`fig/1440-light-fig-6d.png`).

## Regressions
None above low. The follow-up round fixed C-21 to C-25 without breaking the figures it touched: 2·c, 2·d, 2·e, 3·b,
4·d, 5·g, 6·c and 6·d, at 1440 and 390.
