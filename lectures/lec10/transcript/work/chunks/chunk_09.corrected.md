**[01:39:09] Student 4:** We are doing it on, like, any request that we are, like, that we are having. Okay.

**[01:39:15] Teacher:** But on every request made, making a meta call to meta JSON file, expensive. Why, why would you want to do that? That's still polling.

**[01:39:21] Student 4:** Okay. Let's just say, okay, not meta.json. We can talk about, like, that, our dictionary file, the dictionary file that we are having, which shall, which is having all the entries. Okay. We can check, like, anyway, we are reading that file and whenever any request is coming. Okay. Before that we can just check updated at or anything like that tag.

**[01:39:44] Teacher:** Like, no, you can't. That's what I said. That's what I said. Right. Because when you are reading that you would get garbage data, then you would make another read, reload the index and whatnot.

**[01:39:54] Student 4:** Right. No, like, not the garbage data I am talking about, like before, like reading the file itself, before reading a file itself we are just checking, like, we have, like, any, any file has, like, metadata, like updated at, created at and all of those things. Where is that stored? So, like, like those in informations are stored at the top of the file, I think, like?

**[~01:40:18] Teacher:** No, for the text file, for the text file, no, that are not stored there. That's hard, that's what... Okay, let me [?converge | asr: "convert"] this, this to go into crazy directions. So let me converge it. Let me converge faster. Otherwise, we would spend till 11.30 on this. Right. But it's good that you folks are thinking. Why are we making certain decisions? Now we understand. Right.

[01:40:44] The what you're talking about this, Rahul, on [?versioning | asr: "bursting"] and all. This is exactly that, where you're uploading it. Different files. Having a meta file. Meta file contains which one is the active one. Right. That's the latest version. Internally, S3 can abstract it out for us. Right. But I'm laying out in a very simple terms.

<!-- topic-candidate [01:41:00]: Reload via deployment (rolling deployment reads meta.json) -->

[01:41:00] Okay, now if you look carefully, this is exactly what would you do when you reboot a server. Because when a server reboots, it would [?read | asr: "root"] the meta.json file, understand what path it is, go to this path, read the file, read the index, build this hash map and start serving the request. So what we are effectively trying to do is, when we are done uploading this file to this path, updating the meta.json file, we just want to trigger a server reload, which is equivalent to doing a deployment.

[01:41:32] [missing ~01:41:29-01:41:32] Do you don't need this. You just include your AWS SDK and trigger a deployment using a deployment pipeline [unclear: "and bot not"] it would do rolling upgrade. You just automatically, when you trigger a deployment, when you have a rolling deployment configured, it would take down one server, spin up another machine. When this new machine spins up, it would read the [unclear: "meta to the simple"] because that's what you have [?written | asr: "return"] when the server boots up and your API server boots up. That's what you are doing. You are reading this metadata file, now it would get the new path. It would read it and serve it.

[01:42:08] The problem is with inconsistency, but you are still not serving garbage. You would have a time, while this deployment is happening, that sometimes the request goes to one server that has already built index on that old data, while other server, that is new server, that is the new data, but meanings does not drastically change. You are at least not serving garbage data. You are serving eventually consistent data, but that's fine because meanings anyway does not change drastically. So you avoid serving garbage data because you are reading from another file now and you are just triggering a rolling deployment. Any deployment strategy is fine. You are just triggering your deployment using the cloud provider that you are using and it would seamlessly take its effect.

[01:42:53] This is how you don't need anything. When you see just one deployment invocation call, whatever cloud provider you are using, Jenkins job, whatever you are doing, just you got a simple deployment. Because when any API server boot up, it would read the metadata JSON file. In the metadata JSON file, now the path is the new path. Load the file and serve it. Simple. Right? So instead of exposing API endpoints, reactive, Redis Pub/Sub, all of that, throw it out of the window. Trigger a simple deployment and a job is done. Right?

[01:43:24] That's exactly what I have written in this part. This entire thing that I've done, this thing is exactly that. I've just been a little more elaborative on what we just covered. This is exactly that. Changelog, how it would happen, merge that we just discussed, uploading it to the same path, transition, reactive Pub/Sub, parallel setup. This is what we are doing as parallel setup. Portability by adding header and this is what would happen behind this. That's exactly what I have covered. We went very in depth when you are brainstorming it.

<!-- topic-candidate [01:43:59]: Why we discussed it - pointed reads on S3, multi-tiered storage -->

[01:43:59] But now why did we discuss it? Let's first understand that. What we just see with this is we are now able to seamlessly fire your GET request on S3. Not PUT request, GET request on S3. Pointed reads, reading the bare minimum amount of data that you have to. This has huge applications.

[01:44:24] [missing ~01:44:22-01:44:24] Storage because of this. So let's say you have gigantic amount of data in your database on which, let's say, historical data is not even queried. I'll give an example, Amazon orders. Amazon orders, how likely are you to access orders that you made six months back? Highly unlikely, right? Highly unlikely you would do that. So what if you take the six months old order and push them to S3? But this does not mean user would never do that. User can still go back in time and check, what was the order that I made. So if your order is [?recent | asr: "reset"], you go to your hot database, let's say MySQL. And if it is your old order, you go to S3 and read it.

[01:45:03] But how do you know? On S3, you cannot just dump everything in a JSON file. You need an ability to make pointed queries on S3. This is how you are doing it. This gives you an ability to fire pointed queries on S3. Because now literally, order ID, you're getting order details from S3. Dead simple. And this is the beauty. This one system that we just discussed as example, as simple as word dictionary on S3, it solves a ton of problems. It helps us, it lays the foundation for multi-tiered storages, because we are not losing an ability to query the data that we dump on S3.

[01:45:43] In most places, you think that, hey, when I dump on S3, it's archival. Here, it's a cheap storage for us. We reduce the cost of our main database by keeping the data that is very infrequently accessed on S3. By trading off the time, because in hot database you can get it very fast. But on S3 you would get it relatively, relatively very slow. But that's okay because that's very infrequently accessed data. But because you move data out of your hot database into your cold storage, you are reducing the cost of your hot database, which is significant save. Significant.

[01:46:21] [missing ~01:46:19-01:46:21] Lays the foundation for that.

<!-- topic-candidate [01:46:23]: Athena, data lakes, Apache Hudi, Hive partitions -->

[01:46:23] Another example, Athena. Athena does exactly this. On Athena, you can load a CSV file and fire queries on this. This is exactly what Athena is doing behind the scenes. It is creating an index, keeping it handy, along with that file. When you fire the request, it goes to that file, reads the records and serves it back. Athena internally does exactly this. So having an ability. So what we just built is we built an ability to query data. Simple key-value format. More complex, but to start with, let's start simple, to fire a simple get key request on S3 without, without having to read this entire file. We just built it. It has a ton of applications around it.

[01:47:04] Right? AWS S3, Athena, entire data lake. If you have heard of data lake, data engineering folks would definitely know it, but data lakes are where you're storing huge amount of data in a very cheap storage, but having an ability to query it. Apache Hudi does exactly this behind the scenes. The format that Hudi table format is exactly this index that we are storing. Hive partitions, exactly this. This is the foundation for having an ability to query huge amount of data on a very cheap storage.

[01:47:38] And this is what I wanted to cover. It comes to building a word dictionary on S3, considering from deciding to development to deployment, seamless transitions and everything, and keeping things really simple rather than over complicated. Right? Okay, any questions on this? I'll take questions till 55 and then we go on a break till 11.

<!-- topic-candidate [~01:47:56]: Q&A - redeployment after meta.json update -->

> **Student Question [~01:47:56] - Student 1:** Yeah, maybe few things I'm not able to make sense. I'm just asking what we are trying to say at the time of when we created the merged file, which is the current file plus the change. Now we have a new file. Now once we create the new file, this new file has to go and create a new path in S3 and that has to be known to the API servers. That's what we are trying to achieve. Now, if we are sending, so let's say, but I understood the solution is we send a request to S3 that, okay, this is the new file and we go and update in a new path, which is being mentioned in the meta file.

**[01:48:49] Teacher:** Meta.json file. Meta.json.

**[01:48:51] Student 1:** And on that call itself, we are sending API servers to go and do the redeployment. Correct?

**[01:48:58] Teacher (answer):** No, no, no. Once that file is... Correct, correct, correct. So in that new server, when this meta.json file is updated, we are just triggering a deployment of our API servers.

**[01:49:07] Student 1:** Okay. So we are making sure first the meta.json is updated.

**[01:49:13] Teacher?:** Yes.

**[01:49:13] Student 1:** So in the deployment of my... in the changelog process, I'm making sure file is created, then meta is updated, then only I'm sending this thing to the deployment server. Yes. Yes. Okay. [check: "Yes. Yes." may be the teacher confirming]

> **Student Question [01:49:29] - Student 1:** Just I'm thinking about, can we do a bit better in place of creating a new VM whole deployment. It's a redeployment and it is just like a process that was reloaded at the startup. Yeah. Can we create something which is invoked? The whole thing is like going, [?reading | asr: "heading"] from meta, creating the index and start serving of the hash table from server. This is the whole thing in place of doing the whole redeployment [unclear: "can be a wide of"].
