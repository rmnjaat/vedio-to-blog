# chunk_12  OWNS 02:14:38 -> 02:25:36  (segments #2126-#2304, 1764 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:13:42] TEACHER: It samples and then deletes some of them.   {#2112}
CTX| [02:13:46] TEACHER: So the idea is again, not suitable for disk based database only for in-memory database   {#2113}
CTX| [02:13:51] TEACHER: you can do this.   {#2114}
CTX| [02:13:52] TEACHER: So what Redis does in this periodic jobs that we just spoke about in periodic job, Redis   {#2115}
CTX| [02:13:59] TEACHER: samples exactly 20 keys that has some expiration set.   {#2116}
CTX| [02:14:04] TEACHER: So out of all the keys that are there in Redis, it samples randomly picks 20 keys.   {#2117}
CTX| [02:14:09] TEACHER: Out of those 20 keys, it sees how many of them are expired.   {#2118}
CTX| [02:14:14] TEACHER: It first deletes all the keys that are expired from that sample.   {#2119}
CTX| [02:14:18] TEACHER: It will be out of this 20.   {#2120}
CTX| [02:14:20] TEACHER: All the keys that are expired, it deletes that.   {#2121}
CTX| [02:14:23] TEACHER: It sees that if the number of deleted keys from the sample are more than 25%.   {#2122}
CTX| [02:14:32] TEACHER: Then you repeat the process.   {#2123}
CTX| [02:14:34] TEACHER: So which means.   {#2124}
CTX| [02:14:35] TEACHER: Now here a bit of statistics comes in.   {#2125}

---- OWNED SEGMENTS START ----
[02:14:38] TEACHER: Population is what you have your entire Redis key set.   {#2126}
[02:14:42] TEACHER: With some expiration set.   {#2127}
[02:14:44] TEACHER: If you randomly pick 20 out of it.   {#2128}
[02:14:48] TEACHER: This is a sample.   {#2129}
[02:14:50] TEACHER: the distribution of population and distribution of sample so sample should be representative   {#2130}
[02:14:56] TEACHER: of population that's a normal statistical concept right that if you randomly sample something   {#2131}
[02:15:01] TEACHER: it would represent the distribution of your population right so you pick 20 keys at random   {#2132}
[02:15:08] TEACHER: so if out of this 20 keys let's say 50 percent of keys are expired which means that in your   {#2133}
[02:15:15] TEACHER: population there would be roughly 50% of keys that are expired right so what redis does is it   {#2134}
[02:15:22] TEACHER: instead of saying i would go ahead and delete all of them it's take this sample sees if in this   {#2135}
[02:15:28] TEACHER: sample there are how many keys are expired if it is less than 25 it stops the process if it is more   {#2136}
[02:15:33] TEACHER: than 25 it repeats this process continuously so this is what it ensures is that it does not have   {#2137}
[02:15:40] TEACHER: to spend a lot of time doing the entire deletion because number one it is very likely for someone   {#2138}
[02:15:47] TEACHER: to access an expired key and then red is finding it out to be deleted so this takes care of 90%   {#2139}
[02:15:53] TEACHER: of cleanup while for remaining 10 it says I don't really have to worry about it because eventually   {#2140}
[02:15:58] TEACHER: that could be triggered even if that does not trigger I'd find those keys I would take a sample   {#2141}
[02:16:05] TEACHER: out of those 20 I would pick up the keys that are that are expired delete them if they are more than   {#2142}
[02:16:11] TEACHER: 25 percent of the sample I would repeat this process this way and this process stops when   {#2143}
[02:16:18] TEACHER: in my sample of 20 the number of keys that I'm deleting is less than 25 percent which means out   {#2144}
[02:16:25] TEACHER: of 20 if let's say in one of the iteration I found out that out of this 20 only three keys   {#2145}
[02:16:32] TEACHER: are expired right so you delete those three keys and now because this only three keys   {#2146}
[02:16:38] TEACHER: which means only 15 percent only 15 percent of keys were expired which means that in your population   {#2147}
[02:16:47] TEACHER: 15 percent of keys would be expired but not deleted and it is okay so what it is that redis   {#2148}
[02:16:53] TEACHER: optimizes for speed and not completeness of the system because if it spends a lot of time doing it   {#2149}
[02:17:02] TEACHER: it would have less time to do other part,   {#2150}
[02:17:06] TEACHER: which is except like read and writes and all,   {#2151}
[02:17:08] TEACHER: because Redis is single threaded.   {#2152}
[02:17:09] TEACHER: There is no multiple threads in Redis running anywhere.   {#2153}
[02:17:13] TEACHER: Because it is single threaded, it has to leverage that.   {#2154}
[02:17:17] TEACHER: So now, which means that there is a chance,   {#2155}
[02:17:21] TEACHER: there is a chance where there are keys in memory of Redis,   {#2156}
[02:17:27] TEACHER: which are expired, but not deleted.   {#2157}
[02:17:30] TEACHER: They would eat up the space,   {#2158}
[02:17:33] TEACHER: statistically speaking, it would consume only 20-25% of the total consumption of the memory.   {#2159}
[02:17:40] TEACHER: And that's the worst case because you are anyway doing lazy deletion.   {#2160}
[02:17:44] TEACHER: It's not that Redis is only relying on that.   {#2161}
[02:17:46] TEACHER: So bulk of the deletion will be done by this anyway   {#2162}
[02:17:50] TEACHER: because you are very likely to access a key,   {#2163}
[02:17:52] TEACHER: finding out to be expired and Redis automatically deleting it   {#2164}
[02:17:55] TEACHER: when it accesses that.   {#2165}
[02:17:58] TEACHER: So in combination, approach 2 and approach 3,   {#2166}
[02:18:02] TEACHER: what redis gets is redis gets the speed it spends very minimal time in doing that cleanup   {#2167}
[02:18:09] TEACHER: in running that job because redis is single threaded it does not have other thread to do   {#2168}
[02:18:13] TEACHER: that it cannot do it it cannot have other threads to do it because it is single thread it had to do   {#2169}
[02:18:19] TEACHER: this in order to take out time to do actual stuff that matters get put delete and other part like   {#2170}
[02:18:26] TEACHER: handling actual commands that's why it does that and why 20 keys exactly 20 keys not 21 not 22 not   {#2171}
[02:18:35] TEACHER: 20 30 not 15 because of central limit theorem now the proof of it is there in a paper google search   {#2172}
[02:18:42] TEACHER: you'll find it it's also tagged in the redis's website is in the paper if you like math go and   {#2173}
[02:18:47] TEACHER: explore that otherwise just remember it's exactly 20 keys that it samples it works for up until 5   {#2174}
[02:18:52] TEACHER: million keys which is pretty decent amount right but this is such a brilliant implementation so   {#2175}
[02:18:59] TEACHER: now here what this tells us this tells us that there is no one way to build a system whatever   {#2176}
[02:19:04] TEACHER: works for you works for you and so redis does not go for correctness or rather the completeness of   {#2177}
[02:19:11] TEACHER: the system that hey whenever my job runs have to clear up every single thing out there right   {#2178}
[02:19:16] TEACHER: It just went for speed.   {#2179}
[02:19:18] TEACHER: Redis is optimizing for speed by trading off a bit of memory leak.   {#2180}
[02:19:24] TEACHER: Assuming that eventually that would be clean up.   {#2181}
[02:19:27] TEACHER: How?   {#2182}
[02:19:28] TEACHER: Because lazy deletion and random sampling.   {#2183}
[02:19:31] TEACHER: This way Redis spends bare minimum amount of time while it runs this periodic job.   {#2184}
[02:19:38] TEACHER: And this is how Redis actually does this.   {#2185}
[02:19:43] TEACHER: Apart from that, delete when you are deleting, this is where one more micro optimization   {#2186}
[02:19:51] TEACHER: comes in.   {#2187}
[02:19:52] TEACHER: When a user is deleting a key, what we do?   {#2188}
[02:19:55] TEACHER: We update, we set TTL equal to minus one.   {#2189}
[02:20:01] TEACHER: So our query looks something like this, update store set TTL equal to minus one when key   {#2190}
[02:20:06] TEACHER: equal to K1.   {#2191}
[02:20:07] TEACHER: We just think this much.   {#2192}
[02:20:08] TEACHER: Now here, what you can also do is add this.   {#2193}
[02:20:16] TEACHER: So set or delete a key only when it is not expired.   {#2194}
[02:20:23] TEACHER: Why?   {#2195}
[02:20:23] TEACHER: Why this statement?   {#2196}
[02:20:24] TEACHER: Why this clause?   {#2197}
[02:20:26] TEACHER: This clause would help us save discalpe.   {#2198}
[02:20:31] TEACHER: How?   {#2199}
[02:20:32] TEACHER: For example, if a key is already expired, right?   {#2200}
[02:20:38] TEACHER: which means it's TTL.   {#2201}
[02:20:40] TEACHER: It's expired at.   {#2202}
[02:20:42] TEACHER: It's already expired.   {#2203}
[02:20:43] TEACHER: So if you are deleting it,   {#2204}
[02:20:44] TEACHER: which means you are setting the TTL of a key   {#2205}
[02:20:46] TEACHER: which is already expired.   {#2206}
[02:20:49] TEACHER: When you do that,   {#2207}
[02:20:50] TEACHER: you are updating that particular row.   {#2208}
[02:20:53] TEACHER: But if it is already expired,   {#2209}
[02:20:54] TEACHER: you don't need to update that row.   {#2210}
[02:20:56] TEACHER: You can save that diskio.   {#2211}
[02:20:57] TEACHER: So what you do is although you fire this update,   {#2212}
[02:21:01] TEACHER: this update would not do a diskio   {#2213}
[02:21:03] TEACHER: if the key is already expired   {#2214}
[02:21:05] TEACHER: because of this clause.   {#2215}
[02:21:08] TEACHER: is on the disk IO.   {#2216}
[02:21:10] TEACHER: And not just one, but two,   {#2217}
[02:21:12] TEACHER: because you would have index on TTL anyway.   {#2218}
[02:21:14] TEACHER: So you are saving two disk IOs   {#2219}
[02:21:16] TEACHER: by adding this one clause.   {#2220}
[02:21:18] TEACHER: Micro optimization.   {#2221}
[02:21:19] TEACHER: You would be very happy to do this much.   {#2222}
[02:21:24] TEACHER: But adding this one clause   {#2223}
[02:21:25] TEACHER: helps you reduce the load on the disk,   {#2224}
[02:21:27] TEACHER: subload on the disk.   {#2225}
[02:21:29] TEACHER: This is micro optimization.   {#2226}
[02:21:30] TEACHER: This is what I found in Apache Ignite.   {#2227}
[02:21:32] TEACHER: I was just wondering,   {#2228}
[02:21:33] TEACHER: why would you do that?   {#2229}
[02:21:34] TEACHER: Why would you do that?   {#2230}
[02:21:36] TEACHER: Then I mimic the load.   {#2231}
[02:21:37] TEACHER: And then it struck me.   {#2232}
[02:21:38] TEACHER: Oh God, this is such a nice optimization.   {#2233}
[02:21:41] TEACHER: TTL is greater than now.   {#2234}
[02:21:42] TEACHER: You set it over here.   {#2235}
[02:21:44] TEACHER: So you update.   {#2236}
[02:21:45] TEACHER: So you basically what it says suggest is you do the disk IO only when it is needed.   {#2237}
[02:21:51] TEACHER: Otherwise you don't do it.   {#2238}
[02:21:53] TEACHER: This one clause ensures that.   {#2239}
[02:21:55] TEACHER: Right.   {#2240}
[02:21:56] TEACHER: Okay.   {#2241}
[02:21:57] TEACHER: Now batch cleanup would be just this that we just discussed delete from store where TTL   {#2242}
[02:22:01] TEACHER: is less than equal to now and get also select start from store where key equal to K1 and   {#2243}
[02:22:06] TEACHER: TTL is greater than now.   {#2244}
[02:22:08] TEACHER: You never make an IO that network IO for something that is already expired.   {#2245}
[02:22:14] TEACHER: Right.   {#2246}
[02:22:15] TEACHER: Okay.   {#2247}
[02:22:16] TEACHER: Now, okay.   {#2248}
[02:22:17] TEACHER: Let me take questions on this and we'll go into high level architecture.   {#2249}
[02:22:20] TEACHER: Okay.   {#2250}
[02:22:20] TEACHER: I'll take a few questions and then we move forward.   {#2251}
[02:22:22] TEACHER: Rahul, go on.   {#2252}
[02:22:23] STUDENT_1: So basically my question is about like, why do we need to set like TTL to minus one?   {#2253}
[02:22:31] STUDENT_1: We can just like a delete and batch job when we have.   {#2254}
[02:22:35] TEACHER: How, how would you delete it?   {#2255}
[02:22:38] STUDENT_1: deleting it how would you do it so basically uh normally the ttl will be in date time format right   {#2256}
[02:22:44] STUDENT_1: no absolute epoch time by date time okay so that can cause issues like that even if you're doing   {#2257}
[02:22:52] TEACHER: date time you set a time which is earlier let's say before first january 1970 or maybe 000 right   {#2258}
[02:23:00] TEACHER: You said something like that.   {#2259}
[02:23:02] STUDENT_1: No, basically like a TTL, uh, not like, uh, uh, I am thinking about expired at case basically.   {#2260}
[02:23:11] TEACHER: Yeah.   {#2261}
[02:23:12] TEACHER: This is expired at.   {#2262}
[02:23:13] TEACHER: Yes.   {#2263}
[02:23:13] STUDENT_1: Yeah.   {#2264}
[02:23:14] STUDENT_1: So basically, uh, at expert, like expired at will have all the information about even   {#2265}
[02:23:21] STUDENT_1: about the date and even about the time also.   {#2266}
[02:23:24] STUDENT_1: Okay.   {#2267}
[02:23:24] STUDENT_1: Okay. So like setting it to minus one is, I think it's kind of like, uh, adding a one   {#2268}
[02:23:31] STUDENT_1: more step, uh, when you like, uh, when you're like, just check the delete, uh, batch delete   {#2269}
[02:23:38] STUDENT_1: query. Okay. So yeah, it will compare it with now. Okay. Don't go into details now that   {#2270}
[02:23:46] TEACHER: now this, assume this is not minus, this can be an epoch timestamp. Correct. Okay. Yeah.   {#2271}
[02:23:54] TEACHER: the problem? Yeah. I'm writing it now. Should I write the actual time there? No, right?   {#2272}
[02:24:00] TEACHER: Yeah. Okay. Think about it. And if not this change this minus one to some magic value,   {#2273}
[02:24:07] STUDENT_1: let's say first January 1970. That works. No, I mean, I am saying like, we even don't   {#2274}
[02:24:17] STUDENT_1: need to update that value. We will have like the time at which it will expire. Right. So   {#2275}
[02:24:24] STUDENT_1: bad job or job comes, it will automatically compare those times.   {#2276}
[02:24:29] STUDENT_1: Right?   {#2277}
[02:24:30] STUDENT_19: Yeah.   {#2278}
[02:24:30] STUDENT_19: Because of this lesser equal to now.   {#2279}
[02:24:33] STUDENT_1: Yeah.   {#2280}
[02:24:33] STUDENT_1: So like, uh, I don't see a point of like setting.   {#2281}
[02:24:37] TEACHER: What if detail is not set for a key, then key was never expired.   {#2282}
[02:24:41] TEACHER: If you'd be a user specifically hard delete a key or if you don't delete a   {#2283}
[02:24:45] TEACHER: particular key, then what would you do?   {#2284}
[02:24:47] TEACHER: You'll not do anything.   {#2285}
[02:24:49] STUDENT_1: Okay.   {#2286}
[02:24:49] STUDENT_1: In that case we will have to say that implement delete.   {#2287}
[02:24:52] TEACHER: You are explicitly deleting a key.   {#2288}
[02:24:54] TEACHER: How will you do it?   {#2289}
[02:24:55] TEACHER: You have to do something in the database, right?   {#2290}
[02:24:57] TEACHER: When you're deleting it.   {#2291}
[02:24:59] STUDENT_12: Yeah.   {#2292}
[02:25:00] TEACHER: Right.   {#2293}
[02:25:01] TEACHER: Pankaj.   {#2294}
[02:25:03] TEACHER: Just to confirm.   {#2295}
[02:25:05] TEACHER: So when you say when we are saving on disk IO, when we do select star and all, it is happening   {#2296}
[02:25:10] TEACHER: because we have indexed TTL and databases into the TTL table.   {#2297}
[02:25:15] TEACHER: Right.   {#2298}
[02:25:17] TEACHER: And if, if we, if we do not index it, then we'll anyways be reading that value also because   {#2299}
[02:25:24] TEACHER: edit out, it's expired and then we skip that.   {#2300}
[02:25:27] TEACHER: Yeah.   {#2301}
[02:25:27] TEACHER: You'd have that index.   {#2302}
[02:25:28] TEACHER: Yes.   {#2303}
[02:25:30] TEACHER: Sampath.   {#2304}
---- OWNED SEGMENTS END ----

CTX| [02:25:36] TEACHER: Your voice is breaking Sampath.   {#2305}
CTX| [02:25:42] TEACHER: I'll just loop you in again.   {#2306}
CTX| [02:25:45] TEACHER: D Agrawal.   {#2307}
CTX| [02:25:46] TEACHER: Yeah, please, please write your first name.   {#2308}
CTX| [02:25:47] TEACHER: It makes me easy.   {#2309}
CTX| [02:25:51] STUDENT_7: Hi, Apekt.   {#2310}
CTX| [02:25:52] STUDENT_7: This is DPA.   {#2311}
CTX| [02:25:53] STUDENT_7: So my question is,   {#2312}
CTX| [02:25:54] STUDENT_7: Yeah. So you talked about reducing the network cost, right? Trip to database, right? When we were talking about inserts, I had an idea around the similar concept for insertions, right? For optimizing insertions.   {#2313}
CTX| [02:26:14] STUDENT_7: that let's say when we are trying to insert a key value pair, right?   {#2314}
CTX| [02:26:19] STUDENT_7: And if there is, if the key already exists, right?   {#2315}
CTX| [02:26:22] STUDENT_7: Can we have something like, so we have on this database,   {#2316}
CTX| [02:26:25] STUDENT_7: we want to reduce the IO, you know, this IO.   {#2317}
CTX| [02:26:29] STUDENT_7: So what if we have an in-memory layer, right?   {#2318}
CTX| [02:26:33] STUDENT_7: In front of it.   {#2319}
CTX| [02:26:34] STUDENT_7: So when a key value pair comes in,   {#2320}
