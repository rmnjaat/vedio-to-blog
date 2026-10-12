# Ledger gap report - lecture 01

New items are in gaps.jsonl. The temporary IDs from the parts were renumbered as follows: G1-001->G-001, G1-002->G-002, G2-001->G-003, G2-002->G-004, G2-003->G-005, G3-001->G-006, G3-002->G-007, G3-003->G-008, G3-004->G-009.

## Summary
- **Missed items: 9.** Part 1 has 2 (G-001, G-002), part 2 has 3 (G-003 to G-005) and part 3 has 4 (G-006 to G-009). Most are small heuristics or asides. No core concept was missing.
- **Distortions: 12.** Part 1 has 5 (K1-062, K1-029, K1-128, K1-014, K1-122). Part 2 has 4 (K2-135, K2-128, K2-151, K2-071/K2-076). Part 3 has 3 (K3-027, K3-033, K3-014).
- **Duplicate pairs: 18.**
  - 11 are within a part. Part 1: K1-096/098, K1-108/111, K1-060/064, K1-084/085, K1-112/118. Part 2: K2-003/004, K2-068/069, K2-139/143, K2-039/046, K2-086/088. Part 3: K3-038/062.
  - 7 cross parts: K2-056/K3-038, K2-055/K3-064, K2-063/K3-060, K2-077/K3-069, K2-059/K3-066 (partial), K2-079/K3-078 and K1-008/K2-100. The part 2/part 3 pairs come from the teacher repeating himself in the closing Q&A. Merge them or cross-link them, but don't drop them blindly: some of the later repeats add nuance.

## Part 1 (00:00:00-01:05:42)

Per-window coverage. "Covered" = ledger items whose first audio range starts in the window. Every substantive sentence in each window was checked against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 5 | 0 | - |
| 00:05-00:10 | 8 | 0 | - |
| 00:10-00:15 | 11 | 1 | G-001 |
| 00:15-00:20 | 14 | 0 | - |
| 00:20-00:25 | 11 | 0 | - |
| 00:25-00:30 | 10 | 0 | - |
| 00:30-00:35 | 12 | 1 | G-002 |
| 00:35-00:40 | 10 | 0 | - |
| 00:40-00:45 | 10 | 0 | - |
| 00:45-00:50 | 11 | 0 | - |
| 00:50-00:55 | 12 | 0 | - |
| 00:55-01:00 | 10 | 0 | - |
| 01:00-01:05:42 | 8 | 0 | - |

Part 1 has fewer items than part 2, but that is not under-coverage. The first ~6.5 minutes are admin feedback, and every technical window has 10-14 items, which matches the content. Only two small heuristics were missing.

### Distortions (part 1)

- **K1-062**: says the Goldman Sachs story happened "in a past cohort". The transcript does not say when: "this was the exact optimization that while we were having this discussion, that guy from Goldman Sachs, he got that idea". Fix: drop "(in a past cohort)" and say "during an earlier discussion of this topic", or flag `check: when/where`.
- **K1-029**: status `proposed_then_corrected`. The teacher never explicitly corrected the student. He said "Great. Thanks for adding that... what Mohan added is something called as a materialized views" and later only added "you need to update explicitly". Fix: status `endorsed`. In `detail`, say the teacher refined "views are kept up to date" into "materialized views must be refreshed explicitly via triggers", and keep the student's auto-update claim marked as not upheld.
- **K1-128**: credits "vertical sharding" to the teacher agreeing. In the transcript, "Correct. Vertical sharding" sits inside Student 3's turn, so who said it is ambiguous: "we can have 30 tables somewhere. Correct. Vertical sharding, but it will also, we need to manage those connection pooling". Fix: add flag `check: speaker of "Correct. Vertical sharding"` and set confidence to medium.
- **K1-014**: says the remote cache "sits in front of the database". The teacher only said "You might have a centralized remote cache, which is say Redis or something". Minor. Fix: "alongside the database".
- **K1-122**: "most product companies don't need it" comes from the garbled "not product companies need that because cloud gives you those guarantees". The meaning is plausible but uncertain. Fix: add flag `asr: "not product companies"` and set confidence to medium.

### Duplicates within part 1

- K1-096 / K1-098: both say to scale bottom-up and make sure dependencies are scaled before scaling up.
- K1-108 / K1-111: both say to create two connection objects and pick one per use case in the handler.
- K1-060 (its detail) / K1-064: both say few people use disk caching because they assume memory is needed.
- K1-084 / K1-085: both define the unit economics of a machine. Partial overlap.
- K1-112 / K1-118: both say proxy layers come in week 5 (or 6). Partial overlap.


# Part 2 gap report (01:05:42-02:25:43)

## Per window
- 01:05:42-01:11:00: covered 19 items (K2-001..K2-019), missed 0
- 01:11:00-01:16:30: covered 13 (K2-020..K2-032), missed 0
- 01:16:30-01:22:30: covered 15 (K2-033..K2-047), missed 0
- 01:22:30-01:28:00: covered 12 (K2-048..K2-059), missed 0
- 01:28:00-01:33:30: covered 13 (K2-060..K2-072), missed 0
- 01:33:30-01:40:00: covered 11 (K2-073..K2-083), missed 0 (break 01:38:25-01:44:37)
- 01:40:00-01:50:00: covered 16 (K2-084..K2-099), missed 0
- 01:50:00-01:56:30: covered 16 (K2-100..K2-115), missed 0
- 01:56:30-02:03:00: covered 15 (K2-115..K2-129), missed 1 (G-003)
- 02:03:00-02:09:00: covered 12 (K2-129..K2-140), missed 1 (G-005)
- 02:09:00-02:16:00: covered 10 (K2-140..K2-149), missed 0
- 02:16:00-02:25:43: covered 17 (K2-149..K2-165), missed 1 (G-004)

Part 2 is dense and faithful; nearly every substantive sentence has an item.

## Distortions
- K2-135. Problem: the statement presents Vercel/Netlify as current SSE users for deployment logs. The caveat appears only in `flags`, not in the statement or detail. Quote: "They leveraged this. They used to leverage it. Now they switched their model". Fix: move the caveat into `detail` ("they used to; they have since switched their model"). See G-005. The verbatim also splices fragments with "..." and is not one exact quote.
- K2-128. Problem: "low-latency" is inferred. The transcript says "low communication" (probable ASR error) and the item carries no flag. Quote: "which is why it is used for any real-time data transfer which requires low communication over it". Fix: add the flag `asr: "low communication" probably "low latency"` and set confidence to medium.
- K2-151. Problem: status is `endorsed`, but whether the teacher affirmed is unknown (the transcript has check: "Yes" may be the Teacher answering), and confidence is low. Quote: "So you can, you can set up this [?SSE | asr: \"ssc\"] over a LB as well, right? ... Yes. Okay, okay. [check: \"Yes\" may be the Teacher answering]". Fix: change status to `open`.
- K2-071 and K2-076 (minor). Problem: each verbatim splices a student sentence with the teacher's "Correct." into one quote. Fix: keep only the student question in verbatim, or mark the speaker change.

## Duplicates
Within part 2:
- K2-003 / K2-004: the Akamai credit appears in both (in K2-003's detail and as K2-004's statement). Fix: drop it from K2-003's detail.
- K2-068 / K2-069: "ideally N consumers for N partitions" is stated in both.
- K2-139 / K2-143: both say "implement each pattern to discover its strengths and limits".
- K2-039 / K2-046: retention/deletion policy, persisted until deleted (partial overlap).
- K2-086 / K2-088: the 2000-vs-1997 count++ example is restated (partial overlap).

Across parts (the teacher repeated these in the end Q&A):
- K2-056 / K3-038: Kafka parallelism = number of partitions.
- K2-055 / K3-064: consumers beyond the partition count get nothing.
- K2-063 / K3-060: Kinesis shards = Kafka partitions.
- K2-077 / K3-069: SQS visibility timeout.
- K2-059 / K3-066: Kafka commit = checkpoint of the read position (K3 adds "not a DB commit").
- K2-100 / K1-008: concurrency in depth next week (partial overlap).


## Part 3 (02:25:43-03:15:09)

### Windows
- 02:25:43-02:36:00: covered 22 items (K3-001..K3-022), missed 2 (G-006, G-007)
- 02:36:00-02:45:00: covered 20 items (K3-022..K3-041), missed 0
- 02:45:00-02:55:00: covered 21 items (K3-040..K3-062), missed 0
- 02:55:00-03:05:00: covered 24 items (K3-062..K3-085), missed 1 (G-008)
- 03:05:00-03:15:09: covered 21 items (K3-085..K3-105), missed 1 (G-009)

All 105 part-3 verbatims were found word for word in the transcript (after normalisation). Coverage is dense: the misses are small asides plus one heuristic.

### Distortions
- K3-027: the statement adds "which is cheap for the master". The transcript only says "Some database gives you direct SSH option to go and read the entire bin log file and then do processing on your end. If your database do that, great." Fix: drop "which is cheap for the master", or reword it as "the teacher prefers this ('great')".
- K3-033: the statement is unqualified ("CDNs store cached content on disk, not RAM"). Right afterwards the teacher hedged: "I don't know if they cache something on RAM or not. They can, if they want to". Fix: add "(teacher's view; he has not worked for a CDN provider, see K3-035)" to the detail.
- K3-014: the statement says "batch writes", but the transcript says "you can pass and write and whatnot". The item does carry an ASR check flag. Fix: write "process/write in bulk (ASR unclear)" in the statement, or set confidence to low.

### Duplicates (involving part 3)
- K3-038 ~ K2-056: Kafka parallelism = number of partitions. The teacher repeated it in Q&A; merge, or keep K2-056 as the main item.
- K3-062 ~ K3-038: both say more partitions = more parallelism. Near-duplicate.
- K3-069 ~ K2-077: SQS visibility timeout. Overlapping explanations; K3-069 adds "re-consumed by another consumer", and K3-070 gives 10 s/10 min where K2-077 says 2/10 min.
- K3-078 ~ K2-079: delete the SQS message only after processing.
- K3-066 ~ K2-059: Kafka commit = consumer checkpoint (partial overlap; K3-066 adds "not a DB commit").


