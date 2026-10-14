# Lecture 02 - blind-reader exam grade (round 1)

- Key: `lectures/lec02/qa/exam.json` (155 questions)
- Blind answers (built page only): `lectures/lec02/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, who/what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 152 |
| partial | 3 (Q039, Q113, Q126) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**152/155 correct (98.1%); 153.5/155 = 99.0% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript/board) |
|---|---|---|---|---|
| Q039 | partial | What was written beneath the three "Why non-relational DBs scale" reasons: "We can also achieve ↑ on SQL databases" / "So, saying SQL does not scale is not entirely correct". The reader said the page doesn't say. | **Present but far.** `s5-sql-or-nosql.mdx:32` gives the three reasons (L-0109) but not the pink note under them (board S33, 00:39:45). The idea is only in chapter 1 (`s1-nosql.mdx:97`, L-0024), not tied to this board list. | Append to `s5-sql-or-nosql.mdx:32`: "Beneath the three reasons the board added, in pink: 'We can also achieve these on SQL databases. So, saying SQL does not scale is not entirely correct.' Drop the constraints and a relational database shards too (§1.3). [[L-0024]]" |
| Q113 | partial | The recap's table fields: workspace(id, name); channels(id, workspace_id, name, type); messages(id, channel_id, message, user_id, ts); membership(channel_id, user_id, checkpoint). The reader had only "adds workspace and ts". | **Absent (field lists).** `s6-slack-schema.mdx:153` sums up the recap schema in one clause (L-0310) and never lists its tables and columns (board S99/S100, 02:19:39-02:19:45; L-0313). | Replace the last sentence of `s6-slack-schema.mdx:153` with: "The recap board wrote the schema out formally: a workspace has multiple channels, each with multiple messages, so `workspace (id, name)`; `channels (id, workspace_id, name, type)`; `messages (id, channel_id, message, user_id, ts)`; and `membership (channel_id, user_id, checkpoint)`. [[L-0310 L-0313]]" |
| Q126 | partial | The first two links of the recap chain: "The 5th user forms a websocket with another server", then "possible only when message reaches Edge Server 2", before "we bridge the gap". | **Present but scattered.** The same ideas appear in live-class wording at `s8a-websockets.mdx:32` and `:63` (L-0244, L-0251). "We bridge the gap" appears only in a figure caption (`s8a:98`) and "Not a great idea! Can we do better?" at `s8b-websockets.mdx:20`. The recap board's chain (S113/S114, 02:30:00-02:30:03) never appears in one place. | Before `s8b-websockets.mdx:20` insert: "The recap board retold 8.1-8.3 as one chain: each server can handle 4 users, so the 5th user forms a WebSocket with another server; a message from A reaches E only when it reaches Edge Server 2; so we bridge the gap with a TCP connection. [[L-0251]]" Line 20 then follows as the next step. |

## Correct, with minor omissions (no fix required)

The content is on the page, but the reader left it out: Q067 (`created_at` added to the final Messages form; the reader also listed spoken variants between the board steps), Q072 ("product requirements, not stack affinity, decide" not stated), Q087 (the DB cylinders' MySQL / Cassandra / Mongo labels), Q092 (the per-server in-memory example A->C1 ... E->C1), Q097 (adding servers leads to a full mesh: `s8a-websockets.mdx:129`).
