# chunk_14  OWNS 02:34:42 -> 02:45:51  (segments #2501-#2692, 1808 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:33:42] STUDENT_1: Memory will be much faster because this guy is humongously slow   {#2481}
CTX| [02:33:46] STUDENT_1: when you are reading small reads.   {#2482}
CTX| [02:33:48] STUDENT_1: But if your reads are large, let's say one KB RAM and one KB disk,   {#2483}
CTX| [02:33:54] STUDENT_1: when you do this, then your time spent on reading it is not that huge.   {#2484}
CTX| [02:33:59] STUDENT_1: So you would get minimal difference.   {#2485}
CTX| [02:34:01] STUDENT_1: Like there would still be, this would be like a redis would still be   {#2486}
CTX| [02:34:03] STUDENT_1: a little faster than this, but not humongous.   {#2487}
CTX| [02:34:06] STUDENT_1: Like you would not see massive difference.   {#2488}
CTX| [02:34:08] STUDENT_1: Next part, how your database is actually reading.   {#2489}
CTX| [02:34:12] STUDENT_1: Your disk based databases stores it in terms of B plus three.   {#2490}
CTX| [02:34:15] STUDENT_1: It would have to do the traversal, the disk traversal to reach   {#2491}
CTX| [02:34:19] STUDENT_1: till that point and then read it.   {#2492}
CTX| [02:34:21] STUDENT_1: Right.   {#2493}
CTX| [02:34:21] STUDENT_1: So it's not just one disk read that is happening.   {#2494}
CTX| [02:34:23] STUDENT_1: It is one, two, three, depending on the number of rows that you're   {#2495}
CTX| [02:34:27] STUDENT_1: putting in log of n would be the reads that it would have to do.   {#2496}
CTX| [02:34:30] STUDENT_1: Right.   {#2497}
CTX| [02:34:31] STUDENT_1: So that is the additional cause that you are bearing, but with in   {#2498}
CTX| [02:34:34] STUDENT_1: memory, you get it in one shot because it's hashed in memory.   {#2499}
CTX| [02:34:39] STUDENT_1: Next part.   {#2500}

---- OWNED SEGMENTS START ----
[02:34:42] STUDENT_1: Now here, given that the data is in memory, you are immediately just reading and serving it.   {#2501}
[02:34:47] STUDENT_1: Here, that is not the case, but because you're storing in memory,   {#2502}
[02:34:50] STUDENT_1: the cost that you would require is high.   {#2503}
[02:34:53] STUDENT_1: The amount you can store is limited by the RAM and not by the disk.   {#2504}
[02:34:58] STUDENT_1: With database, the data is limited by the disk and not the RAM.   {#2505}
[02:35:02] STUDENT_1: So you will have larger cache on disk versus a smaller cache in memory.   {#2506}
[02:35:09] STUDENT_1: Decide.   {#2507}
[02:35:13] TEACHER: So it's very subjective.   {#2508}
[02:35:16] TEACHER: So what you're reading, how much are you reading?   {#2509}
[02:35:18] TEACHER: How your data is stored?   {#2510}
[02:35:20] TEACHER: How many iOS would happen?   {#2511}
[02:35:21] TEACHER: What are you actually getting as an advantage?   {#2512}
[02:35:23] TEACHER: How much of data are you storing these factors?   {#2513}
[02:35:26] STUDENT_1: You would have to think about when you make this decision, but overall not much difference.   {#2514}
[02:35:32] STUDENT_1: Yeah.   {#2515}
[02:35:33] TEACHER: As it is right.   {#2516}
[02:35:34] TEACHER: Given that a pre that given that your computation that you are saving is humongous.   {#2517}
[02:35:39] STUDENT_1: Right.   {#2518}
[02:35:40] TEACHER: Right.   {#2519}
[02:35:42] STUDENT_1: gates yeah and yeah ram is more expensive than disk so that is the biggest factor uh one more   {#2520}
[02:35:50] STUDENT_6: thing before so there is some cost we we pay to to uh redis cluster to mean i mean we are taking   {#2521}
[02:35:58] STUDENT_6: as a service i mean i know we thought that redis is an in-house i mean you have to maintain redis   {#2522}
[02:36:02] STUDENT_6: over there so i read somewhere that you have to pay some cost i have no experience with redis   {#2523}
[02:36:07] STUDENT_6: basically but do you have to pay some cost for them to maintain or just you yeah if you're having   {#2524}
[02:36:12] TEACHER: to then put up, then the entire management is done by the cloud.   {#2525}
[02:36:14] TEACHER: So they have their own pricing and billings and whatnot.   {#2526}
[02:36:17] STUDENT_6: So costing also you have to take care of.   {#2527}
[02:36:21] STUDENT_1: Plus if you're piggybacking on the same database in the database, you are   {#2528}
[02:36:25] STUDENT_1: firing this thing on the database, the database will also spend time processing   {#2529}
[02:36:28] STUDENT_1: this, so existing requests will take an effect.   {#2530}
[02:36:30] STUDENT_1: That is also there.   {#2531}
[02:36:32] STUDENT_1: Right.   {#2532}
[02:36:33] STUDENT_1: Lot of things, lot of things.   {#2533}
[02:36:35] TEACHER: It's all trade off.   {#2534}
[02:36:36] TEACHER: Our entire domain is filled with trade offs.   {#2535}
[02:36:38] TEACHER: There is no one right answer to anything.   {#2536}
[02:36:40] TEACHER: even 2 plus 2 plus there is no one right answer.   {#2537}
[02:36:43] TEACHER: I can tweak it, change the formulation   {#2538}
[02:36:45] TEACHER: and basically suggest something else.   {#2539}
[02:36:47] TEACHER: So be always open to trade-offs.   {#2540}
[02:36:50] TEACHER: Asking such questions really helps out everything.   {#2541}
[02:36:55] TEACHER: Nitin, go on.   {#2542}
[02:36:58] TEACHER: Yes, regarding Mirita's question.   {#2543}
[02:37:01] TEACHER: So maybe the interviewer was trying to say   {#2544}
[02:37:04] TEACHER: like whenever your crown job is trying to hard delete   {#2545}
[02:37:07] TEACHER: and let's say there are thousands of records,   {#2546}
[02:37:11] TEACHER: 100k records, okay, which needs to be hard deleted.   {#2547}
[02:37:14] TEACHER: So maybe the performance impact   {#2548}
[02:37:17] TEACHER: would be there.   {#2549}
[02:37:21] TEACHER: So at that time, the DB's availability might be reduced.   {#2550}
[02:37:25] TEACHER: Let's say during that crown job is running,   {#2551}
[02:37:29] TEACHER: maybe there's a high traffic incoming.   {#2552}
[02:37:32] TEACHER: So will the DB be able to perform the hard delete also   {#2553}
[02:37:37] TEACHER: to serve the request from coming.   {#2554}
[02:37:39] TEACHER: That's what I said.   {#2555}
[02:37:40] TEACHER: We have to do staggered deletion.   {#2556}
[02:37:41] STUDENT_1: You cannot delete all 100,000 rows in one shot.   {#2557}
[02:37:44] STUDENT_1: Split it across your entire day.   {#2558}
[02:37:46] STUDENT_1: One hour page job you run   {#2559}
[02:37:48] STUDENT_1: and you delete only 1,000 rows at a time.   {#2560}
[02:37:50] TEACHER: Do staggered deletions to reduce the impact.   {#2561}
[02:37:54] TEACHER: That's a garbage collection.   {#2562}
[02:37:57] STUDENT_1: So do it across the time.   {#2563}
[02:37:59] STUDENT_1: So instead of deleting 100,000 rows in one shot,   {#2564}
[02:38:03] STUDENT_1: split it into, let's say,   {#2565}
[02:38:04] STUDENT_1: half an hour you run job   {#2566}
[02:38:07] STUDENT_1: amount of rows let's say 10 000 rows split across 10 hours sorry sorry 10 000 rows every   {#2567}
[02:38:15] STUDENT_1: hour you delete that would minimize the impact right who said you want to delete thousand   {#2568}
[02:38:19] TEACHER: rows or 100 000 rows in one shop okay uh okay then uh the follow-up thing would be like uh   {#2569}
[02:38:25] TEACHER: if the cron job is running in every like one hour or so then then also that particular cron   {#2570}
[02:38:31] TEACHER: job service uh would uh take up the connection pool one or two connections so then you have   {#2571}
[02:38:37] TEACHER: then you if you don't edit and your data would grow okay you'll gain some you lose some right   {#2572}
[02:38:44] STUDENT_1: if you're saving this then you're losing out office   {#2573}
[02:38:49] TEACHER: there is nothing like you don't win it all never you win something you lose something   {#2574}
[02:38:57] TEACHER: got it okay yeah vishan   {#2575}
[02:39:02] STUDENT_4: Hey, hi. So it's just simple question. So regarding soft delete, if we have like soft delete in the database, like for particular table, sometimes it happens like we also have like uniqueness index index on that particular field.   {#2576}
[02:39:20] STUDENT_4: So sometimes like, uh, for like email user deleted it and wants to like create a new   {#2577}
[02:39:27] STUDENT_4: account with same email ID.   {#2578}
[02:39:29] STUDENT_4: So it would block that.   {#2579}
[02:39:31] STUDENT_4: Use.   {#2580}
[02:39:31] TEACHER: So then there has to be hard in this use case.   {#2581}
[02:39:34] TEACHER: It has to be hard deleted.   {#2582}
[02:39:35] STUDENT_4: Yeah.   {#2583}
[02:39:36] STUDENT_4: Okay.   {#2584}
[02:39:37] STUDENT_4: Got it.   {#2585}
[02:39:38] STUDENT_4: Got.   {#2586}
[02:39:39] TEACHER: Anwar.   {#2587}
[02:39:48] STUDENT_1: Go on.   {#2588}
[02:39:53] TEACHER: Any other question across the entire session?   {#2589}
[02:40:02] STUDENT_7: Can you hear me?   {#2590}
[02:40:03] STUDENT_1: Yeah, now I can hear you.   {#2591}
[02:40:04] STUDENT_1: Got it.   {#2592}
[02:40:05] STUDENT_7: Yeah.   {#2593}
[02:40:05] STUDENT_7: So maybe it all always depends upon the use case, right?   {#2594}
[02:40:09] STUDENT_7: So when you're talking about running cron jobs and all these extra services to believe,   {#2595}
[02:40:16] STUDENT_7: We can also set up the retention policy in the DB itself, right?   {#2596}
[02:40:21] STUDENT_1: Someone has to do it.   {#2597}
[02:40:22] STUDENT_1: So then DB would be having threat that is doing it.   {#2598}
[02:40:25] STUDENT_1: So DB is doing the cron job for you, right?   {#2599}
[02:40:28] STUDENT_1: So you're offloading it to database.   {#2600}
[02:40:30] STUDENT_7: Yeah.   {#2601}
[02:40:30] STUDENT_7: So in this case, I wanted to know if someone has done this from their experience,   {#2602}
[02:40:38] STUDENT_7: what, you know, which of the approaches in general, where you have to make a lot of these   {#2603}
[02:40:43] STUDENT_7: uh interval regular interval of delete which one is better compared comparatively for the   {#2604}
[02:40:49] STUDENT_7: db performance offload it to database do it in a staggered way yeah always works okay   {#2605}
[02:40:58] STUDENT_1: okay   {#2606}
[02:41:07] STUDENT_14: Hello.   {#2607}
[02:41:07] STUDENT_14: Go ahead.   {#2608}
[02:41:08] TEACHER: Am I audible?   {#2609}
[02:41:09] TEACHER: Yeah.   {#2610}
[02:41:10] TEACHER: Yeah.   {#2611}
[02:41:10] TEACHER: Just a follow up question.   {#2612}
[02:41:11] TEACHER: So in one point you mentioned that why is suppose, let's say we are caching on.   {#2613}
[02:41:17] TEACHER: And it is as well as some database, let's say we are considering here post-gree or my   {#2614}
[02:41:21] TEACHER: SQL and we are, you know, caching something on these two databases.   {#2615}
[02:41:25] TEACHER: So why did you say that every time we have to read from the disc?   {#2616}
[02:41:29] TEACHER: Because if let's say we index that field, then it automatically comes to the   {#2617}
[02:41:33] TEACHER: RAM.   {#2618}
[02:41:34] TEACHER: I mean, that is my understanding.   {#2619}
[02:41:37] TEACHER: I'm thinking in the right direction.   {#2620}
[02:41:38] TEACHER: Worst case is reading from the disc, right?   {#2621}
[02:41:41] TEACHER: Worst case is what reading from the disc, right?   {#2622}
[02:41:43] TEACHER: We go in the worst case.   {#2623}
[02:41:45] TEACHER: The best case is that the table is so small that it fits in the ramp and database is keeping   {#2624}
[02:41:49] TEACHER: it in the run.   {#2625}
[02:41:50] TEACHER: Then there is no difference.   {#2626}
[02:41:51] TEACHER: Correct.   {#2627}
[02:41:52] TEACHER: But, but the worst case is, but when we index something, index.   {#2628}
[02:41:59] TEACHER: If you don't have enough Ram to fit in that index, then, okay.   {#2629}
[02:42:05] TEACHER: you always go for the worst case it will always in the worst case it will be a discreet   {#2630}
[02:42:11] TEACHER: okay got it got it all right yeah so after we talked about vendor lock-in   {#2631}
[02:42:20] TEACHER: let's say i work for google so i'm bound to use gcp right in that case yeah then you   {#2632}
[02:42:27] TEACHER: then you you yourself are the vendor   {#2633}
[02:42:31] TEACHER: you would never be moving out right yeah so there is no point of comparison   {#2634}
[02:42:35] STUDENT_1: correct so then vendor lock-in is out of option right and for a lot of companies if i know   {#2635}
[02:42:40] STUDENT_1: that i'll always be on aws no matter what i would not care right so then i don't worry about vendor   {#2636}
[02:42:48] STUDENT_1: lock-in at all in that case okay but then one more question comes if i think from if i wear   {#2637}
[02:42:54] STUDENT_1: the hat of a manager i would think that hey is it easy for me to find talent who knows this   {#2638}
[02:43:00] STUDENT_1: particular technology that only this particular vendor offers versus an open source technology   {#2639}
[02:43:04] STUDENT_1: that everyone uses that is another thing for example aero spike is a pro or rather let's say   {#2640}
[02:43:11] STUDENT_1: a tiger graph is a proprietary graph database and i have let's say uh neo4j i would find hundreds of   {#2641}
[02:43:20] STUDENT_1: developers who know Neo4j, but few who knows Tiger graph, right?   {#2642}
[02:43:24] STUDENT_1: So how easy it is for me to find talent who knows that particular stuff.   {#2643}
[02:43:28] STUDENT_1: That could be another thing that me as a manager would.   {#2644}
[02:43:31] TEACHER: So that is another reason where I might not want to, like, I might be tempted to   {#2645}
[02:43:35] TEACHER: go for an open source technology versus a proprietary stuff.   {#2646}
[02:43:40] TEACHER: And when we were also comparing the differences between DDB and Redis, we   {#2647}
[02:43:44] TEACHER: didn't talk about availability.   {#2648}
[02:43:45] TEACHER: Is it because they both provide us similar kind of.   {#2649}
[02:43:49] TEACHER: Assuming that.   {#2650}
[02:43:49] STUDENT_1: Assuming that.   {#2651}
[02:43:50] STUDENT_1: Availability because there is nothing much in that.   {#2652}
[02:43:53] STUDENT_1: I'm assuming that you need team to maintain availability.   {#2653}
[02:43:56] STUDENT_1: And because it's all about having that engineering expertise   {#2654}
[02:43:59] STUDENT_1: to have that availability, that AWS is giving availability here.   {#2655}
[02:44:02] STUDENT_1: Your engineers would have to ensure that availability.   {#2656}
[02:44:04] STUDENT_1: So keeping availability same because availability is a property   {#2657}
[02:44:08] STUDENT_1: of engineers and not database.   {#2658}
[02:44:11] TEACHER: Yeah.   {#2659}
[02:44:12] TEACHER: Correct.   {#2660}
[02:44:13] TEACHER: And also for designing online offline indicator, we didn't talk   {#2661}
[02:44:16] TEACHER: about how do we tell the last scene?   {#2662}
[02:44:18] TEACHER: Was it out of scope for this?   {#2663}
[02:44:20] TEACHER: scope out of the, we just draw this green and gray, right?   {#2664}
[02:44:23] TEACHER: That was auto scope.   {#2665}
[02:44:24] TEACHER: But if you need that, then you cannot delete the rows.   {#2666}
[02:44:26] TEACHER: Then you keep the roses.   {#2667}
[02:44:29] TEACHER: Okay.   {#2668}
[02:44:29] TEACHER: And you get like the last heartbeat you got is the last thing that you have.   {#2669}
[02:44:34] TEACHER: Got it.   {#2670}
[02:44:34] TEACHER: Thanks.   {#2671}
[02:44:38] STUDENT_3: So my question is about red is actually, uh, so basically what I wanted to ask is about   {#2672}
[02:44:44] STUDENT_3: like, uh, there is a function, uh, and that is that automatically managed, manages   {#2673}
[02:44:50] STUDENT_3: keys after a certain period of time.   {#2674}
[02:44:52] STUDENT_3: Okay.   {#2675}
[02:44:53] STUDENT_3: So my question is about, uh, about the implementation of that.   {#2676}
[02:44:57] STUDENT_3: Like, how is it, is it doing?   {#2677}
[02:45:00] TEACHER: We will discuss this.   {#2678}
[02:45:01] TEACHER: We'll discuss this in third week.   {#2679}
[02:45:02] TEACHER: When we design cache, we'll have this discussion on this.   {#2680}
[02:45:05] TEACHER: How, how, how, how TTL happens.   {#2681}
[02:45:07] TEACHER: We'll have this discussion third week.   {#2682}
[02:45:09] STUDENT_5: Sure.   {#2683}
[02:45:12] TEACHER: Surya.   {#2684}
[02:45:13] STUDENT_5: Yeah.   {#2685}
[02:45:14] STUDENT_5: Uh, I have a question around, uh, um, around the index, how database   {#2686}
[02:45:20] STUDENT_5: index length. Does it, I was under the impression that it always stores on the disc and it,   {#2687}
[02:45:26] STUDENT_5: I mean, yes, does it ever store on Ram as well permanently?   {#2688}
[02:45:30] TEACHER: Ram? No permanent is always this always, always, always, always. I have a video on it on my   {#2689}
[02:45:36] STUDENT_1: YouTube. What's that? How database, how indexes make database read faster. It will come in   {#2690}
[02:45:40] TEACHER: pre-reads for the next week also. So what's that video? You'll understand what, how it   {#2691}
[02:45:44] TEACHER: happens. Okay.   {#2692}
---- OWNED SEGMENTS END ----

CTX| [02:45:51] STUDENT_2: I just wanted to ask this soft delete and archival the same thing.   {#2693}
CTX| [02:45:57] STUDENT_1: No soft delete allows you to archive.   {#2694}
CTX| [02:46:02] STUDENT_2: Okay.   {#2695}
CTX| [02:46:03] STUDENT_1: Because if you do hard delete you don't have time to archive.   {#2696}
CTX| [02:46:07] STUDENT_1: Right.   {#2697}
CTX| [02:46:08] STUDENT_2: Okay.   {#2698}
CTX| [02:46:09] STUDENT_2: So like it happens to be like in one of our project, I don't remember exactly, but they   {#2699}
CTX| [02:46:14] STUDENT_2: were proposing to have soft delete as well as archival.   {#2700}
CTX| [02:46:17] STUDENT_1: So soft delete, you need soft delete so that you can archive after like you can   {#2701}
CTX| [02:46:21] STUDENT_1: archive after a day or so, right?   {#2702}
CTX| [02:46:23] STUDENT_1: Because imagine you are doing hard delete and immediately copying it on S3.   {#2703}
CTX| [02:46:27] STUDENT_1: How slow would that be?   {#2704}
CTX| [02:46:28] STUDENT_1: Correct.   {#2705}
CTX| [02:46:30] STUDENT_1: So which is where, which is where soft delete would allow you to do archival because you   {#2706}
CTX| [02:46:36] TEACHER: would have time to collect all the soft deleted rows and put it into different   {#2707}
CTX| [02:46:39] TEACHER: ways and then do hard delete from here.   {#2708}
CTX| [02:46:42] TEACHER: Okay.   {#2709}
CTX| [02:46:43] TEACHER: Got it.   {#2710}
CTX| [02:46:43] TEACHER: Got it.   {#2711}
CTX| [02:46:44] TEACHER: DK.   {#2712}
CTX| [02:46:47] TEACHER: So in our online and offline problem, we actually, the way we started is, see, whenever we talk about Redis, we generally talk in terms of that, you know, we want to cache something.   {#2713}
