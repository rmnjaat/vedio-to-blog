# chunk_09  OWNS 01:35:48 -> 01:48:29  (segments #1746-#1987, 2205 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:34:51] TEACHER: what we got to know is because it is in-memory cache we have to ensure that we are using the   {#1730}
CTX| [01:34:57] TEACHER: minimum data, the bare minimum bytes to do anything.   {#1731}
CTX| [01:35:02] TEACHER: So if handling TTL also requires to store a lot of data, then it's futile because then   {#1732}
CTX| [01:35:08] TEACHER: you are spending a lot of, you are using a lot of data to do something which is not so   {#1733}
CTX| [01:35:12] TEACHER: critical.   {#1734}
CTX| [01:35:13] TEACHER: So which is where handling TTL also falls into that category.   {#1735}
CTX| [01:35:18] TEACHER: So how do you make your TTL consume less memory?   {#1736}
CTX| [01:35:22] TEACHER: So the idea is simple.   {#1737}
CTX| [01:35:23] TEACHER: First of all, we need to store absolute expiry for a particular key.   {#1738}
CTX| [01:35:29] TEACHER: Let's say I'm storing a key with a particular expiry.   {#1739}
CTX| [01:35:31] TEACHER: I have to store this information that is very minimum.   {#1740}
CTX| [01:35:33] TEACHER: So any expiration that you said will go into the object we discussed here.   {#1741}
CTX| [01:35:39] TEACHER: We have a large bids.   {#1742}
CTX| [01:35:40] TEACHER: We can have expiration as well set over here.   {#1743}
CTX| [01:35:42] TEACHER: Right?   {#1744}
CTX| [01:35:43] TEACHER: So when you are storing this, now the thing comes out that how do you clean that?   {#1745}

---- OWNED SEGMENTS START ----
[01:35:48] TEACHER: So first thing you might think I'll use priority queue for this, but priority queue, it's   {#1746}
[01:35:54] TEACHER: But you need additional data structure.   {#1747}
[01:35:56] TEACHER: So what do you do?   {#1748}
[01:35:57] TEACHER: In the second week, we spoke about sampling of keys, 20 keys and expirations, but that's   {#1749}
[01:36:03] TEACHER: not the only one.   {#1750}
[01:36:04] TEACHER: What we are doing is, as I said that time, I'm just re-editing it so that it fits into   {#1751}
[01:36:08] TEACHER: the context in order to make it lightweight and not use additional data structures like   {#1752}
[01:36:15] TEACHER: priority queue that requires a lot of pointers and all.   {#1753}
[01:36:18] TEACHER: We go with lazy deletion.   {#1754}
[01:36:20] TEACHER: first option lazy decision which means we don't delete we are doing TTL we are not doing efficient   {#1755}
[01:36:27] TEACHER: we are doing TTLs so if I access a key let's say user get a key when you went through the object you   {#1756}
[01:36:35] TEACHER: get at my value object in which you saw that uh expiration time the current time is more than   {#1757}
[01:36:41] TEACHER: expiration time which means a key is expired so then you delete the key how do you delete the key   {#1758}
[01:36:47] TEACHER: free call. Z free. Like Z malloc you'd have Z free that would do total size minus minus and free the   {#1759}
[01:36:51] TEACHER: object. Right? That way you would do lazy deletion. So in most cases most of your keys would be deleted   {#1760}
[01:36:59] TEACHER: with lazy deletion. They are able to do this because it is in memory you just have to invoke   {#1761}
[01:37:02] TEACHER: a free call. Nothing more than that. Right? So given this what happens is my life becomes very simple   {#1762}
[01:37:09] TEACHER: that most of the keys in cache that's how the cache works. You are very likely to access the key. If the   {#1763}
[01:37:15] TEACHER: key is deleted and you access it you are hard deleting them right but then there would be a key   {#1764}
[01:37:19] TEACHER: which are expired but never deleted that is where you do the sampling approach that we discuss in   {#1765}
[01:37:25] TEACHER: the second week so out of all the keys whose expiration is set you sample exactly 20 keys   {#1766}
[01:37:30] TEACHER: see how many of them are expired you delete those keys and re-iterate this process again and again   {#1767}
[01:37:36] TEACHER: until your sample has less than 25 percent of keys which are expired but not deleted this way   {#1768}
[01:37:45] TEACHER: memory leaks but it would not be permanently because eventually the keys would be deleted   {#1769}
[01:37:50] TEACHER: either by lazy deletion or by another resampling what happens right so this way you reduce   {#1770}
[01:37:58] TEACHER: the amount of data structures you need additional pointers additional memory you need to maintain   {#1771}
[01:38:04] TEACHER: these expensive data structures now this is very important and now we know in a very detailed   {#1772}
[01:38:10] TEACHER: manner why redis chose this plus this why lazy deletion because it helps them not to go for   {#1773}
[01:38:17] TEACHER: additional data structures redis does not have a priority implementation for it here if you look   {#1774}
[01:38:22] TEACHER: lazy deletion no data structure required correct sampling 20 keys and expiring no data structure   {#1775}
[01:38:28] TEACHER: required right so here you see how beautifully redis exploited the fact that it does not require   {#1776}
[01:38:35] TEACHER: additional data structures to implement ETN.   {#1777}
[01:38:39] TEACHER: Every single bit matters.   {#1778}
[01:38:41] TEACHER: This is how it gets.   {#1779}
[01:38:43] TEACHER: You can able to fit in large amount of data   {#1780}
[01:38:46] TEACHER: in short amount of RAM.   {#1781}
[01:38:48] TEACHER: It just does bare minimum it requests.   {#1782}
[01:38:52] TEACHER: Now, scaling is easy.   {#1783}
[01:38:55] TEACHER: Vertical scaling because we are just on single node.   {#1784}
[01:38:57] TEACHER: But you to handle large amount of request data at all.   {#1785}
[01:39:00] TEACHER: The only option is vertical scaling.   {#1786}
[01:39:02] TEACHER: You can't do more than that.   {#1787}
[01:39:05] TEACHER: This is what I want to spend a little more time.   {#1788}
[01:39:08] TEACHER: Concurrency because we are still talking about single load.   {#1789}
[01:39:11] TEACHER: So on that single load, how do you ensure when you have two people, two threads coming in,   {#1790}
[01:39:16] TEACHER: trying to update the same thing?   {#1791}
[01:39:17] TEACHER: It's a classic concurrency problem.   {#1792}
[01:39:19] TEACHER: So there are three ways to do it.   {#1793}
[01:39:22] TEACHER: Pessimistic locking, optimistic locking, single threadedness.   {#1794}
[01:39:27] TEACHER: Pessimistic locking is what we discussed in the second week with airline check-in example,   {#1795}
[01:39:30] TEACHER: where we wanted to do a critical operation   {#1796}
[01:39:34] TEACHER: which cannot be shared by multiple threads in parallel.   {#1797}
[01:39:38] TEACHER: So what we did, we wrapped it in locks.   {#1798}
[01:39:41] TEACHER: So because it's a critical update,   {#1799}
[01:39:43] TEACHER: people would have to take the lock before they move forward.   {#1800}
[01:39:46] TEACHER: So when two threads come together,   {#1801}
[01:39:48] TEACHER: one of them would go in while other waits.   {#1802}
[01:39:51] TEACHER: It's a single node machine.   {#1803}
[01:39:53] TEACHER: Thread coordinate with mutex as same offers.   {#1804}
[01:39:55] TEACHER: Pick your favorite to implement it.   {#1805}
[01:39:58] TEACHER: That is one way to do it.   {#1806}
[01:40:00] TEACHER: updates if that fits your well. Second way to do it is optimistic locking.   {#1807}
[01:40:05] TEACHER: Now, pessimistic locking we all have detailed understanding of it.   {#1808}
[01:40:08] TEACHER: In case you are unaware of mutex as a simupper, spend some time reading about it.   {#1809}
[01:40:13] TEACHER: And atomic variables to understand how this works.   {#1810}
[01:40:16] TEACHER: But take pointers from LH again example on how we waited while one moved forward and all.   {#1811}
[01:40:23] TEACHER: Pessimistic locking is pretty straightforward.   {#1812}
[01:40:24] TEACHER: Almost when you synchronize block in Java, this is what happens in there.   {#1813}
[01:40:28] TEACHER: But optimistic locking we never spend time on when we're discussing.   {#1814}
[01:40:31] TEACHER: Today I want to spend time on that.   {#1815}
[01:40:33] TEACHER: So this looks like a SQL statement, but this is more of semantics, but understand the context   {#1816}
[01:40:39] TEACHER: how they are doing it.   {#1817}
[01:40:40] TEACHER: So what optimistic locking says is optimistic locking says, I believe there is very less   {#1818}
[01:40:47] TEACHER: chance of concurrent accesses.   {#1819}
[01:40:49] TEACHER: So I won't proactively take a lot of locks.   {#1820}
[01:40:52] TEACHER: What I would do is if two threads are fired and they access the same thing at the same time,   {#1821}
[01:41:01] TEACHER: somehow I want to ensure that only one of them succeeds.   {#1822}
[01:41:05] TEACHER: So without taking explicit blocks, if I can ensure that only one of them succeeds, it's   {#1823}
[01:41:10] TEACHER: a win for me.   {#1824}
[01:41:11] TEACHER: A way to do this is doing something like this.   {#1825}
[01:41:16] TEACHER: Instead of just saying update a equal to 20, I say update a equal to 20 where a equal to   {#1826}
[01:41:20] TEACHER: 10.   {#1827}
[01:41:22] TEACHER: a semantic, I'm just making you understand how to implement.   {#1828}
[01:41:25] TEACHER: We'll talk about it.   {#1829}
[01:41:26] TEACHER: But the idea is the reason of just firing update a equal to 20 and a equal to 30.   {#1830}
[01:41:31] TEACHER: I say update a equal to 20 where my past value is 10 and update a equal to 30 when   {#1831}
[01:41:36] TEACHER: my past value is 10, when both of these fire at the same time, what would happen?   {#1832}
[01:41:42] TEACHER: One of them would succeed while other would fail because when one of them succeeds, what   {#1833}
[01:41:47] TEACHER: happens?   {#1834}
[01:41:47] TEACHER: The value is set to 20 and when the next one runs, it says, Oh.   {#1835}
[01:41:52] TEACHER: So a equal to 30 where a equal to 10, but the current value is 20.   {#1836}
[01:41:55] TEACHER: So this update would lead to nothing.   {#1837}
[01:41:57] TEACHER: So one of only one of this will succeed.   {#1838}
[01:42:00] TEACHER: This is optimistic logging.   {#1839}
[01:42:03] TEACHER: You are being optimistic that you don't need logs.   {#1840}
[01:42:06] TEACHER: Right.   {#1841}
[01:42:06] TEACHER: Now, how do you implement it?   {#1842}
[01:42:08] TEACHER: A way to implement this is you need this to be an atomic update.   {#1843}
[01:42:13] TEACHER: Atomic update implies that while this is running, nothing else can run.   {#1844}
[01:42:18] TEACHER: How do you do that?   {#1845}
[01:42:19] TEACHER: there is a standard instruction called compare and swap every single language has an implementation   {#1846}
[01:42:25] TEACHER: of it it uses native cpu instructions to implement it's done at cpu level it gives a very nice wrapper   {#1847}
[01:42:32] TEACHER: over it so compare and swap is the way to do so this is exactly what compare and swap is so here   {#1848}
[01:42:37] TEACHER: what you do you say i want to compare i want to change a to 20 when my current value is 10   {#1849}
[01:42:47] TEACHER: so it would do this exact thing that i said it would check if a is 10 then only it would make it   {#1850}
[01:42:53] TEACHER: 20 and similarly it would do a to 30 when it is 10 this is what you would pass in compare and swap   {#1851}
[01:42:58] TEACHER: so it's a function it's a standard function that you will find in every language go has atomic   {#1852}
[01:43:02] TEACHER: library c plus was had a bicell boost library has its implementation it all refers to that   {#1853}
[01:43:07] TEACHER: operating system implementation if your processor arm chipset or intel amd whichever you are using   {#1854}
[01:43:14] TEACHER: if it provides you   {#1855}
[01:43:17] TEACHER: component swap instruction, your compiler   {#1856}
[01:43:19] TEACHER: would leverage that while it is converting   {#1857}
[01:43:21] TEACHER: it into bytecode.   {#1858}
[01:43:23] TEACHER: And it would do this.   {#1859}
[01:43:24] TEACHER: So component swap is the best way to implement   {#1860}
[01:43:27] TEACHER: optimistic log.   {#1861}
[01:43:28] TEACHER: Because this instruction is atomic.   {#1862}
[01:43:31] TEACHER: So while one is running, no one else   {#1863}
[01:43:33] TEACHER: can run. Your operating system does not do   {#1864}
[01:43:35] TEACHER: context switch while this instruction is running.   {#1865}
[01:43:36] TEACHER: So no worries in that.   {#1866}
[01:43:38] TEACHER: But this is very beautiful when you do it.   {#1867}
[01:43:41] TEACHER: Highly recommend you to   {#1868}
[01:43:43] TEACHER: think about it.   {#1869}
[01:43:44] TEACHER: Implement, write a simple optimistic locking thing.   {#1870}
[01:43:48] TEACHER: Right.   {#1871}
[01:43:48] TEACHER: It's very easy.   {#1872}
[01:43:49] TEACHER: Just play around with comparison and you'll understand how things are.   {#1873}
[01:43:52] TEACHER: Right.   {#1874}
[01:43:53] TEACHER: Okay.   {#1875}
[01:43:55] TEACHER: It's fine.   {#1876}
[01:43:56] TEACHER: We'll skip this.   {#1877}
[01:43:57] TEACHER: Don't need this.   {#1878}
[01:43:57] TEACHER: We went very detailed in it.   {#1879}
[01:43:59] TEACHER: I'm just probing you all and think on different directions.   {#1880}
[01:44:01] TEACHER: Right.   {#1881}
[01:44:02] TEACHER: But now, implement comparison.   {#1882}
[01:44:04] TEACHER: Right.   {#1883}
[01:44:05] TEACHER: Now, the third part, single threaded test.   {#1884}
[01:44:09] TEACHER: Right.   {#1885}
[01:44:09] TEACHER: So we talk about handling concurrency, pessimistic locking.   {#1886}
[01:44:12] TEACHER: We understand optimistic locking.   {#1887}
[01:44:14] TEACHER: is why do you need concurrency when you can make things single threaded?   {#1888}
[01:44:18] TEACHER: The problem arises in this case because we are having multiple threads that can   {#1889}
[01:44:23] TEACHER: be scheduled at the same time, can run in parallel.   {#1890}
[01:44:27] TEACHER: What if I don't support threads at all?   {#1891}
[01:44:30] TEACHER: This is what Redis did.   {#1892}
[01:44:32] TEACHER: In case you want to understand single threadedness, I have a video on it,   {#1893}
[01:44:35] TEACHER: a free video and a detailed one in my Redis course, but a free video itself   {#1894}
[01:44:38] TEACHER: covers some parts of it that would make you understand how single threaded   {#1895}
[01:44:44] TEACHER: YouTube and Redis internal playlist that I have, but want to dive deep into Redis?   {#1896}
[01:44:49] TEACHER: I have that course.   {#1897}
[01:44:49] TEACHER: It's not a plug.   {#1898}
[01:44:50] TEACHER: It's just a point.   {#1899}
[01:44:51] TEACHER: I'm trying to make you all very curious about things, right?   {#1900}
[01:44:54] TEACHER: And how engineer, how brilliant engineers, this folks who built this amazing stuff, they're   {#1901}
[01:44:59] TEACHER: thinking about it.   {#1902}
[01:45:01] TEACHER: They're challenging.   {#1903}
[01:45:01] TEACHER: If you look carefully, they challenged every single decision that what if we take logs?   {#1904}
[01:45:07] TEACHER: What if I don't want to take logs and do it with atomic inspection?   {#1905}
[01:45:10] TEACHER: What if I don't need logs at all?   {#1906}
[01:45:11] TEACHER: I make three single threaded.   {#1907}
[01:45:12] TEACHER: So they just challenged everything that they've faced.   {#1908}
[01:45:16] TEACHER: Right.   {#1909}
[01:45:17] TEACHER: And this is all about low level implementation details of cash.   {#1910}
[01:45:22] TEACHER: Right.   {#1911}
[01:45:23] TEACHER: Okay.   {#1912}
[01:45:24] TEACHER: We'll take questions for five minutes.   {#1913}
[01:45:25] TEACHER: Then we go on a break.   {#1914}
[01:45:26] TEACHER: And then we come back.   {#1915}
[01:45:27] TEACHER: We discuss high level part of it.   {#1916}
[01:45:28] TEACHER: Right.   {#1917}
[01:45:29] TEACHER: Nitin, go on.   {#1918}
[01:45:31] STUDENT_2: Arif, earlier we were discussing about the low level implementation of LRU and LFU.   {#1919}
[01:45:37] STUDENT_2: I think we like digressed on that topic.   {#1920}
[01:45:43] TEACHER: those LRU bits, 28 LRU bits.   {#1921}
[01:45:47] TEACHER: I cannot talk about it.   {#1922}
[01:45:48] TEACHER: It's very deep, very deep.   {#1923}
[01:45:50] TEACHER: It's covered in the Redis internals course.   {#1924}
[01:45:52] TEACHER: I cannot talk about it because it would itself cover two hours of time.   {#1925}
[01:45:57] TEACHER: It's that deep.   {#1926}
[01:45:59] STUDENT_2: So not about Redis implementation, just a high level implementation,   {#1927}
[01:46:03] STUDENT_2: like keeping the memory constraint in mind.   {#1928}
[01:46:08] STUDENT_2: How will we design the LRU and LFU?   {#1929}
[01:46:11] TEACHER: You cannot do that.   {#1930}
[01:46:12] TEACHER: That's what I covered there.   {#1931}
[01:46:14] TEACHER: Right.   {#1932}
[01:46:14] TEACHER: That's what I covered there.   {#1933}
[01:46:15] TEACHER: It's very deep implementation.   {#1934}
[01:46:17] TEACHER: Right.   {#1935}
[01:46:17] TEACHER: So that's why go with random.   {#1936}
[01:46:20] TEACHER: That's very low on memory.   {#1937}
[01:46:22] TEACHER: You don't need any additional data.   {#1938}
[01:46:23] TEACHER: You are just risking it with an important key might be deleted.   {#1939}
[01:46:27] TEACHER: That's it.   {#1940}
[01:46:29] STUDENT_2: Right.   {#1941}
[01:46:32] STUDENT_2: One of the, uh, created that you shared that implementing big O of one, uh,   {#1942}
[01:46:38] STUDENT_2: with, I mean, time complexity of LFU.   {#1943}
[01:46:40] STUDENT_2: Yeah.   {#1944}
[01:46:42] STUDENT_2: a very high memory consumption.   {#1945}
[01:46:44] TEACHER: Exactly.   {#1946}
[01:46:46] TEACHER: But then you see that thing, right?   {#1947}
[01:46:47] TEACHER: When you want better time, you're giving up on space.   {#1948}
[01:46:52] STUDENT_3: Okay.   {#1949}
[01:46:53] TEACHER: Right.   {#1950}
[01:46:54] TEACHER: But it's not that, which is why people don't use it.   {#1951}
[01:46:57] TEACHER: Right.   {#1952}
[01:46:57] TEACHER: When you, when you are constrained by the space, then you have to, you, then you have to trade   {#1953}
[01:47:03] TEACHER: it off by time.   {#1954}
[01:47:04] TEACHER: Right.   {#1955}
[01:47:04] TEACHER: So you take higher time to lay, you take longer to do that.   {#1956}
[01:47:08] TEACHER: Exactly.   {#1957}
[01:47:10] STUDENT_2: Okay.   {#1958}
[01:47:12] STUDENT_2: uh so uh next question i mean in terms of a single threadedness implementation   {#1959}
[01:47:18] STUDENT_2: of our distributed cache uh so let's say we adopted that approach okay and uh there are two   {#1960}
[01:47:28] STUDENT_2: there are two servers which are communicating via my cache system and they they both want to   {#1961}
[01:47:35] STUDENT_2: read or update different   {#1962}
[01:47:38] STUDENT_2: data, different   {#1963}
[01:47:39] STUDENT_2: keys, okay, then   {#1964}
[01:47:42] STUDENT_2: over here, our system   {#1965}
[01:47:43] STUDENT_2: will be underperforming, right?   {#1966}
[01:47:45] TEACHER: No, it does not. That's what the magic   {#1967}
[01:47:47] TEACHER: is. Single-threaded systems, they are not   {#1968}
[01:47:49] TEACHER: blocked.   {#1969}
[01:47:51] TEACHER: Basically, watch that video.   {#1970}
[01:47:53] TEACHER: In my Redis internal series, watch that video.   {#1971}
[01:47:55] TEACHER: The first three videos that I put out for free,   {#1972}
[01:47:58] TEACHER: watch that video. You will understand whatever.   {#1973}
[01:48:00] TEACHER: It is not blocking.   {#1974}
[01:48:01] TEACHER: That's how concurrent systems are built.   {#1975}
[01:48:05] STUDENT_2: Got it.   {#1976}
[01:48:06] TEACHER: Can I ask a question regarding consistent hashing?   {#1977}
[01:48:09] TEACHER: And then we are yet to cover that.   {#1978}
[01:48:11] TEACHER: Okay.   {#1979}
[01:48:12] TEACHER: That's a huge discussion that is coming up.   {#1980}
[01:48:14] TEACHER: That's high level part.   {#1981}
[01:48:15] TEACHER: We'll talk about it after the.   {#1982}
[01:48:18] STUDENT_6: Got it.   {#1983}
[01:48:18] STUDENT_6: Yeah.   {#1984}
[01:48:19] STUDENT_6: Got it.   {#1985}
[01:48:20] STUDENT_6: Hey, can you please go back to the slide where we talked about sizes, computing sizes of   {#1986}
[01:48:25] STUDENT_6: the hash table.   {#1987}
---- OWNED SEGMENTS END ----

CTX| [01:48:29] STUDENT_6: Over there, we were still calculating the size of actual structure and not the.   {#1988}
CTX| [01:48:35] TEACHER: value of node.   {#1989}
CTX| [01:48:36] TEACHER: No, but value of node great point.   {#1990}
CTX| [01:48:38] TEACHER: But this node is also you are allocating it, right?   {#1991}
CTX| [01:48:41] TEACHER: Let's say this is Bloom filter.   {#1992}
CTX| [01:48:42] TEACHER: You're allocating Bloom filter.   {#1993}
CTX| [01:48:44] TEACHER: So you see my lock while you're allocating the Bloom filter as well.   {#1994}
CTX| [01:48:49] STUDENT_6: No, but what Nalloc accepts is the size of the structure.   {#1995}
CTX| [01:48:52] STUDENT_6: My value itself, right?   {#1996}
CTX| [01:48:54] TEACHER: No, but Bloom filter is also a structure, right?   {#1997}
CTX| [01:48:58] TEACHER: Let's say you are storing Bloom filter.   {#1998}
CTX| [01:49:00] TEACHER: How will you allocate a Bloom filter?   {#1999}
CTX| [01:49:04] TEACHER: The actual value, this is also value you need to allocate this.   {#2000}
CTX| [01:49:07] TEACHER: Right.   {#2001}
CTX| [01:49:10] TEACHER: You would allocate that as well.   {#2002}
CTX| [01:49:13] TEACHER: Let's say you're doing a set allocation.   {#2003}
CTX| [01:49:15] TEACHER: So you create a set, not my value.   {#2004}
CTX| [01:49:18] TEACHER: My value is just a wrapper.   {#2005}
CTX| [01:49:19] TEACHER: So every single thing that you're allocating, you're wrapping it over here.   {#2006}
CTX| [01:49:24] TEACHER: So you are not, instead of invoking only malloc, you're invoking Z malloc for every allocation,   {#2007}
