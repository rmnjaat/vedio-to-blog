# chunk_11  OWNS 02:01:30 -> 02:14:14  (segments #1869-#2080, 2192 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:00:39] TEACHER: running on top of HTTP. Web socket is in parallel of HTTP. There are different specifications.   {#1860}
CTX| [02:00:46] TEACHER: So web sockets are persistent. They are bidirectional in nature. So the way the   {#1861}
CTX| [02:00:51] TEACHER: protocol is defined is that because the connection is kept open between the client and the server,   {#1862}
CTX| [02:00:56] TEACHER: the client can send the request to the server or the server can proactively send a message   {#1863}
CTX| [02:01:00] TEACHER: the client and it's not that like we typically see that client sends a request server sends a response   {#1864}
CTX| [02:01:05] TEACHER: here with websocket server can also productively send message to the client so for example it's   {#1865}
CTX| [02:01:12] TEACHER: brilliant to build chat applications because all the clients are connected to this server   {#1866}
CTX| [02:01:18] TEACHER: when a user sends a message comes to the server and server immediately sends it to another user   {#1867}
CTX| [02:01:24] TEACHER: because your client doesn't have to send to the server hey are there any new messages for me   {#1868}

---- OWNED SEGMENTS START ----
[02:01:30] TEACHER: literally pushing the message to the country hey here's the message for you from this particular   {#1869}
[02:01:35] TEACHER: business so this is why web sockets are very good because it helps you build rich product experiences   {#1870}
[02:01:41] TEACHER: you don't have to wait for a long time for you to receive a message when a user sends you the   {#1871}
[02:01:45] TEACHER: message you receive it immediately right this is the idea now it is possible because of the   {#1872}
[02:01:52] TEACHER: bi-directional channel that you have established between the two the persistent tcp connection   {#1873}
[02:01:56] TEACHER: between the two is the reason why you are you can build such experiences so as you can very clearly   {#1874}
[02:02:07] TEACHER: see because it's a persistent connection very expensive to manage very expensive next week   {#1875}
[02:02:13] TEACHER: uh sunday will go in depth of scaling web sockets how to use it how to scale it how to build real   {#1876}
[02:02:19] TEACHER: time slack communication right that but we'll talk we'll go in depth of scaling web sockets   {#1877}
[02:02:24] TEACHER: like how to do it, why to do it, why are we making those certain decisions?   {#1878}
[02:02:28] TEACHER: And like, again, like always building the intuition.   {#1879}
[02:02:32] TEACHER: Now here, the advantage is that given that the connection is already open between it,   {#1880}
[02:02:36] TEACHER: any to and fro that happens, it happens at a lightning fast speed   {#1881}
[02:02:40] TEACHER: because you don't have to reestablish the connection,   {#1882}
[02:02:43] TEACHER: which is why it is used for any real-time data transfer,   {#1883}
[02:02:47] TEACHER: which requires low communication over it.   {#1884}
[02:02:49] TEACHER: Like sending messages, stock market ticker, brilliant example.   {#1885}
[02:02:54] TEACHER: or grow any app that you use or robinhood any app that you use you open your stock market and you   {#1886}
[02:03:00] TEACHER: continuously see every second you see a tick right up something going up something going down in   {#1887}
[02:03:05] TEACHER: today's age everything is going down but you constantly get it you don't have to refresh   {#1888}
[02:03:09] TEACHER: every time to see what the current price is right they are proactively sending data to you   {#1889}
[02:03:14] TEACHER: so that's a good user experience right so it is used on those sort of things so real-time   {#1890}
[02:03:20] TEACHER: communication stock market because live experiences multiplayer games I'll give another example   {#1891}
[02:03:25] TEACHER: the zoom chat that we use zoom chat works on top of web sockets the messages that you send people   {#1892}
[02:03:33] TEACHER: who are connected on it immediately gets it everyone else misses out on that those messages   {#1893}
[02:03:37] TEACHER: right that's a live messages or that communication happening over a bidirectional channel that is   {#1894}
[02:03:42] TEACHER: established it is also using multiple games now web sockets might not be directly used   {#1895}
[02:03:50] TEACHER: a variant of it but you may have heard of MQTT which is kind of web socket equivalent so MQTT   {#1896}
[02:03:56] TEACHER: web socket HTTP they are specifications underlying it has to be either TCP or UDP even it is   {#1897}
[02:04:04] TEACHER: persistent it has to be TCP right this is where fundamentals come in that you have no other   {#1898}
[02:04:10] TEACHER: option you have no other protocol there you have to use TCP but now how lightweight you can make   {#1899}
[02:04:16] TEACHER: depends on either you are using WebSocket or MQTT or anything on top of it.   {#1900}
[02:04:22] TEACHER: So that are the specifications that you are using   {#1901}
[02:04:25] TEACHER: in order to build a system where client sends message in a particular format   {#1902}
[02:04:30] TEACHER: so that server understands in that particular format.   {#1903}
[02:04:33] TEACHER: Now, here the channel goes bi-directional.   {#1904}
[02:04:37] TEACHER: Now, what if it does not have to be bi-directional   {#1905}
[02:04:41] TEACHER: where let's say my client does not have to send anything to the server   {#1906}
[02:04:46] TEACHER: only sends data to the client for example stock market tickers you are not requesting every time   {#1907}
[02:04:53] TEACHER: array give me the latest data give me latest data your server is proactively sending it to you   {#1908}
[02:04:59] TEACHER: which means that you don't really have any stake in making a request to the server once you are   {#1909}
[02:05:07] TEACHER: connected server can just send data to you which is where you don't need a persistent bi-directional   {#1910}
[02:05:14] TEACHER: channel but a persistent unidirectional channel where your server can send data to the client   {#1911}
[02:05:22] TEACHER: your client is going to have to send anything to the server your client only first establishes   {#1912}
[02:05:26] TEACHER: the connection done and then your server is proactively sending data to the client and this   {#1913}
[02:05:32] TEACHER: is called as server sent events for some reason people call it server side events no it's server   {#1914}
[02:05:37] TEACHER: sent events so these are events that server proactively sent to the client your client   {#1915}
[02:05:44] TEACHER: anything the client cannot send anything to the server except to establish the connection   {#1916}
[02:05:48] TEACHER: your server is proactively sending data to the client right now where do you see it in action   {#1917}
[02:05:56] TEACHER: stock market trigger classic case you don't have anything to do there stock market updates are   {#1918}
[02:06:00] TEACHER: coming to you second very interesting one the deployment log streaming you might be using so   {#1919}
[02:06:06] TEACHER: many cicd tools and you see how quickly deployment logs come onto your web browsers right they are   {#1920}
[02:06:14] TEACHER: Good user experiences where you are streamed, the deployment logs are streamed to you.   {#1921}
[02:06:19] TEACHER: Like Slice, like Vercel, Netlify and whatnot.   {#1922}
[02:06:22] TEACHER: They leveraged this.   {#1923}
[02:06:23] TEACHER: They used to leverage it.   {#1924}
[02:06:24] TEACHER: Now they switched their model, but deployment logs in most, with rich user   {#1925}
[02:06:29] TEACHER: experience, you would see this in action where instead of doing a refresh, you see   {#1926}
[02:06:32] TEACHER: this log being streamed to you.   {#1927}
[02:06:36] TEACHER: This is also used to build remote terminals.   {#1928}
[02:06:39] TEACHER: Remote terminals where you have a connection between a server, a big process is   {#1929}
[02:06:45] TEACHER: get all the STD outs from that server.   {#1930}
[02:06:48] TEACHER: Server sent event from that server to your browser.   {#1931}
[02:06:51] TEACHER: That's where server sent events comes into the web.   {#1932}
[02:06:53] TEACHER: Server sent events and web sockets.   {#1933}
[02:06:55] TEACHER: They're all browser and device based.   {#1934}
[02:06:57] TEACHER: You cannot like server to server.   {#1935}
[02:06:59] TEACHER: People typically don't use it.   {#1936}
[02:07:00] TEACHER: You can, but you don't use it.   {#1937}
[02:07:02] TEACHER: Because they had an exceptional overhead.   {#1938}
[02:07:05] TEACHER: So this is where you can leverage server sent events.   {#1939}
[02:07:10] TEACHER: So it's very lightweight as compared to because web sockets are bi-directional.   {#1940}
[02:07:16] TEACHER: So it has that communication overhead, but when it's the communication overhead,   {#1941}
[02:07:22] TEACHER: server sent events are dead simple.   {#1942}
[02:07:24] TEACHER: Client comes, client subscribes, server sends the data, client accepts it.   {#1943}
[02:07:28] TEACHER: Everyone lives happily ever after.   {#1944}
[02:07:30] TEACHER: So it's very lightweight as compared to web software, but you lack bi-directional communication   {#1945}
[02:07:36] TEACHER: because this is just unidirectional.   {#1946}
[02:07:38] TEACHER: Your server is sending the data to the client.   {#1947}
[02:07:41] TEACHER: theoretical okay implement this it hardly takes you 14 lines of code mdn website mozilla's official   {#1948}
[02:07:51] TEACHER: documentation of web has a working example which consists of only 21 lines of code to build your   {#1949}
[02:07:59] TEACHER: own server sentiments write that every single thing is implementable implement web sockets   {#1950}
[02:08:05] TEACHER: with socket either. Do that because otherwise it's a theoretical jargon. Everyone can come and talk   {#1951}
[02:08:11] TEACHER: about it. When you implement, you realize how to actually use it. It's not that you have to   {#1952}
[02:08:17] TEACHER: implement it at scale. At least write hello world. At least write hello world of short polling,   {#1953}
[02:08:23] TEACHER: long polling, web socket, server sentiments. This way your understanding of communication layer will   {#1954}
[02:08:30] TEACHER: be really solid.   {#1955}
[02:08:32] TEACHER: Theoretically, everyone can draw boxes.   {#1956}
[02:08:35] TEACHER: My two-year-old daughter can draw boxes like this, but knowing those intricate details   {#1957}
[02:08:39] TEACHER: is what makes you a better engineer.   {#1958}
[02:08:42] TEACHER: Always, always, always focus on implementation side of things.   {#1959}
[02:08:45] TEACHER: Theoretically, everyone can do it.   {#1960}
[02:08:48] TEACHER: Okay.   {#1961}
[02:08:49] TEACHER: So now how do you add this?   {#1962}
[02:08:50] TEACHER: Now, in our communication block, in our medium block, now you see how different layers are   {#1963}
[02:08:58] TEACHER: talking to each other.   {#1964}
[02:09:01] TEACHER: user to API server.   {#1965}
[02:09:04] TEACHER: It's an HTTP, normal HTTP request response that we see.   {#1966}
[02:09:08] TEACHER: And then this is also TCP connection.   {#1967}
[02:09:11] TEACHER: From API server to database is a persistent TCP connection.   {#1968}
[02:09:14] TEACHER: This is not web socket.   {#1969}
[02:09:14] TEACHER: It's a persistent normal TCP connection that is established   {#1970}
[02:09:17] TEACHER: between your backend server and backend cloud.   {#1971}
[02:09:19] TEACHER: This has nothing to do with JavaScript.   {#1972}
[02:09:21] TEACHER: Then let's say you want to have real time likes.   {#1973}
[02:09:23] TEACHER: For example, on a medium blog, let's say two people are reading the same blog.   {#1974}
[02:09:27] TEACHER: When one person claps on it, a very nice animation is shown to other.   {#1975}
[02:09:33] TEACHER: This real time likes, if you would want to build it, that will happen over WebSocket   {#1976}
[02:09:36] TEACHER: because you don't want to refresh the page to see the likes made by other users.   {#1977}
[02:09:39] TEACHER: You want to show very nice animation.   {#1978}
[02:09:42] TEACHER: Other example of real time interactions is on Twitter,   {#1979}
[02:09:45] TEACHER: when a famous celebrity posts something and you scroll through it,   {#1980}
[02:09:48] TEACHER: you can see that like count changing on the fly.   {#1981}
[02:09:51] TEACHER: You don't have to refresh to see the updated like count.   {#1982}
[02:09:55] TEACHER: Then basic Instagram live interaction.   {#1983}
[02:09:57] TEACHER: your favorite celebrity goes live on instagram you can send hearts to that celebrity when you   {#1984}
[02:10:02] TEACHER: send hearts to that celebrity everyone else can see the heart that you send that is real-time   {#1985}
[02:10:08] TEACHER: interaction that is live interaction i was talking about and this all happens over website   {#1986}
[02:10:11] TEACHER: right so depending on what you are building how you are building what your use case is   {#1987}
[02:10:18] TEACHER: understand the trade-offs of every single thing so what you should definitely know   {#1988}
[02:10:24] TEACHER: short polling or normal   {#1989}
[02:10:26] TEACHER: HTTP request response, assuming that you know that.   {#1990}
[02:10:29] TEACHER: Write a short polling thing, write a long   {#1991}
[02:10:30] TEACHER: polling thing, write WebSocket using Socket.io,   {#1992}
[02:10:33] TEACHER: write server sentiments.   {#1993}
[02:10:34] TEACHER: Mozilla has a brilliant documentation.   {#1994}
[02:10:36] TEACHER: Just use that.   {#1995}
[02:10:38] TEACHER: And write one server sentiments. You can see   {#1996}
[02:10:40] TEACHER: the limitation of it, the strength of it, where you   {#1997}
[02:10:42] TEACHER: can use it, where you can leverage it,   {#1998}
[02:10:44] TEACHER: and discover things.   {#1999}
[02:10:46] TEACHER: So this is all about communication.   {#2000}
[02:10:49] STUDENT_5: Okay. Any questions   {#2001}
[02:10:50] STUDENT_5: on communication and skill?   {#2002}
[02:10:54] STUDENT_5: Sorry.   {#2003}
[02:10:55] STUDENT_7: Uh, is there any limit to the number of the sockets connections?   {#2004}
[02:10:59] STUDENT_7: I'm trying to relate it with the, uh, connect polling in HTTP.   {#2005}
[02:11:04] STUDENT_5: That's the same thing.   {#2006}
[02:11:05] STUDENT_5: The connection, the limitation is always physical limitation.   {#2007}
[02:11:08] TEACHER: They're just a Google search away from industry because at the end it's TCP.   {#2008}
[02:11:12] TEACHER: Right.   {#2009}
[02:11:13] TEACHER: When you're connecting on TCP, it's always connected on ports.   {#2010}
[02:11:16] TEACHER: The limitation that comes to a server, when you're establishing the TCP   {#2011}
[02:11:20] TEACHER: connections between the two servers, same comes when you're establishing the   {#2012}
[02:11:24] TEACHER: to the backend server.   {#2013}
[02:11:26] STUDENT_15: Okay.   {#2014}
[02:11:27] STUDENT_7: Let's say it.   {#2015}
[02:11:28] STUDENT_7: Just one question.   {#2016}
[02:11:29] STUDENT_7: So we discussed about long polling.   {#2017}
[02:11:32] STUDENT_7: So is there any limitation if I think in respect to blocking the connection object   {#2018}
[02:11:38] STUDENT_7: because it waits for the response from the server.   {#2019}
[02:11:42] STUDENT_7: So it holds up the connection object.   {#2020}
[02:11:43] STUDENT_7: So this is a disadvantage, right?   {#2021}
[02:11:46] TEACHER: Correct.   {#2022}
[02:11:46] TEACHER: That's a disadvantage that your connection is open until you get the response.   {#2023}
[02:11:51] STUDENT_7: So it is not scalable if we use long polling.   {#2024}
[02:11:54] TEACHER: It is scalable scale is not because then, because then this is   {#2025}
[02:11:58] TEACHER: like having near persistent connection because you don't get   {#2026}
[02:12:01] TEACHER: response unless there is one.   {#2027}
[02:12:03] TEACHER: It's exactly like web software.   {#2028}
[02:12:04] TEACHER: You are having persistent connection here.   {#2029}
[02:12:06] TEACHER: You are having long running connection.   {#2030}
[02:12:07] TEACHER: What's the difference?   {#2031}
[02:12:09] STUDENT_7: But I get a burst of request.   {#2032}
[02:12:11] STUDENT_7: Then those requests to be blocked.   {#2033}
[02:12:13] STUDENT_7: Tell my connection object is not released.   {#2034}
[02:12:15] TEACHER: So that's your, that's why you build it.   {#2035}
[02:12:18] TEACHER: Like you, that should add it yourself.   {#2036}
[02:12:20] TEACHER: You will not, can you cannot just replace short pulling   {#2037}
[02:12:22] TEACHER: with long pulling in every use case.   {#2038}
[02:12:24] TEACHER: Understand your use case well and see if it fits your needs.   {#2039}
[02:12:27] TEACHER: See if that's the kind of user experience you would want to build.   {#2040}
[02:12:30] TEACHER: And then you will, you will not always go for WebSocket because they are extremely expensive.   {#2041}
[02:12:35] TEACHER: You may not always go for short pulling because you might have very high surge of requests,   {#2042}
[02:12:38] TEACHER: but in some cases long pulling would work where you know that it's not really very long.   {#2043}
[02:12:42] TEACHER: You might get response may not be in five seconds, but 10 seconds.   {#2044}
[02:12:46] TEACHER: So that's long pulling for you.   {#2045}
[02:12:48] STUDENT_7: Okay.   {#2046}
[02:12:48] STUDENT_7: Okay.   {#2047}
[02:12:49] STUDENT_7: Got it.   {#2048}
[02:12:49] STUDENT_7: Thank you.   {#2049}
[02:12:51] TEACHER: Rahul.   {#2050}
[02:12:53] STUDENT_4: So my question is about the last architecture that you showed us about the like architecture.   {#2051}
[02:12:59] STUDENT_4: Can you all know that?   {#2052}
[02:13:01] STUDENT_4: Yeah.   {#2053}
[02:13:01] TEACHER: So we'll talk about this in detail next week.   {#2054}
[02:13:04] TEACHER: It's just a random box that I drew.   {#2055}
[02:13:05] TEACHER: Very random.   {#2056}
[02:13:07] TEACHER: Right.   {#2057}
[02:13:07] STUDENT_4: I was just, yeah, I was just saying we can use servers and events also here.   {#2058}
[02:13:13] TEACHER: Like no, because user would also like, right.   {#2059}
[02:13:16] TEACHER: A user can also.   {#2060}
[02:13:17] TEACHER: Yeah.   {#2061}
[02:13:17] STUDENT_4: So for that, I actually thought like we can basically, whenever user clicks the button, it sends a HTTP request.   {#2062}
[02:13:26] STUDENT_4: Okay.   {#2063}
[02:13:27] STUDENT_4: We can make it make on the UI side that the like is incremented on the local side.   {#2064}
[02:13:33] STUDENT_4: But when user clicks, the HTTP request gets sent to the API server.   {#2065}
[02:13:40] STUDENT_4: server and when it gets updated, it sends a server sent event off to the real time.   {#2066}
[02:13:47] STUDENT_4: Like you can do that.   {#2067}
[02:13:48] TEACHER: You can do that.   {#2068}
[02:13:49] TEACHER: We'll discuss it next week.   {#2069}
[02:13:50] TEACHER: There, where it would make more sense.   {#2070}
[02:13:51] TEACHER: When we talk about Slack's real time communication, we'll discuss all this architecture, all this   {#2071}
[02:13:55] TEACHER: patterns.   {#2072}
[02:13:56] STUDENT_7: Okay.   {#2073}
[02:13:57] STUDENT_7: Sure.   {#2074}
[02:13:58] TEACHER: Amrik.   {#2075}
[02:14:01] STUDENT_2: In the long pulling, we will be waiting for the server to send the response, right?   {#2076}
[02:14:06] STUDENT_2: Correct.   {#2077}
[02:14:06] STUDENT_2: But what if the server goes down?   {#2078}
[02:14:10] TEACHER: It's gone.   {#2079}
[02:14:10] TEACHER: The client has to re-send the request.   {#2080}
---- OWNED SEGMENTS END ----

CTX| [02:14:14] STUDENT_2: Okay.   {#2081}
CTX| [02:14:15] STUDENT_2: There can't be anything else.   {#2082}
CTX| [02:14:17] STUDENT_5: No, because TCP connection breaks, right?   {#2083}
CTX| [02:14:20] STUDENT_5: As a server went down.   {#2084}
CTX| [02:14:22] TEACHER: Okay.   {#2085}
CTX| [02:14:22] STUDENT_5: But acknowledge the request.   {#2086}
CTX| [02:14:26] TEACHER: Acknowledgement will be sent at that time only when the request is sent, but the response   {#2087}
CTX| [02:14:30] TEACHER: is specific.   {#2088}
CTX| [02:14:31] TEACHER: That's your use case.   {#2089}
CTX| [02:14:32] TEACHER: What you're building depends on that.   {#2090}
CTX| [02:14:33] TEACHER: Right?   {#2091}
CTX| [02:14:34] TEACHER: Let's say we are only fetching the next, if you're just fetching the life cricket score.   {#2092}
CTX| [02:14:40] TEACHER: bold, you would not get a response.   {#2093}
CTX| [02:14:41] TEACHER: Right.   {#2094}
CTX| [02:14:42] TEACHER: So if I didn't middle, if the, if the connection breaks, you send a request,   {#2095}
CTX| [02:14:45] TEACHER: I can get the latest commentary.   {#2096}
CTX| [02:14:46] TEACHER: You'll get the response.   {#2097}
CTX| [02:14:47] TEACHER: But the next one is gold.   {#2098}
CTX| [02:14:49] TEACHER: Okay.   {#2099}
CTX| [02:14:50] TEACHER: Right.   {#2100}
CTX| [02:14:51] TEACHER: But if you're talking about payments, that's a different problem.   {#2101}
CTX| [02:14:53] TEACHER: You're talking about e-commerce is a different problem.   {#2102}
CTX| [02:14:54] TEACHER: Right.   {#2103}
CTX| [02:14:55] TEACHER: So depending on what you are building, you can have this retriable or not.   {#2104}
CTX| [02:15:01] TEACHER: It depends on that.   {#2105}
CTX| [02:15:02] TEACHER: And so it's very use case specific.   {#2106}
CTX| [02:15:04] TEACHER: Think of a use case and then model it with long polling.   {#2107}
CTX| [02:15:06] TEACHER: So first write a hello world with long polling.   {#2108}
CTX| [02:15:10] TEACHER: pick a use case and implement it for that okay yeah hi so we talked about the web socket example   {#2109}
