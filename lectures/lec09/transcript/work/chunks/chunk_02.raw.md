# chunk_02  OWNS 00:11:10 -> 00:23:34  (segments #169-#391, 2044 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:10:10] TEACHER: What if that other thing distributes it geographically?   {#150}
CTX| [00:10:13] TEACHER: Now that is an advantage.   {#151}
CTX| [00:10:14] TEACHER: For example, if I have a server, this server is sitting in let's say Singapore and someone   {#152}
CTX| [00:10:20] TEACHER: from the US is trying to access it.   {#153}
CTX| [00:10:22] TEACHER: Transferring 10 MB of image to US will slow things down.   {#154}
CTX| [00:10:25] TEACHER: What if the 10 MB image is cached near to that user?   {#155}
CTX| [00:10:28] TEACHER: That is exactly what CDN is.   {#156}
CTX| [00:10:30] TEACHER: So what CDN is doing is it is sitting transparently between your user and origin.   {#157}
CTX| [00:10:34] TEACHER: But now how?   {#158}
CTX| [00:10:35] TEACHER: How is CDN actually configured?   {#159}
CTX| [00:10:39] TEACHER: CDN is configured.   {#160}
CTX| [00:10:40] TEACHER: So when you, and I would highly, highly, highly recommend   {#161}
CTX| [00:10:44] TEACHER: log into any of the CDN, sign up for a free trial   {#162}
CTX| [00:10:48] TEACHER: and configure it on your own.   {#163}
CTX| [00:10:50] TEACHER: Nothing beats practical experience.   {#164}
CTX| [00:10:53] TEACHER: Sign up for Akamai Cloudflare, pick your favorite CDN   {#165}
CTX| [00:10:56] TEACHER: and configure it.   {#166}
CTX| [00:10:58] TEACHER: It just, you'd say that, or even AWS Cloudflare,   {#167}
CTX| [00:11:02] TEACHER: whenever you go to a CDN, all it asks for this one origin URL,   {#168}

---- OWNED SEGMENTS START ----
[00:11:10] TEACHER: done and then it just seamlessly works.   {#169}
[00:11:14] TEACHER: So we'll talk about how that happens.   {#170}
[00:11:15] TEACHER: Right.   {#171}
[00:11:16] TEACHER: But what we want to do at the moment is this part, which is near static, huge in size.   {#172}
[00:11:23] TEACHER: I want to serve it via CDN.   {#173}
[00:11:24] TEACHER: So what do I do?   {#174}
[00:11:25] TEACHER: When I log into a CDN provider, let's say cloud player, pick your favorite.   {#175}
[00:11:31] TEACHER: You are asked to provide a mapping.   {#176}
[00:11:34] TEACHER: This mapping is your CDN URL.   {#177}
[00:11:39] TEACHER: for your website, not really just the website, but a CDN property, they call it.   {#178}
[00:11:44] TEACHER: So this is your subdomain on mycdn.net.   {#179}
[00:11:47] TEACHER: So let's say mycdn.net is the provider after my cloud or anything.   {#180}
[00:11:51] TEACHER: So a.mycdn.net is yours.   {#181}
[00:11:54] TEACHER: In this, you can provide a specific origin.   {#182}
[00:11:57] TEACHER: So what did you provide as an origin?   {#183}
[00:12:00] TEACHER: Artitani.me.   {#184}
[00:12:02] TEACHER: This is the mapping that you configure on CDN that, Hey, this is my CDN property.   {#185}
[00:12:06] TEACHER: a.mycedient.net mapped with arpitbany.me.   {#186}
[00:12:10] TEACHER: So which means that anytime the request comes to a.mycedient.net,   {#187}
[00:12:15] TEACHER: I want it to forward it to arpitbany.me.   {#188}
[00:12:17] TEACHER: But now how does that happen?   {#189}
[00:12:19] TEACHER: So let's say when user types instead of arpitbany.me   {#190}
[00:12:25] TEACHER: slash systemdesign slash logo dot png,   {#191}
[00:12:28] TEACHER: if the user hits a.mycedient.net slash systemdesign slash logo dot png,   {#192}
[00:12:34] TEACHER: now what would happen?   {#193}
[00:12:36] TEACHER: doesn't know it's a CDN or browser it's simple whatever the host name is I'll do   {#194}
[00:12:41] TEACHER: the DNS resolution I'll forward the request to that particular IP address   {#195}
[00:12:44] TEACHER: that's what browser will do browser has no idea in it apart from this so when it   {#196}
[00:12:51] TEACHER: does a domain name resolution of a.mycedon.net where would it go the   {#197}
[00:12:55] TEACHER: domain name resolution will spit out the IP address of the CDN provider which   {#198}
[00:13:00] TEACHER: means here so if you were doing with that with any.me the request would go   {#199}
[00:13:06] TEACHER: you're doing a.mycedon.net, it would go over here. It's a classic DNS configuration that   {#200}
[00:13:10] TEACHER: you do on Route 53 and whichever thing or your domain provider, like GoDaddy, Namecheap   {#201}
[00:13:18] TEACHER: and whatnot. This is what you actually configure. So a.mycedon.net points to CDN, your Cloud   {#202}
[00:13:27] TEACHER: Fair or command whatnot. That's what your CDN would give you out of the box. You have   {#203}
[00:13:30] TEACHER: to configure this that, hey, when someone hits this, what's the origin for that? So   {#204}
[00:13:36] TEACHER: When someone hits this particular URL, where would the request go?   {#205}
[00:13:41] TEACHER: A.mycedian.net.   {#206}
[00:13:42] TEACHER: Where is A.mycedian.net?   {#207}
[00:13:43] TEACHER: Here.   {#208}
[00:13:44] TEACHER: When it goes over here, what's the business logic on CDN?   {#209}
[00:13:47] TEACHER: It says that, hey, I received request for A.mycedian.net for this particular path.   {#210}
[00:13:53] TEACHER: What do I do next?   {#211}
[00:13:54] TEACHER: It will check in the mapping.   {#212}
[00:13:56] TEACHER: What is A.mycedian.net configured to as an origin?   {#213}
[00:14:00] TEACHER: It is configured on artedhany.me as an origin.   {#214}
[00:14:05] TEACHER: because it is configured as urbanvary.me as origin server it would simply discard this   {#215}
[00:14:11] TEACHER: take this path and make the request to this so it literally took whichever path you provide   {#216}
[00:14:18] TEACHER: a.mycdn.net slash literally anything you don't have to configure the engine every url on cdn   {#217}
[00:14:24] TEACHER: literally any path it would take it it would take those things out like a.mycdn.net it would   {#218}
[00:14:30] TEACHER: replace it with the origin that you provided. So arpitbani.me and it would hit this path to get the   {#219}
[00:14:39] TEACHER: data. Given it was the first request let's say for the first time user hit this a.mycedon.net   {#220}
[00:14:47] TEACHER: slash systemdesign slash logo.png the request came to your cdn cdn first check hey do I have   {#221}
[00:14:54] TEACHER: anything cache for this path no because it's a first request so it would do that hey what's   {#222}
[00:14:57] TEACHER: So origin for a.mycdn.net, it said arpitbani.me that would literally replace this with arpitbani.me   {#223}
[00:15:05] TEACHER: slash systemdesign slash logo.png.   {#224}
[00:15:07] TEACHER: It would, and who would make this request?   {#225}
[00:15:10] TEACHER: CDN.   {#226}
[00:15:11] TEACHER: And where would this request go?   {#227}
[00:15:13] TEACHER: Normal.   {#228}
[00:15:13] TEACHER: arpitbani.me slash systemdesign slash logo.png.   {#229}
[00:15:16] TEACHER: The request will go to the origin server.   {#230}
[00:15:18] TEACHER: It would generate damage like it always does.   {#231}
[00:15:20] TEACHER: Sends it to the CDN.   {#232}
[00:15:22] TEACHER: CDN caches it and sends the response.   {#233}
[00:15:26] TEACHER: Right?   {#234}
[00:15:27] TEACHER: Next then the request comes in for hddpscollegs.a.mass.edn.net.systemdesign.logo.png.   {#235}
[00:15:34] TEACHER: The request all go to CDN just like always.   {#236}
[00:15:38] TEACHER: It has this image cache that we directly serve it over here.   {#237}
[00:15:41] TEACHER: If it did not have the image, it would go to origin, grab the image, and then serve it to the user.   {#238}
[00:15:46] TEACHER: But now because it has already, it has the image, it can directly serve it from here itself.   {#239}
[00:15:53] TEACHER: And this is how CDN is configured.   {#240}
[00:15:57] TEACHER: have to configure every single path on CDN.   {#241}
[00:16:00] TEACHER: You just configure this is my CDN property.   {#242}
[00:16:03] TEACHER: This is my origin and done.   {#243}
[00:16:05] TEACHER: Now whichever path you call after this is what if it has a data it serves it.   {#244}
[00:16:11] TEACHER: If it does not it goes to the origin for the same path gets a response and serves it.   {#245}
[00:16:15] TEACHER: That's it.   {#246}
[00:16:16] TEACHER: That's all CDN does.   {#247}
[00:16:18] TEACHER: Geographical distribution and all those are advanced configuration, but this is the bare   {#248}
[00:16:22] TEACHER: minimum where your CDN sits transparently in between.   {#249}
[00:16:27] TEACHER: CDN does it geographically, it caches it, it sends it real fast and what not.   {#250}
[00:16:32] TEACHER: That is advanced stuff.   {#251}
[00:16:34] TEACHER: But at least for us, for a normal engineer who wants to build a system, this is the bare   {#252}
[00:16:39] TEACHER: minimum thing that we need to do.   {#253}
[00:16:41] TEACHER: Now what does this tell us?   {#254}
[00:16:43] TEACHER: This tells us one very interesting thing that CDN does not care if it is images, if it is   {#255}
[00:16:50] TEACHER: videos.   {#256}
[00:16:51] TEACHER: For CDN, whatever I get in the response I will cache it.   {#257}
[00:16:55] TEACHER: For CDN, it is just set of bytes, which is the beauty of it.   {#258}
[00:16:59] TEACHER: A lot of people think, hey, I can only cache things on CDN.   {#259}
[00:17:02] TEACHER: I can only cache images on CDN.   {#260}
[00:17:04] TEACHER: No.   {#261}
[00:17:05] TEACHER: For CDN, it's literally just a set of bytes.   {#262}
[00:17:10] TEACHER: You can cache API responses, JSON responses, text files, images, videos,   {#263}
[00:17:15] TEACHER: fragments, and whatnot on CDN.   {#264}
[00:17:19] TEACHER: I have a video on my YouTube channel on how GP uses CDN.   {#265}
[00:17:23] TEACHER: Watch that.   {#266}
[00:17:25] TEACHER: understand what how beautifully Jiffy leverages CDN and it caches so much of stuff on CDN.   {#267}
[00:17:32] TEACHER: Obviously why to even waste your bandwidth? Okay now that we are on topic of bandwidth,   {#268}
[00:17:37] TEACHER: what CDN helps us achieve is that it does not even let the request come within the backend infra.   {#269}
[00:17:46] TEACHER: For example, if you are making a call to something, call comes to CDN, CDN has it,   {#270}
[00:17:51] TEACHER: and service it back, the request is not even coming to your back end.   {#271}
[00:17:56] TEACHER: What does this mean?   {#272}
[00:17:57] TEACHER: This means that we are saving up a lot of bandwidth of our back end servers.   {#273}
[00:18:02] TEACHER: Help us reduce the cost of our infrastructure.   {#274}
[00:18:04] TEACHER: We don't need hundreds of us to serve those things.   {#275}
[00:18:08] TEACHER: Two servers more than that because everything else is served from the CD.   {#276}
[00:18:11] TEACHER: So CDN helps us ensure that we are not even, our back end servers are not   {#277}
[00:18:15] TEACHER: even handing the request anymore.   {#278}
[00:18:17] TEACHER: Like few requests every time the cache invalidates you,   {#279}
[00:18:21] TEACHER: nothing more than that.   {#280}
[00:18:22] TEACHER: That's the beauty of CDN.   {#281}
[00:18:24] TEACHER: That's why you're paying them money to do it.   {#282}
[00:18:26] TEACHER: They give you efficiency.   {#283}
[00:18:27] TEACHER: They reduce the load on the backend.   {#284}
[00:18:29] TEACHER: You keep your infrastructure cost down while paying almost equivalent amount of money to   {#285}
[00:18:33] TEACHER: CDN and to get extra performance.   {#286}
[00:18:36] TEACHER: And this is how CDN is configured.   {#287}
[00:18:39] TEACHER: This is the bare minimum thing that you need to know about configuring a CDN.   {#288}
[00:18:42] TEACHER: So now what you should definitely do, sign up on a CDN, Akamai Cloudflare, pick your   {#289}
[00:18:48] TEACHER: favorite and build that and just try to configure it.   {#290}
[00:18:52] TEACHER: And here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can   {#291}
[00:18:57] TEACHER: be pushed, can be packed behind CDN.   {#292}
[00:18:59] TEACHER: It is literally anything, anything.   {#293}
[00:19:02] TEACHER: You can literally configure facebook.com as a backend of CDN.   {#294}
[00:19:05] TEACHER: They would not judge you.   {#295}
[00:19:06] TEACHER: For them it's simple URL.   {#296}
[00:19:08] TEACHER: That is it.   {#297}
[00:19:11] TEACHER: Right.   {#298}
[00:19:11] TEACHER: Okay.   {#299}
[00:19:12] TEACHER: Let me give you a quick demo.   {#300}
[00:19:14] TEACHER: Wait, wait, wait, not yet done.   {#301}
[00:19:18] TEACHER: Let me give you a quick demo of this so that you understand it more deeply.   {#302}
[00:19:25] TEACHER: Stop share, I will share my full screen because it's not good without a demo right?   {#303}
[00:19:37] TEACHER: Because it's not just theory that we are talking here.   {#304}
[00:19:40] TEACHER: Okay, let me show you this.   {#305}
[00:19:42] TEACHER: This is an image.   {#306}
[00:19:43] TEACHER: If I copy image link, you would see what this image link is.   {#307}
[00:19:48] TEACHER: It is edge.arpetbhany.me.   {#308}
[00:19:51] TEACHER: It's name of my CDN.   {#309}
[00:19:53] TEACHER: I brought like a.mycdn.net.   {#310}
[00:19:56] TEACHER: I just gave it a fancy name called edge.arpetbhany.me.   {#311}
[00:19:59] TEACHER: I could have given any name.   {#312}
[00:20:00] TEACHER: I could have went with the default one as well.   {#313}
[00:20:03] TEACHER: But now the idea here is that this is coming from CDN.   {#314}
[00:20:08] TEACHER: It is not even coming to my backend server.   {#315}
[00:20:10] TEACHER: because the images that I have is served via this part.   {#316}
[00:20:18] TEACHER: See, this is actual image.   {#317}
[00:20:21] TEACHER: arpidani.me slash static slash imd slash arpid.png   {#318}
[00:20:24] TEACHER: This is the actual image served from my backend.   {#319}
[00:20:28] TEACHER: But now what I did is I wanted to serve it from where?   {#320}
[00:20:31] TEACHER: From my CDN because why do I put load on my backend servers?   {#321}
[00:20:35] TEACHER: So what did I do?   {#322}
[00:20:36] TEACHER: I went to my CDN, configured it, took a fancy name, edge.arpitbhane.me.   {#323}
[00:20:41] TEACHER: I configured arpitbhane.me slash static as my origin.   {#324}
[00:20:46] TEACHER: So instead of specifying that, hey, only arpitbhane.me is the origin,   {#325}
[00:20:50] TEACHER: I configured arpitbhane.me slash static as my origin.   {#326}
[00:20:53] TEACHER: Now when the request comes for edge.arpitbhane.me slash img slash arpitbhane.png,   {#327}
[00:21:02] TEACHER: the request goes to where?   {#328}
[00:21:04] TEACHER: My CDN because it is h.arpidbhani.   {#329}
[00:21:06] TEACHER: It went to my CDN.   {#330}
[00:21:08] TEACHER: CDN saw, hey, I don't have this image.   {#331}
[00:21:10] TEACHER: What it would do?   {#332}
[00:21:11] TEACHER: It would go to origin.   {#333}
[00:21:13] TEACHER: What is origin?   {#334}
[00:21:14] TEACHER: arpidbhani.me slash static.   {#335}
[00:21:16] TEACHER: This is the config out string.   {#336}
[00:21:18] TEACHER: It literally plugs this path out   {#337}
[00:21:21] TEACHER: slash img slash arpidbhani.png   {#338}
[00:21:24] TEACHER: and puts it after the origin server.   {#339}
[00:21:27] TEACHER: So then the actual URL becomes   {#340}
[00:21:31] TEACHER: arpidbhani.me   {#341}
[00:21:32] TEACHER: slash static slash img   {#342}
[00:21:34] TEACHER: slash arpidbhani.png   {#343}
[00:21:35] TEACHER: So that's where the request goes. It gets the response,   {#344}
[00:21:38] TEACHER: caches it on the CDN and responds back.   {#345}
[00:21:40] TEACHER: So that's a call that CDN makes   {#346}
[00:21:41] TEACHER: to my origin server. So   {#347}
[00:21:43] TEACHER: going forward, all requests, this is all   {#348}
[00:21:45] TEACHER: coming from CDN.   {#349}
[00:21:48] TEACHER: That's it. It's normal string   {#350}
[00:21:49] TEACHER: concat, like string replacement,   {#351}
[00:21:51] TEACHER: making a call, caching it here and sending   {#352}
[00:21:54] TEACHER: it back. As simple as that.   {#353}
[00:21:56] TEACHER: So I can literally give   {#354}
[00:21:59] TEACHER: path i could literally provide any path and it would work just fine so let's i'll give an example   {#355}
[00:22:05] TEACHER: let's say go to essays oh sorry i have not configured it so it would not sorry anything   {#356}
[00:22:09] TEACHER: on strastatic it would work but i'm i don't have much in strastatic only a few images here but it   {#357}
[00:22:15] TEACHER: would not work but i would highly recommend you to go to any cdn of your choice and configure this   {#358}
[00:22:21] TEACHER: pick my website pick my image for that matter and see how it caches try with that even if it   {#359}
[00:22:27] TEACHER: charges you a dollar or two, it's peanuts.   {#360}
[00:22:29] TEACHER: You would understand it more   {#361}
[00:22:31] TEACHER: deeply and that's what matters.   {#362}
[00:22:33] TEACHER: Theoretical, veritical,   {#363}
[00:22:34] TEACHER: it's all okay. Gain that practical experience.   {#364}
[00:22:38] TEACHER: Okay.   {#365}
[00:22:39] TEACHER: So this is all about CDN. Any questions   {#366}
[00:22:41] TEACHER: on this? I'll switch back.   {#367}
[00:22:43] TEACHER: Go on, Rahul.   {#368}
[00:22:44] STUDENT_1: So my question is basically   {#369}
[00:22:46] STUDENT_1: like from what   {#370}
[00:22:48] STUDENT_1: I am able to understand of CDN   {#371}
[00:22:51] STUDENT_1: from what you had just told me and   {#372}
[00:22:52] STUDENT_1: what I have understood as a whole   {#373}
[00:22:54] STUDENT_1: is that it only works for   {#374}
[00:22:57] STUDENT_1: public resources.   {#375}
[00:23:00] TEACHER: I started   {#376}
[00:23:01] TEACHER: with saying that it is not the case.   {#377}
[00:23:03] TEACHER: There are private things that you can work on.   {#378}
[00:23:05] TEACHER: That depends on the CDN that you are using.   {#379}
[00:23:07] STUDENT_1: So yeah, that's what I was   {#380}
[00:23:09] STUDENT_1: thinking. Netflix also uses   {#381}
[00:23:10] STUDENT_1: CDN and all of those things.   {#382}
[00:23:12] STUDENT_1: And like   {#383}
[00:23:14] STUDENT_1: Netflix also uses CDN.   {#384}
[00:23:16] STUDENT_1: Most of their traffic   {#385}
[00:23:18] STUDENT_1: is being served via CDN.   {#386}
[00:23:21] STUDENT_1: So like   {#387}
[00:23:22] STUDENT_1: in that case,   {#388}
[00:23:24] STUDENT_1: when we are serving private content,   {#389}
[00:23:27] STUDENT_1: There are all sorts of things like tokens,   {#390}
[00:23:30] STUDENT_1: authentication and all of those things.   {#391}
---- OWNED SEGMENTS END ----

CTX| [00:23:34] STUDENT_5: Don't jump.   {#392}
CTX| [00:23:35] TEACHER: First try out CDN.   {#393}
CTX| [00:23:37] TEACHER: First try out CDN.   {#394}
CTX| [00:23:38] TEACHER: We'll touch upon making things private   {#395}
CTX| [00:23:39] TEACHER: in the image upload design that we talked about.   {#396}
CTX| [00:23:43] TEACHER: There few things will get clear,   {#397}
CTX| [00:23:44] TEACHER: but play around with CDN.   {#398}
CTX| [00:23:46] TEACHER: Play around with CDN before you ask these questions.   {#399}
CTX| [00:23:50] TEACHER: Get your hands dirty   {#400}
CTX| [00:23:51] TEACHER: because tomorrow you have entire day of today   {#401}
CTX| [00:23:53] TEACHER: to play around with that.   {#402}
CTX| [00:23:54] TEACHER: Tomorrow we'll have another discussion   {#403}
CTX| [00:23:57] TEACHER: part of CDN. I would recommend you to get your hands dirty today and ask the same question.   {#404}
CTX| [00:24:03] TEACHER: What happens when you have private content? See the kind of configuration that CDN provides. CDN   {#405}
CTX| [00:24:06] TEACHER: needs to interface with let's say AWS private buckets to ensure that even though that content   {#406}
CTX| [00:24:12] TEACHER: is private, you're still able to serve it. You have to configure AWS keys here and there and in order   {#407}
CTX| [00:24:16] TEACHER: to have that seamless access. So that there are additional features. This is a simplified process   {#408}
CTX| [00:24:22] TEACHER: and not all CDN would support AWS.   {#409}
CTX| [00:24:24] TEACHER: There is specific, these are plugins that CDN, like some CDN choose to support AWS, some   {#410}
CTX| [00:24:29] TEACHER: CDN will go for other cloud provider, right?   {#411}
CTX| [00:24:31] TEACHER: But then they need to implement this logic that, Hey, this is how, if it is private,   {#412}
