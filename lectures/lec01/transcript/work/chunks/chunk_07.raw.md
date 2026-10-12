# chunk_07  OWNS 01:12:04 -> 01:24:34  (segments #1222-#1409, 2032 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:11:08] TEACHER: database like you are newly purchased for not just like but you're but you're newly purchased   {#1211}
CTX| [01:11:12] TEACHER: for right so do whatever it takes put less load on that let it work just fine it's like that pampered   {#1212}
CTX| [01:11:19] TEACHER: child right you have to keep care you have to take care of it very much right so this is how   {#1213}
CTX| [01:11:25] TEACHER: a typical flow would look like but this is where the magic happens this broker this is the heart   {#1214}
CTX| [01:11:34] TEACHER: and soul of delegation as a principle.   {#1215}
CTX| [01:11:38] TEACHER: So there are two ways to implement it, two kinds of broker.   {#1216}
CTX| [01:11:43] TEACHER: First are message queues.   {#1217}
CTX| [01:11:46] TEACHER: Second are message streams.   {#1218}
CTX| [01:11:48] TEACHER: So message queues are literal queues in which you put the message.   {#1219}
CTX| [01:11:54] TEACHER: There are bunch of consumers and they consume the message from them.   {#1220}
CTX| [01:11:58] TEACHER: Now this consumers are homogeneous consumers, which means they all do the exact same thing   {#1221}

---- OWNED SEGMENTS START ----
[01:12:04] TEACHER: that you push so let's say i have a task to publish that hey do this spin up an ec2 instance   {#1222}
[01:12:10] TEACHER: or update the account or do or send an email notification send a reminder something right   {#1223}
[01:12:17] TEACHER: a task is submitted in a message and it gets stored in the broker in a message queue sqs rabbit mq are   {#1224}
[01:12:26] TEACHER: queues then you have another message that is coming in it got over here third message came   {#1225}
[01:12:31] TEACHER: over here, right? It's a queue. So one after another. Now from this, the consumer pulls   {#1226}
[01:12:38] TEACHER: the message from the queue. It's never push base. It's very few instances where you do   {#1227}
[01:12:42] TEACHER: push base things. Your consumer pulls the message from the queue and let's say consumer   {#1228}
[01:12:47] TEACHER: to pull the message first and it will get this message.   {#1229}
[01:12:52] TEACHER: Right. Then first consumer pulled the message and it got this message. Now consumer to pull   {#1230}
[01:12:58] TEACHER: the message it saw what needs to be done it start doing that particular part right which is where   {#1231}
[01:13:05] TEACHER: the heavy lifting is done by the consumer right message queue is acting as a buffer for us to keep   {#1232}
[01:13:11] TEACHER: the message while consumer is the one that is reading from it and processing it's doing the   {#1233}
[01:13:16] TEACHER: heavy lifting for you right now the third message goes to consumer three they all do the processing   {#1234}
[01:13:21] TEACHER: and discard or basically delete the message from the broker right but this is what is a very basic   {#1235}
[01:13:28] TEACHER: of a message queue.   {#1236}
[01:13:29] TEACHER: Now here, one key thing to note is that all these three consumers   {#1237}
[01:13:34] TEACHER: are having the exact same logic.   {#1238}
[01:13:37] TEACHER: They are all listening to the same queue.   {#1239}
[01:13:39] TEACHER: A message is sent or a message is read.   {#1240}
[01:13:42] TEACHER: When a message is read from a queue, it is exclusively read   {#1241}
[01:13:45] TEACHER: for a particular consumer.   {#1242}
[01:13:47] TEACHER: So now this message will not be going to any other consumer.   {#1243}
[01:13:50] TEACHER: So for example, this is my consumer one who read the message.   {#1244}
[01:13:53] TEACHER: It doesn't mean this message will not go to consumer two or consumer two.   {#1245}
[01:13:58] TEACHER: the three consumers are homogeneous in nature they have the exact same business logic running   {#1246}
[01:14:02] TEACHER: they are all pulling the message returning the message from the queue and doing the heavy lifting   {#1247}
[01:14:07] TEACHER: right this is a message queue right now there is another type of brokers called message streams   {#1248}
[01:14:15] TEACHER: which is where kafka and kinases fits into the scheme of things now let me walk you through what   {#1249}
[01:14:19] TEACHER: the problem is and then we'll understand how message streams work so let's say what we would   {#1250}
[01:14:24] TEACHER: want to do is we want to like when a blog is published, when a blog is published, we   {#1251}
[01:14:31] TEACHER: are doing count plus plus, but now let's say we want to not just do count plus plus, but   {#1252}
[01:14:37] TEACHER: we want to index this blog in Elasticsearch so that search service can use that.   {#1253}
[01:14:44] TEACHER: If you would want to also index this into Elasticsearch, which means that I would have   {#1254}
[01:14:50] TEACHER: like elastic search running over here and my worker would have to also write it to elastic   {#1255}
[01:14:55] TEACHER: search. That is one way to do it. So for example, it might look something like this. Let me quickly   {#1256}
[01:15:01] TEACHER: draw that and I'll erase it. So let's say this is your elastic search and now your worker would   {#1257}
[01:15:07] TEACHER: also have to write over here. So now upon blog publish, when the message came to the SQS   {#1258}
[01:15:15] TEACHER: and got consumed by this worker.   {#1259}
[01:15:17] TEACHER: Now this worker is doing two things.   {#1260}
[01:15:20] TEACHER: First, it is doing count++ by making an update query on the database.   {#1261}
[01:15:24] TEACHER: And second, it is updating the Elasticsearch,   {#1262}
[01:15:28] TEACHER: creating this entry in the Elasticsearch index.   {#1263}
[01:15:30] TEACHER: Okay, no problem.   {#1264}
[01:15:32] TEACHER: This worker is single source of code.   {#1265}
[01:15:37] TEACHER: Two teams, one analytics or one backend team and one search team   {#1266}
[01:15:42] TEACHER: that were collaborating on this code base.   {#1267}
[01:15:45] TEACHER: You know what happens when you collaborate with other teams?   {#1268}
[01:15:47] TEACHER: Fights.   {#1269}
[01:15:48] TEACHER: Changes of one, stops the deployment of others,   {#1270}
[01:15:52] TEACHER: uncommitted changes, messy branches,   {#1271}
[01:15:55] TEACHER: very different looking code problems.   {#1272}
[01:15:57] TEACHER: These are all management problems.   {#1273}
[01:15:59] TEACHER: There are people problems that come in   {#1274}
[01:16:01] TEACHER: when two people collaborate on the same code base.   {#1275}
[01:16:03] TEACHER: Apart from that,   {#1276}
[01:16:04] TEACHER: engineering challenges would also come.   {#1277}
[01:16:06] TEACHER: For example, let's say this worker consumed this message,   {#1278}
[01:16:11] TEACHER: did count++, but before it could update,   {#1279}
[01:16:15] TEACHER: in elastic search, the worker crashed.   {#1280}
[01:16:17] TEACHER: Now what would happen?   {#1281}
[01:16:20] TEACHER: This failure scenario means that you did count plus plus.   {#1282}
[01:16:23] TEACHER: So the block count became from 74, it becomes 75.   {#1283}
[01:16:27] TEACHER: But before I could index it in elastic search, my worker crashed.   {#1284}
[01:16:31] TEACHER: So now I have inconsistency.   {#1285}
[01:16:33] TEACHER: My count says 75, but my search is 74.   {#1286}
[01:16:38] TEACHER: Problem.   {#1287}
[01:16:39] TEACHER: Right.   {#1288}
[01:16:40] TEACHER: So this way now what you would do, you would retry.   {#1289}
[01:16:45] TEACHER: message failed now i will retry if you are retrying if you are reconsuming the message and retrying it   {#1290}
[01:16:50] TEACHER: now what would happen you will again do count plus plus when you do count plus plus the 75 would   {#1291}
[01:16:56] TEACHER: become 76 and the 74 now and now your search indexing became successful or was successful   {#1292}
[01:17:01] TEACHER: so now you have 75 entries over here but your count says 76 problem so which is where doing   {#1293}
[01:17:08] TEACHER: two things in one shot is always a problem in distributed system because machines can go down   {#1294}
[01:17:15] TEACHER: time right and distributed transactions are extremely costly so what's the solution this is   {#1295}
[01:17:21] TEACHER: where message streams came into the picture so what you typically do over here is you use a message   {#1296}
[01:17:30] TEACHER: stream like kafka or kinesis and now these work on a different principle so they are slightly   {#1297}
[01:17:37] TEACHER: different from a message broker or a message queue rather message queue is a better word   {#1298}
[01:17:41] TEACHER: So message queue is where you have homogeneous consumers,   {#1299}
[01:17:47] TEACHER: where you have message streams, where you have heterogeneous consumers.   {#1300}
[01:17:51] TEACHER: So for example, you have a backend team or analytics stream that is doing count plus plus,   {#1301}
[01:17:56] TEACHER: and you have a search team.   {#1302}
[01:17:58] TEACHER: So now whenever a blog is published, you push a message in Kafka.   {#1303}
[01:18:02] TEACHER: The message goes over here.   {#1304}
[01:18:04] TEACHER: They are buffered in Kafka until the retention is over.   {#1305}
[01:18:10] TEACHER: Now what happens is when the messages are coming in Kafka, in the message queue, your   {#1306}
[01:18:17] TEACHER: consumers read the message from the queue, process it and delete it.   {#1307}
[01:18:21] TEACHER: But with message streams, the messages are not pulled out, but rather visually the consumers   {#1308}
[01:18:28] TEACHER: are iterating over these messages.   {#1309}
[01:18:32] TEACHER: This is what happens behind the scenes.   {#1310}
[01:18:35] TEACHER: So this is what happens rather visually.   {#1311}
[01:18:39] TEACHER: I have two types of consumers.   {#1312}
[01:18:41] TEACHER: Now these are heterogeneous consumers.   {#1313}
[01:18:43] TEACHER: These were homogeneous consumers.   {#1314}
[01:18:45] TEACHER: These are heterogeneous consumers.   {#1315}
[01:18:46] TEACHER: Search and analytics.   {#1316}
[01:18:47] TEACHER: Search is just reading the message   {#1317}
[01:18:49] TEACHER: and indexing it elastic search.   {#1318}
[01:18:51] TEACHER: Analytics is just reading the message   {#1319}
[01:18:53] TEACHER: and doing count plus plus.   {#1320}
[01:18:54] TEACHER: Okay.   {#1321}
[01:18:55] TEACHER: So now what would happen?   {#1322}
[01:18:57] TEACHER: When your search is iterating   {#1323}
[01:18:59] TEACHER: through these messages,   {#1324}
[01:19:01] TEACHER: it is iterating at its own sweet time.   {#1325}
[01:19:03] TEACHER: No one is deleting message   {#1326}
[01:19:05] TEACHER: from a message stream.   {#1327}
[01:19:06] TEACHER: messages are there until the deletion policy kicks in.   {#1328}
[01:19:09] TEACHER: Deletion policy is deleted message after 40 days or 40 days or 60 days or 100 days.   {#1329}
[01:19:13] TEACHER: That's up to you.   {#1330}
[01:19:14] TEACHER: But messages are not explicitly deleted by any of these consumers.   {#1331}
[01:19:18] TEACHER: These consumers, they iterate over these messages at their own sweet pace and do the own sweet   {#1332}
[01:19:25] TEACHER: thing.   {#1333}
[01:19:25] TEACHER: So now search consumers will iterate over these messages and will do indexing in elastic   {#1334}
[01:19:32] TEACHER: search while your analytics consumers will iterate on these messages and do count plus plus now here   {#1335}
[01:19:38] TEACHER: no one wants these two to do exact same thing at the exact same time because they both can work   {#1336}
[01:19:44] TEACHER: there at their own speed time search team can work and have their consumer work at their own   {#1337}
[01:19:49] TEACHER: speed time analytics can do that at their own speed time without having any problem right this   {#1338}
[01:19:53] TEACHER: way what you get is even if search cluster is understood elastic search is down analytics they   {#1339}
[01:20:00] TEACHER: has nothing to do with it.   {#1340}
[01:20:01] TEACHER: It can continue processing and move ahead with this.   {#1341}
[01:20:04] TEACHER: Right?   {#1342}
[01:20:04] TEACHER: Because they're not dependent on each other.   {#1343}
[01:20:09] TEACHER: This is the core idea of a message stream.   {#1344}
[01:20:13] TEACHER: And this is the most powerful technology in our day to day.   {#1345}
[01:20:18] TEACHER: Kafka, Kinesis, they have worked wonders.   {#1346}
[01:20:21] TEACHER: They have a real, like they have made companies re-architect their entire   {#1347}
[01:20:26] TEACHER: architecture, right?   {#1348}
[01:20:27] TEACHER: They have done that because it has helped people solve massive enterprise problems.   {#1349}
[01:20:34] TEACHER: Because it's very difficult to manage people.   {#1350}
[01:20:38] TEACHER: You have to do it.   {#1351}
[01:20:39] TEACHER: Okay.   {#1352}
[01:20:40] TEACHER: So this is where Kafka comes in.   {#1353}
[01:20:42] TEACHER: Wait, wait.   {#1354}
[01:20:43] TEACHER: I'll give chance to ask questions.   {#1355}
[01:20:45] TEACHER: Wait, wait.   {#1356}
[01:20:45] TEACHER: Let me cover that.   {#1357}
[01:20:46] TEACHER: Okay.   {#1358}
[01:20:47] TEACHER: So now what happens next is with Kafka, what you are doing is given that you have two   {#1359}
[01:20:54] TEACHER: things, search and counter.   {#1360}
[01:20:57] TEACHER: search counter service does count plus plus in the database.   {#1361}
[01:21:01] TEACHER: Now, when a blog is published, the message is sent to Kafka messages   {#1362}
[01:21:05] TEACHER: persisted in Kafka search service consumes the message at their own sweet   {#1363}
[01:21:09] TEACHER: base counter service, consume the message at their own sweet space and   {#1364}
[01:21:12] TEACHER: does the corresponding job this way.   {#1365}
[01:21:14] TEACHER: Now you have, you can have two separate code bases search team owns the search   {#1366}
[01:21:18] TEACHER: code base counter service team owns their own code base.   {#1367}
[01:21:21] TEACHER: People happy, manager happy, organization happy.   {#1368}
[01:21:24] TEACHER: And as a user do decoupling as much as possible.   {#1369}
[01:21:28] TEACHER: Okay. Given that Kafka is the backbone of our modern computing system, we need to know   {#1370}
[01:21:35] TEACHER: the most critical parts of it. Right. So that's why let's spend some time understanding Kafka,   {#1371}
[01:21:41] TEACHER: like the essential that you should definitely know about Kafka and obviously bunch of misconceptions,   {#1372}
[01:21:45] TEACHER: which I hate people assuming. So in Kafka, what you have in Kafka is a, obviously it's a message   {#1373}
[01:21:55] TEACHER: stream not a message queue. Kafka is a message stream in which the messages are persisted almost   {#1374}
[01:22:01] TEACHER: forever as per the deletion policy. It's a message stream. Now internally Kafka has topics.   {#1375}
[01:22:09] TEACHER: So what I'm drawing over here is one topic of Kafka. Let's say blog published or on publish   {#1376}
[01:22:19] TEACHER: is one topic of Kafka.   {#1377}
[01:22:22] TEACHER: So think of it like a queue.   {#1378}
[01:22:24] TEACHER: So on publish is one topic of Kafka.   {#1379}
[01:22:26] TEACHER: So when you push a message to Kafka,   {#1380}
[01:22:29] TEACHER: you push a message for a topic in Kafka.   {#1381}
[01:22:32] TEACHER: So let's say when a blog is published,   {#1382}
[01:22:34] TEACHER: I push a message to on published topic   {#1383}
[01:22:36] TEACHER: and it would be stored for that particular topic in Kafka.   {#1384}
[01:22:41] TEACHER: So that is the first level,   {#1385}
[01:22:42] TEACHER: first terminology that you should know.   {#1386}
[01:22:44] TEACHER: That's a topic in Kafka.   {#1387}
[01:22:45] TEACHER: Now, every topic in Kafka has some number of partitions and every topic can have different number of partitions.   {#1388}
[01:22:52] TEACHER: So let's say the blue lines that you see are the partitions of unpublished topic.   {#1389}
[01:23:00] TEACHER: So here I have drawn three partitions of this topic.   {#1390}
[01:23:05] TEACHER: So now what happens is when you push a message to Kafka, you can push a message to Kafka for a particular topic.   {#1391}
[01:23:12] TEACHER: you provide that this is my partitioning key.   {#1392}
[01:23:16] TEACHER: Depending on the partitioning key, given that you have three partitions,   {#1393}
[01:23:19] TEACHER: the messages will be stored in a particular partition of Kafka.   {#1394}
[01:23:25] TEACHER: So for a particular unpublished topic,   {#1395}
[01:23:28] TEACHER: when I'm publishing a message that a particular blog is published,   {#1396}
[01:23:31] TEACHER: this message has a particular partition key.   {#1397}
[01:23:34] TEACHER: You can define a partition key.   {#1398}
[01:23:35] TEACHER: Let's say you define user ID as the partition key.   {#1399}
[01:23:39] TEACHER: So all the blocks published by a particular user will always go to a particular partition.   {#1400}
[01:23:44] TEACHER: So out of this three, it would hash the user ID and see where in which partition it fits in or it is routed to.   {#1401}
[01:23:52] TEACHER: So it will go and put this message in this partition at the front of the queue.   {#1402}
[01:23:58] TEACHER: Then the second message came in.   {#1403}
[01:24:00] TEACHER: Let's say it went to partition three because the user ID hashed there.   {#1404}
[01:24:04] TEACHER: This message went over here and this message went in the third partition over here.   {#1405}
[01:24:11] TEACHER: Now when your consumers are reading this, right?   {#1406}
[01:24:16] TEACHER: So messages are sent for a topic within which they are stored in a particular partition.   {#1407}
[01:24:22] TEACHER: Now when a consumer is reading a consumer.   {#1408}
[01:24:27] TEACHER: Now here the beautiful thing is I can have multiple search consumers.   {#1409}
---- OWNED SEGMENTS END ----

CTX| [01:24:34] TEACHER: I can have one consumer, but I typically have multiple consumers to do search indexing as   {#1410}
CTX| [01:24:38] TEACHER: fast as possible.   {#1411}
CTX| [01:24:39] TEACHER: So search this one that I drew over here.   {#1412}
CTX| [01:24:43] TEACHER: This one, three consumers that you see over here.   {#1413}
CTX| [01:24:46] TEACHER: So three consumers are there reading from this.   {#1414}
CTX| [01:24:49] TEACHER: So now what happens is in Kafka, because my number of partitions are three and I'll have   {#1415}
CTX| [01:24:56] TEACHER: multiple search consumers doing that part.   {#1416}
CTX| [01:24:59] TEACHER: and similarly I'll have counter consumers   {#1417}
CTX| [01:25:01] TEACHER: hydrating at their own sweet pace on the same topic.   {#1418}
CTX| [01:25:04] TEACHER: When my search consumers are using their hydrating   {#1419}
CTX| [01:25:07] TEACHER: because I have three partitions, only three consumers can be active.   {#1420}
CTX| [01:25:11] TEACHER: So for example, search consumer one, and now this is handled by Kafka.   {#1421}
CTX| [01:25:16] TEACHER: You don't have to do anything.   {#1422}
CTX| [01:25:18] TEACHER: You literally don't have to do anything. Kafka handles this for you.   {#1423}
CTX| [01:25:21] TEACHER: So when you create a consumer, you say that basically this is called   {#1424}
CTX| [01:25:24] TEACHER: as a consumer group in Kafka.   {#1425}
CTX| [01:25:26] TEACHER: So for example, given that you have three partitions, you can have three consumers over here.   {#1426}
