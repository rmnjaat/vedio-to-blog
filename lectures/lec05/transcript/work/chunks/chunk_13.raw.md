# chunk_13  OWNS 02:25:36 -> 02:38:15  (segments #2305-#2468, 2139 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:24:37] TEACHER: What if detail is not set for a key, then key was never expired.   {#2282}
CTX| [02:24:41] TEACHER: If you'd be a user specifically hard delete a key or if you don't delete a   {#2283}
CTX| [02:24:45] TEACHER: particular key, then what would you do?   {#2284}
CTX| [02:24:47] TEACHER: You'll not do anything.   {#2285}
CTX| [02:24:49] STUDENT_1: Okay.   {#2286}
CTX| [02:24:49] STUDENT_1: In that case we will have to say that implement delete.   {#2287}
CTX| [02:24:52] TEACHER: You are explicitly deleting a key.   {#2288}
CTX| [02:24:54] TEACHER: How will you do it?   {#2289}
CTX| [02:24:55] TEACHER: You have to do something in the database, right?   {#2290}
CTX| [02:24:57] TEACHER: When you're deleting it.   {#2291}
CTX| [02:24:59] STUDENT_12: Yeah.   {#2292}
CTX| [02:25:00] TEACHER: Right.   {#2293}
CTX| [02:25:01] TEACHER: Pankaj.   {#2294}
CTX| [02:25:03] TEACHER: Just to confirm.   {#2295}
CTX| [02:25:05] TEACHER: So when you say when we are saving on disk IO, when we do select star and all, it is happening   {#2296}
CTX| [02:25:10] TEACHER: because we have indexed TTL and databases into the TTL table.   {#2297}
CTX| [02:25:15] TEACHER: Right.   {#2298}
CTX| [02:25:17] TEACHER: And if, if we, if we do not index it, then we'll anyways be reading that value also because   {#2299}
CTX| [02:25:24] TEACHER: edit out, it's expired and then we skip that.   {#2300}
CTX| [02:25:27] TEACHER: Yeah.   {#2301}
CTX| [02:25:27] TEACHER: You'd have that index.   {#2302}
CTX| [02:25:28] TEACHER: Yes.   {#2303}
CTX| [02:25:30] TEACHER: Sampath.   {#2304}

---- OWNED SEGMENTS START ----
[02:25:36] TEACHER: Your voice is breaking Sampath.   {#2305}
[02:25:42] TEACHER: I'll just loop you in again.   {#2306}
[02:25:45] TEACHER: D Agrawal.   {#2307}
[02:25:46] TEACHER: Yeah, please, please write your first name.   {#2308}
[02:25:47] TEACHER: It makes me easy.   {#2309}
[02:25:51] STUDENT_7: Hi, Apekt.   {#2310}
[02:25:52] STUDENT_7: This is DPA.   {#2311}
[02:25:53] STUDENT_7: So my question is,   {#2312}
[02:25:54] STUDENT_7: Yeah. So you talked about reducing the network cost, right? Trip to database, right? When we were talking about inserts, I had an idea around the similar concept for insertions, right? For optimizing insertions.   {#2313}
[02:26:14] STUDENT_7: that let's say when we are trying to insert a key value pair, right?   {#2314}
[02:26:19] STUDENT_7: And if there is, if the key already exists, right?   {#2315}
[02:26:22] STUDENT_7: Can we have something like, so we have on this database,   {#2316}
[02:26:25] STUDENT_7: we want to reduce the IO, you know, this IO.   {#2317}
[02:26:29] STUDENT_7: So what if we have an in-memory layer, right?   {#2318}
[02:26:33] STUDENT_7: In front of it.   {#2319}
[02:26:34] STUDENT_7: So when a key value pair comes in,   {#2320}
[02:26:37] STUDENT_7: you kind of maintain sort of an append only structure in memory, right?   {#2321}
[02:26:43] TEACHER: design, but you can do all sorts of files. You are just adding a cache in front of it.   {#2322}
[02:26:47] TEACHER: Kind of. Where you are just keeping track of all the keys.   {#2323}
[02:26:50] STUDENT_7: Right. And then kind of, you know, Bloom filter.   {#2324}
[02:26:53] STUDENT_7: Well, that and also I was thinking it will also reduce the disk I.O.   {#2325}
[02:26:59] STUDENT_7: Right. Because you are just having it in memory. Key one, value one, key one, value two.   {#2326}
[02:27:05] TEACHER: But then you are limited by memory where all the keys needs to fit in memory.   {#2327}
[02:27:09] STUDENT_7: Correct. Yeah. Yeah. I mean, we would need to flush it.   {#2328}
[02:27:13] TEACHER: from time to time sure yeah but yeah you can do that you can do all sorts of ads but that's not   {#2329}
[02:27:19] TEACHER: your core transactional database per se right so those are all those are the performance of   {#2330}
[02:27:23] TEACHER: recommendations that you can prepare right we'll be touching upon two of those in fifth and sixth   {#2331}
[02:27:28] TEACHER: week anything sure uh thank you yeah uh somebody i'll just pull you in in some time okay we'll uh   {#2332}
[02:27:36] TEACHER: Let me quickly cover high level arc of that.   {#2333}
[02:27:39] TEACHER: So up until now, we spoke about those implementation on single node, MySQL DB,   {#2334}
[02:27:45] TEACHER: but obviously we want a distributed key value store.   {#2335}
[02:27:48] TEACHER: So what we do is we have, which means that we have massive data, which one node may not   {#2336}
[02:27:55] TEACHER: be able to handle.   {#2337}
[02:27:56] TEACHER: When I say handle, as I spoke about in last week, it does not be just query or just storage.   {#2338}
[02:28:02] TEACHER: It can be any high network IO, high disk or rather large amount of data being stored   {#2339}
[02:28:08] TEACHER: or large amount of query being fired.   {#2340}
[02:28:10] TEACHER: Anything.   {#2341}
[02:28:10] TEACHER: One node is not able to handle the load of it.   {#2342}
[02:28:13] TEACHER: That's what we have to make it distributed.   {#2343}
[02:28:15] TEACHER: So a basic one node architecture would look something like this.   {#2344}
[02:28:19] TEACHER: User load balancer, API servers.   {#2345}
[02:28:21] TEACHER: Anyone who wants to talk to the database will be talking via this API server.   {#2346}
[02:28:25] TEACHER: Maybe a user, maybe a client, anyone.   {#2347}
[02:28:27] TEACHER: This is our database.   {#2348}
[02:28:30] TEACHER: In this we have bunch of API servers whose responsibility is to talk to this MySQL and   {#2349}
[02:28:36] TEACHER: fire the queries that we just discussed.   {#2350}
[02:28:37] TEACHER: We would have a separate job that is continuously running on and basically firing queries on   {#2351}
[02:28:43] TEACHER: MySQL to do this batch cleanup.   {#2352}
[02:28:46] TEACHER: This is what we have right now.   {#2353}
[02:28:49] TEACHER: Now for us to handle the load, let's say our database is our MySQL server is able to handle   {#2354}
[02:28:55] TEACHER: the incoming requests that are coming in.   {#2355}
[02:28:57] TEACHER: So for us to handle the request, the large number of requests, all we have to just add   {#2356}
[02:29:01] TEACHER: more API servers that could do the job, right?   {#2357}
[02:29:03] TEACHER: Assuming that your MySQL is able to sustain, but what happens when you are not able to   {#2358}
[02:29:09] TEACHER: sustain it?   {#2359}
[02:29:10] TEACHER: When you are not able to sustain it, what you do is you create, you first go through   {#2360}
[02:29:15] TEACHER: the access pattern that, Hey, do we have huge read requests or huge update requests?   {#2361}
[02:29:20] TEACHER: For example, in our key value store, you would have those metrics that which queries are   {#2362}
[02:29:24] TEACHER: being fired more select or update or upset or delete.   {#2363}
[02:29:28] TEACHER: If you see that there are large number of read requests being fired.   {#2364}
[02:29:31] TEACHER: What you do is you spin up replicas of this DB.   {#2365}
[02:29:35] TEACHER: And when you do replicas, you are allowing some staleness in the data.   {#2366}
[02:29:41] TEACHER: It's okay for you to serve stale data for some use case.   {#2367}
[02:29:44] TEACHER: And in case you need consistent reads, you have to go to master.   {#2368}
[02:29:48] TEACHER: If you want inconsistent read or little stale is okay.   {#2369}
[02:29:52] TEACHER: Your API server can directly talk to replica and get it done.   {#2370}
[02:29:56] TEACHER: Which is where if consistent reads go to master, updates go to master, delete go to master,   {#2371}
[02:30:04] TEACHER: data asynchronously replicates on the replica, KV API server can either talk to master for   {#2372}
[02:30:11] TEACHER: the key operations or can directly talk to replica.   {#2373}
[02:30:14] TEACHER: Exactly what we discussed last week.   {#2374}
[02:30:16] TEACHER: So KV API will have connection with master and replicas.   {#2375}
[02:30:20] TEACHER: and depending on what kind of read the client is requesting,   {#2376}
[02:30:25] TEACHER: you would either fire it on master or you fire it on replica.   {#2377}
[02:30:29] TEACHER: So KV API will have connections with masters as well as replicas.   {#2378}
[02:30:34] TEACHER: Simplest way to implement it, not adding central proxy,   {#2379}
[02:30:38] TEACHER: nothing complication, we will add a complication later.   {#2380}
[02:30:41] TEACHER: Keeping it really simple, your API servers will create connections   {#2381}
[02:30:45] TEACHER: with master as well as replica and get it done.   {#2382}
[02:30:48] TEACHER: But now there would come a time where your one master will not be able to handle the right flow.   {#2383}
[02:30:55] TEACHER: Which is where what you do, you first try to vertically scale up.   {#2384}
[02:30:58] TEACHER: When you cannot do that, then you shard your database.   {#2385}
[02:31:02] TEACHER: When we say sharding, it's literally having exclusive copy of data across databases.   {#2386}
[02:31:09] TEACHER: For example, if my key value store, let's say support string A to Z.   {#2387}
[02:31:13] TEACHER: So what you have is you have one master that handles A to M and another master that handles N to Z.   {#2388}
[02:31:21] TEACHER: Each master may have a set of replica to support it.   {#2389}
[02:31:24] TEACHER: Each master will have its own batch cleanup job independently running.   {#2390}
[02:31:28] TEACHER: That is cleaning up over here.   {#2391}
[02:31:30] TEACHER: KV API will have connections with masters and replicas.   {#2392}
[02:31:36] TEACHER: Depending on how you can do intelligent balancing and whatnot in order to not have connections.   {#2393}
[02:31:43] TEACHER: connections to all these databases you can minimize that that's a different problem that's   {#2394}
[02:31:47] TEACHER: intelligent balancing that you may want to do but the idea here is so your kv api knows now here   {#2395}
[02:31:54] TEACHER: kv api knows which database holds what range of data so kv api knows that hey if arpit is requesting   {#2396}
[02:32:05] TEACHER: data for google let's say stock prices something right arpit is requesting to see the stock prices   {#2397}
[02:32:11] TEACHER: of Google, the current stock price of Google, Google starts with a G, I would have to fire   {#2398}
[02:32:16] TEACHER: a query on master one to get it.   {#2399}
[02:32:19] TEACHER: If someone fires app stocks for Zomato, request would go over here.   {#2400}
[02:32:24] TEACHER: Now who would have this information?   {#2401}
[02:32:26] TEACHER: Routing information if we call it the KV API.   {#2402}
[02:32:29] TEACHER: Right?   {#2403}
[02:32:30] TEACHER: Here what we are doing is we are keeping this information, the routing information at the   {#2404}
[02:32:35] TEACHER: API server side itself which knows which database connection to choose to fire which request.   {#2405}
[02:32:44] TEACHER: This is a simplistic implementation of it. Now obviously hot partition problem and scaling up   {#2406}
[02:32:50] TEACHER: and adding your replica on the fly all of this would come and we would discuss fifth week,   {#2407}
[02:32:54] TEACHER: sixth week and seventh week a lot in depth how to handle hot partitions and scaling up dynamically   {#2408}
[02:32:59] TEACHER: and whatnot. We'll talk about that in depth. For now keep it simple let's see if we just have fixed   {#2409}
[02:33:06] TEACHER: Each database is a master having a set of replicas to that.   {#2410}
[02:33:10] TEACHER: KvAPI is establishing connection to all of them.   {#2411}
[02:33:13] TEACHER: Routing information is with KvAPI.   {#2412}
[02:33:15] TEACHER: When the request comes in for a particular key, KvAPI knows where to forward it to because   {#2413}
[02:33:19] TEACHER: it's just a range that it stores.   {#2414}
[02:33:21] TEACHER: It knows which range I'm requesting.   {#2415}
[02:33:24] TEACHER: It goes and talks to the particular connection, through that connection to the database, pars   {#2416}
[02:33:28] TEACHER: the query, gets the response, sends it back to the user.   {#2417}
[02:33:31] TEACHER: Dead simple.   {#2418}
[02:33:32] TEACHER: but this is how most in most cases like 90% of sharded databases work like this because it's   {#2419}
[02:33:40] TEACHER: very unlikely for you to just have like dynamically add a number of shards to your system very   {#2420}
[02:33:45] TEACHER: unlikely very few databases very few real world use cases need that to dynamically increase the   {#2421}
[02:33:50] TEACHER: number of shards and reduce the shards it's typically in one-time activity happening once   {#2422}
[02:33:55] TEACHER: every quarter so you can explicitly do it and not over complicated which is why i'm starting simple   {#2423}
[02:34:02] TEACHER: When we enter fifth week, we'll see how to do it dynamically, where consistent hashing comes in, how hot partition problems are addressed.   {#2424}
[02:34:08] TEACHER: We'll talk all of them.   {#2425}
[02:34:10] TEACHER: Fifth, sixth, seventh week is all about that.   {#2426}
[02:34:12] TEACHER: But for now, we'll just keep it simple.   {#2427}
[02:34:15] TEACHER: Now, if let's say tomorrow we have another thing to handle, let's say two nodes are not able to handle it.   {#2428}
[02:34:21] TEACHER: We add one more and we split this range into three parts and then do that.   {#2429}
[02:34:27] TEACHER: It's very simple.   {#2430}
[02:34:28] TEACHER: So this way, what we get is, we now have a distributed database setup, each having its own replica, handling the corresponding load, read load, while writes and critical reads go to the master and a batch cleanup job that takes care of cleaning up stuff.   {#2431}
[02:34:46] TEACHER: And all the routing information is with KVAPI.   {#2432}
[02:34:50] TEACHER: Nothing more nothing like keeping it really simple.   {#2433}
[02:34:53] TEACHER: Right.   {#2434}
[02:34:53] TEACHER: So not over complicating the problem at first.   {#2435}
[02:34:57] TEACHER: Keep it really simple.   {#2436}
[02:34:58] TEACHER: But what I would recommend all of you to do once, at least once implement this.   {#2437}
[02:35:06] TEACHER: It's a local setup.   {#2438}
[02:35:08] TEACHER: You don't even need cloud for that.   {#2439}
[02:35:10] TEACHER: Just pin up a MySQL server to MySQL servers, local machine, right?   {#2440}
[02:35:16] TEACHER: Have one API server running that is creating connection with both of them.   {#2441}
[02:35:21] TEACHER: Write that routing logic once, expose an HTTP endpoint, and then route the request.   {#2442}
[02:35:28] TEACHER: this system right and as a stretch create a replica that listens to this how do you do it   {#2443}
[02:35:35] TEACHER: mysql bin log if you're using mysql postgres has commit blog see how they're configured right but   {#2444}
[02:35:42] TEACHER: this should be the last step that you're doing once you have that setup then on the kv api create   {#2445}
[02:35:46] TEACHER: a connection with this replica running locally on your machine you don't need fancy cloud for this   {#2446}
[02:35:51] TEACHER: right and then just see the routing information that hey this is a critical read i have to forward   {#2447}
[02:35:58] TEACHER: here and what right do that implement it when you implement it with understand it much better   {#2448}
[02:36:05] TEACHER: right okay so this is all what i wanted to cover as part of distributed key value store on top of   {#2449}
[02:36:11] TEACHER: relational db we'll get to talk about hot partition problem we have to talk about dynamic   {#2450}
[02:36:16] TEACHER: scaling dynamic partitioning all of that fifth week will touch upon when we cover enough for us   {#2451}
[02:36:22] TEACHER: to understand that right there is a lot of prerequisite for us to even understand that   {#2452}
[02:36:26] TEACHER: right we'll talk about consistent hashing we'll see where consistent hashing sucks big time where   {#2453}
[02:36:31] TEACHER: it is very good where it is very bad hot partition problem three ways to handle it all of that right   {#2454}
[02:36:36] TEACHER: but for now we'll just keep it simple but what i would really request and recommend rather   {#2455}
[02:36:42] TEACHER: implement this it's not difficult not at all just implement one small company you don't need bad   {#2456}
[02:36:48] TEACHER: job now just implement this replica once routing layer once like things will be so clear in them   {#2457}
[02:36:55] TEACHER: okay uh folks who may want to drop off will be to drop off i'll upload the recording by three   {#2458}
[02:36:59] TEACHER: now i'll take questions first or on the second part that we covered and then we'll move to the   {#2459}
[02:37:03] STUDENT_1: other question that you might have something hey arpit so my question is on the delete thing can you   {#2460}
[02:37:09] STUDENT_1: can you please go to that slide uh where you said implementing delete uh yeah here so the   {#2461}
[02:37:16] STUDENT_1: implementing delete right basically you will delete something which has already been expired   {#2462}
[02:37:20] STUDENT_1: so that means it should be less than now right but here you said ttl is greater than now so that   {#2463}
[02:37:27] TEACHER: no this is not batch delete this is delete operation by a user yeah even by a user it the   {#2464}
[02:37:34] STUDENT_1: ttl should be less than now right if detail is less than now which means it is already expired   {#2465}
[02:37:40] TEACHER: why would you delete something like it's deleted by a user   {#2466}
[02:37:47] STUDENT_1: Yeah, so if it is, if now is one and TTL is, then, then you won't delete.   {#2467}
[02:37:53] STUDENT_1: Wait, wait, wait, just a minute.   {#2468}
---- OWNED SEGMENTS END ----

CTX| [02:38:15] STUDENT_1: huh yeah go on so so my point is imagine ttl is two second and now is one second so the time to   {#2469}
CTX| [02:38:23] TEACHER: live is still two seconds right but now is only ttl is expired at the absolute time of expiration   {#2470}
CTX| [02:38:31] STUDENT_1: sorry i just maybe just i'm not getting ttl as detail is expired absolute time of expiration   {#2471}
CTX| [02:38:37] TEACHER: when your time needs to when your key needs to be expired it would be like 12 o'clock   {#2472}
CTX| [02:38:42] TEACHER: Okay.   {#2473}
CTX| [02:38:42] TEACHER: On this particular day.   {#2474}
CTX| [02:38:44] STUDENT_12: Okay.   {#2475}
CTX| [02:38:45] TEACHER: So then when you're setting you, what you have to do is you have to set it to a magical   {#2476}
CTX| [02:38:49] TEACHER: value.   {#2477}
CTX| [02:38:49] TEACHER: That's a minus one.   {#2478}
CTX| [02:38:50] TEACHER: Right.   {#2479}
CTX| [02:38:52] TEACHER: If you had expired at is greater than now, then only you set it other than you don't   {#2480}
CTX| [02:38:55] TEACHER: set it.   {#2481}
CTX| [02:38:56] TEACHER: Correct.   {#2482}
CTX| [02:38:58] TEACHER: If the keys get to expire, then only you are deleting it.   {#2483}
CTX| [02:39:01] TEACHER: Otherwise why would you delete it?   {#2484}
CTX| [02:39:04] TEACHER: Correct.   {#2485}
CTX| [02:39:04] TEACHER: Okay.   {#2486}
CTX| [02:39:06] TEACHER: Badge delete is different.   {#2487}
CTX| [02:39:07] TEACHER: That is clean up.   {#2488}
CTX| [02:39:09] TEACHER: Where you are doing TTL is less than now where keys that are already expired, delete them.   {#2489}
