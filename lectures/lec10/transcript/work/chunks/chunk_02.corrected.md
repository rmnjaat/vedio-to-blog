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

<!-- topic-candidate [00:19:57]: Searching the single file -->

[00:19:57] Sidesh [check: name spelling], given this file that we have, it will contain all the words that we have seen for now. How would you search on this?

**[00:20:09] Student 2 (Sidesh):** Yeah, Arpit. So I was going to come to that. Given that we have a single file, and let us suppose this is terabyte big file, what I would do is basically, like, imagine I will start with binary search and then we will go ahead. What I would do is basically take some offsets in this, store it as indexes, and given a word. How? So basically, yeah, now, okay, I'll get there. Where I'm getting is basically I'm getting into a B+ tree. [unclear: "I want in two"] keys and values and basically create blocks of pages in memories. So let us construct a first level index first. Okay. Now let us suppose you have a one terabyte file and you have eight kilobyte block.

**[00:20:52] Teacher:** [check: start of sentence may be cut - overlapping speech] Go to blocks and I'll keep it very simple. Very simple. Like what a five year old to understand.

**[00:20:57] Student 2:** Okay. Okay. Makes sense. Like, let us suppose you can keep 1000 keys in memory.

**[00:21:03] Teacher:** Okay. Now, wait, wait, wait, why only 1000 keys in memory? So I can keep a lot. No, why I'm saying this is, we are over exaggerating. We are over engineering. This, this is a very simple word dictionary, right? Keep it very simple. No need to add B+ trees, some anything fancy. Keep it very simple, because that's where you see the power of the system. And I'm just trying to bring it down to a very simplistic level, because you would see the beauty of the system, right? That's why, that's why, given that you have, what would be the first intuition, the first way of making, or let me, let me cover that. I know you folks would go into very fancy direction. I'll just, I'll just pull you into this. Give me a minute, right?

<!-- topic-candidate [~00:21:46]: Naive approach - CSV text file and linear search -->

[~00:21:46] Okay, so the naive way, let's say we discussed that, hey, we cannot use a traditional database to store this particular dictionary. Dictionary contains key and the meaning. Now for us to make things, now, given that we cannot use a traditional DB, the simplest thing that we can come up with is, hey, let's just store things in a simple text file. Given that we are storing in things in a simple text file, what format would you store? The normal format that we can think of is, let's say we store it in a CSV format, but first thing is key, then you have this gigantic meaning for that particular key.

[00:22:21] Okay, given we have this, we need to now search for this, like, because that's what our use case is. Your use case is to do a key lookup. Now given that we have this one gigantic one terabyte file and now we want to do key lookup in this, what is a naive way? If you have this, just this one file, and you want to do key lookup, what will you do? You'll open this file, read this file line by line, find the particular key that you are looking for. Once you find it, you stop the iteration, read the meaning and return the response. Right, now doing this for every single read is very expensive, because dictionary is a very read-heavy application.

[00:23:00] So linear search is not a way to go, because when you search linearly for every read request that is coming in, you would be, worst case, you would be effectively reading one terabyte file every single time. Right. Worst case, right? On an average would be reading half a terabyte for every read, which will make your things, first of all, very slow, second, it would degrade the performance of your disk, third, your disk sectors will go bad because it is very heavily overutilized at the moment, right? So it has hardware problems, it has software problems, it has time problems, right? So whenever you are in the situation where your reads are slow, always, always, in order to make things faster, in order to make reads faster, the only thing that should come to your mind is indexing.
