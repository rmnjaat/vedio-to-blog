**[01:11:59] Student 4 (Mohit):** which were used more often, right? So in that case, a frequency based option would be better. For example, you are doing a scan query on database. In that case, an LFU strategy would be better because a scan would not wipe out say very the items which are heavily used.

**[01:12:22] Teacher:** Brilliant. This is a first time someone has very beautifully explained where you should use LFU. Thanks so much Mohit for this. I'll just elaborate on this so that everyone's on the same page. Thanks so much.

<!-- topic-candidate [01:12:33]: LFU - stock market analogy -->

[01:12:33] So this is like stock market. So one analogy that I give people to understand LRU and LFU, especially LFU is stock market and not as a use case, but as a human behavior. So what happens is in stock market, let's say you bought a stock, full faith in that stock. No matter what, this stock is going good, will do great. So you invested in that stock. Stock was rising. You were happy. You were happy. [check: possible ASR duplicate] And then the stock fell.

[01:13:06] Now, when the stock fell, it's your choice to either withdraw the money at this stage or you still trust that this stock would grow again. This would rise again, right? So if it rises again then you are happy, right? But if it falls then you're sad again, okay, I should have evicted. This is exactly what LFU is. LFU because it works on frequency. A simple way to look at it is when your keys are not recently used, do you want to evict it, your stock is not performing well recently, you still want to hold it or not. That's LFU for me. If you don't want to evict when your stock is not performing well at this moment, you are holding it, expecting it to be used again. That's LFU. You are not going by the recency bias over here. Instead, you are thinking because it did well in the past, it would do well in the future, keeping your trust in that stock. That's LFU.

[01:14:17] Now it should be very clear in your head on where can you use LFU and when you are having the trust that even though recently this is not doing well, I would still want to keep this key in my cache. You would use LFU. I'll give a practical example. A practical example for this was an analogy that I gave that when you are seeing a dip in the access of a particular key, but you still want to keep that key in cache, still what you would still use LFU for that. An example for that is Wikipedia pages. Right. So in Wikipedia pages, there you like Wikipedia obviously has a ton of cache in that. In that, what you would see is that if a page is, let's say not frequently used at this moment, but it was very frequently used in, it was very frequently accessed in the past. I would still like to keep this memory.

[01:15:11] Let's say there is FIFA World Cup. Everyone is opening FIFA pages, FIFA pages, FIFA pages, but it does not take credit away from other top pages that were anyway visited far more often. Just because of the recency of this FIFA page, why would you want to curb other pages which were equally, which were more famous in the past? Because tomorrow they would be accessed again with the same frequency once this fad goes away. This is where LFU comes into the place. Where recency effect, you don't want recency effect to take its, effect to evict a particular key, instead what you are doing is you are saying that if something was very frequently accessed in the past will be frequently accessed in the future. That's where you go for LRU. And in LRU, LRU is typically simple where you know the access pattern that you have is something like this.

**[01:16:03] Teacher?:** Wait, let me, do I have an example for that?

**[01:16:09] Teacher:** So let's say you have your access pattern, something like this, which means that some keys or this is for a particular key, a key is accessed very aggressively at first, but then there is a slump in the access. This is an indication of LRU implementation. This is where you can use LRU because now things that were accessed very frequently. It's like all social media trends. A song is popular. Everyone's creating reel on that. That song is cached on YouTube or Insta or whatever. But once that fad is away, no one's picking reels on it. So it's okay to not put it in cache. LRU.

[01:16:53] So classic example of LRU, Google News. Where what are the odds that you are reading news that is a week old? Not really. You would be reading news that is one day old, two day old at max. So you are very likely to, that's where recency, things that are really recent are very highly likely to be accessed again and again. That's where you would have your LRU implementation, but where it's more about that, hey, what was very famous in the past may not be today, but it will be famous again in the future. You want to keep the things there. You would use LFU, right?

[01:17:26] Depending on the use case of this, picking one over the other, there is not that LRU always works best or LFU always works best. In most cases, you would not even see the difference between LRU and LFU in [?production | asr: "protection"] system. But in some extreme cases, you would see a significant difference. So whenever you are configuring something like this, spend time understanding your application, understanding your user behavior, see how a particular key is accessed, understand the life cycle of a particular key in your system, and then take a decision of this or this.

[01:17:57] The way Redis does, Redis still does LRU, LFU random. It supports all three. It does LRU, LFU implementation very efficiently using LRU bits. Unfortunately, I cannot dive deep into it. It's a very superb algorithm that it uses. And I, I so want to talk about it, but time is very limited and would make this discussion go in a very random direction, but that's what Redis does. I highly encourage you to explore that out in any case, if you are interested into diving deep into Redis, I have a course, not a plug, but just out of curiosity, if you would want to know everything about Redis internals, I have a very detailed course. It says 9 plus hours, but it's 9 plus hours of very dense information around everything on this one. And actual Redis code walkthrough and implementation in Golang. That's how I got very detailed understanding of it. I like implementing stuff.

[01:18:44] Okay. So this is about eviction. LRU, LFU, random, when to use, how to use, overheads that use. Right. So eviction done.

<!-- topic-candidate [01:18:54]: Communication protocol -->

[01:18:54] Now let's talk about communication. Communication is very important around how you are letting some other system talk to your system, talk to your cache. So which communication protocol would you use over here? Let's say this is your single node machine in which you are hosted your cache. Which communication protocol, what kind of [unclear: "EKS"] would you use to expose your cache to other systems? Raise your hands or pull you in.

**[01:19:33] Student?:** Yes, yeah.

**[01:19:36] Student?:** It's TCP.

**[01:19:37] Teacher?:** Why?

**[01:19:40] Student 7:** As in, I mean, any HTTP would, it's just a, it would, we won't need, what do we say? I mean, the server can forget, like it doesn't need to cache anything, like nothing like WebSockets and all. So.

**[01:20:01] Teacher:** But then what is the, what is the, what is the disadvantage of using HTTP?

**[01:20:10] Student 7:** We have to like the payload size and all.

**[01:20:13] Teacher:** Payload size is huge. Why? Why is payload size huge?

**[01:20:18] Student 7:** I mean, the key when we are doing the get request, the key would be small, but the data, which is being fetched from the cache.

**[01:20:27] Teacher:** That is true for anything that you use, right? The value that you have to transfer it, [unclear: "we test it up"] or anything that you're using. What difference does it make? Okay. Let's start with this. What, which other options do you have apart from HTTP?

**[01:20:44] Student 7:** We have WebSockets.

**[01:20:48] Teacher:** Okay.

**[01:20:51] Student 7:** Other protocols. I don't have names in my. Yeah.

**[01:21:05] Teacher:** What else?

**[01:21:11] Student?:** You can write your own. [check: speaker - "You can." is STUDENT_9, "write your own." starts the TEACHER segment; answers "What else?" and the teacher affirms it]

**[~01:21:12] Teacher:** Right. So you can write your own. Why not? And then [unclear: "what is at 10"], all these three are just TCP connections. Correct. There's nothing fancy. They're just TCP connections. The way you are sending the data is just wrapped. It just sent in a particular format. That format is either HTTP packets or gRPC format or your own custom form.

[01:21:40] Right. So at the end, it needs to be a TCP connection. Now, if you use HTTP, when I say HTTP, it means HTTP 1.1. Now, HTTP 1.1 normal web server. What would happen again? Establishing TCP connection is a three-way handshake and two-way tear down. So if you're making it stateless, like every time you get a request you are establishing TCP connections, sending the data, getting the request particular, whatever you're doing, they're responding back and then you're terminating the connection. So every time an API server needs to establish the connection with the cache you have to establish the TCP, like reestablish the TCP connection every time. So three-way handshake, two-way tear down every time, very unperformant, very inefficient, right? Very inefficient in the implementation, so might not be the best.

<!-- topic-candidate [01:22:30]: Detour - IoT sensor story (HTTP vs raw TCP) -->

[01:22:30] The payload example that you gave, I just want to take a small detour over here and showcase how, again, I had no intention of this, but long time back, I got very curious about a lot of stuff. Well, that's okay. So what I did is few of my friends, rather two of my friends came to me and and they said that, Arpit, we are building an IoT application. We have sensor data and we want to send data to this backend server. They knew Python, so they wrote a backend server in Python. So Flask framework HTTP request, that's what they knew. We had no idea what we were doing. They came to me as a problem and I just solved it for that. So while that, I explored this very interesting part.

[01:23:24] So for us to make requests in the backend, class will extend by at least 15 minutes, but it's fine. I want all of you to go in this depth because I'm finding it very interesting to discuss this thing. This is my most favorite week of all.
