# Lecture 9 (lec07) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 120 questions from `story/page_text.md` alone (`story/blind_answers.json`), using the questions-only file and nothing else. Step 2, the answers were graded against `qa/exam.json` without being changed. Where the key repeats a lecture claim that the fact-check corrected and the page carries the correction (segfault at the memory limit, 28 LRU bits, HTTP/1.1 connection per request, the 25% expiry threshold, replica writes returning the master's IP, SIGABRT, DNS/IRC as DHTs, the 52,000 kernel lists), the answer is graded against the key but the cause is CUT-OK (fact-check correction).

## Score

| | count |
|---|---|
| correct | **93** |
| partial | 16 |
| wrong | 3 |
| missing (NOT ON PAGE) | 8 |
| **total** | 120 |

- Strict: **93 / 120 (77.5%)**
- Half credit for partials: **101 / 120 (84.2%)**
- The old long version scored 117/120 (97.5%; 98.8% with half credit), from `qa/exam_grade.md`.

Causes of the 27 non-correct answers: CUT-OK 21 (8 of them fact-check corrections), CUT-LOSS 4, PAGE-ERROR 0, READER-MISS 2.

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q001 | Agenda's two items | partial | CUT-OK | Board agenda. Reader gave CDC + build Redis; key names "ETL and tiered storage". The page's Fig 2·c note ("tiered storage: introduced here") carries it. |
| Q002 | Day-zero components; why DB not exposed | partial | CUT-OK | Components right; "the API abstracts the database's complexity" (L-0012) is framing. Optional in §1.1 Fig 1·b caption: "the API hides the database's complexity from them". |
| Q023 | Is CDC like Server-Sent Events? | missing | CUT-OK | Student Q&A tangent. |
| Q032 | 1025th malloc of 1 MB | wrong | CUT-OK (fact-check) | Key: segfault. Page correctly says malloc returns NULL or the OOM killer ends the process (L-0104 wrong/medium). |
| Q040 | 1 GB limit: hard or soft? | partial | **CUT-LOSS** | §4.3, after "...under the default, noeviction, it refuses the write with an error, the other branch of our design." add: "Because the check runs once per command, not inside every allocation, a single command can push memory briefly past the cap: maxmemory is a soft limit." (L-0127, fact-check accurate: Redis docs say a command can temporarily exceed it.) |
| Q043 | Where/how many bits for LRU info | partial | CUT-OK (fact-check) | Key: 4 + 28 bits. Page: 4 type + 4 encoding + 24 LRU = 32 (L-0139 imprecise). Location and "one integer" right. |
| Q046 | Where linked lists fit | partial | CUT-OK (fact-check) | Key: the Linux kernel (52,000 lists at boot, L-0151 unverifiable). Page keeps the principle ("fine where memory is not the constraint"). Optional: "The Linux kernel, for one, is full of them." |
| Q051 | Stock-market analogy for LFU | missing | **CUT-LOSS** | §5.4, after "When the fad passes, they are read as much as ever." add: "It is how you hold a stock you trust: it did well for years and dipped this week, and you keep it instead of selling on recent performance. LFU treats a key the same way and ignores recency." (L-0166, core.) Also restores the link the board drew between the stock chart and LFU (Q053, Q112). |
| Q053 | Access-pattern shapes drawn | partial | CUT-OK | Board drawing (LRU spike-and-tail, LFU rising zig-zag). Page describes both lives in prose; the Q051 sentence supplies the stock-chart image. |
| Q054 | Classic LRU examples | partial | CUT-OK | Google News given; viral reel song and CDN (board recap) absent. Optional in §5.4 after Google News: "So does a song trending on reels, or a CDN's newest files." (L-0162) |
| Q057 | Why HTTP/1.1 is inefficient; "3/2" | wrong | CUT-OK (fact-check) | Key: new TCP connection per request, 3-way handshake / 2-way teardown. Page correctly says HTTP/1.1 keeps connections open by default and the cost is text (L-0182 wrong/medium, L-0206). |
| Q060 | Lesson of the netcat POST | partial | READER-MISS | §6.2 says it plainly ("the more you send, the more it has to process", 117 vs 27 bytes); the reader answered with the envelope point from §6.1. No change. |
| Q063 | Which protocol; support several? | partial | **CUT-LOSS** | §6.2, gRPC paragraph, after "Otherwise define your own format and publish it, as Redis did with RESP." add: "You need not choose only one: open a port per protocol over the same hash table and make it configurable." (L-0200) |
| Q065 | Recap board: two ways to define "full" | partial | CUT-OK | Board recap (L-0208): a cap on the number of keys, or on total bytes. Page carries the bytes cap only; reader guessed the keys cap. Optional, §4.2 after "values differ wildly in size": "You could cap the number of keys instead, but a cap in bytes is what protects RAM." |
| Q069 | Sampling expired keys | partial | CUT-OK (fact-check) | Steps right; threshold is the corrected ~10%, not the key's 25% (L-0218 outdated). |
| Q071 | How to scale a single-node cache | wrong | **CUT-LOSS** | §7 intro, before "Then the blog outgrows it:" add: "On one node there is only one way to grow: vertically, with more RAM, CPU and network on the same machine." (L-0221) Reader answered "run copies per core", which the page presents in §6.5. |
| Q077 | Memory-efficient LRU/LFU and its trade-off | partial | READER-MISS | Reader gave "few bits + sampling, trade exactness for memory"; key's "better time costs space" is on the page (§5.2 "buy time, pay space"). No change. |
| Q085 | Bank way 3: forwarding, which systems | partial | CUT-OK | Internet given; key adds BitTorrent and IPFS (L-0308). Page names both in §9.3 as DHTs where "any node can point you onward". |
| Q088 | How Redis uses the redirect | partial | CUT-OK (fact-check) | Key: a replica returns the master's IP for writes. Fact-check (L-0261, L-0326 imprecise/medium): a plain replica rejects writes; address redirects are Redis Cluster's MOVED, which the page gives. |
| Q100 | Uses of DHTs on the board | partial | CUT-OK (fact-check) | Board list; DNS and IRC are not deployed DHTs (L-0311). Page keeps the true ones, BitTorrent and IPFS. |
| Q101 | What Kademlia solves | missing | CUT-OK | DHT routing aside (L-0314, L-0313). §9.3's "any node can point you onward" carries the idea. |
| Q108 | How several CDC instances coordinate | missing | CUT-OK | Student Q&A tangent. |
| Q111 | A 1024-byte set fills up | missing | CUT-OK | Student Q&A (realloc and copy). |
| Q115 | Signal at memory limits; which limits | partial | CUT-OK (fact-check) | Key: SIGABRT. Page: OOM killer sends SIGKILL, ulimit gives ENOMEM, SIGABRT only from abort() (L-0359 imprecise/medium). Malloc-library limits (jemalloc/tcmalloc) not on page. |
| Q116 | Shared locks, both writes go through | missing | CUT-OK | Lecture 3 locking Q&A; belongs there. |
| Q117 | Does a deadlock crash the DB? | missing | CUT-OK | Lecture 3 Q&A. |
| Q118 | Is connection pooling a language property? | missing | CUT-OK | Q&A tangent. |

Graded correct though the reader marked them uncertain: Q027 (brainstorm order matches the page's §3 order exactly), Q082 (routing box, then into the client, Fig 7·c), Q112 ("partly"; past popularity predicts future).

## What was lost

- **Mostly Q&A residue and board lists (13 CUT-OK, not counting fact-check corrections).** The late Q&A (SSE, CDC coordination, set resizing, shared-lock writes, deadlocks, connection pooling) and board lists (agenda, DHT uses, Kademlia, the recap's two caps, the drawn access shapes) are gone. A reader following the story doesn't need them.
- **Fact-check corrections work as intended (8 CUT-OK).** Every miss on the segfault, 28 bits, HTTP/1.1 per-request connections, the 25% threshold, replica-write redirects, SIGABRT and DNS/IRC-as-DHT is the page being right where the key repeats the lecture's claim.
- **Four real gaps (CUT-LOSS), one sentence each:**
  - **Stock analogy for LFU (Q051, L-0166, core).** The teacher's main device for "no recency bias" is gone; the Wikipedia example carries the rule but not the image. §5.4.
  - **Single node scales only vertically (Q071, L-0221).** Without it, the move to many nodes in §7 has no "why not just a bigger box". §7 intro.
  - **maxmemory is a soft limit (Q040, L-0127).** The page's per-command check implies it but never says it. §4.3.
  - **Offer several protocols (Q063, L-0200).** §6.2.
- **No PAGE-ERROR in exam terms.** One unrelated slip noticed while reading: under Fig 8·c the step hint reads `#fig-8d/step-3` while the figure is 8·c (Fig 6·c's hint matches its own number). Worth checking the anchor.

Net: four sentences (§4.3, §5.4, §6.2, §7) recover all four CUT-LOSS items. The 24-point drop from the old long version (117/120) is mostly intended cuts and fact-check corrections.
