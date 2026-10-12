# chunk_13  OWNS 02:27:34 -> 02:40:10  (segments #2311-#2528, 2161 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:26:36] TEACHER: streams...   {#2285}
CTX| [02:26:36] TEACHER: Sixth week.   {#2286}
CTX| [02:26:39] TEACHER: I have it covered. It's there in the   {#2287}
CTX| [02:26:40] TEACHER: category. I have it covered. Don't worry about it.   {#2288}
CTX| [02:26:42] TEACHER: It's very easy. It's all CDN.   {#2289}
CTX| [02:26:44] TEACHER: It's all CDN. You don't have to worry about   {#2290}
CTX| [02:26:46] TEACHER: anything at all.   {#2291}
CTX| [02:26:48] TEACHER: I'll talk about how that happens.   {#2292}
CTX| [02:26:50] TEACHER: you pointers will not show you how to actually do it, but we'll give you pointers, which   {#2293}
CTX| [02:26:54] TEACHER: you can look up to and implement it on.   {#2294}
CTX| [02:26:57] STUDENT_5: It's not that difficult in our days.   {#2295}
CTX| [02:27:01] STUDENT_5: So yeah.   {#2296}
CTX| [02:27:03] STUDENT_6: Yeah.   {#2297}
CTX| [02:27:03] STUDENT_6: Uh, so you talked about, uh, Q versus stream, right?   {#2298}
CTX| [02:27:07] STUDENT_6: Like typically wait SNS fall into these two, whether it falls.   {#2299}
CTX| [02:27:11] TEACHER: SNS is totally different.   {#2300}
CTX| [02:27:13] STUDENT_6: Okay.   {#2301}
CTX| [02:27:13] TEACHER: SNS is totally SNS is neither a Q nor a stream.   {#2302}
CTX| [02:27:16] TEACHER: SQS is a Q.   {#2303}
CTX| [02:27:18] TEACHER: Kinesis is a stream, right?   {#2304}
CTX| [02:27:21] TEACHER: SNS is just a notification thing.   {#2305}
CTX| [02:27:23] TEACHER: You send a data, all ever who is subscribed to it.   {#2306}
CTX| [02:27:26] TEACHER: It just broadcast it to them.   {#2307}
CTX| [02:27:27] TEACHER: Simple.   {#2308}
CTX| [02:27:28] TEACHER: That's what SNS is all about.   {#2309}
CTX| [02:27:29] STUDENT_14: So can SNS has no persistence.   {#2310}

---- OWNED SEGMENTS START ----
[02:27:34] STUDENT_6: So can SNS and SQS be combined and be considered?   {#2311}
[02:27:38] TEACHER: You can, you can, you can mimic Kafka with SNS plus SQS.   {#2312}
[02:27:41] STUDENT_6: Okay.   {#2313}
[02:27:42] TEACHER: But there is a limitation for that.   {#2314}
[02:27:45] TEACHER: When you implement, you would realize that historical,   {#2315}
[02:27:47] TEACHER: because you don't have historical messages in Kafka,   {#2316}
[02:27:49] TEACHER: you can have historical messages.   {#2317}
[02:27:51] TEACHER: So you can go through old messages also with SNS and SQS.   {#2318}
[02:27:54] TEACHER: You cannot have.   {#2319}
[02:27:55] STUDENT_6: Okay.   {#2320}
[02:27:57] STUDENT_6: Okay.   {#2321}
[02:27:58] STUDENT_6: Got it.   {#2322}
[02:27:58] STUDENT_6: And I have one question related to caching as well.   {#2323}
[02:28:01] STUDENT_6: So one of the places where you can implement caching is at load balancer,   {#2324}
[02:28:05] STUDENT_6: API gateway.   {#2325}
[02:28:08] STUDENT_6: So typically you'll have to re invalidate the cache as well.   {#2326}
[02:28:13] STUDENT_6: So how do you invalidate that layer?   {#2327}
[02:28:17] STUDENT_6: So if you don't, I mean, yeah, I guess.   {#2328}
[02:28:21] TEACHER: Load balancer does not give you any API code O8 FII, right?   {#2329}
[02:28:24] TEACHER: So the only way to invalidate it is time-based.   {#2330}
[02:28:27] TEACHER: That's the only thing.   {#2331}
[02:28:28] TEACHER: So when you're caching something at load balancer,   {#2332}
[02:28:30] TEACHER: you need to be aware that for a certain amount of time,   {#2333}
[02:28:32] TEACHER: it will be cached.   {#2334}
[02:28:34] TEACHER: So you cannot typically invalidate it   {#2335}
[02:28:35] TEACHER: because load balancer does not expose those endpoints to the market.   {#2336}
[02:28:38] TEACHER: You can request it to invalidate.   {#2337}
[02:28:40] TEACHER: So you can adjust the time at max.   {#2338}
[02:28:44] STUDENT_7: Okay, got it.   {#2339}
[02:28:45] STUDENT_7: That's it.   {#2340}
[02:28:46] STUDENT_7: Sure.   {#2341}
[02:28:48] STUDENT_1: Yes, but actually, so actually I wanted to touch upon the same thing, which I don't   {#2342}
[02:28:55] STUDENT_1: know the last name.   {#2343}
[02:28:58] STUDENT_1: But with SNS and SQS, we can replicate the behavior where like multiple consumers can   {#2344}
[02:29:04] STUDENT_1: actually have the same messages.   {#2345}
[02:29:08] STUDENT_1: And so it's, it's from my learning, like, you know, we went ahead with SQS based architecture.   {#2346}
[02:29:17] STUDENT_1: you know, since there's no ordering and no sharding basically, you know, for a given object in RDB,   {#2347}
[02:29:26] STUDENT_1: we were receiving like, you know, multiple messages in the SQS and multiple consumers were picking it at the same time.   {#2348}
[02:29:32] STUDENT_1: And even with the retries and everything, you know, we used to end up like, you know, failing.   {#2349}
[02:29:36] STUDENT_1: Then we had to like, you know, re-architect everything and move to Kinesis or like, you know, so like from SQS.   {#2350}
[02:29:44] STUDENT_1: Yeah.   {#2351}
[02:29:45] STUDENT_1: Yeah.   {#2352}
[02:29:45] STUDENT_1: So that's one thing like, you know, ordering is, and sharding is, is really one important   {#2353}
[02:29:50] STUDENT_1: thing, uh, when to choose like SQS and Kinesis, because, uh, with sharding, we, we, you actually   {#2354}
[02:29:57] STUDENT_1: get all the messages for a given, uh, unique ID in, in a single, uh, and a single consumer   {#2355}
[02:30:02] STUDENT_1: is actually consuming all those messages.   {#2356}
[02:30:04] STUDENT_1: So you actually can actually control, uh, you know, the behavior, how you want to, uh,   {#2357}
[02:30:09] STUDENT_1: persist it, uh, back in your database and, and do other things.   {#2358}
[02:30:14] TEACHER: performance, given that you know that all the requests of a particular thing will come   {#2359}
[02:30:18] TEACHER: to one place, you can cache and load and whatnot, you can pass and write and whatnot.   {#2360}
[02:30:22] TEACHER: So yeah, you get all sorts of performance improvements by that.   {#2361}
[02:30:26] STUDENT_1: Yeah.   {#2362}
[02:30:27] STUDENT_1: So I, so I want to just touch base on that.   {#2363}
[02:30:30] STUDENT_1: Yeah.   {#2364}
[02:30:31] STUDENT_1: No, no.   {#2365}
[02:30:31] STUDENT_1: Excellent.   {#2366}
[02:30:32] STUDENT_5: Thanks.   {#2367}
[02:30:32] STUDENT_5: Thanks for adding that.   {#2368}
[02:30:34] STUDENT_1: And, uh, even on the caching side, I might, I'm not sure like, no, whether it, uh, uh,   {#2369}
[02:30:39] STUDENT_1: you know, comes.   {#2370}
[02:30:41] STUDENT_1: So my team owns a config platform and generally configs are really small in nature for most   {#2371}
[02:30:47] STUDENT_1: of the applications, but latency is a really important thing for our customers.   {#2372}
[02:30:55] STUDENT_1: Even introducing more than three milliseconds of latency is a no-go.   {#2373}
[02:31:00] STUDENT_1: So what we do is, so from our control plane, people can do any changes to their configurations.   {#2374}
[02:31:06] STUDENT_1: We take the snapshot and push it to S3.   {#2375}
[02:31:10] STUDENT_1: application boot up, you know, we load it from S3 and into internal in-memory cache.   {#2376}
[02:31:16] STUDENT_1: And we also use what we talked about, like, you know, using the disk.   {#2377}
[02:31:24] STUDENT_1: So we also persisted inside.   {#2378}
[02:31:28] STUDENT_1: So many levels, right?   {#2379}
[02:31:30] STUDENT_1: For mobile guys, like, you know, what we do is like, you know, rather than S3, we push   {#2380}
[02:31:36] STUDENT_1: it to cdn and whenever a call comes like you know first call goes to uh the in-memory part if it is   {#2381}
[02:31:42] STUDENT_1: not present loads it from desk if it's not there then like you know in the back and like go go to   {#2382}
[02:31:47] STUDENT_1: cdn and fetch it so like uh but just want to trade like you know no no that's brilliant you are having   {#2383}
[02:31:53] TEACHER: at so many levels but one of the reasons why you are able to do so is because there is not much   {#2384}
[02:31:59] STUDENT_1: cash and validation required yes and inconsistency is like is not a problem for us it's not a problem   {#2385}
[02:32:07] TEACHER: So brilliant.   {#2386}
[02:32:08] TEACHER: You used all the layers there and you know, that's how we should be thinking.   {#2387}
[02:32:12] TEACHER: Like it is not always a single centralized remote cache that you should rely on anything   {#2388}
[02:32:17] TEACHER: that floats your port, do that.   {#2389}
[02:32:20] STUDENT_5: Anything that helps you keep your infrastructure cheap or rather less expensive to do that.   {#2390}
[02:32:25] STUDENT_1: And just want to touch base on one more thing as in like, you know, uh, we since like falling   {#2391}
[02:32:31] STUDENT_1: back is an anti-pattern because most of the times you never fall back and you never test that part   {#2392}
[02:32:37] STUDENT_1: of your code. So we try and avoid that as well that, you know, it's not, it's not like, you know,   {#2393}
[02:32:41] STUDENT_1: something is falling back. It's, it's part of the make making that fallback a part of the actual   {#2394}
[02:32:49] STUDENT_1: process rather than like they're just falling back. Okay. Because it can happen when, you know,   {#2395}
[02:32:54] STUDENT_1: once it triggered, like, you know, we never tested that part or it, it was some part of the code,   {#2396}
[02:32:58] STUDENT_1: like, you know, which was never updated because it was always a fallback thing.   {#2397}
[02:33:03] TEACHER: So then is it that you send a fraction of requests as a fallback every day?   {#2398}
[02:33:09] STUDENT_1: We don't, uh, put fallback at all.   {#2399}
[02:33:13] TEACHER: As in, uh, it's, but then it's kind of fallback where you don't have in memory.   {#2400}
[02:33:17] TEACHER: You go to this, you don't have a desk, you go to CDN and fetch it.   {#2401}
[02:33:20] TEACHER: Right.   {#2402}
[02:33:20] STUDENT_1: So it's more like, you know, first, uh, we always go to desk, uh, for always   {#2403}
[02:33:26] STUDENT_1: go to in memory. Okay. And for the first time, like nothing will be there. So it will load   {#2404}
[02:33:31] STUDENT_1: from disk. And at the same time, we will, in the background thread, like, you know, we'll   {#2405}
[02:33:36] STUDENT_1: fire a call to CDN and, you know, gets the latest thing from CDN. And when we are building   {#2406}
[02:33:45] STUDENT_1: the CDN, so first place is like, you know, where, for example, let's say you did some   {#2407}
[02:33:52] STUDENT_1: change we commit those changes to the git repository and we also at the same time we   {#2408}
[02:33:59] STUDENT_1: publish those changes to cdn we ensure that like you know both both of them are done   {#2409}
[02:34:07] TEACHER: but then is it possible in your case that memory is flushed and you don't have the return memory   {#2410}
[02:34:17] STUDENT_1: yes like let's say if if it is flushed then you know it will fall back to disk   {#2411}
[02:34:23] STUDENT_1: so no so the thing is uh uh for the first time like this fallback let's say when the application   {#2412}
[02:34:30] STUDENT_1: is uh when the application started uh there's nothing in memory so it will it will get it from   {#2413}
[02:34:37] STUDENT_1: disk so it will this this uh this this this path is always covered and then at the same time we   {#2414}
[02:34:46] STUDENT_1: call to CDN and get it from there as well.   {#2415}
[02:34:49] STUDENT_1: So if it's latest, like, uh, one from, from what you have got it.   {#2416}
[02:34:55] STUDENT_5: It, it, it, it basically automatically gets updated.   {#2417}
[02:34:58] STUDENT_5: Yes.   {#2418}
[02:34:59] STUDENT_5: Whenever I did something you have got it.   {#2419}
[02:35:01] STUDENT_5: Pretty interesting.   {#2420}
[02:35:03] STUDENT_1: Good.   {#2421}
[02:35:04] STUDENT_1: Anything else you don't want to add?   {#2422}
[02:35:06] STUDENT_1: Uh, no, no, no.   {#2423}
[02:35:07] STUDENT_1: And it was a great session.   {#2424}
[02:35:08] STUDENT_1: Uh, sorry, like actually I am, uh, you know, uh, joining from Luxembourg.   {#2425}
[02:35:12] STUDENT_1: So it's like 4.   {#2426}
[02:35:13] TEACHER: Oh, oh, oh.   {#2427}
[02:35:16] TEACHER: Have a, have a, like have a, have a good sleep.   {#2428}
[02:35:19] TEACHER: It's about 30 AM.   {#2429}
[02:35:21] TEACHER: Great.   {#2430}
[02:35:22] TEACHER: Thanks.   {#2431}
[02:35:22] TEACHER: Thanks so much.   {#2432}
[02:35:23] TEACHER: Amrik.   {#2433}
[02:35:25] STUDENT_2: Yeah.   {#2434}
[02:35:26] STUDENT_2: I just wanted to discuss one thing, actually it's regarding the catching.   {#2435}
[02:35:30] STUDENT_2: Okay.   {#2436}
[02:35:30] STUDENT_2: So while I joined a company, okay.   {#2437}
[02:35:34] STUDENT_2: It means they were planning to move from the calling directly to the API server to   {#2438}
[02:35:39] STUDENT_2: something else as a common library.   {#2439}
[02:35:41] STUDENT_2: So on the front end, what we did is we implemented a different application.   {#2440}
[02:35:46] STUDENT_2: Okay.   {#2441}
[02:35:47] STUDENT_2: So it was storing the data and instead of calling directly to the API server, we were   {#2442}
[02:35:51] STUDENT_2: calling that application first, that service first.   {#2443}
[02:35:54] STUDENT_2: And then from there we were getting the data.   {#2444}
[02:35:56] STUDENT_2: So will this be also means this is also a part of caching or what?   {#2445}
[02:36:00] TEACHER: You're saving an expensive thing, right?   {#2446}
[02:36:03] TEACHER: And then whatever you are saving, if you are having a copy of data at an end and you're   {#2447}
[02:36:09] TEACHER: saving something, let's cash it.   {#2448}
[02:36:11] TEACHER: You're basically kind of a, because that's what you do, right.   {#2449}
[02:36:14] TEACHER: You save an expensive computation, you spare, save an expensive IO.   {#2450}
[02:36:18] STUDENT_2: Okay.   {#2451}
[02:36:19] STUDENT_2: And, uh, that service was responsible for one more thing actually means, uh,   {#2452}
[02:36:23] STUDENT_2: for, uh, it was avoiding the multiple API calls.   {#2453}
[02:36:25] STUDENT_2: For example, uh, if we have, uh, say four or five machines were there.   {#2454}
[02:36:29] STUDENT_2: Okay.   {#2455}
[02:36:29] STUDENT_2: For that, we, uh, were calling the data.   {#2456}
[02:36:32] STUDENT_2: So from the front end, we were just passing one query to that service,   {#2457}
[02:36:36] STUDENT_2: which was having all the parameter indexes and that service was making   {#2458}
[02:36:41] STUDENT_2: instead of the front end directly meeting but then were you catching something on that service   {#2459}
[02:36:47] STUDENT_2: uh that was responsible for two things actually for uh the that query for processing also and for   {#2460}
[02:36:54] TEACHER: that uh caching also got it so then your front end has one point of contact and it can internally for   {#2461}
[02:37:02] TEACHER: and it can internally pan it out to multiple services to get it it's basically kind of like an   {#2462}
[02:37:06] TEACHER: if I get it.   {#2463}
[02:37:06] TEACHER: Right.   {#2464}
[02:37:07] TEACHER: Oh, yeah.   {#2465}
[02:37:11] STUDENT_5: Yes.   {#2466}
[02:37:12] STUDENT_5: Shitej.   {#2467}
[02:37:13] STUDENT_7: Yeah.   {#2468}
[02:37:14] STUDENT_7: So I have a question regarding read replica.   {#2469}
[02:37:16] STUDENT_7: So we discussed that replica is pulling the changes from master.   {#2470}
[02:37:20] STUDENT_7: So my question is, does adding more read replicas, assume that my   {#2471}
[02:37:24] STUDENT_7: service is a read heavy service.   {#2472}
[02:37:26] STUDENT_7: So does adding more replicas affect the performance of the master   {#2473}
[02:37:30] STUDENT_7: node?   {#2474}
[02:37:30] TEACHER: It does, but not that much.   {#2475}
[02:37:33] STUDENT_7: Okay.   {#2476}
[02:37:36] TEACHER: still absorbing some capacity of master while it is trying to fetch it.   {#2477}
[02:37:40] TEACHER: Right.   {#2478}
[02:37:40] TEACHER: So you will not have huge number of read replicas.   {#2479}
[02:37:44] TEACHER: Five, six, seven is still five is fine.   {#2480}
[02:37:46] TEACHER: But beyond that, you typically don't go because it eats up into servers like   {#2481}
[02:37:53] TEACHER: masters, CPU, network and memory capacity while it is trying to fetch the data   {#2482}
[02:38:00] TEACHER: because every database gives you different ways to fetch the data.   {#2483}
[02:38:03] TEACHER: Some database gives you direct SSH option to go and read the entire bin log file and then do processing on your end.   {#2484}
[02:38:09] TEACHER: If your database do that, great.   {#2485}
[02:38:11] TEACHER: If not, then it gives you SQL or your protocol specific way to fetch it.   {#2486}
[02:38:16] TEACHER: That would require servers, CPU, memory and network bandwidth, all of them.   {#2487}
[02:38:20] TEACHER: So you typically don't add huge number of it.   {#2488}
[02:38:24] TEACHER: You can create now as a solution, but let's say you need 15.   {#2489}
[02:38:27] TEACHER: Your database is only allowing five.   {#2490}
[02:38:30] TEACHER: How do you get it to 15?   {#2491}
[02:38:31] TEACHER: So you typically create a hierarchy culture.   {#2492}
[02:38:33] TEACHER: So a replica can become a replica of other replica.   {#2493}
[02:38:36] STUDENT_9: Okay.   {#2494}
[02:38:37] STUDENT_9: Okay.   {#2495}
[02:38:38] TEACHER: So let's say you have five at the top layer and then everyone gets three, three, three,   {#2496}
[02:38:42] TEACHER: three, three, or other two, two, two.   {#2497}
[02:38:45] TEACHER: So that's why you, you basically complete your 15 replicas.   {#2498}
[02:38:49] STUDENT_7: And let's suppose they are affecting the master node that then it might be an indication to   {#2499}
[02:38:53] STUDENT_7: move to sharding.   {#2500}
[02:38:55] STUDENT_5: Correct.   {#2501}
[02:38:56] STUDENT_5: Correct.   {#2502}
[02:38:56] STUDENT_5: Correct.   {#2503}
[02:38:58] STUDENT_7: Thank you.   {#2504}
[02:39:01] STUDENT_2: Rahul.   {#2505}
[02:39:02] STUDENT_2: So my question is just about confirming things about CDN.   {#2506}
[02:39:07] STUDENT_2: So basically, if you remember the first point in that, at the start of the lecture, like   {#2507}
[02:39:15] STUDENT_4: we, we had some API servers, which are having some local caching.   {#2508}
[02:39:20] STUDENT_4: Okay.   {#2509}
[02:39:21] STUDENT_4: So I, from, so I tried to think about the system of CDN and how it is working.   {#2510}
[02:39:26] STUDENT_4: Basically it's just a proxy.   {#2511}
[02:39:28] STUDENT_4: Okay.   {#2512}
[02:39:28] TEACHER: CDN will have a discussion.   {#2513}
[02:39:31] TEACHER: early to discuss CDN, I have huge detail of CDN covered in third week.   {#2514}
[02:39:36] TEACHER: Right.   {#2515}
[02:39:37] TEACHER: So I would recommend let's, let's, let's defer the discussion for that time   {#2516}
[02:39:41] TEACHER: because I'm anyway covering that.   {#2517}
[02:39:43] TEACHER: So a bunch of questions will be answered there and everyone will be   {#2518}
[02:39:46] TEACHER: on the same page, right?   {#2519}
[02:39:47] TEACHER: If I cover partially today and then something later, so it will create a   {#2520}
[02:39:51] TEACHER: mess and, and like not everyone will absorb that.   {#2521}
[02:39:55] TEACHER: Right.   {#2522}
[02:39:55] TEACHER: That's right.   {#2523}
[02:39:56] TEACHER: So a CDN specific, let's move to the end.   {#2524}
[02:39:59] TEACHER: Like in case you're diving into deeper details of CDN.   {#2525}
[02:40:02] STUDENT_4: Sure.   {#2526}
[02:40:03] STUDENT_4: Not, not in the deep things.   {#2527}
[02:40:07] STUDENT_4: It's just about the caching thing.   {#2528}
---- OWNED SEGMENTS END ----

CTX| [02:40:10] TEACHER: So what, what, what exactly are you caching on CD?   {#2529}
CTX| [02:40:13] STUDENT_4: So basically like, if you remember the first, first point in from the, from the start of   {#2530}
CTX| [02:40:21] STUDENT_4: the lecture, it is about like caching, caching things in the local, local server or local   {#2531}
CTX| [02:40:26] STUDENT_4: instance on the server.   {#2532}
CTX| [02:40:28] STUDENT_4: It can be whatever Docker container.   {#2533}
CTX| [02:40:30] STUDENT_4: Okay.   {#2534}
CTX| [02:40:32] STUDENT_4: So, uh, my question is basically the CDN do this also like, uh, they, like, they must   {#2535}
CTX| [02:40:38] STUDENT_4: have a lot of like kind of like API servers, which are like, uh, uh, uh, lot of API servers   {#2536}
CTX| [02:40:46] STUDENT_4: and like, uh, so to make this system efficient, so do they like a store, the data store, the   {#2537}
CTX| [02:40:53] STUDENT_4: caching data in their, uh, disk also.   {#2538}
CTX| [02:40:58] TEACHER: So in Ram, imagine storing images in Ram.   {#2539}
CTX| [02:41:00] TEACHER: Would you store images in Ram?   {#2540}
CTX| [02:41:01] STUDENT_4: No, no, like, uh, not like a part of data, like not exactly the   {#2541}
CTX| [02:41:06] STUDENT_4: more.   {#2542}
CTX| [02:41:07] TEACHER: Everything is on this procedure.   {#2543}
CTX| [02:41:08] TEACHER: Everything is on this course.   {#2544}
CTX| [02:41:10] STUDENT_4: Okay.   {#2545}
