# chunk_03  OWNS 00:23:42 -> 00:35:15  (segments #381-#615, 1854 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:22:43] TEACHER: for any library or like there is a library called PIL,   {#366}
CTX| [00:22:46] TEACHER: There is a library called image magic around tons of libraries out there to generate images on the fly.   {#367}
CTX| [00:22:51] TEACHER: It generates image on the fly and responds back to whom CDN met a request.   {#368}
CTX| [00:22:56] TEACHER: It sends response to CDN.   {#369}
CTX| [00:22:57] TEACHER: CDN gets the response.   {#370}
CTX| [00:22:58] TEACHER: CDN caches the file.   {#371}
CTX| [00:23:00] TEACHER: And then with some TTL, it keeps it there and serves it to the user.   {#372}
CTX| [00:23:04] TEACHER: The subsequent requests are served on the CDN.   {#373}
CTX| [00:23:07] TEACHER: After a day, when that thing exhausts, when the file expires,   {#374}
CTX| [00:23:12] TEACHER: The next request that comes in, there is a cache miss on CDN, goes to backend.   {#375}
CTX| [00:23:18] TEACHER: A new image is generated on the right, it is generated on demand.   {#376}
CTX| [00:23:21] TEACHER: So it's not that GitHub is creating and storing this image for every repository out there.   {#377}
CTX| [00:23:25] TEACHER: It is doing it on demand as it is distributed because the image itself contains the recent information,   {#378}
CTX| [00:23:32] TEACHER: which is why GitHub cannot pre-generate those images and store it.   {#379}
CTX| [00:23:37] TEACHER: And now you can see this feature at hundreds of places.   {#380}

---- OWNED SEGMENTS START ----
[00:23:42] TEACHER: banner bear, always specializing in doing this.   {#381}
[00:23:46] TEACHER: This is how you make the social sharing stuff really easy,   {#382}
[00:23:51] TEACHER: really interactive, really real time.   {#383}
[00:23:53] TEACHER: For example, just imagine if Twitter tomorrow wants to do this.   {#384}
[00:23:58] TEACHER: I'll give an example.   {#385}
[00:23:59] TEACHER: If Twitter tomorrow wants to do this, would you see LinkedIn   {#386}
[00:24:02] TEACHER: quote unquote influencers taking a screenshot of their Twitter   {#387}
[00:24:05] TEACHER: and poet.so and creating a very nice beautiful image   {#388}
[00:24:08] TEACHER: and sharing it on LinkedIn.   {#389}
[00:24:09] TEACHER: Then imagine that as a native feature of Twitter, where when you share a Twitter URL, the OZ   {#390}
[00:24:17] TEACHER: image that is generates, it looks very beautiful like this.   {#391}
[00:24:21] TEACHER: What it could do is when that request comes into CDN, CDN does not have the data, it goes   {#392}
[00:24:25] TEACHER: to backend.   {#393}
[00:24:25] TEACHER: Twitter's API server would generate that image on the fly using that same template or using   {#394}
[00:24:31] TEACHER: the templatized version of it.   {#395}
[00:24:33] TEACHER: It captures the tweet, puts it in it, nicely formats it and sends it to the response.   {#396}
[00:24:37] TEACHER: right cash on the CDNs up to the user Twitter can build this as a name so when you share your   {#397}
[00:24:42] TEACHER: Twitter link it can automatically render your tweet in a very nice looking image as a social   {#398}
[00:24:48] TEACHER: in a very social image right and that's very powerful when it comes to experience when it   {#399}
[00:24:54] TEACHER: comes to designing great user experience because user sees personalized things user sees something   {#400}
[00:25:00] TEACHER: which is very recent it just does not see ah this is static rep of github and something something   {#401}
[00:25:07] TEACHER: where it is like what's the current likes and shares and comments   {#402}
[00:25:11] TEACHER: and retweets and reposts and all those things that matter   {#403}
[00:25:16] TEACHER: right there in the image which is shared.   {#404}
[00:25:17] TEACHER: And you can literally build this in hardly one hour.   {#405}
[00:25:22] TEACHER: Hardly one hour.   {#406}
[00:25:24] TEACHER: We lost a local prototype.   {#407}
[00:25:25] TEACHER: Highly recommend you to do this.   {#408}
[00:25:27] TEACHER: Highly, highly, highly recommend you to do this.   {#409}
[00:25:30] TEACHER: It's not difficult.   {#410}
[00:25:31] TEACHER: Install Python.   {#411}
[00:25:32] TEACHER: I've worked with Python for in order to build this.   {#412}
[00:25:35] TEACHER: Java also might have something or whatever language you're using   {#413}
[00:25:37] TEACHER: would have something.   {#414}
[00:25:38] TEACHER: But pick a library that helps you generate images on the fly.   {#415}
[00:25:43] TEACHER: Typically PIL, Python image library is the best out there.   {#416}
[00:25:47] TEACHER: It internally uses image magic.   {#417}
[00:25:48] TEACHER: It has a C++ binding to that.   {#418}
[00:25:51] TEACHER: But it just gives you native Python interface to create images on the fly.   {#419}
[00:25:55] TEACHER: And just do it.   {#420}
[00:25:56] TEACHER: Expose an API endpoint that does this.   {#421}
[00:25:58] TEACHER: You can generate the same thing for any GitHub repo in the world.   {#422}
[00:26:01] TEACHER: This exact same thing.   {#423}
[00:26:03] TEACHER: Just make a call to GitHub.   {#424}
[00:26:05] TEACHER: that information out, create image on the fly and serve it via your local host.   {#425}
[00:26:10] TEACHER: You learn so much from doing that. And this is how images are actually like these sort of dynamic   {#426}
[00:26:17] TEACHER: images are generated and so giving user a great experience. Earlier, if you remember,   {#427}
[00:26:28] TEACHER: when you shared images, GitHub used to render a very pathetic avatar of that user. So if I shared   {#428}
[00:26:33] TEACHER: images so my ugly image would just come there on the screen big flashy image that's a very that was   {#429}
[00:26:39] TEACHER: a very poor experience so github implemented this to make a sharing of repositories on social media   {#430}
[00:26:47] TEACHER: very pleasant right and through this you could see that how whatever we discussed up until now   {#431}
[00:26:56] TEACHER: whatever we discuss across these many weeks, every single thing you can see it in production   {#432}
[00:27:02] TEACHER: used by some of the other companies.   {#433}
[00:27:05] TEACHER: Nothing is theoretical as I always say.   {#434}
[00:27:07] TEACHER: You can prototype literally every single thing we discuss.   {#435}
[00:27:10] TEACHER: There is no such thing that I need 50,000 servers to do that.   {#436}
[00:27:14] TEACHER: No, you don't.   {#437}
[00:27:15] TEACHER: You can, you just want your local machine spin it up and try it out.   {#438}
[00:27:18] TEACHER: Right.   {#439}
[00:27:19] TEACHER: Nothing beats practical structure.   {#440}
[00:27:21] TEACHER: Right.   {#441}
[00:27:21] TEACHER: Okay.   {#442}
[00:27:22] TEACHER: Given we have built enough context on this.   {#443}
[00:27:26] TEACHER: talk about Gravita. Now this becomes an easy problem. After this, after we design, after   {#444}
[00:27:29] TEACHER: we discuss this, we'll take questions. Okay. So what is Gravita? So Gravita is a very interesting   {#445}
[00:27:37] TEACHER: concept. On Gravita, what happens is you would have seen that on some websites, even though   {#446}
[00:27:44] TEACHER: you do not sign up with your Twitter or Gmail or Microsoft or whatever account you are using,   {#447}
[00:27:50] TEACHER: it is still able to render your image somehow.   {#448}
[00:27:54] TEACHER: And which is where Gravatar comes in.   {#449}
[00:27:56] TEACHER: You might have logged into Gravatar in order to enable that.   {#450}
[00:27:59] TEACHER: But the idea of Gravatar is pretty neat.   {#451}
[00:28:01] TEACHER: So what Gravatar does is it creates your single embeddable URL for your profile picture.   {#452}
[00:28:12] TEACHER: For example, if let's say your email ID, let's say my email ID is rp.gmail.com.   {#453}
[00:28:20] TEACHER: Let's say it is arpit.gmail.com.   {#454}
[00:28:22] TEACHER: So what I could do is I could go to gravita.com, login me arpit.gmail.com and I can upload   {#455}
[00:28:29] TEACHER: a bunch of profile pictures there.   {#456}
[00:28:31] TEACHER: I can mark one of them as active.   {#457}
[00:28:34] TEACHER: Right.   {#458}
[00:28:34] TEACHER: Now my URL, what it would generate, it would not generate.   {#459}
[00:28:38] TEACHER: It's basically very simple.   {#460}
[00:28:40] TEACHER: It's an MD5 hash of my email ID.   {#461}
[00:28:42] TEACHER: So it pretty much is constant.   {#462}
[00:28:44] TEACHER: Pretty much it is definitely constant.   {#463}
[00:28:46] TEACHER: hashing. If you pass the value, I repeat, I direct gmail.com to the same hash function,   {#464}
[00:28:51] TEACHER: you get the same output always. So it's gravita.com slash hash of my email ID.   {#465}
[00:28:56] TEACHER: So when I go to this URL, this URL actually renders my current profile photo, which I can   {#466}
[00:29:05] TEACHER: literally put in any IMG tag, something like this. So https colon slash gravita.com slash   {#467}
[00:29:15] TEACHER: Let's say this is the hash of my email ID.   {#468}
[00:29:17] TEACHER: I think it's something like, this is something very similar to this.   {#469}
[00:29:21] TEACHER: So, hdps colon slash slash gravita dot com slash zero EAFD 172.   {#470}
[00:29:26] TEACHER: When this is put in IMG SRC, it actually renders the image in the browser.   {#471}
[00:29:32] TEACHER: It's not that this takes me to somewhere and that renders the email.   {#472}
[00:29:34] TEACHER: This is actually returning the image as bytes over here.   {#473}
[00:29:41] TEACHER: What we just looked at when we are reading from a message and survey data, similar.   {#474}
[00:29:45] TEACHER: It is literally this single URL to render your profile photo.   {#475}
[00:29:51] TEACHER: Now what happens is, let's say every company in the world adopts it, which means that whenever   {#476}
[00:29:56] TEACHER: you sign up on any platform or any social platform of the world, what you get is, what   {#477}
[00:30:03] TEACHER: they could do is they have your email ID.   {#478}
[00:30:05] TEACHER: They can pass that email ID to the hash function and use this to render your profile photo   {#479}
[00:30:11] TEACHER: wherever they want to.   {#480}
[00:30:12] TEACHER: So in the post and the profile page and wherever, they could just use this one URL to render   {#481}
[00:30:18] TEACHER: it.   {#482}
[00:30:19] TEACHER: Right?   {#483}
[00:30:20] TEACHER: If every company starts supporting this, now what would happen?   {#484}
[00:30:24] TEACHER: If tomorrow you want to change your profile photo, you don't have to go and upload on   {#485}
[00:30:27] TEACHER: every social platform.   {#486}
[00:30:29] TEACHER: What you can do is you can just go to gravatar.com, upload your new photo, mark that other one   {#487}
[00:30:34] TEACHER: is active.   {#488}
[00:30:35] TEACHER: When you mark that other one is active, the next request comes in for this URL.   {#489}
[00:30:39] TEACHER: Go to Gravatar backend.   {#490}
[00:30:41] TEACHER: It will find that other photo is active.   {#491}
[00:30:43] TEACHER: Pick that up, send it out.   {#492}
[00:30:45] TEACHER: Everywhere your profile photo is changed without any social network have to do anything.   {#493}
[00:30:52] TEACHER: You don't have to go to any website and do that.   {#494}
[00:30:54] TEACHER: But they don't obviously do that.   {#495}
[00:30:56] TEACHER: But it's a very novel concept.   {#496}
[00:30:58] TEACHER: What we'll do today is we'll build this very safe.   {#497}
[00:31:01] TEACHER: what we want to do is support this efficiently we are building around gravita.com it's a really   {#498}
[00:31:09] TEACHER: simple system that you can very well build in three or four hours not really good scan is   {#499}
[00:31:13] TEACHER: difficult building a prototype is not so that's why i recommend build prototypes as many as you   {#500}
[00:31:17] TEACHER: can right so what are our requirements our requirements from gravita what we are designing   {#501}
[00:31:23] TEACHER: is first user can upload multiple pictures on gravita second user can mark one of them as active   {#502}
[00:31:32] TEACHER: the one which is active whenever the API is requested when one of them is active it returns   {#503}
[00:31:36] TEACHER: the active one in the response this is what we have right so let's kick off our brainstorming   {#504}
[00:31:43] TEACHER: then let's see how we should approach this problem i want and given that we built so much of context   {#505}
[00:31:51] TEACHER: Let's directly kick off grades.   {#506}
[00:31:52] TEACHER: How would you start?   {#507}
[00:31:53] TEACHER: How would you approach this problem?   {#508}
[00:31:55] TEACHER: Raise your hands or pull you in.   {#509}
[00:32:08] TEACHER: Okay.   {#510}
[00:32:09] TEACHER: Let's start with database.   {#511}
[00:32:09] TEACHER: Let's start with database.   {#512}
[00:32:11] TEACHER: What kind of table you have?   {#513}
[00:32:13] TEACHER: What kind of schema would you have?   {#514}
[00:32:14] TEACHER: What would you store?   {#515}
[00:32:20] STUDENT_2: The hash of the email ID of the user.   {#516}
[00:32:23] TEACHER: What, which tables would you have?   {#517}
[00:32:25] TEACHER: Let's start with each table that you have, right?   {#518}
[00:32:29] STUDENT_2: With the user table where user gives his email ID and we store the hash for it.   {#519}
[00:32:35] TEACHER: Will you store email ID or not?   {#520}
[00:32:37] TEACHER: The actual email ID.   {#521}
[00:32:41] STUDENT_3: We should.   {#522}
[00:32:45] TEACHER: Why? If you are just using hash Y to store actual email ID.   {#523}
[00:32:49] STUDENT_11: Yeah, right.   {#524}
[00:32:51] TEACHER: No, it's not right. How would they log into Gravatar?   {#525}
[00:32:57] STUDENT_2: Correct.   {#526}
[00:32:58] STUDENT_2: We can directly hash their email ID.   {#527}
[00:33:02] STUDENT_2: Because see, ID is a derivable attribute.   {#528}
[00:33:09] STUDENT_2: So storing one of them makes sense.   {#529}
[00:33:12] STUDENT_2: and since you have   {#530}
[00:33:13] STUDENT_2: why   {#531}
[00:33:13] TEACHER: why all social   {#532}
[00:33:15] TEACHER: platforms take   {#533}
[00:33:16] TEACHER: your email ID   {#534}
[00:33:17] TEACHER: and not and   {#535}
[00:33:17] TEACHER: store your actual   {#536}
[00:33:18] TEACHER: email ID instead   {#537}
[00:33:19] TEACHER: of storing the   {#538}
[00:33:20] TEACHER: hash of it   {#539}
[00:33:23] STUDENT_2: no   {#540}
[00:33:24] STUDENT_2: they can also do   {#541}
[00:33:25] TEACHER: that that would   {#542}
[00:33:25] STUDENT_2: save them a lot   {#543}
[00:33:26] STUDENT_2: of space   {#544}
[00:33:27] STUDENT_2: I think the use   {#545}
[00:33:28] STUDENT_2: case there is a   {#546}
[00:33:28] STUDENT_2: little different   {#547}
[00:33:29] STUDENT_2: because you might   {#548}
[00:33:30] STUDENT_2: need to display   {#549}
[00:33:31] STUDENT_2: that email ID   {#550}
[00:33:32] STUDENT_2: somewhere but   {#551}
[00:33:32] STUDENT_2: at Gravita   {#552}
[00:33:33] STUDENT_2: we don't need   {#553}
[00:33:34] STUDENT_2: to display   {#554}
[00:33:34] STUDENT_2: why not if you   {#555}
[00:33:36] STUDENT_2: open Gravita   {#556}
[00:33:36] TEACHER: you go to the   {#557}
[00:33:37] TEACHER: profile page you   {#558}
[00:33:38] TEACHER: want to see   {#559}
[00:33:38] TEACHER: your email ID   {#560}
[00:33:39] TEACHER: don't you   {#561}
[00:33:42] TEACHER: How are you authenticating people there?   {#562}
[00:33:44] TEACHER: Right.   {#563}
[00:33:45] TEACHER: While authentication people pass it because in case of hash collision, you are locked   {#564}
[00:33:49] TEACHER: in some others account.   {#565}
[00:33:50] TEACHER: Also problem.   {#566}
[00:33:52] TEACHER: Correct.   {#567}
[00:33:54] TEACHER: It's always better to store email ID.   {#568}
[00:33:57] TEACHER: Right.   {#569}
[00:33:57] TEACHER: Okay.   {#570}
[00:33:58] TEACHER: So ID, email ID.   {#571}
[00:33:59] TEACHER: What else?   {#572}
[00:34:02] TEACHER: Not hash probably because hash is a derivable attribute.   {#573}
[00:34:05] TEACHER: Okay.   {#574}
[00:34:06] TEACHER: Hash is derivable attribute.   {#575}
[00:34:08] TEACHER: So I'll just write hash and cross it off.   {#576}
[00:34:11] TEACHER: You're not, you're deliberately not storing hash because it is derivable.   {#577}
[00:34:14] TEACHER: Okay.   {#578}
[00:34:15] TEACHER: Any other thing that you would add to user, that's what users table is fine.   {#579}
[00:34:18] TEACHER: Uh, which other table?   {#580}
[00:34:24] STUDENT_2: I think that, uh, just one, I don't know whether it should be a different table or   {#581}
[00:34:30] STUDENT_2: within the same one to store the image paths, not the active one, but just the   {#582}
[00:34:36] TEACHER: image paths.   {#583}
[00:34:37] TEACHER: how would you   {#584}
[00:34:38] TEACHER: store multiple   {#585}
[00:34:39] TEACHER: paths in a   {#586}
[00:34:40] TEACHER: single column   {#587}
[00:34:41] TEACHER: of relational   {#588}
[00:34:41] TEACHER: DB?   {#589}
[00:34:42] TEACHER: Yeah, we   {#590}
[00:34:43] TEACHER: won't be able   {#591}
[00:34:43] TEACHER: to.   {#592}
[00:34:44] TEACHER: That is why   {#593}
[00:34:44] TEACHER: I said.   {#594}
[00:34:45] TEACHER: So let's say   {#595}
[00:34:46] TEACHER: you have a   {#596}
[00:34:46] TEACHER: photos table.   {#597}
[00:34:47] TEACHER: Yep.   {#598}
[00:34:48] STUDENT_2: In which   {#599}
[00:34:48] STUDENT_2: what do you   {#600}
[00:34:49] STUDENT_2: store?   {#601}
[00:34:52] STUDENT_2: The email   {#602}
[00:34:54] STUDENT_2: ID of the   {#603}
[00:34:55] STUDENT_2: user ID.   {#604}
[00:34:59] STUDENT_2: Obviously   {#605}
[00:34:59] STUDENT_2: the photos   {#606}
[00:35:01] STUDENT_2: ID.   {#607}
[00:35:04] TEACHER: What is   {#608}
[00:35:05] TEACHER: photos ID?   {#609}
[00:35:06] TEACHER: The, the   {#610}
[00:35:06] TEACHER: The primary key of the photo step.   {#611}
[00:35:08] TEACHER: The primary key.   {#612}
[00:35:09] TEACHER: Okay.   {#613}
[00:35:10] TEACHER: Okay.   {#614}
[00:35:10] TEACHER: And what else?   {#615}
---- OWNED SEGMENTS END ----

CTX| [00:35:15] STUDENT_2: The parts of the images, photos.   {#616}
CTX| [00:35:19] TEACHER: Do we really need to do that?   {#617}
CTX| [00:35:20] TEACHER: Recall yesterday's discussion.   {#618}
CTX| [00:35:22] TEACHER: Can you not derive it?   {#619}
CTX| [00:35:25] STUDENT_2: You can.   {#620}
CTX| [00:35:27] STUDENT_2: Right.   {#621}
CTX| [00:35:28] STUDENT_2: But there would be multiple.   {#622}
CTX| [00:35:29] STUDENT_2: I did think of the yesterday's discussion, but there would be multiple photos.   {#623}
CTX| [00:35:33] TEACHER: So there would be multiple rows over here.   {#624}
CTX| [00:35:35] TEACHER: What's the problem with it?   {#625}
CTX| [00:35:37] TEACHER: And obviously you need to start multiple photos, right?   {#626}
CTX| [00:35:40] TEACHER: Because user can upload multiple pictures on it and mark one of them as active.   {#627}
CTX| [00:35:45] TEACHER: So you need to render all of them.   {#628}
CTX| [00:35:47] TEACHER: Let's say you uploaded 10 photos.   {#629}
CTX| [00:35:48] TEACHER: You need to render 10 photos.   {#630}
CTX| [00:35:52] TEACHER: So all the photos uploaded by the user will go over here.   {#631}
CTX| [00:35:55] TEACHER: Right?   {#632}
CTX| [00:35:56] TEACHER: ID user ID.   {#633}
CTX| [00:35:56] TEACHER: And what else would you store?   {#634}
CTX| [00:36:01] TEACHER: The photo, which is active.   {#635}
CTX| [00:36:04] STUDENT_9: Okay.   {#636}
CTX| [00:36:04] TEACHER: So let's call it is active.   {#637}
CTX| [00:36:07] TEACHER: Anything else?   {#638}
CTX| [00:36:10] STUDENT_9: I think that's it.   {#639}
CTX| [00:36:12] TEACHER: Got it.   {#640}
CTX| [00:36:13] TEACHER: Heyman, let's write queries.   {#641}
