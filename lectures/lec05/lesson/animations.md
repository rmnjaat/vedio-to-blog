# Lecture 03 (lec05): animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per top-level chapter, and never two clips without prose between them. Each clip below is a shortlist entry plus rough beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps, prefix `l05-`. Marker colours: blue = request/data path, red = failure/stale/wasted, green = ack/grant/commit. Waiting is graphite with an hourglass, never red. Past states ghost at 38%.

## Shortlist

| id | chapter / section | dynamic | verdict |
|---|---|---|---|
| `l05-deadlock` | 1 / §1.5 | contention, ordering (a cycle forms, then the engine breaks it) | **animate** |
| `l05-wait-vs-skip` | 2 / §2.5 | contention + accumulation (a queue at every seat vs. no queue; two clocks) | **animate** |
| `l05-expiry-window` | 3 / §3.7 | a window in time (expired but still on disk; reads hide it; the cron removes it) | **animate** |
| `l05-redis-sampling` | 4 / §4.2 | rate / accumulation (the expired share drops round by round, then the loop stops) | **animate** |
| approach 3 race (first free seat) | 2 / §2.3 | interleaving, but the reader must study who read before whose commit | StepThrough Fig 2·d (chapter 2 already has its clip) |
| approach 4 wait-signal-recheck in detail | 2 / §2.4 | discrete states | StepThrough Fig 2·e; the clip shows its *duration* cost against SKIP LOCKED |
| shared vs exclusive locks on rows 1–6 | 1 / §1.3 | none (who may do what: a taxonomy) | static Figs 1·b, 1·c |
| SKIP LOCKED / NOWAIT on one table | 1 / §1.4 | none (two outcomes) | static Fig 1·d + Table T1 |
| store table evolution | 3 / §3.2–3.5 | design decisions, studied at reader's pace | StepThrough Fig 3·a |
| upsert vs get-then-write trips | 3 / §3.5 | a count, not a rate | static Fig 3·c |
| replicas, range shards | 5 | taxonomy / architecture | static Figs 5·a–5·c |
| hold vs lock across payment | 2 / §2.7 | a window, but one still shows it | static Fig 2·g |

Ranking by teaching value (how often learners get it wrong): wait-vs-skip (the class's prediction round produced five wrong answers, L-0095..L-0110; "all 120 got row 1" is the named misconception L-0114) > deadlock (L-0095 confused waiting with deadlock; engines' victim choice is a fact-check item, SN-04) > expiry window (reads must filter expired keys, L-0201, and NULL TTLs are a trap, A-KSD-08) > Redis sampling (outdated details, SN-12).

---

## 1. `l05-deadlock`: two transactions, two rows, one cycle (§1.5, about 26 s)
- **Mechanism:** T1 locks row 2, T2 locks row 1 (both green). T1 asks for row 1 and waits (hourglass). Waiting alone is fine: the clip holds here to make that point. Then T2 asks for row 2: its wait would close a cycle. The wait-for edges light up red around the loop, the engine detects the cycle, and rolls one transaction back (the victim's locks drop, its lane goes red with mono `ERROR 1213`); the other's wait ends, it gets the row (green) and commits.
- **Why motion beats a static figure:** the lesson is the *order*: one wait is harmless, the second wait in the opposite order is what closes the loop, and the detection happens at that instant, not later. A still shows only the loop; the clip shows that the cycle is born from the lock order, which is why "lock in one order" (A-C-04) prevents it.
- **Static twin:** Fig 1·e (D-01, frame `b_001430.jpg`).
- **Ledger taught:** L-0025, L-0026, L-0028, L-0031, L-0032, L-0033, L-0096. **Context only:** L-0027, L-0030 (said in prose before the clip).
- **Fidelity notes:** the victim is not "the transaction that detects it" in every engine (SN-04). The clip shows "the engine rolls one back" and the caption names InnoDB's rule (smaller transaction) as one engine's choice. The board wording "kills itself" appears only in the prose quote. The clip doesn't claim a detection delay; a chapter chip note says PostgreSQL first waits `deadlock_timeout` (A-C-01).
- **Beats** (chapters: 0:00 two locks · 0:06 one waits · 0:12 cycle · 0:18 rollback):
  - B0 (0–2.5 s) hold: T1, T2 circles; row 1, row 2 boxes. *"Two transactions, two rows."*
  - B1 (2.5–6 s) T1 → row 2 (green lock), T2 → row 1 (green lock). *"T1 locks row 2. T2 locks row 1."*
  - B2 (6–12 s) T1 → row 1: hourglass. Hold 2 s. *"T1 now wants row 1. It waits. Waiting is not a deadlock."*
  - B3 (12–18 s) T2 → row 2: the four edges turn red one after another, tracing the loop. *"T2 wants row 2. Each now waits for the other: a cycle."*
  - B4 (18–23 s) engine stamp `deadlock detected`; T2's lane goes red, `ERROR 1213`, its lock on row 1 drops; T1 gets row 1 (green) and commits. *"The database rolls one back. The other proceeds. Your code must retry the victim."*
  - B5 (hold ≥ 2.5 s) poster: end state annotated `lock rows in the same order and this loop can't form`.
- **Predict line (before the clip):** "T1 holds row 2, T2 holds row 1, and each now asks for the other's. What does the database do?"
- **Target length:** 26 s.

## 2. `l05-wait-vs-skip`: 120 passengers, two queries (§2.5, about 36 s)
- **Mechanism:** two lanes on one time axis, each with a seat strip (1A, 1B, 1C, … shown as the first 12 seats, then `…120`) and a crowd of transaction dots. **Top: `FOR UPDATE`.** All dots pile up at 1A; one gets the lock (green), the rest show hourglasses. Commit → signal → the whole pile re-checks (a ripple), slides to 1B, one wins, repeat. A small counter ticks `re-checks: 119, 237, 354, …` and a clock runs. **Bottom: `FOR UPDATE SKIP LOCKED`.** Dots arrive and each slides past locked seats to the next free one; seats lock back to back almost at once; counter `evaluations: ≈ 120`. Bottom finishes first (all 120 green); the top keeps grinding and finishes later. End cards: `1.7 s` vs `147 ms`, both `120 / 120 seats`.
- **Why motion beats a static figure:** the difference is entirely in time: same final seat map, same correctness, very different durations. The pile-up and ripple of re-checks at every seat only exists while it happens; a still of two full seat maps would show "no difference", which is exactly the point the lecture overturns.
- **Static twin:** StepThrough Fig 2·e (mechanism, 3 transactions), Table T2 (numbers). Terminal frames `b_010030.jpg`–`b_010045.jpg` (approach 4 timings) and `b_010600.jpg` (approach 5, `took 147.4798ms`).
- **Ledger taught:** L-0112, L-0113, L-0115, L-0121, L-0122, L-0154, L-0155. **Context only:** L-0119, L-0123 (prose around the clip).
- **Fidelity notes:** time is **not to scale**: the clip's two lanes play over the same 30 s, with the clocks reading the real numbers (approach 4 runs on screen: 1.25 s, 1.73 s, 1.79 s; the class quoted 1.7 s; approach 5: 147 ms). The re-check counter shows the worst case N(N+1)/2 = 7,260 (labelled "worst case"); the real count depends on timing. Under SKIP LOCKED the engine moves along the page without re-evaluating (L-0306) — the bottom lane shows dots sliding, never a re-check ripple. "10× faster" is this demo's measurement (L-0121), and the closing card says so ("in this demo").
- **Beats** (chapters: 0:00 the rush · 0:07 one seat at a time · 0:18 skip instead · 0:28 the clocks):
  - B0 (0–3 s) both lanes empty seat strips; 120 dots arrive at the left. *"120 passengers, one query each, at the same moment."*
  - B1 (3–7 s) top: all dots crowd at 1A; one green lock, rest hourglasses. *"FOR UPDATE: everyone's first match is 1A. One gets the lock; 119 wait."*
  - B2 (7–18 s) top: commit → ripple of re-checks → slide to 1B → one wins; repeat three times visibly, then fast-forward with the counter climbing. *"Each commit wakes every waiter to re-check. Seat by seat."*
  - B3 (18–28 s) bottom lane runs: dots slide past locked seats; seats lock back to back; strip fills green. *"SKIP LOCKED: a locked seat is skipped, not waited on. No queue forms."*
  - B4 (28–33 s) top finishes; two clocks freeze: `≈1.7 s` vs `147 ms`; both strips `120/120`. *"Both correct. One is about ten times faster in this demo."*
  - B5 (hold ≥ 2.5 s) poster: annotated end state with the two clocks and `two words: SKIP LOCKED`.
- **Predict line (before the clip):** "Same 120 passengers, same seats. One line waits its turn at every seat; the other walks past locked seats. Watch the clocks."
- **Target length:** 36 s.

## 3. `l05-expiry-window`: expired, hidden, then gone (§3.7, about 32 s)
- **Mechanism:** a single time axis 11:55 → 12:10 with a cron clock firing at 12:00 and 12:10 (dashed, every 10 minutes in the example). The `store` table shows key `k1`, `expired_at = 12:02`. At 12:01 a GET (blue) returns `v1` (green). At 12:02 the row turns grey-red: expired, **still on disk**. At 12:04 a GET with `AND expired_at > now()` returns nothing (the row is filtered in SQL; a red "10 MB not shipped" token stays in the database, struck). At 12:05 a user deletes key `k2`, which expired at 11:58: the delete's `AND ttl > now()` matches nothing, no write (a disk icon stays still, mono `0 disk IO`). Key `k3` (live) is deleted: `expired_at = -1`, one write. At 12:10 the cron runs `DELETE … WHERE expired_at <= now()`: k1, k2 and k3 vanish together.
- **Why motion beats a static figure:** the lesson is the window: between expiry and the next cron run the row exists but must be invisible. A still shows one instant; only the timeline shows a read falling inside the window, the user-delete arriving after expiry (and doing nothing), and one sweep cleaning both expired and deleted rows.
- **Static twin:** Fig 3·d (D-07, frame `b_020700.jpg`) and the final queries CodeBlock.
- **Ledger taught:** L-0201, L-0221, L-0222, L-0236, L-0258, L-0259, L-0263, L-0202. **Context only:** L-0260, L-0294 (prose).
- **Fidelity notes:** "10 minutes" is the class's example interval (L-0236). The clip keeps `expired_at` as the column name and shows the slide alias `ttl` once in the delete line (as the board writes it). k3's `-1` assumes an integer epoch column (A-KSD-09); the clip labels it `-1 (epoch column)`. A one-line end card carries the A-KSD-08 catch: "keys with no TTL: use a sentinel, not NULL".
- **Beats** (chapters: 0:00 a live key · 0:07 expired, still there · 0:15 deletes · 0:24 the sweep):
  - B0 (0–3 s) the axis, the table with k1 (12:02), k2 (11:58), k3 (12:30). *"Three keys. Each row stores when it expires."*
  - B1 (3–7 s) 12:01 GET k1 → `v1`. *"Before 12:02, k1 is live."*
  - B2 (7–15 s) 12:02 k1 greys; 12:04 GET k1 → nothing; the value token stays put, struck. *"Expired but still on disk. The GET filters it in SQL, so the value never leaves the database."*
  - B3 (15–24 s) 12:05 DELETE k2 → `0 rows`, disk still; DELETE k3 → `expired_at = -1`, one write. *"Deleting an already-expired key writes nothing. Deleting a live key just marks it."*
  - B4 (24–29 s) 12:10 cron fires; k1, k2, k3 vanish together. *"One cleanup query removes expired and deleted rows alike."*
  - B5 (hold ≥ 2.5 s) poster: the axis with the window shaded and the three queries, each with its cost badge.
- **Predict line (before the clip):** "A key expires at 12:00. The cron runs at 12:07. What does a GET at 12:03 return, and is the row still on disk?"
- **Target length:** 32 s.

## 4. `l05-redis-sampling`: twenty keys at a time (§4.2, about 30 s)
- **Mechanism:** a field of ~200 squares (keys with a TTL), 30% struck (expired). Round 1: a dashed frame lands on 20 random squares; 7 are expired (35%): they are deleted (green ticks, they vanish); the field's expired share drops a little; a meter shows `7/20 = 35% > 25% → again`. Round 2: 6/20 = 30% → again. Round 3: 4/20 = 20% → stop. (Values avoid exactly 25%, where "more than 25%" needs a reading.) After the loop stops, a few expired squares remain scattered. Then a GET touches one of the leftovers: it vanishes on access (lazy deletion). End card: a small overlay "Redis 6.0+: batches of 20, keep going above ~10%, within a time budget".
- **Why motion beats a static figure:** the algorithm is a loop whose *stopping* is the lesson: it keeps sampling while the sample says "lots expired" and quits early when it says "few", leaving some behind on purpose. A still can show one sample; only repetition shows the rate falling and the deliberate stop, then lazy deletion mopping up.
- **Static twin:** Fig 4·b (board S69, frame `b_021530.jpg`).
- **Ledger taught:** L-0243, L-0244, L-0247, L-0249, L-0250, L-0251, L-0252, L-0301. **Context only:** L-0237 (lazy deletion, taught in 4.1), L-0246 (the ~90% estimate is not animated).
- **Fidelity notes:** the 25% rule and "random" sampling are the classic (pre-6.0) algorithm the lecture teaches (L-0247, L-0249 → SN-12). The clip shows the classic rule and closes with the current one as an overlay, never silently swapping them. No claim about the central limit theorem (L-0255 is unverified) and no "5 million keys" figure. Numbers 7/20, 6/20, 4/20 are illustrative, labelled "example".
- **Beats** (chapters: 0:00 the population · 0:05 round 1 · 0:13 again · 0:20 stop · 0:25 lazy):
  - B0 (0–5 s) the field; meter `expired ≈ 30%`. *"Keys with an expiry. About a third have expired but are still in memory."*
  - B1 (5–13 s) frame lands; 7 struck in the frame; they vanish; meter `35% > 25%`. *"Sample 20. Seven expired: delete them. More than a quarter, so go again."*
  - B2 (13–20 s) round 2: 6/20 = 30%, delete, `again`; round 3: 4/20 = 20%. *"Again, and again, until a sample comes back mostly live."*
  - B3 (20–25 s) loop stops; scattered struck squares remain. *"Stop. Some expired keys stay. Redis spends its single thread on commands, not on cleanup."*
  - B4 (25–28 s) a blue GET hits a leftover; it vanishes. *"The next read of a leftover deletes it on the spot."*
  - B5 (hold ≥ 2.5 s) poster with the classic rule and the overlay `since 6.0: ~10%, time budget`.
- **Predict line (before the clip):** "A Redis with a million keys, 30% of them expired. How many rounds before the job stops, and what's left?"
- **Target length:** 30 s.

---

## Placement on the page (rhythm check)
- §1.5: prose (deadlock definition, detection) → predict line → `l05-deadlock` → SourceNote SN-04 → MarginNotes. One clip in chapter 1.
- §2.5: diff CodeBlock → P5 → run paragraph → predict line → `l05-wait-vs-skip` → the "two words" recap prose → Table T2. StepThrough Fig 2·e sits a section earlier (§2.4), with prose between.
- §3.7: final queries CodeBlock → predict line → `l05-expiry-window` → Table T3.
- §4.2: algorithm prose → predict line → `l05-redis-sampling` → SN-12, SN-13 → P9.
- No two clips are adjacent; each chapter has at most one.
