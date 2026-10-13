**[00:25:34] Teacher (answer):** It would not have been as worse as it was. They were doing one at a time because that's the most basic thing that they could write. So they just went out with that. And it was a legacy architecture. When they started, they went with this, the company scaled but they did not change it. So they were just living with that. And you know, there is always a service. No one touches that ever. This was one of them.

> **Student Question [00:26:01] - Student 2:** Got it. So one other thing, what if the CDC was implemented from a read replica?

**[00:26:11] Teacher? (answer):** It's fine. Works just fine.

> **Student Question [00:26:14] - Student 2:** Okay. And if it was a NoSQL type of database where eventual consistency happens. So can you please tell me one particular use case where this would be a bad example, bad implementation.

**[00:26:31] Teacher (answer):** Not at all. If you are okay with eventual consistency, even CDCs are eventually consistent. It does not guarantee strong consistency anyway. There is no strong consistency between these and these databases. It's all eventual consistency. Right? So the system is built on [unclear: "our."]

**[00:26:45] Student 2:** I mean, in terms of asynchronous processing.

**[00:26:48] Teacher:** So where you need synchronicity, you cannot move past, right? You have to have synchronous. When you need strong consistency, that's when you do synchronous programming. Right.

**[00:26:59] Student 2:** Got it. Okay. So in terms of synchronous, synchronous, I mean, synchronous communication, we won't be able to implement this.

**[00:27:06] Teacher:** Yeah. Okay.

**[00:27:09] Student 2:** Got it. Great. Got it.

> **Student Question [00:27:13] - Student 6:** So, is, is CDC somewhere close to server sent events or could we have simply use server

**[00:27:20] Teacher (answer):** Server sent event is front end JavaScript. Right. Okay. This is backend database, very different. Right. And CDC is pull the data and transform and push the data to other database or, or [?SSE | asr: "SYNC"] is JavaScript where your backend server is sending the event to your front end. Very different.

> **Student Question [00:27:47] - Student 6:** I'm saying one minor question in the organization example that you just talked about, used [?SQS | asr: "SQL"] rather because Kafka is expensive as well as it has.

**[00:27:59] Teacher (answer):** See, that is like, I could point out a hundred things there, but a company always has some decisions made a certain way, right? Got it. So you can't cover it on it, but you could go ahead with that. Like if the, but there, but there load was decent enough that Kafka and [?SQS's | asr: "SQL's"] cost would have been fairly similar. Yeah, it would have been very similar. The kind of throughput that they were having. It started as a very legacy service. Oh, sorry. It started as a very basic service. Company grew. They did not refactor that service. And then it started to bite back. Right? Okay. Yeah.

[00:28:40] I'll take one more question before we move forward. DK, go on.

> **Student Question [00:28:44] - Student 4 (DK):** Hi, Arpit. So, Arpit, what I wanted to understand in CDC. So, let's say in [?MySQL | asr: "my skills"], some transactions are happening. This is the first step. This is the second step. So would CDC would also be able to capture in that sequence or CDC is not a good example or a good use case for that?

**[00:29:03] Teacher (answer):** CDC is a brilliant use case for that. And when you talk about transaction, transaction is an atomic unit, right? In a transaction, there might be 10 SQL statements that you're running. But what gets written to the log file when your transaction commits, correct? Right. So all of the stages are written in one shot in your log file and then it's being read by CDC.

**[00:29:22] Student?:** Okay, so it is then reading it in the same sequence, whatever.

**[00:29:26] Teacher:** Correct. So the sequence in which your transactions are committing and added to the log file is the same sequence in which CDC is reading and pushing it into other database.

> **Student Question [00:29:34] - Student 4:** Okay. Got it. Got it. And second thing is, so CDC is only used in cases when there is a simple use case where we don't have to do a lot of transformations. Let's say I have, I have like in [?MySQL | asr: "my school"], I have two tables where I want to put some join of these two tables. But when let's say we are doing multiple joins and multiple aggregations and let's say we have to write some configuration file in CDC to capture that kind of data. Is it also a good use case for that scenario or it doesn't work in that case?

**[00:30:06] Teacher (answer):** Apache Spark solves that for you.

**[00:30:08] Student 4:** Okay, then we have to use the consumer and multiple pipelines and you know.

**[00:30:12] Teacher:** Yeah, mostly around Apache Spark solve the big data tools that you hear about. Apache Spark is the king of all at the moment. Apache Spark does that for you really well. So when you're doing complex transformations across tables and joins and like making multiple jobs and whatnot, Apache Spark is your friend. My friend. Okay. Got it.

**[00:30:32] Student 4:** So it is, it is for basically simple use cases.

**[00:30:34] Teacher?:** [unclear: "Key."] Yes.

**[00:30:35] Student 4:** Data comes.

**[00:30:35] Teacher:** You just want to consume whatever is written there, extract it out, put it somewhere, right.

**[00:30:41] Student 4:** With some basic transformation, right. Because in the past I've used one tool by the name of PG sync, which used to push our [?Postgres-based | asr: "post-based"] data to Elasticsearch.

**[00:30:52] Teacher:** One, right? It is just extract and put it. PG sync is an example of Postgres based CDC because it only works with Postgres, but it does that exact same thing. And that's exactly what a CDC is.

**[00:31:03] Student 4:** Got it. Got it. I've used it and I was never aware that this system is called CDCs.

**[00:31:09] Teacher:** So now you could replace that with Airbyte, Debezium, having much more, having much more fancier plugins. If you may want to put data into some other thing, you may not have to rewrite a lot of stuff there, right? Like integration with those APIs and what it just does magically for. Got it. Got it. Yeah.

**[00:31:27] Student?:** Yeah. Yeah.

**[00:31:29] Teacher:** Rajiv, I'll take your question.

<!-- topic-candidate [00:31:31]: Distributed cache - requirements and agenda -->

[00:31:31] We'll move forward to the first topic that I wanted to go, just going back and forth, but I just wanted to start on this note around, [unclear: "it tells what it is"] because now that being addressed, the big discussion, my personal favorite distributed cache, will have a ton of brainstorming. A lot of critical questions I'll be throwing at you folks. A good distributed cache. The idea being going into those nitty gritties, going into those granular details that matter. We'll talk about everything that you can think of on this slides. Okay.

[00:32:07] So requirements pretty simple. High throughput, low latency, distributed. Everything we want. We are very greedy. Get, put, delete, [?TTL | asr: "ETL"], the four functionalities that would implement. Scale is by default given. But we'll have a very good time discussing. So this discussion, this entire thing, we'll have two brainstorming. First, around low-level implementation that I do now. Then we take a break. Then we do high-level implementation of it, where I would want to talk about consistent hashing, distributed hash tables, those part. So we'll start with low-level implementation, cover it to the fullest. Then we go on the high-level set. So we'll have two brainstorming in the same. So this is a mega system that we are designing.

[00:32:46] Idea is to again form a lot of dots in your head, then you can connect it however, right? Okay, so let's start with the first one, distributed cache. Assume it's in-memory, it's distributed. I should be very explicit when I talk: it is a distributed in-memory cache. Now let's start with storage, right? So the things that we brainstorm on: storage, how do we find caches full, cache eviction, communication, concurrency and TTL. These are the things which are very important when it comes to implementing a cache. We will go very deep into each one of them to understand how we are doing, what we are doing. And then we go on a break and then high level brainstorm.

<!-- topic-candidate [00:33:26]: Storage on a single node -->

[00:33:26] So let's start with the first one. How will you store the data for an... Now here what we are discussing right now is just one node. It's not a distributed. Distributed will take when we go on the high level details of it. This is just single node implementation of distributed cache, as in one node you have, right? Let's talk about storage. How would you store the data in this node? It's an in-memory store. Raise your hands, I'll pull you in. Yeah, Hemant?

**[00:34:00] Student 1 (Hemant):** Yeah. So, mostly our requirement is like saving the key-value pairs. Can I assume? Okay. So what we need to do is like we need an address in memory where keys are there and for that key whatever the value is there is a separate address from where we have to fetch or maybe write or update.

**[00:34:24] Teacher:** But where value stores?

**[00:34:26] Student 1:** Yeah, so I'm going on that. And keys, maybe we can provide a continuous array of in-memory, which provides the location for keys, which holds the pointer where the values will be stored.

**[00:34:46] Teacher:** To put it simply, hash table.

**[00:34:48] Student 1:** Yeah, I was trying to build on top of it. Like it's like a hash table. Only thing we may need to worry about is how we try to create the open addressing or chaining because you will try to provide a definite size.

**[00:35:12] Teacher:** If hash maps already exist, why would you want to rebuild that logic? They have already solved that problem for you, right?

**[00:35:21] Student 1:** Yeah. I mean, if you ask me a single system, I mean, single node, a hash map is made for that with all those things. Correct. We have to maybe think about how we can do this. We have more than one machines are connected.

**[00:35:40] Teacher:** No, no, no. We're still talking about single node implementation. Distribute machine, you can think of sharding.

**[00:35:44] Student 1:** Right? That's a simple hash map. Hash map which can be used as a storage.

<!-- topic-candidate [00:35:53]: Multiple value types -->

**[00:35:53] Teacher:** Now let me change the requirement a bit, just a bit. Now imagine in the value we could store set, list, bloom filter and HyperLogLog and whatnot. I have multiple types that I'm supporting in value. So how will your value be represented?
