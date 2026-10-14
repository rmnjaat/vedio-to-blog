# Storyboard: l06-invalidate · "The old face lingers" (§3.3, 39.7 s)

## 1. The one idea
After user 1 changes their photo, a CDN that only waits for its TTL keeps serving the old photo for up to a day or
two; a purge sent through Kafka and a worker closes that window almost at once, and the next request fetches the new
photo from the origin.

## 2. Why motion
A window in time. Fig 3·b panel b (the static twin) shows the invalidation path as boxes and arrows; it can't show
*how long* the wrong answer is served. The clip runs the same requests against two timelines: on "TTL only" every
request after the change comes back with the old photo (red ✕) until the TTL mark; on "with purge" the window is a
sliver and the same requests come back with the new photo (green ✓).

## 3. Faithful to the lecture
| ledger | what was said | how the clip shows it |
|---|---|---|
| L-0126 | once user 2 loaded user 1's photo it is served from the CDN to everyone; when user 1 updates it, the CDN copy must be invalidated | B0–B1: user 2's requests are answered by the cdn's cached v1, the origin is never touched; B2: the origin flips to v2, the cdn card goes red "old" |
| L-0127 | photos rarely change, so the TTL might be one or two days | B3: lane A, red window from "photo changed" to "TTL: 1–2 days", three old-photo answers ✕ |
| L-0128 | even with a long TTL, invalidate right away so the new photo renders (good UX) | B4–B6: the purge path, lane B's sliver; closing caption "Long TTL, plus a purge on change" |
| L-0129 | the photo-updated event goes to consumers whose job is to call the CDN's API to invalidate /h1; the next request misses, goes to the API, which reads DB + S3; the CDN caches and serves | B4: api ⇢ kafka (`photo_updated`), worker pulls, worker ⇢ cdn `purge /h1`, card ✕ removed; B5: request → miss → cdn → api, v2 back, cached, served ✓ |
| context L-0124, L-0125 | hit/miss flow; the API updates the DB and pushes an event to Kafka | the drawn arrows (cdn → api used only on a miss; api → db/s3; api ⇢ kafka) |

**Not claimed**
- No purge latency, no request rate, no real Gravatar TTL: the track says "time (not to scale)".
- Not that every browser shows the new photo at once (A-GD-13 browser-cache caveat stays in prose after the clip).
- The direct-call variant (the API calls the CDN itself, accepted in class) is not drawn; the page caption mentions it.
- v1/v2 are illustrative labels for old/new photo.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | The CDN holds user 1's photo. Visitors get it from the edge. | nothing: the diagram, empty lanes |
| B1 | 105–255 | User 2 and everyone else get it from the CDN, never from the origin. | two round trips user 2 ↔ cdn (blue in, green v1 back); ✓ ✓ on both lanes (shared past) |
| B2 | 255–435 | User 1 uploads a new photo. The origin has it; the CDN doesn't know. | user 1 → api (v2), api → db (v1→v2), api → s3 (+v2); change line on the track; cdn card red dashed, "old" |
| B3 | 435–715 | TTL only: the CDN keeps serving the old photo for up to 1–2 days. | lane A playhead runs to the TTL mark, red span behind it; three requests answered red (✕ on lane A); "old photo served"; "TTL: 1–2 days"; ✓ after it |
| B4 | 715–895 | Instead: an event on Kafka, and a worker calls the CDN's purge API. | api ⇢ kafka `photo_updated`; packet to the worker; worker ⇢ cdn `purge /h1`; ✕ on the card, card removed; lane B "purge" mark, red sliver |
| B5 | 895–1075 | Next request misses; the CDN fetches the new photo from the origin. | request in; cdn → api blue, "miss"; green v2 back, card v2 green; green to user 2; lane B ✓ at every request slot |
| B6 | 1075–1190 | Long TTL, plus a purge on change: the new face shows right away. | hold = poster |

Chapters (10 f into their beat): cached @115 · photo changes @265 · TTL only @445 · with a purge @725.

## 5. Poster and reduced-motion stills
Poster = frame 1189: the full diagram with the purge path drawn and the cdn holding v2 (green), db v2, s3 v1 v2;
lane A ✓✓ | ✕ ✕ ✕ under a long red span "old photo served" to "TTL: 1–2 days", then ✓; lane B ✓✓ | a red sliver to
"purge", then ✓ ✓ ✓ ✓. Without the caption it reads "same requests, two answers".
Reduced-motion stills: 95, 245, 425, 705, 885, 1065, 1189.

## 6. Page context
- **Predict (before the clip):** "User 1 changes their photo. With a two-day TTL and no invalidation, how long might user 2 see the old face?"
- **Caption under the clip:** see `review.md` (recommended wording, faithful to L-0127/L-0128).
- **After:** prose on A-GD-13 (a purge clears only the CDN's edges; browsers keep their copy; versioned names).

## Phone layout (720 × 970)
user 1 above the api; user 2 → cdn → api across the middle; db top right, s3 under it; worker (left) and kafka (under
the api) below; `photo_updated` under the pipe. Track: lane titles above each lane, "TTL: 1–2 days" right-aligned on
lane A's title row, "photo changed" and "time (not to scale)" under lane B. Lettering 30, captions 32.

## Known limits
Status: reviewed (see review.md).
- Lane A's TTL expiry and refill are shown on the track only; the diagram stays at "just after the change" until B4,
  so the B4 purge acts on the same cached v1 the TTL lane was talking about.
- In B3 the playhead (slow linear indicator) runs while each request round trip plays; the caption names both.
- At the purge, the card's ✕, lane B's purge mark and the red sliver appear together: one event, three marks.
- The ghosted (38%) blue "v2" by user 1 is faint on the blackboard poster by design (past context).
- `purge  /h1` shows the mono font's wide space; kept (identifier lettering).
