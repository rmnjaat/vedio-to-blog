**[01:26:15] Teacher:** So when you upload it to the same path on S3, you have to immediately tell API servers to reload their index. But for that duration, your users will see garbage data. Very poor user experience. Right? Okay. So these are the things that I'm basically trying to prove you on. Think of these lines. So that is one problem. Now you would think, hey, let me, so uploading to the same path on S3, this is one of the problems.

<!-- topic-candidate [01:26:47]: Uploading to a new path - telling API servers -->

[01:26:47] So now it looks like it makes sense for us to upload it to a new path. Now when we do it, when we upload it to a new path, what would happen? I'm just going back to brainstorm. So now let's say we uploaded to a new path on S3. Let's say my path one on S3 was S3 colon slash slash word dictionary slash dictionary one dot dictionary something. Right. Let's say this was first path. Now let's say when you upload this, you upload it to the new path. S3 colon slash slash word dictionary. And now it is dictionary two dot dictionary. Now how do you tell API servers that this is the new path you should start serving? How do you communicate this? Got it?

**[01:27:31] Student 1:** Rather than this, what we can try for is rather than dict2.dict, we can have wd1.1 slash the path. I mean, we can have the IP address.

**[01:27:44] Teacher:** What difference does it mean? And then the path has changed, right? Yeah. Right. You have to convey this path, whatever path is, you have to convey this to the API server that this is the new path that you need to reload. Right. How do you tell this to API servers?

**[01:27:59] Student 1:** Their cache. How? An interrupt or let's say a command which invalidates the cache. Everyone would have to tell API servers to do this.

**[01:28:11] Teacher:** Like for ping all API servers to invalidate the cache. Sounds too complex. Isn't it?

**[01:28:18] Student 1:** So, since we know what time our job will be running, can't we have

**[01:28:23] Teacher?:** That's unreliable. What if upload fails? And what if you're not able to successfully do that? Right?

**[01:28:31] Student 1:** No. So what? What's the harm in that? Because API servers won't be taking the index from the cache. It would be going to S3. It's simply adding the latency, but not at the harm of anything else.

**[01:28:45] Teacher:** Why not? What if your upload failed completely? What if your file was corrupt? You didn't check a lot of stuff there. Right? Because if you do a cron job, no matter what, Sunday at 1 PM, everyone update. What if your job ran beyond 1 PM? The upload was not handy. [check: "not handy" - possibly mis-heard] Now what? What if the file that was uploaded was corrupt? What if you didn't get time to validate? Because now this is an independent mind over here. [check: "independent mind" - possibly mis-heard] And no matter what, that would run and update it. That's wrong. Yeah.

**[01:29:19] Student 2:** No idea beyond that.

**[01:29:20] Teacher:** Yeah. Okay. Uh, yes, Abdur, what will you do? [check: name spelling]

**[01:29:25] Student 8 (Abdur):** Well, I, I came in the middle where we were already set up the API servers, but I had an idea. What if we had the each word in, in one file?

**[01:29:40] Teacher:** No, we, then we kill portability. That's why we are not having each word in one file.

**[01:29:44] Student 8:** Okay. Okay. So I, that was. Yeah. Yeah.

**[01:29:48] Teacher:** That was a constraint that we're playing with. We want portability.

**[01:29:52] Teacher:** Having everything, okay. I don't have anything. Okay, Pankaj. [check: speaker - "I don't have anything" may be Student 8]

<!-- topic-candidate [01:30:01]: Metadata file with the current path - polling -->

**[01:30:01] Student 5 (Pankaj):** Yeah, so I was thinking that we can have some extra file which will have like a metadata. Yes, that's the same file again, like it will be in S3 again, a new file and file, let's say once we know that we have updated our index, updated the new file and uploaded it to S3, like the put request which will make, in the success callback of that we can update this metadata. Perfect. [check: "Perfect" may be the teacher] What our API servers will do is, like, they will keep on [?polling | asr: "pulling"] this metadata, let's say at some frequency like 5-10 minutes, and they will see that my index path has updated. So they will start fetching it from the new file and update their in-memory index also.

**[01:30:51] Teacher:** Okay. First question, will this path be static or will it be versioned?

**[01:30:57] Student 5:** So the path of the metadata file will always be static.

**[01:31:01] Teacher:** Perfect. Okay. So that everyone knows that this is the only path where we have to go. Okay. Perfect. Okay. Then you are saying that you pull the meta file at let's say 5 minutes, 10 minutes. Yeah. Why would you do that, given that your job runs weekly?

**[01:31:19] Student 5:** Again the same issue, right? It's running weekly, but we don't know, like, when it will get updated and when it is getting, you know, uploaded to S3. I mean, it might happen that we received updates on Sunday, but because S3 was down we were not able to update it to the S3 and we uploaded it on Monday. So then basically API server will not know that now I have to fetch it on Monday. So it needs to continuously poll to find out. Now my index is updated. So yeah.

<!-- topic-candidate [01:31:51]: Polling vs reactive - Redis Pub/Sub -->

**[01:31:51] Teacher:** But we studied second week, third week that we can make things wherever we have poll, we can make things reactive. Right? So instead of polling, we can make things reactive. Hey, go pull. Something has changed. Yeah. How do we go about it? Remember Redis Pub/Sub? Yeah. So we can use that Redis Pub/Sub. So all API servers subscribe to this.

[01:32:26] All API servers subscribe to Redis Pub/Sub and the new server that, sorry, I should have used a phone. And the new server that would be there, it would push an event into this Redis Pub/Sub whenever it is done uploading. And now all servers can receive the updates. That makes things reactive instead of you polling it. So your update is happening once every week. Why would you poll 5,000 times before that? Unnecessary. Right? So we can make things reactive. But this seems too complex having another infrastructure component running and every API server is listening to this.

**[01:33:06] Teacher:** This. Can we be smart about it?

**[~01:33:06] Student 5:** So I had one more thought. So that was to basically, I was initially thinking that in the initial file we can upload in the header itself. We can have one key, like let's say whether it's a latest one or not, zero or one.

**[~01:33:25] Teacher:** And how would you know the latest one? You would never know it's the latest one or not. No.

**[~01:33:30] Student 5:** So when we file we can make the old files header to be latest equal to zero. But again, that required the API server to pull it and see that.

**[01:33:47] Teacher:** So we had polling with changes with reactive. Can we do better than this? Because this requires another infra component and persistent connections over here to tell them something changed. It, I'll pull in. Yes, Amrita.

**[01:34:02] Student 3 (Amrita):** So in the header, we were keeping a version. So maybe by indexing, we hold a reference to version and we see if the version is updated. We invalidate.

**[01:34:12] Teacher?:** But you're still polling for that.

**[01:34:15] Student 3:** Like not exactly while polling, but when we receive a request and we hit on the indexing and then we check with the backend when we receive a request.

**[01:34:26] Teacher:** But how would you know that something changed unless you poll it?

**[01:34:32] Student?:** Okay.

**[01:34:37] Teacher:** This is very interesting, right? This is, this is what I want all of you to think about. Like, can we make it simpler, even more simpler than this? Because polling is good. I'm not against polling. It's just that why to waste, but like why to make 5,000 requests when you can, when you, but someone can tell you or even someone can trigger something. That's a hit. Sidesh. [check: name spelling]

**[01:34:59] Student 2 (Sidesh):** Hey, Arpit. I would either expose a REST endpoint.

**[01:35:05] Teacher:** That's like this. You're making it [?reactive | asr: "reactor"]. Same thing. You expose a REST endpoint and this server calls that.

**[01:35:11] Student 2:** Yeah, basically because we'll have to do one server at a time, right? Like basically we are upgrading. So if we are upgrading, what we will do is, like let's choose a API server, ask it, either send an event to it, which you can anyways do. Like basically whenever you have a job, first let all the servers register with you, like basically all the API servers. So you have a close connectivity with them and send an event. Like you may have during upgrade, you may have to send them multiple events, tightly connect. Now you send the first event wherever you're doing with an API server. Now, once you send that, that server is going to, so I have two ideas. Let's go with a simple idea. First, you have to collect the index, give it the path and create, read that path, create the index.

**[01:36:03] Teacher:** You have meta JSON all now. Why would you want to create a path and tell it to the server?

**[01:36:08] Student 2:** Yeah, that's fine. Yeah. You have a meta JSON, just read the path. But the point is you'll have to first create indexes in memory. Okay.

**[01:36:16] Teacher:** So the API servers would need to load it. Yeah. That's a normal stage.

**[01:36:20] Student 2:** Yeah. Now you will create it. You will test the API server and everything is fine. And then you will basically tell your load balancer that this, like basically if you either give a new port to it so that that API server changes the port and the load balancer knows it. So basically... Complex, complex. [check: "complex" repeated 6x in ASR; may be the teacher interrupting]

**[01:36:42] Teacher:** You are trying to change port of the servers and this and that. This can be done in a very simple way. Very simple way. I'm see, I'm not against your approach. I'm not, I'm just trying to make it utter simple, like something that anyone would be able to understand. And because that's where the simplicity, like that's where the beauty of system design lies. Right. Okay.

<!-- topic-candidate [01:37:06]: Hint - trigger a reload of the API servers -->

[01:37:06] Let me give a hint so that we can converge a little faster. The hint is that given that we now have a static file, meta.json, which contains the path of the dictionary that needs to be served, we want all of the servers to read this new meta.json file. But if you think about it, what happens when this API server boots up? When this API server boots up, it by default reads this meta.json file, sees the path, reads the dictionary, builds the index and starts serving it. So this is literally like a boot up of this API server, because that's exactly what it would do. So what you're doing is when you're updating this and updating this path, you have to trigger a reload of this API server. This is the hint. Can we do something about it? Rahul?

**[01:38:05] Student 4 (Rahul):** So basically what I was thinking was basically like we can upload to our same path. Posting.

**[01:38:11] Teacher:** No, you cannot upload to the same path. That's the wrong thing. [unclear: "That we conversion."]

**[01:38:16] Student 4:** Just a second. Just a second. Okay. We can upload to our same path and like there needs to be versioning enabled.

**[01:38:23] Teacher:** You are going into S3 specific, right?

**[01:38:26] Student 4:** That versioning enabled and whatnot. Any back, like anything that supports backup will support versioning.

**[01:38:34] Teacher:** Like that's exactly what we did with creating two files separate. Yeah. That's like, right. So I'm what I'm, I am saying this so that other don't get confused. That's fine. Right.

**[01:38:45] Student 4:** Yeah. Okay. Let's just say like there is a meta dot JSON. Okay. So whenever like there is a update, we can just update meta dot JSON. Okay. And not only the [?paths | asr: "parts"] we can also have, like a, we can also check meta dot JSON attributes, like a updated at,

**[01:39:04] Teacher:** That is still polling. That is still polling.
