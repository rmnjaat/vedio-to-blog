# chunk_10  OWNS 01:43:45 -> 01:56:01  (segments #1802-#2014, 2187 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:42:47] TEACHER: What about private node   {#1776}
CTX| [01:42:48] TEACHER: will they only have   {#1777}
CTX| [01:42:49] TEACHER: just one LP server?   {#1778}
CTX| [01:42:51] TEACHER: What if that goes down?   {#1779}
CTX| [01:42:54] TEACHER: Right?   {#1780}
CTX| [01:42:55] TEACHER: Yeah.   {#1781}
CTX| [01:42:56] TEACHER: Right.   {#1782}
CTX| [01:42:56] TEACHER: Okay.   {#1783}
CTX| [01:42:57] TEACHER: DNS is the correct answer,   {#1784}
CTX| [01:42:58] TEACHER: but let's go detail into it.   {#1785}
CTX| [01:43:01] TEACHER: So first of all,   {#1786}
CTX| [01:43:03] TEACHER: and I know   {#1787}
CTX| [01:43:04] TEACHER: we are having   {#1788}
CTX| [01:43:05] TEACHER: detailed discussion,   {#1789}
CTX| [01:43:06] TEACHER: but I would want to   {#1790}
CTX| [01:43:07] TEACHER: like time is okay.   {#1791}
CTX| [01:43:10] TEACHER: 15, 20 minutes   {#1792}
CTX| [01:43:11] TEACHER: today's session will stretch,   {#1793}
CTX| [01:43:12] TEACHER: but it's fine.   {#1794}
CTX| [01:43:13] TEACHER: We want to,   {#1795}
CTX| [01:43:13] TEACHER: I want to touch upon this,   {#1796}
CTX| [01:43:14] TEACHER: these details.   {#1797}
CTX| [01:43:15] TEACHER: that matters right so a lot of misconceptions let me sort one like them one by one so dns is the   {#1798}
CTX| [01:43:23] TEACHER: correct answer now here think when you spin up a load balancer you can only give one thing to your   {#1799}
CTX| [01:43:30] TEACHER: client behind the scenes you may have so you the first thing that you may think of hey i'm spinning   {#1800}
CTX| [01:43:36] TEACHER: up a virtual machine let me give out the ip address of this so that's a natural thing but now ip   {#1801}

---- OWNED SEGMENTS START ----
[01:43:45] TEACHER: Because IP address is fixed to a machine, you cannot have two machines handling the same thing.   {#1802}
[01:43:50] TEACHER: So then our LB servers are not scalable, which is very big of a limiting factor.   {#1803}
[01:43:54] TEACHER: Now, which means that you need a way to, you cannot share IP address.   {#1804}
[01:43:58] TEACHER: There has to be something else.   {#1805}
[01:43:59] TEACHER: So what is something that abstracts multiple IP addresses?   {#1806}
[01:44:03] TEACHER: Domain name.   {#1807}
[01:44:04] TEACHER: So what do you do?   {#1808}
[01:44:05] TEACHER: So who manages domain name?   {#1809}
[01:44:06] TEACHER: So you had a domain name server.   {#1810}
[01:44:07] TEACHER: So what happens is when you spin up a load balancer, you spin up a domain name for load balancer.   {#1811}
[01:44:12] TEACHER: So let's say payments.lb.google.com.   {#1812}
[01:44:17] TEACHER: I should not use this name in my employer now, but still check.   {#1813}
[01:44:20] TEACHER: Google.com.   {#1814}
[01:44:21] TEACHER: I am always using this example.   {#1815}
[01:44:23] TEACHER: I never thought I would work at Google, but that's fine.   {#1816}
[01:44:26] TEACHER: Okay.   {#1817}
[01:44:26] TEACHER: Payments.lb.google.com.   {#1818}
[01:44:28] TEACHER: So every load balancer that you create has a domain name now, because of which   {#1819}
[01:44:34] TEACHER: what happens is that it abstracts out multiple IP addresses behind it.   {#1820}
[01:44:41] TEACHER: and this is a private domain now this is where a lot of people don't know dns when someone talks   {#1821}
[01:44:47] TEACHER: about dns everyone just thinks about public dns google.com facebook.com right but dns can be   {#1822}
[01:44:56] TEACHER: private also so that's why i always recommend people to work on sre teams at least for a year   {#1823}
[01:45:03] TEACHER: and a half at least. So you can write your, not write, you can launch your own DNS server,   {#1824}
[01:45:09] TEACHER: very lightweight process. It does nothing. It's very simple. There is a nice, very good open   {#1825}
[01:45:15] TEACHER: source project called CoreDNS. The entire Kubernetes fraternity uses CoreDNS. So CoreDNS   {#1826}
[01:45:20] TEACHER: is one of the most common, simple implementation of a DNS server. So what you typically do? And   {#1827}
[01:45:27] TEACHER: this is private your infrastructure, very private your infrastructure. On each of your machine,   {#1828}
[01:45:33] TEACHER: as your loopback IP address.   {#1829}
[01:45:35] TEACHER: So everyone connects to this.   {#1830}
[01:45:36] TEACHER: So just look at how to configure core DNS.   {#1831}
[01:45:40] TEACHER: You'll find what I'm talking about.   {#1832}
[01:45:42] TEACHER: So the idea is on every machine, you specify this as your DNS address.   {#1833}
[01:45:47] TEACHER: So that whenever you provide a domain name, it needs to resolve to something.   {#1834}
[01:45:52] TEACHER: So what DNS server would do, it would help you resolve.   {#1835}
[01:45:55] TEACHER: So this is core DNS, a private instance of core DNS running in your infrastructure.   {#1836}
[01:45:59] TEACHER: So if you are AWS or GCP, there are a bunch of DNS servers running, each having these   {#1837}
[01:46:06] TEACHER: kinds of configuration from a machine.   {#1838}
[01:46:09] TEACHER: When a request goes or request goes for a particular domain name, because the request   {#1839}
[01:46:13] TEACHER: that came to you is payments.lb.google.com.   {#1840}
[01:46:16] TEACHER: Now, where is this payments.lb.google.com?   {#1841}
[01:46:19] TEACHER: Now this, when request comes for this IP gets resolved.   {#1842}
[01:46:24] TEACHER: Now DNS comes to the fact that, Hey, I want to resolve this IP address.   {#1843}
[01:46:27] TEACHER: So for a domain name, give me one IP address.   {#1844}
[01:46:30] TEACHER: So now if there are multiple, how would it pick one round robin, weighted round robin,   {#1845}
[01:46:36] TEACHER: all of the strategies apply here as well.   {#1846}
[01:46:38] TEACHER: So now when the request comes in, the request for a particular domain name comes in or rather   {#1847}
[01:46:47] TEACHER: a load balancer DNS request for a particular load balancer comes in.   {#1848}
[01:46:51] TEACHER: It resolves into an IP address.   {#1849}
[01:46:54] TEACHER: This IP address is sent to the user.   {#1850}
[01:46:55] TEACHER: user then connects to that corresponding IP address over there and then the normal flow   {#1851}
[01:46:59] TEACHER: takes over.   {#1852}
[01:47:00] TEACHER: But now here Shriya, my question to you, given that you propose the solution, isn't all the   {#1853}
[01:47:07] TEACHER: requests routing through DNS not making DNS a bottleneck because then DNS itself is acting   {#1854}
[01:47:12] TEACHER: like a load balancer.   {#1855}
[01:47:13] TEACHER: What's the request flow over here?   {#1856}
[01:47:15] TEACHER: If all of my requests goes through DNS?   {#1857}
[01:47:22] STUDENT_8: We'll have multiple DNS.   {#1858}
[01:47:25] TEACHER: load balance between DNS.   {#1859}
[01:47:30] TEACHER: Right.   {#1860}
[01:47:31] TEACHER: And now this is a transcending problem.   {#1861}
[01:47:33] TEACHER: Yeah.   {#1862}
[01:47:34] TEACHER: So, okay.   {#1863}
[01:47:36] TEACHER: Let me ask you other question.   {#1864}
[01:47:37] TEACHER: How does a request flow look like now?   {#1865}
[01:47:41] TEACHER: So user was making a request has a load balancer IP address or sorry, has a load balancer name.   {#1866}
[01:47:47] TEACHER: Now what's the request flow?   {#1867}
[01:47:50] STUDENT_8: Uh, there's a load balancer name as in it since   {#1868}
[01:47:55] TEACHER: Payments.lb.google.com.   {#1869}
[01:47:57] STUDENT_8: So DNS will pick up a IP address of load balancer using some strategy.   {#1870}
[01:48:02] TEACHER: No, no, no.   {#1871}
[01:48:03] TEACHER: Request comes where?   {#1872}
[01:48:04] TEACHER: So user makes a request,   {#1873}
[01:48:06] TEACHER: http colon slash slash payments.lb.google.com slash help, for example.   {#1874}
[01:48:10] TEACHER: Now what?   {#1875}
[01:48:11] TEACHER: What would happen first?   {#1876}
[01:48:14] STUDENT_8: So then it will go to appropriate DNS, which has that IP address.   {#1877}
[01:48:20] STUDENT_8: DNS free, something like that.   {#1878}
[01:48:21] STUDENT_8: And then it picks up the correct DNS, which has that IP address.   {#1879}
[01:48:28] STUDENT_8: And then the request went to DNS.   {#1880}
[01:48:31] TEACHER: Then what is DNS doing?   {#1881}
[01:48:32] STUDENT_8: DNS according to its strategy will pick the IP address and send out that request to that   {#1882}
[01:48:39] STUDENT_8: particular load balancer.   {#1883}
[01:48:40] TEACHER: So DNS is routing the request to load balancer?   {#1884}
[01:48:44] STUDENT_8: Yes.   {#1885}
[01:48:45] TEACHER: So then what is load balancer?   {#1886}
[01:48:47] TEACHER: Because then this is just exactly the load balancer.   {#1887}
[01:48:50] TEACHER: If all the request goes like this, then this is acting as a load balancer.   {#1888}
[01:48:54] TEACHER: That's a wrong thing.   {#1889}
[01:48:55] STUDENT_8: DNS should send the IP address to client back and then the client will make request.   {#1890}
[01:49:01] TEACHER: Correct.   {#1891}
[01:49:02] TEACHER: Which is exactly what happens because now if this, this cannot, this cannot act as a   {#1892}
[01:49:06] TEACHER: proxy, it just a domain name resolution service.   {#1893}
[01:49:11] TEACHER: That's it.   {#1894}
[01:49:12] TEACHER: It does the results given a human readable name, give me an IP address.   {#1895}
[01:49:17] TEACHER: That's it.   {#1896}
[01:49:18] TEACHER: So the flow, which is why I asked you that question to, you know, get this thing, basically   {#1897}
[01:49:25] TEACHER: as the board that DNS is not a proxy.   {#1898}
[01:49:29] TEACHER: DNS is just someone who is resolving the IP address.   {#1899}
[01:49:32] TEACHER: So this is the request flow that looks like this.   {#1900}
[01:49:36] TEACHER: So it sends a request.   {#1901}
[01:49:38] TEACHER: It gets the IP address.   {#1902}
[01:49:40] TEACHER: Client always caches the resolved IP address for some time.   {#1903}
[01:49:44] TEACHER: Forwards the request and then basically makes a connection to the corresponding LB server.   {#1904}
[01:49:48] TEACHER: And this automatically happens.   {#1905}
[01:49:49] TEACHER: This is what when you make an HTTP request to anybody.   {#1906}
[01:49:52] TEACHER: This is exactly what happens behind a sense.   {#1907}
[01:49:55] TEACHER: goes to DNS, you get the response, you automatically connect to that. This is the part of your   {#1908}
[01:50:00] TEACHER: implementation. And this way your connection is being formed to an LB server and then the normal   {#1909}
[01:50:08] TEACHER: request takes over. Like how once it's over here, now the TCP connection is over here,   {#1910}
[01:50:13] TEACHER: it takes on backend server, sends the request, gets the response and sends it back to the user.   {#1911}
[01:50:16] TEACHER: Right. So DNS is just to resolve name to IP address, nothing more, nothing less. It's not   {#1912}
[01:50:21] TEACHER: acting as a box right and this is how your load balancer has scaled now for example when your   {#1913}
[01:50:27] TEACHER: orchestrator saw that there is a need to add a new lb server it spin up an lb server and updated   {#1914}
[01:50:34] TEACHER: the dns entry for that so when it add a third one it would add 10.0.0.3 whatever the ip addresses   {#1915}
[01:50:42] TEACHER: it would keep on adding that so that's the job of an orchestrate and this is what the load balancer   {#1916}
[01:50:49] TEACHER: the system design quote unquote looks like.   {#1917}
[01:50:52] TEACHER: And let me just show you final diagram.   {#1918}
[01:50:54] TEACHER: And by the way, this is exactly what I've written.   {#1919}
[01:50:56] TEACHER: There is nothing extra.   {#1920}
[01:50:58] TEACHER: I just want to cover that one final diagram.   {#1921}
[01:51:01] TEACHER: This is one.   {#1922}
[01:51:02] TEACHER: And this is exactly what we just discussed.   {#1923}
[01:51:05] TEACHER: So here, what you would see is that you have your LB servers,   {#1924}
[01:51:10] TEACHER: multiple LB servers running.   {#1925}
[01:51:12] TEACHER: You have your orchestrator.   {#1926}
[01:51:13] TEACHER: You have your database over here.   {#1927}
[01:51:15] TEACHER: You have your LB console where developer is directly making changes.   {#1928}
[01:51:19] TEACHER: You have your Prometheus server set up over here.   {#1929}
[01:51:22] TEACHER: So all the backend servers send data to Prometheus.   {#1930}
[01:51:24] TEACHER: The central thing where all the telemetry goes in.   {#1931}
[01:51:27] TEACHER: All the vital CPU, memory, disk and all periodically gets sent over here.   {#1932}
[01:51:31] TEACHER: So Prometheus holds that data.   {#1933}
[01:51:35] TEACHER: Orchestrator periodically queries Prometheus to see if LB server needs to scale up or not.   {#1934}
[01:51:40] TEACHER: So depending on when it sees a need to scale up LB server, it scales that.   {#1935}
[01:51:43] TEACHER: It makes an entry into core DNS server.   {#1936}
[01:51:45] TEACHER: client whenever it wants and now here it's not just end user all that drawing user i can it can   {#1937}
[01:51:50] TEACHER: be another micro service also server also user also anything whenever there is a request on a   {#1938}
[01:51:56] TEACHER: human readable name it needs a resolution so let's say lb.payments.google.com request goes to core   {#1939}
[01:52:03] TEACHER: dns gets it back gets the ip address it connects to the lb server lb server depending on the   {#1940}
[01:52:09] TEACHER: balancing strategy picks a backend server to do that backend server then does its whatever   {#1941}
[01:52:13] TEACHER: of processing it needs to do sends the response and sends it back to the user right this is what   {#1942}
[01:52:18] TEACHER: happens whenever there is any alteration in the database config either health check failed or it   {#1943}
[01:52:24] TEACHER: saw a need auto scaling kicked in and saw a need or something the configuration is updated in the   {#1944}
[01:52:29] TEACHER: database now when the configuration is updated in the database either cdc kicks in or lb server   {#1945}
[01:52:35] TEACHER: itself pushes a message over here or orchestrator pushes the message to this redis broker because   {#1946}
[01:52:40] TEACHER: Because this is a real time pubs up, it is real time in real time sent to all the LB   {#1947}
[01:52:45] TEACHER: servers.   {#1948}
[01:52:45] TEACHER: Now this is what happens is you guarantee message delivery because of this.   {#1949}
[01:52:50] TEACHER: All the LB servers are listening and they are updating their in-memory copy of the configuration   {#1950}
[01:52:55] TEACHER: that it has.   {#1951}
[01:52:56] TEACHER: This way you do not lose on the performance while you do your entire load balancing.   {#1952}
[01:53:03] TEACHER: Right?   {#1953}
[01:53:04] TEACHER: Okay.   {#1954}
[01:53:05] TEACHER: And if you want to dive deeper, this is one excellent paper.   {#1955}
[01:53:10] TEACHER: Maglev, a fast and reliable software load balancer.   {#1956}
[01:53:13] TEACHER: It's really easy.   {#1957}
[01:53:14] TEACHER: This is one of the first papers I ever read.   {#1958}
[01:53:16] TEACHER: It is not difficult at all, but read it.   {#1959}
[01:53:19] TEACHER: You'll understand few other things that I've mostly covered most of it, but now   {#1960}
[01:53:24] TEACHER: this paper would make a lot more sense.   {#1961}
[01:53:27] TEACHER: You would get much more granular details of things that you might be a little   {#1962}
[01:53:31] TEACHER: interested about, right?   {#1963}
[01:53:32] TEACHER: You'll find it.   {#1964}
[01:53:33] TEACHER: But this is how you design load balancer.   {#1965}
[01:53:35] TEACHER: So what we covered, we covered an extreme low level implementation of load   {#1966}
[01:53:38] TEACHER: balancer, a high level design of load balancer, answering every or rather covering every single   {#1967}
[01:53:43] TEACHER: aspect of it.   {#1968}
[01:53:44] TEACHER: And now here you might see a few things here and there floating around which you would   {#1969}
[01:53:50] TEACHER: obviously cover in future, but there are some sneak peeks that you would get on what is   {#1970}
[01:53:55] TEACHER: coming in coming weeks.   {#1971}
[01:53:57] TEACHER: Right.   {#1972}
[01:53:57] TEACHER: Okay.   {#1973}
[01:53:58] TEACHER: Before we go on a break, I know it has been a little late.   {#1974}
[01:54:00] TEACHER: I know we stretched a lot, but I just wanted to go in depth of it to ensure it's covered   {#1975}
[01:54:05] TEACHER: very thoroughly.   {#1976}
[01:54:06] TEACHER: Right.   {#1977}
[01:54:06] TEACHER: Okay.   {#1978}
[01:54:08] TEACHER: Before we go on a break, because then we have a locks also to cover.   {#1979}
[01:54:12] TEACHER: Okay.   {#1980}
[01:54:13] STUDENT_1: I'll take three questions now.   {#1981}
[01:54:15] STUDENT_1: Uh, people who have not spoken, I'm just giving them.   {#1982}
[01:54:19] STUDENT_1: Everyone's is a known place.   {#1983}
[01:54:20] STUDENT_2: Uh, I bet I was thinking, let's say we are at a day zero architecture and we have in   {#1984}
[01:54:27] STUDENT_2: front days now, uh, the client uses local DNS cash, right.   {#1985}
[01:54:31] STUDENT_2: To not to prevent, uh, IO trips, I mean, network trips to local DNS server.   {#1986}
[01:54:36] STUDENT_2: Now, if let's say, I mean, it's a, it's a very, uh, uh, corner scenario where we only   {#1987}
[01:54:41] STUDENT_2: have one LP server goes down, right.   {#1988}
[01:54:43] STUDENT_2: And the person has a local DNS cache.   {#1989}
[01:54:46] STUDENT_2: It's just tries to ping that IP of LP server, but I know caches has a TTL also, uh, for   {#1990}
[01:54:52] STUDENT_2: TTL goes and checks the DNS server, but until the TTL expires out, the site is unavailable   {#1991}
[01:54:58] STUDENT_2: to it.   {#1992}
[01:54:59] STUDENT_2: And then there's the LP server.   {#1993}
[01:55:00] TEACHER: Think of it, right.   {#1994}
[01:55:01] TEACHER: when if it tries to connect and it's not able to connect it would immediately make and resolve   {#1995}
[01:55:06] TEACHER: another IP address okay I was not aware of this it pulls back and sees another that's a that's a   {#1996}
[01:55:12] TEACHER: reactive thing if you know you are hurt somewhere would you not immediately go and take an aid there   {#1997}
[01:55:17] TEACHER: why would you wait for something to happen let's say you have a periodic visit for your tooth aches   {#1998}
[01:55:22] TEACHER: right you'd say no I'll only visit a dentist only when the time comes but if it's hurting   {#1999}
[01:55:29] TEACHER: will you not go there? You will.   {#2000}
[01:55:32] TEACHER: Right. So that's the   {#2001}
[01:55:34] TEACHER: thing. So if you see that   {#2002}
[01:55:36] TEACHER: the IP address that I'm trying to   {#2003}
[01:55:37] TEACHER: resolve, like the IP address that I'm trying to connect is   {#2004}
[01:55:39] TEACHER: not there, I would explicitly invalidate   {#2005}
[01:55:42] TEACHER: my cache and make a call to code DNS   {#2006}
[01:55:44] TEACHER: which fits me another IP address.   {#2007}
[01:55:46] STUDENT_2: And what if code DNS   {#2008}
[01:55:47] STUDENT_2: you said code DNS is a private   {#2009}
[01:55:50] STUDENT_2: infrared, if it   {#2010}
[01:55:51] STUDENT_2: goes down then how do we resolve?   {#2011}
[01:55:53] TEACHER: You have multiple code DNS servers running.   {#2012}
[01:55:55] STUDENT_2: And how do we know that, okay, which code   {#2013}
[01:55:57] STUDENT_2: DNS to reach out?   {#2014}
---- OWNED SEGMENTS END ----

CTX| [01:56:01] TEACHER: That's more interesting.   {#2015}
CTX| [01:56:02] TEACHER: So you have a DNS for core DNS.   {#2016}
CTX| [01:56:04] TEACHER: So at one step that latency becomes so small that that one server is able to handle that.   {#2017}
CTX| [01:56:11] TEACHER: So there is one single point of failure still in a system, which has a standby node.   {#2018}
CTX| [01:56:15] TEACHER: That's the base condition of the recursive.   {#2019}
CTX| [01:56:18] STUDENT_2: I mean, we do trace route to a domain, right.   {#2020}
CTX| [01:56:20] STUDENT_2: And it shows up so many levels of, I mean, 21 levels I've seen to reach Google.com.   {#2021}
CTX| [01:56:26] STUDENT_2: So that's common.   {#2022}
CTX| [01:56:27] STUDENT_2: There's so many levels in between, right?   {#2023}
CTX| [01:56:30] TEACHER: Yeah.   {#2024}
CTX| [01:56:31] TEACHER: And every single one of them is horizontally scalable,   {#2025}
CTX| [01:56:33] TEACHER: except one,   {#2026}
CTX| [01:56:34] TEACHER: which is single point of failure with a standby node.   {#2027}
CTX| [01:56:36] TEACHER: And that is so tiny that it can,   {#2028}
CTX| [01:56:38] TEACHER: it's very hard for it to go.   {#2029}
CTX| [01:56:40] TEACHER: And even if it goes on,   {#2030}
CTX| [01:56:41] TEACHER: there is already a standby server running.   {#2031}
CTX| [01:56:43] TEACHER: So if it goes on in milliseconds,   {#2032}
CTX| [01:56:44] TEACHER: otherwise would basically,   {#2033}
CTX| [01:56:46] TEACHER: but in second it would take its place.   {#2034}
CTX| [01:56:49] TEACHER: Okay.   {#2035}
CTX| [01:56:50] TEACHER: Thank you.   {#2036}
CTX| [01:56:52] STUDENT_5: Yeah, Shreeram.   {#2037}
CTX| [01:56:55] STUDENT_10: Yeah, let's assume these end users are external users and not internal Microsoft.   {#2038}
CTX| [01:57:00] STUDENT_10: So when resolving the name to an IP, why would they use our core DNS?   {#2039}
