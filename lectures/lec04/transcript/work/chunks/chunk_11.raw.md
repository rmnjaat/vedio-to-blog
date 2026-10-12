# chunk_11  OWNS 01:59:17 -> 02:10:48  (segments #1858-#2061, 2013 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:58:22] TEACHER: From 20 bytes to four bytes massive space gain, right?   {#1851}
CTX| [01:58:26] TEACHER: Daytime has become performance.   {#1852}
CTX| [01:58:28] STUDENT_1: So this is efficient, optimal, lightweight, but not at all readable.   {#1853}
CTX| [01:58:36] STUDENT_1: Looking at this number, you cannot tell what time is this.   {#1854}
CTX| [01:58:38] STUDENT_1: Correct?   {#1855}
CTX| [01:58:39] STUDENT_1: So looking at this, you cannot tell what.   {#1856}
CTX| [01:58:44] STUDENT_9: right just a minute my battery went off   {#1857}

---- OWNED SEGMENTS START ----
[01:59:17] STUDENT_9: Let me check on the mic in this.   {#1858}
[01:59:24] TEACHER: Got it.   {#1859}
[01:59:25] TEACHER: Okay.   {#1860}
[01:59:27] TEACHER: So the first option that we had was date time was very readable.   {#1861}
[01:59:31] STUDENT_1: Looking at this, you can exactly tell what date, what time, what, what, what the date   {#1862}
[01:59:36] STUDENT_1: I was looking at this number.   {#1863}
[01:59:38] STUDENT_1: You cannot tell what that was.   {#1864}
[01:59:39] STUDENT_1: Right?   {#1865}
[01:59:41] STUDENT_1: Readability, but it gives you performance.   {#1866}
[01:59:43] STUDENT_1: It is very lightweight on index.   {#1867}
[01:59:44] STUDENT_1: It's just integer comparizer.   {#1868}
[01:59:46] STUDENT_1: So reading this, you are just reading an integer and comparing it.   {#1869}
[01:59:49] STUDENT_1: Most efficient operation for your database, for your desk, for everything, for your computer   {#1870}
[01:59:54] STUDENT_1: in general.   {#1871}
[01:59:55] STUDENT_1: Reading this, you have to create a complex object having multiple attributes and then   {#1872}
[01:59:58] STUDENT_1: you do comparison.   {#1873}
[01:59:59] STUDENT_1: So this is extremely lightweight, extremely optimal, all things good, but it takes away   {#1874}
[02:00:03] STUDENT_1: readability, right?   {#1875}
[02:00:04] TEACHER: But a lot of people choose to store date time as epoch integers in integer columns, right?   {#1876}
[02:00:09] TEACHER: Because you get a lot of benefits out of it.   {#1877}
[02:00:11] TEACHER: Now there is a third way where what if you relax some constants, you need readability,   {#1878}
[02:00:17] TEACHER: but then you also need performance.   {#1879}
[02:00:20] TEACHER: So this is very specific to a company.   {#1880}
[02:00:23] TEACHER: So what happened in 2016?   {#1881}
[02:00:26] TEACHER: In 2016, Redbus is where people do bus booking.   {#1882}
[02:00:32] TEACHER: They were having a table which stored date time as date time.   {#1883}
[02:00:37] STUDENT_1: And this date time was becoming the performance bottleneck because it had   {#1884}
[02:00:40] STUDENT_1: to do massive date time comparisons and it was slowing things down to the core.   {#1885}
[02:00:45] STUDENT_1: So what they did is they wanted to move.   {#1886}
[02:00:48] STUDENT_1: So first of all, they were like, Hey, can they move to a POC integer?   {#1887}
[02:00:51] STUDENT_1: If they moved to a POC integer, they lost readability.   {#1888}
[02:00:53] STUDENT_1: Readability because the way they were using it in their IDs, in their SQL   {#1889}
[02:00:58] STUDENT_1: IDs, in their UI, they were like literally rendering it as is.   {#1890}
[02:01:02] STUDENT_1: So now they were very used to in debugging it that way.   {#1891}
[02:01:05] STUDENT_1: Right.   {#1892}
[02:01:06] STUDENT_1: to lose out on readability when they use native ids to look at text.   {#1893}
[02:01:11] STUDENT_1: So they wanted readability and this. So what they knew is they did not want time level granularity.   {#1894}
[02:01:18] STUDENT_1: All they wanted was date level granularity. So they were not using time type. They were just   {#1895}
[02:01:23] STUDENT_1: using date. So what they did is they stored date time as integer return in this format.   {#1896}
[02:01:32] STUDENT_1: So yyyymmdd as an integer, not as a string as an integer.   {#1897}
[02:01:37] STUDENT_1: So 20220402.   {#1898}
[02:01:39] STUDENT_1: So they relax the constraint.   {#1899}
[02:01:40] STUDENT_1: They said, Hey, we don't need time.   {#1900}
[02:01:43] STUDENT_1: What we need is we need date.   {#1901}
[02:01:45] STUDENT_1: So we would store it in a format, which is custom format, very heavily optimized for their use case.   {#1902}
[02:01:52] STUDENT_1: So they get readability because you can looking at this, you can tell it 2nd of April.   {#1903}
[02:01:57] STUDENT_1: They get benefit because they get performance because it is integer.   {#1904}
[02:02:02] STUDENT_1: integer comparison, integer index, lightning fast.   {#1905}
[02:02:06] STUDENT_1: Right.   {#1906}
[02:02:07] TEACHER: So be open to alter some things.   {#1907}
[02:02:12] TEACHER: There is no hard rule that you have to use date time as data.   {#1908}
[02:02:14] TEACHER: There is no hard rule that you only have to use the app of integers.   {#1909}
[02:02:17] TEACHER: Be creative with your solution.   {#1910}
[02:02:18] TEACHER: And that's where the next level of optimizations come.   {#1911}
[02:02:22] TEACHER: So these are three ways through which I would want to put forth   {#1912}
[02:02:27] STUDENT_1: how date times are stored.   {#1913}
[02:02:29] STUDENT_1: So daytime has its own advantages and disadvantages.   {#1914}
[02:02:32] TEACHER: daytime has a open integer on advantages, disadvantages, and daytime as a custom format,   {#1915}
[02:02:37] TEACHER: as an integer like this has its own, and you can change it to however you want.   {#1916}
[02:02:41] TEACHER: I just give an example of Redbus, which I definitely know because one of my friends   {#1917}
[02:02:45] TEACHER: did that.   {#1918}
[02:02:46] TEACHER: So an example of that, right?   {#1919}
[02:02:48] STUDENT_1: So being open to changes, being wary of the fact that do you need readability?   {#1920}
[02:02:53] STUDENT_1: Do you need performance?   {#1921}
[02:02:54] STUDENT_1: Do you need convenience?   {#1922}
[02:02:55] STUDENT_1: What do you want?   {#1923}
[02:02:56] TEACHER: Right.   {#1924}
[02:02:56] TEACHER: Depending on which you pick the corresponding type.   {#1925}
[02:02:59] TEACHER: Right.   {#1926}
[02:03:00] TEACHER: Okay.   {#1927}
[02:03:00] TEACHER: Any questions on this database?   {#1928}
[02:03:08] STUDENT_9: Yeah.   {#1929}
[02:03:15] STUDENT_1: You're not audible.   {#1930}
[02:03:16] STUDENT_1: Let me check if it is me or you.   {#1931}
[02:03:18] STUDENT_1: Hello.   {#1932}
[02:03:19] STUDENT_1: Yeah.   {#1933}
[02:03:20] STUDENT_3: Sorry.   {#1934}
[02:03:21] STUDENT_3: Yeah.   {#1935}
[02:03:21] STUDENT_3: So I didn't really understand what is the benefit you explained in the custom format.   {#1936}
[02:03:26] STUDENT_3: So if they wanted, because what I think is, this is really inflexible.   {#1937}
[02:03:31] STUDENT_3: If for whatever use case, they'll need timestamp in future, they'll have to do.   {#1938}
[02:03:35] STUDENT_1: They knew they did not.   {#1939}
[02:03:37] STUDENT_1: Right.   {#1940}
[02:03:37] STUDENT_1: They knew they did not.   {#1941}
[02:03:39] STUDENT_3: They could have, they could have also stored as a poch.   {#1942}
[02:03:42] STUDENT_3: What you mentioned in the second step, right?   {#1943}
[02:03:44] STUDENT_3: But it's not readable.   {#1944}
[02:03:45] TEACHER: They wanted readability.   {#1945}
[02:03:46] STUDENT_3: I mean, this is a, this is a simple parsing function in the app side, like client side.   {#1946}
[02:03:52] TEACHER: They did not want to.   {#1947}
[02:03:53] TEACHER: It's their decision, their company.   {#1948}
[02:03:56] STUDENT_3: want to do it okay but i mean there is no performance improvement is what i'm saying   {#1949}
[02:04:00] STUDENT_1: and then integer integer right you get the same benefit correct yeah that's what i'm saying there's   {#1950}
[02:04:07] STUDENT_3: no performance improvement it's just what from here to here there is yes there is not yeah correct   {#1951}
[02:04:15] TEACHER: correct that's all yeah yeah and it's their company their use case and i've seen a bunch of places   {#1952}
[02:04:20] TEACHER: where people have used custom format i cannot reveal it because it's proprietary information   {#1953}
[02:04:26] TEACHER: where you don't want to do either this or this, but go with something like this.   {#1954}
[02:04:30] STUDENT_9: Got it.   {#1955}
[02:04:31] STUDENT_9: Yeah.   {#1956}
[02:04:35] STUDENT_8: Hi, I think with the first format, you also capture the time zone information,   {#1957}
[02:04:42] STUDENT_8: which is a little bit lost in second and third one.   {#1958}
[02:04:45] STUDENT_8: So I think that needs to be taken care while designing what scheme you want to use.   {#1959}
[02:04:51] TEACHER: You get something, you lose something.   {#1960}
[02:04:55] TEACHER: but in any case if you store it in unix time zone you store it in unix format depending on where   {#1961}
[02:05:01] STUDENT_1: the time is rendered you can pick the local device system and render it in that   {#1962}
[02:05:05] STUDENT_1: so if it's only for the viewing purpose you can very easily do it so in that case the uh that   {#1963}
[02:05:13] STUDENT_8: same long value for that epoch time zone that represents different time in different time zones   {#1964}
[02:05:19] STUDENT_8: right so in that case you need to be especially uh careful uh like that you uh take everything in   {#1965}
[02:05:27] STUDENT_8: utc uh yes yes yes like i've burned my hands with this so that's why yeah everyone everyone has been   {#1966}
[02:05:37] TEACHER: through this but see you need something you you go for it right it's not that it's not that this   {#1967}
[02:05:42] TEACHER: is better than the both right it's always that this has its own trade-off this has their own   {#1968}
[02:05:46] TEACHER: redops this as they don't.   {#1969}
[02:05:47] STUDENT_8: Yeah.   {#1970}
[02:05:49] TEACHER: So,   {#1971}
[02:05:50] TEACHER: got it.   {#1972}
[02:05:52] TEACHER: Hi,   {#1973}
[02:05:53] TEACHER: so in the example that you just mentioned why red was,   {#1974}
[02:05:56] TEACHER: red was didn't use daytime as a pocket teacher.   {#1975}
[02:05:58] TEACHER: Was it only for development purposes?   {#1976}
[02:06:00] TEACHER: No, no, no, it was production for a use case and I cannot reveal the use case.   {#1977}
[02:06:04] STUDENT_1: It was for a use case.   {#1978}
[02:06:05] STUDENT_1: They wanted it to be date.   {#1979}
[02:06:07] STUDENT_1: It was more of analytics use case, not for transactional systems, but   {#1980}
[02:06:10] STUDENT_1: daytime was creating the havoc.   {#1981}
[02:06:12] TEACHER: It was becoming the bottleneck.   {#1982}
[02:06:14] TEACHER: They went with custom.   {#1983}
[02:06:16] TEACHER: Got it. Thanks.   {#1984}
[02:06:19] STUDENT_1: Surya?   {#1985}
[02:06:20] STUDENT_5: Yeah, I have a doubt on the previous slide on the soft delete part, right?   {#1986}
[02:06:27] STUDENT_5: Like where you mentioned soft delete reasons are this.   {#1987}
[02:06:32] STUDENT_5: And one of the positives that you said like easy on the database engine,   {#1988}
[02:06:36] STUDENT_5: but eventually when you consider soft delete, right?   {#1989}
[02:06:38] STUDENT_5: Sometimes you never do hard delete.   {#1990}
[02:06:41] STUDENT_5: In that case, it perfectly makes sense in the tree balancing and stuff.   {#1991}
[02:06:46] STUDENT_5: example of Google drive where eventually you will do the hard delete.   {#1992}
[02:06:51] TEACHER: Yeah.   {#1993}
[02:06:53] STUDENT_5: So in that case, like that rebalancing is not really a benefit, right?   {#1994}
[02:06:57] STUDENT_5: Eventually after 30 days, you are doing the hard and a database has to do the   {#1995}
[02:07:02] STUDENT_5: rebalancing anyway.   {#1996}
[02:07:04] STUDENT_5: So it's beneficial only if you are in that soft delete state forever.   {#1997}
[02:07:08] TEACHER: No, no, no, no, no.   {#1998}
[02:07:09] TEACHER: I'll give you another example.   {#1999}
[02:07:10] TEACHER: So when you are, let's say you are doing hard deletes every time.   {#2000}
[02:07:14] STUDENT_1: Now what would happen is every time you do hard delete,   {#2001}
[02:07:17] STUDENT_1: you would have to rebalance.   {#2002}
[02:07:21] STUDENT_1: There's a very high chance that worst case,   {#2003}
[02:07:23] STUDENT_1: every delete requires you to do rebalancing.   {#2004}
[02:07:25] STUDENT_1: But imagine you have accumulated a bunch of soft deletes   {#2005}
[02:07:30] STUDENT_1: and you're deleting all of them in one shot.   {#2006}
[02:07:32] STUDENT_1: So DataWare has to do rebalancing once versus many times.   {#2007}
[02:07:37] STUDENT_1: So what you are saving on is you are clubbing all the tree rebalancing   {#2008}
[02:07:41] STUDENT_1: into one, doing hard deletes across all,   {#2009}
[02:07:44] STUDENT_1: So that your database rebalancing happens just once or rather few,   {#2010}
[02:07:48] STUDENT_1: uh, or, uh, basically fewer times than not.   {#2011}
[02:07:51] STUDENT_1: Okay.   {#2012}
[02:07:52] STUDENT_1: That is the advantage that you have.   {#2013}
[02:07:54] STUDENT_5: That, that still means that let's say it, we take the example of Google drive.   {#2014}
[02:07:58] STUDENT_5: So that means you can do the batch of, uh, all the hard deletes over a day,   {#2015}
[02:08:04] STUDENT_5: but you cannot even club multiple days.   {#2016}
[02:08:06] STUDENT_5: Okay.   {#2017}
[02:08:07] STUDENT_5: Yeah.   {#2018}
[02:08:07] TEACHER: So basically doing staggered deletion and in a batch way, rather than doing a   {#2019}
[02:08:14] STUDENT_1: time so if you do pointed deletion you might have the worst cases you would have to do rebalancing   {#2020}
[02:08:18] STUDENT_1: every time that's the worst case right but when you are batching all of those and doing hard   {#2021}
[02:08:22] TEACHER: deleting one shot and let's say basically delete 100 rows at a time and then committing it so for   {#2022}
[02:08:27] TEACHER: 100 rows one rebalance right so you are slashing the number of rebalances by a factor of 100 by   {#2023}
[02:08:32] TEACHER: batching it in the size of 100 that's the advantage of it right okay i'll take one more question   {#2024}
[02:08:39] STUDENT_4: before we move to caching sandeep go on yeah so that's my question is regarding the date   {#2025}
[02:08:45] STUDENT_4: format that you mentioned other slides so here you mentioned that the serialized format and then   {#2026}
[02:08:52] STUDENT_4: in the form of a string and then you talked about epoch right but don't you epoch that number is   {#2027}
[02:08:57] STUDENT_4: increasing so exponentially very soon you're going to max out on int then you have to go to double   {#2028}
[02:09:02] STUDENT_4: that will be like 64 bit so i was thinking the epoch is the worst time format the second worst   {#2029}
[02:09:10] STUDENT_4: serialized and the third it's not worst but but still on the worst it's very limited it's very   {#2030}
[02:09:16] STUDENT_4: limiting third yeah so yeah that's that was i was thinking but then when you're describing you said   {#2031}
[02:09:21] STUDENT_4: that you know epoch integers are always better so i was just wondering no no but still your point   {#2032}
[02:09:26] STUDENT_1: is very true like for example it right now it is four bytes as soon as we hit 2032 is when we would   {#2033}
[02:09:33] TEACHER: limit where we would basically max out, right?   {#2034}
[02:09:36] TEACHER: We would max out the range of integer.   {#2035}
[02:09:38] TEACHER: Right.   {#2036}
[02:09:39] TEACHER: Yes.   {#2037}
[02:09:39] TEACHER: So, uh, for what integer.   {#2038}
[02:09:40] TEACHER: So now what do we do?   {#2039}
[02:09:41] STUDENT_1: So from four by two, we move to eight, but then it suddenly doubles the space   {#2040}
[02:09:46] STUDENT_1: required to store date type.   {#2041}
[02:09:47] STUDENT_1: Right.   {#2042}
[02:09:48] STUDENT_1: Yeah.   {#2043}
[02:09:48] STUDENT_1: So which is where a lot of databases have thought it to go through my   {#2044}
[02:09:52] STUDENT_1: SQL documentation on how they store date type.   {#2045}
[02:09:55] STUDENT_1: So what they do.   {#2046}
[02:09:55] STUDENT_1: So one thing, if we start the date time from first January, 1970, what   {#2047}
[02:10:00] STUDENT_1: if I want to represent a 31st December, 1969 minus one with, if I do it with a POC integer,   {#2048}
[02:10:09] STUDENT_1: I would have to represent it with minus one.   {#2049}
[02:10:11] STUDENT_1: Correct.   {#2050}
[02:10:12] TEACHER: So then that's wrong.   {#2051}
[02:10:13] TEACHER: That's wrong on so many levels.   {#2052}
[02:10:15] TEACHER: Right.   {#2053}
[02:10:15] TEACHER: So in that, but if you store it this way, you are, you are gaining something or losing   {#2054}
[02:10:21] STUDENT_1: something, but if you'd want to store daytime as daytime, what if you have another way,   {#2055}
[02:10:28] STUDENT_1: which helps you, which allows you to cover the entire spectrum of datetime,   {#2056}
[02:10:32] STUDENT_1: not limited by the size of integer,   {#2057}
[02:10:34] STUDENT_1: it would take a little extra space.   {#2058}
[02:10:36] STUDENT_1: Let's say eight bytes, not eight bytes, but rather six bytes,   {#2059}
[02:10:40] STUDENT_1: but it can store it in a very compressed way.   {#2060}
[02:10:42] STUDENT_1: So what I would recommend is go through MySQL's datetime documentation   {#2061}
---- OWNED SEGMENTS END ----

CTX| [02:10:48] STUDENT_1: and see how beautifully MySQL stores this information.   {#2062}
CTX| [02:10:52] STUDENT_1: It's mind-blowingly awesome the way it stores it.   {#2063}
CTX| [02:10:57] STUDENT_1: from BCE to, you know,   {#2064}
CTX| [02:11:00] STUDENT_1: no matter how many years,   {#2065}
CTX| [02:11:01] STUDENT_1: I think it supports still 20,000 year.   {#2066}
CTX| [02:11:05] TEACHER: Most only 20,000 is the max that it goes.   {#2067}
CTX| [02:11:07] TEACHER: It can handle up to.   {#2068}
CTX| [02:11:08] TEACHER: Human race has gone by that and 100%.   {#2069}
CTX| [02:11:11] TEACHER: But it covers this massive spectrum   {#2070}
CTX| [02:11:14] TEACHER: with a very limited bytes.   {#2071}
CTX| [02:11:17] STUDENT_1: So MySQL date time, explore that.   {#2072}
CTX| [02:11:21] STUDENT_1: Read the official document.   {#2073}
CTX| [02:11:22] STUDENT_1: Don't read some blog or video or random person.   {#2074}
CTX| [02:11:25] STUDENT_1: Official documentation.   {#2075}
CTX| [02:11:27] STUDENT_1: Because in that they have mentioned why they took that particular decision on storing the   {#2076}
CTX| [02:11:33] TEACHER: daytime in a serialized way without storing it in integers, but still getting good enough   {#2077}
CTX| [02:11:41] TEACHER: performance.   {#2078}
CTX| [02:11:42] TEACHER: So it tries to balance both worlds.   {#2079}
CTX| [02:11:46] TEACHER: Okay.   {#2080}
CTX| [02:11:47] STUDENT_7: Okay.   {#2081}
