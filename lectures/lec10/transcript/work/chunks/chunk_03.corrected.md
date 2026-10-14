<!-- topic-candidate [00:23:53]: Indexing the dictionary file -->

**[00:23:53] Teacher:** So can we somehow index the data? Can we somehow create a small index through which we would be able to not, through which we should avoid doing a sequential scan of this entire file to hunt for the meaning that we are doing or to hunt for the key that we are looking for. So can we create an index on top of it? So that's what would be the index that we'll create. Just one level index, simple. What would this index look like?

**[00:24:24] Student 2:** Yeah. So basically offset and the name, like basically Apple or MSN [check: "MSN"].

**[00:24:30] Teacher:** And the key, right? Key and the offset.

**[00:24:33] Student 2:** Point to what? Offset is basically inside the file. So first line of this file is basically, let us suppose we have organized it line by line, is offset zero and so on. So offset is the

**[00:24:50] Teacher:** [check: speaker boundary - "nth byte ... starts" may complete Student 2's sentence] nth byte from the beginning of the file up until with that line starts. Right. So Apple is done. Amazon is offset [?two | asr: "to"] which points over here. Then maybe you might have a third word. Let's say book with offset three with stores over here. And offset is the byte position of that word in that file. Okay.

[00:25:10] Now let's estimate the size of this index. So this is a classic index. Now, how would the read happen? Now, first of all, we would now what we'll do. Now, if you were to, given that we have an index, gigantic file and now if let's say I'm searching for a word, if I'm let's say searching for apple, what I can do is I can read this file, I can open this file, index file that I have, I'll iterate this file line by line. At the moment we have still not done what, how should we read this file, but assume that we are reading this file line by line and we find the key that we're interested in, let's say we're interested in apple, we got it, we got the offset around it, we went to the corresponding file and then we read this entire line from it, get the meaning and send it to the user.

[00:26:03] It's like, but you are doing linear scan over here. You're still doing linear scan over here. How is this better? This is better because here, when you are doing the linear scan, you are also going through the meanings of the word, which are going to be huge while you're doing linear scan over here. What's happening is you are just, for each key that you have, you are just having a right offset that you are storing against which, right. So you are not iterating around MBs of data, but rather this is just 4 byte offset. So it's very fast to read this small file sequentially, worst case sequentially, as compared to this gigantic file, because when you do file IO, you always go in a sequential way over there. Right. Okay.

<!-- topic-candidate [00:26:50]: Estimating the index size -->

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

**[00:30:05] Teacher:** 17,000,000. These many bytes. Right. So if these many bytes is the size of the index file, it seems too big. Let's convert it into KB. It will be? 1751 KB, which is equal to 1.751 MB. That's it. Okay. Now, will you worry about it? 1.751, you can fit it in RAM very easily. Right. Right? So this is what I wanted to showcase, that this is why number crunching is very important when you are designing any system.

[00:30:48] What seems to be very huge, one terabyte big file or 170,000 words. When you do this computation, you find out, hey, this file is indeed one terabyte big, but the index that we are creating is like can fit in just 1.751 MB, which is peanuts, which is nothing. You can literally load this index in memory, stored in disk, while processing load this in memory. So now, the things that you're trying to do, like A to Z, you don't really have to, because you can fit this index right in your memory. Given a word, just look it up. It's like create a hash map out of this in memory, given a word, check the hash map, get the offset, go to this file, read the corresponding line from that offset and return the meaning to the user.

[00:31:40] Life becomes so simple, and this is why I wanted to show, like, this one simple number crunch that we did, it helped us make our system very better, because what has happened is instead of over complicating things we just keep it very simple, that one level of indexing. So first of all, just to converge on this discussion and give you a quick summary of it, we started with storing this in a simple CSV format that we had.

[00:32:11] Then because now storage part is done. Now, when you are trying to query it, when you're trying to query it, what we found out, hey, we have to do linear scan every time. For every query, for every read request, if I'm doing this linear scan, sequential scan in this file, on an average, I would be reading 0.5 terabytes, like half of it, 0.5 terabytes on every request, rough estimate. Then for every read request, reading 0.5 terabytes is very slow. 0.5 terabyte is 500 GB.

[00:32:38] Request, it's going to be very slow. So whenever our reads are slow, the only thing that we can think of is indexing, and that's the good way to approach it. Reads were slow, [unclear: "to make it first"] we create an index. In index what we store? We store the key and the offset at which it is present in the file. Right. Now we think of doing, let's say, let's keep it simple, let's start to do linear scan on this thing every time we get a request on this file. If we do that, every time that we get request we do a figure out a key and then get to offset and then query it. What would happen? We think, hey, isn't this slow? But in order to see if this linear scan is going to be slow or not, we find the size of this index.

[00:33:21] The size of this index is the number of entries that we would have, which is equal to the number of words that we have multiplied by the average record size, right? It's English dictionary that we are building. In English dictionary, the average length of a word is 4.3, either one of this, but it's not more than five. Definitely. That's the average one. I actually downloaded an entire dictionary and then computed the average length. That's how I got to know. So it's 4.3 [unclear: "as it's R4.4"]. Something like that, but 4.3 plus 4 [?byte | asr: "by"] to store this integer. So 4.3 plus 4 plus 1 for comma, 1 for new line. So it became 8.3 plus 2 is 10.3, 10.3 into 17, which gives you just 1.75 MB.

[00:34:09] Given this, we can very easily see, we can literally store this index in memory. Like we can load this index in memory when my API server starts, request comes in, I check this in-memory hash table where this index is, I get the key, check the offset, go to this file, read the meaning and send it back to the user. And this makes, this now makes much faster, because we are not doing linear scan over here. We are directly doing a pointed read on this file with the help of this index. Right. Okay. Okay. This is the first part where we sorted out our storage and our querying side of things. Right. Okay.

<!-- topic-candidate [00:34:54]: Portability - one file instead of two -->

[00:34:54] Now let's talk about portability. Now here you see we have now two files. Data.dictionary. We have the two files. We have index.index.of dictionary [check: file names as heard] and data.dictionary. In index file, we have the index. In data file, we have the data. Now for us to ship this, quote unquote, ship this dictionary to someone, anyone, I am having two files at the moment. This breaks the portability thing. We want this to be just one file. How can we go about this? Anyone except Rahul and because these folks are quite active. I'm just probing someone else to participate. Anyone else who wants to do it. We have two files. We don't want two files. We want one file. Alok.

**[00:35:47] Student 7 (Alok):** Do we need to create a file for the index? I mean, on the system startup, can we just build it up in memory?

**[00:35:56] Teacher:** So which means on every startup you have to iterate through this entire [check: sentence cut off, 3 s pause follows] We can avoid it, right? Because why do we do that? Because this is not changing anyway. Right? This will change once every week, right? This, this file.

**[00:36:14] Student 7:** I mean, then basically it is about merging these two files and having it in one file. So having some kind of partition between, some kind of partition between using which we know that till this line, this is the index and after this is the dictionary.

**[00:36:32] Teacher:** Okay. So now what we do, we have this, so we merge it. Okay. But now that's now a new challenge would come in. So now you are merging this two file into one gigantic file in which you have index. You literally concatenate this file and you have this gigantic data that you have. Okay. Okay. But how would you know when your index ends and when your data begins?

**[00:37:00] Student 7:** There has to be some line or some, some special information. Yeah. Okay.
