# Lecture 03 - blind-reader exam grade (round 1)

- Key: `lectures/lec03/qa/exam.json` (127 questions)
- Blind answers (built page only): `lectures/lec03/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, who/what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 125 |
| partial | 2 (Q039, Q100) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**125/127 correct (98.4%); 126/127 = 99.2% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q039 | partial | The boxed board lesson "there is no way to distribute and guarantee strict monotonicity", and the two named relaxations (non-integer IDs, no monotonicity). The reader quoted "we made the entire process super complicated" as the board line and gave only a generic "relax constraints". | **Present but distorted (attribution).** `s3-order-and-clocks.mdx:210` labels "we made the entire process super complicated" as the class-board text. The boxed lesson (board S40, 00:42:27) sits at lines 216 and 218 as plain prose with no board label, so the reader could not tell which one was boxed and left out the relaxations given at line 218. | Start line 216 with: "The lesson the class board boxed: “There is no way to distribute and guarantee strict monotonicity.” [[L-0081]]". Change line 218 to: "Every fix brings a new problem or a new constraint. So, as the board put it, the solutions we see out there have relaxed constraints, in two directions: non-integer IDs, and no monotonicity, because not everyone needs monotonicity. [[L-0082]]" |
| Q100 | partial | The board's list: no moving part / no service / just a function call (library) / no extra load on DB, plus "the logic is handled by API servers". The reader said the page has no board list and missed "no extra load on DB" and "just a function call". | **Present but far from the question, and not attributed to the board.** The items are on the page but spread out: `s6-snowflake.mdx:114` (no moving component, no central ID service, no extra load on a database) and "a library inside the API servers", both in §6.3. §6.7 "No moving parts" (line 222 on) never restates them as the board's list (board S78, S79, 01:55). | Open §6.7 (before line 226) with: "The class board summed up Snowflake's benefits as a list: no moving part; no service; just a function call (a library); no extra load on the database. The logic is handled by the API servers, which is excellent. [[L-0210]]" |

## Correct, with minor omissions (no fix required)

- Q007: leaves out that the counter "resets every few minutes" (`s2-building-getid.mdx:99`).
- Q013: leaves out that the counter may be reset periodically as long as it stays under its limit (`s2-building-getid.mdx:114`). The answer's "never resets" matches the time-less form at line 135.
- Q045: leaves out "it's a trade-off, no single right way".
- Q077: gives 241 and 242, which is what the teacher said (transcript 01:30:01); the board wrote 240 and 241. The substance (MAX + BUFFER, purely for aesthetics) is correct.
- Q120: leaves out that within one ms the smaller machine ID sorts first. The reader gave this in Q089.
- Q123: leaves out DynamoDB and Redis as other atomic stores.
- Q127: leaves out that strict order means accepting lower throughput (cf. `s6-snowflake.mdx:192`, "extremely inefficient").
