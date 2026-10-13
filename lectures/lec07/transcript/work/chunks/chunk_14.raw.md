# chunk_14  OWNS 02:39:19 -> 02:50:24  (segments #2834-#3015, 2056 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:38:19] TEACHER: So long as you are operationally okay to do, to take up this amount   {#2813}
CTX| [02:38:23] TEACHER: of network transfer, it's okay.   {#2814}
CTX| [02:38:25] TEACHER: Right.   {#2815}
CTX| [02:38:26] TEACHER: But if you want to keep things operationally simple, which I prefer a lot,   {#2816}
CTX| [02:38:29] TEACHER: I would just do this.   {#2817}
CTX| [02:38:31] TEACHER: this one node copy paste here   {#2818}
CTX| [02:38:33] TEACHER: their server up and running in a   {#2819}
CTX| [02:38:35] TEACHER: in a brisk and   {#2820}
CTX| [02:38:37] TEACHER: I'm done right so I would   {#2821}
CTX| [02:38:39] TEACHER: like to keep things simple as compared to   {#2822}
CTX| [02:38:41] TEACHER: things operationally complex because simple   {#2823}
CTX| [02:38:43] TEACHER: systems scale and this is precisely   {#2824}
CTX| [02:38:45] TEACHER: where virtual   {#2825}
CTX| [02:38:47] TEACHER: nodes is a bad idea right   {#2826}
CTX| [02:38:49] TEACHER: thanks so much for making that   {#2827}
CTX| [02:38:51] TEACHER: okay   {#2828}
CTX| [02:38:53] TEACHER: any other question anyone   {#2829}
CTX| [02:38:55] TEACHER: yeah Gaurav   {#2830}
CTX| [02:38:57] STUDENT_6: not related to today's topic I have some   {#2831}
CTX| [02:39:01] TEACHER: let's let's complete consistent and then i'm more than happy to take care any questions on   {#2832}
CTX| [02:39:05] TEACHER: distributed cache in general that we discussed today throughout rajiv go to my lock my lock page   {#2833}

---- OWNED SEGMENTS START ----
[02:39:19] STUDENT_3: no i have been a c developer for a while so uh my lock doesn't return uh the sec fault when   {#2834}
[02:39:25] STUDENT_3: the heap goes out it returns the null pointer and c plus plus we get bad alloc as exception   {#2835}
[02:39:32] STUDENT_3: So this use case makes sense where you want to ask the user, how much memory you want   {#2836}
[02:39:36] STUDENT_3: to allocate for a cache.   {#2837}
[02:39:37] STUDENT_3: So you take in the memory, you just put it over there, but in general, if you want to   {#2838}
[02:39:40] STUDENT_3: leverage the whole system, you just check whether the return type of malloc is null   {#2839}
[02:39:45] STUDENT_3: or not.   {#2840}
[02:39:46] STUDENT_3: If it is null, you want to affect 100% 100% malloc returns null.   {#2841}
[02:39:50] TEACHER: I totally agree with that.   {#2842}
[02:39:51] TEACHER: But when you go beyond that, the program actually causes, I simulated it while I was building   {#2843}
[02:39:56] TEACHER: Here it is.   {#2844}
[02:39:57] TEACHER: It crashed.   {#2845}
[02:39:58] TEACHER: It came down.   {#2846}
[02:39:59] TEACHER: So obviously you know it better than me, but when you allocate using malloc,   {#2847}
[02:40:05] TEACHER: it assigns a virtual page, not a physical page.   {#2848}
[02:40:07] TEACHER: Right?   {#2849}
[02:40:08] TEACHER: So although your RAM is, let's say 4 GB, but your malloc can allocate 40 GB   {#2850}
[02:40:13] TEACHER: virtual space.   {#2851}
[02:40:14] TEACHER: So it starts allocating physical pages when you're actually starting to use   {#2852}
[02:40:18] TEACHER: the logical pages.   {#2853}
[02:40:20] TEACHER: Right?   {#2854}
[02:40:21] TEACHER: When you go beyond that, and I actually ran that experiment while I was   {#2855}
[02:40:26] TEACHER: building my redis to deliberately crash it because I read it a lot of places that program crashes,   {#2856}
[02:40:33] TEACHER: but I never saw it in action. So I found a blog, very old blog by someone almost a year back.   {#2857}
[02:40:41] TEACHER: And that code had this part where that person repeatedly mallogged a lot of stuff. So mallog   {#2858}
[02:40:47] TEACHER: does give you null, but beyond when you are, when you are not just allocating, but also reusing   {#2859}
[02:40:52] TEACHER: the pages that have been allocated to you beyond that thing the program crashes it's not fault of   {#2860}
[02:40:59] TEACHER: malloc program crashes that's what i have also observed i might be wrong but if you can find if   {#2861}
[02:41:05] TEACHER: you can help me in that direction more than happy to correct it right more than happy to do it but   {#2862}
[02:41:09] TEACHER: i was able to crash my program beyond the limit like beyond my uh so because the way i did it   {#2863}
[02:41:16] TEACHER: I allocated a page.   {#2864}
[02:41:18] TEACHER: I filled it with once and then I did malloc again and did malloc again because I was leveraging.   {#2865}
[02:41:24] TEACHER: I was reusing this thing again and again after a certain thing, the program sec faulted.   {#2866}
[02:41:28] TEACHER: It crashed because of a high memory usage.   {#2867}
[02:41:32] TEACHER: And that's what I also, but I, but I, again, you know, because you have much more practical   {#2868}
[02:41:36] TEACHER: experience than I have, I was able to crash the program.   {#2869}
[02:41:39] TEACHER: That's why I said this, but in case I'm wrong, happy to be correct.   {#2870}
[02:41:42] STUDENT_3: Sure. CDC part also had one question. So cities, if you go to the slide there, I want to understand   {#2871}
[02:41:51] STUDENT_3: how CDC, so CDC, you have drawn multiple instances of, uh, basically a node. So, uh, we said   {#2872}
[02:41:57] STUDENT_3: that there's a right ahead lock with CDC reads in bulk and then write in the same sequence   {#2873}
[02:42:01] STUDENT_3: in elastic search. That means one CDC instances, they take an handle of SQL client basically,   {#2874}
[02:42:07] STUDENT_3: right so it should be an active standby kind of architecture is it is it like should be active   {#2875}
[02:42:13] STUDENT_3: right active standby both works yeah but for replica for for like if you have n nodes active   {#2876}
[02:42:19] STUDENT_3: at the same time how would they synchronize what to read from where which partition to read what   {#2877}
[02:42:24] TEACHER: was last from one replica you don't need to read from all the replicas all replicas have the same   {#2878}
[02:42:28] TEACHER: data right you can configure cdc to read from just one of the replicas okay so but ends cdcs   {#2879}
[02:42:34] STUDENT_3: are reading from one replica or they have to know that from which partition index have a small   {#2880}
[02:42:42] TEACHER: database of their own where they keep track of it they they basically content so simple remote   {#2881}
[02:42:46] TEACHER: locks come into the picture they are all containing for in order to read that same thing right so it's   {#2882}
[02:42:52] STUDENT_3: normal synchronization primitives that they apply to read it but uh at one time only one cdc would   {#2883}
[02:42:57] STUDENT_3: go and take a lock and then read the data and then put on one table.   {#2884}
[02:43:02] STUDENT_3: Okay.   {#2885}
[02:43:02] STUDENT_3: There are two.   {#2886}
[02:43:03] STUDENT_3: Multiple tables.   {#2887}
[02:43:04] TEACHER: Yeah.   {#2888}
[02:43:05] TEACHER: That's, that's the case, right?   {#2889}
[02:43:06] TEACHER: You have multiple tables, right?   {#2890}
[02:43:07] TEACHER: So in order to read them in parallel, you can use this and for CDC, CDCs have a small   {#2891}
[02:43:12] TEACHER: database where they keep track of these things, but Hey, this is the last point that I read.   {#2892}
[02:43:17] TEACHER: I have committed this point on all of them.   {#2893}
[02:43:20] TEACHER: And then it, and then it, uh, and that gives us a, right.   {#2894}
[02:43:25] STUDENT_3: And regarding load part. So you told that the API service that were workers we had from Kafka node, they were putting a load on my SQL database, right? Server to read data and put into Elasticsearch or whatever.   {#2895}
[02:43:37] TEACHER: My SQL, sorry, Kafka never read from my SQL.   {#2896}
[02:43:40] STUDENT_3: Are you talking about API service? Yes. API service. They read from API events, whatever events API server published.   {#2897}
[02:43:46] STUDENT_3: Okay. Got it.   {#2898}
[02:43:48] STUDENT_3: So you said that the workers were actually fetching the IDs or whatever events they were sent from API and then they're reading the actual data from the mysql database and then putting into the sync source, whatever is there, right? So you told them that they would be load on the mysql instance. Now, now I want to compare the load what whatever the workers were doing as compared to the CDC load impacted load, what is the comparison between   {#2899}
[02:44:12] STUDENT_3: because there also you have WL logs over the source of reading would be still the same,   {#2900}
[02:44:16] STUDENT_3: right?   {#2901}
[02:44:17] TEACHER: So yeah, but here you can read in batches and you're doing with API events.   {#2902}
[02:44:22] STUDENT_3: Yeah.   {#2903}
[02:44:22] TEACHER: So every time you let's say you, you publish a blog, every block publish is one event for   {#2904}
[02:44:30] TEACHER: you.   {#2905}
[02:44:31] TEACHER: Correct.   {#2906}
[02:44:32] TEACHER: And in that event, either you just pass the blog ID or you pass the entire blog object.   {#2907}
[02:44:37] TEACHER: If you pass the entire blog object, which means your message size becomes huge.   {#2908}
[02:44:40] TEACHER: Right.   {#2909}
[02:44:41] TEACHER: Which requires large network IO to read that huge off message on the consumer side.   {#2910}
[02:44:45] TEACHER: If you just pass the blog ID, then you have to make a call to the database to read that   {#2911}
[02:44:49] TEACHER: entire row.   {#2912}
[02:44:50] TEACHER: Right.   {#2913}
[02:44:51] TEACHER: Now, when you put it, this would take time because this would put little load on your   {#2914}
[02:44:55] TEACHER: database to read this and then you write it over there.   {#2915}
[02:44:57] TEACHER: Right.   {#2916}
[02:44:58] TEACHER: But now here, what you're missing out on is you're missing out on the batching benefits   {#2917}
[02:45:03] TEACHER: that you'll get when you read from write ahead log.   {#2918}
[02:45:07] TEACHER: people rose, literal rose from the database.   {#2919}
[02:45:10] TEACHER: The amount of data transfer is still the same, but now the reading is happening in batches.   {#2920}
[02:45:15] TEACHER: Writing is happening in batches.   {#2921}
[02:45:16] TEACHER: That's the advantage.   {#2922}
[02:45:18] TEACHER: The number of messages or the amount of data that is processed is processed much faster   {#2923}
[02:45:22] TEACHER: because batching inherently solves a ton of problem around this.   {#2924}
[02:45:25] TEACHER: Right.   {#2925}
[02:45:26] TEACHER: Plus you can also leverage with CDCs.   {#2926}
[02:45:30] TEACHER: You can, you don't need to have an API event for everything because there are some changes.   {#2927}
[02:45:34] TEACHER: I'll give an example.   {#2928}
[02:45:37] TEACHER: You have asynchronous workers that are updating, not in the API request context.   {#2929}
[02:45:42] TEACHER: Let's say you have asynchronous workers that are doing some changes in the database.   {#2930}
[02:45:46] TEACHER: Let's say aggregating the likes count on a particular post frequently.   {#2931}
[02:45:52] TEACHER: Right?   {#2932}
[02:45:52] TEACHER: So, sorry, periodically.   {#2933}
[02:45:54] TEACHER: Now, those are not API calls, right?   {#2934}
[02:45:57] TEACHER: These are asynchronous workers who are updating things on the database.   {#2935}
[02:46:00] TEACHER: Now, do you want those changes to come to Elasticsearch?   {#2936}
[02:46:02] TEACHER: Don't you?   {#2937}
[02:46:03] TEACHER: So, not everything has an event.   {#2938}
[02:46:06] TEACHER: it's a subset of things okay understood right so that's where what you need to do is it's   {#2939}
[02:46:11] TEACHER: better to read from the source of truth rather than relying on the eps server because not   {#2940}
[02:46:16] TEACHER: everything would be anything that's where cdc comes in hands correct yeah sure super   {#2941}
[02:46:22] TEACHER: but in case you find it see what i think i do do drop me a note now i'm more than happy   {#2942}
[02:46:26] STUDENT_3: to rectify i don't know i just read about malloc i knew what malloc part but yeah i   {#2943}
[02:46:31] TEACHER: mean, whatever you discovered was it failed because I ran it multiple times and it failed   {#2944}
[02:46:36] TEACHER: for that.   {#2945}
[02:46:37] TEACHER: I really, I tried to find a lot of reasons in most places just written in one line, but   {#2946}
[02:46:43] TEACHER: because I simulated it, it failed multiple times, repetitively at the same point and   {#2947}
[02:46:51] TEACHER: my program crashed.   {#2948}
[02:46:52] TEACHER: So, but you're a hundred percent correct.   {#2949}
[02:46:55] TEACHER: Malak returns null when it is unable to allocate and which is how you get to know about it.   {#2950}
[02:47:01] TEACHER: it further and which is when you can initiate that part but i saw that but in case i'm more   {#2951}
[02:47:07] STUDENT_3: than happy to get crash happens whenever program tries to access some other memory whatever is   {#2952}
[02:47:12] TEACHER: not supposed to so beyond that on a physical page on logical page it can still allocate   {#2953}
[02:47:17] TEACHER: but on physical page when it tries to allocate that's where it crashes that's what i got to know   {#2954}
[02:47:21] STUDENT_3: through my small prototype that i wrote logical pages convert to the physical pages right they   {#2955}
[02:47:27] STUDENT_3: They add the base address and then they find the physical address.   {#2956}
[02:47:31] TEACHER: Which is where it goes beyond the reach.   {#2957}
[02:47:34] STUDENT_3: Okay.   {#2958}
[02:47:35] STUDENT_3: So, okay.   {#2959}
[02:47:36] STUDENT_3: But logical addresses, logical address, they would have no, but they, they don't have any   {#2960}
[02:47:40] STUDENT_3: pick mechanism to know how much I can grow or maybe always could give a default memory.   {#2961}
[02:47:44] STUDENT_3: Okay.   {#2962}
[02:47:45] STUDENT_3: But it can't also, because it's a paging rights.   {#2963}
[02:47:47] STUDENT_3: It's a paging concept.   {#2964}
[02:47:48] STUDENT_3: Yeah.   {#2965}
[02:47:49] TEACHER: That's why even, even I don't have any deep understanding of it, but this is what I was   {#2966}
[02:47:53] TEACHER: able to simulate.   {#2967}
[02:47:55] TEACHER: So yeah, it's a, it's a very fascinating world.   {#2968}
[02:47:57] TEACHER: I'm very tempted to dive deep into, uh, OS and memory patching after I discovered this,   {#2969}
[02:48:02] TEACHER: it's there on my to do list for a long time.   {#2970}
[02:48:07] TEACHER: Thanks.   {#2971}
[02:48:08] TEACHER: Okay.   {#2972}
[02:48:09] TEACHER: Uh, Gaurav, go on.   {#2973}
[02:48:12] TEACHER: Mine were, mine were the general questions.   {#2974}
[02:48:15] TEACHER: I know.   {#2975}
[02:48:15] TEACHER: Sorry, sorry, sorry.   {#2976}
[02:48:16] TEACHER: I forgot to lower your head.   {#2977}
[02:48:18] TEACHER: Just a minute.   {#2978}
[02:48:18] TEACHER: I'll take other one.   {#2979}
[02:48:20] TEACHER: Anubhaf, go on.   {#2980}
[02:48:22] STUDENT_5: Hey, Arpit. So I, my question was around distributed cache, the low level implementation that we   {#2981}
[02:48:28] STUDENT_5: discussed. So let's say we have a set of data structure in a cache as a value for some key.   {#2982}
[02:48:39] STUDENT_5: And say when we instantiate the set, we allocate one zero two four bytes for these sets. And when   {#2983}
[02:48:48] STUDENT_5: When we build up these one zero two four bytes and the request comes in to add more elements.   {#2984}
[02:48:53] STUDENT_5: Do we have to deallocate the memory, then reallocate a bigger memory block and copy the data?   {#2985}
[02:49:00] STUDENT_5: Okay.   {#2986}
[02:49:01] TEACHER: So that becomes an expensive operation.   {#2987}
[02:49:03] TEACHER: So we need.   {#2988}
[02:49:04] TEACHER: Okay.   {#2989}
[02:49:05] TEACHER: Yes.   {#2990}
[02:49:07] TEACHER: So that's a hash tables work, right?   {#2991}
[02:49:09] TEACHER: You allocate arrays of certain size.   {#2992}
[02:49:12] TEACHER: It fills up.   {#2993}
[02:49:12] TEACHER: You twice the array, you reallocate, move the data and whatnot.   {#2994}
[02:49:16] TEACHER: So that's the way to go.   {#2995}
[02:49:19] STUDENT_5: Got it.   {#2996}
[02:49:20] STUDENT_5: Yeah, thank you.   {#2997}
[02:49:21] STUDENT_5: So I had another question on LRU and LFU.   {#2998}
[02:49:25] STUDENT_5: So as a generalization that LFU is more performant to use when the popularity of keys is very asymmetric as in some keys are very popular and these are used by everyone.   {#2999}
[02:49:37] STUDENT_5: Whereas other, there are some other keys which are not so popular.   {#3000}
[02:49:40] STUDENT_5: Whereas LRU is when it can be used when the popularity is not very asymmetric.   {#3001}
[02:49:47] TEACHER: Okay.   {#3002}
[02:49:48] TEACHER: Terms you used were brilliant, but just one thing, keys were popular, but you still don't   {#3003}
[02:49:53] TEACHER: want to emit in case they are not recently accessed.   {#3004}
[02:49:58] STUDENT_5: That is a sub case there.   {#3005}
[02:50:02] TEACHER: So you still want to hold on that because it gave you good returns in the past.   {#3006}
[02:50:06] TEACHER: You are hoping that it would grow further.   {#3007}
[02:50:08] TEACHER: You are not looking at the recency buyers   {#3008}
[02:50:11] TEACHER: because the stock went down and want to sell it.   {#3009}
[02:50:13] TEACHER: That's the analogy that I always go with.   {#3010}
[02:50:15] TEACHER: LFU at LRE.   {#3011}
[02:50:18] STUDENT_5: Yeah, got it.   {#3012}
[02:50:20] STUDENT_5: Thank you.   {#3013}
[02:50:20] TEACHER: Yeah, thanks.   {#3014}
[02:50:21] TEACHER: DK?   {#3015}
---- OWNED SEGMENTS END ----

CTX| [02:50:24] STUDENT_4: So Arpit, my question is related to consistent hashing.   {#3016}
CTX| [02:50:28] STUDENT_4: So when you're adding a new node,   {#3017}
CTX| [02:50:30] STUDENT_4: so the data which you're going to copy in that new node   {#3018}
CTX| [02:50:34] STUDENT_4: is the extra data which is coming in that range   {#3019}
CTX| [02:50:38] STUDENT_4: So let's say from cache five to cache one, whatever data is in that range will still   {#3020}
CTX| [02:50:42] STUDENT_4: remain in cache one or would cache one will have all the data, which is there in cache   {#3021}
CTX| [02:50:47] STUDENT_4: one from cache.   {#3022}
CTX| [02:50:50] TEACHER: Thinking it operationally taking it operationally.   {#3023}
CTX| [02:50:53] TEACHER: What we'll do will take snapshot of cache one load the data or basically create cache   {#3024}
CTX| [02:50:58] TEACHER: five added to the ring and delete the data on cache one.   {#3025}
CTX| [02:51:02] TEACHER: There is like why?   {#3026}
CTX| [02:51:04] TEACHER: Because now basically cache is the one that is handling the data.   {#3027}
CTX| [02:51:06] TEACHER: Right?   {#3028}
CTX| [02:51:08] TEACHER: to do that for you.   {#3029}
CTX| [02:51:09] TEACHER: So you can delete the data   {#3030}
CTX| [02:51:10] TEACHER: from the cache.   {#3031}
CTX| [02:51:11] TEACHER: Because now cache 1   {#3032}
CTX| [02:51:12] TEACHER: is not the first owner of it.   {#3033}
CTX| [02:51:14] TEACHER: But in case you have   {#3034}
CTX| [02:51:15] TEACHER: replication factor set up   {#3035}
CTX| [02:51:16] TEACHER: and whatnot,   {#3036}
CTX| [02:51:16] TEACHER: those complexities,   {#3037}
CTX| [02:51:18] TEACHER: then you may choose   {#3038}
CTX| [02:51:18] TEACHER: to keep the data on cache 1   {#3039}
CTX| [02:51:20] TEACHER: in any way.   {#3040}
CTX| [02:51:21] TEACHER: Because in any way,   {#3041}
CTX| [02:51:22] TEACHER: we'll have replication factor   {#3042}
CTX| [02:51:23] TEACHER: of two.   {#3043}
CTX| [02:51:24] TEACHER: So then anyway,   {#3044}
