**[02:58:14] Teacher:** Implementation, the devil lies in the details. If you don't implement, I would have never been able to answer your question if I would not have implemented it. Correct? That's the difference. Last 10 years, I have 180 projects, 80 repos on GitHub. A lot of them are private. 180 repos on GitHub. [check: possible ASR duplicate of "80 repos on GitHub" (80 vs 180)] Think how many things I've implemented.

> **Student Question [02:58:41] - Student 2:** What pushed you basically? You mean what, I mean, when I just tried to implement something, uh, that's your complexity.

**[02:58:47] Teacher (answer):** I'm in love with engineering. I find the scrappiest way to build. I don't, I don't think of time. I just study. I can study 24 hours a day. Even morning before the lecture, I was reading, uh, I was reading, uh, official documentation of the system calls that allocates memories in RAM. And I read it till 8 45 and then I started this meeting. Even if I have 50 minutes, I'll read something. I just love it. I just love coding it out. That's, see, I'm very intrinsically motivated to do this, to know these details. It just gives me those kick that I always wanted. Netflix, Netflix I don't watch most. I just do this. I love this. But I get some, I lose some. I don't know what people talk about when they talk about Breaking Bad and those kind of stuff, but when I talk about this, they don't know about this stuff. So you win some, you will, but it's fine. So long as I have the smile on my face, I don't care. It's simple.

**[02:59:45] Student?:** Thank you.

<!-- topic-candidate [02:59:48]: Q&A - ZooKeeper vs Redis-based locking -->

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

<!-- topic-candidate [03:04:05]: Q&A - can a consumer read multiple messages from a queue -->

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

<!-- topic-candidate [03:06:15]: Q&A - DNS and multiple / active-passive load balancers -->

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

<!-- topic-candidate [03:08:50]: Q&A - session handling with multiple servers -->

> **Student Question [03:08:50] - Student 8:** My question is on session handling. So when there are multiple servers, is session handling, do we need a different session service, or using consistent hashing we can route request of a particular user to the same server every time? Which one is better?

**[03:09:06] Teacher (answer):** You gave the answer. Why would you want to have separate services? Imagine adding a separate service, adding a new network hop. Why? Everything's over here. Load balancing strategy. Consistent hashing is not a service. It's a normal array. It's a normal array of data. That's it. It all runs here in memory of LB server. That's it. Request comes in. It finds way to forward it. It forwards with them. Okay, cool.

[03:09:33] Don't just add services for the sake of it. Every service is a network hop. Right? So at scale, we optimize for, not even exaggerating, every microsecond as well. So I've seen discussions where every single network hop is challenged. Why do you need it? A good architecture that I've seen only had four microservice, but it handled petabytes of data. Just adding random boxes in a design is a bad idea, unless you have a very good justification for that. What's the job of it? Don't add random boxes because it just slows things down, because every network call, three to five to 10 milliseconds of latency is added. Why? Just don't do it. See where you would see the shortest path possible and try to accommodate it there.

**[03:10:21] Student 8:** Okay.
