# Lecture 5 exam grade, round 2

Key: `lectures/lec05/qa/exam.json` (141 questions). Answers: `lectures/lec05/qa/blind_answers_r2.json` (page only).

## Score

| Grade | Count |
|---|---|
| correct | 140 |
| partial | 1 |
| wrong | 0 |
| missing | 0 |
| **Score (correct / total)** | **140 / 141 = 99.3%** |
| Half-credit for partials | 140.5 / 141 = 99.6% |

## Items not fully correct

| Q | Grade | What it lacked | Cause (page source) | Proposed fix |
|---|---|---|---|---|
| Q088 | partial | The notes' starting setup: "start with a single node and then scale as the system demands". The reader gave MySQL and "single node", but answered with the slides' four-column schema and left out the "scale as the system demands" half. | **Present but far from where the question points.** 3.2 (`s3a-kv-store.mdx:95`) presents the class's slides and notes only as the `store` schema. It never states the notes' storage choice or starting setup. "Start with a single node and scale it as the system demands" appears only at `s5-distributed.mdx:46`. 3.1 (`s3a-kv-store.mdx:30`) has the general "Start simple, then scale out". Neither is tied to the notes' storage choice. | At `s3a-kv-store.mdx:95`, before "The class's slides give the single-node schema...", add: "The prepared notes open with the storage choice: MySQL, starting with a single node and then scaling as the system demands. [[L-0170]]" (board S65 02:02:45, transcript 02:02:59). |

## Correct, with minor omissions

- **Q001:** The page gives the order the class ran in, not the board's agenda wording. The three items and their order match.
- **Q092:** Names the upsert but not REPLACE INTO or the Postgres statement. The reader gives both under Q085 (`s3b-kv-store.mdx`).
- **Q129:** Gives the verdict ("100%") and the 10–15 table joins. It does not restate "no raw performance / no DB-specific operations"; those reasons are in its Q127 answer.
- **Q130:** Leaves out the FizzBuzz Enterprise Edition reference, which is on the page at `s6-keep.mdx:70`.
- **Q140:** Leaves out that key-value stores like DynamoDB soft-delete because for them it is foundational. This is on the page at `s3a-kv-store.mdx:188`.

Fixes proposed: 1 (Q088).
