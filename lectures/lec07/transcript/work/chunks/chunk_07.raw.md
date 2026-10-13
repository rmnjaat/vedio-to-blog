# chunk_07  OWNS 01:11:59 -> 01:23:41  (segments #1305-#1502, 1843 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:11:03] TEACHER: concrete thing, which tells you, Oh, this is where you should use LFU.   {#1278}
CTX| [01:11:07] TEACHER: This is where you should use LRU.   {#1279}
CTX| [01:11:08] TEACHER: Like what's the differentiator between the two?   {#1280}
CTX| [01:11:11] TEACHER: It's okay.   {#1281}
CTX| [01:11:11] TEACHER: It's okay.   {#1282}
CTX| [01:11:12] TEACHER: Everyone's been through that.   {#1283}
CTX| [01:11:13] TEACHER: I've been through that.   {#1284}
CTX| [01:11:14] TEACHER: It was very difficult for me, unless I wrote one LRU, LFU.   {#1285}
CTX| [01:11:17] TEACHER: Then I built an understanding of it, right?   {#1286}
CTX| [01:11:19] TEACHER: Up until then, even I was like that.   {#1287}
CTX| [01:11:20] TEACHER: It's because very tricky because at the end when we're explaining, we tend to use   {#1288}
CTX| [01:11:26] TEACHER: and frequently and that's exactly what the algorithms   {#1289}
CTX| [01:11:29] TEACHER: are but when? I'm looking for   {#1290}
CTX| [01:11:31] TEACHER: something more concrete. Mohit?   {#1291}
CTX| [01:11:34] TEACHER: When   {#1292}
CTX| [01:11:35] TEACHER: would you use LRU? When would you use LFU?   {#1293}
CTX| [01:11:36] STUDENT_4: So one place   {#1294}
CTX| [01:11:38] STUDENT_4: where I think LFU would make   {#1295}
CTX| [01:11:40] STUDENT_4: more sense is places   {#1296}
CTX| [01:11:43] STUDENT_4: where you are scanning   {#1297}
CTX| [01:11:44] STUDENT_4: a lot of data. In that case   {#1298}
CTX| [01:11:46] STUDENT_4: what happens? One   {#1299}
CTX| [01:11:48] STUDENT_4: scan basically   {#1300}
CTX| [01:11:51] STUDENT_4: could wipe   {#1301}
CTX| [01:11:53] STUDENT_4: out your earlier   {#1302}
CTX| [01:11:55] STUDENT_4: entries which were   {#1303}
CTX| [01:11:56] STUDENT_4: like very   {#1304}

---- OWNED SEGMENTS START ----
[01:11:59] STUDENT_4: which were used   {#1305}
[01:12:00] STUDENT_4: more often, right?   {#1306}
[01:12:02] STUDENT_4: So in that case, a frequency based   {#1307}
[01:12:04] STUDENT_4: option would be better. For example,   {#1308}
[01:12:07] STUDENT_4: you are doing a scan query on database.   {#1309}
[01:12:09] STUDENT_4: In that case, an LFU   {#1310}
[01:12:11] STUDENT_4: strategy would be better because   {#1311}
[01:12:12] STUDENT_4: a scan would not   {#1312}
[01:12:15] STUDENT_4: wipe out say   {#1313}
[01:12:17] STUDENT_4: very   {#1314}
[01:12:18] STUDENT_4: the items which are heavily used.   {#1315}
[01:12:22] TEACHER: Brilliant.   {#1316}
[01:12:23] TEACHER: This is a first time someone has   {#1317}
[01:12:24] TEACHER: very beautifully explained where you should use LFU.   {#1318}
[01:12:27] TEACHER: Thanks so much Mohit for this.   {#1319}
[01:12:28] TEACHER: I'll just elaborate on this so that everyone's on the same page.   {#1320}
[01:12:32] TEACHER: Thanks so much.   {#1321}
[01:12:33] TEACHER: So this is like stock market.   {#1322}
[01:12:35] TEACHER: So one analogy that I give people to understand LRU and LFU,   {#1323}
[01:12:39] TEACHER: especially LFU is stock market and not as a use case,   {#1324}
[01:12:43] TEACHER: but as a human behavior.   {#1325}
[01:12:44] TEACHER: So what happens is in stock market,   {#1326}
[01:12:50] TEACHER: Let's say you bought a stock, full faith in that stock.   {#1327}
[01:12:54] TEACHER: No matter what, this stock is going good, will do great.   {#1328}
[01:12:58] TEACHER: So you invested in that stock.   {#1329}
[01:13:01] TEACHER: Stock was rising.   {#1330}
[01:13:02] TEACHER: You were happy.   {#1331}
[01:13:03] TEACHER: You were happy.   {#1332}
[01:13:04] TEACHER: And then the stock fell.   {#1333}
[01:13:06] TEACHER: Now, when the stock fell, it's your choice to either withdraw the money at this stage   {#1334}
[01:13:12] TEACHER: or you still trust that this stock would grow again.   {#1335}
[01:13:17] TEACHER: This would rise again.   {#1336}
[01:13:18] TEACHER: right so if it rises again then you are happy right but if it falls then you're sad again   {#1337}
[01:13:25] TEACHER: okay i should have evicted this is exactly what lfu is lfu because it works on frequency   {#1338}
[01:13:33] TEACHER: a simple way to look at it is when your keys are not recently used do you want to evite it   {#1339}
[01:13:43] TEACHER: your stock is not performing well recently,   {#1340}
[01:13:47] TEACHER: you still want to hold it or not.   {#1341}
[01:13:50] TEACHER: That's LFU for me.   {#1342}
[01:13:52] TEACHER: If you don't want to evict   {#1343}
[01:13:54] TEACHER: when your stock is not performing well at this moment,   {#1344}
[01:13:57] TEACHER: you are holding it,   {#1345}
[01:13:59] TEACHER: expecting it to be used again.   {#1346}
[01:14:01] TEACHER: That's LFU.   {#1347}
[01:14:02] TEACHER: You are not going by the recency bias over here.   {#1348}
[01:14:07] TEACHER: Instead, you are thinking   {#1349}
[01:14:08] TEACHER: because it did well in the past,   {#1350}
[01:14:11] TEACHER: it would do well in the future.   {#1351}
[01:14:13] TEACHER: keeping your trust in that stock.   {#1352}
[01:14:15] TEACHER: That's LFU.   {#1353}
[01:14:17] TEACHER: Now it should be very clear in your head on where can you use LFU and when you are having   {#1354}
[01:14:22] TEACHER: the trust that even though recently this is not doing well, I would still want to keep   {#1355}
[01:14:27] TEACHER: this key in my cash.   {#1356}
[01:14:29] TEACHER: You would use LFU.   {#1357}
[01:14:30] TEACHER: I'll give a practical example.   {#1358}
[01:14:32] TEACHER: A practical example for this was an analogy that I gave that when you are seeing a dip   {#1359}
[01:14:37] TEACHER: in the access of a particular key, but you still want to keep that key in cash.   {#1360}
[01:14:41] TEACHER: still what you would still use LFU for that.   {#1361}
[01:14:45] TEACHER: An example for that is Wikipedia pages.   {#1362}
[01:14:49] TEACHER: Right.   {#1363}
[01:14:50] TEACHER: So in Wikipedia pages, there you like Wikipedia obviously has a ton of cash in that.   {#1364}
[01:14:54] TEACHER: In that, what you would see is that if a page is, let's say not frequently used   {#1365}
[01:15:00] TEACHER: at this moment, but it was very frequently used in, it was very frequently   {#1366}
[01:15:06] TEACHER: accessed in the past.   {#1367}
[01:15:08] TEACHER: I would still like to keep this memory.   {#1368}
[01:15:11] TEACHER: Let's say there is FIFA World Cup.   {#1369}
[01:15:12] TEACHER: Everyone is opening FIFA pages, FIFA pages, FIFA pages,   {#1370}
[01:15:15] TEACHER: but it does not take credit away from other top pages   {#1371}
[01:15:18] TEACHER: that were anyway visited far more often.   {#1372}
[01:15:20] TEACHER: Just because of the recency of this FIFA page,   {#1373}
[01:15:23] TEACHER: why would you want to curb other pages which were equally,   {#1374}
[01:15:25] TEACHER: which were more famous in the past?   {#1375}
[01:15:27] TEACHER: Because tomorrow they would be accessed again with the same frequency   {#1376}
[01:15:29] TEACHER: once this fad goes away.   {#1377}
[01:15:32] TEACHER: This is where LFU comes into the place.   {#1378}
[01:15:36] TEACHER: Where recency effect, you don't want recency effect to take its,   {#1379}
[01:15:41] TEACHER: effect to evict a particular key instead what you are doing is you are saying that if something   {#1380}
[01:15:46] TEACHER: was very frequently accessed in the past will be frequently accessed in the future.   {#1381}
[01:15:51] TEACHER: That's where you go for LRU.   {#1382}
[01:15:54] TEACHER: And in LRU, LRU is typically simple where you know the access pattern that you have   {#1383}
[01:16:00] TEACHER: is something like this.   {#1384}
[01:16:03] STUDENT_10: Wait, let me, do I have an example for that?   {#1385}
[01:16:09] TEACHER: So let's say you have your access pattern, something like this, which means that some   {#1386}
[01:16:15] TEACHER: keys or this is for a particular key, a key is accessed very aggressively at first, but   {#1387}
[01:16:24] TEACHER: then there is a slump in the access.   {#1388}
[01:16:26] TEACHER: This is an indication of LRU implementation.   {#1389}
[01:16:30] TEACHER: This is where you can use LRU because now things that were accessed very frequently   {#1390}
[01:16:37] TEACHER: It's like all social media trends.   {#1391}
[01:16:39] TEACHER: A song is popular.   {#1392}
[01:16:40] TEACHER: Everyone's creating reel on that.   {#1393}
[01:16:41] TEACHER: That song is cached on YouTube or Insta or whatever.   {#1394}
[01:16:45] TEACHER: But once that fad is away, no one's picking reels on it.   {#1395}
[01:16:49] TEACHER: So it's okay to not put it in cache.   {#1396}
[01:16:52] TEACHER: LRU.   {#1397}
[01:16:53] TEACHER: So classic example of LRU, Google News.   {#1398}
[01:16:57] TEACHER: Where what are the odds that you are reading news that is a week old?   {#1399}
[01:17:00] TEACHER: Not really.   {#1400}
[01:17:01] TEACHER: You would be reading news that is one day old, two day old at max.   {#1401}
[01:17:04] TEACHER: So you are very likely to, that's where recency, things that are really recent are very highly   {#1402}
[01:17:10] TEACHER: likely to be accessed again and again.   {#1403}
[01:17:12] TEACHER: That's where you would have your LRU implementation, but where it's more about that, Hey, what   {#1404}
[01:17:17] TEACHER: was very famous in the past may not be today, but it will be famous again in the future.   {#1405}
[01:17:21] TEACHER: You want to keep the things there.   {#1406}
[01:17:24] TEACHER: You would use LFU, right?   {#1407}
[01:17:26] TEACHER: Depending on the use case of this, picking one over the other, there is not that LRU always   {#1408}
[01:17:30] TEACHER: works best or LFU always works best.   {#1409}
[01:17:31] TEACHER: In most cases, you would not even see the difference between LRU and LFU in protection system.   {#1410}
[01:17:36] TEACHER: But in some extreme cases, you would see a significant difference.   {#1411}
[01:17:40] TEACHER: So whenever you are configuring something like this, spend time understanding your application,   {#1412}
[01:17:45] TEACHER: understanding your user behavior, see how a particular key is accessed,   {#1413}
[01:17:48] TEACHER: understand the life cycle of a particular key in your system,   {#1414}
[01:17:52] TEACHER: and then take a decision of this or this.   {#1415}
[01:17:57] TEACHER: The way Redis does, Redis still does LRU, LFU random.   {#1416}
[01:18:00] TEACHER: It supports all three.   {#1417}
[01:18:01] TEACHER: It does LRU, LFU implementation very efficiently using LRU bits.   {#1418}
[01:18:05] TEACHER: Unfortunately, I cannot type deep into it.   {#1419}
[01:18:06] TEACHER: It's a very superb algorithm that it uses.   {#1420}
[01:18:10] TEACHER: And I, I so want to talk about it, but time is very limited and would make this   {#1421}
[01:18:14] TEACHER: discussion go in a very random direction, but that's what Redis does.   {#1422}
[01:18:18] TEACHER: I highly encourage you to explore that out in any case, if you are interested   {#1423}
[01:18:21] TEACHER: into typing deep into Redis, I have a course, not a plug, but just out of   {#1424}
[01:18:25] TEACHER: curiosity, if you would want to know everything about Redis internals, I have   {#1425}
[01:18:28] TEACHER: a very detailed course.   {#1426}
[01:18:29] TEACHER: It says 9 plus Rs, but it's 9 plus Rs of very dense information   {#1427}
[01:18:33] TEACHER: around everything on this one.   {#1428}
[01:18:35] TEACHER: And actual Redis code walkthrough and implementation in GoLine.   {#1429}
[01:18:39] TEACHER: That's how I got very detailed understanding of it.   {#1430}
[01:18:42] TEACHER: I like implementing stuff.   {#1431}
[01:18:44] TEACHER: Okay.   {#1432}
[01:18:45] TEACHER: So this is about eviction.   {#1433}
[01:18:47] TEACHER: LRU, LFU, random, when to use, how to use, overheads that use.   {#1434}
[01:18:51] TEACHER: Right.   {#1435}
[01:18:52] TEACHER: So eviction done.   {#1436}
[01:18:54] TEACHER: Now let's talk about communication.   {#1437}
[01:18:57] TEACHER: Communication is very important.   {#1438}
[01:18:59] TEACHER: around how you are letting some other system talk to your system, talk to your cache.   {#1439}
[01:19:07] TEACHER: So which communication protocol would you use over here?   {#1440}
[01:19:11] TEACHER: Let's say this is your single node machine in which you are hosted your cache.   {#1441}
[01:19:16] TEACHER: Which communication protocol, what kind of EKS would you use to expose your cache to other systems?   {#1442}
[01:19:25] TEACHER: Raise your hands or pull you in.   {#1443}
[01:19:33] STUDENT_12: Yes, yeah.   {#1444}
[01:19:36] STUDENT_16: It's DTP.   {#1445}
[01:19:37] STUDENT_12: Why?   {#1446}
[01:19:40] STUDENT_7: As in, I mean, any HTTP would, it's just a, it would, we won't need, what do we say?   {#1447}
[01:19:50] STUDENT_7: Um, I mean, the server can, um, forget, like it doesn't need to cash anything, like nothing   {#1448}
[01:19:57] STUDENT_7: like web sockets and all.   {#1449}
[01:20:00] STUDENT_7: So.   {#1450}
[01:20:01] TEACHER: But then what is the, what is the, what is the disadvantage of using HTTP?   {#1451}
[01:20:10] STUDENT_7: We have to like the payload size and all.   {#1452}
[01:20:13] TEACHER: Payload size is huge.   {#1453}
[01:20:14] TEACHER: Why?   {#1454}
[01:20:14] TEACHER: Why is payload size huge?   {#1455}
[01:20:18] STUDENT_7: I mean, the key when we are doing the get request, the key would be small, but the data,   {#1456}
[01:20:25] STUDENT_7: which is being fetched from the cash.   {#1457}
[01:20:27] TEACHER: That is true for anything that you use, right?   {#1458}
[01:20:29] TEACHER: The value that you have to transfer it, we test it up or anything that you're using.   {#1459}
[01:20:33] TEACHER: What difference does it make?   {#1460}
[01:20:39] TEACHER: Okay.   {#1461}
[01:20:39] TEACHER: Let's start with this.   {#1462}
[01:20:40] TEACHER: What, which other options do you have apart from HTTP?   {#1463}
[01:20:44] STUDENT_7: We have web sockets.   {#1464}
[01:20:48] TEACHER: Okay.   {#1465}
[01:20:51] STUDENT_7: Other protocols.   {#1466}
[01:20:57] STUDENT_7: I don't have names in my.   {#1467}
[01:21:01] STUDENT_7: Yeah.   {#1468}
[01:21:05] TEACHER: What else?   {#1469}
[01:21:11] STUDENT_9: You can.   {#1470}
[01:21:12] TEACHER: write your own. Right. So you can write your own. Why not? And then what is at 10, all   {#1471}
[01:21:22] TEACHER: these three are just TCP connections. Correct. There's nothing fancy. They're just TCP connections.   {#1472}
[01:21:29] TEACHER: The way you are sending the data is just wrapped. It just sent in a particular format. That   {#1473}
[01:21:34] TEACHER: format is either HTTP packets or grpc format or your own custom form.   {#1474}
[01:21:40] TEACHER: Right. So at the end, it needs to be a TCP collection. Now, if you use HTTP,   {#1475}
[01:21:47] TEACHER: when I say HTTP, it means HTTP 1.1. Now, HTTP 1.1 normal web server. What would happen again?   {#1476}
[01:21:55] TEACHER: Establishing TCP connection is a three-way handshake and two-way tear down. So if you're   {#1477}
[01:22:00] TEACHER: making it state test like every time you get a request you are establishing tcp connections   {#1478}
[01:22:05] TEACHER: sending the data getting the request particular whatever you're doing they're responding back   {#1479}
[01:22:08] TEACHER: and then you're terminating the connection so every time an API server needs to establish   {#1480}
[01:22:12] TEACHER: the connection with the cache you have to establish the tcp like reestablish the tcp   {#1481}
[01:22:15] TEACHER: connection every time so three-way handshake two-way to go down every time very unperformant   {#1482}
[01:22:24] TEACHER: very inefficient right very inefficient in the implementation so might not be the best   {#1483}
[01:22:30] TEACHER: The payload example that you gave, I just want to take a small   {#1484}
[01:22:33] TEACHER: detour over here and showcase how, again, I had no intention of this,   {#1485}
[01:22:40] TEACHER: but long time back, I got very curious about, uh, a lot of stuff.   {#1486}
[01:22:48] TEACHER: Well, that's okay.   {#1487}
[01:22:49] TEACHER: So what I did is few of my friends, rather two of my friends came to me and   {#1488}
[01:22:58] TEACHER: And they said that, Arpit, we are building an IoT application.   {#1489}
[01:23:03] TEACHER: We have sensor data and we want to send data to this backend server.   {#1490}
[01:23:07] TEACHER: They knew Python, so they wrote a backend server in Python.   {#1491}
[01:23:11] TEACHER: So Flask framework HTTP request, that's what they knew.   {#1492}
[01:23:14] TEACHER: We had no idea what we were doing.   {#1493}
[01:23:16] TEACHER: They came to me as a problem and I just solved it for that.   {#1494}
[01:23:19] TEACHER: So while that, I explored this very interesting part.   {#1495}
[01:23:24] TEACHER: So for us to make requests in the backend,   {#1496}
[01:23:28] TEACHER: class will extend by at least 15 minutes,   {#1497}
[01:23:30] TEACHER: but it's fine.   {#1498}
[01:23:31] TEACHER: I want all of you to go in this depth   {#1499}
[01:23:32] TEACHER: because I'm finding it very interesting   {#1500}
[01:23:34] TEACHER: to discuss this thing.   {#1501}
[01:23:35] TEACHER: This is my most favorite week of all.   {#1502}
---- OWNED SEGMENTS END ----

CTX| [01:23:41] TEACHER: So the backend server,   {#1503}
CTX| [01:23:42] TEACHER: they had it handy in Python.   {#1504}
CTX| [01:23:46] TEACHER: They wrote it in Flask, right?   {#1505}
CTX| [01:23:47] TEACHER: But now from IoT sensors,   {#1506}
CTX| [01:23:50] TEACHER: they want to send data over here.   {#1507}
CTX| [01:23:51] TEACHER: But in IoT, you don't have Python.   {#1508}
CTX| [01:23:53] TEACHER: You don't have JavaScript.   {#1509}
CTX| [01:23:54] TEACHER: How will you make HTTP requests from here to here?   {#1510}
CTX| [01:23:58] TEACHER: understands HTTP your sensor understands TCP so now what do you do that's where I recalled   {#1511}
CTX| [01:24:03] TEACHER: that in the networking course we had some HTTP protocol format or something does this mean that   {#1512}
CTX| [01:24:10] TEACHER: if I establish a simple TCP connection and this was back in 2015 I just graduated post my master's   {#1513}
CTX| [01:24:18] TEACHER: and this this thing came up so I was not as experienced I had no idea but again applying   {#1514}
CTX| [01:24:24] TEACHER: the first principles applying the things that I knew to kind of solve this problem.   {#1515}
CTX| [01:24:28] TEACHER: So what I did is I just experimented in just two minutes that can we do something.   {#1516}
CTX| [01:24:34] TEACHER: I just established a raw TCP connection between the two using netcat.   {#1517}
CTX| [01:24:37] TEACHER: I knew netcat has utility that it establishes TCP connection and whatnot.   {#1518}
CTX| [01:24:41] TEACHER: So whenever you make an HTTP request, you see HTTP request headers going in, you see   {#1519}
