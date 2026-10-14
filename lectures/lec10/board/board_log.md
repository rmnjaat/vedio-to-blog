# Lecture 10 - Board log

Source video: `vedio/5_6073595677990980683.mp4` (1280x694, ~3:06:20). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail, last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states. 16 extra frames were pulled with `board_frames.py extract` where a state changed between kept frames (01:00:30, 01:01:30, 01:02:30, 01:03:30, 01:32:30, 01:43:25, 01:43:28, 01:43:31, 01:43:35, 01:43:37, 01:43:40, 02:12:10, 02:12:40, 02:18:30, 02:20:00, 02:23:00).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles.
- Colours: dark grey ruled board. Default ink is white. Yellow is used for headings, in-memory index marks and "active" files; pink for warnings, key labels (`Portable`, `COST !!`, `persistence`) and boxed terms; purple for in-memory structures, the disk platter outline, `Deploy`/`AWS SDK` and Athena/Data lake; green for `Best we can do!!` and highlighted phrases in the prepared notes. Red strokes are temporary highlighter (logged only as "emphasis").
- Two kinds of page: (1) live handwriting on one long scrolling canvas (most of the lecture), and (2) neatly pre-written notes pages that the teacher scrolls to and reads from (01:25, 01:26, 01:43:24-01:43:42 and 02:25:48-02:37:30). Entries say which.
- Participant names/faces in the right-hand column are deliberately not recorded. The site watermark at the bottom right is not recorded.

---

## S01 - 00:00:00-00:00:03 - Title cards (b_000000.jpg, b_000003.jpg)
Topic: course branding card (00:00:00), then the title slide (00:00:03): `SYSTEM DESIGN` / `MASTERCLASS` / `Storage Engines`. Static slides, not handwriting.
Change: first state.

## S02 - 00:00:15-00:00:30 - Agenda (b_000030.jpg)
Text (yellow heading `Agenda`):
- `Word dictionary without using any DB`
- `Superfast KV store`
Change: new handwritten page.

## S03 - 00:00:45-00:02:57 - Word dictionary requirements (b_000245.jpg, b_000257.jpg)
Topic: problem statement for part 1.
Text:
- Heading (yellow, centred): `Word Dictionary without any DB`
- `Requirements:` (yellow)
- `scalable [ Storage & API servers ]` with arrows up to `portable` and (yellow) `Response time can be high`
- `- No traditional database` (pink) `Be creative` (yellow)
- `- words and Meanings updakd [sic, "updated"] weekly` with an arrow to `through a changelog`
- `- lookup is always a singular word`
- `- dictionary is 1TB big & has 170,000 words`
Emphasis (00:02:57): red circles on `portable` and `Response time can be high`.
Change: requirements written during 00:00:45-00:02:45. (Full page best seen in b_014328.jpg.)

## S04 - 00:03:00-00:05:15 - Brainstorm axes (b_000430.jpg, b_000439.jpg, b_000442.jpg, b_000445.jpg, b_000454.jpg, b_000457.jpg, b_000515.jpg)
Text: `Brainstorm` (yellow) / `storage, querying, portability, seamless updates`.
Change: new line at 00:03-00:04:30; 00:04:39-00:05:15 are scroll positions and tile-layout changes only, no new content.

## S05 - 00:05:30-00:06:30 - Text file vs JSON file (b_000630.jpg)
Text: `Text file` and `JSON file` side by side; under JSON a small sketch of JSON syntax `{ "..": "",` / `"_": ""` / `...`.
Change: new line below Brainstorm.

## S06 - 00:06:45-00:08:15 - JSON struck out; first text file (b_000815.jpg)
Change: `JSON file` scribbled over in pink (rejected). Diagram D-01 first form: a white rectangle (one file) with lines `apple , a fruit \n` / `amazon, a rainforest \n`.

## S07 - 00:08:30 (b_000830.jpg)
New requirement being added under the 1TB line: `- no repetitive entri` (being written).

## S08 - 00:08:45-00:09:30 (b_000930.jpg)
Requirement complete: `- no repetitive entries`. New under the file box: `Sort??`.

## S09 - 00:09:45-00:10:15 (b_001015.jpg)
New to the right of the file types: `"searchable" via key`.

## S10 - 00:10:30-00:15:45 - Student requirements (b_001400.jpg, b_001415.jpg, b_001418.jpg, b_001545.jpg)
New text:
- `read heavy (very)` under `"searchable" via key`
- `each update should` / `not be costly` (far right, partly behind tiles)
- `can we have` / `multiple files??` (middle)
- `Sort??` replaced by `sort by key ⟶ efficient search`
Change: written during the exchange 00:10-00:14; 00:14:15-00:15:45 tile changes only.

## S11 - 00:16:00-00:21:33 - Board tidied (b_002030.jpg, b_002115.jpg, b_002130.jpg, b_002133.jpg)
Change: `can we have multiple files??` erased (teacher rules out multiple files for portability). `sort by key ⟶ efficient search` moved right. The file box is redrawn: `apple , a fruit` / `amazon, a rainforest` / vertical dots; `\n` removed; `1TB` written beside its bottom-right corner (D-01 final). 00:20:45-00:21:33 box moved to centre, no new text.

## S12 - 00:21:45-00:22:27 - Linear scan (b_002215.jpg, b_002227.jpg)
Emphasis (00:22:15): red arrow down the left edge of the file box (scanning the 1 TB file top to bottom). 00:22:27 scrolled up to the requirements, no new content.

## S13 - 00:22:30-00:24:15 (b_002415.jpg)
New: `"Indexing"` (orange/pink) right of the file box.

## S14 - 00:24:30-00:26:30 - One-level index (b_002630.jpg)
Diagram D-02 first form: a narrow grey rectangle left of the data file containing `apple, o1` / `amazon, o2` / `book, o3` (subscript digits), each with a white arrow to the matching line in the data file.
Emphasis: red brace and underlines on the index entries.

## S15 - 00:26:45-00:28:00 - Size estimate starts (b_002715.jpg, b_002800.jpg)
New: `170,000 x` then `170,000 x (            )`.

## S16 - 00:28:15-00:33:15 - Index size calculation (b_003030.jpg, b_003042.jpg, b_003045.jpg, b_003048.jpg, b_003145.jpg, b_003230.jpg, b_003315.jpg)
Text:
- `170,000 x ( 4.3 + 4 + 2 )` with a wavy underbrace under `4.3 + 4`
- `:=` `8.3+2`
- `(10.3 x 170,000) B` (the trailing `B` is partly behind the tiles)
- `= 1751000 B` (boxed later, see S17)
- `= [scribble] 1751 KB` (a struck digit before 1751)
- `= 1.751 MB` (circled)
Change: calculation written 00:28:15-00:30:30; 00:30:45 briefly scrolls up to requirements; rest scroll only.

## S17 - 00:33:24-00:34:45 - Emphasis on the estimate (b_003324.jpg, b_003330.jpg, b_003333.jpg, b_003345.jpg, b_003430.jpg, b_003445.jpg)
Emphasis only: red ticks under the index keys (00:33:24), red circle on `4.3` (00:33:45), red arrow down the data file from `apple` (00:34:30). 00:33:30 shows `(10.3 x 170,000) B` fully. 00:34:45 scrolled up. No new text.

## S18 - 00:35:00-00:35:45 - File names (b_003545.jpg)
New labels: `index.dict` under the index rectangle, `data.dict` under the data file (D-02 final).

## S19 - 00:35:48-00:36:33 - Portability: two files to one (b_003548.jpg, b_003615.jpg, b_003618.jpg, b_003630.jpg, b_003633.jpg)
00:35:48 an empty stretch of canvas; 00:36:00 blue dashed laser marks around the index file; 00:36:30 D-02 moved/copied next to an arrow pointing right to empty space (lasso selection box visible at 00:36:33). No new text.

## S20 - 00:36:45 - Single file (b_003645.jpg)
Diagram D-03 first form: one long grey rectangle, split by a vertical line into a small left part and a big right part; arrows up from below labelled `Index` (left) and `data` (right).

## S21 - 00:37:00-00:37:33 - Option 1: separator (b_003700.jpg, b_003703.jpg, b_003715.jpg, b_003730.jpg, b_003733.jpg)
New: a zigzag mark on the split line (the separator), and the text `special line / separator`. The zigzag disappears for one frame at 00:37:03 (redrawn). `pre-al` started at 00:37:15. 00:37:30 scrolled back to the calculation page (no new).

## S22 - 00:37:45-00:40:00 - Option 2: fixed size (b_003815.jpg, b_003845.jpg, b_003854.jpg, b_003857.jpg, b_004000.jpg)
New text (list under the single file):
- `- special line / separator`
- `- pre-allocate / Fixed size` with a boxed `2MB` below
- a third `-` with nothing written
Emphasis (00:38:54): red arrow along the Index part. 00:40:00 view only.

## S23 - 00:40:15-00:42:42 - Header with byte offset (b_004200.jpg, b_004230.jpg, b_004239.jpg, b_004242.jpg)
New: `header` (yellow) with an arrow to a thin new slot at the left end of the single file; `byk [sic, "byte"] offset of data` with an arrow down to the separator position. 00:42:42: `hea` started further down.

## S24 - 00:42:45-00:44:12 - Header fields (b_004245.jpg, b_004300.jpg, b_004303.jpg, b_004400.jpg, b_004409.jpg, b_004412.jpg)
Text (D-04):
- `header` followed by a row of dots
- `→ OUR_DICT -` with `8B` beside it (the 8 is written like a `g`: `gB`)
- `→ Version -`
- `→ inde` (00:43:00) / `→ St offset of data` (00:43:03, "start offset", then rewritten) / final `→ index size`
- Far right: `AOBB` (audio: "AODB", an example four-letter format name the teacher makes up; the second letter could also be read `O`, the last letter is a `B` with a D-like bowl)
Change: written while the teacher explains magic bytes (PNG etc.).

## S25 - 00:44:15-00:45:30 - Header size (b_004415.jpg, b_004418.jpg, b_004430.jpg, b_004433.jpg, b_004442.jpg, b_004445.jpg, b_004448.jpg, b_004500.jpg, b_004512.jpg, b_004530.jpg)
New: `4B` beside `Version` and beside `index size` (00:44:33); a brace `}` over the three header lines with `16B` (double underlined) (00:44:45); a white underline and arrow under the Index segment of the single file (00:44:42); the header slot shaded with yellow hatching (00:45:00). 00:44:30 scrolled to the calculation page, no new.

## S26 - 00:45:45-00:49:30 - Encoders and decoders (b_004700.jpg, b_004845.jpg, b_004915.jpg, b_004930.jpg)
New (yellow): `parquet` / `JSON` (left) and `Encoder & Decoder`.

## S27 - 00:49:33 - Portable (b_004933.jpg)
New: pink `Portable` above the single file with a pink arrow down to it (D-03 final).

## S28 - 00:49:45-00:52:00 - Serving the dictionary (b_005100.jpg, b_005109.jpg, b_005112.jpg, b_005115.jpg, b_005130.jpg, b_005142.jpg, b_005145.jpg, b_005200.jpg)
Diagram D-05 first form: stick-figure user → tall grey rectangle `L B` → three white rectangles, labelled `API Servers`. New text `GET /word` (written `GET /wond`) under the user (00:51:30). Emphasis (00:51:12): red arc around the single file and `Portable`.

## S29 - 00:52:12-00:54:45 - File on every API server (b_005212.jpg, b_005230.jpg, b_005445.jpg)
New: a yellow dot in each API server (a local copy of the file); text `updak [sic, "update"] tedious` / `inconsiknoy. [sic, "inconsistency"]` / pink `COST !!`.

## S30 - 00:55:00-00:59:39 - Central storage: S3 (b_005630.jpg, b_005745.jpg, b_005757.jpg, b_005845.jpg, b_005900.jpg, b_005903.jpg, b_005915.jpg, b_005930.jpg, b_005933.jpg, b_005939.jpg)
Change: yellow dots removed. New: a pink cloud with a small yellow file inside, to the right of the API servers; `S3` under it (00:57:45); `Poinkd [sic, "Pointed"] Rea[d]` with double underline at top right (end cut off at the page edge); three white lines from the API servers to the cloud (00:58:45). Emphasis (00:59:33): red marks on the single file.

## S31 - 01:00:30-01:01:30 - Network attached storage (b_010030.jpg, b_010130.jpg)
New under the cloud: `Network attachd [sic, "attached"] Storage`; `+ File System Semantics` (written `Semontics`); `(Random Read)`; `( file, off, n )`. Then a vertical divider and `HDFS` / `Netwok [sic] HDD` (01:01:30).

## S32 - 01:02:30-01:04:42 - Read flow (b_010230.jpg, b_010330.jpg, b_010415.jpg, b_010430.jpg, b_010433.jpg, b_010439.jpg, b_010442.jpg)
New: the file in the cloud redrawn as a yellow-outlined bar split into segments with the letters `I` and `D` (index, data) and a thin slot at the left (header); `Filepath on S3` above the top API server (01:02:30); a yellow spiral (in-memory hash table) in each API server and yellow `ω→o` (word → offset) between the top two (01:03:30) (D-05 final). Emphasis: red stroke under `GET /word` (01:04:33). 01:04:39-01:04:42: box drawn round `1751000 B` on the calculation page.

## S33 - 01:04:45-01:05:39 - Diagram copied (b_010515.jpg, b_010524.jpg, b_010527.jpg, b_010530.jpg, b_010533.jpg, b_010539.jpg)
01:05:24 blank stretch of canvas; 01:05:30 lasso selection around the serving diagram; 01:05:33 blue dashed laser outline; 01:05:39 the serving diagram (without the NAS notes) pasted onto a fresh page. No new text.

## S34 - 01:05:45-01:06:45 - Weekly update (b_010600.jpg, b_010609.jpg, b_010612.jpg, b_010645.jpg)
New: `updak [sic]: weekly` and a narrow file with `apple: —` / `ball: —` / `zoo: —` (the changelog). `updak` started in the middle at 01:06:45 (erased later).

## S35 - 01:07:00-01:09:45 - Update server (b_010745.jpg, b_010800.jpg, b_010812.jpg, b_010945.jpg)
Diagram D-06 first form: an arrow down from the S3 cloud to a new rectangle (a server) holding a long rectangle and a small rectangle (dictionary + changelog). New text `append at end` (01:08:00; a student proposal).

## S36 - 01:10:00-01:13:03 - Why in-place update fails (b_011030.jpg, b_011145.jpg, b_011230.jpg, b_011245.jpg, b_011300.jpg, b_011303.jpg)
Diagram D-07: changelog entry `apple, a round fruit`; a big file box with `apple, a fruit` / `ball, a round obj`. At 01:11:45 yellow text `a round fruit` is written over `a fruit` and runs into the next line, which becomes an unreadable overlap of `ball, a` and `round fruit` (the overwrite corrupts the next entry). 01:12:30-01:13:03 no new content.

## S37 - 01:13:15-01:14:42 - New file (b_011415.jpg, b_011430.jpg, b_011439.jpg, b_011442.jpg)
New: `new file` (double underlined) with `↳` below; `↳ s` being written at 01:14:42.

## S38 - 01:14:45 - Merge page first seen (b_011445.jpg)
A separate area of the canvas, already drawn (D-08): yellow ① `Dictionary`: `→ a - a'`, `→ b - b'`, `→ c - c'`, `→ d - d'`, `→ f - f'`, `→ g - g'`, `→ h - h'` (first arrow yellow); yellow ② `Changelog`: `→ c - c''`, `→ e - e'`, `→ f - f''`, `→` (empty); `New dic`: `a - a'`, `b - b'`, `c - c''`, `d - d'`, `e - e'`, `f - f''`, `g - g'`, `h - h'` with a `//` end mark; a small empty pink box far right.

## S39 - 01:14:48 (b_011448.jpg)
Back on the update page: `↳ Sorted` (underlined) under `new file`.

## S40 - 01:15:00-01:17:45 - Merge walkthrough (b_011500.jpg, b_011745.jpg)
Re-shows S38 while the teacher walks the two pointers; no new content.

## S41 - 01:18:00-01:18:18 - New file written on the update server (b_011800.jpg, b_011803.jpg, b_011815.jpg, b_011818.jpg)
New: a third inner rectangle with zigzag fill (the merged file) inside the update server. Emphasis: red arc at its left (01:18:03). Other frames are zoom views.

## S42 - 01:18:30-01:20:30 - Upload (b_011900.jpg, b_011915.jpg, b_012030.jpg)
New: a yellow curve from the merged file up to the S3 cloud, arrowhead at the cloud (01:19:15) (D-06 final at this point).

## S43 - 01:20:45-01:24:42 - Upload path discussion (b_012245.jpg, b_012315.jpg, b_012324.jpg, b_012327.jpg, b_012330.jpg, b_012400.jpg, b_012415.jpg, b_012430.jpg, b_012439.jpg, b_012442.jpg)
New text (lower left): `upload to new S3 path` / `tranfer [sic, "transfer"] smooth` / `smooth transition`. Rest scroll only.

## S44 - 01:24:45-01:24:57 (b_012445.jpg, b_012457.jpg)
Scrolled up to the full update diagram; no new content.

## S45 - 01:25:00-01:26:15 - Prepared notes: same-path upload serves garbage (b_012530.jpg, b_012615.jpg)
Pre-written page (D-09). Text: (top, cut) `...built for old dictionary data`; `In index :` (yellow); `apple: 100, 1024`; `↑ on server` (pink); a yellow line from the index entry to the highlighted row `apple, a fruit` (pink) in a file `data.dat` (pink label); a second file `data.dat [new]` (pink label) whose highlighted row at the same position holds a different line, with `apple, a fruit` one row lower; a yellow line from the index entry to that row; yellow note `Something random !! User sees garbage response during lookup.`; pink `How to smoothly transition?` (01:26:15).
Emphasis (01:25:30): red underlines on `apple` and `100`, red arrow into the old file.

## S46 - 01:26:30-01:26:54 - Prepared notes: where to upload, transitions (b_012630.jpg, b_012633.jpg, b_012642.jpg, b_012645.jpg, b_012648.jpg, b_012654.jpg)
Pre-written pages, scrolled through.
- Above S45: yellow `Where to upload the new dictionary?`; `Same location ?` `S3:// word-dictionary / data.dat` / `/ index.dat`; `Note: Servers have already loaded the old index built for old dictionary data`.
- Below S45 (D-10): yellow `Transitions:`; `1. Periodic refresh of server's index` with a timeline (white line, yellow ticks, yellow `pull` arrow at the first tick, a pink tick labelled `index.dat change on S3`, an arrow `garbage response` just after it); `Graceful Termination | Reload` with a small arrow; `2. Reactive: PubSub`: a white pipe `Redis` with yellow arrows down to three `API` boxes, each with a small purple hatched tag; a white cloud `S3` holding a purple hatched block and a yellow hatched block; a vertical line from the cloud down to a pink box `Standalone`; a pink line from `Standalone` up and left into the Redis pipe; `3. Parallel Setup` (the rest is below the visible area).

## S47 - 01:27:00-01:27:30 - Versioned paths (b_012715.jpg, b_012730.jpg)
Back on the live page. New: `S3:// wd/ dict1.dict` (with a struck-out `pa` before it) and `S3:// wd/ dict2.dict`, with an arrow pointing at `dict2`.

## S48 - 01:27:45-01:30:12 (b_012915.jpg, b_013000.jpg, b_013012.jpg)
Scrolled up to the update diagram; no new content.

## S49 - 01:30:15-01:31:30 - Metadata file (b_013130.jpg)
New (top right of D-06): `polling metafile` ↓ `meta.json` with an arrow to a small circle (a file) inside the S3 cloud; a JSON sketch `{ path: "____" }`.

## S50 - 01:31:45-01:33:45 - Redis Pub/Sub sketch (b_013230.jpg, b_013345.jpg)
New: a horizontal grey pipe (pub/sub channel) below the API servers; three curved lines from the API servers down to the pipe (yellow at 01:32:30, recoloured purple by 01:33:45) and a purple curve from the pipe to the update server (publisher). Emphasis (01:33:45): big red loops around the pipe and the update server.

## S51 - 01:34:00-01:41:00 (b_013415.jpg, b_013500.jpg, b_013645.jpg, b_013945.jpg, b_014030.jpg, b_014033.jpg, b_014100.jpg)
No new content. Emphasis: red circles on the right edge of each API server with red curves to the pipe (01:35:00); a red mark inside the top API server (01:41:00).

## S52 - 01:41:15-01:43:15 - Reload by deployment (b_014245.jpg, b_014315.jpg)
Change: the pipe and purple lines erased. New (purple): `AWS SDK` near the update server with a short arrow toward it, and a long curved arrow labelled `Deploy` from `AWS SDK` up to the LB / API servers (D-11 final).

## S53 - 01:43:24-01:43:42 - Prepared notes scrolled at speed (b_014324.jpg, b_014325.jpg, b_014327.jpg, b_014328.jpg, b_014330.jpg, b_014331.jpg, b_014333.jpg, b_014335.jpg, b_014337.jpg, b_014339.jpg, b_014340.jpg, b_014342.jpg)
The teacher says the pre-written notes cover the same flow and scrolls through them. Pages seen (extra frames pulled at 01:43:25-01:43:40 to read each):
- 01:43:24 Where-to-upload page (S46); 01:43:25/01:43:27/01:43:40 merge page (S38); 01:43:28 the requirements page (S03, full width: `Response time can be high`).
- 01:43:30/01:43:37/01:43:39 prepared `Updating the dictionary` page: `updates are changelog` (pink `changelog`) beside a file box `apple, fruit` / `zoo, animal...`; `Procedure: - Spinup a new server` / `- download the dictionary locally` / `- download the changelog` / `- merge in O(n), create a new dict & index locally` (`O(n)` green highlight) / `- upload the new dictionary on S3 & new index`; yellow `How is merge O(n)?`; `Dictionary is sorted. Index is sorted`; `Merge → Merging of two sorted lists` (green highlight).
- 01:43:31 prepared one-file-per-word page (D-12): a dotted vertical line ending at `/z/ zoo.txt` ← `word.txt having all details`; ↙ `Folder for each char`; `lookup: get_word(w) → oreak [sic, "create"] S3 path` / `goto S3, read the file` / `return the meaning`; stick user — `LB` — two `API` boxes — cloud `S3`; pink `But it breaks a major requirement` and pink box `Portability`.
- 01:43:33 prepared indexing page (zoomed, left edge cut): `...do better? ⟶` pink box `Too slow and expensive`; `...ups faster:` / `...sual strategy to make lookups faster -` yellow box `Indexing`; index lines cut at the left `: 127`, `...on: 127:130`, `...: 257:100`, `: 357 : 150`, `: 1023795 : 100`, `1023895 : 196` with a brace and `...ale file on S3`; a pink-bordered data box `a, first letter in english alphabet` / `abandon, to leave and never return to` / `ability, power or skill to do something` / `able, having the power that is needed to do something` / ⋮ / `zone, an area which is different from other areas` / `zoo, a place where many kinds of animals are kept`, labelled `data.dat`.
- 01:43:35 prepared sizing page: `Total words: 171476`; `length of one entry = avg word length + 3 + 2x4`, with `4.7` above `avg word length` and `separator + Newline` pointing at `3`; `Total size of index file = 15.7 x 171476 = 2692173.2 ≈ 2.6 MB` (yellow box); yellow `Flow:` `API server on boot → loads the index file in memory → upon receiving a req → lookup in index (memory) → find offset → goto S3 and read the entry → return the meaning`.
- 01:43:42 the garbage-response page (S45).

## S54 - 01:43:45-01:51:45 - Real world application (b_014745.jpg, b_014830.jpg, b_014945.jpg, b_015045.jpg, b_015115.jpg, b_015145.jpg)
New live page. Text: `Real world application:` (yellow); `- Multitiered Storage` with an arrow up to `historical orders on S3` and an arrow down to `lakst [sic, "latest"] orders on MySQL`; `Without loosing [sic, "losing"] an ability to Query the data` / `store historical data on S3`; purple `Athena` / `Data lake`.

## S55 - 01:52:00-01:59:00 - Superfast KV store: requirements (b_015200.jpg, b_015203.jpg, b_015245.jpg, b_015900.jpg)
New page (drawn before the break; 01:52:03 is a brief scroll back to S54). Text: `Superfast DB KV` (yellow heading; the V looks like a Y); `Requirements :` (yellow) `superfast reads, writes, deletes, persistence` (`persistence` pink); `Brainstorm :` (yellow) `r, w, up, del + persish [sic]`.
Diagram D-13 first form: a purple-outlined ellipse (a disk platter) cut into sectors by white lines from the centre, one sector filled with pink dots (data in one sector).
01:53-01:59 is the break (no tiles in b_015900.jpg).

## S56 - 01:59:15-02:03:00 - Storage speed scale (b_020300.jpg)
New (top right): a horizontal scale with ticks, `SSD` above, `M` (memory) under the left cluster of ticks and `HDD` (written like `HDO`) under the right ticks.

## S57 - 02:03:15-02:04:15 (b_020345.jpg, b_020415.jpg)
New: `PUT   GET   DEL   (Persistence)` and `↳` under PUT.

## S58 - 02:04:30-02:05:45 - Append-only file (b_020545.jpg)
Change: `(Persistence)` erased. New: a tall grey rectangle (the file) under PUT; `Append only` / `Zero seek` / `no big mech movement`.

## S59 - 02:06:00-02:06:33 (b_020615.jpg, b_020624.jpg, b_020627.jpg, b_020630.jpg, b_020633.jpg)
New: `↓` above the file; green `Best we can do!!`; `PUT K₁ V₁` below (02:06:27). Other frames scroll.

## S60 - 02:06:45-02:08:30 - Puts appended (b_020815.jpg, b_020830.jpg)
New: rows in the file `K1 V1` (a dot at its left = start offset), `K2 V2`, `K3 V3`, pink `K1 V1'`, and a pink dotted line beside the next slot; list `PUT K1 V1` / `PUT K2 V2` / `PUT K3 V3` / `PUT K1 V1'` (D-14 first form).

## S61 - 02:08:45-02:09:39 - Delete (b_020900.jpg, b_020930.jpg, b_020939.jpg)
New: `DEL K2` beside the list. Emphasis (02:09:39): red bracket at the left of rows K2..K1 V1'.

## S62 - 02:09:45-02:11:15 - Delete as a put (b_021045.jpg, b_021100.jpg, b_021115.jpg)
New: pink row `K2 -1` appended to the file; `DEL K2 = PUT(K2, -1)` (pink right side; a stray stroke between `K2` and `-1`).

## S63 - 02:11:30-02:14:45 - In-memory hash table (b_021210.jpg, b_021240.jpg, b_021345.jpg, b_021415.jpg, b_021424.jpg, b_021427.jpg, b_021430.jpg, b_021433.jpg, b_021445.jpg)
New: a copy of the file lower on the page; purple `K1 → O1` with an arrow to row 1 (02:12:10); purple `in-mem` label (02:12:40); then the `1` over-written to `4` (`K1 → O4`) with the arrow re-pointed to `K1 V1'`, and `K3 → O3` with an arrow to `K3 V3` (02:13:45) (D-14). Emphasis (02:14:33): red stroke under `persish`. Other frames scroll.

## S64 - 02:15:00-02:15:45 - Limits (b_021545.jpg)
New: `* amount of index fit in ram` / `* Keys` (underlined); an arrow to the file and `File grows huge!!!`.

## S65 - 02:16:00-02:18:30 - More files (b_021700.jpg, b_021830.jpg)
New: three more tall grey rectangles (files) to the right of the first.

## S66 - 02:19:00-02:21:30 - File rotation, merge and compaction (b_022000.jpg, b_022130.jpg)
New (D-15): labels `001 002 003 004` over the four files (the third is written like `007`; audio says "003"); files 002 and 003 carry a white wavy line (filled, old); file 004 outlined in yellow with horizontal lines (the active file); a brace under 001-003 labelled `Read Only`; in-mem entries changed to `K1 → f1, O4` and `K3 → f2, O3` (file + offset); `Merge & Compacta` [cut/abbreviated "Compaction"] under `Read Only`; `File Rotation` with a curved arrow to a small tilted file icon at the top right (small marks `fff` above the arrow).
Emphasis (02:21:30): big red loops around the in-mem map and files 001-003.

## S67 - 02:22:15-02:25:00 - Sawtooth and config (b_022300.jpg, b_022500.jpg)
New: a graph at the bottom right: white axes, a white rising zigzag then pink/yellow sawtooth peaks (disk usage grows, drops at each merge) (02:23:00); a pink horizontal cap line labelled `1TB`; `1. MC freq` / `2. file rot[ation]` / `thresh[old]` (cut off at the right edge, 02:25:00).

## S68 - 02:25:15-02:25:45 (b_022515.jpg, b_022530.jpg, b_022542.jpg, b_022545.jpg)
Views of the page. Emphasis: red ellipse over the disk platter (02:25:15); faint red ellipse round `K1 V1` (02:25:45). No new content.

## S69 - 02:25:48 - Prepared notes: Bitcask writes and deletes (b_022548.jpg)
Pre-written page: a file box `K1 : V1` / `K2:V2` / `K3:V3` / ⋮ / `K1 : V1'` / `K2 : V2'` (keys yellow); `PUT(K,V) → append to this file` ↑ pink `lightning fast operation`; yellow `DEL(K)` `Delete operation is also a PUT with special value` ↓ `-1`; `DEL(K) → PUT(K, -1)` ↑ pink `lightning fast operation`.

## S70 - 02:26:00-02:26:30 - Prepared notes: what we get (b_022630.jpg)
Text: yellow `What we get?` `High write throughput ↗ even on HDD`; `The SSD does not give similar gain`; pink box `5000x gain`; yellow `Simplest design :` `single files of KV pairs`; then S69 below.

## S71 - 02:26:45-02:29:00 - Prepared notes: record format (b_022645.jpg, b_022654.jpg, b_022715.jpg, b_022724.jpg, b_022730.jpg, b_022745.jpg, b_022748.jpg, b_022900.jpg)
Text (D-16):
- yellow `How one entry in the file looks like?`; a bar: [blank] | `K` | `V`
- `When reading one entry from file, do we know how much to read`
- `we cannot read "until newline" ... not optimal`
- yellow `Because key and value are variable length` ↙
- a bar: [blank] | `KSZ` | `VSZ` | `K` | `V`, brace under KSZ VSZ `Key size & Value size`
- `we read KSZ (4b) VSZ(4b[cut off]` / `& then read` / `KSZ bytes for key` / `VSZ bytes for value`
- yellow `Solving integrity`; a bar [blank] | `KSZ` | `VSZ` | `K` | yellow `110` (a partly written value); a yellow hatched line under KSZ..value; ↑ yellow `machine crashed while writing value` (02:27:45)
Emphasis (02:27:48): faint red ellipse near K/V.

## S72 - 02:29:15-02:32:45 - Prepared notes: CRC (b_022945.jpg, b_023230.jpg, b_023245.jpg)
Text: `Finding carroupt [sic, "corrupt"] entries : CRC → First thing we flush`; a bar `CRC` | `TS` | `KSZ` | `VSZ` | `K` | `V`; ↑ under TS `Timestamp for conflicts` (D-16 final).

## S73 - 02:32:57-02:33:18 - Prepared notes: faster GET, file rotation (b_023257.jpg, b_023300.jpg, b_023303.jpg, b_023315.jpg, b_023318.jpg)
Text:
- yellow `Faster GET(k)` `To get O(1) GET we` pink box `Index`
- `In-memory Hash Table`; `k1 → o1`, `k2 → o2`, `k3 → o3` with purple lines to rows of a grid (the file; right-hand cells read `k1`, `k2` (yellow), `k1`, `k3`, `k1` (yellow), `k3` (yellow)) (D-17); ↑ `offset of the latest entry in the file`
- `GET(k) → pointed queries`; `- Hash table lookup` / `- disk seek` / `- disk read`
- pink `limitation: Index to fit in memory`
- yellow `When file grows too big?`; `Solution: Rotate the file every 't' bytes`; `We create new file and old file is made immutable` (`immutable` green highlight); yellow `Instead of one file, we have multiple files` / `but only one is "ACTIVE"`
- D-18: pink `Immutable` brace over four white files; pink `Active` over a yellow file; pink `Available for reads` under the immutable files; ↑ `writes go here` under the active file
Emphasis: red lines over the k→o arrows (02:33:03); red arc over `grows too big` (02:33:18).

## S74 - 02:33:30-02:33:45 - Prepared notes: in-memory index entry (b_023330.jpg, b_023333.jpg, b_023345.jpg)
Text (D-19): yellow `Changes in our in-memory index`; box `K1` → record `File ID | VSZ | VPOS | TS`, purple `entry length` ↓ to VSZ, `more like Entry size`, `offset` under VPOS, `timestamp` under TS; an arrow from VPOS to a line in the second of three files (two white, one yellow); box `K2` → `File ID | VSZ | VPOS | TS` with an arrow up to the yellow file; yellow `We have a lot of files, can we optimize?`; `We merge & compact   all immutable files are` (continues in S75).

## S75 - 02:34:00-02:35:15 - Prepared notes: merge and compact (b_023515.jpg)
Text (D-20): `We merge & compact`; `all immutable files are merged & compacted` ↙ `stale entries skipped` ↘ `deleted entries skipped`; a pink sawtooth graph under a purple horizontal cap line; `Because files are merged, offset changes hence` ↙ `update index atomically!`. Emphasis: red line over the graph peaks.

## S76 - 02:35:30-02:37:15 - Prepared notes: limits and strengths (b_023530.jpg, b_023533.jpg, b_023539.jpg, b_023542.jpg, b_023600.jpg, b_023645.jpg, b_023715.jpg)
Text: yellow `Limitation of this DB:` `Keys musl fil [sic, "must fit"] in memory`; yellow `Strengths of this DB :` `O(1) reads, writes, deletes` / `High throughput, low latency` / `I/O saturation` / `Eazy [sic, "Easy"] Backups`; yellow `What we just designed is` pink box `Bitcask`.
02:35:33 briefly back on S75 (red oval near the graph, emphasis); 02:36:00 back on the index page with a red circle round the k→o entries (emphasis); 02:36:45 red underline under `throughput` (emphasis).

## S77 - 02:37:30-02:51:57 - Prepared notes: Bitcask in Riak (b_023730.jpg, b_023739.jpg, b_023800.jpg, b_024300.jpg, b_024309.jpg, b_024345.jpg, b_024530.jpg, b_024615.jpg, b_024900.jpg, b_025130.jpg, b_025145.jpg, b_025148.jpg, b_025157.jpg)
Text (D-21): pink `Bitcask` with a pink arrow to a yellow hatched block in the top `Riak` box; stick user — `proxy` — three `Riak` boxes, each with a yellow hatched block; `Most efficient KV Database` ↙ `used by uber in production` / `as Backend for Riak`; `Each node of Riak has an ins[tance]` [cut off by tiles] / `of Bitcask running`.
Change: on screen through the wrap-up and the first Q&A (02:38-02:52); no new content after 02:37:30.

## S78 - 02:52:00-02:56:00 - Q&A (b_025345.jpg, b_025600.jpg)
Re-shows S71/S72 (integrity, CRC record). No new content.

## S79 - 02:56:15-02:59:45 - Q&A on dictionary size (b_025630.jpg, b_025645.jpg, b_025657.jpg, b_025700.jpg, b_025715.jpg, b_025718.jpg, b_025930.jpg, b_025939.jpg, b_025942.jpg, b_025945.jpg)
Re-shows the requirements, index and calculation pages (S03, S16) and the serving diagram with NAS notes (S31). Emphasis (02:56:45): red circle round `1TB` in `dictionary is 1TB big`. No new content.

## S80 - 03:00:00-03:03:00 - Q&A on offsets and header (b_030015.jpg, b_030130.jpg, b_030200.jpg, b_030230.jpg, b_030245.jpg, b_030300.jpg)
Re-shows the calculation page, the update diagram with meta.json/Deploy (S52), the upload-path notes (S47) and the single-file/header page (S20-S27). Emphasis (03:02:45): red box scribbled over the Index segment of the single file. No new content.

## S81 - 03:03:15-03:06:15 - Q&A on sorted merge (b_030615.jpg)
Re-shows the merge page (S38). No new content. End of recording.
