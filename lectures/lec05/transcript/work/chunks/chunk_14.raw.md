# chunk_14  OWNS 02:38:15 -> 02:49:59  (segments #2469-#2674, 2001 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:37:16] STUDENT_1: implementing delete right basically you will delete something which has already been expired   {#2462}
CTX| [02:37:20] STUDENT_1: so that means it should be less than now right but here you said ttl is greater than now so that   {#2463}
CTX| [02:37:27] TEACHER: no this is not batch delete this is delete operation by a user yeah even by a user it the   {#2464}
CTX| [02:37:34] STUDENT_1: ttl should be less than now right if detail is less than now which means it is already expired   {#2465}
CTX| [02:37:40] TEACHER: why would you delete something like it's deleted by a user   {#2466}
CTX| [02:37:47] STUDENT_1: Yeah, so if it is, if now is one and TTL is, then, then you won't delete.   {#2467}
CTX| [02:37:53] STUDENT_1: Wait, wait, wait, just a minute.   {#2468}

---- OWNED SEGMENTS START ----
[02:38:15] STUDENT_1: huh yeah go on so so my point is imagine ttl is two second and now is one second so the time to   {#2469}
[02:38:23] TEACHER: live is still two seconds right but now is only ttl is expired at the absolute time of expiration   {#2470}
[02:38:31] STUDENT_1: sorry i just maybe just i'm not getting ttl as detail is expired absolute time of expiration   {#2471}
[02:38:37] TEACHER: when your time needs to when your key needs to be expired it would be like 12 o'clock   {#2472}
[02:38:42] TEACHER: Okay.   {#2473}
[02:38:42] TEACHER: On this particular day.   {#2474}
[02:38:44] STUDENT_12: Okay.   {#2475}
[02:38:45] TEACHER: So then when you're setting you, what you have to do is you have to set it to a magical   {#2476}
[02:38:49] TEACHER: value.   {#2477}
[02:38:49] TEACHER: That's a minus one.   {#2478}
[02:38:50] TEACHER: Right.   {#2479}
[02:38:52] TEACHER: If you had expired at is greater than now, then only you set it other than you don't   {#2480}
[02:38:55] TEACHER: set it.   {#2481}
[02:38:56] TEACHER: Correct.   {#2482}
[02:38:58] TEACHER: If the keys get to expire, then only you are deleting it.   {#2483}
[02:39:01] TEACHER: Otherwise why would you delete it?   {#2484}
[02:39:04] TEACHER: Correct.   {#2485}
[02:39:04] TEACHER: Okay.   {#2486}
[02:39:06] TEACHER: Badge delete is different.   {#2487}
[02:39:07] TEACHER: That is clean up.   {#2488}
[02:39:09] TEACHER: Where you are doing TTL is less than now where keys that are already expired, delete them.   {#2489}
[02:39:16] TEACHER: Here we are updating soft deletes.   {#2490}
[02:39:20] TEACHER: Okay.   {#2491}
[02:39:21] TEACHER: Correct.   {#2492}
[02:39:22] TEACHER: Okay.   {#2493}
[02:39:23] TEACHER: Okay.   {#2494}
[02:39:24] TEACHER: Yeah.   {#2495}
[02:39:25] TEACHER: Right.   {#2496}
[02:39:25] TEACHER: Updating setting TTL to a magical value to a magic number where it is not yet expired.   {#2497}
[02:39:32] TEACHER: You are hard deleting when it is expired.   {#2498}
[02:39:37] STUDENT_1: oh okay so these are yet to be deleted of the first one this is user delete operation   {#2499}
[02:39:42] TEACHER: user triggered a delete of a key okay you are not going ahead and deleting the key hard deleting   {#2500}
[02:39:47] TEACHER: every time otherwise it would require rebalancing of binary tricks correct oh sorry b plus right   {#2501}
[02:39:54] TEACHER: you're not doing you're doing batch delete afterwards okay and that's why you said that   {#2502}
[02:40:01] STUDENT_1: reducing the load on disk only if it TTL is greater than now because anything less than   {#2503}
[02:40:05] STUDENT_1: equal to that is anyways taken care by the batch so you don't want to worry about that correct   {#2504}
[02:40:09] TEACHER: so you would save on disk io by not having to write it to the disk because this update would   {#2505}
[02:40:14] TEACHER: fail because this would not let it match to the keys right okay so even though you are firing an   {#2506}
[02:40:20] TEACHER: update it would not lead to any disk io for expired keys okay so basically heads you win tails also   {#2507}
[02:40:25] STUDENT_1: you win kind of a mechanism because it's greater than now so you will do it if it less than now   {#2508}
[02:40:32] STUDENT_1: Okay. Thank you very much.   {#2509}
[02:40:34] STUDENT_2: Sidesh?   {#2510}
[02:40:36] STUDENT_2: Hey, I have a question on high-level architecture diagram,   {#2511}
[02:40:39] STUDENT_2: like clearing my understanding.   {#2512}
[02:40:41] STUDENT_2: So assuming that the background MySQL provides all asset guarantees,   {#2513}
[02:40:47] STUDENT_2: if we design it as it is without any partitioning,   {#2514}
[02:40:50] STUDENT_2: we guarantee the same asset properties in the KV that we design.   {#2515}
[02:40:55] STUDENT_8: Yes, we do.   {#2516}
[02:40:56] STUDENT_8: Sure.   {#2517}
[02:40:57] STUDENT_2: Yeah. But when we partition it,   {#2518}
[02:41:01] STUDENT_2: I my understanding says we lose atomicity because we do not it's a key based operation   {#2519}
[02:41:10] STUDENT_2: no no yeah I agree like what I'm trying to say is for key based yes but the original store gave you   {#2520}
[02:41:19] STUDENT_2: an additional way of saying for atomicity in a transaction if I have four keys   {#2521}
[02:41:25] STUDENT_2: like take the airline example right all of them will be satisfied now if your fork is in the   {#2522}
[02:41:31] STUDENT_2: partition database three line one and one lies in the second one you can guarantee only three   {#2523}
[02:41:36] TEACHER: value databases don't do that key value databases give you operation on a key based right no no i   {#2524}
[02:41:43] TEACHER: agree i agree so if you're doing cross partition then you cannot have acid as simple as that you   {#2525}
[02:41:48] STUDENT_2: cannot have acid guarantees across partitions got it got it so basically when we say this we will   {#2526}
[02:41:54] STUDENT_2: we still have ACID with the interfaces that we have provided.   {#2527}
[02:41:57] TEACHER: Correct.   {#2528}
[02:41:57] TEACHER: Correct.   {#2529}
[02:41:59] TEACHER: But so distributed transactions, they reduce your performance by a huge margin.   {#2530}
[02:42:05] TEACHER: You typically don't do that.   {#2531}
[02:42:06] TEACHER: So which is where you still guarantee ACID, but within a shot.   {#2532}
[02:42:11] TEACHER: You may still get it.   {#2533}
[02:42:12] TEACHER: For example, for all the keys, I can still guarantee ACID.   {#2534}
[02:42:15] TEACHER: Let's say here I can still guarantee ACID so long as all the keys that I'm   {#2535}
[02:42:20] TEACHER: performing operations on lie on the same node.   {#2536}
[02:42:22] TEACHER: So in this range, I can still guarantee us.   {#2537}
[02:42:26] TEACHER: Yeah.   {#2538}
[02:42:27] STUDENT_8: Thanks.   {#2539}
[02:42:28] STUDENT_8: Yeah.   {#2540}
[02:42:34] STUDENT_6: Hi, Arpit.   {#2541}
[02:42:34] STUDENT_6: So my question is like, I mean, there was a time sometime some years back a person from   {#2542}
[02:42:40] STUDENT_6: IIT Delhi created an app where he for the booking, I think he had created an app which   {#2543}
[02:42:47] STUDENT_6: made faster booking.   {#2544}
[02:42:49] STUDENT_6: So do you have an idea on how he has done that?   {#2545}
[02:42:53] STUDENT_8: No idea about it.   {#2546}
[02:42:55] STUDENT_6: Okay.   {#2547}
[02:42:55] STUDENT_6: The second question was, uh, with respect to mocking of, uh, the distributed system in   {#2548}
[02:42:59] STUDENT_6: local machines, like, I mean, you mentioned about the, my SQL server having, uh, for the   {#2549}
[02:43:05] STUDENT_6: data side, but how can we mock?   {#2550}
[02:43:07] STUDENT_6: I mean, the application app servers and all that you need one app server.   {#2551}
[02:43:11] TEACHER: Why do you read?   {#2552}
[02:43:12] TEACHER: I've been with the entire Atlantic and system local.   {#2553}
[02:43:14] TEACHER: Correct.   {#2554}
[02:43:15] TEACHER: Yes.   {#2555}
[02:43:16] TEACHER: Just focus on the things that matter.   {#2556}
[02:43:19] TEACHER: Don't go into, I want auto scaling and multiple large requests.   {#2557}
[02:43:22] TEACHER: what you want is granular details devils you want to know that you don't want to do that same   {#2558}
[02:43:29] TEACHER: stupid crud operation again and again correct what you want to what you should focus more on   {#2559}
[02:43:34] TEACHER: this part and not other part right just your local machine one database running locally one replica   {#2560}
[02:43:40] TEACHER: running locally that's it focus on that focus on things that matter sure thanks yeah amrik   {#2561}
[02:43:49] STUDENT_2: Yeah, I have a question on that random sampling and deletion.   {#2562}
[02:43:53] STUDENT_2: There was one point that if the deleted ones are greater than 25, then repeat the process.   {#2563}
[02:44:03] STUDENT_2: Shouldn't it be expired ones?   {#2564}
[02:44:06] TEACHER: Are they expired?   {#2565}
[02:44:07] TEACHER: They are deleted.   {#2566}
[02:44:08] TEACHER: These deleted keys, delete from the sample.   {#2567}
[02:44:11] TEACHER: So if the number of deleted keys from the sample are greater than 25%, it would not   {#2568}
[02:44:15] TEACHER: know expired keys count.   {#2569}
[02:44:18] TEACHER: or knows expert is counted.   {#2570}
[02:44:19] TEACHER: And that's already slow operation out of this 20 keys at a sample.   {#2571}
[02:44:23] TEACHER: It is finding good folks.   {#2572}
[02:44:25] TEACHER: Not listen.   {#2573}
[02:44:26] TEACHER: Yeah.   {#2574}
[02:44:27] TEACHER: 20 keys.   {#2575}
[02:44:28] TEACHER: I take sample of 20 keys out of this 20 keys.   {#2576}
[02:44:31] TEACHER: I find which one are expired.   {#2577}
[02:44:33] TEACHER: The ones that are expired.   {#2578}
[02:44:35] TEACHER: I delete them.   {#2579}
[02:44:36] TEACHER: If this deleted keys are more than 25% I repeat the entire process.   {#2580}
[02:44:41] TEACHER: These deleted keys.   {#2581}
[02:44:43] TEACHER: That's what I said, right?   {#2582}
[02:44:44] TEACHER: Delete all the keys that are expired from the sample.   {#2583}
[02:44:46] TEACHER: and you deleted keys are more than 25%   {#2584}
[02:44:48] TEACHER: you repeat the process.   {#2585}
[02:44:51] TEACHER: So it's only   {#2586}
[02:44:52] TEACHER: doing it on the sample   {#2587}
[02:44:54] TEACHER: not on the database because   {#2588}
[02:44:57] TEACHER: having to do it on database   {#2589}
[02:44:58] TEACHER: is a huge operation.   {#2590}
[02:45:01] TEACHER: At a   {#2591}
[02:45:02] TEACHER: given stage there might be millions of keys   {#2592}
[02:45:04] TEACHER: that are expired but not deleted. Here it's   {#2593}
[02:45:06] TEACHER: doing just small operations very quickly.   {#2594}
[02:45:09] TEACHER: So what   {#2595}
[02:45:10] TEACHER: it is trading off, it is trading off   {#2596}
[02:45:12] TEACHER: that there might be some keys   {#2597}
[02:45:16] TEACHER: deleted in population but it's okay there would not be more than 25 percent of that   {#2598}
[02:45:21] TEACHER: because sample represents the population okay okay thanks yeah uh so question around the sampling   {#2599}
[02:45:33] STUDENT_1: thing only uh i wanted to ask that we can't do this in this backed db because uh first thing   {#2600}
[02:45:40] STUDENT_1: what i can think of is uh like we will be getting all the records and then filtering out top   {#2601}
[02:45:46] STUDENT_1: n number of records and we have to do a complete trade and secondly i think the we are if we are   {#2602}
[02:45:51] STUDENT_1: deleting that we have to do a rebalancing or here do you think like any other thing   {#2603}
[02:45:59] TEACHER: which would be hampering us that the first first thing that you said it's not that you because so   {#2604}
[02:46:04] TEACHER: you may not have to pick up entire set of rows and then pick 20 out of it you may pick 20 random   {#2605}
[02:46:11] TEACHER: rows but it would require you to do 20 random disk IOs very slow right because 20 random disk IOs   {#2606}
[02:46:18] TEACHER: your data may be present anywhere in the disk you're reading disk pages randomly that is very   {#2607}
[02:46:22] TEACHER: slow you cannot just read random rows from the database efficiently right in memory you can very   {#2608}
[02:46:27] TEACHER: very easily do that on disk you cannot do it right so picking up 20 keys from an on disk database   {#2609}
[02:46:34] TEACHER: is a costly operation because of which you cannot do it or rather you should not do it because it   {#2610}
[02:46:41] TEACHER: be very slow.   {#2611}
[02:46:42] TEACHER: It would be much better if you just skim through the rows and delete what you   {#2612}
[02:46:46] TEACHER: at this point, delete what is expired rather than doing this optimization.   {#2613}
[02:46:51] TEACHER: In memory, it would work just fine.   {#2614}
[02:46:54] STUDENT_12: Okay.   {#2615}
[02:46:56] TEACHER: But what you said, I just elaborated on the first point.   {#2616}
[02:46:59] TEACHER: Right.   {#2617}
[02:46:59] TEACHER: And that is like, it's not like you can still pick, but picking up random   {#2618}
[02:47:03] TEACHER: 20 keys from it is expensive rather than you don't have to pick all the   {#2619}
[02:47:07] TEACHER: rows and then sample it.   {#2620}
[02:47:09] TEACHER: You can just pick 20 at random, but picking those 20 at random is an expensive operation   {#2621}
[02:47:13] TEACHER: because 20 random discreets very expensive.   {#2622}
[02:47:17] TEACHER: So you typically avoid.   {#2623}
[02:47:22] TEACHER: Any other question, anyone?   {#2624}
[02:47:26] STUDENT_2: I have a bunch of them on the last classes.   {#2625}
[02:47:30] STUDENT_2: Okay.   {#2626}
[02:47:31] STUDENT_2: Let me ask someone, anyone from this class?   {#2627}
[02:47:33] STUDENT_2: Ajay.   {#2628}
[02:47:35] STUDENT_1: yeah hi so i have question regarding we do that start transaction and then   {#2629}
[02:47:42] STUDENT_1: we are doing that forward date and then we income it so in database by default auto commit is true   {#2630}
[02:47:49] STUDENT_1: so will it work without we do start transaction like we do for update no auto commit is true for   {#2631}
[02:47:56] TEACHER: shell if you do auto commit it's on yeah it's on transaction level on transaction level also there   {#2632}
[02:48:03] TEACHER: to take locks and do it exactly how we did it.   {#2633}
[02:48:07] TEACHER: Right.   {#2634}
[02:48:07] TEACHER: Okay.   {#2635}
[02:48:08] TEACHER: So even if auto commit is false or true, so auto commit is true.   {#2636}
[02:48:11] TEACHER: When you say auto commit is true, it means when the transaction is committing, it is   {#2637}
[02:48:13] TEACHER: committing, it is not that every single line it is committing.   {#2638}
[02:48:16] TEACHER: When you start begin transaction and then write and then end transaction, that is actually   {#2639}
[02:48:20] TEACHER: a transaction.   {#2640}
[02:48:21] TEACHER: But if you just fire one standalone SQL statement, that would be committed.   {#2641}
[02:48:25] TEACHER: That's what auto commit true means.   {#2642}
[02:48:27] TEACHER: Okay.   {#2643}
[02:48:28] TEACHER: Right.   {#2644}
[02:48:28] TEACHER: So if you just tried one random statement, they're not wrapping it in a transaction.   {#2645}
[02:48:33] TEACHER: That is where your auto commit true comes in.   {#2646}
[02:48:36] TEACHER: But if you're wrapping it in a transaction, it would anyway not do it.   {#2647}
[02:48:40] TEACHER: Thanks.   {#2648}
[02:48:41] STUDENT_8: Okay.   {#2649}
[02:48:42] TEACHER: Rahul.   {#2650}
[02:48:43] STUDENT_3: Yeah.   {#2651}
[02:48:44] STUDENT_3: Hi, Arpe.   {#2652}
[02:48:44] STUDENT_3: So my question is on the first discussion that we had on locking.   {#2653}
[02:48:48] STUDENT_3: So we discussed two approaches for update and for updates keep locked.   {#2654}
[02:48:52] STUDENT_3: So you told that for the for update thing, we'll run N into N plus one by two queries.   {#2655}
[02:48:59] TEACHER: Not queries, evaluation of queries.   {#2656}
[02:49:01] TEACHER: Evaluation of queries.   {#2657}
[02:49:03] TEACHER: from RN would still fire inquiries internally database will evaluate those.   {#2658}
[02:49:08] STUDENT_3: Yeah. So basically what happened is suppose 120 threads and all of them at the same time got   {#2659}
[02:49:13] STUDENT_3: the seat one. And you told us that the, that one of the thread will get the execution where we'll,   {#2660}
[02:49:21] STUDENT_3: we'll be faster than the others and it will get the first seat and the database will then trigger   {#2661}
[02:49:24] STUDENT_3: the other thread that the row one is filled because they were waiting for the seat one.   {#2662}
[02:49:29] STUDENT_3: and then the database will trigger that the row one is filled.   {#2663}
[02:49:32] STUDENT_3: Now they will reevaluate the query.   {#2664}
[02:49:34] STUDENT_3: The database internally will reevaluate the query.   {#2665}
[02:49:37] STUDENT_3: And that is why you set that N into N plus one by two queries.   {#2666}
[02:49:40] STUDENT_3: Correct.   {#2667}
[02:49:40] STUDENT_3: Correct.   {#2668}
[02:49:40] STUDENT_3: Because for the next 119 seats, now the locking will happen on the seat two.   {#2669}
[02:49:46] STUDENT_3: And then all the, all of them will wait for the seat two and then 118 will wait.   {#2670}
[02:49:50] STUDENT_8: One would move forward.   {#2671}
[02:49:52] STUDENT_8: Yeah.   {#2672}
[02:49:52] STUDENT_3: So on and so forth for the subsequent queries, but for the four updates,   {#2673}
[02:49:57] STUDENT_3: skip logged.   {#2674}
---- OWNED SEGMENTS END ----

CTX| [02:49:59] STUDENT_3: Suppose 120 threads, they went at the same time and for the first query,   {#2675}
CTX| [02:50:04] STUDENT_3: everybody will, uh, but the database will, everybody will first wait for the first   {#2676}
CTX| [02:50:08] STUDENT_3: seat, right?   {#2677}
CTX| [02:50:10] TEACHER: Because that's what your database would not have to do it.   {#2678}
CTX| [02:50:14] TEACHER: Your database internally, when it reads, it does not just read one row.   {#2679}
CTX| [02:50:17] TEACHER: It reads one dispatch when this page may content hundred rows.   {#2680}
CTX| [02:50:20] TEACHER: If it sees that first row is locked by someone, it can immediately move it.   {#2681}
CTX| [02:50:24] TEACHER: It doesn't have to do revaluate the query again.   {#2682}
CTX| [02:50:26] STUDENT_3: Okay.   {#2683}
CTX| [02:50:27] STUDENT_3: So, so what I understand is the query that we wrote was limit one, right?   {#2684}
CTX| [02:50:31] STUDENT_3: Order by limit one.   {#2685}
CTX| [02:50:33] STUDENT_3: So when the, the, that, that read will happen, it will have only one row.   {#2686}
CTX| [02:50:37] TEACHER: No, that's what I'm saying.   {#2687}
CTX| [02:50:39] TEACHER: That's what database intervals is all about.   {#2688}
CTX| [02:50:41] TEACHER: It would not just read one row.   {#2689}
CTX| [02:50:42] TEACHER: Anytime when you read from the database, it does not just read one row.   {#2690}
CTX| [02:50:46] TEACHER: It reads one display that one disk page one B plus three node may contain hundreds of   {#2691}
CTX| [02:50:50] TEACHER: rows.   {#2692}
CTX| [02:50:51] STUDENT_6: Okay.   {#2693}
CTX| [02:50:52] TEACHER: So it does not really have, it can just move to the next one.   {#2694}
CTX| [02:50:56] TEACHER: That's the beauty of it.   {#2695}
CTX| [02:50:57] STUDENT_3: Then, then I could, we can say that only one 20 evaluations will be triggered.   {#2696}
