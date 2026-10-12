# chunk_09  OWNS 01:39:48 -> 01:52:08  (segments #1580-#1769, 1957 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:38:50] TEACHER: No matter how protective you make it,   {#1561}
CTX| [01:38:52] TEACHER: exposing, making calls directly from WebSocket server to database   {#1562}
CTX| [01:38:55] TEACHER: puts a lot of load on this server.   {#1563}
CTX| [01:38:57] TEACHER: You typically want to avoid that.   {#1564}
CTX| [01:38:59] TEACHER: It's a little bit on the infrastructure side   {#1565}
CTX| [01:39:01] TEACHER: when you typically deploy it and you see it in action,   {#1566}
CTX| [01:39:02] TEACHER: you see where it folders.   {#1567}
CTX| [01:39:04] TEACHER: But I'm just giving you a glimpse of what happens.   {#1568}
CTX| [01:39:06] TEACHER: That's why a lot of companies never puts any complex logic   {#1569}
CTX| [01:39:09] TEACHER: on the WebSocket server.   {#1570}
CTX| [01:39:11] TEACHER: They just do relay of messages,   {#1571}
CTX| [01:39:12] TEACHER: of events that's it they don't put any complex except just ingesting the messages in an asynchronous   {#1572}
CTX| [01:39:18] TEACHER: queue typically typically no one's stopping you from making a db call on the web socket server   {#1573}
CTX| [01:39:23] TEACHER: but you avoid it you avoid it because of security implications because of load on the server because   {#1574}
CTX| [01:39:28] TEACHER: if this goes down it broke it breaks the entire real-time communication features of your platform   {#1575}
CTX| [01:39:35] TEACHER: right but in a gist three different types of persistence guarantees three different types   {#1576}
CTX| [01:39:42] TEACHER: Right.   {#1577}
CTX| [01:39:43] TEACHER: Okay.   {#1578}
CTX| [01:39:43] TEACHER: Before you move on any questions on this.   {#1579}

---- OWNED SEGMENTS START ----
[01:39:48] STUDENT_1: So basically I was actually thinking like a signing of messages can, can it be done via   {#1580}
[01:39:55] STUDENT_1: a UDP over TLS?   {#1581}
[01:39:58] TEACHER: Like, uh, you want guarantees persistence in case of that you need guaranteed persist.   {#1582}
[01:40:05] STUDENT_1: So basically like, uh, let's just say like, uh, the message, but like, uh, whenever we   {#1583}
[01:40:12] STUDENT_1: gray icon. Okay. Okay. And we already have a web socket connection for receiving, uh,   {#1584}
[01:40:18] STUDENT_1: receiving the messages, not sending, not sending them. Okay. We are sending the messages through,   {#1585}
[01:40:24] STUDENT_1: uh, uh, let's just say we are sending the messages through, uh, UDP over TLS. Okay.   {#1586}
[01:40:31] STUDENT_1: So anyway, web circuit connection is telling us like, uh, if there is any message or not,   {#1587}
[01:40:36] STUDENT_1: basically on the receiving end.   {#1588}
[01:40:39] STUDENT_1: Okay.   {#1589}
[01:40:39] STUDENT_1: So until that,   {#1590}
[01:40:41] STUDENT_1: like until WebSocket sends us   {#1591}
[01:40:44] STUDENT_1: like the message,   {#1592}
[01:40:47] STUDENT_1: basically like this message has been sent.   {#1593}
[01:40:49] STUDENT_1: Like this message is on the server now.   {#1594}
[01:40:52] STUDENT_1: Basically,   {#1595}
[01:40:53] STUDENT_1: we can retry it again in like,   {#1596}
[01:40:56] STUDENT_1: let's just say.   {#1597}
[01:40:58] STUDENT_1: So poor implementation.   {#1598}
[01:40:59] TEACHER: Imagine how many times would you want to retry?   {#1599}
[01:41:01] TEACHER: The guarantees are very slim.   {#1600}
[01:41:04] TEACHER: Right?   {#1601}
[01:41:04] TEACHER: The retry,   {#1602}
[01:41:06] TEACHER: much higher plus who will take care of broadcast then your client has to take care of broadcast   {#1603}
[01:41:11] TEACHER: because our client would know that the message is now persistent.   {#1604}
[01:41:14] TEACHER: Correct.   {#1605}
[01:41:15] TEACHER: Instead of server should be the one who should be doing it.   {#1606}
[01:41:18] TEACHER: Like when a send a message to be, if you're doing it over UDP, then who will tell B that   {#1607}
[01:41:24] TEACHER: the message is there now?   {#1608}
[01:41:27] STUDENT_10: Correct.   {#1609}
[01:41:28] STUDENT_1: No, I actually like the, the reason I thought of this is because like whenever you create   {#1610}
[01:41:34] STUDENT_1: a HTTP connection.   {#1611}
[01:41:36] STUDENT_1: Okay.   {#1612}
[01:41:37] STUDENT_1: HTTPS connection.   {#1613}
[01:41:38] STUDENT_1: It is like   {#1614}
[01:41:39] STUDENT_1: kind of like   {#1615}
[01:41:41] STUDENT_1: more resource heavy   {#1616}
[01:41:43] STUDENT_1: instead of like   {#1617}
[01:41:44] STUDENT_1: just creating UDP.   {#1618}
[01:41:46] TEACHER: Benefits versus   {#1619}
[01:41:47] TEACHER: like pros versus cons.   {#1620}
[01:41:49] TEACHER: You are getting   {#1621}
[01:41:49] TEACHER: this much   {#1622}
[01:41:51] TEACHER: just a change   {#1623}
[01:41:52] TEACHER: for overhead   {#1624}
[01:41:53] TEACHER: complexities of retries   {#1625}
[01:41:54] TEACHER: and whatnot.   {#1626}
[01:41:55] TEACHER: Don't overcomplicate.   {#1627}
[01:41:56] TEACHER: You don't need to.   {#1628}
[01:41:57] TEACHER: That's why you typically   {#1629}
[01:41:58] TEACHER: when you open it   {#1630}
[01:41:59] TEACHER: you see GRPC request   {#1631}
[01:42:00] TEACHER: getting fired there.   {#1632}
[01:42:01] TEACHER: You don't see any   {#1633}
[01:42:04] TEACHER: based fancy implementation, right?   {#1634}
[01:42:06] TEACHER: These micro optimizations, to be honest, does like you would use UDP when you're   {#1635}
[01:42:10] TEACHER: doing very high in the ocean, where it is okay for you to drop data, but not for   {#1636}
[01:42:15] TEACHER: as critical use cases slacks message persistence doing retries unnecessarily   {#1637}
[01:42:19] TEACHER: making client code unnecessary complex.   {#1638}
[01:42:21] TEACHER: I would not choose that.   {#1639}
[01:42:23] TEACHER: I would want to keep things simple and so it's easy to build complex systems.   {#1640}
[01:42:27] TEACHER: FYI, simple systems are harder to build and keep it really simple because   {#1641}
[01:42:31] TEACHER: simple systems scale.   {#1642}
[01:42:34] TEACHER: as you added unnecessary complexities that would stop scaling, whereas it becomes harder   {#1643}
[01:42:37] TEACHER: for you to debug, harder for you to onboard your engineers, harder for you to make future   {#1644}
[01:42:42] TEACHER: changes.   {#1645}
[01:42:43] TEACHER: It would kill down the extensibility of the system.   {#1646}
[01:42:50] STUDENT_3: So are you trying to imply that web sockets do not offer persistence?   {#1647}
[01:42:55] TEACHER: No, it does give you persistent connection, persistence, not database persistence.   {#1648}
[01:43:00] TEACHER: We are talking about database persistence, right?   {#1649}
[01:43:04] TEACHER: store the data is more important in case of Slack.   {#1650}
[01:43:07] TEACHER: Correct.   {#1651}
[01:43:08] TEACHER: If you do it on WebSocket, WebSocket has to talk to database.   {#1652}
[01:43:11] TEACHER: Like the WebSocket server has to talk to database, which would   {#1653}
[01:43:13] TEACHER: put load on this server.   {#1654}
[01:43:16] TEACHER: Okay.   {#1655}
[01:43:16] TEACHER: Right.   {#1656}
[01:43:16] TEACHER: Because this is any way balancing a lot of TCP connections   {#1657}
[01:43:18] TEACHER: any way over here.   {#1658}
[01:43:20] TEACHER: Now you are asking you to make a bunch of them to the database.   {#1659}
[01:43:23] TEACHER: Right.   {#1660}
[01:43:24] TEACHER: Security implications would be there.   {#1661}
[01:43:26] TEACHER: Load would be there.   {#1662}
[01:43:27] TEACHER: This server would be over well.   {#1663}
[01:43:29] TEACHER: Right.   {#1664}
[01:43:29] TEACHER: So, and if this goes down, it breaks the real time backbone of your   {#1665}
[01:43:35] TEACHER: yeah right so that's why the edge server will be communicating directly with the database   {#1666}
[01:43:41] TEACHER: in that's why i don't do that i never prefer my web socket server to talk to database ever i   {#1667}
[01:43:46] TEACHER: never do that security edge servers are typically most vulnerable servers in your infrastructure   {#1668}
[01:43:53] TEACHER: you typically avoid that you just at max put a message in kafka because this is not that critical   {#1669}
[01:43:58] TEACHER: because it would not hold anything just one kafka connection string to put the message   {#1670}
[01:44:04] TEACHER: go over here. So even if something breaches, you still ensure basic security, but you would not give   {#1671}
[01:44:09] TEACHER: up your database credentials because if you are making edge server directly talk to database or   {#1672}
[01:44:13] TEACHER: exposing a database credentials almost on the internet, if this gets compromised, you are gone.   {#1673}
[01:44:18] TEACHER: So you would want to keep your database credentials as secure as possible. So that's   {#1674}
[01:44:21] TEACHER: a better way to do it is on a backend server rather than doing on edge server. And when I say   {#1675}
[01:44:25] TEACHER: edge server, it's not cloud front edge servers. It's the normal servers on which web socket   {#1676}
[01:44:29] TEACHER: connections are established and calling it as well because it's a standard terminology.   {#1677}
[01:44:35] TEACHER: Okay.   {#1678}
[01:44:37] TEACHER: Okay.   {#1679}
[01:44:38] TEACHER: So these are three types of things.   {#1680}
[01:44:40] TEACHER: So now you can very beautifully see the different types of persistence in the database.   {#1681}
[01:44:45] TEACHER: I'm being explicit.   {#1682}
[01:44:47] TEACHER: Tells you how you can model different types of message sending paradigms and receiving   {#1683}
[01:44:54] TEACHER: will always happen over WebSocket.   {#1684}
[01:44:56] TEACHER: otherwise you would have to continuously do short polling and refresh the page so the flow would be   {#1685}
[01:45:02] TEACHER: in case of slack when message comes api server persisted in the database sends a notification   {#1686}
[01:45:08] TEACHER: to edge server to tell the user that message is received this is what would happen right okay so   {#1687}
[01:45:14] TEACHER: now if i pick this in our high level part we can just do copy paste of it and api server talk to   {#1688}
[01:45:23] TEACHER: So WebSocket server, we then talk to the user, right?   {#1689}
[01:45:26] TEACHER: Okay.   {#1690}
[01:45:27] TEACHER: So this is simple stack based application.   {#1691}
[01:45:29] TEACHER: Now you can also do it with a synchronous Kafka, not saying no to that.   {#1692}
[01:45:33] TEACHER: In my final diagram, I've done it with Kafka, but any implementation is possible.   {#1693}
[01:45:39] TEACHER: So all of us, you are playing with those guarantees, right?   {#1694}
[01:45:42] TEACHER: You'll see conflicting stuff because which is why I never converged to a design.   {#1695}
[01:45:46] TEACHER: It totally depends on guarantee.   {#1696}
[01:45:48] TEACHER: So the more years of experience you gain or the more heavy systems you build, you realize   {#1697}
[01:45:54] TEACHER: that every system is like you can build every system in 10 different ways.   {#1698}
[01:46:00] TEACHER: So depending on the guarantees, you pick one over the other.   {#1699}
[01:46:03] TEACHER: So I'm just picking this one.   {#1700}
[01:46:04] TEACHER: But in the final diagram, we will see a Kafka based implementation where I picked this route   {#1701}
[01:46:11] TEACHER: to build it.   {#1702}
[01:46:12] TEACHER: This Kafka based route to build it.   {#1703}
[01:46:14] TEACHER: But there is no reason for you to not do it this way.   {#1704}
[01:46:18] TEACHER: prefer doing it this way, but I drawn in the final diagram this way, but that does not   {#1705}
[01:46:23] TEACHER: mean you have to only do it with this way.   {#1706}
[01:46:25] TEACHER: Depending on the guarantees that you are doing or you are providing, you pick one over other.   {#1707}
[01:46:31] TEACHER: That's why I deliberately keep it conflicting so that it keeps you, it basically makes you   {#1708}
[01:46:37] TEACHER: think about every single decision that you are taking.   {#1709}
[01:46:41] TEACHER: So given now that we talked about WebSockets and we spoke about how it would get stored   {#1710}
[01:46:48] TEACHER: and how it would get communicated back now let's spend some time talking about scaling web and   {#1711}
[01:46:55] TEACHER: because that's another most interesting part like how to scale a web software now here assuming now   {#1712}
[01:47:03] TEACHER: we'll make very basic assumptions very basic but you can just change the number and make it a big   {#1713}
[01:47:07] TEACHER: uh you can just mimic the real world cases so now here we just it's easy to draw this part right i   {#1714}
[01:47:14] TEACHER: just drew web socket server everyone talks to that now and how do you scale web socket servers now   {#1715}
[01:47:19] TEACHER: here this is a very important part because web socket servers that you have is typically you   {#1716}
[01:47:27] TEACHER: would have always seen this whenever a company has or it uses web sockets the features that it   {#1717}
[01:47:35] TEACHER: drives through the web sockets are the most critical features for the particular problem   {#1718}
[01:47:39] TEACHER: For example, Discord, chat.   {#1719}
[01:47:43] TEACHER: If WebSocket servers are gone, how would that real-time chat could work?   {#1720}
[01:47:47] TEACHER: Video streaming, WebSocket.   {#1721}
[01:47:49] TEACHER: Kind of persistent connection, you can put it in categories of WebSockets.   {#1722}
[01:47:52] TEACHER: Anytime a product has a persistent connection,   {#1723}
[01:47:57] TEACHER: it implies that it is powering the most critical features out of it.   {#1724}
[01:48:02] TEACHER: Why?   {#1725}
[01:48:02] TEACHER: Because that expensive TCP connection that is persisted between the client and the backend   {#1726}
[01:48:09] TEACHER: because it would provide low latency communication because now you don't have to reestablish   {#1727}
[01:48:13] TEACHER: connection every time.   {#1728}
[01:48:14] TEACHER: This makes your product experience very rich.   {#1729}
[01:48:18] TEACHER: Right.   {#1730}
[01:48:19] TEACHER: So now here, what I want to highlight is first of all, that in like every other server you   {#1731}
[01:48:27] TEACHER: have, even a web socket server has a limit of number of connections it can handle.   {#1732}
[01:48:34] TEACHER: right. Assume for now, assume that the limit is four, four connection limit, right? Much   {#1733}
[01:48:44] TEACHER: more than that, but I'm starting with four. So that explanation is easy, right? Let's   {#1734}
[01:48:48] TEACHER: say I have a web software server in which I can create at max four web software connections.   {#1735}
[01:48:53] TEACHER: So now let's say for a particular channel, let's say channel one or other channel one,   {#1736}
[01:49:01] TEACHER: Let's say I have a particular channel, channel 1, in which I have 5 users.   {#1737}
[01:49:06] TEACHER: A, B, C, D and E.   {#1738}
[01:49:10] TEACHER: So when A sends a message on channel 1, the message should be received by B, C, D and E.   {#1739}
[01:49:16] TEACHER: All of them.   {#1740}
[01:49:17] TEACHER: Right?   {#1741}
[01:49:18] TEACHER: So now what has happened is, my web socket server has 4 connection limits.   {#1742}
[01:49:24] TEACHER: So what I get is, when my A user connected, B user connected, C user connected, D user connected.   {#1743}
[01:49:31] TEACHER: So A, B, C and D for users connected.   {#1744}
[01:49:36] TEACHER: Now when E would connect, where would E connect?   {#1745}
[01:49:39] TEACHER: Websocket 1 is like Websocket server 1 is filled.   {#1746}
[01:49:43] TEACHER: So now you would have another server in your infrastructure.   {#1747}
[01:49:47] TEACHER: Let's say a Websocket server 2 on which your user E is getting connected.   {#1748}
[01:49:55] TEACHER: Now these are persistent connections.   {#1749}
[01:49:57] TEACHER: These are Websocket connections.   {#1750}
[01:49:59] TEACHER: They are placed at A, B, C, D and E. These are persistent connections.   {#1751}
[01:50:05] TEACHER: They are there to drive very high performance, low latency communication.   {#1752}
[01:50:11] TEACHER: Now, when A sends a message, let's say now when A sends a message, this message needs   {#1753}
[01:50:18] TEACHER: to be sent to B, C, D and E. So A sends a message to this WebSocket server.   {#1754}
[01:50:24] TEACHER: Now the WebSocket server, let's say you're using Socket.io to build this.   {#1755}
[01:50:29] TEACHER: the web socket server would know through this library socket IO or any equivalent library   {#1756}
[01:50:34] TEACHER: that which all users are connected to me. That's the handshake that happens with the web socket   {#1757}
[01:50:40] TEACHER: server. Your web socket if you have ever written hello world with socket IO if not do write it.   {#1758}
[01:50:45] TEACHER: If yes you would know that in socket IO the web socket server knows who is connected to me. You   {#1759}
[01:50:59] TEACHER: B, C and D are connected to me.   {#1760}
[01:51:03] TEACHER: Right? So when I send a message from A, I provide that, hey, please send this message   {#1761}
[01:51:10] TEACHER: to a channel because that's what you do. A sends a message to a channel.   {#1762}
[01:51:15] TEACHER: The request comes over here, WebSocket 1. Now in WebSocket server 1, you would have the channel   {#1763}
[01:51:21] TEACHER: information cached. One way to do it is either cache the channel information, but how would   {#1764}
[01:51:26] TEACHER: websockets server one get to whom the message needs to be sent simple when server one when a   {#1765}
[01:51:37] TEACHER: connects to this right so when a user connects to a web socket server so a wants to connect to ws1   {#1766}
[01:51:47] TEACHER: so what it would do while establishing the web socket correction it first establishes   {#1767}
[01:51:52] TEACHER: And then it sends the meta information, meta information like A says I am part of channel   {#1768}
[01:52:04] TEACHER: one.   {#1769}
---- OWNED SEGMENTS END ----

CTX| [01:52:08] TEACHER: So whichever channel is a part of it tells the web socket server one that I am part of   {#1770}
CTX| [01:52:15] TEACHER: this channel one.   {#1771}
CTX| [01:52:16] TEACHER: Let's say A is part of channel one.   {#1772}
CTX| [01:52:21] TEACHER: a is part of basically membership information let me write it this way so a tells the membership   {#1773}
CTX| [01:52:28] TEACHER: information that i am part of channel c1 channel c2 and channel c3 over here anytime any user a b   {#1774}
CTX| [01:52:36] TEACHER: c or d any user joins any web socket server it tells the web socket server that hey i am part   {#1775}
CTX| [01:52:43] TEACHER: of these these these channels web socket server keeps this information in memory or maybe storing   {#1776}
CTX| [01:52:49] TEACHER: it in disk whatever it's okay right it keeps this information with itself so it knows that   {#1777}
CTX| [01:52:55] TEACHER: which all users are connected to me and which all channels are they part of right similarly   {#1778}
CTX| [01:53:01] TEACHER: on this web socket server 2 it would know that e is part of web socket server 2 knows that e is   {#1779}
