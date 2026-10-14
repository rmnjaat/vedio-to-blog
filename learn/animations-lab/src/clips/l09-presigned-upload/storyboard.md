# Storyboard: `l09-presigned-upload`, "The bytes leave your servers' path" (§3.3, 36 s)

## 1. The one idea
Through the API server every photo crosses its network card twice and a stream of them fills the card; with a pre-signed URL the app only asks the server for permission, then sends the photo straight to S3, and the server's bar stops moving.

## 2. Why motion
The problem is accumulation: one 5 MB upload is fine, a steady stream fills a physical network card and starves other calls. The fix is visible only over time: the uploads keep coming along the arc, but the api's bar stays near empty. The static twin (Fig 3·b row b + the RuleBox §3 sketch, board D-03) shows the two routes; the clip shows the load that moves with them.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0068 | naive flow: user uploads to the API server, which copies it to S3 | frame 0: user → api → s3, both solid; B1 the chip rides both legs |
| L-0078 | direct upload saves the service's bandwidth and the double transfer, 5 MB in, 5 MB out | B1 mono `5 MB in` / `5 MB out`; B5 `before: 5 MB in + out` vs `after: 5 MB, one trip` (no cost words, per the inline clarification) |
| L-0072 | constant 5 MB requests eat the API servers' bandwidth; every network card has a physical limit; other API calls suffer | B2 the `network card` bar fills a step per crossing, turns red, `full`; `GET /feed` (stand-in for other calls) outlined red, `waits` |
| L-0076 | first hit the API server for a pre-signed URL, then upload directly to S3 within its validity | B3 then B4, in that order |
| L-0081 | prepare: the service makes a random image ID and a short-lived URL for one path `s3://images/random_id.png`, sends it to the user | B3 thin blue `prepare` (no chip), green reply, tag mono `s3://images/<id>.png` |
| L-0084 | URL for a specific path, valid for a set time (10, 20, 30, 60 s) | clock + hand `valid 60 s` |
| L-0085 | full flow: client → service → URL to user → user uploads straight to S3 | B3 + B4; per the inline clarification the URL is signed locally, so **no api → s3 call** is drawn in B3 |
| L-0082 | upload phase: the user POSTs the image to the pre-signed URL | B4 mono `POST` on the arc |
| L-0077 | the upload does not go via the API server; it adds no load | B4 the arc passes above the api; the bar stays near empty while three photos go by |

**Not claimed:** no money, egress or bill (SN-01); no S3 call when signing; no units or numbers on the bar; the memory half of L-0072; no expiry event (clip `l09-signed-url-expiry`); PUT vs POST (prose).

## 4. Beats (30 fps)
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | A 5 MB photo, uploaded through the API server. | hold on the static figure |
| ① B1 | 90–300 | Each photo crosses the API server twice: 5 MB in, 5 MB out. | chip user → api (blue re-ink, `5 MB in`), bar +1; chip api → s3 (`5 MB out`), bar +1; photo 2 the same |
| ② B2 | 300–500 | Uploads keep coming. The network card fills; other API calls wait. | photos 3–6 stream; bar full → red, `full`; `GET /feed` → api, red dashed outline, `waits` |
| ③ B3 | 500–710 | Pre-signed: first ask for a short-lived URL for one path. No bytes yet. | before ghosts; thin blue `prepare` user → api; green packet back; key tag + clock `valid 60 s` |
| ④ B4 | 710–920 | Then the photo goes straight to S3. Your servers never touch it. | red fill replaced by a near-empty bar; blue arc user → s3 with chip, `POST`, green ✓; two more chips ride the arc |
| B5 | 920–1080 | One transfer per photo, and nothing to run in between. | `before: 5 MB in + out`, `after: 5 MB, one trip`; hold |

Chapter marks: 10 frames into ①–④ (100, 310, 510, 720).

## 5. Poster and reduced-motion stills
Poster = frame 1079: ghosted straight route with `5 MB in` / `5 MB out` and the waiting `GET /feed`; blue arc `POST` into s3 with ✓; the tag and `valid 60 s` by the user; the near-empty bar; the two summary lines. Reduced-motion stills: 292, 492, 702, 912, 1079.

## 6. Phone layout (720 × 1090)
A column: user at the top, api in the middle (bar to its right, `GET /feed` above the bar), s3 at the bottom; the straight route runs down the middle, the arc runs down the left edge into s3's left side, so it visibly bypasses the api. Tag, clock and the summary lines sit in rows under s3. Lettering 30, captions 32.

## 7. Known limits
- The bar's steps are illustrative (no unit); the chip held above the user stays drawn while a copy flies, standing for the next photo.
- The `prepare` call and the tag stay at full ink in ④ and the poster: they are half of the "after" route, not a past state.
- Status `reviewed` (render-check rounds recorded in `review.md`).

## 8. Page context
- **Predict (before):** "Your upload service handles 5 MB photos. How many times do those bytes cross a network your servers sit on, before and after pre-signed URLs?"
- **Caption:** "Through the API server, every photo crosses its network card twice and the card fills. With a pre-signed URL the app asks only for permission, then sends the photo straight to S3."
- **After:** "The bucket stays closed; only the holder of that one URL can write to that one path, until it expires."
