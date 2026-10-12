# chunk_15  OWNS 02:54:33 -> 03:07:44  (segments #2915-#3204, 2382 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:53:35] TEACHER: 200 300 links not more than that if they were with this architecture nothing when delusion happens   {#2907}
CTX| [02:53:41] TEACHER: one event sent they would have already established this one event stored over here one notification   {#2908}
CTX| [02:53:47] TEACHER: stored over sent over here that's it but to reach to that is this the best way staggered rollouts   {#2909}
CTX| [02:53:53] TEACHER: and all that takes right thanks yeah but again highly recommend you to implement this like just   {#2910}
CTX| [02:54:01] TEACHER: work with web sockets and try to do that mimic that message deleted see it in ui like you'll have fun   {#2911}
CTX| [02:54:08] STUDENT_7: yeah yeah abhishek i think we talked about delivering the messages but how like how can   {#2912}
CTX| [02:54:18] STUDENT_7: we think about ordering these messages and this exactly one semantics yeah who said exactly one   {#2913}
CTX| [02:54:24] TEACHER: semantics is there why are we adding that exactly one semantics like in the enterprise you said right   {#2914}

---- OWNED SEGMENTS START ----
[02:54:33] STUDENT_7: you, you, first is you'll, you'll have to maintain the communication dialogue, right?   {#2915}
[02:54:37] STUDENT_7: Correct.   {#2916}
[02:54:37] STUDENT_7: What communication I'm doing, right?   {#2917}
[02:54:39] STUDENT_7: I need to have that, uh, a message to be ordered at least in that way.   {#2918}
[02:54:43] STUDENT_7: So that the, okay.   {#2919}
[02:54:46] TEACHER: Okay.   {#2920}
[02:54:47] TEACHER: Let's say the front end is yours.   {#2921}
[02:54:50] TEACHER: You have built a front end.   {#2922}
[02:54:51] TEACHER: Correct.   {#2923}
[02:54:52] TEACHER: So given that who said that message has to be up and down, who said no one, right?   {#2924}
[02:55:01] TEACHER: your front end insert the message in the middle.   {#2925}
[02:55:05] TEACHER: What's the problem?   {#2926}
[02:55:07] TEACHER: Correct.   {#2927}
[02:55:08] TEACHER: It's no problem.   {#2928}
[02:55:10] TEACHER: And you think about message ordering where it is almost up and   {#2929}
[02:55:15] TEACHER: only where it is almost you are processing the message one after   {#2930}
[02:55:19] TEACHER: another, their message ordering is important.   {#2931}
[02:55:21] TEACHER: Here.   {#2932}
[02:55:22] TEACHER: Let's say user A sent two messages message one message two message   {#2933}
[02:55:28] TEACHER: Page two somehow reached user B first and then message one came.   {#2934}
[02:55:34] TEACHER: First render it one below other when user refreshes it, you change the order because   {#2935}
[02:55:39] TEACHER: the order in which it is stored in the database is the source of truth for you.   {#2936}
[02:55:46] TEACHER: You order it one below other user would say something seems wrong over here.   {#2937}
[02:55:51] TEACHER: You refresh the page order will get fixed.   {#2938}
[02:55:54] TEACHER: Case number one.   {#2939}
[02:55:54] TEACHER: Correct.   {#2940}
[02:55:56] TEACHER: Case number two, when you have your default order of messages by timestamp, when you receive   {#2941}
[02:56:02] TEACHER: a message, message two is having a larger timestamp than message one.   {#2942}
[02:56:05] TEACHER: So first let's say you receive message two, then you receive message one, but the react   {#2943}
[02:56:11] TEACHER: state that you are maintaining is always ordered by timestamp.   {#2944}
[02:56:13] TEACHER: So instead of appending it at the end of the array, you insert it in the middle.   {#2945}
[02:56:19] TEACHER: and when you do that, your state would just flick a bit and you would just see a message   {#2946}
[02:56:26] TEACHER: just entered in the between.   {#2947}
[02:56:27] TEACHER: But if that's okay for your user experience, you do that.   {#2948}
[02:56:30] TEACHER: Okay.   {#2949}
[02:56:31] TEACHER: Now you tell me what's the problem.   {#2950}
[02:56:33] STUDENT_7: Sure.   {#2951}
[02:56:33] STUDENT_7: In fact, like I'm telling you from this experience, right?   {#2952}
[02:56:37] STUDENT_7: So we are using a Microsoft Teams over here.   {#2953}
[02:56:40] STUDENT_7: And at times I've seen that if I, if I do a communication, right?   {#2954}
[02:56:44] STUDENT_7: the receiver side, they actually get the in-ordered messages.   {#2955}
[02:56:47] STUDENT_7: It takes time and maybe eventually they do reshuffle it   {#2956}
[02:56:53] STUDENT_7: and then keep that order.   {#2957}
[02:56:56] STUDENT_7: But initially, sometimes you'll not get messages.   {#2958}
[02:57:00] STUDENT_7: Sometimes you'll get duplicate messages   {#2959}
[02:57:02] STUDENT_7: and sometimes you'll get out of order messages.   {#2960}
[02:57:04] TEACHER: So now you can very clearly put it in this architecture.   {#2961}
[02:57:06] TEACHER: If you're getting duplicate messages,   {#2962}
[02:57:08] TEACHER: which means that they might not be waiting for the persistence to happen.   {#2963}
[02:57:12] TEACHER: So they might not go this route.   {#2964}
[02:57:14] TEACHER: They might first be broadcasting it to you and then eventually persisting.   {#2965}
[02:57:17] TEACHER: Quite possible.   {#2966}
[02:57:19] TEACHER: Right.   {#2967}
[02:57:20] TEACHER: What we enjoyed was we first store once we are short, then we tell the other   {#2968}
[02:57:24] TEACHER: user that this is there.   {#2969}
[02:57:25] TEACHER: Right.   {#2970}
[02:57:26] TEACHER: First case, either they are doing directly like this by ensuring persistence   {#2971}
[02:57:30] TEACHER: through asynchronous or synchronous manner.   {#2972}
[02:57:32] TEACHER: Any case, or they might be having a retry on the web software server that   {#2973}
[02:57:35] TEACHER: they are having.   {#2974}
[02:57:36] TEACHER: Even if they think that message is not delivered, but it was actually   {#2975}
[02:57:39] TEACHER: delivered.   {#2976}
[02:57:40] TEACHER: You might see a glitch over here as well.   {#2977}
[02:57:42] TEACHER: Right.   {#2978}
[02:57:45] TEACHER: And then when you refresh and then when you say that after some time it automatically gets ordered, assuming that you refresh the page, the actual source of truth API gets called and it fills it.   {#2979}
[02:57:55] TEACHER: So you get that.   {#2980}
[02:57:56] TEACHER: But in case, let's say you don't refresh the page, they might be having a background job that is continuously checking if the message ordering is correct.   {#2981}
[02:58:02] TEACHER: For example, let's say every one minute you make a call to your back end, actual HTTP back end to fetch the last 50 messages that you receive.   {#2982}
[02:58:11] TEACHER: and you just see if all of them are there on the UI or not and reorder if needed.   {#2983}
[02:58:17] TEACHER: Right?   {#2984}
[02:58:18] TEACHER: All.   {#2985}
[02:58:18] TEACHER: 10 na?   {#2986}
[02:58:19] TEACHER: Problem solved.   {#2987}
[02:58:21] STUDENT_7: Just one question.   {#2988}
[02:58:23] STUDENT_7: So you say that for us right now, the order is the time when I'm persisting it right in   {#2989}
[02:58:28] STUDENT_7: the DB because that is how I'll tell you what is my source of truth.   {#2990}
[02:58:32] STUDENT_7: Exactly.   {#2991}
[02:58:33] STUDENT_7: But let's say even the source of truth depends on what parameter you are deciding   {#2992}
[02:58:36] STUDENT_7: right to store it in the DB.   {#2993}
[02:58:38] STUDENT_7: Like you used a timestamp.   {#2994}
[02:58:41] TEACHER: No, time stamp is exactly the time at which, no, no, it's for me in the DB.   {#2995}
[02:58:45] TEACHER: It's always the DB insertion time, whatever it is, whatever is the clock on the DB is   {#2996}
[02:58:50] TEACHER: the time at which I'm inserting.   {#2997}
[02:58:53] STUDENT_7: Yeah.   {#2998}
[02:58:53] STUDENT_7: But then that is not the actual, let's say even the message, have a like incorrect time   {#2999}
[02:58:59] STUDENT_7: stamp itself.   {#3000}
[02:59:01] TEACHER: So you are sending time from the client side.   {#3001}
[02:59:06] TEACHER: Are you sending message from the client side?   {#3002}
[02:59:08] TEACHER: Are you sending time from the client side?   {#3003}
[02:59:11] STUDENT_7: Yes, yes.   {#3004}
[02:59:12] TEACHER: My first question is why?   {#3005}
[02:59:16] TEACHER: Why do you want to send timestamps from the client?   {#3006}
[02:59:18] TEACHER: You should never do that when you're processing the message on the database.   {#3007}
[02:59:23] TEACHER: Whatever time is there on the database is the source of truth for you.   {#3008}
[02:59:27] TEACHER: You should never rely on timestamps.   {#3009}
[02:59:29] TEACHER: I can just change my clock to like 1 January 1970.   {#3010}
[02:59:34] TEACHER: Right?   {#3011}
[02:59:35] TEACHER: Never leave that school.   {#3012}
[02:59:36] STUDENT_7: If I say, Hey, hi, hello.   {#3013}
[02:59:39] STUDENT_7: Okay.   {#3014}
[02:59:40] STUDENT_7: All three at the same time from the client side and you, they would never happen on the   {#3015}
[02:59:44] TEACHER: same time on the client side.   {#3016}
[02:59:45] TEACHER: Right.   {#3017}
[02:59:46] TEACHER: There would always be some time difference.   {#3018}
[02:59:49] TEACHER: Hey, hi, hello.   {#3019}
[02:59:50] TEACHER: It would take time for you to type time for you to say, you can never send it at the exact   {#3020}
[02:59:54] TEACHER: same time.   {#3021}
[02:59:57] TEACHER: Correct.   {#3022}
[02:59:58] TEACHER: It's not possible.   {#3023}
[03:00:02] STUDENT_7: Right.   {#3024}
[03:00:04] STUDENT_7: But let's say due to the network.   {#3025}
[03:00:06] STUDENT_7: latency, you still happen to receive the third message first.   {#3026}
[03:00:09] STUDENT_7: Right?   {#3027}
[03:00:10] STUDENT_7: That's perfectly fine.   {#3028}
[03:00:11] TEACHER: So then that's a source of truth.   {#3029}
[03:00:12] TEACHER: Whatever I received, whatever I received at my database, that's a source of truth for   {#3030}
[03:00:17] TEACHER: me.   {#3031}
[03:00:17] TEACHER: If you would want to make it overly complicated, use CRDT to merge to conflict resolution.   {#3032}
[03:00:23] TEACHER: Use vector clocks on the client side.   {#3033}
[03:00:25] TEACHER: Why?   {#3034}
[03:00:27] TEACHER: Why would you want to do that?   {#3035}
[03:00:29] TEACHER: I'll give you a solution to that.   {#3036}
[03:00:31] TEACHER: Use vector clock on the client side.   {#3037}
[03:00:32] TEACHER: Have your, have each plan have its own vector clock, which can persist in the database.   {#3038}
[03:00:39] TEACHER: Is this worth it?   {#3039}
[03:00:41] TEACHER: No.   {#3040}
[03:00:43] TEACHER: Having the complexity of maintaining vector clock, doing the merge conflicts when you   {#3041}
[03:00:46] TEACHER: read it slows down your entire system.   {#3042}
[03:00:49] TEACHER: Why?   {#3043}
[03:00:49] TEACHER: No one does that.   {#3044}
[03:00:51] TEACHER: Keep things simple.   {#3045}
[03:00:54] TEACHER: One edge case, clearly you do not re-architect your entire sub, you do not add all sorts   {#3046}
[03:00:58] TEACHER: of random fancy stuff, vector clocks and all.   {#3047}
[03:01:00] TEACHER: You don't do that.   {#3048}
[03:01:03] TEACHER: designing very realistic system very realistic theoretically i can find 100 root holes in this   {#3049}
[03:01:08] TEACHER: but practically there are none none as it there are few but it's okay to live with that right   {#3050}
[03:01:13] TEACHER: what are the chances that that could happen right think on realistic terms do you really need that   {#3051}
[03:01:20] TEACHER: if yes then implement it i'll give you answer look for vector clocks that's the answer to the problem   {#3052}
[03:01:26] TEACHER: and see the implementation how complicated your architecture will become or your implementation   {#3053}
[03:01:30] TEACHER: would become good immediately give up on that.   {#3054}
[03:01:34] TEACHER: But vector clock is the answer in case you're looking for that.   {#3055}
[03:01:36] TEACHER: Then that's a globally accounted vector clock per client.   {#3056}
[03:01:41] TEACHER: Massive problem. No one does that.   {#3057}
[03:01:45] TEACHER: Right.   {#3058}
[03:01:48] TEACHER: Interested look out for vector clock, a globally consistent vector clock implementation.   {#3059}
[03:01:53] TEACHER: You'll see where the problem starts to begin.   {#3060}
[03:01:57] TEACHER: Uh, Rajiv.   {#3061}
[03:02:02] STUDENT_5: I was thinking from DB front now, just give a thought that it's a master slave, uh, architecture   {#3062}
[03:02:07] STUDENT_5: replication.   {#3063}
[03:02:09] STUDENT_5: Because we went through.   {#3064}
[03:02:09] TEACHER: Where is replication?   {#3065}
[03:02:10] TEACHER: There's just sharded.   {#3066}
[03:02:11] TEACHER: You can have replicas if you want, but typical sharded would work.   {#3067}
[03:02:14] TEACHER: Replication, I don't see a need there anyway.   {#3068}
[03:02:17] STUDENT_5: I was thinking from, from point where if let's say a DB node goes down, I mean, a single   {#3069}
[03:02:22] STUDENT_5: node is there, if it goes down, uh, and in the process where the write was being written   {#3070}
[03:02:26] STUDENT_5: over there, it went down to some reason.   {#3071}
[03:02:30] STUDENT_5: with, since we told that the message persistence is of importance over here,   {#3072}
[03:02:34] STUDENT_5: a message got lost.   {#3073}
[03:02:35] STUDENT_5: It didn't write to the DV that some bad thing happened.   {#3074}
[03:02:38] STUDENT_5: How do we recover from that?   {#3075}
[03:02:40] TEACHER: No.   {#3076}
[03:02:40] TEACHER: So you would always have standby nodes.   {#3077}
[03:02:42] TEACHER: You would have replication factor three-way persistent.   {#3078}
[03:02:45] TEACHER: See, depending on the critical.   {#3079}
[03:02:46] TEACHER: So you would not just have one node.   {#3080}
[03:02:47] TEACHER: If your data is so important, you would have replication factor.   {#3081}
[03:02:52] TEACHER: You would have inter-replicated databases.   {#3082}
[03:02:53] TEACHER: For example, when you're writing, you're writing a three different databases,   {#3083}
[03:02:56] TEACHER: three different data nodes.   {#3084}
[03:02:57] TEACHER: If one node goes down, other nodes can serve the data, which   {#3085}
[03:03:00] TEACHER: what DynamoDB does internally.   {#3086}
[03:03:02] TEACHER: Right?   {#3087}
[03:03:02] TEACHER: You make a database that gives you those guarantees.   {#3088}
[03:03:05] TEACHER: No, no.   {#3089}
[03:03:06] TEACHER: No, no.   {#3090}
[03:03:07] TEACHER: You cannot read from Kafka.   {#3091}
[03:03:08] TEACHER: You would already processed the messages.   {#3092}
[03:03:09] STUDENT_5: The workers actually read it and you call commit over there.   {#3093}
[03:03:12] STUDENT_5: Kafka is done there.   {#3094}
[03:03:13] STUDENT_5: Then the workers pushed two, three different instances of 30 different DB   {#3095}
[03:03:17] STUDENT_5: instances across different regions internally.   {#3096}
[03:03:19] TEACHER: Your worker is not doing that database is doing database.   {#3097}
[03:03:21] TEACHER: No database storage engine is doing that you your workers would not push it   {#3098}
[03:03:25] TEACHER: two, three databases that's worse.   {#3099}
[03:03:26] TEACHER: Your storage engine does that.   {#3100}
[03:03:28] TEACHER: Your database is replicated database.   {#3101}
[03:03:30] TEACHER: Your database is a distributed database.   {#3102}
[03:03:32] TEACHER: So this database internally has a bunch of storage nodes that we are talking about.   {#3103}
[03:03:36] TEACHER: And this writes, your write comes to one data node.   {#3104}
[03:03:39] TEACHER: It replicates it to two different.   {#3105}
[03:03:41] TEACHER: So if one node goes down, other node can serve the data.   {#3106}
[03:03:45] STUDENT_5: No, I was saying that by the time it was serving the right request, it then get published   {#3107}
[03:03:50] STUDENT_5: to different, different replicate replications, right?   {#3108}
[03:03:54] STUDENT_5: depicted notes.   {#3109}
[03:03:55] STUDENT_5: It just got lost.   {#3110}
[03:03:56] TEACHER: Then you would never commit.   {#3111}
[03:03:58] TEACHER: Then you would never say   {#3112}
[03:03:58] TEACHER: that you accepted the right.   {#3113}
[03:04:00] TEACHER: You would always say   {#3114}
[03:04:01] TEACHER: when you wrote it   {#3115}
[03:04:01] TEACHER: to three different places,   {#3116}
[03:04:02] TEACHER: then you do it.   {#3117}
[03:04:03] STUDENT_5: To whom?   {#3118}
[03:04:04] STUDENT_5: To the worker, right?   {#3119}
[03:04:05] STUDENT_5: To the worker.   {#3120}
[03:04:05] STUDENT_5: Yeah, to the worker.   {#3121}
[03:04:06] TEACHER: Yeah.   {#3122}
[03:04:07] STUDENT_5: And then if,   {#3123}
[03:04:08] STUDENT_5: let's say worker doesn't hold the,   {#3124}
[03:04:09] STUDENT_5: okay, so worker actually holds the state,   {#3125}
[03:04:11] STUDENT_5: holds the message   {#3126}
[03:04:12] STUDENT_5: until unless the DB commits it.   {#3127}
[03:04:13] STUDENT_5: Correct.   {#3128}
[03:04:14] STUDENT_5: Correct.   {#3129}
[03:04:14] STUDENT_5: And then retry it after that.   {#3130}
[03:04:16] TEACHER: Your DB would never say   {#3131}
[03:04:17] TEACHER: that I am done   {#3132}
[03:04:18] TEACHER: unless it is written   {#3133}
[03:04:18] TEACHER: in three different places.   {#3134}
[03:04:19] TEACHER: And I'm talking   {#3135}
[03:04:20] TEACHER: going very deep   {#3136}
[03:04:21] TEACHER: into distributed database implementation.   {#3137}
[03:04:23] TEACHER: Right?   {#3138}
[03:04:23] TEACHER: Yeah.   {#3139}
[03:04:25] STUDENT_5: And eventually if worker goes down and it doesn't, hasn't, hasn't done a   {#3140}
[03:04:29] STUDENT_5: So you'd reprocess it.   {#3141}
[03:04:30] STUDENT_5: All is hold it over.   {#3142}
[03:04:32] STUDENT_5: Everything is held over there.   {#3143}
[03:04:33] STUDENT_5: A worker has held the state and the TV has committed.   {#3144}
[03:04:36] STUDENT_5: Okay.   {#3145}
[03:04:37] STUDENT_16: Yes.   {#3146}
[03:04:38] STUDENT_5: Okay.   {#3147}
[03:04:39] STUDENT_5: Okay.   {#3148}
[03:04:39] TEACHER: So, which is exactly what distributed databases do like dynamo   {#3149}
[03:04:41] TEACHER: DB exactly does that when you write to a dynamo DB internally, it gets   {#3150}
[03:04:45] TEACHER: written to three different storage nodes.   {#3151}
[03:04:47] TEACHER: And once it has completed writing to three different notes, then only it   {#3152}
[03:04:50] TEACHER: says my right is complete until then it does not say right.   {#3153}
[03:04:52] TEACHER: It's complicated.   {#3154}
[03:04:54] STUDENT_5: Okay. Three is the, is the right figure.   {#3155}
[03:04:58] STUDENT_5: And one more thing, uh, we had shared the database between the workers and the API servers.   {#3156}
[03:05:04] STUDENT_5: So sharing a database has its own sort of, I mean, we are adding from one flow reading from one flow.   {#3157}
[03:05:10] TEACHER: Is it like, I mean, how to do that, right? Why would make a call to API and then API writes a server?   {#3158}
[03:05:16] TEACHER: Unnecessary complication. Imagine making a network call over here to write it over here.   {#3159}
[03:05:21] TEACHER: No, sharing a database is fine.   {#3160}
[03:05:23] TEACHER: Perfectly fine.   {#3161}
[03:05:25] STUDENT_5: I mean, sharing a database, having their own database.   {#3162}
[03:05:28] STUDENT_5: I mean, we would like to understand more.   {#3163}
[03:05:31] STUDENT_5: I have a video on it.   {#3164}
[03:05:32] TEACHER: I have a video on it.   {#3165}
[03:05:33] TEACHER: Microservices playlist.   {#3166}
[03:05:34] TEACHER: I have a video on it.   {#3167}
[03:05:35] TEACHER: Exactly this topic.   {#3168}
[03:05:36] TEACHER: What's that?   {#3169}
[03:05:37] TEACHER: And it's perfectly fine.   {#3170}
[03:05:38] TEACHER: It's perfectly fine to share a database.   {#3171}
[03:05:40] TEACHER: I like, I hate that anti-pattern where every microservice needs to have a separate database.   {#3172}
[03:05:44] TEACHER: No, I want performance from my system.   {#3173}
[03:05:46] TEACHER: I want cost efficiency of my system.   {#3174}
[03:05:49] TEACHER: Right?   {#3175}
[03:05:51] TEACHER: do it for me business and product comes first engineering is all okay right because business   {#3176}
[03:05:57] TEACHER: there then our jobs are there otherwise we are all laid off right so i would do whatever it takes   {#3177}
[03:06:02] TEACHER: to keep the cost down and get the max performance out of my system sharing a database fine with me   {#3178}
[03:06:08] TEACHER: perfectly fine i have no problem in that but in case you want to dive deeper the micro services   {#3179}
[03:06:12] TEACHER: playlist that i have on my youtube i've talked about the sharing database as a pattern advantages   {#3180}
[03:06:17] TEACHER: disadvantages, separate databases, why to do it, 17, 18 videos are there in that series.   {#3181}
[03:06:22] TEACHER: Two of them are, uh, uh, basically around this topic, right. You'll find it. Okay. Thank you.   {#3182}
[03:06:29] STUDENT_5: Uh, yeah. Hi, so taking an example of, uh, WhatsApp. So in that, uh, chats are end to   {#3183}
[03:06:38] STUDENT_5: end encrypted. So whenever a user, uh, is created or added to a channel or, or a group, so it needs   {#3184}
[03:06:47] STUDENT_5: So our WebSocket need to push the public key for all the other persons which are present in that group.   {#3185}
[03:06:57] STUDENT_5: So it needs to get these public key from the database.   {#3186}
[03:07:01] STUDENT_5: So how are we?   {#3187}
[03:07:02] STUDENT_5: So in this case, we have to access the database.   {#3188}
[03:07:05] TEACHER: I don't have any experience around public key encryption.   {#3189}
[03:07:08] TEACHER: I don't know signal protocol well, so I cannot commit on it.   {#3190}
[03:07:12] TEACHER: I have no idea how that works.   {#3191}
[03:07:14] TEACHER: what keys it needs to decrypt it, how it gets old messages.   {#3192}
[03:07:17] TEACHER: I have no idea, no idea because end-to-end encryption,   {#3193}
[03:07:21] TEACHER: I know protocol of it.   {#3194}
[03:07:23] TEACHER: I know signal protocol a bit.   {#3195}
[03:07:25] TEACHER: WhatsApp uses a variant of it, 100%,   {#3196}
[03:07:27] TEACHER: but I don't know what all information it needs,   {#3197}
[03:07:30] TEACHER: how it processes that, no idea about it.   {#3198}
[03:07:33] TEACHER: So not in a position to comment on it at all.   {#3199}
[03:07:36] TEACHER: Whatever I say would be 100%.   {#3200}
[03:07:38] TEACHER: Okay.   {#3201}
[03:07:39] STUDENT_14: Thanks.   {#3202}
[03:07:40] STUDENT_14: Thanks.   {#3203}
[03:07:41] TEACHER: Sampat.   {#3204}
---- OWNED SEGMENTS END ----

CTX| [03:07:44] STUDENT_2: So my question is about the DB schema where we were designing the channel DB schema.   {#3205}
CTX| [03:07:51] STUDENT_2: So what was the reason we are storing the type of the channel?   {#3206}
CTX| [03:07:57] STUDENT_2: Explicitly like,   {#3207}
CTX| [03:07:58] STUDENT_2: Revisit your recording.   {#3208}
CTX| [03:08:00] STUDENT_2: Revisit.   {#3209}
CTX| [03:08:00] STUDENT_2: Let me, sorry, my question didn't come from.   {#3210}
CTX| [03:08:03] STUDENT_2: So why did we choose to store the type of the channel?   {#3211}
CTX| [03:08:07] STUDENT_2: Like whether it's a DM or it's like a channel channel?   {#3212}
CTX| [03:08:10] TEACHER: You can render it on the UI.   {#3213}
CTX| [03:08:11] TEACHER: That's what I said, right?   {#3214}
CTX| [03:08:12] TEACHER: You could render it on the UI accordingly.   {#3215}
CTX| [03:08:15] STUDENT_2: Rather, we could have just stored it, whether it's a private or public and then everything   {#3216}
CTX| [03:08:21] STUDENT_2: since it's a channel.   {#3217}
CTX| [03:08:22] STUDENT_2: So it can have multiple members, whether it's two or more, or if it's private, then it's   {#3218}
CTX| [03:08:28] STUDENT_2: basically a DM.   {#3219}
CTX| [03:08:29] STUDENT_2: If it's a private channel or it's a public channel, it's a public.   {#3220}
CTX| [03:08:33] TEACHER: How will you differentiate between a channel with two people and a DM?   {#3221}
CTX| [03:08:38] STUDENT_2: Okay.   {#3222}
CTX| [03:08:39] STUDENT_2: So everything is a channel and our channel consists of two members, but if it's a public,   {#3223}
