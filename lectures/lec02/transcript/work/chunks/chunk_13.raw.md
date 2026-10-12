# chunk_13  OWNS 02:28:27 -> 02:41:34  (segments #2376-#2626, 2500 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:27:29] TEACHER: These is how you should design an architecture that covers almost all types of messaging   {#2359}
CTX| [02:27:34] TEACHER: systems.   {#2360}
CTX| [02:27:35] TEACHER: All you have to do is just change the different guarantees that you're giving.   {#2361}
CTX| [02:27:41] TEACHER: this for WhatsApp, we do this for zoom.   {#2362}
CTX| [02:27:43] TEACHER: We do this, everything else remains the same.   {#2363}
CTX| [02:27:46] TEACHER: Nothing fancy out there.   {#2364}
CTX| [02:27:47] TEACHER: And so, and one thing that I should have drawn is that one piece of component that.   {#2365}
CTX| [02:27:55] TEACHER: Tells you which server to connect to.   {#2366}
CTX| [02:27:57] TEACHER: So let's call it, uh, I don't know.   {#2367}
CTX| [02:28:02] TEACHER: Connector.   {#2368}
CTX| [02:28:03] TEACHER: She very bad name.   {#2369}
CTX| [02:28:05] TEACHER: Let me come up with that.   {#2370}
CTX| [02:28:06] TEACHER: So the idea of this is that users will talk to this service and get which web   {#2371}
CTX| [02:28:15] TEACHER: socket server to connect to.   {#2372}
CTX| [02:28:17] TEACHER: So let's say it's orchestrator is the very generic name that I always give.   {#2373}
CTX| [02:28:23] TEACHER: So let's orchestrate.   {#2374}
CTX| [02:28:24] TEACHER: Oh, oh, other balance.   {#2375}

---- OWNED SEGMENTS START ----
[02:28:27] TEACHER: Not load balance, but I'm just giving him balance.   {#2376}
[02:28:30] TEACHER: Right.   {#2377}
[02:28:31] TEACHER: So what balance that is doing is whenever a user comes up, it talks to balance   {#2378}
[02:28:36] TEACHER: to connect to it tells the IP out of edge server it connects to that edge server right and all and   {#2379}
[02:28:41] TEACHER: it tries to balance it and it says that all the users of a particular organization should all part   {#2380}
[02:28:46] TEACHER: of the same edge server person right and this is how you are right so what i would recommend   {#2381}
[02:28:53] TEACHER: you all to do is understand what redis pubsub is in case you are unaware write a small hello   {#2382}
[02:28:59] TEACHER: world it just requires to spin up a small redis server locally three clients connected on three   {#2383}
[02:29:06] TEACHER: to that and see how it functions. Redis does not give you any persistence. It is real-time   {#2384}
[02:29:10] TEACHER: pumps up. So when you receive a message, whichever etc. etc. connect you to it at that moment will   {#2385}
[02:29:17] TEACHER: receive the message which means there is a chance of message to be lost and not sent in real-time.   {#2386}
[02:29:24] TEACHER: So which is where you may have some periodic refreshes happening in the background which   {#2387}
[02:29:29] TEACHER: just refreshes the Slack channel. So you may see on WhatsApp checking for new messages. It is this   {#2388}
[02:29:36] TEACHER: new web socket connection was established.   {#2389}
[02:29:38] TEACHER: It was checking if there is new messages for it to fetch from the backend.   {#2390}
[02:29:41] TEACHER: Right.   {#2391}
[02:29:42] TEACHER: That's what happened.   {#2392}
[02:29:43] TEACHER: So you might have a small thread in JavaScript that is running and periodically checking   {#2393}
[02:29:47] TEACHER: in case you miss some messages or not, just last 50 messages and just check if you missed   {#2394}
[02:29:52] TEACHER: any, if you did, you just render it on the UI mimicking a false notification.   {#2395}
[02:29:57] TEACHER: Right.   {#2396}
[02:29:58] TEACHER: But this is how you would do it.   {#2397}
[02:29:59] TEACHER: And everything is there.   {#2398}
[02:30:00] TEACHER: This is just the theory that I explained while we were going through that.   {#2399}
[02:30:04] TEACHER: nothing fancy it's exactly what I explained by other I explained it in much more depth than what   {#2400}
[02:30:09] TEACHER: is covered over here because my ideas are getting much more clearer by the day but this is exactly   {#2401}
[02:30:13] TEACHER: what that local pool and all of that it's exactly that nothing which is out of this right okay any   {#2402}
[02:30:20] TEACHER: questions on this okay before I take questions uh this is exactly what I wanted to cover this is the   {#2403}
[02:30:25] TEACHER: depth that I typically don't cover in but I went really deep into every single part of Pacific we   {#2404}
[02:30:31] TEACHER: I've never done it in any of other code.   {#2405}
[02:30:33] TEACHER: This is by far the best I've covered this reason.   {#2406}
[02:30:36] TEACHER: I'm so happy about it, but do watch it once more.   {#2407}
[02:30:40] TEACHER: Do write hello world of web socket balancer, real time pub sub.   {#2408}
[02:30:47] TEACHER: Do that.   {#2409}
[02:30:47] TEACHER: Like those don't take it on the face value.   {#2410}
[02:30:49] TEACHER: Devil lies in the details.   {#2411}
[02:30:51] TEACHER: Implement everything.   {#2412}
[02:30:53] TEACHER: Right.   {#2413}
[02:30:54] TEACHER: Okay.   {#2414}
[02:30:54] TEACHER: This is all what I wanted to cover.   {#2415}
[02:30:56] TEACHER: Now we'll take open questions and I'll upload a recording by evening.   {#2416}
[02:31:01] TEACHER: want to drop up, will free to drop up next week is all about distributed systems.   {#2417}
[02:31:06] TEACHER: Uh, Saturdays about distributed systems.   {#2418}
[02:31:08] TEACHER: Sunday is about distributed ID generators, distribute systems.   {#2419}
[02:31:11] TEACHER: We build, uh, we've been really fancy stuff.   {#2420}
[02:31:14] TEACHER: We will load balancer.   {#2421}
[02:31:16] TEACHER: Again, we'll go into those nitty gritties of implementing a load balancer.   {#2422}
[02:31:19] TEACHER: I'll give you a code walkthrough of what a load code of a load balancer looks like.   {#2423}
[02:31:23] TEACHER: It's superbly simple.   {#2424}
[02:31:25] TEACHER: You would see, it's that simple to build a load balancer.   {#2425}
[02:31:28] TEACHER: So trust me, I've received so many messages from folks who have done this code today.   {#2426}
[02:31:31] TEACHER: I've just implemented my load balancer.   {#2427}
[02:31:33] TEACHER: This was the happiest day of my life.   {#2428}
[02:31:35] TEACHER: Literally I received one yesterday evening, right?   {#2429}
[02:31:37] TEACHER: Someone from the last cohort implemented load balancer.   {#2430}
[02:31:40] TEACHER: They're so happy doing it.   {#2431}
[02:31:41] TEACHER: And that's the beauty of it.   {#2432}
[02:31:42] TEACHER: Every single thing that you see is implementable.   {#2433}
[02:31:46] TEACHER: Implemented.   {#2434}
[02:31:47] TEACHER: The devil lies in the details.   {#2435}
[02:31:49] TEACHER: Always keep that thing in mind.   {#2436}
[02:31:50] TEACHER: Right?   {#2437}
[02:31:50] TEACHER: So folks who want to drop off, people to drop off more than happy to take the questions.   {#2438}
[02:31:54] TEACHER: Rajiv, go on.   {#2439}
[02:31:58] STUDENT_5: Hello, Arpit.   {#2440}
[02:31:59] STUDENT_5: The thing which is not clear is about edge servers.   {#2441}
[02:32:03] STUDENT_5: I mean, I don't know what I thought.   {#2442}
[02:32:05] TEACHER: Normal web socket servers, which runs a Node.js process of socket IO.   {#2443}
[02:32:09] TEACHER: That's it.   {#2444}
[02:32:10] STUDENT_5: But we expose the IPs of them directly to the client.   {#2445}
[02:32:13] STUDENT_5: We don't put it.   {#2446}
[02:32:14] TEACHER: Multiple ways to do it.   {#2447}
[02:32:15] TEACHER: Multiple ways.   {#2448}
[02:32:16] TEACHER: A lot of folks typically expose it over internet.   {#2449}
[02:32:18] TEACHER: There is no harm in that.   {#2450}
[02:32:19] TEACHER: You can also put it behind the level inside.   {#2451}
[02:32:21] STUDENT_5: I was put in a question state where they said that, okay, I mean, one of the interviews.   {#2452}
[02:32:25] STUDENT_5: that if you expose the IP over there, they can misuse.   {#2453}
[02:32:28] TEACHER: Interviews are stupid.   {#2454}
[02:32:29] TEACHER: Interviews are stupid.   {#2455}
[02:32:30] TEACHER: They don't know the real world system.   {#2456}
[02:32:32] TEACHER: Trust me on that.   {#2457}
[02:32:33] TEACHER: They don't know.   {#2458}
[02:32:33] TEACHER: That's why it was three big companies   {#2459}
[02:32:36] TEACHER: who publicly expose IP addresses of their edge servers.   {#2460}
[02:32:40] TEACHER: There is nothing wrong in this architecture.   {#2461}
[02:32:42] TEACHER: You can also put it behind load balancer.   {#2462}
[02:32:44] TEACHER: You are just having another hop.   {#2463}
[02:32:46] TEACHER: You are just having another hops.   {#2464}
[02:32:47] TEACHER: What if you don't want that hop, right?   {#2465}
[02:32:50] TEACHER: I build real-time communication.   {#2466}
[02:32:52] TEACHER: I know when to expose IP addresses, right?   {#2467}
[02:32:55] TEACHER: of places for example live class streaming if you don't do it if you add one load balancer   {#2468}
[02:33:02] TEACHER: you are adding latency how will you build real-time communication you cannot right   {#2469}
[02:33:07] TEACHER: at some places it is okay to put them behind load balancer but remember connections will always be   {#2470}
[02:33:13] TEACHER: sticky so one connection from user to load balancer another connection from load balancer to a web   {#2471}
[02:33:18] TEACHER: socket server every time one hop relay would happen three to five millisecond latency will be added   {#2472}
[02:33:25] TEACHER: good if you are not if you want ultra low latency directly expose ip addresses over there   {#2473}
[02:33:30] STUDENT_5: there is nothing you gain some you lose some right so uh getting the latency   {#2474}
[02:33:34] STUDENT_5: uh now i am actually bit of i want some knowledge over there what kind of security threats you get   {#2475}
[02:33:40] STUDENT_5: when you expose an ip because i mean you you also have to look at from that phase right yeah you get   {#2476}
[02:33:45] TEACHER: ton of them so that's where whenever we expose it you change the route tables you hide all the   {#2477}
[02:33:50] TEACHER: ports, you prevent SSH, you block a lot of stuff on this machine.   {#2478}
[02:33:55] TEACHER: So very high security review happens on this machine when you expose it on the internet.   {#2479}
[02:33:59] TEACHER: A ton of them, right?   {#2480}
[02:34:01] TEACHER: You don't put any credential database, which is why I never connected my ad server directly   {#2481}
[02:34:06] TEACHER: to a database.   {#2482}
[02:34:08] TEACHER: Zero connections, zero connections, because if I leave the credentials given if my server   {#2483}
[02:34:13] TEACHER: is exposed on the internet, and which is exactly why I also deliberately keep it over because   {#2484}
[02:34:16] TEACHER: I know every time someone would be there, would ask the same question.   {#2485}
[02:34:20] TEACHER: this fact that whenever any server is exposed on the internet, you ensure that you don't   {#2486}
[02:34:25] TEACHER: put any credentials on that.   {#2487}
[02:34:28] TEACHER: Here there will be zero credentials.   {#2488}
[02:34:30] TEACHER: This server will never talk to my database directly.   {#2489}
[02:34:32] TEACHER: They would have no idea what my database is.   {#2490}
[02:34:35] TEACHER: All they have is something that is okay for me to push.   {#2491}
[02:34:39] TEACHER: Maybe a Kafka connection string.   {#2492}
[02:34:40] TEACHER: In case it gets compromised, all I'll be losing is just a Kafka connection string.   {#2493}
[02:34:44] TEACHER: That's it.   {#2494}
[02:34:45] TEACHER: Nothing more.   {#2495}
[02:34:46] TEACHER: And this Kafka is anyway internal to our infra.   {#2496}
[02:34:49] TEACHER: No one will be able to talk to that.   {#2497}
[02:34:50] TEACHER: So no problem, right?   {#2498}
[02:34:52] TEACHER: There is nothing critical in this server, which is why it's okay.   {#2499}
[02:34:57] TEACHER: It's okay.   {#2500}
[02:34:58] TEACHER: Right.   {#2501}
[02:34:58] TEACHER: So even if it gets compromised, no one can do anything with that.   {#2502}
[02:35:03] TEACHER: All they have is just one machine that tells you IP address of all   {#2503}
[02:35:06] TEACHER: edge servers, worst thing they can do is DDoS.   {#2504}
[02:35:09] TEACHER: Right.   {#2505}
[02:35:09] TEACHER: Worst thing, but you can still prevent DDoS by having a simple load,   {#2506}
[02:35:13] TEACHER: a simple rate within this.   {#2507}
[02:35:15] TEACHER: That's okay.   {#2508}
[02:35:16] TEACHER: Right.   {#2509}
[02:35:17] TEACHER: So you don't need, which is exactly why I say that.   {#2510}
[02:35:20] TEACHER: If you keep things simple and as I say that there is hundreds of ways to build a system.   {#2511}
[02:35:26] TEACHER: You just need to know what guarantees you are playing.   {#2512}
[02:35:29] TEACHER: Right.   {#2513}
[02:35:30] TEACHER: It's okay.   {#2514}
[02:35:31] TEACHER: There is no rule that says you should always put a WebSocket server behind a load valancer.   {#2515}
[02:35:37] TEACHER: There is no such.   {#2516}
[02:35:39] TEACHER: If I can ensure security of my publicly exposed server, I'm good.   {#2517}
[02:35:43] TEACHER: I'm good.   {#2518}
[02:35:44] TEACHER: Correct.   {#2519}
[02:35:45] TEACHER: Always kill that thing in me.   {#2520}
[02:35:47] TEACHER: Okay.   {#2521}
[02:35:47] STUDENT_4: Thank you.   {#2522}
[02:35:48] TEACHER: Okay.   {#2523}
[02:35:52] STUDENT_4: So one thing, how these servers are kept aware with channel changes.   {#2524}
[02:36:01] STUDENT_4: If a new channel is created, if someone leaves the channel, joins the channel.   {#2525}
[02:36:05] TEACHER: So these should be.   {#2526}
[02:36:07] TEACHER: User is the one who is doing that action.   {#2527}
[02:36:10] TEACHER: Correct.   {#2528}
[02:36:11] TEACHER: You will always join a channel when you are online.   {#2529}
[02:36:15] TEACHER: Correct.   {#2530}
[02:36:16] TEACHER: You can send that event to a server saying that, Hey, now I'm subscribed to this channel.   {#2531}
[02:36:21] TEACHER: Correct.   {#2532}
[02:36:22] STUDENT_4: When there are multiple servers, then that action has to go to like all the servers,   {#2533}
[02:36:26] STUDENT_4: right?   {#2534}
[02:36:26] TEACHER: No, every server is doing that.   {#2535}
[02:36:28] TEACHER: Right.   {#2536}
[02:36:28] TEACHER: So A is taking care of the, I am part of this channel.   {#2537}
[02:36:30] TEACHER: That's it.   {#2538}
[02:36:32] TEACHER: Why, why it has to go to all servers, like say D is also part, let's say a new channel   {#2539}
[02:36:36] TEACHER: is created channel three and in that A and D are added.   {#2540}
[02:36:40] TEACHER: A and D would know that they are added to that because they would be notified by it.   {#2541}
[02:36:44] TEACHER: How would they be notified over a web socket connection?   {#2542}
[02:36:47] TEACHER: Then it would request it.   {#2543}
[02:36:48] TEACHER: I am now part of this channel.   {#2544}
[02:36:50] TEACHER: So subscribe me to that.   {#2545}
[02:36:51] TEACHER: So it's a will take those actions because they would also need to be notified, right?   {#2546}
[02:36:55] TEACHER: A and D that now you are part of channel three also.   {#2547}
[02:36:58] TEACHER: So first who, who is not, let me do that.   {#2548}
[02:37:01] TEACHER: Let's say he created channel three, right?   {#2549}
[02:37:04] TEACHER: He created channel three.   {#2550}
[02:37:06] TEACHER: How would he create channel three?   {#2551}
[02:37:07] TEACHER: He would make an API call and create channel three, which updates the database.   {#2552}
[02:37:14] TEACHER: Right now.   {#2553}
[02:37:16] TEACHER: would then talk to edge servers through this Redis PubSub and broadcast a notification that,   {#2554}
[02:37:21] TEACHER: Hey, these users are now parlap.   {#2555}
[02:37:24] TEACHER: You can have those, you can have those messaging systems in place or rather those, those messages   {#2556}
[02:37:28] TEACHER: in place, which tells your PubSub to broadcast message to all edge servers that this new   {#2557}
[02:37:32] TEACHER: channel is created for this particular organization.   {#2558}
[02:37:35] TEACHER: And these users are part of it.   {#2559}
[02:37:36] TEACHER: This message would be received by all the users who are new part of the newly created   {#2560}
[02:37:40] TEACHER: channel.   {#2561}
[02:37:41] TEACHER: They would get that very nice real time animation.   {#2562}
[02:37:46] TEACHER: new channel is added in your list. For example, that client can then send periodically that,   {#2563}
[02:37:52] TEACHER: Hey, I am part of these channels. That's like a periodic meta call that is making to edge   {#2564}
[02:37:56] TEACHER: server saying that, Hey, I'm part of these channels. I'm part of this channels. I'm part   {#2565}
[02:38:00] TEACHER: of this channel. Once it knows that I'm part of this channel, it tells edge server that,   {#2566}
[02:38:03] TEACHER: Hey, now I'm also part of channel three. So it subscribes. It tells edge server I'm part   {#2567}
[02:38:08] TEACHER: of channel three. Edge server updates it's in memory store. Fires a call to redis says   {#2568}
[02:38:12] TEACHER: now pepsockets server one is now subscribing to channel three also this is one way to build it   {#2569}
[02:38:17] TEACHER: this is not the only way to build it this is one of the ways to build where you are relying on client   {#2570}
[02:38:21] TEACHER: to tell it another way to do it is where edge server itself is calling the api of the backend   {#2571}
[02:38:28] TEACHER: and pulling that information that hey which all users are part of which all channels periodically   {#2572}
[02:38:32] TEACHER: the users that are connected on that that is another way to build it but on a publicly exposed   {#2573}
[02:38:37] TEACHER: server, you cannot do it.   {#2574}
[02:38:39] TEACHER: If it's private or in process and you can do it multiple ways to implement   {#2575}
[02:38:43] TEACHER: either user tells us a word or server gets somehow that information or   {#2576}
[02:38:48] TEACHER: server periodically pulls that information either.   {#2577}
[02:38:52] STUDENT_4: Okay.   {#2578}
[02:38:53] STUDENT_4: And any specific reason to choose Redis pubs up here, which one would you pick?   {#2579}
[02:39:02] STUDENT_4: No, there are other streaming services also, right?   {#2580}
[02:39:04] TEACHER: from cloud providers like let's say OCS streaming OCS I'm not sure I just pick one anything that   {#2581}
[02:39:12] TEACHER: gives you real-time pop-up I'll use that simple so that's why I focus on real-time pop-up right   {#2582}
[02:39:17] TEACHER: that's the requirement that I need Redis gives I've used Redis to build this exact same system   {#2583}
[02:39:22] TEACHER: I use Redis to build it and that's why I picked that up but that's why I always say real-time   {#2584}
[02:39:27] TEACHER: pop-up whichever provider gives you real-time pop-up or you built one on yourself you use that   {#2585}
[02:39:34] TEACHER: don't want to persist anyway, if it gives persistence, good enough, but I want real   {#2586}
[02:39:37] TEACHER: time sending messages to everyone who is subscribed, whatever, like whichever service,   {#2587}
[02:39:42] TEACHER: whichever database, whichever tool, whichever framework gives me that I'll use it.   {#2588}
[02:39:47] STUDENT_4: So that means there is some expiration date for the message.   {#2589}
[02:39:50] STUDENT_4: Like no putting, there is no, no persistence, immediate broadcast and discard.   {#2590}
[02:39:55] TEACHER: No expiration, no person.   {#2591}
[02:39:57] TEACHER: That's what I said.   {#2592}
[02:39:58] TEACHER: No one's storing that message anywhere.   {#2593}
[02:40:00] TEACHER: You're literally getting the message, sending it to everyone who is   {#2594}
[02:40:05] STUDENT_4: Okay.   {#2595}
[02:40:08] TEACHER: Jay?   {#2596}
[02:40:11] STUDENT_4: Yeah, hi, Erfit.   {#2597}
[02:40:13] STUDENT_4: So my question is regarding that point you made about the authenticity of data at the   {#2598}
[02:40:19] STUDENT_4: edge servers.   {#2599}
[02:40:20] STUDENT_4: So currently, all the info we receive about membership comes from the end users.   {#2600}
[02:40:27] STUDENT_4: So how do we deal with bad actors?   {#2601}
[02:40:29] STUDENT_4: or suppose I were to introduce the feature of private channels next, then put this model   {#2602}
[02:40:38] STUDENT_4: be sufficiently secure.   {#2603}
[02:40:40] TEACHER: So now that you are altering it, if you are having that as a critical information, then   {#2604}
[02:40:46] TEACHER: you rely on a back end DPA call to get it.   {#2605}
[02:40:48] TEACHER: But then you have to put your head servers behind a load balancer private or infrastructure   {#2606}
[02:40:53] TEACHER: problem solved.   {#2607}
[02:40:55] TEACHER: Correct.   {#2608}
[02:40:55] TEACHER: All right.   {#2609}
[02:40:57] TEACHER: Right.   {#2610}
[02:40:58] TEACHER: So that's why I have deliberately designed it in a way that makes you ask these questions.   {#2611}
[02:41:03] TEACHER: Right.   {#2612}
[02:41:04] TEACHER: Think on those lines.   {#2613}
[02:41:05] TEACHER: Now what you brought up is an excellent point.   {#2614}
[02:41:07] TEACHER: What is your private tenants?   {#2615}
[02:41:08] TEACHER: Because now user can falsely claim it.   {#2616}
[02:41:10] TEACHER: I am part of this channel.   {#2617}
[02:41:11] TEACHER: Give me all the messages.   {#2618}
[02:41:12] TEACHER: Now you start receiving messages of that.   {#2619}
[02:41:14] TEACHER: So you are literally doing a man in a middle attack.   {#2620}
[02:41:17] TEACHER: You don't want that to happen.   {#2621}
[02:41:18] TEACHER: So now what do you do?   {#2622}
[02:41:19] TEACHER: You make this service private, put it behind a load balancer and make this ad server talk   {#2623}
[02:41:24] TEACHER: to your database or maybe make an API call periodically to get the channel information.   {#2624}
[02:41:30] STUDENT_4: Got it.   {#2625}
[02:41:31] STUDENT_1: Thanks.   {#2626}
---- OWNED SEGMENTS END ----

CTX| [02:41:34] STUDENT_1: Yeah.   {#2627}
CTX| [02:41:35] STUDENT_1: So I was thinking of another way of designing it.   {#2628}
CTX| [02:41:38] STUDENT_1: So we can have one service which tells the server that you have to send this message   {#2629}
CTX| [02:41:42] STUDENT_1: to this client.   {#2630}
CTX| [02:41:43] TEACHER: That's all right.   {#2631}
CTX| [02:41:44] TEACHER: We can have every time you're making call to that service to tell which server to send   {#2632}
CTX| [02:41:48] TEACHER: it far too expensive.   {#2633}
CTX| [02:41:50] TEACHER: Then that's not real time because then that service is oververted.   {#2634}
CTX| [02:41:54] STUDENT_1: do that that's not at all real time okay so i was thinking like it can uh like it can catch the   {#2635}
CTX| [02:42:01] TEACHER: users data which is still slow still slow making a network call every time to get it where to send it   {#2636}
CTX| [02:42:06] TEACHER: very slow never see it depends like you can build it that way you can also make a call to tv and get   {#2637}
CTX| [02:42:14] TEACHER: it and build it it's about how real time you want this to be and making a call to a service just to   {#2638}
CTX| [02:42:19] TEACHER: get that information every time.   {#2639}
CTX| [02:42:22] TEACHER: I wouldn't build it when I'm building a real time communication.   {#2640}
CTX| [02:42:25] TEACHER: I would just want to do a build a very simple system, just adding a service for the sake   {#2641}
CTX| [02:42:30] TEACHER: of it, just to tell you where to forward it to is an over.   {#2642}
CTX| [02:42:34] TEACHER: I can very well store this information over here.   {#2643}
