**[00:35:16] Student 1 (Anubhav):** One of the API or whichever API server we are uploading the image to, it can fail in middle of the process and then we'll, we'll lose the user's image. Unless we have persisted it somewhere, which we can't do in this small time,

**[~00:35:31] Teacher:** you will send 500, [?5xx | asr: "five access"] to user, user will do a retry. Simple.

**[00:35:35] Student 1:** Yep. User will do a retry.

**[00:35:37] Teacher:** That's not a problem anymore.

**[00:35:39] Student 1:** Another problem could be that for an API server, the constant, like these 5MB requests will take up a lot of network bandwidth, which could be used for other smaller responses, but it's not being used for uploading these heavy images. And we can sort of optimize this a bit.

**[00:36:02] Teacher:** But then what's the solution? You say that, hey, if my bandwidth consumption is high on the API side, 5MB is a huge amount of data that you're transferring. Every network card has a physical limit of the amount of data that you can transfer over it, [?eating | asr: "heating"] up that space that, that network bandwidth or other API calls would suffer, plus memory requirement of an API server would increase. So now what's the solution? If you want to protect the bandwidth of your API servers, what will you do?

**[00:36:31] Student 1:** The solution that comes to my mind is to avoid sending the image to the API server, but to some other specialized service that can then proxy to S3, which has either a higher network card or something that is more tailored to taking images and uploading it to S3.

**[00:36:51] Teacher:** So you are doing something like this, that instead of uploading it to core API server, expose another service and that does this thing. Which would lower network bandwidth

**[00:37:00] Student?:** by either, by being closer to the user. So let's say this is exactly that services. Now what? [check: speaker - may be Teacher continuing (diagram + "now what" prompt); diarization says STUDENT_1]

**[00:37:13] Student 1:** Yep, so here we would need to store this configuration that whenever this path is hit for this image upload, you have to proxy to this S3 [?put | asr: "part"] API for image upload.

**[00:37:23] Teacher:** Okay, can we do better? Let me pull in chira. Can we do better? [check: name spelling - "chira" 00:37:23 / "Chirak" 00:39:28 / "siraq" 00:40:24, same student; Chirag?]

**[00:37:29] Student 1:** So one of the thing that comes to my mind is that we can use pre-signed URLs to do that.

**[00:37:36] Teacher:** What are pre-signed URLs?

**[00:37:38] Student 1:** So basically it is signed with the credentials of the user or IAM role in the [unclear: "ADEM"], right? And so this will reduce the load on the API server, right? So it would be a simple get call to kind of, no, no, no. [check: speaker - "no, no, no" may be the Teacher interrupting]

**[00:37:56] Teacher:** You are, you are basically missing two things. What's your first step?

**[00:37:59] Student 1:** So first step would be to hit the API server, right, and fetch the pre-signed URL by passing in the parameters like image name or something and the location of the S3 where we want to store it.

**[00:38:12] Teacher:** And then that pre-signed URL to upload the image. [check: speaker - may be Student 1 finishing the step] Okay. So then is your upload not happening via your API server, your image upload service? Where is it? Like, how are you uploading? Where are you uploading?

**[00:38:27] Student 1:** So, the, the upload, I think the upload will happen via the S3 service. That's what I believe. So it will not add up the load on the API server.

**[00:38:38] Teacher:** So are you saying it will upload directly to S3?

**[00:38:40] Student?:** Yes.

**[00:38:42] Teacher:** How does that happen?

**[00:38:46] Student 1:** So, so, so when we, so, so as far as I know, there are two methodologies, right, that S3 provides, put and post, to basically generate the pre-signed URL. Right. And once we have that pre-signed URL, we can use those methods. Right. So it can post or put to directly upload it to the S3. And I think that pre-signed URL also has some sort of validity. Right. So after that, it gets expired. Right. So within that duration, the upload needs to happen.

**[00:39:18] Teacher:** Okay. With this, what you gain, by uploading directly to S3 and not going via image upload?

<!-- topic-candidate [00:39:25]: Pre-signed URL - uploading directly to S3 -->

[00:39:25] So first, just a minute, let me just basically converge on this. So what Chirak proposed as a solution is that instead of we uploading 5 MB of data to APIs and APIs server, then uploading it to S3, what he proposed is that can we not directly upload to S3? What this helps us save is it helps us save network bandwidth on this service plus twice the data transfer. Data over here, 5 MB data over here, you pay for 2x of data that you're transferring, which is a huge AWS cost. AWS egress cost, if you would have heard, is a big [?pain in the ass | asr: "pain in gas"]. It is, it costs huge amount of money relatively when you are directly or when you are, anything goes out of your EC2 instance or comes within your EC2 instance. So egress and ingress cost. So it becomes extremely expensive, given that you are just thinking that, hey, I'm just uploading 5 MB, but for every [?hop | asr: "hub"] that introducing, you are actually, you are actually being billed for egress and ingress cost. So that's really expensive.

[00:40:24] So what siraq proposed is, hey, instead of uploading to the image upload service and then which uploads to S3, what if we directly upload to S3? That's his proposal. Now how do you achieve that? This, what he gave as a solution, is a pre-signed URL. It's a very interesting concept, everyone uses it. So what is a pre-signed URL? Pre-signed URL, as the name suggests, it is a URL which is pre-signed and has some expiration, which means that, for example, I want to upload an end particular image. What I would first do is I would talk to my image upload service. First, I would talk to image upload service and ask it to generate a random image ID for me. That's it. It's just an entry. It's just a random image ID that I'm generating.

[00:41:15] It would generate a random image ID and it would create a signed URL, pre-signed URL for that specific path in GCS. For example, S3 colon slash slash images slash random underscore ID dot png. This is the path, for example. So it would generate a pre-signed URL for this path, which means that, hey S3, please having a pre-signed URL for this specific path to upload anything to this. It's a very short lived URL. So what it does, this request comes to image upload. So this is the preparation phase.

[00:42:01] In the preparation phase, what you are doing is you are telling your image upload service that they please generate a random image ID and generate a pre-signed URL on S3. So it generated this path on S3 and it sends the pre-signed URL to user. Now what user would do is user would make a post request with this image on the pre-signed URL that it got. Whatever the pre-signed URL was, it made that request, and that path is what S3 spawned. So image directly gets uploaded to S3. Now why do we need to over complicate the pre-signed URL? The reason being that because one option is, hey, let me just make my S3 open for everyone to upload from anywhere. Now imagine if you do that, I would just use it to upload a lot of data onto your S3 bucket for free and you would be billed for that, which means S3, because S3 bills on the amount of data that you are storing. If you open it for everyone to upload the data onto your S3 bucket, you will be paying a huge amount of bill to AWS, that your S3 bucket is open to upload, I'll just keep uploading my data to your S3 bucket. Unnecessary. Right?

[00:43:11] So which is why S3 cannot open. You can still do it, but in this use case, you don't have to do it, but you still want to directly upload image to S3. So S3 provided a way for you to do that. That is pre-signed URL, in which your backend service will make an API call to your S3 bucket and say that, hey S3, please create a pre-signed URL for this specific path valid for these seconds, 10 seconds, 20 seconds, 30 seconds, 60 seconds, whatever your time is. For those 60 seconds, that path will be open through a pre-signed URL. So anyone having that pre-signed URL, is not the path that is open, but the pre-signed URL is the one that is doing that magic. So that pre-signed URL accepts the post method, in which accepts anything that you pass, and it uploads it on S3.

[00:44:03] So this way, you first make an API call to image upload service. Image upload service makes an API call to S3, create a pre-signed URL. The pre-signed URL is sent to the user and then user directly sends image to S3 over the pre-signed URL. This makes your architecture very flexible. Why? And very efficient. Why? Because you don't need bulky image upload server that is taking up images. Images are directly being uploaded to S3. That saves you huge amount of value. You are not doing 5 plus 5 MB transfer. You are just doing 1 times 5 MB transfer. So it saves you network cost as well. It reduces the amount of infrastructure you have to manage. Plus it gives you native security on AWS side using the pre-signed URL. You don't have to manage a lot of stuff on there. This is the beauty of this implementation.

<!-- topic-candidate [00:44:54]: GitHub upload demo (pre-signed URL) -->

[00:44:54] So again, let me show you a demo. Let me show you a demo. On a relatively, I'm just lowering your hands, when I ask, please raise them again. Okay, I'll show you a demo. Relatively, on a very different website, GitHub, who would have thought? Instagram image upload, GitHub, one and the same. That's why I say system design is all about building blocks. You need to know the solution. You need to know how things work and you can just Ctrl-C, Ctrl-V anywhere you want it, right?

[00:45:28] Normal page of any repository issues. I'm here in the comment that we get, we can attach any file over here. Let's say I put a image. Let's keep an eye and see what happens in the network tab. So I pick downloads, I'm not sure what that is. Oh, I think this is, okay, this is my next video, members only media. Okay, so I click this image. Look at this, this image is 179 KB big PNG file of some dimensions. I double click this. Now see what happens. You see few calls happening here and there. Four calls happen, right? Let's go through them one by one. First call. Okay, first call, it, it made the request to github.com slash upload slash policy slash assets. It means that it is creating, it is registering, it is asking its image upload service, hey, I want to upload something.

[00:46:28] In the request, it sent that the name of the image is N underscore T. [check: file name as read from screen] This is what my name, actually my name was. This is the YouTube ID, FYI. I follow a particular convention. So this is the YouTube video ID. .ph is the name of my thumbnail. Size is 183938, which is 179 KB. Then the type is image PNG, authentication token, something, something, something. That's it. This is what the request is sent to this.

[00:47:04] The first request is now sent from user, your front end, to github.com's backend, and here image is not yet sent. You don't see an image. You just see metadata of the image. Name, size, content, type and whatnot. In the response, what we get? What we get is a signed URL. This is what pre-signed URL looks like. So if you look carefully, the first thing you did is upload URL. Upload URL is where you have to upload the image. Look carefully what the upload URL is.
