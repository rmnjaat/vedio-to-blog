# chunk_14  OWNS 02:32:06 -> 02:45:27  (segments #2593-#2841, 2364 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:31:08] TEACHER: or not or on which tab.   {#2575}
CTX| [02:31:10] TEACHER: So in either case that becomes our source of trust that, Hey, if my message is sent or   {#2576}
CTX| [02:31:15] TEACHER: Whenever messages is unsent, I'm creating an umbrella of everything that I want to pop   {#2577}
CTX| [02:31:22] TEACHER: notification on into this message called on message unsent.   {#2578}
CTX| [02:31:25] TEACHER: Right.   {#2579}
CTX| [02:31:26] TEACHER: Depending on ifs and else's, where you are, what you are doing, you just implement those   {#2580}
CTX| [02:31:30] TEACHER: logics over here from the front end.   {#2581}
CTX| [02:31:33] TEACHER: Right.   {#2582}
CTX| [02:31:33] TEACHER: Okay.   {#2583}
CTX| [02:31:34] TEACHER: Now this, all of this comes to this Kafka on message unsent, which becomes the input   {#2584}
CTX| [02:31:39] TEACHER: to our system.   {#2585}
CTX| [02:31:40] TEACHER: And in that, what we do is we do this.   {#2586}
CTX| [02:31:45] TEACHER: like from this user, this user, this message was sent because we want to store the number   {#2587}
CTX| [02:31:50] TEACHER: of unique users.   {#2588}
CTX| [02:31:51] TEACHER: We store it in a set.   {#2589}
CTX| [02:31:52] TEACHER: And what we do is we typically store it in redis.   {#2590}
CTX| [02:31:56] TEACHER: You can pick any key value database, which is partitionable by default.   {#2591}
CTX| [02:32:00] TEACHER: All of them are and provide set as value any database.   {#2592}

---- OWNED SEGMENTS START ----
[02:32:06] TEACHER: So get status straight forward, clear status straight forward.   {#2593}
[02:32:10] TEACHER: So when a user clicks on the message button, you delete the entry from the set.   {#2594}
[02:32:15] TEACHER: the number of unread messages count you make a call to this count count the length of the set   {#2595}
[02:32:21] TEACHER: and you return right okay for you to update things into redis your right path put to something this   {#2596}
[02:32:27] TEACHER: on message and send coming from your messaging service leveraging online offline and whatnot   {#2597}
[02:32:32] TEACHER: your consumers consume it and writes to this redis cluster that hey new user new user user you received   {#2598}
[02:32:39] TEACHER: a new message you received a new message so all of that goes into this redis cluster   {#2599}
[02:32:45] TEACHER: lot of people would stop designing over this stage.   {#2600}
[02:32:49] TEACHER: You'd say only this much is in there, right?   {#2601}
[02:32:52] TEACHER: You have a read path.   {#2602}
[02:32:53] TEACHER: You have a right path.   {#2603}
[02:32:54] TEACHER: You are almost converged onto the design, but no, this is not good.   {#2604}
[02:32:59] TEACHER: Why?   {#2605}
[02:33:01] TEACHER: Because imagine the situation, this database, and now this is the high   {#2606}
[02:33:05] TEACHER: level pattern that I want to talk about in next 10 minutes.   {#2607}
[02:33:09] TEACHER: This, this is one thing.   {#2608}
[02:33:10] TEACHER: This Redis cluster that you have is serving a huge number of reads.   {#2609}
[02:33:17] TEACHER: Imagine millions of users on your platform, constantly refreshing the page   {#2610}
[02:33:21] TEACHER: or going from one page to other, you making a ZPI call to get the unread messages.   {#2611}
[02:33:25] TEACHER: Right?   {#2612}
[02:33:26] TEACHER: So this database is anyway handling large number of reads.   {#2613}
[02:33:30] TEACHER: Plus whenever user clicks on the message icon, you see large number of writes   {#2614}
[02:33:33] TEACHER: happening over here as well.   {#2615}
[02:33:34] TEACHER: Plus anytime there is message unsend, you are updating into this database.   {#2616}
[02:33:39] TEACHER: This database is overburdened.   {#2617}
[02:33:42] TEACHER: When this database is overburdened, as I always say, database is the most little component   {#2618}
[02:33:46] TEACHER: of an infrastructure.   {#2619}
[02:33:47] TEACHER: See if you are doing some unnecessary operations on this database.   {#2620}
[02:33:51] TEACHER: Are you doing any unnecessary operations?   {#2621}
[02:33:53] TEACHER: Let's take a look.   {#2622}
[02:33:55] TEACHER: Get status.   {#2623}
[02:33:56] TEACHER: No option.   {#2624}
[02:33:57] TEACHER: You have to go to the database because that is a source of truth.   {#2625}
[02:33:59] TEACHER: You have to go to the database, read it, read replica.   {#2626}
[02:34:01] TEACHER: You don't need it.   {#2627}
[02:34:02] TEACHER: It's an in-memory DB anyway.   {#2628}
[02:34:04] TEACHER: So get status.   {#2629}
[02:34:05] TEACHER: Fair minimum.   {#2630}
[02:34:06] TEACHER: clear status. You have to go and delete the key over here. You can't do much over there.   {#2631}
[02:34:11] TEACHER: You are not doing any undo operation, any unnecessary operation in this path that you   {#2632}
[02:34:18] TEACHER: are making the call. Okay. Let's talk about this path. Are you doing any unnecessary operation?   {#2633}
[02:34:23] TEACHER: You might think that, Hey, every time I'm seeing an, every time I receive a message,   {#2634}
[02:34:27] TEACHER: unsent event, I'm just updating this database.   {#2635}
[02:34:32] TEACHER: I'm doing the bare minimum it seems, but no, given that in this   {#2636}
[02:34:37] TEACHER: Redis cluster, the value is a set.   {#2637}
[02:34:41] TEACHER: If I receive one message from user B or 10,000 message from user B, my message,   {#2638}
[02:34:48] TEACHER: the state of my database is not changing for 9,999 times, right?   {#2639}
[02:34:54] TEACHER: Because for the first message itself, the entry is being added into the set.   {#2640}
[02:34:58] TEACHER: For everything else, there is no change happening in the database.   {#2641}
[02:35:03] TEACHER: So can we reduce that?   {#2642}
[02:35:05] TEACHER: And if you look carefully, look, go through your messages, see all of your, all of your   {#2643}
[02:35:13] TEACHER: friends.   {#2644}
[02:35:14] TEACHER: When you are offline, they don't send you just one message.   {#2645}
[02:35:16] TEACHER: They send you 5, 10, 15, 20, 30.   {#2646}
[02:35:19] TEACHER: Hey, what are you doing?   {#2647}
[02:35:21] TEACHER: Come here.   {#2648}
[02:35:22] TEACHER: We are going for this.   {#2649}
[02:35:24] TEACHER: you a lot of short messages, right? Especially when you're off my habitat, right? Given that   {#2650}
[02:35:31] TEACHER: first on the first thing you are writing it into the DB, DB state changes for all other N minus   {#2651}
[02:35:37] TEACHER: one times. There is no changes happening in the DB, but you would still make a call to DB trying   {#2652}
[02:35:44] TEACHER: to write to the set set does not exist. Oh, sorry, set already exists and there is no changes   {#2653}
[02:35:51] TEACHER: happening in the DB anyway.   {#2654}
[02:35:53] TEACHER: So you are wasting a lot of network IO happening over here   {#2655}
[02:35:56] TEACHER: and not as network IO, but while making by letting this database   {#2656}
[02:36:02] TEACHER: handle that request.   {#2657}
[02:36:03] TEACHER: Now, how would this database handle the request?   {#2658}
[02:36:04] TEACHER: It would get the request.   {#2659}
[02:36:06] TEACHER: It would read the set, see if the entry exists in the set.   {#2660}
[02:36:09] TEACHER: It would discard.   {#2661}
[02:36:10] TEACHER: If it does not exist, it would add this too much of work going   {#2662}
[02:36:13] TEACHER: into this DB doing nothing for those N minus one things.   {#2663}
[02:36:17] TEACHER: So this cluster is in most cases doing nothing, but unnecessarily handling operations leading   {#2664}
[02:36:27] TEACHER: to no state changes in the database.   {#2665}
[02:36:30] TEACHER: This is what I want you to focus on.   {#2666}
[02:36:33] TEACHER: That whenever you are looking at a database, again, one more high level pattern, here is   {#2667}
[02:36:39] TEACHER: what I'm talking about.   {#2668}
[02:36:40] TEACHER: that whenever you find a database that is doing a lot of unnecessary operations   {#2669}
[02:36:45] TEACHER: leading to no state changes in database, try to minimize them   {#2670}
[02:36:50] TEACHER: because database is the most brittle component of your infrastructure.   {#2671}
[02:36:54] TEACHER: No matter which cloud provider you pick, if a database is done, everything is done.   {#2672}
[02:36:58] TEACHER: Protect it, right?   {#2673}
[02:37:00] TEACHER: It's like world emote and it's basically deathly halos.   {#2674}
[02:37:03] TEACHER: Keep it protected no matter what.   {#2675}
[02:37:05] TEACHER: Keep it like well protected by all the magical charms,   {#2676}
[02:37:10] TEACHER: a really good mood for some reason.   {#2677}
[02:37:12] TEACHER: Okay.   {#2678}
[02:37:12] TEACHER: So protected, protected, however you can.   {#2679}
[02:37:15] TEACHER: Right.   {#2680}
[02:37:16] TEACHER: And given that we are doing a large number of unnecessary   {#2681}
[02:37:19] TEACHER: operations over here, how do we minimize it by using an auxiliary database?   {#2682}
[02:37:25] TEACHER: This is what I want to talk about.   {#2683}
[02:37:28] TEACHER: Having an auxiliary database whose sole job.   {#2684}
[02:37:31] TEACHER: So here, what you are doing is this is your primary database.   {#2685}
[02:37:35] TEACHER: You want to protect it.   {#2686}
[02:37:37] TEACHER: Network cost is not much in this case.   {#2687}
[02:37:40] TEACHER: Preventing your main database from going down by adding a bit of network cost is a good trade-off to make.   {#2688}
[02:37:49] TEACHER: Always remember this.   {#2689}
[02:37:50] TEACHER: It's all about trade-off.   {#2690}
[02:37:52] TEACHER: So you are incurring one more network IO.   {#2691}
[02:37:55] TEACHER: But if you can reduce the load on your database, it's worth it.   {#2692}
[02:37:59] TEACHER: It's worth it.   {#2693}
[02:38:00] TEACHER: Every single time it's worth it.   {#2694}
[02:38:02] TEACHER: So what we do is we add an auxiliary Redis into the scheme of things.   {#2695}
[02:38:07] TEACHER: The job of this Redis is very simple.   {#2696}
[02:38:10] TEACHER: Whenever the write happens, the write first happens into this redis and it checks if the   {#2697}
[02:38:18] TEACHER: entry exists or not.   {#2698}
[02:38:19] TEACHER: If the entry exists, good enough, I would not make a write to this database.   {#2699}
[02:38:24] TEACHER: If entry does not exist over here, then I'll write to this database.   {#2700}
[02:38:28] TEACHER: This way for n-1 times, you are not even calling this main DB, reducing the load on this database.   {#2701}
[02:38:36] TEACHER: But all of this load is hunted by this.   {#2702}
[02:38:40] TEACHER: everything, checking if I've already, which means it's basically checking if I've already   {#2703}
[02:38:45] TEACHER: have an unread message from this particular user or not.   {#2704}
[02:38:50] TEACHER: Right.   {#2705}
[02:38:50] TEACHER: That's what it is all done.   {#2706}
[02:38:52] TEACHER: This way what happens is this takes a bulk of the bulk of the n minus one queries are   {#2707}
[02:38:59] TEACHER: firing over here.   {#2708}
[02:39:00] TEACHER: Right.   {#2709}
[02:39:00] TEACHER: While one query goes over this way, this database is protected while this takes all the hitting.   {#2710}
[02:39:06] TEACHER: Right.   {#2711}
[02:39:07] TEACHER: Now, what's the worst case?   {#2712}
[02:39:10] TEACHER: this database goes down.   {#2713}
[02:39:12] TEACHER: See, you are protecting this database.   {#2714}
[02:39:13] TEACHER: If this goes down, then everything is done in any case.   {#2715}
[02:39:16] TEACHER: Worst case is what if this goes down?   {#2716}
[02:39:18] TEACHER: If this goes down, what would happen?   {#2717}
[02:39:20] TEACHER: No right would happen over here.   {#2718}
[02:39:22] TEACHER: All the rights would go over here.   {#2719}
[02:39:23] TEACHER: So it would have to handle all n-1 rights   {#2720}
[02:39:26] TEACHER: that anyway it was anyway doing.   {#2721}
[02:39:29] TEACHER: So by adding this auxiliary database,   {#2722}
[02:39:31] TEACHER: you are just trying to shed the load   {#2723}
[02:39:34] TEACHER: that was there on this main database.   {#2724}
[02:39:36] TEACHER: This is the high-level pattern I want to talk about.   {#2725}
[02:39:40] TEACHER: is really important that whenever you have a very brittle component in your infrastructure,   {#2726}
[02:39:44] TEACHER: just typically your database.   {#2727}
[02:39:46] TEACHER: And if it is doing a lot of unnecessary operations leading to no state changes in the database,   {#2728}
[02:39:51] TEACHER: try to add an auxiliary database and reduce the load on the main.   {#2729}
[02:39:54] TEACHER: This way, the service will be up and running.   {#2730}
[02:39:56] TEACHER: Everything will be happy.   {#2731}
[02:39:57] TEACHER: Right?   {#2732}
[02:39:58] TEACHER: So now just few changes by adding this thing, your status check API, when you clear the   {#2733}
[02:40:03] TEACHER: status, it not only has to delete from here, but also delete from here.   {#2734}
[02:40:07] TEACHER: That's it.   {#2735}
[02:40:07] TEACHER: Some here and there glitches and consistency would come, but not much to worry about because   {#2736}
[02:40:12] TEACHER: it's not transactional.   {#2737}
[02:40:13] TEACHER: It's not something that deals with money and all it just unread messages.   {#2738}
[02:40:17] TEACHER: No one even gives anything about it.   {#2739}
[02:40:20] TEACHER: Right.   {#2740}
[02:40:21] TEACHER: So don't worry much in case it goes into slightly inconsistency.   {#2741}
[02:40:24] TEACHER: It's not an end of the world for your product.   {#2742}
[02:40:27] TEACHER: So you can do that.   {#2743}
[02:40:28] TEACHER: But if that entire system is done, that is end of your product because it's, it's very   {#2744}
[02:40:33] TEACHER: bad experience.   {#2745}
[02:40:34] TEACHER: Right.   {#2746}
[02:40:35] TEACHER: So you need to pick your battles, what you are trading of for what.   {#2747}
[02:40:40] TEACHER: And this is what I wanted to cover as part of this design,   {#2748}
[02:40:44] TEACHER: this high level pattern and how we are approaching this situation.   {#2749}
[02:40:48] TEACHER: And this is what I wanted to cover for today.   {#2750}
[02:40:50] TEACHER: Folks who may want to drop off, I'll take questions around anything as part of the system.   {#2751}
[02:40:55] TEACHER: And then across all the systems that we covered today,   {#2752}
[02:40:58] TEACHER: I'll update a recording by 3 slash 4 today.   {#2753}
[02:41:01] TEACHER: I will share the periods for the next week.   {#2754}
[02:41:02] TEACHER: Next week is all about, it's my personal favorite week storage engines, where we'll build our   {#2755}
[02:41:09] TEACHER: own storage engines.   {#2756}
[02:41:10] TEACHER: It will clear a ton of concepts about databases, not just how to use it, but internals of it.   {#2757}
[02:41:15] TEACHER: It would build that intuition around writing your own database.   {#2758}
[02:41:19] TEACHER: And I'm not just talking about just for the sake of engineering, but more importantly,   {#2759}
[02:41:23] TEACHER: knowing those internals would build you that intuition on how systems like Kafka work.   {#2760}
[02:41:29] TEACHER: because I don't, I didn't know internals of Kafka.   {#2761}
[02:41:32] TEACHER: I guessed it and it was exactly how it was implemented.   {#2762}
[02:41:36] TEACHER: Right.   {#2763}
[02:41:36] TEACHER: I want you all to form that same kind of intuition, that exact   {#2764}
[02:41:41] TEACHER: same intuition so that whenever you come across a new system,   {#2765}
[02:41:44] TEACHER: it's very easy to guess and you can guess anything, but in this   {#2766}
[02:41:49] TEACHER: case, once your intuition is built 99% time, your guess would   {#2767}
[02:41:52] TEACHER: be correct, which is what we want to do.   {#2768}
[02:41:54] TEACHER: So next week is all about storage engines where we build three   {#2769}
[02:41:58] TEACHER: interesting storage engines, two of them will 100% blow your mind   {#2770}
[02:42:02] TEACHER: away because we'll go into those granular details, which I think   {#2771}
[02:42:06] TEACHER: everyone should.   {#2772}
[02:42:07] TEACHER: Right.   {#2773}
[02:42:08] TEACHER: Okay.   {#2774}
[02:42:08] TEACHER: So that's what we'll cover next week.   {#2775}
[02:42:10] TEACHER: So folks who want to drop off, I'll take questions.   {#2776}
[02:42:13] TEACHER: Go on Vikram.   {#2777}
[02:42:15] STUDENT_6: Yeah.   {#2778}
[02:42:15] STUDENT_6: So I would like to add one more, uh, optimization to this system.   {#2779}
[02:42:19] STUDENT_6: Like, uh, so let's say on, on, on the front end.   {#2780}
[02:42:22] STUDENT_6: Uh, so let's say there are thousands of messages and let's say   {#2781}
[02:42:25] STUDENT_6: 10,000 messages, then instead of showing 10,000 messages, we should display more than let's   {#2782}
[02:42:32] STUDENT_6: say 100 plus messages. And at a point that user is not, don't care that he had 10,000   {#2783}
[02:42:38] STUDENT_6: sub messages. So let's say on the front end, if we have hundreds of 100 messages, then   {#2784}
[02:42:45] STUDENT_6: we only show that 100 plus. And in next steps, we don't write to the database itself,   {#2785}
[02:42:51] STUDENT_6: Redis cluster itself because we know that it does not matter.   {#2786}
[02:42:54] TEACHER: It does not matter.   {#2787}
[02:42:55] TEACHER: Yeah.   {#2788}
[02:42:56] TEACHER: Yeah.   {#2789}
[02:42:56] TEACHER: True.   {#2790}
[02:42:57] TEACHER: True.   {#2791}
[02:42:57] TEACHER: True.   {#2792}
[02:42:57] TEACHER: True.   {#2793}
[02:42:58] TEACHER: That's a good optimization.   {#2794}
[02:42:59] TEACHER: So that's where you can also leverage this.   {#2795}
[02:43:01] TEACHER: That it's not that every time you have a unique entry, you do this.   {#2796}
[02:43:04] TEACHER: If this length is more than let's say 100, that's a threshold.   {#2797}
[02:43:07] TEACHER: You don't even write a first entry to this.   {#2798}
[02:43:09] TEACHER: We even say that one extra right that is happening over there.   {#2799}
[02:43:12] STUDENT_6: Okay.   {#2800}
[02:43:12] TEACHER: Yeah.   {#2801}
[02:43:13] TEACHER: Thanks.   {#2802}
[02:43:13] TEACHER: Thanks for adding that.   {#2803}
[02:43:14] TEACHER: Okay.   {#2804}
[02:43:15] TEACHER: Anything else?   {#2805}
[02:43:16] TEACHER: Any question?   {#2806}
[02:43:16] TEACHER: Anyone?   {#2807}
[02:43:19] TEACHER: Was it really that clear?   {#2808}
[02:43:21] STUDENT_2: DK. Yeah. So in the case of auxiliary Redis, what, how you are making the entries because   {#2809}
[02:43:28] STUDENT_2: see in the case of Redis cluster, we are storing a set like B, we can, you know, we have CDEFG,   {#2810}
[02:43:35] STUDENT_2: but in the auxiliary Redis, you are storing it as separate entries, like B maps to see   {#2811}
[02:43:41] TEACHER: anything. I picked this so that we have a very clear different key models set up.   {#2812}
[02:43:47] TEACHER: I would pick this like for example   {#2813}
[02:43:49] TEACHER: B received message from C, B received message   {#2814}
[02:43:51] TEACHER: from D as a key and value is just true.   {#2815}
[02:43:53] TEACHER: I am just reducing the   {#2816}
[02:43:55] TEACHER: overhead of storing an   {#2817}
[02:43:57] TEACHER: extra set comparing if the key   {#2818}
[02:43:59] TEACHER: exists or not. You can do that way also.   {#2819}
[02:44:01] TEACHER: You can do this way also. Either way   {#2820}
[02:44:03] TEACHER: is fine. And when you are   {#2821}
[02:44:05] TEACHER: going to, so let's say at   {#2822}
[02:44:07] STUDENT_2: the nth moment till n-1 you   {#2823}
[02:44:09] STUDENT_2: are storing the values here in you know auxiliary   {#2824}
[02:44:11] STUDENT_4: radius. Not storing, I am just   {#2825}
[02:44:13] TEACHER: checking, checking, just checking, not storing.   {#2826}
[02:44:15] TEACHER: Just checking.   {#2827}
[02:44:18] TEACHER: Let's say a user B sent a, let's say user B sent a 10,000 messages.   {#2828}
[02:44:24] TEACHER: I'll be writing one time over here and other 99 checks would happen over here.   {#2829}
[02:44:30] TEACHER: So one time right over here, one time right over here for everything else.   {#2830}
[02:44:33] TEACHER: I'm just checking it over here.   {#2831}
[02:44:35] TEACHER: Correct.   {#2832}
[02:44:35] TEACHER: Because if it exists already, so let's say I take this example.   {#2833}
[02:44:39] TEACHER: If B sent a message to see if this entry already exists, why should I write it over   {#2834}
[02:44:45] TEACHER: here?   {#2835}
[02:44:47] TEACHER: right right so here i'll just check i don't have to create 99999 entries over here correct   {#2836}
[02:44:52] TEACHER: got it uh yeah there was a gap in my understanding i was thinking you are just incrementing the count   {#2837}
[02:44:56] TEACHER: here also no no there is no count there is no count over here this is just existence   {#2838}
[02:45:00] STUDENT_4: just existence got it got it got it got it yeah thank you uh i had question related to clear   {#2839}
[02:45:10] STUDENT_2: status because somewhere when we always keep B to C true, right?   {#2840}
[02:45:17] STUDENT_2: I read the message by clicking and then again B to C happens.   {#2841}
---- OWNED SEGMENTS END ----

CTX| [02:45:27] TEACHER: So when you clicked on the message icon, when you clicked on the message icon, this set   {#2842}
CTX| [02:45:32] TEACHER: got deleted.   {#2843}
CTX| [02:45:33] TEACHER: These entries got deleted.   {#2844}
CTX| [02:45:35] TEACHER: Okay.   {#2845}
CTX| [02:45:36] TEACHER: When another message was sent,   {#2846}
CTX| [02:45:38] TEACHER: then the entry would be created again.   {#2847}
CTX| [02:45:41] TEACHER: What is the edge case that you're talking about?   {#2848}
CTX| [02:45:43] TEACHER: Help me understand that.   {#2849}
CTX| [02:45:45] STUDENT_2: No, as long as both are getting synced,   {#2850}
CTX| [02:45:48] STUDENT_2: there is no issue.   {#2851}
CTX| [02:45:49] STUDENT_2: So I was...   {#2852}
CTX| [02:45:50] TEACHER: And obviously there is a problem.   {#2853}
CTX| [02:45:51] TEACHER: Yeah, as you very rightly said.   {#2854}
CTX| [02:45:53] TEACHER: In case, let's say you wrote over here,   {#2855}
CTX| [02:45:56] TEACHER: but this right field,   {#2856}
CTX| [02:45:57] TEACHER: or rather this right succeeded in this right field,   {#2857}
CTX| [02:46:00] TEACHER: then there is a problem.   {#2858}
CTX| [02:46:01] TEACHER: Not even denying that.   {#2859}
CTX| [02:46:02] TEACHER: Right?   {#2860}
CTX| [02:46:02] TEACHER: Not even denying that.   {#2861}
CTX| [02:46:03] TEACHER: Yeah.   {#2862}
CTX| [02:46:04] TEACHER: Right?   {#2863}
CTX| [02:46:04] TEACHER: Yeah.   {#2864}
CTX| [02:46:06] TEACHER: But it's not the end of the world.   {#2865}
CTX| [02:46:07] TEACHER: And it's very likely, very likely that the WhatsApp was that would happen.   {#2866}
CTX| [02:46:13] TEACHER: In the account, you would see two.   {#2867}
CTX| [02:46:15] TEACHER: But in reality, you would have 300 messages.   {#2868}
CTX| [02:46:19] STUDENT_7: Right?   {#2869}
CTX| [02:46:19] STUDENT_7: Yeah.   {#2870}
CTX| [02:46:20] TEACHER: And that's okay.   {#2871}
CTX| [02:46:20] TEACHER: It's still okay.   {#2872}
CTX| [02:46:21] TEACHER: Right?   {#2873}
CTX| [02:46:22] TEACHER: Because it's not dealing with a financial system or really critical things.   {#2874}
CTX| [02:46:26] TEACHER: Some inconsistency where one right succeeds, other right fails.   {#2875}
