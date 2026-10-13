<!-- topic-candidate [02:50:24]: Q&A - adding a new node in consistent hashing, virtual nodes -->

> **Student Question [02:50:24] - Student 4 (DK):** So Arpit, my question is related to consistent hashing. So when you're adding a new node, so the data which you're going to copy in that new node is the extra data which is coming in that range. So let's say from cache five to cache one, whatever data is in that range will still remain in cache one or would cache one will have all the data, which is there in cache one from cache.

**[02:50:50] Teacher (answer):** Thinking it operationally, taking it operationally. What we'll do, will take snapshot of cache one, load the data or basically create cache five, added to the ring and delete the data on cache one. There is like, why? Because now basically [?cache 5 | asr: "cache is"] the one that is handling the data. Right? To do that for you. So you can delete the data from the cache. Because now cache 1 is not the first owner of it. But in case you have replication factor set up and whatnot, those complexities, then you may choose to keep the data on cache 1 in any way. Because in any way, we'll have replication factor of two. So then anyway, the data would be copied two times over here. Sorry, two times over here. [check: possible ASR duplicate] Cache 5 data will be copied here also and here also. So in that case, it does not make sense to delete the data. But in case you don't have any replication factor, then you create, you take the snapshot, create this node and then delete the keys that are not needed over here.

> **Student Question [02:51:42] - Student 4:** Got it. Got it. And second thing is, see, still I don't understand the concept of virtual nodes in consistent hashing. Why? Maybe I have not read about it.

**[02:51:52] Teacher (answer):** Let's do one thing. Search for virtual nodes. Go through consistent hashing. Go through virtual nodes in consistent hashing. And let's discuss it tomorrow.

**[02:52:03] Student 4:** Sure. Sure. Right?

**[02:52:04] Teacher:** Once we have that, then you'll be able to understand when we discuss, ask the same question again. Once you have an understanding of virtual nodes, and in most cases, when you go through that and you go through this video and listen to my expression of why virtual nodes wouldn't work, just think about it operationally. How would you copy the data? How many different places would you have to copy the data from different ranges and whatnot, and how complicated things would become for you? And that's when you would realize, it's better to not use virtual nodes when it is a [?stateful | asr: "shameful"] application. Than happy to discuss, spend some time understanding what virtual nodes are, more than happy to discuss. Sure. Thanks. Thank you.

<!-- topic-candidate [02:52:47]: Q&A - single-threaded cache and hardware utilization, malloc limits -->

> **Student Question [02:52:47] - Student 2:** So I have a question on the single threaded, single node cache that we discussed, what kind of hardware are we thinking? Like, isn't it like if you have a eight vCPU CPU, just wasting seven of them, are we putting

**[02:53:08] Teacher (answer):** Yes, you are wasting CPUs because you have, let's say, and this is typically happens. If you install Redis on a machine and you run it, if that machine has 32 cores, only one core is being used by Redis. Every other 31 cores are sitting idle.

**[02:53:22] Student 2:** Yeah. I mean, I would like to have eight shards on the same machine.

**[02:53:27] Teacher:** And that's what people do to increase the utilization, the hardware utilization.

**[02:53:31] Student 2:** Yeah. That's what I was, I mean, and this whole single threaded stuff, if I understand, way you showed malloc implementation, all of that works because of a single threaded thing. If it, you put a concurrent thing, it would be a havoc, right? Yes, massive, massive havoc. Yeah. And all of the, basically you're saving all those [?context switch | asr: "context which"] costs and all of that's the whole idea, right? [check: speaker - "Yes, massive, massive havoc" may be the Teacher]

**[02:53:56] Teacher:** Yeah, okay, but if you save a ton of things. So basically single threaded makes a lot of things oversimplified, oversimplified, because, but then you still don't lose on [?concurrency | asr: "currency"], that's the beauty of, but you're under utilizing your hardware. So, but you can put multiple Redis nodes on the single machine to leverage it. So there are again trade-offs that you're picking everywhere.

**[02:54:17] Student 2:** Right, yeah, that's what will happen. And I think that's a better idea anyways, rather than introducing the complexity of concurrency, given the use case we have. And one more thing is, yeah, I was hearing out your discussion on the malloc thing. I can add my two cents there.

**[02:54:31] Teacher:** Please, please, please.

**[02:54:32] Student 2:** Yeah, so malloc, basically what you're saying, right? Like that happens with kmalloc. malloc, what you're doing. And if you keep writing it to every [?write | asr: "right"], there is a page fault and you will allocate a page and you keep writing until you exhaust the physical memory. Now there is something different that happens when you use the GNU malloc or user malloc or any other malloc, right? tcmalloc, jemalloc. They have, one is they have, you have user limits, and two is malloc itself has configurations on limits on the user, which you can set because you don't want to be in a case where you're at 98 and 99%. One service can take, if you are hosting multiple services on a node, things like, so generally you will counter them with, one is kernel level U limits, like each process. When you set U limits, two is with the malloc library limits itself. Like generally people don't use GNU malloc. So yeah, that's how. So now about the fault, right? So yeah, you will generally get a SIGABRT. Moment you cross, yeah, because, and two is whenever, so the program does crash, right? Where you hit the program will crash because kernel will kill you the moment you exceed those limits. Kernel wants to save itself, right?

**[~02:55:51] Teacher:** That's what you're trying to... Super. Chalo, chalo, my understanding is correct. Okay, so it throws SIGABRT at that time? Yeah, yeah. But then, so, and it will take, in case we handle that signal then?

**[02:56:04] Student 2:** No, no. [?abort | asr: "About"] is not something that you can. I mean, there are ways you can handle. About is basically, it is a signal where you are saying your instruction pipeline is done. So, this is only way you handle it.

**[02:56:19] Teacher:** I read it. Yeah, yeah, yeah. Instruction pipelines.

**[02:56:21] Student 2:** Now, after about, what you can execute is whatever you want to push and all of that, but you are done. Like it's a sync signal. You're right. But about this, basically the process is killed now.

**[02:56:32] Teacher:** I just remembered my B-Tech. I did this course on that [unclear: "Philosophia's"] Unix book. Programming in Unix book. I had a course and it had part of the SIGABRT. When you said this instruction pipeline, then it hit me. I got it. I started 2011. Final year where I got it. Now I'll [?refresh | asr: "repress"] the concept. Now I know what to Google. Thanks. Thanks so much.

**[02:56:57] Student 2:** No problem. Yeah. Thank you.

**[02:57:01] Teacher:** Program does crash. [?SIGABRT | asr: "Singapore"], you can't handle much. Point noted. I'll refine the material for the next quarter. Thanks. It will be a huge addition.

[02:57:12] Shreya, you have a question, please. Shreya? Shreya is gone. Okay. I'll circle back. Gaurav, you had general questions.

<!-- topic-candidate [02:57:29]: Q&A - shared and exclusive locks (week 2 seat allocation) -->

> **Student Question [02:57:29] - Student 6 (Gaurav):** So I put in the second week class when you, we were discussing about shared locks and also we implemented a few of the [?locks | asr: "law"]. So while I was implementing shared locks, I expected the program to run properly, like 120 seats being allocated to 120 people. Shouldn't that have been the case, because I was seeing some [?read locks | asr: "red logs"] and shared lock,

**[02:57:49] Teacher (answer):** shared lock, when you take shared lock, but you're still updating. When you update, the lock elevates to your exclusive lock and then it doesn't update.

**[02:58:01] Student 6:** So like 120 seats should have been allocated to 120 people. While in my case, five seats were being allocated to many of the people.

**[02:58:09] Teacher:** That should not have happened. What was your isolation level?

**[02:58:15] Student 6:** I don't remember, but I can. Check that once.

**[02:58:18] Teacher:** Check that once. [check: possible ASR duplicate] All right. Check the isolation level. There is SQL administration, basically if you're using MySQL, there is MySQL administrative console, not UI part, but you can check which row is getting which lock. You can see that visualization there, that what is happening behind the scene. So that would help you debug it.

[02:58:37] But let's say if I would have taken shared lock, then the first process to write it elevates it to exclusive lock. Other process still holds the shared lock. Now, if I think of it, it would rewrite. It would overwrite. Was it overwriting? Yeah. Yeah. So, which means that it is not revaluating the statement. But that happens in exclusive locks. So, both of them took shared lock on an object. One of them was writing. The shared lock, one, the shared lock, when it tried to write, because other transaction had an exclusive lock, other transaction wrote first, shared lock, the other, the first, it's clear in my head, but let me, let me put it simply.

[~02:59:30] So let's say you have transaction one, transaction two, and this is my guess, I might be wrong, I'm assuming the isolation level is repeatable read. Yeah, that's what I'm assuming, the isolation level is repeatable read, which is the most common one out there, almost. So two transactions trying to update the, like let's say you have two rows, two transactions. Ideally, both of them should update. Similar. So from 120, I just reduced the problem statement to two. Now let's say both the transaction took the lock on row one, shared lock. Both of them have the shared lock. Transaction two wrote first. So it wants to write. So the shared lock became, for transaction two, the shared lock became exclusive lock. Transaction one still holds the shared lock, the data, no one stopping it from reading the data.

[03:00:20] Both of them are writing to that same row. Like both of them took the lock on the same row. Transaction 1 wrote it. Transaction 2 now starts to write. It waits until the transaction 2, sorry, transaction 2 wrote it, transaction 2 waits for the lock, the transaction 1 waits for the lock to release. Transaction 2 now release the lock. Transaction 1 wrote it at the same location, at the same row. Because both having the share lock, because transaction 1, because that lock got elevated to exclusive lock did not mean the transaction [?one's | asr: "once"] lock got allocated to someone else. It re-evaluated statement did not happen. It had a shared lock on it. When it is trying to write it, it waits until an existing exclusive lock is released. Once it released, it wrote to the same location.

**[03:01:11] Student 6:** Got it. Yes. Got it. This should be happening.

**[03:01:19] Teacher:** You can, there is a tool called Percona, which you can use to visualize this as well. So just, so just basically check out Percona. It has lock, lock viewer or I forgot the name. Use it 2015. I don't recall, but Percona is a great utility that you can leverage. It's a plugin that you can use with MySQL to manage it better. It gives you transparency on the locking state of databases and whatnot. So start with that, but you will stumble upon this thing, but this is most probably, this is what is happening behind the scene. It's so fun to understand transactions and how it is structuring. Yeah, this is what is happening.

**[03:01:59] Student 6:** Yeah, and I also mentioned it to you on the chat, [unclear: "it's a discord credit"] so that once I restarted my system. Yeah,

**[03:02:09] Teacher:** it's right. But I'm not sure what happened, but it could be a bug as well. Very well possible.

**[03:02:17] Student 6:** And it's hard to find out why.

**[03:02:20] Teacher:** Hard to find out. It's hard to find out. In most cases, when you see this deadlock file, I think that data is very hard to figure out what's happening behind us. It typically, like, basically, that's where the gap is. Like, we have a bit of practical understanding, when things hit production, things go berserk and we have no idea what's happening. And also,

**[03:02:38] Student 6:** happening. It was just panicking. I mean, it just showed me an error while what I expected was to terminate [unclear: "the mind"].

**[~03:02:46] Teacher:** No, it does not terminate. The program will not terminate. The transaction will. Program will not terminate. [check: possible ASR duplicate] Deadlock does not lead to database crash. Deadlock leads to termination of transaction. That's it.

<!-- topic-candidate [03:03:02]: Q&A - connection pooling in PHP -->

> **Student Question [03:03:02] - Student 6:** And also, we have already discussed about connection pooling. However, recently you told that Facebook uses PHP and also, you know, one of your videos, you mentioned that PHP doesn't afford support connection pooling.

**[03:03:13] Teacher (answer):** No, no, no. I never mentioned P- I have no idea about PHP, PHP connection.
