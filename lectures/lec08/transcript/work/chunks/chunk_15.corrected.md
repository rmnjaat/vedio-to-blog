<!-- topic-candidate [02:44:59]: Q&A - synchronizing over the nearest shared storage -->

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

<!-- topic-candidate [02:47:41]: Q&A - lock TTL as a bottleneck, mutex vs network lock -->

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

<!-- topic-candidate [02:49:38]: Q&A - single server: mutex / synchronized -->

> **Student Question [02:49:38] - Student 4:** Hey, hi. So, I had question like, if this is not remote and it is having on one single server. So we have to use mutex or disk based synchronized?

**[~02:49:52] Teacher (answer):** You can use normal synchronized. [unclear: "May if you rapid use mutex"], then it just becomes a local critical section. You can just use normal mutex, the same upper synchronized atomic instructions and whatnot to wrap it around. You don't need [?Redis | asr: "ready"] for that.

**[02:50:08] Student?:** Thank you.

<!-- topic-candidate [02:50:12]: Q&A - Redlock edge case when lock-holding instances go down -->

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

<!-- topic-candidate [02:57:34]: Digression - writing my own malloc -->

[~02:57:34] Similarly, just to digress from the discussion, since yesterday evening I am obsessed by writing my own malloc. I am obsessed. I am obsessed. [check: possible ASR duplicate] I am [?diving | asr: "driving"] deep into how memory management happens at operating system level. How program gets memory? Where exactly is this heap? We say, this is allocated in heap. Where, Baba, where is this heap? It has to be somewhere in RAM. But where? How? How it is linked? I am planning to write my own malloc today.

**[02:58:04] Student 2:** You have to do your own inodes and all those things.

**[02:58:06] Teacher:** No, no. Inodes is file system. Inodes is file system. Malloc is in memory allocation. Allocation.
