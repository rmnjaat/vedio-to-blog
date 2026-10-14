# Lecture 08 (lec06): animation plan

Selection follows `.claude/skills/explainer-animation/references/choosing.md`. A concept gets a clip only if the change over time *is* the lesson. There are 3–5 clips per lecture, at most one per chapter, and never two clips without prose between them. Each entry below is a shortlist line plus rough beats. The full `storyboard.yaml` / `storyboard.md` are written at build time. Canvas 1200×800, 30 fps. Marker colours: blue = request/data path, red = failure / stale / wasted work, green = ack / served. Past states ghost at 38%. Clip id prefix `l06-`.

## Shortlist

| id | chapter | dynamic | verdict |
|---|---|---|---|
| `l06-hash-scan` | §2.3 | accumulation (rows touched per query) | **animate** |
| `l06-invalidate` | §3.3 | a window in time (stale copy until TTL vs purge) | **animate** |
| `l06-badge` | §5.1 | accumulation + reset (set grows by sender, tap clears) | **animate** |
| `l06-aux-redis` | §6.2 | accumulation / rate (no-op writes piling onto the main store) | **animate** |
| image request → decoder | §1.1 | a fixed pipeline, no time dynamic | static Fig 1·a |
| repo card on a CDN miss | §1.4 | hit/miss is a taxonomy here; the TTL window is the §3 clip's job | static Fig 1·c |
| mark-active crash / foreign id | §2.4 | discrete states the reader must study one at a time | StepThrough Fig 2·c, Fig 2·d (§2 already has its clip) |
| two concurrent mark-active transactions (SN-04 race) | §2.4 | interleaving | not animated: it illustrates a fact-check note, not a class point, so the SourceNote and its link stay in prose. §2's clip slot goes to the class's own "aha". |
| on-demand resize | §3.4 | a fixed pipeline | static Fig 3·c (§3 already has its clip) |
| tag position on resize | §4.5 | a before/after pair is the whole lesson | static Fig 4·b + PauseAndThink P7 |
| crude query scanning the index | §5.2 | accumulation, but the same picture as `l06-hash-scan` | static Fig 5·c; avoids a second "scan" clip |
| auxiliary write flow, message by message | §6.2 | discrete steps | StepThrough Fig 6·b, studied after the clip shows the volume |

---

## 1. `l06-hash-scan`: how many rows does the query touch? (§2.3, about 24 s)
- **Mechanism:** two lanes on one time axis, both answering "photos for hash 0eafd172" against a 10,000-row `users` table. Top: `WHERE HASH(email) = ?`. A cursor walks row after row, a mono `md5()` flashes at each row, and a counter `rows read` climbs into the thousands before the match turns up far down the table. Bottom: `WHERE hash = ?` on an indexed column. Three hops down an index tree reach one row, and the counter stops at 1. Then both lanes replay with ten queries a second, so the top lane's counter runs away while the bottom one ticks by ten.
- **Why motion beats a static figure:** the lesson is cost growing with table size and query rate. Two stills show "many rows" against "one row", but not that the top lane's work grows with every row *and* every request, which is why a "derivable, don't store it" design falls over. The counter climbing at speed is the point.
- **Static twin:** Fig 2·b; board D-02 (`b_013230.jpg`) for the query text.
- **Ledger taught:** L-0080, L-0081, L-0083. **Context only:** L-0082 (the rule follows the clip in prose and the RuleBox).
- **Fidelity notes:** the match position is illustrative. The clip never says "always the whole table": with a unique match the database still has to hash every row, because it can't know where the match is, and the caption says exactly that. The expression-index exception (SN-03) stays in prose right after the clip. The clip doesn't claim it can't be done, it shows the class's schema.
- **Beats** (chips: 0:00 one query · 0:09 with an index · 0:15 at ten a second):
  - B0 (0–2.5 s) hold: both lanes, a 10,000-row table, query text at the top of each. *"The URL gives us a hash. Find that user's photos."*
  - B1 (2.5–9 s) top cursor sweeps the rows with `md5()` at each one, and the counter reaches 10,000. Red bracket. *"Hashing in the WHERE clause: the database hashes every email to find the match."*
  - B2 (9–15 s) bottom: three blue hops down the index, one green row, counter `1`. *"With a stored, indexed hash: one lookup."*
  - B3 (15–21 s) both lanes at ten queries a second. Top counter 100,000+ (red), bottom 10. *"Every page with an avatar runs this query. The scan repeats every time."*
  - B4 (hold ≥ 2.5 s) poster: annotated end state, with hand `store it, index it`. *"Not storing a derivable value cost a full scan, so store it."*
- **Predict line (before the clip):** "The table has 10,000 users. How many rows does each query read?"
- **After:** "So the derivable hash comes back, indexed" → RuleBox.

## 2. `l06-invalidate`: the old face, and how long it lingers (§3.3, about 30 s)
- **Mechanism:** a time axis across the bottom marked in hours up to `2 days`. A visitor requests `gravatar.com/h1` repeatedly, and the CDN serves photo v1 from cache (green). At t=1 h the user uploads v2: the database and S3 now hold v2. **Lane A, TTL only:** the CDN keeps serving v1 (red outline) on every request until the TTL marker at 2 days, then misses, fetches v2 and serves it. The stale window is shaded red. **Lane B, with invalidation:** the update also puts `photo_updated` on Kafka. A worker picks it up and sends `purge /h1` to the CDN. The next request misses, the origin returns v2, and the stale window shrinks to a sliver.
- **Why motion beats a static figure:** this is a window in time. What matters is how long a wrong answer is served and what closes the window. In a still, the 2-day TTL and the purge are two labels. In motion, the reader watches v1 keep coming back after the change, then sees the purge cut the window short.
- **Static twin:** Fig 3·b panel b; board D-05 (`b_011130.jpg`).
- **Ledger taught:** L-0126, L-0127, L-0128, L-0129. **Context only:** L-0124, L-0125, L-0130.
- **Fidelity notes:** "1–2 days" is the lecture's TTL guess, shown as `TTL 1–2 days`. The worker-via-Kafka design is shown because it's on the board. The caption notes "or call the CDN directly", which the class also accepted. The browser-cache caveat (A-GD-13) goes in prose after the clip, not in it.
- **Beats** (chips: 0:00 cached · 0:07 photo changes · 0:13 TTL only · 0:21 with a purge):
  - B0 (0–3 s) hold: visitor, CDN, origin, DB+S3; time axis. *"The CDN has user 1's photo. Every visitor gets it from the edge."*
  - B1 (3–7 s) repeated green serves of v1. *"Thousands of sites render it. None of them reach the origin."*
  - B2 (7–13 s) user 1 uploads v2, and the DB and S3 flip to v2. The CDN still holds v1. *"User 1 changes their photo. The origin has the new one, but the CDN doesn't know."*
  - B3 (13–21 s) lane A: v1 keeps being served (red), and a red window stretches to the TTL mark. *"With only a TTL, the old face is served for up to two days."*
  - B4 (21–28 s) lane B: Kafka event → worker → `purge /h1` → miss → v2 served (green). The window collapses. *"An event on Kafka, a worker calls the CDN's purge API, and the next request gets the new photo."*
  - B5 (hold ≥ 2.5 s) poster with both windows. *"Long TTL for speed, explicit invalidation for correctness."*
- **Predict line:** "User 1 changes their photo. With a two-day TTL and no invalidation, how long might user 2 see the old face?"
- **After:** prose on A-GD-13 (edges only, versioned names).

## 3. `l06-badge`: three people, not three hundred messages (§5.1, about 28 s)
- **Mechanism:** a phone with the messages icon (top) and B's per-user set as a small mono box (`B: { }`). B is offline (grey dot). Message chips arrive over time: `A`, `A`, `A`, `C`, `A`, `D`, `C`, `C`… An unread counter in small grey text climbs (`unread: 1, 2, 3 … 300`), while the set gains a member only when a new sender appears, and the badge shows the set's size: 1 → 2 → 3. B taps the icon. The badge goes to 0 and the set empties, while the grey unread counter stays at 300. A new message from `D` arrives: the badge shows 1.
- **Why motion beats a static figure:** the definition is the behaviour over time. Two numbers grow at different rates (messages vs unique senders), and a tap resets one but not the other. Static, "3" and "300" sit side by side. Moving, the reader sees which events move which number, and that tapping is acknowledgement, not reading.
- **Static twin:** Fig 5·a (D-08, `b_020345.jpg`) and Fig 5·d.
- **Ledger taught:** L-0227, L-0231, L-0233, L-0256, L-0257. **Context only:** L-0226, L-0230, L-0255.
- **Fidelity notes:** the badge counts unique senders, which is the class's deliberate twist, labelled on screen as `this design: unique senders`. The clip makes no claim about how Instagram counts (L-0226 and L-0228 are unverifiable). The set is drawn generically ("per-user set"). Redis is named only in §5.5.
- **Beats** (chips: 0:00 offline · 0:05 messages arrive · 0:16 tap · 0:22 next message):
  - B0 (0–3 s) hold: B offline, badge empty, set `{ }`. *"B is offline. Messages start arriving."*
  - B1 (3–10 s) chips from A ×3 and then C. Set `{A}` → `{A, C}`, badge 1 → 2, grey unread 3 → 4. *"Three messages from A count once. C makes it two."*
  - B2 (10–16 s) fast-forward: many chips from A, C and D. Set `{A, C, D}`, badge 3, grey unread 300. *"Three hundred messages, three people: the badge says 3."*
  - B3 (16–22 s) tap on the icon: badge 0, set empties (✕), grey unread stays 300. *"A tap clears the badge. Nothing was read."*
  - B4 (22–26 s) a chip from D: set `{D}`, badge 1. *"Newly unread means since that tap."*
  - B5 (hold ≥ 2.5 s) poster. *"The badge counts new senders since your last tap."*
- **Predict line:** "300 messages from 3 friends arrive while you're offline. What does the badge show, and what does one tap change?"
- **After:** P8 sits *before* this clip (the reader commits first); prose then states the requirement list.

## 4. `l06-aux-redis`: thirty messages, one write (§6.2, about 30 s)
- **Mechanism:** two lanes on one time axis, both receiving the same burst of 30 `C→B` events through the status-update workers. **Top, no auxiliary:** every event becomes a write to the main Redis cluster. The first adds C (green), and the next 29 arrive, are checked and discarded (red puffs). A load gauge on the main cluster climbs, and a second friend's burst (D ×20) pushes it into the red. **Bottom, with auxiliary:** every event first hits the small `aux` store. The first event writes `B_C` there and one `SADD` to main. The other 29 stop at aux (graphite ticks) and main's gauge barely moves. Then the same burst from D: one write to main again.
- **Why motion beats a static figure:** the lesson is rate and accumulation, wasted writes piling onto the one component you can't afford to lose. A static count ("29 of 30 change nothing") states the number, but watching the main store's gauge fill on the top lane while it stays flat on the bottom is what makes "protect the database" concrete.
- **Static twin:** Fig 6·a (load audit) and StepThrough Fig 6·b (message by message); board D-13 (`b_024045.jpg`).
- **Ledger taught:** L-0286, L-0292, L-0293, L-0303. **Context only:** L-0284, L-0285, L-0290.
- **Fidelity notes:** the gauge is qualitative, with no ops/s numbers on screen. The clip shows the auxiliary write as one atomic set-if-absent, as the fact-check suggests (A-PTU-14, used in prose), but labels it only `check / write`. Inconsistency and failure cases are left to §6.3's figure and prose.
- **Beats** (chips: 0:00 a burst · 0:06 without aux · 0:15 with aux · 0:24 another friend):
  - B0 (0–3 s) hold: workers, main cluster, aux (bottom lane only). *"While B is offline, C sends thirty short messages."*
  - B1 (3–6 s) the first event in both lanes adds C to B's set (green). *"The first message changes B's set."*
  - B2 (6–15 s) top: 29 red writes hit main and are discarded, and the gauge climbs. *"Without help, the other 29 still hit the main store and change nothing."*
  - B3 (15–24 s) bottom: 29 checks stop at aux, and main stays flat. *"With an auxiliary store, they stop at a cheap existence check."*
  - B4 (24–28 s) a second burst from D: top gauge red, bottom: one write. *"Every friend's burst: one write to main, the rest absorbed."*
  - B5 (hold ≥ 2.5 s) poster. *"Shield the brittle database from work that changes nothing."*
- **Predict line:** "C sends 30 messages. How many reach the main Redis, with and without the auxiliary?"
- **After:** StepThrough Fig 6·b for the step-by-step flow, then the key-model prose.
