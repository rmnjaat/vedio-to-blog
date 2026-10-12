# chunk_11  OWNS 02:02:46 -> 02:14:38  (segments #1954-#2125, 2009 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:01:47] STUDENT_1: there is a case like there is a case like uh when like when he's running put query he's   {#1933}
CTX| [02:01:55] STUDENT_1: accidentally updating the value which does not need to be should not be updated let's just say   {#1934}
CTX| [02:02:01] STUDENT_1: transaction ID and the whatever value it holds.   {#1935}
CTX| [02:02:05] STUDENT_1: Okay.   {#1936}
CTX| [02:02:06] TEACHER: So why would that even happen?   {#1937}
CTX| [02:02:09] STUDENT_1: Like you're firing Upsert.   {#1938}
CTX| [02:02:11] TEACHER: You anyway have to support Upsert for high throughput.   {#1939}
CTX| [02:02:13] TEACHER: Why would you fire a random insert in your database?   {#1940}
CTX| [02:02:17] STUDENT_1: No, let's just say like there was...   {#1941}
CTX| [02:02:20] TEACHER: That's very specific use case, Rahul.   {#1942}
CTX| [02:02:22] TEACHER: Let's take it at the end.   {#1943}
CTX| [02:02:23] TEACHER: It's very extremely specific use case that you're talking about.   {#1944}
CTX| [02:02:26] TEACHER: Right.   {#1945}
CTX| [02:02:26] TEACHER: And in most cases, if it's human error, the team lead should be sacked.   {#1946}
CTX| [02:02:31] TEACHER: simple as that, right? They should do   {#1947}
CTX| [02:02:33] TEACHER: very thorough reviews of every single thing   {#1948}
CTX| [02:02:35] TEACHER: that they are doing. UB should not   {#1949}
CTX| [02:02:37] TEACHER: operate on such things as simple   {#1950}
CTX| [02:02:39] TEACHER: as that unless it's thoroughly verified.   {#1951}
CTX| [02:02:42] TEACHER: But I'm happy to   {#1952}
CTX| [02:02:43] TEACHER: take it at the end.   {#1953}

---- OWNED SEGMENTS START ----
[02:02:46] TEACHER: Let me basically cover   {#1954}
[02:02:47] TEACHER: a few of these details. I still   {#1955}
[02:02:49] TEACHER: have a bunch of things to cover in this.   {#1956}
[02:02:51] TEACHER: We are still here to touch upon high level and make it distributed   {#1957}
[02:02:53] TEACHER: and how Redis does that.   {#1958}
[02:02:55] TEACHER: I just want to spend more time   {#1959}
[02:02:57] TEACHER: on explaining that. So that's why.   {#1960}
[02:02:59] TEACHER: Just bear with me for next   {#1961}
[02:03:01] TEACHER: 10-15 minutes okay so what we do with this is we start with a simple mysql with storage we start a   {#1962}
[02:03:09] TEACHER: single load no don't think about distributed on day zero it's that simple and then think about   {#1963}
[02:03:14] TEACHER: distribute first cover all the devils sort it out make things forward and then scale so we add a   {#1964}
[02:03:20] TEACHER: simple schema called store we have key we have value we store the ptl we store is deleted like   {#1965}
[02:03:25] TEACHER: this comes so naturally to us that hey we store the absolute expiration time and we store soft   {#1966}
[02:03:29] TEACHER: built it but when we do this let's think about storage do we really need every single column   {#1967}
[02:03:35] TEACHER: that we added we are habituated and i'm not even kidding we are habituated into having an id column   {#1968}
[02:03:42] TEACHER: auto increment for some reason people are obsessed by it and i know why orms orm sucks i hate them   {#1969}
[02:03:49] TEACHER: but people are having because orms because id column makes orm slight simple so they have to do   {#1970}
[02:03:55] TEACHER: it and but you don't really always need id column but in case you need it you add it so you add key   {#1971}
[02:04:03] TEACHER: you add value you add ttl now here instead of doing soft delete having a separate column you   {#1972}
[02:04:09] TEACHER: use a special value minus one in expiration in ttl in the absolute expiration time that solves   {#1973}
[02:04:15] TEACHER: that problem for you so this way you save space by not having that extra column and you make your   {#1974}
[02:04:21] TEACHER: hard delete simpler so now what you do whenever someone deletes it your delete is actually an   {#1975}
[02:04:27] TEACHER: update and then you have a periodic job that deletes that just batches it and deletes it   {#1976}
[02:04:32] TEACHER: this is where your database has to do minimal b plus 3 rebalancing makes our life simple right   {#1977}
[02:04:38] TEACHER: okay now inserting a new key here or doing a put operation you expect when same key is put twice   {#1978}
[02:04:46] TEACHER: the second value replaces the first which means you are inserting a new value cannot be an insert   {#1979}
[02:04:51] TEACHER: it has to be an absurd because instead of getting the value and putting it and like getting a value   {#1980}
[02:04:56] TEACHER: that is inserting or updating is pathetic right it would slow down your system by a massive barge   {#1981}
[02:05:02] TEACHER: so that's not what you do is depending on the database you pick that so you typically write   {#1982}
[02:05:07] TEACHER: insert into store values replace insert with replace that is absurd in my sql and replace   {#1983}
[02:05:14] TEACHER: insert with absurd that is absurd in postgres depending on which database you are picking   {#1984}
[02:05:18] TEACHER: you would either use insert into   {#1985}
[02:05:20] TEACHER: or absurd set   {#1986}
[02:05:22] TEACHER: because you want absurds there.   {#1987}
[02:05:25] TEACHER: Then   {#1988}
[02:05:26] TEACHER: when you are having multiple put requests   {#1989}
[02:05:28] TEACHER: you are doing it, locks that we just studied   {#1990}
[02:05:30] TEACHER: if you are having to support that   {#1991}
[02:05:32] TEACHER: you do something like this or play with   {#1992}
[02:05:35] TEACHER: isolation.   {#1993}
[02:05:36] TEACHER: This way handling multiple concurrent   {#1994}
[02:05:38] TEACHER: put requests because SQL database already   {#1995}
[02:05:40] TEACHER: gives you these guarantees   {#1996}
[02:05:42] TEACHER: you can just leverage them. You don't have to   {#1997}
[02:05:44] TEACHER: reimplement a bunch of stuff.   {#1998}
[02:05:46] TEACHER: So if you need it   {#1999}
[02:05:48] TEACHER: just take exclusive log for update no wait because i don't want to wait i just want to kill myself   {#2000}
[02:05:55] TEACHER: in case someone else is updating it hypothetically hypothetically there is no right way to do it it   {#2001}
[02:06:00] TEACHER: depends on the guarantees that you want your database to provide i say i use no wait just   {#2002}
[02:06:06] TEACHER: for fancy right but there's no specific reason depending on when you're designing a database   {#2003}
[02:06:12] TEACHER: is what kind of guarantees you want to provide.   {#2004}
[02:06:15] TEACHER: That would determine what you put over here.   {#2005}
[02:06:19] TEACHER: Would you put skip log?   {#2006}
[02:06:20] TEACHER: Would you put no wait?   {#2007}
[02:06:21] TEACHER: Would you not put anything and just keep on waiting stuff?   {#2008}
[02:06:25] TEACHER: And then you do an update whatever you want to do.   {#2009}
[02:06:28] TEACHER: Okay.   {#2010}
[02:06:29] TEACHER: Now talking about TTL.   {#2011}
[02:06:31] TEACHER: TTL, we'll talk about multiple approaches.   {#2012}
[02:06:33] TEACHER: First one, batch, cron job, straightforward,   {#2013}
[02:06:36] TEACHER: and then we'll talk about how Redis does it.   {#2014}
[02:06:38] TEACHER: Very interesting algorithm.   {#2015}
[02:06:39] TEACHER: So approach one, we do batch deletion with cron job.   {#2016}
[02:06:43] TEACHER: So every 10 minutes we trigger a hard deletion that fires a query that looks something like   {#2017}
[02:06:50] TEACHER: this.   {#2018}
[02:06:50] TEACHER: Select start from store where key equal to k.   {#2019}
[02:06:53] TEACHER: Oh, sorry.   {#2020}
[02:06:54] TEACHER: Oh, sorry.   {#2021}
[02:06:55] TEACHER: It would just do hard delete where we would just fire delete queries, delete from table   {#2022}
[02:07:00] TEACHER: and deleting it.   {#2023}
[02:07:01] TEACHER: Right.   {#2024}
[02:07:01] TEACHER: So delete from table where expired at is less than now.   {#2025}
[02:07:07] TEACHER: and it would do that hard delete for you.   {#2026}
[02:07:09] TEACHER: But now here what would happen is a case   {#2027}
[02:07:13] TEACHER: where before the next hard deletion job ran,   {#2028}
[02:07:17] TEACHER: what if you read it over here?   {#2029}
[02:07:20] TEACHER: The key would still be existing.   {#2030}
[02:07:21] TEACHER: So your get needs to be handled.   {#2031}
[02:07:24] TEACHER: So you're getting a key should not be as simple   {#2032}
[02:07:26] TEACHER: as select start from store where key equal to k.   {#2033}
[02:07:29] TEACHER: It should be select start from store where key equal to k   {#2034}
[02:07:32] TEACHER: and expired at our TTL is greater than now.   {#2035}
[02:07:35] TEACHER: So this way, what we get is, we get this beautiful thing where we save an expensive network IO by not having to move the value to the user and filtering it out there.   {#2036}
[02:07:47] TEACHER: It saves the network bandwidth of the server.   {#2037}
[02:07:49] TEACHER: It saves the network bandwidth of the database.   {#2038}
[02:07:51] TEACHER: It saves the disk IO time that your database spent to read that humongous value.   {#2039}
[02:07:57] TEACHER: All of that is saved.   {#2040}
[02:07:58] TEACHER: And this micro-optimizations make your database far more proper.   {#2041}
[02:08:02] TEACHER: right okay this is about disk waste now again if if i was doing an in-memory database not   {#2042}
[02:08:12] TEACHER: disk waste database in-memory database warning i'm re-hydrating if it was in-memory then you   {#2043}
[02:08:19] TEACHER: could do lazy deletions now what is lazy deletion and almost all in-memory databases do that   {#2044}
[02:08:27] TEACHER: Here, in this case, we were going to DB and fetching it, but with in-memory database where   {#2045}
[02:08:34] TEACHER: your data resides in memory.   {#2046}
[02:08:35] TEACHER: For example, Redis, right?   {#2047}
[02:08:37] TEACHER: When you fire a request to Redis, that key, if a key that is get or accessed, if Redis   {#2048}
[02:08:46] TEACHER: finds it to be expired, it immediately deletes it.   {#2049}
[02:08:52] TEACHER: Redis does not have to rebalance the binary tree and what are.   {#2050}
[02:08:56] TEACHER: hash table right because it is in memory you can very quickly there and then you can delete the key   {#2051}
[02:09:03] TEACHER: how by firing a delete delete as in your malloc delete while i delete right you malloc you free   {#2052}
[02:09:10] TEACHER: stop right so malloc free new delete c c plus plus that so here what would happen is you can   {#2053}
[02:09:16] TEACHER: literally delete a key from the hash table without having to pay any network io penalty this way   {#2054}
[02:09:23] TEACHER: What you get is when someone accesses, let's say a user accesses a particular key in Redis,   {#2055}
[02:09:32] TEACHER: Redis checked its in-memory hash table, found that key to be expired,   {#2056}
[02:09:36] TEACHER: it immediately deletes that particular key from there.   {#2057}
[02:09:42] TEACHER: This is called lazy deletion.   {#2058}
[02:09:44] TEACHER: So it may not have to proactively go and delete it.   {#2059}
[02:09:47] TEACHER: If it found the side to be expired, it can immediately delete it.   {#2060}
[02:09:53] TEACHER: for on disk database i'm iterating it 100 times not for on disk database because it would make   {#2061}
[02:09:58] TEACHER: things really slow for that right because every micro delete operations requires rebalancing of   {#2062}
[02:10:04] TEACHER: b plus three pathetically slow so that's why you do batch deletion when you are on disk when you   {#2063}
[02:10:10] TEACHER: are in memory you can do pointed deletions or staggered deletions right okay so redis does this   {#2064}
[02:10:17] TEACHER: By the way, Redis does lazy deletion.   {#2065}
[02:10:20] TEACHER: So if you have a key in Redis and that key has some TTL set,   {#2066}
[02:10:25] TEACHER: Redis has a, not a thread, but a kind of, kind of a synchronicity.   {#2067}
[02:10:31] TEACHER: I cannot reveal the details because I cover it in my course, but still,   {#2068}
[02:10:35] TEACHER: and obviously it's out of scope for this.   {#2069}
[02:10:37] TEACHER: Redis has a kind of thread, assume it as a thread that when it runs this part,   {#2070}
[02:10:45] TEACHER: before it runs this part what if someone get that particular key that key would still be there in   {#2071}
[02:10:49] TEACHER: the hash table when the key is there in the hash table and it wants to it's accessing that it cannot   {#2072}
[02:10:54] TEACHER: return that key to the user so it tells to the user that key does not exist but because it found   {#2073}
[02:11:01] TEACHER: the key that is expired it goes out and deletes the key right there and then because it doesn't   {#2074}
[02:11:06] TEACHER: have to restructure it's not an expensive operation for it is it can just delete it right there okay   {#2075}
[02:11:11] TEACHER: Okay. So now what about the keys that I never accessed?   {#2076}
[02:11:15] TEACHER: Because what if I do not have this job that deletes it, right?   {#2077}
[02:11:22] TEACHER: I took an approach of doing just lazy deletion.   {#2078}
[02:11:25] TEACHER: That's it.   {#2079}
[02:11:25] TEACHER: Which means I have my in-memory database like Redis.   {#2080}
[02:11:29] TEACHER: And now what my Redis says is I would delete a key, hard delete a key.   {#2081}
[02:11:35] TEACHER: Either when user tells me to hard delete a key.   {#2082}
[02:11:37] TEACHER: Second, if I access a key that is expired but not deleted yet.   {#2083}
[02:11:44] TEACHER: That is where lazy deletion comes in.   {#2084}
[02:11:46] TEACHER: Now what Redis does as part of this regular job is that it does not do hard deletes of   {#2085}
[02:11:56] TEACHER: all the keys.   {#2086}
[02:11:57] TEACHER: Now this is where a bit of Redis internals kicks in.   {#2087}
[02:12:00] TEACHER: So now this is a very beautiful algorithm.   {#2088}
[02:12:03] TEACHER: Very simple.   {#2089}
[02:12:04] TEACHER: Uses math a bit.   {#2090}
[02:12:05] TEACHER: you cannot run away from math fii but you need to know how redis does it so what redis does   {#2091}
[02:12:12] TEACHER: internally it takes up two approaches and merges it so you may think that this approach is great   {#2092}
[02:12:22] TEACHER: it runs periodically does this deletion natural way to think of it is when i'm running this   {#2093}
[02:12:29] TEACHER: particular job at every periodic interval, I will delete all the keys that are expired,   {#2094}
[02:12:37] TEACHER: but not yet deleted. Correct. If you do that, then it takes up, let's say there are millions   {#2095}
[02:12:43] TEACHER: of keys like that. It takes up a lot of time to delete those large number of keys. Right.   {#2096}
[02:12:50] TEACHER: So what Redis says is I would do lazy deletion. With lazy deletion, if someone accesses a key   {#2097}
[02:13:00] TEACHER: I would delete that key immediately.   {#2098}
[02:13:02] TEACHER: So that solves 90% of the problem.   {#2099}
[02:13:05] TEACHER: Because there is very high chance   {#2100}
[02:13:06] TEACHER: you are accessing a key that is expired.   {#2101}
[02:13:08] TEACHER: You are hard deleting it.   {#2102}
[02:13:10] TEACHER: So you are anyway freeing up the memory.   {#2103}
[02:13:15] TEACHER: That is one.   {#2104}
[02:13:16] TEACHER: But now this leads us to an edge case   {#2105}
[02:13:19] TEACHER: where what we are stuck with   {#2106}
[02:13:21] TEACHER: is what if a key is expired but never accessed.   {#2107}
[02:13:25] TEACHER: So which means we have to rely on a job like this.   {#2108}
[02:13:29] TEACHER: What does this regular periodic job does in case of Redis?   {#2109}
[02:13:32] TEACHER: Not our database, but I'm just leveraging this to discuss a bit of Redis interface.   {#2110}
[02:13:37] TEACHER: So what Redis does is it does not delete all the expired keys.   {#2111}
[02:13:42] TEACHER: It samples and then deletes some of them.   {#2112}
[02:13:46] TEACHER: So the idea is again, not suitable for disk based database only for in-memory database   {#2113}
[02:13:51] TEACHER: you can do this.   {#2114}
[02:13:52] TEACHER: So what Redis does in this periodic jobs that we just spoke about in periodic job, Redis   {#2115}
[02:13:59] TEACHER: samples exactly 20 keys that has some expiration set.   {#2116}
[02:14:04] TEACHER: So out of all the keys that are there in Redis, it samples randomly picks 20 keys.   {#2117}
[02:14:09] TEACHER: Out of those 20 keys, it sees how many of them are expired.   {#2118}
[02:14:14] TEACHER: It first deletes all the keys that are expired from that sample.   {#2119}
[02:14:18] TEACHER: It will be out of this 20.   {#2120}
[02:14:20] TEACHER: All the keys that are expired, it deletes that.   {#2121}
[02:14:23] TEACHER: It sees that if the number of deleted keys from the sample are more than 25%.   {#2122}
[02:14:32] TEACHER: Then you repeat the process.   {#2123}
[02:14:34] TEACHER: So which means.   {#2124}
[02:14:35] TEACHER: Now here a bit of statistics comes in.   {#2125}
---- OWNED SEGMENTS END ----

CTX| [02:14:38] TEACHER: Population is what you have your entire Redis key set.   {#2126}
CTX| [02:14:42] TEACHER: With some expiration set.   {#2127}
CTX| [02:14:44] TEACHER: If you randomly pick 20 out of it.   {#2128}
CTX| [02:14:48] TEACHER: This is a sample.   {#2129}
CTX| [02:14:50] TEACHER: the distribution of population and distribution of sample so sample should be representative   {#2130}
CTX| [02:14:56] TEACHER: of population that's a normal statistical concept right that if you randomly sample something   {#2131}
CTX| [02:15:01] TEACHER: it would represent the distribution of your population right so you pick 20 keys at random   {#2132}
CTX| [02:15:08] TEACHER: so if out of this 20 keys let's say 50 percent of keys are expired which means that in your   {#2133}
CTX| [02:15:15] TEACHER: population there would be roughly 50% of keys that are expired right so what redis does is it   {#2134}
CTX| [02:15:22] TEACHER: instead of saying i would go ahead and delete all of them it's take this sample sees if in this   {#2135}
CTX| [02:15:28] TEACHER: sample there are how many keys are expired if it is less than 25 it stops the process if it is more   {#2136}
CTX| [02:15:33] TEACHER: than 25 it repeats this process continuously so this is what it ensures is that it does not have   {#2137}
