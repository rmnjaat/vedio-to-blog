**[02:41:34] Student 1:** Yeah. So I was thinking of another way of designing it. So we can have one service which tells the server that you have to send this message to this client.

**[02:41:43] Teacher (answer):** That's all right. We can have every time you're making call to that service to tell which server to send it far too expensive. Then that's not real time because then that service is [unclear: "oververted"].

**[02:41:54] Student 1:** [check: diarization seam] do that, that's not at all real time. Okay, so I was thinking like it can, like it can [?cache | asr: "catch"] the

**[02:42:01] Teacher:** [check: diarization seam] users data which is still slow, still slow, making a network call every time to get it where to send it, very slow, never. See, it depends. Like you can build it that way, you can also make a call to DB and get it and build it. It's about how real time you want this to be, and making a call to a service just to get that information every time. I wouldn't build it when I'm building a real time communication. I would just want to do a build a very simple system. Just adding a service for the sake of it, just to tell you where to forward it to is an over. I can very well store this information over here. Right. Not just part of a service.

> **Student Question [02:42:40] - Student 1:** Okay. And another question was that in this system, we are guaranteeing that if, if user sends a message, we will persist it. But the notification to all the users is not guaranteed right now. Right. It might happen that the message gets lost in the Redis. Like when Redis is transferring it to the server, but when the user refreshes it, he will get it.

**[02:43:00] Student?:** Correct.

**[02:43:01] Student 1:** Yeah. So the notification part is not guaranteed there, but the persistence is guaranteed.

**[02:43:06] Teacher (answer):** Persistence is guaranteed. Yeah. Enterprise application, persistence guaranteed. More important. Right. Yeah. Thanks. Vikram.

> **Student Question [02:43:14] - Student 3 (Vikram):** Yes. So I didn't, so I had some confusion in the, that the, that the WebSocket servers are subscribing for a channel to the Redis Pub/Sub, right? So what, what if there are, means lots of users and lots of different organizations. So how do we keep track of which channels and just subscribe?

**[02:43:33] Teacher (answer):** That's exactly the, I said, this is not just one Redis instance. These are multiple Redis, a cluster of Redis, right? And what this [?balancer | asr: "balance"] service would try to keep it all users to be connected on one edge, users of an organization connected to one server, so that you do this minimal transfer on this Redis. That's the job of this balancer, right? Because you can very easily do this, right? When a user comes up and says, "Hey, I'm part of this organization. Where should I connect?" [?the balancer | asr: "to balance or"] always sends IP address of this one edge server only. Yeah. And everyone of that one organization connects to that one edge server. You minimize the IO happening on this [?Redis | asr: "studies"], but in any case, this can be clustered. Okay. So this is for only worst

**[02:44:11] Student 3:** [check: diarization seam] case, worst case scenario. Yeah, yeah. And another question is, I didn't understand the public, that, that someone said that edge servers are public, this public IP part. Can you please

**[02:44:26] Teacher:** [check: diarization seam] explain if edge server is public what would happen, means anyone can people that can attack, right? How do you prevent it? You put it behind a load balancer. But if you put it behind a load balancer, so you're adding one more hop. So five, five milliseconds of extended latency. If you want that, you put it behind the load balancer. If that latency is not okay for you, you, you basically keep it public. Both are fine. Yeah.

**[02:44:51] Student 3:** But we are keeping the servers open, assigning public address

**[02:44:57] Teacher:** because we are making it public. Yeah. And that's fine because there is no sensitive information here. Right. There is no sensitivity because all it is there is just one route for this balancer service which just spits out IP addresses, a bunch of TCP connections connected to it, and one connection string for Kafka that also does not hold any secret. It just pushes the message. Nothing fancy over here. So you can keep it either way. You can keep it public on the internet with minimal critical things over here, or put it behind a load balancer, take the three or five millisecond extra latency or extra hop, and do it either way is fine. Yeah. Okay.

> **Student Question [02:45:44] - Student 3:** Yeah. From what it seems like, can we conclude that Redis Pub/Sub and Kafka kind of same?

**[02:45:51] Teacher (answer):** No. Persistence, real time Pub/Sub, Kafka gives you.

**[02:45:57] Student 3:** So, so the, and Kafka is asynchronous. That's it. Right.

**[02:46:03] Teacher:** I don't know what to be as synchronous. People pull, Kafka is a pull-based thing. People, consumers pull message from Kafka. Redis Pub/Sub pushes message. It's very different. Redis pushes the message to everyone connected. Kafka gives a persistence of historical messages. Redis gives you zero persistence on Pub/Sub. Big changes. Right. Okay. So it's, it's superior to Kafka? No, nothing is superior. Nothing is inferior. Kafka is good in its own space. Is good in its own space. Because superior [?Redis | asr: "read"] in case of what? Right. In case of real time, yes, Redis is superior. In case of persistence, yes, Kafka is superior. There is no one answer for all the questions. Right. Very contextual.

> **Student Question [02:46:48] - Student 3:** And for the second communication approach that we discussed on, when a user sends message to a server, which goes through Kafka and then to [?DBs | asr: "DDs"], it so happened that the messaging service workers pick up the message from Kafka, or let's say topic, a day after it was actually sent. So I can actually receive the message a day after it was actually sent. It can happen in the worst case.

**[02:47:14] Teacher (answer):** No, no, no. But you, in this approach, you get a message, you process in Kafka and immediately send a notification to the user. So user would see it, but when refreshes the page, user would not see that message because real-time thing is gone, in persistent storage is no message yet. So if this does delay in processing, the source of truth does not have the data yet. So when user refreshes the page, he or she would not see the message.

**[02:47:40] Student 3:** Yeah. So yeah, it can so happen that the actual message gets delivered a day after it was actually sent.

**[02:47:47] Teacher:** Not delivered, stored. Delivered to immediately. Stored. Is there, right? Okay. Thanks. Hey, Matt. [check: name]

**[02:47:56] Student 4:** Yes.

> **Student Question [02:47:58] - Student 6:** Hi, Arpit. to understand how it will be different for like a streaming system. It looks like something similar to this. Are we going to cover what is streaming?

**[02:48:09] Teacher:** What is streaming system?

**[02:48:10] Student 6:** Any streaming, let's say like Hotstar streaming.

**[02:48:14] Teacher (answer):** No, no, no, no, no, no. We'll not discuss that. We'll not. That is very different. Hotstar live streaming is very different. We'll touch upon few bits and pieces of it in week seven, but not this part. This is just real time text communication. So scope is very well defined over here. And live streaming very different. Just go through a [unclear: "randomized"] documentation. You'll see how to do that. [unclear: "A come my"] documentation is very good, but we'll touch upon that in seventh week. Any six or seventh week. Thank you. Harsh.

> **Student Question [02:48:40] - Student 9 (Harsh):** Yeah. Hi. So, in today's example, what would be the best way to do this?

**[02:48:47] Teacher (answer):** There is no best way. I given all possible cases. Now you think on your guarantees, what you'd pick. There is no one way to build it.

**[02:48:58] Student 9:** Okay. So we can do either based on users or. Correct.

**[02:49:04] Teacher:** So you do it the type of guarantees you would want to ensure. Right? The kind of guarantees you are providing to your customers. You build your system accordingly, which is why I kept it very open-ended. I gave you three types of messaging thing. I gave you three, I gave you three types of persistence, different types of communication, different types of privacy thing. I have laid an entire buffet. It's for you to create your own plate, whatever works for you.

> **Student Question [02:49:28] - Student 9:** Okay. And one more question. So recently I was working on that multi-level marketing where this complete hierarchy is stored. So by the time it is really becoming difficult to do in relational database. So today I think it would be better to use the graph. They will be there. Right.

**[02:49:46] Teacher (answer):** If it's becoming painful, and because there you might need to store that entire tree and find a third level depth or fifth level depth or 10th level depth. Right. In that case, graph database might make much more sense than relational, because then joins and queries and self joins become a pain when you are driving it like this. 10 level [?deep | asr: "D"], nine self joins on a database is messy. Like you typically don't want to do that.

**[02:50:09] Student 9:** Okay. I got it. Thank you.

**[02:50:11] Teacher:** Yeah. Devasheesh.

> **Student Question [02:50:15] - Student 6:** Yeah. Hi. My question was on message deletion and on what flow it would follow. Like I'm thinking like, because message deletion has to be sort of, sort of synchronous with, with both the flows. Like a user can't be receiving a deletion notification, then refreshing later, and that messaging up to you.

**[02:50:38] Teacher:** Do you really get deletion notification? No.

**[02:50:41] Student 6:** So like on WhatsApp, like when somebody deletes a message, it gets deleted immediately, right? So if we depend on workers, you said that there could be a delay like this. [check: diarization seam] Yeah, correct, correct.

**[02:50:53] Teacher:** So does not store anything. WhatsApp does not store anything, FYI.

**[02:50:58] Student 6:** Okay, it happens like this. Done. Yes. Like, so, so even Slack, like if you delete a message on Slack, right, like it, like this, it needs to go for, yeah, okay. [check: diarization seam] Persistence more important in case of

**[02:51:13] Teacher (answer):** Slack. Right. See, that's the beauty of this. I can extend any solution, any question that you ask, I can extend it over here. Very simply. Right. Depending on the, and now here you can very clearly see the beauty of this. Depending on the guarantees, you just alter your approach. Right. Either this in case of the actual WhatsApp that we use. Right. Otherwise you can just add a message that I delete this message permanently and then just delete it from the user's local storage. Right. So it's deleted from here and here. Right. Otherwise, if you're talking about Slack, you go over here, delete and tell the user that it's deleted. And in case you'd want to real-time communicate to your user, you delete, you send, you notify the user that now it's deleted. Either, you just have to roam around in this area. That's the beauty.

> **Student Question [02:52:02] - Student 6:** Yeah. So like, so if this is so easily extensible, why did WhatsApp take so much time to add that feature?

**[02:52:10] Teacher (answer):** for me to say harder for them to implement now. See, [unclear: "giving gya ni giri"]. So which is what I said, although I covered three, it took me three and a half months to build a real-time text-based chat system. Right? I went this entire, or did this entire analysis, and then it took me three and a half months, three engineer team to build it. It takes time. Right? And plus doing it in WhatsApp scale is humongous. It's humongous. Right? It's not as easy. There is a lot of hierarchy stuff. Do we really need this? How to do it the best way? Staggered rollout and all. So it took them time to do it.

[02:52:50] But were they even planning to support deletion? When a product manager got it and said, "Hey, let's say we allow users to delete message." From that time till it is implemented, there will be quite a few things that would happen. So that's why. But if you know your requirements clearly, easy. If you know that you now have to support deletion of messages, it might just be like 100-200 lines of code change if they went with this architecture. Not much. But then do they really want to do it? Is this the best way? Do they really want to show it this way? All those other stuff comes in. So in most cases, if they were having this architecture, their code changes would have been, like the backend code changes would have been hardly 200 300 lines, not more than that, if they were with this architecture. Nothing. When deletion happens, one event sent, they would have already established this. One event stored over here, one notification stored over, sent over here, that's it. But to reach to that, is this the best way, staggered rollouts and all, that takes. Right. Thanks. Yeah. But again, highly recommend you to implement this. Like just work with WebSockets and try to do that, mimic that message deleted, see it in UI. Like you'll have fun.

> **Student Question [02:54:08] - Student 7:** Yeah, yeah. Abhishek, I think we talked about delivering the messages, but how, like how can we think about ordering these messages and this exactly-once semantics? [check: diarization seam] Yeah, who said exactly-once

**[02:54:24] Teacher (answer):** semantics is there? Why are we adding that exactly-once semantics? Like in the enterprise, you said, right?
