# Lecture 10: animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per top-level section, and never two clips without prose between them. This lecture has **five**, in five different chapters (§2, §5, §6, §7, §8), each with prose and at least one figure between it and the next. Each clip below is a shortlist entry plus beats. The full `storyboard.yaml` / `storyboard.md` are written at build time.

**Canvas** 1200×800 at 30 fps. **Phone:** each clip also has a portrait composition, 720×1080, built from the same beats and timings (`layout="phone"` prop), described per clip. On a 358 px wide phone that canvas is scaled ×0.5, so on-canvas labels are ≥ 26 units (≥ 13 px on screen) and the caption band uses 34 units. **Marker colours:** blue = request / read path, red = failure, garbage, hard limit, green = ack / success / valid new file. Graphite otherwise. Past states ghost at 38%. **Captions:** burned in, one per beat, appear as the event starts, ≥ 2.5 s, ≤ 2 lines, ≤ 17 characters per second of display (each beat below gives its length and rate). Frame 0 is the static twin on the page; the last frame is the poster used in the page's clip placeholder.

## Shortlist

| id / candidate | section | dynamic | verdict | why |
|---|---|---|---|---|
| `l10-scan-vs-index` | §2.2 | accumulation / rate (bytes read per request, again for every request) | **animate** | The lesson is the cost that piles up while a scan grinds through half a terabyte, and again for the next request, against one short sweep and one pointed read. Two stills show where each read ends, not how much each one touched on the way. |
| `l10-sorted-merge` | §5.3 | ordering / position over time (two pointers that only move forward) | **animate** | "One pass, never backwards" is a property of the pointers' motion. The static Fig 5·c shows the result; the clip shows that each pointer moves exactly once per entry, which is why the merge is linear and needs no memory. |
| `l10-garbage-vs-rolling` | §6.4 | a window in time (stale offsets until reload) vs a gradual, safe roll | **animate** | The danger is a *window*: between the same-path swap and each server's reload, every read is garbage. The rolling deployment's answer is also temporal: mixed old and new answers for a while, never garbage. Only a timeline shows both. |
| `l10-append-only-log` | §7.4 | ordering (append first, then repoint the key) | **animate** | The map's pointers move as the file grows: K1 jumps from O1 to O4, K2 leaves. The order of "append, then point" and the write position that only ever moves forward are what make put, update and delete O(1). Fig 7·b shows only the final state. |
| `l10-sawtooth` | §8.4 | accumulation + periodic drop; a rate knob changes the shape | **animate** | The sawtooth *is* a time series, and the lesson is how a rate (merge frequency) changes its peaks relative to a hard cap. A still graph can't show "merge less often and the peak climbs into the cap". |
| torn record and CRC | §9.2 | discrete states | **step-through** Fig 9·c | Four states the reader studies at their own pace (torn, appended after, overrun, CRC fails). No rate or window. §9 has no clip. |
| crash and rebuild the map | §7.4 | discrete states | **step-through** Fig 7·c | The scan-and-rebuild is best read step by step; §7 already has its clip. |
| merge and compaction (hash-table merge) | §8.3 | discrete states | **step-through** Fig 8·b | A sequence to study; §8's clip is the sawtooth, which shows what the merge does to disk usage over time. |
| overwrite spills into ball | §5.2 | discrete states | **step-through** Fig 5·b | A byte-level before/after; the reader needs to count bytes, not watch them move. |
| boot reads (header → index → map) | §3.2, §4.3 | procedure | **step-through** Figs 3·c, 4·c | A procedure, not a dynamic. |
| polling vs Pub/Sub | §6.3 | repeated protocol over time | **static** Fig 6·c | A real dynamic, but §6 has its one clip, and the polling window is inside `l10-garbage-vs-rolling`'s top lane. Fig 6·c draws the window as a red span. |
| file rotation | §8.2 | accumulation (a file fills, a new one starts) | **static** Fig 8·a | Rotation is a simple threshold rule; the sawtooth clip carries §8's time dimension. |
| head seek vs append on a platter | §7.1–7.2 | mechanism | **static** Fig 7·a | A spinning-platter animation would be decorative motion; the claim (append needs no seek) is a statement about where the head *is*, which the clip `l10-append-only-log` shows with its write caret. |
| the header and file formats | §3 | taxonomy | **static** Figs 3·a, 3·b, 3·d | No change over time. |
| multi-tiered storage | §6.5 | architecture | **static** Fig 6·e | |
| Bitcask inside Riak | §10.2 | architecture | **static** Fig 10·b | |

---

## 1. `l10-scan-vs-index`: half a terabyte, or one line (§2.2, 26 s)

- **Mechanism:** two lanes, run one after the other. Top: the naive lookup scans `data.dict` line by line until it reaches `ball`, a word about halfway down; a bytes-read counter climbs to about 500 GB; then a second request arrives and the scan starts again from the top. Bottom: the lookup scans the narrow `index.dict` (words and offsets only) to `ball`, then makes one pointed read at ball's byte offset in `data.dict`.
- **Why motion beats a still:** the lesson is accumulation: how much is read *per request*, and that every request pays it again. A still can mark where each read ends; it can't make the reader feel half a terabyte go by against one short sweep.
- **Static twin:** Fig 2·a (the scan) and Fig 2·b (the index); board D-01 (`b_002215.jpg`), D-02 (`b_003545.jpg`).
- **Ledger taught:** L-0042, L-0043, L-0044, L-0047, L-0048, L-0050, L-0051, L-0063. **Context only:** L-0049 (offsets are bytes), L-0045 (disk wear, in prose with its clarification).
- **Fidelity notes:**
  - The file is unsorted at this point (L-0022), so ball's position is illustrative ("about halfway down"); that is what makes the scan the *average* case of L-0044.
  - The bottom lane shows the index as a **file** scanned line by line (L-0050), as the class had it in 2.2. The in-memory map arrives in 2.3, after the clip; the clip does not show it.
  - The index's size (1.75 MB) is not shown: it is computed in 2.3 (L-0058) and SN-02 revises it. The index counter says only `keys + offsets`. No "4-byte" appears (SN-02).
  - The counter is bytes, not seconds: no latency number is claimed.
- **On-screen words and their source:** `data.dict`, `index.dict`, `1 TB` (L-0012, board D-01/D-02); `ball` (illustrative word from the changelog example, L-0010 board D-06); `read line by line` (L-0042); `≈ 500 GB read` and `worst: 1 TB` (L-0044); `every request, again` (L-0043); `keys + offsets only` (L-0051); `byte offset` (L-0049); `one line` (L-0050, L-0063).
- **Beats:**
  - B0 (0–3 s) hold: `data.dict` (tall `RowFile`, `1 TB`) on the right, `index.dict` (narrow) on the left at 38%, an empty counter. *"Find ball, halfway down a 1 TB file. Two ways."* (46 ch, 15.3 ch/s)
  - B1 (3–10 s) top lane: a blue cursor moves down `data.dict` row by row, accelerating after the first rows; the counter runs `0 → ≈ 500 GB`; ball's row turns green when reached. A ghost tick marks `worst: 1 TB` at the bottom. *"Scan: read line by line until ball. About 500 GB later, there it is."* (68 ch, 9.7 ch/s)
  - B2 (10–14 s) a second request dot arrives; the first counter ghosts to 38% and a new one starts from 0 as the cursor goes back to the top. *"And the next request reads it all again."* (40 ch, 10.0 ch/s)
  - B3 (14–19 s) bottom lane: `index.dict` returns to full ink; a blue cursor sweeps its short rows (`apple, 0` · `amazon, 14` · … · `ball, …`) and stops at ball. Counter label `keys + offsets only`. *"Index: scan only words and offsets, a much smaller file."* (56 ch, 11.2 ch/s)
  - B4 (19–23 s) one blue arrow from `ball, …` to ball's row in `data.dict`, landing on an `OffsetCaret`; the row turns green; the counter reads `+ one line`. *"Then jump to ball's byte offset and read one line."* (50 ch, 12.5 ch/s)
  - B5 (23–26 s, hold ≥ 2.5 s) poster: both lanes, the scan's ghosted path and the index's single arrow, counters side by side `≈ 500 GB per request` · `small index + one line`. *"Same answer. One read is pointed, not a scan."* (45 ch, 15.0 ch/s)
- **Chips:** 0:00 two ways · 0:03 scan · 0:10 again · 0:14 index · 0:19 pointed read.
- **Phone layout (720×1080):** the two files stack: `index.dict` above (rotated to a wide strip of rows), `data.dict` below as a tall strip cropped with a dotted break in the middle (`… 1 TB …`); the counter sits at the top right; the B4 arrow runs straight down from the index row to the data row.
- **Predict line (before the clip):** "Both lookups find ball, a word halfway down the file. How much does each one read?"
- **After:** "The index is still scanned line by line, but it holds only words and offsets. Is it small enough to keep in memory? (2.3)"

## 2. `l10-sorted-merge`: two pointers, one pass (§5.3, 29 s)

- **Mechanism:** the board's D-08 columns. A pointer in the sorted dictionary (`a – a′` … `h – h′`, seven words) and one in the sorted changelog (`c – c″`, `e – e′`, `f – f″`). At each step the smaller word is copied to the new file and its pointer moves; on a match the changelog's meaning is written and both pointers move. When the changelog runs out, the rest of the dictionary follows. Nothing is held in memory but the two current lines.
- **Why motion beats a still:** the point is the pointers' motion: each moves forward once per entry and never back, which is why one pass suffices (L-0310) and why the file never has to fit in memory (L-0145). Fig 5·c shows the result; only motion shows the walk.
- **Static twin:** Fig 5·c; board D-08 (`b_011745.jpg`).
- **Ledger taught:** L-0140, L-0142, L-0143, L-0144, L-0145, L-0310. **Context only:** L-0139 (sortedness needed), L-0141 (sort the small changelog first), L-0147 (2 TB on the job server).
- **Fidelity notes:**
  - Letters and primes are the board's (`a′`, `c″`); the dictionary has **seven** entries (no `e`), the changelog three, the output eight. `e – e′` is a new word, inserted by the merge.
  - "One pass" is shown; the poster writes mono `one pass · O(n)` (L-0310). The class's comparison with O(n²) is not shown: factcheck_applied §3 notes that an unsorted file with a hashed changelog is also linear, so the clip doesn't claim the alternative's cost.
  - Lines stream in and out one at a time (a small "in memory: 2 lines" tag); the 1 TB file is never drawn as loaded (L-0145).
- **On-screen words and their source:** `dictionary`, `changelog`, `new dictionary` (board D-08 `Dictionary`, `Changelog`, `New dic`); the entries (L-0144, board); `smaller word goes out` and `match: changelog wins, both move` (L-0143); `in memory: 2 lines` (L-0145); `one pass · O(n)` and `sorted → next week's input` (L-0310); `//` (board end mark).
- **Beats:**
  - B0 (0–3.5 s) hold: three columns, pointers at `a – a′` and `c – c″`, the new file empty. *"Sorted dictionary, sorted changelog, an empty new file."* (55 ch, 15.7 ch/s)
  - B1 (3.5–8 s) `a < c`: `a – a′` slides into the new file (graphite); the dictionary pointer moves. `b < c`: same. *"Compare the two words: the smaller one is written, and its pointer moves."* (73 ch, 16.2 ch/s)
  - B2 (8–12.5 s) `c = c`: `c – c″` slides out of the changelog (green tick); `c – c′` ghosts to 38%; both pointers move. *"Same word: the changelog's meaning wins, and both pointers move."* (64 ch, 14.2 ch/s)
  - B3 (12.5–18 s) `d < e`: `d – d′` written. `e < f`: `e – e′` written from the changelog (green), between `d` and `f`. *"d goes out, then e′: a new word slots into its sorted place."* (60 ch, 10.9 ch/s)
  - B4 (18–24 s) `f = f`: `f – f″` written (green), both move; the changelog pointer reaches its empty slot, hand `done`; `g – g′`, `h – h′` follow; mono `//`. *"f″ wins; the changelog is used up, and the rest follows as it is."* (65 ch, 10.8 ch/s)
  - B5 (24–29 s, hold) poster: the full new column with three green ticks; tallies `dictionary pointer: 7 moves · changelog: 3 · new file: 8 lines`; a dashed arrow from the new file to a ghost label `next week's input`; mono `one pass · O(n)`. *"One pass, never backwards. The output is sorted: next week's input."* (67 ch, 13.4 ch/s)
- **Chips:** 0:00 setup · 0:03 smaller wins · 0:08 match · 0:12 new word · 0:18 drain · 0:24 one pass.
- **Phone layout (720×1080):** the three columns stay side by side at 220 units each (entries are 5 characters, so they fit at ≥ 30 units); headers abbreviate to `① dictionary`, `② changelog`, `new`; tallies and the `next week's input` arrow move under the columns.
- **Predict line:** "The dictionary has seven words and the changelog three. How many times does each pointer move, and does either ever go back?"
- **After:** "Each pointer moved once per entry, so the whole update is one pass over both files, and the output is sorted for next week."

## 3. `l10-garbage-vs-rolling`: same path vs a new path and a rolling deployment (§6.4, 33 s)

- **Mechanism:** two lanes, one above the other, each with an S3 cloud, three API servers (each with an index tag `v1` / `v2`) and a user whose `GET apple` requests arrive over time; results appear as small chips on a shared time axis. **Top:** the new file is uploaded to the same path and replaces the old one whole; the servers still hold v1 offsets, so every read returns bytes from another word (red) until each server reloads, one at a time; a red span on the axis marks the window. **Bottom:** the new file goes to a new path, `meta.json` is updated, and a rolling deployment replaces the servers one at a time; each new server reads `meta.json` on boot and builds its index from the new file. During the roll, old servers answer `a fruit` (graphite), new ones `a round fruit` (green). No red.
- **Why motion beats a still:** both outcomes are about time. The top lane's harm is a window that opens at the swap and closes only at the last reload; the bottom lane's inconsistency is a gradual handover that is never wrong. Two stills would show two end states that look alike (all servers on the new file).
- **Static twin:** StepThrough Fig 6·a (same path) and Fig 6·d (the update end to end); board D-09 (`b_012615.jpg`), D-06 (`b_014315.jpg`), D-10 panel 1 (`b_012642.jpg`).
- **Ledger taught:** L-0157, L-0158, L-0159, L-0161, L-0177, L-0178, L-0183, L-0184, L-0196. **Context only:** L-0153 (S3 overwrite atomic, clarification), L-0160 (periodic refresh), L-0166 (meta.json pointer), L-0129 (the new meaning).
- **Fidelity notes:**
  - **S3 overwrites are atomic** (L-0153 clarification, A-D-05): the top lane swaps the whole file at once; no half-uploaded file is drawn. The garbage comes only from stale offsets (L-0158), which is the danger the lecture names.
  - Reload times in the top lane are staggered and unnumbered (each server's next poll or reload, L-0160). No poll interval is shown.
  - The rolling deployment replaces one server at a time with the LB in place, as taught (L-0183). Whether the platform launches the new server before terminating the old (A-D-14) is in prose, not drawn.
  - Old servers' answers (`a fruit`) are graphite, not red: they are consistent with the file they read (L-0184). "Eventually consistent" is the caption's word from L-0184.
  - The garbage chip shows a few mono characters with a red strike, not a real string, plus the words `bytes from another word` (L-0158).
- **On-screen words and their source:** `same path` (L-0152, L-0157); `new path` (L-0161); `dict1.dict`, `dict2.dict`, `meta.json` (board D-06, L-0161, L-0166); `v1`, `v2` index tags (illustrative labels for "last week's" / "this week's" offsets, L-0158); `GET apple`, `a fruit`, `a round fruit` (L-0129, L-0158); `garbage` and `bytes from another word` (L-0158, L-0159); `reload` (L-0157, L-0159); `deploy` (board D-06 `Deploy`, L-0183); `reads meta.json on boot` (L-0177); `never garbage`, `eventually consistent` (L-0184); `merge → upload → meta.json → deploy` (L-0196).
- **Beats:**
  - B0 (0–3.5 s) hold: both lanes with `dict1.dict` and three `v1` servers; the new file waiting at the left. *"Same new file, two ways to switch. Watch the answers."* (53 ch, 15.1 ch/s)
  - B1 (3.5–12 s) top lane: `dict2` replaces `dict1` at the same path in one move; requests for apple arrive at the three `v1` servers and come back red, `garbage · bytes from another word`; a red span grows on the axis from the swap. *"Same path: the file changes, but the servers keep last week's offsets. Garbage."* (79 ch, 9.3 ch/s)
  - B2 (12–17 s) the servers reload one at a time (`v1 → v2`); each one's answers turn green `a round fruit`; the red span ends at the last reload, hand `until every server reloads`. *"Garbage until each server reloads its index."* (44 ch, 8.8 ch/s)
  - B3 (17–22 s) bottom lane: dashed upload of `dict2.dict` beside `dict1.dict` (new path); `meta.json` changes to `dict2`; a dashed `deploy` arrow from the job to the server row. *"Bottom: upload to a new path, point meta.json at it, then deploy."* (65 ch, 13.0 ch/s)
  - B4 (22–29 s) the roll: one server at a time is replaced by a new one that reads `meta.json` and the new index (`v2`). Requests meanwhile get `a fruit` from old servers (graphite) and `a round fruit` from new ones (green). No red span. *"During the roll, some answers are old and some new. None is garbage."* (68 ch, 9.7 ch/s)
  - B5 (29–33 s, hold) poster: the two time axes, top with its red window, bottom with a graphite/green handover; hand `inconsistent for a while · never garbage · eventually consistent`; footer mono `merge → upload → meta.json → deploy`. *"Inconsistent for a while, never garbage."* (40 ch, 10.0 ch/s)
- **Chips:** 0:00 two switches · 0:03 same path · 0:12 reloads · 0:17 new path · 0:22 the roll.
- **Phone layout (720×1080):** lanes stack (top lane in the upper half, bottom in the lower), each lane portrait: cloud on top, the three servers as a row of three small boxes (160 units each), the user's chips along a vertical time axis at the right edge. Captions in the band at the bottom.
- **Predict line:** "Same new file, two ways to switch. In which one does a user ever get bytes from the middle of another word?"
- **After:** "Each server's index always matches the file it reads, so the roll is safe. The order: merge, upload to a new path, update meta.json, then deploy."

## 4. `l10-append-only-log`: one file, one map (§7.4, 30 s)

- **Mechanism:** the board's D-14. A list of operations on the left (`PUT K1 V1`, `PUT K2 V2`, `PUT K3 V3`, `PUT K1 V1′`, `DEL K2`), an append-only file in the middle with a write caret at its tail and offsets `O1…O5` at its left edge, the in-memory map on the right. Each put is appended at the tail and *then* its key is pointed at the new offset. The update appends and repoints K1; the delete appends `K2 −1` and removes K2 from the map. Then two gets: K1 is one lookup and one read at O4; K2 has no entry, 404.
- **Why motion beats a still:** the lesson is an order of events and a position that only moves one way: append first, then repoint; the write caret never moves back; K1's pointer jumps from O1 to O4 while the old entry stays on disk. Fig 7·b shows only where things end up.
- **Static twin:** Fig 7·b (state b); board D-14 (`b_021445.jpg`).
- **Ledger taught:** L-0211, L-0213, L-0216, L-0217, L-0221, L-0222, L-0223, L-0224, L-0226. **Context only:** L-0210 (append and the disk head), L-0225 (crash rebuild, Fig 7·c).
- **Fidelity notes:**
  - The disk head is not animated. "Zero seek" holds only while the disk serves just this write stream (factcheck_applied §3 on L-0210), and gets do seek; the clip shows the write caret at the tail and claims only that writes go to the end (L-0216).
  - `−1` is the class's marker value (L-0215, L-0217); the clip writes `DEL K2 = PUT(K2, −1)` as on the board and does not claim how real Bitcask marks deletes.
  - `O(1)` on the poster is L-0226's claim for put, get and delete; the read still costs one disk read, which the get beat shows.
- **On-screen words and their source:** `PUT K1 V1` … `PUT K1 V1′`, `DEL K2 = PUT(K2, −1)` (board D-14, L-0211, L-0213, L-0217); `in-mem` (board); `K1 → O1` … `K1 → O4`, `K3 → O3` (L-0222, board); `O1`…`O5` (L-0222); `obsolete` (L-0213); `write here` / `append` (L-0209, L-0216); `GET K1`, `V1′`, `GET K2`, `404` (L-0224); `writes only at the end · reads anywhere` (L-0216); `O(1)` (L-0218, L-0226).
- **Beats:**
  - B0 (0–3.5 s) hold: the operations list, an empty file with the write caret at its top, an empty `in-mem` map. *"Four puts and a delete. One file, one map in memory."* (52 ch, 14.9 ch/s)
  - B1 (3.5–10 s) `PUT K1 V1`, `PUT K2 V2`, `PUT K3 V3`: each row appears at the caret (graphite), the caret moves down, and then the map gains `K1 → O1`, `K2 → O2`, `K3 → O3` (each pointer arrow drawn after its row). *"Each put is appended at the end, then the map points the key at it."* (67 ch, 10.3 ch/s)
  - B2 (10–15 s) `PUT K1 V1′`: `K1 V1′` appended at `O4`; K1's arrow lifts off `O1` and lands on `O4`; `K1 V1` ghosts to 38%, hand `obsolete`. *"An update is just another append. K1 now points at O4."* (54 ch, 10.8 ch/s)
  - B3 (15–21 s) `DEL K2`: `K2 −1` appended at `O5`; the map's K2 row strikes through and fades out; hand `no entry = no key`. *"Delete is a put with −1. K2 leaves the map."* (43 ch, 7.2 ch/s)
  - B4 (21–26 s) `GET K1` (blue): map lookup → `O4` → one blue read → green `V1′`. `GET K2` (blue): no map entry → red `404`, no read. *"Get: look up the map, read once at that offset. No entry: 404."* (62 ch, 12.4 ch/s)
  - B5 (26–30 s, hold) poster: the five-row file with ghosted `K1 V1` and `K2 V2`, the final map `K1 → O4`, `K3 → O3`; hand `writes only at the end · reads anywhere`; mono `put · update · delete · get: O(1)`. *"Writes only at the end, reads anywhere. Every operation is O(1)."* (64 ch, 16.0 ch/s)
- **Chips:** 0:00 setup · 0:03 puts · 0:10 update · 0:15 delete · 0:21 gets.
- **Phone layout (720×1080):** the operations list becomes a single line at the top showing only the current operation; the file sits on the left (rows 300 units wide), the map on the right (260 units); the pointer arrows stay horizontal.
- **Predict line:** "Four puts and a delete. Which offset does K1 point to at the end, and where is K2?"
- **After:** "If the machine dies, the map goes with it; the step-through below rebuilds it from the file."

## 5. `l10-sawtooth`: keep it under the cap (§8.4, 33 s)

- **Mechanism:** a disk-usage plot over time with a red `1 TB` cap. Usage climbs as writes arrive and drops each time merge and compaction runs: a sawtooth. Replayed with merges twice as often: low teeth, but a `CPU spent merging` strip under the axis fills up. Replayed with merges half as often: tall teeth, and a peak reaches the cap: disk full, the store crashes. Finally the two knobs are named, and the healthy sawtooth is kept.
- **Why motion beats a still:** the sawtooth is a time series, and the lesson is how a rate (merge frequency) changes its peaks against a hard limit. A still graph shows one shape; it can't show the same writes producing a crash when only the merge rate changes.
- **Static twin:** Fig 8·c; board D-15 graph (`b_022500.jpg`), D-20 graph (`b_023515.jpg`).
- **Ledger taught:** L-0244, L-0245, L-0246, L-0247, L-0248. **Context only:** L-0236, L-0238 (rotation threshold), L-0241 (merge and compaction).
- **Fidelity notes:**
  - The only number is the board's `1 TB` cap. Write rates, merge intervals and the drop depth are illustrative and unlabelled.
  - After each merge, usage drops to the live data, drawn as a flat floor; the clip doesn't claim how the floor moves over time.
  - The CPU strip is a qualitative bar labelled `CPU spent merging`, from L-0246 ("too much garbage collection, taking CPU away from actual work"); no percentages.
  - The rotation threshold is **named**, not animated: the class gave no rule for how it changes the shape (L-0247). Real Bitcask triggers merges by how much garbage exists (A-SSE-04); that is in the prose next to the clip, not on screen.
  - "Crashes" follows the outline's wording of L-0245 ("cross the cap and the system crashes").
- **On-screen words and their source:** `disk used`, `time` (axes); `1 TB` (board D-15, L-0245); `merge & compaction` (board D-15/D-20, L-0244); `too often`, `too rarely` (L-0246); `CPU spent merging` (L-0246); `work piles up` (L-0246); `disk full: crash` (L-0245); `1. MC freq`, `2. file rotation threshold` (board D-15, L-0247); `monitor the sawtooth` (L-0248).
- **Beats:**
  - B0 (0–3 s) hold: axes, the red `1 TB` cap, an empty `CPU spent merging` strip. *"Disk used over time, on a 1 TB disk."* (36 ch, 12.0 ch/s)
  - B1 (3–11 s) the pen draws usage climbing with writes; three times a dashed `merge & compaction` tick appears under the axis and the line drops; three teeth, all well below the cap. *"Writes fill the disk; each merge and compaction drops it back. A sawtooth."* (74 ch, 9.2 ch/s)
  - B2 (11–17 s) the first curve ghosts to 38%; replay with merges twice as often: six low teeth; the CPU strip fills to about two-thirds. *"Merge too often: low peaks, but the CPU is busy collecting garbage."* (67 ch, 11.2 ch/s)
  - B3 (17–24 s) ghost; replay with merges half as often: tall teeth; the second peak reaches the cap, the line and the cap turn red at the touch, hand `disk full: crash`. *"Merge too rarely: work piles up, a peak hits the cap, and the store crashes."* (76 ch, 10.9 ch/s)
  - B4 (24–29 s) the healthy curve returns to full ink; two dial glyphs appear beside the plot, mono `1. MC freq` and `2. file rotation threshold`. *"Two knobs set the shape: merge frequency and file rotation size."* (64 ch, 12.8 ch/s)
  - B5 (29–33 s, hold) poster: the three curves (healthy at full ink, the other two ghosted with their labels `too often` and `too rarely`), the red cap, both dials, hand `monitor the sawtooth`. *"Watch the sawtooth, tune both knobs, keep it under the cap."* (59 ch, 14.8 ch/s)
- **Chips:** 0:00 the cap · 0:03 sawtooth · 0:11 too often · 0:17 too rarely · 0:24 two knobs.
- **Phone layout (720×1080):** the plot fills the top two-thirds (660 × 560 units), the CPU strip under it, the two dials in a row below the strip.
- **Predict line:** "Halve the merge frequency. Does the peak go up or down, and what is the line it must never cross?"
- **After:** "Two knobs, one picture: monitor it, and expose both settings to whoever runs your store."

---

## Build notes (for the animator)

- Reuse `learn/animations-lab` primitives (`Sheet`, `Stage`, `Ink`, `Pen`, `Packet`, `Write`, `StepBadge`, `CaptionBand`). New glyphs (`FileBar`, `RowFile`, `RecordBar`, `MetaFile`, `UsagePlot`) follow `figures.md` §0 at the clip scale (bow 2.4, jitter 0.6).
- Frame 0 = the page's static twin (named per clip above); the last frame = the poster in the page's clip placeholder.
- Render load-light: `--concurrency=1`, stills first at every caption beat, a phone-width contact sheet, one mp4 at the end.
- Every caption and label above is listed against its ledger ids under "On-screen words". Illustrative items (ball's position, the `v1`/`v2` tags, the curve shapes, the garbage glyphs) are marked as such in each storyboard's `fidelity_notes`.
