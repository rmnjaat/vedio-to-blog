**[00:58:43] Student 1:** Another node becomes as a master, till that the master nodes goes up. Correct.

**[00:58:48] Teacher (answer):** That's a way to automatically recover from failures. But you may not always see that in production. Not always. There are some systems that use leader election and that's the way to do automatic recover from failures. But in most cases, you would see, because the world is cloud native now. If you are building AWS, you would have to do leader election. But if you are using AWS, AWS itself will do leader election for you and have a standby node become, and basically promote a replica to be the master and whatnot. It would do it [?internally | asr: "internet"]. Right.

[00:59:21] So talking from a practical perspective, we'll talk about leader election next week, next to next week. Right. But here when you talk about in simplistic way, I'm not over complicating it on first week. But when you talk about it simplistic way, what you're talking about, leader election, where your replica becomes a master and all that is there, that is recovery. That is automatic recovering from failures kicks in, right? But you may not always see it in production when you are having this kind of architecture, right? Because implementing it is a pain and not product companies need that because cloud gives you those guarantees.

**[00:59:54] Student 13:** Okay.

**[00:59:55] Teacher:** But we'll talk about leader election. We'll talk about leader election at three different places.

> **Student Question [00:59:59] - Student 1:** So why I ask this because in my experience, I have never, I mean, we have never provided a [?connection string | asr: "setting string"] as a read replica. We always like, we just always provide a single connection string.

**[01:00:12] Teacher (answer):** And I think that it's abstracted. Correct. That's what I'm saying. That architecture is abstracted. So that part, so that is a proxy kind of thing, which is you are providing one connection string and it is doing this heavy lifting for right. And not everyone would have that. That is where the naive way to do it is let your API server itself do this one.

> **Student Question [01:00:36] - Student 1:** And also one last small thing, if if we are providing multiple connections at the API server level and the API server is responsible for making a connection pool with each of them, then there won't, won't there be a heavy load on the API, like to maintain a connection to send out heartbeats now and then?

**[~01:00:56] Teacher (answer):** But you need that, right? You need that, you need that, and there is your API server to have connection with both [?databases | asr: "variables"] so that you can forward the request to the corresponding one.

**[01:01:08] Student 15:** Okay. I got it.

**[01:01:11] Student 16:** Okay. Thanks for that.

> **Student Question [01:01:13] - Student 3:** Yeah, actually we did touch upon a bit of what I want to understand towards the end, but I'll just elaborate the session a bit more. So in a normal use cases, do we manage connection pools separately for all these horizontal scale instances?

**[01:01:31] Teacher (answer):** For each database is a separate connection because TCP connections are stateful. Right. It's between a server and a database. It's a stateful. Right. So you need to have a separate TCP connection pool for every one of them, for every database.

**[01:01:46] Student 3:** Okay. Okay. And this could either happen like at a proxy layer and we maintain a pool with the proxy. Yeah.

**[01:01:54] Teacher:** Either way, your API server can maintain it, proxy can maintain it with the database. This can be stateless. All options are possible.

**[01:02:01] Student 12:** Got it. Yeah. Thank you.

> **Student Question [01:02:06] - Student 3:** Yeah. Hi. So I just want to understand that this sharding, so does it mean that instead of one database, we have exact same three databases?

**[01:02:16] Teacher (answer):** No, these are exclusive subset of data. So a third of rows will be over here. A third of rows will be over here. A third of rows will be over here.

**[01:02:24] Student 3:** Okay. Or can we do something like if I have a hundred tables in my application, so we can have 30 tables somewhere. Correct. Vertical sharding, but it will also, we need to manage those connection pooling in two three databases. Yeah, yeah, yeah, okay, yeah, all right, sure, sure. I have a question on caching, can ask now?

**[01:02:47] Teacher:** Not on caching, we'll basically take it at the end. Sure, okay, sure.

> **Student Question [~01:02:52] - Student 2:** So when we talk like no master DB or like no child DB, right. And then like no replica DB. So it is not server DB, right. So we can have like, no cluster of like no DB server. If it is Oracle database, Oracle RAC, if it is Amazon, then we can,

**[01:03:10] Teacher (answer):** There's no one way to build any system by the right. So you can have it the way you'd like.

[01:03:15] The reason I wanted to bring up this, right. So we can avoid like no DB outage. So if we, we can, we can definitely do that. And this is a very simplistic view. Tolerance of databases in fifth week, you'll see how we restructure this into ensuring that there is no, no outage at all. Right. How we handle, how we recover from failures and whatnot. We'll, we'll touch up. It's still first week. I'll take two more.

> **Student Question [01:03:42] - Student 1:** Hi, does auto scaling of EC2 instances go under horizontal scaling or vertical scale?

**[01:03:50] Teacher (answer):** Autoscaling. You add more instances, right? You have steps scaling there, when an average CPU utilization of the cluster goes beyond 60%, add one more node. Right. That's what the rule that you write. That's what general scale. Thanks. Yeah, Amrita.

> **Student Question [01:04:06] - Student 12:** Yeah. So, hi Gaurav. So my question is around the scaling of API servers and DB all together to handle the loads. So there are out of the box solutions available in the market which auto scale themselves, so in that case, like, like, give me example of one so that I can be a little more specific, like, let's take example of EC2 only. So they auto scale, so in the, in those cases, we, who takes the responsibility of scaling the API server, and if it is responsibility of [?ours | asr: "R"], then do we have out of the box solutions available for that?

**[01:04:50] Teacher?:** We define the rules.

**[01:04:51] Teacher (answer):** Autoscaling group will just spin up instances and add it behind a load balancer. We have to define the rules that when do we want to scale? For example, one way to scale is average CPU utilization of a cluster. So if average CPU utilization goes beyond a certain factor, add one more machine. If it goes beyond that, add one more machine. Define those rules to scale up and scale down. Right. But auto scaling, what it, auto scaling group, the auto scaler that you have provided by AWS or any cloud in general, that responsibility is to spin up a machine and add it behind the load balancer. That's what it would take care of. Okay. But the rules you have to define.

**[01:05:32] Student 12:** Okay.

**[01:05:34] Teacher:** Great. We almost covered everyone. Ritin, Chandan, and Deepak, I'll take your questions at the end. Okay.

<!-- topic-candidate [01:05:42]: Delegation -->

[01:05:42] Let's move to delegation. Delegation, and now here I'll cover basically Kafka essentials, which everything that you should know about Kafka in order to design systems, so those factors will cover. The delegation is the most, like, it's like it's the most underrated way to get performance out of system. So I happen to attend a talk, 2020, we just went in the lockdown, and there, there was a session by VP engineering Hotstar. What he said stuck with me. The principle that Hotstar is known for handling massive [?scale | asr: "skills"]. Obviously I give credit more to Akamai than Hotstar, but still Hotstar does that pretty well on the API side.

[01:06:28] So what Hotstar, what that person, I really should remember his name, but what he suggested was the way Hotstar looks at systems. They live by this principle that whatever that does not need to be done in real time should not be done in real time. Now this real time implies in the context of the request. So when you send the request and it does bunch of stuff, out of those bunch of stuff that it has to do, what is extremely essential for it to do in the request context, do that. For everything else, just delegate it to the worker.

[01:07:08] This is what it lives by, because of which the response time that you see, because in the context of the request, the amount of work that it has to do is bare minimum. You get very fast responses to the user. User gets good experience. There is very less load on the database and whatever can be done in an asynchronous way is done [?asynchronously | asr: "in a sequence"]. So this is what is superb about building systems at scale, doing or leveraging delegation to the fullest.

[01:07:37] I want to talk it in the context of Medium. Let's say we had user information, but now let's, I want to add the number of essays that a person wrote on the platform. But this number, you may say, yeah, I can do it with join. Yeah, you can do it with join, but I'm just manufacturing this use case to help you understand delegation part and we'll go into Kafka essentials through this. So say when I want to render this number. So what I can do is, I can actually come to that. So I can actually add a field in my users table called total blogs. Right? So every time the blog is published, I want to do count plus plus over here, but this is not so critical application or not the critical update. I can do it asynchronously. Right? So which is what this delegation is all about.

[01:08:24] So the core idea of delegation looks something like this. Client, you get a request, API server submits a task and sends the response. That's only the job of API server. So whatever needs to be done in the request context, it's done in the request context. Here the request context ends as soon as the client gets the response, right? Okay. Now when the task is submitted, it is submitted in a buffer, typically called as a broker, right? Message broker, message stream, same concepts over here. So it is pushed in a broker which is consumed by a bunch of workers and these workers do the heavy lifting and update the database. Right.

[01:09:07] So for our account example, this is exactly what would happen, where the updates would flow. For example, request from a user comes to the API server where a blog is published, let's say a blog is published. So what we do is we send a message called on publish in a message broker. Let's say I'm using SQS, SQS, RabbitMQ, anything. We put a message in a broker that a blog is published. Now in the worker, when a worker reads this message, it says, hey, a blog is published. What do I do? Worker has the business logic to do total blog plus plus in the database by firing an update query. So workers make a DB call to update this total blog and do count plus plus, and then reads anywhere happen and it reads the count from here when the page refreshes and does whatever. But the updation is done in an asynchronous way in the database. So whenever a user reads the next time would see the updated value.

[01:10:04] Here you can very clearly see the delay in processing that would happen because of asynchronous flow. But what you are saving from this is that API server does not have to directly write the database. It is updating this count asynchronously. So there is no synchronous load on the database. So the number of concurrent writes happening on the database are fewer. So database is experiencing less load. So the database is happy because it is the most brittle component of your infrastructure. Protect it. It's that iPhone. It's like iPhone, right? When you, it's like the new iPhone that you purchase, it's so, it's so expensive that you have to keep, you have to take very good, you have to take very good care of it, right? You put it in a shell, or not shell, you basically put a nice cover on it to ensure that even if it falls nothing breaks. Same, your database is iPhone. You have to take care of it very much because if this goes down everything is done, right? So take care of database like you are newly purchased [?phone | asr: "for"], not just like, but you're, but you're newly purchased [?phone | asr: "for"], right? So do whatever it takes, put less load on that, let it work just fine. It's like that pampered child, right? You have to keep care, you have to take care of it very much, right? So this is how a typical flow would look like.

<!-- topic-candidate [01:11:25]: Message broker - message queues and message streams -->

[~01:11:25] But this is where the magic happens. This broker, this is the heart and soul of delegation as a principle. So there are two ways to implement it, two kinds of broker. First are message queues. Second are message streams. So message queues are literal queues in which you put the message. There are bunch of consumers and they consume the message from them. Now this consumers are homogeneous consumers, which means they all do the exact same thing
