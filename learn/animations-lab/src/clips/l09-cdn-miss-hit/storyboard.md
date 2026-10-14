# Clip l09-cdn-miss-hit: One fetch, then thousands of hits

Lecture 07 (folder lec09), §2.3 "Miss, hit, and "it's all bytes"". Spec: `storyboard.yaml` (same folder). Code:
`learn/animations-lab/src/clips/l09-cdn-miss-hit/` (`timeline.ts`, `CdnMissHit.tsx`).

## 1. The one idea
The origin hears about a photo once: the first request misses and the CDN fetches the same path; every later request
is answered from the CDN's copy, until that copy expires and one request refills it.

## 2. Why motion
Accumulation / rate plus a window. The static twin (Fig 2·b: user — cdn — origin) shows the two arrows but not how
often each is used. The clip makes the rate visible: two counters that diverge (cdn 1 → 1,000 → 1,200, origin 1 → 2),
and the ttl bar that empties and triggers the one refetch (L-0043's "a few requests every time the cache invalidates").

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0036 | First request: nothing cached, so the CDN itself requests the same path from the origin; the origin answers as usual; the CDN caches it and sends it to the user. | B1: blue request to the cdn, `miss`, graphite fetch cdn → origin with the same `GET logo.png`; B2: green chip back, stored in the slot, sent on to the viewer. |
| L-0037 | The next request for the same path is served directly from the cache. | B3: later requests each answered green from the slot, `✓ hit`. |
| L-0038 | That is all a CDN does: cached data if it has it, otherwise the same path from the origin. | B4 replays the miss path once after expiry; poster label `on a miss` on the origin leg. |
| L-0043 | The CDN doesn't even let the request into the backend; only a few requests reach it each time the cache invalidates. | Origin counter stays at 1 through 1,000 requests; after expiry it moves to 2. Final caption "a few requests at the origin". |
| L-0034 (context) | The CDN swaps its host for the origin and keeps the path. | Hosts under the glyphs (`a.mycdn.net`, `arpitbhayani.me`), same `GET logo.png` label on both legs. |
| L-0058 (context) | The CDN keeps the copy until the TTL expires (or an explicit invalidation). | The `ttl` bar drains; at empty the copy leaves the slot. Invalidation stays in §2.6 prose. |

**Not claimed:** any number from the class (counts are illustrative; captions say "every later request", "over a
thousand"); a TTL value (24 h CloudFront default stays in prose); that every response is cacheable (fact-check on
L-0036/L-0040: origin `Cache-Control` and CDN policy decide; prose right after the clip); geography or many edge
nodes (L-0039); invalidation API; cost (L-0044). The miss leg is graphite: a miss is not a failure. Time is compressed
and labelled `(not to scale)`.

## 4. Beats (30 fps, 1080 frames = 36 s)
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | One photo URL, one CDN. Its cache is empty. | nothing (static figure, counters 0) |
| ① B1 | 90–280 | First request: a miss. The CDN fetches the same path from the origin. | blue request viewer 2 → cdn + `GET logo.png`; `miss`; graphite fetch cdn → origin + `GET logo.png`; origin 1 |
| ② B2 | 280–420 | It keeps a copy and sends it back. | green chip origin → cdn; chip into the slot, ✓, ttl full; green chip → viewer 2 |
| ③ B3 | 420–690 | Every later request is a hit. The origin never hears about it. | `✓ hit`; three single hits, then a stream; cdn counter → 1,000; origin stays 1 |
| ④ B4 | 690–970 | When the copy expires, one request refills it. | ttl empties (740), slot empties, `miss`; one request, one graphite fetch, origin 2; refill; hits resume, cdn → 1,200 |
| B5 | 970–1080 | Over a thousand views, a few requests at the origin. | `on a miss` written by the origin leg; hold |

Caption reading rates (chars / seconds up): B0 43/3.0 = 14.3; B1 69/6.3 = 10.9; B2 34/4.7 = 7.3; B3 62/9.0 = 6.9;
B4 46/9.3 = 4.9; B5 52/3.7 = 14.1. All ≤ 17 cps and ≥ 2.5 s.

Chapters (10 frames into each beat): first request: miss (100) · keep a copy (290) · later requests: hits (430) ·
copy expires (700).

## 5. Poster and reduced-motion stills
Poster = frame 1079: three viewers + `and many more`, the cdn with its copy in the slot (✓) and a part-drained ttl
bar, `✓ hit`, `1,200 requests` under the cdn, `2 requests` under the origin, `on a miss` beside the origin leg. Without
the caption it reads: many requests stop at the cdn, the origin is asked only on a miss.
Reduced-motion stills: 272, 412, 682, 962, 1079.

## 6. Page context
- **Predict (before):** "A thousand people open the same photo in one minute. How many requests reach the origin?"
- **Page caption:** "The first request misses and the CDN fetches the same path from the origin; every later request is a hit. The
  origin hears from the CDN again only when the cached copy expires."
- **After:** "That is all a CDN does: cached bytes if it has them, otherwise the same path from the origin. And it doesn't
  care what those bytes are."

## 7. Phone layout (720 × 960)
Top to bottom: three viewers in a row → a bus → the trunk down into the cloud → the miss leg down to the origin.
Hosts and counters (number, then `requests`) sit to the right of the cloud and of the origin; `miss` / `✓ hit` left of
the cloud; `GET logo.png` right of the trunk and of the miss leg. 30 px lettering, 32 px captions, band at 790.

## Known limits
Reviewed (see `review.md`): two render-check rounds, wide + phone, paper + blackboard, mp4 strips at 4.8 s, 9.8 s and
24.6 s.
- The counts are illustrative (1,000 / 1,200 / 2). The class gave no numbers.
- One edge node only. Geography (L-0039) is not shown.
- One refetch per expiry stands in for "a few requests every time the cache invalidates".
- The cacheability caveat (Cache-Control, CDN policy) lives in the prose after the clip.
- The path is shortened to `logo.png`. Fig 2·c shows the full URLs.
