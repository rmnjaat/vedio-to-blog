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
| 00:20-00:25 | 11 (K1-038..K1-048) | 1 | G1-001 |
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

Part 1 is dense and faithful. The only miss is one small aside, the teacher's pushback on a 1000-key memory budget (G1-001). It sits next to K1-038, so the editor may fold it into K1-038's `detail` instead of keeping it as a separate item. A second audit pass re-read every sentence from 00:00:01 to 01:05:16 and found no other miss.

One sentence was deliberately left unitemized because its meaning is unclear: "We should not be able to copy tens and hundreds of files. Only a specific software can read it." (00:13:46). It may mean that a multi-file layout needs special software to read it. If the board or audio confirms that reading, it is a nuance for K1-029, not a new item.

Verbatims: 121/121 found word for word (validator: 0 "verbatim not found" warnings). No spliced quotes found.

### Distortions

- **K1-038**: the item treats the student's whole proposal as corrected, including "storing offsets as indexes". That part was not rejected; it became the adopted design, and the same student's offset index is endorsed in K1-047. The teacher only rejected the fancy parts. Transcript: "What I would do is basically take some offsets in this, store it as indexes" ... "No need to add B+ trees, some anything fancy." Fix: in `detail` add "The offset-as-index idea survived (see K1-047); the correction targets the B+ tree pages, 8 KB blocks and the 1000-key memory limit (see G1-001)."
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
- **K1-014, K1-018, K1-020** (wording): these items use gendered pronouns for anonymous students: "The student himself called...", "he moved to...", "he was thinking...". Fix: use "they" / "the student". The same applies to the teacher: K1-018, K1-023, K1-027, K1-077 and K1-088 use "he/his" for the teacher, whose pronouns are not stated; use "the teacher" / "the teacher's".
- **K1-068**: the detail says "the student fell back to a separator", but the separator reply is labelled `Student?`, not Student 1 (Gaurav), and K1-066 also uses that same line as its source. Transcript: "**[00:40:03] Student?:** Yeah, having a separator probably." Fix: change to "a student (speaker unclear) then fell back to a separator", and add flag `check: speaker of "Yeah, having a separator probably" (Student?)` to K1-068 and K1-066.
- **K1-103**: the statement narrows the teacher's cost claim to SSDs only. Transcript: "you would be storing it in SSDs. SSDs or any disk is very costly." Fix: change "(SSDs, which are very costly)" to "(SSDs, or any disk, which are very costly)".
- **K1-108** (minor, dropped clause): the teacher gave cost as one reason and said other problems come with it too. Transcript: "Because it is cost inefficient and other problems come with that." Fix: in the statement, change "is cost-inefficient" to "is cost-inefficient, and other problems come with that".
- **K1-043** (minor, dropped hedge): the teacher called the 0.5 TB figure a rough estimate. Transcript: "I would be reading 0.5 terabytes, like half of it, 0.5 terabytes on every request, rough estimate." Fix: in the statement, change "on average half a terabyte" to "on average, as a rough estimate, half a terabyte".

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
- **K1-012 / K3-111**: the dictionary is 1 TB. K1-012 states the requirement (1 TB, 170,000 words). K3-111 adds that the size was chosen on purpose to make per-server copies too costly, and that it can be justified by multimedia meanings. Cross-link; K3-111's reason could go into K1-012's `detail`.
- **K1-006 / K3-112 / K3-114**: response time / S3 latency. K1-006 says high response time is acceptable and caching or batching are known fixes, left out on purpose. K3-112 says that in the real world you would add caching, and that querying S3 directly was only meant to show pointed reads. K3-114 adds that S3 calls and network I/O are not cheap. Cross-link; the editor may add K3-112's "in the real world you have to do that" to K1-006's `detail`.
- **K1-022 / K1-027 / K3-122**: sorting the file. K3-122 adds a student's worry that keeping 170,000 records sorted complicates inserts, and the answer that the merge builds a new sorted file. Cross-link with the K2-022 / K3-121 chain above.
- **K1-064 / K3-027** (look-alike, not a duplicate): both rebuild an index by scanning the whole file at startup. In K1-064 the teacher rejects it for the dictionary, because the file changes only weekly. In K3-027 the teacher accepts it for the Bitcask store after a crash. These are different systems with opposite verdicts. Cross-link only, and do not merge.
