# Lecture 06 - blind-reader exam grade (round 2)

- Key: `lectures/lec06/qa/exam.json` (134 questions)
- Blind answers (built page only): `lectures/lec06/qa/blind_answers_r2.json` (regraded against the 17:34 answer set, after the round-2 page fixes)
- Graded against the key's substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 133 |
| partial | 1 (Q109) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**133/134 correct (99.3%); 133.5/134 = 99.6% counting a partial as half.** (Round 1: 131/134, 97.8%.)

Fixed since the previous round-2 pass: Q070 (the board's six-step CDN list is now on the page and answered in full), Q056 (`api.gravatar.com/photos` now matches the board).

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q109 | partial | When each side applies (source of truth for strong consistency; pre-compute or store directly consumable for efficiency) and that pre-computed data needs a separate flow to keep it updated; the answer only names the two halves | **Reader slip.** `s5b-badge.mdx:20`: "you either query the source of truth, or you keep things pre-computed"; RuleBox at `:22`: "Query the source of truth when you need strong consistency. For efficiency, pre-compute, or store the data in a form that is directly consumable."; `:31`: "You need another flow that also writes the data there." The reader gave the full content under Q110. | None needed: reader slip (L-0258, L-0259, L-0261 already on the page). |

Fixes proposed: 0 page fixes (the single non-correct item is a reader slip).

## Correct, with minor omissions (no fix required)

- Q004: verdict and mechanism right, but the answer drops the teacher's reason (the browser is a deliberately dumb platform that must stay basic to be used with hundreds of other things). On the page at `s1-images.mdx:45` (L-0016, L-0017).
- Q018: names ImageMagick and PIL but not that the teacher recommended PIL for Python (`s1-images.mdx:152`, L-0047).
- Q052: folds the board's four "Prepare for upload" sub-steps (request service, random id, signed URL, send to user) into one sentence; all the substance is there.
- Q055: the four render steps are given, but not the exact select inside step 2. The query is answered correctly in Q043.
- Q067: the board's sample row (729 | arpit@gmailcom | 0eafd172 | cdae) is not in the answer.
- Q023: the answer notes the page does not describe the board's pink arrow; the substance (email is PII, so the URL carries its hash for security) is there.
