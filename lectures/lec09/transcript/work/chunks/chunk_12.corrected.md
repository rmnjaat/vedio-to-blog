**[02:11:54] Teacher:** Okay. I'll provide a hint. Sandeep, this is partitioned by user ID. So what we can do is on the consumer. Wait, wait, wait. Let me finish. Right. It is partitioned by user ID. It is partitioned by user ID. [check: possible ASR duplicate] What we want is. Think of it. A post has multiple hashtags. Let's say I have three hashtags in one post. So post 31 is published: hashtag sunset, hashtag sun and hashtag nature. Right. Now, how would this go over here? Now start.

**[02:12:30] Student 1:** Yeah, so what I was thinking so if all, so from the user ID, the consumer services can just read that post and it can pass the hashtags and then you can, then that partition based on the, you can put like a, we can use the principle of a vague idea of sharding, you know, like for example, sunset, anything from A to B can go to this partition.

**[02:12:59] Teacher:** That's the partition key. You're defining that other Kafka with partitioning key being hashtag.

**[02:13:04] Student 1:** Yes. Yeah. Something like that. So in that way, you are basically funneling the hashtags into one service using two, what do you call it? Two Kafka, very similar to that of, you know, how search index works. So we have two Kafka or something like that.

**[02:13:21] Teacher:** Correct. So what you're doing is you are adding an adapter in between [unclear: "post-job"] and that's exactly what I wanted to bring out. That because this is partitioned by user ID and for this to be efficient, you want all post by one hashtag. So one hashtag over here, here one hashtag is a set of hashtags. So all the posts of a particular hashtag should go to the same server for it to effectively batch. Otherwise it would eventually be doing count++ every time over here. So you don't want to do count++ but you have to do count++ equal to n. Now n could be anything depending on what your batch size is.

[02:13:58] Now for you to leverage that, what you have to do is, here you have to consume the message and re-ingest it in another Kafka and then reprocess it, something like this. So from this user ID, these are your hashtag extractor, whose job is to read the caption, extract the hashtags and make these many entries in this Kafka, which is partitioned by hashtag. And then consumed by this set of workers and then write to the [unclear: "readouts"].

**[02:14:40] Student 1:** That's what I was having in my mind.

**[02:14:42] Teacher:** Yeah. And this is a, this is really good way to do this because now with this, what you're doing is we are ensuring that all the posts for a particular hashtag will always go to one server. FYI, this does not mean we would have one partition for each hashtag. It's hash based partitioning that we discussed second week, right? You might have three partitions. Millions of hashtags can be indexed onto that, right? [unclear: "It's in"] hashtag passes the hash function. One value [?pops out | asr: "cops out"] and you put it into that partition. So you don't need, if there are a million hashtags, you don't need million partitions, FYI.

[02:15:17] So for a particular post, when it comes to this particular partition by user ID, consumed by multiple consumers, not just one consumer, there will be multiple consumers consuming it and they are extracting the hashtag and writing those many messages over here, consumed by this set of workers. This is your counting service. This takes care of counting. It batches and counts because all the posts of a particular user will go to one server. The batching will be very efficient and it will not be count plus equal to one but count plus equal to n.

<!-- topic-candidate [02:15:50]: Batching for large volume counting -->

[02:15:50] And this is a very standard principle of doing large volume counting. Whenever you are counting something in huge quantities, what you have to ensure is you are leveraging batching. If you do not leverage batching, then almost you are doing count plus plus every time. What it would lead to is, it would lead to having a lot of micro writes on your database and your database would be choked, you have to over provision your database. So best way to get performance out of your database is to batch the writes that are doing. For example, you can fire 100 insert statements in your relational database, any database per se, but you can also do in one call, you can write 100 queries and fire a batch insert or a bulk insert. Bulk insert is 100x faster than single doing that insert one at a time. So it's really important for you, whenever you can batch it, do batch it.

[02:16:44] So this is a standard adapter pattern that I wanted to highlight. And you would not have discovered this without going into this granular details. Because it's every one service that counts and updates a DB. No. Think about implementation. You think about implementation, you realize this problem, because the first solution that would come to me, hey, why can't I partition it by hashtag? You cannot, because this is a standard Kafka where all the post publisher going anyway. So that cannot change, because this, from this Kafka, you have your search running, you have an analytics running, you have a notification sending it, whatnot.

[02:17:20] And one of the things that we are plugging in, in this hashtag counting service, so that is where we add hashtag extractor, whose job is to extract the hashtag and create tuples and put it over here, consume it over here and update [?a count | asr: "account"] over here. Here what we are compromising on, that in case some nodes go down, we might recount some things multiple times. Should be okay, because it's not a, we need very accurate count, because in the UI we are not showing very accurate. Even if we are showing, let's say, 1.2 million photos over here, we are only rendering 100 over here. We are not rendering all of them. So user is not going to check it. So it's fine. It's fine. If we have little bit of inconsistency in the data. Right? So we don't need strong consistency every time. You can relax some constraints when you are doing things at scale. Some numbers here and there does not matter much. Right? Because there is always an error rate when you do things at scale.

<!-- topic-candidate [02:18:17]: Super fast response time - everything in one document -->

[02:18:17] Okay. So we covered storage. We covered counting. Okay. Oh, and we talked about super fast response time, depending on the guarantees, which one are you picking and why, right? One thing is to ensure that you have to think about the way that, because you want to [?render | asr: "enter"] this page in one shot, every single information needs to be there in one document. If not, what would happen is, if you're getting counting services different, which is giving me the count, top hundred services different, which is giving me the top hundred, [unclear: "Solana"] services different, which is giving me something, then your response time automatically increases. You are serving a critical path. You have to ensure you are doing the bare minimum network IO possible to [?render | asr: "enter"] that particular page. So that is why we are storing the top 100 photos in this database itself and not making a call to data science service to get that information.

<!-- topic-candidate [02:19:13]: Populating top 100 photos from the data science service -->

[02:19:13] So now the next question is, how would this information come over here, be populated in this database? DK?

**[02:19:29] Student? (DK):** Sorry, I wanted to ask some questions later. After this, after this.

**[02:19:33] Teacher:** We have changed the context. [check: speaker - may still be DK] How would this information come over here, this top 100? Sandeep?

**[02:19:48] Student 1 (Sandeep):** So I think a top hundred, the criteria can be defined, right?

**[02:19:52] Teacher:** Like for example, black box for us, as I said, black box for us, data science does it. We don't care how they do it. We don't get the most recent hundred.

**[02:20:01] Student 1:** Okay.

**[02:20:02] Teacher:** We are the owner of this page. That is a black box for us.

**[02:20:05] Student 1:** So now that that is already being taken care of, then what I can do is I can, you know, I can sort all my posts based on that criteria because I have the number metric value. I can sort it.

**[02:20:19] Teacher:** Assume there is a service that notifies us when it generates the top photos for a hashtag. Data science is doing that for us. Whenever it generates for a particular hashtag, it generates the top photos, it notifies us. So how would that flow fit over here?

**[02:20:36] Student 1:** So if it is already doing it, then we can just call it and get the data, right? So what do you mean by how does that flow fit?

**[02:20:42] Teacher:** We cannot call it. We have to store the data over here. How would we get this data over here? How, how are they notifying us? Let me start with that. How are they notifying us? Will they give us a call? No, it's a programmatic system. How would they notify us that there is new thing? Like, we have done a new top 100 for hashtag sunset. Now consume it. How would they tell us?

**[02:21:08] Student 1:** So what we can do is we can have another service that, that will be list. There is this notification service and there can be another service that is listening to this notification service, will send an event through any messaging queue. And this service, which is listening to that event, the moment it sees, okay, [?for | asr: "first"] sunset, a new batch has arrived, then it can just pick it and update it. So, but then it comes at an expense. Like you need to have a separate service who is constant. And that is listening to a messaging process.

**[02:21:39] Teacher:** It's a simple server processor service service. It's not a service. Server, the idea [?being | asr: "big"] that they give us this in Kafka, we read from it and we update it over here. Simple.

**[02:21:51] Student 1:** Yeah.

[02:21:52] Yeah.

[02:21:52] Yeah.

**[02:21:54] Teacher:** So that's like, I just wanted, basically, nothing against you per se, but a lot of people I see make this mistake. Oh, service. It's not just a simple set of servers doing something. It's a process that is running whose job is to, like, your data science team. Someone notify us. They would notify us by pushing a message, a notification. Where are they notified? Kafka, best place. They send, whenever the data science service does something, the push an event onto Kafka, we consume that event, basically getting the top hundred post IDs, and we update it in the database.

[02:22:29] Why are we doing this? Yeah. Why are we doing this? Because we don't want to make a network call every time someone reads to their service, because then uptime of our service depends on the [?uptime | asr: "type"] of their service, because of synchronous dependency. That's why wherever we can model things [?as asynchronous | asr: "are synchronous"]. And here we very beautifully see how Kafka becomes the glue that joins these multiple services together. And which is why Kafka became widely famous, because of this ability. The CQRS pattern that you might have heard of is because of this. It makes things so neat. And then it just.

<!-- topic-candidate [02:23:11]: Hashtag service - full flow -->

[02:23:11] This, right. So just to cover this few things on the side, like just to basically formally cover it, this is what our flow would look like for this very simple looking page. This is what we would do. So this is your not image service, but this is your post service.
