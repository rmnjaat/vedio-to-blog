**[03:11:53] Student 2:** Like the question is GC in the hashtag.

**[03:11:56] Teacher:** GC is what?

**[03:11:58] Student 2:** Garbage collection. Sorry.

**[03:12:00] Teacher:** Okay. Our database garbage collection. Okay. What are you collecting in this?

**[03:12:05] Student 2:** Like basically, yeah. So basically hashtag would start growing. Like daily, we'll have a lot of ingest of hashtags. Yeah. Now, eventually, if you ask that maybe somebody is just putting some random garbage stuff, A, B and C.

**[03:12:21] Teacher (answer):** We don't want all of that. [check: speaker - may be Student 2 finishing the question] Oh, okay. Okay. I got it. You typically would not delete that because what would happen is that, let's say that hashtag deleted the data, it grew in popularity. You would lose that old data.

[03:12:37] But in any case, what you're storing is you're just storing very minimal information, like 100 post IDs, one total, one integer, rather two, one integer, one string, and one array of 100 integers. It's not that huge. And if you just measure it, one integer for, sorry, one string for hashtag, let's say 16 characters or let's say 32 characters. So 32 bytes, one integer, total count, four bytes, 32 plus four is 36, plus 100 integers of post IDs. So 100 into four is 400. 400 plus 36 is 436 bytes. So 436 bytes for each document. Let's round about to 512 bytes. So half a KB. Half a KB. So two posts, two hashtags, you'll have one KB. 2000, you'll have one MB.

**[03:13:30] Student 2:** Even for a billion, you would just get to half a gig. That should be fine. I mean, that makes sense. I was just thinking about somebody can screw you up, right? Yeah, easily. Easily.

**[03:13:42] Teacher:** But then you show that number to investors and ask for more money.

**[03:13:46] Student 2:** No, yeah, that's okay. Thanks. Right.

**[03:13:49] Teacher:** But as engineers, just to, just to conclude on that, as engineers, do the calculation because it makes sense. How, how insignificant we think thousand to million and million to billion jump is. It's very significant. We treat it like it's nothing. We just say million and billion like this.

**[03:14:12] Student 2:** Significant [?jump | asr: "job"], very significant, right? Yeah. [check: speaker - opening words may be the Teacher] And I mean, one of another problem to this, another dimension to this problem is the more hashtags you have, the more you're also doing those [?micro writes on the database | asr: "micro register database"]. So it's not that it's just, but then those, but then those hashtags will not be as popular.

**[~03:14:30] Teacher:** So yeah, that's okay. Yeah, that's okay, right? Yeah. Another thing? Got it, got it. Yeah. [check: speaker - mixed exchange]

<!-- topic-candidate [03:14:39]: Student 2 follow-up - 1 million images per hashtag, paginated store -->

> **Student Question [03:14:39] - Student 2:** It's all a trade-off out there. Another thing that I was trying to add was, let us suppose we extend 100 images to say we want to give like 1 million now. Okay. The top popular images, right?

**[03:14:54] Teacher:** You said how many? 1 million?

> **Student Question [03:14:58] - Student 2:** 1 million. I was just trying, when you were talking, I was just trying on Instagram. What does it do?

**[03:15:04] Teacher:** You just scaled your requirements by thousand X. FYI.

**[03:15:10] Student 2:** I know. I know. I know. I mean, I would have said 10K, but I know the problem statement wouldn't have made much of a difference. Correct. Let's do it. As engineers, we would have just tuned down there, right? Yeah. [check: speaker - "Correct. Let's do it." may be the Teacher]

**[03:15:22] Student?:** Okay.

> **Student Question [03:15:23] - Student 2:** Now, what I wanted to understand was, I like the thing that I can think of is the flow will be basically, you will get newer and newer popular images based on hashtag. A paginated database, you may just put like a link list on the background of the same store, does not matter to us, and only when a server, someone is actually going to scroll, which most probably is never going to go even beyond some case, we are all good there. But it's fine, like it will be there. So this is the thing that I was thinking of. I just, I just wanted to confirm.

**[~03:15:57] Teacher (answer):** But just one thing to highlight, in that case you would not be storing 1 million over here.

**[03:16:12] Student 2:** That's right. Yes. I was going to come to that. Yes.

**[03:16:14] Teacher:** Then you should not be doing it because you know that all 1 million will never be scrolled. So it makes no sense for you to store it within the document. Just the first page.

**[03:16:25] Student 2:** Just the first page I will keep here, which is the latest most probably, and the later ones I will just put in there.

**[03:16:31] Teacher:** Correct.

<!-- topic-candidate [03:16:33]: Persistent Kafka just for counting vs in-memory queues -->

> **Student Question [03:16:33] - Student 2:** And one more question I had was a nice question on the Kafka thing. Just for counting, I understand the use case and all of that here, but just for counting, do we really use a persistent Kafka?

**[03:16:46] Student?:** I mean, I was thinking, I was thinking like,

**[03:16:50] Student 2:** I don't know open source solution or, I mean, I have not implemented per se Kafka. So don't catch me on that.

**[03:16:58] Teacher (answer):** You are not doing it for persistent just to count valuable information. It can be picked by other services

**[03:17:06] Student 2:** and some other services. I mean, I wanted to say that if it just count, I would have just preferred an in-memory thing. Like just same thing. We want an asynchronous process. Yes, everything works well, but even we can have in-memory queues, right, which are just distributed. We just count and it's fine if you crash and if you lose a minute of data.

**[03:17:26] Teacher:** Then you are doing exactly this.

**[03:17:28] Student 2:** Yes, I am doing the same queue

**[03:17:29] Teacher:** versus multiple queue. If you are using RabbitMQ, that's also fine. Kafka also it's fine, and then what you are doing is you are using a partitioned message broker, right? Thanks for that. Any other question, anyone? I saw one more hand was raised, I forgot it was

<!-- topic-candidate [03:17:50]: Kafka as storage / Kafka as first point of entry (high-volume ingestion) -->

> **Student Question [03:17:50] - Student 2:** I mean, the old time I was thinking whether to, I mean, I was not able to jump to a use case, but Kafka says it has a storage, I mean, it stores unlimited time and then at least you have a policy over there. I was just thinking that S3 also holds data, database also holds data. Why can't we use Kafka for holding data? Because it actually holds data. And even if a disk is more than, we are saving the IO, the primary database, just to storage data, some use case where to just store data. And if I don't want to go to database,

**[03:18:23] Teacher (answer):** Access pattern, access pattern, you need transactional properties. Kafka does not give you that, database has transaction properties. Lookups, get a post by ID, will you be able to do that on Kafka?

**[~03:18:35] Student 2:** No, not this use case. This, this doesn't make sense, but any other use case where you might think, not this, Kafka is a source of truth?

**[~03:18:45] Teacher (answer):** No, Kafka is always a message broker. It can never be your source of truth. You can, but you should not. For example, I'll give you a use case where your first part of ingestion is Kafka metrics. So imagine you building Google Analytics. It's a massive analytics that is incoming in your system. Or rather, let's say YouTube analytics. Watch time. People watching videos on YouTube, every event that is coming in, it first comes to Kafka. So request comes to your API server. API server pushes it to Kafka and then it is aggregated and processed and stored in specialized databases. This is where your Kafka becomes a first point of entry rather than a persistent database.

[03:19:29] So that is one use case where, because of its high ingestion and high volume ingestion, you don't want to directly store it in database because there is no one good way. You typically accept it in one of your API servers. You put it into Kafka and then start processing it post that. That is one use case where you first land into Kafka and then you put it into database. That's a good one.

**[03:19:50] Teacher?:** Ingestion, high ingestion rate was the use case.

**[03:19:56] Teacher:** High ingestion, high volume. Okay, because then you don't know what the structure of your data, like how you want to store your data at first, you are determining it afterwards where your analytics. Well, I think is that the way you're structuring it, because you just have to ingest and do a sequence processing on that. So high volume, high ingestion, you first put it to Kafka and then asynchronously process it, because the database might cry when you are like directly putting it there. Yes, that's where you put into Kafka first and then into database.

[03:20:36] And I'm so happy you both asked these questions, right? I never get to think on these systems this way. Because this is such a great example on what's that one use case where you put it to like, where your Kafka is the first point of entry. What's that one practical use case? Because everywhere you see the other way around. And I'm storing it in database and then I push an event onto Kafka. Case where you do that, everyone does it, like Google Analytics. I've built bunch of analytics system, everywhere we ingested in Kinesis, not Kafka, and then from there we consumed it. If pehle let's accept the writes that are there from the user and then we figure out what we have to do with that. Great, I'm excited for that question. Okay, any other question anymore?

<!-- topic-candidate [03:21:26]: Dead letter queue with Kafka, transaction outbox pattern -->

> **Student Question [03:21:26] - Student?:** So, you have mentioned that we can use a dead letter queue here in this case of where we are, you know, posting to Kafka. I have never personally used any dead letter queue in case of Kafka. So is it a customized one or does Kafka also has its own dead letter queue?

**[03:21:44] Teacher (answer):** Kafka does not give you that. Kafka does not give you that. [check: possible ASR duplicate] You have, let's say, RabbitMQ or an SQS as your [?dead letter queue | asr: "data queue"] for that. Yes, they do have. So in case this connection, this write fails, you write to this other queue. Assuming that queue is up and running. Let's say SQS fits really well in that case.

**[03:22:03] Student?:** We rather can put it in our database also if we are not using transaction outbox pattern.

**[03:22:09] Teacher:** Sorry? Either way. Basically transaction outbox pattern is what you are talking about.

**[03:22:13] Student?:** Okay, yes.

**[03:22:14] Teacher:** You write it to the database, put it into [?dead letter queue | asr: "dead letter you"] added, this is where you wanted to write, but it did not work, so you put it somewhere else, so that you then later process it. Got it? Yeah. Thanks, [?Rajiv | asr: "rajay"]. Was this from the previous one or the new one?

<!-- topic-candidate [03:22:30]: MapReduce / batching as distributed computing, Spark in place of counting servers -->

> **Student Question [~03:22:32] - Student 2:** No, no, this is a new one. For batching I had read about MapReduce. Do we cover MapReduce in this [?cohort | asr: "code"] course?

**[~03:22:38] Teacher (answer):** It's very data engineering specific. If I start talking about it, it would become, but I would still sprinkle upon the core idea, because what you would typically think about MapReduce as a very specific, like Spark jobs or, or, or your Hadoop MapReduce jobs, but instead think of it as distributed computing. What we just did with this counting servers, you can replace this counting servers with Spark jobs. It would work just fine. Right. I'm calling this as counting servers where we are reading messages from here and then this can be normal stateless VMs that are reading from here, normal consumers. You can also replace this with a Spark cluster. It would work just fine because Spark has Kafka connectors, which reads in Spark. You get to count plus plus and write it to the database batch and write it for you. So however you implement this is up to you. Normal VMs, [unclear: "spark map, it is"] and whatnot. It's the specifics of this.

**[03:23:35] Student?:** Okay.

**[03:23:37] Teacher:** But the idea is very simple. You distribute. Basically, all it does is power distributed computing. One machine is not enough to compute everything. You want to do it in a distributed way. Kafka, Kinesis, Flume, Flink, whatnot. Pick one. That fits your risk. And given that there is a massive ecosystem around it. If I touch one, others will feel bad. You've covered Spark and not Flume and Flink and whatnot. So instead of going into specifics of it, I like to put a very generic name, which is where I use counting servers over here. Maybe you can do it with Kafka and native VM.

[03:24:20] Thanks for that. DK?

<!-- topic-candidate [03:24:22]: Resources to learn data engineering - Spark, O'Reilly book -->

> **Student Question [03:24:22] - Student? (DK):** Just a small question, Arpit. So I never got a chance to work on data engineering problems. So can you suggest any resource where I can get a complete picture of things, what we can do with it? And then, you know, I can start with Spark.

**[03:24:35] Teacher (answer):** Start with Spark. Start with a book for effective Spark. The O'Reilly book. O'Reilly book on Spark is a great way to start things out. Right? And that's how you use Spark. Once you are comfortable using Spark, then you can go into internals of it. But brilliant. Spark is mind-blowingly awesome. It has its own flaws, but it's really good at a bunch of places. So you should definitely know at least Spark.

[03:25:06] It's easy to learn. Flume, Flink, MapReduce, like the disk space MapReduce, like basically MapReduce is a computing paradigm, but you can learn Hadoop MapReduce very easily. So start with Spark and then you can venture into other parts of things. So Effective Spark is mostly the name of the book by O'Reilly, so the O'Reilly book on Spark is the one that you can start.

**[03:25:29] Student?:** Okay, thanks.

**[03:25:31] Teacher:** Great. And more importantly, implement. Without implementation it's all theoretical knowledge, you will not, because when you implement, you see that problem coming. Do that. I took up a responsibility when I had no idea about big data, but I still became a leader of big data. That's how I had to learn all of those parts. And now I'm working on optimizing Spark. So it came a long way. Great. Thanks.

<!-- topic-candidate [03:25:58]: Class wrap-up (admin) -->

[03:25:58] *(admin)* Thanks, folks, for tuning in. See you folks tomorrow. Tomorrow, again, very deep discussions around social networks. It will be fun. Nothing technical, like nothing theoretical stuff, we'll go into seeing examples, doing things, answering why is why. Tomorrow, very interesting thing, we'll look at another high level pattern, very counterintuitive but essential for the system to survive. Very interesting problem, and that would be the last problem that we'll cover too, right? Thanks, thanks, thanks folks for tuning in. See you tomorrow. Bye.

[03:26:36] Thank you. [check: possibly hallucinated in silence]
