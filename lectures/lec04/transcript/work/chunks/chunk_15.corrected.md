<!-- topic-candidate [02:45:51]: Q&A - soft delete vs archival -->

> **Student Question [02:45:51] - Student 2:** I just wanted to ask this soft delete and archival the same thing.

**[02:45:57] Teacher (answer):** No, soft delete allows you to archive.

**[02:46:02] Student 2:** Okay.

**[02:46:03] Teacher:** Because if you do hard delete, you don't have time to archive. Right.

**[02:46:08] Student 2:** Okay. So like, it happens to be like in one of our project, I don't remember exactly, but they were proposing to have soft delete as well as archival.

**[02:46:17] Teacher (answer):** So soft delete, you need soft delete so that you can archive after, like you can archive after a day or so, right? Because imagine you are doing hard delete and immediately copying it on S3. How slow would that be? Correct. [check: "Correct." may be the student] So which is where, which is where soft delete would allow you to do archival, because you would have time to collect all the soft deleted rows and put it into different ways and then do hard delete from here. Okay. Got it. Got it. [check: "Okay. Got it. Got it." may be the student]

<!-- topic-candidate [02:46:44]: Q&A - Redis as primary database (online/offline problem) -->

[02:46:44] DK.

> **Student Question [02:46:47] - Student (DK):** So in our online and offline problem, we actually, the way we started is, see, whenever we talk about Redis, we generally talk in terms of that, you know, we want to cache something. I mean, that's just a general tendency. But the way we have started a solution, we have proposed either DynamoDB or Redis as the mainstream database for, you know, that solution. Why we just started with that? I mean, instead of, you know, proposing a database and then coming to the cache part of it, we directly propose.

**[02:47:19] Teacher (answer):** I use Redis as a [unclear: "primary DVO worker"]. Why not?

**[02:47:24] Student (DK):** So like, it's like a trade-off that whether we want to persist that data or not, because see, in Redis, we can persist the data, we can persist the data, but there's a possibility. We don't want to persist that data. So, so it depends that if we want to persist that data, I mean, I'm not able to, you know, clearly defined.

**[~02:47:42] Teacher:** There is no problem in that, you are on the right, right. You've got all the points checked. Now, depending on the guarantees that your system would need to provide, you pick one over the other. Right.

**[~02:47:49] Student (DK):** Okay. So it depends on the guarantees. What kind of guarantees I'm looking for, based on that, whether I need some primary database and top of, and on top of that, we should we add Redis or should we just go with the Redis? Yeah. All depends on the guarantees. That's what you're saying.

**[~02:48:04] Teacher:** So I'm using Redis as my primary DB. There is no harm in that. I can just configure [?AOF | asr: "AI"] based persistence on Redis and I'll get [?on-disk | asr: "on this"] persistence for that. Right. There will be zero data loss. Right. But I'll get speed. I have enough. I have small enough data, only 8 GB, so I can store it in RAM. Right. So there is no, no reason for me to not use Redis. Got it. That's why. Okay. [check: "Got it." may be the student] And it just being open. It's an, which is where this hard stereotypes that people have made, DynamoDB just for use for this thing, or SQL is just used for that thing. That's all. It's very, it's, it just depends on how you know how to leverage a particular tech, that's all matters, right?

<!-- topic-candidate [02:48:53]: Q&A - autoscaling, self-managed Redis vs DynamoDB -->

> **Student Question [02:48:53] - Student 8:** So, got it. Yeah, yeah, yeah. While you were comparing Redis and Dynamo, should autoscaling be also a factor in that? Like with Dynamo, you could, it would provide you like autoscaling in case you have a sudden surge, whereas in a self-managed Redis you probably might not be able to react in a small window of time when you see a sudden. So that's a disadvantage, right?

**[~02:49:21] Teacher (answer):** So that's a property of engineering teams rather than the tool itself, right? So assuming that, even as we discussed, assuming handling [?surges | asr: "searches"] and all of that remain same, then we discuss. But if you want to consider that, those points, and this, that's a disadvantage. When you're self-hosting something, that you need engineering expertise to manage and scale and react with [?surges | asr: "searches"], right? That's an added strain on the engineering teams, and so that is one more point that can go against self-hosted Redis versus DynamoDB. So if you have lean team, you can just offload everything to DynamoDB. You throw money at them, they become your extended engineering team.

[02:50:05] Correct, but with Redis you have to manage, so it's a trade-off, so you need engineering expertise to pull that off. [check: may be Student 8 summarizing]

<!-- topic-candidate [~02:50:11]: Q&A - avoiding DB-specific features (TTL) -->

> **Student Question [~02:50:11] - Student 5:** Okay. Yeah, yeah. So like, in the online offline thing we were discussing about using TTL in Redis, right? Now I don't know if that is a feature that is widely available in all kind of databases, but in general, should we try to avoid features that are specific to some DBs, because in future, in future we may not be able to change?

**[~02:50:38] Teacher (answer):** No, we wanted that, right? We wanted, we wanted expiration. That's why we went for a database that gives us, a DynamoDB gives you, Redis gives you, right? Then, though, you can also say, what can I not live without? ACID. You need some features, right? You just cannot say because your data, you're picking databases that would give you those things, to move into a database that would not give you the features that you need. Right. You would always find databases that give you similar features and move into those database. If not, you always have an option to re-implement it. For example, writing a cron job that does that exact same thing. Yes. Right. So you need to draw a line where you need to stop overthinking.

**[02:51:22] Student 14:** Yeah.

**[02:51:23] Teacher:** Correct. He like going, entire, basically not, not, not, making everything abstractionized and whatnot. So you need to draw a line. What are some realistic things? What are some unrealistic things? Drop all the unrealistic things that focus on realistic and then design a system. Otherwise you'll drop the rabbit hole and eventually write your own database. Don't do that.

**[02:51:52] Student 5:** Yeah. Oh yeah. I'm because like, when I was working on a project, yeah, I was working on a project where for archival, I propose like TTL and then listening to streams, and like the senior engineer in my team challenge saying, you can only do this with Dynamo, you can't do it if we move to something else.

**[02:52:09] Teacher:** But then you would not use DynamoDB streams, but your CDCs, Debezium gives you that. Right. If you're using MySQL, use Debezium to capture all this. See, either someone could give you with managed, or you would have to write a small service that would do that for you. Yes. Right. [unclear: "we are rigid as"] we can code anything and everything out there, right? So don't worry about, it's a, basically that's one thing that you would have to document it, if we would want to ever do that, this is the, like, these are the steps that we would have to take. Yeah, just being aware of the limitations of your design is a good place to be. Okay, thanks, I should use it. [check: "Okay, thanks, I should use it." may be Student 5] Thanks for that question. Amrik Gaur. [check: name spelling]

<!-- topic-candidate [02:52:51]: Q&A - connection pooling when scaling the database -->

> **Student Question [02:52:51] - Student?:** Yeah, I don't know, means I have not never used the connection pooling. Okay. So just a [?question | asr: "portion"] out of curiosity, suppose that, if I scale my database, okay. I mean, it's from one [?DB | asr: "DBI"], switch to two, then the connection pooling will also be multiplied by two, means it is a directly proportional, or it depends on the implementation.

**[02:53:11] Teacher (answer):** So what I would recommend is. Today, spend some time writing a hello world with connection, [?pooling | asr: "pulling"] local database, run it. You'll see the kind of configurations it provides. Right. And you understand the limitations of it. Right. You'll be in much better position to answer this on your own. Right. The way, if you're moving, if you're horizontally scaling your DB, how you do it, that also depends. We'll talk about it next, right? Horizontally scaling of databases and how to do it. We'll talk about next week. A lot of things will get clear, but today try to write a hello world with connection pooling, right? So that you will be in a position to understand horizontal scaling of database and the role of connection pooling better. Okay.

<!-- topic-candidate [02:53:48]: Q&A - deleting offline entries vs showing last seen -->

> **Student Question [02:53:48] - Student?:** Okay. Okay. One more question. We, we optimized that online and offline DB by means deleting offline fields, right? Suppose if I have to show the, that in WhatsApp, it shows, right? We discussed it. Someone asked, if you want to show, then you cannot delete.

**[02:54:10] Teacher (answer):** Okay. So, and then it's a product call. If they want to show it, then you cannot delete it. If they don't, you will delete it.

**[02:54:17] Student?:** So that, how can we optimize that? That was, I was thinking.

**[02:54:21] Teacher (answer):** You cannot, because storage is not a problem, right? It's just 8 GB of storage. You don't have to optimize on that. Okay. That's what I said. [02:54:27] stretch so that we think on those lines, right? Because storage is not problem. 8 GB is peanuts for everything. Right.

<!-- topic-candidate [02:54:50]: Q&A - downsides of connection pooling -->

> **Student Question [02:54:50] - Student 2:** Yeah. Thank you. So we discussed a lot of pros of connection pooling, and I think [?Arpit | asr: "at a"] also mentioned that we should almost use it everywhere. And I understood a lot about it today, but what I also want to understand is, are there any catches or cons or any situations where using connection pooling might be detrimental, that you are aware of?

**[02:55:15] Teacher (answer):** Imagine you configure a connection pool with minimum number of hundred connections. Okay. Let me give a hypothetical situation. Let's say you have a database that supports at [?max | asr: "packs"], 1000. Just to make a calculation simpler. Let's say you have a database that supports maximum connections of 1000. And you have a, you configuring a [?per server | asr: "repair server"], a connection pool of 100 minimum number. And now you had one server, a hundred, and here, 1000 works fine. You got some traffic. You add one more server. You got some more traffic. You had one more server, right? Three servers, 10 servers.

[02:55:53] But then suddenly you add 20 more because you saw massive, massive spike. Now what would happen? You exhausted the maximum number of connections that could be made with the database. So by not configuring your connection pool properly, you can limit the number of API servers that you can have. Correct. That's what you have to worry about, that what are the maximum number of API servers would I have. That would depend on the connection pool that you have got, the minimum number of connections in the connection pool that are configuring, the maximum number of connections that could exist on your database. It's all a factor of that, right? So that is where just blindly using connection pooling is not a good idea, right?

[02:56:37] Because if you just put it in an overstretch mode, let's say it grows to as many connections as it wants, but then you cannot have large number of servers, because if every server, then it would put a lot of pressure on a database. And let's say if you set up your expiration time on connection to be very high, let's say 10 minutes, now, which means that your existing connections on connections would not break. You need more servers to handle the load, but your existing connections cannot break. The load balancer has set up connection with some other server, but some other server is [?hogging | asr: "fogging"] up the database connections. Now what? Gone. You're having an outage, right? Those users who are connected to that other server, the data, because some other server is having very large TTL on the connection pool. Problem. Right?

[02:57:26] Life is filled with problems. Just find a near optimal solution and move on. But grass is not always green. You need to know how to tune it, where to tune it, all the factors that you see. You need to know the places where it can [?break | asr: "bring"]. So, think on multiple directions at a shot, document everything, and start to step by step, what could go wrong, what could go wrong, what could go wrong. Start with a conservative, which is where I said that in most cases you start with the minimum number of connections in a connection pool, you start with three or five, not more than that, and you make it grow to a certain stage, maybe less than 50 or 100.

[02:58:02] The amount of time, the TTL of the connection pool or the connection, that after which it would be deleted, it cannot be too small, because if it is connections to the backend or to the database. If it's too large, then you are having unused, a large number of unused connections. So you need to find a sweet spot, and it depends on the use case. Why? Because let's say you are having, you are firing queries which are taking longer time on your database to execute, which means you need to keep the connections open for a very long time, which means that you cannot have a short TTL. Yes. So depending on what your use case is, so one factor or one metric that you should track is average time for SQL query completion on your database workflow. That is the most important factor that would help you tune your connection pool the best, right?
