# Lecture 03 ledger, part 1 (00:00:00 - 00:54:17): notes

File: `part1.jsonl`, 102 items (K1-001 .. K1-102), validator: PASS (0 errors, 0 warnings; every verbatim found word for word). Verbatims are at most 25 words.

## Topic tree

- **Admin**
  - Agenda / deferred topics: K1-001, K1-006, K1-095 (UUIDs, MongoDB IDs later), K1-098 (company examples later)
- **Learning approach**: K1-007 (implement every approach)
- **Engineering principles > trade-offs**: K1-085 (everything is a trade-off), K1-097 (no one right way)
- **ID generation**
  - Motivation: K1-002 to K1-005
  - Basics (what an ID is, problem statement, local function first, no write-back assumption): K1-008 to K1-010, K1-102
  - Epoch millisecond: K1-011 to K1-013
  - Machine ID (multi-machine collision and fix): K1-014, K1-015
  - Collision resolution principle / comparison: K1-016, K1-026
  - Threads (thread ID): K1-017 to K1-019
  - Static counter: K1-020 to K1-025, K1-027 to K1-029
    - Persistence (reboot, file-backed counter, max-row-ID answer): K1-030 to K1-033, K1-100, K1-101
    - Disk IO (micro IOs, latency, boot-counter proposal, bank of IDs, DB proposal): K1-034 to K1-041, K1-099
    - Flush frequency (mod N, worked example, safest value, takeaways): K1-042 to K1-049
  - Monotonic IDs: K1-050, K1-051, K1-055, K1-073
    - Use cases (transaction ordering, conflict resolution): K1-052 to K1-054, K1-090
    - Time-first IDs: K1-056 to K1-062
    - Clock skew (NTP, sync job, example 232/244/237/239): K1-063, K1-064, K1-068 to K1-072
      - Quartz crystal physics: K1-065 to K1-067
  - Central ID service: K1-074, K1-077, K1-081, K1-089, K1-096
    - Single-machine clock never goes back: K1-075, K1-076
    - Fault tolerance / gossip: K1-078 to K1-080
  - Relaxing constraints: K1-082, K1-086, K1-092, K1-093; UUID: K1-094
  - Multi-master auto-increment (why custom IDs are needed): K1-083, K1-084, K1-087, K1-088, K1-091

## Counts by type

| type | n |
|---|---|
| concept | 33 |
| claim | 19 |
| rule_of_thumb | 13 |
| tradeoff | 10 |
| qa_insight | 9 |
| admin_reference | 4 |
| definition | 4 |
| example | 3 |
| process | 2 |
| comparison | 1 |
| number | 1 |
| analogy | 1 |
| war_story | 1 |
| misconception | 1 |
| **total** | **102** |

Confidence: 77 high, 25 medium, 0 low. Student items: 7 proposals (6 endorsed, 1 proposed_then_corrected: K1-099), 1 question (K1-090).

## Coverage by 5-minute window

| Window | items | note |
|---|---|---|
| 00:00-00:05 | 11 | agenda, motivation, problem statement, epoch ms |
| 00:05-00:10 | 9 | multi-machine and thread collisions, counter intro |
| 00:10-00:15 | 10 | static counter, atomicity, drop time, integer limit, reboot |
| 00:15-00:20 | 8 | file-backed counter, disk IO problems, boot-counter proposal (long student dialogue) |
| 00:20-00:25 | 11 | bank of IDs, flush frequency, crash example, safest value |
| 00:25-00:30 | 8 | takeaways, monotonic constraint, transactions example, time-first |
| 00:30-00:35 | 10 | within-ms misordering, time leftmost, clock sync, quartz |
| 00:35-00:40 | 7 | quartz cold/heat, Jeff Dean/Sanjay story, skew example, central service start (story is one aside) |
| 00:40-00:45 | 12 | clock never goes back, SPOF, gossip, MySQL single machine, relax constraints |
| 00:45-00:50 | 8 | multi-master auto-increment, Q&A (DB with locks, conflicts, increment-by-N, random ID) |
| 00:50-00:54:17 | 8 | UUID trade-off, distributed ID servers proposal, max-row-ID proposal |

## Doubts / open questions

- **K1-001**: "The third day second" - week 3, day 2? Board title slide may help.
- **K1-022 / K1-024**: garbled phrases ("share a ramp", "at locks, works") around the static counter definition; meaning is clear from context.
- **K1-045 / K1-046**: the flush-frequency crash example has several unclear fragments; the arithmetic as spoken is "nine plus one, 10" (6 + 3 + 1), while the code said counter = load + flush frequency. The board (flush example page) should confirm the safest-value formula.
- **K1-038**: "That's right ... That can be made atomic ... Correct. Longer ID." sits inside the student's turn - probably the teacher interjecting. Speaker check.
- **K1-036**: teacher literally says disk IO "might reduce the latency"; kept as "affects latency" with the literal words in `detail` (fact-checker / editor to judge).
- **K1-075**: NTP slewing explanation ends unclearly ("stretches that one second to become like point three and then it receives").
- **K1-086**: "integer rights" - probably "integer IDs".
- **K1-091**: speaker boundary at 00:48:53 (teacher's "Okay DK" inside a student-labelled segment); the "slight disadvantage" of increment-by-N is deferred - likely answered in part 2 (Flickr odd/even servers).
- **K1-096**: may be Student 2 continuing rather than Student 3.
- **K1-099**: the challenge "So then you are writing to database every time?" (00:52:35) is labelled Student? but sounds like the teacher.
- **K1-090**: the teacher defers conflict resolution with non-unique distributed IDs; check whether parts 2/3 answer it.
