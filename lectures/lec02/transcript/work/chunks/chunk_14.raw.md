# chunk_14  OWNS 02:41:34 -> 02:54:33  (segments #2627-#2914, 2277 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:40:38] STUDENT_4: be sufficiently secure.   {#2603}
CTX| [02:40:40] TEACHER: So now that you are altering it, if you are having that as a critical information, then   {#2604}
CTX| [02:40:46] TEACHER: you rely on a back end DPA call to get it.   {#2605}
CTX| [02:40:48] TEACHER: But then you have to put your head servers behind a load balancer private or infrastructure   {#2606}
CTX| [02:40:53] TEACHER: problem solved.   {#2607}
CTX| [02:40:55] TEACHER: Correct.   {#2608}
CTX| [02:40:55] TEACHER: All right.   {#2609}
CTX| [02:40:57] TEACHER: Right.   {#2610}
CTX| [02:40:58] TEACHER: So that's why I have deliberately designed it in a way that makes you ask these questions.   {#2611}
CTX| [02:41:03] TEACHER: Right.   {#2612}
CTX| [02:41:04] TEACHER: Think on those lines.   {#2613}
CTX| [02:41:05] TEACHER: Now what you brought up is an excellent point.   {#2614}
CTX| [02:41:07] TEACHER: What is your private tenants?   {#2615}
CTX| [02:41:08] TEACHER: Because now user can falsely claim it.   {#2616}
CTX| [02:41:10] TEACHER: I am part of this channel.   {#2617}
CTX| [02:41:11] TEACHER: Give me all the messages.   {#2618}
CTX| [02:41:12] TEACHER: Now you start receiving messages of that.   {#2619}
CTX| [02:41:14] TEACHER: So you are literally doing a man in a middle attack.   {#2620}
CTX| [02:41:17] TEACHER: You don't want that to happen.   {#2621}
CTX| [02:41:18] TEACHER: So now what do you do?   {#2622}
CTX| [02:41:19] TEACHER: You make this service private, put it behind a load balancer and make this ad server talk   {#2623}
CTX| [02:41:24] TEACHER: to your database or maybe make an API call periodically to get the channel information.   {#2624}
CTX| [02:41:30] STUDENT_4: Got it.   {#2625}
CTX| [02:41:31] STUDENT_1: Thanks.   {#2626}

---- OWNED SEGMENTS START ----
[02:41:34] STUDENT_1: Yeah.   {#2627}
[02:41:35] STUDENT_1: So I was thinking of another way of designing it.   {#2628}
[02:41:38] STUDENT_1: So we can have one service which tells the server that you have to send this message   {#2629}
[02:41:42] STUDENT_1: to this client.   {#2630}
[02:41:43] TEACHER: That's all right.   {#2631}
[02:41:44] TEACHER: We can have every time you're making call to that service to tell which server to send   {#2632}
[02:41:48] TEACHER: it far too expensive.   {#2633}
[02:41:50] TEACHER: Then that's not real time because then that service is oververted.   {#2634}
[02:41:54] STUDENT_1: do that that's not at all real time okay so i was thinking like it can uh like it can catch the   {#2635}
[02:42:01] TEACHER: users data which is still slow still slow making a network call every time to get it where to send it   {#2636}
[02:42:06] TEACHER: very slow never see it depends like you can build it that way you can also make a call to tv and get   {#2637}
[02:42:14] TEACHER: it and build it it's about how real time you want this to be and making a call to a service just to   {#2638}
[02:42:19] TEACHER: get that information every time.   {#2639}
[02:42:22] TEACHER: I wouldn't build it when I'm building a real time communication.   {#2640}
[02:42:25] TEACHER: I would just want to do a build a very simple system, just adding a service for the sake   {#2641}
[02:42:30] TEACHER: of it, just to tell you where to forward it to is an over.   {#2642}
[02:42:34] TEACHER: I can very well store this information over here.   {#2643}
[02:42:36] TEACHER: Right.   {#2644}
[02:42:37] TEACHER: Not just part of a service.   {#2645}
[02:42:40] STUDENT_1: Okay.   {#2646}
[02:42:40] STUDENT_1: And another question was that in this system, we are guaranteeing that if, if user sends   {#2647}
[02:42:46] STUDENT_1: a message, we will persist it.   {#2648}
[02:42:47] STUDENT_1: But the notification to all the users is not guaranteed right now.   {#2649}
[02:42:51] STUDENT_1: Right.   {#2650}
[02:42:52] STUDENT_1: It might happen that the message gets lost in the Redis.   {#2651}
[02:42:55] STUDENT_1: Like when Redis is transferring it to the server, but when the user refreshes it, he   {#2652}
[02:43:00] STUDENT_1: will get it.   {#2653}
[02:43:00] STUDENT_15: Correct.   {#2654}
[02:43:01] STUDENT_1: Yeah.   {#2655}
[02:43:02] STUDENT_1: So the notification part is not guaranteed there, but the persistence is guaranteed.   {#2656}
[02:43:06] TEACHER: Persistence is guaranteed.   {#2657}
[02:43:06] TEACHER: Yeah.   {#2658}
[02:43:07] TEACHER: Enterprise application, persistence guaranteed.   {#2659}
[02:43:09] TEACHER: More important.   {#2660}
[02:43:10] TEACHER: Right.   {#2661}
[02:43:11] TEACHER: Yeah.   {#2662}
[02:43:12] TEACHER: Thanks.   {#2663}
[02:43:13] TEACHER: Vikram.   {#2664}
[02:43:14] STUDENT_3: Yes.   {#2665}
[02:43:15] STUDENT_3: So I didn't, so I had some confusion in the, that the, that the web socket servers are   {#2666}
[02:43:21] STUDENT_3: subscribing for a channel to the Redis copsev, right?   {#2667}
[02:43:24] STUDENT_3: So what, what if there are, uh, means lots of users and lots of different organizations.   {#2668}
[02:43:29] STUDENT_3: Uh, so how do we keep track of which channels and just subscribe?   {#2669}
[02:43:33] TEACHER: That's exactly the, I said, this is not just one Redis instance.   {#2670}
[02:43:36] TEACHER: These are multiple Redis, a cluster of Redis, right?   {#2671}
[02:43:39] TEACHER: And what this balance service would try to keep it all users to be connected on one edge   {#2672}
[02:43:45] TEACHER: users of an organization connected to one server so that you do this minimal transfer on this   {#2673}
[02:43:49] TEACHER: radius. That's the job of this balancer, right? Because you can very easily do this, right?   {#2674}
[02:43:54] TEACHER: When a user comes up and says, Hey, I'm part of this organization. Where should I connect   {#2675}
[02:43:57] TEACHER: to balance or always sends IP address of this one edge server only. Yeah. And everyone of   {#2676}
[02:44:02] TEACHER: that one organization connects to that one edge server. You minimize the IO happening   {#2677}
[02:44:06] TEACHER: on this studies, but in any case, this can be clustered. Okay. So this is for only worst   {#2678}
[02:44:11] STUDENT_3: case worst case scenario yeah yeah and another question is i didn't understand the public uh   {#2679}
[02:44:18] STUDENT_3: that that someone said that age servers are public uh uh uh this public iip part uh can you please   {#2680}
[02:44:26] TEACHER: explain if age server is public what would happen uh means anyone can people that can attack right   {#2681}
[02:44:33] TEACHER: how do you prevent it you put it behind a load balancer but if you put it behind a load balancer   {#2682}
[02:44:38] TEACHER: So you're adding one more hop.   {#2683}
[02:44:39] TEACHER: So five, five milliseconds of extended latency.   {#2684}
[02:44:43] TEACHER: If you want that, you put it behind the load balancer.   {#2685}
[02:44:46] TEACHER: If that latency is not okay for you, you, you basically keep it public.   {#2686}
[02:44:50] TEACHER: Both are fine.   {#2687}
[02:44:51] TEACHER: Yeah.   {#2688}
[02:44:51] STUDENT_3: But we are keeping the servers open, assigning public address   {#2689}
[02:44:57] TEACHER: because we are making it public.   {#2690}
[02:45:01] TEACHER: Yeah.   {#2691}
[02:45:02] TEACHER: And that's fine because there is no sensitive information here.   {#2692}
[02:45:05] TEACHER: Right.   {#2693}
[02:45:06] TEACHER: There is no sensitivity because all it is there is just one route for this balancer service   {#2694}
[02:45:12] TEACHER: which just spits out IP addresses, a bunch of TCP connections connected to it and one   {#2695}
[02:45:16] TEACHER: connection string for Kafka that also does not hold any secret.   {#2696}
[02:45:20] TEACHER: It just pushes the message.   {#2697}
[02:45:22] TEACHER: Nothing fancy over here.   {#2698}
[02:45:23] TEACHER: So you can keep it either way.   {#2699}
[02:45:26] TEACHER: You can keep it public on the internet with minimal critical things over here or put it   {#2700}
[02:45:32] TEACHER: behind a load balancer, take the three or five millisecond extra latency or extra hop   {#2701}
[02:45:36] TEACHER: and do it either way is fine.   {#2702}
[02:45:38] TEACHER: Yeah.   {#2703}
[02:45:40] TEACHER: Okay.   {#2704}
[02:45:44] STUDENT_3: Yeah.   {#2705}
[02:45:45] STUDENT_3: From what it seems like, can we conclude that red is pubs up and Kafka kind of same.   {#2706}
[02:45:51] TEACHER: No.   {#2707}
[02:45:52] TEACHER: Persistence real time pubs up Kafka gives you.   {#2708}
[02:45:57] STUDENT_3: So so the, and Kafka is asynchronous.   {#2709}
[02:46:00] STUDENT_3: That's it.   {#2710}
[02:46:01] STUDENT_3: Right.   {#2711}
[02:46:03] TEACHER: I don't know what to be as synchronous.   {#2712}
[02:46:06] TEACHER: People pull Kafka is a full base thing.   {#2713}
[02:46:08] TEACHER: People consumers pull message from Kafka.   {#2714}
[02:46:11] TEACHER: Redis PubSub pushes message.   {#2715}
[02:46:12] TEACHER: It's very different.   {#2716}
[02:46:13] TEACHER: Redis pushes the message to everyone connected.   {#2717}
[02:46:16] TEACHER: Kafka gives a persistence of historical messages.   {#2718}
[02:46:18] TEACHER: Redis gives you zero persistence on PubSub.   {#2719}
[02:46:21] TEACHER: Big changes.   {#2720}
[02:46:22] TEACHER: Right.   {#2721}
[02:46:23] TEACHER: Okay.   {#2722}
[02:46:24] TEACHER: So it's, it's superior to Kafka.   {#2723}
[02:46:28] TEACHER: No, nothing is superior.   {#2724}
[02:46:29] TEACHER: Nothing is inferior.   {#2725}
[02:46:30] TEACHER: Kafka is good in its own space.   {#2726}
[02:46:32] TEACHER: is good in its own space.   {#2727}
[02:46:35] TEACHER: Because superior read in case of what?   {#2728}
[02:46:37] TEACHER: Right.   {#2729}
[02:46:37] TEACHER: In case of real time, yes, read is superior.   {#2730}
[02:46:39] TEACHER: In case of persistence, yes, Kafka is superior.   {#2731}
[02:46:42] TEACHER: There is no one answer for all the questions.   {#2732}
[02:46:45] TEACHER: Right.   {#2733}
[02:46:46] TEACHER: Very contextual.   {#2734}
[02:46:48] STUDENT_3: And for the second communication approach that we discussed on when a user sends message   {#2735}
[02:46:52] STUDENT_3: to a server, which goes through Kafka and then to DDs, it so happened that the messaging   {#2736}
[02:46:59] STUDENT_3: service workers pick up the message   {#2737}
[02:47:01] STUDENT_3: from Kafka   {#2738}
[02:47:04] STUDENT_3: or let's say topic   {#2739}
[02:47:05] STUDENT_3: a day after it was actually sent.   {#2740}
[02:47:08] STUDENT_3: So I can actually receive the message   {#2741}
[02:47:09] STUDENT_3: a day after it was actually sent.   {#2742}
[02:47:11] STUDENT_3: It can happen in the worst case.   {#2743}
[02:47:14] TEACHER: No, no, no. But you in this   {#2744}
[02:47:15] TEACHER: approach, you get a message, you process   {#2745}
[02:47:17] TEACHER: in Kafka and immediately send a notification   {#2746}
[02:47:19] TEACHER: to the user.   {#2747}
[02:47:21] TEACHER: So user would see it, but when   {#2748}
[02:47:23] TEACHER: refreshes the page, user would not see that message   {#2749}
[02:47:25] TEACHER: because real-time thing is gone   {#2750}
[02:47:27] TEACHER: in persistent storage,   {#2751}
[02:47:29] TEACHER: is no message yet.   {#2752}
[02:47:31] TEACHER: So if this does delay in processing,   {#2753}
[02:47:33] TEACHER: the source of truth does not have   {#2754}
[02:47:35] TEACHER: the data yet. So when user refreshes   {#2755}
[02:47:37] TEACHER: the page, he or she would not see the message.   {#2756}
[02:47:40] STUDENT_3: Yeah.   {#2757}
[02:47:41] STUDENT_3: So yeah, it can so happen that the   {#2758}
[02:47:43] STUDENT_3: actual message gets delivered   {#2759}
[02:47:45] STUDENT_3: a day after it was actually sent.   {#2760}
[02:47:47] TEACHER: Not delivered, stored. Delivered to immediately.   {#2761}
[02:47:49] TEACHER: Stored.   {#2762}
[02:47:49] TEACHER: Is there, right?   {#2763}
[02:47:51] TEACHER: Okay.   {#2764}
[02:47:53] TEACHER: Thanks.   {#2765}
[02:47:54] TEACHER: Hey, Matt.   {#2766}
[02:47:56] STUDENT_4: Yes.   {#2767}
[02:47:58] STUDENT_6: Hi, Arpit.   {#2768}
[02:47:59] STUDENT_6: to understand how it will be different for like a streaming system.   {#2769}
[02:48:05] STUDENT_6: It looks like something similar to this.   {#2770}
[02:48:07] STUDENT_6: Are we going to cover what is streaming?   {#2771}
[02:48:09] TEACHER: What is streaming system?   {#2772}
[02:48:10] STUDENT_6: Any streaming, let's say like hotstar streaming.   {#2773}
[02:48:14] TEACHER: No, no, no, no, no, no.   {#2774}
[02:48:14] TEACHER: We'll not discuss that.   {#2775}
[02:48:15] TEACHER: We'll not.   {#2776}
[02:48:16] TEACHER: That is very different.   {#2777}
[02:48:17] TEACHER: Hotstar live streaming is very different.   {#2778}
[02:48:18] TEACHER: We'll touch upon few bits and pieces of it in week seven, but not this part.   {#2779}
[02:48:22] TEACHER: This is just real time text communication.   {#2780}
[02:48:24] TEACHER: So scope is very well defined over here.   {#2781}
[02:48:26] TEACHER: and live streaming very different.   {#2782}
[02:48:29] TEACHER: Just go through a randomized documentation.   {#2783}
[02:48:30] TEACHER: You'll see how to do that.   {#2784}
[02:48:31] TEACHER: A come my documentation is very good, but we'll touch upon that in seventh week.   {#2785}
[02:48:34] TEACHER: Any six or seventh week.   {#2786}
[02:48:36] TEACHER: Thank you.   {#2787}
[02:48:38] TEACHER: Harsh.   {#2788}
[02:48:40] STUDENT_9: Yeah.   {#2789}
[02:48:40] STUDENT_9: Hi.   {#2790}
[02:48:41] STUDENT_9: So, uh, in today's example, uh, what would be the best way to do this?   {#2791}
[02:48:47] TEACHER: There is no best way.   {#2792}
[02:48:48] TEACHER: I given all possible cases.   {#2793}
[02:48:50] TEACHER: Now you think on your guarantees, what you'd pick.   {#2794}
[02:48:55] TEACHER: There is no one way to build it.   {#2795}
[02:48:58] STUDENT_9: Okay.   {#2796}
[02:48:59] STUDENT_9: So we can do either based on users or.   {#2797}
[02:49:03] STUDENT_9: Correct.   {#2798}
[02:49:04] TEACHER: So you do it the type of guarantees you would want to ensure.   {#2799}
[02:49:07] TEACHER: Right?   {#2800}
[02:49:08] TEACHER: The kind of guarantees you are providing to your customers.   {#2801}
[02:49:10] TEACHER: You build your system accordingly, which is why I kept it very open-ended.   {#2802}
[02:49:13] TEACHER: I gave you three types of messaging thing.   {#2803}
[02:49:15] TEACHER: I gave you three, I gave you three types of persistence, different types of communication,   {#2804}
[02:49:20] TEACHER: different types of privacy thing.   {#2805}
[02:49:21] TEACHER: I have laid an entire buffet.   {#2806}
[02:49:24] TEACHER: It's for you to create your own plate, whatever works for you.   {#2807}
[02:49:28] STUDENT_9: Okay.   {#2808}
[02:49:28] STUDENT_9: And one more question.   {#2809}
[02:49:29] STUDENT_9: Uh, so recently I was working on that multi-level marketing where this complete hierarchy is   {#2810}
[02:49:35] STUDENT_9: stored.   {#2811}
[02:49:36] STUDENT_9: So by the time it is really becoming difficult to do in relational database.   {#2812}
[02:49:41] STUDENT_9: So today I think it would be better to use the graph.   {#2813}
[02:49:45] STUDENT_9: They will be there.   {#2814}
[02:49:45] STUDENT_9: Right.   {#2815}
[02:49:46] TEACHER: If it's becoming painful and because there you might need to store that entire tree and   {#2816}
[02:49:51] TEACHER: find a third level depth or fifth level depth or 10th level depth.   {#2817}
[02:49:54] TEACHER: Right.   {#2818}
[02:49:54] TEACHER: In that case, grab database might make much more sense than relational   {#2819}
[02:49:57] TEACHER: because then joints and queries and cell joints become a pain when you   {#2820}
[02:50:01] TEACHER: are driving it like this 10 level D nine cell joints on a database is messy.   {#2821}
[02:50:06] TEACHER: Like you typically don't want to do that.   {#2822}
[02:50:09] STUDENT_9: Okay.   {#2823}
[02:50:10] STUDENT_9: I got it.   {#2824}
[02:50:11] STUDENT_9: Thank you.   {#2825}
[02:50:11] TEACHER: Yeah.   {#2826}
[02:50:12] TEACHER: Uh, Devasheesh.   {#2827}
[02:50:15] STUDENT_6: Yeah.   {#2828}
[02:50:15] STUDENT_6: Hi.   {#2829}
[02:50:16] STUDENT_6: Uh, my question was on message deletion.   {#2830}
[02:50:19] STUDENT_6: and on what flow it would follow.   {#2831}
[02:50:21] STUDENT_6: Like I'm thinking like   {#2832}
[02:50:22] STUDENT_6: because message deletion   {#2833}
[02:50:24] STUDENT_6: has to be sort of   {#2834}
[02:50:27] STUDENT_6: sort of synchronous with   {#2835}
[02:50:29] STUDENT_6: with both the flows.   {#2836}
[02:50:31] STUDENT_6: Like a user can't be   {#2837}
[02:50:33] STUDENT_6: receiving a deletion notification   {#2838}
[02:50:35] STUDENT_6: then refreshing later   {#2839}
[02:50:36] STUDENT_6: and that messaging up to you.   {#2840}
[02:50:38] TEACHER: Do you really get deletion notification?   {#2841}
[02:50:40] TEACHER: No.   {#2842}
[02:50:41] STUDENT_6: So like on WhatsApp,   {#2843}
[02:50:42] STUDENT_6: like when somebody deletes a message,   {#2844}
[02:50:44] STUDENT_6: it gets deleted immediately, right?   {#2845}
[02:50:46] STUDENT_6: So if we depend on workers,   {#2846}
[02:50:48] STUDENT_6: you said that there could be a delay like this yeah correct correct   {#2847}
[02:50:53] TEACHER: so does not store anything whatsapp does not store anything fii   {#2848}
[02:50:58] STUDENT_6: okay it happens like this done yes like so so even slack like if you delete a message on slack   {#2849}
[02:51:06] STUDENT_6: right like it like this uh it needs to go for um yeah okay persistence more important in case of   {#2850}
[02:51:13] TEACHER: slack.   {#2851}
[02:51:14] TEACHER: Right.   {#2852}
[02:51:15] TEACHER: See, that's the beauty of this.   {#2853}
[02:51:16] TEACHER: I can extend any solution, any question that you ask, I can extend it over here.   {#2854}
[02:51:21] TEACHER: Very simply.   {#2855}
[02:51:22] TEACHER: Right.   {#2856}
[02:51:23] TEACHER: Depending on the, and now here you can very clearly see the beauty of this.   {#2857}
[02:51:26] TEACHER: Depending on the guarantees, you just alter your approach.   {#2858}
[02:51:31] TEACHER: Right.   {#2859}
[02:51:31] TEACHER: Either this in case of the actual WhatsApp that we use.   {#2860}
[02:51:35] TEACHER: Right.   {#2861}
[02:51:35] TEACHER: Otherwise you can just add a message that I delete this message permanently and then   {#2862}
[02:51:40] TEACHER: just delete it from the user's local storage.   {#2863}
[02:51:43] TEACHER: Right.   {#2864}
[02:51:44] TEACHER: So it's deleted from here and here.   {#2865}
[02:51:46] TEACHER: Right.   {#2866}
[02:51:46] TEACHER: Otherwise, if you're talking about Slack, you go over here, delete and tell the user that   {#2867}
[02:51:50] TEACHER: it's deleted.   {#2868}
[02:51:51] TEACHER: And in case you'd want to real-time communicate to your user, you delete, you send, you notify   {#2869}
[02:51:55] TEACHER: the user that now it's deleted.   {#2870}
[02:51:57] TEACHER: Either, you just have to roam around in this area.   {#2871}
[02:52:01] TEACHER: That's the beauty.   {#2872}
[02:52:02] STUDENT_6: Yeah.   {#2873}
[02:52:02] STUDENT_6: So like, so if this is so easily extensible, why did WhatsApp take so much time to add   {#2874}
[02:52:08] STUDENT_6: that feature?   {#2875}
[02:52:10] TEACHER: for me to say harder for them to implement now.   {#2876}
[02:52:13] TEACHER: See, giving gya ni giri.   {#2877}
[02:52:15] TEACHER: So which is what I said, although I covered three,   {#2878}
[02:52:18] TEACHER: it took me three and a half months to build a real-time text-based chat system.   {#2879}
[02:52:25] TEACHER: Right?   {#2880}
[02:52:26] TEACHER: I went this entire, or did this entire analysis,   {#2881}
[02:52:28] TEACHER: and then it took me three and a half months,   {#2882}
[02:52:30] TEACHER: three engineer team to build it.   {#2883}
[02:52:31] TEACHER: It takes time.   {#2884}
[02:52:33] TEACHER: Right?   {#2885}
[02:52:33] TEACHER: And plus doing it in WhatsApp scale is humongous.   {#2886}
[02:52:36] TEACHER: It's humongous.   {#2887}
[02:52:38] TEACHER: Right?   {#2888}
[02:52:38] TEACHER: It's not as easy.   {#2889}
[02:52:40] TEACHER: there is a lot of hierarchy stuff.   {#2890}
[02:52:44] TEACHER: Do we really need this?   {#2891}
[02:52:45] TEACHER: How to do it the best way?   {#2892}
[02:52:47] TEACHER: Staggered rollout and all.   {#2893}
[02:52:48] TEACHER: So it took them time to do it.   {#2894}
[02:52:50] TEACHER: But were they even planning to support deletion?   {#2895}
[02:52:55] TEACHER: When a product manager got it and said,   {#2896}
[02:52:57] TEACHER: hey, let's say we allow users to delete message.   {#2897}
[02:53:00] TEACHER: From that time till it is implemented,   {#2898}
[02:53:02] TEACHER: there will be quite a few things that would happen.   {#2899}
[02:53:05] TEACHER: So that's why.   {#2900}
[02:53:06] TEACHER: But if you know your requirements clearly,   {#2901}
[02:53:10] TEACHER: easy. If you know that you now have to support deletion of messages, it might just be like   {#2902}
[02:53:15] TEACHER: 100-200 lines of code change if they went with this architecture. Not much. But then   {#2903}
[02:53:22] TEACHER: do they really want to do it? Is this the best way? Do they really want to show it this   {#2904}
[02:53:25] TEACHER: way? All those other stuff comes in. So in most cases, if they were having this architecture,   {#2905}
[02:53:32] TEACHER: their code changes would have been like the backend code changes would have been hardly   {#2906}
[02:53:35] TEACHER: 200 300 links not more than that if they were with this architecture nothing when delusion happens   {#2907}
[02:53:41] TEACHER: one event sent they would have already established this one event stored over here one notification   {#2908}
[02:53:47] TEACHER: stored over sent over here that's it but to reach to that is this the best way staggered rollouts   {#2909}
[02:53:53] TEACHER: and all that takes right thanks yeah but again highly recommend you to implement this like just   {#2910}
[02:54:01] TEACHER: work with web sockets and try to do that mimic that message deleted see it in ui like you'll have fun   {#2911}
[02:54:08] STUDENT_7: yeah yeah abhishek i think we talked about delivering the messages but how like how can   {#2912}
[02:54:18] STUDENT_7: we think about ordering these messages and this exactly one semantics yeah who said exactly one   {#2913}
[02:54:24] TEACHER: semantics is there why are we adding that exactly one semantics like in the enterprise you said right   {#2914}
---- OWNED SEGMENTS END ----

CTX| [02:54:33] STUDENT_7: you, you, first is you'll, you'll have to maintain the communication dialogue, right?   {#2915}
CTX| [02:54:37] STUDENT_7: Correct.   {#2916}
CTX| [02:54:37] STUDENT_7: What communication I'm doing, right?   {#2917}
CTX| [02:54:39] STUDENT_7: I need to have that, uh, a message to be ordered at least in that way.   {#2918}
CTX| [02:54:43] STUDENT_7: So that the, okay.   {#2919}
CTX| [02:54:46] TEACHER: Okay.   {#2920}
CTX| [02:54:47] TEACHER: Let's say the front end is yours.   {#2921}
CTX| [02:54:50] TEACHER: You have built a front end.   {#2922}
CTX| [02:54:51] TEACHER: Correct.   {#2923}
CTX| [02:54:52] TEACHER: So given that who said that message has to be up and down, who said no one, right?   {#2924}
CTX| [02:55:01] TEACHER: your front end insert the message in the middle.   {#2925}
CTX| [02:55:05] TEACHER: What's the problem?   {#2926}
CTX| [02:55:07] TEACHER: Correct.   {#2927}
CTX| [02:55:08] TEACHER: It's no problem.   {#2928}
CTX| [02:55:10] TEACHER: And you think about message ordering where it is almost up and   {#2929}
CTX| [02:55:15] TEACHER: only where it is almost you are processing the message one after   {#2930}
CTX| [02:55:19] TEACHER: another, their message ordering is important.   {#2931}
CTX| [02:55:21] TEACHER: Here.   {#2932}
CTX| [02:55:22] TEACHER: Let's say user A sent two messages message one message two message   {#2933}
CTX| [02:55:28] TEACHER: Page two somehow reached user B first and then message one came.   {#2934}
