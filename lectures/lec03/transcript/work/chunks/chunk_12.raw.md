# chunk_12  OWNS 02:09:20 -> 02:20:10  (segments #2127-#2330, 1790 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:08:20] TEACHER: They can literally take this small database,   {#2100}
CTX| [02:08:23] TEACHER: logical partition,   {#2101}
CTX| [02:08:24] TEACHER: and move it over here.   {#2102}
CTX| [02:08:26] TEACHER: SQL dump commands,   {#2103}
CTX| [02:08:27] TEACHER: they do this, they dump it,   {#2104}
CTX| [02:08:28] TEACHER: and they load it in different place, right?   {#2105}
CTX| [02:08:31] TEACHER: This way they can balance.   {#2106}
CTX| [02:08:33] TEACHER: So for them,   {#2107}
CTX| [02:08:34] TEACHER: horizontally scaling a database is easy.   {#2108}
CTX| [02:08:36] TEACHER: They spin up a new physical server,   {#2109}
CTX| [02:08:37] TEACHER: take this logical partition,   {#2110}
CTX| [02:08:39] TEACHER: and move it there.   {#2111}
CTX| [02:08:40] TEACHER: Why is logical partition?   {#2112}
CTX| [02:08:41] TEACHER: Because now they can literally dump it very quickly   {#2113}
CTX| [02:08:44] TEACHER: and load it very quickly.   {#2114}
CTX| [02:08:46] TEACHER: If they were not having this logical partitions,   {#2115}
CTX| [02:08:48] TEACHER: they had to go through every single row and then extract the row   {#2116}
CTX| [02:08:50] TEACHER: that needs to be moved and then move it.   {#2117}
CTX| [02:08:52] TEACHER: Instead, they just create separate logical partitions,   {#2118}
CTX| [02:08:55] TEACHER: making their movement very easy.   {#2119}
CTX| [02:08:57] TEACHER: So this is what Instagram has as their structure.   {#2120}
CTX| [02:09:01] TEACHER: So they have 10 MySQL servers within each one of them,   {#2121}
CTX| [02:09:04] TEACHER: thousand, thousand, thousand MySQL databases,   {#2122}
CTX| [02:09:08] TEACHER: which is create database command that you fire,   {#2123}
CTX| [02:09:10] TEACHER: that are being created, which has logical partition   {#2124}
CTX| [02:09:12] TEACHER: and physical database server.   {#2125}
CTX| [02:09:13] TEACHER: Now this database shard ID that here we are talking about is this.   {#2126}

---- OWNED SEGMENTS START ----
[02:09:20] TEACHER: Right?   {#2127}
[02:09:20] TEACHER: They can be at max 2 raise to 13, which is 8192.   {#2128}
[02:09:24] TEACHER: And per shard sequence number like static count.   {#2129}
[02:09:26] TEACHER: But now what Instagram does is brilliant.   {#2130}
[02:09:29] TEACHER: What they do?   {#2131}
[02:09:30] TEACHER: They use stored procedures.   {#2132}
[02:09:32] TEACHER: Things we neglected in college PL, SQL, no one studied that.   {#2133}
[02:09:36] TEACHER: Stored procedures, what are they?   {#2134}
[02:09:37] TEACHER: We are not going to use it.   {#2135}
[02:09:38] TEACHER: We write raw SQL queries.   {#2136}
[02:09:39] TEACHER: What Instagram did is something really fancy, really basic.   {#2137}
[02:09:44] TEACHER: I did study this in college, but never thought it would be used in this way.   {#2138}
[02:09:49] TEACHER: PLSQL.   {#2139}
[02:09:50] TEACHER: I loved PLSQL, stored procedures and triggers and whatnot, but see how beautifully they're   {#2140}
[02:09:54] TEACHER: using it.   {#2141}
[02:09:56] TEACHER: So their photos table.   {#2142}
[02:09:58] TEACHER: So as I said, there are multiple physical servers in which there are logical partitions   {#2143}
[02:10:03] TEACHER: or logical databases that you're creating.   {#2144}
[02:10:06] TEACHER: Each database has same set of tables with same set of schemas.   {#2145}
[02:10:09] TEACHER: For each partition that it has table photos, it creates something like this.   {#2146}
[02:10:16] TEACHER: So create database Insta 5, create table Insta 5.photos.   {#2147}
[02:10:20] TEACHER: Schema of the photos table, other column, whatever you want to put it.   {#2148}
[02:10:24] TEACHER: But ID column looks something like this.   {#2149}
[02:10:26] TEACHER: ID, big integer, not null, default.   {#2150}
[02:10:29] TEACHER: Default value is, when you don't provide any value, the default value is this.   {#2151}
[02:10:33] TEACHER: This is a function called, a stored procedure, a function.   {#2152}
[02:10:36] TEACHER: Insta 5.next ID.   {#2153}
[02:10:38] TEACHER: So, when you are inserting a photo in the table, if you don't provide an ID, invoke   {#2154}
[02:10:46] TEACHER: this function.   {#2155}
[02:10:49] TEACHER: That's what it is doing.   {#2156}
[02:10:50] TEACHER: When you don't provide an ID while inserting the photo in this database or in this table,   {#2157}
[02:10:55] TEACHER: invoke this function, whatever the output is, use that as the ID.   {#2158}
[02:11:00] TEACHER: Now what this function is?   {#2159}
[02:11:01] TEACHER: This function is this.   {#2160}
[02:11:04] TEACHER: Create or replace function insta5.nextID.   {#2161}
[02:11:07] TEACHER: has its own next ID function because it is on fifth shard.   {#2162}
[02:11:12] TEACHER: I'm having those five five five suffixed everywhere.   {#2163}
[02:11:16] TEACHER: So next ID of this data, next ID, oh sorry, next ID of Insta 5,   {#2164}
[02:11:20] TEACHER: photos table of Insta 5, create database Insta 5.   {#2165}
[02:11:24] TEACHER: And how I'm defining this function is like this.   {#2166}
[02:11:28] TEACHER: Insta 5.next ID is the function name which outputs result   {#2167}
[02:11:32] TEACHER: which is of type big integer and it declares four variables.   {#2168}
[02:11:37] TEACHER: First is an epoch variable of type big integer and this is the value which is 1st January   {#2169}
[02:11:43] TEACHER: 2011 epoch timestamp epoch millisecond and sequence id something now millisecond big   {#2170}
[02:11:50] TEACHER: integer something shard id is 5.   {#2171}
[02:11:52] TEACHER: This 5, this 5, this 5, this 5, this 5 same right it's hard coded there.   {#2172}
[02:11:58] TEACHER: This is for shard id 5.   {#2173}
[02:12:00] TEACHER: Similarly you have to run the same you have to create this stored procedure for every   {#2174}
[02:12:03] TEACHER: single database that you have right.   {#2175}
[02:12:07] TEACHER: as an example.   {#2176}
[02:12:09] TEACHER: Now, this is the business logic.   {#2177}
[02:12:11] TEACHER: This is actually how you create a Snowflake ID.   {#2178}
[02:12:13] TEACHER: So what you do?   {#2179}
[02:12:14] TEACHER: Every database has a sequencer.   {#2180}
[02:12:17] TEACHER: Like how does database generate auto-increment IDs?   {#2181}
[02:12:20] TEACHER: Behind the scene, there is a sequencer   {#2182}
[02:12:21] TEACHER: or a sequencing algorithm   {#2183}
[02:12:23] TEACHER: whose job is to obviously table sequence.   {#2184}
[02:12:26] TEACHER: There are multiple names for that,   {#2185}
[02:12:26] TEACHER: but basically sequence is what you hear the general job.   {#2186}
[02:12:30] TEACHER: So you create a sequence   {#2187}
[02:12:31] TEACHER: which atomically increments and spits out the ID.   {#2188}
[02:12:37] TEACHER: increments simple every time you invoke it it increments so you invoke a function called next   {#2189}
[02:12:42] TEACHER: one it's a standard function next well insta pi dot table id sequence mod mod 1024 by 1024   {#2190}
[02:12:50] TEACHER: 2 raise to 10 this is limited by 10 per shot sequence number right so no matter how many   {#2191}
[02:12:56] TEACHER: transactions come in this will be an atomic increment and you do mod mod 1024 so it restricts   {#2192}
[02:13:03] TEACHER: it to 10 bits as sequence ID.   {#2193}
[02:13:06] TEACHER: So it stores it in this sequence ID over here.   {#2194}
[02:13:08] TEACHER: Right.   {#2195}
[02:13:09] TEACHER: Then you get now millisecond.   {#2196}
[02:13:10] TEACHER: Now millisecond you get normal epoch millisecond   {#2197}
[02:13:13] TEACHER: of your current database.   {#2198}
[02:13:14] TEACHER: Right.   {#2199}
[02:13:15] TEACHER: Now you want to create what you want to create snowflake ID.   {#2200}
[02:13:19] TEACHER: So what do you do in result, which is a big integer.   {#2201}
[02:13:23] TEACHER: You first 41 bits is what epoch millisecond since your customer   {#2202}
[02:13:28] TEACHER: epoch which is 1st January 2011. Now millisecond minus epoch left shift by 23. So you compute   {#2203}
[02:13:37] TEACHER: a time left shift by 23. When you left shift by 23 you would set the first 41 bits to be   {#2204}
[02:13:46] TEACHER: epoch milliseconds. Then the next is shard id. You have a shard id which is 5 result   {#2205}
[02:13:54] TEACHER: equal to result bitwise or shard id left shift 10.   {#2206}
[02:13:59] TEACHER: So next 13 bits are set to 5 which is shard id.   {#2207}
[02:14:02] TEACHER: And then you do result equal to result or sequence id.   {#2208}
[02:14:07] TEACHER: And every time you invoke this function   {#2209}
[02:14:10] TEACHER: or every time you insert this photo   {#2210}
[02:14:12] TEACHER: without passing in any id,   {#2211}
[02:14:14] TEACHER: it triggers this particular function   {#2212}
[02:14:16] TEACHER: which generates the snowflake id,   {#2213}
[02:14:19] TEACHER: returns it as result which gets inserted in this table.   {#2214}
[02:14:24] TEACHER: Instagram does snowflake ID in the database code procedure.   {#2215}
[02:14:29] TEACHER: Highly, highly, highly recommend you to implement this.   {#2216}
[02:14:31] TEACHER: Don't just look at it in theoretical side.   {#2217}
[02:14:34] TEACHER: Very easy to implement.   {#2218}
[02:14:35] TEACHER: Just start your favorite server, MySQL, Postgres, anything and write this and see   {#2219}
[02:14:40] TEACHER: how beautiful this implement is.   {#2220}
[02:14:41] TEACHER: Post on the previous batch did it and they found it.   {#2221}
[02:14:44] TEACHER: They were so amused when it first tried because it's so easy.   {#2222}
[02:14:47] TEACHER: It's so easy.   {#2223}
[02:14:48] TEACHER: It's so efficient because now you don't need to have logic on the API side.   {#2224}
[02:14:54] TEACHER: all offloaded to database.   {#2225}
[02:14:55] TEACHER: You just do normal insert like you always do without passing an ID.   {#2226}
[02:14:59] TEACHER: Earlier, if you don't buy you to auto increment.   {#2227}
[02:15:01] TEACHER: Now, instead of auto incrementing, it would invoke this function.   {#2228}
[02:15:05] TEACHER: Problem solved.   {#2229}
[02:15:06] TEACHER: This is such a beautiful thing that Instagram does.   {#2230}
[02:15:09] TEACHER: It still does that.   {#2231}
[02:15:10] TEACHER: You can still see Insta post having integer IDs, which are snowflake   {#2232}
[02:15:14] TEACHER: generated exactly like this.   {#2233}
[02:15:17] TEACHER: Right.   {#2234}
[02:15:17] TEACHER: Okay.   {#2235}
[02:15:18] TEACHER: Any questions on this?   {#2236}
[02:15:23] TEACHER: Rajiv.   {#2237}
[02:15:25] STUDENT_1: In this line, under dot table underscore added or sequence, this should be a column on Insta   {#2238}
[02:15:31] STUDENT_1: five, right?   {#2239}
[02:15:32] TEACHER: No, no, no, no, no.   {#2240}
[02:15:33] TEACHER: This is not a column.   {#2241}
[02:15:34] TEACHER: This is basically depends on database.   {#2242}
[02:15:36] TEACHER: It is not need to be a column.   {#2243}
[02:15:38] TEACHER: It's a sequencer.   {#2244}
[02:15:39] STUDENT_10: Okay.   {#2245}
[02:15:40] STUDENT_10: Okay.   {#2246}
[02:15:41] TEACHER: So you can create as many sequence by default, when you create an ID column with auto increment,   {#2247}
[02:15:46] TEACHER: it creates a sequence.   {#2248}
[02:15:48] TEACHER: It basically creates a sequence behind the scene with a unique name and it assigns it   {#2249}
[02:15:53] TEACHER: internally.   {#2250}
[02:15:54] TEACHER: you generate new IDs, it just does a next file and gets a new integer and it uses it as the ID   {#2251}
[02:16:00] TEACHER: for that row that you're inserting. Here we are just replacing the default one with this. So this   {#2252}
[02:16:05] TEACHER: is what you would basically custom create as a new sequencer. I don't need it. It's an auto   {#2253}
[02:16:09] TEACHER: incrementing sequence. Like how auto increment IDs are similarly. You don't need this to be a   {#2254}
[02:16:14] STUDENT_1: separate column. One more question. We just lifted the logic from API server and just substituted and   {#2255}
[02:16:19] STUDENT_1: put it in a DB, right?   {#2256}
[02:16:20] STUDENT_1: Apart from logical partitioning, we just lifted and placed the logic in DB, which, which means   {#2257}
[02:16:26] STUDENT_1: that we are like abstracting the logic inside DB, DB takes care of this.   {#2258}
[02:16:29] TEACHER: So now you have large number.   {#2259}
[02:16:30] TEACHER: You can have more than 10,000, 50,000 API servers also.   {#2260}
[02:16:34] STUDENT_1: Okay.   {#2261}
[02:16:35] TEACHER: There's no limit.   {#2262}
[02:16:35] TEACHER: Twitter is limited by that now.   {#2263}
[02:16:37] TEACHER: Twitter can only have two raised to 10 API servers.   {#2264}
[02:16:42] STUDENT_1: Because of machine ideas.   {#2265}
[02:16:43] STUDENT_1: Okay.   {#2266}
[02:16:44] STUDENT_1: Yeah.   {#2267}
[02:16:44] STUDENT_1: Yeah.   {#2268}
[02:16:45] STUDENT_1: And we have, we have, we have, we have, we have, we have, we have a lot, we have a lot   {#2269}
[02:16:49] STUDENT_1: many partitions.   {#2270}
[02:16:50] STUDENT_1: Correct.   {#2271}
[02:16:51] TEACHER: And here we have bottleneck five.   {#2272}
[02:16:52] TEACHER: We can have at max 8,000 logical databases, which is huge number 8,000 databases.   {#2273}
[02:16:58] TEACHER: What can you do?   {#2274}
[02:16:59] STUDENT_1: Yeah.   {#2275}
[02:17:00] STUDENT_1: Scaling actually helped you.   {#2276}
[02:17:01] STUDENT_1: Okay.   {#2277}
[02:17:01] STUDENT_1: I understand.   {#2278}
[02:17:02] STUDENT_1: Right.   {#2279}
[02:17:03] TEACHER: So, uh, Pankaj.   {#2280}
[02:17:05] STUDENT_3: Yeah.   {#2281}
[02:17:06] STUDENT_3: So, across machines, how are we comparing the IDs?   {#2282}
[02:17:09] STUDENT_3: It's just that one if the machine ID 1 and machine ID 2 are generating at the same time,   {#2283}
[02:17:15] STUDENT_3: one is given priority.   {#2284}
[02:17:17] TEACHER: Is that one is smaller, two is larger.   {#2285}
[02:17:19] STUDENT_3: Okay.   {#2286}
[02:17:20] STUDENT_3: And that machine ID is like we are giving it by default.   {#2287}
[02:17:24] TEACHER: Yeah, that any machine that can get separating.   {#2288}
[02:17:26] TEACHER: Another let's say zookeeper is assigning you IDs when your machine spins up.   {#2289}
[02:17:30] STUDENT_7: Okay.   {#2290}
[02:17:31] STUDENT_7: Okay.   {#2291}
[02:17:31] STUDENT_7: Yeah.   {#2292}
[02:17:34] TEACHER: Okay.   {#2293}
[02:17:35] TEACHER: By the way, that's all what I wanted to cover as part of ID generation.   {#2294}
[02:17:40] TEACHER: implement every single thing that begins easy to implement it's nothing fancy over here but you can   {#2295}
[02:17:45] TEACHER: very easily implement and see these things working in action it's really easy but do that you'll have   {#2296}
[02:17:51] TEACHER: fun implementing all of this and trust me because i implemented i got much deeper understanding of   {#2297}
[02:17:57] TEACHER: how they are doing what they are doing what advantages what disadvantages logical partition   {#2298}
[02:18:01] TEACHER: that we discussed logical databases why do they need export and dump and load and shard and whatnot   {#2299}
[02:18:06] TEACHER: not do that one life engineering is all we have would help us thrive in our careers but not good   {#2300}
[02:18:14] STUDENT_1: any other questions anyone yeah rajin uh one more i just uh talked i mean bit earlier that   {#2301}
[02:18:21] STUDENT_1: if we want to number the number the ids we have some logic in which um i know networks are   {#2302}
[02:18:29] STUDENT_1: unreliable the time we insert in database is time we get right where the entry call got in   {#2303}
[02:18:36] STUDENT_1: But with this approach, Snowflake and all those things, do we guarantee that the inserts in DB will always be monotonic?   {#2304}
[02:18:44] STUDENT_1: I mean, if we have a business case where we want to serve that project.   {#2305}
[02:18:48] TEACHER: What do you mean monotonic?   {#2306}
[02:18:50] TEACHER: Snowflake is not monotonically increasing.   {#2307}
[02:18:55] TEACHER: It does not guarantee strict monotonic.   {#2308}
[02:18:56] TEACHER: If you need strict monotonic, auto-increment is the way to go.   {#2309}
[02:18:59] TEACHER: And you can still see something's out of order.   {#2310}
[02:19:04] TEACHER: That's okay.   {#2311}
[02:19:06] TEACHER: social media app like Instagram and all, does it, do you really care about it?   {#2312}
[02:19:09] TEACHER: Not much, but a financial application where you're listing the transactions.   {#2313}
[02:19:13] TEACHER: Imagine bank, would bank use snowflake ID?   {#2314}
[02:19:15] TEACHER: No.   {#2315}
[02:19:16] TEACHER: Right.   {#2316}
[02:19:17] TEACHER: You need strict order in which the transactions have happened.   {#2317}
[02:19:20] TEACHER: Auto increment is the way to go for them.   {#2318}
[02:19:22] STUDENT_10: Okay.   {#2319}
[02:19:25] TEACHER: Yeah.   {#2320}
[02:19:27] STUDENT_6: But I wanted to clarify my understanding of this, which is Insta5.table ID sequence.   {#2321}
[02:19:37] STUDENT_6: model. So my understanding is that for every table, we have a sequence ID that is generated   {#2322}
[02:19:43] STUDENT_3: when we create that table and then we are.   {#2323}
[02:19:46] TEACHER: No that is done when you have an auto increment ID column, then otherwise you can explicitly   {#2324}
[02:19:51] TEACHER: create any sequencer that you want with any name.   {#2325}
[02:19:54] TEACHER: With any name.   {#2326}
[02:19:56] STUDENT_6: And that sequencer is doing this responsibility of.   {#2327}
[02:20:01] TEACHER: Atomically increment.   {#2328}
[02:20:02] TEACHER: it's it's responsibility when you invoke next well it atomically increments it and returns   {#2329}
[02:20:08] TEACHER: with the value.   {#2330}
---- OWNED SEGMENTS END ----

CTX| [02:20:10] TEACHER: When you create a table with an ID column with auto incrementing, this is implicitly   {#2331}
CTX| [02:20:16] TEACHER: getting created, but here we don't have that.   {#2332}
CTX| [02:20:17] TEACHER: We explicitly create one with the name that I just use table ID sequence.   {#2333}
CTX| [02:20:21] TEACHER: It's a name that I do.   {#2334}
CTX| [02:20:23] TEACHER: And by that, this is exactly the name that Instagram also has given.   {#2335}
CTX| [02:20:27] TEACHER: So that's why I just stick to that.   {#2336}
CTX| [02:20:28] TEACHER: But the thing is that you can name it anything that you want.   {#2337}
CTX| [02:20:32] TEACHER: sequences as you want. It's just not that you can limit it to just one per table. You can have as   {#2338}
CTX| [02:20:36] TEACHER: many as you want. You can have other columns which are auto increment. It's not a hard limit where   {#2339}
CTX| [02:20:42] TEACHER: it says only ID can be auto increment. FYI, you can create another column. You can have three columns   {#2340}
CTX| [02:20:46] TEACHER: with auto increments in your table. You can have that. But the idea is you create a sequencer whose   {#2341}
CTX| [02:20:51] TEACHER: job is to atomically increment and give it to you which is exactly what a static counter did back in   {#2342}
CTX| [02:20:56] TEACHER: that other logic. Right? So we just leverage that because we need thread safety. We need   {#2343}
CTX| [02:21:02] STUDENT_7: that because of this yeah i understand now thank you akshay uh yeah uh for the gossip part that we   {#2344}
