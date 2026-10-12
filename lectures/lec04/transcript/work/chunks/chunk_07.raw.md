# chunk_07  OWNS 01:10:42 -> 01:23:46  (segments #1134-#1348, 2405 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:09:44] STUDENT_1: So which means that how this all works is when the request comes in the server picks   {#1114}
CTX| [01:09:52] STUDENT_1: one of these three, let's say there are three available connections.   {#1115}
CTX| [01:09:55] STUDENT_1: It picks one of this and marks it unavailable.   {#1116}
CTX| [01:09:59] STUDENT_1: and I will also talk about implementation of it.   {#1117}
CTX| [01:10:02] STUDENT_1: But it picks one available connection   {#1118}
CTX| [01:10:04] STUDENT_1: and now this connection   {#1119}
CTX| [01:10:05] STUDENT_1: because it is already established with the database,   {#1120}
CTX| [01:10:08] STUDENT_1: all it does is fire update query and get the response.   {#1121}
CTX| [01:10:11] STUDENT_1: It does not have to reestablish the TCP connections   {#1122}
CTX| [01:10:13] STUDENT_1: and terminate it.   {#1123}
CTX| [01:10:14] STUDENT_1: So it saves five network trips,   {#1124}
CTX| [01:10:17] STUDENT_1: three-way hand check to set up,   {#1125}
CTX| [01:10:19] STUDENT_1: two-way to your job, right?   {#1126}
CTX| [01:10:21] STUDENT_1: So it saves this five network trip.   {#1127}
CTX| [01:10:22] STUDENT_1: So literally one request and one response.   {#1128}
CTX| [01:10:26] STUDENT_1: That's all.   {#1129}
CTX| [01:10:27] STUDENT_1: This way you make your API call very fast, number one.   {#1130}
CTX| [01:10:33] STUDENT_1: Number two, you reduce the load on the database.   {#1131}
CTX| [01:10:36] STUDENT_1: But why load on the database would be reduced?   {#1132}
CTX| [01:10:40] STUDENT_1: The number of queries are same.   {#1133}

---- OWNED SEGMENTS START ----
[01:10:42] STUDENT_1: Establishing the TCP connection is an expensive process for your database.   {#1134}
[01:10:47] STUDENT_1: Because when your network, let's say you are doing a three-way handshake,   {#1135}
[01:10:51] STUDENT_1: you're setting up the TCP connection.   {#1136}
[01:10:52] TEACHER: Your database has to read the packet.   {#1137}
[01:10:57] TEACHER: The first packet comes in, acknowledgement goes out,   {#1138}
[01:11:00] TEACHER: third packet comes in.   {#1139}
[01:11:01] TEACHER: It has to put the CPU bandwidth into processing it.   {#1140}
[01:11:05] TEACHER: Network bandwidth goes into reading it.   {#1141}
[01:11:07] TEACHER: OS buffers are used, right?   {#1142}
[01:11:10] STUDENT_1: So the cost of establishing a TCP connection is massive   {#1143}
[01:11:14] STUDENT_1: when it comes to this micro updates.   {#1144}
[01:11:17] STUDENT_1: Your database has to spread considerable CPU and memory   {#1145}
[01:11:23] STUDENT_1: establishing this TCP connection and then terminating.   {#1146}
[01:11:25] STUDENT_1: So by having this connection pool where you are pre-establishing the connections   {#1147}
[01:11:31] STUDENT_1: and then just reusing them, you are saving your databases bandwidth, CPU,   {#1148}
[01:11:37] STUDENT_1: network, both and memory also.   {#1149}
[01:11:39] STUDENT_1: Not really memory, but actually CPU and network mode.   {#1150}
[01:11:42] STUDENT_1: You are saving the CPU and network, that additional work that CPU   {#1151}
[01:11:47] STUDENT_1: network would have to do, like your database would have to put in the extra   {#1152}
[01:11:50] STUDENT_1: a CPU network to do that, you are saving that, which would dramatically reduce the load on   {#1153}
[01:11:55] TEACHER: your database.   {#1154}
[01:11:56] TEACHER: Given that the updates are micro updates, like just one row update.   {#1155}
[01:12:01] STUDENT_1: This will give you not only performance boost in your client side response time, but also   {#1156}
[01:12:07] STUDENT_1: will reduce load on your database, freeing it up to do other to fire other queries.   {#1157}
[01:12:12] TEACHER: It will save your infrastructure cost.   {#1158}
[01:12:14] TEACHER: You would make your database much, much, much, much more perform just by adding this connection.   {#1159}
[01:12:20] TEACHER: Comes another question.   {#1160}
[01:12:22] TEACHER: How many connections should you create?   {#1161}
[01:12:24] TEACHER: Now here with the connection pool that you have is when you define a connection pool,   {#1162}
[01:12:29] STUDENT_1: you define what is the minimum number of connections?   {#1163}
[01:12:32] STUDENT_1: What is the maximum number of connections?   {#1164}
[01:12:34] STUDENT_1: So minimum number of connections might be three.   {#1165}
[01:12:37] STUDENT_1: So we start with three.   {#1166}
[01:12:38] STUDENT_1: Let's say I got three concurrent requests.   {#1167}
[01:12:41] STUDENT_1: Each request pick one connection.   {#1168}
[01:12:43] STUDENT_1: They are firing it.   {#1169}
[01:12:44] STUDENT_1: Let's say that same time I got the fourth request.   {#1170}
[01:12:46] STUDENT_1: Now, when my fourth request would come in, it would say, oh,   {#1171}
[01:12:50] TEACHER: There are no available connections for me to use.   {#1172}
[01:12:54] TEACHER: What do I do?   {#1173}
[01:12:55] TEACHER: So here, the connection pool that you use.   {#1174}
[01:12:58] TEACHER: Now, database, MySQL, Postgres, Redis, everyone supports connection pooling.   {#1175}
[01:13:02] STUDENT_1: And there are libraries who manage it for you.   {#1176}
[01:13:05] STUDENT_1: But the idea is that how do you do?   {#1177}
[01:13:08] STUDENT_1: Let's say there are three established connections.   {#1178}
[01:13:11] STUDENT_1: Fourth concurrent request came in.   {#1179}
[01:13:14] STUDENT_1: It does not have a connection to make a call to the database.   {#1180}
[01:13:19] STUDENT_1: Now, what would you do?   {#1181}
[01:13:20] STUDENT_1: either it would wait for a connection to be freedom.   {#1182}
[01:13:24] STUDENT_1: So which means out of the three queries that were running,   {#1183}
[01:13:27] STUDENT_1: if one of them releases the connection,   {#1184}
[01:13:30] STUDENT_1: the database would pick that up.   {#1185}
[01:13:32] STUDENT_1: That is first.   {#1186}
[01:13:34] STUDENT_1: Second is if it does not want to wait,   {#1187}
[01:13:37] STUDENT_1: then what it can do is it can establish a new TCP connection   {#1188}
[01:13:42] STUDENT_1: with the database, fire the query,   {#1189}
[01:13:44] STUDENT_1: and add this connection back to the connection pool.   {#1190}
[01:13:48] STUDENT_1: So after this, you do not have three connections in connection pool, but four connections in connection pool.   {#1191}
[01:13:53] STUDENT_1: So this is stretching the connection pool on demand.   {#1192}
[01:13:57] STUDENT_1: So which is where if let's say there are millions of requests coming in, everyone creates their own connections and adds to the connection pool, then that's a problem.   {#1193}
[01:14:04] STUDENT_1: So you don't do that.   {#1194}
[01:14:05] STUDENT_1: So what do you do is you have a maximum limit on the connection pool, which tells it, hey, minimum three, maximum 100.   {#1195}
[01:14:12] TEACHER: So each server cannot create more than 100 connections to the database.   {#1196}
[01:14:17] TEACHER: that you can configure on a connection pool.   {#1197}
[01:14:19] TEACHER: This way what happens is if 100 are being used and 100 is the maximum,   {#1198}
[01:14:24] TEACHER: if 101st request comes in, it waits for any one of them to release it.   {#1199}
[01:14:29] TEACHER: And then it uses.   {#1200}
[01:14:30] STUDENT_1: But now given that every database has a limit on the number of TCP   {#1201}
[01:14:37] STUDENT_1: connections that it can hold, the problem that creeps in is what if there   {#1202}
[01:14:41] STUDENT_1: are hundreds of servers all creating 100 connections with the database.   {#1203}
[01:14:47] STUDENT_1: many active connections.   {#1204}
[01:14:48] STUDENT_1: So now what do you do?   {#1205}
[01:14:49] STUDENT_1: So it's a responsibility of the connection pool to terminate the connections that are   {#1206}
[01:14:56] STUDENT_1: unused.   {#1207}
[01:14:56] STUDENT_1: So you can also configure a time that says that this is the TTL of my connection.   {#1208}
[01:15:02] STUDENT_1: So if my SQL connection or if my TCP connection is not in use for let's say 10 minutes, terminate   {#1209}
[01:15:08] STUDENT_1: it.   {#1210}
[01:15:10] STUDENT_1: So this way, if there are four connections created from one API server to this database   {#1211}
[01:15:14] STUDENT_1: and if one of them is not in use for 10 minutes, it deletes it.   {#1212}
[01:15:18] STUDENT_1: This way, you reduce the number of connections on the database   {#1213}
[01:15:20] STUDENT_1: from a particular server.   {#1214}
[01:15:23] STUDENT_1: Now, where does this connection pull run?   {#1215}
[01:15:25] STUDENT_1: It's not a separate process.   {#1216}
[01:15:26] STUDENT_1: It's a simple TCP.   {#1217}
[01:15:28] STUDENT_1: When a server boots up, you create the database correction object   {#1218}
[01:15:34] STUDENT_1: that you create.   {#1219}
[01:15:35] STUDENT_1: You just create multiple database correction objects.   {#1220}
[01:15:38] STUDENT_1: As simple as that.   {#1221}
[01:15:39] STUDENT_1: You put them in a blocking queue and you read them as you need it.   {#1222}
[01:15:44] STUDENT_1: That's how the implementation of connection pool is.   {#1223}
[01:15:46] STUDENT_1: You can find connection pool implementation, a ton of them on GitHub.   {#1224}
[01:15:49] STUDENT_1: But the idea remains the same.   {#1225}
[01:15:51] STUDENT_1: All it does is creates multiple connections with the database,   {#1226}
[01:15:54] STUDENT_1: keeps them in a queue.   {#1227}
[01:15:55] STUDENT_1: It's a blocking queue.   {#1228}
[01:15:56] STUDENT_1: People make a call to the queue.   {#1229}
[01:15:58] STUDENT_1: If it has the entry, it gets it.   {#1230}
[01:16:00] STUDENT_1: It basically pops out from the queue.   {#1231}
[01:16:01] STUDENT_1: If it does not, it waits for someone else to put in.   {#1232}
[01:16:03] STUDENT_1: Until then, an infinite loop is run over here, which is the waiting part.   {#1233}
[01:16:08] STUDENT_1: So connection pool is not a service.   {#1234}
[01:16:10] STUDENT_1: For some reason, nowadays, everyone thinks everything is a service.   {#1235}
[01:16:13] STUDENT_1: No.   {#1236}
[01:16:14] STUDENT_1: Connection pool is a simple library that is running in the API server of yours,   {#1237}
[01:16:19] TEACHER: which is creating this pool of connections to the database.   {#1238}
[01:16:23] TEACHER: And this gives a massive, massive, massive, massive performance boost to your database   {#1239}
[01:16:30] STUDENT_1: and your response time. Why? Because here the updates are micro because all you are doing   {#1240}
[01:16:36] STUDENT_1: is just firing this one minuscule update where it is this one tiny minuscule update onto your   {#1241}
[01:16:44] STUDENT_1: one row by ID because this is also the primary key of the table literally goes to that B plus   {#1242}
[01:16:48] STUDENT_1: tree node and updates it right dead simple system so you don't want to waste a lot of time into doing   {#1243}
[01:16:56] STUDENT_1: something this expensive to fire one micro if it was a big SQL query then the time to run that   {#1244}
[01:17:03] STUDENT_1: query is long enough for you to outweigh the benefits that you get from the connection pool   {#1245}
[01:17:08] STUDENT_1: but here you'll get it because the updates are micro you'll get a massive performance boost   {#1246}
[01:17:15] TEACHER: And in any case, always, whenever you are writing something like this, not just online,   {#1247}
[01:17:20] TEACHER: offline, but see if you, if you are firing a bunch of micro updates on your database,   {#1248}
[01:17:25] TEACHER: having a connection pool and in general, having a connection pool is always a great option.   {#1249}
[01:17:29] TEACHER: So in case you don't have a connection pool in your existing code base, go see if you   {#1250}
[01:17:33] TEACHER: would want to add one, see the kind of benefits that you would get out of it.   {#1251}
[01:17:37] TEACHER: You might see a massive performance.   {#1252}
[01:17:40] TEACHER: Whatever we discussed with on and offline, you can literally control C and control V and   {#1253}
[01:17:45] TEACHER: build failure detection in a distributed system.   {#1254}
[01:17:48] TEACHER: Now there, here in online offline, your users were sending heartbeats.   {#1255}
[01:17:52] TEACHER: In a distributed system, all the nodes send a heartbeat to a central server that keeps   {#1256}
[01:17:57] TEACHER: track which one is alive and which one is not.   {#1257}
[01:17:59] TEACHER: For example, if you're building your own AWS, bunch of EC2 machines, you need to know when   {#1258}
[01:18:04] TEACHER: a machine is down.   {#1259}
[01:18:05] TEACHER: How do you know when heartbeat, when you don't receive heartbeat from that?   {#1260}
[01:18:09] TEACHER: And this exact same thing, some protocol differences here and there,   {#1261}
[01:18:12] TEACHER: but you can build a failure detection and distribute system.   {#1262}
[01:18:15] TEACHER: Right.   {#1263}
[01:18:15] TEACHER: Which is fair.   {#1264}
[01:18:16] TEACHER: Every single thing.   {#1265}
[01:18:18] TEACHER: That's why I always say, observe the pattern rather than the question   {#1266}
[01:18:21] TEACHER: and the answer that the system that we discussed is not just to do online   {#1267}
[01:18:25] TEACHER: offline, but it can just be a control C control V into a distributed system.   {#1268}
[01:18:30] TEACHER: When you have to want to do a failure detection and distribute system.   {#1269}
[01:18:32] TEACHER: Let's say we are building our own load balancer and you want to know if a   {#1270}
[01:18:35] TEACHER: machine, if a backend machine is done, you don't want to forward the   {#1271}
[01:18:39] TEACHER: machine what do you do you want to detect failures right that that's when you know okay i don't want   {#1272}
[01:18:43] TEACHER: to forward the request to this no machine anymore how do you do it the same system can work there   {#1273}
[01:18:47] TEACHER: right so observe the pattern observe the core properties that we need and then build an   {#1274}
[01:18:52] TEACHER: intuition around building systems right okay any questions on this specifically connection pool   {#1275}
[01:18:57] STUDENT_1: in case you have most people have questions or connection that's why i'm just probing it but   {#1276}
[01:19:01] STUDENT_4: any question on this on and offline part yes hey arpit so one question i have is uh see i   {#1277}
[01:19:09] STUDENT_4: that when you scale the api servers you can always make sure that some tcp connections you can get   {#1278}
[01:19:14] STUDENT_4: rid of and give the connections to the other api server right but they'll one time frame where the   {#1279}
[01:19:21] STUDENT_4: number of connections will be more than the total number of tcp connections right so how would that   {#1280}
[01:19:29] STUDENT_4: seem like imagine it's a special event and it's a blocking it will block it's a blocking thing   {#1281}
[01:19:33] STUDENT_1: because if your data if you would want one more collection your database cannot create because   {#1282}
[01:19:39] STUDENT_1: the TCP connection limit. If a database cannot let you create one more TCP connection, then this   {#1283}
[01:19:45] STUDENT_1: server that you are spinning up, the one that is trying to create this location would have to wait.   {#1284}
[01:19:49] STUDENT_1: It will just wait. It will have this loop. It will keep on trying to establish the connection forever.   {#1285}
[01:19:55] STUDENT_1: And it will succeed when any one of the existing server basically terminates the connection with   {#1286}
[01:20:01] STUDENT_4: the database and then this server would get it. So that is a problem, right?   {#1287}
[01:20:05] TEACHER: So then you have to scale up your database to handle large number of PCM   {#1288}
[01:20:08] TEACHER: connections.   {#1289}
[01:20:10] TEACHER: Okay.   {#1290}
[01:20:11] STUDENT_1: So if you know that you, it's basically the size of the database   {#1291}
[01:20:16] STUDENT_1: depends on the number of concurrent queries that you would fire on it.   {#1292}
[01:20:19] TEACHER: Right.   {#1293}
[01:20:20] TEACHER: Because the, the concurrency that you would want to support in a system   {#1294}
[01:20:25] TEACHER: would determine the number of concurrent connections that your   {#1295}
[01:20:28] STUDENT_1: database would need to handle.   {#1296}
[01:20:30] STUDENT_1: And in most cases, the database is limited by, or the most   {#1297}
[01:20:35] STUDENT_1: common bottleneck of a database is the maximum number of connections that it can handle.   {#1298}
[01:20:39] STUDENT_1: So you need to know the maximum connections that it can handle.   {#1299}
[01:20:42] STUDENT_1: And if you want to support concurrency more than that, you vertically scale your system.   {#1300}
[01:20:46] STUDENT_1: Otherwise, you go for sharding.   {#1301}
[01:20:47] STUDENT_1: So sharding and vertical scaling are based, which we'll discuss next week.   {#1302}
[01:20:50] TEACHER: But these are two common ways to do it.   {#1303}
[01:20:53] STUDENT_4: Okay, sure.   {#1304}
[01:20:54] STUDENT_4: And one last question.   {#1305}
[01:20:55] STUDENT_4: So if I'm going with Redis as a solution, most likely I'll be the one who, like, if I'm running   {#1306}
[01:21:00] STUDENT_4: my company, I'll be the one who will be managing it, right?   {#1307}
[01:21:03] STUDENT_4: So in this kind of scenario where I have to do auto scaling on the fly,   {#1308}
[01:21:07] STUDENT_4: don't you think DynamoDB will give a better value for the buck?   {#1309}
[01:21:10] STUDENT_1: If you are starting up, if you have a small team,   {#1310}
[01:21:13] STUDENT_1: you don't have ability to do that.   {#1311}
[01:21:16] STUDENT_1: You go for DynamoDB or any managed solution when you have a lean team.   {#1312}
[01:21:18] TEACHER: So that's where you would be more tilted to go towards DynamoDB versus Redis.   {#1313}
[01:21:25] TEACHER: If you have expertise, first of all,   {#1314}
[01:21:27] TEACHER: your team needs to have expertise to manage Redis.   {#1315}
[01:21:30] TEACHER: And I'm assuming self-hosted Redis.   {#1316}
[01:21:33] STUDENT_1: expertise in managing it. If they don't, then you don't go for that option.   {#1317}
[01:21:36] STUDENT_1: Second, you find a managed solution for Redis. Let's say with Redis lab, AWS,   {#1318}
[01:21:40] STUDENT_1: GCP, everyone has some varied of, you would use that. Right.   {#1319}
[01:21:43] STUDENT_1: The last, if you're having those team expertise and engineering bandwidth to   {#1320}
[01:21:46] STUDENT_1: manage it and whatnot, then you would do self-hosting. Otherwise go for a   {#1321}
[01:21:50] TEACHER: managed solution. You throw money at cloud providers and get things done.   {#1322}
[01:21:55] STUDENT_7: Okay, cool. Thank you very much.   {#1323}
[01:21:58] TEACHER: Any other question, anyone?   {#1324}
[01:22:00] TEACHER: uh hi uh next time please raise your hand uh it makes it easier for people to know when in queue   {#1325}
[01:22:08] STUDENT_2: but it's fine go on okay uh so i had one question uh like you said we can have a ttl   {#1326}
[01:22:16] STUDENT_2: expire in a connection so uh at the boot up time if 100 connection are created and a few   {#1327}
[01:22:22] STUDENT_2: connection had expired. So in that case, for example, if 50 connections are expired and   {#1328}
[01:22:28] STUDENT_2: again, uh, some, uh, uh, more requests are coming. So how does this happen again? Uh,   {#1329}
[01:22:34] TEACHER: it will be a TCP connection.   {#1330}
[01:22:35] TEACHER: They will create a new distribution and add it to the connection pool with the same expiration.   {#1331}
[01:22:41] STUDENT_1: So because you would have a mean and a max, right? Minimum number of connections, actual   {#1332}
[01:22:44] STUDENT_1: number of connections. So let's say maximum is set to a hundred, right? But now you only   {#1333}
[01:22:49] STUDENT_1: 50 but 51st request came in so it would establish a new connection and put it in the connection pool   {#1334}
[01:22:55] TEACHER: okay so every time there will be 100 connection no at max there will be 100   {#1335}
[01:23:01] TEACHER: okay that depends on the number of requests the number of requests that are coming in okay okay   {#1336}
[01:23:06] STUDENT_2: thank you yeah amrita um hi so um in a system like this where uh the number of db connections   {#1337}
[01:23:16] STUDENT_2: is like we have more frequent DB connections.   {#1338}
[01:23:21] STUDENT_14: Yeah.   {#1339}
[01:23:22] STUDENT_2: Is this the factor to decide how we scale our DB   {#1340}
[01:23:25] STUDENT_2: like rather than the how our data is present in DB   {#1341}
[01:23:31] STUDENT_2: like is number of connections the important factor   {#1342}
[01:23:33] STUDENT_2: to decide the scale of DB?   {#1343}
[01:23:34] TEACHER: Brilliant question.   {#1344}
[01:23:35] TEACHER: Brilliant question.   {#1345}
[01:23:36] TEACHER: Why number of connections is an important factor   {#1346}
[01:23:39] TEACHER: because updates are very small, right?   {#1347}
[01:23:42] STUDENT_1: It's a key value kind of access pattern.   {#1348}
---- OWNED SEGMENTS END ----

CTX| [01:23:46] STUDENT_1: You are literally going at a place and literally just updating one row.   {#1349}
CTX| [01:23:51] TEACHER: You are not firing massive analytics query.   {#1350}
CTX| [01:23:53] TEACHER: Your reads are also simple.   {#1351}
CTX| [01:23:54] TEACHER: Given a user, give me the row.   {#1352}
CTX| [01:23:57] TEACHER: So given this, reads are very fast, writes are very fast or very small.   {#1353}
CTX| [01:24:03] TEACHER: So the bottleneck becomes network.   {#1354}
CTX| [01:24:05] TEACHER: So that's why we are overstressing on the number of network connections that we are playing.   {#1355}
CTX| [01:24:10] TEACHER: So in this case, where you have micro reads and micro writes, network typically becomes   {#1356}
CTX| [01:24:16] TEACHER: And in network establishing the TCP connection becomes a botany.   {#1357}
CTX| [01:24:21] STUDENT_15: Got it.   {#1358}
CTX| [01:24:22] STUDENT_15: Yeah.   {#1359}
CTX| [01:24:23] STUDENT_15: Thanks.   {#1360}
CTX| [01:24:23] STUDENT_15: Yeah.   {#1361}
CTX| [01:24:24] STUDENT_15: Yeah.   {#1362}
CTX| [01:24:24] TEACHER: But in case you are firing queries that were massive aggregations, joining 10   {#1363}
CTX| [01:24:28] TEACHER: tables, 15 tables, where your average time to execute a SQL query was more   {#1364}
CTX| [01:24:33] TEACHER: than establishing a connection, then you would not stress more on this.   {#1365}
CTX| [01:24:37] TEACHER: You'd focus more on the CPU side and the memory side of the database.   {#1366}
CTX| [01:24:41] TEACHER: Got it.   {#1367}
CTX| [01:24:44] TEACHER: Yeah.   {#1368}
CTX| [01:24:45] TEACHER: Yeah.   {#1369}
CTX| [01:24:45] TEACHER: Sure.   {#1370}
CTX| [01:24:46] TEACHER: Yes, DK.   {#1371}
