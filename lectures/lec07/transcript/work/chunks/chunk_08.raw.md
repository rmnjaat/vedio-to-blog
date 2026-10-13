# chunk_08  OWNS 01:23:41 -> 01:35:48  (segments #1503-#1745, 2233 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:22:48] TEACHER: Well, that's okay.   {#1487}
CTX| [01:22:49] TEACHER: So what I did is few of my friends, rather two of my friends came to me and   {#1488}
CTX| [01:22:58] TEACHER: And they said that, Arpit, we are building an IoT application.   {#1489}
CTX| [01:23:03] TEACHER: We have sensor data and we want to send data to this backend server.   {#1490}
CTX| [01:23:07] TEACHER: They knew Python, so they wrote a backend server in Python.   {#1491}
CTX| [01:23:11] TEACHER: So Flask framework HTTP request, that's what they knew.   {#1492}
CTX| [01:23:14] TEACHER: We had no idea what we were doing.   {#1493}
CTX| [01:23:16] TEACHER: They came to me as a problem and I just solved it for that.   {#1494}
CTX| [01:23:19] TEACHER: So while that, I explored this very interesting part.   {#1495}
CTX| [01:23:24] TEACHER: So for us to make requests in the backend,   {#1496}
CTX| [01:23:28] TEACHER: class will extend by at least 15 minutes,   {#1497}
CTX| [01:23:30] TEACHER: but it's fine.   {#1498}
CTX| [01:23:31] TEACHER: I want all of you to go in this depth   {#1499}
CTX| [01:23:32] TEACHER: because I'm finding it very interesting   {#1500}
CTX| [01:23:34] TEACHER: to discuss this thing.   {#1501}
CTX| [01:23:35] TEACHER: This is my most favorite week of all.   {#1502}

---- OWNED SEGMENTS START ----
[01:23:41] TEACHER: So the backend server,   {#1503}
[01:23:42] TEACHER: they had it handy in Python.   {#1504}
[01:23:46] TEACHER: They wrote it in Flask, right?   {#1505}
[01:23:47] TEACHER: But now from IoT sensors,   {#1506}
[01:23:50] TEACHER: they want to send data over here.   {#1507}
[01:23:51] TEACHER: But in IoT, you don't have Python.   {#1508}
[01:23:53] TEACHER: You don't have JavaScript.   {#1509}
[01:23:54] TEACHER: How will you make HTTP requests from here to here?   {#1510}
[01:23:58] TEACHER: understands HTTP your sensor understands TCP so now what do you do that's where I recalled   {#1511}
[01:24:03] TEACHER: that in the networking course we had some HTTP protocol format or something does this mean that   {#1512}
[01:24:10] TEACHER: if I establish a simple TCP connection and this was back in 2015 I just graduated post my master's   {#1513}
[01:24:18] TEACHER: and this this thing came up so I was not as experienced I had no idea but again applying   {#1514}
[01:24:24] TEACHER: the first principles applying the things that I knew to kind of solve this problem.   {#1515}
[01:24:28] TEACHER: So what I did is I just experimented in just two minutes that can we do something.   {#1516}
[01:24:34] TEACHER: I just established a raw TCP connection between the two using netcat.   {#1517}
[01:24:37] TEACHER: I knew netcat has utility that it establishes TCP connection and whatnot.   {#1518}
[01:24:41] TEACHER: So whenever you make an HTTP request, you see HTTP request headers going in, you see   {#1519}
[01:24:47] TEACHER: response headers coming out.   {#1520}
[01:24:48] TEACHER: So how does your web server know it's an HTTP request?   {#1521}
[01:24:54] TEACHER: So what happens when a client connects to your server, establishes the TCP connection   {#1522}
[01:24:59] TEACHER: between the two, the client sends data to the server.   {#1523}
[01:25:04] TEACHER: It can be any data.   {#1524}
[01:25:05] TEACHER: It literally is an ARPIT.   {#1525}
[01:25:07] TEACHER: That's it.   {#1526}
[01:25:07] TEACHER: A-R-P-I-T, 5 bytes data to that server.   {#1527}
[01:25:11] TEACHER: Now it's server's responsibility to understand what you have said.   {#1528}
[01:25:14] TEACHER: Now when it's a quote unquote web server, it understands HTTP request.   {#1529}
[01:25:20] TEACHER: When I say it understands HTTP request, which means that the data that would be sent from   {#1530}
[01:25:24] TEACHER: the client to the server will be in the HTTP format.   {#1531}
[01:25:29] TEACHER: This is what that format typically looks like.   {#1532}
[01:25:31] TEACHER: You all would have seen this, but this is literally how the data is sent to the server.   {#1533}
[01:25:38] TEACHER: get   {#1534}
[01:25:39] TEACHER: space slash   {#1535}
[01:25:41] TEACHER: h e l l o dot   {#1536}
[01:25:43] TEACHER: h t m l space   {#1537}
[01:25:44] TEACHER: h t t p slash 1.1   {#1538}
[01:25:47] TEACHER: slash r slash l   {#1539}
[01:25:49] TEACHER: u s e r   {#1540}
[01:25:50] TEACHER: this is exactly how it is sent   {#1541}
[01:25:52] TEACHER: it's a very textual format   {#1542}
[01:25:55] TEACHER: so now what happens when you send this   {#1543}
[01:25:57] TEACHER: so this is what I did   {#1544}
[01:25:58] TEACHER: I started my flask server   {#1545}
[01:26:01] TEACHER: over here it's just an IP address which I'm asking   {#1546}
[01:26:04] TEACHER: so   {#1547}
[01:26:04] TEACHER: this is just a flask server that is running on port 3000   {#1548}
[01:26:07] TEACHER: I literally did netcat localhost 3000.   {#1549}
[01:26:11] TEACHER: So I am literally establishing a TCP connection from this to this.   {#1550}
[01:26:17] TEACHER: Literally localhost 3000 page.   {#1551}
[01:26:18] TEACHER: I am establishing a TCP connection.   {#1552}
[01:26:20] TEACHER: Now look what I did.   {#1553}
[01:26:21] TEACHER: I just passed.   {#1554}
[01:26:23] TEACHER: This is a sample.   {#1555}
[01:26:24] TEACHER: No protocol.   {#1556}
[01:26:25] TEACHER: Nothing.   {#1557}
[01:26:26] TEACHER: I sent literally byte T H I A space I S space A space S A M P L E slash R slash N.   {#1558}
[01:26:38] TEACHER: In return, what I got error response, error code 400, bad request, syntax.   {#1559}
[01:26:43] TEACHER: This is a simple, this is a sample.   {#1560}
[01:26:45] TEACHER: This got me thinking that my God, I am able to make an HTTP request to the backend server.   {#1561}
[01:26:53] TEACHER: I'm talking, I'm just, just as a fresher.   {#1562}
[01:26:56] TEACHER: idea what I was doing, but I'm talking about this because I want all of you to think on   {#1563}
[01:27:00] TEACHER: the first principle.   {#1564}
[01:27:00] TEACHER: So if you already know and think I'm stupid, it might be, I was very live back then, but   {#1565}
[01:27:05] TEACHER: it was more about thinking on the first principles.   {#1566}
[01:27:07] TEACHER: Right.   {#1567}
[01:27:08] TEACHER: So when I did this and then I opened, then I Google search and found the HTTP specification   {#1568}
[01:27:12] TEACHER: from Wikipedia page.   {#1569}
[01:27:13] TEACHER: And I said, Hey, let me send this.   {#1570}
[01:27:17] TEACHER: Let's see what happens.   {#1571}
[01:27:18] TEACHER: I wrote get slash H E L L O space HTTP slash 1.1 slash R slash N.   {#1572}
[01:27:25] TEACHER: And I got this response.   {#1573}
[01:27:28] TEACHER: This is actual response.   {#1574}
[01:27:30] TEACHER: The hello world that I wrote in my handler.   {#1575}
[01:27:31] TEACHER: It got me this.   {#1576}
[01:27:34] TEACHER: I did not have, there is no Python running in this netcat that you see.   {#1577}
[01:27:38] TEACHER: It's a raw TCP connection in which I'm sending the data in a particular format,   {#1578}
[01:27:43] TEACHER: asking my web server to do like, this is a request where I'm filing get request   {#1579}
[01:27:48] TEACHER: protocol. This is actually what is going into the server as part of specification,   {#1580}
[01:27:53] TEACHER: what HTTP format, the HTTP protocol states, right? I just made it gave me the   {#1581}
[01:27:57] TEACHER: response. Now my problem is solved. Now I can fire requests. My IoT gadgets can   {#1582}
[01:28:03] TEACHER: fire requests through this backend written in Python without having Python   {#1583}
[01:28:06] TEACHER: request library or Node.js, Axios or Java Spring Boot, whatever request I've   {#1584}
[01:28:10] TEACHER: already used that over here, no need. I don't need fancy operating system.   {#1585}
[01:28:15] TEACHER: So normal TCP connection that that was the capability of the device, right?   {#1586}
[01:28:20] TEACHER: To create TCP connections and fire it.   {#1587}
[01:28:22] TEACHER: And that's, and then I got fancy and let me send a post request to this.   {#1588}
[01:28:28] TEACHER: So I, then I passed query parameters.   {#1589}
[01:28:31] TEACHER: I did basic posts.   {#1590}
[01:28:32] TEACHER: So basic post request looks something like this post slash login HTTP 1.1 content   {#1591}
[01:28:37] TEACHER: type content length and the username equal to a password equal to welcome.   {#1592}
[01:28:40] TEACHER: I got that.   {#1593}
[01:28:41] TEACHER: I handled and I got this login successful with that.   {#1594}
[01:28:43] TEACHER: with as I was making raw TCP connections firing the request,   {#1595}
[01:28:47] TEACHER: getting the response.   {#1596}
[01:28:48] TEACHER: Now, why we are talking about this?   {#1597}
[01:28:51] TEACHER: Because you see the overhead just to send this key value   {#1598}
[01:28:56] TEACHER: pair over here.   {#1599}
[01:28:57] TEACHER: I had to add this much of jargon.   {#1600}
[01:29:00] TEACHER: Is it worth it?   {#1601}
[01:29:01] TEACHER: Is it worth it?   {#1602}
[01:29:02] TEACHER: Because all I want to do is just store like e equal to a value   {#1603}
[01:29:05] TEACHER: equal to one, but I have this huge chunk of overhead along   {#1604}
[01:29:09] TEACHER: with every single message that I'm sending.   {#1605}
[01:29:11] TEACHER: can you do better?   {#1606}
[01:29:12] TEACHER: Because the more amount of data that you send in the request,   {#1607}
[01:29:15] TEACHER: the more your cache server would have to process it.   {#1608}
[01:29:18] TEACHER: Understand it.   {#1609}
[01:29:19] TEACHER: It works.   {#1610}
[01:29:20] TEACHER: It works.   {#1611}
[01:29:20] TEACHER: If you are making it highly optimized,   {#1612}
[01:29:22] TEACHER: then it does it.   {#1613}
[01:29:23] TEACHER: It's fine.   {#1614}
[01:29:24] TEACHER: Right?   {#1615}
[01:29:25] TEACHER: But this is what I want to talk about.   {#1616}
[01:29:27] TEACHER: Why?   {#1617}
[01:29:29] TEACHER: Defining your own protocol.   {#1618}
[01:29:30] TEACHER: So Redis has implemented its own version of protocol called RESP.   {#1619}
[01:29:34] TEACHER: It's a specification.   {#1620}
[01:29:35] TEACHER: Like how HTTP is a specification,   {#1621}
[01:29:38] TEACHER: which says for any server that claims that it understands HTTP request,   {#1622}
[01:29:44] TEACHER: it has to send data in this particular format and it would understand it.   {#1623}
[01:29:48] TEACHER: It's a specification.   {#1624}
[01:29:49] TEACHER: Similarly, Redis has defined their own specification   {#1625}
[01:29:51] TEACHER: that all Redis clans are the used to.   {#1626}
[01:29:54] TEACHER: Memcache has its own that all clans are the used to.   {#1627}
[01:29:58] TEACHER: And then it's a specific, that's what I said.   {#1628}
[01:30:00] TEACHER: It's just raw TCP.   {#1629}
[01:30:02] TEACHER: Whatever bytes you send, whatever handler you wrote,   {#1630}
[01:30:04] TEACHER: it would understand it.   {#1631}
[01:30:05] TEACHER: That's your thing, play by your rules.   {#1632}
[01:30:07] TEACHER: Right?   {#1633}
[01:30:08] TEACHER: But this is what I want to show how costly it becomes when you fire HTTP.   {#1634}
[01:30:13] TEACHER: Just use raw HTTP.   {#1635}
[01:30:15] TEACHER: Right.   {#1636}
[01:30:16] TEACHER: Okay.   {#1637}
[01:30:17] TEACHER: Now coming back to our discussion.   {#1638}
[01:30:19] TEACHER: Oh, I'm so happy today.   {#1639}
[01:30:22] TEACHER: I just love talking about this stuff, like thinking on every single design decisions.   {#1640}
[01:30:28] TEACHER: That's where the fun is.   {#1641}
[01:30:29] TEACHER: Okay.   {#1642}
[01:30:30] TEACHER: Where were we?   {#1643}
[01:30:32] TEACHER: Okay.   {#1644}
[01:30:33] TEACHER: So let me talk about HTTP.   {#1645}
[01:30:34] TEACHER: When can you use it?   {#1646}
[01:30:35] TEACHER: Why do you use it?   {#1647}
[01:30:36] TEACHER: Now this also brings up that point.   {#1648}
[01:30:38] TEACHER: that why Redis chose to use their own custom format   {#1649}
[01:30:42] TEACHER: because now it's your hand.   {#1650}
[01:30:43] TEACHER: However, you'd want to send data, you send the data to them   {#1651}
[01:30:45] TEACHER: without having any hiccups.   {#1652}
[01:30:48] TEACHER: GRPC is very compressed.   {#1653}
[01:30:50] TEACHER: It works on HTTP2.   {#1654}
[01:30:51] TEACHER: So it does not terminate the connection.   {#1655}
[01:30:53] TEACHER: It keeps the connection alive,   {#1656}
[01:30:55] TEACHER: but it compresses the objects and sends it and gets it back.   {#1657}
[01:30:58] TEACHER: So it's very optimized to do data transfer over network.   {#1658}
[01:31:01] TEACHER: The connection is kept open.   {#1659}
[01:31:03] TEACHER: It does not terminate.   {#1660}
[01:31:04] TEACHER: So you get best of all words.   {#1661}
[01:31:06] TEACHER: So you use HTTP GRPC custom format.   {#1662}
[01:31:08] TEACHER: depending on how complex or how simple or what your use case is,   {#1663}
[01:31:12] TEACHER: how you want people to talk to your client.   {#1664}
[01:31:16] TEACHER: And this is about communication.   {#1665}
[01:31:18] TEACHER: This is how, and in some cases you may choose to open all three.   {#1666}
[01:31:21] TEACHER: You make it configurable.   {#1667}
[01:31:22] TEACHER: How do you want to listen?   {#1668}
[01:31:23] TEACHER: Listen, it's all fine.   {#1669}
[01:31:25] TEACHER: And then what matters is somehow you should be able to talk to it.   {#1670}
[01:31:28] TEACHER: So which one is better?   {#1671}
[01:31:30] TEACHER: Again, very subjective, but creating HTTP connections every time might not be the best idea.   {#1672}
[01:31:35] TEACHER: keeping a connection open in either of these two cases is fine.   {#1673}
[01:31:39] TEACHER: gRPC if your client can support gRPC well enough.   {#1674}
[01:31:43] TEACHER: If not, you define your own custom format.   {#1675}
[01:31:45] TEACHER: So Redis will be defining their own custom format.   {#1676}
[01:31:47] TEACHER: You could go with gRPC.   {#1677}
[01:31:48] TEACHER: You can go with HTTP.   {#1678}
[01:31:49] TEACHER: Whatever floats your.   {#1679}
[01:31:50] TEACHER: Right.   {#1680}
[01:31:52] TEACHER: Oh, great.   {#1681}
[01:31:54] TEACHER: Now let's talk about.   {#1682}
[01:31:55] TEACHER: We are still not done with low-level implementation.   {#1683}
[01:31:58] TEACHER: Now let's talk about concurrency.   {#1684}
[01:32:00] TEACHER: Wait, I'll just basically formally cover concurrency,   {#1685}
[01:32:02] TEACHER: but because I'd be re-editing a lot of stuff there.   {#1686}
[01:32:05] TEACHER: I'm just lowering the hands.   {#1687}
[01:32:07] TEACHER: I'll take questions in some time   {#1688}
[01:32:08] TEACHER: because there's just a few things remaining.   {#1689}
[01:32:10] TEACHER: I might 10, 10 more minutes to cover LLD.   {#1690}
[01:32:13] TEACHER: Not LLD, I don't want to use that word.   {#1691}
[01:32:15] TEACHER: To cover this low-level implementation detail,   {#1692}
[01:32:17] TEACHER: then we go into high-level part.   {#1693}
[01:32:19] TEACHER: Okay.   {#1694}
[01:32:22] TEACHER: But, okay.   {#1695}
[01:32:24] TEACHER: Single-lot cache.   {#1696}
[01:32:25] TEACHER: So single-lot cache, the way we have   {#1697}
[01:32:27] TEACHER: is your in-memory hash table   {#1698}
[01:32:28] TEACHER: is what you are storing the data.   {#1699}
[01:32:30] TEACHER: This is what we spoke about,   {#1700}
[01:32:32] TEACHER: wrapping it in an object,   {#1701}
[01:32:33] TEACHER: object struct, type list, data,   {#1702}
[01:32:35] TEACHER: something something and then what you're doing is you're storing that exact same thing in hash table   {#1703}
[01:32:39] TEACHER: exactly the way we discussed it right now cash server how we define we define the communication   {#1704}
[01:32:45] TEACHER: protocol you can attend we'll go with tcp because we want statefulness we want guaranteed delivery   {#1705}
[01:32:50] TEACHER: we want actual judgments right udp is fire and forget we don't want that that we don't want to   {#1706}
[01:32:56] TEACHER: lose data because it's a quote unquote database right so that's why we would have to go with tcp   {#1707}
[01:33:01] TEACHER: But when you go with TCP, we typically have three options, a completely stateless HTTP,   {#1708}
[01:33:07] TEACHER: HTTP 1.1, which establishes the connection every time fires the query, gets the response   {#1709}
[01:33:12] TEACHER: and breaks the connection.   {#1710}
[01:33:13] TEACHER: Second is gRPC, which is stateful HTTP, works on stateful HTTP2.   {#1711}
[01:33:18] TEACHER: It keeps the connection open, contains this send a request, get the response, highly compressed,   {#1712}
[01:33:22] TEACHER: like it compresses the data very much and sends it back and whatnot.   {#1713}
[01:33:26] TEACHER: It uses Protobuf internally.   {#1714}
[01:33:27] TEACHER: If you are interested in gRPC, I think you should definitely explore gRPC a bit.   {#1715}
[01:33:31] TEACHER: never worked on it. Otherwise you define your own custom format depending on the needs that you have.   {#1716}
[01:33:36] TEACHER: But if you're just starting out, just wanting to prototype it, just use grpc and just get started   {#1717}
[01:33:41] TEACHER: with it without thinking too much about it. When to know the cache is full, wherever the cache is   {#1718}
[01:33:50] TEACHER: full, we have to evict it. Three strategies, LRU, LFU, we talked about, random eviction, it just   {#1719}
[01:33:55] TEACHER: randomly evicts one and that's the best part of it. So it has zero memory overhead. It literally   {#1720}
[01:34:01] TEACHER: and evicted so we are trading off the correctness of the system that it would delete the mulee   {#1721}
[01:34:07] TEACHER: specifically it might delete the most important key in the cache but it should be okay with that   {#1722}
[01:34:11] TEACHER: right but it would allow us to put in more number of the large amount of data in the cache so if   {#1723}
[01:34:17] TEACHER: that works well the overall benefit might be significant right how do you find caches full   {#1724}
[01:34:22] TEACHER: that's where we discuss z malloc like wrapping malloc and maintaining a total size over that   {#1725}
[01:34:27] TEACHER: right now let's come now talk about handling ttls now we'll spend detail time into this   {#1726}
[01:34:35] TEACHER: handling ttl is very important it's a key election we discussed in the second week when we're   {#1727}
[01:34:40] TEACHER: designing key value store we talk about how redis does it that same apparatus we'll use over here   {#1728}
[01:34:44] TEACHER: but understand this part that how at every single design decision because it's an in-memory cache   {#1729}
[01:34:51] TEACHER: what we got to know is because it is in-memory cache we have to ensure that we are using the   {#1730}
[01:34:57] TEACHER: minimum data, the bare minimum bytes to do anything.   {#1731}
[01:35:02] TEACHER: So if handling TTL also requires to store a lot of data, then it's futile because then   {#1732}
[01:35:08] TEACHER: you are spending a lot of, you are using a lot of data to do something which is not so   {#1733}
[01:35:12] TEACHER: critical.   {#1734}
[01:35:13] TEACHER: So which is where handling TTL also falls into that category.   {#1735}
[01:35:18] TEACHER: So how do you make your TTL consume less memory?   {#1736}
[01:35:22] TEACHER: So the idea is simple.   {#1737}
[01:35:23] TEACHER: First of all, we need to store absolute expiry for a particular key.   {#1738}
[01:35:29] TEACHER: Let's say I'm storing a key with a particular expiry.   {#1739}
[01:35:31] TEACHER: I have to store this information that is very minimum.   {#1740}
[01:35:33] TEACHER: So any expiration that you said will go into the object we discussed here.   {#1741}
[01:35:39] TEACHER: We have a large bids.   {#1742}
[01:35:40] TEACHER: We can have expiration as well set over here.   {#1743}
[01:35:42] TEACHER: Right?   {#1744}
[01:35:43] TEACHER: So when you are storing this, now the thing comes out that how do you clean that?   {#1745}
---- OWNED SEGMENTS END ----

CTX| [01:35:48] TEACHER: So first thing you might think I'll use priority queue for this, but priority queue, it's   {#1746}
CTX| [01:35:54] TEACHER: But you need additional data structure.   {#1747}
CTX| [01:35:56] TEACHER: So what do you do?   {#1748}
CTX| [01:35:57] TEACHER: In the second week, we spoke about sampling of keys, 20 keys and expirations, but that's   {#1749}
CTX| [01:36:03] TEACHER: not the only one.   {#1750}
CTX| [01:36:04] TEACHER: What we are doing is, as I said that time, I'm just re-editing it so that it fits into   {#1751}
CTX| [01:36:08] TEACHER: the context in order to make it lightweight and not use additional data structures like   {#1752}
CTX| [01:36:15] TEACHER: priority queue that requires a lot of pointers and all.   {#1753}
CTX| [01:36:18] TEACHER: We go with lazy deletion.   {#1754}
CTX| [01:36:20] TEACHER: first option lazy decision which means we don't delete we are doing TTL we are not doing efficient   {#1755}
CTX| [01:36:27] TEACHER: we are doing TTLs so if I access a key let's say user get a key when you went through the object you   {#1756}
CTX| [01:36:35] TEACHER: get at my value object in which you saw that uh expiration time the current time is more than   {#1757}
CTX| [01:36:41] TEACHER: expiration time which means a key is expired so then you delete the key how do you delete the key   {#1758}
CTX| [01:36:47] TEACHER: free call. Z free. Like Z malloc you'd have Z free that would do total size minus minus and free the   {#1759}
