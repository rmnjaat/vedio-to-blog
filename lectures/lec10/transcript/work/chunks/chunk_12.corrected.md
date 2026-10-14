**[02:14:50] Student 2 (Siddesh):** [check: name spelling] I mean, availability is less because when you come back again, it takes a lot of time.

**[02:14:56] Teacher:** That's fine. We're still okay with that. There are ways to make it better, but at least we have a naive approach to get started with.

**[~02:15:01] Student 2:** Another assumption is we can hold on to all the indexes in memory.

**[02:15:08] Teacher:** That's an assumption that because you now you are limited by the amount of data you can fit in RAM. Amount of index fit in RAM. It's not the values, but the keys. So you can add only as many keys as many you can keep in memory. Correct? So that's a limitation. Okay. But what else can go wrong?

**[02:15:37] Student 2:** Another one is we are just appending to a file. So there is no disk garbage that we are collecting. We'll have to also figure that out. Like eventually our system will go out of space because we are not collecting anything from the disk.

<!-- topic-candidate [02:15:51]: Multiple files and file rotation -->

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

<!-- topic-candidate [02:20:27]: Merge and compaction -->

[02:20:27] Once you are done with that, it's very evident that out of all of this file, there are a lot of stale entries, a lot of deleted entries. So this K1 got overwritten over here. So this is stale. Why do you want to waste that much of space? This K2 was deleted over here. So we can anyway delete it. So what do you want to do is when you have multiple of these files, read only files, active and let it continue to support it. You would run a process called merge and compaction. Where what will you do is you will take these parts, take these files, iterate through them, remove or [unclear: "torque"] and basically create a new file.

[02:21:10] So it would be like you have these three files. Using these three files you create a fourth file which is a combination of these three in which you are not copying the stale entries, you are not copying the [?deleted | asr: "related"] entries and once this file is written, you delete these three files forever. And then these two becomes your active file. Like this becomes an active file. This is where the read comes in. But when you do this, you have to also update your in-memory index because now the offsets would have changed. Right? Earlier you would have used stored that this is present or rather this key is present in this file, this offset. Now when these three files get merged into this fourth file, what you have to do is you also have to update this in-memory index for the entries that are just moved to this new file.

[02:21:57] This is a classic way to do merge and compaction. You can very clearly see how you can do merge and compaction. Just iterate through this file, keep keeping track of data that you are having. Okay. This is the key that I saw. All this gets replaced periodically, flush it to the disk. Basically do the simple merge and compaction where you are merging all this file into one.

<!-- topic-candidate [02:22:18]: Sawtooth pattern of disk utilization and configurable parameters -->

[02:22:18] So if you look carefully at your disk utilization, this is how it would look like. Periodically, or rather your file, your disk usage will go high, high, high. When merge and compaction kicks in, it would suddenly drop. And then it would grow high, high, high, and then it would suddenly drop. It would grow and then suddenly drop. So this pattern that you are seeing, when the writes are coming in, your disk would grow, like the disk utilization would grow. More data you are adding. When your merge and compaction runs, your rate would suddenly decline. Then it would grow back again. Then the next runs, then the next runs, and then the next runs. You'll see this sawtooth pattern in your disk consumption.

[02:23:04] Now why I'm talking about this? Because this would help you configure what needs to be there, like what should be the flush frequency or rather merge and compaction frequency, because if this is your disk utilization, this shows this line, this line would tell you this is your max, this line would tell you the maximum capacity of disk. So if your disk is let's say one terabyte big, you cannot let this grow beyond one terabyte, right? So this pattern, like how you would want this sawtooth, would determine how your performance, your this database would be, right? Then how frequently you would want to dump. If you, let's say, dump too frequently, it would have too much of garbage collection happening, too much of things that you're worrying about, running too frequently, your CPU not getting CPU to do actual work, right? If you do it less frequently, then lot of work gets accumulated. So your flush frequency that you are having should be smooth enough for you to not drop down on your performance.

[02:24:08] These two factors you would be considering in order to configure. You only have two configurable parameters over here. First is merge and compaction frequency. And second is disk rotation threshold. Oh sorry, file rotation threshold. Like how big you want your file to be. How big you want your file to be and how frequently you would want to merge it. Configurable parameters and how do you configure it? Looking at the [?sawtooth | asr: "sort of"] pattern that you are seeing. So configure this when you are writing, when you are building this part, have these things in check, monitor them and then take a call that, hey, what should be this frequency? And this, when you are designing this database, you provide this as a configurable parameters to your folks, right? To whoever you are shipping.

[02:24:56] But this is how you get the best read, write, update, delete, along with best or most efficient disk utilization, not wasting memory, having this merge and compaction. This is a pretty standard approach and this is the best we can do on disk, on a cheap magnetic disk storage, right? On SSD you will still get benefits but not as significant because SSDs don't go with disk based approach to, or rather the circular disk approach to write it. They have their flash memories and whatnot, it does very optimally there. But on a cheap magnetic disk storage this gives you wonderful experience, [?almost | asr: "most"] as fast as SSDs. So the cheap storage, you get the max performance out of the system.

<!-- topic-candidate [02:25:42]: Record format -->

[02:25:42] But it's still not done. I want to go into a bit more granularity onto how exactly. Because here we just casually said I'll write key value over here. No, no. It's much more than that. Let me go into details of it.
