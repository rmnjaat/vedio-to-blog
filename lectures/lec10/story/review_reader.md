# Lecture 10 (lec10): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read `lectures/lec10/story/page_text.md` in order (overview, chapters 1–10), plus the `lec10.mdx` frontmatter for titles and summaries. I did not open the ledger, transcript or fact-check. To judge the course close (§10.5) I read the overview (`s0-header.mdx` and frontmatter description) of every lecture in the course order from `lectures/STORY_WRITER.md`: L1 lec04, L2 lec01, L3 lec05, L4 lec02, L5 lec08, L6 lec03, L7 lec09, L8 lec06, L9 lec07. I also spot-checked the callbacks this page makes into them.

## Overall verdict

Build 1, the dictionary (chapters 1–6), is the best story in the course so far. It has one concrete problem (1 TB, 170,000 words, no database, one file), and every chapter's last line is the next chapter's question. The numbers do real work: 500 GB a scan, a 3 MB index, 100 TB of copies, 2 TB on the job server. The "is it sorted? hold that thought" setup pays off in 5.3, and the old-orders hook pays off in 6.4. Chapter 5's "apple runs into ball" byte grid is the single best figure on the page.

Build 2, the key-value store (chapters 7–10), is clear clause by clause, but it has no situation. Nobody is writing, nothing gives a rate, and the disk size changes from chapter to chapter (100 TB in 8.2, a 1 TB cap in 8.4). The hand-off gives a reason and names what carries over, but not who needs the store, how fast the writes come, or why the data leaves S3 for local disks. Three sharp-reader holes sit in Build 2's mechanics: merge repointing, torn-record recovery, and fsync-per-put next to "very high throughput". The name reveal works, but the frontmatter description spoils it ("revealed as Bitcask").

The course close (§10.5) is concrete and mostly accurate. It has four mismatches with the overviews (see 10j).

Length: about 13.3k words of prose against a 12k budget. The best cuts are listed at the end, about 1,400 words in total, and none of them touches the plot.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 4 | 4 | 4 |
| 1 · A terabyte of words, and no database | 4 | 4 | 4 |
| 2 · Half a terabyte per lookup | 4 | 4 | 4 |
| 3 · Two files, and the brief said one | 4 | 3 | 4 |
| 4 · A hundred API servers need the file | 4 | 3 | 3 |
| 5 · Sunday's changelog arrives | 5 | 4 | 5 |
| 6 · The new file is ready | 4 | 4 | 4 |
| Hand-off, Build 1 → Build 2 (6.4 end, 7 opening) | 3 | 4 | 2 |
| 7 · Writes never stop, and the disks are cheap | 3 | 4 | 3 |
| 8 · A month later the disk is nearly full | 3 | 3 | 4 |
| 9 · The power fails halfway through a 1 MB value | 4 | 3 | 4 |
| 10 · You built a database out of files (10.1–10.4) | 4 | 4 | 3 |
| §10.5 course close | 4 | 4 | 4 |

---

## Frontmatter and header

**F1. The description spoils chapter 10's reveal.** `description: "… then an append-only key-value store on magnetic disks (…), revealed as Bitcask."` The header promises "only then find out what it is called", and 9.2 ends "it has a name". The description also lists every answer of Build 1 (byte-offset index, 16-byte header, meta.json, rolling deployment).
Fix: "Lecture 10: build a terabyte dictionary that answers from one file on S3 and survives a weekly update with no database, then a key-value store that takes every write on the cheapest disks and loses none."

**F2. Chapter 2's summary gives away the pause.** "A smaller file that knows where things are, and the one multiplication that decides where it should live." That names the index before 2.1 asks for it. Fix: "Every lookup reads half a terabyte. What would let you skip the meanings you don't want, and the one multiplication that settles where it lives."

**F3. Build 2 has no hook to match Build 1's.** Build 1 gets "a publisher hands you a dictionary, 170,000 words, 1 TB". Build 2 gets "Now the writes never stop, each one must survive a crash, and the disks are the cheapest kind there is." There is no user, no rate and no size. (See the hand-off and top fix 1.)
Fix: give Build 2 a one-line situation and one number, using only what the lecture has (check source). For example, the workload class that ran Riak (the Uber dispatch mention in 10.2), or "a store taking N writes a second onto a rack of hard disks".

**F4. "Where you are" is good.** It sets up Lecture 9's append-only file "that only mattered after a restart", and 7.2 pays it off: "Here the append-only file is not a backup of the data. It is the data." The Lecture 7 (S3) and Lecture 3 (MySQL key-value store) callbacks match those lectures' overviews. No change.

**F5. One "be able to" bullet spoils chapter 7.** "Design a store whose writes never seek" gives away the append-only answer. Fix: "Design a store that takes writes as fast as a cheap disk allows, and say what it costs in memory and disk."

---

## Chapter 1 · A terabyte of words, and no database. Where is apple?

Flow 4 · Clarity 4 · Engagement 4

**1a. The size contradicts the value.** "the value is two or three lines of meaning" and the card says "word → 2–3 lines". Then: "1 TB for 170,000 words, which works out to several megabytes per word … imagine every meaning with audio and video baked in." Two or three lines are not 6 MB, and every example is "a fruit". An engineer stops here.
Fix: say once that the size is set by the brief: "Two or three lines of text would make a few dozen megabytes; the publisher's entries carry audio and video, which is how 170,000 words reach a terabyte. Hold that thought too: binary values will matter in chapter 9." (check source for the audio/video framing). This also sets up fix 9a.

**1b. Class voice, and a term never explained.** "Sharper ideas come up fast at this point, and each is set aside… B+ tree pages and fancy formats like Parquet are over-engineering." "Come up" from whom? B+ tree is never explained anywhere on the page.
Fix: cut the paragraph down to one line: "You might reach for a hundred files routed by word, or a zip: both break the one-file rule. Start with the simplest thing that meets the brief." Then drop "kills the B+ tree pages" from 2.2.

**1c. The 500 GB is never turned into time.** "Half a terabyte per lookup is slow" is the one place where the brief's "numbers as plot" would bite hardest.
Fix: one sentence turning 500 GB into minutes at a typical sequential disk or S3 read rate (check source).

**1d. The "sorted? not yet, it comes back" beat is excellent.** No change.

---

## Chapter 2 · Half a terabyte per lookup. What would tell you where apple starts?

Flow 4 · Clarity 4 · Engagement 4

**2a. The index is called "small" before it is sized.** "Even in the worst case it is a short, sequential read of a small file." 2.2 then asks whether it fits, as if that were open.
Fix: "a sequential read of a file that holds no meanings at all. How small? That is the next question."

**2b. The 3 MB arithmetic appears three times.** The figure strip, its caption ("170,000 entries of about 17.6 bytes each come to about 3 MB"), and then the prose "So: 170,000 × (7.6 + 8 + 2) bytes = … about 3 MB."
Fix: cut the "So:" line and keep "Next to a terabyte of data, that is peanuts."

**2c. The entry format mixes text and binary.** "a word, its byte offset, and a comma and newline", with "the offset is an 8-byte integer". A comma-and-newline entry is text, where an offset up to 10¹² takes up to 13 digits. An 8-byte offset is binary.
Fix: "…so the offset needs 8 bytes as a binary integer (written as text it would take up to 13 digits; the estimate barely moves)."

**2d. The paragraph undercuts its own point.** "Don't take megabytes lightly, though: a million bytes still holds a lot of information…" comes right after "peanuts". Fix: cut it.

**2e. The 26-letter paragraph is fine, but it is the third "smaller index" idea in two chapters.** It can go if words are needed (see Cuts).

---

## Chapter 3 · Two files, and the brief said one. Where does the index stop?

Flow 4 · Clarity 3 · Engagement 4

**3a. The offset base changes silently.** In chapter 2, apple is at byte 0 of data.dict. In the one-file layout, the only statement of what offsets count from is in a caption: "Offsets in the map count from the start of the data." Chapter 4 then reads `bytes=2,992,016-2,992,029` for apple. I had to stop and add 16 + 2,992,000 myself.
Fix: one sentence in the prose after the stepper: "The offsets still count from the start of the data, so a read for apple goes to 16 + index_size + 0."

**3b. The four-ideas paragraph reads like a recap of proposals.** "The first ideas each work, at a price… a neat hack… Writing the data from the top down and the index from the bottom up, like a stack… The fourth idea is the interesting one." Four ideas in one paragraph, and the stack one needs a picture it doesn't get.
Fix: "A separator line works, but the reader checks every line for it. A fixed-size index region works, but wastes space and caps growth. Better: put the boundary itself at the very start." Then the pause.

**3c. A figure description leaks the classroom.** Fig 3·b desc: "a separator line or a fixed-size region were proposed." Fix: "…a separator line or a fixed-size region are the first ideas."

**3d. "AODB" is unexplained.** Fig 3·c labels: "your own database would start with AODB". Fix the label to a neutral example ("MYDB…") or explain the acronym in the caption.

**3e. The Go deeper box (Parquet footer, ZIP central directory, MP4 moov) is off-road.** It is accurate and nicely capped, but the chapter already makes the point with PNG and TIFF. A candidate cut.

---

## Chapter 4 · A hundred API servers need the file. Where does it live?

Flow 4 · Clarity 3 · Engagement 3

**4a. Where does n come from?** The storage must support "(file, offset, n)", and step 6 reads "that line, 14 bytes". But the index holds only word → offset. Nothing on the page says how a server knows a record is 14 bytes long. Chapter 6 then quietly gives the index a length ("apple at byte 100, 1,024 bytes long"), and 10.1 a "size of its record".
Fix: in 2.1 or 4.2, "The length is the next word's offset minus this one, so the map gives both" (or store the length in the index from chapter 2). Check source for which one the build uses, and make 6.1 and 10.1 match.

**4b. 100 TB is never priced.** "100 TB of storage paid for a hundred times over." Cost is the chapter's whole argument, and the number stops one step short.
Fix: one sentence with the monthly cost of 100 TB of SSD against 1 TB on S3 (check source).

**4c. The cost sermon runs long.** "Real system design is about doing the bare minimum at the bare minimum cost… It would be fast, and it would be a bad design." Keep the first sentence and the 1 TB-of-RAM example; cut the rest.

**4d. Cryptic labels.** Fig 4·c and Fig 6·d label the S3 file "H · I · D" with no key. Fix: caption "H, I, D: header, index, data".

**4e. The "isn't an S3 call per request slow?" paragraph is honest and good.** No change.

---

## Chapter 5 · Sunday's changelog arrives. Can you just rewrite apple's line?

Flow 5 · Clarity 4 · Engagement 5

**5a. Best chapter on the page.** The pause, the byte grid and "picture the code you would actually write, seek(0); write(...)" land hard. The sort payoff is earned.

**5b. Appending is rejected twice.** 5.1 rejects it ("apple is in the file twice, the file grows every week forever"), and 5.2 repeats it: "You could append apple's new meaning at the end … For a weekly batch that only brings back the duplicates." Fix: cut the 5.2 paragraph.

**5c. "Never write in place on disk" is stated too broadly.** Real databases overwrite fixed-size pages in place all the time, and the reader knows it. What broke here was a longer record overwriting a shorter one.
Fix: "The rule underneath: never overwrite a record in place when its size can change. A change goes into a new file."

**5d. The first sort is free only after it is done.** "Keeping the file sorted costs nothing extra after the first time." How do you sort a terabyte the first time? Fix: "Sort it once, an external sort over the terabyte, and after that the merge keeps it sorted for free." (check source)

**5e. Fig 5·b's caption comes before the reasoning.** "Appending the changelog to the end is crossed out" appears before the paragraph that rejects appending. Fix: move the figure after that paragraph, or drop "crossed out" from the caption.

**5f. A small motivation gap.** The job downloaded the file, but nothing says that an S3 object can't be patched in place at all. One clause would make 5.2's experiment feel less hypothetical: "(S3 couldn't do this anyway: an object is replaced whole)" (check source).

---

## Chapter 6 · The new file is ready. How does every server move to it?

Flow 4 · Clarity 4 · Engagement 4

**6a. The same failure is shown twice.** The Fig 6·b stepper walks through same-path garbage in four steps, and the top half of Clip 6·1 plays the same story again. That breaks the brief's "one representation per idea".
Fix: cut the clip's top half and keep only the new-path roll, or cut the stepper and move the clip up to 6.1.

**6b. The rollback setup never pays off.** 6.1 says "Overwriting also throws the old file away, so if the new one turns out to be corrupt, there is nothing to roll back to." The new-path design fixes exactly that, and the page never says so.
Fix: add to 6.3: "And dict1 is still there: if dict2 turns out bad, point meta.json back and deploy again." (check source)

**6c. The war story's parenthesis muddies the lesson.** "(Pushing the 3 MB index to the servers directly would also work. Every option has a variant; this one needs nothing new.)" Fix: cut it.

**6d. A vendor detail on the main road.** "table formats such as Apache Hudi keep an index from each record key to the file that holds it". Fix: cut it, or fold it into a Go deeper.

**6e. The options table has a confusing row.** "If the job runs late or the upload fails". For polling, "meta.json never changes, so nobody moves" is a good outcome, sitting in a row that otherwise lists failures. Fix: rename the row "If the job fails halfway".

**6f. "Drawing boxes is easy. These details … are the actual design."** This is a slogan, and 10.5 says it better. Fix: cut it.

**6g. The Lecture 5 callback is right** (its fleet pushed config through a real-time Pub/Sub). No change.

---

## Hand-off: Build 1 → Build 2 (end of 6.4, opening of 7)

Flow 3 · Clarity 4 · Engagement 2

What works: the reason is stated ("it got away with that because writes came once a week, in one batch… What if they don't?"), and so is what carries over ("a file, byte offsets and a small map in memory. The order you use them in has to change."). That last line is good.

What's missing:
- **Who and how much.** "Suppose writes arrive all the time" is a hypothetical with no user. Build 1 had a publisher, 170,000 words and 1 TB. Build 2 has nothing until chapter 8 makes up "a month" and two different disk sizes.
- **Why leave S3.** The data moves from one object on S3 to local magnetic disks without a word. The reader's first question is "why not append to the S3 file?" The answer, that an object can't be appended to and is replaced whole, is the cleanest possible bridge (check source).
- **The orders thread drops.** The lecture opened on old orders. One clause could tie Build 2 to the hot side of the same system: the store that takes the firehose before anything is cold enough for S3 (check source; only if the lecture supports it).
- **A small spoiler.** Ch 7's opening says the store "does reads, writes and deletes in O(1)" before any design. Fix: "…and by the end of chapter 7 you'll know why every operation it does costs the same."

Fix (one paragraph to replace the end of 6.4 and the start of 7): "From the first scan to the rolling deployment, every step was the simplest thing that worked, and it got away with that because writes came once a week, prepared off to the side. Now take writes that never stop: [one workload line and rate from the lecture, check source], each safe on disk before it is acknowledged. A terabyte file rebuilt per write is out, and S3 can't append to an object, so the data moves to the cheapest local disks there are. The tools stay the same, a file, byte offsets and a small map in memory. The order you use them in changes."

---

## Chapter 7 · Writes never stop, and the disks are cheap. Where does a put go?

Flow 3 · Clarity 4 · Engagement 3

**7a. An idea nobody raised gets rejected.** "buffering writes in a sorted map in memory and saving them later is out". The reader never proposed a sorted map, so this reads like an echo of the classroom. Fix: "You might collect writes in memory and flush them in batches. That's out: a put must be on disk when it is acknowledged."

**7b. "Zero seek" ignores the gets.** "The head is already where the last write finished, so there is no seek … as long as the disk is busy with this one stream of writes." Gets read anywhere on the same disk, so the head does move. 8.4 says "each get still costs one seek". Fix: add "Reads will pull the head away, one seek each; the writes never add one."

**7c. fsync on every put, on a hard disk, against "very high throughput".** The code does `f.flush(); os.fsync(...)` per put. On a magnetic disk that caps you at roughly one write per rotation, and an engineer will doubt 10.1's "writes have very high throughput and very low latency".
Fix: one sentence on how this is paid for, for example group commit or a configurable sync policy (check source for what Bitcask offers). Or soften 10.1 to "as fast as the disk can persist them".

**7d. −1 as a delete marker invites the obvious question.** What if a user stores the value −1? Fix: "−1 here stands for a marker the store reserves, a tombstone, that no real value can look like." (check source for the term and the mechanism)

**7e. The Lecture 3 callback is right** (its MySQL store set `expired_at` to −1). The contrast "there it updated a row in place, here it can only be appended" is good.

---

## Chapter 8 · A month later the disk is nearly full. What is filling it?

Flow 3 · Clarity 3 · Engagement 4

**8a. The disk size contradicts itself.** 8.2: "On a 100 TB disk, how big should each file get?" 8.4 and Clip 8·1: "On a 1 TB disk, usage can never pass 1 TB." Same store, two disks, no explanation.
Fix: pick one disk and one write rate, and let the number make the problem: "At N writes a second of M bytes, a 1 TB disk fills in about X days" (check source). Then use that disk in 8.2 and 8.4.

**8b. The pause answer is a stub.** "Small, with a new file started each time the current one fills up. The reasons are below." Fix: put the reason in the reveal: "Small, 100 MB to a few GB. A tens-of-terabytes file can't be cleaned or rebuilt in pieces." Then trim the next paragraph.

**8c. Merge repointing can move a key backwards.** `repoint_index(merged_file)` and "the map has to be repointed for each of them". But if K1 was written again into the active file while the merge ran, repointing K1 to the merged file serves an older value. The reader who has been thinking with you asks this.
Fix: "Repoint a key only if the map still points into one of the files being merged; if it already points into the active file, a newer write won." (check source)

**8d. The merge table holds values.** `tmp[rec.key] = rec` holds full records, so merging three 1 GB files can need gigabytes of RAM, in a design whose one hard limit is RAM.
Fix: hold the key → (file, offset) of the latest record, then copy the live records across (check source). Or say why holding them is fine at this file size.

**8e. "Usage can never pass 1 TB; the moment it does, the store crashes"** is a tautology. Fix: "When usage reaches 1 TB the next append fails, and the store stops taking writes."

**8f. The sawtooth clip and its pause question are strong.** No change.

---

## Chapter 9 · The power fails halfway through a 1 MB value. What does the next get return?

Flow 4 · Clarity 3 · Engagement 4

**9a. The reason given for length prefixes is unbelievable; the real one is better.** "read from an offset until you hit a newline. That reads one byte at a time: one read call per byte". Buffered readers don't make a system call per byte, and any engineer knows it. The real problem is that a value can contain the newline byte (chapter 1's audio and video), and that without a length you don't know how much to fetch.
Fix: "A newline can't mark the end of a value that may itself contain newline bytes, as any audio or video will. And without a length you don't know how many bytes to fetch. So write the sizes first…"

**9b. What does the CRC cover?** 9.2 says the CRC is computed over "its sizes, key and value". The full record is "CRC, timestamp, key size, value size, key, value". Is the timestamp covered? A torn timestamp would otherwise go unnoticed. Fix: "a checksum over everything after it in the record" (check source).

**9c. "Timestamp (used to settle conflicts)": what conflicts?** Nothing on a single-node store has conflicted so far. Fix: say what it is for, in one clause (check source), or leave it out until 10.2, where Riak's replicas give it a reason.

**9d. "Skip it": skip to where?** After a torn record, a restart scan that trusts VSZ jumps into the middle of the next record and loses its place for everything after. The CRC tells you the record is bad, not where the next one starts. Fig 9·d shows "the next record checks out", which assumes the reader found it.
Fix: "On restart, the scan stops at the first record whose CRC fails, and the file is cut there before new records are appended. Nothing after a torn record was ever acknowledged." (check source for what the build does)

**9e. Class leak.** "A lot of designs stop at the sizes." Fix: "It is tempting to stop at the sizes."

**9f. The retroactive dictionary record (Fig 9·c) is a nice touch.** Its numbers check (apple = 5, "a round fruit" = 13). No change.

---

## Chapter 10 · You built a database out of files (10.1–10.4)

Flow 4 · Clarity 4 · Engagement 3

**10a. New map fields appear without a reason.** "the file it is in, the size of its record, the offset, and the timestamp". Chapter 8's map held file and offset only. Fix: "…the size, so a get fetches the record in one read, and the timestamp…" (and see 4a).

**10b. "I/O saturation" is defined loosely.** "Nothing sits idle waiting on I/O: the device is kept busy, which is called I/O saturation." Fix: "The disk is kept busy doing useful sequential work, so you get close to everything the hardware can deliver."

**10c. The Riak paragraph packs six ideas into one.** The Lucene/Elasticsearch analogy, the ring, partitions, virtual nodes, N replicas and masterless are all there. Keep the ring + vnodes + "a Bitcask at every point" (it ties to Lecture 9). Cut the Elasticsearch/Lucene analogy.

**10d. Fig 10·d and the table under it say the same thing.** Rows a–c are identical. Keep the table (it has the two extra rows) and cut the figure, or keep the figure and cut rows a–c.

**10e. The "build it yourself" paragraph runs long.** Keep the week estimate, the two open questions and the paper. Cut "One engineer who built one and benchmarked it…" and the Prometheus line.

**10f. The rule line is excellent.** "Any file can be a database if you keep a small map in memory, always know how many bytes to read, and never write in the middle of it." No change.

**10g. "What you can now do" is concrete.** It overlaps with the overview's "What you'll be able to do", which is fine. The recall questions are good, and the four cover both builds.

---

## §10.5 · Ten lectures in. What can you build now?

Flow 4 · Clarity 4 · Engagement 4

It is concrete: one named artifact per lecture, in course order, with a closing question ("what would the code inside it actually do, and what does that cost?") that this lecture earned in 5.2. Checked against each overview:

| Lecture | §10.5 says | Overview covers | Verdict |
|---|---|---|---|
| 1 (lec04) | presence dot, heartbeats + TTL; blog through going viral | green dot; Medium-like blog's first month ending on a viral post | Match |
| 2 (lec01) | folded into "copies at every level from the browser to a materialized view (Lecture 1, Lecture 2)" | caches along the route, scaling servers and the DB, queues and Kafka for publishing, the clap lost update, polling/WebSockets/SSE/push | **Under-described and blurred with L1** |
| 3 (lec05) | 120 seats, a few SQL words at a time | check-in locks **and** a key-value store with TTL on one MySQL table | **Build 2 missing**, though §7.3 calls back to it |
| 4 (lec02) | Slack messages to every member | database families field guide + Slack | Match (Build 1 omitted, acceptable) |
| 5 (lec08) | load balancer, fleet, lock across machines | same | Match |
| 6 (lec03) | "Unique 64-bit IDs without a central counter" | `get_id()` from scratch, then Amazon, **Flickr (a central ticket counter)**, Snowflake, Instagram; time-first IDs and cheap pagination | **Inaccurate**: Flickr's answer *is* a central counter |
| 7 (lec09) | photos behind a CDN, hashtag counts through Kafka | same | Match |
| 8 (lec06) | avatar service and unread badge | Gravatar, photo tags, unread badge | Match |
| 9 (lec07) | cache from one hash table to a ring | **CDC for a complete analytics copy**, then the Redis-like cache | **Part 1 missing** |
| 10 | two storage engines from files | same | Match |

**10j. Fixes for the close:**
- L1/L2: "A presence dot that never lies, from heartbeats and a TTL, and a blog through its first viral post (Lecture 1). The same blog under load: caches along the whole route, queues for the slow work, a clap counter that never loses an update, and claps that arrive live (Lecture 2)."
- L3: "A booking that gives 120 seats to 120 people at once, and a key-value store with expiry on one MySQL table (Lecture 3)."
- L6: "Unique IDs minted on many machines at once that sort by time (Lecture 6)."
- L9: "An analytics copy that can't drift, through change data capture, and a cache built from one hash table up to a ring of nodes (Lecture 9)."
- Optional: one clause back to this lecture's opening, so the course ends where the lecture began: "…and the old orders, still queryable on S3."

---

## Retelling in 7 sentences

1. With no database allowed, a 1 TB, 170,000-word dictionary stored as a plain text file costs about 500 GB of reading per lookup.
2. An index of word → byte offset is only about 3 MB (170,000 × ~17.6 bytes), so every server holds it in a hash map and each lookup is one pointed read.
3. To keep one portable file, put a fixed 16-byte header (magic `OUR_DICT`, version, index size) in front of the index and the data, so a reader knows where the index stops without searching.
4. Rather than 100 copies (100 TB), keep one copy on S3 and read it with ranged GETs, because the design only ever needs "read n bytes at an offset".
5. Sunday's changelog can't be written in place (a longer apple overwrites ball), so a separate job merges the sorted dictionary and sorted changelog into a new file in one pass, uploads it to a new path, updates `meta.json`, and triggers a rolling deployment, so answers are mixed for a while but never garbage. That same ability is what lets old orders live queryably on S3.
6. For a store with constant durable writes on cheap magnetic disks, append every put and delete (delete = put of a marker) to one file, keep key → offset in RAM, rotate small files, and merge and compact the read-only ones with a temporary hash table, keeping the disk-usage sawtooth under the cap.
7. Each record is CRC | timestamp | key size | value size | key | value, so torn writes are detected and skipped. The result is Bitcask (Riak's default backend), whose one hard limit is that every key must fit in memory, and which leads on to LSM trees.

**How hard was it?** Easy for Build 1. Every chapter has one problem and one fix, and the numbers (500 GB, 3 MB, 100 TB, 2 TB) carry the order. Build 2 was harder in one specific way: I could say *what* each piece does, but not *who* the store is for or *how big* anything is. Sentence 6 is a list rather than a plot. I hesitated over the disk size (100 TB or 1 TB?) and over what happens to the records after a torn one.

---

## Top 10 fixes, ranked by impact

1. **Give Build 2 a situation and a number at the hand-off (end of 6.4, ch 7 opening, header Build 2 blurb, F3).** Say who writes, at what rate, how large, and why the data leaves S3 ("S3 can't append to an object", check source). Then reuse that number in chapter 8 to make the disk fill.
2. **Fix the disk-size contradiction in chapter 8 (8.2 "100 TB" vs 8.4 and Clip 8·1 "1 TB").** Use one disk and one fill time computed from fix 1's rate.
3. **Say where a read's length comes from (2.1 or 4.2, then 6.1 and 10.1).** The index holds only offsets, yet chapter 4 reads exactly 14 bytes, chapter 6 adds "1,024 bytes long", and 10.1 adds "size". State next-offset-minus-offset, or store the length, from chapter 2 on.
4. **Close the torn-record recovery hole (9.2, Fig 9·d).** Say what the restart scan does after a CRC failure (stop and cut the file there before appending, check source), state that the CRC covers everything after it, including the timestamp, and give the timestamp a reason or drop "settle conflicts".
5. **Fix merge repointing and merge memory (8.3 code and text).** Repoint only keys still pointing into the merged files, so a newer write in the active file wins. Keep pointers, not values, in the temporary table, or say why values fit (check source).
6. **Make the write speed believable (7.2 code, 7.2 "zero seek", 10.1 "very high throughput and very low latency").** Acknowledge that fsync per put on a hard disk is the bottleneck and how it is paid for (check source), and that gets still seek.
7. **Fix the four mismatches in the course close (§10.5, 10j).** Lecture 6 "without a central counter" is wrong. Lecture 2 is blurred into Lecture 1 and loses its queues, lost update and live claps. Lecture 3's MySQL key-value store is missing (§7.3 relies on it). Lecture 9's CDC half is missing.
8. **Replace the "one read call per byte" argument with the real one (9.1).** Binary values contain newline bytes, and without a length you can't fetch in one read. Tie it to chapter 1's audio and video, and reconcile chapter 1's "two or three lines" with "several megabytes per word" (1a).
9. **Remove the double representations and repeats (cuts below).** Fig 6·b vs Clip 6·1's top half; the 3 MB arithmetic three times (2b); the second rejection of appending (5b); Fig 10·d vs the 10.3 table; and "think at the level of the code" in 5.2, which 10.5 says again.
10. **Remove spoilers and classroom leaks.** The frontmatter description ("revealed as Bitcask"), the chapter 2 summary, the "writes never seek" bullet, the "O(1)" in ch 7's opening, "were proposed" in Fig 3·b, "Sharper ideas come up fast" (1.2), "The fourth idea is the interesting one" (3.1), "a sorted map in memory" (7.2), and "A lot of designs stop at the sizes" (9.2). Also soften "never write in place on disk" to "never overwrite a record whose size can change" (5c).

---

## Best cuts (target: about 1,300–1,400 words to reach ≤ 12k)

| # | Where | Cut | ≈ words |
|---|---|---|---|
| 1 | 6.1 / 6.3 | Fig 6·b stepper steps, or the top half of Clip 6·1 and its clip-as-text (same failure twice) | 150 |
| 2 | 10.3 | Fig 10·d *or* rows a–c of the table; trim "build it yourself" to the week, the two questions and the paper | 170 |
| 3 | 10.2 | The Elasticsearch/Lucene analogy, "Most Riak setups run Bitcask underneath" | 80 |
| 4 | 3.3 | The Go deeper box (Parquet/ZIP/MP4); PNG and TIFF already make the point | 90 |
| 5 | 3.1 | Compress the four-ideas paragraph to two sentences (3b) | 80 |
| 6 | 1.2 + 2.2 | The "Sharper ideas" paragraph and the "kills the B+ tree pages" clause; the 26-letter paragraph | 130 |
| 7 | 2.2 | The repeated "So: 170,000 × …" line and "Don't take megabytes lightly" | 70 |
| 8 | 4.1 / 4.2 | The cost sermon after its first sentence; merge "S3 is not special" into one sentence | 80 |
| 9 | 5.2 / 5.3 | The second rejection of appending; the "worth a habit" paragraph (10.5 says it); "so much of computer science is obsessed with sorted data" | 120 |
| 10 | 6.2–6.4 | The push-the-index parenthesis, "Drawing boxes is easy", the Hudi clause; shrink the options table to the two rows that matter (how it works, what it costs) | 150 |
| 11 | 8.2 / 8.4 | The "reasons are below" stub (fold into the reveal); the "many more settings" sentence | 60 |
| 12 | 9.2 | The Go deeper on why integrity gets skipped | 60 |
| 13 | 10.4 | Two "What you can now do" bullets that repeat the 10.3 table (merging, "know the price") | 50 |
| | | **Total** | **≈ 1,290–1,400** |

The fixes above *add* about 250–350 words, mostly in Build 2. So these cuts alone land near 12.3k. To get under 12k, also cut Fig 6·b entirely (keep the clip) and shorten the 6.2 options table to prose: about 150 more words.
