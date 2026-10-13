# chunk_13  OWNS 02:19:41 -> 02:32:14  (segments #2380-#2588, 2156 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:18:42] TEACHER: And then next one comes in this way, your entire process gets coordinated.   {#2365}
CTX| [02:18:46] TEACHER: only one consumer is reading the message from the key because Q is not giving you the sensory   {#2366}
CTX| [02:18:51] TEACHER: protection. This is a remote key implementation. So now what you do? The features that we need from   {#2367}
CTX| [02:18:58] TEACHER: this is atomic instructions and automatic expressions. So what we are storing in red   {#2368}
CTX| [02:19:05] TEACHER: is we are storing exactly this, that this is the resource. This consumer owns this resource   {#2369}
CTX| [02:19:11] TEACHER: at this very moment with an expiration of 5 minutes.   {#2370}
CTX| [02:19:16] TEACHER: So only consumer 2 is allowed to read it.   {#2371}
CTX| [02:19:19] TEACHER: Once the consumer 2 reads a message,   {#2372}
CTX| [02:19:21] TEACHER: it releases the lock which means it deletes this entry   {#2373}
CTX| [02:19:24] TEACHER: and someone else can take it.   {#2374}
CTX| [02:19:26] TEACHER: But in case this consumer 2 does not delete the entry in 5 minutes,   {#2375}
CTX| [02:19:31] TEACHER: the entry gets auto expired.   {#2376}
CTX| [02:19:33] TEACHER: This means there is no perpetual holding of lock   {#2377}
CTX| [02:19:36] TEACHER: and the system continuously moves forward.   {#2378}
CTX| [02:19:38] TEACHER: Okay.   {#2379}

---- OWNED SEGMENTS START ----
[02:19:41] TEACHER: So this is exactly how your code would look exactly how.   {#2380}
[02:19:47] TEACHER: So your acquire lock logic in Python would be like your consumer when it started, it   {#2381}
[02:19:51] TEACHER: says, get my ID.   {#2382}
[02:19:52] TEACHER: So consumer when you hard code it, how you want to implement it's your consumer ID, maybe   {#2383}
[02:19:55] TEACHER: IP address, host name and whatnot.   {#2384}
[02:19:57] TEACHER: So your consumer knows that I am this, my ID is this while true, I'm trying to set the   {#2385}
[02:20:04] TEACHER: key in Redis.   {#2386}
[02:20:06] TEACHER: so which means this   {#2387}
[02:20:08] TEACHER: I am trying to set this key in Redis   {#2388}
[02:20:11] TEACHER: and now what I am doing   {#2389}
[02:20:12] TEACHER: I am not just doing normal set   {#2390}
[02:20:13] TEACHER: I am doing set nx   {#2391}
[02:20:15] TEACHER: what set nx does   {#2392}
[02:20:17] TEACHER: it means that set   {#2393}
[02:20:20] TEACHER: a key with some expiration   {#2394}
[02:20:22] TEACHER: where it is non-existent   {#2395}
[02:20:23] TEACHER: so I am trying to set for my Q7   {#2396}
[02:20:25] TEACHER: I am trying to acquire the lock   {#2397}
[02:20:28] TEACHER: with an expiration of   {#2398}
[02:20:29] TEACHER: 300 seconds   {#2399}
[02:20:32] TEACHER: so this command   {#2400}
[02:20:34] TEACHER: of Redis is an   {#2401}
[02:20:36] TEACHER: atomic command, which means that when one, this command is executing, no other   {#2402}
[02:20:39] TEACHER: command would ever execute on Redis.   {#2403}
[02:20:41] TEACHER: Right.   {#2404}
[02:20:42] TEACHER: This ensures atomicity.   {#2405}
[02:20:44] TEACHER: Right.   {#2406}
[02:20:45] TEACHER: So even if there are multiple one, try to execute multiple commands in the   {#2407}
[02:20:48] TEACHER: Redis at the same time, only one of them success.   {#2408}
[02:20:50] TEACHER: Unless this completes its execution, other command would have to wait.   {#2409}
[02:20:54] TEACHER: It's the property of Redis that we're leveraging atomic instructions.   {#2410}
[02:20:58] TEACHER: But if the key is already set, it would not replace it, which is exactly what   {#2411}
[02:21:06] TEACHER: key is already set and now if let's say consumer one tries and set set that's wrong right you   {#2412}
[02:21:11] TEACHER: don't want that to happen so redis gives you that command out of the box which says set nx   {#2413}
[02:21:15] TEACHER: that set only when it is non-existent so if it is able to set it returns one if it is not able   {#2414}
[02:21:21] TEACHER: to set it returns zero so what you do that if you are able to set your consumer key in redis   {#2415}
[02:21:27] TEACHER: which means that now you own the lock because now you own the lock you can exit from this   {#2416}
[02:21:36] TEACHER: As soon as you exit from this infinite value, you can read the message.   {#2417}
[02:21:39] TEACHER: Right.   {#2418}
[02:21:40] TEACHER: But for folks who cannot do that, who cannot set their key in red is because some keys   {#2419}
[02:21:46] TEACHER: already sets of consumers already having the lock.   {#2420}
[02:21:49] TEACHER: V is equal to zero else continues.   {#2421}
[02:21:51] TEACHER: So you continue this while loop forever, forever as in unless someone releases it.   {#2422}
[02:21:57] TEACHER: You are able to set it up until then there would be infinite loop.   {#2423}
[02:22:00] TEACHER: So most consumers will be stuck over here unless one of them releases it.   {#2424}
[02:22:07] TEACHER: So one who acquires it moves forward.   {#2425}
[02:22:10] TEACHER: That's what we are doing over here.   {#2426}
[02:22:12] TEACHER: So if you are able to set it, which means now you own the log.   {#2427}
[02:22:16] TEACHER: So you return, which means when you return, you come to this instruction   {#2428}
[02:22:19] TEACHER: and start reading the message from the queue, making an API call   {#2429}
[02:22:22] TEACHER: while others continue in this volume.   {#2430}
[02:22:27] TEACHER: Now what about releasing the log?   {#2431}
[02:22:30] TEACHER: making a network call to get read the message from the queue. Then releasing the lock. Releasing   {#2432}
[02:22:36] TEACHER: the lock is simple. I get that I am this consumer and I can just delete. Imagine if I don't write   {#2433}
[02:22:43] TEACHER: this. I just do this. I see what consumer I am or not even this. I just do this. Release lock queue.   {#2434}
[02:22:52] TEACHER: delete entry what's the drawback of this you are saying that when someone really calls release lock   {#2435}
[02:23:01] TEACHER: you are simply deleting the message or you are simply deleting the entry from this redis right   {#2436}
[02:23:07] TEACHER: if you do this the problem with this is that it is possible for a process to delete the key from   {#2437}
[02:23:16] TEACHER: Redis even though it does not own the lock at the moment.   {#2438}
[02:23:19] TEACHER: For example, let's say consumer one acquired the lock, but consumer two fired release lock.   {#2439}
[02:23:28] TEACHER: Right.   {#2440}
[02:23:28] TEACHER: So lock is with consumer one, but consumer two is like literally deleting the entry right   {#2441}
[02:23:33] TEACHER: away.   {#2442}
[02:23:34] TEACHER: So then consumer one had a lock and then consumer two is deleting.   {#2443}
[02:23:36] TEACHER: Then what's the use of that?   {#2444}
[02:23:38] TEACHER: Right.   {#2445}
[02:23:39] TEACHER: But you'd say, why is it possible?   {#2446}
[02:23:41] TEACHER: Because only the consumer that has acquired a lock can reach to this point.   {#2447}
[02:23:46] TEACHER: No one else can.   {#2448}
[02:23:47] TEACHER: So how is this even possible?   {#2449}
[02:23:49] TEACHER: I'll give you that edge case.   {#2450}
[02:23:51] TEACHER: That edge case is with timeout.   {#2451}
[02:23:54] TEACHER: Now imagine there are two consumers.   {#2452}
[02:23:58] TEACHER: Consumer 1, Consumer 2.   {#2453}
[02:24:00] TEACHER: Consumer 1 acquired the log,   {#2454}
[02:24:03] TEACHER: which means in Redis right now,   {#2455}
[02:24:06] TEACHER: Q7 against which is stored Consumer 1.   {#2456}
[02:24:09] TEACHER: And there is a timeout set.   {#2457}
[02:24:11] TEACHER: Now what happened?   {#2458}
[02:24:13] TEACHER: Let's say timeout was set for 5 minutes.   {#2459}
[02:24:16] TEACHER: to read and process the message before it gets deleted,   {#2460}
[02:24:18] TEACHER: before it is releasing the lock.   {#2461}
[02:24:20] TEACHER: But because five minutes expired,   {#2462}
[02:24:24] TEACHER: your redis automatically deleted the key.   {#2463}
[02:24:27] TEACHER: At that point of time,   {#2464}
[02:24:29] TEACHER: consumer two came in and acquired the lock.   {#2465}
[02:24:33] TEACHER: Then consumer one came at this point and released the lock.   {#2466}
[02:24:38] TEACHER: But now that the lock is acquired or is held by consumer two,   {#2467}
[02:24:42] TEACHER: but consumer one thinks that it owns the lock   {#2468}
[02:24:46] TEACHER: While deleting because it read till this point, it got till this point.   {#2469}
[02:24:50] TEACHER: Here the code is written just deleted like this.   {#2470}
[02:24:53] TEACHER: So consumer 1 is actually deleting the lock which is owned by consumer 2.   {#2471}
[02:24:58] TEACHER: This is the edge case.   {#2472}
[02:25:00] TEACHER: So which is why you cannot delete in case the lock is not yours.   {#2473}
[02:25:06] TEACHER: So you have to add this check that get who owns the lock at the moment.   {#2474}
[02:25:12] TEACHER: If it is you then only delete.   {#2475}
[02:25:16] TEACHER: but there is still an edge case that why if this is a normal python code that you're talking about   {#2476}
[02:25:25] TEACHER: now what could happen is you read here you saw you as consumer one entered here started executing   {#2477}
[02:25:33] TEACHER: this function you reached this part you executed this you saw this get you executed this line   {#2478}
[02:25:40] TEACHER: You saw you are the one who is owning the lock.   {#2479}
[02:25:43] TEACHER: But after this, the expiration kicked in.   {#2480}
[02:25:46] TEACHER: The key got evicted.   {#2481}
[02:25:48] TEACHER: Consumer to own the lock.   {#2482}
[02:25:50] TEACHER: And then you deleted.   {#2483}
[02:25:52] TEACHER: So although this condition went true,   {#2484}
[02:25:56] TEACHER: you thought you are owning the lock.   {#2485}
[02:25:58] TEACHER: But you are not actually owning the lock   {#2486}
[02:26:00] TEACHER: because while this executing and this executing   {#2487}
[02:26:03] TEACHER: between this consumer to acquire the lock   {#2488}
[02:26:06] TEACHER: because of expiration, the key got expired,   {#2489}
[02:26:08] TEACHER: consumer to acquire the lock.   {#2490}
[02:26:10] TEACHER: deleting it the lock which is acquired by consumer. Wrong. This is where the distributed system has its glory.   {#2491}
[02:26:18] TEACHER: It is full glory. Right. These edge cases are the one that you have to ensure because then your system is not correct.   {#2492}
[02:26:25] TEACHER: If you are missing out on this edge case. So now what do you have to do? You have to make this atomic. So what do you do?   {#2493}
[02:26:31] TEACHER: So redis specific thing, but there is something called as eval in which you don't write this as python code, but a lua script   {#2494}
[02:26:37] TEACHER: which you run in one shot on Redis.   {#2495}
[02:26:40] TEACHER: So while that one Lua script is running,   {#2496}
[02:26:42] TEACHER: Redis cannot do anything.   {#2497}
[02:26:43] TEACHER: So this entire thing is executed as one Lua script   {#2498}
[02:26:48] TEACHER: instead of a Python code or any language that you are writing.   {#2499}
[02:26:50] TEACHER: So go through Redis, check, eval, check, Lua script,   {#2500}
[02:26:53] TEACHER: how to write, it's exactly written like this.   {#2501}
[02:26:55] TEACHER: But you pass it there.   {#2502}
[02:26:56] TEACHER: So every command of Redis is atomic in nature.   {#2503}
[02:27:00] TEACHER: So while that command is executing,   {#2504}
[02:27:02] TEACHER: nothing else can execute.   {#2505}
[02:27:04] TEACHER: So you execute this two statement as one thing in Redis.   {#2506}
[02:27:07] TEACHER: That's a kind of transaction, kind of, kind of.   {#2507}
[02:27:10] TEACHER: But this ensures that while these two, three statements are running, nothing else would   {#2508}
[02:27:15] TEACHER: run on this.   {#2509}
[02:27:17] TEACHER: This way you know that while this is happening, lock is not acquired by someone else in between   {#2510}
[02:27:22] TEACHER: automatically.   {#2511}
[02:27:24] TEACHER: That's the beauty of it.   {#2512}
[02:27:25] TEACHER: Now, this is a kind of things you need to know about distributed systems, like all these   {#2513}
[02:27:31] TEACHER: things.   {#2514}
[02:27:32] TEACHER: Imagine after every single line, something lag is coming, something's going down, something's   {#2515}
[02:27:38] TEACHER: happening.   {#2516}
[02:27:39] TEACHER: See if your system still functions well.   {#2517}
[02:27:43] TEACHER: This is the granularity that I want all of you to go into rather than just saying, I'll   {#2518}
[02:27:47] TEACHER: have a lot.   {#2519}
[02:27:48] TEACHER: Go into those details.   {#2520}
[02:27:50] TEACHER: That's what makes you better.   {#2521}
[02:27:51] TEACHER: Okay.   {#2522}
[02:27:53] TEACHER: But, but, but it's still not done.   {#2523}
[02:27:56] TEACHER: This one instance of Redis is not horizontally scalable.   {#2524}
[02:28:02] TEACHER: First of all, or it's not fault tolerant.   {#2525}
[02:28:04] TEACHER: Why?   {#2526}
[02:28:04] TEACHER: What if this goes down?   {#2527}
[02:28:06] TEACHER: Now what?   {#2528}
[02:28:08] TEACHER: Who would take care of it subtype?   {#2529}
[02:28:10] TEACHER: Because if this goes down, their entire system is done because no one can acquire the lock.   {#2530}
[02:28:14] TEACHER: No one can move forward.   {#2531}
[02:28:15] TEACHER: The system is at stall.   {#2532}
[02:28:16] TEACHER: How do you solve it?   {#2533}
[02:28:18] TEACHER: Which is where to solve the single point of failure.   {#2534}
[02:28:21] TEACHER: It's a stretch.   {#2535}
[02:28:22] TEACHER: Very few companies use distributed locks.   {#2536}
[02:28:26] TEACHER: Most startups never think of using distributed locks   {#2537}
[02:28:29] TEACHER: because cloud provides you those guarantees.   {#2538}
[02:28:31] TEACHER: But if you are working for AWS, if you are working for GCP,   {#2539}
[02:28:34] TEACHER: you are the one building it, you have to take care of offline.   {#2540}
[02:28:37] TEACHER: So that is where distributed locks come in.   {#2541}
[02:28:40] TEACHER: So the distributed locks concept,   {#2542}
[02:28:42] TEACHER: it only exists to solve the single point of failure problem   {#2543}
[02:28:48] TEACHER: for a single lock system like this.   {#2544}
[02:28:50] TEACHER: This is just one instance run, right?   {#2545}
[02:28:52] TEACHER: I could have just said, run it in cluster.   {#2546}
[02:28:56] TEACHER: That's not how real systems are.   {#2547}
[02:28:58] TEACHER: That is where distributed locks come.   {#2548}
[02:29:00] TEACHER: I've seen it.   {#2549}
[02:29:01] TEACHER: I've used it.   {#2550}
[02:29:02] TEACHER: That's why I'm so, so, so confident about it.   {#2551}
[02:29:04] TEACHER: Why do we need it?   {#2552}
[02:29:05] TEACHER: So distributed locks come in places where you want to avoid the single point of failure   {#2553}
[02:29:11] TEACHER: problem of single lock instances.   {#2554}
[02:29:13] TEACHER: So what do you do is instead of taking lock on one redis, you take locks on multiple redis   {#2555}
[02:29:21] TEACHER: servers.   {#2556}
[02:29:21] TEACHER: So for example, here I'm taking example is five.   {#2557}
[02:29:23] TEACHER: So let's say instead of having one redis server running, you have five redis servers running.   {#2558}
[02:29:30] TEACHER: All independent, no multi master application, nothing.   {#2559}
[02:29:33] TEACHER: All independent.   {#2560}
[02:29:34] TEACHER: These are all independent servers.   {#2561}
[02:29:36] TEACHER: So now what you do?   {#2562}
[02:29:38] TEACHER: Now your acquisition lock looks something like this.   {#2563}
[02:29:41] TEACHER: You, instead of going to just one redis node, you go to all five of them sequentially in parallel anyhow.   {#2564}
[02:29:49] TEACHER: And you try to acquire lock on all five.   {#2565}
[02:29:53] TEACHER: way that we did that right you try to acquire lock on all five if you are succeeded if you   {#2566}
[02:30:00] TEACHER: succeed in acquiring lock on more than 50 percent of nodes i'm not like three four or five nodes   {#2567}
[02:30:07] TEACHER: then you own the lock otherwise you don't own the lock simple so if you own the lock over here   {#2568}
[02:30:14] TEACHER: here here it's three three is more than five or three is more than half of five which is two   {#2569}
[02:30:20] TEACHER: given that you own the lock in majority which means that no matter how many other process   {#2570}
[02:30:25] TEACHER: contained for it you would still hold the majority right so you own the lock which means you acquired   {#2571}
[02:30:30] TEACHER: a lock now you can read the message it's a stretch it takes a toll on performance not even not even   {#2572}
[02:30:36] TEACHER: denying that fact but when you want the correctness of the system when you want fault tolerance in   {#2573}
[02:30:43] TEACHER: your system you have to do this right startups would never see this problem most of things are   {#2574}
[02:30:50] TEACHER: are building it chubby great example for that you have to take care of it right okay but in case let's   {#2575}
[02:30:57] TEACHER: say you try to acquire the lock but you got lock on only two three where you were not able to get   {#2576}
[02:31:02] TEACHER: a lot you will immediately release the lock on these two and so that let other process content   {#2577}
[02:31:06] TEACHER: for it so it's like literally every process coming in trying to acquire the lock every single time   {#2578}
[02:31:12] TEACHER: then someone else would win it like someone would win it eventually and the one who wins it takes   {#2579}
[02:31:17] TEACHER: the log and processes the message. Obviously throughput is gone for a toss. So that is where   {#2580}
[02:31:21] TEACHER: you would see distributed logs not being used in high throughput systems. It is typically used in   {#2581}
[02:31:27] TEACHER: systems that demand high degree of correctness. That's where you would use distributed logs.   {#2582}
[02:31:34] TEACHER: But the idea here is that because of its distributed nature, even if one of the node   {#2583}
[02:31:44] TEACHER: goes down there is no problem at all because there is still other nodes who hold the data   {#2584}
[02:31:49] TEACHER: right obviously in each case is there that if let's say hold the lock in these three instances   {#2585}
[02:31:54] TEACHER: right and then after that these two instances itself go down then i don't know there are still   {#2586}
[02:32:00] TEACHER: each cases there is still problem with correctness in it but still reduces the probability of   {#2587}
[02:32:05] TEACHER: hitting that to a bare minimum right okay and as i said the only reason why we do this is to   {#2588}
---- OWNED SEGMENTS END ----

CTX| [02:32:14] TEACHER: a single node of X and you just make it distributed.   {#2589}
CTX| [02:32:19] TEACHER: This is the idea of distributed system.   {#2590}
CTX| [02:32:21] TEACHER: Every single piece in your architecture needs to be horizontally scalable like this.   {#2591}
CTX| [02:32:25] TEACHER: It has to be distributed like this.   {#2592}
CTX| [02:32:28] TEACHER: Okay.   {#2593}
CTX| [02:32:29] TEACHER: A few things that I want you all of you to read.   {#2594}
CTX| [02:32:32] TEACHER: Chubby, read this paper.   {#2595}
CTX| [02:32:34] TEACHER: This is what Google still uses in production.   {#2596}
CTX| [02:32:36] TEACHER: Day in and day out errors are Chubby props up.   {#2597}
CTX| [02:32:39] TEACHER: Chubby is one of the most fun service or fun systems out there.   {#2598}
CTX| [02:32:44] TEACHER: Amazing paper by Google, Block Service for Loosely Coppled Distributed Systems.   {#2599}
CTX| [02:32:48] TEACHER: This was one of the first papers I ever read as it was part of an assignment.   {#2600}
CTX| [02:32:52] TEACHER: And that's how I got to look at this.   {#2601}
CTX| [02:32:53] TEACHER: Something called as research papers.   {#2602}
CTX| [02:32:55] STUDENT_9: Actually, this was the first paper I read.   {#2603}
CTX| [02:32:57] TEACHER: So Chubby was the first paper I ever read.   {#2604}
CTX| [02:32:59] TEACHER: It's very influential.   {#2605}
CTX| [02:33:01] TEACHER: It's very interesting.   {#2606}
CTX| [02:33:03] TEACHER: Read that.   {#2607}
CTX| [02:33:03] TEACHER: Apart from that, I have tons of blocks on distributed systems, tons of things on my   {#2608}
CTX| [02:33:07] TEACHER: YouTube channel and whatnot.   {#2609}
CTX| [02:33:09] TEACHER: Read it.   {#2610}
CTX| [02:33:10] TEACHER: Redlock, what we discussed, there is an edge case where it would not work.   {#2611}
