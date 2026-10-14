<!-- topic-candidate [02:36:28]: Q&A - read path / write path, Kafka partitioning -->

> **Student Question [02:36:28] - Student 1:** So, Arpit, one question that I have is, you said that read path and write path have to be analyzed and we should blow it in proportion, out of proportion to see how the scalability and all that stuff, right? But one question I have is, you have put a separate service, or you can say simple service, whatever, just for reading, and for writing, you have put another separate service, right? So don't you think...

**[02:36:52] Teacher:** What service are you talking about?

**[02:36:55] Student 1:** Can you please go to the other picture?

**[02:36:58] Teacher (answer):** You were talking about read path and write path. This is that only. This is your read path, so this is your write path, this is your read path. This is the exact same thing.

**[~02:37:03] Student 1:** Yeah, but you said that one thing that you mentioned was you want to separate them out in different services, right?

**[02:37:15] Teacher (answer):** The entire read path, we did not, I never said we have to separate it just because it is read path and write path. We separate it, we approach it as separate concerns, because this is web server, this is asynchronous worker. These two cannot be [unclear: "in sparta"] same thing. Correct? Yes, that's correct. We did not separate it because it's read path and write path. We separated because they had different responsibilities. Okay? These are all [?asynchronous workers | asr: "synchronous workers"], this is a web server. Correct? That's why we separated it. It's not because read path and write path is separated.

> **Student Question [02:37:51] - Student 4 (Mohan):** Yeah, I didn't really understand the part where you said the, you know, Kafka partitioning, how does it work when the write path...

**[~02:37:57] Teacher:** Because we talked about it second, we talked about it second week. What's that? We, we went in depth of Kafka partitioning, what it happens, how it does that. Second week we talked about it.

**[02:38:12] Student 4 (Mohan):** Spend one minute saying, for example, I have, let's say, you know, 20 hashtags, right? And so then how many, because partitions obviously cannot be as per number of hashtags, right? Yeah, yeah. So, so how do you bucket them?

**[~02:38:28] Teacher (answer):** Basically, you define n partitions, you measure the throughput that you are getting. If you're getting less, you increase the number of partitions. Simple.

**[02:38:39] Student 4 (Mohan):** Right, no, no, how will you sort of batch them together? So I have, let's say, 20...

**[~02:38:46] Teacher:** That's how Kafka works. That's how Kafka works.

**[~02:38:46] Student 4 (Mohan):** No, I understand the partitioning that way. Yes, no, wait, wait, maybe I have not explained the question clearly. All right, so let's say I have 20 hashtags, right? Now I have, I have posted it to Kafka, right? And it goes to, let's say, four partitions.

**[02:39:05] Teacher:** When you say 20 hashtag, it comes over here.

**[02:39:08] Student 4 (Mohan):** Right. So, let's say there are four partitions, because you cannot have as many partitions as there are tags. So, let's have four partitions. So, one counting server is reading one of the partitions, right? So, from that partition, there could be multiple hashtags which are not the same. So, how will they, the counting server now know, okay, in this partition I am reading now this many hashtags, but they are not the same, right? How do you...

**[02:39:37] Teacher (answer):** Hash map. It would read messages, extract the hashtag out of it. What will you send in the message in this Kafka? You will send in the message: this is the hashtag, this is the post ID. Correct? On the counting server side, have a hash table, do count plus plus and update map to count.

[02:40:04] What are you asking, Mohan? See, this is where you get hashtag and post. Correct? Here you have hash table. And you have an integer. You have to count plus plus every time you read the message.

**[02:40:17] Student?:** Okay.

**[02:40:18] Student 4 (Mohan):** Got it. No, no, no. That's okay. You know, we don't always, not everybody is as sharp as you. So please don't disperse the questions. [check: "disperse the question(s)" here and 02:40:26, 02:40:50 - dismiss?]

**[02:40:26] Teacher?:** No, I'm not disperse the question.

**[02:40:28] Teacher:** This is, it's not being sharp. It's not being sharp, Mohan. First of all, you distracted me. I have specifically said, please don't raise the question. And this is not, I'm not saying this is a stupid question. This is very simple detail where I cannot literally write every single line over here. I'm not here to implement the actual service. Correct? It's not dispersing the question, Mohan. And I'm not disrespecting you in any case. I'm just saying that this is something that you can very easily chalk up. It's not that difficult. I literally cannot spoon feed everything. I'm more than happy to answer questions. I've stretched the session still four, four and a half hours as well. And you know it, right? I'm a hundred percent without disrespecting you in any case. It just that this is something that you could think about. And I just, it's my natural reaction to it. That it's simple.

[02:41:23] Then you're just sending, if you need to count it or group it by hashtag, send that information that this is the hashtag. This is the post which is going over here. You can put it in a hash table and say, this is the hashtag. This is an integer which starts with zero, and do count plus plus. Once you have enough batch, you put it onto DB. And then that's how we move forward.

**[02:41:45] Student?:** Right. Sure. Thank you.

**[02:41:49] Teacher:** Mohit.

> **Student Question [02:41:50] - Student 3 (Mohit):** Yeah. I have a couple of questions. First is, when we are getting those top hundred items from popularity service. Like, I think in this, we have assumed that the popularity service would also be giving popularity based on hashtag. Whereas that we don't care about it. No, whatever the logic is, extension to that is basically, if that is not based on hashtag, then you would probably need some sort of, like this adapter to get the hashtags from there as well. Right.

**[02:42:24] Teacher (answer):** If they need it, if they need it, they can consume it from here as well. They can listen to this Kafka. Correct.

**[02:42:32] Student 3 (Mohit):** Okay. Got it.

**[02:42:33] Teacher:** Here we anyway have that information. Why do we use that? Right. Why do, why do they have to rebuild that same thing that we did over here? So that's a great question, because now if they want to leverage that this photo is clicked this many times and like something like this has happened, they can, if they want data which is there in this Kafka in that specific format, consume, process here. The consumer of this Kafka right now is the counting server. Right. And tomorrow they might, like data science might also start consuming from this Kafka to do their crunching, if they want, if they want.

<!-- topic-candidate [02:43:06]: Q&A - Redis Pub/Sub vs Kafka -->

> **Student Question [02:43:06] - Student 3 (Mohit):** Okay. One more question. Like, this is slightly, can go little off tangential. This is around the Redis Pub/Sub. I think we use Redis Pub/Sub in our chat application design as well, wherein the idea was to kind of model each group, or each, I would say, membership as a Redis channel, right? To basically send information between different chat servers when WebSocket clients are not attached on the same server. So now your membership could also grow in a huge volume, right? You could maybe have millions of membership, right? Which in case of WhatsApp would be mimicked as WhatsApp groups. So you said, when we were doing this hashtag extraction part, that Redis Pub/Sub would kind of be, can be an overkill and it will have a huge, so like, I just want to have your thoughts on this, like how does Redis Pub/Sub fits there and not here? Like these are...

**[02:44:19] Teacher (answer):** It would not... There we needed real-time Pub/Sub. Here we don't need real-time. When it is real-time, it does not give you persistence. Whichever connection, whichever server is connected to Redis at that time, subscribe it to that channel, will get the message. Correct? Here, we do not want that. Here, [?a counting service is | asr: "accounting services"] consuming at its own sweet pace, we still want messages to be persistent over here. If not, what would happen is, what if one of the server is down? [?Hashtag extraction | asr: "Hashtag extension"] is sending the message. Other server is down, which is never receiving it. And that message is discarded. Do you want that? No. You don't want real-time Pub/Sub. You still want Pub/Sub, kind of Pub/Sub, but you don't want real-time Pub/Sub. That's what the differentiation is. Here the counting servers can count it at its own sweet pace.

**[02:45:09] Student 3 (Mohit):** Okay. Okay. ...was the difference here.

**[02:45:14] Teacher:** Persistence and speed of consumption.

**[02:45:17] Student 3 (Mohit):** But I think if I keep the persistence part aside, I think speed of consumption, I think [?Redis | asr: "a resist"] would also be...

**[02:45:29] Teacher (answer):** This would bombard a server. Let's say there is a very popular hashtag. Very popular. A lot of things are popping out. [unclear: "Continuous state"] would send the message across, one of the server would keep on getting bombarded, because it's push based, not pull based.

**[02:45:47] Student 3 (Mohit):** Okay. Okay.

**[02:45:49] Teacher:** Consumers are pull based.

**[02:45:50] Student 3 (Mohit):** They are batching. Yeah. Yeah. Okay. Got it. Those are batch mode. Okay. Fine.

**[02:45:54] Teacher:** Plus, plus this is also adding to the DB. So [unclear: "these are over well"], they put data out. So they need to batch and then write. If this DB is overwhelmed due to any reason, the write would take time. By the time the message comes in, this would get overwhelmed even further. So slowness of your database would also affect the rate of consumption. In case of real-time. Got it?

**[02:46:22] Student 3 (Mohit):** Got it. Thanks. Thanks a lot.

**[02:46:24] Teacher:** Yeah. And then we were able to use it because that was our use case. We wanted, because the latency had to be minimal. We had to push the messages to the user rather than users pulling it out, because server could not pull the messages. We anyway wanted very low latency because it was chat. Right. [missing ~02:46:40-02:46:43] ...subject. Great question. Loved it.

<!-- topic-candidate [02:46:46]: Q&A - popularity service via webhooks instead of Kafka -->

> **Student Question [02:46:46] - Student 8:** Yeah. Hi. So my question was regarding this popular, a popularity service. So instead of, like, having a separate Kafka, would it be like more sufficient? Like, if the popularity, this service directly call, like, use webhooks and directly call the API servers.
