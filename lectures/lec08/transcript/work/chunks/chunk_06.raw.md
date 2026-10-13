# chunk_06  OWNS 00:58:12 -> 01:10:17  (segments #983-#1205, 2090 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:57:12] TEACHER: You send the packet.   {#955}
CTX| [00:57:14] TEACHER: from other side, send it somewhere else.   {#956}
CTX| [00:57:16] TEACHER: That's what you do.   {#957}
CTX| [00:57:17] TEACHER: Okay.   {#958}
CTX| [00:57:18] TEACHER: So this is low level implementation detail of a load balancer.   {#959}
CTX| [00:57:23] TEACHER: Let me show you code very briefly, five minutes.   {#960}
CTX| [00:57:26] TEACHER: I'll show you the code of a load balancer.   {#961}
CTX| [00:57:29] TEACHER: Today's session will definitely get extended because we are going really in depth.   {#962}
CTX| [00:57:33] TEACHER: But I wanted to talk about this.   {#963}
CTX| [00:57:34] TEACHER: I wanted to spark that engineering curiosity.   {#964}
CTX| [00:57:37] TEACHER: Dabbe dabbe, everyone can wait.   {#965}
CTX| [00:57:39] TEACHER: This is where the magic happens.   {#966}
CTX| [00:57:41] TEACHER: And again, Kyle won't share.   {#967}
CTX| [00:57:44] TEACHER: What happened?   {#968}
CTX| [00:57:46] TEACHER: Oh, GitHub is down.   {#969}
CTX| [00:57:50] TEACHER: GitHub is down.   {#970}
CTX| [00:57:52] TEACHER: 500.   {#971}
CTX| [00:57:53] TEACHER: GitHub is having an outage.   {#972}
CTX| [00:57:55] TEACHER: Hopefully, they recover from this.   {#973}
CTX| [00:57:57] TEACHER: And we get to see our code.   {#974}
CTX| [00:57:59] TEACHER: Oh, we did.   {#975}
CTX| [00:58:00] TEACHER: Great.   {#976}
CTX| [00:58:01] TEACHER: Okay.   {#977}
CTX| [00:58:01] TEACHER: So, this is the load balancer that I've written.   {#978}
CTX| [00:58:06] TEACHER: 1.5.   {#979}
CTX| [00:58:07] TEACHER: LB.go.   {#980}
CTX| [00:58:08] TEACHER: Still some outage.   {#981}
CTX| [00:58:10] TEACHER: Okay.   {#982}

---- OWNED SEGMENTS START ----
[00:58:12] TEACHER: And go.   {#983}
[00:58:14] TEACHER: into a lot of details what core that i'm talking about is here right okay lb.run this is my load   {#984}
[00:58:21] TEACHER: balancer server the lb server that we're talking about which is listening on port 9090 right so   {#985}
[00:58:26] TEACHER: anyone who wants to talk to load balancer has to talk to our code 9090 right then i hardcoded bunch   {#986}
[00:58:33] TEACHER: of backend servers here you can see i have four backend servers running flask hello world right   {#987}
[00:58:40] TEACHER: But they are listening on four different ports.   {#988}
[00:58:42] TEACHER: 8081, 802, 803, 808.   {#989}
[00:58:44] TEACHER: Four different processes I spin up from the same code base.   {#990}
[00:58:47] TEACHER: 8081, another one 8082, third one 8080, fourth one 8084.   {#991}
[00:58:51] TEACHER: Because I wanted to test load balancing.   {#992}
[00:58:52] TEACHER: I didn't want to scale the system.   {#993}
[00:58:55] TEACHER: So I have four backend servers all running locally.   {#994}
[00:58:57] TEACHER: I have one LV server listing on port 9090.   {#995}
[00:59:01] TEACHER: Now what did we say?   {#996}
[00:59:03] TEACHER: When we get a request, this is where the magic is.   {#997}
[00:59:06] TEACHER: We say when we get a request from a client, we have to pick a server to connect.   {#998}
[00:59:11] TEACHER: So this is where my infinite for loop runs.   {#999}
[00:59:15] TEACHER: This is my infinite for loop.   {#1000}
[00:59:17] TEACHER: That's a small for loop, very small code.   {#1001}
[00:59:21] TEACHER: I'm doing listener.except, which means I'm waiting.   {#1002}
[00:59:24] TEACHER: My LV server is waiting for an incoming connection.   {#1003}
[00:59:28] TEACHER: LV server is waiting for an incoming connection.   {#1004}
[00:59:30] TEACHER: So when some client connects, it would move forward.   {#1005}
[00:59:36] TEACHER: that we talk about right now what we did we just took this i just wrapped this tcp connection into   {#1006}
[00:59:43] TEACHER: an object source connection named it source connection and added some request id just for   {#1007}
[00:59:48] TEACHER: me to log it down that's it right but i just invoked the function called proxy it's in the   {#1008}
[00:59:52] TEACHER: part of same class so i took that established tcp connection so when client one connected to my lv   {#1009}
[00:59:57] TEACHER: server tcp connection got formed with listener.xf i took the tcp connection and put it in a and   {#1010}
[01:00:06] TEACHER: is where the proxy happens.   {#1011}
[01:00:07] TEACHER: So proxy is literally your proxy into some backend server.   {#1012}
[01:00:11] TEACHER: So I got an incoming request, which has source connection.   {#1013}
[01:00:14] TEACHER: What would be a first step when a client connects?   {#1014}
[01:00:16] TEACHER: What is our first step?   {#1015}
[01:00:18] TEACHER: Our first step is to figure out which backend server to talk to.   {#1016}
[01:00:21] TEACHER: So that's exactly what I did.   {#1017}
[01:00:24] TEACHER: LB server, LB.strategy.getNextBackend.   {#1018}
[01:00:27] TEACHER: Now, depending on what strategy I'm using round robin, consistent hashing and whatnot,   {#1019}
[01:00:31] TEACHER: I'm picking one backend server.   {#1020}
[01:00:34] TEACHER: Now, when I say picking one backend server, what do I want?   {#1021}
[01:00:37] TEACHER: IP address and port number, which is exactly what I get over here.   {#1022}
[01:00:41] TEACHER: One backend.   {#1023}
[01:00:42] TEACHER: I get host and port in the backend object and I just dial a TCP connection to that.   {#1024}
[01:00:48] TEACHER: So now this is my LD server creating a TCP connection to backend server,   {#1025}
[01:00:53] TEACHER: which was spit out from my load balancing strategy.   {#1026}
[01:00:58] TEACHER: So I now got a backend connection.   {#1027}
[01:01:00] TEACHER: So I have a source connection.   {#1028}
[01:01:02] TEACHER: I have a backend connection.   {#1029}
[01:01:04] TEACHER: Now what do I do?   {#1030}
[01:01:06] TEACHER: What it does?   {#1031}
[01:01:07] TEACHER: Simple.   {#1032}
[01:01:09] TEACHER: I invoke the system code.   {#1033}
[01:01:11] TEACHER: Copy.   {#1034}
[01:01:11] TEACHER: Which literally copies from one file to another.   {#1035}
[01:01:15] TEACHER: So I said copy everything you have.   {#1036}
[01:01:18] TEACHER: From source connection.   {#1037}
[01:01:20] TEACHER: To backend connection.   {#1038}
[01:01:21] TEACHER: And copy everything you get.   {#1039}
[01:01:23] TEACHER: From backend connection.   {#1040}
[01:01:25] TEACHER: To source connection.   {#1041}
[01:01:26] TEACHER: Request.   {#1042}
[01:01:27] TEACHER: Response.   {#1043}
[01:01:28] TEACHER: Both of them running in their own goroutines.   {#1044}
[01:01:31] TEACHER: And I have not done very efficient implementation.   {#1045}
[01:01:33] TEACHER: Which I have just spun up as many goroutines as I can.   {#1046}
[01:01:36] TEACHER: thing that I'm doing so that otherwise it's a system call is a blocking call.   {#1047}
[01:01:40] TEACHER: So this is a blocking call.   {#1048}
[01:01:41] TEACHER: So if I don't run it in a thread, what would happen is it would block until the connection   {#1049}
[01:01:45] TEACHER: terminates.   {#1050}
[01:01:46] TEACHER: So sending the request after that would just wait.   {#1051}
[01:01:49] TEACHER: I would never be receiving any response from anywhere because this would not move forward.   {#1052}
[01:01:54] TEACHER: This is a blocking call because of which I added go routines over here.   {#1053}
[01:01:58] TEACHER: So this happens in one go routine response reading happens in one go routine.   {#1054}
[01:02:03] TEACHER: But that's it.   {#1055}
[01:02:08] TEACHER: First client established TCP connection with your server, your LB server.   {#1056}
[01:02:14] TEACHER: You then pick the backend, you establish a TCP connection with the backend, then literally   {#1057}
[01:02:21] TEACHER: copied everything from source.   {#1058}
[01:02:22] TEACHER: So this is source and this is destination in a system call.   {#1059}
[01:02:25] TEACHER: So you pick everything from the source connection, forward it to the backend connection.   {#1060}
[01:02:30] TEACHER: Then you read everything from the backend connection and forward it to the source connection.   {#1061}
[01:02:34] TEACHER: Done.   {#1062}
[01:02:37] TEACHER: That's it.   {#1063}
[01:02:38] TEACHER: That's it.   {#1064}
[01:02:39] TEACHER: You can literally implement it in five hours.   {#1065}
[01:02:42] TEACHER: You might just need to know basics of networking, but there is nothing.   {#1066}
[01:02:45] TEACHER: If you look at this code, there is no magic sauce.   {#1067}
[01:02:48] TEACHER: Everything else is just about load balancing strategy.   {#1068}
[01:02:50] TEACHER: I'll also walk you through that load balancing strategy.   {#1069}
[01:02:52] STUDENT_1: I said, I get out strategy.   {#1070}
[01:02:57] STUDENT_1: Go here.   {#1071}
[01:02:59] TEACHER: You can see round robin balancing strategy, static, balancing strategy,   {#1072}
[01:03:04] TEACHER: hashed balance strategy   {#1073}
[01:03:08] TEACHER: that's it but now you can very easily   {#1074}
[01:03:10] TEACHER: see round robin   {#1075}
[01:03:12] TEACHER: balancing strategy get next back end   {#1076}
[01:03:14] TEACHER: I got incoming request   {#1077}
[01:03:16] TEACHER: I keep a track of index   {#1078}
[01:03:17] TEACHER: where did I send my last request to   {#1079}
[01:03:19] TEACHER: every time I invoke get   {#1080}
[01:03:22] TEACHER: next back end it just does   {#1081}
[01:03:24] TEACHER: index plus one mod   {#1082}
[01:03:25] TEACHER: x back end and pick   {#1083}
[01:03:28] TEACHER: of all the back ends pick that particular   {#1084}
[01:03:29] TEACHER: index or round robin 1 2 3   {#1085}
[01:03:31] TEACHER: 1 2 3 1 2 3   {#1086}
[01:03:34] TEACHER: that when there is a consistent hashing with implementation, that is different.   {#1087}
[01:03:37] TEACHER: So little more complex, but this is constant hashing based implementation.   {#1088}
[01:03:41] TEACHER: Really simple.   {#1089}
[01:03:42] TEACHER: I have a blog on it in case you're interested, but it's very easy.   {#1090}
[01:03:46] TEACHER: And then when you start coding it out, things become really easy, which is   {#1091}
[01:03:52] TEACHER: what I want all of you to do.   {#1092}
[01:03:53] TEACHER: Like, don't just take things for granted, go in deep of that system and see, but   {#1093}
[01:03:58] TEACHER: you don't ask me this question that where would I ever use it?   {#1094}
[01:04:01] TEACHER: You never know life works in mysterious ways.   {#1095}
[01:04:04] TEACHER: You never know when you are thrown into a situation   {#1096}
[01:04:05] TEACHER: where you might have to do something like this,   {#1097}
[01:04:07] TEACHER: not just to write load balancer, but in order to do something.   {#1098}
[01:04:10] TEACHER: You might have to just write a very lightweight proxy   {#1099}
[01:04:12] TEACHER: because existing proxies are not performant enough.   {#1100}
[01:04:14] TEACHER: Quite possible.   {#1101}
[01:04:16] TEACHER: So just be prepared, be curious, and be a better engineer at the end.   {#1102}
[01:04:19] TEACHER: That's what life is basically surrounded by.   {#1103}
[01:04:23] TEACHER: So to be honest, this is exactly what a load balancer does,   {#1104}
[01:04:28] TEACHER: and that is exactly what I coded.   {#1105}
[01:04:29] TEACHER: That is exactly how my load got balanced.   {#1106}
[01:04:34] TEACHER: Again, recommending you to implement everything that you'll see around.   {#1107}
[01:04:38] TEACHER: Right.   {#1108}
[01:04:38] TEACHER: Okay.   {#1109}
[01:04:38] TEACHER: Any questions on this?   {#1110}
[01:04:39] TEACHER: I'll take three and then move forward.   {#1111}
[01:04:43] STUDENT_1: Uh, so when a user disconnects, how would you handle that, that, uh, number of connections   {#1112}
[01:04:53] STUDENT_1: go minus for that load balance?   {#1113}
[01:04:55] STUDENT_1: I mean, for that API server.   {#1114}
[01:04:57] TEACHER: No, I did not maintain least number of connections that are statistics.   {#1115}
[01:05:01] TEACHER: Right.   {#1116}
[01:05:04] TEACHER: with one all I had to do was just write a basic load balancer right all of those are fancy stuff   {#1117}
[01:05:09] TEACHER: if this connection terminates and do this keep a track of the status so here I have kept track of   {#1118}
[01:05:14] TEACHER: one statistic that uh for each back end I'm keeping track of number of requests that it has handled   {#1119}
[01:05:19] TEACHER: up until now not the connections but the number of requests a particular backend has handled up until   {#1120}
[01:05:24] TEACHER: this way I know if round robin is working properly on okay right but those are all statistics you can   {#1121}
[01:05:31] TEACHER: just add it over here. Once you pick a backend, you just keep track of it.   {#1122}
[01:05:34] TEACHER: Right. What has happened when a connection terminates, you would know about it   {#1123}
[01:05:37] TEACHER: because it would raise a panic. It would raise an exception. You can capture it   {#1124}
[01:05:40] TEACHER: and basically update your in-memory state about it. Sure.   {#1125}
[01:05:46] STUDENT_4: Uh, so from a load balancer to the API server, is it like a rest API calls   {#1126}
[01:05:53] STUDENT_4: happening or how it is?   {#1127}
[01:05:54] TEACHER: Normal TCP look carefully. There is, have you seen either anywhere rest   {#1128}
[01:05:58] TEACHER: for me, it's a TCP connection.   {#1129}
[01:06:01] TEACHER: I just established a TCP connection to the backend and literally copied everything from   {#1130}
[01:06:05] TEACHER: one connection, send it to another.   {#1131}
[01:06:07] TEACHER: It may send HEDP, it may send RPC calls, it may send anything.   {#1132}
[01:06:11] TEACHER: We don't really care.   {#1133}
[01:06:12] TEACHER: We are just receiving anything that we are receiving from the one side and sending it   {#1134}
[01:06:16] TEACHER: to other.   {#1135}
[01:06:17] TEACHER: It's a raw system called the time.   {#1136}
[01:06:19] TEACHER: Okay.   {#1137}
[01:06:20] TEACHER: Any packet, literally any packet.   {#1138}
[01:06:23] TEACHER: Okay.   {#1139}
[01:06:24] TEACHER: Thanks.   {#1140}
[01:06:25] TEACHER: Aditi.   {#1141}
[01:06:27] STUDENT_4: Yes.   {#1142}
[01:06:27] STUDENT_4: I'm a little confused about the last two lines.   {#1143}
[01:06:31] STUDENT_4: Do it continually copies anything that is coming from the server to the, I mean, okay.   {#1144}
[01:06:38] TEACHER: Yes.   {#1145}
[01:06:38] TEACHER: From one TCP connection or from one file to another file.   {#1146}
[01:06:41] TEACHER: Whatever it has.   {#1147}
[01:06:42] TEACHER: Just continuously.   {#1148}
[01:06:43] STUDENT_4: Okay.   {#1149}
[01:06:43] STUDENT_4: It continuously goes on happening until it receives an EOF.   {#1150}
[01:06:48] TEACHER: End of file.   {#1151}
[01:06:49] TEACHER: Okay.   {#1152}
[01:06:49] STUDENT_4: Okay.   {#1153}
[01:06:50] TEACHER: Once it receives EOF, it stops.   {#1154}
[01:06:52] TEACHER: So that's when this function would return.   {#1155}
[01:06:54] TEACHER: That's why I cannot just untimely wait for it to end.   {#1156}
[01:06:58] TEACHER: I spin up it in its own go routine.   {#1157}
[01:07:01] TEACHER: to wait on that i can just spin two go routines in parallel one that copies from here to here   {#1158}
[01:07:06] TEACHER: one that covers from there okay thanks and again i would highly highly highly highly recommend all   {#1159}
[01:07:14] TEACHER: of you to implement this it's not at all difficult right just be curious about anything and everything   {#1160}
[01:07:22] TEACHER: that you see even cdn is implementable cdn implementation hardly one hour who are who is   {#1161}
[01:07:27] TEACHER: asking you to distribute it.   {#1162}
[01:07:30] TEACHER: Once you just need to know how those things are served,   {#1163}
[01:07:33] TEACHER: cached, processed and whatnot.   {#1164}
[01:07:35] TEACHER: When we go in depth of CDN next week,   {#1165}
[01:07:38] TEACHER: you'll understand it's not really difficult   {#1166}
[01:07:39] TEACHER: to build your own CDN.   {#1167}
[01:07:41] TEACHER: Difficult to scale, not to build.   {#1168}
[01:07:45] TEACHER: So that's why I always say there is a difference   {#1169}
[01:07:47] TEACHER: between building and scaling.   {#1170}
[01:07:50] TEACHER: Scaling, very few people will get a chance to do.   {#1171}
[01:07:52] TEACHER: But building, every one of us can.   {#1172}
[01:07:56] TEACHER: because someone built Docker locally.   {#1173}
[01:07:59] TEACHER: That's how Docker started.   {#1174}
[01:08:01] TEACHER: Correct.   {#1175}
[01:08:02] TEACHER: You can just cannot have an excuse.   {#1176}
[01:08:04] TEACHER: You can build everything locally.   {#1177}
[01:08:06] TEACHER: You don't need multiple machines to build something.   {#1178}
[01:08:08] TEACHER: Yeah.   {#1179}
[01:08:09] TEACHER: For scaling.   {#1180}
[01:08:09] TEACHER: I agree.   {#1181}
[01:08:10] TEACHER: You need multiple machines, but why build and get those low level details around.   {#1182}
[01:08:15] TEACHER: Right.   {#1183}
[01:08:16] TEACHER: Okay.   {#1184}
[01:08:17] TEACHER: Now that you know the low level details of it, it will be very fun to discuss the high   {#1185}
[01:08:23] TEACHER: level part of it.   {#1186}
[01:08:24] TEACHER: that we would brainstorm on is you would already have gotten an idea of kind of   {#1187}
[01:08:31] TEACHER: things that we would not to store but there are still a lot of interesting   {#1188}
[01:08:34] TEACHER: design decisions and most importantly scaling LV because now you can now you   {#1189}
[01:08:39] TEACHER: can actually see why this one machine can become a bottleneck because for every   {#1190}
[01:08:44] TEACHER: request that is coming in it has to create another request to the backend   {#1191}
[01:08:48] TEACHER: server which means that if this machine has there's a 10,000 connection limit it   {#1192}
[01:08:54] TEACHER: 5000 clients in parallel because it has 10 000 limit for every 5000 this is one tcp connection   {#1193}
[01:09:00] TEACHER: consumed but everyone it is creating another one to the back end so if this has 10 000 connection   {#1194}
[01:09:05] TEACHER: limit the maximum number of concurrent tcp connection or maximum number of client that   {#1195}
[01:09:10] TEACHER: it can serve is only 5000 because it needs 5000 to connect to back end server so which means that   {#1196}
[01:09:14] TEACHER: this needs to be horizontally scaling so we'll also talk about how to scale like how load balancers are   {#1197}
[01:09:19] TEACHER: internally screen that's fine okay uh i'll take your question okay let's start with brainstorming   {#1198}
[01:09:27] TEACHER: let's start with the so the four factors that we would brainstorm on is lb configurations monitoring   {#1199}
[01:09:33] TEACHER: availability and extensibility like here we'll touch upon those factors how are we doing what   {#1200}
[01:09:38] STUDENT_5: we are doing right okay let me open up uh i'll also copy this for my reference so that i don't   {#1201}
[01:09:45] STUDENT_5: forget to cover i don't forget to miss anything during a discussion just a minute   {#1202}
[01:09:53] TEACHER: okay so let's start with this how would you store the configuration the configuration that you know   {#1203}
[01:10:00] TEACHER: now you know what kind of configuration would we need to store how would you store and what   {#1204}
[01:10:04] TEACHER: would you store i'll meanwhile i'll start drawing this part raise your hands i'll pull you in   {#1205}
---- OWNED SEGMENTS END ----

CTX| [01:10:17] TEACHER: Yes, Shalendra.   {#1206}
CTX| [01:10:19] STUDENT_6: So how would I be storing this server configuration, right?   {#1207}
CTX| [01:10:23] STUDENT_6: So what would you store?   {#1208}
CTX| [01:10:26] TEACHER: First, let's start with that.   {#1209}
CTX| [01:10:27] STUDENT_6: The backend server configurations, IP address and...   {#1210}
CTX| [01:10:33] TEACHER: IP address and port, right?   {#1211}
CTX| [01:10:35] TEACHER: Backend servers.   {#1212}
CTX| [01:10:36] TEACHER: Yeah.   {#1213}
CTX| [01:10:37] TEACHER: All the backend servers that you have, you would have IP address and port mapping of all   {#1214}
CTX| [01:10:41] TEACHER: of them.   {#1215}
CTX| [01:10:42] TEACHER: Okay.   {#1216}
CTX| [01:10:42] TEACHER: Anything else?   {#1217}
CTX| [01:10:44] STUDENT_6: Algorithms.   {#1218}
CTX| [01:10:45] TEACHER: Okay. Balancing algorithm. Great.   {#1219}
CTX| [01:10:48] TEACHER: Um, this is the bare minimum that you need, right?   {#1220}
CTX| [01:10:51] TEACHER: Bare minimum.   {#1221}
CTX| [01:10:52] TEACHER: Right.   {#1222}
CTX| [01:10:53] TEACHER: Otherwise you can add more, more fancy stuff to that.   {#1223}
CTX| [01:10:55] TEACHER: Let's start with bare minimum because then you can obviously infinitely build   {#1224}
CTX| [01:10:58] TEACHER: that system, make it more and more complex, but this is the bare minimum that you   {#1225}
CTX| [01:11:01] TEACHER: need that what algorithm you are using and what are the backend servers that   {#1226}
CTX| [01:11:04] TEACHER: are connected to that.   {#1227}
CTX| [01:11:06] TEACHER: Right.   {#1228}
CTX| [01:11:06] TEACHER: Okay.   {#1229}
CTX| [01:11:07] TEACHER: Where would you store this?   {#1230}
CTX| [01:11:09] STUDENT_6: So, uh, okay.   {#1231}
CTX| [01:11:11] STUDENT_6: If I go from the beginning, let's think about the simple system.   {#1232}
CTX| [01:11:15] STUDENT_6: I will just use a database for that.   {#1233}
