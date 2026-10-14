# Lecture 05 - blind-reader exam grade (round 1)

- Key: `lectures/lec05/qa/exam.json` (141 questions)
- Blind answers (built page only): `lectures/lec05/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, who/what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 140 |
| partial | 1 (Q015) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**140/141 correct (99.3%); 140.5/141 = 99.6% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q015 | partial | The board's 4th shared-lock rule: if the current transaction wants to modify, its lock is upgraded to an exclusive lock. The reader gave the D-02 example ("T1 may read and modify, T2 may only read and wait") as rule 4. | **Present but far from where the question points.** The four board rules are never shown together. `s1-locks.mdx:146` gives rules 1-3 ("reserved for read by the current transaction"). The upgrade rule is at `s1-locks.mdx:164`, after Fig 1·b and a SourceNote, and the page doesn't say it came from the board (board_log S09: "if the current transaction wants to modify then / the locks will be upgraded to an exclusive lock"). | After the sentence at `s1-locks.mdx:146`, add: "The board listed the rules of a shared lock in four lines: the rows are reserved for read by the current transaction; other transactions can read them; other transactions cannot modify them; and if the current transaction wants to modify them, its lock is upgraded to an exclusive lock (more on that below). [[L-0041 L-0044]]" Keep line 164 as it is. |

## Correct, with minor omissions (no fix required)

These details are on the page; the reader left them out:
- Q001: the board agenda isn't quoted as a list, but the order is right.
- Q063: "documentation rules over YouTube videos" (`s6-keep.mdx:68`).
- Q073: the MongoDB/JSON-type example of querying inside a value.
- Q092: the REPLACE INTO / UPSERT spellings (given in Q085; `s3b-kv-store.mdx:51`).
- Q115: hot partitions and consistent hashing come later.
- Q122: on disk, deletes also need rebalancing.
- Q132: "many systems forget upsert exists".
- Q140: DynamoDB soft-deletes because it is foundational for KV stores (`s3a-kv-store.mdx:188`).
