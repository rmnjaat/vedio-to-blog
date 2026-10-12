**[00:38:20] Teacher:** Interesting time talking about it. And because it contains sensitive details, I cannot share that. But this is where you see the power of graph databases. You see where you need powerful graph algorithms. You use graph databases. You just don't use it for [unclear: "fall of all languages"]. That's a very trivial use case. Very trivial. Right. So in a gist, if you can visualize a graph that, hey, this should be a graph use case, most more often than not, that is not where you should be using graph databases. So [unclear: "shelving"], follow following, that's a very trivial [?use case | asr: "discuss"]. But where you need the actual raw crude graph algorithm, you use graph databases. Okay.

[00:39:02] Few examples, Neo4j, one of the best, like one of the first, not the best, one of the first that came out. Like always, AWS copies everything. AWS has their own managed offering from graph database called Neptune. Then Dgraph. Written in Go, works very well at [unclear: "bit scale"]. High scale it falters a bit. I use Dgraph very extensively. But it's a good database. Written in Go and that was one of the first projects I went through to understand Go. Very brilliant. And they have an embedded database called BadgerDB. Also fascinating. And a proprietary database called TigerGraph. A lot of companies, a lot of financial companies actually use TigerGraph. They don't rely on open source stuff. They use TigerGraph to power their graph databases.

[00:39:47] Right. Okay. Now, these are all basics that I wanted to cover about non-relational data. And we will use each one of them in the coming weeks. We'll use them. We'll see how they are. But this is just an introduction so that everyone is on the same page.

<!-- topic-candidate [00:40:01]: Why non-relational databases scale -->

[00:40:01] Now, let's go and ask more fundamental questions. Like why do people say that non-relational databases scale? They scale non-relational data. *(admin)* Sunil, I will tell you, I am lowering your hand because of a reason. Okay.

[00:40:18] Why non-relational databases scale? They scale because there are no relations. Now, what relational databases are good at is because of that relation, that foreign key constraints that you talk about, is because it ensures the correctness of the data. Because for example, if you have a foreign key relationship to a table where key is non-null, you are not allowed to insert the row where that other row is not present. So it needs the existence of that other row for you to be allowed to insert this row. Similarly goes for deletion. But unless you delete all the child entries, parent entries cannot be deleted.

[00:40:57] Now what relational databases they try to solve for is that they try to ensure the correctness of the system, the strong consistency of the data that a system moves from one consistent state to another consistent state. And it ensures that by enforcing relations and constraints on the data, non-relational databases gives up on that. I don't care what you insert. I don't care if that key exists or not. Just insert the data that you want.

[00:41:25] Now, why relational databases made that choice? They did it because the first set of use case that they were built on was financial use case where correctness of the data was more important than just performing at scale. Understand. Everyone has a backstory. This is the backstory of relational databases and why they made a certain decision. Now, this does not make them bad as compared to non-relational database. So everyone has a backstory that you should be aware of.

[00:41:54] So because relational databases are meant to be used for financial things, they went for correctness, more like went for consistency and consistency, data consistency and strong consistency over high ingestion rate, which is why you would find them do it. Now, because of this, if this is the restricting factor where you need all the data to be in one place and whatnot, non-relational databases that typically don't give you these features. So if you'd want to scale this, just don't use foreign key. Simple. If you don't have constraints, if you don't apply foreign key, you can partition the data exactly how a normal non-relational database would do.

[00:42:38] Exactly. So if you choose not to have foreign keys, you can literally partition a relational database exactly how non-relational databases are there because they never give you those features. You get this. So which is why I always say that if a certain databases claim that they are being great at a certain thing, understand why they are being great at certain things, what kind of things that they give up in order to get that. Try to do it in the familiar with it may not be just SQL database, even non-SQL database. So never just be stuck with a particular technology. No, I only use this database over there because every other database sucks. No, be flexible. Every database is unique in its own flavor. Try to learn that. Try to see the beauty that goes beneath the initial layers of fancy UI and whatnot. Bit deeper and see why are they able to get this performance. See if you can mimic that same thing on your database, you'll become better at it. Okay.

<!-- topic-candidate [00:43:48]: When to use SQL vs NoSQL -->

[00:43:48] Now the biggest question of all time, [unclear: "when do you see a comment"]? It's not simple. Answer is very simple. The strength of SQL data correctness slash consistency, strong consistency, right? Which when you need that, don't look beyond, don't look beyond anything. Of the data is the most important part of your application or it's the most important feature of your application, you need ACID. If you need ACID, go for SQL, [unclear: "as if what is that"], because it gives you those necessary [?toolings | asr: "two links"] that ensure that your data never goes in an inconsistent state or an incorrect state. Obviously you have to use those [?toolings | asr: "two links"], it does not automatically gives you, right? So having those foreign key checks, check constraints and whatnot, you have to apply them because it gives you those [?toolings | asr: "two links"] to ensure the correctness of your system, right? Which is where you would use SQL.

[00:44:46] Now, when to use NoSQL? A very simple way to look at it is when you have gigantic data, gigantic data. So typically big data, not data engineering, big data [?use case | asr: "discuss"], but you have to ingest large amount of data. For example, messages, huge amount of influx of messages over Instagram, huge amount of post being written, huge amount of not really tweets, but logs, logs being dumped. All of those use cases are non-relational use cases because what you are optimizing for not the correctness. It's okay. If one of the data is here or there, one attribute is missing. Some data is here or there lost like metrics ingestion, logs ingestion, message ingestion, [unclear: "water"], when you're ingesting at a very fast pace is what your non-relational are created, like for example Cassandra, because it gives you sharding and whatnot out of the box and it drops those constraints. It is very light on the database. It gives you heavily partitioned slash sharded databases. That's what makes a good use case for all for NoSQL database, which is where typically you see messaging system, live interaction, [?pollings | asr: "pullings"] and whatnot, they typically store data in non-relational databases because the kind of toolings non-relational databases give you, like sharding, partitioning, they don't provide you constraints. They give you out of the box. If you are using SQL, you would have to build them on your own. No one has that type, right? So you go for non-SQL.

[00:46:14] So a general, very general high level thing that I may put it is when correctness is important, where you need those [?toolings | asr: "two links"] out of the box to ensure the correctness and consistency of data, go for SQL. And for high ingestion rate, for sharded out of the box, you need sharding, you need very high ingestion and whatnot. You go for NoSQL database. This is a very broad sense in which I'm putting it out. But over this course, you would see that whenever we are deciding something, you would see that we are taking into consideration all of these factors before we pick a particular database. And not just some mumbo jumbo, I will use NoSQL everywhere. No, don't be rigid on a particular database. Right. Okay. Any questions on this part? The first part. Yeah.

<!-- topic-candidate [00:47:11]: Questions on non-relational databases -->

> **Student Question [00:47:11] - Student 6:** Hi, I had a question on graph DB, you said that this [?stored | asr: "toward"] as adjacency list, each node has a varying number of neighboring nodes, so like how I want to ask, how is it stored internally?

**[00:47:26] Teacher (answer):** It's a storage engine of it. A different [?layer | asr: "player"] to store. It's obviously not stored in memory. It's stored on disk, but it's normal serialized and stored in a simple way. And it depends to be honest on the graph database, but think of it as a comma separated list of IDs, a blunt implementation.

**[00:47:44] Student 6:** Right. So it's a KV store basically.

**[00:47:46] Teacher:** Yeah. You can model every database on a KV store. You can literally model every single database, literally every single database on top of the KV store. KV store is a NAND gate of the databases, like how you can implement and, or, not, not, all the gates with NAND gate. Same thing. All the database in the world can be modeled on top of KV database. May not be as performance, but you can model.

**[00:48:13] Student 8:** Right. Right. Thank you.

> **Student Question [00:48:17] - Student 4:** So graph database, right? Right. User interacted applications cannot store data into graph databases.
>
> [00:48:26] Right. My understanding. Applications are...

**[00:48:30] Teacher (answer):** So actually transactionally, you cannot use it. You ingest it asynchronously and then drive something out of it.

**[00:48:36] Student 4:** Typically create those models on top of relational or non-relational databases.

**[00:48:42] Teacher:** Correct. Right. Yeah. Yeah.

> **Student Question [00:48:44] - Student 4:** What is the need to, I mean, how like a graph can help?

**[00:48:48] Teacher (answer):** How would you query, how would you power fraud detection on top of relational DB?

**[00:48:53] Student 4:** I mean benefit I understand, but how like creating a graph like would help like these use cases, why relational database cannot solve like these use cases.

**[00:49:02] Teacher (answer):** For example, if you would want to find something, which is three level deep in graph database, three level deep, a simple graph query would give you that answer, graph traversal and you get that answer. In relational databases for N level deep, you have to write N self... Correct. Now this cannot be one generic query, but depending on each level of join, you have to write or rewrite that query and then fire it. That is painful. Right. Plus n self joins on a table may not be very optimal when your data is huge. Third, your data is stored in one data node in terms of relational DB. So [unclear: "part-triotic"] sharding exists, but graph databases give you out of the box.

**[00:49:44] Student 4:** Yeah.

> **Student Question [00:49:45] - Student 4:** Theory part understood, but do you have any like no reference to a resource which can explain like no real time, like no use case, just google search, you're just a google search graph databases in [check: diarization seam]

**[00:49:56] Teacher (answer):** fraud detection, graph databases in recommendation engine, you'll find tons of articles above. Okay.
