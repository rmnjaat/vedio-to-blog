# chunk_13  OWNS 02:20:10 -> 02:29:53  (segments #2331-#2539, 1661 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:19:13] TEACHER: Imagine bank, would bank use snowflake ID?   {#2314}
CTX| [02:19:15] TEACHER: No.   {#2315}
CTX| [02:19:16] TEACHER: Right.   {#2316}
CTX| [02:19:17] TEACHER: You need strict order in which the transactions have happened.   {#2317}
CTX| [02:19:20] TEACHER: Auto increment is the way to go for them.   {#2318}
CTX| [02:19:22] STUDENT_10: Okay.   {#2319}
CTX| [02:19:25] TEACHER: Yeah.   {#2320}
CTX| [02:19:27] STUDENT_6: But I wanted to clarify my understanding of this, which is Insta5.table ID sequence.   {#2321}
CTX| [02:19:37] STUDENT_6: model. So my understanding is that for every table, we have a sequence ID that is generated   {#2322}
CTX| [02:19:43] STUDENT_3: when we create that table and then we are.   {#2323}
CTX| [02:19:46] TEACHER: No that is done when you have an auto increment ID column, then otherwise you can explicitly   {#2324}
CTX| [02:19:51] TEACHER: create any sequencer that you want with any name.   {#2325}
CTX| [02:19:54] TEACHER: With any name.   {#2326}
CTX| [02:19:56] STUDENT_6: And that sequencer is doing this responsibility of.   {#2327}
CTX| [02:20:01] TEACHER: Atomically increment.   {#2328}
CTX| [02:20:02] TEACHER: it's it's responsibility when you invoke next well it atomically increments it and returns   {#2329}
CTX| [02:20:08] TEACHER: with the value.   {#2330}

---- OWNED SEGMENTS START ----
[02:20:10] TEACHER: When you create a table with an ID column with auto incrementing, this is implicitly   {#2331}
[02:20:16] TEACHER: getting created, but here we don't have that.   {#2332}
[02:20:17] TEACHER: We explicitly create one with the name that I just use table ID sequence.   {#2333}
[02:20:21] TEACHER: It's a name that I do.   {#2334}
[02:20:23] TEACHER: And by that, this is exactly the name that Instagram also has given.   {#2335}
[02:20:27] TEACHER: So that's why I just stick to that.   {#2336}
[02:20:28] TEACHER: But the thing is that you can name it anything that you want.   {#2337}
[02:20:32] TEACHER: sequences as you want. It's just not that you can limit it to just one per table. You can have as   {#2338}
[02:20:36] TEACHER: many as you want. You can have other columns which are auto increment. It's not a hard limit where   {#2339}
[02:20:42] TEACHER: it says only ID can be auto increment. FYI, you can create another column. You can have three columns   {#2340}
[02:20:46] TEACHER: with auto increments in your table. You can have that. But the idea is you create a sequencer whose   {#2341}
[02:20:51] TEACHER: job is to atomically increment and give it to you which is exactly what a static counter did back in   {#2342}
[02:20:56] TEACHER: that other logic. Right? So we just leverage that because we need thread safety. We need   {#2343}
[02:21:02] STUDENT_7: that because of this yeah i understand now thank you akshay uh yeah uh for the gossip part that we   {#2344}
[02:21:12] STUDENT_7: had in the distributor uh for the gossip do they use uh lampard clock implementation usually they   {#2345}
[02:21:22] TEACHER: did not specify anything what they are using but lampard clock is very different for it is not used   {#2346}
[02:21:27] TEACHER: for gossip as far as I know and gossip is normal protocol that you are using uh which   {#2347}
[02:21:33] TEACHER: one I used I used one uh forgot the name what did I use for gossip it has very fancy name   {#2348}
[02:21:43] TEACHER: I forgot about it shit it's very gossipy name like if I remember I'll tell you I need to   {#2349}
[02:21:54] TEACHER: to Google search for that.   {#2350}
[02:21:55] TEACHER: So what they do, it's just they abstracted,   {#2351}
[02:21:58] TEACHER: like they just told in an abstract way   {#2352}
[02:22:00] TEACHER: that they need to do gossip.   {#2353}
[02:22:01] TEACHER: How you do gossip is up to you.   {#2354}
[02:22:03] TEACHER: It can be as simple as making network calls   {#2355}
[02:22:05] TEACHER: to check what the greatest ideas   {#2356}
[02:22:06] TEACHER: and then agree upon something   {#2357}
[02:22:08] TEACHER: and add some buffer to that,   {#2358}
[02:22:09] TEACHER: which both of them agrees on.   {#2359}
[02:22:11] TEACHER: Right?   {#2360}
[02:22:12] TEACHER: It may not be an explicit algorithm per se.   {#2361}
[02:22:14] TEACHER: You can write your own simple gossip thing   {#2362}
[02:22:16] TEACHER: that works fine.   {#2363}
[02:22:17] TEACHER: But I'm not sure what Flickr actually did   {#2364}
[02:22:20] TEACHER: to implement that particular gossip   {#2365}
[02:22:24] TEACHER: not bigger that other logic that need to complete a gossip because it's just a normal thing to say   {#2366}
[02:22:27] TEACHER: you'd have gossip protocol pick your favorite write your own but attend the idea for that is   {#2367}
[02:22:33] TEACHER: at the end of the gossip that you are doing you need to know and you both need to have a consensus   {#2368}
[02:22:39] TEACHER: on the value that the other one would be picking right so long as that is there it's whole screw for   {#2369}
[02:22:47] STUDENT_7: okay and also in the amazon implementation if we could like go to that stage go on   {#2370}
[02:22:56] STUDENT_7: Yeah, in here like can't we like, can't the servers read from a queue that the API generator   {#2371}
[02:23:08] STUDENT_7: actually publishes to?   {#2372}
[02:23:10] STUDENT_7: Why not?   {#2373}
[02:23:10] STUDENT_7: You can do that.   {#2374}
[02:23:12] TEACHER: Keep generating the range, keep pushing it into the queue.   {#2375}
[02:23:15] TEACHER: Let's server read from the queue, but not one idea at a time, but batch of IDs at a   {#2376}
[02:23:19] TEACHER: time.   {#2377}
[02:23:19] STUDENT_7: And we can guarantee like something like exactly once delivery.   {#2378}
[02:23:24] TEACHER: You are offloading the atomicity to Q readness.   {#2379}
[02:23:27] TEACHER: So when you are reading from the Q, that is atomic in nature.   {#2380}
[02:23:30] TEACHER: Right.   {#2381}
[02:23:31] TEACHER: And then the core property you are still playing with is atomic reads.   {#2382}
[02:23:34] TEACHER: Correct.   {#2383}
[02:23:34] TEACHER: You get it from the database.   {#2384}
[02:23:36] TEACHER: You get it from the Q.   {#2385}
[02:23:37] TEACHER: Anywhere it's fine.   {#2386}
[02:23:39] TEACHER: Okay.   {#2387}
[02:23:41] TEACHER: It's not just at end result as you're focusing on the core property that you read.   {#2388}
[02:23:45] TEACHER: Q gives you atomicity.   {#2389}
[02:23:46] TEACHER: Well, works for you.   {#2390}
[02:23:48] TEACHER: Right.   {#2391}
[02:23:48] TEACHER: Database gives you that atomicity.   {#2392}
[02:23:50] TEACHER: Well, works for you.   {#2393}
[02:23:50] TEACHER: I can replace this with DynamoDB.   {#2394}
[02:23:52] TEACHER: Atomic instruction.   {#2395}
[02:23:54] TEACHER: with redis also. That's not a problem. At that core property, what you need, if you   {#2396}
[02:23:57] TEACHER: get from any system out there, it's good enough.   {#2397}
[02:24:01] STUDENT_7: Got it. Okay.   {#2398}
[02:24:03] STUDENT_2: Uh, I'll fit in your blogs graph that you showed, uh, the value shoots up in first   {#2399}
[02:24:11] STUDENT_2: when the result is equal to 6,000 number of records in such a, it is equal to 6,000   {#2400}
[02:24:16] STUDENT_2: and then comes down. Why is it shouldn't it be higher only?   {#2401}
[02:24:22] TEACHER: It depends on what other, what other processes are running on my machine.   {#2402}
[02:24:27] TEACHER: I did it on my local machine.   {#2403}
[02:24:28] TEACHER: I did not use my employer's machine.   {#2404}
[02:24:30] TEACHER: Did on my local machine.   {#2405}
[02:24:31] TEACHER: There are tons of other processes which are running.   {#2406}
[02:24:33] TEACHER: You don't know what all things are contending for that resource.   {#2407}
[02:24:36] TEACHER: That's why you see those spikes.   {#2408}
[02:24:38] TEACHER: Okay.   {#2409}
[02:24:39] STUDENT_2: And for the Instagram implementation, which you showed the last slide,   {#2410}
[02:24:44] STUDENT_2: table ID sequence variable, I think it should be stored in cash, right?   {#2411}
[02:24:48] STUDENT_2: not disks which means not in the table.   {#2412}
[02:24:51] TEACHER: What cash?   {#2413}
[02:24:53] TEACHER: Cash as in local eat rather than making a call to disk.   {#2414}
[02:24:58] TEACHER: Database, it's database implementation.   {#2415}
[02:25:00] TEACHER: We don't really have to, by the way, it has to be persistent.   {#2416}
[02:25:03] TEACHER: If not, if not, what if your database reboots?   {#2417}
[02:25:08] TEACHER: It would start from zero.   {#2418}
[02:25:09] TEACHER: That's wrong.   {#2419}
[02:25:10] TEACHER: Okay.   {#2420}
[02:25:11] TEACHER: Yeah.   {#2421}
[02:25:11] TEACHER: Right.   {#2422}
[02:25:11] TEACHER: Let it be persistent.   {#2423}
[02:25:13] TEACHER: Right.   {#2424}
[02:25:13] TEACHER: And it's database.   {#2425}
[02:25:14] TEACHER: So database would optimize it.   {#2426}
[02:25:15] TEACHER: it would do a periodic   {#2427}
[02:25:17] TEACHER: flash and what not. Let   {#2428}
[02:25:19] TEACHER: database take care of that.   {#2429}
[02:25:21] TEACHER: We just create a sequencer and ask   {#2430}
[02:25:23] TEACHER: it to generate values for us.   {#2431}
[02:25:25] TEACHER: Thanks.   {#2432}
[02:25:27] TEACHER: Great. Any other question anyone?   {#2433}
[02:25:31] TEACHER: No? Brilliant.   {#2434}
[02:25:32] TEACHER: Next week is all about social networks. I'll upload   {#2435}
[02:25:35] TEACHER: the recordings and share the questions   {#2436}
[02:25:37] TEACHER: by the end of the day.   {#2437}
[02:25:39] TEACHER: Mostly by 3 or 5 today, I need to go out   {#2438}
[02:25:41] TEACHER: somewhere. But   {#2439}
[02:25:43] TEACHER: next week is all about social networks.   {#2440}
[02:25:45] TEACHER: We'll go in depth of, don't spoil the fun man.   {#2441}
[02:25:49] TEACHER: Wait, I'll pull you in.   {#2442}
[02:25:50] TEACHER: Wait, wait.   {#2443}
[02:25:52] TEACHER: What am I saying?   {#2444}
[02:25:55] TEACHER: I'll upload the recordings by evening.   {#2445}
[02:25:58] TEACHER: Do read the pre-reads.   {#2446}
[02:26:00] TEACHER: Next week, we'll go in depth of CDNs, how they are used, what they are used.   {#2447}
[02:26:04] TEACHER: We'll build a bunch of social network services, which are essential in it.   {#2448}
[02:26:07] TEACHER: I'll now talk about, now that three weeks are got, we have built enough context.   {#2449}
[02:26:12] TEACHER: Now we'll think from senior engineer's perspective.   {#2450}
[02:26:15] TEACHER: start putting your folks into situation where you have to wear multiple hats in order to implement   {#2451}
[02:26:21] TEACHER: different systems instead of just now systems will become more and more ambiguous that you have to   {#2452}
[02:26:27] TEACHER: come up with requirements you have to come up with design you have to do a bunch of fancy stuff there   {#2453}
[02:26:31] TEACHER: so a lot of interesting things planned for fourth fifth sixth week uh you'll have quite quite bit of   {#2454}
[02:26:36] TEACHER: fun next week right thanks folks see you next week go on harsh yeah actually i thought just we are   {#2455}
[02:26:55] STUDENT_5: So in one of the sentence, you said that the nation works fine.   {#2456}
[02:26:59] STUDENT_5: When that column is comparable.   {#2457}
[02:27:01] STUDENT_5: So does it mean that our columns are primary care, especially those IDs should be numerate.   {#2458}
[02:27:07] TEACHER: No, it's not comparable.   {#2459}
[02:27:09] TEACHER: Lexicographical strings.   {#2460}
[02:27:11] STUDENT_5: Okay.   {#2461}
[02:27:12] TEACHER: If an ID is a string, then your database would be stored in terms of lexicographical ordering   {#2462}
[02:27:16] TEACHER: of the strings.   {#2463}
[02:27:18] STUDENT_5: Yeah.   {#2464}
[02:27:19] STUDENT_5: It's still also comparable.   {#2465}
[02:27:20] STUDENT_5: So, okay.   {#2466}
[02:27:21] STUDENT_5: Both are fine.   {#2467}
[02:27:23] TEACHER: All right.   {#2468}
[02:27:24] STUDENT_5: Yeah.   {#2469}
[02:27:24] STUDENT_5: That's it.   {#2470}
[02:27:24] STUDENT_5: Thank you.   {#2471}
[02:27:25] TEACHER: Yeah.   {#2472}
[02:27:25] STUDENT_8: So I have a question from last class.   {#2473}
[02:27:33] STUDENT_8: Uh, shall I ask now?   {#2474}
[02:27:35] STUDENT_8: Yeah.   {#2475}
[02:27:37] STUDENT_8: regarding the CDC.   {#2476}
[02:27:39] STUDENT_8: So yesterday...   {#2477}
[02:27:40] TEACHER: Yet to talk about it.   {#2478}
[02:27:41] TEACHER: CDC yet to talk about it.   {#2479}
[02:27:42] TEACHER: Fifth thing will go in depth.   {#2480}
[02:27:43] TEACHER: Meanwhile, read.   {#2481}
[02:27:44] TEACHER: Read about it.   {#2482}
[02:27:45] TEACHER: Because others would miss it.   {#2483}
[02:27:47] TEACHER: That's why.   {#2484}
[02:27:47] TEACHER: I'm yet to cover CDC.   {#2485}
[02:27:49] TEACHER: I just sprinkled it.   {#2486}
[02:27:50] TEACHER: If I talk something about it,   {#2487}
[02:27:52] TEACHER: people will get confused.   {#2488}
[02:27:53] TEACHER: I just don't want that to happen.   {#2489}
[02:27:54] TEACHER: Right?   {#2490}
[02:27:55] TEACHER: We'll talk about CDC in depth.   {#2491}
[02:27:57] TEACHER: I'm yet to give you even an introduction   {#2492}
[02:27:58] TEACHER: to what CDC is.   {#2493}
[02:27:59] TEACHER: That will happen in fifth thing.   {#2494}
[02:28:00] TEACHER: I would highly request you   {#2495}
[02:28:02] TEACHER: to wait for your question   {#2496}
[02:28:04] TEACHER: for until fifth thing.   {#2497}
[02:28:05] TEACHER: More than happy to answer it   {#2498}
[02:28:06] TEACHER: when I cover CDC.   {#2499}
[02:28:09] TEACHER: It's just that discussion will digress.   {#2500}
[02:28:11] TEACHER: I'll start spitting out terms.   {#2501}
[02:28:13] TEACHER: People will get confused.   {#2502}
[02:28:14] TEACHER: I'm just trying to minimize the conclusion that might happen.   {#2503}
[02:28:19] TEACHER: Thanks.   {#2504}
[02:28:21] TEACHER: Anupam?   {#2505}
[02:28:23] STUDENT_6: I had a question about Twitter's snowflake implementation.   {#2506}
[02:28:29] STUDENT_6: If my understanding is correct, the request must be round robin to increase.   {#2507}
[02:28:34] TEACHER: Not necessarily.   {#2508}
[02:28:34] TEACHER: Why?   {#2509}
[02:28:35] TEACHER: You're not guaranteeing atomicity.   {#2510}
[02:28:37] STUDENT_6: not guarantee monotonicity are you? Yeah, that was my follow up. If we want to guarantee   {#2511}
[02:28:42] TEACHER: monotonicity, you cannot. Clocks can go out of sync. Yeah. You cannot guarantee monotonicity   {#2512}
[02:28:51] TEACHER: in distributed setup. That's the thing. That's holy grail. That's, that's, that's written   {#2513}
[02:28:57] TEACHER: in stone, right? Because it becomes extremely inefficient for you to guarantee monotonicity   {#2514}
[02:29:02] TEACHER: when it's in distributed setup.   {#2515}
[02:29:05] TEACHER: Right?   {#2516}
[02:29:06] TEACHER: So you give up on those constraints.   {#2517}
[02:29:07] TEACHER: But you still get roughly sorted.   {#2518}
[02:29:09] TEACHER: So you try to get the max that you can   {#2519}
[02:29:11] TEACHER: with rough sortability.   {#2520}
[02:29:13] TEACHER: Right?   {#2521}
[02:29:14] STUDENT_6: Got it.   {#2522}
[02:29:16] STUDENT_6: And we talked about banks and all   {#2523}
[02:29:18] STUDENT_6: where we have use cases for strict monotonicity.   {#2524}
[02:29:21] STUDENT_6: Then we have to reduce our throughput requirements a bit.   {#2525}
[02:29:25] STUDENT_6: And then...   {#2526}
[02:29:25] STUDENT_6: Correct.   {#2527}
[02:29:26] TEACHER: That's what you do.   {#2528}
[02:29:28] STUDENT_6: Got it.   {#2529}
[02:29:29] TEACHER: Yeah.   {#2530}
[02:29:30] TEACHER: Brilliant.   {#2531}
[02:29:31] TEACHER: Thanks.   {#2532}
[02:29:32] TEACHER: Again, Simranath, I'll definitely take a question on CDC.   {#2533}
[02:29:36] TEACHER: It's not that I'm not taking it up right now.   {#2534}
[02:29:38] TEACHER: It's more about I don't want to have people to be confused about new terms that I spit out.   {#2535}
[02:29:43] TEACHER: That's right.   {#2536}
[02:29:44] TEACHER: More than happy to do it when I actually formally cover CDC.   {#2537}
[02:29:50] TEACHER: Thanks, folks, for tuning in.   {#2538}
[02:29:52] TEACHER: See you, folks, next week.   {#2539}
