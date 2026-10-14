# Storyboard: One average, two layouts (l02-column-scan)

**Lecture 04 (folder lec02), §3.2 One query, two layouts.** 34.3 s at 30 fps (68.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
The same `avg(price)` query costs a row store every column of every row, because a row's columns are stored together and the engine must pass over them to reach the next row; a column store opens only the `price` and `ts` files.

## Why this needs motion
Fig 3·a shows the two layouts and Fig 3·b the files; a still can mark which cells get read. The clip adds the rate: a read head sweeping every cell of R1, R2, R3, slowed down on R3 to show it has to reach the row boundary, then two short reads on the column side while three files stay untouched. Widening to 100 columns grows the row store's read and leaves the column store's at two files.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0056 | `SELECT avg(price) WHERE ts = '…'`; board: "a table with 100 columns" | The query sits on top from frame 0; `price` and `ts` are underlined blue in B1. B4 widens to 100 columns. |
| L-0057 | About 10,000 companies, so about 10,000 rows for the date; each row is read, price and ts picked | R1–R3 with `× 10,000`; B0 caption. |
| L-0053 | A row's five columns are stored together, so even two columns read the whole row | The head sweeps every cell of every strip (B1). |
| L-0058 | symbol, name, exchange are read for nothing; board: "discarding 98 of them" | Those cells hatch red; `reads 5, uses 2`; in B4 `reads 100, uses 2` and the board's "discarding 98 of them". |
| L-0059 | Unless it knows the row boundary, it can't pick the corresponding columns | Slow replay on R3 to its end, tick + "row boundary" (B2). |
| L-0062 | Only two files, price and timestamp, are read; no IO for the others | Column store: price and ts files read blue, "read"; the other three "no IO"; "2 files read" (B3), unchanged at 100 columns (B4). |

**Not claimed:** bytes or IO sizes, a speed-up figure (A-DC-11's "about 5%" stays in prose), real page layouts, fixed-width rows, inserts, compression, warehouses. The column files are the class's naive model and say "(naive)". Positions of price and ts among the 100 columns are illustrative; the 100-column strips are not to scale.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–100 | One query: avg(price) for one day, about 10,000 rows. | Nothing. The static figure. |
| B1 | 100–330 | Row store: every row is read whole, symbol, name and exchange too. | `price`, `ts` underlined in the query. The blue read head sweeps R1, R2, R3; price/ts cells fill blue, the other three hatch red. `reads 5, uses 2`. |
| B2 | 330–520 | It can't jump to the next price: it must find where the row ends. | Slow head on R3, cells re-inked as it passes; tick at R3's end, "row boundary". |
| B3 | 520–730 | Column store: open two files, price and ts. No IO for the other three. | Head reads the price file, then the ts file ("read"); "no IO" under the other three; "2 files read". |
| B4 | 730–920 | 100 columns: a row store reads 100 to use 2. A column store: 2 files. | 5-cell marks removed; header `price · 100 columns · ts`; the head sweeps all strips into 100 thin cells (2 blue, 98 red); `reads 100, uses 2`; "discarding 98 of them". |
| B5 | 920–1030 | Same data, same query: the layout decides how much is read. | Hold on the poster. |

Chapters (10 frames into their beat): row store 110 · row boundary 340 · column store 530 · 100 columns 740.

## Poster / reduced motion
- **Poster:** frame 1029. Row store as a 100-column comb, 2 blue and 98 red, `reads 100, uses 2`, "discarding 98 of them", the row-boundary tick; column store with price and ts read, three "no IO", "2 files read".
- **Reduced-motion stills:** 92, 322, 512, 722, 912, 1029.

## Phone layout (720×1040)
Query wraps under itself with `stock_ticks` on line 2; row store on top (R labels left of the strips, `× 10,000` and "row boundary" on one line under the strips, the counter below); column store below with the files in a 3 + 2 grid and "2 files read" in the empty third slot. Lettering 30 canvas px, captions 32.

## Page context
- **Predict line (before the clip):** "Five columns, 10,000 rows. How much does each layout read to answer one average?"
- **Clip caption:** "SELECT avg(price) on 10,000 rows: the row store reads every row whole and discards three columns; the column store opens two files. With 100 columns it is 100 against 2."
- **After:** "Same data, same query: the row store does five columns of IO per row to use two, the column store reads two files. That gap is what warehouses are built on (3.3)."

## Known limits
- The 100-cell comb is not to scale and price/ts sit at columns 2 and 100 (illustrative); at phone size the comb reads as a red field with two blue capped edges, which is the intended reading.
- The column store keeps its five files in B4 (the 100-column column store is not drawn); its "2 files read" stands, and the caption carries "A column store: 2 files".
- Column files sit side by side (Fig 3·b-like) rather than stacked as in Fig 3·a, so the five names fit.

## Review log
Status: reviewed (2026-10-13). See `review.md`.
