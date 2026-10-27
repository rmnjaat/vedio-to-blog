# Storyboard: `l02-three-ways-to-persist` (Three guarantees), §7.3

Status: **reviewed** · 1200 frames (40.0 s, 80 s at 0.5×) · wide 1200×800, phone 720×1060 · poster = frame 1199.

## 1. The one idea
One message sent three ways differs in the *order* of two events, saved and shown, and only path ② has a window where B has seen a message that the database does not have yet.

## 2. Why motion
"Saved then shown", "shown then saved" and "shown only" are orders of events, and the failure the class warned about (a reload hiding a message you already saw) exists only *inside* the lag window. Fig 7·c shows the routes; it cannot show which mark comes first, or that the same reload fails during the lag and succeeds after the worker's write.

Static twin: Fig 7·c in its phone form (three strips, one per path, each with only its own parts); board D-04 (`b_022045.jpg`). Frame 0 is that figure in graphite, with B's screens empty.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0204 | three types on one system, picked by guarantee; Slack is "my hypothesis", WhatsApp hypothetical | three numbered lanes titled `Slack (a hypothesis)`, `WhatsApp-like (hypothetical)`, `Zoom chat (by default)` |
| L-0206 | type 1: broadcast only once persisted | ① green `saved` is written before `shown`; the db ✓ lands before the edge is told |
| L-0209, L-0210 | HTTP → API server → DB, then API → WebSocket server → users | ① `A → api` (HTTP, solid) → `db`, then `api → edge` → B over the WS line |
| L-0214, L-0389 | type 2: WS → edge → other user now, → Kafka → DB later; "not delivered late, stored" | ② the bubble appears at once (`shown`), the square waits in `kafka`; in B5 the worker pulls and writes, `shown → saved` |
| L-0218, L-0390 | a 10-minute lag; a Slack user who reloads from the DB doesn't see a message they were notified of | `≈ 10 min lag` bar (not to scale); a reload inside it (red tick) gets a red packet from an empty db; the bubble is replaced by a red dashed outline, `✕ gone in the lag` |
| L-0220, L-0221 | Zoom chat: whoever is connected gets it; leave and come back, no history | ③ `shown only`; `rejoin` → red dashed outline, `✕ history gone` |
| L-0219 | different guarantees, different architecture | B6 caption over the poster |

**Not claimed:** Slack's real internals (A-MLA-03 is in prose); that WhatsApp stores messages in a backend; that WhatsApp's own clients reload from a DB (the lane-② reload is the class's "imagine Slack" case and the caption says "(a Slack client can)"); any timing other than the class's 10 minutes; batching (L-0216), Kafka retention, idempotent writes; that Zoom never persists chat (lane ③ says "by default", A-MLA-12).

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | One message, three paths: when saved, when shown? | hold on Fig 7·c |
| B1 ① | 90–307 | Slack (a hypothesis): over HTTP, saved first, then broadcast to B. | blue packet A → api → db, green ✓ + `saved`; api → edge → B, bubble, `→ shown` |
| B2 ② | 307–549 | Phone-first (hypothetical): shown at once, saved later via Kafka. | ① ghosts; packet A → edge → B, bubble, `shown`; edge ⇢ kafka, square waits; `≈ 10 min lag` bar, `not to scale` |
| B3 ③ | 549–740 | Zoom chat: whoever is connected sees it. Rejoin later: no history. | ② ghosts; packet A → edge → B, `shown only`; `rejoin`, red dashed outline, `✕ history gone` |
| B4 | 740–936 | If B reloads from the DB in the lag (a Slack client can): ① there, ② gone. | ①② return, ③ ghosts; `reload` + red tick in the lag; ① read → green packet, `✓ still there`; ② read → red packet, bubble → red outline, `✕ gone in the lag` |
| B5 | 936–1120 | A worker saves it later; then a reload finds it. Stored late. | ① ghosts; worker pulls (blue), writes db, green ✓, lag end tick green, `→ saved`; reload again → green packet, bubble back |
| B6 | 1120–1200 | Different guarantees, different architecture. | all lanes back to full strength; poster |

Chapter chips sit 10 frames into B1–B5.

## 5. Poster and reduced-motion stills
Poster (1199): the three lanes with `saved → shown` / `✓ still there`, `shown → saved` / `✕ gone in the lag` (red tick inside the lag bar, green end tick, bubble back) and `shown only` / `✕ history gone`. Reduced-motion stills: 86, 303, 545, 736, 932, 1116, 1199.

## 6. Page context
- **Predict line (before the clip, after P5):** "Persistence lags ten minutes. On which path does a refresh hide a message you already saw?"
- **Clip caption (`<AnimationClip caption>`):** "One message sent three ways: ① saved, then shown; ② shown at once and saved after the Kafka lag, so a refresh inside the lag hides it; ③ shown and never saved."
- **After:** "Different guarantees, different architecture" → RuleBox §7.

## Known limits
- The reload is drawn B → db directly; in class it goes through the API (hop omitted for room).
- In the poster, lane ②'s `✕ gone in the lag` sits under a restored bubble: it records what the in-lag reload showed, tied to the red tick on the lag bar; the restored bubble and green end tick show the later state.
- One api/db/worker stands for the board's fleets and shards.
