# chunk_15  OWNS 02:47:12 -> 02:59:23  (segments #2974-#3239, 2247 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:46:18] TEACHER: In case of real-time.   {#2956}
CTX| [02:46:21] TEACHER: Got it.   {#2957}
CTX| [02:46:22] STUDENT_3: Got it.   {#2958}
CTX| [02:46:23] STUDENT_3: Thanks.   {#2959}
CTX| [02:46:23] STUDENT_3: Thanks a lot.   {#2960}
CTX| [02:46:24] TEACHER: Yeah.   {#2961}
CTX| [02:46:24] TEACHER: And then we were able to use it because that was our use case.   {#2962}
CTX| [02:46:27] TEACHER: We wanted because the latency had to be minimal.   {#2963}
CTX| [02:46:30] TEACHER: We had to push the messages to the user rather than users pulling it out because   {#2964}
CTX| [02:46:34] TEACHER: server could not pull the messages.   {#2965}
CTX| [02:46:36] TEACHER: We anyway wanted very low latency because it was chat.   {#2966}
CTX| [02:46:39] TEACHER: Right.   {#2967}
CTX| [02:46:43] TEACHER: subject. Great question. Loved it.   {#2968}
CTX| [02:46:46] STUDENT_8: Uh, yeah. Hi. So my question was regarding this, uh, popular,   {#2969}
CTX| [02:46:54] STUDENT_8: a popularity service. So instead of like having a separate   {#2970}
CTX| [02:46:58] STUDENT_8: Kappa, would it be like more sufficient? Like, uh, if the   {#2971}
CTX| [02:47:03] STUDENT_8: popularity, this service directly call like, uh, use webhooks   {#2972}
CTX| [02:47:08] STUDENT_8: and directly call the API servers.   {#2973}

---- OWNED SEGMENTS START ----
[02:47:12] STUDENT_5: Right.   {#2974}
[02:47:13] STUDENT_8: There's API server update that because it would not be that frequent, right?   {#2975}
[02:47:18] STUDENT_8: This popularity.   {#2976}
[02:47:20] TEACHER: That's a good approach.   {#2977}
[02:47:21] TEACHER: Right.   {#2978}
[02:47:22] TEACHER: But again, pros and cons, everything in computer science is a trade-off.   {#2979}
[02:47:26] TEACHER: Now you need to know what you are trading, which things for what.   {#2980}
[02:47:31] TEACHER: So what you're suggesting is what a popularity service directly writes to DB through a hashtag   {#2981}
[02:47:37] TEACHER: API through whatever they're doing.   {#2982}
[02:47:38] TEACHER: Right.   {#2983}
[02:47:39] TEACHER: If they do it, they need to implement the code to make a call to your API.   {#2984}
[02:47:44] TEACHER: Imagine that is data science team.   {#2985}
[02:47:46] TEACHER: Right.   {#2986}
[02:47:47] TEACHER: Why would they do that?   {#2987}
[02:47:48] TEACHER: They say, it's not our job.   {#2988}
[02:47:50] TEACHER: We'll write it to Kafka and done.   {#2989}
[02:47:52] TEACHER: Humans, humans, right?   {#2990}
[02:47:55] TEACHER: No, like, because then they have to manage that system.   {#2991}
[02:47:59] TEACHER: Wow.   {#2992}
[02:47:59] TEACHER: Now you would say, my system was down.   {#2993}
[02:48:01] TEACHER: Let's say you do some reason I'm hashtag API was down summary.   {#2994}
[02:48:05] TEACHER: Right.   {#2995}
[02:48:06] TEACHER: They were that, that those who are folks were making web, who calls to our HTTP server and   {#2996}
[02:48:12] TEACHER: your server was down and you lost that update.   {#2997}
[02:48:15] TEACHER: Now, what would happen?   {#2998}
[02:48:16] TEACHER: You'd say, I don't know, no, please do you process that?   {#2999}
[02:48:18] TEACHER: Not for me.   {#3000}
[02:48:19] TEACHER: We are not doing it.   {#3001}
[02:48:21] TEACHER: Correct.   {#3002}
[02:48:22] TEACHER: Humans.   {#3003}
[02:48:22] TEACHER: Right.   {#3004}
[02:48:23] TEACHER: So you want to decouple as much as you can.   {#3005}
[02:48:27] TEACHER: So which is why if you're going something that does not need to be done in real time   {#3006}
[02:48:32] TEACHER: based in synchronous way should not be done in a synchronous way.   {#3007}
[02:48:34] TEACHER: This does not demand synchronicity.   {#3008}
[02:48:37] TEACHER: It is a very nice use case for asynchronous consumption.   {#3009}
[02:48:40] TEACHER: Correct.   {#3010}
[02:48:42] TEACHER: So then do it a second.   {#3011}
[02:48:44] STUDENT_6: Got it.   {#3012}
[02:48:45] STUDENT_6: Thank you.   {#3013}
[02:48:46] TEACHER: Got it.   {#3014}
[02:48:47] TEACHER: Yeah.   {#3015}
[02:48:50] TEACHER: Hi Arpit.   {#3016}
[02:48:51] TEACHER: So Arpit first, my first question is related to the DB here.   {#3017}
[02:48:56] TEACHER: So as we have selected a non relational database, no SQL database.   {#3018}
[02:49:02] TEACHER: Here we are increasing the counts every time for the particular hashtag.   {#3019}
[02:49:07] TEACHER: So, uh, I think we need to maintain the atomicity also here because, uh,   {#3020}
[02:49:12] TEACHER: probably, you know, it might happen that, uh, that same count might be, you   {#3021}
[02:49:17] TEACHER: know, multiple people trying to update the same count.   {#3022}
[02:49:21] TEACHER: True.   {#3023}
[02:49:21] TEACHER: Yes.   {#3024}
[02:49:21] TEACHER: Yes.   {#3025}
[02:49:22] TEACHER: So, so how do we ensure that here comes thing?   {#3026}
[02:49:25] TEACHER: We have a database has to provide that and not only the databases give you   {#3027}
[02:49:28] TEACHER: atomicity FII.   {#3028}
[02:49:30] TEACHER: Right.   {#3029}
[02:49:31] TEACHER: Right.   {#3030}
[02:49:32] TEACHER: So, so, but we have to make that database.   {#3031}
[02:49:34] TEACHER: Correct.   {#3032}
[02:49:35] TEACHER: So you need to pick a database that gives you atomicity.   {#3033}
[02:49:38] TEACHER: That is one of the key features that you read from a database.   {#3034}
[02:49:40] TEACHER: So you will not pick a database.   {#3035}
[02:49:41] TEACHER: It does not give you atomic guarantees.   {#3036}
[02:49:43] TEACHER: Okay.   {#3037}
[02:49:44] TEACHER: So noisequill database also has to be, you know, give the atomicity feature.   {#3038}
[02:49:47] TEACHER: Then only we should select a database.   {#3039}
[02:49:49] STUDENT_5: MySQL gives you, DynamoDB gives you both of them.   {#3040}
[02:49:53] TEACHER: And here in the, in the post where you are, you know, saving the post in that array.   {#3041}
[02:49:58] TEACHER: So every time we are going to replace that complete array altogether, right?   {#3042}
[02:50:03] TEACHER: Depends on what data science team gives you.   {#3043}
[02:50:05] TEACHER: Most of all, it would give you a top hundred every time you go and replace our entire   {#3044}
[02:50:08] TEACHER: array.   {#3045}
[02:50:10] TEACHER: Because I think that would be inefficient to, you know, get that array out and, you   {#3046}
[02:50:13] TEACHER: know, sorting those values.   {#3047}
[02:50:15] TEACHER: So it would be that we create the data.   {#3048}
[02:50:18] TEACHER: You give me a hundred every time you go and simply replace it.   {#3049}
[02:50:23] TEACHER: Right.   {#3050}
[02:50:24] TEACHER: Right.   {#3051}
[02:50:25] TEACHER: And, uh, it's a, it's a basic one.   {#3052}
[02:50:28] TEACHER: in the user ID Kafka thing.   {#3053}
[02:50:30] TEACHER: So you are partitioning it based on the user ID.   {#3054}
[02:50:34] TEACHER: So topic can be anything because,   {#3055}
[02:50:36] TEACHER: but it's just that you are creating those partitions based on the user ID.   {#3056}
[02:50:40] TEACHER: So don't you think it's going to be a huge and humongous Kafka pipeline,   {#3057}
[02:50:45] TEACHER: you know, considering all the user IDs or.   {#3058}
[02:50:48] TEACHER: That's what I said.   {#3059}
[02:50:48] TEACHER: I'm repeating it now.   {#3060}
[02:50:49] TEACHER: There is not one topic or rather one partition for each user ID.   {#3061}
[02:50:54] STUDENT_10: Right, right.   {#3062}
[02:50:55] TEACHER: That's what we talk about.   {#3063}
[02:50:56] TEACHER: There might be 1000 partition of which 1 million users are there.   {#3064}
[02:50:59] TEACHER: Each one taking care of 1000.   {#3065}
[02:51:01] TEACHER: Right.   {#3066}
[02:51:02] STUDENT_10: Got it.   {#3067}
[02:51:03] TEACHER: You don't need one partition for each user.   {#3068}
[02:51:06] TEACHER: Yes.   {#3069}
[02:51:07] TEACHER: So it's a one topic with different partitions and each partition can handle   {#3070}
[02:51:11] TEACHER: let's say 1000 of user ID.   {#3071}
[02:51:12] TEACHER: 1000 users.   {#3072}
[02:51:13] TEACHER: Yeah.   {#3073}
[02:51:14] STUDENT_7: Got it.   {#3074}
[02:51:14] STUDENT_7: Got it.   {#3075}
[02:51:14] STUDENT_7: Got it.   {#3076}
[02:51:16] STUDENT_7: Yeah.   {#3077}
[02:51:20] STUDENT_2: How do we actually have SLAs map to these, these designs?   {#3078}
[02:51:26] STUDENT_2: time or what kind of QPS this design would think about it.   {#3079}
[02:51:30] TEACHER: Sure.   {#3080}
[02:51:30] TEACHER: Let's start.   {#3081}
[02:51:31] TEACHER: Okay.   {#3082}
[02:51:31] TEACHER: Let's, let's, let's start.   {#3083}
[02:51:32] TEACHER: So from which component you want to start to.   {#3084}
[02:51:34] STUDENT_2: Oh, so basically, like this, a Kafka is there.   {#3085}
[02:51:37] STUDENT_2: Kafka is something which rules up a system around, right?   {#3086}
[02:51:40] STUDENT_2: So we have different workers, which we can scale upon the work, but Kafka is something   {#3087}
[02:51:43] STUDENT_2: which I, uh, not sure how it works with the single instance, right?   {#3088}
[02:51:47] STUDENT_2: How do we have multiple instances of Kafka?   {#3089}
[02:51:49] TEACHER: No, no, Kafka is not single instance.   {#3090}
[02:51:51] TEACHER: Kafka is a single instance.   {#3091}
[02:51:52] TEACHER: Kafka is a cluster.   {#3092}
[02:51:53] TEACHER: Cluster.   {#3093}
[02:51:54] STUDENT_2: So, uh, okay.   {#3094}
[02:51:56] STUDENT_2: If one goes down, another takes care of because the data is replicated.   {#3095}
[02:51:59] TEACHER: So that's availability.   {#3096}
[02:52:00] STUDENT_2: So uptime is uptime is all the time.   {#3097}
[02:52:02] STUDENT_2: It doesn't go down even for any time.   {#3098}
[02:52:05] TEACHER: No, no, it can go down.   {#3099}
[02:52:06] TEACHER: It can go down.   {#3100}
[02:52:07] TEACHER: Kafka gives you 99.9% availability.   {#3101}
[02:52:09] TEACHER: It does not give you four, nine, five, nine availability.   {#3102}
[02:52:13] TEACHER: So Kafka can go down.   {#3103}
[02:52:15] TEACHER: But in case Kafka goes down that much of time, you would lose the data.   {#3104}
[02:52:19] TEACHER: Data as in whatever rights are to are happening on Kafka, you will lose that.   {#3105}
[02:52:23] TEACHER: So if that data is really critical.   {#3106}
[02:52:26] TEACHER: you add a dead letter queue and push it there and then consume it and re-ingest it in Kafka.   {#3107}
[02:52:31] TEACHER: That's one way to do it. If not, what you can do is it's okay for you to lose data,   {#3108}
[02:52:38] TEACHER: you lose data. That's fine. So either have a dead letter queue or lose the data or   {#3109}
[02:52:44] TEACHER: drop it in memory for some time. Until in that time, it comes back up, it writes it.   {#3110}
[02:52:49] TEACHER: Otherwise you drop it. Multiple ways to handle it. So that's about availability of Kafka.   {#3111}
[02:52:56] TEACHER: Now, if you think about SLA, SLA is all about how quickly can you consume messages from Kafka.   {#3112}
[02:53:00] TEACHER: Right.   {#3113}
[02:53:01] TEACHER: Now for you to the, given the parallelism of Kafka is proportional to the number of partitions.   {#3114}
[02:53:06] TEACHER: What you'll measure is you'll measure the throughput of your system.   {#3115}
[02:53:09] TEACHER: But how quickly are you being able to consume messages from Kafka?   {#3116}
[02:53:12] TEACHER: If it is, if it fits into your quote unquote SLA, then good enough.   {#3117}
[02:53:16] TEACHER: Otherwise you increase the partition over here and you increase the workers over here.   {#3118}
[02:53:19] STUDENT_11: Number of workers.   {#3119}
[02:53:19] STUDENT_11: Yeah.   {#3120}
[02:53:21] TEACHER: Right.   {#3121}
[02:53:21] TEACHER: So, but while you do that, there is an online repartitioning and partitioning that   {#3122}
[02:53:26] TEACHER: downtime pick one depending on how uh well was your sre teams right so pick one and this way   {#3123}
[02:53:33] TEACHER: but have a strategy do have a strategy to scale this you need to have a strategy to scale things   {#3124}
[02:53:38] TEACHER: up right but uh and that's all you maintain sra in seventh week uh sunday when we discuss uh   {#3125}
[02:53:46] TEACHER: distributed task scheduler we'll understand how sla defines our system right how we are ensuring   {#3126}
[02:53:53] TEACHER: the SLA that we are meeting, but this is a very nice precursor to that.   {#3127}
[02:53:56] TEACHER: And how we think about SLAs at every single step.   {#3128}
[02:54:00] TEACHER: So it basically adds up.   {#3129}
[02:54:05] TEACHER: But any specific that you want me to touch on?   {#3130}
[02:54:07] STUDENT_2: So, I mean, we can classify data components, the two parts, one which   {#3131}
[02:54:11] STUDENT_2: made in state, one is stateless, right?   {#3132}
[02:54:13] STUDENT_2: So state means Kafka is stateful, DB is stateful and rest all the workers   {#3133}
[02:54:17] STUDENT_2: or servers are stateless.   {#3134}
[02:54:19] STUDENT_2: So when the stateful component goes down, that means   {#3135}
[02:54:23] STUDENT_2: data loss over there.   {#3136}
[02:54:24] STUDENT_2: I mean,   {#3137}
[02:54:25] STUDENT_2: if it goes down,   {#3138}
[02:54:26] STUDENT_2: if it's like a later than obviously you have some downtime.   {#3139}
[02:54:29] STUDENT_2: Right.   {#3140}
[02:54:29] STUDENT_2: So,   {#3141}
[02:54:30] STUDENT_2: so that actually triggers me to think in that way.   {#3142}
[02:54:34] STUDENT_2: Okay.   {#3143}
[02:54:34] STUDENT_2: If stateful things go down,   {#3144}
[02:54:36] STUDENT_2: how can I,   {#3145}
[02:54:37] STUDENT_2: how can I do different stuff?   {#3146}
[02:54:39] STUDENT_2: Or how can I use different components to meet my SLAs?   {#3147}
[02:54:42] STUDENT_2: Right.   {#3148}
[02:54:42] STUDENT_2: Because stateless servers,   {#3149}
[02:54:43] STUDENT_2: obviously you will measure the QPS by doing the load test.   {#3150}
[02:54:46] STUDENT_5: What you need to know is dead letter Q.   {#3151}
[02:54:48] TEACHER: Look up this.   {#3152}
[02:54:49] STUDENT_11: Okay.   {#3153}
[02:54:52] TEACHER: And look up,   {#3154}
[02:54:53] TEACHER: uh, look up dead letter.   {#3155}
[02:54:55] TEACHER: Dead letter keys are your fit and this way.   {#3156}
[02:54:58] TEACHER: And that is one of the ways to do it.   {#3157}
[02:55:00] TEACHER: Other two is, so I explained three ways to do it.   {#3158}
[02:55:02] TEACHER: Buffer in memory, loss, like letter data be lost.   {#3159}
[02:55:06] TEACHER: Third, write to a dead letter queue.   {#3160}
[02:55:08] TEACHER: And then a synchronously process.   {#3161}
[02:55:10] TEACHER: Right.   {#3162}
[02:55:11] TEACHER: Pick your favorite, depending on the system, you would pick one over other, because you   {#3163}
[02:55:15] TEACHER: don't always have to add, add another, yet another component.   {#3164}
[02:55:21] TEACHER: It's sometimes it's okay to lose the data.   {#3165}
[02:55:23] TEACHER: data and you lose some, it's fine.   {#3166}
[02:55:25] TEACHER: Right.   {#3167}
[02:55:26] TEACHER: In case you cannot lose the data at all.   {#3168}
[02:55:29] TEACHER: You read it highly available.   {#3169}
[02:55:30] TEACHER: Then you add data.   {#3170}
[02:55:32] TEACHER: I'll give an example on my YouTube.   {#3171}
[02:55:33] TEACHER: There's a video on, uh, Uber's SOS emergency video where, because.   {#3172}
[02:55:39] TEACHER: It's very important for SOS system to be up and running.   {#3173}
[02:55:43] TEACHER: Let's say you are traveling in a cab and something bad happens.   {#3174}
[02:55:47] TEACHER: You press the SOS button and at that time the service is down.   {#3175}
[02:55:50] TEACHER: You cannot have that.   {#3176}
[02:55:51] TEACHER: Right.   {#3177}
[02:55:53] TEACHER: event no matter what.   {#3178}
[02:55:55] TEACHER: So how do you ensure that that is up and running?   {#3179}
[02:55:58] TEACHER: So then none of the messages lost, none of the data is lost.   {#3180}
[02:56:01] TEACHER: Uptime is guaranteed.   {#3181}
[02:56:02] TEACHER: I've talked about it in few, few bits and pieces, but this is a key thing   {#3182}
[02:56:07] TEACHER: that you have to keep track of.   {#3183}
[02:56:10] STUDENT_2: And for DB also, I mean, you have partition DBI.   {#3184}
[02:56:13] STUDENT_2: So we have leader, leader and applicators, right?   {#3185}
[02:56:16] STUDENT_2: So if leader goes down, it takes time to, for applicator too.   {#3186}
[02:56:18] STUDENT_2: So that's also downtime.   {#3187}
[02:56:19] STUDENT_2: So if you don't want to, you should have leaderless application.   {#3188}
[02:56:23] TEACHER: how quickly you want to get it up two seconds, three seconds.   {#3189}
[02:56:26] TEACHER: That is something that you have to bear.   {#3190}
[02:56:28] TEACHER: Very few system give you a hundred percent of time guarantees.   {#3191}
[02:56:31] TEACHER: Even S even S does not give you a hundred percent of time guarantees.   {#3192}
[02:56:34] STUDENT_2: Right.   {#3193}
[02:56:34] STUDENT_2: But the digital is a leaderless components like,   {#3194}
[02:56:38] STUDENT_2: which don't have any leader, right?   {#3195}
[02:56:40] STUDENT_2: So every system, every, I mean, every few notes have all data   {#3196}
[02:56:43] STUDENT_2: or can manage data, but there's no downtime over there.   {#3197}
[02:56:45] STUDENT_2: Right.   {#3198}
[02:56:46] STUDENT_2: So that could also be used, right.   {#3199}
[02:56:48] TEACHER: If you don't want, but then that has another complexity,   {#3200}
[02:56:51] TEACHER: multi master replication.   {#3201}
[02:56:53] STUDENT_2: Yes, true. Conflict resolutions also.   {#3202}
[02:56:56] STUDENT_7: You get some, you lose some.   {#3203}
[02:56:57] STUDENT_7: Right?   {#3204}
[02:56:59] STUDENT_7: Okay.   {#3205}
[02:57:00] STUDENT_7: Great. Yes, Mohan?   {#3206}
[02:57:02] STUDENT_4: Yeah, so for the   {#3207}
[02:57:03] STUDENT_4: Kafka, there's millions of messages   {#3208}
[02:57:05] STUDENT_4: coming, right? And   {#3209}
[02:57:08] STUDENT_4: then, of course, you can go   {#3210}
[02:57:09] STUDENT_4: back and forth if the, let's say, counting   {#3211}
[02:57:11] STUDENT_4: several goes down, you can go back.   {#3212}
[02:57:13] STUDENT_4: So is there any pointers   {#3213}
[02:57:15] STUDENT_4: to think about how far they should   {#3214}
[02:57:17] STUDENT_4: be able to go back or how long the   {#3215}
[02:57:19] STUDENT_4: messages should be there? Are they going   {#3216}
[02:57:21] STUDENT_4: to be forever?   {#3217}
[02:57:24] TEACHER: On Kafka messages will be there forever unless you have configured a deletion policy.   {#3218}
[02:57:30] TEACHER: The deletion policy will be that if a message is less than 30 days old,   {#3219}
[02:57:33] TEACHER: like older than 30 days, then you delete it periodically.   {#3220}
[02:57:36] TEACHER: So if you have a deletion policy like that, you cannot go beyond it.   {#3221}
[02:57:40] TEACHER: That is called as horizon.   {#3222}
[02:57:42] TEACHER: So the time at which, like, sorry, if you have a deletion policy configured,   {#3223}
[02:57:48] TEACHER: the time at which the last deletion ran, that's your horizon.   {#3224}
[02:57:53] TEACHER: time and that you cannot read messages beyond that. So when you read from Kafka or Kyrus,   {#3225}
[02:57:58] TEACHER: you can say that, Hey, now my workers are up. I'll start reading from horizon, which means from the   {#3226}
[02:58:03] TEACHER: beginning of the, from, from beginning of the street, but beginning does not mean the first   {#3227}
[02:58:08] TEACHER: ever message because it could be very well possible that those messages are deleted just   {#3228}
[02:58:11] TEACHER: for your deletion policy. So that is your horizon. That is one way to read it. But in some cases,   {#3229}
[02:58:16] TEACHER: you cannot always start from horizon. Let's say, which is where you have checkpointings.   {#3230}
[02:58:21] TEACHER: sir in kafka whenever you read a message a set of message you can tell kafka ki hey i am this   {#3231}
[02:58:28] TEACHER: consumer and i want to commit when you say commit it means that let's say you have these many   {#3232}
[02:58:33] TEACHER: messages in kafka and you say that i'm committing you read these many and you say commit are you   {#3233}
[02:58:42] STUDENT_4: showing something that i cannot no it's there on the screen is it not there uh somehow okay on on   {#3234}
[02:58:51] TEACHER: Okay.   {#3235}
[02:58:52] TEACHER: Yeah, go ahead.   {#3236}
[02:58:52] TEACHER: Yeah. So you read few messages and then you say, commit, when you say commit, it marks on Kafka that this consumer at this ID as committed to this message.   {#3237}
[02:59:03] TEACHER: So then now you can say to Kafka that read from the last checkpoint or last commit. So it would start. So let's say you consume this few messages and then you crashed.   {#3238}
[02:59:12] TEACHER: So when you resume, you have an option to resume from horizon or you can resume from last checkpoint. So in that case you would reprocess these many messages.   {#3239}
---- OWNED SEGMENTS END ----

CTX| [02:59:23] TEACHER: Okay.   {#3240}
CTX| [02:59:24] TEACHER: So you periodically keep on committing to Kafka.   {#3241}
CTX| [02:59:27] TEACHER: And if after consuming of you, you crash, when you start, you can start from here.   {#3242}
CTX| [02:59:32] TEACHER: In some use cases, you may want to start from here.   {#3243}
CTX| [02:59:35] TEACHER: It's very different from where we do, do we want to start?   {#3244}
CTX| [02:59:38] TEACHER: So how far you want to go?   {#3245}
CTX| [02:59:40] TEACHER: It's more about till your last commit or from horizon or in from right inside, any insights   {#3246}
CTX| [02:59:48] STUDENT_4: on is there kind of design related considerations in terms of how far you need to go back?   {#3247}
CTX| [02:59:54] TEACHER: Uh, it is use case specific. How far do you want to go back? Because for example, in most   {#3248}
CTX| [03:00:01] TEACHER: cases in, to be honest, in most cases, you start from horizon when you're spinning up an entire new   {#3249}
CTX| [03:00:08] TEACHER: consumer for Kafka, let's say you never had search service consuming from Kafka. Now we're adding   {#3250}
CTX| [03:00:15] TEACHER: search service as a consumer.   {#3251}
CTX| [03:00:16] TEACHER: That's when you start from horizon, right?   {#3252}
CTX| [03:00:19] TEACHER: In some cases, in most cases, you typically start from the last   {#3253}
