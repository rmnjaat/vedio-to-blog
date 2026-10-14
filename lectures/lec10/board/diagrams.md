# Lecture 10 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and when it is first drawn or shown. Colour notes: white = default ink; yellow = headings, in-memory index marks, the active file; pink = warnings, boxed key terms, the S3 cloud outline; purple = in-memory structures, the disk platter, `Deploy`/`AWS SDK`. Temporary strokes are left out (red highlighter, blue dashed laser marks). Shapes: rectangle = server/service or file (files are tall/long rectangles, often grey-filled), cloud = S3/network storage, horizontal pipe = pub/sub channel, stick figure = user/client. "Prepared" = the teacher's pre-written notes, not drawn live.

## D-01 - The dictionary as one CSV text file (00:06:45-00:22:15)
Frame: b_002215.jpg (also b_002030.jpg)
- One white rectangle (the file) with lines `apple , a fruit` / `amazon, a rainforest` / vertical dots; `1TB` beside the bottom-right corner.
- Beside it: `Text file` and a pink-scribbled-out `JSON file` (rejected).
- Emphasis (00:22:15): red arrow down the left edge = linear scan of the whole file per lookup.

## D-02 - One-level index over the data file (00:24:30-00:35:45)
Frame: b_003545.jpg (also b_002630.jpg)
- Left: a narrow grey rectangle labelled `index.dict` with entries `apple, o1` / `amazon, o2` / `book, o3`.
- Right: the data file labelled `data.dict` (`apple, a fruit`, `amazon, a rainforest`, dots), `1TB` at its corner.
- A white arrow from each index entry to its line in the data file.
- Beside it: `"Indexing"` and the size estimate `170,000 x ( 4.3 + 4 + 2 )` → `(10.3 x 170,000) B` → `= 1751000 B` (boxed) → `= 1751 KB` → `= 1.751 MB` (circled).

## D-03 - One portable file: header | index | data (00:36:45-00:49:33)
Frame: b_030300.jpg (also b_004500.jpg, b_004933.jpg)
- An arrow from D-02 to one long grey rectangle.
- Left end: a thin slot hatched yellow, labelled `header` (yellow) with an arrow.
- Next: the Index segment (arrow up from `Index`), ending at a zigzag mark (separator position) labelled from above `byk offset of data`.
- The rest: the data segment (arrow up from `data`).
- Pink `Portable` with a pink arrow down to the file.
- Under it, the options list: `- special line / separator`, `- pre-allocate / Fixed size` with a boxed `2MB`.

## D-04 - Header layout (00:42:45-00:45:00)
Frame: b_030300.jpg (also b_004445.jpg)
- `header .......` then three lines: `→ OUR_DICT - 8B`, `→ Version - 4B`, `→ index size - 4B`.
- A brace `}` over the three lines with `16B` (double underlined).
- To the right: `AOBB` (example magic-bytes name; audio "AODB").
- Nearby (yellow): `parquet`, `JSON`, `Encoder & Decoder`.

## D-05 - Serving reads from S3 (00:49:45-01:04:15)
Frame: b_010415.jpg (also b_010515.jpg)
- Stick-figure user, `GET /word` underneath, arrow → tall grey rectangle `L B`.
- Three arrows from the LB to three rectangles (API servers), labelled `API Servers`. Each server holds a small yellow spiral (in-memory hash table); yellow `ω→o` (word → offset) between the top two.
- `Filepath on S3` above the servers.
- A white line from each server to a pink cloud holding a yellow file bar with segments `I` and `D` (index, data).
- Under the cloud: `Network attachd Storage` | `HDFS` / `Netwok HDD`; `+ File System Semantics` `(Random Read)` `( file, off, n )`.
- Top right: `Poinkd Rea[d]` (double underlined).
- Bottom left (the rejected copy-per-server option): `updak tedious` / `inconsiknoy.` / pink `COST !!`.

## D-06 - Weekly update pipeline (01:05:45-01:43:15)
Frame: b_014315.jpg (also b_012445.jpg, b_030130.jpg)
- D-05 (copied, without the NAS notes) at the top.
- `updak: weekly` and a narrow file `apple: —` / `ball: —` / `zoo: —` (the changelog).
- An arrow from the S3 cloud down to a server rectangle holding the dictionary (long rectangle), the changelog (small rectangle) and the merged new file (zigzag-filled rectangle); `append at end` beside it (student idea).
- A yellow curve from the new file back up to the S3 cloud (upload).
- Top right: `polling metafile` ↓ `meta.json` with an arrow to a small circle (file) in the cloud; `{ path: "____" }`.
- Purple `AWS SDK` with a curved arrow `Deploy` up to the LB / API servers.
- Lower notes: `new file ↳ Sorted`, `upload to new S3 path`, `tranfer smooth`, `smooth transition`, `S3:// wd/ dict1.dict` / `S3:// wd/ dict2.dict` (arrow at dict2).
- Earlier, removed (01:31:45-01:41:00): a grey pipe below the API servers with curved lines from each server down to it and one from the pipe to the update server (Redis Pub/Sub). Draw only if showing the rejected option.

## D-07 - In-place overwrite corrupts the next entry (01:10:00-01:11:45)
Frame: b_011145.jpg
- Changelog line `apple, a round fruit` on the left.
- A file box with `apple, a fruit` / `ball, a round obj`.
- Yellow `a round fruit` written over `a fruit`, spilling into the next line so `ball, a` becomes an unreadable overlap.

## D-08 - Merging the sorted dictionary with the sorted changelog (01:14:45)
Frame: b_011745.jpg (also b_030615.jpg)
- Three columns. ① `Dictionary` (yellow ①): `a - a'`, `b - b'`, `c - c'`, `d - d'`, `f - f'`, `g - g'`, `h - h'`, an arrow (pointer) before each, the first arrow yellow.
- ② `Changelog` (yellow ②): `c - c''`, `e - e'`, `f - f''`, then an empty arrow (exhausted).
- `New dic`: `a - a'`, `b - b'`, `c - c''`, `d - d'`, `e - e'`, `f - f''`, `g - g'`, `h - h'`, then `//` (end).
- A small empty pink box at the far right.

## D-09 - Same-path upload: old index, new file = garbage (prepared, 01:25:00)
Frame: b_012615.jpg
- `In index :` `apple: 100, 1024`, `↑ on server` (pink).
- Top file `data.dat`: white lines, the highlighted row (yellow box) reads `apple, a fruit` (pink); a yellow line from the index entry to it.
- Bottom file `data.dat [new]`: the highlighted row at the same position holds another line; `apple, a fruit` is one row lower; a yellow line from the index entry to the highlighted row.
- Note: `Something random !! User sees garbage response during lookup.`; pink `How to smoothly transition?`.

## D-10 - Transitions: periodic refresh and reactive Pub/Sub (prepared, 01:26:30)
Frame: b_012642.jpg
- `1. Periodic refresh of server's index`: a horizontal timeline with yellow ticks, `pull` at the first tick, a pink tick `index.dat change on S3`, arrow `garbage response` just after it; `Graceful Termination | Reload`.
- `2. Reactive: PubSub`: white pipe `Redis`; yellow arrows from it down to three `API` boxes (each with a purple hatched tag = index version); a white cloud `S3` with a purple hatched block and a yellow hatched block (old and new files); a line down to a pink `Standalone` box; a pink line from `Standalone` into the Redis pipe.
- `3. Parallel Setup` (content not shown on screen).

## D-11 - One file per word on S3 (prepared, rejected; shown 01:43:31)
Frame: b_014331.jpg
- `/z/ zoo.txt ← word.txt having all details`, `Folder for each char`.
- `lookup: get_word(w) → create S3 path / goto S3, read the file / return the meaning`.
- Stick user — `LB` — two `API` boxes — cloud `S3`.
- Pink `But it breaks a major requirement` + pink box `Portability`.

## D-12 - Multi-tiered storage (01:43:45)
Frame: b_014745.jpg
- `- Multitiered Storage` with an arrow up to `historical orders on S3` and an arrow down to `lakst orders on MySQL`.
- `Without loosing an ability to Query the data` / `store historical data on S3`; purple `Athena`, `Data lake`.

## D-13 - Magnetic disk and the speed scale (01:52:00-02:03:00)
Frame: b_020300.jpg
- A wide purple-outlined ellipse (platter) divided into sectors by white lines from the centre; one sector filled with pink dots.
- Top right: a horizontal scale with ticks, `SSD` above, `M` under the left (fast) end, `HDD` under the right end.

## D-14 - Append-only file with the in-memory hash table (02:04:30-02:13:45)
Frame: b_021445.jpg (also b_020815.jpg)
- A tall file with rows `K1 V1` (dot = start), `K2 V2`, `K3 V3`, pink `K1 V1'`, pink `K2 -1`, a pink dotted line beside the next free slot; `↓` above it; `Append only` / `Zero seek` / `no big mech movement` / green `Best we can do!!`.
- `PUT K1 V1`, `PUT K2 V2`, `PUT K3 V3`, `PUT K1 V1'`; `DEL K2 = PUT(K2, -1)`.
- Purple `in-mem`: `K1 → O4` with a curved arrow to `K1 V1'`, `K3 → O3` with an arrow to `K3 V3` (no entry for K2).

## D-15 - File rotation, merge and compaction, sawtooth (02:15:00-02:25:00)
Frame: b_022500.jpg
- D-14's file is `001`; three more files `002` `003` `004` to its right; 002 and 003 have a white wavy line (full); 004 is outlined yellow with horizontal lines (active).
- Brace under 001-003: `Read Only`, then `Merge & Compaction`.
- In-mem map now `K1 → f1, O4`, `K3 → f2, O3`.
- `File Rotation` with a curved arrow to a small tilted file at the top right.
- Notes: `* amount of index fit in ram`, `* Keys`, `File grows huge!!!`, `1. MC freq`, `2. file rot[ation] thresh[old]`.
- Graph at the bottom right: white axes; usage climbs in a zigzag then a pink/yellow sawtooth; a pink cap line labelled `1TB`.

## D-16 - Record format (prepared, 02:26:45-02:29:15)
Frame: b_022945.jpg (also b_022645.jpg)
- Bar 1: [blank] | `K` | `V`.
- Bar 2: [blank] | `KSZ` | `VSZ` | `K` | `V`, brace under KSZ VSZ `Key size & Value size`; text `we read KSZ (4b) VSZ(4b) & then read KSZ bytes for key VSZ bytes for value`.
- Bar 3 (`Solving integrity`): [blank] | `KSZ` | `VSZ` | `K` | yellow `110` cut short; a yellow hatched line under it; ↑ `machine crashed while writing value`.
- Bar 4: `CRC` | `TS` | `KSZ` | `VSZ` | `K` | `V`; ↑ under TS `Timestamp for conflicts`; heading `Finding carroupt entries : CRC → First thing we flush`.

## D-17 - In-memory hash table points at the latest entry (prepared, 02:32:57)
Frame: b_023303.jpg
- `k1 → o1`, `k2 → o2`, `k3 → o3`; purple lines to rows of a grid (the file) whose key cells read `k1`, `k2`, `k1`, `k3`, `k1`, `k3` (the later k1/k3 and k2 yellow); each line ends at the latest row for that key.
- `↑ offset of the latest entry in the file`; `GET(k) → pointed queries`: `- Hash table lookup - disk seek - disk read`; pink `limitation: Index to fit in memory`.

## D-18 - Immutable files and one active file (prepared, 02:33:15)
Frame: b_023315.jpg
- Four white files with text lines under a pink brace `Immutable`, pink `Available for reads` below.
- One yellow file labelled pink `Active`, ↑ `writes go here`.

## D-19 - In-memory index entry with file id (prepared, 02:33:30)
Frame: b_023330.jpg
- `K1` box → record `File ID | VSZ | VPOS | TS` (`entry length` / `more like Entry size` over VSZ, `offset` under VPOS, `timestamp` under TS); an arrow from VPOS to a line in the middle file.
- Three files: two white, one yellow (active).
- `K2` box → `File ID | VSZ | VPOS | TS` with an arrow up to the yellow file.

## D-20 - Merge and compact (prepared, 02:34:00)
Frame: b_023515.jpg
- `all immutable files are merged & compacted` → `stale entries skipped`, `deleted entries skipped`.
- A pink sawtooth graph under a purple cap line.
- `Because files are merged, offset changes hence update index atomically!`.

## D-21 - Bitcask inside Riak (prepared, 02:37:30)
Frame: b_023800.jpg
- Stick user — `proxy` — lines to three `Riak` boxes, each holding a yellow hatched block (a Bitcask instance); pink `Bitcask` with an arrow to the block in the top box.
- Text: `Most efficient KV Database`, `used by uber in production as Backend for Riak`, `Each node of Riak has an ins[tance] of Bitcask running`; above: `What we just designed is` pink box `Bitcask`.
