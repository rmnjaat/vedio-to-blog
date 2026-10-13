# chunk_08  OWNS 01:21:35 -> 01:32:59  (segments #1403-#1605, 1892 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:20:37] TEACHER: in memory, in memory hash map that it has?   {#1381}
CTX| [01:20:42] TEACHER: Anwar, how would you do that?   {#1382}
CTX| [01:20:46] STUDENT_7: Like the most naive way would be for the LB server to keep pulling, but that would not   {#1383}
CTX| [01:20:51] STUDENT_7: be an optimal way to.   {#1384}
CTX| [01:20:53] TEACHER: Why?   {#1385}
CTX| [01:20:53] TEACHER: Why that is, why that wouldn't work?   {#1386}
CTX| [01:20:57] STUDENT_7: Because the process is consuming some latency to first figure out if the, like intermittently   {#1387}
CTX| [01:21:04] STUDENT_7: it is first figuring out if backend servers are alive or not.   {#1388}
CTX| [01:21:07] STUDENT_7: And at the same time, it is also getting a barrage of requests from end users.   {#1389}
CTX| [01:21:11] STUDENT_7: So some of those requests will experience more latency when it is.   {#1390}
CTX| [01:21:16] TEACHER: No, no, no.   {#1391}
CTX| [01:21:17] TEACHER: Orkastator is doing it.   {#1392}
CTX| [01:21:18] TEACHER: User requests are coming to LB server.   {#1393}
CTX| [01:21:20] TEACHER: Orkastator, there is no effect on that.   {#1394}
CTX| [01:21:23] STUDENT_7: But the LB server would be polling to figure out this, right?   {#1395}
CTX| [01:21:27] STUDENT_7: Okay.   {#1396}
CTX| [01:21:28] STUDENT_7: Okay.   {#1397}
CTX| [01:21:28] TEACHER: This one, this one you're talking about.   {#1398}
CTX| [01:21:29] TEACHER: Okay.   {#1399}
CTX| [01:21:29] TEACHER: This would be keeping on polling on doing this.   {#1400}
CTX| [01:21:31] TEACHER: Okay.   {#1401}
CTX| [01:21:32] TEACHER: So then is there a better way?   {#1402}

---- OWNED SEGMENTS START ----
[01:21:35] STUDENT_7: Instead of polling, like if there was a way for the database to communicate it to   {#1403}
[01:21:41] STUDENT_7: Maybe in base solution, which triggers this, which, which gets triggered when this change happens.   {#1404}
[01:21:47] STUDENT_7: Got it.   {#1405}
[01:21:48] TEACHER: So you reached that point, right?   {#1406}
[01:21:50] TEACHER: But now just one more point to add on that where you said that it is already handling   {#1407}
[01:21:54] TEACHER: because now it also has to pull much more than that.   {#1408}
[01:21:57] TEACHER: The problem is that polling has a frequency.   {#1409}
[01:22:00] TEACHER: Let's say 10 seconds.   {#1410}
[01:22:02] TEACHER: Now let's say your backend server crashed over here.   {#1411}
[01:22:07] TEACHER: the next poll is happening over here.   {#1412}
[01:22:09] TEACHER: So for these much of time.   {#1413}
[01:22:11] TEACHER: So let's say this was first second.   {#1414}
[01:22:13] TEACHER: This is nine and this is the 10th second for nine seconds.   {#1415}
[01:22:17] TEACHER: Your request will still continue to go to backhand server.   {#1416}
[01:22:19] TEACHER: Even though that's dead.   {#1417}
[01:22:22] TEACHER: So you cannot.   {#1418}
[01:22:23] TEACHER: So for your polling frequency,   {#1419}
[01:22:25] TEACHER: if it happens at the first segment of a polling frequency for last N minus one second,   {#1420}
[01:22:30] TEACHER: it would still keep sending request to backhand server too,   {#1421}
[01:22:32] TEACHER: even though it is dead.   {#1422}
[01:22:33] TEACHER: So because it is not checking the DB every time it is just, it is just when a new request comes in from the client, it just refers to this in-memory structure, the configuration, and just forwards the request to that.   {#1423}
[01:22:45] TEACHER: Now, because this is not updated, the request would still continue to go to backend server too, even though that's dead.   {#1424}
[01:22:51] TEACHER: So for this much of duration, you still have your user request not being handled successfully, which is spike in error rate for your end user.   {#1425}
[01:22:59] TEACHER: So that's wrong.   {#1426}
[01:23:00] TEACHER: That's the main reason why you cannot poll.   {#1427}
[01:23:03] TEACHER: That is very inefficient.   {#1428}
[01:23:05] TEACHER: Okay.   {#1429}
[01:23:06] TEACHER: So what's the solution?   {#1430}
[01:23:08] TEACHER: Rahul, how would you solve this?   {#1431}
[01:23:10] STUDENT_4: First thing is like I would like to like touch polling and resolve a port on load balancer   {#1432}
[01:23:18] STUDENT_4: for actually updating the configuration.   {#1433}
[01:23:21] STUDENT_4: Basically like an endpoint which updates the configuration whenever it is formed.   {#1434}
[01:23:25] STUDENT_4: Okay.   {#1435}
[01:23:25] STUDENT_4: So let's just say orchestrator is like polling all these targets for if they are available or not.   {#1436}
[01:23:34] STUDENT_4: Okay.   {#1437}
[01:23:34] STUDENT_4: If they are available, like if there is a change in configuration, orchestrator can check that.   {#1438}
[01:23:39] STUDENT_4: If there is a change in configuration, we can just call LB to update that configuration instead of like polling.   {#1439}
[01:23:48] TEACHER: So you're saying orchestrator directly making call to LB on this other port to update it?   {#1440}
[01:23:53] STUDENT_4: Yeah, for updating the configuration.   {#1441}
[01:23:55] STUDENT_4: DB, then it will get, get the configuration from the DB. Okay.   {#1442}
[01:24:00] STUDENT_4: Similarly, we can have another basically container or you can say app,   {#1443}
[01:24:04] STUDENT_4: which is, you can say load balancer handler, which basically like,   {#1444}
[01:24:09] STUDENT_4: which basically checks, like, which also checks like,   {#1445}
[01:24:13] STUDENT_4: like orchestrator is for like health check. Okay.   {#1446}
[01:24:17] STUDENT_4: And like for like, for like,   {#1447}
[01:24:21] STUDENT_4: let's just say there is some, someone updated this DB configuration.   {#1448}
[01:24:25] STUDENT_4: he added one more target.   {#1449}
[01:24:27] STUDENT_4: Okay.   {#1450}
[01:24:28] STUDENT_4: We can,   {#1451}
[01:24:29] STUDENT_4: we can have some kind of load balancer handler,   {#1452}
[01:24:32] STUDENT_4: which can basically check,   {#1453}
[01:24:33] STUDENT_4: which can also check,   {#1454}
[01:24:34] STUDENT_4: like if there is any,   {#1455}
[01:24:36] STUDENT_4: like a change in configuration.   {#1456}
[01:24:38] STUDENT_4: No,   {#1457}
[01:24:39] STUDENT_4: that all,   {#1458}
[01:24:39] STUDENT_4: let,   {#1459}
[01:24:39] TEACHER: let LB server itself,   {#1460}
[01:24:40] TEACHER: let,   {#1461}
[01:24:41] TEACHER: let,   {#1462}
[01:24:41] TEACHER: let the orchestrator do that.   {#1463}
[01:24:43] TEACHER: Why I have one more service to do that.   {#1464}
[01:24:45] TEACHER: Yeah,   {#1465}
[01:24:45] TEACHER: yeah,   {#1466}
[01:24:45] TEACHER: yeah,   {#1467}
[01:24:45] STUDENT_4: yeah,   {#1468}
[01:24:46] STUDENT_4: yeah,   {#1469}
[01:24:47] STUDENT_4: sure.   {#1470}
[01:24:47] STUDENT_4: So basically like the simple change would be like orchestrator checks if the,   {#1471}
[01:24:52] STUDENT_4: like configuration is changed by someone or like,   {#1472}
[01:24:57] STUDENT_4: any target is down, basically update in the DB and basically call the load balancer.   {#1473}
[01:25:07] STUDENT_4: The configuration has been updated.   {#1474}
[01:25:09] STUDENT_4: Please pull from the DB.   {#1475}
[01:25:11] TEACHER: Okay.   {#1476}
[01:25:12] TEACHER: So you are suggesting a push-based mechanism.   {#1477}
[01:25:16] TEACHER: Let's come.   {#1478}
[01:25:16] TEACHER: So let's say you are developer with LB console APIs.   {#1479}
[01:25:21] TEACHER: You update this database, something around this.   {#1480}
[01:25:24] TEACHER: So now what is happening is, for example, you get AWS console access in which you are   {#1481}
[01:25:28] TEACHER: explicitly adding a new backend server.   {#1482}
[01:25:31] TEACHER: You are doing it.   {#1483}
[01:25:32] TEACHER: You want to handle some external.   {#1484}
[01:25:33] TEACHER: So you explicitly added a bunch of backend servers into it.   {#1485}
[01:25:36] TEACHER: Now that's just happening through AWS console.   {#1486}
[01:25:38] TEACHER: Now that configuration needs to be updated in this database for it to get updated, reflected   {#1487}
[01:25:43] TEACHER: over here.   {#1488}
[01:25:44] TEACHER: Okay.   {#1489}
[01:25:45] TEACHER: Any change in configuration, hell check through here or any change in configuration by any   {#1490}
[01:25:51] TEACHER: developer, adding more backend servers, changing load financing algorithm, changing health check   {#1491}
[01:25:56] TEACHER: status, anything would need to be updated over here.   {#1492}
[01:25:59] TEACHER: Now this needs to be communicated over here.   {#1493}
[01:26:03] TEACHER: Like you need to change this in memory copy.   {#1494}
[01:26:06] TEACHER: So what you propose is whoever is changing this should make a call to this another port   {#1495}
[01:26:13] TEACHER: and ask it to pull it from the DB.   {#1496}
[01:26:16] TEACHER: That's one of them.   {#1497}
[01:26:16] TEACHER: Yeah.   {#1498}
[01:26:18] TEACHER: This would be near immediate.   {#1499}
[01:26:20] TEACHER: Okay.   {#1500}
[01:26:21] TEACHER: Yeah, let me talk about few disadvantages and advantages of it.   {#1501}
[01:26:25] TEACHER: And obviously there is no one right answer.   {#1502}
[01:26:26] TEACHER: Your answer is also correct.   {#1503}
[01:26:28] TEACHER: It works in some situations.   {#1504}
[01:26:29] TEACHER: My solution is also correct.   {#1505}
[01:26:30] TEACHER: It works in some other situations, right?   {#1506}
[01:26:32] TEACHER: Because everything is a trade off, right?   {#1507}
[01:26:34] TEACHER: That's the best one.   {#1508}
[01:26:34] TEACHER: There is no one right answer.   {#1509}
[01:26:35] TEACHER: Okay.   {#1510}
[01:26:36] TEACHER: Let me, let me, let me cover those things.   {#1511}
[01:26:39] TEACHER: Okay.   {#1512}
[01:26:39] TEACHER: So here the approach that is suggested is a good one.   {#1513}
[01:26:44] TEACHER: What is suggested is that this load balancer server is having a process   {#1514}
[01:26:51] TEACHER: 9090 we saw that apart from that have one more process which is running on port 9091.   {#1515}
[01:26:58] TEACHER: This may be a meta port or something in which whenever a configuration is you can just whoever   {#1516}
[01:27:04] TEACHER: changing this configuration you can just make a normal call to this port and the handler   {#1517}
[01:27:08] TEACHER: of this port would be that make a call to database and update the in-memory configuration   {#1518}
[01:27:12] TEACHER: over here.   {#1519}
[01:27:14] TEACHER: That is what is suggested as an approach.   {#1520}
[01:27:17] TEACHER: I'll give other way to do it.   {#1521}
[01:27:19] TEACHER: I'll use the learnings from our last session.   {#1522}
[01:27:22] TEACHER: In our last session.   {#1523}
[01:27:24] TEACHER: So here the problem is polling doesn't work.   {#1524}
[01:27:28] TEACHER: Polling doesn't work because there is a chance of we serving or we still serving or we still   {#1525}
[01:27:33] TEACHER: operating on the stale data.   {#1526}
[01:27:35] TEACHER: We want zero stillness, almost zero stillness.   {#1527}
[01:27:38] TEACHER: So what do we do?   {#1528}
[01:27:39] TEACHER: We have to ensure that whenever something changes, we want to immediately send it to   {#1529}
[01:27:45] TEACHER: folks in the previous system when we designed uh slacks real-time communication we saw this very   {#1530}
[01:27:52] TEACHER: problem that we could not rely on polling we wanted things to be immediately pushed and sent out so   {#1531}
[01:27:59] TEACHER: we already know a solution that could work well which is a real-time pub sub and this is one of   {#1532}
[01:28:07] TEACHER: the implementation this is not only implementation this is one of the implementation where what you   {#1533}
[01:28:12] TEACHER: can do is you can have a real-time pub sub like redis whose job is that whenever you update   {#1534}
[01:28:18] TEACHER: something in the db it pushes a message via cdc i'm just adding cdc we'll talk about cdc in depth   {#1535}
[01:28:24] TEACHER: in fifth week i'm just adding i'm just sprinkling that top that whenever there is a change in   {#1536}
[01:28:30] TEACHER: database you get an update automatically into your broker and that is listened by this lb server   {#1537}
[01:28:39] TEACHER: Similar to how we made our LB server or we listened to changes the last time for the membership information and whatnot in order to send a messages to other users.   {#1538}
[01:28:49] TEACHER: We do something similar.   {#1539}
[01:28:50] TEACHER: Whenever there is a change in the configuration.   {#1540}
[01:28:53] TEACHER: So either your orchestrator can do this part, your LB console can also directly push message to broker or your database using CDC can also do that.   {#1541}
[01:29:04] TEACHER: We'll talk in depth about CDC.   {#1542}
[01:29:05] TEACHER: I just wanted to give you a sneak peek of that something like this exists.   {#1543}
[01:29:09] TEACHER: So in case you don't understand it, it's fine.   {#1544}
[01:29:11] TEACHER: We'll cover it in depth in fifth way.   {#1545}
[01:29:13] TEACHER: But the idea is that whole base thing wasn't working.   {#1546}
[01:29:18] TEACHER: So we went for push base thing.   {#1547}
[01:29:20] TEACHER: We wanted immediate reactivity.   {#1548}
[01:29:23] TEACHER: We need to make things reactive rather than polling based.   {#1549}
[01:29:28] TEACHER: This way we minimize the time.   {#1550}
[01:29:30] TEACHER: So when the request comes in updates, any update in the database and   {#1551}
[01:29:34] TEACHER: event is sent to this consumed by this.   {#1552}
[01:29:39] TEACHER: it or you ask your LB server to pull the latest config from the DB implementation up to you.   {#1553}
[01:29:44] TEACHER: But the idea is instead of doing poll based do it in a reactive way.   {#1554}
[01:29:48] TEACHER: So we discussed two approaches to make it reactive.   {#1555}
[01:29:51] TEACHER: One using an explicit API call that ask it to pull it.   {#1556}
[01:29:55] TEACHER: Otherwise use this a reactive mechanism to push the configuration to my LB server.   {#1557}
[01:30:01] TEACHER: And LB server would just update its in-memory copy of this by shared memory between processes.   {#1558}
[01:30:06] TEACHER: One of the two.   {#1559}
[01:30:07] TEACHER: That's fine.   {#1560}
[01:30:09] TEACHER: way right at that implementation is up to you some would work in some cases other would work in other   {#1561}
[01:30:14] TEACHER: but at that the idea remains same polling wouldn't work so you want to make it reactive multiple ways   {#1562}
[01:30:20] TEACHER: to do it okay now let's touch upon a critical point that there is a chance of my back-end servers   {#1563}
[01:30:31] TEACHER: They are okay.   {#1564}
[01:30:32] TEACHER: Backend servers, healthy and healthy.   {#1565}
[01:30:34] TEACHER: You kept an eye on, but there is also a need for someone to keep an eye on this LB servers   {#1566}
[01:30:41] TEACHER: also.   {#1567}
[01:30:42] TEACHER: That, Hey, what if this server is overwhelmed?   {#1568}
[01:30:45] TEACHER: Who would do that?   {#1569}
[01:30:46] TEACHER: You have an orchestrator that is there to keep an eye on your LB servers.   {#1570}
[01:30:53] TEACHER: You do that.   {#1571}
[01:30:55] TEACHER: Orchestrator is keeping an eye.   {#1572}
[01:30:56] TEACHER: Now what is keeping an eye mean?   {#1573}
[01:30:58] TEACHER: It does not just mean that health check is okay or not.   {#1574}
[01:31:02] TEACHER: It also means that is the server overwhelmed CPU, memory and whatnot.   {#1575}
[01:31:08] TEACHER: So how would, because then depending on this orchestrators keeping an eye on LB server,   {#1576}
[01:31:15] TEACHER: if it sees very high CPU consumption, it might just want to add one more LB server into the system.   {#1577}
[01:31:25] TEACHER: So that the load is balanced.   {#1578}
[01:31:27] TEACHER: Like you can horizontally because you also need to horizontally scale LB servers.   {#1579}
[01:31:31] TEACHER: right so one lb server is definitely not enough to do it so how would orchestrator know the cpu   {#1580}
[01:31:39] TEACHER: and memory metrics of this lb cpu memory network desk everything those key vitals   {#1581}
[01:31:46] TEACHER: of your lb server so that it knows that it's time to add one more lb server into the scheme of things   {#1582}
[01:31:52] TEACHER: and then one more lb server into the scheme of things oh now the load is reduced i can remove   {#1583}
[01:31:57] TEACHER: one LP server from the scheme of things.   {#1584}
[01:31:59] TEACHER: Right?   {#1585}
[01:31:59] TEACHER: So orchestrator needs those vitals information.   {#1586}
[01:32:02] TEACHER: How would it get it?   {#1587}
[01:32:03] STUDENT_1: Gaurav?   {#1588}
[01:32:07] STUDENT_1: Before that, can I try to answer the communication between DB and LP that we were just discussing?   {#1589}
[01:32:13] STUDENT_1: First, let's do that.   {#1590}
[01:32:15] STUDENT_1: I've set the content.   {#1591}
[01:32:17] STUDENT_1: About this, I think normal status and help checks that we discussed about between orchestrator   {#1592}
[01:32:23] STUDENT_1: and...   {#1593}
[01:32:24] TEACHER: So, another...   {#1594}
[01:32:25] TEACHER: But see, is this realistic implementation?   {#1595}
[01:32:27] TEACHER: Think about it.   {#1596}
[01:32:30] TEACHER: Like this, whenever, so you are saying orchestrator would make API call to HLB   {#1597}
[01:32:34] TEACHER: server and periodically check what's the current CPU memory and disk   {#1598}
[01:32:38] TEACHER: utilization of it.   {#1599}
[01:32:39] TEACHER: What if it needs historical data?   {#1600}
[01:32:41] TEACHER: Because it sees that rise that the CPU utilization is rising.   {#1601}
[01:32:44] TEACHER: It can take some action, right?   {#1602}
[01:32:46] TEACHER: You just don't need at that moment.   {#1603}
[01:32:49] TEACHER: What it is, you need historical also.   {#1604}
[01:32:50] TEACHER: You need a generic way to do it.   {#1605}
---- OWNED SEGMENTS END ----

CTX| [01:32:59] STUDENT_1: So there has to be a better way.   {#1606}
CTX| [01:33:03] STUDENT_1: Rather than orchestrator asking from load balance and load   {#1607}
CTX| [01:33:06] STUDENT_1: register telling orchestrator, but why are you just limiting   {#1608}
CTX| [01:33:10] STUDENT_1: between these two, right?   {#1609}
CTX| [01:33:12] TEACHER: Imagine, won't you want to see oral infrastructure utilization,   {#1610}
CTX| [01:33:16] TEACHER: historical trends and whatnot, where would you store the historical   {#1611}
CTX| [01:33:20] TEACHER: data of all the CPU, like how CPU was consumed on each LB server?   {#1612}
CTX| [01:33:25] TEACHER: you store this data in a database.   {#1613}
CTX| [01:33:28] TEACHER: So now where is that data?   {#1614}
CTX| [01:33:31] TEACHER: What kind of database?   {#1615}
CTX| [01:33:32] TEACHER: Where are you storing it?   {#1616}
CTX| [01:33:34] STUDENT_3: We could use probably the same database that was previously being used.   {#1617}
CTX| [01:33:37] TEACHER: This is the key value.   {#1618}
CTX| [01:33:38] TEACHER: So we're storing this configuration.   {#1619}
CTX| [01:33:40] TEACHER: What you're storing is time series data, CPU utilization, memory,   {#1620}
CTX| [01:33:43] TEACHER: disk network.   {#1621}
CTX| [01:33:50] TEACHER: Right.   {#1622}
CTX| [01:33:50] TEACHER: So that that's right.   {#1623}
CTX| [01:33:51] TEACHER: So when we think realistically that that's where things start to   {#1624}
CTX| [01:33:55] TEACHER: Like you, you start to discover these things.   {#1625}
CTX| [01:33:58] TEACHER: Think on those lines, where are you storing this information?   {#1626}
