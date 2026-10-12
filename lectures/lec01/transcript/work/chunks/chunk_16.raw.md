# chunk_16  OWNS 03:05:22 -> 03:15:09  (segments #3013-#3212, 1580 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:04:25] TEACHER: or maybe local storage, wherever it is choosing to cache, but that's an excellent example.   {#2995}
CTX| [03:04:31] TEACHER: See every where you see caching, like no one wants to do repetitive computation.   {#2996}
CTX| [03:04:35] TEACHER: That's why dynamic programming, right?   {#2997}
CTX| [03:04:37] TEACHER: You do memoization, ensuring that you don't re do the same things again in it.   {#2998}
CTX| [03:04:43] TEACHER: Adit.   {#2999}
CTX| [03:04:44] STUDENT_2: Hey, hi, one basic question for in, uh, long polling and server side server sent events   {#3000}
CTX| [03:04:52] STUDENT_2: in both of the cases, uh, TCP connection would be open, right?   {#3001}
CTX| [03:04:56] STUDENT_2: Yes.   {#3002}
CTX| [03:04:56] STUDENT_2: So in case of SSE, uh, when is the TCP connection closed?   {#3003}
CTX| [03:05:02] TEACHER: When your client wants to terminate it, it's on the side of the client, either the server   {#3004}
CTX| [03:05:07] TEACHER: goes down or the client chooses to terminate the connection that I'm done consuming.   {#3005}
CTX| [03:05:12] TEACHER: Okay.   {#3006}
CTX| [03:05:13] STUDENT_5: Okay.   {#3007}
CTX| [03:05:14] STUDENT_5: Okay. Thank you.   {#3008}
CTX| [03:05:15] STUDENT_5: Yeah. Thank you.   {#3009}
CTX| [03:05:17] STUDENT_5: Sure. Great.   {#3010}
CTX| [03:05:18] STUDENT_5: Any other question?   {#3011}
CTX| [03:05:18] STUDENT_5: Anyone?   {#3012}

---- OWNED SEGMENTS START ----
[03:05:22] STUDENT_1: Yeah. We check.   {#3013}
[03:05:25] STUDENT_1: So how do you test those SSC type of connections?   {#3014}
[03:05:30] STUDENT_5: As in how do I test?   {#3015}
[03:05:31] STUDENT_1: Is it like, uh, how, how can, how, how do we like ensure that like any, any sort of a   {#3016}
[03:05:37] STUDENT_1: unit testing or.   {#3017}
[03:05:39] TEACHER: I've never write.   {#3018}
[03:05:40] TEACHER: I've never written tests on servers that I just deployed in production.   {#3019}
[03:05:44] TEACHER: I wanted to write the deployment logs that I gave as an example.   {#3020}
[03:05:47] TEACHER: I just built it.   {#3021}
[03:05:48] TEACHER: I never tested.   {#3022}
[03:05:49] TEACHER: I never wrote unit test for connections per se.   {#3023}
[03:05:52] TEACHER: Never.   {#3024}
[03:05:53] TEACHER: I just said, but I do, I have tested what needs to be done when you   {#3025}
[03:05:57] TEACHER: receive a certain type of message, never tested the connection, but I've   {#3026}
[03:06:02] TEACHER: tested what I received on the connection.   {#3027}
[03:06:06] TEACHER: Right.   {#3028}
[03:06:06] TEACHER: So you can rely on that anyway, because that would be functional anyway.   {#3029}
[03:06:11] TEACHER: Okay.   {#3030}
[03:06:11] TEACHER: So I did test the business logic on what to do when I receive a certain type of message   {#3031}
[03:06:17] TEACHER: on SSE and not the actual connection connection.   {#3032}
[03:06:22] STUDENT_1: Yeah.   {#3033}
[03:06:22] STUDENT_1: And one more follow up question.   {#3034}
[03:06:23] STUDENT_1: So like what if you have to design a read heavy API, right?   {#3035}
[03:06:28] STUDENT_1: And, and, and, and basically relies on a data, which is sitting on a database.   {#3036}
[03:06:33] STUDENT_1: So even though we have a database, which is replicated across data centers, so you'll   {#3037}
[03:06:38] STUDENT_1: one master and then you have some replica sitting on cross data center street but then uh you cannot   {#3038}
[03:06:43] STUDENT_1: cache entire data into the cache because it's like a bit of data uh so how how can you design that   {#3039}
[03:06:49] STUDENT_1: read heavy apis because you cannot cache everything you cannot if you cannot cache everything how how   {#3040}
[03:06:54] TEACHER: would you do that like you need to have replicas the only way to do is with replicas have redundant   {#3041}
[03:07:01] TEACHER: copies of data and some reads from there.   {#3042}
[03:07:04] TEACHER: There is no other way.   {#3043}
[03:07:07] STUDENT_1: Right.   {#3044}
[03:07:08] STUDENT_1: Okay.   {#3045}
[03:07:08] STUDENT_1: So like, for example, you, you increase the API servers, right.   {#3046}
[03:07:12] STUDENT_1: And on the back, you'll have to continuously increase the replica.   {#3047}
[03:07:15] STUDENT_5: Add replicas.   {#3048}
[03:07:16] TEACHER: Yes.   {#3049}
[03:07:17] TEACHER: Yes.   {#3050}
[03:07:18] TEACHER: Otherwise one database would handle like, like one database has a limitation on the   {#3051}
[03:07:21] TEACHER: number of requests that it can handle.   {#3052}
[03:07:24] TEACHER: There is no way.   {#3053}
[03:07:25] STUDENT_8: We have some limited connections.   {#3054}
[03:07:30] STUDENT_1: But are we going to cover those caching strategies?   {#3055}
[03:07:33] TEACHER: Yeah, yeah, yeah.   {#3056}
[03:07:34] TEACHER: To some extent.   {#3057}
[03:07:35] TEACHER: Yes.   {#3058}
[03:07:36] TEACHER: Well, see now it's just first week, right?   {#3059}
[03:07:38] TEACHER: It's just first week.   {#3060}
[03:07:39] TEACHER: There's seven more to go.   {#3061}
[03:07:40] TEACHER: We have far too many systems to cover.   {#3062}
[03:07:42] TEACHER: We have far too many practices to look at.   {#3063}
[03:07:44] TEACHER: We have far too many patterns to observe.   {#3064}
[03:07:46] TEACHER: Okay.   {#3065}
[03:07:47] TEACHER: A lot of things will be.   {#3066}
[03:07:50] TEACHER: Pankaj.   {#3067}
[03:07:52] STUDENT_10: Just a quick, quick confirmation in this servers and events, the connection is   {#3068}
[03:07:57] STUDENT_10: is still bi-directional just the client is not using it right?   {#3069}
[03:08:00] STUDENT_10: No.   {#3070}
[03:08:01] TEACHER: The connection itself is the protocol specification does not allow client to send something.   {#3071}
[03:08:09] TEACHER: Okay.   {#3072}
[03:08:10] TEACHER: Okay.   {#3073}
[03:08:11] TEACHER: Yeah.   {#3074}
[03:08:12] TEACHER: Right.   {#3075}
[03:08:13] TEACHER: So that's how protocols are implemented.   {#3076}
[03:08:15] TEACHER: That's what the specifications are implemented.   {#3077}
[03:08:17] STUDENT_5: So they don't allow client to send something.   {#3078}
[03:08:19] STUDENT_5: They don't give a way for client to send something to the server.   {#3079}
[03:08:23] STUDENT_10: Okay.   {#3080}
[03:08:26] STUDENT_10: Yeah. So basically the TC connection, which is established, it will allow bi-directional   {#3081}
[03:08:31] STUDENT_10: communication, but the protocol with written on top of it is not allowed.   {#3082}
[03:08:35] STUDENT_16: Okay. Thanks. Yeah. Anuqa.   {#3083}
[03:08:40] STUDENT_3: Here, another question on web sockets and server sentiments. So if we have a proxy or   {#3084}
[03:08:47] STUDENT_3: a load balancer in our system before the server, then the TCP connection that the client has   {#3085}
[03:08:54] STUDENT_3: will be with the proxy and the load balancer.   {#3086}
[03:08:57] STUDENT_3: Yes.   {#3087}
[03:08:57] STUDENT_3: They have the responsibility of propagating that to the server.   {#3088}
[03:09:01] STUDENT_14: Yes.   {#3089}
[03:09:02] STUDENT_3: Understood.   {#3090}
[03:09:04] STUDENT_3: Thank you.   {#3091}
[03:09:05] STUDENT_8: Yeah, Ranjit.   {#3092}
[03:09:07] STUDENT_8: Arpit, just one question on the replica set that you mentioned.   {#3093}
[03:09:11] STUDENT_8: So when the API servers are being added to address scale,   {#3094}
[03:09:16] STUDENT_8: the logic and I noted that you mentioned that the logic   {#3095}
[03:09:20] STUDENT_8: would be at the business side,   {#3096}
[03:09:21] STUDENT_8: the business logic side of the API server, right?   {#3097}
[03:09:24] STUDENT_8: replicas that should it go to.   {#3098}
[03:09:26] STUDENT_8: Correct.   {#3099}
[03:09:26] STUDENT_8: I also noted you mentioned read replicas, right?   {#3100}
[03:09:29] STUDENT_8: So is it a cardinal rule as in a read replica or replica could be a read, right?   {#3101}
[03:09:34] TEACHER: If you are having a read replica, then it is a multi master.   {#3102}
[03:09:37] TEACHER: Okay.   {#3103}
[03:09:38] TEACHER: Okay.   {#3104}
[03:09:38] TEACHER: Multi master comes with its own set of challenges.   {#3105}
[03:09:41] TEACHER: So when I say read replica, it is just there to solve the read.   {#3106}
[03:09:43] STUDENT_8: Because, because let's say your system, I mean, your scale is such, which is increasing   {#3107}
[03:09:48] STUDENT_8: and you've got one master and you've got read replicas.   {#3108}
[03:09:51] STUDENT_8: and then you realize that you're scaling on at the API server level,   {#3109}
[03:09:54] STUDENT_8: but you know, really the master is taking all the rights.   {#3110}
[03:09:58] STUDENT_1: You will have to distribute them, isn't it?   {#3111}
[03:10:01] TEACHER: Yeah.   {#3112}
[03:10:01] TEACHER: So replica, if you are having multi-master,   {#3113}
[03:10:04] TEACHER: then you have to handle conflicts.   {#3114}
[03:10:05] TEACHER: And that is extremely use case specific.   {#3115}
[03:10:08] TEACHER: How you handle conflicts in a multi-master setup.   {#3116}
[03:10:10] TEACHER: So that is where sharding is preferred.   {#3117}
[03:10:12] TEACHER: Right.   {#3118}
[03:10:13] TEACHER: So read replicas, sharding, and then you go into multi-master   {#3119}
[03:10:17] TEACHER: if you want to make things overtly complicated.   {#3120}
[03:10:20] TEACHER: Understood. Understood. Okay.   {#3121}
[03:10:22] TEACHER: Yeah.   {#3122}
[03:10:23] TEACHER: Chira.   {#3123}
[03:10:25] STUDENT_2: Yeah. Hi, Akrat.   {#3124}
[03:10:26] STUDENT_2: So just wanted to add to Anupal's question, right?   {#3125}
[03:10:30] STUDENT_2: So he asked that if there's a proxy or load balancer in between,   {#3126}
[03:10:35] STUDENT_2: then client will connect to the proxy and then proxy will connect with the server.   {#3127}
[03:10:41] STUDENT_2: Right?   {#3128}
[03:10:41] STUDENT_14: Yes.   {#3129}
[03:10:42] STUDENT_2: So I think it depends, right?   {#3130}
[03:10:45] STUDENT_2: That if it is a layer four or layer seven proxy,   {#3131}
[03:10:48] STUDENT_2: because if it is a layer four proxy, then the client will directly connect with the server.   {#3132}
[03:10:58] STUDENT_2: So it will be kind of a two connection, but there would be a single tunnel.   {#3133}
[03:11:04] TEACHER: It does not matter.   {#3134}
[03:11:06] TEACHER: At the end, the data will go through them.   {#3135}
[03:11:09] STUDENT_2: Correct?   {#3136}
[03:11:10] STUDENT_2: Yeah.   {#3137}
[03:11:10] STUDENT_2: Yeah.   {#3138}
[03:11:11] STUDENT_2: Yeah.   {#3139}
[03:11:11] STUDENT_2: That's true.   {#3140}
[03:11:11] STUDENT_2: It's just that if we have a kind of layer seven load balancer, then it can make intelligent   {#3141}
[03:11:19] STUDENT_2: decision.   {#3142}
[03:11:20] STUDENT_2: Right.   {#3143}
[03:11:21] TEACHER: But if you are only, if you're only forwarding, if you're rather, if you're only routing the   {#3144}
[03:11:26] TEACHER: messages here and there, it really does not matter.   {#3145}
[03:11:29] TEACHER: And if it's layer four or layer seven, and in most cases like this, that's exactly what   {#3146}
[03:11:33] TEACHER: we do.   {#3147}
[03:11:34] TEACHER: We just relay the messages back and forth.   {#3148}
[03:11:36] STUDENT_4: Yeah.   {#3149}
[03:11:37] STUDENT_4: Makes sense.   {#3150}
[03:11:38] STUDENT_3: Thank you.   {#3151}
[03:11:39] STUDENT_3: So, I just wanted to add to the server's sentiment for web software.   {#3152}
[03:11:47] STUDENT_3: So we actually use it for like on-prem stuff that we have.   {#3153}
[03:11:53] STUDENT_3: So there are no inbound connections that are allowed, but only outbound connection from   {#3154}
[03:11:58] STUDENT_3: the client side is like a setup via web software and then server side communication happens   {#3155}
[03:12:07] STUDENT_3: to that.   {#3156}
[03:12:08] STUDENT_5: Oh, nice.   {#3157}
[03:12:10] STUDENT_5: And, uh, what do you stream?   {#3158}
[03:12:12] STUDENT_5: Like what, what kind of data do you stream on that?   {#3159}
[03:12:14] STUDENT_3: So like, for like, it's not specifically for streaming, like, uh, use cases.   {#3160}
[03:12:20] STUDENT_3: Like, so there are on-prem, uh, virtual machines are there, like VMware or something.   {#3161}
[03:12:26] STUDENT_3: So if you want to perform automations on that, on top of that, so there is no   {#3162}
[03:12:31] STUDENT_3: inbound connection allowed.   {#3163}
[03:12:33] STUDENT_3: So from there is polling, which, which will send, you know, a request, uh,   {#3164}
[03:12:39] STUDENT_3: from on-prem to our servers and then we will get it.   {#3165}
[03:12:43] STUDENT_3: So only outbound connection is open.   {#3166}
[03:12:46] TEACHER: Nice.   {#3167}
[03:12:47] TEACHER: Got that.   {#3168}
[03:12:48] STUDENT_3: From on-premise.   {#3169}
[03:12:50] TEACHER: Happy to see servers and events in production.   {#3170}
[03:12:52] TEACHER: Very few companies do that.   {#3171}
[03:12:54] TEACHER: Everyone just says, let's just use WebSockets   {#3172}
[03:12:57] TEACHER: just in case we might have to do bidirectional communication.   {#3173}
[03:13:04] STUDENT_3: Also, one more thing I wanted to ask about was   {#3174}
[03:13:09] STUDENT_3: So RabbitMQ and, you know, I mean, in, in sense of queuing and streams.   {#3175}
[03:13:15] STUDENT_3: So there are persistent queues that are also available in RabbitMQ, right?   {#3176}
[03:13:20] STUDENT_3: Yeah.   {#3177}
[03:13:20] STUDENT_3: So like why, if I want multiple consumers and, you know, persistent stream is there, then   {#3178}
[03:13:29] STUDENT_3: you can use that.   {#3179}
[03:13:31] TEACHER: But see, while my course is moving forward in time,   {#3180}
[03:13:35] TEACHER: database or queue developers are also moving forward in time.   {#3181}
[03:13:40] TEACHER: They are also building features, right?   {#3182}
[03:13:42] TEACHER: So there is no hard and bound rule.   {#3183}
[03:13:43] TEACHER: Today, like as I said, MongoDB never wanted ACID property,   {#3184}
[03:13:47] TEACHER: but now it supports ACID property.   {#3185}
[03:13:48] TEACHER: So if I say that MongoDB does not support ACID,   {#3186}
[03:13:50] TEACHER: that would be wrong.   {#3187}
[03:13:51] TEACHER: Or no SQL does not support ACID, that is wrong.   {#3188}
[03:13:54] TEACHER: So a lot of things progress, right?   {#3189}
[03:13:57] TEACHER: So there might be new features that let's say basically   {#3190}
[03:14:00] TEACHER: Kafka broadcast is there.   {#3191}
[03:14:01] TEACHER: which solves kind of real-time pubs of use case.   {#3192}
[03:14:03] TEACHER: So we cannot just say Kafka does not support real-time pubs.   {#3193}
[03:14:06] TEACHER: So generic statements are typically tend to avoid.   {#3194}
[03:14:08] TEACHER: That's why I'm just going to specific details of that, that, Hey,   {#3195}
[03:14:11] TEACHER: rapid MQ is mostly known as a message queue, but it has persistent   {#3196}
[03:14:15] TEACHER: use that kind of solves the message streams kind of use case.   {#3197}
[03:14:19] TEACHER: But there is no hard rule ever because every engineer is coding   {#3198}
[03:14:23] TEACHER: and they are all making their tools better and better.   {#3199}
[03:14:25] TEACHER: And the world is converging.   {#3200}
[03:14:27] TEACHER: If you look at it, all databases are converging to being exactly   {#3201}
[03:14:31] TEACHER: They look like one of them nowadays.   {#3202}
[03:14:34] TEACHER: Like MySQL supports JSON, Postgres support JSON, MongoDB supports this.   {#3203}
[03:14:38] TEACHER: There are white columns which support asset compliance.   {#3204}
[03:14:41] TEACHER: Hudi supports transactions and whatnot.   {#3205}
[03:14:44] TEACHER: And everyone is doing everything because building is easy.   {#3206}
[03:14:49] TEACHER: Got it.   {#3207}
[03:14:50] STUDENT_4: Thank you.   {#3208}
[03:14:52] STUDENT_5: Any other question, anyone?   {#3209}
[03:14:57] STUDENT_5: Great.   {#3210}
[03:14:58] STUDENT_5: See you folks next week.   {#3211}
[03:15:01] STUDENT_5: the end of the day i'll shoot anyway thanks folks it was fab bye bye thanks bye everyone   {#3212}
