> **Student Question [02:27:34] - Student 6:** So can SNS and SQS be combined and be considered?

**[02:27:38] Teacher (answer):** You can, you can, you can mimic Kafka with SNS plus SQS.

**[02:27:41] Student 6:** Okay.

**[02:27:42] Teacher:** But there is a limitation for that. When you implement, you would realize that historical, because you don't have historical messages in Kafka, you can have historical messages. So you can go through old messages also with SNS and SQS. You cannot have.

**[02:27:55] Student 6:** Okay. Okay. Got it.

> **Student Question [02:27:58] - Student 6:** And I have one question related to caching as well. So one of the places where you can implement caching is at load balancer, API gateway. So typically you'll have to re invalidate the cache as well. So how do you invalidate that layer? So if you don't, I mean, yeah, I guess.

**[02:28:21] Teacher (answer):** Load balancer does not give you any API [unclear: "code O8 FII"], right? So the only way to invalidate it is time-based. That's the only thing. So when you're caching something at load balancer, you need to be aware that for a certain amount of time, it will be cached. So you cannot typically invalidate it because load balancer does not expose those endpoints to the market. You can request it to invalidate. So you can adjust the time at max.

**[02:28:44] Student 7:** Okay, got it. That's it. Sure.

**[02:28:48] Student 1:** Yes, but actually, so actually I wanted to touch upon the same thing, which I don't know the last name. But with SNS and SQS, we can replicate the behavior where like multiple consumers can actually have the same messages. And so it's, it's from my learning, like, you know, we went ahead with SQS based architecture. You know, since there's no ordering and no sharding basically, you know, for a given object in RDB, we were receiving like, you know, multiple messages in the SQS and multiple consumers were picking it at the same time. And even with the retries and everything, you know, we used to end up like, you know, failing. Then we had to like, you know, re-architect everything and move to Kinesis or like, you know, so like from SQS. Yeah. Yeah.

[02:29:45] So that's one thing like, you know, ordering is, and sharding is, is really one important thing, when to choose like SQS and Kinesis, because, with sharding, we, we, you actually get all the messages for a given, unique ID in, in a single, and a single consumer is actually consuming all those messages. So you actually can actually control, you know, the behavior, how you want to, persist it, back in your database and, and do other things.

**[02:30:14] Teacher:** performance, given that you know that all the requests of a particular thing will come to one place, you can cache and load and whatnot, you can pass and write and whatnot. So yeah, you get all sorts of performance improvements by that.

**[02:30:26] Student 1:** Yeah. So I, so I want to just touch base on that. Yeah. No, no. Excellent.

**[02:30:32] Teacher:** Thanks. Thanks for adding that.

**[02:30:34] Student 1:** And, even on the caching side, I might, I'm not sure like, no, whether it, you know, comes. So my team owns a config platform and generally configs are really small in nature for most of the applications, but latency is a really important thing for our customers. Even introducing more than three milliseconds of latency is a no-go. So what we do is, so from our control plane, people can do any changes to their configurations. We take the snapshot and push it to S3. application boot up, you know, we load it from S3 and into internal in-memory cache. And we also use what we talked about, like, you know, using the disk. So we also persisted inside. So many levels, right?

[02:31:30] For mobile guys, like, you know, what we do is like, you know, rather than S3, we push it to CDN and whenever a call comes like you know first call goes to the in-memory part if it is not present loads it from disk if it's not there then like you know in the back and like go go to CDN and fetch it so like but just want to trade like you know

**[~02:31:47] Teacher:** No, no, that's brilliant. You are having at so many levels, but one of the reasons why you are able to do so is because there is not much cache invalidation required.

**[~02:31:59] Student 1:** Yes, and inconsistency is like is not a problem for us. It's not a problem.

**[02:32:07] Teacher:** So brilliant. You used all the layers there and you know, that's how we should be thinking. Like it is not always a single centralized remote cache that you should rely on. Anything that floats your boat, do that. Anything that helps you keep your infrastructure cheap or rather less expensive to do that.

**[02:32:25] Student 1:** And just want to touch base on one more thing as in like, you know, we since like falling back is an anti-pattern because most of the times you never fall back and you never test that part of your code. So we try and avoid that as well that, you know, it's not, it's not like, you know, something is falling back. It's, it's part of the make making that fallback a part of the actual process rather than like they're just falling back. Okay. Because it can happen when, you know, once it triggered, like, you know, we never tested that part or it, it was some part of the code, like, you know, which was never updated because it was always a fallback thing.

**[02:33:03] Teacher:** So then is it that you send a fraction of requests as a fallback every day?

**[02:33:09] Student 1:** We don't, put fallback at all.

**[02:33:13] Teacher:** As in, it's, but then it's kind of fallback where you don't have in memory. You go to this, you don't have a disk, you go to CDN and fetch it. Right.

**[02:33:20] Student 1:** So it's more like, you know, first, we always go to disk, for always go to in memory. Okay. And for the first time, like nothing will be there. So it will load from disk. And at the same time, we will, in the background thread, like, you know, we'll fire a call to CDN and, you know, gets the latest thing from CDN. And when we are building the CDN, so first place is like, you know, where, for example, let's say you did some change we commit those changes to the git repository and we also at the same time we publish those changes to CDN, we ensure that like you know both both of them are done.

**[02:34:07] Teacher:** But then is it possible in your case that memory is flushed and you don't have [unclear: "the return memory"]?

**[02:34:17] Student 1:** Yes, like let's say if if it is flushed then you know it will fall back to disk. So no, so the thing is, for the first time like this fallback, let's say when the application is, when the application started, there's nothing in memory so it will it will get it from disk so it will this this this this this path is always covered and then at the same time we call to CDN and get it from there as well. So if it's latest, like, one from, from what you have got it.

**[02:34:55] Teacher:** It, it, it, it basically automatically gets updated. Yes. Whenever I did something you have got it. Pretty interesting.

**[02:35:03] Teacher:** Good. Anything else you don't want to add?

**[~02:35:06] Student 1:** No, no, no. And it was a great session. Sorry, like actually I am, you know, joining from Luxembourg. So it's like 4.

**[02:35:13] Teacher:** Oh, oh, oh. Have a, have a, like have a, have a good sleep. It's about 30 AM. Great. Thanks. Thanks so much. Amrik.

<!-- topic-candidate [02:35:25]: Q&A - caching through an intermediate service -->

> **Student Question [02:35:25] - Student 2:** Yeah. I just wanted to discuss one thing, actually it's regarding the caching. Okay. So while I joined a company, okay. It means they were planning to move from the calling directly to the API server to something else as a common library. So on the front end, what we did is we implemented a different application. Okay. So it was storing the data and instead of calling directly to the API server, we were calling that application first, that service first. And then from there we were getting the data. So will this be also means this is also a part of caching or what?

**[02:36:00] Teacher (answer):** You're saving an expensive thing, right? And then whatever you are saving, if you are having a copy of data at an end and you're saving something, let's cache it. You're basically kind of a, because that's what you do, right. You save an expensive computation, you spare, save an expensive IO.

**[02:36:18] Student 2:** Okay. And, that service was responsible for one more thing actually means, for, it was avoiding the multiple API calls. For example, if we have, say four or five machines were there. Okay. For that, we, were calling the data. So from the front end, we were just passing one query to that service, which was having all the parameter indexes and that service was making instead of the front end directly meeting

**[~02:36:41] Teacher:** but then were you caching something on that service?

**[~02:36:47] Student 2:** That was responsible for two things actually, for the that query for processing also and for that caching also.

**[~02:36:54] Teacher:** Got it. So then your front end has one point of contact and it can internally for and it can internally fan it out to multiple services to get it. It's basically kind of like an [?API gateway | asr: "if I get it"]. Right. Oh, yeah.

**[02:37:11] Teacher:** Yes. Shitej [check: name spelling].

<!-- topic-candidate [02:37:13]: Q&A - read replicas and master load -->

> **Student Question [02:37:13] - Student 7:** Yeah. So I have a question regarding read replica. So we discussed that replica is pulling the changes from master. So my question is, does adding more read replicas, assume that my service is a read heavy service. So does adding more replicas affect the performance of the master node?

**[02:37:30] Teacher (answer):** It does, but not that much.

**[02:37:33] Student 7:** Okay.

**[02:37:36] Teacher:** still absorbing some capacity of master while it is trying to fetch it. Right. So you will not have huge number of read replicas. Five, six, seven is still five is fine. But beyond that, you typically don't go because it eats up into servers like masters, CPU, network and memory capacity while it is trying to fetch the data because every database gives you different ways to fetch the data. Some database gives you direct SSH option to go and read the entire bin log file and then do processing on your end. If your database do that, great. If not, then it gives you SQL or your protocol specific way to fetch it. That would require servers, CPU, memory and network bandwidth, all of them. So you typically don't add huge number of it.

[02:38:24] You can create now as a solution, but let's say you need 15. Your database is only allowing five. How do you get it to 15? So you typically create a [?hierarchical structure | asr: "hierarchy culture"]. So a replica can become a replica of other replica.

**[02:38:36] Student 9:** Okay. Okay.

**[02:38:38] Teacher:** So let's say you have five at the top layer and then everyone gets three, three, three, three, three, or other two, two, two. So that's why you, you basically complete your 15 replicas.

> **Student Question [02:38:49] - Student 7:** And let's suppose they are affecting the master node that then it might be an indication to move to sharding.

**[02:38:55] Teacher (answer):** Correct.
Correct.
Correct.

**[02:38:58] Student 7:** Thank you.

<!-- topic-candidate [02:39:01]: Q&A - CDN (deferred) -->

**[02:39:01] Teacher?:** Rahul.

> **Student Question [02:39:02] - Student 4:** So my question is just about confirming things about CDN. So basically, if you remember the first point in that, at the start of the lecture, like we, we had some API servers, which are having some local caching. Okay. So I, from, so I tried to think about the system of CDN and how it is working. Basically it's just a proxy. Okay.

**[02:39:28] Teacher (answer):** CDN will have a discussion. early to discuss CDN, I have huge detail of CDN covered in third week. Right. So I would recommend let's, let's, let's defer the discussion for that time because I'm anyway covering that. So a bunch of questions will be answered there and everyone will be on the same page, right? If I cover partially today and then something later, so it will create a mess and, and like not everyone will absorb that. Right. That's right. So a CDN specific, let's move to the end. Like in case you're diving into deeper details of CDN.

**[02:40:02] Student 4:** Sure. Not, not in the deep things. It's just about the caching thing.
