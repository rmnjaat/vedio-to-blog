# chunk_04  OWNS 00:38:20 -> 00:50:04  (segments #645-#849, 1939 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:37:24] TEACHER: and they say okay this is a suspicious transaction and all of this is has to be done in 200 milliseconds   {#633}
CTX| [00:37:31] TEACHER: that's it they have 200 millisecond SLA now I tell you why how I'm so sure about this number   {#634}
CTX| [00:37:36] TEACHER: I had one person VP engineering uh an actual VP not not that software developer VP engineer   {#635}
CTX| [00:37:42] TEACHER: actual VP engineering of JP Morgan Chase took this cohort fifth cohort and he explained this use case   {#636}
CTX| [00:37:50] TEACHER: 200 milliseconds is what they have to do this graph detection and tell us.   {#637}
CTX| [00:37:56] TEACHER: Because in 200 milliseconds, they have to make this decision   {#638}
CTX| [00:37:58] TEACHER: and they have to redirect it to the customer executive.   {#639}
CTX| [00:38:01] TEACHER: That call goes to you and you and that customer executives are connected   {#640}
CTX| [00:38:04] TEACHER: because then they have to ask if you are the one who are making the transaction,   {#641}
CTX| [00:38:08] TEACHER: approve that and then you are allowed to basically do that transaction.   {#642}
CTX| [00:38:12] TEACHER: All of this entire system is just powered through graph analysis.   {#643}
CTX| [00:38:16] TEACHER: This is the actual real use case.   {#644}

---- OWNED SEGMENTS START ----
[00:38:20] TEACHER: interesting time talking about it.   {#645}
[00:38:22] TEACHER: And because it contains sensitive details, I cannot share that.   {#646}
[00:38:25] TEACHER: But this is where you see the power of graph databases.   {#647}
[00:38:28] TEACHER: You see where you need powerful graph algorithms.   {#648}
[00:38:32] TEACHER: You use graph databases.   {#649}
[00:38:34] TEACHER: You just don't use it for fall of all languages.   {#650}
[00:38:35] TEACHER: That's a very trivial use case.   {#651}
[00:38:38] TEACHER: Very trivial.   {#652}
[00:38:39] TEACHER: Right.   {#653}
[00:38:39] TEACHER: So in a gist, if you can visualize a graph that, Hey, this should be a graph use case.   {#654}
[00:38:47] TEACHER: most more often than not, that is not where you should be using graph databases.   {#655}
[00:38:51] TEACHER: So shelving, follow following, that's a very trivial discuss.   {#656}
[00:38:54] TEACHER: But where you need the actual raw crude graph algorithm,   {#657}
[00:38:59] TEACHER: you use graph databases.   {#658}
[00:39:01] TEACHER: Okay.   {#659}
[00:39:02] TEACHER: Few examples, Neo4j, one of the best,   {#660}
[00:39:06] TEACHER: like one of the first, not the best, one of the first that came out.   {#661}
[00:39:10] TEACHER: Like always, AWS copies everything.   {#662}
[00:39:12] TEACHER: AWS has their own managed offering from graph database called Neptune.   {#663}
[00:39:15] TEACHER: Then Dgraph.   {#664}
[00:39:17] TEACHER: Return in Go works very well at bit scale.   {#665}
[00:39:20] TEACHER: High scale it falters a bit.   {#666}
[00:39:22] TEACHER: I use D-graph very extensively.   {#667}
[00:39:24] TEACHER: But it's a good database.   {#668}
[00:39:26] TEACHER: Return in Go and that was one of the first projects I went through to understand Go.   {#669}
[00:39:30] TEACHER: Very brilliant.   {#670}
[00:39:31] TEACHER: And they have an embedded database called Badger DBS.   {#671}
[00:39:34] TEACHER: Also fascinating.   {#672}
[00:39:35] TEACHER: And a proprietary database called Tiger Graph.   {#673}
[00:39:39] TEACHER: A lot of companies, a lot of financial companies actually use Tiger Graph.   {#674}
[00:39:43] TEACHER: They don't rely on open source stuff.   {#675}
[00:39:44] TEACHER: They use Tiger Graph to power their graph databases.   {#676}
[00:39:47] TEACHER: Right. Okay. Now, these are all basics that I wanted to cover about non-relational data.   {#677}
[00:39:54] TEACHER: And we will use each one of them in the coming weeks.   {#678}
[00:39:56] TEACHER: We'll use them. We'll see how they are.   {#679}
[00:39:58] TEACHER: But this is just an introduction so that everyone is on the same page.   {#680}
[00:40:01] TEACHER: Now, let's go and ask more fundamental questions.   {#681}
[00:40:05] TEACHER: Like why do people say that non-relational databases scale?   {#682}
[00:40:11] TEACHER: They scale non-relational data.   {#683}
[00:40:13] TEACHER: Sunil, I will tell you, I am lowering your hand because of a reason.   {#684}
[00:40:17] TEACHER: Okay.   {#685}
[00:40:18] TEACHER: Why non-relational databases scale?   {#686}
[00:40:20] TEACHER: They scale because there are no relations.   {#687}
[00:40:23] TEACHER: Now, what relational databases are good at is because of that relation,   {#688}
[00:40:29] TEACHER: that foreign key constraints that you talk about,   {#689}
[00:40:31] TEACHER: is because it ensures the correctness of the data.   {#690}
[00:40:34] TEACHER: Because for example, if you have a foreign key relationship to a table   {#691}
[00:40:38] TEACHER: where key is non-null, you are not allowed to insert the row   {#692}
[00:40:44] TEACHER: where that other row is not present.   {#693}
[00:40:47] TEACHER: So it needs the existence of that other row for you to be allowed to insert this row.   {#694}
[00:40:51] TEACHER: Similarly goes for deletion.   {#695}
[00:40:53] TEACHER: But unless you delete all the child entries, parent entries cannot be deleted.   {#696}
[00:40:57] TEACHER: Now what relational databases they try to solve for is that they try to ensure the correctness   {#697}
[00:41:03] TEACHER: of the system, the strong consistency of the data that a system moves from one consistent   {#698}
[00:41:09] TEACHER: state to another consistent state.   {#699}
[00:41:10] TEACHER: And it ensures that by enforcing relations and constraints on the data, non-relational databases gives up on that.   {#700}
[00:41:19] TEACHER: I don't care what you insert.   {#701}
[00:41:21] TEACHER: I don't care if that key exists or not.   {#702}
[00:41:23] TEACHER: Just insert the data that you want.   {#703}
[00:41:25] TEACHER: Now, why relational databases made that choice?   {#704}
[00:41:28] TEACHER: They did it because the first set of use case that they were built on was financial use case where correctness of the data was more important than just performing at scale.   {#705}
[00:41:39] TEACHER: Understand.   {#706}
[00:41:40] TEACHER: Everyone has a backstory.   {#707}
[00:41:42] TEACHER: This is the backstory of relational databases   {#708}
[00:41:44] TEACHER: and why they made a certain decision.   {#709}
[00:41:46] TEACHER: Now, this does not make them bad   {#710}
[00:41:49] TEACHER: as compared to non-relational database.   {#711}
[00:41:51] TEACHER: So everyone has a backstory   {#712}
[00:41:52] TEACHER: that you should be aware of.   {#713}
[00:41:54] TEACHER: So because relational databases   {#714}
[00:41:56] TEACHER: are meant to be used for financial things,   {#715}
[00:42:01] TEACHER: they went for correctness,   {#716}
[00:42:03] TEACHER: more like went for consistency and consistency,   {#717}
[00:42:06] TEACHER: data consistency and strong consistency   {#718}
[00:42:08] TEACHER: over high ingestion rate,   {#719}
[00:42:11] TEACHER: which is why you would find them do it.   {#720}
[00:42:13] TEACHER: Now, because of this,   {#721}
[00:42:15] TEACHER: if this is the restricting factor   {#722}
[00:42:17] TEACHER: where you need all the data   {#723}
[00:42:18] TEACHER: to be in one place and whatnot,   {#724}
[00:42:21] TEACHER: non-relational databases   {#725}
[00:42:21] TEACHER: that typically don't give you these features.   {#726}
[00:42:24] TEACHER: So if you'd want to scale this,   {#727}
[00:42:27] TEACHER: just don't use foreign key.   {#728}
[00:42:29] TEACHER: Simple.   {#729}
[00:42:29] TEACHER: If you don't have constraints,   {#730}
[00:42:31] TEACHER: if you don't apply foreign key,   {#731}
[00:42:33] TEACHER: you can partition the data   {#732}
[00:42:35] TEACHER: exactly how a normal   {#733}
[00:42:36] TEACHER: non-relational database would do.   {#734}
[00:42:38] TEACHER: Exactly. So if you choose not to have foreign keys, you can literally partition a relational   {#735}
[00:42:46] TEACHER: database exactly how non-relational databases are there because they never give you those   {#736}
[00:42:51] TEACHER: features. You get this. So which is why I always say that if a certain databases claim   {#737}
[00:42:57] TEACHER: that they are being great at a certain thing, understand why they are being great at certain   {#738}
[00:43:02] TEACHER: things, what kind of things that they give up in order to get that. Try to do it in the   {#739}
[00:43:08] TEACHER: familiar with it may not be just SQL database, even non-SQL database.   {#740}
[00:43:12] TEACHER: So never just be stuck with a particular technology.   {#741}
[00:43:17] TEACHER: No, I only use this database over there because every other database sucks.   {#742}
[00:43:21] TEACHER: No, be flexible.   {#743}
[00:43:23] TEACHER: Every database is unique in its own flavor.   {#744}
[00:43:26] TEACHER: Try to learn that.   {#745}
[00:43:29] TEACHER: Try to see the beauty that goes beneath the initial layers of fancy UI and whatnot.   {#746}
[00:43:38] TEACHER: bit deeper and see why are they able to get this performance.   {#747}
[00:43:42] TEACHER: See if you can mimic that same thing on your database, you'll become better at it.   {#748}
[00:43:47] TEACHER: Okay.   {#749}
[00:43:48] TEACHER: Now the biggest question of all time, when do you see a comment?   {#750}
[00:43:53] TEACHER: It's not simple.   {#751}
[00:43:54] TEACHER: Answer is very simple.   {#752}
[00:43:55] TEACHER: The strength of SQL data correctness slash consistency, strong consistency, right?   {#753}
[00:44:02] TEACHER: Which when you need that, don't look beyond, don't look beyond anything.   {#754}
[00:44:08] TEACHER: of the data is the most important part of your application or it's the most important feature of   {#755}
[00:44:14] TEACHER: your application you need acid if you need acid go for sql as if what is that because it gives you   {#756}
[00:44:22] TEACHER: those necessary two links that ensure that your data never goes in an inconsistent state or an   {#757}
[00:44:29] TEACHER: incorrect state obviously you have to use those two links it does not automatically gives you right   {#758}
[00:44:33] TEACHER: So having those foreign key checks, check constraints and whatnot,   {#759}
[00:44:37] TEACHER: you have to apply them because it gives you those two links   {#760}
[00:44:41] TEACHER: to ensure the correctness of your system, right?   {#761}
[00:44:44] TEACHER: Which is where you would use SQL.   {#762}
[00:44:46] TEACHER: Now, when to use NoSQL?   {#763}
[00:44:48] TEACHER: A very simple way to look at it is when you have gigantic data,   {#764}
[00:44:53] TEACHER: gigantic data.   {#765}
[00:44:54] TEACHER: So typically big data, not data engineering, big data discuss,   {#766}
[00:44:58] TEACHER: but you have to ingest large amount of data.   {#767}
[00:45:00] TEACHER: For example, messages, huge amount of influx of messages   {#768}
[00:45:03] TEACHER: over Instagram, huge amount of post being written, huge amount of not really tweets,   {#769}
[00:45:09] TEACHER: but logs, logs being dumped.   {#770}
[00:45:13] TEACHER: All of those use cases are non-relational use cases because what you are optimizing   {#771}
[00:45:17] TEACHER: for not the correctness.   {#772}
[00:45:19] TEACHER: It's okay.   {#773}
[00:45:20] TEACHER: If one of the data is here or there, one attribute is missing.   {#774}
[00:45:22] TEACHER: Some data is here or there lost like metrics ingestion, logs ingestion, message   {#775}
[00:45:27] TEACHER: ingestion, water, when you're ingesting at a very fast pace is what your non-relational   {#776}
[00:45:33] TEACHER: are created like for example Cassandra because it gives you sharding and whatnot out of the box   {#777}
[00:45:39] TEACHER: and it drops those constraints it is very light on the database it gives you heavily partitioned   {#778}
[00:45:44] TEACHER: slash sharded databases that's what makes a good use case for all for no sql database which is where   {#779}
[00:45:50] TEACHER: typically you see messaging system live interaction pullings and whatnot they typically store data   {#780}
[00:45:56] TEACHER: in non-resistant databases because the kind of toolings non-resistant databases give you   {#781}
[00:46:02] TEACHER: like sharding, partitioning, they don't provide you constraints.   {#782}
[00:46:05] TEACHER: They give you out of the box.   {#783}
[00:46:07] TEACHER: If you are using SQL, you would have to build them on your own.   {#784}
[00:46:11] TEACHER: No one has that type, right?   {#785}
[00:46:13] TEACHER: So you go for non-SQL.   {#786}
[00:46:14] TEACHER: So a general, very general high level thing that I may put it is   {#787}
[00:46:20] TEACHER: when correctness is important, where you need those two links   {#788}
[00:46:24] TEACHER: out of the box to ensure the correctness and consistency of data,   {#789}
[00:46:27] TEACHER: go for SQL.   {#790}
[00:46:29] TEACHER: And for high ingestion rate, for sharded out of the box, you need sharding, you need very   {#791}
[00:46:36] TEACHER: high ingestion and whatnot.   {#792}
[00:46:38] TEACHER: You go for NoSQL database.   {#793}
[00:46:40] TEACHER: This is a very broad sense in which I'm putting it out.   {#794}
[00:46:44] TEACHER: But over this course, you would see that whenever we are deciding something, you would see that   {#795}
[00:46:49] TEACHER: we are taking into consideration all of these factors before we pick a particular database.   {#796}
[00:46:54] TEACHER: And not just some mumbo jumbo, I will use NoSQL everywhere.   {#797}
[00:46:58] TEACHER: No, don't be rigid on a particular database.   {#798}
[00:47:02] TEACHER: Right.   {#799}
[00:47:03] TEACHER: Okay.   {#800}
[00:47:04] TEACHER: Any questions on this part?   {#801}
[00:47:06] TEACHER: The first part.   {#802}
[00:47:08] TEACHER: Yeah.   {#803}
[00:47:11] STUDENT_6: Hi, I had a question on graph, uh, DB, you said that this toward   {#804}
[00:47:15] STUDENT_6: as adjacency list, um, each node has, uh, a varying number of, uh, neighboring   {#805}
[00:47:22] STUDENT_6: nodes, so like how I want to ask, how is it stored internally?   {#806}
[00:47:26] TEACHER: It's a storage engine of it.   {#807}
[00:47:28] TEACHER: a different player to store.   {#808}
[00:47:29] TEACHER: It's obviously not stored in memory.   {#809}
[00:47:31] TEACHER: It's stored on disk, but it's normal serialized and stored in a simple way.   {#810}
[00:47:35] TEACHER: And it depends to be honest on the graph database, but think of it as a comma   {#811}
[00:47:39] TEACHER: separated list of IDs, a blunt implementation.   {#812}
[00:47:44] STUDENT_6: Right.   {#813}
[00:47:44] STUDENT_6: So it's a KV store basically.   {#814}
[00:47:46] TEACHER: Yeah.   {#815}
[00:47:47] TEACHER: You can model every database on a KV store.   {#816}
[00:47:49] TEACHER: You can literally model every single database, literally every single   {#817}
[00:47:53] TEACHER: database on top of the KV store.   {#818}
[00:47:55] TEACHER: KVStore is a NAND gate of the databases, like how you can implement and, or, not, not, all the gates with NAND gate.   {#819}
[00:48:05] TEACHER: Same thing. All the database in the world can be modeled on top of KV database.   {#820}
[00:48:10] TEACHER: May not be as performance, but you can model.   {#821}
[00:48:13] STUDENT_8: Right. Right. Thank you.   {#822}
[00:48:17] STUDENT_4: So graph database, right?   {#823}
[00:48:18] STUDENT_4: Right. User interacted applications cannot store data into graph databases.   {#824}
[00:48:26] STUDENT_4: Right. My understanding. Applications are...   {#825}
[00:48:30] TEACHER: So actually transactionally, you cannot use it. You ingest it asynchronously and then drive something out of it.   {#826}
[00:48:36] STUDENT_4: Typically create those models on top of relational or non-relational databases.   {#827}
[00:48:42] TEACHER: Correct. Right. Yeah. Yeah.   {#828}
[00:48:44] STUDENT_4: What is the need to, I mean, how like a graph can help?   {#829}
[00:48:48] TEACHER: How would you query, how would you power fraud detection on top of relational DB?   {#830}
[00:48:53] STUDENT_4: I mean benefit I understand, but how like creating a graph   {#831}
[00:48:56] STUDENT_4: like would help like these use cases, why relational database   {#832}
[00:48:59] STUDENT_4: cannot solve like these use cases.   {#833}
[00:49:02] TEACHER: For example, if you would want to find something, which is three level   {#834}
[00:49:07] TEACHER: deep in graph database, three level deep, a simple graph query   {#835}
[00:49:11] TEACHER: would give you that answer graph traversal and you get that answer   {#836}
[00:49:13] TEACHER: in relational databases for N level deep, you have to write N self   {#837}
[00:49:19] TEACHER: Correct.   {#838}
[00:49:20] TEACHER: Now this cannot be one generic query, but depending on each level of join, you have   {#839}
[00:49:24] TEACHER: to write or rewrite that query and then fire it.   {#840}
[00:49:29] TEACHER: That is painful.   {#841}
[00:49:30] TEACHER: Right.   {#842}
[00:49:31] TEACHER: Plus n self joins on a table may not be very optimal when your data is huge.   {#843}
[00:49:36] TEACHER: Third, your data is stored in one data node in terms of relational DB.   {#844}
[00:49:40] TEACHER: So part-triotic sharding exists, but graph databases give you out of the box.   {#845}
[00:49:44] STUDENT_4: Yeah.   {#846}
[00:49:45] STUDENT_4: theory part understood but do you have any like no reference to a resource which can explain like   {#847}
[00:49:51] STUDENT_4: no real time like no use case just google search you're just a google search graph databases in   {#848}
[00:49:56] TEACHER: fraud detection graph databases in recommendation engine you'll find tons of articles above okay   {#849}
---- OWNED SEGMENTS END ----

CTX| [00:50:04] STUDENT_6: yeah one more question relating to the uh sequel versus non-sql databases like these days   {#850}
CTX| [00:50:09] STUDENT_6: MongoDB also offers ACID properties.   {#851}
CTX| [00:50:13] STUDENT_6: Not performed.   {#852}
CTX| [00:50:15] STUDENT_6: Okay.   {#853}
CTX| [00:50:16] TEACHER: It's a distributed transaction.   {#854}
CTX| [00:50:17] TEACHER: Slows down.   {#855}
CTX| [00:50:18] TEACHER: In their official documentation,   {#856}
CTX| [00:50:19] TEACHER: it says that please use ACID sparingly.   {#857}
CTX| [00:50:24] TEACHER: It says that in their official documentation   {#858}
CTX| [00:50:27] TEACHER: because cross-shard ACID compliance is costly.   {#859}
CTX| [00:50:31] TEACHER: It is implemented using a distributed transaction.   {#860}
CTX| [00:50:33] TEACHER: Distributed transaction slows down the throughput.   {#861}
CTX| [00:50:36] TEACHER: Within shard ACID, anyone can guarantee.   {#862}
CTX| [00:50:40] TEACHER: ACID MongoDB guarantees, but it says that you're losing out on throughput.   {#863}
CTX| [00:50:44] TEACHER: It's there in the official documentation.   {#864}
CTX| [00:50:46] TEACHER: In the ACID part of it, you'll find it a line that says,   {#865}
CTX| [00:50:50] TEACHER: please use it sparing or something on similar lines.   {#866}
CTX| [00:50:53] TEACHER: And it says that it does it using distributed transaction.   {#867}
CTX| [00:50:57] TEACHER: Because of it, you should not use it more often.   {#868}
CTX| [00:50:59] TEACHER: If you need something like this, you should use it.   {#869}
CTX| [00:51:01] TEACHER: And I've also found it in the Wiretigers documentation as well.   {#870}
