# chunk_17  OWNS 03:10:25 -> 03:22:43  (segments #3300-#3594, 2040 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:09:26] TEACHER: That's it.   {#3278}
CTX| [03:09:27] TEACHER: Request comes in.   {#3279}
CTX| [03:09:27] TEACHER: It finds way to forward it.   {#3280}
CTX| [03:09:29] TEACHER: It forwards with them.   {#3281}
CTX| [03:09:31] TEACHER: Okay, cool.   {#3282}
CTX| [03:09:33] TEACHER: Don't just add services for the sake of it.   {#3283}
CTX| [03:09:36] TEACHER: Every service is a network hop.   {#3284}
CTX| [03:09:38] TEACHER: Right?   {#3285}
CTX| [03:09:39] TEACHER: So at scale, we optimize for not even exaggerating every microsecond as well.   {#3286}
CTX| [03:09:46] TEACHER: So I've seen discussions where every single network hop is challenged.   {#3287}
CTX| [03:09:50] TEACHER: Why do you need it?   {#3288}
CTX| [03:09:52] TEACHER: A good architecture that I've seen only had four microservice, but it handled petabytes   {#3289}
CTX| [03:09:55] TEACHER: of data.   {#3290}
CTX| [03:09:56] TEACHER: Just adding random boxes in a design is a bad idea.   {#3291}
CTX| [03:10:01] TEACHER: Unless you have a very good justification for that.   {#3292}
CTX| [03:10:03] TEACHER: What's the job of it?   {#3293}
CTX| [03:10:05] TEACHER: Don't add random boxes because it just slows things down because every network call three   {#3294}
CTX| [03:10:10] TEACHER: to five to 10 milliseconds of latency is added.   {#3295}
CTX| [03:10:13] TEACHER: Why?   {#3296}
CTX| [03:10:13] TEACHER: Just don't do it.   {#3297}
CTX| [03:10:15] TEACHER: See where you would see the shortest path possible and try to accommodate it there.   {#3298}
CTX| [03:10:21] STUDENT_8: Okay.   {#3299}

---- OWNED SEGMENTS START ----
[03:10:25] STUDENT_8: If we are using round robin algorithm, then we will need another session.   {#3300}
[03:10:31] TEACHER: Why session?   {#3301}
[03:10:32] TEACHER: We just saw the implementation in the code, right?   {#3302}
[03:10:34] TEACHER: Go through the recording.   {#3303}
[03:10:37] TEACHER: We have covered it.   {#3304}
[03:10:38] TEACHER: It just keeps track of an integer, the index in the array that this is where I sent it.   {#3305}
[03:10:43] TEACHER: Now this is where I want to send it.   {#3306}
[03:10:44] TEACHER: Now this is where I want to send it.   {#3307}
[03:10:46] STUDENT_5: Okay.   {#3308}
[03:10:47] STUDENT_5: No other service required.   {#3309}
[03:10:50] STUDENT_1: Sure.   {#3310}
[03:10:51] STUDENT_1: Thank you.   {#3311}
[03:10:52] STUDENT_1: Yeah.   {#3312}
[03:10:53] STUDENT_1: Thanks.   {#3313}
[03:10:54] STUDENT_1: I wasn't able to understand this load balancer of your computer.   {#3314}
[03:10:58] STUDENT_1: So will it be okay if I iterate and then ask questions?   {#3315}
[03:11:01] STUDENT_1: What you are not able to understand?   {#3316}
[03:11:03] STUDENT_1: The load balancer's workflow.   {#3317}
[03:11:06] STUDENT_1: The, okay.   {#3318}
[03:11:09] STUDENT_1: So let's say this core DNS actually has an area of IP addresses of all the load balancer   {#3319}
[03:11:14] STUDENT_1: servers.   {#3320}
[03:11:16] STUDENT_5: Right.   {#3321}
[03:11:17] STUDENT_5: Against the domain name.   {#3322}
[03:11:19] STUDENT_1: Against the domain name.   {#3323}
[03:11:22] STUDENT_1: user one comes in, we pick in a round robin fashion and gives it one IP address.   {#3324}
[03:11:26] STUDENT_1: Then you two comes in.   {#3325}
[03:11:28] STUDENT_1: Uh, we again pick the IP address in round robin manner.   {#3326}
[03:11:33] STUDENT_1: So aren't we bottlenecked by that round robin now?   {#3327}
[03:11:35] STUDENT_1: Because load balances were able to solve one problem for us, but load   {#3328}
[03:11:39] STUDENT_1: balances are again in one problem now.   {#3329}
[03:11:42] STUDENT_1: Why is that a problem?   {#3330}
[03:11:46] STUDENT_1: I think this is bottleneck because eventually.   {#3331}
[03:11:53] STUDENT_1: It might become at one point of time because there was a reason why, why we chose one algorithm   {#3332}
[03:11:59] STUDENT_1: over another for load balancer.   {#3333}
[03:12:01] STUDENT_1: Let's say I use.   {#3334}
[03:12:02] STUDENT_1: Which algorithm?   {#3335}
[03:12:03] STUDENT_1: Be specific on that.   {#3336}
[03:12:04] STUDENT_1: Okay.   {#3337}
[03:12:05] STUDENT_1: So let's say load balancers were running round robin and not a lease connections used.   {#3338}
[03:12:11] STUDENT_9: Okay.   {#3339}
[03:12:11] STUDENT_9: Round robin.   {#3340}
[03:12:13] STUDENT_1: And for core DNS, while when a user comes in and picks IP address of load balancer   {#3341}
[03:12:18] STUDENT_1: the server, it said least connections.   {#3342}
[03:12:22] STUDENT_1: It uses, why would this pick least connections, least connections and   {#3343}
[03:12:26] TEACHER: all is all over here.   {#3344}
[03:12:28] TEACHER: Code DNS has no idea about what that is.   {#3345}
[03:12:30] TEACHER: It just picks one idea.   {#3346}
[03:12:32] TEACHER: I want to appear at random and sends it here.   {#3347}
[03:12:33] TEACHER: That's it.   {#3348}
[03:12:34] TEACHER: Okay.   {#3349}
[03:12:35] TEACHER: At random.   {#3350}
[03:12:36] TEACHER: That's what I said.   {#3351}
[03:12:37] TEACHER: He heard, there is no brain.   {#3352}
[03:12:39] TEACHER: It's a, it's a literal 50 lines of code.   {#3353}
[03:12:43] TEACHER: Not even exactly.   {#3354}
[03:12:44] TEACHER: If you open code DNS codeways 50 lines of code, you will find that does that.   {#3355}
[03:12:48] TEACHER: Everything else is just Mambo Jumbo.   {#3356}
[03:12:52] STUDENT_1: And it's nothing.   {#3357}
[03:12:53] STUDENT_1: Hmm.   {#3358}
[03:12:54] STUDENT_1: Orchestrator communicates with low balances and backend server.   {#3359}
[03:12:57] STUDENT_1: I mean, it checks the health status.   {#3360}
[03:12:59] STUDENT_1: Yeah.   {#3361}
[03:13:00] STUDENT_1: Why does it even need that?   {#3362}
[03:13:02] STUDENT_1: It already has Prometheus.   {#3363}
[03:13:03] STUDENT_1: So why does it only use Prometheus to get that?   {#3364}
[03:13:06] STUDENT_1: Okay.   {#3365}
[03:13:07] STUDENT_1: Prometheus is for vital checking.   {#3366}
[03:13:10] TEACHER: I'm using Prometheus.   {#3367}
[03:13:11] TEACHER: Prometheus gives you ability to do health checks, right?   {#3368}
[03:13:14] TEACHER: But what if you replace it with something, but does not give you health checks.   {#3369}
[03:13:18] TEACHER: as vitals, right.   {#3370}
[03:13:19] TEACHER: I'm just covering the boxes, right?   {#3371}
[03:13:22] TEACHER: Because if tomorrow you take it out and then you think that is   {#3372}
[03:13:25] TEACHER: design is not good enough.   {#3373}
[03:13:26] TEACHER: So that's why I was very explicit in heart beats and then vitals pushed   {#3374}
[03:13:31] TEACHER: to a different service because in most cases, vital ingestion does not do health checks.   {#3375}
[03:13:36] TEACHER: Prometheus does that, but vitals ingestion does not do health checks in general.   {#3376}
[03:13:40] TEACHER: Got it.   {#3377}
[03:13:41] STUDENT_1: That's fine.   {#3378}
[03:13:43] STUDENT_1: And for the communication between database and load balancer servers,   {#3379}
[03:13:46] STUDENT_1: we are using Redis as pub server.   {#3380}
[03:13:49] TEACHER: Not database and load balancer servers.   {#3381}
[03:13:52] STUDENT_1: You are talking about this.   {#3382}
[03:13:54] STUDENT_1: Okay.   {#3383}
[03:13:56] STUDENT_1: Replicating the database config over here.   {#3384}
[03:13:58] STUDENT_1: Yes.   {#3385}
[03:14:00] STUDENT_1: Why don't we use normal service and events?   {#3386}
[03:14:03] STUDENT_1: Wait.   {#3387}
[03:14:04] STUDENT_1: Hey.   {#3388}
[03:14:10] TEACHER: Okay.   {#3389}
[03:14:11] TEACHER: So in that case, how will your database or any process that is running would have to   {#3390}
[03:14:15] TEACHER: make multiple calls to these servers to do that?   {#3391}
[03:14:19] TEACHER: Redis gives you that out of the box, right?   {#3392}
[03:14:21] TEACHER: Real-time sending to everyone.   {#3393}
[03:14:23] TEACHER: I just use that as an example.   {#3394}
[03:14:25] TEACHER: That's what I said.   {#3395}
[03:14:26] TEACHER: It's just a real-time broadcast that we need.   {#3396}
[03:14:28] TEACHER: Whoever gives us that, we would use it.   {#3397}
[03:14:34] TEACHER: We can use server sending.   {#3398}
[03:14:35] TEACHER: So we just leverage what we studied in the last week   {#3399}
[03:14:38] TEACHER: and put it over here to do reactive communication   {#3400}
[03:14:42] TEACHER: rather than poll-based communication.   {#3401}
[03:14:43] TEACHER: We did reactive communication over here.   {#3402}
[03:14:45] TEACHER: That was the key idea.   {#3403}
[03:14:46] TEACHER: You replace Redis.   {#3404}
[03:14:48] TEACHER: who keep her, you put explicit HTTP calling.   {#3405}
[03:14:51] TEACHER: That's what we also discuss in brainstorming.   {#3406}
[03:14:53] TEACHER: Anything, anything which is reactive works for you.   {#3407}
[03:14:57] TEACHER: I just use this as one of the options.   {#3408}
[03:14:59] TEACHER: This is not the only option.   {#3409}
[03:15:01] TEACHER: Right.   {#3410}
[03:15:02] TEACHER: I just use it because the guarantee that it provides, I don't have to worry about.   {#3411}
[03:15:06] TEACHER: Correct.   {#3412}
[03:15:09] STUDENT_1: For the heartbeat communication between orchestrator and backend servers, let's   {#3413}
[03:15:13] STUDENT_1: say, uh, it will be the exact replica of design online, offline indicator that   {#3414}
[03:15:18] STUDENT_1: Keep polling and what back end service orchestrator, right?   {#3415}
[03:15:22] TEACHER: Back end service.   {#3416}
[03:15:23] TEACHER: Yeah, same thing.   {#3417}
[03:15:24] TEACHER: That's what it's all building blocks.   {#3418}
[03:15:26] TEACHER: Right.   {#3419}
[03:15:26] TEACHER: However, you'd want to drive that.   {#3420}
[03:15:28] TEACHER: You can drive that.   {#3421}
[03:15:28] TEACHER: You are reputed, reputedly making HTTP calls to here to check if they're alive or not and   {#3422}
[03:15:34] TEACHER: whatnot, and we'll just keep track of it.   {#3423}
[03:15:36] TEACHER: Same.   {#3424}
[03:15:38] STUDENT_3: Thanks.   {#3425}
[03:15:40] STUDENT_5: Sitesh.   {#3426}
[03:15:44] STUDENT_3: Yeah.   {#3427}
[03:15:45] STUDENT_3: So maybe I missed this, but like in the whole system, uh, are like load balancing being a   {#3428}
[03:15:53] STUDENT_3: high availability system, orchestrator is our point of failure now.   {#3429}
[03:15:59] STUDENT_3: Right?   {#3430}
[03:15:59] STUDENT_3: Like if orchestrator goes down, uh, like it's fine until load balance.   {#3431}
[03:16:06] STUDENT_3: No, no, no.   {#3432}
[03:16:06] STUDENT_9: It's not fine.   {#3433}
[03:16:08] STUDENT_9: Orchestrator went down.   {#3434}
[03:16:09] STUDENT_9: How do you solve it?   {#3435}
[03:16:10] STUDENT_9: You cannot have orchestrator.   {#3436}
[03:16:12] STUDENT_3: Yeah.   {#3437}
[03:16:13] STUDENT_3: That's what I was going to ask.   {#3438}
[03:16:15] STUDENT_3: I'll just have three orchestrators, maybe like whatever and orchestrate and have same   {#3439}
[03:16:19] STUDENT_3: code running, but rest of them idle until one of them.   {#3440}
[03:16:22] TEACHER: Not idle, but you might have basically leader follower.   {#3441}
[03:16:26] TEACHER: One is faster.   {#3442}
[03:16:27] TEACHER: Others are follower.   {#3443}
[03:16:28] TEACHER: Others are doing the grant work.   {#3444}
[03:16:29] TEACHER: If master goes down, followers automatically takes its place.   {#3445}
[03:16:33] TEACHER: One or two seconds downtime.   {#3446}
[03:16:34] STUDENT_1: Right.   {#3447}
[03:16:35] STUDENT_1: That's what the literary election.   {#3448}
[03:16:37] STUDENT_1: Oh, I see.   {#3449}
[03:16:38] STUDENT_1: I missed that.   {#3450}
[03:16:39] TEACHER: So here there is multiple servers.   {#3451}
[03:16:42] TEACHER: So high availability.   {#3452}
[03:16:45] TEACHER: high availability clusters autoscaling high ability lvc has a high ability database high   {#3453}
[03:16:49] TEACHER: ability orchestrator add leader election high availability code units leader election high   {#3454}
[03:16:55] STUDENT_3: availability yeah yeah rest of them i was fine orchestrator was yeah and this is exactly where   {#3455}
[03:17:02] TEACHER: and just now that given that we are on that point leader election is a way to get high availability   {#3456}
[03:17:07] TEACHER: either you can have a manual either you can have a human who is spinning up a server for you to   {#3457}
[03:17:12] TEACHER: getting up and running. Otherwise,   {#3458}
[03:17:15] TEACHER: if one is done, you want other to take   {#3459}
[03:17:17] TEACHER: its place. That's when leader election comes in. It just automates   {#3460}
[03:17:19] TEACHER: the entire process and that's why   {#3461}
[03:17:21] TEACHER: it is important. So here if one node   {#3462}
[03:17:23] TEACHER: goes down, you want other to automatically take its place.   {#3463}
[03:17:25] TEACHER: That's when leader election comes in.   {#3464}
[03:17:27] STUDENT_3: Yeah, makes sense.   {#3465}
[03:17:30] STUDENT_3: One   {#3466}
[03:17:31] STUDENT_3: question on code DNS. I may be   {#3467}
[03:17:33] STUDENT_3: messing up conceptually, but I   {#3468}
[03:17:35] STUDENT_3: did not understand the part that   {#3469}
[03:17:36] STUDENT_3: when you said private,   {#3470}
[03:17:40] STUDENT_3: like we want   {#3471}
[03:17:42] STUDENT_3: away from, uh, public, uh, like public interface.   {#3472}
[03:17:47] STUDENT_3: Right.   {#3473}
[03:17:47] STUDENT_3: But what I'm missing is yes, we'll add a private DNS service, but at the end of the   {#3474}
[03:17:53] STUDENT_3: day, we are returning our IP addresses are those different IP addresses.   {#3475}
[03:17:57] STUDENT_3: Like I didn't catch that.   {#3476}
[03:17:59] TEACHER: Going a little more details of it.   {#3477}
[03:18:01] TEACHER: What I would recommend is let's go step by step, explore what code DNS is.   {#3478}
[03:18:05] TEACHER: Try to set up one, try to configure a domain, have bunch of backend servers to   {#3479}
[03:18:10] TEACHER: that, right.   {#3480}
[03:18:11] TEACHER: See how we scale it.   {#3481}
[03:18:12] TEACHER: production guide on core DNS website itself in their official documentation.   {#3482}
[03:18:16] TEACHER: See how you get high availability on core DNS.   {#3483}
[03:18:18] TEACHER: Right now imagine a situation where you are using it as part of a private   {#3484}
[03:18:22] TEACHER: infrastructure, right?   {#3485}
[03:18:23] TEACHER: Then think of exposing it to public and see what happens.   {#3486}
[03:18:26] TEACHER: So because what we missed on us, because I, I now obviously cannot cover all the   {#3487}
[03:18:31] TEACHER: layers because there are seven more.   {#3488}
[03:18:33] TEACHER: What I was talking about was that this LB servers is not a first layer of   {#3489}
[03:18:36] TEACHER: interaction.   {#3490}
[03:18:36] TEACHER: There are many machines that it has to go to.   {#3491}
[03:18:39] TEACHER: Right.   {#3492}
[03:18:39] TEACHER: So to oversimplify the discussion,   {#3493}
[03:18:42] TEACHER: I said cold in this would directly spit out   {#3494}
[03:18:43] TEACHER: machine of one of the loaders,   {#3495}
[03:18:46] TEACHER: which is in fact true.   {#3496}
[03:18:47] TEACHER: But when it doesn't directly talk to that,   {#3497}
[03:18:50] TEACHER: there is one more proxy that sits in between   {#3498}
[03:18:52] TEACHER: and you have to balance between them and whatnot.   {#3499}
[03:18:54] TEACHER: But when you implement it,   {#3500}
[03:18:56] TEACHER: when you define what your architecture has to be,   {#3501}
[03:18:59] TEACHER: what needs to be private,   {#3502}
[03:19:00] TEACHER: what needs to be public.   {#3503}
[03:19:02] TEACHER: For example,   {#3504}
[03:19:03] TEACHER: lb.payments.google.com   {#3505}
[03:19:04] TEACHER: you won't expose to a user.   {#3506}
[03:19:06] TEACHER: You would expose payments.google.com.   {#3507}
[03:19:07] TEACHER: Correct?   {#3508}
[03:19:09] TEACHER: payments to LB.payments what happens because payments.google.com is a publicly available   {#3509}
[03:19:15] TEACHER: DNS.   {#3510}
[03:19:16] TEACHER: Correct.   {#3511}
[03:19:17] TEACHER: From there, where would the request come?   {#3512}
[03:19:19] TEACHER: What would you configure there on public desk?   {#3513}
[03:19:21] TEACHER: You configure API gateway's IP address.   {#3514}
[03:19:24] TEACHER: So from the user, the request comes to your API gateway.   {#3515}
[03:19:28] TEACHER: Now from API gateway, first TCP connection is formed to API gateway.   {#3516}
[03:19:32] TEACHER: Now from API gateway, there would be a configuration which says API gateway that if you get this   {#3517}
[03:19:35] TEACHER: path forward it to this load balancer.   {#3518}
[03:19:37] TEACHER: So this is where your API gateway, when it is connected to load balancer, it will do   {#3519}
[03:19:43] TEACHER: forward it to this load balancer.   {#3520}
[03:19:44] TEACHER: So load balancer has a domain name.   {#3521}
[03:19:46] TEACHER: So when API gateway is establishing the DC progression with the load balancer, which is   {#3522}
[03:19:50] TEACHER: where this private code DNS comes into the picture.   {#3523}
[03:19:54] TEACHER: Correct.   {#3524}
[03:19:55] TEACHER: Okay.   {#3525}
[03:19:56] TEACHER: Now you see, now here I'm just adding two layers.   {#3526}
[03:19:59] TEACHER: One for API gateway for public calling and one load balancer for private.   {#3527}
[03:20:03] TEACHER: Now you can add three or four more because APEG is typically not the first point of entry   {#3528}
[03:20:09] TEACHER: as most people think it is.   {#3529}
[03:20:10] TEACHER: Right, right.   {#3530}
[03:20:10] STUDENT_3: I think you'll at least have two more.   {#3531}
[03:20:13] STUDENT_3: More proxies, right?   {#3532}
[03:20:14] STUDENT_3: Yes.   {#3533}
[03:20:15] STUDENT_3: Okay.   {#3534}
[03:20:15] STUDENT_3: Yeah.   {#3535}
[03:20:15] STUDENT_3: Yeah.   {#3536}
[03:20:16] STUDENT_3: I mean, I think so.   {#3537}
[03:20:17] STUDENT_3: Yeah.   {#3538}
[03:20:18] STUDENT_3: Yeah.   {#3539}
[03:20:18] STUDENT_3: Now I see.   {#3540}
[03:20:19] STUDENT_3: Now I see.   {#3541}
[03:20:19] STUDENT_3: But just to summarize, basically, like I read details myself, but like basically what we   {#3542}
[03:20:24] STUDENT_3: covered in the last class, right?   {#3543}
[03:20:26] STUDENT_3: Like we want something that has the least configuration or whatever it is, even though   {#3544}
[03:20:33] STUDENT_3: partitioned there and rest of the part is compromised.   {#3545}
[03:20:36] STUDENT_3: Rest of the good part is with us.   {#3546}
[03:20:38] STUDENT_3: That's the idea.   {#3547}
[03:20:41] TEACHER: But now here you see like where, where I was talking about this private   {#3548}
[03:20:44] TEACHER: infra, right?   {#3549}
[03:20:45] TEACHER: Because you can also configure LB, LB address in your public DNS also in   {#3550}
[03:20:52] TEACHER: case of AWS, in case of GCP, everywhere you can do that.   {#3551}
[03:20:55] TEACHER: So in that case, your API gateway is totally bypassed.   {#3552}
[03:20:57] TEACHER: So you're exposing literally LB.payment.google.com to the internet, which is fine.   {#3553}
[03:21:02] TEACHER: But in reality, you would expose payments and then LPs are basically privatized.   {#3554}
[03:21:07] TEACHER: So this is how the hop happens.   {#3555}
[03:21:09] TEACHER: So whoever is established.   {#3556}
[03:21:09] TEACHER: So the idea is whoever is establishing the connection with LP servers has to talk to   {#3557}
[03:21:14] TEACHER: this audience.   {#3558}
[03:21:16] STUDENT_5: Right.   {#3559}
[03:21:18] STUDENT_5: Okay.   {#3560}
[03:21:18] STUDENT_5: Thanks.   {#3561}
[03:21:19] STUDENT_5: Thanks.   {#3562}
[03:21:19] STUDENT_5: Yeah.   {#3563}
[03:21:20] STUDENT_4: So, yeah.   {#3564}
[03:21:23] STUDENT_4: So I, I like it, it load balancer, right.   {#3565}
[03:21:27] STUDENT_4: It looks like a reverse proxy to me, kind of similar to that sort.   {#3566}
[03:21:34] STUDENT_4: Right.   {#3567}
[03:21:35] TEACHER: I mean, what is the load balancers are reverse proxies.   {#3568}
[03:21:38] STUDENT_4: Okay.   {#3569}
[03:21:38] STUDENT_4: Okay.   {#3570}
[03:21:39] STUDENT_4: So there is no like major difference between them.   {#3571}
[03:21:43] TEACHER: That's because load balancer balances load across homogeneous system,   {#3572}
[03:21:46] TEACHER: which is exactly what reverse proxy does.   {#3573}
[03:21:48] STUDENT_4: Right.   {#3574}
[03:21:49] TEACHER: And API gateways are powered proxies.   {#3575}
[03:21:52] STUDENT_4: Yeah.   {#3576}
[03:21:55] STUDENT_5: This is what I should always expect.   {#3577}
[03:21:58] STUDENT_5: Thanks. Thanks for that. Okay.   {#3578}
[03:22:00] STUDENT_5: Harsh, Josh.   {#3579}
[03:22:02] STUDENT_11: Yeah. So I was just wondering that in this architecture,   {#3580}
[03:22:07] STUDENT_11: where generally we keep this authentication part.   {#3581}
[03:22:12] STUDENT_20: What do you want to authenticate?   {#3582}
[03:22:13] STUDENT_11: Or what do you want to authenticate?   {#3583}
[03:22:16] STUDENT_11: User authentication.   {#3584}
[03:22:18] TEACHER: Why would there be user authentication over here?   {#3585}
[03:22:21] TEACHER: It's part of a business logic, right? User authentication.   {#3586}
[03:22:24] TEACHER: So it's a backend services responsibility to do it.   {#3587}
[03:22:27] TEACHER: Correct.   {#3588}
[03:22:29] STUDENT_11: So, but we have more than one bacon server for request can go to anyone.   {#3589}
[03:22:33] STUDENT_11: Right.   {#3590}
[03:22:33] STUDENT_11: So imagine you're writing all service.   {#3591}
[03:22:35] TEACHER: Imagine you're writing off service.   {#3592}
[03:22:38] STUDENT_11: Okay.   {#3593}
[03:22:39] TEACHER: Isn't that part of the business logic?   {#3594}
---- OWNED SEGMENTS END ----

CTX| [03:22:43] STUDENT_11: Okay.   {#3595}
CTX| [03:22:44] TEACHER: That's what you do.   {#3596}
CTX| [03:22:45] TEACHER: Right.   {#3597}
CTX| [03:22:45] TEACHER: End user is valid or less of your transferring money from a to B.   {#3598}
CTX| [03:22:49] TEACHER: You want to authenticate it is indeed a who is doing the transfer.   {#3599}
CTX| [03:22:52] TEACHER: It's part of a business logic, right?   {#3600}
CTX| [03:22:54] TEACHER: Does your load balancer care about it?   {#3601}
CTX| [03:22:56] TEACHER: No.   {#3602}
CTX| [03:22:57] TEACHER: It's your business logic.   {#3603}
CTX| [03:22:58] TEACHER: You handle it.   {#3604}
CTX| [03:22:59] TEACHER: You send 404, you send 403 to user.   {#3605}
CTX| [03:23:02] TEACHER: Correct.   {#3606}
CTX| [03:23:03] TEACHER: So it's your backend service.   {#3607}
CTX| [03:23:05] TEACHER: Right.   {#3608}
CTX| [03:23:05] TEACHER: So this is load balancer.   {#3609}
CTX| [03:23:08] TEACHER: This, this is load balancer.   {#3610}
CTX| [03:23:12] TEACHER: This is load balance.   {#3611}
CTX| [03:23:14] TEACHER: Right.   {#3612}
CTX| [03:23:14] TEACHER: This is your business logic.   {#3613}
CTX| [03:23:16] TEACHER: This is what you write as part of a logic where authentication and   {#3614}
CTX| [03:23:18] TEACHER: whatnot is taken care.   {#3615}
CTX| [03:23:21] STUDENT_5: Okay.   {#3616}
CTX| [03:23:23] STUDENT_5: Sure.   {#3617}
CTX| [03:23:24] STUDENT_5: Uh, Rajeev.   {#3618}
CTX| [03:23:28] STUDENT_2: uh so uh do you have any video on time series database prometheus no no prometheus yeah just   {#3619}
CTX| [03:23:36] TEACHER: a promethe is very easy to set up just follow that documentation no good resources than that   {#3620}
CTX| [03:23:41] TEACHER: follow that documentation it's so good it's very well written very easy to set up go lang based   {#3621}
