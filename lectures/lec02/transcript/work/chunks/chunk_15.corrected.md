**[02:54:33] Student 7:** You, you, first is you'll, you'll have to maintain the communication dialogue, right?

**[02:54:37] Teacher:** Correct.

**[02:54:37] Student 7:** What communication I'm doing, right? I need to have that, a message to be ordered at least in that way. So that the, okay.

**[02:54:46] Teacher:** Okay. Let's say the front end is yours. You have built a front end. Correct. So given that, who said that message has to be up and down? Who said? No one, right? Your front end insert the message in the middle. What's the problem? Correct. It's no problem. And you think about message ordering where it is [unclear: "almost up and"] only where it is [?a must | asr: "almost"] you are processing the message one after another, their message ordering is important. Here. Let's say user A sent two messages, message one, message two. Message [unclear: "Page"] two somehow reached user B first and then message one came. First render it one below other. When user refreshes it, you change the order, because the order in which it is stored in the database is the source of truth for you. You order it one below other, user would say something seems wrong over here. You refresh the page, order will get fixed. Case number one. Correct.

[02:55:56] Case number two, when you have your default order of messages by timestamp, when you receive a message, message two is having a larger timestamp than message one. So first, let's say you receive message two, then you receive message one, but the React state that you are maintaining is always ordered by timestamp. So instead of appending it at the end of the array, you insert it in the middle. And when you do that, your state would just flick a bit and you would just see a message just entered in the between. But if that's okay for your user experience, you do that. Okay. Now you tell me what's the problem.

**[02:56:33] Student 7:** Sure. In fact, like I'm telling you from this experience, right? So we are using a Microsoft Teams over here. And at times I've seen that if I, if I do a communication, right? The receiver side, they actually get the in-ordered messages. It takes time and maybe eventually they do reshuffle it and then keep that order. But initially, sometimes you'll not get messages. Sometimes you'll get duplicate messages and sometimes you'll get out of order messages.

**[02:57:04] Teacher:** So now you can very clearly put it in this architecture. If you're getting duplicate messages, which means that they might not be waiting for the persistence to happen. So they might not go this route. They might first be broadcasting it to you and then eventually persisting. Quite possible. Right. What we [?ensured | asr: "enjoyed"] was we first store, once we are [?sure | asr: "short"], then we tell the other user that this is there. Right. First case, either they are doing directly like this by ensuring persistence through asynchronous or synchronous manner. Any case, or they might be having a retry on the [?WebSocket | asr: "web software"] server that they are having. Even if they think that message is not delivered, but it was actually delivered. You might see a glitch over here as well. Right.

[02:57:45] And then when you refresh, and then when you say that after some time it automatically gets ordered, assuming that you refresh the page, the actual source of truth API gets called and it fills it. So you get that. But in case, let's say you don't refresh the page, they might be having a background job that is continuously checking if the message ordering is correct. For example, let's say every one minute you make a call to your back end, actual HTTP back end, to fetch the last 50 messages that you receive, and you just see if all of them are there on the UI or not and reorder if needed. Right? All. [unclear: "10 na?"] Problem solved.

> **Student Question [02:58:21] - Student 7:** Just one question. So you say that for us right now, the order is the time when I'm persisting it, right, in the DB, because that is how I'll tell you what is my source of truth. Exactly. [check: "Exactly." possibly Teacher back-channel - diarization] But let's say even the source of truth depends on what parameter you are deciding, right, to store it in the DB. Like you used a timestamp.

**[02:58:41] Teacher (answer):** No, time stamp is exactly the time at which, no, no, it's for me in the DB. It's always the DB insertion time, whatever it is, whatever is the clock on the DB is the time at which I'm inserting.

**[02:58:53] Student 7:** Yeah. But then that is not the actual, let's say even the message, have a like incorrect time stamp itself.

**[02:59:01] Teacher:** So you are sending time from the client side? Are you sending message from the client side? Are you sending time from the client side?

**[02:59:11] Student 7:** Yes, yes.

**[02:59:12] Teacher:** My first question is why? Why do you want to send timestamps from the client? You should never do that when you're processing the message on the database. Whatever time is there on the database is the source of truth for you. You should never rely on timestamps. I can just change my clock to like 1 January 1970. Right? Never [unclear: "leave that school."]

**[02:59:36] Student 7:** If I say, "Hey, hi, hello." Okay. All three at the same time from the client side and you, they would never happen on the [check: diarization seam - "they would never happen on the" may be the Teacher, continued at 02:59:44]

**[02:59:44] Teacher:** same time on the client side. Right. There would always be some time difference. "Hey, hi, hello." It would take time for you to type, time for you to say, you can never send it at the exact same time. Correct. It's not possible.

**[03:00:02] Student 7:** Right. But let's say due to the network latency, you still happen to receive the third message first. Right? That's perfectly fine.

**[03:00:11] Teacher:** So then that's a source of truth. Whatever I received, whatever I received at my database, that's a source of truth for me. If you would want to make it overly complicated, use CRDT to merge to conflict resolution. Use vector clocks on the client side. Why? Why would you want to do that? I'll give you a solution to that. Use vector clock on the client side. Have your, have each [?client | asr: "plan"] have its own vector clock, which can persist in the database. Is this worth it? No. Having the complexity of maintaining vector clock, doing the merge conflicts when you read it slows down your entire system. Why? No one does that. Keep things simple. One edge case, clearly you do not re-architect your entire [unclear: "sub"], you do not add all sorts of random fancy stuff, vector clocks and all. You don't do that.

[03:01:03] Designing very realistic system, very realistic. Theoretically I can find 100 [?loopholes | asr: "root holes"] in this, but practically there are none, [unclear: "none as it"] there are few, but it's okay to live with that, right? What are the chances that that could happen, right? Think on realistic terms. Do you really need that? If yes, then implement it. I'll give you answer: look for vector clocks, that's the answer to the problem, and see the implementation, how complicated your architecture will become or your implementation would become. Good, immediately give up on that. But vector clock is the answer in case you're looking for that. Then that's a globally [?consistent | asr: "accounted"] vector clock per client. Massive problem. No one does that. Right. Interested, look out for vector clock, a globally consistent vector clock implementation. You'll see where the problem starts to begin. Rajiv.

<!-- topic-candidate [03:02:02]: Q&A - DB node failure, replication and lost writes -->

> **Student Question [03:02:02] - Student 5 (Rajiv):** I was thinking from DB front now, just give a thought that it's a master-slave architecture replication. Because we went through.

**[03:02:09] Teacher (answer):** Where is replication? There's just sharded. You can have replicas if you want, but typical sharded would work. Replication, I don't see a need there anyway.

**[03:02:17] Student 5:** I was thinking from, from point where if let's say a DB node goes down, I mean, a single node is there, if it goes down, and in the process where the write was being written over there, it went down to some reason. With, since we told that the message persistence is of importance over here, a message got lost. It didn't write to the DB that some bad thing happened. How do we recover from that?

**[03:02:40] Teacher (answer):** No. So you would always have standby nodes. You would have replication factor three-way persistent. See, depending on the critical. So you would not just have one node. If your data is so important, you would have replication factor. You would have inter-replicated databases. For example, when you're writing, you're writing a three different databases, three different data nodes. If one node goes down, other nodes can serve the data, which what DynamoDB does internally. Right? You make a database that gives you those guarantees. No, no. No, no. You cannot read from Kafka. You would already processed the messages.

**[03:03:09] Student 5:** The workers actually read it and you call commit over there. Kafka is done there. Then the workers pushed two, three different instances of 30 different DB instances across different regions internally.

**[03:03:19] Teacher:** Your worker is not doing that, database is doing database. No, database storage engine is doing that. You, your workers would not push it two, three databases, that's worse. Your storage engine does that. Your database is replicated database. Your database is a distributed database. So this database internally has a bunch of storage nodes that we are talking about. And this writes, your write comes to one data node. It replicates it to two different. So if one node goes down, other node can serve the data.

**[03:03:45] Student 5:** No, I was saying that by the time it was serving the write request, it then get published to different, different replicate replications, right? [?Replicated nodes | asr: "depicted notes"]. It just got lost.

**[03:03:56] Teacher:** Then you would never commit. Then you would never say that you accepted the write. You would always say, when you wrote it to three different places, then you do it.

**[03:04:03] Student 5:** To whom? To the worker, right? To the worker. Yeah, to the worker.

**[03:04:06] Teacher:** Yeah.

**[03:04:07] Student 5:** And then if, let's say worker doesn't hold the, okay, so worker actually holds the state, holds the message until unless the DB commits it. Correct. Correct. [check: "Correct. Correct." possibly Teacher back-channel - diarization] And then retry it after that.

**[03:04:16] Teacher:** Your DB would never say that I am done unless it is written in three different places. And I'm talking going very deep into distributed database implementation. Right? Yeah.

**[03:04:25] Student 5:** And eventually if worker goes down and it doesn't, hasn't, hasn't done a... So you'd reprocess it. All is hold it over. Everything is held over there. A worker has held the state and the DB has committed. Okay.

**[03:04:37] Student 16:** Yes.

**[03:04:38] Student 5:** Okay. Okay.

**[03:04:39] Teacher:** So, which is exactly what distributed databases do, like DynamoDB exactly does that. When you write to a DynamoDB, internally it gets written to three different storage nodes. And once it has completed writing to three different nodes, then only it says my write is complete. Until then it does not say [?write | asr: "right"]. It's complicated.

<!-- topic-candidate [03:04:54]: Q&A - sharing a database between workers and API servers -->

> **Student Question [03:04:54] - Student 5:** Okay. Three is the, is the right figure. And one more thing, we had shared the database between the workers and the API servers. So sharing a database has its own sort of, I mean, we are [?writing | asr: "adding"] from one flow, reading from one flow.

**[03:05:10] Teacher (answer):** Is it like, I mean, how to do that, right? Why would make a call to API and then API writes a server? Unnecessary complication. Imagine making a network call over here to write it over here. No, sharing a database is fine. Perfectly fine.

**[03:05:25] Student 5:** I mean, sharing a database, having their own database. I mean, we would like to understand more.

**[03:05:31] Teacher:** I have a video on it. I have a video on it. Microservices playlist. I have a video on it. [check: possible ASR duplicate - "I have a video on it." x3 within 3 s] Exactly this topic. What's that? And it's perfectly fine. It's perfectly fine to share a database. I like, I hate that anti-pattern where every microservice needs to have a separate database. No, I want performance from my system. I want cost efficiency of my system. Right? Do it for me. Business and product comes first, engineering is all okay, right? Because business there, then our jobs are there, otherwise we are all laid off, right? So I would do whatever it takes to keep the cost down and get the max performance out of my system. Sharing a database, fine with me, perfectly fine, I have no problem in that. But in case you want to dive deeper, the microservices playlist that I have on my YouTube, I've talked about the sharing database as a pattern, advantages, disadvantages, separate databases, why to do it. 17, 18 videos are there in that series. Two of them are basically around this topic, right. You'll find it. Okay. Thank you.

<!-- topic-candidate [03:06:29]: Q&A - end-to-end encryption and public keys -->

> **Student Question [03:06:29] - Student 5:** Yeah. Hi, so taking an example of WhatsApp. So in that, chats are end-to-end encrypted. So whenever a user is created or added to a channel or, or a group, so it needs... So our WebSocket need to push the public key for all the other persons which are present in that group. So it needs to get these public key from the database. So how are we? So in this case, we have to access the database.

**[03:07:05] Teacher (answer):** I don't have any experience around public key encryption. I don't know Signal protocol well, so I cannot [?comment | asr: "commit"] on it. I have no idea how that works, what keys it needs to decrypt it, how it gets old messages. I have no idea, no idea, because end-to-end encryption, I know protocol of it. I know Signal protocol a bit. WhatsApp uses a variant of it, 100%, but I don't know what all information it needs, how it processes that, no idea about it. So not in a position to comment on it at all. Whatever I say would be 100%. Okay.

**[03:07:39] Student 14:** Thanks. Thanks.

**[03:07:41] Teacher:** Sampat. [check: name]
