# Clip l05-wait-vs-skip: 120 passengers, two queries

Lecture 03 (`lec05`), §2.5 Approach 5: SKIP LOCKED. Spec: `storyboard.yaml` (this folder). Code: `learn/animations-lab/src/clips/l05-wait-vs-skip/`.

## 1. The one idea
Both queries book all 120 seats correctly, but `FOR UPDATE` makes everyone queue at the same seat and re-check after every commit, while `SKIP LOCKED` walks past locked seats, so it finishes in about a tenth of the time.

## 2. Why motion
The two runs end on the same seat map (120/120). A still of the results says "no difference", and that is exactly what the lecture overturns. The difference is in time. A queue piles up at one seat, the whole queue re-checks after each commit, and the evaluation count snowballs. Under `SKIP LOCKED`, dots stream past locked seats and the seats lock back to back. The static twins cover the parts. StepThrough Fig 2·e shows the wait, signal and re-check mechanism with three transactions, at the reader's pace. Table T2 gives the numbers. Neither shows a queue forming, nor the time that piles up when it does.

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0112 | Approach 4 (`FOR UPDATE`): all 120 seats fill, every run | the top lane books every seat, and `…20F` ends green with a ✓ |
| L-0113 | Seats are booked in order. Each transaction takes an exclusive lock while the others wait | the crowd sits over one seat, one green holder with a padlock, the rest graphite with an hourglass and "119 wait" |
| L-0115 | On commit the engine signals the waiters to re-evaluate, one gets the next row, and so on | each commit: the crowd turns blue, "re-check" appears, the crowd slides one seat on, and one dot takes the lock (three rounds shown) |
| L-0155 | Worst case N(N+1)/2 evaluations inside the engine | the counter: 120, 239, 357, 474 … "up to 7,260 evaluations" (the page's arithmetic for N = 120) |
| L-0119 | Approach 5 = approach 4 + two words, `SKIP LOCKED` | the bottom title, with the end annotation "two words" under `SKIP LOCKED` |
| L-0122 | Still an exclusive lock, but a locked row is passed for the next matching row. Nobody waits, and rows are locked back to back | blue dots ride over the still-locked seats (green padlocks) to the next free one, with several seats locked at once |
| L-0154 | With `SKIP LOCKED` the query is evaluated about 120 times | the counter ends at "about 120 evaluations" |
| L-0121 | 1.7 s vs 147 ms, about a tenth, still 120 | time bars on one shared track: 400 px ("1.7 s") vs 35 px ("147 ms"), with "≈ 1/10 the time" |

**Not claimed:**
- that `SKIP LOCKED` is always 10× faster ("in this demo")
- per-seat timings
- which engine
- busy-waiting (waiters sleep until they are signalled; that point is in the prose, L-0163)
- which user gets which seat (L-0117, prose)
- that `SKIP LOCKED` re-evaluates (L-0306 says it doesn't; the bottom lane shows no re-check)

The worst-case counter is labelled "up to". The playback is labelled "slowed down".

**Departure from `animations.md`.** The plan raced the two lanes at once. I built them one after the other, as the class ran them, so that one thing moves at a time. Shared-scale time bars replace the running clocks, because a mid-run clock reading would be an invented number.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–96 | Two runs. In each, 120 passengers book a seat at once. | nothing (the static figure) |
| B1 | 96–240 | FOR UPDATE: everyone's first match is 1A. One gets the lock; 119 wait. | the crowd slides over 1A (blue), one dot takes the lock (green, padlock), the rest turn graphite, the hourglass and "119 wait" appear, and the counter shows 120 |
| B2 | 240–540 | Each commit wakes every waiter to re-check. One wins the next seat. | three rounds of commit → re-check (blue, counter +119/+118/+117) → slide → lock |
| B3 | 540–720 | Seat by seat until all 120 are booked: up to 7,260 evaluations. | sped up: the crowd books 1D…2F and then the rest, the bar reaches full length, "1.7 s", "up to 7,260" |
| B4 | 720–956 | SKIP LOCKED: a locked seat is skipped, not waited on. No queue forms. | dots leave one by one, ride past the locked seats, lock and commit; a stream reaches …20F; the bar stops at 35 px, "147 ms", "about 120" |
| B5 | 956–1066 | Both booked 120 of 120. About ten times faster in this demo. | "≈ 1/10 the time" appears |
| B6 | 1066–1186 | Same seats, same result. The difference: two words, SKIP LOCKED. | `SKIP LOCKED` is underlined and "two words" appears, then the poster holds |

Chapters sit 10 frames into their beats:
- one at a time (106)
- re-check (250)
- all 120 (550)
- SKIP LOCKED (730)
- the clocks (966)

## 5. Poster and reduced-motion stills
**Poster:** frame 1185. Both seat strips are booked green, and both tails read `…20F ✓`. The top lane shows a full bar with "1.7 s" and "up to 7,260 evaluations". The bottom lane shows a short bar with "147 ms ≈ 1/10 the time" and "about 120 evaluations". `SKIP LOCKED` is underlined with "two words". The lane tags read "waits, re-checks" and "skips, never waits", so the poster tells the whole story without a caption.

**Reduced-motion stills:** 90, 234, 532, 712, 948, 1058, 1185.

## 6. Page context
- **Before the clip (predict line):** "Same 120 passengers, same seats. One line waits its turn at every seat; the other walks past locked seats. Watch the clocks."
- **`<AnimationClip>` caption:** "FOR UPDATE queues everyone at the same seat and re-checks after every commit; SKIP LOCKED walks past locked seats. Both fill 120/120 correctly: about 1.7 s vs 147 ms in this demo. Time not to scale."
- **After the clip:** Same correctness, a tenth of the time: the waiting was the cost, and two words removed it.

## Known limits
See `review.md`.
