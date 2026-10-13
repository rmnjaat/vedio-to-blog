# chunk_05  OWNS 00:48:29 -> 01:00:19  (segments #890-#1084, 1895 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:47:30] TEACHER: when you do size of this structure, this would spit out for four bites.   {#874}
CTX| [00:47:35] TEACHER: Right.   {#875}
CTX| [00:47:35] TEACHER: But in reality, this might be taking up a lot more than that.   {#876}
CTX| [00:47:39] TEACHER: So there has to be a better way to do this.   {#877}
CTX| [00:47:42] TEACHER: Which just solves this problem beautifully for everyone.   {#878}
CTX| [00:47:47] TEACHER: Like literally once and for all.   {#879}
CTX| [00:47:49] TEACHER: So just to provide a hint before I move to Jyotinder, just to provide a hint.   {#880}
CTX| [00:47:55] TEACHER: Thanks Gaurav for bringing that up, that you probe that size plus equal to something.   {#881}
CTX| [00:47:58] TEACHER: We have to maintain our own size.   {#882}
CTX| [00:48:00] TEACHER: This is exactly what every single cache does because using command is very expensive.   {#883}
CTX| [00:48:04] TEACHER: So everyone just implements or keeps track of the size that they are consumed.   {#884}
CTX| [00:48:10] TEACHER: So let me start with a hint so that we converge a little faster on this around how do we   {#885}
CTX| [00:48:18] TEACHER: allocate memory.   {#886}
CTX| [00:48:19] TEACHER: Assume you are writing code in C.   {#887}
CTX| [00:48:21] TEACHER: It holds true for Java, Python, whichever language you are using.   {#888}
CTX| [00:48:24] TEACHER: But I'm just referring to C because it just like they're all so used to it.   {#889}

---- OWNED SEGMENTS START ----
[00:48:29] TEACHER: So when we talk about allocating a memory on the heap, we use a function called malloc.   {#890}
[00:48:37] TEACHER: And maybe one we want to free it.   {#891}
[00:48:39] TEACHER: We use the function free to allocate or free to deallocate.   {#892}
[00:48:43] TEACHER: in malloc we pass the size that we want to allocate we want to allocate right and malloc   {#893}
[00:48:54] TEACHER: internally fire system call it grabs the memory in your ram and returns an address that you can   {#894}
[00:49:00] TEACHER: now start using right so that's what malloc does that's what free does uh free basically marks that   {#895}
[00:49:06] TEACHER: location as free for your operating system to say okay now this is free now i can do whatever i want   {#896}
[00:49:13] TEACHER: Now OS can choose to allocate that same chunk to other folks,   {#897}
[00:49:16] TEACHER: to other process, to other thing was sharing that same thing.   {#898}
[00:49:19] TEACHER: So given that we are using malloc and free to allocate and deallocate an object.   {#899}
[00:49:24] TEACHER: Now, just to, before we, before I ask that question.   {#900}
[00:49:26] TEACHER: Now, even when you are allocating this, my value, let's say someone is adding a new key in the system.   {#901}
[00:49:33] TEACHER: Someone is adding a new key in the system.   {#902}
[00:49:35] TEACHER: You would have to create this my value object, right?   {#903}
[00:49:39] TEACHER: So what will you do?   {#904}
[00:49:39] TEACHER: you will create object O is equal to my value star malloc.   {#905}
[00:49:48] TEACHER: And then you pass size of bracket my value.   {#906}
[00:49:54] TEACHER: Something like this.   {#907}
[00:49:55] TEACHER: You are trying to allocate these many bytes   {#908}
[00:49:58] TEACHER: and typecasting that object to my value   {#909}
[00:50:01] TEACHER: so that you can refer it over here.   {#910}
[00:50:02] TEACHER: And this is what you would store in your hash table.   {#911}
[00:50:05] TEACHER: Now given this is what you are doing,   {#912}
[00:50:08] TEACHER: what would be the simplest way to keep track of the amount of memory used?   {#913}
[00:50:14] STUDENT_5: Yeah. So, uh, like whenever we are adding something, we know how big it is, right?   {#914}
[00:50:21] STUDENT_5: So we can just keep track in a counter.   {#915}
[00:50:24] STUDENT_5: Like we can just maintain a counter and we know how much memory.   {#916}
[00:50:27] TEACHER: How, how, and where, what would be the simplest way or the most generic way to do it?   {#917}
[00:50:39] STUDENT_5: Your voice is making there is a lack.   {#918}
[00:50:45] STUDENT_5: Yeah.   {#919}
[00:50:45] STUDENT_5: Yeah.   {#920}
[00:50:46] STUDENT_5: There's a lack.   {#921}
[00:50:53] TEACHER: I'll just I'll just look like just just try to get in a better coverage.   {#922}
[00:50:58] TEACHER: I'll look you at another.   {#923}
[00:51:02] STUDENT_5: So if we explicitly have to allocate the size that we need on every call, can we not just   {#924}
[00:51:09] STUDENT_5: keep adding that plus an extra for the two point, the value point around the type pointer   {#925}
[00:51:15] STUDENT_5: type integer that we are storing.   {#926}
[00:51:18] STUDENT_5: So size of my value plus four plus four.   {#927}
[00:51:25] TEACHER: No, but size of my value itself is this plus this.   {#928}
[00:51:30] TEACHER: This white pointer is for white, this is for white,   {#929}
[00:51:32] TEACHER: but this pointer can point to a blue filter,   {#930}
[00:51:35] TEACHER: which might be like a one MVP.   {#931}
[00:51:41] STUDENT_5: Yeah, I actually misunderstood.   {#932}
[00:51:46] STUDENT_5: That's okay.   {#933}
[00:51:47] STUDENT_9: Because size of my value will give you this entire thing.   {#934}
[00:51:49] TEACHER: Right. But this itself is pointing to something.   {#935}
[00:51:52] TEACHER: Right. That is an interesting problem.   {#936}
[00:51:56] STUDENT_5: and we don't need to specifically allocate memory on heap for that as well.   {#937}
[00:52:02] TEACHER: Why not?   {#938}
[00:52:02] TEACHER: We have to allocate that bloom filter that let's say we are storing bloom filter in memory.   {#939}
[00:52:07] TEACHER: We have to allocate that memory as well, right?   {#940}
[00:52:10] STUDENT_5: So we are making a malloc call for that at some point.   {#941}
[00:52:13] STUDENT_5: Yes.   {#942}
[00:52:14] STUDENT_5: Yes.   {#943}
[00:52:16] STUDENT_5: So when we are making a malloc call,   {#944}
[00:52:19] STUDENT_5: like whenever we are actually storing that bloom filter,   {#945}
[00:52:22] STUDENT_5: then we need to add that size of two size.   {#946}
[00:52:26] TEACHER: Exactly.   {#947}
[00:52:26] TEACHER: So how do you implement it?   {#948}
[00:52:28] TEACHER: Whenever you, so which means that whenever you are making malloc, that's a perfect set.   {#949}
[00:52:32] TEACHER: Whenever you are making malloc call, even if we are allocating any value bleed, bloom   {#950}
[00:52:36] TEACHER: filter, set, list, anything in our cache, because everything is stored in heap, anything   {#951}
[00:52:43] TEACHER: we are ever allocating, we are invoking the same malloc function.   {#952}
[00:52:47] TEACHER: It's not that we are just allocating to create this my value object.   {#953}
[00:52:50] TEACHER: We are using it to even allocate, let's say we are implementing a link list.   {#954}
[00:52:56] TEACHER: will be malloc.   {#955}
[00:52:57] TEACHER: So in any case, we will always be invoking malloc and free always.   {#956}
[00:53:03] TEACHER: So every time we are mallocing, we just have to use, you have to maintain a counter that   {#957}
[00:53:09] TEACHER: does this size plus equal to size underscore alloc, whatever the variable name is over   {#958}
[00:53:13] TEACHER: here.   {#959}
[00:53:14] TEACHER: Every time.   {#960}
[00:53:15] TEACHER: So what's the simplest way to implement it?   {#961}
[00:53:18] TEACHER: That every time you are doing something, you want to do something.   {#962}
[00:53:23] STUDENT_5: I think create our own wrapper around malloc and lid.   {#963}
[00:53:28] TEACHER: Exactly.   {#964}
[00:53:30] TEACHER: So what redis does, it just wrapped the malloc function under a function called z malloc.   {#965}
[00:53:39] TEACHER: And what it does internally, it just does this.   {#966}
[00:53:43] TEACHER: So z malloc is a very simple wrapper over malloc function that does this.   {#967}
[00:53:48] TEACHER: Z malloc has the exact same signature as malloc.   {#968}
[00:53:53] TEACHER: And what it does?   {#969}
[00:53:55] TEACHER: It internally does malloc.   {#970}
[00:53:57] TEACHER: Of size B.   {#971}
[00:53:59] TEACHER: It does total size.   {#972}
[00:54:04] TEACHER: Plus equal to B.   {#973}
[00:54:05] TEACHER: And it returns O.   {#974}
[00:54:07] TEACHER: That's it.   {#975}
[00:54:10] TEACHER: So now in the total size variable.   {#976}
[00:54:12] TEACHER: Which is global variable.   {#977}
[00:54:13] TEACHER: You would always know.   {#978}
[00:54:14] TEACHER: The amount of memory that you are consuming.   {#979}
[00:54:17] TEACHER: Always, always, always know this.   {#980}
[00:54:19] TEACHER: You don't have to rely on a fancy operating system command   {#981}
[00:54:22] TEACHER: to give you this information.   {#982}
[00:54:25] TEACHER: Redis does that to periodically check on the usage,   {#983}
[00:54:28] TEACHER: but it's still occasionally it's fine.   {#984}
[00:54:30] TEACHER: But in most cases, you just have to do this.   {#985}
[00:54:32] TEACHER: So you are just wrapping the malloc.   {#986}
[00:54:34] TEACHER: It is such a simple and elegant solution to a very tricky problem   {#987}
[00:54:38] TEACHER: because a naive way you may think of,   {#988}
[00:54:40] TEACHER: hey, every time I'm doing malloc, I'll do count plus equal to 1.   {#989}
[00:54:43] TEACHER: So if you're doing malloc at 50,000 places,   {#990}
[00:54:46] TEACHER: If one of the places you forgot to do total size plus equal to something that's bad.   {#991}
[00:54:50] TEACHER: So which is where you do it at one place.   {#992}
[00:54:52] TEACHER: Now in your code base or in Redisys code base if you are checking that out.   {#993}
[00:54:57] TEACHER: Everywhere in the code base you would never see malloc.   {#994}
[00:55:00] TEACHER: You would always see z malloc which has the exact same signature as malloc.   {#995}
[00:55:04] TEACHER: But the idea being that internally it just updates the count.   {#996}
[00:55:09] TEACHER: Okay and this is how you would know that total size is giving you   {#997}
[00:55:16] TEACHER: the total memory consumed by your cache.   {#998}
[00:55:21] TEACHER: If it goes beyond a cap.   {#999}
[00:55:22] TEACHER: Now let's say whenever you start a redis server or any in-memory cache,   {#1000}
[00:55:26] TEACHER: you define a total size that you would want to work with.   {#1001}
[00:55:28] TEACHER: Let's say you specify it as 1 GB.   {#1002}
[00:55:30] TEACHER: It's a soft limit.   {#1003}
[00:55:33] TEACHER: Although your machine might have 32 GB RAM,   {#1004}
[00:55:35] TEACHER: you're putting this limit at a time.   {#1005}
[00:55:36] TEACHER: My cache will not take more than 1 GB at any given point in time.   {#1006}
[00:55:40] TEACHER: Given this, what would happen is you can now in Z malloc itself,   {#1007}
[00:55:46] TEACHER: That when you're allocating, you can just check beforehand that if total size plus B is greater than max limit, you return an error.   {#1008}
[00:56:04] TEACHER: Otherwise you allocate and return the object, something around that.   {#1009}
[00:56:07] TEACHER: Or otherwise you can even here trigger eviction.   {#1010}
[00:56:13] TEACHER: That comes to our next point of discussion.   {#1011}
[00:56:16] TEACHER: Now that you know the limit that you have put,   {#1012}
[00:56:20] TEACHER: operating system might have 32 GB RAM.   {#1013}
[00:56:22] TEACHER: But what you have is you are capping a limit to 1 GB   {#1014}
[00:56:26] TEACHER: because that's a user defined configuration.   {#1015}
[00:56:28] TEACHER: That my cache cannot take more than 1 GB.   {#1016}
[00:56:30] TEACHER: So now what would happen is,   {#1017}
[00:56:32] TEACHER: you can now very easily check if my total size plus B,   {#1018}
[00:56:35] TEACHER: which means the total size which is consumed up until now,   {#1019}
[00:56:39] TEACHER: plus B is greater than max.   {#1020}
[00:56:42] TEACHER: If it is going beyond the limit,   {#1021}
[00:56:46] TEACHER: I can remove a key and then allocate and then total size plus plus and then return that object.   {#1022}
[00:56:52] TEACHER: This is where you plug in that eviction algorithm that we will discuss next.   {#1023}
[00:56:57] TEACHER: But this is such a beautiful piece of implementation.   {#1024}
[00:57:00] TEACHER: Nothing fancy.   {#1025}
[00:57:01] TEACHER: It's really basic logic that we are applying.   {#1026}
[00:57:03] TEACHER: But this is what tells you that how big systems are built on very simple solutions.   {#1027}
[00:57:09] TEACHER: Nothing fancy.   {#1028}
[00:57:10] TEACHER: It's very simple.   {#1029}
[00:57:11] TEACHER: Trust me, Redis source code is one of the easiest source code that you can skim through.   {#1030}
[00:57:16] TEACHER: any file starts giving the data you'll start understanding it fifth or sixth day you'll start   {#1031}
[00:57:20] TEACHER: understanding everything out of it's very beautiful piece of code but i i thoroughly enjoyed going   {#1032}
[00:57:26] TEACHER: through it right but this is the beauty of this implementation and now you exactly know where to   {#1033}
[00:57:32] TEACHER: evict where to trigger that eviction algorithm right and that brings us to the next discussion   {#1034}
[00:57:39] TEACHER: eviction i try to weave a story out of it okay see that's why i said this is my most favorite   {#1035}
[00:57:46] TEACHER: deep into these details because this is what matters and everything else you can do it.   {#1036}
[00:57:51] TEACHER: But these design decisions, it would not just help you in designing cash, but a lot of other   {#1037}
[00:57:55] TEACHER: systems where you can think in very simple solutions rather than going for something   {#1038}
[00:57:59] TEACHER: very fancy or complex.   {#1039}
[00:58:01] TEACHER: Right.   {#1040}
[00:58:02] TEACHER: Okay.   {#1041}
[00:58:02] TEACHER: So this is how you know your cash is full.   {#1042}
[00:58:06] TEACHER: And now it's time to do eviction.   {#1043}
[00:58:09] TEACHER: What are the two most common eviction strategies?   {#1044}
[00:58:14] TEACHER: Rajiv.   {#1045}
[00:58:16] STUDENT_3: I had a question the previous slide basically let's let's let's let's take it at the end   {#1046}
[00:58:21] TEACHER: we have set up the context for eviction more than happy to take it in some time least recently   {#1047}
[00:58:25] STUDENT_3: used LRU and and uh is one more I'm not able to recall that uh yeah of course   {#1048}
[00:58:39] TEACHER: There is one more.   {#1049}
[00:58:41] TEACHER: It's frequently used.   {#1050}
[00:58:43] TEACHER: Yeah.   {#1051}
[00:58:44] TEACHER: Right.   {#1052}
[00:58:44] TEACHER: Okay.   {#1053}
[00:58:46] TEACHER: What does LRU do?   {#1054}
[00:58:47] TEACHER: Sorry.   {#1055}
[00:58:48] TEACHER: What LRU does?   {#1056}
[00:58:50] STUDENT_3: I mean, based on the recency of the usage of a particular key, it maintains what's the   {#1057}
[00:58:56] STUDENT_3: last timestamp where key was accessed.   {#1058}
[00:59:00] STUDENT_3: Then whenever the cache is full, it just tries to remove the least recently used key.   {#1059}
[00:59:05] STUDENT_3: That's what LRU does.   {#1060}
[00:59:08] STUDENT_3: And the second one, if you want me to go to LFU part as well, LFU part actually maintains   {#1061}
[00:59:14] STUDENT_3: the frequency of the usage of the keys.   {#1062}
[00:59:16] STUDENT_3: So home.   {#1063}
[00:59:16] STUDENT_3: So it was a least frequently used key is used for erection when the cache is sold.   {#1064}
[00:59:20] TEACHER: So where would you store this information that when was, let's say you're using LRU or   {#1065}
[00:59:24] TEACHER: LF in any case, you have to store this information that when was the key last used?   {#1066}
[00:59:29] TEACHER: When was the key?   {#1067}
[00:59:30] TEACHER: Like how frequently was the key used?   {#1068}
[00:59:31] TEACHER: Where would you store this information?   {#1069}
[00:59:33] STUDENT_3: Uh, so frequency is, uh, I mean, is a property of a key basically because key is, is in both   {#1070}
[00:59:40] STUDENT_3: case keys is accessed basically.   {#1071}
[00:59:42] STUDENT_3: So, um, I'm maintaining some, some, some sort of data structure to find out, uh, the eviction   {#1072}
[00:59:49] STUDENT_3: keys is necessary.   {#1073}
[00:59:50] STUDENT_3: Like for example, priority queue could be used for a frequency type, right?   {#1074}
[00:59:54] TEACHER: So you're talking about implementation.   {#1075}
[00:59:55] TEACHER: First, let's talk about storing this information.   {#1076}
[00:59:57] TEACHER: Where are you storing the information that when was my key?   {#1077}
[01:00:00] TEACHER: like least recently,   {#1078}
[01:00:01] TEACHER: when was my key last used?   {#1079}
[01:00:04] TEACHER: When would you store this information?   {#1080}
[01:00:06] TEACHER: Last used.   {#1081}
[01:00:07] TEACHER: You have to store,   {#1082}
[01:00:08] TEACHER: you said timestamp you need to store, right?   {#1083}
[01:00:10] TEACHER: Where are you storing this timestamp?   {#1084}
---- OWNED SEGMENTS END ----

CTX| [01:00:19] STUDENT_3: Okay.   {#1085}
CTX| [01:00:22] TEACHER: Which is why?   {#1086}
CTX| [01:00:23] TEACHER: This wrapper.   {#1087}
CTX| [01:00:27] STUDENT_3: In the my right use,   {#1088}
CTX| [01:00:28] STUDENT_3: that means you need to,   {#1089}
CTX| [01:00:30] STUDENT_3: It says all the keys then.   {#1090}
CTX| [01:00:32] TEACHER: No, we'll talk about deployment first storing the information is important.   {#1091}
CTX| [01:00:35] TEACHER: Right.   {#1092}
CTX| [01:00:35] TEACHER: When was this key last used, right?   {#1093}
CTX| [01:00:38] TEACHER: That is important.   {#1094}
CTX| [01:00:39] TEACHER: Right.   {#1095}
CTX| [01:00:40] TEACHER: So instead of storing that information in a separate data structure, you already have one.   {#1096}
CTX| [01:00:45] TEACHER: So in that, along with the type, what you store, you store LRU bits.   {#1097}
CTX| [01:00:52] TEACHER: Again, you store four bits or something like that.   {#1098}
CTX| [01:00:55] TEACHER: We'll, we'll come to like, what's the sizing of it.   {#1099}
CTX| [01:00:57] TEACHER: It's actually 24 bits.   {#1100}
CTX| [01:01:00] TEACHER: 8 bits, 28 bits, it stores as LRU bits.   {#1101}
CTX| [01:01:02] TEACHER: Redis does that.   {#1102}
CTX| [01:01:03] TEACHER: It looks like I'm going deep into Redis, but it's not just Redis,   {#1103}
CTX| [01:01:06] TEACHER: but any database that you pick has something around it.   {#1104}
CTX| [01:01:09] TEACHER: Now, if you look carefully, this 4 bits and this 28 bits becomes 32 bits.   {#1105}
CTX| [01:01:13] TEACHER: This becomes 32 bits.   {#1106}
CTX| [01:01:14] TEACHER: So this becomes one integer.   {#1107}
CTX| [01:01:15] TEACHER: This becomes two integers.   {#1108}
CTX| [01:01:17] TEACHER: So we are trying to make it very space efficient.   {#1109}
