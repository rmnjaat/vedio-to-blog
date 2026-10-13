# Lecture 03 ledger, part 2 (00:54:17 - 01:36:01): notes
File: `part2.jsonl`, 96 items (K2-001 .. K2-096), validator: PASS (0 errors, 0 warnings; every verbatim found word for word).

## Topic tree
- admin
  - agenda: K2-001
  - backward-reference: K2-009
  - pre-reads: K2-033
  - forward-reference: K2-044
- id-generation
  - amazon > batched-ranges: K2-002..K2-020, K2-022..K2-025
  - monotonicity: K2-021, K2-026, K2-087, K2-095, K2-096
  - id-space: K2-027, K2-028
  - uuid: K2-029..K2-032, K2-037, K2-045..K2-048, K2-053, K2-057
  - mongodb: K2-049, K2-050
  - design-patterns: K2-052
  - flickr > ticket-server: K2-054..K2-056, K2-063, K2-066..K2-070, K2-076..K2-078, K2-088, K2-090, K2-091
  - flickr > odd-even-servers: K2-079..K2-086, K2-089, K2-092..K2-094
- databases
  - indexes: K2-034..K2-036, K2-038..K2-043, K2-051, K2-058..K2-060
  - fundamentals: K2-061, K2-062
  - mysql > upsert: K2-071..K2-075
- engineering-mindset: K2-064, K2-065

## Counts by type
| type | n |
|---|---|
| concept | 25 |
| claim | 18 |
| rule_of_thumb | 12 |
| process | 11 |
| qa_insight | 9 |
| example | 5 |
| admin_reference | 4 |
| number | 4 |
| definition | 3 |
| tradeoff | 2 |
| comparison | 1 |
| war_story | 1 |
| analogy | 1 |

## Coverage by 5-minute window
| Window | Items | Note |
|---|---|---|
| 00:54:17-00:59:17 | 1 | break; only the agenda for the second half is substantive |
| 00:59:17-01:04:17 | 13 | Amazon: batching, architecture, 500-ID range request, FOR UPDATE |
| 01:04:17-01:09:17 | 10 | in-memory ranges, decoupling/sharding, batch size trade-off, refill, airline-check-in reuse, student's ID-tracking proposal |
| 01:09:17-01:14:17 | 19 | ID-space numbers, why not UUID, indexes as tables, 4x bloat, indexes in RAM, query execution |
| 01:14:17-01:19:17 | 17 | index size checks, RAM >= index size, UUID security, MongoDB 12-byte ID, Flickr motivation |
| 01:19:17-01:24:17 | 13 | provisioning heuristic, DB as brutal component, tickets table, stub, upsert |
| 01:24:17-01:29:17 | 12 | REPLACE INTO 32x, Flickr query, SPOF, odd/even with auto_increment_increment/offset |
| 01:29:17-01:34:17 | 8 | resume discrepancy, max+buffer reset (aesthetics), stub and reset Q&A |
| 01:34:17-01:36:01 | 3 | short window (1m44s): reset value Q&A, monotonicity not enforced |

## Doubts / open questions
- K2-004: the general claim about batching is partly lost ("Batching is one of the most [check: words possibly lost] performance out of any system").
- K2-025 / K2-028: "2-264" read as 2^64; the 64-bit remark at 01:10:30ish is mostly unclear ("8 by 20 meters 2x to 64"). Board may show 2^64.
- K2-029: speaker of the UUID question is "Student?" (teacher then calls on "Mohit" right before).
- K2-032: unclear whether "how my company is using UUID, are we inefficient at scale?" is a real student or the teacher voicing one.
- K2-045: "In most cases they would get four of them. So which is why people don't use UUIDs." follows the security point; meaning unclear (maybe "go for them" for security?), kept in detail only.
- K2-049: MongoDB layout 4 bytes time / 5 random / 3 counter as stated; "counter for each chart" unclear. Board may resolve.
- K2-076: the exact Flickr query wording is spoken loosely ("insert into ticket stub a"); the board likely shows `REPLACE INTO` / `INSERT ... ON DUPLICATE KEY UPDATE` text verbatim.
- K2-082: teacher gives only auto_increment_offset = 1 (the second server's offset 2 is implied, not stated).
- K2-083: "round robin port" - probably "fashion"; long unclear run around 01:28:30.
- K2-094: reset values "240, 239" vs earlier "241 and 242" (K2-086) - stated as heard, not reconciled.
- K2-096: closing "You should have it." contradicts the surrounding point; flagged.
- Backward links not set as depends_on across parts (part 1 ids unknown to this analyst): K2-008 (periodic disk save every 1000 IDs), K2-022 (airline check-in system), K2-067 (earlier student question on using the DB as ID generator), K2-080 (earlier student proposal of two servers / gossip), K2-094 (safest value). Editor may cross-link.
