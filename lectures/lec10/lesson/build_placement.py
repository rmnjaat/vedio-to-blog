#!/usr/bin/env python3
"""Build lectures/lec10/lesson/placement.json from the table below.

Row format: id | section | component | also (sec:Comp;sec:Comp) | source note | note
Run: python3 lectures/lec10/lesson/build_placement.py
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

SECTIONS = {
    "about": "Lecture header: About this class",
    "1.1": "The problem: a dictionary, no database",
    "1.2": "JSON, or a plain text file?",
    "1.3": "Clever ideas, set aside, and what \"portable\" means",
    "2.1": "Start naive: scan the file",
    "2.2": "A one-level index",
    "2.3": "Will the index fit in memory?",
    "3.1": "Two files break portability",
    "3.2": "A fixed-size header",
    "3.3": "Every file format is a header and sections",
    "4.1": "One copy per server?",
    "4.2": "Properties first, then technology",
    "4.3": "Boot, GET, and a database built from a file",
    "5.1": "A job on its own server",
    "5.2": "Why you can't edit in place",
    "5.3": "Merge, as in merge sort",
    "6.1": "Same path, stale offsets, garbage",
    "6.2": "A new path, and a static meta.json",
    "6.3": "Polling, reactive, and still too complex",
    "6.4": "A reload is a boot: trigger a deployment",
    "6.5": "Why this matters: cold data you can still query",
    "7.1": "The problem, and how a magnetic disk works",
    "7.2": "Put: append, never seek",
    "7.3": "Delete: a put with a special value",
    "7.4": "Get: an in-memory map to the latest offset",
    "8.1": "What could go wrong?",
    "8.2": "File rotation",
    "8.3": "Merge and compaction",
    "8.4": "The sawtooth and its two knobs",
    "9.1": "Don't read until the newline",
    "9.2": "Detecting a torn write: CRC first",
    "9.3": "Is the header write atomic?",
    "10.1": "What we built: one map, many files",
    "10.2": "Bitcask, Riak and Uber",
    "10.3": "Bitcask vs LSM, and build it yourself",
    "11": "What to keep",
}

COMPONENTS = ["Prose", "Figure", "StepThrough", "AnimationClip", "RuleBox", "PauseAndThink", "TradeoffTable",
              "MarginNote", "SourceNote", "CodeBlock", "ForwardChip", "RecallQuestions", "AboutThisClass", "NotationKey"]

ROWS = r"""
L-0001|about|AboutThisClass|||Opening line: week 5 day 2 continues storage engines; two problem statements that build foundational blocks for new systems and for getting the most out of existing ones. Board agenda: word dictionary without any DB, superfast KV store.
L-0002|about|AboutThisClass|||Both systems are used in production to a huge extent; not theoretical.
L-0003|1.1|Prose|1.1:Figure||Opening problem: build a word dictionary with no traditional database (no MySQL, Postgres, MongoDB, Redis, Elasticsearch, Memcache); be creative. Top of Fig 1·a.
L-0004|1.1|Prose|1.1:Figure||'Quote-unquote' scalable on storage and API sides, within obvious constraints. Requirement card line.
L-0005|1.1|Prose|||Any system design splits into storage and compute (API servers vs where the data lives).
L-0006|1.1|Prose|1.1:Figure||High response time acceptable: performance is not today's problem; caching and batching are known tricks from past sessions.
L-0007|1.1|Prose|1.1:Figure;1.1:ForwardChip||Portability required; the page flags each design that breaks it (margin tag 'one file'); its importance becomes clear in the next system and next week (chip 'coming later · week 6').
L-0008|about|AboutThisClass|||The problem statement was deliberately compiled to touch many building blocks used day in and day out.
L-0009|1.1|Prose|1.1:Figure||Standard English dictionary, mostly read-only (Oxford rarely changes).
L-0010|1.1|Prose|1.1:Figure;5.1:Prose||Weekly changelog (Sunday) with only changed words and meanings, applied to the store; restated at the start of chapter 5 (only the changelog arrives, not the whole dictionary).
L-0011|1.1|Prose|1.1:Figure||Single-word lookup, no autocomplete, unknown word -> 404.
L-0012|1.1|Prose|1.1:Figure||1 TB, 170,000 words.
L-0013|1.1|Prose|1.1:Figure||Four axes: storage, query, portability, seamless updates; Fig 1·a draws them as tabs.
L-0014|1.2|Prose|||First proposal: text file or JSON file.
L-0015|1.2|Prose|||Querying JSON means unmarshalling, which is expensive, so the text file is preferred.
L-0016|1.2|Prose|||JSON must be read and deserialized whole; no direct access to one entry; really costly at 1 TB. Left as taught (simplified/low) + optional A-D-15 (JSON Lines streams but has no index) as a separate sourced sentence.
L-0017|1.2|Prose|1.2:Figure||So: a simple text file. Fig 1·b shows 'JSON file' struck out.
L-0018|1.2|Prose|||Idea raised and not taken up: write the file like a log of updates; the format settled on word, meaning.
L-0019|1.2|Prose|1.2:Figure||CSV-like format, one line per word: 'apple,a fruit', then 'amazon, ...'.
L-0020|1.2|Prose|||Tempting: allow the same word twice for updates; in fact no duplicates (text editor readability, portability).
L-0021|1.2|Prose|||Added requirement: no repetitive entries.
L-0022|1.2|Prose|5.3:Prose||Planted question 'will you keep it sorted?': no for starters, accepted; the page marks it 'we come back to this' and closes it in 5.3.
L-0023|1.2|Prose|||B-trees deferred: discovering the design step by step makes it stick.
L-0024|1.1|Prose|1.1:Figure||Requirement: searchable by key; a key-value store, word -> two- or three-line meaning.
L-0025|1.1|Prose|1.1:Figure||Read-heavy: 1000:1 and more skewed than that.
L-0026|1.1|Prose|||Single-word update must not boil the ocean, but a weekly batch makes one big pass acceptable.
L-0027|1.3|Prose|||Ideas set aside: sort by key for efficient search (left open; the design goes another way first, sorting returns in 5.3).
L-0028|1.3|Prose|1.3:ForwardChip;1.3:Figure||Ideas set aside: shard into many sorted files and route a word to its file (yesterday's routing); kills portability. Back-chip Lecture 9 (routing a key to its node). Fig 1·c fan of files with red X.
L-0029|1.3|Prose|1.3:Figure||Definition: portability = literally one file holding everything needed to read and write it, easy to copy and ship. Optional A-D-09 (SQLite single file) as sourced sentence. Margin tag 'one file'.
L-0030|1.3|Prose|1.3:Figure||Zip of hundreds of folders as 'one file': rejected, you must extract it. Inline clarification (imprecise/low): still many logical, compressed files, no direct byte-offset read; + A-D-10 (ZIP central directory).
L-0031|1.3|Prose|||The one-file rule is not random: foundation for hundreds of systems; reason clear at the end.
L-0032|1.3|Prose|||Logical partitions in one sorted file with a header of key ranges: complex enough to touch later.
L-0033|1.3|Prose|||Parquet/Avro-style record encoding: not today, keep it simple; the points will be incorporated without Parquet.
L-0034|1.3|Prose|1.3:RuleBox||The simpler direction is deliberate so base concepts of anything queryable come clear. RuleBox §1 body.
L-0035|1.3|Prose|1.3:SourceNote|SN-01|What this simulates: upload a CSV to S3 and query it with Athena; Athena 'creates an index kept with the file' (01:46:23). SN-01: Athena scans, billed per TB, partitioning/Parquet cut the scan (A-D-11).
L-0036|1.3|Prose|||The dictionary simulates how such an engine's builders would query simple files, at a smaller scale; many other applications. Left as taught (simplified/low); SN-01 sits just above.
L-0037|1.3|Prose|||Lucene compared: tokenizes, doc IDs against keys, one big index file; kept one level down. Inline clarification (imprecise/low) + A-D-16: segments, segments_N, compound .cfs.
L-0038|2.1|Prose|||Tempting: binary search, offsets as indexes, B+ tree pages, 8 KB blocks, 1000 keys in memory; over-engineering for this. Optional A-FFD-08 (8 kB pages are real, matter when the index exceeds RAM).
L-0039|2.1|Prose|||No reason to limit memory to 1000 keys; far more fit (anticipates the 1.75 MB estimate).
L-0040|2.1|Prose|1.3:RuleBox||Keep it very simple: that is where the power and beauty of the system show. RuleBox §1 headline; restated in 2.1 against the B+ tree idea; heuristics card §11.
L-0041|2.1|Prose|2.1:Figure||Naive design: one CSV text file, key then its gigantic meaning.
L-0042|2.1|Prose|2.1:Figure||Naive lookup: read line by line until the key, read the meaning, return.
L-0043|2.1|Prose|||A linear scan per read is very expensive for a read-heavy app.
L-0044|2.1|Prose|2.1:Figure;2.2:AnimationClip||Worst case 1 TB, average 0.5 TB = 500 GB per request. Fig 2·a labels; clip l10-scan-vs-index beat 1.
L-0045|2.1|Prose|||Slow, degrades disk, wears sectors. Inline clarification (imprecise/low): wastes throughput and pushes drives past rated workload (Seagate).
L-0046|2.1|RuleBox|2.1:Prose||RuleBox §2: whenever reads are slow, think indexing. Left as taught (simplified/low); the lecture itself names caching and batching (1.1). Reused in 7.4 for the KV store's get.
L-0047|2.2|Prose|2.2:Figure||A small one-level index over the data file avoids scanning it.
L-0048|2.2|Prose|2.2:Figure||Index entry = key + offset (student offered offset and name; the class settled on key and offset).
L-0049|2.2|Prose|2.2:Figure||Offset = byte position where the line starts. Q&A 03:01:39 folded in: bytes, not line numbers. Page uses real byte offsets (apple 0, amazon 14).
L-0050|2.2|Prose|2.2:AnimationClip||Read path with a separate index file: scan index to key, take offset, read one data line. Clip beat 2.
L-0051|2.2|Prose|||Scanning the index is still linear but far cheaper (keys + small offsets vs huge meanings); file IO is sequential. Left as taught (simplified/low); offset width corrected by SN-02 in 2.3.
L-0052|2.3|Prose|||Estimate the index size before deciding how to read it.
L-0053|2.3|Prose|||Tempting: A-Z index of 26 entries; in fact you still scan the letter, and the full index fits anyway.
L-0054|2.3|Prose|2.3:Figure||Entry size = key length + offset length.
L-0055|2.3|Prose|2.3:Figure||Average word ~4.3 chars, computed by the instructor from a downloaded dictionary. Inline clarification (imprecise/low) + A-D-02: 4.8 in running text, ~7.6 across distinct words.
L-0056|2.3|Prose|2.3:SourceNote;2.3:Figure|SN-02|Offset is a 4-byte integer. SN-02 + A-D-01: 1 TB needs 8-byte offsets; index still a few MB. Fig 2·c second row in red/green.
L-0057|2.3|Prose|2.3:Figure||+2 for comma and newline: 4.3 + 4 + 2 = 10.3 B per entry.
L-0058|2.3|Figure|2.3:Prose||Fig 2·c calculator: 170,000 x 10.3 = 1,751,000 B = 1.751 MB (arithmetic checked). Left as taught (simplified/low); SN-02 gives the 8-byte variant (~2.4 MB); A-FFD-07 MB vs MiB.
L-0059|2.3|Prose|||1.75 MB fits in RAM easily: 'peanuts' next to 1 TB.
L-0060|2.3|Prose|2.1:RuleBox||Number crunching is very important: huge-looking data, MB index. RuleBox §2 body; heuristics card §11.
L-0061|2.3|Prose|||Keep index on disk, load into an in-memory hash map at server start; request -> map -> offset -> read line -> answer.
L-0062|2.3|Prose|||One number crunch made it much better: one level of indexing, no over-complication.
L-0063|2.3|Prose|2.2:AnimationClip||No scan left: one pointed read per lookup; storage and query settled. Clip end state.
L-0064|3.1|Prose|||Two files (index, data.dictionary) break portability; must become one file. Opening problem of chapter 3.
L-0065|3.1|Prose|3.1:TradeoffTable||Tempting: rebuild the index at every start; rejected (full scan each boot, file changes weekly). T1 column.
L-0066|3.1|Prose|3.1:Figure||Concatenate index and data into one file; raises 'where does the index end?'.
L-0067|3.1|Prose|3.1:TradeoffTable||Separator line: good but improvable; superseded by a byte offset in the header. T1 column (red X cell).
L-0068|3.1|Prose|3.1:TradeoffTable;3.1:Figure||Fixed 2 MB index region: 'very nice hack', slightly wasteful; be frugal. T1 column; boxed 2MB in Fig 3·a.
L-0069|3.1|Prose|3.1:TradeoffTable||Data top-down, index bottom-up like a stack: still need the boundary; the gap is wasted. T1 column.
L-0070|3.1|Prose|||Why the reader must know where to stop: data lines would load into the map as entries (apple -> 'fruit').
L-0071|3.1|Prose|||Reserve a position at the start for boundary info: interesting, refined into the header.
L-0072|3.2|Prose|3.1:TradeoffTable;3.1:PauseAndThink||Store the byte offset at the start of the file; no separator; reader reads that first chunk. T1 last column; P2 reveal.
L-0073|3.2|Prose|||Header = classic mechanism of PNG, JPG, MP3, AVI: first bytes carry meta information. Left as taught (simplified/low) + A-FFD-04 (directory at the end in ZIP/MP4) as separate sourced sentence.
L-0074|3.2|Prose|||One file, several sections, so the header describes each.
L-0075|3.2|Prose|3.2:CodeBlock||The header must be fixed size.
L-0076|3.2|Prose|3.2:CodeBlock;3.2:Figure||Field 3: index size (4 B); alternatively a data start offset. Q&A 03:02:20 folded in: the size of the index in the same file, not a path.
L-0077|3.2|Prose|3.2:CodeBlock;3.2:Figure||Field 1: 8-byte name, OUR_DICT (page uses the 8-byte board spelling).
L-0078|3.2|Prose|||PNG's first bytes say PNG. Inline clarification (imprecise/low) + A-FFD-01: the 8-byte PNG signature.
L-0079|3.2|Prose|||The instructor's own database name (AODB on the board) in its first bytes; his decoder would recognise it. No personal name.
L-0080|3.2|Prose|3.2:CodeBlock;3.2:Figure||Field 2: 4-byte version; variants (index first vs data first); decoder acts on it.
L-0081|3.2|Figure|3.2:Prose;3.2:CodeBlock||Fig 3·b: 16 B = 8 + 4 + 4. A-FFD-02 (byte order of header integers) as sourced sentence.
L-0082|3.2|StepThrough|3.2:Prose||Fig 3·c 'Opening the file': read 16 B, check name, version, read index-size bytes into a hash table; the rest is data.
L-0083|3.3|RuleBox|3.3:Prose||RuleBox §3: compartments + a header saying where each lies = any custom file format; the dictionary is now shippable, one file because of the one constraint.
L-0084|3.3|Prose|||JPG frames; MP4 header says where video and audio parts are. Left as taught (simplified/low).
L-0085|3.3|Prose|||A file with a header ships easily; anyone with the decoder can read it.
L-0086|3.3|Prose|3.3:Figure||Parquet has headers and information too. Inline clarification (imprecise/low) + A-FFD-03: metadata in a footer after PAR1.
L-0087|3.3|Prose|||JSON has no header: read all, parse braces and quotes into memory first. Left as taught (simplified/low).
L-0088|3.3|Prose|||CSV usually has no header; PPT and PDF do; define your own. Inline clarification (imprecise/low) + A-FFD-05 (RFC 4180 optional column-name line).
L-0089|3.3|MarginNote|||'Where the instructor learned this': he once tried to write his own image format. Unverifiable: attributed as his experience.
L-0090|3.3|Prose|||Every format has an encoder and a decoder.
L-0091|3.3|Prose|||'This browser does not support TIF' = no decoder for those bytes. Optional A-FFD-06 (only Safari shows TIFF natively, Oct 2026).
L-0092|4.1|Prose|||Recap and transition: formats, portability, headers, indexing done; now infrastructure from a seed design.
L-0093|4.1|Prose|4.1:Figure;4.3:Figure||LB in front of a bunch of API servers.
L-0094|4.1|Prose|4.3:Figure||GET /word; the LB forwards to one instance.
L-0095|4.1|Prose|||Proposal: shared disk storage read by every server; credited when the class converges on a central place.
L-0096|4.1|Prose|4.1:PauseAndThink;4.1:Figure||Copy per server -> 'updates tedious': not a problem yet, updates are one weekly bulk job. P3 wrong choice.
L-0097|4.1|Prose|4.1:PauseAndThink;4.1:Figure||Partial update -> inconsistency: valid but not a problem yet, meanings barely change. P3.
L-0098|4.1|Prose|||Think through the alternatives' disadvantages before proposing.
L-0099|4.1|Prose|4.1:PauseAndThink;4.1:Figure||Biggest pain: cost of duplicated storage (board 'COST !!'). P3 reveal.
L-0100|4.1|RuleBox|4.1:Prose||RuleBox §4: bare minimum at bare minimum cost; cost-efficiency first. A-FFD-09 (Well-Architected cost pillar) as sourced sentence. Heuristics card §11.
L-0101|4.1|Prose|||Throw money: 1 TB RAM per machine, no index, not cost effective.
L-0102|4.1|Prose|4.1:Figure||100 servers x 1 TB SSD = 100 TB redundant.
L-0103|4.1|Prose|||So keep the dictionary in one central place.
L-0104|4.2|Prose|||Proposal: one file on Amazon S3, cheap, built for blobs.
L-0105|4.2|Prose|||Get-object with a byte range: fetch header/index bytes, then one word's range. A-D-03 (HTTP Range header) as sourced sentence.
L-0106|4.2|Prose|||Pin the core properties first, then pick the technology. Heuristics card §11.
L-0107|4.2|Prose|||Shared storage because replication is cost-inefficient; what servers share is the network.
L-0108|4.2|Prose|4.2:SourceNote|SN-03|'Any block storage or database'; DBs ruled out, so block storage such as S3. SN-03 + A-D-12: S3 is object storage (EBS block, EFS file).
L-0109|4.2|Prose|||Design assumed a normal disk (header, index, random reads); replacement storage must support that.
L-0110|4.2|Prose|4.3:Figure||Network attached storage with file-system semantics. Inline clarification (imprecise/low): networked storage with (offset, length) reads: NAS, HDFS or an object store.
L-0111|4.2|Prose|4.3:Figure||Bare minimum: random reads (file, offset, n). Board note on Fig 4·b.
L-0112|4.2|Prose|4.2:SourceNote|SN-04|S3 gives file-system-level semantics (n bytes at an offset). SN-04 + A-SSE-10: ranged reads yes, but object store; whole-object writes, no in-place edits; one range per GET.
L-0113|4.2|Prose|||S3 not special: HDFS, network hard disks in a DC (Dell); S3 because everyone knows it. Optional A-D-17 (HDFS positioned reads).
L-0114|4.3|Prose|||Each server needs the S3 path, as static config for now; deployment still to discuss (6.2, 6.4).
L-0115|4.3|StepThrough|4.3:Prose||Fig 4·c steps 1-4: config path -> 16-byte header read -> index read -> in-memory hash table -> serve. Restated in 6.1 for the garbage example.
L-0116|4.3|StepThrough|4.3:Prose||Fig 4·c steps 5-7: GET -> map; absent 404; present -> ranged read at offset (S3, HDFS, network disks support it).
L-0117|4.3|Prose|4.3:Figure||Pointed reads of one record without reading the file = effectively a database ('magical'). Left as taught (simplified/low): read-only KV store with point lookups. 'Pointed Read' label.
L-0118|4.3|ForwardChip|||Chip 'later in this lecture: 6.5' for applications of pointed reads on S3.
L-0119|5.1|Prose|||Last big piece: seamless updates. Opening line of chapter 5.
L-0120|5.1|Prose|5.1:Figure||Periodic (cron) job on a separate machine: update dictionary and index, repackage, upload.
L-0121|5.1|Prose|||Batch job vs periodic job. Inline clarification (imprecise/low): a batch job triggered on a schedule (cron job); Kubernetes CronJob source.
L-0122|5.1|Prose|5.1:Figure||Job runs on a new server holding the changelog and the downloaded dictionary.
L-0123|5.1|Prose|||Bump the header version? Last step; and it is a format version, not a data version.
L-0124|5.1|Prose|5.3:TradeoffTable||Tempting: append changelog at end (file unsorted); in fact ever-growing with duplicates. T2 column.
L-0125|5.1|Prose|||Iterate and replace changed entries: 'is it really that simple?' leads to 5.2.
L-0126|5.1|Prose|||Compare hashes / generate a diff: unnecessary; the changelog is the diff.
L-0127|5.1|Prose|6.3:Prose||Easy to build complex systems, very hard to build simple ones; restated at 01:36:42 against a one-server-at-a-time proposal (6.3). Heuristics card §11.
L-0128|5.2|Prose|5.3:TradeoffTable||Tempting: use the index offset and replace apple's line in place. T2 column.
L-0129|5.2|StepThrough|5.2:Prose;5.2:PauseAndThink||Fig 5·b step 1: 'apple, a fruit' then 'ball, a round object'; new meaning 'a round fruit'; does ball move down? P4 question.
L-0130|5.2|StepThrough|5.2:Prose;5.3:TradeoffTable;5.2:PauseAndThink||Fig 5·b step 3: bytes are overwritten blindly; the longer meaning runs into ball. P4 reveal; T2 red X cell.
L-0131|5.2|Prose|||IDE analogy: lines move down in memory, not on disk.
L-0132|5.2|Prose|5.2:StepThrough||So 'I'll replace the entry' overrides existing data. Fig 5·b step 4.
L-0133|5.2|Prose|||Imagine the code you would write; that reveals what breaks.
L-0134|5.2|Prose|||Three hats: product manager, architect, engineer; this is the engineer hat.
L-0135|5.2|Prose|5.3:TradeoffTable||Graveyard entries + compaction rejected: no repeats; weekly batch, build clean. Page notes it returns in §8 for live writes. T2 column.
L-0136|5.3|Prose|||Proposal (called naive): new file, write the change where it belongs, append the rest.
L-0137|5.3|Prose|5.3:TradeoffTable||Not naive: merge step of merge sort, best approach here. T2 winning column.
L-0138|5.3|Prose|||No B+ trees: simple is efficient; complexity has costs.
L-0139|5.3|Prose|||The dictionary must be sorted for an efficient merge; Q&A 03:03:31 folded in (sorting came in with the merge). Closes the planted question from 1.2. Left as taught (simplified/low).
L-0140|5.3|Prose|5.3:Figure||Merge the existing sorted dictionary and the changelog into a new file.
L-0141|5.3|Prose|||Changelog is small: sort it in memory and dump if unsorted.
L-0142|5.3|Prose|||Classic merge of two sorted lists/arrays into a third.
L-0143|5.3|CodeBlock|5.3:Prose;5.3:AnimationClip||Merge loop pseudo-code: pointer per file, write smaller, advance; on match write changelog meaning, advance both. Clip l10-sorted-merge beats.
L-0144|5.3|Figure|5.3:AnimationClip;5.3:Prose||Fig 5·c (D-08): a..h + c'', e', f'' -> merged; changelog exhausted -> rest follows. Clip l10-sorted-merge data.
L-0145|5.3|Prose|5.3:AnimationClip||Streams line by line into a third file; never loads the file into memory.
L-0146|5.3|RuleBox|5.3:Prose||RuleBox §5: never write in place; always write new entries into a new file. Heuristics card §11.
L-0147|5.3|Prose|||1 TB in and out: job server needs >= 2 TB disk; fine for one server.
L-0148|5.3|Prose|||Merged file is complete with new header and index, sorted; Q&A 03:03:07 folded in (index size changes, header rebuilt).
L-0149|6.1|Prose|||Proposal: upload to a new S3 path, swap the pointer, worry about downtime. A-D-06 (multipart upload for 1 TB) as sourced sentence.
L-0150|6.1|Prose|||Same proposal framed as deployment: a rolling upgrade of the single file won't work; switch A to B with a canary. Student's doubt is about the file, not server rollout.
L-0151|6.2|Prose|||Chosen transition: parallel setup; new file at a new path while the old serves, then servers move over.
L-0152|6.1|Prose|6.1:PauseAndThink||The probe: why a new path? Same path avoids telling servers. P5 question.
L-0153|6.1|Prose|||Answers: short unserved window; rollback plan if upload fails/corrupts. Inline clarification (imprecise/low, verifier override from medium): S3 overwrites are atomic; you lose the old copy unless versioning.
L-0154|6.1|Prose|||Upload to temporary storage, validate, then mark live.
L-0155|6.1|Prose|||Drawing boxes is easy; upload details and 'do users see garbage?' are the critical part.
L-0156|6.1|Prose|||A simple-looking problem still unconverged after 1.5 hours; building blocks for other systems.
L-0157|6.1|Prose|6.1:PauseAndThink||Same-path problems: upload may fail, file may corrupt, servers must reload (offsets no longer match). Left as taught (simplified/low) + A-D-05 (atomic overwrite; real danger is stale offsets) as separate sourced sentence.
L-0158|6.1|StepThrough|6.1:PauseAndThink;6.4:AnimationClip||Fig 6·a: apple @100, 1024 B; same-path upload; same read returns another word mid-line: garbage. P5 reveal; clip l10-garbage-vs-rolling left lane.
L-0159|6.1|Prose|6.1:StepThrough||Until all servers reload, users see garbage: very poor UX.
L-0160|6.1|Prose|6.3:Figure||Prepared notes option 1: periodic pull of the index; garbage between the S3 change and the next pull; graceful reload. Fig 6·c panel 1.
L-0161|6.2|Prose|6.2:Figure||Version the file name: s3://word-dictionary/dictionary1.dictionary -> dictionary2.dictionary; open question: how do servers learn it.
L-0162|6.2|Prose|||Putting an IP or anything in the path changes nothing; the new path still has to reach the servers.
L-0163|6.2|Prose|||Set aside: invalidate command to every server; too complex.
L-0164|6.2|Prose|6.3:TradeoffTable||Set aside: switch at the job's known time; unreliable (overrun, failed or corrupt upload). T3 column with the red X.
L-0165|6.2|Prose|6.2:Figure||Set aside: one file per word kills portability (D-11 inset, margin tag 'one file').
L-0166|6.2|Prose|6.3:TradeoffTable;6.2:Figure||Accepted: metadata file on S3 with the current path, updated on upload success; servers poll every 5-10 min and reload on change. T3 column.
L-0167|6.2|Prose|6.2:Figure||The metadata file's path must be static: the one place to look.
L-0168|6.3|Prose|||Why poll 5-10 min for a weekly job? Answer given: upload time unknown (S3 down Sunday, upload Monday); not accepted as a reason to poll.
L-0169|6.3|Prose|6.3:ForwardChip||Wherever there is polling, make it reactive. Back-chips: Lecture 5 (make systems reactive), Lecture 4 (Redis Pub/Sub).
L-0170|6.3|Prose|6.3:Figure||Reactive option: servers subscribe to Redis Pub/Sub; the job publishes when done. Fig 6·c panel 2.
L-0171|6.3|Prose|6.3:TradeoffTable||Pub/Sub too complex: another component, persistent connections just to hear 'changed'. A-D-07 (at-most-once) as sourced sentence. T3 column.
L-0172|6.3|Prose|6.3:TradeoffTable||Polling isn't bad, but why 5,000 requests when someone can tell you. T3 'requests wasted' row.
L-0173|6.3|Prose|||'latest' flag in the old file's header: you never learn it without polling.
L-0174|6.3|Prose|||Check the header version with the backend per request: still polling.
L-0175|6.3|Prose|6.3:TradeoffTable||A REST endpoint the job calls = same reactive approach as Pub/Sub. T3 'reload endpoint' column.
L-0176|6.3|Prose|||Register servers, upgrade one at a time, switch ports: 'complex, complex'; path already in meta.json.
L-0177|6.4|Prose|6.4:Figure||meta.json is static and holds the path; boot = read meta.json, read dictionary, build index, serve.
L-0178|6.4|Prose|6.3:PauseAndThink||Reload after meta.json changes = a deployment (hint at 01:37:06). P6 reveal.
L-0179|6.3|Prose|||Same path + S3 versioning: S3-specific, same as two files + pointer. A-D-13 (versionId in meta.json) as sourced sentence.
L-0180|6.3|Prose|6.3:TradeoffTable||updated_at in meta.json per request: still polling, and expensive. T3 'check per request' column.
L-0181|6.3|Prose|||updated_at in the dictionary file: garbage first, and text files carry no such metadata. Inline clarification (imprecise/low) + A-D-04: ETag/Last-Modified, If-Match -> 412.
L-0182|6.3|Prose|||Brainstorming rejected options shows why decisions are made.
L-0183|6.4|Prose|6.3:TradeoffTable;6.4:AnimationClip;6.4:Figure||Job uses the AWS SDK to trigger a rolling deployment; new servers read meta.json at boot. Q&A 03:00:19 folded in (out of the box from cloud providers). Optional A-D-14 (instance refresh). Clip right lane.
L-0184|6.4|Prose|6.4:AnimationClip;6.3:TradeoffTable||During the roll: inconsistent, never garbage (each server's index matches its file); eventually consistent; meanings don't change drastically. Clip end state; T3 'garbage possible?' row.
L-0185|6.4|Prose|6.4:RuleBox||Any deployment tool; one invocation replaces endpoints and Pub/Sub. RuleBox §6 body.
L-0186|6.4|Prose|||The instructor's prepared notes cover the same flow (changelog, merge, same path, transition, Pub/Sub, parallel setup, header). One line.
L-0187|2.3|MarginNote|||'The prepared notes' number': 171,476 words, 4.7 + 3 + 2x4, ~2.6 MB. Left as taught (simplified/low): arithmetic checks out; 8-byte caveat (SN-02) applies.
L-0188|6.5|Prose|||What was built: pointed GETs on S3 reading the bare minimum; huge applications.
L-0189|6.5|Prose|6.5:Figure||Amazon orders > 6 months -> S3, recent in MySQL; users can still look them up. Fig 6·e (D-12).
L-0190|6.5|Prose|||Can't just dump JSON on S3; you need pointed queries (order ID -> details).
L-0191|6.5|Prose|6.5:ForwardChip;6.5:Figure||Foundation of multi-tiered storage; data on S3 stays queryable. Q&A 02:58:29 folded in. Chip 'coming later · week 6' (tiered storage for Amazon orders).
L-0192|6.5|Prose|||S3 as cheap, not archival storage: time vs a big cut in hot-DB cost. Q&A 02:59:16 folded in (higher latency fine for infrequent reads; S3 storage cheap, calls not).
L-0193|6.5|Prose|6.5:Figure||Data lakes: huge data on very cheap storage, still queryable.
L-0194|6.5|Prose|||Apache Hudi table format and Hive partitions 'exactly this'. Inline clarification (imprecise/low): same idea (key -> file id indexes, partition layouts) + optional A-SSE-12.
L-0195|6.5|Prose|||Summary: from deciding to deploying, keep it simple. Chapter 6 hand-off to chapter 7.
L-0196|6.4|Prose|6.4:Figure||Order of steps (Q&A 01:47:56): merge -> upload to new path -> update meta.json -> trigger deployment. Fig 6·d numbers 1-4.
L-0197|6.4|Prose|||Q&A: better than a whole redeploy? Only startup reruns; reload endpoints possible but more complex.
L-0198|6.4|RuleBox|6.4:Prose||RuleBox §6: trigger a deployment; out of the box, same cost, no polling or Pub/Sub; we control our infrastructure. Heuristics card §11.
L-0199|6.4|Prose|||Alternative: send the 1.7 MB index itself in the update; no reload from S3.
L-0200|7.1|Prose|||Opening problem of chapter 7: super fast KV store on cheap magnetic disks, put/get/update/delete with full persistence; break teaser (O(1), used unknowingly).
L-0201|7.1|Prose|7.1:Figure||Storage hierarchy; SSDs closer to memory in speed and cost. Speed scale on Fig 7·a.
L-0202|7.1|Prose|||SSDs fast but costly; huge data lives on magnetic disks.
L-0203|7.1|Prose|7.1:Figure||Magnetic disk: a head moves across a spinning platter.
L-0204|7.1|Prose|7.1:Figure||Byte offset -> disk, sector, offset in sector.
L-0205|7.1|Prose|||Read: rotate, move the head, read, driver, user space; every other read needs another movement.
L-0206|7.1|Prose|||Mechanical movement is the most time-consuming part of disk I/O.
L-0207|7.2|Prose|||Only put/get/delete, but every put flushed immediately.
L-0208|7.2|Prose|||Tempting: memtable/SSTable sorted map in memory; rejected: persist immediately. Left as taught (simplified/low); SN-10 in 10.3 covers LSM's WAL.
L-0209|7.2|Prose|7.2:CodeBlock||Ledger-like file: every change appended at the end.
L-0210|7.2|Prose|7.2:Figure||Appending fits a magnetic disk: no seek, no rotational wait. Board 'Append only / Zero seek / Best we can do!!'. Left as taught (simplified/low).
L-0211|7.2|Prose|7.4:Figure;7.4:AnimationClip||Put K1 V1, K2 V2, K3 V3 appended in order. Fig 7·b rows; clip beats.
L-0212|7.2|Prose|||Remember where each key starts? Deferred to get (returns as the map in 7.4).
L-0213|7.2|Prose|7.3:RuleBox;7.4:AnimationClip||Update = append; old entry obsolete; 'no matter what'. RuleBox §7 headline.
L-0214|7.2|Prose|||Appending every put = max put performance on a cheap disk.
L-0215|7.3|Prose|7.3:ForwardChip;7.3:PauseAndThink||Tempting: overwrite K2's value with -1; append-only forbids it. Back-chip Lecture 3 (delete as expired_at = -1). P7 wrong choice.
L-0216|7.3|Prose|7.3:RuleBox||Append-only: random reads anywhere, writes only at the end (restated 02:12:18). RuleBox §7 body.
L-0217|7.3|Prose|7.3:PauseAndThink;7.4:Figure;7.4:AnimationClip||Delete = put with a special value: DEL K2 = PUT(K2, -1). P7 reveal.
L-0218|7.3|Prose|||Put is O(1), so delete is too.
L-0219|7.4|Prose|||Naive get: scan all entries, return the latest; very poor.
L-0220|7.4|Prose|||SSTable for get? A simple hash table; the two are very different.
L-0221|7.4|Prose|7.4:Figure;7.4:AnimationClip||In-memory hash table key -> offset of the latest entry (offset, not value), updated on every append.
L-0222|7.4|AnimationClip|7.4:Prose;7.4:Figure||Clip l10-append-only-log: append first, then point the key (K1->O1, K2->O2, K3->O3; K1 V1' -> O4).
L-0223|7.4|Prose|7.4:AnimationClip||Delete removes the key from the map; no entry = no key.
L-0224|7.4|Prose|||Get: map lookup; absent 404; present read at offset. Board 'GET(k) -> hash lookup, disk seek, disk read' (also in Fig 10·a).
L-0225|7.4|StepThrough|7.4:Prose||Fig 7·c 'Crash and rebuild': map lost, scan the file, rebuild; slow but fine.
L-0226|7.4|Prose|||get/put/delete each O(1), bare minimum, full persistence; same move as the dictionary index (2.3).
L-0227|8.1|Prose|||Slow restart lowers availability; accepted; ways to improve. A-SSE-01 (hint files) as sourced sentence.
L-0228|8.1|Prose|||All keys must fit in memory (keys, not values).
L-0229|8.1|Prose|||Nothing collected; the file grows until the disk is full. Board 'File grows huge!!!'.
L-0230|8.1|Prose|||Several files; scrub one no longer written (live keys only); becomes merge and compaction (8.3).
L-0231|8.2|Prose|8.2:Figure||Writes go to one file; the others become immutable.
L-0232|8.2|Prose|||Tempting: room for three files (write, read, build); in fact reads and writes hit the same files.
L-0233|8.2|Prose|8.2:PauseAndThink||Tempting: file size = disk / 2 or 3 (100 TB disk -> 10 TB files); more problems. P8 wrong choice.
L-0234|8.2|Prose|8.2:PauseAndThink||Huge files can't be indexed concurrently; smaller units make cleanup more even. P8 reveal.
L-0235|8.2|Prose|8.2:PauseAndThink||Biggest reason: file-system limits (BTRFS, NTFS). Inline clarification (imprecise/low): FAT32 caps at 4 GB, modern FS allow TBs; stronger reason is per-file merge/rebuild work. P8 reveal.
L-0236|8.2|Prose|8.2:PauseAndThink||Small files (100 MB or 1 GB), new file when crossed. A-SSE-03 (Riak default 2 GB) as sourced sentence. P8 right choice.
L-0237|8.2|Figure|8.2:Prose||Fig 8·a: files 001-004, exactly one active (yellow), the rest read-only but readable.
L-0238|8.2|Prose|8.2:Figure||Definition: file rotation, a new file each time the active one crosses its limit.
L-0239|8.2|Prose|8.2:Figure||Map stores file + offset per key (K1 -> f1, O4); page fixes the board's K3 -> f2 slip to f1.
L-0240|8.3|Prose|8.3:StepThrough||Rotated files hold stale (old K1) and deleted (K2) entries.
L-0241|8.3|StepThrough|8.3:Prose||Fig 8·b: merge and compaction while the active file takes writes; new file without dead entries; old files deleted.
L-0242|8.3|Prose|8.3:StepThrough||Offsets change, so the map is updated for every moved entry (prepared notes: 'atomically').
L-0243|8.3|Prose|8.3:CodeBlock||Not a merge-sort merge (unsorted): temporary hash table, newer replaces older, flush periodically. Contrast with 5.3.
L-0244|8.4|Figure|8.4:Prose;8.4:AnimationClip||Fig 8·c: sawtooth of disk usage; clip l10-sawtooth.
L-0245|8.4|RuleBox|8.4:Prose;8.4:AnimationClip||RuleBox §8: keep the sawtooth under the disk cap; shape sets merge frequency and performance; crossing crashes the system. Heuristics card §11.
L-0246|8.4|Prose|8.4:AnimationClip||Too often: GC steals CPU; too rarely: work piles up.
L-0247|8.4|Prose|8.4:Figure||Two knobs: merge frequency and file rotation threshold. Left as taught (simplified/low) + A-SSE-04 (real Bitcask merge triggers) as separate sourced sentence.
L-0248|8.4|Prose|||Tune by monitoring the sawtooth; expose both as config.
L-0249|8.4|Prose|||Standard approach, best on a cheap disk, almost as fast as SSDs. Inline clarification (imprecise/low): for writes; every get still costs a seek.
L-0250|8.4|Prose|||On SSDs the gain is smaller. Inline clarification (imprecise/low): flash can't overwrite in place either; optional A-SSE-17 (zoned SSDs).
L-0251|9.1|Prose|9.1:Figure||Files read by blocks; 'key value' too casual; a defined record format (even the dictionary was simplified).
L-0252|9.1|Prose|||Every database serializes to disk in its own record format.
L-0253|9.1|Prose|||Reading byte by byte until newline = one I/O per byte. Inline clarification (imprecise/low) + A-SSE-15 (page cache absorbs disk reads; still one call per byte).
L-0254|9.1|RuleBox|9.1:Prose||RuleBox §9: at any offset, know exactly how many bytes to read. Heuristics card §11.
L-0255|9.1|Figure|9.1:Prose||Fig 9·a: KSZ (4 B) + VSZ (4 B) before key and value.
L-0256|9.1|Prose|9.1:Figure||Two I/Os: 8-byte prefix, then key+value in one read; read predictability; like the dictionary header.
L-0257|9.1|Figure|9.1:Prose||Fig 9·b: the dictionary in the same format (word size, meaning size, word, meaning).
L-0258|9.2|Prose|9.2:StepThrough||Fault tolerance: crash mid-write corrupts the entry; know it, don't serve it.
L-0259|9.2|StepThrough|9.2:Prose;9.2:PauseAndThink||Fig 9·c step 3: reading VSZ bytes runs into the next record. P9 wrong-choice verdict.
L-0260|9.2|Prose|9.2:PauseAndThink||CRC over KSZ, VSZ, key, value, computed in memory. Left as taught (simplified/low). P9 reveal.
L-0261|9.2|Prose|9.2:SourceNote;9.2:ForwardChip|SN-05|CRC leftmost, first thing written and flushed; 'cannot' go at the end. SN-05: a convention (Bitcask, LevelDB), not a rule; any position works if the length is known. Back-chip Lecture 6 (timestamp leftmost).
L-0262|9.2|Prose|9.2:SourceNote|SN-05|Postgres commit log, MySQL binlog put CRC leftmost. SN-05 + A-SSE-07, A-SSE-08: both CRC every record, but elsewhere (Postgres end of record header, MySQL end of event).
L-0263|9.2|Prose|9.2:SourceNote|SN-06|Network formats put the CRC first. SN-06: frames carry checksums, often at the end (PPP FCS; TCP checksum mid-header).
L-0264|9.2|Figure|9.2:Prose;9.2:StepThrough||Final record: CRC, TS (conflicts), KSZ, VSZ, K, V (Fig 9·c last step). A-SSE-05 (Bitcask source order) as sourced sentence.
L-0265|9.2|StepThrough|9.2:Prose||Fig 9·c: write header part, then key, then value; first write fails -> no entry; later fails -> CRC mismatch -> 'corrupt'.
L-0266|9.2|Prose|||Recovery is heuristic: ignore the entry (e.g. in merge). A-SSE-06 (LevelDB skips and resyncs) as sourced sentence.
L-0267|9.2|Prose|||Question CSV-until-newline; use sizes, key, value and CRC. Heuristics card §11.
L-0268|10.1|Figure|10.1:Prose||Fig 10·a: map entry = file id, size, offset, timestamp; writes only to the active file.
L-0269|10.1|Prose|10.3:TradeoffTable;10.1:Figure||Main limitation: all keys in memory. T4 red X cell.
L-0270|10.1|Prose|||Very high write throughput, very low write latency.
L-0271|10.1|Prose|||I/O saturation of disk and network: nothing idle.
L-0272|10.1|Prose|||Easy backups: copy the files.
L-0273|10.2|Prose|||Reveal: it is Bitcask, an embedded database.
L-0274|10.2|Prose|||Embedded = a library, no server (SQLite). A-SSE-16 (SQLite serverless) as sourced sentence.
L-0275|10.2|Prose|10.2:SourceNote|SN-07|Uber uses Bitcask for its main ride-hailing service. SN-07: around 2015 Uber used Riak (default backend Bitcask) for parts of dispatch; core trips in Postgres then Schemaless.
L-0276|10.2|Prose|10.2:SourceNote|SN-07|Uber via Riak, a KV store with Bitcask as back end. SN-07 (historical, ~2015).
L-0277|10.2|Prose|||Riak : Bitcask = Elasticsearch : Lucene. Left as taught (simplified/low).
L-0278|10.2|Prose|10.2:SourceNote;10.2:Figure;10.2:ForwardChip|SN-08|Riak distributes Bitcask: 'master-slave', consensus, proxy, consistent hashing, mutually exclusive sets. SN-08 + A-SSE-14: masterless ring, N replicas, any node coordinates. Fig 10·b drawn corrected. Back-chip Lecture 9 (consistent hashing).
L-0279|10.2|Prose|||The append-only file is the magic behind Bitcask on commodity hardware.
L-0280|10.2|RuleBox|10.2:Prose||RuleBox §10: high throughput + persistence -> append-only file. Inline clarification (imprecise/low): heuristic; batching, group commit, relaxed sync too (Cassandra). Heuristics card §11.
L-0281|10.2|Prose|||Bitcask simple yet fabulous: integrity, record format, merge and compaction; usual Riak back end.
L-0282|10.3|Prose|||There is a Bitcask paper, a search away.
L-0283|10.3|MarginNote|10.3:Prose||'Project: build your own Bitcask'; not difficult, ~a week, surfaces devils (merge process, map updates); Q&A 02:51:06 folded in.
L-0284|10.3|Prose|||The instructor implemented Bitcask ~5 years ago and benchmarked it. Unverifiable: attributed as his experience.
L-0285|10.3|MarginNote|10.3:Prose||Monitor with Prometheus while running; spend a week or two (both said in class).
L-0286|11|ForwardChip|||Next week: high-throughput systems (S3, video encoding, YouTube views counting, one more DB), compute side. 'coming later · week 6'.
L-0287|11|ForwardChip|||Next Saturday: deep dive on S3 and its nitty-gritty. 'coming later · week 6'.
L-0288|10.3|Prose|10.3:SourceNote;10.3:TradeoffTable|SN-09|Bitcask vs SSTable: 'SSTables keep values in memory', also sorted (next week). SN-09 + A-SSE-13: only the memtable is in memory; SSTables are immutable sorted files; Bitcask keeps all keys in RAM.
L-0289|10.3|Prose|10.3:SourceNote;10.3:TradeoffTable|SN-10|Bitcask persists every write by default; memtable can lose data. SN-10 + A-SSE-02: LSM logs to a WAL first; Bitcask default sync=none leaves flushing to the OS.
L-0290|10.3|Prose|10.3:ForwardChip;11:ForwardChip||Bitcask taught first as the foundation; next week SSTable, memtable, LSM, counting. Chip 'coming later · week 6'.
L-0291|10.3|Prose|||Kleppmann's book starts its storage chapter with Bitcask (raised in class).
L-0292|10.3|Prose|||The instructor met Bitcask in a college storage paper-reading course. Unverifiable: attributed as his experience.
L-0293|7.2|Prose|7.2:CodeBlock||Q&A 02:46:31: open in append mode 'a'; don't preallocate; the FS lays out the file.
L-0294|7.2|Prose|||Q&A 02:48:26: FS (BTRFS, NTFS, ext) don't pack files back to back; growing is fine. Left as taught (simplified/low).
L-0295|8.3|Prose|8.3:StepThrough||Q&A 02:49:23: deleted keys skipped in the merge, never copied.
L-0296|8.3|CodeBlock|8.3:Prose;8.3:StepThrough||Q&A 02:50:13: merge via a separate in-memory hash table (replace on newer, remove on delete), flush as new file.
L-0297|9.3|Prose|||Pattern assumes header write is atomic; confirmed in class. Inline clarification (imprecise/low): not guaranteed; the CRC catches a torn header too.
L-0298|9.3|Prose|||Kernels and FS differ; header under block size assumed whole. A-SSE-09 (Postgres torn pages, full_page_writes) as sourced sentence.
L-0299|9.3|Prose|||~20-byte header will be written in practice. Left as taught (simplified/low).
L-0300|9.3|Prose|||Raised in class (open): paranoid systems use a separate WAL; this pattern is more performant.
L-0301|9.3|Prose|||Integrity is almost never covered in design overviews. Unverifiable: attributed as the instructor's view.
L-0302|9.3|Prose|||Ignore integrity and systems only seem to work. Unverifiable: attributed as the instructor's view.
L-0303|9.3|MarginNote|||'Go deeper: Postgres internals': Hussein Nasser's Medium posts; read after implementing Bitcask.
L-0304|9.3|MarginNote|||Surprise from those posts: pages for meta info vs data. Unverifiable: attributed as the instructor's impression.
L-0305|1.1|Prose|1.1:Figure||Q&A 02:56:05 moved up: 1 TB chosen deliberately to make copy-per-server too costly; imagine multimedia meanings.
L-0306|4.3|Prose|4.3:ForwardChip||Q&A 02:57:50: one S3 call per request is costly; in the real world you cache/tier; here only to show pointed reads. A-D-08 + A-SSE-11 (S3 latency, cache in front) as sourced sentences. Back-chip Lecture 2 (caching at every level).
L-0307|2.3|Prose|||Q&A 02:59:16: don't take MBs lightly; M = a million bytes. A-FFD-07 (MB vs MiB).
L-0308|6.4|MarginNote|||'From the instructor: reload by deploying': Pub/Sub and reload APIs first, then just a deployment. Unverifiable: attributed as his experience.
L-0309|5.3|Prose|||Q&A 03:04:11: keeping 170,000 records sorted isn't complex; the merge produces the sorted file.
L-0310|5.3|Prose|5.3:AnimationClip||Q&A 03:05:04: both sorted -> output sorted -> next week's input; O(n) not O(n^2). Left as taught (simplified/low).
L-0311|5.3|Prose|||CS is obsessed with sorted data because it makes processes simple. Closes chapter 5's merge.
"""

SOURCE_NOTES = {
    "SN-01": ["L-0035"], "SN-02": ["L-0056"], "SN-03": ["L-0108"], "SN-04": ["L-0112"],
    "SN-05": ["L-0261", "L-0262"], "SN-06": ["L-0263"], "SN-07": ["L-0275", "L-0276"],
    "SN-08": ["L-0278"], "SN-09": ["L-0288"], "SN-10": ["L-0289"],
}

ADDITIONS = {
    "A-D-01": ("2.3", "SourceNote", "SN-02: 1 TB needs 8-byte offsets; index still a few MB (L-0056)."),
    "A-D-02": ("2.3", "Prose", "Inline on L-0055: 4.8 letters in running text, ~7.6 across distinct words."),
    "A-D-03": ("4.2", "Prose", "Sourced sentence with L-0105: GetObject takes an HTTP Range header."),
    "A-D-04": ("6.3", "Prose", "Inline on L-0181: ETag/Last-Modified; If-Match ranged GET fails with 412 instead of garbage."),
    "A-D-05": ("6.1", "Prose", "Sourced sentence with L-0157: S3 overwrite is atomic; the danger is stale offsets."),
    "A-D-06": ("6.1", "Prose", "Sourced sentence with L-0149: 1 TB needs multipart upload (single PUT max 5 GB)."),
    "A-D-07": ("6.3", "Prose", "Sourced sentence with L-0171: Redis Pub/Sub is at-most-once."),
    "A-D-08": ("4.3", "Prose", "Sourced sentence with L-0306: S3 latency 100-200 ms for latency-sensitive apps; cache in front."),
    "A-D-09": ("1.3", "Prose", "Optional, used: SQLite is one portable disk file (with L-0029)."),
    "A-D-10": ("1.3", "Prose", "Inline on L-0030: ZIP's central directory holds each member's offset."),
    "A-D-11": ("1.3", "SourceNote", "SN-01: Athena scans, billed per TB; partition/compress/Parquet (L-0035)."),
    "A-D-12": ("4.2", "SourceNote", "SN-03: block (EBS) vs file (EFS) vs object (S3) storage (L-0108)."),
    "A-D-13": ("6.3", "Prose", "Sourced sentence with L-0179: S3 versionId in meta.json pins each server to its version."),
    "A-D-14": ("6.4", "Prose", "Optional, used: EC2 Auto Scaling instance refresh launches new before terminating old (L-0183)."),
    "A-D-15": ("1.2", "Prose", "Optional, used: JSON Lines streams record by record but has no index (L-0016)."),
    "A-D-16": ("1.3", "Prose", "Inline on L-0037: Lucene segments, segments_N, compound .cfs."),
    "A-D-17": ("4.2", "Prose", "Optional, used: HDFS positioned reads (L-0113)."),
    "A-FFD-01": ("3.2", "Prose", "Inline on L-0078: the 8-byte PNG signature."),
    "A-FFD-02": ("3.2", "Prose", "Sourced sentence with L-0081: header integers need a fixed byte order (PNG big-endian, Parquet little-endian)."),
    "A-FFD-03": ("3.3", "Prose", "Inline on L-0086: Parquet metadata in a footer after PAR1."),
    "A-FFD-04": ("3.2", "Prose", "Sourced sentence with L-0073: ZIP and MP4 keep the directory at the end."),
    "A-FFD-05": ("3.3", "Prose", "Inline on L-0088: RFC 4180 optional column-name header."),
    "A-FFD-06": ("3.3", "Prose", "Optional, used: only Safari shows TIFF natively (Oct 2026), with L-0091."),
    "A-FFD-07": ("2.3", "Prose", "Sourced sentence with L-0058/L-0307: MB = 10^6 B vs MiB = 2^20 B."),
    "A-FFD-08": ("2.1", "Prose", "Optional, used: 8 kB pages are real; page trees matter when the index exceeds RAM (L-0038)."),
    "A-FFD-09": ("4.1", "Prose", "Sourced sentence with L-0100: cost optimization is a Well-Architected pillar."),
    "A-SSE-01": ("8.1", "Prose", "Sourced sentence with L-0227: hint files speed up startup."),
    "A-SSE-02": ("10.3", "SourceNote", "SN-10: Bitcask default sync_strategy none; o_sync per write (L-0289)."),
    "A-SSE-03": ("8.2", "Prose", "Sourced sentence with L-0236: Riak Bitcask rotates at 2 GB by default."),
    "A-SSE-04": ("8.4", "Prose", "Sourced sentence with L-0247: merge triggers 60% dead keys / 512 MB dead bytes, merge window."),
    "A-SSE-05": ("9.2", "Prose", "Sourced sentence with L-0264: Bitcask's source writes CRC, tstamp, ksz, vsz, key, value."),
    "A-SSE-06": ("9.2", "Prose", "Sourced sentence with L-0266: LevelDB skips corrupt data, resyncs at next block."),
    "A-SSE-07": ("9.2", "SourceNote", "SN-05: Postgres CRC-32C per WAL record (L-0262)."),
    "A-SSE-08": ("9.2", "SourceNote", "SN-05: MySQL binlog_checksum CRC32, last 4 bytes of the event (L-0262)."),
    "A-SSE-09": ("9.3", "Prose", "Sourced sentence with L-0298: Postgres torn 8 KB pages, full_page_writes."),
    "A-SSE-10": ("4.2", "SourceNote", "SN-04: one byte range per GET; concurrent ranged GETs (L-0112)."),
    "A-SSE-11": ("4.3", "Prose", "Sourced sentence with L-0306: tens-of-ms median latency for small requests; cache in front of S3."),
    "A-SSE-12": ("6.5", "Prose", "Optional, used: Hudi index maps record key to file id (L-0194)."),
    "A-SSE-13": ("10.3", "SourceNote", "SN-09: Cassandra commit log -> memtable -> immutable SSTables; 10 s sync window (L-0288)."),
    "A-SSE-14": ("10.2", "SourceNote", "SN-08: Riak ring, N vnodes per key, any node coordinates, no master (L-0278)."),
    "A-SSE-15": ("9.1", "Prose", "Inline on L-0253: the page cache serves nearby reads."),
    "A-SSE-16": ("10.2", "Prose", "Sourced sentence with L-0274: SQLite reads and writes its file directly, no server."),
    "A-SSE-17": ("8.4", "Prose", "Optional, used: zoned SSDs need sequential writes per zone (with L-0250 inline)."),
}


def main():
    placements = {}
    for line in ROWS.strip().splitlines():
        parts = line.split("|", 5)
        assert len(parts) == 6, line
        i, sec, comp, also, sn, note = [p.strip() for p in parts]
        assert sec in SECTIONS, (i, sec)
        assert comp in COMPONENTS, (i, comp)
        assert i not in placements, i
        al = []
        for a in filter(None, also.split(";")):
            s, c = a.split(":")
            assert s in SECTIONS and c in COMPONENTS, (i, a)
            al.append({"section": s, "component": c})
        p = {"section": sec, "component": comp, "also": al, "note": note}
        if sn:
            p["source_note"] = sn
            assert i in SOURCE_NOTES[sn], (i, sn)
        placements[i] = p
    for sn, ids in SOURCE_NOTES.items():
        for i in ids:
            assert placements[i].get("source_note") == sn, (sn, i)
    out = {
        "lecture": "lec10",
        "ledger": "lectures/lec10/ledger/ledger.jsonl",
        "sections": SECTIONS,
        "components": COMPONENTS,
        "placements": dict(sorted(placements.items())),
        "dropped": [],
        "source_notes": SOURCE_NOTES,
        "additions": {k: {"section": s, "component": c, "note": n} for k, (s, c, n) in ADDITIONS.items()},
        "additions_not_used": {},
    }
    (HERE / "placement.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"placement.json: {len(placements)} placed, {len(ADDITIONS)} additions")


if __name__ == "__main__":
    main()
