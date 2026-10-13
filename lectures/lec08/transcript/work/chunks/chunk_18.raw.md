# chunk_18  OWNS 03:22:43 -> 03:36:36  (segments #3595-#3921, 2421 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [03:21:46] TEACHER: which is exactly what reverse proxy does.   {#3573}
CTX| [03:21:48] STUDENT_4: Right.   {#3574}
CTX| [03:21:49] TEACHER: And API gateways are powered proxies.   {#3575}
CTX| [03:21:52] STUDENT_4: Yeah.   {#3576}
CTX| [03:21:55] STUDENT_5: This is what I should always expect.   {#3577}
CTX| [03:21:58] STUDENT_5: Thanks. Thanks for that. Okay.   {#3578}
CTX| [03:22:00] STUDENT_5: Harsh, Josh.   {#3579}
CTX| [03:22:02] STUDENT_11: Yeah. So I was just wondering that in this architecture,   {#3580}
CTX| [03:22:07] STUDENT_11: where generally we keep this authentication part.   {#3581}
CTX| [03:22:12] STUDENT_20: What do you want to authenticate?   {#3582}
CTX| [03:22:13] STUDENT_11: Or what do you want to authenticate?   {#3583}
CTX| [03:22:16] STUDENT_11: User authentication.   {#3584}
CTX| [03:22:18] TEACHER: Why would there be user authentication over here?   {#3585}
CTX| [03:22:21] TEACHER: It's part of a business logic, right? User authentication.   {#3586}
CTX| [03:22:24] TEACHER: So it's a backend services responsibility to do it.   {#3587}
CTX| [03:22:27] TEACHER: Correct.   {#3588}
CTX| [03:22:29] STUDENT_11: So, but we have more than one bacon server for request can go to anyone.   {#3589}
CTX| [03:22:33] STUDENT_11: Right.   {#3590}
CTX| [03:22:33] STUDENT_11: So imagine you're writing all service.   {#3591}
CTX| [03:22:35] TEACHER: Imagine you're writing off service.   {#3592}
CTX| [03:22:38] STUDENT_11: Okay.   {#3593}
CTX| [03:22:39] TEACHER: Isn't that part of the business logic?   {#3594}

---- OWNED SEGMENTS START ----
[03:22:43] STUDENT_11: Okay.   {#3595}
[03:22:44] TEACHER: That's what you do.   {#3596}
[03:22:45] TEACHER: Right.   {#3597}
[03:22:45] TEACHER: End user is valid or less of your transferring money from a to B.   {#3598}
[03:22:49] TEACHER: You want to authenticate it is indeed a who is doing the transfer.   {#3599}
[03:22:52] TEACHER: It's part of a business logic, right?   {#3600}
[03:22:54] TEACHER: Does your load balancer care about it?   {#3601}
[03:22:56] TEACHER: No.   {#3602}
[03:22:57] TEACHER: It's your business logic.   {#3603}
[03:22:58] TEACHER: You handle it.   {#3604}
[03:22:59] TEACHER: You send 404, you send 403 to user.   {#3605}
[03:23:02] TEACHER: Correct.   {#3606}
[03:23:03] TEACHER: So it's your backend service.   {#3607}
[03:23:05] TEACHER: Right.   {#3608}
[03:23:05] TEACHER: So this is load balancer.   {#3609}
[03:23:08] TEACHER: This, this is load balancer.   {#3610}
[03:23:12] TEACHER: This is load balance.   {#3611}
[03:23:14] TEACHER: Right.   {#3612}
[03:23:14] TEACHER: This is your business logic.   {#3613}
[03:23:16] TEACHER: This is what you write as part of a logic where authentication and   {#3614}
[03:23:18] TEACHER: whatnot is taken care.   {#3615}
[03:23:21] STUDENT_5: Okay.   {#3616}
[03:23:23] STUDENT_5: Sure.   {#3617}
[03:23:24] STUDENT_5: Uh, Rajeev.   {#3618}
[03:23:28] STUDENT_2: uh so uh do you have any video on time series database prometheus no no prometheus yeah just   {#3619}
[03:23:36] TEACHER: a promethe is very easy to set up just follow that documentation no good resources than that   {#3620}
[03:23:41] TEACHER: follow that documentation it's so good it's very well written very easy to set up go lang based   {#3621}
[03:23:47] TEACHER: very easy to extend just go through the documentation i don't have a video on prometheus   {#3622}
[03:23:52] STUDENT_2: especially. Okay, one more question. I just was thinking about one flow,   {#3623}
[03:23:57] STUDENT_2: orchestrator leader going down and then a follower being promoted to a leader.   {#3624}
[03:24:02] STUDENT_2: Now this orchestra needs to know about LP servers, IPs as well as backend   {#3625}
[03:24:06] STUDENT_2: servers, IPs, you can put it in DB database, where I'll be console is there   {#3626}
[03:24:11] STUDENT_2: anyways, provisioning them, and then mainly lead run. So basically, the   {#3627}
[03:24:17] STUDENT_2: orchestra leader and follow also exchange that application, I mean, for   {#3628}
[03:24:22] STUDENT_2: system has that the followers actually, it does not need to replicate between themselves.   {#3629}
[03:24:26] TEACHER: Right.   {#3630}
[03:24:28] TEACHER: Because it does not, it is not stateful.   {#3631}
[03:24:30] TEACHER: It is not storing any state over here.   {#3632}
[03:24:32] TEACHER: All the state is in database.   {#3633}
[03:24:34] TEACHER: Correct.   {#3634}
[03:24:35] TEACHER: Either here or here.   {#3635}
[03:24:37] TEACHER: These are stateless.   {#3636}
[03:24:38] TEACHER: It's just basically what it is doing.   {#3637}
[03:24:40] TEACHER: It is finding queries to check if LV service needs to scale up or run.   {#3638}
[03:24:44] TEACHER: Does it maintain any state in memory?   {#3639}
[03:24:47] STUDENT_2: Okay.   {#3640}
[03:24:47] STUDENT_2: So when the leader goes down the follower, any follower basically in the first place,   {#3641}
[03:24:52] STUDENT_2: leader election one who finds out becomes the new leader and the servers just need to reply back   {#3642}
[03:24:59] TEACHER: whomsoever comes and ask them for a heartbeat correct correct correct because at the end great   {#3643}
[03:25:05] TEACHER: question uh how is heartbeat it's it's making http request over here and here to get it and so it's   {#3644}
[03:25:11] TEACHER: the orchestra is making the request to get it so it's not that server has to it just whoever makes   {#3645}
[03:25:16] TEACHER: the request of health check, someone responds to that.   {#3646}
[03:25:19] TEACHER: That's it.   {#3647}
[03:25:20] TEACHER: Okay.   {#3648}
[03:25:21] TEACHER: Right?   {#3649}
[03:25:23] TEACHER: I'm so glad you folks   {#3650}
[03:25:25] TEACHER: are going into these details. Like, this   {#3651}
[03:25:26] TEACHER: is what I wanted. Go into these   {#3652}
[03:25:29] TEACHER: details. You realize like, oh,   {#3653}
[03:25:31] TEACHER: do we need to have another thing or not?   {#3654}
[03:25:33] TEACHER: Now you see how it   {#3655}
[03:25:34] TEACHER: very well joins   {#3656}
[03:25:37] TEACHER: together and   {#3657}
[03:25:38] TEACHER: we have built a pretty decent system.   {#3658}
[03:25:41] TEACHER: And by the way, a lot of things is   {#3659}
[03:25:42] TEACHER: taken from Maglev. So read that paper   {#3660}
[03:25:44] STUDENT_2: in any case. One more query   {#3661}
[03:25:46] STUDENT_2: So Prometheus actually   {#3662}
[03:25:48] STUDENT_2: stores data.   {#3663}
[03:25:50] STUDENT_2: Now is that, I mean, I don't   {#3664}
[03:25:53] STUDENT_2: know, is that bound by the read   {#3665}
[03:25:55] STUDENT_2: queries? I mean, read queries mean you build   {#3666}
[03:25:57] STUDENT_2: views, right? Where you have rules   {#3667}
[03:25:59] STUDENT_2: also, violating some rules, general   {#3668}
[03:26:01] STUDENT_2: alerts based on the orchestra.   {#3669}
[03:26:03] STUDENT_2: So on the read side,   {#3670}
[03:26:05] STUDENT_2: is there any bottleneck there or   {#3671}
[03:26:07] STUDENT_2: is like Philly's label there as well?   {#3672}
[03:26:09] STUDENT_2: I mean, you can have n number of views.   {#3673}
[03:26:10] TEACHER: It's not that expensive because   {#3674}
[03:26:12] TEACHER: first of all, your query pattern   {#3675}
[03:26:14] TEACHER: would be you'll be doing recent reads last 30 minutes what happened correct   {#3676}
[03:26:20] TEACHER: so in any case the query load is not much just one orchestrator basically picking here   {#3677}
[03:26:29] TEACHER: there might be few like let's say you have one prometheus server shared between let's say 50   {#3678}
[03:26:36] STUDENT_5: load balancers that's okay or 100 load balancers so you need to know what's the capacity of it and   {#3679}
[03:26:41] STUDENT_5: how many load patterns you'd want it to support.   {#3680}
[03:26:43] STUDENT_2: Right.   {#3681}
[03:26:44] STUDENT_2: In general,   {#3682}
[03:26:45] STUDENT_2: in general,   {#3683}
[03:26:46] STUDENT_2: this is LB.   {#3684}
[03:26:46] STUDENT_2: That's okay.   {#3685}
[03:26:47] STUDENT_2: Because you only have one query pattern   {#3686}
[03:26:48] STUDENT_2: where you're just trying to read the load on a system.   {#3687}
[03:26:51] STUDENT_2: But in general,   {#3688}
[03:26:52] STUDENT_2: you have monitoring system   {#3689}
[03:26:52] STUDENT_2: in your complex network,   {#3690}
[03:26:54] STUDENT_2: complex system,   {#3691}
[03:26:55] STUDENT_2: right?   {#3692}
[03:26:55] STUDENT_2: You have only one monitoring system   {#3693}
[03:26:57] STUDENT_2: where Pometheus comes into picture.   {#3694}
[03:26:59] STUDENT_2: But that if you have multiple nodes   {#3695}
[03:27:00] STUDENT_2: and AWS cluster,   {#3696}
[03:27:02] STUDENT_2: we have very many nodes are there,   {#3697}
[03:27:04] STUDENT_2: right?   {#3698}
[03:27:05] STUDENT_2: So where you have   {#3699}
[03:27:06] STUDENT_2: N number of query patterns,   {#3700}
[03:27:08] STUDENT_2: right?   {#3701}
[03:27:08] STUDENT_2: Read query patterns,   {#3702}
[03:27:09] STUDENT_2: right?   {#3703}
[03:27:09] STUDENT_2: So write,   {#3704}
[03:27:10] STUDENT_2: we know,   {#3705}
[03:27:10] STUDENT_2: right?   {#3706}
[03:27:11] STUDENT_2: But what about the read part?   {#3707}
[03:27:13] STUDENT_2: Does it scale there?   {#3708}
[03:27:14] TEACHER: Yeah, you can horizontally scale Prometheus.   {#3709}
[03:27:17] TEACHER: You can have multiple query engines server running on it.   {#3710}
[03:27:21] TEACHER: Database also you can replicate.   {#3711}
[03:27:22] TEACHER: So you can create a replica of mostly, it uses InplexDB in the backend.   {#3712}
[03:27:30] TEACHER: Although it is configurable, you can use time scale DB as well.   {#3713}
[03:27:33] TEACHER: But the idea is you can very easily horizontally scale Prometheus in case you want to, because   {#3714}
[03:27:38] TEACHER: it's just raw storage that you are trying to scale.   {#3715}
[03:27:41] STUDENT_1: so it's very easy to scale horizontally uh dk yeah i just have a fundamental question here   {#3716}
[03:27:52] STUDENT_1: so what are the scenarios where i should use reverse proxy only reverse proxy what we call as   {#3717}
[03:27:58] STUDENT_1: and where and load balancers yeah to distribute the load but why should i use or go for reverse   {#3718}
[03:28:03] STUDENT_1: proxy if it is required i have never used it personally i have mostly used load balancer   {#3719}
[03:28:10] STUDENT_1: Sorry?   {#3720}
[03:28:11] STUDENT_1: Have you used load balancer?   {#3721}
[03:28:12] STUDENT_1: Yes, we use load balancer.   {#3722}
[03:28:14] STUDENT_9: That's very much proxy.   {#3723}
[03:28:15] STUDENT_1: But there are certain things like when we call it, you know, Nginx reverse proxy, there   {#3724}
[03:28:20] STUDENT_1: are any specific reasons or how it is different from, you know, your load balancer or what   {#3725}
[03:28:24] STUDENT_1: makes it?   {#3726}
[03:28:25] STUDENT_1: Same, same.   {#3727}
[03:28:26] TEACHER: There is no much difference there.   {#3728}
[03:28:28] TEACHER: There is no much difference.   {#3729}
[03:28:30] TEACHER: Okay.   {#3730}
[03:28:32] TEACHER: Right.   {#3731}
[03:28:32] TEACHER: Whenever you want to balance the load, there's a load balancer.   {#3732}
[03:28:35] TEACHER: That's a, a generic term for a load balancer is reverse proxy.   {#3733}
[03:28:39] STUDENT_1: Got it.   {#3734}
[03:28:40] STUDENT_1: Got it.   {#3735}
[03:28:41] STUDENT_1: Yeah.   {#3736}
[03:28:43] STUDENT_1: Rahul.   {#3737}
[03:28:44] STUDENT_7: Hi, Arpit.   {#3738}
[03:28:45] STUDENT_7: So I have a question on the heartbeat thing.   {#3739}
[03:28:48] STUDENT_7: So, uh, very, a small confusion here is do the backend server send the heartbeat or the   {#3740}
[03:28:53] STUDENT_7: orchestrator ask for it from the backend service.   {#3741}
[03:28:56] TEACHER: Okay.   {#3742}
[03:28:56] TEACHER: What did we discuss over here that you expose an endpoint slash health or something over   {#3743}
[03:29:03] TEACHER: here?   {#3744}
[03:29:03] TEACHER: So will it send the heartbeat or will you get it?   {#3745}
[03:29:06] TEACHER: you get it.   {#3746}
[03:29:08] TEACHER: Right?   {#3747}
[03:29:09] TEACHER: Because your service is down or not, who would know?   {#3748}
[03:29:12] TEACHER: You would.   {#3749}
[03:29:13] TEACHER: How?   {#3750}
[03:29:14] TEACHER: If your server is done.   {#3751}
[03:29:16] TEACHER: Right?   {#3752}
[03:29:16] TEACHER: So your business logic is running in a springboard server or a   {#3753}
[03:29:19] TEACHER: flask server or a Django server.   {#3754}
[03:29:20] TEACHER: You expose a slash health endpoint.   {#3755}
[03:29:22] STUDENT_5: How is less health endpoint send something?   {#3756}
[03:29:24] STUDENT_5: No, it is set to receive the request.   {#3757}
[03:29:26] STUDENT_7: Okay.   {#3758}
[03:29:27] STUDENT_7: And that endpoint you are storing it in the DB when you mentioned.   {#3759}
[03:29:30] STUDENT_5: Yeah.   {#3760}
[03:29:30] STUDENT_5: Yeah.   {#3761}
[03:29:31] STUDENT_5: Here is the load.   {#3762}
[03:29:32] STUDENT_5: Configuration is specific by the health check endpoint.   {#3763}
[03:29:34] STUDENT_7: Okay.   {#3764}
[03:29:35] TEACHER: server yeah for all the target servers behind it just specify the health checking okay okay go ahead   {#3765}
[03:29:43] STUDENT_10: okay so this health endpoint uh we talked about right uh does it have to always return a 200 uh   {#3766}
[03:29:52] TEACHER: you can configure what is the success uh return status is it 200 300 or 300 is also considered as   {#3767}
[03:30:00] TEACHER: okay but is for it in some cases you may also configure that hey success quota 200 300 400   {#3768}
[03:30:06] STUDENT_10: also it's an open just respond something right away or does it have to do some checks like is   {#3769}
[03:30:12] STUDENT_10: it able to connect to the database or is it able to do it's your health check endpoint you do   {#3770}
[03:30:17] TEACHER: whatever you want to do for typically what is the endpoint now you can choose if you'd want to   {#3771}
[03:30:23] TEACHER: connect and hit the database in ping and make sure it is okay or not if you just like my server is   {#3772}
[03:30:28] TEACHER: up everything is up.   {#3773}
[03:30:29] TEACHER: You might have to   {#3774}
[03:30:29] TEACHER: if my server is up,   {#3775}
[03:30:30] TEACHER: but I also need to   {#3776}
[03:30:31] TEACHER: check if the database   {#3777}
[03:30:32] TEACHER: up, then I'm up.   {#3778}
[03:30:33] TEACHER: It's your responsibility,   {#3779}
[03:30:34] TEACHER: not load balancer   {#3780}
[03:30:35] TEACHER: orchestras responsibility.   {#3781}
[03:30:36] TEACHER: It's your   {#3782}
[03:30:36] TEACHER: health check endpoint.   {#3783}
[03:30:38] STUDENT_10: Is it implemented   {#3784}
[03:30:39] STUDENT_10: that way?   {#3785}
[03:30:40] TEACHER: You have to   {#3786}
[03:30:40] TEACHER: implement it.   {#3787}
[03:30:42] TEACHER: Okay.   {#3788}
[03:30:43] TEACHER: In most cases,   {#3789}
[03:30:43] TEACHER: people implement   {#3790}
[03:30:44] TEACHER: health check as   {#3791}
[03:30:44] TEACHER: return okay.   {#3792}
[03:30:46] TEACHER: Health check   {#3793}
[03:30:46] TEACHER: implies the web   {#3794}
[03:30:47] TEACHER: server is running.   {#3795}
[03:30:48] TEACHER: It does not check   {#3796}
[03:30:49] TEACHER: if the database   {#3797}
[03:30:49] TEACHER: is running or not.   {#3798}
[03:30:50] TEACHER: But if you may   {#3799}
[03:30:51] TEACHER: want to do it   {#3800}
[03:30:52] TEACHER: in the health check   {#3801}
[03:30:52] TEACHER: handler, write it   {#3802}
[03:30:53] TEACHER: that make a call   {#3803}
[03:30:54] TEACHER: to DB and see   {#3804}
[03:30:55] TEACHER: if it is up or not.   {#3805}
[03:30:56] TEACHER: It's your health   {#3806}
[03:30:57] TEACHER: check endpoint.   {#3807}
[03:30:58] TEACHER: Right.   {#3808}
[03:30:58] TEACHER: So it's however you'd want to implement implement or consider would say just provide me health   {#3809}
[03:31:02] TEACHER: check endpoint.   {#3810}
[03:31:03] TEACHER: I'll make STTP request on top of it and see if I get 200 or 300 in the response.   {#3811}
[03:31:09] TEACHER: Got it.   {#3812}
[03:31:10] TEACHER: Right.   {#3813}
[03:31:13] STUDENT_5: Brilliant discussion.   {#3814}
[03:31:14] STUDENT_5: Quite interesting.   {#3815}
[03:31:15] STUDENT_5: Thanks.   {#3816}
[03:31:15] STUDENT_5: Thanks for this amazing questions.   {#3817}
[03:31:17] STUDENT_5: Yeah, go on.   {#3818}
[03:31:19] STUDENT_1: I think I'm repeating the question again, but back-end servers would be exposing the health.   {#3819}
[03:31:23] STUDENT_1: Yeah.   {#3820}
[03:31:25] STUDENT_1: Why is that needed?   {#3821}
[03:31:28] STUDENT_1: backend servers make direct pull request to orchestrate.   {#3822}
[03:31:31] STUDENT_5: Think about what could go around.   {#3823}
[03:31:32] STUDENT_5: Think about it.   {#3824}
[03:31:34] TEACHER: There is answer right there staring at your face there.   {#3825}
[03:31:38] TEACHER: Will backend server you are writing, you are deploying application.   {#3826}
[03:31:41] TEACHER: Do you know orchestrators IP address?   {#3827}
[03:31:45] STUDENT_17: No.   {#3828}
[03:31:46] TEACHER: Then.   {#3829}
[03:31:48] TEACHER: All right.   {#3830}
[03:31:49] TEACHER: Same thing that we discussed last week.   {#3831}
[03:31:51] TEACHER: Yeah.   {#3832}
[03:31:52] TEACHER: Right.   {#3833}
[03:31:52] TEACHER: Or last to last week.   {#3834}
[03:31:53] TEACHER: Basically online offer indicator.   {#3835}
[03:31:55] TEACHER: Do your backend server know IP address of client.   {#3836}
[03:31:58] TEACHER: No, then you can't do much.   {#3837}
[03:32:00] TEACHER: Do your business logic.   {#3838}
[03:32:01] TEACHER: No IP address of orchestra.   {#3839}
[03:32:02] TEACHER: No, then you can't send.   {#3840}
[03:32:03] TEACHER: And then in that case, you are just saying that, hey, my server is up, but maybe your   {#3841}
[03:32:07] TEACHER: process is down.   {#3842}
[03:32:08] TEACHER: That's why this is much better.   {#3843}
[03:32:10] TEACHER: Where orchestrator is, it has IP address of all the backend servers.   {#3844}
[03:32:13] TEACHER: It is pinging all of them and checking the health.   {#3845}
[03:32:15] STUDENT_1: So the tables have turned here, right?   {#3846}
[03:32:17] STUDENT_5: Yeah.   {#3847}
[03:32:19] STUDENT_5: Because you don't know IP address of orchestra.   {#3848}
[03:32:22] TEACHER: Your business logic does not have to know IP address of the orchestra.   {#3849}
[03:32:25] TEACHER: Otherwise, even if you know, you would have to have a thread running, which is continuously   {#3850}
[03:32:30] TEACHER: sending the hardbeats to them.   {#3851}
[03:32:31] TEACHER: That's much more complex implementation versus just exposing a helitine point.   {#3852}
[03:32:35] TEACHER: What would you prefer as a developer?   {#3853}
[03:32:39] STUDENT_5: That's it.   {#3854}
[03:32:40] STUDENT_5: See, think from customer side of it.   {#3855}
[03:32:44] STUDENT_5: Let's keep life simple.   {#3856}
[03:32:47] STUDENT_5: Great.   {#3857}
[03:32:48] STUDENT_9: Any other question?   {#3858}
[03:32:48] STUDENT_9: Anyone?   {#3859}
[03:32:49] STUDENT_9: Yes, Sitesh.   {#3860}
[03:32:51] STUDENT_3: Hey, Arpit.   {#3861}
[03:32:52] STUDENT_3: Now that I'm thinking more, one question, why is autoscaling a separate service from   {#3862}
[03:32:59] STUDENT_3: Orchestrator?   {#3863}
[03:33:00] TEACHER: AWS has a separate auto scaling thing.   {#3864}
[03:33:03] STUDENT_3: Oh, I see.   {#3865}
[03:33:03] STUDENT_3: Okay.   {#3866}
[03:33:04] TEACHER: And why that is different?   {#3867}
[03:33:05] TEACHER: Because then your user, your customers can configure scaling policies differently.   {#3868}
[03:33:11] TEACHER: That is their admin UI in which they are configuring and the machine that is keeping an eye on   {#3869}
[03:33:15] TEACHER: it.   {#3870}
[03:33:15] TEACHER: So Orchestrator keeps an eye and scales load balancer.   {#3871}
[03:33:17] TEACHER: either orchestrator can scale back and server depending on auto scaling policies or auto   {#3872}
[03:33:22] TEACHER: scaling can be a separate company either way implementation of you right so i thought there   {#3873}
[03:33:27] STUDENT_3: is a reason yeah i thought there is a reason you have separated it out maybe because of   {#3874}
[03:33:32] STUDENT_3: like we might have to keep orchestrator very minimal so that either way either way so depending   {#3875}
[03:33:38] TEACHER: on how how bulky as you very it depends basically how bulky or orchestrator is becoming right if it   {#3876}
[03:33:43] TEACHER: becoming very bulky have a separate component otherwise let orchestrator itself take care of   {#3877}
[03:33:48] TEACHER: this so then auto scaling policies needs to be stored in some db where orchestrator has access   {#3878}
[03:33:53] TEACHER: to and it just scales up backend server now who scales a backend server it depends either   {#3879}
[03:33:57] TEACHER: orchestrator can do it or a separate component does i explicitly added separate because in any   {#3880}
[03:34:02] TEACHER: case your developer would configure auto scaling policies anyway yeah that's true right so you need   {#3881}
[03:34:09] STUDENT_5: a separate component to accept those endpoints and configuration policies.   {#3882}
[03:34:14] STUDENT_5: So either that service takes care of that or it's simple too.   {#3883}
[03:34:22] STUDENT_10: In this case, who monitors orchestrator and auto skills orchestrator for orchestration itself.   {#3884}
[03:34:29] TEACHER: That's what we discussed.   {#3885}
[03:34:30] TEACHER: This is a leader election.   {#3886}
[03:34:33] TEACHER: So, so if master goes down, one of the leader, one of the followers would do about it and   {#3887}
[03:34:39] TEACHER: My entire orchestrator would never go down.   {#3888}
[03:34:41] TEACHER: Why?   {#3889}
[03:34:42] TEACHER: Because it's in a multi node mode, which means basically there are multiple   {#3890}
[03:34:46] TEACHER: nodes who are doing that.   {#3891}
[03:34:47] TEACHER: Some masters, one master, multiple followers, right?   {#3892}
[03:34:51] TEACHER: But then in any case, just like any other infrastructure, there would always   {#3893}
[03:34:54] TEACHER: be a global monitoring service, something that is taking care of all that is   {#3894}
[03:34:59] TEACHER: monitoring all the VMs out there, all the VMs kind of Prometheus kind of, right.   {#3895}
[03:35:06] TEACHER: But there would anyway be everything that is monitoring all of this.   {#3896}
[03:35:09] TEACHER: Like all the key components, like all the monitoring of all the orchestrators   {#3897}
[03:35:13] TEACHER: go in one place that is having its own leader.   {#3898}
[03:35:16] TEACHER: So, but that would be very minimal because you just have to keep check on the   {#3899}
[03:35:18] TEACHER: master orchestrator, everyone, if it is okay or not, and then take a reactive   {#3900}
[03:35:24] TEACHER: actions if something goes down.   {#3901}
[03:35:25] TEACHER: Right.   {#3902}
[03:35:26] TEACHER: But probability of that going down is minimized by having a standby.   {#3903}
[03:35:30] TEACHER: So that's the base condition of your recursion.   {#3904}
[03:35:34] TEACHER: So what it does is just, just monitors the masters of the, the master   {#3905}
[03:35:37] TEACHER: nodes of all orchestrator.   {#3906}
[03:35:39] TEACHER: It just triggers literary election in case it wants to, or just adds more worker notes   {#3907}
[03:35:44] TEACHER: if it wants to similar to how we did over here with orchestra, there might be an orchestrator   {#3908}
[03:35:49] TEACHER: for an orchestra and that would be the final.   {#3909}
[03:35:51] TEACHER: They would not be used.   {#3910}
[03:35:53] TEACHER: This would be final, right?   {#3911}
[03:35:55] TEACHER: Because all it has very minimal responsibilities now.   {#3912}
[03:36:02] TEACHER: Great.   {#3913}
[03:36:03] TEACHER: Any other question?   {#3914}
[03:36:04] TEACHER: Anyone?   {#3915}
[03:36:08] STUDENT_5: when I start concluding there will not be any question   {#3916}
[03:36:13] TEACHER: thanks thanks for tuning in tomorrow will be very fun discussion by the way thanks it's 12 36 but   {#3917}
[03:36:18] TEACHER: fun discussion quite detailed I love it keep asking discussion yeah it just makes our understanding   {#3918}
[03:36:23] TEACHER: much more clear and next uh that's all tomorrow is all about distribute id generators again   {#3919}
[03:36:28] TEACHER: intuition idea key implementation detail and answering those vives is what we'll do tomorrow   {#3920}
[03:36:34] TEACHER: Right. See you tomorrow morning. Bye bye.   {#3921}
