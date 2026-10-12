# chunk_10  OWNS 01:52:08 -> 02:04:42  (segments #1770-#1986, 2055 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:51:10] TEACHER: to a channel because that's what you do. A sends a message to a channel.   {#1762}
CTX| [01:51:15] TEACHER: The request comes over here, WebSocket 1. Now in WebSocket server 1, you would have the channel   {#1763}
CTX| [01:51:21] TEACHER: information cached. One way to do it is either cache the channel information, but how would   {#1764}
CTX| [01:51:26] TEACHER: websockets server one get to whom the message needs to be sent simple when server one when a   {#1765}
CTX| [01:51:37] TEACHER: connects to this right so when a user connects to a web socket server so a wants to connect to ws1   {#1766}
CTX| [01:51:47] TEACHER: so what it would do while establishing the web socket correction it first establishes   {#1767}
CTX| [01:51:52] TEACHER: And then it sends the meta information, meta information like A says I am part of channel   {#1768}
CTX| [01:52:04] TEACHER: one.   {#1769}

---- OWNED SEGMENTS START ----
[01:52:08] TEACHER: So whichever channel is a part of it tells the web socket server one that I am part of   {#1770}
[01:52:15] TEACHER: this channel one.   {#1771}
[01:52:16] TEACHER: Let's say A is part of channel one.   {#1772}
[01:52:21] TEACHER: a is part of basically membership information let me write it this way so a tells the membership   {#1773}
[01:52:28] TEACHER: information that i am part of channel c1 channel c2 and channel c3 over here anytime any user a b   {#1774}
[01:52:36] TEACHER: c or d any user joins any web socket server it tells the web socket server that hey i am part   {#1775}
[01:52:43] TEACHER: of these these these channels web socket server keeps this information in memory or maybe storing   {#1776}
[01:52:49] TEACHER: it in disk whatever it's okay right it keeps this information with itself so it knows that   {#1777}
[01:52:55] TEACHER: which all users are connected to me and which all channels are they part of right similarly   {#1778}
[01:53:01] TEACHER: on this web socket server 2 it would know that e is part of web socket server 2 knows that e is   {#1779}
[01:53:10] TEACHER: part of channel 2. So WS1 web socket server 1 would know A is part of channel 1, B is part of channel   {#1780}
[01:53:20] TEACHER: 1, C is part of channel 1, D is part of channel 1. This is what would be stored on web socket server 1   {#1781}
[01:53:27] TEACHER: and this is what would be stored on web socket server 2.   {#1782}
[01:53:36] TEACHER: right okay we have this information now again the protocol was when a user connects to a edge server   {#1783}
[01:53:42] TEACHER: the first information is sent to the web socket server is what which channels is it part of right   {#1784}
[01:53:48] TEACHER: so web socket server one would know that anytime a user joins or removes a channel the information   {#1785}
[01:53:54] TEACHER: is sent to the web socket server also web socket server is kept in eventually consistent state with   {#1786}
[01:53:59] TEACHER: the membership information how user tells it user periodically sends this meta information to the   {#1787}
[01:54:05] TEACHER: web socket server one that which all channels are am i part of and whatnot this this just   {#1788}
[01:54:09] TEACHER: information just membership information it tells it right okay now when user a sends a message   {#1789}
[01:54:17] TEACHER: so what user would a would send this message is intended for this channel right so the message   {#1790}
[01:54:24] TEACHER: would come to web socket server one web socket server would say okay this message is intended   {#1791}
[01:54:29] TEACHER: channel 1 which all users are part of channel 1? A, B, C, D. So A sent a message I would   {#1792}
[01:54:34] TEACHER: not send it back. I want to send message to B, C, D. So it sends this same message to   {#1793}
[01:54:40] TEACHER: B, C and D. This is how A's message is sent to B, C and D. Right? But now E is also part   {#1794}
[01:54:52] TEACHER: of the channel how would he receive the message how would he receive the same message that was   {#1795}
[01:54:59] TEACHER: meant for channel a just because he is in some other it's like literally humans you you all group   {#1796}
[01:55:06] TEACHER: of friends are in one room in one hotel room two of your friends are in another hotel room you folks   {#1797}
[01:55:12] TEACHER: are having all the fun how would they be part of that fun how would they know what you folks are   {#1798}
[01:55:16] TEACHER: doing like they also want to be part of, like, they also want to have fun.   {#1799}
[01:55:20] TEACHER: Right.   {#1800}
[01:55:21] TEACHER: But so then you have to do something such that this message reaches E.   {#1801}
[01:55:29] TEACHER: How will you do that?   {#1802}
[01:55:30] TEACHER: Raise your hands.   {#1803}
[01:55:35] STUDENT_3: Probably through the API server that connected both of the web sockets   {#1804}
[01:55:38] STUDENT_3: as in the last time, but then that would be slow, right?   {#1805}
[01:55:41] TEACHER: Doing my API server and this and that.   {#1806}
[01:55:44] TEACHER: How do you do it?   {#1807}
[01:55:45] TEACHER: You have this, these items here.   {#1808}
[01:55:48] TEACHER: WebSocket one, WebSocket two, two WebSocket servers.   {#1809}
[01:55:50] TEACHER: You want message, this message to reach there.   {#1810}
[01:55:55] TEACHER: How would it reach over here?   {#1811}
[01:55:58] TEACHER: From WebSocket server one to WebSocket server two.   {#1812}
[01:56:07] STUDENT_3: Caching some of the information of users on each WebSocket.   {#1813}
[01:56:11] TEACHER: You already have that information over here   {#1814}
[01:56:13] TEACHER: That all the people connected to this web socket   {#1815}
[01:56:15] TEACHER: You have this information over here   {#1816}
[01:56:16] TEACHER: What else are you caching?   {#1817}
[01:56:17] TEACHER: Where are you caching?   {#1818}
[01:56:19] TEACHER: Okay, so we cannot cache that   {#1819}
[01:56:21] TEACHER: E is connected to WS2   {#1820}
[01:56:24] TEACHER: Let's say you have that   {#1821}
[01:56:25] TEACHER: Let's say you have that information   {#1822}
[01:56:26] TEACHER: Then now what will you do?   {#1823}
[01:56:27] TEACHER: Let's say you know E is connected over here   {#1824}
[01:56:29] TEACHER: Now what would you do?   {#1825}
[01:56:31] TEACHER: We would somehow signal   {#1826}
[01:56:34] TEACHER: How?   {#1827}
[01:56:34] TEACHER: Right, let's go into those details   {#1828}
[01:56:36] TEACHER: How?   {#1829}
[01:56:38] TEACHER: How this message would reach over here   {#1830}
[01:56:44] TEACHER: No idea.   {#1831}
[01:56:45] TEACHER: No idea.   {#1832}
[01:56:46] TEACHER: Okay.   {#1833}
[01:56:46] TEACHER: We'll go into the first principles of it.   {#1834}
[01:56:49] TEACHER: Like how do we even approach an unknown situation like this?   {#1835}
[01:56:52] TEACHER: Right?   {#1836}
[01:56:53] TEACHER: Like how do we even think about a solution like this?   {#1837}
[01:56:55] TEACHER: Okay.   {#1838}
[01:56:55] TEACHER: Let me put in Amrik.   {#1839}
[01:56:56] TEACHER: Amrik, how would this message reach WS2?   {#1840}
[01:57:00] STUDENT_3: Some messaging service, maybe Kafka or one more.   {#1841}
[01:57:05] TEACHER: Why are you picking a messaging service?   {#1842}
[01:57:07] TEACHER: Can there not be any other way to do so?   {#1843}
[01:57:11] TEACHER: The messaging service slows down.   {#1844}
[01:57:13] TEACHER: You need to have bunch of consumers running.   {#1845}
[01:57:15] TEACHER: How like this server would be consuming so much of stuff from there.   {#1846}
[01:57:19] TEACHER: So problem, problem.   {#1847}
[01:57:22] TEACHER: Start simple.   {#1848}
[01:57:24] TEACHER: Start simple.   {#1849}
[01:57:24] STUDENT_3: What do you do?   {#1850}
[01:57:26] STUDENT_3: We can send the replica of that message to some another.   {#1851}
[01:57:30] STUDENT_3: There can be some, uh, so let's just connecting these two web sockets also.   {#1852}
[01:57:35] TEACHER: Why do you need another server to connect?   {#1853}
[01:57:37] TEACHER: Why can't these two machine talk to each other?   {#1854}
[01:57:38] TEACHER: You create TCP connections all the time.   {#1855}
[01:57:41] STUDENT_10: Oh, okay.   {#1856}
[01:57:42] STUDENT_10: That means the, uh, both of the poor can communicate to you.   {#1857}
[01:57:46] TEACHER: Why not?   {#1858}
[01:57:46] TEACHER: Why not?   {#1859}
[01:57:47] TEACHER: You just establish one connection with this one WS2 server.   {#1860}
[01:57:51] TEACHER: Isn't it?   {#1861}
[01:57:52] TEACHER: Hmm.   {#1862}
[01:57:53] TEACHER: Right.   {#1863}
[01:57:54] TEACHER: You just create a normal TCP server may not be, it doesn't have the web socket connection,   {#1864}
[01:57:58] TEACHER: normal TCP connection.   {#1865}
[01:57:59] TEACHER: And what you do is just take this message and send it to this would get this or would   {#1866}
[01:58:05] TEACHER: receive the message would see, okay.   {#1867}
[01:58:07] TEACHER: This message is for channel one.   {#1868}
[01:58:08] TEACHER: It would see which user is subscribed to channel one or wants message for channel one.   {#1869}
[01:58:12] TEACHER: It says E it sends data to E.   {#1870}
[01:58:16] TEACHER: Okay.   {#1871}
[01:58:16] TEACHER: Right.   {#1872}
[01:58:17] TEACHER: This can be just a simple TCP connection, a real simple TCP connection.   {#1873}
[01:58:21] TEACHER: Right.   {#1874}
[01:58:22] TEACHER: Why do you want to introduce some more complexities on that?   {#1875}
[01:58:26] TEACHER: Right.   {#1876}
[01:58:27] TEACHER: So this is a bare bare minimum that you have to do.   {#1877}
[01:58:30] TEACHER: When you want two machines to talk to each other.   {#1878}
[01:58:33] TEACHER: Correct.   {#1879}
[01:58:34] TEACHER: Yeah.   {#1880}
[01:58:35] TEACHER: It's a bare minimum.   {#1881}
[01:58:36] TEACHER: Have a TCP connection established between them.   {#1882}
[01:58:38] TEACHER: So I need one TCP connection.   {#1883}
[01:58:42] TEACHER: So one TCP connection for each web server, each web socket server, I have one web socket   {#1884}
[01:58:49] TEACHER: connection for all the users connected and one TCP connection to talk to another web   {#1885}
[01:58:54] TEACHER: socket server.   {#1886}
[01:58:55] TEACHER: But now this solves our problem.   {#1887}
[01:59:00] TEACHER: This solves our problem that message from A, which was meant to be sent for channel 1   {#1888}
[01:59:08] TEACHER: is now properly sent to B, C, T and this TCP connection.   {#1889}
[01:59:15] TEACHER: This message is received by WS2. It says, okay, this message is for channel one,   {#1890}
[01:59:21] TEACHER: which user is part of channel one. It got E and this message is sent to E.   {#1891}
[01:59:27] TEACHER: So all the people are now getting the messages of this particular channel that was sent for this   {#1892}
[01:59:34] TEACHER: channel 1. Now let's spice it up a bit. Now let's say I have one more server here. Let's say this is   {#1893}
[01:59:50] TEACHER: WS3 and I have a user F which has now joined this channel and this user F has now joined channel 1.   {#1894}
[02:00:00] TEACHER: You added that person is now joined channel 1 and now F when F established the connection   {#1895}
[02:00:08] TEACHER: F established a web socket connection with WS3 for some reason.   {#1896}
[02:00:16] TEACHER: And now what you need to do is this message.   {#1897}
[02:00:20] TEACHER: Now let's say A sent another message.   {#1898}
[02:00:22] TEACHER: A sent another message.   {#1899}
[02:00:24] TEACHER: This message was again sent for channel 1.   {#1900}
[02:00:28] TEACHER: the message sent for channel 1 came over here sent to b c d over this TCP connection to over here   {#1901}
[02:00:35] TEACHER: and now it's sent to e right e received it but now similar to how and the connection was established   {#1902}
[02:00:42] TEACHER: over here you say hey let's build a TCP connection over here right so now what would happen is the   {#1903}
[02:00:51] TEACHER: The message that is sent over here goes to this sends to BCD over this TCP connection   {#1904}
[02:00:58] TEACHER: message comes over here.   {#1905}
[02:01:00] TEACHER: Over this TCP connection message comes over here from here.   {#1906}
[02:01:04] TEACHER: It says, okay, I have C1 for C1.   {#1907}
[02:01:07] TEACHER: I have to send message to user E.   {#1908}
[02:01:09] TEACHER: Some messages sent over here from here.   {#1909}
[02:01:11] TEACHER: It says for C1, I have to send it to F.   {#1910}
[02:01:13] TEACHER: The message goes over here.   {#1911}
[02:01:14] TEACHER: Problem solved.   {#1912}
[02:01:16] TEACHER: right here what you can see is the same message that was intended for all the people part of   {#1913}
[02:01:23] TEACHER: channel c1 everyone gets the message right okay what is a disadvantage of this architecture   {#1914}
[02:01:32] STUDENT_3: amrit uh maybe e and f will receive the message after some time it will take okay right but it's   {#1915}
[02:01:38] STUDENT_3: happening in real time that's fine okay and uh just web socket one server has to maintain too   {#1916}
[02:01:45] TEACHER: What do you mean by too many connections?   {#1917}
[02:01:47] STUDENT_3: It means this TCP is also an overload to TCP and to ABC and D also.   {#1918}
[02:01:56] TEACHER: But then you have to do it.   {#1919}
[02:01:57] TEACHER: There is no other way.   {#1920}
[02:01:59] TEACHER: You have to do it.   {#1921}
[02:02:00] TEACHER: Otherwise, how would you communicate?   {#1922}
[02:02:04] TEACHER: Okay.   {#1923}
[02:02:05] STUDENT_10: I can currently think of this.   {#1924}
[02:02:07] TEACHER: That's fine.   {#1925}
[02:02:07] TEACHER: That's fine.   {#1926}
[02:02:08] TEACHER: We'll come.   {#1927}
[02:02:09] TEACHER: Now we'll see how we started with a problem.   {#1928}
[02:02:12] TEACHER: We started with basic fundamentals, solved it.   {#1929}
[02:02:15] TEACHER: now now we are thinking of making it better and that's how we should approach any problem in there   {#1930}
[02:02:19] STUDENT_6: right okay yes jodhinder what would you do over here uh so yeah like uh we could have like these   {#1931}
[02:02:27] STUDENT_6: tcp connections between all the servers like it will sort of form a mesh but then each server is   {#1932}
[02:02:31] STUDENT_6: responsible for uh making sure that all those connections stay alive if any of those connections   {#1933}
[02:02:37] STUDENT_6: die you have to establish those connections and i think that itself adds a lot of overhead   {#1934}
[02:02:43] STUDENT_6: or something like that.   {#1935}
[02:02:44] STUDENT_6: So maybe...   {#1936}
[02:02:45] STUDENT_6: But why?   {#1937}
[02:02:45] TEACHER: Why?   {#1938}
[02:02:45] TEACHER: Why is that an overhead?   {#1939}
[02:02:47] TEACHER: So now what you said is   {#1940}
[02:02:49] TEACHER: you are typically creating a match   {#1941}
[02:02:50] TEACHER: that every WebSocket server one   {#1942}
[02:02:52] TEACHER: or every WebSocket server   {#1943}
[02:02:53] TEACHER: has to be connected   {#1944}
[02:02:54] TEACHER: to every other WebSocket server.   {#1945}
[02:02:55] TEACHER: Right?   {#1946}
[02:02:56] TEACHER: Which means literally   {#1947}
[02:02:58] TEACHER: everyone is connected   {#1948}
[02:02:59] TEACHER: to every other one   {#1949}
[02:03:00] TEACHER: no matter how many servers are there.   {#1950}
[02:03:02] TEACHER: So what's the problem with this?   {#1951}
[02:03:03] TEACHER: Why is it an overhead?   {#1952}
[02:03:05] STUDENT_6: One issue like   {#1953}
[02:03:07] STUDENT_6: other than like   {#1954}
[02:03:08] STUDENT_6: one issue could be   {#1955}
[02:03:09] STUDENT_6: if some server goes down   {#1956}
[02:03:12] STUDENT_6: connection is not there.   {#1957}
[02:03:13] STUDENT_6: Uh, it could, it would basically just miss that message or any.   {#1958}
[02:03:17] TEACHER: So that's okay.   {#1959}
[02:03:18] TEACHER: That's okay.   {#1960}
[02:03:19] TEACHER: But what else is the issue?   {#1961}
[02:03:20] TEACHER: You, you, you talked about overhead.   {#1962}
[02:03:21] TEACHER: What kind of overhead are you seeing over here?   {#1963}
[02:03:24] STUDENT_6: Uh, uh, sorry.   {#1964}
[02:03:26] STUDENT_6: You're sort of like, uh, sending one message to like every single server,   {#1965}
[02:03:31] STUDENT_6: which might not actually need it.   {#1966}
[02:03:34] TEACHER: No, you can minimize that, optimize that by having a global state.   {#1967}
[02:03:38] TEACHER: So let's do that.   {#1968}
[02:03:39] TEACHER: If even if you do that, what's the overhead?   {#1969}
[02:03:43] TEACHER: there's a much bigger overhead much bigger enemy staring it's like literally there is a dinosaur   {#1970}
[02:03:48] TEACHER: behind you which is staring at you but you are just worried about a small mice yeah i'm not able   {#1971}
[02:03:54] TEACHER: to think of it that's fine that's fine that's why i'm here right i'm just i'm just proving you folks   {#1972}
[02:03:59] TEACHER: to think on those like see what overhead would come how would you make it better i'm just picking   {#1973}
[02:04:04] TEACHER: people who have not spoken much uh harsh gone just trying to be fair to everyone yeah so i think   {#1974}
[02:04:12] STUDENT_9: I'm not sure what this communication looks like more synchronous communication and we   {#1975}
[02:04:17] STUDENT_9: should have some asynchronous mechanism here.   {#1976}
[02:04:21] TEACHER: Okay.   {#1977}
[02:04:22] TEACHER: First let's talk about what's the overhead that you are solving.   {#1978}
[02:04:24] TEACHER: Like what is the problem that you're solving with that asynchronous thing?   {#1979}
[02:04:29] STUDENT_9: If any server is down whenever it is available.   {#1980}
[02:04:32] STUDENT_9: That's not a problem.   {#1981}
[02:04:33] TEACHER: You're talking overhead.   {#1982}
[02:04:34] TEACHER: What's the overhead?   {#1983}
[02:04:35] TEACHER: Down is basically fault tolerance.   {#1984}
[02:04:37] TEACHER: Right.   {#1985}
[02:04:38] TEACHER: What's the overhead?   {#1986}
---- OWNED SEGMENTS END ----

CTX| [02:04:42] TEACHER: And why is it even a problem?   {#1987}
CTX| [02:04:45] TEACHER: We first need to understand that, like before jumping into the solution, we have not even   {#1988}
CTX| [02:04:49] TEACHER: covered the problem yet.   {#1989}
CTX| [02:04:51] TEACHER: There is a massive overhead.   {#1990}
CTX| [02:04:52] TEACHER: Like three people have used the term overhead, but no one explained what the actual overhead   {#1991}
CTX| [02:04:57] TEACHER: is.   {#1992}
CTX| [02:04:58] TEACHER: Like, why is that even a problem problem?   {#1993}
CTX| [02:05:02] TEACHER: Right.   {#1994}
CTX| [02:05:03] TEACHER: Amrit.   {#1995}
CTX| [02:05:05] STUDENT_12: Hey, yeah.   {#1996}
CTX| [02:05:06] STUDENT_12: Could server discovery here be the overhead when we're horizontally scaling website?   {#1997}
CTX| [02:05:12] TEACHER: No, that's a different problem.   {#1998}
CTX| [02:05:14] TEACHER: But that's still not an overhead overhead.   {#1999}
CTX| [02:05:16] TEACHER: It's staring right at our face, the overhead.   {#2000}
CTX| [02:05:21] TEACHER: It's right there in the diagram.   {#2001}
CTX| [02:05:26] TEACHER: Hey, man.   {#2002}
CTX| [02:05:28] TEACHER: Yeah.   {#2003}
CTX| [02:05:29] STUDENT_1: So, like, when you want to horizontally scale,   {#2004}
CTX| [02:05:34] STUDENT_1: like, you'll be creating one connection for every AWS server, right?   {#2005}
CTX| [02:05:37] STUDENT_1: Correct.   {#2006}
CTX| [02:05:38] STUDENT_1: So, that limits it at some point.   {#2007}
CTX| [02:05:40] STUDENT_11: Why?   {#2008}
CTX| [02:05:42] STUDENT_1: Because you can't have like infinite connections from one server.   {#2009}
