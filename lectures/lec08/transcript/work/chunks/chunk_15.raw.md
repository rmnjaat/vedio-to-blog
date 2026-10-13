# chunk_15  OWNS 02:44:59 -> 02:58:14  (segments #2821-#3047, 2267 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:44:03] TEACHER: directly talk to it if you it's your code you have to implement it right so what mongodb does is   {#2807}
CTX| [02:44:07] TEACHER: it gives you those guarantees but how it is implementing it it is having its own lock manager   {#2808}
CTX| [02:44:12] TEACHER: where it is saying that this transaction has taken lock on this row or this document part of this   {#2809}
CTX| [02:44:19] TEACHER: chart this document part of this chart this document part of this chart other transaction   {#2810}
CTX| [02:44:23] TEACHER: comes in it says hey i want lock on this document on this show but say oh no but this lock is without   {#2811}
CTX| [02:44:28] TEACHER: this transition so wait so the transaction would wait until this transaction either commits or rolls   {#2812}
CTX| [02:44:34] TEACHER: We implemented it same thing over here.   {#2813}
CTX| [02:44:37] TEACHER: Three consumers trying to read something, a shared resource.   {#2814}
CTX| [02:44:41] TEACHER: We are keeping track of logs so that only one of them can move forward.   {#2815}
CTX| [02:44:46] TEACHER: What we just said is just MongoDB distributed.   {#2816}
CTX| [02:44:48] TEACHER: We just implemented a distributed transaction where we are using Redis as a lock.   {#2817}
CTX| [02:44:54] STUDENT_4: Sure.   {#2818}
CTX| [02:44:55] STUDENT_4: Got it.   {#2819}
CTX| [02:44:57] STUDENT_9: Sampai.   {#2820}

---- OWNED SEGMENTS START ----
[02:44:59] STUDENT_1: Yeah.   {#2821}
[02:45:00] STUDENT_1: Hello.   {#2822}
[02:45:00] STUDENT_1: Okay.   {#2823}
[02:45:00] STUDENT_1: So my thought process is around the part where you explained when we try to synchronize two threads and then two processes and then two machines.   {#2824}
[02:45:14] STUDENT_1: So basically, if we try to synchronize two different entities, then we always try to look for the nearest shared storage system.   {#2825}
[02:45:28] STUDENT_1: Correct.   {#2826}
[02:45:29] STUDENT_1: For the best purpose.   {#2827}
[02:45:31] STUDENT_1: Okay, so this is the fundamental principle we always follow.   {#2828}
[02:45:35] STUDENT_1: So basically for two threads, the nearest storage is the in-memory RAM.   {#2829}
[02:45:41] STUDENT_1: So we are using this Manutex and Semaphore for two processes.   {#2830}
[02:45:44] STUDENT_1: RAM is separated, so disk is there.   {#2831}
[02:45:46] STUDENT_1: Similarly, for two different machines, the nearest one is the database, external database.   {#2832}
[02:45:51] STUDENT_9: Excellent.   {#2833}
[02:45:52] STUDENT_9: Anything over a network.   {#2834}
[02:45:54] STUDENT_1: Yeah, so now let's say we have two different, two independent distributed systems.   {#2835}
[02:46:04] STUDENT_1: So in that case also we can leverage some, this redis system to synchronize two different   {#2836}
[02:46:11] STUDENT_1: distributed systems.   {#2837}
[02:46:14] STUDENT_1: Any example that would do it, that you have seen.   {#2838}
[02:46:17] STUDENT_9: What do you mean by distributed system?   {#2839}
[02:46:19] STUDENT_9: That's a very vague term.   {#2840}
[02:46:21] STUDENT_1: Okay.   {#2841}
[02:46:21] STUDENT_1: So right now in today's topic, we went to the, to, to the place where we are making two   {#2842}
[02:46:31] TEACHER: synchronized, right? Let's say we want to target a machine, two different distributed system is   {#2843}
[02:46:37] STUDENT_1: itself two different machines, right? So there is still. Okay. Okay. Let's think in this direction.   {#2844}
[02:46:45] STUDENT_1: Let's say there is a cluster. There are two clusters. Each of the cluster is formed of   {#2845}
[02:46:51] STUDENT_1: homogeneous operations. But if you compare among the cluster, they are performing heterogeneous   {#2846}
[02:46:55] STUDENT_1: operations and you want to do some synchronization between them.   {#2847}
[02:46:59] STUDENT_1: In that case also,   {#2848}
[02:47:00] STUDENT_1: like it's like a multiple machines versus multiple machines.   {#2849}
[02:47:03] STUDENT_1: Correct.   {#2850}
[02:47:04] TEACHER: But it's still network is common between them,   {#2851}
[02:47:06] TEACHER: right?   {#2852}
[02:47:07] TEACHER: They're all part of the same network.   {#2853}
[02:47:10] STUDENT_1: So basically it ends to a point that if we end up using this databases,   {#2854}
[02:47:19] STUDENT_1: then we are able to synchronize two entities over network.   {#2855}
[02:47:26] TEACHER: Yeah, it will always be network because there are multiple machines involved.   {#2856}
[02:47:30] TEACHER: Network is the only thing that is shared between machines, neither RAM nor IST.   {#2857}
[02:47:36] STUDENT_1: Understood.   {#2858}
[02:47:36] STUDENT_1: Understood.   {#2859}
[02:47:37] STUDENT_1: Great.   {#2860}
[02:47:38] STUDENT_1: Yeah.   {#2861}
[02:47:38] STUDENT_1: Thank you.   {#2862}
[02:47:39] STUDENT_1: Thank you for this principle.   {#2863}
[02:47:40] STUDENT_1: Yeah.   {#2864}
[02:47:41] STUDENT_1: Gaurav.   {#2865}
[02:47:43] STUDENT_1: Hi, so while acquiring the log, we store the process ID or the user ID parallel to the   {#2866}
[02:47:52] STUDENT_1: queue and also the PPA.   {#2867}
[02:47:53] STUDENT_1: So aren't we bounded by the, doesn't it become a bottleneck that a process can   {#2868}
[02:47:58] STUDENT_1: run for at most this amount of time now, but otherwise that's what you have to   {#2869}
[02:48:02] STUDENT_1: do.   {#2870}
[02:48:02] STUDENT_1: Otherwise there will be perpetual locking.   {#2871}
[02:48:04] STUDENT_1: Yes, but we are still bottleneck.   {#2872}
[02:48:07] STUDENT_1: Everything has it.   {#2873}
[02:48:08] STUDENT_1: Every single implementation has it.   {#2874}
[02:48:10] TEACHER: Otherwise you are running a bigger risk of perpetual locking.   {#2875}
[02:48:15] TEACHER: That's a bigger risk.   {#2876}
[02:48:17] TEACHER: You never deleting a message that you consume or you never deleting a lock,   {#2877}
[02:48:21] TEACHER: which means your entire system is stalled.   {#2878}
[02:48:24] STUDENT_1: Yeah.   {#2879}
[02:48:27] STUDENT_1: And let's say I as a developer go on to implement or as a project, I want to implement mutex   {#2880}
[02:48:33] STUDENT_1: and comparing that to a network log, which we just discussed.   {#2881}
[02:48:38] STUDENT_1: I think implementing mutex would be way more difficult than implementing network log.   {#2882}
[02:48:42] STUDENT_1: Implementing mutex is two lines of code in C.   {#2883}
[02:48:45] STUDENT_1: That's it.   {#2884}
[02:48:46] TEACHER: But that's okay.   {#2885}
[02:48:49] TEACHER: Okay.   {#2886}
[02:48:50] TEACHER: Because it's all in memory, single RAM.   {#2887}
[02:48:53] TEACHER: Everything is just a thread.   {#2888}
[02:48:55] TEACHER: You're coordinating between that's peanuts.   {#2889}
[02:48:58] STUDENT_1: But however, we are signaling over there.   {#2890}
[02:49:00] STUDENT_1: That is, I think a costly and I don't know how that.   {#2891}
[02:49:02] STUDENT_1: No, network is much more costly any day.   {#2892}
[02:49:05] STUDENT_1: It's the worst mode of communication.   {#2893}
[02:49:07] STUDENT_1: But we are not signaling here, right?   {#2894}
[02:49:09] STUDENT_1: We're just polling.   {#2895}
[02:49:10] STUDENT_1: But that's an infinite tube.   {#2896}
[02:49:12] STUDENT_1: Look here.   {#2897}
[02:49:14] STUDENT_1: Yeah.   {#2898}
[02:49:15] STUDENT_1: Look here.   {#2899}
[02:49:16] STUDENT_1: How many times are you making network call?   {#2900}
[02:49:19] STUDENT_1: No implementation way.   {#2901}
[02:49:20] STUDENT_1: This seems easy enough, but let's say I want to implement a signal now.   {#2902}
[02:49:24] STUDENT_1: Uh, that's very easy.   {#2903}
[02:49:25] TEACHER: And mutex is in memory signaling is peanuts for operating system.   {#2904}
[02:49:29] TEACHER: Okay.   {#2905}
[02:49:31] TEACHER: Network call versus signaling signaling any day.   {#2906}
[02:49:35] TEACHER: Got it.   {#2907}
[02:49:36] TEACHER: Thanks.   {#2908}
[02:49:36] TEACHER: What call is pathetically.   {#2909}
[02:49:38] STUDENT_4: Hey, hi.   {#2910}
[02:49:42] STUDENT_4: So, uh, I had question like, if this is, uh, not remote and it is having   {#2911}
[02:49:47] STUDENT_4: on one single server. So we have to use mutex or disk based   {#2912}
[02:49:52] TEACHER: synchronized. You can use normal synchronized.   {#2913}
[02:49:55] TEACHER: May if you rapid use mutex, then it just becomes a local critical section.   {#2914}
[02:49:59] TEACHER: You can just use normal mutex, the same upper synchronized atomic instructions   {#2915}
[02:50:03] STUDENT_9: and whatnot to wrap it around. You don't need ready for that.   {#2916}
[02:50:08] STUDENT_13: Thank you.   {#2917}
[02:50:12] STUDENT_2: I try to go deep inside five instance of redis law.   {#2918}
[02:50:17] STUDENT_2: understand one use case what happens there we have five tests here five redis cases and then   {#2919}
[02:50:22] STUDENT_2: if let's say one threat comes across comes and then gets three uh three locks uh after the lock   {#2920}
[02:50:29] STUDENT_2: acquired two instances go down uh so effectively has taken only one i mean effectively operations   {#2921}
[02:50:35] STUDENT_2: are going ahead and the one that is thing by the time the five minutes is a ttl let's say and then   {#2922}
[02:50:40] STUDENT_2: we come up we span across two redis new nodes uh again then there's another threat which is trying   {#2923}
[02:50:47] STUDENT_2: and then it has not three redis.   {#2924}
[02:50:50] STUDENT_2: Now we are in a shape where on a single, let's say common row   {#2925}
[02:50:56] STUDENT_2: and redis, we have acquired two locks on the same thing, right?   {#2926}
[02:50:59] STUDENT_2: Because they're different clusters, which are not in good shape   {#2927}
[02:51:01] STUDENT_2: among themselves.   {#2928}
[02:51:03] STUDENT_2: How the situation goes bad.   {#2929}
[02:51:06] TEACHER: That's what I said.   {#2930}
[02:51:06] TEACHER: That's what the edge case is.   {#2931}
[02:51:08] TEACHER: And that's what I said that this is not a full proof,   {#2932}
[02:51:10] TEACHER: but it still minimizes the chances.   {#2933}
[02:51:12] TEACHER: What are the chances of two servers going down?   {#2934}
[02:51:14] TEACHER: Who, which has held your locks?   {#2935}
[02:51:17] TEACHER: And in any case, listen to me carefully.   {#2936}
[02:51:20] TEACHER: And in any case, what I said is, let's say your consumer one has lock over here, lock   {#2937}
[02:51:26] TEACHER: over here and lock over here.   {#2938}
[02:51:28] TEACHER: Consumer to lock over here, lock over here.   {#2939}
[02:51:30] TEACHER: Look carefully.   {#2940}
[02:51:31] TEACHER: This line.   {#2941}
[02:51:32] TEACHER: If consumer C1 or C2, now here, let's say C2 has lock over here and here.   {#2942}
[02:51:39] TEACHER: C1 has lock here, here and here.   {#2943}
[02:51:41] TEACHER: if I was not able to acquire the lock on all instances like majority of locks what I would do   {#2944}
[02:51:48] TEACHER: I would release the lock I've acquired yeah yes yes I would release a lock so consumer C2 will   {#2945}
[02:51:53] TEACHER: release this lock yes then let's say there is a chance that consumer C3 will acquire lock over   {#2946}
[02:51:57] TEACHER: here C4 will acquire lock over here but C1 is still in majority they would say I cannot do that   {#2947}
[02:52:02] TEACHER: but because C1 is also trying to acquire the lock on the third and the fifth shard so somewhere down   {#2948}
[02:52:09] TEACHER: the line c1 would succeed and here also c1 would succeed so eventually your system will converge   {#2949}
[02:52:16] TEACHER: into the fact that on all the instances c1 would have the locks and it is doing it perfect but all   {#2950}
[02:52:20] TEACHER: we need for us to move forward is to have locks on majority of them right so this minimizes the   {#2951}
[02:52:27] TEACHER: the case that you mentioned but it's still there it's still there now what we are doing is let's   {#2952}
[02:52:32] TEACHER: say i acquire the locks on these three instances this is acquired by c2 and now let's say if these   {#2953}
[02:52:39] TEACHER: go down the one who acquired it but when they go down you would have some things in place   {#2954}
[02:52:46] TEACHER: right c1 would have started moving forward and then started removing the lock case number   {#2955}
[02:52:50] TEACHER: one that c1 already knew that it has majority obviously it has that's why it started moving   {#2956}
[02:52:54] TEACHER: forward right but now c2 because it is in the loop where it says hey i don't have the   {#2957}
[02:53:00] TEACHER: majority yet so it is trying to acquire the lock but says now there are three instances   {#2958}
[02:53:05] TEACHER: this so now there could be one thing you may have a global state which says that hey my my my cluster   {#2959}
[02:53:10] TEACHER: is unhealthy let's wait for two more nodes to come up that's one case other if you may think that hey   {#2960}
[02:53:15] TEACHER: i would not do that unless just move forward i own the majority i'll move forward with that   {#2961}
[02:53:18] TEACHER: so in that case what would happen is c2 would think that it has acquired the lock if c2 thinks   {#2962}
[02:53:24] TEACHER: that it has acquired the lock then c2 would move forward this is the h case that we're talking about   {#2963}
[02:53:29] TEACHER: But that is very minimal because for it to happen, you need this case would happen when   {#2964}
[02:53:41] TEACHER: your C1 was acquired the majority of locks before it gets, before it acquires the lock   {#2965}
[02:53:48] TEACHER: on other two instances, the two instances in which it has acquired a lock goes down.   {#2966}
[02:53:53] TEACHER: Imagine the probability of that happening.   {#2967}
[02:53:56] TEACHER: Got it.   {#2968}
[02:53:58] TEACHER: Imagine the probabilities because for it to acquire lock on these two, it would hardly   {#2969}
[02:54:01] TEACHER: take two or three seconds, not more than that.   {#2970}
[02:54:05] TEACHER: And why I'm so confident on it because every other process, because they would be failing   {#2971}
[02:54:10] TEACHER: on acquiring the lock on more than 50%, they would keep on releasing the lock that they've   {#2972}
[02:54:13] TEACHER: acquired.   {#2973}
[02:54:13] TEACHER: So they would keep on acquiring and releasing these locks.   {#2974}
[02:54:16] TEACHER: But C1 is also trying to acquire the locks over here.   {#2975}
[02:54:19] TEACHER: It's not that C1 has given up the majority.   {#2976}
[02:54:21] TEACHER: I'm full confident.   {#2977}
[02:54:22] TEACHER: C1 is still trying to acquire the lock on these instances as well.   {#2978}
[02:54:26] STUDENT_2: But, uh, uh, why would C1 try to acquire on M2?   {#2979}
[02:54:30] STUDENT_2: Because it already has a majority, right?   {#2980}
[02:54:32] STUDENT_2: So why would it go?   {#2981}
[02:54:33] TEACHER: But it would need to.   {#2982}
[02:54:35] TEACHER: Otherwise the H case that you mentioned.   {#2983}
[02:54:37] STUDENT_2: Okay.   {#2984}
[02:54:38] TEACHER: So to cover the H case, uh, C1 is allowed to minimize, not cover to minimize, right?   {#2985}
[02:54:45] TEACHER: Because your H case would happen when, when C1 has acquired the majority and it started   {#2986}
[02:54:52] TEACHER: it could acquire the lock on the remaining two instances then the two instances on which it   {#2987}
[02:54:58] TEACHER: already had the lock goes down that's when an hk system right that minimizes yes yes correct   {#2988}
[02:55:05] TEACHER: got it see this is why i love distributed systems you that i have implemented that's why i'm so   {#2989}
[02:55:13] TEACHER: confident in explaining you know what happens because i've mimicked this situation i've put   {#2990}
[02:55:18] TEACHER: tremendous load on it to understand how it behaves.   {#2991}
[02:55:22] TEACHER: I've specially arranged it in a way that delays.   {#2992}
[02:55:27] TEACHER: I typically simulate the situations with delays that one second delay,   {#2993}
[02:55:31] TEACHER: five second delay, 15 second delay in order to mimic this situation,   {#2994}
[02:55:34] TEACHER: to see how my system is reacting.   {#2995}
[02:55:36] TEACHER: Just do it.   {#2996}
[02:55:37] TEACHER: It's so fun.   {#2997}
[02:55:38] TEACHER: I just love distributed systems because of this very reason, because a lot   {#2998}
[02:55:41] TEACHER: of people think I need multiple machines to do that.   {#2999}
[02:55:43] TEACHER: No, I can do it in single machine.   {#3000}
[02:55:45] TEACHER: I did not even have five instances of Redis running.   {#3001}
[02:55:49] TEACHER: Instances of redis running in my local machine 637963806381 6382 6383.   {#3002}
[02:55:55] TEACHER: That's it.   {#3003}
[02:55:56] TEACHER: And just mimic it.   {#3004}
[02:55:58] TEACHER: Just mimic it.   {#3005}
[02:55:59] TEACHER: You don't really need fancy setup for this.   {#3006}
[02:56:02] TEACHER: All sorts of facts because for you, it is important to understand these edge cases and   {#3007}
[02:56:06] TEACHER: how you are minimizing it.   {#3008}
[02:56:08] TEACHER: This one line that a lot of people miss on is the line that makes all the difference.   {#3009}
[02:56:13] TEACHER: Right?   {#3010}
[02:56:13] TEACHER: These edge cases are minimal.   {#3011}
[02:56:15] TEACHER: We never say it is fully covered.   {#3012}
[02:56:16] TEACHER: We never say it is fully mitigated.   {#3013}
[02:56:18] TEACHER: minimized but thanks for bringing that up i got also i have seen a pattern that you i mean   {#3014}
[02:56:24] STUDENT_2: across the three weeks that you mentioned papers you mentioned implementation so it's like bounded   {#3015}
[02:56:29] STUDENT_2: together you read papers you try to implement and then you got into some details where you talk   {#3016}
[02:56:34] STUDENT_2: about these things right so basically implementation is the is the place where yes you can go yes a   {#3017}
[02:56:41] TEACHER: lot of people think system design distribute systems is all theoretical i need fancy infra   {#3018}
[02:56:46] TEACHER: to do that i give you 100 ways to mimic all of these things locally i just gave you one you need   {#3019}
[02:56:52] TEACHER: five instances of redis why have five servers run five processes load balancer i gave you that example   {#3020}
[02:56:58] TEACHER: read and implement i just never just read research papers i read and always implement   {#3021}
[02:57:02] TEACHER: because that's where i you know this edge case and i just go very in depth of it to understand   {#3022}
[02:57:08] TEACHER: uh especially those edge cases where it would falter and try to mimic them with explicit delays   {#3023}
[02:57:17] STUDENT_2: now that's the beauty of it yeah and starting you feel like i mean so much complexity but when you   {#3024}
[02:57:22] STUDENT_2: get into the details you you just feel fun then it gets an inertia to do more and more and more   {#3025}
[02:57:27] TEACHER: classic example load balancer i'm sure you would be intimidated by it but now you think of it it's   {#3026}
[02:57:34] TEACHER: so easy right right similarly just to digress from the discussion since yesterday evening   {#3027}
[02:57:41] TEACHER: I am obsessed by writing my own malloc.   {#3028}
[02:57:44] TEACHER: I am obsessed.   {#3029}
[02:57:46] TEACHER: I am obsessed.   {#3030}
[02:57:47] TEACHER: I am driving deep into how memory management happens   {#3031}
[02:57:49] TEACHER: at operating system level.   {#3032}
[02:57:51] TEACHER: How program gets memory?   {#3033}
[02:57:53] TEACHER: Where exactly is this heap?   {#3034}
[02:57:54] TEACHER: We say, this is allocated in heap.   {#3035}
[02:57:56] TEACHER: Where, Baba, where is this heap?   {#3036}
[02:57:57] TEACHER: It has to be somewhere in RAM.   {#3037}
[02:57:59] TEACHER: But where?   {#3038}
[02:58:00] TEACHER: How?   {#3039}
[02:58:00] TEACHER: How it is linked?   {#3040}
[02:58:01] TEACHER: I am planning to write my own malloc today.   {#3041}
[02:58:04] STUDENT_2: You have to do your own inodes and all those things.   {#3042}
[02:58:06] STUDENT_2: No, no.   {#3043}
[02:58:07] TEACHER: Inodes is file system.   {#3044}
[02:58:08] TEACHER: Inodes is file system.   {#3045}
[02:58:09] TEACHER: Malloc is in memory allocation.   {#3046}
[02:58:11] TEACHER: allocation.   {#3047}
---- OWNED SEGMENTS END ----

CTX| [02:58:14] TEACHER: Implementation,   {#3048}
CTX| [02:58:14] TEACHER: the devil lies in the   {#3049}
CTX| [02:58:16] TEACHER: details. If you don't implement,   {#3050}
CTX| [02:58:18] TEACHER: I would have never been able to answer your   {#3051}
CTX| [02:58:20] TEACHER: question if I would not have implemented it.   {#3052}
CTX| [02:58:22] TEACHER: Correct?   {#3053}
CTX| [02:58:24] TEACHER: That's the difference.   {#3054}
CTX| [02:58:27] TEACHER: Last 10 years,   {#3055}
CTX| [02:58:28] TEACHER: I have   {#3056}
CTX| [02:58:30] TEACHER: 180 projects,   {#3057}
CTX| [02:58:32] TEACHER: 80 repos on GitHub.   {#3058}
CTX| [02:58:34] TEACHER: A lot of them are private.   {#3059}
CTX| [02:58:36] STUDENT_5: 180 repos on GitHub.   {#3060}
CTX| [02:58:38] STUDENT_5: Think how many things I've implemented.   {#3061}
CTX| [02:58:41] STUDENT_2: What pushed you basically?   {#3062}
CTX| [02:58:42] STUDENT_2: You mean what, I mean, when I just tried to implement something, uh, that's your complexity.   {#3063}
CTX| [02:58:47] TEACHER: I'm in love with engineering.   {#3064}
CTX| [02:58:49] TEACHER: I find the scrappiest way to build.   {#3065}
CTX| [02:58:51] TEACHER: I don't, I don't think of time.   {#3066}
CTX| [02:58:54] TEACHER: I just study.   {#3067}
CTX| [02:58:56] TEACHER: I can study 24 hours a day.   {#3068}
CTX| [02:58:58] TEACHER: Even morning before the lecture, I was reading, uh, I was reading, uh, official documentation   {#3069}
CTX| [02:59:03] TEACHER: of the system calls that allocates memories in RAM.   {#3070}
CTX| [02:59:06] TEACHER: and I read it till 8 45 and then I started this meeting even if I have 50 minutes I'll read   {#3071}
CTX| [02:59:12] TEACHER: something I just love it I just love coding it out that's see I'm very intrinsically motivated   {#3072}
