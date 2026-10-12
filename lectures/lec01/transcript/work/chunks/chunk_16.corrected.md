> **Student Question [03:05:22] - Student 1:** Yeah. We check. So how do you test those [?SSE | asr: "SSC"] type of connections?

**[03:05:30] Teacher:** As in how do I test?

**[03:05:31] Student 1:** Is it like, how, how can, how, how do we like ensure that like any, any sort of a unit testing or.

**[03:05:39] Teacher (answer):** I've never write. I've never written tests on servers that I just deployed in production. I wanted to write the deployment logs that I gave as an example. I just built it. I never tested. I never wrote unit test for connections per se. Never. I just said, but I do, I have tested what needs to be done when you receive a certain type of message, never tested the connection, but I've tested what I received on the connection. Right. So you can rely on that anyway, because that would be functional anyway. Okay. So I did test the business logic on what to do when I receive a certain type of message on SSE and not the actual connection connection.

> **Student Question [03:06:22] - Student 1:** Yeah. And one more follow up question. So like what if you have to design a read heavy API, right? And, and, and, and basically relies on a data, which is sitting on a database. So even though we have a database, which is replicated across data centers, so you'll one master and then you have some replica sitting on cross data center street, but then you cannot cache entire data into the cache because it's like a bit of data. So how, how can you design that read heavy APIs? Because you cannot cache everything, you cannot, if you cannot cache everything, how, how would you do that?

**[~03:06:55] Teacher (answer):** Like, you need to have replicas. The only way to do is with replicas, have redundant copies of data and some reads from there. There is no other way.

**[03:07:07] Student 1:** Right. Okay. So like, for example, you, you increase the API servers, right. And on the back, you'll have to continuously increase the replica.

**[03:07:15] Teacher:** Add replicas. Yes. Yes. Otherwise one database would handle like, like one database has a limitation on the number of requests that it can handle. There is no way.

**[03:07:25] Student 8:** We have some limited connections.

> **Student Question [03:07:30] - Student 1:** But are we going to cover those caching strategies?

**[03:07:33] Teacher (answer):** Yeah, yeah, yeah. To some extent. Yes. Well, see, now it's just first week, right? It's just first week. There's seven more to go. We have far too many systems to cover. We have far too many practices to look at. We have far too many patterns to observe. Okay. A lot of things will be. Pankaj.

> **Student Question [03:07:52] - Student 10:** Just a quick, quick confirmation, in this server-sent events, the connection is is still bi-directional, just the client is not using it, right?

**[03:08:00] Teacher (answer):** No. The connection itself is, the protocol specification does not allow client to send something. Okay. Okay. Yeah. Right. So that's how protocols are implemented. That's what the specifications are implemented. So they don't allow client to send something. They don't give a way for client to send something to the server.

**[03:08:23] Student 10:** Okay. Yeah. So basically the TCP connection, which is established, it will allow bi-directional communication, but the protocol with written on top of it is not allowed.

**[03:08:35] Student 16?:** Okay. Thanks. Yeah. Anuqa. [check: "Yeah. Anuqa." may be the Teacher calling the next student]

> **Student Question [03:08:40] - Student 3:** Here, another question on WebSockets and server-sent events. So if we have a proxy or a load balancer in our system before the server, then the TCP connection that the client has will be with the proxy and the load balancer. Yes. They have the responsibility of propagating that to the server.

**[03:09:01] Student 14:** Yes.

**[03:09:02] Student 3:** Understood. Thank you.

**[03:09:05] Teacher:** Yeah, Ranjit.

> **Student Question [03:09:07] - Student 8:** Arpit, just one question on the replica set that you mentioned. So when the API servers are being added to address scale, the logic, and I noted that you mentioned that the logic would be at the business side, the business logic side of the API server, right? Replicas that should it go to. Correct. I also noted you mentioned read replicas, right? So is it a cardinal rule, as in a read replica, or replica could be a read, right?

**[03:09:34] Teacher (answer):** If you are having a read replica, then it is a multi-master. Okay. Okay. Multi-master comes with its own set of challenges. So when I say read replica, it is just there to solve the read.

**[03:09:43] Student 8:** Because, because let's say your system, I mean, your scale is such, which is increasing and you've got one master and you've got read replicas, and then you realize that you're scaling on at the API server level, but you know, really the master is taking all the writes.

**[03:09:58] Student 1:** You will have to distribute them, isn't it?

**[03:10:01] Teacher (answer):** Yeah. So replica, if you are having multi-master, then you have to handle conflicts. And that is extremely use case specific, how you handle conflicts in a multi-master setup. So that is where sharding is preferred. Right. So read replicas, sharding, and then you go into multi-master if you want to make things overtly complicated.

**[03:10:20] Teacher?:** Understood. Understood. Okay.

**[03:10:22] Teacher:** Yeah. Chira.

**[03:10:25] Student 2:** Yeah. Hi, Arpit. So just wanted to add to Anupal's question, right? So he asked that if there's a proxy or load balancer in between, then client will connect to the proxy and then proxy will connect with the server. Right?

**[03:10:41] Student 14:** Yes.

**[03:10:42] Student 2:** So I think it depends, right? That if it is a layer four or layer seven proxy, because if it is a layer four proxy, then the client will directly connect with the server. So it will be kind of a two connection, but there would be a single tunnel.

**[03:11:04] Teacher:** It does not matter. At the end, the data will go through them.

**[03:11:09] Student 2:** Correct? Yeah. Yeah.

[03:11:11] Yeah. That's true. It's just that if we have a kind of layer seven load balancer, then it can make intelligent decision. Right.

**[03:11:21] Teacher:** But if you are only, if you're only forwarding, if you're rather, if you're only routing the messages here and there, it really does not matter. And if it's layer four or layer seven, and in most cases like this, that's exactly what we do. We just relay the messages back and forth.

**[03:11:36] Student 4:** Yeah. Makes sense.

**[03:11:38] Student 3:** Thank you. So, I just wanted to add to the server-sent events for [?WebSockets | asr: "web software"]. So we actually use it for like on-prem stuff that we have. So there are no inbound connections that are allowed, but only outbound connection from the client side is like a setup via [?WebSocket | asr: "web software"] and then server side communication happens to that.

**[03:12:08] Teacher:** Oh, nice. And what do you stream? Like what, what kind of data do you stream on that?

**[03:12:14] Student 3:** So like, for like, it's not specifically for streaming, like, use cases. Like, so there are on-prem virtual machines are there, like VMware or something. So if you want to perform automations on that, on top of that, so there is no inbound connection allowed. So from there is polling, which, which will send, you know, a request from on-prem to our servers and then we will get it. So only outbound connection is open.

**[03:12:46] Teacher:** Nice. Got that.

**[03:12:48] Student 3:** From on-premise.

**[03:12:50] Teacher:** Happy to see server-sent events in production. Very few companies do that. Everyone just says, let's just use WebSockets, just in case we might have to do bidirectional communication.

> **Student Question [03:13:04] - Student 3:** Also, one more thing I wanted to ask about was, so RabbitMQ and, you know, I mean, in, in sense of queuing and streams. So there are persistent queues that are also available in RabbitMQ, right? Yeah. So like why, if I want multiple consumers and, you know, persistent stream is there, then you can use that.

**[03:13:31] Teacher (answer):** But see, while my course is moving forward in time, database or queue developers are also moving forward in time. They are also building features, right? So there is no hard and bound rule. Today, like as I said, MongoDB never wanted ACID property, but now it supports ACID property. So if I say that MongoDB does not support ACID, that would be wrong. Or NoSQL does not support ACID, that is wrong. So a lot of things progress, right? So there might be new features that, let's say, basically Kafka broadcast is there, which solves kind of real-time Pub/Sub use case. So we cannot just say Kafka does not support real-time Pub/Sub. So generic statements are typically tend to avoid. That's why I'm just going to specific details of that, that, hey, RabbitMQ is mostly known as a message queue, but it has persistent [?queues | asr: "use"] that kind of solves the message streams kind of use case. But there is no hard rule ever, because every engineer is coding and they are all making their tools better and better. And the world is converging.

[03:14:27] If you look at it, all databases are converging to being exactly. They look like one of them nowadays. Like MySQL supports JSON, Postgres support JSON, MongoDB supports this. There are [?wide columns | asr: "white columns"] which support ACID compliance. Hudi supports transactions and whatnot. And everyone is doing everything because building is easy. Got it.

**[03:14:50] Student 4:** Thank you.

**[03:14:52] Teacher:** Any other question, anyone? Great. See you folks next week. The end of the day I'll shoot anyway. Thanks folks, it was fab. Bye bye. Thanks. Bye everyone.
