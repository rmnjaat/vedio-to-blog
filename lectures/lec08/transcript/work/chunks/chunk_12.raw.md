# chunk_12  OWNS 02:07:07 -> 02:19:41  (segments #2144-#2379, 2159 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:06:10] TEACHER: But now with this distributed things in place, instead of having one process, you have multiple   {#2125}
CTX| [02:06:16] TEACHER: machines within which they need to coordinate.   {#2126}
CTX| [02:06:19] TEACHER: So that is why you need to have a remote lock manager that does that.   {#2127}
CTX| [02:06:23] TEACHER: Now, let me take you through a journey over here, not a story story, but simple things   {#2128}
CTX| [02:06:30] TEACHER: to think about in our database or in airline checking system, there were multiple transactions.   {#2129}
CTX| [02:06:36] TEACHER: Think about it.   {#2130}
CTX| [02:06:37] TEACHER: Each transaction is a thread.   {#2131}
CTX| [02:06:39] TEACHER: Right.   {#2132}
CTX| [02:06:39] TEACHER: So what we saw there.   {#2133}
CTX| [02:06:41] TEACHER: When there were multiple threads.   {#2134}
CTX| [02:06:43] TEACHER: And we wanted to synchronize between them.   {#2135}
CTX| [02:06:45] TEACHER: Where one takes lock on something.   {#2136}
CTX| [02:06:47] TEACHER: Other cannot do that.   {#2137}
CTX| [02:06:49] TEACHER: But that part was basically stored in memory.   {#2138}
CTX| [02:06:53] TEACHER: Because multiple threads synchronizes through an in-memory thing.   {#2139}
CTX| [02:06:58] TEACHER: Mutex, SimaPur, explicit locking, atomic instructions, whatnot.   {#2140}
CTX| [02:07:02] TEACHER: Right.   {#2141}
CTX| [02:07:03] TEACHER: Because what is common between multiple threads?   {#2142}
CTX| [02:07:05] TEACHER: RAM.   {#2143}

---- OWNED SEGMENTS START ----
[02:07:07] TEACHER: Now, what if I want to synchronize two processes?   {#2144}
[02:07:10] TEACHER: For example, when a process is running and doing processing of one thing, other process   {#2145}
[02:07:17] TEACHER: cannot do that.   {#2146}
[02:07:18] TEACHER: I'll give an example.   {#2147}
[02:07:19] TEACHER: apt-get upgrade.   {#2148}
[02:07:20] TEACHER: If you have ever used Ubuntu, most of you would have.   {#2149}
[02:07:24] TEACHER: In order to install packages on Ubuntu or upgrade packages on Ubuntu, you fire sudo apt-get   {#2150}
[02:07:29] TEACHER: update or apt-get upgrade.   {#2151}
[02:07:31] TEACHER: When you open this in two different terminal and you run apt-get update.   {#2152}
[02:07:36] TEACHER: I used to always wonder why that's not working.   {#2153}
[02:07:38] TEACHER: Right.   {#2154}
[02:07:39] TEACHER: So I thought running on two terminals would make it faster.   {#2155}
[02:07:42] TEACHER: So I used to do that, but what did you used to give me error?   {#2156}
[02:07:45] TEACHER: I'm talking way back in 2008 and 2009.   {#2157}
[02:07:48] TEACHER: So I got first year college.   {#2158}
[02:07:50] TEACHER: We just got introduced to Ubuntu and we learned how to install packages.   {#2159}
[02:07:55] TEACHER: So BIM and water cover and the package used to install,   {#2160}
[02:07:58] TEACHER: Moo and cat and something, something is probably used to do that.   {#2161}
[02:08:01] TEACHER: So when I used to do APT, get updated, upgrade stuff.   {#2162}
[02:08:06] TEACHER: I thought that if I open multiple terminals and run apt-get upgrade on both sides, it   {#2163}
[02:08:11] TEACHER: would be twice X fast.   {#2164}
[02:08:13] TEACHER: But what used to happen was when I used to run on one and I should trigger on other,   {#2165}
[02:08:18] TEACHER: the other used to say dpkg.log file exists.   {#2166}
[02:08:21] TEACHER: We cannot move forward.   {#2167}
[02:08:22] TEACHER: I like, oh, so you cannot run multiple instances of it.   {#2168}
[02:08:25] TEACHER: Now here, if you think about it, this is where between two processes, what is shared?   {#2169}
[02:08:31] TEACHER: The disk.   {#2170}
[02:08:32] TEACHER: So they did not want two instances of apt-get upgrade running at the center because it would have made it into an inconsistent state and what not.   {#2171}
[02:08:40] TEACHER: So they had to ensure only one when at any given point in time at max one apt-get upgrade should run.   {#2172}
[02:08:47] TEACHER: So what did they do?   {#2173}
[02:08:48] TEACHER: When the process starts, it creates a dpkg.log file.   {#2174}
[02:08:52] TEACHER: Every process that starts, it checks if this file exists, it kills itself.   {#2175}
[02:08:56] TEACHER: If it does not exist, it takes it and then it moves forward and events it done processing, it kills the file or it deletes the file.   {#2176}
[02:09:03] TEACHER: So multiple threads synchronizes through memory constructs with mutex and semifers.   {#2177}
[02:09:08] TEACHER: Multiple processes synchronize through disk because that is the closest storage which is shared between processes.   {#2178}
[02:09:15] TEACHER: Now when you think about multiple machines, what is shared between them?   {#2179}
[02:09:19] TEACHER: Disk? No. Network.   {#2180}
[02:09:21] TEACHER: So which is where remote logs come in.   {#2181}
[02:09:24] TEACHER: This is how like it's very easy.   {#2182}
[02:09:27] TEACHER: This is the intuition that I want all of you to form.   {#2183}
[02:09:29] TEACHER: That what is the closest one and you just.   {#2184}
[02:09:32] TEACHER: It should just naturally complete.   {#2185}
[02:09:34] TEACHER: Right.   {#2186}
[02:09:35] TEACHER: So you saw, you see examples of every one of them, all three examples, which is where you see when there are multiple machines that they want to synchronize.   {#2187}
[02:09:43] TEACHER: What they do is they use remote locks because network is shared between multiple machines.   {#2188}
[02:09:48] TEACHER: Right.   {#2189}
[02:09:48] TEACHER: Okay.   {#2190}
[02:09:49] TEACHER: So in order to understand this better, let me take a practical example of that because obviously practical beats theory any day.   {#2191}
[02:09:55] TEACHER: So let me take a practical example of it to understand what would we need to do.   {#2192}
[02:09:59] TEACHER: Now, hypothetically, let's say we have a very stupid queue.   {#2193}
[02:10:02] TEACHER: People don't know how to implement it.   {#2194}
[02:10:04] TEACHER: Let's say this, the developer of this queue was extremely stupid,   {#2195}
[02:10:07] TEACHER: did not know how to implement queue.   {#2196}
[02:10:09] TEACHER: And what he did, uh, is that he created a queue, which gives zero protection,   {#2197}
[02:10:16] TEACHER: zero protection.   {#2198}
[02:10:17] TEACHER: So literally any consumer that comes, the person literally just wrote a remote   {#2199}
[02:10:21] TEACHER: queue, which says like makes an API call.   {#2200}
[02:10:23] TEACHER: It just do queue.pop and returns it.   {#2201}
[02:10:26] TEACHER: queue.pop is not thread set.   {#2202}
[02:10:28] TEACHER: Multiple people, if   {#2203}
[02:10:30] TEACHER: multiple consumers fire the request at the same time   {#2204}
[02:10:31] TEACHER: it is very much possible all of like   {#2205}
[02:10:33] TEACHER: some of them will get the same message, some will   {#2206}
[02:10:35] TEACHER: get different message. There is no protection.   {#2207}
[02:10:37] TEACHER: But what you want out of this   {#2208}
[02:10:40] TEACHER: somehow you are stuck with this queue.   {#2209}
[02:10:42] TEACHER: Somehow, hypothetically, you are   {#2210}
[02:10:44] TEACHER: stuck with this queue and what you want   {#2211}
[02:10:46] TEACHER: is you want   {#2212}
[02:10:48] TEACHER: this queue is remote.   {#2213}
[02:10:50] TEACHER: Remote queue like SQS. This is not   {#2214}
[02:10:51] TEACHER: SQS. Don't go into those guarantees. I am   {#2215}
[02:10:55] TEACHER: give you any protection.   {#2216}
[02:10:57] TEACHER: Right.   {#2217}
[02:10:57] TEACHER: I think that this queue exists, but what you want is you want the three consumers consuming   {#2218}
[02:11:03] TEACHER: from this queue.   {#2219}
[02:11:04] TEACHER: Don't worry about throughput, but what we want to ensure is that when one consumer reads   {#2220}
[02:11:14] TEACHER: from this queue, other consumers cannot.   {#2221}
[02:11:18] TEACHER: I want exclusivity.   {#2222}
[02:11:20] TEACHER: So when one consumer is reading from this queue, the other consumer cannot do anything   {#2223}
[02:11:26] TEACHER: at that point in time.   {#2224}
[02:11:27] TEACHER: When it is done reading, then other consumers can read from the queue and will get a message.   {#2225}
[02:11:33] TEACHER: But at any given point in time, only one consumer is allowed to read from the queue.   {#2226}
[02:11:37] TEACHER: How will you implement this?   {#2227}
[02:11:39] TEACHER: And let's say this queue's ID is called queue 7.   {#2228}
[02:11:42] TEACHER: Hypothetically.   {#2229}
[02:11:43] TEACHER: How would you achieve this?   {#2230}
[02:11:46] TEACHER: Raise your hand, Salpolio.   {#2231}
[02:11:49] TEACHER: Akshay?   {#2232}
[02:11:54] STUDENT_3: It's mostly remote, right?   {#2233}
[02:11:56] TEACHER: It has to be remote. Multiple consumers, different machines.   {#2234}
[02:12:02] STUDENT_3: Okay, like we can have like a synchronized block when the get or pop method is being used.   {#2235}
[02:12:11] TEACHER: No, that's remote. This queue is remote. This is not local queue.   {#2236}
[02:12:14] TEACHER: That's what I said. It's a remote queue.   {#2237}
[02:12:25] STUDENT_4: So in the server, wherever the queue is implemented, we can have a lock with respect to that particular   {#2238}
[02:12:31] TEACHER: I mean, what would this lock to you, you, you, you cannot change queues.   {#2239}
[02:12:37] TEACHER: You cannot change queue.   {#2240}
[02:12:37] STUDENT_5: queue is black box for you.   {#2241}
[02:12:40] STUDENT_4: No, I am not changing the queue   {#2242}
[02:12:42] STUDENT_4: but in whichever   {#2243}
[02:12:44] STUDENT_4: server   {#2244}
[02:12:46] STUDENT_4: no, wherever the queue   {#2245}
[02:12:48] STUDENT_4: is located in whichever server it is present   {#2246}
[02:12:50] STUDENT_4: the consumer needs to first get the   {#2247}
[02:12:52] STUDENT_4: lock and before accessing the queue.   {#2248}
[02:12:55] STUDENT_4: How?   {#2249}
[02:12:59] TEACHER: You cannot access   {#2250}
[02:13:00] TEACHER: the server there. That's what I am saying.   {#2251}
[02:13:02] TEACHER: That's a black box.   {#2252}
[02:13:04] TEACHER: Okay.   {#2253}
[02:13:06] TEACHER: Aditi?   {#2254}
[02:13:09] STUDENT_12: Maybe we can introduce a layer in between.   {#2255}
[02:13:13] STUDENT_12: And if we have to access the queue, we have to pass through that layer.   {#2256}
[02:13:16] STUDENT_12: And in that layer, we can implement that only one request can be passed at a time.   {#2257}
[02:13:22] TEACHER: But then, then that layer becomes a portal.   {#2258}
[02:13:25] TEACHER: You have queue already.   {#2259}
[02:13:26] TEACHER: Now you're adding one more layer to that.   {#2260}
[02:13:30] TEACHER: We are talking about lock manager implement a lock manager.   {#2261}
[02:13:39] STUDENT_7: If we don't want another layer, then can it be another process on the same machine, which   {#2262}
[02:13:45] STUDENT_7: is running the queue?   {#2263}
[02:13:46] TEACHER: No, you cannot.   {#2264}
[02:13:47] TEACHER: That's a black box for you.   {#2265}
[02:13:48] TEACHER: That's a remote call for you.   {#2266}
[02:13:50] TEACHER: God, for you, there is just one API call exposed.   {#2267}
[02:13:53] TEACHER: You make that API call, you get message from the queue, but that is unprotected.   {#2268}
[02:13:59] TEACHER: Wait, let me, let me do that.   {#2269}
[02:14:00] TEACHER: This discussion is going in random directions, but let me sort it out.   {#2270}
[02:14:03] TEACHER: I'll lower their hands.   {#2271}
[02:14:06] TEACHER: will directly chop it.   {#2272}
[02:14:09] TEACHER: Okay.   {#2273}
[02:14:10] TEACHER: So here the problem is   {#2274}
[02:14:11] TEACHER: this queue   {#2275}
[02:14:13] TEACHER: is a remote queue   {#2276}
[02:14:14] TEACHER: because of which   {#2277}
[02:14:15] TEACHER: what is happening   {#2278}
[02:14:16] TEACHER: is because it is a remote queue   {#2279}
[02:14:18] TEACHER: every consumer is having   {#2280}
[02:14:20] TEACHER: an API call to make   {#2281}
[02:14:21] TEACHER: which reads message   {#2282}
[02:14:22] TEACHER: from the queue.   {#2283}
[02:14:23] TEACHER: Now what is happening is   {#2284}
[02:14:24] TEACHER: you want only one consumer   {#2285}
[02:14:26] TEACHER: to read message   {#2286}
[02:14:26] TEACHER: at a given point in time.   {#2287}
[02:14:28] TEACHER: So what do you do?   {#2288}
[02:14:29] TEACHER: You need to ensure   {#2289}
[02:14:30] TEACHER: that some of these   {#2290}
[02:14:31] TEACHER: three consumers   {#2291}
[02:14:32] TEACHER: coordinate among themselves   {#2292}
[02:14:33] TEACHER: and knows   {#2293}
[02:14:35] TEACHER: make a call. So what you do, you use a database as a lock manager. Some database in which you   {#2294}
[02:14:41] TEACHER: have a key, let's say Q7 and you store against which consumer is allowed to take a lock or   {#2295}
[02:14:49] TEACHER: sorry, which consumer is allowed to read from the queue. And so you take a database that   {#2296}
[02:14:54] TEACHER: gives you this feature in which you create a key called Q7 against which you store. Let's   {#2297}
[02:15:00] TEACHER: the consumer one right now owns the log.   {#2298}
[02:15:02] TEACHER: So it would be consumer one.   {#2299}
[02:15:05] TEACHER: So given consumer one owns the log, it can go and read it.   {#2300}
[02:15:08] TEACHER: Other consumers would see whose name is there over here.   {#2301}
[02:15:12] TEACHER: If it is consumer one, then only consumer one can read it.   {#2302}
[02:15:16] TEACHER: Consumer two and consumer three would say, okay, we are not going to read it because   {#2303}
[02:15:18] TEACHER: this is held by consumer one.   {#2304}
[02:15:20] TEACHER: Right.   {#2305}
[02:15:21] TEACHER: Now, as soon as consumer one is done processing.   {#2306}
[02:15:24] TEACHER: So here all the three.   {#2307}
[02:15:27] TEACHER: could listen to this okay when consumer one is done processing it would remove its name   {#2308}
[02:15:33] TEACHER: from here now it is open now consumer two and consumer three would compete who puts their name   {#2309}
[02:15:38] TEACHER: inside this now let's say consumer three one so when consumer three one now consumer one and   {#2310}
[02:15:44] TEACHER: consumer two when they're trying to read the next message they would say oh consumer three name is   {#2311}
[02:15:47] TEACHER: already here so we can't do much so they would wait right but consumer three because it has its   {#2312}
[02:15:52] TEACHER: name it can go and read the message from the queue.   {#2313}
[02:15:55] TEACHER: This is a classic lock manager implementation.   {#2314}
[02:15:59] TEACHER: Now here this is exactly what you need to store that what's the resource and who owns   {#2315}
[02:16:04] TEACHER: this resource.   {#2316}
[02:16:05] TEACHER: But now there is a catch.   {#2317}
[02:16:07] TEACHER: What if consumer one took the lock and before it could delete it died off.   {#2318}
[02:16:14] TEACHER: Now if consumer one let's say owns the lock over here and before deleting it died off   {#2319}
[02:16:23] TEACHER: which means that consumer one would never be able to delete this lock.   {#2320}
[02:16:28] TEACHER: So which means that this lock is perpetually held by consumer one.   {#2321}
[02:16:31] TEACHER: So that's a problem.   {#2322}
[02:16:33] TEACHER: So which means that apart from this,   {#2323}
[02:16:36] TEACHER: what we need is for everything we need a TTL, automatic expiration,   {#2324}
[02:16:40] TEACHER: that after some point in time,   {#2325}
[02:16:42] TEACHER: this entry, if it is not deleted, it needs to delete itself.   {#2326}
[02:16:46] TEACHER: So what you need from this database is you need key value-based access,   {#2327}
[02:16:53] TEACHER: instructions and TTL, which database gives you all three Redis, which is why you see   {#2328}
[02:16:58] TEACHER: the most common remote locking implementation is Redis based implementation called Redlock.   {#2329}
[02:17:06] TEACHER: We'll talk about this.   {#2330}
[02:17:08] TEACHER: Right.   {#2331}
[02:17:08] TEACHER: And this is the core idea.   {#2332}
[02:17:09] TEACHER: Rajiv, I'll take your question.   {#2333}
[02:17:10] TEACHER: Wait, let me cover this now into it.   {#2334}
[02:17:12] TEACHER: I'll take your question.   {#2335}
[02:17:12] TEACHER: Wait.   {#2336}
[02:17:13] TEACHER: Right.   {#2337}
[02:17:14] TEACHER: So, and by the way, I'm saying this because it distracts me.   {#2338}
[02:17:17] TEACHER: I into the front, it just breaks my, that's all.   {#2339}
[02:17:20] TEACHER: So this is what we'll talk about.   {#2340}
[02:17:22] TEACHER: It's a Redis based remote block implementation.   {#2341}
[02:17:25] TEACHER: But now you understand why we need it because this is a black box for us.   {#2342}
[02:17:31] TEACHER: We have no access to that machine, to that queue, anything, but all we have is   {#2343}
[02:17:35] TEACHER: just network interface to call the normal HTTP request.   {#2344}
[02:17:38] TEACHER: Assume that because it did not give the protection that we needed.   {#2345}
[02:17:41] TEACHER: We have to implement the protection that we need.   {#2346}
[02:17:44] TEACHER: So we did this.   {#2347}
[02:17:46] TEACHER: We defined that what all, how we would store it.   {#2348}
[02:17:48] TEACHER: What is the edge case and the key features that we need from the database.   {#2349}
[02:17:52] TEACHER: We know the key features that we need from the database.   {#2350}
[02:17:55] TEACHER: We've CVS database gives you this three.   {#2351}
[02:17:57] TEACHER: We know Redis gives us.   {#2352}
[02:17:59] TEACHER: So that's why we implement remote lock using Redis.   {#2353}
[02:18:03] TEACHER: So at each of the consumer that we have consumer one consumer to consumer three,   {#2354}
[02:18:08] TEACHER: the code that you would write would look something like this.   {#2355}
[02:18:11] TEACHER: Read message.   {#2356}
[02:18:12] TEACHER: You would have anywhere read the message, but because you need coordination   {#2357}
[02:18:15] TEACHER: between consumer, you would acquire the lock, read the message and then release   {#2358}
[02:18:20] TEACHER: the lock.   {#2359}
[02:18:20] TEACHER: So every consumer would constantly trying to make call to redis trying to acquire the lock.   {#2360}
[02:18:25] TEACHER: One of them would succeed as one of them succeeds.   {#2361}
[02:18:29] TEACHER: It reads the message while other one continues to wait there.   {#2362}
[02:18:31] TEACHER: And once it reads the message, it releases as soon as one releases, the next one comes in.   {#2363}
[02:18:37] TEACHER: And then it releases and then immediately the next one comes in.   {#2364}
[02:18:42] TEACHER: And then next one comes in this way, your entire process gets coordinated.   {#2365}
[02:18:46] TEACHER: only one consumer is reading the message from the key because Q is not giving you the sensory   {#2366}
[02:18:51] TEACHER: protection. This is a remote key implementation. So now what you do? The features that we need from   {#2367}
[02:18:58] TEACHER: this is atomic instructions and automatic expressions. So what we are storing in red   {#2368}
[02:19:05] TEACHER: is we are storing exactly this, that this is the resource. This consumer owns this resource   {#2369}
[02:19:11] TEACHER: at this very moment with an expiration of 5 minutes.   {#2370}
[02:19:16] TEACHER: So only consumer 2 is allowed to read it.   {#2371}
[02:19:19] TEACHER: Once the consumer 2 reads a message,   {#2372}
[02:19:21] TEACHER: it releases the lock which means it deletes this entry   {#2373}
[02:19:24] TEACHER: and someone else can take it.   {#2374}
[02:19:26] TEACHER: But in case this consumer 2 does not delete the entry in 5 minutes,   {#2375}
[02:19:31] TEACHER: the entry gets auto expired.   {#2376}
[02:19:33] TEACHER: This means there is no perpetual holding of lock   {#2377}
[02:19:36] TEACHER: and the system continuously moves forward.   {#2378}
[02:19:38] TEACHER: Okay.   {#2379}
---- OWNED SEGMENTS END ----

CTX| [02:19:41] TEACHER: So this is exactly how your code would look exactly how.   {#2380}
CTX| [02:19:47] TEACHER: So your acquire lock logic in Python would be like your consumer when it started, it   {#2381}
CTX| [02:19:51] TEACHER: says, get my ID.   {#2382}
CTX| [02:19:52] TEACHER: So consumer when you hard code it, how you want to implement it's your consumer ID, maybe   {#2383}
CTX| [02:19:55] TEACHER: IP address, host name and whatnot.   {#2384}
CTX| [02:19:57] TEACHER: So your consumer knows that I am this, my ID is this while true, I'm trying to set the   {#2385}
CTX| [02:20:04] TEACHER: key in Redis.   {#2386}
CTX| [02:20:06] TEACHER: so which means this   {#2387}
CTX| [02:20:08] TEACHER: I am trying to set this key in Redis   {#2388}
CTX| [02:20:11] TEACHER: and now what I am doing   {#2389}
CTX| [02:20:12] TEACHER: I am not just doing normal set   {#2390}
CTX| [02:20:13] TEACHER: I am doing set nx   {#2391}
CTX| [02:20:15] TEACHER: what set nx does   {#2392}
CTX| [02:20:17] TEACHER: it means that set   {#2393}
CTX| [02:20:20] TEACHER: a key with some expiration   {#2394}
CTX| [02:20:22] TEACHER: where it is non-existent   {#2395}
CTX| [02:20:23] TEACHER: so I am trying to set for my Q7   {#2396}
CTX| [02:20:25] TEACHER: I am trying to acquire the lock   {#2397}
CTX| [02:20:28] TEACHER: with an expiration of   {#2398}
CTX| [02:20:29] TEACHER: 300 seconds   {#2399}
CTX| [02:20:32] TEACHER: so this command   {#2400}
CTX| [02:20:34] TEACHER: of Redis is an   {#2401}
CTX| [02:20:36] TEACHER: atomic command, which means that when one, this command is executing, no other   {#2402}
CTX| [02:20:39] TEACHER: command would ever execute on Redis.   {#2403}
CTX| [02:20:41] TEACHER: Right.   {#2404}
