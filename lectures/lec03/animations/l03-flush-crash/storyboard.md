# Storyboard: `l03-flush-crash`, "The counter runs ahead of the disk"

Lecture 06 (folder `lec03`), §2.6 *Flush every N, restart from the safest value*. 1200×800 (wide) + 720×970 (phone), 30 fps, 1,140 frames (38.0 s). Status: see `storyboard.yaml`.

## 1. The one idea
When the counter is saved only every 3rd ID, memory runs ahead of the disk; after a crash the disk value is behind, so restart from the safest value (06 + 3 + 1 = 10), never from the disk value itself.

## 2. Why motion
The lesson is a **window in time**: the gap between "handed out" and "on disk" opens with each ID and closes with each flush. The crash lands inside a window. A still shows one state; the clip shows the memory counter ticking while the disk value sits still, the dashed box around the unflushed IDs growing row by row and vanishing at each flush, then the crash catching it open at 07–08. The red twins at 07 and 08 make the cost of restarting from 6 visible, and the safe restart visibly jumps past the whole window.

Frame 0 = board D-05 before step 1 (title, empty `issued` lane) plus the memory box and the disk cylinder, both at 00. Time runs down the lane as on board D-05. Steps ① – ⑤ are the five states of D-05. (The page's former static twin, a StepThrough, was removed by the design fix; the clip-as-text covers no-motion readers.)

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0042 | write the counter to disk only every N IDs (flush frequency) | title `flush every 3 IDs`; one solid `flush` write arrow memory → disk (the machine pushes it; dashed is reserved for async copy), inked only at 03 and 06 |
| L-0043 | `counter++`; if `counter % N == 0`, save | the memory value ticks with every ID; the disk value changes only at the multiples of 3 (code form left to the CodeBlock) |
| L-0044 | N = 3: 1, 2, 3 (3 flushed), 4, 5, 6 (6 flushed), 7, 8, crash; disk says 6 but 8 was issued; restarting from 6 regenerates 7 and 8, which is wrong | lane m1-01 … m1-08, green ticks at 03 and 06, disk 03 → 06; bracket `ahead of disk` under memory 08 / disk 06; red crash line; restart lane: red m1-07, m1-08 with `=` to their twins, `twice` |
| L-0045 | safest value = last flushed + flush frequency + 1 = 10 → M1-10 | mono `06 + 3 + 1 = 10` (the board's form); m1-10 green, double underline (as on the board), hand `safest` (board: `Safest !!`); memory reads 10 |
| L-0046 | some integers go unused, which is fine: correctness matters more than using every integer | m1-09 in faint ink, `never used`; last caption "An unused number is fine. A duplicate ID is not." |

**Not claimed**
- The instructor said "we never used 8 and 9 … we lost those two values". m1-08 was handed out before the crash (L-0044), so the clip marks only m1-09 as never used and gives no count.
- Nothing about fsync or page caches (A-IG-03, prose 2.4), flush timing, or a timer thread (L-0047, prose).
- The crash at 08 is the class's example, not "the" crash point; nothing is to scale in time.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–80 | m1 hands out IDs from a counter kept in memory. | nothing (static figure) |
| ① B1 | 80–260 | Every third ID, the counter is written to disk. | m1-01..03 written (blue → ink), memory 01..03, dashed box grows; flush arrow pen-drawn; disk 03, ✓ at m1-03; box fades |
| ② B2 | 260–440 | Memory runs ahead between flushes; at 6 the disk catches up. | m1-04..06 with memory 04..06 while disk stays 03; flush re-inked; disk 06, ✓ at m1-06; box fades |
| ③ B3 | 440–660 | Two more IDs, then m1 crashes. Disk says 6, but 8 was handed out. | m1-07, m1-08; bracket `ahead of disk`; red crash line + `crash`; memory value gone, box, bracket and window red |
| ④ B4 | 660–840 | Restart from 6, and 7 and 8 are handed out a second time. | bracket ghosts; `restart`; memory 06; red m1-07, m1-08 with `=`, memory 07, 08 red; `twice` |
| ⑤ B5 | 840–1050 | Restart from the safest value instead: 6 + 3 + 1 = 10. | duplicates + window ghost; `06 + 3 + 1 = 10`; m1-09 `never used`; m1-10 green, double underline, `safest`; memory 10 |
| B6 | 1050–1140 | An unused number is fine. A duplicate ID is not. | hold (poster) |

Chapters (10 f into each beat): flush every 3 · ahead of disk · crash · restart from 6 · safest value.

## 5. Poster and reduced-motion stills
Poster = frame 1139: the lane m1-01 … m1-08 with ticks at 03 and 06, disk 06, ghosted red window and duplicates, red crash line, the formula, m1-09 `never used`, m1-10 `safest`, memory 10. Reduced-motion stills: 72, 252, 432, 652, 832, 1042, 1139 (end of each beat).

## 6. Page context
- **Before (predict, after P3):** "The disk says 6. Watch where the counter really was when the machine died."
- **Clip caption:** "Restart from 6 and 7, 8 go out twice; restart from 6 + 3 + 1 = 10 and nothing repeats."
- **After:** "Two habits from this: don't do IO on every call, and always restart from the safest value."

## 7. Known limits
Reviewed (see `review.md`).
- On the blackboard theme the ghosted (38%) red items (duplicates, `ahead of disk`) are faint; they are past context and stay readable at full size.
- The page now says only m1-09 is unused, and attributes the class's "8 and 9" (critic C-09, content fix); the clip agrees.
- The memory box and disk cylinder are an addition to board D-05's lanes.
- On desktop the stage is capped at 540 px by shared CSS (`.clip-player .clip-box`); the MDX wraps the clip in a column of the same width so the controls, chips and caption sit under the stage (critic C-07).
