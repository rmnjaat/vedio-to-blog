**[02:27:23] Teacher:** availability, ever ever the way to do it is adding replicas, right? For every node have a replica. If a node goes down, replica takes its place, but it comes with its cost of maintaining that other node, right? But if availability is important for you, you do that. Otherwise have copy of data on other node. Let's say whatever data is on cache 1, I have one copy of it in cache 3. Whatever data I have on cache 3, I have one copy of it in cache 4. So in case my cache 3 goes down, I know my cache 1's data, sorry, in case my cache 3 goes down, my cache 4 will have data for cache 3. So any request for cache 3 can also be handled by cache 4. So that's the beauty of this ring, that you can have a replication factor of your data and you can say that, hey, this data is replication factor of, let's say, 2, which means the node that owns it stores it and two nodes immediately after that in the ring would have the data.

[02:28:22] So in case a node goes down, you know where to find the data and reconstruct this node if required. That is high availability. So data redundancy is a way to get high availability, either across nodes or across system. Like create a standby server or a replica over here. If this goes down, replica takes its place. That's how you can ensure high availability. Standard practice has to do when it comes to reliability. Even for your cache it is important.

<!-- topic-candidate [02:28:51]: Redis AOF (durability) -->

[02:28:51] So even Redis has this AOF file format, which is Redis's write-ahead log. It's called AOF, append only file. So what it does is, every time you write something to Redis, it makes an entry into that file, and it loads it when your cache rebuilds. Let's say you rebooted it, it loads everything from the AOF file, cache that you have. Standard way to ensure reliability or durability. Actually, durability is the right one.

<!-- topic-candidate [02:29:21]: Recap - making things distributed -->

[02:29:21] This is how you think about consistent hash. This is how you think about making things distributed. So storage, you store it in separate nodes with some routing logic, with some logic to determine ownership, hash based routing, partition, range based routing, two very common ways to do it. You have a hash function and you take care of that. Key passing the hash function, get the ID and connect it there. Then you have which is what your routing layer consists of. Now, when it comes to routing, there are four ways to do routing. It applies to any distributed system in the world. Not everyone will suit everywhere. Pick your battles, which one to suit where. Everything has pros and cons. Identify it.

[02:30:06] But we spoke in depth about the routing side of things. Then around availability, adding replicas and all. Reliability around load scaling, consistent hashing, when you're adding [?more nodes | asr: "monodes"], you mean more, not doing minimal data transfer is important. And this concludes everything about distributed cache. We spend a lot of time talking about single node implementation details and we spoke in depth about making things scalable, right? Okay, any questions on high level part of it before we go on and take questions on other side? First let's talk about [unclear: "highly adubav"].

<!-- topic-candidate [02:30:42]: Q&A - Redis routing -->

> **Student Question [02:30:42] - Student 5:** Yeah, but I had a question on routing. So we, in the Redis's way of routing, which is DNS like, we still have a network hub, but it is, could not decide to use a load balancer. Was it to just simplify the infrastructure to use it?

**[02:30:59] Teacher (answer):** Exactly. Why to have another [unclear: "couple"], let the node itself take care of that. So it's, and it does not do it for every time. It just does it in case of replicas. So if you're firing a write request on replica, it's you the IP address of the master and request you to connect to that.

> **Student Question [02:31:16] - Student 5:** Okay. And for read request, the client is supposed to know which Redis.

**[02:31:21] Teacher (answer):** Both ways are there. So Redis Sentinel solves that problem. So Redis is evolving. Now it has a proxy you can define that has that information, that becomes a face of it and it takes care of routing and whatnot. So there are a lot of changes happening. I'm still yet to basically catch up on that. Let me catch up on that and if I get hold of it, I'll definitely try to answer that. But I know this is how Redis does when you are firing write request on replica, 100%. Around routing in a distributed Sentinel setup that it has, I'm not sure how routing happens today. So I'll not comment on that, but go through the talks on how that routing happens today. A lot of things have changed since the last time I visited.

**[02:32:04] Student 5:** Got it. So my takeaway is that it can be a mix of two or more of these approaches for different ways.

**[02:32:10] Teacher:** Yeah, for each of these. So this is typically how, if you fire write request or read replica, it would spit out IP address of the master node. That is the most common way. Almost all databases adopt this. Almost all databases. Either a database can choose to just discard the request and return an error and say, go find the master node. It's how like the humans behave, right? Same thing. I don't know. Go find on your own. Right. Otherwise someone kind enough to say, oh, this is where you should go. So, in most cases you would see this as an implementation.

**[02:32:44] Student 5:** Got it. Yeah.

**[02:32:46] Teacher:** Thank you. Nitin?

<!-- topic-candidate [02:32:50]: Q&A - consistent hashing: close nodes, hot partitions -->

> **Student Question [02:32:50] - Student 2 (Nitin):** So, I had few questions related to consistent hash. So, is there a possibility where nodes in the ring are placed too close?

**[02:33:00] Teacher (answer):** Yes, then that's a disadvantage of consistent hash because it's not in your control.

> **Student Question [02:33:06] - Student 2:** Okay. And also the possibility where a lot of keys are densely populated, like certain area of the ring is densely populated.

**[02:33:17] Teacher (answer):** Yes, very much possible. Hot partition problem. That is there. Consistent hashing suffers from both. Consistent hashing. Unfortunately, what is happening is, in case of consistent hashing, because it is hash based strategy, you are giving the control to an [unclear: "untim"] hash function: please do it uniformly enough, the best you could. But if your key distribution is bad and your hash function is bad, what would happen is you would not see that uniform distribution. So you would see hotspots, a particular node getting very hot as compared to others. And then you add one more node just to try to mitigate that particular solution, that particular situation. But consistent hashing suffers from all this problem. But then why are companies still using it? Consistent hashing typically makes us scaling up, scaling down simple enough. The range is not short enough, it's long enough, two raised to power 120, [unclear: "it's a jive"] can take the range. What are the odds? So everyone's playing by the odds.

**[02:34:18] Student 2:** Okay, got it.

**[02:34:22] Teacher:** Any other question? No? Okay. You said you had few questions, that's why I was waiting for that. That's right.

**[02:34:30] Student 2:** Okay, I mean most of the questions were, most of the questions were answered by you. I mean, like, to like interpret all of these points. So yeah, thanks.

**[02:34:40] Teacher:** Thanks. Okay. Hemant.

<!-- topic-candidate [02:34:43]: Q&A - virtual nodes -->

> **Student Question [02:34:43] - Student 1 (Hemant):** I would like to just understand a few places. I have read about virtual nodes inside this ring. So what they suggest, I'm not sure how good it is. And that's why my question is, if we divide the ring in virtual parts, I'm dividing it like 10 or 20 or something. And these virtual nodes are on actual physical nodes via grouping. Then is it really a good strategy? Because I do not find a confidence on that.

**[02:35:24] Teacher?:** Why?

**[02:35:27] Student 1:** You said why?

**[02:35:28] Teacher?:** Why, yes.

**[02:35:29] Teacher:** Why are you not confident on the strategy?

**[02:35:32] Student 1:** Why I'm not finding confidence is the logic behind consistent hash to minimize the data transfer or with partitioning. Whatever you use ownership, I said partitioning. Yeah. Same word. [unclear: "List"] if I try to divide in a very small chunks and I see few of the chunks which are not on a consecutive line in the ring, go to different servers. Then if one server goes down, I see a lot of chunks has to move, in place of the current strategy that you have. So it's just only a two kind of a transfer. I can see. Yes. So I do not find that. Is it the right way of taking out?

[02:36:18] Yes.

[02:36:19] Yes.

[02:36:20] Yes.

**[02:36:20] Teacher (answer):** Yes. A thousand times. Yes. My God. You are on fire today. This is exactly what a disadvantage of having virtual nodes is. If you do that, like, imagine, now think operationally. I mean, this goes for everybody. Here, whenever someone's explaining consistent hashing, they talk about virtual nodes. In case of stateful systems like this cache, where nodes itself are storing stateful data. Now what happens is, when we added cache 5 in the system, what did we do? We took the snapshot of cache 1 and put it over here. It made life so simple for us. The data movement that was happening was operational if you think about it. You just have to take a quick snapshot of this cache and load this cache from it. It's a very efficient implementation, right? Nothing fancy then.

[02:37:11] As soon as you add complexities of virtual nodes, what happens is, when you are spinning up this part, you, this node will be placed at multiple places. Now from multiple other places, you have to load data on this server. Operationally that becomes challenging. You might miss out on something, or one of the things, transferring data from one of the other nodes is slow enough. It's slowing down your process. So adding virtual nodes is not a good idea to solve hot partition problem. And it is stateful use case, not a good idea. Companies still do it. There are hacks around it. But if you think about operational, the operational expense that comes in, in order to spin up infrastructure, find out nodes for you to copy the data, you have to copy data from a lot of places instead of just one. They're doing, still doing a lot of network transfer, which you started consistent hashing just to reduce that. But now you're doing that other part. So that's the limitation of using virtual.

[02:38:08] Thank you so much for bringing this up, and this is it, precisely where it falters, right? But again, it's not that it's bad. I'm sorry. It's not that it's worst. It's still bad enough. So long as you are operationally okay to do, to take up this amount of network transfer, it's okay. Right. But if you want to keep things operationally simple, which I prefer a lot, I would just do this. This one node, copy paste here, their server up and running in a, in a brisk, and I'm done, right? So I would like to keep things simple as compared to things operationally complex, because simple systems scale. And this is precisely where virtual nodes is a bad idea, right? Thanks so much for making that. Okay. Any other question, anyone? Yeah, Gaurav.

**[02:38:57] Student 6 (Gaurav):** Not related to today's topic, I have some

**[02:39:01] Teacher:** Let's, let's complete consistent and then I'm more than happy to take care any questions on distributed cache in general that we discussed today throughout. Rajiv, go to malloc, malloc page.
