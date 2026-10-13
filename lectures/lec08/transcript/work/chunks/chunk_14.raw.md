# chunk_14  OWNS 02:32:14 -> 02:44:59  (segments #2589-#2820, 2427 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:31:17] TEACHER: the log and processes the message. Obviously throughput is gone for a toss. So that is where   {#2580}
CTX| [02:31:21] TEACHER: you would see distributed logs not being used in high throughput systems. It is typically used in   {#2581}
CTX| [02:31:27] TEACHER: systems that demand high degree of correctness. That's where you would use distributed logs.   {#2582}
CTX| [02:31:34] TEACHER: But the idea here is that because of its distributed nature, even if one of the node   {#2583}
CTX| [02:31:44] TEACHER: goes down there is no problem at all because there is still other nodes who hold the data   {#2584}
CTX| [02:31:49] TEACHER: right obviously in each case is there that if let's say hold the lock in these three instances   {#2585}
CTX| [02:31:54] TEACHER: right and then after that these two instances itself go down then i don't know there are still   {#2586}
CTX| [02:32:00] TEACHER: each cases there is still problem with correctness in it but still reduces the probability of   {#2587}
CTX| [02:32:05] TEACHER: hitting that to a bare minimum right okay and as i said the only reason why we do this is to   {#2588}

---- OWNED SEGMENTS START ----
[02:32:14] TEACHER: a single node of X and you just make it distributed.   {#2589}
[02:32:19] TEACHER: This is the idea of distributed system.   {#2590}
[02:32:21] TEACHER: Every single piece in your architecture needs to be horizontally scalable like this.   {#2591}
[02:32:25] TEACHER: It has to be distributed like this.   {#2592}
[02:32:28] TEACHER: Okay.   {#2593}
[02:32:29] TEACHER: A few things that I want you all of you to read.   {#2594}
[02:32:32] TEACHER: Chubby, read this paper.   {#2595}
[02:32:34] TEACHER: This is what Google still uses in production.   {#2596}
[02:32:36] TEACHER: Day in and day out errors are Chubby props up.   {#2597}
[02:32:39] TEACHER: Chubby is one of the most fun service or fun systems out there.   {#2598}
[02:32:44] TEACHER: Amazing paper by Google, Block Service for Loosely Coppled Distributed Systems.   {#2599}
[02:32:48] TEACHER: This was one of the first papers I ever read as it was part of an assignment.   {#2600}
[02:32:52] TEACHER: And that's how I got to look at this.   {#2601}
[02:32:53] TEACHER: Something called as research papers.   {#2602}
[02:32:55] STUDENT_9: Actually, this was the first paper I read.   {#2603}
[02:32:57] TEACHER: So Chubby was the first paper I ever read.   {#2604}
[02:32:59] TEACHER: It's very influential.   {#2605}
[02:33:01] TEACHER: It's very interesting.   {#2606}
[02:33:03] TEACHER: Read that.   {#2607}
[02:33:03] TEACHER: Apart from that, I have tons of blocks on distributed systems, tons of things on my   {#2608}
[02:33:07] TEACHER: YouTube channel and whatnot.   {#2609}
[02:33:09] TEACHER: Read it.   {#2610}
[02:33:10] TEACHER: Redlock, what we discussed, there is an edge case where it would not work.   {#2611}
[02:33:14] TEACHER: Martin Kleppman has a blog written on it that why you should not use Redlock.   {#2612}
[02:33:20] TEACHER: He talked about an edge case.   {#2613}
[02:33:22] TEACHER: Again, very rare to occur, but he has this knack of finding those things out.   {#2614}
[02:33:27] TEACHER: So he put it out where you should not use Redlock.   {#2615}
[02:33:31] TEACHER: There is an edge case in case you are interested, read it.   {#2616}
[02:33:33] TEACHER: I would recommend read it anyway.   {#2617}
[02:33:37] TEACHER: And I have three or four videos on my channel on distributed transactions.   {#2618}
[02:33:42] TEACHER: what we talk about locking that would help us implement distributed transactions   {#2619}
[02:33:47] TEACHER: distributed transactions practically i have shown how to do distribute transactions right   {#2620}
[02:33:51] TEACHER: three videos are there watch them it's a you would be able to understand it more than other folks   {#2621}
[02:33:57] TEACHER: who are watching like who have not taken this course because you know airline check-in system   {#2622}
[02:34:00] TEACHER: i use a lot of those stuff but not go went into those details because it's obviously exclusive   {#2623}
[02:34:06] TEACHER: to this course so i did not touch up on those details i just skimmed through it like it is   {#2624}
[02:34:12] TEACHER: You would be able to understand it much better.   {#2625}
[02:34:14] TEACHER: So spend this time understanding this part,   {#2626}
[02:34:17] TEACHER: distributed transaction and its implementation on my YouTube channel.   {#2627}
[02:34:19] TEACHER: I've done more of this stuff around.   {#2628}
[02:34:23] TEACHER: But this is what I wanted to cover.   {#2629}
[02:34:25] TEACHER: There has to be a lot of questions.   {#2630}
[02:34:27] TEACHER: If there are not, then you need folks to think about it.   {#2631}
[02:34:31] TEACHER: Right.   {#2632}
[02:34:32] TEACHER: And absorb this part.   {#2633}
[02:34:33] TEACHER: Distribute systems are amazing.   {#2634}
[02:34:34] TEACHER: Right.   {#2635}
[02:34:35] TEACHER: Think of making it distributed in order to not just horizontally scale the system,   {#2636}
[02:34:42] TEACHER: reliability. These two factors as well. Here we distributed this part not to handle scale.   {#2637}
[02:34:49] TEACHER: Did we? No. It is reducing the scale. It is reducing the throughput. But what we are gaining   {#2638}
[02:34:53] TEACHER: out of this, we are getting fault tolerance. We are increasing the availability. We are increasing   {#2639}
[02:34:58] TEACHER: the availability of our service. So you pick your pattern. You are either scaling it horizontally to   {#2640}
[02:35:04] TEACHER: handle scale or you are making it distributed. That's why I use different phrases. You are making   {#2641}
[02:35:12] TEACHER: to get fault tolerance and reliability and availability on that point.   {#2642}
[02:35:15] TEACHER: Right?   {#2643}
[02:35:16] TEACHER: Okay.   {#2644}
[02:35:16] TEACHER: But this is what I wanted to cover.   {#2645}
[02:35:18] TEACHER: Folks who want to drop off, feel free to drop off.   {#2646}
[02:35:20] TEACHER: Tomorrow, we'll be talking about distributed ID generators.   {#2647}
[02:35:23] TEACHER: It will be right at two and a half hour discussion,   {#2648}
[02:35:26] TEACHER: but we'll go into, again, the intuition of distributed ID generators,   {#2649}
[02:35:30] TEACHER: why we need it, how systems have been able to scale it to real-world examples,   {#2650}
[02:35:34] TEACHER: again, implementing everything that we studied.   {#2651}
[02:35:36] TEACHER: Right?   {#2652}
[02:35:37] TEACHER: We'll focus on that, go into those nitty-gritties of those systems.   {#2653}
[02:35:40] TEACHER: Right?   {#2654}
[02:35:41] TEACHER: Okay.   {#2655}
[02:35:41] TEACHER: Challah.   {#2656}
[02:35:42] TEACHER: for tuning in i'll take questions until there are and then i'll see you folks tomorrow   {#2657}
[02:35:49] STUDENT_2: arpit when you told that multiple machines had network in common so the question which you asked   {#2658}
[02:35:55] STUDENT_2: how to implement locking i was thinking on network perspective so one thing came to my mind was port   {#2659}
[02:36:00] STUDENT_2: now i do not know whether there's a protocol where you have only one connection like only accepts one   {#2660}
[02:36:06] STUDENT_2: connection if multiple pushes come and connected they get a rejection and it's also able to broadcast   {#2661}
[02:36:12] STUDENT_2: on whomsoever I subscribe or basically on interface.   {#2662}
[02:36:14] TEACHER: That's a good idea.   {#2663}
[02:36:15] TEACHER: You can implement it on the side.   {#2664}
[02:36:16] STUDENT_2: But then you said, yeah, but then you said it's a black box.   {#2665}
[02:36:19] STUDENT_2: So I thought, okay, then it's a black box, nothing to put them because we don't only   {#2666}
[02:36:23] STUDENT_2: have APIs on the library to call.   {#2667}
[02:36:25] STUDENT_2: So, uh, I mean, I, we assume if we could do something about me, we could do multiple   {#2668}
[02:36:29] STUDENT_2: things, but if you, uh, you leverage network to, uh, to a locking, so this could be an   {#2669}
[02:36:34] STUDENT_2: idea where you, uh, where consumers actually have an interesting to interface, uh, where   {#2670}
[02:36:38] STUDENT_2: the queue broadcast and you just try to get a port and then your any one of them can get get the   {#2671}
[02:36:42] STUDENT_2: port to talk on and then they start waiting and the broadcast comes in and then just try to   {#2672}
[02:36:46] STUDENT_5: compete to be honest that's a brilliant idea like i loved it i loved it because now you can very   {#2673}
[02:36:52] TEACHER: even that we went through load violence code you can very easily see how to do it network instead   {#2674}
[02:36:57] TEACHER: of having it an infinite clue accept the connection don't run threads on it and just handle it only   {#2675}
[02:37:03] TEACHER: one process will be able to connect to a server. Your server is never listening or never allowing   {#2676}
[02:37:08] TEACHER: to or sorry is never listening for any other client to do unless the first one has done processing.   {#2677}
[02:37:14] TEACHER: So that's how you can implement it. So normal TCP connection or is a normal   {#2678}
[02:37:18] TEACHER: TCP server that you can set up to get this done. Only one client can connect.   {#2679}
[02:37:25] STUDENT_2: So couldn't we prevent the cost?   {#2680}
[02:37:26] STUDENT_2: I mean, if Redis is hosted service, we prevent the cause.   {#2681}
[02:37:29] STUDENT_2: I mean, cause cam, we can also have the latest implemented.   {#2682}
[02:37:33] TEACHER: Other parts.   {#2683}
[02:37:34] TEACHER: You need those things.   {#2684}
[02:37:36] STUDENT_2: Hmm.   {#2685}
[02:37:37] STUDENT_2: Okay.   {#2686}
[02:37:38] STUDENT_2: Because here, uh, here the thing is, is it okay.   {#2687}
[02:37:40] STUDENT_2: The consumer dies then because the consumer dies, the TP goes down, right?   {#2688}
[02:37:44] STUDENT_2: If it dies also connection is gone.   {#2689}
[02:37:47] STUDENT_2: Q knows, okay, connection is down.   {#2690}
[02:37:48] STUDENT_2: That's proper.   {#2691}
[02:37:48] STUDENT_2: Yeah.   {#2692}
[02:37:49] TEACHER: You can implement.   {#2693}
[02:37:49] TEACHER: I'm not saying that's what I'm saying.   {#2694}
[02:37:50] TEACHER: I'm not saying no, there might be other things that we in this two minutes   {#2695}
[02:37:55] STUDENT_2: be skipping i cannot just say no you can just use it i have to do a column and compare features yeah   {#2696}
[02:38:00] TEACHER: yeah yeah but i loved how you thought it out of the box because it's very fundamental you just   {#2697}
[02:38:07] TEACHER: prevent others from connecting it right as super as that and that's and that's brilliant i just   {#2698}
[02:38:13] TEACHER: loved it and now i cannot stop thinking about it no it's fun it's fun it's fun uh which means that   {#2699}
[02:38:21] TEACHER: are writing your own server to accept the request it's it's it's a very easy interpretation to be   {#2700}
[02:38:25] STUDENT_5: honest you can actually implement it within few hours do that do that do that that's really   {#2701}
[02:38:29] STUDENT_5: interesting yeah okay thank you yeah yes yeah really interesting trust me i'm so happy and i'm   {#2702}
[02:38:38] STUDENT_5: i'm just i'm just thinking about that approach because yeah nice thanks thanks thanks for that   {#2703}
[02:38:47] STUDENT_5: Okay.   {#2704}
[02:38:47] STUDENT_5: Sorry.   {#2705}
[02:38:48] STUDENT_5: Yeah.   {#2706}
[02:38:50] STUDENT_1: Yeah.   {#2707}
[02:38:50] STUDENT_1: Hi, Arpit.   {#2708}
[02:38:51] STUDENT_1: So Arpit, in this case here we have used red log.   {#2709}
[02:38:54] STUDENT_1: So it's a key value store.   {#2710}
[02:38:57] STUDENT_1: So is it only red log or can't we use a MySQL system because we are just using a row here   {#2711}
[02:39:02] STUDENT_1: and you know, atomicity can be provided by MySQL.   {#2712}
[02:39:05] STUDENT_9: Yeah.   {#2713}
[02:39:06] STUDENT_1: If you can take care of TTL, your problem is my SQL.   {#2714}
[02:39:10] STUDENT_1: Okay.   {#2715}
[02:39:11] STUDENT_1: So TTL is the requirement because if let's say one server is, server is crashed.   {#2716}
[02:39:16] STUDENT_1: that case, how to remove that key.   {#2717}
[02:39:18] STUDENT_1: So basically for that reason only we need a TTL.   {#2718}
[02:39:20] STUDENT_9: Correct.   {#2719}
[02:39:20] TEACHER: Correct.   {#2720}
[02:39:21] TEACHER: In case you can have a crawl job that is taking care of TTL.   {#2721}
[02:39:24] TEACHER: Then you can use my SQL.   {#2722}
[02:39:26] TEACHER: That's what I said.   {#2723}
[02:39:27] TEACHER: That's why we, I always say you focus on the core properties that you   {#2724}
[02:39:29] TEACHER: need from the database rather than the database itself.   {#2725}
[02:39:32] TEACHER: Correct.   {#2726}
[02:39:32] TEACHER: Right.   {#2727}
[02:39:33] TEACHER: You can use my SQL.   {#2728}
[02:39:35] TEACHER: So long as you're taking care of TTL.   {#2729}
[02:39:36] STUDENT_1: Otherwise there will be perpetual lock.   {#2730}
[02:39:39] STUDENT_1: Got it.   {#2731}
[02:39:40] STUDENT_1: And one more point I didn't understand here.   {#2732}
[02:39:42] STUDENT_1: Uh, you, you mentioned Lua script to use.   {#2733}
[02:39:46] TEACHER: behind that. I don't know. Redis supports that. Read about Redis eval statement. Okay.   {#2734}
[02:39:53] TEACHER: It runs this in an atomic manner. Lua script using Lua scripts. So Lua as a language does   {#2735}
[02:39:58] TEACHER: not do something magical. Redis supports writing scripts and executing within Redis server as Lua   {#2736}
[02:40:04] STUDENT_1: Okay. So if you are writing these statements in let's say any language, let's say Golang or Python,   {#2737}
[02:40:10] STUDENT_1: this will not be   {#2738}
[02:40:13] STUDENT_1: implemented as a single   {#2739}
[02:40:14] STUDENT_1: piece of code. No, no, no.   {#2740}
[02:40:17] TEACHER: This is still Python.   {#2741}
[02:40:18] TEACHER: But these statements are Lua.   {#2742}
[02:40:21] TEACHER: Check eval statements.   {#2743}
[02:40:22] TEACHER: Eval, eval, eval. Read about   {#2744}
[02:40:24] TEACHER: eval.   {#2745}
[02:40:24] TEACHER: Read about eval.   {#2746}
[02:40:27] TEACHER: Read about eval. How to   {#2747}
[02:40:28] TEACHER: write scripts in Redis   {#2748}
[02:40:30] TEACHER: which you can invoke through Python. It's normal   {#2749}
[02:40:32] TEACHER: like you pass in script to Redis   {#2750}
[02:40:34] TEACHER: rather than a command to Redis.   {#2751}
[02:40:37] STUDENT_1: Got it.   {#2752}
[02:40:38] STUDENT_1: And I have a question in the load   {#2753}
[02:40:40] STUDENT_1: section also can i ask that after after after sure first we'll cover everything around locking so   {#2754}
[02:40:45] TEACHER: that there is no uh context which there that's got it yeah thank you so this is about uh   {#2755}
[02:40:53] STUDENT_1: implementation on queue i read uh implementation slightly different uh especially multiple   {#2756}
[02:41:00] STUDENT_1: consumers compared uh to read like no message or like no consume message right where what i read was   {#2757}
[02:41:08] STUDENT_1: once like no consumer like no places a log or like no sees the message to consume   {#2758}
[02:41:13] STUDENT_1: immediately it sets like no visibility to off so that other consumers cannot even see the message   {#2759}
[02:41:20] TEACHER: in queue this is a different queue that's what i said it's a hypothetical queue you're taking a very   {#2760}
[02:41:25] TEACHER: specific example i said in order for us to understand remote logs we're taking this example   {#2761}
[02:41:30] TEACHER: right it does not mean you'll go and re-architect your entire stuff through this it's a hypothetical   {#2762}
[02:41:37] TEACHER: zero protection. That's what I was saying. It gives you zero protection over here. Any   {#2763}
[02:41:41] TEACHER: message, any consumer that gets, just gets the message. What you're talking is very specific   {#2764}
[02:41:45] TEACHER: to the queue that you are using. And I said, this is a hypothetical queue. It does not   {#2765}
[02:41:49] TEACHER: give you any guarantees. If you talk about RabbitMQ, SQS, Kafka and whatnot, they give   {#2766}
[02:41:53] TEACHER: you this guarantee. So you don't have to do anything around it. Right? Yeah. I'm referring   {#2767}
[02:41:57] TEACHER: to OCI queue implementation. So there is. Yeah. So they give you that. So that's what   {#2768}
[02:42:02] TEACHER: I said. It's a hypothetical queue. That's what I started with. Right. We are playing   {#2769}
[02:42:07] TEACHER: constraint so that we understand log that's fine right okay okay thanks yeah uh my doubt was i mean   {#2770}
[02:42:18] STUDENT_4: might also basically like uh uh in the given figure like the consumer can directly go and   {#2771}
[02:42:24] STUDENT_4: get the values from the cube without acquiring the log but i think uh your prior that's what i said   {#2772}
[02:42:29] STUDENT_5: it is not protection the same message can go to multiple consumers i don't want that to happen   {#2773}
[02:42:33] STUDENT_5: That's what I said, right?   {#2774}
[02:42:34] STUDENT_4: No.   {#2775}
[02:42:35] STUDENT_4: Yeah.   {#2776}
[02:42:35] STUDENT_4: So my doubt was basically, I mean, here, if you see the consumer are going to getting   {#2777}
[02:42:41] STUDENT_4: the lock from Redis, but there is no connection between Redis and the queue.   {#2778}
[02:42:45] STUDENT_4: So why should there be?   {#2779}
[02:42:47] STUDENT_4: No, how would we, how would, how does the queue know that?   {#2780}
[02:42:50] STUDENT_4: I mean, I can simply write, write as a consumer, like get the value without getting the lock,   {#2781}
[02:42:55] STUDENT_4: right?   {#2782}
[02:42:56] STUDENT_4: In this case.   {#2783}
[02:42:57] TEACHER: Why?   {#2784}
[02:42:59] TEACHER: That's what I say.   {#2785}
[02:43:00] TEACHER: I mean, it's our consumer, our logic.   {#2786}
[02:43:02] TEACHER: We are writing it, right?   {#2787}
[02:43:05] TEACHER: So you would write it first, get the locket, then read the message.   {#2788}
[02:43:08] TEACHER: That's what the problem statement is.   {#2789}
[02:43:11] STUDENT_4: Yeah.   {#2790}
[02:43:12] STUDENT_4: I mean, later with the last answer, I understood like, because it's a hypothetical situation.   {#2791}
[02:43:16] TEACHER: Yeah.   {#2792}
[02:43:16] TEACHER: It's happened so that we understand remote lock situation.   {#2793}
[02:43:19] TEACHER: Now imagine where can you use remote lock?   {#2794}
[02:43:20] TEACHER: Imagine MongoDB distributed transaction across multiple charts.   {#2795}
[02:43:25] TEACHER: Now, for example, there are five charts, chart one, chart two, chart three, chart four, chart   {#2796}
[02:43:29] TEACHER: five.   {#2797}
[02:43:29] TEACHER: MongoDB is running a distributed transaction in which you updated rows, three documents   {#2798}
[02:43:33] TEACHER: in MongoDB one lies in shard one one lies in shard three one lies in shard five.   {#2799}
[02:43:37] TEACHER: There is another transaction that is coming in which wants to update the exact same documents.   {#2800}
[02:43:43] TEACHER: You have to make the transaction wait because first transaction has acquired a lock on that   {#2801}
[02:43:48] TEACHER: document in shard one that would document in shard two that document in shard five.   {#2802}
[02:43:52] TEACHER: Where would you store this information?   {#2803}
[02:43:54] TEACHER: Two transactions distributed nature in a remote block.   {#2804}
[02:43:59] TEACHER: Right?   {#2805}
[02:43:59] TEACHER: You need to keep track of it so that your transaction cannot move forward.   {#2806}
[02:44:03] TEACHER: directly talk to it if you it's your code you have to implement it right so what mongodb does is   {#2807}
[02:44:07] TEACHER: it gives you those guarantees but how it is implementing it it is having its own lock manager   {#2808}
[02:44:12] TEACHER: where it is saying that this transaction has taken lock on this row or this document part of this   {#2809}
[02:44:19] TEACHER: chart this document part of this chart this document part of this chart other transaction   {#2810}
[02:44:23] TEACHER: comes in it says hey i want lock on this document on this show but say oh no but this lock is without   {#2811}
[02:44:28] TEACHER: this transition so wait so the transaction would wait until this transaction either commits or rolls   {#2812}
[02:44:34] TEACHER: We implemented it same thing over here.   {#2813}
[02:44:37] TEACHER: Three consumers trying to read something, a shared resource.   {#2814}
[02:44:41] TEACHER: We are keeping track of logs so that only one of them can move forward.   {#2815}
[02:44:46] TEACHER: What we just said is just MongoDB distributed.   {#2816}
[02:44:48] TEACHER: We just implemented a distributed transaction where we are using Redis as a lock.   {#2817}
[02:44:54] STUDENT_4: Sure.   {#2818}
[02:44:55] STUDENT_4: Got it.   {#2819}
[02:44:57] STUDENT_9: Sampai.   {#2820}
---- OWNED SEGMENTS END ----

CTX| [02:44:59] STUDENT_1: Yeah.   {#2821}
CTX| [02:45:00] STUDENT_1: Hello.   {#2822}
CTX| [02:45:00] STUDENT_1: Okay.   {#2823}
CTX| [02:45:00] STUDENT_1: So my thought process is around the part where you explained when we try to synchronize two threads and then two processes and then two machines.   {#2824}
CTX| [02:45:14] STUDENT_1: So basically, if we try to synchronize two different entities, then we always try to look for the nearest shared storage system.   {#2825}
CTX| [02:45:28] STUDENT_1: Correct.   {#2826}
CTX| [02:45:29] STUDENT_1: For the best purpose.   {#2827}
CTX| [02:45:31] STUDENT_1: Okay, so this is the fundamental principle we always follow.   {#2828}
CTX| [02:45:35] STUDENT_1: So basically for two threads, the nearest storage is the in-memory RAM.   {#2829}
CTX| [02:45:41] STUDENT_1: So we are using this Manutex and Semaphore for two processes.   {#2830}
CTX| [02:45:44] STUDENT_1: RAM is separated, so disk is there.   {#2831}
CTX| [02:45:46] STUDENT_1: Similarly, for two different machines, the nearest one is the database, external database.   {#2832}
CTX| [02:45:51] STUDENT_9: Excellent.   {#2833}
CTX| [02:45:52] STUDENT_9: Anything over a network.   {#2834}
CTX| [02:45:54] STUDENT_1: Yeah, so now let's say we have two different, two independent distributed systems.   {#2835}
