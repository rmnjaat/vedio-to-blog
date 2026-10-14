# Teaching Map - Lecture 10 (Week 5, Day 2): Storage engines - a word dictionary without a database, and a super fast key-value store on disk (Bitcask)

Source: `lectures/lec10/transcript/transcript.md` (03:06:31). All timestamps refer to that file / the video.
Purpose: extract *how* the teacher teaches so the learning site can reuse it in a reader-first flow. Nothing here is lecture content to be dropped; section 8 shows where every piece can live.

Note on context: this is **day 2 of week 5** ("we'll continue our discussion on storage engines", 00:00:01). Two problem statements, both "actively used in production" (L-0002): (1) a read-mostly word dictionary served from one portable file on S3 (00:00:49-01:52:05), (2) a super fast persistent key-value store on cheap magnetic disk, revealed at the end as **Bitcask** (01:59:52-02:41:59). It relies on earlier weeks for load balancers / API servers, Redis Pub/Sub and "polling vs reactive" (week 2-3, 01:31:51), sharding-style routing ("yesterday's pattern", 00:13:12), distributed ID generators (02:30:15) and a video on embedded databases (02:37:28). No previous lecture map is available for this lecture, so backward references come from the transcript only.

Student labels: `S1`...`S10` follow the transcript's `Student N` labels. The transcript warns that **`Student 1` and `Student 3` are each used for several different people** (S1 at 00:09:52, 00:38:30, 01:06:15, 02:46:31 are different students; S3 at 00:51:59, 00:40:13, 01:12:53 likewise). Rows below keep the label as given; "S1 (another)" marks a change of person where the transcript makes it clear.

---

## 1. Lecture skeleton

| # | Start | End | Mins | Topic | How introduced | Transition out |
|---|---|---|---|---|---|---|
| 0 | 00:00:01 | 00:00:49 | 1 | Admin: week 5 day 2, agenda (two problem statements, both used in production) | - | "So let's start with the first one" |
| 1 | 00:00:49 | 00:05:00 | 4 | **Problem statement**: word dictionary with no traditional DB; scalable storage + compute; high latency OK; **portability**; read-only, weekly changelog every Sunday; single-word lookup, 404; 1 TB, 170,000 words | **Constraint-loaded problem first** ("quote-unquote tricky"); storage/compute split (L-0005); four axes: storage, query, portability, seamless updates (L-0013) | "So let's start with the storage one" |
| 2 | 00:05:00 | 00:23:53 | 19 | **Storage format brainstorm** -> naive CSV + linear scan | **Open problem to class**, teacher adds constraints one by one when students jump ahead | "the only thing that should come to your mind is indexing" |
| 2a | 00:05:00 | 00:09:24 | 4.5 | Text vs JSON (JSON must be fully read and deserialized); CSV `apple,fruit`; **no repeated entries** constraint added; "will you keep it sorted?" (left open) | Student proposal, Socratic probing ("how do you query a JSON format?") | "Hemant..." -> next student |
| 2b | 00:09:24 | 00:19:57 | 10.5 | S1's requirements (key-value, read-heavy >1000:1, cheap updates); sort + shard into many files -> **portability = literally one file** (no zip); logical partitions + header idea, Parquet, Lucene; Athena-on-S3 as what is being simulated | Teacher pushes back on sophistication: "we'll come to that... it's fun to discover it step by step" (00:09:32); **real-world anchor** (Athena on S3, 00:17:40) | "I'm trying to keep it one level down and then jump the level" |
| 2c | 00:19:57 | 00:21:46 | 2 | "How would you search on this?" S2 -> binary search, B+ tree, 8 KB pages, 1000 keys in memory | Student proposal cut off as **over-engineering** ("what a five year old [would] understand") | "Give me a minute" -> teacher takes over |
| 2d | 00:21:46 | 00:23:53 | 2 | Naive design: CSV file, line-by-line scan; worst case 1 TB, average 0.5 TB per read; slow, wears disk | **Teacher-narrated naive baseline** (D-01) | "Whenever reads are slow... indexing" |
| 3 | 00:23:53 | 00:34:54 | 11 | **One-level index** (key -> byte offset) and its size | Rule first ("reads slow -> index"), then class builds it | "This is the first part where we sorted out our storage and our querying side" |
| 3a | 00:23:53 | 00:26:50 | 3 | Index = key + offset (offset = nth byte where the line starts); read path via index file; why a linear scan of the index still beats scanning data | Student answer refined ("And the key, right?"); D-02 | "Can we fit this index in memory?" |
| 3b | 00:26:50 | 00:34:54 | 8 | **Number crunch**: 170,000 x (4.3 + 4 + 2) = 1,751,000 B = 1.751 MB -> load into in-memory hash map at boot; pointed read; recap of storage + query | **Data first**: student does the multiplication live ("open a calculator"); S6's A-Z idea set aside | "Now let's talk about portability" |
| 4 | 00:34:54 | 00:49:38 | 15 | **Portability: one file** -> header -> custom file formats | **Constraint violation exposed** ("This breaks the portability thing") | Recap: "because of that one constraint... one file instead of multiple" |
| 4a | 00:34:54 | 00:41:22 | 6.5 | Options: rebuild index at startup (S7); concatenate with separator line (S7); fixed-size pre-allocated index region 2 MB (S10: "very nice hack" but wasteful); data top-down / index bottom-up (S1, still needs separator); store info at position zero (S3) -> "store the byte offset" | **Crowdsourced alternatives**, each tested with "how would you know when to stop reading the index?" (D-03) | "Can you not directly store the byte offset?" -> "Yes, we can" |
| 4b | 00:41:22 | 00:45:58 | 4.5 | **Header** = classic mechanism of PNG/JPG/MP3/AVI; fixed 16 B: 8 B magic name, 4 B version, 4 B index size; AODB example; boot reads 16 B -> index -> data | Student's idea named and generalised; D-04 | "So this makes your entire dictionary shippable" |
| 4c | 00:45:58 | 00:49:38 | 3.5 | Sections + header = any custom format (JPG, MP4, Parquet, PPT, PDF); JSON/CSV have no header; **encoder/decoder**; "browser does not support TIF"; teacher wrote his own image format | Generalisation + familiar error message | "Now we'll touch upon infrastructure side of things" |
| 5 | 00:49:38 | 01:05:16 | 15.5 | **Serving the dictionary**: LB -> API servers -> file on networked storage with random reads | Recap of part 1, then classic diagram (user, LB, API servers, D-05) | "Now this is still not done... Updates" |
| 5a | 00:49:38 | 00:56:36 | 7 | `GET /word`; shared disk (S3 student) vs copy on every server; update tedious, inconsistency (meanings barely change) -> **"Biggest pain, cost"**; 1 TB RAM per box; 100 servers = 100 TB redundant | **Devil's advocate** ("why not store this one file on every server? what's the harm?") | "have a central place where you are storing the dictionary" |
| 5b | 00:56:36 | 01:01:41 | 5 | S5: S3, ranged get-object; teacher: pin properties first -> **network attached storage with file-system semantics + random reads** `(file, offset, n)`; HDFS, network HDD equally fine | **Properties before technology** (00:57:50) | "Everyone understands S3. That's why I'm going with S3" |
| 5c | 01:01:41 | 01:05:16 | 3.5 | Boot flow: path from config -> read 16 B header -> read index -> in-memory hash table; GET flow; 404; **pointed reads on S3 = "we just built our database"** | End-to-end walk on the diagram | "That is magical. It has a ton of applications" |
| 6 | 01:05:16 | 01:24:27 | 19 | **Weekly updates**: apply changelog -> merged new file | **Open problem** ("how would we go about it?") on the copied diagram (D-06) | "let me just converge to what Hemant said" |
| 6a | 01:05:16 | 01:10:56 | 5.5 | S1 (another): periodic job on a new server, download dictionary; append changelog at end (duplicates); iterate and replace; hash/diff (unnecessary); replace in place via index offset | Student proposal walked step by step ("Is it really that simple? Think of it") | "What happens when you replace this by this? Will this entry move down?" |
| 6b | 01:10:56 | 01:14:46 | 4 | **How disk writes work**: overwriting spills into the next line (D-07); IDE-vs-disk analogy; three hats; graveyard entries + compaction (rejected for a weekly batch); S9: build a new file -> "**merge of merge sort**", requires sorted file | **Mechanism reveal** after a wrong intuition | "I'll just quickly walk you through" |
| 6c | 01:14:46 | 01:18:17 | 3.5 | Sorted dictionary + sorted (or sort-in-memory) changelog; two-pointer merge walkthrough a/b/c/d/f + c''/e/f'' (D-08); streamed line by line, never in memory; merge server needs >= 2 TB disk | **Worked example on the board** | "Now how would the changes... go to S3?" |
| 6d | 01:18:17 | 01:24:27 | 6 | S1 (Hemant): new S3 path, swap pointer, deployment, canary; teacher: why not the same path? -> rollback, corruption, temp storage; "drawing boxes is easy" | Student-led; teacher probes the simpler alternative | "let me just converge" |
| 7 | 01:24:27 | 01:43:59 | 19.5 | **Telling the API servers about the new file** | Teacher converges, then reopens the brainstorm | "That's exactly what I have written in this part" (prepared notes) |
| 7a | 01:24:27 | 01:26:47 | 2.5 | Same-path upload: stale in-memory offsets (apple @100, 1024 B) read **garbage** until reload (D-09) | **Failure walk-through with numbers** | "So now it looks like it makes sense for us to upload it to a new path" |
| 7b | 01:26:47 | 01:31:51 | 5 | New path `dictionary2.dictionary`; IP in path (no difference); invalidate command to all servers (too complex); switch at known time (unreliable); one file per word (kills portability, D-11); S5: **static meta file** polled every 5-10 min | **Open problem**: "How do you tell API servers...?" | "Why would you poll... given that your job runs weekly?" |
| 7c | 01:31:51 | 01:37:06 | 5 | Polling -> reactive (**Redis Pub/Sub**, D-10) but "too complex"; latest-flag in header; version check per request (still polling); REST endpoint / register servers / change ports ("Complex, complex") | Backward link to week 2-3; "Can we be smart about it? Can we do better?" | "Let me give a hint" |
| 7d | 01:37:06 | 01:41:00 | 4 | Hint: on boot a server already reads meta.json -> reload = boot; S4: same path + S3 versioning (= the two-files idea), updated_at checks (still polling) | **Hint to converge** | "Let me converge faster. Otherwise, we would spend till 11.30" |
| 7e | 01:41:00 | 01:43:59 | 3 | **Trigger a rolling deployment** via AWS SDK / Jenkins: new servers read meta.json; brief inconsistency but never garbage ("eventually consistent... meanings don't change drastically") | **Punchline**: "throw it out of the window. Trigger a simple deployment" | Shows prepared notes: parallel setup |
| 8 | 01:43:59 | 01:52:05 | 8 | **Why it matters**: pointed reads on S3 + Q&A | **Payoff after the build** ("But now why did we discuss it?") | "Let's folks, we'll go on a break" |
| 8a | 01:43:59 | 01:46:23 | 2.5 | Multi-tiered storage: Amazon orders > 6 months -> S3, recent -> MySQL; S3 as queryable cheap storage, not archive (D-12) | Familiar product example | "Another example, Athena" |
| 8b | 01:46:23 | 01:47:56 | 1.5 | Athena, data lakes, Apache Hudi table format, Hive partitions = "exactly this" | Name-dropping applications | "any questions on this?" |
| 8c | 01:47:56 | 01:52:05 | 4 | Q&A: order of steps (merge -> new path -> meta.json -> deploy); can we avoid a full redeploy (reload endpoint; push the 1.7 MB index itself) | Student-driven | Break |
| 9 | 01:52:05 | 01:59:52 | 8 | Admin: break (teaser: O(1) reads/writes/deletes with persistence, "everyone uses it unknowingly") | - | - |
| 10 | 01:59:52 | 02:14:35 | 14.5 | **Super fast KV store on magnetic disk: put / delete / get** | **Hardware first** (how a magnetic disk works), then operation by operation | "So we just did read, write, update, delete, everything with full persistence" |
| 10a | 02:00:12 | 02:02:52 | 2.5 | Storage hierarchy (L1, memory, SSD, HDD, tape); head + spinning platter; byte offset -> disk/sector/offset; mechanical movement is the cost (D-13) | Mechanism lecture | "So how would a put look like?" |
| 10b | 02:02:52 | 02:08:37 | 6 | Put: persist immediately (memtable rejected); append-only log, zero seek; overwrite also appended (D-14) | Student-led, teacher enforces "step by step" (put, then delete, then get) | "put operation is sorted" |
| 10c | 02:08:37 | 02:10:52 | 2 | Delete: overwrite-with-minus-one rejected (append-only); delete = put(K, special value) | **Constraint pushback** -> first principles | "Now comes the next part. How would you perform get" |
| 10d | 02:10:52 | 02:14:35 | 3.5 | Get: naive scan for latest -> in-memory hash table key -> offset of latest entry; put/update/delete update the table; crash -> rebuild by scanning the file | Rule reuse ("what will you do when your reads are slow?") | "What could go wrong over here?" |
| 11 | 02:14:35 | 02:25:42 | 11 | **What could go wrong**: index in RAM, file grows forever -> file rotation, merge and compaction, sawtooth | **Open "what breaks?"** question | "But it's still not done" |
| 11a | 02:14:35 | 02:20:27 | 6 | Slow restart (accepted), keys must fit in RAM, no garbage collection; multiple files; when to switch (S2: disk / 3 files) -> file-system limit, small 100 MB-1 GB files; **file rotation**; index stores file + offset | Student-led; teacher names the biggest reason | "it's very evident that... a lot of stale entries" |
| 11b | 02:20:27 | 02:22:18 | 2 | **Merge and compaction**: skip stale/deleted entries, write a new file, delete old ones, update in-memory offsets (D-15) | Teacher-narrated mechanism | "if you look carefully at your disk utilization" |
| 11c | 02:22:18 | 02:25:42 | 3.5 | **Sawtooth** disk usage under the disk cap; two knobs (merge frequency, file-rotation threshold); too often vs too rare; SSD benefit smaller | **Operational graph** | "I want to go into a bit more granularity" |
| 12 | 02:25:42 | 02:37:28 | 12 | **Record format**, integrity, recap, limits/strengths | "Here we just casually said I'll write key value. No, no." | "The database that we just designed is called Bitcask" |
| 12a | 02:25:42 | 02:29:21 | 3.5 | Files are read by blocks; reading until `\n` = a disk IO per byte; **key size + value size** prefix (4 B + 4 B), two IOs; applies back to the dictionary (D-16) | **Misconception first** ("11th standard kids would write code like that") | "A lot of people just stop here" |
| 12b | 02:29:21 | 02:32:54 | 3.5 | Crash mid-value (`110`...) -> **CRC first**, leftmost (Postgres, MySQL binlog, network formats); final record CRC / TS / KSZ / VSZ / K / V; ignore corrupt entries | **Failure scenario** + analogy to ID generators | Prepared-notes recap |
| 12c | 02:32:54 | 02:35:31 | 2.5 | Recap from prepared notes: index entry = file id, size, offset, timestamp (D-17, D-18, D-19); merge via hash table (not sorted, unlike the dictionary); sawtooth cap (D-20) | Prepared slides | "Now the limitation of this" |
| 12d | 02:35:31 | 02:37:28 | 2 | Limitation: all keys in memory. Strengths: O(1) ops, high write throughput, low latency, IO saturation, copy-paste backups | Pros/cons summary | Reveal |
| 13 | 02:37:28 | 02:41:59 | 4.5 | **Bitcask** reveal: embedded DB (like SQLite); Uber via Riak; Riak : Bitcask = Elasticsearch : Lucene (D-21); "high throughput + persistence = append-only"; paper; **implement it** (teacher's own benchmark) | **Name revealed after the build** | Wrap-up |
| 14 | 02:41:59 | 02:42:51 | 1 | Admin: next week = high-throughput systems (S3 deep dive Saturday, video encoding, YouTube views, one more DB) | - | "any questions on Bitcask" |
| 15 | 02:42:51 | 03:06:09 | 23.5 | **Q&A** | Student-driven | Close |
| 15a | 02:42:51 | 02:56:05 | 13 | Bitcask vs SSTable/memtable/LSM; Kleppmann's book; creating an append-only file (`a` mode); deletes in merge; is the CRC header write atomic / kernel guarantees; integrity rarely covered; Postgres-internals blog recommendation | Student-driven | "Can we go back to the initial design of the S3 thing?" |
| 15b | 02:56:05 | 03:01:39 | 5.5 | Why 1 TB for 170,000 words (deliberate, to force cost/NAS; imagine multimedia meanings); cost of one S3 call per request (cold-tier use); redeploy details + teacher's own Redis Pub/Sub war story | Student-driven | "Any other question?" |
| 15c | 03:01:39 | 03:06:09 | 4.5 | Offsets are bytes; header holds the index size; header rebuilt every update; why sorting appeared only at merge; keeping it sorted is free via the merge; "CS is obsessed with sorted data" | Student-driven | Close |
| 16 | 03:06:09 | 03:06:31 | 0.5 | Admin: close, recordings, pre-read | - | End |

Time budget: word dictionary ~111 min (00:00:49-01:47:56) + 4 min Q&A; break 8; Bitcask ~42 min (01:59:52-02:41:59); Q&A 23.5. Roughly **15% of the lecture is formal Q&A**, but the dictionary half is itself almost entirely student brainstorm (most of rows 2, 4a, 6, 7), so student proposals carry much of the content and the rejected ideas are part of the lesson.

**Introduction patterns observed** (reusable templates):
- **Constraint-loaded problem** -> students jump to sophisticated tools (B-trees, sharding, Parquet, Lucene, SSTables) -> teacher adds or re-states a constraint (one file, no repeats, persist immediately, append-only) -> simplest design that satisfies it.
- **Naive baseline -> cost in numbers -> the one fix** (linear scan 0.5 TB -> index -> 1.75 MB fits in RAM).
- **Crowdsourced alternatives tested against one question** ("how would you know when to stop reading the index?", "how do you tell the API servers?").
- **Mechanism reveal after a wrong intuition** (overwrite in place -> disk overwrites the next line; delete in place -> append-only forbids it).
- **Hint to converge** when the brainstorm drifts (01:37:06), then a deliberately "out of the box" punchline (deployment as reload).
- **Build first, name last**: the store is designed from scratch and only then revealed as Bitcask (02:37:28); the dictionary is revealed as what Athena/Hudi/data lakes do (01:46:23).
- **Every half ends with "why this matters"**: multi-tiered storage (01:43:59), "high throughput = append-only" (02:39:26).

---

## 2. Problem prompts (teacher questions to the class)

| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement / correction | Final answer |
|---|---|---|---|---|---|
| P1 | 00:04:08 / 00:05:00 | "Build a word dictionary without using any database... How would you go about it?" / "let's start with the storage one" | S4: text file or JSON file | "How do you query a JSON format?" - you must read and deserialize all 1 TB (L-0016) | Plain text file |
| P2 | 00:06:36 | "What will be the format of the text file?" | S4: like a write-ahead log of updates; CSV `word,meaning`; repeated rows for updates | "No repetitive entries... imagine this file opened in any text editor" (L-0021) | CSV, one line per word, no duplicates |
| P3 | 00:08:23 | "Will you keep this file sorted in some fashion?" | S4: no, response time is not a constraint; else B-trees | "We'll come to that... it's fun to discover it step by step" (00:09:32) | Left open; answered at 01:14:35 (sorted needed for the merge) and in Q&A 03:03:31 |
| P4 | 00:09:52 | "Anything that you would want to change in this file format?" | S1: key-value, read-heavy >1000:1, cheap single-word updates; sort by key and shard into ~100 files with routing; zip of folders; logical partitions + header; Parquet; Lucene-like index | Updates are weekly batches; multiple files "kill portability" (00:13:46); zip must be extracted; "keep it one level down and then jump the level" | One file; keep it simple; Athena-on-S3 is what we simulate |
| P5 | 00:19:57 | "How would you search on this?" | S2: binary search, offsets as indexes, B+ tree, 8 KB pages, 1000 keys in memory | "Why only 1000 keys in memory?... We are over engineering" (00:21:03) | Start from the naive scan |
| P6 | 00:22:21 | "If you have just this one file and you want to do key lookup, what will you do?" (rhetorical) | - | Worst case 1 TB, average 0.5 TB per read; slow, wears disk | "Whenever reads are slow... indexing" (L-0046) |
| P7 | 00:23:53 | "Can we create an index on top of it?... What would this index look like?" | S2: offset and name (Apple) | "And the key, right? Key and the offset"; offset = nth byte where the line starts | `key, offset` per word (L-0048, L-0049) |
| P8 | 00:26:03 | "You're still doing linear scan over here. How is this better?" (rhetorical) | - | Index rows are a word + 4 B offset, not MBs of meaning | Scanning the index is cheap; better still, load it |
| P9 | 00:26:50 | "Can we fit this index in memory?... How will you compute the size of this index?" | S6: 26 entries A-Z with locations; then "17,000,000" | A-Z still scans a letter; size = (4.3 + 4 + 2) x 170,000; "Tell me the exact number" | 1,751,000 B = 1.751 MB -> in-memory hash map (L-0058, L-0059) |
| P10 | 00:34:54 | "We have two files. We don't want two files. We want one file. How can we go about this?" | S7: build the index at startup; S7: concatenate with a partition/separator line | Rebuilding is wasteful, the file changes weekly; "how would you know when your index ends and your data begins?" (00:36:32) | -> P11 |
| P11 | 00:37:11-00:40:09 | "Anmol, any other approach?" / "Gaurav, what else can you do?" / "How would you know when to stop reading the index?" | S10: pre-allocate fixed 2 MB index region; S1 (another): data top-down, index bottom-up like a stack; S3: store the boundary info at position zero | Fixed size = "very nice hack" but wastes space (00:37:51); stack still needs a separator; "Can you not directly store the byte offset?" (00:40:32) | **Fixed 16 B header**: magic name, version, index size (L-0072, L-0081) |
| P12 | 00:48:33 | "What does this mean when you say that this web browser does not support a format?" (rhetorical) | - | - | It has no decoder for that format (L-0091) |
| P13 | 00:51:04 / 00:52:07 | "Where is this file?... How does that flow look like?" / "Why not store this one file on every server? What's the harm in that?" | S3: shared disk storage; then: updates tedious (servers unavailable), partial-update inconsistency, duplicated cost | Updates are weekly batches; meanings barely change; "What else is a problem?" (00:53:57) -> "Biggest pain, cost" (00:54:52) | Central networked storage (L-0099, L-0103) |
| P14 | 00:56:36 | "Now what this central place would be? How will you access it?" | S5: Amazon S3, cheap blob storage; ranged get-object for header, index, then a record | "What are the core properties we want... then we would pick a technology" (00:57:50) | Network attached storage with file-system semantics and random reads; S3 / HDFS / network HDD (L-0110, L-0111) |
| P15 | 01:05:16 | "We have to apply these changes to the file that we have on S3, how would we go about it?" | S1 (another): periodic job on another server, download, repackage; append changelog at end; iterate and replace; compare hashes; replace via index offset | "Did you mean cron job, batch job?"; append -> duplicates; "Is it really that simple?"; hash unnecessary: "it's easy to build complex systems. It's very difficult to build simple systems" (01:08:53) | -> P16 |
| P16 | 01:10:05 | "What happens when you replace this by this? Will this entry move down?" | Students: "Yeah, we have to" | On disk bytes are overwritten blindly; the new meaning spills into `ball` (D-07); IDE analogy | Cannot edit in place (L-0130, L-0132) |
| P17 | 01:12:06 | "How would you solve this problem?" | S3 (another): graveyard entries + later compaction; S9: build a new file, write the change, append the rest ("very naive") | Graveyard breaks no-repeats and is for live updates; S9's idea "is not naive... merge of merge sort... that's what the best approach is" (01:14:03) | Two-pointer merge of sorted dictionary + sorted changelog into a new file (L-0137, L-0143) |
| P18 | 01:18:17 | "How would the changes that are there in this server go to S3, and what could happen because of this?" | S1 (Hemant): new S3 path, swap the pointer; rolling/canary deployment | "Why do you want to upload it to a new S3 path? What would happen if you upload to the same path? Won't it simplify your solution?" (01:21:12) | -> P19 |
| P19 | 01:21:36 | "What if you have uploaded to the same path? What could go wrong?" | S1: rollback, file corruption during upload, temp storage + validate first | Adds: index offsets mismatch -> users read **garbage** (01:25:42) | Upload to a new versioned path (L-0157, L-0158, L-0161) |
| P20 | 01:27:31 | "How do you tell API servers that this is the new path you should start serving?" | S1: put the IP in the path; send an invalidate command to all; switch at the job's known time; S8: one file per word; S5: static metadata file polled every 5-10 min | "Sounds too complex"; "unreliable... what if your upload failed?"; one file per word kills portability; meta path must be static "Perfect" (01:31:01) | Static `meta.json` holding the current path (L-0166, L-0167) |
| P21 | 01:31:01 | "Why would you [poll every 5-10 minutes], given that your job runs weekly?" | S5: upload time is unknown (S3 down on Sunday, upload Monday) | "Wherever we have poll, we can make things reactive" -> Redis Pub/Sub; "but this seems too complex" (01:32:26) | Keep looking for simpler |
| P22 | 01:33:06 / 01:33:47 | "Can we be smart about it?" / "Can we do better than this?" | S5: `latest` flag in header; S3: header version check per request; S2: REST endpoint, register servers, roll one by one, change ports; S4: same path + S3 versioning; `updated_at` checks | "But how would you know that something changed unless you poll it?" (01:34:26); "Complex, complex"; versioning = the two-files idea; per-request meta call is expensive polling | Teacher gives a hint (P23) |
| P23 | 01:37:06 | Hint: "What happens when this API server boots up?... you have to trigger a reload of this API server... Can we do something about it?" | (S4 still on versioning) | Converges himself (01:41:00) | **Trigger a rolling deployment**: new servers read meta.json and load the new file; brief inconsistency, never garbage (L-0178, L-0183, L-0184) |
| P24 | 02:02:52 | "How would a put look like?" | S1: memtable/SSTable sorted map in memory; then a ledger / write-ahead log, append at end (no seek, no rotation wait) | "No, no, immediately. I want to persist immediately" (02:03:47); "Perfect" (02:06:01) | Append every put (L-0209, L-0210, L-0211) |
| P25 | 02:07:19 | "Now let's say K1 changes. Someone issued a put on K1 with V1'" | S1: append again; mark obsolete later (tombstone) | "No matter what. That's the best way" | Updates are appends too (L-0213) |
| P26 | 02:08:37 | "How will you do deletes?... I say delete K2. What will you do now?" | S5: go back and set the value to -1; then append K2 with -1 | "This is append only file. You cannot write to any other location" (02:09:20) | Delete = put(K, special value) (L-0217, L-0218) |
| P27 | 02:10:52 | "How would you perform get now... What is the naive way of doing it?" | S3: scan all entries, return the latest; SSTable-like structure | "What will you do when your reads are slow?"; "Simple hash table, right? SSTable is very different" (02:11:47) | In-memory hash table key -> offset of latest entry (L-0221) |
| P28 | 02:13:52 | "Now what if your machine died and because this is in-memory, it is gone. Now what?" | S3: rebuild the index on restart | "That's fine... Straight forward" | Scan files and rebuild (L-0225) |
| P29 | 02:14:35 | "What could go wrong over here?" | S2: slow restart; index must fit in memory; no disk garbage collection -> out of space; multiple files + scrubbing | Slow restart accepted; keys-in-RAM is "a limitation"; "file grows to be huge... How do you solve it?" | Multiple files, one active (L-0229, L-0231) |
| P30 | 02:16:45 | "When will you make the switch?... What's the criteria?" | S2: space for three files (write, read, create); disk divided by 2 or 3; concurrent index build, smaller GC units | "Reading and writing are from the same file"; "The biggest one of all, file system limitation" (02:18:45) | Small files (100 MB-1 GB), file rotation (L-0236, L-0238) |
| P31 | 02:26:38 | "Let's say you read one byte at a time until you hit a slash n. How many disk IOs are you making?" (rhetorical) | - | - | Prefix key size + value size (L-0253, L-0255) |
| P32 | 02:29:21 | "What if... while writing the value, the machine crashed?... How will you know that an entry that you return is corrupt?" (rhetorical) | - | - | CRC first, leftmost; skip corrupt entries (L-0260, L-0261, L-0266) |
| P33 | 02:35:31 | "Whatever we designed sounds very fancy... But what is the limitation?" (rhetorical) | - | - | All keys must fit in memory (L-0269) |

### Top 10 "pause and think" prompts for the site (ranked)

1. **"You have a 1 TB file of 170,000 words and meanings. Before building anything clever, estimate: how big is an index of just `word, offset`? Does it fit in RAM?"** (P9, 00:26:50-00:30:48). The lecture's signature "aha": the number collapses the problem (1.75 MB is "peanuts") and kills every over-engineered proposal that came before. The reader can do the arithmetic themselves.
2. **"You want to change apple's meaning from 'a fruit' to 'a round fruit'. You know apple's byte offset. Why can't you just write the new meaning there?"** (P16, 01:10:05). The wrong intuition (lines shift down like in an editor) is near-universal; the corrected picture (D-07) is memorable and drives both the merge and the whole of Bitcask.
3. **"Your new dictionary is ready. Upload it over the old file at the same S3 path - what does a user asking for 'apple' see in the next minute?"** (P19, 01:21:36-01:26:15). Concrete failure (offset 100, 1024 bytes of some other word); motivates new paths and meta.json.
4. **"Index and data are now in one file. When the server reads it, how does it know where the index stops?"** (P10/P11, 00:36:32-00:41:22). Several plausible answers (separator, fixed size, stack) each have a flaw; the header with a byte offset is the reveal, and it explains every file format the reader uses.
5. **"Every API server reads the dictionary path at boot. The path just changed. What is the least code you could write to make every server pick it up?"** (P20-P23, 01:26:47-01:43:24). After polling, Pub/Sub and REST endpoints, "trigger a rolling deployment" is a genuine out-of-the-box answer; let the reader rank the options first.
6. **"Your store only appends. How do you delete a key?"** (P26, 02:08:37). Tiny, self-contained, and the answer (delete = put with a special value) is satisfying to derive.
7. **"A key was written three times and deleted once; the file holds all four records. How does a get stay O(1)? And what happens to your index when the machine reboots?"** (P27/P28, 02:10:52-02:14:04). Two-step: hash table to the latest offset, then rebuild by scanning.
8. **"You copy the 1 TB dictionary onto each of 100 API servers. Updates are weekly and meanings barely change - so what is actually wrong with this?"** (P13, 00:52:07-00:55:50). Students offered two weaker reasons first; "cost" is the real one, a good test of whether the reader ranks problems.
9. **"Your machine crashes halfway through writing a 1 MB value, and later another record is appended. How will a reader ever know the first record is broken - and where in the record must that check live?"** (P32, 02:29:21). Motivates CRC and record framing. (Pair with the fact-check note on where real formats place their CRC.)
10. **"The append-only files keep growing. When should you start a new file, and what do you do with the old ones?"** (P29/P30, 02:14:35-02:20:27). Leads to rotation, merge and compaction and the sawtooth graph; also a good place to ask "what two knobs would you expose?" (02:24:08).

Runner-ups: "Will you keep the file sorted?" (P3) is best used as a planted question whose answer only arrives at the merge (01:14:35); "Is JSON a good format for a 1 TB lookup table?" (P1) works as a warm-up.

---

## 3. Explanatory devices

### Analogies
| Time | Analogy | Explains | Reuse note |
|---|---|---|---|
| 00:20:52 | "Very simple. Like what a five year old [would] understand" | The level he wants answers at | Tone marker for the site's opening |
| 00:43:11 | PNG/MP3 first bytes name the format; "AODB" for the teacher's own database | Magic bytes in a header (L-0077, L-0079) | Use the real PNG signature (see factcheck L-0078) |
| 00:48:33 | "This web browser does not support TIF format" | Missing decoder = unknown byte layout (L-0091) | Great relatable hook for encoder/decoder |
| 01:10:56 | **IDE: you hit enter and other lines move down - in memory; on disk you cannot** | Disk overwrites in place (L-0131) | Animate with D-07 |
| 01:12:06 | **Three hats: product manager, architect, engineer** | Think of the code you would write to find what breaks (L-0134) | Callout in the update section |
| 01:14:46 | **Merge two sorted linked lists / arrays into a third** ("merge of merge sort") | Sorted dictionary + changelog merge (L-0142) | Readers know this from DSA; reuse the name |
| 02:30:15 | Timestamp on the leftmost side in distributed ID generators | CRC goes leftmost (L-0261) | Backward link; keep with factcheck caveat |
| 02:38:11 | **Riak is to Bitcask what Elasticsearch is to Lucene** | Distribution layer over an embedded engine (L-0277) | Strong one-liner for the reveal |
| 02:37:28 | Bitcask is embedded "like SQLite" | Library vs server DB (L-0274) | - |
| 02:59:16 | "M stands for a million... we take MBs very lightly" | Respect for sizes (L-0307) | Pair with the index estimate |

### Real-world examples, war stories, numbers
| Time | Example | Point | Reuse note |
|---|---|---|---|
| 00:02:54 | Oxford dictionary barely changes; changelog every Sunday over email | Read-only + weekly batch updates (L-0009, L-0010) | Sets every later trade-off |
| 00:04:08 | 1 TB, 170,000 words | Problem scale (L-0012); justified in Q&A as deliberate (02:56:52) | Say up front that meanings are imagined as multimedia (02:57:10) |
| 00:09:52 | S1: read:write >= 1000:1, "much more than that" | Read-heavy (L-0025) | - |
| 00:17:40 | Upload any CSV to S3, query it with Athena | What the dictionary simulates (L-0035, L-0036) | Add factcheck note (Athena scans; it is not this design internally) |
| 00:23:00 | Linear scan: worst 1 TB, average 0.5 TB = 500 GB per request | Why index (L-0044) | - |
| 00:28:03 | Average English word 4.3 chars ("I actually downloaded an entire dictionary"); 4 B offset; +2 for comma/newline | Index sizing (L-0055-L-0057) | Correct offset to 8 B (factcheck L-0056); still ~2 MB |
| 00:30:04 | 10.3 x 170,000 = 1,751,000 B = 1.751 MB | "Number crunching is very important" (L-0058, L-0060) | Centre-piece calculator widget |
| 00:37:51 | Fixed 2 MB index region | Workable hack, slightly wasteful (L-0068) | - |
| 00:44:02 | 16 B header: 8 B name + 4 B version + 4 B index size | Fixed-width header (L-0081) | D-04 |
| 00:47:51 | Teacher once wrote his own image format | Where he learned headers (L-0089) | Short aside |
| 00:54:52 | 1 TB RAM per box = no index needed, but not cost-effective | Throwing money vs design (L-0101) | - |
| 00:55:50 | 100 servers x 1 TB SSD = 100 TB redundant | Cost of copy-per-server (L-0102) | - |
| 01:00:39 | S3, HDFS, Dell network hard disks | Any NAS with random reads (L-0113) | - |
| 01:17:42 | Merge server needs >= 2 TB disk | Old + new file side by side (L-0147) | - |
| 01:25:42 | apple @ offset 100, 1024 B -> some other word "starting in the middle" | Same-path garbage (L-0158) | D-09 |
| 01:32:26 | "Why would you poll 5,000 times before that?" | Polling waste (L-0172) | - |
| 01:44:24 | Amazon orders older than six months -> S3, recent -> MySQL | Multi-tiered storage (L-0189) | Lead example for "why it matters" |
| 01:47:04 | Data lakes, Apache Hudi table format, Hive partitions | Query cheap storage via an index (L-0193, L-0194) | - |
| 01:51:32 | Just send the 1.7 MB index in the update | Alternative to reloading (L-0199) | - |
| 02:18:45 | BTRFS/NTFS file-size limits; 100 MB or 1 GB files | Why rotate (L-0235, L-0236) | Factcheck L-0235: stronger reason is per-file work |
| 02:30:15 | Postgres commit log, MySQL binlog, network formats "CRC on the leftmost side" | CRC placement (L-0262, L-0263) | Factcheck says WRONG for Postgres/MySQL; reword |
| 02:37:28 | Uber uses Bitcask via Riak for ride-hailing | Production credibility (L-0275, L-0276) | Factcheck: parts of dispatch, ~2015 |
| 02:40:36 | Teacher implemented Bitcask ~5 years ago; benchmarked vs on-disk and in-memory KV, HDD vs SSD, Prometheus | "Implement it" (L-0284, L-0285) | Project prompt at page end |
| 02:45:25 | S1: Kleppmann's book storage chapter starts with Bitcask | Bitcask as foundation (L-0291) | Further-reading link |
| 02:45:54 | Teacher met Bitcask in a college storage paper-reading course | Enthusiasm (L-0292) | - |
| 02:54:24 | Blog posts on Postgres internals (record format, pages vs data) | Further reading (L-0303, L-0304) | - |
| 03:00:54 | Teacher first built Redis Pub/Sub + reload APIs for his own services before realising a deployment does it | Deployment as reload (L-0308) | War story for 7e |

### Contrasts / comparisons
| Time | A vs B | Deciding factor |
|---|---|---|
| 00:05:46 | JSON file vs plain text/CSV | JSON must be fully parsed; no direct access (L-0016) |
| 00:13:46 | Many sharded files / zip vs one file | Portability (L-0029) |
| 00:26:03 | Scanning the data vs scanning the index vs in-memory index | Bytes touched per lookup (L-0051, L-0063) |
| 00:35:56 | Persist the index vs rebuild at every startup | File changes weekly; don't redo work |
| 00:37:51-00:41:22 | Separator line vs fixed-size region vs stack layout vs header with byte offset | Must know where to stop; frugal space (L-0072) |
| 00:46:44 | JSON/CSV (no header) vs PNG/PDF/Parquet (header) | Can you jump without reading everything? (L-0087, L-0088) |
| 00:52:07 | File on every server vs central networked storage | Cost (L-0099) |
| 01:00:39 | S3 vs HDFS vs network HDD | Any storage with random reads works (L-0113) |
| 01:10:56 | In-memory edit vs on-disk write | Disk overwrites, never shifts (L-0130) |
| 01:13:19 | Graveyard + compaction (live updates) vs rebuild a new file (weekly batch) | Update cadence |
| 01:21:12-01:26:47 | Same S3 path vs new path | Rollback, corruption, stale offsets (L-0157) |
| 01:31:51-01:42:53 | Polling vs reactive (Pub/Sub, REST) vs deployment | Infra needed; "out of the box" (L-0171, L-0198) |
| 01:42:08 | Inconsistent (old/new meanings) vs garbage | Eventual consistency acceptable, garbage not (L-0184) |
| 01:45:43 | Hot DB vs S3 cold tier | Cost vs latency for infrequent data (L-0192) |
| 02:00:12 | SSD vs magnetic disk vs tape | Cost vs speed (L-0201, L-0202) |
| 02:03:47, 02:43:37 | Bitcask vs memtable/SSTable (LSM) | Values in memory / sortedness / immediate persistence (L-0208, L-0288) |
| 02:09:20 | Append-only: random reads allowed vs random writes forbidden | Definition (L-0216) |
| 02:23:04 | Merge too often vs too rarely | CPU vs disk cap (L-0246) |
| 02:34:06 | Sorted merge (dictionary) vs hash-table merge (Bitcask) | Bitcask files are unsorted (L-0243) |
| 02:24:56 | Append-only on HDD vs on SSD | Smaller gain on flash (L-0250) |
| 02:37:28 | Embedded DB vs server DB | Library vs process (L-0274) |

### Recurring heuristics and catchphrases
| Time(s) | Heuristic (teacher's words) | Use on the site |
|---|---|---|
| 00:21:03, 01:08:53, 01:14:03, 01:36:42, 01:47:38 | "Keep it very simple... that's where you see the beauty of the system" / "It's easy to build complex systems. It's very difficult to build simple systems" | Page motto |
| 00:23:00, 00:32:38, 02:11:12 | "Whenever your reads are slow... the only thing that should come to your mind is indexing" | Rule card (with factcheck L-0046 nuance) |
| 00:30:04, 02:59:16 | "Number crunching is very important when you are designing any system" / don't take MBs lightly | Rule card next to the calculator |
| 00:54:52, 02:59:16 | "If you are not thinking about cost, then you are not building good systems" / "bare minimum things at the bare minimum cost" | Callout in serving section |
| 01:04:00, 02:14:04, 02:36:23 | "Doing the bare minimum" (reads, writes, IO) | Thread through Bitcask section |
| 00:57:50 | "What are the core properties we want... then we would pick a particular technology" | Callout before S3 |
| 01:12:06, 01:23:07, 02:53:43 | "Drawing boxes is easy... these details are super critical" / wear the engineer hat | Callout at P16 and CRC |
| 00:09:32, 02:06:59 | "It's fun to discover it step by step" | Justifies the guided reveal format |
| 00:13:46, 01:29:40, 00:49:22 | Portability: "literally this one file" | Recurring constraint chip |
| 01:31:51, 01:34:37 | "Wherever we have poll, we can make things reactive... I'm not against polling" | Update-propagation section |
| 01:50:21, 03:00:54 | "We control our own infrastructure" - trigger a deployment instead of writing code | Punchline callout |
| 02:39:26 | "Whenever you see anything that says we are high throughput [with persistence]... append-only file" | Rule card (with factcheck L-0280 nuance) |
| 02:40:36, 02:51:06 | "Implement Bitcask... You'll have a time of your life" | End-of-page project |
| 03:05:47 | "The entire domain of computer science is obsessed with sorted data" | Close of the merge section |
| 01:04:56, 02:58:29 | "It has a ton of applications" (pointed reads on S3) | Bridge to multi-tier storage |

---

## 4. The word-dictionary case-study thread (proposed spine)

The lecture has two case studies; the word dictionary is the spine of the first 1h50, and the KV store (Bitcask) is the spine of the second half. They are explicitly linked by record format (02:28:57), merge style (02:34:06) and Q&A (03:01:39).

| Time | Feature / situation | Concept motivated | Note for the site |
|---|---|---|---|
| 00:00:49 | No DB allowed; portable; weekly changelog; 1 TB / 170,000 words | Requirements shape the design | Show the requirement card once; refer back to it |
| 00:05:46 | Look up one word in a 1 TB JSON | Why formats without random access fail | - |
| 00:22:21 | Look up "apple" by scanning the CSV | Linear scan cost | D-01 |
| 00:23:53 | `index.dict` beside `data.dict` | One-level index, byte offsets | D-02 |
| 00:30:04 | Index = 1.75 MB | Load index in memory at boot | Calculator |
| 00:34:54 | Two files break "ship one file" | Header + sections, custom format | D-03, D-04 |
| 00:51:04 | `GET /word` behind an LB | Where the file lives; cost | D-05 |
| 00:59:34 | File on S3, ranged reads | NAS + random reads; pointed reads | - |
| 01:05:16 | Sunday changelog (apple, ball, zoo) | In-place write impossible; sorted merge | D-06, D-07, D-08 |
| 01:24:59 | New file over the old path | Stale offsets -> garbage | D-09 |
| 01:26:47 | `dictionary2.dictionary` + `meta.json` | Versioned paths, pointer file | D-06 notes |
| 01:41:00 | Rolling deployment reloads servers | Transition without garbage, eventual consistency | - |
| 01:44:24 | Amazon orders older than 6 months | Same mechanism = cold tier with queries | D-12 |
| 02:28:57 | "Word size, meaning size" | Record format applies to the dictionary too | Revisit the CSV choice here |
| 02:56:05 | Why 1 TB? | Size forced the cost/NAS discussion | Put this justification at the start |

KV-store thread (second spine): magnetic disk (02:00:12) -> put K1 V1, K2 V2, K3 V3, K1 V1' (02:07:19) -> DEL K2 = PUT(K2, -1) (02:10:26) -> in-memory `K -> offset` (02:12:23) -> crash rebuild (02:13:52) -> files 001-004, rotation (02:19:20) -> merge & compaction + sawtooth (02:20:27-02:24:08) -> CRC/TS/KSZ/VSZ/K/V record (02:31:36) -> named Bitcask, Riak, Uber (02:37:28). D-13 to D-21.

Gaps where the case studies are *not* used but could carry content (without inventing claims): the CRC/record-format discussion could be shown applied to a dictionary record (the teacher says it should be, 02:28:57, but does not draw it); the sawtooth/merge knobs have no dictionary analogue (the dictionary is rebuilt weekly, so its "merge" is the weekly job - a site can point out this parallel as an observation, not a teacher claim); the multi-tier Amazon-orders example could reuse the dictionary's header/index layout diagram rather than a new one.

---

## 5. Misconceptions surfaced

| Time | Misconception | Source | Correction |
|---|---|---|---|
| 00:05:16 | A JSON file is a reasonable store for a 1 TB lookup table | S4 (half-raised) | Must read and deserialize the whole file; no direct access (L-0016) |
| 00:07:32 | Keep repeated rows for the same word (for updates) | S4 | No repeated entries; file must be readable/portable (L-0020, L-0021) |
| 00:12:17-00:13:46 | Shard into many sorted files (or a zip) to make search efficient | S1 | Kills portability; one file (L-0028, L-0029, L-0030) |
| 00:20:09 | Need B+ trees, 8 KB pages, 1000 keys in memory | S2 | Over-engineering; one-level index fits in RAM (L-0038, L-0039) |
| 00:27:25 | A 26-entry A-Z index is enough | S6 | Still scans every word of a letter; a full word index is tiny (L-0053) |
| 00:29:53 | Index size = 17,000,000 bytes | S6 (arithmetic slip) | 10.3 x 170,000 = 1,751,000 B (L-0058) |
| 00:35:47 | Don't persist the index; rebuild it at each startup | S7 | Avoidable work; the file changes only weekly |
| 00:37:15 | Fixed pre-allocated index region is the clean answer | S10 | Works ("nice hack") but wastes space; store the byte offset in a header (L-0068, L-0072) |
| 00:52:14-00:53:12 | Copy-per-server's main problem is tedious updates / inconsistency | S3 | Updates are weekly batches and meanings barely change; the real pain is cost (L-0096, L-0097, L-0099) |
| 00:54:52 | Make it fast by putting everything in RAM | General | Not cost-effective (L-0101) |
| 01:06:24 | "Batch job" vs "cron job" used interchangeably | S1 | Teacher distinguishes batch processing from a periodic job (L-0121; factcheck: it is a scheduled batch job) |
| 01:07:54 | Append the changelog at the end (file is unsorted) | S1 | Duplicates and ever-growing file (L-0124) |
| 01:08:46 | Compare hashes / generate a diff | S1 | The changelog already is the diff (L-0126) |
| 01:09:47-01:10:53 | Use the index offset and replace the line in place; later lines move down | S1, class | Disk overwrites bytes; the new meaning corrupts the next entry (L-0128, L-0130, L-0132) |
| 01:12:53 | Graveyard entries + later compaction | S3 | Breaks no-repeats; for a weekly batch just rebuild cleanly (L-0135) |
| 01:13:33 | Building a new file is "a very naive approach" | S9 | It is the merge step of merge sort - the best approach here (L-0137) |
| 01:21:23 | Uploading to the same S3 path is simpler | Teacher's probe / S1 | Rollback, corruption, stale offsets -> garbage (L-0157, L-0159; factcheck L-0157: S3 overwrites are atomic) |
| 01:27:31 | Putting an IP address in the path changes things | S1 | Any new path still has to be communicated (L-0162) |
| 01:27:59 | Ping every API server to invalidate its cache | S1 | Too complex (L-0163) |
| 01:28:18 | Switch at the job's known time | S1 | Unreliable: upload may fail, run late, or be corrupt (L-0164) |
| 01:29:25 | One file per word | S8 | Kills portability (L-0165, D-11) |
| 01:31:01 | Poll meta.json every 5-10 min for a weekly change | S5 | Wasteful; reactive or, better, deployment (L-0168, L-0172) |
| 01:33:06 | A `latest` flag in the old file's header | S5 | You still have to poll to learn it (L-0173) |
| 01:34:02 | Check the header version on each request | S3 | Still polling (L-0174) |
| 01:35:11 | Register servers, upgrade one by one, switch ports | S2 | "Complex, complex"; same reactive idea (L-0175, L-0176) |
| 01:38:16 | S3 versioning on the same path | S4 | That is the two-files/meta idea, S3-specific (L-0179) |
| 01:38:45-01:39:54 | Check `updated_at` on meta.json or in the text file per request | S4 | Still polling; text files don't carry that metadata (L-0180, L-0181; factcheck L-0181: S3 conditional GETs exist) |
| 02:03:28 | Use a memtable/SSTable sorted map | S1 | Requirement is immediate persistence (L-0208; factcheck: LSM also logs each write) |
| 02:09:10 | Delete by overwriting the old value with -1 | S5 | Append-only forbids writes to earlier locations (L-0215, L-0216) |
| 02:11:38 | Speed up get with an SSTable | S3 | A simple hash table of key -> offset (L-0220) |
| 02:17:14 | Reads and writes go to different files; need room for three files | S2 | Reads hit whichever file holds the key (L-0232) |
| 02:18:07 | Choose file size as disk / 2 or 3 | S2 | Small files (100 MB-1 GB): file-system limits, per-file work (L-0233, L-0236) |
| 02:26:38 | Read a record until the newline | General ("11th standard kids") | One IO per byte; length-prefix records (L-0253) |
| 02:29:21 | Stop at key size / value size - good enough | General ("a lot of people just stop here") | Add CRC for integrity (L-0258) |
| 02:52:08 | Writing the CRC/header is atomic | S2 | Teacher: kernel may not guarantee it, but ~20 B "will definitely be there" (L-0297, L-0299); factcheck: the CRC check is what makes it safe |
| 03:04:11 | Keeping 170,000 records sorted adds complexity | S1 | The merge keeps it sorted for free (L-0309, L-0310) |
| 00:28:03 | (Teacher) Offset is a 4-byte integer for a 1 TB file | Teacher | Needs 8 bytes; see factcheck L-0056 |
| 02:30:15 | (Teacher) Postgres WAL / MySQL binlog put the CRC leftmost | Teacher | Both use CRCs but elsewhere in the record; see factcheck L-0262 |
| 02:38:11 | (Teacher) Riak gives master-slave architecture | Teacher | Riak is masterless; see factcheck L-0278 |
| 02:37:28 | (Teacher) Uber runs its main ride-hailing service on Bitcask | Teacher | Parts of dispatch via Riak around 2015; see factcheck L-0275 |
| 02:43:37 | (Teacher) SSTables keep values in memory | Teacher | Only the memtable is in memory; see factcheck L-0288 |
| 02:18:45 | (Teacher) File system limits are the biggest reason for small files | Teacher | Modern FS allow huge files; see factcheck L-0235 |
| 03:05:12 | (Teacher) Without sorting the merge is n-squared | Teacher | A hash-map pass is also linear; see factcheck L-0310 / L-0139 |

---

## 6. Dependencies (prerequisite graph)

### Assumed known (not taught here)
- Earlier weeks: load balancer + API servers architecture; Redis Pub/Sub and "polling vs reactive" (01:31:51); sharding/routing a key to a node ("yesterday's pattern", 00:13:12); distributed ID generators with timestamp leftmost (02:30:15); embedded databases (shared video, 02:37:28).
- Data structures: hash maps, binary search, B+ trees (named only), merging two sorted arrays/linked lists (01:14:46).
- Files and OS: byte offsets, reading a file line by line, file open modes `r/w/r+/w+/a` (02:47:40), file systems BTRFS/NTFS/ext (02:18:45).
- Cloud: S3 and get-object, Athena (named), HDFS, rolling deployments / deployment pipelines (Jenkins, AWS SDK), canary deployments (student, 01:20:20).
- Hashing / checksums in general (CRC defined briefly, 02:30:15).
- Named but not taught: Parquet, Avro, Lucene, Elasticsearch, SSTable/memtable/LSM (next week), Apache Hudi, Hive partitions, Riak, SQLite.

### Concept graph (A -> B means B builds on A)
```
Requirements (no DB, read-only, weekly batch, portable, 1 TB / 170k words) (00:00:49)
  -> text/CSV file (00:05:46) -> linear scan cost (00:23:00)
  -> one-level index key -> byte offset (00:23:53)
       -> size estimate 1.75 MB (00:30:04) -> in-memory hash map at boot (00:30:48)
  -> portability: one file (00:13:46, 00:34:54)
       -> where does the index end? -> header with index size (00:41:22)
       -> custom file formats, encoder/decoder (00:45:58)
  -> serving: LB + API servers (00:50:26) -> copy-per-server cost (00:54:52)
       -> networked storage with random reads (00:59:34) -> S3 ranged reads -> pointed reads (01:04:00)
  -> weekly update (01:05:16)
       -> disk overwrites in place (01:10:56) -> build a new file
       -> sortedness -> two-pointer merge, O(n) (01:14:46) [answers P3 from 00:08:23]
       -> same path breaks in-memory offsets (01:24:59) -> new versioned path (01:26:47)
       -> static meta.json pointer (01:30:51) -> polling -> reactive (Pub/Sub) -> deployment = reload (01:41:00)
  -> pointed reads on S3 -> multi-tiered storage, Athena, data lakes, Hudi (01:43:59-01:47:04)

Magnetic disk mechanics: seek + rotation dominate (02:00:12)
  -> append-only put, zero seek (02:04:48)
       -> update = append (02:07:19); delete = put(special value) (02:10:26)
       -> get: in-memory hash table key -> offset of latest (02:11:51)  [same idea as the dictionary index]
       -> crash: rebuild index by scanning (02:13:52)
  -> limits: keys must fit in RAM (02:15:08); file grows forever (02:15:37)
       -> multiple files, one active, file rotation (02:19:20) -> index stores file id + offset
       -> merge & compaction, update offsets (02:20:27) [hash-table merge, unlike the sorted dictionary merge, 02:34:06]
       -> sawtooth, two knobs (02:22:18-02:24:08)
  -> record format: key size + value size (02:27:38) [same idea as the dictionary header, 02:27:38/02:28:57]
       -> CRC first + timestamp (02:30:15-02:31:36)
  -> Bitcask = this design; Riak distributes it (02:37:28) -> next week: SSTable/memtable/LSM (02:45:10)
```

Cross-links worth surfacing on the site:
- **In-memory index of key -> offset** is the core of both halves (00:30:48, 02:11:51); the reader should see it is the same move twice.
- **A small fixed header tells you how many bytes to read next**: dictionary file header (00:44:02) and per-record KSZ/VSZ header (02:27:38), which the teacher links himself.
- **Never write in place on disk**: the dictionary update (01:10:56) and the append-only store (02:09:20).
- **Merge**: sorted two-pointer merge for the dictionary vs hash-table merge for Bitcask (02:34:06).
- **Rebuild after change**: new dictionary file + reload (01:41:00) vs merge + index update (02:21:10).
- **Cost** is the reason for both halves: no copy per server (00:54:52), cheap magnetic disks instead of SSDs (02:00:12).

---

## 7. Forward / backward references

### Backward (to earlier lectures)
| Time | Reference |
|---|---|
| 00:00:01 | "We'll continue our discussion on storage engines" (week 5 day 1) |
| 00:01:38 | Performance tricks (caching, batching) "we have done it in past" |
| 00:13:12 | S1: "if you use yesterday's pattern of figuring out the routing" (key -> file of 100) |
| 01:31:51 | "We studied second week, third week that... wherever we have poll, we can make things reactive... Remember Redis Pub/Sub?" |
| 02:08:54 | S5: "from our previous discussion" (special value idea) |
| 02:15:57 | S2: "like we did last time, to scrub" (compaction-like cleanup) |
| 02:30:15 | "Similar to how in distributed ID generators, you saw timestamp on the leftmost side" |
| 02:37:28 | "In previous I shared the video [on] embedded [databases]" |
| 02:27:38 | (within lecture) "the metadata kind of header that we discussed in the previous problem" |

### Forward (deferred)
| Time | Deferred item | Where |
|---|---|---|
| 00:01:38 | Why portability matters | "the next system and next week" |
| 00:17:05 | Multiple partitions inside one file (S1's idea) | "a complex enough solution that we'll touch upon later" |
| 01:04:56 | Applications of pointed reads on S3 | Later in this lecture (01:43:59) and next week |
| 02:14:56 | Faster restart / better availability | "There are ways to make it better" - unspecified |
| 02:41:59 | High-throughput systems: S3 deep dive (Saturday), video encoding, YouTube views counting, one more DB | Next week |
| 02:43:37, 02:45:10 | SSTable, memtable, LSM trees, high-throughput counting | Next week |
| 02:58:29 | Multi-tiered, cost-efficient storage for Amazon; designs that use pointed reads on S3 | Next week |
| 03:06:09 | Pre-read to be shared | Before next class |

Site handling: show these as "coming in a later lesson" chips; the Bitcask -> LSM chip is the most important, since the Q&A comparison (02:43:12) only makes full sense next week.

---

## 8. Sequencing recommendations for a reader

Constraint: every piece of content (including Q&A nuggets, rejected student ideas and the teacher's war stories) must survive.

### Option A - "Two engines, one toolbox" (lecture order, problem-first) (RECOMMENDED)
1. **Setup**: requirements card (no DB, read-only, weekly changelog, portable, 1 TB / 170,000 words, and why 1 TB - from Q&A 02:56:52), storage vs compute.
2. **Find a word fast**: JSON vs CSV -> naive scan cost -> index -> prompt #1 (size estimate) -> in-memory hash map. Sidebar: "ideas we set aside" (A-Z index, B+ tree, sharded files, Parquet/Lucene) with the teacher's reasons.
3. **Ship one file**: prompt #4 -> separator / fixed size / stack / header -> 16 B header -> custom formats, encoder/decoder, TIF error.
4. **Serve it**: prompt #8 (copy-per-server cost) -> properties before technology -> NAS + random reads -> S3 ranged reads -> boot + GET flow.
5. **Update it weekly**: prompt #2 (in-place write) -> merge of merge sort with sorted files (answers the planted "keep it sorted?") -> 2 TB merge server.
6. **Switch every server to the new file**: prompt #3 (same-path garbage) -> new path + meta.json -> polling / Pub/Sub / REST ladder (prompt #5) -> rolling deployment; Q&A on order of steps and alternatives; teacher's war story.
7. **Why this matters**: pointed reads on S3 -> multi-tiered storage (Amazon orders), Athena, data lakes, Hudi.
8. **Now make writes fast too (Bitcask)**: magnetic disk -> put/update/delete as appends (prompt #6) -> hash-table get + crash rebuild (prompt #7) -> limits -> rotation, merge & compaction, sawtooth knobs (prompt #10) -> record format + CRC (prompt #9) -> limits and strengths -> reveal Bitcask, Riak, Uber.
9. **Recap + project**: side-by-side table of the two engines (index, header, no in-place writes, merge), heuristics card, "implement Bitcask" project, next-week chips (LSM).

Pros: keeps the teacher's simple-to-complex arc and his "build first, name last" reveal; each section opens with one of his strongest prompts; the student ideas fit naturally as "tempting but rejected" sidebars. Cons: long first half with many rejected ideas (needs collapsible sidebars); Bitcask arrives late for readers who came for it.

### Option B - "Primitives first"
Teach the shared building blocks once, then assemble each engine: (1) how disks read and write (overwrite, seek, append); (2) index of key -> offset in memory; (3) headers and length-prefixed records + CRC; (4) merging (sorted two-pointer vs hash-table); (5) networked storage with random reads; then "Engine 1: read-only dictionary on S3 (+ deployment switch)" and "Engine 2: Bitcask".
Pros: removes repetition, highlights the cross-links of section 6, good for readers with some background. Cons: loses the discovery narrative and the teacher's prompts lose their punch (the reader is told the answer before the problem); the deployment discussion and the cost argument fit awkwardly.

### Option C - "Bitcask first, dictionary as a read-only special case"
Start with the general read/write store (Bitcask), then present the dictionary as "what if writes come only weekly and the file must live on S3?".
Pros: Bitcask is the more widely known artifact (Kleppmann, the paper); the dictionary becomes a neat specialisation. Cons: reverses the teacher's deliberate order (he says the dictionary prepares the record-format and index ideas, 02:27:38, and that Bitcask in turn prepares LSM next week, 02:45:10); the hardware-first opening is drier than the dictionary prompts.

**Recommendation**: Option A for the main page, with a compact Option B-style "same idea, twice" comparison table in the recap (index, header/record framing, no in-place writes, merge, rebuild-after-change) so the reader leaves with the primitives named.

### Q&A redistribution map (so nothing is lost)
| Q&A item (time) | Goes into |
|---|---|
| "Are we getting only the changelog or the whole?" (01:07:49) | Weekly updates - requirements recap |
| "So how do we go?" after the in-place overwrite (01:11:52) | Weekly updates - lead-in to the merge |
| Order of steps: merged file -> new path -> meta.json -> deploy (01:47:56) | Switching servers - step list |
| Better than a full redeploy? Reload endpoint; send the 1.7 MB index itself (01:49:29) | Switching servers - "alternatives" box |
| Bitcask vs SSTable/memtable/LSM; persistence by default (02:43:12) | Bitcask reveal + LSM forward chip (with factcheck L-0288, L-0289) |
| Kleppmann's book covers Bitcask; teacher's college paper reading (02:45:25) | Recap - further reading |
| How to create an append-only file; file-system allocation (02:46:31) | Bitcask put - implementation note |
| How deletes are handled in merge (02:49:23) | Merge & compaction |
| Is the CRC/header write atomic? kernel guarantees, separate WAL in paranoid systems (02:51:53, 02:52:23) | Record format + CRC - "is the header write atomic?" box |
| Integrity rarely covered; Postgres-internals blog recommendation (02:53:43, 02:54:24) | Record format - closing note / further reading |
| Why 1 TB for 170,000 words? (02:56:05) | Setup - requirements card |
| Cost of one S3 call per request; caching; cold tier (02:57:50) | Why this matters - multi-tiered storage |
| Redeployment details: rolling deployment out of the box; teacher's Pub/Sub war story (03:00:19) | Switching servers - punchline |
| Offsets are bytes, not line numbers (03:01:39) | Index section |
| Header stores the index size, not a path (03:02:20) | Header section |
| Header rebuilt on every update (03:03:07) | Weekly updates - new file includes header + index |
| Why sorting appeared only at the merge; keeping it sorted is free (03:03:31, 03:04:11) | Weekly updates - merge (closes the planted P3) |

### Things a reader-first version should fix (not drop)
- **Offset width**: the size estimate uses a 4-byte offset, which cannot address 1 TB (factcheck L-0056); keep the teacher's calculation and its lesson, add the 8-byte correction (index still ~2-3 MB).
- **Two different sizings**: live numbers (4.3 chars, 170,000 words, 1.751 MB) vs the prepared notes (171,476 words, 4.7 chars, ~2.7 MB; L-0187). Show the live one; mention the notes' figure in a footnote.
- **Plant sortedness early**: P3 (00:08:23) is left open and only answered at 01:14:35 and in Q&A (03:03:31); the page should flag it as a question to come back to.
- **CSV is a simplification**: the teacher says the dictionary should also use length-prefixed records (02:28:57); add a forward note in the CSV section.
- **Teacher-side corrections from the fact-check** to attach as notes, not drop: Athena internals (L-0035, L-0036), S3 is an object store with ranged reads (L-0112), same-path S3 overwrite is atomic (L-0157), CRC placement in Postgres/MySQL (L-0262), Riak masterless (L-0278), Uber usage (L-0275), SSTable memory (L-0288), file-system limits (L-0235), "almost as fast as SSDs" is about writes (L-0249), n-squared alternative (L-0310).
- **The 1 TB justification** (02:56:52) belongs at the start, not in the Q&A, so readers don't stall on "1 TB for 170k words?".
- **Name spellings and student identities** are unconfirmed in the transcript; keep students anonymous and avoid "Arpit's" in the AODB example (use "the teacher's own database name").
- Admin segments (agenda, break teaser, wrap-up, close) are not content; the next-week plan becomes forward chips.
- Transcript uncertainties to check before quoting: "11 standard kids" (02:26:38), the garbled list of next-week designs (02:58:29), "independent mind"/"not handy" (01:28:45), and speaker boundaries around 00:08:06 and 01:36:20 (see `lectures/lec10/transcript/review_flags.md`).
