=== PAGE: lecture overview ===

Lecture 10 · week 5, day 2 · running case: a word dictionary with no database, then Bitcask

# Files as a database

Two storage engines built from plain files: a read-only dictionary on S3 with a header, an index and a weekly merge, and an append-only key-value store with one map in memory, revealed at the end as Bitcask.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1A dictionary with no databaseServe every English word and its meaning with no database at all: one portable file, read-mostly, updated every Sunday. First the requirements, then the format, then the clever ideas set aside.3 sections · §1.1–1.3

- 2Finding one word fastThe naive lookup reads half a terabyte per request. One small index, and one multiplication, turn it into a single pointed read.3 sections · §2.1–2.3

- 3One file you can shipThe index made two files, and the brief said one. Putting both in one file raises a new question: where does the index stop? The answer is the header, the trick behind every file format.3 sections · §3.1–3.3

- 4Serving it from S3One file, many API servers. Copying it to each server is the obvious move and the costly one. Pin down the property you need, random reads over the network, and S3 turns the file into a database.3 sections · §4.1–4.3

- 5The weekly updateSunday’s changelog changes apple’s meaning. You can’t edit a file in place, so build a new one, and keeping the file sorted makes that a single merge pass.3 sections · §5.1–5.3

- 6Switching every server to the new fileThe new dictionary is ready. Overwrite the old one and servers read garbage. Upload it to a new path, point a small meta.json at it, and let a routine deployment do the reload. Then see why reading a few bytes from S3 matters so much.5 sections · §6.1–6.5

- 7Fast writes on a cheap diskThe second engine must take writes as fast as a magnetic disk allows, and lose nothing. Append every put to the end of one file, make delete a put, and keep one map in memory for reads.4 sections · §7.1–7.4

- 8Files that never stop growingThe store never deletes anything from disk, so it fills up. Split it into small files with one active writer, merge and compact the old ones, and watch disk usage draw a sawtooth.4 sections · §8.1–8.4

- 9Record format and integrity“Write key, value” is too casual. Prefix every record with its sizes so one read gets it all, and lead with a CRC so a half-written record is caught, not served.3 sections · §9.1–9.3

- 10It’s called BitcaskOne map of keys in memory, append-only files on disk, merges in the background, a CRC on every record: that is Bitcask. What it can’t do, where it runs, and how it differs from the LSM trees coming next week.3 sections · §10.1–10.3

- 11What to keepThe same few ideas built both engines. Here they are side by side, with the heuristics the class kept returning to, and where the course goes next.

[summary] About this class where this page sits in the course

This is day 2 of week 5, and it continues the week’s subject, storage engines. The agenda is two problem statements: a word dictionary without any database, and a superfast key-value store. Both were chosen to build foundational blocks, for designing interesting new systems and for getting the most out of the ones that already exist.

Neither is a toy. Both systems are actively used in production, to a huge extent; this is not something that is just theoretical. The problem statement was put together on purpose to touch a lot of the critical building blocks used day in and day out in the real world: file formats, indexes, object storage, rollouts, append-only logs and checksums all turn up before the end.

How this page is built. Each engine is designed from nothing, one step at a time, and named only at the end, as in class. The class’s question-and-answer time is folded into the chapter it answers.

### Our storage so far #

Yesterday’s session built a cache like Redis: one hash table in memory, every byte counted, then split across many nodes with a ring to find each key, and an append-only file to come back after a restart. Earlier still, Lecture 3 built a key-value store on top of MySQL, where a delete was an update with a magic value and a cleanup job removed rows in batches.

- back in · Lecture 9: routing a key to its node, and the byte budget

- back in · Lecture 9: the append-only file

- back in · Lecture 5: reactive rather than polling

- back in · Lecture 4: Redis Pub/Sub

- back in · Lecture 3: delete with a magic value, and batched cleanup

Today the data no longer fits in memory and must survive restarts, so both engines live in files. Engine 1, the dictionary (chapters 1–6), is read-mostly and changes once a week. Engine 2, the key-value store (chapters 7–10), must take writes as fast as the disk allows. Chapter 11 puts the two side by side.

Lecture 10 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-dictionary-no-database ===

# Files as a database, chapter 1: A dictionary with no database

Lecture 10 · Files as a database · chapter 1 of 11

§ 1

## A dictionary with no database

Serve every English word and its meaning with no database at all: one portable file, read-mostly, updated every Sunday. First the requirements, then the format, then the clever ideas set aside.

About 14 min · class 00:00–00:20, Q&A 02:56

- Notation, same in every figure

- reader

- cdn

- api server

- remote cache (redis)

- master / database

- replica

- queue (oldest leaves right)

- stream / broker

- worker, consumer

- request

- ack, success

- failure, stale

- async copy (head on whoever starts it)

[figure title] This lecture’s own marks

[figure description] The marks this lecture adds to the course notation: a file bar split into header, index and data; S3 as a cloud; an in-memory map as a small key and value table; a caret under a file marking a byte offset; a magnetic disk platter; a short arrow appending to the tail of a file; the active file that takes the writes; and a record bar with CRC, timestamp, key size, value size, key and value.

[figure labels] H · I · D · header · index · data · s3 · S3 (or any store) · map · in-memory map · byte offset · magnetic disk · append · active · active file · CRC · TS · KSZ · VSZ · K · V · one record

[caption] This lecture’s own marks, on top of the course notation above. The file bar, the offset caret and the in-memory map appear from chapter 2; S3 from chapter 4; the disk, the append arrow, the active file and the record from chapter 7.

A publisher hands you a dictionary: 170,000 English words with their meanings, 1 TB in all, and promises a changelog every Sunday. Users will ask for one word at a time. The catch is that you may not use MySQL, Postgres, MongoDB, Redis, Elasticsearch or any other database. Whatever you build lives in plain files.

This chapter pins down the requirements, picks the file format, and sets aside a handful of clever ideas, each for a reason that matters later.

§ 1.1

## The problem: a dictionary, no database

Four axes, one portable file, and a dictionary deliberately too big to copy.

About 5 min · class 00:00–00:05 and 00:09–00:12, Q&A 02:56

Build a word dictionary without any traditional database: no MySQL, no Postgres, no MongoDB, no Redis, no Elasticsearch, no Memcache, nothing. Every off-the-shelf store is ruled out, so you have to be creative about where the words live and how you find one.

Any system design splits into two halves, storage and compute. Compute is the API servers; storage is where the data lives, normally a database. Here the storage half has no database, and the dictionary still has to be “quote-unquote” scalable on both sides, storage and API servers. You shouldn’t have to worry about scale, though some obvious constraints will remain.

Performance is not today’s problem. A high response time is acceptable: there are hundreds of known ways to make a system faster, caching and batching among them, and earlier sessions covered them. The focus here is the constraint itself, no database.

What is required is portability. Keep an eye on it: every design in these chapters that breaks portability is flagged, with a small one file tag where it is rejected, and why it matters so much becomes clear in the next system and next week. coming later · week 6: why one portable file matters

It is a standard English dictionary: English words and their meanings. Serving it is mostly read-only; think how rarely the Oxford dictionary changes. There are no live, pointed updates. Once a week, say every Sunday, a changelog file arrives by email holding only the words that changed and their new meanings, and you apply it to whatever store you have built.

A lookup is always a single word. There is no autocomplete: given a word, return its meaning; if the word does not exist, return 404. The whole dictionary is 1 TB, and it holds 170,000 words.

[figure title] The brief: a dictionary with no database

[figure description] A requirement card for the dictionary, with four tabs along its top: storage, query, portability, seamless updates. Inside: a 1 TB file of 170,000 words; one word in, its meaning out, else 404; a key-value store from a word to two or three lines; scalable on storage and API sides; very read-heavy, far beyond 1000 to 1; mostly read-only; a changelog every Sunday and no live updates; a high response time is fine; one portable file. Along the bottom every database is struck out in red: no database at all. Under the card: 1 TB on purpose, too big to copy everywhere.

[figure labels] storage · query · portability · seamless updates · 1 TB · 170,000 words · one word in → meaning out, else 404 · key → value: word → 2–3 lines · scalable: storage and api sides · read-heavy: ≫ 1000 : 1 · mostly read-only, like Oxford · changelog every Sunday · no live updates · high response time is OK · one portable file · mysql postgres mongodb redis elasticsearch memcache · no database at all · 1 TB on purpose: too big to copy everywhere

[caption] Fig 1·aThe brief, as a card the later chapters refer back to. The four tabs are the axes every design is judged on; the struck-out row is the one rule with no exceptions. Requirement words from the class board at 00:22.

That works out to several megabytes per word, far more than any definition needs. The size is on purpose. At 1 TB, copying the dictionary onto every API server costs too much, and that is what forces the storage and portability decisions of chapter 4; with a small file you would simply copy it everywhere. To make the number honest, imagine every meaning with multimedia baked in: audio, video, a visualisation.

Three more requirements make the brief precise. The dictionary must be searchable by key: it is a key-value store, where the key is the word and the value a two- or three-line meaning. It is very read-heavy: a thousand reads to one write would understate it, and the real ratio is much more skewed than that. And adding or changing one word should not “boil the ocean”, with heavy IO or a scan of every file for one small change. A single-word update indeed cannot be very costly. But updates arrive as one weekly batch, so one huge processing pass a week is acceptable.

Every design that follows is judged on four axes: storage, query, portability and seamless updates. They are the four tabs on the card.

§ 1.2

## JSON, or a plain text file?

The first decision is what the file looks like. One format lets you read one line; the other makes you read everything.

About 4 min · class 00:05–00:10

The first proposal was a choice between two formats: a text file or a JSON file. Querying JSON means unmarshalling it, which is a very expensive process, and that alone tilts the choice towards the text file.

The deeper problem is the format itself. A lot of people put a lot of data in JSON files, and in this use case it hurts most: to check whether one word exists, you read the entire JSON file, deserialize it, build an in-memory object such as a hash map, and only then check. With a 1 TB dictionary that is really costly, and the format gives you no direct way to reach one entry without reading the whole file. The usual fix when JSON must hold many records is JSON Lines, one JSON value per line, which “may be processed one record at a time” jsonlines.org ↗, so a reader streams it instead of parsing one giant document. It still has no index, so finding one word is still a scan.

So pick a simple text file.

[figure title] A plain text file

[figure description] The dictionary as one plain text file, one line per word with its meaning: apple, a fruit; amazon, a rainforest; and so on, 1 TB in all. Beside it, text file has a green tick and JSON file is struck out in red, because checking one word would mean reading and parsing the whole file. No word appears twice.

[figure labels] text file · JSON file · must read + parse · all of it · apple,a fruit · amazon,a rainforest · 1 TB · one line per word: word , meaning · no word twice

[caption] Fig 1·bThe dictionary as one plain text file: one line per word, the word, a comma, its meaning. JSON is struck out because checking one word means reading and parsing all of it. Redrawn from the class board at 00:20–00:22.

What goes on each line? One idea was to write the file like a write-ahead log, with entries saying “this word was updated with this meaning”. That idea was not taken up; the format settled on the word and its meaning. It is CSV-like, one line per word: apple,a fruit, a newline, then amazon and its meaning, and so on.

It is tempting to allow the same word twice, so that an update could simply be written as another line. In fact the dictionary must not contain the same word twice. There are no columns here, only words and meanings; imagine the file opened in any text editor with repeats in it, and remember that a portable file can’t carry duplicates. That becomes a requirement of its own: no repetitive entries.

Will you keep the file sorted? The first answer was no: response time isn’t a constraint, so sorting brings nothing yet, and words can sit in any order. For starters, that is accepted. Keep the question in mind, though: we come back to it in 5.3, when the weekly update needs it.

B-trees came up at this point too, and were deferred on purpose. It is more fun to discover the design step by step, and discovering it yourself is what makes it stick.

§ 1.3

## Clever ideas, set aside, and what “portable” means

Several sharper ideas arrived at once. Each is good somewhere; each is set aside here for a reason.

About 5 min · class 00:12–00:20

With the requirements settled, the proposals got sharper. Every one below is a real technique, and the reason each was set aside is part of the lesson.

### Ideas set aside #

- Sort by key. Without sorting, the argument went, there is no efficient way to search. It was not ruled out: the design simply goes a simpler way first, an unsorted file plus an index (chapter 2), and sorting returns in 5.3.

- Shard into many sorted files. Split the dictionary into, say, a hundred sorted files and route each word to the file responsible for it, the routing pattern of the previous session, so disk seeks stay minimal. one file Rejected: with multiple files you kill portability. back in · Lecture 9: routing a key to its node

- One zip of many folders. Call a single zip holding hundreds of folders “the file”. one file Rejected: you would still have to extract it to use it. It is still many logical files, often compressed, so there is no direct byte-offset read into the dictionary’s data. The ZIP format does carry its own small index: a central directory near the end of the archive records, for every member, the offset of its local header, so a reader can seek straight to one member without unpacking the rest PKWARE APPNOTE ↗.

- Logical partitions inside one sorted file, with a header-like section saying which region of the file holds which range of keys. A good idea, and complex enough to come back to later.

- Encode the records in Parquet (or Avro and similar formats): a key plus a variable-size value, accepting some decoding cost. Not today. Not many people know these formats, and the aim is to keep it really simple; the points behind the idea will all be used, just not through Parquet.

### What portable means #

Portability means literally one file, in some format, holding everything needed to read it and write to it. You copy it and you ship it. Not tens or hundreds of files that only one specific piece of software can read. SQLite is a real-world example: “A database in SQLite is a single disk file”, and the format is cross-platform, so a database created on one machine can be copied to another architecture and used there sqlite.org ↗.

[figure title] One file, not a folder

[figure description] Three options. Sharding the dictionary into a hundred files, a.dict to z.dict, with each word routed to its file: crossed out in red. One zip holding many folders: crossed out, because it is still many files inside. One file bar with a green tick: literally one file you can copy and ship.

[figure labels] a.dict … z.dict · ×100, shard by word · dict.zip · still many files inside · literally one file: · copy it, ship it · one file

[caption] Fig 1·cTwo ways to get “many files” in through the back door, both rejected, and the one thing that counts as portable: a single file you can copy and ship.

The one-file rule can look like a random constraint. It isn’t: it is the foundation for hundreds of systems, and the reason becomes clear by the end of the solution.

Why go simpler when sharper ideas are on the table? On purpose: the simple direction makes the base concepts you need to build anything queryable come clear.

The rule for this whole chapter

Keep it simple, and discover the design one step at a time.

Start from the simplest thing that meets the constraints, a text file, and add structure only when a number or a requirement forces it. That is where the power and the beauty of a system show. The next chapter takes the first step.

[figure title] One step at a time

[figure description] A staircase of three steps rising left to right. A small figure stands on the first step beside a text file; the next two steps hold only question marks: start with the simplest thing, then discover the design one step at a time.

[figure labels] text file · ? · ?

### What this simulates #

On AWS you can upload any plain CSV file to S3 and still query it seamlessly with a service called Athena. In the lecture’s telling, Athena creates an index that it keeps handy with the file, and on a request goes to the file, reads the records and serves them.

More precisely

Athena does not keep a per-key index for a CSV file: it runs SQL by scanning the files a query touches and bills per TB scanned. Partitioning docs.aws.amazon.com ↗, compression and columnar formats such as Parquet docs.aws.amazon.com ↗ cut how much it reads. The dictionary shares the idea of querying plain files on S3 without a database server, but its design (an in-memory key index plus ranged reads) is a point-lookup store, not how Athena works inside.

aws.amazon.com ↗

The dictionary simulates that kind of compute engine: not at that scale, but how its builders would have thought about querying simple files, and how they might have implemented it. The same ideas have a ton of other applications. (The note above says where the comparison with Athena stops.)

Lucene came up as a comparison. It tokenizes text and stores document IDs against keys, and one Lucene index is a single file that can be very large; here the value would be the two- or three-line meaning instead. More precisely, a Lucene index is made of segments, each “a fully independent index”, plus a segments_N commit file, and the optional compound format packs one segment’s files into a single .cfs file lucene.apache.org ↗. Good parts, kept one level down for now: the simple version first, then the next level.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name the four axes the design is judged on, and the one constraint that rules out sharding the dictionary into many files.

[summary] Show answer

Storage, query, portability and seamless updates. Portability rules sharding out: portable means literally one file holding everything needed to read and write it, easy to copy and ship. A hundred sharded files, or a zip of many folders, breaks that.

Why is a 1 TB JSON file a poor store for single-word lookups, even if you have a fast parser?

[summary] Show answer

The format gives no direct way to one entry. To check one word you read the whole file, deserialize it and build an in-memory object before you can look, and at 1 TB that is really costly on every lookup. JSON Lines streams record by record, but it has no index either, so a lookup is still a scan.

Updates arrive once a week as a changelog. What does that relax, and what does it not?

[summary] Show answer

It relaxes the cost of applying updates: there are no live, pointed updates, and since the changes come as one weekly batch, one huge processing pass is acceptable. It does not relax “no repetitive entries”: an updated word can’t simply be appended as a second line, because the portable file must never hold the same word twice.

Concepts in this section: storage vs compute · key-value store · four axes · no repetitive entries · portability = one file

Contents of this lecture ↑

Lecture 10, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-finding-one-word ===

# Files as a database, chapter 2: Finding one word fast

Lecture 10 · Files as a database · chapter 2 of 11

§ 2

## Finding one word fast

The naive lookup reads half a terabyte per request. One small index, and one multiplication, turn it into a single pointed read.

About 15 min · class 00:20–00:35, Q&A 02:59 and 03:01

A user asks for “apple”. The 1 TB dictionary sits on disk as plain lines, one word per line, in no particular order. Where is apple, and how much of the file do you have to read to find it?

§ 2.1

## Start naive: scan the file

Before reaching for B+ trees, look at what the simplest lookup costs.

About 4 min · class 00:20–00:24

How would you search this file? A tempting answer reaches for all the machinery at once: binary search, offsets stored as indexes, B+ tree pages, 8 KB blocks, and 1,000 keys kept in memory. Those numbers come from real databases: PostgreSQL stores every table and index as fixed-size pages, usually 8 kB postgresql.org ↗, and page-based B+ trees matter when an index is too big for RAM. As 2.3 shows, that is not the case here. One piece of the idea does survive, the offset, in 2.2.

And why only 1,000 keys in memory? Far more fit. For a very simple word dictionary all of this is over-engineering: no B+ trees, nothing fancy. Keep it very simple, because that is where you see the power and the beauty of the system.

So start with the naive design. No traditional database is allowed, so store the dictionary in a simple text file in CSV format: first the key, then the gigantic meaning for that key. The naive lookup opens the file, reads it line by line until it finds the key, stops, reads the meaning and returns it.

[figure title] The naive lookup scans the file

[figure description] The naive lookup reads the 1 TB file data.dict line by line from the top until it finds the word (the blue arrow down its left edge). A bracket over the whole file reads worst case 1 TB; a bracket over the upper half reads average 0.5 TB, 500 GB per request. Every request pays it again.

[figure labels] apple,a fruit · amazon,a rainforest · data.dict · 1 TB · read line by line · until the word · average: 0.5 TB · = 500 GB per request · worst case: 1 TB · every request, again

[caption] Fig 2·aThe naive lookup. The read itself is the scan (blue): line by line from the top until the word turns up. Redrawn from the class board at 00:22, where the scan was the red arrow down the file’s edge.

Doing that for every single read is very expensive, and a dictionary is a very read-heavy application. In the worst case every request reads the whole 1 TB file; on average it reads half of it, 0.5 TB, which is 500 GB per request.

That makes reads very slow, degrades the disk’s performance, and wears the disk out: its sectors go bad from being so heavily overused. It is a hardware problem, a software problem and a time problem at once. Put precisely, scanning half a terabyte per request wastes the disk’s throughput and pushes drives past their rated workload, which reduces their reliability seagate.com ↗.

Whenever reads are slow, the thing that should come to mind is indexing.

The rule for this whole chapter

Whenever reads are slow, the only thing that should come to your mind is indexing.

And before you design the index, do the number crunch: how big will it be, and does it fit in memory? It is a classroom rule of thumb rather than the only tool (1.1 already named caching and batching), but for this dictionary it is the one that settles the design.

[figure title] Reads slow: index

[figure description] A long data file with a short index above it; one blue arrow goes from the index straight down to one byte offset in the file. Under it: then, how big is the index?

[figure labels] index · data · then: how big is the index?

§ 2.2

## A one-level index

A small file that says exactly where each word’s line starts.

About 4 min · class 00:23–00:27, Q&A 03:01

What if a small file told you exactly where apple starts? Create one small, simple index on top of the data file, one level only, so that no lookup has to scan the data file hunting for its key. Each index entry holds two things: the key and its offset in the data file.

The offset is the byte position where that word’s line starts: the nth byte from the beginning of the file. It is a count of bytes, not a line number. apple,a fruit plus its newline is 14 bytes, so apple starts at byte 0 and amazon at byte 14; amazon,a rainforest and its newline take 20 more, so book starts at byte 34.

[figure title] A one-level index

[figure description] A small index file, index.dict, lists each word with the byte offset where its line starts in the data file: apple at 0, amazon at 14, book at 34. Thin pointers run from each index row to its line in data.dict, which is 1 TB. The line "apple,a fruit" plus its newline is 14 bytes, so amazon starts at byte 14. A lookup reads the index, then jumps to that byte.

[figure labels] “Indexing” · apple, 0 · amazon, 14 · book, 34 · index.dict · apple,a fruit · amazon,a rainforest · book,… · data.dict · 1 TB · 0 · 14 · 34 · keys + offsets only · "apple,a fruit\n" = 14 bytes · byte offset: the nth byte where the line starts

[caption] Fig 2·bThe index file lists each word with the byte where its line starts in the data file; a lookup reads the index, then jumps straight to that byte. The board wrote the offsets as o1, o2, o3; here they are real byte counts. Redrawn from the class board at 00:26 and 00:35.

With the index in its own file, a read goes like this: open the index file, read it line by line until you reach the key, apple say, take its offset, go to the data file, read that one line, get the meaning and send it to the user.

That is still a linear scan, so how is it better? A scan of the data file wades through every huge meaning on the way. The index holds only keys and small offsets, 4 bytes each as taught (2.3 corrects the width), so you are not iterating over megabytes of meanings, and the small index file is very fast to read sequentially, even in the worst case. File IO always goes sequentially anyway.

Before you play it: both lookups find ball, a word halfway down the file. How much does each one read?

[caption] Clip 2·1The scan reads about 500 GB to reach a word halfway down the file, and every request pays it again. The index is a short scan of words and offsets, then one pointed read of one line.

[summary] The clip as text 0:27

- Find ball, halfway down a 1 TB file. Two ways.

- Scan: read line by line until ball. About 500 GB later, there it is.

- And the next request reads it all again.

- Index: scan only words and offsets, a much smaller file.

- Then jump to ball's byte offset and read one line.

- Same answer. One read is pointed, not a scan.

Finding the word ball, about halfway down the 1 TB data.dict, two ways. The naive lookup opens the file and reads it line by line until it reaches ball: a bytes-read counter climbs to about 500 GB, half the file, and reading the whole 1 TB is the worst case. The next request starts again from the top and reads another 500 GB, so every request pays the full scan. With a one-level index, the lookup scans the small index.dict, which holds only words and their byte offsets, line by line until ball, then jumps straight to ball's byte offset in data.dict and reads that one line. Same answer: one read is pointed, not a scan.

§ 2.3

## Will the index fit in memory?

Do the arithmetic before the engineering: the index for a terabyte of meanings is a couple of megabytes.

About 7 min · class 00:26–00:35, Q&A 02:59; prepared notes 01:43

Should you scan the index at all? Before deciding how to read it, estimate its size with some basic arithmetic: can the whole index fit in memory?

A tempting shortcut is an index of just 26 entries, A to Z, each with its location. In fact you would still have to go through every word under that letter to find the one you want, while a per-word offset takes you straight to its line. And as the estimate below shows, the full per-word index fits in memory anyway, so splitting it by letter buys nothing.

Pause and think

The dictionary is 1 TB and holds 170,000 words. An index entry is the word (about 4.3 characters on average), a 4-byte offset, plus a comma and a newline. Before designing anything clever: will the whole index fit in an API server’s memory?

Yes, easily. 1.75 MB is “peanuts” beside 1 TB, so load the index into an in-memory hash map when the server starts, and every lookup becomes one pointed read. The number crunch, not a cleverer structure, settled the design.

The size of each index entry is the length of the key plus the length of the offset. The key is the word, and the average English word is about 4.3 characters, definitely not more than five: the instructor downloaded an entire dictionary and computed it. What you count matters here. In running text the average is about 4.8 letters, because short words like “the” repeat; across distinct words it is about 7.6 norvig.com ↗, and a dictionary index stores distinct words, so the larger figure is the one that applies.

The offset is an integer, and an integer takes 4 bytes.

More precisely

A 1 TB file holds 10¹² bytes, but a 4-byte integer reaches only about 2.1 billion (signed) or 4.3 billion (unsigned), so byte offsets into it must be 64-bit (8-byte) integers. With 8-byte offsets the 170,000-word index is 170,000 × (4.3 + 8 + 2) B ≈ 2.4 MB: still tiny, so the design stands.

docs.oracle.com ↗

Storing one entry per line adds two more characters, one for the comma and one for the newline. So an entry is about 4.3 + 4 + 2 = 10.3 bytes.

[figure title] The number crunch

[figure description] The index estimate as a calculator strip. Row one, as taught: 170,000 words times (4.3 for the average word, plus 4 for the offset, plus 2 for the comma and newline) is 170,000 times 10.3 bytes, 1,751,000 bytes, 1.751 MB: it fits in RAM, peanuts. Row two: a 1 TB file needs 8-byte offsets, so 170,000 times 14.3 bytes, about 2.4 MB: it still fits. MB here is 10 to the 6 bytes.

[figure labels] 170,000 × · ( · 4.3 · + · 4 · + · 2 · ) · avg word · offset · comma + newline · = 170,000 × 10.3 B = 1,751,000 B = · 1.751 MB · fits in RAM: “peanuts” · ram · 170,000 × · ( · 4.3 · + · 8 · + · 2 · ) · a 1 TB file needs 8-byte offsets · = 170,000 × 14.3 B ≈ 2.4 MB · still fits · ram · MB = 10⁶ bytes

[caption] Fig 2·cThe number crunch. Top row as taught on the board at 00:30; bottom row with the 8-byte offsets a 1 TB file needs (the note above). Either way the index is a couple of megabytes and fits in RAM.

Multiply by the number of words: 170,000 × 10.3 B = 1,751,000 B, which is 1,751 KB, or about 1.75 MB. (MB here means 10⁶ bytes. A MiB is 2²⁰ = 1,048,576 bytes, and memory sizes often use the binary reading, so the two differ by about 5% physics.nist.gov ↗.)

An index of 1.75 MB fits in RAM very easily. Next to a 1 TB data file it is peanuts.

This is why number crunching matters when you design any system. What looked huge, a 1 TB file and 170,000 words, needs an index of under two megabytes. And don’t take megabytes lightly either: M stands for a million, and a million bytes is not lightweight; it still holds a huge amount of information. The dictionary is simply an easy example of how small an index can be next to its data.

So load it once. Keep the index stored on disk, and when the API server starts, load it into an in-memory hash map. A request checks the map for the word, gets the offset, goes to the data file, reads the line at that offset and returns the meaning.

One simple number crunch made the system much better: instead of over-complicating things, one level of indexing. No linear scan is left. Every lookup is a direct, pointed read on the data file at the offset the index gives, which makes reads much faster. That settles two of the four axes, storage and query.

[summary] The prepared notes’ number skip unless you want a second estimate

The instructor’s prepared notes size the index a little differently: 171,476 words, and an entry of 4.7 (average word) + 3 (separator and newline) + 2 × 4, so 15.7 B × 171,476 = 2,692,173.2 B, about 2.6 MB. The arithmetic checks out, and 171,476 is the count of words in current use in the second edition of the Oxford English Dictionary. The same caveats apply: 4.7 is a running-text average, and if the 2 × 4 is two 4-byte integers, the offset needs 8 bytes for a 1 TB file (the note above). The order of magnitude, a few MB, is right.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Scanning a 2 MB index file line by line is linear, and so is scanning the data file. Why is the first still far cheaper?

[summary] Show answer

The index holds only keys and small offsets, while a scan of the data file wades through every huge meaning on the way. The worst case is a couple of megabytes read sequentially against a whole terabyte. And in the end there is no scan at all: the index is loaded into an in-memory hash map, and each lookup becomes one pointed read.

Redo the index estimate with 8-byte offsets and 7.6-letter words. Does the design change?

[summary] Show answer

7.6 + 8 + 2 = 17.6 bytes per entry, and 170,000 × 17.6 B = 2,992,000 B, about 3 MB. That still fits in an API server’s memory with room to spare, so nothing changes: load it into a hash map at startup and do one pointed read per lookup.

Why is an A–Z index of 26 entries worse than a full per-word index here?

[summary] Show answer

With 26 entries you only know where a letter starts, so you still scan every word under that letter to find one. A per-word index gives the exact byte where the word’s line starts. And the full index is only about 1.75 MB, so it fits in memory anyway: there is nothing to save by making it smaller.

Concepts in this section: linear scan · one-level index · byte offset · number crunch · in-memory hash map

Contents of this lecture ↑

Lecture 10, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-one-file ===

# Files as a database, chapter 3: One file you can ship

Lecture 10 · Files as a database · chapter 3 of 11

§ 3

## One file you can ship

The index made two files, and the brief said one. Putting both in one file raises a new question: where does the index stop? The answer is the header, the trick behind every file format.

About 15 min · class 00:35–00:50, Q&A 03:02

The dictionary is now two files: index.dict, a couple of megabytes of words and offsets, and data.dict, the terabyte of meanings. A partner downloads it to use it somewhere else. The brief from chapter 1 said one file.

This chapter puts the two back into one, and finds that the hard part isn’t joining them. It is telling the reader where one part stops and the next begins.

§ 3.1

## Two files break portability

Join the index and the data, and the reader needs to know where the index stops. Five ways to tell it, and what each one costs.

About 7 min · class 00:35–00:41

Two files, an index and a data.dictionary, break portability. Anyone who copies the dictionary has to copy both and keep them together, and the whole point of portable was that the dictionary is literally one file. So it has to become one.

The first idea is to not persist the index at all: ship only the data file and build the index in memory every time a server starts. It works, but every startup then iterates through the entire terabyte of data just to rebuild something that hasn’t changed. The file changes once a week, so the work is avoidable. Store the index.

So merge the two files: concatenate the index and the data into one gigantic file, index first. That brings a new challenge. When the reader opens this file, how does it know where the index ends and the data begins?

[figure title] Index and data in one file

[figure description] The index and the data are concatenated into one file. The reader must know where the index stops: a separator line or a fixed 2 MB region were proposed.

[figure labels] apple · amazon · index.dict · apple,… · amazon,… · data.dict · index · data · header · where does the index stop? · portable: one file · – special line / separator · – pre-allocate / fixed size · 2 MB

[caption] Fig 3·aIndex and data concatenated into one file. The open question is the zigzag: where does the index stop? Under the bar, the first two answers from class. Redrawn from the class board at 00:36–00:38.

It matters more than it looks. Say both parts are CSV lines and the server reads the file line by line into its hash map at boot. Nothing tells it to stop after the last index entry, so it carries on into the data: apple,a fruit gets read as one more entry, and apple’s offset in the map is replaced by “a fruit”. The reader has to know when to stop.

Several answers came up in class, and each was tested against that one question.

A special line. Put a separator line, or some special marker, between the index and the data. It works, and it was called a good approach that can be improved: the reader still has to look at every line to find the marker.

A fixed region. Pre-allocate space for the index: the first 2 MB of the file are the index, a little more than today’s 1.751 MB, since few new words get added each week. The reader then knows the first 2 MB are index without looking for anything. “A very nice hack”, in the lecture’s words, though it wastes a little space, and the push was to be more frugal.

A stack. Write the data from the top of the file down and the index from the bottom up. That still leaves the original problem: on the day the two meet, how do you know where one finished and the other begins? The gap between them is unused space until then, and the fallback, once more, was a separator.

A number at the start. Reserve a specific position at the very beginning of the file for the boundary information, and update it as data is added. That one is interesting, and the next section refines it.

Pause and think

Index and data now live in one file, index first. The server reads the index line by line into its hash map at boot. How should it know where the index ends and the data begins?

A number at the start. Store the byte offset (here, the index size) in a small fixed-size header, and the boundary is never searched for. Without it, the reader would load data lines into the map as if they were index entries. That header is the trick behind every file format (3.2).

Where does the index end? Five answers from class

|

| Rebuild at start

| Separator line

| Fixed 2 MB region

| Stack (data ↓, index ↑)

| Byte offset at the start

| Extra work at boot

| Scan the whole 1 TB data file

| Read the index, checking each line for the marker

| Read the first 2 MB

| Read until the boundary, wherever it is

| Read a few bytes, then exactly the index

| Wasted space

| None

| One line

| What the index doesn’t use of 2 MB

| The gap between data and index

| A few bytes

| How the reader knows where to stop

| There is no stored index

| It must scan for the line

| By convention: 2 MB

| It doesn’t, once they meet; back to a separator

| The number says so

| Verdict in class

| Avoidable: the file changes weekly

| Good, but improvable

| “A very nice hack”; be more frugal

| Still needs a boundary

| Kept: it becomes the header

§ 3.2

## A fixed-size header

Store the boundary as a number, not a marker. Sixteen bytes at the front of the file tell the reader what it holds and how to read it.

About 6 min · class 00:41–00:46, Q&A 03:02

Refine the last idea. Instead of storing a separator, store the byte offset directly at the start of the file. That removes the need for a separator altogether. When the reader opens the file, its first step is to read that first chunk, and from it, it knows exactly where the data begins.

That first chunk is a header, and it is the classic mechanism of file formats everywhere: PNG, JPG, MP3, AVI. The first few bytes contain meta information about everything else in the file, and what exactly they hold depends on the format, as its creator specified it. Not every format puts this directory at the front, though: a ZIP archive ends with its central directory, and MP4 muxers usually write the moov index at the end, with a “faststart” pass to move it to the beginning (ZIP APPNOTE ↗, ffmpeg formats ↗).

Our file has more than one section, an index and the data, so the header stores the information about each of them. And the header has a fixed size: it can’t grow beyond it, because the reader has to know how many bytes to read before it knows anything else.

Three fields go in it. The first 8 bytes hold a name that tells the decoder “this is our dictionary”: OUR_DICT. PNG does the same: its first bytes say PNG, and an MP3 starts with bytes of its own. Precisely, every PNG file begins with the same 8-byte signature, hex 89 50 4E 47 0D 0A 1A 0A, which contains the letters “PNG” and lets the decoder recognise the file (PNG specification ↗). If the instructor built his own database, its first bytes would spell its name, AODB on the board, and his decoder would recognise an AODB file and know what components it holds.

The next 4 bytes hold a version, because one format can have variants. Version 1 might store the index first and then the data; version 2 the data first and then the index. The decoder reads the version and acts accordingly.

The last 4 bytes hold the index size: how big the index is, the integer for 1.75 MB in our case. Storing the start offset of the data would work too; the board first had that line and replaced it with the size. It is the size of the index stored in this same file, not the location of some other file: read the header, get the index size, read that many bytes, and you have the index.

[figure title] A 16-byte header

[figure description] The dictionary's header is 16 fixed bytes: an 8-byte name, OUR_DICT, a 4-byte version and the 4-byte size of the index that follows.

[figure labels] OUR_DICT · – 8 B · version · – 4 B · index size · – 4 B · 16 B · the same 16 bytes, to scale · OUR_DICT · ver · size · index… · data… · 0–7 · 8–11 · 12–15 · not to scale · the instructor's own database · would start with · AODB

[caption] Fig 3·bThe dictionary’s header: 8 bytes of name, 4 of version, 4 of index size, 16 bytes in all. Below, the same fields to scale, then the index and the data. Redrawn from the class board at 00:44.

That is a fixed-width header of 16 bytes: 8 for the name, 4 for the version, 4 for the index size. A binary header also has to fix the byte order of its integers, or a decoder that assumes the other order reads garbage sizes. PNG stores multi-byte integers most significant byte first; Parquet stores its 4-byte metadata length little-endian (PNG ↗, Parquet ↗).

struct dict_header { /* 16 bytes, fixed */ char magic[8]; /* "OUR_DICT" */ uint32_t version; /* 1: index, then data */ uint32_t index_size; /* bytes of index that follow */ }; /* then: index[index_size] word,offset lines */ /* then: data … word,meaning lines */

Now walk a server through boot. It reads the first 16 bytes of the file as the header. The first 8 say it is our dictionary; the next 4 are the version; the next 4 are the index size. It reads exactly that many bytes as the index and builds a hash table from them. Everything after that is data, and the offsets in the index point into it.

[figure title] Opening the file

[figure description] Boot, step by step. 1: read the first 16 bytes, the header. 2: the first 8 say OUR_DICT, so this is our dictionary. 3: the next 4 give the version. 4: the next 4 give the index size; read exactly that many bytes. 5: build the in-memory hash map from the index. 6: everything after the index is data, which the offsets point into; the server is ready.

[figure labels] OUR_DICT · ver · index_size · index · data · time · in-mem map · 16 B · 1,751,000 B · 1 · read bytes 0–15 · 2 · 8 B: OUR_DICT · 3 · 1 · 4 B: version 1 · 4 · 1,751,000 · read index_size B · 5 · apple → 0 · amazon → 14 · build the hash map · 6 · offsets point here · rest is data: ready

- Read the first 16 bytes: that is the header.

- The first 8 bytes say OUR_DICT, so this is our dictionary.

- The next 4 bytes give the version; the decoder acts on it.

- The next 4 bytes give the index size, 1,751,000. Read exactly that many bytes.

- Build the in-memory hash table from the index: apple → 0, amazon → 14, …

- Everything after the index is data, and the offsets point into it. The server is ready.

Keys: ← → to step · link to a step with #fig-3c/step-3

[caption] Fig 3·cThe decoder’s logic at boot. The bar is the file; blue brackets mark the bytes being read. Offsets in the map count from the start of the data.

The same logic holds for every file format: a fixed header first, which says how to find each part that follows.

§ 3.3

## Every file format is a header and sections

You have just designed a file format. So has everyone who wrote a PNG decoder.

About 4 min · class 00:46–00:50

Look at what the 16 bytes bought. The dictionary is shippable again, and it got there the classic way any custom file format is built: divide the file into compartments, here the index and the data, and keep a header that tells you where each compartment lies. Because of the one portability constraint, the dictionary became a single file instead of several.

The rule for this whole chapter

Divide the file into compartments, and put a fixed-size header first that says where each one lies.

That is how every custom file format is built, and it is what made the dictionary shippable as one file.

[figure title] Compartments and a header

[figure description] One file in compartments: a small header first, then the index, then the data. The header says where each compartment lies.

[figure labels] H · index · data · the header says where each part lies

Other formats are built from sections too. A JPG has its frames; in an MP4, the header says where the video part is and where the audio part is, the video holding its first, second, third frames and the audio its waveform information.

That is also why one file with a header ships so easily, across systems or to end users: anyone who has the decoder can read it.

Parquet, which you meet in data engineering, also has headers and information. Strictly, Parquet keeps that information in a footer: the file starts with the magic PAR1, then the column chunks, then the file metadata and its 4-byte length, then PAR1 again. Writing the metadata after the data allows a single pass when writing, and a reader reads the footer first to find the column chunks it needs (parquet.apache.org ↗).

[figure title] Header first, or directory last

[figure description] Four file layouts: PNG and this dictionary put their identifying header first; Parquet and ZIP keep the metadata that locates each part at the end of the file. JSON has neither.

[figure labels] png · 89 50 4E 47 0D 0A 1A 0A · chunks … · 8-byte signature first · our dict · 16 B header · index · data · header first · parquet · PAR1 · column chunks · footer · PAR1 · metadata at the end · zip · f1 · f2 · f3 · central directory · member offsets, at the end · json · { "apple": "a fruit", … } · no header: parse it all

[caption] Fig 3·dWhere the locating information lives. PNG and our dictionary put it first; Parquet and ZIP keep it at the end of the file. JSON has none, so a reader parses all of it. New figure.

JSON has no header. A JSON file is a simple text file, so to get any information out of it you read the entire file and let the JSON decoder parse the curly braces, the quotes and the strings into an in-memory dictionary first.

CSV in general does not have a header either, whereas formats like PPT and PDF do, and you can define your own custom format. Note that CSV’s “header” is something else: RFC 4180 allows an optional first line of column names, signalled by the header=present parameter of text/csv, which names columns but doesn’t say where data lies (RFC 4180 ↗). And PDF does start with a %PDF version header, but a reader finds its catalog through the trailer at the end of the file (Library of Congress ↗).

Every file format has its own encoder and decoder. The encoder creates a file in that specific format; the decoder decodes it. That holds for image, video, audio, any format.

[summary] Where the instructor learned this skip if you only want the dictionary

He once tried to write his own image format, and that is how he learned how file formats and their headers work.

Remember the early-internet message “this web browser does not support TIF format”? It means the browser has no decoder for that format: given that set of bytes, it does not know how to interpret them. It is still true for TIFF. As of October 2026, MDN lists Safari as the only browser that displays TIFF natively; the others need special libraries or add-ons (MDN ↗).

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does a separator line between the index and the data cost more at boot than a byte offset in a header?

[summary] Show answer

With a separator, the reader has to check every line it reads for the marker, and it only learns where the index ends when it finds it. With a number in a fixed-size header, it reads a few bytes first, then exactly that many bytes of index, and knows everything after is data. Nothing is searched for.

What three fields are in the dictionary’s 16-byte header, and which one lets the reader skip straight to the data?

[summary] Show answer

An 8-byte name (OUR_DICT), a 4-byte version and a 4-byte index size. The index size does it: after the 16 bytes come exactly that many bytes of index, and the data starts right after them.

What does “this browser does not support TIF” tell you about the browser, in this chapter’s terms?

[summary] Show answer

That it has no decoder for the TIFF format. Every format has an encoder that writes it and a decoder that reads it; without the decoder, the browser has the bytes but doesn’t know how to interpret them.

Concepts in this section: portability · where the index ends · file header · magic bytes · version field · encoder and decoder

Contents of this lecture ↑

Lecture 10, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-serving-from-s3 ===

# Files as a database, chapter 4: Serving it from S3

Lecture 10 · Files as a database · chapter 4 of 11

§ 4

## Serving it from S3

One file, many API servers. Copying it to each server is the obvious move and the costly one. Pin down the property you need, random reads over the network, and S3 turns the file into a database.

About 16 min · class 00:50–01:05, Q&A 02:58

GET /word arrives at a load balancer with a fleet of API servers behind it. Each of them needs the dictionary’s header and index at boot, and a few bytes of its data on every request. Where does the 1 TB file live?

§ 4.1

## One copy per server?

The obvious answer puts the file on every server. Its real problem isn't the one people name first.

About 7 min · class 00:50–00:57

So far the dictionary has a file format, it is portable, it has a header, and it has an index for fast reads. Now comes the infrastructure side: how to serve actual user requests. Start from a seed design and improve on it.

A request from the end user comes to a load balancer, and behind the load balancer sits a bunch of API servers whose job is to serve the incoming requests. The API exposes one endpoint, a GET on /word, which returns the word’s meaning. The load balancer forwards each request to one of the API server instances.

Where do those servers read the dictionary from? One proposal from class is a shared disk storage that all of them query. Before accepting it, ask the opposite: why not store the file on every API server?

The first answer people give is that updates become tedious: every server has to be updated, and some may be unavailable at the time. But updates are not real time. They come as one bulk job every Sunday, so a weekly batch can update every copy. Is that still a problem? Not yet. The second answer is inconsistency: if an update partially fails, servers disagree. A valid point, and also not a problem yet, because these are meanings. Apple being “a fruit” on one server and “a round fruit” on another, for a while, is not the end of the world.

The point of probing is this: before you propose something, think in depth about the disadvantages of the other options too.

Pause and think

You could copy the 1 TB dictionary onto each API server’s disk. Updates come once a week, and meanings barely change. What is the real problem with this?

Cost. If you aren’t thinking about cost, you aren’t building good systems: keep one copy in a central place that every server can read over the network.

The biggest pain is cost: the same file stored again and again, a lot of duplicated storage across many servers. Tedious updates and brief inconsistency you can live with; that you cannot.

[figure title] One copy per server

[figure description] Copying the 1 TB dictionary to every API server: tedious updates and brief inconsistency are tolerable for a weekly update, but a hundred servers hold a hundred terabytes of redundant data. Cost is the real problem.

[figure labels] GET /word · lb · api · 1 TB · api · 1 TB · api · 1 TB · … × 100 servers · 100 servers × 1 TB · = 100 TB · redundant copies, on SSDs · update tedious · fine: weekly, bulk · inconsistency · fine: meanings barely change · COST !!

[caption] Fig 4·aA copy of the dictionary on every API server. The board’s list, right: the two objections raised first are tolerable for a weekly update; the cost is not. The list is redrawn from the class board at 00:53–00:55.

The rule for this whole chapter

Do the bare minimum at the bare minimum cost; if you are not thinking about cost, you are not building good systems.

Real-world system design is about doing the bare minimum things at the bare minimum cost. Whether a solution is cost-efficient should be the first thing that comes to mind, before whether it is fast.

[figure title] One shared copy

[figure description] A server with its own 1 TB disk is crossed out; the server reads one shared copy in the cloud instead.

[figure labels] api · 1 TB · s3 · one shared copy

Cloud providers frame it the same way: AWS’s Well-Architected Framework makes cost optimization one of its six pillars, and defines a cost-optimized workload as one that “achieves an outcome at the lowest possible price point, and meets your functional requirements” (AWS ↗).

You can make anything faster by throwing money at a cloud provider. Put one terabyte of RAM on each machine and you could load the whole dictionary into one in-memory hash table, with no index at all. It would be fast, and it would not be a good solution, because it is not cost effective.

A copy per server has the same flaw at a smaller scale. Those copies sit on each server’s disk, typically SSDs, which are very costly: with 100 servers you hold 100 terabytes of redundant data. So don’t store the file on each server. Keep the dictionary in one central place, which is where the shared-storage proposal was heading.

§ 4.2

## Properties first, then technology

“Put it on S3” comes quickly. First ask what the storage must be able to do.

About 5 min · class 00:57–01:02

The proposal comes fast: store the one dictionary file on Amazon S3, which is very cheap and optimized for blob storage. And it comes with a good reason. S3’s get-object call takes parameters for the bytes you want to read. Since the header tells you the index size, you can fetch just the header and index bytes, then take a word’s offset and fetch just that byte range to answer the user. Concretely, GetObject accepts a standard HTTP Range header: Range: bytes=0-9 returns only the first 10 bytes, with a 206 Partial Content response (GetObject ↗).

That works. But don’t start from the product name. First pin down the core properties you want from the system, then pick a particular technology.

Why shared storage at all? Because replicating the data to every server is cost-inefficient. And what is common across multiple servers? The network. So the dictionary needs a common place that is accessible over the network.

A common place accessible over the network is any block storage, or a database. Databases are ruled out by the brief, so the gigantic file goes on block storage such as S3. Portability survives: it is still one file, now on S3.

More precisely

S3 is object storage, not block storage. AWS uses three terms: block storage (Amazon EBS) is a disk-like volume attached to one instance; file storage (Amazon EFS) is a shared network file system; object storage (Amazon S3) holds whole objects fetched over HTTP by key (S3 user guide ↗). Databases are ruled out, so the file goes on shared storage such as S3 or a network file system.

aws.amazon.com ↗

Now look at what the design assumed. It was built for a normal disk: read the header bytes to learn the index size, read the whole index to build an in-memory hash table, then do random reads in the data section. Whatever storage replaces that disk must support the same thing.

The generic term for such storage is network attached storage: storage accessible over the network that gives you file-system semantics. What actually matters is networked storage that supports random reads of a given length at a given offset; a NAS share, HDFS or an object store such as S3 all qualify (AWS: what is NAS ↗).

Strip it to the bare minimum and one feature is required: random reads. You must be able to say “from this file, at this offset, read n bytes”, (file, offset, n), just as a normal disk lets you seek to a location and read that many bytes.

S3 gives you that at the level of file-system semantics, which is why it can also be used as a distributed file system. You don’t have to read the entire file: you ask for a number of bytes at an offset and get exactly those bytes.

More precisely

S3 supports ranged reads (ask for n bytes at an offset and get exactly those), which is all this read-only design needs, one range per GET: S3 does not return several ranges in one request, and AWS recommends concurrent ranged GETs to download large objects quickly. But it is an object store, not a file system: objects are written whole and cannot be appended to or modified in place, and tools that mount S3 as a file system say they do not implement full POSIX semantics (Mountpoint for S3 ↗).

docs.aws.amazon.com ↗

S3 is not special here. Any network attached storage with the same semantics would do: HDFS, or literal physical network hard disks in a data center (Dell’s network hard disks are well known). S3 is used only because everyone understands it. HDFS, for one, offers the same pointed read: its input streams support seek() and positioned reads from a given byte offset, so the offset-index design works there unchanged (Hadoop docs ↗).

§ 4.3

## Boot, GET, and a database built from a file

Walk one server from boot to its first answer, and see what you have built.

About 5 min · class 01:02–01:05, Q&A 02:58–02:59

What does each API server need to know? Only the dictionary’s file path on S3, which can be passed as static configuration for now. Deployment hasn’t been discussed yet; it comes back in chapter 6.

Boot is the decoder from chapter 3, with S3 in place of the disk. From the configured path, read the first 16 bytes and interpret them as the header: is this our dictionary, and how big is the index? Make another S3 call to read that many bytes of index, and build the in-memory hash table from it. Then start serving requests.

A GET reaches any API server, which checks its in-memory hash table. If the word isn’t there, return 404. If it is, take the offset and do a random read on the S3 file at that offset, for that many bytes. The S3 API supports that, and so do HDFS and network hard disks.

[figure title] Pointed reads on S3

[figure description] Users' GET /word requests go through a load balancer to API servers that each hold the word-to-offset map in memory. Each lookup is one ranged read of n bytes at an offset in the single file on S3.

[figure labels] GET /word · lb · file path on S3 (config) · api · w → o · api · w → o · api · w → o · (file, off, n) · s3 · I · D · network attached storage · | hdfs · network hdd · + file system semantics · (random read) · pointed read

[caption] Fig 4·bThe serving path. Each API server holds the word → offset map in memory and reads n bytes at an offset from the one file on S3. Under the cloud, the board’s list of storages that would do as well. Redrawn from the class board at 01:00–01:05.

[figure title] Boot, then one GET

[figure description] Time runs down. Lanes: an API server and S3. 1: the server starts with the file's S3 path. 2: one ranged read gets the 16-byte header. 3: a second ranged read gets exactly index-size bytes. 4: it builds the in-memory map and starts serving. 5: a GET for apple; the map gives its offset. 6: one ranged read of that record, and 200 goes back. 7: an unknown word misses the map and gets 404 without touching S3.

[figure labels] api · s3 · time · 1 · path = · s3://word-dictionary/ · dictionary1.dictionary · 2 · Range: bytes=0-15 · OUR_DICT · 1 · 1,751,000 · 3 · bytes=16-1,751,015 · the index · 4 · w → o · hash map built · 5 · GET /word?w=apple · map: apple → 0 · 6 · bytes=1,751,016-1,751,029 · apple,a fruit⏎ · 200 · 7 · GET /word?w=qwzx · map miss · 404 · S3 never touched

- The server starts with one setting: the file’s path on S3.

- One ranged read gets the 16-byte header: OUR_DICT, version 1, index size 1,751,000.

- A second read gets exactly index-size bytes, the index.

- Build the in-memory map, then start serving.

- A request for apple: the map gives its offset, 0 into the data.

- One ranged read of that record, 14 bytes, and the answer goes back: 200.

- An unknown word misses the map: 404, and S3 is never touched.

Keys: ← → to step · link to a step with #fig-4c/step-3

[caption] Fig 4·cTime runs down. Lanes: one API server and S3. Byte ranges follow from the 16-byte header, the 1,751,000-byte index and apple’s 14-byte line at the start of the data; the map’s offset is counted from the start of the data, which the class did not pin down. qwzx is an invented unknown word.

This is the beauty of the system. It reads a single record from S3 efficiently without reading the entire file: only the bytes of interest, nothing before and nothing after. And that effectively builds a database, because at heart a database is a key-value store. What we built is a key-value store that serves a huge number of gets on S3.

Being able to fire pointed queries at S3 without reading the whole file was called “magical”, and it has a ton of applications. They come at the end of the dictionary half, in 6.5.

later in this lecture · 6.5: building applications on pointed reads from S3

Isn’t one S3 call per API request costly? And wouldn’t you add caching, or storage tiered by how often a word is read? In the real world you would do exactly that. Reading S3 directly on every request here is only meant to show that pointed reads on S3 are possible. For a sense of scale, AWS says small S3 requests usually see median latencies in the tens of milliseconds, and that latency-sensitive applications can expect roughly 100–200 ms for small objects and first bytes; it recommends a cache such as ElastiCache or CloudFront in front of S3 for frequently read data (design patterns ↗, performance guidelines ↗).

back in · Lecture 2: caching at every level, from the API server to the CDN

### Check yourself #

Answer in your head, or out loud, before opening each one.

The first objections to a copy per server were tedious updates and inconsistency. Why were both “not a problem yet”, and what was?

[summary] Show answer

Updates arrive once a week as one bulk job, so updating every copy is a routine batch, and meanings barely change, so a server briefly serving the old meaning is harmless. The real problem is cost: 100 servers each holding a 1 TB copy is 100 TB of redundant, usually SSD, storage.

Which single property must the shared storage have, and name two storages besides S3 that have it.

[summary] Show answer

Random reads over the network: “from this file, at this offset, read n bytes”. HDFS has it, and so do physical network hard disks in a data center (any network attached storage with file-system semantics).

How many S3 calls does a server make at boot, and how many per GET?

[summary] Show answer

Two at boot: one for the 16-byte header, one for exactly index-size bytes of index. Then one per GET for a word that exists (a ranged read of that record), and none for a word that isn’t in the map, which gets a 404.

Concepts in this section: cost first · properties before technology · network attached storage · random read (file, off, n) · ranged GET · pointed read

Contents of this lecture ↑

Lecture 10, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-weekly-update ===

# Files as a database, chapter 5: The weekly update

Lecture 10 · Files as a database · chapter 5 of 11

§ 5

## The weekly update

Sunday’s changelog changes apple’s meaning. You can’t edit a file in place, so build a new one, and keeping the file sorted makes that a single merge pass.

About 13 min · class 01:05–01:19, Q&A 03:03–03:06

Sunday’s changelog has arrived: apple now means “a round fruit”, and ball and zoo changed too. The live dictionary is one file on S3, and every API server reads it by byte offset. How does the change get in?

§ 5.1

## A job on its own server

A periodic job on a server of its own downloads the dictionary and holds the changelog. What it must not do is append.

About 4 min · class 01:05–01:10

Storage is settled, so is the query, and so is the high-level serving infrastructure. One big chunk of the design remains: seamless updates.

Recall the input. There are no live updates. Every week, say on Sunday, the publisher sends a changelog file containing only the words that changed and their new meanings: apple, ball and zoo, for example. Only the changelog arrives, not the whole dictionary, and it has to be applied to the file on S3.

The natural place to do the work is a periodic job, triggered whenever an update arrives, that updates the dictionary and its index, repackages the whole file and uploads it to S3. It runs on a separate machine, not on the API servers. A note on the words: a batch job is batch processing; what is needed here is a job that does periodic updates. In practice that is a batch job triggered on a schedule, which is what a cron job is (Kubernetes CronJob ↗).

So the update job runs on a newly spun-up server. That server holds the changelog, and it downloads the current dictionary from S3.

[figure title] A job on its own server

[figure description] Each week a separate server downloads the current dictionary from S3 and holds it with the small changelog of changed words; it will build a new file rather than append.

[figure labels] s3: dict1.dict · update: weekly · download · update job · a, … · b, … · dictionary · apple: — · ball: — · zoo: — · changelog · new file · arrives every Sunday · append at end · grows forever, duplicates

[caption] Fig 5·aThe weekly job runs on its own server, which downloads today’s dictionary and holds the changelog. Appending the changelog at the end was set aside. Redrawn from the class board at 01:07–01:43.

Should the job bump the version in the file’s header? That’s the last thing to do, and it isn’t the point: the version from 3.2 describes the file’s format, its layout variant, not the data. The real question is how the dictionary file itself gets updated.

The first idea is to append the changelog entries at the end of the dictionary, since the dictionary isn’t sorted anyway. Then the dictionary keeps growing forever, and it holds duplicate entries, and the dictionary being served can’t have repeated entries.

The second is to iterate the whole dictionary once and, wherever a changelog word’s meaning changed, replace that entry. Is it really that simple? Think it through in a little more detail; 5.2 does.

Two more ideas came up: compare a hash of each existing entry with the new one, or generate a diff. Neither is needed, because the changelog already states exactly what has to change. It’s easy to build complex systems and very difficult to build simple ones. Think only about the things you really need.

§ 5.2

## Why you can't edit in place

The index says where apple is, so overwrite its line. Then look at what happens to ball.

About 4 min · class 01:10–01:13

Here is the replace idea made precise: the index already knows where every word is. Use it to find the offset of a changed word, apple, and replace that whole CSV line in the dictionary file.

Take the two lines on the board. The file holds apple, a fruit followed by ball, a round object. The changelog says apple’s new meaning is “a round fruit”. You know apple’s offset from the index, and you write the new line there. Does the next entry, ball, move down?

Pause and think

The file has apple, a fruit followed by ball, a round object. The changelog says apple now means “a round fruit”. You know apple’s offset from the index, so you write the new line there. What happens to ball’s line?

It gets overwritten. You can’t simply “replace the entry” in a file on disk. So the update writes a whole new file instead, and if both files are sorted, that’s one merge pass (5.3).

It doesn’t move. This is a limitation of how disks work: when you go to a location in a file and start writing, the bytes are written blindly over whatever is there. A longer replacement doesn’t push the next entry down; it overwrites it.

[figure title] Apple runs into ball

[figure description] 1: the file holds apple, a fruit (bytes 0–13) and then ball, a round object (bytes 14–33). 2: the index says apple starts at byte 0. 3: the 20-byte line apple, a round fruit is written from byte 0; its last six bytes land on 14–19, where ball,a was. 4: ball did not move down; its first bytes were overwritten, and the word ball is lost.

[figure labels] changelog: · apple,a round fruit · data.dict · 0 · 14 · steps · a · p · p · l · e · , · a · · · f · r · u · i · t · ⏎ · b · a · l · l · , · a · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · a · p · p · l · e · , · a · · · r · f · o · r · u · n · i · d · t · · · ⏎ · f · b · r · a · u · l · i · l · t · , · ⏎ · a · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · a · p · p · l · e · , · a · · · r · o · u · n · d · · · f · r · u · i · t · ⏎ · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · I’ll just move down, right? · 1 · apple, then ball, byte after byte · 2 · index: apple → 0 · 3 · write 20 bytes from byte 0 · 4 · bytes 14–19 lost: ball is gone

- The file holds apple, then ball, byte after byte: apple,a fruit⏎ is bytes 0–13 and ball,a round object⏎ is bytes 14–33.

- The index says apple starts at byte 0.

- Write apple,a round fruit⏎ there. It is 20 bytes, six more than the old line, so its last six bytes, fruit⏎, land on bytes 14–19.

- Ball didn’t move down. Bytes 14–19 held ball,a; read as text, the file now says apple,a round fruit⏎ and then round object⏎. The word ball is lost.

Keys: ← → to step · link to a step with #fig-5b/step-3

[caption] Fig 5·bThe file byte by byte, one cell per byte (· is a space, ⏎ the end of a line). Numbers on the left are byte offsets. Small grey letters show what a cell held before the write. Redrawn from the class board at 01:11.

The intuition that fails here comes from editors. In an IDE you can hit enter and the other lines move down, because the text is in memory. In memory you can do that; on disk you can’t. So you can’t just say “I’ll replace the entry”: writing apple’s new meaning at its offset overrides the data that was there.

This is the kind of detail worth focusing on. It’s easy to say “I would replace it”. Imagine you are the one implementing it: what code will you write? When you think of the implementation, you see the things that would break, and that is what makes better engineers. A good engineer, a senior engineer, always wears three hats: product manager, architect and engineer. Thinking through the code is what the engineer hat looks like.

One more proposal tries to dodge the overwrite: graveyard entries. Append apple’s new meaning at the end of the file, let the old entry waste its space for a while, and run a compaction process later. Here it’s out. The served dictionary must not contain repeated entries, and for a weekly batch update, you should simply build the clean file directly. Graveyards belong with live updates; this is a weekly one. That idea does come back: the second engine of this lecture takes live writes, and there append-then-compact is the right tool (8.3).

§ 5.3

## Merge, as in merge sort

Write a new file instead. If the dictionary and the changelog are both sorted, building it is one pass over each.

About 8 min · class 01:13–01:19, Q&A 03:03–03:06

So write a new file. One proposal, offered as “a very naive approach”: go through the words, find the place where the change belongs, write the change into a new file there, and append the rest of the old file after it.

It isn’t naive. It is the merge step of merge sort, and given this design it is the best approach. Notice what isn’t here: no fancy B+ trees. Think of a simple approach and it will be really efficient; making things complex brings its own set of disadvantages.

There is one requirement for that merge to be efficient: the dictionary file needs to be sorted.

That closes the question left open in 1.2: will you keep the file sorted? For starters the answer was no, because nothing needed it; response time wasn’t a constraint, so words could sit in any order. Sorting came in only once the update was worked out in detail, because keeping the dictionary sorted makes merging the changelog into it very easy and very efficient.

So the job creates the new dictionary by merging two files: the existing, sorted dictionary it downloaded onto the new server, and the changelog. The changelog is a very short file. If it isn’t sorted, load it in memory, sort it and write it back out; it is small enough. What remains is a classic problem: merge two sorted lists, or two sorted arrays, into a third sorted one. It is literally the merge of merge sort.

Keep one pointer in each file and iterate both line by line. Compare the two words: write the entry with the smaller word to the new file and move that pointer down. When the words match, write the changelog’s updated meaning and move both pointers.

d, c = dictionary.readline(), changelog.readline() while d and c: if d.word < c.word: # the smaller word goes out new.write(d); d = dictionary.readline() elif d.word > c.word: # a word the dictionary didn't have new.write(c); c = changelog.readline() else: # same word: the changelog's meaning wins new.write(c); d = dictionary.readline(); c = changelog.readline() while d: # changelog exhausted: the rest follows new.write(d); d = dictionary.readline() while c: new.write(c); c = changelog.readline()

Walk it on the board’s example, where letters stand for words and primes for meanings. The dictionary holds a, b, c, d, f, g, h; the changelog holds c″, e′ and f″. a is smaller than c, so a – a′ goes out and the dictionary pointer moves; the same for b. Then c meets c: a match, so c – c″, the updated meaning, goes out and both pointers move. d goes out. Then f meets e: e is smaller, so e – e′, a word the dictionary didn’t have, is written in its place. Then f meets f, and f – f″ wins. The changelog is exhausted, so every remaining dictionary entry, g and h, follows. The new file reads a, b, c″, d, e′, f″, g, h.

[figure title] Merge, as in merge sort

[figure description] Two pointers walk the sorted dictionary and the sorted changelog; the smaller word is written to a new file, and on a match the changelog's meaning wins. The output is sorted and complete.

[figure labels] 1 · dictionary · 2 · changelog · new dictionary · a – a′ · b – b′ · c – c′ · d – d′ · f – f′ · g – g′ · h – h′ · c – c″ · e – e′ · f – f″ · done · a – a′ · b – b′ · c – c″ · d – d′ · e – e′ · f – f″ · g – g′ · h – h′ · // · smaller word goes out; equal → changelog wins, both move · one pass, line by line, never the whole file in memory

[caption] Fig 5·cTwo sorted inputs, one sorted output. Blue marks the current pair of pointers; ticks mark the three entries that came from the changelog. Redrawn from the class board at 01:15.

One difference from merging arrays: you never load the file into memory. You iterate the files line by line and write a third file.

The dictionary has seven words and the changelog three. How many times does each pointer move, and does either ever go back?

[caption] Clip 5·1The smaller word is written and its pointer moves; on a match the changelog’s meaning wins and both move. Each pointer moves once per entry, so one pass builds a sorted new file.

[summary] The clip as text 0:32

- Two sorted files, merged as in merge sort, into an empty new file.

- Compare the two words: the smaller one is written, and its pointer moves.

- Same word: the changelog's meaning wins, and both pointers move.

- d goes out, then e′: a new word slots into its sorted place.

- f″ wins; the changelog is used up, and the rest follows as it is.

- One pass, never backwards. The output is sorted: next week's input.

The weekly update merges two sorted files into a new one, as in the merge step of merge sort. The dictionary holds a, b, c, d, f, g and h with their meanings; the changelog holds c with a new meaning, the new word e, and f with a new meaning. One pointer sits in each file and only those two current lines are held in memory. a and b are smaller than c, so each is written to the new file and the dictionary pointer moves. At c the words match: the changelog's meaning is written, the old one dropped, and both pointers move. d is written, then e, a new word, slots into its sorted place. At f the changelog wins again, the changelog is used up, and g and h follow as they are. The dictionary pointer moved 7 times, the changelog pointer 3 times, and the new file has 8 lines: one pass over both files, never backwards, O(n + m). The output is sorted, so it is next week's input.

Why go to the trouble of a third file? Because of how file IO works: a write that goes beyond a line’s range overwrites the next line. Always create new entries, in a new file, rather than writing in place.

The rule for this whole chapter

Never write in place on disk: always write the change into a new file.

A write that runs past a line’s range overwrites the next one. Merging two sorted files into a third is the clean way to apply a change.

[figure title] Never in place: merge into a new file

[figure description] Two sorted files, each with a pointer, are merged into a third, new file. Writing into the middle of the old file is crossed out.

[figure labels] a · b · c · d · … · c″ · e′ · new · in place

That has a cost you can compute. The dictionary is one terabyte, so the merged file is about one terabyte too, and the disk of the server spun up for the job must hold at least two terabytes. That’s acceptable: it is just one server.

The merged file is a complete new dictionary. It has its header and its index, all sorted, and it is ready to upload to S3. The header is rebuilt every time, since the index size changes with every update: the merge produces a whole new file, with a new dictionary, a new index and a new header.

Doesn’t keeping 170,000 records sorted add complexity, since every new word has to be inserted in the right place? It looks that way only if you picture inserting into the existing file. Nothing is inserted in place: lookups still go straight to the offset in the index, and the sorted new dictionary is simply what the merge writes out.

And it stays sorted for free. The original dictionary is sorted and the changelog is sorted, so the new file comes out sorted, and it becomes the old file for next week’s update. Thanks to that sortedness, merging is O(n), one iteration over both files, instead of O(n²).

This is why the whole domain of computer science is obsessed with sorted data: it makes processes so simple.

Applying the weekly changelog: four ways from class

|

| Append at end

| Replace in place

| Graveyard + compaction

| New file by merge

| Duplicates?

| Yes: old and new entries both stay

| No

| Yes, until compaction runs

| No

| Writes over existing bytes?

| No: only at the end

| Yes: overwrites the next entry

| No: only at the end

| No: writes a third file

| Needs sorted input?

| No

| Yes: both files

| Fits a weekly batch?

| The file grows forever

| Breaks on any longer meaning

| Suits live updates; weekly, build it clean

| One pass a week

| Verdict in class

| Rejected: ever-growing, duplicates

| “Is it really that simple?” No

| Rejected: no repetitive entries

| Not naive: the best approach here

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does writing “a round fruit” at apple’s offset damage ball?

[summary] Show answer

A disk write puts bytes blindly at the position you give it; nothing shifts down as it would in an editor’s memory. apple,a round fruit⏎ is 20 bytes where the old line had 14, so its last six bytes land on the first six bytes of ball’s line, and ball,a is gone.

What does the merge need from its two inputs, and what does it give next week’s job for free?

[summary] Show answer

Both inputs sorted: the dictionary and the changelog (which is small, so sort it in memory if it isn’t). The output then comes out sorted, so next week the new file is already a sorted input, and each update stays one O(n) pass over both files.

Why does the job server need 2 TB of disk for a 1 TB dictionary?

[summary] Show answer

The merge never edits the old file: it reads the 1 TB dictionary line by line and writes a complete new one of about the same size. Both have to sit on the job server’s disk at once.

Concepts in this section: periodic (cron) job · no writes in place · three hats · merge of merge sort · sorted data

Contents of this lecture ↑

Lecture 10, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-switching-servers ===

# Files as a database, chapter 6: Switching every server to the new file

Lecture 10 · Files as a database · chapter 6 of 11

§ 6

## Switching every server to the new file

The new dictionary is ready. Overwrite the old one and servers read garbage. Upload it to a new path, point a small meta.json at it, and let a routine deployment do the reload. Then see why reading a few bytes from S3 matters so much.

About 34 min · class 01:18–01:52, Q&A 02:58–03:01

The merge from chapter 5 has finished. The new dictionary, with apple’s new meaning, sits on the job server’s disk. Meanwhile every API server is still serving, and each one holds an index in memory that it built from last week’s file, with last week’s byte offsets.

Getting the new file onto S3 is the easy part. Getting every server onto it, without a single user ever reading garbage, is what this chapter is about.

§ 6.1

## Same path, stale offsets, garbage

Why not just overwrite the old file? Because every server’s offsets describe the old one.

About 8 min · class 01:18–01:27

How should the new file reach S3, and what can go wrong on the way? The first proposal is a natural one: upload the new file to a new S3 path, a new URL, and tell the API servers that read the dictionary to swap over to it. Change the pointer, and worry about downtime while the switch happens. One practical note on “upload”: a 1 TB file can’t go up in one request. A single S3 PUT is limited to 5 GB, so large files use multipart upload, which as of October 2026 allows up to 10,000 parts of 5 MiB to 5 GiB each and objects up to about 50 TB aws.amazon.com ↗ S3 limits ↗.

The same proposal treats the switch as a deployment problem. The file lives in one single place, so a rolling upgrade of the file doesn’t seem to work. Instead, do a complete switch from A to B: create the new file at a new S3 URL, hand the new address to the API servers, and roll the change out with a canary, one server first and the rest once it works. Keep that doubt in mind: it is about the one file. Rolling the servers over will turn out to be the answer, in 6.4.

Now the probe. Why upload to a new path at all? A new path means every API server has to be told to update its configuration. Uploading to the same path would seem to make the whole thing simpler: nobody needs telling.

Two objections came up. While the file uploads there may be a short window when it can’t be served. And any deployment needs a rollback plan: if the upload fails or the file is corrupted, monitoring must catch it and you revert to the previous file. On S3 the first worry doesn’t apply: overwriting a key is atomic, so a reader gets the old object or the new one, never a partial one aws.amazon.com ↗. The second one stands, and more strongly: an overwrite throws the old copy away unless versioning is on, so there is nothing to roll back to.

A refinement of the rollback idea: put the file in temporary storage first, check that it works, and only then mark it successful. A failed transfer then never replaces the file you were serving.

This is where the problem gets interesting. Drawing boxes is easy. The details are what matter: where and how you upload, what can go wrong on the way, whether the transition is smooth, and whether a user is ever served garbage. Those details are super critical. The problem statement looks simple, almost stupid, and an hour and a half in it still hadn’t converged. That is the point of it: these problems and their fixes are building blocks you will reuse in other systems you design.

So, what exactly goes wrong at the same path?

Pause and think

The merged dictionary is ready. You upload it over the old file at the same S3 path. An API server still has last week’s index: apple at offset 100, 1,024 bytes. A user asks for “apple” a minute later. What do they get?

Garbage, until each server reloads. That is why the new file goes to a new path, so that each server’s index always matches the file it reads. (S3 itself never serves a half-written object; the stale offsets are the problem.)

Uploading to the same path has a list of problems. What if the upload fails? What if the file is corrupted? And the API servers must be told to reload their index, because the offsets no longer match the file. Of the three, the last is the one that bites on S3. A failed or interrupted upload doesn’t damage the object already there, because single-key updates are atomic, while an index built from last week’s file is wrong the moment the new file lands aws.amazon.com ↗.

Here is how. The in-memory index says apple is at byte offset 100 and is 1,024 bytes long. After the new file is uploaded to the same path, a query for apple still goes to offset 100 and reads 1,024 bytes. In the new file those bytes may be some other word, the one before apple say, and they may start in the middle of it. Apple’s real offset in the new file is different, and the user sees garbage.

Step through it with the buttons or the arrow keys:

[figure title] Old index, new file

[figure description] An API server’s in-memory index says apple is at byte 100, 1,024 bytes long, and the read returns apple. The new dictionary is then uploaded to the same S3 path. The server still holds last week’s offsets, so the same read now returns bytes from another word, starting mid-line: garbage, until every server reloads its index.

[figure labels] api · apple: 100, 1024 · index, on the server · aah, to exclaim · abate, to lessen · apple,a fruit · ball,a round obj · bat, a club · bath, a wash · data.dat · aah, to exclaim · abate, to make less · intense; lessen · apple,a round fruit · ball,a round obj · bat, a club · data.dat [new] · 100 · returns: apple, a fruit · same path, so · no one needs telling · new file, same path · last week’s offsets · “…nse; lessen↵appl…” · something random!! · user sees garbage until · every server reloads · how to smoothly transition?

- The server’s index says apple is at byte 100, 1,024 bytes long. The read returns apple, a fruit.

- The new file is uploaded to the same path. S3 swaps it in whole, but the server still holds last week’s offsets.

- The same read at byte 100 now returns bytes from another word, cut mid-line: garbage.

- Until each server reloads its index, users see garbage. How do you make the transition smooth?

Keys: ← → to step · link to a step with #fig-6a/step-3

[caption] Fig 6·aThe API server on the left keeps last week’s index in memory; the file on the right is whatever sits at the S3 path. Blue is the read, green the right answer, red the garbage. The rows are illustrative. Redrawn from the class board at 01:25–01:26.

So with a same-path upload you must tell every API server to reload its index immediately, and for that whole duration your users see garbage data. That is a very poor user experience.

Telling them on a schedule doesn’t fix it. The prepared notes list it as transition option 1: a periodic refresh, where each server pulls the index again every so often. Between the moment the index changes on S3 and the next pull, users get garbage responses, and each server still needs a graceful termination or reload to swap the index under live traffic.

§ 6.2

## A new path, and a static meta.json

Upload beside the old file, never over it. Then the only question is how servers learn the new name.

About 5 min · class 01:26–01:31

So: a new path. The approach is a parallel setup. The new dictionary is prepared and uploaded as a separate file, at a new path, while the old file keeps serving; then the API servers move over to it.

Version the file name. The first dictionary lives at one path, and this week’s update goes to the next:

s3://word-dictionary/dictionary1.dictionary (serving now) s3://word-dictionary/dictionary2.dictionary (this week's)

That leaves one open question: how do you tell the API servers that this is the new path they should start serving?

Whatever goes into the path changes nothing about that question. Put an IP address in it, or anything else; the new path still has to be conveyed to the API servers so that they reload.

Three ideas come up quickly and are set aside:

- Ping every API server. Send an interrupt or a command to each server telling it to invalidate its copy. Pinging all the API servers sounds too complex.

- Switch at a known time. The job’s schedule is known, so tell every server to switch on Sunday at 1 PM. It isn’t reliable. What if the job runs past 1 PM? What if the upload failed completely, or the file is corrupt and was never validated? An independent clock switches anyway.

- One file per word. Store each word in its own file, so the lookup just builds an S3 path like /z/zoo.txt. That kills portability, the very constraint this design is playing with: the dictionary must stay one file.

The idea that sticks is a small metadata file on S3 that holds the path of the current dictionary. The job uploads the new file, and only when that upload succeeds, in the PUT request’s success callback, does it update the metadata. The API servers poll the metadata file every 5–10 minutes; when the path changes, they fetch the new file and rebuild their in-memory index.

One detail makes it work: the metadata file’s own path is static, never versioned, so everyone knows it is the only place to look.

[figure title] A pointer file

[figure description] The new dictionary is uploaded beside the old one under a new name, and a small meta.json at a fixed path is updated to point at it. The old file keeps serving until the servers move over. Storing one file per word is rejected because it breaks portability.

[figure labels] static path: the one place to look · s3 · dict1.dict · still serving · dict2.dict · new · { path: · "s3://wd/dict2.dict" } · meta.json · update job · upload to a new path · then update the path · s3://word-dictionary/dictionary1.dictionary → dictionary2.dictionary · api · /z/zoo.txt · breaks portability · one file per word

[caption] Fig 6·bA pointer file. The job uploads dict2 beside dict1 (dashed: nobody waits for it), then updates meta.json, whose own path never changes. The inset is the rejected idea of one file per word. Redrawn from the class boards at 01:43 (the board shortens the names to s3://wd/dict1.dict).

§ 6.3

## Polling, reactive, and still too complex

Polling every few minutes for a weekly change wastes thousands of requests. Making it reactive costs a whole component. Neither is the simplest thing.

About 10 min · class 01:31–01:41

Why would every server poll every 5–10 minutes, when the job runs once a week? The answer offered: the exact upload time isn’t known. The update arrives on Sunday, but S3 might be down, and the upload only lands on Monday, so the servers keep polling to find out. That isn’t a reason to poll.

Wherever there is polling, things can be made reactive. Instead of asking again and again, someone tells you “something has changed, go pull”. back in · Lecture 5: making config changes reactive back in · Lecture 4: Redis Pub/Sub

The reactive version here: every API server subscribes to a Redis Pub/Sub channel, and when the update server is done uploading, it publishes an event into the channel, so every server receives the update.

But for this problem it seems too complex: another infrastructure component to run, and every API server listening on a persistent connection, just to learn that something changed. There is a reliability cost too. Redis Pub/Sub is at-most-once: if a subscriber can’t handle a message, for example because of a network disconnect, “the message is forever lost”, so a server restarting at the wrong moment would miss the update redis.io ↗. Redis Streams persist messages if you need stronger delivery.

Polling isn’t bad, and this isn’t an argument against it. It’s just that with one update a week, why make 5,000 requests to find out, when someone can tell you, or trigger something, instead?

[figure title] Two ways to hear “changed”

[figure description] Left: each server polls meta.json every 5 to 10 minutes; between the change on S3 and the next pull it serves garbage, and it must reload gracefully. Right: every API server subscribes to a Redis Pub/Sub channel and the update job publishes “changed” when the upload is done; that tells every server at once but adds a component and a persistent connection per server.

[figure labels] pull · pull · index changes on S3 · garbage responses · poll every 5–10 min · graceful termination | reload · periodic refresh of the index · s3 · update job · publish: “changed” · redis pub/sub · api · api · api · subscribe · one more component · every server · on a persistent connection · reactive: pub/sub

[caption] Fig 6·cLeft, polling: the red span is the window between the change on S3 and a server’s next pull. Right, reactive: the servers subscribe (their arrows start at the server), and the job publishes once. Redrawn from the instructor’s prepared notes shown at 01:26, where the job box is labelled Standalone.

More ideas follow, and each one is either still polling or still complex.

A “latest” flag in the header. Keep a 0/1 flag in each file’s header and set the old file’s flag to 0 when a new one is uploaded. But how would a server know which file is the latest? It never would, unless it polled.

Check the version on every request. Keep the header’s version with the index, and on each incoming request ask the backend whether the version changed. But you can’t know something changed unless you poll it, so this is still polling.

A reload endpoint. Expose a REST endpoint on each API server and have the update server call it. That is the same reactive approach as Pub/Sub.

Upgrade one server at a time. Servers register with the update job; it sends each one an event to rebuild its index from the new path, tests it, then tells the load balancer to switch it in, on a new port say. That is complex, complex. The path is already in meta.json, so nobody needs to send it to the servers, and loading the index is just a normal stage of starting up. The same thing can be done in a very simple way. It is easy to build complex systems and very hard to build simple ones: make the solution so simple that anyone can understand it.

Same path, with S3 versioning on. That goes S3-specific, and it is exactly what two separate files already do: different files, plus a meta file that says which one is active, is the latest version laid out in very simple terms. S3 can abstract it internally, but it is the same idea. Spelled out: with versioning, each upload to the same key gets a unique version ID, and a GET can ask for a specific versionId, so a version ID stored in meta.json next to the path would pin every server to the version its index was built from aws.amazon.com ↗.

An updated_at in meta.json, checked on every request. Still polling, and making a call to meta.json on every request is expensive.

An updated_at in the dictionary file itself, checked before each read. By the time you read it with the old index you have already read garbage, so you need another read and an index reload anyway. And a plain text file doesn’t store such a value at its top. The object does carry it outside its content, though: S3 returns an ETag and a Last-Modified with every GET. A server can send its ranged GET with If-Match set to the ETag its index was built from, and if the object has changed S3 answers 412 Precondition Failed instead of returning bytes, so the server reloads its index rather than serving garbage aws.amazon.com ↗. Rejecting per-request checks as extra work is still a fair design call here.

None of these survive, and that is fine. Brainstorming options that end up rejected is how you learn why certain design decisions are made.

Telling every server about the new file: six ways compared

|

| Switch at a known time

| Poll meta.json

| Redis Pub/Sub

| Reload endpoint

| Check per request

| Rolling deployment

| New code on the servers?

| A timed switch and reload

| A poller and a reload

| A subscriber and a reload

| A reload API

| A check on every request

| None: boot already reads meta.json

| Extra infrastructure

| None

| None: meta.json is a file on S3

| Redis, and a persistent connection per server

| None, but the job must reach every server

| None

| None: the deployment pipeline you already have

| Requests wasted per week

| None

| Thousands of polls for one change

| None

| A meta.json call on every request

| None

| If the upload fails

| Switches anyway, to a missing or corrupt file

| meta.json is never updated, so nothing moves

| Nothing is published

| The job never calls it

| Nothing changes

| The job never triggers the deployment

| Garbage possible?

| Not with a new path, if the file is valid

| Not with a new path

| No: each server’s index matches the file it reads

Every option on the table except the last needs new code on every server. The last one needs none, and it is hiding in something the servers already do.

Pause and think

The new file is at a new path, and meta.json now points at it. Every API server reads meta.json only when it boots. What is the least new code that gets every server onto the new file?

Trigger a deployment. It costs the same, needs no polling, no Pub/Sub and no reload API, and during the roll users get old or new meanings, never garbage. You control your own infrastructure: use it. The next section takes it step by step.

§ 6.4

## A reload is a boot: trigger a deployment

Servers already read meta.json when they start. So don’t teach them to reload: start new ones.

About 9 min · class 01:37–01:44, Q&A 01:47–01:52 and 03:00–03:01

Here is the hint that cracks it: what happens when an API server boots?

meta.json is a static file that holds the path of the dictionary to serve. When an API server boots, it reads meta.json, sees the path, reads the dictionary at that path, builds its index and starts serving.

So once the path in meta.json has been updated, what you need is a reload of the API servers, and a reload is literally what happens on boot. Reloading the servers is equivalent to doing a deployment: a freshly started server reads meta.json, goes to the path, reads the file and its index, builds the hash map and starts serving requests.

You don’t need anything else. The update job includes the AWS SDK and triggers a deployment through your deployment pipeline. With rolling deployment configured, the pipeline takes down one server and spins up another; the new machine reads the metadata file on boot, gets the new path, reads that file and serves it. Rolling deployment comes out of the box from cloud providers: the load balancer stays as it is, and servers are removed and added one at a time. On AWS, for example, an EC2 Auto Scaling instance refresh does this; with a minimum healthy percentage of 100 percent it launches the new instances before terminating the old ones, so capacity never drops aws.amazon.com ↗.

During the roll there is inconsistency. For a while some requests reach servers whose index was built on the old data, and others reach new servers on the new data. But no garbage is served, because the new data is in another file at another path: every server’s index matches the file it reads. You are serving eventually consistent data, and that is fine, because meanings don’t change drastically.

Any deployment strategy is fine. Trigger the deployment with whatever you already use, the cloud provider’s or a Jenkins job, and it takes effect seamlessly. One deployment invocation replaces the API endpoints, the reactive Pub/Sub and all the rest: throw them out of the window.

The rule for this whole chapter

We control our own infrastructure: trigger a deployment instead of writing code.

A reload is a boot. A rolling deployment boots every server onto the new file, one at a time, with no polling, no Pub/Sub and no reload API.

[figure title] Trigger a deployment

[figure description] The update job calls the AWS SDK to trigger a rolling deployment; servers are replaced one at a time and each new one reads the new file on boot.

[figure labels] api · api · new · aws sdk · deploy · a reload is a boot

Watch both switches, the same-path overwrite from 6.1 and the new path with a rolling deployment, on the same timeline:

Same new file, two ways to switch. In which one does a user ever get bytes from the middle of another word?

[caption] Clip 6·1At the same path, servers read the new file with last week’s offsets and serve garbage until each reloads. With a new path, meta.json and a rolling deployment, answers are briefly mixed but never garbage.

[summary] The clip as text 0:36

- Same new file, two ways to switch. Watch the answers.

- Same path: last week's offsets now land in another word. Garbage.

- Garbage until each server reloads its index.

- Bottom: upload to a new path, point meta.json at it, then deploy.

- During the roll, some answers are old and some new. None is garbage.

- Mixed for a while, never garbage: eventually consistent.

The same new dictionary file reaches three API servers in two ways, and each server's answers to GET apple are drawn over time. Top: the update job uploads it to the same S3 path, so dict1 now holds the new content while every server still holds an index built from last week's file. Their offsets land in another word, so every answer is garbage until that server reloads its index; the servers reload one at a time, and the garbage window closes only at the last reload. Bottom: the job uploads the file to a new path, dict2, beside dict1, points meta.json at dict2, then triggers a deployment. The rolling deployment replaces one server at a time; each new server reads meta.json on boot and builds its index from dict2. Meanwhile old servers keep answering from dict1 with the old meaning and new servers answer with the new one: mixed for a while, never garbage, eventually consistent.

The order of the steps matters. The job creates the merged file, uploads it to a new S3 path, updates meta.json with that path, and only then triggers the deployment of the API servers.

[figure title] The update, end to end

[figure description] The weekly update in four steps: the update job merges the dictionary and the changelog into a new file, uploads it to a new S3 path, points meta.json at it, then uses the AWS SDK to trigger a rolling deployment. Each new API server reads meta.json on boot and loads the new file, while users keep sending GET /word through the load balancer.

[figure labels] GET /word · lb · api · api · api · read on boot · dict1 · dict2 · meta.json · path: dict2 · update job · aws sdk · dict1 · + · changelog · dict2 · 1 · merge · 2 · upload to a new path · 3 · update · the path · 4 · trigger a rolling · deployment · merge → upload → update meta.json → deploy

[caption] Fig 6·dThe update, end to end. Blue is the users’ traffic, which never stops; dashed are the job’s four steps, numbered in order; the thin lines are each new server reading meta.json on boot. Redrawn from the class boards at 01:24 and 01:43, with the arrowheads on the side that starts each call.

Is there something better than a whole redeployment, a new VM for every server, when only the startup routine (read the meta file, build the index, serve) needs to run again? Three ways come to mind. One: give the API servers endpoints that trigger a reload, which is the reactive approach again. That works, but ways like it make things a little more complicated.

Or ask why the API servers should read the index from S3 at all. Send the index data itself in the update you push to them: it is only 1.7 MB, by the estimate in 2.3, so nothing needs reloading. There are many ways to change this design. The deployment is the one picked here because it makes a point.

The point: thinking of a deployment as the way to reload your API servers is an out-of-the-box approach that a lot of engineers just don’t think about. The cost stays the same, and you avoid polling the metadata file and building reactive Pub/Sub. We control our own infrastructure, and we can use it to get things done.

[summary] From the instructor: reload by deploying skip if the rule above already convinced you

For a couple of his own services, the instructor first thought of adding Redis Pub/Sub, and exposed APIs to reload the data. Then he just triggered a deployment instead. As engineers we are so used to writing code to solve a problem that we forget the infrastructure is ours: no new code, and no extra component to maintain. That is his experience, offered as such.

The prepared notes for this design cover the same flow in more detail: the changelog, the merge, the trouble with uploading to the same path, the transition, reactive Pub/Sub, the parallel setup (what was just built), and portability by adding a header.

§ 6.5

## Why this matters: cold data you can still query

Two hours on a word dictionary bought one capability: pointed reads on cheap storage. That is the base of multi-tiered storage and data lakes.

About 4 min · class 01:44–01:48, Q&A 02:58–03:00

Why spend so long on a word dictionary? Look at what was built: the ability to fire seamless, pointed GET requests on S3 (GET, not PUT) that read only the bare minimum amount of data needed. A simple key-value format to start with, more complex later, but already a way to get one key from S3 without reading the entire file. That has huge applications.

Take Amazon orders. How likely are you to open an order you placed six months ago? Highly unlikely. So push orders older than six months to S3. That doesn’t mean users never look at them: they can still go back and check what they ordered. A recent order is served from the hot database, say MySQL; an old one is read from S3.

But you can’t just dump everything on S3 in a JSON file. You need the ability to make pointed queries on S3, order ID in, order details out, and that is exactly what this design gives you.

[figure title] Cold data you can still query

[figure description] Recent orders stay in the hot MySQL database; orders older than six months move to S3 in an indexed file, so they can still be looked up by order id, slower but much cheaper. Data lakes and query engines such as Athena rest on the same ability.

[figure labels] multi-tiered storage · my orders · api · mysql · latest orders · slower, much cheaper · order_id → offset · → ranged read · s3 · H · I · D · historical orders · (6+ months) · athena · data lake · without losing the ability to query the data

[caption] Fig 6·eMulti-tiered storage. Both arrows are reads the API server starts; the old orders sit on S3 in the same header, index and data layout as the dictionary. Redrawn from the class board at 01:47.

This simple system, a word dictionary on S3, lays the foundation for multi-tiered storage, because the data you move to S3 doesn’t lose the ability to be queried. It is a classic cold-storage mechanism: move data from the hot tier to the cold tier to save cost, and instead of just archiving it, keep a seamless way to query it on S3. coming later · week 6: tiered, cost-efficient storage for Amazon orders

In most places, dumping on S3 means archival. Here S3 is cheap storage. Keeping very infrequently accessed data on S3 trades time for money: the hot database answers fast, S3 relatively very slowly, but the hot database gets smaller, and that is a significant saving. The latency is acceptable because the reads are infrequent. S3 isn’t free to call (S3 requests and network I/O cost money, and S3 takes its own sweet time), but its storage is very cheap.

The same ability runs through data engineering. Data lakes store huge amounts of data on very cheap storage while keeping the ability to query it. In the lecture’s words, Apache Hudi does exactly this behind the scenes, its table format being this kind of stored index, and Hive partitions are exactly this too: the foundation for querying huge data on cheap storage. Strictly, they are the same family of idea rather than the same mechanism. A Hudi index maps each record key to the file that holds it (not to a byte offset), with Bloom-filter and record-level indexes that let lookups avoid scanning every data file hudi.apache.org ↗; Hive partitions are a directory layout by column value.

That is the word dictionary on S3, from deciding to development to deployment and a seamless transition. The thread through all of it: keep things really simple rather than over-complicated.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Apple was at offset 100 in last week’s file. Why can a same-path upload return bytes from another word, and why can’t a new-path upload?

[summary] Show answer

At the same path, the server’s index still says “offset 100, 1,024 bytes”, but the file there is now the new one, where apple sits somewhere else; the read returns whatever is at byte 100, possibly from mid-word. With a new path, an old server keeps reading the old file its index was built from, and a new server builds its index from the new file. Every index always matches the file it reads.

List the four steps of the weekly update, in order.

[summary] Show answer

Merge the dictionary and the changelog into a new file; upload it to a new S3 path; update meta.json with that path; and only then trigger the deployment of the API servers, which read meta.json as they boot.

The rolling deployment leaves some servers on the old file for a while. Why is that acceptable here?

[summary] Show answer

Because no one gets garbage: each server reads the file its index was built from, so an answer is either last week’s meaning or this week’s. The data is eventually consistent, and a word’s meaning doesn’t change drastically from one week to the next, so a few minutes of mixed answers do no harm.

Concepts in this section: stale offsets · parallel setup · meta.json · polling vs reactive · rolling deployment · multi-tiered storage · data lake

Contents of this lecture ↑

Lecture 10, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-fast-writes ===

# Files as a database, chapter 7: Fast writes on a cheap disk

Lecture 10 · Files as a database · chapter 7 of 11

§ 7

## Fast writes on a cheap disk

The second engine must take writes as fast as a magnetic disk allows, and lose nothing. Append every put to the end of one file, make delete a put, and keep one map in memory for reads.

About 22 min · class 01:52, 01:59–02:14, Q&A 02:46–02:49

The dictionary changed once a week, and every read could afford a trip to S3. The second engine is the opposite. Writes arrive all the time, each one must be safe on disk the moment it is acknowledged, and the disks are the cheapest kind there is.

The tools are the same ones: a file, byte offsets, and a small map in memory. What changes is the order in which they are used.

§ 7.1

## The problem, and how a magnetic disk works

Cheap disks hold the world’s data, and on them, moving the head is what costs time.

About 4 min · class 01:52, 01:59–02:03

Design a super fast key-value store on very commodity hardware: cheap magnetic hard disks. It must support put, get, update and delete, with full persistence. That is asking for the best of everything. It is also a database most people use without knowing it, with O(1) reads, writes and deletes plus persistence, and building it means going deeper into the file format than the plain lines of the dictionary, to get the maximum out of the disk. The approach is very similar to the word dictionary.

Start with the hardware. In the storage hierarchy, from CPU caches through memory, SSDs and magnetic disks down to tape, SSDs sit closer to memory than magnetic hard disks do, both in speed and in cost. We are all used to SSDs, but they are very costly compared with magnetic disk storage, so huge amounts of data are stored on magnetic disks, not on SSDs.

A magnetic disk is the classic disk-based storage: a head moves across while the disk spins underneath it. When you read a byte offset in a file, that offset is translated into a physical place: this disk, this sector, this offset inside the sector.

[figure title] A magnetic disk

[figure description] On a magnetic disk a head moves over a spinning platter to reach a sector; a byte offset in a file becomes a disk, a sector and an offset inside it, and that mechanical movement is the slow part of disk I/O. On the speed scale SSDs sit closer to memory than hard disks, in speed and in cost.

[figure labels] spins · head · sector · moving the head = the slow part · byte offset → disk · sector · offset in it · a magnetic disk · memory · SSD · HDD · ← faster, costlier · slower, cheaper → · where SSDs sit

[caption] Fig 7·aA magnetic disk: the platter spins and the head moves to the sector that holds the bytes. Beside it (below it on a phone), where SSDs sit between memory and hard disks. Redrawn from the class board at 02:03.

To serve a read, the disk rotates and the magnetic head physically moves to that location. It reads that part and sends it to the device driver, and from there it goes up to user space. Every new read somewhere else needs another movement. That mechanical movement, moving the head and rotating the disk, is the most time-consuming part of disk I/O. So the question for every operation is: how little can it make the disk move?

§ 7.2

## Put: append, never seek

Every put goes to the end of one file, where the head already is.

About 6 min · class 02:02–02:08, Q&A 02:46–02:49

How would a put look? The store has to support only put, get and delete. But it must not miss out on persistence: when a put arrives, it is flushed to disk immediately.

It is tempting to reach for a structure like a memtable or an SSTable, where writes go into a sorted map held in memory first. That doesn’t fit the requirement as set: every put must be persisted to disk immediately. (How real memtable engines handle persistence comes back in 10.3.)

So keep a ledger: one file, a write-ahead-style log, where every change is appended at the end instead of being placed where it belongs.

Appending is what suits a magnetic disk best. The head is already where the last write ended, so there is no seek for the head to make and no waiting for the disk to spin round to the right sector; you just add more blocks at that point. Append only, zero seek, no big mechanical movement: the best you can do.

[figure title] Append only

[figure description] Each put is appended to the end of one file, in order: K1 V1, K2 V2, K3 V3, then the update K1 V1′. Nothing is overwritten; the old K1 entry stays and is obsolete. The disk head is already at the end, so there is no seek.

[figure labels] PUT K1 V1 · PUT K2 V2 · PUT K3 V3 · PUT K1 V1′ · K1 V1 · K2 V2 · K3 V3 · K1 V1′ · append · append only · zero seek · no big mechanical movement · best we can do!!

[caption] Fig 7·bFour puts, appended in order. The update K1 V1′ doesn’t touch the first K1 entry; it goes to the end like everything else. The dot marks where the file starts. Redrawn from the class board at 02:08.

Put K1 V1 appends the key and value to the end of the file. Put K2 V2 and put K3 V3 create new entries after it, in order.

Should the store also remember, somewhere in memory, the address where each key’s entry starts on disk? That is the right instinct, and it waits until get. First get the maximum performance out of put.

Now update a key: put K1 V1′. You don’t go back, find the old K1 and change it. The new entry is appended like any other, and the old one simply becomes obsolete. Any put that comes is appended, no matter what.

That is how you get the maximum performance out of the put operation on a cheap magnetic disk.

In code, the whole put is a few lines: open the file for appending, write the record, and force it to disk before you answer.

f = open("001.data", "ab") # "a": append-only mode f.write(record) # always lands at the end f.flush(); os.fsync(f.fileno()) # persist immediately, then ack

Creating an append-only file takes nothing special. When you open a file you pick a mode: r, w, r+, w+, or a, which is append-only. You don’t reserve space up front, say a contiguous 1 GB, and track how much of it you have written; you open the file and start writing. Laying the file out on disk, and breaking it into pieces where needed, is the file system’s job, done through the system calls behind file I/O.

Nor does the file system do it poorly. In most cases file systems (BTRFS, NTFS, ext2/3/4, whichever you use) don’t allocate files back to back. When a file is created a large chunk is marked for it, and new files are placed in decent free space, spaced out a bit, so a file growing slightly larger is not a problem.

§ 7.3

## Delete: a put with a special value

If you can only write at the end, a delete has to be written at the end too.

About 2 min · class 02:08–02:10

The store only ever appends. K2 was written a while ago, further up the file. How do you delete K2?

Pause and think

Your store only ever appends to the end of its file. K2 was written earlier. How do you delete K2?

Delete is a put. Appends are O(1), so delete is O(1) too. The dead entries are cleaned up later, when old files are merged (chapter 8).

It is tempting to go back to K2’s entry and set its value to something that never occurs, −1 if values are always positive. But this is an append-only file: you cannot write to any other location. back in · Lecture 3: delete as an update to −1, in the MySQL key-value store

An append-only file lets you read anywhere in what was written before, but you cannot write to anything before the end. Random reads, yes; random writes, no.

So reason from what is allowed. The only thing you may do is append, so append something that says K2 is deleted: an entry for K2 with a marker value. Delete is a put with a special value, DEL K2 = PUT(K2, −1).

Put was O(1), the bare minimum, so a delete implemented as a put is just as efficient. Put and delete are both solved.

The rule for this whole chapter

Append, no matter what: every put, update and delete goes to the end of the file.

An append-only file can be read anywhere but written only at its end, and that is the most a magnetic disk can give a writer.

[figure title] Append, no matter what

[figure description] An append-only file: a write goes only into the empty slot at its end; a write into the middle is crossed out. Reads can go anywhere.

[figure labels] read anywhere · write only at the end

§ 7.4

## Get: an in-memory map to the latest offset

K1 is in the file twice. One small hash table in memory says which entry counts.

About 4 min · class 02:10–02:14

K1 now appears twice in the file, and K2 has a −1 after it. How does a get find the right entry, fast?

The naive way: start at the top, look at every entry, and return the latest one for the key. That is very poor, and get deserves the best performance too.

An SSTable-like structure keeps suggesting itself here as well, but what is needed is a simple hash table. An SSTable and a hash table are very different things.

Keep an in-memory hash table that maps each key to the offset of its latest entry in the file: the offset, not the value. It is updated as soon as an entry is appended, and a get goes straight to that offset. It is the same move as the dictionary’s index in 2.3: a small map in memory pointing into a big file.

Put now has two steps, in this order: write the entry to disk and note its offset, then update the hash table. Put K1 V1 lands at O1 and K1 points at O1; K2 points at O2, K3 at O3. Put K1 V1′ is appended at O4 first, and then K1 is repointed to O4.

Delete removes the key’s entry from the in-memory hash table. If a key has no entry in the hash table, it does not exist.

Get looks the key up in the hash table. No entry: return 404, not found. An entry: go to that offset in the file and read the value. One memory lookup, one disk read, and the data goes back.

Four puts and a delete. Which offset does K1 point to at the end, and where is K2?

[caption] Clip 7·1Every put, update and delete is appended at the end, then the map points the key at its latest entry: K1 moves to O4 and K2 leaves the map. A get is one lookup and one read.

[summary] The clip as text 0:37

- Four puts and a delete. One file, one map in memory.

- Each put is appended at the end, then the map points the key at it.

- An update is just another append. K1 now points at O4.

- Delete is a put with −1. K2 leaves the map.

- Get: look up the map, read once at that offset. No entry: 404.

- Writes only at the end, reads anywhere. Every operation is O(1).

A key-value store keeps one append-only file on disk and a map in memory. PUT K1 V1, PUT K2 V2 and PUT K3 V3 are each appended at the end of the file, at offsets O1, O2 and O3, and only after each append does the map point the key at its offset. The update PUT K1 V1′ is appended at O4 and K1 is repointed from O1 to O4; the old K1 V1 stays on disk, obsolete. DEL K2 is a put with the value −1: K2 −1 is appended at O5 and K2 is removed from the map. The write position only ever moves down. GET K1 looks up the map, reads once at O4 and returns V1′; GET K2 finds no entry and returns 404 without reading the disk. Writes happen only at the end, reads anywhere, and put, update, delete and get are each O(1).

[figure title] Append only, with a map to the latest entry

[figure description] Every put, update and delete is appended to the end of one file; delete is a put with the value −1. An in-memory map points each key at the offset of its latest entry: K1 at O4, K3 at O3, and K2 removed.

[figure labels] PUT K1 V1 · PUT K2 V2 · PUT K3 V3 · PUT K1 V1′ · DEL K2 = PUT(K2, −1) · K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · O1 · O2 · O3 · O4 · O5 · in-mem · K1 → O4 · K3 → O3 · no K2: deleted · append only · zero seek

[caption] Fig 7·b, completeThe same file after the delete, with the map beside it. The grey entries are obsolete; nothing points at them. Redrawn from the class board at 02:14.

The map lives in memory, so it has one weakness. If the machine dies, the hash table is gone. The file is safe on disk, though, so on restart you go through the entire file and rebuild the index. That can take a long time, and for this design that is accepted.

[figure title] Crash and rebuild

[figure description] The store serves with an in-memory map pointing K1 at O4 and K3 at O3. The machine dies and the map is gone, but the file is safe on disk. On restart the store reads the file from the top: K1 points at O1, K2 at O2, K3 at O3, then K1 moves to O4 and K2’s −1 removes it. The map is back as it was; the full scan is why a restart is slow.

[figure labels] K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · on disk · O1 · O2 · O3 · O4 · O5 · in-mem · K1 → O4 · K3 → O3 · in-mem · K1 → O4 · K3 → O3 · in-mem · K1 → O1 · K2 → O2 · K3 → O3 · in-mem · K1 → O4 · K2 → O2 · K3 → O3 · in-mem · K1 → O4 · K3 → O3 · 1 · serving · 2 · power lost · 3 · restart: scan from the top · 4 · later entries win · 5 · serving again · the full scan took a while

- The store is serving: the map points at the latest entries, K1 → O4 and K3 → O3.

- The machine dies. The map lived in memory, so it is gone; the file is safe on disk.

- On restart, read the file from the top and rebuild the map: K1 → O1, K2 → O2, K3 → O3.

- Later entries win: K1 moves to O4, and K2’s −1 removes it from the map.

- Back to the same map. Reading the whole file is why a restart is slow.

Keys: ← → to step · link to a step with #fig-7c/step-3

[caption] Fig 7·cThe map on the left, the file on disk on the right, offsets O1–O5 beside it. Blue is the scan reading the file; red, the lost map; green, the map rebuilt.

With this design, get, put and delete are each O(1): each does the bare minimum the disk has to do. That is the maximum you can get out of a cheap magnetic disk, with full persistence for reads, writes, updates and deletes.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is an append the cheapest write a magnetic disk can do?

[summary] Show answer

Because moving the head and waiting for the platter to spin round are the slow part of disk I/O, and an append needs neither: the head is already where the last write ended, so the new bytes go down right there. Zero seek, no big mechanical movement.

How is a delete stored in an append-only file, and how does the map reflect it?

[summary] Show answer

As a put with a special value: DEL K2 = PUT(K2, −1) appends a K2 entry with the marker at the end of the file. The in-memory map drops K2, so a later get finds no entry and returns 404 without touching the disk.

After a crash, what must the store do before it can answer a get, and what does that cost?

[summary] Show answer

Rebuild the map: read the whole file from the top, pointing each key at the latest offset it sees and dropping keys whose latest entry is −1. Until that scan finishes the store can’t answer, so a restart takes a long time; the design accepts that.

Concepts in this section: magnetic disk · seek · append-only file · append mode · delete as a put · in-memory hash table · rebuild on restart

Contents of this lecture ↑

Lecture 10, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 8-files-that-grow ===

# Files as a database, chapter 8: Files that never stop growing

Lecture 10 · Files as a database · chapter 8 of 11

§ 8

## Files that never stop growing

The store never deletes anything from disk, so it fills up. Split it into small files with one active writer, merge and compact the old ones, and watch disk usage draw a sawtooth.

About 11 min · class 02:14–02:25, Q&A 02:49–02:51

The store from chapter 7 has been running for a month. Its one file is 900 GB on a 1 TB disk, and most of what is in it is old values that were overwritten and keys that were deleted. Nothing ever leaves the file, because the only thing the store knows how to do is append.

This chapter keeps the append and fixes the growth: several files instead of one, a background job that rewrites the old ones without their dead entries, and a way to see whether the disk is keeping up.

§ 8.1

## What could go wrong?

Three weaknesses of the one-file design: slow restarts, keys bounded by RAM, and a file that only grows.

About 2 min · class 02:14–02:16

Put, get and delete are all O(1) with full persistence. So what could go wrong?

The first answer is availability. The map lives in memory, so after a crash the store has to read the whole file to rebuild it, and while it does that it isn’t answering. Coming back takes a lot of time. For this naive design that is accepted; there are ways to make it better. Real Bitcask is one of them: next to each data file it writes a small hint file holding just the keys and their positions, and on startup it rebuilds the map from those hint files instead of scanning the full data files docs.riak.com ↗.

The second is an assumption hiding in the map: every key has to fit in memory. Not the values, which stay on disk, but the keys. So you can store only as many keys as you can keep in RAM. That is a real limit of this design, and it comes back when the design gets its name in chapter 10.

The third is the disk. The store only appends and never collects anything, so the file grows huge and, eventually, the system runs out of disk space.

That one needs fixing now. The idea proposed in class is the right start: don’t keep just one file on the disk. Use several, and when a file is no longer being appended to, scrub it: read it and write a new file holding only the keys still needed, leaving the deleted ones out. Several files come next; the scrubbing becomes its own process, merge and compaction, in 8.3.

§ 8.2

## File rotation

Write to one small file at a time, and start a new one when it crosses a threshold.

About 4 min · class 02:16–02:20, 02:33

With several files, a write goes to only one of them at any point in time. The other files become immutable: nothing is ever written to them again.

It is tempting to think the disk then needs room for three files at most: one being written, one being read, and one being built from an old one. In fact reads and writes go to the same files. A get goes to whichever file holds its key, which may be the file being written or any older one; rebuilding an old file is a separate process, and it comes in 8.3.

So the real question is when to switch: when do you say “done with this file, start writing the next”?

Pause and think

The append-only file grows forever, so you’ll split it into several files with one active writer. How big should each file get before you start the next?

Small, with rotation: each time the active file crosses a threshold, a new one starts and the old one becomes read-only. Riak’s Bitcask rotates at 2 GB by default.

A natural first answer is to divide the disk space by two or three. On a 100 TB disk that means files of 10 TB each, ten of them, and there are more problems with that.

Two show up quickly. If the store is scanning one single huge file, it can’t build the in-memory index concurrently; more, smaller pieces let it do that. And cleaning up smaller pieces can be more even than chewing through one enormous one.

The biggest reason of all is the file system. It is quite possible that your file system does not support files of more than a terabyte; BTRFS has its limits, NTFS has its limits. Some file systems really do cap file size low (FAT32 at 4 GB), but modern ones allow many terabytes kernel.org ↗ learn.microsoft.com ↗, so the stronger reason for small files is the one above: merge, compaction and index rebuilds work file by file btrfs.readthedocs.io ↗.

So instead of waiting for one huge file to pile up, keep smaller files: say 100 MB, or 1 GB. As soon as the active file crosses that threshold, start writing to a new one. Real Bitcask does exactly this: Riak’s Bitcask closes the active file and opens a new one when a write would push it past max_file_size, 2 GB by default docs.riak.com ↗.

The files are numbered in sequence: file 001, then 002, 003, 004, and so on. At any point in time exactly one file is active, and all writes go to it. Every other file is read-only, but it can still be read.

[figure title] File rotation

[figure description] The store writes to one active file, 004; when it crosses a size threshold a new file starts and the old ones, 001 to 003, become read-only but can still be read. The in-memory map now stores the file and the offset for each key: K1 in file 1 at offset 4, K3 in file 1 at offset 3. Every key must fit in RAM.

[figure labels] in-mem · K3 → f1, O3 · K1 → f1, O4 · keys must fit in RAM · K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · 001 · 002 · 003 · read only · still readable · 004 · writes go here · active · file rotation · > threshold · 005

[caption] Fig 8·aFiles 001–003 are read-only; 004 is active and takes every write. When 004 crosses the threshold, rotation starts 005. The map now stores a file and an offset per key. Redrawn from the class board at 02:25, with the board’s K3 → f2 corrected to f1: K3 V3 sits in file 001.

Every time the active file crosses its limit, a new file is created and writes continue there. This is called file rotation.

One thing has to change in memory. The map stored only an offset, which was enough when there was one file. Now it has to say which file the key is in, and at which offset: K1 → f1, O4. A get finds the key in the map, goes to that file and that offset, reads the entry and sends it back.

§ 8.3

## Merge and compaction

Rewrite the read-only files without their dead entries, then point the map at the new file.

About 3 min · class 02:20–02:22, 02:34, Q&A 02:49–02:51

The read-only files are full of dead entries. Look at file 001: K1 was overwritten later, so its first entry is stale; K2 was deleted, so both its entries are dead. Why waste that much space?

So, while the active file keeps taking writes, run a separate process called merge and compaction. It iterates through the read-only files and writes one new file that combines them, without copying the stale entries or the deleted ones. Three read-only files become a fourth. Once that new file is written, the old files are deleted forever.

Deleted keys need no special case. When the two read-only files (with a third one active) are merged into a new file, the stale entries and the deleted entries are simply skipped, so they are never copied to disk again.

There is a catch. The entries that moved now live in a different file, at different offsets, so the in-memory map must be updated for every entry that moved into the new file. The prepared notes add one word: update it atomically.

How do you do the merge itself? It is not like the merge step of merge sort, because these entries are not sorted; they can be in any order. Instead, load the entries into a temporary hash table, replacing a key whenever a later entry for it turns up, and periodically flush that table to disk, leaving out the stale and deleted entries. It isn’t really difficult: try writing the code. That is the difference from the dictionary’s weekly update in 5.3: there both files were sorted, so a two-pointer merge worked; here the files are in write order, so a hash table does the work.

[figure title] Merge and compact

[figure description] Two read-only files hold stale entries (old values of K1) and a deleted key (K2 and its −1). A separate process reads them into a temporary hash table, where a newer entry replaces a key and a delete removes it, then flushes the table as one new merged file holding K3, K4 and the latest K1. The active file keeps taking writes meanwhile. The offsets changed, so the in-memory map is repointed to the merged file, and the old files are deleted.

[figure labels] K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · 001 · K4 V4 · K1 V1″ · 002 · 003 · writes go on · active · merged · in-mem · K1 → f2, O2 · K3 → f1, O3 · K4 → f2, O1 · in-mem · K1 → m, O3 · K3 → m, O1 · K4 → m, O2 · 1 · stale · deleted · tmp table · K1: V1→V1′→V1″ · K2: V2 → −1 · K3: V3 · K4: V4 · 2 · separate from · the index · flush · K3 V3 · K4 V4 · K1 V1″ · 3 · 4 · update the index · atomically! · old files deleted

- The read-only files are full of dead entries: stale old values of K1, and K2 with its delete marker.

- Read them into a temporary hash table: a newer entry replaces a key, a delete removes it. This table is separate from the index.

- Flush it as one new file with only live entries. The active file keeps taking writes meanwhile.

- Offsets changed, so update the map for every moved key, then delete the old files.

Keys: ← → to step · link to a step with #fig-8b/step-3

[caption] Fig 8·bTwo read-only files, the active file, and the in-memory map. Grey entries are stale; ringed in red, a deleted key. K4 and V1″ are illustrative entries added so the merge has two files to combine. Redrawn from the class board at 02:35.

In code, the merge buffers key-value pairs in an in-memory hash table and replaces whatever it finds there: if K1 was written twice, the first entry is overwritten and never reaches the new file. When it meets a key that was deleted, it removes that key from the hash table. Then it flushes the whole table as the new file. This hash table is different from the index the store serves gets from; that one is separate, and this is a separate process that is all about merging.

tmp = {} # a temporary table, not the index for rec in records(read_only_files): # oldest file first, in write order if rec.is_delete: tmp.pop(rec.key, None) # a delete removes the key else: tmp[rec.key] = rec # a newer entry replaces the older one write(merged_file, tmp.values()) # only live entries reach the disk repoint_index(merged_file) # offsets changed: update the map delete(read_only_files)

§ 8.4

## The sawtooth and its two knobs

Disk usage climbs with writes and drops at each merge. Its shape tells you how to tune the store.

About 3 min · class 02:22–02:25, 02:34–02:35

Plot disk usage over a week. As writes come in, usage grows: high, higher, higher. When merge and compaction kicks in, it suddenly drops. Then it grows again, and drops again at the next run. You will see this sawtooth pattern in your disk consumption.

Halve the merge frequency. Does the peak go up or down, and what is the line it must never cross?

[caption] Clip 8·1Disk usage climbs with writes and drops at each merge and compaction: a sawtooth under the 1 TB cap. Merge too often and the CPU is busy merging; too rarely and a peak hits the cap and the store crashes.

[summary] The clip as text 0:36

- Disk used over time, on a 1 TB disk.

- Writes fill the disk; each merge and compaction drops it back. A sawtooth.

- Merge too often: low peaks, but the CPU is busy collecting garbage.

- Merge too rarely: work piles up, a peak hits the cap, and the store crashes.

- This design has two knobs: merge frequency and file rotation size.

- Watch the sawtooth, tune both knobs, keep it under the cap.

A plot of disk used over time under a red 1 TB cap. Writes make usage climb, and each merge and compaction drops it back to the live data: a sawtooth with three teeth, all well under the cap. The same writes are replayed with merges twice as often: the teeth stay low, but a CPU spent merging bar fills up, because the CPU is busy collecting garbage. Replayed with merges half as often, work piles up and the first peak reaches the 1 TB cap: the disk is full and the store crashes. The design has two knobs that set the shape, merge and compaction frequency and the file rotation threshold; monitor the sawtooth and tune both to keep it under the cap.

Why does the shape matter? Because the disk has a maximum capacity. If the disk is 1 TB, you cannot let usage grow beyond 1 TB. How you want this sawtooth to look decides how often merge and compaction must run, and it determines how your database performs. Keep it at the optimum where it never breaches the cap: as soon as usage crosses the disk’s capacity, the system crashes.

The rule for this whole chapter

Keep the sawtooth under the disk cap.

Two knobs shape it: how often merge and compaction runs, and how big a file may grow before rotation.

[figure title] Keep the sawtooth under the cap

[figure description] A small sawtooth of disk usage stays under a red cap line. Two dials set its shape: merge frequency and the file size at which rotation starts a new file.

[figure labels] cap · merge freq · rotation size

Neither extreme works. Merge too often and there is too much garbage collection going on: the CPU isn’t free to do the actual work. Merge too rarely and a lot of work piles up. The frequency should be smooth enough that performance doesn’t drop.

[figure title] The sawtooth

[figure description] Disk usage rises with writes and drops each time merge and compaction runs, drawing a sawtooth that must stay under the 1 TB disk. Two knobs shape it: merge frequency and the file rotation threshold.

[figure labels] disk used · time · 1 TB · cap · merge & compaction · the two knobs · 1. MC freq · 2. file rotation · threshold

[caption] Fig 8·cDisk usage over time: it climbs in small steps as writes arrive and drops at each merge and compaction, always under the 1 TB cap. Beside it, the board’s two knobs. Redrawn from the class board at 02:25 and 02:35.

So this design has two configurable parameters. The first is the merge and compaction frequency. The second is the file rotation threshold: how big you let a file grow. Real Bitcask goes further on the first knob: rather than running on a fixed clock, it triggers a merge by how much garbage exists, by default when a file has 60% dead keys or 512 MB of dead bytes (files join a merge at 40% or 128 MB), and a merge window can keep merges to off-peak hours docs.riak.com ↗.

How do you set them? By looking at the sawtooth. While you build the store, monitor it, keep both in check, and then decide what the frequency and the size should be. And when you design a database like this, expose both as configurable parameters to whoever you ship it to.

That is the whole engine so far: the best reads, writes, updates and deletes, with efficient disk usage and no wasted space thanks to merge and compaction. It is a pretty standard approach and the best you can do on a cheap magnetic disk, almost as fast as SSDs. That holds for writes: appends approach the disk’s sequential speed, but every get still costs one random seek on a magnetic disk (Bitcask promises never more than one), so random reads stay far behind an SSD docs.riak.com ↗.

On SSDs you still get benefits, but not as significant, because SSDs don’t use a rotating disk; they use flash memory, which handles writes very well on its own. Flash does have its own catch: it can’t be overwritten in place, only erased and rewritten, so random in-place updates cause internal garbage collection, and append-only writes stay the flash-friendly pattern. Zoned SSDs go as far as requiring each zone to be written sequentially zonedstorage.io ↗, which an append-only layout fits naturally.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why are only the non-active files merged?

[summary] Show answer

Because the active file is still taking every write, while the others are immutable: nothing will ever be appended to them again. The merge can read them at leisure and write one new file from them, and the active file keeps working while it does.

What must happen to the in-memory map after a merge, and why?

[summary] Show answer

Every key whose entry moved must be repointed to the new file and its new offset, because the old files are about to be deleted and the old offsets mean nothing in the new file. The prepared notes say to do it atomically.

Name the two knobs and what goes wrong at each extreme of the first.

[summary] Show answer

Merge and compaction frequency, and the file rotation threshold. Merge too often and garbage collection takes the CPU away from real work; merge too rarely and work piles up, and the sawtooth can climb past the disk’s capacity, which crashes the system.

Concepts in this section: hint files · file rotation · active file · merge and compaction · sawtooth · two knobs

Contents of this lecture ↑

Lecture 10, chapter 8 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 9-record-format ===

# Files as a database, chapter 9: Record format and integrity

Lecture 10 · Files as a database · chapter 9 of 11

§ 9

## Record format and integrity

“Write key, value” is too casual. Prefix every record with its sizes so one read gets it all, and lead with a CRC so a half-written record is caught, not served.

About 8 min · class 02:25–02:32, Q&A 02:51–02:56

The machine loses power halfway through appending a 1 MB value. Later, more records are appended after it. Then a get for that key arrives. What does the store return?

So far every chapter has written “K1 V1” into the file as if that settled how an entry looks on disk. It doesn’t. This chapter gives each record a format: sizes first, so a reader knows exactly how much to read, and a checksum, so a broken record is caught instead of served.

§ 9.1

## Don’t read until the newline

Files are read in blocks, not lines. Put the sizes in front and a record takes two reads.

About 3 min · class 02:25–02:29

Here we casually said: write the key and the value into the file. It is much more than that. Even the dictionary was simplified to “word, comma, meaning”, read line by line. But that is not how files are read. Files are read by blocks, so a store on disk needs a defined record format for each entry.

That is how every database works. Pick any of them, MySQL, Postgres, MongoDB, Redis: whenever they serialize data to disk, they have their own format in which they write it, designed so that reading it back is efficient.

[figure title] Sizes before the bytes

[figure description] Reading a record until a newline costs one call per byte. Prefixing each record with its key size and value size, 4 bytes each, lets a reader fetch it in two reads: the 8 bytes of sizes, then exactly the key and value.

[figure labels] because key and value are variable length · K · V · one byte at a time until \n? · just read me until \n · key size & value size · KSZ · VSZ · K · V · 4 B · 4 B · 1 · 8 B · 2 · KSZ + VSZ bytes · two reads · we read KSZ (4 B), VSZ (4 B), · then KSZ bytes for the key, · VSZ bytes for the value

[caption] Fig 9·aTop: reading until a newline goes one byte at a time. Bottom: with the key size and value size up front, a record is two reads, the 8 bytes of sizes and then exactly the key and value. Redrawn from the class board at 02:27.

So what does one entry look like? The easy idea is to store the key, then the value, and read until a newline. But think about what that costs: if you read one byte at a time until you hit \n, you make one disk I/O per byte, and that makes things very slow. Reading until a newline is the kind of code a school kid would write. To be exact, it is one read call per byte: the operating system’s page cache keeps recently read file data in memory, so most of those calls don’t reach the disk kernel.org ↗. It is still slow, and a length-prefixed format lets you read the whole record in one go.

Instead, at any offset you should know exactly how many bytes to read to get the complete key-value entry, so the whole entry comes in one shot.

The rule for this whole chapter

At any offset, know exactly how many bytes to read.

Sizes first, so a record is read in one shot; a CRC on the record, so a broken one is never served.

[figure title] Know how many bytes to read

[figure description] A record laid out as CRC, timestamp, key size, value size, key, value. The sizes come first, so the key and value can be read in one shot; the CRC up front, checked, says the record is whole.

[figure labels] CRC · TS · KSZ · VSZ · K · V · sizes first · read in one shot

So instead of writing just the key and the value, also write their sizes. First the key size, which says how many bytes the key takes; then the value size, which says how many bytes the value takes. Each is a 4-byte integer, 8 bytes together, and they sit before the key and the value.

Reading a record is now two disk I/Os. The first reads those 8 bytes: the first 4 are the key size, the next 4 the value size. Add them up, and the second I/O reads exactly that many bytes, which you split into the key and the value. That gives read predictability, and it is the same idea as the metadata header of the dictionary in 3.2.

The dictionary should store its entries this way too: word size, meaning size, then the word and the meaning. It was written as CSV earlier only because that is easy; with this record format, its design can now be updated.

[figure title] The dictionary, re-recorded

[figure description] The dictionary's apple entry in the record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning. The CSV line it replaces is shown struck out above it.

[figure labels] apple,a round fruit⏎ · CSV: the easy start · 5 · 13 · apple · a round fruit · 5 B · 13 B · word size · meaning size (4 B each) · ← same idea as the 16-byte header (§3)

[caption] Fig 9·bThe dictionary’s apple entry in the same record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning. Cells drawn in proportion to their bytes.

§ 9.2

## Detecting a torn write: CRC first

A crash can cut a record in half. A checksum is how a reader finds out.

About 3 min · class 02:29–02:32

A lot of people stop at key size and value size. Don’t. A database must be fault tolerant. Say you are writing a gigantic value and the machine crashes halfway: you had written 110 and then the power went. The write failed and the entry is corrupt. You can’t fix it, because the data is gone, but you must at least know that the entry lost its integrity, and not serve it.

A partial entry is dangerous for a second reason. Once the machine is back, the next entry is appended right after the broken one. If you then read “value size” bytes from the broken entry, the read runs into the entry after it.

Pause and think

Records are key size | value size | key | value. The machine loses power halfway through writing a 1 MB value; after restart, more records are appended. A get for that key arrives. Can the store tell the record is broken from the sizes alone?

No; add a CRC. The design below puts it first in the record and flushes it first; real formats differ on placement (see the note further down), but every one checks it before trusting the data. Corrupt records are skipped, for example during merge.

The only way to detect it is a CRC, a cyclic redundancy check: a checksum. It is a simple hash over everything in the record: key size, value size, key and value. You build the record in memory, compute the hash of it, and store that checksum with the record.

The CRC goes on the leftmost side of the record. It is the first thing you write, the first thing you make sure is flushed, because it is the bare minimum you need to know that something is corrupted. You cannot write the CRC at the end; you write it at the beginning. It is the same instinct as the distributed ID generators, which put the timestamp on the leftmost side. back in · Lecture 6: the timestamp on the leftmost side of an ID

Good persistent record formats do this: the Postgres commit log puts the CRC on the leftmost side, and so does the MySQL binlog.

More precisely

Putting the CRC first is a convention, not a rule. Bitcask and LevelDB LevelDB log format ↗ put it at the start of each record, and Bitcask writes the whole record, CRC included, in one write, so the CRC is not flushed separately. The Postgres WAL and the MySQL binlog also protect every record with a CRC, CRC-32C per WAL record postgresql.org ↗ and CRC32 per binlog event by default dev.mysql.com ↗, but they place it elsewhere: Postgres at the end of the record header xlogrecord.h ↗, MySQL in the last 4 bytes of each event dev.mysql.com ↗. Either works as long as the reader knows the record length and checks the CRC before trusting the data.

Bitcask source ↗

The same goes for network formats: pick any of them and the CRC comes first, because those are the first bytes you receive and they tell you whether the data coming in is corrupted.

More precisely

Network frames carry checksums so the receiver can detect corruption, but often not first: the PPP frame check sequence comes after the data, and the TCP checksum sits in the middle of the header RFC 9293 ↗.

RFC 1662 (PPP) ↗

So the final record is: CRC, timestamp (just for conflicts), key size, value size, key, value. Real Bitcask writes exactly this order: CRC32, timestamp, key size, value size, key, value, with the CRC32 computed over everything after it; the reader decodes the same order and re-checks the CRC Bitcask source ↗.

[figure title] A torn record

[figure description] The machine crashes while writing a big value, so the record is cut short; after restart the next record is appended right after it. A reader that trusts the value size reads past the torn bytes into the next record and serves garbage. With a CRC written first, over the sizes, key and value, the reader recomputes it, sees it does not match, reports the record as corrupt and skips it; the next record checks out.

[figure labels] KSZ · VSZ · K · 110… · machine crashed while writing value · KSZ · VSZ · K · V · reads into the next record · CRC: first thing written · CRC · TS · KSZ · VSZ · K · 110… · doesn’t match → “corrupt”, skip · CRC · TS · KSZ · VSZ · K · V · TS: for conflicts · 1 · crash: the value is cut short · 2 · restart: next record appended · 3 · trusting VSZ, the read runs on · 4 · CRC fails → corrupt, skip

- The machine crashes while writing a big value. The record is cut short.

- After restart, new records are appended right after the broken one.

- Trusting VSZ, a reader runs into the next record and serves garbage.

- With a CRC first, the reader computes the checksum, sees it fails, and skips the record instead of serving it. The next record checks out.

Keys: ← → to step · link to a step with #fig-9c/step-3

[caption] Fig 9·cOne record per line; in the file, the second record starts right where the first one breaks off. Blue is the read; red, the torn bytes and the overrun; green, a CRC that checks. Redrawn from the class board at 02:29 and 02:32.

The writes happen in order. First the header part, then the key in one disk write, then the possibly gigantic value in another. If the first write itself fails, the entry doesn’t exist: problem solved. If it succeeds and a later write fails, then on read you check the CRC, see it doesn’t match because something is corrupt, and tell the user the entry is corrupted. You never serve corrupted data to your users.

What then? Recovery is mostly heuristics. You ignore that entry, in merge and compaction and elsewhere, and assume the write never came your way, because corrupted data can’t be recovered anyway. LevelDB’s log does the same: each record starts with a CRC32C, and when the reader finds corrupted data it skips it and resynchronises at the next block boundary rather than trying to repair it LevelDB log format ↗.

So whenever you design storage, question the defaults. Is CSV the best way? Is reading until a newline good enough? It isn’t. Key size, value size, key and value, all of it with CRCs: integrity checks, durability, fault tolerance.

§ 9.3

## Is the header write atomic?

The pattern quietly assumes the small header is written whole. Kernels don’t all promise that.

About 3 min · Q&A 02:51–02:56

A sharp question follows from this design. It assumes that writing the whole value is not atomic, a crash can tear it, but that writing the checksum and the header is. The answer given in class was yes: writing the header is atomic. Neither POSIX nor disks actually promise that a small header write survives a crash whole: a power loss can leave some 512-byte sectors written and others not, and an unaligned header can straddle a sector postgresql.org ↗. The CRC design doesn’t need atomic headers anyway: a torn header fails the CRC check just as a torn value does.

Different file systems and kernels give different guarantees. The pattern assumes that a header smaller than the block size is written whole by the kernel; but your kernel might not give that guarantee, so the behaviour can differ when the same software runs on different kernels. Postgres takes this seriously: it writes 8 KB pages, 16 sectors of 512 bytes, and since a power loss can leave some sectors written and others not, it logs full page images to its WAL (full_page_writes), which can be turned off on file systems such as ZFS that prevent partial page writes postgresql.org ↗.

In any case, the header is tiny: an 8-byte field and a few 4-byte ones, roughly 20 bytes. In practice it will be written.

More paranoid systems, where the kernel doesn’t guarantee this, keep a separate WAL. That point was raised in class, with the observation that the pattern here is more performant; it was left open, as exactly the kind of nitty-gritty worth digging into.

This is the part most designs skip. In the instructor’s view, almost no system design overview covers integrity: people say “write it to a WAL” without saying how, and hardly anyone talks about security and integrity, though database internals deal with it all the time. Ignore it, in his view, and systems only seem to work fine. In reality they don’t, and without the occasional engineer who thinks about integrity, everything goes for a toss.

[summary] Go deeper: Postgres internals skip unless you like engine internals

Hussein Nasser has been publishing Medium posts on Postgres internals: record-level formats, pages, snippets of the source. Blog posts rather than videos, and best read once you understand file I/O, for example after implementing Bitcask yourself.

One thing from those posts surprised the instructor: how many pages Postgres takes up to store meta information compared with actual data.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does a key-size/value-size prefix turn a record read into exactly two I/Os?

[summary] Show answer

The first read takes the fixed 8 bytes: 4 for the key size, 4 for the value size. Their sum is exactly how many bytes the key and value take, so the second read fetches all of them at once. No scanning for a newline, no byte-at-a-time loop.

A record’s value was cut short by a crash. Without a CRC, what goes wrong on the next read? With one?

[summary] Show answer

Without a CRC the reader trusts the value size, reads that many bytes, runs into the next record and returns garbage with no error. With a CRC it recomputes the checksum over sizes, key and value, sees it doesn’t match, reports the entry as corrupt and skips it.

Name two real formats that put the CRC first and two that put it elsewhere.

[summary] Show answer

First: Bitcask and LevelDB’s log, at the start of each record. Elsewhere: the Postgres WAL, at the end of the record header, and the MySQL binlog, in the last 4 bytes of each event. All four check every record; the position is a convention.

Concepts in this section: record format · key size, value size · torn write · CRC · atomic header

Contents of this lecture ↑

Lecture 10, chapter 9 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 10-bitcask ===

# Files as a database, chapter 10: It’s called Bitcask

Lecture 10 · Files as a database · chapter 10 of 11

§ 10

## It’s called Bitcask

One map of keys in memory, append-only files on disk, merges in the background, a CRC on every record: that is Bitcask. What it can’t do, where it runs, and how it differs from the LSM trees coming next week.

About 13 min · class 02:32–02:41, Q&A 02:43–02:46, 02:51

The design is complete: a map in memory, small append-only files with one active, merge and compaction in the background, and a CRC on every record. Before it gets its name, two questions. What is its one hard limit, and what does it give in return?

§ 10.1

## What we built: one map, many files

Every key in memory, pointing at its latest record in any file; writes only to the active one.

About 4 min · class 02:32–02:37

Put everything together. Every operation is a key-value record in the format of chapter 9, appended one after another. One file would grow too big, so files rotate: whenever a file reaches its threshold, writing moves to a new one, and only one file is active at any point in time; the rest are just available for reads.

That changes what the in-memory hash table holds. It used to store a key and an offset. Now, for each key, it stores the file the key is in, the size of the record, the offset, and a timestamp for conflicts and meta information. Entries can point into any file, but writes always go to the active file.

[figure title] One map, many files

[figure description] Bitcask’s in-memory map holds, for every key, the file id, entry size, offset and timestamp of its latest record; entries point into any file, while writes go only to the active one. A get is one map lookup, one disk seek and one read. Every key must fit in memory.

[figure labels] entry size · timestamp · K1 · file id · vsz · vpos · ts · offset · K2 · file id · vsz · vpos · ts · 001 · 002 · 003 · active · immutable · · available for reads · GET(k) → pointed queries · 1 · hash table lookup · 2 · disk seek · 3 · disk read · limitation: index (every key) must fit in memory

[caption] Fig 10·aEach map entry names the file, the entry size, the offset and the timestamp of the key’s latest record. K1 points into a read-only file, K2 into the active one. A get is one lookup, one seek and one read. Redrawn from the three prepared slides shown in class at 02:33, merged into one view.

This sounds very fancy: O(1) put, O(1) delete, O(1) get. So what is the limitation? All the keys must fit in memory. Values are flushed to disk, but the in-memory structure holds every key with its offset. On disk there are keys and values; in memory, keys and offsets. So the number of keys you can fit in memory decides how many keys this database can store.

The strengths come from doing the bare minimum disk I/O. You get very high write throughput and very low write latency. A read is one memory lookup and one random read, then the data goes back and the disk returns to writing.

That also means I/O saturation: the physical device’s I/O is saturated, and the network’s too, and that is a good thing. Nothing sits waiting for I/O; you are getting the most out of the underlying hardware.

And backups are easy. The data is just normal files, so copy them, and you have a backup.

§ 10.2

## Bitcask, Riak and Uber

An embedded database, made distributed by Riak.

About 4 min · class 02:37–02:40

The database we just designed is called Bitcask. It is an embedded database.

Embedded means it isn’t a central server. Bitcask is not like a MySQL server that is spun up and that everyone connects to; it is closer to a library inside your program. SQLite is an embedded database too, and Bitcask has no separate server. SQLite is the classic example of this serverless style: the application process reads and writes the database file directly, with no separate server process sqlite.org ↗.

Bitcask is used by Uber in production, for its main ride-hailing service. Because Bitcask is embedded, Uber doesn’t run it on its own: Uber uses Riak as its main database, and Riak is a simple key-value store that uses Bitcask as its back end.

More precisely

Around 2015 Uber used Riak, whose default storage backend is Bitcask docs.riak.com ↗, for parts of its new dispatch services. Its core trip data lived in Postgres and then moved to Schemaless, a MySQL-based store uber.com ↗. So Bitcask ran at Uber through Riak, but not as the store of the main ride-hailing data.

riak.com ↗

The relationship has a familiar shape. Elasticsearch is an HTTP wrapper over Lucene; in the same way, Riak is a wrapper over Bitcask.

Riak’s job is to make Bitcask distributed. The data is split into mutually exclusive sets, and Riak adds what a single embedded store doesn’t have: master-slave architecture, consensus, a proxy to connect seamlessly and route requests, consistent hashing, data movement. Underneath, Bitcask does what it is good at, getting the most out of the disk when storing and retrieving data. back in · Lecture 9: consistent hashing

More precisely

Riak is masterless. Keys are hashed onto a ring split into partitions owned by vnodes; each write goes to the owning vnode and the next N−1, and any node can coordinate a request docs.riak.com ↗. Partitions are disjoint key ranges, but each key is stored on N vnodes, and each partition runs its own Bitcask instance underneath docs.riak.com ↗.

docs.riak.com ↗

[figure title] Bitcask inside Riak

[figure description] Riak, a distributed key-value store, runs an instance of Bitcask under every node. A request can go to any node; keys are hashed onto a ring and each key is stored on N nodes, with no master.

[figure labels] riak · bitcask · riak · bitcask · riak · bitcask · each key on N nodes · what we just designed is · bitcask · any node can route the request · no master: keys hashed onto a ring · each node of Riak has an instance of Bitcask running

[caption] Fig 10·bEach node of Riak has an instance of Bitcask running. Drawn as Riak actually works (see the note above): no master, any node can take the request, and each key lives on N nodes of the ring. Redrawn from the class board at 02:38.

Look back at the design and one piece carries it: the append-only file is the magic behind getting the most out of cheap commodity hardware.

That gives a heuristic worth keeping. Whenever a system claims high throughput with persistence, it is using an append-only file or something similar. If it isn’t, the instructor doesn’t believe the high-throughput claim. Treat it as a strong heuristic, not a law: many high-throughput persistent systems do use append-only logs, but throughput also comes from batching, group commit, relaxed sync (Cassandra, for one, can acknowledge writes before its periodic commit-log sync) and in-memory designs cassandra.apache.org ↗.

The rule for this whole chapter

Whenever a system claims high throughput with persistence, look for an append-only file.

If it isn’t there, ask how the system gets its throughput.

[figure title] Throughput with persistence means append-only

[figure description] An append-only file, a write arrow going into its tail, and beside it a throughput gauge reading high: when a system claims high throughput with persistence, look for the append.

[figure labels] append · throughput · look for the append

That is what Bitcask is about. It is really simple, yet it covers the intricate details: data integrity checks, the record format, merge and compaction, and getting the most out of cheap commodity hardware. It is heavily used in production through Riak, and most Riak setups have Bitcask as their back end.

§ 10.3

## Bitcask vs LSM, and build it yourself

How Bitcask differs from memtables and SSTables, why it comes first, and a week-long project.

About 5 min · class 02:40–02:41, Q&A 02:43–02:46, 02:51

Right after the reveal comes an obvious question: when people talk about LSM trees, SSTables and memtables, is that this same process, or is there something extra? The big difference, as taught: in an SSTable design you also keep values in memory, while Bitcask does not. SSTables are also sorted, and that sorting leverages something else, which is covered in depth next week.

More precisely

In an LSM engine only the memtable (recent writes) is in memory; SSTables are sorted, immutable files on disk, written when a memtable is flushed. Every write first goes to an on-disk commit log. Bitcask, by contrast, keeps every key (not values) in memory docs.riak.com ↗.

cassandra.apache.org ↗

The second difference is persistence. Bitcask writes every write to disk immediately, by default: it prioritises persistence while still getting the most out of the disk. A memtable buffers writes and writes them later, so if memory goes down, data can be lost.

More precisely

Bitcask appends every write straight to its data file, while an LSM engine appends it to a write-ahead log and buffers it in a memtable, which the log can fully recover RocksDB wiki ↗. In both, crash durability depends on how often the log is synced: Bitcask’s default (sync_strategy none) leaves flushing to the OS, and o_sync forces a sync on every write at a throughput cost; Cassandra’s default periodic sync can lose up to 10 s cassandra.apache.org ↗.

docs.riak.com ↗

Bitcask vs an LSM engine (memtable + SSTables), as corrected in the notes above

|

| Bitcask

| LSM (memtable + SSTables)

| What’s in memory

| Every key, with file id, entry size, offset and timestamp; no values

| Only the memtable: the recent writes

| On-disk files

| Append-only data files, merged and compacted in the background

| Immutable SSTables flushed from the memtable, plus a commit log

| Sorted?

| No: entries sit in write order

| Yes: SSTables are sorted (why comes next week)

| Write path

| Append the record to the active file, then update the map

| Append to the commit log, insert into the memtable, flush to an SSTable later

| Durability default

| sync_strategy none: the OS decides when to flush; o_sync syncs every write

| The log recovers the memtable; Cassandra’s periodic sync can lose up to 10 s

| Limit

| Every key must fit in RAM

| Not covered in class

Bitcask was taught first on purpose, as the foundation. Next week moves on to SSTables, memtables, LSM trees, and high-throughput systems such as counting. coming later · week 6: SSTables, memtables, LSM trees, counting at high throughput

That order matches Martin Kleppmann’s book, which covers Bitcask in its storage chapter: understand Bitcask first, and the other storage engines become easy to understand. The instructor came across Bitcask in a storage paper-reading course in college and was struck by how simple and beautiful it is. There is a Bitcask paper, a search away, and it is worth reading.

Reading isn’t the main recommendation, though: implement it. The instructor implemented Bitcask about five years ago and benchmarked it himself against on-disk and in-memory key-value stores, on magnetic disks and on SSDs, which is why he is sure of how it gets the most out of the hardware and saturates I/O.

[summary] Project: build your own Bitcask skip unless you’ll build it this week

Build put, get and delete over an append-only file; the in-memory map; file rotation; a merge process; the CRC record format from chapter 9. It isn’t really difficult, and building it gives a much deeper understanding of file I/O and of getting maximum performance out of a disk. It also surfaces the devils in the details: do you merge files in the same process or a different one? How do you update the in-memory index while a merge runs? Spare about one week for it.

To benchmark it, set up Prometheus on a machine, monitoring the store continuously while it runs. The suggestion in class was two weeks, then one week of your time: implement it, and measure.

### Check yourself #

Answer in your head, or out loud, before opening each one.

What bounds how many keys a Bitcask node can hold, and why not values?

[summary] Show answer

Memory. The map keeps every key in RAM, with its file id, size, offset and timestamp, so the keys that fit in memory are the keys you can store. Values never live in the map: they are on disk, and the map only points at them.

What does Riak add on top of Bitcask, per the note in 10.2?

[summary] Show answer

Distribution. Riak hashes keys onto a ring of partitions owned by vnodes, stores each key on N of them, and lets any node coordinate a request; there is no master. Each partition runs its own Bitcask underneath to read and write the disk.

Give two differences between Bitcask and an LSM engine, as corrected in the notes.

[summary] Show answer

Memory: Bitcask keeps every key in RAM; an LSM engine keeps only the memtable, its recent writes, and its SSTables are sorted, immutable files on disk. Write path: Bitcask appends straight to its data file; an LSM engine appends to a commit log first, then buffers in the memtable. In both, how often the log is synced decides what a crash can lose.

Concepts in this section: in-memory map · I/O saturation · embedded database · Riak · LSM vs Bitcask

Contents of this lecture ↑

Lecture 10, chapter 10 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 11-what-to-keep ===

# Files as a database, chapter 11: What to keep

Lecture 10 · Files as a database · chapter 11 of 11

§ 11

## What to keep

The same few ideas built both engines. Here they are side by side, with the heuristics that kept coming back, and where the course goes next.

About 2 min · class 02:41–02:42

Two problem statements, two storage engines, and no database server in either. The dictionary is read-mostly, lives in one file on S3 and changes once a week. The key-value store takes writes as fast as a cheap disk allows and never loses one. They look nothing alike from the outside, yet they are built from the same handful of ideas.

[figure title] Two engines

[figure description] The two engines side by side: the dictionary as one indexed file on S3, read by API servers that keep a word-to-offset map in memory and updated by a job that merges into a new path; and the key-value store as append-only files with an in-memory map of keys to file and offset, cleaned by merge and compaction. Both keep a small map in memory pointing into big files (a), read records by known sizes (b), and never write in place (c).

[figure labels] same ideas, twice · api · ×3 servers · w → o · a · map · s3 · H · I · D · b · sizes · meta.json · update job · merge → new path → deploy · c · never in place · the dictionary (§1–§6) · in-mem · K → file, O · a · map · 001 · 002 · 003 · c · never in place · merge & compaction · CRC · TS · KSZ · VSZ · K · V · b · sizes · the key-value store (§7–§10)

[caption] Fig 11·aLeft, the dictionary: API servers with a word → offset map, one indexed file on S3, a weekly job that merges into a new path. Right, the key-value store: a key → file + offset map, append-only files, merge and compaction. The letters mark the ideas they share, the rows of the table below.

### Same idea, twice #

The dictionary and the key-value store, idea by idea

|

| The dictionary (§1–§6)

| The key-value store (§7–§10)

| a · In-memory index

| word → offset, loaded at boot (2.3)

| key → file + offset, updated on every write (7.4, 8.2)

| b · How many bytes to read

| The 16-byte header says where each part lies (3.2)

| The KSZ + VSZ prefix on every record (9.1)

| c · Writes in place?

| Never: it overwrites the next entry, so build a new file (5.2)

| Never: append, no matter what (7.3)

| The merge

| Sorted two-pointer merge, as in merge sort (5.3)

| Hash-table merge and compaction (8.3)

| After a change

| Upload to a new path, then trigger a deployment (6.4)

| Repoint the map to the merged file (8.3)

| Why files at all

| Cost: one copy on S3 instead of a database

| Cost: full speed from a cheap magnetic disk

### Heuristics to keep #

The same rules of thumb came back again and again, whichever engine was on the board:

- Keep it simple: that is where you see the power and the beauty of a system, and simple systems are the hard ones to build (2.1, 5.1).

- Reads slow? Think indexing (2.1).

- Do the number crunch: what looks huge, a terabyte file of 170,000 words, needed an index of only a few megabytes (2.3).

- Build a file format from compartments plus a header that says where each one lies (3.3).

- Think about cost first: the bare minimum things, at the bare minimum cost (4.1).

- Pin down the properties you need before you pick a technology (4.2).

- Never write in place; write a new file or a new entry (5.3).

- We control our own infrastructure: a routine deployment can do the reload (6.4).

- Append, no matter what (7.2).

- Keep the sawtooth under the disk cap (8.4).

- Know exactly how many bytes to read, and check the CRC before you trust them (9.1, 9.2).

- High throughput with persistence means an append-only file somewhere: look for it (10.2).

### Where this lecture stops #

This week got high throughput on the storage side. Next week is all about high-throughput systems, and extends the storage week to the compute side:

- coming later · week 6 High-throughput systems: S3, video encoding, counting YouTube views, and one more database. Together they form the core of how high-throughput systems are built, and why some things are done the way they are.

- coming later · week 6 Next Saturday opens with a long discussion of S3 and its nitty-gritty. Everything studied so far comes in handy when designing S3.

- coming later · week 6 SSTables, memtables and LSM trees, with Bitcask as the foundation (10.3).

Concepts in this section: the dictionary · index · header · S3 · merge · deployment · append-only · merge and compaction · CRC · Bitcask

Contents of this lecture ↑

Lecture 10, chapter 11 · written from the class recording and board, with sources linked where a fact comes from outside the class.
