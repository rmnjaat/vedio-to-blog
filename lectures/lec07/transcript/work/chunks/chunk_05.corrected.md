**[00:48:29] Teacher:** So when we talk about allocating a memory on the heap, we use a function called malloc. And maybe one we want to free it. We use the function free to allocate or free to deallocate. In malloc we pass the size that we want to allocate, we want to allocate, right? And malloc internally fire system call, it grabs the memory in your RAM and returns an address that you can now start using, right? So that's what malloc does, that's what free does. Free basically marks that location as free for your operating system to say, okay, now this is free, now I can do whatever I want. Now OS can choose to allocate that same chunk to other folks, to other process, to other thing was sharing that same thing.

[00:49:19] So given that we are using malloc and free to allocate and deallocate an object. Now, just to, before we, before I ask that question. Now, even when you are allocating this, my value, let's say someone is adding a new key in the system. Someone is adding a new key in the system. You would have to create this my value object, right? So what will you do? You will create object O is equal to my value star malloc. And then you pass size of bracket my value. Something like this. You are trying to allocate these many bytes and typecasting that object to my value so that you can refer it over here. And this is what you would store in your hash table. Now given this is what you are doing, what would be the simplest way to keep track of the amount of memory used?

**[00:50:14] Student 5:** Yeah. So, like whenever we are adding something, we know how big it is, right? So we can just keep track in a counter. Like we can just maintain a counter and we know how much memory.

**[00:50:27] Teacher:** How, how, and where, what would be the simplest way or the most generic way to do it?

**[00:50:39] Student 5:** *(admin)* Your voice is making there is a [?lag | asr: "lack"]. Yeah. Yeah. There's a [?lag | asr: "lack"].

**[00:50:53] Teacher:** *(admin)* [unclear: "I'll just I'll just look like just just try to get in a better coverage."] [unclear: "I'll look you at another."]

**[00:51:02] Student 5:** So if we explicitly have to allocate the size that we need on every call, can we not just keep adding that plus an extra for [unclear: "the two point, the value point around the type pointer"], type integer that we are storing. So size of my value plus four plus four.

**[00:51:25] Teacher:** No, but size of my value itself is this plus this. [unclear: "This white pointer is for white, this is for white,"] but this pointer can point to a bloom filter, which might be like a one [?MB | asr: "MVP"].

**[00:51:41] Student 5:** Yeah, I actually misunderstood.

**[00:51:46] Student?:** That's okay.

**[00:51:47] Teacher:** Because size of my value will give you this entire thing. Right. But this itself is pointing to something. Right. That is an interesting problem.

**[00:51:56] Student 5:** And we don't need to specifically allocate memory on heap for that as well.

**[00:52:02] Teacher:** Why not? We have to allocate that bloom filter, that let's say we are storing bloom filter in memory. We have to allocate that memory as well, right?

**[00:52:10] Student 5:** So we are making a malloc call for that at some point. Yes. Yes. So when we are making a malloc call, like whenever we are actually storing that bloom filter, then we need to add [unclear: "that size of two size"].

**[00:52:26] Teacher:** Exactly. So how do you implement it? Whenever you, so which means that whenever you are making malloc, that's a perfect [?segue | asr: "set"]. Whenever you are making malloc call, even if we are allocating any value, bleed, bloom filter, set, list, anything in our cache, because everything is stored in heap, anything we are ever allocating, we are invoking the same malloc function. It's not that we are just allocating to create this my value object. We are using it to even allocate, let's say we are implementing a link list, will be malloc. So in any case, we will always be invoking malloc and free always. So every time we are mallocing, we just have to use, you have to maintain a counter that does this size plus equal to size underscore alloc, whatever the variable name is over here. Every time. So what's the simplest way to implement it? That every time you are doing something, you want to do something.

**[00:53:23] Student 5:** I think create our own wrapper around malloc and [unclear: "lid"].

<!-- topic-candidate [00:53:28]: zmalloc wrapper -->

**[00:53:28] Teacher:** Exactly. So what Redis does, it just wrapped the malloc function under a function called zmalloc. And what it does internally, it just does this. So zmalloc is a very simple wrapper over malloc function that does this. Zmalloc has the exact same signature as malloc. And what it does? It internally does malloc. Of size B. It does total size. Plus equal to B. And it returns O. That's it.

[00:54:10] So now in the total size variable, which is global variable, you would always know the amount of memory that you are consuming. Always, always, always know this. You don't have to rely on a fancy operating system command to give you this information. Redis does that to periodically check on the usage, but it's still occasionally it's fine. But in most cases, you just have to do this. So you are just wrapping the malloc. It is such a simple and elegant solution to a very tricky problem, because a naive way you may think of, hey, every time I'm doing malloc, I'll do count plus equal to 1. So if you're doing malloc at 50,000 places, if one of the places you forgot to do total size plus equal to something, that's bad. So which is where you do it at one place. Now in your code base or in Redis's code base, if you are checking that out, everywhere in the code base you would never see malloc. You would always see zmalloc, which has the exact same signature as malloc. But the idea being that internally it just updates the count.

<!-- topic-candidate [00:55:09]: Memory limit and triggering eviction -->

[00:55:09] Okay, and this is how you would know that total size is giving you the total memory consumed by your cache. If it goes beyond a cap. Now let's say whenever you start a Redis server or any in-memory cache, you define a total size that you would want to work with. Let's say you specify it as 1 GB. It's a soft limit. Although your machine might have 32 GB RAM, you're putting this limit at a time. My cache will not take more than 1 GB at any given point in time. Given this, what would happen is you can now in zmalloc itself, that when you're allocating, you can just check beforehand that if total size plus B is greater than max limit, you return an error. Otherwise you allocate and return the object, something around that. Or otherwise you can even here trigger eviction.

[00:56:13] That comes to our next point of discussion. Now that you know the limit that you have put, operating system might have 32 GB RAM. But what you have is you are capping a limit to 1 GB, because that's a user defined configuration. That my cache cannot take more than 1 GB. So now what would happen is, you can now very easily check if my total size plus B, which means the total size which is consumed up until now, plus B is greater than max. If it is going beyond the limit, I can remove a key and then allocate and then total size plus plus and then return that object. This is where you plug in that eviction algorithm that we will discuss next.

[00:56:57] But this is such a beautiful piece of implementation. Nothing fancy. It's really basic logic that we are applying. But this is what tells you that how big systems are built on very simple solutions. Nothing fancy. It's very simple. Trust me, Redis source code is one of the easiest source code that you can skim through. Any file [unclear: "starts giving the data"], you'll start understanding it, fifth or sixth day you'll start understanding everything out of it. It's very beautiful piece of code, but I, I thoroughly enjoyed going through it, right? But this is the beauty of this implementation, and now you exactly know where to evict, where to trigger that eviction algorithm, right? And that brings us to the next discussion, eviction. I try to weave a story out of it, okay? See, that's why I said this is my most favorite, deep into these details, because this is what matters, and everything else you can do it. But these design decisions, it would not just help you in designing cache, but a lot of other systems where you can think in very simple solutions rather than going for something very fancy or complex. Right.

<!-- topic-candidate [00:58:02]: Eviction strategies - LRU and LFU -->

[00:58:02] Okay. So this is how you know your cache is full. And now it's time to do eviction. What are the two most common eviction strategies? Rajiv.

> **Student Question [00:58:16] - Student 3 (Rajiv):** I had a question the previous slide basically, let's take it at the end. [check: speaker - "let's take it at the end" may be the teacher deferring]

**[00:58:21] Teacher:** We have set up the context for eviction, more than happy to take it in some time. Least recently [check: speaker boundary - "least recently" may be the start of Student 3's answer]

**[00:58:25] Student 3:** Used, LRU, and, and is one more, I'm not able to recall that. Yeah, of course.

**[00:58:39] Teacher:** There is one more. It's frequently used. Yeah. Right. Okay. What does LRU do? Sorry. What LRU does?

**[00:58:50] Student 3:** I mean, based on the recency of the usage of a particular key, it maintains what's the last timestamp where key was accessed. Then whenever the cache is full, it just tries to remove the least recently used key. That's what LRU does. And the second one, if you want me to go to LFU part as well, LFU part actually maintains the frequency of the usage of the keys. [unclear: "So home."] So it was a least frequently used key is used for eviction when the cache is [?full | asr: "sold"].

**[00:59:20] Teacher:** So where would you store this information that when was, let's say you're using LRU or [?LFU | asr: "LF"], in any case, you have to store this information that when was the key last used? When was the key? Like how frequently was the key used? Where would you store this information?

**[00:59:33] Student 3:** So frequency is, I mean, is a property of a key basically, because key is, is in both case keys is accessed basically. So, I'm maintaining some, some, some sort of data structure to find out the eviction keys is necessary. Like for example, priority queue could be used for a frequency type, right?

**[00:59:54] Teacher:** So you're talking about implementation. First, let's talk about storing this information. Where are you storing the information that when was my key, like least recently, when was my key last used? When would you store this information? Last used. You have to store, you said timestamp you need to store, right? Where are you storing this timestamp?
