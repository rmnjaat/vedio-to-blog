**[01:24:34] Teacher:** I can have one consumer, but I typically have multiple consumers to do search indexing as fast as possible. So search, this one that I drew over here. This one, three consumers that you see over here. So three consumers are there reading from this. So now what happens is in Kafka, because my number of partitions are three and I'll have multiple search consumers doing that part, and similarly I'll have counter consumers iterating at their own sweet pace on the same topic. When my search consumers are using their iterating, because I have three partitions, only three consumers can be active. So for example, search consumer one, and now this is handled by Kafka. You don't have to do anything. You literally don't have to do anything. Kafka handles this for you. So when you create a consumer, you say that basically this is called as a consumer group in Kafka. So for example, given that you have three partitions, you can have three consumers over here.

[01:25:35] Consumer one, consumer two, consumer three. Consumer one will read from partition one, consumer two will read from partition two, consumer three will read from partition three. And the messages are ordered in the partition. Here you see first message, first [?here | asr: "year"], second message over here. So ordering guarantees are within partition, not across topic. So it cannot guarantee that across topic the messages are ordered. The ordering is guaranteed within the partition, right? So for example, if user publish blog one first and then blog two, the consumer will read blog one first and blog two, who is iterating on that partition, right? But across partition, no guarantees. So now here what would happen is the search consumer that you have that is consuming from this particular partition, it will read all the messages from the first partition, consumer two will read from the second, the third partition. Now what happens when you add fourth and fifth consumer? Given that you have only three partitions, when consumer four starts and consumer five starts, they would not get any messages. When they iterate, they would not get anything because that's what the limitation of Kafka is. So the biggest limitation of Kafka is its parallelism. The parallelism of your consumption depends on the number of partitions of a topic.

[01:27:00] So if my topic has three partitions, I can have at max three consumers consuming from that. And I can have three, I can have N different types of consumers, analytics, counter, backend, something, something, something. But for each of them, I can have at max three different or three consumers only. I can have two, if I can have less than three also. For example, if I only have one consumer, then it will get messages from all these three [?partitions | asr: "parties"]. When it iterates, it gets iterated from all these three [?partitions | asr: "parties"] in a round robin way. But at max, you can have three consumers over here. That's the limitation of Kafka.

<!-- topic-candidate [01:27:45]: Kafka - committing -->

[01:27:45] One final thing about Kafka is when you iterate, how does it know that you are [?iterated | asr: "treated"] to a certain point? So which is where there is a thing called committing after you read a particular number of messages. So let's say my consumer, let's say my analytics consumer read first message, second message, then it can issue a commit to Kafka. And your Kafka will keep a track of that consumer one of analytics consumer group has read till this message. Then when the consumer reads another message, it starts from the same point again and then it commits that I've read till this point, it starts again, then it commits again that I've read till this point. So in case, let's say it read till this point, but before committing my consumer crashed off, not Kafka, but my consumer crashed off before committing. So when, although I process these four messages, but because I last committed over here, so when my consumer will resume, it will start from...

[01:28:46] Kafka does not guarantee exactly once semantics. Kafka guarantees at least once semantics. If you want to have exactly once, there are other ways to do it, but Kafka out of the box, and now it has also started providing some kind of exactly once, but it's still not truly exactly once. But as a simplistic view, it's, should be okay for you to reconsume different set of messages, oh sorry, the same set of messages again. You should be okay with that. So this is how you would tell Kafka that me as the consumer group, I've read till this point, now when I will resume, give me messages after this.

[01:29:24] This is what the committing of Kafka looks like, right? These are the basic things that you should definitely know about Kafka, and this holds true for Kinesis also. Kafka has partitions, Kinesis has shards. Same thing, different terminology, and underlying architecture nearly the same, right? There is no big of a difference between the two, the way these operate, all the message streams operate, they operate in this exact same, right? So understanding one helps you build an understanding of other, just API nomenclature, API and nomenclature, right? But this is the heart and soul of delegation, message queues and message brokers, right?

[01:30:02] And this is the essential of Kafka that you should know, because we will be using it throughout almost all the systems, almost, almost all the consumer systems that we design, and because that is the backbone, that is the heart and soul of delegation. So whenever we're delegating and we need multiple types of consumers, Kafka is, will be our default choice. But it's, there is one place where Kafka doesn't suit, and we'll talk about it in week...

[01:30:32] One place where Kafka fails miserably. Miserably. It's the worst that you can use then. Because a lot of people think Kafka is a magical solution. They sprinkle it like it's salt. Goes in every system. No. Consistent hashing. Very stupid solution in some cases. Kafka, very stupid solution in some cases. They are not magical solutions. You need to know the strengths and the weaknesses of it. And then you can make a [?sane | asr: "same"] choice. Okay.

<!-- topic-candidate [01:30:58]: Questions on delegation -->

[01:30:58] Any questions on delegation? Go on, Rajiv.

> **Student Question [01:31:03] - Student 9:** So, we have different groups of consumers. So, I just read somewhere that, each, consumer in a group can subscribe to a single partition. So if you have multiple partition, those members of the groups talk about.

**[01:31:19] Teacher:** Yeah.

**[01:31:20] Student 9:** Yeah. So now the, I always wondered at how these, I mean, since the partitions has different, messages, you know, the ordering is like scattered now. So how these consumers actually talk to each other to.

**[01:31:32] Teacher (answer):** I said there is no global ordering. That's what I said. I spent five minutes talking about it. There is no global ordering.

**[01:31:36] Student 9:** Okay.

> **Student Question [01:31:37] - Student 9:** So, but if a consumer wants to know all the message that it say you have distributed the messages across all the partitions. Now, if a consumer is subscribing to a partition one, but partition two and partition three also has few messages, right? So how would consumer one know about the messages in partition two and partition three?

**[~01:31:52] Teacher (answer):** No, consumer one. If there is only one consumer exit, we'll get message from all the three consumers in a round robin fashion. It is never that you specify you subscribe to only one partition over here. It's never like that. You can have less than n, where n is the number of partitions, number of consumers. You can have it and it does it in round robin. So one message over here, one message over here, one message over here, like this, it goes. But it's always better to have n is to n. So if there are N partitions, have N consumers, that's the ideal way to build that system, but still you can have fewer consumers than partitions. It's perfectly fine, but there is no global ordering.

**[01:32:40] Student 9:** Okay.

> **Student Question [01:32:42] - Student 1:** [unclear: "So got up."] Hi, so the basics of a message queue and stream are the same, right?

**[01:32:50] Teacher:** What basic, what do you mean by basic?

**[01:32:54] Student?:** There is a consumer who hovers over the items or messages.

**[01:32:58] Teacher:** Correct.

**[01:32:58] Student 13:** Yeah.

**[01:32:59] Teacher:** And then it's a buffer. It's a buffer where you are holding up messages and then consuming at your own sweet time.

> **Student Question [01:33:04] - Student 1:** So does that mean if the place where I should use queues is where I have only one operation to operate on?

**[01:33:11] Teacher (answer):** Correct. That's the best way to look at it.

**[01:33:14] Teacher:** So why don't we use streams? Because streams are, they at least seem to be more powerful than expensive, expensive cost. [check: "So why don't we use streams?" may be a student question] Okay. Cost. For example, SQS, AWS SQS bills you per message. Kinesis bills you for the duration that it is running. Right? So for a smaller workload, you'd go for SQS. Why would you want to waste money on streams? Because that infrastructure is constantly running. Cost is one factor that you should always think about. You are there to save cost for the organization. You can design as fancy of a system, but if it is not cost efficient, it will not see the light of the day.

> **Student Question [01:33:53] - Student?:** And how many number of partitions is better? Should we have more number of partitions for better performance or less?

**[01:33:58] Teacher (answer):** Depending on the concurrency, depending on the speed of consumption you need, you can have as many partitions as you want. Right. But depending on the consumption rate that you expect, you can add more partitions to that. Okay.

> **Student Question [01:34:13] - Student 1:** And the last limitation of Kafka that you talked about committing the messages. Can't we commit a limitation?

**[01:34:19] Student?:** That's a feature.

**[01:34:21] Teacher?:** A message. So we can commit at each message, right? Yeah, we can. We can commit at each message, but it's like too much. Like, but it's better to do batch commit. Why want to make network calls every time to commit?

**[~01:34:32] Student?:** Thanks.

> **Student Question [~01:34:32] - Student 2:** So message queue can have one consumer group or more than one consumer group?

**[~01:34:43] Teacher (answer):** Message queue. Message queue has all, all homogeneous consumers. These are all homogeneous consumers.

**[01:34:52] Student 2:** Homogeneous consumers. So that means like now one consumer group or more than one consumer group?

**[01:34:57] Teacher (answer):** One, one, one. All these are same, exact same. So they would read the same. Anyone who is reading the message will get the message. It's not that everyone is iterating their own sweet pace. That's what this visualization depicts. Right.

**[01:35:10] Student 2:** Suppose if there are more than one consumer group, then the solution is message stream, not message.

**[01:35:15] Teacher:** Correct. Correct.

> **Student Question [~01:35:16] - Student 2:** Okay. And other question, right? When a message is processed from queue or stream, [?happy path | asr: "happy party"] always like the process of successfully. Suppose if it's at consumer level in middle or somewhere, then how it intelligently can process the message again? So do we have to manually re-trigger or replay the message process?

**[~01:35:35] Teacher (answer):** No, that's a guarantee of the underlying queue that you're using. SQS provides different guarantees, [?RabbitMQ | asr: "rapid time queue"] provides different [check: sentence breaks off here, words possibly lost] called as a visibility timeout in SQS. So what happens is if this fails, then before deleting the message, obviously before deleting the message, the consumer failed, then after the visibility timeout, typically two minutes or 10 minutes, let's say 10 minutes. So after 10 minutes, the message would reappear at the front of the queue.

> **Student Question [01:36:03] - Student 2:** So what is the indication of failure? Let's say like no consumer is doing like, you don't delete it.

**[01:36:07] Teacher (answer):** You don't delete it. That's the indication of failure. The consumer after processing the message has to delete the message.

**[01:36:13] Student?:** Oh, it's part of the code.

**[01:36:16] Teacher:** You have to write it. You have to write it.
