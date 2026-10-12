<!-- topic-candidate [00:50:04]: Q&A - SQL vs non-SQL, ACID in MongoDB, KV stores -->

> **Student Question [00:50:04] - Student 6:** Yeah, one more question relating to the SQL versus non-SQL databases, like these days MongoDB also offers ACID properties.

**[00:50:13] Student 6:** Not performed. [check: possibly the Teacher answering ("not performant"?) - diarization] Okay.

**[00:50:16] Teacher (answer):** It's a distributed transaction. Slows down. In their official documentation, it says that please use ACID sparingly. It says that in their official documentation because cross-shard ACID compliance is costly. It is implemented using a distributed transaction. Distributed transaction slows down the throughput. Within shard ACID, anyone can guarantee. ACID MongoDB guarantees, but it says that you're losing out on throughput. It's there in the official documentation. In the ACID part of it, you'll find it a line that says, please use it sparing or something on similar lines. And it says that it does it using distributed transaction. Because of it, you should not use it more often. If you need something like this, you should use it. And I've also found it in the WiredTiger's documentation as well. Same thing.

[00:51:06] Right. So, yeah. So people claim ACID, cross-shard ACID is only done through distributed transaction, which slows down the throughput. And you typically should not do it when you need high throughput. Sampar? [check: name]

> **Student Question [00:51:20] - Student 2:** Uh, yeah, so yesterday we we we tried to design the KV store on relational databases, right, and now we can also see that we can use non-relational databases for KV stores, because KV stores don't usually have the relations. So the only, is this the deciding factor for a KV store being in a SQL database and non-SQL database?

**[00:51:49] Teacher (answer):** No, no, no. KV store are databases of themselves. Like they are in their own league. We just mimic an access pattern. Right. So DynamoDB is a key-value store. Redis is a key-value store. Right. They have the different storage engines to implement it. Redis does it in memory. DynamoDB does it on disk. Right. So what changes is the underlying storage layer. Right. KV is just an access pattern. It does not define the underlying store. Correct. Okay.

> **Student Question [00:52:14] - Student 2:** So if I have a KV access pattern use case, so how do I decide whether I should choose a relational and non-relational? Is it just the correctness part? Correct. What else? Okay.

**[00:52:30] Teacher (answer):** Otherwise you can go for a specialized KV store as well, like [?DynamoDB | asr: "Daryl Abu Devi"] or Redis. If you need something like that, that's why I understand the features that you need from it, because you may not always need to build a KV store from scratch, because KV is just an access pattern.

> **Student Question [00:52:44] - Student 2:** Okay. Okay. So in, in that way, if I, if I implement KV store in our relational database and instead use, uh, DynamoDB or Redis. So in terms of scaling factor, all, all of them will perform same. Is it?

**[00:53:04] Teacher (answer):** No, it depends on how you, what you're storing, how we are storing, how you are accessing, what's the throughput, how we are partitioning, how we are sharding the data, a ton of factors. You just cannot use something as a black box. It is very dependent on what, for example, if you store it to store massive [?blob | asr: "block"] values, each of let's say four MB size, then relational databases would cry their heart out. But DynamoDB would work better. If you're storing a small amount of data, you would see like, so the performance characteristics varies depending on what you're storing and how you're querying the data.

**[00:53:39] Student 4:** Okay.

<!-- topic-candidate [00:53:41]: Break (admin) -->

**[00:53:41] Teacher:** We are using something, how we are using something. Okay. All right. Thank you. *(admin)* Yeah, folks, we'll take a break for five minutes today, early break, because we have a very long discussion coming up. So first, I've done, uh, we just scratched the surface of non-relational databases, but throughout this course we use every single one of them at different places. One of them we'll use right here, right in this one. So when we come back, five minutes break, we'll see back at 10. When we come back, uh, we'll discuss Slack's real-time communication, a ton of brainstorming. We'll ask how, how, how, why, why, why at every single step before we make any decision. So we'll do that in order to solidify our understanding. So see you folks at 10 after 5. Thanks folks.

[break ~00:54:25-00:59:43]

<!-- topic-candidate [01:00:04]: Slack real-time communication - requirements -->

**[01:00:04] Teacher:** Let's start with the second half. Now what we'll do is we'll design Slack real-time communication. So one thing that I kind of hate is how when people put out, they say design Slack, entire Slack you will design, right? So what we'll do is instead we'll focus on this just one part of it and do it really well. So Slack real-time communication, bracket, all text, that's it, nothing more, only text-based real-time communication, which means messages that you see here and there, [unclear: "holds ruba"] Teams, Teams, Insta, Facebook, whatever, right? But we'll keep it simple, we'll understand the foundational building blocks, we'll understand the small nitty gritties of it, how we're making design decision. Okay, the requirements for this. This is pretty simple.

[01:00:56] We have multiple users, multiple channels. Let's assume that we are only talking about one organization on Slack on which you have there are multiple employees, multiple channels part of it. User can direct message another user or can put a message in a channel. The chat needs to be real time and historical messages can be scrolled. So for example, if a user posted a message on a channel, you can just scroll through the channel and go to historical messages. These are the things that we have to like, we need to adhere to or we need to build. Right.

[01:01:31] This same thing can be used to build ton of stuff, multiplayer games, real time chat, interactions, real time polls, creative tools and whatnot. Right. You can use the same architecture to build a bunch of stuff, but the key highlight of this would be how we are making certain decisions instead of just like, you know, we'll have this boxes. We'll go into those implementation nitty gritties of it and build better systems out there. Okay. We'll kick off our brainstorming and we'll cover all these parts, channels, messages, checkpoints, and real-time communication. Through this, we'll talk about scaling WebSockets and all. Directly jumping to WebSockets is not a good idea. We'll cover a bunch of stuff, then we come to WebSockets and then we scale it.

<!-- topic-candidate [01:02:11]: Brainstorming the schema -->

[01:02:11] Okay, so let's start with brainstorming. Let's start with simple stuff. Schemas. That's the easiest thing to start with, right? So how would you go about designing basic schema for only these features, not other random stuff. Only these features, multiple users, channels, user can DM messages, chat and stuff. What would be a schema? And this does not mean we are using relational database, FYI. It's just a schema. It's just that these are the entities, these are the attributes of it. This does not mean we are using relational database. It depends on the kind of guarantees we want to put and then we pick the database. Okay. Let's start with this. How would you store the data? What would be the basic schema of this? Raise your hands. I'll pull you in. Yeah, Pankaj.

**[01:03:04] Student 1 (Pankaj):** Yeah. So what I'm thinking right now is there would be one table for users. So user with their ID, name, and if they have like some nickname, which they can have.

**[01:03:18] Teacher:** That's okay. What else?

**[01:03:20] Student 1 (Pankaj):** And then there would be a channels table, uh, would have like a main organization ID and the channel ID.
