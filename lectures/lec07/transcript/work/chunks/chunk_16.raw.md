# chunk_16  OWNS 03:03:21 -> 03:11:10  (segments #3338-#3502, 1275 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:02:22] TEACHER: when you see this   {#3299}
CTX| [03:02:22] TEACHER: deadlock file,   {#3300}
CTX| [03:02:23] TEACHER: I think that data   {#3301}
CTX| [03:02:24] TEACHER: is very hard to figure   {#3302}
CTX| [03:02:25] TEACHER: out what's happening   {#3303}
CTX| [03:02:25] TEACHER: behind us.   {#3304}
CTX| [03:02:26] TEACHER: It typically,   {#3305}
CTX| [03:02:27] TEACHER: like,   {#3306}
CTX| [03:02:28] TEACHER: basically,   {#3307}
CTX| [03:02:29] TEACHER: that's where the gap   {#3308}
CTX| [03:02:29] TEACHER: is.   {#3309}
CTX| [03:02:29] TEACHER: Like,   {#3310}
CTX| [03:02:30] TEACHER: we have a bit   {#3311}
CTX| [03:02:31] TEACHER: of practical   {#3312}
CTX| [03:02:31] TEACHER: understanding   {#3313}
CTX| [03:02:32] TEACHER: when things hit   {#3314}
CTX| [03:02:32] TEACHER: production,   {#3315}
CTX| [03:02:33] TEACHER: things go berserk   {#3316}
CTX| [03:02:34] TEACHER: and we have no idea   {#3317}
CTX| [03:02:35] TEACHER: what's happening.   {#3318}
CTX| [03:02:36] TEACHER: And also,   {#3319}
CTX| [03:02:38] STUDENT_6: happening. It was just   {#3320}
CTX| [03:02:39] STUDENT_6: panicking. I mean, it just showed   {#3321}
CTX| [03:02:41] STUDENT_6: me an error while what I   {#3322}
CTX| [03:02:43] STUDENT_6: expected was to terminate   {#3323}
CTX| [03:02:45] TEACHER: the mind. No, it does not terminate.   {#3324}
CTX| [03:02:47] TEACHER: The program will not terminate.   {#3325}
CTX| [03:02:49] TEACHER: The transaction will.   {#3326}
CTX| [03:02:52] TEACHER: Program will not terminate.   {#3327}
CTX| [03:02:53] TEACHER: Deadlock does not lead to database   {#3328}
CTX| [03:02:55] TEACHER: crash. Deadlock leads to   {#3329}
CTX| [03:02:57] TEACHER: termination of transaction.   {#3330}
CTX| [03:02:59] TEACHER: That's it.   {#3331}
CTX| [03:03:02] TEACHER: And also, we have already   {#3332}
CTX| [03:03:03] STUDENT_6: discussed about connection pooling. However, recently   {#3333}
CTX| [03:03:05] STUDENT_6: you told that Facebook uses PHP and also, you know, one of your videos, you mentioned that   {#3334}
CTX| [03:03:10] STUDENT_6: PHP doesn't afford support connection pooling.   {#3335}
CTX| [03:03:13] STUDENT_6: No, no, no.   {#3336}
CTX| [03:03:14] TEACHER: I never mentioned P I have no idea about PHP, PHP connection.   {#3337}

---- OWNED SEGMENTS START ----
[03:03:21] TEACHER: In PHP, I've not worked very deep on PHP.   {#3338}
[03:03:24] TEACHER: So I'm not sure if it supports or not, but connection pooling is property of database,   {#3339}
[03:03:30] TEACHER: not of language.   {#3340}
[03:03:32] TEACHER: Okay.   {#3341}
[03:03:34] TEACHER: Right.   {#3342}
[03:03:35] TEACHER: So like the way it's, until you are just setting up multiple TCP connections, you might find   {#3343}
[03:03:40] TEACHER: a library that does this pool management for you.   {#3344}
[03:03:43] TEACHER: And then what you're doing is establishing multiple TCP connections with the database   {#3345}
[03:03:47] TEACHER: and having a queue to manage it.   {#3346}
[03:03:49] TEACHER: That's it.   {#3347}
[03:03:50] TEACHER: That's what a correction pool is.   {#3348}
[03:03:51] TEACHER: You can just spend a day, write your own connection pool.   {#3349}
[03:03:53] TEACHER: It's that simple.   {#3350}
[03:03:55] TEACHER: And you just need a blocking queue to implement it.   {#3351}
[03:03:58] TEACHER: Right.   {#3352}
[03:03:58] TEACHER: So it should be a relationship between my server and the database.   {#3353}
[03:04:01] TEACHER: Not yes.   {#3354}
[03:04:01] TEACHER: Yes.   {#3355}
[03:04:03] TEACHER: property of language.   {#3356}
[03:04:04] TEACHER: It's not even property of database, to be honest.   {#3357}
[03:04:07] TEACHER: It's just property of their application logic   {#3358}
[03:04:10] TEACHER: or the liability that you are writing.   {#3359}
[03:04:12] TEACHER: That's what connection puts.   {#3360}
[03:04:14] TEACHER: So long as the database is willing to keep the connection   {#3361}
[03:04:16] TEACHER: open, that's the only requirement that you have.   {#3362}
[03:04:19] TEACHER: That's the only requirement that you have,   {#3363}
[03:04:20] TEACHER: that your database should not terminate the connection   {#3364}
[03:04:23] TEACHER: unless you ask it to terminate.   {#3365}
[03:04:24] TEACHER: That's it.   {#3366}
[03:04:25] TEACHER: If your database adios to that, you can build your own connection.   {#3367}
[03:04:30] TEACHER: Thanks.   {#3368}
[03:04:32] TEACHER: Shreya?   {#3369}
[03:04:33] STUDENT_7: Yeah, I just wanted to ask that if CDC can push to multiple things like elastic search, redshift, like one CDC can do that, right? We don't need.   {#3370}
[03:04:45] TEACHER: It does that I drew it separately so that it's very visual.   {#3371}
[03:04:50] TEACHER: Otherwise, it would look like star and like some magic is happening, but it's just very visual so that you understand because the data source of one might not be so.   {#3372}
[03:04:58] TEACHER: But if you'd want to just fan out to multiple things, you can do that.   {#3373}
[03:05:03] TEACHER: high memory utilization   {#3374}
[03:05:06] TEACHER: because depending on the database   {#3375}
[03:05:07] TEACHER: it needs to do multiple transformations   {#3376}
[03:05:09] TEACHER: because let's say you're doing an elastics that you'll pass JSON   {#3377}
[03:05:11] TEACHER: if I'm storing it in MySQL you would convert it   {#3378}
[03:05:13] TEACHER: in a separate format. If I'm storing it in third database   {#3379}
[03:05:15] TEACHER: or third kind of sync it would do   {#3380}
[03:05:17] TEACHER: something different. So CDCs   {#3381}
[03:05:19] TEACHER: would need to scale up of it.   {#3382}
[03:05:21] TEACHER: That's it. It would have high memory   {#3383}
[03:05:23] TEACHER: utilization.   {#3384}
[03:05:25] STUDENT_11: Okay. Thank you.   {#3385}
[03:05:27] STUDENT_9: Okay. Any other question anyone?   {#3386}
[03:05:34] TEACHER: okay fine thanks folks for doing and I'll upload the recordings by three see you folks tomorrow   {#3387}
[03:05:39] TEACHER: very fun discussion will build two databases tomorrow on our own our two storage agents on   {#3388}
[03:05:44] TEACHER: our own very interesting on digital building blocks we'll talk about right thanks so much   {#3389}
[03:05:49] TEACHER: but you can see you folks tomorrow morning. Bye-bye.   {#3390}
[03:05:57] TEACHER: Just a suggestion   {#3391}
[03:06:01] STUDENT_2: that if you could   {#3392}
[03:06:02] STUDENT_2: along with recordings, if you could upload the   {#3393}
[03:06:05] STUDENT_2: chats also because   {#3394}
[03:06:06] TEACHER: there are a lot of... I tried that.   {#3395}
[03:06:09] TEACHER: I saw that Zoom folder that gets   {#3396}
[03:06:13] TEACHER: exported. There are no chats in it. So I'm   {#3397}
[03:06:14] TEACHER: still checking if I can do it. But   {#3398}
[03:06:17] TEACHER: where do I upload chats? That is another problem.   {#3399}
[03:06:19] TEACHER: Because if I do it on Google drive, how do I share it?   {#3400}
[03:06:22] TEACHER: There are quite a few challenges there, but I'll copy the chats right now.   {#3401}
[03:06:25] TEACHER: You can do it.   {#3402}
[03:06:26] TEACHER: I'll keep the link open.   {#3403}
[03:06:29] TEACHER: There is that should be a button to download the chat directly.   {#3404}
[03:06:34] TEACHER: Okay.   {#3405}
[03:06:37] TEACHER: Save chat option is there when you click on save chat, but the three dots hit on save   {#3406}
[03:06:42] TEACHER: chat and you can download it, but I'll still check.   {#3407}
[03:06:45] TEACHER: I'll still check.   {#3408}
[03:06:45] TEACHER: I'm not discarding that option but I still need to figure out a way to share it and all   {#3409}
[03:06:51] TEACHER: all right okay thanks thanks   {#3410}
[03:07:14] TEACHER: so you can lock it till June   {#3411}
[03:07:16] STUDENT_11: thank you   {#3412}
[03:07:19] TEACHER: Raji   {#3413}
[03:07:19] STUDENT_3: I saw your   {#3414}
[03:07:22] STUDENT_3: some kind of LinkedIn   {#3415}
[03:07:24] STUDENT_3: message that you have   {#3416}
[03:07:26] STUDENT_3: opened up a new course for   {#3417}
[03:07:28] STUDENT_3: new engineers   {#3418}
[03:07:30] STUDENT_3: so wanted to understand   {#3419}
[03:07:31] STUDENT_3: what is the depth I mean we cover few things   {#3420}
[03:07:34] TEACHER: that is busy beginners   {#3421}
[03:07:35] TEACHER: this is after that   {#3422}
[03:07:39] TEACHER: this is an intermediate level course   {#3423}
[03:07:41] TEACHER: that is for absolute beginners   {#3424}
[03:07:43] TEACHER: like having zero knowledge of system design   {#3425}
[03:07:46] STUDENT_3: go in depth of Kafka's and message queues.   {#3426}
[03:07:48] TEACHER: Why would I go there?   {#3427}
[03:07:50] TEACHER: It's more about using it.   {#3428}
[03:07:51] TEACHER: Here we talk about depth.   {#3429}
[03:07:53] TEACHER: There it's all about, like, there I'll still cover depth, but someone, like, something   {#3430}
[03:07:57] TEACHER: that an early engineer can comprehend.   {#3431}
[03:08:00] TEACHER: Here we are all experienced folks, right?   {#3432}
[03:08:02] TEACHER: I can assume you know, bit of system design, then we take it from there, right?   {#3433}
[03:08:08] TEACHER: While the beginner is for absolute beginners and product managers, having no knowledge,   {#3434}
[03:08:12] TEACHER: will literally start from what is database,   {#3435}
[03:08:14] TEACHER: client server model,   {#3436}
[03:08:16] TEACHER: microservice architecture, event driven.   {#3437}
[03:08:18] TEACHER: Here I can spit out stuff   {#3438}
[03:08:20] TEACHER: immediately. Then I would take it very   {#3439}
[03:08:22] TEACHER: slow. Starting from   {#3440}
[03:08:24] TEACHER: absolute scratch to this. And the systems that   {#3441}
[03:08:26] TEACHER: will cover, it will be mostly blocks, blocks,   {#3442}
[03:08:28] TEACHER: blocks. Like for example, today when I talk about   {#3443}
[03:08:29] TEACHER: distributed cache, we spent two hours   {#3444}
[03:08:32] TEACHER: talking about implementation detail.   {#3445}
[03:08:34] TEACHER: Then I would not be covering that.   {#3446}
[03:08:36] TEACHER: Problem statements are mutually   {#3447}
[03:08:38] TEACHER: exclusive. So the problem statements   {#3448}
[03:08:40] TEACHER: I cover there will not be covered over here. But   {#3449}
[03:08:42] TEACHER: If you have done this part, you'd be able to build those systems with ease.   {#3450}
[03:08:45] TEACHER: Yeah.   {#3451}
[03:08:46] STUDENT_3: I saw the contents.   {#3452}
[03:08:47] STUDENT_3: Yeah.   {#3453}
[03:08:48] TEACHER: So that's the difference.   {#3454}
[03:08:50] TEACHER: It was very strong bias for action.   {#3455}
[03:08:53] TEACHER: I just got an idea like, then now I had an outline prepared.   {#3456}
[03:08:57] TEACHER: I had notes prepared for very long time.   {#3457}
[03:08:59] TEACHER: I said, let me put it out once and for all.   {#3458}
[03:09:02] TEACHER: So I did have got very overwhelming response.   {#3459}
[03:09:04] TEACHER: I could not believe the amount of enrollments I got.   {#3460}
[03:09:07] TEACHER: I'm like, God, people wanted it so much.   {#3461}
[03:09:10] TEACHER: So like, um, so from putting on myself, I'll start recording those videos.   {#3462}
[03:09:13] TEACHER: Yeah.   {#3463}
[03:09:13] STUDENT_3: You watch this unique course, basically.   {#3464}
[03:09:14] STUDENT_3: I mean, hard to find such course.   {#3465}
[03:09:17] TEACHER: I just poured in everything I knew throughout my life, whatever I studied all in this course.   {#3466}
[03:09:22] TEACHER: I just think happy people are resonating with it.   {#3467}
[03:09:26] TEACHER: But yeah, uh, in any case there would not be, it's not that, uh, uh, things that I covered   {#3468}
[03:09:31] TEACHER: over here will be covered over there.   {#3469}
[03:09:32] TEACHER: It will be almost mutually exclusive two topics.   {#3470}
[03:09:35] TEACHER: I have to overlap like data, like the types of databases I cover.   {#3471}
[03:09:40] TEACHER: cover it with both because you folks also need to know when not to use a particular database,   {#3472}
[03:09:44] TEACHER: but then I'll cover it in a little more basic manner.   {#3473}
[03:09:48] TEACHER: So it's a tiered offering now.   {#3474}
[03:09:51] TEACHER: That's how it is going to be.   {#3475}
[03:09:55] TEACHER: Thanks.   {#3476}
[03:09:56] TEACHER: Thanks folks for tuning in.   {#3477}
[03:09:57] STUDENT_4: I'll start with one thing regarding the, regarding the, uh, sorry, sorry about that, uh, regarding   {#3478}
[03:10:03] STUDENT_4: the one, two ones with you.   {#3479}
[03:10:04] STUDENT_4: So you just mentioned that it can be booked in the time slot of June, but one month within   {#3480}
[03:10:10] STUDENT_4: this one month only book, right?   {#3481}
[03:10:12] TEACHER: Ha ha max limit.   {#3482}
[03:10:15] TEACHER: Two months after the cohort ends up until then you can leverage on one on one.   {#3483}
[03:10:19] TEACHER: Okay.   {#3484}
[03:10:20] TEACHER: Okay.   {#3485}
[03:10:20] TEACHER: Okay.   {#3486}
[03:10:20] TEACHER: But within this month only.   {#3487}
[03:10:22] TEACHER: Yeah.   {#3488}
[03:10:23] TEACHER: That's not a problem.   {#3489}
[03:10:24] TEACHER: It's a maximum validity for that.   {#3490}
[03:10:26] TEACHER: It's not that up there.   {#3491}
[03:10:27] TEACHER: If let's say you're part of February cohort, you cannot book a time in December.   {#3492}
[03:10:35] TEACHER: I have to handle those folks as well right that's right so like I see find a slot of   {#3493}
[03:10:40] TEACHER: three 111   {#3494}
[03:10:47] STUDENT_4: that's idea right   {#3495}
[03:10:51] STUDENT_4: okay   {#3496}
[03:10:52] STUDENT_4: okay   {#3497}
[03:10:57] STUDENT_4: so   {#3498}
[03:11:02] STUDENT_4: okay   {#3499}
[03:11:02] TEACHER: sure sure sure got it got it   {#3500}
[03:11:06] TEACHER: yeah thank you very much   {#3501}
[03:11:08] TEACHER: thanks for this   {#3502}
