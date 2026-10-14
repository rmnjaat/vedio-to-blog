# Storyboard: One cycle (l05-deadlock)

**Lecture 03 (folder lec05), §1.5 Deadlocks.** 34.0 s at 30 fps (68 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Wide 1200×800, phone 720×1000 (portrait re-flow: T1 top, T2 bottom, row 1 left, row 2 right; stamp on its own top row; verdicts and fix note under T2; 30 px lettering, 32 px captions).

## The one idea
One transaction waiting for a locked row is harmless; when a second transaction waits in the opposite order, the waits form a cycle, the engine sees it and rolls one transaction back, and the other carries on. Lock rows in one order and the loop can't form.

## Why this needs motion
Fig 1·e shows the finished loop. The lesson is in the order: the first wait is only a wait (L-0096), the second wait in the opposite order closes the cycle, and detection happens at that moment. Only motion shows the cycle being born from the lock order, and the engine breaking it.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0025 | Deadlock is the unannounced side effect of pessimistic locking | Two ordinary locks (B1) lead, with no warning, to the stamp `deadlock detected` |
| L-0026 | T1 wants row 1 (held by T2); T2 wants row 2 (held by T1); nobody moves | Green padlocks: T1 in row 2, T2 in row 1; `wants` arrows T1 → row 1, T2 → row 2; both hourglasses |
| L-0096 | Waiting is not deadlock; deadlock needs someone waiting on what you hold | B2 holds on T1's single graphite wait with the caption "Waiting is not a deadlock." |
| L-0032 | A cyclic path = deadlock | The red pen traces T1 → row 1 → T2 → row 2 → T1; `cycle` in the middle |
| L-0031 | When a lock would make a transaction wait, the engine checks for a deadlock | The stamp appears as soon as the cycle closes (no delay claimed) |
| L-0033 (SN-04) | The engine kills the transaction that fired the closing query; softened: the engine rolls one back, engines choose differently | "rolls one back: here T2"; T2 inked red, `ERROR 1213` (A-C-02), `rolled back`, `retry` |
| L-0028 (+A-C-04) | Arrange lock acquisition so a deadlock can't occur | Poster note `lock rows in one order`, closing caption |

**Not claimed:** "kills itself" (prose quote only); which engine picks which victim (SN-04 after the clip); any detection delay (PostgreSQL's `deadlock_timeout` stays in prose, A-C-01); timings; that a deadlock ever persists.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–80 | Two transactions, two rows. | Nothing: T1, T2, row 1, row 2. |
| B1 | 80–200 | T1 locks row 2. T2 locks row 1. | Pen draws T1 — row 2 (graphite line, green padlock, `holds`), then T2 — row 1 (green padlock). |
| B2 | 200–380 | T1 now wants row 1. It waits. Waiting is not a deadlock. | Blue pen + packet T1 → row 1 (`wants`), fades to graphite; hourglass `waits` by T1. Hold 3 s. |
| B3 | 380–590 | T2 wants row 2. Now each waits for the other: a cycle. | Blue pen + packet T2 → row 2, graphite + hourglass; red pen traces the loop leg by leg; `cycle`. |
| B4 | 590–740 | The engine sees the cycle and rolls one back: here T2. | `deadlock detected`; T2 re-inked red; `ERROR 1213` / `rolled back`. |
| B5 | 740–890 | T2's lock on row 1 is released: T1 gets it and commits. T2 retries. | T2's edges + its half of the loop ghost (38 %), T1's red legs return to graphite, `cycle` ghosts (55 %); T2's padlock leaves row 1; green pen T1 → row 1, padlock back; `waits` → `commits ✓`; `retry` where T2's `waits` was. |
| B6 | 890–1020 | Lock rows in the same order and this loop can't form. | `lock rows in one order` written. Hold on poster. |

Chapters (10 f into their beats): two locks 90 · one wait 210 · cycle 390 · rollback 600.

## Poster / reduced motion
- **Poster:** frame 1019. T1 holds both rows (green padlocks, green `wants` arrow, `commits ✓`); T2 red with `ERROR 1213 / rolled back / retry`, its edges and the red loop ghosted; `deadlock detected` above; `lock rows in one order` below.
- **Reduced-motion stills:** 72, 192, 372, 582, 732, 882, 1019.

## Page context
- **Before (predict line):** "T1 holds row 2, T2 holds row 1, and each now asks for the other's. What does the database do?"
- **Page caption:** "One wait is harmless; the second wait in the opposite order closes the cycle. The engine rolls one transaction back (InnoDB picks the smaller one) and your code retries it. Lock rows in the same order and the loop can't form."
- **After:** SourceNote SN-04 (victim choice differs by engine).

## Known limits
- Each row has one padlock slot; who holds it is read from the line, so T1's new padlock in row 1 sits where T2's was.
- The `cycle` label ghosts to 55 % rather than 38 % so it stays legible on the blackboard sheet.
- `ERROR 1213` is InnoDB's code (A-C-02); the clip does not say why T2 was chosen (SN-04 follows on the page).
- T1's granted `wants` arrow stays green with its head in the poster (it now holds row 1); there is no separate holds line.
