# chunk_08  OWNS 01:24:34 -> 01:36:20  (segments #1410-#1608, 2006 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:23:35] TEACHER: Let's say you define user ID as the partition key.   {#1399}
CTX| [01:23:39] TEACHER: So all the blocks published by a particular user will always go to a particular partition.   {#1400}
CTX| [01:23:44] TEACHER: So out of this three, it would hash the user ID and see where in which partition it fits in or it is routed to.   {#1401}
CTX| [01:23:52] TEACHER: So it will go and put this message in this partition at the front of the queue.   {#1402}
CTX| [01:23:58] TEACHER: Then the second message came in.   {#1403}
CTX| [01:24:00] TEACHER: Let's say it went to partition three because the user ID hashed there.   {#1404}
CTX| [01:24:04] TEACHER: This message went over here and this message went in the third partition over here.   {#1405}
CTX| [01:24:11] TEACHER: Now when your consumers are reading this, right?   {#1406}
CTX| [01:24:16] TEACHER: So messages are sent for a topic within which they are stored in a particular partition.   {#1407}
CTX| [01:24:22] TEACHER: Now when a consumer is reading a consumer.   {#1408}
CTX| [01:24:27] TEACHER: Now here the beautiful thing is I can have multiple search consumers.   {#1409}

---- OWNED SEGMENTS START ----
[01:24:34] TEACHER: I can have one consumer, but I typically have multiple consumers to do search indexing as   {#1410}
[01:24:38] TEACHER: fast as possible.   {#1411}
[01:24:39] TEACHER: So search this one that I drew over here.   {#1412}
[01:24:43] TEACHER: This one, three consumers that you see over here.   {#1413}
[01:24:46] TEACHER: So three consumers are there reading from this.   {#1414}
[01:24:49] TEACHER: So now what happens is in Kafka, because my number of partitions are three and I'll have   {#1415}
[01:24:56] TEACHER: multiple search consumers doing that part.   {#1416}
[01:24:59] TEACHER: and similarly I'll have counter consumers   {#1417}
[01:25:01] TEACHER: hydrating at their own sweet pace on the same topic.   {#1418}
[01:25:04] TEACHER: When my search consumers are using their hydrating   {#1419}
[01:25:07] TEACHER: because I have three partitions, only three consumers can be active.   {#1420}
[01:25:11] TEACHER: So for example, search consumer one, and now this is handled by Kafka.   {#1421}
[01:25:16] TEACHER: You don't have to do anything.   {#1422}
[01:25:18] TEACHER: You literally don't have to do anything. Kafka handles this for you.   {#1423}
[01:25:21] TEACHER: So when you create a consumer, you say that basically this is called   {#1424}
[01:25:24] TEACHER: as a consumer group in Kafka.   {#1425}
[01:25:26] TEACHER: So for example, given that you have three partitions, you can have three consumers over here.   {#1426}
[01:25:35] TEACHER: Consumer one, consumer two, consumer three.   {#1427}
[01:25:37] TEACHER: Consumer one will read from partition one, consumer two will read from partition two, consumer three will read from partition three.   {#1428}
[01:25:43] TEACHER: And the messages are ordered in the partition.   {#1429}
[01:25:46] TEACHER: Here you see first message, first year, second message over here.   {#1430}
[01:25:49] TEACHER: So ordering guarantees are within partition, not across topic.   {#1431}
[01:25:53] TEACHER: So it cannot guarantee that across topic the messages are ordered.   {#1432}
[01:25:56] TEACHER: the ordering is guaranteed within the partition right so for example if user publish block one   {#1433}
[01:26:04] TEACHER: first and then block two the consumer will read block one first and block two who is iterating   {#1434}
[01:26:09] TEACHER: on that partition right but across partition no guarantees so now here what would happen is   {#1435}
[01:26:15] TEACHER: the search consumer that you have that is consuming from this particular partition   {#1436}
[01:26:20] TEACHER: it will read all the messages from the first partition consumer two will read from the second   {#1437}
[01:26:26] TEACHER: the third partition. Now what happens when you add fourth and fifth consumer? Given that   {#1438}
[01:26:33] TEACHER: you have only three partitions when consumer four starts and consumer five starts, they   {#1439}
[01:26:39] TEACHER: would not get any messages. When they iterate, they would not get anything because that's   {#1440}
[01:26:45] TEACHER: what the limitation of Kafka is. So the biggest limitation of Kafka is its parallelism. The   {#1441}
[01:26:52] TEACHER: parallelism of your consumption depends on the number of partitions of a topic.   {#1442}
[01:27:00] TEACHER: So if my topic has three partitions, I can have at max three consumers consuming from that.   {#1443}
[01:27:07] TEACHER: And I can have three, I can have N different types of consumers, analytics, counter, backend,   {#1444}
[01:27:14] TEACHER: something, something, something. But for each of them, I can have at max three different   {#1445}
[01:27:20] TEACHER: or three consumers only.   {#1446}
[01:27:23] TEACHER: I can have two   {#1447}
[01:27:24] TEACHER: if I can have less than three also.   {#1448}
[01:27:27] TEACHER: For example, if I only have one consumer,   {#1449}
[01:27:28] TEACHER: then it will get messages   {#1450}
[01:27:30] TEACHER: from all these three parties.   {#1451}
[01:27:31] TEACHER: When it iterates,   {#1452}
[01:27:32] TEACHER: it gets iterated from all these three parties   {#1453}
[01:27:34] TEACHER: in a round robin way.   {#1454}
[01:27:38] TEACHER: But at max,   {#1455}
[01:27:39] TEACHER: you can have three consumers over here.   {#1456}
[01:27:41] TEACHER: That's the limitation of Kafka.   {#1457}
[01:27:45] TEACHER: One final thing about Kafka   {#1458}
[01:27:46] TEACHER: is when you iterate   {#1459}
[01:27:50] TEACHER: How does it know that you are treated to a certain point?   {#1460}
[01:27:53] TEACHER: So which is where there is a thing called committing after you read a particular number   {#1461}
[01:27:57] TEACHER: of messages.   {#1462}
[01:27:58] TEACHER: So let's say my consumer, let's say my analytics consumer read first message, second message,   {#1463}
[01:28:07] TEACHER: then it can issue a commit to Kafka.   {#1464}
[01:28:09] TEACHER: And your Kafka will keep a track of that consumer one of analytics consumer group has read till   {#1465}
[01:28:15] TEACHER: this message.   {#1466}
[01:28:16] TEACHER: then when the consumer reads another message it starts from the same point again and then it   {#1467}
[01:28:22] TEACHER: commits that I've read till this point it starts again then it commits again that I've read till   {#1468}
[01:28:27] TEACHER: this point so in case let's say it read till this point but before committing my consumer crashed   {#1469}
[01:28:34] TEACHER: off not Kafka but my consumer crashed off before committing so when although I process these four   {#1470}
[01:28:40] TEACHER: messages but because I last committed over here so when my consumer will resume it will start from   {#1471}
[01:28:46] TEACHER: kafka does not guarantee exactly one semantics kafka guarantees at least one semantics if you   {#1472}
[01:28:53] TEACHER: want to have exactly once there are other ways to do it but kafka out of the box and now it has also   {#1473}
[01:29:01] TEACHER: started providing some kind of exactly once but it's still not truly exactly once but as a   {#1474}
[01:29:06] TEACHER: simplistic view it's should be okay for you to reconsume different set of messages oh sorry the   {#1475}
[01:29:12] TEACHER: same set of messages again you should be okay with that so this is how you would tell kafka   {#1476}
[01:29:18] TEACHER: that me as the consumer group i've read till this point now when i will resume give me messages   {#1477}
[01:29:24] TEACHER: after this this is what the committing of kafka looks like right these are the basic things that   {#1478}
[01:29:31] TEACHER: you should definitely know about kafka and this holds true for kinases also kafka has partitions   {#1479}
[01:29:37] TEACHER: kinases has shards same thing different terminology and underlying architecture nearly the same right   {#1480}
[01:29:44] TEACHER: there is no big of a difference between the two the way these operate uh all the message streams   {#1481}
[01:29:49] TEACHER: operate they operate in this exact same right so understanding one helps you build an understanding   {#1482}
[01:29:54] TEACHER: of other just api nomenclature api and nomenclature right but this uh is the heart and soul of   {#1483}
[01:30:02] TEACHER: delegation message queues and message brokers right and this is the essential of kafka that   {#1484}
[01:30:07] TEACHER: you should know because we will be using it throughout almost all the systems almost almost   {#1485}
[01:30:14] TEACHER: all the consumer systems that we design and because that is the backbone that is the heart and soul of   {#1486}
[01:30:19] TEACHER: delegation so whenever we're delegating and we need multiple types of consumers kafka is will be our   {#1487}
[01:30:26] TEACHER: default choice but it's there is one place where kafka doesn't suit and we'll talk about it in week   {#1488}
[01:30:32] TEACHER: One place where Kafka fails miserably.   {#1489}
[01:30:36] TEACHER: Miserably.   {#1490}
[01:30:37] TEACHER: It's the worst that you can use then.   {#1491}
[01:30:39] TEACHER: Because a lot of people think Kafka is a magical solution.   {#1492}
[01:30:42] TEACHER: They sprinkle it like it's salt.   {#1493}
[01:30:44] TEACHER: Goes in every system.   {#1494}
[01:30:45] TEACHER: No.   {#1495}
[01:30:46] TEACHER: Consistent hashing.   {#1496}
[01:30:47] TEACHER: Very stupid solution in some cases.   {#1497}
[01:30:49] TEACHER: Kafka, very stupid solution in some cases.   {#1498}
[01:30:51] TEACHER: They are not magical solutions.   {#1499}
[01:30:53] TEACHER: You need to know the strengths and the weaknesses of it.   {#1500}
[01:30:55] TEACHER: And then you can make a same choice.   {#1501}
[01:30:57] TEACHER: Okay.   {#1502}
[01:30:58] TEACHER: Any questions on delegation?   {#1503}
[01:31:01] TEACHER: Go on, Rajiv.   {#1504}
[01:31:03] STUDENT_9: So, um, we have different groups of consumers.   {#1505}
[01:31:07] STUDENT_9: So, uh, I just read somewhere that, uh, each, uh, consumer in a group can subscribe to a   {#1506}
[01:31:13] STUDENT_9: single partition.   {#1507}
[01:31:14] STUDENT_9: So if you have multiple partition, those members of the groups talk about.   {#1508}
[01:31:19] STUDENT_5: Yeah.   {#1509}
[01:31:20] STUDENT_9: Yeah.   {#1510}
[01:31:20] STUDENT_9: So now the, I always wondered at how these, I mean, since the partitions has different,   {#1511}
[01:31:25] STUDENT_9: uh, messages, you know, uh, the ordering is like scattered now.   {#1512}
[01:31:28] STUDENT_9: So how these consumers actually talk to each other to.   {#1513}
[01:31:32] TEACHER: I said there is no global ordering.   {#1514}
[01:31:33] TEACHER: That's what I said.   {#1515}
[01:31:34] TEACHER: I spent five minutes talking about it.   {#1516}
[01:31:35] TEACHER: There is no global ordering.   {#1517}
[01:31:36] STUDENT_9: Okay.   {#1518}
[01:31:37] STUDENT_9: So, but if a consumer wants to know all the message that it say you have distributed   {#1519}
[01:31:41] STUDENT_9: the messages across all the partitions.   {#1520}
[01:31:43] STUDENT_9: Now, if a consumer is subscribing to a partition one, but partition two and   {#1521}
[01:31:46] STUDENT_9: partition three also has few messages, right?   {#1522}
[01:31:48] STUDENT_9: So how would consumer one know about the messages in partition two and partition   {#1523}
[01:31:52] TEACHER: three, no consumer one.   {#1524}
[01:31:54] TEACHER: If there is only one consumer exit, we'll get message from all the three   {#1525}
[01:31:57] TEACHER: consumers in a round robin fashion.   {#1526}
[01:32:01] TEACHER: It is never that you specify you subscribe to only one partition over here.   {#1527}
[01:32:06] TEACHER: It's never like that.   {#1528}
[01:32:07] TEACHER: You can have less than n where n is the number of partitions, number of consumers.   {#1529}
[01:32:14] TEACHER: You can have it and it does it in round robin.   {#1530}
[01:32:16] TEACHER: So one message over here, one message over here, one message over here, like this, it   {#1531}
[01:32:19] TEACHER: goes.   {#1532}
[01:32:23] TEACHER: But it's always better to have n is to n.   {#1533}
[01:32:27] TEACHER: So if there are N partitions have N consumers, that's the ideal way to build that system,   {#1534}
[01:32:32] TEACHER: but still you can have fewer consumers than partitions.   {#1535}
[01:32:36] TEACHER: It's perfectly fine, but there is no global ordering.   {#1536}
[01:32:40] STUDENT_9: Okay.   {#1537}
[01:32:42] STUDENT_1: So got up.   {#1538}
[01:32:45] STUDENT_1: Hi, so the basics of a message queue and stream are the same, right?   {#1539}
[01:32:50] STUDENT_1: What basic, what do you mean by basic?   {#1540}
[01:32:54] TEACHER: There is a consumer who hovers over the items or messages.   {#1541}
[01:32:58] TEACHER: Correct.   {#1542}
[01:32:58] STUDENT_13: Yeah.   {#1543}
[01:32:59] TEACHER: And then it's a buffer.   {#1544}
[01:33:00] TEACHER: It's a buffer where you are holding up messages and then consuming at your own speed time.   {#1545}
[01:33:04] STUDENT_1: So does that mean if the place where I should use queues is where I have only one operation   {#1546}
[01:33:09] STUDENT_1: to operate on?   {#1547}
[01:33:11] STUDENT_1: Correct.   {#1548}
[01:33:11] STUDENT_1: That's the best way to look at it.   {#1549}
[01:33:14] TEACHER: So why don't we use streams?   {#1550}
[01:33:15] TEACHER: Because streams are, they at least seem to be more powerful than expensive, expensive   {#1551}
[01:33:20] TEACHER: cost.   {#1552}
[01:33:21] TEACHER: Okay.   {#1553}
[01:33:21] TEACHER: Cost. For example, SQS, AWS SQS builds you per message.   {#1554}
[01:33:28] TEACHER: Gynasys builds you for the duration that it is running.   {#1555}
[01:33:32] TEACHER: Right? So for a smaller workload, you'd go for SQS.   {#1556}
[01:33:37] TEACHER: Why would you want to waste money on streams?   {#1557}
[01:33:39] TEACHER: Because that infrastructure is constantly running.   {#1558}
[01:33:42] TEACHER: Cost is one factor that you should always think about.   {#1559}
[01:33:45] TEACHER: You are there to save cost for the organization.   {#1560}
[01:33:48] TEACHER: You can design as fancy of a system, but if it is not cost efficient,   {#1561}
[01:33:51] TEACHER: It will not see the light of the day.   {#1562}
[01:33:53] TEACHER: And how many number of partitions is better?   {#1563}
[01:33:55] TEACHER: Should we have more number of partitions for better performance or less?   {#1564}
[01:33:58] TEACHER: Depending on the concurrency, depending on the speed of consumption you need, you can   {#1565}
[01:34:02] TEACHER: have as many partitions as you want.   {#1566}
[01:34:05] TEACHER: Right.   {#1567}
[01:34:06] TEACHER: But depending on the consumption rate that you expect, you can add more partitions to   {#1568}
[01:34:11] TEACHER: that.   {#1569}
[01:34:12] TEACHER: Okay.   {#1570}
[01:34:13] STUDENT_1: And the last limitation of Kafka that you talked about committing the messages.   {#1571}
[01:34:18] STUDENT_1: Can't we commit a limitation?   {#1572}
[01:34:19] STUDENT_1: That's a feature.   {#1573}
[01:34:21] TEACHER: a message. So we can commit at each message, right? Yeah, we can. We can commit at each   {#1574}
[01:34:27] TEACHER: message, but it's like too much. Like, but it's better to do batch commit. Why want to   {#1575}
[01:34:32] STUDENT_2: make network calls every time to commit? Thanks. So message queue can have one consumer group   {#1576}
[01:34:43] TEACHER: or more than one consumer group? Message queue. Message queue has all, all homogeneous consumers.   {#1577}
[01:34:49] TEACHER: These are all homogeneous consumers.   {#1578}
[01:34:52] STUDENT_2: Homogeneous consumers.   {#1579}
[01:34:54] STUDENT_2: So that means like now one consumer group or more than one consumer group?   {#1580}
[01:34:57] STUDENT_2: One, one, one.   {#1581}
[01:34:58] TEACHER: All these are same, exact same.   {#1582}
[01:35:00] TEACHER: So they would read the same.   {#1583}
[01:35:02] TEACHER: Anyone who is reading the message will get the message.   {#1584}
[01:35:04] TEACHER: It's not that everyone is editing their own sweet face.   {#1585}
[01:35:07] TEACHER: That's what this visualization depicts.   {#1586}
[01:35:09] TEACHER: Right.   {#1587}
[01:35:10] STUDENT_2: Suppose if there are more than one consumer group, then the solution is message stream,   {#1588}
[01:35:14] STUDENT_2: not message.   {#1589}
[01:35:15] STUDENT_2: Correct.   {#1590}
[01:35:16] STUDENT_2: correct. Okay. And other question, right? When a message is processed from queue or stream,   {#1591}
[01:35:22] STUDENT_2: happy party always like the process of successfully. Suppose if it's at consumer level   {#1592}
[01:35:28] STUDENT_2: in middle or somewhere, then how it intelligently can process the message again? So do we have to   {#1593}
[01:35:35] STUDENT_2: manually re-trigger or replay the message process? No, that's a guarantee of the underlying queue   {#1594}
[01:35:41] TEACHER: that you're using. SQS provides different guarantees, rapid time queue provides different   {#1595}
[01:35:46] TEACHER: called as a visibility timeout in SQS.   {#1596}
[01:35:48] TEACHER: So what happens is if this fails, then before deleting the message,   {#1597}
[01:35:53] TEACHER: obviously before deleting the message, the consumer failed, then after the   {#1598}
[01:35:56] TEACHER: visibility timeout, typically two minutes or 10 minutes, let's say 10 minutes.   {#1599}
[01:35:59] TEACHER: So after 10 minutes, the message would reappear at the front of the queue.   {#1600}
[01:36:03] STUDENT_2: So what is the indication of failure?   {#1601}
[01:36:04] STUDENT_2: Let's say like no consumer is doing like, you don't delete it.   {#1602}
[01:36:07] TEACHER: You don't delete it.   {#1603}
[01:36:08] TEACHER: That's the indication of failure.   {#1604}
[01:36:10] TEACHER: The consumer after processing the message has to delete the message.   {#1605}
[01:36:13] STUDENT_5: Oh, it's part of the code.   {#1606}
[01:36:16] TEACHER: You have to write it.   {#1607}
[01:36:17] TEACHER: You have to write it.   {#1608}
---- OWNED SEGMENTS END ----

CTX| [01:36:20] STUDENT_2: Because we use stream, but we don't like write any code.   {#1609}
CTX| [01:36:24] STUDENT_2: Stream may you commit.   {#1610}
CTX| [01:36:25] TEACHER: Q may you delete.   {#1611}
CTX| [01:36:27] TEACHER: Okay.   {#1612}
CTX| [01:36:28] TEACHER: Stream may, if you don't commit, you would again start from the last checkpoint.   {#1613}
CTX| [01:36:32] STUDENT_2: It looks like the commit is also internal.   {#1614}
CTX| [01:36:34] STUDENT_2: We don't commit like part of the code.   {#1615}
CTX| [01:36:35] TEACHER: You commit or you have sent it to auto commit or a periodic commit.   {#1616}
CTX| [01:36:39] STUDENT_4: Okay.   {#1617}
CTX| [01:36:40] TEACHER: It's always there.   {#1618}
CTX| [01:36:41] TEACHER: It's always there.   {#1619}
CTX| [01:36:42] TEACHER: It's always there.   {#1620}
CTX| [01:36:42] TEACHER: It's not magical, right?   {#1621}
CTX| [01:36:43] TEACHER: Either you have to have said commit on every message.   {#1622}
CTX| [01:36:46] TEACHER: as an auto commit or a periodic commit.   {#1623}
CTX| [01:36:49] TEACHER: 100%.   {#1624}
CTX| [01:36:49] STUDENT_14: Yeah.   {#1625}
CTX| [01:36:50] STUDENT_14: Yeah.   {#1626}
CTX| [01:36:52] TEACHER: I'll take one more.   {#1627}
CTX| [01:36:53] TEACHER: Yeah.   {#1628}
CTX| [01:36:53] TEACHER: I'll take one more and then we'll go on a break.   {#1629}
CTX| [01:36:56] TEACHER: I'll just pick someone at random who I've not interacted with.   {#1630}
CTX| [01:36:59] TEACHER: Yes, Aditi.   {#1631}
CTX| [01:37:01] STUDENT_8: Yeah.   {#1632}
CTX| [01:37:01] STUDENT_8: So yesterday we looked into that connection pooling and there we were setting a maximum   {#1633}
CTX| [01:37:07] STUDENT_8: limit of connections and any further incoming connections would be, that would also be kind   {#1634}
CTX| [01:37:13] STUDENT_8: of a queue, right?   {#1635}
CTX| [01:37:16] TEACHER: difference here in message. This is infrastructure queue. This is a separate process that is an   {#1636}
