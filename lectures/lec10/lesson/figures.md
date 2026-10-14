# Lecture 10: figure specs

This file is for the illustrator. Every figure on the page is listed here, in reading order. Board redraws give the D-xx diagram from `lectures/lec10/board/diagrams.md` and the clearest frame in `lectures/lec10/board/frames_kept/`. Open the frame and look at it, but never embed it: frames show participant tiles and the instructor's camera. New figures say "new". Each entry lists parts, arrows, labels, marker colours, the step text for step-throughs, the phone layout, a desc draft and the ledger ids it carries.

Totals: **43 drawn items** = 33 numbered figures (7 of them step-throughs: 3·c, 4·c, 5·b, 6·a, 7·c, 8·b, 9·c) + 10 rule-box sketches (one per RuleBox, §1–§10). The outline's totals row says "32 figures"; its per-section list names 33 (1·a … 11·a), and all 33 are specified here. **20 figures have a phone layout** (listed in §12). Clip posters are specified in `animations.md`. **All 21 board diagrams (D-01..D-21) are redrawn.** None is dropped. D-17, D-18 and D-19 are three prepared slides of one structure and are merged into Fig 10·a (reason given there). The accounting table is in §12.

---

## 0. The glyph kit (build these once, reuse everywhere)

Rules come from `learn/design/B-whiteboard-notebook/NOTES.md` and `site/FIGURES.md`. One stroke weight (1.7 px graphite; 1.1 px `thin` for inner rules and lifelines; 3.2 px `heavy` only for volume), round caps, bow ≤ 1.3 px, jitter ≈ 0.3 px, no hachure, no double strokes. Shapes are filled with `--fig-bg`. One generator, seeded per figure id and per part (`` `${id}-file` ``, `` `${id}-map` ``). Labels sit on the drawing, never in a legend. Mono for identifiers, sizes and file names (`index.dict`, `16 B`, `K1 → O4`); hand lettering for annotations.

### Reused from lec01 (existing kit parts)

| Glyph | Kit part | Label |
|---|---|---|
| user / client (person) | `Actor` (≤ 3 per figure), as on the board | hand `user` |
| API server | `Box` (3 px chamfer) | mono `api` |
| fleet | `Fleet n` | hand `×100 servers` (Fig 4·a only) |
| load balancer | `LoadBalancer` (narrow vertical bar) | mono `lb` |
| database (hot) | `Cyl` | mono `mysql` (Fig 6·e only) |
| S3 / network storage | `Cloud` (single stroke) | mono `s3` (or `hdfs`, `nas` where named) |
| pub/sub channel | `Pipe` | mono `redis pub/sub` |
| in-memory map | `Cache` (the k/v table part) with `label` | mono `in-mem map` (dictionary: `w → o`; key-value store: `K → O`) |
| update job server | `Box` | mono `update job` |
| step numeral | `Num` | matches the step text one-to-one |
| cross-out | `Cross` | red, only on a rejected option |
| cap line | `Ceiling` | red, `1 TB` |
| brace | `Bracket` | e.g. `16 B` |

### New parts this lecture needs (add to `src/figures/kit/`, built from `Line`, `Mark`, `Label`; seeded like the others)

| Part | Drawing | Label |
|---|---|---|
| `FileBar` | a long horizontal rectangle (default 420 × 28 units) split by thin vertical rules into named segments; segment widths are **not to scale** and the figure says so where it matters (hand `not to scale`). A header segment is narrow (≥ 22 units so its label fits). | mono segment names inside: `H` `I` `D`, or `header` `index` `data` when wide |
| `RowFile` | a tall rectangle with text rows separated by thin rules (the board's file with lines). Rows hold mono text (`apple,a fruit`); a column of three dots marks "and so on". Optional size tag at the bottom-right corner. | mono file name under it (`data.dict`); mono size tag (`1 TB`) |
| `StripeFile` | a small tall rectangle with 6–8 short thin rules and no text (the board's "full file" sketch) | mono number above (`001`) |
| `ActiveFile` | a `StripeFile` with a short ↓ `AppendArrow` into its last empty row and the hand label `active` above it. The board's yellow outline is **not** carried (colour never encodes box type); the arrow and the word mark it. | hand `active`, `writes go here` |
| `AppendArrow` | a short vertical arrow (graphite unless on a request path) entering the tail of a `RowFile` / `FileBar` from above | hand `append` when first used |
| `OffsetCaret` | a small open caret (^) under a `FileBar` or beside a `RowFile` row, with a mono byte number | mono `0`, `14`, `100` |
| `MetaFile` | a small dog-eared rectangle (one folded corner) holding one mono line | mono `meta.json` under it |
| `RecordBar` | a short horizontal bar of cells with mono names; cell widths: fixed fields 44 units, `K` 48, `V` 80; a torn record ends with a jagged right edge (zigzag `Mark`) instead of a closing rule | mono `CRC` `TS` `KSZ` `VSZ` `K` `V` |
| `Platter` | a wide ellipse divided by 6 thin radial lines into sectors; one sector filled with graphite dots (the board's pink dots → graphite); a head arm (a thin line from outside the rim with a small rectangle at its tip) | mono `sector`, hand `head` |
| `SpeedScale` | a horizontal ruler with ticks; mono labels above/below at given positions | mono `memory` `SSD` `HDD` |
| `UsagePlot` | hand-drawn axes (`Line`), a polyline for usage, a red `Ceiling` at the cap | hand `disk used` (y), `time` (x) |
| `NodeRing` | a circle (thin) with nodes as `Box`es straddling it at given angles | mono `riak` |
| `Hatch` (no hachure) | **not a fill pattern.** The board's hatched Bitcask blocks become a small `Box` with mono `bitcask` inside | mono `bitcask` |

### Arrow rules

- Solid = synchronous request. Dashed = async (the weekly job, the upload, the merge, the deployment trigger, merge and compaction). Open chevron heads, **on the initiator's direction only**.
- **Reads are initiated by the reader.** An API server reads S3, so the ranged-read arrow starts at the server and points at the cloud (blue). The bytes coming back are not a second arrow unless a figure needs to show them; if it does, it is a green return labelled with what came back.
- **The update job uploads**, so the upload arrow starts at the job server and points at S3 (dashed). The job also **downloads** the dictionary: that arrow starts at the job server and points at S3 (dashed, hand `download`), not S3 → job. (The board draws a down arrow from the cloud to the job server; the redraw puts the head on the initiator.)
- **Replication** does not appear in this lecture. The lecture-wide rule still holds: a replica pulls, so its arrow would start at the replica. Riak (Fig 10·b) is drawn without replication arrows; N copies are stated in a label (SN-08).
- **Subscriptions are pulls on a persistent connection.** In Fig 6·c each API server's line to the Redis pipe starts at the server (hand `subscribe`); the publish arrow starts at the update job.
- **Pointer arrows** (an index entry to its row, a map entry to its offset) are thin graphite with a small dot at the source and a chevron at the target row. They are not requests and are not blue, except in a step where the lookup *is* the request path.
- **Architecture views** (Fig 4·a, 4·b, 5·a, 6·b, 6·d, 10·b, 11·a) use orthogonal routing. Diagonals only in time-sequence views (step-throughs with lanes, the clip timelines) and on the ring (Fig 10·b, arcs follow the circle).

### Marker colours

**Blue** = request / read path (a `GET /word`, a ranged read on S3, a hash-map lookup, a scan cursor that *is* the read). **Green** = ack / success / a valid new file or record (the merged dictionary, a CRC that checks, a 200). **Red** = failure, garbage or corrupt bytes, stale offsets, hard limits (the `1 TB` disk cap, a torn record, `COST !!`). **Graphite** = everything else. The board's pinks, yellows and purples are *not* carried over: pink warnings become red only where they mark a failure or a limit (`COST !!`, `garbage`, `1 TB` cap); yellow headings, the yellow active file and purple in-memory structures become graphite. Colour never encodes box type, and never tells keys or files apart (NOTES weakness #3): use mono labels (`K1`, `001`) and position.

### Speech bubble rule

At most one per section, and only for the section's misconception, at the spot where the misconception lives:
- §5 Fig 5·b, on `ball`'s row: `I'll just move down, right?` (L-0129, L-0128).
- §6 Fig 6·a, on the API server: `same path, so no one needs telling` (L-0152, L-0157).
- §9 Fig 9·a, on bar 1: `just read me until \n` (L-0253).
- §1–§4, §7, §8, §10, §11: none. (The rejected ideas of §1–§4 are drawn as struck-out options, not as bubbles.)

### Accessibility

Every SVG gets a `<title>` = the figure title and a `<desc>` that states the mechanism in one or two sentences (drafts given as **desc** below). Step-throughs also narrate each step's text through the component's aria-live region. Text in figures is real `<text>`, not paths.

### Mobile

Any figure with **more than 7 glyphs or more than 2 panels** gets a separate portrait phone layout below 760 px (`<Desk>` / `<Phone>`, the phone version drawn at ≈ 340 units wide). Labels stay **≥ 12 px at 360 px** (`Label` clamps to 12.5 units; anything authored wider than ~360 units needs the phone layout). Each entry says how. Run `node scripts/check-figures.mjs <url> --width 360` and `--width 390`.

### Trade-off table header glyphs (`TH_GLYPHS` additions)

For T1–T5 (design component #11). Each is a 32 × 24 sketch built from the parts above: `rebuild` (a `FileBar` with a circular arrow), `separator` (a `FileBar` with a dashed rule in it), `fixed2mb` (a `FileBar` with a bracket `2 MB`), `stack` (a `FileBar` with ↓ at the left and ↑ at the right), `headeroffset` (a `FileBar` with a narrow first cell), `append` (a `RowFile` with `AppendArrow`), `inplace` (a `RowFile` with an arrow into its middle), `graveyard` (a `RowFile` with one struck row), `mergefile` (two thin files → one), `knowntime` (a clock), `pollmeta` (a `MetaFile` with a circular arrow), `pubsub` (the existing `broadcast`), `endpoint` (a `Box` with a small port), `perrequest` (a `MetaFile` with three short arrows), `rolling` (three boxes, one swapped), `bitcask` (`StripeFile` + `Cache`), `lsm` (a `Cache` over two stacked `StripeFile`s), `dictionary` (`FileBar` `H|I|D`), `kvstore` (`StripeFile` + `ActiveFile`).

---

## Lecture header + NotationKey (top of §1)

The NotationKey (design #4) shows, in one strip, each new glyph with its label: `FileBar` `H | I | D` (hand `header · index · data`), `Cloud` `s3`, `Cache` `in-mem map`, `OffsetCaret` `byte offset`, `Platter` `magnetic disk`, `AppendArrow` `append`, `ActiveFile` `active file`, `RecordBar` `CRC | TS | KSZ | VSZ | K | V`, plus the three marker swatches (`read path` blue, `success` green, `failure · limit` red). On phones the strip wraps to two columns.

---

## §1 A dictionary with no database

### Fig 1·a: The brief (new)
- **Section:** 1.1. **Board:** none (the requirement words are on D-01's frame `b_002215.jpg`: `storage, querying, portability, seamless updates`, `"searchable" via key`, `read heavy (very)`).
- **Parts:** a requirement card (a hand-ruled rectangle, 520 × 300) with four tabs along its top edge, left to right, mono `storage` · `query` · `portability` · `seamless updates` (L-0013). Inside the card, a two-column list in hand lettering with small glyphs:
  - left column: a `RowFile` thumbnail with mono `1 TB · 170,000 words` (L-0012); hand `one word in → its meaning out · else 404` (L-0011); hand `key → value: word → 2–3 lines` (L-0024).
  - right column: hand `read-heavy: ≫ 1000 : 1` (L-0025); a small calendar glyph with hand `changelog every Sunday` (L-0010); hand `no live updates` (L-0010); hand `high response time is OK` (L-0006); hand `one portable file` with a tiny `FileBar` (L-0007).
- **Struck-out row along the bottom:** mono `mysql postgres mongodb redis elasticsearch memcache`, one thin red strike through the whole row, hand `no database at all` (L-0003).
- **Small note** under the card, hand: `1 TB on purpose: too big to copy everywhere` (L-0305).
- **Colours:** red strike only. Everything else graphite.
- **Phone layout:** yes (> 7 glyphs). The card becomes one column; the four tabs wrap to two rows of two.
- **desc:** "A requirement card for the dictionary: a 1 TB file of 170,000 words, single-word lookups returning a meaning or 404, very read-heavy, updated once a week by a changelog, portable as one file, and no database of any kind."
- **Ids:** L-0003, L-0004, L-0006, L-0007, L-0009, L-0010, L-0011, L-0012, L-0013, L-0024, L-0025, L-0305.

### Fig 1·b: A plain text file (D-01 redraw)
- **Section:** 1.2. **Board:** D-01, frame `b_002215.jpg` (also `b_002030.jpg`). The red scan arrow on that frame is **not** drawn here; it belongs to Fig 2·a.
- **Parts:** one `RowFile` (260 × 220) with rows mono `apple,a fruit` / `amazon,a rainforest` and a column of dots below; mono `1 TB` at the bottom-right corner; mono `data.dict` is **not** written yet (the file has no name on the board here).
- **Beside it (left):** hand `text file` with a small green tick; below it hand `JSON file` with one thin red strike (the board's pink scribble) and a short hand reason `must read + parse all of it` (L-0016).
- **Under the file:** hand `one line per word: word , meaning` (L-0019) and hand `no word twice` (L-0021).
- **Colours:** green tick, red strike.
- **Phone layout:** no (5 glyphs); the labels sit under the file at ≤ 390 px.
- **desc:** "The dictionary as one plain text file, one line per word with its meaning, 1 TB in all; JSON is struck out because checking one word would mean reading and parsing the whole file."
- **Ids:** L-0016, L-0017, L-0019, L-0021.

### Fig 1·c: One file, not a folder (new, small)
- **Section:** 1.3. **Board:** none.
- **Panels (three small, side by side):**
  - (a) a fan of five overlapping small `StripeFile`s with mono `a.dict b.dict … z.dict` and hand `…×100`, hand `shard by word` (L-0028); a red `Cross` over the fan.
  - (b) a zip glyph (a `StripeFile` with a zipper: a short vertical row of tick marks down its middle) labelled mono `dict.zip`, with three tiny folders peeking out; hand `still many files inside` (L-0030); a red `Cross`.
  - (c) one `FileBar` with a green tick, hand `literally one file: copy it, ship it` (L-0029).
- **Margin tag:** the hand-lettered `one file` tag (outline voice rule) sits at panel (c).
- **Colours:** red crosses on (a) and (b); green tick on (c).
- **Phone layout:** panels stack (3 panels).
- **desc:** "Sharding into a hundred files and zipping many folders are both rejected; portable means literally one file that can be copied and shipped."
- **Ids:** L-0028, L-0029, L-0030.

### RuleBox sketch §1: one step at a time (new)
- **Sits in:** 1.3. **Sketch (480 × 160):** a staircase of three hand-drawn steps rising left to right. Step 1 holds a tiny `RowFile`, labelled hand `text file`. Steps 2 and 3 are empty, each with a small hand `?`. A tiny `Actor` stands on step 1.
- **Ids:** L-0034, L-0040.

---

## §2 Finding one word fast

### Fig 2·a: The naive lookup scans the file (D-01 redraw, with the scan)
- **Section:** 2.1. **Board:** D-01, frame `b_002215.jpg` (the red arrow down the left edge is the emphasis state).
- **Parts:** the `RowFile` from Fig 1·b (same seed, so it looks like the same file), now labelled mono `data.dict`, rows mono `apple,a fruit` / `amazon,a rainforest` / dots, mono `1 TB`.
- **Arrow:** a long **blue** arrow down the file's left edge from the first row to the bottom (the read is the request path), hand `read line by line until the word` (L-0042).
- **Labels right of the file:** a bracket over the full height, red hand `worst case: 1 TB`; a bracket over the upper half, red hand `average: 0.5 TB = 500 GB per request` (L-0044). Under the file, hand `every request, again` (L-0043).
- **Colours:** blue scan arrow; red bracket labels (a hard cost).
- **Phone layout:** no (4 glyphs); brackets move under the file at ≤ 390 px.
- **desc:** "The naive lookup reads the 1 TB file line by line until it finds the word: the whole file in the worst case, half a terabyte on average, for every request."
- **Ids:** L-0041, L-0042, L-0043, L-0044.

### RuleBox sketch §2: reads slow → index (new)
- **Sits in:** 2.1, at the turn from scan to index. **Sketch:** a long `FileBar` (no segments, mono `data`) with a short narrow bar above it, mono `index`; one blue arrow from the index bar down into one spot of the file, ending on an `OffsetCaret`. Hand under it: `then: how big is the index?`.
- **Ids:** L-0046, L-0060.

### Fig 2·b: A one-level index (D-02 redraw)
- **Section:** 2.2. **Board:** D-02, frame `b_003545.jpg` (also `b_002630.jpg`).
- **Parts:** left, a narrow `RowFile` (100 × 220) mono `index.dict` with rows mono `apple, 0` / `amazon, 14` / `book, 34`. Right, the `RowFile` `data.dict` (same seed as Fig 2·a) with rows mono `apple,a fruit` / `amazon,a rainforest` / `book,…` / dots, mono `1 TB`.
- **Arrows:** three pointer arrows (thin graphite), index row → its data row, straight and horizontal (orthogonal).
- **Offset carets:** at the left edge of `data.dict`, `OffsetCaret`s with mono `0`, `14`, `34` at the start of each row; a hand note `byte offset: the nth byte where the line starts` (L-0049), and a tiny mono callout `"apple,a fruit\n" = 14 bytes`.
- **Hand label above:** `"Indexing"` (the board's word). Under the index: hand `keys + offsets only` (L-0051).
- **Note:** the board's `o1, o2, o3` become real byte offsets (factcheck_applied §6 "Byte offsets in the example"). The page text says offsets are bytes, not line numbers (L-0049).
- **Colours:** graphite only (no request is shown in this still; the clip `l10-scan-vs-index` adds the blue).
- **Phone layout:** no (2 files, 3 arrows; drawn at 360 units it keeps labels ≥ 12 px). Check at 360 px; if `amazon,a rainforest` falls under 12 px, shorten the data rows to `apple,…` / `amazon,…`.
- **desc:** "A small index file lists each word with the byte offset where its line starts in the data file: apple at 0, amazon at 14, book at 34. A lookup reads the index, then jumps to that byte."
- **Ids:** L-0047, L-0048, L-0049, L-0050.

### Fig 2·c: The number crunch (D-02 right side, redrawn as a calculator strip)
- **Section:** 2.3, after PauseAndThink P1. **Board:** D-02 right side, frame `b_003545.jpg`.
- **Parts:** a hand-ruled strip (720 × 170), two rows of mono arithmetic, each with a small `Cache` glyph at its right end (the index in RAM).
  - Row 1 (as taught): `170,000 × (4.3 + 4 + 2)` with hand labels under the terms `avg word` · `offset` · `comma + newline` (L-0054, L-0055, L-0056, L-0057) `= 170,000 × 10.3 B = 1,751,000 B = 1.751 MB`. The final `1.751 MB` is circled (as on the board), with a green tick and hand `fits in RAM: "peanuts"` (L-0058, L-0059).
  - Row 2 (SN-02, A-D-01): `170,000 × (4.3 + 8 + 2) = 170,000 × 14.3 B ≈ 2.4 MB`. Under the `8`, red hand `a 1 TB file needs 8-byte offsets`. Green hand at the end `still fits` (SN-02).
- **Small footer, hand:** `MB = 10⁶ bytes` (A-FFD-07).
- **Colours:** green ticks on both results; red on the `8` note (the 4-byte limit).
- **Phone layout:** yes (wide arithmetic). Each row becomes three short lines: the expression, the product, the result.
- **desc:** "The index estimate: 170,000 words times about 10.3 bytes per entry is 1.751 MB. With the 8-byte offsets a 1 TB file needs, it is about 2.4 MB. Either way it fits in memory."
- **Ids:** L-0054, L-0055, L-0056, L-0057, L-0058, L-0059 (the last as label only); SN-02 (A-D-01), A-FFD-07.

---

## §3 One file you can ship

### Fig 3·a: Index and data in one file (D-03 redraw)
- **Section:** 3.1. **Board:** D-03, frames `b_030300.jpg` (also `b_004500.jpg`, `b_004933.jpg`).
- **Parts:** left, a small ghost of Fig 2·b's two files (38% ink) with a graphite arrow → one long `FileBar` (560 × 30). Segments: a narrow first slot (hand `header`, with a leader line, as on the board), then `index`, ending at a zigzag `Mark` (the boundary), then `data` (long).
- **Labels:** above the zigzag, hand `byte offset of data` (the board's `byk offset of data`); under the segments, arrows up from hand `index` and `data`. Top right, hand `portable` with an arrow to the bar.
- **Options list under the bar (hand):** `– special line / separator` · `– pre-allocate / fixed size` with a boxed mono `2 MB` (as on the board) (L-0067, L-0068).
- **Question mark:** a small red `?` above the zigzag, hand `where does the index stop?` (L-0066).
- **Colours:** red `?` only.
- **Phone layout:** yes (ghosted files + bar + list > 7 glyphs). Drop the ghosted files; the bar spans the width; the options list sits below in two lines.
- **desc:** "The index and the data are concatenated into one file. The reader must know where the index stops: a separator line or a fixed 2 MB region were proposed."
- **Ids:** L-0066, L-0068 (and L-0067 as a label).

### Fig 3·b: A 16-byte header (D-04 redraw)
- **Section:** 3.2. **Board:** D-04, frame `b_030300.jpg` (also `b_004445.jpg`).
- **Parts:** three hand-lettered lines with arrows, as on the board: `→ OUR_DICT – 8 B` · `→ version – 4 B` · `→ index size – 4 B` (mono for the field names and sizes). A `Bracket` (`}`) over the three lines with mono `16 B`, double-underlined.
- **Under it:** the same three fields as a `FileBar` drawn to scale (8 : 4 : 4 cells, total 320 units), cells mono `OUR_DICT` · `ver` · `index_size`, followed by a long `index …` and `data …` continuation (hand `not to scale` over the continuation).
- **Right, small:** hand `e.g. the instructor's own database name in the first bytes` with a mono `AODB` (the board's `AOBB`; audio "AODB") (L-0079 as a label).
- **Colours:** graphite.
- **Phone layout:** no (two blocks stack naturally at 340 units).
- **desc:** "The dictionary's header is 16 fixed bytes: an 8-byte name, OUR_DICT, a 4-byte version and the 4-byte size of the index that follows."
- **Ids:** L-0076, L-0077, L-0080, L-0081.

### Fig 3·c: Opening the file (new StepThrough)
- **Section:** 3.2, after the CodeBlock. **Board:** none (the boot procedure L-0082, D-04's layout).
- **Layout (lane figure, 420 wide):** the `FileBar` from Fig 3·b across the top (cells `OUR_DICT` · `ver` · `index_size` · `index` · `data`), with a blue read bracket that moves along it step by step; below, a `Box` mono `api` with an empty `Cache` mono `in-mem map`; the `TimeAxis` runs down the left with circled numerals.
- **Steps:**
  1. Bracket over bytes 0–15 (blue). *"Read the first 16 bytes: that is the header."* (L-0082)
  2. `OUR_DICT` cell gets a green tick. *"The first 8 bytes say OUR_DICT, so this is our dictionary."* (L-0077, L-0082)
  3. `ver` cell shows mono `1`. *"The next 4 bytes give the version; the decoder acts on it."* (L-0080)
  4. `index_size` cell shows mono `1,751,000`; a blue bracket spans the `index` segment. *"The next 4 bytes give the index size. Read exactly that many bytes."* (L-0076, L-0082)
  5. The `in-mem map` fills with mono `apple → …`, `amazon → …` (green). *"Build the hash table from the index."* (L-0082)
  6. The `data` segment gets hand `offsets point here`; the `api` box gets hand `ready`. *"Everything after the index is data. The server is ready."* (L-0082)
- **Colours:** blue read brackets; green tick and filled map.
- **Phone layout:** the lane figure already fits; the `FileBar` cells become `H` `v` `sz` `index` `data` with the full names in the step text.
- **Ids:** L-0076, L-0077, L-0080, L-0082.

### RuleBox sketch §3: compartments + a header (new)
- **Sits in:** 3.3. **Sketch:** a `FileBar` with a narrow first cell mono `H`; two thin graphite arrows leave the `H` cell, arc over the bar, and land on the start of the `index` and `data` segments. Hand under: `the header says where each part lies`.
- **Ids:** L-0083.

### Fig 3·d: Header first, or directory last (new, small)
- **Section:** 3.3. **Board:** none (D-04's nearby `parquet`, `JSON`, `Encoder & Decoder` words are the cue).
- **Parts:** four mini `FileBar`s stacked, each 360 units, each with a mono name at its left:
  1. `png`: first cell mono `89 50 4E 47 0D 0A 1A 0A`, hand `8-byte signature first` (A-FFD-01).
  2. `our dict`: first cell mono `16 B header`, then `index`, `data`.
  3. `parquet`: mono `PAR1` cell at the start, long data, then a cell mono `footer` and a final `PAR1`; hand `metadata at the end` (A-FFD-03).
  4. `zip`: members `f1 f2 f3`, then a cell mono `central directory` at the end; hand `offsets of each member, at the end` (A-FFD-04, A-D-10).
- **Under them, hand:** `json: no header, parse it all` with a tiny struck `FileBar` (L-0087).
- **Colours:** graphite. The locating cell in each bar (signature, header, footer, directory) is marked by a small hand `←` arrow pointing at it, not by a heavier outline (one stroke weight).
- **Phone layout:** yes (4 bars of 360 units). Each bar is redrawn at 300 units with the hand note under it instead of beside it.
- **desc:** "Four file layouts: PNG and this dictionary put their identifying header first; Parquet and ZIP keep the metadata that locates each part at the end of the file. JSON has neither."
- **Ids:** L-0086 (with A-FFD-01, A-FFD-03, A-FFD-04, A-D-10); L-0087 as a label.

---

## §4 Serving it from S3

### RuleBox sketch §4: bare minimum, bare minimum cost (new)
- **Sits in:** 4.1. **Sketch:** a `Box` `api` with a `Disk` slab under it labelled mono `1 TB`, the slab struck with a red `Cross`; one orthogonal arrow (blue) from the box to one `Cloud` `s3`. Hand: `one shared copy`.
- **Ids:** L-0100.

### Fig 4·a: One copy per server (new)
- **Section:** 4.1, after PauseAndThink P3. **Board:** D-05 bottom-left list, frame `b_010415.jpg` (`updak tedious` / `inconsiknoy.` / pink `COST !!`).
- **Parts:** `Actor` `user` → `LoadBalancer` → three `Box` `api` (orthogonal fan-out), each with a `Disk` slab under it labelled mono `1 TB`. A `Fleet` hint behind the third (hand `…×100 servers`). To the right, a tally in mono: `100 servers × 1 TB = 100 TB` with hand `redundant copies on SSDs` (L-0102).
- **The board's list, right column:** hand `update tedious` and `inconsistency`, each in graphite with a small hand `fine: weekly, bulk` / `fine: meanings barely change` beside it (L-0096, L-0097); then a red, larger hand `COST !!` (L-0099).
- **Colours:** blue on `GET /word` (user → lb → api); red `COST !!`.
- **Phone layout:** yes (> 7 glyphs). Stack: the architecture row (one `api` + `Disk` shown, hand `× 100`) above, the tally, then the three-line list.
- **desc:** "Copying the 1 TB dictionary to every API server: tedious updates and brief inconsistency are tolerable for a weekly update, but a hundred servers hold a hundred terabytes of redundant data. Cost is the real problem."
- **Ids:** L-0093, L-0096, L-0097, L-0099, L-0102.

### Fig 4·b: Pointed reads on S3 (D-05 redraw)
- **Section:** 4.3. **Board:** D-05, frame `b_010415.jpg` (also `b_010515.jpg`).
- **Parts:** `Actor` with mono `GET /word` under it → `LoadBalancer` → three `Box` `api` (orthogonal). Each api holds a tiny `Cache` (the board's yellow spiral → a two-row k/v glyph) and, between the top two, mono `w → o`. Above the servers, hand `file path on S3 (config)`. Right: a `Cloud` `s3` holding a small `FileBar` with cells mono `I | D`.
- **Arrows:** user → lb → each api (blue, solid). Each api → s3 (blue, solid, orthogonal, merging into one trunk before the cloud), labelled once mono `(file, off, n)`.
- **Labels under the cloud (from the board):** hand `network attached storage` · `| hdfs · network hdd` · `+ file system semantics (random read)` (L-0110, L-0111, L-0113; the clarification in 4.2 reads "networked storage with (offset, length) reads", so the label is exactly the board's and the prose does the qualifying). Top right: hand `pointed read`, double-underlined (L-0117).
- **Colours:** blue request path; no green (the still shows the path, not a result).
- **Phone layout:** yes (> 7 glyphs). Portrait: user and lb on top, the three api boxes as one `Fleet` (`×3`), the cloud below, the NAS labels under the cloud in two lines.
- **desc:** "Users' GET /word requests go through a load balancer to API servers that each hold the word-to-offset map in memory. Each lookup is one ranged read of n bytes at an offset in the single file on S3."
- **Ids:** L-0093, L-0094, L-0110, L-0111, L-0117.

### Fig 4·c: Boot, then one GET (new StepThrough)
- **Section:** 4.3. **Board:** none (D-05's flow; L-0115, L-0116).
- **Layout (lanes, time down):** `api` · `s3 (dict1.dict)`; the api lane carries a small `Cache` that fills; a hand config tag at the top of the api lane: mono `path = s3://word-dictionary/dictionary1.dictionary`.
- **Steps:**
  1. Config tag highlighted. *"The server starts with one setting: the file's path on S3."* (L-0114)
  2. api → s3 (blue), mono `Range: bytes=0-15`; green return mono `OUR_DICT · 1 · 1,751,000`. *"One ranged read gets the 16-byte header."* (L-0115; A-D-03 for the `Range` header)
  3. api → s3 (blue), mono `bytes=16-1,751,015`; green return `index`. *"A second read gets exactly index-size bytes."* (L-0115)
  4. `Cache` filled (green), hand `hash map built`. *"Build the in-memory map, then start serving."* (L-0115)
  5. `GET /word?w=apple` arrives at api (blue); map hit, mono `apple → 0`, hand `offset into the data`. *"A request for apple: the map gives its offset."* (L-0116)
  6. api → s3 (blue), mono `bytes=1,751,016-1,751,029` (16 + 1,751,000 + 0, then the 14 bytes of `apple,a fruit⏎`); green return `apple,a fruit`; green `200`. *"One ranged read of that record, and the answer goes back."* (L-0116, L-0117)
  7. `GET /word?w=qwzx` arrives; map miss; red `404`, no arrow to s3. *"An unknown word never touches S3: 404."* (L-0116)
- **Fidelity:** the byte ranges follow from the 16-byte header, the 1,751,000-byte index (L-0058) and apple's 14-byte line at the start of the data (Fig 2·b); whether the map stores offsets from the file's start or from the data's start is not specified in class, so the figure shows the data-relative offset plus the header and index sizes, and the step-through caption says so. The word `qwzx` is illustrative.
- **Colours:** blue requests; green returns and 200; red 404.
- **Phone layout:** lanes fit; the mono ranges wrap under the arrow.
- **Ids:** L-0114, L-0115, L-0116, L-0117.

---

## §5 The weekly update

### Fig 5·a: A job on its own server (D-06 lower half redraw)
- **Section:** 5.1. **Board:** D-06 lower half, frame `b_014315.jpg` (also `b_011145.jpg` for the changelog).
- **Parts:** top, the `Cloud` `s3` holding mono `dict1.dict`. Below it, a large `Box` mono `update job` (a newly spun-up server) holding three things: a long `RowFile` thumbnail mono `dictionary`, a small `RowFile` mono `changelog` with rows mono `apple: —` / `ball: —` / `zoo: —`, and an empty dashed outline mono `new file`. To the left, hand `update: weekly` (as on the board).
- **Arrows:** update job → s3, dashed, hand `download` (initiator: the job). A thin hand arrow from a small envelope glyph to the changelog, hand `arrives every Sunday` (L-0010).
- **Strike note (right, small):** hand `append at end` with a thin red strike, hand `grows forever, duplicates` (L-0124).
- **Colours:** red strike only.
- **Phone layout:** no (5 glyphs inside one box; stacks at 340).
- **desc:** "Each week a separate server downloads the current dictionary from S3 and holds it with the small changelog of changed words; it will build a new file rather than append."
- **Ids:** L-0120, L-0122 (L-0124 as a label).

### Fig 5·b: Apple runs into ball (D-07 redraw, StepThrough)
- **Section:** 5.2, after PauseAndThink P4. **Board:** D-07, frame `b_011145.jpg`.
- **Layout:** left, the changelog line mono `apple,a round fruit`. Right, a `RowFile` (two rows visible, then dots) whose rows are drawn as a **byte strip**: the characters in fixed-width mono cells, so the overwrite is visible cell by cell. Rows: `apple,a fruit⏎` / `ball,a round object⏎`. An `OffsetCaret` mono `0` at apple.
- **Speech bubble (§5):** on `ball`'s row: `I'll just move down, right?`.
- **Steps:**
  1. The two lines in the file. *"The file holds apple, then ball, byte after byte."* (L-0129)
  2. The index gives apple's offset (blue pointer to caret `0`). *"The index says apple starts at byte 0."* (L-0128)
  3. `apple,a round fruit⏎` is written from byte 0 (the new characters in graphite over the old cells); its last six bytes, `fruit⏎`, run past the old `⏎` at byte 13 and land on bytes 14–19, where `ball,a` was. *"Write the longer meaning there: the extra bytes land on ball's line."* (L-0130, L-0131)
  4. The second row now reads ` round object⏎` (the `ball,a` cells are gone), ringed red; hand `ball is gone`. *"Ball didn't move down. Its first bytes were overwritten, and the word is lost."* (L-0132)
- **Fidelity:** the byte counts are exact. `apple,a fruit⏎` is 14 bytes (0–13), `ball,a round object⏎` is 20 bytes (14–33), and `apple,a round fruit⏎` is 20 bytes (0–19). So bytes 14–19 (`ball,a`) become `fruit⏎`, and the file now reads `apple,a round fruit⏎` then ` round object⏎`. The builder renders the cells from these three literal strings. The board's drawing (`a round obj` overlapping `ball, a`) shows the same thing loosely.
- **Colours:** blue pointer (step 2); red ring (step 4).
- **Phone layout:** the byte strip wraps at 10 cells per line; the bubble moves under the strip.
- **Ids:** L-0128, L-0129, L-0130, L-0131, L-0132.

### Fig 5·c: Merge, as in merge sort (D-08 redraw)
- **Section:** 5.3. **Board:** D-08, frame `b_011745.jpg` (also `b_030615.jpg`).
- **Parts:** three columns, mono headers with circled numerals as on the board: ① `dictionary` (rows `a – a′`, `b – b′`, `c – c′`, `d – d′`, `f – f′`, `g – g′`, `h – h′`), ② `changelog` (`c – c″`, `e – e′`, `f – f″`, then an empty slot with hand `done`), and `new dictionary` (`a – a′`, `b – b′`, `c – c″`, `d – d′`, `e – e′`, `f – f″`, `g – g′`, `h – h′`, then mono `//` end).
- **Arrows:** the two pointers as small graphite carets left of each column (the board's first arrow yellow → graphite; the current pair drawn in blue in the still: dictionary at `c – c′`, changelog at `c – c″`). Thin graphite lines from `c – c″` in the changelog to `c – c″` in the new file; same for `e – e′` and `f – f″`.
- **Labels:** in the new file, the three changelog rows get a small green tick (`c″` updated, `e′` new, `f″` updated). Under the columns, hand `smaller word goes out; equal → changelog wins, both move` (L-0143) and `one pass, line by line, never the whole file in memory` (L-0145).
- **Colours:** blue current pointers; green ticks.
- **Phone layout:** yes (3 columns × 8 rows). Columns narrow to 100 units each; headers abbreviate to `① dict`, `② changes`, `new`; the two hand notes move under the figure.
- **desc:** "Two pointers walk the sorted dictionary and the sorted changelog; the smaller word is written to a new file, and on a match the changelog's meaning wins. The output is sorted and complete."
- **Ids:** L-0140, L-0143, L-0144, L-0145.

### RuleBox sketch §5: never write in place (new)
- **Sits in:** 5.3. **Sketch:** two short sorted strips (mono `a b c …`, `c″ e′`) with one caret each; arrows from both into a third strip mono `new`, which gets a green tick. Over the first strip, a small arrow into its middle with a red `Cross`, hand `in place`.
- **Ids:** L-0146.

---

## §6 Switching every server to the new file

### Fig 6·a: Old index, new file (D-09 redraw, StepThrough)
- **Section:** 6.1, after PauseAndThink P5. **Board:** D-09, frame `b_012615.jpg`.
- **Layout:** left, a `Box` `api` holding a `Cache` with one row mono `apple: 100, 1024`, hand `in the index, on the server` (the board's `↑ on server`). Right, a `RowFile` mono `data.dat` with 8 thin text rows; one row framed and labelled mono `apple,a fruit`. An `OffsetCaret` mono `100` at the framed row.
- **Speech bubble (§6):** on the api box: `same path, so no one needs telling`.
- **Steps:**
  1. Pointer from `apple: 100, 1024` to the framed row (blue); green `apple,a fruit`. *"The server's index says apple is at byte 100, 1,024 bytes long. The read returns apple."* (L-0158)
  2. A new `RowFile` mono `data.dat [new]` slides over the old one at the same path; its rows are shifted, `apple,a fruit` now sits one row lower. The server's index is unchanged. *"The new file is uploaded to the same path. The server still holds last week's offsets."* (L-0157, L-0158)
  3. The same read (blue) at byte 100 now frames a row that starts mid-word; the returned text is red mono `…le, a frui|t\nbal…` (illustrative garble), hand `something random!!`. *"The same read now returns bytes from another word, cut mid-line: garbage."* (L-0158, L-0159)
  4. Red hand `user sees garbage until every server reloads`, then hand `how to smoothly transition?` (the board's pink question, graphite). *"Until each server reloads its index, users see garbage."* (L-0159, L-0160)
- **Fidelity:** S3 replaces the object atomically (L-0153 clarification, A-D-05), so step 2 shows the whole file swapped at once, never half-uploaded. The danger drawn is the stale offset, which is the danger the lecture names.
- **Colours:** blue reads; green on step 1's result; red on step 3–4's result and note.
- **Phone layout:** the two files stack (old above new); the index box sits above them.
- **Ids:** L-0157, L-0158, L-0159, L-0160 (L-0152 as the bubble).

### Fig 6·b: A pointer file (D-06 top-right redraw + D-11 inset)
- **Section:** 6.2. **Board:** D-06 top right, frame `b_014315.jpg` (`polling metafile`, `meta.json`, `{ path: "____" }`, `S3://wd/dict1.dict` / `S3://wd/dict2.dict`); inset D-11, frame `b_014331.jpg`.
- **Main panel:** a `Cloud` `s3` (wide, 360 × 150) holding three items in a row: `StripeFile` mono `dict1.dict`, `StripeFile` mono `dict2.dict` (with a green tick, hand `new`), and a `MetaFile` mono `meta.json` containing mono `{ path: "s3://wd/dict2.dict" }`. A thin pointer arrow from the `meta.json` path line to `dict2.dict`. Below the cloud, `Box` `update job` with a dashed arrow up to `dict2.dict`, hand `upload to a new path` (L-0161), and a second dashed arrow up to `meta.json`, hand `then update the path` (L-0166).
- **Labels:** over `meta.json`, hand `static path: the one place to look` (L-0167). Under `dict1.dict`, hand `still serving` (L-0151). Footer mono `s3://word-dictionary/dictionary1.dictionary → dictionary2.dictionary` (L-0161).
- **Inset (rejected, small, framed, bottom right):** D-11 reduced: `Actor` — `lb` — two `api` — `Cloud` `s3` with a fan of tiny files, mono `/z/zoo.txt`; hand `one file per word`; a red `Cross` and red hand `breaks portability` (the board's pink box `Portability`) (L-0165). The margin tag `one file` sits beside the inset.
- **Colours:** green tick on `dict2.dict`; red cross and label on the inset.
- **Phone layout:** yes (> 7 glyphs, 2 panels). The cloud's three items stack vertically; the inset becomes a separate small panel below.
- **desc:** "The new dictionary is uploaded beside the old one under a new name, and a small meta.json at a fixed path is updated to point at it. Storing one file per word is rejected because it breaks portability."
- **Ids:** L-0161, L-0165, L-0166, L-0167 (L-0151 as a label).

### Fig 6·c: Two ways to hear "changed" (D-10 redraw)
- **Section:** 6.3. **Board:** D-10, frame `b_012642.jpg`.
- **Panel 1 `periodic refresh of the server's index`:** a horizontal `TimeAxis`-style line with five graphite ticks, hand `pull` at the first; a red tick between the fourth and fifth labelled red hand `index changes on S3`; a red span from that tick to the next pull, red hand `garbage responses`. Right: hand `graceful termination | reload` (L-0160). Hand under the line: `poll every 5–10 min` (L-0166).
- **Panel 2 `reactive: pub/sub`:** a `Pipe` mono `redis pub/sub`; three `Box` `api` below it, each line from the box **up** to the pipe (initiator: the subscriber), hand `subscribe` once; a `Cloud` `s3` holding two small `StripeFile`s `dict1` `dict2`; a `Box` mono `update job` (the board's `Standalone`) with a dashed arrow into the pipe, hand `publish: "changed"` (L-0170). Red hand note under the pipe: `one more component · every server on a persistent connection` (L-0171).
- **Not drawn:** `3. parallel setup` (its content was not shown on the board; it is the subject of 6.2 and 6.4).
- **Colours:** red on the garbage window and the cost note; the publish arrow graphite (it is not a user request).
- **Phone layout:** yes (2 panels with > 7 glyphs). Panels stack; panel 2's api boxes become a `Fleet` `×3`.
- **desc:** "Polling meta.json leaves a window of garbage responses between the change on S3 and the next pull. Pub/Sub tells every server at once but adds a component and a persistent connection per server."
- **Ids:** L-0160, L-0170 (L-0166, L-0171 as labels).

### RuleBox sketch §6: trigger a deployment (new)
- **Sits in:** 6.4. **Sketch:** a small `Box` mono `aws sdk` at the bottom left with a curved dashed arrow up to a row of three small `Box`es (servers), hand `deploy` on the arrow (the board's purple `AWS SDK` / `Deploy`, graphite here). One server is drawn as two half-boxes (old fading, new solid) to suggest the swap.
- **Ids:** L-0185, L-0198.

### Fig 6·d: The update, end to end (D-06 full redraw)
- **Section:** 6.4. **Board:** D-06, frame `b_014315.jpg` (also `b_012445.jpg`, `b_030130.jpg`).
- **Parts:** top row (as Fig 4·b): `Actor` `GET /word` → `lb` → three `api` (each with a tiny `Cache`). Right: `Cloud` `s3` with `dict1.dict`, `dict2.dict`, `meta.json`. Bottom: `Box` `update job` with the dictionary, the changelog and the merged file inside (thumbnails from Fig 5·a). Left of the job: a small `Box` mono `aws sdk`.
- **Arrows and numbered steps (circled numerals on the arrows, matching the order taught):**
  - ① inside the job box, a short arrow dictionary + changelog → new file, hand `merge` (L-0196).
  - ② job → `dict2.dict`, dashed, hand `upload to a new path`.
  - ③ job → `meta.json`, dashed, hand `update the path`.
  - ④ `aws sdk` → servers, dashed curve, hand `trigger a rolling deployment` (L-0183).
  - Boot read (graphite, thin): each api → `meta.json`, hand `read on boot` once (L-0177).
  - User path: blue (as Fig 4·b).
- **Footer, hand:** `merge → upload → update meta.json → deploy` (L-0196).
- **Colours:** blue user path; green tick on `dict2.dict`; dashed graphite for the job's steps.
- **Phone layout:** yes. Portrait: the servers row on top (as a `Fleet`), the S3 cloud in the middle, the job and SDK at the bottom; numerals ①–④ keep their order down the page.
- **desc:** "The weekly update in four steps: merge into a new file, upload it to a new path, point meta.json at it, then trigger a rolling deployment; each new server reads meta.json on boot and loads the new file."
- **Ids:** L-0177, L-0183, L-0196.

### Fig 6·e: Cold data you can still query (D-12 redraw)
- **Section:** 6.5. **Board:** D-12, frame `b_014745.jpg`.
- **Parts:** an `Actor` `user` with hand `my orders`; an `api` box; two stores right of it: a `Cyl` mono `mysql` with hand `latest orders` (top) and a `Cloud` `s3` holding a small `FileBar` `H | I | D` with hand `historical orders (6+ months)` (bottom). Arrows api → mysql and api → s3, both blue, solid, orthogonal; the s3 arrow labelled mono `order_id → offset → ranged read`.
- **Labels:** heading hand `multi-tiered storage` (the board's `- Multitiered Storage`); under the cloud, hand `without losing the ability to query the data` (L-0191); a small graphite label pair at the right, mono `athena · data lake` (the board's purple words) (L-0193). Small hand on the s3 arrow: `slower, much cheaper` (L-0192).
- **Colours:** blue reads.
- **Phone layout:** no (6 glyphs); stack the two stores vertically at 340 units.
- **desc:** "Recent orders stay in the hot MySQL database; orders older than six months move to S3 in an indexed file, so they can still be looked up by order id, slower but much cheaper."
- **Ids:** L-0189, L-0191, L-0193 (L-0192 as a label).

---

## §7 Fast writes on a cheap disk

### Fig 7·a: A magnetic disk (D-13 redraw)
- **Section:** 7.1. **Board:** D-13, frame `b_020300.jpg`.
- **Panel a:** a `Platter` (360 × 120) with six sectors; one sector dotted (graphite), mono `sector`; a head arm reaching in from the right, hand `head`; a curved arrow along the rim, hand `spins`. Hand under it: `byte offset → disk · sector · offset in it` (L-0204). A red hand `moving the head = the slow part` with a thin arrow to the arm (L-0206).
- **Panel b:** a `SpeedScale` (the board's top-right scale): ticks; mono `memory` at the fast (left) end, `SSD` above a tick near it, `HDD` at the right; hand `faster, costlier ←  → slower, cheaper` (L-0201, L-0202). The board writes `M` for memory; the redraw spells it out.
- **Colours:** red note only.
- **Phone layout:** panels stack (2 panels, 5 glyphs).
- **desc:** "On a magnetic disk a head moves over a spinning platter to reach a sector; that mechanical movement is the slow part of disk I/O. On the speed scale SSDs sit closer to memory than hard disks."
- **Ids:** L-0201, L-0203, L-0204 (L-0206 as a label).

### Fig 7·b: Append only, with a map to the latest entry (D-14 redraw)
- **Section:** first shown in 7.2 (state a), shown complete in 7.4 (state b). **Board:** D-14, frames `b_020815.jpg` (state a) and `b_021445.jpg` (state b).
- **State a (7.2, puts only):** left, mono `PUT K1 V1` / `PUT K2 V2` / `PUT K3 V3` / `PUT K1 V1′`. Right, a `RowFile` (100 × 260) with rows mono `K1 V1` (a dot at its start, the board's start mark) · `K2 V2` · `K3 V3` · `K1 V1′`, then a dotted next-free-slot line; an `AppendArrow` ↓ above the tail. Beside the file, hand, as on the board: `append only` / `zero seek` / `no big mechanical movement` / `best we can do!!` (the board's green → graphite; the page doesn't colour a slogan) (L-0210, L-0211, L-0213).
- **State b (7.4, + delete + map):** adds the row mono `K2 −1` and the line mono `DEL K2 = PUT(K2, −1)` (L-0217). Left of the file, a `Cache` mono `in-mem` with two rows mono `K1 → O4`, `K3 → O3`; pointer arrows from each row to its file row (`K1 V1′`, `K3 V3`). Hand under the map: `no K2: deleted` (L-0223). Offsets `O1`…`O5` as small mono labels at the file's left edge.
- **Colours:** graphite (the clip `l10-append-only-log` carries the motion and the blue get).
- **Phone layout:** no (file + map + list ≤ 7 glyphs); the PUT list moves above the file at 340 units.
- **desc:** "Every put, update and delete is appended to the end of one file; delete is a put with the value −1. An in-memory map points each key at the offset of its latest entry: K1 at O4, K3 at O3, and K2 removed."
- **Ids:** L-0210 (state a), L-0211, L-0213, L-0217, L-0221, L-0222 (L-0223 as a label).

### RuleBox sketch §7: append, no matter what (new)
- **Sits in:** 7.3. **Sketch:** a `FileBar` with an `AppendArrow` ↓ into its tail (green tick) and a second arrow into its middle struck with a red `Cross`. Hand: `read anywhere · write only at the end`.
- **Ids:** L-0213, L-0216.

### Fig 7·c: Crash and rebuild (new StepThrough)
- **Section:** 7.4. **Board:** none (L-0225; the file is Fig 7·b's).
- **Layout:** the `RowFile` from Fig 7·b state b (same seed) on the right, five rows `K1 V1`, `K2 V2`, `K3 V3`, `K1 V1′`, `K2 −1` with offsets `O1`–`O5`; the `Cache` `in-mem` on the left; a blue scan caret beside the file.
- **Steps:**
  1. Map full: `K1 → O4`, `K3 → O3`. *"The store is serving: the map points at the latest entries."* (L-0221)
  2. Red `Cross` over the map, hand `power lost`; map rows vanish (38% ghosts). *"The machine dies. The map lived in memory, so it is gone; the file is safe on disk."* (L-0225)
  3. Scan caret at `O1`, `O2`, `O3` (blue); map gains `K1 → O1`, `K2 → O2`, `K3 → O3`. *"On restart, read the file from the top and rebuild the map."* (L-0225)
  4. Caret at `O4`: `K1 → O1` becomes `K1 → O4`; caret at `O5`: `K2` removed. *"Later entries win: K1 moves to O4, and K2's −1 removes it."* (L-0222, L-0223)
  5. Map `K1 → O4`, `K3 → O3` (green); hand `serving again · the full scan took a while` (L-0227). *"Back to the same map. The whole scan is why a restart is slow."* (L-0225, L-0227)
- **Colours:** blue scan; red cross; green final map.
- **Phone layout:** lanes fit (map above file at 340 units).
- **Ids:** L-0221, L-0222, L-0223, L-0225, L-0227.

---

## §8 Files that never stop growing

### Fig 8·a: File rotation (D-15 left half redraw)
- **Section:** 8.2, after PauseAndThink P8. **Board:** D-15, frame `b_022500.jpg`; D-18 frame `b_023315.jpg` for the `immutable` / `active` words.
- **Parts:** four files in a row with mono numbers above: `001` (a `RowFile` with D-14's five rows, same seed), `002` and `003` (`StripeFile`s with a wavy line, the board's "full" mark), `004` (`ActiveFile`, hand `active`, `writes go here`). A brace under `001`–`003`, hand `read only · still readable` (L-0237). Top right: a curved arrow from `004` to a small tilted new file, hand `file rotation` and mono `> threshold` (L-0238).
- **Map (left):** `Cache` `in-mem` with mono `K1 → f1, O4` and `K3 → f1, O3` (the board's `K3 → f2, O3` corrected to `f1`, factcheck_applied §6), pointer arrows into file `001` (L-0239).
- **Hand note under the map:** `keys must fit in RAM` (the board's `* amount of index fit in ram / * keys`) (L-0228 as a label).
- **Colours:** graphite (no request in the still).
- **Phone layout:** yes (> 7 glyphs). Files in a 2 × 2 grid (`001 002` / `003 004`), the map above, the rotation arrow from `004` down to a fifth small file.
- **desc:** "The store writes to one active file; when it crosses a size threshold a new file starts and the old ones become read-only. The map now stores the file and the offset for each key."
- **Ids:** L-0231, L-0237, L-0238, L-0239.

### Fig 8·b: Merge and compact (D-20 redraw, StepThrough)
- **Section:** 8.3. **Board:** D-20, frame `b_023515.jpg` (text: `all immutable files are merged & compacted`, `stale entries skipped`, `deleted entries skipped`, `offset changes hence update index atomically!`).
- **Layout:** top row: files `001`, `002` (read-only, rows visible: `001` = `K1 V1`, `K2 V2`, `K3 V3`, `K1 V1′`, `K2 −1`; `002` = `K4 V4`, `K1 V1″`) and `003` `ActiveFile` (writes keep arriving, a small ↓). Middle: a `Cache` mono `tmp table` (hand `separate from the index`). Bottom: an empty dashed `RowFile` mono `merged`. Left: the `in-mem` map.
- **Steps:**
  1. Stale rows (`K1 V1`, `K1 V1′` in `001`) drawn in 38% graphite with hand `stale`; delete pair (`K2 V2`, `K2 −1`) ringed red, hand `deleted`. *"The read-only files are full of dead entries: old values and deleted keys."* (L-0240)
  2. Rows stream into `tmp table`: `K1` replaced twice (V1 → V1′ → V1″), `K2` added then removed by `−1`, `K3`, `K4` kept. *"Read them into a temporary hash table: a newer entry replaces a key, a delete removes it."* (L-0243, L-0296, L-0295)
  3. `tmp table` flushes into `merged` (green): `K3 V3`, `K4 V4`, `K1 V1″`. Meanwhile `003` keeps taking a write (one new row). *"Flush it as one new file with only live entries. The active file keeps taking writes."* (L-0241)
  4. The map rows repoint to `merged` (green arrows): `K1 → m, O3`, `K3 → m, O1`, `K4 → m, O2`; `001` and `002` struck and faded, hand `deleted`. *"Offsets changed, so update the map for every moved key, then delete the old files."* (L-0242, L-0241)
- **Fidelity:** `K4` and `V1″` are illustrative entries added so the merge has two files to combine; the caption says so. Not a sorted merge (contrast with Fig 5·c), as taught in L-0243. The board's "update index atomically!" stays as hand text in step 4.
- **Colours:** red ring on the deleted pair; green merged file and repointed arrows.
- **Phone layout:** the three rows (files, tmp table, merged) stack; `001` and `002` sit side by side at 160 units each with abbreviated rows.
- **Ids:** L-0240, L-0241, L-0242, L-0243, L-0295, L-0296.

### Fig 8·c: The sawtooth (D-15 right half + D-20 graph redraw)
- **Section:** 8.4. **Board:** D-15 graph, frame `b_022500.jpg`; D-20 graph, frame `b_023515.jpg`.
- **Parts:** a `UsagePlot` (480 × 220): y hand `disk used`, x hand `time`. A red `Ceiling` near the top, mono `1 TB`, hand `cap`. The usage line climbs in small steps (writes), drops sharply at three points (each drop marked by a small dashed graphite tick under the axis, hand `merge & compaction` once), and climbs again: a sawtooth, all peaks below the cap (L-0244, L-0245).
- **Right of the plot, the board's notes:** mono `1. MC freq` and `2. file rotation threshold`, hand `the two knobs` (L-0247).
- **Colours:** red cap; the usage line graphite.
- **Phone layout:** no (one plot + notes); notes move under the plot.
- **desc:** "Disk usage rises with writes and drops each time merge and compaction runs, drawing a sawtooth that must stay under the 1 TB disk. Two knobs shape it: merge frequency and the file rotation threshold."
- **Ids:** L-0244, L-0247 (L-0245 as the cap label).

### RuleBox sketch §8: keep the sawtooth under the cap (new)
- **Sits in:** 8.4. **Sketch:** a small sawtooth (four teeth) under a red horizontal line mono `cap`; two small dial glyphs (circles with a pointer) under it, mono `merge freq`, `rotation size`.
- **Ids:** L-0245.

---

## §9 Record format and integrity

### RuleBox sketch §9: know how many bytes to read (new)
- **Sits in:** 9.1. **Sketch:** a `RecordBar` `CRC | TS | KSZ | VSZ | K | V`; a bracket under `KSZ | VSZ` with hand `sizes first`, and a bracket under `K | V` with hand `read in one shot`; a small green tick over `CRC`.
- **Ids:** L-0254.

### Fig 9·a: Sizes before the bytes (D-16 bars 1–2 redraw)
- **Section:** 9.1. **Board:** D-16, frame `b_022945.jpg` (also `b_022645.jpg`).
- **Bar 1:** `RecordBar` with a blank leading cell, `K`, `V`; a blue caret moving right one cell at a time, hand `one byte at a time until \n?`, struck with a thin red line (L-0253).
- **Speech bubble (§9):** on bar 1: `just read me until \n`.
- **Bar 2:** `RecordBar` blank, `KSZ`, `VSZ`, `K`, `V`; a brace under `KSZ VSZ`, hand `key size & value size`; mono `4 B` under each (L-0255). Right, the board's text, hand: `we read KSZ (4 B) VSZ (4 B), then read KSZ bytes for key, VSZ bytes for value`.
- **Under bar 2:** two blue read brackets numbered ① (over `KSZ VSZ`, mono `8 B`) and ② (over `K V`, mono `KSZ + VSZ bytes`), hand `two reads` (L-0256).
- **Heading above (hand, as on the board):** `because key and value are variable length`.
- **Colours:** blue reads; red strike on bar 1.
- **Phone layout:** no (two bars + bubble); the board's text moves under bar 2.
- **desc:** "Reading a record until a newline costs one call per byte. Prefixing each record with its key size and value size lets a reader fetch it in two reads: the 8-byte sizes, then exactly the key and value."
- **Ids:** L-0251, L-0255, L-0256 (L-0253 as the struck label).

### Fig 9·b: The dictionary, re-recorded (new, small)
- **Section:** 9.1. **Board:** none (teaching-map gap item from L-0257).
- **Parts:** one `RecordBar` with cells mono `5` · `13` · `apple` · `a round fruit`, cell widths proportional to the bytes (4 · 4 · 5 · 13); braces under the first two cells, hand `word size · meaning size (4 B each)`. Above, a ghost (38%) of the CSV line mono `apple,a round fruit⏎` struck thin, hand `CSV: the easy start` (L-0257). A small hand arrow back: `same idea as the 16-byte header (§3)`.
- **Colours:** graphite.
- **Phone layout:** no.
- **desc:** "The dictionary's apple entry in the record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning."
- **Ids:** L-0257.

### Fig 9·c: A torn record (D-16 bars 3–4 redraw, StepThrough)
- **Section:** 9.2, after PauseAndThink P9. **Board:** D-16, frames `b_022945.jpg` (bar 3) and `b_023230.jpg` (bar 4).
- **Layout:** a file strip (horizontal, records left to right) on a timeline; one reader caret.
- **Steps:**
  1. `RecordBar` blank · `KSZ` · `VSZ` · `K` · `110…` with a jagged end (red); hand under it `machine crashed while writing value` (the board's words). *"The machine crashes while writing a big value. The record is cut short."* (L-0258)
  2. A new, whole record is appended right after it (graphite). *"After restart, new records are appended after the broken one."* (L-0259)
  3. A reader at the torn record reads `VSZ` bytes (blue bracket) that run past the jag into the next record; the overrun part is red, hand `reads into the next record`. *"Trusting VSZ, a reader runs into the next record and serves garbage."* (L-0259)
  4. Both records redrawn with `CRC | TS | KSZ | VSZ | K | V`; hand `CRC: first thing written`, `TS: for conflicts` (the board's `Timestamp for conflicts`). The torn record's `CRC` cell gets a red ✕, hand `doesn't match → "corrupt", skip`; the next record's `CRC` gets a green tick. *"With a CRC first, the reader computes the checksum, sees it fails, and skips the record instead of serving it."* (L-0260, L-0261, L-0264, L-0265, L-0266)
- **Fidelity:** SN-05 says CRC-first is a convention (Postgres and MySQL put it elsewhere); the step text says "with a CRC first", describing this design, not every format. "Skip" follows L-0266 (recovery by heuristics) and A-SSE-06.
- **Colours:** red torn bytes, overrun and failed CRC; blue read bracket; green on the good CRC.
- **Phone layout:** the strip wraps: one record per line, the reader bracket shown as a vertical brace across the line break.
- **Ids:** L-0258, L-0259, L-0260, L-0261, L-0264, L-0265, L-0266.

---

## §10 It's called Bitcask

### Fig 10·a: One map, many files (D-17 + D-18 + D-19 merged redraw)
- **Section:** 10.1. **Board:** D-17 frame `b_023303.jpg`, D-18 frame `b_023315.jpg`, D-19 frame `b_023330.jpg`.
- **Why merged:** the three are consecutive prepared slides of one structure (the map → the files it points into → the map entry's fields). Drawn separately they would repeat Fig 7·b and Fig 8·a; merged, the reader sees the finished Bitcask in one view, which is what 10.1 recaps.
- **Parts:** left, two map entries drawn as D-19: a `Box` mono `K1` → a `RecordBar`-style entry mono `file id | vsz | vpos | ts`, with hand labels `entry size` over `vsz` (the board's `entry length / more like entry size`), `offset` under `vpos`, `timestamp` under `ts`. Same for `K2`. Middle: three files (`StripeFile` `001`, `002`, `ActiveFile` `003`), a brace over the first two, hand `immutable · available for reads` (D-18). `K1`'s `vpos` arrow lands on a row in the middle of `002`; `K2`'s on a row of the active file (D-19).
- **Right column, the `GET(k)` strip (D-17):** hand `GET(k) → pointed queries`, then three numbered lines with blue numerals: ① `hash table lookup` ② `disk seek` ③ `disk read`.
- **Footer:** red hand `limitation: index (every key) must fit in memory` (L-0269).
- **Colours:** blue on the GET strip and on `K1`'s arrow (the request path); red limitation.
- **Phone layout:** yes (> 7 glyphs). Portrait: the two map entries on top, the three files in a row below them, the GET strip under the files, the limitation last.
- **desc:** "Bitcask's in-memory map holds, for every key, the file id, entry size, offset and timestamp of its latest record. A get is one map lookup, one disk seek and one read. Every key must fit in memory."
- **Ids:** L-0268, L-0269.

### Fig 10·b: Bitcask inside Riak (D-21 redraw, corrected per SN-08)
- **Section:** 10.2. **Board:** D-21, frame `b_023800.jpg`.
- **Parts:** an `Actor` `user` (left) → a `NodeRing` with three `Box`es mono `riak` straddling it (top, bottom-left, bottom-right). Each riak box holds a small `Box` mono `bitcask` (the board's hatched blocks). A hand label with an arrow to the top block: `bitcask` (the board's pink word → graphite).
- **Correction (SN-08, A-SSE-14):** the board's `proxy` box is not drawn as a separate master. The user's arrow (blue) goes to **any** riak node, hand `any node can route the request`; from that node, two thin graphite arcs along the ring to the other two nodes, hand `each key on N nodes`. No master, no replication arrows. Small hand under the ring: `no master: keys hashed onto a ring`.
- **Text (from the board, hand):** `what we just designed is` + a framed mono `bitcask`; `each node of Riak has an instance of Bitcask running`. The board's `used by uber in production as backend for Riak` is **not** lettered on the figure; the claim lives in the prose with SN-07.
- **Colours:** blue user request.
- **Phone layout:** no (5 glyphs); ring at 300 units, text below.
- **desc:** "Riak, a distributed key-value store, runs an instance of Bitcask under every node. A request can go to any node; keys are hashed onto a ring and each key is stored on N nodes, with no master."
- **Ids:** L-0278.

### RuleBox sketch §10: throughput + persistence → append-only (new)
- **Sits in:** 10.2. **Sketch:** a `FileBar` with an `AppendArrow` into its tail; beside it a small semicircular gauge with its needle near the top, mono `throughput`. Hand: `look for the append`.
- **Ids:** L-0280.

---

## §11 What to keep

### Fig 11·a: Two engines (new)
- **Section:** 11. **Board:** none (built from Fig 6·d and Fig 10·a).
- **Layout:** two panels side by side under hand titles `the dictionary (§1–§6)` and `the key-value store (§7–§10)`.
  - Left: three `api` boxes (as a `Fleet` `×3`) each with a tiny `Cache` (`w → o`); an orthogonal blue arrow to a `Cloud` `s3` holding a `FileBar` `H | I | D` and a `MetaFile` `meta.json`; a small `Box` `update job` below with a dashed arrow, hand `merge → new path → deploy`.
  - Right: one `Cache` (`K → file, O`) with pointer arrows into `StripeFile` `001`, `002` and `ActiveFile` `003`; a dashed loop under `001`–`002`, hand `merge & compaction`.
- **Shared-idea markers:** the same three tiny glyphs appear in both panels at the matching part, each with a mono row tag from T5: `map` (at both `Cache`s), `sizes` (at the `H` cell and at a `RecordBar` thumbnail under the right panel), `new file, never in place` (at the job's merge and at the active file). Hand note between the panels: `same ideas, twice`.
- **Colours:** blue read path in both panels; graphite otherwise.
- **Phone layout:** yes (2 panels, > 7 glyphs). Panels stack; each panel keeps ≤ 6 glyphs by drawing the fleet as one box `×3`.
- **desc:** "The two engines side by side: the dictionary as one indexed file on S3 read by servers with an in-memory map, and the key-value store as append-only files with an in-memory map. Both keep a small map in memory pointing into big files, read records by known sizes, and never write in place."
- **Ids:** none new (recap); restates L-0061, L-0221, L-0146, L-0213 as labels only.

---

## 12. Accounting

### Board diagrams → figures

| Board | Redrawn as | Note |
|---|---|---|
| D-01 | Fig 1·b (file + text/JSON), Fig 2·a (with the scan arrow) | the emphasis state is its own figure |
| D-02 | Fig 2·b (index → data), Fig 2·c (the arithmetic) | |
| D-03 | Fig 3·a | |
| D-04 | Fig 3·b | `AOBB` written `AODB` (audio) as "the instructor's own database name" |
| D-05 | Fig 4·b; its bottom-left list in Fig 4·a | |
| D-06 | Fig 5·a (lower half), Fig 6·b (top right), Fig 6·d (full) | the erased Pub/Sub pipe is drawn in Fig 6·c from D-10 instead |
| D-07 | Fig 5·b (StepThrough) | |
| D-08 | Fig 5·c; clip `l10-sorted-merge` | |
| D-09 | Fig 6·a (StepThrough); clip `l10-garbage-vs-rolling` lane 1 | |
| D-10 | Fig 6·c | item 3 (no content on screen) not drawn |
| D-11 | inset of Fig 6·b | rejected option, drawn small with a red cross |
| D-12 | Fig 6·e | |
| D-13 | Fig 7·a | |
| D-14 | Fig 7·b (two states); clip `l10-append-only-log` | |
| D-15 | Fig 8·a (left half), Fig 8·c (graph); clip `l10-sawtooth` | `K3 → f2` corrected to `f1` |
| D-16 | Fig 9·a (bars 1–2), Fig 9·c (bars 3–4) | |
| D-17 | Fig 10·a (merged) | three prepared slides of one structure |
| D-18 | Fig 10·a (merged); its words also on Fig 8·a | |
| D-19 | Fig 10·a (merged) | |
| D-20 | Fig 8·b (text + StepThrough), Fig 8·c (graph) | |
| D-21 | Fig 10·b | drawn masterless per SN-08 |

### Phone layouts (20)

- **14 static figures with a separate portrait drawing:** Fig 1·a, 1·c, 2·c, 3·a, 3·d, 4·a, 4·b, 5·c, 6·b, 6·c, 6·d, 8·a, 10·a, 11·a.
- **6 step-throughs with a reflowed phone version:** Fig 3·c, 5·b, 6·a, 7·c, 8·b, 9·c.
- **No separate layout needed:** Fig 4·c (its lanes fit at 340 units; only the mono ranges wrap), Fig 7·a (two small panels that simply stack), and the remaining figures of ≤ 7 glyphs and ≤ 2 panels. Each is still checked at 360 px for labels ≥ 12 px.

### Outline names → this file

Every figure the outline names is specified: 1·a, 1·b, 1·c, 2·a, 2·b, 2·c, 3·a, 3·b, 3·c, 3·d, 4·a, 4·b, 4·c, 5·a, 5·b, 5·c, 6·a, 6·b, 6·c, 6·d, 6·e, 7·a, 7·b, 7·c, 8·a, 8·b, 8·c, 9·a, 9·b, 9·c, 10·a, 10·b, 11·a; RuleBox sketches §1–§10; the NotationKey glyphs.
