# Lecture 06 (lec03): animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per chapter, and never two clips without prose between them. Each clip below is a shortlist entry plus rough beats; the full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure/collision/out-of-order, green = ack/success. Past states ghost at 38%. Clip ids use the prefix `l03-`.

## Shortlist

| id | chapter | dynamic | verdict |
|---|---|---|---|
| `l03-flush-crash` | §2.6 | window in time (memory runs ahead of disk) + a crash inside the window | **animate** |
| `l03-clock-skew` | §3.5 | ordering / interleaving (real-time order vs ID order) | **animate** |
| `l03-odd-even` | §5.8 | repeated protocol (round robin) + a window (one server down) | **animate** |
| `l03-offset-vs-keyset` | §8.2 | accumulation (work per page grows with depth vs stays flat) | **animate** |
| Amazon range hand-out | §5.2 | discrete steps, studied at the reader's pace | StepThrough Fig 5·a (§5 already has its clip) |
| counter evolution v1→v6 | §2.2–2.3 | a taxonomy of code versions | StepThrough Fig 2·c + summary Fig 2·e |
| Instagram `next_id()` | §7.4 | a fixed sequence of bit operations | StepThrough Fig 7·d |
| bit layouts (Snowflake, Instagram, ObjectId) | §4, §6, §7 | none (structure) | static Fig 4·c, 6·a, 7·a |
| custom epoch | §6.6 | none (a range on a timeline) | static Fig 6·d |
| gossip between two ID servers | §3.7 | protocol, but the lesson is "it's messy", not its timing | static Fig 3·f |

Ranked by teaching value (how often the idea is misread): the safest-value restart (the lecture's most reused idea, and students reached for "restart from the last flush"), the odd/even recovery (a student expected order live), the offset cost (the promised side effect), and clock skew (the reason strict order is "almost impossible").

---

## 1. `l03-flush-crash`: the counter runs ahead of the disk (§2.6, about 28 s)
- **Mechanism:** one machine hands out IDs from an in-memory counter and writes the counter to disk only every 3rd ID. The memory value runs ahead of the disk value; the gap opens and closes with each flush. The machine crashes with memory at 8 and disk at 6. Restart from the disk value reissues 7 and 8 (duplicates). Restart from the safest value, 6 + 3 + 1 = 10, skips 8 and 9 and stays correct.
- **Why motion beats a static figure:** the lesson is a *window*: between flushes, memory is ahead of disk by up to N − 1, and a crash anywhere in that window loses the difference. A still shows one moment; the clip shows the gap opening and closing, the crash landing inside it, and why "+ N + 1" covers the worst case.
- **Static twin:** StepThrough Fig 2·d (board D-05, `b_002445.jpg`).
- **Ledger taught:** L-0042, L-0043, L-0044, L-0045, L-0046. **Context only:** L-0047, L-0048 (the two takeaways follow in prose).
- **Fidelity notes:** N = 3 and the crash at 8 are the class's numbers. The restart formula is shown as the board wrote it (`06 + 3 + 1 = 10`); the code form `load() + N` then `++` appears only in the CodeBlock, not in the clip. No claim about fsync or page caches (that is A-IG-03, in prose in 2.4).
- **Beats** (chips: 0:00 counting · 0:08 flush · 0:14 crash · 0:19 wrong restart · 0:24 safe restart):
  - B0 (0–3 s) hold: machine `m1`, a memory cell `0`, a disk cell `0`. *"One machine. Memory holds the counter; disk keeps a copy."*
  - B1 (3–8 s) IDs `m1-01`, `-02`, `-03` stream out (blue); at 03 a dashed flush arrow to disk, disk shows `03` (green tick). *"Every third ID, the counter is written to disk."*
  - B2 (8–14 s) `-04` … `-06`, flush, disk `06`; then `-07`, `-08`: a bracket between memory `08` and disk `06` labelled `ahead of disk`. *"Between flushes, memory runs ahead of the disk."*
  - B3 (14–19 s) red ✕ over the machine, `crash`. Memory cell empties; disk stays `06`. *"The machine crashes. Disk says 6, but 8 was already handed out."*
  - B4 (19–24 s) ghost restart from 6: `m1-07`, `m1-08` come out red beside their earlier twins. *"Restart from 6, and 7 and 8 are handed out twice."*
  - B5 (24–28 s, hold ≥ 2.5 s) rewind the ghost; `06 + 3 + 1 = 10` writes in; `m1-10` (green); `08`, `09` greyed in a bracket `never used`. Poster. *"Start at the safest value. Two wasted numbers, no duplicates."*
- **Predict line (before the clip, after P3):** "The disk says 6. Watch where the counter really was when the machine died."
- **After:** "Two habits from this: don't do IO on every call, and always restart from the safest value."

## 2. `l03-clock-skew`: four clocks, four requests (§3.5, about 24 s)
- **Mechanism:** four machines whose clocks read 23, 24, 23, 23 at the same real instant. Four requests arrive one after another in real time, to machines 2, 4, 7, 9. Each machine makes a time-then-machine ID: 232, 244, 237, 239. Laid out in arrival order, the IDs go up, then down.
- **Why motion beats a static figure:** the lesson is the clash between two orders, the order requests *happened* and the order their IDs *sort*. Motion carries the real-time order (the requests arrive one by one) so the reader sees the ID sequence dip at the moment it happens; a still shows four numbers and leaves the reader to reconstruct the arrival order.
- **Static twin:** StepThrough Fig 3·d (board D-08, `b_003700.jpg`).
- **Ledger taught:** L-0071, L-0072. **Context only:** L-0062, L-0070, L-0073.
- **Fidelity notes:** times 23/24/23/23 and machines 2/4/7/9 are the class's numbers; the "IDs" are the class's toy concatenation, not real milliseconds. The clip does not show how clocks drift (no temperature claim: SN-01) or how NTP corrects them (SN-02); it only shows that at one instant they disagree.
- **Beats** (chips: 0:00 four clocks · 0:05 requests · 0:15 out of order):
  - B0 (0–4 s) four laptops `2`, `4`, `7`, `9`, clocks reading `23`, `24`, `23`, `23`. *"Four machines. At the same instant, their clocks disagree."*
  - B1 (4–8 s) request 1 (blue) → machine 2 → ID `232` drops onto an output strip. *"First request: machine 2 makes 232."*
  - B2 (8–12 s) request 2 → machine 4 → `244`. *"Second: machine 4's clock is ahead. 244."*
  - B3 (12–16 s) request 3 → machine 7 → `237`, ringed red; a small down-arrow on the strip between 244 and 237. *"Third: machine 7 makes 237. Smaller than the ID before it."*
  - B4 (16–20 s) request 4 → machine 9 → `239`. *"Fourth: 239."*
  - B5 (20–24 s, hold) the strip reads `232 244 237 239` with the dip marked; hand `not increasing`. Poster. *"Arrival order and ID order no longer match."*
- **Predict line (after P4):** "Four requests, one after another. Watch the IDs come out."
- **After:** "One clock would fix this. That is the next idea, and its catch."

## 3. `l03-odd-even`: one ticket server goes away and comes back (§5.8, about 32 s)
- **Mechanism:** two MySQL ticket servers behind a round-robin load balancer, one handing out odd IDs, the other even. IDs come out 1, 2, 3, 4, 5, 6. The odd server dies after 5; every request goes to the even server, whose IDs climb to 202. The odd server returns and resumes at 7, so the stream becomes 7, 204, 9, 206: unique, ugly. Optional fix: both servers restart from max + buffer (241 and 242), and round robin continues 241, 242, 243, 244.
- **Why motion beats a static figure:** round robin is a repeated protocol, and the failure is a window (one server absent while the other runs ahead). The "aesthetic" problem only shows when the stream interleaves again after the return; a still can't show that the IDs stay unique throughout while their order gets worse.
- **Static twin:** Fig 5·d (board D-16, `b_013130.jpg`; Q&A state `b_013500.jpg`).
- **Ledger taught:** L-0177, L-0179, L-0180, L-0181, L-0182, L-0183. **Context only:** L-0178, L-0187.
- **Fidelity notes:** 5, 202, 7/204, 240/241/242 are the class's numbers (the board also shows 239/240; one consistent example is used). The clip makes no claim that the servers coordinate: the reset is shown as a manual step (`sre resets`) and labelled `optional`. SN-11 (Flickr's servers never coordinate) and A-IG-10 (Flickr lets the sides drift) live in prose. The class's `id = id + 1` query does not appear (SN-10).
- **Beats** (chips: 0:00 round robin · 0:08 odd down · 0:16 odd back · 0:24 optional reset):
  - B0 (0–3 s) two cylinders `ticket 1 (odd)`, `ticket 2 (even)`, an `lb`, an output strip. *"Two ticket servers: one odd, one even."*
  - B1 (3–8 s) blue requests alternate; the strip fills `1 2 3 4 5 6`. *"Round robin: the IDs come out almost in order."*
  - B2 (8–16 s) `ticket 1` struck red after `5`; all requests go to `ticket 2`; its counter runs `8 10 … 200 202` (fast-forward with a `×` counter chip). *"The odd server dies. The even one carries on, up to 202."*
  - B3 (16–24 s) `ticket 1` returns (green outline); round robin resumes; strip `7 204 9 206`, the small numbers ringed in graphite (not red: nothing is wrong). *"It comes back where it stopped: 7, 204, 9, 206. Every ID is still unique."*
  - B4 (24–30 s) a hand `optional` tag; both counters set from `max 202 + buffer`: `241`, `242`; strip `241 242 243 244`. *"Optional: restart both above the max. It only looks tidier."*
  - B5 (30–32 s, hold) poster: the full strip with the three phases bracketed `normal · one down · back`. *"Uniqueness never broke. Order was never promised."*
- **Predict line (after P6):** "The odd server is back. Watch the next four IDs."
- **After:** "Where did we enforce order? Nowhere: it was a byproduct."

## 4. `l03-offset-vs-keyset`: page 1, page 10, page 1,000 (§8.2, about 30 s)
- **Mechanism:** two lanes on one axis of page depth. Lane 1, `LIMIT 10 OFFSET m`: for each page the database walks from the start of the result, past m rows, then returns 10; the walked-past rows pile up as a growing bar, and a cost meter rises in a straight line. Lane 2, `WHERE id > last LIMIT 10`: for each page a short descent of the B+ tree to the last ID, then 10 rows; its meter stays flat. The pages advance together: 1, 2, 10, 100, 1,000.
- **Why motion beats a static figure:** the lesson is accumulation: the offset's cost grows with every page while keyset's doesn't. The benchmark graph (Fig 8·b) shows the result; the clip shows *why*, the skipped rows being recomputed again on every page.
- **Static twins:** Fig 8·a (skip vs seek) and Fig 8·b (benchmark shape).
- **Ledger taught:** L-0218, L-0224, L-0228, L-0233. **Context only:** L-0219, L-0229, L-0230.
- **Fidelity notes:** no response-time numbers on screen (the class showed a graph, not figures we can reproduce); the meters are unitless. The keyset lane shows an index descent, not "the table is physically sorted", so it stays true for heap stores too (SN-15). Page sizes and depths are illustrative and labelled so. Filters are not shown (SN-16 lives in prose).
- **Beats** (chips: 0:00 page 1 · 0:08 page 10 · 0:16 deeper · 0:25 compare):
  - B0 (0–4 s) two lanes, each with a strip of rows and a meter at 0. Top `OFFSET`, bottom `id > last`. *"Two ways to fetch the next 10 rows."*
  - B1 (4–8 s) page 1: both read 10 rows (blue). Meters equal. *"Page 1: both read ten rows."*
  - B2 (8–14 s) page 10: top walks past 90 rows (graphite trail) then 10; bottom descends the tree, reads 10. Top meter a little higher. *"Page 10: offset walks past 90 rows first. Keyset jumps straight to the last ID."*
  - B3 (14–22 s) pages 100 and 1,000: top's walked-past bar stretches across the lane (red at its tip); meter climbs in a line. Bottom unchanged. *"Every page, offset recomputes everything before it. The cost grows with depth."*
  - B4 (22–27 s) both meters side by side as two lines on a small chart (rising red, flat green). *"Keyset costs the same at page 1,000 as at page 1."*
  - B5 (27–30 s, hold) poster. *"It needs IDs you can compare, and an index on them."*
- **Predict line (before the clip):** "Page 1 takes the same time either way. What happens by page 1,000?"
- **After:** "That needs an ID with an order. Every scheme with time on the left has one."

---

## Build notes (for the animator)
- One clip per chapter (§2, §3, §5, §8); each follows prose and a PauseAndThink, never another clip.
- Glyphs from the kit in `figures.md` §0: laptop machines, cylinders, `lb` bar, kit B+ tree, counter cells. Clip posters are the end states described in B5 and double as the clips' static fallbacks.
- Captions ≤ 2 lines, ≥ 2.5 s, ≤ 17 characters per second. Reduced-motion fallback: the static twin named for each clip.
- Load-light: storyboard first, stills at caption beats, `--concurrency=1`, one mp4 at the end.
