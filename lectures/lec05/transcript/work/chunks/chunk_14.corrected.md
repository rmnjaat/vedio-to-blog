**[02:38:15] Student 1:** Huh, yeah, go on. [check: "huh yeah go on" may be the Teacher letting the student continue] So, so my point is, imagine TTL is two second and now is one second, so the time to live is still two seconds, right?

**[~02:38:23] Teacher:** But now is only, TTL is expired at, the absolute time of expiration.

**[02:38:31] Student 1:** Sorry, I just, maybe just, I'm not getting, TTL as, TTL is expired, absolute time of expiration?

**[02:38:37] Teacher:** When your time needs to, when your key needs to be expired, it would be like 12 o'clock. Okay. On this particular day.

**[02:38:44] Student 12:** Okay.

**[02:38:45] Teacher:** So then when you're setting, you, what you have to do is you have to set it to a magical value. That's a minus one. Right. If you had expired at is greater than now, then only you set it, other than you don't set it. Correct. If the keys get to expire, then only you are deleting it. Otherwise why would you delete it? Correct. Okay. Batch delete is different. That is clean up. Where you are doing TTL is less than now, where keys that are already expired, delete them. Here we are updating soft deletes. Okay. Correct. Okay. Okay. Yeah. Right. Updating, setting TTL to a magical value, to a magic number, where it is not yet expired. You are hard deleting when it is expired.

**[02:39:37] Student 1:** Oh, okay. So these are yet to be deleted of the first one, this is user delete operation.

**[02:39:42] Teacher:** User triggered a delete of a key, okay? You are not going ahead and deleting the key, hard deleting every time, otherwise it would require rebalancing of binary trees, correct? Oh sorry, B plus, right? You're not doing, you're doing batch delete afterwards, okay?

**[~02:39:54] Student 1:** And that's why you said that reducing the load on disk, only if it, TTL is greater than now, because anything less than equal to that is anyways taken care by the batch, so you don't want to worry about that, correct?

**[02:40:09] Teacher:** So you would save on disk IO by not having to write it to the disk, because this update would fail, because this would not let it match to the keys, right? Okay. So even though you are firing an update, it would not lead to any disk IO for expired keys, okay?

**[~02:40:20] Student 1:** So basically heads you win, tails also you win kind of a mechanism, because it's greater than now, so you will do it, if it less than now... Okay. Thank you very much.

> **Student Question [02:40:34] - Student 2:** Sidesh? [check: "Sidesh?" may be the Teacher calling on a student; name spelling] Hey, I have a question on high-level architecture diagram, like clearing my understanding. So assuming that the background MySQL provides all ACID guarantees, if we design it as it is without any partitioning, we guarantee the same ACID properties in the KV that we design.

**[02:40:55] Teacher (answer):** Yes, we do. Sure.

**[02:40:57] Student 2:** Yeah. But when we partition it, I, my understanding says we lose atomicity because we do not...

**[~02:41:01] Teacher:** It's a key based operation.

**[02:41:10] Student 2:** No, no, yeah, I agree. Like, what I'm trying to say is, for key based yes, but the original store gave you an additional way of saying for atomicity in a transaction. If I have four keys, like take the airline example, right, all of them will be satisfied. Now if your four keys, in the partition database, three lie in one and one lies in the second one, you can guarantee only three...

**[02:41:36] Teacher:** Value databases don't do that. Key value databases give you operation on a key based, right? No, no, I agree, I agree. So if you're doing cross partition, then you cannot have ACID, as simple as that. You cannot have ACID guarantees across partitions.

**[~02:41:48] Student 2:** Got it, got it. So basically when we say this, we will, we still have ACID with the interfaces that we have provided.

**[02:41:57] Teacher:** Correct. Correct. But so distributed transactions, they reduce your performance by a huge margin. You typically don't do that. So which is where you still guarantee ACID, but within a shard. You may still get it. For example, for all the keys, I can still guarantee ACID. Let's say here I can still guarantee ACID so long as all the keys that I'm performing operations on lie on the same node. So in this range, I can still guarantee [?ACID | asr: "us"]. Yeah.

**[02:42:27] Student 8:** Thanks. Yeah.

> **Student Question [02:42:34] - Student 6:** Hi, Arpit. So my question is like, I mean, there was a time sometime some years back a person from IIT Delhi created an app where he, for the booking, I think he had created an app which made faster booking. So do you have an idea on how he has done that?

**[02:42:53] Teacher (answer):** No idea about it.

> **Student Question [02:42:55] - Student 6:** Okay. The second question was with respect to mocking of the distributed system in local machines. Like, I mean, you mentioned about the MySQL server having, for the data side, but how can we mock? I mean, the application app servers and all that, you need one app server.

**[02:43:11] Teacher (answer):** [unclear: "Why do you read?"] I've been with the entire [unclear: "Atlantic and"] system local. Correct. Yes. Just focus on the things that matter. Don't go into, I want autoscaling and multiple large requests. What you want is granular details, [unclear: "devils"], you want to know that, you don't want to do that same stupid CRUD operation again and again, correct? What you want to, what you should focus more on this part and not other part, right? Just your local machine, one database running locally, one replica running locally, that's it. Focus on that. Focus on things that matter.

**[~02:43:40] Student 6:** Sure, thanks.

**[~02:43:40] Teacher:** Yeah, Amrik. [check: name spelling]

> **Student Question [02:43:49] - Student 2:** Yeah, I have a question on that random sampling and deletion. There was one point that if the deleted ones are greater than 25, then repeat the process. Shouldn't it be expired ones?

**[02:44:06] Teacher (answer):** Are they expired? They are deleted. These deleted keys, delete from the sample. So if the number of deleted keys from the sample are greater than 25%, it would not know expired keys count. [unclear: "or knows expert is counted."] And that's already slow operation. Out of this 20 keys at a sample, [unclear: "It is finding good folks. Not listen."] Yeah. 20 keys. I take sample of 20 keys. Out of this 20 keys, I find which one are expired. The ones that are expired, I delete them. If this deleted keys are more than 25%, I repeat the entire process. These deleted keys. That's what I said, right? Delete all the keys that are expired from the sample, and you deleted keys are more than 25%, you repeat the process.

[02:44:51] So it's only doing it on the sample, not on the database, because having to do it on database is a huge operation. At a given stage there might be millions of keys that are expired but not deleted. Here it's doing just small operations very quickly. So what it is trading off, it is trading off that there might be some keys deleted in population, but it's okay, there would not be more than 25 percent of that, because sample represents the population. Okay?

**[~02:45:21] Student 2:** Okay, thanks.

> **Student Question [~02:45:21] - Student 1:** Yeah, so question around the sampling thing only. I wanted to ask that we can't do this in [?disk-backed | asr: "this backed"] DB because, first thing what I can think of is, like, we will be getting all the records and then filtering out top N number of records, and we have to do a [unclear: "complete trade"], and secondly, I think the, we are, if we are deleting that, we have to do a rebalancing. Or here, do you think, like, any other thing which would be hampering us?

**[~02:45:59] Teacher (answer):** That the first, first thing that you said, it's not that you, because, so you may not have to pick up entire set of rows and then pick 20 out of it. You may pick 20 random rows, but it would require you to do 20 random disk IOs, very slow, right? Because 20 random disk IOs, your data may be present anywhere in the disk, you're reading disk pages randomly, that is very slow. You cannot just read random rows from the database efficiently, right? In memory you can very, very easily do that. On disk you cannot do it, right? So picking up 20 keys from an on disk database is a costly operation, because of which you cannot do it, or rather you should not do it, because it be very slow. It would be much better if you just skim through the rows and delete what you, at this point, delete what is expired, rather than doing this optimization. In memory, it would work just fine.

**[02:46:54] Student 12:** Okay.

**[02:46:56] Teacher:** But what you said, I just elaborated on the first point. Right. And that is like, it's not like you can still pick, but picking up random 20 keys from it is expensive, rather than, you don't have to pick all the rows and then sample it. You can just pick 20 at random, but picking those 20 at random is an expensive operation, because 20 random disk reads, very expensive. So you typically avoid. Any other question, anyone?

**[02:47:26] Student 2:** I have a bunch of them on the last classes.

**[02:47:30] Teacher:** Okay. Let me ask someone, anyone from this class? Ajay. [check: name spelling]

> **Student Question [02:47:35] - Student 1:** Yeah, hi. So I have question regarding, we do that start transaction and then we are doing that for update and then we commit it. So in database, by default, auto commit is true. So will it work without we do start transaction, like we do for update?

**[~02:47:49] Teacher (answer):** No, auto commit is true for shell. If you do auto commit, it's on. Yeah, it's on transaction level. On transaction level also there to take locks and do it exactly how we did it. Right. Okay. So even if auto commit is false or true, so auto commit is true. When you say auto commit is true, it means when the transaction is committing, it is committing, it is not that every single line it is committing. When you start begin transaction and then write and then end transaction, that is actually a transaction. But if you just fire one standalone SQL statement, that would be committed. That's what auto commit true means. Okay. Right. So if you just tried one random statement, they're not wrapping it in a transaction, that is where your auto commit true comes in. But if you're wrapping it in a transaction, it would anyway not do it. Thanks.

**[02:48:41] Student 8:** Okay.

**[02:48:42] Teacher:** Rahul.

> **Student Question [02:48:43] - Student 3:** Yeah. Hi, Arpit. So my question is on the first discussion that we had on locking. So we discussed two approaches, for update and for update, skip locked. So you told that for the, for update thing, we'll run N into N plus one by two queries.

**[02:48:59] Teacher (answer):** Not queries, evaluation of queries. Evaluation of queries. [unclear: "from RN would still fire inquiries"], internally database will evaluate those.

**[02:49:08] Student 3:** Yeah. So basically what happened is, suppose 120 threads and all of them at the same time got the seat one. And you told us that the, that one of the thread will get the execution, where we'll, we'll be faster than the others, and it will get the first seat, and the database will then trigger the other thread that the row one is filled, because they were waiting for the seat one, and then the database will trigger that the row one is filled. Now they will reevaluate the query. The database internally will reevaluate the query. And that is why you said that N into N plus one by two queries. Correct. Correct. Because for the next 119 seats, now the locking will happen on the seat two. And then all the, all of them will wait for the seat two, and then 118 will wait.

**[02:49:50] Student 8:** One would move forward. Yeah. [check: possibly the Teacher interjecting]

**[02:49:52] Student 3:** So on and so forth for the subsequent queries. But for the for update, skip locked...
