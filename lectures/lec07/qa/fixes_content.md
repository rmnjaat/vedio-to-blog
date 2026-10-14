# Lecture 09 (lec07): content fixes

Files changed:
- `site/src/content/lectures/lec07/`: s0-header, s1a, s1b, s2, s3, s4, s5, s6a, s6b, s7
- text only in `site/src/figures/lec07/s3-eviction-and-expiry-3c.tsx` (Fig 3·c label, DESC, header comment) and `s4-protocol-and-concurrency-figs.tsx` (Fig 4·a "3/2" labels and desc, Fig 4·f CAS labels and desc)

Every change was checked against `lectures/lec07/transcript/transcript.md`, `ledger/ledger.jsonl`, `board/board_log.md` and `factcheck/final.jsonl` before it was made. Two sources were opened with WebFetch for new or newly placed outside facts:
- redis.io persistence page: "the commands are appended to the AOF after a batch of commands … are executed" (F-001)
- man7.org malloc(3): returns NULL on error; "one or more processes will be killed by the OOM killer" (F-005)

Verification:
- **Gates.** `pipeline/bin/site.sh gates lec07 lectures/lec07/qa/gates_content_fix.txt`: build ok (11 pages), COVERAGE PASS 374/374 placed ids, zero broken links, figures ok at 360/390/768/1440 light and dark, then **GATES PASS**.
- **Tags.** No `[[L-…]]` or `k=` tag was removed. Tags added:
  - s1a: `L-0065` on Clip 1·1's `k=`
  - s3: `[[L-0162]]` (CDN), `[[L-0175]]` (margin-note prose)
  - s6b: a second `[[L-0319]]`

## 1. Blind exam (exam_grade.json)

| Q | Change |
|---|---|
| Q053 | Fig 3·c caption (`s3-eviction-and-expiry.mdx`) now reads: "Two access patterns, as drawn on the class board. LRU (news): a sharp spike that decays into a long flat tail. LFU (Wikipedia): a zig-zag line that keeps rising, like a stock chart; the stock you hold through a dip is LFU. Redrawn from the class board at 01:12 and 01:17." This matches board_log line 160 (D-08: "zig-zag rising line with an arrow, stock-price style"). In `s3-eviction-and-expiry-3c.tsx`, the LFU hand label "keeps coming back" is now "zig-zags up, like a stock", and DESC says "a zig-zag line that keeps rising, like a stock chart … the trend is up". The drawn LFU curve already zig-zags upward (y 30 → 108); the board's end arrow is a drawing change for the design fixer. Tags kept: `k="L-0166 L-0168 L-0170 L-0172"`. |
| Q057 | `s4-protocol-and-concurrency.mdx` §4.1, the L-0182 paragraph: now "terminates the connection with what the class called a two-way teardown (the board wrote 3/2 beside the connection: 3-way handshake, 2-way teardown) … a three-way handshake and a two-way teardown every time". This follows transcript 01:21:40 and board_log line 164. The existing SourceNote already says that closing takes a FIN and an ACK in each direction (RFC 9293). Fig 4·a labels now read "3/2: 3-way open, 2-way close" (desk) and "3/2: 3-way open / 2-way close" (phone). Fig 4·a desc: "A note on the lowest line, 3/2, means a 3-way handshake to open and a 2-way teardown to close". The caption names the "3/2" note. `[[L-0182]]` |
| Q065 | `s3` §3.3 recap: the zmalloc sentence was replaced with: "How do you know the cache is full? The board's recap gave two ways: a cap on the max number of keys in the cache (the hash table), or a cap on the cumulative size of the values inserted, `total_size += sizeof(obj)`, which is what zmalloc keeps by wrapping malloc (§2.6). You can trigger eviction only when you know the cache is full. (The key-count cap was on the board only, not in the audio.)" Source: L-0208 detail and board_log line 219. `[[L-0208]]` |
| Q054 (optional, minor omission) | `s3` §3.4, after the Google News sentence: "The board's recap lists CDN next to Google News as an LRU example." `[[L-0162]]` (board_log line 214) |

## 2. Faithfulness audit (faithfulness.json)

| id | Change |
|---|---|
| F-001 | `s6b` §6.7: "which the class called Redis's write-ahead log" (transcript 02:28:51). Added: "Strictly, Redis appends commands to the AOF after they are executed, so the AOF is a log of writes rather than a write-ahead log", with a Cite to redis.io persistence (opened). `[[L-0319]]` |
| F-002 | `s6b` §6.6: "As it was put on the board" changed to "As it was put in class" (L-0305 is audio-only). `[[L-0305]]` |
| F-003 | `s6b` §6.5: "ten or twenty per machine" replaced with "(the question in class put it at "10 or 20 or something")" (transcript 02:34:43). `[[L-0332]]` |
| F-004 | `s1a` margin note: now "Several CDC instances can read the same source, active-standby or all active: "active standby both works" came up inside the question itself, so who said it is unclear." The existing PostgreSQL one-receiver clarification follows unchanged. `[[L-0343]]` |
| F-005 | `s2` §2.4, L-0103: "It doesn't change the ending" replaced with "Running out of heap does not cause a segfault by itself either: `malloc` returns NULL, or on Linux with overcommit the OOM killer ends a process when the pages are touched (man7.org Cite, opened) (more in the note below)." This applies the L-0103 inline treatment in full. `[[L-0103]]` |
| F-006 | `s3` §3.3: "too deep for this page" changed to "the class did not go into ("It would take me three years to talk about it")". `[[L-0154]]` |
| F-007 | `s3` §3.1: added "(the instructor first said 24, then settled on 28, the figure on the board)". `[[L-0139]]` |
| F-008 | `s4` end of §4.5: "The board briefly carried a fun exercise, erased soon after: …". `[[L-0225]]` |
| F-009 | `s4` TradeoffTable: "About 117 in Fig 4·b's example: headers dwarf the data". `k: 'L-0193'` kept. |
| F-010 | `s7`: "Two storage engines, built on our own." (transcript 03:05:34). `[[L-0376]]` |
| F-011 | `s1a` §1 opener: "Production runs on a transactional database, MongoDB say, and it holds everyone's personal data." This keeps the L-0019 hedge and the board's "Transactional Database like MongoDB". |
| F-012 | `s1a` Clip 1·1: `k=` now includes `L-0065`. The caption now says "and, after the CDC tool has been down, resumes from its checkpoint." |

## 3. Design critique, content-owned (critic.json)

| id | Change |
|---|---|
| C-01 | `s4` pause-and-think verdicts: the verdict is set with `textContent`, so markup shows literally. `<code>SET a 1</code>` and `<code>set a 1</code>` are now "SET a 1" and "set a 1" in quotes. A grep of every lec07 `right=`/`wrong=` string finds no other tags. `q=` is rendered with `set:html`, so its `<code>` stays. |
| C-04 | `s5` Fig 5·c caption now explains the split in one clause: "with the board's own split (a–j, k–p, q–z) rather than the a–j, k–t, u–z used earlier in this chapter; the board's second range, written [j–p], is a slip of the pen for [k–p]". The board's range was kept rather than changed, to stay faithful to D-17. |
| C-06 | All five "byte budget" run-in labels were removed: s2 §2.3, and s3 §3.1, §3.2, §3.3 and §3.5. In §3.3 "What it saves…" now starts its own paragraph. The s3 header comment was updated. `[[L-0157]]` and the other tags were kept. |
| C-07 | Voice pass across the page. All gendered pronouns for the teacher are gone (he/his/him: 0 left). "The instructor" dropped from about 30 uses to 9. The 9 that remain are attributions that the fact-check policy or the audit requires (war stories and hedges: L-0001/2, L-0003, L-0053, L-0139, L-0158, L-0183, L-0340, L-0341, L-0349). Changes: <br>- **s0:** About-this-class compressed and pronoun-free; Amazon and the Redis source reading are recast as "taught from practice" and "a reading of the Redis source". <br>- **s1b:** "A consulting case from the instructor's own practice…"; Fig 1·f caption is now "A consulting case: … (as told in class)"; "by his account" became "by this account". <br>- **s2:** the course plug is shortened to "(a separate Redis-internals course goes further)" (L-0004 is kept); "The instructor agreed" became "That was accepted, with an addition…" and "The reply in class agreed…". <br>- **s3:** L-0151 is "relayed second-hand in class"; L-0158 is "a case from the instructor's early career" (the ledger fact is kept); the 9-hour course note is "The class pointed to a separate Redis internals course…". <br>- **s4:** the IoT story is pronoun-free; "It was first called a property of the database in class"; the ForwardChip is "free Redis-internals videos"; "As told in class"; "The guess at the bug offered in class"; L-0366/L-0367/L-0368 are pronoun-free, with the hedges kept. <br>- **s5:** "The class pointed to a long video series…"; "the lecture was 100% sure only about…" (hedge kept, as the audit requires); the peon is "the peon", not "him". <br>- **s6a:** L-0300 is "consistent hashing run in production". <br>- **s6b:** "The lecture's preference…"; the Kademlia note is "The board said "watch my video on Kademlia"…". <br>Not done: the biography items that are ledger items (C grade, Amazon, consulting, eight months, the Kademlia video) were kept in short, attributed form, because removing them would drop placed ledger content. Where the critic and the audit conflict, the audit wins (as in Lecture 1). |
| C-08 | The correct option is now first on 4 of the 9 cards: ch2 card 2 (malloc wrapper), ch3 card 1 (linked-list LRU), ch5 (routing table) and ch6 card 1 (% N keys moved). No verdict refers to option position, so the verdicts are unchanged. ch3 card 2 "Right here:" is now "Right:". |
| C-16 | CAS is now written `CAS(a, 10 → 20)` / `CAS(a, 10 → 30)` everywhere: §4.5 prose, the Fig 4·f steps, the Fig 4·f labels and desc (`s4-protocol-and-concurrency-figs.tsx`), the TradeoffTable "Example" row and the recall answer. |

## For the design fixer
- Fig 3·c: the board's LFU line ends in an arrow (D-08); the redraw has no arrowhead.
- Fig 4·a desk label "3/2: 3-way open, 2-way close" is longer than before; it is centred at x=270 between the arrows, and the figures gate passed at all widths.
