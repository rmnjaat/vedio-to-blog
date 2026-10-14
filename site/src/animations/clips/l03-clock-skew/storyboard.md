# Clip `l03-clock-skew`: Four clocks, four requests

Section 3.5 "Four machines, four clocks" · 1200×800 wide + 720×1070 phone · 30 fps · 1065 frames (35.5 s; 71 s at 0.5×)
· status: see `storyboard.yaml`.

## 1. The one idea
Four requests reach four machines one after another, but the machines' clocks disagree, so time-then-machine IDs come
out 232, 244, 237, 239: the order the requests happened in and the order their IDs sort in no longer match.

## 2. Why motion
The lesson is the clash of two orders (ordering / interleaving). The clip plays the requests in real time, one by one,
so the ID list grows down a "real time" axis and the dip (237 after 244) appears at the moment it is made. Board D-08
shows the finished list (the page's former StepThrough twin was removed by the design fix); the clip adds the arrival order as something you
watch rather than reconstruct, and ties each ID to its machine's clock as it is minted.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0071 | Machines 2, 4, 7, 9 have times 23, 24, 23, 23; requests in order to M2, M4, M7, M9 give time+machine IDs 232, 244, 237, 239: "not monotonically increasing" (board: `get_id on m2 -> 232` …, red down-arrow, "Not monotonically increasing") | four laptops with `time: 23/24/23/23`; four blue requests in order; the list `get_id on m2 → 232` … grows down; 237 ringed red "smaller than 244"; the `24` clock ringed red "ahead"; a red bracket "not monotonically increasing" |
| L-0072 | Where monotonicity is needed, clock skew must be taken care of: it affects the correctness of the system | final caption over the poster |
| L-0062, L-0070, L-0073 | clocks are not synchronized; a clock can be off when an ID is made; strict order is "almost impossible" | context only: B0's caption restates L-0062; the rest stays in prose |

**Not claimed:** any unit for 23/24 (the instructor's stand-ins for epoch ms), how far or why clocks drift
(temperature, SN-01), how NTP corrects them (SN-02), how far apart the requests are in real time (the axis has no
scale), who sends the requests, and the "almost impossible" conclusion (L-0073, prose).

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | Four machines. At the same instant, their clocks disagree. | none (static figure) |
| B1 ① | 105–245 | First request goes to m2: time 23, then machine 2. ID 232. | blue request arrow into m2, m2 re-inked blue; row 1 `get_id on m2 →` written; `232` written in its slot, `23` underlined |
| B2 ② | 245–380 | Second request: m4, whose clock reads 24. ID 244. | same for m4 → `244`; arrow 1 settles to graphite 38% |
| B3 ③ | 380–620 | Third: m7, clock 23. ID 237 is smaller than the ID before it. | same for m7 → `237`; red dashed ring on the slot, "smaller than 244"; red ring on `time: 24`, "ahead" |
| B4 ④ | 620–755 | Fourth: m9, clock 23. ID 239. | same for m9 → `239` |
| B5 | 755–905 | Arrival order and ID order no longer match. | red bracket pen-drawn down the four IDs; "not monotonically / increasing" written |
| B6 | 905–1065 | Where you need order, clock skew affects correctness. | none (poster hold, 5.3 s) |

Chapters (10 frames into their beats): four clocks 0:00 (f10) · requests 0:04 (f115) · out of order 0:13 (f390) ·
no longer match 0:25 (f765).

## 5. Poster and reduced-motion stills
- **Poster (f1064):** the four laptops (ghosted request arrows above them), `time: 24` ringed red "ahead", the list
  `get_id on m2 → 232`, `m4 → 244`, `m7 → 237` (ringed, "smaller than 244"), `m9 → 239` down the "real time" axis,
  the red bracket "not monotonically increasing". It tells the story without the caption.
- **Reduced motion:** f100, 240, 375, 615, 750, 900, 1064 (the end of each beat with its caption up).

## 6. Page context
- **Before (predict line, after PauseAndThink P4):** "Four requests, one after another. Watch the IDs come out."
- **Clip caption (`<AnimationClip>`):** "Arrival order and ID order no longer match."
- **After:** "One clock would fix this. That is the next idea, and its catch."

## Phone layout (720×1070)
The four laptops sit in a 2×2 grid (m2 m4 over m7 m9), `time: NN` under each, "ahead" to the left of `time: 24` (in the gap between the columns).
The list runs in one column under the grid with the "real time" axis on its left; "smaller / than 244" sits right of
the 237 slot on two lines; the bracket runs right of the slots and "not monotonically / increasing" sits under the
list. Lettering 30 canvas px, IDs 40, captions 32.

## Known limits
- The request arrows are short (64 px wide, 46 px phone): the packet is visible for under a second. The re-ink of
  the laptop and the badge on the list row carry the "this machine got the call" cue.
- The "real time" axis has no scale; the four requests look evenly spaced only because the beats are.
- On the wide layout "ahead" sits under the ringed `time: 24`, 10 px above the first ID slot; both are red-on-ring
  and graphite-in-slot, so they read as separate, but it is the tightest spot in the frame.
- The final caption reads "affects correctness" (changed from "breaks" during review to stay with L-0072's wording).
- See `review.md` for the full checklist.
