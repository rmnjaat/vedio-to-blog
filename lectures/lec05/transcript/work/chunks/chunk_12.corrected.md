**[02:14:38] Teacher:** Population is what you have, your entire Redis key set, with some expiration set. If you randomly pick 20 out of it, this is a sample. The distribution of population and distribution of sample, so sample should be representative of population. That's a normal statistical concept, right, that if you randomly sample something, it would represent the distribution of your population, right? So you pick 20 keys at random. So if out of this 20 keys, let's say 50 percent of keys are expired, which means that in your population there would be roughly 50% of keys that are expired, right? So what Redis does is, it, instead of saying I would go ahead and delete all of them, it's take this sample, sees if in this sample there are how many keys are expired. If it is less than 25, it stops the process. If it is more than 25, it repeats this process continuously.

[~02:15:33] So this is what it ensures, is that it does not have to spend a lot of time doing the entire deletion, because number one, it is very likely for someone to access an expired key and then Redis finding it out to be deleted. So this takes care of 90% of cleanup, while for remaining 10 it says, I don't really have to worry about it, because eventually that could be triggered. Even if that does not trigger, I'd find those keys, I would take a sample, out of those 20 I would pick up the keys that are, that are expired, delete them. If they are more than 25 percent of the sample, I would repeat this process. This way. And this process stops when in my sample of 20 the number of keys that I'm deleting is less than 25 percent. Which means out of 20, if, let's say, in one of the iteration I found out that out of this 20 only three keys are expired, right? So you delete those three keys, and now because this only three keys, which means only 15 percent, only 15 percent of keys were expired, which means that in your population 15 percent of keys would be expired but not deleted, and it is okay.

[~02:16:47] So what it is, that Redis optimizes for speed and not completeness of the system, because if it spends a lot of time doing it, it would have less time to do other part, which is except like read and writes and all, because Redis is single threaded. There is no multiple threads in Redis running anywhere. Because it is single threaded, it has to leverage that. So now, which means that there is a chance, there is a chance where there are keys in memory of Redis which are expired but not deleted. They would eat up the space. Statistically speaking, it would consume only 20-25% of the total consumption of the memory. And that's the worst case, because you are anyway doing lazy deletion. It's not that Redis is only relying on that. So bulk of the deletion will be done by this anyway, because you are very likely to access a key, finding out to be expired, and Redis automatically deleting it when it accesses that.

[02:17:58] So in combination, approach 2 and approach 3, what Redis gets is, Redis gets the speed. It spends very minimal time in doing that cleanup, in running that job, because Redis is single threaded. It does not have other thread to do that. It cannot do it, it cannot have other threads to do it, because it is single thread. It had to do this in order to take out time to do actual stuff that matters, get, put, delete and other part, like handling actual commands. That's why it does that. And why 20 keys? Exactly 20 keys, not 21, not 22, not 20, 30, not 15? Because of central limit theorem. Now the proof of it is there in a paper, Google search, you'll find it. It's also tagged in the Redis's website, is in the paper. If you like math, go and explore that. Otherwise just remember it's exactly 20 keys that it samples. It works for up until 5 million keys, which is pretty decent amount, right? But this is such a brilliant implementation.

[~02:18:52] So now here, what this tells us, this tells us that there is no one way to build a system. Whatever works for you, works for you. And so Redis does not go for correctness, or rather the completeness of the system, that hey, whenever my job runs, have to clear up every single thing out there, right? It just went for speed. Redis is optimizing for speed by trading off a bit of memory leak, assuming that eventually that would be clean up. How? Because lazy deletion and random sampling. This way Redis spends bare minimum amount of time while it runs this periodic job. And this is how Redis actually does this.

<!-- topic-candidate [02:19:43]: Delete micro-optimization (update only when not expired) -->

[02:19:43] Apart from that, delete, when you are deleting, this is where one more micro optimization comes in. When a user is deleting a key, what we do? We update, we set TTL equal to minus one. So our query looks something like this: update store set TTL equal to minus one when key equal to K1. We just think this much. Now here, what you can also do is add this. So set, or delete a key, only when it is not expired. Why? Why this statement? Why this clause? This clause would help us save [?disk IO | asr: "discalpe"]. How? For example, if a key is already expired, right, which means it's TTL, it's expired at, it's already expired. So if you are deleting it, which means you are setting the TTL of a key which is already expired. When you do that, you are updating that particular row. But if it is already expired, you don't need to update that row. You can save that disk IO. So what you do is, although you fire this update, this update would not do a disk IO if the key is already expired, because of this clause.

[02:21:08] Is on the disk IO. And not just one, but two, because you would have index on TTL anyway. So you are saving two disk IOs by adding this one clause. Micro optimization. You would be very happy to do this much. But adding this one clause helps you reduce the load on the disk, subload on the disk. This is micro optimization. This is what I found in Apache Ignite. I was just wondering, why would you do that? Why would you do that? Then I mimic the load. And then it struck me. Oh God, this is such a nice optimization. TTL is greater than now. You set it over here. So you update. So you basically, what it says, suggest is, you do the disk IO only when it is needed. Otherwise you don't do it. This one clause ensures that. Right. Okay.

[02:21:57] Now batch cleanup would be just this, that we just discussed: delete from store where TTL is less than equal to now. And get also: select star from store where key equal to K1 and TTL is greater than now. You never make an IO, that network IO, for something that is already expired. Right. Okay. Now, okay.

<!-- topic-candidate [02:22:17]: Questions on TTL and delete -->

[02:22:17] Let me take questions on this and we'll go into high level architecture. Okay. I'll take a few questions and then we move forward. Rahul, go on.

> **Student Question [02:22:23] - Student 1 (Rahul):** So basically my question is about like, why do we need to set like TTL to minus one? We can just like a delete and batch job when we have.

**[02:22:35] Teacher (answer):** How, how would you delete it?

**[02:22:38] Student 1:** [check: speaker boundary - "deleting it how would you do it" may be the Teacher] Deleting it, how would you do it? So basically, normally the TTL will be in date time format, right? No absolute epoch time, by date time. [check: speaker boundary - "okay so that can cause issues ... even if you're doing" may be the Teacher] Okay, so that can cause issues like that, even if you're doing

**[02:22:52] Teacher:** date time, you set a time which is earlier, let's say before first January 1970, or maybe 000, right? You said something like that.

**[02:23:02] Student 1:** No, basically like a TTL, not like, I am thinking about expired at case basically.

**[02:23:11] Teacher:** Yeah. This is expired at. Yes.

**[02:23:13] Student 1:** Yeah. So basically, at expert, like expired at will have all the information about even about the date and even about the time also. Okay. Okay. So like setting it to minus one is, I think it's kind of like adding a one more step when you like, when you're like, just check the delete, batch delete query. Okay. So yeah, it will compare it with now. Okay. [check: speaker boundary - "Don't go into details now that" may be the Teacher] Don't go into details now that

**[02:23:46] Teacher:** now this, assume this is not minus, this can be an epoch timestamp. Correct. Okay. Yeah. The problem? Yeah. I'm writing it now. Should I write the actual time there? No, right? [check: speaker boundary - "I'm writing it now. Should I write the actual time there?" may be the student] Yeah. Okay. Think about it. And if not this, change this minus one to some magic value,

**[02:24:07] Student 1:** [check: speaker boundary - "let's say first January 1970. That works." may be the Teacher] let's say first January 1970. That works. No, I mean, I am saying like, we even don't need to update that value. We will have like the time at which it will expire, right? So [?batch job | asr: "bad job"] or job comes, it will automatically compare those times. Right?

**[02:24:30] Student 19:** Yeah. Because of this lesser equal to now.

**[02:24:33] Student 1:** Yeah. So like, I don't see a point of like setting.

**[02:24:37] Teacher:** What if TTL is not set for a key, then key was never expired. If you'd be a user specifically hard delete a key, or if you don't delete a particular key, then what would you do? You'll not do anything.

**[02:24:49] Student 1:** Okay. In that case we will have to say that implement delete.

**[02:24:52] Teacher:** You are explicitly deleting a key. How will you do it? You have to do something in the database, right? When you're deleting it.

**[02:24:59] Student 12:** Yeah.

**[02:25:00] Teacher:** Right. Pankaj.

> **Student Question [02:25:03] - Student?:** [check: Teacher called "Pankaj" just before; name spelling] Just to confirm. So when you say when we are saving on disk IO, when we do select star and all, it is happening because we have indexed TTL and databases into the TTL table. Right. And if, if we, if we do not index it, then we'll anyways be reading that value also because [unclear: "edit out"], it's expired and then we skip that.

**[02:25:27] Teacher (answer):** Yeah. You'd have that index. Yes. Sampath.
