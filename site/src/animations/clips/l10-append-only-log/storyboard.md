# Storyboard: `l10-append-only-log` ("One file, one map")

Lecture 10, §7.4 *Get: an in-memory map to the latest offset*. 1110 frames at 30 fps (37 s). Wide 1200×800; phone
720×960 (ops list in two columns on top, file left and map right below, lettering 30, captions 32).
Static twin: Fig 7·b (board D-14, `b_021445.jpg`).

## 1. The one idea
Every put, update and delete is appended at the end of one file, and only then does the in-memory map point the key at
its newest entry; a get is one map lookup and one read at that offset.

## 2. Why motion
The lesson is an order and a direction. Each write lands at the tail *first* and the map is updated *after*; the write
slot only ever moves down; K1's pointer leaves O1 for O4 while the old entry stays on disk; K2's tombstone is appended
and K2 leaves the map. Fig 7·b shows only the end state (K1 → O4, K3 → O3, no K2). The clip shows how it got there,
then uses that map for two gets.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0211 | put K1 V1 appends key and value at the end; K2 V2, K3 V3 follow | B1: three rows appear one by one at the write slot |
| L-0216 | an append-only file is read anywhere, written only at the end | the dashed `append` slot only moves down; B4 reads O4 in the middle; poster `writes only at the end · reads anywhere` |
| L-0213 | an update is also appended; the old entry becomes obsolete | B2: `K1 V1′` appended at O4; `K1 V1` ghosted, `obsolete` |
| L-0221 | in-memory hash table: key → offset of the latest entry (not the value), updated on append | `in-mem` map rows `K → O`, written right after each append |
| L-0222 | write to disk first, note the offset, then update the map; K1 → O1, K2 → O2, K3 → O3; K1 V1′ → O4 | B1/B2 order: row, then map entry and pointer; K1's `O1` replaced by `O4`, pointer redrawn to O4 |
| L-0217 | delete = put with a special value: `DEL K2 = PUT(K2, -1)` | B3: `= PUT(K2,−1)` under DEL K2; row `K2 −1` appended at O5 |
| L-0223 | delete removes the key from the map; no entry = the key does not exist | B3: K2's map row struck red and removed, `no K2: deleted`; B4: GET K2 finds the empty row |
| L-0224 | get: look up the map; no entry → 404; else read at that offset | B4: blue lookup on K1's row, blue read along the pointer to O4, green `→ V1′`; GET K2 → red `→ 404` with no read |
| L-0226 | get, put and delete are each O(1), the bare minimum | poster mono `put · update · delete · get: O(1)`; B5 caption |

**Not claimed:** zero seek or anything about the disk head (factcheck_applied L-0210: gets do seek); how real Bitcask
marks a delete; byte offsets or sizes; the crash rebuild (L-0225, Fig 7·c follows the clip); memory limits and file
growth (L-0228, L-0229).

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | Four puts and a delete. One file, one map in memory. | hold on the static figure: ops list, empty map, empty file with its `append` slot |
| B1 | 105–361 | Each put is appended at the end, then the map points the key at it. | blue caret on each PUT; row inked + written at the slot; slot drops; map row written; pointer drawn (×3) |
| B2 | 361–545 | An update is just another append. K1 now points at O4. | `K1 V1′` appended at O4; slot drops; K1's `O1` and pointer fade; `O4` written; new pointer drawn; `K1 V1` ghosts, `obsolete` |
| B3 | 545–727 | Delete is a put with −1. K2 leaves the map. | `= PUT(K2,−1)`; `K2 −1` appended at O5; slot drops; red strike on K2's map row; row and pointer removed; `K2 V2` ghosts; `no K2: deleted` |
| B4 | 727–953 | Get: look up the map, read once at that offset. No entry: 404. | `GET K1`; blue lookup outline; blue pen + packet along K1's pointer; O4 outlined; green `→ V1′` ✓; `GET K2`; red dashed outline + ✕ on the empty row; red `→ 404` |
| B5 | 953–1110 | Writes only at the end, reads anywhere. Every operation is O(1). | caret fades; hand summary; mono O(1) line; 2.8 s hold |

Caption rates: 14.9, 7.9, 8.8, 7.1, 8.2, 12.2 ch/s (all ≤ 17, all ≥ 2.5 s).
Chapters (10 frames into each beat): setup 10 · puts 115 · update 371 · delete 555 · gets 737 · O(1) 963.

## 5. Poster and reduced-motion stills
Poster = frame 1109: ops list with `= PUT(K2,−1)`, `GET K1 → V1′ ✓`, `GET K2 → 404 ✕`; the five-row file with
ghosted `K1 V1` (`obsolete`) and `K2 V2`; the map `K1 → O4`, `K3 → O3`, K2's row empty with `no K2: deleted`; pointers
to O4 and O3; `writes only at the end · reads anywhere`; `put · update · delete · get: O(1)`.
Reduced-motion stills: 95, 351, 535, 717, 943, 1109.

## 6. Page context
- **Predict (before):** "Four puts and a delete. Which offset does K1 point to at the end, and where is K2?"
- **After:** "If the machine dies, the map goes with it; the step-through below rebuilds it from the file."
- **Page caption:** "Every put, update and delete is appended at the end, then the map points the key at its latest entry: K1 moves to O4 and K2 leaves the map. A get is one lookup and one read."

## Known limits
- 37 s against the plan's 30 s: five appends each need "row, then map entry, then pointer" in sequence (one motion at a time), and the poster holds 2.8 s.
- Offsets are set in the upright casual face (`O4`), not mono, because mono `O1` read as `01`. At phone size the letter O and the digit 0 are still close; context (`K1 → O4`, captions, page prose) carries it.
- K1's repointed arrow crosses K3's pointer once (as on the board); no label sits on either line.
- The `−` in `K2 −1` and `PUT(K2,−1)` renders in mono as a short dash.
- Layout follows the board/Fig 7·b (ops | map | file), not animations.md's "map right of the file".
Full review: `review.md`.
