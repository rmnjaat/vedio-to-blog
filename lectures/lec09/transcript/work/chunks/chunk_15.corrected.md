**[02:47:12] Teacher:** Right.

**[02:47:13] Student 8:** There's API server update that because it would not be that frequent, right? This popularity.

**[02:47:20] Teacher (answer):** That's a good approach. Right. But again, pros and cons, everything in computer science is a trade-off. Now you need to know what you are trading, which things for what. So what you're suggesting is what a popularity service directly writes to DB through a hashtag API through whatever they're doing. Right. If they do it, they need to implement the code to make a call to your API. Imagine that is data science team. Right. Why would they do that? They say, it's not our job. We'll write it to Kafka and done. Humans, humans, right? No, like, because then they have to manage that system. Wow. Now you would say, my system was down. Let's say you do some reason I'm hashtag API was down summary. Right. They were that, that those who are folks were making web, who calls to our HTTP server and your server was down and you lost that update. Now, what would happen? You'd say, I don't know, no, please do you process that? Not for me. We are not doing it. Correct. Humans. Right.

[02:48:23] So you want to decouple as much as you can. So which is why if you're going something that does not need to be done in real time based in synchronous way should not be done in a synchronous way. This does not demand synchronicity. It is a very nice use case for asynchronous consumption. Correct. So then do it a second.

**[02:48:44] Student 6:** Got it. Thank you.

**[02:48:46] Teacher:** Got it. Yeah.

<!-- topic-candidate [02:48:50]: Q&A - atomic counts in the DB, replacing the top-100 array, Kafka partitions per user ID -->

> **Student Question [02:48:50] - Student?:** Hi Arpit. So Arpit first, my first question is related to the DB here. So as we have selected a non-relational database, NoSQL database. Here we are increasing the counts every time for the particular hashtag. So, I think we need to maintain the atomicity also here because, probably, you know, it might happen that, that same count might be, you know, multiple people trying to update the same count.

**[02:49:21] Teacher (answer):** True. Yes. Yes. So, so how do we ensure that here comes thing? We have a database has to provide that and not only the databases give you atomicity FYI. Right. Right.

**[02:49:32] Student?:** So, so, but we have to make that database.

**[02:49:34] Teacher:** Correct. So you need to pick a database that gives you atomicity. That is one of the key features that you read from a database. So you will not pick a database. It does not give you atomic guarantees.

**[02:49:43] Student?:** Okay. So NoSQL database also has to be, you know, give the atomicity feature. Then only we should select a database.

**[02:49:49] Teacher:** MySQL gives you, DynamoDB gives you both of them.

> **Student Question [02:49:53] - Student?:** And here in the, in the post where you are, you know, saving the post in that array. So every time we are going to replace that complete array altogether, right?

**[02:50:03] Teacher (answer):** Depends on what data science team gives you. Most of all, it would give you a top hundred every time you go and replace our entire array.

**[02:50:10] Student?:** Because I think that would be inefficient to, you know, get that array out and, you know, sorting those values.

**[02:50:15] Teacher:** So it would be that we create the data. You give me a hundred every time you go and simply replace it. Right. Right.

> **Student Question [02:50:25] - Student?:** And, it's a, it's a basic one. In the user ID Kafka thing. So you are partitioning it based on the user ID. So topic can be anything because, but it's just that you are creating those partitions based on the user ID. So don't you think it's going to be a huge and humongous Kafka pipeline, you know, considering all the user IDs or.

**[02:50:48] Teacher (answer):** That's what I said. I'm repeating it now. There is not one topic or rather one partition for each user ID.

**[02:50:54] Student?:** Right, right.

**[02:50:55] Teacher:** That's what we talk about. There might be 1000 partition of which 1 million users are there. Each one taking care of 1000. Right.

**[02:51:02] Student?:** Got it.

**[02:51:03] Teacher:** You don't need one partition for each user. Yes. So it's a one topic with different partitions and each partition can handle let's say 1000 of user ID. 1000 users. Yeah.

**[02:51:14] Student?:** Got it. Got it. Got it. Yeah.

<!-- topic-candidate [02:51:20]: Q&A - SLAs, Kafka availability, dead letter queue, stateful components -->

> **Student Question [02:51:20] - Student 2:** How do we actually have SLAs map to these, these designs? Time or what kind of QPS this design would think about it.

**[02:51:30] Teacher (answer):** Sure. Let's start. Okay. Let's, let's, let's start. So from which component you want to start to.

**[02:51:34] Student 2:** Oh, so basically, like this, a Kafka is there. Kafka is something which rules up a system around, right? [check: "rules up a system around" - wording unclear] So we have different workers, which we can scale upon the work, but Kafka is something which I, not sure how it works with the single instance, right? How do we have multiple instances of Kafka?

**[02:51:49] Teacher:** No, no, Kafka is not single instance. Kafka is a single instance. [check: ASR may have dropped "not" - contradicts the previous sentence] Kafka is a cluster. Cluster.

**[02:51:54] Student 2:** So, okay. If one goes down, another takes care of because the data is replicated.

**[02:51:59] Teacher:** So that's availability.

**[02:52:00] Student 2:** So uptime is uptime is all the time. It doesn't go down even for any time.

**[02:52:05] Teacher:** No, no, it can go down. It can go down. Kafka gives you 99.9% availability. It does not give you four, nine, five, nine availability. So Kafka can go down. But in case Kafka goes down that much of time, you would lose the data. Data as in whatever [?writes | asr: "rights"] are to are happening on Kafka, you will lose that. So if that data is really critical, you add a dead letter queue and push it there and then consume it and re-ingest it in Kafka. That's one way to do it. If not, what you can do is it's okay for you to lose data, you lose data. That's fine. So either have a dead letter queue or lose the data or drop it in memory for some time. Until in that time, it comes back up, it writes it. Otherwise you drop it. Multiple ways to handle it. So that's about availability of Kafka.

[02:52:56] Now, if you think about SLA, SLA is all about how quickly can you consume messages from Kafka. Right. Now for you to the, given the parallelism of Kafka is proportional to the number of partitions. What you'll measure is you'll measure the throughput of your system. But how quickly are you being able to consume messages from Kafka? If it is, if it fits into your quote unquote SLA, then good enough. Otherwise you increase the partition over here and you increase the workers over here.

**[02:53:19] Student?:** Number of workers. Yeah.

**[02:53:21] Teacher:** Right. So, but while you do that, there is an online repartitioning and partitioning that downtime pick one depending on how well was your SRE teams, right? So pick one and this way, but have a strategy, do have a strategy to scale this. You need to have a strategy to scale things up, right? But, and that's all you maintain [?SLA | asr: "sra"]. In seventh week, Sunday, when we discuss distributed task scheduler, we'll understand how SLA defines our system, right, how we are ensuring the SLA that we are meeting, but this is a very nice precursor to that. And how we think about SLAs at every single step. So it basically adds up. But any specific that you want me to touch on?

**[02:54:07] Student 2:** So, I mean, we can classify data components, the two parts, one which [?maintains state | asr: "made in state"], one is stateless, right? So state means Kafka is stateful, DB is stateful and rest all the workers or servers are stateless. So when the stateful component goes down, that means data loss over there. I mean, if it goes down, if it's like [unclear: "a later than"] obviously you have some downtime. Right. So, so that actually triggers me to think in that way. Okay. If stateful things go down, how can I, how can I do different stuff? Or how can I use different components to meet my SLAs? Right. Because stateless servers, obviously you will measure the QPS by doing the load test.

**[02:54:46] Teacher:** What you need to know is dead letter queue. Look up this.

**[02:54:49] Student?:** Okay.

**[02:54:52] Teacher:** And look up, look up dead letter. Dead letter [?queues | asr: "keys"] [unclear: "are your fit and this way"]. And that is one of the ways to do it. Other two is, so I explained three ways to do it. Buffer in memory, loss, like [unclear: "letter data be lost"]. Third, write to a dead letter queue. And then [?asynchronously | asr: "a synchronously"] process. Right. Pick your favorite, depending on the system, you would pick one over other, because you don't always have to add, add another, yet another component. It's sometimes it's okay to lose the data. Data and you lose some, it's fine. Right.

[02:55:26] In case you cannot lose the data at all. You read it highly available. Then you add data. I'll give an example on my YouTube. There's a video on Uber's SOS emergency video where, because. It's very important for SOS system to be up and running. Let's say you are traveling in a cab and something bad happens. You press the SOS button and at that time the service is down. You cannot have that. Right. Event no matter what. So how do you ensure that that is up and running? So then none of the messages lost, none of the data is lost. Uptime is guaranteed. I've talked about it in few, few bits and pieces, but this is a key thing that you have to keep track of.

**[02:56:10] Student 2:** And for DB also, I mean, you have partition [unclear: "DBI"]. So we have leader, leader and [?replicas | asr: "applicators"], right? So if leader goes down, it takes time to, for [?replica | asr: "applicator"] too. So that's also downtime. So if you don't want to, you should have [?leaderless replication | asr: "leaderless application"].

**[02:56:23] Teacher:** How quickly you want to get it up, two seconds, three seconds. That is something that you have to bear. Very few system give you a hundred percent [?uptime | asr: "of time"] guarantees. [unclear: "Even S even S"] does not give you a hundred percent [?uptime | asr: "of time"] guarantees.

**[02:56:34] Student 2:** Right. But [unclear: "the digital"] is a leaderless components like, which don't have any leader, right? So every system, every, I mean, every few [?nodes | asr: "notes"] have all data or can manage data, but there's no downtime over there. Right. So that could also be used, right.

**[02:56:48] Teacher:** If you don't want, but then that has another complexity, multi-master replication.

**[02:56:53] Student 2:** Yes, true. Conflict resolutions also.

**[02:56:56] Teacher:** You get some, you lose some. Right? Okay. Great. Yes, Mohan?

<!-- topic-candidate [02:57:02]: Q&A - Kafka retention, deletion policy, horizon and checkpoints (commit) -->

> **Student Question [02:57:02] - Student 4 (Mohan):** Yeah, so for the Kafka, there's millions of messages coming, right? And then, of course, you can go back and forth if the, let's say, counting [?server | asr: "several"] goes down, you can go back.
>
> [02:57:13] So is there any pointers to think about how far they should be able to go back or how long the messages should be there? Are they going to be forever?

**[02:57:24] Teacher (answer):** On Kafka messages will be there forever unless you have configured a deletion policy. The deletion policy will be that if a message is less than 30 days old, like older than 30 days, then you delete it periodically. So if you have a deletion policy like that, you cannot go beyond it. That is called as horizon. So the time at which, like, sorry, if you have a deletion policy configured, the time at which the last deletion ran, that's your horizon time and that you cannot read messages beyond that.

[~02:57:53] So when you read from Kafka or Kinesis, you can say that, hey, now my workers are up. I'll start reading from horizon, which means from the beginning of the, from, from beginning of the [?stream | asr: "street"], but beginning does not mean the first ever message because it could be very well possible that those messages are deleted just for your deletion policy. So that is your horizon. That is one way to read it. But in some cases, you cannot always start from horizon. Let's say, which is where you have checkpointings.

[02:58:21] [unclear: "sir"] In Kafka, whenever you read a message, a set of message, you can tell Kafka ki, hey, I am this consumer and I want to commit. When you say commit, it means that, let's say you have these many messages in Kafka and you say that I'm committing, you read these many and you say commit.

**[~02:58:40] Student?:** Are you showing something that I cannot

**[~02:58:44] Teacher?:** No, it's there on the screen. Is it not there?

**[~02:58:47] Student?:** Somehow okay, on, on

**[02:58:51] Teacher:** Okay. Yeah, go ahead. Yeah. So you read few messages and then you say, commit, when you say commit, it marks on Kafka that this consumer at this ID as committed to this message. So then now you can say to Kafka that read from the last checkpoint or last commit. So it would start. So let's say you consume this few messages and then you crashed. So when you resume, you have an option to resume from horizon or you can resume from last checkpoint. So in that case you would reprocess these many messages.
