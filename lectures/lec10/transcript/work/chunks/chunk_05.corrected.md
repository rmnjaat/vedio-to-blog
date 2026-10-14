**[00:50:26] Teacher:** So let's say we create a load balancer, request from an end user comes to load balancer. Behind the load balancer, we have bunch of API servers whose job is to serve the incoming requests that are there. So now what would be the request flow look like? So this is a load balancer on which you got the request. These are the API servers.

**[00:50:51] Student?:** API server one. API not a good place to write. [check: may be the teacher labelling the board]

**[00:51:04] Teacher:** Okay. A classic case. A user, a load balancer and an API server. This is a file that we have. Now where would we store this file? For us to serve this request or handle this request, we are exposing a GET endpoint. So slash word is we are exposing and we are doing a GET on it and we get the meaning around it. Right? So this is the request that user fires and I want to get the meaning from this. The request comes to a load balancer, load balancer forwards it to one of this instance. Now, what would this instance do? Where is this file? Query. Right? We defined the file format to provide a way to query it or and way to fire HTTP request on that. How does that flow look like? Anyone? [?Anubhav | asr: "kyanav"]

**[00:51:59] Student 3 (Anubhav):** So can we have a shared disk storage for all the API servers that they can query to get the file?

**[00:52:07] Teacher:** But why not store this one file on every server? What's the harm in that?

**[00:52:14] Student 3:** That would make the update process a bit more tedious, but if we are fine with that, then we can also do that.

**[00:52:21] Teacher:** Okay. It would make update tedious. Why?

**[00:52:26] Student 3:** So whenever there is a change in, let's say, a few hundred words, we have to make that change happen on each of the API servers. Some of the API servers might not be available at the time when we are trying to make that update. Then we have to wait for them to be available.

**[00:52:41] Teacher:** But updates are not real time. Updates are weekly. Is that still a problem? Every Sunday you are making one update in bulk. It's not a key-value store where you are [?write | asr: "right"] or you can update anytime you like. Correct? It's a weekly update. Every Sunday you'll get a file from Oxford. You would say, okay, these are the new words. These are the new meanings. Go and update your data. Right?

**[00:53:12] Student 3:** Yes, that's correct. But like what another angle that I'm thinking of is, what if like the updates fail for a particular set of a file, then we would have data inconsistency.

**[00:53:24] Teacher:** So let's say what drastic would change if there is data inconsistency, because meanings are not dramatically changing. Right? You may have inconsistency in data in case your update partially fails, but it's a meaning. So apple, you might have a meaning which says a fruit. Tomorrow you might have a meaning that says around fruit. Is this an end of a word? No, right? But it's a valid point. I'm not denying it, but just that I'm probing you more to think on those lines.

[00:53:57] What else is wrong with this approach? And why are you going? Because what I'm trying to do is, when you are, when you are proposing a solution, you should have thought of other disadvantages, like, sorry, you should have thought of disadvantages of other part in depth, which is what I'm trying to prove. Right. What else could go wrong? So you said update tedious, correct. You said data inconsistency, but in both cases, both of them are not a problem yet. What else is a problem? If you store the files, the same dictionary file across all the three servers, what else is a problem?

**[00:54:41] Student 3:** Like we are having a lot of duplicated costs of saving the file, one DB file on a lot of servers. So which we can optimize for.

**[00:54:52] Teacher:** Biggest pain, cost. Biggest inconsistency is okay. Updates, tedious, okay. Cost. A real world system design is all about doing things, doing the bare minimum things at the bare minimum cost. Always remember this. If you are not thinking about cost, then you are not building good systems. Because you cannot, because in order to make anything faster, just throw a lot of money at a cloud provider, get a bunch of RAM, store everything in memory, problem solved. If I can have one terabyte RAM over here on each of this machine, I can just load the entire dictionary in memory. No need of creating index, nothing, just one hash table containing one terabyte of data. But that's not a good solution. Because it's not cost effective. So cost is something that should come to your mind. Like the first thing that is the solution that you're designing, is this cost efficient or not.

[00:55:50] Okay. Why is this cost inefficient? Duplicating the data that you have in external disks that you are storing, and you would be storing it in SSDs. SSDs or any disk is very costly. Cost of one terabyte SSD that you need, and let's say if your dictionary is a huge disk and you have 100 servers, so you are having 100 terabytes of redundant data. Problem, right? So there has to be a better way to do it. So this is why you can think of not going with storing over here, and the thing that is on it with Anubhav, that have a central place where you are storing the dictionary.

<!-- topic-candidate [00:56:36]: Central storage for the dictionary (S3) -->

[00:56:36] Okay. Now what this central place would be? How will you access it? Pankaj.

**[00:56:43] Student 5 (Pankaj):** So can we use something like Amazon S3 in this case to store this file?

**[00:56:50] Teacher:** Okay, why S3?

**[~00:56:50] Student 5:** So I mean it's very cheap and optimized for blob storage, like blob files. So I'm thinking like since we have a single file, we can just store it there. And probably like one more thing that I thought of was that since it's a big file in S3, like I have seen that the get object query, get object has some query params where we can actually pass the bytes that we want to read. So since we already know the index size, we can just pass that these many bytes I want to read and get that, and finally get the offset, and then again get the same query with that particular offset byte and read that and give it to the user back.

**[~00:57:42] Teacher:** Great, great, great. Okay. Subha [check: name spelling]. I'll just pull in in a minute. Okay.

[00:57:50] So what Pankaj said is something very interesting. What he said is can we, because we, what we have converge on S3 yet, right? We still want to know what are the core properties we want from the system. And then we would pick a particular technology, right? So what we want, what first Anubhav said, let's put it in a shared storage. Why do we want a shared storage? Because we are not ready to [?replicate | asr: "oblique"] the data across. Why? Because it is cost inefficient and other problems come with that. So that's okay. So given that we cannot do it, we want it in a central place, but remember, what is common across multiple servers? Network, which means you need a common place which is accessible over network.

[00:58:41] And what is that one common place that is accessible over network? Any block storage or any database, but we cannot use database. So we have block storage and anywhere we are storing a gigantic file. We can just store this file on S3, for example. We are still not giving up our portability. We still have this one file on S3. But is this the best choice? What is the feature that we want? If this was a normal disk, assume it was a normal disk. We were, we designed our entire approach thinking it's a normal file. And I would read a set of bytes and then another set of bytes and then do a read at or do a random read in the data section. Right? Because we are reading this header to understand how big the index is. We're reading this entire thing to build an in-memory hash table and then doing random reads on this data section.

<!-- topic-candidate [00:59:34]: Network attached storage - random reads, file system semantics -->

[00:59:34] So this should be supported by whatever we use over here. So generic term for this is a network attached storage. So what we were looking for is any storage that is accessible over network. It gives file system semantics. And the key things that we need is we need random reads. That's a bare minimum we need over here, that we should be able to read what I have given my random read. It means that I could provide a thing that say that from this file at this offset read n bytes. I need to have somewhere to fire this. Right? A normal disk gives you this. Seek to that location, read those many bytes. Now this needs to be provided by any network attached storage that we are using. So you can just use the network attached storage that gives you this thing.

[01:00:39] S3 gives you all the file system level semantics because of which it can be used as a distributed file system as well. So what you get this feature on S3, where on S3 you are not just there to read the entire file. You can say that in this file, at this offset, read these many bytes. It would give you exactly those many bytes that you are needing. And you could choose. It's not that I prefer S3. It's just that you can replace S3 with any network attached storage. For example, an HDFS. HDFS gives you this exact same semantics. Next, you can use a literal physical hard drive connected in your data center acting as this thing. So literal network hard disks that you get, like Dell network hard disks are very famous. You'll get this. You can use anything that gives you file system level semantics to do this. S3 gives you that. Everyone understands S3. That's why I'm going with S3.

<!-- topic-candidate [01:01:41]: End-to-end read flow - API server boot -->

[01:01:41] So now on S3, what we'll have is we'll put this file having header, index and data in this one file and we store it on S3. And now what our reads would look like. Now the entire flow, end to end flow, what it would look like is when any of my API server boots up, what it would do. It would read the first 16 bytes of this file. So first of all, now this comes one step back. What each API server need to know is needs to know the file path on S3. So that can be a static configuration, that this is the dictionary that we are serving. It can be a static, but I will go deeper into this because we still have to do deployment of this. So all we want is we want a file path on S3, that where exactly is the dictionary stored on S3.
