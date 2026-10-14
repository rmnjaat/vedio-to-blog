# Storyboard: l06-hash-scan · "Rows touched per query" (§2.3, 29.3 s)

## 1. The one idea
With the hash computed inside the WHERE clause, the database has to hash every email on every request; with a stored,
indexed hash column it reads one row.

## 2. Why motion
The lesson is an accumulation: cost that grows with every row of the table and again with every request. Fig 2·b (the
static twin) shows "every row" against "one row" side by side. The clip adds the counter: it climbs row by row to
10,000 on one query, stops at 1 on the other, then climbs to 30,000 against 3 as the same query arrives again. That
growth, not the end state, is why "derivable, so don't store it" fails here.

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0080 | the database must read every row, hash each email and compare it: a whole-table scan | blue cursor visits every row; each row's HASH(email) cell gets a ✕ (✓ at the match); counter to 10,000; red bracket |
| L-0081 | a computation in the WHERE clause can't use the index; "a full table scan every single time" | the cursor doesn't stop at the match; "full table scan"; B3 repeats the scan per request |
| L-0083 | store a hash column, index it, `where users.hash = ?`: very pointy, filter one row | three blue hops down an index on hash to one users row, green ✓, counter 1, "one lookup" |
| L-0082 | not always true that what is derivable shouldn't be stored: if it slows things down, store it | B4 caption + poster note "store it, index it" |

Board numbers: "10,000 rows" is the teacher's example (00:39:45). 20,000 / 30,000 are 10,000 × the requests shown.

**Not claimed**
- No query rate (the plan's "ten a second" was dropped: the lecture gives no rate), no latency, no O(1).
- Not "an index can never help a computed predicate": the expression-index exception (SN-03) is prose right after the clip.
- The match position (row 3) and the placeholder emails (a@…) are illustrative. The join with photos is left to prose.
- Re-sweep speed in B3 means nothing; only the counts do.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | The URL gives us a hash. Which user has it? | nothing: both panels, counters at 0 |
| B1 ① | 90–360 | HASH() in the WHERE clause: every email is hashed and compared. | blue cursor steps rows 1–5, ✕/✓ stamp, counter 1–5; cursor on ⋮, counter runs to 10,000; counter red, red bracket, "full table scan" |
| B2 ② | 360–540 | With a stored, indexed hash column: one lookup, one row. | left panel ghosts; blue pen + packet root → inner → leaf → users row; green ✓; counter 1; "one lookup" |
| B3 ③ | 540–760 | This query runs on every request. The full scan repeats every time. | left back to full ink; "requests: 1"; request 2 and 3: left cursor re-sweeps (+10,000 each), right packet rides the path (+1 each) → 30,000 vs 3 |
| B4 | 760–880 | Not storing a derivable value cost a full scan, so store it. | "store it, index it" written under the users row; hold = poster |

Chapters (10 f into their beat): one query @100 · with an index @370 · every request @550.

## 5. Poster and reduced-motion stills
Poster = frame 879: left panel with every row marked, red bracket, `30,000` red, "full table scan", "requests: 3";
right panel with the blue path to one green-ticked row, `3` green, "one lookup", "requests: 3", "store it, index it".
Reduced-motion stills: 80 (B0), 350 (end B1), 530 (end B2), 750 (end B3), 879 (poster).

## 6. Page context
- **Predict (before the clip):** "The table has 10,000 users. How many rows does each query read?"
- **Caption under the clip:** "Hashing in the WHERE clause makes the database hash every email to find the match, on every request. A stored, indexed hash is one lookup. Not storing a derivable value cost a full scan, so store it."
- **After:** "So the derivable hash comes back, indexed" → RuleBox (L-0082), then SN-03 (expression indexes).

## Phone layout (720 × 980)
Panels stack: scan on top (query, table on the left, counter / "full table scan" / requests on the right), index below
(query, tree + users row on the left, counter / "one lookup" / requests on the right). Lettering 30, captions 32.

## Known limits
Status: reviewed (see review.md).
- B3 moves both panels at once for each repeated request (left cursor re-sweep, right packet). Deliberate: it is one
  request answered two ways and the caption names both; nothing else moves.
- The "requests" digit is blank for about 3 frames while it is re-written (a write-on replacement, not a pop).
- HASH(email) cells show only ✕/✓ (compared), not hash values; the board's 0eafd172 and MD5 stay in prose.
