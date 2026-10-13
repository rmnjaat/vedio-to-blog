# chunk_02  OWNS 00:12:55 -> 00:25:34  (segments #222-#435, 2232 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:11:58] TEACHER: Your application server does not have an event for it.   {#202}
CTX| [00:12:01] TEACHER: Still that updates will be captured and will be pushed onto this other database.   {#203}
CTX| [00:12:06] TEACHER: It's okay if your application server while pushing the event crashed.   {#204}
CTX| [00:12:09] TEACHER: So you will not lose the data because you are relying on the source of.   {#205}
CTX| [00:12:14] TEACHER: This is the highlight of change data capture.   {#206}
CTX| [00:12:16] TEACHER: So typically it's not a hard rule.   {#207}
CTX| [00:12:18] TEACHER: You may find some plugins that works other way,   {#208}
CTX| [00:12:20] TEACHER: but it's a very common concept that change data capture,   {#209}
CTX| [00:12:25] TEACHER: works on databases.   {#210}
CTX| [00:12:28] TEACHER: It keeps track.   {#211}
CTX| [00:12:29] TEACHER: Internally, it keeps track up until these rows.   {#212}
CTX| [00:12:31] TEACHER: I've read this database or this column was updated.   {#213}
CTX| [00:12:34] TEACHER: So I'll update it over here.   {#214}
CTX| [00:12:36] TEACHER: It reads tables row by row.   {#215}
CTX| [00:12:38] TEACHER: One way to do it.   {#216}
CTX| [00:12:40] TEACHER: It reads table by the commit log or the bin log,   {#217}
CTX| [00:12:43] TEACHER: which is the vol file that we have.   {#218}
CTX| [00:12:45] TEACHER: Anytime you commit something, it gets added to the vol file.   {#219}
CTX| [00:12:49] TEACHER: ChangeJataCapture literally reads that vol file   {#220}
CTX| [00:12:51] TEACHER: and pushes the changes to this other database.   {#221}

---- OWNED SEGMENTS START ----
[00:12:55] TEACHER: what kind of bindings a particular database offers.   {#222}
[00:12:59] TEACHER: For example, MongoDB might choose not to expose the commit log file.   {#223}
[00:13:04] TEACHER: So then chain data capture will rely on iterating collections.   {#224}
[00:13:08] TEACHER: Elasticsearch doesn't offer so it relies on iterating collections.   {#225}
[00:13:11] TEACHER: MySQL has bin log support.   {#226}
[00:13:12] TEACHER: It exposes wall file.   {#227}
[00:13:14] TEACHER: Chain data capture directly reads that wall file.   {#228}
[00:13:16] TEACHER: So for you, it does not matter how the data is read from the database.   {#229}
[00:13:21] TEACHER: What you know is on this tool, I configure this database as my source and this other   {#230}
[00:13:28] TEACHER: data is a sink.   {#231}
[00:13:29] TEACHER: I define a transformation and it just data flows like that.   {#232}
[00:13:32] TEACHER: Now, in case this DB is down, then the data will not be captured.   {#233}
[00:13:36] TEACHER: But once this DB is back up, it will resume from that point.   {#234}
[00:13:39] TEACHER: That's the job of these tools.   {#235}
[00:13:42] TEACHER: So instead of relying on API server to push something, you are literally relying on the   {#236}
[00:13:48] TEACHER: directly on the direct source of truth that you have.   {#237}
[00:13:51] TEACHER: This what makes change data capture invaluable.   {#238}
[00:13:56] TEACHER: Everyone uses it.   {#239}
[00:13:58] TEACHER: Everyone.   {#240}
[00:13:59] TEACHER: Okay.   {#241}
[00:14:00] TEACHER: Now here in the diagram that I drew, I just drew this as boxes.   {#242}
[00:14:05] TEACHER: It goes from one DB pushes it into another, but it's not that your   {#243}
[00:14:10] TEACHER: sync should always be a database.   {#244}
[00:14:12] TEACHER: You can have a Kafka as a sync.   {#245}
[00:14:14] TEACHER: So whatever plugin this AirBite or DBZM supports, take that.   {#246}
[00:14:18] TEACHER: From a source, this is SYNC.   {#247}
[00:14:20] TEACHER: SYNC can be Kafka, SQS, Kinesis, local disk,   {#248}
[00:14:23] TEACHER: certain number of databases and whatnot.   {#249}
[00:14:25] TEACHER: You can configure literally anything there.   {#250}
[00:14:28] TEACHER: So these are two really good projects.   {#251}
[00:14:30] TEACHER: AirBite and DPZM.   {#252}
[00:14:31] TEACHER: Check that out.   {#253}
[00:14:32] TEACHER: Run it locally, both open source.   {#254}
[00:14:35] TEACHER: Run it locally and just play around with it.   {#255}
[00:14:37] TEACHER: See how it works.   {#256}
[00:14:38] TEACHER: See what change data capture does.   {#257}
[00:14:40] TEACHER: See how you have to configure it.   {#258}
[00:14:41] TEACHER: See what kind of format you get data in.   {#259}
[00:14:43] TEACHER: See how you transform the data and you push it some.   {#260}
[00:14:45] TEACHER: So CDC is a great way to have to build replication across databases with some basic transformation   {#261}
[00:14:53] TEACHER: in between.   {#262}
[00:14:53] TEACHER: For bigger things, there is Spark and all which we will cover when we talk about data engineering   {#263}
[00:14:57] TEACHER: basics mostly next week.   {#264}
[00:15:00] TEACHER: I forgot either tomorrow or next week.   {#265}
[00:15:02] TEACHER: Mostly next week by then.   {#266}
[00:15:04] TEACHER: But this is the concept of chain data capture that instead of relying on API servers to   {#267}
[00:15:08] TEACHER: do this, you'd rely directly on the source of truth to capture the data and push it somewhere.   {#268}
[00:15:15] TEACHER: change data capture right okay now where can you use it you can see a lot of systems that we build   {#269}
[00:15:23] TEACHER: where we were using kafka to do something like apso pushing to kafka reading from that and   {#270}
[00:15:29] TEACHER: doing something a lot of things can be changed through cdc right it does not mean one is better   {#271}
[00:15:36] TEACHER: than the other start with any whatever works for you works for you in some cases you can rely on   {#272}
[00:15:42] TEACHER: database events but in some cases you need application context.   {#273}
[00:15:46] TEACHER: So in that case you would have to do it with API server pushing it to Kafka.   {#274}
[00:15:50] TEACHER: In some cases when it's just raw data that you are playing with that's typically this   {#275}
[00:15:55] TEACHER: is what the bifurcation is.   {#276}
[00:15:56] TEACHER: Whenever you are playing with the raw data you typically refer you typically go for CDC.   {#277}
[00:16:02] TEACHER: If you want to do it on the contextual side that hey when this particular event happens   {#278}
[00:16:07] TEACHER: as my API on my API server I'll ingest it into Kafka or something right.   {#279}
[00:16:12] TEACHER: different but in general just to give you a very high level overview of where how this fits into   {#280}
[00:16:19] TEACHER: the grind scheme of things for example let's say you have a transactional db and you have your   {#281}
[00:16:25] TEACHER: search service now you want your data from the transactional db to move to your search service   {#282}
[00:16:29] TEACHER: search is written in elastic search transaction is in my sequel now how do you populate the data   {#283}
[00:16:34] TEACHER: from here to here you may choose go with that kafka way right that we always do api server   {#284}
[00:16:39] TEACHER: sending an event, consuming it and ingesting it to Elasticsearch server.   {#285}
[00:16:43] TEACHER: Other way to do it is with CDC. You may have to write your own transformation logic.   {#286}
[00:16:48] TEACHER: When you explore the tools, you will understand better, but you can also use CDC to build this   {#287}
[00:16:52] TEACHER: exact same thing, which reads from MySQL and puts it into Elasticsearch with an optional transformation.   {#288}
[00:16:58] TEACHER: So this way the sync between the two database is maintained by the CDC.   {#289}
[00:17:04] TEACHER: Similarly, now let's say from MySQL, you want to move data to a data warehouse.   {#290}
[00:17:09] TEACHER: Let's say redshift.   {#291}
[00:17:11] TEACHER: So what you can do is you can have CDC, this relational database,   {#292}
[00:17:14] TEACHER: this relational database, you just copy the data over here   {#293}
[00:17:16] TEACHER: and CDC takes care of it.   {#294}
[00:17:17] TEACHER: You don't have to worry about it.   {#295}
[00:17:19] TEACHER: Now imagine if you are not relying on database   {#296}
[00:17:22] TEACHER: to read the data for data warehouse and you relied on API servers.   {#297}
[00:17:26] TEACHER: Now what would have happened?   {#298}
[00:17:27] TEACHER: Let's say a new table is added or a new use case is added   {#299}
[00:17:30] TEACHER: for everything you had to remember.   {#300}
[00:17:32] TEACHER: Oh my God, have I added event to Kafka or not?   {#301}
[00:17:35] TEACHER: Did I do this? Did I do that?   {#302}
[00:17:36] TEACHER: That's very inefficient, right?   {#303}
[00:17:39] TEACHER: operating on raw data, it can do bulk fetch, bulk ingest in   {#304}
[00:17:44] TEACHER: threadshift and what not.   {#305}
[00:17:46] TEACHER: Those are the optimizations that CDCs can do for you.   {#306}
[00:17:49] TEACHER: It can read bulk rows from here and push bulk rows over here.   {#307}
[00:17:53] TEACHER: If it was with application context, like every block published,   {#308}
[00:17:56] TEACHER: one event, slowly consuming it and putting it out.   {#309}
[00:18:00] TEACHER: Very slow.   {#310}
[00:18:01] TEACHER: We are just taking the raw data and putting it somewhere just to   {#311}
[00:18:05] TEACHER: maintain that same CDCs are the way to.   {#312}
[00:18:10] TEACHER: interesting design where CDC is coming to pitch.   {#313}
[00:18:12] TEACHER: It's let's say you want to take data from a restaurant and put it into S3.   {#314}
[00:18:15] TEACHER: It's not an S3 is not a database, but you still want to take data from a   {#315}
[00:18:19] TEACHER: transactional, from a data warehouse and put it into S3.   {#316}
[00:18:22] TEACHER: This can also be done by CDC.   {#317}
[00:18:23] TEACHER: Obviously, Redshift gives you those plugins to automatically do that, but I'm   {#318}
[00:18:26] TEACHER: explicitly putting it over here so that you understand that S3, like it has   {#319}
[00:18:32] TEACHER: plugins, which can put data into S3 in a particular form, which is where you'd   {#320}
[00:18:37] TEACHER: You see CDC is coming in very handy at a lot of places, a lot of places.   {#321}
[00:18:42] TEACHER: Right.   {#322}
[00:18:43] TEACHER: Okay.   {#323}
[00:18:43] TEACHER: And this is what I just wanted to form dots in your head.   {#324}
[00:18:48] TEACHER: Explore Airbyte a bit.   {#325}
[00:18:49] TEACHER: Explore DBZM a bit.   {#326}
[00:18:50] TEACHER: See how they are configured.   {#327}
[00:18:52] TEACHER: What plugins they support.   {#328}
[00:18:53] TEACHER: YouTube.   {#329}
[00:18:54] TEACHER: Go to YouTube.   {#330}
[00:18:55] TEACHER: Search for Airbyte example.   {#331}
[00:18:56] TEACHER: Search for DBZM example.   {#332}
[00:18:58] TEACHER: You'll see bunch of videos explaining how they are configured, what they do.   {#333}
[00:19:01] TEACHER: Understand those use cases.   {#334}
[00:19:02] TEACHER: Right.   {#335}
[00:19:03] TEACHER: This is just an introduction.   {#336}
[00:19:05] TEACHER: Just an introduction.   {#337}
[00:19:07] TEACHER: We will use this very heavily when we design next systems tomorrow and the next week,   {#338}
[00:19:13] TEACHER: where we see how data engineering architectures are set up,   {#339}
[00:19:16] TEACHER: how multi-tiered storages are used.   {#340}
[00:19:18] TEACHER: We'll build on multi-tiered storage as well.   {#341}
[00:19:20] TEACHER: You'll see where CDCs come into picture.   {#342}
[00:19:22] TEACHER: But this is just a very gentle introduction so that it brings everyone onto the same page   {#343}
[00:19:26] TEACHER: that you explore the stream because this matters a ton.   {#344}
[00:19:29] TEACHER: At lot of places where I happen to be consulting for a couple of organization,   {#345}
[00:19:37] TEACHER: made this mistake they made this very mistake they wanted data sync they were doing it with   {#346}
[00:19:41] TEACHER: kafka they said our infrastructure cost is high i just went there suggested them switch to cdc   {#347}
[00:19:46] TEACHER: it brought down their particular infra cost by that particular infra cost by 80 percent   {#348}
[00:19:50] TEACHER: and with much more reliability right these are the things that matter so these are just   {#349}
[00:19:56] TEACHER: initial dots that i want all of you to form and explore the tools on the site right okay any   {#350}
[00:20:03] TEACHER: questions on this we'll take questions till 9 26 and then yeah rahul go on so basically what i   {#351}
[00:20:10] STUDENT_8: wanted to ask is uh basically uh are the same are the cdc's uh reading uh wall wall files or like   {#352}
[00:20:18] STUDENT_8: wall directory via postgres client or like it has instance level uh access to it does it with   {#353}
[00:20:27] TEACHER: postgres client. It does it with postgres client.   {#354}
[00:20:31] TEACHER: In some   {#355}
[00:20:31] TEACHER: cases, there is a   {#356}
[00:20:33] TEACHER: chance of extracting those wall files   {#357}
[00:20:35] TEACHER: and putting it and then processing it.   {#358}
[00:20:37] TEACHER: There are plugins that do that as well.   {#359}
[00:20:39] TEACHER: But the most basic configuration that you will find   {#360}
[00:20:41] TEACHER: is via postgres client.   {#361}
[00:20:43] TEACHER: And it depends on the plugin   {#362}
[00:20:45] TEACHER: that you're using. That's why I'm saying it's just a tool   {#363}
[00:20:47] TEACHER: which just keeps track that this is what I'm   {#364}
[00:20:49] TEACHER: reading, this is where I'm writing, this is what   {#365}
[00:20:51] TEACHER: my checkpoint is. So there is no hardened   {#366}
[00:20:53] TEACHER: bound rule. But to   {#367}
[00:20:55] TEACHER: answer your question in a very general way,   {#368}
[00:20:57] TEACHER: A naive way to do it is with, not really naive, but a decent way to do it is with using the   {#369}
[00:21:03] TEACHER: database client that they use.   {#370}
[00:21:06] TEACHER: But you will find plugins that does it the other way.   {#371}
[00:21:12] STUDENT_8: What do you think is the most efficient in those two methods?   {#372}
[00:21:18] TEACHER: Doing it with client is better because if tomorrow they change the format of bin log   {#373}
[00:21:24] TEACHER: or commit log, your plugin doesn't need to be updated.   {#374}
[00:21:28] TEACHER: So that Postgres client will seamlessly handle it,   {#375}
[00:21:31] TEACHER: decoding the file and whatnot.   {#376}
[00:21:33] TEACHER: And it does not put a lot of load.   {#377}
[00:21:35] TEACHER: If you're thinking of load, it does not put a lot of load   {#378}
[00:21:37] TEACHER: because it's just a sequential lead.   {#379}
[00:21:38] TEACHER: And you can also configure it on a replica.   {#380}
[00:21:41] TEACHER: You don't have to configure it on master.   {#381}
[00:21:42] TEACHER: So just pin up a new replica.   {#382}
[00:21:44] TEACHER: From that replica, configure a CDC.   {#383}
[00:21:47] TEACHER: So that just chops down your load or your master database.   {#384}
[00:21:51] TEACHER: So doing it with Postgres client is much, much better.   {#385}
[00:21:59] STUDENT_2: Can you please elaborate a little bit about the use case you were telling us about like   {#386}
[00:22:05] STUDENT_2: you brought down the infrastructure cost of certain organization by 80%?   {#387}
[00:22:10] TEACHER: No, only for this component.   {#388}
[00:22:15] TEACHER: So not entire cost, not entire infra cost, this infra cost of this subsystem that they   {#389}
[00:22:20] TEACHER: right so what they did they used to push from api servers they used to push it to kafka every   {#390}
[00:22:29] TEACHER: single thing from kafka they used to write consumers they used to put data into other   {#391}
[00:22:34] TEACHER: database right now what used to happen was every single update required them one event in kafka   {#392}
[00:22:41] TEACHER: consumed by a bunch of workers they were writing they were transforming it in the consumers and   {#393}
[00:22:46] TEACHER: putting it into that other database now because the transformation logic was very simple but they   {#394}
[00:22:52] TEACHER: were still doing one read at a time because api server was pushing it to kafka and one write onto   {#395}
[00:22:59] TEACHER: this db right now what happened because of this that even they could batch it they were not able   {#396}
[00:23:06] TEACHER: to batch it because that's how they thought systems are built so they read one one event in kafka   {#397}
[00:23:12] TEACHER: one event goes to consumer one right happened to deal with some basic transformation so they did   {#398}
[00:23:17] TEACHER: not leverage batching at all so they required large number of machines to just deal with the   {#399}
[00:23:22] TEACHER: coming in just the the incoming traffic that they were having so their number of consumers   {#400}
[00:23:28] TEACHER: were more than 60 consumers like 60 32 gigs machine huge number huge number right they had   {#401}
[00:23:36] TEACHER: they didn't have to worry about that at all they could have literally just so then what i suggested   {#402}
[00:23:42] TEACHER: because your transformation was simple.   {#403}
[00:23:46] TEACHER: Read as CDC, configure a simple CDC over there in your AirBite.   {#404}
[00:23:51] TEACHER: So I recommended them to use AirBite.   {#405}
[00:23:53] TEACHER: Write a simple transformation logic and directly ingest it into other database   {#406}
[00:23:56] TEACHER: because both the database had plugins with AirBite.   {#407}
[00:23:59] TEACHER: And this way, their entire workload was just done in two machines.   {#408}
[00:24:04] TEACHER: from 60 machines   {#409}
[00:24:06] TEACHER: and a Kafka,   {#410}
[00:24:08] TEACHER: it got brought down to just   {#411}
[00:24:10] TEACHER: two simple EC2 instances.   {#412}
[00:24:13] TEACHER: That's it.   {#413}
[00:24:15] STUDENT_2: So they,   {#414}
[00:24:17] STUDENT_2: from the solution,   {#415}
[00:24:18] STUDENT_2: they had like   {#416}
[00:24:20] STUDENT_2: reduced this cost, but   {#417}
[00:24:22] STUDENT_2: did they lose something in terms of performance?   {#418}
[00:24:24] TEACHER: They gained performance.   {#419}
[00:24:26] TEACHER: Because now the replication lag   {#420}
[00:24:28] TEACHER: is bare minimum.   {#421}
[00:24:30] TEACHER: Because it's very fast.   {#422}
[00:24:33] TEACHER: These tools written in Java, they are multi-threaded, they fetch in parallel, updates, they are heavily optimized to do these minor transformations.   {#423}
[00:24:43] TEACHER: Reading is very fast, checkpointing is fast and pushy get is fast.   {#424}
[00:24:46] TEACHER: So they did not even realize that they were losing out on data.   {#425}
[00:24:50] TEACHER: They had no clue. Their databases were out of sync and they had no idea.   {#426}
[00:24:55] TEACHER: But after I pointed, they said, we'll write a cron job to put them in sync.   {#427}
[00:24:59] TEACHER: They said, it's okay if we lose data.   {#428}
[00:25:02] TEACHER: they stop losing data as well because CDC keeps track of which rows or which documents or which   {#429}
[00:25:08] TEACHER: entities are captured and put there right so it does that checkpointing for you in a sequential   {#430}
[00:25:13] TEACHER: way that's how you gained a ton of benefits out of it no loss rather than the performance better   {#431}
[00:25:21] STUDENT_2: because of this uh foot patching would have solved like if they have batched a certain   {#432}
[00:25:27] STUDENT_2: number of events together and   {#433}
[00:25:30] STUDENT_2: do the   {#434}
[00:25:32] STUDENT_2: processing.   {#435}
---- OWNED SEGMENTS END ----

CTX| [00:25:34] TEACHER: It would not have been   {#436}
CTX| [00:25:36] TEACHER: as worse as it was.   {#437}
CTX| [00:25:38] TEACHER: They were doing one at a time because that's   {#438}
CTX| [00:25:40] TEACHER: the most basic thing that they could write.   {#439}
CTX| [00:25:42] TEACHER: So they just went out with that.   {#440}
CTX| [00:25:44] TEACHER: And it was a legacy architecture. When they started, they went   {#441}
CTX| [00:25:46] TEACHER: with this, the company scaled   {#442}
CTX| [00:25:48] TEACHER: but they did not change it.   {#443}
CTX| [00:25:50] TEACHER: So they were just living with that.   {#444}
CTX| [00:25:54] TEACHER: And you know, there is always a service   {#445}
CTX| [00:25:57] TEACHER: No one touches that ever.   {#446}
CTX| [00:25:59] TEACHER: This was one of them.   {#447}
CTX| [00:26:01] STUDENT_2: Got it.   {#448}
CTX| [00:26:03] STUDENT_2: So one other thing,   {#449}
CTX| [00:26:05] STUDENT_2: what if the CDC was implemented from a read replica?   {#450}
CTX| [00:26:11] STUDENT_2: It's fine.   {#451}
CTX| [00:26:12] STUDENT_9: Works just fine.   {#452}
CTX| [00:26:14] STUDENT_2: Okay.   {#453}
CTX| [00:26:15] STUDENT_2: And if it was a no-sql type of database   {#454}
CTX| [00:26:18] STUDENT_2: where eventual consistency happens.   {#455}
CTX| [00:26:21] STUDENT_2: So can you please tell me one particular use case   {#456}
CTX| [00:26:27] STUDENT_2: where this would be a bad example, bad implementation.   {#457}
CTX| [00:26:31] TEACHER: Not at all.   {#458}
CTX| [00:26:32] TEACHER: If you are okay with eventual consistency, even CDCs are eventually consistent.   {#459}
