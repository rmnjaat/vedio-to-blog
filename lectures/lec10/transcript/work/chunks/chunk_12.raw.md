# chunk_12  OWNS 02:14:50 -> 02:26:00  (segments #2257-#2456, 1930 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:13:51] TEACHER: Perfect.   {#2233}
CTX| [02:13:51] TEACHER: Right?   {#2234}
CTX| [02:13:52] TEACHER: Okay.   {#2235}
CTX| [02:13:52] TEACHER: Now what if your machine died and because this is in-memory, it is gone.   {#2236}
CTX| [02:13:56] TEACHER: Now what?   {#2237}
CTX| [02:13:58] STUDENT_3: So you'll probably have to rebuild the indexes when you restart the server,   {#2238}
CTX| [02:14:03] STUDENT_3: video for a very long time.   {#2239}
CTX| [02:14:04] TEACHER: That's fine.   {#2240}
CTX| [02:14:05] TEACHER: When you restart, you just go through this entire file and rebuild this index.   {#2241}
CTX| [02:14:10] TEACHER: Yeah.   {#2242}
CTX| [02:14:11] TEACHER: Straight forward.   {#2243}
CTX| [02:14:12] TEACHER: So get order one, you are doing the bare minimum in get, you are doing bare minimum   {#2244}
CTX| [02:14:16] TEACHER: input.   {#2245}
CTX| [02:14:17] TEACHER: You are doing bare minimum in delete.   {#2246}
CTX| [02:14:19] STUDENT_3: Yeah.   {#2247}
CTX| [02:14:20] TEACHER: So it's the max that we could get out of this on a cheap magnetic disk storage.   {#2248}
CTX| [02:14:27] TEACHER: Right.   {#2249}
CTX| [02:14:27] TEACHER: So we just did read, write, update, read, write, update, delete, everything with full persistence.   {#2250}
CTX| [02:14:34] TEACHER: Right.   {#2251}
CTX| [02:14:35] TEACHER: But what else?   {#2252}
CTX| [02:14:36] TEACHER: What could go wrong over here, Siddesh?   {#2253}
CTX| [02:14:39] TEACHER: We have this one pile.   {#2254}
CTX| [02:14:40] TEACHER: We're putting these entries.   {#2255}
CTX| [02:14:41] TEACHER: What could go wrong?   {#2256}

---- OWNED SEGMENTS START ----
[02:14:50] STUDENT_2: I mean, availability is less because when you come back again, it takes a lot of time.   {#2257}
[02:14:56] TEACHER: That's fine.   {#2258}
[02:14:57] TEACHER: we're still okay with that. There are ways to make it better, but at least we have a naive approach to   {#2259}
[02:15:01] STUDENT_2: get started with. Another assumption is we can hold on to all the indexes in memory.   {#2260}
[02:15:08] TEACHER: That's an assumption that because you now you are limited by the amount of data you can fit in RAM.   {#2261}
[02:15:18] TEACHER: amount of index fit in RAM.   {#2262}
[02:15:22] TEACHER: It's not the values, but the keys.   {#2263}
[02:15:26] TEACHER: So you can add only as many keys as many you can keep in memory.   {#2264}
[02:15:31] TEACHER: Correct?   {#2265}
[02:15:32] TEACHER: So that's a limitation.   {#2266}
[02:15:33] TEACHER: Okay.   {#2267}
[02:15:34] TEACHER: But what else can go wrong?   {#2268}
[02:15:37] STUDENT_2: Another one is we are just appending to a file.   {#2269}
[02:15:40] STUDENT_2: So there is no disk garbage that we are collecting.   {#2270}
[02:15:44] STUDENT_2: We'll have to also figure that out.   {#2271}
[02:15:45] STUDENT_2: Like eventually our system will go out of space because we are not collecting anything from the disk.   {#2272}
[02:15:51] TEACHER: Correct.   {#2273}
[02:15:51] TEACHER: So file grows out to be huge.   {#2274}
[02:15:53] TEACHER: What could go wrong when file grows to be huge?   {#2275}
[02:15:56] TEACHER: How do you solve it?   {#2276}
[02:15:57] STUDENT_2: Yeah.   {#2277}
[02:15:58] STUDENT_2: So basically our disk space will be out.   {#2278}
[02:16:01] STUDENT_2: So how do I solve it is basically what do I do is,   {#2279}
[02:16:10] STUDENT_2: idea is don't just have one file on the disk.   {#2280}
[02:16:13] STUDENT_2: So we'll have to create multiple files and indexes we can maintain to multiple files.   {#2281}
[02:16:21] STUDENT_2: Now, whenever you change a file, you'll have to start a process to like we did last time   {#2282}
[02:16:29] STUDENT_2: to scrub, like consider a file, a partition that we are not actively appending to, but we are just still reading.   {#2283}
[02:16:36] STUDENT_2: you start reading from that file and create a new file out of that partition   {#2284}
[02:16:40] STUDENT_2: to remove the deleted keys and just write the keys which still are required in the system.   {#2285}
[02:16:45] TEACHER: Got it.   {#2286}
[02:16:46] TEACHER: So at any point in time, write will only go to one file.   {#2287}
[02:16:49] TEACHER: Yes.   {#2288}
[02:16:50] TEACHER: Other file becomes immutable.   {#2289}
[02:16:51] TEACHER: Okay.   {#2290}
[02:16:52] TEACHER: But when will you make the switch?   {#2291}
[02:16:53] TEACHER: When will you make, hey, now I'm done writing to this file.   {#2292}
[02:16:56] TEACHER: Now start writing to this file.   {#2293}
[02:16:57] STUDENT_2: How will you do it?   {#2294}
[02:16:58] STUDENT_2: Now this depends.   {#2295}
[02:16:58] STUDENT_2: Yeah.   {#2296}
[02:16:59] STUDENT_2: Now this depends on the disk space because how many files we want to keep in the disk,   {#2297}
[02:17:04] STUDENT_2: right?   {#2298}
[02:17:04] STUDENT_2: at max at any given time   {#2299}
[02:17:06] STUDENT_2: I think we would need   {#2300}
[02:17:08] STUDENT_2: a space of three files   {#2301}
[02:17:10] STUDENT_2: one that we are writing to   {#2302}
[02:17:12] STUDENT_2: one that we are reading from and one that   {#2303}
[02:17:14] TEACHER: we are going to create. No, reading and writing are from the same   {#2304}
[02:17:17] TEACHER: file, right?   {#2305}
[02:17:18] STUDENT_2: No, like anytime   {#2306}
[02:17:20] STUDENT_2: reading and writing won't go to the same file   {#2307}
[02:17:23] STUDENT_2: because   {#2308}
[02:17:23] TEACHER: whichever file my key is   {#2309}
[02:17:26] TEACHER: right, it will go to that file   {#2310}
[02:17:30] STUDENT_2: yeah, but what you have to do is   {#2311}
[02:17:32] STUDENT_2: the file that you are reading   {#2312}
[02:17:34] STUDENT_2: a lot of offsets, right? Like which are deleted. I won't like if our disks are serially better   {#2313}
[02:17:41] STUDENT_2: performant, I would just read one file, right? To create a completely new file out of it by just   {#2314}
[02:17:48] STUDENT_2: picking up the keys that are still available. That's unnecessary. That's unnecessary, right?   {#2315}
[02:17:53] TEACHER: Just, just maintaining it for that one read, then you can just club it in a different process that   {#2316}
[02:17:59] TEACHER: That we'll talk about, but first let's decide what's the criteria of making the switch to   {#2317}
[02:18:04] TEACHER: a new file.   {#2318}
[02:18:06] TEACHER: What's the criteria?   {#2319}
[02:18:07] STUDENT_2: In disk space, it will be either divided by two or three based on the approach that we   {#2320}
[02:18:11] STUDENT_2: have.   {#2321}
[02:18:11] TEACHER: So if your disk space is let's say a hundred terabytes, you'll have files worth of 10 terabytes   {#2322}
[02:18:18] TEACHER: each, 10 files.   {#2323}
[02:18:20] STUDENT_2: In this naive approach.   {#2324}
[02:18:21] STUDENT_2: Yes.   {#2325}
[02:18:22] STUDENT_2: Now there are more problems to this.   {#2326}
[02:18:23] STUDENT_2: What's the problem with that?   {#2327}
[02:18:25] STUDENT_2: The problems are basically the way you are scanning.   {#2328}
[02:18:29] STUDENT_2: indexes one, if you're just scanning a single file, you can't concurrently   {#2329}
[02:18:34] STUDENT_2: build indexes in memory.   {#2330}
[02:18:35] STUDENT_2: So that's one problem.   {#2331}
[02:18:36] STUDENT_2: So that's an motivation to create more partitions.   {#2332}
[02:18:39] STUDENT_2: Number two is also the garbage collection that you are doing.   {#2333}
[02:18:41] STUDENT_2: Right.   {#2334}
[02:18:41] STUDENT_2: So if in smaller partitions, you can be more consistent, like just   {#2335}
[02:18:45] TEACHER: scrubbing the biggest one of all, biggest one of all file system limitation.   {#2336}
[02:18:49] TEACHER: It is very much possible that your file system does not support more   {#2337}
[02:18:52] TEACHER: than one terabyte file.   {#2338}
[02:18:54] STUDENT_17: Yeah.   {#2339}
[02:18:54] TEACHER: Quite possible.   {#2340}
[02:18:56] TEACHER: Right.   {#2341}
[02:18:56] TEACHER: Yeah.   {#2342}
[02:18:56] TEACHER: Also consider that.   {#2343}
[02:18:58] TEACHER: Right.   {#2344}
[02:18:59] TEACHER: PTRFS has its limitation, NTFS has its limitation, right?   {#2345}
[02:19:03] TEACHER: Plus waiting for that huge file to pile up, then writing to the next one versus keep smaller files.   {#2346}
[02:19:10] TEACHER: Let's say 100 MB files or let's say 1 GB files.   {#2347}
[02:19:14] TEACHER: As soon as that threshold checks off, you move forward, right?   {#2348}
[02:19:18] TEACHER: You start writing to the new file.   {#2349}
[02:19:20] TEACHER: So the idea being that let's say this is file 001, then it is file 002, then it is file 003,   {#2350}
[02:19:25] TEACHER: is 004 and you keep on writing. Now at any given point in time only one file will be active. So   {#2351}
[02:19:35] TEACHER: let's say this is the active file. So at any given point in time one file will be active where all   {#2352}
[02:19:40] TEACHER: the writes are going. Everything else becomes read only. Right. So you are still allowed to   {#2353}
[02:19:49] TEACHER: read this. Now given this in the in-memory structure that we had we were just storing offset.   {#2354}
[02:19:55] TEACHER: want to store that this key is present in this file.   {#2355}
[02:20:01] TEACHER: In this offset.   {#2356}
[02:20:04] TEACHER: So now when the read comes in, get comes in, we get the key, we find and this file and   {#2357}
[02:20:10] TEACHER: this offset is there.   {#2358}
[02:20:12] TEACHER: You go to that read the content and send it back.   {#2359}
[02:20:15] TEACHER: And every time your file crosses that limit, you create a new file and start writing.   {#2360}
[02:20:19] TEACHER: Start writing.   {#2361}
[02:20:20] TEACHER: Start writing.   {#2362}
[02:20:20] TEACHER: So this is typically called as file rotation.   {#2363}
[02:20:27] TEACHER: Once you are done with that, it's very evident that out of all of this file, there are a   {#2364}
[02:20:33] TEACHER: lot of stale entries, a lot of deleted entries.   {#2365}
[02:20:37] TEACHER: So this K1 got overwritten over here.   {#2366}
[02:20:39] TEACHER: So this is stale.   {#2367}
[02:20:40] TEACHER: Why do you want to waste that much of space?   {#2368}
[02:20:42] TEACHER: This K2 was deleted over here.   {#2369}
[02:20:44] TEACHER: So we can anyway delete it.   {#2370}
[02:20:46] TEACHER: So what do you want to do is when you have multiple of these files, read only files,   {#2371}
[02:20:50] TEACHER: active and let it continue to support it.   {#2372}
[02:20:52] TEACHER: You would run a process called merge and compaction.   {#2373}
[02:20:59] TEACHER: Where what will you do is you will take these parts, take these files, iterate through them,   {#2374}
[02:21:07] TEACHER: remove or torque and basically create a new file.   {#2375}
[02:21:10] TEACHER: So it would be like you have these three files.   {#2376}
[02:21:13] TEACHER: Using these three files you create a fourth file which is a combination of these three   {#2377}
[02:21:21] TEACHER: in which you are not copying the stale entries, you are not copying the related entries and   {#2378}
[02:21:27] TEACHER: once this file is written, you delete these three files forever.   {#2379}
[02:21:31] TEACHER: And then these two becomes your active file.   {#2380}
[02:21:33] TEACHER: Like this becomes an active file.   {#2381}
[02:21:35] TEACHER: This is where the read comes in.   {#2382}
[02:21:36] TEACHER: But when you do this, you have to also update your in-memory index because now the offsets   {#2383}
[02:21:40] TEACHER: would have changed.   {#2384}
[02:21:42] TEACHER: Right?   {#2385}
[02:21:42] TEACHER: Earlier you would have used stored that this is present or rather this key is present in   {#2386}
[02:21:47] TEACHER: this file, this offset.   {#2387}
[02:21:48] TEACHER: Now when these three files get merged into this fourth file, what you have to do is you   {#2388}
[02:21:52] TEACHER: also have to update this in-memory index for the entries that are just moved to this new   {#2389}
[02:21:56] TEACHER: file.   {#2390}
[02:21:57] TEACHER: This is a classic way to do merge and compaction.   {#2391}
[02:22:01] TEACHER: You can very clearly see how you can do merge and compaction.   {#2392}
[02:22:04] TEACHER: Just iterate through this file, keep keeping track of data that you are having.   {#2393}
[02:22:09] TEACHER: Okay.   {#2394}
[02:22:09] TEACHER: This is the key that I saw.   {#2395}
[02:22:10] TEACHER: All this gets replaced periodically flush it to the disk.   {#2396}
[02:22:12] TEACHER: Basically do the simple merge and compaction.   {#2397}
[02:22:15] TEACHER: where you are merging all this file into one.   {#2398}
[02:22:18] TEACHER: So if you look carefully at your disk utilization,   {#2399}
[02:22:23] TEACHER: this is how it would look like.   {#2400}
[02:22:25] TEACHER: Periodically, or rather your file, your disk usage will go high, high, high.   {#2401}
[02:22:29] TEACHER: When merger compaction kicks in, it would suddenly drop.   {#2402}
[02:22:35] TEACHER: And then it would grow high, high, high, and then it would suddenly drop.   {#2403}
[02:22:38] TEACHER: It would grow and then suddenly drop.   {#2404}
[02:22:40] TEACHER: So this pattern that you are seeing,   {#2405}
[02:22:44] TEACHER: When the writes are coming in, your disk would grow like the disk utilization would grow.   {#2406}
[02:22:49] TEACHER: More data you are adding.   {#2407}
[02:22:51] TEACHER: When your Merger Compaction runs, your rate would suddenly decline.   {#2408}
[02:22:56] TEACHER: Then it would grow back again.   {#2409}
[02:22:57] TEACHER: Then the next runs, then the next runs, and then the next runs.   {#2410}
[02:23:00] TEACHER: You'll see this sawtooth pattern in your disk consumption.   {#2411}
[02:23:04] TEACHER: Now why I'm talking about this?   {#2412}
[02:23:06] TEACHER: Because this would help you configure what needs to be there.   {#2413}
[02:23:12] TEACHER: like what should be the flush frequency or rather merge and compaction frequency because   {#2414}
[02:23:17] TEACHER: if this is your disk utilization this shows this line this line would tell you this is your max   {#2415}
[02:23:25] TEACHER: this line would tell you the maximum capacity of disk so if your disk is let's say one terabyte big   {#2416}
[02:23:32] TEACHER: you cannot let this grow beyond one terabyte right so this pattern like how you would want   {#2417}
[02:23:38] TEACHER: this sawtooth would determine how your performance your this database would be right then how   {#2418}
[02:23:45] TEACHER: frequently you would want to dump if you let's say dump too frequently it would have too much   {#2419}
[02:23:50] TEACHER: of garbage collection happening too much of things that you're worrying about running too frequently   {#2420}
[02:23:53] TEACHER: your cpu not getting cpu to do actual work right if you do it less frequently then lot of work gets   {#2421}
[02:23:58] TEACHER: accumulated so your flush frequency that you are having should be smooth enough for you to not   {#2422}
[02:24:05] TEACHER: drop down on your performance.   {#2423}
[02:24:08] TEACHER: These two factors you would be considering in order to configure.   {#2424}
[02:24:10] TEACHER: You only have two configurable parameters over here.   {#2425}
[02:24:13] TEACHER: First is merge and compaction frequency.   {#2426}
[02:24:17] TEACHER: And second is disk rotation threshold.   {#2427}
[02:24:20] TEACHER: Oh sorry, file rotation threshold.   {#2428}
[02:24:22] TEACHER: Like how big you want your file to be.   {#2429}
[02:24:29] TEACHER: How big you want your file to be and how frequently you would   {#2430}
[02:24:33] TEACHER: want to merge it.   {#2431}
[02:24:35] TEACHER: configurable parameters and how do you configure it?   {#2432}
[02:24:38] TEACHER: Looking at the sort of pattern that you are seeing.   {#2433}
[02:24:40] TEACHER: So configure this when you are writing, when you are building this part, have these things   {#2434}
[02:24:43] TEACHER: in check, monitor them and then take a call that, Hey, what should be this frequency?   {#2435}
[02:24:48] TEACHER: And this, when you are designing this database, you provide this as a configurable parameters   {#2436}
[02:24:52] TEACHER: to your folks, right?   {#2437}
[02:24:54] TEACHER: To whoever you are shipping.   {#2438}
[02:24:56] TEACHER: But this is how you get the best read, write, update, delete, along with best or most efficient   {#2439}
[02:25:05] TEACHER: disk utilization not wasting memory having this merge and compaction this is a pretty standard   {#2440}
[02:25:10] TEACHER: approach and this is the best we can do on disk on a cheap magnetic disk storage right on ssd you   {#2441}
[02:25:18] TEACHER: will still get benefits but not as significant because ssds don't go with disk based approach to   {#2442}
[02:25:23] TEACHER: or rather the circular disk approach to write it they have their flash memories and whatnot it does   {#2443}
[02:25:30] TEACHER: very optimally there but on a cheap magnetic disk storage this gives you wonderful experience   {#2444}
[02:25:35] TEACHER: most as fast as SSDs.   {#2445}
[02:25:37] TEACHER: So the cheap storage,   {#2446}
[02:25:39] TEACHER: you get the max performance   {#2447}
[02:25:41] TEACHER: out of the system.   {#2448}
[02:25:42] TEACHER: But it's still not done.   {#2449}
[02:25:44] TEACHER: I want to go into a bit more granularity   {#2450}
[02:25:46] TEACHER: onto how exactly.   {#2451}
[02:25:49] TEACHER: Because here we just casually said   {#2452}
[02:25:51] TEACHER: I'll write key value over here.   {#2453}
[02:25:53] TEACHER: No, no.   {#2454}
[02:25:54] TEACHER: It's much more than that.   {#2455}
[02:25:56] TEACHER: Let me go into details of it.   {#2456}
---- OWNED SEGMENTS END ----

CTX| [02:26:00] TEACHER: Like how will you actually represent   {#2457}
CTX| [02:26:02] TEACHER: and how should you actually represent   {#2458}
CTX| [02:26:05] TEACHER: a disk based structure right that this is my key this is my value how do you define that even in   {#2459}
CTX| [02:26:11] TEACHER: dictionary problem we just wrote word comma meaning and i'll read file line by line but that's not   {#2460}
CTX| [02:26:17] TEACHER: how files are read files are read by blocks so how do you actually define a format a record format   {#2461}
CTX| [02:26:26] TEACHER: this is how all database work right any database mysql postgres mongodb redis fedis pick any   {#2462}
CTX| [02:26:32] TEACHER: database whenever they're serializing things to disk they have their own format in which they write   {#2463}
CTX| [02:26:38] TEACHER: it so that it becomes very efficient to read we'll walk you through that right so how one entry in   {#2464}
CTX| [02:26:46] TEACHER: the file looks like we always say that in this file the entry is looking like a key value pair   {#2465}
CTX| [02:26:52] TEACHER: will store key will store value right that's what we are thinking i'll just store key here and value   {#2466}
CTX| [02:26:57] TEACHER: over here. But now imagine when you are doing this, you cannot just read until new line because   {#2467}
