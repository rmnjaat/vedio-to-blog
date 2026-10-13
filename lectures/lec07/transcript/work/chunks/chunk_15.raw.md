# chunk_15  OWNS 02:50:24 -> 03:03:21  (segments #3016-#3337, 2217 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:49:25] STUDENT_5: So as a generalization that LFU is more performant to use when the popularity of keys is very asymmetric as in some keys are very popular and these are used by everyone.   {#2999}
CTX| [02:49:37] STUDENT_5: Whereas other, there are some other keys which are not so popular.   {#3000}
CTX| [02:49:40] STUDENT_5: Whereas LRU is when it can be used when the popularity is not very asymmetric.   {#3001}
CTX| [02:49:47] TEACHER: Okay.   {#3002}
CTX| [02:49:48] TEACHER: Terms you used were brilliant, but just one thing, keys were popular, but you still don't   {#3003}
CTX| [02:49:53] TEACHER: want to emit in case they are not recently accessed.   {#3004}
CTX| [02:49:58] STUDENT_5: That is a sub case there.   {#3005}
CTX| [02:50:02] TEACHER: So you still want to hold on that because it gave you good returns in the past.   {#3006}
CTX| [02:50:06] TEACHER: You are hoping that it would grow further.   {#3007}
CTX| [02:50:08] TEACHER: You are not looking at the recency buyers   {#3008}
CTX| [02:50:11] TEACHER: because the stock went down and want to sell it.   {#3009}
CTX| [02:50:13] TEACHER: That's the analogy that I always go with.   {#3010}
CTX| [02:50:15] TEACHER: LFU at LRE.   {#3011}
CTX| [02:50:18] STUDENT_5: Yeah, got it.   {#3012}
CTX| [02:50:20] STUDENT_5: Thank you.   {#3013}
CTX| [02:50:20] TEACHER: Yeah, thanks.   {#3014}
CTX| [02:50:21] TEACHER: DK?   {#3015}

---- OWNED SEGMENTS START ----
[02:50:24] STUDENT_4: So Arpit, my question is related to consistent hashing.   {#3016}
[02:50:28] STUDENT_4: So when you're adding a new node,   {#3017}
[02:50:30] STUDENT_4: so the data which you're going to copy in that new node   {#3018}
[02:50:34] STUDENT_4: is the extra data which is coming in that range   {#3019}
[02:50:38] STUDENT_4: So let's say from cache five to cache one, whatever data is in that range will still   {#3020}
[02:50:42] STUDENT_4: remain in cache one or would cache one will have all the data, which is there in cache   {#3021}
[02:50:47] STUDENT_4: one from cache.   {#3022}
[02:50:50] TEACHER: Thinking it operationally taking it operationally.   {#3023}
[02:50:53] TEACHER: What we'll do will take snapshot of cache one load the data or basically create cache   {#3024}
[02:50:58] TEACHER: five added to the ring and delete the data on cache one.   {#3025}
[02:51:02] TEACHER: There is like why?   {#3026}
[02:51:04] TEACHER: Because now basically cache is the one that is handling the data.   {#3027}
[02:51:06] TEACHER: Right?   {#3028}
[02:51:08] TEACHER: to do that for you.   {#3029}
[02:51:09] TEACHER: So you can delete the data   {#3030}
[02:51:10] TEACHER: from the cache.   {#3031}
[02:51:11] TEACHER: Because now cache 1   {#3032}
[02:51:12] TEACHER: is not the first owner of it.   {#3033}
[02:51:14] TEACHER: But in case you have   {#3034}
[02:51:15] TEACHER: replication factor set up   {#3035}
[02:51:16] TEACHER: and whatnot,   {#3036}
[02:51:16] TEACHER: those complexities,   {#3037}
[02:51:18] TEACHER: then you may choose   {#3038}
[02:51:18] TEACHER: to keep the data on cache 1   {#3039}
[02:51:20] TEACHER: in any way.   {#3040}
[02:51:21] TEACHER: Because in any way,   {#3041}
[02:51:22] TEACHER: we'll have replication factor   {#3042}
[02:51:23] TEACHER: of two.   {#3043}
[02:51:24] TEACHER: So then anyway,   {#3044}
[02:51:24] TEACHER: the data would be copied   {#3045}
[02:51:25] TEACHER: two times over here.   {#3046}
[02:51:27] TEACHER: Sorry,   {#3047}
[02:51:27] TEACHER: two times over here.   {#3048}
[02:51:28] TEACHER: Cache 5 data   {#3049}
[02:51:29] TEACHER: will be copied here also   {#3050}
[02:51:30] TEACHER: and here also.   {#3051}
[02:51:31] TEACHER: So in that case,   {#3052}
[02:51:32] TEACHER: it does not make sense   {#3053}
[02:51:32] TEACHER: to delete the data.   {#3054}
[02:51:33] TEACHER: But in case you don't have   {#3055}
[02:51:34] TEACHER: any replication factor,   {#3056}
[02:51:36] TEACHER: then you create,   {#3057}
[02:51:37] TEACHER: you take the snapshot,   {#3058}
[02:51:38] TEACHER: create this node   {#3059}
[02:51:39] TEACHER: and then delete the keys   {#3060}
[02:51:40] TEACHER: that are not needed over here.   {#3061}
[02:51:42] STUDENT_4: Got it.   {#3062}
[02:51:43] STUDENT_4: Got it.   {#3063}
[02:51:44] STUDENT_4: And second thing is   {#3064}
[02:51:45] STUDENT_4: see still I don't understand   {#3065}
[02:51:46] STUDENT_4: the concept of virtual nodes   {#3066}
[02:51:48] STUDENT_4: in consistent hashing.   {#3067}
[02:51:50] STUDENT_4: Why?   {#3068}
[02:51:51] STUDENT_4: Maybe I have not read about it.   {#3069}
[02:51:52] TEACHER: Let's do one thing.   {#3070}
[02:51:54] TEACHER: Search for virtual nodes.   {#3071}
[02:51:57] TEACHER: Go through consistent hashing.   {#3072}
[02:51:58] TEACHER: Go through virtual nodes   {#3073}
[02:51:59] TEACHER: in consistent hashing.   {#3074}
[02:52:01] TEACHER: And let's discuss it tomorrow.   {#3075}
[02:52:03] STUDENT_4: Sure.   {#3076}
[02:52:03] STUDENT_4: Sure.   {#3077}
[02:52:04] STUDENT_4: Right?   {#3078}
[02:52:04] TEACHER: Once we have that   {#3079}
[02:52:05] TEACHER: then you'll be able to   {#3080}
[02:52:06] TEACHER: understand   {#3081}
[02:52:08] TEACHER: when we discuss, ask the same question again.   {#3082}
[02:52:10] TEACHER: Once you have an understanding of virtual loads,   {#3083}
[02:52:12] TEACHER: and in most cases, when you go through that   {#3084}
[02:52:14] TEACHER: and you go through this video   {#3085}
[02:52:17] TEACHER: and listen to my expression of why virtual loads wouldn't work,   {#3086}
[02:52:21] TEACHER: just think about it operationally.   {#3087}
[02:52:23] TEACHER: How would you copy the data?   {#3088}
[02:52:25] TEACHER: How many different places would you have to copy the data   {#3089}
[02:52:28] TEACHER: from different ranges and whatnot   {#3090}
[02:52:29] TEACHER: and how complicated things would become for you?   {#3091}
[02:52:32] TEACHER: And that's when you would realize,   {#3092}
[02:52:33] TEACHER: it's better to not use virtual loads   {#3093}
[02:52:35] TEACHER: when it is a shameful application.   {#3094}
[02:52:38] TEACHER: than happy to discuss, spend some time, uh, understanding what virtual nodes are more   {#3095}
[02:52:42] TEACHER: than happy to discuss.   {#3096}
[02:52:44] TEACHER: Sure.   {#3097}
[02:52:45] TEACHER: Thanks.   {#3098}
[02:52:46] TEACHER: Thank you.   {#3099}
[02:52:47] STUDENT_2: So I have a question on the single threaded, uh, single node, uh, cache that we discussed,   {#3100}
[02:52:56] STUDENT_2: uh, what kind of hardware are we thinking?   {#3101}
[02:52:59] STUDENT_2: Like, isn't it like if you have a eight VCU CPU, just wasting seven of them, are we putting   {#3102}
[02:53:08] TEACHER: Yes, you are wasting CPUs because you have, let's say, and this is typically happens.   {#3103}
[02:53:13] TEACHER: If you install Redis on a machine and you run it, if that machine has 32 cores,   {#3104}
[02:53:18] TEACHER: only one code is being used by Redis.   {#3105}
[02:53:20] TEACHER: Every other 31 cores are sitting idle.   {#3106}
[02:53:22] STUDENT_2: Yeah.   {#3107}
[02:53:23] STUDENT_2: I mean, I would like to have eight shards on the same machine.   {#3108}
[02:53:27] TEACHER: And that's what people do to increase the utilization, the hardware utilization.   {#3109}
[02:53:31] STUDENT_2: Yeah.   {#3110}
[02:53:32] STUDENT_2: That's what I was, I mean, and this whole single threaded stuff, if I understand,   {#3111}
[02:53:38] STUDENT_2: way you showed malloc implementation all of that works because of a single threaded thing if it you   {#3112}
[02:53:43] STUDENT_2: put a concurrent thing it would be a havoc right yes massive massive havoc yeah and all of the   {#3113}
[02:53:49] STUDENT_2: basically you're saving all those context which uh costs and all of that's the whole idea right   {#3114}
[02:53:56] TEACHER: yeah okay but if you save a ton of things so basically single threaded makes a lot of things   {#3115}
[02:54:02] TEACHER: oversimplified oversimplified because but then you still don't lose on currency that's the beauty of   {#3116}
[02:54:08] TEACHER: but you're under utilizing your hardware.   {#3117}
[02:54:10] TEACHER: So, but you can put multiple Redis nodes   {#3118}
[02:54:12] TEACHER: on the single machine to leverage it.   {#3119}
[02:54:13] TEACHER: So there are again trade-offs   {#3120}
[02:54:15] TEACHER: that you're picking everywhere.   {#3121}
[02:54:17] STUDENT_2: Right, yeah, that's what will happen.   {#3122}
[02:54:19] STUDENT_2: And I think that's a better idea anyways,   {#3123}
[02:54:20] STUDENT_2: rather than introducing the complexity of concurrency,   {#3124}
[02:54:23] STUDENT_2: given the use case we have.   {#3125}
[02:54:26] STUDENT_2: And one more thing is,   {#3126}
[02:54:27] STUDENT_2: yeah, I was hearing out your discussion   {#3127}
[02:54:29] STUDENT_2: on the malloc thing.   {#3128}
[02:54:30] STUDENT_2: I can add my two cents there.   {#3129}
[02:54:31] STUDENT_2: Please, please, please.   {#3130}
[02:54:32] STUDENT_2: Yeah, so malloc basically what you're saying, right?   {#3131}
[02:54:35] STUDENT_2: Like that happens with kmalloc.   {#3132}
[02:54:38] STUDENT_2: malloc, what you're doing. And if you keep writing it to every right, there is a page   {#3133}
[02:54:45] STUDENT_2: fault and you will allocate a page and you keep writing until you exhaust the physical   {#3134}
[02:54:48] STUDENT_2: memory. Now there is something different that happens when you use the GNU malloc or user   {#3135}
[02:54:53] STUDENT_2: malloc or any other malloc, right? TC malloc, J malloc. They have one is they have you have   {#3136}
[02:54:59] STUDENT_2: user limits and two is malloc itself has configurations on limits on the user, which you can set because   {#3137}
[02:55:08] STUDENT_2: you don't want to be in a case where you're at 98 and 99%.   {#3138}
[02:55:12] STUDENT_2: One service can take, if you are hosting multiple services on a node, things like,   {#3139}
[02:55:17] STUDENT_2: so generally you will counter them with one is kernel level U limits, like each process.   {#3140}
[02:55:22] STUDENT_2: When you set U limits two is with the malloc library limits itself.   {#3141}
[02:55:27] STUDENT_2: Like generally people don't use GNU malloc.   {#3142}
[02:55:30] STUDENT_2: So yeah, that's how.   {#3143}
[02:55:32] STUDENT_2: So now about the fault, right?   {#3144}
[02:55:34] STUDENT_2: So yeah, you will generally get a SIG about.   {#3145}
[02:55:38] STUDENT_2: moment you cross yeah because and two is whenever so the program does crash right where you hit the   {#3146}
[02:55:44] STUDENT_2: program will crash because kernel will kill you the moment you exceed those limits kernel wants   {#3147}
[02:55:50] TEACHER: to save itself right that's what you're trying to super chalo chalo my understanding is correct   {#3148}
[02:55:55] TEACHER: okay so it throws sig about at that time yeah yeah but then so and it will take in case we   {#3149}
[02:56:02] STUDENT_9: handle that signal then?   {#3150}
[02:56:04] STUDENT_2: No, no.   {#3151}
[02:56:05] STUDENT_2: About is not something that you can.   {#3152}
[02:56:06] STUDENT_2: I mean, there are ways you can handle.   {#3153}
[02:56:09] STUDENT_2: About is basically, it is a signal where you are saying your instruction pipeline is done.   {#3154}
[02:56:17] STUDENT_2: So, this is only way you handle it.   {#3155}
[02:56:19] STUDENT_9: I read it.   {#3156}
[02:56:19] STUDENT_9: Yeah, yeah, yeah.   {#3157}
[02:56:20] STUDENT_9: Instruction pipelines.   {#3158}
[02:56:21] STUDENT_2: Now, after about what you can execute is whatever you want to push and all of that,   {#3159}
[02:56:25] STUDENT_2: but you are done.   {#3160}
[02:56:26] STUDENT_2: Like it's a sync signal.   {#3161}
[02:56:27] STUDENT_2: You're right.   {#3162}
[02:56:27] STUDENT_2: But about this, basically the process is killed now.   {#3163}
[02:56:32] TEACHER: I just remembered my B-Tech.   {#3164}
[02:56:35] TEACHER: I did this course on that Philosophia's Unix book.   {#3165}
[02:56:39] TEACHER: Programming in Unix book.   {#3166}
[02:56:41] TEACHER: I had a course and it had part of the SIGABOT.   {#3167}
[02:56:45] TEACHER: When you said this instruction pipeline, then it hit me.   {#3168}
[02:56:49] TEACHER: I got it.   {#3169}
[02:56:49] TEACHER: I started 2011.   {#3170}
[02:56:51] TEACHER: Final year where I got it.   {#3171}
[02:56:53] TEACHER: Now I'll repress the concept.   {#3172}
[02:56:54] TEACHER: Now I know what to Google.   {#3173}
[02:56:56] TEACHER: Thanks.   {#3174}
[02:56:56] TEACHER: Thanks so much.   {#3175}
[02:56:57] STUDENT_2: No problem.   {#3176}
[02:56:59] STUDENT_2: Yeah.   {#3177}
[02:56:59] STUDENT_2: Thank you.   {#3178}
[02:57:01] TEACHER: Program does crash.   {#3179}
[02:57:02] TEACHER: Singapore, you can't handle much.   {#3180}
[02:57:04] TEACHER: Point noted.   {#3181}
[02:57:06] TEACHER: I'll refine the material for the next quarter.   {#3182}
[02:57:09] TEACHER: Thanks.   {#3183}
[02:57:09] TEACHER: It will be a huge addition.   {#3184}
[02:57:12] TEACHER: Shreya, you have a question, please.   {#3185}
[02:57:19] STUDENT_9: Shreya?   {#3186}
[02:57:23] STUDENT_9: Shreya is gone.   {#3187}
[02:57:24] TEACHER: Okay.   {#3188}
[02:57:25] TEACHER: I'll circle back.   {#3189}
[02:57:26] TEACHER: Gaurav, you had general questions.   {#3190}
[02:57:29] TEACHER: So I put in the second week class when you, we were discussing about shared logs and also   {#3191}
[02:57:34] STUDENT_6: we implemented a few of the law.   {#3192}
[02:57:36] STUDENT_6: So while I was implementing shared logs, I expected the program to run properly, like   {#3193}
[02:57:40] STUDENT_6: 120 seats being allocated to 120 people.   {#3194}
[02:57:43] STUDENT_6: Shouldn't that have been the case because I was seeing some red logs and shared log,   {#3195}
[02:57:49] TEACHER: shared log, when you take shared log, but you're still updating.   {#3196}
[02:57:51] TEACHER: When you update the lock elevates to your exclusive lock and then it doesn't update.   {#3197}
[02:58:01] STUDENT_6: So like 120 seats should have been allocated to 120 people.   {#3198}
[02:58:04] STUDENT_6: While in my case, five seats were being allocated to many of the people.   {#3199}
[02:58:09] TEACHER: That should not have happened.   {#3200}
[02:58:10] TEACHER: What was your isolation level?   {#3201}
[02:58:15] TEACHER: I don't remember, but I can.   {#3202}
[02:58:17] TEACHER: Check that once.   {#3203}
[02:58:18] TEACHER: Check that once.   {#3204}
[02:58:19] TEACHER: All right.   {#3205}
[02:58:19] TEACHER: Check the isolation level.   {#3206}
[02:58:21] TEACHER: there is SQL administration,   {#3207}
[02:58:23] TEACHER: basically if you're using MySQL,   {#3208}
[02:58:24] TEACHER: there is MySQL administrative console,   {#3209}
[02:58:26] TEACHER: not UI part,   {#3210}
[02:58:27] TEACHER: but you can check which row is getting which log.   {#3211}
[02:58:30] TEACHER: You can see that visualization there,   {#3212}
[02:58:32] TEACHER: that what is happening behind the scene.   {#3213}
[02:58:34] TEACHER: So that would help you debug it.   {#3214}
[02:58:37] TEACHER: But let's say if I would have taken shared log,   {#3215}
[02:58:41] TEACHER: then the first process to write it   {#3216}
[02:58:43] TEACHER: elevates it to exclusive log.   {#3217}
[02:58:46] TEACHER: Other process   {#3218}
[02:58:50] TEACHER: still holds the shared log.   {#3219}
[02:58:55] TEACHER: Now, if I think of it,   {#3220}
[02:58:58] TEACHER: it would rewrite.   {#3221}
[02:58:59] TEACHER: It would overwrite.   {#3222}
[02:59:00] TEACHER: Was it overwriting?   {#3223}
[02:59:03] TEACHER: Yeah.   {#3224}
[02:59:03] TEACHER: Yeah.   {#3225}
[02:59:04] TEACHER: So, which means that   {#3226}
[02:59:06] TEACHER: it is not revaluating the statement.   {#3227}
[02:59:08] TEACHER: But that happens in exclusive logs.   {#3228}
[02:59:12] TEACHER: So, both of them took shared log   {#3229}
[02:59:14] TEACHER: on an object.   {#3230}
[02:59:15] TEACHER: One of them was writing.   {#3231}
[02:59:18] TEACHER: the shared lock one the shared lock when it tried to write because other transaction had an exclusive   {#3232}
[02:59:23] TEACHER: lock other transaction wrote first shared lock the other the first it's it's it's it's clear in my   {#3233}
[02:59:30] TEACHER: head but let me let me put it simply so let's say you have transaction one transaction two and this   {#3234}
[02:59:34] TEACHER: is my guess i might be wrong uh i'm assuming the isolation level is repeatable read yeah that's   {#3235}
[02:59:41] TEACHER: what i'm assuming the isolation level is repeatable it which is the most common one out there almost   {#3236}
[02:59:48] TEACHER: So two transactions trying to update the,   {#3237}
[02:59:51] TEACHER: like let's say you have two rows, two transactions.   {#3238}
[02:59:54] TEACHER: Ideally, both of them should update.   {#3239}
[02:59:55] TEACHER: Similar. So from 120, I just reduced the problem statement to two.   {#3240}
[02:59:58] TEACHER: Now let's say both the transaction took the lock on row one, shared lock.   {#3241}
[03:00:02] TEACHER: Both of them have the shared lock.   {#3242}
[03:00:05] TEACHER: Transaction two wrote first.   {#3243}
[03:00:09] TEACHER: So it wants to write.   {#3244}
[03:00:10] TEACHER: So the shared lock became for transaction two,   {#3245}
[03:00:12] TEACHER: the shared lock became exclusive lock.   {#3246}
[03:00:15] TEACHER: Transaction one still holds the shared lock   {#3247}
[03:00:17] TEACHER: the data, no one stopping it from reading the data.   {#3248}
[03:00:20] TEACHER: Both of them   {#3249}
[03:00:21] TEACHER: are writing to that same row.   {#3250}
[03:00:23] TEACHER: Like both of them took the lock on the same row.   {#3251}
[03:00:26] TEACHER: Transaction 1 wrote it.   {#3252}
[03:00:28] TEACHER: Transaction 2 now starts to   {#3253}
[03:00:29] TEACHER: write. It waits until the   {#3254}
[03:00:31] TEACHER: transaction 2   {#3255}
[03:00:32] TEACHER: sorry, transaction 2 wrote it, transaction 2   {#3256}
[03:00:35] TEACHER: waits for the lock, the transaction 1 waits for the   {#3257}
[03:00:37] TEACHER: lock to release. Transaction 2   {#3258}
[03:00:39] TEACHER: now release the lock. Transaction   {#3259}
[03:00:41] TEACHER: 1 wrote it at the same location, at the   {#3260}
[03:00:43] TEACHER: same row. Because both having the share   {#3261}
[03:00:45] TEACHER: lock, because transaction 1   {#3262}
[03:00:47] TEACHER: Because that log got elevated to exclusive log   {#3263}
[03:00:52] TEACHER: did not mean the transaction once log got allocated to someone else.   {#3264}
[03:00:57] TEACHER: It re-evaluated statement did not happen.   {#3265}
[03:00:59] TEACHER: It had a shared log on it.   {#3266}
[03:01:00] TEACHER: When it is trying to write it,   {#3267}
[03:01:03] TEACHER: it waits until an existing exclusive log is released.   {#3268}
[03:01:08] TEACHER: Once it released, it wrote to the same location.   {#3269}
[03:01:11] STUDENT_6: Got it.   {#3270}
[03:01:13] STUDENT_6: Yes.   {#3271}
[03:01:13] STUDENT_6: Got it.   {#3272}
[03:01:14] STUDENT_6: This should be happening.   {#3273}
[03:01:19] TEACHER: You can, there is a tool called Percona, which you can use to visualize this as well.   {#3274}
[03:01:27] TEACHER: So just, so just basically check out Percona.   {#3275}
[03:01:29] TEACHER: It has lock, lock viewer or I forgot the name.   {#3276}
[03:01:32] TEACHER: Use it 2015.   {#3277}
[03:01:33] TEACHER: I don't recall, but Percona is a great utility that you can leverage.   {#3278}
[03:01:37] TEACHER: It's a plugin that you can use with PySQL to manage it better.   {#3279}
[03:01:40] TEACHER: It gives you transparency on the locking state of databases and whatnot.   {#3280}
[03:01:44] TEACHER: so start with that but you will stumble upon this thing but   {#3281}
[03:01:48] TEACHER: this is most probably this is what is happening behind the scene   {#3282}
[03:01:54] TEACHER: it's so fun to understand transactions and how it is structuring yeah this is what is happening   {#3283}
[03:01:59] STUDENT_6: yeah and i also mentioned it to you on the chat it's a discord credit so that once i restarted   {#3284}
[03:02:07] STUDENT_6: my system.   {#3285}
[03:02:08] STUDENT_6: Yeah,   {#3286}
[03:02:09] TEACHER: it's right.   {#3287}
[03:02:10] TEACHER: But I'm not sure   {#3288}
[03:02:11] TEACHER: what happened,   {#3289}
[03:02:12] TEACHER: but it could be   {#3290}
[03:02:14] TEACHER: a bug as well.   {#3291}
[03:02:15] TEACHER: Very well possible.   {#3292}
[03:02:17] STUDENT_6: And it's hard   {#3293}
[03:02:18] TEACHER: to find out   {#3294}
[03:02:19] TEACHER: why.   {#3295}
[03:02:20] TEACHER: Hard to find out.   {#3296}
[03:02:20] TEACHER: It's hard to find out.   {#3297}
[03:02:21] TEACHER: In most cases,   {#3298}
[03:02:22] TEACHER: when you see this   {#3299}
[03:02:22] TEACHER: deadlock file,   {#3300}
[03:02:23] TEACHER: I think that data   {#3301}
[03:02:24] TEACHER: is very hard to figure   {#3302}
[03:02:25] TEACHER: out what's happening   {#3303}
[03:02:25] TEACHER: behind us.   {#3304}
[03:02:26] TEACHER: It typically,   {#3305}
[03:02:27] TEACHER: like,   {#3306}
[03:02:28] TEACHER: basically,   {#3307}
[03:02:29] TEACHER: that's where the gap   {#3308}
[03:02:29] TEACHER: is.   {#3309}
[03:02:29] TEACHER: Like,   {#3310}
[03:02:30] TEACHER: we have a bit   {#3311}
[03:02:31] TEACHER: of practical   {#3312}
[03:02:31] TEACHER: understanding   {#3313}
[03:02:32] TEACHER: when things hit   {#3314}
[03:02:32] TEACHER: production,   {#3315}
[03:02:33] TEACHER: things go berserk   {#3316}
[03:02:34] TEACHER: and we have no idea   {#3317}
[03:02:35] TEACHER: what's happening.   {#3318}
[03:02:36] TEACHER: And also,   {#3319}
[03:02:38] STUDENT_6: happening. It was just   {#3320}
[03:02:39] STUDENT_6: panicking. I mean, it just showed   {#3321}
[03:02:41] STUDENT_6: me an error while what I   {#3322}
[03:02:43] STUDENT_6: expected was to terminate   {#3323}
[03:02:45] TEACHER: the mind. No, it does not terminate.   {#3324}
[03:02:47] TEACHER: The program will not terminate.   {#3325}
[03:02:49] TEACHER: The transaction will.   {#3326}
[03:02:52] TEACHER: Program will not terminate.   {#3327}
[03:02:53] TEACHER: Deadlock does not lead to database   {#3328}
[03:02:55] TEACHER: crash. Deadlock leads to   {#3329}
[03:02:57] TEACHER: termination of transaction.   {#3330}
[03:02:59] TEACHER: That's it.   {#3331}
[03:03:02] TEACHER: And also, we have already   {#3332}
[03:03:03] STUDENT_6: discussed about connection pooling. However, recently   {#3333}
[03:03:05] STUDENT_6: you told that Facebook uses PHP and also, you know, one of your videos, you mentioned that   {#3334}
[03:03:10] STUDENT_6: PHP doesn't afford support connection pooling.   {#3335}
[03:03:13] STUDENT_6: No, no, no.   {#3336}
[03:03:14] TEACHER: I never mentioned P I have no idea about PHP, PHP connection.   {#3337}
---- OWNED SEGMENTS END ----

CTX| [03:03:21] TEACHER: In PHP, I've not worked very deep on PHP.   {#3338}
CTX| [03:03:24] TEACHER: So I'm not sure if it supports or not, but connection pooling is property of database,   {#3339}
CTX| [03:03:30] TEACHER: not of language.   {#3340}
CTX| [03:03:32] TEACHER: Okay.   {#3341}
CTX| [03:03:34] TEACHER: Right.   {#3342}
CTX| [03:03:35] TEACHER: So like the way it's, until you are just setting up multiple TCP connections, you might find   {#3343}
CTX| [03:03:40] TEACHER: a library that does this pool management for you.   {#3344}
CTX| [03:03:43] TEACHER: And then what you're doing is establishing multiple TCP connections with the database   {#3345}
CTX| [03:03:47] TEACHER: and having a queue to manage it.   {#3346}
CTX| [03:03:49] TEACHER: That's it.   {#3347}
CTX| [03:03:50] TEACHER: That's what a correction pool is.   {#3348}
CTX| [03:03:51] TEACHER: You can just spend a day, write your own connection pool.   {#3349}
CTX| [03:03:53] TEACHER: It's that simple.   {#3350}
CTX| [03:03:55] TEACHER: And you just need a blocking queue to implement it.   {#3351}
CTX| [03:03:58] TEACHER: Right.   {#3352}
CTX| [03:03:58] TEACHER: So it should be a relationship between my server and the database.   {#3353}
CTX| [03:04:01] TEACHER: Not yes.   {#3354}
CTX| [03:04:01] TEACHER: Yes.   {#3355}
CTX| [03:04:03] TEACHER: property of language.   {#3356}
CTX| [03:04:04] TEACHER: It's not even property of database, to be honest.   {#3357}
CTX| [03:04:07] TEACHER: It's just property of their application logic   {#3358}
CTX| [03:04:10] TEACHER: or the liability that you are writing.   {#3359}
CTX| [03:04:12] TEACHER: That's what connection puts.   {#3360}
CTX| [03:04:14] TEACHER: So long as the database is willing to keep the connection   {#3361}
CTX| [03:04:16] TEACHER: open, that's the only requirement that you have.   {#3362}
CTX| [03:04:19] TEACHER: That's the only requirement that you have,   {#3363}
CTX| [03:04:20] TEACHER: that your database should not terminate the connection   {#3364}
