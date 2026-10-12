# chunk_11  OWNS 01:57:49 -> 02:09:20  (segments #1902-#2126, 1870 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:56:52] TEACHER: the data, why would they not adopt it? It's really simple but just don't fall into this trap of   {#1891}
CTX| [01:56:58] TEACHER: building microservices after like for every single problem. Microservices are stupid in most cases.   {#1892}
CTX| [01:57:06] TEACHER: In most cases they are stupid, they are an overkill. So understand the context and then build   {#1893}
CTX| [01:57:12] TEACHER: what you really need to build. Keep things simple because simple systems scale, always simple.   {#1894}
CTX| [01:57:19] TEACHER: And if you look here, it is just a library.   {#1895}
CTX| [01:57:23] TEACHER: Normal three lines of code leads you in generating a Snowflake ID.   {#1896}
CTX| [01:57:29] TEACHER: You don't even have to make a network call for that because of its decentralization,   {#1897}
CTX| [01:57:33] TEACHER: because of not having to make a network call and build a service and scale it in, it's   {#1898}
CTX| [01:57:37] TEACHER: just so, so, so efficient for you to live this.   {#1899}
CTX| [01:57:41] TEACHER: This is the beauty of Snowflake.   {#1900}
CTX| [01:57:43] TEACHER: Any questions on this before we go to Instagram.   {#1901}

---- OWNED SEGMENTS START ----
[01:57:49] TEACHER: Yes, Rajiv.   {#1902}
[01:57:51] STUDENT_1: Arpeth, that graph which you showed us, how did you come to know that the disk is throttling   {#1903}
[01:57:56] STUDENT_1: there?   {#1904}
[01:57:59] TEACHER: I happened to have Prometheus running at that point of time, which was exporting my node   {#1905}
[01:58:03] TEACHER: metrics into somewhere.   {#1906}
[01:58:04] TEACHER: I happened to have that happened.   {#1907}
[01:58:06] TEACHER: It was all luck.   {#1908}
[01:58:09] TEACHER: So what I saw was my disk IO.   {#1909}
[01:58:11] TEACHER: I was continuously monitoring my disk IO.   {#1910}
[01:58:13] TEACHER: Actually the node was monitoring it.   {#1911}
[01:58:15] TEACHER: I had those metrics being exported somewhere else.   {#1912}
[01:58:18] TEACHER: on, uh, all that was done on my local machine, but I was capturing those metrics for some   {#1913}
[01:58:24] TEACHER: other thing. I was writing a Wikipedia. I was writing a search engine on Wikipedia.   {#1914}
[01:58:28] TEACHER: I wanted to capture a bunch of metrics and I happened to have node exporter running and   {#1915}
[01:58:33] TEACHER: it captured it. It showed my disk IO utilization, uh, as part of my node, uh, exporter, you   {#1916}
[01:58:38] TEACHER: get this disk IO utilization metric. That's how I got to know. It was a hundred percent.   {#1917}
[01:58:42] STUDENT_1: that thing. Okay. Uh, one more thing that, uh, you told about this, uh,   {#1918}
[01:58:49] STUDENT_1: imagination logic works for all DB. Uh, you talked about B plus three of my SQL or SQL   {#1919}
[01:58:54] STUDENT_1: based thing, but then when it comes to no SQL part, uh, uh, primary key, uh, reading   {#1920}
[01:59:00] STUDENT_1: is the same for both people.   {#1921}
[01:59:03] TEACHER: Depends on the storage engine. MongoDB, it works well. You saw it in MongoDB. MongoDB   {#1922}
[01:59:06] TEACHER: is a no SQL data. Correct. Okay. Anyone that gives you sequential scanning, this would   {#1923}
[01:59:13] TEACHER: that the DynamoDB also, but if you're having completely decentralized hash   {#1924}
[01:59:17] TEACHER: based thing, then you cannot.   {#1925}
[01:59:19] TEACHER: If you're, if you have data locality, then you get this benefit.   {#1926}
[01:59:23] TEACHER: If your data is completely de localized, then you would never   {#1927}
[01:59:27] TEACHER: get this performance benefit.   {#1928}
[01:59:30] TEACHER: So understand how your database stores your data on the disk, which is why   {#1929}
[01:59:34] TEACHER: knowing database internals is essential for you to build performances.   {#1930}
[01:59:38] TEACHER: Otherwise you would have like, otherwise limit offset, everyone would have done   {#1931}
[01:59:42] TEACHER: So how your database is actually storing the data,   {#1932}
[01:59:45] TEACHER: you can make those performance optimizations   {#1933}
[01:59:48] TEACHER: without having to worry about is this true or not?   {#1934}
[01:59:51] TEACHER: Because you know it is how it is stored.   {#1935}
[01:59:54] TEACHER: But MongoDB, it works.   {#1936}
[01:59:56] TEACHER: And just one more example to that.   {#1937}
[01:59:58] TEACHER: We saw in that graph that for smaller value, it is okay.   {#1938}
[02:00:03] TEACHER: Elastic search, elastic search gives you two ways   {#1939}
[02:00:06] TEACHER: to page in it, exact same thing.   {#1940}
[02:00:08] TEACHER: Elastic search is also no SQL.   {#1941}
[02:00:10] TEACHER: It's also Charlotte partitioned work part.   {#1942}
[02:00:13] TEACHER: Elasticsearch puts a limit of 10,000 documents in a limit offset based pagination.   {#1943}
[02:00:18] TEACHER: You cannot go beyond 10,000.   {#1944}
[02:00:20] TEACHER: It's a hard-coded limit.   {#1945}
[02:00:22] TEACHER: Try spinning up Elasticsearch server.   {#1946}
[02:00:24] TEACHER: Try firing a query with offset, with skip.   {#1947}
[02:00:28] TEACHER: I'm not sure what they call it.   {#1948}
[02:00:30] TEACHER: I think they call it offset only.   {#1949}
[02:00:31] TEACHER: 10,000, more than 10,000.   {#1950}
[02:00:33] TEACHER: It gives you an error that you cannot go beyond this.   {#1951}
[02:00:35] TEACHER: Please use cursor API to go beyond this.   {#1952}
[02:00:38] TEACHER: Classic example where you are iterating through almost all the documents.   {#1953}
[02:00:42] TEACHER: They're more than 10,000.   {#1954}
[02:00:44] TEACHER: It's better to go for a cursor based approach versus going for a limit   {#1955}
[02:00:48] TEACHER: offset based approach for smaller values.   {#1956}
[02:00:50] TEACHER: It does not matter, but as you go deeper, deeper, deeper, that's   {#1957}
[02:00:54] TEACHER: where these things starts to creep up.   {#1958}
[02:00:56] TEACHER: Okay.   {#1959}
[02:00:58] TEACHER: Yeah.   {#1960}
[02:01:01] STUDENT_5: Yeah.   {#1961}
[02:01:02] STUDENT_5: So what is counter here in this is no flag approach in static counter   {#1962}
[02:01:06] TEACHER: atomically increment.   {#1963}
[02:01:07] TEACHER: Every time you generate ID.   {#1964}
[02:01:10] STUDENT_5: Okay.   {#1965}
[02:01:10] STUDENT_5: Per server counter.   {#1966}
[02:01:12] TEACHER: Per server.   {#1967}
[02:01:13] STUDENT_5: Alright.   {#1968}
[02:01:15] STUDENT_5: Yeah.   {#1969}
[02:01:15] TEACHER: Which is exactly why I stress so much in the first time when we're discussing this.   {#1970}
[02:01:19] TEACHER: It all comes together in all of these discussions.   {#1971}
[02:01:23] TEACHER: Yeah.   {#1972}
[02:01:24] TEACHER: Yeah.   {#1973}
[02:01:25] STUDENT_4: I didn't understand like how in Discord, Epoch is just a number, right?   {#1974}
[02:01:30] STUDENT_4: So even if we start from today's date, how is it like saving us?   {#1975}
[02:01:36] STUDENT_4: Okay.   {#1976}
[02:01:37] TEACHER: What is Epoch?   {#1977}
[02:01:37] TEACHER: Let's say I'm starting with the current epoch.   {#1978}
[02:01:50] TEACHER: The current epoch is 1676784716.   {#1979}
[02:01:55] TEACHER: This is the current epoch second.   {#1980}
[02:01:57] TEACHER: If I add three zero, it becomes current epoch millisecond.   {#1981}
[02:02:01] TEACHER: This is the current epoch millisecond.   {#1982}
[02:02:02] TEACHER: If I start, if I'm starting my company at this moment, I'm losing out on this.   {#1983}
[02:02:07] TEACHER: big operate because this is my first 41 bits of it.   {#1984}
[02:02:11] TEACHER: Right.   {#1985}
[02:02:11] TEACHER: So now because I have 41 bits only the maximum value that I can store in those   {#1986}
[02:02:17] TEACHER: 41 bits is.   {#1987}
[02:02:21] TEACHER: Correct.   {#1988}
[02:02:22] TEACHER: No, do the power 41.   {#1989}
[02:02:24] TEACHER: It will get exhausted pretty quickly because now I'm not starting from zero.   {#1990}
[02:02:27] TEACHER: I'm starting from this one.   {#1991}
[02:02:29] TEACHER: Correct.   {#1992}
[02:02:31] TEACHER: I could have caught up that big of a range.   {#1993}
[02:02:33] TEACHER: if I start from 0   {#1994}
[02:02:35] TEACHER: from this moment and let my time   {#1995}
[02:02:38] TEACHER: move forward from here 1, 2, 3,   {#1996}
[02:02:40] TEACHER: 4, 5, 6, on and so forth.   {#1997}
[02:02:41] STUDENT_4: Got it? So we are essentially subtracting   {#1998}
[02:02:44] STUDENT_4: the start time.   {#1999}
[02:02:46] TEACHER: So this way we get a   {#2000}
[02:02:48] TEACHER: massive range handy   {#2001}
[02:02:49] TEACHER: because the rate   {#2002}
[02:02:52] TEACHER: at which your time is moving   {#2003}
[02:02:54] TEACHER: forward is exactly the rate at which the time   {#2004}
[02:02:55] TEACHER: is moving forward. So this time and the actual time.   {#2005}
[02:02:58] TEACHER: So you get 35 years of time.   {#2006}
[02:03:00] TEACHER: If you start today, you get   {#2007}
[02:03:02] TEACHER: 45 years of time.   {#2008}
[02:03:03] TEACHER: Right.   {#2009}
[02:03:05] TEACHER: Right.   {#2010}
[02:03:05] TEACHER: So it would take more 45 years for you to exhaust that range of 41 minutes.   {#2011}
[02:03:11] STUDENT_2: Right.   {#2012}
[02:03:13] TEACHER: So you're just gaining that particular.   {#2013}
[02:03:16] TEACHER: Right.   {#2014}
[02:03:16] TEACHER: Okay.   {#2015}
[02:03:17] TEACHER: Okay.   {#2016}
[02:03:18] TEACHER: Now let's go into how Instagram does it.   {#2017}
[02:03:20] TEACHER: And this is why you should love early engineers, not current, early engineers of Instagram.   {#2018}
[02:03:25] TEACHER: You should like, they deserve to be millionaires, like multi-millionaires.   {#2019}
[02:03:29] TEACHER: They deserve.   {#2020}
[02:03:29] TEACHER: Look at this beautiful.   {#2021}
[02:03:31] TEACHER: When I first read that blog, I started cursing because this is such a brilliant piece of optimization.   {#2022}
[02:03:41] TEACHER: It just boggled my mind how someone having a deep knowledge of data, not really deep,   {#2023}
[02:03:47] TEACHER: someone having decent knowledge of database can do this much out of it.   {#2024}
[02:03:51] TEACHER: So what Instagram did is Instagram wanted to use Snowflake.   {#2025}
[02:03:57] TEACHER: But what they did is they did Snowflake while inserting in DB.   {#2026}
[02:04:03] TEACHER: So Twitter did Snowflake at API servers.   {#2027}
[02:04:08] TEACHER: Instagram does it over here.   {#2028}
[02:04:11] TEACHER: API server does not have Snowflake logic.   {#2029}
[02:04:14] TEACHER: Database has it.   {#2030}
[02:04:15] TEACHER: See the beauty of their implementation.   {#2031}
[02:04:18] TEACHER: So what Instagram needed?   {#2032}
[02:04:20] TEACHER: They wanted ID sortable by time.   {#2033}
[02:04:22] TEACHER: Same use case as Twitter.   {#2034}
[02:04:24] TEACHER: They wanted to process, find trending hashtags, push it to feeds of the users and whatnot.   {#2035}
[02:04:30] TEACHER: Like do processing on the recent item.   {#2036}
[02:04:32] TEACHER: So they needed ID sortable by time.   {#2037}
[02:04:34] TEACHER: 64 ID so that they are efficient on indexes.   {#2038}
[02:04:36] TEACHER: And they did not want to build a new service.   {#2039}
[02:04:39] TEACHER: Look carefully.   {#2040}
[02:04:40] TEACHER: How good companies, they are trying, continuously trying to not have microservices.   {#2041}
[02:04:48] TEACHER: We on the other hand are told to build microservices every now and then.   {#2042}
[02:04:51] TEACHER: That's why I always say good engineers never think in microservices.   {#2043}
[02:04:54] TEACHER: They think in problems and solutions.   {#2044}
[02:04:56] TEACHER: They did not go for a building Microsoft for every single thing out there.   {#2045}
[02:05:00] TEACHER: That's an overkill for most organizations.   {#2046}
[02:05:03] TEACHER: So they had these requirements.   {#2047}
[02:05:05] TEACHER: So what they went with, they tweaked Snowflake a bit.   {#2048}
[02:05:09] TEACHER: What they did, they put first 41 bits at epoch millisecond,   {#2049}
[02:05:13] TEACHER: but from 1st January 2011.   {#2050}
[02:05:15] TEACHER: So they get massive rage to play with now.   {#2051}
[02:05:19] TEACHER: Then the next 13 bits is DB shard ID.   {#2052}
[02:05:24] TEACHER: was already sharded we'll talk about the sharding structure also in a couple of minutes so what   {#2053}
[02:05:30] TEACHER: snowflake for twitter did 41 10 for machine id and 12 for this what instagram did 41 bits 13 and 10   {#2054}
[02:05:38] TEACHER: so 13 for db shard id and 10 is per shard sequence number static counter right okay let's first go   {#2055}
[02:05:44] TEACHER: into and understand what logical shards and physical servers are for instagram so what we do   {#2056}
[02:05:50] TEACHER: is in i hope you like it was shared in the period but i hope you saw that video on sharding and   {#2057}
[02:05:56] TEACHER: partitioning that i put on my youtube and shared in the readings if not do watch it i'll give you   {#2058}
[02:06:00] TEACHER: a glimpse of it so what instagram does instagram uses instagram uses uh postgres as a database   {#2059}
[02:06:08] TEACHER: right at 10 what instagram had is instagram created bunch of logical shards also called as   {#2060}
[02:06:16] TEACHER: partitions and physical DB servers.   {#2061}
[02:06:19] TEACHER: Physical DB servers is actual physical servers on which your database is running.   {#2062}
[02:06:22] TEACHER: Right.   {#2063}
[02:06:23] TEACHER: Which means your MySQL servers that you are spinning up.   {#2064}
[02:06:25] TEACHER: Right.   {#2065}
[02:06:26] TEACHER: Within the MySQL server, you create database by firing create database command.   {#2066}
[02:06:30] TEACHER: Right.   {#2067}
[02:06:31] TEACHER: That create database is a logical partition.   {#2068}
[02:06:35] TEACHER: Right.   {#2069}
[02:06:36] TEACHER: So what you do is you create logical shard, which is thousands of them at max 2 raise   {#2070}
[02:06:42] TEACHER: to 13, which is 8192 at max.   {#2071}
[02:06:46] TEACHER: And you have fewer physical servers, let's say 10 or 15.   {#2072}
[02:06:49] TEACHER: So on each server, you create create database Instagram 1, create database Instagram 2, create database Instagram 3.   {#2073}
[02:06:56] TEACHER: Other server create database Instagram 2000, create database Instagram 5000.   {#2074}
[02:07:00] TEACHER: So creating multiple logical partitions in your database, every partition will have the exact same tables with the exact same schemas.   {#2075}
[02:07:11] TEACHER: So this is one database in which you have four tables.   {#2076}
[02:07:16] TEACHER: database but different data table same schema same data different so this is logical partition   {#2077}
[02:07:23] TEACHER: this is physical server right so my sql server that you spin up is a physical server within which   {#2078}
[02:07:29] TEACHER: you when you do create database that is a logical partition so when you run a migration to add a   {#2079}
[02:07:33] TEACHER: column you have to run it on all the databases that you have all the physical database servers   {#2080}
[02:07:38] TEACHER: against which all the logical databases that you have when you do create database we always when   {#2081}
[02:07:46] TEACHER: database and your company name and you create   {#2082}
[02:07:48] TEACHER: users table, odd table and this.   {#2083}
[02:07:49] TEACHER: They do this multiple times, like 8,000   {#2084}
[02:07:52] TEACHER: times. But advantage   {#2085}
[02:07:54] TEACHER: that they get because of this   {#2086}
[02:07:55] TEACHER: is that   {#2087}
[02:07:58] TEACHER: now   {#2088}
[02:07:59] TEACHER: they can take a dump   {#2089}
[02:08:02] TEACHER: of a database and put it into   {#2090}
[02:08:03] TEACHER: some other database. For example,   {#2091}
[02:08:06] TEACHER: let's say   {#2092}
[02:08:08] TEACHER: one of my database is hot.   {#2093}
[02:08:11] TEACHER: One of my databases   {#2094}
[02:08:12] TEACHER: is hot. It can literally, we'll go   {#2095}
[02:08:14] TEACHER: into this one more time.   {#2096}
[02:08:16] TEACHER: in the fifth week, right?   {#2097}
[02:08:17] TEACHER: But I'm just giving you a glimpse   {#2098}
[02:08:19] TEACHER: on what this is all about.   {#2099}
[02:08:20] TEACHER: They can literally take this small database,   {#2100}
[02:08:23] TEACHER: logical partition,   {#2101}
[02:08:24] TEACHER: and move it over here.   {#2102}
[02:08:26] TEACHER: SQL dump commands,   {#2103}
[02:08:27] TEACHER: they do this, they dump it,   {#2104}
[02:08:28] TEACHER: and they load it in different place, right?   {#2105}
[02:08:31] TEACHER: This way they can balance.   {#2106}
[02:08:33] TEACHER: So for them,   {#2107}
[02:08:34] TEACHER: horizontally scaling a database is easy.   {#2108}
[02:08:36] TEACHER: They spin up a new physical server,   {#2109}
[02:08:37] TEACHER: take this logical partition,   {#2110}
[02:08:39] TEACHER: and move it there.   {#2111}
[02:08:40] TEACHER: Why is logical partition?   {#2112}
[02:08:41] TEACHER: Because now they can literally dump it very quickly   {#2113}
[02:08:44] TEACHER: and load it very quickly.   {#2114}
[02:08:46] TEACHER: If they were not having this logical partitions,   {#2115}
[02:08:48] TEACHER: they had to go through every single row and then extract the row   {#2116}
[02:08:50] TEACHER: that needs to be moved and then move it.   {#2117}
[02:08:52] TEACHER: Instead, they just create separate logical partitions,   {#2118}
[02:08:55] TEACHER: making their movement very easy.   {#2119}
[02:08:57] TEACHER: So this is what Instagram has as their structure.   {#2120}
[02:09:01] TEACHER: So they have 10 MySQL servers within each one of them,   {#2121}
[02:09:04] TEACHER: thousand, thousand, thousand MySQL databases,   {#2122}
[02:09:08] TEACHER: which is create database command that you fire,   {#2123}
[02:09:10] TEACHER: that are being created, which has logical partition   {#2124}
[02:09:12] TEACHER: and physical database server.   {#2125}
[02:09:13] TEACHER: Now this database shard ID that here we are talking about is this.   {#2126}
---- OWNED SEGMENTS END ----

CTX| [02:09:20] TEACHER: Right?   {#2127}
CTX| [02:09:20] TEACHER: They can be at max 2 raise to 13, which is 8192.   {#2128}
CTX| [02:09:24] TEACHER: And per shard sequence number like static count.   {#2129}
CTX| [02:09:26] TEACHER: But now what Instagram does is brilliant.   {#2130}
CTX| [02:09:29] TEACHER: What they do?   {#2131}
CTX| [02:09:30] TEACHER: They use stored procedures.   {#2132}
CTX| [02:09:32] TEACHER: Things we neglected in college PL, SQL, no one studied that.   {#2133}
CTX| [02:09:36] TEACHER: Stored procedures, what are they?   {#2134}
CTX| [02:09:37] TEACHER: We are not going to use it.   {#2135}
CTX| [02:09:38] TEACHER: We write raw SQL queries.   {#2136}
CTX| [02:09:39] TEACHER: What Instagram did is something really fancy, really basic.   {#2137}
CTX| [02:09:44] TEACHER: I did study this in college, but never thought it would be used in this way.   {#2138}
CTX| [02:09:49] TEACHER: PLSQL.   {#2139}
CTX| [02:09:50] TEACHER: I loved PLSQL, stored procedures and triggers and whatnot, but see how beautifully they're   {#2140}
CTX| [02:09:54] TEACHER: using it.   {#2141}
CTX| [02:09:56] TEACHER: So their photos table.   {#2142}
CTX| [02:09:58] TEACHER: So as I said, there are multiple physical servers in which there are logical partitions   {#2143}
CTX| [02:10:03] TEACHER: or logical databases that you're creating.   {#2144}
CTX| [02:10:06] TEACHER: Each database has same set of tables with same set of schemas.   {#2145}
CTX| [02:10:09] TEACHER: For each partition that it has table photos, it creates something like this.   {#2146}
CTX| [02:10:16] TEACHER: So create database Insta 5, create table Insta 5.photos.   {#2147}
