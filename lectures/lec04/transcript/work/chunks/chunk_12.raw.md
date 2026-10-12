# chunk_12  OWNS 02:10:48 -> 02:21:32  (segments #2062-#2231, 1741 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:09:48] STUDENT_1: So which is where a lot of databases have thought it to go through my   {#2044}
CTX| [02:09:52] STUDENT_1: SQL documentation on how they store date type.   {#2045}
CTX| [02:09:55] STUDENT_1: So what they do.   {#2046}
CTX| [02:09:55] STUDENT_1: So one thing, if we start the date time from first January, 1970, what   {#2047}
CTX| [02:10:00] STUDENT_1: if I want to represent a 31st December, 1969 minus one with, if I do it with a POC integer,   {#2048}
CTX| [02:10:09] STUDENT_1: I would have to represent it with minus one.   {#2049}
CTX| [02:10:11] STUDENT_1: Correct.   {#2050}
CTX| [02:10:12] TEACHER: So then that's wrong.   {#2051}
CTX| [02:10:13] TEACHER: That's wrong on so many levels.   {#2052}
CTX| [02:10:15] TEACHER: Right.   {#2053}
CTX| [02:10:15] TEACHER: So in that, but if you store it this way, you are, you are gaining something or losing   {#2054}
CTX| [02:10:21] STUDENT_1: something, but if you'd want to store daytime as daytime, what if you have another way,   {#2055}
CTX| [02:10:28] STUDENT_1: which helps you, which allows you to cover the entire spectrum of datetime,   {#2056}
CTX| [02:10:32] STUDENT_1: not limited by the size of integer,   {#2057}
CTX| [02:10:34] STUDENT_1: it would take a little extra space.   {#2058}
CTX| [02:10:36] STUDENT_1: Let's say eight bytes, not eight bytes, but rather six bytes,   {#2059}
CTX| [02:10:40] STUDENT_1: but it can store it in a very compressed way.   {#2060}
CTX| [02:10:42] STUDENT_1: So what I would recommend is go through MySQL's datetime documentation   {#2061}

---- OWNED SEGMENTS START ----
[02:10:48] STUDENT_1: and see how beautifully MySQL stores this information.   {#2062}
[02:10:52] STUDENT_1: It's mind-blowingly awesome the way it stores it.   {#2063}
[02:10:57] STUDENT_1: from BCE to, you know,   {#2064}
[02:11:00] STUDENT_1: no matter how many years,   {#2065}
[02:11:01] STUDENT_1: I think it supports still 20,000 year.   {#2066}
[02:11:05] TEACHER: Most only 20,000 is the max that it goes.   {#2067}
[02:11:07] TEACHER: It can handle up to.   {#2068}
[02:11:08] TEACHER: Human race has gone by that and 100%.   {#2069}
[02:11:11] TEACHER: But it covers this massive spectrum   {#2070}
[02:11:14] TEACHER: with a very limited bytes.   {#2071}
[02:11:17] STUDENT_1: So MySQL date time, explore that.   {#2072}
[02:11:21] STUDENT_1: Read the official document.   {#2073}
[02:11:22] STUDENT_1: Don't read some blog or video or random person.   {#2074}
[02:11:25] STUDENT_1: Official documentation.   {#2075}
[02:11:27] STUDENT_1: Because in that they have mentioned why they took that particular decision on storing the   {#2076}
[02:11:33] TEACHER: daytime in a serialized way without storing it in integers, but still getting good enough   {#2077}
[02:11:41] TEACHER: performance.   {#2078}
[02:11:42] TEACHER: So it tries to balance both worlds.   {#2079}
[02:11:46] TEACHER: Okay.   {#2080}
[02:11:47] STUDENT_7: Okay.   {#2081}
[02:11:48] STUDENT_7: Thank you very much.   {#2082}
[02:11:49] TEACHER: Yeah.   {#2083}
[02:11:50] TEACHER: Yeah.   {#2084}
[02:11:51] TEACHER: We'll move to caching.   {#2085}
[02:11:53] TEACHER: Then after this, we'll again have a quick question.   {#2086}
[02:11:55] TEACHER: And by the way, caching is very smart, but very interesting assignment, assignment,   {#2087}
[02:11:58] TEACHER: a very interesting discussion I've got to trigger tomorrow morning.   {#2088}
[02:12:03] TEACHER: For that, I'll cover this.   {#2089}
[02:12:04] TEACHER: So caching, most, God, people have so many confusions.   {#2090}
[02:12:09] TEACHER: Like people misunderstand caching a lot.   {#2091}
[02:12:12] TEACHER: So caching is not just in-memory caching.   {#2092}
[02:12:15] STUDENT_1: Always remember, what is caching?   {#2093}
[02:12:17] TEACHER: Caching is anything, literally anything that helps you save a heavy computation.   {#2094}
[02:12:25] TEACHER: Simple. Anything which is heavy operation or heavy computation, you save that caching for you.   {#2095}
[02:12:33] STUDENT_1: So that you don't have to go. Dynamic programming, memoization is caching.   {#2096}
[02:12:37] STUDENT_1: Classic caching. So a lot of people think caches, they think RAM.   {#2097}
[02:12:43] STUDENT_1: Who said we only have to use RAM for caching? Caches are not only RAM based.   {#2098}
[02:12:49] STUDENT_1: You can use disk as a cache. You can use network as a cache.   {#2099}
[02:12:51] STUDENT_1: anything that is worse than that you are saving it that becomes a cache and you can just basically   {#2100}
[02:12:58] TEACHER: refer to it to in order to not do that expensive computation expensive operation expensive io   {#2101}
[02:13:04] STUDENT_1: so typically what caching uses is it helps us reduce disk io or network io right so when you're   {#2102}
[02:13:14] STUDENT_1: saving disk IO, you may obviously think because RAM is faster than disk, we cache it in RAM.   {#2103}
[02:13:21] STUDENT_1: And that's what we are always used to that caches are RAM, RAM are caches and what and what not.   {#2104}
[02:13:26] STUDENT_1: But what the core idea is we are saving this expensive disk IO by caching the computation   {#2105}
[02:13:31] STUDENT_1: in RAM. But what if you had an expensive network call? What if you cache on the disk   {#2106}
[02:13:40] STUDENT_1: and you refer to that local disk rather than making that expensive network call?   {#2107}
[02:13:44] STUDENT_1: That is also possible.   {#2108}
[02:13:45] STUDENT_1: There you are saving an expensive network IO.   {#2109}
[02:13:49] STUDENT_1: Right?   {#2110}
[02:13:50] STUDENT_1: So understand this part about caching.   {#2111}
[02:13:52] STUDENT_1: Caching is literally anything.   {#2112}
[02:13:55] STUDENT_1: Anything which can help you save an expensive disk IO,   {#2113}
[02:14:00] STUDENT_1: expensive network IO or expensive computation.   {#2114}
[02:14:04] STUDENT_1: All three.   {#2115}
[02:14:06] STUDENT_1: See, as I always say, computer science has four things.   {#2116}
[02:14:09] STUDENT_1: Disk, network, CPU, RAM.   {#2117}
[02:14:12] STUDENT_1: RAM like we typically think in that way so any expensive disk IO, any expensive computation,   {#2118}
[02:14:18] STUDENT_1: any expensive network IO you save that is a cache for you right so that you can refer to it and it's   {#2119}
[02:14:23] STUDENT_1: not just RAM based so be very creative in finding usage of caches so caches in general are just   {#2120}
[02:14:31] STUDENT_1: glorified hash tables that's it key value hash table that's it right and with some and if you're   {#2121}
[02:14:37] TEACHER: using Redis, it has a bunch of advanced data structures like hyperlog, bloom filters, geo   {#2122}
[02:14:41] TEACHER: special queries and whatnot.   {#2123}
[02:14:43] TEACHER: But that then just hash tables, key values, nothing more than that.   {#2124}
[02:14:47] STUDENT_1: In our blog example, what we typically place the cache is we typically have a remote cache   {#2125}
[02:14:55] STUDENT_1: that can be communicated that any API server can talk to.   {#2126}
[02:15:03] STUDENT_1: any API server can talk to that and it logically sits between your database and your API server   {#2127}
[02:15:12] STUDENT_1: but physically it sits over here. For example when I get a request, request comes to API server,   {#2128}
[02:15:18] STUDENT_1: API server first checks the cache if it has the data it returns it back.   {#2129}
[02:15:23] STUDENT_1: If it does not have the data it goes to the database, reads the data, puts it onto the   {#2130}
[02:15:28] STUDENT_1: cache and forwards it back to the user.   {#2131}
[02:15:30] STUDENT_1: A standard cache use case.   {#2132}
[02:15:33] STUDENT_1: Having a remote cache helps us ensure that no matter where the request goes,   {#2133}
[02:15:40] STUDENT_1: they all go to the same cache to read the data.   {#2134}
[02:15:44] STUDENT_1: There is just one copy of data in the cache and everyone reads it.   {#2135}
[02:15:47] STUDENT_1: No matter where the request goes,   {#2136}
[02:15:49] STUDENT_1: you can go and read and send it back.   {#2137}
[02:15:52] STUDENT_1: By adding this cache, what you are saving,   {#2138}
[02:15:55] STUDENT_1: you are saving an expensive database query.   {#2139}
[02:15:58] STUDENT_1: the load on your database because the queries are now answered by your cache so reading a blog get   {#2140}
[02:16:04] STUDENT_1: a blog let's say a blog is popular doing that expensive three four table join on database to   {#2141}
[02:16:09] STUDENT_1: grid that block data again and again puts unnecessary load on the database so that's   {#2142}
[02:16:15] TEACHER: why you cache it on the in your cache in your centralized remote cache so request comes to   {#2143}
[02:16:20] TEACHER: a pay for the blog goes to cache returns it back right much much much much much much faster and   {#2144}
[02:16:25] TEACHER: efficient so much it would reduce the load on your database by a massive margin right so again   {#2145}
[02:16:31] TEACHER: cache is reducing the load on your database by helping you reduce an expensive network io   {#2146}
[02:16:37] STUDENT_1: right obviously it makes network i over here but reading from the cache pre-computed is much faster   {#2147}
[02:16:43] STUDENT_1: than going to the database recomputing it and sending it back right so always remember cache   {#2148}
[02:16:50] STUDENT_1: is anything that is helping you reduce an expensive desk io network io computation right anything now   {#2149}
[02:17:00] STUDENT_1: tomorrow and by the way this is what i want to talk about caching we'll build distributed cache   {#2150}
[02:17:05] TEACHER: remote cache key value store there we'll go into details of it like third week fourth week fifth   {#2151}
[02:17:11] TEACHER: week we'll go extreme details of building a cache and then a lot of internals will be covered uh and   {#2152}
[02:17:18] TEACHER: also tomorrow also but the core idea is that a lot of us have anyway used cash so we'll go into   {#2153}
[02:17:24] TEACHER: very granular details of it in first day we'll talk about it in very detail extreme detail   {#2154}
[02:17:29] STUDENT_1: eviction lru lf and whatnot right when we design one but what we want to do tomorrow first thing   {#2155}
[02:17:37] TEACHER: first 30 minutes we'll spend time talking about this now this is one discussion that i always   {#2156}
[02:17:43] TEACHER: look forward. What this leads to is in the third cohort, fourth cohort that I had about two years   {#2157}
[02:17:53] TEACHER: back, we had the same discussion where what we wanted to do is we wanted to find all possible   {#2158}
[02:18:00] STUDENT_1: places that you can use as a cache with an example. So this is a very common architectural diagram.   {#2159}
[02:18:07] STUDENT_1: Think about all possible places where you can cache something and it should reduce something   {#2160}
[02:18:13] STUDENT_1: So we spent time 30 minutes talking about different use cases around it.   {#2161}
[02:18:18] TEACHER: And one approach that came up in that discussion, that person worked at Goldman Sachs.   {#2162}
[02:18:24] TEACHER: He took that approach, proposed it to his manager.   {#2163}
[02:18:29] TEACHER: Manager approved it and they saw significant like massive performance boost by this.   {#2164}
[02:18:34] STUDENT_1: They did not think of this use case.   {#2165}
[02:18:36] STUDENT_1: Hey, he can also cash here, right?   {#2166}
[02:18:38] STUDENT_1: And this is what is importance of this discussion.   {#2167}
[02:18:41] TEACHER: So what we will do tomorrow, first thing for 30 minutes is we'll have discussion.   {#2168}
[02:18:46] TEACHER: So spend some time today going through this, find possible places where you can use as   {#2169}
[02:18:51] STUDENT_1: a cash with an example.   {#2170}
[02:18:53] STUDENT_1: Folks who raise the hands will pitch one use case, one place where they can use as a cash   {#2171}
[02:18:58] STUDENT_1: and what problem it solves.   {#2172}
[02:19:00] STUDENT_1: Right.   {#2173}
[02:19:01] STUDENT_1: And one example that is there is centralized cash and application level cash that we talk   {#2174}
[02:19:06] STUDENT_1: about.   {#2175}
[02:19:06] STUDENT_1: Advantages is everyone goes to talks to one to do it.   {#2176}
[02:19:09] TEACHER: it saves expensive DB call.   {#2177}
[02:19:12] TEACHER: So that is one.   {#2178}
[02:19:13] TEACHER: So it helps us save expensive DB computation   {#2179}
[02:19:16] TEACHER: and we got your cache against application level information there   {#2180}
[02:19:19] TEACHER: and every API server talks to it.   {#2181}
[02:19:21] TEACHER: That is one place.   {#2182}
[02:19:22] TEACHER: But find other places where you can cache.   {#2183}
[02:19:24] TEACHER: CDN might be one.   {#2184}
[02:19:26] TEACHER: Load balancer might be another.   {#2185}
[02:19:28] TEACHER: Think on those lines.   {#2186}
[02:19:29] TEACHER: Where you can cache, what you can cache,   {#2187}
[02:19:31] TEACHER: and what problem it solves.   {#2188}
[02:19:33] TEACHER: Tomorrow we'll have this discussion around it   {#2189}
[02:19:37] TEACHER: for the first 30 minutes.   {#2190}
[02:19:39] TEACHER: And this hopefully sparks a lot of interesting or it would help you understand a lot of interesting quote unquote hacks that people have applied to get the maximum performance out of their system.   {#2191}
[02:19:52] STUDENT_1: So we'll talk about it.   {#2192}
[02:19:54] STUDENT_1: And again, like always, everything will have a trade off.   {#2193}
[02:19:56] STUDENT_1: So when you use something, some place as a cash, you get something, you lose something.   {#2194}
[02:20:00] STUDENT_1: So we'll have a lot of trade off based discussion tomorrow for 30 minutes on this.   {#2195}
[02:20:04] TEACHER: And after that, we'll discuss on the other four components of foundational   {#2196}
[02:20:08] TEACHER: topics with the same example.   {#2197}
[02:20:10] TEACHER: So concurrency, communication, scaling, and delegation.   {#2198}
[02:20:14] TEACHER: We'll talk about that.   {#2199}
[02:20:16] TEACHER: Any questions on this?   {#2200}
[02:20:18] STUDENT_1: Database caching, anything that we discuss in the second half.   {#2201}
[02:20:21] STUDENT_1: Rajiv?   {#2202}
[02:20:22] STUDENT_6: Yeah, Arpat.   {#2203}
[02:20:23] STUDENT_6: So I was also under an impression that caching should be in RAM.   {#2204}
[02:20:28] STUDENT_6: So now you just say that's something which avoids heavy computation is caching.   {#2205}
[02:20:34] STUDENT_6: a separate cash component.   {#2206}
[02:20:36] STUDENT_6: Why can't we put the expensive competition DB itself and go   {#2207}
[02:20:39] STUDENT_6: and search the DB table, whatever is pre-computed.   {#2208}
[02:20:42] STUDENT_1: And then that is a possible place.   {#2209}
[02:20:45] STUDENT_1: That is a possible place.   {#2210}
[02:20:47] TEACHER: And which, uh, whatever things that we'll discuss tomorrow.   {#2211}
[02:20:51] TEACHER: And why not this?   {#2212}
[02:20:53] TEACHER: Right.   {#2213}
[02:20:53] TEACHER: So always have this question.   {#2214}
[02:20:55] TEACHER: Why not this?   {#2215}
[02:20:55] TEACHER: Why just this?   {#2216}
[02:20:56] TEACHER: Why are we, why the entire world is obsessed with just   {#2217}
[02:20:59] TEACHER: storing it in RAM?   {#2218}
[02:21:00] TEACHER: Why there is so much of misconception around it.   {#2219}
[02:21:02] TEACHER: See, entire business should work.   {#2220}
[02:21:04] TEACHER: Add in your products should work. Add in your products should be performed.   {#2221}
[02:21:07] TEACHER: However you do it, you do it.   {#2222}
[02:21:09] STUDENT_6: One thing more question.   {#2223}
[02:21:10] STUDENT_6: This is like the first slide offline online indicator.   {#2224}
[02:21:13] STUDENT_6: We use DB.   {#2225}
[02:21:15] TEACHER: Just a minute.   {#2226}
[02:21:16] TEACHER: First, let me just cover all the questions on this.   {#2227}
[02:21:18] TEACHER: Then we'll go back.   {#2228}
[02:21:19] TEACHER: So that basically there is no big context, right?   {#2229}
[02:21:22] TEACHER: Any questions on the second half of session where we cover databases and caches?   {#2230}
[02:21:28] TEACHER: Anyone?   {#2231}
---- OWNED SEGMENTS END ----

CTX| [02:21:32] TEACHER: Take one.   {#2232}
CTX| [02:21:35] TEACHER: I'll count it.   {#2233}
CTX| [02:21:35] TEACHER: Hi.   {#2234}
CTX| [02:21:38] TEACHER: Hi.   {#2235}
CTX| [02:21:40] TEACHER: Got.   {#2236}
CTX| [02:21:40] TEACHER: I'm going to raise your hand.   {#2237}
CTX| [02:21:41] TEACHER: Okay.   {#2238}
CTX| [02:21:42] TEACHER: Go on.   {#2239}
CTX| [02:21:42] TEACHER: Okay.   {#2240}
CTX| [02:21:43] TEACHER: Sorry.   {#2241}
CTX| [02:21:44] TEACHER: Yeah.   {#2242}
CTX| [02:21:44] TEACHER: So basically in the client side, when we use local storage, so that is, that also comes   {#2243}
CTX| [02:21:50] TEACHER: in caching means to store something.   {#2244}
CTX| [02:21:52] TEACHER: Let's, let's, let's have those discussions tomorrow around that.   {#2245}
CTX| [02:21:56] TEACHER: Like, because we'll have, because this is what I would want to come from you on.   {#2246}
CTX| [02:22:00] TEACHER: Right.   {#2247}
CTX| [02:22:01] TEACHER: What are different places where you can cash it?   {#2248}
CTX| [02:22:03] TEACHER: Okay.   {#2249}
CTX| [02:22:04] TEACHER: So tomorrow we'll have exhaustive discussions on that.   {#2250}
CTX| [02:22:07] STUDENT_1: Like what is cash?   {#2251}
CTX| [02:22:08] STUDENT_1: What is not?   {#2252}
CTX| [02:22:08] STUDENT_1: What are we caching?   {#2253}
CTX| [02:22:09] STUDENT_1: How did you, because everyone would be there.   {#2254}
CTX| [02:22:11] STUDENT_1: Everyone would be prepared and then it would just spark those things in their head.   {#2255}
CTX| [02:22:15] TEACHER: Right.   {#2256}
CTX| [02:22:15] TEACHER: And I want everyone to experience that.   {#2257}
CTX| [02:22:17] TEACHER: That's it.   {#2258}
CTX| [02:22:18] STUDENT_9: Okay.   {#2259}
CTX| [02:22:19] STUDENT_2: Yeah.   {#2260}
CTX| [02:22:19] STUDENT_2: Ajay.   {#2261}
CTX| [02:22:21] STUDENT_2: Hey, hi.   {#2262}
CTX| [02:22:22] STUDENT_2: So I had one question related to the database and where we are using soft delete.   {#2263}
CTX| [02:22:27] STUDENT_2: So if you're marking like a lot of recall records to the soft delete, so it, it will   {#2264}
