**[01:35:48] Teacher:** So first thing you might think I'll use priority queue for this, but priority queue, it's... But you need additional data structure. So what do you do? In the second week, we spoke about sampling of keys, 20 keys and expirations, but that's not the only one. What we are doing is, as I said that time, I'm just re-editing it so that it fits into the context in order to make it lightweight and not use additional data structures like priority queue that requires a lot of pointers and all. We go with lazy deletion.

[01:36:20] First option, lazy deletion, which means we don't delete, we are doing TTL, we are not doing [?eviction | asr: "efficient"], we are doing TTLs. So if I access a key, let's say user get a key, when you went through the object, you get at my value object in which you saw that expiration time, the current time is more than expiration time, which means a key is expired. So then you delete the key. How do you delete the key? Free call. zfree. Like zmalloc you'd have zfree, that would do total size minus minus and free the object. Right? That way you would do lazy deletion. So in most cases most of your keys would be deleted with lazy deletion. They are able to do this because it is in memory, you just have to invoke a free call. Nothing more than that. Right?

[01:37:02] So given this, what happens is my life becomes very simple, that most of the keys in cache, that's how the cache works. You are very likely to access the key. If the key is deleted and you access it, you are hard deleting them, right? But then there would be a key which are expired but never deleted. That is where you do the sampling approach that we discuss in the second week. So out of all the keys whose expiration is set, you sample exactly 20 keys, see how many of them are expired, you delete those keys and re-iterate this process again and again until your sample has less than 25 percent of keys which are expired but not deleted. This way memory leaks, but it would not be permanently, because eventually the keys would be deleted either by lazy deletion or by another resampling, what happens, right?

[01:37:50] So this way you reduce the amount of data structures you need, additional pointers, additional memory you need to maintain these expensive data structures. Now this is very important, and now we know in a very detailed manner why Redis chose this plus this. Why lazy deletion? Because it helps them not to go for additional data structures. Redis does not have a priority implementation for it. Here if you look, lazy deletion, no data structure required, correct? Sampling 20 keys and expiring, no data structure required, right? So here you see how beautifully Redis exploited the fact that it does not require additional data structures to implement [?TTL | asr: "ETN"]. Every single bit matters. This is how it gets. You can able to fit in large amount of data in short amount of RAM. It just does bare minimum it requests.

<!-- topic-candidate [01:38:52]: Scaling - vertical scaling on a single node -->

[01:38:52] Now, scaling is easy. Vertical scaling because we are just on single node. But you to handle large amount of request data at all. The only option is vertical scaling. You can't do more than that.

<!-- topic-candidate [01:39:05]: Concurrency - pessimistic locking, optimistic locking, single-threadedness -->

[01:39:05] This is what I want to spend a little more time. Concurrency, because we are still talking about single node. So on that single node, how do you ensure when you have two people, two threads coming in, trying to update the same thing? It's a classic concurrency problem. So there are three ways to do it. Pessimistic locking, optimistic locking, single threadedness.

[01:39:27] Pessimistic locking is what we discussed in the second week with airline check-in example, where we wanted to do a critical operation which cannot be shared by multiple threads in parallel. So what we did, we wrapped it in locks. So because it's a critical update, people would have to take the lock before they move forward. So when two threads come together, one of them would go in while other waits. It's a single node machine. Thread coordinate with mutex as semaphores. Pick your favorite to implement it. That is one way to do it. [unclear: "updates if that fits your well."] Second way to do it is optimistic locking.

[01:40:05] Now, pessimistic locking we all have detailed understanding of it. In case you are unaware of mutex as a semaphore, spend some time reading about it. And atomic variables to understand how this works. But take pointers from [unclear: "LH again example"] on how we waited while one moved forward and all. Pessimistic locking is pretty straightforward. Almost when you synchronize block in Java, this is what happens in there.

<!-- topic-candidate [01:40:28]: Optimistic locking - compare and swap -->

[01:40:28] But optimistic locking we never spend time on when we're discussing. Today I want to spend time on that. So this looks like a SQL statement, but this is more of semantics, but understand the context how they are doing it. So what optimistic locking says is, optimistic locking says, I believe there is very less chance of concurrent accesses. So I won't proactively take a lot of locks. What I would do is if two threads are fired and they access the same thing at the same time, somehow I want to ensure that only one of them succeeds. So without taking explicit [?locks | asr: "blocks"], if I can ensure that only one of them succeeds, it's a win for me.

[01:41:11] A way to do this is doing something like this. Instead of just saying update a equal to 20, I say update a equal to 20 where a equal to 10. A semantic, I'm just making you understand how to implement. We'll talk about it. But the idea is, the reason of just firing update a equal to 20 and a equal to 30, I say update a equal to 20 where my past value is 10 and update a equal to 30 when my past value is 10. When both of these fire at the same time, what would happen? One of them would succeed while other would fail, because when one of them succeeds, what happens? The value is set to 20, and when the next one runs, it says, oh. So a equal to 30 where a equal to 10, but the current value is 20. So this update would lead to nothing. So one of, only one of this will succeed. This is optimistic locking. You are being optimistic that you don't need locks. Right?

[01:42:06] Now, how do you implement it? A way to implement this is you need this to be an atomic update. Atomic update implies that while this is running, nothing else can run. How do you do that? There is a standard instruction called compare and swap. Every single language has an implementation of it. It uses native CPU instructions to implement, it's done at CPU level, it gives a very nice wrapper over it. So compare and swap is the way to do. So this is exactly what compare and swap is. So here what you do, you say I want to compare, I want to change a to 20 when my current value is 10. So it would do this exact thing that I said, it would check if a is 10, then only it would make it 20. And similarly it would do a to 30 when it is 10. This is what you would pass in compare and swap.

[01:42:58] So it's a function, it's a standard function that you will find in every language. Go has atomic library, C++ [unclear: "had a bicell"] Boost library has its implementation. It all refers to that operating system implementation. If your processor, ARM chipset or Intel, AMD, whichever you are using, if it provides you compare and swap instruction, your compiler would leverage that while it is converting it into bytecode. And it would do this. So compare and swap is the best way to implement optimistic lock. Because this instruction is atomic. So while one is running, no one else can run. Your operating system does not do context switch while this instruction is running. So no worries in that.

[01:43:38] But this is very beautiful when you do it. Highly recommend you to think about it. Implement, write a simple optimistic locking thing. Right. It's very easy. Just play around with [?compare and swap | asr: "comparison"] and you'll understand how things are. Right. Okay. It's fine. We'll skip this. Don't need this. We went very detailed in it. I'm just probing you all and think on different directions. Right. But now, implement [?compare and swap | asr: "comparison"]. Right.

<!-- topic-candidate [01:44:05]: Single-threadedness -->

[01:44:05] Now, the third part, [?single threadedness | asr: "single threaded test"]. Right. So we talk about handling concurrency, pessimistic locking. We understand optimistic locking. Is why do you need concurrency when you can make things single threaded? The problem arises in this case because we are having multiple threads that can be scheduled at the same time, can run in parallel. What if I don't support threads at all? This is what Redis did. In case you want to understand single threadedness, I have a video on it, a free video and a detailed one in my Redis course, but a free video itself covers some parts of it that would make you understand how single threaded... YouTube and Redis internal playlist that I have, but want to dive deep into Redis? I have that course. It's not a plug. It's just a point.

[01:44:51] I'm trying to make you all very curious about things, right? And how engineer, how brilliant engineers, this folks who built this amazing stuff, they're thinking about it. They're challenging. If you look carefully, they challenged every single decision, that what if we take locks? What if I don't want to take locks and do it with [?atomic instruction | asr: "atomic inspection"]? What if I don't need locks at all? I make [unclear: "three"] single threaded. So they just challenged everything that they've faced. Right. And this is all about low level implementation details of cache. Right.

<!-- topic-candidate [01:45:23]: Questions before the break -->

[01:45:23] Okay. We'll take questions for five minutes. Then we go on a break. And then we come back. We discuss high level part of it. Right. Nitin, go on.

> **Student Question [01:45:31] - Student 2 (Nitin):** Arpit, earlier we were discussing about the low level implementation of LRU and LFU. I think we like digressed on that topic.

**[01:45:43] Teacher (answer):** Those LRU bits, 28 LRU bits. I cannot talk about it. It's very deep, very deep. It's covered in the Redis internals course. I cannot talk about it because it would itself cover two hours of time. It's that deep.

> **Student Question [01:45:59] - Student 2:** So not about Redis implementation, just a high level implementation, like keeping the memory constraint in mind. How will we design the LRU and LFU?

**[01:46:11] Teacher (answer):** You cannot do that. That's what I covered there. Right. That's what I covered there. [check: possible ASR duplicate] It's very deep implementation. Right. So that's why go with random. That's very low on memory. You don't need any additional data. You are just risking it with an important key might be deleted. That's it.

**[01:46:29] Student 2:** Right. One of the, [unclear: "created"] that you shared, that implementing Big O of one, with, I mean, time complexity of LFU. Yeah. A very high memory consumption.

**[01:46:44] Teacher:** Exactly. But then you see that thing, right? When you want better time, you're giving up on space.

**[01:46:52] Student 3:** Okay.

**[01:46:53] Teacher:** Right. But it's not that, which is why people don't use it. Right. When you, when you are constrained by the space, then you have to, you, then you have to trade it off by time. Right. So you take higher time to lay, you take longer to do that. Exactly.

**[01:47:10] Student 2:** Okay.

> **Student Question [01:47:12] - Student 2:** So next question, I mean, in terms of a single threadedness implementation of our distributed cache, so let's say we adopted that approach, okay, and there are two, there are two servers which are communicating via my cache system, and they both want to read or update different data, different keys, okay, then over here, our system will be underperforming, right?

**[01:47:45] Teacher (answer):** No, it does not. That's what the magic is. Single-threaded systems, they are not blocked. Basically, watch that video. In my Redis internal series, watch that video. The first three videos that I put out for free, watch that video. You will understand whatever. It is not blocking. That's how concurrent systems are built.

**[01:48:05] Student 2:** Got it.

> **Student Question [01:48:06] - Student?:** Can I ask a question regarding consistent hashing?

**[01:48:09] Teacher (answer):** And then we are yet to cover that. Okay. That's a huge discussion that is coming up. That's high level part. We'll talk about it after the...

**[01:48:18] Student 6:** Got it. Yeah. Got it. Hey, can you please go back to the slide where we talked about sizes, computing sizes of the hash table.
