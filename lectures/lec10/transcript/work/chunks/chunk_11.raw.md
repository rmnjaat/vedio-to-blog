# chunk_11  OWNS 02:03:28 -> 02:14:50  (segments #2064-#2256, 1759 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [02:02:31] TEACHER: physical movement which is happening for you to read this part over there right so the head needs   {#2052}
CTX| [02:02:37] TEACHER: to be moved the disc needs to rotate you read that then some other read comes in so it moves   {#2053}
CTX| [02:02:44] TEACHER: mechanical movement that happens on the disk is the most time-consuming process right so this is   {#2054}
CTX| [02:02:52] TEACHER: how magnetic disk works now we are building a super fast key value store that works on these   {#2055}
CTX| [02:03:00] TEACHER: cheap magnetic disk storage right so now how would you build it right let's start with and   {#2056}
CTX| [02:03:09] TEACHER: Given what we want to do is we want to support operations like put, get, delete.   {#2057}
CTX| [02:03:16] TEACHER: That's it.   {#2058}
CTX| [02:03:18] TEACHER: Right.   {#2059}
CTX| [02:03:18] TEACHER: But the key thing is we don't want to miss out on persistence.   {#2060}
CTX| [02:03:21] TEACHER: So we have to persist everything.   {#2061}
CTX| [02:03:23] TEACHER: So how would a put look like?   {#2062}
CTX| [02:03:26] TEACHER: Amen.   {#2063}

---- OWNED SEGMENTS START ----
[02:03:28] STUDENT_1: Okay.   {#2064}
[02:03:29] STUDENT_1: I mean, whatever the requirement you have given, it looks like fitting in the way that   {#2065}
[02:03:39] STUDENT_1: structure of a mem table or SS table works, you have something in memory as a sorted map.   {#2066}
[02:03:47] TEACHER: No, no, immediately. I want to persist immediately. When I say put it, it is to immediately flush to the disk.   {#2067}
[02:03:54] STUDENT_1: Oh, okay. Then if you have to immediately plus it.   {#2068}
[02:04:06] STUDENT_1: Okay.   {#2069}
[02:04:07] STUDENT_1: So let me understand.   {#2070}
[02:04:10] STUDENT_1: Maybe we are saying that as soon as the request comes,   {#2071}
[02:04:14] STUDENT_1: we will be able to persist it on the disk.   {#2072}
[02:04:19] STUDENT_1: Persist it at the disk for each put call.   {#2073}
[02:04:23] STUDENT_1: Yeah.   {#2074}
[02:04:25] STUDENT_1: Okay.   {#2075}
[02:04:27] STUDENT_1: I mean, then the best thing is like you create a ledger,   {#2076}
[02:04:33] STUDENT_1: where you start adding each and every,   {#2077}
[02:04:37] STUDENT_1: but it has its own challenge in terms of when you have to delete.   {#2078}
[02:04:43] TEACHER: Wait, wait, let's stop.   {#2079}
[02:04:45] TEACHER: Let's stop.   {#2080}
[02:04:45] TEACHER: Step by step.   {#2081}
[02:04:46] TEACHER: You're saying right ahead.   {#2082}
[02:04:47] TEACHER: What is right ahead?   {#2083}
[02:04:48] STUDENT_1: Like you have a file which has like each and every change that you are doing,   {#2084}
[02:04:56] STUDENT_1: you are like inserting as like appending in the,   {#2085}
[02:04:59] STUDENT_1: in place of going to figure it out where it has to go.   {#2086}
[02:05:03] STUDENT_1: adding at the end so that the magnet is discard best for that.   {#2087}
[02:05:08] STUDENT_1: I'm thinking why, why, why, why magnet is discard best for append only thing?   {#2088}
[02:05:13] STUDENT_1: Because you are, you, you, so when, when, when you know on this sector where your head was last,   {#2089}
[02:05:21] STUDENT_1: okay, you have to add more blocks on top of it.   {#2090}
[02:05:25] STUDENT_1: So you have not to look for your cylinder.   {#2091}
[02:05:28] STUDENT_1: I mean, your heads to go and seek it.   {#2092}
[02:05:33] STUDENT_1: a seek time, neither you need that your cylinder has to spin and reach to the right sector.   {#2093}
[02:05:40] STUDENT_1: So both the movement of like moving your   {#2094}
[02:05:45] STUDENT_1: all is gone. I'm at the right exact point where I have to add more blocks.   {#2095}
[02:05:54] STUDENT_1: That's the best I can do to get the benefit out of the characteristic of the disk.   {#2096}
[02:06:01] STUDENT_1: Perfect.   {#2097}
[02:06:03] STUDENT_1: So, so, so that is, and now what I'm worried about is the cons of it.   {#2098}
[02:06:10] STUDENT_1: When I have to delete it.   {#2099}
[02:06:12] TEACHER: No, no.   {#2100}
[02:06:13] TEACHER: I mean, first let's convert on put, what happens when you put something to this?   {#2101}
[02:06:18] TEACHER: So let's say this is that append only file.   {#2102}
[02:06:20] TEACHER: So this is the file that you opened up.   {#2103}
[02:06:22] TEACHER: Right now let's say I got a request.   {#2104}
[02:06:23] TEACHER: It says put K1 V1.   {#2105}
[02:06:26] TEACHER: What will happen?   {#2106}
[02:06:27] TEACHER: What, what, what, what will you do?   {#2107}
[02:06:30] STUDENT_1: So put K1 B1, K1 is a key, which is I need to add it.   {#2108}
[02:06:37] STUDENT_1: So I will add that key and corresponding value.   {#2109}
[02:06:41] STUDENT_1: I will add.   {#2110}
[02:06:41] STUDENT_1: So that much data is written in the disk and I need to have K1 and wherever the K1 is started,   {#2111}
[02:06:51] STUDENT_1: that sector address in somewhere in my memory table or somewhere else.   {#2112}
[02:06:59] TEACHER: So then we'll basically come to that.   {#2113}
[02:07:02] TEACHER: We'll come to that.   {#2114}
[02:07:02] TEACHER: Let's first get the max performance out of it.   {#2115}
[02:07:04] TEACHER: When we hit get, right?   {#2116}
[02:07:06] TEACHER: First, let's focus on put, right?   {#2117}
[02:07:08] TEACHER: Are we doing the best when we are putting?   {#2118}
[02:07:09] TEACHER: Then we come to get and then we come to delete, right?   {#2119}
[02:07:12] TEACHER: So you'll cover the entire thing around put.   {#2120}
[02:07:14] TEACHER: Then I'll move to the next one.   {#2121}
[02:07:15] TEACHER: Then we'll cover get.   {#2122}
[02:07:16] TEACHER: Then we'll cover delete and then we'll cover get.   {#2123}
[02:07:18] TEACHER: Okay.   {#2124}
[02:07:19] TEACHER: So to cover the put part, you said that every time I'm issuing or I'm getting a put operation.   {#2125}
[02:07:24] TEACHER: Yes.   {#2126}
[02:07:24] TEACHER: I will just create new entries into this file.   {#2127}
[02:07:29] TEACHER: K2 V2 and then K3 V3.   {#2128}
[02:07:32] TEACHER: And then let's say if I get another request,   {#2129}
[02:07:34] TEACHER: let's say now one changes.   {#2130}
[02:07:37] TEACHER: Someone issued a put on K1 with V1 dash.   {#2131}
[02:07:40] STUDENT_1: Now, I'm coming to that.   {#2132}
[02:07:42] STUDENT_1: So that's the next thing where we have to think about   {#2133}
[02:07:46] STUDENT_1: because we cannot go and figure it out   {#2134}
[02:07:48] STUDENT_1: where K1 was and change the value.   {#2135}
[02:07:51] STUDENT_1: So we will append it.   {#2136}
[02:07:55] STUDENT_1: We will continue append it only.   {#2137}
[02:07:59] STUDENT_1: We need to figure out another process which goals and market is like obsolete data   {#2138}
[02:08:06] STUDENT_1: or market for deletion or something like what they say,   {#2139}
[02:08:10] STUDENT_1: a stone process or whatever to stone process.   {#2140}
[02:08:15] STUDENT_1: We have to do it.   {#2141}
[02:08:17] STUDENT_1: But idea is always any foot comes, you go and add no matter what.   {#2142}
[02:08:24] TEACHER: No matter what.   {#2143}
[02:08:25] TEACHER: That's the best way.   {#2144}
[02:08:26] TEACHER: Perfect.   {#2145}
[02:08:27] TEACHER: So this is how you get the max performance out of put operation on a cheap magnetic disk storage.   {#2146}
[02:08:33] TEACHER: So put operation is started.   {#2147}
[02:08:37] TEACHER: You had your hands raised.   {#2148}
[02:08:39] TEACHER: I was going to pull you in.   {#2149}
[02:08:40] TEACHER: But let me go to Pankaj.   {#2150}
[02:08:41] TEACHER: Pankaj, how will you do deletes?   {#2151}
[02:08:45] TEACHER: Let's say I got a delete request and I want to delete a particular key.   {#2152}
[02:08:49] TEACHER: How will you delete?   {#2153}
[02:08:50] TEACHER: Let's say I say delete K2.   {#2154}
[02:08:52] TEACHER: What will you do now?   {#2155}
[02:08:54] STUDENT_5: Yeah. So, I mean, what I was thinking is somewhere from our previous discussion, again, that we can go to this key and set the value to be something which will never occur. Like if all the values are always positive, we can set it to minus one.   {#2156}
[02:09:10] TEACHER: So you are going back to that key.   {#2157}
[02:09:13] TEACHER: You're going over here and then deleting this and basically setting this to 0000 some special value.   {#2158}
[02:09:19] STUDENT_10: Yeah.   {#2159}
[02:09:20] TEACHER: But this is append only file.   {#2160}
[02:09:21] TEACHER: You cannot write to any other location.   {#2161}
[02:09:25] TEACHER: Because it's append only file.   {#2162}
[02:09:26] TEACHER: You cannot go back and do something.   {#2163}
[02:09:29] TEACHER: Like you can only read from the previous stuff, but you cannot write to a previous stuff.   {#2164}
[02:09:33] TEACHER: That's what append only file does.   {#2165}
[02:09:37] TEACHER: so you're not allowed to go back and write anything over here   {#2166}
[02:09:44] STUDENT_5: so uh okay i mean in that case we will have to maintain some version sort of thing saying   {#2167}
[02:09:52] STUDENT_5: that k2 has been deleted now so what can you do   {#2168}
[02:10:02] TEACHER: So which means now, now let's think from the first principles, we know how put works for   {#2169}
[02:10:08] TEACHER: us to delete.   {#2170}
[02:10:09] TEACHER: It's an append only file, but we have to write something that tells that K2 is deleted.   {#2171}
[02:10:13] TEACHER: So all we can do is append.   {#2172}
[02:10:16] STUDENT_5: Yes.   {#2173}
[02:10:17] STUDENT_5: Correct.   {#2174}
[02:10:18] STUDENT_5: So I mean, we can append something like K2 with minus one that, that shows it's been   {#2175}
[02:10:23] STUDENT_5: deleted.   {#2176}
[02:10:26] TEACHER: So effectively your delete operation is equal to put operation with some special value.   {#2177}
[02:10:34] TEACHER: Correct?   {#2178}
[02:10:35] TEACHER: Yes.   {#2179}
[02:10:36] TEACHER: Because put was order one like bare minimum, delete also becomes super efficient.   {#2180}
[02:10:41] TEACHER: Yes.   {#2181}
[02:10:42] TEACHER: Correct?   {#2182}
[02:10:43] TEACHER: So this is sorted.   {#2183}
[02:10:44] TEACHER: So we get the max out of our put, we get the best out of our delete.   {#2184}
[02:10:50] TEACHER: These two are sorted.   {#2185}
[02:10:51] TEACHER: Right?   {#2186}
[02:10:52] TEACHER: Okay.   {#2187}
[02:10:52] TEACHER: Now comes the next part.   {#2188}
[02:10:56] TEACHER: How would you power get now that in this file structure that we have,   {#2189}
[02:11:00] TEACHER: we have multiple entries of the same key.   {#2190}
[02:11:03] TEACHER: Now for us to perform get, what is the naive way of doing it?   {#2191}
[02:11:08] STUDENT_3: Just start looking at all the entries and return the latest one.   {#2192}
[02:11:12] TEACHER: Return the latest one that seems very poor, but you want the best   {#2193}
[02:11:17] TEACHER: performance out of get as well.   {#2194}
[02:11:18] TEACHER: So what will you do when your reads are slow?   {#2195}
[02:11:20] TEACHER: You make.   {#2196}
[02:11:26] TEACHER: okay so let's do that   {#2197}
[02:11:32] TEACHER: so how will you make it faster then how will it get work   {#2198}
[02:11:38] STUDENT_3: yeah so my mind like overall is still going towards what hey man had mentioned earlier   {#2199}
[02:11:43] STUDENT_3: like around having an sstable sort of structure here   {#2200}
[02:11:47] TEACHER: simple hash table right ss table is very different hash table is very different right   {#2201}
[02:11:51] STUDENT_3: yeah so for a hash table like we can like once we have put something into a write ahead log   {#2202}
[02:11:57] STUDENT_3: we maintain a hash table on the like as soon as it's appended to the   {#2203}
[02:12:01] STUDENT_3: well we update the hash table as well so the offset of it correct not the actual value   {#2204}
[02:12:07] STUDENT_3: Yeah.   {#2205}
[02:12:08] STUDENT_3: Uh, and, uh, whenever a read comes, we simply go to the offset in the well.   {#2206}
[02:12:16] STUDENT_3: And return that value.   {#2207}
[02:12:18] TEACHER: Read it because in up and only file you're allowed to do random reads, but you're not   {#2208}
[02:12:21] TEACHER: allowed to do random rates.   {#2209}
[02:12:23] STUDENT_3: Yeah.   {#2210}
[02:12:23] TEACHER: Okay.   {#2211}
[02:12:24] TEACHER: So just to cover it end to end, what would happen is let's say I got put K1 B1.   {#2212}
[02:12:30] TEACHER: I first write it to the disc over here and note with the offset.   {#2213}
[02:12:35] TEACHER: and then I update my in-memory hash table such that k1 points at o1. Then I received k2 v2.   {#2214}
[02:12:42] TEACHER: I update my in-memory with k2 o2 over here and let's say k3 goes to o3 over here and then let's   {#2215}
[02:12:51] TEACHER: say I got put k1 v1 dash. Now what will I do? I'll first write k1 v1 dash over here then go to my   {#2216}
[02:12:57] TEACHER: hash table and I update it k4 over here. So it goes over here and the first metric removes over   {#2217}
[02:13:03] TEACHER: here. Now let's say K2 is deleted.   {#2218}
[02:13:06] TEACHER: Now how, what, what deletes would look like?   {#2219}
[02:13:08] TEACHER: If I delete K2, I'll not point it over here.   {#2220}
[02:13:12] TEACHER: I just remove the entry from my memory hashtag.   {#2221}
[02:13:16] TEACHER: If the entry does not exist, it does not exist.   {#2222}
[02:13:19] TEACHER: Yeah.   {#2223}
[02:13:20] TEACHER: Now it's really simple.   {#2224}
[02:13:22] TEACHER: Now what if given that we have the structure first, let's look at how get   {#2225}
[02:13:27] TEACHER: works, if you'd want to converge or if you just want to consult on how gets   {#2226}
[02:13:33] TEACHER: What would be the flow?   {#2227}
[02:13:34] TEACHER: You get the request then.   {#2228}
[02:13:35] STUDENT_3: So you get the request.   {#2229}
[02:13:36] STUDENT_3: You look it up in the in-memory hash table.   {#2230}
[02:13:39] STUDENT_3: If the entry is not there, you simply return 404 or something.   {#2231}
[02:13:45] STUDENT_3: If it is present, you go to the val and you go to the offset and read that value.   {#2232}
[02:13:51] TEACHER: Perfect.   {#2233}
[02:13:51] TEACHER: Right?   {#2234}
[02:13:52] TEACHER: Okay.   {#2235}
[02:13:52] TEACHER: Now what if your machine died and because this is in-memory, it is gone.   {#2236}
[02:13:56] TEACHER: Now what?   {#2237}
[02:13:58] STUDENT_3: So you'll probably have to rebuild the indexes when you restart the server,   {#2238}
[02:14:03] STUDENT_3: video for a very long time.   {#2239}
[02:14:04] TEACHER: That's fine.   {#2240}
[02:14:05] TEACHER: When you restart, you just go through this entire file and rebuild this index.   {#2241}
[02:14:10] TEACHER: Yeah.   {#2242}
[02:14:11] TEACHER: Straight forward.   {#2243}
[02:14:12] TEACHER: So get order one, you are doing the bare minimum in get, you are doing bare minimum   {#2244}
[02:14:16] TEACHER: input.   {#2245}
[02:14:17] TEACHER: You are doing bare minimum in delete.   {#2246}
[02:14:19] STUDENT_3: Yeah.   {#2247}
[02:14:20] TEACHER: So it's the max that we could get out of this on a cheap magnetic disk storage.   {#2248}
[02:14:27] TEACHER: Right.   {#2249}
[02:14:27] TEACHER: So we just did read, write, update, read, write, update, delete, everything with full persistence.   {#2250}
[02:14:34] TEACHER: Right.   {#2251}
[02:14:35] TEACHER: But what else?   {#2252}
[02:14:36] TEACHER: What could go wrong over here, Siddesh?   {#2253}
[02:14:39] TEACHER: We have this one pile.   {#2254}
[02:14:40] TEACHER: We're putting these entries.   {#2255}
[02:14:41] TEACHER: What could go wrong?   {#2256}
---- OWNED SEGMENTS END ----

CTX| [02:14:50] STUDENT_2: I mean, availability is less because when you come back again, it takes a lot of time.   {#2257}
CTX| [02:14:56] TEACHER: That's fine.   {#2258}
CTX| [02:14:57] TEACHER: we're still okay with that. There are ways to make it better, but at least we have a naive approach to   {#2259}
CTX| [02:15:01] STUDENT_2: get started with. Another assumption is we can hold on to all the indexes in memory.   {#2260}
CTX| [02:15:08] TEACHER: That's an assumption that because you now you are limited by the amount of data you can fit in RAM.   {#2261}
CTX| [02:15:18] TEACHER: amount of index fit in RAM.   {#2262}
CTX| [02:15:22] TEACHER: It's not the values, but the keys.   {#2263}
CTX| [02:15:26] TEACHER: So you can add only as many keys as many you can keep in memory.   {#2264}
CTX| [02:15:31] TEACHER: Correct?   {#2265}
CTX| [02:15:32] TEACHER: So that's a limitation.   {#2266}
CTX| [02:15:33] TEACHER: Okay.   {#2267}
CTX| [02:15:34] TEACHER: But what else can go wrong?   {#2268}
CTX| [02:15:37] STUDENT_2: Another one is we are just appending to a file.   {#2269}
CTX| [02:15:40] STUDENT_2: So there is no disk garbage that we are collecting.   {#2270}
CTX| [02:15:44] STUDENT_2: We'll have to also figure that out.   {#2271}
CTX| [02:15:45] STUDENT_2: Like eventually our system will go out of space because we are not collecting anything from the disk.   {#2272}
