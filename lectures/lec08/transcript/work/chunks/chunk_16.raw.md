# chunk_16  OWNS 02:58:14 -> 03:10:25  (segments #3048-#3299, 2197 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:57:17] STUDENT_2: now that's the beauty of it yeah and starting you feel like i mean so much complexity but when you   {#3024}
CTX| [02:57:22] STUDENT_2: get into the details you you just feel fun then it gets an inertia to do more and more and more   {#3025}
CTX| [02:57:27] TEACHER: classic example load balancer i'm sure you would be intimidated by it but now you think of it it's   {#3026}
CTX| [02:57:34] TEACHER: so easy right right similarly just to digress from the discussion since yesterday evening   {#3027}
CTX| [02:57:41] TEACHER: I am obsessed by writing my own malloc.   {#3028}
CTX| [02:57:44] TEACHER: I am obsessed.   {#3029}
CTX| [02:57:46] TEACHER: I am obsessed.   {#3030}
CTX| [02:57:47] TEACHER: I am driving deep into how memory management happens   {#3031}
CTX| [02:57:49] TEACHER: at operating system level.   {#3032}
CTX| [02:57:51] TEACHER: How program gets memory?   {#3033}
CTX| [02:57:53] TEACHER: Where exactly is this heap?   {#3034}
CTX| [02:57:54] TEACHER: We say, this is allocated in heap.   {#3035}
CTX| [02:57:56] TEACHER: Where, Baba, where is this heap?   {#3036}
CTX| [02:57:57] TEACHER: It has to be somewhere in RAM.   {#3037}
CTX| [02:57:59] TEACHER: But where?   {#3038}
CTX| [02:58:00] TEACHER: How?   {#3039}
CTX| [02:58:00] TEACHER: How it is linked?   {#3040}
CTX| [02:58:01] TEACHER: I am planning to write my own malloc today.   {#3041}
CTX| [02:58:04] STUDENT_2: You have to do your own inodes and all those things.   {#3042}
CTX| [02:58:06] STUDENT_2: No, no.   {#3043}
CTX| [02:58:07] TEACHER: Inodes is file system.   {#3044}
CTX| [02:58:08] TEACHER: Inodes is file system.   {#3045}
CTX| [02:58:09] TEACHER: Malloc is in memory allocation.   {#3046}
CTX| [02:58:11] TEACHER: allocation.   {#3047}

---- OWNED SEGMENTS START ----
[02:58:14] TEACHER: Implementation,   {#3048}
[02:58:14] TEACHER: the devil lies in the   {#3049}
[02:58:16] TEACHER: details. If you don't implement,   {#3050}
[02:58:18] TEACHER: I would have never been able to answer your   {#3051}
[02:58:20] TEACHER: question if I would not have implemented it.   {#3052}
[02:58:22] TEACHER: Correct?   {#3053}
[02:58:24] TEACHER: That's the difference.   {#3054}
[02:58:27] TEACHER: Last 10 years,   {#3055}
[02:58:28] TEACHER: I have   {#3056}
[02:58:30] TEACHER: 180 projects,   {#3057}
[02:58:32] TEACHER: 80 repos on GitHub.   {#3058}
[02:58:34] TEACHER: A lot of them are private.   {#3059}
[02:58:36] STUDENT_5: 180 repos on GitHub.   {#3060}
[02:58:38] STUDENT_5: Think how many things I've implemented.   {#3061}
[02:58:41] STUDENT_2: What pushed you basically?   {#3062}
[02:58:42] STUDENT_2: You mean what, I mean, when I just tried to implement something, uh, that's your complexity.   {#3063}
[02:58:47] TEACHER: I'm in love with engineering.   {#3064}
[02:58:49] TEACHER: I find the scrappiest way to build.   {#3065}
[02:58:51] TEACHER: I don't, I don't think of time.   {#3066}
[02:58:54] TEACHER: I just study.   {#3067}
[02:58:56] TEACHER: I can study 24 hours a day.   {#3068}
[02:58:58] TEACHER: Even morning before the lecture, I was reading, uh, I was reading, uh, official documentation   {#3069}
[02:59:03] TEACHER: of the system calls that allocates memories in RAM.   {#3070}
[02:59:06] TEACHER: and I read it till 8 45 and then I started this meeting even if I have 50 minutes I'll read   {#3071}
[02:59:12] TEACHER: something I just love it I just love coding it out that's see I'm very intrinsically motivated   {#3072}
[02:59:19] TEACHER: to do this to know these details it just gives me those kick that I always wanted   {#3073}
[02:59:24] TEACHER: Netflix Netflix I don't watch most I just do this I love this but I get some I lose some   {#3074}
[02:59:30] TEACHER: I don't know what people talk about when they talk about Breaking Bad and those kind of stuff   {#3075}
[02:59:36] TEACHER: but when I talk about this they don't know   {#3076}
[02:59:37] TEACHER: about this stuff so you win some you will   {#3077}
[02:59:39] TEACHER: but it's fine so long as I have   {#3078}
[02:59:41] TEACHER: the smile on my face I don't care   {#3079}
[02:59:43] TEACHER: it's simple   {#3080}
[02:59:45] STUDENT_13: thank you   {#3081}
[02:59:48] STUDENT_3: Sidesh   {#3082}
[02:59:49] STUDENT_3: I have two questions the first one is   {#3083}
[02:59:51] STUDENT_3: on the load balance of thing if you can   {#3084}
[02:59:53] TEACHER: wait wait first locking   {#3085}
[02:59:55] STUDENT_3: okay   {#3086}
[02:59:56] STUDENT_3: I see sorry   {#3087}
[02:59:58] STUDENT_3: so with respect to locking   {#3088}
[03:00:01] STUDENT_3: one question is   {#3089}
[03:00:03] STUDENT_3: with respect to yeah I understand   {#3090}
[03:00:05] STUDENT_3: and all of that. My question is more on the practical front. If you really want to do this,   {#3091}
[03:00:12] STUDENT_3: why would we not prefer something like Zookeeper, which gives us a interface to say you have a   {#3092}
[03:00:18] STUDENT_3: leader and then implement a in-memory locking, which is more reliable. Who wrote Zookeeper?   {#3093}
[03:00:24] TEACHER: How it is implemented? It does exactly what I talk about. Exactly this. So either you implement   {#3094}
[03:00:32] TEACHER: with red ace or do you use zookeeper but i mean the guarantees are different right like for example   {#3095}
[03:00:39] STUDENT_3: in no no like for example in this we can find a lot of problems right with respect to time acquire   {#3096}
[03:00:46] STUDENT_3: expire network boundness and all zoociper will give us a lot more guarantees and with respect   {#3097}
[03:00:52] STUDENT_3: like like it has a like basically if you have a leader it has a persistent leader   {#3098}
[03:00:58] TEACHER: so if here you can add persistence also and i'm not saying this is better than zookeeper   {#3099}
[03:01:02] TEACHER: i'm saying this is another implementation of it and i'm not saying no to zookeeper   {#3100}
[03:01:06] TEACHER: right but if i just say are you zookeeper someone will ask how that is implemented   {#3101}
[03:01:12] TEACHER: as an engineer we need to know how it is implemented for example no no i i i agree with you yeah yeah   {#3102}
[03:01:18] TEACHER: i'll just give an example what we talked about around uh in node balancer itself i'll give you   {#3103}
[03:01:25] TEACHER: this, what we talk about is Redis PubServe.   {#3104}
[03:01:28] TEACHER: You can replace it with Zookeeper, right?   {#3105}
[03:01:31] TEACHER: Zookeeper has a distributed store, config store.   {#3106}
[03:01:34] TEACHER: Something is updated.   {#3107}
[03:01:36] TEACHER: Everyone else gets notified.   {#3108}
[03:01:38] TEACHER: Correct.   {#3109}
[03:01:39] TEACHER: Classic feature of Zookeeper.   {#3110}
[03:01:40] TEACHER: How that is implemented here.   {#3111}
[03:01:42] TEACHER: I've done it with Redis.   {#3112}
[03:01:44] TEACHER: You replace Redis with Zookeeper, but internally there has to be a   {#3113}
[03:01:48] TEACHER: persistent connection on which someone notifies it and it broadcast it to   {#3114}
[03:01:52] TEACHER: someone else.   {#3115}
[03:01:55] TEACHER: zookeepers notification framework is just real-time pubs up that's literally what it does   {#3116}
[03:01:59] TEACHER: maintains a pool of ccp connection connects it when someone changes it notifies all of them who   {#3117}
[03:02:04] TEACHER: are subscribed to it that's exactly what we do with this so that's what i said core properties   {#3118}
[03:02:10] TEACHER: i showed you a simple way to implement it you can replace this entire thing with zookeeper and a   {#3119}
[03:02:15] TEACHER: system would work just fine because it is giving you those exact same properties that you are   {#3120}
[03:02:19] TEACHER: extracting by buildings.   {#3121}
[03:02:22] STUDENT_3: Yeah, I was, I was going to ask the same question.   {#3122}
[03:02:27] STUDENT_3: I had that feeling.   {#3123}
[03:02:30] STUDENT_3: No, I mean, I have one more question, but I think I'll come back again.   {#3124}
[03:02:34] TEACHER: But basically this is where I always say, right.   {#3125}
[03:02:36] TEACHER: Focus on the poor properties that you know, what we did, what we wanted was like a persistent   {#3126}
[03:02:40] TEACHER: connection in a real time.   {#3127}
[03:02:42] TEACHER: Zookeepers notification framework is exactly that.   {#3128}
[03:02:44] TEACHER: So you zookeeper if you are more comfortable.   {#3129}
[03:02:46] STUDENT_3: Yeah, I mean, what I wanted to ask was with respect to like, uh, the understanding implementation   {#3130}
[03:02:52] STUDENT_3: and internal details sounds great.   {#3131}
[03:02:54] STUDENT_3: When, if you want to choose one, I just wanted to understand your opinion.   {#3132}
[03:02:59] TEACHER: Okay.   {#3133}
[03:03:00] TEACHER: So zookeeper, a lot of people, a lot of, uh, young organizations, they stay away from zookeeper.   {#3134}
[03:03:06] TEACHER: They think zookeeper is Java bomb.   {#3135}
[03:03:08] TEACHER: There are plugins for you to integrate it in other languages, but a lot of people stay   {#3136}
[03:03:12] TEACHER: away from zookeeper thinking, oh my God, it's too much.   {#3137}
[03:03:15] TEACHER: A lot of people are intimidated by it.   {#3138}
[03:03:17] TEACHER: For them, this seems much simpler.   {#3139}
[03:03:19] TEACHER: They're very comfortable with release.   {#3140}
[03:03:20] TEACHER: They can scrap, they can create a scrappy solution out of it.   {#3141}
[03:03:24] TEACHER: I see.   {#3142}
[03:03:25] TEACHER: Okay.   {#3143}
[03:03:25] TEACHER: So it's more about having that inclination towards something.   {#3144}
[03:03:29] TEACHER: Because as soon as people hear the term zookeeper,   {#3145}
[03:03:31] TEACHER: first thing that comes their mind is Java.   {#3146}
[03:03:33] TEACHER: A lot of startups are not in Java.   {#3147}
[03:03:34] TEACHER: They say, okay, God, I have to use Java for this.   {#3148}
[03:03:37] TEACHER: They start giving up.   {#3149}
[03:03:38] TEACHER: So that's where focusing on the core properties and attributes of it.   {#3150}
[03:03:44] TEACHER: Makes more sense.   {#3151}
[03:03:45] TEACHER: If it's zookeeper that gives you that use it, redis gives you that use it, DynamoDB,   {#3152}
[03:03:49] TEACHER: MySQL and whatnot.   {#3153}
[03:03:51] TEACHER: And then what matters to you is the core properties.   {#3154}
[03:03:53] TEACHER: Right.   {#3155}
[03:03:53] TEACHER: But now when you're making those decisions, if you're comfortable with that stack adopt,   {#3156}
[03:03:58] TEACHER: some people are comfortable with zookeeper.   {#3157}
[03:04:00] TEACHER: Some people are comfortable with redis.   {#3158}
[03:04:02] TEACHER: Right.   {#3159}
[03:04:04] STUDENT_1: Thanks.   {#3160}
[03:04:05] STUDENT_1: Okay.   {#3161}
[03:04:05] STUDENT_1: Sunit.   {#3162}
[03:04:08] STUDENT_1: This question is about, uh, Q's only again, I had like, no, this doubt, uh, can consumer   {#3163}
[03:04:15] STUDENT_1: read multiple messages in parallel or it can read only one message.   {#3164}
[03:04:20] STUDENT_1: We did.   {#3165}
[03:04:21] STUDENT_9: We added a hypothetical concept of reading one message.   {#3166}
[03:04:24] STUDENT_1: Okay.   {#3167}
[03:04:25] STUDENT_1: In real time, like no consumers can read like multiple messages from   {#3168}
[03:04:29] TEACHER: depends on queue guarantee, because if I say yes to this, I can also, I can only   {#3169}
[03:04:34] TEACHER: create a open source queue that does not give you those guarantees.   {#3170}
[03:04:37] TEACHER: So it depends on the queues that you are using.   {#3171}
[03:04:40] TEACHER: SQS has different guarantees.   {#3172}
[03:04:41] TEACHER: RabbitMQS different guarantees.   {#3173}
[03:04:42] TEACHER: Kafka has different guarantees.   {#3174}
[03:04:44] TEACHER: Right.   {#3175}
[03:04:45] TEACHER: you're using, see the kind of parent is it covers the reason for asking, right.   {#3176}
[03:04:49] STUDENT_1: Each consumer is a mission has like no multiple, like no course.   {#3177}
[03:04:52] STUDENT_1: So that means it can generate like no multiple processes, multiple threads,   {#3178}
[03:04:56] STUDENT_1: right.   {#3179}
[03:04:57] STUDENT_1: Only one thread like no can read like no message at a time.   {#3180}
[03:05:00] STUDENT_1: So multiple threads can read like multiple messages from Q, right.   {#3181}
[03:05:03] STUDENT_1: To increase like no processing speed.   {#3182}
[03:05:07] STUDENT_1: So I mean, how it happens in the L time usually.   {#3183}
[03:05:10] STUDENT_1: So that is my question.   {#3184}
[03:05:11] TEACHER: No, that is Q internal.   {#3185}
[03:05:13] TEACHER: That's very different from this discussion.   {#3186}
[03:05:15] TEACHER: that would take us in very different direction.   {#3187}
[03:05:16] TEACHER: But what I would recommend is wait till week seven, week seven, we'll implement our own   {#3188}
[03:05:20] TEACHER: message broker.   {#3189}
[03:05:21] TEACHER: Tell your learners and how we get max to put out.   {#3190}
[03:05:23] STUDENT_1: Okay.   {#3191}
[03:05:24] STUDENT_1: Let me put my question other way, whether Q would allow like no consumer to read like   {#3192}
[03:05:28] STUDENT_1: no multiple messages at a time, which Q message Q.   {#3193}
[03:05:35] STUDENT_1: This message Q.   {#3194}
[03:05:37] STUDENT_1: Yes.   {#3195}
[03:05:37] STUDENT_1: Yes.   {#3196}
[03:05:38] STUDENT_1: That's what I'm asking.   {#3197}
[03:05:39] TEACHER: This Q is a hypothetical example.   {#3198}
[03:05:41] TEACHER: As I said, okay.   {#3199}
[03:05:44] TEACHER: I am not guaranteeing those things that you're talking about.   {#3200}
[03:05:47] TEACHER: This is a hypothetical, which is what I started with.   {#3201}
[03:05:49] STUDENT_1: I mean, if you take any example, let's say SQS, like from AWS, go through the documentation.   {#3202}
[03:05:55] TEACHER: Now, if they give you those guarantees or not, if you're allowed to, SQS gives you ability   {#3203}
[03:06:00] TEACHER: to read 10 messages at a time in one call.   {#3204}
[03:06:03] TEACHER: If you would want to know those details, but you can anyway, find this in their documentation.   {#3205}
[03:06:07] TEACHER: Yeah.   {#3206}
[03:06:07] TEACHER: Just a Google search away from that.   {#3207}
[03:06:09] STUDENT_15: All right.   {#3208}
[03:06:10] STUDENT_15: Yeah.   {#3209}
[03:06:15] STUDENT_1: Is it the right time to ask the LB question now or should I wait any other question on locking anyone?   {#3210}
[03:06:23] STUDENT_1: Okay, go on. Yeah. So first question is, so as we have discussed that, you know, with the DNS,   {#3211}
[03:06:29] STUDENT_1: we are deciding that, you know, once this, so let's say we are using three, four load balancers.   {#3212}
[03:06:34] STUDENT_1: So once there is more load on the first load balancer, then DNS will start routing to the   {#3213}
[03:06:41] STUDENT_1: So how DNS will not...   {#3214}
[03:06:43] STUDENT_1: No, no, no.   {#3215}
[03:06:43] STUDENT_1: That's not what I said.   {#3216}
[03:06:44] TEACHER: That's not what I said.   {#3217}
[03:06:45] TEACHER: Wait, wait, wait.   {#3218}
[03:06:45] TEACHER: That's not what I said.   {#3219}
[03:06:47] TEACHER: DNS will not route it to other load balancer.   {#3220}
[03:06:50] TEACHER: DNS just has the mapping of a domain to multiple IP addresses.   {#3221}
[03:06:54] TEACHER: It just round robins between them.   {#3222}
[03:06:56] STUDENT_1: That's it.   {#3223}
[03:06:57] STUDENT_1: Okay.   {#3224}
[03:06:58] STUDENT_1: So it doesn't have any way that, you know, that this load balancer has a lot of load.   {#3225}
[03:07:02] STUDENT_1: Then I should, you know, give it the second load balancer.   {#3226}
[03:07:03] STUDENT_1: No, that's what I said.   {#3227}
[03:07:04] TEACHER: It has nothing, no information around it.   {#3228}
[03:07:06] TEACHER: No information, no information around it.   {#3229}
[03:07:10] STUDENT_1: Okay.   {#3230}
[03:07:10] STUDENT_1: And let's say there is a scenario that, you know, let's say somewhere, you know, load balancers are used in an active passive manner.   {#3231}
[03:07:18] STUDENT_1: So let's say I have one load balancer and the other load, which is active and the other load balancer, which is in the passive mode.   {#3232}
[03:07:25] STUDENT_1: So if let's say the first load balancer is going down in that, in that case, the second one will be active.   {#3233}
[03:07:31] STUDENT_1: So how DNS takes that decision that, you know, this load balancer is not working and, you know, I have to start routing the query.   {#3234}
[03:07:38] TEACHER: It would not be there in the IP address.   {#3235}
[03:07:40] TEACHER: IP address will only contain active load balancer IP address.   {#3236}
[03:07:45] TEACHER: But or otherwise wait or otherwise do a weighted round Robin, give a weight of zero to that other   {#3237}
[03:07:51] STUDENT_1: one and one to other one. So that means you're trying to say if one load balancer goes down.   {#3238}
[03:07:57] STUDENT_1: So in that case, in the active passive mode, I'm asking in the passive one, then we have to, you   {#3239}
[03:08:02] STUDENT_1: know, manually update it in the load balancer. Okay. This one is down. We have to not load   {#3240}
[03:08:06] STUDENT_1: answer on DNS or DNS, sorry, on DNS, we have to manually orchestrator is doing that, right?   {#3241}
[03:08:12] TEACHER: Orchestrator would know when is going down.   {#3242}
[03:08:14] TEACHER: Other is coming back.   {#3243}
[03:08:15] TEACHER: Someone would know, right?   {#3244}
[03:08:17] STUDENT_1: But see, DNS has to know the IP address, which one is active right now.   {#3245}
[03:08:22] TEACHER: So our DNS knows, right?   {#3246}
[03:08:26] TEACHER: Orchestrator would know IP addresses of all the load balancer servers.   {#3247}
[03:08:29] TEACHER: It is the one who is adding that.   {#3248}
[03:08:31] TEACHER: Orchester is the one who is updating the DNS about it.   {#3249}
[03:08:34] STUDENT_1: Okay.   {#3250}
[03:08:34] STUDENT_1: Okay.   {#3251}
[03:08:36] STUDENT_1: directly update, directly   {#3252}
[03:08:38] STUDENT_1: has to know. DNS has no brains.   {#3253}
[03:08:40] STUDENT_5: DNS is a stupid service.   {#3254}
[03:08:42] STUDENT_5: It just stores a hash map. That's it.   {#3255}
[03:08:45] STUDENT_1: Got it. Got it. Yeah.   {#3256}
[03:08:47] STUDENT_1: Okay. Yeah. Thank you.   {#3257}
[03:08:48] STUDENT_1: That answers my question.   {#3258}
[03:08:50] STUDENT_8: My question is on session handling.   {#3259}
[03:08:53] STUDENT_8: So when there are multiple   {#3260}
[03:08:54] STUDENT_8: servers, is session handling,   {#3261}
[03:08:56] STUDENT_8: do we need a different session   {#3262}
[03:08:58] STUDENT_8: service or using consistent   {#3263}
[03:09:00] STUDENT_8: hashing we can route request of a   {#3264}
[03:09:02] STUDENT_8: particular user to the same server every time?   {#3265}
[03:09:05] STUDENT_8: Which one is better?   {#3266}
[03:09:06] TEACHER: You gave the answer.   {#3267}
[03:09:07] TEACHER: Why would you want to have separate services?   {#3268}
[03:09:09] TEACHER: Imagine adding a separate service, adding a new network hop.   {#3269}
[03:09:12] TEACHER: Why?   {#3270}
[03:09:14] TEACHER: Everything's over here.   {#3271}
[03:09:15] TEACHER: Load balancing strategy.   {#3272}
[03:09:17] TEACHER: Consistent hashing is not a service.   {#3273}
[03:09:18] TEACHER: It's a normal array.   {#3274}
[03:09:21] TEACHER: It's a normal array of data.   {#3275}
[03:09:23] TEACHER: That's it.   {#3276}
[03:09:24] TEACHER: It all runs here in memory of LB server.   {#3277}
[03:09:26] TEACHER: That's it.   {#3278}
[03:09:27] TEACHER: Request comes in.   {#3279}
[03:09:27] TEACHER: It finds way to forward it.   {#3280}
[03:09:29] TEACHER: It forwards with them.   {#3281}
[03:09:31] TEACHER: Okay, cool.   {#3282}
[03:09:33] TEACHER: Don't just add services for the sake of it.   {#3283}
[03:09:36] TEACHER: Every service is a network hop.   {#3284}
[03:09:38] TEACHER: Right?   {#3285}
[03:09:39] TEACHER: So at scale, we optimize for not even exaggerating every microsecond as well.   {#3286}
[03:09:46] TEACHER: So I've seen discussions where every single network hop is challenged.   {#3287}
[03:09:50] TEACHER: Why do you need it?   {#3288}
[03:09:52] TEACHER: A good architecture that I've seen only had four microservice, but it handled petabytes   {#3289}
[03:09:55] TEACHER: of data.   {#3290}
[03:09:56] TEACHER: Just adding random boxes in a design is a bad idea.   {#3291}
[03:10:01] TEACHER: Unless you have a very good justification for that.   {#3292}
[03:10:03] TEACHER: What's the job of it?   {#3293}
[03:10:05] TEACHER: Don't add random boxes because it just slows things down because every network call three   {#3294}
[03:10:10] TEACHER: to five to 10 milliseconds of latency is added.   {#3295}
[03:10:13] TEACHER: Why?   {#3296}
[03:10:13] TEACHER: Just don't do it.   {#3297}
[03:10:15] TEACHER: See where you would see the shortest path possible and try to accommodate it there.   {#3298}
[03:10:21] STUDENT_8: Okay.   {#3299}
---- OWNED SEGMENTS END ----

CTX| [03:10:25] STUDENT_8: If we are using round robin algorithm, then we will need another session.   {#3300}
CTX| [03:10:31] TEACHER: Why session?   {#3301}
CTX| [03:10:32] TEACHER: We just saw the implementation in the code, right?   {#3302}
CTX| [03:10:34] TEACHER: Go through the recording.   {#3303}
CTX| [03:10:37] TEACHER: We have covered it.   {#3304}
CTX| [03:10:38] TEACHER: It just keeps track of an integer, the index in the array that this is where I sent it.   {#3305}
CTX| [03:10:43] TEACHER: Now this is where I want to send it.   {#3306}
CTX| [03:10:44] TEACHER: Now this is where I want to send it.   {#3307}
CTX| [03:10:46] STUDENT_5: Okay.   {#3308}
CTX| [03:10:47] STUDENT_5: No other service required.   {#3309}
CTX| [03:10:50] STUDENT_1: Sure.   {#3310}
CTX| [03:10:51] STUDENT_1: Thank you.   {#3311}
CTX| [03:10:52] STUDENT_1: Yeah.   {#3312}
CTX| [03:10:53] STUDENT_1: Thanks.   {#3313}
CTX| [03:10:54] STUDENT_1: I wasn't able to understand this load balancer of your computer.   {#3314}
CTX| [03:10:58] STUDENT_1: So will it be okay if I iterate and then ask questions?   {#3315}
CTX| [03:11:01] STUDENT_1: What you are not able to understand?   {#3316}
CTX| [03:11:03] STUDENT_1: The load balancer's workflow.   {#3317}
CTX| [03:11:06] STUDENT_1: The, okay.   {#3318}
CTX| [03:11:09] STUDENT_1: So let's say this core DNS actually has an area of IP addresses of all the load balancer   {#3319}
CTX| [03:11:14] STUDENT_1: servers.   {#3320}
CTX| [03:11:16] STUDENT_5: Right.   {#3321}
CTX| [03:11:17] STUDENT_5: Against the domain name.   {#3322}
CTX| [03:11:19] STUDENT_1: Against the domain name.   {#3323}
CTX| [03:11:22] STUDENT_1: user one comes in, we pick in a round robin fashion and gives it one IP address.   {#3324}
