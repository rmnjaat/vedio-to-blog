# chunk_16  OWNS 02:59:23 -> 03:11:53  (segments #3240-#3481, 2297 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:58:28] TEACHER: consumer and i want to commit when you say commit it means that let's say you have these many   {#3232}
CTX| [02:58:33] TEACHER: messages in kafka and you say that i'm committing you read these many and you say commit are you   {#3233}
CTX| [02:58:42] STUDENT_4: showing something that i cannot no it's there on the screen is it not there uh somehow okay on on   {#3234}
CTX| [02:58:51] TEACHER: Okay.   {#3235}
CTX| [02:58:52] TEACHER: Yeah, go ahead.   {#3236}
CTX| [02:58:52] TEACHER: Yeah. So you read few messages and then you say, commit, when you say commit, it marks on Kafka that this consumer at this ID as committed to this message.   {#3237}
CTX| [02:59:03] TEACHER: So then now you can say to Kafka that read from the last checkpoint or last commit. So it would start. So let's say you consume this few messages and then you crashed.   {#3238}
CTX| [02:59:12] TEACHER: So when you resume, you have an option to resume from horizon or you can resume from last checkpoint. So in that case you would reprocess these many messages.   {#3239}

---- OWNED SEGMENTS START ----
[02:59:23] TEACHER: Okay.   {#3240}
[02:59:24] TEACHER: So you periodically keep on committing to Kafka.   {#3241}
[02:59:27] TEACHER: And if after consuming of you, you crash, when you start, you can start from here.   {#3242}
[02:59:32] TEACHER: In some use cases, you may want to start from here.   {#3243}
[02:59:35] TEACHER: It's very different from where we do, do we want to start?   {#3244}
[02:59:38] TEACHER: So how far you want to go?   {#3245}
[02:59:40] TEACHER: It's more about till your last commit or from horizon or in from right inside, any insights   {#3246}
[02:59:48] STUDENT_4: on is there kind of design related considerations in terms of how far you need to go back?   {#3247}
[02:59:54] TEACHER: Uh, it is use case specific. How far do you want to go back? Because for example, in most   {#3248}
[03:00:01] TEACHER: cases in, to be honest, in most cases, you start from horizon when you're spinning up an entire new   {#3249}
[03:00:08] TEACHER: consumer for Kafka, let's say you never had search service consuming from Kafka. Now we're adding   {#3250}
[03:00:15] TEACHER: search service as a consumer.   {#3251}
[03:00:16] TEACHER: That's when you start from horizon, right?   {#3252}
[03:00:19] TEACHER: In some cases, in most cases, you typically start from the last   {#3253}
[03:00:23] TEACHER: checkpoint when you have already existing.   {#3254}
[03:00:25] TEACHER: Actually, this is how most cases fit in, but you might still find   {#3255}
[03:00:29] TEACHER: some exceptions, but this is how most cases fit in.   {#3256}
[03:00:32] TEACHER: So then let's say you already have a Kafka and now you want to add   {#3257}
[03:00:36] TEACHER: a new consumer to this Kafka, let's say search service.   {#3258}
[03:00:38] TEACHER: Now, what would be better for this search service?   {#3259}
[03:00:40] TEACHER: For it, it would be better if it starts from the first ever   {#3260}
[03:00:42] TEACHER: messages, which is there.   {#3261}
[03:00:45] TEACHER: So it starts from horizon, but if let's say the service was already up and running and   {#3262}
[03:00:50] TEACHER: it just crashed.   {#3263}
[03:00:52] TEACHER: And when it resumed, should it resume from the first ever message?   {#3264}
[03:00:55] TEACHER: No.   {#3265}
[03:00:56] TEACHER: From the last checkpoint, it would resume.   {#3266}
[03:00:58] TEACHER: Right.   {#3267}
[03:00:58] TEACHER: Now, in some cases it's okay that I don't want to resume from the last checkpoint.   {#3268}
[03:01:04] TEACHER: If I lose the data, I lose the data.   {#3269}
[03:01:06] TEACHER: It's perfectly fine.   {#3270}
[03:01:07] TEACHER: I'll start from the, from the current message that, that basically comes into Kafka.   {#3271}
[03:01:12] TEACHER: So these are three possible ways to do it.   {#3272}
[03:01:15] TEACHER: Horizon, last checkpoint or whatever the current is.   {#3273}
[03:01:20] STUDENT_4: So the horizon itself, does it have a big impact on the size of the cluster or anything   {#3274}
[03:01:26] STUDENT_4: that we need to consider in terms of, you know, somebody says, okay, keep it for six   {#3275}
[03:01:29] STUDENT_4: months, for example, as opposed to three 30 days.   {#3276}
[03:01:32] STUDENT_4: Is that a big difference?   {#3277}
[03:01:34] STUDENT_4: For example, we have to worry about it.   {#3278}
[03:01:36] STUDENT_4: Big difference.   {#3279}
[03:01:37] STUDENT_4: Big difference.   {#3280}
[03:01:37] STUDENT_4: Okay.   {#3281}
[03:01:38] TEACHER: Uh, great question.   {#3282}
[03:01:39] TEACHER: Thanks for bringing that up because if you are not having, let's say any deletion policy,   {#3283}
[03:01:43] TEACHER: what does this mean?   {#3284}
[03:01:45] TEACHER: data forever which means you need large amount of space to store it right that becomes a problem   {#3285}
[03:01:51] TEACHER: so if your system is low throughput system low amount of data coming in but you are you still   {#3286}
[03:01:58] TEACHER: have Kafka to have your use cases served you can you can afford to keep the data because it's not   {#3287}
[03:02:07] TEACHER: going to be huge but if you have huge amount of data flowing at very high throughput then having   {#3288}
[03:02:12] TEACHER: a longer retention period means your disk will blow up. So you typically have a deletion policies   {#3289}
[03:02:18] TEACHER: in that case. But now, but let's say if you still want to have a copy of your data, I'm just   {#3290}
[03:02:25] TEACHER: digressing a bit, but it's important to know. Let's say you have Kafka, you have historical data,   {#3291}
[03:02:31] TEACHER: but it's high throughput, high volume service. So which means you, but you still want the data,   {#3292}
[03:02:36] TEACHER: that data is in Kafka.   {#3293}
[03:02:37] TEACHER: You can have a consumer of Kafka   {#3294}
[03:02:40] TEACHER: who is consuming from the old ones   {#3295}
[03:02:42] TEACHER: and archiving it to S3,   {#3296}
[03:02:45] TEACHER: those events,   {#3297}
[03:02:45] TEACHER: and then deleting it from here.   {#3298}
[03:02:48] TEACHER: So that is also one of the ways to go about it.   {#3299}
[03:02:51] TEACHER: Kafka now has plugins to do it   {#3300}
[03:02:53] TEACHER: that before deleting it,   {#3301}
[03:02:55] TEACHER: it takes a bunch of events   {#3302}
[03:02:57] TEACHER: and archives it to S3 or Blob Storage   {#3303}
[03:03:00] TEACHER: or GCS or anything.   {#3304}
[03:03:01] TEACHER: And then it triggers the deletion   {#3305}
[03:03:03] TEACHER: if those events are important.   {#3306}
[03:03:06] STUDENT_7: Okay. Thank you.   {#3307}
[03:03:07] TEACHER: Everything has everything.   {#3308}
[03:03:08] TEACHER: So you can pick your favorite.   {#3309}
[03:03:09] TEACHER: But in most cases, you would most probably start with the last checkpoint.   {#3310}
[03:03:16] TEACHER: Most cases.   {#3311}
[03:03:17] TEACHER: If it's a new one, you would start from Horizon.   {#3312}
[03:03:21] TEACHER: And in some cases, it's okay to skip this data.   {#3313}
[03:03:24] TEACHER: Then you start from the most recent.   {#3314}
[03:03:25] TEACHER: I've seen very few cases doing from here.   {#3315}
[03:03:29] TEACHER: Very few.   {#3316}
[03:03:30] TEACHER: Most do this for the last checkpoint.   {#3317}
[03:03:32] STUDENT_7: Makes sense.   {#3318}
[03:03:33] STUDENT_7: Thank you.   {#3319}
[03:03:34] STUDENT_7: Great.   {#3320}
[03:03:35] TEACHER: DK?   {#3321}
[03:03:37] TEACHER: So Arpit, I have a question related to the SLA here.   {#3322}
[03:03:41] TEACHER: So just now you were discussing things about SLA that we can, you know, increase the number   {#3323}
[03:03:45] TEACHER: of workers at the hashtag extraction service.   {#3324}
[03:03:49] TEACHER: So let's say, if let's say I'm trying to upload an image and the server, you know, is calling   {#3325}
[03:03:53] TEACHER: the SE service to you generate those pre-URLs.   {#3326}
[03:03:59] TEACHER: Yeah.   {#3327}
[03:04:00] TEACHER: So now think about it that way that, you know, I have benchmarked that service and got to   {#3328}
[03:04:06] TEACHER: is can handle or a single pod can handle, let's say 400 requests per second.   {#3329}
[03:04:10] TEACHER: Okay.   {#3330}
[03:04:11] TEACHER: Now let's say if I want to, or allow, let's say based on that, if suppose I'm   {#3331}
[03:04:16] TEACHER: getting thousand requests per second, I can use three servers and my, uh, and   {#3332}
[03:04:20] TEACHER: my, you know, uh, uh, request should be served accordingly.   {#3333}
[03:04:23] TEACHER: Like for those thousands, thousand requests, three servers are sufficient.   {#3334}
[03:04:26] TEACHER: Now let's say if I want to increase a number of requests, should I always go   {#3335}
[03:04:31] TEACHER: for increasing server or should I try to identify that?   {#3336}
[03:04:33] TEACHER: What is that area?   {#3337}
[03:04:36] TEACHER: is serving foreign requests, can I, let's say, increase the RAM or the CPU so that, you know,   {#3338}
[03:04:41] TEACHER: it, the same server can, you know, uh, uh, serve more number of requests, let's say from 400 to 500,   {#3339}
[03:04:47] TEACHER: 600, how to identify that, what should be that, you know, uh, bottleneck. I mean, how can I identify   {#3340}
[03:04:53] TEACHER: that bottleneck due to which the service are serving only foreign requests? What are your   {#3341}
[03:04:57] TEACHER: thoughts on that? Got it. Got it. Uh, one thing when you're scaling up, I'm assuming that your S3s   {#3342}
[03:05:03] TEACHER: can handle the request.   {#3343}
[03:05:05] TEACHER: Like your stateful component   {#3344}
[03:05:06] TEACHER: on which it is dependent,   {#3345}
[03:05:07] TEACHER: it is able to handle now.   {#3346}
[03:05:08] TEACHER: They're just talking about   {#3347}
[03:05:09] TEACHER: either horizontal scalability   {#3348}
[03:05:11] TEACHER: or vertical scalability.   {#3349}
[03:05:12] TEACHER: That's what your question   {#3350}
[03:05:13] TEACHER: boils down to.   {#3351}
[03:05:14] TEACHER: So what happens over here is   {#3352}
[03:05:17] TEACHER: always try,   {#3353}
[03:05:19] TEACHER: like at that,   {#3354}
[03:05:20] TEACHER: it's an engineering cost.   {#3355}
[03:05:21] TEACHER: So in some cases,   {#3356}
[03:05:23] TEACHER: if your organization has   {#3357}
[03:05:24] TEACHER: some amount of money   {#3358}
[03:05:25] TEACHER: left in the bank   {#3359}
[03:05:26] TEACHER: or rather decent amount   {#3360}
[03:05:27] TEACHER: money left in the bank,   {#3361}
[03:05:28] TEACHER: they would like to   {#3362}
[03:05:29] TEACHER: throw it on AWS,   {#3363}
[03:05:31] TEACHER: add more machines   {#3364}
[03:05:31] TEACHER: to get things done   {#3365}
[03:05:33] TEACHER: spending engineers time into optimizing things.   {#3366}
[03:05:37] TEACHER: Right.   {#3367}
[03:05:38] TEACHER: That is the first stage of decision making   {#3368}
[03:05:42] TEACHER: where your management says that,   {#3369}
[03:05:44] TEACHER: hey, should you spend time optimizing the service   {#3370}
[03:05:46] TEACHER: or should we throw money at AWS and get more servers?   {#3371}
[03:05:49] TEACHER: Because typically throwing money at AWS,   {#3372}
[03:05:53] TEACHER: getting two more servers is very cheap   {#3373}
[03:05:55] TEACHER: as compared to salaries of engineers.   {#3374}
[03:05:58] TEACHER: Correct.   {#3375}
[03:05:59] TEACHER: So that is first point.   {#3376}
[03:06:00] TEACHER: Now, assume that your company says,   {#3377}
[03:06:03] TEACHER: know let's keep the server same and now we want to optimize it that is where your problem comes in   {#3378}
[03:06:08] TEACHER: where you want to get the max out of the server or the pod that you have now how do you find it   {#3379}
[03:06:13] TEACHER: you need the only way to do it is by profiling the application right have you done profiling   {#3380}
[03:06:20] TEACHER: using neural link data dog or any sort of open telemetry system uh not active profiling that you   {#3381}
[03:06:26] TEACHER: know, see by profiling, I tried to say that the CPU percentage or the memory, not just   {#3382}
[03:06:32] TEACHER: CPU code wise, code level application, basically application, basically application level profiling   {#3383}
[03:06:39] TEACHER: in which it tells you, in which it tells you, for example, you made an HTTP call, it invoked   {#3384}
[03:06:47] TEACHER: a handler, that handler called, let's say 5,000 different functions.   {#3385}
[03:06:52] TEACHER: That application level profiling tool will exactly tell you how much time every single   {#3386}
[03:06:56] TEACHER: took and it would split it and you would know which one is the bottleneck over there.   {#3387}
[03:07:02] TEACHER: Can you optimize on something?   {#3388}
[03:07:04] TEACHER: So you need and you may not turn on application level profiling for all of the production   {#3389}
[03:07:10] TEACHER: grade systems, but on a canary machine, on a few set of machines so that you know which   {#3390}
[03:07:16] TEACHER: part is taking time because application level profiling that when you put, imagine you   {#3391}
[03:07:20] TEACHER: capturing how much time every single function call took.   {#3392}
[03:07:24] TEACHER: It itself is a costly thing.   {#3393}
[03:07:27] TEACHER: And costly with respect to money also, data also, this also and the response time also.   {#3394}
[03:07:33] TEACHER: This as in the money that you pay to your profiling tools.   {#3395}
[03:07:37] TEACHER: So it's very costly.   {#3396}
[03:07:39] TEACHER: So what you typically do is you bifurcate your production system into 19 to 10 ratio.   {#3397}
[03:07:45] TEACHER: And put a load balancer behind it.   {#3398}
[03:07:47] TEACHER: Load balancer seamlessly routes requested to each one of them, round robin or whatever strategy.   {#3399}
[03:07:52] TEACHER: And you monitor those 10% instances using application profiling.   {#3400}
[03:07:56] TEACHER: You take a hit on response time for some time, but then you monitor that,   {#3401}
[03:08:00] TEACHER: that which function is taking how much time.   {#3402}
[03:08:02] TEACHER: And then you find that bottleneck.   {#3403}
[03:08:04] TEACHER: This is where new Relic data dog, these tools come in or Nagios.   {#3404}
[03:08:07] TEACHER: These tool comes in.   {#3405}
[03:08:08] TEACHER: They do application level profiling.   {#3406}
[03:08:12] TEACHER: And unless you have it measured, you can just assume that, oh,   {#3407}
[03:08:16] TEACHER: this might be taking time, but when you have the data, it would help you   {#3408}
[03:08:20] TEACHER: drill down onto that exact function that is taking the most amount of time.   {#3409}
[03:08:23] TEACHER: And then you optimize it.   {#3410}
[03:08:25] TEACHER: Right.   {#3411}
[03:08:26] TEACHER: New Relic Data Doc, these two are market leaders at the moment.   {#3412}
[03:08:29] TEACHER: New Relic is the biggest one out there and open source alternative is Nagios.   {#3413}
[03:08:35] TEACHER: Anything on open source, simple one, C profile.   {#3414}
[03:08:40] TEACHER: If you are into Python, check out C profile that would give you a text   {#3415}
[03:08:46] TEACHER: based output, but it's still decent enough.   {#3416}
[03:08:48] TEACHER: That would help you debug, which function is taking most time.   {#3417}
[03:08:52] TEACHER: So C profile is your friend.   {#3418}
[03:08:53] TEACHER: If you're in Python stack, I've used it very recently.   {#3419}
[03:08:56] TEACHER: it for one of or for two of the use cases but not in production i it was on my local machine so i'm   {#3420}
[03:09:02] TEACHER: i've never used it in production anyway uh instagram uses cpropyl in production on one   {#3421}
[03:09:06] TEACHER: of their servers they have a blog on it so you might find that interesting as well   {#3422}
[03:09:11] TEACHER: and yeah these are the points on that that i remember that i could recall   {#3423}
[03:09:16] TEACHER: got it got it so now one one again one point here so is there any general guidelines so let's say   {#3424}
[03:09:23] TEACHER: my server is you know giving 100 requests per second if i want to just increase the number of   {#3425}
[03:09:29] TEACHER: requests on the server so i should should i increase the cpu or should the ram is there   {#3426}
[03:09:33] TEACHER: any general guideline for that that you know rather requests serve karni ke liye cpu zada   {#3427}
[03:09:38] TEACHER: something like that or you know not really you should have more memory for the server when you   {#3428}
[03:09:43] TEACHER: are selecting some you know aws ec2 instance so by default adding more ram obviously throwing more   {#3429}
[03:09:50] TEACHER: RAM, throwing more CPU will increase, will increase the number of requests that you can   {#3430}
[03:09:54] TEACHER: handle.   {#3431}
[03:09:54] TEACHER: That's true.   {#3432}
[03:09:55] TEACHER: But it might be possible that adding one might not help you handle more requests.   {#3433}
[03:10:01] TEACHER: For example, if you're doing encryption decryption based workloads, which is very CPU heavy and   {#3434}
[03:10:06] TEACHER: you throw more RAM at it, would it work?   {#3435}
[03:10:09] TEACHER: So understand your workflow.   {#3436}
[03:10:11] TEACHER: At the end, you have four things.   {#3437}
[03:10:13] TEACHER: As I always say, CPU, memory, network and disk.   {#3438}
[03:10:18] TEACHER: see which one are you utilizing the most   {#3439}
[03:10:21] TEACHER: and throw more of it at the server.   {#3440}
[03:10:23] TEACHER: Got it.   {#3441}
[03:10:24] TEACHER: Got it.   {#3442}
[03:10:24] TEACHER: And one last thing here,   {#3443}
[03:10:25] TEACHER: if you're running lots of parallel requests,   {#3444}
[03:10:27] TEACHER: let's say you are doing a lots of,   {#3445}
[03:10:29] TEACHER: let's say you are running Golang server   {#3446}
[03:10:31] TEACHER: and you know,   {#3447}
[03:10:32] TEACHER: you are doing a lots of parallel processing   {#3448}
[03:10:33] TEACHER: through Go routines.   {#3449}
[03:10:35] TEACHER: So if I,   {#3450}
[03:10:36] TEACHER: and if let's say that server is handling,   {#3451}
[03:10:38] TEACHER: let's say 200 requests per second.   {#3452}
[03:10:39] TEACHER: So what is the way that I can increase   {#3453}
[03:10:41] TEACHER: those number of Go routine   {#3454}
[03:10:42] TEACHER: and that should also perform?   {#3455}
[03:10:44] TEACHER: It should be the RAM   {#3456}
[03:10:44] TEACHER: or it should be the CPU?   {#3457}
[03:10:46] TEACHER: Who's responsible for the...   {#3458}
[03:10:47] TEACHER: CPU, right? Because you need more   {#3459}
[03:10:49] TEACHER: CPU so that it can schedule   {#3460}
[03:10:51] TEACHER: large number of Go routines there. You need more   {#3461}
[03:10:53] TEACHER: CPU first of all, right?   {#3462}
[03:10:55] TEACHER: But then depending on what you are doing in   {#3463}
[03:10:57] TEACHER: Go routine, you might need more RAM.   {#3464}
[03:11:00] TEACHER: Got it, got it. If it is more processing   {#3465}
[03:11:01] TEACHER: then I have to increase the RAM also.   {#3466}
[03:11:03] TEACHER: First CPU, but if you are   {#3467}
[03:11:05] TEACHER: let's say you are holding a lot   {#3468}
[03:11:07] TEACHER: of data in RAM, then you need to add   {#3469}
[03:11:09] TEACHER: more RAM because now you are handling more requests   {#3470}
[03:11:11] TEACHER: because you are having more CPU, you are handling more requests.   {#3471}
[03:11:14] TEACHER: So if let's say each Go routine   {#3472}
[03:11:15] TEACHER: takes up let's say 20 MB of   {#3473}
[03:11:17] TEACHER: memory for your processing for the things that you are doing now if you are now supporting more   {#3474}
[03:11:22] TEACHER: go routines you need that extra memory to help because you are handling more go routines they   {#3475}
[03:11:27] STUDENT_7: also need 20 mb extra right you need that yeah yeah sure thanks for that thank you   {#3476}
[03:11:37] STUDENT_2: hey so one question around gc or the hashtag db just a ttl thing would work out right like seven   {#3477}
[03:11:45] STUDENT_2: to eight days.   {#3478}
[03:11:47] STUDENT_14: I didn't get it.   {#3479}
[03:11:49] STUDENT_14: What?   {#3480}
[03:11:49] STUDENT_5: For hashtag service?   {#3481}
---- OWNED SEGMENTS END ----

CTX| [03:11:53] STUDENT_2: Like the question is GC   {#3482}
CTX| [03:11:55] STUDENT_2: in the hashtag.   {#3483}
CTX| [03:11:56] STUDENT_2: GC is what?   {#3484}
CTX| [03:11:58] STUDENT_2: Garbage collection.   {#3485}
CTX| [03:11:59] STUDENT_2: Sorry.   {#3486}
CTX| [03:12:00] TEACHER: Okay.   {#3487}
CTX| [03:12:01] TEACHER: Our database garbage collection.   {#3488}
CTX| [03:12:02] TEACHER: Okay.   {#3489}
CTX| [03:12:03] TEACHER: What are you collecting   {#3490}
CTX| [03:12:04] TEACHER: in this?   {#3491}
CTX| [03:12:05] STUDENT_2: Like basically,   {#3492}
CTX| [03:12:07] STUDENT_2: yeah.   {#3493}
CTX| [03:12:07] STUDENT_2: So basically hashtag   {#3494}
CTX| [03:12:08] STUDENT_2: would start growing.   {#3495}
CTX| [03:12:10] STUDENT_2: Like daily,   {#3496}
CTX| [03:12:11] STUDENT_2: we'll have a lot of   {#3497}
CTX| [03:12:11] STUDENT_2: ingest of hashtags.   {#3498}
CTX| [03:12:13] STUDENT_2: Yeah.   {#3499}
CTX| [03:12:14] STUDENT_2: Now,   {#3500}
CTX| [03:12:15] STUDENT_2: Eventually, if you ask that maybe somebody is just putting some random garbage stuff,   {#3501}
CTX| [03:12:20] STUDENT_2: A, B and C.   {#3502}
CTX| [03:12:21] TEACHER: We don't want all of that.   {#3503}
CTX| [03:12:22] TEACHER: Oh, okay.   {#3504}
CTX| [03:12:23] TEACHER: Okay.   {#3505}
CTX| [03:12:24] TEACHER: I got it.   {#3506}
CTX| [03:12:25] TEACHER: You typically would not delete that because what would happen is that let's say that hashtag   {#3507}
CTX| [03:12:31] TEACHER: deleted the data, it grew in popularity.   {#3508}
CTX| [03:12:35] TEACHER: You would lose that old data.   {#3509}
CTX| [03:12:37] TEACHER: But in any case, what you're storing is you're just storing very minimal information, like   {#3510}
CTX| [03:12:42] TEACHER: 100 post IDs, one total, one integer,   {#3511}
CTX| [03:12:45] TEACHER: rather two, one integer, one string,   {#3512}
CTX| [03:12:48] TEACHER: and one array of 100 integers.   {#3513}
CTX| [03:12:49] TEACHER: It's not that huge.   {#3514}
CTX| [03:12:51] TEACHER: And if you just measure it,   {#3515}
