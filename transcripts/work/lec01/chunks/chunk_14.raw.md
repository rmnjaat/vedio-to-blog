# chunk_14  OWNS 02:40:10 -> 02:52:43  (segments #2529-#2752, 1986 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:39:15] STUDENT_4: we, we had some API servers, which are having some local caching.   {#2508}
CTX| [02:39:20] STUDENT_4: Okay.   {#2509}
CTX| [02:39:21] STUDENT_4: So I, from, so I tried to think about the system of CDN and how it is working.   {#2510}
CTX| [02:39:26] STUDENT_4: Basically it's just a proxy.   {#2511}
CTX| [02:39:28] STUDENT_4: Okay.   {#2512}
CTX| [02:39:28] TEACHER: CDN will have a discussion.   {#2513}
CTX| [02:39:31] TEACHER: early to discuss CDN, I have huge detail of CDN covered in third week.   {#2514}
CTX| [02:39:36] TEACHER: Right.   {#2515}
CTX| [02:39:37] TEACHER: So I would recommend let's, let's, let's defer the discussion for that time   {#2516}
CTX| [02:39:41] TEACHER: because I'm anyway covering that.   {#2517}
CTX| [02:39:43] TEACHER: So a bunch of questions will be answered there and everyone will be   {#2518}
CTX| [02:39:46] TEACHER: on the same page, right?   {#2519}
CTX| [02:39:47] TEACHER: If I cover partially today and then something later, so it will create a   {#2520}
CTX| [02:39:51] TEACHER: mess and, and like not everyone will absorb that.   {#2521}
CTX| [02:39:55] TEACHER: Right.   {#2522}
CTX| [02:39:55] TEACHER: That's right.   {#2523}
CTX| [02:39:56] TEACHER: So a CDN specific, let's move to the end.   {#2524}
CTX| [02:39:59] TEACHER: Like in case you're diving into deeper details of CDN.   {#2525}
CTX| [02:40:02] STUDENT_4: Sure.   {#2526}
CTX| [02:40:03] STUDENT_4: Not, not in the deep things.   {#2527}
CTX| [02:40:07] STUDENT_4: It's just about the caching thing.   {#2528}

---- OWNED SEGMENTS START ----
[02:40:10] TEACHER: So what, what, what exactly are you caching on CD?   {#2529}
[02:40:13] STUDENT_4: So basically like, if you remember the first, first point in from the, from the start of   {#2530}
[02:40:21] STUDENT_4: the lecture, it is about like caching, caching things in the local, local server or local   {#2531}
[02:40:26] STUDENT_4: instance on the server.   {#2532}
[02:40:28] STUDENT_4: It can be whatever Docker container.   {#2533}
[02:40:30] STUDENT_4: Okay.   {#2534}
[02:40:32] STUDENT_4: So, uh, my question is basically the CDN do this also like, uh, they, like, they must   {#2535}
[02:40:38] STUDENT_4: have a lot of like kind of like API servers, which are like, uh, uh, uh, lot of API servers   {#2536}
[02:40:46] STUDENT_4: and like, uh, so to make this system efficient, so do they like a store, the data store, the   {#2537}
[02:40:53] STUDENT_4: caching data in their, uh, disk also.   {#2538}
[02:40:58] TEACHER: So in Ram, imagine storing images in Ram.   {#2539}
[02:41:00] TEACHER: Would you store images in Ram?   {#2540}
[02:41:01] STUDENT_4: No, no, like, uh, not like a part of data, like not exactly the   {#2541}
[02:41:06] STUDENT_4: more.   {#2542}
[02:41:07] TEACHER: Everything is on this procedure.   {#2543}
[02:41:08] TEACHER: Everything is on this course.   {#2544}
[02:41:10] STUDENT_4: Okay.   {#2545}
[02:41:10] STUDENT_4: So I thought like it was a combination of Ram and disc actually,   {#2546}
[02:41:14] TEACHER: but why would you want to store it on Ram and CDN?   {#2547}
[02:41:18] TEACHER: Because most things that people are catching on CDN are what images,   {#2548}
[02:41:21] TEACHER: videos, gigantic responses.   {#2549}
[02:41:23] TEACHER: Why small responses?   {#2550}
[02:41:24] TEACHER: What would you gain by storing something?   {#2551}
[02:41:28] TEACHER: in RAM, but do user data needs to be stored in RAM.   {#2552}
[02:41:31] TEACHER: It's their decision.   {#2553}
[02:41:31] TEACHER: Right.   {#2554}
[02:41:32] TEACHER: But I don't really see a need to store anything in RAM because this access is   {#2555}
[02:41:35] TEACHER: anyway, fast CDNs are closer to user.   {#2556}
[02:41:37] TEACHER: Would anyway get all the benefits out of it.   {#2557}
[02:41:42] STUDENT_4: So what I was thinking was it was kind of from, from what I thought was basically   {#2558}
[02:41:48] STUDENT_4: first cash as a RAM, then it's the disk and then there is central storage.   {#2559}
[02:41:54] STUDENT_4: Yeah.   {#2560}
[02:41:54] TEACHER: They can implement.   {#2561}
[02:41:55] TEACHER: I don't know.   {#2562}
[02:41:55] TEACHER: I've never worked for that for mine.   {#2563}
[02:41:56] TEACHER: I've never worked for cloud.   {#2564}
[02:41:58] TEACHER: I don't know if they catch something on Ram or not.   {#2565}
[02:41:59] TEACHER: They can, if they want to, but I don't see a need to do that.   {#2566}
[02:42:04] TEACHER: Given that disk access is fast, you have SSDs that would give you relatively   {#2567}
[02:42:07] TEACHER: similar performance in Ram.   {#2568}
[02:42:10] TEACHER: They might catch some configurations and not, but not the user data.   {#2569}
[02:42:12] TEACHER: User data is typically gigantic.   {#2570}
[02:42:14] STUDENT_15: Okay.   {#2571}
[02:42:16] STUDENT_15: That's sure.   {#2572}
[02:42:18] STUDENT_5: Sampai.   {#2573}
[02:42:22] STUDENT_1: Hey, here.   {#2574}
[02:42:23] STUDENT_1: So my question is mostly related to the Kafka part where you discussed the heterogeneous workers and homogeneous workers.   {#2575}
[02:42:33] STUDENT_1: So for the homogeneous workers, it's okay to use the queuing facilities.   {#2576}
[02:42:40] STUDENT_1: But for the heterogeneous workers, we need to use some sort of solutions like Kafka.   {#2577}
[02:42:45] STUDENT_1: But with Kafka, the problem is the workers cannot scale.   {#2578}
[02:42:49] STUDENT_1: If you want to scale, you need to do add more partitions.   {#2579}
[02:42:53] STUDENT_1: want to add more partitions you need to do rebalancing all all of those stuff correct now   {#2580}
[02:42:58] STUDENT_1: let's say i want to leverage kafka based solution for some heterogeneous workers but where in some   {#2581}
[02:43:07] STUDENT_1: services the workers are scaling at times then can we fit that solution like this kafka based   {#2582}
[02:43:15] TEACHER: solution over here yeah so you can have kafka consumers let's say you have three partitions   {#2583}
[02:43:23] TEACHER: beyond that hypothetically. Yes.   {#2584}
[02:43:25] TEACHER: But then you need hundreds of consumers.   {#2585}
[02:43:28] TEACHER: Now what do you do?   {#2586}
[02:43:29] TEACHER: You have three   {#2587}
[02:43:31] TEACHER: consumers for your Kafka.   {#2588}
[02:43:33] TEACHER: Let it push into a message queue   {#2589}
[02:43:35] TEACHER: like SQS and have 100 workers   {#2590}
[02:43:37] TEACHER: there. So the job of this   {#2591}
[02:43:39] TEACHER: would be just to read   {#2592}
[02:43:41] TEACHER: the message and put it into SQS and   {#2593}
[02:43:42] TEACHER: there are 100 workers who are doing the heavy lifting   {#2594}
[02:43:45] TEACHER: for you. So this way, without   {#2595}
[02:43:47] TEACHER: rebalancing or without repartitioning your Kafka,   {#2596}
[02:43:49] TEACHER: you can get higher throughput.   {#2597}
[02:43:54] STUDENT_1: but okay so that means we are adding one extra component that needs to be managed to to to get the   {#2598}
[02:44:04] STUDENT_1: scaling functionality as well as straight okay okay and there is no best other solution other   {#2599}
[02:44:11] STUDENT_1: than using these two systems together okay and it's very common for notification architecture   {#2600}
[02:44:16] TEACHER: very common all notification architecture this is extremely common you have a kafka   {#2601}
[02:44:22] TEACHER: you have limitation of kafka which is parallelism equal to number of partitions but you need higher   {#2602}
[02:44:28] TEACHER: degree of fan out so sending message takes more time consuming takes less so you just consume   {#2603}
[02:44:33] TEACHER: from kafka put it into sqs and then have workers hundreds of workers that is throwing it out in the   {#2604}
[02:44:38] STUDENT_1: word. It's a very common thing. Okay. There is one more functionality in Kafka, which I haven't   {#2605}
[02:44:46] STUDENT_1: read it through. I was working around this space and I found, I got to learn that term. It's   {#2606}
[02:44:51] STUDENT_1: something called broadcasting feature in Kafka. I haven't read in depth about it, but what I got   {#2607}
[02:44:58] STUDENT_1: to know is that Kafka, so earlier we used to think that Kafka was a dumb messaging system   {#2608}
[02:45:04] STUDENT_1: where Kafka don't do anything.   {#2609}
[02:45:06] STUDENT_1: Like it doesn't fetch from the producer.   {#2610}
[02:45:09] STUDENT_1: It doesn't send to the consumer.   {#2611}
[02:45:10] STUDENT_1: Producer fetches it, fetches the message   {#2612}
[02:45:12] STUDENT_1: and a producer sends the message   {#2613}
[02:45:14] STUDENT_1: and consumers fetches the messages.   {#2614}
[02:45:16] STUDENT_1: So Kafka is a dumb system.   {#2615}
[02:45:18] STUDENT_1: But with this broadcasting feature,   {#2616}
[02:45:20] STUDENT_1: what Kafka does is it can send,   {#2617}
[02:45:23] STUDENT_1: broadcast the message to all the consumer groups   {#2618}
[02:45:28] STUDENT_1: that is consuming from a particular topic.   {#2619}
[02:45:30] STUDENT_1: I got to learn something from that, not in depth,   {#2620}
[02:45:34] TEACHER: So obviously those engineers are also working.   {#2621}
[02:45:38] TEACHER: I'm not sure how, how, like what advantages does it provide?   {#2622}
[02:45:42] TEACHER: And if it is real time, pops up is what they're trying to add.   {#2623}
[02:45:46] TEACHER: Not sure around that, but I'll, I'll also take a look.   {#2624}
[02:45:48] TEACHER: I've just made a note of it.   {#2625}
[02:45:50] TEACHER: Okay.   {#2626}
[02:45:52] STUDENT_1: Great.   {#2627}
[02:45:52] STUDENT_1: Great.   {#2628}
[02:45:53] STUDENT_1: But yeah, for the timing, I got the answer.   {#2629}
[02:45:55] STUDENT_1: Yeah.   {#2630}
[02:45:55] STUDENT_1: Thank you.   {#2631}
[02:45:56] STUDENT_1: Thanks.   {#2632}
[02:45:59] STUDENT_5: Okay.   {#2633}
[02:46:00] STUDENT_5: Yeah.   {#2634}
[02:46:00] STUDENT_5: Rajiv.   {#2635}
[02:46:02] STUDENT_9: So, if it's regarding web socket connections, I actually not clear about this, that the   {#2636}
[02:46:09] STUDENT_9: client always knows, so client has to have a connection with the server, right?   {#2637}
[02:46:16] STUDENT_9: So if it goes through LB now, is it to that a single instance of client would always know   {#2638}
[02:46:22] STUDENT_9: public IP of LB, but LB is sticky.   {#2639}
[02:46:25] STUDENT_9: That means it will always forward the connection to a single server or it can go to any.   {#2640}
[02:46:30] TEACHER: that if you need web sockets lb has to be sticky okay so load balancers that supports wss which   {#2641}
[02:46:40] TEACHER: basically web socket uh uh specification uh it has to be sticky and it would forward to the exact same   {#2642}
[02:46:47] STUDENT_9: server and if lb goes down then uh reconnection reestablishing the connection the client would   {#2643}
[02:46:54] STUDENT_9: establish the connection okay okay okay so and one more question regarding kafka so kafka it's   {#2644}
[02:47:00] STUDENT_9: as we said that the removal policy is a policy where we decide how much long data should keep in   {#2645}
[02:47:05] STUDENT_9: how does kafka manages this data uh so big data right we'll talk about that sixth week   {#2646}
[02:47:12] STUDENT_9: we have it covered we'll talk about that so they say that kafka is like a db only it has a   {#2647}
[02:47:19] TEACHER: We'll talk about it.   {#2648}
[02:47:20] TEACHER: Six weeks, we have a very, like we'll talk about some other thing, but I'll specify how   {#2649}
[02:47:25] TEACHER: basically Kafka leverages that.   {#2650}
[02:47:27] TEACHER: We'll go through that.   {#2651}
[02:47:28] STUDENT_15: Okay.   {#2652}
[02:47:29] STUDENT_15: Thank you.   {#2653}
[02:47:30] STUDENT_15: Yeah.   {#2654}
[02:47:32] STUDENT_5: Yeah.   {#2655}
[02:47:33] STUDENT_5: Yeah.   {#2656}
[02:47:35] STUDENT_2: I would like to add one more point on the, on the caching examples.   {#2657}
[02:47:40] STUDENT_2: That is the, how the Netflix does its video streaming.   {#2658}
[02:47:44] STUDENT_2: so we can store the video files on CDN.   {#2659}
[02:47:48] STUDENT_2: That's fine.   {#2660}
[02:47:49] STUDENT_2: But to get more performance on it,   {#2661}
[02:47:50] STUDENT_2: we can also do one more optimization.   {#2662}
[02:47:53] STUDENT_2: Like suppose some show is very popular   {#2663}
[02:47:55] STUDENT_2: and we can store that show on the pop locations   {#2664}
[02:47:59] STUDENT_2: that is called the internet service providers,   {#2665}
[02:48:03] STUDENT_2: which are more near to the users   {#2666}
[02:48:05] STUDENT_2: and it will get the streaming very faster   {#2667}
[02:48:08] STUDENT_2: and it will also save cost for the CDNs and like that.   {#2668}
[02:48:14] TEACHER: That's a brilliant example.   {#2669}
[02:48:16] TEACHER: You then, so then you also must be knowing about how, how ISPs sued Netflix because of   {#2670}
[02:48:24] TEACHER: Squid Games.   {#2671}
[02:48:25] TEACHER: Yeah.   {#2672}
[02:48:27] TEACHER: You, you, you read that, right?   {#2673}
[02:48:28] TEACHER: So, so for folks who don't know, a brilliant example that has just been shared is how you   {#2674}
[02:48:37] TEACHER: can cache the popular shows of Netflix data on ISPs.   {#2675}
[02:48:44] TEACHER: If you use ACT internet, ACT has massive data centers, not massive, but still they have   {#2676}
[02:48:50] TEACHER: basically pretty decent sized data centers.   {#2677}
[02:48:52] TEACHER: You cache it at local ISP site.   {#2678}
[02:48:55] TEACHER: This way, when you're accessing it, the data is right there and you fetch it from there.   {#2679}
[02:48:59] TEACHER: You don't even have to go to CDN to read the data.   {#2680}
[02:49:02] TEACHER: And this way you can get like ultra low latency to your end users for such things.   {#2681}
[02:49:08] TEACHER: Now, why is it possible?   {#2682}
[02:49:10] TEACHER: Because data is not changing.   {#2683}
[02:49:14] TEACHER: worrying about inconsistency here.   {#2684}
[02:49:16] TEACHER: Show is live, show is live, done and dusted, right?   {#2685}
[02:49:18] TEACHER: So you can literally ship it to local ISPs, ask them to cache it.   {#2686}
[02:49:23] TEACHER: This is where Netflix works with ISPs to service.   {#2687}
[02:49:27] TEACHER: And here, if you look for Cloudflare engineering blogs,   {#2688}
[02:49:31] TEACHER: there they talk about this, how Cloudflare accelerates using,   {#2689}
[02:49:38] TEACHER: like how Cloudflare accelerates the performance by working with ISPs   {#2690}
[02:49:44] TEACHER: to drive this experience.   {#2691}
[02:49:45] TEACHER: So cloudflare also has a blog on this, just a Google search.   {#2692}
[02:49:49] TEACHER: Right.   {#2693}
[02:49:50] TEACHER: But Netflix, these are next level optimizations.   {#2694}
[02:49:53] TEACHER: People that CDN is the ultimate.   {#2695}
[02:49:55] TEACHER: Now Netflix was mostly the pioneer.   {#2696}
[02:49:57] TEACHER: I'm not sure if they were, but Netflix was mostly the pioneer in this on   {#2697}
[02:50:01] TEACHER: leveraging ISPs to cache the data.   {#2698}
[02:50:03] TEACHER: Right.   {#2699}
[02:50:04] TEACHER: But thanks so much for adding that.   {#2700}
[02:50:06] TEACHER: It's a brilliant point.   {#2701}
[02:50:09] TEACHER: Yeah.   {#2702}
[02:50:12] STUDENT_7: A couple of questions.   {#2703}
[02:50:14] STUDENT_7: are you going to cover like a compression as a kind of strategy for various use cases?   {#2704}
[02:50:21] STUDENT_7: That's one.   {#2705}
[02:50:21] TEACHER: Compression is basic.   {#2706}
[02:50:22] STUDENT_7: Okay.   {#2707}
[02:50:23] TEACHER: You have three or four algorithms.   {#2708}
[02:50:26] TEACHER: Pick one that suits you the best.   {#2709}
[02:50:28] TEACHER: None.   {#2710}
[02:50:28] TEACHER: Basically nothing much in that.   {#2711}
[02:50:30] STUDENT_7: Okay.   {#2712}
[02:50:31] STUDENT_7: And security as a topic.   {#2713}
[02:50:35] STUDENT_5: Not really.   {#2714}
[02:50:37] TEACHER: I mean, that does not really fall under like high level architecture.   {#2715}
[02:50:41] TEACHER: So I typically stray away.   {#2716}
[02:50:44] TEACHER: cover are there on my website like those were the 28 29 topics what were the exact ones that i'll   {#2717}
[02:50:49] STUDENT_7: cover but isn't that something that a system designer needs to worry about in real world yes   {#2718}
[02:50:55] TEACHER: and i do know those part but people would not resonate if i talk about if i start talking about   {#2719}
[02:51:00] TEACHER: security people would run away like i i just have to you know ensure that the people who are enrolled   {#2720}
[02:51:09] TEACHER: for a certain thing they get the value most like they get the most value out of it but it is a bit   {#2721}
[02:51:14] TEACHER: security, then there are, then it opens up a whole new Pandora's box, right?   {#2722}
[02:51:18] TEACHER: You can, I can talk about infrastructure security.   {#2723}
[02:51:20] TEACHER: I can talk about how to go into best practices cloud.   {#2724}
[02:51:23] STUDENT_7: No, no, no, I'm talking about only infrastructure, forget infrastructure, but just, uh, application   {#2725}
[02:51:29] STUDENT_7: security, right?   {#2726}
[02:51:30] STUDENT_5: Because it's, it's such an example, example rate limiters, DDoS, SQL injections.   {#2727}
[02:51:36] STUDENT_5: What?   {#2728}
[02:51:38] STUDENT_7: Yeah.   {#2729}
[02:51:38] TEACHER: I mean, all of this is just a Google search away, right?   {#2730}
[02:51:41] TEACHER: Rate limiters are tons of videos available.   {#2731}
[02:51:44] TEACHER: else is just like they're already on the internet.   {#2732}
[02:51:46] TEACHER: Right.   {#2733}
[02:51:48] TEACHER: There's nothing much to add there because there's a pretty standard.   {#2734}
[02:51:52] TEACHER: Isn't it right?   {#2735}
[02:51:54] TEACHER: Handling DDoS equal to rate limiter.   {#2736}
[02:51:56] TEACHER: You add rate limit on a different layer.   {#2737}
[02:51:58] TEACHER: You get, you get the answer.   {#2738}
[02:52:00] TEACHER: Right.   {#2739}
[02:52:00] TEACHER: Like, like you know how to solve that problem.   {#2740}
[02:52:03] TEACHER: When you talk about SQL injection, there are standard ways to do it.   {#2741}
[02:52:06] TEACHER: You talk about CVEs.   {#2742}
[02:52:08] TEACHER: You exactly know how to patch it.   {#2743}
[02:52:09] TEACHER: Now what else?   {#2744}
[02:52:11] TEACHER: because these are pretty things which is available across the internet.   {#2745}
[02:52:16] TEACHER: There is nothing much specific to add.   {#2746}
[02:52:20] STUDENT_7: Okay.   {#2747}
[02:52:21] STUDENT_7: Final thing, the clustering of databases,   {#2748}
[02:52:27] STUDENT_7: that is part of you probably are saying vertical scaling, right?   {#2749}
[02:52:34] TEACHER: No, how is it all scaling?   {#2750}
[02:52:35] TEACHER: Clustering, now you can read out a cluster that are multiple machines.   {#2751}
[02:52:38] TEACHER: So how is it all scaling?   {#2752}
---- OWNED SEGMENTS END ----

CTX| [02:52:43] STUDENT_5: You create a database cluster cluster is equal to multiple machines.   {#2753}
CTX| [02:52:47] STUDENT_7: So it didn't cover it in the examples.   {#2754}
CTX| [02:52:50] STUDENT_7: So it was, so you said vertical one and the other is the, uh, read replica and sharding   {#2755}
CTX| [02:52:56] TEACHER: is the sharding cluster cluster.   {#2756}
CTX| [02:52:59] TEACHER: How does it all scale multiple machines?   {#2757}
CTX| [02:53:01] STUDENT_7: I mean, I don't know whether, you know, when you create a cluster, which is provided by   {#2758}
CTX| [02:53:06] STUDENT_7: the database vendor, for example, is it based on sharding or not?   {#2759}
CTX| [02:53:11] TEACHER: It is based on sharding.   {#2760}
CTX| [02:53:12] TEACHER: It is based on sharding.   {#2761}
CTX| [02:53:12] STUDENT_7: It appears as one database, right?   {#2762}
CTX| [02:53:15] TEACHER: Yeah.   {#2763}
CTX| [02:53:17] TEACHER: So in that sense, we classic example sharded database internally.   {#2764}
CTX| [02:53:21] TEACHER: For us, it is one database internally,   {#2765}
CTX| [02:53:23] TEACHER: it is split across multiple storage nodes cluster.   {#2766}
CTX| [02:53:27] STUDENT_7: Correct.   {#2767}
CTX| [02:53:28] STUDENT_7: So then we don't need to handle the sharding part, right?   {#2768}
CTX| [02:53:32] TEACHER: Ourselves depends on the database vendor.   {#2769}
CTX| [02:53:34] TEACHER: You are talking about vendors.   {#2770}
CTX| [02:53:35] TEACHER: They, if they are charging money for you,   {#2771}
CTX| [02:53:37] TEACHER: they would be handling it for you.   {#2772}
CTX| [02:53:38] TEACHER: If you are using open-source technologies which does not provide native sharding, you   {#2773}
CTX| [02:53:42] TEACHER: have to implement it.   {#2774}
