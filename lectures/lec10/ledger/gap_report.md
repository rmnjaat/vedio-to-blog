# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G2-001->G-002, G2-002->G-003, G3-001->G-004.

## Part 1 (00:00:00-01:05:16)

Audited: `part1.jsonl` (121 items, K1-001..K1-121) against transcript lines 78-419 (every sentence from 00:00:01 to 01:05:16). New items are in `gaps_part1.jsonl` (1 item). The validator passes for both files: `PASS gaps gaps_part1.jsonl (1 items) | errors 0 | warnings 0` and `PASS part part1.jsonl (121 items) | errors 0 | warnings 0`.

### Windows

"Covered" counts the ledger items whose first audio range starts in the window. Every substantive sentence in each window was checked against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 13 (K1-001..K1-013) | 0 | - |
| 00:05-00:10 | 13 (K1-014..K1-026) | 0 | - |
| 00:10-00:15 | 5 (K1-027..K1-031) | 0 | - |
| 00:15-00:20 | 6 (K1-032..K1-037) | 0 | - |
| 00:20-00:25 | 11 (K1-038..K1-048) | 1 | G-001 |
| 00:25-00:30 | 11 (K1-049..K1-059) | 0 | - |
| 00:30-00:35 | 4 (K1-060..K1-063) | 0 | - |
| 00:35-00:40 | 6 (K1-064..K1-069) | 0 | - |
| 00:40-00:45 | 12 (K1-070..K1-081) | 0 | - |
| 00:45-00:50 | 12 (K1-082..K1-093) | 0 | - |
| 00:50-00:55 | 9 (K1-094..K1-102) | 0 | - |
| 00:55-01:00 | 10 (K1-103..K1-112) | 0 | - |
| 01:00-01:05:16 | 9 (K1-113..K1-121) | 0 | - |

Some windows have low counts, but nothing is under-covered there:
- **00:10-00:20** is mostly two long student monologues: sorting, sharding, a zip of folders, logical partitions, Parquet and Lucene. Each proposal has its own item (K1-024..K1-037).
- **00:30-00:35** is mostly the teacher's recap of 00:21-00:30. The analyst merged the recap's audio ranges into the earlier items (K1-043, K1-045, K1-054, K1-056, K1-057, K1-060) instead of making repeats.

Part 1 is dense and faithful. The only miss is one small aside, the teacher's pushback on a 1000-key memory budget (G-001).

Verbatims: 121/121 found word for word (validator: 0 "verbatim not found" warnings). No spliced quotes found.

### Distortions

- **K1-038**: the item treats the student's whole proposal as corrected, including "storing offsets as indexes". That part was not rejected; it became the adopted design, and the same student's offset index is endorsed in K1-047. The teacher only rejected the fancy parts. Transcript: "What I would do is basically take some offsets in this, store it as indexes" ... "No need to add B+ trees, some anything fancy." Fix: in `detail` add "The offset-as-index idea survived (see K1-047); the correction targets the B+ tree pages, 8 KB blocks and the 1000-key memory limit (see G-001)."
- **K1-067**: the detail says the fixed-size index region "wastes some space". The teacher said the waste is very little: "That's a very nice hack, but it's not space. Although you're wasting very little space, but let's be a little more frugal about it." Fix: in `detail`, change "but it wastes some space" to "although it wastes very little space".
- **K1-066**: status `proposed_then_corrected` is too strong. The separator was never called wrong. It was praised as one of "two good approaches" and later replaced by a better idea. Transcript: "These are two good approaches. What else can you do?" (speaker `Teacher?`) and later "Instead of storing the separator, can you not directly store the byte offset? ... It eradicates the need of a separator." Fix:
  - status `endorsed`;
  - in `detail`, change "replaced the separator idea" to "superseded the separator with a byte offset in a header (K1-071), calling the separator approach good but improvable";
  - add flag `check: speaker of "These are two good approaches" (Teacher?)`.
- **K1-098**: status `proposed_then_corrected` is wrong. The teacher explicitly upheld the point and only judged it tolerable. Transcript: "But it's a valid point. I'm not denying it, but just that I'm probing you more to think on those lines." and later "Biggest inconsistency is okay." Fix:
  - status `endorsed`;
  - `detail`: "The teacher called it a valid point but not a problem yet, since meanings do not change dramatically";
  - the detail says "not the end of the world", but the transcript has "Is this an end of a word? No, right?" Add flag `asr: "end of a word" probably "end of the world"`.
- **K1-097** (minor, same pattern): the teacher pushed back ("Is that still a problem?") but then acknowledged the point. Transcript: "So you said update tedious, correct. You said data inconsistency, but in both cases, both of them are not a problem yet." and "Updates, tedious, okay." Fix: keep the status if the editor prefers, but add to `detail`: "the teacher acknowledged it ('update tedious, correct') but judged it not a problem yet; cost is the real issue (K1-100)". Status `endorsed` with that detail would be more faithful.
- **K1-048**: the detail says "The spoken example numbered the offsets one, two, three (apple, Amazon, book)". Apple's offset is never given a number. The student said the first line is offset zero, and the teacher numbered only Amazon (two, ASR "to") and book (three). Transcript: "first line of this file is basically ... is offset zero" ... "So Apple is done. Amazon is offset [?two | asr: "to"] ... book with offset three". Fix: in `detail`, write "The student said the first line is offset zero; the teacher's example gave Amazon offset two (ASR 'to') and book offset three."
- **K1-022 / K1-027**: each detail says the design that follows keeps an unsorted file. That is true only for part 1. Sorting returns for the weekly merge (K2-022, K3-121). Transcript (K3-121 range): "Sorting the dictionary was not introduced at first because there was no need". Fix: in both details, append "(sorting is introduced later for the update merge, see K2-022 / K3-121)". Do not change the status.
- **K1-033**: the item drops the teacher's promise to bring the student's points back in later. Transcript: "and obviously the points that you said, we will all incorporate that, right? But not with that specific, like, let's say, Parquet". Fix: in `detail`, add "The teacher said the student's points will all be incorporated, just not via Parquet specifically."
- **K1-001**: the detail cites the board agenda, but `source.board` is empty. The audio only says "two very interesting problem set points". Fix: add `source.board: ["00:00:15"]` (board_log S02, `Word dictionary without using any DB` / `Superfast KV store`), or leave the detail out and let the editor merge the board item.
- **K1-100** (minor): speaker is `student (proposal)`, but the verbatim and most of the statement are the teacher's verdict ("Biggest pain, cost."). Fix: either make the verbatim the student's line "we are having a lot of duplicated costs of saving the file", or keep the teacher verbatim and say in `detail` that the student raised the cost and the teacher named it the biggest pain.
- **K1-014, K1-018, K1-020** (wording): these items use gendered pronouns for anonymous students: "The student himself called...", "he moved to...", "he was thinking...". Fix: use "they" / "the student".

### Duplicates (within part 1)

- **K1-081 / K1-091**: both describe reading the 16-byte header, getting the index size, then the index, then the data. K1-081 adds the boot timing, the 8+4+4 split and the hash-table build. K1-091 frames it as decoder logic that "holds true for every file format". Merge, keeping both framings.
- **K1-081 / K1-116**: the same boot flow told twice. K1-116 adds the S3 specifics: the configured path, the 16-byte read, and a second S3 call for the index bytes. Partial overlap, so cross-link rather than merge.
- **K1-060 / K1-062**: both describe the in-memory hash-map lookup, then the offset, then a read of the data file. K1-060 adds "stored on disk, loaded at server start". K1-062 adds "no linear scan, a pointed read", which closes storage and querying. Partial overlap.
- **K1-112 / K1-113 / K1-117**: all three describe a random read "at this offset, read n bytes". K1-112 defines it for network attached storage. K1-113 says S3 supports it. K1-117 uses it in the GET flow. K1-114 and K1-117 both list HDFS and network hard disks as having the same semantics. Keep K1-112 and K1-113, and drop the repeated HDFS clause from K1-117, or cross-link.
- **K1-118 / K1-119 / K1-120**: all three say the read fetches only the needed bytes, a pointed read without reading the whole file. K1-119 adds "this is a key-value store / database". K1-120 adds "magical, a ton of applications". K1-118 could be folded into K1-119.
- **K1-100 / K1-103**: both cover the cost of duplicating the file on every server. K1-100 says cost is the biggest pain, and inconsistency and updates are okay. K1-103 adds the number: 100 servers means 100 TB redundant, on costly SSDs. Keep both and cross-link.
- **K1-104 / K1-108 / K1-109**: all three say to store the dictionary in one central place. K1-108 adds "the network is what is common, so it must be network-accessible". K1-109 adds "block storage, not a DB, and one file keeps portability". Partial overlap.
- **K1-029 / K1-063 / K1-092**: all three say one file is required for portability. K1-063 applies it to the index+data split. K1-092 is the closing recap. K1-092 could merge into K1-082, which also says "makes the whole dictionary shippable".
- **K1-016 / K1-086**: both say a JSON file must be read and deserialized in full before anything can be looked up. K1-016 adds the 1 TB cost. K1-086 adds the reason (JSON has no header) and the decoder parsing of braces and quotes. Partial overlap; keep both.
- **K1-034 / K1-039 / K1-061**: all three say to keep it simple. K1-034: simpler direction first, for the base concepts. K1-039: simplicity is where the power and beauty are. K1-061: one number crunch led to one level of indexing. Merge K1-034 into K1-039 and keep K1-061, which is tied to the number crunch.
- **K1-058 / K1-059**: both say the 1.75 MB index fits in RAM even though the file is 1 TB. K1-059 adds the rule of thumb that number crunching matters. Partial overlap.
- **K1-010 / K1-026 / K1-097**: all three say updates come weekly in a batch, so one huge processing pass is fine. K1-026 adds "a single-word update must not be costly". K1-097 applies it to per-server copies. Cross-link only.
- **K1-110 / K1-081**: both describe reading the header, then the index into a hash table, then random reads in the data. K1-110 restates the boot flow as a storage requirement. Partial overlap.

### Duplicates across parts (involving part 1)

- **K1-119 / K1-120 / K2-071 / K2-077**: all say pointed GETs on S3 read only the bare minimum bytes, without reading the whole file. K2-071 adds "GET, not PUT" and "huge applications". K2-077 adds "a simple key-value format to start, more complex later". K1-121's forward reference is fulfilled by K2-072..K2-075.
- **K1-035 / K1-036 / K2-076**: all say Athena lets you query a CSV file on S3. K1-035 and K1-036 frame the dictionary exercise as a simulation of that compute engine. K2-076 adds how Athena works: an index kept handy with the file, then reads at the offsets. Merge into one Athena item with both nuances.
- **K1-116 / K2-040 / K2-061 / K2-066**: all describe the API server boot flow (path, header, index, hash map, serve). K2-061 swaps the static configuration (K1-115) for `meta.json`. K2-066 makes boot equal to deployment. Cross-link; don't merge.
- **K1-115 / K2-049 / K2-061**: the S3 path given to the API servers. K1-115 has it as static configuration with a promise to revisit at deployment. K2-049 and K2-061 make it a static `meta.json` path that holds the versioned dictionary path. Partial overlap; cross-link.
- **K1-057 / K1-058 / K3-115**: the index is only about 1.75 MB. K3-115 adds "do not take MBs lightly: M is a million bytes and still holds a lot". K2-084 also reuses "it is just 1.7 MB". Cross-link.
- **K1-048 / K3-118**: offsets are byte positions where a record starts. K3-118 adds "not line numbers", which also corrects the "offset one, two, three" impression in K1-048. Merge K3-118's nuance into K1-048.
- **K1-079 / K1-081 / K3-119**: the header holds the index size. K3-119 adds that this is the byte size of the index in the same file, not the location of a separate file (a Q&A clarification). Merge K3-119's nuance into K1-079.
- **K1-022 / K1-027 / K2-022 / K3-121**: whether the file is sorted. K1-022 and K1-027 say it is not sorted at first. K2-022 says the merge needs it sorted. K3-121 says it was not sorted at first because there was no need, and is sorted later to make the merge easy. Cross-link; this is the teacher's deliberate stepwise reveal, so don't collapse it.
- **K1-100 / K1-103 / K3-111**: duplicating 1 TB onto every server is too costly. K3-111 adds that the 1 TB size was chosen on purpose to force network-attached storage and portability. Cross-link.
- **K1-028 / K2-047**: multiple files kill portability. K1-028 is sharding into sorted files; K2-047 is one file per word. Same verdict on different proposals; cross-link only.
- **K1-038 / K2-021**: avoid fancy structures like B+ trees and keep it simple. K2-021 adds "making things complex brings its own disadvantages". Partial overlap.
- **K1-039 / K1-061 / K2-010 / K2-060 / K2-080**: the keep-it-simple refrain. K2-010 adds "easy to build complex, hard to build simple". K2-060 adds "simple enough that anyone would understand". Merge the generic ones; keep the context-specific ones.
- **K1-021 / K2-018**: no repetitive entries. K2-018 applies the constraint to reject graveyard/append updates. Cross-link.
- **K1-010 / K2-002**: weekly changelog updates. K2-002 adds the apple/ball/zoo example and "apply to the file on S3". Merge, keeping both.
- **K1-019 / K1-040 / K3-059**: the CSV line format. K3-059 revisits it: the dictionary should use the length-prefixed record format, and CSV was used only because it is easy. Cross-link; K3-059 supersedes the format but keeps the teacher's "for simplicity" framing.
- **K1-016 / K1-086 / K2-073**: you can't just dump a JSON file and query it. K2-073 applies this to S3 (order ID -> details). Partial overlap.

## Part 2 (01:05:16-01:59:52)

Auditor: gap hunter, part 2. Audited file: `part2.jsonl`, 85 items (K2-001 .. K2-085). Every transcript sentence from 01:05:16 to the break (01:53:04) was checked against the part 2 items. Part 1 and part 3 were read for cross-part duplicates.

### Windows

"Covered" = part 2 items whose first audio range starts in the window. Every substantive sentence in the window was matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:05:16-01:10:16 | 12 (K2-001..K2-012) | 0 | - |
| 01:10:16-01:15:16 | 13 (K2-013..K2-025) | 0 | - |
| 01:15:16-01:20:16 | 8 (K2-026..K2-033) | 0 | - (the student's "rolling upgrade won't work, single place" point is handled under the K2-033 distortion and in G-002's detail) |
| 01:20:16-01:25:16 | 8 (K2-034..K2-041) | 0 | - |
| 01:25:16-01:30:16 | 7 (K2-042..K2-048) | 0 | - |
| 01:30:16-01:35:16 | 11 (K2-049..K2-059) | 0 | - |
| 01:35:16-01:40:16 | 6 (K2-060..K2-065) | 0 | - |
| 01:40:16-01:45:16 | 9 (K2-066..K2-074) | 2 | G-002 (the transition is called a "parallel setup"), G-003 (brainstorming rejected options shows why decisions are made) |
| 01:45:16-01:50:16 | 8 (K2-075..K2-082) | 0 | - |
| 01:50:16-01:55:16 | 3 (K2-083..K2-085) | 0 | - (01:52:05-01:53:04 is the break announcement plus the agenda, covered by K2-085) |
| 01:55:16-01:59:52 | 0 | 0 | - (break ~01:53:04-01:59:52, no content) |

Coverage is dense. Only two small items were missing, and no core concept was missing. The 01:35-01:40 and 01:50-01:55 windows have few items because they are long student turns and the break.

Verbatims: 85/85 found word for word (validator `part`: PASS, 0 errors, 0 warnings). No spliced quotes found by hand either.

### Distortions

- **K2-012**: invents apple's original meaning, "'apple, a fruit'". The transcript never says what apple's old meaning is: "let's say I have the word apple over here and and then let's say I have ball and I have a round object. Right. Okay. Now let's say my changelog contains ... that apple, and now the new meaning is a round fruit." Fix: "the file holds apple (with its current meaning) followed by 'ball, a round object'". Or, if the board shows "apple, a fruit", keep it with `source.board` and the flag `check: original meaning of apple from board`.
- **K2-068**: drops the reason the teacher gives for why no garbage is served. Transcript: "So you avoid serving garbage data because you are reading from another file now and you are just triggering a rolling deployment." Fix: add to `detail`: "No garbage is served because the new data is in another file at a new path, so each server's in-memory index matches the file it reads (old servers keep reading the old file). Contrast with the same-path upload in K2-041/K2-042."
- **K2-033**: makes the student offer three equal options (one go / rolling / canary). The student actually said a rolling upgrade would not work for a single file, and proposed an A-to-B switch to a new S3 URL plus a canary. Transcript: "Or we have to say a rolling upgrade, we will say, okay, I will change few of the files in few places, but it is a single place. So I don't think that that kind of a deployment will work." Fix: statement = "The same student frames switching API servers to the new file as a deployment problem. Since the file is in a single place, they doubt a rolling upgrade of the file would work. They propose a complete A-to-B switch instead: create the new file at a new S3 URL, give the new address to the API servers, and roll out the change with a canary (one server first, the rest once it works)." Irony to note for the editor: the teacher's final answer IS a rolling deployment of the API servers (K2-067), so keep the student's doubt clearly attributed to the student.
- **K2-048**: status `endorsed` covers the whole proposal, including polling every 5-10 minutes. The teacher accepted the static metadata file but then challenged the polling. Transcript: "Why would you do that, given that your job runs weekly?" and "So instead of polling, we can make things reactive." Fix: add to `detail`: "The teacher endorsed the static metadata file (later meta.json, K2-049/K2-061) but challenged the 5-10 minute polling for a weekly job (K2-050..K2-057); the final design replaces polling with a triggered deployment (K2-069)." Optionally split it into two items: metadata file `endorsed`, polling `proposed_then_corrected`.
- **K2-050**: status `endorsed` on what is the student's answer (unknown upload time, e.g. S3 down on Sunday). The teacher did not accept that this justifies polling. He went straight to "But we studied second week, third week that we can make things wherever we have poll, we can make things reactive." Fix: status `open`, or `detail`: "The teacher answered with 'But ...' and redirected to reactive notification (K2-051)."
- **K2-006**: says the teacher teaches "bumping the version in the header is the last step". The student proposed it, and the teacher only deferred it. Also, the header version in part 1 (K1-078) is a file-format version, not a data version. Transcript: Student: "Then update the version of it. How? Because we know that in the header file, we have the version stored" / Teacher: "That's okay. That's the last thing that we'll do. But how are you updating the dictionary?" Fix: speaker `student (proposal)`, statement "A student proposes updating the version stored in the file header; the teacher defers it as the last step and refocuses on how the dictionary file itself is updated". Confidence medium, `depends_on` add K1-078.
- **K2-011** (minor): `type: concept` with status `proposed_then_corrected`. Its siblings with the same pattern (K2-007/K2-008/K2-009) use `misconception`. Fix: type `misconception`, for consistency.
- **K2-043** (minor): adds a ".dict" extension the teacher didn't say. Transcript: "S3 colon slash slash word dictionary slash dictionary one dot dictionary something" / "dictionary two dot dictionary". Fix: "s3://word-dictionary/dictionary1.dictionary ... dictionary2.dictionary".
- **K2-085** (minor): adds "(key-value store)", which is only said after the break (K3-001), and drops the teacher's note that it is "very similar to what we discussed on word dictionary". Fix: remove "(key-value store)" or cite K3-001 in `depends_on`, and add the "very similar to the word dictionary" link to `detail`.

### Duplicates (within part 2)

- K2-010 / K2-021 / K2-060 / K2-080: all say "keep it simple". K2-010 adds "easy to build complex, hard to build simple; think only of what you need". K2-021 adds "no fancy B+ trees; complexity has its own disadvantages". K2-060 adds "simple enough that anyone understands; the beauty of system design". K2-080 is the end-of-topic summary (deciding -> development -> deployment). Merge into one or two items and keep each phrasing as `merged_verbatims`.
- K2-016 / K2-037: both say "the details matter; saying 'I'd replace it' or drawing boxes is easy". K2-016 adds imagining the code you would write. K2-037 adds the concrete checklist: where/how to upload, smooth transition, garbage data. Partial overlap; cross-link rather than merge.
- K2-053 / K2-057: both say "why poll 5,000 times for a weekly update". K2-057 adds the hedge "polling is good, I'm not against polling" and "someone can trigger something". Merge, keeping the hedge.
- K2-062 / K2-066: both say "reload the API server = what happens on boot". K2-062 is the hint (trigger a reload). K2-066 adds "equivalent to doing a deployment" and the boot steps (meta.json -> path -> file -> index -> hash map). Merge into K2-066, with K2-062's verbatim in `merged_verbatims`.
- K2-069 / K2-083: both say "a triggered deployment replaces Pub/Sub / endpoints". K2-069 adds "any deployment strategy, Jenkins / cloud provider, one invocation". K2-083 adds "out-of-the-box approach many engineers miss, same cost, we control our infrastructure". Partial; cross-link.
- K2-058 / K2-082: both describe REST/API endpoints that trigger a reload as the reactive alternative. K2-082 adds "one of three ways the teacher imagines, a little more complicated". Partial; cross-link.
- K2-039 / K2-042 (and K2-034): problems of a same-path upload. K2-039 lists them (fail, corrupt, reload needed because offsets mismatch). K2-042 adds "users see garbage for that duration, very poor UX". Partial; keep both, cross-linked through K2-041.
- K2-071 / K2-077 / K2-073: pointed GET reads on S3 without reading the whole file. K2-071 adds "GET not PUT, bare minimum, huge applications". K2-077 adds "simple key-value format to start, more complex later". K2-073 adds "can't just dump a JSON file; order ID -> details". Merge K2-077 into K2-071; keep K2-073 separate (tied to the multi-tier example).
- K2-007 / K2-018: both say "no repetitive entries in the served dictionary". K2-007 adds "ever increasing + duplicates". K2-018 adds the graveyard/compaction idea and "weekly -> clean it up directly". Distinct proposals; cross-link, don't merge.
- K2-013 / K2-015 / K2-029: writing at an offset overwrites the following bytes. K2-013 is the disk limitation. K2-015 is its consequence for "just replace it". K2-029 adds the rule "always create new entries (new file)". Partial; keep, cross-linked.
- K2-020 / K2-025: both say the merge is the merge step of merge sort. K2-020 adds "not naive, the best approach for this design". K2-025 adds the linked-list / sorted-arrays framing. Partial; cross-link.

### Duplicates across parts (involving part 2)

- K2-002 / K1-010: weekly changelog updates. K1-010 adds "say every Sunday, received over email". K2-002 adds "only the changelog arrives" and the apple/ball/zoo example. Merge, keeping both details.
- K2-007 / K1-020: the dictionary must not contain the same word twice. K1-020 adds "text editor readability, portability". K2-007 adds "file would be ever increasing". Merge or cross-link; keep both reasons.
- K2-071 / K2-077 / K1-119 / K1-120 / K1-121: pointed reads on S3, "magical", ton of applications. K1-119 adds "a database is a key-value store". K1-121 promises the applications that K2-071..K2-079 deliver. Merge K1-120 with K2-071; turn K1-121 into a `depends_on` link.
- K2-076 / K1-035 / K1-036: Athena queries CSV files on S3. K1-035/036 add "the dictionary simulates S3 + Athena". K2-076 adds the mechanism (an index kept handy next to the file). Merge, keeping the mechanism in `detail`.
- K2-072 / K2-074 / K2-075 / K3-113 / K3-114: multi-tiered (hot/cold) storage on S3 via pointed reads. K2 adds Amazon orders > 6 months, MySQL as the hot DB, and "not archival, cheap storage". K3-113 adds "to be built next week". K3-114 adds "S3 calls/network I/O not cheap, S3 not very performant, latency acceptable for infrequent reads". Merge K3-113 into K2-074, K3-114 into K2-075; don't drop the next-week reference.
- K2-067 / K2-069 / K3-116: rolling deployment to reload the API servers. K3-116 adds "cloud providers give it out of the box; load balancer stays, servers removed/added one at a time". Merge K3-116 into K2-067.
- K2-083 / K3-117: triggering a deployment instead of Pub/Sub / reload APIs; use the infrastructure we control. K3-117 adds the teacher's own war story (his services; first thought of Redis Pub/Sub). Keep K3-117 as its own `war_story` and cross-link it; don't merge the story away.
- K2-023 / K2-031 / K3-120: the update creates a whole new file with new header + index. K3-120 adds "the header is recreated". Merge K3-120 into K2-031.
- K2-022 / K3-121 / K3-123: sortedness makes the changelog merge efficient. K3-121 adds "sorting wasn't introduced at first because there was no need". K3-123 adds "O(n) instead of O(n^2); the merged file becomes next week's old file". Merge K3-121 into K2-022; keep K3-123's complexity numbers.
- K2-010 / K2-060 / K1-039 / K1-061: keep the design simple, that is its beauty. K1-061 adds "one number crunch -> one-level index". Cross-link (the principle recurs across topics).
- K2-061 / K1-115: how API servers know the dictionary path. K1-115 is static config (deployment discussion deferred). K2-061 replaces it with a static meta.json holding the path. Cross-link; this is an evolution, not a duplicate.
- K2-040 / K1-116 / K1-060: the index is loaded into memory on boot / first S3 call, then requests are served from it. Merge K2-040 into K1-116 (K1-116 is fuller); keep K2-040's framing for the garbage example via `depends_on`.
- K2-068 / K1-098: meanings don't change drastically, so temporary inconsistency across servers is acceptable. K1-098 says this about partially failed updates. K2-068 says it about eventual consistency during a rolling deploy. Cross-link.
- K2-047 / K1-029: portability = one file. K2-047 is the applied rejection (one file per word kills portability). Cross-link.
- K2-085 / K3-001: the after-break agenda vs the actual start of part 2 of the lecture (super fast KV store on commodity magnetic disks). K2-085 adds O(1) reads/writes/deletes, the file-format focus and "everyone uses it unknowingly". K3-001 adds "magnetic disk, best of everything". Merge.
- Cross-link, not duplicate: K2-018 (graveyard entries + later compaction, rejected for a weekly update) / K3-018, K3-043 (Bitcask's delete marker + merge & compaction for live updates). The teacher's "would work well when you are doing live updates" foreshadows part 3. Also K2-025 (merge = merge-sort merge, sorted) / K3-071 (Bitcask merge is NOT merge-sort, unsorted). Keep these as contrasts.
- K2-084 / K1-057, K1-058: the 1.7 MB index size. K2-084 reuses the number to argue for sending the index itself. Cross-link via `depends_on`.

### Validation

- `validate_ledger.py gaps gaps_part2.jsonl --prefix G2 ...`: `PASS gaps gaps_part2.jsonl (2 items) | errors 0 | warnings 0`
- `validate_ledger.py part part2.jsonl --prefix K2 --range 01:05:16-01:59:52 ...`: `PASS part part2.jsonl (85 items) | errors 0 | warnings 0`

## Part 3 (01:59:52-03:06:10)

Audited `part3.jsonl` (124 items, K3-001..K3-124) against every transcript sentence of 01:59:52-03:06:10. Cross-part duplicates were checked against `part1.jsonl` (121 items) and `part2.jsonl` (85 items). The part files were not edited.

### Windows

"Covered" = part 3 items whose first audio range starts in the window. Every substantive sentence in each window was traced to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:59:52-02:05 | 11 (K3-001..K3-011) | 0 | - |
| 02:05-02:10 | 7 (K3-012..K3-018) | 0 | - |
| 02:10-02:15 | 11 (K3-019..K3-029) | 0 | - |
| 02:15-02:20 | 12 (K3-030..K3-041) | 0 | - |
| 02:20-02:25 | 11 (K3-042..K3-052) | 0 | - |
| 02:25-02:30 | 9 (K3-053..K3-061) | 0 | - |
| 02:30-02:35 | 11 (K3-062..K3-072) | 0 | - |
| 02:35-02:40 | 15 (K3-073..K3-087) | 0 | - |
| 02:40-02:45 | 8 (K3-088..K3-095) | 0 | - |
| 02:45-02:50 | 6 (K3-096..K3-101) | 0 | - |
| 02:50-02:55 | 9 (K3-102..K3-110) | 1 | G-004 |
| 02:55-03:00 | 5 (K3-111..K3-115) | 0 | - |
| 03:00-03:05 | 7 (K3-116..K3-122) | 0 | - |
| 03:05-03:06:10 | 2 (K3-123..K3-124) | 0 | - |

Notes on the windows:
- The low count at 02:05-02:10 is expected. It is a slow student dialogue about put and delete, and every step of it is covered (K3-012..K3-018).
- The low counts at 02:45-02:50 and 02:55-03:00 are expected too. Those windows are long Q&A answers (file creation, the 1 TB dictionary, S3 cost), and each answer is covered by one or two dense items.
- Nothing was skipped:
  - pure admin: 02:41:59 recording upload, 03:01:27, 03:06:09 close;
  - pleasantries: 02:56:42, 03:05:47 "Thanks for asking";
  - garbled fragments with no teachable content: 02:11:12 "You make.", 02:41:18 "Just keep it in your case".
- G-004 is a small aside. In 02:53:43-02:54:24, the claim that systems without integrity only *seem* to work was left out of K3-108.

Verbatims: 124/124 found word for word. `validate_ledger.py part` reports PASS, errors 0, warnings 0. No splices found on a manual check.

### Distortions

- **K3-122**: says the teacher answered that "a new sorted dictionary is created by the merge, so nothing is inserted in place". That is not what happened.
  - The teacher only asked "Why is that complex?" and pointed to the index ("You have index, index has offset to directly go to this offset reader"). The student then worked out the merge point from the slide, and the teacher confirmed it with "Correct. This is sorted."
  - There is also a sentence inside the student's turn that sounds like the teacher's reply: "but you don't have to search anything. Right. It's direct lookup." This item has no speaker flag for it.
  - Transcript: "Like, right. But inserting a new entry, how would you decide that? Where do I need to insert? So let's say, right. Here it is. This is what, how you're creating this new dictionary, right? Change. Okay. Got it."
  - Fix:
    - statement: "...the teacher answered that lookups go directly to the index offset; the student then realised from the slide that the new sorted dictionary is created by the merge (so nothing is inserted in place), and the teacher confirmed ('Correct. This is sorted.')";
    - add flag `check: speaker of "but you don't have to search anything. Right. It's direct lookup." inside Student 1's turn (03:04:26)`;
    - keep confidence medium.
- **K3-020**: typed `misconception` / `proposed_then_corrected`. But the teacher explicitly asked for the naive approach, and the student supplied exactly that.
  - Transcript: "Now for us to perform get, what is the naive way of doing it?" -> "Just start looking at all the entries and return the latest one." -> "Return the latest one that seems very poor, but you want the best performance out of get as well."
  - Fix:
    - type `process` (the naive get baseline);
    - keep the teacher's "seems very poor" verdict in `detail`, and add "the teacher asked for the naive way first; the student's answer is the requested baseline, not a misconception";
    - status `rejected` (as the final design) instead of `proposed_then_corrected`.
- **K3-034**: the correction rests on a line whose speaker is doubtful. "whichever file my key is, right, it will go to that file" (02:17:23, labelled Teacher) directly follows the student's unfinished "because" and may be the student continuing.
  - The statement also adds "including the file being written", which was never said.
  - Transcript: "**[02:17:18] Student 2:** No, like anytime reading and writing won't go to the same file because / **[02:17:23] Teacher:** whichever file my key is, right, it will go to that file."
  - Fix:
    - add flag `check: speaker of "whichever file my key is" at 02:17:23`;
    - reword the statement to "the teacher countered that reading and writing are from the same file ('No, reading and writing are from the same file, right?')";
    - drop "including the file being written".
- **K3-118**: status `endorsed`, but the only "confirmation" is "Right. Okay. Sure." inside the student's own turn. The item flags this, but the status still asserts a verdict. Rule 3 says not to invent a verdict from the student's own turn.
  - Transcript: "So offsets are the line numbers or the actual byte from where that, you know, record is starting that offset. Right. Okay. Sure."
  - Fix: status `open`, or merge into K1-048, which carries the teacher's own definition (see the cross-part duplicates).
- **K3-091**: "spend about a week" drops the teacher's "two weeks".
  - Transcript: "Spend two weeks, two weeks period, one week of your time. Implement it."
  - Fix: "spend one to two weeks building it (he said 'two weeks', then 'one week of your time')".
- **K3-087**: "heavily used in production, as Riak's backend" drops the hedge "most of them".
  - Transcript: "And it's very heavily used in production by Riak. Riak, most of them have Bitcask as their backend."
  - Fix: "...heavily used in production through Riak; most Riak setups have Bitcask as their backend."
- **K3-100**: drops the hedge "In most cases".
  - Transcript: "In most cases, when a file is allocated, it's allocated like a huge chunk is marked as blocked".
  - Fix: start the statement with "In most cases, file systems ...".
- **K3-084**: "with each Bitcask holding a mutually exclusive set of data" makes the garbled line more specific than it is.
  - Transcript: "You'd still have, like, this is mutually exclusive set of data."
  - Fix: "with the data split into mutually exclusive sets", plus flag `check: "this is mutually exclusive set of data" (02:38:11) - what is partitioned is unclear`.
- **K3-012** (minor): the detail says the order is "first put, then get, then delete". The teacher's own sequence is garbled, and the order actually taught was put, then delete, then get.
  - Transcript: "Then we'll cover get. Then we'll cover delete and then we'll cover get." Delete is in fact taught at 02:08:37 and get at 02:10:52.
  - Fix: detail "The teacher builds the design one operation at a time, starting with put (taught order: put, delete, get)."

### Duplicates (within part 3)

- K3-017 / K3-023: both say an append-only file can be read anywhere but written only at the end.
  - K3-017 is the definition, given while rejecting the overwrite-on-delete idea.
  - K3-023 adds the words "random reads / random writes" and why the stored offset works.
- K3-033 / K3-039: both say only one file takes writes and the others are immutable or read-only.
  - K3-039 adds the numbering (001, 002, ...) and that old files can still be read.
- K3-041 / K3-070: both say the in-memory index maps a key to a file and an offset.
  - K3-070 adds the record size and the timestamp for conflicts, and that writes go only to the active file. It also recaps file rotation (K3-040).
- K3-045 / K3-071 / K3-102: all three describe merge by iterating entries into a hash table, replacing stale keys and flushing to disk.
  - K3-071 adds "not like the merge step of merge sort, because the entries are unsorted".
  - K3-102 adds that deleted keys are removed from the buffer and that this hash table is separate from the index.
- K3-043 / K3-101: both say merge and compaction skips stale and deleted entries of the read-only files.
  - K3-101 adds the Q&A framing (how the delete marker is handled) and the "two read-only + one active" example.
- K3-047 + K3-048 / K3-072: all describe keeping the sawtooth under the disk cap and the too-frequent vs too-rare merge trade-off.
  - K3-072 adds that crossing the cap crashes the system, and that the pattern also sets the maximum file size.
- K3-030 / K3-073: both say all keys must fit in memory.
  - K3-030 is student-raised, with the "keys, not values" wording.
  - K3-073 is the teacher's "main limitation": values on disk, keys and offsets in memory.
- K3-028 / K3-074: both say get, put and delete are O(1), the bare minimum.
  - K3-074 adds what O(1) means: the bare minimum the disk must do.
- K3-026 / K3-076: both describe a read as one memory lookup plus one random read.
  - K3-026 adds the 404 when the key is absent.
  - K3-076 states the cost explicitly.
- K3-089 / K3-091 / K3-103: all three recommend implementing Bitcask yourself.
  - K3-091 adds Prometheus monitoring and the 1-2 weeks.
  - K3-103 adds which details you discover (same or different process for merges, index updates) and the offer of help. Partial overlap: merge, or cross-link.
- K3-088 / K3-098: both recommend reading the Bitcask paper.
  - K3-098 adds the teacher's college paper-reading story and calls the paper "fabulous".
- K3-092 / K3-096: both list next week's topics.
  - K3-092 has S3, video encoding, view counting and storage vs compute throughput.
  - K3-096 adds SSTable, memtable and LSM trees, with Bitcask as the foundation. Partial overlap.
- K3-085 / K3-086 (partial): K3-085 says the append-only file is Bitcask's magic. K3-086 generalises it: every high-throughput persistent system uses an append-only file. Cross-link, don't merge.
- K3-009 / K3-095 and K3-021 / K3-094 (partial): the early student pushes toward a memtable or SSTable are answered in Q&A by the Bitcask vs SSTable differences (values in memory, buffering vs immediate persistence). Cross-link.

### Duplicates across parts (involving part 3)

- K1-048 / K3-118: an offset is the byte position where a record starts, not a line number.
  - K1-048 is the teacher's definition.
  - K3-118 is the student's later check (status issue above). Merge K3-118 into K1-048 as Q&A reinforcement.
- K1-079 + K1-081 / K3-119: the header stores the index size; read the header, then that many bytes of index, then serve.
  - K3-119 adds that the index itself sits in the same file (not a pointer to another file), clearing up a student's misunderstanding.
- K2-031 / K3-120: the merged file is a complete new dictionary with its own header and index.
  - K3-120 adds, in Q&A, that the header is recreated on every update.
- K2-022 / K3-121: the dictionary must be sorted for the merge to be efficient.
  - K3-121 adds why sorting was introduced late (only when the need appeared).
- K2-025 + K2-026 / K3-123: merging two sorted files is a one-pass, merge-sort-style step.
  - K3-123 adds O(n) vs O(n^2), and that the output becomes the "old" file for next week's update.
- K1-012 + K1-100 + K1-103 / K3-111: the 1 TB dictionary and the cost of copying it to every server.
  - K3-111 adds that 1 TB was chosen deliberately to force the cost argument, network-attached storage and portability, justified by multimedia meanings.
- K1-057 + K1-059 / K3-115: 170,000 words give an index of only ~1.75 MB; number crunching matters.
  - K3-115 adds "M is a million bytes, don't take MBs lightly". Partial overlap.
- K1-106 + K1-113 + K2-071 / K3-112: S3 supports pointed byte-range reads.
  - K3-112 adds that querying S3 directly was meant to show this, and that real services add caching.
- K2-072 + K2-074 + K2-075 / K3-113 + K3-114: multi-tiered storage, moving cold data to S3 and keeping it queryable, cheap but slow.
  - K2-072 has the Amazon six-months-of-orders example.
  - K3-113 adds the order-ID pointed read and "next week".
  - K3-114 adds "S3 calls/network IO not cheap". Merge, keeping both examples.
- K2-076 / K3-113: Athena queries files on S3 via an index. K3-113 mentions Athena only in garbled form (flagged). Cross-link.
- K2-067 + K2-069 / K3-116: rolling deployment comes out of the box from the cloud provider.
  - K3-116 adds, in Q&A, that the load balancer stays as servers are removed and added.
- K2-083 / K3-117: triggering a deployment instead of writing reload code; the infrastructure is ours to use.
  - K3-117 adds the teacher's own war story: he first thought of Redis Pub/Sub and exposed APIs for a couple of services.
- K2-085 / K3-001 + K3-008: the after-break agenda is a super fast key-value store with O(1) operations and persistence.
  - K2-085 (pre-break) adds "file format beyond CSV".
  - K3-001 adds cheap magnetic disk / commodity hardware.
- K2-018 / K3-013 + K3-043 (contrast, do not merge): for the dictionary, appending updates plus later compaction was rejected because there may be no repeated entries. For Bitcask, the same idea is the design. Cross-link to show the contrast.
- K2-020 + K2-025 / K3-071 (contrast, do not merge): the dictionary merge is merge-sort style on sorted files, while the Bitcask merge is explicitly "not similar to merge of merge sort". Cross-link.
- K2-013 + K2-029 / K3-016 + K3-017 (partial): you cannot rewrite bytes in place on disk, so write new entries. Part 3 turns this into the append-only rule. Cross-link.

### Missed items

- G-004 (02:53:43-02:54:24, aside): systems that ignore integrity only seem to work; in reality they do not.

`gaps_part3.jsonl`: 1 item. Validator: `PASS gaps gaps_part3.jsonl (1 items) | errors 0 | warnings 0`.

