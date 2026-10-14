# chunk_12  OWNS 02:11:54 -> 02:23:30  (segments #2264-#2490, 1964 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:10:59] TEACHER: Okay.   {#2249}
CTX| [02:10:59] TEACHER: Let me pull in Mohit.   {#2250}
CTX| [02:11:02] TEACHER: Mohit got.   {#2251}
CTX| [02:11:04] STUDENT_1: Can we use something on the lines of Redis PubSub   {#2252}
CTX| [02:11:07] STUDENT_1: where we make each of the hashtag as a channel?   {#2253}
CTX| [02:11:12] STUDENT_1: And like...   {#2254}
CTX| [02:11:13] TEACHER: There are millions and millions of hashtags.   {#2255}
CTX| [02:11:15] TEACHER: Each one cannot be a channel.   {#2256}
CTX| [02:11:17] TEACHER: You are overkilling the infra.   {#2257}
CTX| [02:11:20] TEACHER: Massive infra requirement plus potential data loss.   {#2258}
CTX| [02:11:24] STUDENT_1: By channel, I mean the channel in Redis terms.   {#2259}
CTX| [02:11:28] STUDENT_1: That's what I said.   {#2260}
CTX| [02:11:30] TEACHER: expensive millions of millions millions millions of hashtags are there plus what if that redis goes   {#2261}
CTX| [02:11:37] TEACHER: down there is data loss because redis does not persist anything it's real time pops up   {#2262}
CTX| [02:11:46] STUDENT_9: right   {#2263}

---- OWNED SEGMENTS START ----
[02:11:54] TEACHER: Okay.   {#2264}
[02:11:54] TEACHER: I'll provide a hint.   {#2265}
[02:11:56] TEACHER: Sandeep, this is partitioned by user ID.   {#2266}
[02:11:59] TEACHER: So what we can do is on the consumer.   {#2267}
[02:12:01] TEACHER: Wait, wait, wait, wait, wait, wait, wait, wait.   {#2268}
[02:12:03] TEACHER: Let me finish.   {#2269}
[02:12:04] TEACHER: Right.   {#2270}
[02:12:05] TEACHER: It is partitioned by user ID.   {#2271}
[02:12:06] TEACHER: It is partitioned by user ID.   {#2272}
[02:12:08] TEACHER: What we want is.   {#2273}
[02:12:10] TEACHER: Think of it.   {#2274}
[02:12:11] TEACHER: A post has multiple hashtags.   {#2275}
[02:12:14] TEACHER: Let's say I have three hashtags.   {#2276}
[02:12:17] TEACHER: in one post. So post 31 is published   {#2277}
[02:12:19] TEACHER: hashtag sunset, hashtag   {#2278}
[02:12:21] TEACHER: sun and hashtag nature.   {#2279}
[02:12:24] TEACHER: Right.   {#2280}
[02:12:25] TEACHER: Now, how would this   {#2281}
[02:12:27] STUDENT_5: go over here?   {#2282}
[02:12:29] STUDENT_5: Now start.   {#2283}
[02:12:30] STUDENT_1: Yeah, so what I was thinking   {#2284}
[02:12:33] STUDENT_1: so   {#2285}
[02:12:35] STUDENT_1: if all, so from the user   {#2286}
[02:12:37] STUDENT_1: ID, the consumer services can just   {#2287}
[02:12:39] STUDENT_1: read that post and it   {#2288}
[02:12:41] STUDENT_1: can pass the hashtags and then   {#2289}
[02:12:43] STUDENT_1: you can, then that   {#2290}
[02:12:47] STUDENT_1: partition based on the, you can put like a, we can use the principle of a vague idea of   {#2291}
[02:12:53] STUDENT_1: sharding, you know, like for example, sunset, anything from A to B can go to this partition.   {#2292}
[02:12:59] TEACHER: That's the partition key. You're defining that other Kafka with partitioning key being hashtag.   {#2293}
[02:13:04] STUDENT_1: Yes. Yeah. Something like that. So in that way, you are basically funneling the hashtags   {#2294}
[02:13:10] STUDENT_1: into one service using two, what do you call it?   {#2295}
[02:13:14] STUDENT_1: Two Kafka, very similar to that of, you know,   {#2296}
[02:13:18] STUDENT_1: how search index works.   {#2297}
[02:13:19] STUDENT_1: So we have two Kafka or something like that.   {#2298}
[02:13:21] TEACHER: Correct.   {#2299}
[02:13:22] TEACHER: So what you're doing is you are adding an adapter   {#2300}
[02:13:25] TEACHER: in between post-job and that's exactly   {#2301}
[02:13:27] TEACHER: what I wanted to bring out.   {#2302}
[02:13:28] TEACHER: That because this is partitioned by user ID   {#2303}
[02:13:33] TEACHER: and for this to be efficient,   {#2304}
[02:13:35] TEACHER: you want all post by one hashtag.   {#2305}
[02:13:37] TEACHER: So one hashtag over here,   {#2306}
[02:13:40] TEACHER: here one hashtag is a set of hashtags.   {#2307}
[02:13:42] TEACHER: So all the posts of a particular   {#2308}
[02:13:44] TEACHER: hashtag should go to   {#2309}
[02:13:46] TEACHER: the same server for it to effectively   {#2310}
[02:13:48] TEACHER: batch. Otherwise it would eventually   {#2311}
[02:13:50] TEACHER: be doing count++ every time over   {#2312}
[02:13:52] TEACHER: here. So you don't want to do count++   {#2313}
[02:13:54] TEACHER: but you have to do count++   {#2314}
[02:13:56] TEACHER: equal to n. Now n could be anything depending on what   {#2315}
[02:13:58] TEACHER: your batch size is. Now for you to   {#2316}
[02:14:00] TEACHER: leverage that what you have   {#2317}
[02:14:02] TEACHER: to do is here you have to   {#2318}
[02:14:04] TEACHER: consume the message   {#2319}
[02:14:06] TEACHER: and re-ingest it   {#2320}
[02:14:08] TEACHER: in another Kafka   {#2321}
[02:14:10] TEACHER: and then reprocess it something like this.   {#2322}
[02:14:13] TEACHER: So from this user ID, these are your hashtag extractor.   {#2323}
[02:14:20] TEACHER: Whose job is to read the caption, extract the hashtags and make these many entries   {#2324}
[02:14:28] TEACHER: in this Kafka, which is partitioned by hashtag.   {#2325}
[02:14:34] TEACHER: And then consumed by this set of workers and then write to the readouts.   {#2326}
[02:14:40] STUDENT_1: That's what I was having in my mind.   {#2327}
[02:14:42] TEACHER: Yeah.   {#2328}
[02:14:43] TEACHER: And this is a, this is really good way to do this because now with this, what you're   {#2329}
[02:14:48] TEACHER: doing is we are ensuring that all the posts for a particular hashtag will always go to   {#2330}
[02:14:54] TEACHER: one server.   {#2331}
[02:14:54] TEACHER: FYI, this does not mean we would have one partition for each hashtag.   {#2332}
[02:14:58] TEACHER: It's hash based partitioning that we discussed second week, right?   {#2333}
[02:15:02] TEACHER: You might have three partitions.   {#2334}
[02:15:04] TEACHER: Millions of hashtags can be indexed onto that, right?   {#2335}
[02:15:06] TEACHER: It's in hashtag passes the hash function.   {#2336}
[02:15:09] TEACHER: One value cops out and you put it into that partition.   {#2337}
[02:15:13] TEACHER: So you don't need, if there are a million hashtags,   {#2338}
[02:15:15] TEACHER: you don't need million partitions FYI.   {#2339}
[02:15:17] TEACHER: So for a particular post,   {#2340}
[02:15:19] TEACHER: when it comes to this particular partition by user ID   {#2341}
[02:15:22] TEACHER: consumed by multiple consumers, not just one consumer,   {#2342}
[02:15:25] TEACHER: there will be multiple consumers consuming it   {#2343}
[02:15:27] TEACHER: and they are extracting the hashtag   {#2344}
[02:15:29] TEACHER: and writing those many messages over here   {#2345}
[02:15:32] TEACHER: consumed by this set of workers.   {#2346}
[02:15:34] TEACHER: This is your counting service.   {#2347}
[02:15:36] TEACHER: This takes care of counting.   {#2348}
[02:15:38] TEACHER: It batches and counts because all the posts of a particular user will go to one server.   {#2349}
[02:15:45] TEACHER: The batching will be very efficient and it will not be count plus equal to one but count plus equal to n.   {#2350}
[02:15:50] TEACHER: And this is a very standard principle of doing large volume counting.   {#2351}
[02:15:56] TEACHER: Whenever you are counting something in huge quantities, what you have to ensure is you are leveraging batching.   {#2352}
[02:16:02] TEACHER: if you do not leverage batching then almost you are doing count plus plus every time what it would   {#2353}
[02:16:08] TEACHER: lead to is it would lead to having a lot of micro writes on your database and your database would   {#2354}
[02:16:13] TEACHER: be choked you have to over provision your database so best way to get performance out of your database   {#2355}
[02:16:19] TEACHER: is to batch the writes that are doing for example you can fire 100 insert statements in your   {#2356}
[02:16:24] TEACHER: relational database any database per se but you can also do in one call you can write 100 queries   {#2357}
[02:16:30] TEACHER: and fire a batch insert or a bulk insert.   {#2358}
[02:16:32] TEACHER: Bulk insert is 100x faster than single   {#2359}
[02:16:36] TEACHER: doing that insert one at a time.   {#2360}
[02:16:39] TEACHER: So it's really important for you   {#2361}
[02:16:41] TEACHER: whenever you can batch it, do batch it.   {#2362}
[02:16:44] TEACHER: So this is a standard adapter pattern   {#2363}
[02:16:47] TEACHER: that I wanted to highlight.   {#2364}
[02:16:49] TEACHER: And you would not have discovered this   {#2365}
[02:16:52] TEACHER: without going into this granular details.   {#2366}
[02:16:54] TEACHER: Because it's every one service that counts and updates a DB.   {#2367}
[02:16:57] TEACHER: No.   {#2368}
[02:16:58] TEACHER: Think about implementation.   {#2369}
[02:17:00] TEACHER: you think about implementation, you realize this problem because the first   {#2370}
[02:17:04] TEACHER: solution that would come to me, Hey, why can't I partition it by hashtag?   {#2371}
[02:17:07] TEACHER: You cannot, because this is a standard Kafka where all the post publisher   {#2372}
[02:17:11] TEACHER: going anyway.   {#2373}
[02:17:12] TEACHER: So that cannot change because this from this Kafka, you have your search   {#2374}
[02:17:16] TEACHER: running, you have an analytics running, you have a notification   {#2375}
[02:17:18] TEACHER: sending it, whatnot.   {#2376}
[02:17:20] TEACHER: And one of the things that we are plugging in, in this hashtag counting   {#2377}
[02:17:23] TEACHER: service, so that is where we add hashtag extractor whose job is to extract   {#2378}
[02:17:28] TEACHER: the hashtag and create tuples and put it over here consume it over here and update account over here   {#2379}
[02:17:33] TEACHER: here what we are compromising on that in case some nodes go down we might recount some things   {#2380}
[02:17:39] TEACHER: multiple times should be okay because it's not a we need very accurate count because in the ui   {#2381}
[02:17:46] TEACHER: we are not showing very accurate even if we are showing let's say 1.2 million photos over here   {#2382}
[02:17:51] TEACHER: we are only rendering 100 over here.   {#2383}
[02:17:55] TEACHER: We are not rendering all of them.   {#2384}
[02:17:57] TEACHER: So user is not going to check it.   {#2385}
[02:17:59] TEACHER: So it's fine.   {#2386}
[02:18:00] TEACHER: It's fine.   {#2387}
[02:18:01] TEACHER: If we have little bit of inconsistency in the data.   {#2388}
[02:18:04] TEACHER: Right?   {#2389}
[02:18:05] TEACHER: So we don't need strong consistency every time.   {#2390}
[02:18:07] TEACHER: You can relax some constraints when you are doing things at scale.   {#2391}
[02:18:10] TEACHER: Some numbers here and there does not matter much.   {#2392}
[02:18:13] TEACHER: Right?   {#2393}
[02:18:13] TEACHER: Because there is always an error rate when you do things at scale.   {#2394}
[02:18:17] TEACHER: Okay.   {#2395}
[02:18:18] TEACHER: So we covered storage.   {#2396}
[02:18:19] TEACHER: We covered counting.   {#2397}
[02:18:22] TEACHER: Okay. Oh, and we talked about super fast response time, depending on the guarantees, which one   {#2398}
[02:18:26] TEACHER: are you picking and why, right?   {#2399}
[02:18:28] TEACHER: One thing is to ensure that you have to think about the way that because you want to enter   {#2400}
[02:18:33] TEACHER: this page in one shot, every single information needs to be there in one document.   {#2401}
[02:18:38] TEACHER: If not, what would happen is if you're getting counting services different, which is giving   {#2402}
[02:18:42] TEACHER: me the count top hundred services different, which is giving me the top hundred.   {#2403}
[02:18:46] TEACHER: Solana services different, which is giving me something.   {#2404}
[02:18:48] TEACHER: Then your response time automatically increases.   {#2405}
[02:18:51] TEACHER: You are serving a critical path.   {#2406}
[02:18:54] TEACHER: You have to ensure you are doing the bare minimum network IO possible   {#2407}
[02:18:58] TEACHER: to enter that particular page.   {#2408}
[02:19:00] TEACHER: So that is why we are storing the top 100 photos in this database itself   {#2409}
[02:19:07] TEACHER: and not making a call to data science service to get that information.   {#2410}
[02:19:13] TEACHER: So now the next question is,   {#2411}
[02:19:16] TEACHER: how would this information come over here?   {#2412}
[02:19:22] TEACHER: be populated in this database?   {#2413}
[02:19:24] TEACHER: DK?   {#2414}
[02:19:29] TEACHER: Sorry, I wanted to ask some questions later.   {#2415}
[02:19:32] TEACHER: After this, after this.   {#2416}
[02:19:33] TEACHER: We have changed the context.   {#2417}
[02:19:35] TEACHER: How would this information come over here, this top 100?   {#2418}
[02:19:47] STUDENT_5: Sandeep?   {#2419}
[02:19:48] STUDENT_1: So I think a top hundred, the criteria can be defined, right?   {#2420}
[02:19:52] TEACHER: Like for example, black box for us, as I said, black box for us data size does it.   {#2421}
[02:19:57] TEACHER: We don't care how they do it.   {#2422}
[02:19:58] TEACHER: We don't get the most recent hundred.   {#2423}
[02:20:01] STUDENT_1: Okay.   {#2424}
[02:20:02] TEACHER: We are the owner of this page.   {#2425}
[02:20:03] TEACHER: That is a black box for us.   {#2426}
[02:20:05] STUDENT_1: So now that that is already being taken care of, then what I can do is I can, you know,   {#2427}
[02:20:10] STUDENT_1: I can sort all my posts based on that criteria because I have the number metric value.   {#2428}
[02:20:16] STUDENT_1: I can sort it.   {#2429}
[02:20:19] TEACHER: Assume there is a service that notifies us when it generates the top photos for a hashtag.   {#2430}
[02:20:24] TEACHER: Data science is doing that for us.   {#2431}
[02:20:27] TEACHER: Whenever it generates for a particular hashtag, it generates the top photos, it notifies us.   {#2432}
[02:20:31] TEACHER: So how would that flow fit over here?   {#2433}
[02:20:36] STUDENT_1: So if it is already doing it, then we can just call it and get the data, right?   {#2434}
[02:20:40] STUDENT_1: So what do you mean by how does that flow fit?   {#2435}
[02:20:42] TEACHER: We cannot call it.   {#2436}
[02:20:43] TEACHER: We have to store the data over here.   {#2437}
[02:20:46] TEACHER: How would we get this data over here?   {#2438}
[02:20:51] TEACHER: How, how are they notifying us?   {#2439}
[02:20:52] TEACHER: Let me start with that.   {#2440}
[02:20:53] TEACHER: How are they notifying us?   {#2441}
[02:20:57] TEACHER: Will they give us a call?   {#2442}
[02:20:58] TEACHER: No, it's a programmatic system.   {#2443}
[02:21:00] TEACHER: How would they notify us that there is new thing?   {#2444}
[02:21:03] TEACHER: Like we have done a new top 100 for hashtag sunset.   {#2445}
[02:21:06] TEACHER: Now consume it.   {#2446}
[02:21:07] TEACHER: How would they tell us?   {#2447}
[02:21:08] STUDENT_1: So what we can do is we can have another service that, that will be list.   {#2448}
[02:21:14] STUDENT_1: There is this notification service and there can be another service that is listening to this notification service will send an event through any messaging queue.   {#2449}
[02:21:23] STUDENT_1: And this service, which is listening to that event, the moment it sees, okay, first sunset, a new batch has arrived, then it can just pick it and update it.   {#2450}
[02:21:32] STUDENT_1: So, but then it comes at an expense.   {#2451}
[02:21:34] STUDENT_1: Like you need to have a separate service who is constant.   {#2452}
[02:21:37] STUDENT_1: And that is listening to a messaging process.   {#2453}
[02:21:39] STUDENT_5: It's a simple server processor service service.   {#2454}
[02:21:42] STUDENT_5: It's not a service.   {#2455}
[02:21:44] TEACHER: server, the idea big that they give us this in Kafka, we read from it and we update it   {#2456}
[02:21:50] TEACHER: over here.   {#2457}
[02:21:51] TEACHER: Simple.   {#2458}
[02:21:51] STUDENT_1: Yeah.   {#2459}
[02:21:52] STUDENT_1: Yeah.   {#2460}
[02:21:52] STUDENT_1: Yeah.   {#2461}
[02:21:55] TEACHER: So that's like, I just wanted basically nothing against you per se, but a lot of people I   {#2462}
[02:22:03] TEACHER: see make this mistake.   {#2463}
[02:22:04] TEACHER: Oh, service.   {#2464}
[02:22:06] TEACHER: It's not just a simple set of servers doing something.   {#2465}
[02:22:09] TEACHER: It's a process that is running whose job is to like your data science team.   {#2466}
[02:22:14] TEACHER: someone notify us. They would notify us by pushing a message, a notification. Where are they   {#2467}
[02:22:19] TEACHER: notified? Kafka, best place. They send, whenever the data science service does something, the push   {#2468}
[02:22:24] TEACHER: an event onto Kafka, we consume that event, basically getting the top hundred post IDs,   {#2469}
[02:22:29] TEACHER: and we update it in the database. Why are we doing this? Yeah. Why are we doing this? Because we don't   {#2470}
[02:22:35] TEACHER: want to make a network call every time someone reads to their service, because then uptime of   {#2471}
[02:22:40] TEACHER: our service depends on the type of their   {#2472}
[02:22:42] TEACHER: service because of synchronous dependency.   {#2473}
[02:22:44] TEACHER: That's why wherever we can model things   {#2474}
[02:22:46] TEACHER: are synchronous. And here   {#2475}
[02:22:48] TEACHER: we very beautifully   {#2476}
[02:22:50] TEACHER: see how Kafka becomes   {#2477}
[02:22:52] TEACHER: the glue   {#2478}
[02:22:54] TEACHER: that joins these multiple   {#2479}
[02:22:56] TEACHER: services together.   {#2480}
[02:22:58] TEACHER: And which is why Kafka became   {#2481}
[02:23:00] TEACHER: widely famous because of   {#2482}
[02:23:02] TEACHER: this ability. The CQRS   {#2483}
[02:23:04] TEACHER: pattern that you might have heard of is   {#2484}
[02:23:06] TEACHER: because of this. It makes things so   {#2485}
[02:23:08] TEACHER: neat. And then it just   {#2486}
[02:23:11] TEACHER: This right so just to cover this few things on the side like just to basically   {#2487}
[02:23:16] TEACHER: formally cover it this is what our flow would look like for this very simple   {#2488}
[02:23:21] TEACHER: looking page this is what we would do so this is your not image service but this   {#2489}
[02:23:26] TEACHER: is your post service.   {#2490}
---- OWNED SEGMENTS END ----

CTX| [02:23:30] TEACHER: From post service whenever a post is published you push a message to Kafka.   {#2491}
CTX| [02:23:34] TEACHER: Kafka that post message that one message is consumed by a hashtag extractor   {#2492}
CTX| [02:23:38] TEACHER: which extracts the hashtag from the caption   {#2493}
CTX| [02:23:41] TEACHER: and it creates, if there are n hashtags,   {#2494}
CTX| [02:23:43] TEACHER: it creates n entries in this another Kafka   {#2495}
CTX| [02:23:47] TEACHER: in which it can be same Kafka, another topic.   {#2496}
CTX| [02:23:49] TEACHER: But the idea is separation of concern.   {#2497}
CTX| [02:23:52] TEACHER: Post underscore hashtag, it creates trouble   {#2498}
CTX| [02:23:53] TEACHER: that this is the partition by hashtag.   {#2499}
CTX| [02:23:56] TEACHER: This is the post, right?   {#2500}
CTX| [02:23:58] TEACHER: Now, all of this is consumed by this counting servers   {#2501}
CTX| [02:24:00] TEACHER: whose job is that for each,   {#2502}
CTX| [02:24:02] TEACHER: because there are three partitions, three servers,   {#2503}
CTX| [02:24:05] TEACHER: all of them receive the same thing.   {#2504}
CTX| [02:24:06] TEACHER: all post hashtag tuples go to the same server for a particular hashtag you can efficiently batch   {#2505}
CTX| [02:24:13] TEACHER: and do count plus equal to n on this database other than doing count plus plus so this becomes   {#2506}
CTX| [02:24:18] TEACHER: really efficient path for us this is a classic adapter that we see because you cannot change this   {#2507}
CTX| [02:24:24] TEACHER: because search notification every other service is dependent on this but for you to proceed you need   {#2508}
