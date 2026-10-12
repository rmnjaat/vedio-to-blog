# chunk_06  OWNS 00:59:38 -> 01:10:42  (segments #934-#1133, 1880 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:58:39] STUDENT_4: Thanks Rahul for adding that.   {#911}
CTX| [00:58:41] STUDENT_4: Arpeth, in that case, in DynamoDB also, we can use a stream and Lambda for that.   {#912}
CTX| [00:58:47] STUDENT_4: Shalimda, please don't barge in.   {#913}
CTX| [00:58:49] STUDENT_4: Please, please.   {#914}
CTX| [00:58:50] TEACHER: Yeah, we can do that.   {#915}
CTX| [00:58:52] TEACHER: We can do that.   {#916}
CTX| [00:58:55] TEACHER: database in the world is evolving, they have a bunch of features.   {#917}
CTX| [00:58:58] TEACHER: Bunch of features.   {#918}
CTX| [00:58:59] TEACHER: So we just have to keep track of it.   {#919}
CTX| [00:59:01] TEACHER: Okay.   {#920}
CTX| [00:59:01] TEACHER: If we need that or not.   {#921}
CTX| [00:59:03] TEACHER: And when you talk about DynamoDB streams, Redis also gives you CDCs out of that.   {#922}
CTX| [00:59:07] TEACHER: Right.   {#923}
CTX| [00:59:08] TEACHER: Every database gives you everything.   {#924}
CTX| [00:59:10] TEACHER: World is converging really fast.   {#925}
CTX| [00:59:13] TEACHER: MongoDB supports ACID, SQL support sharding now, everything's happening.   {#926}
CTX| [00:59:18] TEACHER: Right.   {#927}
CTX| [00:59:19] TEACHER: So we just have to be open to every single thing.   {#928}
CTX| [00:59:22] STUDENT_1: So before you make decisions, go in depth of every single candidates that you have and   {#929}
CTX| [00:59:27] TEACHER: understand the pros and cons, depending on what suits you the best, you make that decision.   {#930}
CTX| [00:59:32] TEACHER: Okay.   {#931}
CTX| [00:59:33] TEACHER: I'll take one more.   {#932}
CTX| [00:59:35] TEACHER: Yes.   {#933}

---- OWNED SEGMENTS START ----
[00:59:38] TEACHER: So online often indication is something which is time sensitive.   {#934}
[00:59:43] TEACHER: And if I want it in the real time, I would choose Redis.   {#935}
[00:59:46] TEACHER: So let's say if there are 500 million users who are active and I want to query, then of   {#936}
[00:59:55] TEACHER: course, between Redis and Dynamo Redis will be faster.   {#937}
[00:59:59] TEACHER: Yeah.   {#938}
[01:00:00] TEACHER: But why would it be faster?   {#939}
[01:00:02] TEACHER: Is it only because it's in memory?   {#940}
[01:00:06] TEACHER: Yeah, in memory and even the performance Redis is better.   {#941}
[01:00:14] TEACHER: Not really.   {#942}
[01:00:15] TEACHER: What you would get more out of this for time sensitivity is the persistent   {#943}
[01:00:18] TEACHER: connections that you can hold with DynamoDB.   {#944}
[01:00:21] TEACHER: You cannot create persistent relations.   {#945}
[01:00:23] TEACHER: It's stateless.   {#946}
[01:00:24] TEACHER: Okay.   {#947}
[01:00:24] TEACHER: With Redis, you create persistent connections, which is what would give you   {#948}
[01:00:28] TEACHER: that extreme low latency that you require.   {#949}
[01:00:30] TEACHER: It obviously comes with a cost, but you get that.   {#950}
[01:00:33] TEACHER: That's how you get this time sensitivity.   {#951}
[01:00:35] TEACHER: Right.   {#952}
[01:00:36] TEACHER: It does that.   {#953}
[01:00:36] TEACHER: See, everyone might not be aware of all the features, right?   {#954}
[01:00:40] TEACHER: have to be extremely open.   {#955}
[01:00:42] TEACHER: Okay, what are things that you would need   {#956}
[01:00:44] TEACHER: and how to do it, right?   {#957}
[01:00:46] TEACHER: And that turns, like Redis has Spongebob,   {#958}
[01:00:48] TEACHER: DynamoDB has its own set of features.   {#959}
[01:00:50] TEACHER: You pick database.   {#960}
[01:00:52] TEACHER: Now there is ArrowDB, ArrowSpike.   {#961}
[01:00:54] TEACHER: ArrowSpike is there.   {#962}
[01:00:54] TEACHER: ArrowSpike is proprietary.   {#963}
[01:00:56] TEACHER: It has its own bunch of features, right?   {#964}
[01:00:57] TEACHER: So just being open to things around us   {#965}
[01:01:00] TEACHER: and diving deep into each one of them.   {#966}
[01:01:03] TEACHER: Basically, database is the most critical,   {#967}
[01:01:07] TEACHER: most brittle component of your infrastructure.   {#968}
[01:01:10] TEACHER: really well, right?   {#969}
[01:01:12] TEACHER: Which, what features they offer, how they, how you do it,   {#970}
[01:01:15] TEACHER: what's the performance.   {#971}
[01:01:16] TEACHER: You should know those numbers very early,   {#972}
[01:01:19] TEACHER: but over time you should build those intuition of using it.   {#973}
[01:01:23] TEACHER: But time sensitivity, as in what you added   {#974}
[01:01:26] STUDENT_1: was that core feature that you need around like,   {#975}
[01:01:29] STUDENT_1: for example, when someone goes offline, you want to,   {#976}
[01:01:33] STUDENT_1: like, as soon as the, for example,   {#977}
[01:01:35] STUDENT_1: I'll just give an example on that.   {#978}
[01:01:36] STUDENT_1: As soon as the key expires, you would want to immediately   {#979}
[01:01:40] STUDENT_1: pretend that this user is offline immediately.   {#980}
[01:01:43] STUDENT_1: So now how do you do that?   {#981}
[01:01:45] TEACHER: If you would want that kind of feature,   {#982}
[01:01:47] TEACHER: then Redis gives you those hooks that tell you that,   {#983}
[01:01:49] TEACHER: hey, this key just expired.   {#984}
[01:01:52] TEACHER: But DynamoDB does not give you that.   {#985}
[01:01:54] TEACHER: It gives you through streams,   {#986}
[01:01:56] TEACHER: but it would take you a long time to process it.   {#987}
[01:01:57] TEACHER: But Redis can give you it on the fly on a persistent connection.   {#988}
[01:02:02] TEACHER: Again, a bit more details of Redis,   {#989}
[01:02:04] TEACHER: but that's what you're supposed to know.   {#990}
[01:02:06] TEACHER: All these fancy features that databases offer.   {#991}
[01:02:10] TEACHER: Yeah. Okay.   {#992}
[01:02:13] TEACHER: Mohit, Sandeep and Shreya, I'll take like in case you want to add,   {#993}
[01:02:16] TEACHER: we'll have a chat about it at the end.   {#994}
[01:02:18] TEACHER: We'll move to the next part now.   {#995}
[01:02:20] TEACHER: But what I wanted to stress from this is like why I specifically chose   {#996}
[01:02:25] TEACHER: Redis and DynamoDB, Redis open source DynamoDB proprietary, big difference.   {#997}
[01:02:30] TEACHER: So if you are having, if you're working in a small team, lean startup,   {#998}
[01:02:33] TEACHER: five, 10 member team, you don't want this additional pressure   {#999}
[01:02:36] TEACHER: of managing the infrastructure, which is where you would go for a management.   {#1000}
[01:02:41] TEACHER: reasons why people go for managed services because they have very lean team   {#1001}
[01:02:44] TEACHER: or they might not have expertise in managing them because managing any database,   {#1002}
[01:02:48] TEACHER: Radius Elasticsearch, basically MySQL Radius Elasticsearch, any comes with its own set of   {#1003}
[01:02:55] TEACHER: pain points, observability, profiling and whatnot. Managed services give you easy.   {#1004}
[01:02:59] TEACHER: If you're a big organization thinking of vendor lock-in, then you may want to choose one over   {#1005}
[01:03:03] TEACHER: other. These factors, which is why I love having this brainstorming because apart from all the   {#1006}
[01:03:08] STUDENT_1: most common answers. These are the ones that are very interesting. Future extensions, vendor lock-in   {#1007}
[01:03:15] STUDENT_1: and manage. These three things is what is missing. A lot of people don't put thought around it.   {#1008}
[01:03:23] STUDENT_1: Very, very, very important. Okay. And this is not, and by the way, in real world, this is not how   {#1009}
[01:03:30] TEACHER: online offline are built. They're built using web sockets, which we'll discuss next week,   {#1010}
[01:03:34] TEACHER: not with online offline use case, but with some other use case.   {#1011}
[01:03:37] TEACHER: But this, the things that we discussed was more around   {#1012}
[01:03:40] TEACHER: how we go into those granular details,   {#1013}
[01:03:42] TEACHER: how we build intuition around it,   {#1014}
[01:03:44] TEACHER: how we make those trade-off decisions, right?   {#1015}
[01:03:46] TEACHER: So we are keeping things simple because it's day one.   {#1016}
[01:03:49] TEACHER: When things become, when things starts to become complex,   {#1017}
[01:03:52] TEACHER: you'll see the complexity that we touch, right?   {#1018}
[01:03:54] TEACHER: So for now, and again, warning,   {#1019}
[01:03:58] STUDENT_1: there's not how they're actually built.   {#1020}
[01:03:59] STUDENT_1: They are built with a ton of tunings and optimizations and whatnot.   {#1021}
[01:04:02] STUDENT_1: but we'll touch upon few of them in the next week.   {#1022}
[01:04:05] STUDENT_1: So second week, second day, when we talk about Slack's   {#1023}
[01:04:09] STUDENT_1: real-time communication, we'll touch upon this.   {#1024}
[01:04:11] STUDENT_1: Okay.   {#1025}
[01:04:14] STUDENT_1: Let's see how our DB is doing.   {#1026}
[01:04:16] STUDENT_1: We've talked about storage.   {#1027}
[01:04:18] STUDENT_1: Now comes more interesting part.   {#1028}
[01:04:21] STUDENT_1: So we talk about that storage is not a challenge for this system   {#1029}
[01:04:26] STUDENT_1: because 8 GB for 1 million entries is peanuts for a database.   {#1030}
[01:04:31] TEACHER: Now, so then what's the challenge when you have a billion users, what else can be challenging?   {#1031}
[01:04:36] STUDENT_1: So let's say clients are sending heartbeats every 10 seconds, right?   {#1032}
[01:04:41] STUDENT_1: So in one minute you'd get six heartbeats.   {#1033}
[01:04:43] TEACHER: If there are 1 million active users, not total users, active users, then your system will   {#1034}
[01:04:48] TEACHER: get 6 million requests per minute.   {#1035}
[01:04:51] TEACHER: Now things are becoming scary.   {#1036}
[01:04:52] STUDENT_1: 6 million requests per minute.   {#1037}
[01:04:54] STUDENT_1: And now for each heartbeat that you are receiving, you would have to go and update it in the   {#1038}
[01:05:00] STUDENT_1: database, which means every heartbeat that you are receiving results in one DB call,   {#1039}
[01:05:05] STUDENT_1: which means now your single database needs 206 million updates per minute.   {#1040}
[01:05:10] STUDENT_1: This is scary.   {#1041}
[01:05:12] STUDENT_1: Your database having to do so many writes, 6 million updates per minute, your database   {#1042}
[01:05:18] STUDENT_1: would start to choke.   {#1043}
[01:05:19] STUDENT_1: Now here is a classic case where storage is not a problem.   {#1044}
[01:05:25] STUDENT_1: Computation is.   {#1045}
[01:05:27] STUDENT_1: So you don't need large amount of storage in this database.   {#1046}
[01:05:31] STUDENT_1: The data needs are very small.   {#1047}
[01:05:33] STUDENT_1: 8 GB entire data fits in 8 GB.   {#1048}
[01:05:36] STUDENT_1: Right.   {#1049}
[01:05:37] STUDENT_1: But having to support 6 million requests per minute is a challenge.   {#1050}
[01:05:43] STUDENT_1: Right.   {#1051}
[01:05:44] STUDENT_1: So now how do we make it better apart from all the sharding   {#1052}
[01:05:46] STUDENT_1: partitioning stuff, which we'll discuss in future.   {#1053}
[01:05:49] STUDENT_1: One thing that I want to bring out is something that very few people talk about is connection pooling.   {#1054}
[01:05:56] TEACHER: So we'll talk about sharding partitioning in coming weeks.   {#1055}
[01:05:59] TEACHER: So don't judge me on that.   {#1056}
[01:06:00] TEACHER: I don't know that part.   {#1057}
[01:06:02] TEACHER: This is one point that no one talks about.   {#1058}
[01:06:04] TEACHER: And I really want to highlight this, which is connection pooling.   {#1059}
[01:06:06] TEACHER: So here the key challenge is that storage is not a concern for this database.   {#1060}
[01:06:13] TEACHER: The concern is computation.   {#1061}
[01:06:14] TEACHER: The number of queries that have been fired.   {#1062}
[01:06:16] TEACHER: Each query is doing an update on the database.   {#1063}
[01:06:19] TEACHER: So one of the possible optimizations that you all should know about is called connection   {#1064}
[01:06:25] TEACHER: polling.   {#1065}
[01:06:25] STUDENT_1: Now here, every request that is coming in is making one database call.   {#1066}
[01:06:33] STUDENT_1: Now this request from user, the post request is HTTP request, TCP connection.   {#1067}
[01:06:38] STUDENT_1: When the request comes in, API server creates a connection with the database and writes   {#1068}
[01:06:42] STUDENT_1: something.   {#1069}
[01:06:43] STUDENT_1: So this is another TCP connection.   {#1070}
[01:06:44] STUDENT_1: Now, for you to create a TCP connection, for your API server to talk to your database,   {#1071}
[01:06:49] STUDENT_1: a TCP connection needs to be established.   {#1072}
[01:06:52] STUDENT_1: In order to establish a TCP connection, the infamous three-way handshake is required.   {#1073}
[01:06:56] STUDENT_1: And then three-way handshake to set up the connection, two-way to tier down.   {#1074}
[01:07:01] STUDENT_1: So to set up a TCP connection, they have to do three-way handshake.   {#1075}
[01:07:04] STUDENT_1: And to terminate a dissipation, they have to do two-way tier down.   {#1076}
[01:07:09] STUDENT_1: So five network trips for every single call.   {#1077}
[01:07:14] STUDENT_1: So which is where establishing this connection,   {#1078}
[01:07:17] STUDENT_1: the one line that we draw like this on the diagram,   {#1079}
[01:07:21] STUDENT_1: like this, without giving a thought, is an expensive process.   {#1080}
[01:07:27] TEACHER: Your API server need to establish the connection with your database.   {#1081}
[01:07:30] TEACHER: And this is extremely expensive   {#1082}
[01:07:32] TEACHER: because of the number of network trips that you are doing.   {#1083}
[01:07:35] TEACHER: So this is a problem.   {#1084}
[01:07:38] TEACHER: Now, how do you reduce this?   {#1085}
[01:07:39] TEACHER: This is the biggest performance bottleneck.   {#1086}
[01:07:42] TEACHER: When you are talking about micro writes,   {#1087}
[01:07:44] STUDENT_1: we are doing in the database it just every database call we are doing one update in the database one   {#1088}
[01:07:49] STUDENT_1: row update in the database right and that is a pointed update given this your database is doing   {#1089}
[01:07:55] STUDENT_1: the bare minimum right in the system one update to one row indexed by primary key right these micro   {#1090}
[01:08:02] TEACHER: updates so where is the time going most of the time that is being spent here is in establishing   {#1091}
[01:08:08] TEACHER: this tcp connection which is an expensive process so how do you solve it which is where   {#1092}
[01:08:14] TEACHER: To make it better, to put lesser load on the database, we add connection pooling.   {#1093}
[01:08:20] TEACHER: So now what is connection pooling?   {#1094}
[01:08:21] TEACHER: Understand this.   {#1095}
[01:08:23] STUDENT_1: Connection pooling is where because underlying it's all TCP connections.   {#1096}
[01:08:29] STUDENT_1: Who asked the TCP connection to shut down?   {#1097}
[01:08:32] STUDENT_1: Don't shut it down.   {#1098}
[01:08:33] STUDENT_1: Let the TCP connection be open between your server and your database.   {#1099}
[01:08:38] STUDENT_1: Given that the update that we are doing on the database is a micro update,   {#1100}
[01:08:42] STUDENT_1: which means you literally go to the database, update one row and come back.   {#1101}
[01:08:46] STUDENT_1: A lot of time is being wasted in establishing the TCP connection and tearing it down.   {#1102}
[01:08:52] STUDENT_1: So what if you create a bunch of connections, you have a bunch of, sorry,   {#1103}
[01:08:58] STUDENT_1: you have a bunch of connections handy in your system.   {#1104}
[01:09:01] STUDENT_1: Let's say my API server creates three TCP connections.   {#1105}
[01:09:06] STUDENT_1: My API server creates three TCP connections with my database on startup.   {#1106}
[01:09:12] STUDENT_1: When my database, when my API server starts, it creates three TCP connections with my database.   {#1107}
[01:09:19] STUDENT_1: It keeps them handy on the site.   {#1108}
[01:09:22] STUDENT_1: Right.   {#1109}
[01:09:22] STUDENT_1: Now, whenever I get a post request, whenever I want to write something to the database   {#1110}
[01:09:28] STUDENT_1: or fire a query to this database, select, update, insert, whatever.   {#1111}
[01:09:32] STUDENT_1: Whenever I want to do that, I can use any one of these connections, which is right now   {#1112}
[01:09:39] STUDENT_1: not being used by any other thing and to fire the query.   {#1113}
[01:09:44] STUDENT_1: So which means that how this all works is when the request comes in the server picks   {#1114}
[01:09:52] STUDENT_1: one of these three, let's say there are three available connections.   {#1115}
[01:09:55] STUDENT_1: It picks one of this and marks it unavailable.   {#1116}
[01:09:59] STUDENT_1: and I will also talk about implementation of it.   {#1117}
[01:10:02] STUDENT_1: But it picks one available connection   {#1118}
[01:10:04] STUDENT_1: and now this connection   {#1119}
[01:10:05] STUDENT_1: because it is already established with the database,   {#1120}
[01:10:08] STUDENT_1: all it does is fire update query and get the response.   {#1121}
[01:10:11] STUDENT_1: It does not have to reestablish the TCP connections   {#1122}
[01:10:13] STUDENT_1: and terminate it.   {#1123}
[01:10:14] STUDENT_1: So it saves five network trips,   {#1124}
[01:10:17] STUDENT_1: three-way hand check to set up,   {#1125}
[01:10:19] STUDENT_1: two-way to your job, right?   {#1126}
[01:10:21] STUDENT_1: So it saves this five network trip.   {#1127}
[01:10:22] STUDENT_1: So literally one request and one response.   {#1128}
[01:10:26] STUDENT_1: That's all.   {#1129}
[01:10:27] STUDENT_1: This way you make your API call very fast, number one.   {#1130}
[01:10:33] STUDENT_1: Number two, you reduce the load on the database.   {#1131}
[01:10:36] STUDENT_1: But why load on the database would be reduced?   {#1132}
[01:10:40] STUDENT_1: The number of queries are same.   {#1133}
---- OWNED SEGMENTS END ----

CTX| [01:10:42] STUDENT_1: Establishing the TCP connection is an expensive process for your database.   {#1134}
CTX| [01:10:47] STUDENT_1: Because when your network, let's say you are doing a three-way handshake,   {#1135}
CTX| [01:10:51] STUDENT_1: you're setting up the TCP connection.   {#1136}
CTX| [01:10:52] TEACHER: Your database has to read the packet.   {#1137}
CTX| [01:10:57] TEACHER: The first packet comes in, acknowledgement goes out,   {#1138}
CTX| [01:11:00] TEACHER: third packet comes in.   {#1139}
CTX| [01:11:01] TEACHER: It has to put the CPU bandwidth into processing it.   {#1140}
CTX| [01:11:05] TEACHER: Network bandwidth goes into reading it.   {#1141}
CTX| [01:11:07] TEACHER: OS buffers are used, right?   {#1142}
CTX| [01:11:10] STUDENT_1: So the cost of establishing a TCP connection is massive   {#1143}
CTX| [01:11:14] STUDENT_1: when it comes to this micro updates.   {#1144}
CTX| [01:11:17] STUDENT_1: Your database has to spread considerable CPU and memory   {#1145}
CTX| [01:11:23] STUDENT_1: establishing this TCP connection and then terminating.   {#1146}
CTX| [01:11:25] STUDENT_1: So by having this connection pool where you are pre-establishing the connections   {#1147}
CTX| [01:11:31] STUDENT_1: and then just reusing them, you are saving your databases bandwidth, CPU,   {#1148}
CTX| [01:11:37] STUDENT_1: network, both and memory also.   {#1149}
CTX| [01:11:39] STUDENT_1: Not really memory, but actually CPU and network mode.   {#1150}
CTX| [01:11:42] STUDENT_1: You are saving the CPU and network, that additional work that CPU   {#1151}
