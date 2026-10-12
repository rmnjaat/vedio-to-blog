# chunk_12  OWNS 02:17:20 -> 02:28:27  (segments #2194-#2375, 1904 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:16:22] TEACHER: organization which server should I connect to.   {#2173}
CTX| [02:16:25] TEACHER: It gives you IP address of this.   {#2174}
CTX| [02:16:26] TEACHER: All the users of a particular organization can connect to this one WebSocket server.   {#2175}
CTX| [02:16:29] TEACHER: Now there is no need of sending this message to Redis at all.   {#2176}
CTX| [02:16:32] TEACHER: They just do it intermittently like within themselves they can send a message.   {#2177}
CTX| [02:16:37] TEACHER: Right.   {#2178}
CTX| [02:16:37] TEACHER: So it reduces the overhead.   {#2179}
CTX| [02:16:39] TEACHER: So what the job of this service would be to spit out the WebSocket server to connect to   {#2180}
CTX| [02:16:45] TEACHER: such that it reduces the balancing, it reduces the load on this.   {#2181}
CTX| [02:16:50] TEACHER: the number of messages that needs to be sent through this, it reduces that.   {#2182}
CTX| [02:16:55] TEACHER: This is what this service needs to handle.   {#2183}
CTX| [02:16:58] TEACHER: So when a user logs on to Slack or starts the Slack app,   {#2184}
CTX| [02:17:02] TEACHER: it connects to this,   {#2185}
CTX| [02:17:04] TEACHER: asks for an IP address of a WebSocket server to connect to,   {#2186}
CTX| [02:17:06] TEACHER: it spits out an IP address, the user connects to that IP address,   {#2187}
CTX| [02:17:09] TEACHER: and so on and so forth.   {#2188}
CTX| [02:17:11] TEACHER: Now, problem.   {#2189}
CTX| [02:17:12] TEACHER: What if this server goes down?   {#2190}
CTX| [02:17:14] TEACHER: Oh my God, life ended.   {#2191}
CTX| [02:17:15] TEACHER: No, no, no, nothing would happen.   {#2192}
CTX| [02:17:17] TEACHER: When this server goes down,   {#2193}

---- OWNED SEGMENTS START ----
[02:17:20] TEACHER: server ended they would again talk to this service and find another IP address to connect to now it's   {#2194}
[02:17:25] TEACHER: the responsibility of this service to see that oh oh my god this server is down let me move all of   {#2195}
[02:17:29] TEACHER: them to this server so now when these users try to reconnect they would get IP address of this so   {#2196}
[02:17:35] TEACHER: now all the users will connect to this simple right in worst case for some time they would have to   {#2197}
[02:17:41] TEACHER: just move messages here and there through this redisk that's perfectly fine and periodically   {#2198}
[02:17:47] TEACHER: it might do balancing of load across web servers also that intermittently kill one and so that   {#2199}
[02:17:53] TEACHER: every traffic of a particular user is moved to other server to minimize the IO that happens   {#2200}
[02:17:59] TEACHER: over Redis.   {#2201}
[02:18:01] TEACHER: Right.   {#2202}
[02:18:02] TEACHER: But now here you very beautifully see how web sockets are scaled without having any   {#2203}
[02:18:08] TEACHER: hiccups.   {#2204}
[02:18:09] TEACHER: You can very easily scale web sockets.   {#2205}
[02:18:12] TEACHER: You reduce the overhead of maintaining additional TCP connections by introducing a real-time   {#2206}
[02:18:18] TEACHER: pubsub.   {#2207}
[02:18:18] TEACHER: This is not Kafka, this is a real-time pubsub like Redis.   {#2208}
[02:18:22] TEACHER: Write a hello world with Redis PubSub, highly recommend you to do that.   {#2209}
[02:18:27] TEACHER: And all users connected to bunch of servers, WebSocket servers, and how do they get IP   {#2210}
[02:18:32] TEACHER: of WebSocket servers is through this one service where anytime to get the IP address of a WebSocket   {#2211}
[02:18:38] TEACHER: server to connect to this service skills with server to connect to this way you can minimize   {#2212}
[02:18:43] TEACHER: the IO that needs to happen over radius you be protective of that right this is exactly how   {#2213}
[02:18:51] TEACHER: exactly not even kidding i built it myself this is exactly how people build this this is exactly   {#2214}
[02:18:56] TEACHER: how web pockets are scale you just work on the fundamentals that's it when you get something you   {#2215}
[02:19:02] TEACHER: enter up you hit a problem you hit a roadblock you find the simplest solution for that always   {#2216}
[02:19:08] TEACHER: scale as soon as you add complexity your system would not scale at all keep things simple and try   {#2217}
[02:19:15] TEACHER: right okay this is how web socket server scale so let me formally cover that and then i'll take   {#2218}
[02:19:21] TEACHER: questions there will be a bunch of questions more than happy to answer even if it is one it's okay   {#2219}
[02:19:24] TEACHER: for right but absorb this like how we thought of this one simple design just slacks real-time   {#2220}
[02:19:32] TEACHER: combination and covered a bunch of stuff around it let me formally cover it so that i ensure i   {#2221}
[02:19:35] TEACHER: covered everything more than happy to take the question.   {#2222}
[02:19:38] TEACHER: Okay. So first thing that we discussed was DMs are just channel with two people.   {#2223}
[02:19:45] TEACHER: So what you do is on channel, you add a small time that tells you if it's DM so that you   {#2224}
[02:19:51] TEACHER: can render it accordingly.   {#2225}
[02:19:53] TEACHER: You have messages in which you say for this channel, DM is just a channel or DM from a   {#2226}
[02:20:00] TEACHER: user to this channel.   {#2227}
[02:20:02] TEACHER: So DM is also a channel.   {#2228}
[02:20:03] TEACHER: Channel is also a channel.   {#2229}
[02:20:05] TEACHER: Okay, now multiple messages just need a sharded database.   {#2230}
[02:20:10] TEACHER: No need of over complication.   {#2231}
[02:20:12] TEACHER: Anything that is sharded for chat or for Slack, you typically don't need NoSQL.   {#2232}
[02:20:18] TEACHER: But if you have Cassandra well input, then what you need is a way to store the message   {#2233}
[02:20:22] TEACHER: in the sharded thing, right?   {#2234}
[02:20:24] TEACHER: Because one database note definitely would not be able to handle the load, right?   {#2235}
[02:20:27] TEACHER: So this is what your basic Kidditch diagram, but this is what your basic architecture would   {#2236}
[02:20:32] TEACHER: look like for now.   {#2237}
[02:20:33] TEACHER: Any partition DBA would work.   {#2238}
[02:20:36] TEACHER: The three types of messaging that we discussed,   {#2239}
[02:20:38] TEACHER: depending on the persistence that we are going for,   {#2240}
[02:20:41] TEACHER: asynchronous storage, synchronous storage,   {#2241}
[02:20:43] TEACHER: and non-persistent storage.   {#2242}
[02:20:45] TEACHER: Different ways to build a system,   {#2243}
[02:20:47] TEACHER: Slack, WhatsApp, and Zoom.   {#2244}
[02:20:49] TEACHER: Hey, the color also matched.   {#2245}
[02:20:51] TEACHER: Nice.   {#2246}
[02:20:52] TEACHER: White, WhatsApp green, and Zoom blue.   {#2247}
[02:20:55] TEACHER: And happy coincidence.   {#2248}
[02:20:57] TEACHER: Okay.   {#2249}
[02:20:57] TEACHER: Now, the key highlight of any real-time communication   {#2250}
[02:21:03] TEACHER: Sockets, the persistent connection, especially for text, it's web sockets.   {#2251}
[02:21:07] TEACHER: That's what comes in.   {#2252}
[02:21:08] TEACHER: Now here, one thing I want to highlight, which I did not cover while I was explaining other   {#2253}
[02:21:13] TEACHER: stuff is the limit of six concurrent TCP connections.   {#2254}
[02:21:17] TEACHER: Now here on the client side, not server, not backend server, client as in browsers, as in   {#2255}
[02:21:25] TEACHER: Android clients, there is a limit of maximum number of TCP connections that we can create   {#2256}
[02:21:32] TEACHER: backend. For example, from my browser, I can create at max six concurrent TCP connections   {#2257}
[02:21:40] TEACHER: only on my backend server. And why is this there or on a domain? Why is it there? For example,   {#2258}
[02:21:47] TEACHER: so that people don't abuse, you can easily do DDoS if this was not the limitation, right? So you   {#2259}
[02:21:53] TEACHER: don't want to do that because of which browsers enforce this thing. Six concurrent TCP connection   {#2260}
[02:21:58] TEACHER: limit six or eight six is for chrome eight is for firebox they enforce this limit on that from my   {#2261}
[02:22:05] TEACHER: browser i would not allow more than six concurrent tcp connections to happen on a particular domain   {#2262}
[02:22:10] TEACHER: that's so this way what happens is you would typically have just one web socket connection   {#2263}
[02:22:18] TEACHER: that is talking to the edge server and i'm just talking it as edge server because everyone talking   {#2264}
[02:22:23] TEACHER: to that and just giving it a fancy name i like to give personas to think so these are w's these   {#2265}
[02:22:28] TEACHER: edge servers on which every user is establishing web socket to this server, right?   {#2266}
[02:22:33] TEACHER: Any real time communication.   {#2267}
[02:22:35] TEACHER: And it's not that you should not create one web socket for every feature that I have   {#2268}
[02:22:40] TEACHER: because your browser has only six connection limit, right?   {#2269}
[02:22:43] TEACHER: If one is gone, you are only left with five other to do all rest API stuff,   {#2270}
[02:22:48] TEACHER: loading images, videos, and whatnot.   {#2271}
[02:22:50] TEACHER: You only have six concurrent connections to play with because web socket is a   {#2272}
[02:22:54] TEACHER: persistent TCP connection, as soon as you create one web socket connection, one is gone.   {#2273}
[02:22:59] TEACHER: You are now left with only five connections.   {#2274}
[02:23:01] TEACHER: Right?   {#2275}
[02:23:02] TEACHER: For example, example.   {#2276}
[02:23:04] TEACHER: Now, how would this affect?   {#2277}
[02:23:05] TEACHER: Imagine you have a web page on which there are 100 images, same size, same size 100 images.   {#2278}
[02:23:14] TEACHER: If you have no web socket connections, you would load six images at a time.   {#2279}
[02:23:19] TEACHER: And the next image, next image.   {#2280}
[02:23:20] TEACHER: So when you render this image, it makes HTTP call to get those images and render it.   {#2281}
[02:23:25] TEACHER: browser although you make 100 requests in parallel your browser will only send six at a time   {#2282}
[02:23:30] TEACHER: and then next six and then next six and then next six so you'll always say six six six six six getting   {#2283}
[02:23:36] TEACHER: right but now if you have one web socket connection open and now if you refresh the page you would see   {#2284}
[02:23:42] TEACHER: five images loading at a time so five five five five five five five that's the problem so now if   {#2285}
[02:23:48] TEACHER: you have two web socket connections of one you would see four images four four four now you see   {#2286}
[02:23:54] TEACHER: or the speed at which you can talk to your backend   {#2287}
[02:23:57] TEACHER: just by creating more additional web socket connections.   {#2288}
[02:24:00] TEACHER: Which is where every good product   {#2289}
[02:24:04] TEACHER: will have just one web socket connection   {#2290}
[02:24:07] TEACHER: and anything and everything real time   {#2291}
[02:24:10] TEACHER: will happen through that.   {#2292}
[02:24:11] TEACHER: So in case you are doing Instagram,   {#2293}
[02:24:15] TEACHER: all the live chat messages   {#2294}
[02:24:16] TEACHER: through that same web socket connection,   {#2295}
[02:24:18] TEACHER: live video space, that heart animation,   {#2296}
[02:24:21] TEACHER: same web socket connection.   {#2297}
[02:24:22] TEACHER: You don't create separate web connection   {#2298}
[02:24:24] TEACHER: every real-time feature that you have.   {#2299}
[02:24:26] TEACHER: That's the worst way to build a system.   {#2300}
[02:24:28] TEACHER: Worst.   {#2301}
[02:24:29] TEACHER: Because it significantly reduces   {#2302}
[02:24:31] TEACHER: the amount of work   {#2303}
[02:24:32] TEACHER: that you can get done on the browsers.   {#2304}
[02:24:35] TEACHER: Like from the browser to the backend,   {#2305}
[02:24:36] TEACHER: the number of calls,   {#2306}
[02:24:37] TEACHER: API calls would slow down   {#2307}
[02:24:38] TEACHER: because now you cannot make   {#2308}
[02:24:39] TEACHER: a lot of calls in parallel.   {#2309}
[02:24:41] TEACHER: Right?   {#2310}
[02:24:41] TEACHER: So that's a biggest limitation.   {#2311}
[02:24:43] TEACHER: Because of which   {#2312}
[02:24:44] TEACHER: you would always have   {#2313}
[02:24:45] TEACHER: just one web socket connection   {#2314}
[02:24:49] TEACHER: to the backend.   {#2315}
[02:24:50] TEACHER: Not many.   {#2316}
[02:24:51] TEACHER: You can have many,   {#2317}
[02:24:52] TEACHER: but it is not recommended.   {#2318}
[02:24:53] TEACHER: It would slow down your system.   {#2319}
[02:24:54] TEACHER: or rather your product or your experience.   {#2320}
[02:24:57] TEACHER: Right.   {#2321}
[02:24:58] TEACHER: Okay.   {#2322}
[02:24:58] TEACHER: Now this is what I was talking about the Kafka based thing.   {#2323}
[02:25:00] TEACHER: I kept it open.   {#2324}
[02:25:02] TEACHER: I deliberately choose conflicting implementation so that you keep your minds open about stuff   {#2325}
[02:25:07] TEACHER: and not just be adamant.   {#2326}
[02:25:08] TEACHER: Oh, this is exactly how it needs to be there.   {#2327}
[02:25:11] TEACHER: Right.   {#2328}
[02:25:11] TEACHER: There is no one way to build it.   {#2329}
[02:25:12] TEACHER: Right.   {#2330}
[02:25:13] TEACHER: Whatever guarantees you have, you build it that way.   {#2331}
[02:25:16] TEACHER: Right.   {#2332}
[02:25:17] TEACHER: Okay.   {#2333}
[02:25:17] TEACHER: Let me talk about this.   {#2334}
[02:25:18] TEACHER: Where I talked about the edge servers, this basically web socket.   {#2335}
[02:25:24] TEACHER: directly jump to this this is fine so this is a basic high level stuff of that that gives you the   {#2336}
[02:25:30] TEACHER: overall picture now here what you would see is these are normal api servers that you have   {#2337}
[02:25:36] TEACHER: this is the partition database that we are talking about here are the web socket connections connecting   {#2338}
[02:25:42] TEACHER: to edge servers membership information is with edge servers because user tells when connecting   {#2339}
[02:25:47] TEACHER: to this that hey i am part of these all channels depending on users that are part of these channels   {#2340}
[02:25:54] TEACHER: request to redis and by farce a command to redis they say i am edge server i am websocket server   {#2341}
[02:25:59] TEACHER: one and i want to subscribe to channel c1 channel c2 channel c3 some websocket server two would say   {#2342}
[02:26:05] TEACHER: i want to subscribe to channel c2 c3 and c5 right these are slack channels that they are subscribing   {#2343}
[02:26:10] TEACHER: these are also coincidentally the redis channels in our case but implementation may vary now here   {#2344}
[02:26:18] TEACHER: what we are doing is we are having very clear separation, very clear separation of user then   {#2345}
[02:26:24] TEACHER: making. Now here I'm going with persistence level 2 where asynchronous persistence is okay. Right.   {#2346}
[02:26:30] TEACHER: So think of it like WhatsApp kind of stuff where messages also persisted in background. Slack,   {#2347}
[02:26:35] TEACHER: we all know it would happen like this and then being sent to edge server and then sent to other   {#2348}
[02:26:41] TEACHER: users right but with WhatsApp you would do WebSocket, Edge servers, Kafka,   {#2349}
[02:26:51] TEACHER: asynchronous persistence consumed by consumers persisted in the database and   {#2350}
[02:26:56] TEACHER: from this messages sent to other people connected to this and now here you have   {#2351}
[02:27:02] TEACHER: normal messaging service on which you are firing normal HTTP request to load   {#2352}
[02:27:07] TEACHER: all the messages historical scrolling all of that happens over here.   {#2353}
[02:27:11] TEACHER: Any real time communication happens over here through WebSocket.   {#2354}
[02:27:15] TEACHER: So normal rest based APIs happens over here.   {#2355}
[02:27:19] TEACHER: Real time happens over here.   {#2356}
[02:27:21] TEACHER: Asynchronous persistence, storage layer, partition database, real type of sub for inter-edge   {#2357}
[02:27:27] TEACHER: server communication.   {#2358}
[02:27:29] TEACHER: These is how you should design an architecture that covers almost all types of messaging   {#2359}
[02:27:34] TEACHER: systems.   {#2360}
[02:27:35] TEACHER: All you have to do is just change the different guarantees that you're giving.   {#2361}
[02:27:41] TEACHER: this for WhatsApp, we do this for zoom.   {#2362}
[02:27:43] TEACHER: We do this, everything else remains the same.   {#2363}
[02:27:46] TEACHER: Nothing fancy out there.   {#2364}
[02:27:47] TEACHER: And so, and one thing that I should have drawn is that one piece of component that.   {#2365}
[02:27:55] TEACHER: Tells you which server to connect to.   {#2366}
[02:27:57] TEACHER: So let's call it, uh, I don't know.   {#2367}
[02:28:02] TEACHER: Connector.   {#2368}
[02:28:03] TEACHER: She very bad name.   {#2369}
[02:28:05] TEACHER: Let me come up with that.   {#2370}
[02:28:06] TEACHER: So the idea of this is that users will talk to this service and get which web   {#2371}
[02:28:15] TEACHER: socket server to connect to.   {#2372}
[02:28:17] TEACHER: So let's say it's orchestrator is the very generic name that I always give.   {#2373}
[02:28:23] TEACHER: So let's orchestrate.   {#2374}
[02:28:24] TEACHER: Oh, oh, other balance.   {#2375}
---- OWNED SEGMENTS END ----

CTX| [02:28:27] TEACHER: Not load balance, but I'm just giving him balance.   {#2376}
CTX| [02:28:30] TEACHER: Right.   {#2377}
CTX| [02:28:31] TEACHER: So what balance that is doing is whenever a user comes up, it talks to balance   {#2378}
CTX| [02:28:36] TEACHER: to connect to it tells the IP out of edge server it connects to that edge server right and all and   {#2379}
CTX| [02:28:41] TEACHER: it tries to balance it and it says that all the users of a particular organization should all part   {#2380}
CTX| [02:28:46] TEACHER: of the same edge server person right and this is how you are right so what i would recommend   {#2381}
CTX| [02:28:53] TEACHER: you all to do is understand what redis pubsub is in case you are unaware write a small hello   {#2382}
CTX| [02:28:59] TEACHER: world it just requires to spin up a small redis server locally three clients connected on three   {#2383}
CTX| [02:29:06] TEACHER: to that and see how it functions. Redis does not give you any persistence. It is real-time   {#2384}
CTX| [02:29:10] TEACHER: pumps up. So when you receive a message, whichever etc. etc. connect you to it at that moment will   {#2385}
CTX| [02:29:17] TEACHER: receive the message which means there is a chance of message to be lost and not sent in real-time.   {#2386}
CTX| [02:29:24] TEACHER: So which is where you may have some periodic refreshes happening in the background which   {#2387}
