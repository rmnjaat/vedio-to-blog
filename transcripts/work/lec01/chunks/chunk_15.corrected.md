**[02:52:43] Teacher:** You create a database cluster, cluster is equal to multiple machines.

**[02:52:47] Student 7:** So it didn't cover it in the examples. So it was, so you said vertical one and the other is the read replica and sharding

**[02:52:56] Teacher:** is the sharding cluster cluster. How does it all scale multiple machines?

> **Student Question [02:53:01] - Student 7:** I mean, I don't know whether, you know, when you create a cluster, which is provided by the database vendor, for example, is it based on sharding or not?

**[02:53:11] Teacher (answer):** It is based on sharding. It is based on sharding. [check: possible ASR duplicate]

**[02:53:12] Student 7:** It appears as one database, right?

**[02:53:15] Teacher:** Yeah. So in that sense, we classic example sharded database internally. For us, it is one database internally, it is split across multiple storage nodes cluster.

**[02:53:27] Student 7:** Correct. So then we don't need to handle the sharding part, right?

**[02:53:32] Teacher (answer):** Ourselves depends on the database vendor. You are talking about vendors. They, if they are charging money for you, they would be handling it for you. If you are using open-source technologies which does not provide native sharding, you have to implement it.

**[02:53:44] Student 7:** Got it. Okay. Understood. Thanks.

**[02:53:49] Teacher:** Yes, Chandan.

**[02:53:56] Student 16?:** Chandan, you there?

**[02:54:00] Teacher:** I'll circle back. Audio problem. Surya.

> **Student Question [02:54:04] - Student 6:** Yeah. Hi. So I have a question related to again Kafka, Kinesis. Okay. You mentioned that usually partitions in Kafka is used to increase the parallelism, right? Like increase the [?processing | asr: "crossing"] rate. You mentioned also like Kinesis shards is also similar, right?

**[02:54:25] Teacher (answer):** Yeah, exactly. Same as Kafka partitions.

**[02:54:28] Student 6:** Yeah. Okay. So and with respect to the consumers, right? Like would the similar concepts apply? One consumer subscribing to one partition and will [unclear: "never said"] one subscriber subscribing to one partition

**[~02:54:41] Teacher (answer):** Consumer just comes and reads it. Kafka manages it for you, that from which consumer or from which partition it would read it, okay? That's the responsibility of Kafka. It's a, it's very easy integration for consumer to talk to Kafka and read the message, okay?

**[~02:54:56] Student 6:** But eventually, like scaling up the partitions will increase the parallelism, right? Like

**[~02:55:03] Teacher:** Correct, correct, yes.

**[02:55:05] Student 6:** Does this similar concept, like just the way you mentioned it, Kafka manages like which partition to read and supplies. Kinesis also does the same, like exactly same thing?

**[02:55:16] Teacher (answer):** Copy paste same.

**[02:55:19] Student 12:** Okay.

**[02:55:20] Teacher:** Okay. Because in Kinesis consumer, when you start, you don't specify which shard to read from. Yep. Right. So internally does that management for you.

**[02:55:32] Student 6:** Okay. And just a continuation like, but it doesn't have the limitation that you explained, right? Like having more number of consumers, right? You mentioned one limitation, limitation with three, if you have

**[02:55:46] Teacher:** three partitions and you have five consumers, two consumers will do nothing.

**[02:55:50] Student 6:** Okay.

**[02:55:50] Teacher:** Same thing goes for Kinesis. Same thing goes for Kafka. See the logic, right? How would Kafka keep track of [unclear: "which consumer rental, which point of two"] are reading from the same one? Not possible. Right. That's a fundamental limitation, right? Because think of implementation. If you think of the implementation, you realize it is not possible for Kafka to maintain it efficiently, that which consumer, if two consumers are reading from the same partition, Kafka, for it to maintain which consumer, which message was read from which partition and ensuring ordering, not possible. They cannot implement it. Right.

**[02:56:24] Student 6:** Okay. Okay. [?Got it | asr: "Not it"]. [?Got it | asr: "Not it"]. Good.

**[02:56:28] Teacher:** Yeah.

> **Student Question [02:56:31] - Student 8:** Yeah. Question with respect to the streaming. I heard the concept today, so bear with my naive question. I did not understand the part of a commit. Like when we say a commit, is it a commit to the Kafka service or is it a commit saying we did it and we store with the database itself? No, no, it's not Kafka commit. [check: "No, no, it's not Kafka commit" may be the Teacher]

**[02:56:54] Teacher (answer):** Kafka will keep track that this consumer read till this point. It's a commit operation. So Kafka will keep track that this consumer has read till this point. So next time when the consumer wants to read, it would start from that checkpoint.

**[02:57:13] Student 8:** It makes sense. So follow up question on the example, right? Like for example, when we started, like there are two databases we wanted to commit one, a DB and other one, the Elasticsearch, and right. And then we said that streaming is a solution that can replace distributed transaction.

**[02:57:36] Teacher (answer):** Not really. Not really. You cannot replace distributed transaction. You can implement it with distributed transaction. But you now have. It's not that it is replacing distributed transaction. In some cases you have to have distributed transaction. But here what we are doing is, we have two independent processes who are doing two very independent things on this exact same message. So that's why they can contribute their own sweet [?pace | asr: "face"].

**[02:58:01] Student 8:** Yeah. So yeah, like my, my general question was, like in general, if you are doing two writes on two different databases, like any, any, right, any two persistent services, there's no option other than doing a distributed, like for a consistent, there is no option, right?

**[02:58:15] Teacher (answer):** For strong consistency. There is no option, but to distribute transactions. Thanks. Yeah. Simra.

**[02:58:25] Student 2:** Yeah. Hi, Arpit.

> **Student Question [02:58:28] - Student 2:** Message queue, so here like we were talking that consumer consumes the message and once that is done, yeah, he updates that, that this message is done. So do we have any time, and suppose that the consumer goes down and that message was never updated? We spoke about that with visibility

**[02:58:48] Teacher (answer):** timeout, right? So depending on the queue that you are using, it would have, it should have some way to do it. If I talk about SQS, SQS gives you visibility timeout, which means that if, let's say, your consumer consumed a message, but before deleting it, your consumer crashed. Then after visibility timeout, let's say 10 seconds or 10 minutes, for example, whatever you configure, the message would reappear at the head of the queue and would be re-consumed by some other consumer or [unclear: "busy"], whichever are available at that time. So that's a concept of visibility timeout.

**[02:59:21] Student 9:** Okay. Got it.

**[02:59:23] Teacher:** So read visibility timeout in SQS, but you get, and something similar exists in [?RabbitMQ | asr: "rabbit time"]. Also I've used SQS very widely, same thing exists in [?Google Pub/Sub | asr: "Google pubs"], everything comes up. Every feature is copy paste everywhere. You'll find equivalent of one another. Right. But the key term is visibility timeout in SQS. You start from that, pick your favorite technology and you'll find an equivalence of that.

**[02:59:45] Student 18:** Sure. Sure.

**[02:59:46] Teacher:** Yeah. Great.

**[02:59:49] Teacher:** Gaurav.

> **Student Question [02:59:50] - Student?:** Hi, Arpit. So how is browser level caching implemented?

**[02:59:54] Teacher (answer):** Local storage, browser has a limited local storage that you can leverage. So you can, like, you cannot store huge amount of data, but still pretty decent amount of data on the browser side of things. So browser caches images also, so that it doesn't have to make an expensive network call to fetch the images. So once the image is loaded, the next load is very fast. It's not because of CDN, but because the browser cached the assets. So you can check the network tab of the browser of a web page that you would want to open, but bunch of images are there, and you can see that it says that content already present or something like that when it tries to get it. So it just loads it from the cache without making a network [?call | asr: "file"]. So what you can use is, you can use local storage SDK to do it. So local storage HTML5, or basically, if I may put it, quote unquote modern browsers, they give you local storage as a object which you can use to set item, get item, cache images and what not. You can use it for a bunch of stuff. So in the network tab you go to storage, so in Chrome or Firefox anywhere, you go to storage, on left side you'll find local storage, click on that, for any website you'll see what they are caching.

> **Student Question [~03:01:07] - Student 1:** Got it, thanks. And also for a message queue, we do not have any partitions, right? In

**[03:01:16] Teacher (answer):** message queue internally, we don't know if they are doing partition or not, right? So I cannot comment that, but naively from outside, you don't see those internally. SQS might be partitioning it. We don't know. Right. And there's no explicit nuance of it.

**[03:01:31] Student 1:** Got it. And does the worker read a message, then delete it and work on it, or.

**[03:01:36] Teacher (answer):** It's your implementation. SQS will give you APIs to do it. Have you do it. It's up to you. You delete first, you delete later, up to you, but it makes sense to delete after you have done processing. Yep. Right. Otherwise there's a loss of message. Thanks. Rajiv.

> **Student Question [03:01:58] - Student 9:** Hi, Arpit. So Arpit, I just, this idea came to my mind. I know you will discuss DB for the weeks, but really a question. Do you have any formula for sharding? No. How do you approach sharding? I mean, you just see data. How, what is the constraint, and then analyze it and then see, okay, what needs to be done?

**[03:02:18] Teacher (answer):** Yes. It's very subjective. Golden formula, there is no magic number to do that. Right. There is no magic formula to do it. It's always analyzing, like going through the data, seeing the access pattern, then taking a call. Right. That's all it depends. Pankaj.

> **Student Question [03:02:42] - Student 10:** Yeah. Hi. So, my question was, around these WebSockets and all server side events.
>
> [03:02:48] So like when we are maintaining a TCP connection open, right? So if a server has a lot of, you know, connections with the connection open with different clients and it's crashes because of some reason. So like when it spins up a new instance again, like many of them will be connecting at the same time, right? So is there a layer between server and the client by which we are maintaining these connections, or like our server is directly connected?

**[03:03:16] Teacher (answer):** Once the connection is broken between client and the server, client would reestablish the connection to whichever server is available. I will connect to only this specific server. Whatever is available, the client will connect to that.

**[03:03:30] Student 10:** Okay. So in our case, it's basically like, so if I want to make thousand connections at the same time, it will not increase the load on the server then?

**[03:03:40] Teacher (answer):** It will, but at that time, the server is not doing anything, right? Is server doing anything? Up thousand connections. It does not take much time. How's the connection establishing [unclear: "in my shot"] is nothing, nothing for the server.

**[~03:03:52] Student 10:** Okay. And the second point was, not sure, I joined a bit late, but like we have now some frameworks like React Query also, which caches the API response as well on the client side. So if you are making a server API call and if the response is not changing, then the React Query will automatically give you the... So that is also one use case of that.

**[03:04:19] Teacher (answer):** It might be, it might be caching it in your native JavaScript runtime memory of that, or maybe local storage, wherever it is choosing to cache, but that's an excellent example. See, everywhere you see caching, like no one wants to do repetitive computation. That's why dynamic programming, right? You do memoization, ensuring that you don't redo the same things again in it. Adit.

> **Student Question [03:04:44] - Student 2:** Hey, hi, one basic question for in long polling and server side, server sent events. In both of the cases, TCP connection would be open, right?

**[03:04:56] Teacher (answer):** Yes.

> **Student Question [03:04:56] - Student 2:** So in case of SSE, when is the TCP connection closed?

**[03:05:02] Teacher (answer):** When your client wants to terminate it, it's on the side of the client, either the server goes down or the client chooses to terminate the connection, that I'm done consuming. Okay.

[03:05:13] Okay. Okay. Thank you. Yeah. Thank you. Sure. Great. Any other question? Anyone?
