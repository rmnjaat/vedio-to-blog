# Lecture 10 lesson outline: "Files as a database"

**Promise (one line):** Build a word dictionary that needs no database: one portable file on S3, read a few bytes at a time and updated weekly without ever serving garbage. Then design a key-value store that writes at full disk speed on cheap magnetic disks, and find out it is Bitcask.

**Dek:** Two storage engines built from plain files: a read-only dictionary on S3 with a header, an index and a weekly merge, and an append-only key-value store with one map in memory, revealed at the end as Bitcask.

Source: lecture id `lec10`, course position 10 (week 5, day 2), 03:06:31 of class plus the board. Ledger `lectures/lec10/ledger/ledger.jsonl` has 311 items: 311 placed and 0 dropped (see `placement.json`, built by `build_placement.py`). The design is `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments are in `factcheck_applied.md`. Pause-and-think prompts are in `prompts.md`. Figures (`figures.md`), clips (`animations.md`, `clips.json`) are written from this outline by the second design call; figure numbers and clip ids below are the contract.

---

## How to read this outline

### Spine
The spine is teaching-map option A, "Two engines, one toolbox", in the lecture's own order, split into page-sized chapters. The class builds both engines from nothing and names them last; the page keeps that ("build first, name last"), because the reveal is the payoff of each half.

Chapters (each a separate page): 1 A dictionary with no database · 2 Finding one word fast · 3 One file you can ship · 4 Serving it from S3 · 5 The weekly update · 6 Switching every server to the new file · 7 Fast writes on a cheap disk · 8 Files that never stop growing · 9 Record format and integrity · 10 It's called Bitcask · 11 What to keep.

Three moves away from the class order, none of which drops anything:
1. **Q&A is folded into the topic it answers.** About 15% of the class was formal Q&A, and the dictionary half was itself mostly brainstorm. Every Q&A item lands next to the claim it refines (map in each chapter's "Q&A folded in" line). The "why 1 TB for 170,000 words?" answer (02:56:05) moves to the problem statement in 1.1, so readers don't stall on it.
2. **The sorting question is planted, then closed.** "Will you keep the file sorted?" was asked at 00:08:23 and only answered at 01:14:35 and in Q&A (03:03:31). The page asks it in 1.2, marks it "we come back to this", and closes it in 5.3.
3. **"Why this matters" closes the dictionary half** (6.5: multi-tiered storage, Athena, data lakes). It stays where the class put it, at the end of the build, as the bridge to the second half.

**The two halves.** They were linked in class by the record format (02:28:57), the in-memory key → offset index (00:30:48, 02:11:51) and the merge (02:34:06). The page draws those links where the class did, and the recap (§11) lays them side by side in one table. The page does not invent other links.

### Voice rules (apply everywhere)
- The page speaks in its own voice. There is no teacher–student dialogue and no student names. Class Q&A becomes explanation. A proposal the class corrected becomes "It is tempting to…; in fact…". The dictionary half is mostly student proposals; each rejected idea is stated with the reason it was rejected, often in a short "ideas set aside" list, because the rejected ideas are part of the lesson.
- The instructor's own stories (writing an image format, implementing Bitcask five years ago, meeting Bitcask in a college paper-reading course, reloading his own services with a deployment) appear as "the instructor" and are attributed as experience, not as checked fact. The example database name is "the instructor's own database name" (no personal name).
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix. Hedges stay hedges.
- Outside facts appear with a source link (SourceNote or an inline sourced sentence).
- **Portable tag.** The recurring constraint "portability = literally one file" (L-0029) runs as a small hand-lettered tag `one file` in the margin of §1, §3, §4 and §6 wherever a proposal is rejected because it breaks it. It is a visual tag on existing prose, not a new component.
- **Bare minimum tag.** "Do the bare minimum: reads, writes, IO, cost" (L-0100, L-0117, L-0226) runs the same way as a `bare minimum` tag in §4 and §7.

### Component vocabulary (all from design B; numbers refer to NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph: the sample's rhythm. |
| **Figure** | #6 static figure (panels on graph paper; stack <760px) | Board redraws D-xx and new figures. Spec in `figures.md` (second call). |
| **StepThrough** | #7 step-through (time runs down, Prev/Next, deep link `#fig-x/step-n`) | Discrete sequences the reader studies: boot reads, the overwrite spill, same-path garbage, crash rebuild, merge and compaction, the torn record. |
| **AnimationClip** | #10 clip (poster = end state, play pill, chapter chips, predict line before it) | 5 clips, at most one per chapter, where change over time is the lesson: `l10-scan-vs-index`, `l10-sorted-merge`, `l10-garbage-vs-rolling`, `l10-append-only-log`, `l10-sawtooth`. Spec in `animations.md` (second call). |
| **RuleBox** | #5 key rule (hand-ruled box + small sketch, label "The rule for this whole chapter") | Exactly one per chapter, §1–§10. |
| **PauseAndThink** | #8 sticky-note card, two choices, each with its own verdict, then a reveal | 9 prompts (P1–P9). Spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table (glyph headers, one red ✕ cell, stacks <700px) | 5 tables (T1–T5), where the class compared options. |
| **MarginNote** | #12 named collapsible aside (title + one-line "skip unless…") | Side material: Q&A threads, "From practice", "Go deeper", further reading. |
| **SourceNote** | #9 sourced fact, headed **"More precisely"** | Directly after the teacher's point, for wrong / outdated / imprecise-medium items: 12 ledger items in 10 notes (SN-01..SN-10). |
| **CodeBlock** | the sample's `pre code` | Short layouts and pseudo-code from the board (header bytes, merge loop, record struct). |
| **ForwardChip** | chip "coming later · week 6" / "back in Lecture N" | Deferred topics and back-references, numbered by course order (`lectures/course.json`). |
| **RecallQuestions** | #13 recall (3 questions, `details` reveal) | Exactly 3 per chapter, §1–§10. |
| **AboutThisClass** | lecture header meta + short `details` note | Course-structure facts only. |
| **NotationKey** | #4 notation key, once per lecture | Top of §1, extended with this lecture's glyphs: file bar (long grey rectangle with labelled segments `H | I | D`), S3 cloud, in-memory map (small two-column table with a purple outline), byte-offset tick (a small caret under a file bar), disk platter, append arrow (↓ into the tail of a file bar), active file (yellow outline). |

### Marker colours (NOTES.md, unchanged)
Blue = request / read path (a GET, a ranged read, a hash-map lookup). Green = ack / success / a valid new file or record. Red = failure, garbage or corrupt bytes, stale offsets, hard limits (the 1 TB disk cap, the 4-byte offset overflow). Graphite = everything else. Dashed = async (the weekly job, the merge, the deployment trigger, merge and compaction). Arrowheads sit on the initiator: an API server *reads* S3, so the ranged-read arrow starts at the server and points at the cloud; the update job *uploads*, so its arrow starts at the job server.

### Course links used on this page (course order from `lectures/course.json`)
Back: Lecture 2 (lec01, Medium under load): polling vs push, caching at every level, `hash(key)` routing. Lecture 3 (lec05, Locking the airline seats): the key-value store on MySQL, delete as an update with the magic value `-1`, B+ trees and batched cleanup. Lecture 4 (lec02, Slack in real time): Redis Pub/Sub. Lecture 5 (lec08, Building a load balancer): "make systems reactive rather than polling-based", config pushed to every server. Lecture 6 (lec03, Minting unique IDs): the timestamp on the leftmost side. Lecture 9 (lec07, Build your own Redis): routing a key to a node ("yesterday's pattern"), the byte budget, consistent hashing, the append-only file. Forward: next week (week 6: S3 in depth, video encoding, counting YouTube views, SSTables, memtables and LSM trees) is not among the course's ten recorded sessions; its chips say "coming later · week 6".

---

## Lecture header (unnumbered)

- **Kicker:** Lecture 10 · week 5, day 2 · running case: a word dictionary with no database, then Bitcask
- **H1:** Files as a database. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** (design #2, "you are here") with the eleven chapters, grouped under two small heads: "Engine 1: the dictionary" (§1–§6) and "Engine 2: the key-value store" (§7–§10), then §11.
- **AboutThisClass** (collapsed `details`, about 150 words): week 5 is storage-engines week; this second day continues it with two problem statements chosen to build foundational blocks, for designing new systems and for getting the most out of existing ones (L-0001). Both systems are used in production to a huge extent; neither is a toy (L-0002). The problem statement was deliberately put together to touch many building blocks used day in and day out (L-0008). How the page is built: each engine is designed from scratch and named only at the end, as in class. **Prerequisites strip** (ForwardChips "back in…"): Lecture 9 (routing a key, the byte budget, the append-only file), Lecture 5 (reactive vs polling), Lecture 4 (Redis Pub/Sub), Lecture 3 (delete with a magic value, B+ trees).
- **The running case so far** (Prose, about 80 words, no ledger ids): yesterday's session built a cache in memory and spread it across nodes. Today the data does not fit in memory and must survive restarts, so both engines live in files. Engine 1 is read-mostly and changes once a week; engine 2 must take writes as fast as the disk allows.
- Estimated words: 300.

---

## 1 · A dictionary with no database
**Section dek:** Serve every English word and its meaning with no database at all: one portable file, read-mostly, updated every Sunday. First the requirements, then the format, then the clever ideas set aside.
**Sec-meta:** about 14 min · class 00:00:49–00:19:57, Q&A 02:56:05
**Opening problem (the dictionary):** a publisher sends you a dictionary of 170,000 English words, 1 TB in all, and a changelog every Sunday. You may not use MySQL, Postgres, MongoDB, Redis, Elasticsearch or any other database. Users ask for one word at a time.
**RuleBox (§1):** "Keep it simple, and discover the design one step at a time." (L-0040, L-0034). Box body: start from the simplest thing that meets the constraints; every clever structure you add brings its own disadvantages. Sketch: a staircase of three steps, the first labelled "text file". Sits in 1.3.
**Estimated words:** 2,000
**Q&A folded in:** why 1 TB for 170,000 words (02:56:05) → 1.1.

### 1.1 The problem: a dictionary, no database
- **Purpose:** set the requirements once, as a card the later chapters refer back to.
- **Opens with:** the opening problem above.
- **Key points:** build a word dictionary with no traditional database; be creative (L-0003). It should be "quote-unquote" scalable on both the storage and the API side, within some obvious constraints (L-0004). Any system design splits into storage and compute: compute is the API servers, storage is where data lives (L-0005). A high response time is acceptable: performance is not today's problem, and there are hundreds of known tricks (caching, batching) for it (L-0006). The dictionary must be **portable**; the page flags every design that breaks portability, and why it matters becomes clear in the next system and next week (L-0007; ForwardChip "coming later · week 6"). It is a standard English dictionary, mostly read-only, since a dictionary like Oxford rarely changes (L-0009). No live updates: once a week (say Sunday) a changelog file arrives with only the changed words and their new meanings, to be applied to the store (L-0010). A lookup is always a single word: no autocomplete; unknown word → 404 (L-0011). The whole dictionary is 1 TB with 170,000 words (L-0012). Why so big? It was chosen on purpose so that copying it everywhere becomes too costly, which forces the storage and portability decisions; imagine meanings with audio and video (L-0305). Requirements raised in class: searchable by key, so it is a key-value store (word → a two- or three-line meaning) (L-0024); very read-heavy, a thousand to one and more skewed than that (L-0025); a single-word update must not "boil the ocean", but since updates arrive as one weekly batch, one big processing pass is fine (L-0026). The design is explored along four axes: storage, query, portability, seamless updates (L-0013).
- **Components:** NotationKey (once), Prose, Figure **Fig 1·a** "The brief" (new: requirement card with the four axes as tabs).
- **Words:** 650

### 1.2 JSON, or a plain text file?
- **Opens with:** the first decision: what does the file look like?
- **Key points:** a first proposal: a text file or a JSON file (L-0014). Querying JSON means unmarshalling it, which is expensive, so the text file wins (L-0015). JSON is a bad fit at this size: to check one word you read the whole file, deserialize it and build an in-memory object; it offers no way to reach one entry directly (L-0016, left as taught + optional A-D-15 as a separate sourced sentence: JSON Lines lets you stream record by record, but it still has no index). So: a simple text file (L-0017). An idea raised and not taken up: write it like a log of updates; the format settled on word, meaning (L-0018). The format: CSV-like, one line per word, `apple,a fruit`, then the next word (L-0019). It is tempting to allow the same word twice so updates can be appended; in fact the dictionary must not contain repeats: people open the file in any text editor, and a portable file can't carry duplicates (L-0020). Added requirement: **no repetitive entries** (L-0021). "Will you keep the file sorted?" One answer was no: response time is not a constraint, so any order will do, and that is accepted for starters (L-0022). The page marks this "we come back to this" (closed in 5.3). When B-trees came up, they were deferred: discovering the design step by step is what makes it stick (L-0023).
- **Figure:** Fig 1·b (D-01 redraw: the text file `apple , a fruit` / `amazon, a rainforest`, `1TB`, `JSON file` struck out).
- **Words:** 550

### 1.3 Clever ideas, set aside, and what "portable" means
- **Opens with:** several sharper ideas arrived at once. Each is good somewhere; each is set aside here for a reason.
- **Key points (the "ideas set aside" list, each with its reason):** sort by key, since without sorting there is no efficient search (L-0027; left open in class, the design goes another way first). Shard into many sorted files and route each word to its file, like the routing of Lecture 9 (L-0028; ForwardChip back in Lecture 9): it kills portability. **Portability means literally one file**, in some format, holding everything needed to read and write it, easy to copy and ship, not tens or hundreds of files (L-0029, plus optional A-D-09 as a separate sourced sentence: SQLite is one portable disk file). One zip of hundreds of folders as "the file" (L-0030, with an inline clarification: the zip is rejected because it is still many logical, often compressed, files with no direct byte-offset read into the dictionary; A-D-10 as a sourced sentence: ZIP itself keeps a central directory with each member's offset). The one-file rule isn't random: it is the foundation for hundreds of systems (L-0031). Logical partitions inside one sorted file with a header describing key ranges: complex enough to come back to later (L-0032). Encode records in Parquet: not today, keep it simple (L-0033). The simpler direction is on purpose, so the base concepts of anything queryable come clear (L-0034) → RuleBox §1 with L-0040. **What this simulates:** on AWS you can upload a plain CSV to S3 and query it with Athena (L-0035 → **SourceNote SN-01**, A-D-11). The dictionary simulates how such an engine's builders would think about querying simple files, at a smaller scale (L-0036, left as taught; SN-01 sits right above it). Lucene, raised in class: it tokenizes and stores document IDs against keys, and one Lucene index is one possibly huge file (L-0037, inline clarification + A-D-16: an index is made of segments plus a segments_N file; the compound format packs one segment into a .cfs file). Kept "one level down" for now.
- **Components:** Prose (list), RuleBox §1, SourceNote SN-01, ForwardChip "back in Lecture 9: routing a key to its node", margin tag `one file`.
- **Figure:** Fig 1·c "One file, not a folder" (new, small: a fan of 100 sharded files and a zip, both with a red ✕, beside a single file bar with a green tick).
- **RecallQuestions §1:** (1) Name the four axes the design is judged on, and the one constraint that rules out sharding into many files. (2) Why is a 1 TB JSON file a poor store for single-word lookups, even if you have a fast parser? (3) Updates arrive once a week as a changelog. Which earlier decision does that relax, and which does it not?
- **Words:** 800

---

## 2 · Finding one word fast
**Section dek:** The naive lookup reads half a terabyte per request. One small index, and one multiplication, turn it into a single pointed read.
**Sec-meta:** about 15 min · class 00:19:57–00:34:54, Q&A 02:59:16, 03:01:39; prepared notes 01:43:35
**Opening problem (the dictionary):** a user asks for "apple". The 1 TB file is on disk as plain lines. Where is apple, and how much do you read to find it?
**RuleBox (§2):** "Whenever reads are slow, the only thing that should come to your mind is indexing." (L-0046). Box body: and before you design the index, do the number crunch: how big is it, and does it fit in memory? (L-0060). Sketch: a long file bar with a short index bar above it and one blue arrow down into the file. Sits in 2.1, at the turn from scan to index.
**Estimated words:** 1,900
**Q&A folded in:** offsets are bytes, not line numbers (03:01:39) → 2.2. Don't take MBs lightly (02:59:16) → 2.3.

### 2.1 Start naive: scan the file
- **Opens with:** "how would you search this?"
- **Key points:** the tempting answer is binary search with offsets, B+ tree pages, 8 KB blocks and 1,000 keys in memory (L-0038, plus optional A-FFD-08 as a separate sourced sentence: real databases do use fixed 8 kB pages, and page-based trees matter when an index is too big for RAM, which is not the case here). Why limit memory to 1,000 keys at all? Far more fit (L-0039). For a simple dictionary that is over-engineering: keep it simple, that is where the beauty shows (L-0040). The naive design: one CSV text file, key first, then its gigantic meaning (L-0041). Naive lookup: open the file, read line by line until the key, read the meaning, return (L-0042). A linear scan per read is very expensive for a read-heavy app (L-0043). Worst case a lookup reads the whole 1 TB; on average half, 500 GB per request (L-0044). It is slow, degrades the disk and wears out sectors (L-0045, inline clarification: scanning 0.5 TB per request wastes disk throughput and pushes drives past their rated workload, which reduces reliability; Seagate source). Whenever reads are slow, think indexing (L-0046, RuleBox; left as taught: a classroom rule of thumb, and the lecture itself names caching and batching in 1.1).
- **Figure:** Fig 2·a (D-01 redraw with the red scan arrow down the left edge; labels "worst 1 TB, average 0.5 TB per request").
- **Words:** 500

### 2.2 A one-level index
- **Opens with:** what if a small file told you exactly where apple starts?
- **Key points:** create a small one-level index over the data file so no lookup scans it (L-0047). Each index entry is the key and its offset in the data file (L-0048). The offset is the byte position where that word's line starts: the nth byte from the start of the file. Asked in class: these are bytes, not line numbers (L-0049; the page uses real byte offsets in its example, e.g. `apple,a fruit\n` is 14 bytes, so apple is at 0 and amazon at 14, not the spoken "two" and "three"). Read path with a separate index file: scan the index line by line to the key, take the offset, read that one line of the data file, answer (L-0050). That is still a linear scan, but of keys and small offsets, not huge meanings, so it is fast even in the worst case; file IO is sequential anyway (L-0051, left as taught; the offset width is corrected in SN-02 two paragraphs later).
- **AnimationClip `l10-scan-vs-index`.** Predict line: "Both lookups find apple. Which one touches less than a megabyte?"
- **Figure:** Fig 2·b (D-02 redraw: `index.dict` with `apple, o1` / `amazon, o2` / `book, o3`, arrows into `data.dict`).
- **Words:** 450

### 2.3 Will the index fit in memory?
- **Opens with:** before deciding how to read the index, estimate its size (L-0052).
- **Key points:** a tempting shortcut: index only A to Z, 26 entries with their locations; in fact you would still scan every word under that letter, and the full per-word index fits in memory anyway (L-0053). Entry size = key length + offset length (L-0054). Average English word length: about 4.3 characters, not more than five; the instructor downloaded a dictionary and computed it himself (L-0055, inline clarification + A-D-02: 4.8 letters in running text, about 7.6 across distinct words, and a dictionary index stores distinct words). The offset is an integer: 4 bytes (L-0056 → **SourceNote SN-02**, A-D-01: a 1 TB file needs 8-byte offsets; the index is still a few MB). Plus a comma and a newline: 4.3 + 4 + 2 = 10.3 bytes per entry (L-0057). Index = 170,000 × 10.3 B = 1,751,000 B ≈ 1.75 MB (L-0058, left as taught; the board's arithmetic is checked and correct, and SN-02 gives the 8-byte variant: 170,000 × 14.3 B ≈ 2.4 MB; A-FFD-07: MB here means 10^6 bytes, about 5% less than a MiB). 1.75 MB is "peanuts" next to a 1 TB file (L-0059). Number crunching is very important: what looked huge needed an index of MBs (L-0060, also in RuleBox §2). Don't take MBs lightly either: M is a million bytes, which holds a lot of information (L-0307). Load it once: keep the index on disk, load it into an in-memory hash map when the API server starts; a request checks the map, gets the offset, reads that line, returns (L-0061). One number crunch made the system much better, with one level of indexing instead of over-complication (L-0062). No linear scan remains: each lookup is one pointed read at the index's offset; storage and query are settled (L-0063).
- **PauseAndThink P1** (before the calculator figure).
- **Figure:** Fig 2·c "The number crunch" (D-02 right side redrawn as a calculator strip: 170,000 × (4.3 + 4 + 2) = 1,751,000 B = 1.751 MB, then a second row in red/green: with an 8-byte offset, ≈ 2.4 MB, still fits).
- **MarginNote** "The prepared notes' number": the instructor's pre-written notes size it differently: 171,476 words, entry = 4.7 + 3 + 2×4, about 2.6 MB (L-0187, left as taught; the arithmetic checks out at 2,692,173 B, and the same 8-byte caveat applies). Skip unless you want a second estimate.
- **RecallQuestions §2:** (1) Why is scanning a 2 MB index file line by line still far cheaper than scanning the data, even though both are linear? (2) Redo the index estimate with 8-byte offsets and 7.6-letter words. Does the design change? (3) Why is an A–Z index of 26 entries worse than a full per-word index here?
- **Words:** 950

---

## 3 · One file you can ship
**Section dek:** The index made two files, and the brief said one. Putting both in one file raises a new question: where does the index stop? The answer is the header, the trick behind every file format.
**Sec-meta:** about 15 min · class 00:34:54–00:49:38, Q&A 03:02:20
**Opening problem (the dictionary):** the dictionary is now `index.dict` plus `data.dict`. A partner downloads it, and the brief says one file.
**RuleBox (§3):** "Divide the file into compartments, and put a fixed-size header first that says where each one lies." (L-0083). Box body: that is how every custom file format is built, and it is what made the dictionary shippable. Sketch: a file bar with a hatched header slot and two arrows from it into the index and data segments. Sits in 3.3.
**Estimated words:** 1,900
**Q&A folded in:** the header holds the index size, not a path (03:02:20) → 3.2.

### 3.1 Two files break portability
- **Opens with:** the opening problem.
- **Key points:** two files, index and data (`data.dictionary`), break portability; it must become one file (L-0064). Proposals, each tested against one question, "how would you know where the index stops?": don't persist the index, rebuild it at every start; rejected, because every start would scan the whole data file, which is avoidable when the file changes weekly (L-0065). Concatenate index and data into one gigantic file, which raises the question (L-0066). Mark the boundary with a special line or separator: good, but improvable (L-0067). Pre-allocate a fixed region, say the first 2 MB, a little more than today's 1.751 MB: "a very nice hack", slightly wasteful; be more frugal (L-0068). Data from the top down, index from the bottom up like a stack: you still need to know where one ends, and the gap between them is wasted (L-0069). Why it matters: if index and data are both CSV lines read into the hash map, the reader would load data lines as index entries, e.g. replace apple's offset with "fruit" (L-0070). Reserve a position at the very start for the boundary information, updated as data is added: interesting, and refined next (L-0071).
- **PauseAndThink P2** (before the table).
- **TradeoffTable T1** "Where does the index end?": columns Rebuild at start · Separator line · Fixed 2 MB region · Stack (data ↓, index ↑) · Byte offset at the start. Rows: extra work at boot · wasted space · how the reader knows where to stop · what breaks. Red ✕ on "Separator line / how the reader knows": "must scan for the line". Ids L-0065, L-0067, L-0068, L-0069, L-0072.
- **Figure:** Fig 3·a (D-03 redraw: one long file bar, header slot, index segment ending in a zigzag, data segment; the options list beside it with the boxed `2MB`).
- **Words:** 650

### 3.2 A fixed-size header
- **Opens with:** store the boundary as a number, not a marker.
- **Key points:** store the byte offset directly at the start of the file; no separator needed; the reader reads that first chunk to know where the data begins (L-0072). That first chunk is a **header**, the classic mechanism of every file format (PNG, JPG, MP3, AVI): the first few bytes hold meta information about the rest, as the format's creator specifies (L-0073, left as taught + A-FFD-04 as a separate sourced sentence: many formats keep that directory at the end instead, ZIP and MP4 by default). One file holds several sections, so the header describes each (L-0074). The header must be fixed size (L-0075). Field 1, 8 bytes: a name telling the decoder "this is our dictionary", `OUR_DICT` (L-0077; the page writes the 8-byte `OUR_DICT` from the board, since the spoken O-U-R-D-I-C-T is 7 letters). PNG does the same: its first bytes say PNG (L-0078, inline clarification + A-FFD-01: every PNG starts with the same 8-byte signature, 89 50 4E 47 0D 0A 1A 0A). If the instructor built his own database, its first bytes would spell its name (AODB on the board) and his decoder would recognise it (L-0079; the page says "the instructor's own database name"). Field 2, 4 bytes: a version, because a format can have variants (v1 index then data, v2 data then index), and the decoder acts on it (L-0080). Field 3, 4 bytes: the index size, e.g. the integer for 1.75 MB; a data start offset would also work (L-0076). Asked in class: the header holds the *size* of the index stored in the same file, not the location of another file. 16 bytes in all: 8 + 4 + 4 (L-0081, plus A-FFD-02 as a separate sourced sentence: a binary header also fixes the byte order of its integers; PNG is big-endian, Parquet's length little-endian). Boot: read the first 16 bytes, check the name, read the version, read index-size bytes into a hash table; everything after is data, which the offsets point into (L-0082).
- **CodeBlock:** the 16-byte layout as a C-like struct: `char magic[8] = "OUR_DICT"; uint32 version; uint32 index_size;` then `index[index_size]`, then `data…`.
- **StepThrough** Fig 3·c "Opening the file" (steps: read 16 B → check `OUR_DICT` → read version → read `index_size` bytes → build the hash map → ready; each step highlights the bytes read on the file bar).
- **Figure:** Fig 3·b (D-04 redraw: `OUR_DICT - 8B`, `Version - 4B`, `index size - 4B`, brace `16B`).
- **Words:** 700

### 3.3 Every file format is a header and sections
- **Opens with:** you have just designed a file format. So has everyone who wrote a PNG decoder.
- **Key points:** this makes the dictionary shippable, and it is the classic way to build any custom format: compartments plus a header that says where each lies (L-0083, RuleBox). Because of the one constraint, the dictionary became one file instead of several. Other formats use sections too: JPG frames; MP4's header says where video and audio parts are (L-0084, left as taught). A file with a header ships easily, and anyone with the decoder can read it (L-0085). Parquet, from data engineering, has headers and information too (L-0086, inline clarification + A-FFD-03: Parquet keeps its metadata in a footer, after a leading `PAR1`). JSON has no header: you read all of it and let the decoder parse braces and quotes into memory before you learn anything (L-0087, left as taught). CSV in general has no header; PPT and PDF do; you can define your own (L-0088, inline clarification + A-FFD-05: RFC 4180 allows an optional first line of column names, a header in a different sense). Every format has its encoder and decoder: one writes the format, one reads it (L-0090). "This web browser does not support TIF format" means it has no decoder for those bytes (L-0091, plus optional A-FFD-06 as a separate sourced sentence: as of October 2026 only Safari shows TIFF natively).
- **MarginNote** "Where the instructor learned this": he once tried to write his own image format, which is how he learned how headers work (L-0089, attributed as his experience). Skip if you only want the dictionary.
- **Figure:** Fig 3·d "Header first, or directory last" (new, small: four mini file bars: PNG (signature first), our dictionary (16 B header), Parquet (`PAR1` … footer … `PAR1`), ZIP (central directory at the end)).
- **RecallQuestions §3:** (1) Why does a separator line between index and data cost more at boot than a byte offset in a header? (2) What three fields are in the dictionary's 16-byte header, and which one lets the reader skip straight to the data? (3) What does "this browser does not support TIF" tell you about the browser, in this chapter's terms?
- **Words:** 550

---

## 4 · Serving it from S3
**Section dek:** One file, many API servers. Copying it to each server is the obvious move and the costly one. Pin down the property you need (random reads over the network), and S3 turns the file into a database.
**Sec-meta:** about 16 min · class 00:49:38–01:05:16, Q&A 02:57:50
**Opening problem (the dictionary):** `GET /word` arrives at a load balancer with a fleet of API servers behind it. Where does the 1 TB file live?
**RuleBox (§4):** "Do the bare minimum at the bare minimum cost; if you are not thinking about cost, you are not building good systems." (L-0100). Box body: ask "is this cost-efficient?" before "is this fast?". Sketch: a server box with a 1 TB disk crossed out in red and an arrow to one shared cloud. Sits in 4.1.
**Estimated words:** 1,900
**Q&A folded in:** how costly is one S3 call per request; isn't caching over-optimization? (02:57:50) → 4.3.

### 4.1 One copy per server?
- **Opens with:** recap: file formats, portability, headers and indexing are done; now the infrastructure, starting from a seed design (L-0092).
- **Key points:** requests come to a load balancer with a bunch of API servers behind it (L-0093). The API is `GET /word`; the LB forwards each request to one instance (L-0094). A proposal: shared disk storage that every server reads (L-0095). Why not a copy on every server? Updates would be tedious, with some servers unavailable; in fact updates come as one bulk job every Sunday, so not a problem yet (L-0096). A partly failed update would leave servers inconsistent; valid, but meanings barely change ("a fruit" today, "a round fruit" tomorrow is not the end of the world) (L-0097). Before you propose, think through the alternatives' disadvantages (L-0098). The biggest pain is **cost**: duplicated storage on every server (L-0099). Do the bare minimum at the bare minimum cost (L-0100, RuleBox, plus A-FFD-09 as a separate sourced sentence: AWS makes cost optimization one of the six Well-Architected pillars). You can make anything fast with money: 1 TB of RAM per machine and no index at all, but it isn't cost-effective (L-0101). Copies on SSDs, which are costly: 100 servers hold 100 TB of redundant data (L-0102). So keep the dictionary in one central place (L-0103).
- **PauseAndThink P3** (before the cost reveal).
- **Figure:** Fig 4·a "One copy per server" (new: LB, three API servers each with a `1TB` disk; a tally `× 100 servers = 100 TB`; the board's list `update tedious` / `inconsistency` / red `COST !!`).
- **Words:** 650

### 4.2 Properties first, then technology
- **Opens with:** "put it on S3" came quickly. First ask what the storage must do.
- **Key points:** the proposal: one file on Amazon S3, cheap and built for blobs (L-0104). S3's get-object call takes the bytes to read, so you fetch the header and index bytes, then one word's byte range (L-0105, plus A-D-03 as a sourced sentence: GetObject takes an HTTP `Range: bytes=…` header). First pin down the properties, then pick the technology (L-0106). Shared storage, because replication is cost-inefficient, and what servers share is the network (L-0107). Any block storage or database reachable over the network; databases are out, so the file goes on block storage such as S3, still one file (L-0108 → **SourceNote SN-03**, A-D-12). The design assumed a normal disk: read the header, read the index, then random reads in the data; the storage must support that (L-0109). The generic term: network attached storage with file-system semantics (L-0110, inline clarification: what matters is networked storage with (offset, length) reads: a NAS share, HDFS or an object store all qualify). The bare minimum: random reads, `(file, offset, n)` (L-0111). S3 gives file-system-level semantics: ask for n bytes at an offset and get exactly those (L-0112 → **SourceNote SN-04**, A-SSE-10). S3 isn't special: HDFS or physical network disks in a data center would do; S3 is used because everyone knows it (L-0113, plus optional A-D-17: HDFS streams support positioned reads too).
- **Components:** Prose, SourceNote SN-03, SourceNote SN-04.
- **Words:** 600

### 4.3 Boot, GET, and a database built from a file
- **Opens with:** walk one server from boot to its first answer.
- **Key points:** each API server needs the file's S3 path, passed as static configuration for now; deployment is still to come (L-0114). Boot: from the path, read the first 16 bytes as the header; another call reads index-size bytes; build the in-memory hash table; start serving (L-0115). GET: any server checks its map; absent → 404; present → one ranged read on S3 at that offset, which S3, HDFS and network disks all support (L-0116). The beauty: pointed reads of one record without reading the file; that effectively builds a database, since a database is a key-value store at heart (L-0117, left as taught: a read-only key-value store with point lookups). "Magical", with a ton of applications, coming later in this lecture (L-0118). **Asked in class:** isn't one S3 call per request costly, and isn't caching or tiering over-optimization? In the real world you do that; reading S3 directly here only shows that pointed reads on S3 are possible (L-0306, plus A-D-08 and A-SSE-11 as sourced sentences: AWS quotes about 100–200 ms first-byte latency for latency-sensitive apps, tens of ms median for small requests, and recommends a cache such as ElastiCache or CloudFront in front of S3 for hot data; ForwardChip back in Lecture 2 for caching at every level).
- **StepThrough** Fig 4·c "Boot, then one GET" (steps: config path → ranged read bytes 0–15 → ranged read of the index → hash map built → `GET /word?w=apple` → map hit, offset → ranged read of one record → 200; a second request for an unknown word → 404).
- **Figure:** Fig 4·b (D-05 redraw: user → LB → three API servers each with an in-memory map `w → o`, blue ranged-read arrows to the S3 cloud holding a file bar `I | D`; the note `(file, off, n)` and `Pointed Read`).
- **RecallQuestions §4:** (1) Two students' objections to a copy per server were tedious updates and inconsistency. Why were both "not a problem yet", and what was? (2) Which single property must the shared storage have, and name two storages besides S3 that have it. (3) How many S3 calls does a server make at boot, and how many per GET?
- **Words:** 650

---

## 5 · The weekly update
**Section dek:** Sunday's changelog changes apple's meaning. You can't edit a file in place, so build a new one, and keeping the file sorted makes that a single merge pass.
**Sec-meta:** about 13 min · class 01:05:16–01:18:17, Q&A 03:03:07–03:05:47
**Opening problem (the dictionary):** the changelog says apple is now "a round fruit", ball and zoo changed too. The live file is on S3. How does the change get in?
**RuleBox (§5):** "Never write in place on disk: always write the change into a new file." (L-0146). Box body: a write beyond a line's range overwrites the next one; a merge of two sorted files into a third is the clean way. Sketch: two sorted strips with pointers merging into a third. Sits in 5.3.
**Estimated words:** 2,000
**Q&A folded in:** only the changelog arrives, not the whole dictionary (01:07:49) → 5.1. Header rebuilt on every update (03:03:07) → 5.3. Why sorting came only at the merge; keeping it sorted is free (03:03:31–03:05:47) → 5.3.

### 5.1 A job on its own server
- **Opens with:** with storage, query and serving done, the last big piece is seamless updates (L-0119).
- **Key points:** recap of the input, asked in class: only the changelog arrives each week (the changed words and their new meanings, e.g. apple, ball, zoo), not the whole dictionary (L-0010, restated from 1.1). A periodic (cron) job, triggered when the update arrives, updates the dictionary and its index, repackages the file and uploads it, on a separate machine (L-0120). The terms: a batch job is batch processing; what's needed here is a job doing periodic updates (L-0121, inline clarification: it is a batch job triggered on a schedule, a cron job). It runs on a newly spun-up server holding the changelog and the downloaded dictionary (L-0122). Bump the version in the header? That's the last step; and that version is the format's version, not the data's (L-0123). Tempting ideas, each corrected: append the changelog at the end, since the file isn't sorted; but the file grows forever and holds duplicates, which the served dictionary can't (L-0124). Iterate once and replace changed entries: "is it really that simple?" (L-0125). Compare hashes or generate a diff: unnecessary, the changelog already says what changed (L-0126). It's easy to build complex systems and very hard to build simple ones; think only of what you need (L-0127).
- **Figure:** Fig 5·a (D-06 lower half redraw: the S3 cloud, a dashed arrow down to the update server holding the dictionary, the changelog `apple / ball / zoo`, and an empty new-file slot).
- **Words:** 550

### 5.2 Why you can't edit in place
- **Opens with:** use the index to find apple and replace its line (L-0128).
- **Key points:** the file holds `apple, a fruit` then `ball, a round object`; the new meaning is "a round fruit". Written at apple's offset, does ball move down? (L-0129). No: on disk, writing at a location overwrites whatever is there, so the longer meaning runs into ball's line (L-0130). In an IDE you hit enter and lines move down, because the text is in memory; on disk you can't (L-0131). So "I'll replace the entry" overrides existing data (L-0132). Imagine the code you'd write: that is where the breakage shows, and what makes better engineers (L-0133). A senior engineer wears three hats: product manager, architect, engineer; this is the engineer hat (L-0134). Graveyard entries (append the new meaning, compact later) are rejected here: no repeats, and for a weekly batch just build it clean (L-0135; the idea returns in §8, where live writes make it the right one).
- **PauseAndThink P4** (before the step-through).
- **StepThrough** Fig 5·b (D-07 redraw, "apple runs into ball": step 1 the two lines; step 2 the index gives apple's offset; step 3 `a round fruit` is written over `a fruit` and spills into `ball, a`; step 4 red: ball is now unreadable).
- **Words:** 500

### 5.3 Merge, as in merge sort
- **Opens with:** write a new file instead (L-0136).
- **Key points:** the proposal, called naive: find where the change belongs, write it into a new file, append the rest (L-0136). Not naive: it's the merge step of merge sort, the best approach for this design (L-0137). No B+ trees: a simple approach is efficient, complexity brings its own costs (L-0138). For the merge to be efficient, the dictionary must be sorted (L-0139, left as taught). Closing the planted question from 1.2 (L-0022): sorting wasn't needed at first, and came in with the merge. Merge the existing sorted dictionary and the changelog into a new file (L-0140). The changelog is small: if unsorted, sort it in memory and dump it (L-0141). It's the classic merge of two sorted lists into a third (L-0142). Procedure: a pointer per file; write the smaller word and advance; on a match write the changelog's meaning and advance both (L-0143). Walkthrough: dictionary a…h, changelog c″, e′, f″ → a, b, c″, d, e′, f″, g, h; when the changelog runs out, the rest follows (L-0144). It never loads the file: line by line in, a third file out (L-0145). Always write new entries into a new file (L-0146, RuleBox). 1 TB in, 1 TB out: the job server needs at least 2 TB of disk, fine for one server (L-0147). The result is a complete dictionary with a new header and index, all sorted (L-0148); asked in class: the index size changes every update, so the header is rebuilt. **Asked in class:** isn't keeping 170,000 records sorted complex? Nothing is inserted in place; the merge produces the sorted file (L-0309). Both inputs sorted → output sorted → next week's input; one pass, O(n), not O(n²) (L-0310, left as taught). Computer science is obsessed with sorted data because it makes processes simple (L-0311).
- **AnimationClip `l10-sorted-merge`.** Predict line: "The changelog has three entries and the dictionary eight. How many times does each pointer move?"
- **Figure:** Fig 5·c (D-08 redraw: `Dictionary` a–h, `Changelog` c″ e′ f″, `New dic`, pointer arrows).
- **CodeBlock:** the merge loop in ten lines of pseudo-code (two readers, one writer; `<`, `>`, `==` branches; drain the rest).
- **TradeoffTable T2** "Applying the weekly changelog": columns Append at end · Replace in place · Graveyard + compaction · New file by merge. Rows: duplicates? · touches live bytes? · needs sorted input? · fits a weekly batch? · verdict in class. Red ✕ on "Replace in place / touches live bytes": "overwrites the next entry". Ids L-0124, L-0128, L-0130, L-0135, L-0137.
- **RecallQuestions §5:** (1) Why does writing "a round fruit" at apple's offset damage ball? (2) What does the merge need from its two inputs, and what does it give next week's job for free? (3) Why does the job server need 2 TB of disk for a 1 TB dictionary?
- **Words:** 950

---

## 6 · Switching every server to the new file
**Section dek:** The new dictionary is ready. Overwrite the old one and servers read garbage. Upload it to a new path, point a small `meta.json` at it, and let a routine deployment do the reload. Then see why reading a few bytes from S3 matters so much.
**Sec-meta:** about 34 min · class 01:18:17–01:52:05, Q&A 03:00:19–03:01:39
**Opening problem (the dictionary):** the merged file sits on the job server. Every API server holds an index built from last week's file, with last week's offsets.
**RuleBox (§6):** "We control our own infrastructure: trigger a deployment instead of writing code." (L-0198). Box body: a reload is a boot; a rolling deployment boots every server onto the new file, with no polling, no Pub/Sub and no reload API. Sketch: a small `AWS SDK` box with a curved `Deploy` arrow up to a row of servers. Sits in 6.4.
**Estimated words:** 3,300
**Q&A folded in:** order of the steps (01:47:56) → 6.4. Better than a whole redeploy? (01:49:29) → 6.4. Redeploy details and the instructor's Pub/Sub story (03:00:19–03:01:39) → 6.4.

### 6.1 Same path, stale offsets, garbage
- **Opens with:** how should the new file reach S3, and what can go wrong?
- **Key points:** a proposal: upload to a new S3 path and swap the pointer, worrying about downtime during the switch (L-0149, plus A-D-06 as a sourced sentence: a 1 TB file needs multipart upload; one PUT stops at 5 GB). The same proposal framed it as a deployment: since the file is in one place, a rolling upgrade of the file itself wouldn't work, so switch A to B completely and roll out with a canary (L-0150). The probe: why a new path at all? Same path would avoid telling servers anything (L-0152). Answers from class: a short window when the file can't be served, and every deployment needs a rollback plan if the upload fails or corrupts (L-0153, inline clarification: S3 overwrites are atomic, so there is no unserved window, but you lose the old copy for rollback unless versioning is on). Put it in temporary storage, validate, then mark it live (L-0154). Drawing boxes is easy; where and how you upload, and whether users ever see garbage, are the critical details (L-0155). A simple-looking problem still hasn't converged after an hour and a half; these are building blocks for other systems (L-0156). Same-path problems: the upload may fail, the file may be corrupt, and every server must reload because the offsets no longer match (L-0157, left as taught + A-D-05 as a separate sourced sentence: a failed upload doesn't damage the old object on S3; the real danger is the stale offsets). The example: the index says apple is at offset 100, 1,024 bytes; after a same-path upload those bytes may be another word, starting mid-line: garbage (L-0158). Until every server reloads, users see garbage, a very poor experience (L-0159). The prepared notes' option 1, a periodic pull of each server's index, has the same gap: garbage between the change on S3 and the next pull, plus a graceful reload to manage (L-0160).
- **PauseAndThink P5** (before the step-through).
- **StepThrough** Fig 6·a (D-09 redraw, "Old index, new file": step 1 `apple: 100, 1024` → `data.dat` row `apple, a fruit` (blue); step 2 the new `data.dat` lands at the same path; step 3 the same read returns another word cut mid-line (red): "user sees garbage"; step 4 `How to smoothly transition?`).
- **Words:** 750

### 6.2 A new path, and a static meta.json
- **Opens with:** so: a new path. How do servers learn it?
- **Key points:** the chosen transition is a parallel setup: build and upload the new file at a new path while the old one keeps serving, then move the servers over (L-0151). Version the file name: `s3://word-dictionary/dictionary1.dictionary`, then `dictionary2.dictionary` (L-0161). Putting an IP or anything else in the path changes nothing: the new path still has to reach the servers (L-0162). Ideas set aside: send every server an invalidate command; too complex (L-0163). Switch at the job's known time; unreliable, since the job may overrun, the upload may fail or be corrupt, and the clock switches anyway (L-0164). One file per word; kills portability (L-0165; margin tag `one file`; D-11 shown as a small rejected panel). Accepted: a metadata file on S3 holding the current path, updated when the upload succeeds; servers poll it every 5–10 minutes and reload when it changes (L-0166). Its path must be static, so everyone knows the one place to look (L-0167).
- **Figure:** Fig 6·b "A pointer file" (D-06 top-right redraw: `meta.json` `{ path: "s3://wd/dict2.dict" }` in the S3 cloud beside `dict1.dict` and `dict2.dict`; dashed upload arrow from the job server; a small rejected inset of D-11 "one file per word" with a red ✕ and `Portability`).
- **Words:** 500

### 6.3 Polling, reactive, and still too complex
- **Opens with:** why poll every 5–10 minutes for a job that runs once a week?
- **Key points:** the answer given: the upload time isn't known (S3 might be down Sunday, the upload lands Monday) (L-0168). Wherever there is polling, things can be made reactive: someone tells you "something changed, go pull" (L-0169; ForwardChip back in Lecture 5, "make systems reactive", and Lecture 4 for Redis Pub/Sub). Reactive option: every server subscribes to a Redis Pub/Sub channel; the job publishes when the upload is done (L-0170). But that's too complex here: one more component, every server on a persistent connection, just to hear "changed" (L-0171, plus A-D-07 as a sourced sentence: Redis Pub/Sub is at-most-once, so a server restarting at the wrong moment misses the event). Polling isn't bad, but why make 5,000 requests when someone can tell you (L-0172)? More ideas, each still polling or still complex: a `latest` flag in the old file's header; you'd never learn it without polling (L-0173). Check the header version with the backend on every request: still polling (L-0174). A REST endpoint the job calls: the same reactive idea as Pub/Sub (L-0175). Register servers, upgrade one at a time, test, switch ports on the LB: "complex, complex"; the path is already in meta.json, and the same thing can be done very simply (L-0176; the "easy to build complex, hard to build simple" line from 5.1 is restated here, L-0127). Same path with S3 versioning: S3-specific, and exactly the two-files-plus-pointer idea (L-0179, plus A-D-13 as a sourced sentence: a versionId stored in meta.json would pin each server to its version). An `updated_at` in meta.json checked per request: still polling, and a meta call per request is expensive (L-0180). An `updated_at` in the dictionary file itself: reading with an old index gives garbage first, and a text file carries no such metadata (L-0181, inline clarification + A-D-04 as a sourced sentence: S3 returns ETag and Last-Modified, and a ranged GET with `If-Match` fails with 412 instead of returning garbage). Brainstorming options that end up rejected is useful: it shows why decisions are made (L-0182).
- **TradeoffTable T3** "Telling every server about the new file": columns Switch at a known time · Poll meta.json · Redis Pub/Sub · Reload endpoint · Check per request · Rolling deployment. Rows: needs new code? · extra infrastructure · requests wasted per week · if the upload fails · garbage possible? Red ✕ on "Switch at a known time / if the upload fails": "switches anyway". Ids L-0164, L-0166, L-0171, L-0172, L-0175, L-0180, L-0183, L-0184.
- **Figure:** Fig 6·c "Two ways to hear 'changed'" (D-10 redraw: panel 1 the polling timeline with the red `garbage response` gap; panel 2 Redis pipe → three API boxes, `Standalone` updater publishing).
- **PauseAndThink P6** (at the end, before 6.4).
- **Words:** 800

### 6.4 A reload is a boot: trigger a deployment
- **Opens with:** the hint: what happens when an API server boots?
- **Key points:** `meta.json` is a static file holding the path to serve; on boot a server reads it, reads the dictionary, builds the index, serves (L-0177). So reloading after meta.json changes is exactly a deployment (L-0178). The job includes the AWS SDK and triggers a deployment; rolling deployment takes one server down and brings a new one up, which reads meta.json on boot (L-0183; asked in class: cloud providers give rolling deployment out of the box, the LB stays, servers are swapped one at a time; plus optional A-D-14: an EC2 Auto Scaling instance refresh launches new instances before terminating old ones at 100% minimum healthy). During the roll some requests hit old servers and some new: inconsistent, never garbage, because each server's index matches the file it reads; eventually consistent, and meanings don't change drastically (L-0184). Any deployment tool works; one invocation replaces endpoints and Pub/Sub (L-0185, RuleBox context). **The order of steps (asked in class):** merge → upload to a new path → update meta.json → trigger the deployment (L-0196). **Better than a whole redeploy?** Only the startup routine needs to rerun; reload endpoints are possible but add complexity (L-0197). Or send the 1.7 MB index itself in the update, so nothing is reloaded from S3 (L-0199). The out-of-the-box move many engineers miss: same cost, no polling, no Pub/Sub; we control our infrastructure (L-0198, RuleBox). The instructor's notes cover the same flow in more detail (changelog, merge, same path, transition, Pub/Sub, parallel setup, header) (L-0186).
- **MarginNote** "From the instructor: reload by deploying": for a couple of his own services he first added Redis Pub/Sub and reload APIs, then just triggered a deployment instead: no code, no extra component (L-0308, attributed as his experience). Skip if the RuleBox already convinced you.
- **AnimationClip `l10-garbage-vs-rolling`.** Predict line: "Same new file, two ways to switch. In which one does a user ever get bytes from the middle of another word?"
- **Figure:** Fig 6·d "The update, end to end" (D-06 full redraw: user → LB → API servers; S3 with `dict1`, `dict2`, `meta.json`; the job server; purple `AWS SDK` → `Deploy`; the four steps numbered ①–④).
- **Words:** 700

### 6.5 Why this matters: cold data you can still query
- **Opens with:** "why did we just spend two hours on a dictionary?"
- **Key points:** what was built: pointed GETs on S3 that read the bare minimum; huge applications (L-0188). Amazon orders: nobody opens a six-month-old order, so move those to S3 and keep recent ones in the hot database (MySQL); users can still look them up (L-0189). You can't just dump JSON on S3: you need pointed queries (order ID → details), which this design gives (L-0190). It's the foundation of multi-tiered storage: data on S3 keeps the ability to be queried (L-0191; ForwardChip "coming later · week 6: tiered, cost-efficient storage for Amazon orders"). S3 here isn't an archive but cheap storage: hot DB fast, S3 much slower, in exchange for a big cut in hot-database cost (L-0192; asked in class: for infrequent reads, higher latency is fine; S3 calls aren't cheap or fast, its storage is). Data lakes keep huge data on very cheap storage, still queryable (L-0193). Apache Hudi's table format and Hive partitions are "exactly this" (L-0194, inline clarification + optional A-SSE-12: Hudi keeps indexes from record key to file id so lookups avoid scanning every file). Summary: from deciding to deploying, keep it simple (L-0195).
- **Figure:** Fig 6·e (D-12 redraw: `Multitiered Storage`: recent orders → MySQL, historical orders → S3, "without losing the ability to query"; `Athena`, `Data lake`).
- **RecallQuestions §6:** (1) Apple was at offset 100 in last week's file. Why can a same-path upload return bytes from another word, and why can't a new-path upload? (2) List the four steps of the weekly update in order. (3) The rolling deployment leaves some servers on the old file for a while. Why is that acceptable here?
- **Words:** 550

---

## 7 · Fast writes on a cheap disk
**Section dek:** The second engine must take writes as fast as a magnetic disk allows, and lose nothing. Append every put to the end of one file, make delete a put, and keep one map in memory for reads.
**Sec-meta:** about 22 min · class 01:52:05–02:14:35, Q&A 02:46:31–02:49:23
**Opening problem (the key-value store):** design a super fast key-value store on very cheap commodity hardware, magnetic hard disks, that supports put, get, update and delete with full persistence (L-0200).
**RuleBox (§7):** "Append, no matter what: every put, update and delete goes to the end of the file." (L-0213). Box body: an append-only file can be read anywhere but written only at its end (L-0216), which is the most a magnetic disk can give a writer. Sketch: a file bar with a ↓ arrow into its tail and a crossed-out arrow into its middle. Sits in 7.3.
**Estimated words:** 2,200
**Q&A folded in:** creating an append-only file, preallocating (02:46:31) → 7.2. File-system allocation (02:48:26) → 7.2.

### 7.1 The problem, and how a magnetic disk works
- **Opens with:** the opening problem; a super fast store everyone uses without knowing it, with O(1) reads, writes and deletes plus persistence (L-0200).
- **Key points:** the storage hierarchy: CPU caches, memory, SSD, magnetic disk, tape; SSDs sit closer to memory in speed and cost (L-0201). SSDs are fast but costly, so huge data lives on magnetic disks (L-0202). A magnetic disk: a head moves across a spinning platter (L-0203). A byte offset in a file maps to a disk, a sector, and an offset inside it (L-0204). To read, the platter rotates and the head moves there, reads, and hands the bytes to the driver and up to user space; every read elsewhere needs another movement (L-0205). That mechanical movement is the most time-consuming part of disk I/O (L-0206).
- **Figure:** Fig 7·a (D-13 redraw: platter with sectors, one dotted red; a head arm; the speed scale `M` … `SSD` … `HDD`).
- **Words:** 400

### 7.2 Put: append, never seek
- **Opens with:** "how would a put look?"
- **Key points:** only put, get and delete, but every put is flushed to disk immediately (L-0207). It is tempting to buffer puts in a sorted in-memory map (memtable/SSTable); in fact the requirement is to persist immediately (L-0208, left as taught; SN-10 in §10 covers how LSM engines do persist). Keep a ledger-like file, appending every change at the end (L-0209). Appending fits a magnetic disk best: the head is already where the last write ended; no seek, no wait for the sector (L-0210, left as taught; board: "Append only / Zero seek / no big mech movement / Best we can do!!"). Put K1 V1, K2 V2, K3 V3: each appended in order (L-0211). Also remember where each key's entry starts? Deferred until get (L-0212). An update (put K1 V1′) is also appended; the old entry becomes obsolete (L-0213, RuleBox). That is how a put gets maximum performance out of a cheap disk (L-0214). **Asked in class:** create it by opening the file in append mode `a` (besides r, w, r+, w+); don't preallocate 1 GB; the file system lays the file out (L-0293). File systems (BTRFS, NTFS, ext2/3/4) don't usually pack files back to back, so a growing file is not a problem (L-0294, left as taught).
- **CodeBlock:** `f = open("001.data", "ab")` then `f.write(record); f.flush(); os.fsync(f.fileno())` with a comment "persist immediately".
- **Words:** 550

### 7.3 Delete: a put with a special value
- **Opens with:** the store only appends. How do you delete K2?
- **Key points:** tempting: go back and overwrite K2's value with a value that never occurs, like −1; in fact an append-only file can't be written at an earlier location (L-0215; ForwardChip back in Lecture 3, where a delete became `expired_at = -1` in the MySQL key-value store). An append-only file allows random reads anywhere, but writes only at the end (L-0216). So delete = append K2 with a marker value: `DEL K2 = PUT(K2, -1)` (L-0217). Put is O(1), so delete is too (L-0218).
- **PauseAndThink P7** (before the reveal paragraph).
- **Words:** 300

### 7.4 Get: an in-memory map to the latest offset
- **Opens with:** K1 now appears twice in the file. How does a get find the right one fast?
- **Key points:** the naive get scans every entry and returns the latest: very poor (L-0219). An SSTable-like structure? A simple hash table is what's needed; the two are very different (L-0220). An in-memory hash table maps each key to the offset of its latest entry (the offset, not the value), updated on every append (L-0221). Put: append first, note the offset, then point the key at it (K1 → O1 … K1 V1′ → O4) (L-0222). Delete: remove the key from the map; no entry means no key (L-0223). Get: look up; absent → 404; present → read at that offset (L-0224). If the machine dies the map is gone; on restart scan the file and rebuild it (L-0225). So get, put and delete are each O(1), the bare minimum on a cheap disk, with full persistence (L-0226). The same move as the dictionary's index (2.3): a small map in memory pointing into a big file.
- **AnimationClip `l10-append-only-log`.** Predict line: "Four puts and a delete. Which offset does K1 point to at the end, and where is K2?"
- **Figure:** Fig 7·b (D-14 redraw: the file `K1 V1`, `K2 V2`, `K3 V3`, `K1 V1′`, `K2 -1`; `in-mem` map `K1 → O4`, `K3 → O3`, no K2; the board lines `Append only / Zero seek`).
- **StepThrough** Fig 7·c "Crash and rebuild" (steps: map in memory → power lost, map gone (red) → restart, scan the file top to bottom → K1 → O1, then O4; K2 added then removed; K3 → O3 → serving again).
- **RecallQuestions §7:** (1) Why is an append the cheapest write a magnetic disk can do? (2) How is a delete stored in an append-only file, and how does the map reflect it? (3) After a crash, what must the store do before it can answer a get, and what does that cost?
- **Words:** 650

---

## 8 · Files that never stop growing
**Section dek:** The store never deletes anything from disk, so it fills up. Split it into small files with one active writer, merge and compact the old ones, and watch disk usage draw a sawtooth.
**Sec-meta:** about 11 min · class 02:14:35–02:25:42, Q&A 02:49:23–02:51:06
**Opening problem (the key-value store):** the store has been running for a month. The file is 900 GB on a 1 TB disk, and most of it is overwritten or deleted values.
**RuleBox (§8):** "Keep the sawtooth under the disk cap." (L-0245). Box body: two knobs shape it: how often merge and compaction runs, and how big a file may grow before rotation. Sketch: a sawtooth under a red horizontal line. Sits in 8.4.
**Estimated words:** 1,800
**Q&A folded in:** how deletes are handled in the merge (02:49:23) → 8.3. Merge implementation with a separate hash table (02:50:13) → 8.3.

### 8.1 What could go wrong?
- **Opens with:** "what could go wrong over here?"
- **Key points:** rebuilding the map on restart takes long, which lowers availability; accepted for this design, and there are ways to improve it (L-0227, plus A-SSE-01 as a sourced sentence: real Bitcask writes small hint files of keys and positions, so startup reads those instead of the data). Every key must fit in memory: the number of keys you can store is bounded by RAM (L-0228). Nothing is ever collected, so the one file grows until the disk is full (L-0229). Use several files, and scrub one that's no longer written: rewrite it with only live keys (L-0230; the scrubbing becomes merge and compaction in 8.3).
- **Words:** 350

### 8.2 File rotation
- **Opens with:** several files, but when do you start a new one?
- **Key points:** with several files, writes go to only one; the others become immutable (L-0231). It is tempting to plan for three files (one written, one read, one being built); in fact reads and writes hit the same files: a read goes wherever the key is (L-0232). Switch when the disk is divided by two or three? A 100 TB disk would get 10 TB files; that has more problems (L-0233). Huge files can't be indexed concurrently, and smaller units make cleanup more even (L-0234). The biggest reason: file-system limits; a file system may not support files over 1 TB, and BTRFS and NTFS each have limits (L-0235, inline clarification: FAT32 caps at 4 GB but modern file systems allow many terabytes; the stronger reason is that merge, compaction and rebuilds work file by file). So keep files small, 100 MB or 1 GB, and start a new one when the threshold is crossed (L-0236, plus A-SSE-03 as a sourced sentence: Riak's Bitcask rotates at 2 GB by default). Files are numbered 001, 002, 003, 004; exactly one is active (L-0237). **File rotation**: each time the active file crosses its limit, a new one starts (L-0238). The map now stores file and offset per key: `K1 → f1, O4` (L-0239; the page corrects the board's `K3 → f2, O3` to f1, since K3 V3 sits in file 001).
- **PauseAndThink P8** (before the threshold paragraph).
- **Figure:** Fig 8·a (D-15 redraw, left half: files `001`–`003` read-only, `004` active in yellow, `File Rotation` arrow to a new file; the map `K1 → f1, O4`, `K3 → f1, O3`).
- **Words:** 550

### 8.3 Merge and compaction
- **Opens with:** the read-only files are full of dead entries.
- **Key points:** rotated files hold stale entries (the old K1) and deleted ones (K2), wasting space (L-0240). Merge and compaction: while the active file keeps taking writes, a process reads the read-only files and writes one new file without stale or deleted entries, then deletes the old files (L-0241). Offsets change, so the map is updated for every moved entry (L-0242). It's not a merge-sort merge, since the files aren't sorted: load entries into a temporary hash table, newer replacing older, and flush it periodically without dead entries (L-0243). **Asked in class:** deleted keys are simply skipped during the merge, never copied (L-0295). Implementation: buffer pairs in an in-memory hash table, replace a key on a newer entry, remove it on a delete marker, flush as the new file; this table is separate from the index (L-0296). Contrast with the dictionary: there the weekly merge was a sorted two-pointer merge (5.3); here it's a hash-table merge.
- **StepThrough** Fig 8·b "Merge and compact" (D-20 redraw: step 1 files 001–003 read-only with stale (grey) and deleted (red) records; step 2 the temporary hash table fills, K1 replaced, K2 removed; step 3 flush to the new file; step 4 the map repointed (green), old files deleted).
- **CodeBlock:** merge pseudo-code: `for rec in files: if rec.is_delete: tmp.pop(rec.key) else: tmp[rec.key] = rec` then `write(tmp)` then update the map.
- **Words:** 450

### 8.4 The sawtooth and its two knobs
- **Opens with:** plot disk usage over a week.
- **Key points:** usage climbs with writes and drops each time merge and compaction runs: a sawtooth (L-0244). It must stay under the disk's capacity; its shape sets the merge frequency and decides performance; cross the cap and the system crashes (L-0245, RuleBox). Merge too often and garbage collection steals CPU; too rarely and work piles up (L-0246). Two configurable parameters: merge and compaction frequency, and the file rotation threshold (L-0247, left as taught + A-SSE-04 as a separate sourced sentence: real Bitcask triggers merges by how much garbage exists, 60% dead keys or 512 MB dead bytes by default, with an optional merge window). Tune both by monitoring the sawtooth, and expose them to whoever runs your store (L-0248). The approach is standard, and the best one can do on a cheap magnetic disk, almost as fast as SSDs (L-0249, inline clarification: true for writes; every get still costs one seek, so random reads stay far behind SSDs). On SSDs the gain is smaller, since there's no rotating disk (L-0250, inline clarification: flash can't be overwritten in place either, so append-only writes still help, with optional A-SSE-17: zoned SSDs require sequential writes per zone).
- **AnimationClip `l10-sawtooth`.** Predict line: "Halve the merge frequency. Does the peak go up or down, and what is the line it must never cross?"
- **Figure:** Fig 8·c (D-15 right half redraw: the sawtooth graph under a red `1TB` cap; the notes `1. MC freq` `2. file rotation threshold`).
- **RecallQuestions §8:** (1) Why are only the non-active files merged? (2) What must happen to the in-memory map after a merge, and why? (3) Name the two knobs and what goes wrong at each extreme of the first.
- **Words:** 500

---

## 9 · Record format and integrity
**Section dek:** "Write key, value" is too casual. Prefix every record with its sizes so one read gets it all, and lead with a CRC so a half-written record is caught, not served.
**Sec-meta:** about 8 min · class 02:25:42–02:32:54, Q&A 02:51:53–02:54:24
**Opening problem (the key-value store):** the machine loses power halfway through appending a 1 MB value. Later, more records are appended after it. A get for that key arrives.
**RuleBox (§9):** "At any offset, know exactly how many bytes to read." (L-0254). Box body: sizes first, so a record is read in one shot; a CRC on the record, so a broken one is never served. Sketch: a record bar `CRC | TS | KSZ | VSZ | K | V`. Sits in 9.1.
**Estimated words:** 1,700
**Q&A folded in:** is the header write atomic? (02:51:53–02:53:22) → 9.3. Integrity rarely covered; Postgres-internals posts (02:53:43–02:54:24) → 9.3.

### 9.1 Don't read until the newline
- **Opens with:** "Here we just casually said I'll write key, value. No."
- **Key points:** files are read by blocks, not lines, so a disk store needs a defined record format (L-0251; even the dictionary was simplified to word, comma, meaning). Every database (MySQL, Postgres, MongoDB, Redis) serializes to disk in its own record format, built for efficient reads (L-0252). Reading one byte at a time until `\n` is one disk I/O per byte: very slow, code a school kid would write (L-0253, inline clarification + A-SSE-15: it is one call per byte; the OS page cache absorbs most disk reads, but it is still slow). At any offset you should know exactly how many bytes to read (L-0254, RuleBox). Write the key size and value size first, 4 bytes each (L-0255). Read in two I/Os: the 8-byte prefix, then key+value bytes in one more read (L-0256). The dictionary should use this format too: word size, meaning size, word, meaning; CSV was only the easy start (L-0257).
- **Figure:** Fig 9·a (D-16 bars 1–2 redraw: `K | V`, then `KSZ | VSZ | K | V` with the brace "key size & value size").
- **Figure:** Fig 9·b "The dictionary, re-recorded" (new, small: one dictionary record `5 | 13 | apple | a round fruit` in the same format, linking back to §3; teaching-map gap item, drawn from L-0257).
- **Words:** 500

### 9.2 Detecting a torn write: CRC first
- **Opens with:** the opening problem.
- **Key points:** a database must be fault tolerant: a crash mid-write corrupts the entry; you can't fix it, but you must know and not serve it (L-0258). A partial entry is dangerous: reading "value size" bytes would run into the next record (L-0259). The only way to detect it is a CRC (checksum): a hash over key size, value size, key and value, computed in memory and stored with the record (L-0260, left as taught). It goes on the leftmost side and is the first thing written and flushed; it can't go at the end (L-0261 → **SourceNote SN-05**; ForwardChip back in Lecture 6: the timestamp on the leftmost side of an ID). Good formats do this: the Postgres commit log, the MySQL binlog (L-0262 → **SN-05**, A-SSE-07, A-SSE-08). Network formats too, since the first bytes received tell you whether data is corrupt (L-0263 → **SourceNote SN-06**). Final record: CRC, timestamp (for conflicts), key size, value size, key, value (L-0264, plus A-SSE-05 as a sourced sentence: Bitcask's source writes exactly this order). Write the header part first, then the key, then the value; if the first write fails the entry doesn't exist, if a later one fails the CRC won't match and the reader says "corrupt" (L-0265). Recovery is mostly heuristic: ignore the entry, e.g. during merge and compaction (L-0266, plus A-SSE-06 as a sourced sentence: LevelDB skips corrupted data and resyncs at the next block). When designing storage, question CSV-until-newline; use sizes, key, value and a CRC (L-0267).
- **PauseAndThink P9** (before the step-through).
- **StepThrough** Fig 9·c (D-16 bars 3–4 redraw, "A torn record": step 1 `KSZ | VSZ | K | 110…` cut short (red), "machine crashed while writing value"; step 2 a new record appended after it; step 3 read by VSZ runs into the next record (red); step 4 with `CRC | TS | KSZ | VSZ | K | V` the check fails → "corrupt", skipped (green on the next record)).
- **Words:** 700

### 9.3 Is the header write atomic?
- **Opens with:** a sharp question from class.
- **Key points:** the pattern assumes the value write may tear but the CRC and header write won't; confirmed in class (L-0297, inline clarification: neither POSIX nor disks promise that; the CRC design doesn't need atomic headers, because a torn header fails the CRC too). File systems and kernels differ; a header under the block size is assumed to be written whole, but a kernel may not guarantee it (L-0298, plus A-SSE-09 as a sourced sentence: Postgres writes 8 KB pages as 16 sectors and logs full page images because a power loss can tear them). The header is tiny, about 20 bytes, so in practice it will be written (L-0299, left as taught). Raised in class: more paranoid systems add a separate WAL; this pattern is more performant (L-0300, an open remark). Integrity is almost never covered in system design overviews: people say "write it to a WAL" without how (L-0301, the instructor's view). Ignored, systems only seem fine, until the one engineer who cares isn't there (L-0302, the instructor's view).
- **MarginNote** "Go deeper: Postgres internals": Hussein Nasser's Medium posts on Postgres internals (record format, pages, source snippets), best after you've implemented Bitcask (L-0303). One surprise from them: how many pages Postgres spends on meta information compared with data (L-0304, the instructor's impression). Skip unless you like engine internals.
- **RecallQuestions §9:** (1) Why does a key-size/value-size prefix turn a record read into exactly two I/Os? (2) A record's value was cut short by a crash. Without a CRC, what goes wrong on the next read? With one? (3) Name two real formats that put the CRC first and two that put it elsewhere (see SN-05).
- **Words:** 500

---

## 10 · It's called Bitcask
**Section dek:** One map of keys in memory, append-only files on disk, merges in the background, a CRC on every record: that is Bitcask. What it can't do, where it runs, and how it differs from the LSM trees coming next week.
**Sec-meta:** about 13 min · class 02:32:54–02:41:59, Q&A 02:42:51–02:46:00, 02:51:06
**Opening problem (the key-value store):** the design is complete. Before naming it: what is its one hard limit, and what does it give in return?
**RuleBox (§10):** "Whenever a system claims high throughput with persistence, look for an append-only file." (L-0280, inline clarification: a strong heuristic, not a law; batching, group commit and relaxed sync also buy throughput). Box body: if it isn't there, ask how. Sketch: a file bar with an append arrow and a small "throughput" gauge. Sits in 10.2.
**Estimated words:** 1,900
**Q&A folded in:** Bitcask vs SSTable/memtable/LSM (02:43:12–02:44:30) → 10.3. Kleppmann's book; college paper reading (02:45:25–02:45:54) → 10.3. Implementing it takes about a week (02:51:06) → 10.3.

### 10.1 What we built: one map, many files
- **Opens with:** the prepared recap slides.
- **Key points:** each map entry holds the file, the record size, the offset, and a timestamp; entries point into any file, writes go only to the active one (L-0268). The main limitation: all keys must fit in memory; values are on disk, but keys and offsets are in RAM (L-0269). Strengths: very high write throughput and very low write latency, from bare-minimum I/O (L-0270). It saturates the device's I/O (and the network's), so nothing waits idle (L-0271). Backups are easy: copy the files (L-0272).
- **Figure:** Fig 10·a (D-17 + D-18 + D-19 merged redraw: `K1 → File ID | VSZ | VPOS | TS` pointing into the middle of three files, the active one yellow; the `GET(k)` strip: hash table lookup → disk seek → disk read; red `limitation: index to fit in memory`).
- **Words:** 400

### 10.2 Bitcask, Riak and Uber
- **Opens with:** "The database that we just designed is called Bitcask."
- **Key points:** it is Bitcask, an embedded database (L-0273). Embedded means a library, not a server everyone connects to; SQLite is one; Bitcask has no server (L-0274, plus A-SSE-16 as a sourced sentence: in SQLite the application process reads and writes the file directly). Uber uses Bitcask for its main ride-hailing service (L-0275 → **SourceNote SN-07**). Being embedded, it reaches Uber through Riak, a key-value store with Bitcask as its back end (L-0276 → **SN-07**). Riak is to Bitcask what Elasticsearch is to Lucene (L-0277, left as taught). Riak makes Bitcask distributed: master-slave, consensus, a routing proxy, consistent hashing, data split into mutually exclusive sets (L-0278 → **SourceNote SN-08**, A-SSE-14; ForwardChip back in Lecture 9 for consistent hashing). The append-only file is the magic behind Bitcask on cheap hardware (L-0279). High throughput with persistence means an append-only file (L-0280, RuleBox). Bitcask: simple, fabulous, covering integrity, record format, merge and compaction; heavily used through Riak, the usual Riak back end (L-0281).
- **Figure:** Fig 10·b (D-21 redraw, corrected per SN-08: user → any Riak node (no master), three Riak nodes on a ring each holding a hatched Bitcask block; caption from the board "Each node of Riak has an instance of Bitcask running").
- **Words:** 600

### 10.3 Bitcask vs LSM, and build it yourself
- **Opens with:** asked right after the reveal: are LSM trees, SSTables and memtables the same thing?
- **Key points:** the big difference: an SSTable design keeps values in memory, Bitcask doesn't; SSTables are also sorted, for a reason covered next week (L-0288 → **SourceNote SN-09**, A-SSE-13). Bitcask persists every write immediately by default; a memtable buffers and can lose data if memory goes (L-0289 → **SourceNote SN-10**, A-SSE-02). Bitcask was taught first on purpose, as the foundation (L-0290; ForwardChip "coming later · week 6: SSTables, memtables, LSM trees, counting at high throughput"). Kleppmann's book opens its storage chapter with Bitcask; understand it and other engines get easy (L-0291). The instructor met Bitcask in a college storage paper-reading course and found it simple and beautiful (L-0292, his experience). There is a Bitcask paper, a search away (L-0282). **Build it:** not difficult, and it teaches file I/O and performance deeply; it surfaces the devils (merge in the same process or another? how to update the map?); about a week (L-0283). The instructor implemented it about five years ago and benchmarked it against on-disk and in-memory stores on disks and SSDs (L-0284, his experience). Monitor yours with Prometheus while it runs; spend a week or two (L-0285).
- **TradeoffTable T4** "Bitcask vs an LSM engine": columns Bitcask · LSM (memtable + SSTables). Rows: what's in memory · on-disk files · sorted? · write path · durability default · limit. Red ✕ on Bitcask's "limit" cell: "every key must fit in RAM". Cells follow SN-09/SN-10 (LSM logs each write to a WAL first; Bitcask's default sync leaves flushing to the OS). Ids L-0269, L-0288, L-0289.
- **MarginNote** "Project: build your own Bitcask": put/get/delete over an append-only file, the map, rotation, a merge process, the CRC record; measure with Prometheus (L-0283, L-0285). Skip unless you'll build it this week.
- **RecallQuestions §10:** (1) What bounds how many keys a Bitcask node can hold, and why not values? (2) What does Riak add on top of Bitcask (per SN-08)? (3) Give two differences between Bitcask and an LSM engine, as corrected in SN-09 and SN-10.
- **Words:** 900

---

## 11 · What to keep
**Section dek:** The same few ideas built both engines. Here they are side by side, with the heuristics the class kept returning to, and where the course goes next.
**Sec-meta:** about 2 min · class 02:41:59–02:42:51
**Opening problem:** none. This is the recap.
**Key points:**
- **TradeoffTable T5** "Same idea, twice": columns The dictionary (§1–§6) · The key-value store (§7–§10). Rows: in-memory index (word → offset, 2.3 / key → file + offset, 7.4) · what tells you how many bytes to read (16-byte header, 3.2 / KSZ + VSZ prefix, 9.1) · writes in place? (never: new file, 5.2 / never: append, 7.3) · the merge (sorted two-pointer, 5.3 / hash-table compaction, 8.3) · after a change (new path + deploy, 6.4 / map repointed, 8.3) · why files (cost: one copy on S3 / cost: cheap magnetic disk). Red ✕ on the dictionary's "writes in place?" cell: "never: it overwrites the next entry". Restates placed ids; no new placement.
- **Heuristics card** (Prose list, each linking back): keep it simple (§1, L-0040, L-0127); reads slow → index (§2, L-0046); do the number crunch (§2, L-0060); compartments + a header (§3, L-0083); think about cost first (§4, L-0100); properties before technology (§4, L-0106); never write in place (§5, L-0146); we control our infrastructure (§6, L-0198); append, no matter what (§7, L-0213); keep the sawtooth under the cap (§8, L-0245); know how many bytes to read, and check the CRC (§9, L-0254, L-0267); high throughput with persistence means append-only (§10, L-0280).
- **ForwardChips ("Where this lecture stops"):** next week is about high-throughput systems, extending the storage week to the compute side: S3, video encoding, counting YouTube views, and one more database (L-0286). Next Saturday opens with a deep look at S3 and its nitty-gritty, where everything so far comes in handy (L-0287). SSTables, memtables and LSM trees (L-0290, restated). Each chip: "coming later · week 6".
- **Figure:** Fig 11·a "Two engines" (new: the two final designs side by side, the dictionary's file bar `H | I | D` on S3 with servers and `meta.json`, and the Bitcask files with the map; the shared ideas marked with the same small glyphs as T5's rows).
- **Components:** TradeoffTable, Prose, ForwardChips, Figure. No RuleBox, prompt or recall (the design's section end handles "Concepts in this section"), as in Lecture 2's recap.
- **Words:** 450

---

## Totals
| Section | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 300 | – | – | – | – | – |
| 1 A dictionary with no database | 2,000 | 1·a, 1·b, 1·c | – | – | – | SN-01 |
| 2 Finding one word fast | 1,900 | 2·a, 2·b, 2·c | l10-scan-vs-index | P1 | – | SN-02 |
| 3 One file you can ship | 1,900 | 3·a, 3·b, 3·c(step), 3·d | – | P2 | T1 | – |
| 4 Serving it from S3 | 1,900 | 4·a, 4·b, 4·c(step) | – | P3 | – | SN-03, SN-04 |
| 5 The weekly update | 2,000 | 5·a, 5·b(step), 5·c | l10-sorted-merge | P4 | T2 | – |
| 6 Switching every server | 3,300 | 6·a(step), 6·b, 6·c, 6·d, 6·e | l10-garbage-vs-rolling | P5, P6 | T3 | – |
| 7 Fast writes on a cheap disk | 2,200 | 7·a, 7·b, 7·c(step) | l10-append-only-log | P7 | – | – |
| 8 Files that never stop growing | 1,800 | 8·a, 8·b(step), 8·c | l10-sawtooth | P8 | – | – |
| 9 Record format and integrity | 1,700 | 9·a, 9·b, 9·c(step) | – | P9 | – | SN-05, SN-06 |
| 10 It's called Bitcask | 1,900 | 10·a, 10·b | – | – | T4 | SN-07..SN-10 |
| 11 What to keep | 450 | 11·a | – | – | T5 | – |
| **Total** | **~21,350** | **32 figures (7 step-throughs) + 10 rule-box sketches** | **5** | **9** | **5** | **10 notes (SN-01..10) covering 12 items** |

Reading time is about 100 minutes over eleven pages. The longest page is §6 (≈3,300 words); chapters.json splits it into two parts (6.1–6.3, 6.4–6.5). All figures share one glyph kit (file bar, S3 cloud, in-memory map, platter, record bar); `figures.md` lists the kit first.
