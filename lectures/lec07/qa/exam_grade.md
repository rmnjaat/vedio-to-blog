# Lecture 07 - blind-reader exam grade (round 1)

- Key: `lectures/lec07/qa/exam.json` (120 questions)
- Blind answers (built page only): `lectures/lec07/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, who/what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 117 |
| partial | 3 (Q053, Q057, Q065) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**117/120 correct (97.5%); 118.5/120 = 98.8% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q053 | partial | The LFU shape as drawn: a zig-zag line that keeps rising, like a stock chart | **Present but distorted.** Fig 3·c (`s3-eviction-and-expiry.mdx` 184-188; `s3-eviction-and-expiry-3c.tsx` DESC line 10) redraws LFU as a line that "keeps coming back up", "reads dip and come back again and again". The board's D-08 (board_log 160) is a zig-zag rising line with an arrow, stock-price style, which links the drawing to the stock analogy at line 178. The LRU side (spike decaying to a flat tail) came through. | Redraw the LFU panel as a zig-zag that trends upward, ending in an arrow. DESC: "Right, suited to LFU: a zig-zag line that keeps rising, like a stock chart (Wikipedia pages): reads dip and come back, and the trend is up." Caption (line 185): "Two access patterns, as drawn on the class board. LRU (news): a sharp spike that decays into a long flat tail. LFU (Wikipedia): a zig-zag line that keeps rising, like a stock chart; the stock you hold through a dip is LFU. Redrawn from the class board at 01:12 and 01:17." [L-0162 (B-034), L-0166] |
| Q057 | partial | What the board's "3/2" means: 3-way handshake **and 2-way teardown** | **Present but distorted.** `s4-protocol-and-concurrency.mdx` line 54 says "a three-way handshake and a teardown every time", dropping the teacher's "two-way" and the board's "3/2". The Fig 4·a desc (`s4-protocol-and-concurrency-figs.tsx` line 20) also says only "a teardown to close". Transcript 01:21:40: "three-way handshake, two-way tear down every time". | Line 54: replace "terminates the connection with a teardown" with "terminates the connection with what the class called a two-way teardown (the board wrote 3/2 beside the connection: 3-way handshake, 2-way teardown)", and "a three-way handshake and a teardown every time" with "a three-way handshake and a two-way teardown every time". Optional fact-check aside: "Strictly, closing a TCP connection takes a FIN and an ACK in each direction." Fig 4·a desc: "A note on the lowest line, 3/2, means a 3-way handshake to open and a 2-way teardown to close". [L-0182 (B-036)] |
| Q065 | partial | The recap board's first way to define "full": a cap on the max number of keys in the cache (hash table) | **Absent.** The recap paragraph `s3-eviction-and-expiry.mdx` line 144 renders L-0208 but gives only "zmalloc ... keeps a running total size". The board's two caps (board_log 219, L-0208 detail) never reach the page. The reader instead picked up `s2-one-node.mdx` line 205 ("number of keys x size of each pair"), which is the student's size function and a different idea. | Replace the last sentence of line 144 with: "How do you know the cache is full? The board's recap gave two ways: a cap on the max number of keys in the cache (the hash table), or a cap on the cumulative size of the values inserted, total_size += sizeof(obj), which is what zmalloc keeps by wrapping malloc ([§2.6](#s2-6)). You can trigger eviction only when you know the cache is full." (Board-only; not in the audio.) [L-0208 (B-045, B-046)] |

## Correct, with minor omissions (no fix required)

The answer has the key's substance but leaves something out:

- **Q001:** does not say that ETL/tiered storage was only an introduction.
- **Q025:** no PGSync example.
- **Q054:** no CDN. CDN is **absent from the page**: the recap board lists "LRU (CDN, Google News)" (board_log 214, L-0162 detail). Optional fix: at the end of `s3-eviction-and-expiry.mdx` line 182, add "The board's recap lists CDN next to Google News as an LRU example. [[L-0162]]"
- **Q092:** does not say "sorted array with binary search" (the reader gave it in Q094).
- **Q101:** does not mention "no load balancer".
- **Q104:** does not say that the redirect applies only to writes sent to replicas (the reader gave it in Q088), or that Sentinel/proxy setups exist.
- **Q108:** does not say that the instances read from one replica (the reader gave it in Q018).
- **Q109:** does not cover the "big messages = network IO" side of event workers.
- **Q114:** does not repeat the simplicity argument for single-threading (the reader gave it in Q076).
