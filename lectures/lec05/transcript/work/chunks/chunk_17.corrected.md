**[03:14:31] Student 2:** But we just want, I at least personally want my expertise and code to be [unclear: "as far as with you"].

**[03:14:36] Teacher:** No, no, make mistakes. See, the day when I, the day when I built it the first time, the kind of joy I experienced, the kind of things that I faced, like the transactional deadlock. What happens in a deadlock? I had a bunch of deadlocks in my code when I was writing it. Right. I, when I knew, then I thought, okay, this also can happen. Now, how do I fix it? Oh, this also happened now, but I'm not getting enough throughput. So now what do I do? Those mistakes make you a better engine, you know, makes a better engineer. It's what you, what mistakes you made, what you learned from them makes you better. Okay. Go through that. Go through that. Right. Go through that.

**[03:15:14] Student 13:** Thank you so much.

**[03:15:16] Teacher:** Best feeling ever. Right. When we discuss load balancer, I'll ask you to implement a load balancer. We'll go through the source code of that as well. Ask you to implement a load balancer also. Right.

**[03:15:25] Student 13:** Thank you so much.

**[03:15:27] Teacher?:** Prashant.

<!-- topic-candidate [03:15:29]: Q&A - why databases don't provide soft deletion out of the box -->

> **Student Question [03:15:29] - Student 10:** Yeah. Hi, so we talked about soft deletion. So since it improves performance by a lot, so why don't database engine provide this capability out of the box? Why user have to create this additional column and keep track of...

**[03:15:48] Teacher (answer):** Great question. Now, I'll give you the answer why. Why database does not give you this out of the box? Because it seems logical, especially in case of relational databases. Now, databases, why they don't give you this out of the box? Is because database is a very fundamental layer. It gives you all the necessary building blocks. It does not try to intervene in your space. It just wants to keep things simple. That's why you see it does not give you fancy stuff. It just gives you for update, for share, skip lock, no wait. It's so foundational. If it gives you, if it reaches into your space, then you don't know where to draw that line. Like, which one should I implement? Which one should I not? So it just keeps things simple. It just gives you what is foundational for you and not intervene in someone else's.

[03:16:36] Number one. Number two, specifically when I talk about soft deletes, then your database would need to have a separate process that does batch clean up. Now this puts a lot of load into developers cognition, on developers head. What if my data is not deleted? What if I read it? Do I need to use this column or not? How do I, how do I handle this? I'm talking in terms of relational database. You might find other databases like Redis and DynamoDB that when you delete, it does soft deletion. Redis and DynamoDB both deletes, sorry, DynamoDB does soft deletion. When you delete a key in DynamoDB, it does not hard delete. It always soft deletes. And, but it does that. So they, for them, because it's a key value store, for them it's foundational, right? So they give you that. But for relational databases, it is not. Relational databases operates on the core foundational layer and they don't try to intervene.

[03:17:28] A ton of, you'll find, 2012 or 13, I, 12, 12, I was in my final year, 2012, there was a thread on MySQL where someone proposed this very [?thing | asr: "chain"]. There is a MySQL forum or something, you'll find it there, 2012 [unclear: "card"] thread where, where you'll find. And I suddenly remembered, it was my final year, I was just doing some random stuff and I stumbled upon that soft deletion. So that's what I got to do. Someone proposed it, and I kind of recall, not the exact same line, but it was in the essence that when your database evolves, it is more important to know what you don't want to do versus what you want to do, because anything is infinitely buildable. You can build as complex features as you want, as simple features as you want, but do you really want to do that? Are you entering into users space per se? Right. So that's why they just prevent that from happening and then give you a raw construct to build on top of.

**[03:18:30] Student 10:** Okay. Yeah.

**[03:18:32] Teacher:** 2012, MySQL forum. Yeah. 2012, should be in 2012, very high chance, 20 or maybe 2011. Also I was in my final year, so it should be 2011, 2012, around those. You'll find that. So that's what I found it. And which is what struck with me, that, hey, when I'm ever designing a database, I'll always keep in mind that, hey, what I definitely don't want to do, where I don't want to go into [unclear: "pitch space"]. Thanks. Thanks for asking.

[03:19:00] Avishek [check: name spelling].

<!-- topic-candidate [03:19:11]: Tomorrow's plan - scaling WebSockets (admin) -->

[03:19:11] *(admin)* We are not audible, but. Please [unclear: "be to"] drop me a DM with a question. More than happy to answer that. So tomorrow, one day, tomorrow we'll discuss, we'll scale WebSockets. That's an interesting detour we'll take. Oh, tomorrow? Yeah, tomorrow we'll build Slack's real-time communication and see how WebSockets are actually scaled. So that's the second half for today. But first up, we'll look at NoSQL database, non-relational databases. Rahul?

<!-- topic-candidate [03:19:38]: Q&A - does the previous week's implementation need a frontend -->

> **Student Question [03:19:38] - Student 1 (Rahul):** So my question is about the previous, previous week, actually, previous week implementation for blogging platform, actually. Okay, so the thing actually I got confused for was like, the thing I got confused for was like implementation, do we need to implement any front end or anything like that for that thing? Like I am like, I am like kind of like unable to see, like, unable to see that implementation being made without an UI as per se. So yeah.

**[03:20:22] Teacher (answer):** Implement if you want. Like, we wanted to cover more on the database, caching, delegation, concurrency side of things, right? If you want to implement frontend, you don't. [unclear: "What's the happen?"]

**[03:20:37] Student 1:** Like I am not able to see, like, anyway, like I am not expert in frontend or anything like that.

**[03:20:45] Teacher:** Don't implement that. You just, what you want to understand, just implement that part of it. You don't have to implement entire stuff. Exposed bunch of APIs, do short polling, long polling. That's the key part, right? Right. Spin up a Kafka. Just put some messages and consume them, right? Or [?RabbitMQ | asr: "rapid time"] you push some messages and consume them. Just focus on those things. Do things that matter. Sure, sure. Don't go into front-end and no one, like, no, don't waste time. In case you do, you are not a front-end expert, don't waste time learning that path. Do things, like, look at example airline tickets. Did I build full-fledged front-end, back-end? No. I just did what I wanted to learn, [unclear: "it up is lock it"]. I just simulated that. Done. Right? Got two things that matter.

[03:21:32] Okay, okay. Sure, sure. Superb. Thanks folks for tuning in. Tomorrow will be huge discussion once again. We'll go very deep into scaling WebSockets. Thanks folks, I'll upload a recording by three. Bye.
