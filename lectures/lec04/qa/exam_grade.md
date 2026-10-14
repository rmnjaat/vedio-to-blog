# Lecture 04 - blind-reader exam grade (round 1)

- Key: `lectures/lec04/qa/exam.json` (119 questions)
- Blind answers (built page only): `lectures/lec04/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 115 |
| partial | 4 (Q013, Q079, Q115, Q116) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**115/119 correct (96.6%); 117/119 = 98.3% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q013 | partial | Both arrows double-headed: User ⟷ API Server ⟷ Database. The answer gives one-way calls. | **Present but distorted.** Fig 2·c (`site/src/figures/lec04/s2a-green-dots.tsx:92`) redraws board D-04 as two call panels: one-way request arrows and a single-headed API→db arrow. The ledger flattened it too (L-0039 / B-017: "user -> API server -> database"). `s2a-green-dots.mdx:70` gives the endpoint but not the diagram. | Make the API–db arrow double-headed (tsx:92) and add to `DESC_2C`: "As on the board (Interfacing API): user with a device ⟷ API server ⟷ database, both arrows double-headed." In `s2a-green-dots.mdx:70` add: "The board's interfacing diagram is the user (with a device) ⟷ API server ⟷ database, both arrows double-headed. [[L-0039]]" Correct L-0039 / B-017 to match board_log S14. |
| Q079 | partial | The board label "heavy on size and index" (and plain "sub-optimal") | **Absent.** The date-time figure (`site/src/figures/lec04/s5b-blog-rows.tsx:81`, desc line 76) shows only "convenient · can be sub-optimal"; the board's third label (board_log S72, L-0208 board_text) is dropped. | tsx:81 traits -> "convenient · sub-optimal · heavy on size and index" (same in desc line 76). In `s5b-blog-rows.mdx` near line 77 add: "The board labels it convenient, sub-optimal, and heavy on size and index. [[L-0208]]" |
| Q115 | partial | Idle TTL neither too short nor too long; find the sweet spot | **Reader slip.** `s4b-heartbeats.mdx:91`, right after the min/max sentence: "The connection TTL ... should be neither too short nor too long. Too long, and many unused connections stay open ... The sweet spot depends on the use case. [[L-0323]]" | None needed: reader slip. Optional: append to the line 89 parenthetical "…with an idle TTL that is neither too short nor too long." [[L-0323]] |
| Q116 | partial | The teacher's why: long queries keep connections open longer, so the TTL can't be short and the pool may need to grow | **Present but distorted.** `s4b-heartbeats.mdx:93` gives a page addition as the reason ("connections you need are roughly throughput × average query time"). The teacher's reason (transcript 02:58:02) is in line 91 but isn't tied to the metric. | Replace with: "It matters because long-running queries keep their connections open longer: the longer your queries take, the less you can shorten the TTL, and the more connections the pool has to hold. [[L-0324 L-0323]]" Keep the formula as a marked "Beyond the class" note. |

## Correct, with minor omissions (no fix required)

The content is on the page and the reader just left it out:
- Q008: "then check whether a server is overburdened / split into another service" (`s1-approach.mdx:40`).
- Q054: "in general a pool is always a great option" (`s4a-heartbeats.mdx:123`, the line after the one quoted).
- Q086: MySQL stores date-time compactly over a huge range, BCE to ~20,000 years (`s5b-blog-rows.mdx:167`).
- Q110: "with a lean team offload to DynamoDB; they become your extended engineering team" (`s3-redis-or-dynamodb.mdx:106`). The answer's verdict (assumed equal; if counted, it goes against self-hosted Redis) matches transcript 02:49:21.
- Q112: horizontal DB scaling comes next week.
- Q050: "one request and one response instead of five trips".
- Q004: "the design changes once sharding etc. are covered".
- Q083: "the format was a use-case choice (analytics)".
