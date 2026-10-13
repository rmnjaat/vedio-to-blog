# chunk_02  OWNS 00:12:34 -> 00:23:23  (segments #206-#370, 1800 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:11:36] TEACHER: that could go wrong, would go wrong. Basically, basically Murphy's law. Then what happens is   {#187}
CTX| [00:11:43] TEACHER: that you are not guaranteeing the correctness of your system.   {#188}
CTX| [00:11:48] TEACHER: Imagine while doing a distributed transition things break and data go in an inconsistent   {#189}
CTX| [00:11:52] TEACHER: state and you didn't consider it while you're designing. Then you have data corruption,   {#190}
CTX| [00:11:58] TEACHER: right? And that's wrong. So this is the worst part of it. When you understand it really well,   {#191}
CTX| [00:12:04] TEACHER: you would hate distribute system.   {#192}
CTX| [00:12:07] TEACHER: But when you start building one,   {#193}
CTX| [00:12:09] TEACHER: you would find it very happy.   {#194}
CTX| [00:12:10] TEACHER: Oh, this is the best thing ever   {#195}
CTX| [00:12:11] TEACHER: because I can horizontally scale and whatnot.   {#196}
CTX| [00:12:13] TEACHER: So that's one thing that you would love also   {#197}
CTX| [00:12:15] TEACHER: and hate also for distribute system.   {#198}
CTX| [00:12:17] TEACHER: But this is indeed a key idea   {#199}
CTX| [00:12:20] TEACHER: through which you should approach   {#200}
CTX| [00:12:22] TEACHER: building distribute systems.   {#201}
CTX| [00:12:24] TEACHER: Right?   {#202}
CTX| [00:12:25] TEACHER: Assume anything and everything would go wrong.   {#203}
CTX| [00:12:29] TEACHER: Literally, literally.   {#204}
CTX| [00:12:31] TEACHER: And then you see if your code,   {#205}

---- OWNED SEGMENTS START ----
[00:12:34] TEACHER: system is handling that or not right okay so then enough of this how should we approach so there is   {#206}
[00:12:42] TEACHER: one thing that i've realized and this is my own so take it with a pinch of salt uh so one thing   {#207}
[00:12:50] TEACHER: that worked really well for me is whenever i design distribute systems quite a few now and   {#208}
[00:12:58] TEACHER: like they're truly distributed distributed not just cloud distributed distributed so what work   {#209}
[00:13:04] TEACHER: extremely well for us is always start with the day zero architecture.   {#210}
[00:13:09] TEACHER: Always don't over complicate on day zero.   {#211}
[00:13:12] TEACHER: One machine, one server, one database, one cache.   {#212}
[00:13:15] TEACHER: That's it.   {#213}
[00:13:16] TEACHER: Then scale each component independently.   {#214}
[00:13:18] TEACHER: See how it performs under load, rectify the system, re-architect and repeat.   {#215}
[00:13:24] TEACHER: This is exactly what you need to do.   {#216}
[00:13:26] TEACHER: But when you are doing this, when you see how it performs under load,   {#217}
[00:13:30] TEACHER: it's not just high level that you reflect.   {#218}
[00:13:32] TEACHER: Those low level details are the ones that are paid points.   {#219}
[00:13:36] TEACHER: And that is where you need to spend time into understanding what happens at a code level   {#220}
[00:13:41] TEACHER: when you are writing and building that service, what is going wrong, how we are fixing it.   {#221}
[00:13:46] TEACHER: Right? We'll touch upon all of those segments when we design load balance.   {#222}
[00:13:50] TEACHER: Okay. So we'll touch upon this. This is mostly the incremental approach of system design because   {#223}
[00:13:57] TEACHER: as a system design, it's all about basically building distributed systems.   {#224}
[00:14:02] TEACHER: It fits really well into those scheme of things and more complex systems that you design.   {#225}
[00:14:07] TEACHER: You would always see people iterating in this fashion.   {#226}
[00:14:12] TEACHER: Day zero scaling independently, step by step, step by step, step by step.   {#227}
[00:14:15] TEACHER: So it's like literally you having a microscope and looking into a culture and you are zooming in, you found something nice.   {#228}
[00:14:24] TEACHER: Then you go to much more granular detail, you see whole new world and then you zoom in, zoom again and you see something humongous.   {#229}
[00:14:32] TEACHER: what we are doing. We are just zooming in every time to just understand those granular details,   {#230}
[00:14:37] TEACHER: those situations and fixing them. Okay. One key reason why you should be building   {#231}
[00:14:44] TEACHER: distributed systems. Now here again, not some theoretical data. This is precisely why you   {#232}
[00:14:50] TEACHER: should build distributed systems. But in most cases, people think that they have distributed system,   {#233}
[00:14:56] TEACHER: but in reality they don't. They just have a bunch of remote machines that are talking to each other.   {#234}
[00:15:02] TEACHER: That's not distributed system.   {#235}
[00:15:03] TEACHER: A distributed system is what is able to handle a scale.   {#236}
[00:15:09] TEACHER: That is given.   {#237}
[00:15:09] TEACHER: You have a large number of machines.   {#238}
[00:15:10] TEACHER: You can handle it.   {#239}
[00:15:11] TEACHER: But more importantly, horizontal scalability.   {#240}
[00:15:14] TEACHER: Now, horizontal scalability does not come just because you have more machines.   {#241}
[00:15:19] TEACHER: It does not come just because you have a bunch of API servers who are handling the request   {#242}
[00:15:23] TEACHER: and I can scale them automatically.   {#243}
[00:15:25] TEACHER: Think of every single layer in your architecture and see if it is horizontal.   {#244}
[00:15:32] TEACHER: is scalable or not. If it is not, then that is a single point of view. Right from database,   {#245}
[00:15:38] TEACHER: database, cache, stateful services, stateless services, your API servers, your load balancer,   {#246}
[00:15:43] TEACHER: your CDN and whatnot, every single one of the component in whatever system that you're designing   {#247}
[00:15:50] TEACHER: needs to be horizontally scalable. Now, when we say horizontally scalable, what do we mean?   {#248}
[00:15:55] TEACHER: We just don't mean that we can just have an auto-scaling policy which gets triggered,   {#249}
[00:15:59] TEACHER: you add more server to handle the load.   {#250}
[00:16:02] TEACHER: It's much more than that.   {#251}
[00:16:04] TEACHER: Here it implies that you know the unit tech economic of your service.   {#252}
[00:16:11] TEACHER: That hey, how many requests each one of my server can handle?   {#253}
[00:16:16] TEACHER: Depending on which you can do linear amplification.   {#254}
[00:16:19] TEACHER: You need a linear amplification in order to build good distribute system.   {#255}
[00:16:23] TEACHER: Otherwise you are just playing with fire.   {#256}
[00:16:25] TEACHER: You are just increasing your machines without putting much thought.   {#257}
[00:16:31] TEACHER: So you would be leaking money in most cases.   {#258}
[00:16:33] TEACHER: You would be either under provisioning yourself or over provisioning yourself.   {#259}
[00:16:36] TEACHER: But in most cases, what is really required when people claim horizontal scalability is   {#260}
[00:16:41] TEACHER: you to know how much of load.   {#261}
[00:16:45] TEACHER: Now, this could be API load, processing load and whatnot.   {#262}
[00:16:48] TEACHER: How much of load each of your machine can do, can handle.   {#263}
[00:16:51] TEACHER: so that you know when you're scaling, you're not leaking money.   {#264}
[00:16:54] TEACHER: And that is what a good distributed system is all about.   {#265}
[00:16:59] TEACHER: Understanding the unit economy of a single server in your system.   {#266}
[00:17:03] TEACHER: And it obviously varies with the service that you have.   {#267}
[00:17:07] TEACHER: But which is what you need to remember that.   {#268}
[00:17:10] TEACHER: Understand the true horizontal scalability of it.   {#269}
[00:17:13] TEACHER: Understand the limitation of each server.   {#270}
[00:17:16] TEACHER: Understand how if you have a truly distributed system,   {#271}
[00:17:21] TEACHER: across all the layers rather than just saying,   {#272}
[00:17:24] TEACHER: oh, no, no, no, my API servers are this,   {#273}
[00:17:26] TEACHER: so I'm a distributed system.   {#274}
[00:17:27] TEACHER: No, that's not a distributed system.   {#275}
[00:17:30] TEACHER: Database, API server, everything.   {#276}
[00:17:33] TEACHER: In some cases, you are taking your chopping corners.   {#277}
[00:17:36] TEACHER: It is like, hey, I will not have database   {#278}
[00:17:39] TEACHER: as a hazardly scalable database, and it is perfectly fine   {#279}
[00:17:42] TEACHER: so long as it is able to handle the load.   {#280}
[00:17:46] TEACHER: We'll talk about a few very interesting details around it   {#281}
[00:17:49] TEACHER: as we move along, when we discuss load balancer.   {#282}
[00:17:52] TEACHER: Okay.   {#283}
[00:17:53] TEACHER: Now let's talk about load balancer.   {#284}
[00:17:56] TEACHER: Now this is where I want to spend some time into load balancing algorithm,   {#285}
[00:18:01] TEACHER: not theoretical.   {#286}
[00:18:02] TEACHER: I'll talk really practical about this.   {#287}
[00:18:04] TEACHER: Right.   {#288}
[00:18:04] TEACHER: Right.   {#289}
[00:18:05] TEACHER: I've changed load balancing algorithm by like in order to get performance.   {#290}
[00:18:08] TEACHER: I'll talk about that.   {#291}
[00:18:10] TEACHER: So load balance is this one rectangle box that we draw in every system.   {#292}
[00:18:15] TEACHER: Right.   {#293}
[00:18:15] TEACHER: And there's just, we assume it magically works obviously,   {#294}
[00:18:19] TEACHER: That is also a piece of code someone else has written.   {#295}
[00:18:21] TEACHER: We use AWS load balancer.   {#296}
[00:18:24] TEACHER: There are hundreds of engineers who have written AWS load balancers.   {#297}
[00:18:27] TEACHER: There are hundreds of infrastructure folks   {#298}
[00:18:29] TEACHER: who are installing those load balancers and whatnot.   {#299}
[00:18:32] TEACHER: So it is adding a piece of software that someone has built   {#300}
[00:18:36] TEACHER: or a team of engineers has built.   {#301}
[00:18:38] TEACHER: So given that, why can't we build it?   {#302}
[00:18:41] TEACHER: Why should we take it as a black box?   {#303}
[00:18:43] TEACHER: We need to understand how that thing functions.   {#304}
[00:18:46] TEACHER: So load balancer, because of load balancer,   {#305}
[00:18:49] TEACHER: lives have become really simple.   {#306}
[00:18:51] TEACHER: And we have literally started taking it for granted.   {#307}
[00:18:53] TEACHER: So we need to know how it is built.   {#308}
[00:18:56] TEACHER: If given this situation, let's build our own load balancer.   {#309}
[00:19:00] TEACHER: How should we approach this?   {#310}
[00:19:02] TEACHER: And instead of just looking at the core tech that you need to build it,   {#311}
[00:19:06] TEACHER: let's approach it from first principles so that we built a raw intuition   {#312}
[00:19:10] TEACHER: around building the system.   {#313}
[00:19:12] TEACHER: Will I ever get to build my own load balancer or not?   {#314}
[00:19:16] TEACHER: Flipkart has to build a like Flipkart had to build their own load balancer because they are still   {#315}
[00:19:20] TEACHER: having private infrastructure. Why not? Flipkart can't be on Amazon. Migrating to GCP was a pain   {#316}
[00:19:26] TEACHER: for them. They are having a non-premise. They are having their own data center. So they are,   {#317}
[00:19:31] TEACHER: they have to write their own load balances. So you may be thrown into a situation where you in   {#318}
[00:19:37] TEACHER: real world itself, you might have to write your own load balancer and scale it and whatnot like   {#319}
[00:19:43] TEACHER: A ton of things come with it the way you are using it.   {#320}
[00:19:47] TEACHER: But we'll talk about that.   {#321}
[00:19:49] TEACHER: Okay.   {#322}
[00:19:52] TEACHER: Now, one thing that I want to talk about is load balancing algorithm.   {#323}
[00:19:56] TEACHER: Now, this is where load balancer acts as a single point of entry.   {#324}
[00:20:02] TEACHER: So that is one domain name or one IP address that is not changing.   {#325}
[00:20:07] TEACHER: Anyone who wants to talk to your backend servers,   {#326}
[00:20:11] TEACHER: they all talk via this load balancer.   {#327}
[00:20:14] TEACHER: So because IP in domain of this machine is not changing,   {#328}
[00:20:18] TEACHER: the client does not really have to remember where to talk.   {#329}
[00:20:21] TEACHER: They just provide this machine's IP address and talk to this.   {#330}
[00:20:24] TEACHER: It's responsibility of load balancer to forward a request to one of the server to get it handled.   {#331}
[00:20:30] TEACHER: That is a load balancer for you.   {#332}
[00:20:32] TEACHER: Now, on what basis would this load balancer decide which server to forward the request to?   {#333}
[00:20:41] TEACHER: So this is load balancing algorithm.   {#334}
[00:20:44] TEACHER: We'll talk about three.   {#335}
[00:20:45] TEACHER: We'll talk about three in order to understand what they are, how to use it and where to use it.   {#336}
[00:20:52] TEACHER: So round robin is the most common one, which almost all load balancers default load balancing algorithm is round robin.   {#337}
[00:20:59] TEACHER: and as the name suggests you just do a round robin across all the backend servers that you have.   {#338}
[00:21:04] TEACHER: So for example whenever a request comes to the load balancer, load balancer keeps a track of   {#339}
[00:21:12] TEACHER: hey where did I forward my last request to which backend server? It knows that hey I forwarded my   {#340}
[00:21:19] TEACHER: request to backend server one so this time I followed the request to backend server two.   {#341}
[00:21:23] TEACHER: Now the next request comes and follows to backend server three and then one and then two and then   {#342}
[00:21:29] TEACHER: This is classic round problem.   {#343}
[00:21:32] TEACHER: But now, where do you use it?   {#344}
[00:21:35] TEACHER: You typically use it when you have almost uniform infrastructure.   {#345}
[00:21:40] TEACHER: Let's say I have my API servers, each 4 GB RAM.   {#346}
[00:21:45] TEACHER: So it does not.   {#347}
[00:21:46] TEACHER: And plus assume, not assume.   {#348}
[00:21:49] TEACHER: You would use it when you have uniform infrastructure and uniform load pattern, which means no matter   {#349}
[00:21:55] TEACHER: what API you hit, there is a fixed set of like time or a time range in which you can expect   {#350}
[00:22:04] TEACHER: a result.   {#351}
[00:22:05] TEACHER: Let's say it's less than one second.   {#352}
[00:22:06] TEACHER: So if all of your APIs respond in less than one second, you know that there is very less   {#353}
[00:22:13] TEACHER: variance in the response time, which means that it does not really matter to which server   {#354}
[00:22:20] TEACHER: it goes to.   {#355}
[00:22:21] TEACHER: Right.   {#356}
[00:22:22] TEACHER: And I'm assuming homogeneous load over here.   {#357}
[00:22:25] TEACHER: What happens is because you have uniform infrastructure, each machine having the same configuration   {#358}
[00:22:32] TEACHER: in most cases it is true.   {#359}
[00:22:35] TEACHER: What you get is you can literally send the request to one after another because there   {#360}
[00:22:40] TEACHER: is a very less variance in the response time of your APIs.   {#361}
[00:22:45] TEACHER: So it typically would not take very long on one server while very short time on another   {#362}
[00:22:52] TEACHER: server.   {#363}
[00:22:52] TEACHER: So given that you can literally do round robin and distribute, almost distribute the load   {#364}
[00:22:58] TEACHER: equally among the three subs.   {#365}
[00:22:59] TEACHER: That's the easiest of the 1.5.   {#366}
[00:23:02] TEACHER: Now there is another scheme to that called weighted round robin.   {#367}
[00:23:06] TEACHER: Now weighted round robin is where you configure the weights of a machine.   {#368}
[00:23:12] TEACHER: Let's say behind a load balancer, I have three machines, one with 4 GB RAM, second with 8 GB   {#369}
[00:23:18] TEACHER: RAM, third with 4 GB RAM.   {#370}
---- OWNED SEGMENTS END ----

CTX| [00:23:23] TEACHER: infrastructure due to some reason.   {#371}
CTX| [00:23:25] TEACHER: Let's say I have purchased a bunch of   {#372}
CTX| [00:23:26] TEACHER: reserved instances because of which   {#373}
CTX| [00:23:28] TEACHER: if I don't use them then there's a problem   {#374}
CTX| [00:23:30] TEACHER: I'm using money.   {#375}
CTX| [00:23:32] TEACHER: So you have this kind of setup   {#376}
CTX| [00:23:36] TEACHER: 4GB, 8GB and 4GB machine.   {#377}
CTX| [00:23:38] TEACHER: So now effectively if you just do   {#378}
CTX| [00:23:40] TEACHER: round robin then if these machines   {#379}
CTX| [00:23:43] TEACHER: operate at 80% capacity this machine   {#380}
CTX| [00:23:45] TEACHER: would be operating at 40% capacity.   {#381}
CTX| [00:23:47] TEACHER: Why? Because it is having 8GB RAM   {#382}
CTX| [00:23:49] TEACHER: twice as many cores   {#383}
CTX| [00:23:52] TEACHER: And it is still getting the exact same share of requests.   {#384}
CTX| [00:23:55] TEACHER: That seems wrong.   {#385}
CTX| [00:23:56] TEACHER: You are not utilizing your infrastructure.   {#386}
CTX| [00:23:58] TEACHER: Well, so which is where in case you have non-uniform infrastructure, you would   {#387}
CTX| [00:24:02] TEACHER: typically see people using weighted round-round where you forward the request   {#388}
CTX| [00:24:07] TEACHER: in the ratio of 1 is to 2 is to 1.   {#389}
CTX| [00:24:09] TEACHER: In this case, in the example, the data 4GB, 8GB and 4GB.   {#390}
CTX| [00:24:13] TEACHER: So now what would happen?   {#391}
CTX| [00:24:15] TEACHER: First request goes here.   {#392}
CTX| [00:24:16] TEACHER: Second request goes here.   {#393}
CTX| [00:24:18] TEACHER: Third request goes here.   {#394}
CTX| [00:24:19] TEACHER: Fourth request goes here.   {#395}
CTX| [00:24:20] TEACHER: 5th, 6th, 7th, 8th.   {#396}
