# chunk_12  OWNS 02:09:26 -> 02:20:33  (segments #2223-#2383, 1740 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:08:33] STUDENT_3: would be uh so first i want to start with a data model like the message data model that is received   {#2216}
CTX| [02:08:39] STUDENT_3: from the message itself and the time stamp because time stamp is very critical here   {#2217}
CTX| [02:08:49] TEACHER: received uh sorry you have your message yeah you have from which user yeah and you can also put   {#2218}
CTX| [02:08:59] TEACHER: two users that could yeah that's that that's that two users also let's put so from and to yeah   {#2219}
CTX| [02:09:08] STUDENT_3: and a time step and then there should be another data model which would be like   {#2220}
CTX| [02:09:13] STUDENT_3: last red time so that is very important for me because i need the count   {#2221}
CTX| [02:09:19] STUDENT_3: last red time   {#2222}

---- OWNED SEGMENTS START ----
[02:09:26] STUDENT_3: now yeah so now whenever uh so i'm so i you want me to talk about how the messages would be read   {#2223}
[02:09:33] STUDENT_3: and all that stuff or that is already everything everything so what so obviously because this is a   {#2224}
[02:09:38] STUDENT_3: messaging thing right so there will be a messaging queue and this user will be subscribed to that queue   {#2225}
[02:09:43] STUDENT_3: and based on the number of uh and the partitioning would be on the from user that would okay let's   {#2226}
[02:09:50] TEACHER: Let's go step back.   {#2227}
[02:09:51] TEACHER: What is the input to the system?   {#2228}
[02:09:54] TEACHER: Are you storing all the messages that your user received in this table?   {#2229}
[02:10:01] TEACHER: Am I in this messages table?   {#2230}
[02:10:04] TEACHER: Are you storing all the messages that a user ever received?   {#2231}
[02:10:10] STUDENT_3: I can store.   {#2232}
[02:10:11] STUDENT_3: There's no harm in storing, but I think that would not be a scalable solution.   {#2233}
[02:10:16] TEACHER: Because then what are you storing in this?   {#2234}
[02:10:17] TEACHER: What is this messages table?   {#2235}
[02:10:24] STUDENT_3: Okay.   {#2236}
[02:10:24] STUDENT_3: So I was just thinking one snippet of a message, like, you know, one message, one, like, hi,   {#2237}
[02:10:29] STUDENT_3: how are you?   {#2238}
[02:10:30] STUDENT_3: If I send it to you.   {#2239}
[02:10:31] STUDENT_3: So that message unit, I was thinking in that way, how will you store that?   {#2240}
[02:10:36] TEACHER: How will you figure out what that unit is?   {#2241}
[02:10:38] TEACHER: What, what, what exactly are you storing?   {#2242}
[02:10:40] TEACHER: Let's say user B sent a message to user A.   {#2243}
[02:10:43] TEACHER: Okay.   {#2244}
[02:10:44] TEACHER: So then this table needs to store either all the messages or part of messages.   {#2245}
[02:10:50] STUDENT_3: are storing over here? That's the question now. So I would be storing pretty much all the, so this   {#2246}
[02:10:55] STUDENT_3: data model, like for, uh, will store all the messages that a user that has sent to me. So   {#2247}
[02:11:00] STUDENT_3: for example, it could be like, I have sent high messages ever. Correct. Yeah. I think there's no   {#2248}
[02:11:08] STUDENT_3: arm in that way. Yeah. So this is our messages table. Yeah. Yeah. It is a messaging table. Yes.   {#2249}
[02:11:15] TEACHER: So this is all your messages that is shared over here, right?   {#2250}
[02:11:20] TEACHER: So the text part from this to this and times.   {#2251}
[02:11:22] TEACHER: Okay.   {#2252}
[02:11:23] TEACHER: You have that messaging table.   {#2253}
[02:11:24] TEACHER: So now the scale of this is pretty huge, but that's we'll, we'll, we'll touch upon that later.   {#2254}
[02:11:29] TEACHER: That's fine.   {#2255}
[02:11:30] TEACHER: Okay.   {#2256}
[02:11:30] TEACHER: Now in your other thing, what is your, this data model called that other one, where you're   {#2257}
[02:11:36] TEACHER: storing the last red ad.   {#2258}
[02:11:40] STUDENT_3: This, this can, this is basically for, for me to get the latest message up, right?   {#2259}
[02:11:46] STUDENT_3: So this can be a latest message, like some kind of a metadata information.   {#2260}
[02:11:53] TEACHER: So probably you need to have something substantial over here because you might want to store   {#2261}
[02:11:57] TEACHER: something more.   {#2262}
[02:11:58] TEACHER: So let's say right now I'm calling it messages or other, let's, let's just store it in a   {#2263}
[02:12:05] TEACHER: user activity.   {#2264}
[02:12:08] TEACHER: It's basically one-on-one mapping with user.   {#2265}
[02:12:11] TEACHER: So every user will have this one entry over here   {#2266}
[02:12:14] TEACHER: where you are storing that last read at   {#2267}
[02:12:16] TEACHER: and other details around it.   {#2268}
[02:12:18] TEACHER: This is your user activity table.   {#2269}
[02:12:22] TEACHER: Now what you are doing over here?   {#2270}
[02:12:25] TEACHER: What's your query to get the unique user scout part?   {#2271}
[02:12:33] STUDENT_3: Okay.   {#2272}
[02:12:33] STUDENT_3: So now the unique user part would be like   {#2273}
[02:12:37] STUDENT_3: you know, select messages, select from messages where timestamp is greater than last read at.   {#2274}
[02:12:47] STUDENT_3: So that is okay.   {#2275}
[02:12:49] STUDENT_3: And then I need to order them by the, I need to order them.   {#2276}
[02:12:56] TEACHER: You are not, you don't want to send a message.   {#2277}
[02:12:58] TEACHER: You just want to render the count.   {#2278}
[02:12:59] TEACHER: Why order?   {#2279}
[02:13:01] STUDENT_3: Yeah, but you want the unique users counter.   {#2280}
[02:13:03] STUDENT_3: You don't want the message count.   {#2281}
[02:13:04] STUDENT_3: So if I do this way, then I would be getting all the number of messages, right?   {#2282}
[02:13:09] TEACHER: You're doing select star from messages.   {#2283}
[02:13:12] TEACHER: Yeah.   {#2284}
[02:13:18] TEACHER: Where two is equal to your user and timestamp is greater than last read ad.   {#2285}
[02:13:26] TEACHER: Assume join one is there.   {#2286}
[02:13:28] TEACHER: What is the problem in this query?   {#2287}
[02:13:30] STUDENT_3: See, the problem is, for example, I have sent, so this messaging table,   {#2288}
[02:13:34] STUDENT_3: will store three rows. If I send three messages to you, hi, Arpit, how are you? So I've sent three   {#2289}
[02:13:39] STUDENT_3: messages. So three rows, it will store. Now, in the previous requirement, you said you want from   {#2290}
[02:13:45] STUDENT_3: unique users, how many users have messaged? Now, if I go with this approach, I would be getting three   {#2291}
[02:13:52] STUDENT_3: rows as my input, right? But I don't want three rows as input. I just want one. So basically,   {#2292}
[02:14:00] STUDENT_3: I'm mixing. I am accumulating all those three message rows into one. So that's the reason I said,   {#2293}
[02:14:07] TEACHER: I, how are you doing that? Count count from direct to this now count of unique of from   {#2294}
[02:14:21] TEACHER: correct. Yes. Select count unique from from messages where two is equal to your ID and   {#2295}
[02:14:30] TEACHER: Okay. What's the problem in this?   {#2296}
[02:14:36] STUDENT_3: I think the indexing would be the problem because I think we need to index it properly.   {#2297}
[02:14:42] STUDENT_3: Otherwise, it's like one of the time-consuming queries because you're pretty much   {#2298}
[02:14:47] STUDENT_3: getting all the messages. So what I would do is basically we can index from messages.   {#2299}
[02:14:58] STUDENT_3: right so maybe we can index it using a key that has from and message both a message no not message   {#2300}
[02:15:08] STUDENT_3: actually but maybe from the from from the from field i can index it or no not even that actually   {#2301}
[02:15:16] STUDENT_3: from timestamp timestamp would be a good indexing factor because we want all the messages after time   {#2302}
[02:15:22] STUDENT_3: this time right so yeah i think we can index it on the timestamp that's what i'm thinking just on   {#2303}
[02:15:28] TEACHER: So it will be like across all users, all data is sorted by timestamp.   {#2304}
[02:15:37] STUDENT_3: Yeah, that is what I'm thinking.   {#2305}
[02:15:39] TEACHER: But this is still an expensive query because if let's say you have received 1000 or rather   {#2306}
[02:15:44] TEACHER: 10,000 messages for a particular user, you are going through 10,000 rows of your table   {#2307}
[02:15:50] TEACHER: and then doing a unique offer.   {#2308}
[02:15:52] TEACHER: Now imagine doing it every time the page loads.   {#2309}
[02:15:55] TEACHER: Very expensive.   {#2310}
[02:15:57] TEACHER: Correct?   {#2311}
[02:15:58] TEACHER: Yeah.   {#2312}
[02:15:58] TEACHER: Yes.   {#2313}
[02:15:59] TEACHER: Very expensive.   {#2314}
[02:16:00] TEACHER: I am not doubting the correctness of the system.   {#2315}
[02:16:03] TEACHER: System would work, but at millions of people, there are millions of users currently active   {#2316}
[02:16:09] TEACHER: on this platform at this very moment, doing this, firing this query is super expensive.   {#2317}
[02:16:15] TEACHER: And FII just to clear out, you will create an index on from and timestamp or composite   {#2318}
[02:16:23] TEACHER: index on from and timestamp so that all the entries of a particular from a particular sorry   {#2319}
[02:16:29] TEACHER: from to and timestamp a composite index on this so for an entry for and it will be ordered by   {#2320}
[02:16:38] TEACHER: index on to from and timestamp in this particular order so all the entries of   {#2321}
[02:16:45] TEACHER: two will be clubbed together then grouped by from and then ordered by timestamp   {#2322}
[02:16:51] TEACHER: So this way, when you're sorting, when you're filtering it out, you are directly going to   {#2323}
[02:16:56] TEACHER: that location where two of your interest starts within which two timestamp and from two timestamp   {#2324}
[02:17:05] TEACHER: and from two from timestamp.   {#2325}
[02:17:06] STUDENT_3: I think it should be two timestamp and from, right?   {#2326}
[02:17:09] TEACHER: Because yes.   {#2327}
[02:17:11] STUDENT_3: Yeah.   {#2328}
[02:17:12] TEACHER: Because if you do, then you can very easily cut short.   {#2329}
[02:17:14] TEACHER: So it will be two timestamp.   {#2330}
[02:17:17] STUDENT_3: Yeah.   {#2331}
[02:17:18] STUDENT_3: Yeah.   {#2332}
[02:17:18] TEACHER: So to, time stamp and from, right.   {#2333}
[02:17:22] TEACHER: But although it, you are trying to, you know, ounce out every single performance from this   {#2334}
[02:17:27] TEACHER: by rearranging this field, but the worst case is imagine you having to iterate through these   {#2335}
[02:17:33] TEACHER: many index entries to just get the count of it.   {#2336}
[02:17:37] TEACHER: Right.   {#2337}
[02:17:38] TEACHER: And in case, let's say a user hypothetical example, worst case, 10,000 messages are there.   {#2338}
[02:17:44] TEACHER: You have to go through 10,000 entries of it and then do a unique entry to answer the count   {#2339}
[02:17:49] TEACHER: is just one.   {#2340}
[02:17:50] TEACHER: Right.   {#2341}
[02:17:50] TEACHER: Let's hypothetically one user sent you 10,000 messages.   {#2342}
[02:17:53] TEACHER: You're going to 10,000 index entries to eventually figure out that the unique count is just one   {#2343}
[02:17:57] TEACHER: or two or three or something like that.   {#2344}
[02:17:58] TEACHER: Right.   {#2345}
[02:17:59] TEACHER: That is expensive.   {#2346}
[02:18:01] STUDENT_3: Yeah.   {#2347}
[02:18:01] STUDENT_3: Actually I'm just thinking instead of going messages, we can have another column or not   {#2348}
[02:18:06] STUDENT_3: another column.   {#2349}
[02:18:07] STUDENT_3: We can have another table that tells how many messages have been sent.   {#2350}
[02:18:11] STUDENT_3: Just a count.   {#2351}
[02:18:12] STUDENT_3: Correct.   {#2352}
[02:18:14] STUDENT_3: care what messages are being sent right all i care is are messages being sent correct so you don't   {#2353}
[02:18:21] TEACHER: care about the actual messages so now we are coming to a more efficient implementation of it   {#2354}
[02:18:27] TEACHER: right okay so this is a crude way and this is not an incorrect way again i'm saying this is not an   {#2355}
[02:18:33] TEACHER: incorrect way this is a crude way of building things which gives you which is not very efficient   {#2356}
[02:18:39] TEACHER: but very correct when you fire this because this message is again again this goes for everyone   {#2357}
[02:18:44] TEACHER: this is your source of truth for messages this is your source of this is your source of truth to say   {#2358}
[02:18:49] TEACHER: when you last click the message icon doing this will exactly tell you how many people from which   {#2359}
[02:18:55] TEACHER: you got those messages exactly it will be 100 correct no matter what but the problem is it is   {#2360}
[02:19:03] TEACHER: just a little, a little, not a little, but rather inefficient.   {#2361}
[02:19:12] TEACHER: That's the problem.   {#2362}
[02:19:13] TEACHER: Right.   {#2363}
[02:19:14] TEACHER: It's just inefficient because do we really need to iterate through all the   {#2364}
[02:19:19] TEACHER: messages of a user that it received and then figure out, okay, these are the   {#2365}
[02:19:24] TEACHER: unique ones can we do better.   {#2366}
[02:19:27] TEACHER: Right.   {#2367}
[02:19:27] TEACHER: Okay.   {#2368}
[02:19:28] TEACHER: Uh, should I continue with Sandy?   {#2369}
[02:19:33] TEACHER: your hands raised i'll just do it so that i don't forget i'll just do it because you you added some   {#2370}
[02:19:38] TEACHER: brilliant points there i just want to pick others brains and see where we can go with this right   {#2371}
[02:19:43] TEACHER: yeah but just basically keep your hands raised okay uh rahul how will you optimize this actually   {#2372}
[02:19:51] STUDENT_4: like i will not go with this system instead of this i will try to go with non-relational database   {#2373}
[02:19:57] TEACHER: database because like similar query you'll fire there.   {#2374}
[02:20:02] STUDENT_4: Yeah.   {#2375}
[02:20:03] STUDENT_4: So basically the system would, that's the system that I'm thinking is like,   {#2376}
[02:20:07] STUDENT_4: uh, in the non-relational, non-relational database, there is a user key.   {#2377}
[02:20:12] STUDENT_4: Basically there is a user key and it has sub hash maps in it.   {#2378}
[02:20:17] STUDENT_4: Like it has more hash maps in it.   {#2379}
[02:20:20] STUDENT_4: Okay.   {#2380}
[02:20:20] STUDENT_4: So user key.   {#2381}
[02:20:22] STUDENT_4: And in this we have total, uh, total count basically.   {#2382}
[02:20:28] STUDENT_4: just just account.   {#2383}
---- OWNED SEGMENTS END ----

CTX| [02:20:33] STUDENT_4: And   {#2384}
CTX| [02:20:37] STUDENT_4: not not not this not this.   {#2385}
CTX| [02:20:39] STUDENT_4: Right.   {#2386}
CTX| [02:20:40] STUDENT_4: Just just just count with a number.   {#2387}
CTX| [02:20:44] TEACHER: Count with a number.   {#2388}
CTX| [02:20:45] TEACHER: What do you mean count with a number?   {#2389}
CTX| [02:20:46] STUDENT_4: I mean count count variable.   {#2390}
CTX| [02:20:49] TEACHER: Then is this even a hash table?   {#2391}
CTX| [02:20:53] STUDENT_4: No, no, no, no.   {#2392}
CTX| [02:20:54] STUDENT_4: Count.   {#2393}
CTX| [02:20:55] STUDENT_4: It's the name of the it's the name   {#2394}
CTX| [02:20:57] STUDENT_4: of the key. That's what   {#2395}
CTX| [02:20:59] STUDENT_4: I was saying.   {#2396}
CTX| [02:21:01] STUDENT_4: It's the name of the key.   {#2397}
CTX| [02:21:03] STUDENT_4: And   {#2398}
CTX| [02:21:06] STUDENT_4: yeah.   {#2399}
CTX| [02:21:08] TEACHER: These are actually   {#2400}
CTX| [02:21:09] TEACHER: instead of saying count be purpose, right?   {#2401}
CTX| [02:21:11] TEACHER: It's actually   {#2402}
CTX| [02:21:13] TEACHER: total   {#2403}
CTX| [02:21:15] TEACHER: or rather duly and read count.   {#2404}
CTX| [02:21:18] STUDENT_4: Yeah.   {#2405}
CTX| [02:21:19] STUDENT_4: Something like that. It's just   {#2406}
CTX| [02:21:21] STUDENT_4: a nomenclature.   {#2407}
CTX| [02:21:22] STUDENT_4: And   {#2408}
CTX| [02:21:26] STUDENT_4: in this hash map also   {#2409}
CTX| [02:21:28] STUDENT_4: we are also   {#2410}
CTX| [02:21:30] STUDENT_4: having one other hash map   {#2411}
CTX| [02:21:33] STUDENT_4: that is unique users   {#2412}
