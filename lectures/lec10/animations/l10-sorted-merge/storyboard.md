# Storyboard: `l10-sorted-merge` ("Two pointers, one pass")

Lecture 10, §5.3 *Merge, as in merge sort*. 960 frames at 30 fps (32 s). Wide 1200×800; phone 720×980 (same three columns, rows 56 units tall, lettering 30, captions 32).
Static twin: Fig 5·c (board D-08, `b_011745.jpg`).

## 1. The one idea
Two sorted files are merged into a new one by two pointers that each move forward once per entry, never back:
one pass, and only two lines in memory at a time.

## 2. Why motion
The lesson is the pointers' motion. Fig 5·c shows the merged result and where the pointers end; it can't show that
each pointer advanced exactly once per entry (7 and 3 moves for 8 output lines), that on a match both move, or that
nothing but the two current lines is ever held. The clip walks it step by step with counters under each column.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0140 | create a new file by merging the existing sorted dictionary with the changelog | three columns; the new file starts empty and fills; B0 caption |
| L-0142 | it is the merge step of merge sort (two sorted arrays into a third) | B0 caption "merged as in merge sort" |
| L-0143 | a pointer in each file; write the smaller word and advance it; on a match write the changelog's meaning and advance both | blue carets; a mono readout of the comparison (`a < c` … `f = f`) under `in memory`; B1 (smaller), B2 and B4 (match, both move) |
| L-0144 | board example: a…h with c″, e′, f″ → a, b, c″, d, e′, f″, g, h; once the changelog is exhausted the rest follows | exact board rows; `done` in the changelog's empty slot; g and h follow; `//` |
| L-0145 | not loaded into memory: iterate line by line, write a third file | blue outlines on the two current lines, label `in memory: 2 lines` |
| L-0310 | both sorted → output sorted, next week's old file; one iteration over both files | poster: `one pass · O(n + m)`, dashed arrow to `next week's input`; B5 caption |

**Not claimed:** the O(n²) comparison (factcheck_applied L-0310: only the naive approach is quadratic; a hashed
changelog over an unsorted file is also linear, L-0139); file sizes (1 TB, 2 TB disk, L-0147); how the changelog got
sorted (L-0141). "O(n + m)" is the fact-check's wording for the teacher's "O(n), one iteration over both files".

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–120 | Two sorted files, merged as in merge sort, into an empty new file. | hold on the static figure, pointers at a and c |
| B1 | 120–273 | Compare the two words: the smaller one is written, and its pointer moves. | outlines on the two current lines, `in memory: 2 lines`; `a < c`, a written, pointer; `b < c`, b written, pointer |
| B2 | 273–405 | Same word: the changelog's meaning wins, and both pointers move. | `c = c`; red strike on c – c′; connector + packet; c – c″ written ✓; both pointers |
| B3 | 405–567 | d goes out, then e′: a new word slots into its sorted place. | `d < e`, d written, pointer; `e < f`, connector e′, e – e′ written ✓, changelog pointer |
| B4 | 567–787 | f″ wins; the changelog is used up, and the rest follows as it is. | `f = f`; strike f – f′; f – f″ ✓; both move; `done`; g, h written; dictionary pointer into its dashed end slot; `//` |
| B5 | 787–960 | One pass, never backwards. The output is sorted: next week's input. | `one pass · O(n + m)`; dashed arrow; `next week's input`; 2.6 s hold |

Chapters (10 frames into each beat): setup 10 · smaller wins 130 · match 283 · new word 415 · drain 577 · one pass 797.

## 5. Poster and reduced-motion stills
Poster = frame 959: the full new column with three green ✓, the struck c – c′ / f – f′, counters `moves: 7`,
`moves: 3`, `lines: 8`, `in memory: 2 lines`, `one pass · O(n + m)` and the dashed arrow to `next week's input`.
Reduced-motion stills: 110, 265, 397, 559, 779, 959 (end of each beat, caption up).

## 6. Page context
- **Predict (before):** "The dictionary has seven words and the changelog three. How many times does each pointer move, and does either ever go back?"
- **After:** "Each pointer moved once per entry, so the whole update is one pass over both files, and the output is sorted for next week."
- **Page caption:** "The smaller word is written and its pointer moves; on a match the changelog's meaning wins and both move. Each pointer moves once per entry, so one pass builds a sorted new file."

## Known limits
- 32 s, a little over the plan's 29 s: B0 got 4 s so its 66-character caption stays under 17 ch/s, and the poster hold is 2.6 s.
- The dictionary pointer's last move lands in a dashed empty slot after `h – h′` (added to mirror the changelog's slot; unlabelled, since the board writes `done` only for the changelog).
- The comparison readout is hidden once the changelog is used up (g and h have nothing to compare against); the caption carries "the rest follows".
- The outline's predict line says "the dictionary eight"; the dictionary has **seven** entries (the new file has eight). Use the predict line below.
- Struck rows (c – c′, f – f′) are meant to read as stale: the text is at 40 % under a red strike, legible but not prominent.
- On the phone, `next week's input` ends 16 units from the right edge; the arrow and label sit under the new file.
- The wide `//` sits right of `h – h′` (the board writes it after h); placed under the file it read as one comment with `lines: 8`.
Full review: `review.md`.
