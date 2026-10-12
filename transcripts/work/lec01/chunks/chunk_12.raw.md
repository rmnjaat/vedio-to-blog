# chunk_12  OWNS 02:14:14 -> 02:27:34  (segments #2081-#2310, 2322 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:13:16] TEACHER: A user can also.   {#2060}
CTX| [02:13:17] TEACHER: Yeah.   {#2061}
CTX| [02:13:17] STUDENT_4: So for that, I actually thought like we can basically, whenever user clicks the button, it sends a HTTP request.   {#2062}
CTX| [02:13:26] STUDENT_4: Okay.   {#2063}
CTX| [02:13:27] STUDENT_4: We can make it make on the UI side that the like is incremented on the local side.   {#2064}
CTX| [02:13:33] STUDENT_4: But when user clicks, the HTTP request gets sent to the API server.   {#2065}
CTX| [02:13:40] STUDENT_4: server and when it gets updated, it sends a server sent event off to the real time.   {#2066}
CTX| [02:13:47] STUDENT_4: Like you can do that.   {#2067}
CTX| [02:13:48] TEACHER: You can do that.   {#2068}
CTX| [02:13:49] TEACHER: We'll discuss it next week.   {#2069}
CTX| [02:13:50] TEACHER: There, where it would make more sense.   {#2070}
CTX| [02:13:51] TEACHER: When we talk about Slack's real time communication, we'll discuss all this architecture, all this   {#2071}
CTX| [02:13:55] TEACHER: patterns.   {#2072}
CTX| [02:13:56] STUDENT_7: Okay.   {#2073}
CTX| [02:13:57] STUDENT_7: Sure.   {#2074}
CTX| [02:13:58] TEACHER: Amrik.   {#2075}
CTX| [02:14:01] STUDENT_2: In the long pulling, we will be waiting for the server to send the response, right?   {#2076}
CTX| [02:14:06] STUDENT_2: Correct.   {#2077}
CTX| [02:14:06] STUDENT_2: But what if the server goes down?   {#2078}
CTX| [02:14:10] TEACHER: It's gone.   {#2079}
CTX| [02:14:10] TEACHER: The client has to re-send the request.   {#2080}

---- OWNED SEGMENTS START ----
[02:14:14] STUDENT_2: Okay.   {#2081}
[02:14:15] STUDENT_2: There can't be anything else.   {#2082}
[02:14:17] STUDENT_5: No, because TCP connection breaks, right?   {#2083}
[02:14:20] STUDENT_5: As a server went down.   {#2084}
[02:14:22] TEACHER: Okay.   {#2085}
[02:14:22] STUDENT_5: But acknowledge the request.   {#2086}
[02:14:26] TEACHER: Acknowledgement will be sent at that time only when the request is sent, but the response   {#2087}
[02:14:30] TEACHER: is specific.   {#2088}
[02:14:31] TEACHER: That's your use case.   {#2089}
[02:14:32] TEACHER: What you're building depends on that.   {#2090}
[02:14:33] TEACHER: Right?   {#2091}
[02:14:34] TEACHER: Let's say we are only fetching the next, if you're just fetching the life cricket score.   {#2092}
[02:14:40] TEACHER: bold, you would not get a response.   {#2093}
[02:14:41] TEACHER: Right.   {#2094}
[02:14:42] TEACHER: So if I didn't middle, if the, if the connection breaks, you send a request,   {#2095}
[02:14:45] TEACHER: I can get the latest commentary.   {#2096}
[02:14:46] TEACHER: You'll get the response.   {#2097}
[02:14:47] TEACHER: But the next one is gold.   {#2098}
[02:14:49] TEACHER: Okay.   {#2099}
[02:14:50] TEACHER: Right.   {#2100}
[02:14:51] TEACHER: But if you're talking about payments, that's a different problem.   {#2101}
[02:14:53] TEACHER: You're talking about e-commerce is a different problem.   {#2102}
[02:14:54] TEACHER: Right.   {#2103}
[02:14:55] TEACHER: So depending on what you are building, you can have this retriable or not.   {#2104}
[02:15:01] TEACHER: It depends on that.   {#2105}
[02:15:02] TEACHER: And so it's very use case specific.   {#2106}
[02:15:04] TEACHER: Think of a use case and then model it with long polling.   {#2107}
[02:15:06] TEACHER: So first write a hello world with long polling.   {#2108}
[02:15:10] TEACHER: pick a use case and implement it for that okay yeah hi so we talked about the web socket example   {#2109}
[02:15:21] STUDENT_4: in case of stock trading that tickers so for for any client those stickers will be sent only for   {#2110}
[02:15:31] STUDENT_4: the watch list script which a client has added so on the server side we are sending these   {#2111}
[02:15:37] STUDENT_4: updates to this client.   {#2112}
[02:15:40] STUDENT_4: So are we, how are we   {#2113}
[02:15:41] STUDENT_4: trying to, you know, send them all.   {#2114}
[02:15:44] TEACHER: It's not that huge of a data. How many   {#2115}
[02:15:45] TEACHER: markets, how many companies are listed? 10,000?   {#2116}
[02:15:48] TEACHER: One integer for each   {#2117}
[02:15:50] TEACHER: 10,000. 10,000 integers.   {#2118}
[02:15:52] TEACHER: One integer is 4 by 2. 10,000 into   {#2119}
[02:15:53] TEACHER: 4, 40,000.   {#2120}
[02:15:56] TEACHER: 40 KB every second.   {#2121}
[02:15:58] TEACHER: Nothing much. Right? Okay.   {#2122}
[02:15:59] STUDENT_4: Yeah, thanks. Right?   {#2123}
[02:16:01] TEACHER: So over complication, like I   {#2124}
[02:16:03] TEACHER: stay away from over complication. Like   {#2125}
[02:16:05] TEACHER: I like to build simple systems.   {#2126}
[02:16:07] TEACHER: why to do filtering on the server side send all the data let it be filtered on the client's   {#2127}
[02:16:14] TEACHER: right because that's not huge amount of data that you are transferring here and there   {#2128}
[02:16:18] STUDENT_4: you anyway have to do that right yeah thanks thanks everybody yeah i wish   {#2129}
[02:16:26] STUDENT_1: here uh so you can you can set up this ssc over a lb as well right so that that way your backup   {#2130}
[02:16:32] STUDENT_1: servers can be scaled yes okay okay and above   {#2131}
[02:16:41] STUDENT_3: um so i wanted to understand uh could we implement an push notifications using server   {#2132}
[02:16:48] STUDENT_3: site so send you and post notifications is very different push notifications are extremely   {#2133}
[02:16:53] TEACHER: different way to uh talk to this so the way it works is very different from either websocket or   {#2134}
[02:17:02] TEACHER: You can mimic a push notification.   {#2135}
[02:17:04] TEACHER: I'm using very strong words.   {#2136}
[02:17:06] TEACHER: You can mimic a push notification through server sentiments.   {#2137}
[02:17:09] TEACHER: But push notifications in itself are totally different.   {#2138}
[02:17:13] TEACHER: And so the Google Cloud Messaging or Apple push notifications or APNs,   {#2139}
[02:17:18] TEACHER: they work in a very different way than web sockets and server settings   {#2140}
[02:17:22] TEACHER: because they have to have different guarantees.   {#2141}
[02:17:25] TEACHER: This needs to have different guarantees.   {#2142}
[02:17:27] TEACHER: So this is under your control.   {#2143}
[02:17:29] TEACHER: That is typically not under your control.   {#2144}
[02:17:32] TEACHER: But you can still mimic push notifications by this,   {#2145}
[02:17:34] TEACHER: where you make a call periodically to check if there are any notifications.   {#2146}
[02:17:38] TEACHER: Then you mimic a push notification.   {#2147}
[02:17:40] TEACHER: Like from app itself, you create a push notification for yourself.   {#2148}
[02:17:43] TEACHER: For example, how your basically calendar app does.   {#2149}
[02:17:46] TEACHER: That if you have a meeting, even if you don't have internet,   {#2150}
[02:17:49] TEACHER: you still get a push notification.   {#2151}
[02:17:51] TEACHER: How?   {#2152}
[02:17:52] TEACHER: The reason for that is that your app itself is generating push notification   {#2153}
[02:17:56] TEACHER: for your app can do that.   {#2154}
[02:17:58] TEACHER: So it's mimicking the fact that you are getting a push notification, but internally, it's your   {#2155}
[02:18:04] TEACHER: app who has raised a push notification for itself, giving you a seamless user experience.   {#2156}
[02:18:10] TEACHER: So you can mimic, but you cannot implement.   {#2157}
[02:18:14] STUDENT_3: And the guarantee issues could arise because our server sent event could be lost in a network   {#2158}
[02:18:20] STUDENT_3: due to congestion or anything.   {#2159}
[02:18:22] TEACHER: Even push notification can get lost.   {#2160}
[02:18:24] TEACHER: but the protocol specification of a push notification is different from server sentiments   {#2161}
[02:18:30] TEACHER: that's the problem because cloud messaging works on different guarantees they have different   {#2162}
[02:18:37] TEACHER: specifications which is optimized for because push notifications can come to you anytime   {#2163}
[02:18:41] TEACHER: imagine having a persistent connection open one with gcm always very inefficient right so there   {#2164}
[02:18:48] TEACHER: has to be a more optimal way to do it that's why they need a different protocol to do it altogether   {#2165}
[02:18:54] TEACHER: work on very different.   {#2166}
[02:18:55] TEACHER: That's why GCM has different specifications than APMs.   {#2167}
[02:18:58] TEACHER: Hmm.   {#2168}
[02:19:00] STUDENT_3: That makes sense.   {#2169}
[02:19:01] STUDENT_3: Thank you.   {#2170}
[02:19:02] STUDENT_5: Yeah.   {#2171}
[02:19:03] STUDENT_5: Sandeep.   {#2172}
[02:19:04] STUDENT_5: By the way, just, just, just a basic, just a mention.   {#2173}
[02:19:07] STUDENT_5: How do I know this?   {#2174}
[02:19:09] TEACHER: I, it was like dreaded.   {#2175}
[02:19:12] TEACHER: I hated that one month when I was implementing push notifications using native.   {#2176}
[02:19:17] TEACHER: At that time I was, I'm talking back in 2015, just a fresher out of like, I just completed   {#2177}
[02:19:24] TEACHER: a joint tractor at that time and we were building a push notification service at that time   {#2178}
[02:19:29] TEACHER: services that like sns did not support good push notifications they had very very terrible uh   {#2179}
[02:19:36] TEACHER: delivery rates uh one signal had just started so we could not find any managed solution for   {#2180}
[02:19:42] TEACHER: push notification what do we do we integrated natively with gcm and apns and build that   {#2181}
[02:19:49] TEACHER: infrastructure to do it that's why i know how painfully hard it was to do it and that's why   {#2182}
[02:19:56] TEACHER: companies like one signal twilio and all of this they have abstracted it out so now for you it's   {#2183}
[02:20:01] TEACHER: just an api call and they take care of push notifications right but it was fun so in case   {#2184}
[02:20:06] TEACHER: you'd want anyone would want to explore on that just try integrating with gcm once natively and   {#2185}
[02:20:11] TEACHER: you would understand what specification how to send message how it gets it they have a brilliant   {#2186}
[02:20:16] TEACHER: documentation gcm uh gcm stands for google cloud messaging they have a brilliant documentation on   {#2187}
[02:20:23] TEACHER: what they are how they do it and how to integrate it's just one document it's a big one but you'll   {#2188}
[02:20:28] TEACHER: find it so try integrating it in your native app and see uh how beautiful and how ugly it can get   {#2189}
[02:20:36] STUDENT_6: both at the same time sandeep yeah so i just want to ask one question here so basically you have   {#2190}
[02:20:44] STUDENT_6: web sockets one protocol htp under the protocol but under the hood it's tcp connection one is a   {#2191}
[02:20:50] STUDENT_6: persistent the other one is not a persistent one no that is also persistent but you explicitly break   {#2192}
[02:20:54] STUDENT_6: it yeah you break it once you get the response correct correct so my question is between the   {#2193}
[02:21:00] STUDENT_6: application and the db that is also persistent tp that is also personal tcp connection yeah but   {#2194}
[02:21:06] STUDENT_6: what is a protocol that they use there they use some kind of web sockets there or no no no no   {#2195}
[02:21:11] TEACHER: No, for example, if you're connecting with my sequel,   {#2196}
[02:21:14] TEACHER: so my sequel has its own protocol as a TCP, but how does your server   {#2197}
[02:21:19] TEACHER: communicate a SQL query to the database?   {#2198}
[02:21:22] TEACHER: There has to be a way in which is okay.   {#2199}
[02:21:24] TEACHER: First bite is this next four bite is this next hundred   {#2200}
[02:21:26] TEACHER: bite is SQL query next five bites is this, right?   {#2201}
[02:21:30] TEACHER: That is a specification.   {#2202}
[02:21:32] TEACHER: So that is typically called as a dialect, my SQL dialect.   {#2203}
[02:21:36] TEACHER: So you might have heard this term.   {#2204}
[02:21:38] TEACHER: If you're using Golang, you would see you're putting SQL dialects.   {#2205}
[02:21:41] STUDENT_4: Yes.   {#2206}
[02:21:42] TEACHER: Your server uses a SQL dialect, which is compatible to the database.   {#2207}
[02:21:48] TEACHER: So my SQL has its own dialect.   {#2208}
[02:21:49] TEACHER: Postgres has its own dialect.   {#2209}
[02:21:50] TEACHER: MongoDB has its own dialect.   {#2210}
[02:21:52] TEACHER: At the end it's all TCP, but the way it sends the SQL query or any command that you are   {#2211}
[02:21:58] TEACHER: firing and your server understands it, it's very different.   {#2212}
[02:22:01] TEACHER: And it depends on the database that you're using, but under the hood, persistent TCP   {#2213}
[02:22:06] TEACHER: connection.   {#2214}
[02:22:06] TEACHER: and then the data that you're sending 1kb, 2kb data as a SQL query,   {#2215}
[02:22:11] TEACHER: the way you structure it is the specification.   {#2216}
[02:22:14] TEACHER: With HTTP messages, in third week, we'll go through HTTP specification   {#2217}
[02:22:21] TEACHER: to understand why you should not use it at a certain place.   {#2218}
[02:22:26] TEACHER: We'll go through that.   {#2219}
[02:22:27] TEACHER: We'll understand how that works.   {#2220}
[02:22:28] TEACHER: But in a gist, the way you are sending a SQL command to the server   {#2221}
[02:22:36] TEACHER: to understand that dialect that's what this specific like http is a format web socket is   {#2222}
[02:22:42] TEACHER: also format uh server sentiment has its own format right now those specifications are the one that   {#2223}
[02:22:49] TEACHER: that tells you how to bundle your message or your event and send it across so that both the devices   {#2224}
[02:22:56] STUDENT_6: can understand it yeah so basically uh even though it's a persistent tcp connection between the app   {#2225}
[02:23:01] STUDENT_6: server and the db but the the communication specification is very it depends on the db   {#2226}
[02:23:06] TEACHER: with which you're connecting to that which is correct so just say for example redis has   {#2227}
[02:23:11] TEACHER: resp which is its own specification so anyone who wants to talk to redis would have to send in   {#2228}
[02:23:17] TEACHER: messages in that specific format right my sql has its own postgres has its own web socket has its own   {#2229}
[02:23:22] TEACHER: http has its own okay cool thank you very much sir great any other question anyone   {#2230}
[02:23:32] TEACHER: across the session.   {#2231}
[02:23:34] TEACHER: By the way, this is all what I wanted to cover,   {#2232}
[02:23:36] TEACHER: all the six components.   {#2233}
[02:23:37] TEACHER: I'll share the pre-reads today for the next week.   {#2234}
[02:23:41] TEACHER: And by the way, before I take other questions,   {#2235}
[02:23:44] TEACHER: folks who would want to drop off,   {#2236}
[02:23:45] TEACHER: next week is all about databases.   {#2237}
[02:23:47] TEACHER: Saturday, we'll take a look at relational databases.   {#2238}
[02:23:50] TEACHER: Now we'll have brainstorming.   {#2239}
[02:23:51] TEACHER: Now we'll dive deep into implementation specifics.   {#2240}
[02:23:54] TEACHER: Saturday will be very interesting.   {#2241}
[02:23:55] TEACHER: I'll show you an actual demonstration of SQL transactions.   {#2242}
[02:24:01] TEACHER: blocking, concurrency, throughput, all of that, like live here.   {#2243}
[02:24:07] TEACHER: Like I literally run the code and show it to you and get the max out of our database.   {#2244}
[02:24:12] TEACHER: On Sunday, we will go through NoSQL databases,   {#2245}
[02:24:16] TEACHER: understand different types of databases for first one hour.   {#2246}
[02:24:19] TEACHER: And then one and a half hour to two hours,   {#2247}
[02:24:21] TEACHER: we'll have an extremely detailed discussion   {#2248}
[02:24:24] TEACHER: around building Slack's real-time communication.   {#2249}
[02:24:27] TEACHER: While we do that, we will not only build Slack's real-time communication, but also three different   {#2250}
[02:24:34] TEACHER: kinds of messaging apps along those lines.   {#2251}
[02:24:37] TEACHER: So you will see how the underlying architecture remains the same while all we change is the   {#2252}
[02:24:44] TEACHER: guarantees that our system provides.   {#2253}
[02:24:46] TEACHER: So we'll see that, we'll see those in action there.   {#2254}
[02:24:49] TEACHER: So that's the plan for next week, Saturday and Sunday.   {#2255}
[02:24:52] TEACHER: So I'll upload the video.   {#2256}
[02:24:53] TEACHER: I'll send an email, shoot an email.   {#2257}
[02:24:56] TEACHER: Please don't use Hotmail.   {#2258}
[02:24:57] TEACHER: Hotmail is crap.   {#2259}
[02:24:59] TEACHER: For somehow it just masks the login emails as spam.   {#2260}
[02:25:04] TEACHER: Everything else goes through for some reason.   {#2261}
[02:25:06] TEACHER: And they have shipped something recently because of which it is happening.   {#2262}
[02:25:08] TEACHER: If you have Gmail address, shoot me an email.   {#2263}
[02:25:11] TEACHER: I'll update your email to Gmail and remove that Hotmail from it.   {#2264}
[02:25:16] TEACHER: Earlier Gmail used to do it, but now Gmail is sorted.   {#2265}
[02:25:18] TEACHER: Hotmail is utter crap.   {#2266}
[02:25:20] TEACHER: So pick your battles.   {#2267}
[02:25:22] TEACHER: If you try to find file a complaint with them, why it is not working, it should work.   {#2268}
[02:25:26] TEACHER: if it is not working it's hot meals issue i cannot i'm not filtering anything out from my packet   {#2269}
[02:25:31] TEACHER: right so talk around those lines with the hotmail team razor uh raise a concern with it right okay   {#2270}
[02:25:38] TEACHER: so that's all i'm going to cover folks who want to drop a filter drop off i'll take some questions now   {#2271}
[02:25:43] STUDENT_1: yeah do you think go on uh so mostly the communication which we uh talked about yesterday   {#2272}
[02:25:50] STUDENT_1: today so basically we are focusing on the dcp only so uh i would really like to have a discussion   {#2273}
[02:25:58] STUDENT_1: on the udp side and too early too early wait for week four wait for week four after that you will   {#2274}
[02:26:04] TEACHER: have you may already have the answer for that but wait wait till week four right it will be too   {#2275}
[02:26:09] TEACHER: early a lot of people will get scared that's why i'm not going deep into it i've used udp twice so   {#2276}
[02:26:14] TEACHER: i know where it thrives where it does not so i'll i'll i'll give you an idea in case you don't have   {#2277}
[02:26:20] TEACHER: ask this question.   {#2278}
[02:26:22] TEACHER: It is that I'm avoiding to create that confusion.   {#2279}
[02:26:24] TEACHER: People would get overwhelmed by that.   {#2280}
[02:26:27] STUDENT_1: And also   {#2281}
[02:26:28] STUDENT_1: specifically, I'm intrigued about   {#2282}
[02:26:30] STUDENT_1: learning about the video streaming.   {#2283}
[02:26:33] STUDENT_1: Like how the video   {#2284}
[02:26:36] TEACHER: streams...   {#2285}
[02:26:36] TEACHER: Sixth week.   {#2286}
[02:26:39] TEACHER: I have it covered. It's there in the   {#2287}
[02:26:40] TEACHER: category. I have it covered. Don't worry about it.   {#2288}
[02:26:42] TEACHER: It's very easy. It's all CDN.   {#2289}
[02:26:44] TEACHER: It's all CDN. You don't have to worry about   {#2290}
[02:26:46] TEACHER: anything at all.   {#2291}
[02:26:48] TEACHER: I'll talk about how that happens.   {#2292}
[02:26:50] TEACHER: you pointers will not show you how to actually do it, but we'll give you pointers, which   {#2293}
[02:26:54] TEACHER: you can look up to and implement it on.   {#2294}
[02:26:57] STUDENT_5: It's not that difficult in our days.   {#2295}
[02:27:01] STUDENT_5: So yeah.   {#2296}
[02:27:03] STUDENT_6: Yeah.   {#2297}
[02:27:03] STUDENT_6: Uh, so you talked about, uh, Q versus stream, right?   {#2298}
[02:27:07] STUDENT_6: Like typically wait SNS fall into these two, whether it falls.   {#2299}
[02:27:11] TEACHER: SNS is totally different.   {#2300}
[02:27:13] STUDENT_6: Okay.   {#2301}
[02:27:13] TEACHER: SNS is totally SNS is neither a Q nor a stream.   {#2302}
[02:27:16] TEACHER: SQS is a Q.   {#2303}
[02:27:18] TEACHER: Kinesis is a stream, right?   {#2304}
[02:27:21] TEACHER: SNS is just a notification thing.   {#2305}
[02:27:23] TEACHER: You send a data, all ever who is subscribed to it.   {#2306}
[02:27:26] TEACHER: It just broadcast it to them.   {#2307}
[02:27:27] TEACHER: Simple.   {#2308}
[02:27:28] TEACHER: That's what SNS is all about.   {#2309}
[02:27:29] STUDENT_14: So can SNS has no persistence.   {#2310}
---- OWNED SEGMENTS END ----

CTX| [02:27:34] STUDENT_6: So can SNS and SQS be combined and be considered?   {#2311}
CTX| [02:27:38] TEACHER: You can, you can, you can mimic Kafka with SNS plus SQS.   {#2312}
CTX| [02:27:41] STUDENT_6: Okay.   {#2313}
CTX| [02:27:42] TEACHER: But there is a limitation for that.   {#2314}
CTX| [02:27:45] TEACHER: When you implement, you would realize that historical,   {#2315}
CTX| [02:27:47] TEACHER: because you don't have historical messages in Kafka,   {#2316}
CTX| [02:27:49] TEACHER: you can have historical messages.   {#2317}
CTX| [02:27:51] TEACHER: So you can go through old messages also with SNS and SQS.   {#2318}
CTX| [02:27:54] TEACHER: You cannot have.   {#2319}
CTX| [02:27:55] STUDENT_6: Okay.   {#2320}
CTX| [02:27:57] STUDENT_6: Okay.   {#2321}
CTX| [02:27:58] STUDENT_6: Got it.   {#2322}
CTX| [02:27:58] STUDENT_6: And I have one question related to caching as well.   {#2323}
CTX| [02:28:01] STUDENT_6: So one of the places where you can implement caching is at load balancer,   {#2324}
CTX| [02:28:05] STUDENT_6: API gateway.   {#2325}
CTX| [02:28:08] STUDENT_6: So typically you'll have to re invalidate the cache as well.   {#2326}
CTX| [02:28:13] STUDENT_6: So how do you invalidate that layer?   {#2327}
CTX| [02:28:17] STUDENT_6: So if you don't, I mean, yeah, I guess.   {#2328}
CTX| [02:28:21] TEACHER: Load balancer does not give you any API code O8 FII, right?   {#2329}
CTX| [02:28:24] TEACHER: So the only way to invalidate it is time-based.   {#2330}
CTX| [02:28:27] TEACHER: That's the only thing.   {#2331}
CTX| [02:28:28] TEACHER: So when you're caching something at load balancer,   {#2332}
CTX| [02:28:30] TEACHER: you need to be aware that for a certain amount of time,   {#2333}
CTX| [02:28:32] TEACHER: it will be cached.   {#2334}
