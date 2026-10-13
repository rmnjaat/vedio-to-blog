# Lecture 08 - Distributed systems: load balancer design, remote and distributed locks

| | |
|---|---|
| **Source** | lec08.merged.json |
| **Duration** | 03:36:34 |
| **Speakers** | Teacher = Arpit (TEACHER; most STUDENT_5 and STUDENT_9 turns; teacher leaks inside STUDENT_1/2/3/4/6/8/20 split per turn); Student N = STUDENT_N (STUDENT_1 and STUDENT_4 mix several students; a name is attached only to the turn right after the teacher calls it, e.g. Student 6 (Shalendra), Student 3 (Sitesh)); Student? = STUDENT_13-17/19 one-word back-channel and doubtful turns |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 403 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 238 (TERM? 126, UNCLEAR 54, SPEAKER? 29, CHECK 28, MISSING 1) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS (--strict), retention 99.47%, additions 0.38%, 0 unmatched log rows - see [verification_report.md](verification_report.md) |

## Topics covered

1. [00:00:02] Agenda for today *(admin)*
2. [00:04:15] Feedback *(admin)*
3. [00:09:03] Distributed systems - how to approach them
   - [00:12:34] Day zero architecture
   - [00:14:37] Horizontal scalability
4. [00:17:53] Load balancer and load balancing algorithms
   - [00:19:52] Round robin
   - [00:23:02] Weighted round robin
   - [00:26:01] Least connections
   - [00:33:24] Questions on least connections
5. [00:40:20] Designing a load balancer - low-level details
   - [00:43:08] Terminology - LB server vs backend server
   - [00:44:00] Single LB server and backend servers
6. [00:57:23] Load balancer code walkthrough
7. [01:08:17] Load balancer design brainstorm
   - [01:09:53] Storing the LB configuration
   - [01:14:01] Orchestrator and health checks
   - [01:19:52] Updating the LB servers' in-memory config
   - [01:23:06] Pushing config changes to LB servers
   - [01:27:17] Reactive config push - Pub/Sub and CDC
   - [01:30:20] Monitoring LB servers - orchestrator and vitals
   - [01:36:19] Central metrics store - telemetry agents and Prometheus
8. [01:40:27] Client reaching multiple LB servers - DNS and CoreDNS
   - [01:50:52] Final load balancer design diagram
   - [01:54:20] Questions - local DNS cache, CoreDNS availability
9. [01:59:39] Break *(admin)*
10. [02:04:59] Remote locks and distributed locks
   - [02:07:07] Synchronizing processes - apt-get and the dpkg lock file
   - [02:09:49] Hypothetical remote queue - one consumer at a time
   - [02:13:59] Database as a lock manager
   - [02:16:05] Lock expiry - TTL, Redis and Redlock
   - [02:22:27] Releasing the lock - ownership check
   - [02:26:18] Atomic release - Redis eval and Lua script
   - [02:27:53] Single Redis instance - fault tolerance and distributed locks
   - [02:32:29] Further reading - Chubby, Redlock critique
11. [02:35:16] Wrap-up and next class *(admin)*
12. [02:35:49] Q&A
   - [02:44:59] Synchronizing over the nearest shared storage
   - [02:47:41] Lock TTL, mutex vs network lock
   - [02:49:38] Single server - mutex or synchronized
   - [02:50:12] Redlock edge case - lock-holding instances going down
   - [02:57:34] Digression - writing my own malloc
   - [02:59:48] ZooKeeper vs Redis-based locking
   - [03:04:05] Can a consumer read multiple messages from a queue
   - [03:06:15] DNS and active-passive load balancers
   - [03:08:50] Session handling with multiple servers
   - [03:15:44] Orchestrator as single point of failure - leader election
   - [03:17:27] Private CoreDNS, public DNS and API gateway
   - [03:21:20] Load balancer vs reverse proxy
   - [03:22:02] Where authentication sits
   - [03:23:28] Prometheus resources, orchestrator follower state
   - [03:27:46] When to use only a reverse proxy
   - [03:28:44] Who sends the heartbeat - health check endpoint
   - [03:32:51] Why autoscaling is separate from the orchestrator
13. [03:36:02] Closing *(admin)*

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

<!-- chunk_01 00:00:02-00:12:34 -->

## [00:00:02] Agenda for today *(admin)*

**[00:00:02] Teacher:** Great. Week number three, day first. It's all about distributed systems this time. The agenda for today is around like, so, so basically tomorrow we'll be discussing distributed ID generators, but today our focus will be mostly on like distributed systems seems fancy. And to be honest, it was one of the most neglected subjects in basically during my bachelor's as well as master's. No one wanted to take that subject. But as soon as they enter industry, oh my God, distributed systems are everywhere. And that's the sad part. Most of these things, most of the core algorithms that people talk about, literature or not, what we are taught is a theoretical foundation for it. Now today, in most cases, like when we discuss the systems, you would see how beautifully those things fit into the right place. So the agenda for today is where we would start with primarily understanding how to approach distributed systems. I won't go into the theoretical part of it, but most importantly, when you are designing a system, how should you approach it? And there is no secret sauce. It's very easy. One thing that like you just need to remember one thing and you can build good systems, right?

[00:01:20] Then in order to like the core part, the core component that makes distributed systems possible is typically a load balancer, because it is what is abstracting the details of having multiple servers in the back end. So we would go through a design of load balancer, a very extremely realistic design of a load balancer. We would also take a very brief look into the source code of it to understand the core implementation logic rather than just drawing boxes. As I always say, drawing boxes is two-year-old kid can do that. Understanding this granular detail is the differentiating factor. So we'll go through the source code of a very tiny load balancer that I created. In no way it is productionizable, but you would understand how easy it is to write one. In most cases, we all get, oh my God, writing a load balancer. Most people don't even think of doing that. But there is an engineer who has wrote that. The one who built NGINX. People use NGINX as a reverse proxy. We'll build that. We would see how simple it is to build a load balancer. Hardly 10 lines of core code. That's it. That's it. [check: possible ASR duplicate] And I'm even exaggerating on that part. We would see it.

[00:02:34] Then we take a break and post that we would be having discussions around remote and distributed locking. This is one of the most essential part of a distributed system. Why? Because imagine you have multiple processors and they have to coordinate among themselves so that the data consistency thing stays in check. For example, I have two transactions happening in a distributed fashion, both of them trying to update the same row. One transaction needs to so that other does not update. Now this is a distributed setup, not a single database. So a lot of challenges come in. So remote locks and distributed locks, they form the heart and crux of data correctness and consistency in distributed systems. So which is how we would take a look at how you can implement, like first of all, why you need it. That's a more important question to answer. And then how do you implement it using Redis? And it's not just Redis. What will, like always, what will answer is, this will answer the fact that what's the core property that we see from a system that could be a lock manager so that you don't want to use Redis, build your own. So understanding the [?core | asr: "score"] access pattern, the core ways of building this is what matters, will take a very deep look into that. And to understand, like last week in order to understand database locking, we took an example of online offline, we took an example of airline check-in system, in distributed locking we take an example of synchronizing, it's a very hypothetical example, but we would solidify or understand, right? Okay, so that's the theme for today, a ton of detailed discussion.

## [00:04:15] Feedback *(admin)*

[~00:04:15] But before that, just a couple of feedbacks that I received. The last one said that why not share pre-reads on Discord channel itself. I did that, but it was, it made channel very inactive because there is a lot of links links links links, so you tend to miss out on interesting messages. You know, I send it every Sunday, just take a look at it. Right. So I've tried a lot. This is my 16th course. I've tried a lot of things in the past and I've picked and basically it's an evolution. So basically the natural selection kicked in. I did a lot of experiments on a lot of batches. I'm doing one right now with this batch, which I would tell to batches, which are let's say five or six cohorts later. So I did some experiments to understand what works and what doesn't work. This didn't work. So that's why I stopped sharing things on the Discord channel, the pre-reads. So what I am more, *(admin)* Rahul please go and [?mute it | asr: "view it"], there is a lot of background noise coming. So pre-reads, that's why I don't share on Discord. It's hardly just an email, keep an eye on it. It's always there on relog as well, beneath the video you will find it on pre-reads. So please refer to that. That didn't work out well the last time, that's why I stopped doing it.

[00:05:35] The second one was in the fourth session, I felt lost in the last section. I've seen focus decrease in any session that goes beyond one hour continuously, one hour plus continuously. All of our sessions are more than two hours, FYI. And try to keep your focus. It's not that difficult. Keep your phone in the different room. Focus on things that matter. Everything else is just mumbo jumbo that is ruining your life. So keep your focus intact. One thing that I always tell is have a pen paper handy. If you just listen, it would be very hard for you to keep. Most people, it is hard for them to keep concentration. So when I see a three hour long or when I used to go on lectures and whatnot, or I used to attend lectures and whatnot, I used to always have my notes handy. I used to just scribble things that would just keep me in my focus. I never lost focus while I was sitting in two hour long lecture also. So I would recommend you to do that.

[00:06:35] Why I don't want to break that. For example, the Slack discussion went for an hour and a half. If I would have broken it in, let's say, two parts. First of all, where do I draw the line? I did break it 7th, 8th and 9th cohort. I tried that. But what happened was it was a break in concentration for most. So what happened was it would have been easier if we would have continued the conversation rather than breaking it. Because then you have to set up the entire context again. A lot of people would forget. If you take a break, people would go and then they would never come back. Right? So, anyway, right now also people are free to leave. That's fine. But given that I tried that also, it did worse than what I thought. So, try to keep your concentration in check. Cup of coffee, whatever works for you. For me, what worked for me was taking notes. Taking notes, pen and paper, something like that.

[00:07:32] Physically doing it and not typing, because as soon as you have access to browser link in Twitter, Facebook, Instagram, WhatsApp, TikTok and whatnot would open, right? So if that is a root cause, put your, like throw away your phone into a different room, focus on things that [?matter | asr: "pattern"]. Trust me, having those deep continuous detailed discussion, what happens in real world, you would see design discussions going for three hours, four hours straight and you cannot just, again, I've lost focus. So try to improve it and I'm not saying I won't budge, but it's more importantly that when you're in a flow to cover a system needs to be in one shot. Right? There would be time where we would be doing two and a half, almost two hour long discussion on S3 without a break. You have to do it, otherwise problem is that you know it is much worse for people to build an understanding because I have to reset up the entire context, 20 minutes of extra time. So I tried that, but I'll try a few more times. Obviously point taken. In two systems that I can think of, I would add that break. But try to figure out things that works for you to improve your focus. I do that.

[00:08:44] But I have two systems in mind where I will be taking those breaks. So I'll basically let you know when I'm doing that. Okay. Those were it. I received two early notes. Nothing else of now, nothing else of now. Okay, done. Fine.

## [00:09:03] Distributed systems - how to approach them

[00:09:03] Now let's go to distributed systems. Most neglected subject, most important in real world. Great. Okay. So distributed systems, this is one of the most misused term. If I may put it, this is one of the most misused term in the age of social media. People use distributed systems anywhere. Distributed system. Wait, it's not that simple. So the beauty of distributed system is that what it gives you, it gives you an ability to abstract out the distributedness of the system. So that's what a distributed system is. Where for you, it's a single coherent system. Behind the is a gigantic set, or not gigantic but huge set of machines, they are doing their, like each machine is doing their job really well, but for you, for an outsider, it's just one single coherent system. Now outside is contextual, it may be end user, it may be some microservice, it may be some internal portal, it may be something, but for you the complexities of it running on different machine is abstracted for it, just one single system.

[00:10:16] I'll give you an example. Facebook.com. For us, it's just one website. A college kid can think, I can build Facebook. But when it comes to scaling, you realize how many different kinds of services need to interact with each other in order to just render a simple home feed. That's what distributed systems is all about. But much more than that, the worst part and the best part. So I'll give a justification to this statement. So what I feel is when I was doing this course in my master's, systems [?our | asr: "are a"] professor always used to say that you love distributed system for one thing and you'll hate distributed system for one thing. And that's exactly, I just, I just basically paraphrased it, but he used to always say this, he had like published 50, 20 papers [unclear: "and you got"] in distributed systems. We learned so much from him, but the, what, what happened here is what he always used to tell us is that you'll fall in love with distributed systems if you understand it well and you will hate distributed systems when you understand it well. So why so? Because with distributed systems what happens is anything that could go wrong would go wrong. You can literally think, hey, this condition would never happen, next day that happens, next day your system would go down because if you do not handle this particular scenario where anything that could go wrong, would go wrong. Basically, basically Murphy's law. Then what happens is that you are not guaranteeing the correctness of your system.

[00:11:48] Imagine while doing a distributed transaction things break and data go in an inconsistent state and you didn't consider it while you're designing. Then you have data corruption, right? And that's wrong. So this is the worst part of it. When you understand it really well, you would hate distributed system. But when you start building one, you would find it very happy. Oh, this is the best thing ever, because I can horizontally scale and whatnot. So that's one thing that you would love also and hate also for distributed system. But this is indeed a key idea through which you should approach building distributed systems. Right? Assume anything and everything would go wrong. Literally, literally. And then you see if your code,

<!-- chunk_02 00:12:34-00:23:23 -->

### [00:12:34] Day zero architecture

**[00:12:34] Teacher:** ...system is handling that or not, right? Okay. So then, enough of this. How should we approach? So there is one thing that I've realized, and this is my own, so take it with a pinch of salt. So one thing that worked really well for me is, whenever I design distributed systems, quite a few now, and like they're truly distributed, distributed, not just cloud distributed, distributed. So what work extremely well for us is always start with the day zero architecture. Always don't over complicate on day zero. One machine, one server, one database, one cache. That's it. Then scale each component independently. See how it performs under load, rectify the system, re-architect and repeat. This is exactly what you need to do.

[00:13:26] But when you are doing this, when you see how it performs under load, it's not just high level that you reflect. Those low level details are the ones that are pain points. And that is where you need to spend time into understanding what happens at a code level when you are writing and building that service, what is going wrong, how we are fixing it. Right? We'll touch upon all of those segments when we design load balancer. Okay. So we'll touch upon this. This is mostly the incremental approach of system design because as a system design, it's all about basically building distributed systems. It fits really well into those scheme of things and more complex systems that you design. You would always see people iterating in this fashion. Day zero, scaling independently, step by step, step by step, step by step.

[00:14:15] So it's like literally you having a microscope and looking into a culture, and you are zooming in, you found something nice. Then you go to much more granular detail, you see whole new world, and then you zoom in, zoom again and you see something humongous. What we are doing. We are just zooming in every time to just understand those granular details, those situations and fixing them. Okay.

### [00:14:37] Horizontal scalability

[~00:14:37] One key reason why you should be building distributed systems. Now here again, not some theoretical data. This is precisely why you should build distributed systems. But in most cases, people think that they have distributed system, but in reality they don't. They just have a bunch of remote machines that are talking to each other. That's not distributed system. A distributed system is what is able to handle a scale. That is given. You have a large number of machines. You can handle it. But more importantly, horizontal scalability.

[00:15:14] Now, horizontal scalability does not come just because you have more machines. It does not come just because you have a bunch of API servers who are handling the request and I can scale them automatically. Think of every single layer in your architecture and see if it is horizontal, is scalable or not. If it is not, then that is a [?single point of failure | asr: "single point of view"]. Right from database, database, cache, stateful services, stateless services, your API servers, your load balancer, your CDN and whatnot, every single one of the component in whatever system that you're designing needs to be horizontally scalable. Now, when we say horizontally scalable, what do we mean? We just don't mean that we can just have an auto-scaling policy which gets triggered, you add more server to handle the load. It's much more than that.

[00:16:04] Here it implies that you know the [?unit economics | asr: "unit tech economic"] of your service. That, hey, how many requests each one of my server can handle? Depending on which you can do linear amplification. You need a linear amplification in order to build good distributed system. Otherwise you are just playing with fire. You are just increasing your machines without putting much thought. So you would be leaking money in most cases. You would be either under provisioning yourself or over provisioning yourself. But in most cases, what is really required when people claim horizontal scalability is you to know how much of load. Now, this could be API load, processing load and whatnot. How much of load each of your machine can do, can handle, so that you know when you're scaling, you're not leaking money. And that is what a good distributed system is all about. Understanding the unit economy of a single server in your system.

[00:17:03] And it obviously varies with the service that you have. But which is what you need to remember that. Understand the true horizontal scalability of it. Understand the limitation of each server. Understand how if you have a truly distributed system, across all the layers, rather than just saying, oh, no, no, no, my API servers are this, so I'm a distributed system. No, that's not a distributed system. Database, API server, everything. In some cases, you are taking your chopping corners. It is like, hey, I will not have database as a horizontally scalable database, and it is perfectly fine so long as it is able to handle the load. We'll talk about a few very interesting details around it as we move along, when we discuss load balancer. Okay.

## [00:17:53] Load balancer and load balancing algorithms

[00:17:53] Now let's talk about load balancer. Now this is where I want to spend some time into load balancing algorithm, not theoretical. I'll talk really practical about this. Right. Right. I've changed load balancing algorithm by like in order to get performance. I'll talk about that. So load balancer is this one rectangle box that we draw in every system. Right. And there's just, we assume it magically works obviously. That is also a piece of code someone else has written. We use AWS load balancer. There are hundreds of engineers who have written AWS load balancers. There are hundreds of infrastructure folks who are installing those load balancers and whatnot. So it is adding a piece of software that someone has built or a team of engineers has built. So given that, why can't we build it? Why should we take it as a black box? We need to understand how that thing functions.

[00:18:46] So load balancer, because of load balancer, lives have become really simple. And we have literally started taking it for granted. So we need to know how it is built. If given this situation, let's build our own load balancer. How should we approach this? And instead of just looking at the core tech that you need to build it, let's approach it from first principles so that we built a raw intuition around building the system. Will I ever get to build my own load balancer or not? Flipkart has to build a, like Flipkart had to build their own load balancer because they are still having private infrastructure. Why not? Flipkart can't be on Amazon. Migrating to GCP was a pain for them. They are having an on-premise. They are having their own data center. So they are, they have to write their own load balancers. So you may be thrown into a situation where you, in real world itself, you might have to write your own load balancer and scale it and whatnot. Like, a ton of things come with it, the way you are using it. But we'll talk about that. Okay.

### [00:19:52] Round robin

[00:19:52] Now, one thing that I want to talk about is load balancing algorithm. Now, this is where load balancer acts as a single point of entry. So that is one domain name or one IP address that is not changing. Anyone who wants to talk to your backend servers, they all talk via this load balancer. So because IP in domain of this machine is not changing, the client does not really have to remember where to talk. They just provide this machine's IP address and talk to this. It's responsibility of load balancer to forward a request to one of the server to get it handled. That is a load balancer for you. Now, on what basis would this load balancer decide which server to forward the request to? So this is load balancing algorithm. We'll talk about three. We'll talk about three in order to understand what they are, how to use it and where to use it.

[00:20:52] So round robin is the most common one, which almost all load balancers default load balancing algorithm is round robin. And as the name suggests, you just do a round robin across all the backend servers that you have. So for example, whenever a request comes to the load balancer, load balancer keeps a track of, hey, where did I forward my last request to, which backend server? It knows that, hey, I forwarded my request to backend server one, so this time I [?forwarded | asr: "followed"] the request to backend server two. Now the next request comes and [?forwards | asr: "follows"] to backend server three, and then one, and then two, and then... This is classic round robin.

[00:21:32] But now, where do you use it? You typically use it when you have almost uniform infrastructure. Let's say I have my API servers, each 4 GB RAM. So it does not. And plus assume, not assume. You would use it when you have uniform infrastructure and uniform load pattern, which means no matter what API you hit, there is a fixed set of like time or a time range in which you can expect a result. Let's say it's less than one second. So if all of your APIs respond in less than one second, you know that there is very less variance in the response time, which means that it does not really matter to which server it goes to. Right. And I'm assuming homogeneous load over here.

[00:22:25] What happens is, because you have uniform infrastructure, each machine having the same configuration, in most cases it is true, what you get is you can literally send the request to one after another, because there is a very less variance in the response time of your APIs. So it typically would not take very long on one server while very short time on another server. So given that, you can literally do round robin and distribute, almost distribute the load equally among the three [?servers | asr: "subs"]. That's the easiest of the [unclear: "1.5"].

### [00:23:02] Weighted round robin

[00:23:02] Now there is another scheme to that called weighted round robin. Now weighted round robin is where you configure the weights of a machine. Let's say behind a load balancer, I have three machines, one with 4 GB RAM, second with 8 GB RAM, third with 4 GB RAM.

<!-- chunk_03 00:23:23-00:35:32 -->

**[00:23:23] Teacher:** infrastructure due to some reason. Let's say I have purchased a bunch of reserved instances because of which if I don't use them then there's a problem, I'm [?losing | asr: "using"] money. So you have this kind of setup, 4GB, 8GB and 4GB machine. So now effectively if you just do round robin, then if these machines operate at 80% capacity, this machine would be operating at 40% capacity. Why? Because it is having 8GB RAM, twice as many cores. And it is still getting the exact same share of requests. That seems wrong. You are not utilizing your infrastructure. Well, so which is where in case you have non-uniform infrastructure, you would typically see people using weighted round robin, where you forward the request in the ratio of 1 is to 2 is to 1. In this case, in the example, the data 4GB, 8GB and 4GB. So now what would happen? First request goes here. Second request goes here. Third request goes here. Fourth request goes here. 5th, 6th, 7th, 8th. So it would happen like this. This way you utilize your infrastructure really.

[00:24:29] When I say, where do I configure? Every single load balancer that you use has a set of algorithms that you can pick from. Depending on the algorithm, there is set of configuration that you can pass. Go through the official documentation of the load balancer that you are using. In case you don't see that option on your cloud due to any reason, because it might be behind a feature flag, reach out to your cloud provider, raise a support ticket, ask them you want to configure your load balancing algorithm. They have those options. But this is where you would use weighted round. I actually configured weighted round because we made a blunder in purchasing reserved instances. We purchased reserved instances on AWS of different sizes and they were not ready to change it. We had, instead of just keeping them spare, we just put it into our existing workloads and just apply weighted round robin and got this thing.

[~00:25:16] And so this is exactly where you can use weighted round robin. Now it's all about, if you see the pattern over here, it's always about money. Are you using your, are you utilizing an infrastructure well or not? This is exactly what an engineer needs to think about, or specifically a [unclear: "serial engineer"] needs to think about. Otherwise if you don't care about money, then it doesn't matter. Now put it 60 GB RAM machine and have a round robin. That's not efficient utilization of your resources that you have. So keep those things in mind, that try to save money for your organization, and that's how you can make a quantified impact. It's easy for you to pitch for your promotion, as simple as that.

### [00:26:01] Least connections

[00:26:01] Now a really interesting one that a lot of people take it for granted is least connections. I won't go into other [?details | asr: "deals"]. These three only are talking about. But you can see the intuition behind where to pick one. Similarly, you can apply for other algorithms as well.

[00:26:17] So least connections is what happens is if you configure your load balancer in the least connection mode, which means that when a request comes to the load balancer, load balancer checks which of the backend server has least number of connections to the load balancer. As we had connection pooling for databases, think of it in a similar way. When request comes to load balancer, load balancer can create multiple connections with the server. It would keep a track of that what are the least number of connections that it has to a particular server. It would pick that. It's not a connection pool. I just use that as an example.

[00:26:54] But when a request comes in, load balancer picks a machine and sends a request to, and it says that, "Hey, I have one connection active at the moment." Next request comes in, sends it over. connection active at the moment. Next request comes in, sends it over here. I have one connection active at the moment with this server. Now when the next request comes in, sends it over here. But now the first request that happened is now done. The next request comes in, it can send it to the first one itself. So the idea is the load balancer will keep track of how many active connections it has to the backend servers, each of the backend servers. And when a new request comes in, it sees that which one it has the least number of connections to, then it sends the request to that.

[00:27:42] So now it's like, what's the relation between connection? If you are not doing connection pooling, then if your connection is open, it means that the server is busy doing some work. Imagine HTTP request. You made an HTTP request to load balancer. [unclear: "are load bands are made in"] HTTP request to the backend server. When the server responds, this HTTP connection will be terminated. When this response, this connection will be terminated. Which means for the time the connections are active, it actually means the server is busy. So more number of connections from the server implies more busy the server is. So with least connections, what you are doing is you are improving the chances, or you are improving the execution time of your request by forwarding it to the machine that is least burdened at the moment. This way, you are increasing the probability of you getting quicker response times.

[00:28:51] But now, if this is not so good, then where do we use it? I'll give an example, a really practical example. Imagine you are serving workload that is having very high variance, which means that some APIs might take one second, some API might take one minute, some API might take one hour to respond. What kind of load is this? Analytics. Analytics. Some analytics queries give you answer in one second, some analytics queries give you answer in one hour, some analytics queries give you the answer in two hours, something around, right? Take that as an example, and that's very good because there is a huge variance, which is why I introduced [?variance | asr: "variants"] over here. It was near uniform load, all APIs responded within a very short time window, right? Here let's say there is a huge variance.

[00:29:40] Now imagine when the request came in, request came in, it went to the server, server started processing. The second request came in, this server had zero connection, second request went over here, third request went over here. Now when the fourth request came in, it just picked this server now, because let's say the second request that happened was very short, it was one second request, it got free, it got resolved immediately, like in one second. When the next request came in, it found that there is one connection over here, because these are long running, so it would make the request to the second one, because it, the second request, like the second request that was made was completed, so the fourth request went to the second server, right? But now there is a chance where now fourth request is a really long running one, one or two are longer, right? Then the next request, it picked the first server.

[00:30:39] So here you can see that if my server, so if I would have used round robin, just blunt round robin, server was having large number of requests. Unfortunately all long running requests were just getting scheduled because it was round robin, all long running requests were just getting bogged onto this one server. The server that is already busy doing processing of those long running requests, you are bombarding it with more long running requests. That's a problem, which is where when you have very large variance in the response times or in the processing times of your request, it's better to go for least connections based approach. This way your request will be forwarded to a machine which is relatively free.

[00:31:23] Now here the beauty is load balancer does not have an idea of CPU or memory on this machine. All it has is idea of network connection. So it needs to be extremely stateless. So it can just pick a server which is having least number of connections, because that's a degree, like that's a rough estimate on how busy the backend server is. Because if you try, a lot of people say, "Oh, why are we not capturing CPU and this and let load balancer use it?" Imagine the complexities of that system. Now load balancer has to communicate to one more thing, [?fire | asr: "file"] the query, see the historical usage and then see where to forward. It would slow things down. Load balancer needs to be lightning fast. You cannot just waste time doing the data analysis to find out where to forward a request. You cannot add the network latency. itself is a, you are adding a new network. Don't make things too complicated over there. Right.

[00:32:16] This is one of the reasons why you apply heuristics with algorithms around load balancing, because you need to take decision right there and there in microseconds, not even milliseconds. If you see the, "I'll check the CPU usage of all of this." This is the most common random thing people say. Always think about practicality whenever you suggest something. Is this really practical or fun? "I am thinking that my load balancer will keep a check on CPU and memory of all this and pick the one that is least busy." For it to know the CPU and all of this of all of the servers, and then finding out which one is the least busy, and then forwarding the request to, adds up multiple milliseconds of latency. You cannot afford that. It needs to happen in microseconds, not even milliseconds. This way, because of this, the decision needs to be done by this server almost instantly. So what's the simplest degree of understanding that, "Hey, this is slow it up. Or this is possible. This server is overburdened connections." Right. So this is where you would use least connections based approach, where you have huge variance in response. Right.

### [00:33:24] Questions on least connections

[00:33:24] Okay. Any questions up until this stage? I'll take three and then we'll move forward. Yeah. Anupab. [check: name spelling]

> **Student Question [00:33:32] - Student 7 (Anupab):** So I wanted to understand if the load balancer using these connections has to maintain persistent connections with all the machines.

**[00:33:41] Teacher (answer):** No, it would not. If it makes persistent connections, then how would it know? But it can. It can. And then it's your code. You can make persistent connection, have a connection pool and know which one are active. Either you go complete stateless or you keep a connection pool. That's also fine. But then your load balancer needs to know that if this is the connection pool that I have, when I say least connections, it is least active connections, because you have a connection pool of let's say a hundred, but out of which you are using two, then two are active and 98 are inactive. Right? So then it becomes least active connections in case you would want to implement it that way. You can pick it up perfectly.

**[00:34:18] Student 3:** Understood.

> **Student Question [00:34:19] - Student 7:** Might be missing some common understanding, but how does a long, like maybe something that takes one hour, happen over HTTP?

**[00:34:30] Teacher (answer):** Just don't think of HTTP, right? The HTTP is not the only protocol. Correct. It's a raw TCP. You fired a request. TCP connection automatically never breaks off, right? Someone has to break it off. Correct. Either network interruption or client terminating or server terminating. If client and server don't terminate, if network does not go [unclear: "buzzard"], your TCP connection would remain active forever. Correct. Don't just think of HTTP. HTTP itself tells your client and server to terminate a connection as soon as you got the response. But with keep-alive, you can still keep it open. I have had long running, extremely long running HTTP request also, but not from the end user context. It was server to server communication. gRPC, classic example, works on top of HTTP/2, the connection never terminates unless someone explicitly does that.

**[00:35:22] Student?:** Right?

**[00:35:22] Teacher:** So imagine raw TCP, imagine non-terminating HTTP connections.

**[00:35:28] Student 3:** Okay.

<!-- chunk_04 00:35:32-00:46:19 -->

**[00:35:32] Teacher:** Any other question?

**[00:35:36] Teacher:** Great, we'll move forward. Hello? Okay, please raise your hand the next time, it becomes easier for me.

**[00:35:42] Student 3:** Yeah, I was trying to find that option, but I didn't.

> **Student Question [00:35:45] - Student 3:** So my question is, can you please change the slide? Yeah, on this least connection part. Let's say you have said that one request goes to the first one and it took around one hour to execute, and the second request goes to second one, which is a quicker one, one minute, one second, whatever. And the third one is took two hours to finish. So in this algorithm, let's say we have the fourth request and load balancer will assign it to the second one, and that also took around two hours, the huge one. Now in case of fifth request, we have included that load balancer will decide it either to send it to the least connection, but currently we have the least connection over the first node and the third node, correct? So pick one at random. What's the problem? It's random, but let's say both is having a, first one is having a query that is taking one hour.

**[00:36:50] Teacher (answer):** So then you need more servers to handle, right? Here you are assuming that a server can handle only one query. Why?

**[00:36:57] Student 3:** No, not exactly assuming that this handling. Yeah. I was just checking for the time it took. Let's say load balancer assign, redirect that query to the third server, right? Then the first one is about to finish, but load balancer is not aware about that, that CPU and all, it does not, it does not, it has no idea about it. Yeah, yeah. In that case it still stays like third place.

**[~00:37:21] Teacher (answer):** Why would you want to go for global optimization? Local optimization still works. Yeah, yeah, right. And then if you are having such huge amount of workloads, then you would not just have three [?servers | asr: "source"], you'd have far too many, yeah, right? And you would just try to maximize on the execution time of all the requests that are handling. This is typically, and by the way, this is exactly what data warehouses do. If you go through BigQuery's Redshift documentation, you will find least connection-based balancing across [?clusters | asr: "structures"]. Not really kidding. If you can find it there. Because data warehouse is a classic case where you have short-running queries, also long-running queries also. To pick one, to pick the best packet, it uses this one.

**[00:38:06] Student?:** Thanks.

**[00:38:08] Teacher:** I'll take one more. Rajiv. Go on.

> **Student Question [00:38:12] - Student 2 (Rajiv):** From end user perspective with this setup, let's say I have opened my browser and then submitted a request. I was not sure how much time it would take for the application to come up with a result. I got frustrated. Either I close the browser or hit enter again. So if I close the browser and then the connection from my browser to [?load balancer | asr: "load the answer"] goes off, but the job is still running on the application. Press and enter again, submit the job based on connection or whatever algorithm we use, the same request goes to another VM. Now effectively the [?load balancer | asr: "load presenter"] knows my IP address. So would it give back two results to me?

**[00:38:52] Teacher (answer):** How this, that's your business logic.

[00:38:54] It's, if you are having this kind of state, statefulness, then you have to [?ensure | asr: "enter"] that it goes to that same machine and there is a way for it to identify, but because it is TCP, once it's broken, it's broken. So then you would never have it this way that your connection never breaks off. Right. Then you do [?asynchronous | asr: "a synchronous"] processing.

**[00:39:12] Student 2:** I was thinking that if, if the browser goes off, that means the user was not really interested a lot of time. So is there any way that, I mean, practically are there a way we stop the job?

**[00:39:23] Teacher:** No.

**[00:39:24] Teacher:** Once it's submitted, it's submitted. So there are, if you're having extremely long running job, you can stop it. But normal HTTP web servers, they don't give you those [?toolings | asr: "two links"] to do that. Okay. Okay. But you can obviously implement it. There is nothing difficult in implementing it.

[00:39:39] You can very well implement it. When the TCP breaks off, you get notified right on the socket that okay, the connection has gone on. You know that.

**[00:39:46] Student 2:** Yes, yes.

**[00:39:47] Teacher:** You can implement it. If your underlying execution engine, you have control over that. Then you can do that. That's what Redshift and BigQuery gives you. When you fire a very long running query, there is an option to cancel your run. It stops the execution. It can do that, but it depends on what kind of thing. If you want to do it on a normal HTTP web server, hard to do it because it does not give you those necessary tools to do that, but you can tweak it. And then it's an open source code base. You can tweak it if you want to. Okay. I'll take your question.

## [00:40:20] Designing a load balancer - low-level details

[00:40:20] Now let's move to designing load balancer. Okay. Now we'll go into the nitty gritties of load balancers, like how to even think of building one, right? And with this what I would want to touch upon is how easy, trust me, extremely easy to build a load balancer. When I first built it, I'll tell you how happy I was. It was exactly, not exactly, it was almost two years back, March 2021. I was preparing for cohort, I was going to take this in my first ever cohort, March 21, and I wanted to show a real demo of load balancer so that I have very detailed understanding. I knew, I read few papers to understand it, but I wanted to get the practical experience that, hey. So I built my load balancer. I'd use normal Golang to build one. When it first ran, I was so happy. I was at my in-laws, it was all, it was basically COVID time, so I could not go out anywhere. I was with my in-laws. I explained load balancer to everyone I could find in my house. I... No one understood the thing, but it's fine.

[00:41:26] But that joy, that happiness that I got when my first load balancer balanced the load across different servers with different algorithms, with consistent hashing, with round robin, weighted round robin, static routing and whatnot. I was all over the house. Because it was so, that feeling is unmatchable. When something that you have almost taken it for granted as a black box and you actually implement it. I immediately benchmarked it with Nginx, HAProxy and whatnot. I understood where the time takes up. Mine was 5x or 6x faster than Nginx. I said, hey, I just had a breakthrough. But no, basically Nginx and HAProxy does much more than what my [unclear: "trade-way"] load balancer does. When I started going deep into Nginx, I understood that part.

[00:42:16] Now, which is what I want all of you to do. Find some time, implement everything. Implement everything that you see out. You would experience that, you would know the details that most people don't know. It's not a competition competition, but engineer within you would be really happy. Right. Okay.

[00:42:34] So what we'll do is we'll do high level of load balancer, also low level, as it's the key implementation part of load balancer also. This time I want to flip it. Or every, in every other cohort, I start with high level, but did, don't get time to go to the low level details of it. This time I want to start with low level details of it. Right. I get to talk about things that matter. High level, dappa dappa, high level boxes everyone can draw, right? But we'll talk about first low level and then see how things fit into high level scheme of things, right? And also talk about how you cannot just have one server as a load balancer.

### [00:43:08] Terminology - LB server vs backend server

[00:43:08] Okay, but before we do that, before we start our discussion, terminology I would want to fix, because there would be two kinds of servers over here. So first is an LB server, which is your actual load balancer, because load balancer is also a process, it's also a machine in itself. So the server that runs your load balancer is the LB server. And then there are back-end servers, that's a payment service, auth service, profile service, those are your back-end servers. So when I or any one of you would use the term, use LB server as the one that is your load balancer and back-end server as the one where you are forwarding the request to, auth API, what not, right? So back-end server is black box for us. Load balancer as a server is what we are building at the moment, the actual load balancer. So request would come to this LB server and then you need to have different components to do it.

### [00:44:00] Single LB server and backend servers

[00:44:00] So first let's start with the low level details of it. Now here, instead of brainstorming, let me just take you folks from 0 to 0.5 and then we'll start discussing things in detail. So what we hear about a load balancer is that, A, I will have a load balancer, which means something server, which is, when I spin up a load balancer, obviously a server, a VM spins up in which a process is running, which is the load balancing process. Now [unclear: "this added"] is a normal, normal, not even a HTTP, a normal TCP server. It's a normal TCP server's process, which is running over here in this machine. This machine has some IP address. Let's say 10.0.0.1. Now this is a static IP address. This IP address would not change. Assume just single machine at the moment. Start with a day zero architecture. Don't think of scale on day zero. Worst way to build a system. Think simple.

[00:45:00] You have one machine having some IP address. Then you have a bunch of API servers, which are running some normal HTTP server. Server they are running, which is serving slash index.html page. Nothing in page, it says just hello world, right? All these servers are doing it, but the process that is running the HTTP process, let's have Flask server, Spring Boot server, pick your favorite framework and write a hello world. Let's say they are running on 8081 port right now. With 8081, this is the port, but every machine

[00:45:41] will have an IP address, because now for anyone, not just LB server, but for anyone to connect to these servers, how do you connect to the servers? You need IP address. And for the first time I'm covering in this detail, but bear with it. So let's say this machine has IP address of 10.0.0.7, 10.0.0.7. I am writing over here. I could have just written over here.

<!-- chunk_05 00:46:19-00:58:12 -->

**[00:46:19] Teacher:** That's fine. See, that's it. Okay. So let's say my first machine is 10.0.0.7, 10.0.0.8 and 10.0.0.9. So this are my three backend servers. Let's say serving slash index dot HTML page doing hello world or something, some random service.

[00:46:41] Now for anyone, anyone to connect to the server, you need IP address and port number. So assume that in the load balancer that you are writing, you have a hash map or rather you have a list for [unclear: "YYM"]. [unclear: "We call you"] a hash map. Let's say you have a list of all the backend servers. So you have list of all the backend servers that are there, which means 10.0.0.7 colon 10.0.0.8.8081. This is typically our architecture or the configuration that we do on the console side of things. We specify that this is a load balancer that I'm spinning. These are the servers behind the load balancer, quote unquote. So it must be having something where like load balancer is storing this information. So let's say we are storing this information over here.

[00:47:34] Now, whenever someone wants to [?connect | asr: "collect"], although I'm drawing a user over here, it can also be a normal server, and then it's a client. Now client wants to fire request or slash index.html. Now what client does, it sends the request to this one IP address that it has, 10.001, request went over here. Now what load balancer would do? Now when we say client sent a request, what does it mean? It means that the client established a TCP connection with the server. So which means this server also needs to listen to some TCP port, let's say this port is 9000. So when client sends a request, the request, client sends a request to port 9000 on 1000, on 10001, which is our load balancer server. These are our backend servers. Came to load balancer server because client only has IP address of load balancer server.

[00:48:36] Now what would this load balancer server do? Because it needs to forward the request. What does it mean, forwarding? It's not just forwarding, forwarding on the packet side of it. And then what it needs to do is, imagine these servers, the Spring Boot, the Flask and the Django servers that you spun up. What they accept? HTTP request. What is HTTP? TCP request. So what would you do? Running on port 8081 that understands HTTP specifications. Right.

[00:49:07] So what LB server would do is, LB server would first, would literally first, once it got the request, it would, depending on the load balancing algorithm, it would see out of this three, which one to pick. Let's say I have a random balancing strategy. Let's keep it simple. Random. It would just pick all from all the lines of, pick one at random. Now what load balancer is doing is, when it got a request, it just picked one server randomly out of this three. So out of this three, it just picked one server randomly. Let's say it picked 007, right? 10 007. So what LB server would do is, it would create a TCP connection with 10 007 colon 80 at port 8081. Right? So this is another TCP connection that is set up. So for one request from the client, there are two TCP connections that are set up. One, between client and load balancer. And second, from load balancer to backend server.

[00:50:06] Now what would you do? As a client, client sends what? HTTP request, that HTTP protocol format and slash index.html and something it sends. This request, it says HTTP request in some specification. The request comes to LB server. LB server has this connection set up. So now what LB server would need to know, that this incoming TCP connection is mapped to this TCP connection. Now think from LB server's perspective. For LB server, this is TCP connection 1. This is TCP connection 2. Some identity. So what LB server needs to have is a map of which TCP connection is mapped to which TCP connection. So which source TCP connection is mapped to which target TCP connection. So this is a source TCP connection which is established between client and LB server. This is target TCP connection which is established between load balancer and backend server. So it needs to keep a track.

[00:51:15] And by the way, this is exactly how I thought of building a load balancer. This is exactly my thought process of how I approach this problem. How I literally applied first principles into doing this. Observe, and there is nothing fancy over here. You would see how simple it is to build [unclear: "by"]. So here what is [unclear: "uptake"] is, you have TCP, you store this mapping. When a request comes over a particular TCP connection, you know where to forward it. So now you store this mapping somewhere. Hash table, normal. You don't need database to store TCP. You cannot store TCP connection in a database. You just store it in memory over here, because these are like connections on the server. So in the hash table, you put it. So you know from this server, you have to [?forward | asr: "form"] whenever anything comes from this TCP connection, you know where to forward it. Right? So you have kind of mapping.

[00:52:10] Will go through the implementation, but you have this, that this TCP 1 and this TCP 2 are connected. When you receive a packet on this TCP, what you are doing is you are finding where to forward it to, which is this mapping, TCP 2, and you literally send whatever TCP packets you got to this server, or on this TCP, you don't know what it is. So whatever TCP packets you received, you just forward them bluntly to the target TCP connection. Right now, because this is sending HTTP request, the backend servers send HTTP request. Load balancer does not care if it is HTTP, WebSocket or what not. It has no idea. What it knows is, whatever I receive over here, I just forward those packets over here. Simple.

[00:53:06] So you read from one socket and you write to another. Now that contains HTTP request, WebSocket request, RTMP request, ICMP request. You don't care. And then what matters is, whatever packets are coming in, whatever you are reading from the socket, you are writing to this socket. Right? But because it is a well-formed HTTP request, that same HTTP request comes over here. Now this server understands HTTP request. So it generates the response. And then this server, what a normal web server does, when it generates the response, it sends the response to the TCP connection that it received from. So it would send the response from this [unclear: "t-tick-tick"] packets. Now this packets would come over this TCP to this load balancer. Now this load balancer server would say, I received from TCP 2, where do I forward it to? TCP 1. So it forwards it to TCP 1. And this way your client gets the response.

[00:54:08] Right? So you read from one socket from client. So you read from one socket, comes over here, you write it over here, then you read from here, and then you write it over here. Exactly what a load balancer does. Two lines of code and done. I'll show you. Right. But this is exactly what a load balancer does. Now here, what is happening is, because it is connected this way, that for every request that is coming now, let's say the next request that made from, let's say some another client came in and made some another request. Now this time load balancer is connected to this one, in TCP three to TCP four. Let's say I'm just using some string to identify for ourselves, right? And it would do that same thing.

[00:55:02] So now if you look carefully, LB, the LB server needs to have two X number, requires two X number of TCP, requires to manage two X number of TCP connections, right? So that's why you cannot just have one LB server. You need multiple LB servers and you need to wait to horizontally scale. But that's a different problem to solve it. But here what happens is that your problem gets very beautiful. Like just a single machine implementation. You can very well write. You can very well write a single machine load balancer. All of this can run on one machine. How? Simple. You create a process. Normal Go, like C++, Java, Python, pick whatever language you want to. And start a server on 9000 port. Right. Then because you only have one machine, you cannot have three process listening on 8081. So just start three different processes on three different ports on the same machine. So you don't have IP address, localhost, localhost, localhost. But 8081, 802, 8083. You can mimic the entire load or entire pattern locally on one machine. You don't need any fancy setup of cloud, cloud, multiple, VMs, Docker, Docker. You don't need nothing. I just do load balancing across that.

[00:56:17] What you need to do is, which algorithm to pick, just have a configuration that when a connection comes in, you have the configuration as like load balancing algorithm configuration, depending on which you pick a backend server and forward the request to. Right, and this is how you build a load balancer. It's really easy, really easy, and I'm not even exaggerating a bit over here, right? But this is how, from the first principle, I did not know anything about it, but this is from the first principle that you can apply and build your own load balancer, a single machine load balancer. Right. Scaling will take care of it. But at least with respect to implementation, you need to know how it is implemented. And it's literally just balancing the load across this. But in reality, it's just having some sort of mapping like this. When I get something from this one TCP, send it to this TCP. When I get something from other TCP, send it to this TCP. That's it. You receive the packet. You send the packet. From other side, send it somewhere else. That's what you do. Okay. So this is low level implementation detail of a load balancer.

## [00:57:23] Load balancer code walkthrough

[00:57:23] Let me show you code very briefly, five minutes. I'll show you the code of a load balancer. Today's session will definitely get extended because we are going really in depth. But I wanted to talk about this. I wanted to spark that engineering curiosity. [unclear: "Dabbe dabbe"], everyone can wait. This is where the magic happens. And again, [unclear: "Kyle won't share"]. What happened? Oh, GitHub is down. GitHub is down. 500. GitHub is having an outage. Hopefully, they recover from this. And we get to see our code. Oh, we did. Great. Okay. So, this is the load balancer that I've written. 1.5. LB.go. Still some outage. Okay.

<!-- chunk_06 00:58:12-01:10:17 -->

**[00:58:12] Teacher:** And go. Into a lot of details, what [?code | asr: "core"] that I'm talking about is here, right? Okay. lb.run, this is my load balancer server, the LB server that we're talking about, which is listening on port 9090, right? So anyone who wants to talk to load balancer has to talk to our [?port | asr: "code"] 9090, right? Then I hardcoded bunch of backend servers here. You can see I have four backend servers running Flask hello world, right? But they are listening on four different ports. 8081, 802, 803, 808. Four different processes I spin up from the same code base. 8081, another one 8082, third one 8080, fourth one 8084. Because I wanted to test load balancing. I didn't want to scale the system. So I have four backend servers all running locally. I have one LB server listening on port 9090.

[00:59:01] Now what did we say? When we get a request, this is where the magic is. We say when we get a request from a client, we have to pick a server to connect. So this is where my infinite for loop runs. This is my infinite for loop. That's a small for loop, very small code. I'm doing listener.Accept, which means I'm waiting. My LB server is waiting for an incoming connection. LB server is waiting for an incoming connection. So when some client connects, it would move forward. That we talk about right now. What we did, we just took this, I just wrapped this TCP connection into an object source connection, named it source connection and added some request ID just for me to log it down. That's it, right? But I just invoked the function called proxy. It's in the part of same class. So I took that established TCP connection, so when client one connected to my LB server, TCP connection got formed with listener.Accept, I took the TCP connection and put it in a, and [check: sentence seems cut off between 00:59:57 and 01:00:06] is where the proxy happens.

[01:00:07] So proxy is literally your proxy into some backend server. So I got an incoming request, which has source connection. What would be a first step when a client connects? What is our first step? Our first step is to figure out which backend server to talk to. So that's exactly what I did. LB server, LB.strategy.getNextBackend. Now, depending on what strategy I'm using, round robin, consistent hashing and whatnot, I'm picking one backend server. Now, when I say picking one backend server, what do I want? IP address and port number, which is exactly what I get over here. One backend. I get host and port in the backend object and I just dial a TCP connection to that. So now this is my LB server creating a TCP connection to backend server, which was spit out from my load balancing strategy.

[01:00:58] So I now got a backend connection. So I have a source connection. I have a backend connection. Now what do I do? What it does? Simple. I invoke the [?system call | asr: "system code"]. Copy. Which literally copies from one file to another. So I said copy everything you have. From source connection. To backend connection. And copy everything you get. From backend connection. To source connection. Request. Response. Both of them running in their own goroutines. And I have not done very efficient implementation. Which I have just spun up as many goroutines as I can. Thing that I'm doing so that, otherwise it's a system call, is a blocking call. So this is a blocking call. So if I don't run it in a thread, what would happen is it would block until the connection terminates. So sending the request after that would just wait. I would never be receiving any response from anywhere because this would not move forward. This is a blocking call because of which I added goroutines over here. So this happens in one goroutine, response reading happens in one goroutine. But that's it.

[01:02:08] First client established TCP connection with your server, your LB server. You then pick the backend, you establish a TCP connection with the backend, then literally copied everything from source. So this is source and this is destination in a system call. So you pick everything from the source connection, forward it to the backend connection. Then you read everything from the backend connection and forward it to the source connection. Done. That's it. That's it. You can literally implement it in five hours. You might just need to know basics of networking, but there is nothing. If you look at this code, there is no magic sauce. Everything else is just about load balancing strategy. I'll also walk you through that load balancing strategy.

**[01:02:52] Teacher?:** [unclear: "I said, I get out strategy."] Go here.

**[01:02:59] Teacher:** You can see round robin balancing strategy, static, balancing strategy, hashed balance strategy, that's it. But now you can very easily see round robin balancing strategy, get next back end. I got incoming request, I keep a track of index, where did I send my last request to. Every time I invoke get next back end, it just does index plus one mod x back end and pick, of all the back ends pick that particular index. Or round robin, 1 2 3, 1 2 3, 1 2 3.

[01:03:34] That when there is a consistent hashing with implementation, that is different. So little more complex, but this is consistent hashing based implementation. Really simple. I have a blog on it in case you're interested, but it's very easy. And then when you start coding it out, things become really easy, which is what I want all of you to do. Like, don't just take things for granted, go in deep of that system and see, but you don't ask me this question that where would I ever use it? You never know, life works in mysterious ways. You never know when you are thrown into a situation where you might have to do something like this, not just to write load balancer, but in order to do something. You might have to just write a very lightweight proxy because existing proxies are not performant enough. Quite possible. So just be prepared, be curious, and be a better engineer at the end. That's what life is basically surrounded by.

[01:04:23] So to be honest, this is exactly what a load balancer does, and that is exactly what I coded. That is exactly how my load got balanced. Again, recommending you to implement everything that you'll see around. Right. Okay. Any questions on this? I'll take three and then move forward.

> **Student Question [01:04:43] - Student 1:** So when a user disconnects, how would you handle that, that, number of connections go minus for that load balancer? I mean, for that API server.

**[01:04:57] Teacher (answer):** No, I did not maintain least number of connections that are statistics. Right. With one, all I had to do was just write a basic load balancer, right? All of those are fancy stuff, if this connection terminates and do this, keep a track of the status. So here I have kept track of one statistic, that for each back end I'm keeping track of number of requests that it has handled up until now. Not the connections, but the number of requests a particular backend has handled up until this way I know if round robin is working properly on, okay, right? But those are all statistics you can just add it over here. Once you pick a backend, you just keep track of it. Right. What has happened when a connection terminates, you would know about it because it would raise a panic. It would raise an exception. You can capture it and basically update your in-memory state about it. Sure.

> **Student Question [01:05:46] - Student 4:** So from a load balancer to the API server, is it like a REST API calls happening or how it is?

**[01:05:54] Teacher (answer):** Normal TCP, look carefully. There is, have you seen either anywhere REST? For me, it's a TCP connection. I just established a TCP connection to the backend and literally copied everything from one connection, send it to another. It may send HTTP, it may send RPC calls, it may send anything. We don't really care. We are just receiving anything that we are receiving from the one side and sending it to other. It's a raw [unclear: "system called the time"]. Okay. Any packet, literally any packet. Okay. Thanks. Aditi.

> **Student Question [01:06:27] - Student 4 (Aditi):** Yes. I'm a little confused about the last two lines. Do it continually copies anything that is coming from the server to the, I mean, okay.

**[01:06:38] Teacher (answer):** Yes. From one TCP connection or from one file to another file. Whatever it has. Just continuously.

**[01:06:43] Student 4:** Okay. It continuously goes on happening until it receives an EOF.

**[01:06:48] Teacher:** End of file. Okay.

**[01:06:49] Student 4:** Okay.

**[01:06:50] Teacher:** Once it receives EOF, it stops. So that's when this function would return. That's why I cannot just untimely wait for it to end. I spin up it in its own goroutine. To wait on that, I can just spin two goroutines in parallel, one that copies from here to here, one that copies from there. Okay, thanks. And again, I would highly highly highly recommend all of you to implement this. It's not at all difficult, right? Just be curious about anything and everything that you see. Even CDN is implementable. CDN implementation, hardly one hour. Who are, who is asking you to distribute it? Once you just need to know how those things are served, cached, processed and whatnot. When we go in depth of CDN next week, you'll understand it's not really difficult to build your own CDN. Difficult to scale, not to build.

[01:07:45] So that's why I always say there is a difference between building and scaling. Scaling, very few people will get a chance to do. But building, every one of us can. Because someone built Docker locally. That's how Docker started. Correct. You can just cannot have an excuse. You can build everything locally. You don't need multiple machines to build something. Yeah. For scaling, I agree. You need multiple machines, but why build and get those low level details around. Right. Okay.

## [01:08:17] Load balancer design brainstorm

[01:08:17] Now that you know the low level details of it, it will be very fun to discuss the high level part of it. That we would brainstorm on is, you would already have gotten an idea of kind of things that we would not to store, but there are still a lot of interesting design decisions and most importantly scaling LB, because now you can, now you can actually see why this one machine can become a bottleneck. Because for every request that is coming in, it has to create another request to the backend server, which means that if this machine has, there's a 10,000 connection limit, it 5000 clients in parallel, because it has 10,000 limit. For every 5000, this is one TCP connection consumed, but everyone, it is creating another one to the back end. So if this has 10,000 connection limit, the maximum number of concurrent TCP connection or maximum number of client that it can serve is only 5000, because it needs 5000 to connect to back end server. So which means that this needs to be horizontally scaling. So we'll also talk about how to scale, like how load balancers are internally [?scaled | asr: "screen"], that's fine. Okay, I'll take your question. Okay, let's start with brainstorming.

[01:09:27] Let's start with the, so the four factors that we would brainstorm on is LB configurations, monitoring, availability and extensibility. Like here we'll touch upon those factors. How are we doing what we are doing, right? Okay, let me open up. I'll also copy this for my reference so that I don't forget to cover, I don't forget to miss anything during a discussion. Just a minute.

### [01:09:53] Storing the LB configuration

[01:09:53] Okay, so let's start with this. How would you store the configuration? The configuration that you know, now you know what kind of configuration would we need to store. How would you store and what would you store? I'll meanwhile, I'll start drawing this part. Raise your hands, I'll pull you in.

<!-- chunk_07 01:10:17-01:21:35 -->

**[01:10:16] Teacher:** Yes, Shalendra.

**[01:10:19] Student 6 (Shalendra):** So how would I be storing this server configuration, right?

**[01:10:23] Teacher:** So what would you store? First, let's start with that.

**[01:10:27] Student 6:** The backend server configurations, IP address and...

**[01:10:33] Teacher:** IP address and port, right? Backend servers. Yeah. All the backend servers that you have, you would have IP address and port mapping of all of them. Okay. Anything else?

**[01:10:44] Student 6:** Algorithms.

**[01:10:45] Teacher:** Okay. Balancing algorithm. Great. This is the bare minimum that you need, right? Bare minimum. Right. Otherwise you can add more, more fancy stuff to that. Let's start with bare minimum because then you can obviously infinitely build that system, make it more and more complex, but this is the bare minimum that you need, that what algorithm you are using and what are the backend servers that are connected to that. Right. Okay. Where would you store this?

**[01:11:09] Student 6:** So, okay. If I go from the beginning, let's think about the simple system. I will just use a database for that.

**[01:11:19] Student?:** Okay.

**[01:11:20] Student 6:** So, we'll be adding some latency there. So, we can use a database, but we can also store those information in the server itself. I mean, it will keep pulling from the database before getting the request call.

**[01:11:38] Teacher:** Okay, you are storing this information in a DB, but now you also pointed out that it's painful. Why it is painful?

**[01:11:47] Student 6:** If you think like I should be having some confidence, I mean, like if I'm adding load balancer, then it shouldn't add some any latency. Otherwise, if it starts adding latency, then request will take more time to process.

**[01:12:03] Teacher:** So you are saying the latency of when request comes from user to LB server, if LB server for every request makes a call to database to get this information, that is slow, right? Because that would slow things down. And this network call itself is very expensive, three milliseconds to five milliseconds. So doing that every time you are adding. So anyway, your load balancer is itself adding latency, that network hop on top of that, if you add this, it would just slow things down.

[01:12:31] [check: segment starts mid-sentence] balancer. So you want this to be bare minimum. So what you are proposing is?

**[01:12:37] Student 6:** I mean, when system gets started or it should keep on pulling data from the DB in interval.

**[01:12:45] Teacher:** Okay. You are saying that when your LB server started, you should pull data from your database for the specific load balancer and keep an in-memory copy so that when the request comes in, you don't have to make a network call. And from here, you can directly pick that up. In the demo, right, you have a simple list, it just picks one that random from the list, or depending on the balancing strategy, and this using it. So this way I save this network. Okay, what is the disadvantage of this, of having this in sync?

**[~01:13:13] Student 6:** Like from the console, if configuration gets changed, like any server goes down, it's correct, it will be a problem. So we need something which like keep on updating the server.

**[~01:13:26] Teacher:** So which means that what if this backend server 2 went down, now how will your in-memory copy... because when this server went down, first of all, how would you know that a backend server went down?

**[01:13:39] Student 6:** Server should send some, I mean,

**[01:13:42] Teacher:** Correct.

**[01:13:42] Student 6:** It should send some man. [check: "man" may be the teacher's]

**[01:13:44] Teacher:** You're killing it today. You're killing it today. [check: possible ASR duplicate] Okay. Brilliant.

**[01:13:47] Student 6:** I mean, there should be some health check service. Like I should keep on sending the details of the server.

**[01:13:52] Teacher:** Correct. Correct. I'm so happy, man. So happy. You are, you are exactly taking it in the direction I wanted it to go.

### [01:14:01] Orchestrator and health checks

[01:14:01] Okay. So, the first question that came to us is, hey, this has a problem. What if a backend server goes down, but how would you first detect that a backend server went down? You said you need something to do that. So who would that be something? So let's call it. That's why I like this is just a fancy, but that I always used for orchestrator. [check: phrase sounds garbled - possibly "fancy word that I always use"] Now you need some kind of health check. Now what orchestrator would do is, you said it would need health checks to backend servers. Yes. Right, but how would that health check look like? What would it health check on?

**[01:14:35] Student 6:** Health check basically it will be telling you, telling any backend server that it is it up or not. So is it working?

**[01:14:43] Teacher:** What kind of health check would that be? When I say what kind of health check is my server is up. What do you mean when you say my server is up?

**[01:14:51] Student 6:** So if it is handling request properly, it's just a REST API. Okay, so if it is sending the response 200, then I can think of like it's working properly and I can direct my request to the server.

**[01:15:03] Teacher:** For all requests 200?

**[01:15:05] Student 6:** Some time, okay.

**[01:15:09] Teacher:** Health check endpoint needs to be there? So are you saying on health check endpoint it should be 200 or for all user requests it should be 200?

**[01:15:21] Student 6:** No, it's not for user request. It's for the health only.

**[01:15:24] Teacher:** Okay. Okay. Health check endpoint. Okay. Got it. So health check endpoint, hardware, however you'd want to implement. Right? But you need something. So this means we need to have, so we need to know the health check endpoint. Okay. Let me pull in Anubhav. Anubhav, where would we have this, like, what would be the health check endpoint over here? For a backend set. For this orchestrator. Like, do we configure something like this?

**[01:15:54] Student 7 (Anubhav):** Actually, we don't necessarily need to have a specialized health check endpoint. We can configure a very lightweight endpoint on the backend that just responds with a ping, but also just make TCP pings to the port and IP to see if we get back any packet.

**[01:16:12] Teacher:** Have you configured a [?load balancer | asr: "load by answer"] ever?

**[01:16:15] Student 7:** Not really.

**[01:16:17] Teacher:** That's fine. That's fine. Okay. Okay, so what kind of things would this backend server expose? It's your API server, correct? Because it is possible. Now, let me just basically go into bit more granular details of it so that we all understand what it needs to expose and what configuration would be needed to have.

[01:16:36] So backend servers at the end is a virtual machine in which you can run hundreds of processes. But with respect to this load balancer, there is one process that matters, saying this is a profile service. So the HTTP server that is handling the profile service needs to be up and running, which means that this might have some SSH process running, some HTTP server running, some nginx running, something running, but what we, what for this load balancer what matters, what matters is the core web server that is balancing against, which is on port 8081 that we discussed right now. That is why on every HTTP server that we create, we always have some health check, let's say slash status or slash [?health | asr: "help"], something like that, endpoint defined.

[01:17:29] Now what you do is you typically configure this endpoint on the load balancer site, which tells you that this is my health check endpoint. So apart from load balancing [?algo | asr: "I'll go"], you have health check endpoint, which is what you provide when you spin up a load balancer. Now here why do we need this? Because it is possible that in your backend server your virtual machine is up. You say, hey, why orchestrator is not checking on virtual machine, because it would have the infrastructure access, can just check if virtual machine is up or not. Because it is possible that your virtual... [check: sentence cut off between 01:18:03 and 01:18:09]

[01:18:09] But because of divided by zero exception, your process crashed, or because of null pointer exception, your process crashed. So if your process crashed, which matter to this load balancer, which is your backend service, if that crashed, you need to know that this server is now unhealthy, because if it sends request to that, because that process itself is killed, it cannot entertain that request. Which means that we just don't need that VM to be up, but we need our process to be up. So that is why we have explicit health checks, which you configure in your [?DB's | asr: "DBS"] part of load balancing configuration, and orchestrator uses this to fire continuous health checks onto your backend servers to see if your actual service is up or not. Not the server, but your service is [?up | asr: "upper"].

[01:19:05] Now again, pick online off-line indicator. However, you may want to implement it either. Typically orchestrator itself makes those HTTP calls to each of the servers and needs to get a 200 response. There are other protocols that also accepts, but I'm just simplifying it with HTTP, but specification that can listen to. But the idea is that orchestrator would need access to this database so that it knows these are the servers. This is the health check endpoint that I would have to call to. When one of the server is down, the health check would fail. Orchestrator would immediately go and update the database.

### [01:19:52] Updating the LB servers' in-memory config

[01:19:52] And now comes the problem. Now let me paint the picture. So orchestrator does periodic heartbeats, periodic health check sends to each of these backend servers. It found that backend server 2 responded with, or it did not respond because the process, the service died. Because the service died, now what orchestrator would do, that because this backend server 2 is unhealthy, it removes that entry from the database for backend server 2. So orchestrator, the mastermind of the system, updated in the database saying that backend server two is dead. So it removed that entry. Now, how would this change that orchestrator made in the DB get updated in the LB servers in memory, in-memory hash map that it has? Anwar, how would you do that?

**[01:20:46] Student 7 (Anwar):** Like the most naive way would be for the LB server to keep pulling, but that would not be an optimal way to.

**[01:20:53] Teacher:** Why? Why that is, why that wouldn't work?

**[01:20:57] Student 7:** Because the process is consuming some latency to first figure out if the, like intermittently it is first figuring out if backend servers are alive or not. And at the same time, it is also getting a barrage of requests from end users. So some of those requests will experience more latency when it is.

**[01:21:16] Teacher:** No, no, no. Orchestrator is doing it. User requests are coming to LB server. Orchestrator, there is no effect on that.

**[01:21:23] Student 7:** But the LB server would be polling to figure out this, right? Okay. Okay.

**[01:21:28] Teacher:** This one, this one you're talking about. Okay. This would be keeping on polling on doing this. Okay. So then is there a better way?

<!-- chunk_08 01:21:35-01:32:59 -->

**[01:21:35] Student 7:** Instead of polling, like if there was a way for the database to communicate it to... Maybe [?event-based | asr: "in base"] solution, which triggers this, which, which gets triggered when this change happens. Got it. [check: "Got it." may be Teacher (speaker map: check context)]

**[01:21:48] Teacher:** So you reached that point, right? But now just one more point to add on that where you said that it is already handling because now it also has to pull much more than that. The problem is that polling has a frequency. Let's say 10 seconds. Now let's say your backend server crashed over here. The next poll is happening over here. So for these much of time. So let's say this was first second. This is nine and this is the 10th second, for nine seconds your request will still continue to go to backend server. Even though that's dead. So you cannot. So for your polling frequency, if it happens at the first [?second | asr: "segment"] of a polling frequency, for last N minus one second it would still keep sending request to backend server [?two | asr: "too"], even though it is dead.

[01:22:33] So because it is not checking the DB every time, it is just, it is just when a new request comes in from the client, it just refers to this in-memory structure, the configuration, and just forwards the request to that. Now, because this is not updated, the request would still continue to go to backend server [?two | asr: "too"], even though that's dead. So for this much of duration, you still have your user request not being handled successfully, which is spike in error rate for your end user. So that's wrong. That's the main reason why you cannot poll. That is very inefficient. Okay.

### [01:23:06] Pushing config changes to LB servers

[01:23:06] So what's the solution? Rahul, how would you solve this?

**[01:23:10] Student 4 (Rahul):** First thing is like I would like to like [?ditch | asr: "touch"] polling and [?reserve | asr: "resolve"] a port on load balancer for actually updating the configuration. Basically like an endpoint which updates the configuration whenever it is formed. Okay. So let's just say orchestrator is like polling all these targets for if they are available or not. Okay. If they are available, like if there is a change in configuration, orchestrator can check that. If there is a change in configuration, we can just call LB to update that configuration instead of like polling.

**[01:23:48] Teacher:** So you're saying orchestrator directly making call to LB on this other port to update it?

**[01:23:53] Student 4:** Yeah, for updating the configuration. DB, then it will get, get the configuration from the DB. Okay. Similarly, we can have another basically container or you can say app, which is, you can say load balancer handler, which basically like, which basically checks, like, which also checks like, like orchestrator is for like health check. Okay. And like for like, for like, let's just say there is some, someone updated this DB configuration. He added one more target. Okay. We can, we can have some kind of load balancer handler, which can basically check, which can also check, like if there is any, like a change in configuration.

**[01:24:38] Teacher:** No, that all, let LB server itself, let the orchestrator do that. Why I have one more service to do that. Yeah.

**[01:24:45] Student 4:** Yeah, sure. So basically like the simple change would be like orchestrator checks if the, like configuration is changed by someone or like, any target is down, basically update in the DB and basically call the load balancer. The configuration has been updated. Please pull from the DB.

**[01:25:11] Teacher:** Okay. So you are suggesting a push-based mechanism. Let's come. So let's say you are developer with LB console APIs. You update this database, something around this. So now what is happening is, for example, you get AWS console access in which you are explicitly adding a new backend server. You are doing it. You want to handle some external. So you explicitly added a bunch of backend servers into it. Now that's just happening through AWS console. Now that configuration needs to be updated in this database for it to get updated, reflected over here. Okay.

[01:25:45] Any change in configuration, health check through here or any change in configuration by any developer, adding more backend servers, changing load balancing algorithm, changing health check status, anything would need to be updated over here. Now this needs to be communicated over here. Like you need to change this in-memory copy. So what you propose is whoever is changing this should make a call to this another port and ask it to pull it from the DB. That's one of them. Yeah. This would be near immediate. Okay.

[01:26:21] Yeah, let me talk about few disadvantages and advantages of it. And obviously there is no one right answer. Your answer is also correct. It works in some situations. My solution is also correct. It works in some other situations, right? Because everything is a trade-off, right? That's the best one. There is no one right answer. Okay. Let me, let me, let me cover those things. Okay.

[01:26:39] So here the approach that is suggested is a good one. What is suggested is that this load balancer server is having a process 9090 we saw that, apart from that have one more process which is running on port 9091. This may be a meta port or something in which whenever a configuration is, you can just, whoever changing this configuration, you can just make a normal call to this port and the handler of this port would be that make a call to database and update the in-memory configuration over here. That is what is suggested as an approach.

### [01:27:17] Reactive config push - Pub/Sub and CDC

[01:27:17] I'll give other way to do it. I'll use the learnings from our last session. In our last session. So here the problem is polling doesn't work. Polling doesn't work because there is a chance of we serving or we still serving or we still operating on the stale data. We want zero staleness, almost zero staleness. So what do we do? We have to ensure that whenever something changes, we want to immediately send it to... Folks, in the previous system, when we designed Slack's real-time communication, we saw this very problem that we could not rely on polling, we wanted things to be immediately pushed and sent out. So we already know a solution that could work well, which is a real-time Pub/Sub, and this is one of the implementation, this is not only implementation, this is one of the implementation, where what you can do is you can have a real-time Pub/Sub like Redis, whose job is that whenever you update something in the DB, it pushes a message via CDC. I'm just adding CDC, we'll talk about CDC in depth in fifth week. I'm just adding, I'm just sprinkling that top, that whenever there is a change in database, you get an update automatically into your broker, and that is listened by this LB server.

[01:28:39] Similar to how we made our LB server or we listened to changes the last time for the membership information and whatnot in order to send a messages to other users. We do something similar. Whenever there is a change in the configuration. So either your orchestrator can do this part, your LB console can also directly push message to broker, or your database using CDC can also do that. We'll talk in depth about CDC. I just wanted to give you a sneak peek of that something like this exists. So in case you don't understand it, it's fine. We'll cover it in depth in fifth week.

[01:29:13] But the idea is that [?pull-based | asr: "whole base"] thing wasn't working. So we went for push-based thing. We wanted immediate reactivity. We need to make things reactive rather than polling based. This way we minimize the time. So when the request comes in updates, any update in the database and event is sent to this, consumed by this. [missing ~01:29:36-01:29:38] It or you ask your LB server to pull the latest config from the DB, implementation up to you. But the idea is instead of doing poll based, do it in a reactive way. So we discussed two approaches to make it reactive. One using an explicit API call that ask it to pull it. Otherwise use this a reactive mechanism to push the configuration to my LB server. And LB server would just update its in-memory copy of this by shared memory between processes. One of the two. That's fine. Way, right, at that implementation is up to you, some would work in some cases, other would work in other, but at that the idea remains same, polling wouldn't work, so you want to make it reactive, multiple ways to do it.

### [01:30:20] Monitoring LB servers - orchestrator and vitals

[~01:30:20] Okay, now let's touch upon a critical point that there is a chance of my back-end servers [check: sentence cut off, possible lost speech before 01:30:31] They are okay. Backend servers, healthy and [?unhealthy | asr: "healthy"]. You kept an eye on, but there is also a need for someone to keep an eye on this LB servers also. That, hey, what if this server is overwhelmed? Who would do that? You have an orchestrator that is there to keep an eye on your LB servers. You do that. Orchestrator is keeping an eye. Now what is keeping an eye mean? It does not just mean that health check is okay or not. It also means that is the server overwhelmed, CPU, memory and whatnot.

[01:31:08] So how would, because then depending on this orchestrators keeping an eye on LB server, if it sees very high CPU consumption, it might just want to add one more LB server into the system. So that the load is balanced. Like you can horizontally, because you also need to horizontally scale LB servers, right? So one LB server is definitely not enough to do it. So how would orchestrator know the CPU and memory metrics of this LB, CPU, memory, network, disk, everything, those key vitals of your LB server, so that it knows that it's time to add one more LB server into the scheme of things, and then one more LB server into the scheme of things, oh, now the load is reduced, I can remove one LB server from the scheme of things. Right? So orchestrator needs those vitals information. How would it get it?

**[01:32:03] Teacher:** Gaurav?

**[01:32:07] Student 1 (Gaurav):** Before that, can I try to answer the communication between DB and LB that we were just discussing? First, let's do that. [unclear: "I've set the content."] About this, I think normal status and health checks that we discussed about between orchestrator and...

**[01:32:24] Teacher:** So, another... But see, is this realistic implementation? Think about it. Like this, whenever, so you are saying orchestrator would make API call to [?each LB | asr: "HLB"] server and periodically check what's the current CPU memory and disk utilization of it. What if it needs historical data? Because it sees that rise that the CPU utilization is rising. It can take some action, right? You just don't need at that moment. What it is, you need historical also. You need a generic way to do it.

<!-- chunk_09 01:32:59-01:43:45 -->

**[01:32:59] Teacher:** So there has to be a better way. Rather than orchestrator asking from load balancer and [?load balancer | asr: "load register"] telling orchestrator, but why are you just limiting between these two, right?

[01:33:12] Imagine, won't you want to see overall infrastructure utilization, historical trends and whatnot, where would you store the historical data of all the CPU, like how CPU was consumed on each LB server? You store this data in a database. So now where is that data? What kind of database? Where are you storing it?

**[01:33:34] Student 3:** We could use probably the same database that was previously being used.

**[01:33:37] Teacher:** This is the key value. So we're storing this configuration. What you're storing is time series data, CPU utilization, memory, disk network. Right. So that, that's right. So when we think realistically that that's where things start to... Like you, you start to discover these things.

[01:33:58] Think on those lines, where are you storing this information? What kind of information would you need to store? You would just not need that at this instant, what does CPU utilization? Because let's say you made a call. Someone is not responding because it's a hundred percent utilization. You don't even know it's a hundred percent. You, you don't get time enough time to react. You'd want to react when it is like 60, 70, 80%. You need to know historical trends of it. What's the average utilization and what not?

**[01:34:25] Student 1:** Orchestrator can have a database with load balancer telling [?via | asr: "why"] a heartbeat messages, what CPU utilization was at that point of view.

**[01:34:34] Teacher:** Why are you re-implementing things that are already implemented by other systems? Just reuse the stuff. Always. What tool would you use to do this?

**[01:34:48] Student?:** Connection pooling.

**[01:34:49] Teacher:** Nah, let me pull in [?someone | asr: "somewhere"] else. Wait, I'm Alok. [check: probably the teacher calling on a student named Alok]

**[01:34:55] Student 4:** So the things you're talking about, they seem like metrics that there should be some kind of metrics logged and then we should react on the basis of metrics scaling up and scaling down. Correct.

**[01:35:09] Teacher:** So what tool, what thing would you use to do that?

**[01:35:14] Student 4:** I don't know much. So we use CloudWatch based, but we are doing it manually.

**[01:35:18] Teacher:** That's a good one. CloudWatch is that. You do it manually.

**[01:35:25] Student 4:** I don't know about automatic monitoring much.

**[01:35:28] Teacher:** Okay. Okay. Let me pull in Akshay. What would you do?

**[01:35:34] Student 12:** Yeah.

**[01:35:35] Student 3:** I had the same answer. Mostly CloudWatch or have a telemetry agent that is monitoring.

> **Student Question [01:35:44] - Student?:** What is this telemetry agent? Where it is installed? What it does?

**[01:35:49] Student 3:** Basically it, I think it will mostly like emit metrics from the host. Yes.

**[01:36:00] Teacher:** Let's say this is the telemetry agent that is running on the host, which is emitting metrics, emitting metrics to where?

**[01:36:08] Student 3:** Probably some log storage. And then from there like we can have alarms or something.

### [01:36:19] Central metrics store - telemetry agents and Prometheus

**[01:36:19] Teacher:** No, don't go into alarm, don't go into alarm, don't go into alarm. Okay, okay. But the thing is you need a way, a generic way where you would anyway have it as an organization who is building [?load balancer | asr: "load by"], so you would anyway have a place where all these key vitals and metrics are getting ingested. You'll anyway have that. For example, you may use something called as Prometheus. It's a brilliant tool, FYI, brilliant. So what you are doing effectively is instead. So what the, how this discussion transpired is very interesting. A lot of folks were just limiting to this system, just limiting to this. What did we just emit metric to this orchestra, orchestra would store it in this database. Don't limit it. Think, if you think realistically you will automatically start to make sense into a very cost efficient solution, right? So just few things over there. First we need to monitor CPU, memory, disk and whatnot about a particular machine. We just don't want data of that particular instance because we need to know historically how it was, what's the average, so that you can scale up and scale down according. So which means there is anyway a need for you to all the vitals of a particular machine somewhere in a system.

[01:37:40] Now for all the system, not just LB servers, even CPU memory utilization of your back-end servers are also equally important. All of that is equally important. So you have to send all of the vitals of every single VM of your machine in a central location so that orchestrator can take a look at that and make calls if you want to scale up backend servers, if you want to add more LB servers or whatnot. So having that one place of ingestion and query would solve the problem.

[01:38:15] So that's why use something like Prometheus [unclear: "Overkill"] in which the telemetry agents running on each of the VM, not just LB, even backend server VMs, take those telemetry agents, let them push the data to Prometheus. Orchestrator periodically checks the status of the overall average utilization of this, average utilization of this and then takes a call. If we need to scale up LB server or scale down LB server, add more backend servers to that or what. Typically what autoscaling group does. So autoscaling group in AWS world or the autoscaling policies is just you configure. If the average CPU utilization is this, do this. This, what it does internally, just queries Prometheus, Prometheus as in their proprietary stuff. And it gets that when it needs that condition, it takes us necessary actions.

[01:39:09] In case of orchestrator, because this is trans, this is opaque to your users. You just don't know about multiple LB servers there. Orchestrator would have to do that same thing and scale up and down your LB servers over here. Right. This way, instead of doing something specific, just for this load balancer, try to build a generic, try to add it to this generic system. So use Prometheus or something like that over here to store this. In case you are unaware of Prometheus, go to Prometheus.io. See how beautiful that tool is. It's a brilliant, brilliant, brilliant tool that scales amazingly.

[01:39:44] So now if you see, if you look carefully, we are now very well converging into actual things that we require as well. First, we discussed the low level details. We still talked about the place to store the configuration. Then we wanted to make it reactive. We wanted to find health checks. We added the orchestrator to scale up backend servers and LB servers and whatnot. Then we extended this part where I would want to scale out LB servers. I need a way to see the historical things. So everyone needs to send telemetry to someplace. So that's what Prometheus comes in. Orchestrator periodically checks the Prometheus to get this thing done and things scale up. Right? So, [unclear: "our load pass"] is very nice analogy.

## [01:40:27] Client reaching multiple LB servers - DNS and CoreDNS

[01:40:27] The only thing that is remaining to discuss is, now you have two LB servers. Client has IP address of one of them. How will client make request to other LB servers? Because at the end, the connection is created, the TCP connection is created on the LB server. Because it is created on the LB server, how would your client connect to this LB server? Because now you have two. Your client has IP, like client, you would just give one IP address to that. Shreya, what would you do?

**[01:41:07] Student 8 (Shreya):** I think it is configured in DNS servers. So we have a mapping of load balancers in DNS servers and while client is routing request via DNS, it picks up a load balancer.

**[01:41:21] Teacher:** Okay. So you are saying add a DNS server to this. Now what is DNS server will hold?

**[01:41:27] Student 8:** This will hold what are the multiple ports of these load balancers and it...

**[01:41:33] Teacher?:** ...will be multiple machine IP addresses, not just ports.

**[01:41:37] Teacher:** So let's say this 10.0.0.1, 10.0.0.2. Okay. So what would you say? You would show 10.0.0.1 against what?

**[01:41:47] Student 8:** Against the URL of like, let's say, google.com. And then these, these IP address, why...

**[01:41:55] Teacher:** google.com is not public, load balancers are private, right? Load balancers are private.

**[01:42:03] Student 8:** I think load balancers should be public and internal server should be private, right?

**[~01:42:07] Teacher:** Okay. Are all load balancers public?

**[~01:42:07] Student 8:** The ones which are handling, which are active should be a public.

**[01:42:17] Teacher:** Okay. What if there is a microservice that I'm talking about, I'm building. Should I keep that load balancer? Like imagine there is a very critical service that load balancer you [?created | asr: "credit"]. That should not be public, but you are putting this, you are added DNS. Now what? Because of the DNS you're enforcing it to be public. That's what it seems like.

**[01:42:38] Student 8:** So the DNS will hold only IP addresses of, sorry, IP addresses which are public.

**[01:42:47] Teacher:** What about private node, will they only have just one LB server? What if that goes down? Right? Yeah. Right. Okay. DNS is the correct answer, but let's go detail into it.

[01:43:01] So first of all, and I know we are having detailed discussion, but I would want to, like time is okay. 15, 20 minutes today's session will stretch, but it's fine. We want to, I want to touch upon this, these details that matters, right? So a lot of misconceptions, let me sort one like them one by one. So DNS is the correct answer. Now here think, when you spin up a load balancer you can only give one thing to your client. Behind the scenes you may have, so you, the first thing that you may think of, hey, I'm spinning up a virtual machine, let me give out the IP address of this. So that's a natural thing, but now IP

<!-- chunk_10 01:43:45-01:56:01 -->

**[01:43:45] Teacher:** Because IP address is fixed to a machine, you cannot have two machines handling the same thing. So then our LB servers are not scalable, which is very big of a limiting factor. Now, which means that you need a way to, you cannot share IP address. There has to be something else. So what is something that abstracts multiple IP addresses? Domain name. So what do you do? So who manages domain name? So you had a domain name server. So what happens is when you spin up a load balancer, you spin up a domain name for load balancer. So let's say payments.lb.google.com. I should not use this name in my employer now, but still check. Google.com. I am always using this example. I never thought I would work at Google, but that's fine. Okay. Payments.lb.google.com. So every load balancer that you create has a domain name now, because of which what happens is that it abstracts out multiple IP addresses behind it.

[01:44:41] And this is a private domain. Now this is where a lot of people don't know DNS. When someone talks about DNS, everyone just thinks about public DNS, google.com, facebook.com, right? But DNS can be private also. So that's why I always recommend people to work on SRE teams at least for a year and a half at least. So you can write your, not write, you can launch your own DNS server, very lightweight process. It does nothing. It's very simple. There is a nice, very good open source project called CoreDNS. The entire Kubernetes fraternity uses CoreDNS. So CoreDNS is one of the most common, simple implementation of a DNS server. So what you typically do? And this is private your infrastructure, very private your infrastructure. On each of your machine, as your loopback IP address. So everyone connects to this. So just look at how to configure CoreDNS. You'll find what I'm talking about. So the idea is on every machine, you specify this as your DNS address. So that whenever you provide a domain name, it needs to resolve to something. So what DNS server would do, it would help you resolve. So this is CoreDNS, a private instance of CoreDNS running in your infrastructure.

[01:45:59] So if you are AWS or GCP, there are a bunch of DNS servers running, each having these kinds of configuration from a machine. When a request goes or request goes for a particular domain name, because the request that came to you is payments.lb.google.com. Now, where is this payments.lb.google.com? Now this, when request comes for this IP gets resolved. Now DNS comes to the fact that, hey, I want to resolve this IP address. So for a domain name, give me one IP address. So now if there are multiple, how would it pick one? Round robin, weighted round robin, all of the strategies apply here as well. So now when the request comes in, the request for a particular domain name comes in, or rather a load balancer DNS request for a particular load balancer comes in. It resolves into an IP address. This IP address is sent to the user. User then connects to that corresponding IP address over there and then the normal flow takes over.

[01:47:00] But now here Shriya, my question to you, given that you propose the solution, isn't all the requests routing through DNS not making DNS a bottleneck? Because then DNS itself is acting like a load balancer. What's the request flow over here? If all of my requests goes through DNS?

**[01:47:22] Student 8 (Shriya):** We'll have multiple DNS.

**[01:47:25] Teacher:** Load balance between DNS. Right. And now this is a transcending problem. Yeah. So, okay. Let me ask you other question. How does a request flow look like now? So user was making a request has a load balancer IP address, or sorry, has a load balancer name. Now what's the request flow?

**[01:47:50] Student 8:** Uh, there's a load balancer name [unclear: "as in it since"]

**[01:47:55] Teacher:** Payments.lb.google.com.

**[01:47:57] Student 8:** So DNS will pick up a IP address of load balancer using some strategy.

**[01:48:02] Teacher:** No, no, no. Request comes where? So user makes a request, http colon slash slash payments.lb.google.com slash help, for example. Now what? What would happen first?

**[01:48:14] Student 8:** So then it will go to appropriate DNS, which has that IP address. DNS [?tree | asr: "free"], something like that. And then it picks up the correct DNS, which has that IP address. And then the request went to DNS.

**[01:48:31] Teacher:** Then what is DNS doing?

**[01:48:32] Student 8:** DNS according to its strategy will pick the IP address and send out that request to that particular load balancer.

**[01:48:40] Teacher:** So DNS is routing the request to load balancer?

**[01:48:44] Student 8:** Yes.

**[01:48:45] Teacher:** So then what is load balancer? Because then this is just exactly the load balancer. If all the request goes like this, then this is acting as a load balancer. That's a wrong thing.

**[01:48:55] Student 8:** DNS should send the IP address to client back and then the client will make request.

**[01:49:01] Teacher:** Correct. Which is exactly what happens because now if this, this cannot, this cannot act as a proxy, it just a domain name resolution service. That's it. It does the [?resolution | asr: "results"] given a human readable name, give me an IP address. That's it. So the flow, which is why I asked you that question to, you know, get this thing, basically [unclear: "as the board"] that DNS is not a proxy. DNS is just someone who is resolving the IP address. So this is the request flow that looks like this. So it sends a request. It gets the IP address. Client always caches the resolved IP address for some time. Forwards the request and then basically makes a connection to the corresponding LB server. And this automatically happens. This is what when you make an HTTP request to anybody. This is exactly what happens behind the scenes.

[01:49:55] Goes to DNS, you get the response, you automatically connect to that. This is the part of your implementation. And this way your connection is being formed to an LB server and then the normal request takes over. Like how once it's over here, now the TCP connection is over here, it takes on backend server, sends the request, gets the response and sends it back to the user. Right. So DNS is just to resolve name to IP address, nothing more, nothing less. It's not acting as a [?proxy | asr: "box"], right? And this is how your load balancer has scaled now. For example, when your orchestrator saw that there is a need to add a new LB server, it spin up an LB server and updated the DNS entry for that. So when it add a third one, it would add 10.0.0.3, whatever the IP addresses, it would keep on adding that. So that's the job of an [?orchestrator | asr: "orchestrate"], and this is what the load balancer, the system design, quote unquote, looks like.

### [01:50:52] Final load balancer design diagram

[01:50:52] And let me just show you final diagram. And by the way, this is exactly what I've written. There is nothing extra. I just want to cover that one final diagram. This is one. And this is exactly what we just discussed. So here, what you would see is that you have your LB servers, multiple LB servers running. You have your orchestrator. You have your database over here. You have your LB console where developer is directly making changes. You have your Prometheus server set up over here. So all the backend servers send data to Prometheus. The central thing where all the telemetry goes in. All the vital CPU, memory, disk and all periodically gets sent over here. So Prometheus holds that data. Orchestrator periodically queries Prometheus to see if LB server needs to scale up or not. So depending on when it sees a need to scale up LB server, it scales that. It makes an entry into CoreDNS server.

[01:51:45] Client, whenever it wants, and now here it's not just end user, [unclear: "all that drawing user i can"], it can be another microservice also, server also, user also, anything. Whenever there is a request on a human readable name, it needs a resolution. So let's say lb.payments.google.com, request goes to CoreDNS, gets it back, gets the IP address, it connects to the LB server. LB server, depending on the balancing strategy, picks a backend server to do that. Backend server then does its whatever of processing it needs to do, sends the response and sends it back to the user, right? This is what happens. Whenever there is any alteration in the database config, either health check failed or it saw a need, autoscaling kicked in and saw a need, or something, the configuration is updated in the database. Now when the configuration is updated in the database, either CDC kicks in, or LB server itself pushes a message over here, or orchestrator pushes the message to this Redis broker. Because this is a real time Pub/Sub, it is real time, in real time sent to all the LB servers. Now this is what happens is you guarantee message delivery because of this. All the LB servers are listening and they are updating their in-memory copy of the configuration that it has. This way you do not lose on the performance while you do your entire load balancing. Right? Okay.

[01:53:05] And if you want to dive deeper, this is one excellent paper. Maglev, a fast and reliable software load balancer. It's really easy. This is one of the first papers I ever read. It is not difficult at all, but read it. You'll understand few other things that I've mostly covered most of it, but now this paper would make a lot more sense. You would get much more granular details of things that you might be a little interested about, right? You'll find it. But this is how you design load balancer. So what we covered, we covered an extreme low level implementation of load balancer, a high level design of load balancer, answering every or rather covering every single aspect of it. And now here you might see a few things here and there floating around which you would obviously cover in future, but there are some sneak peeks that you would get on what is coming in coming weeks. Right. Okay. Before we go on a break, I know it has been a little late. I know we stretched a lot, but I just wanted to go in depth of it to ensure it's covered very thoroughly. Right. Okay. Before we go on a break, because then we have a locks also to cover. Okay. I'll take three questions now. Uh, people who have not spoken, I'm just giving them. [unclear: "Everyone's is a known place."]

### [01:54:20] Questions - local DNS cache, CoreDNS availability

> **Student Question [01:54:20] - Student 2:** Uh, [?Arpit | asr: "I bet"] I was thinking, let's say we are at a day zero architecture and we have [unclear: "in front days now"], uh, the client uses local DNS cache, right. To not to prevent, uh, IO trips, I mean, network trips to local DNS server. Now, if let's say, I mean, it's a, it's a very, uh, uh, corner scenario where we only have one LB server goes down, right. And the person has a local DNS cache. It's just tries to ping that IP of LB server, but I know caches has a TTL also, uh, for TTL goes and checks the DNS server, but until the TTL expires out, the site is unavailable to it. And then there's the LB server.

**[01:55:00] Teacher (answer):** Think of it, right. When if it tries to connect and it's not able to connect, it would immediately make and resolve another IP address. Okay, I was not aware of this, it pulls back and sees another. That's a, that's a reactive thing. If you know you are hurt somewhere, would you not immediately go and take an aid there? Why would you wait for something to happen? Let's say you have a periodic visit for your tooth aches, right? You'd say no, I'll only visit a dentist only when the time comes. But if it's hurting, will you not go there? You will. Right. So that's the thing. So if you see that the IP address that I'm trying to resolve, like the IP address that I'm trying to connect is not there, I would explicitly invalidate my cache and make a call to CoreDNS, which [?fetches | asr: "fits"] me another IP address.

> **Student Question [01:55:46] - Student 2:** And what if CoreDNS, you said CoreDNS is a private [?infra | asr: "infrared"], if it goes down, then how do we resolve?

**[01:55:53] Teacher (answer):** You have multiple CoreDNS servers running.

> **Student Question [01:55:55] - Student 2:** And how do we know that, okay, which CoreDNS to reach out?

<!-- chunk_11 01:56:01-02:07:07 -->

**[01:56:01] Teacher (answer):** That's more interesting. So you have a DNS for CoreDNS. So at one step that latency becomes so small that that one server is able to handle that. So there is one single point of failure still in a system, which has a standby node. That's the base condition of the recursive.

> **Student Question [01:56:18] - Student 2:** I mean, we do trace route to a domain, right. And it shows up so many levels of, I mean, 21 levels I've seen to reach Google.com. So that's common. There's so many levels in between, right?

**[01:56:30] Teacher (answer):** Yeah. And every single one of them is horizontally scalable, except one, which is single point of failure with a standby node. And that is so tiny that it can, it's very hard for it to go. And even if it [?goes down | asr: "goes on"], there is already a standby server running. So if it [?goes down | asr: "goes on"] in milliseconds, otherwise would basically, but in second it would take its place. Okay. Thank you.

**[01:56:52] Teacher:** Yeah, Shreeram.

> **Student Question [01:56:55] - Student 10 (Shreeram):** Yeah, let's assume these end users are external users and not internal [?microservices | asr: "Microsoft"]. So when resolving the name to an IP, why would they use our CoreDNS? Isn't the DNS configured in their OS?

**[01:57:10] Teacher (answer):** DNS IP address is configured in their OS. So they would go to let's say Route 53 or the, I don't know the GCPs one, but it goes to public DNS server. It goes to public DNS server and not a private DNS server.

> **Student Question [01:57:27] - Student 10:** Yeah. In that case, how would our CoreDNS be useful for them?

**[01:57:31] Teacher (answer):** No, then you are making your LB server public, right? Then you're making LB server, then this does not come into the picture. If you're making it public, then this does not come into picture. Okay. Then this instead of this becoming private, it becomes public. Anyone can talk to it. It's like how you configure your [?microservices | asr: "Microsoft"] is, that's a public DNS resolution, not a [?private | asr: "primary"] DNS resolution.

> **Student Question [01:57:58] - Student 10:** So in that case, if we are adding new LB servers, then the public DNS will have to be updated.

**[01:58:05] Teacher (answer):** Kind of yes. I cannot reveal those part because it's very proprietary. I know some parts of it, but think of it like kind of that there is one intermediate proxy layer that sits in between that takes care of that. I still have not covered seven different layers that cover it would make this highly complex but there are different layers in which resolution happens. There is still a domain name assigned to every LB server. It may just not be in the public space. It is an intermediate phase in between. You read that paper, Maglev, you will understand what I'm talking about. Read that paper. In case there's a question, more than happy to answer it in basically coming weeks. But I just don't want to make overly complex design discussion. People would kill me for that. But more than happy to discuss it in coming. So first read that paper. In case you still don't get an answer, I'll give you that.

**[01:58:57] Student 1:** Okay.

**[01:58:59] Teacher:** Heyman.

> **Student Question [01:59:01] - Student?:** Yeah. So here you gave one domain name for one service as an example, it'll be dot payments dot. Let's say there are multiple services each with a different name and will every LB server be load balancing for all the services that.

**[01:59:16] Teacher (answer):** No, that's a different, right? Load. What is load balancer? It's balancing across homogeneous set of servers. Right. This is not an API gateway. This is a load balancer. It is balancing across homogenous. So other service would have other load balancer, other LB servers. Okay. Right. And all of those would have its own entries in CoreDNS. Got it. Sure. Thanks. Okay.

## [01:59:39] Break *(admin)*

[01:59:39] *(admin)* Folks, we'll take a break. It's 11 already. We'll take five minutes break. I'll take questions at the end. No, no problem there. When we come back from the break, we'll take five minutes. We'll sync back at 11 of five. And then we talk about remote locks, right? Remote locks and distributed locks.

[01:59:53] Big discussion anyway but I do and obviously even if it's stretched it's okay, I would not compromise on quality at all. I want all of you to understand the intuition rather than just mugging things up, so we'll go in depth of remote locks as well, distributed locks as well, exactly how I covered in other cohorts, more than that actually. This was the best discussion of load balancer I had, really in depth, didn't skip a thing there. But we'll take a break for five minutes, we'll sync back at 11 of 5 and talk about remote locks and distributed locks and where to be in time. Okay, see you folks in five minutes.

[break ~02:00:26-02:04:59]

## [02:04:59] Remote locks and distributed locks

**[02:04:59] Teacher:** Okay, let's start with the second half for today, [unclear: "half in second, fifth of today"]. So [unclear: "it's not done, fifth, fifth of today"]. Okay, remote locks, distributed locks.

[02:05:12] This is one of the most important things in distributed systems because it's the one that ensures, as I said, ensures the correctness and consistency of data. So remote locks, you typically would have heard of something called as a lock manager. Now, lock manager is a remote machine that acts as a lock manager which keeps track, hey, which item is locked by which machine so that it can do the coordination that, hey, because this item is locked, you cannot do this part.

[02:05:42] Airline check-in system, we locked some rows for others to not even, that others cannot even read them. We took exclusive lock, somewhere in the memory of the database it was stored that this lock, this row is locked by this transaction. Now there everything was in one machine, one process, so it was just memory, memory, updations, right? But now with this distributed things in place, instead of having one process, you have multiple machines within which they need to coordinate. So that is why you need to have a remote lock manager that does that.

[02:06:23] Now, let me take you through a journey over here, not a story story, but simple things to think about. In our database or in airline check-in system, there were multiple transactions. Think about it. Each transaction is a thread. Right. So what we saw there. When there were multiple threads. And we wanted to synchronize between them. Where one takes lock on something. Other cannot do that. But that part was basically stored in memory. Because multiple threads synchronizes through an in-memory thing. Mutex, semaphore, explicit locking, atomic instructions, whatnot. Right. Because what is common between multiple threads? RAM.

<!-- chunk_12 02:07:07-02:19:41 -->

### [02:07:07] Synchronizing processes - apt-get and the dpkg lock file

**[02:07:07] Teacher:** Now, what if I want to synchronize two processes? For example, when a process is running and doing processing of one thing, other process cannot do that. I'll give an example. apt-get upgrade. If you have ever used Ubuntu, most of you would have. In order to install packages on Ubuntu or upgrade packages on Ubuntu, you fire sudo apt-get update or apt-get upgrade. When you open this in two different terminal and you run apt-get update. I used to always wonder why that's not working. Right. So I thought running on two terminals would make it faster. So I used to do that, but what did you used to give me error? I'm talking way back in 2008 and 2009. So I got first year college. We just got introduced to Ubuntu and we learned how to install packages.

[02:07:55] So Vim and [unclear: "water cover"] and the package used to install, [unclear: "Moo and cat"] and something, something is probably used to do that. So when I used to do apt-get updated, upgrade stuff. I thought that if I open multiple terminals and run apt-get upgrade on both sides, it would be twice X fast. But what used to happen was when I used to run on one and I should trigger on other, the other used to say dpkg.lock file exists. We cannot move forward. I like, oh, so you cannot run multiple instances of it.

[02:08:25] Now here, if you think about it, this is where between two processes, what is shared? The disk. So they did not want two instances of apt-get upgrade running [?at the same time | asr: "at the center"] because it would have made it into an inconsistent state and what not. So they had to ensure only one when at any given point in time at max one apt-get upgrade should run. So what did they do? When the process starts, it creates a dpkg.lock file. Every process that starts, it checks if this file exists, it kills itself. If it does not exist, it takes it and then it moves forward and [unclear: "events it"] done processing, it kills the file or it deletes the file.

[02:09:03] So multiple threads synchronizes through memory constructs with mutex and semaphores. Multiple processes synchronize through disk because that is the closest storage which is shared between processes. Now when you think about multiple machines, what is shared between them? Disk? No. Network. So which is where remote locks come in. This is how like it's very easy. This is the intuition that I want all of you to form. That what is the closest one and you just. It should just naturally complete. Right. So you saw, you see examples of every one of them, all three examples, which is where you see when there are multiple machines that they want to synchronize. What they do is they use remote locks because network is shared between multiple machines. Right. Okay.

### [02:09:49] Hypothetical remote queue - one consumer at a time

[02:09:49] So in order to understand this better, let me take a practical example of that because obviously practical beats theory any day. So let me take a practical example of it to understand what would we need to do. Now, hypothetically, let's say we have a very stupid queue. People don't know how to implement it. Let's say this, the developer of this queue was extremely stupid, did not know how to implement queue. And what he did, is that he created a queue, which gives zero protection, zero protection. So literally any consumer that comes, the person literally just wrote a remote queue, which says like makes an API call. It just do queue.pop and returns it. queue.pop is not thread safe. Multiple people, if multiple consumers fire the request at the same time it is very much possible all of like some of them will get the same message, some will get different message. There is no protection.

[02:10:37] But what you want out of this, somehow you are stuck with this queue. Somehow, hypothetically, you are stuck with this queue and what you want is you want this queue is remote. Remote queue like SQS. This is not SQS. Don't go into those guarantees. I am [check: words may be missing here] give you any protection. Right. I think that this queue exists, but what you want is you want the three consumers consuming from this queue. Don't worry about throughput, but what we want to ensure is that when one consumer reads from this queue, other consumers cannot. I want exclusivity. So when one consumer is reading from this queue, the other consumer cannot do anything at that point in time. When it is done reading, then other consumers can read from the queue and will get a message. But at any given point in time, only one consumer is allowed to read from the queue.

[02:11:37] How will you implement this? And let's say this queue's ID is called queue 7. Hypothetically. How would you achieve this? Raise your hand, [unclear: "Salpolio"]. Akshay?

> **Student Question [02:11:54] - Student 3:** It's mostly remote, right?

**[02:11:56] Teacher (answer):** It has to be remote. Multiple consumers, different machines.

**[02:12:02] Student 3:** Okay, like we can have like a synchronized block when the get or pop method is being used.

**[02:12:11] Teacher:** No, that's remote. This queue is remote. This is not local queue. That's what I said. It's a remote queue.

**[02:12:25] Student 4:** So in the server, wherever the queue is implemented, we can have a lock with respect to that particular...

**[02:12:31] Teacher:** I mean, what would this lock to you, you cannot change queues. You cannot change queue. Queue is black box for you.

**[02:12:40] Student 4:** No, I am not changing the queue but in whichever server, no, wherever the queue is located in whichever server it is present, the consumer needs to first get the lock and before accessing the queue.

**[02:12:55] Teacher?:** How?

**[02:12:59] Teacher:** You cannot access the server there. That's what I am saying. That's a black box. Okay. Aditi?

**[02:13:09] Student 12:** Maybe we can introduce a layer in between. And if we have to access the queue, we have to pass through that layer. And in that layer, we can implement that only one request can be passed at a time.

**[02:13:22] Teacher:** But then, then that layer becomes a portal [check: "a portal" as heard]. You have queue already. Now you're adding one more layer to that. We are talking about lock manager implement a lock manager.

> **Student Question [02:13:39] - Student 7:** If we don't want another layer, then can it be another process on the same machine, which is running the queue?

**[02:13:46] Teacher (answer):** No, you cannot. That's a black box for you. That's a remote call for you. God, for you, there is just one API call exposed. You make that API call, you get message from the queue, but that is unprotected.

### [02:13:59] Database as a lock manager

[02:13:59] Wait, let me, let me do that. This discussion is going in random directions, but let me sort it out. I'll lower their hands. Will directly chop it. Okay. So here the problem is this queue is a remote queue because of which what is happening is because it is a remote queue every consumer is having an API call to make which reads message from the queue. Now what is happening is you want only one consumer to read message at a given point in time. So what do you do? You need to ensure that some of these three consumers coordinate among themselves and knows make a call.

[02:14:35] So what you do, you use a database as a lock manager. Some database in which you have a key, let's say Q7 and you store against which consumer is allowed to take a lock or sorry, which consumer is allowed to read from the queue. And so you take a database that gives you this feature in which you create a key called Q7 against which you store. Let's the consumer one right now owns the lock. So it would be consumer one. So given consumer one owns the lock, it can go and read it. Other consumers would see whose name is there over here. If it is consumer one, then only consumer one can read it. Consumer two and consumer three would say, okay, we are not going to read it because this is held by consumer one. Right.

[02:15:21] Now, as soon as consumer one is done processing. So here all the three could listen to this. Okay, when consumer one is done processing it would remove its name from here. Now it is open. Now consumer two and consumer three would compete who puts their name inside this. Now let's say consumer three won. So when consumer three won, now consumer one and consumer two, when they're trying to read the next message, they would say, oh, consumer three name is already here, so we can't do much, so they would wait, right? But consumer three, because it has its name, it can go and read the message from the queue. This is a classic lock manager implementation. Now here this is exactly what you need to store, that what's the resource and who owns this resource.

### [02:16:05] Lock expiry - TTL, Redis and Redlock

[02:16:05] But now there is a catch. What if consumer one took the lock and before it could delete it died off. Now if consumer one let's say owns the lock over here and before deleting it died off which means that consumer one would never be able to delete this lock. So which means that this lock is perpetually held by consumer one. So that's a problem. So which means that apart from this, what we need is for everything we need a TTL, automatic expiration, that after some point in time, this entry, if it is not deleted, it needs to delete itself. So what you need from this database is you need key value-based access, instructions and TTL, which database gives you all three Redis, which is why you see the most common remote locking implementation is Redis based implementation called Redlock. We'll talk about this. Right. And this is the core idea.

[02:17:09] Rajiv, I'll take your question. Wait, let me cover this now into it. I'll take your question. Wait. Right. So, and by the way, I'm saying this because it distracts me. [unclear: "I into the front"], it just breaks my, that's all. So this is what we'll talk about. It's a Redis based remote lock implementation. But now you understand why we need it because this is a black box for us. We have no access to that machine, to that queue, anything, but all we have is just network interface to call the normal HTTP request. Assume that because it did not give the protection that we needed. We have to implement the protection that we need. So we did this. We defined that what all, how we would store it. What is the edge case and the key features that we need from the database. We know the key features that we need from the database. [unclear: "We've CVS database"] gives you this three. We know Redis gives us. So that's why we implement remote lock using Redis.

[02:18:03] So at each of the consumer that we have consumer one, consumer two, consumer three, the code that you would write would look something like this. Read message. You would have anywhere read the message, but because you need coordination between consumer, you would acquire the lock, read the message and then release the lock. So every consumer would constantly trying to make call to Redis trying to acquire the lock. One of them would succeed as one of them succeeds. It reads the message while other one continues to wait there. And once it reads the message, it releases as soon as one releases, the next one comes in. And then it releases and then immediately the next one comes in. And then next one comes in this way, your entire process gets coordinated.

[02:18:46] Only one consumer is reading the message from the [?queue | asr: "key"] because queue is not giving you the [?necessary | asr: "sensory"] protection. This is a remote [?lock | asr: "key"] implementation. So now what you do? The features that we need from this is atomic instructions and automatic expirations. So what we are storing in Redis is we are storing exactly this, that this is the resource. This consumer owns this resource at this very moment with an expiration of 5 minutes. So only consumer 2 is allowed to read it. Once the consumer 2 reads a message, it releases the lock which means it deletes this entry and someone else can take it. But in case this consumer 2 does not delete the entry in 5 minutes, the entry gets auto expired. This means there is no perpetual holding of lock and the system continuously moves forward. Okay.

<!-- chunk_13 02:19:41-02:32:14 -->

**[02:19:41] Teacher:** So this is exactly how your code would look, exactly how. So your acquire lock logic in Python would be like, your consumer, when it started, it says, get my ID. So consumer, when you hard code it, how you want to implement it, it's your consumer ID, maybe IP address, host name and whatnot. So your consumer knows that I am this, my ID is this. While true, I'm trying to set the key in Redis. So which means this, I am trying to set this key in Redis. And now what I am doing, I am not just doing normal set, I am doing set nx. What set nx does, it means that set a key with some expiration where it is non-existent. So I am trying to set for my Q7, I am trying to acquire the lock with an expiration of 300 seconds.

[02:20:32] So this command of Redis is an atomic command, which means that when one, this command is executing, no other command would ever execute on Redis. Right. This ensures atomicity. Right. So even if there are multiple one, try to execute multiple commands in the Redis at the same time, only one of them success. Unless this completes its execution, other command would have to wait. It's the property of Redis that we're leveraging, atomic instructions. But if the key is already set, it would not replace it, which is exactly what... key is already set and now if, let's say, consumer one tries and set, set, that's wrong, right? You don't want that to happen. So Redis gives you that command out of the box, which says set nx, that set only when it is non-existent. So if it is able to set, it returns one. If it is not able to set, it returns zero.

[02:21:21] So what you do, that if you are able to set your consumer key in Redis, which means that now you own the lock. Because now you own the lock, you can exit from this... As soon as you exit from this infinite [?loop | asr: "value"], you can read the message. Right. But for folks who cannot do that, who cannot set their key in Redis because some keys already sets of consumers already having the lock. V is equal to zero else continues. So you continue this while loop forever, forever as in unless someone releases it. You are able to set it up until then there would be infinite loop. So most consumers will be stuck over here unless one of them releases it. So one who acquires it moves forward. That's what we are doing over here. So if you are able to set it, which means now you own the lock. So you return, which means when you return, you come to this instruction and start reading the message from the queue, making an API call, while others continue in this [?while loop | asr: "volume"].

### [02:22:27] Releasing the lock - ownership check

[02:22:27] Now what about releasing the lock? ...making a network call to get read the message from the queue. Then releasing the lock. Releasing the lock is simple. I get that I am this consumer and I can just delete. Imagine if I don't write this. I just do this. I see what consumer I am or not even this. I just do this. Release lock queue. Delete entry. What's the drawback of this? You are saying that when someone really calls release lock, you are simply deleting the message, or you are simply deleting the entry from this Redis, right? If you do this, the problem with this is that it is possible for a process to delete the key from Redis even though it does not own the lock at the moment.

[02:23:19] For example, let's say consumer one acquired the lock, but consumer two fired release lock. Right. So lock is with consumer one, but consumer two is like literally deleting the entry right away. So then consumer one had a lock and then consumer two is deleting. Then what's the use of that? Right. But you'd say, why is it possible? Because only the consumer that has acquired a lock can reach to this point. No one else can. So how is this even possible? I'll give you that edge case. That edge case is with timeout.

[02:23:54] Now imagine there are two consumers. Consumer 1, Consumer 2. Consumer 1 acquired the lock, which means in Redis right now, Q7 against which is stored Consumer 1. And there is a timeout set. Now what happened? Let's say timeout was set for 5 minutes to read and process the message before it gets deleted, before it is releasing the lock. But because five minutes expired, your Redis automatically deleted the key. At that point of time, consumer two came in and acquired the lock. Then consumer one came at this point and released the lock. But now that the lock is acquired or is held by consumer two, but consumer one thinks that it owns the lock while deleting, because it read till this point, it got till this point. Here the code is written, just deleted like this. So consumer 1 is actually deleting the lock which is owned by consumer 2. This is the edge case.

[02:25:00] So which is why you cannot delete in case the lock is not yours. So you have to add this check that get who owns the lock at the moment. If it is you, then only delete. But there is still an edge case that why, if this is a normal Python code that you're talking about. Now what could happen is you read here, you saw, you as consumer one entered here, started executing this function, you reached this part, you executed this, you saw this get, you executed this line. You saw you are the one who is owning the lock. But after this, the expiration kicked in. The key got evicted. Consumer two own the lock. And then you deleted. So although this condition went true, you thought you are owning the lock. But you are not actually owning the lock, because while this executing and this executing, between this [?consumer two | asr: "consumer to"] acquire the lock, because of expiration, the key got expired, consumer two acquire the lock, deleting it, the lock which is acquired by consumer. Wrong. This is where the distributed system has its glory.

### [02:26:18] Atomic release - Redis eval and Lua script

[02:26:18] It is full glory. Right. These edge cases are the one that you have to ensure, because then your system is not correct if you are missing out on this edge case. So now what do you have to do? You have to make this atomic. So what do you do? So, Redis specific thing, but there is something called as eval, in which you don't write this as Python code, but a Lua script, which you run in one shot on Redis. So while that one Lua script is running, Redis cannot do anything. So this entire thing is executed as one Lua script instead of a Python code or any language that you are writing. So go through Redis, check, eval, check, Lua script, how to write, it's exactly written like this. But you pass it there. So every command of Redis is atomic in nature. So while that command is executing, nothing else can execute. So you execute this two statement as one thing in Redis. That's a kind of transaction, kind of, kind of. But this ensures that while these two, three statements are running, nothing else would run on this. This way you know that while this is happening, lock is not acquired by someone else in between automatically. That's the beauty of it.

[02:27:25] Now, this is a kind of things you need to know about distributed systems, like all these things. Imagine after every single line, something lag is coming, something's going down, something's happening. See if your system still functions well. This is the granularity that I want all of you to go into, rather than just saying, I'll have a [?lock | asr: "lot"]. Go into those details. That's what makes you better. Okay.

### [02:27:53] Single Redis instance - fault tolerance and distributed locks

[02:27:53] But, but, but it's still not done. This one instance of Redis is not horizontally scalable. First of all, or it's not fault tolerant. Why? What if this goes down? Now what? Who would take care of it [unclear: "subtype"]? Because if this goes down, their entire system is done, because no one can acquire the lock. No one can move forward. The system is at stall. How do you solve it? Which is where to solve the single point of failure. It's a stretch. Very few companies use distributed locks. Most startups never think of using distributed locks because cloud provides you those guarantees. But if you are working for AWS, if you are working for GCP, you are the one building it, you have to take care of offline. So that is where distributed locks come in.

[02:28:40] So the distributed locks concept, it only exists to solve the single point of failure problem for a single lock system like this. This is just one instance run, right? I could have just said, run it in cluster. That's not how real systems are. That is where distributed locks come. I've seen it. I've used it. That's why I'm so, so, so confident about it. Why do we need it? So distributed locks come in places where you want to avoid the single point of failure problem of single lock instances.

[02:29:13] So what do you do is, instead of taking lock on one Redis, you take locks on multiple Redis servers. So for example, here I'm taking example is five. So let's say instead of having one Redis server running, you have five Redis servers running. All independent, no multi-master [?replication | asr: "application"], nothing. All independent. These are all independent servers. So now what you do? Now your acquisition lock looks something like this. You, instead of going to just one Redis node, you go to all five of them, sequentially, in parallel, anyhow. And you try to acquire lock on all five.

[02:29:53] ...Way that we did that, right? You try to acquire lock on all five. If you are succeeded, if you succeed in acquiring lock on more than 50 percent of nodes, I'm not like three, four or five nodes, then you own the lock, otherwise you don't own the lock. Simple. So if you own the lock over here, here, here, it's three. Three is more than five, or three is more than half of five, which is two. Given that you own the lock in majority, which means that no matter how many other process [?contend | asr: "contained"] for it, you would still hold the majority, right? So you own the lock, which means you acquired a lock. Now you can read the message. It's a stretch. It takes a toll on performance, not even, not even denying that fact. But when you want the correctness of the system, when you want fault tolerance in your system, you have to do this, right? Startups would never see this problem. Most of things are are building it, Chubby great example for that, you have to take care of it, right? Okay. But in case, let's say you try to acquire the lock, but you got lock on only two, three, where you were not able to get a [?lock | asr: "lot"], you will immediately release the lock on these two, and so that let other process [?contend | asr: "content"] for it. So it's like literally every process coming in, trying to acquire the lock every single time, then someone else would win it, like someone would win it eventually, and the one who wins it takes the lock and processes the message. Obviously throughput is gone for a toss. So that is where you would see distributed locks not being used in high throughput systems. It is typically used in systems that demand high degree of correctness. That's where you would use distributed locks.

[02:31:34] But the idea here is that because of its distributed nature, even if one of the node goes down, there is no problem at all, because there is still other nodes who hold the data, right? Obviously [?an edge case | asr: "in each case"] is there, that if, let's say, hold the lock in these three instances, right, and then after that these two instances itself go down, then, I don't know, there are still edge cases, there is still problem with correctness in it, but still reduces the probability of hitting that to a bare minimum, right? Okay. And as I said, the only reason why we do this is to

<!-- chunk_14 02:32:14-02:44:59 -->

**[02:32:14] Teacher:** A single node of X and you just make it distributed. This is the idea of distributed system. Every single piece in your architecture needs to be horizontally scalable like this. It has to be distributed like this. Okay.

### [02:32:29] Further reading - Chubby, Redlock critique

[02:32:29] A few things that I want you all of you to read. Chubby, read this paper. This is what Google still uses in production. Day in and day out [unclear: "errors are"] Chubby props up. Chubby is one of the most fun service or fun systems out there. Amazing paper by Google, Lock Service for Loosely Coupled Distributed Systems. This was one of the first papers I ever read as it was part of an assignment. And that's how I got to look at this. Something called as research papers. Actually, this was the first paper I read. So Chubby was the first paper I ever read. It's very influential. It's very interesting. Read that.

[02:33:03] Apart from that, I have tons of [?blogs | asr: "blocks"] on distributed systems, tons of things on my YouTube channel and whatnot. Read it. Redlock, what we discussed, there is an edge case where it would not work. Martin Kleppmann has a blog written on it that why you should not use Redlock. He talked about an edge case. Again, very rare to occur, but he has this knack of finding those things out. So he put it out where you should not use Redlock. There is an edge case in case you are interested, read it. I would recommend read it anyway.

[02:33:37] And I have three or four videos on my channel on distributed transactions. What we talk about locking that would help us implement distributed transactions, distributed transactions practically. I have shown how to do distributed transactions, right? Three videos are there, watch them. It's a, you would be able to understand it more than other folks who are watching, like who have not taken this course, because, you know, airline check-in system, I use a lot of those stuff but not go went into those details because it's obviously exclusive to this course. So I did not touch up on those details, I just skimmed through it like it is. You would be able to understand it much better. So spend this time understanding this part, distributed transaction and its implementation on my YouTube channel. I've done more of this stuff around.

[02:34:23] But this is what I wanted to cover. There has to be a lot of questions. If there are not, then you need folks to think about it. Right. And absorb this part. Distributed systems are amazing. Right. Think of making it distributed in order to not just horizontally scale the system, reliability. These two factors as well. Here we distributed this part not to handle scale. Did we? No. It is reducing the scale. It is reducing the throughput. But what we are gaining out of this, we are getting fault tolerance. We are increasing the availability. We are increasing the availability of our service. So you pick your pattern. You are either scaling it horizontally to handle scale or you are making it distributed. That's why I use different phrases. You are making to get fault tolerance and reliability and availability on that point. Right? Okay.

## [02:35:16] Wrap-up and next class *(admin)*

[02:35:16] But this is what I wanted to cover. Folks who want to drop off, feel free to drop off. Tomorrow, we'll be talking about distributed ID generators. It will be right at two and a half hour discussion, but we'll go into, again, the intuition of distributed ID generators, why we need it, how systems have been able to scale it to real-world examples, again, implementing everything that we studied. Right? We'll focus on that, go into those nitty-gritties of those systems. Right? Okay. [?Chalo | asr: "Challah"]. For tuning in, I'll take questions until there are and then I'll see you folks tomorrow.

## [02:35:49] Q&A

> **Student Question [02:35:49] - Student 2:** Arpit, when you told that multiple machines had network in common, so the question which you asked, how to implement locking, I was thinking on network perspective. So one thing came to my mind was port. Now I do not know whether there's a protocol where you have only one connection, like only accepts one connection. If multiple pushes come and connected, they get a rejection. And it's also able to broadcast on whomsoever I subscribe or basically on interface.

**[02:36:14] Teacher (answer):** That's a good idea. You can implement it on the side.

**[02:36:16] Student 2:** But then you said, yeah, but then you said it's a black box. So I thought, okay, then it's a black box, nothing to put them because we don't only have APIs on the library to call. So, I mean, I, we assume if we could do something about me, we could do multiple things, but if you, you leverage network to, to a locking, so this could be an idea where you, where consumers actually have an interesting to interface, where the queue broadcast and you just try to get a port and then your any one of them can get the port to talk on and then they start waiting and the broadcast comes in and then just try to compete.

**[~02:36:46] Teacher (answer):** To be honest, that's a brilliant idea. Like, I loved it, I loved it, because now you can very, even that we went through load balancer code, you can very easily see how to do it network. Instead of having it an [?infinite loop | asr: "infinite clue"], accept the connection, don't run threads on it and just handle it. Only one process will be able to connect to a server. Your server is never listening or never allowing to, or sorry, is never listening for any other client to do unless the first one has done processing. So that's how you can implement it. So normal TCP connection or is a normal TCP server that you can set up to get this done. Only one client can connect.

**[02:37:25] Student 2:** So couldn't we prevent the cost? I mean, if Redis is hosted service, we prevent the cause. I mean, [unclear: "cause cam"], we can also have the latest implemented.

**[02:37:33] Teacher:** Other parts. You need those things.

**[02:37:36] Student 2:** Hmm. Okay. Because here, here the thing is, is it okay. The consumer dies then because the consumer dies, the TCP goes down, right? If it dies also connection is gone. Queue knows, okay, connection is down. That's proper. Yeah.

**[02:37:49] Teacher:** You can implement. I'm not saying that's what I'm saying. I'm not saying no, there might be other things that we in this two minutes be skipping. I cannot just say no, you can just use it. I have to do a column and compare features. Yeah.

[02:38:00] Yeah, yeah, but I loved how you thought it out of the box, because it's very fundamental. You just prevent others from connecting it, right? As [?simple | asr: "super"] as that. And that's, and that's brilliant. I just loved it and now I cannot stop thinking about it. No, it's fun, it's fun, it's fun. Which means that are writing your own server to accept the request. It's, it's, it's a very easy [?implementation | asr: "interpretation"] to be honest. You can actually implement it within few hours. Do that, do that, do that. That's really interesting. Yeah. Okay, thank you. Yeah. Yes. Yeah. Really interesting, trust me. I'm so happy and I'm, I'm just, I'm just thinking about that approach because yeah, nice. Thanks, thanks, thanks for that. Okay. Sorry. Yeah. [check: "Okay, thank you. Yeah. Yes." may be Student 2 (STUDENT_5 label mixes)]

> **Student Question [02:38:50] - Student 1:** Yeah. Hi, Arpit. So Arpit, in this case here we have used Redlock. So it's a key-value store. So is it only Redlock or can't we use a MySQL system because we are just using a row here and, you know, atomicity can be provided by MySQL.

**[02:39:05] Student?:** Yeah.

**[02:39:06] Teacher (answer):** If you can take care of TTL, your problem is MySQL.

**[02:39:10] Student 1:** Okay. So TTL is the requirement because if, let's say, one server is, server is crashed. That case, how to remove that key. So basically for that reason only we need a TTL.

**[02:39:20] Student?:** Correct.

**[02:39:20] Teacher (answer):** Correct. In case you can have a [?cron job | asr: "crawl job"] that is taking care of TTL. Then you can use MySQL. That's what I said. That's why we, I always say you focus on the core properties that you need from the database rather than the database itself. Correct. Right. You can use MySQL. So long as you're taking care of TTL. Otherwise there will be perpetual lock.

> **Student Question [02:39:39] - Student 1:** Got it. And one more point I didn't understand here. You, you mentioned Lua script to use.

**[02:39:46] Teacher (answer):** Behind that. I don't know. [check: "behind that. I don't know." may be the end of Student 1's question (diarization lag)] Redis supports that. Read about Redis eval statement. Okay. It runs this in an atomic manner. Lua script using Lua scripts. So Lua as a language does not do something magical. Redis supports writing scripts and executing within Redis server as Lua.

> **Student Question [02:40:04] - Student 1:** Okay. So if you are writing these statements in, let's say, any language, let's say Golang or Python, this will not be implemented as a single piece of code.

**[~02:40:14] Teacher?:** No, no, no.

**[02:40:17] Teacher (answer):** This is still Python. But these statements are Lua. Check eval statements. Eval, eval, eval. Read about eval. Read about eval. Read about eval. How to write scripts in Redis which you can invoke through Python. It's normal, like you pass in script to Redis rather than a command to Redis.

**[02:40:37] Student 1:** Got it. And I have a question in the load section also, can I ask that after?

**[~02:40:40] Teacher:** After, after. Sure. First we'll cover everything around locking so that there is no [unclear: "context which there"], that's...

> **Student Question [~02:40:45] - Student 1:** Got it. Yeah, thank you. So this is about implementation on queue. I read implementation slightly different, especially multiple consumers compared to read like no message or like no consume message, right? Where what I read was, once like no consumer, like no places a [?lock | asr: "log"] or like no sees the message to consume, immediately it sets like no visibility to off so that other consumers cannot even see the message in queue.

**[~02:41:20] Teacher (answer):** This is a different queue. That's what I said, it's a hypothetical queue. You're taking a very specific example. I said, in order for us to understand remote locks, we're taking this example, right? It does not mean you'll go and re-architect your entire stuff through this. It's a hypothetical zero protection. That's what I was saying. It gives you zero protection over here. Any message, any consumer that gets, just gets the message. What you're talking is very specific to the queue that you are using. And I said, this is a hypothetical queue. It does not give you any guarantees. If you talk about RabbitMQ, SQS, Kafka and whatnot, they give you this guarantee. So you don't have to do anything around it. Right?

**[~02:41:53] Student 1:** Yeah. I'm referring to OCI queue implementation [check: OCI = Oracle Cloud queue?]. So there is.

**[~02:41:57] Teacher:** Yeah. So they give you that. So that's what I said. It's a hypothetical queue. That's what I started with. Right. We are playing constraint so that we understand lock. That's fine, right?

**[~02:42:07] Student 1:** Okay, okay, thanks.

> **Student Question [~02:42:07] - Student 4:** Yeah, my doubt was, I mean, might also basically like, in the given figure, like the consumer can directly go and get the values from the queue without acquiring the lock, but I think your prior...

**[~02:42:24] Teacher (answer):** That's what I said, it is not protection. The same message can go to multiple consumers. I don't want that to happen. That's what I said, right?

> **Student Question [02:42:34] - Student 4:** No. Yeah. So my doubt was basically, I mean, here, if you see the consumer are going to getting the lock from Redis, but there is no connection between Redis and the queue. So why should there be? [check: "So why should there be?" may be the Teacher] No, how would we, how would, how does the queue know that? I mean, I can simply write, write as a consumer, like get the value without getting the lock, right? In this case.

**[02:42:57] Teacher (answer):** Why? That's what I say. I mean, it's our consumer, our logic. We are writing it, right? So you would write it first, get the [?lock | asr: "locket"], then read the message. That's what the problem statement is.

**[02:43:11] Student 4:** Yeah. I mean, later with the last answer, I understood like, because it's a hypothetical situation.

**[02:43:16] Teacher (answer):** Yeah. It's [?hypothetical | asr: "happened"] so that we understand remote lock situation. Now imagine where can you use remote lock? Imagine MongoDB distributed transaction across multiple shards. Now, for example, there are five shards, shard one, shard two, shard three, shard four, shard five. MongoDB is running a distributed transaction in which you updated rows, three documents in MongoDB, one lies in shard one, one lies in shard three, one lies in shard five. There is another transaction that is coming in which wants to update the exact same documents. You have to make the transaction wait because first transaction has acquired a lock on that document in shard one, that would document in shard two, that document in shard five. Where would you store this information? Two transactions distributed nature in a remote lock. Right? You need to keep track of it so that your transaction cannot move forward.

[02:44:03] Directly talk to it if you, it's your code, you have to implement it, right? So what MongoDB does is it gives you those guarantees, but how it is implementing it, it is having its own lock manager where it is saying that this transaction has taken lock on this row or this document part of this shard, this document part of this shard, this document part of this shard. Other transaction comes in, it says, hey, I want lock on this document on this [?shard | asr: "show"], but say, oh no, but this lock is without this transaction, so wait. So the transaction would wait until this transaction either commits or rolls. We implemented it same thing over here. Three consumers trying to read something, a shared resource. We are keeping track of locks so that only one of them can move forward. What we just said is just MongoDB distributed. We just implemented a distributed transaction where we are using Redis as a lock.

**[02:44:54] Student 4:** Sure. Got it.

**[02:44:57] Teacher:** Sampai.

<!-- chunk_15 02:44:59-02:58:14 -->

### [02:44:59] Synchronizing over the nearest shared storage

**[02:44:59] Student 1 (Sampai):** Yeah. Hello. Okay. So my thought process is around the part where you explained when we try to synchronize two threads and then two processes and then two machines. So basically, if we try to synchronize two different entities, then we always try to look for the nearest shared storage system. Correct. For the best purpose. Okay, so this is the fundamental principle we always follow. So basically for two threads, the nearest storage is the in-memory RAM. So we are using this mutex and semaphore for two processes. RAM is separated, so disk is there. Similarly, for two different machines, the nearest one is the database, external database.

**[02:45:51] Teacher:** Excellent. Anything over a network.

> **Student Question [02:45:54] - Student 1 (Sampai):** Yeah, so now let's say we have two different, two independent distributed systems. So in that case also we can leverage some, this Redis system to synchronize two different distributed systems. Any example that would do it, that you have seen.

**[02:46:17] Teacher (answer):** What do you mean by distributed system? That's a very vague term.

**[02:46:21] Student 1:** Okay. So right now in today's topic, we went to the, to, to the place where we are making two synchronized, right?

**[~02:46:31] Teacher?:** Let's say we want to target a machine, two different distributed system is itself two different machines, right? So there is still.

**[~02:46:37] Student 1:** Okay. Okay. Let's think in this direction. Let's say there is a cluster. There are two clusters. Each of the cluster is formed of homogeneous operations. But if you compare among the cluster, they are performing heterogeneous operations and you want to do some synchronization between them. In that case also, like it's like a multiple machines versus multiple machines. Correct.

**[02:47:04] Teacher:** But it's still network is common between them, right? They're all part of the same network.

**[02:47:10] Student 1:** So basically it ends to a point that if we end up using this databases, then we are able to synchronize two entities over network.

**[02:47:26] Teacher:** Yeah, it will always be network because there are multiple machines involved. Network is the only thing that is shared between machines, neither RAM nor disk.

**[02:47:36] Student 1:** Understood. Understood. Great. Yeah. Thank you. Thank you for this principle. Yeah.

### [02:47:41] Lock TTL, mutex vs network lock

**[02:47:41] Teacher:** Gaurav.

> **Student Question [02:47:43] - Student 1 (Gaurav):** Hi, so while acquiring the lock, we store the process ID or the user ID parallel to the queue and also the [?TTL | asr: "PPA"]. So aren't we bounded by the, doesn't it become a bottleneck that a process can run for at most this amount of time now,

**[~02:47:58] Teacher?:** but otherwise that's what you have to do. Otherwise there will be perpetual locking.

**[02:48:04] Student 1:** Yes, but we are still bottleneck.

**[02:48:07] Teacher (answer):** Everything has it. Every single implementation has it. Otherwise you are running a bigger risk of perpetual locking. That's a bigger risk. You never deleting a message that you consume or you never deleting a lock, which means your entire system is stalled.

**[02:48:24] Student 1:** Yeah. And let's say I as a developer go on to implement or as a project, I want to implement mutex and comparing that to a network lock, which we just discussed. I think implementing mutex would be way more difficult than implementing network lock.

**[02:48:42] Teacher:** Implementing mutex is two lines of code in C. That's it. But that's okay. Okay. Because it's all in memory, single RAM. Everything is just a thread. You're coordinating between that's peanuts.

**[02:48:58] Student 1:** But however, we are signaling over there. That is, I think a costly and I don't know how that.

**[02:49:02] Teacher:** No, network is much more costly any day. It's the worst mode of communication.

**[02:49:07] Student 1:** But we are not signaling here, right? We're just polling. But that's an [?infinite loop | asr: "infinite tube"].

**[02:49:12] Teacher:** Look here. Yeah. Look here. How many times are you making network call?

**[02:49:19] Student 1:** No implementation way. This seems easy enough, but let's say I want to implement a signal now. That's very easy.

**[02:49:25] Teacher:** And mutex is in memory signaling is peanuts for operating system. Okay. Network call versus signaling, signaling any day. Got it. Thanks. [unclear: "What call is pathetically."]

### [02:49:38] Single server - mutex or synchronized

> **Student Question [02:49:38] - Student 4:** Hey, hi. So, I had question like, if this is not remote and it is having on one single server. So we have to use mutex or disk based synchronized?

**[~02:49:52] Teacher (answer):** You can use normal synchronized. [unclear: "May if you rapid use mutex"], then it just becomes a local critical section. You can just use normal mutex, the same upper synchronized atomic instructions and whatnot to wrap it around. You don't need [?Redis | asr: "ready"] for that.

**[02:50:07] Student?:** Thank you.

### [02:50:12] Redlock edge case - lock-holding instances going down

> **Student Question [02:50:12] - Student 2:** I try to go deep inside five instance of Redlock. Understand one use case, what happens there. We have five tests here, five Redis cases, and then if, let's say, one [?thread | asr: "threat"] comes across, comes and then gets three, three locks. After the lock acquired, two instances go down, so effectively has taken only one, I mean, effectively operations are going ahead, and the one that is thing by the time the five minutes is a TTL, let's say, and then we come up, we span across two Redis new nodes again, then there's another [?thread | asr: "threat"] which is trying and then it has not three Redis. Now we are in a shape where on a single, let's say common row and Redis, we have acquired two locks on the same thing, right? Because they're different clusters, which are not in good shape among themselves. How the situation goes bad.

**[02:51:06] Teacher (answer):** That's what I said. That's what the edge case is. And that's what I said that this is not a full proof, but it still minimizes the chances. What are the chances of two servers going down? Who, which has held your locks? And in any case, listen to me carefully. And in any case, what I said is, let's say your consumer one has lock over here, lock over here and lock over here. Consumer two lock over here, lock over here. Look carefully. This line. If consumer C1 or C2, now here, let's say C2 has lock over here and here. C1 has lock here, here and here. If I was not able to acquire the lock on all instances, like majority of locks, what I would do? I would release the lock I've acquired. Yeah, yes, yes, I would release a lock. So consumer C2 will release this lock, yes. Then let's say there is a chance that consumer C3 will acquire lock over here, C4 will acquire lock over here, but C1 is still in majority. They would say I cannot do that, but because C1 is also trying to acquire the lock on the third and the fifth shard, so somewhere down the line C1 would succeed and here also C1 would succeed. So eventually your system will converge into the fact that on all the instances C1 would have the locks and it is doing it perfect. But all we need for us to move forward is to have locks on majority of them, right? So this minimizes the, the case that you mentioned, but it's still there, it's still there.

[02:52:32] Now what we are doing is, let's say I acquire the locks on these three instances, this is acquired by C2, and now let's say if these go down, the one who acquired it. But when they go down, you would have some things in place, right? C1 would have started moving forward and then started removing the lock. Case number one, that C1 already knew that it has majority, obviously it has, that's why it started moving forward, right? But now C2, because it is in the loop where it says, hey, I don't have the majority yet, so it is trying to acquire the lock, but says now there are three instances this. So now there could be one thing, you may have a global state which says that, hey, my, my, my cluster is unhealthy, let's wait for two more nodes to come up. That's one case. Other, if you may think that, hey, I would not do that, unless just move forward, I own the majority, I'll move forward with that. So in that case what would happen is C2 would think that it has acquired the lock. If C2 thinks that it has acquired the lock, then C2 would move forward. This is the edge case that we're talking about.

[02:53:29] But that is very minimal because for it to happen, you need this case would happen when your C1 was acquired the majority of locks before it gets, before it acquires the lock on other two instances, the two instances in which it has acquired a lock goes down. Imagine the probability of that happening. Got it. Imagine the probabilities because for it to acquire lock on these two, it would hardly take two or three seconds, not more than that. And why I'm so confident on it because every other process, because they would be failing on acquiring the lock on more than 50%, they would keep on releasing the lock that they've acquired. So they would keep on acquiring and releasing these locks. But C1 is also trying to acquire the locks over here. It's not that C1 has given up the majority. I'm full confident. C1 is still trying to acquire the lock on these instances as well.

> **Student Question [02:54:26] - Student 2:** But, why would C1 try to acquire on M2? Because it already has a majority, right? So why would it go?

**[02:54:33] Teacher (answer):** But it would need to. Otherwise the edge case that you mentioned.

**[02:54:37] Student 2:** Okay.

**[02:54:38] Teacher:** So to cover the edge case, C1 is allowed to minimize, not cover, to minimize, right? Because your edge case would happen when, when C1 has acquired the majority and it started, it could acquire the lock on the remaining two instances, then the two instances on which it already had the lock goes down. That's when an [?edge case | asr: "hk"] system, right? That minimizes. Yes, yes, correct. Got it. See, this is why I love distributed systems. You, that I have implemented, that's why I'm so confident in explaining, you know, what happens, because I've mimicked this situation, I've put tremendous load on it to understand how it behaves. I've specially arranged it in a way that delays. I typically simulate the situations with delays that one second delay, five second delay, 15 second delay in order to mimic this situation, to see how my system is reacting. Just do it. It's so fun.

[02:55:38] I just love distributed systems because of this very reason, because a lot of people think I need multiple machines to do that. No, I can do it in single machine. I did not even have five instances of Redis running. Instances of Redis running in my local machine 6379, 6380, 6381, 6382, 6383. That's it. And just mimic it. Just mimic it. You don't really need fancy setup for this. All sorts of facts because for you, it is important to understand these edge cases and how you are minimizing it. This one line that a lot of people miss on is the line that makes all the difference. Right? These edge cases are minimal. We never say it is fully covered. We never say it is fully mitigated. Minimized. But thanks for bringing that up. I got

**[~02:56:18] Student 2:** Also, I have seen a pattern that you, I mean, across the three weeks that you mentioned papers, you mentioned implementation, so it's like bounded together. You read papers, you try to implement, and then you got into some details where you talk about these things, right? So basically implementation is the, is the place where

**[~02:56:34] Teacher:** Yes, you can go. Yes, a lot of people think system design, distributed systems is all theoretical, I need fancy infra to do that. I give you 100 ways to mimic all of these things locally. I just gave you one. You need five instances of Redis, why have five servers? Run five processes. Load balancer, I gave you that example. Read and implement. I just never just read research papers, I read and always implement, because that's where I, you know, this edge case, and I just go very in depth of it to understand, especially those edge cases where it would falter, and try to mimic them with explicit delays.

**[02:57:17] Teacher?:** Now that's the beauty of it.

**[~02:57:17] Student 2:** Yeah, and starting you feel like, I mean, so much complexity, but when you get into the details, you, you just feel fun, then it gets an inertia to do more and more and more.

**[02:57:27] Teacher:** Classic example, load balancer. I'm sure you would be intimidated by it, but now you think of it, it's so easy, right? Right.

### [02:57:34] Digression - writing my own malloc

[~02:57:34] Similarly, just to digress from the discussion, since yesterday evening I am obsessed by writing my own malloc. I am obsessed. I am obsessed. [check: possible ASR duplicate] I am [?diving | asr: "driving"] deep into how memory management happens at operating system level. How program gets memory? Where exactly is this heap? We say, this is allocated in heap. Where, Baba, where is this heap? It has to be somewhere in RAM. But where? How? How it is linked? I am planning to write my own malloc today.

**[02:58:04] Student 2:** You have to do your own inodes and all those things.

**[02:58:06] Teacher:** No, no. Inodes is file system. Inodes is file system. Malloc is in memory allocation. Allocation.

<!-- chunk_16 02:58:14-03:10:25 -->

**[02:58:14] Teacher:** Implementation, the devil lies in the details. If you don't implement, I would have never been able to answer your question if I would not have implemented it. Correct? That's the difference. Last 10 years, I have 180 projects, 80 repos on GitHub. A lot of them are private. 180 repos on GitHub. [check: possible ASR duplicate of "80 repos on GitHub" (80 vs 180)] Think how many things I've implemented.

> **Student Question [02:58:41] - Student 2:** What pushed you basically? You mean what, I mean, when I just tried to implement something, uh, that's your complexity.

**[02:58:47] Teacher (answer):** I'm in love with engineering. I find the scrappiest way to build. I don't, I don't think of time. I just study. I can study 24 hours a day. Even morning before the lecture, I was reading, uh, I was reading, uh, official documentation of the system calls that allocates memories in RAM. And I read it till 8 45 and then I started this meeting. Even if I have 50 minutes, I'll read something. I just love it. I just love coding it out. That's, see, I'm very intrinsically motivated to do this, to know these details. It just gives me those kick that I always wanted. Netflix, Netflix I don't watch most. I just do this. I love this. But I get some, I lose some. I don't know what people talk about when they talk about Breaking Bad and those kind of stuff, but when I talk about this, they don't know about this stuff. So you win some, you will, but it's fine. So long as I have the smile on my face, I don't care. It's simple.

**[02:59:45] Student?:** Thank you.

### [02:59:48] ZooKeeper vs Redis-based locking

**[02:59:48] Teacher:** Sidesh.

> **Student Question [02:59:49] - Student 3 (Sidesh):** I have two questions. The first one is on the [?load balancer | asr: "load balance of"] thing, if you can

**[02:59:53] Teacher:** Wait, wait, first locking.

> **Student Question [02:59:55] - Student 3:** Okay. I see, sorry. So with respect to locking, one question is, with respect to, yeah, I understand and all of that. My question is more on the practical front. If you really want to do this, why would we not prefer something like ZooKeeper, which gives us a interface to say you have a leader and then implement a in-memory locking, which is more reliable? Who wrote ZooKeeper? [check: "Who wrote ZooKeeper?" may be the teacher starting the answer]

**[03:00:24] Teacher (answer):** How it is implemented? It does exactly what I talk about. Exactly this. So either you implement with Redis or do you use ZooKeeper.

**[~03:00:35] Student 3:** But I mean the guarantees are different, right? Like for example, in, no, no, like for example, in this we can find a lot of problems, right, with respect to time, acquire, expire, network boundness and all. ZooKeeper will give us a lot more guarantees and with respect, like, like, it has a, like, basically if you have a leader, it has a persistent leader.

**[03:00:58] Teacher:** So if here you can add persistence also. And I'm not saying this is better than ZooKeeper, I'm saying this is another implementation of it, and I'm not saying no to ZooKeeper, right? But if I just say [?use | asr: "are you"] ZooKeeper, someone will ask how that is implemented. As an engineer, we need to know how it is implemented. For example, no, no, I, I, I agree with you. Yeah, yeah. I'll just give an example, what we talked about around, uh, in [?load balancer | asr: "node balancer"] itself. I'll give you this, what we talk about is Redis Pub/Sub. You can replace it with ZooKeeper, right? ZooKeeper has a distributed store, config store. Something is updated. Everyone else gets notified. Correct. Classic feature of ZooKeeper. How that is implemented here. I've done it with Redis. You replace Redis with ZooKeeper, but internally there has to be a persistent connection on which someone notifies it and it broadcast it to someone else.

[03:01:55] ZooKeeper's notification framework is just real-time Pub/Sub. That's literally what it does. Maintains a pool of TCP connection, connects it. When someone changes it, notifies all of them who are subscribed to it. That's exactly what we do with this. So that's what I said, core properties. I showed you a simple way to implement it. You can replace this entire thing with ZooKeeper and a system would work just fine, because it is giving you those exact same properties that you are [unclear: "extracting by buildings"].

**[03:02:22] Student 3:** Yeah, I was, I was going to ask the same question. I had that feeling. No, I mean, I have one more question, but I think I'll come back again.

**[03:02:34] Teacher:** But basically this is where I always say, right. Focus on the core properties that, you know, what we did, what we wanted was like a persistent connection in a real time. ZooKeeper's notification framework is exactly that. So [?use | asr: "you"] ZooKeeper if you are more comfortable.

**[03:02:46] Student 3:** Yeah, I mean, what I wanted to ask was with respect to like, uh, the understanding implementation and internal details sounds great. When, if you want to choose one, I just wanted to understand your opinion.

**[03:02:59] Teacher (answer):** Okay. So ZooKeeper, a lot of people, a lot of, uh, young organizations, they stay away from ZooKeeper. They think ZooKeeper is [unclear: "Java bomb"]. There are plugins for you to integrate it in other languages, but a lot of people stay away from ZooKeeper thinking, oh my God, it's too much. A lot of people are intimidated by it. For them, this seems much simpler. They're very comfortable with [?Redis | asr: "release"]. They can scrap, they can create a scrappy solution out of it. I see. [check: "I see." may be Student 3] Okay. So it's more about having that inclination towards something. Because as soon as people hear the term ZooKeeper, first thing that comes their mind is Java. A lot of startups are not in Java. They say, okay, God, I have to use Java for this. They start giving up. So that's where focusing on the core properties and attributes of it makes more sense.

[03:03:45] If it's ZooKeeper that gives you that, use it. Redis gives you that, use it. DynamoDB, MySQL and whatnot. And then what matters to you is the core properties. Right. But now when you're making those decisions, if you're comfortable with that stack, adopt. Some people are comfortable with ZooKeeper. Some people are comfortable with Redis. Right.

**[03:04:04] Student?:** Thanks.

### [03:04:05] Can a consumer read multiple messages from a queue

**[03:04:05] Teacher:** Okay. Sunit.

> **Student Question [03:04:08] - Student 1 (Sunit):** This question is about, uh, queues only again. I had like, no, this doubt, uh, can consumer read multiple messages in parallel or it can read only one message?

**[03:04:20] Teacher (answer):** We did. We added a hypothetical concept of reading one message.

**[03:04:24] Student 1:** Okay. In real time, like no consumers can read like multiple messages from

**[03:04:29] Teacher:** Depends on queue guarantee, because if I say yes to this, I can also, I can only create a open source queue that does not give you those guarantees. So it depends on the queues that you are using. SQS has different guarantees. RabbitMQ's different guarantees. Kafka has different guarantees. Right. You're using, see, [unclear: "the kind of parent is it covers"] the reason for asking, right.

**[03:04:49] Student 1:** Each consumer is a [?machine | asr: "mission"], has like no multiple, like no [?cores | asr: "course"]. So that means it can generate like no multiple processes, multiple threads, right? Only one thread like no can read like no message at a time. So multiple threads can read like multiple messages from queue, right, to increase like no processing speed. So I mean, how it happens in the [?real time | asr: "L time"] usually? So that is my question.

**[03:05:11] Teacher:** No, that is queue internal. That's very different from this discussion. That would take us in very different direction. But what I would recommend is wait till week seven. Week seven, we'll implement our own message broker. [unclear: "Tell your learners"] and how we get max [?throughput | asr: "to put out"].

**[03:05:23] Student 1:** Okay. Let me put my question other way, whether queue would allow like no consumer to read like no multiple messages at a time, which queue? Message queue. This message queue. Yes. Yes. That's what I'm asking. [check: "which queue? ... This message queue." may be the teacher asking]

**[03:05:39] Teacher:** This queue is a hypothetical example. As I said, okay. I am not guaranteeing those things that you're talking about. This is a hypothetical, which is what I started with.

**[03:05:49] Student 1:** I mean, if you take any example, let's say SQS, like from AWS, go through the documentation.

**[03:05:55] Teacher:** Now, if they give you those guarantees or not, if you're allowed to, SQS gives you ability to read 10 messages at a time in one call. If you would want to know those details, but you can anyway find this in their documentation. Yeah. Just a Google search away from that.

**[03:06:09] Student?:** All right. Yeah.

### [03:06:15] DNS and active-passive load balancers

> **Student Question [03:06:15] - Student 1:** Is it the right time to ask the LB question now or should I wait?

**[~03:06:20] Teacher?:** Any other question on locking? Anyone?

**[03:06:23] Teacher:** Okay, go on.

> **Student Question [~03:06:24] - Student 1:** Yeah. So first question is, so as we have discussed that, you know, with the DNS, we are deciding that, you know, once this, so let's say we are using three, four load balancers. So once there is more load on the first load balancer, then DNS will start routing to the... So how DNS will not...

**[03:06:43] Teacher (answer):** No, no, no. That's not what I said. That's not what I said. [check: possible ASR duplicate] Wait, wait, wait. That's not what I said. DNS will not route it to other load balancer. DNS just has the mapping of a domain to multiple IP addresses. It just round robins between them. That's it.

**[03:06:57] Student 1:** Okay. So it doesn't have any way that, you know, that this load balancer has a lot of load, then I should, you know, give it the second load balancer.

**[03:07:03] Teacher:** No, that's what I said. It has nothing, no information around it. No information, no information around it.

> **Student Question [03:07:10] - Student 1:** Okay. And let's say there is a scenario that, you know, let's say somewhere, you know, load balancers are used in an active passive manner. So let's say I have one load balancer and the other load, which is active, and the other load balancer, which is in the passive mode. So if, let's say, the first load balancer is going down, in that, in that case, the second one will be active. So how DNS takes that decision that, you know, this load balancer is not working and, you know, I have to start routing the query?

**[03:07:38] Teacher (answer):** It would not be there in the IP address. IP address will only contain active load balancer IP address. But, or otherwise, wait, or otherwise do a weighted round robin, give a weight of zero to that other one and one to other one.

**[~03:07:53] Student 1:** So that means you're trying to say if one load balancer goes down, so in that case, in the active passive mode, I'm asking, in the passive one, then we have to, you know, manually update it in the load balancer. Okay, this one is down. We have to [unclear: "not load answer"] on DNS, or DNS, sorry, on DNS, we have to manually, orchestrator is doing that, right?

**[03:08:12] Teacher:** Orchestrator would know when is going down. Other is coming back. Someone would know, right?

**[03:08:17] Student 1:** But see, DNS has to know the IP address, which one is active right now.

**[03:08:22] Teacher:** So our DNS knows, right? Orchestrator would know IP addresses of all the load balancer servers. It is the one who is adding that. Orchester is the one who is updating the DNS about it.

**[03:08:34] Student 1:** Okay. Okay. Directly update, directly has to know. DNS has no brains. [check: "DNS has no brains." may be the teacher]

**[03:08:40] Teacher:** DNS is a stupid service. It just stores a hash map. That's it.

**[03:08:45] Student 1:** Got it. Got it. Yeah. Okay. Yeah. Thank you. That answers my question.

### [03:08:50] Session handling with multiple servers

> **Student Question [03:08:50] - Student 8:** My question is on session handling. So when there are multiple servers, is session handling, do we need a different session service, or using consistent hashing we can route request of a particular user to the same server every time? Which one is better?

**[03:09:06] Teacher (answer):** You gave the answer. Why would you want to have separate services? Imagine adding a separate service, adding a new network hop. Why? Everything's over here. Load balancing strategy. Consistent hashing is not a service. It's a normal array. It's a normal array of data. That's it. It all runs here in memory of LB server. That's it. Request comes in. It finds way to forward it. It forwards with them. Okay, cool.

[03:09:33] Don't just add services for the sake of it. Every service is a network hop. Right? So at scale, we optimize for, not even exaggerating, every microsecond as well. So I've seen discussions where every single network hop is challenged. Why do you need it? A good architecture that I've seen only had four microservice, but it handled petabytes of data. Just adding random boxes in a design is a bad idea, unless you have a very good justification for that. What's the job of it? Don't add random boxes because it just slows things down, because every network call, three to five to 10 milliseconds of latency is added. Why? Just don't do it. See where you would see the shortest path possible and try to accommodate it there.

**[03:10:21] Student 8:** Okay.

<!-- chunk_17 03:10:25-03:22:43 -->

> **Student Question [03:10:25] - Student 8:** If we are using round robin algorithm, then we will need another session.

**[03:10:31] Teacher (answer):** Why session? We just saw the implementation in the code, right? Go through the recording. We have covered it. It just keeps track of an integer, the index in the array that this is where I sent it. Now this is where I want to send it. Now this is where I want to send it. [check: possible ASR duplicate]

**[03:10:46] Teacher?:** Okay. No other service required.

**[03:10:50] Student 1:** Sure. Thank you. Yeah. Thanks.

> **Student Question [03:10:54] - Student 1:** I wasn't able to understand this load balancer [unclear: "of your computer"]. So will it be okay if I iterate and then ask questions?

**[03:11:01] Teacher:** What you are not able to understand?

**[03:11:03] Student 1:** The load balancer's workflow. The, okay. So let's say this CoreDNS actually has an [?array | asr: "area"] of IP addresses of all the load balancer servers.

**[03:11:16] Teacher:** Right. Against the domain name.

**[03:11:19] Student 1:** Against the domain name. User one comes in, we pick in a round-robin fashion and gives it one IP address. Then user two comes in. We again pick the IP address in round robin manner. So aren't we bottlenecked by that round robin now? Because load balancers were able to solve one problem for us, but load balancers are again in one problem now.

**[03:11:42] Teacher?:** Why is that a problem?

**[03:11:46] Student 1:** I think this is bottleneck because eventually. It might become at one point of time because there was a reason why, why we chose one algorithm over another for load balancer. Let's say I use.

**[03:12:02] Teacher:** Which algorithm? Be specific on that.

**[03:12:04] Student 1:** Okay. So let's say load balancers were running round robin and not a least connections used.

**[03:12:11] Student?:** Okay. Round robin.

**[03:12:13] Student 1:** And for CoreDNS, while when a user comes in and picks IP address of load balancer the server, it said least connections. It uses, why would this pick least connections, least connections and

**[03:12:26] Teacher?:** all is all over here.

**[03:12:28] Teacher:** CoreDNS has no idea about what that is. It just picks one [?IP | asr: "idea"]. [unclear: "I want to appear"] at random and sends it here. That's it. Okay. At random. That's what I said. [?Here | asr: "He heard"], there is no brain. It's a, it's a literal 50 lines of code. Not even exactly. If you open CoreDNS [unclear: "codeways"] 50 lines of code, you will find that does that. Everything else is just mumbo jumbo.

**[03:12:52] Student 1:** And it's nothing. Hmm. Orchestrator communicates with load balancers and backend server. I mean, it checks the health status. Yeah. Why does it even need that? It already has Prometheus. So why does it only use Prometheus to get that? Okay.

**[03:13:07] Teacher:** Prometheus is for vital checking. I'm using Prometheus. Prometheus gives you ability to do health checks, right? But what if you replace it with something, but does not give you health checks as vitals, right. I'm just covering the boxes, right? Because if tomorrow you take it out and then you think that is design is not good enough. So that's why I was very explicit in heartbeats and then vitals pushed to a different service because in most cases, vital ingestion does not do health checks. Prometheus does that, but vitals ingestion does not do health checks in general. Got it.

**[03:13:41] Student 1:** That's fine. And for the communication between database and load balancer servers, we are using Redis as Pub/Sub.

**[03:13:49] Teacher:** Not database and load balancer servers.

**[03:13:52] Student 1:** You are talking about this. Okay. Replicating the database config over here. Yes. Why don't we use normal [?server-sent events | asr: "service and events"]?

**[03:14:03] Teacher:** Wait.

**[03:14:04] Student 1:** Hey.

**[03:14:10] Teacher (answer):** Okay. So in that case, how will your database or any process that is running would have to make multiple calls to these servers to do that? Redis gives you that out of the box, right? Real-time sending to everyone. I just use that as an example. That's what I said. It's just a real-time broadcast that we need. Whoever gives us that, we would use it. We can use [?server-sent events | asr: "server sending"]. So we just leverage what we studied in the last week and put it over here to do reactive communication rather than poll-based communication. We did reactive communication over here. That was the key idea.

[03:14:46] You replace Redis, [?ZooKeeper | asr: "who keep her"], you put explicit HTTP calling. That's what we also discuss in brainstorming. Anything, anything which is reactive works for you. I just use this as one of the options. This is not the only option. Right. I just use it because the guarantee that it provides, I don't have to worry about. Correct.

**[03:15:09] Student 1:** For the heartbeat communication between orchestrator and backend servers, let's say, it will be the exact replica of design online, offline indicator that keep polling and what back end service orchestrator, right?

**[03:15:22] Teacher (answer):** Back end service. Yeah, same thing. That's what it's all building blocks. Right. However, you'd want to drive that. You can drive that. You are repeated, repeatedly making HTTP calls to here to check if they're alive or not and whatnot, and we'll just keep track of it. Same.

**[03:15:38] Student?:** Thanks.

**[03:15:40] Teacher:** Sitesh.

### [03:15:44] Orchestrator as single point of failure - leader election

> **Student Question [03:15:44] - Student 3 (Sitesh):** Yeah. So maybe I missed this, but like in the whole system, are like load balancing being a high availability system, orchestrator is our point of failure now. Right? Like if orchestrator goes down, like it's fine until load balance.

**[03:16:06] Teacher:** No, no, no. It's not fine. Orchestrator went down. How do you solve it? You cannot have orchestrator.

**[03:16:12] Student 3:** Yeah. That's what I was going to ask. I'll just have three orchestrators, maybe like whatever and orchestrate and have same code running, but rest of them idle until one of them.

**[03:16:22] Teacher (answer):** Not idle, but you might have basically leader-follower. One is [?master | asr: "faster"]. Others are follower. Others are doing the grunt work. If master goes down, followers automatically takes its place. One or two seconds downtime.

**[03:16:34] Student?:** Right.

**[03:16:35] Teacher:** That's what the leader election.

**[03:16:37] Student?:** Oh, I see. I missed that.

**[03:16:39] Teacher:** So here there is multiple servers. So high availability. High availability clusters, autoscaling, high availability, [?LBs | asr: "lvc"] has a high availability, database high availability, orchestrator add leader election, high availability, [?CoreDNS | asr: "code units"] leader election, high availability.

**[~03:16:55] Student 3:** Yeah, yeah, rest of them I was fine, orchestrator was, yeah, and this is exactly where [check: "and this is exactly where" may be the Teacher starting the next turn]

**[03:17:02] Teacher:** And just now that given that we are on that point, leader election is a way to get high availability. Either you can have a manual, either you can have a human who is spinning up a server for you to getting up and running. Otherwise, if one is [?down | asr: "done"], you want other to take its place. That's when leader election comes in. It just automates the entire process and that's why it is important. So here if one node goes down, you want other to automatically take its place. That's when leader election comes in.

### [03:17:27] Private CoreDNS, public DNS and API gateway

> **Student Question [03:17:27] - Student 3:** Yeah, makes sense. One question on CoreDNS. I may be messing up conceptually, but I did not understand the part that when you said private, like we want away from, public, like public interface. Right. But what I'm missing is yes, we'll add a private DNS service, but at the end of the day, we are returning our IP addresses are those different IP addresses. Like I didn't catch that.

**[03:17:59] Teacher (answer):** Going a little more details of it. What I would recommend is let's go step by step, explore what CoreDNS is. Try to set up one, try to configure a domain, have bunch of backend servers to that, right. See how we scale it. Production guide on CoreDNS website itself in their official documentation. See how you get high availability on CoreDNS. Right now imagine a situation where you are using it as part of a private infrastructure, right? Then think of exposing it to public and see what happens. So because what we missed on us, because I, I now obviously cannot cover all the layers because there are seven more.

[03:18:33] What I was talking about was that this LB servers is not a first layer of interaction. There are many machines that it has to go to. Right. So to oversimplify the discussion, I said [?CoreDNS | asr: "cold in this"] would directly spit out machine of one of the [?load balancers | asr: "loaders"], which is in fact true. But when it doesn't directly talk to that, there is one more proxy that sits in between and you have to balance between them and whatnot. But when you implement it, when you define what your architecture has to be, what needs to be private, what needs to be public.

[03:19:02] For example, lb.payments.google.com you won't expose to a user. You would expose payments.google.com. Correct? payments to LB.payments what happens because payments.google.com is a publicly available DNS. Correct. From there, where would the request come? What would you configure there on public [?DNS | asr: "desk"]? You configure API gateway's IP address. So from the user, the request comes to your API gateway. Now from API gateway, first TCP connection is formed to API gateway. Now from API gateway, there would be a configuration which says API gateway that if you get this path forward it to this load balancer. So this is where your API gateway, when it is connected to load balancer, it will do forward it to this load balancer.

[03:19:44] So load balancer has a domain name. So when API gateway is establishing the [?TCP connection | asr: "DC progression"] with the load balancer, which is where this private CoreDNS comes into the picture. Correct. Okay. Now you see, now here I'm just adding two layers. One for API gateway for public calling and one load balancer for private. Now you can add three or four more because API gateway is typically not the first point of entry as most people think it is. Right, right.

**[03:20:10] Student 3:** I think you'll at least have two more. More proxies, right? Yes. Okay. Yeah. Yeah. I mean, I think so. Yeah. Yeah. Now I see. Now I see. But just to summarize, basically, like I read details myself, but like basically what we covered in the last class, right? Like we want something that has the least configuration or whatever it is, even though partitioned there and rest of the part is compromised. Rest of the good part is with us. That's the idea.

**[03:20:41] Teacher:** But now here you see like where, where I was talking about this private infra, right? Because you can also configure LB, LB address in your public DNS also in case of AWS, in case of GCP, everywhere you can do that. So in that case, your API gateway is totally bypassed. So you're exposing literally LB.payment.google.com to the internet, which is fine. But in reality, you would expose payments and then LBs are basically privatized. So this is how the hop happens. So whoever is established. So the idea is whoever is establishing the connection with LB servers has to talk to this [?DNS | asr: "audience"].

**[03:21:16] Student?:** Right. Okay. Thanks. Thanks. Yeah.

### [03:21:20] Load balancer vs reverse proxy

> **Student Question [03:21:20] - Student 4:** So, yeah. So I, I like it, it load balancer, right. It looks like a reverse proxy to me, kind of similar to that sort. Right.

**[03:21:35] Teacher (answer):** I mean, what is the load balancers are reverse proxies.

**[03:21:38] Student 4:** Okay. Okay. So there is no like major difference between them.

**[03:21:43] Teacher:** That's because load balancer balances load across homogeneous system, which is exactly what reverse proxy does.

**[03:21:48] Student 4:** Right.

**[03:21:49] Teacher:** And API gateways are powered proxies.

**[03:21:52] Student 4:** Yeah.

**[03:21:55] Student?:** This is what I should always expect. Thanks. Thanks for that. Okay.

**[03:22:00] Teacher:** Harsh, Josh.

### [03:22:02] Where authentication sits

> **Student Question [03:22:02] - Student 11:** Yeah. So I was just wondering that in this architecture, where generally we keep this authentication part.

**[03:22:12] Teacher:** What do you want to authenticate?

**[03:22:13] Student 11:** Or what do you want to authenticate? User authentication.

**[03:22:18] Teacher (answer):** Why would there be user authentication over here? It's part of a business logic, right? User authentication. So it's a backend services responsibility to do it. Correct.

**[03:22:29] Student 11:** So, but we have more than one backend server for request can go to anyone. Right. So imagine you're writing [?auth service | asr: "all service"].

**[03:22:35] Teacher:** Imagine you're writing [?auth service | asr: "off service"].

**[03:22:38] Student 11:** Okay.

**[03:22:39] Teacher:** Isn't that part of the business logic?

<!-- chunk_18 03:22:43-03:36:37 -->

**[03:22:43] Student 11:** Okay.

**[03:22:44] Teacher:** That's what you do. Right. End user is valid or [?let's say | asr: "less of"] your transferring money from A to B. You want to authenticate it is indeed A who is doing the transfer. It's part of a business logic, right? Does your load balancer care about it? No. It's your business logic. You handle it. You send 404, you send 403 to user. Correct. So it's your backend service. Right. So this is load balancer. This, this is load balancer. This is load balancer. Right. This is your business logic. This is what you write as part of a logic where authentication and whatnot is taken care.

**[03:23:21] Teacher:** Okay. Sure. Uh, Rajeev.

### [03:23:28] Prometheus resources, orchestrator follower state

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

### [03:27:46] When to use only a reverse proxy

> **Student Question [~03:27:46] - Student 1 (DK):** Yeah, I just have a fundamental question here. So what are the scenarios where I should use reverse proxy, only reverse proxy, what we call as, and where, and load balancers, yeah, to distribute the load, but why should I use or go for reverse proxy if it is required? I have never used it personally, I have mostly used load balancer.

**[03:28:10] Teacher:** Sorry? Have you used load balancer?

**[03:28:12] Student 1:** Yes, we use load balancer.

**[03:28:14] Teacher:** That's very much proxy.

> **Student Question [03:28:15] - Student 1:** But there are certain things like when we call it, you know, Nginx reverse proxy, there are any specific reasons or how it is different from, you know, your load balancer or what makes it?

**[03:28:25] Teacher?:** Same, same.

**[03:28:26] Teacher (answer):** There is no much difference there. There is no much difference. Okay. Right. Whenever you want to balance the load, there's a load balancer. That's a, a generic term for a load balancer is reverse proxy.

**[03:28:39] Student 1:** Got it. Got it. Yeah.

**[03:28:43] Teacher:** Rahul.

### [03:28:44] Who sends the heartbeat - health check endpoint

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

### [03:32:51] Why autoscaling is separate from the orchestrator

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

## [03:36:02] Closing *(admin)*

**[03:36:02] Teacher:** *(admin)* Great. Any other question? Anyone? When I start concluding there will not be any question. Thanks, thanks for tuning in. Tomorrow will be very fun discussion. By the way, thanks, it's 12 36, but fun discussion, quite detailed. I love it. Keep asking discussion, yeah, it just makes our understanding much more clear. And next, uh, that's all. Tomorrow is all about distributed ID generators again. Intuition, idea, key implementation detail and answering those [?whys | asr: "vives"] is what we'll do tomorrow. Right. See you tomorrow morning. Bye bye.

<!-- BODY END -->
