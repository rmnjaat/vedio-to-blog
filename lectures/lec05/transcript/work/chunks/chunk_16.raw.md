# chunk_16  OWNS 03:02:13 -> 03:14:31  (segments #2951-#3194, 2121 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:01:14] TEACHER: of life   {#2934}
CTX| [03:01:14] TEACHER: when it comes to   {#2935}
CTX| [03:01:15] TEACHER: programming languages   {#2936}
CTX| [03:01:16] TEACHER: either a language   {#2937}
CTX| [03:01:18] TEACHER: die as a hero   {#2938}
CTX| [03:01:19] TEACHER: or live long enough to become an enterprise version of code.   {#2939}
CTX| [03:01:23] TEACHER: I think that's a good one.   {#2940}
CTX| [03:01:25] TEACHER: Okay, thanks.   {#2941}
CTX| [03:01:28] TEACHER: Yeah, so, Simran?   {#2942}
CTX| [03:01:30] STUDENT_1: Yeah, so, I have a question regarding Upset.   {#2943}
CTX| [03:01:34] STUDENT_1: So, there we were saying that we have to use it   {#2944}
CTX| [03:01:37] STUDENT_1: because we don't have to do two operations,   {#2945}
CTX| [03:01:40] STUDENT_1: first to read and then to update.   {#2946}
CTX| [03:01:42] STUDENT_1: But I have seen in some of the production system   {#2947}
CTX| [03:01:46] STUDENT_1: that we use top11 and basically check the records and then do a update kind of a thing   {#2948}
CTX| [03:01:53] STUDENT_1: if that satisfies the condition so does top11 also like what is top11 like it returns one   {#2949}
CTX| [03:02:01] STUDENT_1: if the record is present else it returns uh false top 11 yeah select top 11   {#2950}

---- OWNED SEGMENTS START ----
[03:02:13] TEACHER: belt and select top one, one in SQL.   {#2951}
[03:02:16] TEACHER: Oh, depends between top one, one select one.   {#2952}
[03:02:21] TEACHER: Okay.   {#2953}
[03:02:22] TEACHER: Uh, I've never, so select top one.   {#2954}
[03:02:25] TEACHER: It is.   {#2955}
[03:02:26] TEACHER: Do you also provide a very close in that?   {#2956}
[03:02:29] TEACHER: Fair.   {#2957}
[03:02:29] TEACHER: Okay.   {#2958}
[03:02:29] TEACHER: Select top one, one.   {#2959}
[03:02:30] TEACHER: Oh, okay.   {#2960}
[03:02:32] TEACHER: Okay.   {#2961}
[03:02:32] TEACHER: Okay.   {#2962}
[03:02:32] TEACHER: So it just picking me selecting the very first record in the results.   {#2963}
[03:02:36] TEACHER: That means one.   {#2964}
[03:02:37] TEACHER: Oh, okay.   {#2965}
[03:02:39] TEACHER: the result the row you are just resulting you are just returning one in case the row exists kind of   {#2966}
[03:02:44] TEACHER: stuff yeah yeah okay so with that what you'll achieve so select top one one from this table   {#2967}
[03:02:50] TEACHER: where some condition so this way you check for the existence right and then if it exists you do   {#2968}
[03:02:56] TEACHER: something if it doesn't exist you do something else yeah yeah basically update operation after   {#2969}
[03:03:01] STUDENT_1: just checking that so i was thinking like uh like what why absurd was not used there and why we are   {#2970}
[03:03:09] TEACHER: That is that to your developer, your, your engineers might tell you better, but one disadvantage   {#2971}
[03:03:15] TEACHER: that I'll tell you of doing a select top one, one is you're still making one select query.   {#2972}
[03:03:20] TEACHER: Now imagine on raw TCP layer, a connection is established between a server and a database.   {#2973}
[03:03:26] TEACHER: First you fire select top one, one, you get a response one or zeros or something like   {#2974}
[03:03:30] TEACHER: that, right?   {#2975}
[03:03:31] TEACHER: You get that response.   {#2976}
[03:03:32] TEACHER: Then you do either insert or update.   {#2977}
[03:03:34] TEACHER: So one network call request, one network call response, then one either insert or update   {#2978}
[03:03:40] TEACHER: query and then one response.   {#2979}
[03:03:42] TEACHER: Right.   {#2980}
[03:03:42] TEACHER: Now here, the amount of time your database spends in evaluating that top one one is very   {#2981}
[03:03:47] TEACHER: minimum.   {#2982}
[03:03:48] TEACHER: Amount of time your database would require to do insert or update is also very small,   {#2983}
[03:03:51] TEACHER: very small.   {#2984}
[03:03:53] TEACHER: But so bulk of your time is going where?   {#2985}
[03:03:55] TEACHER: On the network.   {#2986}
[03:03:56] TEACHER: And now how many trips you are making?   {#2987}
[03:03:58] TEACHER: One, two, three, four.   {#2988}
[03:04:00] TEACHER: Four trips.   {#2989}
[03:04:01] TEACHER: If you would have done it with absurd, it would have just become one, two, done.   {#2990}
[03:04:07] TEACHER: Right?   {#2991}
[03:04:08] TEACHER: So you are still saving one round trip of your time, even though top one, one seems very   {#2992}
[03:04:16] TEACHER: optimal that you are not yet.   {#2993}
[03:04:18] TEACHER: Like you are basically solving the problem that I induced of reading huge value on the   {#2994}
[03:04:24] TEACHER: client side.   {#2995}
[03:04:24] TEACHER: You are saving that, but you're still spending time over network.   {#2996}
[03:04:29] TEACHER: with absurd you can say that yeah yeah got it right but i'm not sure why they did not do it   {#2997}
[03:04:36] TEACHER: but most probably a lot of people forget about absurd to be honest i've seen a bunch of production   {#2998}
[03:04:40] TEACHER: systems where people do get and set but they forgot about absurd so quite possible right yeah   {#2999}
[03:04:48] STUDENT_1: yeah i have one more question uh so uh with that exclusive logs uh for update   {#3000}
[03:04:59] STUDENT_1: So we face this lock with time of exceeded, try restarting transaction.   {#3001}
[03:05:04] STUDENT_1: Yes.   {#3002}
[03:05:05] STUDENT_1: So yeah, basically when first transaction use that lock and it did not commit, then only   {#3003}
[03:05:13] TEACHER: this issue comes.   {#3004}
[03:05:16] TEACHER: Not really.   {#3005}
[03:05:17] TEACHER: It just about timeout.   {#3006}
[03:05:18] TEACHER: Right.   {#3007}
[03:05:19] TEACHER: When the transaction was waiting for a long time for other transaction to commit or abort,   {#3008}
[03:05:23] TEACHER: it did not happen.   {#3009}
[03:05:24] TEACHER: So you're just waiting and then your timeout exceeded.   {#3010}
[03:05:28] STUDENT_5: Okay.   {#3011}
[03:05:29] TEACHER: Because it is about that your first transaction who acquired a lock, it neither committed   {#3012}
[03:05:33] TEACHER: nor aborted in the stipulated time.   {#3013}
[03:05:36] STUDENT_1: Okay.   {#3014}
[03:05:37] STUDENT_1: In our system, a lot of time we see this, this error like lock with timeout exceeded.   {#3015}
[03:05:44] STUDENT_14: Hmm.   {#3016}
[03:05:45] TEACHER: So which means you should have fired commit or abort, which you are not.   {#3017}
[03:05:51] TEACHER: Right.   {#3018}
[03:05:51] TEACHER: That's the reason for that.   {#3019}
[03:05:54] TEACHER: So either your processing is happening for a very long time.   {#3020}
[03:05:56] TEACHER: So two reasons either the processing is happening.   {#3021}
[03:05:59] TEACHER: Like you are really doing a huge amount of processing and it has to be done for that   {#3022}
[03:06:03] TEACHER: long of a time.   {#3023}
[03:06:04] TEACHER: So which means that you need to increase your time.   {#3024}
[03:06:07] TEACHER: Otherwise it's very much possible that you, your processing is done, but you forgot to   {#3025}
[03:06:11] TEACHER: commit or about it.   {#3026}
[03:06:13] STUDENT_1: Okay.   {#3027}
[03:06:14] TEACHER: Either one of these two.   {#3028}
[03:06:16] STUDENT_1: Oh, fine.   {#3029}
[03:06:17] STUDENT_1: Thanks.   {#3030}
[03:06:18] STUDENT_11: Ashu.   {#3031}
[03:06:20] STUDENT_11: Hi, so in soft delete, we are updating.   {#3032}
[03:06:24] STUDENT_11: minus one we are not hitting the entry because batch cleanup is doing that for us but like   {#3033}
[03:06:30] STUDENT_11: within one operation just accept delete update we can delete the entry right here if you delete   {#3034}
[03:06:37] TEACHER: b plus rebalancing every time you delete your b plus t may go out of shape it needs to rebalance   {#3035}
[03:06:45] TEACHER: it's a very expensive operation that's fine if you do hard delete over here if you do delete instead   {#3036}
[03:06:54] TEACHER: I delete what would happen is   {#3037}
[03:06:56] TEACHER: B plus 3 rebalancing.   {#3038}
[03:06:58] TEACHER: That's the problem.   {#3039}
[03:07:00] TEACHER: B plus 3 rebalancing is an expensive operation.   {#3040}
[03:07:02] TEACHER: Deletes on data, pointed deletes on database   {#3041}
[03:07:04] TEACHER: is a very expensive operation.   {#3042}
[03:07:06] TEACHER: That's why. We spoke about it last week also.   {#3043}
[03:07:09] TEACHER: Okay.   {#3044}
[03:07:10] TEACHER: So read about B plus 3   {#3045}
[03:07:12] TEACHER: rebalancing. That's exactly what my video is about   {#3046}
[03:07:14] TEACHER: but read about B plus 3 rebalancing.   {#3047}
[03:07:16] TEACHER: Why that happens   {#3048}
[03:07:18] TEACHER: and what problem would it lead to when you   {#3049}
[03:07:20] TEACHER: are talking about databases. That's the root   {#3050}
[03:07:22] TEACHER: cause of it. That pointed   {#3051}
[03:07:24] TEACHER: deletions are expensive for almost all databases.   {#3052}
[03:07:27] TEACHER: So almost all databases do soft elites and then do batch cleanups.   {#3053}
[03:07:32] STUDENT_11: Got it.   {#3054}
[03:07:33] STUDENT_11: Okay.   {#3055}
[03:07:33] STUDENT_11: Thank you.   {#3056}
[03:07:34] TEACHER: So yeah, you had questions.   {#3057}
[03:07:36] STUDENT_2: Yeah.   {#3058}
[03:07:37] STUDENT_2: Continue to ask you this question first.   {#3059}
[03:07:39] STUDENT_2: So what Redis does is that every time a read is made on an expired record, it   {#3060}
[03:07:45] STUDENT_2: leads it.   {#3061}
[03:07:46] STUDENT_2: So why can't we delegate it to a cron job?   {#3062}
[03:07:49] STUDENT_2: And I mean the third approach, because it is single thread.   {#3063}
[03:07:52] TEACHER: Oh, cron job.   {#3064}
[03:07:53] TEACHER: Okay.   {#3065}
[03:07:54] TEACHER: Why would you want to delegate it to?   {#3066}
[03:07:56] TEACHER: Because invoking a free on an object is very lightweight.   {#3067}
[03:08:01] TEACHER: It's not an expensive operation, right?   {#3068}
[03:08:03] TEACHER: We are not doing any deep list.   {#3069}
[03:08:05] TEACHER: Rebalancing.   {#3070}
[03:08:06] TEACHER: It's just a delete of the things.   {#3071}
[03:08:08] TEACHER: Right.   {#3072}
[03:08:09] TEACHER: And you are just marking the, in that hash table, the actual area based implementation   {#3073}
[03:08:12] TEACHER: of hash table, you are just marking that as free space.   {#3074}
[03:08:16] TEACHER: It's a very lightweight.   {#3075}
[03:08:17] TEACHER: It literally happens in microseconds.   {#3076}
[03:08:20] TEACHER: Right.   {#3077}
[03:08:20] TEACHER: You don't even have to worry about it.   {#3078}
[03:08:24] TEACHER: enough, then you may think of delegating.   {#3079}
[03:08:26] TEACHER: Otherwise you don't need to, it is that small of a, because delegating it might   {#3080}
[03:08:30] TEACHER: sell be much more expensive than not, then basically doing it right there and   {#3081}
[03:08:34] TEACHER: then, especially in case of in memory databases.   {#3082}
[03:08:37] TEACHER: Okay.   {#3083}
[03:08:38] TEACHER: But how, I mean by delegating, I mean, we don't do anything.   {#3084}
[03:08:42] TEACHER: Huh?   {#3085}
[03:08:43] TEACHER: So in case you don't do anything versus you spend time hard deleting it.   {#3086}
[03:08:47] TEACHER: Spending two or three microseconds into deleting sounds much better because,   {#3087}
[03:08:54] TEACHER: you are freeing up memory right there and then now you can add more data to it if you delegate it   {#3088}
[03:09:02] TEACHER: to be done after some time now what would happen is your memory is still there consumed so in let's   {#3089}
[03:09:08] TEACHER: say if your redis is operating at full capacity and you delete bunch of keys and it is waiting   {#3090}
[03:09:12] TEACHER: for the next cycle to come in you are not allowing to insert new data which you could have inserted   {#3091}
[03:09:19] TEACHER: which would have been successful if you would have immediately deleted the data when you are   {#3092}
[03:09:24] TEACHER: a heartache.   {#3093}
[03:09:26] STUDENT_2: Yeah.   {#3094}
[03:09:28] STUDENT_2: And in the last week's class, we'll be discussed online, offline   {#3095}
[03:09:31] STUDENT_2: indicator within that we chose full base model rather than push base model   {#3096}
[03:09:37] STUDENT_2: stating that the drop of a push base model is that API server would we have   {#3097}
[03:09:40] STUDENT_2: to make an HTTP connection, which is based out of on top of TCP connection.   {#3098}
[03:09:46] STUDENT_2: Every few seconds, but at every time interval, right?   {#3099}
[03:09:49] TEACHER: No push based for online offline, which means that.   {#3100}
[03:09:54] TEACHER: Who is pushing where?   {#3101}
[03:09:55] TEACHER: User pushing to API server, right?   {#3102}
[03:09:59] STUDENT_2: No, I meant API server asking the user.   {#3103}
[03:10:02] STUDENT_2: How would that happen?   {#3104}
[03:10:03] TEACHER: Does Facebook know your IP address if the HTTP connection is not established?   {#3105}
[03:10:08] TEACHER: No, right?   {#3106}
[03:10:09] TEACHER: Can you connect to user?   {#3107}
[03:10:11] TEACHER: No, right?   {#3108}
[03:10:12] TEACHER: No.   {#3109}
[03:10:13] TEACHER: You cannot.   {#3110}
[03:10:13] TEACHER: Because user's IP address you don't know unless user establishes the connection with you.   {#3111}
[03:10:17] TEACHER: Correct?   {#3112}
[03:10:19] TEACHER: Yeah.   {#3113}
[03:10:20] TEACHER: You cannot establish a TCP connection unless you don't know the IP address of the machine.   {#3114}
[03:10:24] TEACHER: So server doesn't know user's IP address to correct you user, no server   {#3115}
[03:10:28] TEACHER: IP address to correct.   {#3116}
[03:10:29] TEACHER: Right.   {#3117}
[03:10:30] STUDENT_2: Okay.   {#3118}
[03:10:30] STUDENT_2: That's why.   {#3119}
[03:10:31] STUDENT_2: That is why we went through this.   {#3120}
[03:10:33] STUDENT_2: And secondly, I opened WhatsApp web and I, what I expected was that it would   {#3121}
[03:10:38] STUDENT_2: make a heartbeat message, uh, every few, a heartbeat request every few seconds.   {#3122}
[03:10:41] STUDENT_2: Even though I know that it's, uh, the actual implementation is based on   {#3123}
[03:10:45] STUDENT_2: top of web sockets, but it should have made some call.   {#3124}
[03:10:48] STUDENT_2: Shouldn't it?   {#3125}
[03:10:49] TEACHER: In the next time.   {#3126}
[03:10:50] TEACHER: It should not.   {#3127}
[03:10:51] TEACHER: Unless your web socket.   {#3128}
[03:10:54] TEACHER: a plugin i'm not sure if it's a native setup or not which disables web software connection on your   {#3129}
[03:11:00] TEACHER: tab on your browser tab try connecting web uh whatsapp web over that see you might find something   {#3130}
[03:11:06] TEACHER: you might see explicit heartbeat calls okay try that try that i'm i i'm not done it i'm not sure   {#3131}
[03:11:13] TEACHER: but there should be something that exists like this like browser gives you support to throttle   {#3132}
[03:11:19] TEACHER: your request where it can mimic the network speed it can slow that thing down for you right similarly   {#3133}
[03:11:25] TEACHER: there might be way to disable web sockets and then see how whatsapp web reacts to that because then   {#3134}
[03:11:31] TEACHER: you would see something but given that web socket exists now the connection you don't have to send   {#3135}
[03:11:37] TEACHER: heartbeat ever because if the connection is established then user is there if the connection   {#3136}
[03:11:43] TEACHER: terminates user is offline right so you don't need an explicit heartbeat in that case if you   {#3137}
[03:11:49] TEACHER: existence of connection.   {#3138}
[03:11:53] TEACHER: So if you are doing that, then you would never see   {#3139}
[03:11:55] TEACHER: heartbeat messages flowing here and there.   {#3140}
[03:11:58] STUDENT_2: Correct.   {#3141}
[03:11:59] STUDENT_2: Okay.   {#3142}
[03:12:00] STUDENT_2: Yeah.   {#3143}
[03:12:00] STUDENT_2: And the last section that we discussed today, uh, building a   {#3144}
[03:12:03] STUDENT_2: KV store, KV value stored on top of regional databases.   {#3145}
[03:12:06] STUDENT_2: I hope that's not how actual KV stores are built.   {#3146}
[03:12:09] TEACHER: No, no.   {#3147}
[03:12:10] TEACHER: What, which KV store are you talking about?   {#3148}
[03:12:12] STUDENT_2: Let's say Redis and DynamoDB.   {#3149}
[03:12:14] TEACHER: Redis is different.   {#3150}
[03:12:15] TEACHER: Redis is in memory store.   {#3151}
[03:12:16] TEACHER: I have a full course on Redis internal, like full course.   {#3152}
[03:12:19] TEACHER: Reduce intervals, how that happens.   {#3153}
[03:12:21] TEACHER: So that I feel definitely does not happen like that.   {#3154}
[03:12:23] TEACHER: Apache Ignite has been something like this.   {#3155}
[03:12:26] TEACHER: If you go through Apache Ignite source code, you'll find something very similar.   {#3156}
[03:12:30] TEACHER: But if you're talking about other DynamoDB, DynamoDB, obviously they   {#3157}
[03:12:34] TEACHER: don't, they don't use relational DB per se, right?   {#3158}
[03:12:37] TEACHER: I just use relational DB so as to help you all understand this micro   {#3159}
[03:12:42] TEACHER: optimizations, relation, how they slow down, how you get max performance   {#3160}
[03:12:46] TEACHER: out of your DB and whatnot.   {#3161}
[03:12:47] TEACHER: on. Right. So I just leverage this key value store in order for us to be able to discuss   {#3162}
[03:12:53] TEACHER: in a simple terms, these micro optimizers that you all should be aware of. Right. Much   {#3163}
[03:12:58] TEACHER: more than anything else. Right. We'll also discuss one more thing. Distributed cache   {#3164}
[03:13:03] TEACHER: fifth week. There we'll build an in-memory distributed cache. Then we'll not use relational   {#3165}
[03:13:10] TEACHER: database at all, but we'll go into in-memory details and we'll see other specifics that   {#3166}
[03:13:14] TEACHER: you should be aware of.   {#3167}
[03:13:15] TEACHER: Then we'll just, we'll simplify the storage side by just storing   {#3168}
[03:13:19] TEACHER: data in an in-memory hash table, but we'll discuss all other   {#3169}
[03:13:22] TEACHER: peripheral details around it, right?   {#3170}
[03:13:24] TEACHER: Which transport to choose, why to choose, how lock it would happen.   {#3171}
[03:13:28] TEACHER: Mutex, a bunch of stuff would be there, low level and high level stuff.   {#3172}
[03:13:32] TEACHER: Right?   {#3173}
[03:13:34] TEACHER: So that will cover that.   {#3174}
[03:13:35] TEACHER: Now on this persistent key value store, relational databases makes it   {#3175}
[03:13:39] TEACHER: simple to understand for everything else.   {#3176}
[03:13:42] TEACHER: just replace relational database   {#3177}
[03:13:43] TEACHER: and write your own storage layer.   {#3178}
[03:13:46] TEACHER: That's all it differs.   {#3179}
[03:13:47] TEACHER: We'll discuss that.   {#3180}
[03:13:49] TEACHER: Something very similar in sixth...   {#3181}
[03:13:50] TEACHER: I've got so much thing covered, man.   {#3182}
[03:13:53] TEACHER: So in sixth week,   {#3183}
[03:13:56] TEACHER: we'll cover two databases that do it.   {#3184}
[03:13:58] TEACHER: One with LSM tree   {#3185}
[03:13:59] TEACHER: and one with other implementation.   {#3186}
[03:14:02] TEACHER: Then we'll see different kind of storage engine   {#3187}
[03:14:05] TEACHER: for key values.   {#3188}
[03:14:06] TEACHER: God, I've covered that also.   {#3189}
[03:14:09] TEACHER: We have much of thing covered.   {#3190}
[03:14:10] TEACHER: Don't worry.   {#3191}
[03:14:12] STUDENT_2: small request if we could share the code snippets let's say for the designing of   {#3192}
[03:14:15] TEACHER: air no write it write it write it why i want you to make mistakes if i share it you just run it   {#3193}
[03:14:24] TEACHER: done no when you write it right you make mistakes i want you all to make mistakes   {#3194}
---- OWNED SEGMENTS END ----

CTX| [03:14:31] STUDENT_2: but we just want i at least personally want my expertise and code to be as far as with you   {#3195}
CTX| [03:14:36] TEACHER: No, no, make mistakes.   {#3196}
CTX| [03:14:39] TEACHER: See the day when I, the day when I built it the first time, the kind of joy I experienced,   {#3197}
CTX| [03:14:44] TEACHER: the kind of, uh, things that I faced like the transactional deadlock.   {#3198}
CTX| [03:14:49] TEACHER: What happens in a deadlock?   {#3199}
CTX| [03:14:51] TEACHER: I had a bunch of deadlocks in my court when I was writing it.   {#3200}
CTX| [03:14:54] TEACHER: Right.   {#3201}
CTX| [03:14:54] TEACHER: I, when I knew, then I thought, okay, this also can happen.   {#3202}
CTX| [03:14:58] TEACHER: Now, how do I fix it?   {#3203}
CTX| [03:14:59] TEACHER: Oh, this also happened now, but I'm not getting enough throughput.   {#3204}
CTX| [03:15:01] TEACHER: So now what do I do?   {#3205}
CTX| [03:15:02] TEACHER: Those mistakes make you a better engine.   {#3206}
CTX| [03:15:06] TEACHER: you know makes a better engineer. It's what you, what mistakes you made,   {#3207}
CTX| [03:15:09] TEACHER: what you learned from them makes you better.   {#3208}
CTX| [03:15:11] TEACHER: Okay.   {#3209}
CTX| [03:15:12] TEACHER: Go through that. Go through that. Right. Go through that.   {#3210}
CTX| [03:15:14] STUDENT_13: Thank you so much.   {#3211}
CTX| [03:15:16] TEACHER: Best feeling ever. Right. When we discuss load balancer,   {#3212}
CTX| [03:15:18] TEACHER: I'll ask you to implement a load balancer.   {#3213}
CTX| [03:15:20] TEACHER: We'll go through the source code of that as well.   {#3214}
CTX| [03:15:22] TEACHER: Ask you to implement a load balancer also. Right.   {#3215}
CTX| [03:15:25] STUDENT_13: Thank you so much.   {#3216}
CTX| [03:15:27] STUDENT_13: Prashant.   {#3217}
CTX| [03:15:29] STUDENT_10: Yeah. Hi, so we talked about soft deletion.   {#3218}
