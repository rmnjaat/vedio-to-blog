# chunk_08  OWNS 01:27:03 -> 01:39:48  (segments #1370-#1579, 2239 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:26:08] TEACHER: Now, again, I'm just stretching it out.   {#1354}
CTX| [01:26:10] TEACHER: Just think on Slack's line that what kind of behavior.   {#1355}
CTX| [01:26:16] TEACHER: Now, enough that we talked about this part.   {#1356}
CTX| [01:26:19] TEACHER: Now, recall when you send a message on Slack, what happens?   {#1357}
CTX| [01:26:24] TEACHER: What happens when you send a message on Slack?   {#1358}
CTX| [01:26:27] TEACHER: what kind of behavior you see on Slack or Teams or any such tool.   {#1359}
CTX| [01:26:32] STUDENT_4: So the expectation is it should be shown immediately to other users.   {#1360}
CTX| [01:26:37] TEACHER: Not expectation.   {#1361}
CTX| [01:26:38] TEACHER: What do you see as a user?   {#1362}
CTX| [01:26:44] TEACHER: You don't see message immediately getting posted.   {#1363}
CTX| [01:26:46] TEACHER: Think about it.   {#1364}
CTX| [01:26:47] TEACHER: Try to recall.   {#1365}
CTX| [01:26:48] TEACHER: Or if you have a Slack open, just send yourself a Slack message   {#1366}
CTX| [01:26:51] TEACHER: and see what happens.   {#1367}
CTX| [01:26:56] TEACHER: Let me pull in summit summit.   {#1368}
CTX| [01:26:58] TEACHER: What would you do?   {#1369}

---- OWNED SEGMENTS START ----
[01:27:03] STUDENT_1: So I would choose a web socket.   {#1370}
[01:27:06] STUDENT_1: Definitely.   {#1371}
[01:27:07] STUDENT_1: Definitely.   {#1372}
[01:27:08] TEACHER: Definitely.   {#1373}
[01:27:09] TEACHER: It's a strong word.   {#1374}
[01:27:10] TEACHER: Okay.   {#1375}
[01:27:13] STUDENT_1: I'll tell you why.   {#1376}
[01:27:14] STUDENT_1: So see if I have to send message back and forth.   {#1377}
[01:27:18] STUDENT_1: So if I'm using API, then I would have to.   {#1378}
[01:27:21] STUDENT_1: It's Slack.   {#1379}
[01:27:23] TEACHER: Slack back and forth.   {#1380}
[01:27:25] TEACHER: It's only sending that we're talking about.   {#1381}
[01:27:26] TEACHER: I'm not even going into receiving part of it.   {#1382}
[01:27:28] TEACHER: Receiving has to be done over WebSocket.   {#1383}
[01:27:30] TEACHER: I'm not denying that at all.   {#1384}
[01:27:32] TEACHER: I'm talking about sending part.   {#1385}
[01:27:34] TEACHER: Sending the message.   {#1386}
[01:27:35] TEACHER: I'm not even talking about receiving.   {#1387}
[01:27:38] STUDENT_1: Sending also in case of sending message.   {#1388}
[01:27:42] STUDENT_1: If we establish a rest call, let's say.   {#1389}
[01:27:46] STUDENT_1: If we establish a rest call, then we would have to need to establish a handshake and everything.   {#1390}
[01:27:52] STUDENT_1: We have to establish a TCP.   {#1391}
[01:27:54] TEACHER: Then the entire world should use just WebSockets for everything.   {#1392}
[01:27:57] TEACHER: Right.   {#1393}
[01:27:57] TEACHER: Why are we not building everything on WebSocket?   {#1394}
[01:27:59] TEACHER: Why do we even have normal API servers?   {#1395}
[01:28:01] TEACHER: Why are you spinning up Spring Boot instances?   {#1396}
[01:28:04] TEACHER: Just use WebSockets everywhere.   {#1397}
[01:28:07] TEACHER: Right.   {#1398}
[01:28:08] TEACHER: Okay.   {#1399}
[01:28:08] TEACHER: Let me talk about it.   {#1400}
[01:28:10] TEACHER: Let me talk about it in a little more detail.   {#1401}
[01:28:12] TEACHER: So now recall that whenever you are putting out a message on Slack,   {#1402}
[01:28:19] TEACHER: Think of the guarantees that you need to provide to your customer.   {#1403}
[01:28:23] TEACHER: Now, I am Slack.   {#1404}
[01:28:24] TEACHER: I want to provide guarantees to my customer.   {#1405}
[01:28:26] TEACHER: Now, first thing that I would have to do is recall when you are sending a message.   {#1406}
[01:28:32] TEACHER: First, it's like you see it gray and then it turns black.   {#1407}
[01:28:36] TEACHER: It is not in an instant that a message is sent.   {#1408}
[01:28:40] TEACHER: You can see, you can visibly see a delay when you hit the send button.   {#1409}
[01:28:46] TEACHER: It takes time for that to happen.   {#1410}
[01:28:49] TEACHER: This is a very clear indication that it is not extreme real time.   {#1411}
[01:28:54] TEACHER: It's not that it is like immediately sending the message and sending it to everyone.   {#1412}
[01:29:00] TEACHER: It is very clear evidence of the fact that it is not, or it may be, but it is most probably   {#1413}
[01:29:07] TEACHER: it is not a web software.   {#1414}
[01:29:09] TEACHER: Right.   {#1415}
[01:29:09] TEACHER: That is one hint.   {#1416}
[01:29:10] TEACHER: It's not that it is truth, but it is one hint.   {#1417}
[01:29:13] TEACHER: Now let me wait, wait, wait, wait, wait, then when flows, I mean, so.   {#1418}
[01:29:19] TEACHER: Now here, what I would want to introduce is I want to introduce three types of communication   {#1419}
[01:29:25] TEACHER: in this one space.   {#1420}
[01:29:27] TEACHER: Just a minute.   {#1421}
[01:29:28] TEACHER: I have a very nice diagram for that.   {#1422}
[01:29:30] TEACHER: This is one.   {#1423}
[01:29:31] TEACHER: So depending on the guarantees that you want to provide to your users, you would pick one   {#1424}
[01:29:39] TEACHER: over the other.   {#1425}
[01:29:40] TEACHER: I'm taking three examples over here.   {#1426}
[01:29:42] TEACHER: First is Slack.   {#1427}
[01:29:43] TEACHER: That's my hypothesis.   {#1428}
[01:29:44] TEACHER: I may be wrong, but what you should be more grasping is the three types of communication   {#1429}
[01:29:49] TEACHER: piggybacked on the same system right i'm just playing with guarantees that i want to provide   {#1430}
[01:29:54] TEACHER: and how i'm architecting the solution around that right so just observe over here and see   {#1431}
[01:30:00] TEACHER: how beautifully this three types of like how different guarantees shape your system right   {#1432}
[01:30:06] TEACHER: okay so we have databases in which we are storing the data we have users we have api servers normal   {#1433}
[01:30:13] TEACHER: http servers and we have edge server now edge server i'm just naming it fancy but it is basically   {#1434}
[01:30:19] TEACHER: a web socket server so these are web socket connections established over here normal rest   {#1435}
[01:30:23] TEACHER: established over here database and this is a broker like kafka right now what we'll do is let's say   {#1436}
[01:30:30] TEACHER: i'm slack and i want to provide guarantees like when my message persists then only i will broadcast   {#1437}
[01:30:38] TEACHER: Obviously, for example, if I send a message over WebSocket and I, without persisting,   {#1438}
[01:30:46] TEACHER: I just broadcast it to all the users of that channel for an enterprise user, for an enterprise   {#1439}
[01:30:52] TEACHER: customer, it's very bad experience because unless and until that is saved, I should not   {#1440}
[01:31:00] TEACHER: be sending it to anyone.   {#1441}
[01:31:02] TEACHER: That's a use case, right?   {#1442}
[01:31:03] TEACHER: Because if the message is not saved in my database and I'm just bluntly broadcasting it to everyone, that's wrong.   {#1443}
[01:31:11] TEACHER: That's wrong on so many levels.   {#1444}
[01:31:13] TEACHER: It is okay to do it with normal user like you and me on Instagram chatting, but not on an enterprise application where communication is the key.   {#1445}
[01:31:22] TEACHER: Because if you just sent out a message to everyone without you ensuring the persistence, then there is a loss of credibility.   {#1446}
[01:31:31] TEACHER: Why?   {#1447}
[01:31:31] TEACHER: Because then people can misquote you.   {#1448}
[01:31:33] TEACHER: no, no, no, I received this message.   {#1449}
[01:31:35] TEACHER: See, it's the right here.   {#1450}
[01:31:36] TEACHER: No, that's not how it works.   {#1451}
[01:31:38] TEACHER: Right?   {#1452}
[01:31:38] TEACHER: So here, what is there is you don't rely on your,   {#1453}
[01:31:44] TEACHER: this kind of messaging, salutes, web socket.   {#1454}
[01:31:47] TEACHER: No, have a proper reasoning for everything.   {#1455}
[01:31:50] TEACHER: So for Slack, what makes sense is I will send the notification to a user   {#1456}
[01:31:56] TEACHER: or send a message to a user only after it is getting persisted.   {#1457}
[01:32:00] TEACHER: So because persistence is really important for me, I have to do synchronous persistence.   {#1458}
[01:32:06] TEACHER: Now, which means making a call to API server, persisting the message, API server sending the message to WebSocket server and the message in real time getting delivered to the user.   {#1459}
[01:32:17] TEACHER: This is the flow that we would take.   {#1460}
[01:32:19] TEACHER: So message from a user comes to API server, persist it in the database, message or event sent to a server which sends this data to your user.   {#1461}
[01:32:28] TEACHER: which sends this message to user in real life, so the user doesn't have to refresh the page   {#1462}
[01:32:31] TEACHER: every time. So sending normal HTTP receiving or web socket, because that's a good experience.   {#1463}
[01:32:38] TEACHER: What we are doing is we are ensuring the message is persistent before we send this to the user.   {#1464}
[01:32:43] TEACHER: That's first kind of communication, right? Where persistence of message is more important   {#1465}
[01:32:50] TEACHER: than like just blunt broadcast of it. Right? Because we don't want people to misquote on   {#1466}
[01:32:58] TEACHER: Because also one more reason because not each user has a separate storage.   {#1467}
[01:33:03] TEACHER: For example, imagine WhatsApp.   {#1468}
[01:33:06] TEACHER: In WhatsApp, when you type a message and you send the message is stored on your local mobile.   {#1469}
[01:33:15] TEACHER: And then it is sent in the backend to be broadcasted to normal public.   {#1470}
[01:33:20] TEACHER: Now hypothetically WhatsApp doesn't do this, but hypothetically, let's say WhatsApp also   {#1471}
[01:33:25] TEACHER: wants to store this message to a backend.   {#1472}
[01:33:29] TEACHER: WhatsApp doesn't do it again.   {#1473}
[01:33:30] TEACHER: I'm saying, but hypothetically, let's say it wants to do it.   {#1474}
[01:33:34] TEACHER: WhatsApp wants to store this message in the backend.   {#1475}
[01:33:36] TEACHER: Now imagine WhatsApp one copy of messages anyway stored on user local device.   {#1476}
[01:33:42] TEACHER: Now if WhatsApp takes this route to store the message before it sends it to user.   {#1477}
[01:33:48] TEACHER: Now imagine you sending a message to your friend on WhatsApp.   {#1478}
[01:33:52] TEACHER: It was makes an HTTP call.   {#1479}
[01:33:54] TEACHER: My God.   {#1480}
[01:33:55] TEACHER: in the database and then comes back and talks to your web   {#1481}
[01:33:58] TEACHER: socket server and then sends it to the user.   {#1482}
[01:34:00] TEACHER: It's so slow.   {#1483}
[01:34:01] TEACHER: WhatsApp is meant to be very fast real time chat.   {#1484}
[01:34:04] TEACHER: It's not an enterprise application.   {#1485}
[01:34:06] TEACHER: Right.   {#1486}
[01:34:06] TEACHER: So given this where persistence is anywhere happening on   {#1487}
[01:34:10] TEACHER: a user device and I can very well do this part asynchronously.   {#1488}
[01:34:17] TEACHER: So what I can do is I can skip going through this route   {#1489}
[01:34:22] TEACHER: and you follow the green line.   {#1490}
[01:34:23] TEACHER: Now green line is WhatsApp hypothetical example of WhatsApp.   {#1491}
[01:34:25] TEACHER: where it also stores it in backend.   {#1492}
[01:34:27] TEACHER: So messages sent from one user over WebSocket.   {#1493}
[01:34:31] TEACHER: This message is just pushed onto Kafka later to be stored in database.   {#1494}
[01:34:36] TEACHER: You don't need to store it synchronously to this database because that's   {#1495}
[01:34:39] TEACHER: not what you're guaranteeing, right?   {#1496}
[01:34:41] TEACHER: What user has one copy of the message anyway, you are not guaranteeing   {#1497}
[01:34:46] TEACHER: persistence right away because from edge server, the message would be   {#1498}
[01:34:49] TEACHER: sent to other user directly.   {#1499}
[01:34:52] TEACHER: you this way what you get is you are not making synchronous call to your database to store it you   {#1500}
[01:34:57] TEACHER: can do batch right through a synchronous medium over here and still give real-time user experience   {#1501}
[01:35:03] TEACHER: to your user this is second type of communication and here i'm assuming that my chat application is   {#1502}
[01:35:10] TEACHER: also asynchronously storing the messages in the backend it has to i'm giving i'm saying whatsapp   {#1503}
[01:35:14] TEACHER: doesn't store it but i'm just suggesting if it was storing it it does not have to do it synchronously   {#1504}
[01:35:21] TEACHER: asynchronously. So what you do, you get a message over WebSocket because it has to be real-time.   {#1505}
[01:35:26] TEACHER: Now because the connection is already open, now we will use it. Given that one copy of data would   {#1506}
[01:35:30] TEACHER: be stored on the user and anyway, you immediately send it to WebSocket server. It's just so persisted   {#1507}
[01:35:37] TEACHER: in Kafka and sends it back to another user in real-time. When this happens, it is asynchronously   {#1508}
[01:35:44] TEACHER: getting processed and stored in the database in case it wants to. That is second type of   {#1509}
[01:35:51] TEACHER: type of guarantees here we are synchronously guaranteeing the persistence of message before   {#1510}
[01:35:56] TEACHER: we broadcast it to other user before we send it to other users.   {#1511}
[01:35:59] TEACHER: In second one, we know that first my message is stored in Kafka, it would eventually be   {#1512}
[01:36:05] TEACHER: persisted in the database and user will not directly call this database to retrieve other   {#1513}
[01:36:10] TEACHER: messages.   {#1514}
[01:36:10] TEACHER: Like user will not refresh anyway, right?   {#1515}
[01:36:13] TEACHER: On Slack, you can do that on Slack.   {#1516}
[01:36:16] TEACHER: Other user can refresh the channel and see the messages.   {#1517}
[01:36:18] TEACHER: So that's why persistence is very important because this asynchronous, this asynchronous   {#1518}
[01:36:24] TEACHER: processing might take time.   {#1519}
[01:36:25] TEACHER: Let's say it takes 10 minutes for you to persist the message in the DB.   {#1520}
[01:36:28] TEACHER: Imagine Slack.   {#1521}
[01:36:30] TEACHER: Let's say if you take this route on Slack, what would happen?   {#1522}
[01:36:33] TEACHER: You send a message on web socket, push it onto Kafka in 10 minutes, it will be stored   {#1523}
[01:36:38] TEACHER: onto DB.   {#1524}
[01:36:39] TEACHER: But before that you post the message, you send notification to other users.   {#1525}
[01:36:43] TEACHER: Now users refresh the page.   {#1526}
[01:36:45] TEACHER: They don't see message because it is coming from the database because it is yet to be   {#1527}
[01:36:48] TEACHER: of this. So bad idea to do this with Slack, but on WhatsApp, it is open and different   {#1528}
[01:36:55] TEACHER: guarantees, different architecture. Right. Okay. Now the third type of the third type   {#1529}
[01:37:00] TEACHER: of thing is where the first is where we are guaranteeing persistent. Second is we are   {#1530}
[01:37:04] TEACHER: doing a synchronous part. Now the third part, Hey, you don't give a crap about stuff. You   {#1531}
[01:37:10] TEACHER: say you send message. I send a message. For example, you send a user a message that user   {#1532}
[01:37:15] TEACHER: gets it. You don't care about persistence at all. Zoom chat is a classic example.   {#1533}
[01:37:18] TEACHER: Zoom chat has zero persistence.   {#1534}
[01:37:21] TEACHER: Zoom chat persists.   {#1535}
[01:37:22] TEACHER: Like for example, if you post a message on Zoom chat,   {#1536}
[01:37:25] TEACHER: you go out, you come back in,   {#1537}
[01:37:27] TEACHER: you don't see historical messages on Zoom chat.   {#1538}
[01:37:29] TEACHER: You see the messages on the Zoom chat when you are online.   {#1539}
[01:37:34] TEACHER: Otherwise, you don't see historical messages at all   {#1540}
[01:37:36] TEACHER: because it does not store anything.   {#1541}
[01:37:38] TEACHER: It has no backend storage for Zoom chat.   {#1542}
[01:37:40] TEACHER: So that kind of use case is literally   {#1543}
[01:37:43] TEACHER: user A sending the message.   {#1544}
[01:37:44] TEACHER: Everyone connected on that meeting gets the message and done.   {#1545}
[01:37:48] TEACHER: more than that. That's the third type of message that you don't care about persistence at all.   {#1546}
[01:37:54] TEACHER: But what you need is real time, right? You don't care about persistence. You don't want to store   {#1547}
[01:37:57] TEACHER: it in back at all. Persistence is not that. So depending on the varying level of persistence,   {#1548}
[01:38:04] TEACHER: you are picking one way or the other. And this is the kind of intuition I want you all to build.   {#1549}
[01:38:12] TEACHER: It's not hard.   {#1550}
[01:38:14] TEACHER: It's and don't just be ingrained about stuff that, Hey, this is the only way to do that.   {#1551}
[01:38:22] TEACHER: If I have WebSocket, let me just send it over it.   {#1552}
[01:38:24] TEACHER: Now I'll give one more reason.   {#1553}
[01:38:25] TEACHER: One more reason why you should not do it via WebSocket.   {#1554}
[01:38:29] TEACHER: Now imagine this edge server, which is basically a WebSocket server.   {#1555}
[01:38:34] TEACHER: WebSocket server creating connection with your database.   {#1556}
[01:38:38] TEACHER: WebSocket server is already handing a ton of TCP connection.   {#1557}
[01:38:42] TEACHER: on this database.   {#1558}
[01:38:44] TEACHER: This WebSocket server is open on the internet,   {#1559}
[01:38:47] TEACHER: having connections string to the database security problem.   {#1560}
[01:38:50] TEACHER: No matter how protective you make it,   {#1561}
[01:38:52] TEACHER: exposing, making calls directly from WebSocket server to database   {#1562}
[01:38:55] TEACHER: puts a lot of load on this server.   {#1563}
[01:38:57] TEACHER: You typically want to avoid that.   {#1564}
[01:38:59] TEACHER: It's a little bit on the infrastructure side   {#1565}
[01:39:01] TEACHER: when you typically deploy it and you see it in action,   {#1566}
[01:39:02] TEACHER: you see where it folders.   {#1567}
[01:39:04] TEACHER: But I'm just giving you a glimpse of what happens.   {#1568}
[01:39:06] TEACHER: That's why a lot of companies never puts any complex logic   {#1569}
[01:39:09] TEACHER: on the WebSocket server.   {#1570}
[01:39:11] TEACHER: They just do relay of messages,   {#1571}
[01:39:12] TEACHER: of events that's it they don't put any complex except just ingesting the messages in an asynchronous   {#1572}
[01:39:18] TEACHER: queue typically typically no one's stopping you from making a db call on the web socket server   {#1573}
[01:39:23] TEACHER: but you avoid it you avoid it because of security implications because of load on the server because   {#1574}
[01:39:28] TEACHER: if this goes down it broke it breaks the entire real-time communication features of your platform   {#1575}
[01:39:35] TEACHER: right but in a gist three different types of persistence guarantees three different types   {#1576}
[01:39:42] TEACHER: Right.   {#1577}
[01:39:43] TEACHER: Okay.   {#1578}
[01:39:43] TEACHER: Before you move on any questions on this.   {#1579}
---- OWNED SEGMENTS END ----

CTX| [01:39:48] STUDENT_1: So basically I was actually thinking like a signing of messages can, can it be done via   {#1580}
CTX| [01:39:55] STUDENT_1: a UDP over TLS?   {#1581}
CTX| [01:39:58] TEACHER: Like, uh, you want guarantees persistence in case of that you need guaranteed persist.   {#1582}
CTX| [01:40:05] STUDENT_1: So basically like, uh, let's just say like, uh, the message, but like, uh, whenever we   {#1583}
CTX| [01:40:12] STUDENT_1: gray icon. Okay. Okay. And we already have a web socket connection for receiving, uh,   {#1584}
CTX| [01:40:18] STUDENT_1: receiving the messages, not sending, not sending them. Okay. We are sending the messages through,   {#1585}
CTX| [01:40:24] STUDENT_1: uh, uh, let's just say we are sending the messages through, uh, UDP over TLS. Okay.   {#1586}
CTX| [01:40:31] STUDENT_1: So anyway, web circuit connection is telling us like, uh, if there is any message or not,   {#1587}
CTX| [01:40:36] STUDENT_1: basically on the receiving end.   {#1588}
CTX| [01:40:39] STUDENT_1: Okay.   {#1589}
CTX| [01:40:39] STUDENT_1: So until that,   {#1590}
CTX| [01:40:41] STUDENT_1: like until WebSocket sends us   {#1591}
CTX| [01:40:44] STUDENT_1: like the message,   {#1592}
CTX| [01:40:47] STUDENT_1: basically like this message has been sent.   {#1593}
