# Lecture 10 (lec10) storytelling rewrite: blind exam grade

Method: in step 1 a blind reader answered all 126 questions from `story/page_text.md` and the questions-only file, and nothing else (`story/blind_answers.json`). In step 2 the answers were graded against `qa/exam.json` and were not changed. Where the key repeats a lecture claim that the fact-check corrected, and the page carries the correction, the answer is graded against the key but the cause is CUT-OK (fact-check correction). The corrected claims are: the 4.3-letter word and 4-byte offset index estimate, sectors going bad, a header in Parquet, file-system size limits as the main reason for small files, CRC leftmost in Postgres/MySQL and network formats, Uber's main ride-hailing service, SSTables holding values in memory, the atomic header write, and Athena keeping an index.

## Score

| | count |
|---|---|
| correct | **96** |
| partial | 23 |
| wrong | 1 |
| missing (NOT ON PAGE) | 6 |
| **total** | 126 |

- Strict: **96 / 126 (76.2%)**
- Half credit for partials: **107.5 / 126 (85.3%)**
- The old long version scored 125/126 (99.2%), or 125.5/126 (99.6%) with half credit (`qa/exam_grade.md`). Its one partial was Q077, which the new page now passes: the reader rebuilt the procedure from chapters 5 and 6.

Causes of the 30 non-correct answers:

- CUT-OK: 24, of which 10 are fact-check corrections
- CUT-LOSS: 2
- PAGE-ERROR: 0
- READER-MISS: 4 (the page covers these and the blind reader missed them)

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q013 | AWS feature simulated; why not Parquet/Avro/Lucene | missing | CUT-OK (fact-check) | The key's "simulating Athena" was marked imprecise/medium (L-0035) and simplified (L-0036): Athena is a scan engine, not a point-lookup store. NOTES drops it deliberately. The "keep it simple" spirit survives in §1.2. |
| Q014 | Response to B+ trees/blocks/pages | partial | CUT-OK | Student proposal (L-0038, L-0040). The reader quoted §1.2's "simplest thing that meets the brief", which carries the verdict. |
| Q016 | Other harms of scanning 1 TB per read | partial | CUT-OK (fact-check) | The page keeps "eats the disk's throughput". The key's "sectors go bad" was marked imprecise (L-0045). |
| Q020 | 26-entry A-Z index | missing | CUT-OK | Student proposal (L-0053). The per-word index and the "fits in RAM" crunch make the point. Optional clause in §2.1 if wanted. |
| Q021 | Index-record size formula | partial | CUT-OK (fact-check) | Page: 1 + 7.6 + 8 + 4 = 20.6 B, which corrects 4.3 letters (L-0055) and the 4-byte offset. Key: 4.3 + 4 + 2 = 10.3. Same method. |
| Q022 | Index size and conclusion | partial | CUT-OK (fact-check) | 3.5 MB on the page vs the key's 1.75 MB (L-0058 simplified). Conclusion identical: peanuts, so it goes in RAM. |
| Q029 | Stack layout (data top, index bottom) objection | missing | CUT-OK | Student proposal (L-0069). §3.1 already rejects separator and fixed-region waste. |
| Q035 | JSON read in full vs Parquet | partial | CUT-OK (fact-check) | JSON side correct. "Parquet has a header" is imprecise: it uses a footer (L-0086). PDF/PPT header is L-0088, imprecise. |
| Q052 | Three hats of a good engineer | partial | CUT-OK | Listed as a tangent in NOTES. Its essence survives in §5.2: "picture the code you would actually write". |
| Q053 | Why tombstone-append-and-compact was rejected for the dictionary | partial | CUT-OK | Student graveyard proposal (L-0135). §5.1 gives the no-duplicates reason. "Weekly batch allows a clean rebuild" is carried by §6.4's hand-off ("writes came once a week, in one batch"). |
| Q059 | Student's deployment concern on same-path upload | wrong | READER-MISS | The reader answered with stale offsets. §6.1's last sentence carries the rollback concern ("nothing to roll back to"), and §6.3 has "point meta.json back". The key's "short unservable window" is imprecise (L-0153: S3 overwrite is atomic). No change. |
| Q065 | meta-file proposal; static or versioned path | partial | READER-MISS | The reader left out that servers poll it every 5-10 min, which is in the §6.2 table ("Poll meta.json ... every 5–10 min"). No change. |
| Q066 | Why poll every few minutes for a weekly job | missing | CUT-OK | Student Q&A (L-0168: S3 down Sunday, upload Monday). The table's "switches even if the job failed" carries the same unknown-timing point. |
| Q068 | Latest flag in header / per-request version check | missing | CUT-OK | Student proposals (L-0173, L-0174, L-0180, L-0181). NOTES lists them as cut tangents. |
| Q069 | Was the teacher against polling in principle? | missing | CUT-OK | L-0172. The page's "wasteful ... thousands of polls for one weekly change" matches the "why 5,000 requests" point. It never states "not against polling", but nothing on the page contradicts that. |
| Q070 | Prepared "Transitions" notes: three strategies, timeline | partial | CUT-OK | Board notes list (L-0160, L-0186). The page's table, its new-path section (= parallel setup) and Clip 6·1 (garbage until reload) cover the content but not the list. |
| Q072 | S3 versioning vs meta-file | partial | CUT-OK | Student Q&A (L-0179). NOTES cut "S3 versionId" as a tangent. |
| Q075 | Board's purple "Deploy" arrow | partial | CUT-OK | Board colour detail. The reader's guess (update job → API servers) is right in substance. §6.3 has "through the cloud provider's SDK". |
| Q080 | Real systems doing the same as the S3 dictionary | partial | **CUT-LOSS** | The page names only data lakes. Athena is correctly dropped (L-0035), but Hudi, which NOTES' spine plans ("data lakes/Hudi"), never reached the page. See fix 1 below. |
| Q081 | Alternatives to redeploying; why deploy anyway | partial | CUT-OK | Missing: "push the 1.7 MB index itself to the servers" (L-0199), a Q&A aside. The reload endpoint and why deploying wins are both on the page. |
| Q082 | What the second half promised | partial | CUT-OK | Admin preview. The overview's Build 2 paragraph carries most of it. |
| Q096 | Why one file can't grow forever; biggest reason | partial | CUT-OK (fact-check) | The key's "biggest: file-system size limit" is imprecise (L-0235). The page gives disk-full, parallel rebuild and per-file cleanup instead. |
| Q106 | CRC, coverage, why first, examples | partial | CUT-OK (fact-check) | The page corrects L-0261 (imprecise/medium), L-0262 (wrong) and L-0263 (wrong). Position is a convention: Bitcask/LevelDB put it first, Postgres/MySQL put it elsewhere. |
| Q108 | Handling partial writes | partial | READER-MISS | The reader gave "ignore it, never append after it" but left out §9.2's "If the first write fails, the entry doesn't exist; if a later one fails, the CRC won't match". No change. |
| Q113 | Bitcask in production; analogy | partial | CUT-OK (fact-check) | Uber's "main ride-hailing" was corrected to "parts of dispatch, via Riak" (L-0275, L-0276). The Elasticsearch:Lucene analogy (L-0277, simplified) is replaced by SQLite-vs-MySQL plus the per-vnode Bitcask, which carry the same relation. |
| Q115 | What to do with Bitcask; how to benchmark | partial | **CUT-LOSS** | "Build it in a week, read the paper" is there. The benchmark method was cut in NOTES 10e. See fix 2 below. |
| Q116 | Bitcask vs SSTables/memtables | partial | CUT-OK (fact-check) | The key's "SSTables keep values in memory; memtable loses data" is imprecise/medium (L-0288, L-0289). The page carries the corrected LSM sentence. |
| Q119 | Is the CRC/header write atomic? | partial | CUT-OK (fact-check) | The key says "the header will land". The fact-check says neither OS nor disk promises it (L-0297), and the page says a torn header fails the CRC. |
| Q122 | Point about "MB" | partial | CUT-OK | Trivia. The page keeps "MB = 10⁶ bytes" in Fig 2·c. |
| Q126 | Why keep it sorted; merge complexity | partial | READER-MISS | The reader gave a one-pass O(n+m) merge but left out "sorting didn't matter for lookups" and "output is next week's input", both in §5.3. The key's "else O(n²)" is simplified (L-0310), so it is rightly not on the page. No change. |

These were graded correct although the reader flagged `found: false`: Q011 (inferred from §1.1's weekly pass), Q047 (§4.3 "Look at what that is"), Q077 (procedure rebuilt from §5.1–6.3, which fixes the old version's only partial) and Q089 (§7.3 append-only contract).

## CUT-LOSS fixes (sentences to add)

1. **Q080, §6.4** (`c6-switch.mdx`), right after "Data lakes rest on the same idea.":
   "Table formats such as Apache Hudi build on it: they keep an index from each record key to the file that holds it, so huge data on cheap storage can be queried without scanning everything." (L-0194, using the fact-check wording; Athena stays out per L-0035.)
2. **Q115, §10.3** (`c10-name.mdx`), after "It takes about a week, and the details teach you the most: …":
   "Then benchmark it against an on-disk and an in-memory key-value store, on a hard disk and on an SSD, with Prometheus watching the machine, and see whether the disk's I/O saturates." (L-0285. Leave out the teacher's personal five-years-ago benchmark, L-0284, which is unverifiable.)

## PAGE-ERROR

None found in the graded items. Byte ranges in Fig 4·d (0-15, 16-3502015, 3502016-3502029) agree with the 16-byte header, the 3,502,000-byte index and apple's 14-byte line. The Clip 5·1 merge result matches Q056. Cosmetic only: the Fig 5·b caption ends with a double period ("holds the changelog..").

## What was lost

- **Student proposals and Q&A asides (14 CUT-OK, not counting fact-check corrections).** These are the A-Z index, the stack layout, B+ trees, three hats, graveyard entries, why poll weekly, the latest flag and per-request checks, "not against polling", S3 versioning, pushing the index, the board's purple arrow and transitions list, the "MB" remark, and the second-half preview. The story replaces each with the move that won. A learner following the chapters doesn't need the rejected ones.
- **Fact-check corrections work as intended (10 CUT-OK).** Every miss on the index arithmetic (20.6 B and 3.5 MB vs 10.3 B and 1.75 MB), CRC placement, the atomic header, file-system limits, Uber, LSM memory, Parquet's header, sectors and Athena is the page being right where the key repeats the original claim.
- **Two real gaps (CUT-LOSS):** Hudi as a real system built on the S3-index idea (planned in NOTES, never written), and the benchmark-it-yourself method that turns "I/O saturation" into something the reader can check. Each needs one sentence.
- **Reader misses (4):** Q059, Q065, Q108 and Q126 are all covered on the page. Nothing to change.

Net: two sentences recover both CUT-LOSS items, one in chapter 6 §6.4 and one in chapter 10 §10.3. Most of the drop from 125/126 is intended cuts of student back-and-forth and fact-check corrections, not missing ideas.
