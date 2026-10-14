# Storyboard: `l10-scan-vs-index`, "Half a terabyte, or one line"

Lecture 10, §2.2 A one-level index · 820 frames (27.3 s) at 30 fps · wide 1200×800, phone 720×936 · status in `storyboard.yaml`.

## 1. The one idea
To find `ball`, a word about halfway down the 1 TB file, the scan reads about 500 GB and every request reads it again; the index reads a small file of words and offsets, then one line at ball's byte offset.

## 2. Why motion
The lesson is accumulation: how much is read *per request* on the way to the answer, and that it repeats for every request. A still (Fig 2·a, Fig 2·b) can show where each read ends; the clip makes the bytes-read counter climb through half a terabyte (twice) against a short sweep of the index and one pointed arrow.
Static twin: Fig 2·b (D-02 redraw, board `b_003545.jpg`), with Fig 2·a's scan (D-01). Frame 0 = Fig 2·b without its pointer arrows, `index.dict` ghosted at 38% while the scan goes first.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0042 | naive lookup: open the file, read line by line until the key, stop, read the meaning, return | blue cursor walks `data.dict` row by row and stops at ball; caption "read line by line until ball" |
| L-0044 | worst case the whole 1 TB per read, on average half a terabyte (500 GB) | counter ends at `≈ 500 GB` with ball halfway; dashed extension to the bottom `worst: 1 TB` |
| L-0043 | a linear scan for every single read is very expensive (read-heavy app) | request 2 scans again from the top; second counter `≈ 500 GB`; poster `per request` |
| L-0047 | a small one-level index over the data file avoids the sequential scan | B3–B4: the index lane |
| L-0048 | an index entry = key + offset | index rows `apple, 0` / `amazon, 14` / `ball, …` |
| L-0050 | read path: iterate the index file line by line to the key, take the offset, read that one line of the data file | index cursor steps row by row to `ball, …`, then the blue pointer to ball's row, row turns green, `+ one line` |
| L-0051 | still a linear scan, but of keys and small offsets, not the huge meanings: much faster | B3 caption "scan only words and offsets, a much smaller file"; label `keys + offsets only`; short index bar vs the long data bar |
| L-0063 | a direct pointed read on the data file at the offset the index gives | B4 pointer lands on the `byte offset` caret; B5 caption "One read is pointed, not a scan." |
| L-0049 (context) | offset = byte position where the line starts | caret label `byte offset`; index offsets 0 and 14 are bytes (page example) |
| L-0012 (context) | the dictionary is 1 TB | `1 TB` tag, B0 caption |

**Not claimed:** no latency or time number (the counter is bytes); no index size (1.75 MB is computed in 2.3 and revised by SN-02); no "4-byte" offsets (SN-02); no in-memory map (2.3); no disk wear (L-0045 stays in prose with its clarification); ball's real offset (shown as `…`). The drawing is not to scale (rows and ⋮ stand for ~170,000 lines); the second scan is shortened on screen.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | Find ball, halfway down a 1 TB file. Two ways. (46 ch) | hold on the static figure |
| B1 | 90–300 | Scan: read line by line until ball. About 500 GB later, there it is. (68 ch) | `request 1`; blue cursor rows 1–2 (14 B, 34 B), then runs to ball; blue bar grows; counter → `≈ 500 GB` red; ball row green ✓; dashed `worst: 1 TB` |
| B2 | 300–420 | And the next request reads it all again. (40 ch) | request 1 ghosts; `request 2`; cursor back to top, runs to ball; second bar + counter → `≈ 500 GB` |
| B3 | 420–570 | Index: scan only words and offsets, a much smaller file. (56 ch) | scan overlays ghost; `index.dict` to full ink; blue cursor steps 4 index rows to `ball, …`; short bar; `keys + offsets only` |
| B4 | 570–700 | Then jump to ball's byte offset and read one line. (50 ch) | blue pointer pen + packet index → data ball row; caret `byte offset`; ball row green ✓; `+ one line` (green) |
| B5 | 700–820 | Same answer. One read is pointed, not a scan. (45 ch) | counters back to full ink; `per request` (red); 2.8 s hold on the poster |

Chapters (10 frames into each beat): two ways 10 · scan 100 · again 310 · index 430 · pointed read 580.

## 5. Poster and reduced-motion stills
Poster = frame 819: both files; the scan's two ghosted bars and the dashed worst case; counters `request 1 ≈ 500 GB`, `request 2 ≈ 500 GB`, `per request` in red; the index's short blue bar, the blue pointer onto ball's `byte offset`, ball's row green ✓, `keys + offsets only` / `+ one line`. Reduced-motion stills: 80, 292, 412, 562, 692, 819.

## 6. Phone layout (720×936)
Same beats and timings. `index.dict` (220 wide) left and `data.dict` (356 wide) right as on the board, ball rows aligned so the pointer stays one short horizontal arrow; the scan bars run down the data file's right edge; `worst: 1 TB` under the data file; the counters move into a block under the files (`bytes read`, `request 1` / `request 2` with numbers, `per request`). Lettering 30, captions 32.

## 7. Page context
- **Predict (before the clip):** "Both lookups find ball, a word halfway down the file. How much does each one read?"
- **AnimationClip caption:** "The scan reads about 500 GB to reach a word halfway down the file, and every request pays it again. The index is a short scan of words and offsets, then one pointed read of one line."
- **After:** "The index is still scanned line by line, but it holds only words and offsets. Is it small enough to keep in memory? (2.3)"

## 8. Known limits
- The scan counter is tied to the cursor's place in a not-to-scale drawing, so mid-run values (e.g. `240 GB` between rows 2 and 3) are illustrative; only `14 B`, `34 B` (the page's byte offsets) and `≈ 500 GB` at ball are claimed.
- Request 2's scan is shown faster than request 1's (shortened to keep the clip under 30 s); no on-screen element encodes time.
- The scan counters' lettering ghosts to 55%, not 38%: red at 38% on the blackboard sheet was illegible (review round 1). Bars, ticks and the cursor ghost to 38%.
- Phone: the area under `index.dict` is empty in B0–B2 (the index's labels arrive in B3–B4).
