# Storyboard: Queue vs stream (l01-queue-vs-stream)

**Lecture 1, §3.5 Message streams.** 33.5 s at 30 fps (67 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `site/src/animations/clips/l01-queue-vs-stream/timeline.ts`.

## The one idea
In a queue, each message is taken by one consumer and deleted. In a stream, messages stay, and each kind of consumer moves over them at its own pace, so one stalling doesn't stop the other.

## Why this needs motion
Figs 3·d and 3·f show the two shapes. The difference between them is behaviour over time: the queue's pipe *empties* as messages are taken, while the stream's messages stay and two positions *move at different speeds*. The key moment is when Elasticsearch goes down: one position stops while the other keeps going, and later the stopped one catches up. A still picture can't show that.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0155 | Queue consumers are homogeneous (same job) | Three identical `count++` boxes |
| L-0161 | A message read from a queue goes to exactly one consumer | Each square rides to one box. Its number is written beside that box only. |
| L-0173 / L-0213 | Queue: read, process, delete. Stream: iterate, nobody deletes | Queue slots become dashed ghosts, labelled `all deleted`. Stream squares stay. |
| L-0170 | Stream = heterogeneous consumers on the same messages | `search` → es and `counter` → db point at the same squares |
| L-0175 | Each consumer type goes at its own pace | Two cursors step at different times. Counter is ahead after ②. |
| L-0176 | Elasticsearch down: the counter keeps processing | es gets a ✕ and `down`, the search cursor turns red dashed and stops, and counter moves to 5 |
| L-0174 | Stream messages stay until retention deletes them | The two oldest squares fade to dashed ghosts under `retention` |

The clip does **not** claim:
- exactly-once delivery from a queue (SN-11 at-least-once stays in prose)
- any retention value (A-DC-08 stays in prose)
- any timings
- commits or offsets (§3.7)

Dispatch for m4 and m5 continues the class's walkthrough and is illustrative.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–105 | Same five events. Top: a queue. Bottom: a stream. | Nothing moves. Both pipes are empty, with five numbered squares waiting in each lane. |
| ① B1 | 105–345 | Queue: each message goes to one consumer, which deletes it when done. | The squares slide into sqs. One by one, each rides blue to one `count++` box (1→c2, 2→c1, 3→c3, 4→c1, 5→c2). On arrival it is absorbed and its number is written green beside that box. `all deleted` is written. |
| ② B2 | 345–555 | Stream: messages stay. Each consumer type keeps its own position. | The squares slide into kafka and stay. The pen draws the search and counter cursors onto message 1. Search steps to 2, and counter steps to 3. |
| ③ B3 | 555–735 | Search is down. The counter keeps going at its own pace. | es gets a ✕ and `down`. The search cursor turns red dashed. Counter steps 3→4→5. |
| ④ B4 | 735–885 | Search comes back and picks up where it stopped. | The ✕ is replaced by ✓ and `back`. The cursor returns to ink and steps 2→3→4→5. |
| B5 | 885–1005 | Nobody deletes from a stream. Old messages expire by retention. | Messages 1–2 fade to dashed ghosts, and `retention` is written. Then hold. |

## Poster and reduced-motion stills
- **Poster:** frame 1004.
  - Queue: the empty pipe holds dashed ghosts and the green `all deleted`, and the numbers beside the consumers read c1 `2 4`, c2 `1 5`, c3 `3`.
  - Stream: squares 3–5 are kept and 1–2 are expired under `retention`. Both cursors are on 5. es shows ✓ `back`.
- **Reduced-motion stills:** 100, 340, 550, 730, 880, 1004.

## Page context
- **Predict prompt before the clip:** "Elasticsearch goes down for ten minutes. In which picture does the counter stop too?"
- **After the clip:** "Queue: you delete. Stream: you iterate, and later you commit (3.7)."

## Review log
- **Round 1** (paper, all 12 stills):
  - The waiting squares sat too tight and touched the pipe cap. The pitch is now 64, and the pipe now spans x 360–790 with slots 80 apart.
  - The es ✓ was clipped at the right edge. It now sits left of `back`/`down`.
  - The `count++` boxes were widened.
- **Round 2** (paper + blackboard, full and phone sheets):
  - All labels and the numbered squares are readable at 358 px.
  - The red dashed stalled cursor is distinct in both themes.
  - The ghosted dashed squares read as "gone" in both lanes: `all deleted` in the queue and `retention` in the stream.
- **Motion check** (`renders/strip-dispatch.png`, 5–8.6 s): each square leaves in order and rides the bus to one box. Its number is written green on arrival, and its slot ghosts.
- **Checks:** `tsc` clean. Both compositions render. The renders are in `renders/`.
- **Known limits:**
  - Stream cursors move right → left, because m1 entered first and sits at the exit end. The numbers carry the order.
  - Dispatches overlap by 4 frames (a steady stream rather than strictly one-at-a-time).
  - The es ✕ covers the `es` letters while it is down. This is deliberate, and the `down` word is the second cue.


## QA fixes (critic.md, 2026-10-13)
- Phone composition `l01-queue-vs-stream-phone` (720 wide, queue above stream; waiting messages sit above each pipe and drop in; consumers and stores in a right-hand column), chosen by the player at ≤ 640 px; every label ≥ 15 px at 358 px.
- Desktop stage capped at 540 px, so lettering lands at ~18 px and ink at ~1.6 px, like the page figures.
- Chapter marks moved 10 frames into each beat (settled frame, caption fully up).
