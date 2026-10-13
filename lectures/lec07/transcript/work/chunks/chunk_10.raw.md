# chunk_10  OWNS 01:48:29 -> 02:01:38  (segments #1988-#2154, 1444 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:47:35] STUDENT_2: read or update different   {#1962}
CTX| [01:47:38] STUDENT_2: data, different   {#1963}
CTX| [01:47:39] STUDENT_2: keys, okay, then   {#1964}
CTX| [01:47:42] STUDENT_2: over here, our system   {#1965}
CTX| [01:47:43] STUDENT_2: will be underperforming, right?   {#1966}
CTX| [01:47:45] TEACHER: No, it does not. That's what the magic   {#1967}
CTX| [01:47:47] TEACHER: is. Single-threaded systems, they are not   {#1968}
CTX| [01:47:49] TEACHER: blocked.   {#1969}
CTX| [01:47:51] TEACHER: Basically, watch that video.   {#1970}
CTX| [01:47:53] TEACHER: In my Redis internal series, watch that video.   {#1971}
CTX| [01:47:55] TEACHER: The first three videos that I put out for free,   {#1972}
CTX| [01:47:58] TEACHER: watch that video. You will understand whatever.   {#1973}
CTX| [01:48:00] TEACHER: It is not blocking.   {#1974}
CTX| [01:48:01] TEACHER: That's how concurrent systems are built.   {#1975}
CTX| [01:48:05] STUDENT_2: Got it.   {#1976}
CTX| [01:48:06] TEACHER: Can I ask a question regarding consistent hashing?   {#1977}
CTX| [01:48:09] TEACHER: And then we are yet to cover that.   {#1978}
CTX| [01:48:11] TEACHER: Okay.   {#1979}
CTX| [01:48:12] TEACHER: That's a huge discussion that is coming up.   {#1980}
CTX| [01:48:14] TEACHER: That's high level part.   {#1981}
CTX| [01:48:15] TEACHER: We'll talk about it after the.   {#1982}
CTX| [01:48:18] STUDENT_6: Got it.   {#1983}
CTX| [01:48:18] STUDENT_6: Yeah.   {#1984}
CTX| [01:48:19] STUDENT_6: Got it.   {#1985}
CTX| [01:48:20] STUDENT_6: Hey, can you please go back to the slide where we talked about sizes, computing sizes of   {#1986}
CTX| [01:48:25] STUDENT_6: the hash table.   {#1987}

---- OWNED SEGMENTS START ----
[01:48:29] STUDENT_6: Over there, we were still calculating the size of actual structure and not the.   {#1988}
[01:48:35] TEACHER: value of node.   {#1989}
[01:48:36] TEACHER: No, but value of node great point.   {#1990}
[01:48:38] TEACHER: But this node is also you are allocating it, right?   {#1991}
[01:48:41] TEACHER: Let's say this is Bloom filter.   {#1992}
[01:48:42] TEACHER: You're allocating Bloom filter.   {#1993}
[01:48:44] TEACHER: So you see my lock while you're allocating the Bloom filter as well.   {#1994}
[01:48:49] STUDENT_6: No, but what Nalloc accepts is the size of the structure.   {#1995}
[01:48:52] STUDENT_6: My value itself, right?   {#1996}
[01:48:54] TEACHER: No, but Bloom filter is also a structure, right?   {#1997}
[01:48:58] TEACHER: Let's say you are storing Bloom filter.   {#1998}
[01:49:00] TEACHER: How will you allocate a Bloom filter?   {#1999}
[01:49:04] TEACHER: The actual value, this is also value you need to allocate this.   {#2000}
[01:49:07] TEACHER: Right.   {#2001}
[01:49:10] TEACHER: You would allocate that as well.   {#2002}
[01:49:13] TEACHER: Let's say you're doing a set allocation.   {#2003}
[01:49:15] TEACHER: So you create a set, not my value.   {#2004}
[01:49:18] TEACHER: My value is just a wrapper.   {#2005}
[01:49:19] TEACHER: So every single thing that you're allocating, you're wrapping it over here.   {#2006}
[01:49:24] TEACHER: So you are not, instead of invoking only malloc, you're invoking Z malloc for every allocation,   {#2007}
[01:49:31] TEACHER: you're allocating ever in your cache ever.   {#2008}
[01:49:35] TEACHER: You are doing it with Zmela.   {#2009}
[01:49:36] TEACHER: We don't call it on structure.   {#2010}
[01:49:39] TEACHER: Uh, we call it on the object.   {#2011}
[01:49:41] TEACHER: Is that what you mean?   {#2012}
[01:49:41] TEACHER: Everywhere.   {#2013}
[01:49:42] TEACHER: Yeah.   {#2014}
[01:49:42] TEACHER: Yeah.   {#2015}
[01:49:42] TEACHER: Even this object allocation will be Zmela.   {#2016}
[01:49:45] TEACHER: Even this will be Zmela.   {#2017}
[01:49:47] TEACHER: Everything that you're invoking is rather than Zmela.   {#2018}
[01:49:51] TEACHER: Okay.   {#2019}
[01:49:52] STUDENT_6: And this experiment that you just showed on your blog, uh, where you use   {#2020}
[01:49:56] STUDENT_6: netcat, can't we use it like as a hack everywhere where we have   {#2021}
[01:50:01] STUDENT_6: ECB to SDB.   {#2022}
[01:50:02] STUDENT_6: Yeah.   {#2023}
[01:50:04] TEACHER: Then it's just a narrow text that you are sending and your server is understanding.   {#2024}
[01:50:09] STUDENT_6: Okay.   {#2025}
[01:50:11] STUDENT_6: Thanks.   {#2026}
[01:50:12] TEACHER: Great.   {#2027}
[01:50:15] TEACHER: Basically Rajiv and Anupam want to take your question in some time.   {#2028}
[01:50:19] TEACHER: We still have a lot to cover.   {#2029}
[01:50:20] TEACHER: Now it's time to make our cash distributed.   {#2030}
[01:50:22] TEACHER: But before we do that, let's go on a break.   {#2031}
[01:50:25] TEACHER: Then we talk about making a distributed and then I'll take questions.   {#2032}
[01:50:31] TEACHER: cover a lot of it.   {#2033}
[01:50:33] TEACHER: Okay, so let's go on a break for five minutes.   {#2034}
[01:50:35] TEACHER: We'll sink back at 10.55 in five minutes   {#2035}
[01:50:37] TEACHER: and talk about the high-level design of   {#2036}
[01:50:39] TEACHER: 10 making it distributed.   {#2037}
[01:50:42] TEACHER: Thanks, folks.   {#2038}
[01:50:43] TEACHER: See you in five minutes.   {#2039}
[01:54:06] TEACHER: Thank you.   {#2040}
[01:54:56] TEACHER: Let's start with the second half.   {#2041}
[01:54:59] TEACHER: And now we talk about, let me just quickly check on why I get this.   {#2042}
[01:55:04] TEACHER: Oh, sorry.   {#2043}
[01:55:05] TEACHER: Speaker is set to different speakers.   {#2044}
[01:55:14] STUDENT_9: Great.   {#2045}
[01:55:15] STUDENT_9: Mic speaker.   {#2046}
[01:55:17] STUDENT_9: Okay.   {#2047}
[01:55:18] TEACHER: Now let's make our cache distributed.   {#2048}
[01:55:20] TEACHER: Why?   {#2049}
[01:55:21] TEACHER: Because now, first of all, why do you want to make things distributed?   {#2050}
[01:55:24] TEACHER: Because one node is not able to handle the load.   {#2051}
[01:55:28] TEACHER: When one node is not able to handle enough load, that's where you are distributing the   {#2052}
[01:55:34] TEACHER: cache across multiple machines.   {#2053}
[01:55:37] TEACHER: So we'll brainstorm on four or five things.   {#2054}
[01:55:40] TEACHER: First is storage, second routing, third availability, fourth reliability, fifth scaling.   {#2055}
[01:55:44] TEACHER: We'll talk about all of them in detail and understand how it works.   {#2056}
[01:55:50] TEACHER: So let's start with storage.   {#2057}
[01:55:51] TEACHER: That's the easiest place to start.   {#2058}
[01:55:53] TEACHER: How will you make your cache distributed?   {#2059}
[01:55:55] TEACHER: I'll give that answer.   {#2060}
[01:55:57] TEACHER: I'll give an answer.   {#2061}
[01:55:58] TEACHER: for this and then we'll start the actual conversation.   {#2062}
[01:56:01] TEACHER: So storage is pretty much sorted at one node is not enough to handle the data or the load.   {#2063}
[01:56:06] TEACHER: What we do, we take the exact same cache that we have and we create multiple instances of   {#2064}
[01:56:14] TEACHER: it, each handling a range.   {#2065}
[01:56:18] TEACHER: Let's say a to J, K to T, U to Z.   {#2066}
[01:56:25] TEACHER: Just giving an example.   {#2067}
[01:56:26] TEACHER: So it's a classic way to have a distributed cache.   {#2068}
[01:56:31] TEACHER: This is the exact same single node implementation that we had.   {#2069}
[01:56:35] TEACHER: Exact same single node implementation.   {#2070}
[01:56:37] TEACHER: But now we have just split the load in different mutually exclusive subsets of keys   {#2071}
[01:56:45] TEACHER: and put it into three different nodes.   {#2072}
[01:56:49] TEACHER: So we just distributed our storage.   {#2073}
[01:56:52] TEACHER: But now this adds a complexity.   {#2074}
[01:56:56] TEACHER: That when you have a client want to talk to or store a particular key, how would it talk   {#2075}
[01:57:08] TEACHER: to?   {#2076}
[01:57:08] TEACHER: How would it know which one to talk to?   {#2077}
[01:57:11] TEACHER: So let's say this is my cache one.   {#2078}
[01:57:13] TEACHER: This is my cache two.   {#2079}
[01:57:14] TEACHER: This is my cache three.   {#2080}
[01:57:15] TEACHER: How would my client data for client?   {#2081}
[01:57:18] TEACHER: How would it store or access the data in a particular cache belonging to a particular   {#2082}
[01:57:24] TEACHER: range?   {#2083}
[01:57:24] TEACHER: Right?   {#2084}
[01:57:26] STUDENT_1: it raise your hands quick raise of hands heaven uh maybe the first thing what we are trying to do is   {#2085}
[01:57:36] STUDENT_1: to divide the whole uh key space let's say we are we did that we have this range now we did that now   {#2086}
[01:57:45] STUDENT_1: Now we have to make a central place where this division is saved saying like, okay,   {#2087}
[01:57:55] STUDENT_1: A to J will go to C1, K to T will go to C2 and U to Z will go to C3.   {#2088}
[01:58:01] STUDENT_1: So that's the one logic we have to create where the client will connect and first get to know where I have to communicate.   {#2089}
[01:58:12] STUDENT_1: Where would you store this?   {#2090}
[01:58:15] STUDENT_1: This has to be in a place which we are exposing to the cloud saying that,   {#2091}
[01:58:19] STUDENT_1: okay, if you have to connect to our distributed system,   {#2092}
[01:58:22] STUDENT_1: this is the place you will send your first request to get to know.   {#2093}
[01:58:26] STUDENT_1: And then we'll let you know which is the C1.   {#2094}
[01:58:31] STUDENT_1: Let's say if the request is for A to J.   {#2095}
[01:58:33] STUDENT_1: So first request comes to a central place.   {#2096}
[01:58:35] STUDENT_1: It divides that routing or path finding for C1 and C2.   {#2097}
[01:58:41] STUDENT_1: and the request is redirected.   {#2098}
[01:58:45] TEACHER: Who is redirecting the request?   {#2099}
[01:58:47] TEACHER: So client talk to this routing layer.   {#2100}
[01:58:49] TEACHER: Now this routing layer responds to the client   {#2101}
[01:58:51] TEACHER: or routing layer forwards the request?   {#2102}
[01:58:54] STUDENT_1: I mean, there are pros and cons in both cases in my understanding.   {#2103}
[01:58:58] STUDENT_1: It's not a state that always you do the same.   {#2104}
[01:59:03] STUDENT_1: Different systems do a different way.   {#2105}
[01:59:06] TEACHER: Perfect.   {#2106}
[01:59:07] TEACHER: Thanks, you have very solid understanding.   {#2107}
[01:59:10] TEACHER: Brilliant.   {#2108}
[01:59:11] TEACHER: which is what I want to talk about next.   {#2109}
[01:59:13] TEACHER: So what we just added,   {#2110}
[01:59:15] TEACHER: and this holds true for any distributed storage system in general,   {#2111}
[01:59:21] TEACHER: any distributed storage system.   {#2112}
[01:59:22] TEACHER: So the challenge is we just split our storage   {#2113}
[01:59:25] TEACHER: across N mutually exclusive subsets of data.   {#2114}
[01:59:29] TEACHER: Now we need to talk to,   {#2115}
[01:59:31] TEACHER: so our client needs to talk to one of them and store the data.   {#2116}
[01:59:34] TEACHER: Now there are four ways to do it.   {#2117}
[01:59:37] TEACHER: You can come up with a fifth way,   {#2118}
[01:59:38] TEACHER: happy to hand it over here,   {#2119}
[01:59:41] TEACHER: ways to do it and the analogy that I take over here is you visiting a bank.   {#2120}
[01:59:46] TEACHER: When you visit a bank, let's say you enter the bank or like you are just going to a bank.   {#2121}
[01:59:54] TEACHER: What do you do?   {#2122}
[01:59:55] TEACHER: When you enter the bank, it's very much possible that there is a pune that is there.   {#2123}
[02:00:03] TEACHER: You go to a bank, the first person you interact with is the pune that is there on the door   {#2124}
[02:00:08] TEACHER: and he says, hey, I want to do XYZ.   {#2125}
[02:00:11] TEACHER: The apparel says, hey, you don't worry.   {#2126}
[02:00:13] TEACHER: I'll do it for you.   {#2127}
[02:00:15] TEACHER: He takes some commission.   {#2128}
[02:00:17] TEACHER: He takes some driver, whatever you may call it.   {#2129}
[02:00:19] TEACHER: And he gets a thing for you.   {#2130}
[02:00:22] TEACHER: So this is what your standard way of having a proxy is.   {#2131}
[02:00:27] TEACHER: That you talk to the proxy.   {#2132}
[02:00:29] TEACHER: The proxy does that thing for you.   {#2133}
[02:00:32] TEACHER: So this is what you see as the first type of interaction in the bank.   {#2134}
[02:00:38] TEACHER: nothing about how many tables are there, how many departments are there in the bank.   {#2135}
[02:00:42] TEACHER: The PUNE is the point of contact for you.   {#2136}
[02:00:45] TEACHER: So you go to the PUNE, PUNE gets things done for you.   {#2137}
[02:00:48] TEACHER: This is one way.   {#2138}
[02:00:50] TEACHER: Second is where after visiting a bank for a very long time, you know which desk to go   {#2139}
[02:00:57] TEACHER: to, where to go to, to get something done.   {#2140}
[02:00:59] TEACHER: Let's say you want to deposit a check.   {#2141}
[02:01:00] TEACHER: You directly go to that particular desk because you are now know, you know that information   {#2142}
[02:01:04] TEACHER: that, hey, this is where I want to go to get this particular thing done.   {#2143}
[02:01:08] TEACHER: No one has to tell you that.   {#2144}
[02:01:09] TEACHER: So this is where your client itself is smart enough to know   {#2145}
[02:01:13] TEACHER: where to go to to get things done.   {#2146}
[02:01:15] TEACHER: Which means that in this case, if you go with this approach,   {#2147}
[02:01:19] TEACHER: this routing information is with client itself   {#2148}
[02:01:22] TEACHER: and there is no need of router.   {#2149}
[02:01:23] TEACHER: So the client knows the existence of all the tables,   {#2150}
[02:01:27] TEACHER: all the departments of the bank.   {#2151}
[02:01:29] TEACHER: And it knows if I want to get something,   {#2152}
[02:01:31] TEACHER: here's where I want to go.   {#2153}
[02:01:34] TEACHER: So this is where your client knows.   {#2154}
---- OWNED SEGMENTS END ----

CTX| [02:01:38] TEACHER: Now, disadvantage of this, if tomorrow bank changes this responsibility to some other desk,   {#2155}
CTX| [02:01:44] TEACHER: you need to know that's a disadvantage.   {#2156}
CTX| [02:01:46] TEACHER: So your client needs to know whenever something changes,   {#2157}
CTX| [02:01:48] TEACHER: all of your clients needs to be notified about it.   {#2158}
CTX| [02:01:50] TEACHER: That's okay.   {#2159}
CTX| [02:01:51] TEACHER: But that is the disadvantage of that.   {#2160}
CTX| [02:01:53] TEACHER: But there is an advantage that there is no intermediate hop required.   {#2161}
CTX| [02:01:56] TEACHER: You save on the bribe that you are paying, which is in this case network latency.   {#2162}
CTX| [02:01:59] TEACHER: This is such a beautiful example.   {#2163}
CTX| [02:02:02] TEACHER: But you are just saving on that extra bribe that you are paying today,   {#2164}
CTX| [02:02:05] TEACHER: which is your network latency.   {#2165}
CTX| [02:02:09] TEACHER: So these two ways.   {#2166}
CTX| [02:02:10] TEACHER: Now the third one is let's say you enter the bank.   {#2167}
CTX| [02:02:15] TEACHER: There is no pune.   {#2168}
CTX| [02:02:16] TEACHER: There is no pune.   {#2169}
CTX| [02:02:17] TEACHER: Where would you go?   {#2170}
CTX| [02:02:18] TEACHER: If there is no pune, when you enter the bank, you want something done.   {#2171}
CTX| [02:02:22] TEACHER: You typically go to the first desk that you find.   {#2172}
CTX| [02:02:24] TEACHER: I'll take your caution.   {#2173}
CTX| [02:02:25] TEACHER: Please, please lower your hand.   {#2174}
CTX| [02:02:27] TEACHER: I'll take the caution.   {#2175}
CTX| [02:02:28] TEACHER: Wait.   {#2176}
CTX| [02:02:30] TEACHER: This is why it breaks my flow.   {#2177}
CTX| [02:02:32] TEACHER: So now in the third case, you entered the bank.   {#2178}
CTX| [02:02:35] TEACHER: There is no pune.   {#2179}
CTX| [02:02:36] TEACHER: There is no central authority that you are going on.   {#2180}
