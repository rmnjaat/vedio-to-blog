# Lecture 10 (lec10) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and `lectures/STORY_WRITER.md`; models lec03 (Lecture 6) and lec08 (Lecture 5). Review used: scratchpad `review/05-lec9-lec10.md`, Lecture 10 part. Source: `site/src/content/lectures/lec10.mdx` + `lec10/{s0-header,c1…c10}.mdx`.

## Chapters (words per built page: captions, code, tables, hidden pause and recall answers and page chrome included; SVG desc/labels excluded; counted with scratchpad `wc2.py` over `site.sh text`)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: old-orders hook, the toy brief (Fig 0·a), where you are (Lectures 9, 7, 3), two builds, what you'll be able to do | ~1,250 (incl. chapter list) | – |
| 1 | A terabyte of words, and no database. Where is apple? | 1,013 | About 6 min |
| 2 | Half a terabyte per lookup. What would tell you where apple starts? | 910 | About 5 min |
| 3 | Two files, and the brief said one. Where does the index stop? | 1,103 | About 6 min |
| 4 | A hundred API servers need the file. Where does it live? | 999 | About 6 min |
| 5 | Sunday's changelog arrives. Can you just rewrite apple's line? | 1,116 | About 7 min |
| 6 | The new file is ready. How does every server move to it? | 1,617 | About 9 min |
| 7 | Writes never stop, and the disks are cheap. Where does a put go? | 1,246 | About 8 min |
| 8 | A month later the disk is nearly full. What is filling it? | 1,344 | About 7 min |
| 9 | The power fails halfway through a 1 MB value. What does the next get return? | 1,040 | About 6 min |
| 10 | You built a database out of files. What is it, and what can't it do? (incl. same idea twice, what you can now do, 4 recall questions, course close) | 1,678 | About 9 min |

Total ≈ 13.3k counted this way (incl. overview chapter list and clip text); the old page was ≈ 34k.

**Spine.** Old orders are expensive in the hot DB and unqueryable as a dump on S3 → Build 1, the toy: 1 TB / 170,000 words, no DB, one portable file, weekly changelog, no duplicates, "sorted?" planted → JSON vs text; ideas set aside in one paragraph → scan = 500 GB per lookup → index of word → byte offset (clip) → pause: fits in RAM? → 170,000 × (7.6 + 8 + 2) ≈ 3 MB, hash map at boot → two files break portability → glue them: where does the index stop (pause) → 16-byte header, boot stepper → "you designed a file format" (PNG, encoder/decoder, TIF; Go deeper: directories at the end) → copy per server (pause: cost, 100 TB) → properties first: random read (file, off, n) → S3 object storage, ranged GET (Lecture 7 callback) → boot + GET stepper → a read-only KV store on S3 → Sunday: job server, append rejected → rewrite in place (pause) → apple runs into ball (stepper) → new file = merge sort's merge, sorted question answered (code + clip) → never write in place; 2 TB; new header → same path: S3 atomic but offsets stale (pause + stepper) → new path + static meta.json → table of notification options; Lecture 5's reactive Pub/Sub → hint: what happens at boot (pause) → rolling deployment, order of steps, clip, mixed never garbage, war story as experience → payoff: old orders, multi-tiered storage, data lakes/Hudi → hand-off: what if writes never stop? → Build 2: magnetic disk, append every put (Lecture 9 AOF callback), delete = put(−1) (pause; Lecture 3 callback), key → offset map = the dictionary's index again (clip), crash rebuild (stepper) → three weak spots, hint files → rotation (pause on file size, 2 GB default) → merge & compaction with a hash table, not chapter 5's two pointers (code + stepper) → sawtooth (clip), two knobs → torn write: sizes first (= the header idea per record; the dictionary's record) → pause: can sizes alone tell? → CRC, checked before trusting; position a convention → torn record stepper → header needn't be atomic → Bitcask: the RAM limit, strengths, embedded, Riak (masterless ring, vnodes: Lecture 9 callback), Uber dispatch, throughput heuristic, LSM in two sentences → same idea twice (figure + table + one sentence) → build it yourself, paper → what you can now do, recall → course close: one line per lecture and the question to keep asking.

## Figures

- **Added** `site/src/figures/lec10/so-far.tsx`: `SoFarStorage` (stages 0–9; desk 640 with "what it buys" column, phone 330), at the top of each chapter with the previous chapter's rows on a blue wash.
- **Kept**: TheBrief (now Fig 0·a in the overview), PlainTextFile, NaiveScan, OneLevelIndex, NumberCrunch, OneFileBoundary, HeaderBytes, OpeningTheFile, OneCopyPerServer, PointedReads, BootThenGet, JobServer, RunsIntoBall, OldIndexNewFile, PointerFile, ColdData, MagneticDisk, AppendOnly, CrashRebuild, FileRotation, MergeCompact, SizesFirst, DictRecord, TornRecord, OneMapManyFiles, RiakRing, TwoEngines. All five clips (scan-vs-index, sorted-merge, garbage-vs-rolling, append-only-log, sawtooth), text unchanged, so posters were not regenerated.
- **Fixed**:
  - NumberCrunch rewritten as one row with the true numbers: 170,000 × (7.6 + 8 + 2) = 2,992,000 B ≈ 3 MB (fact-check L-0055, L-0056); the "as taught" 4.3 / 4-byte row is gone.
  - Index size 1,751,000 → 2,992,000 in OpeningTheFile and BootThenGet (byte ranges 16-2,992,015 and 2,992,016-2,992,029).
  - OneFileBoundary: "2 MB" fixed region → "fixed" (the index is now ≈ 3 MB).
  - OldIndexNewFile desc: dropped "(the class’s round number)".
  - ColdData: "athena · data lake" → "same idea: data lakes", desc no longer names Athena (fact-check L-0035/L-0036).
- **Dropped from the page** (exports left unused in their files): LectureMarks, OneStepAtATime, OneFileNotFolder, ReadsSlowIndex, CompartmentsRule, HeaderOrFooter, BareMinimumRule, MergeColumns (the clip carries the merge), NeverInPlaceRule, TwoWaysChanged (replaced by a table), DeploySketch, UpdateEndToEnd (steps as one sentence + clip), AppendSketch, Sawtooth (the clip), SawtoothRule, RecordRule, ThroughputRule.
- **Deleted** `site/src/figures/lec10/s0-header-sofar.tsx` (nothing imports it). Old `s1-…s11-*.mdx` deleted; `s0-header.mdx` rewritten.

## Cut, and why

- Admin: agenda, week/day, next week's S3/YouTube/counting plan (there is no next lecture on this site), Postgres-internals blog recommendation, Prometheus detail kept as one clause.
- "More precisely" / SourceNote boxes: all folded into one correct statement each: 8-byte offsets and 7.6-letter words; S3 is object storage with ranged GETs; same-path S3 overwrite is atomic, the danger is stale offsets and no rollback; Riak is masterless with vnodes and a Bitcask per partition; Uber used Riak (Bitcask default backend) in parts of dispatch ~2015; LSM keeps only the memtable in memory; CRC position is a convention, checking it first is the rule; header atomicity not promised but not needed; "almost as fast as SSDs" → writes near sequential speed, one seek per get; SSD gain smaller but real.
- Claims dropped because the fact-check found them wrong or loose: Athena keeps an index (L-0035); network formats put the CRC first (L-0263); Postgres/MySQL put the CRC leftmost (L-0262, replaced by the correct placement); file-system size limits as the main reason for small files (L-0235); n² without sorting (L-0310); "SSTables keep values in memory" (L-0288); Riak master-slave (L-0278).
- Tangents: JSON Lines, Lucene segments, SQLite onefile, Parquet/Avro, PNG/Parquet byte order, CSV RFC 4180, PDF trailer, TIFF on MDN, MB vs MiB, the prepared notes' 2.6 MB, multipart upload limits, S3 versionId, ETag/If-Match, latest flag / per-request version checks / updated_at, one-server-at-a-time upgrade, AWS latency figures, Well-Architected quote, cron-vs-batch terminology, three hats (one clause survives as "think at the level of the implementation"), graveyard entries (one sentence), merge triggers (one clause), zoned SSDs, LevelDB resync, full_page_writes, Kleppmann, AODB.
- Kept but folded in: the 1 TB justification (chapter 1), "peanuts", the apple/ball overwrite, the sorted question planted and answered, the deployment war story (as "one engineer"), the benchmark story (as "one engineer"), the Bitcask paper, the implement-it push restored to the main text.
- Furniture: class timestamps, notation legend, rule boxes (none left; one bold rule sentence per idea), Check-yourself blocks per chapter (one set of 4 recall questions at the end), SectionEnd, ForwardChips.

## Incoming links

- `site/src/content/lectures/lec07/c9-a-box-dies.mdx:129` `lec="lec10"` (no sec) → unchanged (lecture overview). Its hand-off ("two storage engines… out of nothing but files… append-only files come back… in a much bigger role") matches the new opening and chapter 7.
- No other lecture links into lec10.

## Outgoing links (checked against current headings)

lec04 `s2-2` (billion users, 8 GB), lec09 `s2-1` (photos in S3), lec08 `s4-3` (reactive via Pub/Sub), lec07 `s9-3` (AOF), lec07 `s8-2` (consistent hashing), lec07 `s9-1` (virtual nodes), lec05 `s6-2` (delete as expired_at = −1); plain `<LectureLink>`s to every lecture in the course close.

## Self-check

- `pipeline/bin/site.sh build lec10`: ok (14 pages). `links lec10`: zero broken. `figures lec10`: ok at 360/390/768/1440, light + dark (the so-far phone labels were raised to 14 to pass).
- Screenshots: `lectures/lec10/story/shots/` (chapters 2 and 7, 390 + 1440, light + dark), no failures.
- Banned-phrase grep over the built lec10 pages (HTML incl. SVG desc) and over `page_text.md`: 0 hits (one "the classic" was reworded).
- Titles alone: no database, where's apple → where does apple start → where does the index stop → where does it live → can you rewrite apple's line → how does every server move → where does a put go → what is filling the disk → what does a torn write return → what is it and what can't it do. No title states an answer; "Bitcask" first appears in 10.2.
- Shared files: none changed.

## Open doubts

- Overall length ≈ 13k by this count, above the 8–12k target; chapters are all within 900–1,800.
- "Their keys don't have to fit in RAM" (LSM, 10.2) is an inference from the corrected L-0288 (only the memtable is in memory), not a ledger sentence.
- Lecture 9's hand-off is on disk as read; if it changes, re-check the overview's "Where you are" and 7.2's AOF callback.

## Revision 2 (review_facts.md F-01…F-14, review_reader.md top 10 + per-chapter items)

Words per built page (same count as above): overview 1,148 · 1: 920 · 2: 866 · 3: 1,038 · 4: 915 · 5: 1,027 · 6: 1,314 · 7: 1,233 · 8: 1,280 · 9: 1,117 · 10: 1,511 · **total 12,369** (was 13,318). Chapter 2 is 34 under the 900 floor; it was not cut further.

**review_facts, all applied:**
- F-01: merge code now keeps only records the map still points at (`live`), repoints only those. The paragraph after Fig 8·c and step 4 are replaced, and the MergeCompact desc is updated. The temporary table holds positions, not values (reader 8d).
- F-02: the index now stores the line's 4-byte length. The entry is 1-byte word length + 7.6 + 8-byte offset + 4-byte length = 20.6 B, × 170,000 = 3,502,000 B ≈ 3.5 MB. This updates Fig 2·c, §2.2, the §2.2 code (`f.read(length)`), the header/stepper index size, the Fig 4·d byte ranges, the so-far row and the 10.4 bullet. §4.2 says the map gives n.
- F-03: §9.2 now says the CRC failure makes the sizes untrusted, so a store never appends after a torn record; Bitcask opens a new file after a crash (paper cited). Fig 9·d step 4, the TornRecord desc and labels, the 10.4 bullet and recall 4 are updated.
- F-04: offset and length are stored as raw bytes in fixed-size slots with a word-length byte; the §3.2 code comment is updated.
- F-05: hint files are written by the merge, holding key + value position and size.
- F-06: the rollback sentence now says "unless the bucket keeps old versions".
- F-07: the Riak caption, desc and labels now say a Bitcask per partition (vnode).
- F-08: the optional wording is taken ("Unlike Bitcask, their keys don't all have to fit in RAM").
- F-09: Uber sentence reworded; Bitcask is named only as Riak's default backend.
- F-10: the CRC now covers everything after it, including the timestamp; recall updated.
- F-11: `"ab"`.
- F-12: Range labels have no thousands separators.
- F-13: "no waiting for the platter" removed.
- F-14: AODB label → "would start with its own name".

**review_reader, applied:**
- Fix 1, Build 2 situation and why S3 can't host it: the header Build 2 blurb, the hand-off at the end of 6.4 and the ch7 opening now say data written all day, each put on disk before the ack. S3 is ruled out because an object can't be appended to, only replaced whole (fact-check L-0112). Magnetic disks hold the huge data because SSDs cost too much (L-0202).
- Fix 2, one disk: 1 TB throughout ch8 (pause, wrong answer, opening, sawtooth).
- Fix 3: the read length (F-02); 6.1's "1,024 bytes long" and 10.1's size field now follow from the index, and 10.1 says why the size is there.
- Fix 4: the torn record (F-03); the timestamp is described as metadata for settling conflicts between versions of a key (ledger L-0264/L-0268).
- Fix 5: F-01.
- Fix 6, honest write speed:
  - 7.2 says reads seek once each and writes add none.
  - A new paragraph after the code says fsync per put caps writes at what the disk can persist, and that Bitcask's default leaves flushing to the OS (fact-check A-SSE-02, docs.riak.com).
  - 8.4 and 10.1 drop "close to sequential speed" and "very high throughput and very low latency" in favour of "as fast as the disk can persist them".
- Fix 7, course close: rewritten as one bullet per lecture after re-reading each `s0-header.mdx`.
  - Lecture 2 gets its own line (copies along the route, scaling, queues/streams, the lost clap, live claps).
  - Lecture 3 has both builds.
  - Lecture 4 adds database families.
  - Lecture 6 names both Flickr's central ticket servers and coordination-free Snowflake/Instagram, plus deep pagination.
  - Lecture 8 adds photo tags.
  - Lecture 9 adds CDC.
  - It closes on the old orders.
- Fix 8: §9.1 now argues for length prefixes from values that contain newline bytes (chapter 1's audio/video) and not knowing how much to fetch. Chapter 1 reconciles "two or three lines" with several MB per word through the audio/video framing (L-0305).
- Fix 9, repeats cut:
  - Fig 6·b stepper removed (pause + clip carry same-path garbage).
  - Fig 10·d TwoEngines removed (the table stays); `s11-keep-figs.tsx` deleted.
  - The 3 MB arithmetic is no longer in prose three times.
  - The second rejection of appending is gone from 5.2.
  - The "worth a habit" paragraph is folded into one sentence.
- Fix 10, spoilers and leaks:
  - The description no longer reveals Bitcask.
  - The ch2 summary and the "writes never seek" bullet are fixed.
  - ch7 no longer says "O(1)" up front.
  - Fig 3·b "were proposed" is gone.
  - "Sharper ideas come up fast", "The fourth idea is the interesting one", "a sorted map in memory" and "A lot of designs stop" are gone.
  - 5.3's rule is now "never overwrite a record in place when its size can change".
- Per-chapter fixes:
  - 1b: B+ tree cut.
  - 2a, 2d: done.
  - 2e: the 26-letter paragraph is cut.
  - 3a: the offset base is stated after the stepper.
  - 3b: the four ideas are compressed.
  - 3e: Go deeper cut.
  - 4c: trimmed.
  - 4d: "I, D" / "H, I, D" keys added to the captions.
  - 5d: "sort the dictionary once".
  - 5e: caption.
  - 5f: an S3 object can't be patched.
  - 6b: point meta.json back at dictionary1 and redeploy to roll back.
  - 6c, 6d, 6f: cut.
  - 6e: the failure row is removed and its point folded into the cost cell.
  - 7a, 7b, 7d (tombstone; the term appears in the ledger's L-0213 detail): done.
  - 8b, 8e: done.
  - 9e: done; the Go deeper on integrity is cut.
  - 10b, 10c: Elasticsearch/Lucene analogy cut.
  - 10e: the benchmark/Prometheus lines cut.
  - Two 10.4 bullets cut.
  - Chapter summaries shortened.

**Rejected or not done, and why:**
- 1c, 500 GB as time, and 4b, a price for 100 TB: no source in the ledger or fact-check, and the brief forbids invented numbers.
- Fix 1 / 8a, a write rate and a disk fill time: the ledger has no write rate, so Build 2 gets a situation but no rate. Ch8 keeps "a month" with one 1 TB disk.
- The reader's hand-off idea, tying Build 2 to the orders' hot side: the lecture doesn't support it.
- 6a, cut half the clip: a clip can't be half-cut, so the stepper went instead.
- Reader 10d, keep the figure: the table was kept because it has the two extra rows.

**Files:**
- `OldIndexNewFile` (s6a) is no longer imported; the file stays because `PointerFile` is used.
- Deleted: `s11-keep-figs.tsx`.
- Clip text is unchanged, so posters were not regenerated.

**Checks:**
- build: ok, 14 pages.
- links: zero broken.
- figures: ok at all widths, light and dark.
- Banned-phrase grep over `page_text.md` and the built lec10 HTML: 0.
- `page_text.md` regenerated.
- Screenshots of ch2 and ch9 in `shots/`: no failures.
- Shared files: none.

## Revision 3 (review_facts_final.md N-01…N-06, exam_grade.md CUT-LOSS)

- **N-01:** the dictionary's map now carries a length everywhere it is drawn or named.
  - §2.1 text.
  - Fig 2·b rows (desk `apple, 0, 14` …; phone compact `apple,0,14` … to fit the 112-wide file) and the label "keys + offsets + lengths only".
  - Fig 3·a and Fig 4·c captions.
  - Fig 3·d step 5 and its map labels (`apple → 0,14`, `amazon → 14,20`).
  - PointedReads and BootThenGet: "w → o, n", "map: apple → 0, 14", and the desc.
  - The so-far row, and the §10.3 table cell.
- **N-02:** the merge code is replaced with the exact text: the table stores `(file, offset)` and `live` is a list of `(k, pos)`. The Fig 8·c tmp rows are now `K1 → f2, O2`, `K2 → −1` (struck), `K3 → f1, O3`, `K4 → f2, O1`.
- **N-03:** recall 4's question and answer are replaced.
- **N-04:** the hand-off now says an object in an ordinary bucket can't be appended to, with the S3 Express exception (cited).
- **N-05:** the Bitcask paper is cited for hint-file contents.
- **N-06:** 10.1 now reads "writes add no seek of their own…".
- **CUT-LOSS:**
  - Q080: the Hudi sentence is added after "Data lakes rest on the same idea." in §6.4 (L-0194, as the fact-check words it, with hudi.apache.org cited).
  - Q115: the benchmark sentence is added in §10.3 (L-0285). L-0284, the personal benchmark, stays out.
- **Fig 5·b caption:** the double period is fixed.
- `figures/lec10/s1-dictionary-no-database-figs.tsx` is live: `TheBrief` is imported by `s0-header.mdx` and `PlainTextFile` by `c1-no-database.mdx`. It stays.
- **Checks:**
  - build: ok, 14 pages.
  - links: zero broken.
  - figures: ok at all widths, light and dark.
  - Banned-phrase grep over `page_text.md` and the built lec10 HTML: 0.
  - `page_text.md` regenerated.
  - Total ≈ 12,477 words by the same count.
  - No clip text changed, so no poster regeneration.
