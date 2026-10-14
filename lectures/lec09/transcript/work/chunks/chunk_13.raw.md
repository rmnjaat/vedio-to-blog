# chunk_13  OWNS 02:23:30 -> 02:36:28  (segments #2491-#2761, 2330 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:22:35] TEACHER: want to make a network call every time someone reads to their service, because then uptime of   {#2471}
CTX| [02:22:40] TEACHER: our service depends on the type of their   {#2472}
CTX| [02:22:42] TEACHER: service because of synchronous dependency.   {#2473}
CTX| [02:22:44] TEACHER: That's why wherever we can model things   {#2474}
CTX| [02:22:46] TEACHER: are synchronous. And here   {#2475}
CTX| [02:22:48] TEACHER: we very beautifully   {#2476}
CTX| [02:22:50] TEACHER: see how Kafka becomes   {#2477}
CTX| [02:22:52] TEACHER: the glue   {#2478}
CTX| [02:22:54] TEACHER: that joins these multiple   {#2479}
CTX| [02:22:56] TEACHER: services together.   {#2480}
CTX| [02:22:58] TEACHER: And which is why Kafka became   {#2481}
CTX| [02:23:00] TEACHER: widely famous because of   {#2482}
CTX| [02:23:02] TEACHER: this ability. The CQRS   {#2483}
CTX| [02:23:04] TEACHER: pattern that you might have heard of is   {#2484}
CTX| [02:23:06] TEACHER: because of this. It makes things so   {#2485}
CTX| [02:23:08] TEACHER: neat. And then it just   {#2486}
CTX| [02:23:11] TEACHER: This right so just to cover this few things on the side like just to basically   {#2487}
CTX| [02:23:16] TEACHER: formally cover it this is what our flow would look like for this very simple   {#2488}
CTX| [02:23:21] TEACHER: looking page this is what we would do so this is your not image service but this   {#2489}
CTX| [02:23:26] TEACHER: is your post service.   {#2490}

---- OWNED SEGMENTS START ----
[02:23:30] TEACHER: From post service whenever a post is published you push a message to Kafka.   {#2491}
[02:23:34] TEACHER: Kafka that post message that one message is consumed by a hashtag extractor   {#2492}
[02:23:38] TEACHER: which extracts the hashtag from the caption   {#2493}
[02:23:41] TEACHER: and it creates, if there are n hashtags,   {#2494}
[02:23:43] TEACHER: it creates n entries in this another Kafka   {#2495}
[02:23:47] TEACHER: in which it can be same Kafka, another topic.   {#2496}
[02:23:49] TEACHER: But the idea is separation of concern.   {#2497}
[02:23:52] TEACHER: Post underscore hashtag, it creates trouble   {#2498}
[02:23:53] TEACHER: that this is the partition by hashtag.   {#2499}
[02:23:56] TEACHER: This is the post, right?   {#2500}
[02:23:58] TEACHER: Now, all of this is consumed by this counting servers   {#2501}
[02:24:00] TEACHER: whose job is that for each,   {#2502}
[02:24:02] TEACHER: because there are three partitions, three servers,   {#2503}
[02:24:05] TEACHER: all of them receive the same thing.   {#2504}
[02:24:06] TEACHER: all post hashtag tuples go to the same server for a particular hashtag you can efficiently batch   {#2505}
[02:24:13] TEACHER: and do count plus equal to n on this database other than doing count plus plus so this becomes   {#2506}
[02:24:18] TEACHER: really efficient path for us this is a classic adapter that we see because you cannot change this   {#2507}
[02:24:24] TEACHER: because search notification every other service is dependent on this but for you to proceed you need   {#2508}
[02:24:30] TEACHER: a different type of partitioning key.   {#2509}
[02:24:32] TEACHER: That is where you   {#2510}
[02:24:34] TEACHER: adapt. You write an adapter   {#2511}
[02:24:36] TEACHER: that does this.   {#2512}
[02:24:37] TEACHER: It's a very common way to have   {#2513}
[02:24:40] TEACHER: two Kafka combined   {#2514}
[02:24:42] TEACHER: with a simple processor which just   {#2515}
[02:24:44] TEACHER: changes the order or repartitions.   {#2516}
[02:24:46] TEACHER: It's a very common practice.   {#2517}
[02:24:49] TEACHER: Apart from that   {#2518}
[02:24:50] TEACHER: you have a hashtag API workers.   {#2519}
[02:24:52] TEACHER: Whenever user gets a hashtag you can   {#2520}
[02:24:54] TEACHER: serve it via hashtag API workers.   {#2521}
[02:24:57] TEACHER: Normal get request.   {#2522}
[02:24:58] TEACHER: Whenever the request comes   {#2523}
[02:25:00] TEACHER: It talks to the database, gets this entire document that we just built.   {#2524}
[02:25:05] TEACHER: This entire document, it reads it and it sends it to the user.   {#2525}
[02:25:09] TEACHER: Now, given that a lot of things would not change that frequently,   {#2526}
[02:25:13] TEACHER: you can put that endpoint behind the CDN.   {#2527}
[02:25:17] TEACHER: CDN, caching, JSON responses, not the images.   {#2528}
[02:25:23] TEACHER: At the end, whatever origin sends it, caches it.   {#2529}
[02:25:26] TEACHER: It does not care if it is image or JSON or text or whatnot.   {#2530}
[02:25:30] TEACHER: for you to render that page immediately,   {#2531}
[02:25:33] TEACHER: you put it behind the CDN.   {#2532}
[02:25:37] TEACHER: As in Palestine.   {#2533}
[02:25:38] TEACHER: This would give you very good user experience   {#2534}
[02:25:40] TEACHER: or this would give a very good experience to your users   {#2535}
[02:25:43] TEACHER: where the user does not have to wait   {#2536}
[02:25:45] TEACHER: relatively longer time to read from the DB   {#2537}
[02:25:47] TEACHER: and directly serve from the CDN.   {#2538}
[02:25:50] TEACHER: CDN will take care of geographically distributing it   {#2539}
[02:25:52] TEACHER: and serving it and whatnot.   {#2540}
[02:25:53] TEACHER: Right?   {#2541}
[02:25:54] TEACHER: And this is what would make things very efficient.   {#2542}
[02:25:57] TEACHER: and add an optional cache.   {#2543}
[02:26:00] TEACHER: Hard stretch.   {#2544}
[02:26:01] TEACHER: I don't care if you are using CDN,   {#2545}
[02:26:03] TEACHER: then you don't need cache.   {#2546}
[02:26:04] TEACHER: Otherwise, add cache and not CDN.   {#2547}
[02:26:06] TEACHER: Pick your favorite.   {#2548}
[02:26:07] TEACHER: I would go for CDN any day   {#2549}
[02:26:09] TEACHER: because the response is not changing.   {#2550}
[02:26:11] TEACHER: Now, whenever the top 100 photos would change   {#2551}
[02:26:14] TEACHER: or count would change   {#2552}
[02:26:15] TEACHER: or periodically have some TTL configured on the CDN.   {#2553}
[02:26:18] TEACHER: After that, the key would expire.   {#2554}
[02:26:20] TEACHER: It would go to API.   {#2555}
[02:26:21] TEACHER: It would go to DB, load it, cache it, and then serve it.   {#2556}
[02:26:25] TEACHER: add some TTL, do explicit invalidation over here.   {#2557}
[02:26:28] TEACHER: And that would give your user very good experience.   {#2558}
[02:26:31] TEACHER: Right?   {#2559}
[02:26:32] TEACHER: So either CDN or cash, pick your favorite.   {#2560}
[02:26:35] TEACHER: And then the popularity service that our data science team built,   {#2561}
[02:26:38] TEACHER: they notify us whenever they have new top 100 photos created   {#2562}
[02:26:41] TEACHER: or generated for a particular hashtag.   {#2563}
[02:26:44] TEACHER: So what they do is they send it to their Kafka.   {#2564}
[02:26:48] TEACHER: We consume it from their Kafka.   {#2565}
[02:26:50] TEACHER: It's not going to be very hathopity.   {#2566}
[02:26:51] TEACHER: So it's fine.   {#2567}
[02:26:52] TEACHER: And we put it onto a database.   {#2568}
[02:26:54] TEACHER: What we are doing is to give user a very good response time.   {#2569}
[02:26:58] TEACHER: We are keeping all the information over here.   {#2570}
[02:27:00] TEACHER: All the top 100 photos are generated for popularity service.   {#2571}
[02:27:02] TEACHER: They might store it in their database also.   {#2572}
[02:27:05] TEACHER: But what we are doing is we are just copying the data and storing it over here   {#2573}
[02:27:09] TEACHER: because we want to guarantee very fast response time.   {#2574}
[02:27:12] TEACHER: So why not to do that?   {#2575}
[02:27:14] TEACHER: So you are just accepting it and formatting it and structuring it in our own way   {#2576}
[02:27:18] TEACHER: and storing it in our database.   {#2577}
[02:27:20] TEACHER: And this way you give a very good user experience   {#2578}
[02:27:24] TEACHER: When user clicks on a hashtag and open this hashtag page.   {#2579}
[02:27:28] TEACHER: Let me just formally cover it because I want to touch upon this very nice way of looking into systems.   {#2580}
[02:27:36] TEACHER: This is how almost every single senior engineer works.   {#2581}
[02:27:40] TEACHER: So a way to build this thing really well or not this or any system really well.   {#2582}
[02:27:46] TEACHER: Understand what your read path and write paths are and tackle one at a time.   {#2583}
[02:27:54] TEACHER: Pick any system that we discussed till date, literally any.   {#2584}
[02:27:57] TEACHER: You will always see there are some path that does the writing to the database and there   {#2585}
[02:28:04] TEACHER: are some path that read from the database.   {#2586}
[02:28:06] TEACHER: For anything that you do, you are writing and reading.   {#2587}
[02:28:10] TEACHER: So anytime you are devising a system, anytime you are designing a system, anytime you are   {#2588}
[02:28:14] TEACHER: architecting a system, always pick one path and see if it is very heavily optimized or   {#2589}
[02:28:20] TEACHER: not.   {#2590}
[02:28:20] TEACHER: For example, we start with something really simple as this.   {#2591}
[02:28:27] TEACHER: So from the post service, we have Kafka, we are writing it some workers.   {#2592}
[02:28:31] TEACHER: We just drew this, very basic diagram.   {#2593}
[02:28:33] TEACHER: We drew some hashtag workers and we are updating it over here.   {#2594}
[02:28:36] TEACHER: And we have a hashtag API, which is reading from the database and serving it.   {#2595}
[02:28:41] TEACHER: Now, this is where your write path is, where you're writing to the database.   {#2596}
[02:28:45] TEACHER: And this is where your read path is, we're reading from the database.   {#2597}
[02:28:49] TEACHER: Now the next step is we think that, Hey, have we done it all?   {#2598}
[02:28:52] TEACHER: Have we optimized our right path?   {#2599}
[02:28:56] TEACHER: So if you think about, sorry, have you optimized our read path?   {#2600}
[02:28:58] TEACHER: Read path is easy.   {#2601}
[02:28:59] TEACHER: You typically add cache and CDN to solve it.   {#2602}
[02:29:01] TEACHER: Right?   {#2603}
[02:29:01] TEACHER: So what you do is you take a look at read path and see, are you doing enough to optimize   {#2604}
[02:29:06] TEACHER: the read side of it?   {#2605}
[02:29:07] TEACHER: You might think, Hey, I have a DBA.   {#2606}
[02:29:09] TEACHER: Let me add a cache.   {#2607}
[02:29:10] TEACHER: If not, let me add a CDN.   {#2608}
[02:29:12] TEACHER: Right?   {#2609}
[02:29:13] TEACHER: So two ways to add it, pick your favorite, but see that you are having bare minimum latency   {#2610}
[02:29:18] TEACHER: to read path optimization.   {#2611}
[02:29:21] TEACHER: Once read path is done, then you think about write path.   {#2612}
[02:29:24] TEACHER: Are you doing enough on the right path?   {#2613}
[02:29:26] TEACHER: So which is where you see that if this is my right path, am I doing the bare minimum?   {#2614}
[02:29:31] TEACHER: Something as simple as from post service to Kafka, I need to have just one API call to   {#2615}
[02:29:37] TEACHER: write it.   {#2616}
[02:29:37] TEACHER: If I have two API calls, then hey, what I need to distribute transaction and ensuring consistency   {#2617}
[02:29:42] TEACHER: and whatnot.   {#2618}
[02:29:43] TEACHER: Right.   {#2619}
[02:29:43] TEACHER: Plus given you need very low,   {#2620}
[02:29:46] TEACHER: assume you need low latency.   {#2621}
[02:29:48] TEACHER: Are you doing the bare minimum work to write to Kafka?   {#2622}
[02:29:51] TEACHER: Seems like that.   {#2623}
[02:29:52] TEACHER: Are you doing from Kafka bare minimum thing to write,   {#2624}
[02:29:54] TEACHER: to process by hashtag workers?   {#2625}
[02:29:56] TEACHER: So the number of workers that you need to process from Kafka   {#2626}
[02:29:58] TEACHER: will be equal to the number of partitions that you have over here.   {#2627}
[02:30:01] TEACHER: From here, are you doing bare minimum to write to the database server?   {#2628}
[02:30:06] TEACHER: Atomic updates, partial updates and whatnot.   {#2629}
[02:30:08] TEACHER: Are you doing the bare minimum?   {#2630}
[02:30:09] TEACHER: Are you provisioning your database enough?   {#2631}
[02:30:11] TEACHER: Are you consuming it at decent enough pace or more?   {#2632}
[02:30:15] TEACHER: So these at every single step, you think about it, that are you doing the bare minimum thing   {#2633}
[02:30:21] TEACHER: that you have to do when you are writing?   {#2634}
[02:30:23] TEACHER: Same thing goes for it.   {#2635}
[02:30:24] TEACHER: So it's very easy way.   {#2636}
[02:30:26] TEACHER: And almost every single senior engineer follows this where any system that we, that we design,   {#2637}
[02:30:32] TEACHER: we always look at the read path and the write path and tackle each one of them separately.   {#2638}
[02:30:37] TEACHER: It gives very structured way to build robust systems.   {#2639}
[02:30:43] TEACHER: And it's really easy to go that route.   {#2640}
[02:30:47] TEACHER: So always, whenever you are designing anything, anything, think of these types.   {#2641}
[02:30:52] TEACHER: And when you are picking one path, think of the implementation.   {#2642}
[02:30:57] TEACHER: Think of what can go wrong.   {#2643}
[02:30:59] TEACHER: Mohan, I'll take your question.   {#2644}
[02:31:00] TEACHER: Disturb it just bugs me.   {#2645}
[02:31:02] TEACHER: That's why.   {#2646}
[02:31:07] TEACHER: Lost the flow.   {#2647}
[02:31:08] TEACHER: Wait, where was I?   {#2648}
[02:31:10] TEACHER: That's why I don't like that.   {#2649}
[02:31:16] TEACHER: Read path, write path optimization.   {#2650}
[02:31:18] TEACHER: Okay.   {#2651}
[02:31:18] TEACHER: So this is what happens when you are thrown into this situation.   {#2652}
[02:31:23] TEACHER: Sorry.   {#2653}
[02:31:26] TEACHER: Wait, let me get back on that flow.   {#2654}
[02:31:30] TEACHER: Where was I?   {#2655}
[02:31:30] TEACHER: I want to.   {#2656}
[02:31:31] TEACHER: Cover.   {#2657}
[02:31:32] TEACHER: Okay.   {#2658}
[02:31:33] TEACHER: Ha.   {#2659}
[02:31:33] TEACHER: Implementation.   {#2660}
[02:31:34] TEACHER: Implementation.   {#2661}
[02:31:34] TEACHER: I remember.   {#2662}
[02:31:35] TEACHER: Okay.   {#2663}
[02:31:35] TEACHER: So when you're picking up any path optimization, read path, write path, anything at every single   {#2664}
[02:31:41] TEACHER: step, think of implementation because that's where most of things are actually neglected.   {#2665}
[02:31:48] TEACHER: Don't do that.   {#2666}
[02:31:49] TEACHER: Think of the implementation and see.   {#2667}
[02:31:51] TEACHER: So here, if you look carefully, you might see when my user is making a call to get things   {#2668}
[02:31:57] TEACHER: using hashtag API, which just talks to the database.   {#2669}
[02:32:00] TEACHER: path optimized enough what can go wrong over here if this is just one database having high spikes   {#2670}
[02:32:05] TEACHER: what would happen pick just one path and see how will you implement what happens when every single   {#2671}
[02:32:13] TEACHER: thing blows up what if there's a huge amount of load on your database how are you handling it   {#2672}
[02:32:17] TEACHER: are you partitioning partitioning do you need replicas if not add if yes add it if not if you   {#2673}
[02:32:24] TEACHER: are okay handling that scale by those many partitions good enough you may add cash if it   {#2674}
[02:32:31] TEACHER: then you can add a cache to reduce the load on your database.   {#2675}
[02:32:34] TEACHER: If that is not enough, add a CDN in front of it to do it.   {#2676}
[02:32:38] TEACHER: Can you do it? Yes, you can.   {#2677}
[02:32:40] TEACHER: Thinking of implementation, making everything blow out of proportion and fixing it.   {#2678}
[02:32:46] TEACHER: One path at a time is the way to go.   {#2679}
[02:32:49] TEACHER: That's an easiest structured way to build any system.   {#2680}
[02:32:52] TEACHER: Same thing goes for right path.   {#2681}
[02:32:54] TEACHER: Once we draw this basic diagram, let's elaborate on this.   {#2682}
[02:32:57] TEACHER: What could go wrong?   {#2683}
[02:32:58] TEACHER: When we think of it for this service, for the post service,   {#2684}
[02:33:00] TEACHER: we are writing it in Kafka, it will partition by user ID.   {#2685}
[02:33:03] TEACHER: But for hashtag workers to consume, is this good enough?   {#2686}
[02:33:06] TEACHER: You may think that, Hey, I can count.   {#2687}
[02:33:08] TEACHER: Let's say if I just do this for a particular post, I get this from the post.   {#2688}
[02:33:14] TEACHER: I extract eight hashtags, right?   {#2689}
[02:33:16] TEACHER: I expect, let's say that post has eight hashtags.   {#2690}
[02:33:18] TEACHER: I expected eight aspects.   {#2691}
[02:33:20] TEACHER: I can do eight writes onto this DB.   {#2692}
[02:33:23] TEACHER: Is this optimal or not?   {#2693}
[02:33:24] TEACHER: You think about implementation.   {#2694}
[02:33:26] TEACHER: You thought about implementation that day.   {#2695}
[02:33:28] TEACHER: From this post, I get the caption from this caption.   {#2696}
[02:33:30] TEACHER: I get eight hashtags.   {#2697}
[02:33:31] TEACHER: I make eight rights onto this DB.   {#2698}
[02:33:33] TEACHER: Now I think about optimality.   {#2699}
[02:33:34] TEACHER: Is this good enough?   {#2700}
[02:33:37] TEACHER: Not really.   {#2701}
[02:33:38] TEACHER: I'm making a lot of micro rights onto database.   {#2702}
[02:33:40] TEACHER: So which means that, hey, I want batching.   {#2703}
[02:33:42] TEACHER: Given that you want batching,   {#2704}
[02:33:44] TEACHER: you want all the things for a particular hashtag   {#2705}
[02:33:46] TEACHER: to go to a particular server.   {#2706}
[02:33:48] TEACHER: So for you to patch it,   {#2707}
[02:33:49] TEACHER: which means what you do,   {#2708}
[02:33:51] TEACHER: you extract the hashtag   {#2709}
[02:33:53] TEACHER: and then you re-ingest it into another Kafka   {#2710}
[02:33:56] TEACHER: by hashtag.   {#2711}
[02:33:58] TEACHER: where it is partitioned by hashtag.   {#2712}
[02:33:59] TEACHER: This way, everything for a particular hashtag goes to one server,   {#2713}
[02:34:04] TEACHER: which batches and then writes to the DB.   {#2714}
[02:34:07] TEACHER: So you tackle one path at a time.   {#2715}
[02:34:10] TEACHER: See if every single thing is optimal or not.   {#2716}
[02:34:13] TEACHER: Can you make it better?   {#2717}
[02:34:14] TEACHER: And then you re-architect it.   {#2718}
[02:34:16] TEACHER: This is how almost all senior engineers operate.   {#2719}
[02:34:20] TEACHER: Read path, you must have heard read path, write path, optimization and what.   {#2720}
[02:34:23] TEACHER: This is what they are talking about.   {#2721}
[02:34:25] TEACHER: This is what whenever you're designing any system,   {#2722}
[02:34:28] TEACHER: on these lines think about implementation think about blowing it out of proportion and then re   {#2723}
[02:34:32] TEACHER: architect and solve that problem right and this is how you design that one simple looking hashtag   {#2724}
[02:34:37] TEACHER: page where we are trying to ensure a very fast response time and few things that just cute key   {#2725}
[02:34:45] TEACHER: takeaways from this design first how we used kafka is glue here here and here so this was   {#2726}
[02:34:51] TEACHER: made where all other service work out search notification feed and whatnot this is where we   {#2727}
[02:34:58] TEACHER: We repartitioned it so as to make our writes more efficient.   {#2728}
[02:35:01] TEACHER: It is a standard adapter pattern of Kafka.   {#2729}
[02:35:03] TEACHER: But here you see Kafka acting as a very nice glue.   {#2730}
[02:35:06] TEACHER: And this where your data science team is interacting with you as backend engineer through Kafka.   {#2731}
[02:35:12] TEACHER: Right.   {#2732}
[02:35:12] TEACHER: Really simple thing.   {#2733}
[02:35:14] TEACHER: Everyone is decoupled.   {#2734}
[02:35:15] TEACHER: Everyone's working at their own speed pace.   {#2735}
[02:35:17] TEACHER: First thing.   {#2736}
[02:35:18] TEACHER: Second, we learned this adapter pattern.   {#2737}
[02:35:20] TEACHER: Third, we learned this effective batching and counting because as part of nine, you   {#2738}
[02:35:23] TEACHER: will do count plus plus.   {#2739}
[02:35:25] TEACHER: That's not how a system works.   {#2740}
[02:35:28] TEACHER: at every step you do you find that pattern and you fix it you learn about batching and counting and   {#2741}
[02:35:33] TEACHER: the standard way to or almost a standard way to think about system is read path and write path   {#2742}
[02:35:39] TEACHER: optimization think of what the read paths are think of what the right paths are and then tackle   {#2743}
[02:35:42] TEACHER: one at a time because there's standard practice is to scale the read separately in the right shape   {#2744}
[02:35:46] TEACHER: right okay and this is all what i wanted to cover now i'll take questions folks who want to drop   {#2745}
[02:35:52] TEACHER: up will be to drop off everything else will be anyway part of the recording uh tomorrow we'll   {#2746}
[02:35:58] TEACHER: social networks again.   {#2747}
[02:36:00] TEACHER: And we'll be talking about,   {#2748}
[02:36:02] TEACHER: we'll be tomorrow implementing   {#2749}
[02:36:03] TEACHER: image optimization service. Today we   {#2750}
[02:36:05] TEACHER: saw how CDN, how we can leverage   {#2751}
[02:36:07] TEACHER: CDN to do that. Tomorrow we'll implement   {#2752}
[02:36:09] TEACHER: it. And very interesting   {#2753}
[02:36:12] TEACHER: problem assessment   {#2754}
[02:36:13] TEACHER: around message indicators.   {#2755}
[02:36:15] TEACHER: We'll talk about that in there.   {#2756}
[02:36:17] TEACHER: I'll upload a recording by evening   {#2757}
[02:36:19] TEACHER: and notes and recordings by the evening   {#2758}
[02:36:21] TEACHER: you'll be notified over email.   {#2759}
[02:36:24] TEACHER: Okay.   {#2760}
[02:36:25] TEACHER: Yeah, something caught.   {#2761}
---- OWNED SEGMENTS END ----

CTX| [02:36:28] STUDENT_1: So, Arfit, one question that I have is,   {#2762}
CTX| [02:36:30] STUDENT_1: you said that read path and write path have to be analyzed   {#2763}
CTX| [02:36:33] STUDENT_1: and we should blow it in proportion,   {#2764}
CTX| [02:36:35] STUDENT_1: out of proportion to see how the scalability and all that stuff, right?   {#2765}
CTX| [02:36:39] STUDENT_1: But one question I have is, you have put a separate service   {#2766}
CTX| [02:36:43] STUDENT_1: or you can say simple service, whatever,   {#2767}
CTX| [02:36:46] STUDENT_1: just for reading and for writing,   {#2768}
CTX| [02:36:49] STUDENT_1: you have put another separate service, right?   {#2769}
CTX| [02:36:52] STUDENT_1: So don't you think...   {#2770}
CTX| [02:36:52] STUDENT_5: What service are you talking about?   {#2771}
CTX| [02:36:55] STUDENT_1: Can you please go to the other picture   {#2772}
CTX| [02:36:58] STUDENT_5: you were talking about read path and write path this is that only this is your read path so this   {#2773}
CTX| [02:37:03] STUDENT_5: is your write path this is your read path this is the exact same thing yeah but you said that   {#2774}
CTX| [02:37:11] STUDENT_1: one thing that you mentioned was you want to separate them out in different services right   {#2775}
CTX| [02:37:15] TEACHER: the entire read path we did not i never said we have to separate it just because it is   {#2776}
CTX| [02:37:19] TEACHER: read path and write path we separate it we approach it as separate concerns   {#2777}
CTX| [02:37:25] TEACHER: because this is web server this is asynchronous worker these two cannot be in sparta same thing   {#2778}
