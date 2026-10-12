# chunk_10  OWNS 01:49:02 -> 02:01:30  (segments #1694-#1868, 2267 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:48:03] TEACHER: at any point in time one traffic signal goes green allowing it to consume that middle part   {#1682}
CTX| [01:48:11] TEACHER: then it turns red then other turns green in that access section right so this is the shared resource   {#1683}
CTX| [01:48:17] TEACHER: we are allowing one side of the road to access the middle part to move on to go on the other side   {#1684}
CTX| [01:48:22] TEACHER: right this is a classic case this are semifers this is a locking mechanism you are locking   {#1685}
CTX| [01:48:28] TEACHER: other threads while one is accessing it when one is done you give chance to other thread to do it   {#1686}
CTX| [01:48:33] TEACHER: That's literally what locking does for you.   {#1687}
CTX| [01:48:36] TEACHER: This is exactly what pessimistic locking is.   {#1688}
CTX| [01:48:40] TEACHER: That's a simplest analogy that I can give to explain this part.   {#1689}
CTX| [01:48:45] TEACHER: You can see the entire domain of computer science, entire, not even exactly when I say   {#1690}
CTX| [01:48:51] TEACHER: entire, the entire domain of computer science is very well.   {#1691}
CTX| [01:48:55] TEACHER: You can see them in action in your real world.   {#1692}
CTX| [01:48:58] TEACHER: It's heavily inspired on how humans behave.   {#1693}

---- OWNED SEGMENTS START ----
[01:49:02] TEACHER: Locking are a way to do it.   {#1694}
[01:49:03] TEACHER: A way to implement pessimistic locking is with mutex and   {#1695}
[01:49:06] TEACHER: same upwards.   {#1696}
[01:49:07] TEACHER: So you will find those terms here and there.   {#1697}
[01:49:09] TEACHER: And there are lock-free data structures like CRDTs, the most brilliant data structures   {#1698}
[01:49:14] TEACHER: like I've read about CRDTs, lock-free implementations and not, and we'll not touch upon that as   {#1699}
[01:49:20] TEACHER: advanced data structure part, but know those talks like something like this even exists.   {#1700}
[01:49:24] TEACHER: Right.   {#1701}
[01:49:24] TEACHER: But we'll touch upon this concurrency in very high depth when it comes to database, how   {#1702}
[01:49:30] TEACHER: We'll see it in action.   {#1703}
[01:49:31] TEACHER: And that would solidify the entire understudy.   {#1704}
[01:49:34] TEACHER: But I'm just sprinkling it a bit so that we understand how that happens.   {#1705}
[01:49:38] TEACHER: Okay.   {#1706}
[01:49:39] TEACHER: So in our medium example, where does this concurrency fit in?   {#1707}
[01:49:42] TEACHER: For example, two people collabed on an article at the exact same time.   {#1708}
[01:49:49] TEACHER: Now what would happen?   {#1709}
[01:49:50] TEACHER: You have to enter that account.   {#1710}
[01:49:52] TEACHER: If it was 100, it becomes 102.   {#1711}
[01:49:54] TEACHER: It cannot be 101.   {#1712}
[01:49:56] TEACHER: Right?   {#1713}
[01:49:56] TEACHER: So how do you do that?   {#1714}
[01:49:57] TEACHER: You do it by using transactions or atomic instructions on your database.   {#1715}
[01:50:02] TEACHER: So when you are doing, updating your database,   {#1716}
[01:50:04] TEACHER: you do it in a transaction, asset properties.   {#1717}
[01:50:07] TEACHER: That's what your databases are known for.   {#1718}
[01:50:09] TEACHER: Or if not transactions, it will give you atomic operations.   {#1719}
[01:50:12] TEACHER: You do that in order to ensure that your data is always correct.   {#1720}
[01:50:18] TEACHER: So transactions are a way to do that.   {#1721}
[01:50:20] TEACHER: Next week, we'll go in depth of database transactions,   {#1722}
[01:50:22] TEACHER: locking and all to ensure the correctness of the system   {#1723}
[01:50:24] TEACHER: while ensuring high flow.   {#1724}
[01:50:26] TEACHER: So this is just a sprinkled taste of concurrency, but because anyway, we are going in depth in   {#1725}
[01:50:32] TEACHER: third week, sixth week and seventh week.   {#1726}
[01:50:34] TEACHER: That's why I'm just briefly touching upon that.   {#1727}
[01:50:36] TEACHER: Okay.   {#1728}
[01:50:38] TEACHER: Then let's talk about communication and then I'll take the combined questions of both at   {#1729}
[01:50:42] TEACHER: the end.   {#1730}
[01:50:43] TEACHER: Let's talk about communication because this is the most neglected part per se, when it   {#1731}
[01:50:48] TEACHER: comes to system design.   {#1732}
[01:50:49] TEACHER: Like when someone is architecting a system, no one thinks about communication.   {#1733}
[01:50:53] TEACHER: I'll express rest and point and get it done.   {#1734}
[01:50:56] TEACHER: It is not the only way to do it.   {#1735}
[01:50:59] TEACHER: Folks, first of all, don't know what rest is to be honest.   {#1736}
[01:51:01] TEACHER: They think HTTP endpoints are rest.   {#1737}
[01:51:03] TEACHER: If you are one of them, don't don't exposing HTTP endpoint does not mean it's a rest call   {#1738}
[01:51:10] TEACHER: hundred percent.   {#1739}
[01:51:11] TEACHER: I have a video on it in case you would want to know what actual rest is, what HTTP endpoints   {#1740}
[01:51:17] TEACHER: are.   {#1741}
[01:51:17] TEACHER: HTTP is a way to implement rest.   {#1742}
[01:51:19] TEACHER: Rest is a specification on how you should expose your endpoints.   {#1743}
[01:51:25] TEACHER: exposing the endpoint right so rest tells you how to do it the best way http is a medium to get it   {#1744}
[01:51:32] TEACHER: done in case you have this confusion go on my youtube channel you'll find a video titled so you   {#1745}
[01:51:37] TEACHER: know rest yeah that's the one what's that you'll understand what rest is but in general we expose   {#1746}
[01:51:45] TEACHER: we typically expose http inputs generic term for that is remote procedure calls rpcs different from   {#1747}
[01:51:55] TEACHER: Different RPCs is a generic name, which means that a client can invoke a procedure on a server through a specification.   {#1748}
[01:52:07] TEACHER: That's an RPC, that's a remote procedure call.   {#1749}
[01:52:10] TEACHER: HTTP web server that we all create day-to-day world, that is a way to do RPC, remote procedure call,   {#1750}
[01:52:16] TEACHER: where you are sending an HTTP request server understands that if request is in this format, which method to call.   {#1751}
[01:52:25] TEACHER: what RPC is. So you send a request, server does the processing and sends the response.   {#1752}
[01:52:30] TEACHER: This is a standard, like most common way of doing the communication between client and the server.   {#1753}
[01:52:36] TEACHER: The server is the one who is doing the heavy lifting because it has access to databases,   {#1754}
[01:52:41] TEACHER: does computation, encryption, decryption, authentication, authorization and whatnot.   {#1755}
[01:52:45] TEACHER: Your client just says, yeah, I want to do, I want this. It's like you ordering in a restaurant.   {#1756}
[01:52:50] TEACHER: You just say, Hey, I want burger.   {#1757}
[01:52:53] TEACHER: The kitchen staff goes and does the heavy lifting.   {#1758}
[01:52:56] TEACHER: That's the server part of it.   {#1759}
[01:52:57] TEACHER: That does the heavy lifting to prepare the burger and bring it to you.   {#1760}
[01:53:01] TEACHER: So you are the client demanding something.   {#1761}
[01:53:03] TEACHER: Server is the one doing the heavy lifting and sending the response back to you.   {#1762}
[01:53:08] TEACHER: But this is typically a standard the way people almost do it.   {#1763}
[01:53:13] TEACHER: But there are other paradigms that I want to talk about.   {#1764}
[01:53:15] TEACHER: First is shot polling.   {#1765}
[01:53:17] TEACHER: Now, short polling is a very interesting, it's a very interesting way to build or to basically   {#1766}
[01:53:28] TEACHER: build a user experience.   {#1767}
[01:53:30] TEACHER: That's a better way to put it.   {#1768}
[01:53:31] TEACHER: It's a very interesting way to build a user experience.   {#1769}
[01:53:33] TEACHER: For example, let's say you want to spin up an EC2 machine.   {#1770}
[01:53:41] TEACHER: So you went to AWS console, you click click click and hit the start button.   {#1771}
[01:53:47] TEACHER: an entry on the UI that says that instance is creating in progress, in progress, in progress,   {#1772}
[01:53:52] TEACHER: in progress. And after some time it becomes ready. Now, without even you refreshing, the interface   {#1773}
[01:53:59] TEACHER: changed from in progress to ready, right? So how did this happen? This is an example of   {#1774}
[01:54:05] TEACHER: shortfalling where your client typically makes those requests again and again, periodically to   {#1775}
[01:54:13] TEACHER: the server to see if the things are done or not or what's the current status of something.   {#1776}
[01:54:18] TEACHER: So that you typically see in a long running job.   {#1777}
[01:54:20] TEACHER: For example, spinning up EC2 instances.   {#1778}
[01:54:22] TEACHER: Now here what you are saving is that your user does not have to hit refresh again and   {#1779}
[01:54:28] TEACHER: again and again and again to do it because your user hitting refresh again and again   {#1780}
[01:54:33] TEACHER: versus you doing it on JavaScript is the exact same thing, right?   {#1781}
[01:54:37] TEACHER: So you don't want user to hit refresh again and again.   {#1782}
[01:54:39] TEACHER: instead you are doing it for him or her in your front end code to make constant constant request   {#1783}
[01:54:47] TEACHER: on the back end to see the current status right this is short calling so you are making repetitive   {#1784}
[01:54:51] TEACHER: calls to get a current status other places where you can see is while refreshing cricket score so   {#1785}
[01:54:58] TEACHER: cricket matches go on for days to see the cricket score you go to crick buzz or espn cricket for   {#1786}
[01:55:04] TEACHER: something like that when match is live it keeps on auto refreshing and you don't have to hit the   {#1787}
[01:55:09] TEACHER: and again. This is an example of shortfall. Now, obviously simplest way to build. This is extremely   {#1788}
[01:55:15] TEACHER: simple to build. But the disadvantage is you're making far too many requests from client to server.   {#1789}
[01:55:21] TEACHER: Like let's say you have a periodicity of 10 seconds. So every 10 seconds you are making one   {#1790}
[01:55:25] TEACHER: request, which means unnecessarily you're making six requests a minute. And imagine if there are   {#1791}
[01:55:30] TEACHER: million users, concurrent users, then you're making 6 million concurrent requests per minute on server.   {#1792}
[01:55:36] TEACHER: that's far too much of http overhead and given how http works in a normal way sends a request   {#1793}
[01:55:43] TEACHER: gets the response terminates the connection so three-way hand check two-way teodown one request   {#1794}
[01:55:46] TEACHER: one response every time right the worst part is what if the response doesn't change from the   {#1795}
[01:55:54] TEACHER: server like for example you spin up an ec2 instance let's say it takes one hour to spin it up for one   {#1796}
[01:56:02] TEACHER: hour you are making that request again and again and again and again to see the exact same response   {#1797}
[01:56:07] TEACHER: that's too much of request that you're making to see the same redundant information because   {#1798}
[01:56:12] TEACHER: it's taking effect after one hour but for one hour you're constantly making requests just to   {#1799}
[01:56:17] TEACHER: see the current status that's the problem that's the disadvantage the number of requests that would   {#1800}
[01:56:22] TEACHER: that a server would need to handle would be huge in case of short pulling so now what's the other   {#1801}
[01:56:28] TEACHER: way to do it the other way to do it is long polling so as the name suggests now here what   {#1802}
[01:56:34] TEACHER: happens is it's a way to implement it implementation is your end no one will give you out of the box   {#1803}
[01:56:39] TEACHER: you have to write this code by the way so for example an example of long polling is where   {#1804}
[01:56:47] TEACHER: you spin up an ec2 instance instead of and you make a request you spin up an ec2 instance your   {#1805}
[01:56:53] TEACHER: The server registers a task and sends the response first, but then to check the status   {#1806}
[01:56:58] TEACHER: of it, you make one call.   {#1807}
[01:57:00] TEACHER: Now this call would not return unless the state changes.   {#1808}
[01:57:05] TEACHER: For example, I made a request to spin up an EC2 instance.   {#1809}
[01:57:08] TEACHER: I got a response that task acknowledged.   {#1810}
[01:57:11] TEACHER: Then I made another request to see the status of my server is ready or not.   {#1811}
[01:57:15] TEACHER: I made a request.   {#1812}
[01:57:17] TEACHER: Now my server will not send the response until my instance is ready.   {#1813}
[01:57:23] TEACHER: way what you are doing is you are reducing the number of http requests by a huge margin   {#1814}
[01:57:29] TEACHER: but now your server has to do do this loop to check if the instance is ready or not so and then   {#1815}
[01:57:35] TEACHER: someone has to do that loop right so here the server will be doing that loop to check if the   {#1816}
[01:57:39] TEACHER: instance is ready or not so it has its own disadvantages and advantages the advantage   {#1817}
[01:57:44] TEACHER: being that you make very minimal requests from the client to get things done but the disadvantage is   {#1818}
[01:57:49] TEACHER: Someone has to do that loop to check if it is ready or wrong.   {#1819}
[01:57:55] TEACHER: Right.   {#1820}
[01:57:56] TEACHER: And you have to implement it.   {#1821}
[01:57:57] TEACHER: There's not a magical solution that would implement short   {#1822}
[01:58:00] TEACHER: pulling or long pulling for you.   {#1823}
[01:58:01] TEACHER: You have to implement it depending on what you are designing,   {#1824}
[01:58:04] TEACHER: designing an easy to instance, something else, designing a cricket   {#1825}
[01:58:07] TEACHER: score, something else messaging app, something else, right?   {#1826}
[01:58:11] TEACHER: Everyone has to implement it in their own specific way.   {#1827}
[01:58:14] TEACHER: There is no one global way to do it.   {#1828}
[01:58:16] TEACHER: It's just a suggestion that you can go for log polling where your client makes fewer requests to get things done.   {#1829}
[01:58:23] TEACHER: Your server only sends the response when it has something new to share.   {#1830}
[01:58:29] TEACHER: For example, in the context of a cricket match, when I make a request to get the latest score,   {#1831}
[01:58:35] TEACHER: I would get the score only when the next ball is pulled.   {#1832}
[01:58:40] TEACHER: Otherwise, I would not get a response.   {#1833}
[01:58:42] TEACHER: that and it's your implementation.   {#1834}
[01:58:44] TEACHER: You have to not send a response unless you have the next ball pulled.   {#1835}
[01:58:47] TEACHER: And how do you know it?   {#1836}
[01:58:48] TEACHER: You apply the infinite loop in the backend to check if the next ball is pulled.   {#1837}
[01:58:52] TEACHER: It's expensive, but it's one of the ways to implement it.   {#1838}
[01:58:55] TEACHER: Right?   {#1839}
[01:58:56] TEACHER: So that's long polling.   {#1840}
[01:58:57] TEACHER: So short polling sends a lot of requests and like you, here you can see short   {#1841}
[01:59:02] TEACHER: polling, it immediately gets a response from the server with the latest score or   {#1842}
[01:59:05] TEACHER: the current status, even if it is in progress, but long polling waits, like   {#1843}
[01:59:09] TEACHER: makes a server wait for it to have something change in the backend and then send a response.   {#1844}
[01:59:15] TEACHER: So you make fewer requests when you're using long polling, but your server has to do a lot   {#1845}
[01:59:20] TEACHER: more heavy lifting than in case of short polling.   {#1846}
[01:59:25] TEACHER: Then the next one is, we talk about kind of stateless short polling and long polling.   {#1847}
[01:59:31] TEACHER: Another one is web sockets, the most common one that is used to build messaging apps.   {#1848}
[01:59:36] TEACHER: Messaging apps, real-time communication, web sockets do it.   {#1849}
[01:59:39] TEACHER: The concept of WebSocket is very similar to what we talked about yesterday as connection pool.   {#1850}
[01:59:44] TEACHER: In connection pool, the reason we built connection pool is there was an established connection   {#1851}
[01:59:49] TEACHER: between the server and the database and we just sent requests there and got response there.   {#1852}
[01:59:54] TEACHER: So we did not incur the overhead of re-establishing the TCP connection and   {#1853}
[02:00:01] TEACHER: terminating it again. This is exact same thing that we are doing with WebSockets. So what are   {#1854}
[02:00:07] TEACHER: web sockets? Web sockets are bi-directional channel that is established between your client   {#1855}
[02:00:11] TEACHER: and the server. Now here the client is end user, browser, mobile device, end user and server is a   {#1856}
[02:00:17] TEACHER: backend server. And this web socket connection is a persistent TCP connection that understands the   {#1857}
[02:00:24] TEACHER: web socket protocol. The name of the protocol, like you have HTTP, here you have WS protocol,   {#1858}
[02:00:30] TEACHER: web socket protocol. HTTPS is HTTP with SSL. WSS is the secure web socket. So web socket is not   {#1859}
[02:00:39] TEACHER: running on top of HTTP. Web socket is in parallel of HTTP. There are different specifications.   {#1860}
[02:00:46] TEACHER: So web sockets are persistent. They are bidirectional in nature. So the way the   {#1861}
[02:00:51] TEACHER: protocol is defined is that because the connection is kept open between the client and the server,   {#1862}
[02:00:56] TEACHER: the client can send the request to the server or the server can proactively send a message   {#1863}
[02:01:00] TEACHER: the client and it's not that like we typically see that client sends a request server sends a response   {#1864}
[02:01:05] TEACHER: here with websocket server can also productively send message to the client so for example it's   {#1865}
[02:01:12] TEACHER: brilliant to build chat applications because all the clients are connected to this server   {#1866}
[02:01:18] TEACHER: when a user sends a message comes to the server and server immediately sends it to another user   {#1867}
[02:01:24] TEACHER: because your client doesn't have to send to the server hey are there any new messages for me   {#1868}
---- OWNED SEGMENTS END ----

CTX| [02:01:30] TEACHER: literally pushing the message to the country hey here's the message for you from this particular   {#1869}
CTX| [02:01:35] TEACHER: business so this is why web sockets are very good because it helps you build rich product experiences   {#1870}
CTX| [02:01:41] TEACHER: you don't have to wait for a long time for you to receive a message when a user sends you the   {#1871}
CTX| [02:01:45] TEACHER: message you receive it immediately right this is the idea now it is possible because of the   {#1872}
CTX| [02:01:52] TEACHER: bi-directional channel that you have established between the two the persistent tcp connection   {#1873}
CTX| [02:01:56] TEACHER: between the two is the reason why you are you can build such experiences so as you can very clearly   {#1874}
CTX| [02:02:07] TEACHER: see because it's a persistent connection very expensive to manage very expensive next week   {#1875}
CTX| [02:02:13] TEACHER: uh sunday will go in depth of scaling web sockets how to use it how to scale it how to build real   {#1876}
CTX| [02:02:19] TEACHER: time slack communication right that but we'll talk we'll go in depth of scaling web sockets   {#1877}
CTX| [02:02:24] TEACHER: like how to do it, why to do it, why are we making those certain decisions?   {#1878}
CTX| [02:02:28] TEACHER: And like, again, like always building the intuition.   {#1879}
