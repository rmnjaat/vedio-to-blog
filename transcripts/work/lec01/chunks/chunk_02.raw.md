# chunk_02  OWNS 00:11:16 -> 00:22:41  (segments #187-#361, 1971 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:10:20] STUDENT_3: Then like if the application itself crashes,   {#172}
CTX| [00:10:23] STUDENT_3: if you're distributing this application at some level,   {#173}
CTX| [00:10:28] STUDENT_3: all the different instances will have different caches.   {#174}
CTX| [00:10:30] STUDENT_3: There will be some inconsistency at some point.   {#175}
CTX| [00:10:32] STUDENT_3: So you might want a centralized cache in some sense,   {#176}
CTX| [00:10:36] STUDENT_3: if that makes sense for your application.   {#177}
CTX| [00:10:39] TEACHER: Okay.   {#178}
CTX| [00:10:40] TEACHER: Let's talk about inconsistency.   {#179}
CTX| [00:10:42] TEACHER: Why would there be inconsistency?   {#180}
CTX| [00:10:44] STUDENT_3: So updating the cache, keeping it fresh is a challenge.   {#181}
CTX| [00:10:48] STUDENT_3: For example, the data in the database changes depending on like,   {#182}
CTX| [00:10:53] STUDENT_3: if you have like, if let's say you have instance one and instance two, like you've drawn,   {#183}
CTX| [00:10:58] STUDENT_3: let's say the instance one is getting used for some particular entry more often,   {#184}
CTX| [00:11:03] STUDENT_3: possible that cache entry gets refreshed by the DB depending on the whatever refresh policy you have   {#185}
CTX| [00:11:10] STUDENT_3: and the second instance starts lagging behind or does not get enough updates   {#186}

---- OWNED SEGMENTS START ----
[00:11:16] STUDENT_3: because you access like the first instance more often.   {#187}
[00:11:21] STUDENT_3: So some users might see an consistent view.   {#188}
[00:11:24] STUDENT_5: How will you solve this?   {#189}
[00:11:27] STUDENT_3: One option is to have just a simple centralized cache   {#190}
[00:11:31] STUDENT_3: like maybe have another Redis instance   {#191}
[00:11:36] STUDENT_3: which is being contacted by both the application instances.   {#192}
[00:11:40] STUDENT_3: So that would definitely stay consistent   {#193}
[00:11:44] STUDENT_3: to an extent.   {#194}
[00:11:45] TEACHER: Because it is a single source of truth.   {#195}
[00:11:47] TEACHER: Yeah.   {#196}
[00:11:47] TEACHER: So then you cannot have this.   {#197}
[00:11:49] STUDENT_3: Yeah.   {#198}
[00:11:50] STUDENT_3: So yeah,   {#199}
[00:11:51] STUDENT_3: like I think   {#200}
[00:11:52] STUDENT_3: that's what I have right now.   {#201}
[00:11:54] TEACHER: Okay, fine.   {#202}
[00:11:55] TEACHER: Let me elaborate   {#203}
[00:11:56] TEACHER: on a couple of points over here.   {#204}
[00:11:58] TEACHER: So what Jotinda suggested   {#205}
[00:12:00] TEACHER: is we use the memory.   {#206}
[00:12:02] TEACHER: So we always think of cache   {#207}
[00:12:04] TEACHER: as centralized reverse cache.   {#208}
[00:12:05] TEACHER: So this is the most,   {#209}
[00:12:06] TEACHER: this is something that comes   {#210}
[00:12:07] TEACHER: to us most naturally.   {#211}
[00:12:10] TEACHER: But apart from this,   {#212}
[00:12:11] TEACHER: there are other places   {#213}
[00:12:13] TEACHER: can use as a cache one of them that you just started suggesting is to use the main memory   {#214}
[00:12:17] TEACHER: of the API server.   {#215}
[00:12:18] TEACHER: Now you will not have just one API server.   {#216}
[00:12:21] TEACHER: You would have multiple of them.   {#217}
[00:12:22] TEACHER: And now here, if you're using the main memory of API server, it is local to this particular   {#218}
[00:12:27] TEACHER: server.   {#219}
[00:12:27] TEACHER: This memory is not accessible from anywhere else.   {#220}
[00:12:31] TEACHER: So now when you cache something over here, this is local to this server, which means   {#221}
[00:12:35] TEACHER: that other servers will not see the same changes.   {#222}
[00:12:40] TEACHER: Now here this is where the inconsistency part comes in.   {#223}
[00:12:43] TEACHER: So where you might catch something on this server and if that request goes to another server the   {#224}
[00:12:49] TEACHER: next time here it would not have the returns it would have to make the db call and then populate   {#225}
[00:12:53] TEACHER: this cache and return back. But that's not why we would use this cache. This is an extremely   {#226}
[00:13:02] TEACHER: interesting hack that would give you massive performance boost. Why? Because there you may   {#227}
[00:13:09] TEACHER: consistency always. What you are saving is an expensive network call to the cache by caching   {#228}
[00:13:16] TEACHER: the same data over here. In case you don't need strong consistency that hey my request can go to   {#229}
[00:13:21] TEACHER: any server like for example in case you don't have in case you when a request comes from a user it   {#230}
[00:13:27] TEACHER: can go to any server right. So in case you don't have this in case you have sticky sessions let's   {#231}
[00:13:32] TEACHER: say request of a particular user will always go to a particular server always right in case you   {#232}
[00:13:39] TEACHER: Now what you can do is you can have a centralized remote cache, no problem.   {#233}
[00:13:44] TEACHER: But given that you know the request of a particular user will always go to a particular server   {#234}
[00:13:48] TEACHER: because that's how you are load balancing things, you can cache a bunch of stuff of this user   {#235}
[00:13:53] TEACHER: in the main memory of this server.   {#236}
[00:13:55] TEACHER: Because you would not, the request of that specific user will never go to another server.   {#237}
[00:13:59] TEACHER: That's not possible.   {#238}
[00:14:01] TEACHER: This way you can leverage the memory of the API server itself to cache the response.   {#239}
[00:14:09] TEACHER: that you would want, right?   {#240}
[00:14:11] TEACHER: But here you're giving up on strong consistency between cash   {#241}
[00:14:14] TEACHER: and it should be okay.   {#242}
[00:14:15] TEACHER: It's use case specific.   {#243}
[00:14:16] TEACHER: It just that being creative in getting the performance boost   {#244}
[00:14:19] TEACHER: is really important.   {#245}
[00:14:20] TEACHER: This is really underappreciated, but a lot of startups use it as hack.   {#246}
[00:14:26] TEACHER: Big companies typically don't, but startups use it as hack to get benefits.   {#247}
[00:14:31] TEACHER: For example, and this also works where your data is nearly static.   {#248}
[00:14:36] TEACHER: For example, blogs of LinkedIn or blogs of medium.   {#249}
[00:14:39] TEACHER: Nearly static data, how likely are you to change block?   {#250}
[00:14:43] TEACHER: And in case the data changes, you don't want immediate update.   {#251}
[00:14:48] TEACHER: It's okay if it updates in some time.   {#252}
[00:14:50] TEACHER: It's okay if you serve stale data to some user.   {#253}
[00:14:52] TEACHER: That's perfectly fine because block once published,   {#254}
[00:14:55] TEACHER: very unlikely that it would be changed again.   {#255}
[00:14:58] TEACHER: So given that, even if two different copies of it   {#256}
[00:15:01] TEACHER: get cached on different machines, it's perfect fine   {#257}
[00:15:03] TEACHER: because they're still okay.   {#258}
[00:15:05] TEACHER: like the frequency, the updates are very infrequent on the database for a published item.   {#259}
[00:15:11] TEACHER: So in that case, you can leverage the main memory of the API server itself as a cache.   {#260}
[00:15:17] TEACHER: So apart from having this, and I'm not saying it's either this or this, right?   {#261}
[00:15:20] TEACHER: Always we open, have multi-level caches.   {#262}
[00:15:23] TEACHER: So this, you have it.   {#263}
[00:15:24] TEACHER: Along with that, you have this as a cache.   {#264}
[00:15:27] TEACHER: You can using main memory as a cache.   {#265}
[00:15:29] TEACHER: What it helps you save is a network call to the remote cache in case you have it.   {#266}
[00:15:35] TEACHER: this network I.O. you are reducing the load on this redis server by caching the same information   {#267}
[00:15:39] TEACHER: on local machine not all some information with some expiry although obviously this   {#268}
[00:15:44] TEACHER: ePi server it has very limited RAM so having TTL is very important how you flush the cache is very   {#269}
[00:15:50] TEACHER: important you can run a local redis on this server itself a lot of fancy stuff right but   {#270}
[00:15:57] TEACHER: understand that you can leverage the ePi server that you have to cache something to save an   {#271}
[00:16:02] TEACHER: expensive network call to another remote cache and so that's why okay which what are that Mohan   {#272}
[00:16:09] TEACHER: what other place will you cache what will you cache and how it would benefit   {#273}
[00:16:14] STUDENT_11: sorry i couldn't think of an application level issue but of course we use database views right   {#274}
[00:16:20] STUDENT_11: that is also a form of caching right what it helps you save it helps you save on executing   {#275}
[00:16:30] STUDENT_11: the query if one is that when the data is not changing much that is one case the other case   {#276}
[00:16:36] STUDENT_11: is also because a sequel execution requires preparation and you know execution path creation   {#277}
[00:16:45] STUDENT_11: by the server right so you can avoid all that if the if you create a view i think then the database   {#278}
[00:16:53] STUDENT_11: server is, you know, have the prepared query and whenever there's an update, it is, it   {#279}
[00:17:02] STUDENT_11: is updated.   {#280}
[00:17:03] STUDENT_11: I don't know the exact way the database keeps it up to date, but you know, views are kept   {#281}
[00:17:09] STUDENT_11: up to date for all updates, right?   {#282}
[00:17:10] STUDENT_11: So it is consistent and you can avoid the having to load the server with the query every   {#283}
[00:17:18] STUDENT_11: time.   {#284}
[00:17:19] TEACHER: Great.   {#285}
[00:17:20] TEACHER: Thanks for adding that.   {#286}
[00:17:21] TEACHER: Let me, let me elaborate on this part.   {#287}
[00:17:23] TEACHER: Oh, what Mohan added is something called as a materialized use on databases.   {#288}
[00:17:29] TEACHER: This is typically a property of relational databases, but there are some non   {#289}
[00:17:33] TEACHER: traditional databases that also leverages this to be performant.   {#290}
[00:17:36] TEACHER: So with relational databases, one of the biggest concern comes out to be joins.   {#291}
[00:17:41] TEACHER: So now let's say you're joining six different tables, almost for 80% of   {#292}
[00:17:45] TEACHER: queries or 80% of load comes from those joining of six different tables.   {#293}
[00:17:49] TEACHER: And now if that data is not changing very frequently, what if you   {#294}
[00:17:53] TEACHER: the tables and store it as a separate table.   {#295}
[00:17:56] TEACHER: That's what this materialized views are.   {#296}
[00:17:58] TEACHER: So you can create a view of a table with the necessary computation that you are doing and   {#297}
[00:18:04] TEACHER: not just join, but let's say you want to add another column, a computed column, a derived column,   {#298}
[00:18:10] TEACHER: all of that.   {#299}
[00:18:11] TEACHER: For example, I have marks for each subject in a separate column and I want to have a total   {#300}
[00:18:19] TEACHER: another column.   {#301}
[00:18:20] TEACHER: Right.   {#302}
[00:18:20] TEACHER: So now this total is a derived column.   {#303}
[00:18:23] TEACHER: you store the raw data in the table where you have individual marks for each subjects.   {#304}
[00:18:28] TEACHER: Can you create a new table with total as a new column and this and join with other details of   {#305}
[00:18:34] TEACHER: people and whatnot. Now you create, you use this view and so whatever query you fire,   {#306}
[00:18:40] TEACHER: you fire on this view rather than this table. This view is already pre-joined, pre-computed   {#307}
[00:18:45] TEACHER: and it makes your things very fast. And because it doesn't have to do join again and again because   {#308}
[00:18:50] TEACHER: the data is already pre-joined and kept over here.   {#309}
[00:18:52] TEACHER: The challenges that come with this is you need to update explicitly,   {#310}
[00:18:56] TEACHER: which is where database triggers come to the rescue.   {#311}
[00:18:59] TEACHER: So you define triggers that would refresh,   {#312}
[00:19:02] TEACHER: and that's what the official term is,   {#313}
[00:19:04] TEACHER: that would refresh this materialized views.   {#314}
[00:19:07] TEACHER: But this would give you significant performance gain on the database,   {#315}
[00:19:11] TEACHER: given that you don't have to do joins again.   {#316}
[00:19:14] TEACHER: But this works where your data changes infrequently.   {#317}
[00:19:20] TEACHER: then a frequent refresh of this materialized views happens and that would slow things down.   {#318}
[00:19:24] TEACHER: So in case you have never heard of materialized views, you are just a Google search away,   {#319}
[00:19:28] TEACHER: but this is the gist topic. And revisit the recording in case you don't understand it,   {#320}
[00:19:34] TEACHER: what materialized views are, how it is leveraged. So materialized views is one of the most   {#321}
[00:19:40] TEACHER: interesting optimizations that come from the database, which not a lot of   {#322}
[00:19:44] TEACHER: tack quote unquote, I don't classify people as backend and data engineers, but backend engineers,   {#323}
[00:19:50] TEACHER: APIs they don't understand this particular optimization data engineers use it day in and   {#324}
[00:19:55] TEACHER: day out materialized views are data engineers bread and butter so they have to use it to make   {#325}
[00:19:59] TEACHER: their analytical queries hyper optimized so db views materialized views if you've never heard it   {#326}
[00:20:05] TEACHER: go read about it most importantly implement right without implementation everything is theoretical   {#327}
[00:20:12] TEACHER: right okay thanks for adding that mohan db views is one and how it is reducing so what it is saving   {#328}
[00:20:17] TEACHER: is it is saving that expensive database computation,   {#329}
[00:20:21] TEACHER: that expensive join.   {#330}
[00:20:22] TEACHER: That's what it is.   {#331}
[00:20:24] TEACHER: Rahul, what would you cache?   {#332}
[00:20:27] TEACHER: Where would you cache?   {#333}
[00:20:28] STUDENT_4: So basically, like two examples I have   {#334}
[00:20:33] STUDENT_4: is basically our web browsers.   {#335}
[00:20:35] STUDENT_4: Basically, they save our network I.O.   {#336}
[00:20:37] STUDENT_4: while by caching things,   {#337}
[00:20:39] STUDENT_4: caching things in the local storage itself.   {#338}
[00:20:44] STUDENT_4: And second thing is CDN servers,   {#339}
[00:20:46] STUDENT_4: like Netflix.   {#340}
[00:20:47] TEACHER: one one one one one one i want to give everyone else chance right okay browser an interesting place   {#341}
[00:20:53] TEACHER: where you can literally cache things over here this way you don't even have to make calls to your   {#342}
[00:21:01] TEACHER: backend server to get some information for example static images static assets or even some api   {#343}
[00:21:06] TEACHER: responses for the jwt token you may want to save it so those so you save bunch of computation plus   {#344}
[00:21:12] TEACHER: there are web workers now that does everything offline and then when internet comes back up they   {#345}
[00:21:19] TEACHER: sync back up to the back end all of those things so it gives you very nice experience so you think   {#346}
[00:21:24] TEACHER: it's working really fast but every change is being done locally and then periodically pushed   {#347}
[00:21:30] TEACHER: to the back end so browsers local storage is an excellent place to cache bunch of stuff   {#348}
[00:21:36] STUDENT_4: also there is like one more point i would like to make on the first suggestion first point so   {#349}
[00:21:44] STUDENT_4: basically you the problem that we were having is like inconsistency when caching okay in the first   {#350}
[00:21:50] STUDENT_4: in the first point so let's just say uh like we have a cache uh which also has a feature of   {#351}
[00:21:56] STUDENT_4: like publish and subscribe okay uh all of the all of the nodes api servers that are here   {#352}
[00:22:05] STUDENT_4: are publishers and themselves are subscribers. Okay. Whenever any update comes, we update   {#353}
[00:22:12] STUDENT_4: the entry in the cache and the cache itself. I'd have to stop it. I'd have to stop you.   {#354}
[00:22:18] TEACHER: People will get confused. They might not have heard of this. Let me come back to this. Next   {#355}
[00:22:22] TEACHER: week we'll be touching upon this. Then it would make sense. It's just that I'm being   {#356}
[00:22:26] TEACHER: wary of the different kinds of experiences that people have. So everyone is on the same.   {#357}
[00:22:32] TEACHER: I just don't want people to get lost in this terms.   {#358}
[00:22:37] TEACHER: That's right.   {#359}
[00:22:38] TEACHER: That's right.   {#360}
[00:22:39] TEACHER: Shiva.   {#361}
---- OWNED SEGMENTS END ----

CTX| [00:22:41] STUDENT_2: Yeah.   {#362}
CTX| [00:22:42] STUDENT_2: So my example is also like very similar to the third one, which is the browser caching,   {#363}
CTX| [00:22:47] STUDENT_2: but I can go like give like a very specific example of how we use it.   {#364}
CTX| [00:22:51] STUDENT_2: So we used it for personalized recommendations.   {#365}
CTX| [00:22:54] STUDENT_2: and the use case for us was mostly not in terms of latency,   {#366}
CTX| [00:23:00] STUDENT_2: but more for how the users perceive if we personalize too often.   {#367}
CTX| [00:23:05] STUDENT_2: So the use case is we try to re-rank the products on the category pages   {#368}
CTX| [00:23:10] STUDENT_2: and the extreme could be we...   {#369}
CTX| [00:23:13] STUDENT_2: So if a user revisits a category page,   {#370}
CTX| [00:23:16] STUDENT_2: we can again do the re-ranking, right?   {#371}
CTX| [00:23:18] STUDENT_2: And that would be like an extreme case.   {#372}
CTX| [00:23:20] STUDENT_2: and then the other extreme is we don't update it for the full day or something.   {#373}
CTX| [00:23:26] STUDENT_2: So we did some experiments and found like optimal time   {#374}
CTX| [00:23:29] STUDENT_2: of for how much time we have to store these recommendations   {#375}
CTX| [00:23:33] STUDENT_2: so that the users don't get too confused,   {#376}
CTX| [00:23:36] STUDENT_2: but we also deliver the benefits of personalization.   {#377}
CTX| [00:23:39] STUDENT_2: So this was like one implication for us.   {#378}
