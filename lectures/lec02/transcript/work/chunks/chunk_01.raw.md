# chunk_01  OWNS 00:00:02 -> 00:13:26  (segments #0-#229, 2235 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:02] TEACHER: Great week, second day, second. It's all about non-relational databases.   {#0}
[00:00:09] TEACHER: So first half, I'll give a brief overview of non-relational databases and not just that, okay, this is where you have to use it.   {#1}
[00:00:17] TEACHER: But more importantly, where you should not use that database because you'll find a ton of things out there.   {#2}
[00:00:22] TEACHER: It says, hey, you should always use NoSQL databases because there are so many folks out there.   {#3}
[00:00:28] TEACHER: basically telling about how great their known relational databases are because they think they   {#4}
[00:00:33] TEACHER: are challenging the relational database that's not true right so you'll find a ton of databases   {#5}
[00:00:38] TEACHER: out there meant to solve very specific problems uh that's the first part we'll cover a bunch of   {#6}
[00:00:45] TEACHER: them it's we are just scratching the surface today with respect to non-relational databases   {#7}
[00:00:49] TEACHER: because they lay the foundation for us to build other stuff where we go deeper into each one of   {#8}
[00:00:57] TEACHER: week, fifth week, sixth week, right?   {#9}
[00:00:59] TEACHER: So, but even while we go through them,   {#10}
[00:01:01] TEACHER: I'll talk about those granular nitty gritties   {#11}
[00:01:03] TEACHER: that matters the most.   {#12}
[00:01:05] TEACHER: So that's the first half.   {#13}
[00:01:08] TEACHER: Roughly one hour, five minutes, one hour, ten minutes.   {#14}
[00:01:10] TEACHER: And then a huge discussion on Slack's real-time communication.   {#15}
[00:01:14] TEACHER: And we'll only do text-based communication.   {#16}
[00:01:17] TEACHER: Now, when we do this, when we try to design the system,   {#17}
[00:01:20] TEACHER: Slack's real-time communication,   {#18}
[00:01:22] TEACHER: the best part of this would be that you'd see   {#19}
[00:01:28] TEACHER: easily you can switch from one message delivery model to another.   {#20}
[00:01:33] TEACHER: So in this same design,   {#21}
[00:01:34] TEACHER: you would see how we can design something like a WhatsApp,   {#22}
[00:01:38] TEACHER: something like Slack, something like Zoom chat.   {#23}
[00:01:43] TEACHER: Straight forward.   {#24}
[00:01:44] TEACHER: Like it would be so obvious, right?   {#25}
[00:01:47] TEACHER: And which is where now you will start to see   {#26}
[00:01:48] TEACHER: how I always say that system design is just about   {#27}
[00:01:52] TEACHER: looking at those patterns, looking at those Lego blocks.   {#28}
[00:01:57] TEACHER: you have your system up and running.   {#29}
[00:01:59] TEACHER: And that's how it is.   {#30}
[00:02:02] TEACHER: The entire domain of computer science   {#31}
[00:02:04] TEACHER: is very similar to how we as humans operate.   {#32}
[00:02:07] TEACHER: And we work on patterns.   {#33}
[00:02:09] TEACHER: Computer science is very much similar   {#34}
[00:02:11] TEACHER: to how humans have operated.   {#35}
[00:02:13] TEACHER: Looking at patterns, control-z, control-v,   {#36}
[00:02:15] TEACHER: learning from them, iterating.   {#37}
[00:02:17] TEACHER: And if you see the one human's architecture   {#38}
[00:02:19] TEACHER: of the first CPU set,   {#39}
[00:02:23] TEACHER: it's exactly how our brain functions.   {#40}
[00:02:27] TEACHER: quite a few similarities across.   {#41}
[00:02:29] TEACHER: So which is what we'll do deep dive.   {#42}
[00:02:31] TEACHER: So first half, non-relational databases,   {#43}
[00:02:33] TEACHER: a scratch on the surface.   {#44}
[00:02:34] TEACHER: Second half, a really detailed discussion   {#45}
[00:02:37] TEACHER: on Slack's real-time communication,   {#46}
[00:02:38] TEACHER: which piggybacks WhatsApp, Instagram,   {#47}
[00:02:40] TEACHER: pick your favorite, right?   {#48}
[00:02:41] TEACHER: It becomes a piece of cake automatically.   {#49}
[00:02:44] TEACHER: Okay, so let's start with that.   {#50}
[00:02:47] TEACHER: Non-relational databases,   {#51}
[00:02:48] TEACHER: actually, to be honest,   {#52}
[00:02:50] TEACHER: there should not be any term   {#53}
[00:02:52] TEACHER: as non-relational databases   {#54}
[00:02:54] TEACHER: or either no-SQL databases   {#55}
[00:02:57] TEACHER: saying technical and non-technical.   {#56}
[00:02:58] TEACHER: It's very offensive to non-technical folks, unfortunately.   {#57}
[00:03:02] TEACHER: So which is where instead of saying non-relational databases,   {#58}
[00:03:06] TEACHER: we should always refer to the specific type of database   {#59}
[00:03:10] TEACHER: that we are talking about and not just blanket it out   {#60}
[00:03:13] TEACHER: for every single thing that is non-mysql, postgres, oracle.   {#61}
[00:03:18] TEACHER: So it's always better to be specific because, and especially   {#62}
[00:03:22] TEACHER: when you say sentences like, or when we say sentences like   {#63}
[00:03:27] TEACHER: No SQL databases scale.   {#64}
[00:03:28] TEACHER: I can build a non-relational database   {#65}
[00:03:30] TEACHER: which does not scale at all.   {#66}
[00:03:32] TEACHER: Very much possible.   {#67}
[00:03:34] TEACHER: So instead of putting a blanket   {#68}
[00:03:36] TEACHER: on everything that is non,   {#69}
[00:03:38] TEACHER: not MySQL slash Postgres slash Oracle   {#70}
[00:03:40] TEACHER: and keeping them saying all of them scale,   {#71}
[00:03:43] TEACHER: that's wrong.   {#72}
[00:03:44] TEACHER: I'll give you a couple of examples   {#73}
[00:03:45] TEACHER: where those databases don't scale at all.   {#74}
[00:03:47] TEACHER: So which is where it's very important   {#75}
[00:03:50] TEACHER: to understand different types of databases   {#76}
[00:03:53] TEACHER: that are out there,   {#77}
[00:03:54] TEACHER: apart from the famous MySQL   {#78}
[00:03:55] TEACHER: and Postgres of the world.   {#79}
[00:03:57] TEACHER: That's why it's important to know like,   {#80}
[00:03:59] TEACHER: hey, this is where we'll use a particular type of database.   {#81}
[00:04:03] TEACHER: But given the world functions in a certain way,   {#82}
[00:04:07] TEACHER: I cannot impose, you need to know it in the terms the people talk about.   {#83}
[00:04:11] TEACHER: That's why I would use NoSQL slash non-relational.   {#84}
[00:04:14] TEACHER: But I would highly recommend,   {#85}
[00:04:16] TEACHER: basically this is the last time where I would use this   {#86}
[00:04:19] TEACHER: because every single time we would be specifying   {#87}
[00:04:21] TEACHER: the exact type of database that we would be using.   {#88}
[00:04:24] TEACHER: But given that it's just a general introduction,   {#89}
[00:04:27] TEACHER: It's okay. I'll be just using this term in this one.   {#90}
[00:04:31] TEACHER: After that, I'll never use it because I don't like to just blanket it out.   {#91}
[00:04:35] TEACHER: Okay.   {#92}
[00:04:36] TEACHER: So a very general distinction between relational and non-relational   {#93}
[00:04:41] TEACHER: or SQL and non-SQL or no SQL databases is that they are not relationally structured.   {#94}
[00:04:47] TEACHER: But it does not mean that no one can do that.   {#95}
[00:04:49] TEACHER: People can do it.   {#96}
[00:04:50] TEACHER: That's why it's a little messy out there.   {#97}
[00:04:52] TEACHER: But a very broad separation is that non-relational databases typically give up consistency to give you scalability.   {#98}
[00:05:05] TEACHER: That's a very broad, not always true kind of separation.   {#99}
[00:05:10] TEACHER: So consistency is when I said, by the way, there are two, English is a funny language.   {#100}
[00:05:17] TEACHER: we don't have enough words for every not English but rather computer scientists are very bad at   {#101}
[00:05:22] TEACHER: naming things there are two types of consistency the consistency in cap theorem is different from   {#102}
[00:05:29] TEACHER: consistency in acid consistency in acid is about data being consistent strongly consistent where   {#103}
[00:05:36] TEACHER: you don't mess with that and you move from one correct state to another while there is another   {#104}
[00:05:41] TEACHER: consistency which we learn in cap theorem that consistency is about your data being   {#105}
[00:05:47] TEACHER: shown being available to query right there in it that strong consistency we are talking about.   {#106}
[00:05:52] TEACHER: So here the consistency that we are talking about is this other one right so there are two types of   {#107}
[00:05:57] TEACHER: consistency okay. So in very generic sense you would have heard that non-relational data   {#108}
[00:06:03] TEACHER: non-relational databases typically give you option to scale basically horizontally scale the system   {#109}
[00:06:09] TEACHER: and be highly available because there are multiple nodes now   {#110}
[00:06:13] TEACHER: by compromising on consistency.   {#111}
[00:06:15] TEACHER: Relational databases wanted all the data to be there in one shot,   {#112}
[00:06:19] TEACHER: in one database instance.   {#113}
[00:06:20] TEACHER: So if that goes down, the system is down.   {#114}
[00:06:22] TEACHER: The system is not highly available anymore.   {#115}
[00:06:24] TEACHER: So now what non-relational databases like a very general classification did   {#116}
[00:06:28] TEACHER: is it spreads out horizontally.   {#117}
[00:06:30] TEACHER: Even if one of the node goes down, you have other nodes to serve the data.   {#118}
[00:06:34] TEACHER: So you do not have a complete downtime almost ever,   {#119}
[00:06:39] TEACHER: highlight over here. So it gives up consistency, strong consistency of data.   {#120}
[00:06:44] TEACHER: It gives up consistency, makes it eventual, not strong consistency, but it makes it eventually   {#121}
[00:06:50] TEACHER: consistent system, but it improves on horizontal scalability and availability.   {#122}
[00:06:56] TEACHER: So most non-relational databases are eventual, but you would always find exceptions because   {#123}
[00:07:01] TEACHER: there is no standardization.   {#124}
[00:07:03] TEACHER: A lot of people say non-relational databases like NoSQL DB scales.   {#125}
[00:07:10] TEACHER: I agree Cassandra scales, but for a very specific workload,   {#126}
[00:07:14] TEACHER: MongoDB scales for a very specific workload,   {#127}
[00:07:16] TEACHER: DynamoDB scales for a very specific workload.   {#128}
[00:07:18] TEACHER: But this does not mean that relational databases don't scale.   {#129}
[00:07:23] TEACHER: It's a very big misconception where people say relational databases don't scale.   {#130}
[00:07:28] TEACHER: You just need to know how to use it.   {#131}
[00:07:30] TEACHER: Yesterday, we built distributed key value store.   {#132}
[00:07:32] TEACHER: sharding, we like we gave up on like like not generic non-relational databases give up on   {#133}
[00:07:39] TEACHER: consistency to give you horizontal scalability and availability. We did that yesterday. We split our   {#134}
[00:07:45] TEACHER: databases where one database hold keys from A to M second did hold keys from N to Z. Right. We have   {#135}
[00:07:52] TEACHER: almost a highly available system. We gave up on consistency. So it's a very crude way to say that   {#136}
[00:07:59] TEACHER: non-relational database is scaled relational   {#137}
[00:08:01] TEACHER: to. You give up on constraints   {#138}
[00:08:03] TEACHER: that is not helping   {#139}
[00:08:05] TEACHER: you scale horizontally and you have a   {#140}
[00:08:06] TEACHER: truly horizontally scalable relational database.   {#141}
[00:08:09] TEACHER: So always keep these   {#142}
[00:08:11] TEACHER: things in mind that   {#143}
[00:08:13] TEACHER: anytime when you hear a generic   {#144}
[00:08:14] TEACHER: statement, even from me, from anyone,   {#145}
[00:08:17] TEACHER: don't believe it. Never.   {#146}
[00:08:19] TEACHER: Never. It has to be very specific.   {#147}
[00:08:21] TEACHER: It has to be contextual.   {#148}
[00:08:22] TEACHER: Ask those critical questions. Why   {#149}
[00:08:25] TEACHER: are you saying this generic statement?   {#150}
[00:08:27] TEACHER: Because you can always, always   {#151}
[00:08:29] TEACHER: provide a counter example. Keep that thing in mind and that's what would make you a better   {#152}
[00:08:33] TEACHER: engineer. Always remember don't just take things on its face value ever. Okay. Now the first type   {#153}
[00:08:42] TEACHER: of non-relational databases I'll talk about is one which is closest to the relational world.   {#154}
[00:08:48] TEACHER: They are called document databases. Now document databases, very famous examples,   {#155}
[00:08:53] TEACHER: MongoDB Elasticsearch.   {#156}
[00:08:55] TEACHER: These are examples of document based databases.   {#157}
[00:08:58] TEACHER: This is very similar to what we discussed yesterday,   {#158}
[00:09:02] TEACHER: where we were talking about,   {#159}
[00:09:04] TEACHER: Hey, I'm storing my value as a JSON and I want to query within that.   {#160}
[00:09:09] TEACHER: That's exactly what document databases give you.   {#161}
[00:09:12] TEACHER: So document databases are closest to relational databases.   {#162}
[00:09:15] TEACHER: They are mostly JSON based.   {#163}
[00:09:17] TEACHER: There is no hard and fast tool, but they are mostly JSON based.   {#164}
[00:09:20] TEACHER: They support complex queries.   {#165}
[00:09:23] TEACHER: on MongoDB, you can do aggregations on Elasticsearch, you can do faceted query on Elasticsearch.   {#166}
[00:09:28] TEACHER: Now this is very similar to not exactly as powerful as relational but very close to what   {#167}
[00:09:34] TEACHER: relational databases would give you which is where you would always see that whenever people move   {#168}
[00:09:40] TEACHER: out of relational and into non-relational verbatim you would always see them adopting either one of   {#169}
[00:09:48] TEACHER: or any document DBS in general, right?   {#170}
[00:09:51] TEACHER: You would never see them drastically moving from this   {#171}
[00:09:54] TEACHER: to a direct key value store, right?   {#172}
[00:09:56] TEACHER: Because it's very restrictive where you do not peek into the value,   {#173}
[00:09:59] TEACHER: then it's of no use unless the use case was exactly like that.   {#174}
[00:10:03] TEACHER: What for when they were doing it.   {#175}
[00:10:05] TEACHER: So in most cases, a generic relational schema translates   {#176}
[00:10:10] TEACHER: when you are moving to a non-relational world,   {#177}
[00:10:12] TEACHER: you would typically move into a document based database   {#178}
[00:10:13] TEACHER: because it gives you the features, almost features,   {#179}
[00:10:18] TEACHER: that a relational database was giving you.   {#180}
[00:10:20] TEACHER: For example, partial updates to documents.   {#181}
[00:10:23] TEACHER: This is one of the key features of a document-based database,   {#182}
[00:10:27] TEACHER: which means you are allowed to query on the attribute of the document.   {#183}
[00:10:32] TEACHER: For example, I have a MongoDB document.   {#184}
[00:10:34] TEACHER: I am allowed to query that, hey, give me all the documents   {#185}
[00:10:37] TEACHER: having this particular attribute set to this particular value.   {#186}
[00:10:41] TEACHER: Same thing you can do with Elasticsearch.   {#187}
[00:10:43] TEACHER: You can make partial updates to the document.   {#188}
[00:10:45] TEACHER: You can say that, Hey, in this document, just update this one attribute.   {#189}
[00:10:49] TEACHER: But if it was key value store, where value is just a blob, you, if you'd want to do an   {#190}
[00:10:56] TEACHER: update, you have to read, update and write.   {#191}
[00:10:59] TEACHER: Right?   {#192}
[00:11:00] TEACHER: So it prevents you from doing those partial updates on it.   {#193}
[00:11:03] TEACHER: Document devs typically give you that.   {#194}
[00:11:05] TEACHER: And they are the closest when it comes to relational databases.   {#195}
[00:11:09] TEACHER: But again, I'm only saying this, there is no rule that a document database cannot give   {#196}
[00:11:17] TEACHER: you what key value gives or a key value cannot give you what document gives you.   {#197}
[00:11:21] TEACHER: For example, you may have, or you would know that DynamoDB is a key value store.   {#198}
[00:11:27] TEACHER: It's not a document based database, but still allows you to query within the document, right?   {#199}
[00:11:31] TEACHER: You can always see that.   {#200}
[00:11:33] TEACHER: You can always see that coming.   {#201}
[00:11:35] TEACHER: but which is why there is no line that separates document dbs and key value stores and columnar   {#202}
[00:11:42] TEACHER: storages and whatnot it's very blurry every database like people are working on those databases   {#203}
[00:11:49] TEACHER: they are building those databases everyone is entering into everyone else's space right so   {#204}
[00:11:54] TEACHER: lines are very blurry so which is why understand the access pattern understand the features which   {#205}
[00:12:01] TEACHER: is why I listed complex queries and basically partial updates instead of just saying that,   {#206}
[00:12:07] TEACHER: hey, these are only document data.   {#207}
[00:12:08] TEACHER: So what you need to know as an engineer is what features do you want from the database   {#208}
[00:12:15] TEACHER: and which database gives you that.   {#209}
[00:12:18] TEACHER: Generic statements never work because it may be true today.   {#210}
[00:12:22] TEACHER: When you're down the line, it would be completely false.   {#211}
[00:12:24] TEACHER: For example, who would have thought MongoDB could support asset properties?   {#212}
[00:12:27] TEACHER: They started to say, hey, we are base.   {#213}
[00:12:29] TEACHER: We are not asset, right?   {#214}
[00:12:31] TEACHER: But now MongoDB is asset compliant.   {#215}
[00:12:32] TEACHER: May not be as optimal as SQL world, but they are asset compliant.   {#216}
[00:12:36] TEACHER: Right.   {#217}
[00:12:37] TEACHER: So which is why you cannot generically claim something about a database.   {#218}
[00:12:42] TEACHER: Always, always, always remember this.   {#219}
[00:12:45] TEACHER: Okay.   {#220}
[00:12:46] TEACHER: Now that we, now that I use that, let's move to the second type of database, key values   {#221}
[00:12:50] TEACHER: store.   {#222}
[00:12:50] TEACHER: Now key values store are typically more restrictive than document based database where the query   {#223}
[00:12:56] TEACHER: Any that you are making or reads and writes and deletes and all the operations that you   {#224}
[00:13:01] TEACHER: are making, they are always key wise operations like get a key, put a key, delete a key, insert   {#225}
[00:13:09] TEACHER: a key, insert a value in the set represented by a key, something like that.   {#226}
[00:13:13] TEACHER: So it's a little more restrictive than document based database.   {#227}
[00:13:16] TEACHER: But because everything is key wise, you can very easily shard the database because you   {#228}
[00:13:23] TEACHER: would never have to make cross shard queries.   {#229}
---- OWNED SEGMENTS END ----

CTX| [00:13:26] TEACHER: cross-sharp queries you have to make when you are doing that range operation that,   {#230}
CTX| [00:13:31] TEACHER: hey, in this range operation or in operator, when you are saying that,   {#231}
CTX| [00:13:35] TEACHER: hey, give me all the documents where ID in 1, 2 and 3.   {#232}
CTX| [00:13:39] TEACHER: What if one is on one database, two is on this database, three is the third database.   {#233}
CTX| [00:13:42] TEACHER: Right.   {#234}
CTX| [00:13:42] TEACHER: So in that case, you are doing cross-sharp queries, which becomes very expensive,   {#235}
CTX| [00:13:46] TEACHER: but key values to limits that all it gives you is, hey, this is a key.   {#236}
CTX| [00:13:52] TEACHER: Give me the value or every operation is a single key based operation.   {#237}
CTX| [00:13:55] TEACHER: Right.   {#238}
CTX| [00:13:56] TEACHER: such cases key value store you can very heavily partition very heavily like thousands and thousands   {#239}
CTX| [00:14:03] TEACHER: of partitions without having any hiccups because what you are doing is you are limiting the way   {#240}
CTX| [00:14:09] TEACHER: people can access them this way what you get you get very heavily partitioned now imagine the more   {#241}
CTX| [00:14:17] TEACHER: complex you make these queries the lesser you can distribute the data because then cross-shot queries   {#242}
CTX| [00:14:22] TEACHER: become expensive. So that is why you see this on one extreme where it prevents you from doing   {#243}
