**[03:02:13] Teacher:** [unclear: "belt"] and select top one, one in SQL. Oh, depends between top one, one select one. Okay. Uh, I've never, so select top one. It is. Do you also provide a where clause in that? Fair. Okay. Select top one, one. Oh, okay.

[03:02:32] Okay.

[03:02:32] Okay. So it just picking me selecting the very first record in the results. That means one. Oh, okay. The result, the row, you are just resulting, you are just returning one in case the row exists, kind of stuff. Yeah, yeah, okay. So with that, what you'll achieve? So select top one one from this table where some condition. So this way you check for the existence, right? And then if it exists, you do something, if it doesn't exist, you do something else. [check: teacher and Student 1 alternate in this exchange under one TEACHER label; some short lines here may be the student]

**[~03:02:58] Student 1:** Yeah, yeah, basically update operation after just checking that. So I was thinking like, like what, why upsert was not used there and why we are

**[03:03:09] Teacher (answer):** That is, that to your developer, your, your engineers might tell you better, but one disadvantage that I'll tell you of doing a select top one, one is you're still making one select query. Now imagine on raw TCP layer, a connection is established between a server and a database. First you fire select top one, one, you get a response one or zeros or something like that, right? You get that response. Then you do either insert or update. So one network call request, one network call response, then one either insert or update query and then one response. Right. Now here, the amount of time your database spends in evaluating that top one one is very minimum. Amount of time your database would require to do insert or update is also very small, very small. But so bulk of your time is going where? On the network. And now how many trips you are making? One, two, three, four.

[03:04:00] Four trips. If you would have done it with upsert, it would have just become one, two, done. Right? So you are still saving one round trip of your time, even though top one, one seems very optimal that you are not yet. Like you are basically solving the problem that I induced of reading huge value on the client side. You are saving that, but you're still spending time over network. With upsert you can say that. Yeah, yeah, got it. Right, but I'm not sure why they did not do it, but most probably a lot of people forget about upsert, to be honest. I've seen a bunch of production systems where people do get and set, but they forgot about upsert. So quite possible, right? Yeah. [check: the "got it ... not sure why" part may be Student 1]

<!-- topic-candidate [03:04:48]: Q&A - lock wait timeout exceeded -->

> **Student Question [03:04:48] - Student 1:** Yeah, I have one more question. So, with that exclusive locks for update. So we face this lock wait timeout exceeded, try restarting transaction. Yes. So yeah, basically when first transaction use that lock and it did not commit, then only this issue comes.

**[03:05:16] Teacher (answer):** Not really. It just about timeout. Right. When the transaction was waiting for a long time for other transaction to commit or abort, it did not happen. So you're just waiting and then your timeout exceeded.

**[03:05:28] Student 5:** Okay.

**[03:05:29] Teacher:** Because it is about that your first transaction who acquired a lock, it neither committed nor aborted in the stipulated time.

**[03:05:36] Student 1:** Okay. In our system, a lot of time we see this, this error like lock wait timeout exceeded.

**[03:05:44] Student 14:** Hmm.

**[03:05:45] Teacher:** So which means you should have fired commit or abort, which you are not. Right. That's the reason for that. So either your processing is happening for a very long time. So two reasons: either the processing is happening, like you are really doing a huge amount of processing and it has to be done for that long of a time. So which means that you need to increase your time. Otherwise it's very much possible that you, your processing is done, but you forgot to commit or abort it.

**[03:06:13] Student 1:** Okay.

**[03:06:14] Teacher:** Either one of these two.

**[03:06:16] Student 1:** Oh, fine. Thanks.

<!-- topic-candidate [03:06:18]: Q&A - soft delete vs hard delete, B+ tree rebalancing -->

> **Student Question [03:06:18] - Student 11:** Ashu. [check: name spelling; may be the teacher calling the student] Hi, so in soft delete, we are updating minus one, we are not hitting the entry because batch cleanup is doing that for us, but like within one operation, [unclear: "just accept delete update"], we can delete the entry right here if you delete

**[03:06:37] Teacher (answer):** B+ rebalancing. Every time you delete, your B+ tree may go out of shape, it needs to rebalance. It's a very expensive operation. That's fine. If you do hard delete over here, if you do delete instead [unclear: "I delete"], what would happen is B+ tree rebalancing. That's the problem. B+ tree rebalancing is an expensive operation. Deletes on data, pointed deletes on database is a very expensive operation. That's why. We spoke about it last week also. Okay. So read about B+ tree rebalancing. That's exactly what my video is about, but read about B+ tree rebalancing. Why that happens and what problem would it lead to when you are talking about databases. That's the root cause of it. That pointed deletions are expensive for almost all databases. So almost all databases do soft deletes and then do batch cleanups.

**[03:07:32] Student 11:** Got it. Okay. Thank you.

**[03:07:34] Teacher:** So yeah, you had questions.

<!-- topic-candidate [03:07:36]: Q&A - Redis lazy expiry vs cron job -->

> **Student Question [03:07:36] - Student 2:** Yeah. Continue to ask you this question first. So what Redis does is that every time a read is made on an expired record, it deletes it. So why can't we delegate it to a cron job? And I mean the third approach, because it is single thread.

**[03:07:52] Teacher (answer):** Oh, cron job. Okay. Why would you want to delegate it to? Because invoking a free on an object is very lightweight. It's not an expensive operation, right? We are not doing any [?B+ tree | asr: "deep list"]. Rebalancing. It's just a delete of the things. Right. And you are just marking the, in that hash table, the actual array based implementation of hash table, you are just marking that as free space. It's a very lightweight. It literally happens in microseconds. Right. You don't even have to worry about it. [check: next sentence starts mid-phrase] Enough, then you may think of delegating. Otherwise you don't need to, it is that small of a, because delegating it might itself be much more expensive than not, then basically doing it right there and then, especially in case of in-memory databases. Okay.

**[03:08:38] Student 2:** But how, I mean by delegating, I mean, we don't do anything.

**[03:08:42] Teacher:** Huh? So in case you don't do anything versus you spend time hard deleting it. Spending two or three microseconds into deleting sounds much better because you are freeing up memory right there and then. Now you can add more data to it. If you delegate it to be done after some time, now what would happen is your memory is still there consumed. So in, let's say if your Redis is operating at full capacity and you delete bunch of keys and it is waiting for the next cycle to come in, you are not allowing to insert new data which you could have inserted, which would have been successful if you would have immediately deleted the data when you are [unclear: "a heartache."]

**[03:09:26] Student 2:** Yeah.

<!-- topic-candidate [03:09:28]: Q&A - online/offline indicator, push vs pull, WhatsApp Web heartbeat -->

> **Student Question [03:09:28] - Student 2:** And in the last week's class, we'll be discussed online, offline indicator. Within that we chose pull-based model rather than push-based model, stating that the [?drawback | asr: "drop"] of a push-based model is that API server would we have to make an HTTP connection, which is based out of on top of TCP connection. Every few seconds, but at every time interval, right?

**[03:09:49] Teacher (answer):** No, push-based for online offline, which means that. Who is pushing where? User pushing to API server, right?

**[03:09:59] Student 2:** No, I meant API server asking the user. How would that happen?

**[03:10:03] Teacher (answer):** Does Facebook know your IP address if the HTTP connection is not established? No, right? Can you connect to user? No, right? No. You cannot. Because user's IP address you don't know unless user establishes the connection with you. Correct? Yeah. You cannot establish a TCP connection unless you don't know the IP address of the machine. So server doesn't know user's IP address to connect you user, [?knows | asr: "no"] server IP address to connect. Right.

**[03:10:30] Student 2:** Okay. That's why. That is why we went through this. And secondly, I opened WhatsApp Web and I, what I expected was that it would make a heartbeat message, every few, a heartbeat request every few seconds. Even though I know that it's, the actual implementation is based on top of WebSockets, but it should have made some call. Shouldn't it?

**[03:10:49] Teacher (answer):** [unclear: "In the next time."] It should not. Unless your WebSocket. A plugin, I'm not sure if it's a native setup or not, which disables WebSocket connection on your tab, on your browser tab. Try connecting web, WhatsApp Web over that, see, you might find something, you might see explicit heartbeat calls. Okay, try that, try that. I'm, I, I'm not done it, I'm not sure, but there should be something that exists like this. Like browser gives you support to throttle your request, where it can mimic the network speed, it can slow that thing down for you, right? Similarly there might be way to disable WebSockets and then see how WhatsApp Web reacts to that, because then you would see something. But given that WebSocket exists now, the connection, you don't have to send heartbeat ever, because if the connection is established, then user is there, if the connection terminates, user is offline, right? So you don't need an explicit heartbeat in that case if you [check: words may be missing here] existence of connection. So if you are doing that, then you would never see heartbeat messages flowing here and there.

**[03:11:58] Student 2:** Correct. Okay. Yeah.

<!-- topic-candidate [03:12:00]: Q&A - real KV stores vs KV store on a relational DB, upcoming weeks -->

> **Student Question [03:12:00] - Student 2:** And the last section that we discussed today, building a KV store, KV value stored on top of relational databases. I hope that's not how actual KV stores are built.

**[03:12:09] Teacher (answer):** No, no. What, which KV store are you talking about?

**[03:12:12] Student 2:** Let's say Redis and DynamoDB.

**[03:12:14] Teacher (answer):** Redis is different. Redis is in-memory store. I have a full course on Redis internal, like full course. Redis internals, how that happens. So that I feel definitely does not happen like that. Apache Ignite has been something like this. If you go through Apache Ignite source code, you'll find something very similar. But if you're talking about other DynamoDB, DynamoDB, obviously they don't, they don't use relational DB per se, right? I just use relational DB so as to help you all understand this micro optimizations, relation, how they slow down, how you get max performance out of your DB and whatnot. On. Right. So I just leverage this key-value store in order for us to be able to discuss in a simple terms these micro optimizations that you all should be aware of. Right. Much more than anything else. Right.

[03:12:58] We'll also discuss one more thing. Distributed cache, fifth week. There we'll build an in-memory distributed cache. Then we'll not use relational database at all, but we'll go into in-memory details and we'll see other specifics that you should be aware of. Then we'll just, we'll simplify the storage side by just storing data in an in-memory hash table, but we'll discuss all other peripheral details around it, right? Which transport to choose, why to choose, how locking would happen. Mutex, a bunch of stuff would be there, low level and high level stuff. Right? So that will cover that.

[03:13:35] Now on this persistent key-value store, relational databases makes it simple to understand. For everything else, just replace relational database and write your own storage layer. That's all it differs. We'll discuss that. Something very similar in sixth... I've got so much thing covered, man. So in sixth week, we'll cover two databases that do it. One with LSM tree and one with other implementation. Then we'll see different kind of storage engine for key values. God, I've covered that also. We have much of thing covered. Don't worry.

> **Student Question [03:14:12] - Student 2:** Small request, if we could share the code snippets, let's say for the designing of

**[03:14:15] Teacher (answer):** [?Arre | asr: "air"], no, write it, write it, write it. Why? I want you to make mistakes. If I share it, you just run it, done. No, when you write it, right, you make mistakes. I want you all to make mistakes.
