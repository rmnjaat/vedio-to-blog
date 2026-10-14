# Clip l09-signed-url-expiry: A forwarded URL, before and after it expires

Lecture 07 (folder lec09), §5.2 "Anatomy of a signed URL". Spec: `storyboard.yaml` (same folder). Code:
`learn/animations-lab/src/clips/l09-signed-url-expiry/` (`timeline.ts`, `SignedUrlExpiry.tsx`).

## 1. The one idea
The CDN checks the URL, not the person: a forwarded signed URL works for anyone until its expiry, then for no one, and
changing the expiry breaks the signature.

## 2. Why motion
A window in time. Fig 5·a shows the forwarded URL opening; Fig 5·b names `oh` and `oe`. Neither shows that the same
URL in the same hands works and then stops working as the clock passes the expiry. The clip puts one URL on one time
track: a playhead moves 0 → 2 (photo) → 10 (refused), and the red span past minute 5 grows as it crosses the mark.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0172 | Privacy is enforced in the API server; for a private account it won't send the response to a non-follower; only it has the database. | B1: B asks the api, which checks `follows A?` ✓ before replying; C never asks the api. Poster: `decides who / gets the URL`. |
| L-0169 | Timed signatures, like JWT: an expiry baked into the URL and a signature so no one can change it; the CDN validates both. | The key tag holds `oh=…` / `oe=…` and a clock; the cdn's checklist `signature`, `not expired`; B5: editing `oe` fails the signature. |
| L-0164 | A follower copies a photo URL and sends it to a friend who doesn't follow: the friend sees it. | B2: dashed copy B → C (not a call); B3: C gets the photo. |
| L-0162 | If a photo is on the CDN, anyone with the URL can access it. | B3: C, `not a follower`, gets the green photo chip. |
| L-0177 | If the expiry is, say, five minutes, requests after five minutes are not served. | Track: valid span 0 → 5, red mark at 5; B4 at minute 10: `not expired` ✕, refused. |
| L-0178 | CDN extracts the parameters, checks the signature's validity and that the URL hasn't expired; image, otherwise bad url. | Checklist order signature then expiry each attempt; results `photo` or `bad url`. |
| L-0168 | The CDN has no authentication of its own and is stateless: it doesn't know you are B or that you follow A. | The cdn has no follow check; poster `knows no one`. |
| L-0170 (context) | `oe` is most probably the expiry (a guess), `oh` the hash. | Track label `oe: expiry (most probably)`. |
| L-0163 / SN-04 (context) | URL short-lived; more precisely the expiry is checked per request, however long the photo stays cached (A-CDM-13). | B4 caption "even with the photo still cached"; the slot keeps the photo throughout. |

**Not claimed:** HTTP 403 or any status code; the demo's "Bad URL timestamp" (that was for removed parameters,
L-0171, kept in prose); how the signature is computed; signing keys or certificates (the checklist says `signature`,
per the L-0169 clarification); real minute values (2 and 10 are illustrative; `time (sped up)`); `oe=later` is an
illustrative edit. Sourced addition: A-CDM-13 (expiry checked at request time).

## 4. Beats (30 fps, 1200 frames = 40 s)
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | A's account is private. B follows A; C doesn't. | nothing (static figure) |
| ① B1 | 90–332 | The API server checks the follow and gives B a signed URL, valid 5 minutes. | blue request B → api + `GET /users/A/posts`; `follows A?` ✓; green reply; B's tag inked; green span 0→5, red mark, `oe: expiry (most probably)` |
| ② B2 | 332–432 | B copies the URL to C. | dashed path; the copy slides down to C |
| ③ B3 | 432–638 | Minute 2: signature valid, not expired. C sees the photo. | playhead → 2; C → cdn; ✓ ✓; green photo chip back, `photo`; stamp ✓ photo |
| ④ B4 | 638–880 | Minute 10: expired. The CDN refuses, even with the photo still cached. | playhead → 10, red span grows past 5; C → cdn; ✓ then ✕; red packet, `bad url`; stamp ✕ expired |
| ⑤ B5 | 880–1054 | Change the expiry and the signature no longer matches. | `oe=…` → red `oe=later`; C → cdn; signature ✕; red packet, `bad url` |
| B6 | 1054–1200 | The CDN checks the URL, not the person. | `decides who / gets the URL`, `knows no one` written; hold 2.6 s |

Caption rates (chars / seconds up): B0 47/3.0 = 15.7; B1 75/8.1 = 9.3; B2 22/3.3 = 6.6; B3 57/6.9 = 8.3;
B4 70/8.1 = 8.7; B5 54/5.8 = 9.3; B6 39/4.9 = 8.0. All ≤ 17 cps and ≥ 2.5 s.

Chapters (10 frames into each beat): B gets a signed URL (100) · B copies it to C (342) · minute 2: the photo (442) ·
minute 10: expired (648) · edit the expiry (890).

## 5. Poster and reduced-motion stills
Poster = frame 1199: track with ✓ photo at 2, the valid span to 5, `oe: expiry (most probably)`, red past 5, ✕ expired
at 10; B (follower) with the tag and the api's `follows A?` ✓ + `decides who / gets the URL`; C (not a follower) with
the tag edited to red `oe=later`; the cdn with its cached photo, checklist `signature` ✕, `bad url` on C's line,
`knows no one`. Without the caption it reads: the api decides who gets the URL; the cdn only checks it.
Reduced-motion stills: 326, 426, 632, 874, 1048, 1199.

## 6. Page context
- **Predict (before):** "A follower forwards a photo URL with a five-minute expiry. The friend opens it after two minutes, and again after ten. What happens each time?"
- **Page caption:** "The CDN checks the URL's signature and expiry, not the person: a forwarded URL works until it expires, and changing the expiry breaks the signature."
- **After:** "So the CDN never decides who may see a photo. The API server does, by deciding who gets the URL (5.3)."

## 7. Phone layout (720 × 1000)
Same two rows, narrower: track across the top (`time (sped up)` and `oe: expiry (most probably)` under it), B → api
(`follows A?` and the poster label under the box), the checklist above the cloud, C → cdn, tags left of each person
with the copy path at x 200, the result label under C's line, `knows no one` under the cloud, caption band at 828.
Lettering 30 px, captions 32 px.

## Known limits
- 40 s is the upper bound of the clip length (80 s at 0.5×); the beats carry six distinct events and none was cut.
- The checklist sits above the cloud, between the api and the cdn; its proximity (touching the cloud's top) and the
  marks appearing only when C's request arrives tie it to the cdn.
