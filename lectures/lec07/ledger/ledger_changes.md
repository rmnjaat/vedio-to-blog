# Lecture 07 ledger - changes log

Inputs: part1-3.jsonl (K1-001..K1-135, K2-001..K2-130, K3-001..K3-123), gaps.jsonl (G-001..G-005), board_items.jsonl (B-001..B-083), gap_report.md, flag_resolutions.md, board_log.md, transcript.md. Output: ledger.jsonl (final IDs L-0001..L-0381 in teaching order = first audio timestamp, board time for board-only items). Old->new IDs in id_map.json (476 original ids: 388 K, 5 G, 83 B). Built by build_ledger.py; every decision below is the editor's.

## Distortion fixes (31 lines: 29 hunter fixes re-checked against transcript.md, plus the K1-096/K1-097 overlap cleanup and the K3-122 nuance note)

- K1-124: statement no longer asserts 'malloc and free': now 'malloc (and a second function, ASR unclear, probably free)' (transcript 00:53:23 'wrapper around malloc and [unclear: "lid"]'); flag kept, confidence stays medium [final L-0121]
- K1-099: detail says the teacher endorsed only the bit-saving point and kept the type in the value object ('Redis stores a lot of other meta information also along with this. That's why we wrapped it in a object', 00:41:58); he did not endorse moving the type to the key [final L-0096]
- K1-114: detail adds the teacher's credit at 00:47:49 ('Thanks Gaurav ... size plus equal to something'): the refinement may be the student's own; flag and status kept [final L-0111]
- K1-115: detail credits Student 6 with first raising the point (00:47:04), teacher confirmed 'Correct' (00:47:22); speaker stays teacher for the explanation [final L-0112]
- K1-106: detail starts with the teacher's first words 'No, you have to write it' (00:43:56), hedged: the hunter's reading ('you would have to write it yourself') is kept only as 'possibly'; added flag `check: meaning of "you have to write it"`; confidence stays high (correction itself is clear: segfault) [final L-0103]
- K1-062: confidence high -> medium (item carries `asr: [?write | asr: "right"]`, hard rule 6) [final L-0060]
- K1-016: 'works fine until about Series A' -> 'works very well for a Series A company, up to roughly 10,000-50,000 users' (transcript 00:06:07 'Works very well for Series A, till company, till 10,000, 50,000 users') [final L-0016]
- K1-007: 'only written as a box in designs' -> 'only mentioned (written) in designs' (transcript 00:02:15 'Up until now, we just wrote CDC'; the 'boxes' remark at 00:14:00 is about today's diagram) [final L-0007]
- K1-011: statement now 'tiered storage first, then questions, then the distributed cache low-level implementation, then a break, then something unclear in the audio'; '(ETL/CDC)' and '(high-level) details' moved to detail as interpretation (transcript 00:04:22) [final L-0011]
- K1-122: added flag `check: student may have meant "we need to allocate memory on heap for that as well"; teacher's "Why not?" reads it as a negative`; status proposed_then_corrected and confidence medium kept [final L-0119]
- K1-096: overlap with K1-097 (hunter duplicate note): statement keeps only the student proposal; the teacher's lookup-complexity objection and 'type in the value' counter moved to detail (schema: correction in detail for proposed_then_corrected); nothing dropped [final L-0093]
- K2-048: detail: teacher echoed 'Payload size is huge. Why?' (01:20:13) and corrected only the reason ('That is true for anything that you use', 01:20:27); later HTTP overhead is the request line/headers; cross-linked (K2-063 depends_on K2-048); status proposed_then_corrected kept (the reason was corrected) [final L-0179]
- K2-057: added source.board 01:25:45; detail says the audio spells 'u s e r' and 'User-Agent', 'Host', 'Accept-Language' come from the screen-shared blog (board_log S23) [final L-0187]
- K2-093: added source.board 01:43:30 and board_text 'CAS ( a, 20, 10 ) / CAS ( a, 30, 10 )' (the CAS(a, 20, 10) notation is board-only; audio: 'I want to change a to 20 when my current value is 10') [final L-0229]
- K2-101: 'it cannot be done cheaply' -> the teacher's 'You cannot do that' - a very deep implementation - so go with random (transcript 01:46:11) [final L-0237]
- K2-102: detail credits Student 2 with the O(1)-LFU/high-memory point (01:46:29), teacher 'Exactly' (01:46:44); added flag on the ambiguous 'which is why people don't use it' (01:46:53); confidence stays medium [final L-0238]
- K2-083: detail adds the reason: keys in a cache are very likely to be accessed (transcript 01:37:02 'most of the keys in cache, that's how the cache works. You are very likely to access the key') [final L-0217]
- K2-107: statement adds '(or hold the data)' and source 01:55:50-01:56:52 (transcript 'one node is not enough to handle the data or the load') [final L-0241]
- K2-117: detail keeps the hedge 'That's okay. But that is the disadvantage of that.' (02:01:38) [final L-0251]
- K2-123: statement appends the DNS-like redirect option and 'Pick your favorite, whatever works, works for you' (transcript 02:05:14) [final L-0257]
- K2-007: flag extended to `check: "four bits or something like that", "24 bits" then "28 bits", and "This becomes two integers" - sizing said loosely` (01:00:32); confidence stays medium [final L-0139]
- K2-046: added flag `check: speaker of "Why?" (Teacher?)` (transcript 01:19:37 'Teacher?: Why?') [final L-0177]
- K2-105: added flag `check: speaker of "Value of node." (Teacher?)` (01:48:35); confidence stays high (the teacher's next turn carries the point) [final L-0120]
- K3-016: 'but the implementation is different (read the blog for it)' -> 'for the implementation, read the blog' (transcript 02:13:48 'But implementation, read that part') [final L-0281]
- K3-014: 'it takes very little space' -> 'it does not take a huge amount of space' (transcript ~02:13:10) [final L-0279]
- K3-077: added source 02:46:31-02:47:07, where 'repetitively at the same point' is said [final L-0340]
- K3-103: 'SIGABRT cannot really be handled' -> 'mostly not something you can handle (there are some ways)' (transcript 02:56:04 'I mean, there are ways you can handle') [final L-0360]
- K3-110: added flag `check: "Use it 2015" (probably "used it in 2015")`; confidence high -> medium [final L-0367]
- K3-111: 'deadlock data is very hard to interpret' -> 'in most cases ... is, the teacher thinks, very hard to interpret' (transcript 03:02:20) [final L-0368]
- K3-117: speaker student (question) -> teacher (the insight is the teacher's answer 'It does that. I drew it separately so that it's very visual', 03:04:45); the student's question kept in detail [final L-0374]
- K3-122: detail adds the reason for the overlap: 'you folks also need to know when not to use a particular database' (hunter nuance note, 03:09:17) [final L-0380]

## Duplicate merges (19 pairs; absorbed item -> kept item)

- K1-041 -> K1-031: same 'CDC relies on the source of truth, not API-server events' point (restated); absorbed nuance moved to detail ("Restated at 00:12:55-00:14:00: relying directly on the source of truth instead of the API server is what makes CDC invaluable; the teacher says everyo..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0031]
- K1-043 -> K1-030: same 'explore Airbyte and Debezium' recommendation; absorbed nuance moved to detail ("At 00:14:00-00:15:15: Airbyte and Debezium are both open source - run them locally and play around: see how to configure them, what format the data ar..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0030]
- K1-053 -> K1-030: same 'explore Airbyte and Debezium' recommendation (third time); absorbed nuance moved to detail ("At 00:18:10-00:19:07: explore how Airbyte and Debezium are configured and which plugins they support; search YouTube for Airbyte and Debezium examples..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0030]
- K1-070 -> K1-060: same 'run CDC on a replica' point (Q&A confirmation for a read replica); absorbed nuance moved to detail ("Q&A at 00:26:01-00:26:14: asked about running CDC from a read replica, the answer (speaker marked Teacher?) was 'It's fine. Works just fine.'"), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0058]
- K2-105 -> K1-123: cross-part repeat (post-break Q&A): every allocation, wrapper and value alike, goes through the same counted allocator; absorbed nuance moved to detail ("Post-break Q&A at 01:48:18-01:49:52: size tracking counts the actual values, not just the MyValue wrapper - every allocation (the wrapper object and t..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0120]
- K3-086 -> K1-026: cross-part repeat (Q&A): not every change has an event; absorbed nuance moved to detail ("Restated in the 02:45:26-02:46:22 Q&A: not everything has an event, only a subset; it is better to read from the source of truth than rely on API-serv..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0026]
- K3-083 -> K1-027: cross-part repeat (Q&A): an event carrying only the blog ID forces a DB read; absorbed nuance moved to detail ("Q&A at 02:44:17-02:44:58: in event-based sync each blog publish is one event - pass only the blog ID and the consumer must call the database to read t..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0027]
- K3-084 -> K1-051: cross-part repeat (Q&A): CDC batches reads and writes; absorbed nuance moved to detail ("Q&A at 02:44:58-02:45:26: compared with per-event workers, CDC reads rows from the write-ahead log in batches and writes in batches - the amount of da..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0050]
- K3-093 -> K2-034: cross-part repeat: the stock-market analogy for LFU; absorbed nuance moved to detail ("Restated at 02:50:02-02:50:18 as the LFU vs LRU analogy: you still hold a popular key because it gave you good returns in the past and you hope it gro..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0166]
- K3-061 -> K2-127: cross-part repeat (Q&A): Redis returns the master's IP on a write to a replica; absorbed nuance moved to detail ("Q&A at 02:30:59-02:31:16: Redis does this redirect only for replicas, not every time - if you fire a write request on a replica, it returns the master..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0261]
- K3-058 -> K2-123: cross-part repeat (recap): four routing ways, pick your battles; absorbed nuance moved to detail ("Recap at 02:29:21-02:30:06: there are four ways to do routing and they apply to any distributed system in the world; not every one suits every case, e..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0257]
- K2-104 -> K1-085: same agenda point: consistent hashing is in the high-level part after the break; absorbed nuance moved to detail ("Repeated at 01:48:06-01:48:18: consistent hashing is a huge discussion coming up in the high-level part after the break."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0082]
- K2-022 -> K2-043: both say Redis does LRU/LFU internally with an implementation too deep for class; absorbed nuance moved to detail ("At 01:06:05-01:07:12: Redis does use LRU/LFU internally, but its implementation is too deep to cover in class - 'It would take me three years to talk ..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0154]
- K2-052 -> K2-051: K2-052 is the direct consequence of K2-051's per-request reconnect; absorbed nuance moved to detail ("Re-establishing a TCP connection (three-way handshake, two-way teardown) for every cache request is very unperformant and very inefficient, so HTTP/1...."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0182]
- K2-121 -> K2-114: both introduce the four routing ways as everyday practices; absorbed nuance moved to detail ("At 02:03:35-02:05:14: these four very common day-to-day practices translate as-is into communication in distributed systems; every distributed system ..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0248]
- K3-094 -> K3-038: same add-cache-5 procedure; the Q&A version settles which cache is snapshotted and cleaned; absorbed nuance moved to detail ("Q&A at 02:50:24-02:51:42 settles it: take a snapshot of cache 1, load the data into (create) cache 5, add it to the ring, then delete the moved data o..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0303]
- K3-039 -> K3-029: both say minimal data transfer is the one benefit of consistent hashing; absorbed nuance moved to detail ("At 02:22:35-02:23:21: that is why a lot of people use consistent hashing - it gives you just one thing, minimal data transfer; there is no magic sauce..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0294]
- K3-081 -> K3-080: both say CDC instances keep their read position in a small database of their own; absorbed nuance moved to detail ("At 02:43:02-02:43:25: with multiple tables, CDC instances can read them in parallel; their small database records the last point read and committed."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0344]
- K3-089 -> K3-078: both give the teacher's claim that the crash comes when used (physical) pages exceed memory, not from malloc; absorbed nuance moved to detail ("At 02:47:12-02:47:34 the teacher restated it from his prototype: allocation can still succeed on logical pages, but the crash happens when physical pa..."), absorbed verbatim kept in merged_verbatims, sources and flags unioned [final L-0341]

## Cross-links instead of merges (partial overlaps; depends_on added on the later item) - 52 lines

- K1-074 depends_on K1-068: legacy pipeline started basic, never refactored (different student questions) [final L-0071 -> L-0066]
- K1-069 depends_on K1-068: legacy service no one touches [final L-0067 -> L-0066]
- K1-116 depends_on K1-111: OS command too expensive -> own counter [final L-0113 -> L-0108]
- K1-116 depends_on K1-113: own size function [final L-0113 -> L-0110]
- K1-045 depends_on K1-009: forward reference: data engineering next week [final L-0044 -> L-0009]
- K1-054 depends_on K1-009: forward reference: multi-tiered storage [final L-0052 -> L-0009]
- K2-001 depends_on K1-132: eviction triggered from the zmalloc cap check [final L-0133 -> L-0129]
- K2-007 depends_on K1-100: 4 type bits + 28 LRU bits [final L-0139 -> L-0097]
- K2-009 depends_on K1-102: wrapper object pays off for eviction bits [final L-0141 -> L-0099]
- K2-077 depends_on K1-101: every byte matters in memory [final L-0210 -> L-0098]
- K2-082 depends_on K1-125: zfree is the counterpart of zmalloc [final L-0216 -> L-0122]
- K2-063 depends_on K2-048: student's 'payload size' answer vs the real HTTP overhead (hunter fix) [final L-0193 -> L-0179]
- K2-073 depends_on K2-046: TCP answer and its reason [final L-0205 -> L-0177]
- K2-086 depends_on K2-077: bare-minimum bytes for TTL [final L-0220 -> L-0210]
- K2-076 depends_on K2-023: random eviction recap [final L-0208 -> L-0155]
- K2-101 depends_on K2-025: random needs no extra data [final L-0237 -> L-0157]
- K2-100 depends_on K2-043: Redis LRU bits too deep [final L-0236 -> L-0154]
- K2-044 depends_on K1-004: teacher's Redis internals course [final L-0175 -> L-0004]
- K2-098 depends_on K2-044: teacher's Redis resources [final L-0234 -> L-0175]
- K2-074 depends_on K2-050: three options over TCP (recap) [final L-0206 -> L-0181]
- K2-125 depends_on K2-122: proxy / load balancer for a cache [final L-0259 -> L-0256]
- K3-004 depends_on K2-109: range ownership A-J / K-T / U-Z [final L-0269 -> L-0243]
- K3-004 depends_on K2-111: range table [final L-0269 -> L-0245]
- K3-007 depends_on K2-130: adding a node under mod-N [final L-0272 -> L-0265]
- K3-025 depends_on K2-130: adding a node answered via consistent hashing [final L-0290 -> L-0265]
- K3-011 depends_on K2-129: next-week forward references [final L-0276 -> L-0264]
- K3-067 depends_on K2-129: hot partitions [final L-0330 -> L-0264]
- K3-041 depends_on K2-124: the internet forwards / is a DHT [final L-0305 -> L-0258]
- K3-044 depends_on K2-124: forward or redirect [final L-0308 -> L-0258]
- K3-047 depends_on K2-119: IPFS/BitTorrent [final L-0311 -> L-0253]
- K3-048 depends_on K2-119: IPFS [final L-0312 -> L-0253]
- K3-049 depends_on G-003: teacher's BitTorrent/Kademlia series [final L-0313 -> L-0254]
- K3-060 depends_on K2-120: DNS-like redirect routing in Redis [final L-0323 -> L-0255]
- K3-063 depends_on K2-112: routing approaches can be mixed [final L-0325 -> L-0246]
- K3-064 depends_on K2-127: redirect to master generalised [final L-0326 -> L-0261]
- K3-057 depends_on K3-004: hash vs range recap [final L-0321 -> L-0269]
- K3-075 depends_on K1-107: correction chain: part-1 segfault claim refined by malloc-returns-NULL [final L-0338 -> L-0104]
- K3-075 depends_on K1-130: user-configured memory limit [final L-0338 -> L-0127]
- K3-078 depends_on K1-107: correction chain: crash comes from using pages beyond the limit [final L-0341 -> L-0104]
- K3-101 depends_on K1-107: correction chain: ulimits / malloc-library limits [final L-0358 -> L-0104]
- K3-087 depends_on K3-075: teacher's concession to Student 3 (different speakers, not merged) [final L-0347 -> L-0338]
- K3-088 depends_on K1-108: crash on accessing memory not yours [final L-0348 -> L-0105]
- K3-079 depends_on K1-060: CDC reads from a replica [final L-0342 -> L-0058]
- K3-080 depends_on K1-057: CDC checkpointing [final L-0344 -> L-0055]
- K3-085 depends_on K1-026: changes without an event [final L-0346 -> L-0026]
- K3-117 depends_on K1-042: CDC sinks [final L-0374 -> L-0042]
- K3-092 depends_on K2-033: when to use LFU [final L-0351 -> L-0165]
- K3-092 depends_on K2-035: LFU keeps past-popular keys [final L-0351 -> L-0167]
- K3-097 depends_on K2-097: single threadedness [final L-0354 -> L-0233]
- K3-099 depends_on K2-097: single threadedness [final L-0356 -> L-0233]
- K3-091 depends_on K1-090: hash-table storage grows by doubling [final L-0350 -> L-0087]
- K3-022 depends_on K3-010: consistent hashing is not a service [final L-0287 -> L-0275]

## Board decisions (83 B-items: 76 merged into audio items, 7 new board-only items) - one line per B id

- B-001 -> merged into K1-003 (duplicates audio): "Agenda: Designing a distributed cache - ETL and Tiered Storage" [final L-0003]
- B-002 -> merged into K1-012 (duplicates audio); board nuance added to detail: "Say, we are building a multi-user blogging application in which the data is stored in a Transactional Datab..." [final L-0012]
- B-003 -> merged into K1-017 (duplicates audio); board nuance added to detail: "But the insights team only knows SQL" [final L-0017]
- B-004 -> merged into K1-024 (duplicates audio); board nuance added to detail: "One way would be to send "events" from API in Kafka then process it into worker and put it into some SQL st..." [final L-0024]
- B-005 -> merged into K1-026 (duplicates audio); board nuance added to detail: "events have context of the application" [final L-0026]
- B-006 -> merged into K1-027 (duplicates audio): "events might not contain all the data" [final L-0027]
- B-007 -> merged into K1-026 (duplicates audio): "everything might not have an event" [final L-0026]
- B-008 -> merged into K1-034 (duplicates audio); board nuance added to detail: "what if changes done but sending event failed ... consistency" [final L-0034]
- B-009 -> merged into K1-031 (duplicates audio): "Instead of relying on Events, what if we rely on Source of Truth? our database" [final L-0031]
- B-010 -> merged into K1-037 (duplicates audio); board nuance added to detail: "CDC pulls the changes happening on the database through its COMMIT-LOG / BIN-LOG" [final L-0037]
- B-011 -> merged into K1-032 (duplicates audio): "- optionally transform the data - put it into a "sink" database" [final L-0032]
- B-012 -> merged into K1-030 (duplicates audio); board nuance added to detail: "Airbyte Dbezium" [final L-0030]
- B-013 -> merged into K1-042 (duplicates audio); board nuance added to detail: "You can also choose to do it manually or your own way just pick appropriate SINK eg: Kafka, SQS, Broker" [final L-0042]
- B-014 -> new item (board-only: 'one CDC event for every change' per row/document is written, not spoken): "we get one CDC event for every change that happened in the database" [final L-0041]
- B-015 -> merged into K1-054 (duplicates audio); board nuance added to detail: "CDCs are very heavily used in building Multi-Tiered Storage" [final L-0052]
- B-016 -> merged into K1-048 (duplicates audio); board nuance added to detail: "Transactional Search Analytics Backup MySQL ElasticSearch Redshift S3" [final L-0047]
- B-017 -> merged into K1-030 (duplicates audio); board nuance added to detail: "Implement quick CDC using Airbyte (if you have never used it) we will be using it a lot in future System di..." [final L-0030]
- B-018 -> merged into K1-083 (duplicates audio): "High Throughput , low latency, distributed" [final L-0080]
- B-019 -> merged into K1-084 (duplicates audio): "GET, PUT, DEL, TTL" [final L-0081]
- B-020 -> merged into K1-083 (duplicates audio): "Scale is default" [final L-0080]
- B-021 -> merged into K1-087 (duplicates audio): "storage, cache full , eviction, communication, concurrency, ttl" [final L-0084]
- B-022 -> merged into K1-090 (duplicates audio): "Storage: Key and Value in Hash Table!" [final L-0087]
- B-023 -> merged into K1-093 (duplicates audio): "set, list, bf, hll" [final L-0090]
- B-024 -> merged into K1-095 (duplicates audio): "add -> set push -> list" [final L-0092]
- B-025 -> merged into K1-097 (duplicates audio); board nuance added to detail: "key -> MyValue { value * void/Object type int4 }" [final L-0094]
- B-026 -> merged into K1-110 (duplicates audio); board nuance added to detail: "Seg Fault ... Cap the memory usage" [final L-0107]
- B-027 -> merged into K1-113 (duplicates audio); board nuance added to detail: "Size function ... malloc ( int size_alloc ) free" [final L-0110]
- B-028 -> merged into K1-125 (duplicates audio); board nuance added to detail: "zmalloc ( int b ) { if total_size + b > max... o = malloc (b) total_size += b return o }" [final L-0122]
- B-029 -> merged into K1-130 (duplicates audio); board nuance added to detail: "total_size 1GB" [final L-0127]
- B-030 -> merged into K2-001 (duplicates audio); board nuance added to detail: "Eviction LRU LFU Random ... Priority Queue" [final L-0133]
- B-031 -> merged into K2-007 (duplicates audio); board nuance added to detail: "lru_bits 28" [final L-0139]
- B-032 -> merged into K2-015 (duplicates audio); board nuance added to detail: "next * 4B prev * 4B value * 4B 12B" [final L-0147]
- B-033 -> merged into K2-016 (duplicates audio): "a:2 1B 4B 5B ... 12B" [final L-0148]
- B-034 -> merged into K2-030 (duplicates audio); board nuance added to detail: "LRU ... News LFU ... Wikipedia" [final L-0162]
- B-035 -> merged into K2-050 (duplicates audio); board nuance added to detail: "TCP http1.1 gRPC custom" [final L-0181]
- B-036 -> merged into K2-051 (duplicates audio); board nuance added to detail: "3/2" [final L-0182]
- B-037 -> merged into K2-057 (duplicates audio); board nuance added to detail: "The HTTP Communication happens over a TCP Connection." [final L-0187]
- B-038 -> merged into K2-072 (duplicates audio); board nuance added to detail: "Bare minimum functionalities: GET / PUT / DEL You can always extend the functionalities to support compl[ex..." [final L-0204]
- B-039 -> merged into K2-072 (duplicates audio); board nuance added to detail: "Each key has an associated type which determines the functionalities supported" [final L-0204]
- B-040 -> merged into K2-072 (duplicates audio); board nuance added to detail: "The objects are stored in a Hash Table key 1 -> Object { type list } key 2 -> object { type set }" [final L-0204]
- B-041 -> merged into K2-074 (duplicates audio); board nuance added to detail: "Communication: TCP protocol Raw TCP HTTP gRPC" [final L-0206]
- B-042 -> merged into K2-069 (duplicates audio); board nuance added to detail: "But, we can support all the 3 ways of communication by abstracting out the implementation" [final L-0200]
- B-043 -> merged into K2-076 (duplicates audio); board nuance added to detail: "Cache is full!! Eviction Make place for newer entries" [final L-0208]
- B-044 -> new item (board-only: the reading pointer on constant-time LRU is not in the audio): "* Read about implementation of constant time LRU & ..." [final L-0209]
- B-045 -> merged into K2-076 (duplicates audio); board nuance added to detail: "Cap on the max number of keys in the cache ... Cap on the cumulative size of the values inserted total_size..." [final L-0208]
- B-046 -> merged into K2-076 (duplicates audio); board nuance added to detail: "You can trigger cache eviction only when you know the cache is full" [final L-0208]
- B-047 -> merged into K2-079 (duplicates audio); board nuance added to detail: "Every key has an associated expiry -> absolute time" [final L-0213]
- B-048 -> new item (board-only: a background cleanup process plus garbage collector is board-only (audio covers lazy deletion and sampling)): "Every cache server has a cleaup process running - frees up the expired keys free(obj)" [final L-0212]
- B-049 -> merged into K2-080 (duplicates audio); board nuance added to detail: "Priority Queue k2:100 , k7:101 , k9:105 , k3:110 absolute expiration time -> order Free happens here" [final L-0214]
- B-050 -> merged into K2-080 (duplicates audio); board nuance added to detail: "Advantages: Simple, consistent Disadvantage: Need an additional data structure" [final L-0214]
- B-051 -> merged into K2-084 (duplicates audio); board nuance added to detail: "Sampling [Redis] lazy del^n Sample 20 keys, free the expired ones, repeat until the sample < 25% expired" [final L-0218]
- B-052 -> merged into K2-087 (duplicates audio); board nuance added to detail: "Scaling single node cache: Vertical add more RAM, CPU, Network" [final L-0221]
- B-053 -> new item (board-only: GET/PUT/DEL as hash-table operations is written, not spoken): "GET k -> check the hash table & return PUT k, v -> add to the hash table DEL k -> delete ..." [final L-0222]
- B-054 -> merged into K2-088 (duplicates audio); board nuance added to detail: "when two or more update/delete operations on key k come to a cache server at the same time" [final L-0223]
- B-055 -> merged into K2-088 (duplicates audio): "- Pessimistic locking - Optimistic locking - Single threaded" [final L-0223]
- B-056 -> merged into K2-089 (duplicates audio); board nuance added to detail: "ACQ_LOCK() DELETE K REL_LOCK() one waits for other to fini[sh]" [final L-0224]
- B-057 -> merged into K2-090 (duplicates audio); board nuance added to detail: "How to implement? Mutex & Semaphore Atomic variables to keep track of locks" [final L-0226]
- B-058 -> merged into K2-092 (duplicates audio); board nuance added to detail: "Idea: Make updates conditional Implementation: Compare and Swap CAS ( a, 20, 10 )" [final L-0228]
- B-059 -> new item (board-only: the MySQL-as-cache exercise is written (then erased), not spoken): "Fun exercise: How would you use MySQL as a cache server? Same throughput as any other cache!" [final L-0225]
- B-060 -> merged into K2-107 (duplicates audio): "let's make our cache distributed why? One node not enough to handle the load" [final L-0241]
- B-061 -> merged into K2-108 (duplicates audio): "storage, routing, availability, reliability, scaling" [final L-0242]
- B-062 -> merged into K2-109 (duplicates audio); board nuance added to detail: "c1 (a,j) c2 (k,t) c3 (u,z)" [final L-0243]
- B-063 -> merged into K2-111 (duplicates audio); board nuance added to detail: "(a,j) -> c1 (k,t) -> c2 (u,z) -> c3 Table" [final L-0245]
- B-064 -> merged into K2-114 (duplicates audio); board nuance added to detail: "Cache ... Cache ... IPFS ... Cache (Redis)" [final L-0248]
- B-065 -> merged into K2-126 (duplicates audio); board nuance added to detail: "IPFS NOT DNS Cache (Redis)" [final L-0260]
- B-066 -> new item (board-only: the definition 'multiple single cache servers working together as a single coherent cache' is not spoken): "Distributed cache : Multiple single cache servers working together as a single coherent cache" [final L-0263]
- B-067 -> merged into K3-002 (duplicates audio); board nuance added to detail: "Hash-based routing i = hash(key) % 3" [final L-0267]
- B-068 -> merged into K3-004 (duplicates audio); board nuance added to detail: "Range-based routing cache 1: [a - j] cache 2: [j - p] cache 3: [q - z]" [final L-0269]
- B-069 -> merged into K3-009 (duplicates audio); board nuance added to detail: "Issues with hash-based routing ... New cache server added : cache 2 ... 50% data movement" [final L-0274]
- B-070 -> merged into K3-012 (duplicates audio); board nuance added to detail: "Consistent Hashing: For determining ownership ... Key K1 ... Ownership ... cache 1" [final L-0277]
- B-071 -> merged into K3-038 (duplicates audio); board nuance added to detail: "we create cache 5 using cache 1 and then add it to the ring Minimal Data Transfer" [final L-0303]
- B-072 -> merged into K3-072 (duplicates audio); board nuance added to detail: "Note: adding virtual node is a bad idea for stateful application" [final L-0335]
- B-073 -> merged into K3-071 (duplicates audio); board nuance added to detail: "scaling up and down is not simple as it requires us to read data from diff nodes" [final L-0334]
- B-074 -> merged into K3-030 (duplicates audio); board nuance added to detail: "Removing a cache server 1. Graceful shut down 2. abrupt outage Minimal Data Transfer" [final L-0295]
- B-075 -> merged into K3-040 (duplicates audio); board nuance added to detail: "A distributed cache under the covers is a D.H.T. which maps values to key spread across nodes." [final L-0304]
- B-076 -> merged into K3-045 (duplicates audio); board nuance added to detail: "DHTs are optimised for "minimal" data movement when nodes are added or removed" [final L-0309]
- B-077 -> merged into K3-047 (duplicates audio); board nuance added to detail: "Distributed File Systems - DNS servers - Instant Messaging - Peer-to-Peer sharing IPFS BitTorrent uses DHTs" [final L-0311]
- B-078 -> merged into K3-044 (duplicates audio); board nuance added to detail: "Decentralized request nearest goto (2) No load balancer!!" [final L-0308]
- B-079 -> merged into K3-049 (duplicates audio); board nuance added to detail: "watch my video on 'Kademlia'" [final L-0313]
- B-080 -> merged into K3-051 (duplicates audio); board nuance added to detail: "High availability: - Replicas (state data) - Standby nodes" [final L-0315]
- B-081 -> merged into K3-056 (duplicates audio); board nuance added to detail: "Reliability: - Write ahead logging" [final L-0320]
- B-082 -> new item (board-only: orchestrator / heartbeat / Prometheus page was only glimpsed; low confidence with its flag): "Orchestrator Monitor uptime of cach[e servers] Failovers heartbeat MetaDB Servers are monitored through pro..." [final L-0329]
- B-083 -> merged into K3-080 (duplicates audio); board nuance added to detail: "(unlabelled cylinder under CDC box)" [final L-0344]

Board items' own flags (B-036, B-068, B-080, B-082, B-083) are kept in the item's board_notes (merged) or flags (new item); they do not lower the audio item's confidence.

## Flag resolutions from the board (flag_resolutions.md) - 40 lines

- K1-052: F011 resolved_by board 00:18:15 (cylinder 'Redshift' under 'Analytics' in the multi-tier CDC diagram); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0051]
- K1-075: F021 resolved_by board 00:28:45 ('MySQL' (Transactional) on screen in the multi-tier diagram); flag removed; confidence medium -> high [final L-0072]
- K1-077: F023 resolved_by board 00:30:30 (same 'MySQL' cylinder on screen 00:29:00-00:30:30); flag removed; confidence medium -> high [final L-0074]
- K1-084: F029 resolved_by board 00:32:00 (requirements page '- GET, PUT, DEL, TTL'); flag removed; confidence medium -> high [final L-0081]
- K1-096: F032 resolved_by board 00:39:00 ('Way to represent type' written 00:36:15-00:39:00); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0093]
- K1-096: F033 resolved_by board 00:39:00 (same line 'Way to represent type'); flag removed; confidence medium -> high [final L-0093]
- K2-003: F059 resolved_by board 00:58:05 ('cache full' circled in red; eviction page started 00:58:15); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0135]
- K2-022: F069 resolved_by board 01:06:00 ('LFU' on the eviction page 01:02:15-01:06:00); flag removed; confidence high -> high [final L-0154]
- K2-026: F070 resolved_by board 01:09:15 (pink 'Random' added as the third eviction strategy); flag removed; confidence medium -> high [final L-0158]
- K2-058: F084 resolved_by board 01:27:00 (screen-shared netcat input 'This is a sample' and its 400 response); flag removed; confidence high -> high [final L-0188]
- K2-072: F090 resolved_by board 01:32:24 (recap page heading 'Single node cache'); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0204]
- K2-079: F095 resolved_by board 01:35:39 (green 'lru_bits 28' field in the value struct); flag removed; confidence high -> high [final L-0213]
- K2-086: F097 resolved_by board 01:37:45 (TTL page 'Handling TTLs: ... Sampling [Redis]'); flag removed; confidence high -> high [final L-0220]
- K2-091: F100 resolved_by board 01:40:15 ('ACQ_LOCK()' / 'REL_LOCK()', 'Atomic variables to keep track of locks'); flag removed; confidence high -> high [final L-0227]
- K2-096: F102/F103 resolved_by board 01:43:30 ('Implementation: Compare and Swap', 'CAS ( a, 20, 10 )'); flag removed; confidence high -> high [final L-0232]
- K2-097: F104 resolved_by board 01:45:00 (concurrency list '- Single threaded'); flag removed; confidence high -> high [final L-0233]
- K3-002: F127 resolved_by board 02:09:00 ('Issues with hash-based routing' page; 'Hash-based routing i = hash(key) % 3' at 02:07:15); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0267]
- K3-016: F130 resolved_by board 02:13:30 ('Consistent Hashing: For determining ownership'); flag removed; confidence medium -> high [final L-0281]
- K3-038: F138-F141 resolved_by board 02:22:45 (adding page 'cache 5' / 'we create cache 5 using cache 1'); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0303]
- K3-042: F142 resolved_by board 02:23:24 (DHT page 'BitTorrent uses DHTs'); flag removed; confidence medium -> high [final L-0306]
- K3-079: F156 resolved_by board 02:43:15 (multi-tier 'CDC' diagram on screen 02:41:45-02:48:30); flag removed; confidence medium -> medium (other open flags remain: 1) [final L-0342]
- K3-094: F174 resolved_by board 02:52:30 (adding page with 'cache 5'); flag removed; confidence medium -> high [final L-0303]
- K3-096: F176 resolved_by board 02:52:30 ('Note: adding virtual node is a bad idea for stateful application'); flag removed; confidence medium -> high [final L-0353]
- K3-100: F179 resolved_by board 02:57:30 ('Concurrency' / 'Classic concurrency problem' page); flag removed; confidence medium -> high [final L-0357]
- K1-004: F003 supported_by board 00:03:15 (agenda 'Designing a distributed cache' (board has 'distributed', not 'it distributed')); flag kept and annotated; confidence unchanged (medium) [final L-0004]
- K1-046: F009 supported_by board 00:15:00 ('API' box between user and MongoDB in the CDC diagram (board says 'API', not 'API server')); flag kept and annotated; confidence unchanged (medium) [final L-0045]
- K1-074: F019 supported_by board 00:13:30 ('just pick appropriate SINK eg: Kafka, SQS, Broker'); flag kept and annotated; confidence unchanged (medium) [final L-0071]
- K1-074: F020 supported_by board 00:13:30 (same line); flag kept and annotated; confidence unchanged (medium) [final L-0071]
- K1-124: F054 (related note) supported_by board 00:53:30 ('malloc ( int size_alloc )' / 'free', later prefixed 'zmalloc' / 'zfree'; 'free' fits but the board does not prove the word); flag kept and annotated; confidence unchanged (medium) [final L-0121]
- K2-012: F063 supported_by board 01:01:45 (eviction page heading 'Eviction' with 'Priority Queue'); flag kept and annotated; confidence unchanged (high) [final L-0144]
- K2-016: F068 supported_by board 01:06:00 (LRU 12B overhead page; recap 'LRU : least recently used' (01:33:45)); flag kept and annotated; confidence unchanged (high) [final L-0148]
- K2-078: F094 supported_by board 01:35:15 ('Every key has an associated expiry' (board says 'expiry')); flag kept and annotated; confidence unchanged (high) [final L-0211]
- K2-106: F112 supported_by board 01:33:15 (pink 'Raw TCP' on the communication recap); flag kept and annotated; confidence unchanged (medium) [final L-0240]
- K3-015: F136 supported_by board 01:24:00 (screen-shared URL 'arpitbhayani.me/blogs/making-http-requests-using-netcat'); flag kept and annotated; confidence unchanged (medium) [final L-0280]
- K3-059: F147 supported_by board 02:27:30 ('High availability:' heading on screen 02:27:00-02:29:24); flag kept and annotated; confidence unchanged (medium) [final L-0322]
- K3-086: F163 supported_by board 00:08:45 ('One way would be to send "events" from API in Kafka' and the 'API' box); flag kept and annotated; confidence unchanged (medium) [final L-0026]
- K3-092: F172 supported_by board 02:48:39 (eviction page re-shown ('Eviction LRU LFU Random')); flag kept and annotated; confidence unchanged (medium) [final L-0351]
- K2-072: F092 (related note) board 01:32:24 writes 'object struct { type list / data }': supports the ASR reading 'type list', not the guess 'type, LRU'; flag kept and annotated; statement '(struct with type, LRU bits, data)' -> '(struct with a type and the data; whether "LRU bits" was said is uncertain)'; confidence stays medium [final L-0204]
- K2-126: check flag 'which routing approach "This you typically would not use for cache" refers to' resolved_by board 02:02:09 (B-065 labels the forwarding way 'IPFS' 'NOT'); statement names way 3; flag removed; confidence low -> high [final L-0260]
- K3-038: check flag 'which cache the snapshot is taken of and keys deleted from' resolved_by board 02:21:45 (B-071 'we create cache 5 using cache 1') plus the merged Q&A (K3-094, 'delete the data on cache one'); detail keeps that 02:22:35 said 'cache five'; confidence medium -> high [final L-0303]

Not applied (no ledger item carries the marker; the analysts wrote those terms without flags): F060 [?LFU / "LF"], F091 [?single-node / "single-lot"], F122 [?client / "plan"], F185 [?locks / "law"]. F006 (related note, K1-028 [unclear: "EBS ever"]) is not proven by the board: flag kept unchanged.

## Topic normalisation

- 'caching > eviction' -> 'distributed-cache > eviction' (K2-001, K2-004, K2-076)
- 'caching > eviction > lru' -> 'distributed-cache > eviction > lru' (K2-002)
- 'caching > eviction > lfu' -> 'distributed-cache > eviction > lfu' (K2-003)
- 'caching > eviction > implementation' -> 'distributed-cache > eviction > implementation' (K2-005, K2-012, K2-013, K2-014, K2-015, K2-016, K2-017, K2-018, K2-019, K2-020, K2-021, K2-102)
- 'caching > eviction > metadata' -> 'distributed-cache > eviction > metadata' (K2-006, K2-007, K2-008, K2-009, K2-010, K2-011)
- 'caching > eviction > random' -> 'distributed-cache > eviction > random' (K2-023, K2-024, K2-025, K2-026, K2-027, K2-028, K2-029, K2-101)
- 'caching > eviction > lru-vs-lfu' -> 'distributed-cache > eviction > lru-vs-lfu' (K2-030, K2-031, K2-032, K2-033, K2-034, K2-035, K2-036, K2-037, K2-038, K2-039, K2-040, K2-041, K2-042)
- 'caching > eviction > redis' -> 'distributed-cache > eviction > redis' (K2-043, K2-100)
- 'caching > communication' -> 'distributed-cache > communication' (K2-045, K2-046, K2-047, K2-048, K2-049, K2-050, K2-051, K2-063, K2-069, K2-070, K2-073, K2-074, K2-075)
- 'caching > communication > http-over-raw-tcp' -> 'distributed-cache > communication > http-over-raw-tcp' (K2-053, K2-054, K2-055, K2-056, K2-057, K2-058, K2-060, K2-061, K2-062, K2-106, G-001)
- 'learning approach' -> 'learning-approach' (K2-059)
- 'caching > communication > custom-protocol' -> 'distributed-cache > communication > custom-protocol' (K2-064, K2-065, K2-066, K2-067)
- 'caching > communication > grpc' -> 'distributed-cache > communication > grpc' (K2-068)
- 'caching > single-node > storage' -> 'distributed-cache > storage' (K2-072)
- 'caching > ttl' -> 'distributed-cache > ttl' (K2-077, K2-079, K2-080, K2-081, K2-082, K2-083, K2-084, K2-085, K2-086)
- 'scaling > vertical' -> 'distributed-cache > scaling > vertical' (K2-087)
- 'concurrency' -> 'distributed-cache > concurrency' (K2-088, K2-099)
- 'concurrency > pessimistic-locking' -> 'distributed-cache > concurrency > pessimistic-locking' (K2-089, K2-090)
- 'concurrency > optimistic-locking' -> 'distributed-cache > concurrency > optimistic-locking' (K2-091, K2-092)
- 'concurrency > compare-and-swap' -> 'distributed-cache > concurrency > compare-and-swap' (K2-093, K2-094, K2-095, K2-096)
- 'concurrency > single-threaded' -> 'distributed-cache > concurrency > single-threaded' (K2-097, K2-103)
- 'admin > references' -> 'admin > resources' (K3-015, K3-049)
- 'etl-cdc > cdc > scaling' -> 'cdc > scaling' (K3-079, K3-080, G-004)
- 'etl-cdc > event-based-sync' -> 'etl > event-based-pipeline' (K3-082)
- 'etl-cdc > cdc' -> 'cdc > benefits' (K3-085)
- 'eviction > lru-vs-lfu' -> 'distributed-cache > eviction > lru-vs-lfu' (K3-092)
- 'etl-cdc > cdc > fan-out' -> 'cdc > fan-out' (K3-117, K3-118)
- Board-only items placed in the audio tree: B-014 'cdc > how-it-reads', B-044 'admin > resources', B-048 'distributed-cache > ttl', B-053 'distributed-cache > single-node', B-059 'admin > exercise', B-066 'distributed-cache > definition', B-082 'distributed-cache > orchestration'.
- Merged board items keep the audio item's topic (board topics such as 'course > agenda', 'distributed cache > ...', 'consistent hashing > ...', 'dht' are not used).
- Original ids written inside statement/detail text (e.g. 'see K1-099') are rewritten to final L ids in: L-0093, L-0096, L-0179, L-0343.

## Rejected hunter suggestions (with reason)

- K1-089 / K1-090: not merged - K1-089 is the student's proposal, K1-090 the teacher's core 'hash table' statement (different speakers); already linked by depends_on [final L-0086, L-0087].
- K1-106: hunter's reading of 'No, you have to write it' ("moving data to disk is not something that happens on its own") is an interpretation; kept only as 'possibly' with a check flag [final L-0103].
- K2-006 / K2-072 and K2-072 / K1-097: not merged - K2-072 is the 01:32 recap that carries the board recap page (B-038, B-039, B-040) and the F090/F092 flags; cross-linked by depends_on [final L-0204].
- K2-068 / K2-074 and K2-050 / K2-074: not merged - K2-074 is the recap of all three options (stateless HTTP/1.1, gRPC, custom), not only gRPC; cross-linked [final L-0206].
- K2-080 / K2-086: not merged - K2-080 carries the board's priority-queue option (B-049, B-050), K2-086 Redis's choice; already linked [final L-0214, L-0220].
- K2-044 / K2-098 / K2-100 / K1-004: not merged into one resources item - different resources (paid course 9+ hours Golang; free YouTube video; LRU-bits Q&A); cross-linked.
- K2-024 / K2-027, K2-005 / K2-012, K2-097 / K2-103, K2-115 / K2-122 / K2-125, K2-046 / K2-073, K2-077 / K2-086: partial overlaps, kept separate with depends_on (each adds its own nuance).
- K3-011 -> K2-129: not merged - the board does not confirm that both forward references are the same topic (hot partitions vs 'where consistent hashing sucks'); cross-linked [final L-0276].
- K3-014 / K3-021: not merged - K3-021 answers 'where is it implemented' (router layer, array of four) after K3-020; linked by depends_on [final L-0286].
- K3-072 / K3-096, K3-071 / K3-073, K3-075 / K3-087, K3-102 / K3-103, K3-010 / K3-022, K3-045 / K3-046, K3-061 / K3-064, K3-057 / K3-004, K3-070 / K3-038: partial overlaps or different speakers; kept separate with depends_on.
- K1-107 correction chain (K3-075, K3-078, K3-101): not merged and K1-107 not corrected (fact-checker's job); later items depend_on K1-107 so pages show the refinement.
- K1-115 / K1-121, K1-109 / K1-110, K1-133 / K1-135, K1-111 / K1-113 / K1-116, K1-068 / K1-069 / K1-074, K1-009 / K1-045 / K1-054: partial overlaps; kept separate with depends_on.

## Validation

PASS final ledger lectures/lec07/ledger | errors 0 | warnings 0 (originals: 476 (parts 388, gaps 5, board 83) -> ledger 381 items)
