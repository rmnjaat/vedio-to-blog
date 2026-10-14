# Storyboard: l07-four-routes ("Four banks, one request")

Lecture 9 (folder `lec07`), §5.3 "Four ways to route: a visit to the bank". Spec: `storyboard.yaml` (frame numbers);
code timing: `learn/animations-lab/src/clips/l07-four-routes/timeline.ts`.

## 1. The one idea
The four ways to route differ in **who sends the next message**: the same request for `kiwi` costs 4 legs through a
proxy, 2 for a smart client, 4 when a desk forwards it, and 4 with **two client round trips** when the desk redirects;
the smart client's saving has a price: when a desk's job moves, its table is stale until it is told.

## 2. Why motion
A repeated protocol. Fig 5·b shows four paths side by side; it cannot show the order of the messages or who initiates
each. Forwarding and redirect have the same drawn lines (client → c1, then c2); only the order tells them apart: in
forwarding c1 sends to c2, in redirect c1 answers the client and the client goes again. The leg counter grows as each
message lands, so the cost is counted in front of the reader.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0249 | proxy = the peon at the door; you talk only to him and know nothing about the desks | panel ①: client → proxy → c2 and back; `the bribe` under the proxy; caption |
| L-0250 | smart client = the long-time customer who goes to the right desk; routing info in the client | panel ②: the table `kiwi → c2` sits with the client; one straight line to c2 |
| L-0251 | no intermediate hop: you save the bribe (network latency); if the bank moves the job, every client must be notified | `no middle hop`, `2 legs`; B5: the job moves to c3, the table turns `stale` (red ✕ on the old line); closing caption |
| L-0252 | no peon: go to the nearest desk; it forwards to the right desk, gets the response and sends it back | panel ③: client → c1, c1 → c2, answer back c2 → c1 → client |
| L-0255 | "I'm busy, go to counter number 13" and you go there yourself; DNS works this way | panel ④: client → c1, c1 answers `c1: go to c2`, client → c2 itself; `2 round trips` |
| context | L-0248 four ways via the bank; L-0245 the range table (kiwi is in k–t → c2) | the four panels; `kiwi → c2` |

**Not claimed:** no latencies or milliseconds (legs are counted messages, the page's illustration of L-0251); forwarding
is not labelled IPFS/BitTorrent (fact-check L-0253: their lookups are iterative, closer to redirect; prose only); nothing
about how the proxy, forwarding or redirect setups learn about the moved job; how a real cache moves data (§6).

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–96 | Four ways to reach desk c2, which holds the key kiwi. | hold on Fig 5·b in graphite |
| ① | 96–312 | The peon at the door: you talk only to the proxy. | blue client → proxy → c2; ✓; green answer lines penned back c2 → proxy → client (parallel to the blue, they stay); c1/c3 are headless wires; legs 1…4; `the bribe`; `· 1 round trip` |
| ② | 312–490 | The regular customer walks straight to the right desk. | panel ① ghosts; blue client → c2; ✓; green back; `no middle hop`; `2 legs · 1 round trip` |
| ③ | 490–700 | No peon: the nearest desk forwards it and relays the answer. | panel ② ghosts; blue client → c1, blue c1 → c2; ✓; green c2 → c1 → client; `4 legs · 1 round trip` |
| ④ | 700–944 | Redirect: the desk says “go to c2”, and you go there yourself. | panel ③ ghosts; blue client → c1; graphite answer back, `c1: go to c2`; blue client → c2; ✓; green back; `4 legs · 2 round trips` |
| B5 | 944–1076 | c2's job moves to c3. The smart client's table is now stale. | only panel ② at full ink; dashed move c2 → c3; red ✕ on the old line; red strike on `c2`; red `stale` |
| B6 | 1076–1182 | The smart client saves a hop but must hear every change. | all panels back to full: the poster |

Chapters (10 f into each beat): proxy 106 · smart client 322 · forwarding 500 · redirect 710 · a desk moves 954.

## 5. Poster and reduced-motion stills
Poster = frame 1181 (the last frame): four panels with their blue routes, ✓ at c2, counts `4 legs · 1 round trip`,
`2 legs · 1 round trip`, `4 legs · 1 round trip`, `4 legs · 2 round trips`, `the bribe`, `no middle hop`,
`c1: go to c2`, and the smart client's red ✕, struck-through `c2` and `stale`. Reduced-motion stills: 306, 484, 694,
938, 1070, 1181 (end of each beat, caption up).

Phone composition (720×1010, ≤ 640 px): the 2×2 grid re-flows into four stacked panels 218 px tall; each panel's
count moves onto its title row (right side); desks shift right to x 560 (110 wide, so the forwarding loop has room for the parallel answer line); 30 px lettering, 32 px captions; caption band
from y 890. Same timeline.

## 6. Page context
- **Predict line (before the clip):** "Same request, four banks. Which one costs the client two round trips?"
- **Figure caption:** "Proxy, smart client, forwarding and redirect differ in who sends the next message. The smart client skips the middle hop, but every client must hear about every topology change."
- **After:** → 5.4 "Which way for a cache?"

## Known limits
Reviewed (3 render-check rounds + mp4 strips; details in `review.md`).
- B5 shows only the smart client's cost of a topology change; nothing is claimed about how the other three learn of it.
- The forward c1 → c2 is solid (synchronous-request rule), where the board drew a dotted curve.
- The ✓ in c2 stays (ghosted) in B5; the red ✕ on the client's line, the strike and `stale` carry the failure.
- Phone count `4 legs · 2 round trips` ends ~13 px inside the canvas edge.
