# Lecture 10 - Storage engines: word dictionary without a traditional database, super fast key-value store on disk (Bitcask)

| | |
|---|---|
| **Source** | lec10.merged.json |
| **Duration** | 03:06:31 |
| **Speakers** | Teacher (TEACHER; Arpit); Student 1 (STUDENT_1 - several students: Hemant, Gaurav, Vikram, Mohit); Student 2 (STUDENT_2 - Sidesh/Sitesh); Student 3 (STUDENT_3 - Anubhav, Amrita, Jodhinda); Student 4 (STUDENT_4 - Rahul); Student 5 (STUDENT_5 - Pankaj); Student 6 (STUDENT_6 - Harsh); Student 7 (STUDENT_7 - Alok); Student 8 (STUDENT_8 - Abdur); Student 9 (STUDENT_9 - Shreya); Student 10 (STUDENT_10 - Anmol); STUDENT_11 relabelled per turn (mostly Teacher); Student? (STUDENT_13/14/15/17 back-channel). Names only on turns right after the teacher's call; spellings unconfirmed |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 251 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 158 (unclear 28, ?term 49, missing 3, check 47, speaker? 31) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS (--strict) - retention 99.53%, additions 0.32%, 0 unmatched log rows - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:01] Agenda and problem statement - word dictionary without a traditional database
   - [00:05:00] Text file vs JSON file
   - [00:19:57] Searching the single file
   - [00:21:46] Naive approach - CSV text file and linear search
2. [00:23:53] Indexing the dictionary file
   - [00:26:50] Estimating the index size
   - [00:34:54] Portability - one file instead of two
   - [00:41:22] File header with byte offset
   - [00:45:58] Custom file formats, encoder and decoder
3. [00:49:38] Serving the dictionary - load balancer, API servers
   - [00:56:36] Central storage for the dictionary (S3)
   - [00:59:34] Network attached storage - random reads
   - [01:01:41] Read flow - API server boot
4. [01:05:16] Weekly updates
   - [01:10:56] Limitation of how disk works (file IO)
   - [01:14:46] Merging the dictionary with the changelog
   - [01:18:17] Getting the new dictionary to S3 and the API servers
5. [01:24:27] Telling the API servers about the new file
   - [01:26:47] Uploading to a new path
   - [01:30:01] Metadata file with the current path - polling
   - [01:31:51] Polling vs reactive - Redis Pub/Sub
   - [01:37:06] Triggering a reload of the API servers
   - [01:41:00] Reload via deployment - rolling deployment reads meta.json
6. [01:43:59] Pointed reads on S3, multi-tiered storage
   - [01:46:23] Athena, data lakes, Apache Hudi, Hive partitions
   - [01:47:56] Questions on redeployment after the meta.json update
7. [01:52:05] Break *(admin)*
8. [01:59:52] Super fast key-value store on magnetic disk
   - [02:00:12] How magnetic disk works
   - [02:02:52] Put, get, delete on an append-only file
   - [02:08:37] Delete in an append-only file
   - [02:10:52] Get - in-memory hash table of key to offset
   - [02:13:52] Rebuilding the index after a crash
9. [02:14:35] What could go wrong - multiple files, merge and compaction
   - [02:15:51] Multiple files and file rotation
   - [02:20:27] Merge and compaction
   - [02:22:18] Sawtooth pattern of disk utilization
10. [02:25:42] Record format
   - [02:29:21] CRC in the record
   - [02:32:54] Get path and file rotation
   - [02:35:31] Limitations and strengths
11. [02:37:28] Bitcask
12. [02:41:59] Wrap-up and next week *(admin)*
13. [02:42:51] Q&A
   - [02:56:05] 1 TB dictionary size, S3 cost
   - [03:01:39] Offsets, index size in header, sorted merge
   - [03:06:09] Class close *(admin)*

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

## [00:00:01] Agenda and problem statement - word dictionary without a traditional database

**[00:00:01] Teacher:** Great. Week 5, day 2nd and we'll continue our discussion on storage engines. The agenda for today are two very interesting problem set points that would not only be interesting but will also solidify a lot of core understanding that you need. When you're trying to build an interesting system or you're trying to get the maximum out of existing systems. So there are a lot of building blocks, a lot of foundational concepts that would help you think in a very different way. And both of them are actively used in production. It's not something that's just theoretical. You will find practical use of both of the systems to a huge extent. Okay.

[00:00:49] So let's start with the first one. The problem statement itself, and we'll directly start with the brainstorm. The problem statement in itself is very quote-unquote tricky. What we will do is we will build a word dictionary without using any traditional database. Like no MySQL, no Postgres, no MongoDB, no Redis, nothing. You have to be creative. You cannot use any traditional database. Sorry. You cannot use any traditional database to build this word dictionary. So you have to be creative into thinking, how will you do this? This thing needs to be scalable, which means you should not be worrying about scale, but then obviously some constraints would be there, but it needs to be quote-unquote scalable. And on both the sides.

[00:01:38] So typically when you design any system, you can bifurcate into two, one is storage, other is compute. Compute basically your API servers and storage means your database. Here you cannot use your database. So that's an interesting problem to solve, but it needs to be scalable with respect to both storage and API servers. It's okay to have high response time because that's not what we are trying to solve over here. Getting performance is different trick. We have done it in past at lot of systems. What we are more focusing on is this constraint that you cannot use a traditional database. So we are okay to have a little high response because we know hundreds of ways to improve it, like caching, [?batching | asr: "matching"] and all what we can improve. But let's not focus on that. Let's focus on the core part of it that it's okay for us to have a little high response time, but what we want is we want portability. Now portability, how come when we kick off our brainstorming, I would explicitly point out, hey, this is not making our system portable enough, and you'll understand the importance of portability the next system and next week. So I just compiled this problem statement in order to cover a lot of critical building blocks in day in and day out in real world.

[00:02:54] So we want portability. Our response time can be high. Okay. So you cannot use a traditional database. You have to be creative. Now here, one key point. In the dictionary, it's a standard English dictionary. You have English words. You have English meanings. When you do this, or when you're serving this dictionary, it's mostly read-only. You are not going to update. Imagine how frequently Oxford dictionary gets updated. Not much. Right. So what we are doing is we don't want to support continuous update. What we are doing is the words and the meanings will be updated weekly. It's not that it will be updated anytime you want. Weekly, you will be given a changelog file. In this changelog file, you will have the updated words and the updated meanings. Right. You would have this information. You have to take this changelog file and apply it to whatever storage engine or whatever database you are building. So you don't have to support pointed updates right there and there, like live pointed updates. These will be given to you weekly basis. Let's say every Sunday. Every Sunday you are given this new changelog file over email. You have to apply those changes over here.

[00:04:08] The lookup in this dictionary will always be a singular word. You don't have to think about autocomplete or not. Given a word, give me the meaning. That's it. If the word does not exist, return 404. The entire size of the dictionary is one terabyte. And the dictionary in total has 170,000 words. So total dictionary size is one terabyte. 170,000 words you have in the dictionary. So you have to build a system like this. Build a word dictionary without using any database. So no MySQL, no MongoDB, no Elasticsearch, no Redis, no Memcache, nothing, nothing, nothing. Be creative in your approach. Think about it. How would you go about it? And things that we would brainstorm on is around storage query, portability and seamless updates.

### [00:05:00] Text file vs JSON file

[00:05:00] So let's start with the storage one. Go on, Raghun. [check: name spelling]

**[00:05:05] Student 4:** So basically there are two ways that I can think of. We can store this. One is a text file and other is a JSON format basically.

**[00:05:16] Teacher:** And one terabyte dictionary, JSON format.

**[00:05:20] Student 4:** Yeah, that's a bad way to go, but like just as a reference,

**[~00:05:20] Teacher:** how do you, how do you query a JSON format?

**[00:05:26] Student 4:** So basically it would be like [?unmarshaling | asr: "marshaling"] and marshaling, and that would be a very expensive process. Exactly. [check: "Exactly." may be the Teacher] That's why I'm like more inclined towards text file. So basically, is it okay if I like tell about updates also?

**[00:05:46] Teacher:** And let's cover this one part in depth. Okay. You mentioned text file. You mentioned JSON file. So when you said JSON file, you would want to store all the words and all the meanings in this one JSON file. Right. Yeah. Given that you brought up this topic, it's, it's, first of all, thank you for [?bringing | asr: "breaking"] this topic up, but now what would happen? A lot of us put a lot of data in JSON files. Now the disadvantage of storing data in JSON files, especially in this, in this use case, is that for you to check if a word exists in this JSON file or not, you anyway have to read the entire JSON file, deserialize it, create this in-memory object and then check, like, in-memory hash map or something, and then check. That becomes really costly. Size of the dictionary is one terabyte big. There is no direct way to access a particular thing in this JSON without reading the entire JSON file, because that's what the format says. Is why we cannot go with JSON file, a singular JSON file containing all the data, which means that what we can pick is we can pick a simple text file. Rahul, what will be the format of the text file?

**[00:06:57] Student 4 (Rahul):** So basically it would be like, it will be something like write-ahead log, which will have like, which will create some logs. Like this word is updated. This word is, like, this word is updated with this meaning dictionary.

**[00:07:08] Teacher:** How are you storing?

**[00:07:09] Student 4:** Yeah, so that's, that's that's how, like basically like this word equals to meaning equals to anything, kind of CSV. Yeah, you can

**[00:07:21] Teacher:** say that, right? [check: speaker boundary - "yeah you can say that" may be one speaker] So let's say I [?store | asr: "score"] apple comma fruit and then new line and then let's say you have Amazon

**[00:07:32] Student 4:** and it can have repetitive columns, like it can have like columns with the same name

**[00:07:39] Teacher:** There are no columns. You only have words and meanings.

**[00:07:41] Student 4:** Like rows with the same, same words.

**[00:07:47] Teacher:** No, no, no. We don't want same words in the dictionary. Imagine this file opened in any text editor. People would find it difficult. You want portability. You cannot have duplicate things over here.

**[00:08:02] Student 4:** It is related to the updates that I thought. But that's not

**[00:08:06] Teacher:** now I'm adding. [check: speaker boundary unclear around "But that's not now I'm adding"] Out of the box, right? Yeah. I know where you're going with this. Right. Now then you'll create an index and what not on top of it.

**[00:08:16] Student 4:** No, I was actually thinking about dirty reads and something like that in that context. But let's keep it simple

**[00:08:23] Teacher:** because this one constraint that I'm adding, that you cannot have repetitive things in this file, will make things very, let me add it. No repetitive entries. Okay. Okay. So now what will you do? Is this format according to you okay enough to start with? Yeah. For starters, it is okay. Okay. Just one question before I move to Hemant. Will you keep this file sorted in some fashion?

**[00:08:59] Student 4:** Okay. If there is a sorting constraint, then there will be like...

**[00:09:03] Teacher?:** No, there is no constraint. Will you keep it sorted?

**[00:09:07] Student 4:** No, I don't think so. Don't have any, like, like I, we don't have any restrictions on the response time, right, as of now. Like we are not bound to just give the answer quickly, so I will not prefer sorting here. Okay, so words can come and fit in any order here. Okay, yeah, okay, fine, okay.

**[~00:09:24] Teacher:** Hemant,

**[~00:09:24] Student 4:** else, else I will go with [?B-trees | asr: "the trees"] or something like that.

**[~00:09:32] Teacher:** Wait, wait, wait, we'll come to that, we'll come to that. That's how, because it's fun to discover it step by step, right? Because that, that solidifies the understanding for him. That's right, right. Okay. So Hemant, yeah, anything that you would want to change in this file format?

**[~00:09:52] Student 1 (Hemant):** Yeah, I maybe I would like to start from scratch, the way I have to think it. So if I say the biggest requirement, it is first searchable dictionary, the first, most important and the heavy thing is it's a, it should be a searchable via key. Let's say, I consider this thing as a key-value store, where key is a word, [?value can | asr: "well, you can"] be a two line, three line for an explanation of that word, searchable via key, plus it's a read-heavy operation. This dictionary is always maybe have a thousand to one ratio of read and write, or maybe something too skewed. Much more than that, to be honest. It's much more than thousand to one. So read-heavy searchable system is one thing. The only third thing which I have to take care when I'm going to add or modify a word, I should not kind of boil the ocean for changing a small thing. That's a second thought I am having.

**[00:11:00] Teacher:** What did you say about the last thing, when you are modifying something?

**[~00:11:02] Student 1:** So I'm saying it should not kind of disturb my whole system by doing a very small change. I should be able to update or add. So that's the third thing I have to keep in my mind when I'm designing it. If I design in a way

**[00:11:22] Student 1:** Each update is too costly, then also not a very good design. It may be a good, but not very good.

**[00:11:28] Teacher:** But just to probe you on that, our updates are going to be weekly once.

**[00:11:34] Student 1:** Yes, when I say it should not disturb means it should not need to do too much heavy on IO side or read side on disk. If you put it in such a structure, then I have to go and scan each and every file, figure it out where it is and then change or add, then it does not seems like a good design.

**[00:12:00] Teacher:** That's, yeah. But then in any case, our updates are, I totally agree with your point that each update, each single word update cannot be very costly.

**[00:12:09] Student?:** Yes.

**[00:12:10] Teacher:** But given that my total, I'm getting updates in batch, I can still do one huge processing.

**[~00:12:17] Student 1:** Yes. One huge processing is okay. I think we have understood the fair bit of biggest requirement of the system. Let's think about making it how we can do it. When we say we need something searchable, definitely a sorted via key looks like the first thing that we have to thought. If you do not sort it, there is no way you can do a search in a very better way. I mean, an efficient way, if I have to use the right word. So [?sorting | asr: "starting"] by key should be the way now how you will store it. So that if I have to search it, I can efficiently do it, means in place of having a single text file, maybe I need to [?shard | asr: "start"] it or partition it where there are multiple of files.

[00:13:12] And if you use yesterday's pattern of figuring out the routing, you sent a word ABC and you figure out out of 100 files that I am having, this file is responsible for ABC, let's say. So I have not to go and search it and that file is sorted. So if I go and know that this is the way we are up to search it, I can immediately go and read that specific place in the file, so that disk IO and seek and all those things is minimal.

**[00:13:46] Teacher:** Just to stop you there. You are proposing we don't have just one file. We can split it into multiple files. Just one thing, added this constraint of portability. We cannot have multiple files. Okay. Because when you have multiple files, what you are killing is, you are killing portability. What we want is literally this one file in some format. We do a copy, like it should be one file which we should be easily able to ship. We should not be able to copy tens and hundreds of files. Only a specific software can read it. Right. What we would want to have is we want to just have this one file containing everything we need to read and write to it.

**[00:14:29] Student 1:** Okay. I have a bit different of Arpit there. [check: ASR may have garbled "a bit different opinion"] When we say multiple files, that's a logical way of saying it. We may think about like having a one single zip, which have hundreds of folders and each folder has something which makes.

**[00:14:46] Teacher?:** No, but then you would still have to extract it to use it.

**[00:14:48] Student 1:** Right.

**[00:14:51] Teacher:** I'm also against it. I'm saying have just one. And you'll understand why I'm adding this constraint when we reach the end of the solution. Because it forms the foundation for hundreds of systems that I'll talk about. That's why I'm just probing you to think. It might seem like Arpit is adding random constraint, but these will all come in very handy.

**[00:15:14] Student 1:** I got it to your point. Maybe I will think. So when I say multiple files, my thought came from the logical division, not necessarily we need to have a multiple files in one single file. We have a logical division which says like, okay, first hundred pages or first hundred is for this part and then up to this to this area. So we can have a proper header or something which is a second file which talks about up to this sector and this place are for this area, and we can do it by a single file. The idea is about making it searchable by sorting. So that's why partitioning is necessary. Sorting is necessary when you store it.

[00:15:54] Now what we need to think about is when we are going to do a representation in the system, we need a key and maybe a big size of variable size of value. So in file, if you take a line by line approach or any approach when we are writing it, maybe that will not be so good. So we need to think about it, encoding it in a way. So in place of directly JSON, if you use any other format of encoding when we are storing it, that may be helpful, but it will definitely add the cost of decoding it. So if I, in place of JSON, if I use any famous Parquet or any other format, that, that will add a bit of a work there, but it seems that that should be not too much in my understanding. You may need to think about the real facts and numbers to figure it out. If it is a too bad a con, that not do it. Got it.

**[00:17:04] Teacher:** Thanks. Thanks.

[00:17:05] Thanks so much for adding so much. Trying not to digress into Parquet, Avro and all this format, but trying to build a base understanding of this while still keeping it simple. Because what you suggested, that we have multiple partitions in our file, and we should be able to look up within that, that is still a complex enough solution that we'll touch upon later. I'm trying to go in a very simpler direction so that the base concepts that we need to build anything queryable works.

[00:17:40] And just to add to a real world use case on why I'm just trying to keep it simple is, on AWS, AWS has S3. We all know AWS has S3. Right? On S3, we can upload any CSV file.

**[00:17:57] Student?:** Yes.

**[00:17:58] Teacher:** And we can query it using a service called Athena.

**[00:18:00] Student?:** I know.

**[00:18:01] Teacher:** Right? Now in Athena, when you are storing things on S3, you are just storing simple CSV file, but you are still able to seamlessly query on Athena. That's what I'm trying to simulate. With this example, with this basic understanding, we are trying to build AWS S3, not at that scale, but basically that particular compute engine, how they would have thought of this, how they would have implemented this. And it has a ton of other applications as well, but this is what I'm trying to simulate. Very simple sense can we make, and obviously the points that you said, we will all incorporate that, right? But not with that specific, like, let's say, Parquet and this, because not a lot of people would know about it. But simplifying it to have an understanding, okay, this is what we need. You can use Parquet and whatnot to build it, but instead of going into that complexity, we'll just keep it really simple on that.

**[~00:18:51] Student 1:** Okay, just maybe a last line to say on that in terms of the thought process, how Athena has came or other systems works in a such way. We need to think about something like Lucene's way of tokenizing and putting. Here the only thing is, in the key, Lucene tries to figure out the document ID and name and all those things against it to save it. Here we have to save it, maybe a continuous data of two, three lines, which is the meaning of that word. So we need to think about building something like this. And that looks near real, because if you see the Lucene index, they are creating a single file also. I mean, one index is good enough in one single file, which is quite large, even can go to one terabyte, whatever you are saying. So that's all I can think of to start with.

**[00:19:47] Teacher:** No, but you added some great parts. It's just that I'm trying to keep it one level down and then jump the level. That's it. Okay.

### [00:19:57] Searching the single file

[00:19:57] Sidesh [check: name spelling], given this file that we have, it will contain all the words that we have seen for now. How would you search on this?

**[00:20:09] Student 2 (Sidesh):** Yeah, Arpit. So I was going to come to that. Given that we have a single file, and let us suppose this is terabyte big file, what I would do is basically, like, imagine I will start with binary search and then we will go ahead. What I would do is basically take some offsets in this, store it as indexes, and given a word. How? So basically, yeah, now, okay, I'll get there. Where I'm getting is basically I'm getting into a B+ tree. [unclear: "I want in two"] keys and values and basically create blocks of pages in memories. So let us construct a first level index first. Okay. Now let us suppose you have a one terabyte file and you have eight kilobyte block.

**[00:20:52] Teacher:** [check: start of sentence may be cut - overlapping speech] Go to blocks and I'll keep it very simple. Very simple. Like what a five year old to understand.

**[00:20:57] Student 2:** Okay. Okay. Makes sense. Like, let us suppose you can keep 1000 keys in memory.

**[00:21:03] Teacher:** Okay. Now, wait, wait, wait, why only 1000 keys in memory? So I can keep a lot. No, why I'm saying this is, we are over exaggerating. We are over engineering. This, this is a very simple word dictionary, right? Keep it very simple. No need to add B+ trees, some anything fancy. Keep it very simple, because that's where you see the power of the system. And I'm just trying to bring it down to a very simplistic level, because you would see the beauty of the system, right? That's why, that's why, given that you have, what would be the first intuition, the first way of making, or let me, let me cover that. I know you folks would go into very fancy direction. I'll just, I'll just pull you into this. Give me a minute, right?

### [00:21:46] Naive approach - CSV text file and linear search

[~00:21:46] Okay, so the naive way, let's say we discussed that, hey, we cannot use a traditional database to store this particular dictionary. Dictionary contains key and the meaning. Now for us to make things, now, given that we cannot use a traditional DB, the simplest thing that we can come up with is, hey, let's just store things in a simple text file. Given that we are storing in things in a simple text file, what format would you store? The normal format that we can think of is, let's say we store it in a CSV format, but first thing is key, then you have this gigantic meaning for that particular key.

[00:22:21] Okay, given we have this, we need to now search for this, like, because that's what our use case is. Your use case is to do a key lookup. Now given that we have this one gigantic one terabyte file and now we want to do key lookup in this, what is a naive way? If you have this, just this one file, and you want to do key lookup, what will you do? You'll open this file, read this file line by line, find the particular key that you are looking for. Once you find it, you stop the iteration, read the meaning and return the response. Right, now doing this for every single read is very expensive, because dictionary is a very read-heavy application.

[00:23:00] So linear search is not a way to go, because when you search linearly for every read request that is coming in, you would be, worst case, you would be effectively reading one terabyte file every single time. Right. Worst case, right? On an average would be reading half a terabyte for every read, which will make your things, first of all, very slow, second, it would degrade the performance of your disk, third, your disk sectors will go bad because it is very heavily overutilized at the moment, right? So it has hardware problems, it has software problems, it has time problems, right? So whenever you are in the situation where your reads are slow, always, always, in order to make things faster, in order to make reads faster, the only thing that should come to your mind is indexing.

## [00:23:53] Indexing the dictionary file

**[00:23:53] Teacher:** So can we somehow index the data? Can we somehow create a small index through which we would be able to not, through which we should avoid doing a sequential scan of this entire file to hunt for the meaning that we are doing or to hunt for the key that we are looking for. So can we create an index on top of it? So that's what would be the index that we'll create. Just one level index, simple. What would this index look like?

**[00:24:24] Student 2:** Yeah. So basically offset and the name, like basically Apple or MSN [check: "MSN"].

**[00:24:30] Teacher:** And the key, right? Key and the offset.

**[00:24:33] Student 2:** Point to what? Offset is basically inside the file. So first line of this file is basically, let us suppose we have organized it line by line, is offset zero and so on. So offset is the

**[00:24:50] Teacher:** [check: speaker boundary - "nth byte ... starts" may complete Student 2's sentence] nth byte from the beginning of the file up until with that line starts. Right. So Apple is done. Amazon is offset [?two | asr: "to"] which points over here. Then maybe you might have a third word. Let's say book with offset three with stores over here. And offset is the byte position of that word in that file. Okay.

[00:25:10] Now let's estimate the size of this index. So this is a classic index. Now, how would the read happen? Now, first of all, we would now what we'll do. Now, if you were to, given that we have an index, gigantic file and now if let's say I'm searching for a word, if I'm let's say searching for apple, what I can do is I can read this file, I can open this file, index file that I have, I'll iterate this file line by line. At the moment we have still not done what, how should we read this file, but assume that we are reading this file line by line and we find the key that we're interested in, let's say we're interested in apple, we got it, we got the offset around it, we went to the corresponding file and then we read this entire line from it, get the meaning and send it to the user.

[00:26:03] It's like, but you are doing linear scan over here. You're still doing linear scan over here. How is this better? This is better because here, when you are doing the linear scan, you are also going through the meanings of the word, which are going to be huge while you're doing linear scan over here. What's happening is you are just, for each key that you have, you are just having a right offset that you are storing against which, right. So you are not iterating around MBs of data, but rather this is just 4 byte offset. So it's very fast to read this small file sequentially, worst case sequentially, as compared to this gigantic file, because when you do file IO, you always go in a sequential way over there. Right. Okay.

### [00:26:50] Estimating the index size

[00:26:50] Now, can we like, should we do this sequentially? Let's see. Can we fit this index in memory? Some basic computation to see how big this index file would be. Right. Harsh, I'll pull you in. How we need to estimate the size of this index. The number of words that we have is 170,000 words. And what next? How will you compute the size of this index? Harsh.

**[00:27:25] Student 6 (Harsh):** Yeah. Hi, Arpit. Thinking one very small way to do it. Like in this index, can we have that 26 entries, like ABCD, E, F, G something and their indexes or location. But then we only have 26.

**[00:27:42] Teacher:** But then still you would have to go to those, those all the words for Apple in order to find that one word. Right.

**[00:27:48] Student 6:** Yeah. But we at least know about ABCD.

**[00:27:50] Teacher:** But then isn't this better, given that you already know Apple, you know the offset to directly go to that line and read it.

**[00:27:58] Student 6:** We have all the words, right?

**[00:28:00] Student?:** That's your concern. Right. [check: may be Teacher]

**[00:28:03] Teacher:** But let's assume, let's compute the size of the index. How big that index is. The size of each entry in the index is how big? The length of the key and the length of the offset. Correct? Correct. So what's the length of the key is the length of the word that you have. The length of the word on an average in English dictionary is 4.3 something. Average length. So average length is 4.3 plus what you are storing and offset. Offset is integer. Integer will take up 4 bytes. Right? So 4.3 plus 4 is roughly the size of one index record. This much. Correct? Correct.

[00:28:49] And now let's say you store it in a new line. So you add 2 more buffer characters. One for comma and one for new line that you have. Right. So these many characters or these many bytes per index, you are having one entry for each word that you have. You have total 170,000 words. So this would be the size of your index. Correct. Correct. Okay. Do this multiplication and tell me what the size of the index is. Open a calculator and do this multiplication for me. Yeah. Take your time.

**[00:29:53] Student 6:** 17,000,000.

**[00:29:55] Teacher:** 17,000,000. Tell me the exact number.

**[00:30:00] Student 6:** 17,000,000.

**[00:30:04] Teacher:** 17,000,000. These many bytes. Right. So if these many bytes is the size of the index file, it seems too big. Let's convert it into KB. It will be? 1751 KB, which is equal to 1.751 MB. That's it. Okay. Now, will you worry about it? 1.751, you can fit it in RAM very easily. Right. Right? So this is what I wanted to showcase, that this is why number crunching is very important when you are designing any system.

[00:30:48] What seems to be very huge, one terabyte big file or 170,000 words. When you do this computation, you find out, hey, this file is indeed one terabyte big, but the index that we are creating is like can fit in just 1.751 MB, which is peanuts, which is nothing. You can literally load this index in memory, stored in disk, while processing load this in memory. So now, the things that you're trying to do, like A to Z, you don't really have to, because you can fit this index right in your memory. Given a word, just look it up. It's like create a hash map out of this in memory, given a word, check the hash map, get the offset, go to this file, read the corresponding line from that offset and return the meaning to the user.

[00:31:40] Life becomes so simple, and this is why I wanted to show, like, this one simple number crunch that we did, it helped us make our system very better, because what has happened is instead of over complicating things we just keep it very simple, that one level of indexing. So first of all, just to converge on this discussion and give you a quick summary of it, we started with storing this in a simple CSV format that we had.

[00:32:11] Then because now storage part is done. Now, when you are trying to query it, when you're trying to query it, what we found out, hey, we have to do linear scan every time. For every query, for every read request, if I'm doing this linear scan, sequential scan in this file, on an average, I would be reading 0.5 terabytes, like half of it, 0.5 terabytes on every request, rough estimate. Then for every read request, reading 0.5 terabytes is very slow. 0.5 terabyte is 500 GB.

[00:32:38] Request, it's going to be very slow. So whenever our reads are slow, the only thing that we can think of is indexing, and that's the good way to approach it. Reads were slow, [unclear: "to make it first"] we create an index. In index what we store? We store the key and the offset at which it is present in the file. Right. Now we think of doing, let's say, let's keep it simple, let's start to do linear scan on this thing every time we get a request on this file. If we do that, every time that we get request we do a figure out a key and then get to offset and then query it. What would happen? We think, hey, isn't this slow? But in order to see if this linear scan is going to be slow or not, we find the size of this index.

[00:33:21] The size of this index is the number of entries that we would have, which is equal to the number of words that we have multiplied by the average record size, right? It's English dictionary that we are building. In English dictionary, the average length of a word is 4.3, either one of this, but it's not more than five. Definitely. That's the average one. I actually downloaded an entire dictionary and then computed the average length. That's how I got to know. So it's 4.3 [unclear: "as it's R4.4"]. Something like that, but 4.3 plus 4 [?byte | asr: "by"] to store this integer. So 4.3 plus 4 plus 1 for comma, 1 for new line. So it became 8.3 plus 2 is 10.3, 10.3 into 17, which gives you just 1.75 MB.

[00:34:09] Given this, we can very easily see, we can literally store this index in memory. Like we can load this index in memory when my API server starts, request comes in, I check this in-memory hash table where this index is, I get the key, check the offset, go to this file, read the meaning and send it back to the user. And this makes, this now makes much faster, because we are not doing linear scan over here. We are directly doing a pointed read on this file with the help of this index. Right. Okay. Okay. This is the first part where we sorted out our storage and our querying side of things. Right. Okay.

### [00:34:54] Portability - one file instead of two

[00:34:54] Now let's talk about portability. Now here you see we have now two files. Data.dictionary. We have the two files. We have index.index.of dictionary [check: file names as heard] and data.dictionary. In index file, we have the index. In data file, we have the data. Now for us to ship this, quote unquote, ship this dictionary to someone, anyone, I am having two files at the moment. This breaks the portability thing. We want this to be just one file. How can we go about this? Anyone except Rahul and because these folks are quite active. I'm just probing someone else to participate. Anyone else who wants to do it. We have two files. We don't want two files. We want one file. Alok.

**[00:35:47] Student 7 (Alok):** Do we need to create a file for the index? I mean, on the system startup, can we just build it up in memory?

**[00:35:56] Teacher:** So which means on every startup you have to iterate through this entire [check: sentence cut off, 3 s pause follows] We can avoid it, right? Because why do we do that? Because this is not changing anyway. Right? This will change once every week, right? This, this file.

**[00:36:14] Student 7:** I mean, then basically it is about merging these two files and having it in one file. So having some kind of partition between, some kind of partition between using which we know that till this line, this is the index and after this is the dictionary.

**[00:36:32] Teacher:** Okay. So now what we do, we have this, so we merge it. Okay. But now that's now a new challenge would come in. So now you are merging this two file into one gigantic file in which you have index. You literally concatenate this file and you have this gigantic data that you have. Okay. Okay. But how would you know when your index ends and when your data begins?

**[00:37:00] Student 7:** There has to be some line or some, some special information. Yeah. Okay.

**[00:37:11] Teacher:** Anmol, any other approach?

**[00:37:15] Student 10 (Anmol):** So, I mean, we can pre-allocate the space for index because the words are, I mean, we know the size of the words and only few words will be added.

**[00:37:25] Teacher:** What do you mean by pre-allocate?

**[00:37:27] Student 10:** Pre-allocate in the sense like we can fix the size for the index.

**[00:37:31] Teacher:** Okay. You are giving it a fixed size. So for example, that I know that my dictionary, but what would be a fixed size? Right now it's 1.751 MB.

**[00:37:40] Student 10:** Yes. I would be giving more to the index, more than this. That is currently there, but because the new words will be added very less, right?

**[00:37:51] Teacher:** That, hey, instead of me worrying about to have a separate or a special line that denotes that my index ended and now my data begins. What you are doing is you are giving a fixed width to this index, that when my application starts, when it reads this gigantic file, it knows that the first two MB is going to be my index. Yes. Right. Okay. That's a good approach. That's a very nice hack, but it's not space. Although you're wasting very little space, but let's be a little more frugal about it.

**[00:38:22] Student 10:** Sure.

**[00:38:25] Teacher:** Gaurav, what else can you do?

**[00:38:27] Teacher?:** These are two good approaches. What else can you do?

**[00:38:30] Student 1 (Gaurav):** Building on top of it, we can have data is stored from top to bottom, bottom within the file and index is stored from bottom to top within the file.

**[00:38:39] Teacher:** How would you know where one ends and another begins? You still want to know, right? Up until where should I read to load the index? Store index like this, how would you know when to stop reading the index? Like when to stop so that you have built this in-memory hash table. Because imagine, I'll just, I'll just give a quick example. So let's say this is how you have concluded. So first index and then data, all in CSV format. Right, now when you start reading this line by line, you created hash table, hash table, hash table, hash table, hash table [check: possible ASR loop - teacher may be counting entries], you put it entry there, and then this first you had an hash table apple comma O1, and then when you start [unclear: "i did this"] you got apple, and then you replace it with a fruit or something, right? So you need to be a little more frugal about it, that you need to know when to stop.

**[~00:39:32] Student 1:** So what I meant was that index can grow like a stack, which means from the nth byte to n minus one and minus two so on, and data can start from zero zero, so. So then you are wasting this much of space. So this much of space might be unutilized. Today it might be unutilized, but someday. [check: "So then you are wasting this much of space ... but someday" may be the teacher]

**[00:39:55] Teacher:** But the day when these two are right next to each other, how would you know when one finished and other begins?

**[00:40:03] Student?:** Yeah, having a separator probably.

**[00:40:06] Teacher:** So you are also going with separator, right?

**[00:40:08] Student?:** Yes, yes, yes.

**[00:40:09] Teacher:** Okay. Yes, Amrita?

**[00:40:13] Student 3 (Amrita):** So basically I was thinking that since the data is always going to grow, but we can choose a specific index to store that information. So maybe at the zero thing, [unclear: "they saw the first set"] we can choose to store that separate information and then update it as the add on data.

**[00:40:32] Teacher:** Okay. That's interesting. So what you're saying is that add something in the beginning of this and specify what is. Correct? Right. Okay. So now if you do this, your way to read this entire file would be: I first read the separator. Then I start reading the data until I find it separator, and that much becomes my index, beyond which becomes my data. Correct. Now I'm saying, can you change this to store something else? That would be much more beneficial for you. Instead of storing the separator, can you not directly store the byte offset?

**[00:41:21] Student 3:** Yes, we can.

### [00:41:22] File header with byte offset

**[00:41:22] Teacher:** It eradicates the need of a separator. And then the advantage of it is, let's say you store the byte offset of data. So place where the data begins. And if you store this information, you exactly know when your file loads or when you are trying to read this entire file. The first step is to read this first chunk. And this is a classic way of having a header in any file format of the world. PNG, JPG, MP3, AVI, everywhere the first few bytes, it depends on the protocol, it depends on the format that the creator of that image format or whatever format specifies what that should be, that first few bytes denotes or contains the meta information about everything else in the file.

[00:42:21] So what you just spoke about, Amrita, is to add this header, whose job would be to store this meta information about the file that you are creating, the singular file that you are creating. Because it contains multiple sections, you are storing the information about each of the sections in this header. I'll give a small example. So in this header, we might just store that this is our dictionary, with some version number. And now this has to be a fixed size header. It cannot go beyond that. And you have start offset of data. Or rather you may insert store index size. How big your index is.

[00:43:11] So let's say this requires you 1, 2, 3, 4, 5, 6, 7. 7 or rather 8 bytes to store this. [unclear: "Mixed 8th byte."] So first 8th byte would represent O-U-R-D-I-C-T. For example, it's a name. So in the PNG format, the first 3 bytes is P-N-N-G. So that tells the decoder that this is a PNG file. MP3 has some other bytes and then it is MP3 and so on and so forth. So the first 8 bytes will denote that this is our dictionary. Like whatever name you would want to give it, you can give it. Let's say I build my own database, to call it AODB, Arpit's outstanding database, for some reason. So this would be my four, first four bytes, and it's my decoder who would understand it's AODB file. So I know the format. I know what components would it hold.

[00:44:02] Then a version number, maybe you might have multiple variants of this file. You may want to specify if it's version one, you have index first and then data. Maybe in version two, you have data first and then index. So depending on that version, the decoder would understand what to do with it. Then third, you might want to store the index file. So depending on this, you are choosing that the next, let's say version number is four bytes as an integer. The next four bytes is index size. That how big is the index? When you do this, you store how big is the index? In this one, what you will store? You will store the value 1.7500. This is the integer that you will store in this space as the index size. So now your header is a fixed width header. Plus 4 plus 4 equal to 16 byte. So this becomes your header. So this is the header that you just added, which is 16 bytes.

[~00:44:54] So the flow of our application would be: when your application server boots up, assume it has this file. When it has this file, it first reads the first 16 bytes of this file. It sees the header. It sees that, hey, it is our dictionary, first 8 byte it read. It's our dictionary. Oh sorry, what first byte? We know that the header is fixed 16 bytes. So it would read the first 16 bytes, out of which it would find the first 8 bytes and understood it is our dictionary. The next 4 bytes is version and the next 4 bytes is the index size. Once it knows that this is the index size, it would read those many bytes starting from this location, these many bytes, and it would read it as index. Then it can and create a hash table out of it. And from there, everything is data. And which is what this offsets would be storing over here.

### [00:45:58] Custom file formats, encoder and decoder

[00:45:58] So this makes your entire dictionary shippable. And this is a classic way to build any custom file format, where you are storing a header and information about different sections that you have. Here the different sections are index and data. In case of PNG, it is something. In case of JPG, it's different frames that you have. In case of MP4, it would be where is the video part? Where is the audio part? Right. And in that video format, you would know that this is the first frame. This is the second frame. This is the third frame. In audio part, you would have the waveform information. Right. This is literally creating compartments in the file that you have, and having a header that tells you where which compartment lies.

[00:46:44] And this is the one file that you can very easily ship across systems, where you would want, or give it to your end user. Anyone having this decoder can read this file, and this is the point that I wanted to bring out. How this particular format becomes really important, and it's very general wherever you see anything. For example, tomorrow what Hemant bring out that word, if you are exploring something around data engineering and you come across Parquet format, right? Parquet format also has some headers and information, right? JSON does not have any, if you look carefully in the JSON file, JSON file that we all use. It's a simple text file, right? Because it does not have any headers. You have to read the entire file. It is in a specific format and then you have to decode. So the JSON decoder decodes curly braces, [?quotes | asr: "codes"], it's string, and then converts it into it. And then it creates a in-memory dictionary and gives it to you. Because it doesn't have header, you have to read the entire file to get the information out of it.

[00:47:51] CSV in general does not have a header, right? But [?PPT | asr: "TPT"] format, PDF format, everything else has an header. And it depends. You can define your own custom format. I tried to write my own image format. For some reason I did that, right? So that's how I got to know this. But this is again really important. When you know, when you see a file, whatever file, whichever file you are picking up, it has its own encoder and decoder. So encoder creates that file in that specific format and decoder decodes it. Image, video, audio, pick your favorite format. Holds true for everyone.

[00:48:33] So when we say, you might have seen this error, early days of internet to be honest, this web browser does not support TIF format. What does this mean when you say that this web browser does not support a format? It implies that it does not have an encoder or decoder for this file format. What does it mean? It does not have a decoder for this file format. And given this set of bytes, I don't know how to interpret it. But what we just wrote is for our format, the decoder that our decoder, what our decoder would do: it would know for 16 bytes is header, through which I would get the size of the index, and from which I'll get the data. And the offset in this will contain the offset in this data part. This is the decoder logic that we would write. This holds true for every file format in the world.

[00:49:22] But now because of that one constraint that I added, portability, you see that how we were able to create this as just one file instead of shipping multiple files. Okay. So that does this.

## [00:49:38] Serving the dictionary - load balancer, API servers

[00:49:38] Now we'll touch upon infrastructure side of things. So now here what we build, we build an understanding of, we build an understanding of something really interesting. How a file format is, importance of portability, headers, where they come in handy, indexing to make reads faster. Now let's come to the next part. How do you push it? How do you serve the actual user request? Right. I'll lay the seed foundation and then we'll improve on the design. So what we may think, that our end user who will be querying on this, obviously we would have a load balancer or something, where after which you get a bunch of, I had to create a load balancer.

**[00:50:26] Teacher:** So let's say we create a load balancer, request from an end user comes to load balancer. Behind the load balancer, we have bunch of API servers whose job is to serve the incoming requests that are there. So now what would be the request flow look like? So this is a load balancer on which you got the request. These are the API servers.

**[00:50:51] Student?:** API server one. API not a good place to write. [check: may be the teacher labelling the board]

**[00:51:04] Teacher:** Okay. A classic case. A user, a load balancer and an API server. This is a file that we have. Now where would we store this file? For us to serve this request or handle this request, we are exposing a GET endpoint. So slash word is we are exposing and we are doing a GET on it and we get the meaning around it. Right? So this is the request that user fires and I want to get the meaning from this. The request comes to a load balancer, load balancer forwards it to one of this instance. Now, what would this instance do? Where is this file? Query. Right? We defined the file format to provide a way to query it or and way to fire HTTP request on that. How does that flow look like? Anyone? [?Anubhav | asr: "kyanav"]

**[00:51:59] Student 3 (Anubhav):** So can we have a shared disk storage for all the API servers that they can query to get the file?

**[00:52:07] Teacher:** But why not store this one file on every server? What's the harm in that?

**[00:52:14] Student 3:** That would make the update process a bit more tedious, but if we are fine with that, then we can also do that.

**[00:52:21] Teacher:** Okay. It would make update tedious. Why?

**[00:52:26] Student 3:** So whenever there is a change in, let's say, a few hundred words, we have to make that change happen on each of the API servers. Some of the API servers might not be available at the time when we are trying to make that update. Then we have to wait for them to be available.

**[00:52:41] Teacher:** But updates are not real time. Updates are weekly. Is that still a problem? Every Sunday you are making one update in bulk. It's not a key-value store where you are [?write | asr: "right"] or you can update anytime you like. Correct? It's a weekly update. Every Sunday you'll get a file from Oxford. You would say, okay, these are the new words. These are the new meanings. Go and update your data. Right?

**[00:53:12] Student 3:** Yes, that's correct. But like what another angle that I'm thinking of is, what if like the updates fail for a particular set of a file, then we would have data inconsistency.

**[00:53:24] Teacher:** So let's say what drastic would change if there is data inconsistency, because meanings are not dramatically changing. Right? You may have inconsistency in data in case your update partially fails, but it's a meaning. So apple, you might have a meaning which says a fruit. Tomorrow you might have a meaning that says around fruit. Is this an end of a word? No, right? But it's a valid point. I'm not denying it, but just that I'm probing you more to think on those lines.

[00:53:57] What else is wrong with this approach? And why are you going? Because what I'm trying to do is, when you are, when you are proposing a solution, you should have thought of other disadvantages, like, sorry, you should have thought of disadvantages of other part in depth, which is what I'm trying to prove. Right. What else could go wrong? So you said update tedious, correct. You said data inconsistency, but in both cases, both of them are not a problem yet. What else is a problem? If you store the files, the same dictionary file across all the three servers, what else is a problem?

**[00:54:41] Student 3:** Like we are having a lot of duplicated costs of saving the file, one DB file on a lot of servers. So which we can optimize for.

**[00:54:52] Teacher:** Biggest pain, cost. Biggest inconsistency is okay. Updates, tedious, okay. Cost. A real world system design is all about doing things, doing the bare minimum things at the bare minimum cost. Always remember this. If you are not thinking about cost, then you are not building good systems. Because you cannot, because in order to make anything faster, just throw a lot of money at a cloud provider, get a bunch of RAM, store everything in memory, problem solved. If I can have one terabyte RAM over here on each of this machine, I can just load the entire dictionary in memory. No need of creating index, nothing, just one hash table containing one terabyte of data. But that's not a good solution. Because it's not cost effective. So cost is something that should come to your mind. Like the first thing that is the solution that you're designing, is this cost efficient or not.

[00:55:50] Okay. Why is this cost inefficient? Duplicating the data that you have in external disks that you are storing, and you would be storing it in SSDs. SSDs or any disk is very costly. Cost of one terabyte SSD that you need, and let's say if your dictionary is a huge disk and you have 100 servers, so you are having 100 terabytes of redundant data. Problem, right? So there has to be a better way to do it. So this is why you can think of not going with storing over here, and the thing that is on it with Anubhav, that have a central place where you are storing the dictionary.

### [00:56:36] Central storage for the dictionary (S3)

[00:56:36] Okay. Now what this central place would be? How will you access it? Pankaj.

**[00:56:43] Student 5 (Pankaj):** So can we use something like Amazon S3 in this case to store this file?

**[00:56:50] Teacher:** Okay, why S3?

**[~00:56:50] Student 5:** So I mean it's very cheap and optimized for blob storage, like blob files. So I'm thinking like since we have a single file, we can just store it there. And probably like one more thing that I thought of was that since it's a big file in S3, like I have seen that the get object query, get object has some query params where we can actually pass the bytes that we want to read. So since we already know the index size, we can just pass that these many bytes I want to read and get that, and finally get the offset, and then again get the same query with that particular offset byte and read that and give it to the user back.

**[~00:57:42] Teacher:** Great, great, great. Okay. Subha [check: name spelling]. I'll just pull in in a minute. Okay.

[00:57:50] So what Pankaj said is something very interesting. What he said is can we, because we, what we have converge on S3 yet, right? We still want to know what are the core properties we want from the system. And then we would pick a particular technology, right? So what we want, what first Anubhav said, let's put it in a shared storage. Why do we want a shared storage? Because we are not ready to [?replicate | asr: "oblique"] the data across. Why? Because it is cost inefficient and other problems come with that. So that's okay. So given that we cannot do it, we want it in a central place, but remember, what is common across multiple servers? Network, which means you need a common place which is accessible over network.

[00:58:41] And what is that one common place that is accessible over network? Any block storage or any database, but we cannot use database. So we have block storage and anywhere we are storing a gigantic file. We can just store this file on S3, for example. We are still not giving up our portability. We still have this one file on S3. But is this the best choice? What is the feature that we want? If this was a normal disk, assume it was a normal disk. We were, we designed our entire approach thinking it's a normal file. And I would read a set of bytes and then another set of bytes and then do a read at or do a random read in the data section. Right? Because we are reading this header to understand how big the index is. We're reading this entire thing to build an in-memory hash table and then doing random reads on this data section.

### [00:59:34] Network attached storage - random reads

[00:59:34] So this should be supported by whatever we use over here. So generic term for this is a network attached storage. So what we were looking for is any storage that is accessible over network. It gives file system semantics. And the key things that we need is we need random reads. That's a bare minimum we need over here, that we should be able to read what I have given my random read. It means that I could provide a thing that say that from this file at this offset read n bytes. I need to have somewhere to fire this. Right? A normal disk gives you this. Seek to that location, read those many bytes. Now this needs to be provided by any network attached storage that we are using. So you can just use the network attached storage that gives you this thing.

[01:00:39] S3 gives you all the file system level semantics because of which it can be used as a distributed file system as well. So what you get this feature on S3, where on S3 you are not just there to read the entire file. You can say that in this file, at this offset, read these many bytes. It would give you exactly those many bytes that you are needing. And you could choose. It's not that I prefer S3. It's just that you can replace S3 with any network attached storage. For example, an HDFS. HDFS gives you this exact same semantics. Next, you can use a literal physical hard drive connected in your data center acting as this thing. So literal network hard disks that you get, like Dell network hard disks are very famous. You'll get this. You can use anything that gives you file system level semantics to do this. S3 gives you that. Everyone understands S3. That's why I'm going with S3.

### [01:01:41] Read flow - API server boot

[01:01:41] So now on S3, what we'll have is we'll put this file having header, index and data in this one file and we store it on S3. And now what our reads would look like. Now the entire flow, end to end flow, what it would look like is when any of my API server boots up, what it would do. It would read the first 16 bytes of this file. So first of all, now this comes one step back. What each API server need to know is needs to know the file path on S3. So that can be a static configuration, that this is the dictionary that we are serving. It can be a static, but I will go deeper into this because we still have to do deployment of this. So all we want is we want a file path on S3, that where exactly is the dictionary stored on S3.

**[01:02:35] Teacher:** So let's say we pass it as a configuration. This is a configuration. This is the path where it is stored on S3. Given that API server starts with that, what it would do, it from this path, it would read the first 16 bytes. It would read the first 16 bytes, interpret it as header. It would understand it is a dictionary file, like whatever our format is. From where it would know the index size. It would read, then it would make another S3 call to read those many bytes and create a hash table, in-memory hash table over here.

[01:03:05] What we would have, we would have an in-memory hash table, in-memory hash table, in-memory hash table over here. Then it would start serving the request. Whenever a get request comes in, goes to any API server, it would refer to this in-memory hash table. If the word exists, good enough. If it does not exist, 404, right? If it exists in the in-memory hash table, it would have that this word is present at this offset. So what it would do, it would take this, know the offset, go to that particular offset on S3 and read this file. How would it go? S3 API gives you that. In the S3 documentation, you can do a random read and it looks on this file, at this offset, read these many bytes. You can issue a command like this. But in case you are replacing S3 with, let's say, HDFS, has the exact same semantics. Network hard disk has the exact same semantics.

[01:04:00] Right? So you can seamlessly read the bytes that you are interested in and nothing before that, nothing after that. So you're doing the bare minimum over here. And this is how your normal gets would look like. But if you look the beauty of the system, the beauty of the system up right now is what you were just being able to do was to have pointed reads on S3. Very efficient reads. If you look carefully, what we just built is we are now able to read on a specific record from S3, just that much, without reading the entire file. So we are just built our database, because what a database is? Key-value store, right? We just build a key-value store that supports huge amount of gets on S3.

[01:04:56] So we got this ability to fire pointed queries on S3 without us having to read this entire file. And that is magical. It has a ton of applications. And we'll talk about them. We'll talk about how to extend this part into building various applications out of it.

## [01:05:16] Weekly updates

[01:05:16] Now this is still not done. There is still a big chunk remaining. Updates. Now for us to have seamless updates. I'll just copy this diagram because we are still not discussed on updates. So we discussed on storage, we discussed on query, we discussed on high level infra that like, but now what about updates? Now the updates that we are having, they are weekly updates, right? Updates are weekly, which means every week I'll get a file from Oxford which has the words that have changed and the new meaning for that. Apple change, let's say ball change, and let's say zoo change. These three words changed, right? Now what would we do? We have to apply these changes to the file that we have on S3, how would we go about it? Vikram?

**[01:06:15] Student 1 (Vikram):** Yeah, so as this is a weekly update, so we can have a batch job. So what it will do is it will add those newly words to the end.

**[01:06:24] Teacher:** Did you mean cron job, batch job?

**[01:06:28] Student 1:** Yeah, we can have a cron job also.

**[01:06:31] Teacher:** See, batch job is batch processing. Job is periodic updates. [check: a word before "job" may be missing (cron?)]

**[01:06:37] Student 1:** Yeah, periodic job. Whenever there is update from Oxford, we can trigger that job or we can also have the job also. And what it will do is it will update the dictionary and at the same time it will update the index, and so it will repackage the whole file, upload it to the S3 and where it would update what? [check: "where ... it would update what?" may be the teacher probing] Yeah, so we can have on another machine.

**[01:07:07] Teacher?:** Now we are talking.

**[01:07:08] Teacher:** Okay. You're spinning up another server. Yeah.

**[01:07:11] Student 1:** Now. And in that file, whenever we receive a new update, so we can recompute this whole file.

**[01:07:18] Teacher:** Do you have changelog on this server? Correct.

**[01:07:21] Student 1:** I will add these changelog files to the dictionary. So where is dictionary? Dictionary means we have to pull it from S3.

**[01:07:29] Teacher:** Correct. You'll download it from S3.

**[01:07:32] Student 1:** Then update the version of it. How? Because we know that in the header file, we have the version stored, right? At the initial byte.

**[01:07:42] Teacher:** That's okay. That's the last thing that we'll do. But how are you updating the dictionary? This file, how are you updating?

> **Student Question [01:07:49] - Student 1:** So are we getting only changelog or the whole?

**[01:07:53] Teacher (answer):** Only changelog.

**[01:07:54] Student 1:** Only changelog, right? So we can append it at the end because our dictionary is not sorted.

**[01:08:05] Teacher:** But then in that case, what would happen is the dictionary would be ever increasing, plus it would have duplicate entries. And I just added that you cannot have repetitive entries in the dictionary that you are serving.

**[01:08:18] Student?:** Correct.

**[01:08:19] Teacher:** Okay.

**[01:08:20] Student 1:** So now, so we can iterate the whole dictionary once and check that if the file, if the changelog has duplicate, what else keep it. Or if the meaning or the, if the meaning of the word is changed, then replace that thing like that.

**[01:08:38] Teacher:** Is it really that simple? Think of it. Think, go into a little more details of it.

**[01:08:46] Student 1:** Yeah, we can also have a hash of it and compare the hash with two, the existing one and the new one.

**[01:08:53] Teacher:** You are directly have them. See, changelog, anything has what needs to be changed. Simple. So you don't need hash sort of comparison. Like see, again, as I always say, it's easy to build complex systems. It's very difficult to build simple systems. Right? Think all the things that you really need. Hash, you don't need it, because changelog directly contains the changes that are, that on the dictionary, right? So how will you apply the changes that you have with the changelog in this file? What are the challenges that would come in?

**[01:09:27] Student?:** Challenges is to generate the diff actually.

**[01:09:31] Teacher:** Why do you want to generate a diff? Changelog already has this, right? You just want to apply this changes over here. What do you mean when you say to apply these changes?

**[01:09:39] Student 1:** Yeah, so correct. So we already have an index right here. already had it.

**[01:09:46] Teacher?:** Okay. Correct.

**[01:09:47] Student 1:** And we have a changelog. So what we can do is, so let's say the change of meaning of apple. Right? So we can use that index file and use the index and apply those changes or replace that the whole line of the CSV.

**[01:10:05] Teacher:** Okay. You're saying that if I have this file and let's say I have the word apple over here and and then let's say I have ball and I have a round object. Right. Okay. Now let's say my changelog contains. I should have drawn it. Let's say my changelog contains that apple, and now the new meaning is a round fruit. Now, how will these changes be applied over here? You say that using index, let's say you know the offset when it needs to be changed. Now, what will you do? by this? Yes. [check: start of "...by this? Yes." may be missing or a student's answer] Okay. What happens when you replace this by this? Will this entry move down?

**[01:10:53] Student?:** Yeah, we have to.

**[01:10:55] Student?:** Yeah. Correct.

### [01:10:56] Limitation of how disk works (file IO)

**[01:10:56] Teacher:** We have to do that happen in file IO. [check: "We have to do that happen in file IO." may be a student] No. What happens in file IO? Let's say if I write around fruit, what would happen? It would look something like this. So this is how, this is the limitation of how disk works. So when you go to a particular location and start writing, it would blindfoldedly write the bytes. Like in the IDE, when we add, we can hit enter and move other lines down. Because it is in memory. In memory, you can do that. On disk, you cannot. So when you go to this particular offset and start writing, apple, round, fruit. You are overriding the existing one. So you cannot just say I would replace it because it's not as trivial.

> **Student Question [01:11:52] - Student 2:** So how do we go?

**[01:12:06] Teacher:** Thanks, but thanks for making this. [check: phrase after a 14 s pause, may be garbled] So this is, see, these are the details that I want all of you to focus on. Right? Because this is what makes us better engineers, because it's easy to just say, I would replace it. But when you are going to write the code, that's what I always say. An engineer, a good engineer or a senior engineer always wear three hats. Product manager, architect, and an engineer. This is what an engineer hat looks like. You go, because imagine you are the one implementing it. What code will you write to implement it? And when you think of implementation, you realize the things that would break. Right. Okay. Let me pull in someone who has not spoken today. Yeah. Jodhinda, how would you solve this problem? [check: name spelling]

**[01:12:53] Student 3 (Jodhinda):** Can we have sort of like graveyard entries, which sort of replace the currently existing entries there? For example, if we have a new meaning for Apple, we append it to the end of the file and the previous.

**[01:13:04] Teacher:** No repetitive entries.

**[01:13:07] Student 3:** Okay. Well, okay. So I was thinking like you just sort of waste, waste that space for some time and later run some sort of compaction process after.

**[01:13:19] Teacher:** No, but we don't see it would work well when you are doing live updates. This is an even weekly update. So have it very clean up it directly. Right.

**[01:13:27] Student 2:** Yeah.

**[01:13:29] Teacher:** Shreya.

**[01:13:33] Student 9 (Shreya):** Hello. Yeah. Yeah. Approach would be to just, a very naive approach would be to look for every word.

[01:13:48] Get the byte where we are supposed to like enter it. And then so we, what we are doing is we are creating a new file. Now, add that change in that file. And then append all the rest file to it. And then, I mean, it would be a very naive approach.

**[~01:14:03] Teacher:** No, no, it's not naive, it's not naive, it's kind of like merge of merge sort, correct? Yeah, yeah, and that's exactly why you should do it, that's what the best approach is. I'm not even kidding, it's not a naive approach, to be honest, it's not a approach given the design that we have. We're not using fancy B+ trees over here, we're going with very simple approach, but that's how it works, right? You think of a simple approach and that's what is going to be really efficient. When you make things complex, it has its own set of disadvantages. Right. Okay.

[01:14:35] So this is why, and the requirement to do that merge of merge sort, to be to be efficient, is that your file needs to be sorted.

### [01:14:46] Merging the dictionary with the changelog

[01:14:46] I'll just quickly walk you through on what this is all about. So what we'll do is we'll create a new file out of the existing file. How? By merging the two files. So we got a changelog, will be a very short file. Assume it is sorted. Even if it is not sorted, you load it in memory, sort it and dump it, because it's going to be very small. It is changelog. It's not going to be a gigantic file anyway. So that becomes your changelog. Then you have an entire dictionary that you just downloaded right now on that new server that you spin up. Now what do you do? This is sorted. This is sorted. [check: possible ASR duplicate] You create a new dictionary out of this, a new file out of this, by iterating the two, linked list problem, merge two linked list, merge two sorted linked list into third sorted, sorry, merge two sorted arrays into third new sorted array. This is that. This is merge of merge sorted.

[01:15:40] How you are merging two sorted arrays together is you have a pointer over here, you have a pointer over here. You iterate both files line by line. You see the first entry is AA'. So these are words and these are meanings. I'm just simplifying it over here. So these are not sections like A, B, C, D, but these are words. A, B, C, D, F, J. I just explain karna, it's easy. So these are words, these are meanings. These are words, these are updated meanings. So what we do, we have two pointers. We iterate both the files line by line. And then we say it's A, A dash, C, C dash, A is small. I'll write A, A dash over here. Then I move this pointer down. B, B dash, C, C dash, B is small than C. I add B, B dash over here. I move this pointer over here. CC dash, CC double dash. This is the updated one. Both matches. This is the updated one. [check: possible ASR duplicate] So I write CC double dash. And I move both of them forward. Then DD dash, EE dash. DD dash [?written | asr: "rotten"] over here. Because that is small one. Then FF dash, EE dash. [check: possible ASR duplicate] E small one. I write EE dash. And then move forward. FF dash, FF double dash. I pick the updated meaning. Right over here. I completed my. I exhausted my changelog. So every entry after this.

[01:16:56] A classic merge of merge sort. Nothing like merging two sorted arrays into third big sorted array. This is literally that. But here, one point, you don't have to load this entire file in memory. All them referring to merge of sorted array. Here you don't have to load it in an array. You are literally iterating file line by line and creating a third file out of it. Given that the way file IO works is when you write, it may start to override the next line if you go beyond that range. You have to always ensure that you are creating new entries over there. So we created a new file from the existing dictionary plus the changelog.

[01:17:42] Now this puts a constraint on us that because this dictionary is one terabyte big, this dictionary will also be one terabyte big. The disk of that server that we just spin up to run this job should be at least two terabyte, at least two terabyte, right? But that is just one server that we are doing that, right? Okay. So this is what we will do to create a third file over here. Okay. So let's say in this server itself, now we created the third file. This is the new file that we have.

### [01:18:17] Getting the new dictionary to S3 and the API servers

[01:18:17] Now what? Now how would the changes that are there in this server go to S3, and what could happen because of this? Hemant.

**[01:18:29] Student 1 (Hemant):** Okay. So now we have to start from, we have the merged file available.

**[01:18:39] Teacher:** And now just a bit, which means that now that we have this, we also have headers, headers, index, all sorted for this file. So this is the new dictionary that we are ready to upload to S3.

**[01:18:52] Student 1:** So now the critical path, critical thing is that we have to tell the clients who are using this thing that we have a new file from where they have to read it. So it's like you have to swap the existing file, which was supporting to this new file, considering this new file has previous data plus the data that came from changelog. Correct. So what it means is we have to simply change the pointer. What looks like it will have a [?downtime | asr: "downturn"] because the time, and you will say, okay, this is the URL that was available. When you put a new S3 file, it will be a new URL.

[01:19:40] So the API service which were hitting NAS or anything where we are doing this thing, we have to figure it out a deployment process, how we have to upgrade. Now, the deployment process, which we know is either you simply say, I will change everything in one go. Or we have to say a rolling upgrade, we will say, okay, I will change few of the files in few places, but it is a single place. So I don't think that that kind of a deployment will work.

[01:20:20] What it looks like, a completely A to B where you are there, you can have the new file updated, having a new S3 URL created. And once it is ready, this has to be given to the API servers saying this is the new URL or new address, you have to consume it. Now, API server has to change that point and they can do the normal deployment. Either they can do a first a canary, where one server only does a change and sees everything working fine and then only moves to others. I think these are all things I am getting in my mind to solve it.

**[01:21:12] Teacher:** Okay. Let me prove you on this one point. Why do you want to upload it to a new S3 path? What would happen if you upload to the same path? Won't it simplify your solution?

**[01:21:23] Student 1:** Okay. Then for the time when we are uploading, I mean the short period of time, maybe we are not able to serve it. I do not know how S3 internally works.

**[01:21:36] Teacher:** So let's say you updated the file at the same location, because the things that were making your system complex were where you were adding it to a new path. Then you have to tell API servers to go and update a configuration, whatnot, right? What if you have [?uploaded | asr: "graduated"] to the same path? What could go wrong?

**[01:21:54] Student 1:** Yeah. So the first thing is always, when you think about a deployment, you need to think about the rollback part. You are going ahead. You need to worry about what will be the my process if, let's say, that deployment fails. So if in a same path I'm changing, and during the uploading of the file on network, let's say the file got corrupted or something like this, I have to proactively observe it using some observability monitoring and then immediately will provide it. Okay, go to the previous file only. And that can be one critical thing to take care.

[01:22:35] Other than that, I'm not able to think anything that we have to worry about, but definitely making sure that the transition, I mean, this file transfer goes properly, and if it does not goes, we have to roll back and provide the previous file, is necessary. So having a temp file, I mean, having a temporary storage where you put this file and then upload it, check it, it is working fine and then, then mark it successful. That's, that's an important thing, I think, required.

**[~01:23:07] Teacher:** Thanks, thanks for adding all those points. But now we see, like you, as it, everyone, now everyone sees that again, as I said, drawing boxes is easy. When you go into these details, this is where things become really interesting. We need to solve this problem where you are, where it's, it's easy for us to say, yeah, we'll just upload it on S3. Right. But where and how, and what challenges would be encounter, uh, will the transition be smooth enough? Are we serving garbage data to a user? These all details are super critical.

[01:23:42] An actual system which is, I'm just proving you all to think on those lines. It's already one and a half, but it's still not convergence, such the problem statement looks very simple. I'm sure when we started with this, is what kind of stupid problem statement is this. But when we go into these details, and again, as I say, these are all building blocks you can apply to other systems that you are designed. It's not just, it's just limited to this one system, right? So be very open to how you, what problem we had and how we solved it.

[01:24:15] Okay, let me pull in. Okay, so but before I pull in the next person, let me just converge to what Hemant said in a simple order.

## [01:24:27] Telling the API servers about the new file

[01:24:27] So uploading to the same path on S3 had a lot of problems. First, what if upload fails? What if there is file corruption? When we are uploading to the same path on S3, one more challenge, that now that the file that was uploaded onto the same path, now we have to tell this server to reload the index. Why? Because offsets would be mismatched. I'll give a quick example for that. Where is it? This.

[01:24:59] So for example, if we upload it to the same path on S3, this is what is going to happen. So let's say in the index, index is loaded in memory on the API server, right? First made call to S3, loaded the index already. And then all the requests that are coming into that API server is just from index. It is checking the offset, going to that location, reading the meaning and sending it back to the user. Now here what would happen is the old data file, it had that index. Index was read from that particular thing. API server has this loaded in memory. So Apple is, let's say, offset 100 with byte 1024. This is there.

[01:25:42] You uploaded a new file, assuming everything went well, uploaded a new file at the exact same location. Now if someone queries Apple, it will go to byte offset 100 and read 1024 bytes, which might be some other random word, like the word before Apple, that too starting in the middle or somewhere. So what user would see is some garbage. Because the real offset of Apple in this new file, which is uploaded at the same path, is different.

**[01:26:15] Teacher:** So when you upload it to the same path on S3, you have to immediately tell API servers to reload their index. But for that duration, your users will see garbage data. Very poor user experience. Right? Okay. So these are the things that I'm basically trying to prove you on. Think of these lines. So that is one problem. Now you would think, hey, let me, so uploading to the same path on S3, this is one of the problems.

### [01:26:47] Uploading to a new path

[01:26:47] So now it looks like it makes sense for us to upload it to a new path. Now when we do it, when we upload it to a new path, what would happen? I'm just going back to brainstorm. So now let's say we uploaded to a new path on S3. Let's say my path one on S3 was S3 colon slash slash word dictionary slash dictionary one dot dictionary something. Right. Let's say this was first path. Now let's say when you upload this, you upload it to the new path. S3 colon slash slash word dictionary. And now it is dictionary two dot dictionary. Now how do you tell API servers that this is the new path you should start serving? How do you communicate this? Got it?

**[01:27:31] Student 1:** Rather than this, what we can try for is rather than dict2.dict, we can have wd1.1 slash the path. I mean, we can have the IP address.

**[01:27:44] Teacher:** What difference does it mean? And then the path has changed, right? Yeah. Right. You have to convey this path, whatever path is, you have to convey this to the API server that this is the new path that you need to reload. Right. How do you tell this to API servers?

**[01:27:59] Student 1:** Their cache. How? An interrupt or let's say a command which invalidates the cache. Everyone would have to tell API servers to do this.

**[01:28:11] Teacher:** Like for ping all API servers to invalidate the cache. Sounds too complex. Isn't it?

**[01:28:18] Student 1:** So, since we know what time our job will be running, can't we have

**[01:28:23] Teacher?:** That's unreliable. What if upload fails? And what if you're not able to successfully do that? Right?

**[01:28:31] Student 1:** No. So what? What's the harm in that? Because API servers won't be taking the index from the cache. It would be going to S3. It's simply adding the latency, but not at the harm of anything else.

**[01:28:45] Teacher:** Why not? What if your upload failed completely? What if your file was corrupt? You didn't check a lot of stuff there. Right? Because if you do a cron job, no matter what, Sunday at 1 PM, everyone update. What if your job ran beyond 1 PM? The upload was not handy. [check: "not handy" - possibly mis-heard] Now what? What if the file that was uploaded was corrupt? What if you didn't get time to validate? Because now this is an independent mind over here. [check: "independent mind" - possibly mis-heard] And no matter what, that would run and update it. That's wrong. Yeah.

**[01:29:19] Student 2:** No idea beyond that.

**[01:29:20] Teacher:** Yeah. Okay. Uh, yes, Abdur, what will you do? [check: name spelling]

**[01:29:25] Student 8 (Abdur):** Well, I, I came in the middle where we were already set up the API servers, but I had an idea. What if we had the each word in, in one file?

**[01:29:40] Teacher:** No, we, then we kill portability. That's why we are not having each word in one file.

**[01:29:44] Student 8:** Okay. Okay. So I, that was. Yeah. Yeah.

**[01:29:48] Teacher:** That was a constraint that we're playing with. We want portability.

**[01:29:52] Teacher:** Having everything, okay. I don't have anything. Okay, Pankaj. [check: speaker - "I don't have anything" may be Student 8]

### [01:30:01] Metadata file with the current path - polling

**[01:30:01] Student 5 (Pankaj):** Yeah, so I was thinking that we can have some extra file which will have like a metadata. Yes, that's the same file again, like it will be in S3 again, a new file and file, let's say once we know that we have updated our index, updated the new file and uploaded it to S3, like the put request which will make, in the success callback of that we can update this metadata. Perfect. [check: "Perfect" may be the teacher] What our API servers will do is, like, they will keep on [?polling | asr: "pulling"] this metadata, let's say at some frequency like 5-10 minutes, and they will see that my index path has updated. So they will start fetching it from the new file and update their in-memory index also.

**[01:30:51] Teacher:** Okay. First question, will this path be static or will it be versioned?

**[01:30:57] Student 5:** So the path of the metadata file will always be static.

**[01:31:01] Teacher:** Perfect. Okay. So that everyone knows that this is the only path where we have to go. Okay. Perfect. Okay. Then you are saying that you pull the meta file at let's say 5 minutes, 10 minutes. Yeah. Why would you do that, given that your job runs weekly?

**[01:31:19] Student 5:** Again the same issue, right? It's running weekly, but we don't know, like, when it will get updated and when it is getting, you know, uploaded to S3. I mean, it might happen that we received updates on Sunday, but because S3 was down we were not able to update it to the S3 and we uploaded it on Monday. So then basically API server will not know that now I have to fetch it on Monday. So it needs to continuously poll to find out. Now my index is updated. So yeah.

### [01:31:51] Polling vs reactive - Redis Pub/Sub

**[01:31:51] Teacher:** But we studied second week, third week that we can make things wherever we have poll, we can make things reactive. Right? So instead of polling, we can make things reactive. Hey, go pull. Something has changed. Yeah. How do we go about it? Remember Redis Pub/Sub? Yeah. So we can use that Redis Pub/Sub. So all API servers subscribe to this.

[01:32:26] All API servers subscribe to Redis Pub/Sub and the new server that, sorry, I should have used a phone. And the new server that would be there, it would push an event into this Redis Pub/Sub whenever it is done uploading. And now all servers can receive the updates. That makes things reactive instead of you polling it. So your update is happening once every week. Why would you poll 5,000 times before that? Unnecessary. Right? So we can make things reactive. But this seems too complex having another infrastructure component running and every API server is listening to this.

**[01:33:06] Teacher:** This. Can we be smart about it?

**[~01:33:06] Student 5:** So I had one more thought. So that was to basically, I was initially thinking that in the initial file we can upload in the header itself. We can have one key, like let's say whether it's a latest one or not, zero or one.

**[~01:33:25] Teacher:** And how would you know the latest one? You would never know it's the latest one or not. No.

**[~01:33:30] Student 5:** So when we file we can make the old files header to be latest equal to zero. But again, that required the API server to pull it and see that.

**[01:33:47] Teacher:** So we had polling with changes with reactive. Can we do better than this? Because this requires another infra component and persistent connections over here to tell them something changed. It, I'll pull in. Yes, Amrita.

**[01:34:02] Student 3 (Amrita):** So in the header, we were keeping a version. So maybe by indexing, we hold a reference to version and we see if the version is updated. We invalidate.

**[01:34:12] Teacher?:** But you're still polling for that.

**[01:34:15] Student 3:** Like not exactly while polling, but when we receive a request and we hit on the indexing and then we check with the backend when we receive a request.

**[01:34:26] Teacher:** But how would you know that something changed unless you poll it?

**[01:34:32] Student?:** Okay.

**[01:34:37] Teacher:** This is very interesting, right? This is, this is what I want all of you to think about. Like, can we make it simpler, even more simpler than this? Because polling is good. I'm not against polling. It's just that why to waste, but like why to make 5,000 requests when you can, when you, but someone can tell you or even someone can trigger something. That's a hit. Sidesh. [check: name spelling]

**[01:34:59] Student 2 (Sidesh):** Hey, Arpit. I would either expose a REST endpoint.

**[01:35:05] Teacher:** That's like this. You're making it [?reactive | asr: "reactor"]. Same thing. You expose a REST endpoint and this server calls that.

**[01:35:11] Student 2:** Yeah, basically because we'll have to do one server at a time, right? Like basically we are upgrading. So if we are upgrading, what we will do is, like let's choose a API server, ask it, either send an event to it, which you can anyways do. Like basically whenever you have a job, first let all the servers register with you, like basically all the API servers. So you have a close connectivity with them and send an event. Like you may have during upgrade, you may have to send them multiple events, tightly connect. Now you send the first event wherever you're doing with an API server. Now, once you send that, that server is going to, so I have two ideas. Let's go with a simple idea. First, you have to collect the index, give it the path and create, read that path, create the index.

**[01:36:03] Teacher:** You have meta JSON all now. Why would you want to create a path and tell it to the server?

**[01:36:08] Student 2:** Yeah, that's fine. Yeah. You have a meta JSON, just read the path. But the point is you'll have to first create indexes in memory. Okay.

**[01:36:16] Teacher:** So the API servers would need to load it. Yeah. That's a normal stage.

**[01:36:20] Student 2:** Yeah. Now you will create it. You will test the API server and everything is fine. And then you will basically tell your load balancer that this, like basically if you either give a new port to it so that that API server changes the port and the load balancer knows it. So basically... Complex, complex. [check: "complex" repeated 6x in ASR; may be the teacher interrupting]

**[01:36:42] Teacher:** You are trying to change port of the servers and this and that. This can be done in a very simple way. Very simple way. I'm see, I'm not against your approach. I'm not, I'm just trying to make it utter simple, like something that anyone would be able to understand. And because that's where the simplicity, like that's where the beauty of system design lies. Right. Okay.

### [01:37:06] Triggering a reload of the API servers

[01:37:06] Let me give a hint so that we can converge a little faster. The hint is that given that we now have a static file, meta.json, which contains the path of the dictionary that needs to be served, we want all of the servers to read this new meta.json file. But if you think about it, what happens when this API server boots up? When this API server boots up, it by default reads this meta.json file, sees the path, reads the dictionary, builds the index and starts serving it. So this is literally like a boot up of this API server, because that's exactly what it would do. So what you're doing is when you're updating this and updating this path, you have to trigger a reload of this API server. This is the hint. Can we do something about it? Rahul?

**[01:38:05] Student 4 (Rahul):** So basically what I was thinking was basically like we can upload to our same path. Posting.

**[01:38:11] Teacher:** No, you cannot upload to the same path. That's the wrong thing. [unclear: "That we conversion."]

**[01:38:16] Student 4:** Just a second. Just a second. Okay. We can upload to our same path and like there needs to be versioning enabled.

**[01:38:23] Teacher:** You are going into S3 specific, right?

**[01:38:26] Student 4:** That versioning enabled and whatnot. Any back, like anything that supports backup will support versioning.

**[01:38:34] Teacher:** Like that's exactly what we did with creating two files separate. Yeah. That's like, right. So I'm what I'm, I am saying this so that other don't get confused. That's fine. Right.

**[01:38:45] Student 4:** Yeah. Okay. Let's just say like there is a meta dot JSON. Okay. So whenever like there is a update, we can just update meta dot JSON. Okay. And not only the [?paths | asr: "parts"] we can also have, like a, we can also check meta dot JSON attributes, like a updated at,

**[01:39:04] Teacher:** That is still polling. That is still polling.

**[01:39:09] Student 4:** We are doing it on, like, any request that we are, like, that we are having. Okay.

**[01:39:15] Teacher:** But on every request made, making a meta call to meta JSON file, expensive. Why, why would you want to do that? That's still polling.

**[01:39:21] Student 4:** Okay. Let's just say, okay, not meta.json. We can talk about, like, that, our dictionary file, the dictionary file that we are having, which shall, which is having all the entries. Okay. We can check, like, anyway, we are reading that file and whenever any request is coming. Okay. Before that we can just check updated at or anything like that tag.

**[01:39:44] Teacher:** Like, no, you can't. That's what I said. That's what I said. Right. Because when you are reading that you would get garbage data, then you would make another read, reload the index and whatnot.

**[01:39:54] Student 4:** Right. No, like, not the garbage data I am talking about, like before, like reading the file itself, before reading a file itself we are just checking, like, we have, like, any, any file has, like, metadata, like updated at, created at and all of those things. Where is that stored? So, like, like those in informations are stored at the top of the file, I think, like?

**[~01:40:18] Teacher:** No, for the text file, for the text file, no, that are not stored there. That's hard, that's what... Okay, let me [?converge | asr: "convert"] this, this to go into crazy directions. So let me converge it. Let me converge faster. Otherwise, we would spend till 11.30 on this. Right. But it's good that you folks are thinking. Why are we making certain decisions? Now we understand. Right.

[01:40:44] The what you're talking about this, Rahul, on [?versioning | asr: "bursting"] and all. This is exactly that, where you're uploading it. Different files. Having a meta file. Meta file contains which one is the active one. Right. That's the latest version. Internally, S3 can abstract it out for us. Right. But I'm laying out in a very simple terms.

### [01:41:00] Reload via deployment - rolling deployment reads meta.json

[01:41:00] Okay, now if you look carefully, this is exactly what would you do when you reboot a server. Because when a server reboots, it would [?read | asr: "root"] the meta.json file, understand what path it is, go to this path, read the file, read the index, build this hash map and start serving the request. So what we are effectively trying to do is, when we are done uploading this file to this path, updating the meta.json file, we just want to trigger a server reload, which is equivalent to doing a deployment.

[01:41:32] [missing ~01:41:29-01:41:32] Do you don't need this. You just include your AWS SDK and trigger a deployment using a deployment pipeline [unclear: "and bot not"] it would do rolling upgrade. You just automatically, when you trigger a deployment, when you have a rolling deployment configured, it would take down one server, spin up another machine. When this new machine spins up, it would read the [unclear: "meta to the simple"] because that's what you have [?written | asr: "return"] when the server boots up and your API server boots up. That's what you are doing. You are reading this metadata file, now it would get the new path. It would read it and serve it.

[01:42:08] The problem is with inconsistency, but you are still not serving garbage. You would have a time, while this deployment is happening, that sometimes the request goes to one server that has already built index on that old data, while other server, that is new server, that is the new data, but meanings does not drastically change. You are at least not serving garbage data. You are serving eventually consistent data, but that's fine because meanings anyway does not change drastically. So you avoid serving garbage data because you are reading from another file now and you are just triggering a rolling deployment. Any deployment strategy is fine. You are just triggering your deployment using the cloud provider that you are using and it would seamlessly take its effect.

[01:42:53] This is how you don't need anything. When you see just one deployment invocation call, whatever cloud provider you are using, Jenkins job, whatever you are doing, just you got a simple deployment. Because when any API server boot up, it would read the metadata JSON file. In the metadata JSON file, now the path is the new path. Load the file and serve it. Simple. Right? So instead of exposing API endpoints, reactive, Redis Pub/Sub, all of that, throw it out of the window. Trigger a simple deployment and a job is done. Right?

[01:43:24] That's exactly what I have written in this part. This entire thing that I've done, this thing is exactly that. I've just been a little more elaborative on what we just covered. This is exactly that. Changelog, how it would happen, merge that we just discussed, uploading it to the same path, transition, reactive Pub/Sub, parallel setup. This is what we are doing as parallel setup. Portability by adding header and this is what would happen behind this. That's exactly what I have covered. We went very in depth when you are brainstorming it.

## [01:43:59] Pointed reads on S3, multi-tiered storage

[01:43:59] But now why did we discuss it? Let's first understand that. What we just see with this is we are now able to seamlessly fire your GET request on S3. Not PUT request, GET request on S3. Pointed reads, reading the bare minimum amount of data that you have to. This has huge applications.

[01:44:24] [missing ~01:44:22-01:44:24] Storage because of this. So let's say you have gigantic amount of data in your database on which, let's say, historical data is not even queried. I'll give an example, Amazon orders. Amazon orders, how likely are you to access orders that you made six months back? Highly unlikely, right? Highly unlikely you would do that. So what if you take the six months old order and push them to S3? But this does not mean user would never do that. User can still go back in time and check, what was the order that I made. So if your order is [?recent | asr: "reset"], you go to your hot database, let's say MySQL. And if it is your old order, you go to S3 and read it.

[01:45:03] But how do you know? On S3, you cannot just dump everything in a JSON file. You need an ability to make pointed queries on S3. This is how you are doing it. This gives you an ability to fire pointed queries on S3. Because now literally, order ID, you're getting order details from S3. Dead simple. And this is the beauty. This one system that we just discussed as example, as simple as word dictionary on S3, it solves a ton of problems. It helps us, it lays the foundation for multi-tiered storages, because we are not losing an ability to query the data that we dump on S3.

[01:45:43] In most places, you think that, hey, when I dump on S3, it's archival. Here, it's a cheap storage for us. We reduce the cost of our main database by keeping the data that is very infrequently accessed on S3. By trading off the time, because in hot database you can get it very fast. But on S3 you would get it relatively, relatively very slow. But that's okay because that's very infrequently accessed data. But because you move data out of your hot database into your cold storage, you are reducing the cost of your hot database, which is significant save. Significant.

[01:46:21] [missing ~01:46:19-01:46:21] Lays the foundation for that.

### [01:46:23] Athena, data lakes, Apache Hudi, Hive partitions

[01:46:23] Another example, Athena. Athena does exactly this. On Athena, you can load a CSV file and fire queries on this. This is exactly what Athena is doing behind the scenes. It is creating an index, keeping it handy, along with that file. When you fire the request, it goes to that file, reads the records and serves it back. Athena internally does exactly this. So having an ability. So what we just built is we built an ability to query data. Simple key-value format. More complex, but to start with, let's start simple, to fire a simple get key request on S3 without, without having to read this entire file. We just built it. It has a ton of applications around it.

[01:47:04] Right? AWS S3, Athena, entire data lake. If you have heard of data lake, data engineering folks would definitely know it, but data lakes are where you're storing huge amount of data in a very cheap storage, but having an ability to query it. Apache Hudi does exactly this behind the scenes. The format that Hudi table format is exactly this index that we are storing. Hive partitions, exactly this. This is the foundation for having an ability to query huge amount of data on a very cheap storage.

[01:47:38] And this is what I wanted to cover. It comes to building a word dictionary on S3, considering from deciding to development to deployment, seamless transitions and everything, and keeping things really simple rather than over complicated. Right? Okay, any questions on this? I'll take questions till 55 and then we go on a break till 11.

### [01:47:56] Questions on redeployment after the meta.json update

> **Student Question [~01:47:56] - Student 1:** Yeah, maybe few things I'm not able to make sense. I'm just asking what we are trying to say at the time of when we created the merged file, which is the current file plus the change. Now we have a new file. Now once we create the new file, this new file has to go and create a new path in S3 and that has to be known to the API servers. That's what we are trying to achieve. Now, if we are sending, so let's say, but I understood the solution is we send a request to S3 that, okay, this is the new file and we go and update in a new path, which is being mentioned in the meta file.

**[01:48:49] Teacher:** Meta.json file. Meta.json.

**[01:48:51] Student 1:** And on that call itself, we are sending API servers to go and do the redeployment. Correct?

**[01:48:58] Teacher (answer):** No, no, no. Once that file is... Correct, correct, correct. So in that new server, when this meta.json file is updated, we are just triggering a deployment of our API servers.

**[01:49:07] Student 1:** Okay. So we are making sure first the meta.json is updated.

**[01:49:13] Teacher?:** Yes.

**[01:49:13] Student 1:** So in the deployment of my... in the changelog process, I'm making sure file is created, then meta is updated, then only I'm sending this thing to the deployment server. Yes. Yes. Okay. [check: "Yes. Yes." may be the teacher confirming]

> **Student Question [01:49:29] - Student 1:** Just I'm thinking about, can we do a bit better in place of creating a new VM whole deployment. It's a redeployment and it is just like a process that was reloaded at the startup. Yeah. Can we create something which is invoked? The whole thing is like going, [?reading | asr: "heading"] from meta, creating the index and start serving of the hash table from server. This is the whole thing in place of doing the whole redeployment [unclear: "can be a wide of"].

> [01:50:07] creating a new VM, doing the whole redeployment. Is there a better way we can do it?

**[01:50:12] Teacher:** I, maybe I am like, no, there are, there are, I can imagine three ways to do it, but it's just, just make things little more complicated. For example, I'll give an example.

**[01:50:20] Student?:** Sure.

**[01:50:21] Teacher:** What you can do is instead of doing redeployment of it, have like what I think Sitesh [check: name spelling] mentioned that just have API endpoints that would trigger reload of the API servers or trigger API servers, make it reactive instead of doing redeployment. Seems big enough, just have [unclear: "API inputs experts"] that you invoke, which tells them to now go and pick the new file from S3. That's right. That is one way to do it. But I'm just making things simple because this is an out of the box approach. Thinking of triggering a deployment as part of an [?API server | asr: "all server"] reload is an out of the box approach, which a lot of engineers just don't think about. So it's just that I'm proving you all to think in that direction that can we come up with something as simple [unclear: "I just triggered a problem"] because it's anyway, the cost remains exactly the same, but not having to have pull the metadata and file or do reactive or have reactive Pub/Sub again. Now those sorts of complexities you can totally avoid. Right. And just that I chose this to prove you in the direction that we can, we control our own infrastructure so we can do something with it if we want. That's it. That's the only thing. Okay.

[01:51:32] But, but it can be done in a hundred percent. I'll tell you one more thing. Why should API servers read index from S3? What if in the updates that we are sending to API servers, what if we send the actual index data? It's just 1.7 MB, right? No need to reload, the problem solved. You can change a lot of stuff. It's just that I pick one so that I can make a point on utilizing our infrastructure calls to get something done.

**[01:52:01] Student 1:** Okay. Got it. Thank you. Now I'm clear.

**[01:52:03] Teacher:** Yeah. Okay.

## [01:52:05] Break *(admin)*

[01:52:05] *(admin)* Let's folks, we'll go on a break. Break till 11. It's 10 52 already. We'll take a break till 11 and then we come back, we'll discuss super fast DB. Again very similar to what we discussed on word dictionary, but we'll build a super fast DB, a very practical example, everyone uses it unknowingly, and we'll make order one reads, order one writes, order one deletes with persistence. Right? And this is where we'll go a little more deeper into what the file format should be, because right now we just work with simple CSVs, but that's not how this is actually stored. Right? We'll go deeper into it and build another database which is lightning fast database that gets the max performance out of your hard disk, and that's the highlight of it, and we all are using it unknowingly. Right? So we'll talk about it in depth when we come back from the break. We'll resume at 11 of now, right, seven minutes from them. Right? Thanks folks, see you folks at 11.

[break ~01:53:04-01:59:52]

## [01:59:52] Super fast key-value store on magnetic disk

**[01:59:52] Teacher:** Okay, let's start with the second half, for second, second part for today is we'll now talk about building a super fast key-value store on top of very commodity hardware, cheap magnetic hard disk. Right? We want best of everything: read, write, [?update | asr: "upgrade"], delete, persistence, everything we want.

### [02:00:12] How magnetic disk works

[02:00:12] So first, before we start our brainstorming, what we, what I would want to talk about is how magnetic disk works. So first of all, if you were to use, we are all, we all are so used to using SSDs, fast and all, but they are very costly. So if I were to put cache, like your CPU cache, your L1 cache, your SSDs, your magnetic disk storage, your tape storage, right? So if this is your memory, this is your magnetic disk storage, this is where your SSD lies. So SSDs are more closer to memory as compared to hard disk with respect to speed and with respect to cost. So getting an SSD is very costly as compared to getting a magnetic disk storage.

[02:01:08] So which is where you are storing huge amount of data. You don't store it on SSDs. You store it on magnetic disk storage. Now magnetic disk storage, what are they? It's that classic disk based storage where you have a head, head rotates like this in this motion while your disk spins. So when you issue a read of something, like read of a particular byte offset, that thing gets translated to a particular disk, on that particular disk, a particular sector, in that particular sector, a possible offset.

[02:01:50] Right? So you say on this file at this byte this exists, it then translates into on this disk, in this sector, at this offset it lies in. Right? So this is how it works. So now when your disk is moving and you are issuing a read command, let's say read from this, from this sector, from this, right, from this particular thing, what happens is your magnetic head movement, so this moves to that location, magnetic head comes to that point, read that particular part and sends it to the device driver, and then it goes to the user space and you consume it. So there is this actual physical movement which is happening for you to read this part over there. Right? So the head needs to be moved, the disk needs to rotate, you read that, then some other read comes in, so it moves. Mechanical movement that happens on the disk is the most time-consuming process. Right?

### [02:02:52] Put, get, delete on an append-only file

[02:02:52] So this is how magnetic disk works. Now we are building a super fast key-value store that works on these cheap magnetic disk storage. Right? So now how would you build it? Right? Let's start with, and given what we want to do is we want to support operations like put, get, delete. That's it. Right. But the key thing is we don't want to miss out on persistence. So we have to persist everything. So how would a put look like? Hemant.

**[02:03:28] Student 1 (Hemant):** Okay. I mean, whatever the requirement you have given, it looks like fitting in the way that structure of a memtable or SSTable works, you have something in memory as a sorted map.

**[02:03:47] Teacher:** No, no, immediately. I want to persist immediately. When I say put it, it is to immediately flush to the disk.

**[02:03:54] Student 1:** Oh, okay. Then if you have to immediately flush it. Okay. So let me understand. Maybe we are saying that as soon as the request comes, we will be able to persist it on the disk. Persist it at the disk for each put call. Yeah. Okay. I mean, then the best thing is like you create a ledger, where you start adding each and every, but it has its own challenge in terms of when you have to delete.

**[02:04:43] Teacher:** Wait, wait, let's stop. Let's stop. Step by step. You're saying write-ahead. What is write-ahead?

**[02:04:48] Student 1:** Like you have a file which has like each and every change that you are doing, you are like inserting as like appending in the, in place of going to figure it out where it has to go, adding at the end so that the [unclear: "magnet is discard best"] for that. I'm thinking why [unclear: "magnet is discard best"] for append only thing? Because you are, you, you, so when, when, when you know on this sector where your head was last, okay, you have to add more blocks on top of it. So you have not to look for your cylinder. I mean, your heads to go and seek it. A seek time, neither you need that your cylinder has to spin and reach to the right sector. So both the movement of like moving your all is gone. I'm at the right exact point where I have to add more blocks. That's the best I can do to get the benefit out of the characteristic of the disk.

**[02:06:01] Teacher:** Perfect.

**[02:06:03] Student 1:** So, so, so that is, and now what I'm worried about is the cons of it. When I have to delete it.

**[02:06:12] Teacher:** No, no. I mean, first let's convert on put [check: "convert on put" - converge/cover?], what happens when you put something to this? So let's say this is that append only file. So this is the file that you opened up. Right now let's say I got a request. It says put K1 V1. What will happen? What, what, what will you do?

**[02:06:30] Student 1:** So put K1 V1, K1 is a key, which is I need to add it. So I will add that key and corresponding value. I will add. So that much data is written in the disk and I need to have K1 and wherever the K1 is started, that sector address in somewhere in my memory table or somewhere else.

**[02:06:59] Teacher:** So then we'll basically come to that. We'll come to that. Let's first get the max performance out of it. When we hit get, right? First, let's focus on put, right? Are we doing the best when we are putting? Then we come to get and then we come to delete, right? So you'll cover the entire thing around put. Then I'll move to the next one. Then we'll cover get. Then we'll cover delete and then we'll cover get. Okay.

[02:07:19] So to cover the put part, you said that every time I'm issuing or I'm getting a put operation. Yes. I will just create new entries into this file. K2 V2 and then K3 V3. And then let's say if I get another request, let's say now one changes. Someone issued a put on K1 with V1 dash.

**[02:07:40] Student 1:** Now, I'm coming to that. So that's the next thing where we have to think about, because we cannot go and figure it out where K1 was and change the value. So we will append it. We will continue append it only. We need to figure out another process which [unclear: "goals and market is"] like obsolete data or [?marked | asr: "market"] for deletion or something like what they say, a [?tombstone | asr: "stone"] process or whatever [?tombstone | asr: "to stone"] process. We have to do it. But idea is always any put comes, you go and add no matter what.

**[02:08:24] Teacher:** No matter what. That's the best way. Perfect. So this is how you get the max performance out of put operation on a cheap magnetic disk storage. So put operation is [?sorted | asr: "started"].

### [02:08:37] Delete in an append-only file

[02:08:37] You had your hands raised. I was going to pull you in. But let me go to Pankaj. Pankaj, how will you do deletes? Let's say I got a delete request and I want to delete a particular key. How will you delete? Let's say I say delete K2. What will you do now?

**[02:08:54] Student 5 (Pankaj):** Yeah. So, I mean, what I was thinking is somewhere from our previous discussion, again, that we can go to this key and set the value to be something which will never occur. Like if all the values are always positive, we can set it to minus one.

**[02:09:10] Teacher:** So you are going back to that key. You're going over here and then deleting this and basically setting this to 0000 some special value.

**[02:09:19] Student?:** Yeah.

**[02:09:20] Teacher:** But this is append only file. You cannot write to any other location. Because it's append only file. You cannot go back and do something. Like you can only read from the previous stuff, but you cannot write to a previous stuff. That's what append only file does. So you're not allowed to go back and write anything over here.

**[02:09:44] Student 5:** So okay, I mean, in that case we will have to maintain some version sort of thing saying that K2 has been deleted now, so what can you do?

**[02:10:02] Teacher:** So which means now, now let's think from the first principles, we know how put works for us to delete. It's an append only file, but we have to write something that tells that K2 is deleted. So all we can do is append.

**[02:10:16] Student 5:** Yes. Correct. So I mean, we can append something like K2 with minus one that, that shows it's been deleted.

**[02:10:26] Teacher:** So effectively your delete operation is equal to put operation with some special value. Correct? Yes. Because put was order one like bare minimum, delete also becomes super efficient. Yes. Correct? So this is sorted. So we get the max out of our put, we get the best out of our delete. These two are sorted. Right? Okay.

### [02:10:52] Get - in-memory hash table of key to offset

[02:10:52] Now comes the next part. How would you [?perform | asr: "power"] get now that in this file structure that we have, we have multiple entries of the same key. Now for us to perform get, what is the naive way of doing it?

**[02:11:08] Student 3:** Just start looking at all the entries and return the latest one.

**[02:11:12] Teacher:** Return the latest one that seems very poor, but you want the best performance out of get as well. So what will you do when your reads are slow? You make. Okay, so let's do that. So how will you make it faster then? How will it get work?

**[02:11:38] Student 3:** Yeah, so my mind like overall is still going towards what Hemant had mentioned earlier, like around having an SSTable sort of structure here.

**[02:11:47] Teacher:** Simple hash table, right? SSTable is very different, hash table is very different, right?

**[02:11:51] Student 3:** Yeah, so for a hash table, like we can, like once we have put something into a write-ahead log, we maintain a hash table on the, like as soon as it's appended to the WAL, we update the hash table as well, so the offset of it, correct, not the actual value. Yeah. And whenever a read comes, we simply go to the offset in the WAL. And return that value.

**[02:12:18] Teacher:** Read it because in append only file you're allowed to do random reads, but you're not allowed to do random writes.

**[02:12:23] Student 3:** Yeah.

**[02:12:23] Teacher:** Okay. So just to cover it end to end, what would happen is let's say I got put K1 V1. I first write it to the disk over here and note with the offset, and then I update my in-memory hash table such that K1 points at O1. Then I received K2 V2. I update my in-memory with K2 O2 over here and let's say K3 goes to O3 over here and then let's say I got put K1 V1 dash. Now what will I do? I'll first write K1 V1 dash over here, then go to my hash table and I update it [?O4 | asr: "k4"] over here. So it goes over here and [unclear: "the first metric removes"] over here.

[02:13:03] Now let's say K2 is deleted. Now how, what, what deletes would look like? If I delete K2, I'll not point it over here. I just remove the entry from my memory hash table. If the entry does not exist, it does not exist. Yeah. Now it's really simple. Now what if given that we have the structure first, let's look at how get works, if you'd want to converge or if you just want to consult on how gets. What would be the flow? You get the request then.

**[02:13:35] Student 3:** So you get the request. You look it up in the in-memory hash table. If the entry is not there, you simply return 404 or something. If it is present, you go to the WAL and you go to the offset and read that value.

**[02:13:51] Teacher:** Perfect. Right? Okay.

### [02:13:52] Rebuilding the index after a crash

[02:13:52] Now what if your machine died and because this is in-memory, it is gone. Now what?

**[02:13:58] Student 3:** So you'll probably have to rebuild the indexes when you restart the server, [unclear: "video"] for a very long time.

**[02:14:04] Teacher:** That's fine. When you restart, you just go through this entire file and rebuild this index. Yeah. Straight forward. So get order one, you are doing the bare minimum in get, you are doing bare minimum in put. You are doing bare minimum in delete.

**[02:14:19] Student 3:** Yeah.

**[02:14:20] Teacher:** So it's the max that we could get out of this on a cheap magnetic disk storage. Right. So we just did read, write, update, read, write, update, delete, everything with full persistence. Right.

## [02:14:35] What could go wrong - multiple files, merge and compaction

[02:14:35] But what else? What could go wrong over here, Siddesh [check: name spelling]? We have this one [?file | asr: "pile"]. We're putting these entries. What could go wrong?

**[02:14:50] Student 2 (Siddesh):** [check: name spelling] I mean, availability is less because when you come back again, it takes a lot of time.

**[02:14:56] Teacher:** That's fine. We're still okay with that. There are ways to make it better, but at least we have a naive approach to get started with.

**[~02:15:01] Student 2:** Another assumption is we can hold on to all the indexes in memory.

**[02:15:08] Teacher:** That's an assumption that because you now you are limited by the amount of data you can fit in RAM. Amount of index fit in RAM. It's not the values, but the keys. So you can add only as many keys as many you can keep in memory. Correct? So that's a limitation. Okay. But what else can go wrong?

**[02:15:37] Student 2:** Another one is we are just appending to a file. So there is no disk garbage that we are collecting. We'll have to also figure that out. Like eventually our system will go out of space because we are not collecting anything from the disk.

### [02:15:51] Multiple files and file rotation

**[02:15:51] Teacher:** Correct. So file grows out to be huge. What could go wrong when file grows to be huge? How do you solve it?

**[02:15:57] Student 2:** Yeah. So basically our disk space will be out. So how do I solve it is basically what do I do is, idea is don't just have one file on the disk. So we'll have to create multiple files and indexes we can maintain to multiple files. Now, whenever you change a file, you'll have to start a process to, like we did last time, to scrub, like consider a file, a partition that we are not actively appending to, but we are just still reading. You start reading from that file and create a new file out of that partition to remove the deleted keys and just write the keys which still are required in the system.

**[02:16:45] Teacher:** Got it. So at any point in time, write will only go to one file. Yes. Other file becomes immutable. Okay. But when will you make the switch? When will you make, hey, now I'm done writing to this file. Now start writing to this file.

**[02:16:57] Teacher?:** How will you do it?

**[02:16:58] Student 2:** Now this depends. Yeah. Now this depends on the disk space because how many files we want to keep in the disk, right? At max at any given time I think we would need a space of three files, one that we are writing to, one that we are reading from and one that we are going to create.

**[~02:17:14] Teacher:** No, reading and writing are from the same file, right?

**[02:17:18] Student 2:** No, like anytime reading and writing won't go to the same file because

**[02:17:23] Teacher:** whichever file my key is, right, it will go to that file.

**[02:17:30] Student 2:** Yeah, but what you have to do is the file that you are reading, a lot of offsets, right? Like which are deleted. I won't like, if our disks are serially better performant, I would just read one file, right? To create a completely new file out of it by just picking up the keys that are still available. That's unnecessary. That's unnecessary, right?

**[02:17:53] Teacher:** Just, just maintaining it for that one read, then you can just club it in a different process that - that we'll talk about, but first let's decide what's the criteria of making the switch to a new file. What's the criteria?

**[02:18:07] Student 2:** In disk space, it will be either divided by two or three based on the approach that we have.

**[02:18:11] Teacher:** So if your disk space is let's say a hundred terabytes, you'll have files worth of 10 terabytes each, 10 files.

**[02:18:20] Student 2:** In this naive approach. Yes.

**[02:18:22] Teacher?:** Now there are more problems to this. What's the problem with that?

**[02:18:25] Student 2:** The problems are basically the way you are scanning indexes one, if you're just scanning a single file, you can't concurrently build indexes in memory. So that's one problem. So that's an motivation to create more partitions. Number two is also the garbage collection that you are doing. Right. So if in smaller partitions, you can be more consistent, like just scrubbing

**[~02:18:45] Teacher:** The biggest one of all, biggest one of all, file system limitation. It is very much possible that your file system does not support more than one terabyte file.

**[02:18:54] Student?:** Yeah.

**[02:18:54] Teacher:** Quite possible. Right. Yeah. Also consider that. Right. BTRFS has its limitation, NTFS has its limitation, right? Plus waiting for that huge file to pile up, then writing to the next one versus keep smaller files. Let's say 100 MB files or let's say 1 GB files. As soon as that threshold checks off, you move forward, right? You start writing to the new file.

[02:19:20] So the idea being that let's say this is file 001, then it is file 002, then it is file 003, is 004 and you keep on writing. Now at any given point in time only one file will be active. So let's say this is the active file. So at any given point in time one file will be active where all the writes are going. Everything else becomes read only. Right. So you are still allowed to read this. Now given this, in the in-memory structure that we had we were just storing offset. Want to store that this key is present in this file. In this offset. So now when the read comes in, get comes in, we get the key, we find and this file and this offset is there. You go to that, read the content and send it back. And every time your file crosses that limit, you create a new file and start writing. Start writing. Start writing. So this is typically called as file rotation.

### [02:20:27] Merge and compaction

[02:20:27] Once you are done with that, it's very evident that out of all of this file, there are a lot of stale entries, a lot of deleted entries. So this K1 got overwritten over here. So this is stale. Why do you want to waste that much of space? This K2 was deleted over here. So we can anyway delete it. So what do you want to do is when you have multiple of these files, read only files, active and let it continue to support it. You would run a process called merge and compaction. Where what will you do is you will take these parts, take these files, iterate through them, remove or [unclear: "torque"] and basically create a new file.

[02:21:10] So it would be like you have these three files. Using these three files you create a fourth file which is a combination of these three in which you are not copying the stale entries, you are not copying the [?deleted | asr: "related"] entries and once this file is written, you delete these three files forever. And then these two becomes your active file. Like this becomes an active file. This is where the read comes in. But when you do this, you have to also update your in-memory index because now the offsets would have changed. Right? Earlier you would have used stored that this is present or rather this key is present in this file, this offset. Now when these three files get merged into this fourth file, what you have to do is you also have to update this in-memory index for the entries that are just moved to this new file.

[02:21:57] This is a classic way to do merge and compaction. You can very clearly see how you can do merge and compaction. Just iterate through this file, keep keeping track of data that you are having. Okay. This is the key that I saw. All this gets replaced periodically, flush it to the disk. Basically do the simple merge and compaction where you are merging all this file into one.

### [02:22:18] Sawtooth pattern of disk utilization

[02:22:18] So if you look carefully at your disk utilization, this is how it would look like. Periodically, or rather your file, your disk usage will go high, high, high. When merge and compaction kicks in, it would suddenly drop. And then it would grow high, high, high, and then it would suddenly drop. It would grow and then suddenly drop. So this pattern that you are seeing, when the writes are coming in, your disk would grow, like the disk utilization would grow. More data you are adding. When your merge and compaction runs, your rate would suddenly decline. Then it would grow back again. Then the next runs, then the next runs, and then the next runs. You'll see this sawtooth pattern in your disk consumption.

[02:23:04] Now why I'm talking about this? Because this would help you configure what needs to be there, like what should be the flush frequency or rather merge and compaction frequency, because if this is your disk utilization, this shows this line, this line would tell you this is your max, this line would tell you the maximum capacity of disk. So if your disk is let's say one terabyte big, you cannot let this grow beyond one terabyte, right? So this pattern, like how you would want this sawtooth, would determine how your performance, your this database would be, right? Then how frequently you would want to dump. If you, let's say, dump too frequently, it would have too much of garbage collection happening, too much of things that you're worrying about, running too frequently, your CPU not getting CPU to do actual work, right? If you do it less frequently, then lot of work gets accumulated. So your flush frequency that you are having should be smooth enough for you to not drop down on your performance.

[02:24:08] These two factors you would be considering in order to configure. You only have two configurable parameters over here. First is merge and compaction frequency. And second is disk rotation threshold. Oh sorry, file rotation threshold. Like how big you want your file to be. How big you want your file to be and how frequently you would want to merge it. Configurable parameters and how do you configure it? Looking at the [?sawtooth | asr: "sort of"] pattern that you are seeing. So configure this when you are writing, when you are building this part, have these things in check, monitor them and then take a call that, hey, what should be this frequency? And this, when you are designing this database, you provide this as a configurable parameters to your folks, right? To whoever you are shipping.

[02:24:56] But this is how you get the best read, write, update, delete, along with best or most efficient disk utilization, not wasting memory, having this merge and compaction. This is a pretty standard approach and this is the best we can do on disk, on a cheap magnetic disk storage, right? On SSD you will still get benefits but not as significant because SSDs don't go with disk based approach to, or rather the circular disk approach to write it. They have their flash memories and whatnot, it does very optimally there. But on a cheap magnetic disk storage this gives you wonderful experience, [?almost | asr: "most"] as fast as SSDs. So the cheap storage, you get the max performance out of the system.

## [02:25:42] Record format

[02:25:42] But it's still not done. I want to go into a bit more granularity onto how exactly. Because here we just casually said I'll write key value over here. No, no. It's much more than that. Let me go into details of it.

**[02:26:00] Teacher:** Like, how will you actually represent, and how should you actually represent a disk-based structure, right? That this is my key, this is my value, how do you define that? Even in dictionary problem we just wrote word comma meaning, and I'll read file line by line. But that's not how files are read. Files are read by blocks. So how do you actually define a format, a record format? This is how all database work, right? Any database, MySQL, Postgres, MongoDB, Redis, [unclear: "fedis"], pick any database, whenever they're serializing things to disk, they have their own format in which they write it, so that it becomes very efficient to read. We'll walk you through that, right?

[02:26:38] So how one entry in the file looks like. We always say that in this file the entry is looking like a key-value pair, will store key, will store value, right? That's what we are thinking. I'll just store key here and value over here. But now imagine, when you are doing this, you cannot just read until new line, because every time you are doing a disk IO, let's say you read one byte at a time until you hit a slash n. How many disk IOs are you making? That would make things so slow for you. You should exactly know, if I'm at this offset, how many bytes do I have to read to complete my entire key value, right? Which is what you do. You don't just say I'll read until new line. That is literally 11 standard kids would write code like that, right? Read until new line. No, you have to read the exact number of bytes you are supposed to, so that you get that entire data in one shot.

[02:27:38] So that's what you do. You, instead of just write key and value, you'll write key size and value size as well. So first you write key size, which tells you how many bytes is key. Then you write value size, which tells how many bytes is value. When you read it, you read these 8 bytes over here. These 8 bytes, 4 byte integer. These 8 bytes, you interpret the first 4 bytes as key size, interpret second 4 bytes as value size. Then you read these many bytes in total, you get key and value both. Bytes that becomes key and these very bytes becomes value. It gives you the much read predictability, so that in one disk I.O. you ask, in first disk I.O. you get this part, the metadata kind of header that we discussed in the previous [?problem | asr: "product"] kind of header. You read this eight bytes, interpret first four bytes as this, second four bytes as value size, then you sum it up and you read one more disk I.O. to read this entire thing together. And then you process this as key and this as value. Right. Because from this you would know exactly how much key takes and how much value. Right.

[02:28:57] So this is what you would store on the disk. This is similar what you will do in even in word dictionary also. Word size, meaning size. Right. Same thing. We just wrote it in CSV because it's easy, but now we go into details of it. So now you can update that system design with respect to this approach. That this is how every entry in your file would look like. Very predictable. Right. Okay.

### [02:29:21] CRC in the record

[02:29:21] A lot of people just stop here. But always remember, your database needs to be fault tolerant. What if you are writing a gigantic value and while writing the value, the machine crashed? You're just writing 110 and then machine crashed. Now, how will you know? You cannot fix it. Your write has failed. Your data is corrupt. How will you know that an entry that you return is corrupt? That's what you have to know. Entry that you, because first you have to know that it is corrupt. Then you fix it. There is no way to fix it because the data is gone, but you cannot just serve it, because after this point, let's say you wrote this entry and then let's say another entry is written. If you read value size number of bytes over here, it would penetrate into other entry that you have. And that's very bad. You need to know that whatever you wrote has lost its integrity.

[02:30:15] The only way to do it is you put CRCs, you put checksums, cyclic redundancy checks. And that will be the first thing that you would write to the disk. Now what are CRCs? Simple hash of all the values, key size, value size, key value, everything. You would have key and value in memory. You create this record format in memory, compute the hash of it and store that checksum or hash or whatever you'd want to use as the first thing over here. Similar to how in distributed ID generators, you saw timestamp on the leftmost side of it. In any good format of the world, in good record format of the world, that is persistence, you would always say CRC as the leftmost side. Postgres commit log file, CRC on the leftmost side. MySQL bin log, CRC on the leftmost side. Why? You are first, first thing that you write, that you ensure that is at least flushed, is CRC, because that is the bare minimum thing you need to know that something is corrupted. You cannot write CRC in the end. You write CRC in the beginning. Pick any network format, you'd always say CRC at the first, because that's the first byte or the first set of bytes that you should receive, because that is what would tell you that the data that you're receiving is not corrupted by any means.

[02:31:36] So this is what your final structure would look like. CRC, time stamp just for conflicts, key size, value size, key and value. First this guy, you will write this much, then in one disk you write key and then another disk you write a gigantic value that you have. So in case the first disk write itself fails, this entry itself is not there, problem solved. But if, let's say, this succeeds and while writing key it failed, when you read the data you check the CRC and you see the CRC doesn't [?match | asr: "matter"] because there is some corruption over here. So you tell the user that the entry is corrupted. Right? You are not serving corrupted data to your users ever. And then you can have your own recovery mechanism to recover from it. That's heuristics mostly. You ignore that entry in merge and compaction and whatnot. You assume that the write never came your way, because corrupted data, you cannot recover from it anyway.

[02:32:32] This is what I want all of you to think about whenever you're testing. CSV. Is that the best way to do it? And have a [?record format | asr: "record for better"]. This is where you need to think, let's say, saying that I read only until new, like until new line, not good. Key size, value size, key value, all of this with CRCs, integrity checks, durability, fault tolerance. Very important when we're designing a [unclear: "storage check"]. Okay.

### [02:32:54] Get path and file rotation

[02:32:54] For the get, this is what we discussed. Key value, you store it in your in-memory hash table, which points to the corresponding entries in the file. Given that we are having append-only file, all the operations are key-value pairs in this format, are getting appended one after another. Now what would happen because of this? Our one file will grow out to be very big. That's why we have to do file rotation, which means whenever a file reaches a certain threshold, we start writing it to the new file, then a new file, then a new file, then a new point in time only one file would be active, everything else would be just available for reads. This means that in the in-memory hash table, what we were storing, we were storing just key and offset. Now we need to store that this key is present in this file, the entire record size is this, add this offset, and timestamp for conflicts and meta information, right? This way your entries can point to any file, but the writes will always happen to the most, to the active file that you have. This is how your in-memory index would look like. Okay.

[02:34:06] Now we have a lot of files. Can we optimize? Given that we have a lot of files having a lot of stale and deleted entries. Let's merge and compact. So what we write? We write very simple merge and compact. We [?iterate | asr: "add it"] through all the files. They are not sorted. It's not similar to merge of merge sort, because here the order can be anything. It's not sorted. So to load it in a temporary structure. Merge them, replace the entries that you are seeing, like the further presence of those entries, you are replacing it in a hash table and then flushing it to the disk. Simple. Try writing a code. It's not really that difficult. So read entries from this file, open it in a hash table and then flush it periodically to the disk by not writing the stale entries or the deleted entries there.

[02:34:55] Right. But now you would see this sort of pattern emerging, and this pattern would help you determine the maximum disk size or the maximum size of a file and the flush frequency that you need, so that it stays within the limit. This is the max size of the disk that you have, this is what you would get. Doing very frequent merges, also, we're doing very frequent mergers and compaction, not a good option. Very infrequent, you would breach past this, right? So keep it to a bare, to keep it at optimal state where no matter what, this never breaches, right? This should never cross the cap of it. As soon as it crosses the cap of it, your system would crash, right? Okay.

### [02:35:31] Limitations and strengths

[~02:35:31] Now the limitation of this. Whatever we designed sounds very fancy, [unclear: "he gave me"] order one put, order one delete, everything [?order one | asr: "order by"]. But what is the limitation? The limitation of the system is all the keys must fit in memory, because in the in-memory structure that we have, we are storing keys and basic information. So it is bounded by the number of keys I can fit in. Values are flushed on the disk, but keys are there in memory. So on disk there are keys and values as well, but in memory you have keys and offset. So the size of the index, how big the number of keys that you can fit in memory determines how big your, how many keys you can store in this particular database, right? But the strengths of this DB is it gives me order one reads, writes and reads.

[02:36:23] When I say order one, it's a bare minimum that your disk has to do when it is there to write, when you request it to write something. You get very high write throughput. You get very low latency, write very low latency. You are doing the bare minimum disk IO. Reads, one memory lookup, one random read, get a data, send it back and move it back to continue writing. Bare minimum that you are doing that. So bare minimum to write, bare minimum to read. You get very high write throughput. You actually get IO saturation. Your physical device IO will be saturated, and that's a good thing, because in most cases it's not that you are waiting for IO to happen. You're doing the bare minimum to read and write and whatnot. So you saturate your network call, your saturated network, you saturate your disk IO. You're getting the max out of an underlying hardware. And a very simple thing, backups are easy. Control C, control V, these files and you have backup. It's normal file that you are just storing there, right? You can literally do that.

## [02:37:28] Bitcask

[02:37:28] The database that we just designed is called Bitcask. It's an embedded database. In previous I shared the video embedded, what embedded databases are. This is embedded database, where it is not a central server that is doing it. Bitcask is not like a MySQL server that was spinning up and everyone connects to that. Bitcask is an embedded database, which is kind of a library, right? Like SQLite is an embedded database. Bitcask is an embedded database [unclear: "S-FM"]. So Bitcask is used by Uber in production for their main ride-hailing service. For their main service, they use Bitcask. But because Bitcask is embedded database, it does not have a separate server server.

[02:38:11] So what Uber does is, Uber uses Riak as their main database. Riak is a simple key-value store and Riak uses Bitcask as a back-end. So like how Elasticsearch is an HTTP wrapper over Lucene, similarly, Riak is a wrapper over Bitcask. So Riak's responsibility is to make Bitcask distributed. You'd still have, like, this is mutually exclusive set of data. But Riak gives you this additional thing. Master, slave, architecture, distributedness, consensus, whatnot. It gives you all these features to connect. So it gives you proxy to seamlessly connect and route the request, [unclear: "hash paste"], consistent hashing, data movement, whatnot. That is responsibility of Riak. But in the backend, what it uses, it uses Bitcask to get the maximum out of when you are storing and retrieving the data from the disk. That's the best you can do over there. This is what Uber uses in production. If you look carefully, the Bitcask, the way we design, the append-only file that we see is the magic behind getting the max out of cheap commodity hardware.

**[02:39:26] Teacher:** So whenever you see anything that says we are high throughput, it means they are using append-only file. If they are not using append-only file, they are append-only file or something similar. They are not high throughput at all. Not at all. I devoid that claim. Because it's not high throughput. You can go beyond that as well. So that is not very performant. Whenever you are seeing very high throughput service, has to be high throughput and persistence. It has to be done in append-only file. And this is where you [unclear: "see it in IT"]. And this is what this very fabulous database Bitcask is all about. It's really simple for everyone, but it covers those very intricate details. Data integrity checks, record format, merge and compaction, getting the max out of cheap commodity hardware. And it's very heavily used in production by Riak. Riak, most of them have Bitcask as their backend. So we design Bitcask and Riak just makes it distributed, nothing but just like what Elasticsearch did to Lucene, Riak does it with Bitcask.

[02:40:36] Right. And this is what I wanted to cover as part of building the super fast key-value store. Right. There is a paper on Bitcask which you can refer, just a Google search away. But what I would personally recommend: implement Bitcask. And you know how, how much, how big of a promoter I am of implementation. I would highly recommend you to implement Bitcask. It's not really difficult, but when you build it, you have much deeper understanding of file IOs, how to get max out of performance and whatnot. I did a personal benchmark, Bitcask versus key-value store, Bitcask versus on-disk key-value store, in-memory key-value store, and try to get a performance on [unclear: "backlit disk"], SSDs and whatnot.

[02:41:18] That's why I'm so sure on how we could get the max performance of it, how IOs saturates and all of that. Set it up. It's not difficult. You just need the Prometheus on a machine continuously monitoring it, run your Bitcask, key value, which is why I'll just focus on key values. There's nothing fancy on that, right? Just keep it in your case, but build it. Spend two weeks, two weeks period, one week of your time. Implement it. You'll have a time of your life. Trust me on that. When I first ran it, my God, my feeling was all over the room. Six years it has been. Six years. Just yeah. No. Five years it has been. And I implemented Bitcask. Right. But do that. Do that. That's where the fun lies. Right. Okay.

## [02:41:59] Wrap-up and next week *(admin)*

[02:41:59] *(admin)* That's all what I wanted to cover. Folks who may want to drop off. Will be to drop off. I'll upload the recording by evening. And yeah. Next week is all about high throughput. Yeah. Next week is all about high throughput systems. [check: possible ASR duplicate] We'll extend the storage week. We'll cover S3. Video encoding. YouTube views counting and whatnot. And one more database we'll cover. But those will form the core of how high throughput systems are built and why are we doing some things in a certain way. This is where we got high throughput on storage side. There we'll get high throughput on compute side. But before that, next week Saturday we'll first discuss huge discussion on S3. We'll go into those nitty gritties of S3 and how to think about it. Everything that we studied will come in handy when we design S3, come in handy in the next one. So it's all string together, right? Okay, so see you folks next week.

## [02:42:51] Q&A

[02:42:51] Uh, any questions on Bitcask before I take other questions?

**[02:43:01] Teacher?:** No, no questions on Bitcask, right? It was that simple. Super, go on, [?Hemant | asr: "heaven"].

> **Student Question [02:43:12] - Student 1:** Just want to understand the, in general what they say LSM trees and Bitcask is like completely this process only, or, or something extra is there when people talk about saying SSTable, memtable? It looks like whatever we have built on Bitcask, it's similar to that, or is there... [check: probably Hemant, called as "heaven" at 02:43:05]

**[02:43:37] Teacher (answer):** In SSTable in memory, we'll be touching about SSTable next week. But in SSTable, you also store values in memory. Here we are not storing values in memory.

**[02:43:45] Student 1:** That's the one difference.

**[02:43:46] Teacher:** That's the big difference.

**[02:43:48] Student 1:** And the sorting of those values.

**[02:43:51] Teacher:** In SSTable, we sorted because we are leveraging something else. Right. We'll go in depth of SSTable next week. And why are we doing something that we are doing?

**[02:43:59] Student 1:** But beyond that, that's a big difference. Yes. Other than that, it looks same, other beyond that, because we have that... Flow wise, you have a file where we have the content and that is used by our merging and compacts and to create. And similarly for deletion, we go and do the same thing. So beyond that, whatever is there in the memtable as a sorted key values, that's the only difference.

**[02:44:27] Teacher:** Correct. That's the only difference. But with that, but here we get persistence. There, there is still loss of data. If our memory goes down, there is still loss of data. Seeing immediate persistence on the disk.

**[02:44:40] Student 1:** That's a big difference. Memtable has to be saved, maybe a local on the system or something.

**[02:44:44] Teacher:** Then every time on every write.

**[02:44:46] Student 1:** [?Every write, every write | asr: "Every day, every day"].

**[02:44:48] Teacher:** Here it's exactly here. You get it by default, right? Because you are prioritizing persistence. Right? So you're getting the max out of the underlying disk by prioritizing persistence. In memtable, you buffer and then you write.

**[02:45:03] Student 1:** I think then it makes sense. Understand this and then go towards that.

**[02:45:10] Teacher:** That becomes simpler to understand. So which is why this particular order I've taken. Next week we'll be touching upon SSTable, memtable, that part, LSM trees, high throughput systems when you do counting and all. We'll touch upon that. But this becomes the foundation for that.

**[02:45:25] Student 1:** I got about Bitcask in the storage chapter from Martin Kleppmann book. And I think today most of the things we covered were understood. He tried to cover the Bitcask and it was the first thing which I understood. If you go Bitcask, then it is easy to understand other things. Yeah, it is easy to understand other things. And he covered that Bitcask only in his book.

**[02:45:54] Teacher:** I had this in my college paper reading. I took a course on storage readings and it was part of a paper reading thing. And that's what I stumbled over. Like, my God, this is such a simple thing. It's so beautiful. Okay, then I understood that because maybe that's good. But I, do do read the paper in case you have it, that's a fabulous paper.

**[~02:46:15] Student 1:** I read it a little bit but not completed some part, I, but reading from what the Martin book give me that summary, so I skipped that. That's what happens. So yeah.

**[~02:46:31] Teacher:** Thanks, Mohit.

> **Student Question [~02:46:31] - Student 1 (Mohit):** Yeah, a bit like my question may sound naive to you, but like on the append-only files, like generally what's the way of creating those files? Like, I've never done this, so, uh, that's why, uh, my knowledge...

**[~02:46:47] Teacher?:** What do you mean when you say, what, like creating a file?

**[~02:46:52] Student 1 (Mohit):** Yes. Let's say you want to create a 1GB append-only file. So like, uh, would you kind of create a file and up front grab 1GB space in that, and so that that file is maybe contiguous on the file system, and later on, like, you keep on, uh, checking that how much data out of that one GB you have written, and then you, once the one GB has completed, then you basically switched the new file? Or is it more incremental in nature, that you would grab, uh, like you would, um, keep on doing just say simple file APIs, like write to a file, these many bytes?

**[02:47:40] Teacher (answer):** Okay. So this is what is abstracted by the, uh, file system. What you do, when you open a file, you can specify file options: read, like r, w, r plus, w plus. There is an option called a. A is an append-only option. Okay? So when you do that, the underlying file system... So when you do file IO, what happens? The file system, system call gets involved, right? That takes care of structuring this file, moving it here and there, broking it into pieces in case. That's how it is implemented. You don't have to on upfront reserve one GB of file. You just open a file and start writing to it without thinking, without worrying about it. That's what is abstracted by the file system, right?

[02:48:26] Now, it does not mean that they would have done it very poorly. In most cases, when a file is allocated, it's allocated like a huge chunk is marked as blocked, and it's responsibility of the file system, BTRFS, NTFS, EXT234, whichever you are using, that when you are creating new files, it finds a decent enough free space for it to be there. So it's not a sequential allocation of multiple files, but it just spaced out a bit. This way, even if your file grows out slightly larger, there is no, there is no problem. Right. So when you are, when you'd want to create an append-only file, when you write, when you open a file, just pass in an option A for append-only mode. And you have now just created an append-only file.

**[02:49:17] Student?:** Okay. Right.

**[02:49:20] Teacher:** Thanks. Yeah.

> **Student Question [02:49:23] - Student 3:** So my question is regarding the delete, deletion of the keys.
>
> [02:49:29] Putting some default value for deletion, but then how are we handling it in the merge?

**[02:49:34] Teacher (answer):** In merge and compact, when you're merging the two active, when you're merging the two immutable files, you skip the deleted entries. That is the file that you're writing. So let's say you are having three files, one active and two read-only. Those two read-only you will merge while you're merging and creating a third file. You skip the stale entries and the deleted entries. So that would never be copied on the disk.

**[02:49:58] Student 3:** So basically for the entries which have, for which we have that default value, we'll avoid...

**[02:50:03] Teacher:** The first entry and the, uh, because as soon as you detect it, you would not just store that anyway. [check: speaker boundary]

**[02:50:11] Student 3:** Okay.

**[02:50:13] Teacher:** Right. Because see, you are having three files in total. One is the active file and all the writes are happening, and having two historical files, which were rotated. Right. Now you will be merging and compacting these two files. Right. You would skip the stale entries, which means, let's say I've written key K1 twice. I'll skip the first entry. So I'll append when I'm writing to the new file, what I'm doing is I'm first buffering the key-value pair in memory. And I'm just replacing whatever I find it there. If I get something new out of it, I'm sorry, if I get a key which is deleted, I would just remove the entry from the in-memory hash table. And then I flush this entire hash table as this new file. This hash table is different from the index that we spoke about. Index is separate. This is a separate process that you are running, which is all about merging this. Right.

**[02:51:05] Student 3:** Got it.

**[02:51:06] Teacher:** Yeah. So, uh, that's what I'm, uh, highly recommending to write this very small [?Bitcask implementation | asr: "bit custom repetition"], very nice. Right. You'll get like how, then, then you'll start summing up on this, like, hi, how would you merge? How do you merge this two file in the same process, in different process? How will you update in-memory index that you have, right? All those nitty gritties, those devils that lies in the details, you would explore that. And it's not, to be honest, it's not really difficult. Just start writing code, one week of time, spare that one week of time, but build this stuff. Right. But in case any difficulty, drop me a note, I'm more than happy to help you. Sure. Sitesh. [check: name spelling]

> **Student Question [02:51:53] - Student 2 (Sitesh):** So I have an implementation specific question. Can you go back a slide? I am wondering on the checksum thing, the checksum that we added on the value.

> [02:52:08] So like what we are saying here is writing the whole value is not atomic, but writing the checksum and the header is. Yes.

**[02:52:19] Teacher (answer):** Writing this is atomic.

> **Student Question [02:52:23] - Student 2:** Yeah, my question is coming from, so like one is what, so different file systems and kernels now will give you different guarantees, right? I just want to understand a pattern here. So is the pattern that like let us suppose we are assuming that this is under the block size. So it is guaranteed by the kernel to us. So we write that first and then write the rest of the things later. Because this value can be 1 MB.

**[02:52:50] Teacher (answer):** Now, your kernel might not give that guarantee. Right.

**[02:52:54] Student 2:** That's right. Yeah. That is what I was trying to understand because now when you try to install this software on different kernels, behaviors may be different, but we have to be, and that's how this whole WAL thing goes. Right.

**[02:53:06] Teacher:** So, but in any case, if you look carefully, this is eight bytes, four bytes, four bytes, four bytes, which means roughly four, four, five or 20, 20 bytes, 20 bytes, no matter. It will definitely be there. Got it.

**[02:53:22] Student 2:** Because see, generally there are also more paranoid systems where kernels don't guarantee this. So you do have a separate WAL system, but I get the design. That's why I was trying to understand the pattern here. This seems to be a very interesting pattern because this is more performant.

**[02:53:43] Teacher:** But this is exactly where these interesting nitty gritty come in. Right? Like we just tend to say, I will write it in a WAL file, but how exactly. Right. This is what makes us better every day because a lot of people just skip this. No one in almost any system design you pick up or any system, any overview will be covered. That's why they are called overview. No one talks about integrity at all. No one talks about security and integrity. These are like lone wolves out there. Just someone, one passionate engineer thinks about integrity, right? Otherwise it's all gone for a toss. Work just fine. But in reality, it does not. But when you go into databases details, you would see all this.

[02:54:24] And by the way, folks, Hussain Nasir [check: name spelling] is on fire. He is posting Postgres internals like anything, like going into record level format and whatnot. My God, I don't know what happened to him. He is just going through the Postgres source code. So go through his Medium blogs. They are very fascinating. And you understand the things that we just discussed, integrity and all. That this is a Postgres record format. This is how page is there. He found that one very interesting comment and that blew my mind. The number of pages Postgres takes up to store meta information versus actual data. That just blew my mind. So read that. He's on fire for some reason. He's very obsessed with Postgres now. Diving really deep into it. Every day he's putting out videos, not sure he gave up on job or what, he is on fire.

[02:55:21] So once you have a bit of understanding, like implementing Bitcask, once you have this bit of understanding of how file IO works, highly recommend you to check out Hussain Nasir. He's not created videos on it, but on Medium blog post, he has posted a ton of amazing stuff on Postgres internals, right? But very into implementation detail, like actual source code snippet. This is where this is happening. Page is getting created. [unclear: "The artist"] is getting flushed. This is what the format is. Those part, right. It's really deep into Postgres. So highly recommended to check that out. Once you have this understanding, if you have this understanding already, what's that, read that fascinating stuff is doing then.

### [02:56:05] 1 TB dictionary size, S3 cost

> **Student Question [02:56:05] - Student 2:** Thanks for that. So one, one more question. Can we go back to the initial design of the S3 thing? So there is one question that I have. Maybe I'm not, I'm not aware of that. Yeah. So this S3 thing, right? So, well, one is the calculation part. I am still not able to get how come, even if you get 200 K words, right. This one terabyte to me, like sound. Yeah, because I was checking per entry. It is like an MBs of record. I, I was blown by that. So I don't know what's going on there, but.

**[02:56:42] Teacher (answer):** You know, great. Like you should ask this critical question. So I just added one terabyte, but now I'll just justify this size, right?

**[02:56:51] Student?:** Okay, yeah.

**[02:56:52] Teacher:** So this one terabyte I added so that it becomes impossible, like so that I bring up this point of cost that you cannot just copy this dictionary on every API server, right? That's why I wanted to add it. Otherwise, like you'd say, it's so small, I can just copy it over all the things.

**[02:57:08] Student 2:** That's what I was going to say.

**[02:57:10] Teacher:** I wanted to do that so that I touch upon network attached storage, this, I touch upon portability, right. But now in order to justify it, now this meaning, assume it's multimedia baked in audio, video visualization of it. Right. That's why I just wanted to enforce that, but that you cannot possibly copy it on every API server.

**[02:57:37] Student?:** [unclear: "So that's why my team."]

**[02:57:38] Student 2:** Right. No, no. Yeah. Thanks. No, no, no. Just like wondering what happened there, because I was thinking I'll just... And that's what I was thinking, oh man, like this per MB records, maybe I'm missing something.

> **Student Question [~02:57:50] - Student 2:** But the question that I had was, so the way what we have designed here, let us suppose I actually want to expose it. Okay. Now per API, I am doing one S3 call. So how costly is it? That is what I wanted to understand from you. Like a point call. And okay, I understand I can add caching and then my, all of those stuff will come down. But then when I was thinking alternatively, I was trying to think that, okay, I can have some kind of frequency and then eventually what will happen is I will store my frequency-based words and all of that. But I just wanted to understand is that over-optimization if I'm hosting a real service or is like how costly is S3?

**[02:58:29] Teacher (answer):** In real world, you have to do that. This is where I'm like directly querying the S3 to get it. So my intention for that was I wanted to point out that it is possible to make pointed reads on S3. Got it. This way you can build a lot of others AWS S3 Athena will build a multi-tiered storage, a cost efficient auto solution for Amazon next week. [check: garbled list of next-week designs] All of that would fall into place there because we are able to now literally do a pointed read on S3 of a particular order ID. You can now move your partial cold, like this is a classic cold storage mechanism. They're moving data from hot tier to cold tier to save cost. But when you move to cold tier, you're not just archiving, but still giving a seamless ability to query the data on S3. This enables us to do that.

[02:59:16] And given it is infrequent, it's okay to have higher latency. Cost would be there, right? S3 is not cheap. Network IO is not cheap. S3 will take its own sweet time. It's not very performant as well, but it is very cheap. So if you're having infrequent reads, you can make it on S3. I use word dictionary as an example because it's easy to understand. If I say key values will be filled with key values. I just use word dictionary so that I can pinpoint this, how small the indexes can be and not get overwhelmed by this number. So 170,000 seems a huge word, like a huge set of words, but in reality, when you multiply it by your index size, like the per index entry turns out to be MB. So we take MBs very lightly, but M stands for a million, a million bytes. Right. So we just take million and billion for like, we'll take it very lightly. They are not very lightweight. And it is still contain a huge amount of information. Those were my motivations to do it so that I set it up for other parts which becomes very easy to understand.

> **Student Question [03:00:19] - Student 2:** And last question on the, like the same part where we said that we will just trigger redeployment. Just want to understand one detail there. So when you say redeployment, basically you are spinning up new machines, the load balancer will be intact, you will just add API servers.

**[03:00:37] Teacher (answer):** You remove one. By default, cloud provider gives you this out of the box. Rolling deployment is out of the box.

**[03:00:44] Student 2:** Yeah, this is a super one. I think this is coming from more experience because as engineers, we would write some code, but there is already a way without even writing a single line of code.

**[03:00:54] Teacher:** So this is what I actually did for a couple of my services. I thought of adding Redis Pub/Sub and whatnot and have [?APIs exposed | asr: "APIs Expos"] and whatnot. We are so accustomed to write code to solve a problem. [check: words before "the box" may be lost] The box. I wanted to just cover this part that infrastructure is ours. We can do whatever we want with it. So just make a call, trigger a deployment.

**[03:01:19] Student 2:** This was a great idea. I mean, like without writing a code and then you don't have all those have a call then maintaining and all that stuff. You just use what you have done.

**[03:01:27] Teacher:** Thanks sir. Superb. Anyone else? Any other question? No, Dan, no pop-up allowed. [check: name "Dan" / "Thanks sir"]

### [03:01:39] Offsets, index size in header, sorted merge

> **Student Question [03:01:39] - Student 1:** So just a basic one. So we are storing the offsets. So offsets are the line numbers or the actual byte from where that, you know, record is starting that offset. Right. Okay. Sure. And what was the other question? I actually forgot. One was offset. Offset. Sorry, can you please go to that page? We were discussing about the offset and the, the word dictionary.

**[03:02:14] Teacher:** Sorry. Offset. We're discussing offsets over here. Yeah.

> **Student Question [03:02:20] - Student 1:** Yeah. So here the, the, the index where you are mentioning the index. So initially you are storing the header where, you know, by, by offset of the data, basically the bytes or the versions or all that information. The size of the index is basically the complete index file, which we are storing in this file, right? Correct.

**[03:02:41] Teacher (answer):** This is the size of the index. Yes, the size of the index.

**[03:02:44] Student 1:** Initially, my understanding was, it is just the location of that file stored and not the actual file stored.

**[03:02:51] Teacher:** This is the actual size of the number of bytes that you are storing in the index that gets stored there. Right, right. So you first read the header, you get the index size. Then you read these many bytes here, you get the index. Then you start serving this data.

> **Student Question [03:03:07] - Student 1:** But Arpit now, whenever, whenever, so let's say whenever we are doing any updates, so this size might be, you know, changing every time. So every time we are updating this header, right?

**[03:03:18] Teacher (answer):** Yeah. We are recreating this header. So when you're doing this merge and compaction, where did it go? We're doing this merger, you're creating this dictionary, you're creating index also, you're creating header also. This new file, this entire new file that you are creating.

> **Student Question [03:03:31] - Student 1:** Right. Right. Now the question is, because initially we have never discussed this thing that, you know, this file has to be sorted. Only when we started discussion discussion about the merger, then only we discussed that, you know, it has to be sorted. So what is the idea of sorting there? Because we never discussed that file. Yeah, we are not.

**[03:03:55] Teacher (answer):** We did not touch upon that because we did not have a need when we went into intricate details. We realized that keeping it sorted makes our merging very easy. Like merging changelog into actual dictionary, the original dictionary becomes very easy, very efficient.

> **Student Question [03:04:11] - Student 1:** But, but, but the thing is that now keeping the file is sorted in, I mean, keeping this file sorted will, would create another level of complexity. So how would we approach that?

**[03:04:24] Teacher (answer):** Why is that complex?

**[03:04:26] Student 1:** Because he's storing 170,000 records. And now you're trying to insert into every time you have to do what, binary search or a linear search, but you don't have to search anything. Right. It's direct lookup.

**[03:04:39] Teacher:** You have index, index has offset to directly go to this offset reader.

**[03:04:42] Student 1:** Like, right. But inserting a new entry, how would you decide that? Where do I need to insert? So let's say, right. Here it is. This is what, how you're creating this new dictionary, right? Change. Okay. Got it. Got it. Got it. Okay. So this idea only will [unclear: "keep on the keeper"]. Keep this thing sorted every time.

**[03:05:04] Teacher:** Correct. This is sorted. This is sorted. This is sorted. This is sorted. [check: possible ASR duplicate]

**[03:05:07] Student 1:** Right, right. Got it, got it, got it. I thought that it should be sorted before. Now, changelog.

**[03:05:12] Teacher:** So, we are just ensuring that original dictionary is sorted. Changelog is sorted. The new one would be sorted. Now, this would become the old for the next updates. Next week updates. Right, right. It will always be sorted. But because of the sortedness of the words that we have, merging of dictionary and changelog becomes [?order n | asr: "order and"] operation. That's it. Just one iteration over this file or both the files and you have this new file created. You don't have to do n square complexity.

**[03:05:38] Student 1:** Actually, I started looking into this complete record but I forgot that from the very first record we are sorting this thing. So yeah.

**[03:05:45] Student?:** So yeah, that's good.

**[03:05:47] Teacher:** These are the details I want. Thanks for asking this question. These are the things that, you know, brings that clarity, like sparks that interest. This is the optimization that we were talking about. Like why things needs to be sorted and which is why the entire domain of computer science is obsessed with sorted data. This is why it just makes life so simple. It makes processes so simple. Right. Thanks.

### [03:06:09] Class close *(admin)*

**[03:06:09] Teacher:** *(admin)* Thanks. Great. Any other question? Anyone? No? Done? That's it? No for what? Okay. That's it. Thanks folks for tuning in. I'll upload the recordings by end of the day. See you folks next week. We'll also share the pre-read. So do both. Thanks folks. See you next week. Bye-bye. Thank you. [check: possibly hallucinated in silence]

<!-- BODY END -->
