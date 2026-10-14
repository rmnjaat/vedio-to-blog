# Lecture 02 - blind-reader exam grade, round 2

- Key: `lectures/lec02/qa/exam.json` (155 questions)
- Blind answers (built page only): `lectures/lec02/qa/blind_answers_r2.json`
- Graded on substance: numbers, conditions, arrow direction, what connects to what, and the teacher's verdict. Extra fact-check notes in the answers were not penalised.
- Regraded in full against the current `blind_answers_r2.json` (2026-10-14 11:35); the result matches the earlier r2 grade.
- Validator: `python3 pipeline/lib/check_qa.py grade lec02 lectures/lec02/qa/exam_grade_r2.json` -> OK

## Score

| Grade | Count |
|---|---|
| correct | 155 |
| partial | 0 |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**155/155 correct (100.0%); half-credit score is also 100.0%.**

Round 1 scored 152/155 (98.1%), with partials on Q039, Q113 and Q126. All three are now fully answered:
- Q039: the reader quotes the pink note under the three reasons.
- Q113: the reader lists all four recap tables with their fields.
- Q126: the reader gives the recap chain from "5th user" through "we bridge the gap" to "Not a great idea! Can we do better?".

## Non-correct items

None. No fixes proposed.

## Correct, with minor omissions

None of these need a page change. The missing detail is either answered elsewhere by the reader or was correctly left out of the page.

| Q | What the answer left out | Why no fix |
|---|---|---|
| Q072 | The key's framing that product requirements, not stack affinity, decide the database | The verdict is there: Instagram Messenger, everyone chit-chatting in one DB, so Cassandra for high ingestion. |
| Q087 | It does not name the two board lines (API -> DB cylinders, and the vertical API-WS line) | It gives the same connections from the page's redrawn diagrams: the API persists to the DB, then tells the WS server. |
| Q092 | The per-server in-memory example (WS1: A->C1 ... D->C1; WS2: E->C1) | Mechanism (client sends membership, server keeps it in memory) is complete; the example map is on the page around `s8a-websockets.mdx:32`. |
| Q097 | The remark that adding servers leads to a full mesh | The reader gives the full-mesh point in Q100 and Q126 (`s8a-websockets.mdx:178`). |
| Q101 | The worked count "4 users + 1 link to Pub/Sub" | "Each server needs just one connection to it" carries the substance; the count is at `s8b-websockets.mdx:36`. |
| Q113 | The appended insight that DMs are channels with 2 people | The reader gives it in Q063 and Q065. |
| Q151 | "Workers hold the message and retry until the DB commits" | Ledger L-0425 records that as the student's proposal (status open). The teacher only confirmed that the DB acks the write to the worker. The page (`s9-whole-system.mdx:241`) reports exactly that, so the key over-attributes it. |
