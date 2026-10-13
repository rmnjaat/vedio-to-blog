# chunk_12  OWNS 02:14:21 -> 02:27:23  (segments #2385-#2606, 2296 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:13:23] TEACHER: It does not take a huge amount of space.   {#2364}
CTX| [02:13:26] TEACHER: Implement consistent hashing.   {#2365}
CTX| [02:13:29] TEACHER: Hardly one R3.   {#2366}
CTX| [02:13:30] TEACHER: Hardly.   {#2367}
CTX| [02:13:31] TEACHER: I have a very detailed blog with Python source code on how to implement your own consistent   {#2368}
CTX| [02:13:35] TEACHER: hashing with very nice example.   {#2369}
CTX| [02:13:37] TEACHER: Go through that.   {#2370}
CTX| [02:13:37] TEACHER: It's there on my website.   {#2371}
CTX| [02:13:39] TEACHER: Under blogs.   {#2372}
CTX| [02:13:40] TEACHER: And I think I've shared it in periods as well.   {#2373}
CTX| [02:13:43] TEACHER: But understand this.   {#2374}
CTX| [02:13:44] TEACHER: What consistent hashing is doing is it is solving for ownership.   {#2375}
CTX| [02:13:48] TEACHER: So now how does it solve?   {#2376}
CTX| [02:13:49] TEACHER: So I'll brief you about consistent hashing a bit.   {#2377}
CTX| [02:13:51] TEACHER: So visually, whenever you are exploring considering everything,   {#2378}
CTX| [02:13:56] TEACHER: everyone just draw this ring and that's the simplest way to do it.   {#2379}
CTX| [02:13:59] TEACHER: But implementation, read that part.   {#2380}
CTX| [02:14:02] TEACHER: But now this is a very nice visual representation of it.   {#2381}
CTX| [02:14:04] TEACHER: So what happens is the things that will own something,   {#2382}
CTX| [02:14:10] TEACHER: in this case, cache nodes, the servers are placed on consistent hashing on this ring.   {#2383}
CTX| [02:14:17] TEACHER: So consistent hashing, basically it works on a hash function.   {#2384}

---- OWNED SEGMENTS START ----
[02:14:21] TEACHER: range 0 to 2 raised to something let's say I do it with 2 raised to 4 so 16 unique values I have   {#2385}
[02:14:27] TEACHER: in reality it is 2 raised to 128 also so gigantic value right so now what happens is every node so   {#2386}
[02:14:35] TEACHER: you pass the identifier of cache 1 through the hash function it spits out let's say 3 so my cache node   {#2387}
[02:14:41] TEACHER: cache 1 sits over here let's say when you pass in cache 2 it spits out 12 so my cache 2 sits over here   {#2388}
[02:14:48] TEACHER: When you pass cache 3, it spits out 5.   {#2389}
[02:14:51] TEACHER: So cache 3 sits over here.   {#2390}
[02:14:52] TEACHER: For cache 4, it spits out 10.   {#2391}
[02:14:54] TEACHER: It sits over here.   {#2392}
[02:14:56] TEACHER: So these are the places that my cache nodes held in this ring.   {#2393}
[02:15:02] TEACHER: Now when you get a key, I want to store.   {#2394}
[02:15:04] TEACHER: Now where is this implemented?   {#2395}
[02:15:06] TEACHER: At your router layer.   {#2396}
[02:15:08] TEACHER: The router that we discussed, the central layer.   {#2397}
[02:15:10] TEACHER: Whoever is holding the routing.   {#2398}
[02:15:11] TEACHER: If client holds the routing, it will be stored at the client side.   {#2399}
[02:15:14] TEACHER: If you have a proxy that does it, there.   {#2400}
[02:15:18] TEACHER: routing thing that like DNS, it will be stored there.   {#2401}
[02:15:20] TEACHER: Right.   {#2402}
[02:15:21] TEACHER: So this is just a routing information.   {#2403}
[02:15:23] TEACHER: All it needs to do is just have an array of four elements where you're storing this.   {#2404}
[02:15:28] TEACHER: That's it.   {#2405}
[02:15:29] TEACHER: That's all you're storing in a consistent hashing quote unquote ring.   {#2406}
[02:15:33] TEACHER: You don't have to store link list or whatnot.   {#2407}
[02:15:35] TEACHER: Very simple implementation.   {#2408}
[02:15:36] TEACHER: It's there on my blog.   {#2409}
[02:15:37] TEACHER: Right.   {#2410}
[02:15:38] TEACHER: But the idea is this is where your request comes in to determine the ownership.   {#2411}
[02:15:43] TEACHER: So even when we're talking about routing here, if we keep the logic, that table, this is   {#2412}
[02:15:52] TEACHER: the one who is telling you who is owning it.   {#2413}
[02:15:55] TEACHER: That needs to know who is owning it.   {#2414}
[02:15:57] TEACHER: That's how it would know where to forward the request.   {#2415}
[02:16:00] TEACHER: Here your client knows who owns it.   {#2416}
[02:16:02] TEACHER: So you are directly going there.   {#2417}
[02:16:04] TEACHER: So what consistent hashing is effectively doing, it is effectively replacing this with   {#2418}
[02:16:10] TEACHER: a fancier stuff.   {#2419}
[02:16:12] TEACHER: It's not a service.   {#2420}
[02:16:13] TEACHER: It's just this small thing.   {#2421}
[02:16:15] TEACHER: It's just replacing this mapping in a very elegant way.   {#2422}
[02:16:19] TEACHER: Okay.   {#2423}
[02:16:20] TEACHER: So let's go a little deeper into this.   {#2424}
[02:16:23] TEACHER: So now I'm here.   {#2425}
[02:16:24] TEACHER: Let's say my client wants to submit key K.   {#2426}
[02:16:28] TEACHER: Put key K in my system.   {#2427}
[02:16:29] TEACHER: It came to the router.   {#2428}
[02:16:30] TEACHER: It said, hey, I want to write key K.   {#2429}
[02:16:32] TEACHER: Please handle this request permit.   {#2430}
[02:16:34] TEACHER: Now this router would say key K, key K1.   {#2431}
[02:16:37] TEACHER: Where would it request go to?   {#2432}
[02:16:38] TEACHER: So now let's say key K1 came in.   {#2433}
[02:16:41] TEACHER: K1 through the hash function let's say spit out 0. It would pick the first node to the immediate   {#2434}
[02:16:46] TEACHER: right of it to place the key there. So who owns key K1? The first node to the right of 0 which is   {#2435}
[02:16:53] TEACHER: 3, 3 cache 1 so then my data goes to cache 1. So key K1 will be owned by cache 1. This is the   {#2436}
[02:17:03] TEACHER: ownership that I'm talking about. This is what consistent hashing does. That's it. It just   {#2437}
[02:17:07] TEACHER: determines ownership, nothing else.   {#2438}
[02:17:10] TEACHER: But now the advantage of this is we just saw that when we use hash function,   {#2439}
[02:17:16] TEACHER: it can go anywhere because it could have equal probability of coming anywhere.   {#2440}
[02:17:21] TEACHER: The problem with this is when I add a new node in my system,   {#2441}
[02:17:24] TEACHER: a lot of data needs to be rebalanced.   {#2442}
[02:17:27] TEACHER: A lot of data movement needs to happen over network, which is very slow.   {#2443}
[02:17:29] TEACHER: So can we make it faster?   {#2444}
[02:17:31] TEACHER: Now let's see how consistent hashing makes it better for us.   {#2445}
[02:17:35] TEACHER: We'll go into practical usage of data.   {#2446}
[02:17:37] TEACHER: minutes so let's say i had four roads taking up this place but i want to scale up my system   {#2447}
[02:17:44] TEACHER: so what i do is i add a fifth node when i add a fifth node i pass cache 5 through my hash function   {#2448}
[02:17:51] TEACHER: let's say spit out one so it spit out one so cache 5 sits over here now if you look carefully what   {#2449}
[02:17:59] TEACHER: What has happened is key K1 that used to go to cache 1 is now owned by cache 5 because   {#2450}
[02:18:07] TEACHER: the ownership has changed.   {#2451}
[02:18:09] TEACHER: As soon as my ring takes as soon as you change the considered hashing ring adding this value.   {#2452}
[02:18:14] TEACHER: Now suddenly when the new request comes in for key K1 it will now go to cache 5.   {#2453}
[02:18:20] TEACHER: But if you look carefully all the keys that are part of this range that used to go to cache   {#2454}
[02:18:28] TEACHER: one sorry that are part of this range that used to go to cache one will now go to cache   {#2455}
[02:18:35] TEACHER: five.   {#2456}
[02:18:36] TEACHER: These keys that used to go to cache one will still continue to go to cache one.   {#2457}
[02:18:41] TEACHER: All other keys remain unaffected.   {#2458}
[02:18:46] TEACHER: minimal data transfer.   {#2459}
[02:18:48] TEACHER: This is what minimal data transfer is all about that I am talking about.   {#2460}
[02:18:51] TEACHER: And so you don't, these keys are not even touched at all.   {#2461}
[02:18:57] TEACHER: What is happening is the nodes where it is placed,   {#2462}
[02:19:01] TEACHER: only the nodes where a new node is placed,   {#2463}
[02:19:03] TEACHER: only the nodes before and after that are affected.   {#2464}
[02:19:06] TEACHER: No one else is affected.   {#2465}
[02:19:07] TEACHER: So you do the bare minimum data transfer to where the node is added.   {#2466}
[02:19:12] TEACHER: Right?   {#2467}
[02:19:13] TEACHER: This is the benefit of using consistent hashing that it, all it does is it ensures that you   {#2468}
[02:19:22] TEACHER: have to do minimal data transfer and you scale up or scale down.   {#2469}
[02:19:27] TEACHER: Just like adding a new server.   {#2470}
[02:19:29] TEACHER: What if I'm removing a cache server?   {#2471}
[02:19:31] TEACHER: Let's say cache one and there are two cases.   {#2472}
[02:19:34] TEACHER: We'll talk about both.   {#2473}
[02:19:35] TEACHER: We'll talk about them both.   {#2474}
[02:19:36] TEACHER: And then we go into practicalities of it.   {#2475}
[02:19:39] TEACHER: infrastructure wise, how to do that.   {#2476}
[02:19:41] TEACHER: So let's say I had four nodes, decent enough traffic, but I'm okay.   {#2477}
[02:19:47] TEACHER: Like I have over provisioned it due to cost reduction.   {#2478}
[02:19:50] TEACHER: I want to remove one node so that I have safe cost.   {#2479}
[02:19:53] TEACHER: Then you remove this cache one.   {#2480}
[02:19:54] TEACHER: Now, what will you do in the consistent hashing ring key K1 that used to go to   {#2481}
[02:20:00] TEACHER: cache one now goes to cache three is owned by cache.   {#2482}
[02:20:04] TEACHER: So now when you are gracefully terminating it, what will you do?   {#2483}
[02:20:08] TEACHER: You'll take the data from cache one, copy it to cache three and then remove it from the   {#2484}
[02:20:15] TEACHER: ring so that the request when it goes over here, it does not lead to a cache miss.   {#2485}
[02:20:20] TEACHER: That's how operationally you do it.   {#2486}
[02:20:22] TEACHER: So when you're terminating a particular server gracefully, you first take a snapshot, copy   {#2487}
[02:20:28] TEACHER: all the data over here and then remove it from the ring so that the request when it   {#2488}
[02:20:34] TEACHER: to a cache miss.   {#2489}
[02:20:35] TEACHER: Second case, if let's say you abruptly delete the server, it went down abruptly removed from   {#2490}
[02:20:40] TEACHER: it.   {#2491}
[02:20:41] TEACHER: All the load for this range, all the load for this range that used to go to cache one will   {#2492}
[02:20:49] TEACHER: now suddenly go to cache three.   {#2493}
[02:20:50] TEACHER: You should be okay with that.   {#2494}
[02:20:52] TEACHER: So when it is an abrupt shutdown, all the requests would suddenly start going to cache   {#2495}
[02:20:57] TEACHER: three.   {#2496}
[02:20:58] TEACHER: But if it's a graceful one, you do a bare minimum data because all other keys, all other   {#2497}
[02:21:04] TEACHER: other keys they remain unaffected again minimal data transfer this is what consistent hashing does   {#2498}
[02:21:12] TEACHER: now just to think how do I know about this so much I've used consistent hashing in production   {#2499}
[02:21:18] TEACHER: that's what I'm so confident about it that what it does and what it does not   {#2500}
[02:21:24] TEACHER: turn off misconceptions floating here and there on the internet so try to stay away from them   {#2501}
[02:21:29] TEACHER: and understand what one problem does it solve and how it solves it.   {#2502}
[02:21:34] TEACHER: For implementation, refer to my blog on consistent rushing.   {#2503}
[02:21:37] TEACHER: I think it's there in the previous as well.   {#2504}
[02:21:38] TEACHER: Arpitbani.me slash consistent rushing.   {#2505}
[02:21:40] TEACHER: If you type or Google search Arpitbani consistent rushing,   {#2506}
[02:21:43] TEACHER: you will find that blog.   {#2507}
[02:21:44] TEACHER: In that I've talked about implementation of it.   {#2508}
[02:21:48] TEACHER: Just like how we talk about infrastructure side of things over here.   {#2509}
[02:21:51] TEACHER: Now look beautifully.   {#2510}
[02:21:52] TEACHER: When we do data transfer, how will we do data transfer?   {#2511}
[02:21:57] TEACHER: Let's talk about practicalities over here.   {#2512}
[02:21:59] TEACHER: If you look carefully, if I know my cache five is getting fitted over here.   {#2513}
[02:22:04] TEACHER: Right?   {#2514}
[02:22:05] TEACHER: Let's say if I just start a blank cache server and add it over here, what would happen?   {#2515}
[02:22:09] TEACHER: These keys will go to over here.   {#2516}
[02:22:12] TEACHER: There is nothing over here.   {#2517}
[02:22:13] TEACHER: It would lead to cache miss.   {#2518}
[02:22:15] TEACHER: So higher load on the backend systems that you have.   {#2519}
[02:22:17] TEACHER: Right?   {#2520}
[02:22:18] TEACHER: So how do you spin up this server?   {#2521}
[02:22:21] TEACHER: What do you do?   {#2522}
[02:22:22] TEACHER: You take the snapshot of cache one, you add cache five and then add it to this ring.   {#2523}
[02:22:29] TEACHER: So that when key K1 request goes over here, it would have the data.   {#2524}
[02:22:32] TEACHER: And then slowly delete the data from cache file.   {#2525}
[02:22:35] TEACHER: This is how operationally you take care of this.   {#2526}
[02:22:38] TEACHER: Step by step.   {#2527}
[02:22:39] TEACHER: You take the snapshot of cache file.   {#2528}
[02:22:41] TEACHER: Prepare cache file server.   {#2529}
[02:22:43] TEACHER: Add it to this ring.   {#2530}
[02:22:45] TEACHER: Request comes over here.   {#2531}
[02:22:46] TEACHER: And then slowly delete the keys that are part of this cache file.   {#2532}
[02:22:50] TEACHER: Simple.   {#2533}
[02:22:51] TEACHER: This is how operationally simple it becomes.   {#2534}
[02:22:54] TEACHER: It's very simple, bare minimum thing that you have to do.   {#2535}
[02:22:59] TEACHER: That's why a lot of people use consistent hashing because it gives you just one thing.   {#2536}
[02:23:06] TEACHER: Minimal data transfer.   {#2537}
[02:23:07] TEACHER: There is nothing big magic sauce behind it or not magic essence behind it.   {#2538}
[02:23:12] TEACHER: It's very simple, very beautiful in the hindsight.   {#2539}
[02:23:16] TEACHER: Right.   {#2540}
[02:23:17] TEACHER: Okay.   {#2541}
[02:23:18] TEACHER: What else?   {#2542}
[02:23:19] TEACHER: This is about consistent hashing.   {#2543}
[02:23:21] TEACHER: And what we just discussed is we discussed a distributed hash table.   {#2544}
[02:23:29] TEACHER: So just want to sprinkle few things about distributed hash table.   {#2545}
[02:23:32] TEACHER: What we just designed a distributed cash is actually nothing but a distributed hash table.   {#2546}
[02:23:38] TEACHER: The entire internet is a distributed hash table.   {#2547}
[02:23:41] TEACHER: The BitTorrent network is a distributed hash table.   {#2548}
[02:23:44] TEACHER: The Bitcoin network is a distributed hash table.   {#2549}
[02:23:47] TEACHER: It's a very generic concept.   {#2550}
[02:23:49] TEACHER: You just change the underlying storage and store it in memory.   {#2551}
[02:23:53] TEACHER: It becomes distributed cash.   {#2552}
[02:23:54] TEACHER: Storytorn becomes distributed storage.   {#2553}
[02:23:57] TEACHER: The kind of applications you built on top of it, that changes.   {#2554}
[02:24:01] TEACHER: But the idea is pretty simple.   {#2555}
[02:24:03] TEACHER: Idea of a distributed hash table is that there is no central entity that everyone talks to.   {#2556}
[02:24:10] TEACHER: In a distributed cache, you can choose not to go with a central routing server and still get Tingser.   {#2557}
[02:24:16] TEACHER: So there is no central entity that you are talking into.   {#2558}
[02:24:18] TEACHER: If I talk about internet scale, if I talk about BitTorrent network,   {#2559}
[02:24:22] TEACHER: then you literally talk to the nearest server.   {#2560}
[02:24:26] TEACHER: If it has a data good enough, otherwise it forwards the request and it,   {#2561}
[02:24:30] TEACHER: otherwise it responds back to the IP address of other machine that you can go to   {#2562}
[02:24:32] TEACHER: or other machine that you can go to or other machine you can go to.   {#2563}
[02:24:35] TEACHER: It always converges back and that's the property of it.   {#2564}
[02:24:38] TEACHER: Right.   {#2565}
[02:24:39] TEACHER: And when you add a node or remove a node, you have to do minimal data transfer,   {#2566}
[02:24:44] TEACHER: which is why consistent hashing like algorithms or techniques are used in   {#2567}
[02:24:50] TEACHER: implementation of any distributed hash table, because in case,   {#2568}
[02:24:53] TEACHER: even if a server goes down other server takes its place you have to ensure a minimal data movement   {#2569}
[02:24:57] TEACHER: so dhts are everywhere everywhere any distributed file system our distributed cache is an example   {#2570}
[02:25:05] TEACHER: of distributed file system where you have where you don't have a central entity and you need to   {#2571}
[02:25:10] TEACHER: do minimal data transfer when your node goes up and down that falls into the category of dhts   {#2572}
[02:25:16] TEACHER: dns servers are dhts instant messaging app irc clients you might have heard of those were dhts   {#2573}
[02:25:23] TEACHER: B2B networks, BitTorrent, DHTs.   {#2574}
[02:25:28] TEACHER: Interplanetary file system where entire blockchain data   {#2575}
[02:25:30] TEACHER: or basically distributed storage that you are doing   {#2576}
[02:25:32] TEACHER: are on NFTs and all.   {#2577}
[02:25:34] TEACHER: IPFS people store it.   {#2578}
[02:25:35] TEACHER: Interplanetary file system.   {#2579}
[02:25:36] TEACHER: If you have not heard of it, look for IPFS.io.   {#2580}
[02:25:40] TEACHER: You will understand what I am talking about.   {#2581}
[02:25:42] TEACHER: All distributed file system.   {#2582}
[02:25:44] TEACHER: All DHTs in the hindsight.   {#2583}
[02:25:47] TEACHER: In case you want to understand,   {#2584}
[02:25:48] TEACHER: in case, not an obligation,   {#2585}
[02:25:50] TEACHER: in case you want to understand how the routing happens,   {#2586}
[02:25:53] TEACHER: So very fascinating topic.   {#2587}
[02:25:54] TEACHER: I have 45 minutes of deep dive into this paper called Kademlia,   {#2588}
[02:26:00] TEACHER: mind-blowing implementation.   {#2589}
[02:26:02] TEACHER: I loved it when I first understood it.   {#2590}
[02:26:04] TEACHER: And then I made it very simple terms and I put it in a video.   {#2591}
[02:26:07] TEACHER: It took me three days to just understand Kademlia,   {#2592}
[02:26:10] TEACHER: what worth every minute that I spent on it.   {#2593}
[02:26:13] TEACHER: So what's that?   {#2594}
[02:26:14] TEACHER: It's a very fascinating concept, very fascinating implementation,   {#2595}
[02:26:18] TEACHER: very fascinating idea.   {#2596}
[02:26:20] TEACHER: And world is using it.   {#2597}
[02:26:23] TEACHER: routing. So you might have this question that does every node know about every other node in the   {#2598}
[02:26:29] TEACHER: internet? No, but then still it tends to somehow route the request and converge it to the node that   {#2599}
[02:26:35] TEACHER: has it. Right. That's what Kademlia does for you. Right. So in case interested, it's there on my   {#2600}
[02:26:41] TEACHER: YouTube BitTorrent series where you'll find Kademlia video. I don't know how that video   {#2601}
[02:26:46] TEACHER: does get viral, but that's fine. Watch it. Watch it. It's very fascinating concept. Very fascinating   {#2602}
[02:26:53] TEACHER: in love with distributed systems after watching that 100% guarantee right okay so these are dhds   {#2603}
[02:27:01] TEACHER: anything that i think we covered right okay uh okay uh high availability okay now let's talk   {#2604}
[02:27:11] TEACHER: about high availability because when you're building a cache see if it's a cache it's a   {#2605}
[02:27:16] TEACHER: different thing if it's a persistent storage it might be a little different but in basic concepts   {#2606}
---- OWNED SEGMENTS END ----

CTX| [02:27:23] TEACHER: availability ever ever the way to do it is adding replicas right for every node have a replica if a   {#2607}
CTX| [02:27:32] TEACHER: node goes down replica takes its place but it comes with its cost of maintaining that other node right   {#2608}
CTX| [02:27:37] TEACHER: but if availability is important for you you do that otherwise have copy of data on other node   {#2609}
CTX| [02:27:44] TEACHER: let's say whatever data is on cache 1 i have one copy of it in cache 3 whatever data i have on   {#2610}
CTX| [02:27:50] TEACHER: cache 3 I have one copy of it in cache 4. So in case my cache 3 goes down I know my cache 1's data   {#2611}
CTX| [02:27:57] TEACHER: sorry in case my cache 3 goes down my cache 4 will have data for cache 3. So any request for cache 3   {#2612}
CTX| [02:28:04] TEACHER: can also be handled by cache 4. So that's the beauty of this ring that you can have a replication   {#2613}
CTX| [02:28:09] TEACHER: factor of your data and you can say that hey this data is replication factor of let's say 2 which   {#2614}
CTX| [02:28:15] TEACHER: means the node that owns it stores it and two nodes immediately after that in the ring   {#2615}
CTX| [02:28:20] TEACHER: would have the data.   {#2616}
CTX| [02:28:22] TEACHER: So in case a node goes down, you know where to find the data and reconstruct this node   {#2617}
