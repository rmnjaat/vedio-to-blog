**[02:32:14] Teacher:** A single node of X and you just make it distributed. This is the idea of distributed system. Every single piece in your architecture needs to be horizontally scalable like this. It has to be distributed like this. Okay.

<!-- topic-candidate [02:32:29]: Further reading - Chubby, Redlock critique -->

[02:32:29] A few things that I want you all of you to read. Chubby, read this paper. This is what Google still uses in production. Day in and day out [unclear: "errors are"] Chubby props up. Chubby is one of the most fun service or fun systems out there. Amazing paper by Google, Lock Service for Loosely Coupled Distributed Systems. This was one of the first papers I ever read as it was part of an assignment. And that's how I got to look at this. Something called as research papers. Actually, this was the first paper I read. So Chubby was the first paper I ever read. It's very influential. It's very interesting. Read that.

[02:33:03] Apart from that, I have tons of [?blogs | asr: "blocks"] on distributed systems, tons of things on my YouTube channel and whatnot. Read it. Redlock, what we discussed, there is an edge case where it would not work. Martin Kleppmann has a blog written on it that why you should not use Redlock. He talked about an edge case. Again, very rare to occur, but he has this knack of finding those things out. So he put it out where you should not use Redlock. There is an edge case in case you are interested, read it. I would recommend read it anyway.

[02:33:37] And I have three or four videos on my channel on distributed transactions. What we talk about locking that would help us implement distributed transactions, distributed transactions practically. I have shown how to do distributed transactions, right? Three videos are there, watch them. It's a, you would be able to understand it more than other folks who are watching, like who have not taken this course, because, you know, airline check-in system, I use a lot of those stuff but not go went into those details because it's obviously exclusive to this course. So I did not touch up on those details, I just skimmed through it like it is. You would be able to understand it much better. So spend this time understanding this part, distributed transaction and its implementation on my YouTube channel. I've done more of this stuff around.

[02:34:23] But this is what I wanted to cover. There has to be a lot of questions. If there are not, then you need folks to think about it. Right. And absorb this part. Distributed systems are amazing. Right. Think of making it distributed in order to not just horizontally scale the system, reliability. These two factors as well. Here we distributed this part not to handle scale. Did we? No. It is reducing the scale. It is reducing the throughput. But what we are gaining out of this, we are getting fault tolerance. We are increasing the availability. We are increasing the availability of our service. So you pick your pattern. You are either scaling it horizontally to handle scale or you are making it distributed. That's why I use different phrases. You are making to get fault tolerance and reliability and availability on that point. Right? Okay.

<!-- topic-candidate [02:35:16]: Wrap-up and next class (distributed ID generators) (admin) -->

[02:35:16] But this is what I wanted to cover. Folks who want to drop off, feel free to drop off. Tomorrow, we'll be talking about distributed ID generators. It will be right at two and a half hour discussion, but we'll go into, again, the intuition of distributed ID generators, why we need it, how systems have been able to scale it to real-world examples, again, implementing everything that we studied. Right? We'll focus on that, go into those nitty-gritties of those systems. Right? Okay. [?Chalo | asr: "Challah"]. For tuning in, I'll take questions until there are and then I'll see you folks tomorrow.

<!-- topic-candidate [02:35:49]: Q&A - remote locks -->

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
