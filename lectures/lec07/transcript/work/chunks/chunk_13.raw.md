# chunk_13  OWNS 02:27:23 -> 02:39:19  (segments #2607-#2833, 1987 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:26:23] TEACHER: routing. So you might have this question that does every node know about every other node in the   {#2598}
CTX| [02:26:29] TEACHER: internet? No, but then still it tends to somehow route the request and converge it to the node that   {#2599}
CTX| [02:26:35] TEACHER: has it. Right. That's what Kademlia does for you. Right. So in case interested, it's there on my   {#2600}
CTX| [02:26:41] TEACHER: YouTube BitTorrent series where you'll find Kademlia video. I don't know how that video   {#2601}
CTX| [02:26:46] TEACHER: does get viral, but that's fine. Watch it. Watch it. It's very fascinating concept. Very fascinating   {#2602}
CTX| [02:26:53] TEACHER: in love with distributed systems after watching that 100% guarantee right okay so these are dhds   {#2603}
CTX| [02:27:01] TEACHER: anything that i think we covered right okay uh okay uh high availability okay now let's talk   {#2604}
CTX| [02:27:11] TEACHER: about high availability because when you're building a cache see if it's a cache it's a   {#2605}
CTX| [02:27:16] TEACHER: different thing if it's a persistent storage it might be a little different but in basic concepts   {#2606}

---- OWNED SEGMENTS START ----
[02:27:23] TEACHER: availability ever ever the way to do it is adding replicas right for every node have a replica if a   {#2607}
[02:27:32] TEACHER: node goes down replica takes its place but it comes with its cost of maintaining that other node right   {#2608}
[02:27:37] TEACHER: but if availability is important for you you do that otherwise have copy of data on other node   {#2609}
[02:27:44] TEACHER: let's say whatever data is on cache 1 i have one copy of it in cache 3 whatever data i have on   {#2610}
[02:27:50] TEACHER: cache 3 I have one copy of it in cache 4. So in case my cache 3 goes down I know my cache 1's data   {#2611}
[02:27:57] TEACHER: sorry in case my cache 3 goes down my cache 4 will have data for cache 3. So any request for cache 3   {#2612}
[02:28:04] TEACHER: can also be handled by cache 4. So that's the beauty of this ring that you can have a replication   {#2613}
[02:28:09] TEACHER: factor of your data and you can say that hey this data is replication factor of let's say 2 which   {#2614}
[02:28:15] TEACHER: means the node that owns it stores it and two nodes immediately after that in the ring   {#2615}
[02:28:20] TEACHER: would have the data.   {#2616}
[02:28:22] TEACHER: So in case a node goes down, you know where to find the data and reconstruct this node   {#2617}
[02:28:26] TEACHER: if required.   {#2618}
[02:28:27] TEACHER: That is high availability.   {#2619}
[02:28:29] TEACHER: So data redundancy is a way to get high availability either across nodes or across system.   {#2620}
[02:28:37] TEACHER: Like create a standby server or a replica over here.   {#2621}
[02:28:40] TEACHER: If this goes down, replica takes its place.   {#2622}
[02:28:43] TEACHER: that's how you can ensure high availability   {#2623}
[02:28:45] TEACHER: standard practice has to do   {#2624}
[02:28:46] TEACHER: when it comes to reliability   {#2625}
[02:28:48] TEACHER: even for your cache it is important   {#2626}
[02:28:51] TEACHER: so even redis   {#2627}
[02:28:52] TEACHER: has this AOF file format   {#2628}
[02:28:55] TEACHER: which is redis's write ahead log   {#2629}
[02:28:57] TEACHER: it's called AIF append only file   {#2630}
[02:29:00] TEACHER: so what it does is   {#2631}
[02:29:01] TEACHER: every time you write something to redis   {#2632}
[02:29:03] TEACHER: it makes an entry into that file   {#2633}
[02:29:05] TEACHER: and it loads it when your cache   {#2634}
[02:29:07] TEACHER: rebuilds let's say you rebooted it   {#2635}
[02:29:09] TEACHER: it loads everything from the AIF file   {#2636}
[02:29:12] TEACHER: cash that you have.   {#2637}
[02:29:14] TEACHER: Standard way to ensure reliability or durability.   {#2638}
[02:29:19] TEACHER: Actually, durability is the right one.   {#2639}
[02:29:21] TEACHER: This is how you think about consistent hash.   {#2640}
[02:29:25] TEACHER: This is how you think about making things distributed.   {#2641}
[02:29:30] TEACHER: So storage, you store it in separate nodes with some routing logic,   {#2642}
[02:29:34] TEACHER: with some logic to determine ownership,   {#2643}
[02:29:36] TEACHER: hash based routing, partition, range based routing,   {#2644}
[02:29:39] TEACHER: two very common ways to do it.   {#2645}
[02:29:42] TEACHER: You have a hash function and you take care of that.   {#2646}
[02:29:45] TEACHER: Key passing the hash function, get the ID and connect it there.   {#2647}
[02:29:50] TEACHER: Then you have which is what your routing layer consists of.   {#2648}
[02:29:54] TEACHER: Now, when it comes to routing, there are four ways to do routing.   {#2649}
[02:29:56] TEACHER: It applies to any distributed system in the world.   {#2650}
[02:29:59] TEACHER: Not everyone will suit everywhere.   {#2651}
[02:30:01] TEACHER: Pick your battles, which one to suit where.   {#2652}
[02:30:02] TEACHER: Everything has pros and cons.   {#2653}
[02:30:05] TEACHER: Identify it.   {#2654}
[02:30:06] TEACHER: But we spoke in depth about the routing side of things.   {#2655}
[02:30:08] TEACHER: Then around availability, adding replicas and all.   {#2656}
[02:30:12] TEACHER: reliability around load scaling consistent touching when you're adding monodes you mean   {#2657}
[02:30:17] TEACHER: more not doing minimal data transfer is important and this concludes everything about distributed   {#2658}
[02:30:23] TEACHER: cache we spend a lot of time talking about single node implementation details and we spoke in depth   {#2659}
[02:30:30] TEACHER: about making things scalable right okay any questions on high level part of it before we   {#2660}
[02:30:35] TEACHER: go on and take questions on other side first let's talk about highly adubav   {#2661}
[02:30:42] STUDENT_5: Yeah, but I had a question on routing.   {#2662}
[02:30:46] STUDENT_5: So we, in the radius's way of routing, which is DNS like we still have a network   {#2663}
[02:30:52] STUDENT_5: hub, but it is, could not decide to use a load balancer.   {#2664}
[02:30:55] STUDENT_5: Was it to just simplify the infrastructure to use it?   {#2665}
[02:30:59] STUDENT_5: Exactly.   {#2666}
[02:31:00] TEACHER: Why to have another couple, let the node itself take care of that.   {#2667}
[02:31:04] TEACHER: So it's, and it does not do it for every time.   {#2668}
[02:31:06] TEACHER: It just does it in case of replicas.   {#2669}
[02:31:08] TEACHER: So if you're firing a write request on replica, it's   {#2670}
[02:31:12] TEACHER: you the IP address of the master and request you to connect to that.   {#2671}
[02:31:16] STUDENT_5: Okay. And for read request, the client is supposed to know which Redis.   {#2672}
[02:31:21] TEACHER: Both ways are there. So Redis Sentinel solves that problem. So Redis is evolving. Now it has   {#2673}
[02:31:25] TEACHER: a proxy you can define that has that information that becomes a face of it and it takes care of   {#2674}
[02:31:31] TEACHER: routing and whatnot. So there are a lot of changes happening. I'm still yet to basically catch up on   {#2675}
[02:31:35] TEACHER: that. Let me catch up on that and if I get hold of it, I'll definitely try to answer that. But   {#2676}
[02:31:42] TEACHER: I know this is how Redis does when you are firing write request on Replica,   {#2677}
[02:31:47] TEACHER: 100%.   {#2678}
[02:31:48] TEACHER: Around routing in a distributed Sentinel setup that it has,   {#2679}
[02:31:52] TEACHER: I'm not sure how routing happens today.   {#2680}
[02:31:55] TEACHER: So I'll not comment on that,   {#2681}
[02:31:58] TEACHER: but go through the talks on how that routing happens today.   {#2682}
[02:32:00] TEACHER: A lot of things have changed since the last time I visited.   {#2683}
[02:32:04] STUDENT_5: Got it.   {#2684}
[02:32:04] STUDENT_5: So my takeaway is that it can be a mix of two or more of these approaches   {#2685}
[02:32:09] STUDENT_5: for different ways.   {#2686}
[02:32:10] TEACHER: Yeah, for each of these.   {#2687}
[02:32:13] TEACHER: So this is typically how if you fire write request or read replica,   {#2688}
[02:32:17] TEACHER: it would spit out IP address of the master node.   {#2689}
[02:32:19] TEACHER: That is the most common way.   {#2690}
[02:32:21] TEACHER: Almost all databases adopt this.   {#2691}
[02:32:23] TEACHER: Almost all databases.   {#2692}
[02:32:24] TEACHER: Either a database can choose to just discard the request and return an   {#2693}
[02:32:27] TEACHER: error and say, go find the master node.   {#2694}
[02:32:30] TEACHER: It's how like the humans behave, right?   {#2695}
[02:32:34] TEACHER: Same thing.   {#2696}
[02:32:34] TEACHER: I don't know.   {#2697}
[02:32:35] TEACHER: Go find on your own.   {#2698}
[02:32:36] TEACHER: Right.   {#2699}
[02:32:36] TEACHER: Otherwise someone kind enough to say, oh, this is where you should go.   {#2700}
[02:32:39] TEACHER: So, in most cases you would see this as an implementation.   {#2701}
[02:32:44] STUDENT_5: Got it.   {#2702}
[02:32:45] STUDENT_5: Yeah.   {#2703}
[02:32:46] TEACHER: Thank you.   {#2704}
[02:32:47] TEACHER: Nitin?   {#2705}
[02:32:50] STUDENT_2: So, I had few questions related to consistent hash.   {#2706}
[02:32:54] STUDENT_2: So, is there a possibility where nodes in the ring are placed too close?   {#2707}
[02:33:00] TEACHER: Yes, then that's a disadvantage of consistent hash because it's not in your control.   {#2708}
[02:33:06] STUDENT_2: Okay.   {#2709}
[02:33:06] STUDENT_2: And also the possibility where a lot of keys are densely populated, like certain area of   {#2710}
[02:33:13] STUDENT_2: the ring is densely populated.   {#2711}
[02:33:17] TEACHER: Yes, very much possible.   {#2712}
[02:33:19] TEACHER: Hot partition problem.   {#2713}
[02:33:20] TEACHER: That is there.   {#2714}
[02:33:22] TEACHER: Consistent hashing suffers from both.   {#2715}
[02:33:25] TEACHER: Consistent hashing.   {#2716}
[02:33:26] TEACHER: Unfortunately, what is happening is in case of consistent hashing, because it is hash   {#2717}
[02:33:30] TEACHER: based strategy, you are giving the control to an untim hash function.   {#2718}
[02:33:36] TEACHER: please do it uniformly enough the best you could.   {#2719}
[02:33:39] TEACHER: But if your key distribution is bad   {#2720}
[02:33:41] TEACHER: and your hash function is bad,   {#2721}
[02:33:43] TEACHER: what would happen is you would not see that uniform distribution.   {#2722}
[02:33:45] TEACHER: So you would see hotspots,   {#2723}
[02:33:46] TEACHER: a particular node getting very hot as compared to others.   {#2724}
[02:33:49] TEACHER: And then you add one more node   {#2725}
[02:33:51] TEACHER: just to try to mitigate that particular solution,   {#2726}
[02:33:54] TEACHER: that particular situation.   {#2727}
[02:33:56] TEACHER: But consider rushing suffers from all this problem.   {#2728}
[02:33:59] TEACHER: But then why are companies still using it?   {#2729}
[02:34:02] TEACHER: Consider rushing typically makes us scaling up,   {#2730}
[02:34:04] TEACHER: scaling down simple enough.   {#2731}
[02:34:06] TEACHER: the range is not short enough it's long enough two raised to power 120 it's a jive   {#2732}
[02:34:11] TEACHER: can take the range what are the odds so everyone's playing by the odds   {#2733}
[02:34:18] STUDENT_2: okay got it   {#2734}
[02:34:22] TEACHER: any other question   {#2735}
[02:34:25] STUDENT_9: um no okay you said you had few questions that's why i was waiting for that that's right   {#2736}
[02:34:30] STUDENT_2: okay i mean most of the questions were most of the questions were answered by you i mean like   {#2737}
[02:34:36] STUDENT_2: to like interpret all of these points.   {#2738}
[02:34:38] STUDENT_2: So yeah, thanks.   {#2739}
[02:34:40] STUDENT_9: Thanks.   {#2740}
[02:34:40] STUDENT_1: Okay.   {#2741}
[02:34:41] STUDENT_1: Hemant.   {#2742}
[02:34:43] STUDENT_1: I would like to just understand a few places.   {#2743}
[02:34:47] STUDENT_1: I have read about virtual nodes inside this ring.   {#2744}
[02:34:54] STUDENT_1: So what they suggest, I'm not sure how good it is.   {#2745}
[02:34:59] STUDENT_1: And that's why my question is, if we divide the ring in virtual parts,   {#2746}
[02:35:06] STUDENT_1: I'm dividing it like 10 or 20 or something.   {#2747}
[02:35:10] STUDENT_1: And these virtual notes are on actual physical notes via grouping.   {#2748}
[02:35:18] STUDENT_1: Then is it really a good strategy?   {#2749}
[02:35:21] STUDENT_1: Because I do not find a confidence on that.   {#2750}
[02:35:24] STUDENT_1: Why?   {#2751}
[02:35:27] STUDENT_1: You said why?   {#2752}
[02:35:28] STUDENT_1: Why, yes.   {#2753}
[02:35:29] TEACHER: Why are you not confident on the strategy?   {#2754}
[02:35:32] STUDENT_1: Why I'm not finding confidence is the logic behind   {#2755}
[02:35:38] STUDENT_1: consistent has to minimize the data transfer or with partitioning.   {#2756}
[02:35:44] STUDENT_1: Whatever you use ownership, I said partitioning.   {#2757}
[02:35:46] STUDENT_1: Yeah.   {#2758}
[02:35:47] STUDENT_1: Same word.   {#2759}
[02:35:49] STUDENT_1: List if I try to divide in a very small chunks and I see few of the chunks   {#2760}
[02:35:55] STUDENT_1: which are not on a consecutive line in the ring, go to different servers.   {#2761}
[02:36:00] STUDENT_1: Then if one server goes down, I see a lot of chunks has to move   {#2762}
[02:36:06] STUDENT_1: In place of the current strategy that you have.   {#2763}
[02:36:10] STUDENT_1: So it's just only a two kind of a transfer.   {#2764}
[02:36:13] STUDENT_1: I can see.   {#2765}
[02:36:14] STUDENT_1: Yes.   {#2766}
[02:36:14] STUDENT_1: So I do not find that.   {#2767}
[02:36:15] STUDENT_1: Is it the right way of taking out?   {#2768}
[02:36:18] STUDENT_1: Yes.   {#2769}
[02:36:19] STUDENT_1: Yes.   {#2770}
[02:36:20] STUDENT_1: Yes.   {#2771}
[02:36:20] TEACHER: Yes.   {#2772}
[02:36:21] TEACHER: A thousand times.   {#2773}
[02:36:22] TEACHER: Yes.   {#2774}
[02:36:22] TEACHER: My God.   {#2775}
[02:36:23] TEACHER: You are on fire today.   {#2776}
[02:36:25] TEACHER: This is exactly what a disadvantage of having virtual nodes is.   {#2777}
[02:36:30] TEACHER: If you do that, like imagine now think operationally.   {#2778}
[02:36:34] TEACHER: I mean, this goes for everybody.   {#2779}
[02:36:36] TEACHER: hear whenever someone's explaining consistent hashing they talk about virtual nodes.   {#2780}
[02:36:40] TEACHER: In case of stateful systems like this cache where nodes itself are storing stateful data.   {#2781}
[02:36:46] TEACHER: Now what happens is when we added cache 5 in the system, what did we do?   {#2782}
[02:36:51] TEACHER: We took the snapshot of cache 1 and put it over here.   {#2783}
[02:36:56] TEACHER: It made life so simple for us.   {#2784}
[02:37:00] TEACHER: The data movement that was happening was operational if you think about it.   {#2785}
[02:37:03] TEACHER: You just have to take a quick snapshot of this cache and load this cache from it.   {#2786}
[02:37:07] TEACHER: It's a very efficient implementation, right?   {#2787}
[02:37:10] TEACHER: Nothing fancy then.   {#2788}
[02:37:11] TEACHER: As soon as you add complexities of virtual nodes, what happens is when you   {#2789}
[02:37:15] TEACHER: are spinning up this part, you, this node will be placed at multiple places.   {#2790}
[02:37:19] TEACHER: Now from multiple other places, you have to load data on this server.   {#2791}
[02:37:23] TEACHER: Operationally that becomes challenging.   {#2792}
[02:37:25] TEACHER: You might miss out on something or one of the things, transferring data from one   {#2793}
[02:37:29] TEACHER: of the other nodes is slow enough.   {#2794}
[02:37:31] TEACHER: It's slowing down your process.   {#2795}
[02:37:33] TEACHER: So adding virtual nodes is not a good idea to solve hot partition problem.   {#2796}
[02:37:38] TEACHER: And it is stateful use case, not a good idea.   {#2797}
[02:37:41] TEACHER: Companies still do it.   {#2798}
[02:37:42] TEACHER: There are hacks around it.   {#2799}
[02:37:43] TEACHER: But if you think about operational, the operational expense that comes in, in order to spin up   {#2800}
[02:37:49] TEACHER: infrastructure, find out nodes for you to copy the data, you have to copy data from a lot   {#2801}
[02:37:54] TEACHER: of places instead of just one.   {#2802}
[02:37:55] TEACHER: They're doing still doing a lot of network transfer, which you started consistent hashing   {#2803}
[02:38:01] TEACHER: just to reduce that.   {#2804}
[02:38:03] TEACHER: But now you're doing that other part.   {#2805}
[02:38:05] TEACHER: So that's the limitation of using virtual.   {#2806}
[02:38:08] TEACHER: Thank you so much for bringing this up and this is   {#2807}
[02:38:11] TEACHER: it precisely where it falters, right?   {#2808}
[02:38:14] TEACHER: But again, it's not that it's bad.   {#2809}
[02:38:16] TEACHER: I'm sorry.   {#2810}
[02:38:17] TEACHER: It's not that it's worst.   {#2811}
[02:38:18] TEACHER: It's still bad enough.   {#2812}
[02:38:19] TEACHER: So long as you are operationally okay to do, to take up this amount   {#2813}
[02:38:23] TEACHER: of network transfer, it's okay.   {#2814}
[02:38:25] TEACHER: Right.   {#2815}
[02:38:26] TEACHER: But if you want to keep things operationally simple, which I prefer a lot,   {#2816}
[02:38:29] TEACHER: I would just do this.   {#2817}
[02:38:31] TEACHER: this one node copy paste here   {#2818}
[02:38:33] TEACHER: their server up and running in a   {#2819}
[02:38:35] TEACHER: in a brisk and   {#2820}
[02:38:37] TEACHER: I'm done right so I would   {#2821}
[02:38:39] TEACHER: like to keep things simple as compared to   {#2822}
[02:38:41] TEACHER: things operationally complex because simple   {#2823}
[02:38:43] TEACHER: systems scale and this is precisely   {#2824}
[02:38:45] TEACHER: where virtual   {#2825}
[02:38:47] TEACHER: nodes is a bad idea right   {#2826}
[02:38:49] TEACHER: thanks so much for making that   {#2827}
[02:38:51] TEACHER: okay   {#2828}
[02:38:53] TEACHER: any other question anyone   {#2829}
[02:38:55] TEACHER: yeah Gaurav   {#2830}
[02:38:57] STUDENT_6: not related to today's topic I have some   {#2831}
[02:39:01] TEACHER: let's let's complete consistent and then i'm more than happy to take care any questions on   {#2832}
[02:39:05] TEACHER: distributed cache in general that we discussed today throughout rajiv go to my lock my lock page   {#2833}
---- OWNED SEGMENTS END ----

CTX| [02:39:19] STUDENT_3: no i have been a c developer for a while so uh my lock doesn't return uh the sec fault when   {#2834}
CTX| [02:39:25] STUDENT_3: the heap goes out it returns the null pointer and c plus plus we get bad alloc as exception   {#2835}
CTX| [02:39:32] STUDENT_3: So this use case makes sense where you want to ask the user, how much memory you want   {#2836}
CTX| [02:39:36] STUDENT_3: to allocate for a cache.   {#2837}
CTX| [02:39:37] STUDENT_3: So you take in the memory, you just put it over there, but in general, if you want to   {#2838}
CTX| [02:39:40] STUDENT_3: leverage the whole system, you just check whether the return type of malloc is null   {#2839}
CTX| [02:39:45] STUDENT_3: or not.   {#2840}
CTX| [02:39:46] STUDENT_3: If it is null, you want to affect 100% 100% malloc returns null.   {#2841}
CTX| [02:39:50] TEACHER: I totally agree with that.   {#2842}
CTX| [02:39:51] TEACHER: But when you go beyond that, the program actually causes, I simulated it while I was building   {#2843}
CTX| [02:39:56] TEACHER: Here it is.   {#2844}
CTX| [02:39:57] TEACHER: It crashed.   {#2845}
CTX| [02:39:58] TEACHER: It came down.   {#2846}
CTX| [02:39:59] TEACHER: So obviously you know it better than me, but when you allocate using malloc,   {#2847}
CTX| [02:40:05] TEACHER: it assigns a virtual page, not a physical page.   {#2848}
CTX| [02:40:07] TEACHER: Right?   {#2849}
CTX| [02:40:08] TEACHER: So although your RAM is, let's say 4 GB, but your malloc can allocate 40 GB   {#2850}
CTX| [02:40:13] TEACHER: virtual space.   {#2851}
CTX| [02:40:14] TEACHER: So it starts allocating physical pages when you're actually starting to use   {#2852}
CTX| [02:40:18] TEACHER: the logical pages.   {#2853}
