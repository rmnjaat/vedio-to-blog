# chunk_08  OWNS 01:23:46 -> 01:34:18  (segments #1349-#1543, 1891 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:22:49] STUDENT_1: 50 but 51st request came in so it would establish a new connection and put it in the connection pool   {#1334}
CTX| [01:22:55] TEACHER: okay so every time there will be 100 connection no at max there will be 100   {#1335}
CTX| [01:23:01] TEACHER: okay that depends on the number of requests the number of requests that are coming in okay okay   {#1336}
CTX| [01:23:06] STUDENT_2: thank you yeah amrita um hi so um in a system like this where uh the number of db connections   {#1337}
CTX| [01:23:16] STUDENT_2: is like we have more frequent DB connections.   {#1338}
CTX| [01:23:21] STUDENT_14: Yeah.   {#1339}
CTX| [01:23:22] STUDENT_2: Is this the factor to decide how we scale our DB   {#1340}
CTX| [01:23:25] STUDENT_2: like rather than the how our data is present in DB   {#1341}
CTX| [01:23:31] STUDENT_2: like is number of connections the important factor   {#1342}
CTX| [01:23:33] STUDENT_2: to decide the scale of DB?   {#1343}
CTX| [01:23:34] TEACHER: Brilliant question.   {#1344}
CTX| [01:23:35] TEACHER: Brilliant question.   {#1345}
CTX| [01:23:36] TEACHER: Why number of connections is an important factor   {#1346}
CTX| [01:23:39] TEACHER: because updates are very small, right?   {#1347}
CTX| [01:23:42] STUDENT_1: It's a key value kind of access pattern.   {#1348}

---- OWNED SEGMENTS START ----
[01:23:46] STUDENT_1: You are literally going at a place and literally just updating one row.   {#1349}
[01:23:51] TEACHER: You are not firing massive analytics query.   {#1350}
[01:23:53] TEACHER: Your reads are also simple.   {#1351}
[01:23:54] TEACHER: Given a user, give me the row.   {#1352}
[01:23:57] TEACHER: So given this, reads are very fast, writes are very fast or very small.   {#1353}
[01:24:03] TEACHER: So the bottleneck becomes network.   {#1354}
[01:24:05] TEACHER: So that's why we are overstressing on the number of network connections that we are playing.   {#1355}
[01:24:10] TEACHER: So in this case, where you have micro reads and micro writes, network typically becomes   {#1356}
[01:24:16] TEACHER: And in network establishing the TCP connection becomes a botany.   {#1357}
[01:24:21] STUDENT_15: Got it.   {#1358}
[01:24:22] STUDENT_15: Yeah.   {#1359}
[01:24:23] STUDENT_15: Thanks.   {#1360}
[01:24:23] STUDENT_15: Yeah.   {#1361}
[01:24:24] STUDENT_15: Yeah.   {#1362}
[01:24:24] TEACHER: But in case you are firing queries that were massive aggregations, joining 10   {#1363}
[01:24:28] TEACHER: tables, 15 tables, where your average time to execute a SQL query was more   {#1364}
[01:24:33] TEACHER: than establishing a connection, then you would not stress more on this.   {#1365}
[01:24:37] TEACHER: You'd focus more on the CPU side and the memory side of the database.   {#1366}
[01:24:41] TEACHER: Got it.   {#1367}
[01:24:44] TEACHER: Yeah.   {#1368}
[01:24:45] TEACHER: Yeah.   {#1369}
[01:24:45] TEACHER: Sure.   {#1370}
[01:24:46] TEACHER: Yes, DK.   {#1371}
[01:24:47] TEACHER: Yeah.   {#1372}
[01:24:48] TEACHER: Hi, Arpit.   {#1373}
[01:24:49] TEACHER: So my question is also somewhere around this that see, when we want to scale a database,   {#1374}
[01:24:55] TEACHER: it is either, I mean, what I've seen till now is that, you know, when, when memory is   {#1375}
[01:24:58] TEACHER: a limit or, you know, when scalability is the issue, but the point which you have touched   {#1376}
[01:25:03] TEACHER: base right now is about the maximum number of conflict concurrent connections with the   {#1377}
[01:25:07] TEACHER: DB can handle.   {#1378}
[01:25:09] TEACHER: So what is this concurrent connection?   {#1379}
[01:25:11] TEACHER: It is like mentioned something on the, you know,   {#1380}
[01:25:15] TEACHER: documentation of DBs or is it something like we have to benchmark that,   {#1381}
[01:25:18] TEACHER: you know, how many concurrent connections this DB can handle.   {#1382}
[01:25:20] TEACHER: And if it is not able to, you know, handle those connections,   {#1383}
[01:25:23] TEACHER: then I should scale it now.   {#1384}
[01:25:24] TEACHER: So what is that parameter?   {#1385}
[01:25:26] TEACHER: Okay.   {#1386}
[01:25:27] TEACHER: So the maximum number of TCP connections that a server,   {#1387}
[01:25:30] TEACHER: let's see added database is also a server database is a process   {#1388}
[01:25:33] TEACHER: running in a server.   {#1389}
[01:25:34] TEACHER: Maximum number of connections that a server can handle depends on the   {#1390}
[01:25:38] TEACHER: RAM that it holds, depends on the network card.   {#1391}
[01:25:41] TEACHER: on that instance.   {#1392}
[01:25:42] TEACHER: Now here, if I assume that you are using a cloud provider,   {#1393}
[01:25:45] TEACHER: let's say AWS.   {#1394}
[01:25:46] TEACHER: On AWS, if you're using RDS or any database,   {#1395}
[01:25:49] TEACHER: it gives you a formula that you can fire and see the number.   {#1396}
[01:25:53] TEACHER: Now it also shows it on the UI, the number of TCP connections   {#1397}
[01:25:57] TEACHER: that a database can handle.   {#1398}
[01:25:58] TEACHER: So if you are using a managed service,   {#1399}
[01:26:00] TEACHER: the managed services documentation   {#1400}
[01:26:01] TEACHER: would have this information that this size of database   {#1401}
[01:26:05] TEACHER: handles these many connections or these many concurrent   {#1402}
[01:26:07] TEACHER: connections.   {#1403}
[01:26:08] STUDENT_1: If you are doing self-managed, then do a benchmark.   {#1404}
[01:26:12] STUDENT_1: You pick a machine that is having high network capacity and then you do a benchmark to see   {#1405}
[01:26:16] STUDENT_1: the number of concurrent connections that it can hold.   {#1406}
[01:26:20] STUDENT_1: Now here, the number of concurrent connections that you can manage also depends on the kind   {#1407}
[01:26:25] STUDENT_1: of load that you are putting in.   {#1408}
[01:26:27] STUDENT_1: Because if you're having a very high sustained load on the database, it might not be able   {#1409}
[01:26:31] STUDENT_1: to fulfill that.   {#1410}
[01:26:32] STUDENT_1: So it's always better to benchmark and see.   {#1411}
[01:26:35] STUDENT_1: but in most cases you would have to go for an instance   {#1412}
[01:26:39] STUDENT_1: that is having a dedicated attached network card,   {#1413}
[01:26:43] STUDENT_1: maybe multiple of them.   {#1414}
[01:26:45] STUDENT_1: And every cloud provider has this special class of instances   {#1415}
[01:26:48] TEACHER: that offers you high network bandwidth   {#1416}
[01:26:51] TEACHER: for you to support large number of TCP connections.   {#1417}
[01:26:55] TEACHER: So these are the steps that you would want to take   {#1418}
[01:26:58] TEACHER: to find that limit that you have.   {#1419}
[01:27:01] TEACHER: So overall there are two parameters to scale the DB.   {#1420}
[01:27:05] TEACHER: concurrent connection and one is the size of the db when when we start deciding whether we have to   {#1421}
[01:27:10] TEACHER: vertical scale it or you know horizontal scale it so these are the two deciding factors right   {#1422}
[01:27:14] TEACHER: to scale a db many memory cpu disk and network there are only four things in computer science   {#1423}
[01:27:20] TEACHER: only four memory cpu disk and network there is no fifth obviously basically gpu i'm basically   {#1424}
[01:27:28] STUDENT_1: putting it in cpu right so these four things determine the scaling because there are some   {#1425}
[01:27:32] STUDENT_1: use cases which are CPU intensive.   {#1426}
[01:27:34] STUDENT_1: For example, high, if you are doing massive aggregations on your data, that's CPU intensive.   {#1427}
[01:27:39] STUDENT_1: There is memory intensive where you're pulling in a lot of data that you would want to process   {#1428}
[01:27:43] STUDENT_1: like massive joins that you are doing.   {#1429}
[01:27:46] STUDENT_1: Then disk where you're storing large amount of data on the disk and that is becoming the   {#1430}
[01:27:50] STUDENT_1: border where you need, basically your data warehouse is followed to this category where   {#1431}
[01:27:56] STUDENT_1: you have massive data that you are storing or doing massive processing, but the amount   {#1432}
[01:28:03] STUDENT_1: And then becomes network that your amount of queries that you would want to   {#1433}
[01:28:07] STUDENT_1: fire on a server is limited by the network capacity of that machine,   {#1434}
[01:28:12] STUDENT_1: or in this case database.   {#1435}
[01:28:14] STUDENT_1: These are the four parameters that we always have to think about.   {#1436}
[01:28:17] STUDENT_1: Everything else is just like focus, focus.   {#1437}
[01:28:20] STUDENT_1: Like these four are the key things on which you define scaling,   {#1438}
[01:28:23] STUDENT_1: horizontal or vertical, because vertical scaling has a limit.   {#1439}
[01:28:26] STUDENT_1: But if you're building a good distributed system, make it horizontally scalable,   {#1440}
[01:28:30] STUDENT_1: which is where sharding,   {#1441}
[01:28:32] STUDENT_7: comes up. Got it. But yeah, thanks. Yeah. So do you have kind of share any idea how it's kind of   {#1442}
[01:28:44] STUDENT_7: build some intuition about when exactly to use, you know, connection pulling number one, right?   {#1443}
[01:28:51] STUDENT_7: So you're saying always, always use, right? Okay, fine. So, okay. I thought that would be the answer.   {#1444}
[01:28:56] STUDENT_7: But anyway, so the follow-up question is actually, so how do you know, like, what is the minimum and   {#1445}
[01:29:02] STUDENT_7: maximum to set do you always set it to the server's capacity or is there   {#1446}
[01:29:10] STUDENT_7: is there a way to swimming out or uh you know how many they are being kind of added to the pool   {#1447}
[01:29:22] STUDENT_1: and you know or we just leave it to the server okay so uh minimum typically people start with   {#1448}
[01:29:27] STUDENT_1: three or five, right?   {#1449}
[01:29:29] STUDENT_1: So, because anyway, you can create a connections on the fly.   {#1450}
[01:29:33] STUDENT_1: When your connection pool exhausted, you can create connections on the fly.   {#1451}
[01:29:37] STUDENT_1: Now, how do you define the maximum one for that?   {#1452}
[01:29:39] STUDENT_1: You need to know the maximum number of connections that your database can   {#1453}
[01:29:43] STUDENT_1: support divided by the maximum number of servers that you would have at any   {#1454}
[01:29:46] STUDENT_1: point in time.   {#1455}
[01:29:47] STUDENT_1: So let's say the maximum number of servers that you would have at any   {#1456}
[01:29:49] STUDENT_1: point in time is 100 and your database can handle at max 1000 connections,   {#1457}
[01:29:55] STUDENT_1: 1000 divided by 100, which means the maximum for each server can be 10.   {#1458}
[01:30:01] STUDENT_1: So simple max and you would be able to do that.   {#1459}
[01:30:04] STUDENT_1: So instead of setting it to 10, you can set it to 15.   {#1460}
[01:30:06] STUDENT_1: A server might get large number of requests than other servers.   {#1461}
[01:30:09] STUDENT_1: So then you can set it max to 15 because if your database is not able to establish a connection,   {#1462}
[01:30:14] STUDENT_1: then your server would anyway be waiting.   {#1463}
[01:30:15] STUDENT_1: So maximum is typically 1.2x of the average.   {#1464}
[01:30:19] STUDENT_1: That's the standard that I've seen.   {#1465}
[01:30:21] STUDENT_1: or rather that's a practice that I've seen, not the standard,   {#1466}
[01:30:23] STUDENT_1: but the practice that I've seen, 1.2x of the average.   {#1467}
[01:30:27] STUDENT_1: So maximum number of connections that your database can support   {#1468}
[01:30:29] STUDENT_1: divided by maximum number of servers that you would have.   {#1469}
[01:30:32] STUDENT_1: And that's how you can do it.   {#1470}
[01:30:33] STUDENT_1: But have the right telemetry, have the right things that you monitor,   {#1471}
[01:30:37] STUDENT_1: that how is your connection pool performing,   {#1472}
[01:30:43] STUDENT_1: what are the maximum number of connections that are, sorry,   {#1473}
[01:30:45] STUDENT_1: what are the number of connections in the connection pool   {#1474}
[01:30:47] STUDENT_1: at any given moment, what are the number of servers.   {#1475}
[01:30:51] STUDENT_1: If you give your production system one week, you will have those numbers on which you would   {#1476}
[01:30:54] STUDENT_1: be able to tune it better.   {#1477}
[01:30:56] TEACHER: But the best way to tune it is start with a conservative mindset, observe the metrics   {#1478}
[01:31:03] TEACHER: and then retune it.   {#1479}
[01:31:06] STUDENT_1: That's the funder behind it.   {#1480}
[01:31:10] STUDENT_1: Does that answer?   {#1481}
[01:31:12] STUDENT_7: Yeah.   {#1482}
[01:31:12] STUDENT_7: Okay.   {#1483}
[01:31:13] STUDENT_7: Thank you.   {#1484}
[01:31:13] STUDENT_7: The video was stopping for me.   {#1485}
[01:31:17] STUDENT_7: Your internet is a bit laggy, but I think my internet is in trouble.   {#1486}
[01:31:23] STUDENT_7: No problem.   {#1487}
[01:31:24] STUDENT_7: Sure.   {#1488}
[01:31:25] STUDENT_7: Thanks.   {#1489}
[01:31:26] STUDENT_7: Sure.   {#1490}
[01:31:27] STUDENT_1: Rahul.   {#1491}
[01:31:29] STUDENT_3: So basically my question is about, let's just say like tomorrow is a festival.   {#1492}
[01:31:37] STUDENT_3: Let's just say any, any festival and the number of users who are going to be online, like   {#1493}
[01:31:43] STUDENT_3: increased by two weeks.   {#1494}
[01:31:45] STUDENT_3: Let's just say.   {#1495}
[01:31:47] STUDENT_3: Okay. So in that case, in that case, what happens is connection polling actually kind of like messes things up.   {#1496}
[01:31:57] STUDENT_3: Like in the sense, like time to update, time to update in the database is more than the amount of requests that are coming.   {#1497}
[01:32:07] STUDENT_3: Okay. And that is happening just for the one because it's faster.   {#1498}
[01:32:11] STUDENT_3: So in that case, like, uh, I'm actually, uh, kind of like confused about, uh, what should   {#1499}
[01:32:17] STUDENT_3: be the approach that we should take?   {#1500}
[01:32:20] STUDENT_3: Like, uh, one of the things that I can think of, like, uh, we can increase, uh, vertically   {#1501}
[01:32:25] STUDENT_3: scale the systems that we have.   {#1502}
[01:32:27] STUDENT_1: Always.   {#1503}
[01:32:28] STUDENT_3: Uh, but like, uh, I don't find it like feasible for just, uh, doing it just for, but then   {#1504}
[01:32:35] STUDENT_1: you reduce it also.   {#1505}
[01:32:36] STUDENT_1: Right.   {#1506}
[01:32:37] STUDENT_1: You scale it up and you basically bring it down.   {#1507}
[01:32:42] STUDENT_1: right because if you know that you would have to handle those much of requests you'd have to do it   {#1508}
[01:32:45] STUDENT_1: there is no way out your database needs to support those many concurrent requests that you are aiming   {#1509}
[01:32:48] STUDENT_1: for if it's 2x then you need to ensure first of all the database supports that and then you would   {#1510}
[01:32:54] TEACHER: then you would tune your connection pool in order to accept those many requests right so vertical   {#1511}
[01:33:00] TEACHER: scaling your database is obviously there's nothing wrong in that but over time it's still day one let   {#1512}
[01:33:07] TEACHER: let a course progress.   {#1513}
[01:33:09] TEACHER: Over time, you will have answers to this.   {#1514}
[01:33:10] TEACHER: When we discuss FlashSane,   {#1515}
[01:33:11] TEACHER: you will have a very good answer for this.   {#1516}
[01:33:14] STUDENT_1: But for now,   {#1517}
[01:33:17] STUDENT_1: vertical scale your DB   {#1518}
[01:33:18] STUDENT_1: to ensure that the number of concurrent requests   {#1519}
[01:33:20] STUDENT_1: that you would want to handle,   {#1520}
[01:33:21] STUDENT_1: you are able to handle that, first of all.   {#1521}
[01:33:23] STUDENT_1: And then you may have to tune   {#1522}
[01:33:25] STUDENT_1: your connection pool maximum,   {#1523}
[01:33:28] TEACHER: may not be minimum,   {#1524}
[01:33:28] TEACHER: but the maximum size of a connection pool   {#1525}
[01:33:30] TEACHER: because if you are scaling up   {#1526}
[01:33:31] TEACHER: your vertical scaling your servers also,   {#1527}
[01:33:33] TEACHER: it can handle large number of requests.   {#1528}
[01:33:35] TEACHER: So you will need a bit of tuning on that.   {#1529}
[01:33:37] TEACHER: Knowing the tech unit economic is very important when you are operating in real world.   {#1530}
[01:33:44] TEACHER: So have the right set of monitoring tools which helps you make this decision.   {#1531}
[01:33:51] TEACHER: Okay.   {#1532}
[01:33:52] TEACHER: Gaurav and Mohit, I'll take your question at the end.   {#1533}
[01:33:55] TEACHER: Now what we'll do is we'll take a break.   {#1534}
[01:33:56] TEACHER: And by the way, in every session, we take one break for five to seven minutes.   {#1535}
[01:34:02] TEACHER: Today we'll take a break for five minutes.   {#1536}
[01:34:03] TEACHER: We'll sink back at 10.40.   {#1537}
[01:34:05] STUDENT_1: and then next 20-25 minutes   {#1538}
[01:34:07] STUDENT_1: we'll discuss database and then   {#1539}
[01:34:09] STUDENT_1: 20-25 minutes we'll discuss   {#1540}
[01:34:11] TEACHER: caching and this way by 11.30 we'll have   {#1541}
[01:34:13] TEACHER: everything done. We'll take 5 minutes break   {#1542}
[01:34:15] TEACHER: it has been a lot so   {#1543}
---- OWNED SEGMENTS END ----

CTX| [01:34:18] TEACHER: spend your time   {#1544}
CTX| [01:34:20] TEACHER: having a break   {#1545}
CTX| [01:34:21] TEACHER: basically sip some coffee, have some   {#1546}
CTX| [01:34:23] TEACHER: water and we'll sink back at   {#1547}
CTX| [01:34:25] TEACHER: 10.40 5 minutes from   {#1548}
CTX| [01:34:27] TEACHER: now and we'll resume our discussion on   {#1549}
CTX| [01:34:29] TEACHER: foundational topics. Database and caching   {#1550}
CTX| [01:34:31] TEACHER: is what we'll cover today and other four   {#1551}
CTX| [01:34:33] TEACHER: we'll cover at the end. Bye.   {#1552}
CTX| [01:34:35] TEACHER: Okay, job.   {#1553}
CTX| [01:34:36] TEACHER: Thanks folks.   {#1554}
CTX| [01:34:37] TEACHER: See you folks at 10.40 in five minutes.   {#1555}
