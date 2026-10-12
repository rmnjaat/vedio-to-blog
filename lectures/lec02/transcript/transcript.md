# Lecture 02 - Non-relational databases and Slack's real-time communication

| | |
|---|---|
| **Source** | lec02.merged.json |
| **Duration** | 03:15:25 |
| **Speakers** | Teacher (TEACHER); Student 1-10, 12-14, 16, 17 (STUDENT_n -> Student n); STUDENT_11 and STUDENT_15 turns relabelled (Student 1 / `Student?`); `Student?` / `Teacher?` = uncertain. Names in brackets only where the teacher called the student by name right before the turn (diarization labels may mix people). |
| **Processed** | 2026-10-12 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 267 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 198 (TERM? 85, UNCLEAR 58, CHECK 49, SPEAKER? 6) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS, retention 99.50%, additions 0.37% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:02] Agenda - non-relational databases, Slack's real-time communication
2. [00:02:47] Non-relational databases
   - [00:04:36] Relational vs non-relational - consistency vs scalability
   - [~00:08:33] Document databases
   - [00:12:46] Key-value stores
3. [00:15:38] Column-oriented databases
   - [00:24:23] C-store paper
   - [00:25:45] Questions on row vs column-oriented reads
4. [00:30:09] Graph databases
   - [00:35:17] Fraud detection with graph databases
5. [00:40:01] Why non-relational databases scale
   - [00:43:48] When to use SQL vs NoSQL
   - [00:47:11] Questions on graph databases
   - [00:50:04] Questions - SQL vs non-SQL, ACID in MongoDB, KV stores
6. [00:53:41] Break *(admin)*
7. [01:00:04] Slack's real-time communication - schema
   - [01:02:11] Brainstorming the schema
   - [01:04:12] Naming entities as nouns - membership vs user channel
   - [01:06:23] Direct messages vs channel messages
   - [01:12:12] DMs as channels with two people
   - [01:14:19] Membership - checkpoint
8. [01:17:47] High-level design - database for messages
   - [01:21:17] Sending a message - API server vs WebSocket
9. [01:28:08] Message sending guarantees
   - [01:29:19] Three types of communication - persistence
   - [01:32:58] Second type - WhatsApp, asynchronous persistence via Kafka
   - [~01:36:57] Third type - Zoom chat, no persistence
   - [01:38:24] No DB calls from the WebSocket server
10. [01:46:41] Scaling WebSocket servers
   - [01:55:21] Sending a message to a user on another WebSocket server
   - [01:57:35] TCP connection between WebSocket servers
   - [02:02:45] Mesh of WebSocket servers - overhead
11. [02:07:58] Real-time Pub/Sub (Redis) between WebSocket servers
   - [02:10:09] Redis channels vs Slack channels
   - [02:14:57] Which WebSocket server to connect to
12. [02:19:38] Recap of the Slack design
   - [02:21:08] Six concurrent TCP connections limit
   - [02:24:58] Overall architecture - edge servers, Redis Pub/Sub, Kafka, partitioned database
   - [02:27:47] Balancer service
   - [~02:30:12] Wrap-up and next week's plan *(admin)*
13. [02:31:58] Q&A
   - [02:31:58] Exposing edge server IPs, security
   - [02:35:52] Edge servers and channel changes
   - [02:38:53] Why Redis Pub/Sub
   - [02:40:08] Bad actors, private channels
   - [02:43:14] Subscribing WebSocket servers to channels
   - [02:45:44] Redis Pub/Sub vs Kafka
   - [02:50:15] Message deletion
   - [02:54:08] Message ordering and exactly-once semantics
   - [03:02:02] DB node failure, replication and lost writes
   - [03:04:54] Sharing a database between workers and API servers
   - [03:06:29] End-to-end encryption and public keys
   - [03:07:44] Channel type in the schema
   - [03:09:51] Six concurrent connections across tabs
   - [03:10:51] One-on-one request and recording *(admin)*
   - [03:11:59] WebTransport, Slack vs WhatsApp data loading
14. [03:14:40] Class close *(admin)*

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.

<!-- BODY START -->

<!-- chunk_01 00:00:02-00:13:26 -->

## [00:00:02] Agenda - non-relational databases, Slack's real-time communication

**[00:00:02] Teacher:** Great week, second day, second. It's all about non-relational databases. So first half, I'll give a brief overview of non-relational databases and not just that, okay, this is where you have to use it. But more importantly, where you should not use that database, because you'll find a ton of things out there. It says, hey, you should always use NoSQL databases, because there are so many folks out there basically telling about how great their non-relational databases are, because they think they are challenging the relational database. That's not true, right? So you'll find a ton of databases out there meant to solve very specific problems. That's the first part. We'll cover a bunch of them. It's, we are just scratching the surface today with respect to non-relational databases, because they lay the foundation for us to build other stuff, where we go deeper into each one of [check: words possibly lost before "week"] week, fifth week, sixth week, right? So, but even while we go through them, I'll talk about those granular nitty gritties that matters the most. So that's the first half.

[00:01:08] Roughly one hour, five minutes, one hour, ten minutes. And then a huge discussion on Slack's real-time communication. And we'll only do text-based communication. Now, when we do this, when we try to design the system, Slack's real-time communication, the best part of this would be that you'd see easily you can switch from one message delivery model to another. So in this same design, you would see how we can design something like a WhatsApp, something like Slack, something like Zoom chat. Straight forward. Like it would be so obvious, right? And which is where now you will start to see how I always say that system design is just about looking at those patterns, looking at those Lego blocks. You have your system up and running. And that's how it is.

[00:02:02] The entire domain of computer science is very similar to how we as humans operate. And we work on patterns. Computer science is very much similar to how humans have operated. Looking at patterns, control-z, control-v [check: "control-z, control-v" as heard], learning from them, iterating. And if you see the von Neumann architecture of the first CPU set, it's exactly how our brain functions. Quite a few similarities across. So which is what we'll do deep dive. So first half, non-relational databases, a scratch on the surface. Second half, a really detailed discussion on Slack's real-time communication, which piggybacks WhatsApp, Instagram, pick your favorite, right? It becomes a piece of cake automatically. Okay, so let's start with that.

## [00:02:47] Non-relational databases

[00:02:47] Non-relational databases, actually, to be honest, there should not be any term as non-relational databases or either NoSQL databases, saying technical and non-technical. It's very offensive to non-technical folks, unfortunately. So which is where instead of saying non-relational databases, we should always refer to the specific type of database that we are talking about, and not just blanket it out for every single thing that is non-MySQL, Postgres, Oracle. So it's always better to be specific because, and especially when you say sentences like, or when we say sentences like, NoSQL databases scale. I can build a non-relational database which does not scale at all. Very much possible. So instead of putting a blanket on everything that is non, not MySQL slash Postgres slash Oracle, and keeping them saying all of them scale, that's wrong. I'll give you a couple of examples where those databases don't scale at all.

[00:03:47] So which is where it's very important to understand different types of databases that are out there, apart from the famous MySQL and Postgres of the world. That's why it's important to know like, hey, this is where we'll use a particular type of database. But given the world functions in a certain way, I cannot impose, you need to know it in the terms the people talk about. That's why I would use NoSQL slash non-relational. But I would highly recommend, basically this is the last time where I would use this, because every single time we would be specifying the exact type of database that we would be using. But given that it's just a general introduction, it's okay. I'll be just using this term in this one. After that, I'll never use it, because I don't like to just blanket it out. Okay.

### [00:04:36] Relational vs non-relational - consistency vs scalability

[00:04:36] So a very general distinction between relational and non-relational, or SQL and non-SQL, or NoSQL databases, is that they are not relationally structured. But it does not mean that no one can do that. People can do it. That's why it's a little messy out there. But a very broad separation is that non-relational databases typically give up consistency to give you scalability. That's a very broad, not always true kind of separation.

[00:05:10] So consistency is when I said, by the way, there are two, English is a funny language. We don't have enough words for every, not English, but rather computer scientists are very bad at naming things. There are two types of consistency. The consistency in CAP theorem is different from consistency in ACID. Consistency in ACID is about data being consistent, strongly consistent, where you don't mess with that and you move from one correct state to another. While there is another consistency which we learn in CAP theorem, that consistency is about your data being shown, being available to query right there in it, that strong consistency we are talking about. So here the consistency that we are talking about is this other one, right? So there are two types of consistency, okay?

[00:05:57] So in very generic sense you would have heard that non-relational data, non-relational databases typically give you option to scale, basically horizontally scale the system and be highly available, because there are multiple nodes now, by compromising on consistency. Relational databases wanted all the data to be there in one shot, in one database instance. So if that goes down, the system is down. The system is not highly available anymore. So now what non-relational databases, like a very general classification, did is it spreads out horizontally. Even if one of the node goes down, you have other nodes to serve the data. So you do not have a complete downtime almost ever, highlight over here. So it gives up consistency, strong consistency of data. It gives up consistency, makes it eventual, not strong consistency, but it makes it eventually consistent system, but it improves on horizontal scalability and availability. So most non-relational databases are eventual, but you would always find exceptions, because there is no standardization.

[00:07:03] A lot of people say non-relational databases like NoSQL DB scales. I agree Cassandra scales, but for a very specific workload, MongoDB scales for a very specific workload, DynamoDB scales for a very specific workload. But this does not mean that relational databases don't scale. It's a very big misconception where people say relational databases don't scale. You just need to know how to use it. Yesterday, we built distributed key-value store, sharding, we like, we gave up on, like, like not generic, non-relational databases give up on consistency to give you horizontal scalability and availability. We did that yesterday. We split our databases where one database hold keys from A to M, second did hold keys from N to Z, right? We have almost a highly available system. We gave up on consistency. So it's a very crude way to say that non-relational database is scaled, relational too. You give up on constraints that is not helping you scale horizontally, and you have a truly horizontally scalable relational database.

[00:08:09] So always keep these things in mind that anytime when you hear a generic statement, even from me, from anyone, don't believe it. Never. Never. It has to be very specific. It has to be contextual. Ask those critical questions. Why are you saying this generic statement? Because you can always, always provide a counter example. Keep that thing in mind, and that's what would make you a better engineer. Always remember, don't just take things on its face value ever. Okay.

### [~00:08:33] Document databases

[~00:08:33] Now the first type of non-relational databases I'll talk about is one which is closest to the relational world. They are called document databases. Now document databases, very famous examples, MongoDB, Elasticsearch. These are examples of document based databases. This is very similar to what we discussed yesterday, where we were talking about, hey, I'm storing my value as a JSON and I want to query within that. That's exactly what document databases give you. So document databases are closest to relational databases. They are mostly JSON based. There is no hard and fast rule, but they are mostly JSON based. They support complex queries. On MongoDB, you can do aggregations on Elasticsearch, you can do faceted query on Elasticsearch.

[00:09:28] Now this is very similar to, not exactly as powerful as relational, but very close to what relational databases would give you, which is where you would always see that whenever people move out of relational and into non-relational [unclear: "verbatim"], you would always see them adopting either one of, or any document DBs in general, right? You would never see them drastically moving from this to a direct key-value store, right? Because it's very restrictive, where you do not peek into the value, then it's of no use unless the use case was exactly like that. What for when they were doing it. So in most cases, a generic relational schema translates, when you are moving to a non-relational world, you would typically move into a document based database, because it gives you the features, almost features, that a relational database was giving you.

[00:10:20] For example, partial updates to documents. This is one of the key features of a document-based database, which means you are allowed to query on the attribute of the document. For example, I have a MongoDB document. I am allowed to query that, hey, give me all the documents having this particular attribute set to this particular value. Same thing you can do with Elasticsearch. You can make partial updates to the document. You can say that, hey, in this document, just update this one attribute. But if it was key-value store, where value is just a blob, you, if you'd want to do an update, you have to read, update and write. Right? So it prevents you from doing those partial updates on it. Document DBs typically give you that. And they are the closest when it comes to relational databases.

[00:11:09] But again, I'm only saying this, there is no rule that a document database cannot give you what key-value gives, or a key-value cannot give you what document gives you. For example, you may have, or you would know that DynamoDB is a key-value store. It's not a document based database, but still allows you to query within the document, right? You can always see that. You can always see that coming. But which is why there is no line that separates document DBs and key-value stores and columnar storages and whatnot. It's very blurry. Every database, like people are working on those databases, they are building those databases, everyone is entering into everyone else's space, right? So lines are very blurry. So which is why understand the access pattern, understand the features, which is why I listed complex queries and basically partial updates, instead of just saying that, hey, these are only document data.

[00:12:08] So what you need to know as an engineer is what features do you want from the database and which database gives you that. Generic statements never work, because it may be true today. When you're down the line, it would be completely false. For example, who would have thought MongoDB could support ACID properties? They started to say, hey, we are BASE. We are not ACID, right? But now MongoDB is ACID compliant. May not be as optimal as SQL world, but they are ACID compliant. Right. So which is why you cannot generically claim something about a database. Always, always, always remember this. Okay.

### [00:12:46] Key-value stores

[00:12:46] Now that we, now that I use that, let's move to the second type of database, key values store. Now key values store are typically more restrictive than document based database, where the query, any that you are making, or reads and writes and deletes and all the operations that you are making, they are always key wise operations, like get a key, put a key, delete a key, insert a key, insert a value in the set represented by a key, something like that. So it's a little more restrictive than document based database. But because everything is key wise, you can very easily shard the database, because you would never have to make cross shard queries.

<!-- chunk_02 00:13:26-00:26:38 -->

**[00:13:26] Teacher:** Cross-shard queries you have to make when you are doing that range operation that, hey, in this range operation or in operator, when you are saying that, hey, give me all the documents where ID in 1, 2 and 3. What if one is on one database, two is on this database, three is the third database. Right. So in that case, you are doing cross-shard queries, which becomes very expensive, but key-value store limits that all it gives you is, hey, this is a key. Give me the value or every operation is a single key based operation. Right. Such cases key-value store you can very heavily partition, very heavily, like thousands and thousands of partitions without having any hiccups, because what you are doing is you are limiting the way people can access them. This way what you get, you get very heavily partitioned. Now imagine the more complex you make these queries, the lesser you can distribute the data, because then cross-shard queries become expensive.

[00:14:22] So that is why you see this on one extreme where it prevents you from doing anything. It literally just says, hey, there is a key. You can do all operations on this key. You cannot do cross partition operations easily. [?Document | asr: "You can do a"] database typically support that, but it becomes really expensive for you to do that, which is why by limiting the access, you get massive parallelism. Yeah, so because now that you have multiple databases, every database can handle queries in parallel without having to wait for other queries to come. So you get very massive partitioning, very massive parallelization. You get best performance output, but you restrict the access.

[00:15:05] This is where you see the beauty of computer science. How every single thing is a trade-off. You get something, you lose something. That you lose something, you get something. Here with key-value store, you lost the power of making complex queries, but you gained massive parallelization, massive availability and whatnot. But you want complex features. So you lose to like, you cannot have thousands and thousands of partitions in document data. So it's always, always, always a trade-off.

## [00:15:38] Column-oriented databases

[00:15:38] The next type of database. Once I cover this, then we'll take questions. The next type of database that I am personally fan of, is column oriented database. Now column oriented databases, they exploit how people queries the system. Column oriented database, typically when we store the data, the way we even draw it is we draw one row together, all the columns of that particular row, all the attributes of the particular row, they sit together. Those are row oriented databases. These are column oriented databases.

[00:16:12] So row oriented databases, for example, a table called stock ticks where I'm putting the stock prices of all the stocks listed. I have symbol, price, name, exchange and timestamp. For every tick I'm making those many entries in my table. Now let's say in row oriented databases what you would see is all the columns of a particular row are, they sit together, which means when I'm writing it on the disk, all the five columns, let's say here, there are five columns. All five columns will be stacked one after another, and this will become one row persisted on the disk as is, which means when you are reading, you are reading the complete row, all this, right? I have [unclear: "select and select"]. I don't provide star. I would read just two columns. Now that's what [unclear: "end user"] your disk IO would actually be able to read. Actually read the entire row, filter the things that you need and serve it to the user. So on the disk side, it is actually reading the entire row because this entire thing is stacked together. So this is row oriented databases.

[00:17:26] The second example, the [?counter example | asr: "counterfeiting example"] for that is column oriented databases. The column oriented databases, what they do is they store the columns of, like, they stack the columns across multiple rows together. For example, if I have three rows over here, one, two, three, then this three will sit together. Then this three will sit together. This three will sit together. So a very crude way, again, I'm very crude, very blunt, very naive way of visualizing this is assume that you have one file for each column, one separate file for each column. It's a very naive way, but it would help you understand. One file for each column where assume that first line contains value of first row in value of first column in first row. So this, then this, then this. So column, the file for column one would have three lines, one for row one, one for row two, one for row three, that column. Then one file for column two which would have these three values, one file for column three which will have these three values.

[00:18:40] Now for you to, now this is another storage layout. The first storage layout that we saw was row oriented databases. Second storage layout we saw was column oriented databases. Naive way, each column is a separate file. Okay, now what do we gain by this? So let's say we want to find the average price of a particular, average price of my entire stock market, average price of my entire stock market for a particular day. So my query would look something like this. Select average of price where timestamp equal to something. Right. From this.

[00:19:21] Now if you look carefully, if I was storing this data in a row oriented databases, for a particular timestamp, there might be, let's say I have 10,000 companies listed for a particular date, I might have 10,000 entries, for example. Now for those 10,000 entries, I would have to go each row for that particular day. All those entries may be together. I have to go through each of the rows, read the rows, pick the columns that I need, average them. So the columns that I need is timestamp and price. These are the two columns I need. So for a particular timestamp, I would go on the disk, read this row, see the five columns, columns, extract the thing or filter out the things that I don't need and keep the things that I need and do the average, whatever I want to do as part of my query evaluation.

[00:20:16] Now here you see, let's say I want to iterate to 10,000 rows. I have to do it. Let's say there are 10,000 companies listed and I have to iterate to 10,000 rows. Now when I'm firing this query, I am unnecessarily reading symbol, name and [?exchange | asr: "action"] because all, all I want to do is average of price for a particular timestamp. So why do I waste my disk IO reading symbol, name and exchange? Because you are not projecting it from the select, but your database engine has to still go through that so that it goes to the next one, then to the next one. It has to skim through those and then it would move to the next one, because unless it knows this is my row boundary, it cannot pick the corresponding columns.

[00:21:03] Which is why queries like this, and this is a classic case of analytics queries, where what you are getting is you don't need all the columns, you need some of them, few of the columns, like there might be thousands of columns and I'm not even exaggerating. Data warehouses have thousands of columns. Out of the thousands of columns, if your use case says is that you are very likely or extremely likely to just query on few of the columns, column oriented databases work well. Why? Because now if I were to fire this query on a column oriented database, what do I get? I just want for a particular timestamp for a particular price. So literally the only two files that I would be reading, price and timestamp. Don't need the symbol, name and exchange column. I'm not even be doing any disk IO for that.

[00:22:04] That is extremely efficient, extremely efficient, because when you are just operating on few columns, you may have hundreds and thousands of columns, but you want to operate on few columns, column oriented databases thrive. They thrive like crazy. This is what makes column oriented databases special for a heavy databases, which is where you would always find them being used for data warehouses, Amazon Redshift, Google BigQuery, all of them. Pick any, if you are in the domain of data engineering, there are tons of file formats. You may have heard of Parquet. All of them leverage column oriented storages, because they make, you have to read the bare minimum to get things done. So these are all based on column oriented databases.

[00:22:57] But you cannot do it on transactional, like your normal. Let's say you cannot build, you can, but you should not build blogging application on column oriented databases. Why? Because you are very likely to read the entire row. For example, if you want to render profile of a user, I do just taking out a few columns. You, first of all, you wrote a thousand columns. Second of all, if you may have 10, 15 columns, you are always reading all of them together, almost always. So you may pick up few every now and then, but in most cases you are doing a select star. So given that, that kind of use case fits more over here and analytics use case fit more over here, because you are very picky in picking columns, two out of thousand or three out of thousand or 10 out of thousand. Right?

[00:23:42] So that's why whenever you see a data warehouse, and obviously what I would recommend is wherever you are working, go find a data warehouse at your company. Every company has a data warehouse, every single, right? Go find which data warehouse your company is. It must be either BigQuery or Redshift. People don't typically build them. Or if you are friends with some data engineer, ask them about Parquet format, right? You would go, you would see how beautifully it optimizes this stuff. And just by altering the way storage, like altering the way you're storing the data, you get massive performance boost without even changing the above layers. That's the beauty of having abstractions at the right place. Okay.

### [00:24:23] C-store paper

[00:24:23] One paper I would strongly, strongly recommend you to read. I cannot even emphasize how much. This was one of the, this was, I can tell you the number, this was the sixth paper I ever read. And I fell in love with this. I was in my master's or something. I was in my master's and it was in the reference reads of one of my courses on databases. C-store, a column-oriented DBMS. Just Google. Like don't build a habit of getting [?spoon-fed | asr: "school fit"]. Just Google. C-store, a column-oriented DBMS. You can find other papers on my website as well that I read and annotate. But read this. Read this to understand how that person actually conceptualized column-oriented databases and got performance that he needed. Right? Watch that, or rather read that paper. It's not that tough to read. Very breezy read. You can wrap it up in four days. If you're just starting out, just read this paper. You will love how deep researchers think. It shaped my, like it made me fall in love with researching.

[00:25:22] So what it helps us understand is how deep someone goes into a problem to find a solution and how deep of an understanding that person has, when like big things are just conveyed in one lines in this paper. Such brilliantly written. Like highly, highly, highly, highly recommended to read this. Right? Okay. Okay.

### [00:25:45] Questions on row vs column-oriented reads

[00:25:45] Up until now. Any questions? We just discussed computing, but just wanted to answer that. I just don't blabber for a very long time. Any questions up until stage? Yeah, Ajay.

> **Student Question [00:26:00] - Student 1:** So when we do like select and we specify column, so does it, does it [?read | asr: "treat"] all the columns?

**[00:26:08] Teacher (answer):** It reads all the columns from the disk. Yeah. From the disk, it reads all the columns, picks out the ones that you need. I just [?sends | asr: "sense"] it to you. So the disk is still gone and reading all the columns in row oriented databases, but in column oriented databases, it does not, because think of it as separate files. Like that's the easiest way to think about. You don't even waste time reading the columns that you don't need.

**[00:26:34] Student 3:** Yeah.

<!-- chunk_03 00:26:38-00:38:20 -->

**[00:26:38] Student 3:** One minor drawback that I see for column-oriented databases is that insertion would be too heavy. Yes.

**[00:26:45] Teacher:** You get some, you lose some. Yeah. Right. But it's okay, given the benefits. So which is why you never see these as a primary databases. These are typically analytics workloads. So [unclear: "that the additional"] databases is different. Synchronous job that ingest data into your data warehouse. So data warehouse is never your primary copy of the data. Correct. The traditional databases are always different. MySQL, PostgreSQL, MongoDB, DynamoDB and what more. From there you move data into a column-oriented database. Right. Just to power the raw analytics.

> **Student Question [00:27:20] - Student 4:** So what is the space comparison between row-oriented databases versus column-oriented databases?

**[00:27:26] Teacher (answer):** Great question. You can so heavily compress this because it's a homogeneous data, right? Because for example, if I'm talking about timestamp over here, now timestamp would be, would not be continuous values, would be almost discrete values. You can very heavily compress them. So you would require much lower space when you're storing data in a [?columnar | asr: "collaborative"] database because of high compression ratios that you would get. But in row-oriented databases, because data is heterogeneous, that much of a benefit. You can still have compression, but not that. But column-oriented databases can be very, very, very heavily compressed, very heavily compressed. And if I tell you a factor, 29x is a normal gain that I'm seeing.

> **Student Question [00:28:12] - Student 4:** Yeah. Can you elaborate on compression? How data can be compressed here?

**[00:28:16] Teacher (answer):** Because this is homogeneous. For example, imagine symbol, symbol, Apple, Google, APP, LG, 00, right? You see these symbols. There are discrete values of it. When it comes to compression, you can just store it in one byte because you are heavily, not one byte, but we say four byte. Just one value represent. Although you are adding G, O, O, G, you can just represent rather Google, Apple and whatnot. You can get very heavy compression because it is homogeneous data, because there is not much variation in that.

[00:28:52] So Huffman compression works well. Snappy compression works really well. LZ compression works really well. Because data is very homogeneous, because it's not that you have string and then somewhere it's an integer and then there's a huge string and something. It's all very similar data. For example, if I was talking about [unclear: "Xgen"], it would be like five or six different values. Just represent it in one byte. And your engine does that for you. You can just pass in the normal string that you are passing, but internally, it can very heavily compress the data. So you get superb gains over it. Read about run length encoding once.

> **Student Question [00:29:30] - Student 4:** Okay. Another question is, I think cloud providers charge NoSQL databases, read write operations based charge, right? So these are many read operations, these many like write operations. So column-oriented databases also same?

**[00:29:45] Teacher (answer):** No, column-oriented databases continuously run. So you have to pre-provision the capacity that you need. It's not like, obviously you're charged IOPS, but not for every operation. It's not on demand pricing. You pay for the servers that you are running.

**[00:30:01] Student 4:** It's a reserved capacity.

**[00:30:03] Teacher:** It's a reserved capacity. Yeah, there you may put it better.

**[00:30:05] Student 4:** Correct. Thank you.

**[00:30:07] Teacher:** Sure. Okay.

## [00:30:09] Graph databases

[00:30:09] Let's move to one of the most misunderstood database out there. Graph databases. Now, graph databases. Now, this is where I want to talk about some really interesting things about. Now, graph databases. Like, if I ask you this. Let's model, like, let's build our Twitter and follow following relationship. You would always think, hey, let me use graph databases to [?store | asr: "start"] follow following relationship. I'll have user node, I'll have relations, because you can visualize it as a graph, which is where you think, hey, graph databases. But they might not be the best choice.

[~00:30:45] So graph databases are a literal graph data structure that we did in college, data structures and algorithms course. Just move that exact same adjacency list representation in so and expose data APIs out of it, and that became graph database. The graph databases, they literally store adjacency list representation that we all [?studied | asr: "started"] as is, nothing special. Those, like, these databases, they are specialized in graph algorithms.

[00:31:21] Now graph algorithms, sophisticated graph algorithms. For example, I'll give you one example. LinkedIn, when you open, you go to a person profile, it shows you how far of a [?connection | asr: "collision"] it is. First, second, third, fourth. That is a sophisticated graph algorithm. Another example is modeling social behaviors and recommendations. I'll talk about recommendations in a bit. So a lot of folks think that whenever I can visualize a use case as a graph, I should use graph database for that. No, that's the worst way to think about it. Why? I'll give you an example. Modeling a follow following relationship on a graph database could be catastrophic. Strong word, but really expensive to do, to be honest.

[00:32:07] Scaling graph databases, very difficult. Difficult, they are extremely memory intensive, they are, because most of them are built on legacy stack, right? Even if you pick a modern language, graph databases still don't find, like, they are not very optimal in any case. So, but what they do really well, so it doesn't mean you should not use graph database, graph databases, because what they offer you is core graph algorithms. Whenever you need them, whenever you need core graph algorithms, go for graph databases. But if you are using this to [unclear: "just don't"] follow following data. That's like using Hulk to open a glass or to open a jar, a glass jar, right? Because it gives you so much more, but you are just using to store this minuscule, teeny tiny, not so, like, not so humongous data there. Like follow following is nothing. That's a very trivial use case for a graph database.

[00:32:56] But what they give you, where you should be using graph database, is use cases like recommendations. Like basic collaborative filtering is one of the application where you see graph databases thrive. Like recommendations are the most common way, and by the way, I have a video on it on my YouTube, but I still cover it. I have a video on it, a detailed video on it, you may find it on my YouTube anyway, but I'll give you much more than what I covered there. So I'll give an example of recommendation where this comes in very handy.

[~00:33:20] Now, for example, a very popular algorithm called [?collaborative filtering | asr: "collaborative field"], a very popular approach of suggesting of, or driving recommendation, this collaborative filtering. Now, what it says is, let's say you purchased something on Amazon and you and I are similar users. Amazon should recommend what you purchased to me. Modeling this becomes a piece of cake in graph, because when you purchase something, so first of all, what Amazon or e-commerce would do is it would first create cohorts of users. Buy similar stuff, so they are similar people, right? Now how do you find this out? How do you find this, that these are similar people? So simple. You have a product node, let's say iPhone. I don't own iPhone, but let's say hypothetically iPhone, and everyone who bought iPhone are similar set of people, right? Now if one of them purchases AirPods, Amazon can recommend AirPods to everyone else in the cohort.

[00:34:32] That's how companies build cohorts of users through this graph. And this is a classic graph use case. It becomes really difficult to model. I'm just giving example of one level. It happens at two or three level deep. But I'm just giving you a simple example to imagine. And that's exactly what collaborative filtering is. Most machine learning teams and organizations do this exact same thing. So now that you have cohorts of users. And when someone purchased something outside, like someone in the cohort purchased something, it's easy for Amazon to recommend it to someone else. And this is a classic case where recommendations are driven through graph databases because you need these capabilities. You need these capabilities to do it.

### [00:35:17] Fraud detection with graph databases

[00:35:17] Another use case, which is far more important, far more interesting: fraud detection, best use case for graph databases. Now here you see the true power of it. So one and a half year back, I was purchasing subscription of Grammarly. I thought, hey, I'm bad at English. I'm bad at writing stuff. Let me purchase Grammarly. So I made a purchase, put my credit card details and triggered to OTP. I immediately got a call from HDFC Bank. They said, hey, are you trying to make this transaction? I said, yeah, I'm trying to make this transaction. So then that person allowed that particular transaction and I was able to proceed with the payment.

[00:35:59] Now [unclear: "what is taught"]? And I'm not just making this up. I'll give you the actual source where I got this. But when that call ended, I was just thinking that how quickly did they retrieve this information and they help it. Now how do they power this? They power this through graph databases. How? Simple example. Arpit has been making all the transactions in domestic space. Is international. It's an odd one out. It's not in this closely knit circle. It's a sore thumb. It strikes. So it is very evident that it's a new edge that is being created that is suspicious. This is how they determine very quickly using graph database that is this a new edge that is being formed outside the cluster that you have, outside the network that you have.

[00:36:54] What financial companies do every single day: whatever transactions you are making, they are being categorized by sellers. There are like 50 or 60 parameters that I know of: country, region, type of products you purchase, type of things you interact with, and so much more. They ingest it in a graph. Every person almost has its own independent graph ready. In that graph, whenever a new edge is happening outside the graph, there is a degree of suspicion that they compute, and they predict, and they say, okay, this is a suspicious transaction. And all of this is, has to be done in 200 milliseconds. That's it. They have 200 millisecond SLA.

[~00:37:31] Now I tell you why, how I'm so sure about this number. I had one person, VP engineering, an actual VP, not, not that software developer VP engineer, actual VP engineering of JP Morgan Chase, took this cohort, fifth cohort, and he explained this use case. 200 milliseconds is what they have to do this graph detection and tell us. Because in 200 milliseconds, they have to make this decision and they have to redirect it to the customer executive. That call goes to you, and you and that customer executives are connected, because then they have to ask if you are the one who are making the transaction, approve that, and then you are allowed to basically do that transaction. All of this entire system is just powered through graph analysis. This is the actual real use case.

<!-- chunk_04 00:38:20-00:50:04 -->

**[00:38:20] Teacher:** Interesting time talking about it. And because it contains sensitive details, I cannot share that. But this is where you see the power of graph databases. You see where you need powerful graph algorithms. You use graph databases. You just don't use it for [unclear: "fall of all languages"]. That's a very trivial use case. Very trivial. Right. So in a gist, if you can visualize a graph that, hey, this should be a graph use case, most more often than not, that is not where you should be using graph databases. So [unclear: "shelving"], follow following, that's a very trivial [?use case | asr: "discuss"]. But where you need the actual raw crude graph algorithm, you use graph databases. Okay.

[00:39:02] Few examples, Neo4j, one of the best, like one of the first, not the best, one of the first that came out. Like always, AWS copies everything. AWS has their own managed offering from graph database called Neptune. Then Dgraph. Written in Go, works very well at [unclear: "bit scale"]. High scale it falters a bit. I use Dgraph very extensively. But it's a good database. Written in Go and that was one of the first projects I went through to understand Go. Very brilliant. And they have an embedded database called BadgerDB. Also fascinating. And a proprietary database called TigerGraph. A lot of companies, a lot of financial companies actually use TigerGraph. They don't rely on open source stuff. They use TigerGraph to power their graph databases.

[00:39:47] Right. Okay. Now, these are all basics that I wanted to cover about non-relational data. And we will use each one of them in the coming weeks. We'll use them. We'll see how they are. But this is just an introduction so that everyone is on the same page.

## [00:40:01] Why non-relational databases scale

[00:40:01] Now, let's go and ask more fundamental questions. Like why do people say that non-relational databases scale? They scale non-relational data. *(admin)* Sunil, I will tell you, I am lowering your hand because of a reason. Okay.

[00:40:18] Why non-relational databases scale? They scale because there are no relations. Now, what relational databases are good at is because of that relation, that foreign key constraints that you talk about, is because it ensures the correctness of the data. Because for example, if you have a foreign key relationship to a table where key is non-null, you are not allowed to insert the row where that other row is not present. So it needs the existence of that other row for you to be allowed to insert this row. Similarly goes for deletion. But unless you delete all the child entries, parent entries cannot be deleted.

[00:40:57] Now what relational databases they try to solve for is that they try to ensure the correctness of the system, the strong consistency of the data that a system moves from one consistent state to another consistent state. And it ensures that by enforcing relations and constraints on the data, non-relational databases gives up on that. I don't care what you insert. I don't care if that key exists or not. Just insert the data that you want.

[00:41:25] Now, why relational databases made that choice? They did it because the first set of use case that they were built on was financial use case where correctness of the data was more important than just performing at scale. Understand. Everyone has a backstory. This is the backstory of relational databases and why they made a certain decision. Now, this does not make them bad as compared to non-relational database. So everyone has a backstory that you should be aware of.

[00:41:54] So because relational databases are meant to be used for financial things, they went for correctness, more like went for consistency and consistency, data consistency and strong consistency over high ingestion rate, which is why you would find them do it. Now, because of this, if this is the restricting factor where you need all the data to be in one place and whatnot, non-relational databases that typically don't give you these features. So if you'd want to scale this, just don't use foreign key. Simple. If you don't have constraints, if you don't apply foreign key, you can partition the data exactly how a normal non-relational database would do.

[00:42:38] Exactly. So if you choose not to have foreign keys, you can literally partition a relational database exactly how non-relational databases are there because they never give you those features. You get this. So which is why I always say that if a certain databases claim that they are being great at a certain thing, understand why they are being great at certain things, what kind of things that they give up in order to get that. Try to do it in the familiar with it may not be just SQL database, even non-SQL database. So never just be stuck with a particular technology. No, I only use this database over there because every other database sucks. No, be flexible. Every database is unique in its own flavor. Try to learn that. Try to see the beauty that goes beneath the initial layers of fancy UI and whatnot. Bit deeper and see why are they able to get this performance. See if you can mimic that same thing on your database, you'll become better at it. Okay.

### [00:43:48] When to use SQL vs NoSQL

[00:43:48] Now the biggest question of all time, [unclear: "when do you see a comment"]? It's not simple. Answer is very simple. The strength of SQL data correctness slash consistency, strong consistency, right? Which when you need that, don't look beyond, don't look beyond anything. Of the data is the most important part of your application or it's the most important feature of your application, you need ACID. If you need ACID, go for SQL, [unclear: "as if what is that"], because it gives you those necessary [?toolings | asr: "two links"] that ensure that your data never goes in an inconsistent state or an incorrect state. Obviously you have to use those [?toolings | asr: "two links"], it does not automatically gives you, right? So having those foreign key checks, check constraints and whatnot, you have to apply them because it gives you those [?toolings | asr: "two links"] to ensure the correctness of your system, right? Which is where you would use SQL.

[00:44:46] Now, when to use NoSQL? A very simple way to look at it is when you have gigantic data, gigantic data. So typically big data, not data engineering, big data [?use case | asr: "discuss"], but you have to ingest large amount of data. For example, messages, huge amount of influx of messages over Instagram, huge amount of post being written, huge amount of not really tweets, but logs, logs being dumped. All of those use cases are non-relational use cases because what you are optimizing for not the correctness. It's okay. If one of the data is here or there, one attribute is missing. Some data is here or there lost like metrics ingestion, logs ingestion, message ingestion, [unclear: "water"], when you're ingesting at a very fast pace is what your non-relational are created, like for example Cassandra, because it gives you sharding and whatnot out of the box and it drops those constraints. It is very light on the database. It gives you heavily partitioned slash sharded databases. That's what makes a good use case for all for NoSQL database, which is where typically you see messaging system, live interaction, [?pollings | asr: "pullings"] and whatnot, they typically store data in non-relational databases because the kind of toolings non-relational databases give you, like sharding, partitioning, they don't provide you constraints. They give you out of the box. If you are using SQL, you would have to build them on your own. No one has that type, right? So you go for non-SQL.

[00:46:14] So a general, very general high level thing that I may put it is when correctness is important, where you need those [?toolings | asr: "two links"] out of the box to ensure the correctness and consistency of data, go for SQL. And for high ingestion rate, for sharded out of the box, you need sharding, you need very high ingestion and whatnot. You go for NoSQL database. This is a very broad sense in which I'm putting it out. But over this course, you would see that whenever we are deciding something, you would see that we are taking into consideration all of these factors before we pick a particular database. And not just some mumbo jumbo, I will use NoSQL everywhere. No, don't be rigid on a particular database. Right. Okay. Any questions on this part? The first part. Yeah.

### [00:47:11] Questions on graph databases

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

<!-- chunk_05 00:50:04-01:03:30 -->

### [00:50:04] Questions - SQL vs non-SQL, ACID in MongoDB, KV stores

> **Student Question [00:50:04] - Student 6:** Yeah, one more question relating to the SQL versus non-SQL databases, like these days MongoDB also offers ACID properties.

**[00:50:13] Student 6:** Not performed. [check: possibly the Teacher answering ("not performant"?) - diarization] Okay.

**[00:50:16] Teacher (answer):** It's a distributed transaction. Slows down. In their official documentation, it says that please use ACID sparingly. It says that in their official documentation because cross-shard ACID compliance is costly. It is implemented using a distributed transaction. Distributed transaction slows down the throughput. Within shard ACID, anyone can guarantee. ACID MongoDB guarantees, but it says that you're losing out on throughput. It's there in the official documentation. In the ACID part of it, you'll find it a line that says, please use it sparing or something on similar lines. And it says that it does it using distributed transaction. Because of it, you should not use it more often. If you need something like this, you should use it. And I've also found it in the WiredTiger's documentation as well. Same thing.

[00:51:06] Right. So, yeah. So people claim ACID, cross-shard ACID is only done through distributed transaction, which slows down the throughput. And you typically should not do it when you need high throughput. Sampar? [check: name]

> **Student Question [00:51:20] - Student 2:** Uh, yeah, so yesterday we we we tried to design the KV store on relational databases, right, and now we can also see that we can use non-relational databases for KV stores, because KV stores don't usually have the relations. So the only, is this the deciding factor for a KV store being in a SQL database and non-SQL database?

**[00:51:49] Teacher (answer):** No, no, no. KV store are databases of themselves. Like they are in their own league. We just mimic an access pattern. Right. So DynamoDB is a key-value store. Redis is a key-value store. Right. They have the different storage engines to implement it. Redis does it in memory. DynamoDB does it on disk. Right. So what changes is the underlying storage layer. Right. KV is just an access pattern. It does not define the underlying store. Correct. Okay.

> **Student Question [00:52:14] - Student 2:** So if I have a KV access pattern use case, so how do I decide whether I should choose a relational and non-relational? Is it just the correctness part? Correct. What else? Okay.

**[00:52:30] Teacher (answer):** Otherwise you can go for a specialized KV store as well, like [?DynamoDB | asr: "Daryl Abu Devi"] or Redis. If you need something like that, that's why I understand the features that you need from it, because you may not always need to build a KV store from scratch, because KV is just an access pattern.

> **Student Question [00:52:44] - Student 2:** Okay. Okay. So in, in that way, if I, if I implement KV store in our relational database and instead use, uh, DynamoDB or Redis. So in terms of scaling factor, all, all of them will perform same. Is it?

**[00:53:04] Teacher (answer):** No, it depends on how you, what you're storing, how we are storing, how you are accessing, what's the throughput, how we are partitioning, how we are sharding the data, a ton of factors. You just cannot use something as a black box. It is very dependent on what, for example, if you store it to store massive [?blob | asr: "block"] values, each of let's say four MB size, then relational databases would cry their heart out. But DynamoDB would work better. If you're storing a small amount of data, you would see like, so the performance characteristics varies depending on what you're storing and how you're querying the data.

**[00:53:39] Student 4:** Okay.

## [00:53:41] Break *(admin)*

**[00:53:41] Teacher:** We are using something, how we are using something. Okay. All right. Thank you. *(admin)* Yeah, folks, we'll take a break for five minutes today, early break, because we have a very long discussion coming up. So first, I've done, uh, we just scratched the surface of non-relational databases, but throughout this course we use every single one of them at different places. One of them we'll use right here, right in this one. So when we come back, five minutes break, we'll see back at 10. When we come back, uh, we'll discuss Slack's real-time communication, a ton of brainstorming. We'll ask how, how, how, why, why, why at every single step before we make any decision. So we'll do that in order to solidify our understanding. So see you folks at 10 after 5. Thanks folks.

[break ~00:54:25-00:59:43]

## [01:00:04] Slack's real-time communication - schema

**[01:00:04] Teacher:** Let's start with the second half. Now what we'll do is we'll design Slack real-time communication. So one thing that I kind of hate is how when people put out, they say design Slack, entire Slack you will design, right? So what we'll do is instead we'll focus on this just one part of it and do it really well. So Slack real-time communication, bracket, all text, that's it, nothing more, only text-based real-time communication, which means messages that you see here and there, [unclear: "holds ruba"] Teams, Teams, Insta, Facebook, whatever, right? But we'll keep it simple, we'll understand the foundational building blocks, we'll understand the small nitty gritties of it, how we're making design decision. Okay, the requirements for this. This is pretty simple.

[01:00:56] We have multiple users, multiple channels. Let's assume that we are only talking about one organization on Slack on which you have there are multiple employees, multiple channels part of it. User can direct message another user or can put a message in a channel. The chat needs to be real time and historical messages can be scrolled. So for example, if a user posted a message on a channel, you can just scroll through the channel and go to historical messages. These are the things that we have to like, we need to adhere to or we need to build. Right.

[01:01:31] This same thing can be used to build ton of stuff, multiplayer games, real time chat, interactions, real time polls, creative tools and whatnot. Right. You can use the same architecture to build a bunch of stuff, but the key highlight of this would be how we are making certain decisions instead of just like, you know, we'll have this boxes. We'll go into those implementation nitty gritties of it and build better systems out there. Okay. We'll kick off our brainstorming and we'll cover all these parts, channels, messages, checkpoints, and real-time communication. Through this, we'll talk about scaling WebSockets and all. Directly jumping to WebSockets is not a good idea. We'll cover a bunch of stuff, then we come to WebSockets and then we scale it.

### [01:02:11] Brainstorming the schema

[01:02:11] Okay, so let's start with brainstorming. Let's start with simple stuff. Schemas. That's the easiest thing to start with, right? So how would you go about designing basic schema for only these features, not other random stuff. Only these features, multiple users, channels, user can DM messages, chat and stuff. What would be a schema? And this does not mean we are using relational database, FYI. It's just a schema. It's just that these are the entities, these are the attributes of it. This does not mean we are using relational database. It depends on the kind of guarantees we want to put and then we pick the database. Okay. Let's start with this. How would you store the data? What would be the basic schema of this? Raise your hands. I'll pull you in. Yeah, Pankaj.

**[01:03:04] Student 1 (Pankaj):** Yeah. So what I'm thinking right now is there would be one table for users. So user with their ID, name, and if they have like some nickname, which they can have.

**[01:03:18] Teacher:** That's okay. What else?

**[01:03:20] Student 1 (Pankaj):** And then there would be a channels table, uh, would have like a main organization ID and the channel ID.

<!-- chunk_06 01:03:30-01:14:09 -->

**[01:03:30] Student 1 (Pankaj):** Then there would be like a messages table, which will have like, which like two user, like basically the channel ID in which the user sent the message and.

**[01:03:43] Student?:** Okay.

**[01:03:44] Teacher:** Before that, before that, before that, how do you know which user are part of which channel? You need to store it somewhere, right?

**[01:03:52] Student 1:** Yeah. So there would be like, what we can call it, membership table or something like that, which will store which user is part of which channel.

**[01:04:03] Teacher:** How did you come up with this name? Membership? Looking over here?

**[01:04:10] Student 1:** No, I didn't see that.

### [01:04:12] Naming entities as nouns - membership vs user channel

**[01:04:12] Teacher:** That's good. That's good. Right? If you did not, but you still came up with this word, that's brilliant. Why I say this? This, they say that, hey, that table would be in a user's channel table. A lot of people would name it like this. And I'm a little against this. Why? Because this is the easy way to name stuff, user channel. But what is user channel? If, if, if tomorrow you are storing mapping of three things, will you use [?user | asr: "our"] channel message table? No. Right.

[01:04:39] So which is where, what I believe a good schema, whenever you're designing a good schema, everything has to be an entity, has to be a noun. So try to name wherever possible, try to name things as nouns, because it would help you give them a different persona. So I'll give you an example. So that's where membership is a great name, which stores the membership information, which means that, for example, this user is part of this channel. So this becomes a membership [?table | asr: "team"]. A lot of people would have named it user channel, but don't do it.

[01:05:19] As membership, because now it gives you this natural way of looking at it, where you can extend membership if you want to, you can add more columns. As soon as you name a table or name an entity as user channel, you cannot think of adding another [?attribute | asr: "article"], but as soon as you give it a noun, let's say membership, it becomes very natural to add new columns to that, right? Okay, so you added that. And in messages, what would you store? So the user [check: diarization seam - the student's answer may start here]

**[01:05:49] Student 1:** sent the message and like the message text, which was it. And yeah. So what I'm thinking right now is like message can be direct to user also, and it could be in channel also. So channel ID will be there, but it might be present. It might not be present.

**[01:06:13] Teacher:** So here you'll have channel ID also and the receiver ID also.

**[01:06:17] Student 1:** Yeah. Receiving user ID also. Yes.

### [01:06:23] Direct messages vs channel messages

**[01:06:23] Teacher:** Okay. So if you do this, what is the disadvantage of having this? Because either one can be null.

**[01:06:30] Student 1:** Yeah. I mean, one of them would be null always.

**[01:06:34] Teacher:** But then, so what is the disadvantage of doing this? Is this the best way to model things? Think on those lines.

**[01:06:51] Student 1:** Maybe we can have like two separate tables for channel messages and one for direct messages.

**[01:06:57] Teacher:** But then your migrations would be difficult. Let's say you want to add a new attribute to messages. You have to add it on this table also, on this table also. That's a challenge. You should not do that.

[01:07:17] Because, and also the problem with this is, if you are allowing either one to be null, which means you are also allowing to enter, your allowing to insert a row where both the columns can be null due to some glitch. So which means that would become an orphan row problem.

**[01:07:35] Student 1:** Yeah, I also thought of, you know, having a receiver ID as a array of all the receiver users, but then if we like add users to the channel, then it will become a problem again to add those users

**[01:07:50] Teacher:** again to this ID. [check: diarization seam - "again to this ID" may be Student 1's] So there has to be a better way. Okay, let me pull in round draw will go on [check: garbled, possibly a student's name being called]

**[01:08:10] Student 1:** So basically, what we can do is we can have from, to, and message basically, from, from will be the, like, from will be the user ID. And to will be, to can be anything, channel ID or user ID [unclear: "books"], but then how would you know if it's a channel or a user? So basically, like, for channel ID we can have something like, like CH and then, CH and then ID, and for user we can have you, usr dash, but then

**[01:08:46] Teacher:** Then how would you query? Because now for you to fire a query and get the detailed information about it, you need to do string processing and see if it is this or not. Then you join it with channel, otherwise you join it with user. That's a poor implementation. You cannot write efficient queries with [?this | asr: "us"].

[01:09:05] DP [check: name], what would you do? Oh, you just.

**[01:09:10] Student 3:** I was thinking that in addition to along the lines, what Rahul was saying, so we can have another column, which is more like type, right? Like the receiver type. Maybe I can have an enumerator there saying channel or user.

**[01:09:30] Teacher:** So these are all variation of that same thing, either you apply channel ID, user ID, or that, or

**[01:09:37] Student 3:** in the sense that, I was thinking that, yeah, I mean, it's a variation, but at least it can be a little more better filtering compared to like if I start processing. But now what would happen is now you [check: diarization seam - "but now what would happen is now you" may be the Teacher's]

**[01:09:49] Teacher:** cannot have a foreign key check on to, which says that it's a foreign relationship to channel, right? Because now it can also point to user. Yeah, that's another problem. Yeah, so there has to be a better way. And now what this would also lead to is, in our business logic we have to have so many ifs and else's, that if this then this, is that and that. So your business logic becomes complicated. So there has to be a better... I'll pull one more. If this, if Alex doesn't, if Alexa doesn't answer [check: name]

**[01:10:15] Student 2:** then I'll say Alexa, go on. [check: diarization seam - "then I'll say Alexa, go on" is likely the Teacher's] No, no, so I don't have a complete answer, but I'm thinking that this messages that from where it is coming to where it is going. So this looks like some kind of controlling information. And I'm not sure if it should be in DB or shouldn't be managing the code. So I am actually thinking on this, on these lines.

**[01:10:42] Teacher:** No, but then what attribute would you have over here? Let's say call it to, from this user to this. Now to can be channel or a user.

**[01:10:54] Student 2:** I was thinking more that the message doesn't know anything about where it is going into, it is going.

**[01:11:00] Teacher:** How will you render all the channels or all the messages of a channel, if you don't store to information over here, right? Because you still want to render all the messages of a channel.

**[01:11:13] Student 2:** Okay. So then that means that, yeah. Okay. I was, I'm not sure.

**[01:11:18] Teacher:** Right. Let me pull it. [?Unmute | asr: "Unmult"].

**[01:11:21] Teacher?:** What would you do?

**[01:11:23] Student 2:** I would just add a channel ID actually. I mean, suppose if two users are communicating, they can have a common channel, even though they just DM. Yeah, but we can keep that as a topic name. I mean, something like that of a publisher subscriber model where you just started [check: Student 2 label here may be a different student from 01:10:15]

**[01:11:43] Teacher:** So good, and then you just added publisher subscriber, unnecessary complication. Focus, focus on the first part, focus on the first part. Yeah. So you are suggesting two users, [?direct | asr: "tarik"] messages also channel. Yeah.

**[01:11:56] Student 2:** So the advantage that we'll be having is, when we have messages, I mean, whichever user has sent it, apart from that, the other users were present in the channel. We'll get those messages.

### [01:12:12] DMs as channels with two people

**[01:12:12] Teacher:** I mean, hmm. Something like this. Right, so this is a good way to design this database schema. Why? Because now what you are doing is you are just piggybacking on existing stuff. So, and by the way, this is not made up, this is there on Slack's API. If you ever use Slack API and you want to DM a particular user, you first have to create a channel with that user, and then on that channel you write that. So it is a direct message on the UI, rendered as direct message, but behind the scene, it is a channel.

[01:12:54] So what you do as part of a step, what you first do, because at the end it's just a message. There is a sender and a receiver. Receiver, the rendering part is different on the UI side, but the way you are storing it, always see if you can have a generalized way of storing things, not specific cases. If this then go here, if that then go here. Ifs and elses are the worst when it comes to databases.

[01:13:20] So the way we model this is, your DMs are channeled with two people, and you can add a type over here in channel, which says if it is a group or a user or a channel, something like this, right?

[01:13:36] You can have a regular channel, something like this, right? You may have type with this, because now what you can have seamlessly is this channel ID pointing to here, right? So direct message still not a problem, because now with this type you can render it on the top half or on the bottom half, because direct messages are on the bottom half. Channels are on the top half. You can very easily render it. Using the channel you can iterate through historical messages because you have all of them. You would have a timestamp field on when it was created, message created at or something.

<!-- chunk_07 01:14:09-01:27:03 -->

**[01:14:09] Teacher:** Created at and whatnot. You can iterate through this and go historical messages. Store membership information over here. Channel information over here [unclear: "is an information"] over there.

### [01:14:19] Membership - checkpoint

[01:14:19] And now the beauty of this design. Why I named it membership because it's a noun. It doesn't restrict us. Like if you hear the term user channel for this, I'm talking about this. If you think of user channel, you may think I would only just store a mapping of user and the channel. But now when you hear membership, now what you can do is you can actually store the checkpoint over here. What is this checkpoint? For example, a user is part of a channel. Now this checkpoint can store that I can, I have read messages till this point on the UI. You see the unread message count. You see you last read until here. And then like when you click on a channel, if there are a hundred messages, it takes you to that point. Right. That's a checkpoint that you last you read was still this point.

[01:15:16] With this, what you can do is you can implement checkpoint because you named it membership. It automatically wires your brain. It automatically triggers your brain to think that I can add more attributes to that. Now, what here you can do is in this user channel information, you can actually store that this user on this channel has read till this point, is active for this time and whatnot. You can add a ton of attributes over here, how a user is behaving or is interacting with the channel. Now this channel can be a channel or a user or a DM or anything, but this gives you a scope of extension. Checkpoint is just one placeholder that I kept it that I read till this timestamp. I need all the messages are now I can start reading from that. It shows you in a very nice way. So that is a checkpoint at last timestamp on this channel. I read till this part, right? Something on those lines. And whenever you open a channel, the checkpoint moves to the bottom of it. So the last message read might be there. So you can store timestamp, you can store message ID, anything over here depends on your implementation. Right.

[01:16:21] Which granularity you would want to, you either want to operate on the time level granularity that I read till this time, or you want to operate on message level granularity that I operate, I read till this message. So this checkpoint could be in it. But now with this membership as a noun, you can naturally see it extending into how a relationship of a user is with the channel. How active. Now, if let's say user muted a channel, add it over here. User favorited a channel, add it over here. No need to have another table to store favorites. That's the beauty of this design that you are keeping it really simple and giving entities like the entity of the table name. You are giving them identities, membership. Now it helps you go on those.

[01:17:09] Interaction that a user has with the channel, you can put it over here: checkpoint, favorites, read till, whatnot, like muted, these type of notification, that type of notification, what not. You can do all of that over here. That's why this table becomes that key thing in the system, right? Okay, done. Now this is done. Now let's go into high level part. Now this was like some key points that I wanted to throw out that you should always keep in mind. One key takeaways, noun-based stuff. How you are piggybacking and not having ifs and else's. Two big key takeaways from this.

## [01:17:47] High-level design - database for messages

[01:17:47] Okay, now let's go into the high-level design of it. Now, how would Slack's real-time communication actually work? Now, obviously, let me make things simple for you. Let's say, hypothetically, we are storing the data, the messages in a relational database which is sharded. You can also store it in non-relational. You don't typically need to store it in non-relational over here because the frequency of messages is not very high. A simple sharded relational database would work. You can also choose to store it on a non-relational database like MongoDB or Cassandra. No one's stopping that from you because all you need is a way to store all the messages that are getting ingested, scroll through them, nothing more, nothing less. Even relational database would do a very good job over here, obviously given that it is partitioned and sharded. Non-relational database like Cassandra would also do. Cassandra like databases, where it is very ingestion heavy, you can use it to build very high ingestion system, for example real-time chat messages like WhatsApp or Instagram or Tinder or whatnot. Those kind of use cases suit very well for non-relational databases at scale.

[01:19:03] An enterprise application, for enterprise application the use case would be a little different because there is no huge amount of messages being exchanged. Once a while you don't chit chat, like people chit chat, but not everyone chit chats, sends hundreds and thousands of messages to everyone, because they are there to work. That's why picking a database depends on the product and the requirement, not your affinity to a particular stack. So which is where it's not customary for you to pick a non-relational database, but you would definitely need sharding and partitioning over here. So we can go for a simple MySQL or we can go for, as well as we can go for Cassandra, we can go for Mongo, we can go for any database. There is no hard and fast rule over here at all, because the scale is not huge. You can add more partitions, put a bunch of enterprise customers on a particular database and whatnot. You can get it done on a relational [?DB | asr: "degree"]. You don't need fancy NoSQL database to hold all of them. That's the beauty of this.

[01:20:04] So whenever you are picking something, understand where you are picking it from. What's the use case that you are solving? There is no big reason for you to pick Cassandra over here. But if you are building Instagram Messenger, I would have gone for Cassandra. Because there everyone is chit-chatting. All the data, all the users is present in this one database. Enterprise customers have different requirements. Normal users have different requirements. So I would have gone for high ingestion rate database. That's why Cassandra for Instagram use case. But for enterprise application, where this is not a real-time chit chat, you can do chit chat, but it's not, everyone is not doing chit chat. It's very formal messaging that is happening there. So even MySQL would work. I can still choose Cassandra, but even MySQL would work. So long as I'm partitioning and sharding, right? So there is no hard and fast rule over here. What you want, all good. Right? Okay.

[01:20:58] So we pick a database to store this. Now, in any case, you pick MongoDB, MySQL, Cassandra, any, the overall schema would look something very similar to this. Like, no major [unclear: "devils"] there. Right? Okay. Now, what next? We have users that are there in the system.

### [01:21:17] Sending a message - API server vs WebSocket

[01:21:17] Now, comes a really interesting point. Imagine Slack. Right? Only, so when a user sends a message, how should that message be persisted in this database? So raise your hands, I'll pull you in. Meanwhile I'll just draw a couple of stuff that we need. Okay. Now I have drawn just one API servers. These are API servers over here. Now, how would the message sent by a particular user be for a particular channel go and be stored in the database? What would you do? Yeah.

**[01:22:15] Student 1:** So what I'm currently thinking Arpit is like, first of all, there would be like some socket connection between the users and the API server. So that like we have a WebSocket connection and,

**[~01:22:24] Teacher:** Why do you need a socket connection? Why do you need a WebSocket connection?

**[01:22:32] Student 1:** So basically a point is like when a user sends a message, somebody would be replying to it and it would be like happening very on instant basis. So we need to like communicate from server to client also. Like we need to tell server to like inform all the clients of that channel that we have received a message.

**[01:22:53] Teacher:** But this does not mean that sending also needs to be done on [?WebSocket | asr: "best topic"]. Does it? Receiving? Okay. So that people don't have to refresh. Right. But sending.

**[01:23:06] Student 1:** So when we are sending the notification from server to, like we'll send the notification from server to client, right? That you have received a message.

**[01:23:15] Teacher:** That is WebSocket. But sending a message. You said sending a message will happen over WebSocket. Why? Why should it happen over WebSocket?

**[01:23:22] Student 1:** Okay. So like I thought of because we need server to client also. So anyways, I'll be using WebSocket. So I can use it for sending also.

**[01:23:32] Teacher:** Why there has to be a [unclear: "proper ISD"], right? Just because you have it does not mean you have to use it. Think about the guarantees that you get or things that you lose when you use WebSockets. So let's say I have a bunch of WebSockets server. I agree that user would have connections with normal API servers also. And WebSockets servers also. Right now, when you are sending a message, you can send it via API also, you can send it via WebSocket also. Now, why did you pick to send it over WebSocket?

[01:24:10] Just because you have it, was that the only reason behind it? Or do you get any other benefits?

**[01:24:18] Student 1:** So initially, like my thought process was just this only that since I am anyways using WebSocket, I can leverage it to send the messages also.

**[01:24:26] Teacher:** Okay. Okay. Let me pull in Sunil. Sunil, what would you have done? API or a special WebSocket server to send message? Special WebSocket. [check: diarization seam - "special web socket" at the end may be Sunil answering]

**[01:24:37] Student 4 (Sunil):** So the reason is overhead for each message.

**[01:24:42] Teacher:** Okay. Are you just trying to save overhead for each message, but why are you

**[01:24:45] Student 4 (Sunil):** [check: diarization seam - "trying to save that overhead?" continues the teacher's question] trying to save that overhead? So compared to like no REST API communication, the overhead it requires to send to like, no backend it is low.

**[01:24:57] Teacher:** And again, why the entire world is not using WebSocket for every... Why does the REST even exist?

**[01:25:03] Student 4 (Sunil):** This use case is frequent communication, right? Because users like to server, very frequently.

**[01:25:13] Teacher:** You're saying frequent, is Slack really as frequent as your Instagram Messenger? Think about it. How many messages do you receive on Slack slash Teams? Not many. Do you really need to save that? But what is more critical for enterprise? Think on those lines. Is persistence of message more important? Right. What is like, it's an enterprise user, right? Slack's user base is an enterprise. Like basically Slack customer is an enterprise customer. What is more important for them? Right. That is one way to think about it. Second way to think about it. Do you really need everything to be done in an instant? Then the [unclear: "normally pass of us"] would not have even existed because everything has an overhead. Let me just use WebSocket for everything. Right. But that's not happening. So there has to be a better reasoning for you to pick either these or this.

[01:26:08] Now, again, I'm just stretching it out. Just think on Slack's line, that what kind of behavior. Now, enough that we talked about this part. Now, recall when you send a message on Slack, what happens? What happens when you send a message on Slack? What kind of behavior you see on Slack or Teams or any such tool?

**[01:26:32] Student 4 (Sunil):** So the expectation is it should be shown immediately to other users.

**[01:26:37] Teacher:** Not expectation. What do you see as a user? You don't see message immediately getting posted. Think about it. Try to recall. Or if you have a Slack open, just send yourself a Slack message and see what happens. Let me pull in Summit, Summit [check: name spelling]. What would you do?

<!-- chunk_08 01:27:03-01:39:48 -->

**[01:27:03] Student 1:** So I would choose a WebSocket. Definitely. Definitely.

**[01:27:08] Teacher:** Definitely. It's a strong word. Okay.

**[01:27:13] Student 1:** I'll tell you why. So see, if I have to send message back and forth. So if I'm using API, then I would have to. It's Slack.

**[01:27:23] Teacher:** Slack back and forth. It's only sending that we're talking about. I'm not even going into receiving part of it. Receiving has to be done over WebSocket. I'm not denying that at all. I'm talking about sending part. Sending the message. I'm not even talking about receiving.

**[01:27:38] Student 1:** Sending also, in case of sending message. If we establish a REST call, let's say. If we establish a REST call, then we would have to need to establish a handshake and everything. We have to establish a TCP.

**[01:27:54] Teacher:** Then the entire world should use just WebSockets for everything. Right. Why are we not building everything on WebSocket? Why do we even have normal API servers? Why are you spinning up Spring Boot instances? Just use WebSockets everywhere. Right. Okay.

## [01:28:08] Message sending guarantees

[01:28:08] Let me talk about it. Let me talk about it in a little more detail. So now recall that whenever you are putting out a message on Slack, think of the guarantees that you need to provide to your customer. Now, I am Slack. I want to provide guarantees to my customer. Now, first thing that I would have to do is recall when you are sending a message. First, it's like you see it gray and then it turns black. It is not in an instant that a message is sent. You can see, you can visibly see a delay when you hit the send button. It takes time for that to happen. This is a very clear indication that it is not extreme real time. It's not that it is like immediately sending the message and sending it to everyone. It is very clear evidence of the fact that it is not, or it may be, but it is most probably it is not a [?WebSocket | asr: "web software"]. Right. That is one hint. It's not that it is truth, but it is one hint. Now let me wait, wait, wait, wait, wait, [unclear: "then when flows"], I mean, so.

### [01:29:19] Three types of communication - persistence

[01:29:19] Now here, what I would want to introduce is I want to introduce three types of communication in this one space. Just a minute. I have a very nice diagram for that. This is one. So depending on the guarantees that you want to provide to your users, you would pick one over the other. I'm taking three examples over here. First is Slack. That's my hypothesis. I may be wrong, but what you should be more grasping is the three types of communication piggybacked on the same system, right? I'm just playing with guarantees that I want to provide and how I'm architecting the solution around that, right? So just observe over here and see how beautifully this three types of, like, how different guarantees shape your system, right?

[01:30:06] Okay, so we have databases in which we are storing the data, we have users, we have API servers, normal HTTP servers, and we have edge server. Now, edge server, I'm just naming it fancy, but it is basically a WebSocket server. So these are WebSocket connections established over here, normal REST established over here, database, and this is a broker like Kafka, right? Now what we'll do is, let's say I'm Slack and I want to provide guarantees like when my message persists, then only I will broadcast. Obviously, for example, if I send a message over WebSocket and I, without persisting, I just broadcast it to all the users of that channel, for an enterprise user, for an enterprise customer, it's very bad experience, because unless and until that is saved, I should not be sending it to anyone. That's a use case, right? Because if the message is not saved in my database and I'm just bluntly broadcasting it to everyone, that's wrong. That's wrong on so many levels. It is okay to do it with normal user like you and me on Instagram chatting, but not on an enterprise application where communication is the key.

[01:31:22] Because if you just sent out a message to everyone without you ensuring the persistence, then there is a loss of credibility. Why? Because then people can misquote you. No, no, no, I received this message. See, it's the right here. No, that's not how it works. Right? So here, what is there is you don't rely on your, this kind of messaging, [unclear: "salutes"], WebSocket. No, have a proper reasoning for everything. So for Slack, what makes sense is I will send the notification to a user or send a message to a user only after it is getting persisted. So because persistence is really important for me, I have to do synchronous persistence. Now, which means making a call to API server, persisting the message, API server sending the message to WebSocket server and the message in real time getting delivered to the user. This is the flow that we would take.

[01:32:19] So message from a user comes to API server, persist it in the database, message or event sent to a server which sends this data to your user, which sends this message to user in [?real time | asr: "real life"], so the user doesn't have to refresh the page every time. So sending normal HTTP, receiving [?over | asr: "or"] WebSocket, because that's a good experience. What we are doing is we are ensuring the message is persistent before we send this to the user. That's first kind of communication, right? Where persistence of message is more important than like just blunt broadcast of it. Right? Because we don't want people to misquote on

### [01:32:58] Second type - WhatsApp, asynchronous persistence via Kafka

[01:32:58] Because also one more reason, because not each user has a separate storage. For example, imagine WhatsApp. In WhatsApp, when you type a message and you send, the message is stored on your local mobile. And then it is sent in the backend to be broadcasted to normal public. Now hypothetically WhatsApp doesn't do this, but hypothetically, let's say WhatsApp also wants to store this message to a backend. WhatsApp doesn't do it again. I'm saying, but hypothetically, let's say it wants to do it. WhatsApp wants to store this message in the backend. Now imagine WhatsApp, one copy of messages anyway stored on user local device. Now if WhatsApp takes this route to store the message before it sends it to user. Now imagine you sending a message to your friend on WhatsApp. It was makes an HTTP call. My God. In the database and then comes back and talks to your WebSocket server and then sends it to the user. It's so slow. WhatsApp is meant to be very fast real time chat. It's not an enterprise application. Right.

[01:34:06] So given this, where persistence is anywhere happening on a user device and I can very well do this part asynchronously. So what I can do is I can skip going through this route and you follow the green line. Now green line is WhatsApp, hypothetical example of WhatsApp, where it also stores it in backend. So messages sent from one user over WebSocket. This message is just pushed onto Kafka later to be stored in database. You don't need to store it synchronously to this database, because that's not what you're guaranteeing, right? What user has one copy of the message anyway, you are not guaranteeing persistence right away, because from edge server, the message would be sent to other user directly.

[01:34:52] You, this way what you get is you are not making synchronous call to your database to store it. You can do batch write through [?asynchronous | asr: "a synchronous"] medium over here and still give real-time user experience to your user. This is second type of communication, and here I'm assuming that my chat application is also asynchronously storing the messages in the backend. It has to, I'm giving, I'm saying WhatsApp doesn't store it, but I'm just suggesting if it was storing it, it does not have to do it synchronously, asynchronously. So what you do, you get a message over WebSocket because it has to be real-time. Now because the connection is already open, now we will use it. Given that one copy of data would be stored on the user and anyway, you immediately send it to WebSocket server. It's just so persisted in Kafka and sends it back to another user in real-time. When this happens, it is asynchronously getting processed and stored in the database in case it wants to.

[~01:35:48] That is second type of type of guarantees. Here we are synchronously guaranteeing the persistence of message before we broadcast it to other user, before we send it to other users. In second one, we know that first my message is stored in Kafka, it would eventually be persisted in the database and user will not directly call this database to retrieve other messages. Like user will not refresh anyway, right? On Slack, you can do that on Slack. Other user can refresh the channel and see the messages. So that's why persistence is very important, because this asynchronous, this asynchronous processing might take time. Let's say it takes 10 minutes for you to persist the message in the DB. Imagine Slack. Let's say if you take this route on Slack, what would happen? You send a message on WebSocket, push it onto Kafka, in 10 minutes it will be stored onto DB. But before that you post the message, you send notification to other users. Now users refresh the page. They don't see message because it is coming from the database, because it is yet to be of this. So bad idea to do this with Slack, but on WhatsApp, it is open, and different guarantees, different architecture. Right.

### [~01:36:57] Third type - Zoom chat, no persistence

[~01:36:57] Okay. Now the third type of, the third type of thing is, where the first is where we are guaranteeing persistent. Second is we are doing [?asynchronous | asr: "a synchronous"] part. Now the third part, hey, you don't give a crap about stuff. You say you send message. I send a message. For example, you send a user a message, that user gets it. You don't care about persistence at all. Zoom chat is a classic example. Zoom chat has zero persistence. Zoom chat persists. Like for example, if you post a message on Zoom chat, you go out, you come back in, you don't see historical messages on Zoom chat. You see the messages on the Zoom chat when you are online. Otherwise, you don't see historical messages at all, because it does not store anything. It has no backend storage for Zoom chat. So that kind of use case is literally user A sending the message. Everyone connected on that meeting gets the message and done. More than that. That's the third type of message that you don't care about persistence at all. But what you need is real time, right? You don't care about persistence. You don't want to store it in back at all. Persistence is not that.

[~01:38:00] So depending on the varying level of persistence, you are picking one way or the other. And this is the kind of intuition I want you all to build. It's not hard. It's, and don't just be ingrained about stuff that, hey, this is the only way to do that. If I have WebSocket, let me just send it over it.

### [01:38:24] No DB calls from the WebSocket server

[01:38:24] Now I'll give one more reason. One more reason why you should not do it via WebSocket. Now imagine this edge server, which is basically a WebSocket server. WebSocket server creating connection with your database. WebSocket server is already [?handling | asr: "handing"] a ton of TCP connection on this database. This WebSocket server is open on the internet, having connections string to the database, security problem. No matter how protective you make it, exposing, making calls directly from WebSocket server to database puts a lot of load on this server. You typically want to avoid that. It's a little bit on the infrastructure side when you typically deploy it and you see it in action, you see where it [?falters | asr: "folders"]. But I'm just giving you a glimpse of what happens. That's why a lot of companies never puts any complex logic on the WebSocket server. They just do relay of messages, of events, that's it. They don't put any complex, except just ingesting the messages in an asynchronous queue, typically. Typically, no one's stopping you from making a DB call on the WebSocket server, but you avoid it. You avoid it because of security implications, because of load on the server, because if this goes down, it broke, it breaks the entire real-time communication features of your platform, right? But in a gist, three different types of persistence guarantees, three different types. Right. Okay. Before you move on, any questions on this?

<!-- chunk_09 01:39:48-01:52:08 -->

> **Student Question [01:39:48] - Student 1:** So basically I was actually thinking like [?sending | asr: "a signing"] of messages can, can it be done via a UDP over TLS?

**[01:39:58] Teacher (answer):** Like, you want guarantees persistence in case of that you need guaranteed persist.

**[01:40:05] Student 1:** So basically like, let's just say like, the message, but like, whenever we gray icon. Okay. Okay. And we already have a WebSocket connection for receiving, receiving the messages, not sending, not sending them. Okay. We are sending the messages through, let's just say we are sending the messages through UDP over TLS. Okay. So anyway, WebSocket connection is telling us like, if there is any message or not, basically on the receiving end. Okay. So until that, like until WebSocket sends us like the message, basically like this message has been sent. Like this message is on the server now. Basically, we can retry it again in like, let's just say. So poor implementation.

**[01:40:59] Teacher:** Imagine how many times would you want to retry? The guarantees are very slim. Right? The retry, much higher, plus who will take care of broadcast? Then your client has to take care of broadcast, because our client would know that the message is now persistent. Correct. Instead of server should be the one who should be doing it. Like when A send a message to B, if you're doing it over UDP, then who will tell B that the message is there now?

**[01:41:27] Student 10:** Correct.

**[01:41:28] Student 1:** No, I actually like the, the reason I thought of this is because like whenever you create a HTTP connection. Okay. HTTPS connection. It is like kind of like more resource heavy instead of like just creating UDP.

**[01:41:46] Teacher:** Benefits versus like pros versus cons. You are getting this much just a change for overhead, complexities of retries and whatnot. Don't overcomplicate. You don't need to. That's why you typically, when you open it, you see gRPC request getting fired there. You don't see any based fancy implementation, right? These micro optimizations, to be honest, does like you would use UDP when you're doing [unclear: "very high in the ocean"], where it is okay for you to drop data, but not for as critical use cases, Slack's message persistence, doing retries unnecessarily, making client code unnecessary complex. I would not choose that. I would want to keep things simple and so it's easy to build complex systems. FYI, simple systems are harder to build, and keep it really simple because simple systems scale. As you added unnecessary complexities, that would stop scaling, whereas it becomes harder for you to debug, harder for you to onboard your engineers, harder for you to make future changes. It would kill down the extensibility of the system.

> **Student Question [01:42:50] - Student 3:** So are you trying to imply that WebSockets do not offer persistence?

**[01:42:55] Teacher (answer):** No, it does give you persistent connection, persistence, not database persistence. We are talking about database persistence, right? Store the data is more important in case of Slack. Correct. If you do it on WebSocket, WebSocket has to talk to database. Like the WebSocket server has to talk to database, which would put load on this server. Okay. Right. Because this is any way balancing a lot of TCP connections any way over here. Now you are asking you to make a bunch of them to the database. Right. Security implications would be there. Load would be there. This server would be [?overwhelmed | asr: "over well"]. Right. So, and if this goes down, it breaks the real time backbone of your... yeah, right.

[01:43:35] So that's why the edge server will be communicating directly with the database in... that's why I don't do that. I never prefer my WebSocket server to talk to database, ever. I never do that. Security: edge servers are typically most vulnerable servers in your infrastructure. You typically avoid that. You just at max put a message in Kafka, because this is not that critical, because it would not hold anything, just one Kafka connection string to put the message, go over here. So even if something breaches, you still ensure basic security, but you would not give up your database credentials, because if you are making edge server directly talk to database or exposing a database credentials almost on the internet, if this gets compromised, you are gone. So you would want to keep your database credentials as secure as possible. So that's a better way to do it is on a backend server rather than doing on edge server. And when I say edge server, it's not CloudFront edge servers. It's the normal servers on which WebSocket connections are established and calling it as well because it's a standard terminology.

[01:44:35] Okay. Okay. So these are three types of things. So now you can very beautifully see the different types of persistence in the database. I'm being explicit. Tells you how you can model different types of message sending paradigms, and receiving will always happen over WebSocket, otherwise you would have to continuously do short polling and refresh the page. So the flow would be, in case of Slack, when message comes, API server persisted in the database, sends a notification to edge server to tell the user that message is received. This is what would happen, right? Okay. So now if I pick this in our high level part, we can just do copy paste of it, and API server talk to... So WebSocket server, we then talk to the user, right? Okay.

[01:45:27] So this is simple [?Slack | asr: "stack"] based application. Now you can also do it with [?asynchronous | asr: "a synchronous"] Kafka, not saying no to that. In my final diagram, I've done it with Kafka, but any implementation is possible. So all of us, you are playing with those guarantees, right? You'll see conflicting stuff, because which is why I never converged to a design. It totally depends on guarantee. So the more years of experience you gain, or the more heavy systems you build, you realize that every system is like, you can build every system in 10 different ways. So depending on the guarantees, you pick one over the other. So I'm just picking this one. But in the final diagram, we will see a Kafka based implementation where I picked this route to build it. This Kafka based route to build it. But there is no reason for you to not do it this way. Prefer doing it this way, but I drawn in the final diagram this way, but that does not mean you have to only do it with this way. Depending on the guarantees that you are doing or you are providing, you pick one over other. That's why I deliberately keep it conflicting so that it keeps you, it basically makes you think about every single decision that you are taking.

## [01:46:41] Scaling WebSocket servers

[01:46:41] So given now that we talked about WebSockets and we spoke about how it would get stored and how it would get communicated back, now let's spend some time talking about scaling web and... because that's another most interesting part, like how to scale a [?WebSocket | asr: "web software"]. Now here, assuming, now we'll make very basic assumptions, very basic, but you can just change the number and make it a big... you can just mimic the real world cases. So now here we just, it's easy to draw this part, right? I just drew WebSocket server, everyone talks to that. Now, and how do you scale WebSocket servers? Now here, this is a very important part, because WebSocket servers that you have is typically, you would have always seen this, whenever a company has or it uses WebSockets, the features that it drives through the WebSockets are the most critical features for the particular problem. For example, Discord, chat. If WebSocket servers are gone, how would that real-time chat could work? Video streaming, WebSocket. Kind of persistent connection, you can put it in categories of WebSockets. Anytime a product has a persistent connection, it implies that it is powering the most critical features out of it. Why? Because that expensive TCP connection that is persisted between the client and the backend, because it would provide low latency communication, because now you don't have to reestablish connection every time. This makes your product experience very rich. Right.

[01:48:19] So now here, what I want to highlight is, first of all, that in like every other server you have, even a WebSocket server has a limit of number of connections it can handle, right. Assume for now, assume that the limit is four, four connection limit, right? Much more than that, but I'm starting with four, so that explanation is easy, right? Let's say I have a WebSocket server in which I can create at max four WebSocket connections. So now let's say for a particular channel, let's say channel one or other channel one, let's say I have a particular channel, channel 1, in which I have 5 users: A, B, C, D and E. So when A sends a message on channel 1, the message should be received by B, C, D and E. All of them. Right?

[01:49:18] So now what has happened is, my WebSocket server has 4 connection limits. So what I get is, when my A user connected, B user connected, C user connected, D user connected. So A, B, C and D, four users connected. Now when E would connect, where would E connect? WebSocket 1 is like WebSocket server 1 is filled. So now you would have another server in your infrastructure. Let's say a WebSocket server 2 on which your user E is getting connected.

[01:49:55] Now these are persistent connections. These are WebSocket connections. They are placed at A, B, C, D and E. These are persistent connections. They are there to drive very high performance, low latency communication. Now, when A sends a message, let's say now when A sends a message, this message needs to be sent to B, C, D and E. So A sends a message to this WebSocket server. Now the WebSocket server, let's say you're using Socket.io to build this. The WebSocket server would know through this library, Socket IO, or any equivalent library, that which all users are connected to me. That's the handshake that happens with the WebSocket server. Your WebSocket, if you have ever written hello world with Socket IO; if not, do write it. If yes, you would know that in Socket IO the WebSocket server knows who is connected to me. You [check: possible dropout] B, C and D are connected to me. Right?

[01:51:03] So when I send a message from A, I provide that, hey, please send this message to a channel, because that's what you do. A sends a message to a channel. The request comes over here, WebSocket 1. Now in WebSocket server 1, you would have the channel information cached. One way to do it is either cache the channel information, but how would WebSockets server one get to whom the message needs to be sent? Simple. When server one, when A connects to this, right, so when a user connects to a WebSocket server, so A wants to connect to WS1, so what it would do, while establishing the WebSocket connection, it first establishes... And then it sends the meta information, meta information like A says, I am part of channel one.

<!-- chunk_10 01:52:08-02:04:42 -->

**[01:52:08] Teacher:** So whichever channel is a part of it tells the WebSocket server one that I am part of this channel one. Let's say A is part of channel one. A is part of, basically membership information, let me write it this way. So A tells the membership information that I am part of channel C1, channel C2 and channel C3 over here. Anytime any user A, B, C or D, any user joins any WebSocket server, it tells the WebSocket server that, hey, I am part of these, these, these channels. WebSocket server keeps this information in memory, or maybe storing it in disk, whatever, it's okay, right? It keeps this information with itself, so it knows that which all users are connected to me and which all channels are they part of, right? Similarly, on this WebSocket server 2, it would know that E is part of WebSocket server 2, knows that E is part of channel 2. So WS1, WebSocket server 1 would know A is part of channel 1, B is part of channel 1, C is part of channel 1, D is part of channel 1. This is what would be stored on WebSocket server 1 and this is what would be stored on WebSocket server 2.

[01:53:36] Right, okay, we have this information. Now again, the protocol was, when a user connects to a edge server, the first information is sent to the WebSocket server is what, which channels is it part of, right? So WebSocket server one would know that anytime a user joins or removes a channel, the information is sent to the WebSocket server. Also, WebSocket server is kept in eventually consistent state with the membership information. How user tells it? User periodically sends this meta information to the WebSocket server one, that which all channels are am I part of and whatnot. This, this just information, just membership information, it tells it, right? Okay.

[~01:54:09] Now when user A sends a message, so what user would, A would send, this message is intended for this channel, right? So the message would come to WebSocket server one. WebSocket server would say, okay, this message is intended channel 1. Which all users are part of channel 1? A, B, C, D. So A sent a message, I would not send it back. I want to send message to B, C, D. So it sends this same message to B, C and D. This is how A's message is sent to B, C and D. Right? But now E is also part of the channel. How would he receive the message? How would he receive the same message that was meant for channel A, just because he is in some other... It's like literally humans, you, you all group of friends are in one room, in one hotel room, two of your friends are in another hotel room. You folks are having all the fun. How would they be part of that fun? How would they know what you folks are doing? Like, they also want to be part of, like, they also want to have fun. Right.

### [01:55:21] Sending a message to a user on another WebSocket server

[01:55:21] But so then you have to do something such that this message reaches E. How will you do that? Raise your hands.

**[01:55:35] Student 3:** Probably through the API server that connected both of the WebSockets, as in the last time, but then that would be slow, right?

**[01:55:41] Teacher:** [unclear: "Doing my API server"] and this and that. How do you do it? You have this, these items here. WebSocket one, WebSocket two, two WebSocket servers. You want message, this message to reach there. How would it reach over here? From WebSocket server one to WebSocket server two.

**[01:56:07] Student 3:** Caching some of the information of users on each WebSocket.

**[01:56:11] Teacher:** You already have that information over here, that all the people connected to this WebSocket. You have this information over here. What else are you caching? Where are you caching? Okay, so we cannot cache that. E is connected to WS2. Let's say you have that. Let's say you have that information. Then now what will you do? Let's say you know E is connected over here. Now what would you do? We would somehow signal. How? Right, let's go into those details. How? How this message would reach over here? No idea. No idea. Okay. We'll go into the first principles of it. Like, how do we even approach an unknown situation like this? Right? Like, how do we even think about a solution like this? Okay. Let me put in Amrik [check: name spelling]. Amrik, how would this message reach WS2?

**[01:57:00] Student 3:** Some messaging service, maybe Kafka or one more.

**[01:57:05] Teacher:** Why are you picking a messaging service? Can there not be any other way to do so? The messaging service slows down. You need to have bunch of consumers running. How, like, this server would be consuming so much of stuff from there. So problem, problem. Start simple. Start simple.

**[01:57:24] Student 3:** What do you do? [check: "What do you do?" may be Teacher - diarization seam] We can send the replica of that message to some another. There can be some, [?server | asr: "so let's"] just connecting these two WebSockets also.

### [01:57:35] TCP connection between WebSocket servers

**[01:57:35] Teacher:** Why do you need another server to connect? Why can't these two machine talk to each other? You create TCP connections all the time.

**[01:57:41] Student 10:** Oh, okay. That means the, [unclear: "both of the poor"] can communicate to you.

**[01:57:46] Teacher:** Why not? Why not? You just establish one connection with this one WS2 server. Isn't it? Hmm. Right. You just create a normal TCP server, may not be, it doesn't have the WebSocket connection, normal TCP connection. And what you do is just take this message and send it to this, would get this, or would receive the message, would see, okay, this message is for channel one. It would see which user is subscribed to channel one or wants message for channel one. It says E, it sends data to E. Okay. Right. This can be just a simple TCP connection, a real simple TCP connection. Right. Why do you want to introduce some more complexities on that? Right. So this is a bare, bare minimum that you have to do when you want two machines to talk to each other. Correct. Yeah. It's a bare minimum. Have a TCP connection established between them.

[01:58:38] So I need one TCP connection. So one TCP connection for each web server, each WebSocket server. I have one WebSocket connection for all the users connected and one TCP connection to talk to another WebSocket server. But now this solves our problem. This solves our problem, that message from A, which was meant to be sent for channel 1, is now properly sent to B, C, D and this TCP connection. This message is received by WS2. It says, okay, this message is for channel one, which user is part of channel one. It got E and this message is sent to E. So all the people are now getting the messages of this particular channel that was sent for this channel 1.

[~01:59:34] Now let's spice it up a bit. Now let's say I have one more server here. Let's say this is WS3 and I have a user F which has now joined this channel, and this user F has now joined channel 1. You added that person is now joined channel 1, and now F, when F established the connection, F established a WebSocket connection with WS3 for some reason. And now what you need to do is this message. Now let's say A sent another message. A sent another message. This message was again sent for channel 1. The message sent for channel 1 came over here, sent to B, C, D, over this TCP connection to over here, and now it's sent to E, right? E received it. But now, similar to how and the connection was established over here, you say, hey, let's build a TCP connection over here, right?

[~02:00:42] So now what would happen is the, the message that is sent over here goes to this, sends to BCD, over this TCP connection message comes over here. Over this TCP connection message comes over here from here. It says, okay, I have C1, for C1 I have to send message to user E. Some messages sent over here from here. It says, for C1, I have to send it to F. The message goes over here. Problem solved. Right, here what you can see is the same message that was intended for all the people part of channel C1, everyone gets the message, right? Okay. What is a disadvantage of this architecture?

**[02:01:32] Student 3:** Amrit [check: diarization seam - "Amrit" and "okay, right, but it's happening in real time, that's fine, okay" may be Teacher], maybe E and F will receive the message after some time it will take. Okay, right, but it's happening in real time, that's fine. Okay. And just WebSocket one server has to maintain too...

**[02:01:45] Teacher:** What do you mean by too many connections?

**[02:01:47] Student 3:** It means this TCP is also an overload to TCP and to ABC and D also.

**[02:01:56] Teacher:** But then you have to do it. There is no other way. You have to do it. Otherwise, how would you communicate? Okay.

**[02:02:05] Student 10:** I can currently think of this.

**[02:02:07] Teacher:** That's fine. That's fine. We'll come. Now we'll see how we started with a problem. We started with basic fundamentals, solved it. Now, now we are thinking of making it better, and that's how we should approach any problem in there.

[~02:02:19] Right. Okay. Yes, Jodhinder [check: name spelling], what would you do over here?

**[~02:02:19] Student 6:** So yeah, like, we could have like these TCP connections between all the servers, like it will sort of form a mesh, but then each server is responsible for making sure that all those connections stay alive. If any of those connections die, you have to establish those connections, and I think that itself adds a lot of overhead, or something like that. So maybe... But why? [check: "But why?" may be Teacher - diarization seam]

### [02:02:45] Mesh of WebSocket servers - overhead

**[02:02:45] Teacher:** Why? Why is that an overhead? So now what you said is you are typically creating a mesh, that every WebSocket server one, or every WebSocket server has to be connected to every other WebSocket server. Right? Which means literally everyone is connected to every other one, no matter how many servers are there. So what's the problem with this? Why is it an overhead?

**[02:03:05] Student 6:** One issue, like, other than like, one issue could be, if some server goes down, connection is not there. It could, it would basically just miss that message or any.

**[02:03:17] Teacher:** So that's okay. That's okay. But what else is the issue? You, you, you talked about overhead. What kind of overhead are you seeing over here?

**[02:03:24] Student 6:** Sorry. You're sort of like, sending one message to like every single server, which might not actually need it.

**[02:03:34] Teacher:** No, you can minimize that, optimize that by having a global state. So let's do that. If, even if you do that, what's the overhead? There's a much bigger overhead, much bigger enemy staring. It's like literally there is a dinosaur behind you which is staring at you, but you are just worried about a small mice.

**[~02:03:48] Student?:** Yeah, I'm not able to think of it.

**[~02:03:48] Teacher:** That's fine, that's fine. That's why I'm here, right? I'm just, I'm just [?prodding | asr: "proving"] you folks to think on those, like, see what overhead would come, how would you make it better. I'm just picking people who have not spoken much. Harsh gone [check: name], just trying to be fair to everyone.

**[~02:04:04] Student 9:** Yeah, so I think I'm not sure what this communication looks like, more synchronous communication, and we should have some asynchronous mechanism here.

**[02:04:21] Teacher:** Okay. First let's talk about what's the overhead that you are solving. Like, what is the problem that you're solving with that asynchronous thing?

**[02:04:29] Student 9:** If any server is down, whenever it is available. That's not a problem.

**[02:04:33] Teacher:** You're talking overhead. What's the overhead? Down is basically fault tolerance. Right. What's the overhead?

<!-- chunk_11 02:04:42-02:17:20 -->

**[02:04:42] Teacher:** And why is it even a problem? We first need to understand that, like before jumping into the solution, we have not even covered the problem yet. There is a massive overhead. Like three people have used the term overhead, but no one explained what the actual overhead is. Like, why is that even a problem, problem? Right. Amrit.

> **Student Question [02:05:05] - Student 12 (Amrit):** Hey, yeah. Could server discovery here be the overhead when we're horizontally scaling [?WebSocket | asr: "website"]?

**[02:05:12] Teacher (answer):** No, that's a different problem. But that's still not an overhead, overhead. It's staring right at our face, the overhead. It's right there in the diagram. Hey, man. [check: possibly a student's name] Yeah.

**[02:05:29] Student 1:** So, like, when you want to horizontally scale, like, you'll be creating one connection for every [?WS | asr: "AWS"] server, right?

**[02:05:37] Teacher:** Correct.

**[02:05:38] Student 1:** So, that limits it at some point.

**[02:05:40] Student?:** Why?

**[02:05:42] Student 1:** Because you can't have like infinite connections from one server.

**[02:05:46] Teacher:** No, but I can still have a good amount. Let's a million connection. What's the problem? Or anyway, I would not have more than 10,000 servers. I can create 10,000 connections with ease. What's the problem?

**[02:05:58] Student 1:** Okay. I can't see anything else. That's all.

**[02:06:01] Teacher:** I heard you, you, you are the closest. Okay. Okay. Vikram.

**[02:06:07] Student 3 (Vikram):** Yeah. So, so there's a three-way handshake for every, for every message that we send to another [?WebSocket | asr: "website"].

**[~02:06:12] Teacher:** No, no, no, they're just once. Once, once the TCP connection is established, you don't, you just relay the message over it. That's not [?overhead | asr: "over it"], right? That's why we are having this TCP connection, right? You just have to send a message over it, you don't have to reestablish it again and again for every message. Okay, let me, let me talk about it. Okay, [unclear: "look at your books third"], the problem is the WebSocket connection. The WebSocket servers that we have, that WebSocket servers have to basically support the WebSocket connections.

[02:06:46] But now here, let's say here my server limit, let's say my server limit was four connections that we talked about at first. Now, obviously every server has a limited number of ports on which it can accept the connections. Now here, if you are, because with this architecture, every WebSocket server has to connect to every other WebSocket server. Now what is happening is there is a lot of persistent TCP connections of that server being hogged just to maintain connections with other TCP servers problem. You are not leveraging all the, like you are literally, if here I'm having four people connected to this server and I'm having three TCP connections connected to this, I'm having seven connections out of which three are just for inter-server communication. Your job is to serve users, but here because of this mesh architecture, what is happening, I guess you are wasting a lot of TCP connections to just talk to, to just talk among the servers. That's the problem.

## [02:07:58] Real-time Pub/Sub (Redis) between WebSocket servers

[02:07:58] So how do you make it better? A way to make it better is to not have these many TCP connections here, but instead put a Pub/Sub. It's a real-time Pub/Sub, not Kafka. Kafka would slow it down. It's a real-time Pub/Sub like Redis. So what every server does, it creates one connection with this. So now your TCP connection overhead for inter-server communication is reduced to just one. So four connections for ABCD and one connection with this real-time Pub/Sub.

[02:08:36] So what is real-time Pub/Sub? Let me talk about that. So real-time Pub/Sub is very simple, where what it tells is that send this message to everyone who is subscribed to it right now. It gives you zero persistence, zero, which means that if I have a message to send, what would happen is, [unclear: "blunt case"] when A sends a message to channel one, what it would do is, to Slack channel one, the message would come over here, it would check Slack channel one, BCD is connected, so BCD gets a message, and then it sends message to this real-time Pub/Sub. The message is pushed to this real-time Pub/Sub, and this real-time Pub/Sub pushes the message to everyone who has subscribed to it, everyone who is subscribed to it, literally. So, and at that moment it does not store this message. It's not Kafka, it's not storing the message, it's literally sending the message to, to it. Right.

[02:09:37] So message comes over here, it's sent to WS2, WS3, WS4 right there and then. In case a server wasn't connected, it would not receive this message. Simple. If the server wasn't connected, it would not receive the message. So it's a real-time Pub/Sub. It does not guarantee delivery. What it guarantees is people who are connected at this moment to me, I'll just send a message to all of them. Simple. Right. Okay. So this is real-time Pub/Sub, and one great example, what tool that is great example for that is Redis. Right. Okay.

### [02:10:09] Redis channels vs Slack channels

[02:10:09] Now here there is a conflicting term, channel. Redis has channels, Slack has channels. So I'll be explicit in saying Slack channels and Redis channels. Right. So now here you'd say that, hey, why are we broadcasting message? This message. Now let's say I have E and F connected to these server, both, WS2. Now here you can say that when A sends a message to channel one, why should this channel, this message be sent to WS3 and WS4? It should not. It just sent to WS2, because only WS2 has people who are part of this channel. No one else has it. Right?

[02:10:56] So which is where on Redis Pub/Sub side, there is also called as Redis channel, which are called Pub/Sub channel. They're also called channels. Conflicted terminology. I can't help, because very few words we have. We can't do much there. So these channels, Redis channels, in Redis what you can do is, Redis Pub/Sub is the one that you can Google about. The idea for that is when a connection is established, when a Redis connection is established by a server, so when my WebSocket server spins up, it establishes the connection with this Redis Pub/Sub backbone. And what it says is, subscribe me to something.

[02:11:34] So when A connects to it, when A connects to WebSocket server 1, it says that, hey, I am part of channel 1. It tells Redis, like WebSocket server 1 calls the Redis function or calls the Redis command and says that subscribe me, subscribe me to channel 1, right? When B connects, it also fires it. B connects, it tells its membership to WS1, WS1 talks to Redis and says subscribe me, subscribe me, as in the server, not B, the server. The server here is subscribing to this, not the user. User is having WebSocket connection with the server, server is having one Redis connection, one TCP connection with Redis. On Redis Pub/Sub it can, you can tell that subscribe me for something. So whenever a user connects to WebSocket server, it tells its membership, WebSocket server fires a command and subscribe itself for those updates.

[02:12:32] So now here what would happen is, WS, we use a different color. So WS1 is subscribed to channel C1, because A would tell that I am a part of channel C1, [unclear: "redis 8"] would fire a command, WS1 would fire a command and subscribe me for channel C1. Similarly [unclear: "BK late"] would fire subscribe to channel C1, subscribe channel C1, D subscribe channel C1. Right. So WS1 is subscribed to one channel, which is C1. Similarly, WS2 is also subscribed to channel C1. Let's say there are users G and H which are part of channel C2. Slack channel C2.

[02:13:24] So now here what would happen is, when I send a message over here from A, it gets sent to over here, WS1. It's then sent to B, C and D, because [unclear: "channel word"] message was sent for channel one. It is sent over here to this Redis Pub/Sub for channel one. Who is subscribed to channel one? WebSocket server two is subscribed to channel one, so the message is sent to WebSocket server two over this. It's literally pushed. WebSocket server is not pulling the message, WebSocket server is pushing the message to WebSocket server 2. WebSocket server 2 receives it and it sees that which all users are connected for channel 2. It says E and F, that sends message to E and F. This way, with minimal overhead of TCP connections, we get communication done between multiple WebSocket servers.

[02:14:20] Now here it would seem daunting. Oh my god, you will require so many servers in so many [check: sentence breaks off, words possibly lost] the problem down to just four connections over here right now. Because of it, it is seemingly far too much, and you would also say there is one Redis Pub/Sub, and now what would happen? Have a cluster of it, not a problem, right? Have a cluster of it, sharded, do intelligent balancing and whatnot to sort it out. So what you typically do is you try to put all the users part of the same set of channels to same WebSocket servers.

### [02:14:57] Which WebSocket server to connect to

[02:14:57] So which is where, first step, the first ever step, when a user logged in, when a user opened the Slack app, we said it established the WebSocket connection with WebSocket server one. How did it do it? How did A get the IP address of WebSocket server one? Which is where you have a layer sitting in between, not between, but rather sitting at the top, where when a user comes in, A talks to it and asks, hey, where do I connect to? It tells the IP address and then A connects to that server. This is like DNS, not DNS, like DNS. This is like DNS, not DNS. It's a normal service whose job is to balance the connections. Or rather balance the connections. When I say balance the connections, it means it tells you where to connect to.

[02:15:49] So when A comes up, this and says, hey, I am a, I am part of this org. Which server should I connect to? So for example, naively, naively assume that you have one WebSocket server for one organization. All the users of the, how many employees would you have? Like 200 employees pay, so you get a million dollar or you get a billion dollar value, 200, 500, 10,000 employees, 20,000 employees, they are nothing for a WebSocket server. Correct. So what if you have one WebSocket server for each organization in Slack? All the users of that, you'd say, hey, I'm part of organization, which server should I connect to? It gives you IP address of this. All the users of a particular organization can connect to this one WebSocket server. Now there is no need of sending this message to Redis at all. They just do it intermittently, like within themselves they can send a message. Right.

[02:16:37] So it reduces the overhead. So what the job of this service would be, to spit out the WebSocket server to connect to, such that it reduces the balancing, it reduces the load on this, the number of messages that needs to be sent through this, it reduces that. This is what this service needs to handle. So when a user logs on to Slack or starts the Slack app, it connects to this, asks for an IP address of a WebSocket server to connect to, it spits out an IP address, the user connects to that IP address, and so on and so forth. Now, problem. What if this server goes down? Oh my God, life ended. No, no, no, nothing would happen. When this server goes down,

<!-- chunk_12 02:17:20-02:28:27 -->

**[02:17:20] Teacher:** server ended, they would again talk to this service and find another IP address to connect to. Now it's the responsibility of this service to see that, oh, oh my God, this server is down, let me move all of them to this server. So now when these users try to reconnect, they would get IP address of this. So now all the users will connect to this. Simple, right? In worst case, for some time they would have to just move messages here and there through this Redis. That's perfectly fine. And periodically it might do balancing of load across web servers also, that intermittently kill one and so that every traffic of a particular user is moved to other server to minimize the IO that happens over Redis. Right.

[02:18:02] But now here you very beautifully see how WebSockets are scaled without having any hiccups. You can very easily scale WebSockets. You reduce the overhead of maintaining additional TCP connections by introducing a real-time Pub/Sub. This is not Kafka, this is a real-time Pub/Sub like Redis. Write a hello world with Redis Pub/Sub, highly recommend you to do that. And all users connected to bunch of servers, WebSocket servers, and how do they get IP of WebSocket servers is through this one service where anytime to get the IP address of a WebSocket server to connect to, this service [?spits which | asr: "skills with"] server to connect to. This way you can minimize the IO that needs to happen over Redis. You be protective of that, right? This is exactly how, exactly, not even kidding, I built it myself, this is exactly how people build this. This is exactly how WebSockets are scale. You just work on the fundamentals, that's it. When you get something, you [unclear: "enter up"], you hit a problem, you hit a roadblock, you find the simplest solution for that. Always scale. As soon as you add complexity, your system would not scale at all. Keep things simple and try, right? Okay, this is how WebSocket server scale. So let me formally cover that and then I'll take questions. There will be a bunch of questions, more than happy to answer, even if it is one, it's okay for, right? But absorb this, like how we thought of this one simple design, just Slack's real-time [?communication | asr: "combination"], and covered a bunch of stuff around it. Let me formally cover it so that I ensure I covered everything. More than happy to take the question.

## [02:19:38] Recap of the Slack design

[02:19:38] Okay. So first thing that we discussed was DMs are just channel with two people. So what you do is on channel, you add a small [?type | asr: "time"] that tells you if it's DM so that you can render it accordingly. You have messages in which you say for this channel, DM is just a channel or DM from a user to this channel. So DM is also a channel. Channel is also a channel. Okay, now multiple messages just need a sharded database. No need of over complication. Anything that is sharded for chat or for Slack, you typically don't need NoSQL. But if you have Cassandra [unclear: "well input"], then what you need is a way to store the message in the sharded thing, right? Because one database node definitely would not be able to handle the load, right? So this is what your basic [unclear: "Kidditch"] diagram, but this is what your basic architecture would look like for now. Any partition [?DB | asr: "DBA"] would work.

[02:20:36] The three types of messaging that we discussed, depending on the persistence that we are going for, asynchronous storage, synchronous storage, and non-persistent storage. Different ways to build a system, Slack, WhatsApp, and Zoom. Hey, the color also matched. Nice. White, WhatsApp green, and Zoom blue. And happy coincidence. Okay. Now, the key highlight of any real-time communication: Sockets, the persistent connection, especially for text, it's WebSockets. That's what comes in.

### [02:21:08] Six concurrent TCP connections limit

[02:21:08] Now here, one thing I want to highlight, which I did not cover while I was explaining other stuff, is the limit of six concurrent TCP connections. Now here on the client side, not server, not backend server, client as in browsers, as in Android clients, there is a limit of maximum number of TCP connections that we can create backend. For example, from my browser, I can create at max six concurrent TCP connections only on my backend server. And why is this there, or on a domain? Why is it there? For example, so that people don't abuse. You can easily do DDoS if this was not the limitation, right? So you don't want to do that, because of which browsers enforce this thing. Six concurrent TCP connection limit, six or eight. Six is for Chrome, eight is for Firefox. They enforce this limit on that: from my browser, I would not allow more than six concurrent TCP connections to happen on a particular domain. That's so.

[02:22:10] This way what happens is you would typically have just one WebSocket connection that is talking to the edge server, and I'm just talking it as edge server because everyone talking to that, and just giving it a fancy name. I like to give personas to [?things | asr: "think"]. So these are [?WS | asr: "w's"], these edge servers on which every user is establishing WebSocket to this server, right? Any real time communication. And it's not that you should not create one WebSocket for every feature that I have, because your browser has only six connection limit, right? If one is gone, you are only left with five other to do all REST API stuff, loading images, videos, and whatnot. You only have six concurrent connections to play with, because WebSocket is a persistent TCP connection. As soon as you create one WebSocket connection, one is gone. You are now left with only five connections. Right?

[02:23:02] For example, example. Now, how would this affect? Imagine you have a web page on which there are 100 images, same size, same size 100 images. If you have no WebSocket connections, you would load six images at a time. And the next image, next image. So when you render this image, it makes HTTP call to get those images and render it. Browser, although you make 100 requests in parallel, your browser will only send six at a time, and then next six, and then next six, and then next six. So you'll always say six six six six six getting, right? But now if you have one WebSocket connection open and now if you refresh the page, you would see five images loading at a time. So five five five five five five five. That's the problem. So now if you have two WebSocket connections [?open | asr: "of one"], you would see four images, four four four. Now you see, or the speed at which you can talk to your backend, just by creating more additional WebSocket connections.

[02:24:00] Which is where every good product will have just one WebSocket connection, and anything and everything real time will happen through that. So in case you are doing Instagram, all the live chat messages through that same WebSocket connection, live video space, that heart animation, same WebSocket connection. You don't create separate web connection every real-time feature that you have. That's the worst way to build a system. Worst. Because it significantly reduces the amount of work that you can get done on the browsers. Like from the browser to the backend, the number of calls, API calls would slow down, because now you cannot make a lot of calls in parallel. Right? So that's a biggest limitation. Because of which you would always have just one WebSocket connection to the backend. Not many. You can have many, but it is not recommended. It would slow down your system, or rather your product or your experience. Right.

### [02:24:58] Overall architecture - edge servers, Redis Pub/Sub, Kafka, partitioned database

[02:24:58] Okay. Now this is what I was talking about, the Kafka based thing. I kept it open. I deliberately choose conflicting implementation so that you keep your minds open about stuff and not just be adamant: oh, this is exactly how it needs to be there. Right. There is no one way to build it. Right. Whatever guarantees you have, you build it that way. Right. Okay. Let me talk about this. Where I talked about the edge servers, this basically WebSocket. directly jump to this. This is fine. So this is a basic high level stuff of that, that gives you the overall picture.

[02:25:30] Now here what you would see is these are normal API servers that you have. This is the partition database that we are talking about. Here are the WebSocket connections connecting to edge servers. Membership information is with edge servers, because user tells when connecting to this that, hey, I am part of these all channels. Depending on users that are part of these channels, request to Redis, and [?fires | asr: "by farce"] a command to Redis. They say, I am edge server, I am WebSocket server one, and I want to subscribe to channel C1, channel C2, channel C3. Some WebSocket server two would say, I want to subscribe to channel C2, C3 and C5, right? These are Slack channels that they are subscribing. These are also coincidentally the Redis channels in our case, but implementation may vary.

[02:26:10] Now here what we are doing is we are having very clear separation, very clear separation of [unclear: "user then making"]. Now here I'm going with persistence level 2, where asynchronous persistence is okay. Right. So think of it like WhatsApp kind of stuff, where messages also persisted in background. Slack, we all know it would happen like this and then being sent to edge server and then sent to other users, right? But with WhatsApp you would do WebSocket, Edge servers, Kafka, asynchronous persistence consumed by consumers, persisted in the database, and from this messages sent to other people connected to this. And now here you have normal messaging service on which you are firing normal HTTP request to load all the messages. Historical scrolling, all of that happens over here. Any real time communication happens over here through WebSocket. So normal REST based APIs happens over here. Real time happens over here.

[02:27:21] Asynchronous persistence, storage layer, partition database, real-time Pub/Sub for inter-edge server communication. These is how you should design an architecture that covers almost all types of messaging systems. All you have to do is just change the different guarantees that you're giving. this for WhatsApp, we do this for Zoom. We do this, everything else remains the same. Nothing fancy out there.

### [02:27:47] Balancer service

[02:27:47] And so, and one thing that I should have drawn is that one piece of component that tells you which server to connect to. So let's call it, I don't know. Connector. [unclear: "She"] very bad name. Let me come up with that. So the idea of this is that users will talk to this service and get which WebSocket server to connect to. So let's say it's orchestrator is the very generic name that I always give. So let's orchestrate. Oh, oh, [unclear: "other balance"].

<!-- chunk_13 02:28:27-02:41:34 -->

**[02:28:27] Teacher:** Not load balance, but I'm just giving him balance. Right. So what balance that is doing is, whenever a user comes up, it talks to balance to connect to, it tells the [?IP address of | asr: "IP out of"] edge server, it connects to that edge server, right? And all, and it tries to balance it, and it says that all the users of a particular organization should all part of the same edge server [unclear: "person"], right? And this is how you are, right? So what I would recommend you all to do is understand what Redis Pub/Sub is, in case you are unaware. Write a small hello world. It just requires to spin up a small Redis server locally, three clients connected on three to that, and see how it functions. Redis does not give you any persistence. It is real-time Pub/Sub. So when you receive a message, [unclear: "whichever etc. etc. connect you to it"] at that moment will receive the message, which means there is a chance of message to be lost and not sent in real-time.

[02:29:24] So which is where you may have some periodic refreshes happening in the background, which just refreshes the Slack channel. So you may see on WhatsApp "checking for new messages". It is this: new WebSocket connection was established. It was checking if there is new messages for it to fetch from the backend. Right. That's what happened. So you might have a small thread in JavaScript that is running and periodically checking in case you miss some messages or not, just last 50 messages, and just check if you missed any. If you did, you just render it on the UI, mimicking a false notification. Right. But this is how you would do it. And everything is there. This is just the theory that I explained while we were going through that. Nothing fancy, it's exactly what I explained by other, I explained it in much more depth than what is covered over here, because my ideas are getting much more clearer by the day. But this is exactly what that local pool and all of that, it's exactly that, nothing which is out of this, right?

### [~02:30:12] Wrap-up and next week's plan *(admin)*

[~02:30:12] Okay, any questions on this? Okay, before I take questions, this is exactly what I wanted to cover. This is the depth that I typically don't cover in, but I went really deep into every single part of [unclear: "Pacific"]. We, I've never done it in any of other [?cohort | asr: "code"]. This is by far the best I've covered this [unclear: "reason"]. I'm so happy about it, but do watch it once more. Do write hello world of WebSocket, balancer, real-time Pub/Sub. Do that. Like, those, don't take it on the face value. Devil lies in the details. Implement everything. Right. Okay.

[02:30:54] This is all what I wanted to cover. Now we'll take open questions and I'll upload a recording by evening. Want to drop off, [?feel free | asr: "will free"] to drop off. Next week is all about distributed systems. Saturdays about distributed systems. Sunday is about distributed ID generators, distribute systems. We build, we've been really fancy stuff. We will load balancer. Again, we'll go into those nitty gritties of implementing a load balancer. I'll give you a code walkthrough of what a load code of a load balancer looks like. It's superbly simple. You would see, it's that simple to build a load balancer. So trust me, I've received so many messages from folks who have done this code today: "I've just implemented my load balancer. This was the happiest day of my life." Literally I received one yesterday evening, right? Someone from the last cohort implemented load balancer. They're so happy doing it. And that's the beauty of it. Every single thing that you see is implementable. Implemented. The devil lies in the details. Always keep that thing in mind. Right? So folks who want to drop off, people to drop off, more than happy to take the questions. Rajiv, go on.

## [02:31:58] Q&A

### [02:31:58] Exposing edge server IPs, security

> **Student Question [02:31:58] - Student 5 (Rajiv):** Hello, Arpit [check: name as ASR heard it]. The thing which is not clear is about edge servers. I mean, I don't know what I thought.

**[02:32:05] Teacher (answer):** Normal WebSocket servers, which runs a Node.js process of Socket IO. That's it.

> **Student Question [02:32:10] - Student 5 (Rajiv):** But we expose the IPs of them directly to the client. We don't put it.

**[02:32:14] Teacher (answer):** Multiple ways to do it. Multiple ways. A lot of folks typically expose it over internet. There is no harm in that. You can also put it behind [?a load balancer | asr: "the level inside"].

**[02:32:21] Student 5 (Rajiv):** I was put in a question state where they said that, okay, I mean, one of the interviews, that if you expose the IP over there, they can misuse.

**[02:32:28] Teacher:** Interviews are stupid. Interviews are stupid. They don't know the real world system. Trust me on that. They don't know. That's why it was three big companies who publicly expose IP addresses of their edge servers. There is nothing wrong in this architecture. You can also put it behind load balancer. You are just having another hop. You are just having another hops. What if you don't want that hop, right? I build real-time communication. I know when to expose IP addresses, right? Of places, for example live class streaming. If you don't do it, if you add one load balancer, you are adding latency. How will you build real-time communication? You cannot, right? At some places it is okay to put them behind load balancer, but remember, connections will always be sticky. So one connection from user to load balancer, another connection from load balancer to a WebSocket server. Every time one hop relay would happen, three to five millisecond latency will be added. Good. If you are not, if you want ultra low latency, directly expose IP addresses over there.

> **Student Question [02:33:30] - Student 5 (Rajiv):** [check: diarization seam - "there is nothing, you gain some you lose some" may be the Teacher's] There is nothing, you gain some, you lose some, right? So getting the latency. Now I am actually bit of, I want some knowledge over there: what kind of security threats you get when you expose an IP? Because, I mean, you, you also have to look at from that phase, right?

**[~02:33:44] Teacher (answer):** Yeah, you get ton of them. So that's where, whenever we expose it, you change the route tables, you hide all the ports, you prevent SSH, you block a lot of stuff on this machine. So very high security review happens on this machine when you expose it on the internet. A ton of them, right? You don't put any credential database, which is why I never connected my edge server directly to a database. Zero connections, zero connections, because if I leave the credentials given, if my server is exposed on the internet. And which is exactly why I also deliberately keep it over, because I know every time someone would be there, would ask the same question. This fact that whenever any server is exposed on the internet, you ensure that you don't put any credentials on that. Here there will be zero credentials. This server will never talk to my database directly. They would have no idea what my database is. All they have is something that is okay for me to push. Maybe a Kafka connection string. In case it gets compromised, all I'll be losing is just a Kafka connection string. That's it. Nothing more. And this Kafka is anyway internal to our infra. No one will be able to talk to that. So no problem, right?

[02:34:52] There is nothing critical in this server, which is why it's okay. It's okay. Right. So even if it gets compromised, no one can do anything with that. All they have is just one machine that tells you IP address of all edge servers. Worst thing they can do is DDoS. Right. Worst thing, but you can still prevent DDoS by having a simple load, a simple [?rate limiter | asr: "rate within"] this. That's okay. Right. So you don't need, which is exactly why I say that. If you keep things simple, and as I say that there is hundreds of ways to build a system. You just need to know what guarantees you are playing. Right. It's okay. There is no rule that says you should always put a WebSocket server behind a load balancer. There is no such. If I can ensure security of my publicly exposed server, I'm good. I'm good. Correct. Always keep that thing in mind. Okay.

**[02:35:47] Student 4:** Thank you.

**[02:35:48] Teacher:** Okay.

### [02:35:52] Edge servers and channel changes

> **Student Question [02:35:52] - Student 4:** So one thing, how these servers are kept aware with channel changes? If a new channel is created, if someone leaves the channel, joins the channel.

**[02:36:05] Teacher (answer):** So these should be. User is the one who is doing that action. Correct. You will always join a channel when you are online. Correct. You can send that event to a server saying that, "Hey, now I'm subscribed to this channel." Correct.

> **Student Question [02:36:22] - Student 4:** When there are multiple servers, then that action has to go to like all the servers, right?

**[02:36:26] Teacher (answer):** No, every server is doing that. Right. So A is taking care of the "I am part of this channel". That's it. Why, why it has to go to all servers? Like, say D is also part, let's say a new channel is created, channel three, and in that A and D are added. A and D would know that they are added to that because they would be notified by it. How would they be notified over a WebSocket connection? Then it would request it: "I am now part of this channel. So subscribe me to that." So it's a will take those actions, because they would also need to be notified, right? A and D, that now you are part of channel three also. So first who, who is not, let me do that. Let's say he created channel three, right? He created channel three. How would he create channel three? He would make an API call and create channel three, which updates the database. Right now.

[02:37:16] Would then talk to edge servers through this Redis Pub/Sub and broadcast a notification that, "Hey, these users are now [?part of | asr: "parlap"]." You can have those, you can have those messaging systems in place, or rather those, those messages in place, which tells your Pub/Sub to broadcast message to all edge servers that this new channel is created for this particular organization, and these users are part of it. This message would be received by all the users who are new part of the newly created channel. They would get that very nice real-time animation: new channel is added in your list. For example, that client can then send periodically that, "Hey, I am part of these channels." That's like a periodic meta call that is making to edge server, saying that, "Hey, I'm part of these channels. I'm part of this channels. I'm part of this channel." Once it knows that I'm part of this channel, it tells edge server that, "Hey, now I'm also part of channel three." So it subscribes. It tells edge server, "I'm part of channel three." Edge server updates it's in-memory store. Fires a call to Redis, says now WebSockets server one is now subscribing to channel three also.

[02:38:12] This is one way to build it. This is not the only way to build it. This is one of the ways to build, where you are relying on client to tell it. Another way to do it is where edge server itself is calling the API of the backend and pulling that information that, hey, which all users are part of which all channels, periodically, the users that are connected on that. That is another way to build it, but on a publicly exposed server, you cannot do it. If it's private or in process, and you can do it. Multiple ways to implement: either user tells [unclear: "us a word"], or server gets somehow that information, or server periodically pulls that information either.

**[02:38:52] Student 4:** Okay.

### [02:38:53] Why Redis Pub/Sub

> **Student Question [02:38:53] - Student 4:** And any specific reason to choose Redis Pub/Sub here, which one would you pick? No, there are other streaming services also, right?

**[02:39:04] Teacher (answer):** [check: diarization seam - "from cloud providers like let's say" may end the Student's question] From cloud providers, like let's say [unclear: "OCS"] streaming, [unclear: "OCS"], I'm not sure, I just pick one. Anything that gives you real-time Pub/Sub, I'll use that. Simple. So that's why I focus on real-time Pub/Sub, right? That's the requirement that I need. Redis gives. I've used Redis to build this exact same system. I use Redis to build it, and that's why I picked that up. But that's why I always say real-time Pub/Sub. Whichever provider gives you real-time Pub/Sub, or you built one on yourself, you use that. Don't want to persist anyway. If it gives persistence, good enough, but I want real-time sending messages to everyone who is subscribed, whatever. Like whichever service, whichever database, whichever tool, whichever framework gives me that, I'll use it.

> **Student Question [02:39:47] - Student 4:** So that means there is some expiration date for the message. Like no putting, there is no, no persistence, immediate broadcast and discard.

**[02:39:55] Teacher (answer):** No expiration, no [?persistence | asr: "person"]. That's what I said. No one's storing that message anywhere. You're literally getting the message, sending it to everyone who is

**[02:40:05] Student 4:** Okay.

### [02:40:08] Bad actors, private channels

**[02:40:08] Teacher:** Jay?

> **Student Question [02:40:11] - Student 4:** [check: teacher calls on "Jay" - may be a different student under the same diarization label; name "Erfit" as ASR heard it] Yeah, hi, Erfit. So my question is regarding that point you made about the authenticity of data at the edge servers. So currently, all the info we receive about membership comes from the end users. So how do we deal with bad actors? Or suppose I were to introduce the feature of private channels next, then put this model be sufficiently secure?

**[02:40:40] Teacher (answer):** So now that you are altering it, if you are having that as a critical information, then you rely on a back end [unclear: "DPA"] call to get it. But then you have to put your edge servers behind a load balancer, private or infrastructure. Problem solved. Correct. All right. Right. So that's why I have deliberately designed it in a way that makes you ask these questions. Right. Think on those lines. Now what you brought up is an excellent point. What is your private tenants? Because now user can falsely claim it: "I am part of this channel. Give me all the messages." Now you start receiving messages of that. So you are literally doing a man in a middle attack. You don't want that to happen. So now what do you do? You make this service private, put it behind a load balancer, and make this edge server talk to your database, or maybe make an API call periodically to get the channel information.

**[02:41:30] Student 4:** Got it.

**[02:41:31] Student 1:** Thanks.

<!-- chunk_14 02:41:34-02:54:33 -->

**[02:41:34] Student 1:** Yeah. So I was thinking of another way of designing it. So we can have one service which tells the server that you have to send this message to this client.

**[02:41:43] Teacher (answer):** That's all right. We can have every time you're making call to that service to tell which server to send it far too expensive. Then that's not real time because then that service is [unclear: "oververted"].

**[02:41:54] Student 1:** [check: diarization seam] do that, that's not at all real time. Okay, so I was thinking like it can, like it can [?cache | asr: "catch"] the

**[02:42:01] Teacher:** [check: diarization seam] users data which is still slow, still slow, making a network call every time to get it where to send it, very slow, never. See, it depends. Like you can build it that way, you can also make a call to DB and get it and build it. It's about how real time you want this to be, and making a call to a service just to get that information every time. I wouldn't build it when I'm building a real time communication. I would just want to do a build a very simple system. Just adding a service for the sake of it, just to tell you where to forward it to is an over. I can very well store this information over here. Right. Not just part of a service.

> **Student Question [02:42:40] - Student 1:** Okay. And another question was that in this system, we are guaranteeing that if, if user sends a message, we will persist it. But the notification to all the users is not guaranteed right now. Right. It might happen that the message gets lost in the Redis. Like when Redis is transferring it to the server, but when the user refreshes it, he will get it.

**[02:43:00] Student?:** Correct.

**[02:43:01] Student 1:** Yeah. So the notification part is not guaranteed there, but the persistence is guaranteed.

**[02:43:06] Teacher (answer):** Persistence is guaranteed. Yeah. Enterprise application, persistence guaranteed. More important. Right. Yeah. Thanks. Vikram.

### [02:43:14] Subscribing WebSocket servers to channels

> **Student Question [02:43:14] - Student 3 (Vikram):** Yes. So I didn't, so I had some confusion in the, that the, that the WebSocket servers are subscribing for a channel to the Redis Pub/Sub, right? So what, what if there are, means lots of users and lots of different organizations. So how do we keep track of which channels and just subscribe?

**[02:43:33] Teacher (answer):** That's exactly the, I said, this is not just one Redis instance. These are multiple Redis, a cluster of Redis, right? And what this [?balancer | asr: "balance"] service would try to keep it all users to be connected on one edge, users of an organization connected to one server, so that you do this minimal transfer on this Redis. That's the job of this balancer, right? Because you can very easily do this, right? When a user comes up and says, "Hey, I'm part of this organization. Where should I connect?" [?the balancer | asr: "to balance or"] always sends IP address of this one edge server only. Yeah. And everyone of that one organization connects to that one edge server. You minimize the IO happening on this [?Redis | asr: "studies"], but in any case, this can be clustered. Okay. So this is for only worst

**[02:44:11] Student 3:** [check: diarization seam] case, worst case scenario. Yeah, yeah. And another question is, I didn't understand the public, that, that someone said that edge servers are public, this public IP part. Can you please

**[02:44:26] Teacher:** [check: diarization seam] explain if edge server is public what would happen, means anyone can people that can attack, right? How do you prevent it? You put it behind a load balancer. But if you put it behind a load balancer, so you're adding one more hop. So five, five milliseconds of extended latency. If you want that, you put it behind the load balancer. If that latency is not okay for you, you, you basically keep it public. Both are fine. Yeah.

**[02:44:51] Student 3:** But we are keeping the servers open, assigning public address

**[02:44:57] Teacher:** because we are making it public. Yeah. And that's fine because there is no sensitive information here. Right. There is no sensitivity because all it is there is just one route for this balancer service which just spits out IP addresses, a bunch of TCP connections connected to it, and one connection string for Kafka that also does not hold any secret. It just pushes the message. Nothing fancy over here. So you can keep it either way. You can keep it public on the internet with minimal critical things over here, or put it behind a load balancer, take the three or five millisecond extra latency or extra hop, and do it either way is fine. Yeah. Okay.

### [02:45:44] Redis Pub/Sub vs Kafka

> **Student Question [02:45:44] - Student 3:** Yeah. From what it seems like, can we conclude that Redis Pub/Sub and Kafka kind of same?

**[02:45:51] Teacher (answer):** No. Persistence, real time Pub/Sub, Kafka gives you.

**[02:45:57] Student 3:** So, so the, and Kafka is asynchronous. That's it. Right.

**[02:46:03] Teacher:** I don't know what to be as synchronous. People pull, Kafka is a pull-based thing. People, consumers pull message from Kafka. Redis Pub/Sub pushes message. It's very different. Redis pushes the message to everyone connected. Kafka gives a persistence of historical messages. Redis gives you zero persistence on Pub/Sub. Big changes. Right. Okay. So it's, it's superior to Kafka? No, nothing is superior. Nothing is inferior. Kafka is good in its own space. Is good in its own space. Because superior [?Redis | asr: "read"] in case of what? Right. In case of real time, yes, Redis is superior. In case of persistence, yes, Kafka is superior. There is no one answer for all the questions. Right. Very contextual.

> **Student Question [02:46:48] - Student 3:** And for the second communication approach that we discussed on, when a user sends message to a server, which goes through Kafka and then to [?DBs | asr: "DDs"], it so happened that the messaging service workers pick up the message from Kafka, or let's say topic, a day after it was actually sent. So I can actually receive the message a day after it was actually sent. It can happen in the worst case.

**[02:47:14] Teacher (answer):** No, no, no. But you, in this approach, you get a message, you process in Kafka and immediately send a notification to the user. So user would see it, but when refreshes the page, user would not see that message because real-time thing is gone, in persistent storage is no message yet. So if this does delay in processing, the source of truth does not have the data yet. So when user refreshes the page, he or she would not see the message.

**[02:47:40] Student 3:** Yeah. So yeah, it can so happen that the actual message gets delivered a day after it was actually sent.

**[02:47:47] Teacher:** Not delivered, stored. Delivered to immediately. Stored. Is there, right? Okay. Thanks. Hey, Matt. [check: name]

**[02:47:56] Student 4:** Yes.

> **Student Question [02:47:58] - Student 6:** Hi, Arpit. to understand how it will be different for like a streaming system. It looks like something similar to this. Are we going to cover what is streaming?

**[02:48:09] Teacher:** What is streaming system?

**[02:48:10] Student 6:** Any streaming, let's say like Hotstar streaming.

**[02:48:14] Teacher (answer):** No, no, no, no, no, no. We'll not discuss that. We'll not. That is very different. Hotstar live streaming is very different. We'll touch upon few bits and pieces of it in week seven, but not this part. This is just real time text communication. So scope is very well defined over here. And live streaming very different. Just go through a [unclear: "randomized"] documentation. You'll see how to do that. [unclear: "A come my"] documentation is very good, but we'll touch upon that in seventh week. Any six or seventh week. Thank you. Harsh.

> **Student Question [02:48:40] - Student 9 (Harsh):** Yeah. Hi. So, in today's example, what would be the best way to do this?

**[02:48:47] Teacher (answer):** There is no best way. I given all possible cases. Now you think on your guarantees, what you'd pick. There is no one way to build it.

**[02:48:58] Student 9:** Okay. So we can do either based on users or. Correct.

**[02:49:04] Teacher:** So you do it the type of guarantees you would want to ensure. Right? The kind of guarantees you are providing to your customers. You build your system accordingly, which is why I kept it very open-ended. I gave you three types of messaging thing. I gave you three, I gave you three types of persistence, different types of communication, different types of privacy thing. I have laid an entire buffet. It's for you to create your own plate, whatever works for you.

> **Student Question [02:49:28] - Student 9:** Okay. And one more question. So recently I was working on that multi-level marketing where this complete hierarchy is stored. So by the time it is really becoming difficult to do in relational database. So today I think it would be better to use the graph. They will be there. Right.

**[02:49:46] Teacher (answer):** If it's becoming painful, and because there you might need to store that entire tree and find a third level depth or fifth level depth or 10th level depth. Right. In that case, graph database might make much more sense than relational, because then joins and queries and self joins become a pain when you are driving it like this. 10 level [?deep | asr: "D"], nine self joins on a database is messy. Like you typically don't want to do that.

**[02:50:09] Student 9:** Okay. I got it. Thank you.

**[02:50:11] Teacher:** Yeah. Devasheesh.

### [02:50:15] Message deletion

> **Student Question [02:50:15] - Student 6:** Yeah. Hi. My question was on message deletion and on what flow it would follow. Like I'm thinking like, because message deletion has to be sort of, sort of synchronous with, with both the flows. Like a user can't be receiving a deletion notification, then refreshing later, and that messaging up to you.

**[02:50:38] Teacher:** Do you really get deletion notification? No.

**[02:50:41] Student 6:** So like on WhatsApp, like when somebody deletes a message, it gets deleted immediately, right? So if we depend on workers, you said that there could be a delay like this. [check: diarization seam] Yeah, correct, correct.

**[02:50:53] Teacher:** So does not store anything. WhatsApp does not store anything, FYI.

**[02:50:58] Student 6:** Okay, it happens like this. Done. Yes. Like, so, so even Slack, like if you delete a message on Slack, right, like it, like this, it needs to go for, yeah, okay. [check: diarization seam] Persistence more important in case of

**[02:51:13] Teacher (answer):** Slack. Right. See, that's the beauty of this. I can extend any solution, any question that you ask, I can extend it over here. Very simply. Right. Depending on the, and now here you can very clearly see the beauty of this. Depending on the guarantees, you just alter your approach. Right. Either this in case of the actual WhatsApp that we use. Right. Otherwise you can just add a message that I delete this message permanently and then just delete it from the user's local storage. Right. So it's deleted from here and here. Right. Otherwise, if you're talking about Slack, you go over here, delete and tell the user that it's deleted. And in case you'd want to real-time communicate to your user, you delete, you send, you notify the user that now it's deleted. Either, you just have to roam around in this area. That's the beauty.

> **Student Question [02:52:02] - Student 6:** Yeah. So like, so if this is so easily extensible, why did WhatsApp take so much time to add that feature?

**[02:52:10] Teacher (answer):** for me to say harder for them to implement now. See, [unclear: "giving gya ni giri"]. So which is what I said, although I covered three, it took me three and a half months to build a real-time text-based chat system. Right? I went this entire, or did this entire analysis, and then it took me three and a half months, three engineer team to build it. It takes time. Right? And plus doing it in WhatsApp scale is humongous. It's humongous. Right? It's not as easy. There is a lot of hierarchy stuff. Do we really need this? How to do it the best way? Staggered rollout and all. So it took them time to do it.

[02:52:50] But were they even planning to support deletion? When a product manager got it and said, "Hey, let's say we allow users to delete message." From that time till it is implemented, there will be quite a few things that would happen. So that's why. But if you know your requirements clearly, easy. If you know that you now have to support deletion of messages, it might just be like 100-200 lines of code change if they went with this architecture. Not much. But then do they really want to do it? Is this the best way? Do they really want to show it this way? All those other stuff comes in. So in most cases, if they were having this architecture, their code changes would have been, like the backend code changes would have been hardly 200 300 lines, not more than that, if they were with this architecture. Nothing. When deletion happens, one event sent, they would have already established this. One event stored over here, one notification stored over, sent over here, that's it. But to reach to that, is this the best way, staggered rollouts and all, that takes. Right. Thanks. Yeah. But again, highly recommend you to implement this. Like just work with WebSockets and try to do that, mimic that message deleted, see it in UI. Like you'll have fun.

### [02:54:08] Message ordering and exactly-once semantics

> **Student Question [02:54:08] - Student 7:** Yeah, yeah. Abhishek, I think we talked about delivering the messages, but how, like how can we think about ordering these messages and this exactly-once semantics? [check: diarization seam] Yeah, who said exactly-once

**[02:54:24] Teacher (answer):** semantics is there? Why are we adding that exactly-once semantics? Like in the enterprise, you said, right?

<!-- chunk_15 02:54:33-03:07:44 -->

**[02:54:33] Student 7:** You, you, first is you'll, you'll have to maintain the communication dialogue, right?

**[02:54:37] Teacher:** Correct.

**[02:54:37] Student 7:** What communication I'm doing, right? I need to have that, a message to be ordered at least in that way. So that the, okay.

**[02:54:46] Teacher:** Okay. Let's say the front end is yours. You have built a front end. Correct. So given that, who said that message has to be up and down? Who said? No one, right? Your front end insert the message in the middle. What's the problem? Correct. It's no problem. And you think about message ordering where it is [unclear: "almost up and"] only where it is [?a must | asr: "almost"] you are processing the message one after another, their message ordering is important. Here. Let's say user A sent two messages, message one, message two. Message [unclear: "Page"] two somehow reached user B first and then message one came. First render it one below other. When user refreshes it, you change the order, because the order in which it is stored in the database is the source of truth for you. You order it one below other, user would say something seems wrong over here. You refresh the page, order will get fixed. Case number one. Correct.

[02:55:56] Case number two, when you have your default order of messages by timestamp, when you receive a message, message two is having a larger timestamp than message one. So first, let's say you receive message two, then you receive message one, but the React state that you are maintaining is always ordered by timestamp. So instead of appending it at the end of the array, you insert it in the middle. And when you do that, your state would just flick a bit and you would just see a message just entered in the between. But if that's okay for your user experience, you do that. Okay. Now you tell me what's the problem.

**[02:56:33] Student 7:** Sure. In fact, like I'm telling you from this experience, right? So we are using a Microsoft Teams over here. And at times I've seen that if I, if I do a communication, right? The receiver side, they actually get the in-ordered messages. It takes time and maybe eventually they do reshuffle it and then keep that order. But initially, sometimes you'll not get messages. Sometimes you'll get duplicate messages and sometimes you'll get out of order messages.

**[02:57:04] Teacher:** So now you can very clearly put it in this architecture. If you're getting duplicate messages, which means that they might not be waiting for the persistence to happen. So they might not go this route. They might first be broadcasting it to you and then eventually persisting. Quite possible. Right. What we [?ensured | asr: "enjoyed"] was we first store, once we are [?sure | asr: "short"], then we tell the other user that this is there. Right. First case, either they are doing directly like this by ensuring persistence through asynchronous or synchronous manner. Any case, or they might be having a retry on the [?WebSocket | asr: "web software"] server that they are having. Even if they think that message is not delivered, but it was actually delivered. You might see a glitch over here as well. Right.

[02:57:45] And then when you refresh, and then when you say that after some time it automatically gets ordered, assuming that you refresh the page, the actual source of truth API gets called and it fills it. So you get that. But in case, let's say you don't refresh the page, they might be having a background job that is continuously checking if the message ordering is correct. For example, let's say every one minute you make a call to your back end, actual HTTP back end, to fetch the last 50 messages that you receive, and you just see if all of them are there on the UI or not and reorder if needed. Right? All. [unclear: "10 na?"] Problem solved.

> **Student Question [02:58:21] - Student 7:** Just one question. So you say that for us right now, the order is the time when I'm persisting it, right, in the DB, because that is how I'll tell you what is my source of truth. Exactly. [check: "Exactly." possibly Teacher back-channel - diarization] But let's say even the source of truth depends on what parameter you are deciding, right, to store it in the DB. Like you used a timestamp.

**[02:58:41] Teacher (answer):** No, time stamp is exactly the time at which, no, no, it's for me in the DB. It's always the DB insertion time, whatever it is, whatever is the clock on the DB is the time at which I'm inserting.

**[02:58:53] Student 7:** Yeah. But then that is not the actual, let's say even the message, have a like incorrect time stamp itself.

**[02:59:01] Teacher:** So you are sending time from the client side? Are you sending message from the client side? Are you sending time from the client side?

**[02:59:11] Student 7:** Yes, yes.

**[02:59:12] Teacher:** My first question is why? Why do you want to send timestamps from the client? You should never do that when you're processing the message on the database. Whatever time is there on the database is the source of truth for you. You should never rely on timestamps. I can just change my clock to like 1 January 1970. Right? Never [unclear: "leave that school."]

**[02:59:36] Student 7:** If I say, "Hey, hi, hello." Okay. All three at the same time from the client side and you, they would never happen on the [check: diarization seam - "they would never happen on the" may be the Teacher, continued at 02:59:44]

**[02:59:44] Teacher:** same time on the client side. Right. There would always be some time difference. "Hey, hi, hello." It would take time for you to type, time for you to say, you can never send it at the exact same time. Correct. It's not possible.

**[03:00:02] Student 7:** Right. But let's say due to the network latency, you still happen to receive the third message first. Right? That's perfectly fine.

**[03:00:11] Teacher:** So then that's a source of truth. Whatever I received, whatever I received at my database, that's a source of truth for me. If you would want to make it overly complicated, use CRDT to merge to conflict resolution. Use vector clocks on the client side. Why? Why would you want to do that? I'll give you a solution to that. Use vector clock on the client side. Have your, have each [?client | asr: "plan"] have its own vector clock, which can persist in the database. Is this worth it? No. Having the complexity of maintaining vector clock, doing the merge conflicts when you read it slows down your entire system. Why? No one does that. Keep things simple. One edge case, clearly you do not re-architect your entire [unclear: "sub"], you do not add all sorts of random fancy stuff, vector clocks and all. You don't do that.

[03:01:03] Designing very realistic system, very realistic. Theoretically I can find 100 [?loopholes | asr: "root holes"] in this, but practically there are none, [unclear: "none as it"] there are few, but it's okay to live with that, right? What are the chances that that could happen, right? Think on realistic terms. Do you really need that? If yes, then implement it. I'll give you answer: look for vector clocks, that's the answer to the problem, and see the implementation, how complicated your architecture will become or your implementation would become. Good, immediately give up on that. But vector clock is the answer in case you're looking for that. Then that's a globally [?consistent | asr: "accounted"] vector clock per client. Massive problem. No one does that. Right. Interested, look out for vector clock, a globally consistent vector clock implementation. You'll see where the problem starts to begin. Rajiv.

### [03:02:02] DB node failure, replication and lost writes

> **Student Question [03:02:02] - Student 5 (Rajiv):** I was thinking from DB front now, just give a thought that it's a master-slave architecture replication. Because we went through.

**[03:02:09] Teacher (answer):** Where is replication? There's just sharded. You can have replicas if you want, but typical sharded would work. Replication, I don't see a need there anyway.

**[03:02:17] Student 5:** I was thinking from, from point where if let's say a DB node goes down, I mean, a single node is there, if it goes down, and in the process where the write was being written over there, it went down to some reason. With, since we told that the message persistence is of importance over here, a message got lost. It didn't write to the DB that some bad thing happened. How do we recover from that?

**[03:02:40] Teacher (answer):** No. So you would always have standby nodes. You would have replication factor three-way persistent. See, depending on the critical. So you would not just have one node. If your data is so important, you would have replication factor. You would have inter-replicated databases. For example, when you're writing, you're writing a three different databases, three different data nodes. If one node goes down, other nodes can serve the data, which what DynamoDB does internally. Right? You make a database that gives you those guarantees. No, no. No, no. You cannot read from Kafka. You would already processed the messages.

**[03:03:09] Student 5:** The workers actually read it and you call commit over there. Kafka is done there. Then the workers pushed two, three different instances of 30 different DB instances across different regions internally.

**[03:03:19] Teacher:** Your worker is not doing that, database is doing database. No, database storage engine is doing that. You, your workers would not push it two, three databases, that's worse. Your storage engine does that. Your database is replicated database. Your database is a distributed database. So this database internally has a bunch of storage nodes that we are talking about. And this writes, your write comes to one data node. It replicates it to two different. So if one node goes down, other node can serve the data.

**[03:03:45] Student 5:** No, I was saying that by the time it was serving the write request, it then get published to different, different replicate replications, right? [?Replicated nodes | asr: "depicted notes"]. It just got lost.

**[03:03:56] Teacher:** Then you would never commit. Then you would never say that you accepted the write. You would always say, when you wrote it to three different places, then you do it.

**[03:04:03] Student 5:** To whom? To the worker, right? To the worker. Yeah, to the worker.

**[03:04:06] Teacher:** Yeah.

**[03:04:07] Student 5:** And then if, let's say worker doesn't hold the, okay, so worker actually holds the state, holds the message until unless the DB commits it. Correct. Correct. [check: "Correct. Correct." possibly Teacher back-channel - diarization] And then retry it after that.

**[03:04:16] Teacher:** Your DB would never say that I am done unless it is written in three different places. And I'm talking going very deep into distributed database implementation. Right? Yeah.

**[03:04:25] Student 5:** And eventually if worker goes down and it doesn't, hasn't, hasn't done a... So you'd reprocess it. All is hold it over. Everything is held over there. A worker has held the state and the DB has committed. Okay.

**[03:04:37] Student 16:** Yes.

**[03:04:38] Student 5:** Okay. Okay.

**[03:04:39] Teacher:** So, which is exactly what distributed databases do, like DynamoDB exactly does that. When you write to a DynamoDB, internally it gets written to three different storage nodes. And once it has completed writing to three different nodes, then only it says my write is complete. Until then it does not say [?write | asr: "right"]. It's complicated.

### [03:04:54] Sharing a database between workers and API servers

> **Student Question [03:04:54] - Student 5:** Okay. Three is the, is the right figure. And one more thing, we had shared the database between the workers and the API servers. So sharing a database has its own sort of, I mean, we are [?writing | asr: "adding"] from one flow, reading from one flow.

**[03:05:10] Teacher (answer):** Is it like, I mean, how to do that, right? Why would make a call to API and then API writes a server? Unnecessary complication. Imagine making a network call over here to write it over here. No, sharing a database is fine. Perfectly fine.

**[03:05:25] Student 5:** I mean, sharing a database, having their own database. I mean, we would like to understand more.

**[03:05:31] Teacher:** I have a video on it. I have a video on it. Microservices playlist. I have a video on it. [check: possible ASR duplicate - "I have a video on it." x3 within 3 s] Exactly this topic. What's that? And it's perfectly fine. It's perfectly fine to share a database. I like, I hate that anti-pattern where every microservice needs to have a separate database. No, I want performance from my system. I want cost efficiency of my system. Right? Do it for me. Business and product comes first, engineering is all okay, right? Because business there, then our jobs are there, otherwise we are all laid off, right? So I would do whatever it takes to keep the cost down and get the max performance out of my system. Sharing a database, fine with me, perfectly fine, I have no problem in that. But in case you want to dive deeper, the microservices playlist that I have on my YouTube, I've talked about the sharing database as a pattern, advantages, disadvantages, separate databases, why to do it. 17, 18 videos are there in that series. Two of them are basically around this topic, right. You'll find it. Okay. Thank you.

### [03:06:29] End-to-end encryption and public keys

> **Student Question [03:06:29] - Student 5:** Yeah. Hi, so taking an example of WhatsApp. So in that, chats are end-to-end encrypted. So whenever a user is created or added to a channel or, or a group, so it needs... So our WebSocket need to push the public key for all the other persons which are present in that group. So it needs to get these public key from the database. So how are we? So in this case, we have to access the database.

**[03:07:05] Teacher (answer):** I don't have any experience around public key encryption. I don't know Signal protocol well, so I cannot [?comment | asr: "commit"] on it. I have no idea how that works, what keys it needs to decrypt it, how it gets old messages. I have no idea, no idea, because end-to-end encryption, I know protocol of it. I know Signal protocol a bit. WhatsApp uses a variant of it, 100%, but I don't know what all information it needs, how it processes that, no idea about it. So not in a position to comment on it at all. Whatever I say would be 100%. Okay.

**[03:07:39] Student 14:** Thanks. Thanks.

**[03:07:41] Teacher:** Sampat. [check: name]

<!-- chunk_16 03:07:44-03:15:29 -->

### [03:07:44] Channel type in the schema

> **Student Question [03:07:44] - Student 2 (Sampat):** So my question is about the DB schema where we were designing the channel DB schema. So what was the reason we are storing the type of the channel? Explicitly like, Revisit your recording. Revisit. Let me, sorry, my question didn't come from. [check: "Revisit your recording. Revisit." may be the Teacher speaking (diarization)] So why did we choose to store the type of the channel? Like whether it's a DM or it's like a channel channel?

**[03:08:10] Teacher (answer):** You can render it on the UI. That's what I said, right? You could render it on the UI accordingly.

**[03:08:15] Student 2:** Rather, we could have just stored it, whether it's a private or public and then everything since it's a channel. So it can have multiple members, whether it's two or more, or if it's private, then it's basically a DM. If it's a private channel or it's a public channel, it's a public.

**[03:08:33] Teacher:** How will you differentiate between a channel with two people and a DM?

**[03:08:38] Student 2:** Okay. So everything is a channel and our channel consists of two members, but if it's a public, then it's a channel. If I can also create a private channel with two people contact, you can create a private [check: diarization seam - sentence continues in the Teacher's turn]

**[03:08:54] Teacher:** channel with, yes, [unclear: "the same whole"], and then add more people to that. But in DM, I cannot add more people to that. Correct. I need different ways to render it on the UI. That's what I said. Right.

**[03:09:07] Student 17:** Okay.

**[03:09:09] Teacher:** were going, I knew where you were going. I knew where the confusion was. That's exactly what I said. I covered it already. Right. To render it on the UI private channel with two people also exist. DM with two people also exist private channel, two people, public channel, two people, DM, two people, DM can also be made private or can also be made public tomorrow if they want to. Right. You just want to keep things extensible. That's why

**[03:09:32] Student 4:** [unclear: "you are type two."] [check: diarization seam - "you are type two" may end the Teacher's sentence] Okay. Okay. I understand.

**[03:09:38] Teacher:** I have this tendency because I know I'll just work on that point taken. Sorry. Sorry for that. No issues. Yeah. [check: speaker - "I have this tendency ... Sorry for that." may be the student]

### [03:09:51] Six concurrent connections across tabs

> **Student Question [03:09:51] - Student 10:** So, why when we're talking about WebSockets, you talked about the client has a limit of six concurrent connections. So is it shared among the tabs? Yeah. So, so like, for example, like Google is there. So it, it has lots of applications in sub domain. Like maps.google.com.

**[03:10:15] Teacher (answer):** Sub domain is the one. So mail.com chat.com. Oh, sorry. Basically chat.google.com. So it's at the domain level. So when I said, when people say domain, it's the entire domain, the host name of it. So it may include multiple levels of sub domain dot main TLD, main domain dot TLD. Thing that has to be so six connection for Gmail, six connection for chat, six connection for Meet, six connection for something, right? The host name matters. Okay.

**[~03:10:39] Student?:** Got it, got it, thanks.

### [03:10:51] One-on-one request and recording *(admin)*

**[03:10:51] Student 2:** *(admin)* Yeah, hi, I wrote a message to you, so I just raised my hand so that you don't miss my message. I need some time for you with you for 10 minutes after session.

**[03:11:04] Teacher:** *(admin)* Okay, fine. But I'll have to shut the session off. We'll do it afterwards. Just really compile all the questions and basically block one-on-one. That's easy. I have to put it part of recording. I have to start it as soon as possible. Because if my laptop crashes, it's gone. I cannot do that. So just block a one-on-one for that.

**[03:11:24] Student 2:** *(admin)* Just right after the session?

**[03:11:26] Teacher:** *(admin)* No one has fixed time, right? Monday to, Monday to Friday evening time, that time you, you basically compile a list of questions, otherwise just drop me a message on Discord or something, I'll drop your message. That's, that's the easiest, that's the easiest, because I have to trigger the recording in case my laptop crashes, the entire thing is gone. Let's not write this question for the recording then. [check: diarization seam - "Let's not write this question for the recording then" may be Student 2] No, no, that's why, because this entire thing is gone, which is what I am worried about, right? More than not. I cannot lose this. That's why.

[03:11:56] Abhishek? No problem. [check: speaker - "Abhishek? No problem." may be Student 2 addressing the Teacher by name]

### [03:11:59] WebTransport, Slack vs WhatsApp data loading

> **Student Question [03:11:59] - Student 10:** Hey Abhishek, just one last thing. So I think we discussed a lot about [?WebSocket | asr: "web software"], but

> **Student Question [03:12:04] - Student 7:** I have read that there is also a web transport specification coming up, right? Where they're trying to address as an alternative to [?WebSocket | asr: "web software"]. [check: diarization seam - Student 10's sentence continues here, possibly the same student]

**[03:12:13] Teacher (answer):** I'm not sure about it, but thanks for adding. I'll look onto it. Web transport. But in case I find something I'll definitely share. Maybe in. Let me just read about it. I'm not at all. I've heard it for the first time, to be honest. I'll look into it. Thanks.

> **Student Question [03:12:34] - Student 8:** Yeah, I actually wanted to compare two things here. I mean, if I see here, it's a, it's a, it's basically used for real-time communication here and I want to, to compare a Slack and WhatsApp [unclear: "meet my"] implementation in order to load the data. Which, for example, if a user is coming online, there must be some sort of data that we have to share it with the user as soon as it comes up. So let's say for the WhatsApp, it makes sense that, let's say a user comes online, the WebSocket connection is made, it fires an event, and then for that particular user, the old data is being relayed and channeled by a server, and the server data is being refreshed. But for Slack, it is different. And the reason being WhatsApp stores data in the client app. It's user device.

**[03:13:22] Student 13:** Yes.

**[03:13:22] Student 8:** User device. While the Slack stores in the database that is in the backend. Correct. Then I'm just thinking that in that way, the way or the communication channel to refresh the data should be API rather than doing it via [?WebSockets | asr: "web servers"].

**[03:13:37] Teacher (answer):** Correct. You would never see, by the way, on Slack, do you ever see old messages [?relayed | asr: "relate"] to you? No, you just see these are unread messages. Right. That's not coming over WebSocket. So WhatsApp has to get those messages delivered to you on your device, because it is stored as you, as you very rightly said. But on Slack, if you log in, let's say you went on a vacation, you came back, you logged in, you just see, oh my God, there are 200 unread messages. I have to go through. It doesn't send you those messages. It's just there. Which is where the checkpoint that we added in the membership that would help.

**[03:14:13] Student 8:** Yeah. I actually was just thinking that how the difference would be in both the implementations

**[03:14:18] Teacher:** for all the way we were discussing Slack's real-time [unclear: "cover"], but we covered so much around it. And you see how all of the systems are interconnected. It just that few changes here and there. And you get a brand new system out of it. This is one pattern fits everywhere.

**[03:14:39] Student 13:** Thank you.

## [03:14:40] Class close *(admin)*

**[03:14:40] Teacher:** *(admin)* Superb. Great. Alok sir, just stay back on the call. I'll just do it right away. You would be five minutes. Thanks folks for tuning in. I'll upload the recording by evening. Next week distributed systems and ID generators will be shared today to go through them and more importantly, implement, implement everything that is a small hello world. Just small. Especially for Redis Pub/Sub. Use that once. Use that one. It's not really difficult. After 10 minutes of your time, you'll learn much more. You'll see where it does not give you persistence, how it sends, pushes and whatnot. Right. Okay. Thanks folks for tuning. It was fabulous session. One of my best. Thanks. Thanks so much for great questions. See you folks next week. Bye. Bye.

<!-- BODY END -->
