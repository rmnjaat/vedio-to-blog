# chunk_13  OWNS 02:26:00 -> 02:39:26  (segments #2457-#2650, 2389 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:25:05] TEACHER: disk utilization not wasting memory having this merge and compaction this is a pretty standard   {#2440}
CTX| [02:25:10] TEACHER: approach and this is the best we can do on disk on a cheap magnetic disk storage right on ssd you   {#2441}
CTX| [02:25:18] TEACHER: will still get benefits but not as significant because ssds don't go with disk based approach to   {#2442}
CTX| [02:25:23] TEACHER: or rather the circular disk approach to write it they have their flash memories and whatnot it does   {#2443}
CTX| [02:25:30] TEACHER: very optimally there but on a cheap magnetic disk storage this gives you wonderful experience   {#2444}
CTX| [02:25:35] TEACHER: most as fast as SSDs.   {#2445}
CTX| [02:25:37] TEACHER: So the cheap storage,   {#2446}
CTX| [02:25:39] TEACHER: you get the max performance   {#2447}
CTX| [02:25:41] TEACHER: out of the system.   {#2448}
CTX| [02:25:42] TEACHER: But it's still not done.   {#2449}
CTX| [02:25:44] TEACHER: I want to go into a bit more granularity   {#2450}
CTX| [02:25:46] TEACHER: onto how exactly.   {#2451}
CTX| [02:25:49] TEACHER: Because here we just casually said   {#2452}
CTX| [02:25:51] TEACHER: I'll write key value over here.   {#2453}
CTX| [02:25:53] TEACHER: No, no.   {#2454}
CTX| [02:25:54] TEACHER: It's much more than that.   {#2455}
CTX| [02:25:56] TEACHER: Let me go into details of it.   {#2456}

---- OWNED SEGMENTS START ----
[02:26:00] TEACHER: Like how will you actually represent   {#2457}
[02:26:02] TEACHER: and how should you actually represent   {#2458}
[02:26:05] TEACHER: a disk based structure right that this is my key this is my value how do you define that even in   {#2459}
[02:26:11] TEACHER: dictionary problem we just wrote word comma meaning and i'll read file line by line but that's not   {#2460}
[02:26:17] TEACHER: how files are read files are read by blocks so how do you actually define a format a record format   {#2461}
[02:26:26] TEACHER: this is how all database work right any database mysql postgres mongodb redis fedis pick any   {#2462}
[02:26:32] TEACHER: database whenever they're serializing things to disk they have their own format in which they write   {#2463}
[02:26:38] TEACHER: it so that it becomes very efficient to read we'll walk you through that right so how one entry in   {#2464}
[02:26:46] TEACHER: the file looks like we always say that in this file the entry is looking like a key value pair   {#2465}
[02:26:52] TEACHER: will store key will store value right that's what we are thinking i'll just store key here and value   {#2466}
[02:26:57] TEACHER: over here. But now imagine when you are doing this, you cannot just read until new line because   {#2467}
[02:27:05] TEACHER: every time you are doing a disk IO, let's say you read one byte at a time until you hit a slash n.   {#2468}
[02:27:11] TEACHER: How many disk IOs are you making? That would make things so slow for you. You should exactly know   {#2469}
[02:27:18] TEACHER: if I'm at this offset, how many bytes do I have to read to complete my entire key value,   {#2470}
[02:27:23] TEACHER: right which is what you do you don't just say i'll read until new light that is literally 11   {#2471}
[02:27:31] TEACHER: standard kids would write code like that right read until new light no you have to read the exact   {#2472}
[02:27:38] TEACHER: number of bytes you are supposed to so that you get that entire data in one shot so that's what   {#2473}
[02:27:45] TEACHER: you do you instead of just write key and value you'll write key size and value size as well   {#2474}
[02:27:51] TEACHER: So first you write key size which tells you how many bytes is key.   {#2475}
[02:27:56] TEACHER: Then you write value size which tells how many bytes is value.   {#2476}
[02:28:01] TEACHER: When you read it, you read these 8 bytes over here.   {#2477}
[02:28:06] TEACHER: These 8 bytes, 4 byte integer.   {#2478}
[02:28:08] TEACHER: These 8 bytes you interpret the first 4 bytes as key size, interpret second 4 bytes as value   {#2479}
[02:28:13] TEACHER: size.   {#2480}
[02:28:14] TEACHER: Then you read these many bytes in total, you get key and value both.   {#2481}
[02:28:21] TEACHER: bytes that becomes key and these very bytes becomes value. It gives you the much   {#2482}
[02:28:27] TEACHER: read predictability so that in one disk I.O. you ask in first disk I.O. you get this part   {#2483}
[02:28:34] TEACHER: the metadata kind of header that we discussed in the previous product kind of header.   {#2484}
[02:28:39] TEACHER: You read this eight bytes interpret first four bytes as this second four bytes as value size   {#2485}
[02:28:45] TEACHER: then you sum it up and you read one more disk I.O. to read this entire thing together   {#2486}
[02:28:51] TEACHER: And then you process this as key and this as value.   {#2487}
[02:28:53] TEACHER: Right.   {#2488}
[02:28:53] TEACHER: Because from this you would know exactly how much key takes and how much value.   {#2489}
[02:28:56] TEACHER: Right.   {#2490}
[02:28:57] TEACHER: So this is what you would store on the disk.   {#2491}
[02:29:00] TEACHER: This is similar what you will do in even in word dictionary also.   {#2492}
[02:29:03] TEACHER: Word size, meaning size.   {#2493}
[02:29:06] TEACHER: Right.   {#2494}
[02:29:06] TEACHER: Same thing.   {#2495}
[02:29:07] TEACHER: We just wrote it in CSV because it's easy, but now we go into details of it.   {#2496}
[02:29:11] TEACHER: So now you can update that system design with respect to this approach.   {#2497}
[02:29:14] TEACHER: That this is how every entry in your file would look like.   {#2498}
[02:29:17] TEACHER: Very predictable.   {#2499}
[02:29:19] TEACHER: Right.   {#2500}
[02:29:19] TEACHER: Okay.   {#2501}
[02:29:21] TEACHER: A lot of people just stop here.   {#2502}
[02:29:24] TEACHER: But always remember your database needs to be fault tolerant.   {#2503}
[02:29:27] TEACHER: What if you are writing a gigantic value and while writing the value, the machine crashed.   {#2504}
[02:29:34] TEACHER: You're just writing 110 and then machine crashed.   {#2505}
[02:29:38] TEACHER: Now, how will you know?   {#2506}
[02:29:40] TEACHER: You cannot fix it.   {#2507}
[02:29:41] TEACHER: Your write has failed.   {#2508}
[02:29:43] TEACHER: Your data is corrupt.   {#2509}
[02:29:44] TEACHER: How will you know that an entry that you return is corrupt?   {#2510}
[02:29:49] TEACHER: That's what you have to know.   {#2511}
[02:29:51] TEACHER: entry that you because first you have to know that it is corrupt.   {#2512}
[02:29:54] TEACHER: Then you fix it.   {#2513}
[02:29:54] TEACHER: There is no way to fix it because the data is gone, but you cannot just   {#2514}
[02:29:58] TEACHER: serve it because after this point, let's say you wrote this entry and then   {#2515}
[02:30:01] TEACHER: let's say another entry is written.   {#2516}
[02:30:03] TEACHER: If you read value size number of bytes over here, it would penetrate into   {#2517}
[02:30:06] TEACHER: other entry that you have.   {#2518}
[02:30:08] TEACHER: And that's very bad.   {#2519}
[02:30:09] TEACHER: You need to know that whatever you wrote has lost its integrity.   {#2520}
[02:30:15] TEACHER: The only way to do it is you put CRCs, you put checksums, cyclic redundancy checks.   {#2521}
[02:30:23] TEACHER: And that will be the first thing that you would write to the desk.   {#2522}
[02:30:27] TEACHER: Now what are CRCs?   {#2523}
[02:30:28] TEACHER: Simple hash of all the values, key size, value size, key value, everything.   {#2524}
[02:30:33] TEACHER: You would have key and value in memory.   {#2525}
[02:30:35] TEACHER: You create this record format in memory, compute the hash of it and store that checksum or   {#2526}
[02:30:42] TEACHER: hash or whatever you'd want to use as the first thing over here.   {#2527}
[02:30:47] TEACHER: Similar to how in distributed ID generators, you saw timestamp on the leftmost side of it.   {#2528}
[02:30:53] TEACHER: In any good format of the world, in good record format of the world, that is persistence,   {#2529}
[02:30:59] TEACHER: you would always say CRC as the leftmost side. Postgres commit log file CRC on the leftmost side.   {#2530}
[02:31:07] TEACHER: MySQL bin log CRC on the leftmost side. Why? You are first,   {#2531}
[02:31:12] TEACHER: first thing that you write that you ensure that is at least flushed is CRC because that   {#2532}
[02:31:17] TEACHER: is the bare minimum thing you need to know that something is corrupted.   {#2533}
[02:31:19] TEACHER: You cannot write CRC in the end.   {#2534}
[02:31:21] TEACHER: You write CRC in the beginning, pick any network format.   {#2535}
[02:31:24] TEACHER: You'd always say CRC at the first because that's the first bite or the first set of   {#2536}
[02:31:29] TEACHER: bytes that you should receive because that is what would tell you that the data that   {#2537}
[02:31:32] TEACHER: you're receiving is not corrupted by any means.   {#2538}
[02:31:36] TEACHER: So this is what your final structure would look like.   {#2539}
[02:31:41] TEACHER: CRC time stamp just for conflicts key size value size key and value.   {#2540}
[02:31:46] TEACHER: First this guy you will write this much then in one disk you write key and then another   {#2541}
[02:31:51] TEACHER: disk you write a gigantic value that you have.   {#2542}
[02:31:54] TEACHER: So in case the first disk write itself fails this entry itself is not there problem solved.   {#2543}
[02:32:01] TEACHER: But if let's say this succeeds and while writing key it failed when you read the data you check   {#2544}
[02:32:07] TEACHER: the CRC and you see the CRC doesn't matter because there is some corruption over here.   {#2545}
[02:32:12] TEACHER: So you tell the user that the entry is corrupted.   {#2546}
[02:32:15] TEACHER: Right?   {#2547}
[02:32:15] TEACHER: You are not serving corrupted data to your users ever.   {#2548}
[02:32:19] TEACHER: And then you can have your own recovery mechanism to recover from it.   {#2549}
[02:32:22] TEACHER: That's heuristics mostly.   {#2550}
[02:32:24] TEACHER: You ignore that entry in margin complexion and whatnot.   {#2551}
[02:32:27] TEACHER: You assume that the right never came your way because corrupted data, you cannot recover   {#2552}
[02:32:31] TEACHER: from it anyway.   {#2553}
[02:32:32] TEACHER: This is what I want all of you to think about whenever you're testing.   {#2554}
[02:32:37] TEACHER: CSV. Is that the best way to do it? And have a record for better. This is where you need to think,   {#2555}
[02:32:42] TEACHER: let's say saying that I read only until new, like until new line, not good. Key size, value,   {#2556}
[02:32:48] TEACHER: size, key value, all of this with CRCs, integrity checks, durability, fault tolerance. Very important   {#2557}
[02:32:54] TEACHER: when we're designing a storage check. Okay. For the get, this is what we discussed. Key value,   {#2558}
[02:33:01] TEACHER: you store it in your in-memory hash table, which points to the corresponding entries in the file.   {#2559}
[02:33:07] TEACHER: given that we are having append only file all the operations are key value pairs in this format are   {#2560}
[02:33:12] TEACHER: getting appended one after another now what would happen because of this our one file will grow out   {#2561}
[02:33:18] TEACHER: to be very big that's why we have to do file rotation which means whenever a file reaches a   {#2562}
[02:33:24] TEACHER: certain threshold we start writing it to the new file then a new file then a new file then a new   {#2563}
[02:33:30] TEACHER: point in time only one file would be active everything else would be just available for reads   {#2564}
[02:33:36] TEACHER: this means that in the in-memory hash table what we were storing we were storing just key and offset   {#2565}
[02:33:41] TEACHER: now we need to store that this key is present in this file the entire record size is this   {#2566}
[02:33:48] TEACHER: add this offset and timestamp for conflicts and meta information right this way your entries can   {#2567}
[02:33:55] TEACHER: point to any file but the writes will always happen to the most to the active file that you have   {#2568}
[02:34:01] TEACHER: This is how your in-memory index would look like.   {#2569}
[02:34:05] TEACHER: Okay.   {#2570}
[02:34:06] TEACHER: Now we have a lot of files.   {#2571}
[02:34:09] TEACHER: Can we optimize?   {#2572}
[02:34:10] TEACHER: Given that we have a lot of files having a lot of stale and deleted entries.   {#2573}
[02:34:14] TEACHER: Let's merge and compact.   {#2574}
[02:34:15] TEACHER: So what we write?   {#2575}
[02:34:17] TEACHER: We write very simple merger compact.   {#2576}
[02:34:19] TEACHER: We add it through all the files.   {#2577}
[02:34:21] TEACHER: They are not sorted.   {#2578}
[02:34:22] TEACHER: It's not similar to merge of merge sort.   {#2579}
[02:34:24] TEACHER: Because here the order can be anything.   {#2580}
[02:34:26] TEACHER: It's not sorted.   {#2581}
[02:34:27] TEACHER: So to load it in a temporary structure.   {#2582}
[02:34:30] TEACHER: Merge them, replace the entries that you are seeing like the further presence of those   {#2583}
[02:34:38] TEACHER: entries, you are replacing it in a hash table and then flushing it to the disk.   {#2584}
[02:34:41] TEACHER: Simple.   {#2585}
[02:34:41] TEACHER: Try writing a code.   {#2586}
[02:34:43] TEACHER: It's not really that difficult.   {#2587}
[02:34:44] TEACHER: So read entries from this file, open it in a hash table and then flush it periodically   {#2588}
[02:34:49] TEACHER: to the disk by not writing the stale entries or the deleted entries there.   {#2589}
[02:34:55] TEACHER: right but now you would see this sort of pattern emerging and this pattern would help you determine   {#2590}
[02:35:02] TEACHER: the maximum disk size or the maximum size of a file and the flush frequency that you need   {#2591}
[02:35:07] TEACHER: so that it stays within the limit this is the max size of the disk that you have this is what you   {#2592}
[02:35:14] TEACHER: would get doing very frequent merges also we're doing very frequent mergers and compaction not a   {#2593}
[02:35:20] TEACHER: good option very infrequent you would breach past this right so keep it to a bare to keep it at   {#2594}
[02:35:26] TEACHER: optimal state where no matter what this never breaches right this should never cross the cap   {#2595}
[02:35:31] TEACHER: of it as soon as it crosses the cap of it your system would crash right okay now the limitation   {#2596}
[02:35:39] TEACHER: of this whatever we designed sounds very fancy he gave me order one put order one delete everything   {#2597}
[02:35:44] TEACHER: order by but what is the limitation the limitation of the system is all the keys must fit in memory   {#2598}
[02:35:50] TEACHER: because in the in-memory structure that we have we are storing keys and basic information so it is   {#2599}
[02:35:55] TEACHER: bounded by the number of keys i can fit in values are flushed on the disk but keys are there in   {#2600}
[02:36:01] TEACHER: memory so on this there are keys and values as well but in memory you have keys and offset so   {#2601}
[02:36:06] TEACHER: the size of the index how big the number of keys that you can fit in memory determines how big your   {#2602}
[02:36:14] TEACHER: How many keys you can store in this particular database, right?   {#2603}
[02:36:19] TEACHER: But the strengths of this DB is it gives me order one reads, writes and reads.   {#2604}
[02:36:23] TEACHER: When I say order one, it's a bare minimum that your disk has to do when it is there   {#2605}
[02:36:28] TEACHER: to write, when you request it to write something.   {#2606}
[02:36:31] TEACHER: You get very high write throughput.   {#2607}
[02:36:34] TEACHER: You get very low latency, write very low latency.   {#2608}
[02:36:37] TEACHER: You are doing the bare minimum disk IO.   {#2609}
[02:36:39] TEACHER: reads one memory lookup one random read get a data send it back and move it back to continue   {#2610}
[02:36:46] TEACHER: writing bare minimum that you are doing that so bare minimum to write bare minimum to read   {#2611}
[02:36:51] TEACHER: you get very high write throughput you actually get io saturation your your physical device io   {#2612}
[02:36:59] TEACHER: will be saturated and that's a good thing because in most cases it's not that you are waiting for   {#2613}
[02:37:03] TEACHER: IO to happen. You're doing the bare minimum to read and write and whatnot.   {#2614}
[02:37:08] TEACHER: So you saturate your network call, your saturated network,   {#2615}
[02:37:12] TEACHER: you saturate your disk IO. You're getting the max out of an underlying   {#2616}
[02:37:16] TEACHER: hardware and a very simple thing. Backups are easy.   {#2617}
[02:37:20] TEACHER: Control C, control V, these files and you have backup. It's normal file that you   {#2618}
[02:37:24] TEACHER: are just storing there, right? You can literally do that.   {#2619}
[02:37:28] TEACHER: The database that we just designed is called BitCask.   {#2620}
[02:37:32] TEACHER: It's an embedded database.   {#2621}
[02:37:33] TEACHER: In previous I shared the video embedded, what embedded databases are.   {#2622}
[02:37:37] TEACHER: This is embedded database where it is not a central server that is doing it.   {#2623}
[02:37:43] TEACHER: BitCask is not like a MySQL server that was spinning up and everyone connects to that.   {#2624}
[02:37:48] TEACHER: BitCask is an embedded database, which is kind of a library, right?   {#2625}
[02:37:52] TEACHER: Like SQLite is an embedded database.   {#2626}
[02:37:54] TEACHER: BitCask is an embedded database S-FM.   {#2627}
[02:37:56] TEACHER: So Bitcask is used by Uber in production for their main ride-hailing service.   {#2628}
[02:38:02] TEACHER: For their main service, they use Bitcask.   {#2629}
[02:38:04] TEACHER: But because Bitcask is embedded database, it does not have a separate server server.   {#2630}
[02:38:11] TEACHER: So what Uber does is Uber uses React as their main database.   {#2631}
[02:38:17] TEACHER: React is a simple key value store and React uses Bitcask as a back-end.   {#2632}
[02:38:22] TEACHER: So like how Elasticsearch is an HTTP wrapper over Lucene.   {#2633}
[02:38:29] TEACHER: Similarly, React is a wrapper over BitCask.   {#2634}
[02:38:33] TEACHER: So React's responsibility is to make BitCask distributed.   {#2635}
[02:38:38] TEACHER: You'd still have like this is mutually exclusive set of data.   {#2636}
[02:38:43] TEACHER: But React gives you this additional thing.   {#2637}
[02:38:46] TEACHER: Master, slave, architecture, distributedness, consensus, whatnot.   {#2638}
[02:38:52] TEACHER: It gives you all these features to connect.   {#2639}
[02:38:54] TEACHER: So it gives you proxy to seamlessly connect and route the request,   {#2640}
[02:38:57] TEACHER: hash paste, consistent hashing, data movement, whatnot.   {#2641}
[02:39:00] TEACHER: That is responsibility of React.   {#2642}
[02:39:02] TEACHER: But in the backend, what it uses, it uses BitCask   {#2643}
[02:39:05] TEACHER: to get the maximum out of when you are storing   {#2644}
[02:39:08] TEACHER: and retrieving the data from the disk.   {#2645}
[02:39:10] TEACHER: That's the best you can do over there.   {#2646}
[02:39:12] TEACHER: This is what Uber uses in production.   {#2647}
[02:39:14] TEACHER: If you look carefully, the BitCask, the way we design,   {#2648}
[02:39:18] TEACHER: the append-only file that we see is the magic   {#2649}
[02:39:22] TEACHER: behind getting the max out of cheap commodity hardware.   {#2650}
---- OWNED SEGMENTS END ----

CTX| [02:39:26] TEACHER: So whenever you see anything that says we are high throughput,   {#2651}
CTX| [02:39:31] TEACHER: it means they are using append only file.   {#2652}
CTX| [02:39:34] TEACHER: If they are not using append only file,   {#2653}
CTX| [02:39:36] TEACHER: they are append only file or something similar.   {#2654}
CTX| [02:39:38] TEACHER: They are not high throughput at all.   {#2655}
CTX| [02:39:40] TEACHER: Not at all.   {#2656}
CTX| [02:39:41] TEACHER: I devoid that claim.   {#2657}
CTX| [02:39:43] TEACHER: Because it's not high throughput.   {#2658}
CTX| [02:39:44] TEACHER: You can go beyond that as well.   {#2659}
CTX| [02:39:47] TEACHER: So that is not very performant.   {#2660}
CTX| [02:39:49] TEACHER: Whenever you are seeing very high throughput service,   {#2661}
CTX| [02:39:52] TEACHER: has to be high throughput and persistence.   {#2662}
CTX| [02:39:54] TEACHER: It has to be done in append only file.   {#2663}
CTX| [02:39:56] TEACHER: And this is where you see it in IT.   {#2664}
CTX| [02:39:58] TEACHER: And this is what this very fabulous database BitCask is all about.   {#2665}
CTX| [02:40:03] TEACHER: It's really simple for everyone, but it covers those very intricate details.   {#2666}
CTX| [02:40:10] TEACHER: Data integrity checks, record format, merge and compaction,   {#2667}
CTX| [02:40:14] TEACHER: getting the max out of cheap commodity hardware.   {#2668}
CTX| [02:40:17] TEACHER: And it's very heavily used in production by React.   {#2669}
CTX| [02:40:22] TEACHER: react most of them have bitcast as their backend so we design bitcast and react just makes it   {#2670}
