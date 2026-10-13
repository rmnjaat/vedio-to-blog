**[03:22:43] Student 11:** Okay.

**[03:22:44] Teacher:** That's what you do. Right. End user is valid or [?let's say | asr: "less of"] your transferring money from A to B. You want to authenticate it is indeed A who is doing the transfer. It's part of a business logic, right? Does your load balancer care about it? No. It's your business logic. You handle it. You send 404, you send 403 to user. Correct. So it's your backend service. Right. So this is load balancer. This, this is load balancer. This is load balancer. Right. This is your business logic. This is what you write as part of a logic where authentication and whatnot is taken care.

**[03:23:21] Teacher:** Okay. Sure. Uh, Rajeev.

<!-- topic-candidate [03:23:28]: Q&A - Prometheus resources, orchestrator follower state -->

> **Student Question [03:23:28] - Student 2 (Rajeev):** Uh, so, uh, do you have any video on time-series database, Prometheus? No, no, Prometheus, yeah. [check: "no no prometheus yeah" may be the teacher starting the answer]

**[~03:23:34] Teacher (answer):** Just a Prometheus is very easy to set up. Just follow that documentation. No good resources than that. Follow that documentation. It's so good, it's very well written, very easy to set up, Golang based, very easy to extend. Just go through the documentation. I don't have a video on Prometheus especially.

> **Student Question [~03:23:53] - Student 2:** Okay, one more question. I just was thinking about one flow, orchestrator leader going down and then a follower being promoted to a leader. Now this orchestra needs to know about LB servers, IPs as well as backend servers, IPs, you can put it in DB database, [unclear: "where I'll be console is there anyways"], provisioning them, and then [unclear: "mainly lead run"]. So basically, the orchestra leader and follow also exchange that [?replication | asr: "application"], I mean, [unclear: "for system has that"] the followers actually, it does not need to replicate between themselves.

**[03:24:26] Teacher (answer):** Right. Because it does not, it is not stateful. It is not storing any state over here. All the state is in database. Correct. Either here or here. These are stateless. It's just basically what it is doing. It is [?firing | asr: "finding"] queries to check if LB service needs to scale up or [?down | asr: "run"]. Does it maintain any state in memory?

**[03:24:47] Student 2:** Okay. So when the leader goes down the follower, any follower basically in the first place, leader election, one who finds out becomes the new leader and the servers just need to reply back whomsoever comes and ask them for a heartbeat.

**[~03:25:01] Teacher:** Correct, correct, correct. Because at the end, great question. Uh, how is heartbeat? It's, it's making HTTP request over here and here to get it, and so it's the orchestra is making the request to get it. So it's not that server has to, it just whoever makes the request of health check, someone responds to that. That's it. Okay. Right?

[03:25:23] I'm so glad you folks are going into these details. Like, this is what I wanted. Go into these details. You realize like, oh, do we need to have another thing or not? Now you see how it very well joins together and we have built a pretty decent system. And by the way, a lot of things is taken from Maglev. So read that paper in any case.

> **Student Question [~03:25:45] - Student 2:** One more query. So Prometheus actually stores data. Now is that, I mean, I don't know, is that bound by the read queries? I mean, read queries mean you build views, right? Where you have rules also, violating some rules, [?generate | asr: "general"] alerts based on the orchestra. So on the read side, is there any bottleneck there or is like [?fully scalable | asr: "Philly's label"] there as well? I mean, you can have n number of views.

**[03:26:10] Teacher (answer):** It's not that expensive because first of all, your query pattern would be, you'll be doing recent reads, last 30 minutes what happened, correct? So in any case the query load is not much, just one orchestrator basically picking here. There might be few, like let's say you have one Prometheus server shared between let's say 50 load balancers, that's okay, or 100 load balancers. So you need to know what's the capacity of it and how many load patterns you'd want it to support.

**[03:26:43] Student 2:** Right. In general, in general, this is LB. That's okay. Because you only have one query pattern where you're just trying to read the load on a system. But in general, you have monitoring system in your complex network, complex system, right? You have only one monitoring system where Prometheus comes into picture. But that if you have multiple nodes and AWS cluster, we have very many nodes are there, right? So where you have N number of query patterns, right? Read query patterns, right? So write, we know, right? But what about the read part? Does it scale there?

**[03:27:14] Teacher:** Yeah, you can horizontally scale Prometheus. You can have multiple query engines server running on it. Database also you can replicate. So you can create a replica of mostly, it uses [?InfluxDB | asr: "InplexDB"] in the backend. Although it is configurable, you can use TimescaleDB as well. But the idea is you can very easily horizontally scale Prometheus in case you want to, because it's just raw storage that you are trying to scale. So it's very easy to scale horizontally. Uh, DK.

<!-- topic-candidate [~03:27:46]: Q&A - reverse proxy vs load balancer -->

> **Student Question [~03:27:46] - Student 1 (DK):** Yeah, I just have a fundamental question here. So what are the scenarios where I should use reverse proxy, only reverse proxy, what we call as, and where, and load balancers, yeah, to distribute the load, but why should I use or go for reverse proxy if it is required? I have never used it personally, I have mostly used load balancer.

**[03:28:10] Teacher:** Sorry? Have you used load balancer?

**[03:28:12] Student 1:** Yes, we use load balancer.

**[03:28:14] Teacher:** That's very much proxy.

> **Student Question [03:28:15] - Student 1:** But there are certain things like when we call it, you know, Nginx reverse proxy, there are any specific reasons or how it is different from, you know, your load balancer or what makes it?

**[03:28:25] Teacher?:** Same, same.

**[03:28:26] Teacher (answer):** There is no much difference there. There is no much difference. Okay. Right. Whenever you want to balance the load, there's a load balancer. That's a, a generic term for a load balancer is reverse proxy.

**[03:28:39] Student 1:** Got it. Got it. Yeah.

**[03:28:43] Teacher:** Rahul.

<!-- topic-candidate [03:28:44]: Q&A - who sends the heartbeat, health check endpoint -->

> **Student Question [03:28:44] - Student 7 (Rahul):** Hi, Arpit. So I have a question on the heartbeat thing. So, uh, very, a small confusion here is do the backend server send the heartbeat or the orchestrator ask for it from the backend service.

**[03:28:56] Teacher (answer):** Okay. What did we discuss over here, that you expose an endpoint slash health or something over here? So will it send the heartbeat or will you get it? You get it. Right? Because your service is down or not, who would know? You would. How? If your server is [?down | asr: "done"]. Right? So your business logic is running in a Spring Boot server or a Flask server or a Django server. You expose a slash health endpoint.

**[03:29:22] Teacher:** How is slash health endpoint send something? No, it is set to receive the request.

> **Student Question [03:29:26] - Student 7:** Okay. And that endpoint you are storing it in the DB when you mentioned.

**[03:29:30] Teacher (answer):** Yeah. Yeah. Here is the [unclear: "load. Configuration is specific by"] the health check endpoint.

**[03:29:34] Student 7:** Okay.

**[03:29:35] Teacher:** Server, yeah, for all the target servers behind it, just specify the health checking. Okay, okay, go ahead.

> **Student Question [03:29:43] - Student 10:** Okay, so this health endpoint, uh, we talked about, right, uh, does it have to always return a 200?

**[03:29:52] Teacher (answer):** Uh, you can configure what is the success, uh, return status. Is it 200, 300, or 300 is also considered as okay, [unclear: "but is for it"] in some cases you may also configure that, hey, [?success code | asr: "success quota"] 200, 300, 400 also.

> **Student Question [~03:30:06] - Student 10:** [unclear: "It's an open"] just respond something right away or does it have to do some checks, like is it able to connect to the database or is it able to do

**[~03:30:15] Teacher (answer):** It's your health check endpoint. You do whatever you want to do for, typically, what is the endpoint. Now you can choose if you'd want to connect and hit the database in ping and make sure it is okay or not, if you just like, my server is up, everything is up. You might have to, if my server is up, but I also need to check if the database up, then I'm up. It's your responsibility, not load balancer orchestras responsibility. It's your health check endpoint.

**[03:30:38] Student 10:** Is it implemented that way?

**[03:30:40] Teacher:** You have to implement it. Okay. In most cases, people implement health check as return okay. Health check implies the web server is running. It does not check if the database is running or not. But if you may want to do it in the health check handler, write it that make a call to DB and see if it is up or not. It's your health check endpoint. Right. So it's however you'd want to implement implement, [?orchestrator | asr: "or consider"] would say just provide me health check endpoint. I'll make HTTP request on top of it and see if I get 200 or 300 in the response. Got it. Right.

**[03:31:13] Teacher:** Brilliant discussion. Quite interesting. Thanks. Thanks for this amazing questions. Yeah, go on.

> **Student Question [03:31:19] - Student 1:** I think I'm repeating the question again, but back-end servers would be exposing the health. Yeah. Why is that needed? Backend servers make direct pull request to [?orchestrator | asr: "orchestrate"].

**[03:31:31] Teacher (answer):** Think about what could go around. Think about it. There is answer right there staring at your face there. Will backend server you are writing, you are deploying application. Do you know orchestrators IP address?

**[03:31:45] Student?:** No.

**[03:31:46] Teacher:** Then. All right. Same thing that we discussed last week. Yeah. Right. Or last to last week. Basically online offline indicator. Do your backend server know IP address of client? No, then you can't do much. Do your business logic, [?know | asr: "No"] IP address of orchestra? No, then you can't send. And then in that case, you are just saying that, hey, my server is up, but maybe your process is down. That's why this is much better. Where orchestrator is, it has IP address of all the backend servers. It is pinging all of them and checking the health.

**[03:32:15] Student 1:** So the tables have turned here, right?

**[03:32:17] Teacher:** Yeah. Because you don't know IP address of orchestra. Your business logic does not have to know IP address of the orchestra. Otherwise, even if you know, you would have to have a thread running, which is continuously sending the heartbeats to them. That's much more complex implementation versus just exposing a health endpoint. What would you prefer as a developer? That's it. See, think from customer side of it. Let's keep life simple. Great.

**[03:32:48] Teacher:** Any other question? Anyone? Yes, Sitesh.

<!-- topic-candidate [03:32:51]: Q&A - why autoscaling is separate from the orchestrator -->

> **Student Question [03:32:51] - Student 3 (Sitesh):** Hey, Arpit. Now that I'm thinking more, one question, why is autoscaling a separate service from Orchestrator?

**[03:33:00] Teacher (answer):** AWS has a separate autoscaling thing.

**[03:33:03] Student 3:** Oh, I see. Okay.

**[03:33:04] Teacher:** And why that is different? Because then your user, your customers can configure scaling policies differently. That is their admin UI in which they are configuring and the machine that is keeping an eye on it. So Orchestrator keeps an eye and scales load balancer. Either orchestrator can scale backend server depending on autoscaling policies or autoscaling can be a separate component. Either way, [unclear: "implementation of you"], right?

**[~03:33:25] Student 3:** So I thought there is a reason. Yeah, I thought there is a reason you have separated it out, maybe because of like, we might have to keep orchestrator very minimal so that

**[~03:33:36] Teacher:** Either way, either way. So depending on how, how bulky [unclear: "as you very"], it depends basically how bulky or orchestrator is becoming, right? If it becoming very bulky, have a separate component, otherwise let orchestrator itself take care of this. So then autoscaling policies needs to be stored in some DB where orchestrator has access to, and it just scales up backend server. Now who scales a backend server? It depends, either orchestrator can do it or a separate component does. I explicitly added separate because in any case your developer would configure autoscaling policies anyway. Yeah, that's true. [check: "yeah that's true" may be Student 3] Right? So you need a separate component to accept those endpoints and configuration policies. So either that service takes care of that or it's simple too.

> **Student Question [03:34:22] - Student 10:** In this case, who monitors orchestrator and autoscales orchestrator for orchestration itself?

**[03:34:29] Teacher (answer):** That's what we discussed. This is a leader election. So, so if master goes down, one of the leader, one of the followers would do about it and my entire orchestrator would never go down. Why? Because it's in a multi node mode, which means basically there are multiple nodes who are doing that. Some masters, one master, multiple followers, right?

[03:34:51] But then in any case, just like any other infrastructure, there would always be a global monitoring service, something that is taking care of all, that is monitoring all the VMs out there, all the VMs, kind of Prometheus kind of, right. But there would anyway be everything that is monitoring all of this. Like all the key components, like all the monitoring of all the orchestrators go in one place that is having its own leader. So, but that would be very minimal because you just have to keep check on the master orchestrator, everyone, if it is okay or not, and then take a reactive actions if something goes down. Right. But probability of that going down is minimized by having a standby.

[03:35:30] So that's the base condition of your recursion. So what it does is just, just monitors the masters of the, the master nodes of all orchestrator. It just triggers leader election in case it wants to, or just adds more worker nodes if it wants to, similar to how we did over here with orchestra. There might be an orchestrator for an orchestra and that would be the final. They would not be used. This would be final, right? Because all it has very minimal responsibilities now.

<!-- topic-candidate [03:36:02]: Closing (admin) -->

**[03:36:02] Teacher:** *(admin)* Great. Any other question? Anyone? When I start concluding there will not be any question. Thanks, thanks for tuning in. Tomorrow will be very fun discussion. By the way, thanks, it's 12 36, but fun discussion, quite detailed. I love it. Keep asking discussion, yeah, it just makes our understanding much more clear. And next, uh, that's all. Tomorrow is all about distributed ID generators again. Intuition, idea, key implementation detail and answering those [?whys | asr: "vives"] is what we'll do tomorrow. Right. See you tomorrow morning. Bye bye.
