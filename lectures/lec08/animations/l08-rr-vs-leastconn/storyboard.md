# Storyboard: Why long requests pile up (l08-rr-vs-leastconn)

**Lecture 05 (folder lec08), §2.4.** 34.7 s at 30 fps (69.3 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Phone composition 720×900.

## The one idea
Round robin deals requests in turn without looking, so under high variance the long requests can pile onto one server that is already busy while the others sit idle. Least connections sends each request to the server with the fewest open connections, so the long ones spread out.

## Why this needs motion
Fig 2·c lets the reader study the teacher's five-request walkthrough one state at a time. The clip adds what a still can't show: time passing. Long bars keep growing while round robin's rotation keeps coming back to the same server. The two panels' connection counts drift apart from the same stream, ending at 3, 0, 0 for round robin and 1, 1, 1 for least connections.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0053 | Round robin: requests go across the servers in turn (1, 2, 3, 1, 2, …) | Top panel deals 1→s1, 2→s2, 3→s3, 4→s1, …; note "its turn" when 7 lands on busy s1 |
| L-0070 | Least connections: forward to the backend with the fewest connections from the LB | Bottom panel; note "fewest" when 7 goes to s2 (counts 1, 0, 0) |
| L-0072 | The LB tracks active connections per backend; a finished request frees its connection | A live count in every server box: +1 when a request arrives, −1 when its bar ends |
| L-0074 | Least connections picks the least burdened machine at the moment | Requests 7 and 10 go to servers with 0 open connections |
| L-0075 | High variance: some requests take a second, some an hour | Short bars that end quickly vs. long bars that keep growing; no durations named |
| L-0077 | Blunt round robin under high variance: all the long requests get bogged onto one already-busy server | Requests 4, 7 and 10 stack on round robin's s1 (count 3, red ring) while s2 and s3 are "idle"; header "long ones pile up" |
| L-0078 | Very large variance in response or processing times → least connections | Closing caption; bottom header "spread out ✓"; counts 1, 1, 1 in green |

**Not claimed:** any request duration or response time; queueing inside a server; CPU or memory (the LB never sees them, L-0079, which is the "after" line); that least connections is optimal (it is a local heuristic, L-0090); a tie-break rule (ties are resolved in turn order, which is one possible "pick one at random" outcome, L-0089). The long requests falling on every third arrival is the case the teacher described, not a claim about all workloads. Time is labelled "time (not to scale)".

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–100 | Two load balancers, same requests, same three servers. | Nothing. Two panels, counts 0, empty tracks. |
| B1 | 100–280 | While every request is short, both look the same. | Requests 1, 2, 3 go to s1, s2, s3 in both panels (blue packet along the fan line, pen re-ink). Each short bar ends, turns graphite, and the count goes back to 0. The playhead starts. |
| B2 | 280–466 | Request 4 runs long and keeps s1 busy. 5 and 6 come and go. | Request 4 goes to s1 in both, and its bar keeps growing. Requests 5 and 6 (short) go to s2 and s3. |
| B3 | 466–620 | Request 7 is long too. Round robin: s1 again. Least connections: s2. | Top: 7 goes to s1, count 2, red dashed ring, "its turn". Bottom: 7 goes to s2, count 1, "fewest". |
| B4 | 620–880 | Round robin keeps dealing long work to busy s1; s2 and s3 sit idle. | Requests 8, 9 (short) and 10 (long). Top: 10 goes to s1, count 3; "idle" beside s2 and s3. Bottom: 10 goes to s3, count 1. |
| B5 | 880–1040 | Big variance in response times? Use least connections. | Headers: "long ones pile up" (red, top), "spread out ✓" (green, bottom); the bottom counts 1 1 1 turn green. The clock stops at 940; static poster hold. |

## Poster / reduced motion
- **Poster:** frame 1039. Top: s1 count 3 in red inside a red ring, three long blue bars stacked on its track, s2 and s3 at 0 with "idle", header "long ones pile up". Bottom: counts 1, 1, 1 in green, one long bar per server, header "spread out ✓".
- **Reduced-motion stills:** 90, 270, 456, 610, 870, 1039.

## Page context
- **Predict (before the clip):** "Some requests take a second and some take an hour. Which algorithm keeps one server from drowning?"
- **AnimationClip caption:** "Round robin keeps dealing long requests onto a server that is already busy; least connections sends them to a free one. Under high variance, use least connections."
- **After:** "The load balancer only counts connections; it never sees CPU (2.5)."

## Review log
See `review.md` (same folder) for the render-check rounds and known limits.
