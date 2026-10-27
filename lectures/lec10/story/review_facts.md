# Lecture 10 (lec10) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec10.mdx`, `lec10/{s0-header,c1…c10}.mdx`, the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec10/` (incl. `so-far.tsx`), and the on-screen text, leads and captions of the five clips
(`l10-scan-vs-index`, `l10-sorted-merge`, `l10-garbage-vs-rolling`, `l10-append-only-log`, `l10-sawtooth`).
Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `transcript/transcript.md`, `story/NOTES.md`, and the pages
of Lectures 1–9 for every callback. Every number was recomputed and every code sample was run (Python 3, a C `struct` checked
with `ctypes`), in a scratchpad. No page file was edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / fact-check not applied / wrong code) | 1 | 0 | 5 | 6 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 1 | 4 | 5 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions | 0 | 1 | 2 | 3 |
| **Total** | **1** | **2** | **11** | **14** |

High and medium:
- **F-01 (high, error)**: the merge-and-compaction code in §8.3 repoints every merged key to the merged file. Any key that was updated or deleted in the active file goes back to a stale value, or a deleted key comes back. Run, it returned K1 = V1′ instead of the newer value, and it brought back a K3 that had been deleted.
- **F-02 (medium, contradiction)**: the index holds only word → offset, but every read needs a length n: `(file, offset, n)`, "14 bytes", "1,024 bytes long". The page never says where n comes from.
- **F-03 (medium, distortion)**: "skip the record; the next record checks out" doesn't work for a scan. Once the CRC fails, the value size is untrusted, so a rebuild can't find where the next record starts. Bitcask avoids this by never appending to a file after a crash.

---

## Issues

### F-01 · ERROR · high · the merge repoints keys that were rewritten or deleted in the active file
- **Where:** c8 §8.3, the code block (`repoint_index(merged_file)`), the paragraph after Fig 8·c ("Every entry that moved now sits in a different file…"), Fig 8·c step 4 ("update the map for every moved key"). Figure `s8-files-that-grow-figs.tsx` MergeCompact desc ("the in-memory map is repointed to the merged file").
- **Current text:** `write(merged_file, tmp.values())` / `repoint_index(merged_file)  # offsets changed: update the map` and "so the map has to be repointed for each of them, without a get ever seeing a key that points at nothing."
- **Problem:** the merge reads only the read-only files, while the active file keeps taking writes (the page says so in the same section). Suppose K1 was put again, or K3 deleted, in the active file. Then `tmp` still holds their old entries, and `repoint_index` points K1 back at a stale value and puts the deleted K3 back in the map. I ran the page's code with 001 and 002 read-only and 003 active (`K1 V1-new`, `K3 −1`). Afterwards the map served `K1 = V1′` and `K3 = V3`: an update was lost and a delete undone. The merged file also keeps a copy that is already dead. A smaller point: `tmp` holds whole records, values included, for every read-only file. The lecture's version flushes periodically (L-0243, "flush it periodically").
- **Sources:** L-0241, L-0242, L-0243, L-0296; transcript 02:20:27–02:21:57, 02:34:06–02:34:55, 02:50:13–02:51:05. The Bitcask paper (Sheehy & Smith, 2010) describes the merge as producing files that contain "only the 'live' or latest versions of each present key", and the in-memory keydir decides which versions those are.
- **Replacement (code):**
  ```python
  tmp = {}                                 # the merge's own table, not the index
  for rec in records(read_only_files):     # oldest file first, in write order
      if rec.is_delete:
          tmp.pop(rec.key, None)           # a delete removes the key
      else:
          tmp[rec.key] = rec               # a newer entry replaces the older one
  live = [r for r in tmp.values()          # still the latest? the active file
          if index.get(r.key) == (r.file, r.offset)]   # may have rewritten or deleted it
  write(merged_file, live)                 # only live entries reach the disk
  repoint_index(merged_file, live)         # repoint only those, if still unchanged
  delete(read_only_files)
  ```
- **Replacement (paragraph after Fig 8·c):** "The last lines are the delicate ones. While the merge ran, the active file kept taking writes, so some keys it copied may have been written again or deleted since. Copy and repoint a key only if the map still points at the entry being copied; the newer write wins. Every entry that did move sits in a different file at a different offset, so the map has to be repointed for each of them, without a get ever seeing a key that points at nothing."
- **Replacement (Fig 8·c step 4):** "Offsets changed, so repoint every moved key the map still points at, then delete the old files."

### F-02 · INTERNAL CONTRADICTION · medium · how many bytes does a lookup read?
- **Where:** c2 §2.1–2.2 (an entry is "the word and its offset"; the sizing has no length), c4 §4.2 ("`(file, offset, n)`"), Fig 4·c desc ("one ranged read of n bytes"), Fig 4·d step 6 ("One ranged read of that line, 14 bytes"), c6 §6.1 pause and Fig 6·b ("apple at byte 100, 1,024 bytes long"; the figure label "apple: 100, 1024").
- **Problem:** on a local disk, chapter 2's code can `readline()` from the offset. A ranged GET can't: it needs an end byte. The page sizes the index as word + offset + 2 and builds the map as word → offset. Yet from chapter 4 on, every read knows its length, and by chapter 6 the index visibly holds one ("100, 1024"). A reader who implements chapter 4 meets the gap at once. The class's prepared sizing (L-0187, board 01:43:35) had "2×4", an offset and a length, and the teacher's own example (L-0158) carries the length. The page dropped it.
- **Sources:** L-0054, L-0111, L-0116, L-0158, L-0187; transcript 00:28:03, 00:59:34–01:00:39, 01:02:35–01:04:00, 01:24:59–01:26:15.
- **Replacement (c4 §4.2, after "`(file, offset, n)`, just as a local disk lets you seek and read."):** "On a local disk you could read up to the newline. Over the network you ask for an exact range, so the index must also give n, the length of the word’s line. Store it beside the offset, 4 more bytes an entry: 170,000 × 21.6 B is about 3.7 MB, still nothing. (Or, with entries in file order, take the next word’s offset minus this one’s.)" If the writer stores the length, update Fig 2·c and §2.2's arithmetic to 7.6 + 8 + 4 + 2 = 21.6 B → 3,672,000 B ≈ 3.7 MB, and the header/stepper index sizes to 3,672,000 (byte ranges 16–3,672,015 and 3,672,016–3,672,029). The simpler fix is to keep 2,992,000 and use only the "next offset minus this one" sentence.

### F-03 · DISTORTION · medium · a failed CRC doesn't tell a scan where the next record starts
- **Where:** c9 §9.2: the pause answer, Fig 9·d step 4 ("skips the record instead of serving it. The next record checks out."), the paragraph "What then? … ignore the entry … and treat the write as if it never came", and the TornRecord desc. c10 §10.4 bullet "Catch torn writes: … skip what fails."
- **Problem:** the page's own pause shows the problem. The torn record's value size is wrong, so reading by it runs into the next records. When the CRC then fails, the same untrusted value size can't be used to jump to the next record either. A get through the map lands on the next record's known offset and is fine. But the rebuild after a restart (§7.4), the merge, and the scan for hint files all walk the file record by record, and they lose their place at the torn record. Everything appended after it becomes unreadable. "Skip it and carry on" is the step that doesn't work, and the 10.4 bullet turns it into a rule. The lecture's scenario (L-0259, "another entry is written after it") is why a store must not append after a torn tail. Bitcask never does: it opens a new active file after any restart.
- **Sources:** L-0258, L-0259, L-0265, L-0266; transcript 02:29:21–02:32:32. Bitcask paper: "Once a file is closed, either purposefully or due to server exit, it is considered immutable and will never be opened for writing again."
- **Replacement (add after "…and treat the write as if it never came." in §9.2):** "One catch. Once the CRC fails, the value size can’t be trusted either, so a scan can’t use it to find where the next record starts. So never append after a torn record. Bitcask doesn’t: a file closed by a crash is never written again, and after a restart writes go to a new active file. A torn record is then always the last one in its file, and a rebuild that hits a failed CRC simply stops reading that file."
- **Replacement (Fig 9·d step 4):** "With a CRC first, the reader recomputes the checksum, sees it <span class="term red">fails</span>, and never serves the record. Its sizes can’t be trusted either, so a real store never appends after it: the next write goes to a new file."
- **Replacement (10.4 bullet):** "**Catch torn writes:** sizes in front of every record, a CRC over all of it, checked before you trust a byte; never serve what fails, and after a crash write to a new file."

### F-04 · ERROR · low · an 8-byte binary offset can't sit in a comma-and-newline line
- **Where:** c2 §2.2 ("the offset is an 8-byte integer. Add one byte for the comma and one for the newline"); c3 §3.2 code comment `/* then: index[index_size]   word,offset lines   */`; Fig 2·c.
- **Problem:** a binary 8-byte offset can contain the bytes 0x2C (`,`) and 0x0A (newline), so "read the index line by line" breaks. I simulated 170,000 random offsets below 10¹². In 6,753 of them (4%), one of those bytes appears. Written as text digits, an offset is about 12 bytes and the index about 3.7 MB. The conclusion (a few MB, fits in RAM) holds either way. Only the record layout is wrong.
- **Sources:** L-0056, L-0057 (fact-check L-0056 wrong/medium: 8-byte offset); transcript 00:28:03–00:28:49.
- **Replacement (§2.2, after "so the offset is an 8-byte integer"):** "…so the offset is an 8-byte integer. Store it as raw bytes in a fixed-size slot rather than as text on a line, since its bytes can happen to look like a comma or a newline; count one byte for the word’s length and one more of overhead." Keep the arithmetic at 7.6 + 8 + 2. Code comment: `/* then: index[index_size]   entries: word length, word, 8-byte offset */`.

### F-05 · DISTORTION · low · hint files
- **Where:** c8 §8.1.
- **Current text:** "real Bitcask-style stores write a small hint file next to each data file, holding just the keys and their positions, and rebuild the map from those"
- **Problem:** in Bitcask the merge writes the hint files, one next to each data file it produces. The active file has none. A hint entry holds the key with its value's position and size (and timestamp), not only a position.
- **Sources:** L-0227 (teacher: "there are ways to make it better"); transcript 02:14:50–02:14:56. Bitcask paper ("When the merge process completes, it also creates a 'hint file' next to each data file… [holding] the position and size of the values"); docs.riak.com Bitcask backend page (already cited).
- **Replacement:** "There are ways to speed it up. Real Bitcask’s merge writes a small hint file next to each file it produces, holding each key with the position and size of its value, and on restart the map is rebuilt from those instead of the full data files."

### F-06 · DISTORTION · low · "nothing to roll back to"
- **Where:** c6 §6.1.
- **Current text:** "Overwriting also throws the old file away, so if the new one turns out to be corrupt, there is nothing to roll back to."
- **Problem:** that is true only if the bucket doesn't keep versions. Both fact-check notes say "unless versioning is enabled" (L-0153, L-0157).
- **Sources:** L-0153, L-0157; fact-check L-0153 (imprecise/low), L-0157 (simplified/low). Transcript 01:21:23–01:21:36, 01:24:27.
- **Replacement:** "Overwriting also throws the old file away, so unless the bucket keeps old versions, a new file that turns out to be corrupt leaves nothing to roll back to."

### F-07 · INTERNAL CONTRADICTION · low · Riak: a Bitcask per node, or per partition?
- **Where:** Fig 10·c caption ("Riak runs a Bitcask under every node"), RiakRing desc and labels ("runs an instance of Bitcask under every node", "each node of Riak has an instance of Bitcask running") against §10.2 ("Each partition runs its own Bitcask") and the fact-check (L-0278: "a Bitcask instance per partition").
- **Problem:** a physical Riak node runs many vnodes, and each vnode runs its own Bitcask. The text is right and the figure is not.
- **Sources:** L-0278 (fact-check wrong/medium); docs.riak.com clusters page (already cited).
- **Replacement (caption):** "Riak runs a Bitcask under every partition of the ring. No master: any node can take the request, and each key lives on N vnodes." Figure label: "every vnode runs its own Bitcask"; desc: "…runs an instance of Bitcask for every partition (vnode)…".

### F-08 · DISTORTION · low · LSM: "keep only recent writes in memory" (writer's doubt)
- **Where:** c10 §10.2.
- **Current text:** "**LSM trees**, keep only recent writes in memory, in a memtable backed by a log on disk, and push everything else into sorted, immutable files called SSTables. Their keys don't have to fit in RAM."
- **Judgement on the doubt:** "Their keys don't have to fit in RAM" is correct and sourced. The fact-check checker note on L-0288 concludes it in so many words ("LSM keeps only recent writes in RAM and sorted keys and values on disk, so keys need not fit in memory"). Keep it.
- **Problem (minor):** "only recent writes" is slightly strong. LSM engines also keep small per-file structures in memory, such as Bloom filters and index summaries, just not every key. Optional.
- **Sources:** L-0288, L-0290; fact-check L-0288 (imprecise/medium) and A-SSE-13; transcript 02:43:12–02:43:59.
- **Replacement (optional):** "…keep recent writes in memory, in a memtable backed by a log on disk, and push everything else into sorted, immutable files called SSTables. Unlike Bitcask, their keys don't all have to fit in RAM."

### F-09 · DISTORTION · low · Uber and Bitcask
- **Where:** c10 §10.2.
- **Current text:** "Around 2015, Uber used Riak, with Bitcask as its default backend, for parts of its dispatch system"
- **Problem:** read naturally, "its" is Uber's Riak, so the sentence says Uber ran Bitcask. The checker found no Uber source saying which backend it ran. Only Riak's default is known.
- **Sources:** L-0275, L-0276; fact-check L-0275 (imprecise/medium: "no Uber source I opened states which backend it ran"); transcript 02:37:28–02:39:26.
- **Replacement:** "Around 2015, Uber used Riak for parts of its dispatch system <Cite …riak.com/>; Bitcask is Riak’s default backend, and most Riak setups run it underneath."

### F-10 · ERROR · low · the CRC covers the timestamp too
- **Where:** c9 §9.2 ("a checksum computed over the record, its sizes, key and value"), recall item 4 in §10.4 ("recomputes the checksum over the sizes, key and value"), TornRecord desc ("over the sizes, key and value").
- **Problem:** in the final layout (CRC | timestamp | sizes | key | value) the CRC covers everything after it, the timestamp included, as it does in Bitcask. A CRC that left the timestamp out would let a torn or corrupt timestamp through, and the timestamp settles conflicts.
- **Sources:** L-0260 ("key size, value size, key, value, everything"), L-0264; transcript 02:30:15–02:31:36.
- **Replacement (§9.2):** "a checksum computed over everything else in the record (its sizes, key and value, and the timestamp once it is added) when it is built in memory, and stored with it." Recall: "recomputes the checksum over the rest of the record it read".

### F-11 · ERROR · low · append mode `"a"` vs the code's `"ab"`
- **Where:** c7 §7.2 ("Open the file in append mode, `"a"`").
- **Problem:** the code below it uses `"ab"`, which is right for writing bytes. `"a"` is text mode, and `f.write(record)` with a bytes record would raise `TypeError`. The code itself ran fine.
- **Sources:** L-0293; transcript 02:46:31–02:48:26.
- **Replacement:** "Open the file in append mode (`"ab"` in Python, append and binary), write the record, and force it to disk before you answer."

### F-12 · ERROR · low · Range headers with thousands separators
- **Where:** Fig 4·d BootThenGet labels `bytes=16-2,992,015` and `bytes=2,992,016-2,992,029` (next to `Range: bytes=0-15`).
- **Problem:** the labels copy HTTP Range syntax, which takes plain digits, so a reader who copies them sends an invalid header. The arithmetic itself checks out: 16 + 2,992,000 − 1 = 2,992,015, and apple's 14 bytes run 2,992,016–2,992,029.
- **Replacement:** `bytes=16-2992015` and `bytes=2992016-2992029`. Commas stay fine in the caption and step text.

### F-13 · ERROR · low · "no waiting for the platter to come round"
- **Where:** c7 §7.2 ("there is no seek and no waiting for the platter to come round, as long as the disk is busy with this one stream of writes").
- **Problem:** this is the teacher's claim (L-0210), and the fact-check added only the single-stream caveat. With the `fsync` after every put that the page's own code does, the platter has moved past the tail by the time the next put arrives, so each synced write still waits for part of a rotation. The seek is what appending removes. No source was opened for this item, so the fix only removes the claim.
- **Sources:** L-0210 (fact-check simplified/low); transcript 02:04:48–02:06:03.
- **Replacement:** "The head is already where the last write finished, so there is no seek, as long as the disk is busy with this one stream of writes."

### F-14 · INTERNAL CONTRADICTION · low · "AODB" in the header figure
- **Where:** Fig 3·c HeaderBytes label "your own database would start with AODB".
- **Problem:** the text cut the teacher's joke name (L-0079, "Arpit's outstanding database"), and NOTES lists AODB as cut. The figure keeps it with no explanation, and as 4 letters next to an 8-byte name field.
- **Sources:** L-0077, L-0079; transcript 00:43:11–00:44:02.
- **Replacement:** label "your own database would start with its own name".

---

## Writer's open doubts (NOTES.md)

1. **Length ≈ 13.3k, above 8–12k.** Not a fact question. Nothing in this review adds more than three sentences (F-01, F-03).
2. **"Their keys don't have to fit in RAM" (LSM, §10.2).** Correct. The fact-check checker note on L-0288 says it explicitly. See F-08 for an optional wording.
3. **Lecture 9's hand-off.** Re-checked: `lec07/c9-a-box-dies.mdx:125` ("two storage engines out of nothing but files on a disk. Append-only files come back there, in a much bigger role") matches the overview and §7.2's AOF callback.

## Checked and found correct

**Arithmetic (recomputed):**
- 170,000 × (7.6 + 8 + 2) = 170,000 × 17.6 = 2,992,000 B ≈ 3 MB (10⁶ B, as Fig 2·c says).
- 2³² = 4,294,967,296, "about 4.3 billion". 1 TB / 170,000 ≈ 5.9 MB a word, "several megabytes". 0.5 TB = 500 GB. 100 × 1 TB = 100 TB. 1 TB + 1 TB = 2 TB on the job server.
- Byte offsets: `apple,a fruit⏎` = 14, `amazon,a rainforest⏎` = 20, so book is at 34. `ball,a round object⏎` = 20 (bytes 14–33). `apple,a round fruit⏎` = 20, six more than 14, landing on bytes 14–19, which held `ball,a`, and leaving ` round object⏎`.
- The header: 8 + 4 + 4 = 16, and `sizeof(struct dict_header)` = 16 with no padding (ctypes). `Range: bytes=0-15` is 16 bytes. Index bytes 16–2,992,015, apple 2,992,016–2,992,029 (14 bytes). The index size fits a uint32.
- DictRecord: word size 5 (`apple`), meaning size 13 (`a round fruit`). Sorted-merge clip: 7 dictionary words and 3 changes.
- A third of 100 TB is over 30 TB. The 2 GB Bitcask default is right.

**Code run:**
- Chapter 1 scan: finds a word, `None` for a miss.
- Chapter 2 seek + `readline`: returns all three meanings at offsets 0/14/34, `None` for a miss.
- Chapter 5 merge: dictionary a,b,c,d,f,g,h with changelog c,e,f gives a b c′ d e′ f′ g h, sorted, one pass.
- Chapter 7 append + `flush` + `os.fsync` on `"ab"`: works.
- Chapter 8 merge: logic right for the read-only files alone; wrong against the live map (F-01).

**S3:**
- Object storage. Ranged GET with `Range: bytes=0-15`. One range per request (GetObject doc).
- A same-key overwrite is atomic: readers get old or new, never a mix. The real danger is stale offsets (fact-check L-0157, applied in §6.1 and recall 1).
- HDFS and network disks as alternatives (L-0110, L-0113).

**Server switch:**
- The job order matches L-0196 and Fig 6·d / the end-to-end text: merge → upload to new path → update `meta.json` (only after the upload succeeds, L-0166) → trigger the deployment.
- `meta.json` at a static path (L-0167).
- The tradeoff table matches L-0164, L-0168, L-0170–L-0175. "Thousands of polls" matches L-0172.
- A reload is a boot (L-0177, L-0178, L-0183). Mixed answers, never garbage (L-0184). The war story is told as experience (L-0198, L-0308). The direct index push now says 3 MB (L-0199).

**Bitcask:**
- Append-only with delete = put(−1) (L-0216–L-0218), and the key → offset map (L-0221–L-0224).
- Rotation, active vs read-only files, the map storing file + offset (L-0236–L-0239), and the 2 GB default.
- Merge with a temporary hash table, not two pointers (L-0243, L-0296). The sawtooth and the two knobs (L-0244–L-0248), with Bitcask's many more triggers (fact-check L-0247).
- "Never more than one seek" and the SSD statement (fact-check L-0249, L-0250).
- The record layout: CRC | TS | KSZ | VSZ | K | V (L-0264).
- CRC position as a convention: Bitcask and LevelDB first; Postgres WAL and MySQL binlog elsewhere (fact-check L-0261, L-0262).
- Header atomicity not needed (fact-check L-0297, L-0299). The keydir fields as taught (L-0268).
- Every key in RAM, I/O saturation, easy backups (L-0269–L-0272). Embedded, like SQLite (L-0274).
- Riak: masterless ring, vnodes, N copies, any node coordinates, a Bitcask per partition (fact-check L-0278 applied in the text). The Elasticsearch/Lucene analogy as corrected (L-0277).
- The paper, its authors and Basho (L-0282). The benchmark and deployment stories told as "one engineer" (L-0284, L-0308).
- The throughput heuristic as a question to ask, not a law (fact-check L-0280).

**Other fact-check corrections applied once:**
- 7.6 letters and 8-byte offsets (L-0055, L-0056).
- PNG signature (L-0078). Parquet, ZIP and MP4 directories at the end (L-0073, L-0086).
- JSON parse wording (L-0016, L-0087).
- Athena dropped, Hudi index sourced (L-0035, L-0036, L-0194).
- Cron job (L-0121). Hash-map alternative not contradicted, n² dropped (L-0139, L-0310).
- Uber limited to dispatch (L-0275, see F-09).
- Read-a-byte-at-a-time is per call (L-0253).

**Callbacks to Lectures 1–9:**
- These link targets exist and match:
  - lec04 `s2-2` (a billion users × 8 B = 8 GB).
  - lec09 `s2-1` (photos in S3 because it is dirt cheap).
  - lec08 `s4-3` (a fleet of LB servers, reactive via a real-time Pub/Sub).
  - lec07 `s9-3` (Redis AOF replayed after a restart).
  - lec07 `s8-2` (ring) and `s9-1` (virtual nodes).
  - lec05 `s6-2` (delete as `expired_at = −1`, an in-place UPDATE).
- The overview's "Where you are" (Lectures 9, 7, 3) matches those pages.

**Course close (§10.5), line by line against each page:**
- Lecture 1 (lec04): presence from heartbeats and a 30 s TTL. The blog through a viral post.
- Lecture 2 (lec01): copies "Browser, CDN, … materialized view".
- Lecture 3 (lec05): 120 seats, a few SQL words at a time.
- Lecture 4 (lec02): Slack messages to every member across servers.
- Lecture 5 (lec08): load balancer, a fleet, a lock across machines.
- Lecture 6 (lec03): IDs unique without coordination, 64 bits.
- Lecture 7 (lec09): CDN for photos, hashtag counting through Kafka.
- Lecture 8 (lec06): avatar service; the badge chapter "protect the database from work that changes nothing".
- Lecture 9 (lec07): one hash table up to a ring of nodes.
- All correct. The closing question echoes L-0100/L-0133.
