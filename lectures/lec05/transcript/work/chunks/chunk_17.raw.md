# chunk_17  OWNS 03:14:31 -> 03:21:44  (segments #3195-#3324, 1252 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:13:32] TEACHER: Right?   {#3173}
CTX| [03:13:34] TEACHER: So that will cover that.   {#3174}
CTX| [03:13:35] TEACHER: Now on this persistent key value store, relational databases makes it   {#3175}
CTX| [03:13:39] TEACHER: simple to understand for everything else.   {#3176}
CTX| [03:13:42] TEACHER: just replace relational database   {#3177}
CTX| [03:13:43] TEACHER: and write your own storage layer.   {#3178}
CTX| [03:13:46] TEACHER: That's all it differs.   {#3179}
CTX| [03:13:47] TEACHER: We'll discuss that.   {#3180}
CTX| [03:13:49] TEACHER: Something very similar in sixth...   {#3181}
CTX| [03:13:50] TEACHER: I've got so much thing covered, man.   {#3182}
CTX| [03:13:53] TEACHER: So in sixth week,   {#3183}
CTX| [03:13:56] TEACHER: we'll cover two databases that do it.   {#3184}
CTX| [03:13:58] TEACHER: One with LSM tree   {#3185}
CTX| [03:13:59] TEACHER: and one with other implementation.   {#3186}
CTX| [03:14:02] TEACHER: Then we'll see different kind of storage engine   {#3187}
CTX| [03:14:05] TEACHER: for key values.   {#3188}
CTX| [03:14:06] TEACHER: God, I've covered that also.   {#3189}
CTX| [03:14:09] TEACHER: We have much of thing covered.   {#3190}
CTX| [03:14:10] TEACHER: Don't worry.   {#3191}
CTX| [03:14:12] STUDENT_2: small request if we could share the code snippets let's say for the designing of   {#3192}
CTX| [03:14:15] TEACHER: air no write it write it write it why i want you to make mistakes if i share it you just run it   {#3193}
CTX| [03:14:24] TEACHER: done no when you write it right you make mistakes i want you all to make mistakes   {#3194}

---- OWNED SEGMENTS START ----
[03:14:31] STUDENT_2: but we just want i at least personally want my expertise and code to be as far as with you   {#3195}
[03:14:36] TEACHER: No, no, make mistakes.   {#3196}
[03:14:39] TEACHER: See the day when I, the day when I built it the first time, the kind of joy I experienced,   {#3197}
[03:14:44] TEACHER: the kind of, uh, things that I faced like the transactional deadlock.   {#3198}
[03:14:49] TEACHER: What happens in a deadlock?   {#3199}
[03:14:51] TEACHER: I had a bunch of deadlocks in my court when I was writing it.   {#3200}
[03:14:54] TEACHER: Right.   {#3201}
[03:14:54] TEACHER: I, when I knew, then I thought, okay, this also can happen.   {#3202}
[03:14:58] TEACHER: Now, how do I fix it?   {#3203}
[03:14:59] TEACHER: Oh, this also happened now, but I'm not getting enough throughput.   {#3204}
[03:15:01] TEACHER: So now what do I do?   {#3205}
[03:15:02] TEACHER: Those mistakes make you a better engine.   {#3206}
[03:15:06] TEACHER: you know makes a better engineer. It's what you, what mistakes you made,   {#3207}
[03:15:09] TEACHER: what you learned from them makes you better.   {#3208}
[03:15:11] TEACHER: Okay.   {#3209}
[03:15:12] TEACHER: Go through that. Go through that. Right. Go through that.   {#3210}
[03:15:14] STUDENT_13: Thank you so much.   {#3211}
[03:15:16] TEACHER: Best feeling ever. Right. When we discuss load balancer,   {#3212}
[03:15:18] TEACHER: I'll ask you to implement a load balancer.   {#3213}
[03:15:20] TEACHER: We'll go through the source code of that as well.   {#3214}
[03:15:22] TEACHER: Ask you to implement a load balancer also. Right.   {#3215}
[03:15:25] STUDENT_13: Thank you so much.   {#3216}
[03:15:27] STUDENT_13: Prashant.   {#3217}
[03:15:29] STUDENT_10: Yeah. Hi, so we talked about soft deletion.   {#3218}
[03:15:32] STUDENT_10: So since it improves performance by a lot,   {#3219}
[03:15:36] STUDENT_10: so why don't database engine provide this capability out of the box?   {#3220}
[03:15:41] STUDENT_10: Why user have to create this additional column and keep track of...   {#3221}
[03:15:48] TEACHER: Great question.   {#3222}
[03:15:50] TEACHER: Now, I'll give you the answer why.   {#3223}
[03:15:52] TEACHER: Why database does not give you this out of the box?   {#3224}
[03:15:54] TEACHER: Because it seems logical, especially in case of relational databases.   {#3225}
[03:15:58] TEACHER: Now, databases, why they don't give you this out of the box?   {#3226}
[03:16:02] TEACHER: is because database is a very fundamental layer.   {#3227}
[03:16:06] TEACHER: It gives you all the necessary building blocks.   {#3228}
[03:16:08] TEACHER: It does not try to intervene in your space.   {#3229}
[03:16:12] TEACHER: It just wants to keep things simple.   {#3230}
[03:16:14] TEACHER: That's why you see it does not give you fancy stuff.   {#3231}
[03:16:16] TEACHER: It just gives you for update, for share, skip block, no way.   {#3232}
[03:16:21] TEACHER: It's so foundational.   {#3233}
[03:16:23] TEACHER: If it gives you, if it reaches into your space,   {#3234}
[03:16:26] TEACHER: then you don't know where to draw that line.   {#3235}
[03:16:28] TEACHER: Like which one should I implement?   {#3236}
[03:16:29] TEACHER: Which one should I not?   {#3237}
[03:16:30] TEACHER: So it just keeps things simple.   {#3238}
[03:16:32] TEACHER: It just gives you what is foundational for you and not intervene in someone else's.   {#3239}
[03:16:36] TEACHER: Number one, number two, specifically when I talk about soft deletes, then your database   {#3240}
[03:16:41] TEACHER: would need to have a separate process that does batch clean up.   {#3241}
[03:16:44] TEACHER: Now this puts a lot of load into developers cognition on developers head.   {#3242}
[03:16:50] TEACHER: What if my data is not deleted?   {#3243}
[03:16:52] TEACHER: What if I read it?   {#3244}
[03:16:53] TEACHER: Do I need to use this column or not?   {#3245}
[03:16:54] TEACHER: How do I, how do I handle this?   {#3246}
[03:16:56] TEACHER: I'm talking in terms of relational database.   {#3247}
[03:16:58] TEACHER: You might find other databases like Redis and DynamoDB that when you delete, it does   {#3248}
[03:17:03] TEACHER: soft deletion.   {#3249}
[03:17:04] TEACHER: Redis and DynamoDB both deletes, sorry, DynamoDB does soft deletion.   {#3250}
[03:17:09] TEACHER: When you delete a key in DynamoDB, it does not hard delete.   {#3251}
[03:17:11] TEACHER: It always soft deletes.   {#3252}
[03:17:13] TEACHER: And, but it does that.   {#3253}
[03:17:15] TEACHER: So they, for them, because it's a key value store for them, it's foundational, right?   {#3254}
[03:17:20] TEACHER: So they give you that.   {#3255}
[03:17:21] TEACHER: But for relational databases, it is not.   {#3256}
[03:17:23] TEACHER: Relational databases operates on the core foundational layer and they don't try to intervene   {#3257}
[03:17:28] TEACHER: a ton of you'll find uh 2012 or 13 i 12 12 i was in my final year 2012 there was a thread on my   {#3258}
[03:17:40] TEACHER: sequel where someone proposed this very chain there is a my sequel forum or something you'll   {#3259}
[03:17:44] TEACHER: find it there 2012 card thread where uh where you'll find and i suddenly remembered it was   {#3260}
[03:17:49] TEACHER: my final year i was just doing some random stuff and i stumbled upon that soft deletion   {#3261}
[03:17:54] TEACHER: So that's what I got to do.   {#3262}
[03:17:56] TEACHER: Someone proposed it and I kind of recall not the exact same line, but it was in the essence   {#3263}
[03:18:02] TEACHER: that when your database evolves, it is more important to know what you don't want to do   {#3264}
[03:18:09] TEACHER: versus what you want to do, because anything is infinitely buildable.   {#3265}
[03:18:14] TEACHER: You can build as complex features as you want, as simple features as you want, but do you   {#3266}
[03:18:18] TEACHER: really want to do that?   {#3267}
[03:18:19] TEACHER: Are you entering into users space per se?   {#3268}
[03:18:23] TEACHER: Right.   {#3269}
[03:18:24] TEACHER: So that's why they just prevent that from happening and then give you   {#3270}
[03:18:27] TEACHER: a raw construct to build on top of.   {#3271}
[03:18:30] STUDENT_10: Okay.   {#3272}
[03:18:31] STUDENT_10: Yeah.   {#3273}
[03:18:32] TEACHER: 2012, my SQL forum.   {#3274}
[03:18:34] TEACHER: Yeah.   {#3275}
[03:18:34] TEACHER: 2012 should be in 2012, very high chance 20 or maybe 2011.   {#3276}
[03:18:39] TEACHER: Also I was in my final year, so it should be 2011, 2012, around those.   {#3277}
[03:18:44] TEACHER: You'll find that.   {#3278}
[03:18:45] TEACHER: So that's what I found it.   {#3279}
[03:18:46] TEACHER: And which is what struck with me that, Hey, when I'm ever designing a database,   {#3280}
[03:18:50] TEACHER: I'll always keep in mind that, Hey, what I definitely don't want to do where I   {#3281}
[03:18:54] TEACHER: don't want to go into pitch space.   {#3282}
[03:18:58] TEACHER: Thanks.   {#3283}
[03:18:58] TEACHER: Thanks for asking.   {#3284}
[03:19:00] TEACHER: Avishek.   {#3285}
[03:19:11] TEACHER: We are not audible, but.   {#3286}
[03:19:14] TEACHER: Please be to drop me a DM with a question.   {#3287}
[03:19:17] TEACHER: More than happy to answer that.   {#3288}
[03:19:18] TEACHER: So tomorrow, one day, tomorrow we'll discuss, we'll scale WebSockets.   {#3289}
[03:19:23] TEACHER: That's an interesting detour we'll take.   {#3290}
[03:19:25] TEACHER: Oh, tomorrow?   {#3291}
[03:19:26] TEACHER: Yeah, tomorrow we'll build Slack's real-time communication and see how WebSockets are actually scaled.   {#3292}
[03:19:31] TEACHER: So that's the second half for today.   {#3293}
[03:19:34] TEACHER: But first up, we'll look at NoSQL database, non-relational databases.   {#3294}
[03:19:38] TEACHER: Rahul?   {#3295}
[03:19:38] STUDENT_1: so my question is about the previous uh previous week actually previous week implementation for   {#3296}
[03:19:46] STUDENT_1: blogging platform actually okay so the thing actually i got confused for was like   {#3297}
[03:19:56] STUDENT_1: the thing i got confused for was uh like implementation do we need to implement   {#3298}
[03:20:03] STUDENT_1: any front end or anything like that for that thing.   {#3299}
[03:20:06] STUDENT_1: Like I am like, uh, I am like, uh, kind of like unable to see, like, uh, unable to see   {#3300}
[03:20:13] STUDENT_1: that, uh, implementation being made without an, uh, UI as per se.   {#3301}
[03:20:20] STUDENT_1: So yeah.   {#3302}
[03:20:22] STUDENT_8: Implement if you want.   {#3303}
[03:20:25] TEACHER: Like we wanted to cover more on the database caching delegation,   {#3304}
[03:20:30] TEACHER: concurrency side of things, right?   {#3305}
[03:20:33] TEACHER: If you want to implement frontend, you don't.   {#3306}
[03:20:36] TEACHER: What's the happen?   {#3307}
[03:20:37] STUDENT_1: Like I am not able to see like, anyway, like I am not expert in frontend or anything like that.   {#3308}
[03:20:45] TEACHER: Don't implement that.   {#3309}
[03:20:45] TEACHER: You just what you want to understand, just implement that part of it.   {#3310}
[03:20:49] TEACHER: You don't have to implement entire stuff.   {#3311}
[03:20:51] TEACHER: Exposed bunch of APIs do short pulling long pulling.   {#3312}
[03:20:53] TEACHER: That's the key part, right?   {#3313}
[03:20:55] TEACHER: Right.   {#3314}
[03:20:56] TEACHER: Spin up a Kafka.   {#3315}
[03:20:57] TEACHER: Just put some messages and consume them, right?   {#3316}
[03:21:00] TEACHER: or rapid time you push some messages and consume them just focus on those things do things that   {#3317}
[03:21:06] TEACHER: matter sure sure don't go into front-end and no one like no don't waste time in case you do you   {#3318}
[03:21:15] TEACHER: are not a front-end expert don't waste time learning that path do things like look at example   {#3319}
[03:21:20] TEACHER: airline tickets did I build full-fledged front-end back-end no I just did what I wanted to learn   {#3320}
[03:21:25] TEACHER: it up is lock it I just simulated that done right got two things that matter   {#3321}
[03:21:32] TEACHER: okay okay sure sure superb thanks folks for tuning in tomorrow will be   {#3322}
[03:21:37] TEACHER: huge discussion once again we'll go very deep into scaling web software   {#3323}
[03:21:41] TEACHER: thanks folks I'll upload a recording by three bye   {#3324}
