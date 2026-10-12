# chunk_10  OWNS 01:47:02 -> 01:57:49  (segments #1734-#1901, 1829 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:46:02] TEACHER: Because if I go down deeper into page initial, like if I go level deep into it, third page   {#1716}
CTX| [01:46:08] TEACHER: is okay.   {#1717}
CTX| [01:46:08] TEACHER: Fourth page is okay.   {#1718}
CTX| [01:46:09] TEACHER: Fifth page is okay.   {#1719}
CTX| [01:46:09] TEACHER: Six page would be slower.   {#1720}
CTX| [01:46:11] TEACHER: Seven would be even slower.   {#1721}
CTX| [01:46:12] TEACHER: Eight would be even slower, but it is a very common use case to scroll through it.   {#1722}
CTX| [01:46:15] TEACHER: You'll say, why would someone scroll through person's profile?   {#1723}
CTX| [01:46:18] TEACHER: Okay.   {#1724}
CTX| [01:46:19] TEACHER: Let me give you another example.   {#1725}
CTX| [01:46:20] TEACHER: Let's say you are writing a bad job.   {#1726}
CTX| [01:46:23] TEACHER: In order to compute trending topics, right?   {#1727}
CTX| [01:46:27] TEACHER: Trending topics in last two, you want to process last one hour of tweets.   {#1728}
CTX| [01:46:32] TEACHER: processing last one hour tweets in one hour twitter produces millions of tweets   {#1729}
CTX| [01:46:37] TEACHER: imagine doing pagination across those million rows that would be so slow let me give you a   {#1730}
CTX| [01:46:43] TEACHER: practical example of that i never thought this would come in this handy i wrote a very quick   {#1731}
CTX| [01:46:50] TEACHER: demo uh back in 2016 i was getting bored at amazon didn't know what to do what i did is i   {#1732}
CTX| [01:46:57] TEACHER: I was heavily into MongoDB back then.   {#1733}

---- OWNED SEGMENTS START ----
[01:47:02] TEACHER: I wrote a simple benchmark.   {#1734}
[01:47:05] TEACHER: I found something interesting and I wrote a benchmark back in 2016.   {#1735}
[01:47:08] TEACHER: Good that I got bored at Amazon.   {#1736}
[01:47:10] TEACHER: So efficient pagination, MongoDB, MongoDB benchmark.   {#1737}
[01:47:17] TEACHER: You want this?   {#1738}
[01:47:19] TEACHER: Okay.   {#1739}
[01:47:21] TEACHER: So this holds true for MongoDB.   {#1740}
[01:47:24] TEACHER: This holds true for SQL.   {#1741}
[01:47:25] TEACHER: this whole super literally every single database out there right okay let me explain what's happening   {#1742}
[01:47:33] TEACHER: here how pagination id generation pagination are linked together right so there are two ways to   {#1743}
[01:47:40] TEACHER: paginate as i said first way to do it is limit offset this is limit and offset mongodb's example   {#1744}
[01:47:46] TEACHER: skip and limit the idea is that whenever you are firing or want to get the next one you fire queries   {#1745}
[01:47:52] TEACHER: like this. You skip something, you limit something. You skip something, you limit something. Here it   {#1746}
[01:47:55] TEACHER: should be 10 FII. But that's fine. You do that. Now what happens behind the scene when you execute   {#1747}
[01:48:01] TEACHER: it? Now when you execute a query like this, limit n offset n. When you execute something like this,   {#1748}
[01:48:10] TEACHER: your database has to evaluate the entire query, literally find the entire result set until the   {#1749}
[01:48:17] TEACHER: point that you requested, skip those many of the result set and pick the one that you're interested   {#1750}
[01:48:22] TEACHER: it. That is extremely expensive because every time you are executing the query, you have   {#1751}
[01:48:28] TEACHER: to compute the entire result set. Then you are skipping and then you're picking the things   {#1752}
[01:48:33] TEACHER: that you requested for. It becomes linearly expensive. I'll walk you through that.   {#1753}
[01:48:40] TEACHER: But other way to do pagination is ID limit based pagination where let's say you just   {#1754}
[01:48:44] TEACHER: want to iterate through a table. That's it. No advanced filters, no advanced varic losses.   {#1755}
[01:48:52] TEACHER: want to iterate through the table.   {#1756}
[01:48:54] TEACHER: That's it.   {#1757}
[01:48:56] TEACHER: In Twitter's case, let's say you want to read tweets.   {#1758}
[01:49:00] TEACHER: You as it Twitter wants to read tweets made in last one so that it can do processing of   {#1759}
[01:49:04] TEACHER: funding trending topics and whatnot, or doing recommendation, putting it into Twitter speed   {#1760}
[01:49:08] TEACHER: and whatnot, right?   {#1761}
[01:49:09] TEACHER: Very common use case for Twitter.   {#1762}
[01:49:11] TEACHER: So it's very common for them to iterate through all the tweets that made in last N minutes,   {#1763}
[01:49:16] TEACHER: right?   {#1764}
[01:49:17] TEACHER: In order for you to do that.   {#1765}
[01:49:19] TEACHER: they need very efficient pagination which is where you go for id limit based pagination   {#1766}
[01:49:24] TEACHER: first of all what is id limit based pagination when your ids are comparable for example my   {#1767}
[01:49:30] TEACHER: sql auto increment ids they are comparable one two three four five six you know which one came   {#1768}
[01:49:34] TEACHER: first which one came second right ids are comparable in case of mongodicree and snowflake   {#1769}
[01:49:41] TEACHER: and anywhere where you see time on the leftmost side you can actually compare the ids you can   {#1770}
[01:49:48] TEACHER: which one is larger. Right? So now what you can do is instead of paginating by limit and offset,   {#1771}
[01:49:54] TEACHER: you paginate it by id. Something like this. And db.students.find where id is greater than the   {#1772}
[01:50:02] TEACHER: last. So you first get the first 10 rows. Then you find the last id from this while iterating   {#1773}
[01:50:09] TEACHER: you find the last id and then you do db.students.find where id is greater than the last id limit 10.   {#1774}
[01:50:14] TEACHER: then id greater than the last id limited then id greater than the last id limited and so on and so   {#1775}
[01:50:19] TEACHER: for given that your collection mongodb collection sql table are all physically stored by id that's   {#1776}
[01:50:30] TEACHER: what how databases are stored they're physically stored order by primary key this becomes a very   {#1777}
[01:50:37] TEACHER: efficient operation. Let me show you the benchmarking graph. Here this is the graph.   {#1778}
[01:50:44] TEACHER: So here you see the blue line is the skip limit or limit offset based pagination and id limit   {#1779}
[01:50:52] TEACHER: is the id based pagination. Obviously I cannot apply advanced where clauses over here but if   {#1780}
[01:50:59] TEACHER: you don't have to you can get a constant time performance while doing deep pagination. Here   {#1781}
[01:51:08] TEACHER: range or for smaller   {#1782}
[01:51:09] TEACHER: depth of pagination, your time does   {#1783}
[01:51:11] TEACHER: not very much. But as   {#1784}
[01:51:13] TEACHER: you go deeper and deeper and deeper   {#1785}
[01:51:15] TEACHER: and deeper and deeper,   {#1786}
[01:51:17] TEACHER: you see the time increasing   {#1787}
[01:51:20] TEACHER: linearly. It holds true for   {#1788}
[01:51:21] TEACHER: every use case. This is where I had   {#1789}
[01:51:23] TEACHER: a massive disk flush. I   {#1790}
[01:51:25] TEACHER: was so keen why there is a sudden   {#1791}
[01:51:27] TEACHER: spike over here. My   {#1792}
[01:51:29] TEACHER: disk started to throttle   {#1793}
[01:51:31] TEACHER: at that time and I was so happy that I made my   {#1794}
[01:51:33] TEACHER: disk throttle. Because of it, there is a sudden   {#1795}
[01:51:35] TEACHER: spike but it is actually linear.   {#1796}
[01:51:37] TEACHER: And it was fun to understand that I got to put so much pressure on my desk   {#1797}
[01:51:42] TEACHER: that it started crying and I was so happy.   {#1798}
[01:51:44] TEACHER: I always wanted to saturate my IO and I was able to do that.   {#1799}
[01:51:48] TEACHER: So here what happened is you can very clearly see a linear growth in time,   {#1800}
[01:51:53] TEACHER: but it is constant performance when I'm doing ID based mission   {#1801}
[01:51:57] TEACHER: because it is a property of database to keep things ordered by primary key.   {#1802}
[01:52:02] TEACHER: Always, always.   {#1803}
[01:52:04] TEACHER: Okay.   {#1804}
[01:52:04] TEACHER: By the way, in case you are interested to know,   {#1805}
[01:52:06] TEACHER: I have a members-only video on my YouTube last week posted,   {#1806}
[01:52:09] TEACHER: not promoting, but in case you'd want to know deeper,   {#1807}
[01:52:11] TEACHER: I'm covering a bunch of database engineering topics there on YouTube.   {#1808}
[01:52:15] TEACHER: But it is members-only, so you may have to make that other purchase there.   {#1809}
[01:52:19] TEACHER: But I went into how database actually stores,   {#1810}
[01:52:22] TEACHER: like why database chooses B plus 3 to store it   {#1811}
[01:52:24] TEACHER: and how it actually physically stores the data,   {#1812}
[01:52:25] TEACHER: how it makes its operations perform.   {#1813}
[01:52:28] TEACHER: So, iterating by primary key is very efficient   {#1814}
[01:52:34] TEACHER: is actually physically storing the data in that exact same manner.   {#1815}
[01:52:39] TEACHER: So for you to do, hey, give me 10 from this particular ID.   {#1816}
[01:52:43] TEACHER: Literally log n time, it reaches to that location,   {#1817}
[01:52:46] TEACHER: then sequential scan after that.   {#1818}
[01:52:48] TEACHER: Very efficient for your database.   {#1819}
[01:52:50] TEACHER: No matter, and because it is B plus 3,   {#1820}
[01:52:52] TEACHER: it's always log n to reach to that particular ID   {#1821}
[01:52:55] TEACHER: and then a sequential scan after that.   {#1822}
[01:52:57] TEACHER: Log n, sequential scan, log n, sequential scan.   {#1823}
[01:53:00] TEACHER: That's why no matter how deep you go,   {#1824}
[01:53:04] TEACHER: not increase at all.   {#1825}
[01:53:06] TEACHER: You see a constant,   {#1826}
[01:53:08] TEACHER: very evident from this graph,   {#1827}
[01:53:10] TEACHER: very evident.   {#1828}
[01:53:11] TEACHER: You see a constant type of comments   {#1829}
[01:53:12] TEACHER: always for ID based imagination.   {#1830}
[01:53:15] TEACHER: Disadvantaged,   {#1831}
[01:53:15] TEACHER: you cannot apply a complex   {#1832}
[01:53:16] TEACHER: where clauses,   {#1833}
[01:53:17] TEACHER: but it's okay.   {#1834}
[01:53:18] TEACHER: That's what your use case is,   {#1835}
[01:53:20] TEACHER: right?   {#1836}
[01:53:20] TEACHER: But that is a very nice,   {#1837}
[01:53:23] TEACHER: but basically that is a very nice   {#1838}
[01:53:25] TEACHER: side effect or other byproduct   {#1839}
[01:53:26] TEACHER: of using snowflake   {#1840}
[01:53:29] TEACHER: or any iteration   {#1841}
[01:53:30] TEACHER: or any ID generation logic   {#1842}
[01:53:34] TEACHER: where timestamp is on the leftmost side.   {#1843}
[01:53:36] TEACHER: You will always see that.   {#1844}
[01:53:37] TEACHER: So MongoDB, I showed you an example holds true for Snowflake,   {#1845}
[01:53:41] TEACHER: holds true for even MySQL.   {#1846}
[01:53:43] TEACHER: Even in MySQL, you don't want to do that deep pagination   {#1847}
[01:53:46] TEACHER: and you don't want fancy where clauses.   {#1848}
[01:53:49] TEACHER: Try doing this.   {#1849}
[01:53:49] TEACHER: You would get much, much, much, much, much larger performance   {#1850}
[01:53:52] TEACHER: when you are going deeper into pagination.   {#1851}
[01:53:54] TEACHER: But this does not mean you go and replace all of your   {#1852}
[01:53:58] TEACHER: iteration logic because it has limitations that   {#1853}
[01:54:01] TEACHER: if you have complex where clauses,   {#1854}
[01:54:04] TEACHER: vegetation right but where you can go for it right okay so before i take question let me just cover   {#1855}
[01:54:11] TEACHER: this snowflake at discord and after this we'll take question about snowflake and i will talk   {#1856}
[01:54:15] TEACHER: about instagram software so here what happens is there is no enforcement we say that the first 41   {#1857}
[01:54:23] TEACHER: bits over here is epoch millisecond so epoch millisecond is basically time stamp from epoch   {#1858}
[01:54:29] TEACHER: epoch is 1st January 1970.   {#1859}
[01:54:32] TEACHER: But if my company is starting in let's say 2011 or 2015, why, why should I start my time   {#1860}
[01:54:40] TEACHER: from 1st January 1970?   {#1861}
[01:54:41] TEACHER: Can I not get a custom epoch?   {#1862}
[01:54:44] TEACHER: So this way I can get a larger range, right?   {#1863}
[01:54:47] TEACHER: For example, the time that I lost from 1st January 1970 to let's say 2015, those big   {#1864}
[01:54:54] TEACHER: of an ID range, I would get it to, it would just enlarge my ID.   {#1865}
[01:54:59] TEACHER: even longer and like heads up for 20 30 30 for 35 years heads up that's huge like 35 years of ids   {#1866}
[01:55:09] TEACHER: you will get it right so what discord does it has the exact same structure exact same structure as   {#1867}
[01:55:15] TEACHER: twitter but it's just that the epoch time starts from first second of 2015 because in 2015 the   {#1868}
[01:55:21] TEACHER: company started right snowflake is also used by sony the tv company sony they also use snowflake   {#1869}
[01:55:29] TEACHER: based implementation it is open source you can find it on github go through the source code five   {#1870}
[01:55:34] TEACHER: lines of code of core snowflake and you see it's literally bit manipulation that's it all right and   {#1871}
[01:55:39] TEACHER: we'll also see it by instagram how they also manipulate those bits very easy right but go   {#1872}
[01:55:44] TEACHER: through that it's very easy and this snowflake get very nice fraction because of its decentralization   {#1873}
[01:55:52] TEACHER: there is no need of centralized id generation service there is no moving part required moving   {#1874}
[01:55:56] TEACHER: part is no external surveys which needs to be scaled up and scaled out and whatnot.   {#1875}
[01:56:01] TEACHER: It's very counterintuitive.   {#1876}
[01:56:02] TEACHER: Whenever you think of ID generation, the first thing comes up,   {#1877}
[01:56:04] TEACHER: I'll write a microservice that does that.   {#1878}
[01:56:07] TEACHER: Good engineers never think like that.   {#1879}
[01:56:09] TEACHER: Good engineers look at problem.   {#1880}
[01:56:10] TEACHER: They look at the most efficient way to find a solution.   {#1881}
[01:56:13] TEACHER: Not every solution requires you to build a service.   {#1882}
[01:56:17] TEACHER: For some reason, everyone is doing that.   {#1883}
[01:56:20] TEACHER: Very stupid.   {#1884}
[01:56:22] TEACHER: Do things that matter to you and your business.   {#1885}
[01:56:26] TEACHER: else is doing it right everything every system every solution is contextual it depends on the   {#1886}
[01:56:33] TEACHER: context of your organization the expertise of your engineer the support from your management   {#1887}
[01:56:38] TEACHER: but you are the one who can bring that chain in case you are unhappy if your solution is far   {#1888}
[01:56:43] TEACHER: superior than others everyone else is proposing microservice but if you think snowflake works well   {#1889}
[01:56:47] TEACHER: for you just go for snowflake you need to have you need to make data driven decisions if you show   {#1890}
[01:56:52] TEACHER: the data, why would they not adopt it? It's really simple but just don't fall into this trap of   {#1891}
[01:56:58] TEACHER: building microservices after like for every single problem. Microservices are stupid in most cases.   {#1892}
[01:57:06] TEACHER: In most cases they are stupid, they are an overkill. So understand the context and then build   {#1893}
[01:57:12] TEACHER: what you really need to build. Keep things simple because simple systems scale, always simple.   {#1894}
[01:57:19] TEACHER: And if you look here, it is just a library.   {#1895}
[01:57:23] TEACHER: Normal three lines of code leads you in generating a Snowflake ID.   {#1896}
[01:57:29] TEACHER: You don't even have to make a network call for that because of its decentralization,   {#1897}
[01:57:33] TEACHER: because of not having to make a network call and build a service and scale it in, it's   {#1898}
[01:57:37] TEACHER: just so, so, so efficient for you to live this.   {#1899}
[01:57:41] TEACHER: This is the beauty of Snowflake.   {#1900}
[01:57:43] TEACHER: Any questions on this before we go to Instagram.   {#1901}
---- OWNED SEGMENTS END ----

CTX| [01:57:49] TEACHER: Yes, Rajiv.   {#1902}
CTX| [01:57:51] STUDENT_1: Arpeth, that graph which you showed us, how did you come to know that the disk is throttling   {#1903}
CTX| [01:57:56] STUDENT_1: there?   {#1904}
CTX| [01:57:59] TEACHER: I happened to have Prometheus running at that point of time, which was exporting my node   {#1905}
CTX| [01:58:03] TEACHER: metrics into somewhere.   {#1906}
CTX| [01:58:04] TEACHER: I happened to have that happened.   {#1907}
CTX| [01:58:06] TEACHER: It was all luck.   {#1908}
CTX| [01:58:09] TEACHER: So what I saw was my disk IO.   {#1909}
CTX| [01:58:11] TEACHER: I was continuously monitoring my disk IO.   {#1910}
CTX| [01:58:13] TEACHER: Actually the node was monitoring it.   {#1911}
CTX| [01:58:15] TEACHER: I had those metrics being exported somewhere else.   {#1912}
CTX| [01:58:18] TEACHER: on, uh, all that was done on my local machine, but I was capturing those metrics for some   {#1913}
CTX| [01:58:24] TEACHER: other thing. I was writing a Wikipedia. I was writing a search engine on Wikipedia.   {#1914}
CTX| [01:58:28] TEACHER: I wanted to capture a bunch of metrics and I happened to have node exporter running and   {#1915}
CTX| [01:58:33] TEACHER: it captured it. It showed my disk IO utilization, uh, as part of my node, uh, exporter, you   {#1916}
CTX| [01:58:38] TEACHER: get this disk IO utilization metric. That's how I got to know. It was a hundred percent.   {#1917}
CTX| [01:58:42] STUDENT_1: that thing. Okay. Uh, one more thing that, uh, you told about this, uh,   {#1918}
CTX| [01:58:49] STUDENT_1: imagination logic works for all DB. Uh, you talked about B plus three of my SQL or SQL   {#1919}
