# Lecture 6 (lec03) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 127 questions from `story/page_text.md` and the questions-only file alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed. Where the key repeats a lecture claim that the fact-check corrected and the page carries the correction, the answer is graded on the key's substance; if it still differs from the key, the cause is CUT-OK (fact-check correction).

## Score

| | count |
|---|---|
| correct | **116** |
| partial | 6 |
| wrong | 1 |
| missing (NOT ON PAGE) | 4 |
| **total** | 127 |

- Strict: **116 / 127 (91.3%)**
- Half credit for partials: **119 / 127 (93.7%)**
- The old long version scored 125/127 (98.4%; 126/127 = 99.2% with half credit), per `qa/exam_grade.md`.

Causes of the 11 non-correct answers: CUT-OK 6 (1 of them a fact-check correction), CUT-LOSS 1, PAGE-ERROR 0, READER-MISS 4.

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q024 | Two takeaways of counter persistence | partial | READER-MISS | Reader gave "correctness over using every integer" + "restart from the safest value"; key's takeaway 1 is "don't do IO every time; add a periodicity factor, a simple mod" (L-0047). §2.4 has it ("The periodic save is a mod, not a timer thread"), just not framed as a takeaway. No change needed. |
| Q033 | Anecdote: nature flipping bits | missing | CUT-OK | War story (Jeff Dean and Sanjay Ghemawat, solar storm; L-0069). Colour; §3.3's quartz-drift explanation carries "you can't run from physics". |
| Q039 | Boxed board lesson | partial | READER-MISS | Reader picked "everything is a trade-off". The lesson (L-0081) is on the page: §3.4 "Strict order... is almost impossible" and §4.2 "you cannot have ID generation that is distributed, strictly increasing and fast, all three", with §4.3's relaxations (integers? random?). Nothing marks it as the board's line. No change needed. |
| Q044 | Why counter not random; when UUID | partial | READER-MISS | Reader got "a random suffix loses the order a counter gives" but answered "small app" for when UUID fits. Key: whenever you can relax monotonicity. §4.3 says it ("Could they be random, like UUIDs? ... You give up ordering"). No change needed. |
| Q066 | Why the DB is the most brutal component | missing | CUT-LOSS | `c5-uuid.mdx` §5.2, insert before line 62 ("A rule of thumb that follows"): "This is why the database is the hardest part of your infrastructure to scale: API servers keep no state, so you add more of them, while the database stores everything, is queried for everything and carries the whole load. [[L-0157]]" It ties chapter 5's index-in-RAM rule back to Lecture 5's stateless fleet. |
| Q070 | Exact query Flickr fires | wrong | CUT-OK (fact-check) | Key: `INSERT ... ON DUPLICATE KEY UPDATE id = id + 1`. Page correctly gives Flickr's published `REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();` (L-0172 imprecise/medium; L-0171). |
| Q078 | Who does MAX+BUFFER reset; automation | missing | CUT-OK | Operational aside on an optional, cosmetic reset (L-0185: SRE/DevOps; or find active server, max + buffer, set, reboot). |
| Q081 | Why "Snowflake"; who adopted it | partial | CUT-OK | Name origin is trivia (L-0191). Adopters (Discord, Instagram-style, Sony) were answered. |
| Q097 | Limitation of ID-based pagination | partial | READER-MISS | Reader gave "can't jump to page N; needs an index-backed sort". Key: can't use complex WHERE clauses (L-0234). §9.5 says "filter or sort on something no index matches, and you are back to offset" and "without fancy filtering". No change needed. |
| Q100 | Snowflake benefits listed on the board | partial | CUT-OK | Board list (L-0210). The substance is in §8.3 ("no gossip, no shared counter and no database on the path", "a library inside every app server"); the board's "no service" is deliberately softened because the page carries the fact-check that Twitter's 2010 Snowflake ran as a Thrift service. |
| Q102 | How he knew the disk throttled | missing | CUT-OK | Q&A tangent (L-0246: Prometheus node exporter, disk IO at 100%). Fig 9·b still names disk throttling as the spike. |

## Correct, graded on substance where the key carries an uncorrected slip

The page carries the fact-checked value and the reader gave it; these count as correct.

- Q087: key says time shifts left by 23; Snowflake's 10 + 12 = 22 bits means 22 (page §8.2).
- Q106: key says ~45 years of fresh range; 2^41 ms is ~69.7 years from the custom epoch (page §8.5).
- Q109, Q114: key says Instagram's epoch is 1 Jan 2011; 1314220021721 ms is 24 Aug 2011 (page §10.1, §10.2).
- Q110: key says logical shards are `CREATE DATABASE`; Instagram's post uses Postgres schemas, as the page does.
- Q080, Q084, Q088: key says Snowflake is a library in API servers, not a service; the page carries the correction (2010 Snowflake was a Thrift service whose nodes never coordinate; Sonyflake runs as a library). The reader's answers contain both.
- Q123: key says a queue works; the page adds that at-least-once delivery means deduplicating ranges. Reader gave both.

## Correct, with minor omissions (no fix required)

- Q007, Q013: "counter resets every few minutes / may be reset under its limit" not on the page; the answers match the page's never-reset counter.
- Q071: key frames stub as triggering `id = id + 1`; reader framed it for REPLACE (same purpose, corrected query).
- Q099: leaves out that Sonyflake is written in Go.
- Q120: leaves out that within one ms the smaller machine ID sorts first (page §8.4 has it).
- Q122: leaves out "protocol not specified; consensus is the key; Lamport clocks are not for gossip".

## Verdict

Down 9 strict points from the old version, almost all deliberate cuts (anecdote, board lists, Q&A tangents, one fact-check correction). One real loss: Q066 (L-0157), one sentence in §5.2. No page errors found. The four reader misses are covered on the page and need no change.
