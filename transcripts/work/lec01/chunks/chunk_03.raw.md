# chunk_03  OWNS 00:22:41 -> 00:34:48  (segments #362-#573, 2045 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:21:44] STUDENT_4: basically you the problem that we were having is like inconsistency when caching okay in the first   {#350}
CTX| [00:21:50] STUDENT_4: in the first point so let's just say uh like we have a cache uh which also has a feature of   {#351}
CTX| [00:21:56] STUDENT_4: like publish and subscribe okay uh all of the all of the nodes api servers that are here   {#352}
CTX| [00:22:05] STUDENT_4: are publishers and themselves are subscribers. Okay. Whenever any update comes, we update   {#353}
CTX| [00:22:12] STUDENT_4: the entry in the cache and the cache itself. I'd have to stop it. I'd have to stop you.   {#354}
CTX| [00:22:18] TEACHER: People will get confused. They might not have heard of this. Let me come back to this. Next   {#355}
CTX| [00:22:22] TEACHER: week we'll be touching upon this. Then it would make sense. It's just that I'm being   {#356}
CTX| [00:22:26] TEACHER: wary of the different kinds of experiences that people have. So everyone is on the same.   {#357}
CTX| [00:22:32] TEACHER: I just don't want people to get lost in this terms.   {#358}
CTX| [00:22:37] TEACHER: That's right.   {#359}
CTX| [00:22:38] TEACHER: That's right.   {#360}
CTX| [00:22:39] TEACHER: Shiva.   {#361}

---- OWNED SEGMENTS START ----
[00:22:41] STUDENT_2: Yeah.   {#362}
[00:22:42] STUDENT_2: So my example is also like very similar to the third one, which is the browser caching,   {#363}
[00:22:47] STUDENT_2: but I can go like give like a very specific example of how we use it.   {#364}
[00:22:51] STUDENT_2: So we used it for personalized recommendations.   {#365}
[00:22:54] STUDENT_2: and the use case for us was mostly not in terms of latency,   {#366}
[00:23:00] STUDENT_2: but more for how the users perceive if we personalize too often.   {#367}
[00:23:05] STUDENT_2: So the use case is we try to re-rank the products on the category pages   {#368}
[00:23:10] STUDENT_2: and the extreme could be we...   {#369}
[00:23:13] STUDENT_2: So if a user revisits a category page,   {#370}
[00:23:16] STUDENT_2: we can again do the re-ranking, right?   {#371}
[00:23:18] STUDENT_2: And that would be like an extreme case.   {#372}
[00:23:20] STUDENT_2: and then the other extreme is we don't update it for the full day or something.   {#373}
[00:23:26] STUDENT_2: So we did some experiments and found like optimal time   {#374}
[00:23:29] STUDENT_2: of for how much time we have to store these recommendations   {#375}
[00:23:33] STUDENT_2: so that the users don't get too confused,   {#376}
[00:23:36] STUDENT_2: but we also deliver the benefits of personalization.   {#377}
[00:23:39] STUDENT_2: So this was like one implication for us.   {#378}
[00:23:43] STUDENT_2: And also we used this information to also prepare our training data sets   {#379}
[00:23:50] STUDENT_2: different way so that we take into account these effect of, uh, caches.   {#380}
[00:23:55] STUDENT_2: So, uh, yeah.   {#381}
[00:23:57] TEACHER: So which means that let's say, so hypothetically, let's say I'm Amazon and   {#382}
[00:24:02] TEACHER: whatever recommendations I have, I store it in my browser's local storage   {#383}
[00:24:05] TEACHER: on my apps device.   {#384}
[00:24:06] TEACHER: And you just use that to render it.   {#385}
[00:24:09] TEACHER: Right.   {#386}
[00:24:10] TEACHER: Instead of making an expensive call in the backend to do that computation.   {#387}
[00:24:14] TEACHER: Right.   {#388}
[00:24:15] STUDENT_2: Yeah.   {#389}
[00:24:15] STUDENT_2: Yeah.   {#390}
[00:24:16] STUDENT_2: But we have also set like a, uh, like a time.   {#391}
[00:24:20] STUDENT_2: We also refresh them.   {#392}
[00:24:23] STUDENT_2: So, uh, the recommendations don't become, that's an excellent.   {#393}
[00:24:26] STUDENT_5: That's an excellent hack, right?   {#394}
[00:24:27] TEACHER: Because anyway, you can just pick few items at random.   {#395}
[00:24:30] TEACHER: Let's say you recommend 50 items, but on viewport, you can show only 10.   {#396}
[00:24:34] TEACHER: So you pick 10 at random.   {#397}
[00:24:35] TEACHER: Every time the user would think, Oh my God, the recommendations are so fast and so good   {#398}
[00:24:39] TEACHER: and recommendations update once every day for this.   {#399}
[00:24:42] TEACHER: That's an excellent optimization.   {#400}
[00:24:44] TEACHER: Right?   {#401}
[00:24:44] STUDENT_17: Yeah.   {#402}
[00:24:45] STUDENT_17: Hmm.   {#403}
[00:24:46] STUDENT_5: Nice.   {#404}
[00:24:47] STUDENT_5: Thanks.   {#405}
[00:24:47] STUDENT_5: Thanks for adding that.   {#406}
[00:24:48] STUDENT_5: It's brilliant.   {#407}
[00:24:51] STUDENT_5: Yes, Vishal?   {#408}
[00:24:54] STUDENT_7: Yeah, so we used to have caching on two levels.   {#409}
[00:25:01] STUDENT_7: We used to have CDN Cloudflare for caching the whole response of the request.   {#410}
[00:25:08] STUDENT_7: And we also had used the render.io, which is basically cached all JS files, all CSS files,   {#411}
[00:25:20] STUDENT_7: the assets like images, videos and everything.   {#412}
[00:25:23] STUDENT_7: So it would be like very beneficial for our team when we used it,   {#413}
[00:25:29] STUDENT_7: the render.io and cloud.   {#414}
[00:25:32] STUDENT_5: So one thing that, uh, we shall briefly pointed out is what he cashed.   {#415}
[00:25:37] TEACHER: Like a lot of people think CDN is something that can only cash static   {#416}
[00:25:42] TEACHER: things like images and videos and this part.   {#417}
[00:25:44] TEACHER: No, what he cashed was responses.   {#418}
[00:25:48] TEACHER: So for example, you can serve API responses via CDN.   {#419}
[00:25:51] TEACHER: We'll go in depth of CDN in third week, fourth week, fifth week.   {#420}
[00:25:54] TEACHER: But still, let me just touch upon that.   {#421}
[00:25:56] TEACHER: That you can, it's like CDNs are not just to cache images.   {#422}
[00:26:03] TEACHER: Big misconception.   {#423}
[00:26:04] TEACHER: I don't know how people come to that.   {#424}
[00:26:06] TEACHER: So such a big generalization.   {#425}
[00:26:08] TEACHER: But CDNs is just a proxy that sits in between you and the backend.   {#426}
[00:26:13] TEACHER: You can literally cache anything.   {#427}
[00:26:14] TEACHER: For CDN, anything that comes from the backend is just bytes.   {#428}
[00:26:18] TEACHER: whatever bytes you send from the backend CDN will cache it.   {#429}
[00:26:20] TEACHER: Right?   {#430}
[00:26:21] TEACHER: So you can actually cache API responses on CDN for something   {#431}
[00:26:24] TEACHER: that does not change often.   {#432}
[00:26:25] TEACHER: For example, search results or rather search results are popular terms.   {#433}
[00:26:30] TEACHER: Right?   {#434}
[00:26:30] TEACHER: Giphy uses that.   {#435}
[00:26:31] TEACHER: For example, most popular terms.   {#436}
[00:26:35] TEACHER: So for when you can cache it on CDN, you don't even have to go to backend   {#437}
[00:26:38] TEACHER: to get the answer.   {#438}
[00:26:39] TEACHER: Right?   {#439}
[00:26:39] TEACHER: Not even hit your centralized cache.   {#440}
[00:26:41] TEACHER: You can just directly send it from the CDN.   {#441}
[00:26:44] TEACHER: So API responses that are near static can also be cached on the CDN.   {#442}
[00:26:50] TEACHER: So keep those things open.   {#443}
[00:26:52] TEACHER: Add-in for CDN is just bytes.   {#444}
[00:26:54] TEACHER: It does not know it is an image or a video or something.   {#445}
[00:26:56] TEACHER: For that, it is just a set of bytes that it can cache that it got from the back   {#446}
[00:27:01] TEACHER: and it goes to cache and distribute globally across.   {#447}
[00:27:04] TEACHER: So caching responses on the CDN, what it helps us in doing is it helps us save the request   {#448}
[00:27:13] TEACHER: our infrastructure to handle that request because given that you have CDN.   {#449}
[00:27:19] TEACHER: Let's say you have bunch of users, you have your backend, you have your database and all.   {#450}
[00:27:26] TEACHER: But apart from that, you also have a CDN over here.   {#451}
[00:27:32] TEACHER: So given the request will go to CDN and CDN will call to backend and backend will talk   {#452}
[00:27:37] TEACHER: to the database to do it.   {#453}
[00:27:38] TEACHER: If your CDN itself has the answer, the request does not even have to come to your infrastructure.   {#454}
[00:27:45] TEACHER: Malab, the request is not even coming to your backend server.   {#455}
[00:27:48] TEACHER: It is directly getting served from the CDN.   {#456}
[00:27:50] TEACHER: And it's not just images and videos.   {#457}
[00:27:51] TEACHER: It could be literally, literally anything.   {#458}
[00:27:54] TEACHER: Like for CDN is just set of bytes that are coming in.   {#459}
[00:27:57] TEACHER: So I can literally expose or cache hdps colon slash slash search.abc.com slash popular.   {#460}
[00:28:04] TEACHER: So all the popular searches of my platform can be cached on the CDN.   {#461}
[00:28:08] TEACHER: this call the request goes to CDN, CDN has the response CDN services back.   {#462}
[00:28:12] TEACHER: We'll talk in depth of how this works.   {#463}
[00:28:15] TEACHER: We'll use CDN in very interesting ways in the future, but this is just a sneak peek of that.   {#464}
[00:28:20] TEACHER: But this is an excellent, excellent place where we can get this performance benefit.   {#465}
[00:28:25] TEACHER: Thanks for breaking that up.   {#466}
[00:28:27] TEACHER: I'll pick one more and if this doesn't cover what I wanted to cover, I'll add my point and then   {#467}
[00:28:34] TEACHER: other things I'll take it.   {#468}
[00:28:39] STUDENT_2: Yeah.   {#469}
[00:28:40] STUDENT_2: Hi, so I would like to add to the first point, right?   {#470}
[00:28:43] STUDENT_2: So at the API server level caching, no, no API server level.   {#471}
[00:28:49] STUDENT_2: Yeah.   {#472}
[00:28:50] STUDENT_2: Yeah.   {#473}
[00:28:51] STUDENT_2: To the first point.   {#474}
[00:28:52] STUDENT_2: Right.   {#475}
[00:28:53] STUDENT_2: So we are, we are caching that in the memory, right?   {#476}
[00:28:56] STUDENT_2: But we can also do this level caching, right?   {#477}
[00:28:59] STUDENT_2: Because that would, that will save the expensive network IO call to the database or any cache   {#478}
[00:29:06] TEACHER: This is exactly what I wanted to cover.   {#479}
[00:29:08] TEACHER: Thanks.   {#480}
[00:29:09] TEACHER: Thanks so much.   {#481}
[00:29:09] TEACHER: I'm so glad I pulled you in Jirak.   {#482}
[00:29:12] TEACHER: This is mind blowing awesome optimization, right?   {#483}
[00:29:16] TEACHER: A lot of people, which is what I said yesterday that don't just think of cache as something   {#484}
[00:29:21] TEACHER: that goes and fits in memory.   {#485}
[00:29:23] TEACHER: Think of cache as anything that helps you save an expensive computation or an expensive   {#486}
[00:29:28] TEACHER: IO.   {#487}
[00:29:31] TEACHER: Now, just try to remember whenever you spin up an API server, whenever you spin up an   {#488}
[00:29:35] TEACHER: to instance or a GCVM or anything you attach some disc to it, 8 GB, 20 GB, something.   {#489}
[00:29:42] TEACHER: Are you literally using that disc?   {#490}
[00:29:44] TEACHER: You don't.   {#491}
[00:29:45] TEACHER: That disc is only there to store your operating system and your bundles, your jar files, your   {#492}
[00:29:52] TEACHER: Python packages and whatnot.   {#493}
[00:29:53] TEACHER: They're not using like out of those 20 GB, 2 GB, 3 GB are being used.   {#494}
[00:29:58] TEACHER: They're not leveraging it enough.   {#495}
[00:29:59] TEACHER: Now you may think that what you were doing here is with caching it in RAM.   {#496}
[00:30:05] TEACHER: Now this is memory bound.   {#497}
[00:30:08] TEACHER: API server RAM is very costly.   {#498}
[00:30:10] TEACHER: If it is memory bound, which means that your API server,   {#499}
[00:30:14] TEACHER: let's say if it has 8 GB RAM,   {#500}
[00:30:16] TEACHER: it would need some fragment of it to run operating system,   {#501}
[00:30:20] TEACHER: some fragment of it to run your application server   {#502}
[00:30:23] TEACHER: and some other jobs.   {#503}
[00:30:24] TEACHER: So you have very limited space to work with,   {#504}
[00:30:27] TEACHER: but you have a gigantic disk,   {#505}
[00:30:30] TEACHER: let's say 20 GB disk attached to this.   {#506}
[00:30:32] TEACHER: Why not leverage that?   {#507}
[00:30:33] TEACHER: Why not leverage the disk that is attached to the API server as a cache?   {#508}
[00:30:38] TEACHER: Because what you are saving effectively from that is this expensive network IO.   {#509}
[00:30:43] TEACHER: Disk is anyway faster than network IO.   {#510}
[00:30:45] TEACHER: So you are saving this network IO by using disk as a cache   {#511}
[00:30:50] TEACHER: because for you local disk read is very fast as compared to the network IO   {#512}
[00:30:55] TEACHER: that you would make to read from a centralized cache.   {#513}
[00:30:57] TEACHER: So when inconsistency is okay, when you don't need strong consistency between them,   {#514}
[00:31:03] TEACHER: are stateless, then you can actually cache some things on the disk of the EPS server.   {#515}
[00:31:10] TEACHER: And this was the exact optimization that while we were having this discussion, that guy from   {#516}
[00:31:16] TEACHER: Goldman Sachs, he got that idea, which did to optimize the system and worked wonders.   {#517}
[00:31:23] TEACHER: This is where critically question every single component of your infrastructure.   {#518}
[00:31:29] TEACHER: And hey, can I leverage this?   {#519}
[00:31:31] TEACHER: Can I leverage this?   {#520}
[00:31:32] TEACHER: Be extremely curious and ask those questions.   {#521}
[00:31:34] TEACHER: If you just take it for granted, if you just think cash is ramp based, cash is centralized,   {#522}
[00:31:38] TEACHER: then you would never come up with this optimization.   {#523}
[00:31:41] TEACHER: So that's why system design in real world is very interesting because it helps.   {#524}
[00:31:47] TEACHER: It makes you think at every possible step and you should anyway, think at every possible   {#525}
[00:31:51] TEACHER: step.   {#526}
[00:31:52] TEACHER: You have things between your years.   {#527}
[00:31:54] TEACHER: Use that always, always, always.   {#528}
[00:31:56] TEACHER: And this is something mind blowing because very few people use it.   {#529}
[00:32:03] TEACHER: They think if I'm storing it on desk, how will I get this performance benefit?   {#530}
[00:32:07] TEACHER: Because memory is fast.   {#531}
[00:32:08] TEACHER: But you are saving that expensive network.   {#532}
[00:32:10] TEACHER: I.O.   {#533}
[00:32:11] TEACHER: Network is pathetically slow as compared to local discrete, local discrete.   {#534}
[00:32:14] TEACHER: You can do in a fraction as compared to the network that you are making.   {#535}
[00:32:18] TEACHER: So that's what I say.   {#536}
[00:32:21] TEACHER: Always see if you are gaining something by caching something.   {#537}
[00:32:26] TEACHER: just limit caches to mavic. Explore it. You can use disk as a cache because whatever is more   {#538}
[00:32:33] TEACHER: expensive than that, if you are saving it, you are helping your system thrive.   {#539}
[00:32:38] TEACHER: Right. So, but again statutory warning because given that you will not have consistency between   {#540}
[00:32:45] TEACHER: this, given that as your constraint that you will not have a centralized view of it. So if the request   {#541}
[00:32:51] TEACHER: goes over here, it has something, it goes over here, it has something else. You should be okay with that.   {#542}
[00:32:56] TEACHER: that's why it said it is very use case specific but you can do it you can cache a lot of stuff   {#543}
[00:33:02] TEACHER: on api servers disk as well and apart from that few honorable mentions before we move forward   {#544}
[00:33:08] TEACHER: is you can cache things on load balancer so load balancers like nginx if you're using aws load   {#545}
[00:33:14] TEACHER: balancer you are using api gateways you are using there you can cache the responses just like you   {#546}
[00:33:19] TEACHER: did with cdn so that your request does not even come to your backend server then forwarding it   {#547}
[00:33:24] TEACHER: to centralized cache, then to database, materialized views and whatnot.   {#548}
[00:33:27] TEACHER: So every single component in your request route   {#549}
[00:33:32] TEACHER: is where you can ask this question that,   {#550}
[00:33:36] TEACHER: hey, can I cache something over here?   {#551}
[00:33:37] TEACHER: Would it make my system better?   {#552}
[00:33:40] TEACHER: So load balancer is one more place where you can cache it.   {#553}
[00:33:43] TEACHER: Load balancer, API gateway all falls into that same category   {#554}
[00:33:46] TEACHER: where you can cache stuff.   {#555}
[00:33:49] TEACHER: So local browser, CDN, load balancer, API server RAM, API server disk, then database materialized use.   {#556}
[00:34:00] TEACHER: And in other case, the way you would want to leverage the database.   {#557}
[00:34:03] TEACHER: And obviously centralized remote cache is there.   {#558}
[00:34:06] TEACHER: So along this entire common layer of infrastructure that we always have, every single place you can pass.   {#559}
[00:34:13] TEACHER: But then you get some, you lose some.   {#560}
[00:34:16] TEACHER: There is always a trade-off.   {#561}
[00:34:18] TEACHER: So in this case, specifically, I'm highlighting this,   {#562}
[00:34:21] TEACHER: the trading of strong consistency between this.   {#563}
[00:34:23] TEACHER: And you should be, if you are okay with that,   {#564}
[00:34:24] TEACHER: if your data is not changing much,   {#565}
[00:34:26] TEACHER: then even having two copies of it does not matter.   {#566}
[00:34:29] TEACHER: Because the data is very infrequently changed in the database.   {#567}
[00:34:32] TEACHER: So it's okay.   {#568}
[00:34:34] TEACHER: And if it's okay for you to sell data for some time, do it.   {#569}
[00:34:37] TEACHER: It's the best thing ever.   {#570}
[00:34:40] TEACHER: So these are points that I wanted to cover,   {#571}
[00:34:42] TEACHER: cash at different levels.   {#572}
[00:34:44] TEACHER: So along the route that we discussed,   {#573}
---- OWNED SEGMENTS END ----

CTX| [00:34:48] TEACHER: question every single step and obviously depending on the architecture that you are working on   {#574}
CTX| [00:34:52] TEACHER: you would have some different components but every single place in your or every single component in   {#575}
CTX| [00:34:58] TEACHER: your architecture will have a will have a way to catch things right so go through that   {#576}
CTX| [00:35:04] TEACHER: so i'll take uh basically sunay lanuba vikram amrit amrik and harsh i'll take like you can add it at   {#577}
CTX| [00:35:12] TEACHER: the end when we'll have open forum more than happy to hear your thoughts on that right now we'll move   {#578}
CTX| [00:35:18] TEACHER: Next part where we'll discuss scaling.   {#579}
CTX| [00:35:22] TEACHER: Now here, as I said yesterday, we'll talk about databases part over here.   {#580}
CTX| [00:35:27] TEACHER: And I'll tell you exactly how things are implemented.   {#581}
CTX| [00:35:30] TEACHER: Not just scaling, scaling, but in general how databases are scaled.   {#582}
CTX| [00:35:34] TEACHER: Okay.   {#583}
CTX| [00:35:35] TEACHER: So scaling in general is having an ability to handle large number of concurrent requests.   {#584}
CTX| [00:35:41] TEACHER: Now this concurrent is the key one.   {#585}
CTX| [00:35:44] TEACHER: Large number of requests I can handle very easily.   {#586}
