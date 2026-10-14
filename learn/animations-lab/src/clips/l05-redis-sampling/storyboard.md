# Clip `l05-redis-sampling`: Twenty keys at a time

Lecture 03 (folder `lec05`), §4.2 "Sampling 20 keys". Spec: `storyboard.yaml` (same folder). Code:
`learn/animations-lab/src/clips/l05-redis-sampling/` (`timeline.ts`, `RedisSampling.tsx`, `field.ts`).

## 1. The one idea
Redis's periodic expiry job samples 20 keys, deletes the expired ones, and goes again only while a sample is more
than a quarter expired, so it stops early and leaves some expired keys for lazy deletion to catch on their next read.

## 2. Why motion
The stopping is the lesson. Fig 4·b shows one sample; the clip repeats it so the reader sees the share fall
(35% → 30% → 20%), the loop quit on purpose with expired keys still in memory, and a later read deleting one of them.

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0247 | sample exactly 20 random keys with an expiry; delete the expired ones in the sample | blue rings on 20 keys, the same 20 in the dashed tray; struck ones turn to green ticks |
| L-0249 | repeat if more than 25% of the sample was deleted; stop when fewer | log header `again if > 25%`; rows `7/20=35% again`, `6/20=30% again`, `4/20=20% stop` |
| L-0250 | the sample stands for the population | rings in the field mirror the tray; share label under the field |
| L-0251 | 3 of 20 expired: delete 3 and stop; ~15% left expired, and that's okay | round 3 (4/20 = 20%) is the same case; leftovers stay, labelled `≈ 23% still expired` |
| L-0301 | sampling touches only the sample, not the database; some expired keys remain | only ringed keys are touched; leftovers re-inked red in B3 |
| L-0243 | the regular job does not delete all expired keys | B3: the loop stops with red leftovers |
| L-0252 | speed over completeness: cleanup time is time not serving reads and writes | B3 caption |
| L-0244 | Redis merges lazy deletion and the periodic job | B4: a GET deletes a leftover on the spot |
| SN-12 / A-KSD-11 | since 6.0: keep going above ~10% stale, within a CPU time budget | caption "Classic rule. Redis 6.0+: …" (boxed note dropped, C-17) |

**Not claimed:** the central limit theorem or why 20 (L-0255), "up to 5 million keys" (L-0256), the 90% estimate
(L-0246), "no threads anywhere" (L-0253 → SN-13; the caption says "time not serving"), any memory share (L-0254),
any hard bound on leftovers (L-0301 softened), any timing. All counts are an example (caption B0).

## 4. Beats (30 fps, 1030 frames = 34.3 s)
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–120 | Example: keys with a TTL. About 30% expired but still in memory. | nothing (static figure) |
| B1 | 120–330 | Sample 20 keys. 7 expired: delete them. 35% > 25%, so go again. | blue rings on 20 scattered keys, held in place → tray fills → 7 ticks → header → row ① → `again` |
| B2 | 330–600 | Again, and again, until a sample comes back mostly live. | round 1 ghosts; round 2 (6/20, `again`); round 3 (4/20) |
| B3 | 600–750 | Stop. Some expired keys stay: time spent cleaning is time not serving. | `stop`; leftovers re-ink red; `≈ 23% still expired` |
| B4 | 750–880 | The next read of a leftover deletes it on the spot. | blue GET → leftover becomes a tick; `deleted on read` |
| B5 | 880–1030 | Classic rule. Redis 6.0+: again above ~10%, within a time budget. | muted two-line note "one example run: the picks are / random, so the counts vary" (no box; the 6.0 rule lives in the caption only, C-17) |

Chapters (10 f into their beat): round 1 @130 · again @340 · stop @610 · lazy read @760 · since 6.0 @890.

## 5. Poster and reduced-motion stills
Poster = frame 1029: the field with ghosted green ticks from three rounds, red leftovers, one fresh tick under GET,
round 3's 20 rings ghosted in place (the sample is visibly scattered, not a block), the log with all three rows and
verdicts, `≈ 23% still expired`, and the 6.0 note. Reduced-motion stills: 112, 322, 592, 742, 872, 1029.

Wide (1200×800, updated 2026-10-14 for critic C-05/C-08): the field is drawn at Fig 4·b's scale (pitch 38 ≈ 17 px on
the 540 px stage), tray and log in a right column, lettering 34 px and captions 36 px (~15–16 px on the page).

Phone (720×1010): same 200-key grid on top; tray (left) and round log (right) under it; the 6.0 note under them.

## 6. Page context
- **Predict line (before):** "A Redis with a million keys, 30% of them expired. How many rounds before the job stops, and what's left?"
- **Caption (`<AnimationClip>`):** "The classic rule: sample 20 keys with a TTL, delete the expired ones, go again while more than 25% were expired. Leftovers are deleted lazily on the next read. Example numbers. Since Redis 6.0: keep going above ~10%, within a time budget."
- **After:** the loop stopped while about a quarter of the keys were still expired; that is the trade Redis makes for speed, and lazy deletion cleans up whatever gets read.

## Known limits
See `review.md`.
