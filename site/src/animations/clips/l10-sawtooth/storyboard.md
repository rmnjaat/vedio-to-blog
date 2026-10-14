# Storyboard: l10-sawtooth, "Keep it under the cap" (Lecture 10, §8.4)

Status: reviewed (2026-10-14). Spec: `storyboard.yaml` (same folder). Code: `learn/animations-lab/src/clips/l10-sawtooth/`.

## 1. The one idea
Disk usage climbs with writes and drops at each merge and compaction, a sawtooth that must stay under the disk's
1 TB cap. The merge rate sets the peaks: merge too often and the CPU is busy merging, too rarely and a peak hits the
cap and the store crashes.

## 2. Why motion
The sawtooth is a time series, and the lesson is what one rate (the merge interval) does to it against a hard limit.
The clip replays **the same writes** three times on the same axes, changing only how often the merge runs. A still
(Fig 8·c) shows one healthy shape; it can't show the same write stream turning into a crash when the merge rate
alone is halved, or the CPU bar filling when it is doubled.

Static twin: Fig 8·c (D-15 right half, frame `b_022500.jpg`; D-20 graph, `b_023515.jpg`). Frame 0 is Fig 8·c's
empty plot: axes, the red `1 TB` cap, and an empty `CPU spent merging` bar.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0244 | Disk usage "go high, high, high. When merge and compaction kicks in, it would suddenly drop... You'll see this sawtooth pattern" | B1: the line climbs, drops at each dashed `merge & compaction` tick, climbs again: three teeth |
| L-0245 | "If your disk is let's say one terabyte big, you cannot let this grow beyond one terabyte"; "As soon as it crosses the cap... your system would crash"; the shape sets the merge frequency | the red `1 TB` cap throughout; B3: a peak touches the cap, red ✕, `disk full: crash`; B5 caption "keep it under the cap" |
| L-0246 | Dump too frequently: "too much of garbage collection... your CPU not getting CPU to do actual work"; less frequently: "lot of work gets accumulated" | B2: low teeth, the `CPU spent merging` bar fills to ~70%, label `too often`; B3: the same writes pile up into the cap, label `too rarely`, caption "work piles up" |
| L-0247 | "Two configurable parameters... merge and compaction frequency. And second is... file rotation threshold"; board: `1. MC freq 2. file rot thresh` | B4: two dial glyphs, mono `1. MC freq`, `2. file rotation` / `threshold` |
| L-0248 | Configure them by looking at the sawtooth, monitor, and "provide this as a configurable parameters to your folks" | B5: hand `monitor the sawtooth`; caption "Watch the sawtooth, tune both knobs" (exposing them is in the page's after-line) |

Context only (prose around the clip): L-0236 / L-0238 file rotation, L-0241 merge and compaction.

**Not claimed:**
- No write rate, interval, drop size or time unit; `1 TB` is the only number.
- No claim about the cost of one merge: the CPU bar only counts merges, one equal chunk each.
- No claim about how the live-data floor changes over time.
- How the rotation threshold changes the shape is not shown (the class gave no rule); real Bitcask's garbage-based
  merge triggers (A-SSE-04) stay in the prose.
- Not "only two knobs" (L-0247 is simplified per the fact-check): the caption says "This design has two knobs".

## 4. Beats (30 fps, 1080 frames = 36 s)
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | Disk used over time, on a 1 TB disk. (36 ch) | nothing: the static plot |
| B1 | 90–330 | Writes fill the disk; each merge and compaction drops it back. A sawtooth. (74 ch) | the healthy line is drawn at constant time speed (100–290); a dashed tick and one CPU chunk at each of 3 drops; `merge & compaction` written under the first tick |
| B2 | 330–584 | Merge too often: low peaks, but the CPU is busy collecting garbage. (67 ch) | healthy ghosts; same writes, merge every P/2: 7 low teeth (340–530), 7 ticks, bar to ~70%; `too often` written at its end |
| B3 | 584–790 | Merge too rarely: work piles up, a peak hits the cap, and the store crashes. (76 ch) | too-often ghosts; same writes, merge every 2P: one tall tooth climbs to the cap (594–695); the line turns red, ✕, `disk full: crash`, `too rarely` |
| B4 | 790–950 | This design has two knobs: merge frequency and file rotation size. (66 ch) | healthy returns to full ink, too-rarely ghosts; dial 1 + `1. MC freq`; dial 2 + `2. file rotation` / `threshold` |
| B5 | 950–1080 | Watch the sawtooth, tune both knobs, keep it under the cap. (59 ch) | `monitor the sawtooth` written; poster hold 3 s |

Every caption is up ≥ 3 s and at ≤ 12 characters per second. Chapter marks sit 10 frames into their beat:
0:00 the cap · 0:03 sawtooth · 0:11 too often · 0:20 too rarely · 0:27 two knobs.

## 5. Poster and reduced-motion stills
Poster (frame 1079): the healthy sawtooth at full ink with its ticks and its CPU fill (~30%); the too-often line
(ghosted, `too often`) with its ghosted ~70% fill behind; the too-rarely line ghosted red up to the ✕ on the cap with
`too rarely` and `disk full: crash`; both dials with their labels; `monitor the sawtooth`.
Reduced-motion stills: 80, 322, 576, 782, 942, 1079 (end of each beat).

## 6. Phone layout (720 × 1024)
The plot fills the top (axes x 110–650, y 88–500), labels at 30 units; the `merge & compaction` label and the CPU
bar sit under the axis; the two dials stack under the bar on the left with `monitor the sawtooth` in two lines to
their right; caption band from y 904 at 32 units.

## 7. Page context
- **Predict (before the clip):** "Halve the merge frequency. Does the peak go up or down, and what is the line it must never cross?"
- **Clip caption:** "Disk usage climbs with writes and drops at each merge and compaction: a sawtooth under the 1 TB cap. Merge too often and the CPU is busy merging; too rarely and a peak hits the cap and the store crashes."
- **After:** "Two knobs, one picture: monitor it, and expose both settings to whoever runs your store."

## Known limits
- In B1 the `merge & compaction` label is written while the pen keeps drawing the line (it names the drop that has
  just happened); every other label waits for its motion to end.
- The wide layout leaves the right column empty until B4 (it is reserved for the dials and `monitor the sawtooth`,
  which keeps every label off the plot's lines).
- The CPU bar shows two fills in B3–B5 (too often ghosted behind healthy); the bar has no number by design.
- The ghosted too-rarely line runs over the healthy line's first rise: the same writes give the same slope, which is
  the point, but at 38% the red reads as a tint on that first rise.
