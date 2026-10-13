**[02:39:19] Student 3 (Rajiv):** No, I have been a C developer for a while, so malloc doesn't return the segfault when the heap goes out, it returns the null pointer, and C++ we get bad alloc as exception. So this use case makes sense where you want to ask the user, how much memory you want to allocate for a cache. So you take in the memory, you just put it over there, but in general, if you want to leverage the whole system, you just check whether the return type of malloc is null or not. If it is null, you want to affect 100% 100% malloc returns null.

**[02:39:50] Teacher:** I totally agree with that. But when you go beyond that, the program actually causes, I simulated it while I was building. Here it is. It crashed. It came down. So obviously you know it better than me, but when you allocate using malloc, it assigns a virtual page, not a physical page. Right? So although your RAM is, let's say 4 GB, but your malloc can allocate 40 GB virtual space. So it starts allocating physical pages when you're actually starting to use the logical pages. Right?

[02:40:21] When you go beyond that, and I actually ran that experiment while I was building my Redis to deliberately crash it because I read it a lot of places that program crashes, but I never saw it in action. So I found a blog, very old blog by someone almost a year back. And that code had this part where that person repeatedly malloc'd a lot of stuff. So malloc does give you null, but beyond when you are, when you are not just allocating, but also reusing the pages that have been allocated to you, beyond that thing the program crashes. It's not fault of malloc, program crashes. That's what I have also observed. I might be wrong, but if you can find, if you can help me in that direction, more than happy to correct it, right, more than happy to do it. But I was able to crash my program beyond the limit, like beyond my, so because the way I did it, I allocated a page. I filled it with [?ones | asr: "once"] and then I did malloc again and did malloc again because I was leveraging. I was reusing this thing again and again, after a certain thing, the program segfaulted. It crashed because of a high memory usage. And that's what I also, but I, but I, again, you know, because you have much more practical experience than I have, I was able to crash the program. That's why I said this, but in case I'm wrong, happy to be correct.

<!-- topic-candidate [02:41:42]: Q&A - CDC instances and load (CDC vs API-event workers) -->

> **Student Question [02:41:42] - Student 3:** Sure. CDC part also had one question. So [?CDCs | asr: "cities"], if you go to the slide there, I want to understand how CDC, so CDC, you have drawn multiple instances of, basically a node. So, we said that there's a write-ahead log with CDC reads in bulk and then write in the same sequence in Elasticsearch. That means one CDC instances, they take an handle of SQL client basically, right? So it should be an active standby kind of architecture, is it, is it like, should be active, right? Active standby both works. [check: "active standby both works" may be the teacher replying inside the student turn] Yeah, but for replica, for, for like, if you have n nodes active at the same time, how would they synchronize what to read from where, which partition to read, what was last?

**[~02:42:24] Teacher (answer):** From one replica. You don't need to read from all the replicas, all replicas have the same data, right? You can configure CDC to read from just one of the replicas.

**[~02:42:28] Student 3:** Okay, so but [?N | asr: "ends"] CDCs are reading from one replica, or they have to know that from which partition index?

**[~02:42:34] Teacher:** Have a small database of their own where they keep track of it. They, they basically [?contend | asr: "content"], so simple remote locks come into the picture. They are all [?contending | asr: "containing"] for, in order to read that same thing, right? So it's normal synchronization primitives that they apply to read it.

**[~02:42:52] Student 3:** But at one time only one CDC would go and take a lock and then read the data and then put on one table.

[02:43:02] Okay. There are two. Multiple tables.

**[02:43:04] Teacher:** Yeah. That's, that's the case, right? You have multiple tables, right? So in order to read them in parallel, you can use this, and for CDC, CDCs have a small database where they keep track of these things, but hey, this is the last point that I read. I have committed this point on all of them. And then it, and then it, and that gives us a, right.

> **Student Question [02:43:25] - Student 3:** And regarding load part. So you told that the API service that were workers we had from Kafka node, they were putting a load on MySQL database, right? Server to read data and put into Elasticsearch or whatever.

**[02:43:37] Teacher (answer):** MySQL, sorry, Kafka never read from MySQL.

**[02:43:40] Student 3:** Are you talking about API service? Yes. API service. They read from API events, whatever events API server published. [check: speaker - this segment may contain the teacher's clarifying question and answer] Okay. Got it.

> **Student Question [02:43:48] - Student 3:** So you said that the workers were actually fetching the IDs or whatever events they were sent from API and then they're reading the actual data from the MySQL database and then putting into the sink source, whatever is there, right? So you told them that they would be load on the MySQL instance. Now, now I want to compare the load, what, whatever the workers were doing as compared to the CDC load, impacted load, what is the comparison between? Because there also you have WAL logs, over the source of reading would be still the same, right?

**[02:44:17] Teacher (answer):** So yeah, but here you can read in batches, and you're doing with API events.

**[02:44:22] Student 3:** Yeah.

**[02:44:22] Teacher:** So every time you, let's say you, you publish a blog, every blog publish is one event for you. Correct. And in that event, either you just pass the blog ID or you pass the entire blog object. If you pass the entire blog object, which means your message size becomes huge. Right. Which requires large network IO to read that huge off message on the consumer side. If you just pass the blog ID, then you have to make a call to the database to read that entire row. Right. Now, when you put it, this would take time because this would put little load on your database to read this and then you write it over there. Right.

[02:44:58] But now here, what you're missing out on is you're missing out on the batching benefits that you'll get when you read from write-ahead log. [unclear: "people rose"], literal rows from the database. The amount of data transfer is still the same, but now the reading is happening in batches. Writing is happening in batches. That's the advantage. The number of messages or the amount of data that is processed is processed much faster because batching inherently solves a ton of problem around this. Right.

[02:45:26] Plus you can also leverage with CDCs. You can, you don't need to have an API event for everything because there are some changes. I'll give an example. You have asynchronous workers that are updating, not in the API request context. Let's say you have asynchronous workers that are doing some changes in the database. Let's say aggregating the likes count on a particular post frequently. Right? So, sorry, periodically. Now, those are not API calls, right? These are asynchronous workers who are updating things on the database. Now, do you want those changes to come to Elasticsearch? Don't you? So, not everything has an event. It's a subset of things. Okay, understood, right? So that's where what you need to do is, it's better to read from the source of truth rather than relying on the [?API | asr: "eps"] server, because not everything would be [?an event | asr: "anything"]. That's where CDC comes in [?handy | asr: "hands"]. Correct. Yeah, sure. Super. [check: "okay understood" / "yeah sure" may be Student 3 back-channels inside the teacher turn]

[02:46:22] But in case you find it, see what I think, I do, do drop me a note, now I'm more than happy to rectify.

**[~02:46:26] Student 3:** I don't know, I just read about malloc, I knew what malloc part, but yeah, I mean,

**[~02:46:31] Teacher:** whatever you discovered was, it failed because I ran it multiple times and it failed for that. [check: speaker boundary - "whatever you discovered was" may still be Student 3] I really, I tried to find a lot of reasons, in most places just written in one line, but because I simulated it, it failed multiple times, repetitively at the same point and my program crashed. So, but you're a hundred percent correct. Malloc returns null when it is unable to allocate and which is how you get to know about it. It, it further, and which is when you can initiate that part, but I saw that, but in case, I'm more than happy to get

**[~02:47:07] Student 3:** Crash happens whenever program tries to access some other memory, whatever is not supposed to.

**[~02:47:12] Teacher:** So beyond that, on a physical page, on logical page it can still allocate, but on physical page when it tries to allocate, that's where it crashes. That's what I got to know through my small prototype that I wrote.

**[~02:47:21] Student 3:** Logical pages convert to the physical pages, right? They, they add the base address and then they find the physical address.

**[02:47:31] Teacher:** Which is where it goes beyond the reach.

**[02:47:34] Student 3:** Okay. So, okay. But logical addresses, logical address, they would have no, but they, they don't have any pick mechanism to know how much I can grow, or maybe always could give a default memory. Okay. But it can't also, because [unclear: "it's a paging rights"]. It's a paging concept. Yeah.

**[02:47:49] Teacher:** That's why even, even I don't have any deep understanding of it, but this is what I was able to simulate. So yeah, it's a, it's a very fascinating world. I'm very tempted to dive deep into OS and memory [?paging | asr: "patching"] after I discovered this, it's there on my to do list for a long time.

[02:48:07] Thanks. Okay. Gaurav, go on.

**[02:48:12] Student 6 (Gaurav):** Mine were, mine were the general questions.

**[02:48:15] Teacher:** I know. Sorry, sorry, sorry. I forgot to lower your [?hand | asr: "head"]. Just a minute. I'll take other one. Anubhav, go on.

<!-- topic-candidate [02:48:22]: Q&A - growing a set's memory block, LRU vs LFU -->

> **Student Question [02:48:22] - Student 5 (Anubhav):** Hey, Arpit. So I, my question was around distributed cache, the low level implementation that we discussed. So let's say we have a set of data structure in a cache as a value for some key. And say when we instantiate the set, we allocate one zero two four bytes for these sets. And when, when we build up these one zero two four bytes and the request comes in to add more elements. Do we have to deallocate the memory, then reallocate a bigger memory block and copy the data? Okay.

**[02:49:01] Teacher (answer):** So that becomes an expensive operation. So we need. [check: speaker - "So that becomes an expensive operation. So we need." may be Student 5 continuing] Okay. Yes. So that's a hash tables work, right? You allocate arrays of certain size. It fills up. You twice the array, you reallocate, move the data and whatnot. So that's the way to go.

**[02:49:18] Student 5:** Got it. Yeah, thank you.

> **Student Question [02:49:21] - Student 5:** So I had another question on LRU and LFU. So as a generalization that LFU is more performant to use when the popularity of keys is very asymmetric, as in some keys are very popular and these are used by everyone. Whereas other, there are some other keys which are not so popular. Whereas LRU is when it can be used when the popularity is not very asymmetric.

**[02:49:47] Teacher (answer):** Okay. Terms you used were brilliant, but just one thing, keys were popular, but you still don't want to [?evict | asr: "emit"] in case they are not recently accessed.

**[02:49:58] Student 5:** That is a sub case there.

**[02:50:02] Teacher:** So you still want to hold on that because it gave you good returns in the past. You are hoping that it would grow further. You are not looking at the recency [?bias | asr: "buyers"] because the stock went down and want to sell it. That's the analogy that I always go with. LFU at LRU.

**[02:50:18] Student 5:** Yeah, got it. Thank you.

**[02:50:20] Teacher:** Yeah, thanks. DK?
