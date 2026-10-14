# Clip l05-expiry-window: Expired, hidden, then gone

Lecture 03 (folder `lec05`), §3.7. 1110 frames at 30 fps = 37.0 s. Spec: `storyboard.yaml` (same folder).

## 1. The one idea
Between a key's expiry and the next cron run its row is still on disk, so every GET and every delete carries
`AND expired_at > now()`; one cleanup query, `expired_at <= now()`, then removes expired and deleted rows together.

## 2. Why motion, and how it differs from the static twin
The static twin (Fig 3·d, board D-07) shows the cron ticks and the filtering read at one instant. The lesson is the
window: the *same* GET returns v1 at 12:01 and nothing at 12:04, only because the clock moved past `expired_at`. A
delete that arrives inside the window matches nothing (no disk IO); a delete of a live key marks it `-1`; the cron
run at 12:10 closes the window for all three rows at once. The red span on the axis grows with the clock: it *is*
the window.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0236 | approach 1: a cron job every 10 minutes fires a hard delete | cron clocks at 12:00 and 12:10 on the axis; B6 runs it |
| L-0201 | reads must filter expired keys, the cleanup may not have run yet | red window "expired, still on disk" from 12:02 to 12:10 |
| L-0221 | GET: `SELECT * FROM store WHERE key = k AND expired_at > now()` | the strip, clause in blue; 12:01 → v1, 12:04 → nothing |
| L-0222 | that clause saves the network IO of reading the expired value out | red ✕ + "v1 not sent", no packet comes back |
| L-0199 | delete becomes `UPDATE store SET expired_at = -1 WHERE key = k` | strip line 1 for the deletes; k3's cell becomes `-1` |
| L-0258 | the delete adds `AND ttl > now()`: soft-delete only keys not yet expired | strip line 3 on both deletes, blue |
| L-0259 | for an already-expired key that update does no disk IO | k2's lane: "no disk IO"; k2's row unchanged |
| L-0263 | final queries: cleanup `DELETE FROM store WHERE ttl <= now()`; GET with `> now()` | B6 strip; rows struck |
| L-0202 | one cleanup query matches expired and soft-deleted (negative) rows | k1, k2 (12:02) and k3 (-1) all go in one run; B7 caption |

**Not claimed:** the IO count (L-0260's "two" stays in prose), any value size (10 MB is §3.6's example), lazy deletion
on read (chapter 4), keys with no TTL (A-KSD-08 stays on the page's final query card), a column type (A-KSD-09 stays in
§3.4), any real timing (key times are illustrative inside the class's 10-minute example). The board's column name `ttl`
is shown as `expired_at` throughout (one name on screen).

**Plan change:** `animations.md` gave k2 an expiry of 11:58, but with a cron run at 12:00 that row would already have
been hard-deleted; k2 expires at 12:02 with k1.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | Three keys. Each row stores when it expires. | none: axis, cron clocks, table, api |
| ① B1 | 90–252 | 12:01: GET k1. It expires at 12:02, so it is live: v1 comes back. | playhead → 12:01; strip written; blue pen api → k1; green packet back; "v1 ✓" |
| ② B2 | 252–358 | 12:02: k1 and k2 expire, but their rows are still on disk. | playhead → 12:02; rows k1, k2 washed red, 12:02 underlined; "expired, still on disk" |
| ③ B3 | 358–512 | 12:04: the same GET. Its clause is now false, so v1 is never sent. | playhead → 12:04 (window grows); clause underlined; blue pen re-inks api → k1; red ✕, "v1 not sent" |
| ④ B4 | 512–660 | 12:05: DELETE k2. It already expired, so nothing matches: no disk IO. | playhead → 12:05; strip → delete k2; blue pen api → k2; "no disk IO" |
| ⑤ B5 | 660–836 | 12:06: DELETE k3. It is live, so its row is marked expired_at = -1. | playhead → 12:06; strip → delete k3; blue pen api → k3; 12:30 struck, -1; "row updated" |
| ⑥ B6 | 836–1002 | 12:10: the cron job deletes every row with expired_at <= now(). | playhead → 12:10 (window closes); strip → cron DELETE; rows struck, ghosted |
| B7 | 1002–1110 | One cleanup query removes expired and deleted rows alike. | none (poster) |

Chapters (10 f into their beats): a live key 0:03 · expired 0:09 · hidden 0:12 · deletes 0:17 · the sweep 0:28.

## 5. Poster and reduced-motion stills
Poster = frame 1109: the axis with the red window 12:02–12:10 labelled "expired, still on disk", the playhead at 12:10;
all three rows struck and ghosted with their histories (red ✕ "v1 not sent", "no disk IO", `-1` "row updated"); the
strip showing the cron's `DELETE FROM store WHERE expired_at <= now()`.
Reduced-motion stills: 80, 245, 352, 506, 654, 830, 996, 1109.

## 6. Page context
- **Predict (before the clip):** "A key expires at 12:00. The cron runs at 12:07. What does a GET at 12:03 return, and is the row still on disk?"
- **After the clip:** "Between expiry and the next cleanup run the row is still on disk, so every GET filters it in SQL. Deleting an already-expired key writes nothing; one cleanup query removes expired and deleted rows alike."

## Known limits
- The clock is sped up (10 minutes in about 25 s); the playhead's clock reading is the only time scale, no real durations are claimed.
- At the start of B6 the caption leads the strip by about 2 s: the DELETE k3 strip stays until the playhead reaches 12:10, then the cron query is written.
- Keys with no TTL (A-KSD-08) are not in the clip; the page caption and the final-query card carry the NULL/sentinel catch.
- Lane verdicts ghost only to 85% in the sweep (rows and lanes go to 38%) so the poster's summary stays readable.
- Full render-check record: `review.md`.
