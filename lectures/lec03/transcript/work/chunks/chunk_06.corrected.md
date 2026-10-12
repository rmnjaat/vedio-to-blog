<!-- topic-candidate [00:59:55]: Amazon's approach - batched ID ranges -->

**[00:59:55] Teacher:** Let's start with the second half. So now what we'll talk about is, we'll talk about how Amazon does it. FYI, I know this because the team that did it sat right next to me, so I used to attend a bunch of tech talks there. But I had a bunch of questions to them and kept on asking [unclear: "it clear"] how do folks do that, and they were kind enough to explain it in a in a public tech talk. So okay.

[01:00:14] So what Amazon does is, for every order that you place is, they assign a global ID to that order, and that is unique. Given the high throughputness of the system, and plus not just this, that they provide ID to a lot of other internal services. One of them happens to be order, which we all use on a day-to-day basis. So that had to be unique. So what they had is they, you leverage batching. Batching is one of the most [check: words possibly lost mid-sentence] performance out of any system, FYI.

[01:00:53] So what they do is they have something like this. They have a bunch of API servers. You can literally write this thing in 150 lines of code, not even exaggerated. It's that simple to write. Scaling, you might just have to handle a few other cases here and there, but it's not difficult for you to write this particular service. Hardly 150 lines of code, not even kidding about anything else. Python, if you write 150 lines, where you can write this entire service. So recommending you to write it, FYI. Okay.

[01:01:26] So APIs, they use a basic API server exposing your ID generation endpoints, putting behind a load balancer, classic thing, and have a database. Have a database. Now this database is a classic relational database. No fancy non-relational database. I don't like to necessarily complicate things. Normal relational database would work over here. So what we do is, similar to how we did not write to the disk every time we generated an ID, we did it in batches. Once every thousand ID generated things. Similarly, we do things over here that instead of calling your remote service every time you need an ID, you get a batch of IDs in one shot. That's the core idea.

[01:02:13] You would have seen a ton of videos, a few videos on YouTube about this, but let me go into implementation details of it. Given that we covered airline check-in system, this becomes a piece of cake. So now what would happen is, let's say I have two services, orders and payments. When order service wants IDs. So these are the servers that are running the order service. These are servers that are running the payment service. They don't care about monotonicity, FYI. They don't care about monotonicity. They need uniqueness, as simple as that.

[01:02:49] So now what you do is, when order service wants an ID, any server of that makes a call to this API, to this ID generation service and says, "Hey, I just booted up. Can you give me 500 IDs?" So it just requests for 500 IDs. The request comes to this API server. API server fires a SQL query on this [?table | asr: "team"]. SQL query that, "Hey, I need 500." So it wrote 500 over here. So 0 to 500. So the range is sent to this server. So 0 to 500 range. You don't have to send individual IDs. No, start and end. It's just integers, right? So start and end, just send it at this range belongs to you. And you update it in this database.

[01:03:37] Now you can very quickly start thinking, "Oh, exclusive." You would do it for update, like select start from this for update, do it in a transaction, so that it does not, like, multiple requests for a particular service does not affect. All of that comes together. So you would atomically update it in a transaction of the final value that is handed, already handed over.

[01:04:02] So let's say server one came up. It said, "I don't have any ID to work with. So I'll go to this and get 500 IDs." To this server, updates this to 500 and responds back with this range, not independent IDs, no needed. Why to send so much of data over network? Just start and end, problem solved. Then let's say server 2 came up and said, "Hey, give me another 500, I am new one, give me 500 more IDs." So it would make a call, call would go over here, it would go over here, it would say 500 plus plus, plus plus equal to 500, it get 1000. So it sends 500 to 1000 in response over here. So now server two has this range. Server one has range from zero to 500. This is from 500 to 1000.

[01:04:46] Now, order service, when they start getting the request from external world about orders, when the request comes to this order services web server, they already have in memory this range. Now, when they would want to generate, they would have their own databases, orders database or something. They can start putting data into orders database, not really having to worry about anything. The idea being that because they already have the range of IDs in memory, they can start pulling that out. And that becomes the globally unique IDs for that particular product. And they can prefix it whatever they would want to do, in case they follow those conventions.

[01:05:23] But the idea is that this way, this central ID generation service just decouples the system. Now you can have any number of service, order service can have any number of databases without having any problem, because ID generation service is separate and orders database separate. So I can shard order database and scale it horizontally without having any problem, not needing and any, every one of those database can start accepting the writes. This way what happens is that your server does not have to make call every time to this ID generation service to get a set of IDs. I use 500 as a small example. In reality it is 10,000, 50,000, 100,000, and depending on the throughput of the service, right? Okay.

[01:06:01] Disadvantage of this is, in case your server got this range and then its server crashed, this range is gone. So putting this range, keeping this range too small means you are making too frequent network calls to get the set of IDs. If it is too large and if your server crashes, you are losing that entire range. So it's up to you, your service, your throughput, in order to fine tune how many service at max will you get it in a batch. It's up to you. You make that call, you get it.

[01:06:32] Similarly, you had one entry for orders. Similarly, you would have one entry for payment service. So when your payment service handles the request, it would not have to talk to the central ID generation service every time. Instead, your server can load it once, or once it is about to be exhausted, it would load it and start using it whenever it wants to do that, whenever it wants to process the payment. Once any of this server sees that my IDs are getting exhausted, let's say it got 500, 490 are already exhausted, what it would do, it would make call and get another 500. It might get some, let's say, 3000 to 3500. So now it would have those [?ranges | asr: "rates"], it would start using from that particular range that it has. So we are still not guaranteeing monotonicity across servers, but you are handing them those IDs in batches.

[01:07:22] This is how Amazon does it. Really simple, very simple to build. You can very clearly see how we can do this in transaction. Airline check-in system, Ctrl-C, Ctrl-V over here. Read, in transaction, update, atomically do plus equal to whatever range was, or rather, however ID was requested. You get the old value, you get the new value, you send it as a range over here, and server starts using those IDs over here. So here, the single source of truth, because this is single server, it doesn't have to gossip with anyone. You can very easily scale the system and just, it's just one update. You don't even have to read all of it. Just one minuscule tiny update that you're making in a database every time someone wants this ID. Right? Okay. This is how Amazon does it. Any questions?

**[01:08:14] Teacher:** Rajiv?

> **Student Question [01:08:16] - Student 1 (Rajiv):** I was wondering why it was in this architecture, a database not used for server

**[01:08:25] Student 1:** Hello, I'm audible now?

**[01:08:32] Student?:** Yeah, I have a question like

**[~01:08:35] Teacher:** Oh wait, wait, wait, sorry, it must be problem with my mic. Wait, wait. [check: speaker - whose mic problem, teacher or Rajiv?]

**[01:08:48] Teacher:** Yeah, Rajiv, go on.

**[01:08:50] Student 1:** Audible, Arpit, now? No, no, no, yes, yes. Arpit, I was wondering why was that a database not used to keep track of information, how much out of range a server has used, and then when it comes up, it uses that information to start consuming from there.

**[01:09:05] Teacher (answer):** Why would you want to do that?

**[01:09:07] Student 1:** I mean, I know that the range is appropriate enough, those IDs would get wasted. I mean, 100 IDs were used, 5, 4 out of 500, 400 got wasted with this thing. Let's say we go for 10,000 now for the same thing. So 9,900 IDs got lost. I mean, there's no way to again go back and use them.

**[01:09:28] Teacher (answer):** Imagine the overhead that you would have to keep in, in order to keep track of every single one of them. That's a massive overhead. Why?

**[01:09:35] Student 10:** Okay.

**[01:09:36] Teacher:** Imagine big integer 2-264 [check: "2-264" - likely 2^64]. Will you ever exhaust that number? If that Amazon is 500 trillion dollar company.

**[01:09:48] Student 1:** It's okay, it's okay, [unclear: "boys"] under practical use, usage of it, then.

**[~01:09:52] Teacher:** Yeah, obviously, like, think about practicality at every step. Don't just think, "Oh, I have to use every single, every single ID that is out there." No one cares about it. It's just few range of numbers, because we tend to underestimate the numbers. For example, 1 million to 1 billion, if I talk about it, we just use 1 million like it's nothing. 1 million is a huge number. 1 billion is huge number. The difference between a million and a billion is almost equal to a billion, and that's huge. Right. And we just use it like this, 1 million, 4 billion, 5 billion. It's massive, massive, massive numbers. And for a [?four-byte | asr: "four by"] integer, 4 billion, 4 billion orders. Imagine 4 billion orders of Amazon. [unclear: "sound right"] if you exhaust that, making 64 bits, make it [unclear: "8 by 20 meters 2x to 64"]. Not very much, it's big enough range for you to not worry about it. Okay, Mohit?

<!-- topic-candidate [01:10:54]: Why not UUID -->

> **Student Question [~01:10:54] - Student?:** Yeah, like if monotonicity was not a requirement, then why not just go ahead with a UUID kind of approach?

**[~01:11:01] Teacher (answer):** Let's talk about it. Let's talk about it, like, why not UUID. So if UUID already exists for it, why people are not [check: possible ASR duplicate "let's talk about it"]
