=== PAGE: lecture overview ===

Lecture 10 · two builds: a dictionary served from one file on S3, then a key-value store on cheap disks

# Files as a database

Old orders cost money in your main database, and a pile of files on cheap storage can’t answer a question. Build a terabyte dictionary that answers any word with one small read from a single file, keeps answering through a weekly update, and never serves garbage. Then build a key-value store that takes writes as fast as the cheapest disk allows and loses none of them.

- Two builds, one story

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1A terabyte of words, and no database. Where is apple?A 1 TB dictionary of 170,000 words, served with no database. What the brief asks, and what the simplest lookup costs.3 sections · §1.1–1.3

- 2Half a terabyte per lookup. What would tell you where apple starts?Every lookup reads half a terabyte. What would let you skip the meanings you don’t want, and where it should live.2 sections · §2.1–2.2

- 3Two files, and the brief said one. Where does the index stop?The fix left two files, and the dictionary must ship as one. Glue them, and a reader has to know where one part stops.3 sections · §3.1–3.3

- 4A hundred API servers need the file. Where does it live?A hundred API servers, one terabyte file. The obvious place to put it, what that costs, and what the storage must do instead.3 sections · §4.1–4.3

- 5Sunday’s changelog arrives. Can you just rewrite apple’s line?The weekly changelog gives apple a longer meaning. What writing it into the file would do, and the question from chapter 1 that comes back.3 sections · §5.1–5.3

- 6The new file is ready. How does every server move to it?A new dictionary is ready while every server holds last week’s offsets. How the fleet moves over without serving garbage, and what it was all for.4 sections · §6.1–6.4

- 7Writes never stop, and the disks are cheap. Where does a put go?Build 2: a store written to all day, on the cheapest disks, where every write must survive. Where put, delete and get go.4 sections · §7.1–7.4

- 8A month later the disk is nearly full. What is filling it?Nothing ever leaves the store’s file. How big one file should get, who clears out the dead entries, and how often.4 sections · §8.1–8.4

- 9The power fails halfway through a 1 MB value. What does the next get return?A crash cuts a record in half. How a reader knows where each record ends, and how it finds out that one is broken.2 sections · §9.1–9.2

- 10You built a database out of files. What is it, and what can’t it do?The store is finished. Its one hard limit, its name, what the two builds shared, and what ten lectures have given you.5 sections · §10.1–10.5

How likely are you to open an Amazon order you placed six months ago? Not very. Yet every one of those orders still sits in the main database, on fast and expensive machines, next to the orders people check every day. Move the old ones to S3 and they cost a fraction as much. But S3 holds files, not tables: you can’t just dump the orders there and still ask for order 1234 without reading everything.

This lecture builds the answer twice, out of nothing but files.

The first build is a toy with real numbers. A publisher hands you a dictionary, 170,000 English words with their meanings, 1 TB in all, and wants an API that returns the meaning of any word. You may not use MySQL, Postgres, MongoDB, Redis, Elasticsearch or any other database. Whatever you build lives in plain files.

[figure title] The brief: a dictionary with no database

[figure description] A requirement card for the dictionary, with four tabs along its top: storage, query, portability, seamless updates. Inside: a 1 TB file of 170,000 words; one word in, its meaning out, else 404; a key-value store from a word to two or three lines; scalable on storage and API sides; very read-heavy, far beyond 1000 to 1; mostly read-only; a changelog every Sunday and no live updates; a high response time is fine; one portable file. Along the bottom every database is struck out in red: no database at all. Under the card: 1 TB on purpose, too big to copy everywhere.

[figure labels] storage · query · portability · seamless updates · 1 TB · 170,000 words · one word in → meaning out, else 404 · key → value: word → 2–3 lines · scalable: storage and api sides · read-heavy: ≫ 1000 : 1 · mostly read-only, like Oxford · changelog every Sunday · no live updates · high response time is OK · one portable file · mysql postgres mongodb redis elasticsearch memcache · no database at all · 1 TB on purpose: too big to copy everywhere

[caption] Fig 0·aThe brief, as a card. The four tabs are what every design in chapters 1–6 is judged on; the struck-out row is the one rule with no exceptions.

### Where you are #

Lecture 9 built a cache like Redis: one hash table in memory, every byte counted, then a ring of nodes, and an append-only file that only mattered after a restart. Everything lived in RAM, which is why it was fast, and why it had a ceiling. Lecture 7 put Instagram’s photos in S3 because it is dirt cheap, and fetched each photo whole. Lecture 3 built a key-value store on one MySQL table and let the database do the hard parts.

### What you’ll build #

Build 1, a dictionary on S3 (chapters 1–6). Read-mostly, updated once a week, and it has to ship as one file. You start with a plain text file and a lookup that reads half a terabyte. Each chapter fixes the problem the last one left: how to find one word, how to keep it one file, where the file lives when a hundred servers need it, how to change it on Sunday, and how every server moves to the new version without a single user reading garbage. At the end you meet the old orders again.

Build 2, a key-value store on cheap disks (chapters 7–10). Now the data is written all day: puts, updates and deletes, each safe on disk before it is acknowledged, on the magnetic disks that hold most of the world’s data because SSDs cost too much. It is a database many people use without knowing it. You design put, get and delete, then deal with the disk filling up and a crash tearing a record in half, and only then find out what it is called.

The tools in both builds are the same few: a file, byte offsets, and a small map in memory. What changes is how hard the writes push.

### What you’ll be able to do #

- Size an index before you build it, and decide from the number where it lives.

- Read a few bytes from one huge file on S3, and say what storage can stand in for S3.

- Apply a batch of changes to a big file without ever corrupting what is being served, and move a fleet onto the result.

- Design a store that takes writes as fast as a cheap disk allows, and say what it costs in memory and disk.

- Catch a half-written record instead of serving it.

### Before you start #

You need a load balancer with API servers behind it, a hash map, and what a byte offset in a file is. Python sketches show the code; any language works the same way.

Each chapter opens with a small map of what has been built so far. When a “Pause and think” box asks you something, commit to an answer before you open it.

Lecture 10 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-no-database ===

# Files as a database, chapter 1: A terabyte of words, and no database. Where is apple?

Lecture 10 · Files as a database · chapter 1 of 10

§ 1

## A terabyte of words, and no database. Where is apple?

About 6 min

A user asks for “apple”. Somewhere in a terabyte of text is its meaning, and there is no database to ask. Before you can find it, you have to decide what you are building and what the file looks like.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file.

[figure labels] from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file

[caption] Fig 1·aWhere you start: the brief and nothing else. Over the next six chapters the dictionary’s rows fill in.

§ 1.1

## What exactly must the dictionary do?

Compute, the API servers, and storage, normally a database, both still have to scale; only the database is gone. Speed is not today’s problem: a high response time is acceptable, because there are many known ways to make a system faster later.

It is a standard English dictionary, and it is mostly read: think how rarely the Oxford dictionary changes. A thousand reads to one write understates it. A lookup is always a single word. No autocomplete: given a word, return its meaning, and if the word doesn’t exist, return 404. So it is a key-value store, where the key is the word and the value is two or three lines of meaning.

There are no live updates. Every Sunday a changelog arrives with only the changed words and their new meanings, and one big processing pass a week to apply it is fine.

The whole thing is 1 TB for 170,000 words, several megabytes per word. Two or three lines of text don’t come close; the publisher’s entries carry audio and video with each meaning, which is how 170,000 words reach a terabyte. The size is on purpose. A small file you would simply copy to every server; a terabyte forces you to think about where the file lives and what copying it costs.

The last requirement drives more of the design than any other: the dictionary must be portable. Portable means literally one file, holding everything needed to read it and write it, that you can copy and ship. Not ten files, not a hundred. You will move this file around a lot: onto a server that updates it, onto S3, to anyone who wants to read it. One file is one thing to move, and nothing to keep in step.

§ 1.2

## JSON, or a plain text file?

The first choice is the format. JSON is tempting, and a lot of people put a lot of data in JSON files. Here it is the wrong fit. A JSON document has no way to jump to one entry: to find out whether a word is there, a parser has to read its way through the file from the top, and usually builds the whole thing in memory as a hash map before you can ask it anything. With a terabyte, that is a disaster on every lookup.

So use a plain text file, CSV-like, one line per word: apple,a fruit, a newline, then amazon,a rainforest, and so on.

[figure title] A plain text file

[figure description] The dictionary as one plain text file, one line per word with its meaning: apple, a fruit; amazon, a rainforest; and so on, 1 TB in all. Beside it, text file has a green tick and JSON file is struck out in red, because checking one word would mean reading and parsing the whole file. No word appears twice.

[figure labels] text file · JSON file · must read + parse · all of it · apple,a fruit · amazon,a rainforest · 1 TB · one line per word: word , meaning · no word twice

[caption] Fig 1·bThe dictionary as one plain text file, one line per word. JSON is struck out: checking one word would mean reading and parsing all of it.

Could a word appear twice, so that an update is just one more line? No. There are no columns here, only words and meanings, and a portable file that someone opens in a text editor must not hold two different meanings for apple. So: no repeated entries.

Will you keep the file sorted? For now, no. Nothing needs it yet, since response time isn’t a constraint, and the words can sit in any order. Hold on to that question. It comes back.

You might reach for a hundred files with each word routed to its own, or one zip of many folders: both break the one-file rule. Start with the simplest thing that meets the brief, and add structure only when a number forces you to.

§ 1.3

## Read until you find it. How much is that?

Here is the simplest lookup. Open the file, read it line by line until a line starts with the word, stop, read the meaning, and send it back.

def lookup(word): with open("data.dict") as f: for line in f: # from the top, every time w, meaning = line.rstrip("\n").split(",", 1) if w == word: return meaning return None # -> 404

It works. Now count what it reads. The words are in no particular order, so the one you want is anywhere. In the worst case a request reads the whole 1 TB file; on average it reads half, 0.5 TB, which is 500 GB per request. And the dictionary is very read-heavy, so that cost is paid again on almost every request it serves.

[figure title] The naive lookup scans the file

[figure description] The naive lookup reads the 1 TB file data.dict line by line from the top until it finds the word (the blue arrow down its left edge). A bracket over the whole file reads worst case 1 TB; a bracket over the upper half reads average 0.5 TB, 500 GB per request. Every request pays it again.

[figure labels] apple,a fruit · amazon,a rainforest · data.dict · 1 TB · read line by line · until the word · average: 0.5 TB · = 500 GB per request · worst case: 1 TB · every request, again

[caption] Fig 1·cThe naive lookup. The read is the scan: line by line from the top until the word turns up, half the file on average, and every request starts again.

Half a terabyte per lookup is slow, and it eats the disk’s throughput that every other request needs.

When reads are slow, the first thing that should come to mind is an index. But an index of what, stored where, and how big? A terabyte of data sounds like it needs a big index. Does it?

Lecture 10, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-where-apple-starts ===

# Files as a database, chapter 2: Half a terabyte per lookup. What would tell you where apple starts?

Lecture 10 · Files as a database · chapter 2 of 10

§ 2

## Half a terabyte per lookup. What would tell you where apple starts?

About 5 min

The scan reads 500 GB to find one word. Most of those bytes are meanings you don’t want. What you need is something small that knows where each word is.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. Marked new: data.dict: word,meaning lines.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB

[caption] Fig 2·aThe dictionary after chapter 1: one text file, and a lookup that scans it.

§ 2.1

## What if a small file said where each word starts?

Put a small index on top of the data file, one level only. Each entry holds the word, its offset, the byte position in the data file where that word’s line starts, and the line’s length, so a reader knows exactly how many bytes to fetch.

The offset counts bytes, not lines. apple,a fruit plus its newline is 14 bytes, so apple starts at byte 0 and amazon at byte 14; amazon,a rainforest and its newline take 20 more, so book starts at byte 34.

[figure title] A one-level index

[figure description] A small index file, index.dict, lists each word with the byte offset where its line starts in the data file: apple at 0, amazon at 14, book at 34. Thin pointers run from each index row to its line in data.dict, which is 1 TB. The line "apple,a fruit" plus its newline is 14 bytes, so amazon starts at byte 14. A lookup reads the index, then jumps to that byte.

[figure labels] “Indexing” · apple, 0, 14 · amazon, 14, 20 · book, 34, … · index.dict · apple,a fruit · amazon,a rainforest · book,… · data.dict · 1 TB · 0 · 14 · 34 · keys + offsets + lengths only · "apple,a fruit\n" = 14 bytes · byte offset: the nth byte where the line starts

[caption] Fig 2·bThe index file lists each word with the byte where its line starts in the data file. A lookup finds the word in the index, then jumps straight to that byte.

A lookup now reads the index entry by entry until it reaches apple, takes the offset and length, goes to that byte in the data file, reads that one line and returns the meaning.

That is still a scan. Why is it any better? Because a scan of the data file wades through every huge meaning on its way, while the index holds only words, offsets and lengths. Even in the worst case it is a sequential read of a file that holds no meanings at all, followed by one read at a known place. How small is that file?

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

§ 2.2

## Will the index fit in memory?

If the whole index fits in an API server’s memory, there is no index scan at all: load it once, and every lookup is a hash map lookup plus one read. So before designing anything clever, estimate its size.

Pause and think

The dictionary is 1 TB and holds 170,000 words. An index entry is a word, its byte offset and its line’s length. Will the whole index fit in an API server’s memory?

An entry’s size depends on the word and its offset, not on the meaning it points to, and 170,000 small entries can’t add up to much. Here is the arithmetic.

An entry is the word plus the offset plus the length. Across the distinct words of English the average is about 7.6 letters norvig.com ↗. The offset has to address any byte of a 1 TB file, which is 10¹² bytes; a 4-byte integer stops at about 4.3 billion, so the offset is an 8-byte integer docs.oracle.com ↗. A line is a few megabytes at most, so its length fits in 4 bytes. Store both as raw bytes in fixed-size slots, not as text on a line, since their bytes can happen to look like a comma or a newline, and put one byte in front of the word saying how long it is.

[figure title] The number crunch

[figure description] The index estimate as a calculator strip: 170,000 words times (1 byte for the word’s length, plus 7.6 for the average distinct word, plus 8 for the byte offset a 1 TB file needs, plus 4 for the line’s length) is 170,000 times 20.6 bytes, 3,502,000 bytes, about 3.5 MB. It fits in RAM: peanuts next to the 1 TB of data. MB here is 10 to the 6 bytes.

[figure labels] 170,000 × · ( · 1 · + · 7.6 · + · 8 · + · 4 · ) · word length + avg word · + offset + line length, in bytes · = 170,000 × 20.6 B = 3,502,000 B ≈ · 3.5 MB · fits in RAM: “peanuts” · ram · MB = 10⁶ bytes · data: 1 TB

[caption] Fig 2·cThe number crunch: 170,000 entries of 20.6 bytes on average. The data is a terabyte; its index fits in RAM many times over.

About 3.5 MB. Next to a terabyte of data, that is peanuts. Any server holds it in RAM without noticing.

This is why you do the number crunch before you design anything. What looked huge, a terabyte and 170,000 words, needs an index of a few megabytes, and no cleverer structure is needed. Lecture 1 did the same with a billion users and found 8 GB.

So keep the index stored on disk, and when the API server starts, load it into an in-memory hash map. A request checks the map for the word. Missing: 404. Present: take the offset and length, read exactly that many bytes at that offset in the data file, return the meaning.

index = load_index("index.dict") # at boot: word -> (offset, length), ~3.5 MB def lookup(word): entry = index.get(word) if entry is None: return None # -> 404, data file untouched off, length = entry with open("data.dict", "rb") as f: f.seek(off) # straight to the line line = f.read(length) # exactly its bytes w, meaning = line.decode().rstrip("\n").split(",", 1) return meaning

No scan is left. Every lookup is one direct, pointed read at the offset the index gives. Storage and query are settled. But look at what you now ship: index.dict and data.dict. The brief said one file.

Lecture 10, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-one-file ===

# Files as a database, chapter 3: Two files, and the brief said one. Where does the index stop?

Lecture 10 · Files as a database · chapter 3 of 10

§ 3

## Two files, and the brief said one. Where does the index stop?

About 6 min

The dictionary is now index.dict, about 3.5 MB of words, offsets and lengths, and data.dict, the terabyte of meanings. Anyone who copies it has to copy both and keep them together, and the brief said one file.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. Marked new: word → offset + length in RAM, ~3.5 MB.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read

[caption] Fig 3·aThe dictionary after chapter 2: the text file, plus a word → (offset, length) map that every server holds in RAM.

§ 3.1

## Why not just glue them together?

One way out is not to store the index at all: ship only the data file, and let each server build the index as it starts. That means every startup reads the entire terabyte to rebuild something that changes once a week. Store the index.

So put both in one file: the index first, then the data. That creates a new problem. A server opening the file reads index entries into its hash map one after another. Nothing tells it to stop after the last one, so it carries on into the data and parses apple,a fruit as if it were one more entry: a garbage word with a garbage offset, loaded into the map. The reader has to know where the index ends.

[figure title] Index and data in one file

[figure description] The index and the data are concatenated into one file. The reader must know where the index stops: a separator line or a fixed-size region are the first ideas.

[figure labels] apple · amazon · index.dict · apple,… · amazon,… · data.dict · index · data · header · where does the index stop? · portable: one file · – special line / separator · – pre-allocate / fixed size · fixed

[caption] Fig 3·bIndex and data in one file. The open question is the zigzag: where does the index stop? Under the bar, the two first ideas.

A separator between index and data works, but the reader checks everything it reads for the marker. A fixed-size index region works too, but wastes space and caps how far the index can grow. Better: put the boundary itself at the very start of the file.

Pause and think

Index and data share one file, index first. What should the reader find at the very start of the file, so that it never has to search for the boundary?

Store the boundary as a number. The reader reads a few fixed bytes, learns the index is so many bytes long, reads exactly that many, and knows that everything after is data. No marker to look for, and no space wasted.

§ 3.2

## What goes in the first 16 bytes?

Those first few bytes are a header: a fixed-size block at the start of the file that describes everything after it. It has to be fixed-size, because the reader must know how many bytes to read before it knows anything else.

Three fields go in it.

- 8 bytes of name, OUR_DICT, so a decoder can tell at once that this is our dictionary and not some other file. If you built your own database, its files would start with its own name in the same way.

- 4 bytes of version, because one format can have variants: version 1 might put the index first, version 2 the data first. The decoder reads the version and acts on it.

- 4 bytes of index size: how many bytes of index follow, in this same file.

struct dict_header { /* 16 bytes, fixed */ char magic[8]; /* "OUR_DICT" */ uint32_t version; /* 1: index, then data */ uint32_t index_size; /* bytes of index that follow */ }; /* then: index[index_size] entries: word length, word, offset, length */ /* then: data … word,meaning lines */

[figure title] A 16-byte header

[figure description] The dictionary's header is 16 fixed bytes: an 8-byte name, OUR_DICT, a 4-byte version and the 4-byte size of the index that follows.

[figure labels] OUR_DICT · – 8 B · version · – 4 B · index size · – 4 B · 16 B · the same 16 bytes, to scale · OUR_DICT · ver · size · index… · data… · 0–7 · 8–11 · 12–15 · not to scale · your own database · would start with its own name

[caption] Fig 3·cThe header: 8 bytes of name, 4 of version, 4 of index size. Below, the same 16 bytes to scale against the index and the data.

Now walk a server through boot.

[figure title] Opening the file

[figure description] Boot, step by step. 1: read the first 16 bytes, the header. 2: the first 8 say OUR_DICT, so this is our dictionary. 3: the next 4 give the version. 4: the next 4 give the index size; read exactly that many bytes. 5: build the in-memory hash map from the index. 6: everything after the index is data, which the offsets point into; the server is ready.

[figure labels] OUR_DICT · ver · index_size · index · data · time · in-mem map · 16 B · 3,502,000 B · 1 · read bytes 0–15 · 2 · 8 B: OUR_DICT · 3 · 1 · 4 B: version 1 · 4 · 3,502,000 · read index_size B · 5 · apple → 0,14 · amazon → 14,20 · build the hash map · 6 · offsets point here · rest is data: ready

- Read the first 16 bytes: that is the header.

- The first 8 bytes say OUR_DICT, so this is our dictionary.

- The next 4 bytes give the version; the decoder acts on it.

- The next 4 bytes give the index size, 3,502,000. Read exactly that many bytes.

- Build the in-memory hash map from the index: apple → 0, 14, amazon → 14, 20, …

- Everything after the index is data, and the offsets point into it. The server is ready.

Keys: ← → to step · link to a step with #fig-3d/step-3

[caption] Fig 3·dThe decoder at boot. The bar is the file; blue brackets mark the bytes being read. Offsets in the map count from the start of the data.

Nothing is searched for. Two reads, one of 16 bytes and one of exactly the index, and the server knows where every word in the terabyte is. The offsets still count from the start of the data, so apple’s line starts at byte 16 + 3,502,000 + 0 of the file.

§ 3.3

## Haven’t you just designed a file format?

You have. Divide a file into compartments, here an index and the data, and put a header first that says where each one lies: that is how custom file formats are built. The dictionary is one file again, and anyone with the decoder can read it, wherever you ship it.

The formats you use every day work the same way. Every PNG file begins with the same 8 bytes, hex 89 50 4E 47 0D 0A 1A 0A, which contain the letters “PNG” and tell a decoder what it is holding W3C PNG ↗. An MP4 file records where its video and its audio lie. JSON is the opposite: no header and no directory, just text, so the only way to find anything is to parse from the top, which is exactly why it lost in chapter 1.

Every format has an encoder that writes it and a decoder that reads it; a browser that said “this web browser does not support TIF format” simply had no TIFF decoder.

The dictionary now finds any word with one read, and ships as one file. It is time to serve it. A load balancer and a hundred API servers are waiting for GET /word, and each one needs the header, the index and a few bytes of meaning. Where does the terabyte go?

Lecture 10, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-many-servers ===

# Files as a database, chapter 4: A hundred API servers need the file. Where does it live?

Lecture 10 · Files as a database · chapter 4 of 10

§ 4

## A hundred API servers need the file. Where does it live?

About 6 min

A user’s GET /word reaches a load balancer, which hands it to one of a fleet of API servers. Each server needs the dictionary’s header and index when it starts, and a few bytes of meaning on every request.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. Marked new: 16 B header | index | data.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file

[caption] Fig 4·aThe dictionary after chapter 3: one file, a 16-byte header in front of the index and the data.

§ 4.1

## Why not a copy on every server?

The obvious answer: put the file on each server’s disk, so every read is local. What is actually wrong with it?

Pause and think

You put a copy of the 1 TB dictionary on each of 100 API servers. Updates come once a week; meanings barely change. What is the real problem?

The cost. Updates are one bulk job a week, so updating every copy is a routine batch. A server answering “a fruit” while another says “a round fruit” for a few minutes is not the end of the world. But 100 servers each holding the same terabyte, on their SSDs, is 100 TB of storage paid for a hundred times over.

[figure title] One copy per server

[figure description] Copying the 1 TB dictionary to every API server: tedious updates and brief inconsistency are tolerable for a weekly update, but a hundred servers hold a hundred terabytes of redundant data. Cost is the real problem.

[figure labels] GET /word · lb · api · 1 TB · api · 1 TB · api · 1 TB · … × 100 servers · 100 servers × 1 TB · = 100 TB · redundant copies, on SSDs · update tedious · fine: weekly, bulk · inconsistency · fine: meanings barely change · COST !!

[caption] Fig 4·bA copy of the dictionary on every API server. Tedious updates and brief inconsistency you can live with for a weekly change; a hundred terabytes of copies you can’t.

Real system design is about doing the bare minimum at the bare minimum cost. You can make almost anything fast by throwing money at it: give each machine a terabyte of RAM and you could hold the whole dictionary in one hash map, no index at all. Fast, and a bad design.

So keep one copy, in one central place that every server reads.

§ 4.2

## What must the shared storage be able to do?

“Put it on S3” comes to mind fast, and it turns out to be right. But start from what you need, not from a product name, and then pick the technology.

What do the servers have in common? The network, and the brief rules out a database. What does the design need from that shared place? Only a few bytes at a time: 16 bytes of header, exactly index-size bytes of index, then a few bytes at some offset per request. Strip it to the bare minimum and one operation is required, a random read: from this file, at this offset, read n bytes, (file, offset, n). The map already gives both numbers: the offset, and the line’s length as n.

S3 does exactly that. It is object storage: whole objects fetched over HTTP by key, where a GET can ask for one byte range, Range: bytes=0-15 for the first 16 bytes GetObject ↗. And it is cheap, which is why Lecture 7 put Instagram’s photos there; there every photo was fetched whole, here nobody ever fetches the whole object.

S3 is not special: HDFS, or network hard disks in a data center, offer the same read; S3 is just the one everyone knows. And on S3 it is still one file.

[figure title] Pointed reads on S3

[figure description] Users' GET /word requests go through a load balancer to API servers that each hold the word-to-offset map in memory. Each lookup is one ranged read of n bytes at an offset in the single file on S3.

[figure labels] GET /word · lb · file path on S3 (config) · api · w → o, n · api · w → o, n · api · w → o, n · (file, off, n) · s3 · I · D · network attached storage · hdfs · network hdd · + file system semantics · (random read) · pointed read

[caption] Fig 4·cThe serving path. Each API server holds a word → (offset, length) map in memory and reads n bytes at an offset from the one file on S3 (I, D: index, data). Under the cloud, other storage that offers the same read.

§ 4.3

## One server, from boot to its first answer

Each server needs one setting: the file’s path on S3, passed as static configuration for now. Boot is chapter 3’s decoder with S3 in place of the disk, and a GET is one ranged read.

[figure title] Boot, then one GET

[figure description] Time runs down. Lanes: an API server and S3. 1: the server starts with the file's S3 path. 2: one ranged read gets the 16-byte header. 3: a second ranged read gets exactly index-size bytes. 4: it builds the in-memory map and starts serving. 5: a GET for apple; the map gives its offset and length. 6: one ranged read of that record, and 200 goes back. 7: an unknown word misses the map and gets 404 without touching S3.

[figure labels] api · s3 · time · 1 · path = · s3://word-dictionary/ · dictionary1.dictionary · 2 · Range: bytes=0-15 · OUR_DICT · 1 · 3,502,000 · 3 · bytes=16-3502015 · the index · 4 · w → o, n · hash map built · 5 · GET /word?w=apple · map: apple → 0, 14 · 6 · bytes=3502016-3502029 · apple,a fruit⏎ · 200 · 7 · GET /word?w=qwzx · map miss · 404 · S3 never touched

- The server starts with one setting: the file’s path on S3.

- One ranged read gets the 16-byte header: OUR_DICT, version 1, index size 3,502,000.

- A second read gets exactly index-size bytes, the index.

- Build the in-memory map, then start serving.

- A request for apple: the map gives its offset, 0 into the data, and its length, 14.

- One ranged read of that line, 14 bytes, and the answer goes back: 200.

- An unknown word misses the map: 404, and S3 is never touched.

Keys: ← → to step · link to a step with #fig-4d/step-3

[caption] Fig 4·dTime runs down. Lanes: one API server and S3. Byte ranges follow from the 16-byte header, the 3,502,000-byte index and apple’s 14-byte line at the start of the data. qwzx is an invented unknown word.

Look at what that is: each request reads only the bytes it needs from a terabyte object on cheap storage. At its core a database is a key-value lookup over files, and this is one, read-only, serving gets straight from S3.

Isn’t an S3 call per request slow and costly? It is, and in a real system you would put a cache in front of the hot words. Reading S3 on every request here shows that pointed reads on S3 are possible at all, and that is the capability this build is after. Chapter 6 shows what it is for.

The file is now read by byte offset, by a hundred servers at once. On Sunday, some of its meanings change.

Lecture 10, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-sunday ===

# Files as a database, chapter 5: Sunday’s changelog arrives. Can you just rewrite apple’s line?

Lecture 10 · Files as a database · chapter 5 of 10

§ 5

## Sunday’s changelog arrives. Can you just rewrite apple’s line?

About 7 min

The changelog is in: apple now means “a round fruit”, and ball and zoo changed too. Only the changed words arrive, not the whole dictionary. The live dictionary is one file on S3, read by byte offset. How does the change get in?

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. Marked new: one copy on S3, ranged GETs.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies

[caption] Fig 5·aThe dictionary after chapter 4: one copy on S3, read by ranged GETs from every server.

§ 5.1

## Who applies the changelog?

Not the API servers; they are busy serving. Spin up a separate server for a scheduled batch job, a cron job, that runs when the changelog arrives. It holds the changelog, downloads the current dictionary from S3, builds the updated file and uploads it. It has to build a whole file: an S3 object can’t be patched, only replaced whole.

[figure title] A job on its own server

[figure description] Each week a separate server downloads the current dictionary from S3 and holds it with the small changelog of changed words; it will build a new file rather than append.

[figure labels] s3: dict1.dict · update: weekly · download · update job · a, … · b, … · dictionary · apple: — · ball: — · zoo: — · changelog · new file · arrives every Sunday · append at end · grows forever, duplicates

[caption] Fig 5·bThe weekly job runs on its own server, which downloads the dictionary and holds the changelog.

The quickest idea is to append the changelog to the end of the dictionary; it isn’t sorted anyway. But then apple is in the file twice, the file grows every week forever, and the brief said no repeated entries. Comparing a hash of every entry against the new one, or generating a diff, is extra work for nothing: the changelog already says exactly what changed. It is easy to build complex systems and hard to build simple ones; think only about what you really need.

What you really need seems simple: the index already knows where apple is, so go there and write the new line over the old one.

§ 5.2

## Apple gets longer. What happens to ball?

Pause and think

The file holds apple,a fruit followed by ball,a round object. You go to apple’s offset and write apple,a round fruit. What happens to ball’s line?

A file on disk doesn’t shift. Bytes written at an offset land blindly on whatever is there, so the longer line runs into ball.

[figure title] Apple runs into ball

[figure description] 1: the file holds apple, a fruit (bytes 0–13) and then ball, a round object (bytes 14–33). 2: the index says apple starts at byte 0. 3: the 20-byte line apple, a round fruit is written from byte 0; its last six bytes land on 14–19, where ball,a was. 4: ball did not move down; its first bytes were overwritten, and the word ball is lost.

[figure labels] changelog: · apple,a round fruit · data.dict · 0 · 14 · steps · a · p · p · l · e · , · a · · · f · r · u · i · t · ⏎ · b · a · l · l · , · a · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · a · p · p · l · e · , · a · · · r · f · o · r · u · n · i · d · t · · · ⏎ · f · b · r · a · u · l · i · l · t · , · ⏎ · a · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · a · p · p · l · e · , · a · · · r · o · u · n · d · · · f · r · u · i · t · ⏎ · · · r · o · u · n · d · · · o · b · j · e · c · t · ⏎ · I’ll just move down, right? · 1 · apple, then ball, byte after byte · 2 · index: apple → 0 · 3 · write 20 bytes from byte 0 · 4 · bytes 14–19 lost: ball is gone

- The file holds apple, then ball, byte after byte: apple,a fruit⏎ is bytes 0–13 and ball,a round object⏎ is bytes 14–33.

- The index says apple starts at byte 0.

- Write apple,a round fruit⏎ there. It is 20 bytes, six more than the old line, so its last six bytes, fruit⏎, land on bytes 14–19.

- Ball didn’t move down. Bytes 14–19 held ball,a; read as text, the file now says apple,a round fruit⏎ and then round object⏎. The word ball is lost.

Keys: ← → to step · link to a step with #fig-5c/step-3

[caption] Fig 5·cThe file byte by byte, one cell per byte (· is a space, ⏎ the end of a line). Numbers on the left are byte offsets. Small grey letters show what a cell held before the write.

In an editor you press Enter and the lines below move down, because the text lives in memory. A file on disk gives you no such operation. It is easy to say “I would replace it”; picture the code you would actually write, seek(0); write(...), and the break is obvious.

§ 5.3

## A new file, then. Can you build it in one pass?

So write a new file: go through the dictionary, write each entry to the new file, put each change where it belongs, and carry on to the end. That sounds naive. It isn’t. It is the merge step of merge sort, the best approach for this design, and it works in one pass when both files are sorted.

That is the question from chapter 1, answered. Sorting didn’t matter for lookups, because the index goes straight to an offset. It matters for the update. Keep the dictionary sorted, sort the changelog too (it is small, so sort it in memory), and the job is a textbook merge of two sorted lists into a third.

Keep one pointer in each file. Compare the two words: write the smaller one to the new file and move that pointer. When the words match, write the changelog’s meaning and move both.

d, c = dictionary.readline(), changelog.readline() while d and c: if d.word < c.word: # the smaller word goes out new.write(d); d = dictionary.readline() elif d.word > c.word: # a word the dictionary didn't have new.write(c); c = changelog.readline() else: # same word: the changelog's meaning wins new.write(c); d = dictionary.readline(); c = changelog.readline() while d: # changelog used up: the rest follows new.write(d); d = dictionary.readline() while c: new.write(c); c = changelog.readline()

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

Nothing is loaded into memory: the job reads both files line by line and writes a third, each file once. And the output comes out sorted, ready as next week’s input: sort the dictionary once, and from then on the merge keeps it sorted for free.

The rule underneath is worth keeping on its own: never overwrite a record in place when its size can change. A write that runs past its slot destroys what follows, so a change goes into a new file.

It has a cost you can compute. The merged dictionary is about a terabyte too, and both sit on the job server at once, so that one server needs at least 2 TB of disk. One server, once a week: fine. The new file is complete, with a fresh index and a fresh header, since the index size changes with every update.

The new dictionary is ready on the job server. Every API server, meanwhile, is still serving last week’s file, with last week’s offsets in its memory.

Lecture 10, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-switch ===

# Files as a database, chapter 6: The new file is ready. How does every server move to it?

Lecture 10 · Files as a database · chapter 6 of 10

§ 6

## The new file is ready. How does every server move to it?

About 9 min

The merged dictionary, with apple’s new meaning, sits on the job server’s disk. Getting it onto S3 is the easy part. Getting a hundred running servers onto it, without a single user ever reading garbage, is the part that takes thought.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. ch 5, weekly merge into a new file, which buys nothing written in place. Marked new: weekly merge into a new file.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies · ch 5 · weekly merge into a new file · nothing written in place

[caption] Fig 6·aThe dictionary after chapter 5: a weekly job merges the changelog into a new sorted file.

§ 6.1

## Why not upload it over the old one?

Uploading to the same path looks simplest of all: every server already knows that path, so nobody needs telling. And S3 won’t serve a half-uploaded file. Overwriting an object is atomic: a reader gets the old object or the new one, never a mix S3 user guide ↗.

So what is the problem? Each server’s index.

Pause and think

The new file lands at the same S3 path. An API server still holds last week’s index: apple at byte 100, 1,024 bytes long. A user asks for apple a minute later. What do they get?

The read still goes to byte 100, but byte 100 of the new file is somewhere else, perhaps the middle of the word before apple. The server’s offsets describe a file that no longer exists.

Every server would have to reload its index the instant the file changes, and until it does, its users read garbage. Overwriting also throws the old file away, so unless the bucket keeps old versions, a new file that turns out to be corrupt leaves nothing to roll back to.

§ 6.2

## A new path. How do the servers find out?

Upload the new file beside the old one, under a new name, and let the old one keep serving until everyone has moved:

s3://word-dictionary/dictionary1.dictionary (serving now) s3://word-dictionary/dictionary2.dictionary (this week's)

Now a server’s index always matches the file it reads. To tell a hundred servers the dictionary’s new name, write it in one small file that never moves: meta.json, at a fixed, never-versioned path, so everyone knows it is the one place to look. The job updates it only once the upload has succeeded.

[figure title] A pointer file

[figure description] The new dictionary is uploaded beside the old one under a new name, and a small meta.json at a fixed path is updated to point at it. The old file keeps serving until the servers move over. Storing one file per word is rejected because it breaks portability.

[figure labels] static path: the one place to look · s3 · dict1.dict · still serving · dict2.dict · new · { path: · "s3://wd/dict2.dict" } · meta.json · update job · upload to a new path · then update the path · s3://word-dictionary/dictionary1.dictionary → dictionary2.dictionary · api · /z/zoo.txt · breaks portability · one file per word

[caption] Fig 6·bA pointer file. The job uploads dict2 beside dict1, then updates meta.json, whose own path never changes. The inset is a tempting shortcut, one file per word, that breaks the one-file rule.

How do the servers learn that meta.json changed? The usual answers each cost something.

Telling every server about the new file

|

| Switch at a set time

| Poll meta.json

| Redis Pub/Sub

| Reload endpoint

| How it works

| Every server swaps on Sunday at 1 PM

| Each server rereads meta.json every 5–10 min

| The job publishes “changed”; servers subscribe

| The job calls each server’s reload API

| What it costs

| Nothing to run, but it switches even if the job failed

| Thousands of polls for one weekly change

| One more component, a persistent connection per server

| The job must know and reach every server

Polling every few minutes for something that changes once a week is wasteful. Lecture 5 answered this for a fleet of load balancers: make it reactive, through a real-time Pub/Sub. That works here too, at the price of running Redis, a connection open on every server and new reload code, all to hear one word a week. Is there something the servers already do that would take care of it?

§ 6.3

## What does a server do when it boots?

Walk through it. A server boots, reads meta.json, sees the path, reads that file’s header and index, builds its hash map and starts serving.

Pause and think

The new dictionary is at a new path, and meta.json points at it. Servers read meta.json only when they boot. What is the least new code that moves every server onto the new file?

A reload is a boot. Replace the servers, and each new one loads the new file by itself, with no polling, no Pub/Sub and no reload API.

The update job calls the deployment pipeline you already have, through the cloud provider’s SDK or a Jenkins job. A rolling deployment takes one server out and brings a new one up, again and again, while the load balancer stays put, and each new server reads meta.json on boot and serves the new file.

So the job does four things, in this order: build the merged file, upload it to a new path, update meta.json, and only then trigger the deployment. And dictionary1 is still there: if the new file turns out bad, point meta.json back at the old path and deploy again.

Same new file, two ways to switch. During the rolling deployment, what does a user asking for apple get?

[caption] Clip 6·1At the same path, servers read the new file with last week’s offsets and serve garbage until each reloads. With a new path, meta.json and a rolling deployment, answers are briefly mixed but never garbage.

[summary] The clip as text 0:36

- Same new file, two ways to switch. Watch the answers.

- Same path: last week's offsets now land in another word. Garbage.

- Garbage until each server reloads its index.

- Bottom: upload to a new path, point meta.json at it, then deploy.

- During the roll, some answers are old and some new. None is garbage.

- Mixed for a while, never garbage: eventually consistent.

The same new dictionary file reaches three API servers in two ways, and each server's answers to GET apple are drawn over time. Top: the update job uploads it to the same S3 path, so dict1 now holds the new content while every server still holds an index built from last week's file. Their offsets land in another word, so every answer is garbage until that server reloads its index; the servers reload one at a time, and the garbage window closes only at the last reload. Bottom: the job uploads the file to a new path, dict2, beside dict1, points meta.json at dict2, then triggers a deployment. The rolling deployment replaces one server at a time; each new server reads meta.json on boot and builds its index from dict2. Meanwhile old servers keep answering from dict1 with the old meaning and new servers answer with the new one: mixed for a while, never garbage, eventually consistent.

During the roll, some users get the old meaning and some the new: briefly inconsistent, eventually consistent, and fine for meanings that barely change in a week. None gets garbage, because every server reads the file its own index was built from.

Many engineers never think of a deployment as a way to reload; we are used to solving problems by writing code and forget that the infrastructure is ours to use too. One engineer, facing this exact problem on a couple of services, first built Redis Pub/Sub and reload APIs, then threw them out and triggered a deployment: the same cost, no new code, nothing extra to maintain.

§ 6.4

## What was all this for?

Look at what the dictionary gave you: one key’s value from one huge file on S3, reading only the bytes it needs. Now go back to the old orders.

Move orders older than six months to S3; recent ones stay in the hot database, MySQL say. When someone does go back to check an old order, the pointed query, order ID in, order details out, works against a file on S3. Dumped there as one big JSON file, they would be archived, not queryable.

[figure title] Cold data you can still query

[figure description] Recent orders stay in the hot MySQL database; orders older than six months move to S3 in an indexed file, so they can still be looked up by order id, slower but much cheaper. Data lakes rest on the same ability.

[figure labels] multi-tiered storage · my orders · api · mysql · latest orders · slower, much cheaper · order_id → offset · → ranged read · s3 · H · I · D · historical orders · (6+ months) · same idea: data lakes · without losing the ability to query the data

[caption] Fig 6·cMulti-tiered storage. Both arrows are reads the API server starts; the old orders sit on S3 in the dictionary’s layout: H, I, D, a header, an index of order IDs, and the data.

This is multi-tiered storage: move data from the hot tier to the cold one to save money, without losing the ability to query it. S3 is slower than the hot database, but its storage is very cheap, and for rarely read data the slower answer is fine. Data lakes rest on the same idea. Table formats such as Apache Hudi build on it: they keep an index from each record key to the file that holds it, so huge data on cheap storage can be queried without scanning everything hudi.apache.org ↗.

From the first scan to the rolling deployment, every step of the dictionary was the simplest thing that worked, and it got away with that because writes came once a week, in one batch, prepared off to the side. Now take data that is written all day long: puts, updates and deletes arriving one at a time, each safe on disk before it is acknowledged. Rebuilding a terabyte file per write is out, and S3 can’t help either: an object in an ordinary bucket can’t be appended to, only replaced whole (only the single-zone S3 Express class allows appends, and at most 10,000 per object S3 user guide ↗). So the data goes onto local disks, and the cheapest ones there are, magnetic hard disks, because that is where huge amounts of data live. The tools stay the same, a file, byte offsets and a small map in memory. The order you use them in changes.

Lecture 10, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-append ===

# Files as a database, chapter 7: Writes never stop, and the disks are cheap. Where does a put go?

Lecture 10 · Files as a database · chapter 7 of 10

§ 7

## Writes never stop, and the disks are cheap. Where does a put go?

About 8 min

The second build is a key-value store written to all day: put, get and delete, each put on disk before it is acknowledged, on the cheapest hardware there is, magnetic hard disks. Many people use a database like this without knowing it, and by the end of this chapter you’ll see why every operation it does costs the same.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. ch 5, weekly merge into a new file, which buys nothing written in place. ch 6, new path + meta.json + deploy, which buys a switch with no garbage. the key-value store: The key-value store has no pieces yet. Marked new: new path + meta.json + deploy.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies · ch 5 · weekly merge into a new file · nothing written in place · ch 6 · new path + meta.json + deploy · a switch with no garbage · the key-value store · nothing yet: it starts in this chapter

[caption] Fig 7·aBuild 1, finished: the dictionary, from a text file to a fleet that switches files with a deployment. Build 2 starts empty.

§ 7.1

## What does a cheap disk spend its time on?

SSDs are expensive next to magnetic disks, so the world’s huge piles of data sit on magnetic disks; in the storage hierarchy, SSDs sit closer to memory in both speed and cost.

A magnetic disk is a platter spinning under a head. A byte offset in a file becomes a physical place, a sector on the platter; to reach it the platter rotates and the head moves there, and every read somewhere else means another movement.

[figure title] A magnetic disk

[figure description] On a magnetic disk a head moves over a spinning platter to reach a sector; a byte offset in a file becomes a disk, a sector and an offset inside it, and that mechanical movement is the slow part of disk I/O. On the speed scale SSDs sit closer to memory than hard disks, in speed and in cost.

[figure labels] spins · head · sector · moving the head = the slow part · byte offset → disk · sector · offset in it · a magnetic disk · memory · SSD · HDD · ← faster, costlier · slower, cheaper → · where SSDs sit

[caption] Fig 7·bA magnetic disk: the platter spins and the head moves to the sector that holds the bytes. Beside it (below it on a phone), where SSDs sit between memory and hard disks.

That mechanical movement, the head travelling and the platter turning, is the slowest part of disk I/O. So for every operation, ask one question: how little can it make the disk move?

§ 7.2

## Where should a put go?

You might collect writes in memory and flush them in batches. That’s out: a put must be on disk when it is acknowledged.

Where on the disk? Not where the key “belongs”, since finding that spot moves the head. Keep one file, like a ledger, and append every change at its end. The head is already where the last write finished, so there is no seek, as long as the disk is busy with this one stream of writes; reads will pull the head away, one seek each, but the writes never add one.

So put K1 V1 appends K1 and V1 to the end of the file. put K2 V2 and put K3 V3 go after it. And an update, put K1 V1′? Don’t go back and find the old K1. Append it, like everything else, and the old entry simply becomes obsolete. Any put is appended, no matter what.

[figure title] Append only

[figure description] Each put is appended to the end of one file, in order: K1 V1, K2 V2, K3 V3, then the update K1 V1′. Nothing is overwritten; the old K1 entry stays and is obsolete. The disk head is already at the end, so there is no seek.

[figure labels] PUT K1 V1 · PUT K2 V2 · PUT K3 V3 · PUT K1 V1′ · K1 V1 · K2 V2 · K3 V3 · K1 V1′ · append · append only · zero seek · no big mechanical movement · best we can do!!

[caption] Fig 7·cFour puts, appended in order. The update K1 V1′ doesn’t touch the first K1 entry; it goes to the end like everything else.

The code is a few lines. Open the file in append mode ("ab" in Python, append and binary), write the record, and force it to disk before you answer. You don’t reserve space up front; laying the file out on disk is the file system’s job.

import os f = open("001.data", "ab") # append mode: writes always land at the end f.write(record) f.flush(); os.fsync(f.fileno()) # on disk before you acknowledge the put

That fsync on every put is what the requirement costs: writes go as fast as the disk can persist them one after another, and no faster. Real Bitcask makes it a setting; by default it leaves flushing to the operating system, which is faster but can lose the last few writes in a power cut docs.riak.com ↗.

You have met this before. Lecture 9’s Redis kept an append-only file next to its memory, to replay after a restart. Here the append-only file is not a backup of the data. It is the data.

§ 7.3

## How do you delete from a file you only append to?

K2 was written a while ago, somewhere up the file. A user deletes it.

Pause and think

Your store only ever appends to the end of its file. K2 was written earlier. How do you delete K2?

Delete is a put: DEL K2 = PUT(K2, −1), where −1 stands for a marker the store reserves, often called a tombstone, that no real value can look like. It lands at the end like every other write, so it costs exactly what a put costs.

That is the whole contract of an append-only file: reads anywhere, writes only at the end. Put and delete are now both solved, at the bare minimum. It is the same trick as Lecture 3’s MySQL store, which deleted a key by writing an expiry of −1; there it updated a row in place, here it can only be appended.

§ 7.4

## K1 is in the file twice. Which one does a get read?

The naive get scans every entry and returns the latest one for the key. You already know what that costs.

You also already know the fix. Keep an in-memory hash table from each key to the offset of its latest entry in the file: the offset, not the value. It is the dictionary’s index from chapter 2 again, a small map in memory pointing into a big file, except that this one changes on every write.

The order matters. A put appends first, then points the key at where it landed; after put K1 V1′ lands at O4, K1 moves to O4. A delete appends its marker and drops the key from the map. A get with no entry returns 404 without touching the disk; otherwise it is one read at that offset.

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

The map lives in memory, so it dies with the machine. The file doesn’t. On restart, read the file from the top and rebuild the map, later entries overriding earlier ones. That can take a long time, and for now that is accepted.

[figure title] Crash and rebuild

[figure description] The store serves with an in-memory map pointing K1 at O4 and K3 at O3. The machine dies and the map is gone, but the file is safe on disk. On restart the store reads the file from the top: K1 points at O1, K2 at O2, K3 at O3, then K1 moves to O4 and K2’s −1 removes it. The map is back as it was; the full scan is why a restart is slow.

[figure labels] K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · on disk · O1 · O2 · O3 · O4 · O5 · in-mem · K1 → O4 · K3 → O3 · in-mem · K1 → O4 · K3 → O3 · in-mem · K1 → O1 · K2 → O2 · K3 → O3 · in-mem · K1 → O4 · K2 → O2 · K3 → O3 · in-mem · K1 → O4 · K3 → O3 · 1 · serving · 2 · power lost · 3 · restart: scan from the top · 4 · later entries win · 5 · serving again · the full scan took a while

- The store is serving: the map points at the latest entries, K1 → O4 and K3 → O3.

- The machine dies. The map lived in memory, so it is gone; the file is safe on disk.

- On restart, read the file from the top and rebuild the map: K1 → O1, K2 → O2, K3 → O3.

- Later entries win: K1 moves to O4, and K2’s −1 removes it from the map.

- Back to the same map. Reading the whole file is why a restart is slow.

Keys: ← → to step · link to a step with #fig-7d/step-3

[caption] Fig 7·dThe map on the left, the file on disk on the right, offsets O1–O5 beside it. Blue is the scan reading the file; red, the lost map; green, the map rebuilt.

Put, get and delete are each O(1): each does the bare minimum the disk has to do, with every write persisted. On a cheap magnetic disk, you can’t ask for more. So what could go wrong?

Lecture 10, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-disk-fills ===

# Files as a database, chapter 8: A month later the disk is nearly full. What is filling it?

Lecture 10 · Files as a database · chapter 8 of 10

§ 8

## A month later the disk is nearly full. What is filling it?

About 7 min

Say the store has run for a month on a 1 TB disk. Its one file has filled most of it, and most of what is in it is dead: old values that were overwritten, and keys that were deleted. Nothing ever leaves the file, because the only thing the store knows how to do is append.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. ch 5, weekly merge into a new file, which buys nothing written in place. ch 6, new path + meta.json + deploy, which buys a switch with no garbage. the key-value store: ch 7, append-only file, DEL = PUT(k, −1), which buys writes with zero seek. ch 7, key → offset map in RAM, which buys a get is one read. Marked new: append-only file, DEL = PUT(k, −1); key → offset map in RAM.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies · ch 5 · weekly merge into a new file · nothing written in place · ch 6 · new path + meta.json + deploy · a switch with no garbage · the key-value store · ch 7 · append-only file, DEL = PUT(k, −1) · writes with zero seek · ch 7 · key → offset map in RAM · a get is one read

[caption] Fig 8·aThe key-value store after chapter 7: an append-only file that takes every put, update and delete, and a key → offset map for gets.

§ 8.1

## What could go wrong?

Three things. First, a restart is slow: the map is rebuilt by reading every file, and until that finishes the store answers nothing. Real Bitcask’s merge writes a small hint file next to each file it produces, holding each key with the position and size of its value Bitcask paper ↗, and on restart the map is rebuilt from those instead docs.riak.com ↗.

Second, every key has to fit in memory: not the values, but every key with its offset. Keep that one in mind.

Third, the file grows without limit, and one day the disk is full. That one needs fixing now.

Start by keeping several files and writing to only one at a time; the others become immutable and can be cleaned up at leisure. Reads still go wherever the key is.

§ 8.2

## How big should one file get?

Pause and think

The store will write to one file at a time and start a new one when it gets big enough. On the 1 TB disk, how big should each file get?

Small, around 100 MB to a few GB, with a new file started each time the current one fills up. A file of hundreds of gigabytes can’t be cleaned up or rebuilt in pieces.

One huge file can’t be indexed in parallel on restart, and cleaning it up means chewing through all of it at once. So start a new file as soon as the current one crosses 100 MB or 1 GB; real Bitcask does it at 2 GB by default docs.riak.com ↗.

The files are numbered in order, 001, 002, 003, 004. At any moment exactly one is active and takes every write; the rest are read-only, but can still be read. Each time the active file crosses its limit, a new one starts. That is file rotation.

[figure title] File rotation

[figure description] The store writes to one active file, 004; when it crosses a size threshold a new file starts and the old ones, 001 to 003, become read-only but can still be read. The in-memory map now stores the file and the offset for each key: K1 in file 1 at offset 4, K3 in file 1 at offset 3. Every key must fit in RAM.

[figure labels] in-mem · K3 → f1, O3 · K1 → f1, O4 · keys must fit in RAM · K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · 001 · 002 · 003 · read only · still readable · 004 · writes go here · active · file rotation · > threshold · 005

[caption] Fig 8·bFiles 001–003 are read-only; 004 is active and takes every write. When 004 crosses the threshold, rotation starts 005. The map now stores a file and an offset per key.

One thing changes in memory. An offset alone no longer says where a key is, so the map stores the file and the offset: K1 → f1, O4. A get finds the key, goes to that file at that offset, and reads.

§ 8.3

## Who clears out the dead entries?

The read-only files are full of waste. K1 was overwritten later, so its old entry is stale. K2 was deleted, so both its entries are dead.

While the active file keeps taking writes, a separate process, merge and compaction, reads the read-only files and writes one new file that combines them, leaving the stale and deleted entries out. Three read-only files become one. Once the new file is written, the old ones are deleted for good.

How do you merge them? Not with chapter 5’s two pointers: these files are in write order, not sorted. Read the entries into a temporary hash table, where a later entry for a key replaces the earlier one and a delete removes the key, then copy the records it points at into the new file. The table belongs to the merge alone, and holds positions, not values.

tmp = {} # key -> (file, offset) of its latest record; not the index for rec in records(read_only_files): # oldest file first, in write order if rec.is_delete: tmp.pop(rec.key, None) # a delete removes the key else: tmp[rec.key] = (rec.file, rec.offset) # a newer entry replaces the older one live = [(k, pos) for k, pos in tmp.items() # still the latest? the active file if index.get(k) == pos] # may have rewritten or deleted it write(merged_file, live) # copy only those records to the new file repoint_index(merged_file, live) # repoint only those, if still unchanged delete(read_only_files)

[figure title] Merge and compact

[figure description] Two read-only files hold stale entries (old values of K1) and a deleted key (K2 and its −1). A separate process reads them into a temporary hash table, where a newer entry replaces a key and a delete removes it, then flushes the table as one new merged file holding K3, K4 and the latest K1. The active file keeps taking writes meanwhile. The offsets changed, so every moved key the map still points at is repointed to the merged file (a key written again or deleted in the active file keeps its newer entry), and the old files are deleted.

[figure labels] K1 V1 · K2 V2 · K3 V3 · K1 V1′ · K2 −1 · 001 · K4 V4 · K1 V1″ · 002 · 003 · writes go on · active · merged · in-mem · K1 → f2, O2 · K3 → f1, O3 · K4 → f2, O1 · in-mem · K1 → m, O3 · K3 → m, O1 · K4 → m, O2 · 1 · stale · deleted · tmp table · K1 → f2, O2 · K2 → −1 · K3 → f1, O3 · K4 → f2, O1 · 2 · separate from · the index · flush · K3 V3 · K4 V4 · K1 V1″ · 3 · 4 · update the index · atomically! · old files deleted

- The read-only files are full of dead entries: stale old values of K1, and K2 with its delete marker.

- Read them into a temporary hash table: a newer entry replaces a key, a delete removes it. This table is separate from the index.

- Flush it as one new file with only live entries. The active file keeps taking writes meanwhile.

- Offsets changed, so repoint every moved key the map still points at, then delete the old files.

Keys: ← → to step · link to a step with #fig-8c/step-3

[caption] Fig 8·cTwo read-only files, the active file, and the in-memory map. Grey entries are stale; ringed in red, a deleted key. K4 and V1″ are illustrative entries so the merge has two files to combine.

The last lines are the delicate ones. While the merge ran, the active file kept taking writes, so some keys it copied may have been written again or deleted since. Copy and repoint a key only if the map still points at the entry being copied; the newer write wins. Every entry that did move sits in a different file at a different offset, so the map has to be repointed for each of them, without a get ever seeing a key that points at nothing.

§ 8.4

## How often should that run?

Plot disk usage over time. Writes push it up; each merge and compaction drops it sharply; then it climbs again. It draws a sawtooth.

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

The disk has a hard ceiling: when usage reaches 1 TB, the next append fails and the store stops taking writes. Merge too often and the CPU spends its time collecting garbage instead of doing real work; merge too rarely and the peaks climb toward the cap. The shape of the sawtooth decides how often merges must run, and how the database performs.

That gives the design two knobs: how often merge and compaction runs, and how big a file may grow before rotation. Set them by watching the sawtooth while the store runs, and if you ship a store like this, expose both as settings.

With rotation and compaction, the store keeps its O(1) operations and stops eating the disk. Each get still costs one seek on a magnetic disk, and never more than one docs.riak.com ↗. On SSDs the gain is smaller but real: flash can’t overwrite in place either, so appending is still the pattern it handles best.

One assumption has been hiding since chapter 7. Every “append K1 V1” has treated a write as something that either happens or doesn’t. What if the power fails halfway through one?

Lecture 10, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-torn-write ===

# Files as a database, chapter 9: The power fails halfway through a 1 MB value. What does the next get return?

Lecture 10 · Files as a database · chapter 9 of 10

§ 9

## The power fails halfway through a 1 MB value. What does the next get return?

About 6 min

Every chapter so far has written “K1 V1” into the file as if that settled what an entry looks like on disk. It doesn’t. Before you can answer what happens to a half-written value, you need to know how a reader finds where a record ends at all.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. ch 5, weekly merge into a new file, which buys nothing written in place. ch 6, new path + meta.json + deploy, which buys a switch with no garbage. the key-value store: ch 7, append-only file, DEL = PUT(k, −1), which buys writes with zero seek. ch 7, key → offset map in RAM, which buys a get is one read. ch 8, rotation + merge & compaction, which buys the disk never fills. Marked new: rotation + merge & compaction.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies · ch 5 · weekly merge into a new file · nothing written in place · ch 6 · new path + meta.json + deploy · a switch with no garbage · the key-value store · ch 7 · append-only file, DEL = PUT(k, −1) · writes with zero seek · ch 7 · key → offset map in RAM · a get is one read · ch 8 · rotation + merge & compaction · the disk never fills

[caption] Fig 9·aThe key-value store after chapter 8: small files with one active, merged and compacted in the background.

§ 9.1

## How does a reader know where a record ends?

The dictionary got away with “word, comma, meaning” and a newline, read line by line. But files are read in blocks, not lines, so a store on disk needs a defined record format for each entry. Every database, MySQL, Postgres, MongoDB, Redis, has its own format for what it writes to disk, designed to make reading it back efficient.

The easy way is to read from an offset until you hit a newline. But a newline can’t mark the end of a value that may itself contain newline bytes, as chapter 1’s audio and video will, and without a length you don’t know how many bytes to fetch, so you read and check a little at a time. You want the opposite. At any offset, you should know exactly how many bytes make up the whole entry, and read it in one go.

So write the sizes first. Before the key and value, store the key size and the value size, a 4-byte integer each. Reading a record now takes two reads: the first 8 bytes give the two sizes; add them, and the second read fetches exactly that many bytes, which you split into key and value.

[figure title] Sizes before the bytes

[figure description] Reading a record until a newline costs one call per byte. Prefixing each record with its key size and value size, 4 bytes each, lets a reader fetch it in two reads: the 8 bytes of sizes, then exactly the key and value.

[figure labels] because key and value are variable length · K · V · one byte at a time until \n? · just read me until \n · key size & value size · KSZ · VSZ · K · V · 4 B · 4 B · 1 · 8 B · 2 · KSZ + VSZ bytes · two reads · we read KSZ (4 B), VSZ (4 B), · then KSZ bytes for the key, · VSZ bytes for the value

[caption] Fig 9·bTop: reading until a newline goes one byte at a time. Bottom: with the key size and value size up front, a record is two reads, the 8 bytes of sizes and then exactly the key and value.

It is the dictionary’s header again, at the scale of one record: a few fixed bytes that tell the reader how many bytes to read next. And the dictionary should use it too. CSV was the easy start; its entries are better stored as word size, meaning size, word, meaning.

[figure title] The dictionary, re-recorded

[figure description] The dictionary's apple entry in the record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning. The CSV line it replaces is shown struck out above it.

[figure labels] apple,a round fruit⏎ · CSV: the easy start · 5 · 13 · apple · a round fruit · 5 B · 13 B · word size · meaning size (4 B each) · ← same idea as the 16-byte header (§3)

[caption] Fig 9·cThe dictionary’s apple entry in the same record format: a 4-byte word size of 5, a 4-byte meaning size of 13, then the word and the meaning. Cells drawn in proportion to their bytes.

§ 9.2

## The value was cut short. Can the store tell?

It is tempting to stop at the sizes. Don’t. The machine can crash while writing a big value, leaving a corrupt entry. You can’t fix it, but you must know it has lost its integrity and never serve it.

Pause and think

Records are key size | value size | key | value. The power fails halfway through writing a 1 MB value. After restart, more records are appended right after it. A get for that key arrives. Can the store tell, from the sizes alone, that the record is broken?

The reader trusts the value size and reads 1 MB. The torn value is shorter than that, so the read runs on into the next record’s bytes and returns them as part of the value, with no error at all.

A broken entry is worse than a missing one. The way to detect it is a CRC, a cyclic redundancy check: a checksum computed over everything else in the record (its sizes, key and value, and the timestamp once it is added) when it is built in memory, and stored with it. On read, compute it again over the bytes you got. If the two don’t match, the record is corrupt.

Put the CRC at the front of the record, before everything it protects. That is where Bitcask and LevelDB’s log put it LevelDB ↗; Postgres’s WAL and MySQL’s binlog protect every record with a CRC too, at other positions postgresql.org ↗. The position is a convention. The rule is that a reader checks the CRC before it trusts a single byte of the record.

The full record, then: CRC, timestamp (metadata, kept for settling conflicts between versions of a key), key size, value size, key, value.

[figure title] A torn record

[figure description] The machine crashes while writing a big value, so the record is cut short; after restart the next record is appended right after it. A reader that trusts the value size reads past the torn bytes into the next record and serves garbage. With a CRC written first, over everything after it in the record, the reader recomputes it, sees it does not match, and never serves the record. Its sizes can’t be trusted either, so a real store never appends after it: after a crash, the next write goes to a new file.

[figure labels] KSZ · VSZ · K · 110… · machine crashed while writing value · KSZ · VSZ · K · V · reads into the next record · CRC: first thing written · CRC · TS · KSZ · VSZ · K · 110… · doesn’t match → never served · CRC · TS · KSZ · VSZ · K · V · a real store puts this in a new file · 1 · crash: the value is cut short · 2 · restart: next record appended · 3 · trusting VSZ, the read runs on · 4 · CRC fails → never served

- The machine crashes while writing a big value. The record is cut short.

- After restart, new records are appended right after the broken one.

- Trusting VSZ, a reader runs into the next record and serves garbage.

- With a CRC first, the reader recomputes the checksum, sees it fails, and never serves the record. Its sizes can’t be trusted either, so a real store never appends after it: the next write goes to a new file.

Keys: ← → to step · link to a step with #fig-9d/step-3

[caption] Fig 9·dOne record per line; in the file, the second record starts right where the first one breaks off. Blue is the read; red, the torn bytes and the overrun; green, a CRC that checks.

The writes go in order: the header part, then the key, then the possibly gigantic value. If the first write fails, the entry doesn’t exist; if a later one fails, the CRC won’t match and the entry is never served.

What then? You can’t recover bytes that were never written, so ignore the entry, in merge and compaction and everywhere else, as if the write never came. But once the CRC fails, the value size can’t be trusted either, so a scan can’t use it to find where the next record starts. So never append after a torn record. Bitcask doesn’t: a file closed by a crash is never written again Bitcask paper ↗, and after a restart writes go to a new active file. A torn record is then always the last one in its file, and a rebuild that hits a failed CRC simply stops reading that file.

Is the small header itself written whole? Neither the operating system nor the disk promises it, and the design doesn’t need the promise: a torn header fails the CRC just as a torn value does postgresql.org ↗.

Key size, value size, key, value, and a CRC over all of it. That is the last piece. The store is finished, and it has a name.

Lecture 10, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 10-name ===

# Files as a database, chapter 10: You built a database out of files. What is it, and what can’t it do?

Lecture 10 · Files as a database · chapter 10 of 10

§ 10

## You built a database out of files. What is it, and what can’t it do?

About 9 min

Put the pieces together: records in chapter 9’s format appended to the active file, small files rotated and compacted in the background, one map in memory that knows where every key’s latest record is.

[figure title] Storage so far

[figure description] The storage built so far, one row per piece, oldest first. the dictionary: brief, 1 TB, 170,000 words, no database, which buys one portable file. ch 1, data.dict: word,meaning lines, which is the problem: a lookup scans ~500 GB. ch 2, word → offset + length in RAM, ~3.5 MB, which buys one pointed read. ch 3, 16 B header | index | data, which buys still one file. ch 4, one copy on S3, ranged GETs, which buys not 100 copies. ch 5, weekly merge into a new file, which buys nothing written in place. ch 6, new path + meta.json + deploy, which buys a switch with no garbage. the key-value store: ch 7, append-only file, DEL = PUT(k, −1), which buys writes with zero seek. ch 7, key → offset map in RAM, which buys a get is one read. ch 8, rotation + merge & compaction, which buys the disk never fills. ch 9, CRC | TS | KSZ | VSZ | K | V, which buys torn writes caught. Marked new: CRC | TS | KSZ | VSZ | K | V.

[figure labels] new · from · the piece · what it buys · the dictionary · brief · 1 TB, 170,000 words, no database · one portable file · ch 1 · data.dict: word,meaning lines · a lookup scans ~500 GB · ch 2 · word → offset + length in RAM, ~3.5 MB · one pointed read · ch 3 · 16 B header | index | data · still one file · ch 4 · one copy on S3, ranged GETs · not 100 copies · ch 5 · weekly merge into a new file · nothing written in place · ch 6 · new path + meta.json + deploy · a switch with no garbage · the key-value store · ch 7 · append-only file, DEL = PUT(k, −1) · writes with zero seek · ch 7 · key → offset map in RAM · a get is one read · ch 8 · rotation + merge & compaction · the disk never fills · ch 9 · CRC | TS | KSZ | VSZ | K | V · torn writes caught

[caption] Fig 10·aBoth builds after chapter 9. The key-value store’s last row is the record format with a CRC.

§ 10.1

## What is its one hard limit?

Look at what the map holds now. For each key: the file it is in, the size of its record, so a get fetches the whole record in one read, the offset, and the timestamp. Entries can point into any file; writes go only to the active one.

[figure title] One map, many files

[figure description] Bitcask’s in-memory map holds, for every key, the file id, entry size, offset and timestamp of its latest record; entries point into any file, while writes go only to the active one. A get is one map lookup, one disk seek and one read. Every key must fit in memory.

[figure labels] entry size · timestamp · K2 · file id · vsz · vpos · ts · offset · K1 · file id · vsz · vpos · ts · 001 · 002 · 003 · writes go here · active · immutable · · available for reads · GET(k) → pointed queries · 1 · hash table lookup · 2 · disk seek · 3 · disk read · limitation: index (every key) must fit in memory

[caption] Fig 10·bEach map entry names the file, the record size, the offset and the timestamp of the key’s latest record. K1 points into a read-only file, K2 into the active one. A get is one lookup, one seek and one read.

O(1) put, delete and get, at the price you met in chapter 8: every key must fit in memory. The number of keys you can hold in RAM is the number of keys the database can store.

In return it does the bare minimum of disk I/O: writes add no seek of their own and go as fast as the disk can persist them, and each get is one read. The disk stays busy with useful sequential work, called I/O saturation, so you get close to everything the hardware can deliver. And backups are easy: copy the files.

§ 10.2

## Does anyone run this?

What you just designed is Bitcask.

Bitcask is an embedded database: a library inside your program, like SQLite, not a server everyone connects to like MySQL.

So who turns a library into something a company runs? Riak, a distributed key-value store whose default storage backend is Bitcask. Keys are hashed onto a ring split into partitions, each owned by a virtual node, and each key is stored on N of them. There is no master: any node can take a request and coordinate it. Every partition runs its own Bitcask underneath, which does one job, getting the most out of the disk docs.riak.com ↗. That is Lecture 9’s ring, and its virtual nodes, with a Bitcask at every point.

[figure title] Bitcask inside Riak

[figure description] Riak, a distributed key-value store, runs an instance of Bitcask for every partition (vnode). A request can go to any node; keys are hashed onto a ring and each key is stored on N vnodes, with no master.

[figure labels] riak · bitcask · riak · bitcask · riak · bitcask · each key on N vnodes · what we just designed is · bitcask · any node can route the request · no master: keys hashed onto a ring · every vnode runs its own Bitcask

[caption] Fig 10·cRiak runs a Bitcask under every partition of the ring. No master: any node can take the request, and each key lives on N vnodes.

Around 2015, Uber used Riak for parts of its dispatch system riak.com ↗; Bitcask is Riak’s default backend, and most Riak setups run it underneath.

What made it fast wasn’t a clever data structure but the append-only file. So when any system claims high throughput and persistence, look for the append-only log; if there isn’t one, find out where the throughput really comes from.

Bitcask also tells you what comes after it. The engines behind many write-heavy databases, LSM trees, keep recent writes in memory, in a memtable backed by a log on disk, and push everything else into sorted, immutable files called SSTables cassandra.apache.org ↗. Unlike Bitcask, their keys don’t all have to fit in RAM. Bitcask is the foundation that makes them easy to follow.

§ 10.3

## Two engines. Were they really different?

From the outside the two builds share nothing. Inside, they are built from the same few ideas.

The dictionary and the key-value store, idea by idea

|

| The dictionary (ch 1–6)

| The key-value store (ch 7–10)

| a · A small map in memory

| word → offset + length, loaded at boot

| key → file + offset, updated on every write

| b · Know how many bytes to read

| A 16-byte header says where each part lies

| Key size and value size on every record, under a CRC

| c · Never write in the middle

| Merge into a new file

| Append, no matter what

| Merging

| Two sorted files, two pointers

| Unsorted files, a temporary hash table

| After a change

| New path, meta.json, a deployment

| Repoint the map to the merged file

Any file can be a database if you keep a small map in memory, always know how many bytes to read, and never write in the middle of it.

The best way to make that stick is to build it. A small Bitcask is not difficult: put, get and delete over an append-only file, the map, rotation, a merge process, the CRC record. It takes about a week, and the details teach you the most: does the merge run in the same process or another, and how does it update the map while gets are running? Then benchmark it against an on-disk and an in-memory key-value store, on a hard disk and on an SSD, with Prometheus watching the machine, and see whether the disk’s I/O saturates. The original paper, “Bitcask: A Log-Structured Hash Table for Fast Key/Value Data”, by Justin Sheehy and David Smith at Basho, is short and worth reading alongside.

§ 10.4

## What you can now do

- Size an index before you build anything. Entries × (word + 8-byte offset + 4-byte length + 1): 170,000 words came to about 3.5 MB for 1 TB of data, so it lives in RAM and every lookup is one pointed read.

- Change a big file safely: never overwrite in place; merge sorted inputs into a new file, upload it to a new path, update a pointer file at a fixed path, then roll a deployment so each server loads it at boot. Mixed answers for a while, never garbage.

- Write as fast as the disk can persist: append every put, update and delete; keep a key → file + offset map in RAM; rotate small files; merge and compact them, repointing only keys the map still points at; keep the sawtooth under the disk.

- Catch torn writes: sizes in front of every record, a CRC over all of it, checked before you trust a byte; never serve what fails, and after a crash write to a new file.

- Know the price: every key in RAM.

The new dictionary is uploaded over the old one at the same S3 path. S3 never serves a half-written object. Why do users still get garbage?

[summary] Show answer

Each server’s index still describes last week’s file, so the read at apple’s old offset lands somewhere else in the new one, often mid-word, until that server reloads its index.

Chapter 5 merged files with two pointers. Chapter 8 merged files with a hash table. Why not two pointers both times?

[summary] Show answer

The dictionary and changelog were sorted, so two pointers walk them in step. The store’s files are in write order, so the merge collects each key’s latest entry in a temporary hash table, dropping deleted ones.

A Bitcask node has plenty of disk left but refuses to take more keys. What ran out, and why?

[summary] Show answer

Memory. The map holds every key in RAM; values live on disk, but a key missing from the map can’t be found, so the keys that fit in memory are all the store can hold.

A record’s value was cut short by a power failure. What does a reader do with the CRC, what would it do without one, and why must the store never append after that record?

[summary] Show answer

With a CRC it recomputes the checksum over the rest of the record it read, sees it doesn’t match, and never serves it. Its sizes can’t be trusted either, so nothing may follow it: after a restart, writes go to a new file. Without a CRC, the reader trusts the value size; if more records had been appended after it, it would read on into them and return those bytes as the value with no error.

§ 10.5

## Ten lectures in. What can you build now?

This is the last lecture. Look at what you can now design from a blank page.

- A presence dot that never lies, from heartbeats and a TTL, and a blog through its first viral post (Lecture 1).

- The same blog under load: copies along the whole route, more servers and a scaled database, queues and streams for the slow work, a clap counter that never loses an update, and claps that arrive live (Lecture 2).

- A booking that gives 120 seats to 120 people at once, and a key-value store with expiry on one MySQL table (Lecture 3).

- A choice of database family by what it gives up, and Slack’s messages reaching every member of a channel across servers (Lecture 4).

- A load balancer, a fleet of them, and a lock that holds across machines (Lecture 5).

- Unique IDs on many machines at once, from a central service like Flickr’s ticket servers or with no coordination at all like Snowflake and Instagram, and pages that stay fast however deep you go (Lecture 6).

- Instagram’s photos behind a CDN, and its hashtag counts through Kafka (Lecture 7).

- An avatar service, photo tags and an unread badge that don’t hammer the database (Lecture 8).

- An analytics copy that can’t drift, through change data capture, and a cache built from one hash table up to a ring of nodes (Lecture 9).

- And now two storage engines out of nothing but files, with the old orders still queryable on S3.

Each build started with the simplest version that met the brief, then a number or a failure that broke it, then the smallest fix. The question that did the breaking was always the same, and it is the one to keep asking about every box you draw: what would the code inside it actually do, and what does that cost? Ask it of the next design you are handed, and you will find the next problem before your users do.

Lecture 10, chapter 10 · facts checked against primary sources, linked where they come from outside this lecture.
