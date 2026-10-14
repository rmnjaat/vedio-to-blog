# chunk_10  OWNS 01:50:07 -> 02:03:28  (segments #1959-#2063, 1118 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:49:08] STUDENT_1: So we are making sure first   {#1946}
CTX| [01:49:09] STUDENT_1: the meta.json is updated.   {#1947}
CTX| [01:49:13] STUDENT_1: Yes.   {#1948}
CTX| [01:49:13] STUDENT_1: So in the deployment of my...   {#1949}
CTX| [01:49:16] STUDENT_1: in the change log process, I'm making sure file is created, then meta is updated,   {#1950}
CTX| [01:49:22] STUDENT_1: then only I'm sending this thing to the deployment server. Yes. Yes. Okay.   {#1951}
CTX| [01:49:29] STUDENT_1: Just I'm thinking about, can we do a bit better in place of creating a new VM whole deployment,   {#1952}
CTX| [01:49:37] STUDENT_1: It's a redeployment and it is just like a process that was reloaded at the startup.   {#1953}
CTX| [01:49:46] STUDENT_1: Yeah.   {#1954}
CTX| [01:49:47] STUDENT_1: Can we create something which is invoked?   {#1955}
CTX| [01:49:52] STUDENT_1: The whole thing is like going, heading from meta, creating the index and start serving   {#1956}
CTX| [01:49:57] STUDENT_1: of the hash table from server.   {#1957}
CTX| [01:49:59] STUDENT_1: This is the whole thing in place of doing the whole redeployment can be a wide of.   {#1958}

---- OWNED SEGMENTS START ----
[01:50:07] STUDENT_1: creating a new VM, doing the whole redeployment.   {#1959}
[01:50:10] STUDENT_1: Is there a better way we can do it?   {#1960}
[01:50:12] TEACHER: I, maybe I am like, no, there are, there are,   {#1961}
[01:50:15] TEACHER: I can imagine three ways to do it,   {#1962}
[01:50:17] TEACHER: but it's just, just make things little more complicated.   {#1963}
[01:50:19] TEACHER: For example, I'll give an example.   {#1964}
[01:50:20] STUDENT_13: Sure.   {#1965}
[01:50:21] TEACHER: What you can do is instead of doing redeployment of it,   {#1966}
[01:50:26] TEACHER: have like what I think Sitesh mentioned that just have API endpoints   {#1967}
[01:50:30] TEACHER: that would trigger reload of the API servers or trigger API servers,   {#1968}
[01:50:34] TEACHER: make it reactive instead of doing redeployment.   {#1969}
[01:50:37] TEACHER: seems big enough, just have API inputs experts that you invoke,   {#1970}
[01:50:40] TEACHER: which tells them to now go and pick the new file from S3.   {#1971}
[01:50:43] TEACHER: That's right.   {#1972}
[01:50:44] TEACHER: That is one way to do it.   {#1973}
[01:50:45] TEACHER: But I'm just making things simple because this is an out of the box approach.   {#1974}
[01:50:50] TEACHER: Thinking of triggering a deployment as part of an all server reload   {#1975}
[01:50:54] TEACHER: is an out of the box approach, which a lot of engineers just don't think about.   {#1976}
[01:50:59] TEACHER: So it's just that I'm proving you all to think in that direction   {#1977}
[01:51:03] TEACHER: that can we come up with something as simple   {#1978}
[01:51:07] TEACHER: I just triggered a problem because it's anyway, the cost remains exactly the same, but not   {#1979}
[01:51:12] TEACHER: having to have pull the metadata and file or do reactive or have reactive pubs up again.   {#1980}
[01:51:17] TEACHER: Now those sorts of complexities you can totally avoid.   {#1981}
[01:51:20] TEACHER: Right.   {#1982}
[01:51:21] TEACHER: And just that I chose this to prove you in the direction that we can, we control our   {#1983}
[01:51:25] TEACHER: own infrastructure so we can do something with it if we want.   {#1984}
[01:51:30] TEACHER: That's it.   {#1985}
[01:51:31] TEACHER: That's the only thing.   {#1986}
[01:51:32] TEACHER: Okay.   {#1987}
[01:51:32] TEACHER: But, but it can be done in a hundred percent.   {#1988}
[01:51:36] TEACHER: I'll tell you one more thing.   {#1989}
[01:51:37] TEACHER: Why should API servers read index from S3?   {#1990}
[01:51:40] TEACHER: What if in the updates that we are sending to API servers,   {#1991}
[01:51:42] TEACHER: what if we send the actual index data?   {#1992}
[01:51:44] TEACHER: It's just 1.7 MB, right?   {#1993}
[01:51:47] TEACHER: No need to reload the problem solved.   {#1994}
[01:51:50] TEACHER: You can change a lot of stuff.   {#1995}
[01:51:53] TEACHER: It's just that I pick one so that I can make a point on utilizing   {#1996}
[01:51:57] TEACHER: our infrastructure calls to get something done.   {#1997}
[01:52:01] STUDENT_1: Okay.   {#1998}
[01:52:01] STUDENT_1: Got it.   {#1999}
[01:52:02] STUDENT_1: Thank you.   {#2000}
[01:52:02] STUDENT_1: Now I'm clear.   {#2001}
[01:52:03] TEACHER: Yeah.   {#2002}
[01:52:04] TEACHER: Okay.   {#2003}
[01:52:05] TEACHER: Let's folks, we'll go on a break.   {#2004}
[01:52:07] TEACHER: break till 11 it's 10 52 already we'll take a break till 11 and then we come back we'll discuss   {#2005}
[01:52:15] TEACHER: super fast db again very similar to what we discussed on word dictionary but we'll build   {#2006}
[01:52:21] TEACHER: a super fast db a very practical example everyone uses it unknowingly uh and we'll make order one   {#2007}
[01:52:29] TEACHER: reads order one writes order one deletes with persistence right and this is where we'll go a   {#2008}
[01:52:34] TEACHER: little more deeper into what the file format should be because right now we just work with   {#2009}
[01:52:38] TEACHER: simple csvs but that's not how this is actually stored right we'll go deeper into it and build   {#2010}
[01:52:44] TEACHER: another database which is lightning pass database that gets the max performance out of your hard   {#2011}
[01:52:49] TEACHER: disk and that's the highlight of it and we all are using it unknowingly right so we'll talk about   {#2012}
[01:52:56] TEACHER: it in depth when we come back from the break we'll resume at uh 11 of now right seven minutes   {#2013}
[01:53:02] TEACHER: from them right thanks folks see you folks at 11.   {#2014}
[01:53:32] TEACHER: Thank you.   {#2015}
[01:54:02] TEACHER: Thank you.   {#2016}
[01:54:32] TEACHER: Thank you.   {#2017}
[01:55:02] TEACHER: Thank you.   {#2018}
[01:55:32] TEACHER: Thank you.   {#2019}
[01:56:02] TEACHER: Thank you.   {#2020}
[01:56:32] TEACHER: Thank you.   {#2021}
[01:57:02] TEACHER: Thank you.   {#2022}
[01:57:32] TEACHER: Thank you.   {#2023}
[01:58:02] TEACHER: Thank you.   {#2024}
[01:58:32] TEACHER: Thank you.   {#2025}
[01:59:03] TEACHER: Thank you.   {#2026}
[01:59:52] TEACHER: okay let's start with the second half for second second part for today is we'll now talk about   {#2027}
[01:59:59] TEACHER: building a super fast key value store on top of very commodity hardware cheap magnetic hard disk   {#2028}
[02:00:07] TEACHER: right we want best of everything read write upgrade delete persistence everything we want   {#2029}
[02:00:12] TEACHER: so first before we start our brainstorming uh what we what i would want to talk about is how   {#2030}
[02:00:19] TEACHER: magnetic disk works so first of all if you were to use we are all we all are so used to using ssds   {#2031}
[02:00:29] TEACHER: fast and all but they are very costly so if i were to put cache like your cpu cache your l1 cache   {#2032}
[02:00:38] TEACHER: your ssds your magnetic disk storage your tape storage right so if this is your memory   {#2033}
[02:00:45] TEACHER: this is your magnetic disk storage this is where your ssd lies so ssds are more closer to memory   {#2034}
[02:00:55] TEACHER: as compared to hard disk with respect to speed and with respect to cost.   {#2035}
[02:00:59] TEACHER: So getting an SSD is very costly as compared to getting a magnetic disk storage.   {#2036}
[02:01:08] TEACHER: So which is where you are storing huge amount of data.   {#2037}
[02:01:11] TEACHER: You don't store it on SSDs.   {#2038}
[02:01:13] TEACHER: You store it on magnetic disk storage.   {#2039}
[02:01:17] TEACHER: Now magnetic disk storage, what are they?   {#2040}
[02:01:19] TEACHER: It's that classic disk based storage where you have a head   {#2041}
[02:01:25] TEACHER: head rotates like this in this motion while your disc spins.   {#2042}
[02:01:31] TEACHER: So when you issue a read of something like read of a particular byte offset, that thing   {#2043}
[02:01:38] TEACHER: gets translated to a particular disc on that particular disc, a particular sector in that   {#2044}
[02:01:48] TEACHER: particular sector, a possible offset.   {#2045}
[02:01:50] TEACHER: right so you say on this file at this byte this exists it then translates into on this disk in   {#2046}
[02:02:00] TEACHER: this sector at this offset it lies in right so this is how it works so now when your disk is   {#2047}
[02:02:08] TEACHER: moving and you are issuing a read command let's say read from this from this sector from this   {#2048}
[02:02:14] TEACHER: right from this particular thing what happens is your magnetic head movement so this moves   {#2049}
[02:02:20] TEACHER: to that location magnetic head comes to that point read that particular part and sends it to   {#2050}
[02:02:26] TEACHER: the device driver and then it goes to the user space and you consume it so there is this actual   {#2051}
[02:02:31] TEACHER: physical movement which is happening for you to read this part over there right so the head needs   {#2052}
[02:02:37] TEACHER: to be moved the disc needs to rotate you read that then some other read comes in so it moves   {#2053}
[02:02:44] TEACHER: mechanical movement that happens on the disk is the most time-consuming process right so this is   {#2054}
[02:02:52] TEACHER: how magnetic disk works now we are building a super fast key value store that works on these   {#2055}
[02:03:00] TEACHER: cheap magnetic disk storage right so now how would you build it right let's start with and   {#2056}
[02:03:09] TEACHER: Given what we want to do is we want to support operations like put, get, delete.   {#2057}
[02:03:16] TEACHER: That's it.   {#2058}
[02:03:18] TEACHER: Right.   {#2059}
[02:03:18] TEACHER: But the key thing is we don't want to miss out on persistence.   {#2060}
[02:03:21] TEACHER: So we have to persist everything.   {#2061}
[02:03:23] TEACHER: So how would a put look like?   {#2062}
[02:03:26] TEACHER: Amen.   {#2063}
---- OWNED SEGMENTS END ----

CTX| [02:03:28] STUDENT_1: Okay.   {#2064}
CTX| [02:03:29] STUDENT_1: I mean, whatever the requirement you have given, it looks like fitting in the way that   {#2065}
CTX| [02:03:39] STUDENT_1: structure of a mem table or SS table works, you have something in memory as a sorted map.   {#2066}
CTX| [02:03:47] TEACHER: No, no, immediately. I want to persist immediately. When I say put it, it is to immediately flush to the disk.   {#2067}
CTX| [02:03:54] STUDENT_1: Oh, okay. Then if you have to immediately plus it.   {#2068}
CTX| [02:04:06] STUDENT_1: Okay.   {#2069}
CTX| [02:04:07] STUDENT_1: So let me understand.   {#2070}
CTX| [02:04:10] STUDENT_1: Maybe we are saying that as soon as the request comes,   {#2071}
CTX| [02:04:14] STUDENT_1: we will be able to persist it on the disk.   {#2072}
CTX| [02:04:19] STUDENT_1: Persist it at the disk for each put call.   {#2073}
CTX| [02:04:23] STUDENT_1: Yeah.   {#2074}
CTX| [02:04:25] STUDENT_1: Okay.   {#2075}
CTX| [02:04:27] STUDENT_1: I mean, then the best thing is like you create a ledger,   {#2076}
