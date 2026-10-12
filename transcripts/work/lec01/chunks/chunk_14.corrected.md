**[02:40:10] Teacher:** So what, what, what exactly are you caching on CDN?

**[02:40:13] Student 4:** So basically like, if you remember the first, first point in from the, from the start of the lecture, it is about like caching, caching things in the local, local server or local instance on the server. It can be whatever Docker container. Okay. So, my question is basically the CDN do this also like, they, like, they must have a lot of like kind of like API servers, which are like, lot of API servers and like, so to make this system efficient, so do they like a store, the data store, the caching data in their, disk also.

**[02:40:58] Teacher:** So in RAM, imagine storing images in RAM. Would you store images in RAM?

**[02:41:01] Student 4:** No, no, like, not like a part of data, like not exactly the more.

**[02:41:07] Teacher:** Everything is on [unclear: "this procedure"]. Everything is on [?disk, of course | asr: "this course"].

**[02:41:10] Student 4:** Okay. So I thought like it was a combination of RAM and disk actually,

**[02:41:14] Teacher:** but why would you want to store it on RAM and CDN? Because most things that people are caching on CDN are what? Images, videos, gigantic responses. Why small responses? What would you gain by storing something in RAM, but do user data needs to be stored in RAM. It's their decision. Right. But I don't really see a need to store anything in RAM because this access is anyway, fast CDNs are closer to user. Would anyway get all the benefits out of it.

**[02:41:42] Student 4:** So what I was thinking was it was kind of from, from what I thought was basically first cache as a RAM, then it's the disk and then there is central storage. Yeah.

**[02:41:54] Teacher:** They can implement. I don't know. I've never worked for that for mine. I've never worked for cloud. I don't know if they cache something on RAM or not. They can, if they want to, but I don't see a need to do that. Given that disk access is fast, you have SSDs that would give you relatively similar performance in RAM. They might cache some configurations and not, but not the user data. User data is typically gigantic.

**[02:42:14] Student 15:** Okay. That's sure.

**[02:42:18] Teacher:** Sampai [check: name spelling].

<!-- topic-candidate [02:42:22]: Q&A - scaling Kafka consumers with SQS -->

> **Student Question [02:42:22] - Student 1:** Hey, here. So my question is mostly related to the Kafka part where you discussed the heterogeneous workers and homogeneous workers. So for the homogeneous workers, it's okay to use the queuing facilities. But for the heterogeneous workers, we need to use some sort of solutions like Kafka. But with Kafka, the problem is the workers cannot scale. If you want to scale, you need to do add more partitions. want to add more partitions you need to do rebalancing all all of those stuff, correct? Now let's say I want to leverage Kafka based solution for some heterogeneous workers but where in some services the workers are scaling at times, then can we fit that solution like this Kafka based solution over here?

**[~02:43:15] Teacher (answer):** Yeah, so you can have Kafka consumers, let's say you have three partitions beyond that hypothetically. Yes. But then you need hundreds of consumers. Now what do you do? You have three consumers for your Kafka. Let it push into a message queue like SQS and have 100 workers there. So the job of this would be just to read the message and put it into SQS and there are 100 workers who are doing the heavy lifting for you. So this way, without rebalancing or without repartitioning your Kafka, you can get higher throughput.

> **Student Question [02:43:54] - Student 1:** But okay, so that means we are adding one extra component that needs to be managed to to to get the scaling functionality as well as straight. Okay, okay. And there is no best other solution other than using these two systems together. Okay. And it's very common for notification architecture?

**[02:44:16] Teacher (answer):** Very common. All notification architecture, this is extremely common. You have a Kafka, you have limitation of Kafka, which is parallelism equal to number of partitions, but you need higher degree of fan-out. So sending message takes more time, consuming takes less. So you just consume from Kafka, put it into SQS and then have workers, hundreds of workers that is throwing it out in the word. It's a very common thing.

**[~02:44:38] Student 1:** Okay. There is one more functionality in Kafka, which I haven't read it through. I was working around this space and I found, I got to learn that term. It's something called broadcasting feature in Kafka. I haven't read in depth about it, but what I got to know is that Kafka, so earlier we used to think that Kafka was a dumb messaging system where Kafka don't do anything. Like it doesn't fetch from the producer. It doesn't send to the consumer. Producer fetches it, fetches the message and a producer sends the message and consumers fetches the messages. So Kafka is a dumb system. But with this broadcasting feature, what Kafka does is it can send, broadcast the message to all the consumer groups that is consuming from a particular topic. I got to learn something from that, not in depth,

**[02:45:34] Teacher:** So obviously those engineers are also working. I'm not sure how, how, like what advantages does it provide? And if it is real time, [?pub-sub | asr: "pops up"] is what they're trying to add. Not sure around that, but I'll, I'll also take a look. I've just made a note of it. Okay.

**[02:45:52] Student 1:** Great. Great. But yeah, for the timing, I got the answer. Yeah. Thank you. Thanks.

**[02:45:59] Teacher:** Okay. Yeah. Rajiv.

<!-- topic-candidate [02:46:02]: Q&A - WebSockets behind a load balancer -->

> **Student Question [02:46:02] - Student 9:** So, if it's regarding WebSocket connections, I actually not clear about this, that the client always knows, so client has to have a connection with the server, right? So if it goes through LB now, is it to that a single instance of client would always know public IP of LB, but LB is sticky. That means it will always forward the connection to a single server or it can go to any.

**[02:46:30] Teacher (answer):** that if you need WebSockets, LB has to be sticky. Okay. So load balancers that supports WSS, which basically WebSocket specification, it has to be sticky and it would forward to the exact same server

**[~02:46:47] Teacher?:** and if LB goes down then reconnection, reestablishing the connection, the client would establish the connection.

> **Student Question [~02:46:53] - Student 9:** Okay, okay, okay. So and one more question regarding Kafka. So Kafka, it's as we said that the removal policy is a policy where we decide how much long data should keep in, how does Kafka manages this data, so big data, right?

**[~02:47:08] Teacher (answer):** We'll talk about that sixth week. We have it covered. We'll talk about that.

**[~02:47:14] Student 9:** So they say that Kafka is like a DB only, it has a

**[02:47:19] Teacher:** We'll talk about it. Six weeks, we have a very, like we'll talk about some other thing, but I'll specify how basically Kafka leverages that. We'll go through that.

**[02:47:28] Student 15:** Okay. Thank you. Yeah.

**[02:47:32] Teacher:** Yeah. Yeah.

<!-- topic-candidate [02:47:35]: Netflix caching shows at ISPs -->

**[02:47:35] Student 2:** I would like to add one more point on the, on the caching examples. That is the, how the Netflix does its video streaming. So we can store the video files on CDN. That's fine. But to get more performance on it, we can also do one more optimization. Like suppose some show is very popular and we can store that show on the PoP locations that is called the internet service providers, which are more near to the users and it will get the streaming very faster and it will also save cost for the CDNs and like that.

**[02:48:14] Teacher:** That's a brilliant example. You then, so then you also must be knowing about how, how ISPs sued Netflix because of Squid Games. Yeah. You, you, you read that, right? So, so for folks who don't know, a brilliant example that has just been shared is how you can cache the popular shows of Netflix data on ISPs. If you use ACT internet, ACT has massive data centers, not massive, but still they have basically pretty decent sized data centers. You cache it at local ISP site. This way, when you're accessing it, the data is right there and you fetch it from there. You don't even have to go to CDN to read the data. And this way you can get like ultra low latency to your end users for such things.

[02:49:08] Now, why is it possible? Because data is not changing. worrying about inconsistency here. Show is live, show is live, done and dusted, right? So you can literally ship it to local ISPs, ask them to cache it. This is where Netflix works with ISPs to service. And here, if you look for Cloudflare engineering blogs, there they talk about this, how Cloudflare accelerates using, like how Cloudflare accelerates the performance by working with ISPs to drive this experience. So Cloudflare also has a blog on this, just a Google search. Right.

[02:49:50] But Netflix, these are next level optimizations. People that CDN is the ultimate. Now Netflix was mostly the pioneer. I'm not sure if they were, but Netflix was mostly the pioneer in this on leveraging ISPs to cache the data. Right. But thanks so much for adding that. It's a brilliant point. Yeah.

<!-- topic-candidate [02:50:12]: Q&A - compression, security, database clustering -->

> **Student Question [02:50:12] - Student 7:** A couple of questions. Are you going to cover like a compression as a kind of strategy for various use cases? That's one.

**[02:50:21] Teacher (answer):** Compression is basic.

**[02:50:22] Student 7:** Okay.

**[02:50:23] Teacher:** You have three or four algorithms. Pick one that suits you the best. None. Basically nothing much in that.

> **Student Question [02:50:30] - Student 7:** Okay. And security as a topic.

**[02:50:35] Teacher (answer):** Not really. I mean, that does not really fall under like high level architecture. So I typically stray away. cover are there on my website, like those were the 28, 29 topics, what were the exact ones that I'll cover.

> **Student Question [~02:50:49] - Student 7:** But isn't that something that a system designer needs to worry about in real world?

**[~02:50:53] Teacher (answer):** Yes, and I do know those part, but people would not resonate if I talk about, if I start talking about security, people would run away. Like I, I just have to, you know, ensure that the people who are enrolled for a certain thing, they get the value most, like they get the most value out of it, but it is a bit security, then there are, then it opens up a whole new Pandora's box, right? You can, I can talk about infrastructure security. I can talk about how to go into best practices cloud.

**[02:51:23] Student 7:** No, no, no, I'm talking about only infrastructure, forget infrastructure, but just, application security, right? Because it's, it's such an example, example rate limiters, DDoS, SQL injections.

**[02:51:36] Teacher:** What?

**[02:51:38] Student 7:** Yeah.

**[02:51:38] Teacher:** I mean, all of this is just a Google search away, right? Rate limiters are tons of videos available. else is just like they're already on the internet. Right. There's nothing much to add there because there's a pretty standard. Isn't it right? Handling DDoS equal to rate limiter. You add rate limit on a different layer. You get, you get the answer. Right. Like, like you know how to solve that problem. When you talk about SQL injection, there are standard ways to do it. You talk about CVEs. You exactly know how to patch it. Now what else? because these are pretty things which is available across the internet. There is nothing much specific to add.

> **Student Question [02:52:20] - Student 7:** Okay. Final thing, the clustering of databases, that is part of you probably are saying vertical scaling, right?

**[02:52:34] Teacher (answer):** No, [?horizontal scaling | asr: "how is it all scaling"]? Clustering, now you can read out a cluster that are multiple machines. So [?horizontal scaling | asr: "how is it all scaling"]?
