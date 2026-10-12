**[01:39:05] Student 1:** I guess, or this also I will choose [?varchar | asr: "worker"], but I guess...

**[01:39:11] Student?:** Instead, [unclear: "pick block"].

**[01:39:14] Student 1:** By very large objects.

**[01:39:16] Teacher:** You can literally store anything in that. Now, what you said is partially true. What you said, it depends on what we are storing. No, it does not depend on what we are storing, but how we are accessing it. For example, in MongoDB, MongoDB is also key-value store. So in MongoDB, when you are storing, you are storing JSONs and you are allowed to query on that. So let's say you have some row ID and then against which you store a JSON, and if you are allowed to query on a particular attribute within that JSON, which means you need query capability within the value, then you need to have the [unclear: "copyright type"] over here. But if you are just doing key-based accesses, you are not querying within the value. For example, if you would have stored value as [unclear: "IKT"], then you can do range queries on that if you want to. But if you are not allowing that, so depending on how you are allowing your users to access the value or query the value, if they are even allowed to do so, that would determine the type of.

**[01:40:22] Student 1:** So if we are doing the case you just said, like we are querying the JSON inside that,

**[01:40:32] Teacher:** so then this wouldn't work. Then you would not go for blob. You would go for a type that supports that. For example, JSON plugin of MySQL, or now it is natively supported.

**[01:40:39] Student 1:** I will just like, I will just create rows of that type, like which would be multiple.

**[01:40:46] Teacher:** You can implement it however you want. But the idea is depending. So here, because we are building this key-value store, we would [unclear: "remain as well"] that a query would be on key and not the value. Just use a blob that would allow us to store any type of objects there, or even basically [?varchar | asr: "where it"] would do, or long text would do. But idea is that we are not penetrating within the value to support some functionality, like we are just using values as black box. Okay? Okay, so that said, so that's good enough schema to start with.

<!-- topic-candidate [01:41:15]: TTL and expired at -->

[~01:41:15] Now, apart from that, look at this option. [?I'll pull in | asr: "i'll pull it"] Sandeep. Sandeep, we want to implement insert, we'll add it, update, we'll update it, TTL. So any other column that you would need over here?

**[01:41:33] Student 1:** [check: teacher called "Sandeep"; label STUDENT_1 may be a different student] The naive approach would be to have another column that will specify the time where the start time or when the insert a time. And accordingly, we can have another job that will check this time and accordingly it will flush it out.

**[01:41:49] Teacher:** Wait, wait, wait. So you are adding a created at?

**[01:41:52] Student 1:** Yes, that's correct.

**[01:41:54] Teacher:** Okay. And then?

**[01:41:56] Student 1:** Yeah. So this created at, based on the created at, we can deduce how much time it can live. For example, if my TTL is key specific.

**[01:42:05] Teacher:** So every key will have, can have a separate TTL.

**[01:42:09] Student 1:** Okay. Then in that case, I don't think, then we need to have another column, right? Because now it is key specific. We need to have created at and the TTL together.

**[01:42:20] Teacher:** Okay. You'll store. Yes, okay. So let's say we operate a granularity of seconds. Okay. And then we should [check: speaker change mid-sentence; "And then we should" may be Student 1]

**[01:42:28] Student 1:** also have another job that is running in this particular, in, in this particular key-value store that checks, it would take created at plus TT-, plus TTL second should be less than the current time. What will the query look like? My query, okay, mike, can I say it in plain English? Delete something something. Yeah, so delete key if current time minus created at, if current time minus created at is greater than or equal to TTL, is actually equal to TTL.

**[01:43:12] Teacher:** Actually not even greater than, why not equal to, [unclear: "his worst source your job did not try"], yeah, yeah.

**[01:43:20] Student 1:** I think this should be some job of, you know, clearing out records.

**[01:43:25] Teacher:** This is the worst query that you can write. Why? Tell me this.

**[01:43:34] Student 1:** Because you're scanning through each and every row.

**[01:43:38] Teacher:** Exactly. You cannot leverage index because this is a dynamic computation. Correct? You do this subtraction, you would never know it is greater than or less than TTL or not, so you would have to literally go through every single row every single time and then delete it.

**[01:43:58] Student 1:** So what's a better way to decide? Maybe we see the better way would be, we see the problem is that computation, right? So what if we get rid of the computation and you can somehow figure out that this has crossed your TTL.

**[01:44:13] Teacher:** So how?

**[01:44:15] Student 1:** Yeah, so that means we need to have a mechanism that will tell me that this is expired. So this particular entity has expired. So how do I get that? That's what I'm thinking. But do you have any pointers? Maybe I can segue into that.

**[01:44:36] Teacher:** You don't need created at at all.

**[01:44:39] Student 1:** But how do I know that, but I, but I also need to know from the measuring time, right? The start time from when it is inserted.

**[~01:44:44] Teacher:** Okay, let me pull in someone else. Think about, think about it, you don't need created at all. Okay, I'm just picking someone at random. Yes, Simran, what would you do?

**[~01:44:58] Student? (Simran):** Yeah, I was thinking to add a valid till rather than adding a created at, so we can have a separate table for TTL seconds and just add here the valid till time and based on that. Yeah, and we can index on that and that would be faster than what we have currently.

**[01:45:19] Teacher:** [unclear: "till it"] store where expired at is greater than equal to TTL, is greater than equal to the TTL. Oh, sorry, not even TTL is greater than equal to now. Oh, sorry. Where expired at is less than equal to now. Right? So this way, all we can do is when we are storing the key, if, if let's say someone has specified a TTL to that key, instead of storing created at and TTL, we directly store the expired at time. Assuming we don't need created at, in case you need to just store it. With this, you can just need one index on expired at and this becomes a really efficient query. Delete store where, basically delete from store where expired at is less than equal to now. This would be really efficient operation.

<!-- topic-candidate [01:46:12]: Delete -->

[01:46:12] That being said, we have another operation called delete. How would you do delete? Jodhinder [check: name spelling]?

**[01:46:20] Student 4:** Okay. So I didn't think about the delete one. I was sort of... Think about it. [check: "Think about it." possibly Teacher]

**[01:46:25] Student?:** Brain stop. Think about it. [check: possible ASR duplicate of 01:46:24]

**[01:46:27] Student 4:** Can be like two ways. We can probably have a soft delete where we just mark it like as deleted. And we can run like sort of like a background job, which like deletes it because again, you'll need to probably like balance some internal data structures once you delete something. So yeah, so soft delete can be there.

**[01:46:53] Teacher:** So soft delete, you'll add a column.

**[01:46:56] Student 4:** Yeah. Or you can just maybe like change expired at to some negative value.

**[01:47:03] Teacher:** Okay. Let's say I add a new column. What happens with that? Let's add is deleted.

**[01:47:09] Student 4:** Yeah. So you can just set it to true and you could have another job that sort of runs periodically and clears out all these deleted rows.

**[01:47:19] Teacher:** That would do delete from store where is deleted equal to true.

**[01:47:27] Student 16:** Yeah.

**[01:47:28] Teacher:** So now you have two background jobs to, one that deletes. One that deletes the expired entries, another one that deletes the soft deleted ones. Now what you also said is you'd want to piggyback it on expired. Yeah. Okay. With this, what, what are you proposing?

**[01:47:50] Student 4:** Yeah, just set it to some negative value, which would always be like smaller than time.now or something.

**[01:47:58] Teacher:** So your delete is equal to update. So it will be like update store set expired at. Yeah. Equal to minus one. Yeah. Where something, something, something, where key is equal to something. Yeah. What, what does this save us? This saves us from.

**[01:48:18] Student 4:** Having two background jobs. Perfect. [check: "Perfect." possibly Teacher]

**[01:48:21] Teacher:** Now you just have one? You just have one.

**[01:48:24] Student 4:** So like obviously CPU is being used less. And there's less load on the disk also. Less reads are happening. Yeah, I guess. And storage.

[01:48:37] Storage. [check: repeated "Storage" may be crosstalk with Teacher]

[01:48:37] Storage obviously, yeah. Storage obviously. And yeah, once you have the job also and you have to like probably implement it read path as well. That when you read something, if the job has not yet run, you probably want to filter there as well. That once you're reading, just check if the key is expired. It's possible that the job is not run at that point.

**[01:48:57] Teacher:** Yeah, we'll, we'll come to that when we do get. But just one question. Now, what is your SQL query of your job? Given that you are storing minus one in expired at for the values that are deleted.

**[01:49:09] Student 4:** Yeah.

**[01:49:11] Teacher:** What's the SQL query for the background job?

**[01:49:13] Student 4:** Yeah. So it will probably be like delete, from store where expired at is less than like now.

**[01:49:28] Teacher:** That's it, right? Yeah. Now this matches both the things.

**[01:49:32] Student 4:** Yeah.

**[01:49:33] Teacher:** This not only matches the rows that are expired, but also the negative values. So it's been soft deleted also. So this is such an elegant solution that solves both the things in one SQL query itself. You don't have to have one thread that is deleting the time based of and another thread that is deleting the soft deleted value. What you are doing over here is you are simply writing this one query that beautifully absorbs both the cases. It's such an elegant implementation. Okay, and this just puts minimal load whenever, because you would have expired at index, solves a ton of problem for you. Okay? So up until now we talked about delete. So our delete is basically an update operation, so update store set expired at equal to minus one where key is equal to K, that is delete. So we did soft delete and we triggered a background. So we have, we talked about schema. We talked about background job that would run. We talked about delete. Now let's talk about, and we also optimize the storage. Right.

<!-- topic-candidate [01:50:50]: Insert -->

[01:50:50] Now let's talk about insert. What's your insertion query? Ashish.

**[01:50:56] Student 2:** I just wanted to add. Hello. I'm audible. I just wanted to add this thing in the schema. Type, because we picked the value to be a [?varchar | asr: "worker"], right?

**[01:51:06] Teacher:** So we can put a serialized YML. That's okay. That you can make, those are the fancy things. And you can do for value type and what are you, you can build another Redis on top of this. And that's okay. That's why we are not defining [unclear: "very country"]. What we want to get the best out of this is to understand these key design decision, right? But you can have value type when you're supporting multiple values. Let's say you're just supporting string type. Then you don't need that, or just one homogeneous type. You don't need that. That's why I didn't cover.

**[01:51:33] Student 14:** Okay. Okay.

**[01:51:34] Teacher:** Yeah. How, how would insert work?

**[01:51:38] Student 2:** As we have the index on the key, so we can simply do like insert where the key is this and we can put the value over there.

**[01:51:46] Teacher:** Okay. So what are insert query would look like?

**[01:51:50] Student 2:** It will be like insert into, and it will be the value and then where the key is equals to this, whatever the key we are putting over there.

**[01:51:59] Teacher:** So key, value and expired at, you would pass all three to do it. Okay. Yes. Is this robust enough solution?
