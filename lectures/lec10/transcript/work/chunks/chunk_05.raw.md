# chunk_05  OWNS 00:50:26 -> 01:02:35  (segments #889-#1083, 1901 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:49:30] TEACHER: as just one file instead of shipping multiple files.   {#873}
CTX| [00:49:35] TEACHER: Okay.   {#874}
CTX| [00:49:36] TEACHER: So that does this.   {#875}
CTX| [00:49:38] TEACHER: Now we'll touch upon infrastructure side of things.   {#876}
CTX| [00:49:41] TEACHER: So now here what we build, we build an understanding of, we build an understanding of something   {#877}
CTX| [00:49:48] TEACHER: really interesting.   {#878}
CTX| [00:49:49] TEACHER: How a file format is importance of portability, headers, where they come in handy indexing   {#879}
CTX| [00:49:55] TEACHER: to make reads faster.   {#880}
CTX| [00:49:57] TEACHER: Now let's come to the next part.   {#881}
CTX| [00:49:59] TEACHER: How do you push it?   {#882}
CTX| [00:50:01] TEACHER: How do you serve the actual user request?   {#883}
CTX| [00:50:04] TEACHER: Right.   {#884}
CTX| [00:50:05] TEACHER: I'll lay the seed foundation and then we'll improve on the design.   {#885}
CTX| [00:50:09] TEACHER: So what we may think that our end user who will be querying on this, obviously we would   {#886}
CTX| [00:50:16] TEACHER: have a load balance or something where after which you get a bunch of, I had to create a   {#887}
CTX| [00:50:22] TEACHER: load balancer.   {#888}

---- OWNED SEGMENTS START ----
[00:50:26] TEACHER: So let's say we create a load balancer, request from an end user comes to load balancer.   {#889}
[00:50:32] TEACHER: Behind the load balancer, we have bunch of API servers whose job is to serve the incoming   {#890}
[00:50:39] TEACHER: requests that are there.   {#891}
[00:50:40] TEACHER: So now what would be the request flow look like?   {#892}
[00:50:43] TEACHER: So this is a load balancer on which you got the request.   {#893}
[00:50:48] TEACHER: These are the API servers.   {#894}
[00:50:51] STUDENT_2: API server one.   {#895}
[00:50:56] STUDENT_2: API not a good place to write.   {#896}
[00:51:04] TEACHER: Okay.   {#897}
[00:51:05] TEACHER: A classic case.   {#898}
[00:51:06] TEACHER: A user, a load balancer and an API server.   {#899}
[00:51:09] TEACHER: This is a file that we have.   {#900}
[00:51:11] TEACHER: Now where would we store this file?   {#901}
[00:51:14] TEACHER: For us to serve this request or handle this request, we are exposing a get endpoint.   {#902}
[00:51:21] TEACHER: So slash word is we are exposing and we are doing a get on it and we get the meaning around it.   {#903}
[00:51:28] TEACHER: Right?   {#904}
[00:51:28] TEACHER: So this is the request that user fires and I want to get the meaning from this.   {#905}
[00:51:32] TEACHER: The request comes to a load balancer, load balancer forwards it to one of this instance.   {#906}
[00:51:36] TEACHER: Now, what would this instance do?   {#907}
[00:51:38] TEACHER: Where is this file?   {#908}
[00:51:40] TEACHER: Query.   {#909}
[00:51:40] TEACHER: Right?   {#910}
[00:51:41] TEACHER: We defined the file format.   {#911}
[00:51:43] TEACHER: to provide a way to query it or and way to fire http request on that how does that flow look like   {#912}
[00:51:50] TEACHER: anyone   {#913}
[00:51:56] STUDENT_11: kyanav   {#914}
[00:51:59] STUDENT_3: so can we have a shared disk storage for all the api servers that they can query to get the file   {#915}
[00:52:07] TEACHER: But why not store this one file on every server?   {#916}
[00:52:10] TEACHER: What's the harm in that?   {#917}
[00:52:14] STUDENT_3: That would make the update process a bit more tedious, but if we are fine with that, then   {#918}
[00:52:19] STUDENT_3: we can also do that.   {#919}
[00:52:21] TEACHER: Okay.   {#920}
[00:52:22] TEACHER: It would make update tedious.   {#921}
[00:52:25] TEACHER: Why?   {#922}
[00:52:26] STUDENT_3: So whenever there is a change in, let's say a few hundred words, we have to make that   {#923}
[00:52:31] STUDENT_3: change happen on each of the API servers.   {#924}
[00:52:33] STUDENT_3: some of the API servers might not be available at the time   {#925}
[00:52:36] STUDENT_3: when we are trying to make that update.   {#926}
[00:52:38] STUDENT_3: Then we have to wait for them to be available.   {#927}
[00:52:41] TEACHER: But updates are not real time.   {#928}
[00:52:43] TEACHER: Updates are weekly.   {#929}
[00:52:45] TEACHER: Is that still a problem?   {#930}
[00:52:46] TEACHER: Every Sunday you are making one update in bulk.   {#931}
[00:52:56] TEACHER: It's not a key value store where you are right   {#932}
[00:52:58] TEACHER: or you can update anytime you like.   {#933}
[00:53:00] TEACHER: Correct?   {#934}
[00:53:01] TEACHER: It's a weekly update.   {#935}
[00:53:03] TEACHER: Every Sunday you'll get a file from Oxford.   {#936}
[00:53:05] TEACHER: You would say, okay, these are the new words.   {#937}
[00:53:07] TEACHER: These are the new meanings.   {#938}
[00:53:08] TEACHER: Go and update your data.   {#939}
[00:53:10] TEACHER: Right?   {#940}
[00:53:12] STUDENT_3: Yes, that's correct.   {#941}
[00:53:14] STUDENT_3: But like what another angle that I'm thinking of is what if like the updates   {#942}
[00:53:20] STUDENT_3: fail for a particular set of a file, then we would have data inconsistency.   {#943}
[00:53:24] TEACHER: So let's say what drastic would change if there is data inconsistency because   {#944}
[00:53:29] TEACHER: meanings are not dramatically changing.   {#945}
[00:53:31] TEACHER: Right?   {#946}
[00:53:33] TEACHER: You may have inconsistency in data in case your update partially fails, but it's a meaning.   {#947}
[00:53:40] TEACHER: So apple, you might have a meaning which says a fruit.   {#948}
[00:53:43] TEACHER: Tomorrow you might have a meaning that says around fruit.   {#949}
[00:53:46] TEACHER: Is this an end of a word?   {#950}
[00:53:48] TEACHER: No, right?   {#951}
[00:53:52] TEACHER: But it's a valid point.   {#952}
[00:53:53] TEACHER: I'm not denying it, but just that I'm probing you more to think on those lines.   {#953}
[00:53:57] TEACHER: What else is wrong with this approach?   {#954}
[00:54:00] TEACHER: And why are you going?   {#955}
[00:54:02] TEACHER: Because what I'm trying to do is when you are, when you are proposing a solution, you   {#956}
[00:54:07] TEACHER: should have thought of other disadvantages, like, uh, sorry, you should have thought of   {#957}
[00:54:11] TEACHER: disadvantages of other part in depth, which is what I'm trying to prove.   {#958}
[00:54:15] TEACHER: Right.   {#959}
[00:54:15] TEACHER: What else could go wrong?   {#960}
[00:54:17] TEACHER: So you said update tedious, correct.   {#961}
[00:54:19] TEACHER: You said data inconsistency, but in both cases, both of them are not a problem yet.   {#962}
[00:54:24] TEACHER: What else is a problem?   {#963}
[00:54:33] TEACHER: If you store the files, the same dictionary file across all the three servers, what else   {#964}
[00:54:39] TEACHER: is a problem?   {#965}
[00:54:41] STUDENT_3: Like we are having a lot of duplicated costs of saving the file, one DB file on a lot of   {#966}
[00:54:46] STUDENT_3: servers.   {#967}
[00:54:47] STUDENT_3: So which we can optimize for.   {#968}
[00:54:52] TEACHER: Biggest pain, cost.   {#969}
[00:54:57] TEACHER: Biggest inconsistency is okay.   {#970}
[00:54:59] TEACHER: Updates, tedious, okay.   {#971}
[00:55:01] TEACHER: Cost.   {#972}
[00:55:01] TEACHER: A real world system design is all about doing things,   {#973}
[00:55:06] TEACHER: doing the bare minimum things at the bare minimum cost.   {#974}
[00:55:09] TEACHER: Always remember this.   {#975}
[00:55:10] TEACHER: If you are not thinking about cost, then you are not building good systems.   {#976}
[00:55:14] TEACHER: Because you cannot, because in order to make anything faster,   {#977}
[00:55:18] TEACHER: just throw a lot of money at a cloud provider, get a bunch of RAM,   {#978}
[00:55:22] TEACHER: store everything in memory, problem solved.   {#979}
[00:55:25] TEACHER: If I can have one terabyte RAM over here on each of this machine, I can just load the   {#980}
[00:55:31] TEACHER: entire dictionary in memory.   {#981}
[00:55:32] TEACHER: No need of creating index, nothing, just one hash table containing one terabyte of data.   {#982}
[00:55:37] TEACHER: But that's not a good solution.   {#983}
[00:55:39] TEACHER: Because it's not cost effective.   {#984}
[00:55:41] TEACHER: So cost is something that should come to your mind.   {#985}
[00:55:44] TEACHER: Like the first thing that is the solution that you're designing is this cost efficient   {#986}
[00:55:48] TEACHER: or not.   {#987}
[00:55:50] TEACHER: Okay.   {#988}
[00:55:50] TEACHER: Why is this cost inefficient?   {#989}
[00:55:54] TEACHER: duplicating the data that you have in external disks that you are storing and you would be   {#990}
[00:55:59] TEACHER: storing it in SSDs.   {#991}
[00:56:00] TEACHER: SSDs or any disk is very costly.   {#992}
[00:56:03] TEACHER: Cost of one terabyte SSD that you need and let's say if your dictionary is a huge disk   {#993}
[00:56:08] TEACHER: and you have 100 servers, so you are having 100 terabytes of redundant data.   {#994}
[00:56:15] TEACHER: Problem right?   {#995}
[00:56:16] TEACHER: So there has to be a better way to do it.   {#996}
[00:56:18] TEACHER: So this is why you can think of not going with storing over here and the thing that is on it with Anupak that have a central place where you are storing the dictionary.   {#997}
[00:56:36] TEACHER: Okay.   {#998}
[00:56:36] TEACHER: Now what this central place would be?   {#999}
[00:56:38] TEACHER: How will you access it?   {#1000}
[00:56:39] TEACHER: Pankaj.   {#1001}
[00:56:43] TEACHER: so can can we use something like amazon s3 in this case to store this file   {#1002}
[00:56:50] STUDENT_5: okay why s3 so i mean it's very cheap and optimized for blob storage like blob files   {#1003}
[00:56:58] STUDENT_5: so i'm thinking like since we have a single file we can just store it there   {#1004}
[00:57:05] STUDENT_5: and probably like one more thing that I thought of was that since it's a big file   {#1005}
[00:57:14] STUDENT_5: in S3 like I have seen that the get object query get object has some query params where we can   {#1006}
[00:57:21] STUDENT_5: actually pass the bytes that we want to read so since we already know the index size we can just   {#1007}
[00:57:29] STUDENT_5: pass that these many bytes I want to read and get that and finally get the offset and then   {#1008}
[00:57:37] STUDENT_5: again get the same query with that particular offset byte and read that and give it to the user   {#1009}
[00:57:42] TEACHER: back. Great, great, great, great, great. Okay. Subha. I'll just pull in in a minute. Okay.   {#1010}
[00:57:50] TEACHER: So what Pankaj said is something very interesting. What he said is can we, because we, what we have   {#1011}
[00:57:59] TEACHER: converge on S3 yet, right?   {#1012}
[00:58:01] TEACHER: We still want to know what are the core properties we want from the system.   {#1013}
[00:58:05] TEACHER: And then we would pick a particular technology, right?   {#1014}
[00:58:08] TEACHER: So what we want, what first Anubhav said, let's put it in a shared storage.   {#1015}
[00:58:14] TEACHER: Why do we want a shared storage?   {#1016}
[00:58:16] TEACHER: Because we are not ready to oblique the data across.   {#1017}
[00:58:18] TEACHER: Why?   {#1018}
[00:58:18] TEACHER: Because it is cost inefficient and other problems come with that.   {#1019}
[00:58:21] TEACHER: So that's okay.   {#1020}
[00:58:22] TEACHER: So given that we cannot do it, we want it in a central place, but remember   {#1021}
[00:58:29] TEACHER: What is common across multiple servers?   {#1022}
[00:58:33] TEACHER: Network, which means you need a common place which is accessible over network.   {#1023}
[00:58:41] TEACHER: And what is that one common place that is accessible over network?   {#1024}
[00:58:44] TEACHER: Any block storage or any database, but we cannot use database.   {#1025}
[00:58:49] TEACHER: So we have block storage and anywhere we are storing a gigantic file.   {#1026}
[00:58:52] TEACHER: We can just store this file on S3, for example.   {#1027}
[00:58:56] TEACHER: We are still not giving up our portability.   {#1028}
[00:58:59] TEACHER: We still have this one file on SE.   {#1029}
[00:59:01] TEACHER: But is this the best choice?   {#1030}
[00:59:03] TEACHER: What is the feature that we want?   {#1031}
[00:59:05] TEACHER: If this was a normal disk, assume it was a normal disk.   {#1032}
[00:59:08] TEACHER: We were, we designed our entire approach thinking it's a normal file.   {#1033}
[00:59:13] TEACHER: And I would read a set of bytes and then another set of bytes and then do a read at or do a   {#1034}
[00:59:20] TEACHER: random read in the data section.   {#1035}
[00:59:22] TEACHER: Right?   {#1036}
[00:59:23] TEACHER: Because we are reading this header to understand how big the index is.   {#1037}
[00:59:26] TEACHER: We're reading this entire thing to build an in-memory hash table and then doing random   {#1038}
[00:59:30] TEACHER: reads on this data section.   {#1039}
[00:59:34] TEACHER: So this should be supported by whatever we use over here.   {#1040}
[00:59:39] TEACHER: So generic term for this is a network attached storage.   {#1041}
[00:59:48] TEACHER: So what we were looking for is any storage that is accessible over network.   {#1042}
[00:59:56] TEACHER: It gives file system semantics.   {#1043}
[01:00:03] TEACHER: And the key things that we need is we need random reads.   {#1044}
[01:00:07] TEACHER: That's a bare minimum we need over here that we should be able to read what I have given   {#1045}
[01:00:12] TEACHER: my random read.   {#1046}
[01:00:13] TEACHER: It means that I could provide a thing that say that from this file at this offset read   {#1047}
[01:00:19] TEACHER: n bytes.   {#1048}
[01:00:20] TEACHER: I need to have somewhere to fire this.   {#1049}
[01:00:22] TEACHER: Right?   {#1050}
[01:00:23] TEACHER: A normal disk gives you this.   {#1051}
[01:00:26] TEACHER: seek to that location, read those many bytes.   {#1052}
[01:00:29] TEACHER: Now this needs to be provided by any network attached storage that we are using.   {#1053}
[01:00:34] TEACHER: So you can just use the network attached storage that gives you this thing.   {#1054}
[01:00:39] TEACHER: S3 gives you all the file system level semantics   {#1055}
[01:00:42] TEACHER: because of which it can be used as a distributed file system as well.   {#1056}
[01:00:46] TEACHER: So what you get this feature on S3,   {#1057}
[01:00:49] TEACHER: where on S3 you are not just there to read the entire file.   {#1058}
[01:00:52] TEACHER: You can say that in this file, at this offset, read these many bytes.   {#1059}
[01:00:57] TEACHER: It would give you exactly those many bytes that you are needing.   {#1060}
[01:01:00] TEACHER: And you could choose.   {#1061}
[01:01:02] TEACHER: It's not that I prefer S3.   {#1062}
[01:01:04] TEACHER: It's just that you can replace S3 with any network attached storage.   {#1063}
[01:01:08] TEACHER: For example, an HDFS.   {#1064}
[01:01:13] TEACHER: HDFS gives you this exact same semantics.   {#1065}
[01:01:15] TEACHER: Next, you can use a literal physical hard drive connected in your data center acting as this thing.   {#1066}
[01:01:24] TEACHER: So literal network hard disks that you get like Dell network hard disks are very famous.   {#1067}
[01:01:32] TEACHER: You'll get this.   {#1068}
[01:01:33] TEACHER: You can use anything that gives you file system level semantics to do this.   {#1069}
[01:01:37] TEACHER: S3 gives you that.   {#1070}
[01:01:38] TEACHER: Everyone understands S3.   {#1071}
[01:01:39] TEACHER: That's why I'm going with S3.   {#1072}
[01:01:41] TEACHER: So now on S3, what we'll have is we'll put this file having header, index and data in   {#1073}
[01:01:47] TEACHER: this one file and we store it on S3.   {#1074}
[01:01:50] TEACHER: And now what our reads would look like.   {#1075}
[01:01:52] TEACHER: Now the entire flow, end to end flow, what it would look like is when any of my API server   {#1076}
[01:02:00] TEACHER: boots up, what it would do.   {#1077}
[01:02:02] TEACHER: It would read the first 16 bytes of this file.   {#1078}
[01:02:05] TEACHER: So first of all, now this comes one step back.   {#1079}
[01:02:10] TEACHER: What each API server need to know is needs to know the file path on S3.   {#1080}
[01:02:18] TEACHER: So that can be a static configuration that this is the dictionary that we are serving.   {#1081}
[01:02:22] TEACHER: It can be a static, but I will go deeper into this because we still have to do deployment of this.   {#1082}
[01:02:27] TEACHER: So all we want is we want a file path on S3 that where exactly is the dictionary stored on S3.   {#1083}
---- OWNED SEGMENTS END ----

CTX| [01:02:35] TEACHER: So let's say we pass it as a configuration.   {#1084}
CTX| [01:02:37] TEACHER: This is a configuration.   {#1085}
CTX| [01:02:38] TEACHER: This is the path where it is stored on S3.   {#1086}
CTX| [01:02:41] TEACHER: Given that API server starts with that, what it would do it from this path, it would read   {#1087}
CTX| [01:02:46] TEACHER: the first 16 bytes.   {#1088}
CTX| [01:02:48] TEACHER: It would read the first 16 bytes, interpret it as header.   {#1089}
CTX| [01:02:51] TEACHER: It would understand it is a dictionary file, like whatever our format is.   {#1090}
CTX| [01:02:55] TEACHER: From where it would know the index size.   {#1091}
CTX| [01:02:57] TEACHER: It would read, then it would make another S3 call to read those many bytes and create   {#1092}
CTX| [01:03:02] TEACHER: a hash table in memory hash table over here.   {#1093}
CTX| [01:03:05] TEACHER: what we would have we would have an in-memory hash table in-memory hash table in-memory   {#1094}
CTX| [01:03:09] TEACHER: hash table over here then it would start serving the request whenever a get request comes in goes   {#1095}
CTX| [01:03:16] TEACHER: to any api server it would refer to this in-memory hash table if the word exists good enough if it   {#1096}
CTX| [01:03:21] TEACHER: does not exist 404 right if it exists in the in-memory hash table it would have that this   {#1097}
CTX| [01:03:29] TEACHER: word is present at this offset so what it would do it would take this know the offset go to that   {#1098}
