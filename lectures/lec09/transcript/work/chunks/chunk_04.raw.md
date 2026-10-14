# chunk_04  OWNS 00:35:16 -> 00:47:48  (segments #625-#809, 2065 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:34:23] STUDENT_1: And then from there I can do my own async job and I can send it to S3 instead of just   {#607}
CTX| [00:34:29] TEACHER: imagine you uploading.   {#608}
CTX| [00:34:30] TEACHER: Imagine you using Instagram.   {#609}
CTX| [00:34:32] TEACHER: It says, huh, image posted, but it takes one hour to do that asynchronous processing   {#610}
CTX| [00:34:37] TEACHER: to really show that image.   {#611}
CTX| [00:34:40] TEACHER: Poor user experience.   {#612}
CTX| [00:34:42] TEACHER: Correct?   {#613}
CTX| [00:34:43] STUDENT_10: Yes, that's correct.   {#614}
CTX| [00:34:46] TEACHER: So think of Instagram.   {#615}
CTX| [00:34:47] TEACHER: When you're uploading the image, you want to see that image right there, right now.   {#616}
CTX| [00:34:50] TEACHER: You want to send it to your followers right there and then.   {#617}
CTX| [00:34:54] TEACHER: You have to upload, right?   {#618}
CTX| [00:34:56] TEACHER: So now, will you do this?   {#619}
CTX| [00:35:01] STUDENT_1: Yeah, if it has to be instant, then I have to do that route.   {#620}
CTX| [00:35:05] STUDENT_1: You know, from my API to S3, it has to go immediately.   {#621}
CTX| [00:35:08] STUDENT_1: And it needs to get reflected.   {#622}
CTX| [00:35:10] STUDENT_5: Okay, great.   {#623}
CTX| [00:35:12] STUDENT_5: Anubav, what's the problem in this approach?   {#624}

---- OWNED SEGMENTS START ----
[00:35:16] STUDENT_1: One of the API or whichever API server we are uploading the image to,   {#625}
[00:35:20] STUDENT_1: it can fail in middle of the process and then we'll, we'll lose the user's image.   {#626}
[00:35:28] STUDENT_1: Uh, unless we have persisted it somewhere, which we can't do in this   {#627}
[00:35:31] TEACHER: small time, you will send 500, five access to user, user will do a retry.   {#628}
[00:35:35] TEACHER: Simple.   {#629}
[00:35:35] STUDENT_1: Yep.   {#630}
[00:35:36] STUDENT_1: User will do a retry.   {#631}
[00:35:37] TEACHER: That's not a problem anymore.   {#632}
[00:35:39] STUDENT_1: Um, another problem could be that for an API server, the constant, uh, like   {#633}
[00:35:47] STUDENT_1: these 5MB requests will take up a lot of network bandwidth,   {#634}
[00:35:51] STUDENT_1: which could be used for other smaller responses,   {#635}
[00:35:56] STUDENT_1: but it's not being used for uploading these heavy images.   {#636}
[00:35:59] STUDENT_1: And we can sort of optimize this a bit.   {#637}
[00:36:02] TEACHER: But then what's the solution?   {#638}
[00:36:04] TEACHER: You say that, hey, if my bandwidth consumption is high on the API side,   {#639}
[00:36:09] TEACHER: 5MB is a huge amount of data that you're transferring.   {#640}
[00:36:11] TEACHER: Every network card has a physical limit of the amount of data   {#641}
[00:36:13] TEACHER: that you can transfer over it,   {#642}
[00:36:17] TEACHER: heating up that space that, that network bandwidth or other API calls would suffer   {#643}
[00:36:22] TEACHER: plus memory requirement of an API server would increase.   {#644}
[00:36:24] TEACHER: So now what's the solution?   {#645}
[00:36:26] TEACHER: If you want to protect the bandwidth of your API servers, what will you do?   {#646}
[00:36:31] STUDENT_1: The solution that comes to my mind is to avoid sending the image to the API server,   {#647}
[00:36:36] STUDENT_1: but to some other specialized service that can then proxy to S3, which has either a higher   {#648}
[00:36:44] STUDENT_1: network card or something that is more tailored to taking images and uploading it to S3.   {#649}
[00:36:51] TEACHER: So you are doing something like this that instead of uploading it to core API server   {#650}
[00:36:55] TEACHER: expose another service and that does this thing. Which would lower network bandwidth   {#651}
[00:37:00] STUDENT_1: by either by being closer to the user. So let's say this is exactly that services.   {#652}
[00:37:09] STUDENT_1: now what   {#653}
[00:37:13] STUDENT_1: yep so here we would need to store this configuration that whenever this path is   {#654}
[00:37:17] STUDENT_1: hit for this image upload you have to proxy to this s3 part api for image upload   {#655}
[00:37:23] TEACHER: okay can we do better let me pull in chira can we do better   {#656}
[00:37:29] STUDENT_1: so one of the thing that comes to my mind is that we can use pre-signed urls   {#657}
[00:37:35] STUDENT_1: to do that.   {#658}
[00:37:36] STUDENT_1: What are pre-signed URLs?   {#659}
[00:37:38] STUDENT_1: So basically it is signed with the credentials of the user or IAM role in the   {#660}
[00:37:45] STUDENT_1: ADEM, right?   {#661}
[00:37:47] STUDENT_1: And so this will reduce the load on the API server, right?   {#662}
[00:37:51] STUDENT_1: So it would be a simple get call to kind of, no, no, no, no, no, no, no.   {#663}
[00:37:56] TEACHER: You are, you are basically missing two things.   {#664}
[00:37:58] TEACHER: What's your first step?   {#665}
[00:37:59] TEACHER: So first step would be to hit the API server, right.   {#666}
[00:38:02] STUDENT_1: and fetch the pre-signed URL by passing in the parameters like image name or something   {#667}
[00:38:08] STUDENT_1: and the location of the S3 where we want to store it.   {#668}
[00:38:12] TEACHER: And then that pre-signed URL to upload the image.   {#669}
[00:38:16] TEACHER: Okay. So then is your upload not happening via your API server, your image upload service?   {#670}
[00:38:22] TEACHER: Where is it? Like, how are you uploading? Where are you uploading?   {#671}
[00:38:27] STUDENT_1: So, uh, the, the upload, I think the upload will happen, um, via the S3 service.   {#672}
[00:38:34] STUDENT_1: That's what I believe.   {#673}
[00:38:34] STUDENT_1: So it will not add up the load on the API server.   {#674}
[00:38:38] STUDENT_5: So are you saying it will upload directly to S3?   {#675}
[00:38:40] STUDENT_5: Yes.   {#676}
[00:38:42] TEACHER: How does that happen?   {#677}
[00:38:46] STUDENT_1: So, so, so when we, uh, so, so as far as I know, there are two methodologies, right.   {#678}
[00:38:51] STUDENT_1: that S3 provides put and post to basically generate the present URL.   {#679}
[00:38:56] STUDENT_1: Right. And once we have that present URL, we can use those methods.   {#680}
[00:39:01] STUDENT_1: Right. So it can post or put to directly upload it to the S3.   {#681}
[00:39:05] STUDENT_1: And I think that present URL also has some sort of validity.   {#682}
[00:39:09] STUDENT_1: Right. So after that, it gets expired.   {#683}
[00:39:13] STUDENT_1: Right. So within that duration, the upload needs to happen.   {#684}
[00:39:18] TEACHER: Okay. With this, what you gain?   {#685}
[00:39:21] TEACHER: by uploading directly to S3 and not going via image upload.   {#686}
[00:39:25] TEACHER: So first, just a minute, let me just basically converge on this.   {#687}
[00:39:28] TEACHER: So what Chirak proposed as a solution is that instead of   {#688}
[00:39:32] TEACHER: we uploading 5 MB of data to APIs and APIs server,   {#689}
[00:39:36] TEACHER: then uploading it to S3, what he proposed is that   {#690}
[00:39:40] TEACHER: can we not directly upload to S3?   {#691}
[00:39:42] TEACHER: What this helps us save is it helps us save network bandwidth   {#692}
[00:39:47] TEACHER: on this service plus twice the data transfer.   {#693}
[00:39:51] TEACHER: data over here 5 mb data over here you pay for 2x of data that you're transferring which is a huge   {#694}
[00:39:57] TEACHER: aws cost aws egress cost if you would have heard is a big pain in gas it is it costs huge amount   {#695}
[00:40:03] TEACHER: of money relatively when you are directly or when you are anything goes out of your e-c2 instance   {#696}
[00:40:08] TEACHER: or comes within your e-c2 instance so egress and ingress cost so it becomes extremely expensive   {#697}
[00:40:13] TEACHER: given that you are just thinking that hey i'm just uploading 5 mb but for every hub that   {#698}
[00:40:18] TEACHER: introducing you are actually you are actually being built for egress and ingress cost so that's   {#699}
[00:40:24] TEACHER: really expensive so what siraq proposed is hey instead of uploading to the image upload service   {#700}
[00:40:29] TEACHER: and then which uploads to s3 what if we directly upload to s3 that's his proposal now how do you   {#701}
[00:40:35] TEACHER: achieve that this what he gave as a solution is a pre-signed url it's a very interesting concept   {#702}
[00:40:41] TEACHER: everyone uses it so what is a pre-signed url pre-signed url as the name suggests it is a url   {#703}
[00:40:48] TEACHER: which is pre-signed and has some expiration, which means that, for example,   {#704}
[00:40:54] TEACHER: I want to upload an end particular image.   {#705}
[00:40:56] TEACHER: What I would first do is I would talk to my image upload service.   {#706}
[00:41:02] TEACHER: First, I would talk to image upload service and ask it to generate a   {#707}
[00:41:09] TEACHER: random image ID for me.   {#708}
[00:41:11] TEACHER: That's it.   {#709}
[00:41:12] TEACHER: It's just an entry.   {#710}
[00:41:13] TEACHER: It's just a random image ID that I'm generating.   {#711}
[00:41:15] TEACHER: It would generate a random image ID and it would create a signed URL, pre-signed URL   {#712}
[00:41:23] TEACHER: for that specific path in GCS.   {#713}
[00:41:26] TEACHER: For example, s3 colon slash slash images slash random underscore ID dot png.   {#714}
[00:41:35] TEACHER: This is the path for example.   {#715}
[00:41:37] TEACHER: So it would generate a pre-signed URL for this path, which means that, hey S3, please   {#716}
[00:41:45] TEACHER: having a pre-signed URL for this specific path to upload anything to this.   {#717}
[00:41:51] TEACHER: It's a very short lived URL.   {#718}
[00:41:54] TEACHER: So what it does, this request comes to image upload.   {#719}
[00:41:57] TEACHER: So this is the preparation phase.   {#720}
[00:42:01] TEACHER: In the preparation phase, what you are doing is you are telling your image upload service that they   {#721}
[00:42:07] TEACHER: please generate a random image ID and generate a pre-signed URL on S3.   {#722}
[00:42:11] TEACHER: So it generated this path on S3 and it sends the present URL to user.   {#723}
[00:42:16] TEACHER: Now what user would do is user would make a post request with this image on the present   {#724}
[00:42:21] TEACHER: URL that it got. Whatever the present URL was it made that request and that path is what S3 spawned.   {#725}
[00:42:30] TEACHER: So image directly gets uploaded to S3. Now why do we need to over complicate the present URL?   {#726}
[00:42:36] TEACHER: The reason being that because one option is,   {#727}
[00:42:40] TEACHER: hey, let me just make my S3 open for everyone to upload from anywhere.   {#728}
[00:42:44] TEACHER: Now imagine if you do that,   {#729}
[00:42:46] TEACHER: I would just use it to upload a lot of data onto your S3 bucket for free   {#730}
[00:42:50] TEACHER: and you would be billed for that,   {#731}
[00:42:52] TEACHER: which means S3, because S3 bills on the amount of data that you are storing.   {#732}
[00:42:56] TEACHER: If you open it for everyone to upload the data onto your S3 bucket,   {#733}
[00:43:02] TEACHER: you will be paying a huge amount of bill to AWS   {#734}
[00:43:06] TEACHER: that your S3 bucket is open to upload, I'll just keep uploading my data to your S3 bucket.   {#735}
[00:43:11] TEACHER: Unnecessary. Right? So which is why S3 cannot open, you can still do it, but in this use case,   {#736}
[00:43:17] TEACHER: you don't have to do it, but you still want to directly upload image to S3. So S3 provided a   {#737}
[00:43:22] TEACHER: way for you to do that. That is pre-send URL in which your backend service will make an API call   {#738}
[00:43:31] TEACHER: to your S3 bucket and say that, Hey S3, please create a pre-signed URL for this specific path   {#739}
[00:43:37] TEACHER: valid for these seconds, 10 seconds, 20 seconds, 30 seconds, 60 seconds, whatever your time is.   {#740}
[00:43:43] TEACHER: For those 60 seconds, that path will be open through a pre-signed URL. So anyone having that   {#741}
[00:43:48] TEACHER: pre-signed URL is not the path that is open, but the pre-signed URL is the one that is doing that   {#742}
[00:43:53] TEACHER: magic. So that pre-signed URL accepts the post method in which accepts anything that you pass   {#743}
[00:44:01] TEACHER: and it uploads it on S3.   {#744}
[00:44:03] TEACHER: So this way, you first make an API call to image upload service.   {#745}
[00:44:08] TEACHER: Image upload service makes an API call to S3,   {#746}
[00:44:10] TEACHER: create a pre-signed URL.   {#747}
[00:44:11] TEACHER: The pre-signed URL is sent to the user   {#748}
[00:44:13] TEACHER: and then user directly sends image to S3 over the pre-signed URL.   {#749}
[00:44:18] TEACHER: This makes your architecture very flexible.   {#750}
[00:44:23] TEACHER: Why? And very efficient.   {#751}
[00:44:25] TEACHER: Why? Because you don't need bulky image upload server   {#752}
[00:44:28] TEACHER: that is taking up images.   {#753}
[00:44:31] TEACHER: Images are directly being uploaded to ST.   {#754}
[00:44:33] TEACHER: That saves you huge amount of value.   {#755}
[00:44:36] TEACHER: You are not doing 5 plus 5 MB transfer.   {#756}
[00:44:38] TEACHER: You are just doing 1 times 5 MB transfer.   {#757}
[00:44:40] TEACHER: So it saves you network cost as well.   {#758}
[00:44:42] TEACHER: It reduces the amount of infrastructure you have to manage.   {#759}
[00:44:45] TEACHER: Plus it gives you native security on AWS side using the pre-site URL.   {#760}
[00:44:49] TEACHER: You don't have to manage a lot of stuff on there.   {#761}
[00:44:51] TEACHER: This is the beauty of this implementation.   {#762}
[00:44:54] TEACHER: So again, let me show you a demo.   {#763}
[00:44:56] TEACHER: Let me show you a demo.   {#764}
[00:44:58] TEACHER: on a relatively, I'm just lowering your hands   {#765}
[00:45:00] TEACHER: when I ask, please raise them again.   {#766}
[00:45:03] TEACHER: Okay, I'll show you a demo.   {#767}
[00:45:05] TEACHER: Relatively,   {#768}
[00:45:07] TEACHER: on a very different website,   {#769}
[00:45:09] TEACHER: GitHub, who would have thought?   {#770}
[00:45:11] TEACHER: Instagram image upload, GitHub,   {#771}
[00:45:13] TEACHER: one and the same.   {#772}
[00:45:14] TEACHER: That's why I say system design is all about building blocks.   {#773}
[00:45:17] TEACHER: You need to know the solution.   {#774}
[00:45:19] TEACHER: You need to know how things work   {#775}
[00:45:22] TEACHER: and you can just Ctrl-C, Ctrl-V   {#776}
[00:45:24] TEACHER: anywhere you want it, right?   {#777}
[00:45:28] TEACHER: normal page of any repository issues I'm here in the comment that we get we can attach   {#778}
[00:45:35] TEACHER: any file over here let's say I put a image let's keep an eye and see what happens in the network   {#779}
[00:45:42] TEACHER: tab so I pick downloads I'm not sure what that is oh I think this is okay this is my next video   {#780}
[00:45:51] TEACHER: members only media okay so i click this image look at this this image is 179 kb big png file   {#781}
[00:46:00] TEACHER: of some dimensions i double click this now see what happens you see few calls happening here and   {#782}
[00:46:06] TEACHER: there four calls happen right let's go through them one by one first call okay first call it   {#783}
[00:46:14] TEACHER: It made the request to github.com slash upload slash policy slash assets.   {#784}
[00:46:21] TEACHER: It means that it is creating, it is registering,   {#785}
[00:46:24] TEACHER: it is asking its image upload service.   {#786}
[00:46:26] TEACHER: Hey, I want to upload something.   {#787}
[00:46:28] TEACHER: In the request, it sent that the name of the image is N underscore T.   {#788}
[00:46:34] TEACHER: This is what my name, actually my name was.   {#789}
[00:46:36] TEACHER: This is the YouTube ID FII.   {#790}
[00:46:38] TEACHER: I follow a particular convention.   {#791}
[00:46:40] TEACHER: So this is the YouTube video ID.   {#792}
[00:46:42] TEACHER: .ph is the name of my thumbnail.   {#793}
[00:46:44] TEACHER: Size is 183938, which is 179 KB.   {#794}
[00:46:55] TEACHER: Then the type is image PNG, authentication token, something, something, something.   {#795}
[00:46:59] TEACHER: That's it.   {#796}
[00:47:00] TEACHER: This is what the request is sent to this.   {#797}
[00:47:04] TEACHER: The first request is now sent from user, your front end, to github.com's backend.   {#798}
[00:47:12] TEACHER: and here image is not yet sent.   {#799}
[00:47:14] TEACHER: You don't see an image.   {#800}
[00:47:16] TEACHER: You just see metadata of the image.   {#801}
[00:47:18] TEACHER: Name, size, content, type and whatnot.   {#802}
[00:47:21] TEACHER: In the response, what we get?   {#803}
[00:47:23] TEACHER: What we get is a signed URL.   {#804}
[00:47:26] TEACHER: This is what present URL looks like.   {#805}
[00:47:28] TEACHER: So if you look carefully,   {#806}
[00:47:29] TEACHER: the first thing you did is upload URL.   {#807}
[00:47:32] TEACHER: Upload URL is where you have to upload the image.   {#808}
[00:47:35] TEACHER: Look carefully what the upload URL is.   {#809}
---- OWNED SEGMENTS END ----

CTX| [00:47:48] TEACHER: It's not GitHub URL.   {#810}
CTX| [00:47:49] TEACHER: It is S3's URL.   {#811}
CTX| [00:47:51] TEACHER: So what it says in the response.   {#812}
CTX| [00:47:54] TEACHER: And this is what the response is from the API server that you have as generated by S3.   {#813}
CTX| [00:48:00] TEACHER: So it has all the necessary information for your front end to upload image directly to S3.   {#814}
CTX| [00:48:07] TEACHER: For example, which is that information?   {#815}
CTX| [00:48:10] TEACHER: This is that information.   {#816}
CTX| [00:48:11] TEACHER: Upload URL, assets.   {#817}
CTX| [00:48:14] TEACHER: Asset is what the meta information was, right?   {#818}
CTX| [00:48:17] TEACHER: Some ID, some this, some this and HREF.   {#819}
CTX| [00:48:20] TEACHER: This HREF is what your image URL is going to be.   {#820}
CTX| [00:48:23] TEACHER: If you look carefully, this is the CDN URL.   {#821}
CTX| [00:48:26] TEACHER: Userimages.githubusercontent.com.   {#822}
CTX| [00:48:28] TEACHER: GitHubusercontent.com is the name.   {#823}
CTX| [00:48:30] TEACHER: h.arpitbhany.me.   {#824}
CTX| [00:48:32] TEACHER: These guys have user-images.githubusercontent.com.   {#825}
CTX| [00:48:35] TEACHER: This is the name of their CDN, the alias of their CDN.   {#826}
CTX| [00:48:38] TEACHER: In which there is a path 474, 789.   {#827}
CTX| [00:48:43] TEACHER: Now, if you look carefully, the next is 221335625.   {#828}
