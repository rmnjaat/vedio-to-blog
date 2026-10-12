# chunk_11  OWNS 02:04:42 -> 02:17:20  (segments #1987-#2193, 2032 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:03:43] TEACHER: there's a much bigger overhead much bigger enemy staring it's like literally there is a dinosaur   {#1970}
CTX| [02:03:48] TEACHER: behind you which is staring at you but you are just worried about a small mice yeah i'm not able   {#1971}
CTX| [02:03:54] TEACHER: to think of it that's fine that's fine that's why i'm here right i'm just i'm just proving you folks   {#1972}
CTX| [02:03:59] TEACHER: to think on those like see what overhead would come how would you make it better i'm just picking   {#1973}
CTX| [02:04:04] TEACHER: people who have not spoken much uh harsh gone just trying to be fair to everyone yeah so i think   {#1974}
CTX| [02:04:12] STUDENT_9: I'm not sure what this communication looks like more synchronous communication and we   {#1975}
CTX| [02:04:17] STUDENT_9: should have some asynchronous mechanism here.   {#1976}
CTX| [02:04:21] TEACHER: Okay.   {#1977}
CTX| [02:04:22] TEACHER: First let's talk about what's the overhead that you are solving.   {#1978}
CTX| [02:04:24] TEACHER: Like what is the problem that you're solving with that asynchronous thing?   {#1979}
CTX| [02:04:29] STUDENT_9: If any server is down whenever it is available.   {#1980}
CTX| [02:04:32] STUDENT_9: That's not a problem.   {#1981}
CTX| [02:04:33] TEACHER: You're talking overhead.   {#1982}
CTX| [02:04:34] TEACHER: What's the overhead?   {#1983}
CTX| [02:04:35] TEACHER: Down is basically fault tolerance.   {#1984}
CTX| [02:04:37] TEACHER: Right.   {#1985}
CTX| [02:04:38] TEACHER: What's the overhead?   {#1986}

---- OWNED SEGMENTS START ----
[02:04:42] TEACHER: And why is it even a problem?   {#1987}
[02:04:45] TEACHER: We first need to understand that, like before jumping into the solution, we have not even   {#1988}
[02:04:49] TEACHER: covered the problem yet.   {#1989}
[02:04:51] TEACHER: There is a massive overhead.   {#1990}
[02:04:52] TEACHER: Like three people have used the term overhead, but no one explained what the actual overhead   {#1991}
[02:04:57] TEACHER: is.   {#1992}
[02:04:58] TEACHER: Like, why is that even a problem problem?   {#1993}
[02:05:02] TEACHER: Right.   {#1994}
[02:05:03] TEACHER: Amrit.   {#1995}
[02:05:05] STUDENT_12: Hey, yeah.   {#1996}
[02:05:06] STUDENT_12: Could server discovery here be the overhead when we're horizontally scaling website?   {#1997}
[02:05:12] TEACHER: No, that's a different problem.   {#1998}
[02:05:14] TEACHER: But that's still not an overhead overhead.   {#1999}
[02:05:16] TEACHER: It's staring right at our face, the overhead.   {#2000}
[02:05:21] TEACHER: It's right there in the diagram.   {#2001}
[02:05:26] TEACHER: Hey, man.   {#2002}
[02:05:28] TEACHER: Yeah.   {#2003}
[02:05:29] STUDENT_1: So, like, when you want to horizontally scale,   {#2004}
[02:05:34] STUDENT_1: like, you'll be creating one connection for every AWS server, right?   {#2005}
[02:05:37] STUDENT_1: Correct.   {#2006}
[02:05:38] STUDENT_1: So, that limits it at some point.   {#2007}
[02:05:40] STUDENT_11: Why?   {#2008}
[02:05:42] STUDENT_1: Because you can't have like infinite connections from one server.   {#2009}
[02:05:46] TEACHER: No, but I can still have a good amount.   {#2010}
[02:05:49] TEACHER: Let's a million connection.   {#2011}
[02:05:50] TEACHER: What's the problem?   {#2012}
[02:05:51] TEACHER: Or anyway, I would not have more than 10,000 servers.   {#2013}
[02:05:53] TEACHER: I can create 10,000 connections with ease.   {#2014}
[02:05:55] TEACHER: What's the problem?   {#2015}
[02:05:58] STUDENT_1: Okay.   {#2016}
[02:05:59] STUDENT_1: I can't see anything else.   {#2017}
[02:06:00] STUDENT_1: That's all.   {#2018}
[02:06:01] TEACHER: I heard you, you, you are the closest.   {#2019}
[02:06:04] TEACHER: Okay.   {#2020}
[02:06:05] TEACHER: Okay.   {#2021}
[02:06:06] TEACHER: Uh, Vikram.   {#2022}
[02:06:07] STUDENT_3: Yeah.   {#2023}
[02:06:08] STUDENT_3: Uh, so, uh, so there's a three-way.   {#2024}
[02:06:12] STUDENT_3: handshake for every for every message that we send to another website no no no they're just once   {#2025}
[02:06:18] TEACHER: once once the tcp connection is established you don't you just relay the message over it   {#2026}
[02:06:22] TEACHER: that's not over it right that's why we are having this tcp connection right you just have to send   {#2027}
[02:06:27] TEACHER: a message over it you don't have to reestablish it again and again for every message okay let me let   {#2028}
[02:06:32] TEACHER: me talk about it okay look at your books third the problem is the web socket connection the web   {#2029}
[02:06:38] TEACHER: Socket servers that we have that WebSocket servers have to basically support the WebSocket   {#2030}
[02:06:45] TEACHER: connections.   {#2031}
[02:06:46] TEACHER: But now here, let's say here my server limit, let's say my server limit was four connections   {#2032}
[02:06:54] TEACHER: that we talked about at first.   {#2033}
[02:06:55] TEACHER: Now, obviously every server has a limited number of ports on which it can accept the   {#2034}
[02:07:01] TEACHER: connections.   {#2035}
[02:07:01] TEACHER: Now here, if you are, because with this architecture, every web socket server has to connect to every other web socket server.   {#2036}
[02:07:13] TEACHER: Now what is happening is there is a lot of persistent TCP connections of that server being hogged just to maintain connections with other TCP servers problem.   {#2037}
[02:07:25] TEACHER: You are not leveraging all the like you are literally if here I'm having four people connected   {#2038}
[02:07:33] TEACHER: to this server and I'm having three TCP connections connected to this.   {#2039}
[02:07:37] TEACHER: I'm having seven connections out of which three are just for inter-server communication.   {#2040}
[02:07:43] TEACHER: Your job is to serve users, but here because of this mesh architecture, what is happening   {#2041}
[02:07:50] TEACHER: I guess you are wasting a lot of TCP connections to just talk to, to just talk among the servers.   {#2042}
[02:07:56] TEACHER: That's the problem.   {#2043}
[02:07:58] TEACHER: So how do you make it better?   {#2044}
[02:07:59] TEACHER: A way to make it better is to not have these many TCP connections here, but instead put a pub sub.   {#2045}
[02:08:09] TEACHER: It's a real time pub sub, not Kafka.   {#2046}
[02:08:12] TEACHER: Kafka would slow it down.   {#2047}
[02:08:13] TEACHER: It's a real time pub sub like Redis.   {#2048}
[02:08:16] TEACHER: So what every server does it creates one connection with this.   {#2049}
[02:08:22] TEACHER: So now your TCP connection overhead for inter-server communication is reduced to just one.   {#2050}
[02:08:30] TEACHER: So four connections for ABCD and one connection with this real-time pubsub.   {#2051}
[02:08:36] TEACHER: So what is real-time pubsub?   {#2052}
[02:08:38] TEACHER: Let me talk about that.   {#2053}
[02:08:41] TEACHER: So real time pops up is very simple where what it tells is that send this message to   {#2054}
[02:08:48] TEACHER: everyone who is subscribed to it right now.   {#2055}
[02:08:51] TEACHER: It gives you zero persistence zero, which means that if I have a message to send, what   {#2056}
[02:08:58] TEACHER: would happen is blunt case when a sends a message to channel one, what it would do is   {#2057}
[02:09:06] TEACHER: to slack channel one the message would come over here it would check slack channel one bcd is   {#2058}
[02:09:11] TEACHER: connected so bcd gets a message and then it sends message to this real-time pub sub the message is   {#2059}
[02:09:17] TEACHER: pushed to this real-time pub sub and this real-time pub sub pushes the message to everyone who has   {#2060}
[02:09:22] TEACHER: subscribed to it everyone who is subscribed to it literally so and at that moment it does not   {#2061}
[02:09:28] TEACHER: store this message it's not kafka it's not storing the message it's literally sending the message to   {#2062}
[02:09:36] TEACHER: to it.   {#2063}
[02:09:37] TEACHER: Right.   {#2064}
[02:09:37] TEACHER: So message comes over here, it's sent to WS2, WS3, WS4 right there and then in case a server   {#2065}
[02:09:42] TEACHER: wasn't connected, it would not receive this message.   {#2066}
[02:09:46] TEACHER: Simple.   {#2067}
[02:09:47] TEACHER: If the server wasn't connected, it would not receive the message.   {#2068}
[02:09:49] TEACHER: So it's a real time pubsup.   {#2069}
[02:09:51] TEACHER: It does not guarantee delivery.   {#2070}
[02:09:53] TEACHER: What it guarantees is people who are connected at this moment to me, I'll just send a message   {#2071}
[02:09:58] TEACHER: to all of them.   {#2072}
[02:09:59] TEACHER: Simple.   {#2073}
[02:10:00] TEACHER: Right.   {#2074}
[02:10:01] TEACHER: Okay.   {#2075}
[02:10:01] TEACHER: So this is real time Pubser and one great example, what tool that is great example for   {#2076}
[02:10:06] TEACHER: that is Redis.   {#2077}
[02:10:08] TEACHER: Right.   {#2078}
[02:10:09] TEACHER: Okay.   {#2079}
[02:10:09] TEACHER: Now here there is a conflicting term channel.   {#2080}
[02:10:13] TEACHER: Redis has channels, Slack has channels.   {#2081}
[02:10:17] TEACHER: So I'll be explicit in saying Slack channels and Redis channels.   {#2082}
[02:10:20] TEACHER: Right.   {#2083}
[02:10:21] TEACHER: So now here you'd say that, Hey, why are we broadcasting message?   {#2084}
[02:10:26] TEACHER: This message.   {#2085}
[02:10:26] TEACHER: Now let's say I have E and F connected to these server both.   {#2086}
[02:10:39] TEACHER: WS2 now here you can say that when a sends a message to channel one, why should this channel,   {#2087}
[02:10:46] TEACHER: this message be sent to WS3 and WS4? It should not. It just sent to WS2 because only WS2 has people   {#2088}
[02:10:52] TEACHER: who are part of this channel.   {#2089}
[02:10:55] TEACHER: No one else has it.   {#2090}
[02:10:56] TEACHER: Right?   {#2091}
[02:10:56] TEACHER: So which is where on Redis PubSub side,   {#2092}
[02:11:00] TEACHER: there is also called as Redis channel,   {#2093}
[02:11:01] TEACHER: which are called PubSub channel.   {#2094}
[02:11:02] TEACHER: They're also called channels.   {#2095}
[02:11:03] TEACHER: Conflicted terminology.   {#2096}
[02:11:04] TEACHER: I can't help because very few words we have.   {#2097}
[02:11:07] TEACHER: We can't do much there.   {#2098}
[02:11:08] TEACHER: So these channels, Redis channels,   {#2099}
[02:11:11] TEACHER: in Redis what you can do is,   {#2100}
[02:11:13] TEACHER: Redis PubSub is the one that you can Google about.   {#2101}
[02:11:16] TEACHER: The idea for that is when a connection is established,   {#2102}
[02:11:20] TEACHER: when a Redis connection is established by a server,   {#2103}
[02:11:22] TEACHER: So when my WebSocket server spins up, it establishes the connection with this Redis PubSub backbone.   {#2104}
[02:11:30] TEACHER: And what it says is subscribe me to something.   {#2105}
[02:11:34] TEACHER: So when A connects to it, when A connects to WebSocket server 1, it says that hey, I am part of channel 1.   {#2106}
[02:11:44] TEACHER: it tells redis like websocket server 1 calls the redis function or calls the redis command   {#2107}
[02:11:50] TEACHER: and says that subscribe me subscribe me to channel 1 right when b connects it also fires   {#2108}
[02:12:02] TEACHER: it b connects it tells its membership to ws1 ws1 talks to redis and says subscribe me subscribe   {#2109}
[02:12:09] TEACHER: me as in the server not be the server the server here is subscribing to this not the user user is   {#2110}
[02:12:17] TEACHER: having web socket connection with the server server is having one redis connection one tcp   {#2111}
[02:12:21] TEACHER: connection with redis on redis popsob it can you can tell that subscribe me for something   {#2112}
[02:12:25] TEACHER: so whenever a user connects to web socket server it tells its membership web socket server   {#2113}
[02:12:32] TEACHER: fires a command and subscribe itself for those updates so now here what would happen is   {#2114}
[02:12:39] TEACHER: WS we use a different color.   {#2115}
[02:12:42] TEACHER: So WS1 is subscribed to channel C1 because A would tell that I am a part of channel C1   {#2116}
[02:12:53] TEACHER: redis 8 would fire a command WS1 would fire a command and subscribe me for channel C1.   {#2117}
[02:12:57] TEACHER: Similarly BK late would fire subscribe to channel C1, subscribe channel C1, D subscribe   {#2118}
[02:13:01] TEACHER: channel C1.   {#2119}
[02:13:02] TEACHER: Right.   {#2120}
[02:13:03] TEACHER: So WS1 is subscribed to one channel, which is C1.   {#2121}
[02:13:06] TEACHER: Similarly, WS2 is also subscribed to channel C1.   {#2122}
[02:13:13] TEACHER: Let's say there are users G and H which are part of channel C2.   {#2123}
[02:13:23] TEACHER: Slack channel C2.   {#2124}
[02:13:24] TEACHER: So now here what would happen is when I send a message over here from A, it gets sent to   {#2125}
[02:13:33] TEACHER: over here ws1 it's then sent to b c and d because channel word message was sent for channel one   {#2126}
[02:13:39] TEACHER: it is sent over here to this redis pub sub for channel one who is subscribed to channel one   {#2127}
[02:13:46] TEACHER: web socket server two is subscribed to channel one so the message is sent to web socket server two   {#2128}
[02:13:54] TEACHER: over this it's literally pushed web socket server is not pulling the message web socket server is   {#2129}
[02:13:58] TEACHER: pushing the message to WebSocket server 2. WebSocket server 2 receives it and it sees that   {#2130}
[02:14:04] TEACHER: which all users are connected for channel 2. It says E and F that sends message to E and F.   {#2131}
[02:14:10] TEACHER: This way with minimal overhead of TCP connections we get communication done between multiple WebSocket   {#2132}
[02:14:20] TEACHER: servers. Now here it would seem daunting. Oh my god you will require so many servers in so many   {#2133}
[02:14:28] TEACHER: the problem down to just four connections over here right now because of it it is seemingly far   {#2134}
[02:14:34] TEACHER: too much and you would also say there is one redis pub sub and now what would happen have a cluster   {#2135}
[02:14:39] TEACHER: of it not a problem right have a cluster of it sharded do intelligent balancing and whatnot to   {#2136}
[02:14:45] TEACHER: sort it out so what you typically do is you try to put all the users part of the same set of channels   {#2137}
[02:14:55] TEACHER: to same WebSocket servers.   {#2138}
[02:14:57] TEACHER: So which is where first step,   {#2139}
[02:15:00] TEACHER: the first ever step when a user logged in,   {#2140}
[02:15:04] TEACHER: when a user opened the Slack app,   {#2141}
[02:15:06] TEACHER: we said it established the WebSocket connection   {#2142}
[02:15:08] TEACHER: with WebSocket server one.   {#2143}
[02:15:10] TEACHER: How did it do it?   {#2144}
[02:15:11] TEACHER: How did A get the IP address of WebSocket server one?   {#2145}
[02:15:15] TEACHER: Which is where you have a layer sitting in between,   {#2146}
[02:15:20] TEACHER: not between, but rather sitting at the top   {#2147}
[02:15:22] TEACHER: where when a user comes in,   {#2148}
[02:15:25] TEACHER: A talks to it and asks,   {#2149}
[02:15:26] TEACHER: hey, where do I connect to?   {#2150}
[02:15:28] TEACHER: It tells the IP address   {#2151}
[02:15:29] TEACHER: and then A connects to that server.   {#2152}
[02:15:32] TEACHER: This is like DNS,   {#2153}
[02:15:34] TEACHER: not DNS, like DNS.   {#2154}
[02:15:36] TEACHER: This is like DNS, not DNS.   {#2155}
[02:15:38] TEACHER: It's a normal service   {#2156}
[02:15:39] TEACHER: whose job is to balance the connections.   {#2157}
[02:15:42] TEACHER: Or rather balance the connections.   {#2158}
[02:15:45] TEACHER: When I say balance the connections,   {#2159}
[02:15:46] TEACHER: it means it tells you where to connect to.   {#2160}
[02:15:49] TEACHER: So when A comes up,   {#2161}
[02:15:52] TEACHER: this and says, Hey, I am a, I am part of this org.   {#2162}
[02:15:55] TEACHER: Which server should I connect to?   {#2163}
[02:15:57] TEACHER: So for example, naively, naively assume that you have one   {#2164}
[02:16:01] TEACHER: web socket server for one organization.   {#2165}
[02:16:04] TEACHER: All the users of the, how many employees would you have?   {#2166}
[02:16:06] TEACHER: Like 200 employees pay, so you get a million dollar or you   {#2167}
[02:16:09] TEACHER: get a billion dollar value, 200, 500, 10,000 employees, 20,000   {#2168}
[02:16:13] TEACHER: employees, they are nothing for a web socket server.   {#2169}
[02:16:15] TEACHER: Correct.   {#2170}
[02:16:15] TEACHER: So what if you have one web socket server for each organization in Slack,   {#2171}
[02:16:20] TEACHER: all the users of that you'd say, Hey, I'm part of.   {#2172}
[02:16:22] TEACHER: organization which server should I connect to.   {#2173}
[02:16:25] TEACHER: It gives you IP address of this.   {#2174}
[02:16:26] TEACHER: All the users of a particular organization can connect to this one WebSocket server.   {#2175}
[02:16:29] TEACHER: Now there is no need of sending this message to Redis at all.   {#2176}
[02:16:32] TEACHER: They just do it intermittently like within themselves they can send a message.   {#2177}
[02:16:37] TEACHER: Right.   {#2178}
[02:16:37] TEACHER: So it reduces the overhead.   {#2179}
[02:16:39] TEACHER: So what the job of this service would be to spit out the WebSocket server to connect to   {#2180}
[02:16:45] TEACHER: such that it reduces the balancing, it reduces the load on this.   {#2181}
[02:16:50] TEACHER: the number of messages that needs to be sent through this, it reduces that.   {#2182}
[02:16:55] TEACHER: This is what this service needs to handle.   {#2183}
[02:16:58] TEACHER: So when a user logs on to Slack or starts the Slack app,   {#2184}
[02:17:02] TEACHER: it connects to this,   {#2185}
[02:17:04] TEACHER: asks for an IP address of a WebSocket server to connect to,   {#2186}
[02:17:06] TEACHER: it spits out an IP address, the user connects to that IP address,   {#2187}
[02:17:09] TEACHER: and so on and so forth.   {#2188}
[02:17:11] TEACHER: Now, problem.   {#2189}
[02:17:12] TEACHER: What if this server goes down?   {#2190}
[02:17:14] TEACHER: Oh my God, life ended.   {#2191}
[02:17:15] TEACHER: No, no, no, nothing would happen.   {#2192}
[02:17:17] TEACHER: When this server goes down,   {#2193}
---- OWNED SEGMENTS END ----

CTX| [02:17:20] TEACHER: server ended they would again talk to this service and find another IP address to connect to now it's   {#2194}
CTX| [02:17:25] TEACHER: the responsibility of this service to see that oh oh my god this server is down let me move all of   {#2195}
CTX| [02:17:29] TEACHER: them to this server so now when these users try to reconnect they would get IP address of this so   {#2196}
CTX| [02:17:35] TEACHER: now all the users will connect to this simple right in worst case for some time they would have to   {#2197}
CTX| [02:17:41] TEACHER: just move messages here and there through this redisk that's perfectly fine and periodically   {#2198}
CTX| [02:17:47] TEACHER: it might do balancing of load across web servers also that intermittently kill one and so that   {#2199}
CTX| [02:17:53] TEACHER: every traffic of a particular user is moved to other server to minimize the IO that happens   {#2200}
CTX| [02:17:59] TEACHER: over Redis.   {#2201}
CTX| [02:18:01] TEACHER: Right.   {#2202}
CTX| [02:18:02] TEACHER: But now here you very beautifully see how web sockets are scaled without having any   {#2203}
CTX| [02:18:08] TEACHER: hiccups.   {#2204}
CTX| [02:18:09] TEACHER: You can very easily scale web sockets.   {#2205}
CTX| [02:18:12] TEACHER: You reduce the overhead of maintaining additional TCP connections by introducing a real-time   {#2206}
CTX| [02:18:18] TEACHER: pubsub.   {#2207}
CTX| [02:18:18] TEACHER: This is not Kafka, this is a real-time pubsub like Redis.   {#2208}
