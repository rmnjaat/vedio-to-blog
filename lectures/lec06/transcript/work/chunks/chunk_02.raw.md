# chunk_02  OWNS 00:12:45 -> 00:23:42  (segments #197-#380, 1748 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:11:46] TEACHER: It would read this file, read the bytes of it and send it as a response as part of this   {#181}
CTX| [00:11:51] TEACHER: HTTP request.   {#182}
CTX| [00:11:53] TEACHER: Once this response is received by the browser, the browser interprets it as an email because   {#183}
CTX| [00:11:58] TEACHER: you put it in the IMG tag and it renders it.   {#184}
CTX| [00:12:02] TEACHER: So this is how render happens.   {#185}
CTX| [00:12:04] TEACHER: So here we spoke about how static folders are mapped.   {#186}
CTX| [00:12:09] TEACHER: So slash static path map to slash static folder on your directory.   {#187}
CTX| [00:12:14] TEACHER: Where your code is different, where your static site is different.   {#188}
CTX| [00:12:19] TEACHER: So this is what happens.   {#189}
CTX| [00:12:22] TEACHER: Now, what does this tells us?   {#190}
CTX| [00:12:25] TEACHER: That this is what is happening as part of your code.   {#191}
CTX| [00:12:29] TEACHER: It reads the URL.   {#192}
CTX| [00:12:31] TEACHER: This is part of a backend code.   {#193}
CTX| [00:12:32] TEACHER: It reads the URL.   {#194}
CTX| [00:12:34] TEACHER: It extracts the path after slash static.   {#195}
CTX| [00:12:38] TEACHER: It goes to that corresponding folder, like that corresponding relative path in your static   {#196}

---- OWNED SEGMENTS START ----
[00:12:45] TEACHER: directory reads the content of in bytes and sends it back.   {#197}
[00:12:49] TEACHER: Which means that I instead of relying on slash static, I can do anything there.   {#198}
[00:12:56] TEACHER: I can write my own handler that instead of reading file from local test, it reads file   {#199}
[00:13:04] TEACHER: from S3.   {#200}
[00:13:05] TEACHER: For example, I can very well do that.   {#201}
[00:13:07] TEACHER: So let's say hypothetically, what I want to do is we saw how static path are exposed,   {#202}
[00:13:15] TEACHER: but let's say I want to expose a path slash raw, right?   {#203}
[00:13:20] TEACHER: So slash raw slash path, anything I gave over here as a path, what I want to do is whatever   {#204}
[00:13:27] TEACHER: path is over here.   {#205}
[00:13:28] TEACHER: I want to go to this S3 bucket at this path, read the file and written that as a response.   {#206}
[00:13:34] TEACHER: That's it.   {#207}
[00:13:37] TEACHER: to this is exact.   {#208}
[00:13:40] TEACHER: This is very similar to slash static, but slash static reads that same relative path   {#209}
[00:13:46] TEACHER: from local disk.   {#210}
[00:13:47] TEACHER: What we just did is we read that same thing from S3.   {#211}
[00:13:51] TEACHER: So which means that we don't have to configure for every single file on S3.   {#212}
[00:13:55] TEACHER: I'll configure one URL over here.   {#213}
[00:13:56] TEACHER: We just take a generic path over here.   {#214}
[00:13:59] TEACHER: Whatever is given over here, we're literally using that as a key of S3 present in this   {#215}
[00:14:05] TEACHER: bucket, reading the file and sending it to the user.   {#216}
[00:14:08] TEACHER: So with this three, four lines of code, what we just built is we built a proxy for S3.   {#217}
[00:14:17] TEACHER: So we provide, we make any HTTP requests like this,   {#218}
[00:14:21] TEACHER: HTTP call a slash, slash local as 5000 slash raw.   {#219}
[00:14:24] TEACHER: And whatever is there after that, it would use this as this path, read this path from   {#220}
[00:14:31] TEACHER: S3 present in the configured bucket, whichever bucket you have.   {#221}
[00:14:35] TEACHER: and serve this file.   {#222}
[00:14:37] TEACHER: Not a feature.   {#223}
[00:14:38] TEACHER: I'm not designing a new CDM.   {#224}
[00:14:39] TEACHER: I'm just telling you the possibility of how you can   {#225}
[00:14:45] TEACHER: return images as part of a normal HTTP response.   {#226}
[00:14:49] TEACHER: A lot of people for some reason think that we can only send JSON responses from Web server.   {#227}
[00:14:54] TEACHER: No, you can do a lot more than that.   {#228}
[00:14:59] TEACHER: One of the key things that you can do over here is to send the images   {#229}
[00:15:05] TEACHER: from your HTTP handlers that you have needed.   {#230}
[00:15:08] TEACHER: So I just literally just exposed a path,   {#231}
[00:15:13] TEACHER: exposed a URL,   {#232}
[00:15:15] TEACHER: sorry, exposed a route on my web server,   {#233}
[00:15:18] TEACHER: which literally just reading files from S3 and serving it to the user.   {#234}
[00:15:22] TEACHER: It's like, why are you doing it?   {#235}
[00:15:23] TEACHER: It's more about understanding what you can possibly do.   {#236}
[00:15:26] TEACHER: Now we'll see practical applications.   {#237}
[00:15:29] TEACHER: Okay.   {#238}
[00:15:30] TEACHER: So given that now it's in our control,   {#239}
[00:15:35] TEACHER: Whatever input is, it is not just that the image already.   {#240}
[00:15:41] TEACHER: What does this tells us?   {#241}
[00:15:42] TEACHER: It tells us that it is not really needed that your image already exists for it to read and serve.   {#242}
[00:15:51] TEACHER: We are just making a network call to S3 and reading it.   {#243}
[00:15:55] TEACHER: I can have my own custom logic over here.   {#244}
[00:15:59] TEACHER: And then what matters is the bytes we send to the end user.   {#245}
[00:16:05] TEACHER: That's it.   {#246}
[00:16:06] TEACHER: If we are sending a properly structured image in the response,   {#247}
[00:16:12] TEACHER: byte serialized version of it,   {#248}
[00:16:13] TEACHER: the browser would be rendering it.   {#249}
[00:16:16] TEACHER: Now, where do we see this in action?   {#250}
[00:16:19] TEACHER: I'm sure you would have seen a lot of images on social platforms   {#251}
[00:16:24] TEACHER: where people share about their GitHub repositories   {#252}
[00:16:28] TEACHER: or people share their GitHub repositories.   {#253}
[00:16:30] TEACHER: Now, let's take a look at how that works.   {#254}
[00:16:34] TEACHER: There's a very interesting side effect of understanding this.   {#255}
[00:16:37] TEACHER: I'm just sharing my complete screen.   {#256}
[00:16:39] TEACHER: I'll show you them.   {#257}
[00:16:40] TEACHER: So I have this project DiceDB.   {#258}
[00:16:43] TEACHER: Now, if I share this project on social platforms,   {#259}
[00:16:46] TEACHER: I'd want very interesting things about this project.   {#260}
[00:16:50] TEACHER: Because when you share it on Twitter or LinkedIn or Facebook,   {#261}
[00:16:56] TEACHER: you see a very nice way of representing it.   {#262}
[00:17:02] TEACHER: Do we have any people who have shared?   {#263}
[00:17:05] TEACHER: I think I have only done that.   {#264}
[00:17:07] TEACHER: I'll show you.   {#265}
[00:17:11] TEACHER: DiceDB.   {#266}
[00:17:16] TEACHER: See, this is...   {#267}
[00:17:18] TEACHER: No, not this.   {#268}
[00:17:18] TEACHER: This is the one I'm talking about.   {#269}
[00:17:21] TEACHER: So I shared the link.   {#270}
[00:17:23] TEACHER: DiceDB slash Dice.   {#271}
[00:17:24] TEACHER: GitHub.com slash Dice.   {#272}
[00:17:25] TEACHER: Dice.   {#273}
[00:17:26] TEACHER: What it rendered?   {#274}
[00:17:27] TEACHER: It rendered a social snippet of it.   {#275}
[00:17:29] TEACHER: It has ways to render a link.   {#276}
[00:17:32] TEACHER: It patches the information, the title, the site name,   {#277}
[00:17:35] TEACHER: the description that you provide and the image.   {#278}
[00:17:38] TEACHER: Now this image is not some generic image.   {#279}
[00:17:40] TEACHER: This image is specific to DiceDB.   {#280}
[00:17:43] TEACHER: DiceDB slash Dice.   {#281}
[00:17:44] TEACHER: This is the description, number of contributors, number of issues,   {#282}
[00:17:47] TEACHER: number of discussion, number of stars and number of folks.   {#283}
[00:17:50] TEACHER: This image.   {#284}
[00:17:54] TEACHER: This image is generated on the fly.   {#285}
[00:17:59] TEACHER: by GitHub, not every time, but on the fly by GitHub.   {#286}
[00:18:03] TEACHER: So let's take a look.   {#287}
[00:18:05] TEACHER: And I'm happy that I have five notifications.   {#288}
[00:18:07] TEACHER: Okay.   {#289}
[00:18:09] TEACHER: So when I share this thing, if you go and by the way,   {#290}
[00:18:12] TEACHER: how is this image rendered?   {#291}
[00:18:14] TEACHER: This is part of open graph protocol called OG.   {#292}
[00:18:17] TEACHER: So you in the HTML that you serve, you have to specify OG colon image,   {#293}
[00:18:22] TEACHER: whatever the URL you provide in OG colon image,   {#294}
[00:18:26] TEACHER: that URL is rendered as an image over here.   {#295}
[00:18:29] TEACHER: That's what happens.   {#296}
[00:18:31] TEACHER: So if I go through the code of this and I do view page source   {#297}
[00:18:34] TEACHER: and I search for OG image, you see this content, this thing.   {#298}
[00:18:42] TEACHER: And now if I do paste, you see this exact same image.   {#299}
[00:18:47] TEACHER: Now what is this?   {#300}
[00:18:49] TEACHER: What is this particular path?   {#301}
[00:18:51] TEACHER: If you look carefully, it does not end with .jpg, .png, anything like that.   {#302}
[00:18:57] TEACHER: But what it is indeed returning is it is indeed returning a valid image as a byte response,   {#303}
[00:19:05] TEACHER: like reading the bytes of the image and sending it back.   {#304}
[00:19:08] TEACHER: But now this does not mean that this image is stored on S3 somewhere by GitHub.   {#305}
[00:19:13] TEACHER: Imagine GitHub unnecessarily creating images on the fly because if you look carefully,   {#306}
[00:19:19] TEACHER: the data that you see in the image, it's very customized to what the current state of information   {#307}
[00:19:27] TEACHER: of my repository.   {#308}
[00:19:28] TEACHER: If you look carefully for car 74 to 75 contributors and whatnot, right?   {#309}
[00:19:33] TEACHER: This is very recent.   {#310}
[00:19:36] TEACHER: If in a day it changes, this would change again.   {#311}
[00:19:40] TEACHER: If you let's say become a contributor and dies DP, the count will change to 11.   {#312}
[00:19:46] TEACHER: Maybe it would take one day or two days to reflect, but it's very recent.   {#313}
[00:19:49] TEACHER: It's not that it is pre-generated by GitHub.   {#314}
[00:19:54] TEACHER: A lot of people think everything is pre-generated.   {#315}
[00:19:57] TEACHER: No, it is not.   {#316}
[00:19:58] TEACHER: Because imagine GitHub has millions and millions and millions of repositories.   {#317}
[00:20:03] TEACHER: Why would GitHub spend computation power generating one for each every single day?   {#318}
[00:20:08] TEACHER: So what happens is you generate image on the fly, on demand, whenever it is requested.   {#319}
[00:20:16] TEACHER: And this is what you do.   {#320}
[00:20:18] TEACHER: So here what is happening is if you look careful at the path,   {#321}
[00:20:22] TEACHER: This path shows us that for you to, if I did just take this image and put in the IMG tag,   {#322}
[00:20:31] TEACHER: it would render this image in my browser without any hiccup.   {#323}
[00:20:34] TEACHER: So what is happening is this is literally the route handler that we wrote, the one that   {#324}
[00:20:42] TEACHER: we wrote slash raw slash raw slash path.   {#325}
[00:20:46] TEACHER: This is kind of that.   {#326}
[00:20:47] TEACHER: And it is put behind CDN.   {#327}
[00:20:48] TEACHER: This is another CDN that it has open graph.githubassets.com.   {#328}
[00:20:52] TEACHER: This is another CDN that they hosted similar to how we saw   {#329}
[00:20:56] TEACHER: edge.arbitpending.me yesterday.   {#330}
[00:20:58] TEACHER: This is one more CDN on the GitHub side.   {#331}
[00:21:01] TEACHER: We saw one on the GitHub as well, user assets, GitHub something,   {#332}
[00:21:07] TEACHER: githubusercontent.com.   {#333}
[00:21:08] TEACHER: This is another CDN that they've configured.   {#334}
[00:21:11] TEACHER: So here this CDN looks very specific to Open Graph.   {#335}
[00:21:15] TEACHER: Open Graph, OG that I was talking about, that is Open Graph.   {#336}
[00:21:18] TEACHER: So this is what you are invoking.   {#337}
[00:21:22] TEACHER: How this is built is simple.   {#338}
[00:21:26] TEACHER: You have this key would remain constant for a repository or something.   {#339}
[00:21:31] TEACHER: You can generate it on the fly as well.   {#340}
[00:21:33] TEACHER: But the idea is pretty simple that when this URL is sent from the backend to the frontend,   {#341}
[00:21:39] TEACHER: frontend renders it in the IMG tag.   {#342}
[00:21:41] TEACHER: This request goes to CDN hosted at opengraph.githubassets.com.   {#343}
[00:21:46] TEACHER: CDN says if it has the file or not.   {#344}
[00:21:48] TEACHER: If it has cached the file, which is image file, good enough.   {#345}
[00:21:51] TEACHER: It would serve it back to the user, which is what is now happening.   {#346}
[00:21:54] TEACHER: See how quickly it gets loaded.   {#347}
[00:21:56] TEACHER: This means that it does not have to go to there every time.   {#348}
[00:21:59] TEACHER: It doesn't have to go to backend server every time.   {#349}
[00:22:01] TEACHER: Right?   {#350}
[00:22:02] TEACHER: If CDN does not have this file, what CDN would do?   {#351}
[00:22:04] TEACHER: It would make call to origin.   {#352}
[00:22:06] TEACHER: What is origin?   {#353}
[00:22:07] TEACHER: Origin is the API server of GitHub, which handles this request, which is generating   {#354}
[00:22:12] TEACHER: this image on the fly.   {#355}
[00:22:16] TEACHER: That, Hey, this is where my title should be.   {#356}
[00:22:18] TEACHER: my title, this is where my repository icon should be.   {#357}
[00:22:21] TEACHER: This is what I would have fetched the key statistics   {#358}
[00:22:23] TEACHER: about repository and put it over here.   {#359}
[00:22:25] TEACHER: This is a template, no matter which image you,   {#360}
[00:22:28] TEACHER: which repository you pick, you would see this exact same format.   {#361}
[00:22:31] TEACHER: It is a template I used to watch it.   {#362}
[00:22:33] TEACHER: So what is happening over here is the API server of GitHub,   {#363}
[00:22:37] TEACHER: when that particular API call is made by the CDN,   {#364}
[00:22:40] TEACHER: it is generating that image on the fly using image magic   {#365}
[00:22:43] TEACHER: for any library or like there is a library called PIL,   {#366}
[00:22:46] TEACHER: There is a library called image magic around tons of libraries out there to generate images on the fly.   {#367}
[00:22:51] TEACHER: It generates image on the fly and responds back to whom CDN met a request.   {#368}
[00:22:56] TEACHER: It sends response to CDN.   {#369}
[00:22:57] TEACHER: CDN gets the response.   {#370}
[00:22:58] TEACHER: CDN caches the file.   {#371}
[00:23:00] TEACHER: And then with some TTL, it keeps it there and serves it to the user.   {#372}
[00:23:04] TEACHER: The subsequent requests are served on the CDN.   {#373}
[00:23:07] TEACHER: After a day, when that thing exhausts, when the file expires,   {#374}
[00:23:12] TEACHER: The next request that comes in, there is a cache miss on CDN, goes to backend.   {#375}
[00:23:18] TEACHER: A new image is generated on the right, it is generated on demand.   {#376}
[00:23:21] TEACHER: So it's not that GitHub is creating and storing this image for every repository out there.   {#377}
[00:23:25] TEACHER: It is doing it on demand as it is distributed because the image itself contains the recent information,   {#378}
[00:23:32] TEACHER: which is why GitHub cannot pre-generate those images and store it.   {#379}
[00:23:37] TEACHER: And now you can see this feature at hundreds of places.   {#380}
---- OWNED SEGMENTS END ----

CTX| [00:23:42] TEACHER: banner bear, always specializing in doing this.   {#381}
CTX| [00:23:46] TEACHER: This is how you make the social sharing stuff really easy,   {#382}
CTX| [00:23:51] TEACHER: really interactive, really real time.   {#383}
CTX| [00:23:53] TEACHER: For example, just imagine if Twitter tomorrow wants to do this.   {#384}
CTX| [00:23:58] TEACHER: I'll give an example.   {#385}
CTX| [00:23:59] TEACHER: If Twitter tomorrow wants to do this, would you see LinkedIn   {#386}
CTX| [00:24:02] TEACHER: quote unquote influencers taking a screenshot of their Twitter   {#387}
CTX| [00:24:05] TEACHER: and poet.so and creating a very nice beautiful image   {#388}
CTX| [00:24:08] TEACHER: and sharing it on LinkedIn.   {#389}
CTX| [00:24:09] TEACHER: Then imagine that as a native feature of Twitter, where when you share a Twitter URL, the OZ   {#390}
CTX| [00:24:17] TEACHER: image that is generates, it looks very beautiful like this.   {#391}
CTX| [00:24:21] TEACHER: What it could do is when that request comes into CDN, CDN does not have the data, it goes   {#392}
CTX| [00:24:25] TEACHER: to backend.   {#393}
CTX| [00:24:25] TEACHER: Twitter's API server would generate that image on the fly using that same template or using   {#394}
CTX| [00:24:31] TEACHER: the templatized version of it.   {#395}
CTX| [00:24:33] TEACHER: It captures the tweet, puts it in it, nicely formats it and sends it to the response.   {#396}
CTX| [00:24:37] TEACHER: right cash on the CDNs up to the user Twitter can build this as a name so when you share your   {#397}
