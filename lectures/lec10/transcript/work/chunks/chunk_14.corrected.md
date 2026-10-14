**[02:39:26] Teacher:** So whenever you see anything that says we are high throughput, it means they are using append-only file. If they are not using append-only file, they are append-only file or something similar. They are not high throughput at all. Not at all. I devoid that claim. Because it's not high throughput. You can go beyond that as well. So that is not very performant. Whenever you are seeing very high throughput service, has to be high throughput and persistence. It has to be done in append-only file. And this is where you [unclear: "see it in IT"]. And this is what this very fabulous database Bitcask is all about. It's really simple for everyone, but it covers those very intricate details. Data integrity checks, record format, merge and compaction, getting the max out of cheap commodity hardware. And it's very heavily used in production by Riak. Riak, most of them have Bitcask as their backend. So we design Bitcask and Riak just makes it distributed, nothing but just like what Elasticsearch did to Lucene, Riak does it with Bitcask.

[02:40:36] Right. And this is what I wanted to cover as part of building the super fast key-value store. Right. There is a paper on Bitcask which you can refer, just a Google search away. But what I would personally recommend: implement Bitcask. And you know how, how much, how big of a promoter I am of implementation. I would highly recommend you to implement Bitcask. It's not really difficult, but when you build it, you have much deeper understanding of file IOs, how to get max out of performance and whatnot. I did a personal benchmark, Bitcask versus key-value store, Bitcask versus on-disk key-value store, in-memory key-value store, and try to get a performance on [unclear: "backlit disk"], SSDs and whatnot.

[02:41:18] That's why I'm so sure on how we could get the max performance of it, how IOs saturates and all of that. Set it up. It's not difficult. You just need the Prometheus on a machine continuously monitoring it, run your Bitcask, key value, which is why I'll just focus on key values. There's nothing fancy on that, right? Just keep it in your case, but build it. Spend two weeks, two weeks period, one week of your time. Implement it. You'll have a time of your life. Trust me on that. When I first ran it, my God, my feeling was all over the room. Six years it has been. Six years. Just yeah. No. Five years it has been. And I implemented Bitcask. Right. But do that. Do that. That's where the fun lies. Right. Okay.

<!-- topic-candidate [02:41:59]: Wrap-up and next week (admin) -->

[02:41:59] *(admin)* That's all what I wanted to cover. Folks who may want to drop off. Will be to drop off. I'll upload the recording by evening. And yeah. Next week is all about high throughput. Yeah. Next week is all about high throughput systems. [check: possible ASR duplicate] We'll extend the storage week. We'll cover S3. Video encoding. YouTube views counting and whatnot. And one more database we'll cover. But those will form the core of how high throughput systems are built and why are we doing some things in a certain way. This is where we got high throughput on storage side. There we'll get high throughput on compute side. But before that, next week Saturday we'll first discuss huge discussion on S3. We'll go into those nitty gritties of S3 and how to think about it. Everything that we studied will come in handy when we design S3, come in handy in the next one. So it's all string together, right? Okay, so see you folks next week.

<!-- topic-candidate [02:42:51]: Q&A -->

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
