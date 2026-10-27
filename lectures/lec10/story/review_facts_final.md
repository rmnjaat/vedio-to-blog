# Lecture 10 (lec10) story rewrite: final fact re-check (4b)

Scope: Revision 2 of `site/src/content/lectures/lec10.mdx` and `lec10/{s0-header,c1…c10}.mdx`, plus the text (labels and `desc`) of
the figures they import from `site/src/figures/lec10/`. Checked against `review_facts.md` (F-01…F-14), `NOTES.md` Revision 2,
`ledger/ledger.jsonl`, `factcheck/final.jsonl` and each lecture's current `s0-header.mdx`. Every changed number was recomputed.
The §2.2 lookup and the §8.3 merge were run in a scratchpad (Python 3, `python3 -I`). Sources reopened:
- docs.riak.com Bitcask backend page
- the Bitcask paper (riak.com/assets/bitcask-intro.pdf), text pulled from the PDF
- the AWS S3 user guide page on appending to objects

No page file was edited.

## Summary

| | High | Medium | Low | Total |
|---|---|---|---|---|
| Old items F-01…F-14 | all 14 fixed | | | |
| New items | 0 | 0 | 6 | 6 |

There are no high or medium issues left. All six new items are low. Four of them are leftovers from the F-02 and F-03 fixes: places that still show the old picture.

---

## Old items

| Id | Status | Current text (quoted) |
|---|---|---|
| F-01 merge repoints rewritten/deleted keys | **Fixed** | §8.3 code: `live = [r for r in tmp.values() if index.get(r.key) == (r.file, r.offset)]` / `write(merged_file, live)` / `repoint_index(merged_file, live)  # repoint only those, if still unchanged`. Paragraph after Fig 8·c: "Copy and repoint a key only if the map still points at the entry being copied; the newer write wins." Step 4: "repoint every moved key the map still points at". MergeCompact desc updated. |
| F-02 read length missing | **Fixed** | §2.1: "and the line’s **length**, so a reader knows exactly how many bytes to fetch". §2.2 sizing 1 + 7.6 + 8 + 4 = 20.6 B. §4.2: "The map already gives both numbers: the offset, and the line’s length as n." See N-01 for leftover labels. |
| F-03 failed CRC loses the scan | **Fixed** | §9.2: "So never append after a torn record. Bitcask doesn’t: a file closed by a crash is never written again … and after a restart writes go to a new active file. A torn record is then always the last one in its file, and a rebuild that hits a failed CRC simply stops reading that file." Fig 9·d step 4, TornRecord desc/label ("a real store puts this in a new file") and the 10.4 bullet also updated. See N-03 for recall 4. |
| F-04 binary offset in a comma/newline line | **Fixed** | §2.2: "Store both as raw bytes in fixed-size slots, not as text on a line … and put one byte in front of the word saying how long it is." §3.2 comment: `entries: word length, word, offset, length`. |
| F-05 hint files | **Fixed** | §8.1: "Real Bitcask’s merge writes a small hint file next to each file it produces, holding each key with the position and size of its value". See N-05 for the citation. |
| F-06 rollback | **Fixed** | §6.1: "so unless the bucket keeps old versions, a new file that turns out to be corrupt leaves nothing to roll back to." |
| F-07 Riak per node vs per partition | **Fixed** | Caption: "Riak runs a Bitcask under every partition of the ring." Label: "every vnode runs its own Bitcask". Desc: "for every partition (vnode)". |
| F-08 LSM wording | **Fixed** | §10.2: "keep recent writes in memory … Unlike Bitcask, their keys don’t all have to fit in RAM." |
| F-09 Uber and Bitcask | **Fixed** | §10.2: "Around 2015, Uber used Riak for parts of its dispatch system; Bitcask is Riak’s default backend, and most Riak setups run it underneath." |
| F-10 CRC covers the timestamp | **Fixed** | §9.2: "computed over everything else in the record (its sizes, key and value, and the timestamp once it is added)". Recall 4: "over the rest of the record it read". |
| F-11 `"a"` vs `"ab"` | **Fixed** | §7.2: "Open the file in append mode (`"ab"` in Python, append and binary)". |
| F-12 Range labels with commas | **Fixed** | BootThenGet: `bytes=16-3502015`, `bytes=3502016-3502029` (phone splits as `bytes=3502016-` / `3502029`). |
| F-13 platter claim | **Fixed** | §7.2: "The head is already where the last write finished, so there is no seek, as long as the disk is busy with this one stream of writes". The platter clause is gone. |
| F-14 AODB label | **Fixed** | Fig 3·c label: "would start with its own name". |

---

## Focus checks

### Merge code (§8.3): correct
I ran the page's code exactly as printed, using these files:
- 001 (read-only): `K1 V1, K2 V2, K3 V3, K1 V1′, K2 −1`
- 002 (read-only): `K4 V4, K1 V1″, K5 V5, K6 V6`
- 003 (active): `K1 V1-new`, `K3 −1`, `K6 V6-new`

Results:
- **Merged file:** `K4 V4, K5 V5`, and nothing else. Stale K1 and K6 were dropped, and so were deleted K2 and K3.
- **Map afterwards:** K1 = V1-new, K2 = none, K3 = none, K4 = V4, K5 = V5, K6 = V6-new. No stale value comes back and no deleted key returns.
- **Restart:** rebuilding the map from the merged file, then the active file, gives exactly the live map.
- **Race:** a key changed between the `live` filter and `repoint_index` is still handled, because `repoint_index` checks again ("if still unchanged").
- **Tombstones:** they can safely be dropped, because the merge takes in every read-only file, so no older copy of a key survives outside it.

**The temporary table holding positions (the writer's choice):** this is sound, and it fits the paper's keydir, which locates values by file id, position and size. Two spots don't match it, though (N-02):
- the code stores `tmp[rec.key] = rec`, the whole record;
- the figure's tmp table shows values (`K1: V1→V1′→V1″`).

### 4-byte length in the index: every number checks out
- Entry: 1 (word length) + 7.6 + 8 + 4 = 20.6 B. 170,000 × 20.6 = 3,502,000 B ≈ 3.5 MB. Fig 2·c (desk and phone) and the NumberCrunch desc agree.
- The header's `uint32` index_size holds 3,502,000 (< 2³²). A 4-byte length covers lines up to about 4.3 GB, and the page says a line is "a few megabytes at most".
- Fig 3·c brace and label "3,502,000 B". Fig 3·d step 4 `3,502,000`. §3.2: apple at 16 + 3,502,000 + 0 = byte 3,502,016.
- Fig 4·d: header `bytes=0-15`, index `bytes=16-3502015` (16 + 3,502,000 − 1), apple `bytes=3502016-3502029` (14 bytes). Step 5: "offset, 0 … its length, 14". Return label `OUR_DICT · 1 · 3,502,000`.
- So-far row "~3.5 MB". The 10.4 bullet "(word + 8-byte offset + 4-byte length + 1) … about 3.5 MB".
- §2.2 code, run against a binary index in exactly the §2.2 layout: apple (0, 14), amazon (14, 20), book (34, 21). Lookups return "a fruit", "a rainforest" and "a thing to read". `qwzx` → `None`.
- No stale 2,992,000, 17.6, 2.9 or "3 MB" is left in the lec10 content or figures (grep).

### Torn-record rule: correct
The rule now holds together. A failed CRC means the sizes can't be trusted, so the store never appends after a torn record. A torn record is then always last in its file, and a rebuild stops reading that file there.

It matches both sources:
- **Bitcask paper:** "Once a file is closed, either purposefully or due to server exit, it is considered immutable and will never be opened for writing again."
- **docs.riak.com:** after a crash, the only data at risk is "partially written records at the tail of the last file that was opened for writes".

The pause and Fig 9·d steps 2–3 still append after the torn record, but that is the problem being shown, and step 4 resolves it. Recall 4 is the one place where the premise and the answer collide (N-03).

### fsync / Bitcask flushing (§7.2): correct, and the citation holds
The page says: "Real Bitcask makes it a setting; by default it leaves flushing to the operating system, which is faster but can lose the last few writes in a power cut". The cited docs.riak.com page confirms each part:
- **The default:** `sync_strategy` defaults to `none`, which "writes data into operating system buffers that will be written to disk when those buffers are flushed by the operating system."
- **The risk:** "If the system fails before those buffers are flushed, e.g. due to power loss, that data is lost."
- **It is a setting:** `o_sync` and interval modes exist.

The paper agrees (`sync_on_put` is an option). This is fact-check A-SSE-02, applied correctly. It also overrides the teacher's L-0289 ("persists every write immediately by default").

### "S3 objects can't be appended to" (§6.4 hand-off): true for ordinary buckets, outdated as a blanket claim
This is N-04. Since November 2024, S3 Express One Zone directory buckets do support appends: `PutObject` with `x-amz-write-offset-bytes`, up to 10,000 parts per object. General-purpose buckets still can't append. The argument survives either way, but the sentence as written is no longer true of S3 as a whole.

### §10.5 course close: matches every overview
Each line was checked against the lecture's current `s0-header.mdx` and its description. All nine are accurate.

| Line | Lecture (id) | Overview says | Verdict |
|---|---|---|---|
| presence dot from heartbeats and a TTL; blog through its first viral post | 1 (lec04) | description "online/offline indicator from heartbeats and a TTL"; Build 2 "one post goes viral" | ok |
| same blog: copies along the route, more servers + scaled DB, queues and streams, clap counter with no lost update, live claps | 2 (lec01) | Fig 0·a "Where Lecture 1 left the blog"; chapters 1–6 as listed | ok |
| 120 seats to 120 people; KV store with expiry on one MySQL table | 3 (lec05) | Build 1 "120 passengers at once"; Build 2 "per-key expiry, on a single MySQL table" | ok |
| database family by what it gives up; Slack messages to every member across servers | 4 (lec02) | Build 1 "the one thing it gives up"; Build 2 "every member of a channel … on different servers" | ok |
| load balancer, a fleet, a lock across machines | 5 (lec08) | Builds 1 and 2 | ok |
| unique IDs; Flickr's ticket servers vs no coordination (Snowflake, Instagram); deep pages stay fast | 6 (lec03) | "ticket databases, a 64-bit time-first layout and an ID made inside the database"; c8 "its nodes never coordinate with each other"; "deep pagination cheap" | ok |
| Instagram photos behind a CDN; hashtag counts through Kafka | 7 (lec09) | Builds 1 and 2; "batched counting on a re-keyed Kafka topic" | ok |
| avatar service, photo tags, unread badge that don't hammer the DB | 8 (lec06) | Builds 1–3; "protect the store that holds it" | ok |
| analytics copy via CDC; cache from one hash table to a ring | 9 (lec07) | Parts 1 and 2 | ok |

The `LectureLink` ids match the course order you gave (L1 lec04 … L9 lec07).

---

## New issues

### N-01 · INTERNAL CONTRADICTION · low · the dictionary's map is still drawn as word → offset
- **Where:**
  - §2.1 "while the index holds only words and offsets".
  - Fig 2·b OneLevelIndex: rows `apple, 0` / `amazon, 14` / `book, 34`, and the label "keys + offsets only" (desk and phone).
  - Fig 3·a caption "a word → offset map".
  - Fig 3·d step 5 "`apple → 0`, `amazon → 14`".
  - Fig 4·c caption "holds the word → offset map".
  - BootThenGet labels "w → o" and "map: apple → 0", and its desc "the map gives its offset".
  - so-far row "word → offset map in RAM".
  - §10.3 table "word → offset, loaded at boot".
- **Problem:** after F-02, the prose says every entry holds offset and length, and the stepper's step 5 says "and its length, 14". The figures and captions still show offset only. This is the same gap F-02 fixed in the prose, now only in the pictures.
- **Replacement:**
  - §2.1: "while the index holds only words, offsets and lengths".
  - Fig 2·b rows: `apple, 0, 14` / `amazon, 14, 20` / `book, 34, …`. Label: "keys + offsets + lengths only".
  - Captions 3·a / 4·c: "a word → (offset, length) map".
  - Step 3·d·5: "`apple → 0, 14`, `amazon → 14, 20`, …".
  - BootThenGet: "w → o, n" and "map: apple → 0, 14". Desc: "the map gives its offset and length".
  - so-far: "word → offset + length in RAM, ~3.5 MB" (phone: "word → offset, length in RAM").
  - §10.3 cell: "word → offset + length, loaded at boot".

### N-02 · INTERNAL CONTRADICTION · low · the merge's temporary table "holds positions, not values", but code and figure hold records/values
- **Where:**
  - §8.3 code `tmp[rec.key] = rec`, with the comment "key -> latest record's file + offset".
  - Fig 8·c tmp table `K1: V1→V1′→V1″`, `K2: V2 → −1`, `K3: V3`, `K4: V4`.
- **Problem:** the text says the table holds positions, not values. The code stores the record object, and the figure shows values. The logic is correct either way.
- **Replacement (code, keeps it runnable as shown):**
  ```python
  tmp = {}                                 # key -> (file, offset) of its latest record; not the index
  for rec in records(read_only_files):     # oldest file first, in write order
      if rec.is_delete:
          tmp.pop(rec.key, None)           # a delete removes the key
      else:
          tmp[rec.key] = (rec.file, rec.offset)   # a newer entry replaces the older one
  live = [(k, pos) for k, pos in tmp.items()      # still the latest? the active file
          if index.get(k) == pos]                 # may have rewritten or deleted it
  write(merged_file, live)                 # copy only those records to the new file
  repoint_index(merged_file, live)         # repoint only those, if still unchanged
  delete(read_only_files)
  ```
  Figure tmp rows: `K1 → f2, O2`, `K2 → −1` (struck), `K3 → f1, O3`, `K4 → f2, O1`. These match MAP_OLD. The simpler alternative is to drop "and holds positions, not values" from the prose.

### N-03 · INTERNAL CONTRADICTION · low · recall 4's premise is now a thing the store never does
- **Where:** §10.4 recall 4. Question: "A record’s value was cut short by a power failure, and new records were appended after it." Answer: "…since its sizes can’t be trusted, the store writes nothing more after it in that file."
- **Problem:** the question says records were appended after the torn record, and the answer says the store writes nothing after it. A reader can't tell whether the premise is a mistake or a trap.
- **Replacement (question):** "A record’s value was cut short by a power failure. What does a reader do with the CRC, what would it do without one, and why must the store never append after that record?"
- **Replacement (answer):** "With a CRC it recomputes the checksum over the rest of the record it read, sees it doesn’t match, and never serves it. Its sizes can’t be trusted either, so nothing may follow it: after a restart, writes go to a new file. Without a CRC, the reader trusts the value size; if more records had been appended after it, it would read on into them and return those bytes as the value with no error."

### N-04 · OUTDATED · low · "an object can’t be appended to"
- **Where:** c6 §6.4 hand-off: "S3 can’t help either, since an object can’t be appended to, only replaced whole."
- **Problem:** this holds for general-purpose buckets, which are what the page means by S3 everywhere else (fact-check L-0112: "objects are written whole and cannot be modified in place"). But since November 2024, objects in S3 Express One Zone directory buckets can be appended to, up to 10,000 appends per object (AWS S3 User Guide, "Appending data to objects in directory buckets"). The build's conclusion is unaffected: that class is single-zone and costlier, and its part cap rules out an all-day append log.
- **Sources:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/directory-buckets-objects-append.html, fact-check L-0112.
- **Replacement:** "…and S3 can’t help either: an object in an ordinary bucket can’t be appended to, only replaced whole (only the single-zone S3 Express class allows appends, and at most 10,000 per object)." A shorter fix, if preferred: "since an ordinary S3 object can’t be appended to, only replaced whole."

### N-05 · CITATION · low · hint-file contents cited to a page that doesn't say "size"
- **Where:** c8 §8.1: "holding each key with the position and size of its value … <Cite docs.riak.com>".
- **Problem:** the docs.riak.com Bitcask page says only that hint files "record where the various keys exist within the data files". "Position and size" comes from the Bitcask paper ("instead of the values they contain the position and size of the values within the corresponding data file"). The claim is true, but the cited page doesn't support all of it.
- **Replacement:** add `<Cite href="https://riak.com/assets/bitcask-intro.pdf">Bitcask paper</Cite>` after "the position and size of its value". You can keep or drop the docs.riak.com cite.

### N-06 · DISTORTION · low (optional) · "no seek between them" in 10.1
- **Where:** c10 §10.1: "writes go as fast as the disk can persist them, with no seek between them, and each get is one read."
- **Problem:** §7.2 is careful: no seek "as long as the disk is busy with this one stream of writes; reads will pull the head away". 10.1 drops that condition, and a get between two puts does put a seek between them.
- **Replacement:** "writes add no seek of their own and go as fast as the disk can persist them, and each get is one read."

---

## Checked in Revision 2 and found correct (beyond the focus list)
- §2.2: 8-byte offset (10¹² > 2³² ≈ 4.3 billion); a 4-byte length for lines of a few MB.
- §4.3 step 5/6 "offset 0 … length 14", 14 bytes.
- §9.1: newline bytes inside audio/video values, and sizes as two 4-byte integers (8 bytes, then key + value). DictRecord 5 and 13.
- §10.1: the map holds file, record size, offset and timestamp, so one read per get.
- §10.4: the merge bullet "repointing only keys the map still points at"; the torn-write bullet "after a crash write to a new file".
- §8.2: 2 GB rotation default (docs.riak.com "The default is 2 GB"). §8.4 "never more than one seek" (docs.riak.com "Bitcask never uses more than one disk seek to read a value").
- §10.2 LSM sentence and §6.1 versions sentence: as in F-08 and F-06.
- Overview Build 2 blurb: "each safe on disk before it is acknowledged … SSDs cost too much" (L-0200, L-0202).
