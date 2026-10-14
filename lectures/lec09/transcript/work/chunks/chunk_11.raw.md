# chunk_11  OWNS 02:00:01 -> 02:11:54  (segments #2056-#2263, 1875 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:59:04] STUDENT_2: store it in a like top 100 array in the same stories.   {#2042}
CTX| [01:59:08] STUDENT_2: What will you store in this array?   {#2043}
CTX| [01:59:13] STUDENT_2: The photo URLs again or the post ID.   {#2044}
CTX| [01:59:19] TEACHER: Right?   {#2045}
CTX| [01:59:21] TEACHER: Why photo URL?   {#2046}
CTX| [01:59:22] TEACHER: Post ID one, post ID two and so on and so forth.   {#2047}
CTX| [01:59:27] TEACHER: You store this information.   {#2048}
CTX| [01:59:28] TEACHER: Okay.   {#2049}
CTX| [01:59:29] TEACHER: What's the advantage of storing post ID over here?   {#2050}
CTX| [01:59:37] STUDENT_2: Advantage in the sense you mean like we can retrieve the post whichever we want like by   {#2051}
CTX| [01:59:42] STUDENT_2: joining it with the post table.   {#2052}
CTX| [01:59:45] TEACHER: What's the advantage?   {#2053}
CTX| [01:59:48] TEACHER: You are describing how you retrieve the data.   {#2054}
CTX| [01:59:51] TEACHER: What's the advantage of storing post ID over here?   {#2055}

---- OWNED SEGMENTS START ----
[02:00:01] STUDENT_2: Like advantages compared to board because I didn't think about any second method.   {#2056}
[02:00:05] STUDENT_2: Right.   {#2057}
[02:00:06] STUDENT_2: So that's the problem, right?   {#2058}
[02:00:08] TEACHER: That's the problem.   {#2059}
[02:00:09] TEACHER: That's what we have to think.   {#2060}
[02:00:11] TEACHER: Right.   {#2061}
[02:00:11] TEACHER: If we don't think of all possibilities, whatever I think seems optimal, but it might not be   {#2062}
[02:00:19] TEACHER: what's the advantage of storing post ID over here.   {#2063}
[02:00:23] STUDENT_1: So the advantage that I can think of is like, it is like, it is a data that we can derive   {#2064}
[02:00:29] STUDENT_1: from or derive anything from.   {#2065}
[02:00:31] STUDENT_1: Okay.   {#2066}
[02:00:31] STUDENT_1: Including the URL and all of those things.   {#2067}
[02:00:34] STUDENT_1: Second thing is like the amount of data we are storing in this table, in this non-relationable   {#2068}
[02:00:39] STUDENT_1: table, which is like a non-relationable table or already takes so much space.   {#2069}
[02:00:46] STUDENT_1: So this, this way we can reduce the amount of space that amount of space required to   {#2070}
[02:00:51] TEACHER: store this one document.   {#2071}
[02:00:52] TEACHER: Right.   {#2072}
[02:00:53] TEACHER: What's the other approach?   {#2073}
[02:00:54] TEACHER: If you don't store the post ID, what else can we do?   {#2074}
[02:00:57] STUDENT_1: So if we like the one, one thing, one thing that he told was like store the URL, but that   {#2075}
[02:01:06] STUDENT_1: is a pretty terrible thing.   {#2076}
[02:01:10] STUDENT_1: Other way we can store is basically have actual post actual post, right?   {#2077}
[02:01:16] STUDENT_1: Image ID and whatnot.   {#2078}
[02:01:17] TEACHER: So you can either store the actual post, the JSON response, the actual row, the actual   {#2079}
[02:01:23] TEACHER: here or you can store the post ID.   {#2080}
[02:01:26] STUDENT_1: But there would be a problem with that because like if we store image ID,   {#2081}
[02:01:31] STUDENT_1: we will have to like, we will have to like specify which user's image ID is this.   {#2082}
[02:01:37] STUDENT_1: Like, like, right.   {#2083}
[02:01:39] TEACHER: Post ID solves that problem.   {#2084}
[02:01:41] STUDENT_1: Yeah, exactly.   {#2085}
[02:01:42] TEACHER: Like that's why you can actually store, you can actually, so the actual post object here.   {#2086}
[02:01:49] TEACHER: Okay.   {#2087}
[02:01:49] TEACHER: Okay.   {#2088}
[02:01:50] TEACHER: ID caption, whatever we're storing in the post table, that same can be copied over a   {#2089}
[02:01:55] TEACHER: denormalized way of storing things.   {#2090}
[02:01:57] TEACHER: Correct.   {#2091}
[02:01:57] STUDENT_1: But that will increase the amount of storage.   {#2092}
[02:02:00] TEACHER: Correct.   {#2093}
[02:02:00] TEACHER: That's it.   {#2094}
[02:02:01] TEACHER: But what's the advantage of doing that?   {#2095}
[02:02:03] TEACHER: What is the advantage of doing this over this?   {#2096}
[02:02:05] STUDENT_12: Less data to fetch.   {#2097}
[02:02:08] STUDENT_1: I guess like, I mean, in the sense, in the sense, like I don't have to like go again   {#2098}
[02:02:13] STUDENT_1: and again to get all these things, ID and caption.   {#2099}
[02:02:15] STUDENT_1: I will just get it in one go.   {#2100}
[02:02:17] TEACHER: you can just read this one document and send it to the user so that's what these are the critical   {#2101}
[02:02:23] TEACHER: pros and cons because it's not just one way to do things and depending on what guarantees we are   {#2102}
[02:02:29] TEACHER: providing to our users depending on what experience we are providing our users we have to know if we   {#2103}
[02:02:34] TEACHER: need the slas or not so let me formally cover this that also one more thing uh gone so also one more   {#2104}
[02:02:43] STUDENT_1: thing like if I like click on any hash in the Instagram it has the ability to show all the   {#2105}
[02:02:51] TEACHER: photos there are for that hash that's not just our top we are just doing top 100 don't add new   {#2106}
[02:02:57] TEACHER: requirements to the system because that requires different design right we're sticking to our   {#2107}
[02:03:02] TEACHER: constraints right okay okay so top 100 there are two ways to store this information first way of   {#2108}
[02:03:10] TEACHER: storing this information is where we choose to only store the post IDs that are there.   {#2109}
[02:03:17] TEACHER: So post ID 1, post ID 2 and so on and so forth.   {#2110}
[02:03:19] TEACHER: The advantage of this approach is that we require less space to store the data.   {#2111}
[02:03:27] TEACHER: This information.   {#2112}
[02:03:28] TEACHER: Second advantage is that because it requires less space, it's easy to cache.   {#2113}
[02:03:34] TEACHER: Not really this thing.   {#2114}
[02:03:37] TEACHER: It will be very lightweight to cache.   {#2115}
[02:03:40] TEACHER: But a disadvantage of this is that every time you want to render this,   {#2116}
[02:03:45] TEACHER: you have to first go to this database, read this,   {#2117}
[02:03:48] TEACHER: then go to post service or post database and read the actual information   {#2118}
[02:03:51] TEACHER: and then render it to the user.   {#2119}
[02:03:54] TEACHER: So you need to talk to post DB to get that information as well.   {#2120}
[02:04:01] TEACHER: Like the details because on the UI, you have to render the likes and the comments   {#2121}
[02:04:05] TEACHER: and the shares and the caption and whatnot along with the photo URL.   {#2122}
[02:04:08] TEACHER: So either if by doing this, you are reducing the space to store over here, but you are   {#2123}
[02:04:15] TEACHER: making another call to a database, the post database to get the detailed information about   {#2124}
[02:04:19] TEACHER: the post.   {#2125}
[02:04:19] TEACHER: Roller number one.   {#2126}
[02:04:21] TEACHER: Roller number two is the advantage of doing this is that you get the latest data, which   {#2127}
[02:04:29] TEACHER: means let's say you are storing this information.   {#2128}
[02:04:32] TEACHER: You go to the post table every time you're making a call, which means that whatever the   {#2129}
[02:04:38] TEACHER: which is going to the source of truth, you are always rendering that.   {#2130}
[02:04:42] TEACHER: Other way of doing this is instead of doing this,   {#2131}
[02:04:44] TEACHER: you can actually store the actual post information with actual ID, caption and whatnot over here.   {#2132}
[02:04:52] TEACHER: This would bloat up this database.   {#2133}
[02:04:56] TEACHER: But given that there are only 100 entries, it might be just fine to do so.   {#2134}
[02:05:02] TEACHER: The disadvantage of doing this, it would require large space,   {#2135}
[02:05:08] TEACHER: that exact same advantage.   {#2136}
[02:05:10] TEACHER: You get very fast retrieval times because you just have to go to this one   {#2137}
[02:05:16] TEACHER: DB, this one DB read everything and return.   {#2138}
[02:05:20] TEACHER: You don't have to make another call to post DB to read the actual data   {#2139}
[02:05:23] TEACHER: because you have it right here.   {#2140}
[02:05:25] TEACHER: Store.   {#2141}
[02:05:26] TEACHER: Right.   {#2142}
[02:05:27] TEACHER: But another disadvantage of that is that if you do it, what about consistency?   {#2143}
[02:05:33] TEACHER: So when user, let's say changes something on the post, let's   {#2144}
[02:05:38] TEACHER: likes added, what would happen?   {#2145}
[02:05:40] TEACHER: You have to update the entries over here.   {#2146}
[02:05:42] TEACHER: That might become a pain point.   {#2147}
[02:05:44] TEACHER: So depending on what guarantees you are providing to your end user,   {#2148}
[02:05:48] TEACHER: in some cases, you might not just provide,   {#2149}
[02:05:50] TEACHER: you might choose not to provide that like count and comment count over here.   {#2150}
[02:05:55] TEACHER: You might just want to show the list of photos tapping on which you go to the post page.   {#2151}
[02:05:59] TEACHER: Very much possible.   {#2152}
[02:06:00] TEACHER: So in that case, you can just go with this approach   {#2153}
[02:06:03] TEACHER: and not just worry about consistency at all.   {#2154}
[02:06:05] TEACHER: You can just go with a simplistic approach,   {#2155}
[02:06:08] TEACHER: Hey, given that I don't care about consistency,   {#2156}
[02:06:10] TEACHER: when a photo URL is there, it's good enough for me to proceed.   {#2157}
[02:06:13] TEACHER: So depending on what user experience you are providing,   {#2158}
[02:06:17] TEACHER: you have to change.   {#2159}
[02:06:18] TEACHER: You have to pick either this or this.   {#2160}
[02:06:20] TEACHER: It totally depends.   {#2161}
[02:06:22] TEACHER: There is no one way to build this system.   {#2162}
[02:06:25] TEACHER: It depends on the kind of things that you're providing.   {#2163}
[02:06:28] TEACHER: Okay.   {#2164}
[02:06:29] TEACHER: This solves, at least we have to approach this depending   {#2165}
[02:06:32] TEACHER: on the kind of converged on one.   {#2166}
[02:06:35] TEACHER: Now let's talk about counting.   {#2167}
[02:06:37] TEACHER: So this is straightforward.   {#2168}
[02:06:38] TEACHER: Every hashtag that we have, we create an entry over here, but how do we update the total   {#2169}
[02:06:42] TEACHER: number of photos?   {#2170}
[02:06:44] TEACHER: How would this happen?   {#2171}
[02:06:46] TEACHER: Raise your hand.   {#2172}
[02:06:47] TEACHER: I'll tell you.   {#2173}
[02:06:51] TEACHER: How would you update a total number of photos every time the user post a photo   {#2174}
[02:06:54] TEACHER: with a particular hashtag, you have to update this.   {#2175}
[02:06:58] TEACHER: You do call plus plus over here.   {#2176}
[02:06:59] TEACHER: How will you do that?   {#2177}
[02:07:03] STUDENT_6: I think it does not need to be real time.   {#2178}
[02:07:06] STUDENT_6: Correct.   {#2179}
[02:07:08] STUDENT_6: So we can have like the update to the service, like being added in batches.   {#2180}
[02:07:16] STUDENT_6: Like every time someone adds a new thing.   {#2181}
[02:07:19] STUDENT_5: So this is your post service where the post is made.   {#2182}
[02:07:22] STUDENT_5: You push it to Kafka.   {#2183}
[02:07:24] STUDENT_6: Yeah.   {#2184}
[02:07:25] STUDENT_6: And then there will probably be like a consumer, which first of all takes   {#2185}
[02:07:31] STUDENT_6: in all the hashtags, like extracts all the hashtags from that particular post   {#2186}
[02:07:35] STUDENT_6: and, uh, updates, uh, like a DB, uh, like probably together, like not for every single   {#2187}
[02:07:43] STUDENT_6: post that comes, but probably for some time, hold some posts in memory that, okay.   {#2188}
[02:07:48] STUDENT_6: Uh, in this batch of, let's say a 1000 posts, uh, I saw 10 posts with hashtag a 10 posts   {#2189}
[02:07:54] STUDENT_6: with hashtag B 20 post with hashtag C and then commit them on the database.   {#2190}
[02:08:00] TEACHER: Okay.   {#2191}
[02:08:02] TEACHER: On what would be the partitioning key of this Kafka?   {#2192}
[02:08:07] STUDENT_6: The partitioning key.   {#2193}
[02:08:15] STUDENT_6: I guess it could be.   {#2194}
[02:08:18] STUDENT_6: It's I'm not sure if hashtag is a good partitioning key.   {#2195}
[02:08:21] STUDENT_6: The hashtag itself is not a good partitioning because there's so many of them.   {#2196}
[02:08:27] STUDENT_6: Yeah, I'm not sure.   {#2197}
[02:08:29] TEACHER: Why?   {#2198}
[02:08:30] TEACHER: Why are you not so?   {#2199}
[02:08:31] TEACHER: Think about it.   {#2200}
[02:08:32] TEACHER: Think about what would be the partitioning key of this Kafka.   {#2201}
[02:08:37] TEACHER: Hashtag you said hashtag would be one.   {#2202}
[02:08:39] TEACHER: Why is that not a good party?   {#2203}
[02:08:40] TEACHER: Even if there are multiple values, then it's just so it will pass to the hash function   {#2204}
[02:08:43] TEACHER: and pick one.   {#2205}
[02:08:44] TEACHER: Yeah, that's okay.   {#2206}
[02:08:46] TEACHER: Right.   {#2207}
[02:08:47] TEACHER: Yeah.   {#2208}
[02:08:47] TEACHER: Okay.   {#2209}
[02:08:48] TEACHER: So if you're taking hashtag as a partitioning key, there are multiple hashtags in the photos   {#2210}
[02:08:53] TEACHER: in the post that you're publishing.   {#2211}
[02:08:58] STUDENT_6: Then we'll, I'm not sure.   {#2212}
[02:09:05] TEACHER: Correct. So that's problem number one.   {#2213}
[02:09:07] TEACHER: Plus this is the same Kafka.   {#2214}
[02:09:09] TEACHER: Sorry. This is the exact same Kafka that we just drew over here.   {#2215}
[02:09:17] TEACHER: That when a post is published, we're putting a message out to Kafka.   {#2216}
[02:09:20] TEACHER: So every time one post is published, we're putting message out to this Kafka.   {#2217}
[02:09:24] TEACHER: So this Kafka and that Kafka has to be the same.   {#2218}
[02:09:26] TEACHER: Otherwise, this post service has to write to two different Kafka's   {#2219}
[02:09:29] TEACHER: and that distributed consistency problem creeps in.   {#2220}
[02:09:32] TEACHER: what will be the partitioning key of this Kafka?   {#2221}
[02:09:41] TEACHER: Either user idea or post ID.   {#2222}
[02:09:43] STUDENT_6: User idea.   {#2223}
[02:09:44] STUDENT_6: Probably user idea.   {#2224}
[02:09:45] STUDENT_6: Correct.   {#2225}
[02:09:45] TEACHER: So for all the users,   {#2226}
[02:09:46] TEACHER: they're going at one place or in one partition.   {#2227}
[02:09:49] TEACHER: Right?   {#2228}
[02:09:50] TEACHER: So this Kafka and the one that we are drawing right now,   {#2229}
[02:09:55] TEACHER: these two are same,   {#2230}
[02:09:56] TEACHER: which means that this is partitioned by,   {#2231}
[02:10:01] TEACHER: let's say user ID.   {#2232}
[02:10:04] TEACHER: Okay.   {#2233}
[02:10:05] TEACHER: Yeah.   {#2234}
[02:10:05] TEACHER: Now you talked about batching.   {#2235}
[02:10:08] TEACHER: Now for you to batch it, what do you need?   {#2236}
[02:10:14] TEACHER: All the posts of a particular hashtag should come to one server.   {#2237}
[02:10:20] TEACHER: Otherwise you will not efficiently batch.   {#2238}
[02:10:22] TEACHER: What if hashtag sunset goes to three different servers?   {#2239}
[02:10:26] TEACHER: Now, what would be the problem?   {#2240}
[02:10:28] TEACHER: Let's say there are three posts published by hashtag sunset.   {#2241}
[02:10:32] TEACHER: Now first goes over here, second goes over here, third goes over here.   {#2242}
[02:10:35] TEACHER: So although you wanted to do batch, but there is not enough things to batch.   {#2243}
[02:10:38] TEACHER: So you're eventually writing one at a time.   {#2244}
[02:10:40] TEACHER: So it's not reducing the load.   {#2245}
[02:10:43] TEACHER: How would this work?   {#2246}
[02:10:47] TEACHER: This is very inefficient because this has to be parted by user ID, but this needs to   {#2247}
[02:10:53] TEACHER: be batched by hashtags.   {#2248}
[02:10:59] TEACHER: Okay.   {#2249}
[02:10:59] TEACHER: Let me pull in Mohit.   {#2250}
[02:11:02] TEACHER: Mohit got.   {#2251}
[02:11:04] STUDENT_1: Can we use something on the lines of Redis PubSub   {#2252}
[02:11:07] STUDENT_1: where we make each of the hashtag as a channel?   {#2253}
[02:11:12] STUDENT_1: And like...   {#2254}
[02:11:13] TEACHER: There are millions and millions of hashtags.   {#2255}
[02:11:15] TEACHER: Each one cannot be a channel.   {#2256}
[02:11:17] TEACHER: You are overkilling the infra.   {#2257}
[02:11:20] TEACHER: Massive infra requirement plus potential data loss.   {#2258}
[02:11:24] STUDENT_1: By channel, I mean the channel in Redis terms.   {#2259}
[02:11:28] STUDENT_1: That's what I said.   {#2260}
[02:11:30] TEACHER: expensive millions of millions millions millions of hashtags are there plus what if that redis goes   {#2261}
[02:11:37] TEACHER: down there is data loss because redis does not persist anything it's real time pops up   {#2262}
[02:11:46] STUDENT_9: right   {#2263}
---- OWNED SEGMENTS END ----

CTX| [02:11:54] TEACHER: Okay.   {#2264}
CTX| [02:11:54] TEACHER: I'll provide a hint.   {#2265}
CTX| [02:11:56] TEACHER: Sandeep, this is partitioned by user ID.   {#2266}
CTX| [02:11:59] TEACHER: So what we can do is on the consumer.   {#2267}
CTX| [02:12:01] TEACHER: Wait, wait, wait, wait, wait, wait, wait, wait.   {#2268}
CTX| [02:12:03] TEACHER: Let me finish.   {#2269}
CTX| [02:12:04] TEACHER: Right.   {#2270}
CTX| [02:12:05] TEACHER: It is partitioned by user ID.   {#2271}
CTX| [02:12:06] TEACHER: It is partitioned by user ID.   {#2272}
CTX| [02:12:08] TEACHER: What we want is.   {#2273}
CTX| [02:12:10] TEACHER: Think of it.   {#2274}
CTX| [02:12:11] TEACHER: A post has multiple hashtags.   {#2275}
CTX| [02:12:14] TEACHER: Let's say I have three hashtags.   {#2276}
CTX| [02:12:17] TEACHER: in one post. So post 31 is published   {#2277}
CTX| [02:12:19] TEACHER: hashtag sunset, hashtag   {#2278}
CTX| [02:12:21] TEACHER: sun and hashtag nature.   {#2279}
CTX| [02:12:24] TEACHER: Right.   {#2280}
CTX| [02:12:25] TEACHER: Now, how would this   {#2281}
CTX| [02:12:27] STUDENT_5: go over here?   {#2282}
CTX| [02:12:29] STUDENT_5: Now start.   {#2283}
CTX| [02:12:30] STUDENT_1: Yeah, so what I was thinking   {#2284}
CTX| [02:12:33] STUDENT_1: so   {#2285}
CTX| [02:12:35] STUDENT_1: if all, so from the user   {#2286}
CTX| [02:12:37] STUDENT_1: ID, the consumer services can just   {#2287}
CTX| [02:12:39] STUDENT_1: read that post and it   {#2288}
CTX| [02:12:41] STUDENT_1: can pass the hashtags and then   {#2289}
CTX| [02:12:43] STUDENT_1: you can, then that   {#2290}
CTX| [02:12:47] STUDENT_1: partition based on the, you can put like a, we can use the principle of a vague idea of   {#2291}
CTX| [02:12:53] STUDENT_1: sharding, you know, like for example, sunset, anything from A to B can go to this partition.   {#2292}
