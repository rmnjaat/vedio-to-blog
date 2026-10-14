# Lecture 07 ledger, part 2 (00:58:02 - 02:08:02): notes
File: `part2.jsonl`, 130 items (K2-001 .. K2-130), validator: PASS (0 errors, 0 warnings).

## Topic tree
- caching
  - eviction: K2-001, K2-004, K2-076 (recap)
    - lru: K2-002 · lfu: K2-003
    - metadata (LRU bits in the MyValue object): K2-006 .. K2-011
    - implementation (priority queue proposal, map + doubly linked list, 12-byte overhead, Linux 52,000 lists, Redis avoids lists, O(1) LFU time vs space): K2-005, K2-012 .. K2-021, K2-102
    - random: K2-023 .. K2-029, K2-101
    - lru-vs-lfu (scan, stock market analogy, Wikipedia, FIFA, social trends, Google News, how to choose): K2-030 .. K2-042
    - redis (too deep to cover, supports all three): K2-022, K2-043, K2-100
  - communication (TCP, HTTP/1.1 handshake cost, HTTP overhead, choosing a protocol, TCP not UDP, three options, prototype with gRPC): K2-045 .. K2-052, K2-063, K2-069, K2-070, K2-073 .. K2-075
    - http-over-raw-tcp (IoT/netcat story): K2-053 .. K2-058, K2-060 .. K2-062, K2-106
    - custom-protocol (RESP, Memcache, raw rules, why Redis chose it): K2-064 .. K2-067
    - grpc: K2-068
  - single-node > storage (recap): K2-072
  - ttl (minimum bytes, absolute expiry in object, no priority queue, lazy deletion, zfree, sampling 20 / 25%, Redis rationale): K2-077, K2-079 .. K2-086
  - memory-cap > zmalloc (Q&A: every allocation goes through zmalloc): K2-105
- scaling > vertical: K2-087
- concurrency: K2-088, K2-099
  - pessimistic-locking: K2-089, K2-090 · optimistic-locking: K2-091, K2-092
  - compare-and-swap: K2-093 .. K2-096 · single-threaded: K2-097, K2-103
- distributed-cache: K2-107
  - storage (key ranges A-J / K-T / U-Z): K2-109
  - routing (central router proposal, respond vs forward, four ways via bank analogy, trade-offs, IPFS/BitTorrent, DNS, load balancer, Redis replica redirect, which fits a cache): K2-110 .. K2-128
  - scaling (adding a fourth node - question carried into part 3): K2-130
- learning approach: K2-059
- admin: agenda K2-071, K2-104, K2-108 · resources K2-044, K2-098 · back-reference K2-078 · forward-reference K2-129

## Counts by type
| type | n |
|---|---|
| concept | 39 |
| claim | 29 |
| rule_of_thumb | 14 |
| example | 11 |
| process | 8 |
| admin_reference | 8 |
| qa_insight | 7 |
| number | 3 |
| tradeoff | 3 |
| definition | 2 |
| war_story | 2 |
| misconception | 2 |
| analogy | 2 |

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 00:58:02-01:03:02 | 13 | LRU/LFU definitions, where to store, LRU bits |
| 01:03:02-01:08:02 | 12 | linked-list overhead, random eviction |
| 01:08:02-01:13:02 | 9 | production war story, trade-off, LRU vs LFU, scan answer |
| 01:13:02-01:18:02 | 10 | stock market analogy and examples |
| 01:18:02-01:23:02 | 9 | protocol discussion, HTTP/1.1 cost, IoT story start |
| 01:23:02-01:28:02 | 8 | netcat experiment (screen share of a blog post; one continuous story) |
| 01:28:02-01:33:02 | 15 | HTTP overhead, RESP, gRPC, choosing, recap |
| 01:33:02-01:38:02 | 10 | recap, TTL handling |
| 01:38:02-01:43:02 | 9 | vertical scaling, pessimistic/optimistic locking, CAS |
| 01:43:02-01:48:02 | 8 | single threadedness, Q&A |
| 01:48:02-01:53:02 | 3 | Q&A until 01:50:12, then break (01:50:43-01:54:56) |
| 01:53:02-01:58:02 | 5 | break ends 01:54:56; distributed storage, routing question |
| 01:58:02-02:03:02 | 8 | routing layer, bank analogy ways 1-3 |
| 02:03:02-02:08:02 | 11 | way 4, choosing, cache-specific routing, adding a node |

## Doubts / open questions
- K2-007: LRU bit width - the teacher says "24 bits" then "28 bits"; the board shows `lru_bits 28` (board log S17, 01:01:30) - the board should resolve this.
- K2-002: speaker boundary at 00:58:21 ("least recently" may be the start of Student 3's answer).
- K2-040: in the FIFA/LFU explanation the teacher says "That's where you go for LRU" - likely a slip; kept and flagged.
- K2-126 (low): "This you typically would not use for cache" - unclear which routing way is meant (most likely way 3, peer forwarding). Board page S35 (four ways) may help.
- K2-068: "Never worked on it" about gRPC - unclear who; flagged.
- K2-046 / K2-049: student answers ("It's TCP", "You can write your own") have unidentified or split speakers.
- K2-005, K2-031, K2-047: student proposals with no explicit verdict, status `open`.
- K2-027: production eviction changed to "[?random | asr: remote]" - context makes random near certain.
- Cross-part: K2-076 (recap of zmalloc/eviction) and K2-105 (zmalloc for every allocation) overlap with part 1's zmalloc items (00:53:28-00:58:02); K2-078 / K2-084 refer back to week 2's TTL sampling.
