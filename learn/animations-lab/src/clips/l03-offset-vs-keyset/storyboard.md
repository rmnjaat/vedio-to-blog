# Storyboard: Page 1, page 10, page 1,000 (l03-offset-vs-keyset)

**Lecture 06 (folder lec03), §8.2.** 38 s at 30 fps (76 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Wide 1200×800; phone 720×1064.

## The one idea
To serve page *k*, `LIMIT 10 OFFSET m` walks past every row before the page again, so its work grows with depth; ID-limit (`WHERE id > last LIMIT 10`) goes down the index to the last ID and reads ten rows, the same work at page 1 and page 1,000.

## Why this needs motion
The lesson is accumulation. Fig 8·a shows one deep page and Fig 8·b the resulting curve. Neither shows that the walk *starts again from row 1 on every page*. The clip plays pages 1, 10, 100 and 1,000 in turn. The offset pen moves at one constant speed, so its walk takes longer every page: 4 px at page 10, the whole strip (4 s) at page 1,000. The ID-limit seek takes the same 0.8 s each time.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0218 | Limit-offset is "pathetically slow" when you paginate deep | Page 1,000's walk crosses the whole strip; B5 re-inks it red, "grows with depth ✕" |
| L-0224 | The DB evaluates the query up to the requested point, skips those rows, returns the next n, recomputed on every query; cost grows with depth | Every offset row's walk starts at row 1; `OFFSET 0/90/990/9990`; "computed, thrown away" (Fig 8·a's label) |
| L-0228 | Fetch the first 10, note the last ID, then `id > last` limit 10, repeat | ID column labels `LIMIT 10`, `id > 90`, `id > 990`, `id > 9990` (header `WHERE id > last`) |
| L-0233 | B+ tree in key order: log n to reach that ID, then a sequential scan; no matter how deep, time does not increase | Three-node descent glyph re-inked blue into the ten rows, same every page; "log n + 10 rows", "same at any depth ✓" |
| L-0227, L-0229 (context) | IDs must be comparable; fast because of key order (SN-15: the index seek) | B6 caption only: "It needs IDs you can compare, and an index on them." |

**Not claimed:** response times, units or benchmark numbers (the strip is to scale in rows, nothing is in ms); the depths and page size 10 are illustrative; IDs are drawn gap-free (1, 2, 3 …) so page *k*'s last ID is 10*k*; the ring around the ten rows is a highlight, not to scale; no `ORDER BY` on screen (A-PEM-01 is in the page's CodeBlock); nothing about filters (SN-16, prose 8.5) or jumping to page N; no claim that the table is physically sorted (SN-15). The word "keyset" never appears on screen; the lecture's names are "limit-offset" and "ID-limit".

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–100 | Two ways to ask for the next ten rows, page after page. | Nothing. Table: page 1/10/100/1,000; limit-offset strips empty; ID-limit descent glyphs graphite. |
| B1 | 100–230 | Page 1: both read the first ten rows. Same work. | `OFFSET 0`, blue ring at the strip start. ID: blue descent, ring, `LIMIT 10`. |
| B2 | 230–420 | Page 10: offset walks past 90 rows first. ID-limit seeks id > 90. | Row 1 ghosts. `OFFSET 90`, 4 px walk, ring. ID descent, ring, `id > 90`. "log n + 10 rows" under the ID column. |
| B3 | 420–580 | Page 100: offset walks past 990. ID-limit makes the same short seek. | Row 2 ghosts. `OFFSET 990`, 45 px walk, ring. ID descent, ring, `id > 990`. |
| B4 | 580–870 | Page 1,000: offset recomputes 9,990 rows only to skip them. | Row 3 ghosts. `OFFSET 9990`, the walk crosses the whole strip at the same constant speed (120 f), ring at the end; "computed, thrown away". ID descent, ring, `id > 9990`. |
| B5 | 870–1040 | Offset's cost grows with depth. ID-limit's stays the same. | All rows back to full ink. Page 1,000's walk re-inked red; "grows with depth ✕" (red); "same at any depth ✓" (green). |
| B6 | 1040–1140 | It needs IDs you can compare, and an index on them. | Hold on poster. |

Chapters (10 f into each beat): page 1 (110), page 10 (240), page 100 (430), page 1,000 (590), compare (880).

## Poster / reduced motion
- **Poster:** frame 1139. Both columns complete: the offset staircase (empty, 4 px, 45 px, full strip in red) with blue rings, the ID column's four identical descents and rings, the four notes with ✕ and ✓. Without the caption it reads as Fig 8·a + Fig 8·b in one table.
- **Reduced-motion stills:** 95, 225, 415, 575, 865, 1035, 1139.

## Page context
- **Before (predict line):** "Page 1 takes the same time either way. What happens by page 1,000?"
- **Page caption (`<AnimationClip caption>`):** "It needs IDs you can compare, and an index on them."
- **After:** "That needs an ID with an order. Every scheme with time on the left has one."

## Review log
See `review.md` (render-check rounds, fixes, known limits).
