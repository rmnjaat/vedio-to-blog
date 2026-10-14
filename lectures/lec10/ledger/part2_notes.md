# Lecture 10 ledger, part 2 (01:05:16 - 01:59:52): notes

File: `part2.jsonl`, 85 items (K2-001 .. K2-085), validator: PASS (0 errors, 0 warnings; every verbatim found word for word).
Board items are not included (the editor merges them); `source.board` is empty on every item.

## Topic tree

- **dictionary > updates** (running case: word dictionary on S3)
  - Framing: K2-001
  - changelog (weekly Oxford changelog, no hash/diff needed, sort small changelog in memory): K2-002, K2-009, K2-024
  - update job (cron vs batch, new server, download from S3, header version last, 2 TB disk): K2-003, K2-004, K2-005, K2-006, K2-030
  - append at end (rejected: duplicates, ever-growing; graveyard + compaction rejected): K2-007, K2-018
  - in-place update (fails: disk writes blindly over the next entry): K2-008, K2-011, K2-012, K2-015
  - merge into new file (merge step of merge sort, needs sorted file, two pointers, line by line, A..F walkthrough): K2-019, K2-020, K2-022, K2-023, K2-025, K2-026, K2-027, K2-028
  - upload: K2-031, K2-032
  - transition (deployment options, canary): K2-033
  - same path (upload failure, corruption, rollback, temp storage, offsets mismatch -> garbage): K2-034, K2-035, K2-036, K2-039, K2-041, K2-042
  - new path (dict1/dict2 versioned names; IP in path; S3 versioning = same thing): K2-043, K2-044, K2-063
  - notify servers (invalidate command, time-based switch, Redis Pub/Sub, latest flag, version check per request, REST endpoint, one-at-a-time with LB port, updated_at checks): K2-045, K2-046, K2-052, K2-054, K2-055, K2-056, K2-058, K2-059, K2-064, K2-065
  - meta file (static meta.json path, polling 5-10 min, why poll weekly): K2-048, K2-049, K2-050
  - reload (reload = boot = deployment; AWS SDK rolling deployment; eventual consistency, no garbage; step order; alternatives incl. pushing the 1.7 MB index): K2-062, K2-066, K2-067, K2-068, K2-069, K2-081, K2-082, K2-083, K2-084
- **dictionary > serving**: K2-040; boot via meta.json: K2-061
- **dictionary > portability** (one file per word kills portability): K2-047
- **storage > file io** (blind overwrite, IDE analogy, always create new entries): K2-013, K2-014, K2-029
- **storage > s3 pointed reads**: K2-071, K2-073, K2-077
- **storage > multi-tiered storage** (Amazon orders, foundation, cheap not archival): K2-072, K2-074, K2-075
- **storage > data lakes** (Athena, definition, Apache Hudi, Hive partitions): K2-076, K2-078, K2-079
- **communication > polling vs reactive**: K2-051, K2-053, K2-057
- **design principles**
  - simplicity: K2-010, K2-021, K2-060, K2-080
  - implementation details: K2-016, K2-037
  - engineer hats: K2-017
  - building blocks: K2-038
- **admin**: notes (pre-written notes cover the flow): K2-070; agenda (super fast KV store after the break): K2-085

## Counts by type

| type | n |
|---|---|
| concept | 22 |
| rule_of_thumb | 16 |
| misconception | 12 |
| qa_insight | 6 |
| example | 6 |
| claim | 6 |
| process | 5 |
| tradeoff | 4 |
| comparison | 3 |
| admin_reference | 2 |
| analogy | 1 |
| number | 1 |
| definition | 1 |
| **total** | **85** |

Confidence: 66 high, 19 medium, 0 low. Status: student proposals are marked `proposed_then_corrected` only where the
teacher explicitly corrected (K2-007, K2-008, K2-009, K2-011, K2-046, K2-059), `rejected` where he dismissed the idea
(K2-018, K2-045, K2-047, K2-055, K2-056, K2-064, K2-065), `open` where he moved on without a verdict (K2-032, K2-033).

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 01:05:16-01:10:16 | 12 | update problem, student proposals, append rejected, hash/diff unneeded |
| 01:10:16-01:15:16 | 13 | disk overwrite limitation, three hats, graveyard idea, new-file merge |
| 01:15:16-01:20:16 | 8 | merge walkthrough; second half is one long student turn (new path, deployment) |
| 01:20:16-01:25:16 | 8 | mostly a long student turn (rollback, temp storage) and teacher reflection |
| 01:25:16-01:30:16 | 7 | garbage-data example (prepared notes), new path, rejected notify ideas |
| 01:30:16-01:35:16 | 11 | meta file, polling vs reactive, Redis Pub/Sub |
| 01:35:16-01:40:16 | 6 | long student turns (REST endpoint, LB port; S3 versioning, updated_at) - re-read, all teaching points covered |
| 01:40:16-01:45:16 | 9 | reload = deployment, rolling deploy, eventual consistency, Amazon orders |
| 01:45:16-01:50:16 | 8 | multi-tier storage, Athena, data lakes, Hudi/Hive, Q&A |
| 01:50:16-01:59:52 | 3 | alternatives Q&A, next-topic agenda; 01:53:04-01:59:52 is the break |

Windows under 10 items were re-read: the low counts come from long student monologues whose content is one or two
proposals each, not from missed teaching.

## Doubts / open questions

- K2-003 / K2-004: the teacher's "batch job is batch processing. Job is periodic updates" likely drops "cron" before
  "job" (`[check]`); speaker of "Now we are talking." at 01:07:07 is `Teacher?`.
- K2-013: "We have to do that happen in file IO." may be a student line (`[check]`).
- K2-027: merge walkthrough has ASR duplicates and `[?written | asr: "rotten"]`; the board merge page (S38-S40)
  should confirm the letters used.
- K2-035/K2-036: the teacher thanked the student but did not explicitly endorse every point; later (01:24:27) he
  re-lists upload failure and corruption as same-path problems, so marked endorsed.
- K2-046: "not handy" and "independent mind" are possibly mis-heard; speaker of "That's unreliable." is `Teacher?`.
- K2-048: "Perfect." inside the student's turn may be the teacher (`[check]`), not used as the verdict on its own.
- K2-059: "Complex, complex." repeated in the ASR may be the teacher interrupting.
- K2-067: missing audio 01:41:29-01:41:32 and two `[unclear]` spans; the board (S52: `AWS SDK` -> `Deploy`) supports it.
- K2-084: teacher says the index is "just 1.7 MB" (matches part 1's 1.751 MB computation; the prepared notes on the
  board say 2.6 MB with 171476 words - editor/fact-checker may want to note the difference).
- Board-only content not in audio for this range: the prepared "Updating the dictionary" page (merge in O(n),
  "Dictionary is sorted. Index is sorted") and the "Transitions" page (periodic refresh, graceful termination |
  reload, parallel setup) - for the editor's B-items.
