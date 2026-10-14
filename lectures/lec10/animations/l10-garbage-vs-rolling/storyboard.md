# Storyboard: l10-garbage-vs-rolling, "Same path vs a rolling deployment" (§6.4, 35.7 s)

## 1. The one idea
Uploading the new dictionary to the same path opens a window in which every answer is garbage (until each server reloads); uploading to a new path, pointing meta.json at it and rolling the servers gives a while of mixed old and new answers, never garbage.

## 2. Why motion
Both outcomes are about time. The top lane's harm is a window that opens at the swap and closes only at the last reload; the bottom lane's inconsistency is a gradual handover that is never wrong. Two stills of the end state look the same (every server on the new file). The clip draws each server's answers as a bar that grows with a playhead, on the same time scale in both lanes, so the red window and its absence are visible side by side on the poster. The static twins (Fig 6·a, a step-through of one read; Fig 6·d, the end-to-end architecture) show the mechanism; the clip shows the duration.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0157 | Same-path upload: problems include that the servers must be told to reload because offsets no longer match | top lane: same name `dict1`, content tag v1 → v2; server tags v1 turn red |
| L-0158 | The index says apple is at offset 100; after a same-path upload the read returns bytes of some other word: garbage | red bars with ✕ and `garbage` for `GET apple`; caption "last week's offsets now land in another word" |
| L-0159 | Tell the servers to reload; for that duration users see garbage | each red bar ends at that server's reload; red span `until each reloads` |
| L-0161 | Upload to a new path instead (dictionary1 → dictionary2) | bottom lane: `dict2 · v2` appears beside `dict1 · v1` |
| L-0196 | Order: merge, upload to a new path, update meta.json, then deploy | B3: upload → `meta.json: dict2` → dashed `deploy`, in that order (merge not drawn) |
| L-0178 | Reloading after meta.json changes is a deployment | the job's `deploy` arrow is the only signal the servers get |
| L-0183 | Rolling deployment takes down one server and spins up another; the new one reads the metadata file on boot | old boxes go and new boxes (tag v2) arrive one at a time |
| L-0177 | On boot a server reads meta.json, reads the dictionary, builds the index, serves | hand `boots: reads meta.json`; new boxes carry v2 |
| L-0184 | During the roll some requests get old data, some new; no garbage; eventually consistent | graphite `a fruit` and green `a round fruit` bars side by side, no red; `never garbage`; last caption |

Context only: L-0153 (S3 overwrite is atomic: the swap is one move), L-0160 (reloads at each server's next pull/reload: staggered, unnumbered), L-0166 (meta.json pointer), L-0129 (the meanings `a fruit` / `a round fruit`).

**Not claimed:** any poll interval, reload time or deployment time; real byte strings; that a failed upload damages the file (it doesn't on S3, A-D-05); new-before-old launch order (A-D-14, prose); the ETag guard (A-D-04); Pub/Sub or reload endpoints. v1/v2 are illustrative tags. Time is not to scale.

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | Same new file, two ways to switch. Watch the answers. | nothing (static figure) |
| B1 | 105–292 | Same path: last week's offsets now land in another word. Garbage. | v2 chip from job onto dict1's tag (v1 replaced); server tags turn red; playhead to 0.40, red bars ✕, `garbage` |
| B2 | 292–480 | Garbage until each server reloads its index. | playhead to the end; servers reload one at a time (tag v2, bar green ✓); red span stops; `until each reloads`; `a round fruit` |
| B3 | 480–684 | Bottom: upload to a new path, point meta.json at it, then deploy. | top lane ghosts; v2 chip to a new row `dict2 · v2`; `meta.json: dict2`; dashed `deploy` arrow |
| B4 | 684–966 | During the roll, some answers are old and some new. None is garbage. | playhead; graphite `a fruit` bars; servers replaced one at a time (v2, green ✓); `boots: reads meta.json`; `a round fruit`; `never garbage` |
| B5 | 966–1072 | Mixed for a while, never garbage: eventually consistent. | top lane back to full ink; poster hold 3.5 s |

Chapters (10 frames into each beat): 0:00 two switches · 0:04 same path · 0:10 reloads · 0:16 new path · 0:23 the roll · 0:32 side by side.

## 5. Poster and reduced-motion stills
Poster (frame 1071): both lanes at full ink. Top: three bars red ✕ (row 1 `garbage`) then green ✓ (`a round fruit`), the red span `until each reloads`, `time →`. Bottom: three bars graphite (`a fruit`) then green ✓, `boots: reads meta.json`, `never garbage`, the dashed deploy arrow, `meta.json: dict2`.
Reduced-motion stills: 100, 286, 474, 678, 960, 1071.

## 6. Page context
- **Predict (before the clip):** "Same new file, two ways to switch. In which one does a user ever get bytes from the middle of another word?"
- **After:** "Each server's index always matches the file it reads, so the roll is safe. The order: merge, upload to a new path, update meta.json, then deploy."

## Phone layout (720×1050)
Lanes stack. In each lane: title row; the s3 cloud (left) with its listing under it and the job box (right) on one row; the job's v2 chip sits at its left so the upload trail stays clear of the deploy line. The three api boxes stand in a column on the left with their answer bars to the right (518 units); `reload` and `GET apple` frame the top tracks from above, the window label and `time →` sit under them. The deploy arrow leaves the job's bottom-right corner, runs down the right margin, left above the api column and down onto the first api box. Lettering 30, captions 32, caption band from y 942.

## Known limits
- `time →` carries no "(not to scale)": there is no room beside the window label. The fidelity notes say the tracks are unnumbered and illustrative; the page prose carries no times either.
- Only row 1 of each lane carries words (`garbage`, `a fruit`, `a round fruit`); rows 2–3 repeat its pattern with ✕ / ✓ only.
- While a bottom server is being replaced, its bar keeps growing: the bar is "answers for that slot behind the LB" (L-0183), not per-request routing.
- On the phone the bottom lane has no `time →` (its under-row is full); the two lanes share one scale.
Review details: review.md.
