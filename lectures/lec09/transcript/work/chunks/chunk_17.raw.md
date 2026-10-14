# chunk_17  OWNS 03:11:53 -> 03:26:37  (segments #3482-#3820, 2469 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:10:53] TEACHER: CPU first of all, right?   {#3462}
CTX| [03:10:55] TEACHER: But then depending on what you are doing in   {#3463}
CTX| [03:10:57] TEACHER: Go routine, you might need more RAM.   {#3464}
CTX| [03:11:00] TEACHER: Got it, got it. If it is more processing   {#3465}
CTX| [03:11:01] TEACHER: then I have to increase the RAM also.   {#3466}
CTX| [03:11:03] TEACHER: First CPU, but if you are   {#3467}
CTX| [03:11:05] TEACHER: let's say you are holding a lot   {#3468}
CTX| [03:11:07] TEACHER: of data in RAM, then you need to add   {#3469}
CTX| [03:11:09] TEACHER: more RAM because now you are handling more requests   {#3470}
CTX| [03:11:11] TEACHER: because you are having more CPU, you are handling more requests.   {#3471}
CTX| [03:11:14] TEACHER: So if let's say each Go routine   {#3472}
CTX| [03:11:15] TEACHER: takes up let's say 20 MB of   {#3473}
CTX| [03:11:17] TEACHER: memory for your processing for the things that you are doing now if you are now supporting more   {#3474}
CTX| [03:11:22] TEACHER: go routines you need that extra memory to help because you are handling more go routines they   {#3475}
CTX| [03:11:27] STUDENT_7: also need 20 mb extra right you need that yeah yeah sure thanks for that thank you   {#3476}
CTX| [03:11:37] STUDENT_2: hey so one question around gc or the hashtag db just a ttl thing would work out right like seven   {#3477}
CTX| [03:11:45] STUDENT_2: to eight days.   {#3478}
CTX| [03:11:47] STUDENT_14: I didn't get it.   {#3479}
CTX| [03:11:49] STUDENT_14: What?   {#3480}
CTX| [03:11:49] STUDENT_5: For hashtag service?   {#3481}

---- OWNED SEGMENTS START ----
[03:11:53] STUDENT_2: Like the question is GC   {#3482}
[03:11:55] STUDENT_2: in the hashtag.   {#3483}
[03:11:56] STUDENT_2: GC is what?   {#3484}
[03:11:58] STUDENT_2: Garbage collection.   {#3485}
[03:11:59] STUDENT_2: Sorry.   {#3486}
[03:12:00] TEACHER: Okay.   {#3487}
[03:12:01] TEACHER: Our database garbage collection.   {#3488}
[03:12:02] TEACHER: Okay.   {#3489}
[03:12:03] TEACHER: What are you collecting   {#3490}
[03:12:04] TEACHER: in this?   {#3491}
[03:12:05] STUDENT_2: Like basically,   {#3492}
[03:12:07] STUDENT_2: yeah.   {#3493}
[03:12:07] STUDENT_2: So basically hashtag   {#3494}
[03:12:08] STUDENT_2: would start growing.   {#3495}
[03:12:10] STUDENT_2: Like daily,   {#3496}
[03:12:11] STUDENT_2: we'll have a lot of   {#3497}
[03:12:11] STUDENT_2: ingest of hashtags.   {#3498}
[03:12:13] STUDENT_2: Yeah.   {#3499}
[03:12:14] STUDENT_2: Now,   {#3500}
[03:12:15] STUDENT_2: Eventually, if you ask that maybe somebody is just putting some random garbage stuff,   {#3501}
[03:12:20] STUDENT_2: A, B and C.   {#3502}
[03:12:21] TEACHER: We don't want all of that.   {#3503}
[03:12:22] TEACHER: Oh, okay.   {#3504}
[03:12:23] TEACHER: Okay.   {#3505}
[03:12:24] TEACHER: I got it.   {#3506}
[03:12:25] TEACHER: You typically would not delete that because what would happen is that let's say that hashtag   {#3507}
[03:12:31] TEACHER: deleted the data, it grew in popularity.   {#3508}
[03:12:35] TEACHER: You would lose that old data.   {#3509}
[03:12:37] TEACHER: But in any case, what you're storing is you're just storing very minimal information, like   {#3510}
[03:12:42] TEACHER: 100 post IDs, one total, one integer,   {#3511}
[03:12:45] TEACHER: rather two, one integer, one string,   {#3512}
[03:12:48] TEACHER: and one array of 100 integers.   {#3513}
[03:12:49] TEACHER: It's not that huge.   {#3514}
[03:12:51] TEACHER: And if you just measure it,   {#3515}
[03:12:53] TEACHER: one integer for, sorry, one string for hashtag,   {#3516}
[03:12:56] TEACHER: let's say 16 characters or let's say 32 characters.   {#3517}
[03:13:00] TEACHER: So 32 bytes, one integer, total count,   {#3518}
[03:13:03] TEACHER: four bytes, 32 plus four is 36,   {#3519}
[03:13:06] TEACHER: plus 100 integers of post IDs.   {#3520}
[03:13:10] TEACHER: So 100 into four is 400.   {#3521}
[03:13:12] TEACHER: 400 plus 36 is 436 bytes.   {#3522}
[03:13:15] TEACHER: So 436 bytes for each document.   {#3523}
[03:13:17] TEACHER: Let's round about to 512 bytes.   {#3524}
[03:13:20] TEACHER: So half a KB.   {#3525}
[03:13:21] TEACHER: Half a KB.   {#3526}
[03:13:23] TEACHER: So two posts, two hashtags, you'll have one KB.   {#3527}
[03:13:26] TEACHER: 2000, you'll have one MB.   {#3528}
[03:13:30] STUDENT_2: Even for a billion, you would just get to half a gig.   {#3529}
[03:13:33] STUDENT_2: That should be fine.   {#3530}
[03:13:34] STUDENT_2: I mean, that makes sense.   {#3531}
[03:13:36] STUDENT_2: I was just thinking about somebody can screw you up, right?   {#3532}
[03:13:39] STUDENT_2: Yeah, easily.   {#3533}
[03:13:40] STUDENT_2: Easily.   {#3534}
[03:13:42] STUDENT_5: But then you show that number to investors and ask for more money.   {#3535}
[03:13:46] STUDENT_2: No, yeah, that's okay.   {#3536}
[03:13:48] STUDENT_2: Thanks.   {#3537}
[03:13:49] STUDENT_2: Right.   {#3538}
[03:13:49] TEACHER: But as engineers, just to, just to conclude on that as engineers, do the   {#3539}
[03:13:53] TEACHER: calculation because it makes sense.   {#3540}
[03:13:56] TEACHER: How, how, uh, insignificant we think thousand to million and million to   {#3541}
[03:14:02] TEACHER: billion jump is.   {#3542}
[03:14:04] TEACHER: It's very significant.   {#3543}
[03:14:06] TEACHER: We treat it like it's nothing.   {#3544}
[03:14:08] TEACHER: We just say million and billion like this.   {#3545}
[03:14:12] STUDENT_2: significant job very significant right yeah and i mean one of another problem to this another   {#3546}
[03:14:20] STUDENT_2: dimension to this problem is the more hashtags you have the more you're also doing those micro   {#3547}
[03:14:24] STUDENT_2: register database so it's not that it's just but then those but then those hashtags will not be as   {#3548}
[03:14:30] TEACHER: popular so yeah that's okay yeah that's okay right yeah another thing got it got it yeah   {#3549}
[03:14:39] STUDENT_2: it's all a trade-off out there.   {#3550}
[03:14:42] STUDENT_2: Another   {#3551}
[03:14:43] STUDENT_2: thing that I was trying to add was let us suppose   {#3552}
[03:14:45] STUDENT_2: we extend 100 images   {#3553}
[03:14:47] STUDENT_2: to say we want to give like 1 million   {#3554}
[03:14:49] STUDENT_2: now.   {#3555}
[03:14:50] STUDENT_2: Okay.   {#3556}
[03:14:52] STUDENT_2: The top popular images, right?   {#3557}
[03:14:54] STUDENT_2: You said how many?   {#3558}
[03:14:57] TEACHER: 1 million?   {#3559}
[03:14:58] STUDENT_2: 1 million.   {#3560}
[03:14:59] STUDENT_2: I was just trying when you were talking   {#3561}
[03:15:01] STUDENT_2: I was just trying on Instagram. What does it do?   {#3562}
[03:15:04] STUDENT_2: You just   {#3563}
[03:15:06] STUDENT_2: scaled your requirements by   {#3564}
[03:15:08] TEACHER: thousand X.   {#3565}
[03:15:10] STUDENT_2: FYI.   {#3566}
[03:15:10] STUDENT_2: I know.   {#3567}
[03:15:11] STUDENT_2: I know.   {#3568}
[03:15:11] STUDENT_2: I know.   {#3569}
[03:15:12] STUDENT_2: I mean,   {#3570}
[03:15:12] STUDENT_2: I would have said 10K,   {#3571}
[03:15:14] STUDENT_2: but I know the problem statement wouldn't have made much of a difference.   {#3572}
[03:15:17] STUDENT_2: Correct.   {#3573}
[03:15:18] STUDENT_2: Let's do it.   {#3574}
[03:15:18] STUDENT_2: As engineers,   {#3575}
[03:15:19] STUDENT_2: we would have just tuned down there,   {#3576}
[03:15:20] STUDENT_2: right?   {#3577}
[03:15:21] STUDENT_2: Yeah.   {#3578}
[03:15:22] STUDENT_7: Okay.   {#3579}
[03:15:23] STUDENT_7: Now,   {#3580}
[03:15:25] STUDENT_2: what I wanted to understand was,   {#3581}
[03:15:27] STUDENT_2: I like the thing that I can think of is the flow will be basically,   {#3582}
[03:15:32] STUDENT_2: you will get newer and newer popular images based on hashtag.   {#3583}
[03:15:38] STUDENT_2: a paginated database you may just put like a link list on the background of the same store does not   {#3584}
[03:15:45] STUDENT_2: matter to us and only when a server someone is actually going to scroll which most probably   {#3585}
[03:15:50] STUDENT_2: is never going to go even beyond some case we are all good there but it's fine like it will be there   {#3586}
[03:15:57] STUDENT_2: so this is the thing that i was thinking of i just i just wanted to confirm but just one thing to   {#3587}
[03:16:03] TEACHER: highlight in that case you   {#3588}
[03:16:05] TEACHER: would not be storing   {#3589}
[03:16:07] TEACHER: 1 million over   {#3590}
[03:16:10] TEACHER: here.   {#3591}
[03:16:12] STUDENT_2: That's right. Yes. I was going to come   {#3592}
[03:16:13] STUDENT_2: to that. Yes.   {#3593}
[03:16:14] TEACHER: Then you should not be doing it because you know that   {#3594}
[03:16:17] TEACHER: all 1 million will never be scrolled.   {#3595}
[03:16:20] TEACHER: So it makes no sense for you to store   {#3596}
[03:16:21] TEACHER: it within the document.   {#3597}
[03:16:23] TEACHER: Just the first page.   {#3598}
[03:16:25] STUDENT_2: Just the first page I will keep here   {#3599}
[03:16:27] STUDENT_2: which is the latest most probably and the   {#3600}
[03:16:29] STUDENT_2: later ones I will just put in there.   {#3601}
[03:16:31] STUDENT_2: Correct.   {#3602}
[03:16:33] STUDENT_2: And one more question I had was a nice question on the Kafka thing.   {#3603}
[03:16:37] STUDENT_2: Just for counting, I understand the use case and all of that here,   {#3604}
[03:16:41] STUDENT_2: but just for counting, do we really use a persistent Kafka?   {#3605}
[03:16:46] STUDENT_10: I mean, I was thinking, I was thinking like,   {#3606}
[03:16:50] STUDENT_2: I don't know open source solution or I mean,   {#3607}
[03:16:52] STUDENT_2: I have not implemented per se Kafka.   {#3608}
[03:16:55] STUDENT_2: So don't catch me on that.   {#3609}
[03:16:58] STUDENT_5: You are not doing it for persistent just to count   {#3610}
[03:17:03] STUDENT_5: valuable information.   {#3611}
[03:17:04] STUDENT_5: It can be picked   {#3612}
[03:17:05] STUDENT_5: by other services   {#3613}
[03:17:06] STUDENT_2: and some other services.   {#3614}
[03:17:08] STUDENT_2: I mean,   {#3615}
[03:17:08] STUDENT_2: I wanted to say   {#3616}
[03:17:10] STUDENT_2: that if it just count,   {#3617}
[03:17:12] STUDENT_2: I would have just   {#3618}
[03:17:12] STUDENT_2: preferred an in-memory   {#3619}
[03:17:14] STUDENT_2: thing.   {#3620}
[03:17:14] STUDENT_2: Like just same thing.   {#3621}
[03:17:15] STUDENT_2: We want an asynchronous   {#3622}
[03:17:16] STUDENT_2: process.   {#3623}
[03:17:16] STUDENT_2: Yes,   {#3624}
[03:17:17] STUDENT_2: everything works well,   {#3625}
[03:17:18] STUDENT_2: but even we can have   {#3626}
[03:17:19] STUDENT_2: in-memory queues,   {#3627}
[03:17:20] STUDENT_2: right,   {#3628}
[03:17:20] STUDENT_2: which are just distributed.   {#3629}
[03:17:22] STUDENT_2: We just count   {#3630}
[03:17:22] STUDENT_2: and it's fine   {#3631}
[03:17:23] STUDENT_2: if you crash   {#3632}
[03:17:23] STUDENT_2: and if you lose   {#3633}
[03:17:24] STUDENT_2: a minute of data.   {#3634}
[03:17:26] TEACHER: Then you are doing   {#3635}
[03:17:27] TEACHER: exactly this.   {#3636}
[03:17:28] STUDENT_2: Yes,   {#3637}
[03:17:29] STUDENT_2: I am doing the same queue   {#3638}
[03:17:29] TEACHER: versus multiple queue.   {#3639}
[03:17:31] TEACHER: If you are using   {#3640}
[03:17:31] TEACHER: RabbitMQ,   {#3641}
[03:17:31] TEACHER: that's also fine.   {#3642}
[03:17:33] TEACHER: Kafka also it's fine and then what you are   {#3643}
[03:17:35] TEACHER: doing is you are using   {#3644}
[03:17:37] TEACHER: a partitioned message broker   {#3645}
[03:17:39] TEACHER: right   {#3646}
[03:17:43] TEACHER: thanks for that   {#3647}
[03:17:45] TEACHER: any other question anyone I saw one more   {#3648}
[03:17:47] TEACHER: hand was raised I forgot   {#3649}
[03:17:49] TEACHER: it was   {#3650}
[03:17:50] STUDENT_2: I mean the old time I was thinking   {#3651}
[03:17:53] STUDENT_2: whether to I mean I was not able to   {#3652}
[03:17:55] STUDENT_2: jump to a use case but Kafka says it   {#3653}
[03:17:57] STUDENT_2: has a   {#3654}
[03:17:59] STUDENT_2: storage I mean it stores   {#3655}
[03:18:01] STUDENT_2: unlimited time and then at least you have a policy over there.   {#3656}
[03:18:04] STUDENT_2: I was just thinking that S3 also holds data database also holds data.   {#3657}
[03:18:08] STUDENT_2: Why can't we use Kafka for holding data?   {#3658}
[03:18:10] STUDENT_2: Because it actually holds data.   {#3659}
[03:18:12] STUDENT_2: And even if a disk is more than we are saving the IO,   {#3660}
[03:18:15] STUDENT_2: the primary database,   {#3661}
[03:18:18] STUDENT_2: just to storage data,   {#3662}
[03:18:20] STUDENT_2: some use case where to just store data.   {#3663}
[03:18:22] STUDENT_2: And if I don't want to go to database,   {#3664}
[03:18:23] TEACHER: access pattern,   {#3665}
[03:18:24] TEACHER: access pattern,   {#3666}
[03:18:25] TEACHER: you need transactional properties.   {#3667}
[03:18:27] STUDENT_2: Kafka does not give you that database has transaction properties.   {#3668}
[03:18:32] STUDENT_7: lookups get a post by id will you be able to do that on kafka no not this use case this this   {#3669}
[03:18:38] STUDENT_2: doesn't make sense but any other use case where you might think not this kafka is a source of   {#3670}
[03:18:45] TEACHER: truth no kafka is always a message broker it can never be your source of truth you can but you   {#3671}
[03:18:52] TEACHER: should not for example i'll give you a use case where your first part of ingestion is kafka   {#3672}
[03:18:58] TEACHER: metrics. So imagine   {#3673}
[03:19:00] TEACHER: you building Google Analytics.   {#3674}
[03:19:02] TEACHER: It's a massive analytics that is   {#3675}
[03:19:04] TEACHER: incoming in your system. Or rather,   {#3676}
[03:19:06] TEACHER: let's say YouTube analytics. Watch time.   {#3677}
[03:19:08] TEACHER: People watching videos on YouTube,   {#3678}
[03:19:10] TEACHER: every event that is coming in, it first   {#3679}
[03:19:12] TEACHER: comes to Kafka.   {#3680}
[03:19:14] TEACHER: So request comes to your   {#3681}
[03:19:16] TEACHER: API server. API server pushes it to   {#3682}
[03:19:18] TEACHER: Kafka and then it is aggregated and   {#3683}
[03:19:20] TEACHER: processed and stored in specialized databases.   {#3684}
[03:19:23] TEACHER: This is where your Kafka becomes a   {#3685}
[03:19:24] TEACHER: first point of entry rather than   {#3686}
[03:19:26] TEACHER: a persistent database.   {#3687}
[03:19:29] TEACHER: So that is one use case where because of its high ingestion and high volume ingestion,   {#3688}
[03:19:34] TEACHER: you don't want to directly store it in database because there is no one good way.   {#3689}
[03:19:37] TEACHER: You typically accept it in one of your API servers.   {#3690}
[03:19:41] TEACHER: You put it into Kafka and then start processing it post that.   {#3691}
[03:19:44] TEACHER: That is one use case where you first land into Kafka and then you put it into database.   {#3692}
[03:19:49] TEACHER: That's a good one.   {#3693}
[03:19:50] STUDENT_2: Ingestion high ingestion rate was the use case.   {#3694}
[03:19:56] TEACHER: High ingestion high volume.   {#3695}
[03:19:58] TEACHER: Okay, because then you don't know what the structure of your data, like how you want to store your data at first, you are determining it afterwards where your analytics.   {#3696}
[03:20:08] TEACHER: Well, I think is that the way you're structuring it because you just have to ingest and do a sequence processing on that.   {#3697}
[03:20:15] TEACHER: So high volume, high ingestion, you first put it to Kafka and then asynchronously process it because the database might cry when you are like directly putting it there.   {#3698}
[03:20:31] TEACHER: Yes, that's where you put into Kafka first and then into database.   {#3699}
[03:20:36] TEACHER: And I'm so happy you both asked these questions, right?   {#3700}
[03:20:38] TEACHER: I never get to think on these systems this way.   {#3701}
[03:20:41] TEACHER: Because this is such a great example on what's that one use case where you put it to like   {#3702}
[03:20:48] TEACHER: where your Kafka is the first point of entry.   {#3703}
[03:20:50] TEACHER: What's that one practical use case?   {#3704}
[03:20:52] TEACHER: Because everywhere you see the other way around.   {#3705}
[03:20:54] TEACHER: And I'm storing it in database and then I push an event onto Kafka.   {#3706}
[03:20:58] TEACHER: case where you do that everyone does it like google analytics i've built bunch of analytics   {#3707}
[03:21:02] TEACHER: system everywhere we ingested in kinases not kafta and then from there we consumed it if   {#3708}
[03:21:09] TEACHER: pehle let's accept the rights that are there from the user and then we figure out what we have to   {#3709}
[03:21:13] STUDENT_7: do with that great i'm excited for that question okay any other question anymore   {#3710}
[03:21:26] TEACHER: So, uh, you have mentioned that we can use a dead letter queue here in this case of where   {#3711}
[03:21:32] TEACHER: we are, you know, posting to Kafka.   {#3712}
[03:21:35] TEACHER: I have never personally used any dead letter queue in case of Kafka.   {#3713}
[03:21:38] TEACHER: So is it a customized one or does Kafka also has its own dead letter queue?   {#3714}
[03:21:44] TEACHER: Kafka does not give you that.   {#3715}
[03:21:45] TEACHER: Kafka does not give you that.   {#3716}
[03:21:46] TEACHER: you have let's say RabbitMQ or an SQS   {#3717}
[03:21:48] TEACHER: as your data queue for that.   {#3718}
[03:21:50] TEACHER: Yes, they do have.   {#3719}
[03:21:53] TEACHER: So in case this connection   {#3720}
[03:21:54] TEACHER: this write fails, you write to this other queue.   {#3721}
[03:21:57] TEACHER: Assuming that queue is up and running.   {#3722}
[03:21:58] TEACHER: Let's say SQS fits really well   {#3723}
[03:22:00] TEACHER: in that case.   {#3724}
[03:22:03] TEACHER: We rather can put it in   {#3725}
[03:22:04] TEACHER: our database also if we are not using   {#3726}
[03:22:06] TEACHER: transition outbox pattern.   {#3727}
[03:22:09] TEACHER: Sorry? Either way.   {#3728}
[03:22:10] TEACHER: Basically transaction outbox pattern is what you are talking about.   {#3729}
[03:22:13] TEACHER: Okay, yes.   {#3730}
[03:22:14] TEACHER: You write it to the database,   {#3731}
[03:22:16] TEACHER: put it into dead letter you added this is where you wanted to write but it did not work so you   {#3732}
[03:22:21] TEACHER: put it somewhere else so that you then later process it got it yeah thanks rajay was this   {#3733}
[03:22:30] STUDENT_2: from the previous one or the new one no no this is a new one uh for batching i had read about   {#3734}
[03:22:35] TEACHER: map reduce do we cover map reduce in this code course it's very data engineering specific if i   {#3735}
[03:22:41] TEACHER: start talking about it, it would become, but I would still sprinkle upon the core idea   {#3736}
[03:22:46] TEACHER: because what you would typically think about MapReduce as a very specific, like spark jobs   {#3737}
[03:22:51] TEACHER: or, or, or your Hadoop MapReduce jobs, but instead think of it as distributed computing.   {#3738}
[03:22:57] TEACHER: What we just did with this counting servers, you can replace this counting servers with   {#3739}
[03:23:00] TEACHER: spark jobs.   {#3740}
[03:23:02] TEACHER: It would work just fine.   {#3741}
[03:23:04] TEACHER: Right.   {#3742}
[03:23:05] TEACHER: I'm calling this as counting servers where we are reading messages from here and then   {#3743}
[03:23:12] TEACHER: This can be normal stateless VMs that are reading from here, normal consumers.   {#3744}
[03:23:16] TEACHER: You can also replace this with a spark cluster.   {#3745}
[03:23:19] TEACHER: It would work just fine because spark has Kafka connectors, which reads in spark.   {#3746}
[03:23:24] TEACHER: You get to count plus plus and write it to the database batch and write it for you.   {#3747}
[03:23:27] TEACHER: So however you implement this is up to you.   {#3748}
[03:23:30] TEACHER: Normal VMs, spark map, it is and whatnot.   {#3749}
[03:23:32] TEACHER: It's the specifics of this.   {#3750}
[03:23:35] STUDENT_15: Okay.   {#3751}
[03:23:37] TEACHER: But the idea is very simple.   {#3752}
[03:23:39] TEACHER: You distribute. Basically, all it does is power distributed computing.   {#3753}
[03:23:43] TEACHER: One machine is not enough to compute everything.   {#3754}
[03:23:46] TEACHER: You want to do it in a distributed way.   {#3755}
[03:23:50] TEACHER: Kafka, Kyrus, Flume, Flink, whatnot.   {#3756}
[03:23:53] TEACHER: Pick one. That fits your risk.   {#3757}
[03:23:55] TEACHER: And given that there is a massive ecosystem around it.   {#3758}
[03:23:59] TEACHER: If I touch one, others will feel bad.   {#3759}
[03:24:02] TEACHER: You've covered Spark and not Flume and Flink and whatnot.   {#3760}
[03:24:06] TEACHER: So instead of going into specifics of it,   {#3761}
[03:24:09] TEACHER: I like to put a very generic name,   {#3762}
[03:24:11] TEACHER: which is where I use counting servers over here.   {#3763}
[03:24:14] TEACHER: Maybe you can do it with Kafka and native VM.   {#3764}
[03:24:20] TEACHER: Thanks for that.   {#3765}
[03:24:21] TEACHER: DK?   {#3766}
[03:24:22] TEACHER: Just a small question, Arpit.   {#3767}
[03:24:25] TEACHER: So I never got a chance to work on data engineering problems.   {#3768}
[03:24:27] TEACHER: So can you suggest any resource   {#3769}
[03:24:29] TEACHER: where I can get a complete picture of things,   {#3770}
[03:24:32] TEACHER: what we can do with it?   {#3771}
[03:24:33] TEACHER: And then, you know, I can start with Spark.   {#3772}
[03:24:35] TEACHER: Start with Spark.   {#3773}
[03:24:36] TEACHER: Start with a book for effective Spark.   {#3774}
[03:24:39] TEACHER: The O'Reilly book.   {#3775}
[03:24:41] TEACHER: O'Reilly book on Spark is a great way to start things out.   {#3776}
[03:24:45] TEACHER: Right?   {#3777}
[03:24:46] TEACHER: And that's how you use Spark.   {#3778}
[03:24:50] TEACHER: Once you are comfortable using Spark,   {#3779}
[03:24:52] TEACHER: then you can go into internals of it.   {#3780}
[03:24:53] TEACHER: But brilliant.   {#3781}
[03:24:56] TEACHER: Spark is mind-blowingly awesome.   {#3782}
[03:24:57] TEACHER: It has its own flaws,   {#3783}
[03:24:58] TEACHER: but it's really good at a bunch of places.   {#3784}
[03:25:01] TEACHER: So you should definitely know at least Spark.   {#3785}
[03:25:06] TEACHER: it's easy to learn   {#3786}
[03:25:08] TEACHER: flume fling map   {#3787}
[03:25:10] TEACHER: reduce like the disk space   {#3788}
[03:25:12] TEACHER: map reduce like basically map reduce is a   {#3789}
[03:25:14] TEACHER: computing paradigm but you can learn   {#3790}
[03:25:16] TEACHER: hadoop map reduce very easily so start   {#3791}
[03:25:18] TEACHER: with spark and then you can venture into   {#3792}
[03:25:20] TEACHER: other parts of things so effective   {#3793}
[03:25:22] TEACHER: spark is mostly the name of the book   {#3794}
[03:25:24] TEACHER: by O'Reilly so the O'Reilly book on   {#3795}
[03:25:26] TEACHER: spark is the one that you can start   {#3796}
[03:25:29] TEACHER: okay thanks   {#3797}
[03:25:31] TEACHER: great and more   {#3798}
[03:25:32] TEACHER: importantly implement without implementation it's   {#3799}
[03:25:34] TEACHER: all theoretical knowledge you will not   {#3800}
[03:25:36] TEACHER: because when you implement, you see that problem coming.   {#3801}
[03:25:39] TEACHER: Do that.   {#3802}
[03:25:43] TEACHER: I took up a responsibility   {#3803}
[03:25:45] TEACHER: when I had no idea about big data,   {#3804}
[03:25:46] TEACHER: but I still became a leader of big data.   {#3805}
[03:25:48] TEACHER: That's how I had to learn all of those parts.   {#3806}
[03:25:51] TEACHER: And now I'm working on optimizing Spark.   {#3807}
[03:25:53] TEACHER: So it came a long way.   {#3808}
[03:25:56] TEACHER: Great. Thanks.   {#3809}
[03:25:58] TEACHER: Thanks, folks, for tuning in.   {#3810}
[03:26:00] TEACHER: See you folks tomorrow.   {#3811}
[03:26:01] TEACHER: Tomorrow, again, very deep discussions   {#3812}
[03:26:03] TEACHER: around social networks.   {#3813}
[03:26:04] TEACHER: It will be fun.   {#3814}
[03:26:06] TEACHER: nothing technical like nothing theoretical stuff we'll go into seeing examples doing things   {#3815}
[03:26:12] TEACHER: answering why is why tomorrow very interesting thing we'll look at another high level pattern   {#3816}
[03:26:17] TEACHER: very counterintuitive but essential for the system to survive very interesting problem and that would   {#3817}
[03:26:24] TEACHER: be the last problem that we'll cover too right thanks thanks thanks folks for tuning in see you   {#3818}
[03:26:29] TEACHER: tomorrow bye   {#3819}
[03:26:36] TEACHER: Thank you.   {#3820}
