# Storyboard: Lost increments (l01-count-race)

**Lecture 1, §4.2.** 37.7 s at 30 fps (75 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
`count++` is three steps, so two threads can both read the same value and one increment disappears. Over 2,000 increments that happens a few times and nothing reports it. Make each increment one indivisible step and the total is right.

## Why this needs motion
Fig 4·b lets the reader study one interleaving at their own pace. The clip adds the time dimension: the counter racing up, losses stamped now and then without an error, the wrong total at the end, and the same run landing on 2,000 once `+1` is atomic.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0219 | Two threads, `count++` 1,000 times each, should be 2,000, "something like 1997", because `count++` is not atomic | Two lanes into one `count` box; read 0 / read 0 / write 1 / write 1; the run ends at 1,997 (red) with "expected 2,000" |
| L-0231 | Protect it with transactions or atomic instructions | The replay with `atomic +1` chips lands on 2,000 (green) |
| L-0230 | Two claps at the same time: 100 must become 102 | Final note under the box: "2 claps on 100 / must be 102", and the closing caption |

**Not claimed:** where or how often losses happen in a real run (positions are illustrative, the track says "time (sped up)"); that every run loses exactly three; any specific language API. Locks, semaphores and SN-19 (transaction isolation) stay in prose.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–108 | Two threads share one counter. Each does count++ 1,000 times. | Nothing. Lanes, `count` = 0, empty track. |
| B1 | 108–250 | count++ is read, add one, write. Both threads read 0. | Chip ① `read 0` on lane 1, blue value travels count → chip. Chip ② `read 0` on lane 2, same. |
| B2 | 250–440 | Each adds one and writes 1. One increment is lost. | Chip ③ `write 1`, blue packet → count, count becomes 1. Chip ④ `write 1`, packet → count, still 1. Red ring + "should be 2". |
| B3 | 440–630 | Sped up to 1,000 each: it happens again now and then, silently. | Chips ghost. Playhead runs the track; count runs to 1,997; red ✕ "lost" stamped three times. |
| B4 | 630–730 | Expected 2,000. Got about 1,997. | Count turns red. Result: `count++ 1,997 ✕` / "expected 2,000". |
| B5 | 730–1016 | Again, with each +1 as one indivisible step: nothing is lost. | Chips replaced by `atomic +1` chips, one after the other; count 0 → 1 → 2, track replays to 2,000 ✓. Result: `atomic +1 2,000 ✓` / "nothing lost". |
| B6 | 1016–1130 | Two claps at once on a post with 100: it must become 102. | "2 claps on 100 / must be 102" written under the box. Hold on poster. |

## Poster / reduced motion
- **Poster:** frame 1129. Atomic chips on the lanes, count = 2,000 (green), track with three ghosted ✕ and a green ✓, both results side by side, the Medium note.
- **Reduced-motion stills:** 100, 240, 425, 620, 720, 1008, 1129.

## Page context
- **Before (lead-in after the StepThrough):** "Now run it a thousand times."
- **After:** "The fix lives in the database: a transaction or an atomic operation (4.3)."

## Review log
- Round 1–2 renders checked (paper + blackboard, full + phone sheets); see `renders/`. Fixes listed in the report of the build.
- Known limits: the running counter changes every frame during the sped-up runs (it is the accumulating quantity); loss positions are illustrative.


## QA fix (2026-10-13): one story, 100 → 102
The critic found the clip contradicting itself (page caption "read 41", animation "read 0", poster "100→102"). The beats now tell the page's story:
| # | Frames | Caption |
|---|---|---|
| B0 | 0–108 | Two claps at once on a count of 100. Each thread runs count++. |
| B1 | 108–250 | count++ is read, add one, write. Both threads read 100. |
| B2 | 250–440 | Both write 101. One clap is lost: it should be 102. |
| B3 | 440–630 | Now from 0, sped up to 1,000 each: it happens again, silently. (on screen: "from 0, 1,000 each") |
| B4 | 630–730 | Expected 2,000. Got about 1,997. |
| B5 | 730–1016 | Again, with each +1 as one indivisible step: nothing is lost. |
| B6 | 1016–1130 | Made atomic, the two claps on 100 give 102. ("2 claps on 100 / atomic: 102") |

The beat table above this section is superseded; storyboard.yaml is current. Phone composition `l01-count-race-phone` (720×910): lane labels above the rails, results stacked.
