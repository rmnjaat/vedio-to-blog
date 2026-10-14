# Lecture 10: pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. Each choice has its own verdict text (shown when that button is picked); the reveal paragraph follows both and starts with the answer. Without JS, both verdicts and the reveal are visible.

---

### P1 · §2.3 · "Does the index fit in RAM?"
- **From class:** P9, 00:26:50–00:30:48 ("Can we fit this index in memory? How will you compute the size of this index?"). Teaching-map top prompt #1. A first try in class came out at 17,000,000 bytes, a slip by a factor of ten.
- **Question:** The dictionary is 1 TB and holds 170,000 words. An index entry is the word (about 4.3 characters on average), a 4-byte offset, plus a comma and a newline. Before designing anything clever: will the whole index fit in an API server's memory?
- **Choice A:** "No: a 1 TB file needs an index too big for RAM, so page it like a B+ tree."
  - **Verdict (wrong):** The index's size depends on the number of words and the size of one entry, not on the size of the meanings. 170,000 small entries can't add up to anything near a terabyte.
- **Choice B:** "Yes: it's only a couple of megabytes."
  - **Verdict (right):** 170,000 × (4.3 + 4 + 2) B = 1,751,000 B, about 1.75 MB. Even with the 8-byte offsets a 1 TB file really needs (see the "More precisely" note below), it's about 2.4 MB.
- **Reveal:** Yes, easily. 1.75 MB is "peanuts" beside 1 TB, so load the index into an in-memory hash map when the server starts, and every lookup becomes one pointed read. The number crunch, not a cleverer structure, settled the design.
- **Ledger:** L-0052, L-0054, L-0055, L-0056, L-0057, L-0058, L-0059, L-0060, L-0061.

### P2 · §3.1 · "Where does the index stop?"
- **From class:** P10/P11, 00:34:54–00:40:32 ("We want one file. How can we go about this?" … "How would you know when to stop reading the index?"). Teaching-map #4.
- **Question:** Index and data now live in one file, index first. The server reads the index line by line into its hash map at boot. How should it know where the index ends and the data begins?
- **Choice A:** "Put a special separator line between the index and the data."
  - **Verdict (wrong):** It works, but the reader has to inspect every line looking for the marker, and the marker must never appear in the data. The class called it good but improvable.
- **Choice B:** "Write the index's size in a few fixed bytes at the very start."
  - **Verdict (right):** The reader reads those bytes first, then exactly that many bytes of index, and knows everything after is data. No marker, no wasted space.
- **Reveal:** A number at the start. Store the byte offset (here, the index size) in a small fixed-size header, and the boundary is never searched for. Without it, the reader would load data lines into the map as if they were index entries. That header is the trick behind every file format (3.2).
- **Ledger:** L-0066, L-0067, L-0068, L-0069, L-0070, L-0071, L-0072.

### P3 · §4.1 · "What's really wrong with a copy per server?"
- **From class:** P13, 00:52:07–00:54:52 ("Why not store this one file on every server? What's the harm in that?" … "What else is a problem?"). Teaching-map #8.
- **Question:** You could copy the 1 TB dictionary onto each API server's disk. Updates come once a week, and meanings barely change. What is the real problem with this?
- **Choice A:** "Updates become tedious and servers can drift out of sync."
  - **Verdict (wrong):** Both are real, but neither hurts yet: a weekly batch can update every copy, and a server serving "a fruit" for a few minutes while another serves "a round fruit" is not the end of the world.
- **Choice B:** "Cost: you pay for the same terabyte on every server."
  - **Verdict (right):** On 100 servers that's 100 TB of redundant, usually SSD, storage. That is what rules the design out.
- **Reveal:** Cost. If you aren't thinking about cost, you aren't building good systems: keep one copy in a central place that every server can read over the network.
- **Ledger:** L-0096, L-0097, L-0099, L-0100, L-0102, L-0103.

### P4 · §5.2 · "Does ball move down?"
- **From class:** P16, 01:10:05 ("What happens when you replace this by this? Will this entry move down?" The class answered yes). Teaching-map #2.
- **Question:** The file has `apple, a fruit` followed by `ball, a round object`. The changelog says apple now means "a round fruit". You know apple's offset from the index, so you write the new line there. What happens to ball's line?
- **Choice A:** "It moves down to make room, as in an editor."
  - **Verdict (wrong):** That's what an IDE does, because the text is in memory. A file on disk doesn't shift its bytes.
- **Choice B:** "Part of it gets overwritten."
  - **Verdict (right):** The bytes are written blindly at that offset, so the longer meaning runs into the start of ball's line and corrupts it.
- **Reveal:** It gets overwritten. You can't simply "replace the entry" in a file on disk. So the update writes a whole new file instead, and if both files are sorted, that's one merge pass (5.3).
- **Ledger:** L-0128, L-0129, L-0130, L-0131, L-0132.

### P5 · §6.1 · "Same path, next minute"
- **From class:** P19, 01:21:36–01:26:15 ("What if you have uploaded to the same path? What could go wrong?"). Teaching-map #3.
- **Question:** The merged dictionary is ready. You upload it over the old file at the same S3 path. An API server still has last week's index: apple at offset 100, 1,024 bytes. A user asks for "apple" a minute later. What do they get?
- **Choice A:** "The new meaning of apple."
  - **Verdict (wrong):** The read goes to offset 100 in the *new* file, but in the new file apple is somewhere else. The server's offsets describe a file that no longer exists at that path.
- **Choice B:** "1,024 bytes of something else, maybe starting mid-word."
  - **Verdict (right):** The new file has different offsets, so those bytes can be another word, or the tail of one, until every server reloads its index.
- **Reveal:** Garbage, until each server reloads. That's why the new file goes to a new path, so each server's index always matches the file it reads. (S3 itself never serves a half-written object; the stale offsets are the problem.)
- **Ledger:** L-0152, L-0157, L-0158, L-0159, L-0161.

### P6 · §6.3 · "The least code that works"
- **From class:** P20–P23, 01:27:31–01:41:00 ("How do you tell API servers that this is the new path?" … "Can we do better than this?" … the hint: "What happens when this API server boots up?"). Teaching-map #5.
- **Question:** The new file is at a new path, and `meta.json` now points at it. Every API server reads `meta.json` only when it boots. What is the least new code that gets every server onto the new file?
- **Choice A:** "Have servers subscribe to Redis Pub/Sub, and publish an event when the upload is done."
  - **Verdict (wrong):** It works, but it adds a component to run and a persistent connection on every server just to hear "something changed", and a server that is restarting at that moment misses the event.
- **Choice B:** "None: trigger a rolling deployment, and each new server reads meta.json at boot."
  - **Verdict (right):** A reload is a boot. The update job calls the deployment pipeline (AWS SDK, Jenkins), servers are replaced one at a time, and each reads the new path.
- **Reveal:** Trigger a deployment. It costs the same, needs no polling, no Pub/Sub and no reload API, and during the roll users get old or new meanings, never garbage. You control your own infrastructure: use it.
- **Ledger:** L-0169, L-0170, L-0171, L-0177, L-0178, L-0183, L-0184, L-0198.

### P7 · §7.3 · "Deleting from a file that only appends"
- **From class:** P26, 02:08:37–02:10:26 ("How will you do deletes? I say delete K2. What will you do now?"). Teaching-map #6.
- **Question:** Your store only ever appends to the end of its file. K2 was written earlier. How do you delete K2?
- **Choice A:** "Go back to K2's entry and overwrite its value with −1."
  - **Verdict (wrong):** That's a write at an earlier location, which an append-only file never does. You'd also be paying a seek for a delete.
- **Choice B:** "Append a new K2 entry with a special 'deleted' value."
  - **Verdict (right):** `DEL K2 = PUT(K2, -1)`. The newest entry for K2 says it's gone, and the in-memory map drops K2.
- **Reveal:** Delete is a put. Appends are O(1), so delete is O(1) too. The dead entries are cleaned up later, when old files are merged (§8).
- **Ledger:** L-0215, L-0216, L-0217, L-0218, L-0223.

### P8 · §8.2 · "When to start a new file?"
- **From class:** P30, 02:16:45–02:19:20 ("When will you make the switch? What's the criteria?"). Teaching-map #10.
- **Question:** The append-only file grows forever, so you'll split it into several files with one active writer. How big should each file get before you start the next?
- **Choice A:** "Big: split the disk into two or three files."
  - **Verdict (wrong):** On a 100 TB disk that's files of tens of terabytes. File systems may not support files that large, a huge file can't be indexed in parallel, and every merge or rebuild has to chew through it whole.
- **Choice B:** "Small: around 100 MB to 1 GB, then rotate."
  - **Verdict (right):** Small files stay under any file-system limit, and merge, compaction and index rebuilds can work one file at a time.
- **Reveal:** Small, with rotation: each time the active file crosses a threshold, a new one starts and the old one becomes read-only. Riak's Bitcask rotates at 2 GB by default.
- **Ledger:** L-0233, L-0234, L-0235, L-0236, L-0238.

### P9 · §9.2 · "A record cut in half"
- **From class:** P32, 02:29:21–02:31:36 ("What if, while writing the value, the machine crashed? How will you know that an entry that you return is corrupt?"). Teaching-map #9.
- **Question:** Records are `key size | value size | key | value`. The machine loses power halfway through writing a 1 MB value; after restart, more records are appended. A get for that key arrives. Can the store tell the record is broken from the sizes alone?
- **Choice A:** "Yes: the value size says how many bytes to read."
  - **Verdict (wrong):** The size was written before the crash, so the reader trusts it and reads 1 MB, which runs into the next record's bytes. It returns garbage with no error.
- **Choice B:** "No: it needs a checksum over the record."
  - **Verdict (right):** A CRC computed over sizes, key and value and stored with the record won't match the torn bytes, so the store reports the entry as corrupt instead of serving it.
- **Reveal:** No; add a CRC. The class put it first in the record and flushed it first; real formats differ on placement (see SN-05), but every one checks it before trusting the data. Corrupt records are skipped, for example during merge.
- **Ledger:** L-0258, L-0259, L-0260, L-0261, L-0264, L-0265.
