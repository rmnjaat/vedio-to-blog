# Lecture 07 - ETL and CDC, designing a distributed cache, consistent hashing

| | |
|---|---|
| **Source** | lec07.merged.json |
| **Duration** | 03:11:10 |
| **Speakers** | Teacher (TEACHER; most STUDENT_9 turns; per-turn leaks from STUDENT_1/2/4/5); Student 1 (STUDENT_1; Hemant when called); Student 2 (STUDENT_2; Nitin when called); Student 3 (STUDENT_3; Rajiv when called); Student 4 (STUDENT_4; DK or Mohit when called); Student 5 (STUDENT_5; Anubhav when called); Student 6 (STUDENT_6; Gaurav when called); Student 7 (STUDENT_7; Shreya when called); Student 8 (STUDENT_8; Rahul); Student? (STUDENT_10/11/12/16 and uncertain turns). Names are added only on the turn right after the teacher calls them. |
| **Processed** | 2026-10-13 - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | 286 logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | 206 (TERM? 103, UNCLEAR 54, CHECK 32, SPEAKER? 17) - see [review_flags.md](review_flags.md) |
| **Verification** | PASS, retention 99.46%, additions 0.37%, 0 unmatched log rows - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. [00:00:00] Intro - storage engines week and agenda
2. [00:04:35] ETL and CDC
   - [00:04:35] ETL - analytics on a multi-user blogging application
   - [00:10:45] CDC - Change Data Capture
   - [00:15:15] Where can you use CDC
3. [00:20:03] Q&A on CDC
4. [00:31:31] Distributed cache - single node
   - [00:33:26] How will you store the data
   - [00:35:53] Multiple value types
   - [00:42:45] Heap exhaustion and segmentation fault
   - [00:44:51] Capping memory usage - tracking total size
   - [00:53:28] zmalloc
   - [00:55:09] Memory cap and triggering eviction
5. [00:58:02] Eviction strategies - LRU and LFU
   - [01:01:49] Implementing LRU and LFU - map and linked list overhead
   - [01:07:12] Random eviction
   - [01:09:57] When would you use LRU, when would you use LFU
   - [01:12:33] LFU - stock market analogy
6. [01:18:54] Communication protocol
   - [01:22:30] Detour - IoT sensor story, HTTP vs raw TCP
   - [01:29:29] Defining your own protocol - RESP
   - [01:31:54] Low-level implementation so far
7. [01:34:27] Handling TTLs
8. [01:38:52] Scaling and concurrency on a single node
   - [01:39:05] Concurrency - pessimistic locking, optimistic locking, single threadedness
   - [01:40:28] Optimistic locking - compare and swap
   - [01:44:05] Single threadedness
   - [01:45:23] Questions before the break
9. [01:50:12] Break *(admin)*
10. [01:55:18] Making the cache distributed
   - [01:55:50] Storage
   - [01:56:52] Routing
   - [01:59:34] Four ways of routing - the bank analogy
   - [02:07:26] Availability - adding a node
11. [02:08:02] Consistent hashing
   - [02:08:22] Hash based routing and data movement
   - [02:12:00] What consistent hashing solves - ownership
   - [02:17:10] Adding a node
   - [02:19:29] Removing a cache server
   - [02:21:51] Data transfer in practice
   - [02:23:21] Distributed hash table
   - [02:25:47] Kademlia
12. [~02:27:05] High availability
   - [02:28:51] Redis AOF - append only file
   - [02:29:21] Recap - making things distributed
13. [02:30:42] Q&A
   - [02:30:42] Redis routing
   - [02:32:50] Consistent hashing - nodes close in the ring
   - [02:34:43] Virtual nodes
   - [02:39:19] malloc and segfault
   - [02:41:42] CDC instances and load
   - [02:48:22] Growing a set's memory, LRU vs LFU
   - [02:50:24] Adding a new node, virtual nodes
   - [02:52:47] Single-threaded cache and hardware utilization, malloc limits
   - [02:57:29] Shared and exclusive locks
   - [03:03:02] Connection pooling in PHP
14. [03:05:34] Wrap-up and post-class chat *(admin)*

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

<!-- chunk_01 00:00:00-00:12:55 -->

## [00:00:00] Intro - storage engines week and agenda

**[00:00:00] Teacher:** [unclear: "Computer"], great week five day first. My God, time flies. This week is all about storage engines. This is my personal favorite. I can talk about storage engines for hours straight because for some reason, I have this very strong affinity towards databases, towards how distributed storage works, towards how query engines are written, towards how very optimization part has done. For some reason, during my B-Tech courses, during my M-Tech courses, I just went really deep into databases. I don't know how, but it just happened. The one subject that I scored the least, but was my personal favorite, was database systems. I scored a C grade in database systems. I didn't understand a thing, but it was my favorite subject. I struggled in it so much. I could not ace the examination, but I had formed very deep understanding of it.

[00:00:57] Very contrary to what typically happens, but almost all the papers I read somehow are connected to distributed storages and all. So which is where the agenda for today is designing distributed cache and ETL and tiered storages. Distributed cache. Now, what is, what will help you, what will, what has helped me make this discussion better over time, I deep dive into Redis source code. I also have a course on Redis internals, but the learnings that I got while I was going really deep into Redis implementation, how they've structured, not just low level code, but how they've made those certain decisions. It has helped me solidify my understanding of a cache and making [?it distributed | asr: "a distributor"]. All of those learnings will put over here. Obviously that goes very deep into Redis specific, that course, but this is where we would make this every single important design decision, which does not just affect this system, sorry, which does not just affect this system, but almost every single system that [unclear: "we reserve"], it would just open up those blocks, those Lego blocks, those patterns that you can observe and just control C, control V. That's what we have to do. Like some modifications here or there.

[00:02:15] And that's what, you know, over this last four weeks, you would have seen how we covered, why we covered vast variety of systems, but we always talked about those patterns. Those patterns actually help us. Those Lego blocks actually help us because there are only a few limited ways to achieve something. Once you identify it, once you know, hey, I've learned something, this, I can apply it over here. That's what matters. This will cover a bunch of those. Distributed cache and then ETL and tiered storages. This is where I introduced, we go a little deeper into CDCs. Up until now, we just wrote CDC. Now we'll go deeper and we'll understand how tiered storages are built. For tiered storages, I don't know how, but yeah. While I was at Amazon, I used to build something on top of it. Again, from there, I got a deep understanding of what tiered storages are and what happens behind the scenes.

[00:03:12] So this time we'll do things differently. I'll start with ETL. I'll start with tiered storage. Then we talk about distributed cache. The things that I'll start about tiered storages and ETL is just an introduction so that you form those dots in your head. Tomorrow, we'll go into a practical application of ETL and tiered storage. Tomorrow or I think next week, whenever we design Amazon's order system, tiered storages then. But today, just to get that initial ball rolling, just like how I did with Kafka essentials where I covered it, just so that the dots are formed, then we start using it. Similarly, we'll do things over here around ETL and tiered storages. So we'll just understand what these are, what this type of systems are. And then tomorrow or next week, we'll go into detail. We'll take one very detailed example and understand how order system work at Amazon, which would give you an idea of almost how data pipelines are built. So it's all derived from one, like it's all basic derived from one or two.

[00:04:22] Okay. So let's start with tiered storage. Then we take questions. Then we start with distributed cache. We cover low-level implementation detail. Then we go on a break and then [unclear: "file our details"]. That's going to be the flow for today. Okay.

## [00:04:35] ETL and CDC

### [00:04:35] ETL - analytics on a multi-user blogging application

[00:04:35] So let's start simple things that we all understand. Let's start with a simple multi-user blogging application. Nothing fancy. When you start with multi-user blogging application, we typically have, it's day zero, not anything fancy. It's day zero. We typically have a database. We have an API server. We cannot directly expose database to the user. That's why what we have, we have API server. API server talks to the database. Whenever any request comes in and response goes up. So API server is the one that is abstracting out those details of the database complexities and whatnot. Now, when a company launches, they typically don't focus on analytics, metrics and whatnot. It's just when some people use it, DAU, MAU, Google Analytics, they add. But now what happened is to have a deeper understanding of how people are using your product, you would start to measure metrics. Now, these metrics would be, hey, number of blogs published, how many users are active, how many people leave a like in, let's say, first one hour or something. Now, those statistics that you get in most cases or in a day zero architecture, companies just beginning on very early stage, you don't have data warehouses, you don't have anything fancy like that. What you have is you just have a visualization tool like Grafana or a Metabase or Tableau, which is connecting to your system, to your database directly. And you start firing queries on that. It shows very nice visualization what you do. And that's how things work.

[00:06:07] Works very well for Series A, till company, till 10,000, 50,000 users, right? It works just fine. When application grows big, now what happens is, for business to make important decisions, they need data backing. Now, which is where your CEO now wants very detailed reporting on very particular design, a very particular user behavior. Now when you have that, what do you do? Earlier now it was okay. But now who will generate those insights? Which is where CEO recruits insights team or business analyst. Business analyst needs data to analyze the business. Where are they getting this data from? If you expose the same database to those folks, now what would happen? They don't know a thing. This is very risky. They say, oh, I'll only give read-only access. But this has critical information, personally identifiable information. Plus this database might be a NoSQL database like MongoDB. You started with MongoDB because it sounded cool or it sounded cool or it sounded fancy or it suits your use case really well.

[00:07:15] But the insights in that you hired a lot of business analysts, they know SQL. They are champs at SQL. They write very complex SQL queries with ease. And this is not just assumption. This is hard truth, right? Every single data warehouse, Redshift, BigQuery, pick any data lake format, it all supports SQL queries because everyone in the analytics domain is familiar with SQL. So given that there is a mass audience or a mass set of people who know SQL really well, who will do this analysis for you, if you give them direct access to MongoDB, they'll go nuts. They'll have no idea what to do. So now what do you want? Your data is in MongoDB, what should we do? So then you start writing pipeline. You start taking data out of MongoDB and put it into MySQL because that's the only SQL data that you know, right? It's still early times, right? You still don't care about data analysis yet. So you take the data out and you put it into MySQL. Now, but how will data from MongoDB go to MySQL? That's the next question.

[00:08:23] You think, hey, we know Kafka. So from API server, whenever a blog is published, Kafka, from Kafka, you consume it and you put it into MySQL in a particular format. That's the natural progression that you may take. Hey, I have events and I can do this, but is this the best way? Relying on events generated from the API server, is this the best way to populate this database? Hmm. Let's think about it. Can we lose something? There are many things to lose because first of all, there cannot be any data misses between this. You have to ensure data consistency across this data. May not be real time, but eventually. Why? Because business is making decision depending on this data. Because analyst does not have access to this, analyst has access to this. So given this, they cannot, like you cannot have incorrect data. Otherwise, the business is making decision on some wrong data. So you cannot have that.

[00:09:25] Plus, the events that [unclear: "rate"], not everything that is happening in your database or in your application has an event. Blog published, okay. User profile updated, okay. But minor changes like count plus plus, right, or around views that you're increasing, not everything will have an event, because events are very specific or are very contextual for application. It holds the context of the use case, but wherein what we want with raw data. So first of all, not everything has an event and not every event will have everything about it. For example, if I just say blog published, I may just pass in blog ID. It does not have all the data, right? But here you might need it. So then you'd have to write complex logic over here, which goes and [?fetches | asr: "patches"] the detailed information published over it, just unnecessary puts load on this database. So things are becoming messy and messy and messy. So can we do something better? This sounds like an obvious answer, but it is not. There has to be a better way, a much more seamless way. Then we rely on [unclear: "EBS ever"] to push events to Kafka and then we consume it from your business logic. So what can we do?

### [00:10:45] CDC - Change Data Capture

[00:10:45] Which is where CDC comes in. So CDC stands for Change Data Capture. So any changes in data is captured by CDC. Very weird day [check: "Very weird day" - possibly a misheard word or name], but change data capture is the thing. So what happens is there are tools like Airbyte and Debezium. In case you have never heard of it, go install, play around with it. Highly, highly, highly recommend you to implement or set up. At least Airbyte is the easiest one to set up. Set up Airbyte locally and use it. So what this change data capture tools do is instead of relying on API server events, we rely on the actual source of truth, the database itself. That is change data capture. So change data capture typically, and it's not a hard rule per se, but change data capture typically lets you configure your source databases, your transformation logic, and your sink databases. So what it does is it pulls the data from the source database and puts it into sink database in the format that you would want. Because it is operating on the database itself, what would happen is it is okay. Your application server does not have an event for it. Still that updates will be captured and will be pushed onto this other database.

[00:12:06] It's okay if your application server while pushing the event crashed. So you will not lose the data because you are relying on the source of. This is the highlight of change data capture. So typically it's not a hard rule. You may find some plugins that works other way, but it's a very common concept that change data capture works on databases. It keeps track. Internally, it keeps track up until these rows. I've read this database or this column was updated. So I'll update it over here. It reads tables row by row. One way to do it. It reads table by the commit log or the bin log, which is the WAL file that we have. Anytime you commit something, it gets added to the WAL file. Change data capture literally reads that WAL file and pushes the changes to this other database.

<!-- chunk_02 00:12:55-00:25:34 -->

**[00:12:55] Teacher:** what kind of bindings a particular database offers. For example, MongoDB might choose not to expose the commit log file. So then change data capture will rely on iterating collections. Elasticsearch doesn't offer, so it relies on iterating collections. MySQL has bin log support. It exposes WAL file. Change data capture directly reads that WAL file. So for you, it does not matter how the data is read from the database. What you know is on this tool, I configure this database as my source and this other data is a sink. I define a transformation and it just data flows like that. Now, in case this DB is down, then the data will not be captured. But once this DB is back up, it will resume from that point. That's the job of these tools. So instead of relying on API server to push something, you are literally relying on the directly on the direct source of truth that you have. This what makes change data capture invaluable. Everyone uses it. Everyone. Okay.

[00:14:00] Now here in the diagram that I drew, I just drew this as boxes. It goes from one DB pushes it into another, but it's not that your sink should always be a database. You can have a Kafka as a sink. So whatever plugin this Airbyte or Debezium supports, take that. From a source, this is sink. Sink can be Kafka, SQS, Kinesis, local disk, certain number of databases and whatnot. You can configure literally anything there. So these are two really good projects. Airbyte and Debezium. Check that out. Run it locally, both open source. Run it locally and just play around with it. See how it works. See what change data capture does. See how you have to configure it. See what kind of format you get data in. See how you transform the data and you push it some. So CDC is a great way to have to build replication across databases with some basic transformation in between. For bigger things, there is Spark and all which we will cover when we talk about data engineering basics mostly next week. I forgot either tomorrow or next week. Mostly next week by then. But this is the concept of change data capture that instead of relying on API servers to do this, you'd rely directly on the source of truth to capture the data and push it somewhere.

### [00:15:15] Where can you use CDC

[00:15:15] Change data capture, right? Okay. Now where can you use it? You can see a lot of systems that we build where we were using Kafka to do something like [?API server | asr: "apso"] pushing to Kafka, reading from that and doing something. A lot of things can be changed through CDC, right? It does not mean one is better than the other. Start with any, whatever works for you works for you. In some cases you can rely on database events, but in some cases you need application context. So in that case you would have to do it with API server pushing it to Kafka. In some cases when it's just raw data that you are playing with, that's typically this is what the bifurcation is. Whenever you are playing with the raw data you typically refer, you typically go for CDC. If you want to do it on the contextual side that, hey, when this particular event happens as my API, on my API server I'll ingest it into Kafka or something, right. Different. But in general, just to give you a very high level overview of where, how this fits into the grand scheme of things, for example, let's say you have a transactional DB and you have your search service. Now you want your data from the transactional DB to move to your search service. Search is written in Elasticsearch, transaction is in MySQL. Now how do you populate the data from here to here? You may choose go with that Kafka way, right, that we always do, API server sending an event, consuming it and ingesting it to Elasticsearch server. Other way to do it is with CDC. You may have to write your own transformation logic. When you explore the tools, you will understand better, but you can also use CDC to build this exact same thing, which reads from MySQL and puts it into Elasticsearch with an optional transformation. So this way the sync between the two database is maintained by the CDC.

[00:17:04] Similarly, now let's say from MySQL, you want to move data to a data warehouse. Let's say Redshift. So what you can do is you can have CDC, this relational database, this relational database, you just copy the data over here and CDC takes care of it. You don't have to worry about it. Now imagine if you are not relying on database to read the data for data warehouse and you relied on API servers. Now what would have happened? Let's say a new table is added or a new use case is added, for everything you had to remember. Oh my God, have I added event to Kafka or not? Did I do this? Did I do that? That's very inefficient, right? Operating on raw data, it can do bulk fetch, bulk ingest in Redshift and what not. Those are the optimizations that CDCs can do for you. It can read bulk rows from here and push bulk rows over here. If it was with application context, like every blog published, one event, slowly consuming it and putting it out. Very slow. We are just taking the raw data and putting it somewhere just to maintain that same. CDCs are the way to.

[00:18:10] Interesting design where CDC is coming [?into picture | asr: "to pitch"]. It's, let's say you want to take data from a [?Redshift | asr: "restaurant"] and put it into S3. It's not an S3 is not a database, but you still want to take data from a transactional, from a data warehouse and put it into S3. This can also be done by CDC. Obviously, Redshift gives you those plugins to automatically do that, but I'm explicitly putting it over here so that you understand that S3, like it has plugins, which can put data into S3 in a particular form, which is where you'd... You see CDC is coming in very handy at a lot of places, a lot of places. Right. Okay. And this is what I just wanted to form dots in your head. Explore Airbyte a bit. Explore Debezium a bit. See how they are configured. What plugins they support. YouTube. Go to YouTube. Search for Airbyte example. Search for Debezium example. You'll see bunch of videos explaining how they are configured, what they do. Understand those use cases. Right. This is just an introduction. Just an introduction.

[00:19:07] We will use this very heavily when we design next systems tomorrow and the next week, where we see how data engineering architectures are set up, how multi-tiered storages are used. We'll build on multi-tiered storage as well. You'll see where CDCs come into picture. But this is just a very gentle introduction so that it brings everyone onto the same page that you explore the stream because this matters a ton. At lot of places where I happen to be consulting for a couple of organization, made this mistake, they made this very mistake. They wanted data sync, they were doing it with Kafka. They said our infrastructure cost is high. I just went there, suggested them switch to CDC. It brought down their particular infra cost by that particular infra cost by 80 percent and with much more reliability, right? These are the things that matter. So these are just initial dots that I want all of you to form and explore the tools on the site, right? Okay, any questions on this? We'll take questions till 9 26 and then... yeah, Rahul, go on.

## [00:20:03] Q&A on CDC

> **Student Question [~00:20:03] - Student 8 (Rahul):** So basically what I wanted to ask is, basically, are the same, are the CDC's reading WAL, WAL files or like WAL directory via Postgres client, or like it has instance level access to it, does it with [check: speaker boundary - "does it with" may be the start of the teacher's answer "Postgres client"]

**[00:20:27] Teacher (answer):** Postgres client. It does it with Postgres client. In some cases, there is a chance of extracting those WAL files and putting it and then processing it. There are plugins that do that as well. But the most basic configuration that you will find is via Postgres client. And it depends on the plugin that you're using. That's why I'm saying it's just a tool which just keeps track that this is what I'm reading, this is where I'm writing, this is what my checkpoint is. So there is no hardened bound rule. But to answer your question in a very general way, a naive way to do it is with, not really naive, but a decent way to do it is with using the database client that they use. But you will find plugins that does it the other way.

> **Student Question [00:21:12] - Student 8:** What do you think is the most efficient in those two methods?

**[00:21:18] Teacher (answer):** Doing it with client is better because if tomorrow they change the format of bin log or commit log, your plugin doesn't need to be updated. So that Postgres client will seamlessly handle it, decoding the file and whatnot. And it does not put a lot of load. If you're thinking of load, it does not put a lot of load because it's just a sequential read. And you can also configure it on a replica. You don't have to configure it on master. So just spin up a new replica. From that replica, configure a CDC. So that just chops down your load or your master database. So doing it with Postgres client is much, much better.

> **Student Question [00:21:59] - Student 2:** Can you please elaborate a little bit about the use case you were telling us about, like you brought down the infrastructure cost of certain organization by 80%?

**[00:22:10] Teacher (answer):** No, only for this component. So not entire cost, not entire infra cost, this infra cost of this subsystem that they... right? So what they did, they used to push from API servers, they used to push it to Kafka every single thing. From Kafka they used to write consumers, they used to put data into other database, right? Now what used to happen was every single update required them one event in Kafka, consumed by a bunch of workers. They were writing, they were transforming it in the consumers and putting it into that other database. Now, because the transformation logic was very simple, but they were still doing one read at a time because API server was pushing it to Kafka, and one write onto this DB, right? Now what happened because of this, that even they could batch it, they were not able to batch it because that's how they thought systems are built. So they read one, one event in Kafka, one event goes to consumer, one [?write | asr: "right"] happened to deal with some basic transformation. So they did not leverage batching at all. So they required large number of machines to just deal with the coming in, just the incoming traffic that they were having. So their number of consumers were more than 60 consumers, like 60 32 gigs machine. Huge number, huge number, right? They had, they didn't have to worry about that at all. They could have literally just... So then what I suggested, because your transformation was simple. Read as CDC, configure a simple CDC over there in your Airbyte. So I recommended them to use Airbyte. Write a simple transformation logic and directly ingest it into other database because both the database had plugins with Airbyte. And this way, their entire workload was just done in two machines. From 60 machines and a Kafka, it got brought down to just two simple EC2 instances. That's it.

> **Student Question [00:24:15] - Student 2:** So they, from the solution, they had like reduced this cost, but did they lose something in terms of performance?

**[00:24:24] Teacher (answer):** They gained performance. Because now the replication lag is bare minimum. Because it's very fast. These tools written in Java, they are multi-threaded, they fetch in parallel, updates, they are heavily optimized to do these minor transformations. Reading is very fast, checkpointing is fast and [unclear: "pushy get"] is fast. So they did not even realize that they were losing out on data. They had no clue. Their databases were out of sync and they had no idea. But after I pointed, they said, we'll write a cron job to put them in sync. They said, it's okay if we lose data. They stop losing data as well because CDC keeps track of which rows or which documents or which entities are captured and put there, right? So it does that checkpointing for you in a sequential way. That's how you gained a ton of benefits out of it, no loss, rather than the performance better

> **Student Question [00:25:21] - Student 2:** [check: speaker boundary] Because of this, [?batching | asr: "foot patching"] would have solved, like if they have batched a certain number of events together and do the processing.

<!-- chunk_03 00:25:34-00:36:15 -->

**[00:25:34] Teacher (answer):** It would not have been as worse as it was. They were doing one at a time because that's the most basic thing that they could write. So they just went out with that. And it was a legacy architecture. When they started, they went with this, the company scaled but they did not change it. So they were just living with that. And you know, there is always a service. No one touches that ever. This was one of them.

> **Student Question [00:26:01] - Student 2:** Got it. So one other thing, what if the CDC was implemented from a read replica?

**[00:26:11] Teacher? (answer):** It's fine. Works just fine.

> **Student Question [00:26:14] - Student 2:** Okay. And if it was a NoSQL type of database where eventual consistency happens. So can you please tell me one particular use case where this would be a bad example, bad implementation.

**[00:26:31] Teacher (answer):** Not at all. If you are okay with eventual consistency, even CDCs are eventually consistent. It does not guarantee strong consistency anyway. There is no strong consistency between these and these databases. It's all eventual consistency. Right? So the system is built on [unclear: "our."]

**[00:26:45] Student 2:** I mean, in terms of asynchronous processing.

**[00:26:48] Teacher:** So where you need synchronicity, you cannot move past, right? You have to have synchronous. When you need strong consistency, that's when you do synchronous programming. Right.

**[00:26:59] Student 2:** Got it. Okay. So in terms of synchronous, synchronous, I mean, synchronous communication, we won't be able to implement this.

**[00:27:06] Teacher:** Yeah. Okay.

**[00:27:09] Student 2:** Got it. Great. Got it.

> **Student Question [00:27:13] - Student 6:** So, is, is CDC somewhere close to server sent events or could we have simply use server

**[00:27:20] Teacher (answer):** Server sent event is front end JavaScript. Right. Okay. This is backend database, very different. Right. And CDC is pull the data and transform and push the data to other database or, or [?SSE | asr: "SYNC"] is JavaScript where your backend server is sending the event to your front end. Very different.

> **Student Question [00:27:47] - Student 6:** I'm saying one minor question in the organization example that you just talked about, used [?SQS | asr: "SQL"] rather because Kafka is expensive as well as it has.

**[00:27:59] Teacher (answer):** See, that is like, I could point out a hundred things there, but a company always has some decisions made a certain way, right? Got it. So you can't cover it on it, but you could go ahead with that. Like if the, but there, but there load was decent enough that Kafka and [?SQS's | asr: "SQL's"] cost would have been fairly similar. Yeah, it would have been very similar. The kind of throughput that they were having. It started as a very legacy service. Oh, sorry. It started as a very basic service. Company grew. They did not refactor that service. And then it started to bite back. Right? Okay. Yeah.

[00:28:40] I'll take one more question before we move forward. DK, go on.

> **Student Question [00:28:44] - Student 4 (DK):** Hi, Arpit. So, Arpit, what I wanted to understand in CDC. So, let's say in [?MySQL | asr: "my skills"], some transactions are happening. This is the first step. This is the second step. So would CDC would also be able to capture in that sequence or CDC is not a good example or a good use case for that?

**[00:29:03] Teacher (answer):** CDC is a brilliant use case for that. And when you talk about transaction, transaction is an atomic unit, right? In a transaction, there might be 10 SQL statements that you're running. But what gets written to the log file when your transaction commits, correct? Right. So all of the stages are written in one shot in your log file and then it's being read by CDC.

**[00:29:22] Student?:** Okay, so it is then reading it in the same sequence, whatever.

**[00:29:26] Teacher:** Correct. So the sequence in which your transactions are committing and added to the log file is the same sequence in which CDC is reading and pushing it into other database.

> **Student Question [00:29:34] - Student 4:** Okay. Got it. Got it. And second thing is, so CDC is only used in cases when there is a simple use case where we don't have to do a lot of transformations. Let's say I have, I have like in [?MySQL | asr: "my school"], I have two tables where I want to put some join of these two tables. But when let's say we are doing multiple joins and multiple aggregations and let's say we have to write some configuration file in CDC to capture that kind of data. Is it also a good use case for that scenario or it doesn't work in that case?

**[00:30:06] Teacher (answer):** Apache Spark solves that for you.

**[00:30:08] Student 4:** Okay, then we have to use the consumer and multiple pipelines and you know.

**[00:30:12] Teacher:** Yeah, mostly around Apache Spark solve the big data tools that you hear about. Apache Spark is the king of all at the moment. Apache Spark does that for you really well. So when you're doing complex transformations across tables and joins and like making multiple jobs and whatnot, Apache Spark is your friend. My friend. Okay. Got it.

**[00:30:32] Student 4:** So it is, it is for basically simple use cases.

**[00:30:34] Teacher?:** [unclear: "Key."] Yes.

**[00:30:35] Student 4:** Data comes.

**[00:30:35] Teacher:** You just want to consume whatever is written there, extract it out, put it somewhere, right.

**[00:30:41] Student 4:** With some basic transformation, right. Because in the past I've used one tool by the name of PG sync, which used to push our [?Postgres-based | asr: "post-based"] data to Elasticsearch.

**[00:30:52] Teacher:** One, right? It is just extract and put it. PG sync is an example of Postgres based CDC because it only works with Postgres, but it does that exact same thing. And that's exactly what a CDC is.

**[00:31:03] Student 4:** Got it. Got it. I've used it and I was never aware that this system is called CDCs.

**[00:31:09] Teacher:** So now you could replace that with Airbyte, Debezium, having much more, having much more fancier plugins. If you may want to put data into some other thing, you may not have to rewrite a lot of stuff there, right? Like integration with those APIs and what it just does magically for. Got it. Got it. Yeah.

**[00:31:27] Student?:** Yeah. Yeah.

**[00:31:29] Teacher:** Rajiv, I'll take your question.

## [00:31:31] Distributed cache - single node

[00:31:31] We'll move forward to the first topic that I wanted to go, just going back and forth, but I just wanted to start on this note around, [unclear: "it tells what it is"] because now that being addressed, the big discussion, my personal favorite distributed cache, will have a ton of brainstorming. A lot of critical questions I'll be throwing at you folks. A good distributed cache. The idea being going into those nitty gritties, going into those granular details that matter. We'll talk about everything that you can think of on this slides. Okay.

[00:32:07] So requirements pretty simple. High throughput, low latency, distributed. Everything we want. We are very greedy. Get, put, delete, [?TTL | asr: "ETL"], the four functionalities that would implement. Scale is by default given. But we'll have a very good time discussing. So this discussion, this entire thing, we'll have two brainstorming. First, around low-level implementation that I do now. Then we take a break. Then we do high-level implementation of it, where I would want to talk about consistent hashing, distributed hash tables, those part. So we'll start with low-level implementation, cover it to the fullest. Then we go on the high-level set. So we'll have two brainstorming in the same. So this is a mega system that we are designing.

[00:32:46] Idea is to again form a lot of dots in your head, then you can connect it however, right? Okay, so let's start with the first one, distributed cache. Assume it's in-memory, it's distributed. I should be very explicit when I talk: it is a distributed in-memory cache. Now let's start with storage, right? So the things that we brainstorm on: storage, how do we find caches full, cache eviction, communication, concurrency and TTL. These are the things which are very important when it comes to implementing a cache. We will go very deep into each one of them to understand how we are doing, what we are doing. And then we go on a break and then high level brainstorm.

### [00:33:26] How will you store the data

[00:33:26] So let's start with the first one. How will you store the data for an... Now here what we are discussing right now is just one node. It's not a distributed. Distributed will take when we go on the high level details of it. This is just single node implementation of distributed cache, as in one node you have, right? Let's talk about storage. How would you store the data in this node? It's an in-memory store. Raise your hands, I'll pull you in. Yeah, Hemant?

**[00:34:00] Student 1 (Hemant):** Yeah. So, mostly our requirement is like saving the key-value pairs. Can I assume? Okay. So what we need to do is like we need an address in memory where keys are there and for that key whatever the value is there is a separate address from where we have to fetch or maybe write or update.

**[00:34:24] Teacher:** But where value stores?

**[00:34:26] Student 1:** Yeah, so I'm going on that. And keys, maybe we can provide a continuous array of in-memory, which provides the location for keys, which holds the pointer where the values will be stored.

**[00:34:46] Teacher:** To put it simply, hash table.

**[00:34:48] Student 1:** Yeah, I was trying to build on top of it. Like it's like a hash table. Only thing we may need to worry about is how we try to create the open addressing or chaining because you will try to provide a definite size.

**[00:35:12] Teacher:** If hash maps already exist, why would you want to rebuild that logic? They have already solved that problem for you, right?

**[00:35:21] Student 1:** Yeah. I mean, if you ask me a single system, I mean, single node, a hash map is made for that with all those things. Correct. We have to maybe think about how we can do this. We have more than one machines are connected.

**[00:35:40] Teacher:** No, no, no. We're still talking about single node implementation. Distribute machine, you can think of sharding.

**[00:35:44] Student 1:** Right? That's a simple hash map. Hash map which can be used as a storage.

### [00:35:53] Multiple value types

**[00:35:53] Teacher:** Now let me change the requirement a bit, just a bit. Now imagine in the value we could store set, list, bloom filter and HyperLogLog and whatnot. I have multiple types that I'm supporting in value. So how will your value be represented?

<!-- chunk_04 00:36:15-00:48:29 -->

**[00:36:15] Student 1:** Okay, now we are looking for like a memory area which we, where we can put anything in general, like that or list or anything. Normally, if you think about from any hash table implementation, it tries to put values [unclear: "via time"]. So if we talk about, let's say, Java 1, I know...

**[00:36:39] Teacher:** No, no, that is good. No, Java is good.

**[00:36:42] Student 1:** Okay, so it takes like a value as a data type, which value may be a general object. It may be like [?a wrapper | asr: "a wrap"] or primitives, integer, string. And then based on whatever the object is, it's takes the pointer of that object. And that object goes in heap, but we save the object. So same thing we can do here also. Either we can create pointers for that, or if it is like a primitive values, as we said, we can store in place, in place of pointers.

**[00:37:20] Teacher:** I'm so loving how you are using the right term, primitive values, at this. Brilliant. Okay. So this is what you are storing. So now if you were to wrap it now, for example, when someone gives you a command, for example, you can add to a set, but you have to push to a list. So when someone says, if it's a set, I need to support add command. If it's a list, I need to support push command. How do you know what type your value is? Because then depending on the command that is fired, you have to check if that value is of that particular type or not. Correct. How will you know what type the value is?

**[00:38:08] Student 1:** Then somewhere in the key itself, we have to add something which will give me that, because in memory, everything is like an address.

**[00:38:18] Teacher:** Perfect.

**[00:38:18] Student 1:** How you represent internally in a memory representation is a different thing. What we are worried about is via key. I just need [?a way | asr: "to wave"] to figure it out. In one case, it is an add. In another case, it is a push.

**[00:38:33] Student 8:** Hmm.

**[00:38:34] Student 1:** So we need to have definitely with the key some metadata, which talks about this key represents a data type, which is, let's say, a set, or which is, that's a list in another case.

**[00:38:46] Teacher:** [unclear: "Pay to represent."] But why key? Why not value?

**[00:38:53] Student 1:** What I'm thinking, it will make things easy because via key only you will access everything.

**[00:39:00] Teacher:** But then imagine how will you store that when you try to implement it, key is a string.

**[00:39:06] Student 1:** Yes. Right.

**[00:39:06] Teacher:** Now in string, if you're prefixing it with something or you're making it into an object, that would make your lookups very complicated, every time you have to dereference and whatnot, that will be a challenge. So a better way to do this, just to add to that point, a better way to do this over here is you store key as a normal key and in the value, you create your own custom type. Let's say it's called my value, and my value, you have value, which is pointing to like, it's a void pointer or an object type, which literally can refer to anything, and a type, which is an integer that refers to, zero is, then it's string. One is integer, [?two is set | asr: "to a set"], three is list, right? This way, whenever you are doing a certain operation, let's say someone fired add on a key called my set. Right? So it's an allowed operation. So when you do this, you check if the key, you get the value, you get the type of it. You see if this, the type that you have supports this operation or not. If yes, you use this object and you then typecast it and then you put that operation.

**[00:40:25] Student 1:** Yeah, I thought that way. But before that, I thought maybe a bit optimization will be possible if we do via key, because we may not need too many data types. Mostly, let's say 5-10 data types. If I take two bytes on top of two bits, even on top of a key, that will give me like four options. If I add three, I will get nine options. Maybe just representing half of a byte, four bits, will give me 16 different data types possible. I can, if I ever think about future, I can take a byte and even say like I will have two to power eight possible data types supported next 10, 20 years in my implementation that I can do. So that's why I thought, I think adding a wrapper on top of a value will be a bit more processing compared to adding on. That's why I did it.

**[00:41:21] Teacher:** Brilliant point. Which is why Redis does this. It uses four bits to store it because it does, it cannot go beyond a certain number of data types ever. So they are basically capping it down. So this is very important point, folks. Thanks so much for bringing this up. This shows you when you're designing something in memory, you have to be very cautious on every single byte, every single bit that you're using, get the max out of it, because RAM is very costly. Try to take as less of a space as possible. Right.

[00:41:58] Thanks so much for bringing this up because this is up until now. We never discussed this, but this optimization Redis does exactly this. Redis stores a lot of other meta information also along with this. That's why we wrapped it in a object over here. In Redis it's struct, it built in C. But it adds other meta information over here, making it extensible. We'll talk about it when we go into other features of it, [unclear: "cashflow"], eviction and [?whatnot | asr: "what part"]. But this is very important that whenever you're designing something in memory, always think of saving every single bit of data, every single byte at your using. If not, reduce to the bare minimum that you can work. Right? Okay. So this is good. This is storage.

### [00:42:45] Heap exhaustion and segmentation fault

[00:42:45] Now let me talk about a pitfall. I'll throw a question. Nitin, I'll throw a question at you. Let's say we have a heap. So let's say, oh, I have a square draw. Now let's say this is our heap memory, right? Where we know whenever we do malloc, wherever we are allocating the objects, new, malloc, whatever you are using, it allocates the object in this heap. And this is the heap that you have. Now what happens, Nitin, can you like, you may know it already, but what happens when you exhaust the heap? What happens then?

> **Student Question [00:43:23] - Student 2 (Nitin):** Eviction policy runs.

**[00:43:24] Teacher:** No, no, no. That cache runs eviction policy. But in the program heap that you have, let's say you are doing continuous malloc forever in an infinite loop. What would happen at the end of it? Because you're allocating, let's say, one MB chunk every time, you have one GB RAM, after 1024 iterations, you're exhausting everything. What happens in the 1025 iteration?

**[00:43:48] Student 2:** I guess to allocate some space, it moves the data from a memory to a disk.

**[00:43:56] Teacher:** No, you have to write it, but what does operating system do in that case when you try to allocate beyond the maximum limit? I'll give you nostalgia. Segmentation fault. Right? Your program crashes. So this is what happens when we get segmentation fault. C, C, when we used to code in C, first and second engineering. That time we all suffered from segmentation fault because we tried to access memory allocated by someone. And this is also what happens when you go beyond your heap, beyond your allocated heap. When you go beyond your allocated heap, what happens is you are entering into someone else's territory and then your program crashes. So this is one of the main reasons why you don't want to go beyond the heap that you have, beyond the memory that is assigned to you.

### [00:44:51] Capping memory usage - tracking total size

[00:44:51] So now my question is, given that we have to restrict the access beyond a certain point. [check: sentence starts mid-way; words may be missing before "responsibility"] Responsibility that the cache that we are building continuously runs no matter what. It does not, it should not go down anytime. It should not crash anytime, which means we have to cap the memory usage. So first question, how do you find that you are using how much memory, how much memory your cache is using? How will you find how much memory your cache is using? Gaurav, what will you do to find how much memory your cache is using?

**[00:45:53] Student?:** Just a [?wild thought | asr: "while thought"] that there should be a command for this.

**[00:45:58] Teacher:** Okay, suggesting a command. Okay, there is a command that tells you how much memory a process is using. 100% there is a command for that, but that is very expensive because every time you are doing it, you are making an OS interrupt, because it would lead to a system call, which gets that information, because the amount of memory a process consumes is with kernel. For your program to access it from the kernel, it needs to make a system call. System call causes an interrupt. It would slow down your entire system. So command is not a way to do it. Not denying it, but not performant enough. Can we do better? Let's write our own size function. Correct. Let's write our own size function. So what would we do for this? We know how many keys have we stored until [check: speaker boundary - "We know how many keys..." may be Student 6 (Gaurav) speaking; teacher later credits Gaurav for "size plus equal to"]

**[00:46:41] Student 6 (Gaurav):** now, or they have expired, and we know the size of each key-value pair.

**[00:46:48] Teacher:** Let's multiply those numbers with the key-value size. Instead of that, let's just do size is plus equal to n every time we are adding a key or a value.

**[00:47:00] Teacher?:** Yes.

**[00:47:00] Teacher:** Right. Okay. But by how much will you add?

**[00:47:04] Student 6:** Yeah. That is an [unclear: "obligation"] because this value in my value is. Correct. It's a structure, right? Yeah. Whatever we can. Go on. We can find the size of this key-value pair. However, we cannot find the size of this value. Actually, it would be hard to determine. Right.

**[00:47:22] Teacher:** Correct. Now that's what the challenge is, right? Because not everything is deterministic. You can just, you cannot just say, I'll do size of this and I'll get everything, because when you do size of this structure, this would spit out for four bytes. Right. But in reality, this might be taking up a lot more than that. So there has to be a better way to do this. Which just solves this problem beautifully for everyone. Like literally once and for all.

[00:47:49] So just to provide a hint before I move to Jyotinder [check: name spelling], just to provide a hint. Thanks Gaurav for bringing that up, that you probe that size plus equal to something. We have to maintain our own size. This is exactly what every single cache does, because using command is very expensive. So everyone just implements or keeps track of the size that they are consumed. So let me start with a hint so that we converge a little faster on this, around how do we allocate memory. Assume you are writing code in C. It holds true for Java, Python, whichever language you are using. But I'm just referring to C because it just, like, they're all so used to it.

<!-- chunk_05 00:48:29-01:00:19 -->

**[00:48:29] Teacher:** So when we talk about allocating a memory on the heap, we use a function called malloc. And maybe one we want to free it. We use the function free to allocate or free to deallocate. In malloc we pass the size that we want to allocate, we want to allocate, right? And malloc internally fire system call, it grabs the memory in your RAM and returns an address that you can now start using, right? So that's what malloc does, that's what free does. Free basically marks that location as free for your operating system to say, okay, now this is free, now I can do whatever I want. Now OS can choose to allocate that same chunk to other folks, to other process, to other thing was sharing that same thing.

[00:49:19] So given that we are using malloc and free to allocate and deallocate an object. Now, just to, before we, before I ask that question. Now, even when you are allocating this, my value, let's say someone is adding a new key in the system. Someone is adding a new key in the system. You would have to create this my value object, right? So what will you do? You will create object O is equal to my value star malloc. And then you pass size of bracket my value. Something like this. You are trying to allocate these many bytes and typecasting that object to my value so that you can refer it over here. And this is what you would store in your hash table. Now given this is what you are doing, what would be the simplest way to keep track of the amount of memory used?

**[00:50:14] Student 5:** Yeah. So, like whenever we are adding something, we know how big it is, right? So we can just keep track in a counter. Like we can just maintain a counter and we know how much memory.

**[00:50:27] Teacher:** How, how, and where, what would be the simplest way or the most generic way to do it?

**[00:50:39] Student 5:** *(admin)* Your voice is making there is a [?lag | asr: "lack"]. Yeah. Yeah. There's a [?lag | asr: "lack"].

**[00:50:53] Teacher:** *(admin)* [unclear: "I'll just I'll just look like just just try to get in a better coverage."] [unclear: "I'll look you at another."]

**[00:51:02] Student 5:** So if we explicitly have to allocate the size that we need on every call, can we not just keep adding that plus an extra for [unclear: "the two point, the value point around the type pointer"], type integer that we are storing. So size of my value plus four plus four.

**[00:51:25] Teacher:** No, but size of my value itself is this plus this. [unclear: "This white pointer is for white, this is for white,"] but this pointer can point to a bloom filter, which might be like a one [?MB | asr: "MVP"].

**[00:51:41] Student 5:** Yeah, I actually misunderstood.

**[00:51:46] Student?:** That's okay.

**[00:51:47] Teacher:** Because size of my value will give you this entire thing. Right. But this itself is pointing to something. Right. That is an interesting problem.

**[00:51:56] Student 5:** And we don't need to specifically allocate memory on heap for that as well.

**[00:52:02] Teacher:** Why not? We have to allocate that bloom filter, that let's say we are storing bloom filter in memory. We have to allocate that memory as well, right?

**[00:52:10] Student 5:** So we are making a malloc call for that at some point. Yes. Yes. So when we are making a malloc call, like whenever we are actually storing that bloom filter, then we need to add [unclear: "that size of two size"].

**[00:52:26] Teacher:** Exactly. So how do you implement it? Whenever you, so which means that whenever you are making malloc, that's a perfect [?segue | asr: "set"]. Whenever you are making malloc call, even if we are allocating any value, bleed, bloom filter, set, list, anything in our cache, because everything is stored in heap, anything we are ever allocating, we are invoking the same malloc function. It's not that we are just allocating to create this my value object. We are using it to even allocate, let's say we are implementing a link list, will be malloc. So in any case, we will always be invoking malloc and free always. So every time we are mallocing, we just have to use, you have to maintain a counter that does this size plus equal to size underscore alloc, whatever the variable name is over here. Every time. So what's the simplest way to implement it? That every time you are doing something, you want to do something.

**[00:53:23] Student 5:** I think create our own wrapper around malloc and [unclear: "lid"].

### [00:53:28] zmalloc

**[00:53:28] Teacher:** Exactly. So what Redis does, it just wrapped the malloc function under a function called zmalloc. And what it does internally, it just does this. So zmalloc is a very simple wrapper over malloc function that does this. Zmalloc has the exact same signature as malloc. And what it does? It internally does malloc. Of size B. It does total size. Plus equal to B. And it returns O. That's it.

[00:54:10] So now in the total size variable, which is global variable, you would always know the amount of memory that you are consuming. Always, always, always know this. You don't have to rely on a fancy operating system command to give you this information. Redis does that to periodically check on the usage, but it's still occasionally it's fine. But in most cases, you just have to do this. So you are just wrapping the malloc. It is such a simple and elegant solution to a very tricky problem, because a naive way you may think of, hey, every time I'm doing malloc, I'll do count plus equal to 1. So if you're doing malloc at 50,000 places, if one of the places you forgot to do total size plus equal to something, that's bad. So which is where you do it at one place. Now in your code base or in Redis's code base, if you are checking that out, everywhere in the code base you would never see malloc. You would always see zmalloc, which has the exact same signature as malloc. But the idea being that internally it just updates the count.

### [00:55:09] Memory cap and triggering eviction

[00:55:09] Okay, and this is how you would know that total size is giving you the total memory consumed by your cache. If it goes beyond a cap. Now let's say whenever you start a Redis server or any in-memory cache, you define a total size that you would want to work with. Let's say you specify it as 1 GB. It's a soft limit. Although your machine might have 32 GB RAM, you're putting this limit at a time. My cache will not take more than 1 GB at any given point in time. Given this, what would happen is you can now in zmalloc itself, that when you're allocating, you can just check beforehand that if total size plus B is greater than max limit, you return an error. Otherwise you allocate and return the object, something around that. Or otherwise you can even here trigger eviction.

[00:56:13] That comes to our next point of discussion. Now that you know the limit that you have put, operating system might have 32 GB RAM. But what you have is you are capping a limit to 1 GB, because that's a user defined configuration. That my cache cannot take more than 1 GB. So now what would happen is, you can now very easily check if my total size plus B, which means the total size which is consumed up until now, plus B is greater than max. If it is going beyond the limit, I can remove a key and then allocate and then total size plus plus and then return that object. This is where you plug in that eviction algorithm that we will discuss next.

[00:56:57] But this is such a beautiful piece of implementation. Nothing fancy. It's really basic logic that we are applying. But this is what tells you that how big systems are built on very simple solutions. Nothing fancy. It's very simple. Trust me, Redis source code is one of the easiest source code that you can skim through. Any file [unclear: "starts giving the data"], you'll start understanding it, fifth or sixth day you'll start understanding everything out of it. It's very beautiful piece of code, but I, I thoroughly enjoyed going through it, right? But this is the beauty of this implementation, and now you exactly know where to evict, where to trigger that eviction algorithm, right? And that brings us to the next discussion, eviction. I try to weave a story out of it, okay? See, that's why I said this is my most favorite, deep into these details, because this is what matters, and everything else you can do it. But these design decisions, it would not just help you in designing cache, but a lot of other systems where you can think in very simple solutions rather than going for something very fancy or complex. Right.

## [00:58:02] Eviction strategies - LRU and LFU

[00:58:02] Okay. So this is how you know your cache is full. And now it's time to do eviction. What are the two most common eviction strategies? Rajiv.

> **Student Question [00:58:16] - Student 3 (Rajiv):** I had a question the previous slide basically, let's take it at the end. [check: speaker - "let's take it at the end" may be the teacher deferring]

**[00:58:21] Teacher:** We have set up the context for eviction, more than happy to take it in some time. Least recently [check: speaker boundary - "least recently" may be the start of Student 3's answer]

**[00:58:25] Student 3:** Used, LRU, and, and is one more, I'm not able to recall that. Yeah, of course.

**[00:58:39] Teacher:** There is one more. It's frequently used. Yeah. Right. Okay. What does LRU do? Sorry. What LRU does?

**[00:58:50] Student 3:** I mean, based on the recency of the usage of a particular key, it maintains what's the last timestamp where key was accessed. Then whenever the cache is full, it just tries to remove the least recently used key. That's what LRU does. And the second one, if you want me to go to LFU part as well, LFU part actually maintains the frequency of the usage of the keys. [unclear: "So home."] So it was a least frequently used key is used for eviction when the cache is [?full | asr: "sold"].

**[00:59:20] Teacher:** So where would you store this information that when was, let's say you're using LRU or [?LFU | asr: "LF"], in any case, you have to store this information that when was the key last used? When was the key? Like how frequently was the key used? Where would you store this information?

**[00:59:33] Student 3:** So frequency is, I mean, is a property of a key basically, because key is, is in both case keys is accessed basically. So, I'm maintaining some, some, some sort of data structure to find out the eviction keys is necessary. Like for example, priority queue could be used for a frequency type, right?

**[00:59:54] Teacher:** So you're talking about implementation. First, let's talk about storing this information. Where are you storing the information that when was my key, like least recently, when was my key last used? When would you store this information? Last used. You have to store, you said timestamp you need to store, right? Where are you storing this timestamp?

<!-- chunk_06 01:00:19-01:11:59 -->

**[01:00:19] Student 3:** Okay.

**[01:00:22] Teacher:** Which is why? This wrapper.

**[01:00:27] Student 3:** [unclear: "In the my right use"], that means you need to, it says all the keys then.

**[01:00:32] Teacher:** No, we'll talk about [?implementation | asr: "deployment"] first, storing the information is important. Right. When was this key last used, right? That is important. Right. So instead of storing that information in a separate data structure, you already have one. So in that, along with the type, what you store, you store LRU bits. Again, you store four bits or something like that. We'll, we'll come to like, what's the sizing of it. It's actually 24 bits. 8 bits, 28 bits, it stores as LRU bits. Redis does that. It looks like I'm going deep into Redis, but it's not just Redis, but any database that you pick has something around it. Now, if you look carefully, this 4 bits and this 28 bits becomes 32 bits. This becomes 32 bits. So this becomes one integer. This becomes two integers. So we are trying to make it very space efficient. So that's why wrapping it in an object is a very good decision, because now we are attributing everything that we need, any meta information that we need for a key stores over here. And every time you are accessing it, just do plus plus or updated timestamp and whatnot. And LRU bits itself, you can plug in LFU. So you may use any eviction bits or something. Depending on LRU, you store timestamp. Depending on LFU, you store frequency. Okay.

### [01:01:49] Implementing LRU and LFU - map and linked list overhead

[01:01:49] Now, given that these are two very common ways. Now that we have this information stored, let me bring to one very interesting question around this. Given that we know where we are storing this, now my question is, given that we are storing this information, how will we implement LRU or LFU? Is priority queue the best way possible to know which one to [?evict | asr: "emit"]?

**[01:02:22] Student 7:** So least recently used is like, I mean, [?implemented | asr: "permitted"] is in a map and a linked list. Least recently with map and linked list. Okay, how? Yes. [check: "Okay, how?" may be the teacher interjecting] So we are going to store all the key-value pairs in linked list basically, but the map is going to store address of those nodes, and map is going to have key-value pairs, key and values address of that linked list which stores value. So when we are going to add something in the map, sorry, when we're going to do the put call, we basically check the size. We'll also have a size variable of link list. So we are going to check that size. If it is [unclear: "ready to go"] in the list, then we will get the address of that value from the linked list and then make the changes in put call, change the value. And then just, it's a doubly linked list. So just remove it from there and put it, add it to the head. So that's how it is like [?O of one | asr: "off one"] operation only. And while removing also, we have the map already. So we'll check if the key exists or not. If it exists, then just get it from there and remove it directly, drop down the link. So that's how it works. Got it.

**[01:03:48] Teacher:** And anytime you access it more, you bring it to the head of the list, so that you know which one to evict.

**[01:03:54] Student 7:** Right. Yes.

**[01:03:56] Teacher:** Okay. This is, everyone talks about this. But we are very constrained on memory. What is a memory overhead over here, Shreya? Let's estimate that. For you to manage this node, what would be? So let's say you have a struct node. You said it would be a doubly linked list. So you have a next pointer. You have a previous pointer. And you have a value pointer, which points to the value. Right? Yeah. So for every key. And you would have one node for every key-value pair that you have. Correct?

**[01:04:36] Student 7 (Shreya):** One node for every. Yes. Yes.

**[01:04:39] Teacher:** So for every key-value pair that you have, you are adding overhead of 4 bytes plus 4 bytes plus 4 bytes, 12 bytes. Right? Now imagine, imagine you are just storing key as A and value as 2. So this is 1 byte character. This is 4 byte integer. For a 5 byte data, you are having 12 byte of overhead to store the [?least recency | asr: "least recent C"] part of it. Correct?

**[01:05:13] Student 7:** Right.

**[01:05:15] Teacher:** This is a huge waste of memory. So in most cases, when we, and this is what the difference between a very theoretical implementation, which we are taught mostly around this, hey, we'll just use linked list. And it's not that linked list is not used. Linked list is used, but when you don't have memory constraints, cache is very memory intensive application. And Linux kernels is filled with linked list with this exact same approach. So Linux, when your operating system is booted up, it creates at least 52,000 linked list in memory. How do I know that number? One of my friends works at a contributes to Linux kernel. He's a champ at it. He's C pro. So I talk to him a lot about this. So this is where those kinds of applications, it suits really well.

[01:06:05] But for our cache thing, which we are very concerned on memory anyway. Now what we have to do, adding a lot of extra overhead just to maintain this additional information just to implement this LRU stuff or LFU stuff over here. So there has to be a better way. There has to be a more memory efficient way, right? Which is where what Redis does is Redis does not maintain this, because this requires an additional memory overhead. Redis would choose or any in-memory cache would choose to store user data instead of storing this random meta information. Right. So which is why real world implementation of eviction is not about is they, a lot of databases choose not to use linked list or something similar for this. Right. We'll talk about those things in a bit more detail in some time, but which is where, although it uses LRU [?LFU | asr: "elephant"] that's very Redis internally, cannot go into that depth. It would take me three years to talk about it.

### [01:07:12] Random eviction

[01:07:12] But more importantly, let me spend a little more time into a third strategy which is very memory efficient. Random eviction. So Redis, in general, Redis also supports random eviction. So I didn't know that I implemented something back. It's a big story. But just to add to that context, what instead of what Redis does or what you tend to do is instead of having this additional memory overhead just to maintain this eviction to finding which is the most optimal key to remove, or rather least recently used or least frequently used key to remove, what if we pick one key at random and evict it? We would not require this at all. We are literally picking one key at random and evicting it. Now with this, what happens is, if you are doing a pure random eviction, we might lose, we might delete the key that should be in cache. But in any case, if it is frequently used, it would be a cache miss and people would get that key and put it there. Right. It's still not heavy, but what it saves you, it saves you from having this extra information. So now you can put in more key-value pairs in the same amount of space by just switching to a random key eviction algorithm.

[01:08:33] This is what I changed in production. FYI, I was eight months old in the industry. I changed the eviction strategy in production, changed it to [?random | asr: "remote"]. We were able to ingest large amount of keys with just very minimal increase in cache miss ratio. But we are able to fit in large number of keys. So it basically sorted, it basically balanced things out for us. We are literally relying on luck over here that it is possible for one of the most important keys to be evicted. But that's okay. What are the odds that every time eviction is happening and your most important key is getting evicted? Not much, because you have millions of keys in your database. But because we did not have to have this overhead, it's very performant. Eviction becomes really fast. They are not optimal, but they are fast. So here you see this trade-off. Are you going for optimality when you are reducing it? Then you require extra space to maintain when was this least recent use. As soon as you give up on optimality, or rather not optimality, my bad, as you said, you give up on correctness, the absolute correctness of your system, you can increase, or rather you can improve the performance of eviction by not having to compute and maintain and store this part. So it's a trade-off that we are taking. Computer science filled with trade-offs, right? So LRU, LFU and random, right? Okay.

### [01:09:57] When would you use LRU, when would you use LFU

[01:09:57] So let's talk, let's spend more time into understanding LRU and LFU, which is where I want to bring out this point. When would you use LRU? When would you use LFU? Now this is not with respect to cache discussion, but in general, when which algorithm would you use? Well, and why, Rahul, when would you use LRU?

**[01:10:20] Student 8 (Rahul):** So I think we will use LRU when basically we are having some sort of, let's just say, streaming kind of thing, as compared to like, let's just say, least frequently used is nothing like when, when we will use basically, there is like when there is a lot, a lot of things that we need to access again and again. I'm just a little bit confused.

**[~01:10:50] Teacher:** See, this is exactly where the thing is. Right. Everyone gets confused between LRU and LFU. People can say it's least recently used, least frequently used, but there is this concrete thing, which tells you, oh, this is where you should use LFU. This is where you should use LRU. Like what's the differentiator between the two? It's okay. It's okay. [check: possible ASR duplicate] Everyone's been through that. I've been through that. It was very difficult for me, unless I wrote one LRU, LFU. Then I built an understanding of it, right? Up until then, even I was like that. It's because very tricky, because at the end when we're explaining, we tend to use and frequently, and that's exactly what the algorithms are, but when? I'm looking for something more concrete. Mohit? When would you use LRU? When would you use LFU?

**[01:11:36] Student 4 (Mohit):** So one place where I think LFU would make more sense is places where you are scanning a lot of data. In that case what happens? One scan basically could wipe out your earlier entries which were like very

<!-- chunk_07 01:11:59-01:23:41 -->

**[01:11:59] Student 4 (Mohit):** which were used more often, right? So in that case, a frequency based option would be better. For example, you are doing a scan query on database. In that case, an LFU strategy would be better because a scan would not wipe out say very the items which are heavily used.

**[01:12:22] Teacher:** Brilliant. This is a first time someone has very beautifully explained where you should use LFU. Thanks so much Mohit for this. I'll just elaborate on this so that everyone's on the same page. Thanks so much.

### [01:12:33] LFU - stock market analogy

[01:12:33] So this is like stock market. So one analogy that I give people to understand LRU and LFU, especially LFU is stock market and not as a use case, but as a human behavior. So what happens is in stock market, let's say you bought a stock, full faith in that stock. No matter what, this stock is going good, will do great. So you invested in that stock. Stock was rising. You were happy. You were happy. [check: possible ASR duplicate] And then the stock fell.

[01:13:06] Now, when the stock fell, it's your choice to either withdraw the money at this stage or you still trust that this stock would grow again. This would rise again, right? So if it rises again then you are happy, right? But if it falls then you're sad again, okay, I should have evicted. This is exactly what LFU is. LFU because it works on frequency. A simple way to look at it is when your keys are not recently used, do you want to evict it, your stock is not performing well recently, you still want to hold it or not. That's LFU for me. If you don't want to evict when your stock is not performing well at this moment, you are holding it, expecting it to be used again. That's LFU. You are not going by the recency bias over here. Instead, you are thinking because it did well in the past, it would do well in the future, keeping your trust in that stock. That's LFU.

[01:14:17] Now it should be very clear in your head on where can you use LFU and when you are having the trust that even though recently this is not doing well, I would still want to keep this key in my cache. You would use LFU. I'll give a practical example. A practical example for this was an analogy that I gave that when you are seeing a dip in the access of a particular key, but you still want to keep that key in cache, still what you would still use LFU for that. An example for that is Wikipedia pages. Right. So in Wikipedia pages, there you like Wikipedia obviously has a ton of cache in that. In that, what you would see is that if a page is, let's say not frequently used at this moment, but it was very frequently used in, it was very frequently accessed in the past. I would still like to keep this memory.

[01:15:11] Let's say there is FIFA World Cup. Everyone is opening FIFA pages, FIFA pages, FIFA pages, but it does not take credit away from other top pages that were anyway visited far more often. Just because of the recency of this FIFA page, why would you want to curb other pages which were equally, which were more famous in the past? Because tomorrow they would be accessed again with the same frequency once this fad goes away. This is where LFU comes into the place. Where recency effect, you don't want recency effect to take its, effect to evict a particular key, instead what you are doing is you are saying that if something was very frequently accessed in the past will be frequently accessed in the future. That's where you go for LRU. And in LRU, LRU is typically simple where you know the access pattern that you have is something like this.

**[01:16:03] Teacher?:** Wait, let me, do I have an example for that?

**[01:16:09] Teacher:** So let's say you have your access pattern, something like this, which means that some keys or this is for a particular key, a key is accessed very aggressively at first, but then there is a slump in the access. This is an indication of LRU implementation. This is where you can use LRU because now things that were accessed very frequently. It's like all social media trends. A song is popular. Everyone's creating reel on that. That song is cached on YouTube or Insta or whatever. But once that fad is away, no one's picking reels on it. So it's okay to not put it in cache. LRU.

[01:16:53] So classic example of LRU, Google News. Where what are the odds that you are reading news that is a week old? Not really. You would be reading news that is one day old, two day old at max. So you are very likely to, that's where recency, things that are really recent are very highly likely to be accessed again and again. That's where you would have your LRU implementation, but where it's more about that, hey, what was very famous in the past may not be today, but it will be famous again in the future. You want to keep the things there. You would use LFU, right?

[01:17:26] Depending on the use case of this, picking one over the other, there is not that LRU always works best or LFU always works best. In most cases, you would not even see the difference between LRU and LFU in [?production | asr: "protection"] system. But in some extreme cases, you would see a significant difference. So whenever you are configuring something like this, spend time understanding your application, understanding your user behavior, see how a particular key is accessed, understand the life cycle of a particular key in your system, and then take a decision of this or this.

[01:17:57] The way Redis does, Redis still does LRU, LFU random. It supports all three. It does LRU, LFU implementation very efficiently using LRU bits. Unfortunately, I cannot dive deep into it. It's a very superb algorithm that it uses. And I, I so want to talk about it, but time is very limited and would make this discussion go in a very random direction, but that's what Redis does. I highly encourage you to explore that out in any case, if you are interested into diving deep into Redis, I have a course, not a plug, but just out of curiosity, if you would want to know everything about Redis internals, I have a very detailed course. It says 9 plus hours, but it's 9 plus hours of very dense information around everything on this one. And actual Redis code walkthrough and implementation in Golang. That's how I got very detailed understanding of it. I like implementing stuff.

[01:18:44] Okay. So this is about eviction. LRU, LFU, random, when to use, how to use, overheads that use. Right. So eviction done.

## [01:18:54] Communication protocol

[01:18:54] Now let's talk about communication. Communication is very important around how you are letting some other system talk to your system, talk to your cache. So which communication protocol would you use over here? Let's say this is your single node machine in which you are hosted your cache. Which communication protocol, what kind of [unclear: "EKS"] would you use to expose your cache to other systems? Raise your hands or pull you in.

**[01:19:33] Student?:** Yes, yeah.

**[01:19:36] Student?:** It's TCP.

**[01:19:37] Teacher?:** Why?

**[01:19:40] Student 7:** As in, I mean, any HTTP would, it's just a, it would, we won't need, what do we say? I mean, the server can forget, like it doesn't need to cache anything, like nothing like WebSockets and all. So.

**[01:20:01] Teacher:** But then what is the, what is the, what is the disadvantage of using HTTP?

**[01:20:10] Student 7:** We have to like the payload size and all.

**[01:20:13] Teacher:** Payload size is huge. Why? Why is payload size huge?

**[01:20:18] Student 7:** I mean, the key when we are doing the get request, the key would be small, but the data, which is being fetched from the cache.

**[01:20:27] Teacher:** That is true for anything that you use, right? The value that you have to transfer it, [unclear: "we test it up"] or anything that you're using. What difference does it make? Okay. Let's start with this. What, which other options do you have apart from HTTP?

**[01:20:44] Student 7:** We have WebSockets.

**[01:20:48] Teacher:** Okay.

**[01:20:51] Student 7:** Other protocols. I don't have names in my. Yeah.

**[01:21:05] Teacher:** What else?

**[01:21:11] Student?:** You can write your own. [check: speaker - "You can." is STUDENT_9, "write your own." starts the TEACHER segment; answers "What else?" and the teacher affirms it]

**[~01:21:12] Teacher:** Right. So you can write your own. Why not? And then [unclear: "what is at 10"], all these three are just TCP connections. Correct. There's nothing fancy. They're just TCP connections. The way you are sending the data is just wrapped. It just sent in a particular format. That format is either HTTP packets or gRPC format or your own custom form.

[01:21:40] Right. So at the end, it needs to be a TCP connection. Now, if you use HTTP, when I say HTTP, it means HTTP 1.1. Now, HTTP 1.1 normal web server. What would happen again? Establishing TCP connection is a three-way handshake and two-way tear down. So if you're making it stateless, like every time you get a request you are establishing TCP connections, sending the data, getting the request particular, whatever you're doing, they're responding back and then you're terminating the connection. So every time an API server needs to establish the connection with the cache you have to establish the TCP, like reestablish the TCP connection every time. So three-way handshake, two-way tear down every time, very unperformant, very inefficient, right? Very inefficient in the implementation, so might not be the best.

### [01:22:30] Detour - IoT sensor story, HTTP vs raw TCP

[01:22:30] The payload example that you gave, I just want to take a small detour over here and showcase how, again, I had no intention of this, but long time back, I got very curious about a lot of stuff. Well, that's okay. So what I did is few of my friends, rather two of my friends came to me and and they said that, Arpit, we are building an IoT application. We have sensor data and we want to send data to this backend server. They knew Python, so they wrote a backend server in Python. So Flask framework HTTP request, that's what they knew. We had no idea what we were doing. They came to me as a problem and I just solved it for that. So while that, I explored this very interesting part.

[01:23:24] So for us to make requests in the backend, class will extend by at least 15 minutes, but it's fine. I want all of you to go in this depth because I'm finding it very interesting to discuss this thing. This is my most favorite week of all.

<!-- chunk_08 01:23:41-01:35:48 -->

**[01:23:41] Teacher:** So the backend server, they had it handy in Python. They wrote it in Flask, right? But now from IoT sensors, they want to send data over here. But in IoT, you don't have Python. You don't have JavaScript. How will you make HTTP requests from here to here? Understands HTTP, your sensor understands TCP. So now what do you do? That's where I recalled that in the networking course we had some HTTP protocol format or something. Does this mean that if I establish a simple TCP connection, and this was back in 2015, I just graduated post my master's, and this, this thing came up. So I was not as experienced, I had no idea, but again applying the first principles, applying the things that I knew to kind of solve this problem.

[01:24:28] So what I did is I just experimented in just two minutes that can we do something. I just established a raw TCP connection between the two using netcat. I knew netcat has utility that it establishes TCP connection and whatnot. So whenever you make an HTTP request, you see HTTP request headers going in, you see response headers coming out. So how does your web server know it's an HTTP request? So what happens when a client connects to your server, establishes the TCP connection between the two, the client sends data to the server. It can be any data. It literally is an ARPIT. That's it. A-R-P-I-T, 5 bytes data to that server. Now it's server's responsibility to understand what you have said. Now when it's a quote unquote web server, it understands HTTP request.

[01:25:20] When I say it understands HTTP request, which means that the data that would be sent from the client to the server will be in the HTTP format. This is what that format typically looks like. You all would have seen this, but this is literally how the data is sent to the server. Get space slash h e l l o dot h t m l space h t t p slash 1.1 slash r [?slash n | asr: "slash l"] u s e r. This is exactly how it is sent. It's a very textual format. So now what happens when you send this? So this is what I did. I started my Flask server. Over here it's just an IP address which I'm asking. So this is just a Flask server that is running on port 3000. I literally did netcat localhost 3000.

[01:26:11] So I am literally establishing a TCP connection from this to this. Literally localhost 3000 page. I am establishing a TCP connection. Now look what I did. I just passed. This is a sample. No protocol. Nothing. I sent literally byte [?T H I S | asr: "T H I A"] space I S space A space S A M P L E slash R slash N. In return, what I got error response, error code 400, bad request, syntax. This is a simple, this is a sample. This got me thinking that my God, I am able to make an HTTP request to the backend server. I'm talking, I'm just, just as a fresher. Idea what I was doing, but I'm talking about this because I want all of you to think on the first principle. So if you already know and think I'm stupid, it might be, I was very [?naive | asr: "live"] back then, but it was more about thinking on the first principles. Right.

[01:27:08] So when I did this and then I opened, then I Google search and found the HTTP specification from Wikipedia page. And I said, hey, let me send this. Let's see what happens. I wrote get slash H E L L O space HTTP slash 1.1 slash R slash N. And I got this response. This is actual response. The hello world that I wrote in my handler. It got me this. I did not have, there is no Python running in this netcat that you see. It's a raw TCP connection in which I'm sending the data in a particular format, asking my web server to do like, this is a request where I'm firing get request protocol. This is actually what is going into the server as part of specification, what HTTP format, the HTTP protocol states, right? I just made it gave me the response. Now my problem is solved. Now I can fire requests. My IoT gadgets can fire requests through this backend written in Python without having Python request library or Node.js, Axios or Java Spring Boot, whatever request I've already used that over here, no need. I don't need fancy operating system.

[01:28:15] So normal TCP connection that, that was the capability of the device, right? To create TCP connections and fire it. And that's, and then I got fancy and let me send a post request to this. So I, then I passed query parameters. I did basic posts. So basic post request looks something like this, post slash login HTTP 1.1 content type content length and the username equal to a password equal to welcome. I got that. I handled and I got this login successful with that. With as I was making raw TCP connections firing the request, getting the response. Now, why we are talking about this? Because you see the overhead just to send this key value pair over here. I had to add this much of jargon. Is it worth it? Is it worth it? [check: possible ASR duplicate] Because all I want to do is just store like [?key | asr: "e"] equal to a value equal to one, but I have this huge chunk of overhead along with every single message that I'm sending. Can you do better? Because the more amount of data that you send in the request, the more your cache server would have to process it. Understand it. It works. It works. If you are making it highly optimized, then it does it. It's fine. Right? But this is what I want to talk about. Why?

### [01:29:29] Defining your own protocol - RESP

[01:29:29] Defining your own protocol. So Redis has implemented its own version of protocol called RESP. It's a specification. Like how HTTP is a specification, which says for any server that claims that it understands HTTP request, it has to send data in this particular format and it would understand it. It's a specification. Similarly, Redis has defined their own specification that all Redis clients are the used to. Memcache has its own that all clients are the used to. And then it's a specific, that's what I said. It's just raw TCP. Whatever bytes you send, whatever handler you wrote, it would understand it. That's your thing, play by your rules. Right? But this is what I want to show how costly it becomes when you fire HTTP. Just use raw HTTP. Right. Okay.

[01:30:17] Now coming back to our discussion. Oh, I'm so happy today. I just love talking about this stuff, like thinking on every single design decisions. That's where the fun is. Okay. Where were we? Okay. So let me talk about HTTP. When can you use it? Why do you use it? Now this also brings up that point that why Redis chose to use their own custom format, because now it's your hand. However, you'd want to send data, you send the data to them without having any hiccups. gRPC is very compressed. It works on HTTP/2. So it does not terminate the connection. It keeps the connection alive, but it compresses the objects and sends it and gets it back. So it's very optimized to do data transfer over network. The connection is kept open. It does not terminate. So you get best of all worlds. So you use HTTP, gRPC, custom format, depending on how complex or how simple or what your use case is, how you want people to talk to your client.

[01:31:16] And this is about communication. This is how, and in some cases you may choose to open all three. You make it configurable. How do you want to listen? Listen, it's all fine. And then what matters is somehow you should be able to talk to it. So which one is better? Again, very subjective, but creating HTTP connections every time might not be the best idea. Keeping a connection open in either of these two cases is fine. gRPC if your client can support gRPC well enough. If not, you define your own custom format. So Redis will be defining their own custom format. You could go with gRPC. You can go with HTTP. Whatever floats your. Right. Oh, great.

### [01:31:54] Low-level implementation so far

[01:31:54] Now let's talk about. We are still not done with low-level implementation. Now let's talk about concurrency. Wait, I'll just basically formally cover concurrency, but because I'd be re-editing a lot of stuff there. I'm just lowering the hands. I'll take questions in some time because there's just a few things remaining. I might 10, 10 more minutes to cover LLD. Not LLD, I don't want to use that word. To cover this low-level implementation detail, then we go into high-level part. Okay. But, okay.

[01:32:24] [?Single-node | asr: "Single-lot"] cache. So [?single-node | asr: "single-lot"] cache, the way we have is your in-memory hash table is what you are storing the data. This is what we spoke about, wrapping it in an object, object struct, [?type, LRU | asr: "type list"], data, something something, and then what you're doing is you're storing that exact same thing in hash table, exactly the way we discussed it. Right now cache server, how we define, we define the communication protocol. [unclear: "you can attend"] we'll go with TCP because we want statefulness, we want guaranteed delivery, we want [?acknowledgments | asr: "actual judgments"], right? UDP is fire and forget, we don't want that, that we don't want to lose data because it's a quote unquote database, right? So that's why we would have to go with TCP. But when you go with TCP, we typically have three options, a completely stateless HTTP, HTTP 1.1, which establishes the connection every time, fires the query, gets the response and breaks the connection. Second is gRPC, which is stateful HTTP, works on stateful HTTP/2. It keeps the connection open, contains this send a request, get the response, highly compressed, like it compresses the data very much and sends it back and whatnot. It uses Protobuf internally. If you are interested in gRPC, I think you should definitely explore gRPC a bit. Never worked on it. Otherwise you define your own custom format depending on the needs that you have. But if you're just starting out, just wanting to prototype it, just use gRPC and just get started with it without thinking too much about it. When to know the cache is full, wherever the cache is full, we have to evict it. Three strategies, LRU, LFU, we talked about, random eviction, it just randomly evicts one and that's the best part of it. So it has zero memory overhead. It literally and evicted, so we are trading off the correctness of the system that it would delete the [unclear: "mulee"] specifically, it might delete the most important key in the cache, but it should be okay with that, right? But it would allow us to put in more number of the large amount of data in the cache, so if that works well, the overall benefit might be significant, right? How do you find caches full? That's where we discuss zmalloc, like wrapping malloc and maintaining a total size over that, right?

## [01:34:27] Handling TTLs

[~01:34:27] Now let's come, now talk about handling TTLs. Now we'll spend detail time into this. Handling TTL is very important. It's a [?key expiration | asr: "key election"] we discussed in the second week when we're designing key-value store. We talk about how Redis does it. That same apparatus we'll use over here. But understand this part that how at every single design decision, because it's an in-memory cache, what we got to know is because it is in-memory cache, we have to ensure that we are using the minimum data, the bare minimum bytes to do anything. So if handling TTL also requires to store a lot of data, then it's futile, because then you are spending a lot of, you are using a lot of data to do something which is not so critical.

[01:35:13] So which is where handling TTL also falls into that category. So how do you make your TTL consume less memory? So the idea is simple. First of all, we need to store absolute expiry for a particular key. Let's say I'm storing a key with a particular expiry. I have to store this information that is very minimum. So any expiration that you said will go into the object we discussed here. We have [?LRU bits | asr: "a large bids"]. We can have expiration as well set over here. Right? So when you are storing this, now the thing comes out that how do you clean that?

<!-- chunk_09 01:35:48-01:48:29 -->

**[01:35:48] Teacher:** So first thing you might think I'll use priority queue for this, but priority queue, it's... But you need additional data structure. So what do you do? In the second week, we spoke about sampling of keys, 20 keys and expirations, but that's not the only one. What we are doing is, as I said that time, I'm just re-editing it so that it fits into the context in order to make it lightweight and not use additional data structures like priority queue that requires a lot of pointers and all. We go with lazy deletion.

[01:36:20] First option, lazy deletion, which means we don't delete, we are doing TTL, we are not doing [?eviction | asr: "efficient"], we are doing TTLs. So if I access a key, let's say user get a key, when you went through the object, you get at my value object in which you saw that expiration time, the current time is more than expiration time, which means a key is expired. So then you delete the key. How do you delete the key? Free call. zfree. Like zmalloc you'd have zfree, that would do total size minus minus and free the object. Right? That way you would do lazy deletion. So in most cases most of your keys would be deleted with lazy deletion. They are able to do this because it is in memory, you just have to invoke a free call. Nothing more than that. Right?

[01:37:02] So given this, what happens is my life becomes very simple, that most of the keys in cache, that's how the cache works. You are very likely to access the key. If the key is deleted and you access it, you are hard deleting them, right? But then there would be a key which are expired but never deleted. That is where you do the sampling approach that we discuss in the second week. So out of all the keys whose expiration is set, you sample exactly 20 keys, see how many of them are expired, you delete those keys and re-iterate this process again and again until your sample has less than 25 percent of keys which are expired but not deleted. This way memory leaks, but it would not be permanently, because eventually the keys would be deleted either by lazy deletion or by another resampling, what happens, right?

[01:37:50] So this way you reduce the amount of data structures you need, additional pointers, additional memory you need to maintain these expensive data structures. Now this is very important, and now we know in a very detailed manner why Redis chose this plus this. Why lazy deletion? Because it helps them not to go for additional data structures. Redis does not have a priority implementation for it. Here if you look, lazy deletion, no data structure required, correct? Sampling 20 keys and expiring, no data structure required, right? So here you see how beautifully Redis exploited the fact that it does not require additional data structures to implement [?TTL | asr: "ETN"]. Every single bit matters. This is how it gets. You can able to fit in large amount of data in short amount of RAM. It just does bare minimum it requests.

## [01:38:52] Scaling and concurrency on a single node

[01:38:52] Now, scaling is easy. Vertical scaling because we are just on single node. But you to handle large amount of request data at all. The only option is vertical scaling. You can't do more than that.

### [01:39:05] Concurrency - pessimistic locking, optimistic locking, single threadedness

[01:39:05] This is what I want to spend a little more time. Concurrency, because we are still talking about single node. So on that single node, how do you ensure when you have two people, two threads coming in, trying to update the same thing? It's a classic concurrency problem. So there are three ways to do it. Pessimistic locking, optimistic locking, single threadedness.

[01:39:27] Pessimistic locking is what we discussed in the second week with airline check-in example, where we wanted to do a critical operation which cannot be shared by multiple threads in parallel. So what we did, we wrapped it in locks. So because it's a critical update, people would have to take the lock before they move forward. So when two threads come together, one of them would go in while other waits. It's a single node machine. Thread coordinate with mutex as semaphores. Pick your favorite to implement it. That is one way to do it. [unclear: "updates if that fits your well."] Second way to do it is optimistic locking.

[01:40:05] Now, pessimistic locking we all have detailed understanding of it. In case you are unaware of mutex as a semaphore, spend some time reading about it. And atomic variables to understand how this works. But take pointers from [unclear: "LH again example"] on how we waited while one moved forward and all. Pessimistic locking is pretty straightforward. Almost when you synchronize block in Java, this is what happens in there.

### [01:40:28] Optimistic locking - compare and swap

[01:40:28] But optimistic locking we never spend time on when we're discussing. Today I want to spend time on that. So this looks like a SQL statement, but this is more of semantics, but understand the context how they are doing it. So what optimistic locking says is, optimistic locking says, I believe there is very less chance of concurrent accesses. So I won't proactively take a lot of locks. What I would do is if two threads are fired and they access the same thing at the same time, somehow I want to ensure that only one of them succeeds. So without taking explicit [?locks | asr: "blocks"], if I can ensure that only one of them succeeds, it's a win for me.

[01:41:11] A way to do this is doing something like this. Instead of just saying update a equal to 20, I say update a equal to 20 where a equal to 10. A semantic, I'm just making you understand how to implement. We'll talk about it. But the idea is, the reason of just firing update a equal to 20 and a equal to 30, I say update a equal to 20 where my past value is 10 and update a equal to 30 when my past value is 10. When both of these fire at the same time, what would happen? One of them would succeed while other would fail, because when one of them succeeds, what happens? The value is set to 20, and when the next one runs, it says, oh. So a equal to 30 where a equal to 10, but the current value is 20. So this update would lead to nothing. So one of, only one of this will succeed. This is optimistic locking. You are being optimistic that you don't need locks. Right?

[01:42:06] Now, how do you implement it? A way to implement this is you need this to be an atomic update. Atomic update implies that while this is running, nothing else can run. How do you do that? There is a standard instruction called compare and swap. Every single language has an implementation of it. It uses native CPU instructions to implement, it's done at CPU level, it gives a very nice wrapper over it. So compare and swap is the way to do. So this is exactly what compare and swap is. So here what you do, you say I want to compare, I want to change a to 20 when my current value is 10. So it would do this exact thing that I said, it would check if a is 10, then only it would make it 20. And similarly it would do a to 30 when it is 10. This is what you would pass in compare and swap.

[01:42:58] So it's a function, it's a standard function that you will find in every language. Go has atomic library, C++ [unclear: "had a bicell"] Boost library has its implementation. It all refers to that operating system implementation. If your processor, ARM chipset or Intel, AMD, whichever you are using, if it provides you compare and swap instruction, your compiler would leverage that while it is converting it into bytecode. And it would do this. So compare and swap is the best way to implement optimistic lock. Because this instruction is atomic. So while one is running, no one else can run. Your operating system does not do context switch while this instruction is running. So no worries in that.

[01:43:38] But this is very beautiful when you do it. Highly recommend you to think about it. Implement, write a simple optimistic locking thing. Right. It's very easy. Just play around with [?compare and swap | asr: "comparison"] and you'll understand how things are. Right. Okay. It's fine. We'll skip this. Don't need this. We went very detailed in it. I'm just probing you all and think on different directions. Right. But now, implement [?compare and swap | asr: "comparison"]. Right.

### [01:44:05] Single threadedness

[01:44:05] Now, the third part, [?single threadedness | asr: "single threaded test"]. Right. So we talk about handling concurrency, pessimistic locking. We understand optimistic locking. Is why do you need concurrency when you can make things single threaded? The problem arises in this case because we are having multiple threads that can be scheduled at the same time, can run in parallel. What if I don't support threads at all? This is what Redis did. In case you want to understand single threadedness, I have a video on it, a free video and a detailed one in my Redis course, but a free video itself covers some parts of it that would make you understand how single threaded... YouTube and Redis internal playlist that I have, but want to dive deep into Redis? I have that course. It's not a plug. It's just a point.

[01:44:51] I'm trying to make you all very curious about things, right? And how engineer, how brilliant engineers, this folks who built this amazing stuff, they're thinking about it. They're challenging. If you look carefully, they challenged every single decision, that what if we take locks? What if I don't want to take locks and do it with [?atomic instruction | asr: "atomic inspection"]? What if I don't need locks at all? I make [unclear: "three"] single threaded. So they just challenged everything that they've faced. Right. And this is all about low level implementation details of cache. Right.

### [01:45:23] Questions before the break

[01:45:23] Okay. We'll take questions for five minutes. Then we go on a break. And then we come back. We discuss high level part of it. Right. Nitin, go on.

> **Student Question [01:45:31] - Student 2 (Nitin):** Arpit, earlier we were discussing about the low level implementation of LRU and LFU. I think we like digressed on that topic.

**[01:45:43] Teacher (answer):** Those LRU bits, 28 LRU bits. I cannot talk about it. It's very deep, very deep. It's covered in the Redis internals course. I cannot talk about it because it would itself cover two hours of time. It's that deep.

> **Student Question [01:45:59] - Student 2:** So not about Redis implementation, just a high level implementation, like keeping the memory constraint in mind. How will we design the LRU and LFU?

**[01:46:11] Teacher (answer):** You cannot do that. That's what I covered there. Right. That's what I covered there. [check: possible ASR duplicate] It's very deep implementation. Right. So that's why go with random. That's very low on memory. You don't need any additional data. You are just risking it with an important key might be deleted. That's it.

**[01:46:29] Student 2:** Right. One of the, [unclear: "created"] that you shared, that implementing Big O of one, with, I mean, time complexity of LFU. Yeah. A very high memory consumption.

**[01:46:44] Teacher:** Exactly. But then you see that thing, right? When you want better time, you're giving up on space.

**[01:46:52] Student 3:** Okay.

**[01:46:53] Teacher:** Right. But it's not that, which is why people don't use it. Right. When you, when you are constrained by the space, then you have to, you, then you have to trade it off by time. Right. So you take higher time to lay, you take longer to do that. Exactly.

**[01:47:10] Student 2:** Okay.

> **Student Question [01:47:12] - Student 2:** So next question, I mean, in terms of a single threadedness implementation of our distributed cache, so let's say we adopted that approach, okay, and there are two, there are two servers which are communicating via my cache system, and they both want to read or update different data, different keys, okay, then over here, our system will be underperforming, right?

**[01:47:45] Teacher (answer):** No, it does not. That's what the magic is. Single-threaded systems, they are not blocked. Basically, watch that video. In my Redis internal series, watch that video. The first three videos that I put out for free, watch that video. You will understand whatever. It is not blocking. That's how concurrent systems are built.

**[01:48:05] Student 2:** Got it.

> **Student Question [01:48:06] - Student?:** Can I ask a question regarding consistent hashing?

**[01:48:09] Teacher (answer):** And then we are yet to cover that. Okay. That's a huge discussion that is coming up. That's high level part. We'll talk about it after the...

**[01:48:18] Student 6:** Got it. Yeah. Got it. Hey, can you please go back to the slide where we talked about sizes, computing sizes of the hash table.

<!-- chunk_10 01:48:29-02:01:38 -->

**[01:48:29] Student 6:** Over there, we were still calculating the size of actual structure and not the...

**[01:48:35] Teacher?:** Value of node.

**[01:48:36] Teacher (answer):** No, but value of node, great point. But this node is also, you are allocating it, right? Let's say this is Bloom filter. You're allocating Bloom filter. So you see malloc while you're allocating the Bloom filter as well.

**[01:48:49] Student 6:** No, but what malloc accepts is the size of the structure. My value itself, right?

**[01:48:54] Teacher:** No, but Bloom filter is also a structure, right? Let's say you are storing Bloom filter. How will you allocate a Bloom filter? The actual value, this is also value, you need to allocate this. Right. You would allocate that as well. Let's say you're doing a set allocation. So you create a set, not my value. My value is just a wrapper. So every single thing that you're allocating, you're wrapping it over here. So you are not, instead of invoking only malloc, you're invoking zmalloc for every allocation, you're allocating ever in your cache ever. You are doing it with zmalloc.

**[01:49:36] Student?:** We don't call it on structure. We call it on the object. Is that what you mean?

**[01:49:41] Teacher:** Everywhere. Yeah. Yeah. Even this object allocation will be zmalloc. Even this will be zmalloc. Everything that you're invoking is rather than zmalloc. Okay.

> **Student Question [01:49:52] - Student 6:** And this experiment that you just showed on your blog, where you use netcat, can't we use it like as a hack everywhere where we have [unclear: "ECB to SDB"]. Yeah.

**[01:50:04] Teacher (answer):** Then it's just a [?raw | asr: "narrow"] text that you are sending and your server is understanding.

**[01:50:09] Student 6:** Okay. Thanks.

## [01:50:12] Break *(admin)*

**[01:50:12] Teacher:** *(admin)* Great. Basically Rajiv and Anupam want to take your question in some time. We still have a lot to cover. Now it's time to make our cache distributed. But before we do that, let's go on a break. Then we talk about making a distributed and then I'll take questions. Cover a lot of it. Okay, so let's go on a break for five minutes. We'll sync back at 10.55 in five minutes and talk about the high-level design of 10 making it distributed. Thanks, folks. See you in five minutes.

[break ~01:50:43-01:54:56]

**[01:54:56] Teacher:** *(admin)* Let's start with the second half. And now we talk about, let me just quickly check on why I get this. Oh, sorry. Speaker is set to different speakers. Great. Mic speaker. Okay.

## [01:55:18] Making the cache distributed

[01:55:18] Now let's make our cache distributed. Why? Because now, first of all, why do you want to make things distributed? Because one node is not able to handle the load. When one node is not able to handle enough load, that's where you are distributing the cache across multiple machines. So we'll brainstorm on four or five things. First is storage, second routing, third availability, fourth reliability, fifth scaling. We'll talk about all of them in detail and understand how it works.

### [01:55:50] Storage

[01:55:50] So let's start with storage. That's the easiest place to start. How will you make your cache distributed? I'll give that answer. I'll give an answer [check: possible ASR duplicate] for this and then we'll start the actual conversation. So storage is pretty much sorted at one node is not enough to handle the data or the load. What we do, we take the exact same cache that we have and we create multiple instances of it, each handling a range. Let's say A to J, K to T, U to Z. Just giving an example. So it's a classic way to have a distributed cache. This is the exact same single node implementation that we had. Exact same single node implementation. But now we have just split the load in different mutually exclusive subsets of keys and put it into three different nodes. So we just distributed our storage.

### [01:56:52] Routing

[01:56:52] But now this adds a complexity. That when you have a client want to talk to or store a particular key, how would it talk to? How would it know which one to talk to? So let's say this is my cache one. This is my cache two. This is my cache three. How would my client data for client? How would it store or access the data in a particular cache belonging to a particular range? Right? It, raise your hands, quick raise of hands. [?Hemant | asr: "heaven"]

**[~01:57:26] Student 1:** Maybe the first thing what we are trying to do is to divide the whole key space, let's say we are, we did that, we have this range now, we did that now. Now we have to make a central place where this division is saved saying like, okay, A to J will go to C1, K to T will go to C2 and U to Z will go to C3. So that's the one logic we have to create where the client will connect and first get to know where I have to communicate.

**[01:58:12] Teacher:** Where would you store this?

**[01:58:15] Student 1:** This has to be in a place which we are exposing to the cloud saying that, okay, if you have to connect to our distributed system, this is the place you will send your first request to get to know. And then we'll let you know which is the C1. Let's say if the request is for A to J. So first request comes to a central place. It divides that routing or path finding for C1 and C2 and the request is redirected.

**[01:58:45] Teacher:** Who is redirecting the request? So client talk to this routing layer. Now this routing layer responds to the client or routing layer forwards the request?

**[01:58:54] Student 1:** I mean, there are pros and cons in both cases in my understanding. It's not a state that always you do the same. Different systems do a different way.

**[01:59:06] Teacher:** Perfect. Thanks, you have very solid understanding. Brilliant. Which is what I want to talk about next. So what we just added, and this holds true for any distributed storage system in general, any distributed storage system. So the challenge is we just split our storage across N mutually exclusive subsets of data. Now we need to talk to, so our client needs to talk to one of them and store the data.

### [01:59:34] Four ways of routing - the bank analogy

[01:59:34] Now there are four ways to do it. You can come up with a fifth way, happy to hand it over here, ways to do it and the analogy that I take over here is you visiting a bank. When you visit a bank, let's say you enter the bank or like you are just going to a bank. What do you do? When you enter the bank, it's very much possible that there is a peon that is there. You go to a bank, the first person you interact with is the peon that is there on the door and he says, hey, I want to do XYZ. The [?peon | asr: "apparel"] says, hey, you don't worry. I'll do it for you. He takes some commission. He takes some [?bribe | asr: "driver"], whatever you may call it. And he gets a thing for you. So this is what your standard way of having a proxy is. That you talk to the proxy. The proxy does that thing for you.

[02:00:32] So this is what you see as the first type of interaction in the bank. Nothing about how many tables are there, how many departments are there in the bank. The peon is the point of contact for you. So you go to the peon, peon gets things done for you. This is one way.

[02:00:50] Second is where after visiting a bank for a very long time, you know which desk to go to, where to go to, to get something done. Let's say you want to deposit a check. You directly go to that particular desk because you are now know, you know that information that, hey, this is where I want to go to get this particular thing done. No one has to tell you that. So this is where your client itself is smart enough to know where to go to to get things done. Which means that in this case, if you go with this approach, this routing information is with client itself and there is no need of router. So the client knows the existence of all the tables, all the departments of the bank. And it knows if I want to get something, here's where I want to go. So this is where your client knows.

<!-- chunk_11 02:01:38-02:14:21 -->

**[02:01:38] Teacher:** Now, disadvantage of this, if tomorrow bank changes this responsibility to some other desk, you need to know, that's a disadvantage. So your client needs to know whenever something changes, all of your clients needs to be notified about it. That's okay. But that is the disadvantage of that. But there is an advantage that there is no intermediate hop required. You save on the bribe that you are paying, which is in this case network latency. This is such a beautiful example. But you are just saving on that extra bribe that you are paying today, which is your network latency.

[02:02:09] So these two ways. Now the third one is, let's say you enter the bank. There is no peon. There is no peon. [check: possible ASR duplicate] Where would you go? If there is no peon, when you enter the bank, you want something done. You typically go to the first desk that you find. *(admin)* I'll take your [?question | asr: "caution"]. Please, please lower your hand. I'll take the [?question | asr: "caution"]. Wait. This is why it breaks my flow.

[02:02:32] So now in the third case, you entered the bank. There is no peon. There is no central authority that you are going on. Where would you go? You'll go to the first desk that you find, which is close or quote unquote nearest to you. You go to the desk and say, "Hey, I want to get this thing done." Now it is possible that the person on the desk is like good enough. Is that okay? Sir or ma'am, [unclear: "I guess what for request?"] I'll take care of that. I'll forward it to the desk and I'll sort it out for you. So then that desk, the person sitting on the desk that does that thing for you gets the response and sends it back. This is not a central one. This could be your client could have gone to any desk, but the bank is very like, it's very customer friendly. You go to any desk, they would do and they would, it's their responsibility to forward it to any desk that they know they would solve this problem. Right. And this is how the entire domain of IPFS works. Interplanetary File System works, like BitTorrent works on the same overlay network. Right. Have a huge series on that one with you. Right. This is IPFS based.

[02:03:35] Now, other thing, other final case that would happen is you entered the bank, you went to the first desk, desk is available. They say, "Hey, I am very busy, but go to counter number 13 and get things done." So what it says is you go to the nearest one. It tells you where to go to and you go to that particular counter. This is the fourth way to do it. And if you look carefully, this is what your DNS does. When we discuss DNS, we went to the DNS server, it sent back the IP address to connect to, we directly connected to that IP address, right? This is exactly how DNS works. These are four very common practices that we see in day-to-day life, translated as is in the world of communication in distributed system.

[02:04:22] [unclear: "Take your favor."] This is how your load balancer works. You can use it as routing layer, proxy layer, whatever you may call it. But this is standard practice where you have one point of entry for everything and it's their responsibility to get it done. Otherwise, make your [?client | asr: "plan"] smarter to know where to forward the request to. Third, make all the people, all the nodes, let them be friends and they take care of things on behalf of you. You connect to anyone and [?fourth | asr: "forth"], they go to someone and they tell you where to go to and you go to that other. [?Four | asr: "For"] very standard way, for very standard routing slash communication thing that you'll find in distributed system. This time you pick, you'll find one of these things. Everyone has disadvantages. Everyone has advantages. You pick your battles to fight. But this is really important on how you are doing, what you are doing over here.

[02:05:14] And there is no one right way. To be honest, there is no one right way to pick a particular approach. In some cases you may think, if I want to save an extra network hop, let me just make my client smarter. If you want to make things easier for a client, add a network hop and let your proxy layer hold this routing information. And if you are building a gigantic decentralized systems like Bitcoin or BitTorrent, then you make your client and let them for, and by the way, these are internet works. You connect to a machine, that machine connects, forward packet to other machine, that forwards to other machine and then other machine. And then it gets the response and sends it back. This is how internet works. FYI. Right. Make it like a DNS, you send this, it sends you where to forward it to. And then you go to that particular node directly on your own. Pick your favorite, whatever works, works for you.

[02:06:06] But in case of a cache, this would work for a cache, having a central proxy or a router that holds the routing table and it forwards the request for you, kind of a load balancer. *(admin)* Just a minute. Okay. Second is around, this would work for a cache where you're making your client smarter by holding the routing information and it can directly talk to that. But disadvantage is anytime the topology changes, the client needs to know about it. This you typically would not use for cache because it's unnecessary any connect to any client and it's just far too many complications there. But the final one where you would want to do this is what Redis actually does, where it wants, when you're firing a query on replica, it spits out the IP address of master and ask you to go [?write | asr: "right"] on master. Replica doesn't take writes. So you pick any of the strategy to implement your routing part. But this is a very generalized way of looking at things that you can build any distributed system routing layer on top of this. And this is really interesting. Of this part, it's very simple, very fancy and not, rather it's very simple and very fun to build what we just did. Right. Okay.

### [02:07:26] Availability - adding a node

[02:07:26] Now what this, now let's talk about availability. Right. We talk about availability, a very interesting thing comes up over here around what if a node becomes hot or out, let's not, not a node become hot. That's a different one that we'll solve next week, right, on how to handle hot partitions when we design S3. But here let's talk about what if I want to scale this system? I had three nodes, right? But now I want to add a fourth node because three nodes are not able to handle the load. I want to add the fourth node. How will you add it?

## [02:08:02] Consistent hashing

[02:08:02] Now this is where quote unquote, the most famous algorithm of all time, consistent hashing comes in. There are tons of misconceptions around it. Ton. Let me sort that out one by one, right? So now we'll talk about consistent hashing a bit. Right. Okay. So hear me out really well. Right.

### [02:08:22] Hash based routing and data movement

[02:08:22] So how does your router route the request, a very common strategy? We talk about the example that I took. I talk about range based [?partitioning | asr: "partistic"] where we created range, hold it in a table. Proxy holds this information, cache client talks to proxy, proxy forwards the request over there, right? That is one way to do it. That is [?hash based routing | asr: "hash based out"]. What you typically do is for every key you now need to know where that key resides. So you write a simple hash function on your router side. Whenever the key comes in, hash function is applied on that key. It finds which node to forward it to, the router forwards it to that node. Right. This is how you are defining ownership of a particular key. This is the key concept, ownership of a key. Here also when we design this, here the ownership: keys from A to J are owned by cache 1. A to T are owned by cache 2. U to Z are owned by cache 3. In a hash based strategy, I would have taken hash of the key that I am passing. And it would have spit out anyone. And that would be owner of my key. That is hash based routing.

[02:09:35] Now here what happens is typically with hash based routing. I am taking a hypothetical example. But it tells you how cruel this can get when it comes to dynamic scaling up and scaling down. So hash based routing is by far the most common because it almost uniformly distributes the load across all things because hash function is nearly random enough, or rather not random but uniform enough, that can go to anyone but deterministically. So let's say I have six keys. K1, K2, K3, K4, K5, K6. When I pass, and I have two caches, cache 0 and cache 1. When I pass this key K1 through the hash function, I get zero, which means my key K1 is owned by cache zero. Similarly key K2 is owned by cache zero, K3 is owned by one, K4 is owned by one, K5 is owned by one, K6 is owned by zero. So I have three is to three distribution of all my six keys. So near equal distribution, really happy.

[02:10:34] Now let's say I added one more cache node into my system. Now what would happen? My hash function now changes from hash function mod 2, instead of that it becomes mod 3. Now I have to do data movement because my hash function has changed. So I have to literally go through every single key in my system and figure out now where would it go. For example, I'll take K1, pass it to the hash function. Now it spits out in the value of 0 to 3, any value in 0 to 3, but [?deterministic | asr: "determines it"] again. So let's say split out 0, it goes to cache 0. Cache two, one, one, zero, two. But if you look carefully. The key K1 was at cache zero, remains at cache zero. So no need to move that key. Key K2 was at zero, now goes to two. So I have to take key K2, copy it from cache zero and move it to cache two. Then cache one remains as is, cache one remains as is, no movement there. Key K5 which was going to cache one now goes to cache zero. So I have to take the key from cache one and move it to cache zero, and key K6 from cache zero, I have to move it to cache two.

[02:11:45] I'm still having equal distribution, but it is requiring me to move three keys from two different nodes to three different nodes over here. So I'm doing 50% data. This is a pain point.

### [02:12:00] What consistent hashing solves - ownership

[02:12:00] Right, so now what consistent hashing solves. In the previous I shared about consistent hashing. Now understand what consistent hashing solves. First of all, consistent hashing is not a service, it's not a microservice, quote unquote. Consistent hashing is not a magical solution that solves all of your problem. Next week we'll talk about a place where consistent hashing sucks big time. You should never use consistent hashing for that, some other technique works the best in that case, right. Understand what consistent hashing actually does. Consistent hashing solves for ownership, that is it. Consistent hashing helps you determine who owns what, done and dusted, that's all it does. It does not do data movement for you, it does not do uptime guarantees for you. Consistent hashing is a simple data structure, or not really data, it's a simple technique to tell you who owns what. It just helps you determine ownership, done and dusted. It does not do data migration, it is not a microservice, it's a simple array.

[~02:13:10] I have a blog on it, I think I've added it in the pre-reads as well, on how to implement consistent hashing. It's a simple array with binary search, that is it. It does not take a huge amount of space. Implement consistent hashing. Hardly [unclear: "one R3"]. Hardly. I have a very detailed blog with Python source code on how to implement your own consistent hashing with very nice example. Go through that. It's there on my website. Under blogs. And I think I've shared it in pre-reads as well. But understand this. What consistent hashing is doing is it is solving for ownership.

[02:13:48] So now how does it solve? So I'll brief you about consistent hashing a bit. So visually, whenever you are exploring [?consistent hashing | asr: "considering everything"], everyone just draw this ring and that's the simplest way to do it. But implementation, read that part. But now this is a very nice visual representation of it. So what happens is the things that will own something, in this case, cache nodes, the servers are placed on consistent hashing on this ring. So consistent hashing, basically it works on a hash function.

<!-- chunk_12 02:14:21-02:27:23 -->

**[02:14:21] Teacher:** Range 0 to 2 raised to something, let's say I do it with 2 raised to 4, so 16 unique values I have. In reality it is 2 raised to 128 also, so gigantic value, right? So now what happens is every node, so you pass the identifier of cache 1 through the hash function, it spits out, let's say, 3, so my cache node cache 1 sits over here. Let's say when you pass in cache 2, it spits out 12, so my cache 2 sits over here. When you pass cache 3, it spits out 5. So cache 3 sits over here. For cache 4, it spits out 10. It sits over here. So these are the places that my cache nodes held in this ring.

[02:15:02] Now when you get a key, I want to store. Now where is this implemented? At your router layer. The router that we discussed, the central layer. Whoever is holding the routing. If client holds the routing, it will be stored at the client side. If you have a proxy that does it, there. Routing thing that like DNS, it will be stored there. Right. So this is just a routing information. All it needs to do is just have an array of four elements where you're storing this. That's it. That's all you're storing in a consistent hashing quote unquote ring. You don't have to store link list or whatnot. Very simple implementation. It's there on my blog. Right. But the idea is this is where your request comes in to determine the ownership.

[02:15:43] So even when we're talking about routing here, if we keep the logic, that table, this is the one who is telling you who is owning it. That needs to know who is owning it. That's how it would know where to forward the request. Here your client knows who owns it. So you are directly going there. So what consistent hashing is effectively doing, it is effectively replacing this with a fancier stuff. It's not a service. It's just this small thing. It's just replacing this mapping in a very elegant way. Okay.

[02:16:20] So let's go a little deeper into this. So now I'm here. Let's say my client wants to submit key K. Put key K in my system. It came to the router. It said, hey, I want to write key K. Please handle this request permit. Now this router would say key K, key K1. Where would it request go to? So now let's say key K1 came in. K1 through the hash function, let's say, spit out 0. It would pick the first node to the immediate right of it to place the key there. So who owns key K1? The first node to the right of 0, which is 3, 3, cache 1, so then my data goes to cache 1. So key K1 will be owned by cache 1. This is the ownership that I'm talking about. This is what consistent hashing does. That's it. It just determines ownership, nothing else.

### [02:17:10] Adding a node

[02:17:10] But now the advantage of this is, we just saw that when we use hash function, it can go anywhere because it could have equal probability of coming anywhere. The problem with this is when I add a new node in my system, a lot of data needs to be rebalanced. A lot of data movement needs to happen over network, which is very slow. So can we make it faster? Now let's see how consistent hashing makes it better for us. We'll go into practical usage of data. [check: words possibly lost at segment boundary] Minutes, so let's say I had four nodes taking up this place, but I want to scale up my system. So what I do is I add a fifth node. When I add a fifth node, I pass cache 5 through my hash function, let's say spit out one, so it spit out one, so cache 5 sits over here. Now if you look carefully, what, what has happened is key K1 that used to go to cache 1 is now owned by cache 5, because the ownership has changed.

[02:18:09] As soon as my ring takes, as soon as you change the consistent hashing ring, adding this value. Now suddenly when the new request comes in for key K1, it will now go to cache 5. But if you look carefully, all the keys that are part of this range that used to go to cache one, sorry, that are part of this range that used to go to cache one will now go to cache five. These keys that used to go to cache one will still continue to go to cache one. All other keys remain unaffected. Minimal data transfer. This is what minimal data transfer is all about that I am talking about. And so you don't, these keys are not even touched at all. What is happening is the nodes where it is placed, only the nodes where a new node is placed, only the nodes before and after that are affected. No one else is affected. So you do the bare minimum data transfer to where the node is added. Right? This is the benefit of using consistent hashing, that it, all it does is it ensures that you have to do minimal data transfer and you scale up or scale down. Just like adding a new server.

### [02:19:29] Removing a cache server

[02:19:29] What if I'm removing a cache server? Let's say cache one, and there are two cases. We'll talk about both. We'll talk about them both. And then we go into practicalities of it, infrastructure wise, how to do that. So let's say I had four nodes, decent enough traffic, but I'm okay. Like I have over provisioned it due to cost reduction. I want to remove one node so that I have [?save | asr: "safe"] cost. Then you remove this cache one. Now, what will you do in the consistent hashing ring? Key K1 that used to go to cache one now goes to cache three, is owned by cache. So now when you are gracefully terminating it, what will you do? You'll take the data from cache one, copy it to cache three and then remove it from the ring, so that the request, when it goes over here, it does not lead to a cache miss. That's how operationally you do it.

[02:20:22] So when you're terminating a particular server gracefully, you first take a snapshot, copy all the data over here and then remove it from the ring, so that the request when it [check: words possibly lost at segment boundary] to a cache miss. Second case, if let's say you abruptly delete the server, it went down, abruptly removed from it. All the load for this range, all the load for this range that used to go to cache one will now suddenly go to cache three. You should be okay with that. So when it is an abrupt shutdown, all the requests would suddenly start going to cache three. But if it's a graceful one, you do a bare minimum data, because all other keys, all other other keys, they remain unaffected. Again, minimal data transfer. This is what consistent hashing does.

[02:21:12] Now just to think, how do I know about this so much? I've used consistent hashing in production, that's what I'm so confident about it, that what it does and what it does not. [?Tons of | asr: "turn off"] misconceptions floating here and there on the internet, so try to stay away from them and understand what one problem does it solve and how it solves it. For implementation, refer to my blog on consistent hashing. I think it's there in the [?pre-reads | asr: "previous"] as well. [?arpitbhayani.me | asr: "Arpitbani.me"] slash consistent hashing. If you type or Google search [?Arpit Bhayani | asr: "Arpitbani"] consistent hashing, you will find that blog. In that I've talked about implementation of it. Just like how we talk about infrastructure side of things over here.

### [02:21:51] Data transfer in practice

[02:21:51] Now look beautifully. When we do data transfer, how will we do data transfer? Let's talk about practicalities over here. If you look carefully, if I know my cache five is getting fitted over here. Right? Let's say if I just start a blank cache server and add it over here, what would happen? These keys will go to over here. There is nothing over here. It would lead to cache miss. So higher load on the backend systems that you have. Right? So how do you spin up this server? What do you do? You take the snapshot of cache one, you add cache five and then add it to this ring. So that when key K1 request goes over here, it would have the data. And then slowly delete the data from [?cache five | asr: "cache file"].

[02:22:35] This is how operationally you take care of this. Step by step. You take the snapshot of [?cache five | asr: "cache file"]. Prepare [?cache five | asr: "cache file"] server. Add it to this ring. Request comes over here. And then slowly delete the keys that are part of this [?cache five | asr: "cache file"]. Simple. This is how operationally simple it becomes. It's very simple, bare minimum thing that you have to do. That's why a lot of people use consistent hashing, because it gives you just one thing. Minimal data transfer. There is nothing big magic sauce behind it or not magic essence behind it. It's very simple, very beautiful in the hindsight. Right. Okay. What else? This is about consistent hashing.

### [02:23:21] Distributed hash table

[02:23:21] And what we just discussed is we discussed a distributed hash table. So just want to sprinkle few things about distributed hash table. What we just designed, a distributed cache, is actually nothing but a distributed hash table. The entire internet is a distributed hash table. The BitTorrent network is a distributed hash table. The Bitcoin network is a distributed hash table. [check: possible ASR duplicate of the BitTorrent line] It's a very generic concept. You just change the underlying storage and store it in memory. It becomes distributed cache. [unclear: "Storytorn"] becomes distributed storage. The kind of applications you built on top of it, that changes. But the idea is pretty simple.

[02:24:03] Idea of a distributed hash table is that there is no central entity that everyone talks to. In a distributed cache, you can choose not to go with a central routing server and still get [unclear: "Tingser"]. So there is no central entity that you are talking into. If I talk about internet scale, if I talk about BitTorrent network, then you literally talk to the nearest server. If it has a data, good enough, otherwise it forwards the request and it, otherwise it responds back to the IP address of other machine that you can go to, or other machine that you can go to, or other machine you can go to. It always converges back and that's the property of it. Right. And when you add a node or remove a node, you have to do minimal data transfer, which is why consistent hashing like algorithms or techniques are used in implementation of any distributed hash table, because in case, even if a server goes down, other server takes its place, you have to ensure a minimal data movement.

[02:24:57] So DHTs are everywhere, everywhere. Any distributed file system, our distributed cache is an example of distributed file system, where you have, where you don't have a central entity and you need to do minimal data transfer when your node goes up and down, that falls into the category of DHTs. DNS servers are DHTs. Instant messaging app, IRC clients, you might have heard of those, were DHTs. P2P networks, BitTorrent, DHTs. Interplanetary file system, where entire blockchain data, or basically distributed storage that you are doing, are on NFTs and all. IPFS, people store it. Interplanetary file system. If you have not heard of it, look for IPFS.io. You will understand what I am talking about. All distributed file system. All DHTs in the hindsight.

### [02:25:47] Kademlia

[02:25:47] In case you want to understand, in case, not an obligation, in case you want to understand how the routing happens, so very fascinating topic. I have 45 minutes of deep dive into this paper called Kademlia, mind-blowing implementation. I loved it when I first understood it. And then I made it very simple terms and I put it in a video. It took me three days to just understand Kademlia, what worth every minute that I spent on it. So what's that? It's a very fascinating concept, very fascinating implementation, very fascinating idea. And world is using it. [check: words possibly lost at segment boundary] Routing. So you might have this question that does every node know about every other node in the internet? No, but then still it tends to somehow route the request and converge it to the node that has it. Right. That's what Kademlia does for you. Right. So in case interested, it's there on my YouTube BitTorrent series where you'll find Kademlia video. I don't know how that video does get viral, but that's fine. Watch it. Watch it. It's very fascinating concept. Very fascinating [check: words possibly lost at segment boundary] in love with distributed systems after watching that, 100% guarantee. Right. Okay. So these are DHTs, anything that I think we covered, right? Okay.

## [~02:27:05] High availability

[~02:27:05] Uh, okay, high availability. Okay, now let's talk about high availability, because when you're building a cache, see, if it's a cache, it's a different thing, if it's a persistent storage it might be a little different, but in basic concepts

<!-- chunk_13 02:27:23-02:39:19 -->

**[02:27:23] Teacher:** availability, ever ever the way to do it is adding replicas, right? For every node have a replica. If a node goes down, replica takes its place, but it comes with its cost of maintaining that other node, right? But if availability is important for you, you do that. Otherwise have copy of data on other node. Let's say whatever data is on cache 1, I have one copy of it in cache 3. Whatever data I have on cache 3, I have one copy of it in cache 4. So in case my cache 3 goes down, I know my cache 1's data, sorry, in case my cache 3 goes down, my cache 4 will have data for cache 3. So any request for cache 3 can also be handled by cache 4. So that's the beauty of this ring, that you can have a replication factor of your data and you can say that, hey, this data is replication factor of, let's say, 2, which means the node that owns it stores it and two nodes immediately after that in the ring would have the data.

[02:28:22] So in case a node goes down, you know where to find the data and reconstruct this node if required. That is high availability. So data redundancy is a way to get high availability, either across nodes or across system. Like create a standby server or a replica over here. If this goes down, replica takes its place. That's how you can ensure high availability. Standard practice has to do when it comes to reliability. Even for your cache it is important.

### [02:28:51] Redis AOF - append only file

[02:28:51] So even Redis has this AOF file format, which is Redis's write-ahead log. It's called AOF, append only file. So what it does is, every time you write something to Redis, it makes an entry into that file, and it loads it when your cache rebuilds. Let's say you rebooted it, it loads everything from the AOF file, cache that you have. Standard way to ensure reliability or durability. Actually, durability is the right one.

### [02:29:21] Recap - making things distributed

[02:29:21] This is how you think about consistent hash. This is how you think about making things distributed. So storage, you store it in separate nodes with some routing logic, with some logic to determine ownership, hash based routing, partition, range based routing, two very common ways to do it. You have a hash function and you take care of that. Key passing the hash function, get the ID and connect it there. Then you have which is what your routing layer consists of. Now, when it comes to routing, there are four ways to do routing. It applies to any distributed system in the world. Not everyone will suit everywhere. Pick your battles, which one to suit where. Everything has pros and cons. Identify it.

[02:30:06] But we spoke in depth about the routing side of things. Then around availability, adding replicas and all. Reliability around load scaling, consistent hashing, when you're adding [?more nodes | asr: "monodes"], you mean more, not doing minimal data transfer is important. And this concludes everything about distributed cache. We spend a lot of time talking about single node implementation details and we spoke in depth about making things scalable, right? Okay, any questions on high level part of it before we go on and take questions on other side? First let's talk about [unclear: "highly adubav"].

## [02:30:42] Q&A

### [02:30:42] Redis routing

> **Student Question [02:30:42] - Student 5:** Yeah, but I had a question on routing. So we, in the Redis's way of routing, which is DNS like, we still have a network hub, but it is, could not decide to use a load balancer. Was it to just simplify the infrastructure to use it?

**[02:30:59] Teacher (answer):** Exactly. Why to have another [unclear: "couple"], let the node itself take care of that. So it's, and it does not do it for every time. It just does it in case of replicas. So if you're firing a write request on replica, it's you the IP address of the master and request you to connect to that.

> **Student Question [02:31:16] - Student 5:** Okay. And for read request, the client is supposed to know which Redis.

**[02:31:21] Teacher (answer):** Both ways are there. So Redis Sentinel solves that problem. So Redis is evolving. Now it has a proxy you can define that has that information, that becomes a face of it and it takes care of routing and whatnot. So there are a lot of changes happening. I'm still yet to basically catch up on that. Let me catch up on that and if I get hold of it, I'll definitely try to answer that. But I know this is how Redis does when you are firing write request on replica, 100%. Around routing in a distributed Sentinel setup that it has, I'm not sure how routing happens today. So I'll not comment on that, but go through the talks on how that routing happens today. A lot of things have changed since the last time I visited.

**[02:32:04] Student 5:** Got it. So my takeaway is that it can be a mix of two or more of these approaches for different ways.

**[02:32:10] Teacher:** Yeah, for each of these. So this is typically how, if you fire write request or read replica, it would spit out IP address of the master node. That is the most common way. Almost all databases adopt this. Almost all databases. Either a database can choose to just discard the request and return an error and say, go find the master node. It's how like the humans behave, right? Same thing. I don't know. Go find on your own. Right. Otherwise someone kind enough to say, oh, this is where you should go. So, in most cases you would see this as an implementation.

**[02:32:44] Student 5:** Got it. Yeah.

**[02:32:46] Teacher:** Thank you. Nitin?

### [02:32:50] Consistent hashing - nodes close in the ring

> **Student Question [02:32:50] - Student 2 (Nitin):** So, I had few questions related to consistent hash. So, is there a possibility where nodes in the ring are placed too close?

**[02:33:00] Teacher (answer):** Yes, then that's a disadvantage of consistent hash because it's not in your control.

> **Student Question [02:33:06] - Student 2:** Okay. And also the possibility where a lot of keys are densely populated, like certain area of the ring is densely populated.

**[02:33:17] Teacher (answer):** Yes, very much possible. Hot partition problem. That is there. Consistent hashing suffers from both. Consistent hashing. Unfortunately, what is happening is, in case of consistent hashing, because it is hash based strategy, you are giving the control to an [unclear: "untim"] hash function: please do it uniformly enough, the best you could. But if your key distribution is bad and your hash function is bad, what would happen is you would not see that uniform distribution. So you would see hotspots, a particular node getting very hot as compared to others. And then you add one more node just to try to mitigate that particular solution, that particular situation. But consistent hashing suffers from all this problem. But then why are companies still using it? Consistent hashing typically makes us scaling up, scaling down simple enough. The range is not short enough, it's long enough, two raised to power 120, [unclear: "it's a jive"] can take the range. What are the odds? So everyone's playing by the odds.

**[02:34:18] Student 2:** Okay, got it.

**[02:34:22] Teacher:** Any other question? No? Okay. You said you had few questions, that's why I was waiting for that. That's right.

**[02:34:30] Student 2:** Okay, I mean most of the questions were, most of the questions were answered by you. I mean, like, to like interpret all of these points. So yeah, thanks.

**[02:34:40] Teacher:** Thanks. Okay. Hemant.

### [02:34:43] Virtual nodes

> **Student Question [02:34:43] - Student 1 (Hemant):** I would like to just understand a few places. I have read about virtual nodes inside this ring. So what they suggest, I'm not sure how good it is. And that's why my question is, if we divide the ring in virtual parts, I'm dividing it like 10 or 20 or something. And these virtual nodes are on actual physical nodes via grouping. Then is it really a good strategy? Because I do not find a confidence on that.

**[02:35:24] Teacher?:** Why?

**[02:35:27] Student 1:** You said why?

**[02:35:28] Teacher?:** Why, yes.

**[02:35:29] Teacher:** Why are you not confident on the strategy?

**[02:35:32] Student 1:** Why I'm not finding confidence is the logic behind consistent hash to minimize the data transfer or with partitioning. Whatever you use ownership, I said partitioning. Yeah. Same word. [unclear: "List"] if I try to divide in a very small chunks and I see few of the chunks which are not on a consecutive line in the ring, go to different servers. Then if one server goes down, I see a lot of chunks has to move, in place of the current strategy that you have. So it's just only a two kind of a transfer. I can see. Yes. So I do not find that. Is it the right way of taking out?

[02:36:18] Yes.

[02:36:19] Yes.

[02:36:20] Yes.

**[02:36:20] Teacher (answer):** Yes. A thousand times. Yes. My God. You are on fire today. This is exactly what a disadvantage of having virtual nodes is. If you do that, like, imagine, now think operationally. I mean, this goes for everybody. Here, whenever someone's explaining consistent hashing, they talk about virtual nodes. In case of stateful systems like this cache, where nodes itself are storing stateful data. Now what happens is, when we added cache 5 in the system, what did we do? We took the snapshot of cache 1 and put it over here. It made life so simple for us. The data movement that was happening was operational if you think about it. You just have to take a quick snapshot of this cache and load this cache from it. It's a very efficient implementation, right? Nothing fancy then.

[02:37:11] As soon as you add complexities of virtual nodes, what happens is, when you are spinning up this part, you, this node will be placed at multiple places. Now from multiple other places, you have to load data on this server. Operationally that becomes challenging. You might miss out on something, or one of the things, transferring data from one of the other nodes is slow enough. It's slowing down your process. So adding virtual nodes is not a good idea to solve hot partition problem. And it is stateful use case, not a good idea. Companies still do it. There are hacks around it. But if you think about operational, the operational expense that comes in, in order to spin up infrastructure, find out nodes for you to copy the data, you have to copy data from a lot of places instead of just one. They're doing, still doing a lot of network transfer, which you started consistent hashing just to reduce that. But now you're doing that other part. So that's the limitation of using virtual.

[02:38:08] Thank you so much for bringing this up, and this is it, precisely where it falters, right? But again, it's not that it's bad. I'm sorry. It's not that it's worst. It's still bad enough. So long as you are operationally okay to do, to take up this amount of network transfer, it's okay. Right. But if you want to keep things operationally simple, which I prefer a lot, I would just do this. This one node, copy paste here, their server up and running in a, in a brisk, and I'm done, right? So I would like to keep things simple as compared to things operationally complex, because simple systems scale. And this is precisely where virtual nodes is a bad idea, right? Thanks so much for making that. Okay. Any other question, anyone? Yeah, Gaurav.

**[02:38:57] Student 6 (Gaurav):** Not related to today's topic, I have some

**[02:39:01] Teacher:** Let's, let's complete consistent and then I'm more than happy to take care any questions on distributed cache in general that we discussed today throughout. Rajiv, go to malloc, malloc page.

<!-- chunk_14 02:39:19-02:50:24 -->

### [02:39:19] malloc and segfault

**[02:39:19] Student 3 (Rajiv):** No, I have been a C developer for a while, so malloc doesn't return the segfault when the heap goes out, it returns the null pointer, and C++ we get bad alloc as exception. So this use case makes sense where you want to ask the user, how much memory you want to allocate for a cache. So you take in the memory, you just put it over there, but in general, if you want to leverage the whole system, you just check whether the return type of malloc is null or not. If it is null, you want to affect 100% 100% malloc returns null.

**[02:39:50] Teacher:** I totally agree with that. But when you go beyond that, the program actually causes, I simulated it while I was building. Here it is. It crashed. It came down. So obviously you know it better than me, but when you allocate using malloc, it assigns a virtual page, not a physical page. Right? So although your RAM is, let's say 4 GB, but your malloc can allocate 40 GB virtual space. So it starts allocating physical pages when you're actually starting to use the logical pages. Right?

[02:40:21] When you go beyond that, and I actually ran that experiment while I was building my Redis to deliberately crash it because I read it a lot of places that program crashes, but I never saw it in action. So I found a blog, very old blog by someone almost a year back. And that code had this part where that person repeatedly malloc'd a lot of stuff. So malloc does give you null, but beyond when you are, when you are not just allocating, but also reusing the pages that have been allocated to you, beyond that thing the program crashes. It's not fault of malloc, program crashes. That's what I have also observed. I might be wrong, but if you can find, if you can help me in that direction, more than happy to correct it, right, more than happy to do it. But I was able to crash my program beyond the limit, like beyond my, so because the way I did it, I allocated a page. I filled it with [?ones | asr: "once"] and then I did malloc again and did malloc again because I was leveraging. I was reusing this thing again and again, after a certain thing, the program segfaulted. It crashed because of a high memory usage. And that's what I also, but I, but I, again, you know, because you have much more practical experience than I have, I was able to crash the program. That's why I said this, but in case I'm wrong, happy to be correct.

### [02:41:42] CDC instances and load

> **Student Question [02:41:42] - Student 3:** Sure. CDC part also had one question. So [?CDCs | asr: "cities"], if you go to the slide there, I want to understand how CDC, so CDC, you have drawn multiple instances of, basically a node. So, we said that there's a write-ahead log with CDC reads in bulk and then write in the same sequence in Elasticsearch. That means one CDC instances, they take an handle of SQL client basically, right? So it should be an active standby kind of architecture, is it, is it like, should be active, right? Active standby both works. [check: "active standby both works" may be the teacher replying inside the student turn] Yeah, but for replica, for, for like, if you have n nodes active at the same time, how would they synchronize what to read from where, which partition to read, what was last?

**[~02:42:24] Teacher (answer):** From one replica. You don't need to read from all the replicas, all replicas have the same data, right? You can configure CDC to read from just one of the replicas.

**[~02:42:28] Student 3:** Okay, so but [?N | asr: "ends"] CDCs are reading from one replica, or they have to know that from which partition index?

**[~02:42:34] Teacher:** Have a small database of their own where they keep track of it. They, they basically [?contend | asr: "content"], so simple remote locks come into the picture. They are all [?contending | asr: "containing"] for, in order to read that same thing, right? So it's normal synchronization primitives that they apply to read it.

**[~02:42:52] Student 3:** But at one time only one CDC would go and take a lock and then read the data and then put on one table.

[02:43:02] Okay. There are two. Multiple tables.

**[02:43:04] Teacher:** Yeah. That's, that's the case, right? You have multiple tables, right? So in order to read them in parallel, you can use this, and for CDC, CDCs have a small database where they keep track of these things, but hey, this is the last point that I read. I have committed this point on all of them. And then it, and then it, and that gives us a, right.

> **Student Question [02:43:25] - Student 3:** And regarding load part. So you told that the API service that were workers we had from Kafka node, they were putting a load on MySQL database, right? Server to read data and put into Elasticsearch or whatever.

**[02:43:37] Teacher (answer):** MySQL, sorry, Kafka never read from MySQL.

**[02:43:40] Student 3:** Are you talking about API service? Yes. API service. They read from API events, whatever events API server published. [check: speaker - this segment may contain the teacher's clarifying question and answer] Okay. Got it.

> **Student Question [02:43:48] - Student 3:** So you said that the workers were actually fetching the IDs or whatever events they were sent from API and then they're reading the actual data from the MySQL database and then putting into the sink source, whatever is there, right? So you told them that they would be load on the MySQL instance. Now, now I want to compare the load, what, whatever the workers were doing as compared to the CDC load, impacted load, what is the comparison between? Because there also you have WAL logs, over the source of reading would be still the same, right?

**[02:44:17] Teacher (answer):** So yeah, but here you can read in batches, and you're doing with API events.

**[02:44:22] Student 3:** Yeah.

**[02:44:22] Teacher:** So every time you, let's say you, you publish a blog, every blog publish is one event for you. Correct. And in that event, either you just pass the blog ID or you pass the entire blog object. If you pass the entire blog object, which means your message size becomes huge. Right. Which requires large network IO to read that huge off message on the consumer side. If you just pass the blog ID, then you have to make a call to the database to read that entire row. Right. Now, when you put it, this would take time because this would put little load on your database to read this and then you write it over there. Right.

[02:44:58] But now here, what you're missing out on is you're missing out on the batching benefits that you'll get when you read from write-ahead log. [unclear: "people rose"], literal rows from the database. The amount of data transfer is still the same, but now the reading is happening in batches. Writing is happening in batches. That's the advantage. The number of messages or the amount of data that is processed is processed much faster because batching inherently solves a ton of problem around this. Right.

[02:45:26] Plus you can also leverage with CDCs. You can, you don't need to have an API event for everything because there are some changes. I'll give an example. You have asynchronous workers that are updating, not in the API request context. Let's say you have asynchronous workers that are doing some changes in the database. Let's say aggregating the likes count on a particular post frequently. Right? So, sorry, periodically. Now, those are not API calls, right? These are asynchronous workers who are updating things on the database. Now, do you want those changes to come to Elasticsearch? Don't you? So, not everything has an event. It's a subset of things. Okay, understood, right? So that's where what you need to do is, it's better to read from the source of truth rather than relying on the [?API | asr: "eps"] server, because not everything would be [?an event | asr: "anything"]. That's where CDC comes in [?handy | asr: "hands"]. Correct. Yeah, sure. Super. [check: "okay understood" / "yeah sure" may be Student 3 back-channels inside the teacher turn]

[02:46:22] But in case you find it, see what I think, I do, do drop me a note, now I'm more than happy to rectify.

**[~02:46:26] Student 3:** I don't know, I just read about malloc, I knew what malloc part, but yeah, I mean,

**[~02:46:31] Teacher:** whatever you discovered was, it failed because I ran it multiple times and it failed for that. [check: speaker boundary - "whatever you discovered was" may still be Student 3] I really, I tried to find a lot of reasons, in most places just written in one line, but because I simulated it, it failed multiple times, repetitively at the same point and my program crashed. So, but you're a hundred percent correct. Malloc returns null when it is unable to allocate and which is how you get to know about it. It, it further, and which is when you can initiate that part, but I saw that, but in case, I'm more than happy to get

**[~02:47:07] Student 3:** Crash happens whenever program tries to access some other memory, whatever is not supposed to.

**[~02:47:12] Teacher:** So beyond that, on a physical page, on logical page it can still allocate, but on physical page when it tries to allocate, that's where it crashes. That's what I got to know through my small prototype that I wrote.

**[~02:47:21] Student 3:** Logical pages convert to the physical pages, right? They, they add the base address and then they find the physical address.

**[02:47:31] Teacher:** Which is where it goes beyond the reach.

**[02:47:34] Student 3:** Okay. So, okay. But logical addresses, logical address, they would have no, but they, they don't have any pick mechanism to know how much I can grow, or maybe always could give a default memory. Okay. But it can't also, because [unclear: "it's a paging rights"]. It's a paging concept. Yeah.

**[02:47:49] Teacher:** That's why even, even I don't have any deep understanding of it, but this is what I was able to simulate. So yeah, it's a, it's a very fascinating world. I'm very tempted to dive deep into OS and memory [?paging | asr: "patching"] after I discovered this, it's there on my to do list for a long time.

[02:48:07] Thanks. Okay. Gaurav, go on.

**[02:48:12] Student 6 (Gaurav):** Mine were, mine were the general questions.

**[02:48:15] Teacher:** I know. Sorry, sorry, sorry. I forgot to lower your [?hand | asr: "head"]. Just a minute. I'll take other one. Anubhav, go on.

### [02:48:22] Growing a set's memory, LRU vs LFU

> **Student Question [02:48:22] - Student 5 (Anubhav):** Hey, Arpit. So I, my question was around distributed cache, the low level implementation that we discussed. So let's say we have a set of data structure in a cache as a value for some key. And say when we instantiate the set, we allocate one zero two four bytes for these sets. And when, when we build up these one zero two four bytes and the request comes in to add more elements. Do we have to deallocate the memory, then reallocate a bigger memory block and copy the data? Okay.

**[02:49:01] Teacher (answer):** So that becomes an expensive operation. So we need. [check: speaker - "So that becomes an expensive operation. So we need." may be Student 5 continuing] Okay. Yes. So that's a hash tables work, right? You allocate arrays of certain size. It fills up. You twice the array, you reallocate, move the data and whatnot. So that's the way to go.

**[02:49:18] Student 5:** Got it. Yeah, thank you.

> **Student Question [02:49:21] - Student 5:** So I had another question on LRU and LFU. So as a generalization that LFU is more performant to use when the popularity of keys is very asymmetric, as in some keys are very popular and these are used by everyone. Whereas other, there are some other keys which are not so popular. Whereas LRU is when it can be used when the popularity is not very asymmetric.

**[02:49:47] Teacher (answer):** Okay. Terms you used were brilliant, but just one thing, keys were popular, but you still don't want to [?evict | asr: "emit"] in case they are not recently accessed.

**[02:49:58] Student 5:** That is a sub case there.

**[02:50:02] Teacher:** So you still want to hold on that because it gave you good returns in the past. You are hoping that it would grow further. You are not looking at the recency [?bias | asr: "buyers"] because the stock went down and want to sell it. That's the analogy that I always go with. LFU at LRU.

**[02:50:18] Student 5:** Yeah, got it. Thank you.

**[02:50:20] Teacher:** Yeah, thanks. DK?

<!-- chunk_15 02:50:24-03:03:21 -->

### [02:50:24] Adding a new node, virtual nodes

> **Student Question [02:50:24] - Student 4 (DK):** So Arpit, my question is related to consistent hashing. So when you're adding a new node, so the data which you're going to copy in that new node is the extra data which is coming in that range. So let's say from cache five to cache one, whatever data is in that range will still remain in cache one or would cache one will have all the data, which is there in cache one from cache.

**[02:50:50] Teacher (answer):** Thinking it operationally, taking it operationally. What we'll do, will take snapshot of cache one, load the data or basically create cache five, added to the ring and delete the data on cache one. There is like, why? Because now basically [?cache 5 | asr: "cache is"] the one that is handling the data. Right? To do that for you. So you can delete the data from the cache. Because now cache 1 is not the first owner of it. But in case you have replication factor set up and whatnot, those complexities, then you may choose to keep the data on cache 1 in any way. Because in any way, we'll have replication factor of two. So then anyway, the data would be copied two times over here. Sorry, two times over here. [check: possible ASR duplicate] Cache 5 data will be copied here also and here also. So in that case, it does not make sense to delete the data. But in case you don't have any replication factor, then you create, you take the snapshot, create this node and then delete the keys that are not needed over here.

> **Student Question [02:51:42] - Student 4:** Got it. Got it. And second thing is, see, still I don't understand the concept of virtual nodes in consistent hashing. Why? Maybe I have not read about it.

**[02:51:52] Teacher (answer):** Let's do one thing. Search for virtual nodes. Go through consistent hashing. Go through virtual nodes in consistent hashing. And let's discuss it tomorrow.

**[02:52:03] Student 4:** Sure. Sure. Right?

**[02:52:04] Teacher:** Once we have that, then you'll be able to understand when we discuss, ask the same question again. Once you have an understanding of virtual nodes, and in most cases, when you go through that and you go through this video and listen to my expression of why virtual nodes wouldn't work, just think about it operationally. How would you copy the data? How many different places would you have to copy the data from different ranges and whatnot, and how complicated things would become for you? And that's when you would realize, it's better to not use virtual nodes when it is a [?stateful | asr: "shameful"] application. Than happy to discuss, spend some time understanding what virtual nodes are, more than happy to discuss. Sure. Thanks. Thank you.

### [02:52:47] Single-threaded cache and hardware utilization, malloc limits

> **Student Question [02:52:47] - Student 2:** So I have a question on the single threaded, single node cache that we discussed, what kind of hardware are we thinking? Like, isn't it like if you have a eight vCPU CPU, just wasting seven of them, are we putting

**[02:53:08] Teacher (answer):** Yes, you are wasting CPUs because you have, let's say, and this is typically happens. If you install Redis on a machine and you run it, if that machine has 32 cores, only one core is being used by Redis. Every other 31 cores are sitting idle.

**[02:53:22] Student 2:** Yeah. I mean, I would like to have eight shards on the same machine.

**[02:53:27] Teacher:** And that's what people do to increase the utilization, the hardware utilization.

**[02:53:31] Student 2:** Yeah. That's what I was, I mean, and this whole single threaded stuff, if I understand, way you showed malloc implementation, all of that works because of a single threaded thing. If it, you put a concurrent thing, it would be a havoc, right? Yes, massive, massive havoc. Yeah. And all of the, basically you're saving all those [?context switch | asr: "context which"] costs and all of that's the whole idea, right? [check: speaker - "Yes, massive, massive havoc" may be the Teacher]

**[02:53:56] Teacher:** Yeah, okay, but if you save a ton of things. So basically single threaded makes a lot of things oversimplified, oversimplified, because, but then you still don't lose on [?concurrency | asr: "currency"], that's the beauty of, but you're under utilizing your hardware. So, but you can put multiple Redis nodes on the single machine to leverage it. So there are again trade-offs that you're picking everywhere.

**[02:54:17] Student 2:** Right, yeah, that's what will happen. And I think that's a better idea anyways, rather than introducing the complexity of concurrency, given the use case we have. And one more thing is, yeah, I was hearing out your discussion on the malloc thing. I can add my two cents there.

**[02:54:31] Teacher:** Please, please, please.

**[02:54:32] Student 2:** Yeah, so malloc, basically what you're saying, right? Like that happens with kmalloc. malloc, what you're doing. And if you keep writing it to every [?write | asr: "right"], there is a page fault and you will allocate a page and you keep writing until you exhaust the physical memory. Now there is something different that happens when you use the GNU malloc or user malloc or any other malloc, right? tcmalloc, jemalloc. They have, one is they have, you have user limits, and two is malloc itself has configurations on limits on the user, which you can set because you don't want to be in a case where you're at 98 and 99%. One service can take, if you are hosting multiple services on a node, things like, so generally you will counter them with, one is kernel level U limits, like each process. When you set U limits, two is with the malloc library limits itself. Like generally people don't use GNU malloc. So yeah, that's how. So now about the fault, right? So yeah, you will generally get a SIGABRT. Moment you cross, yeah, because, and two is whenever, so the program does crash, right? Where you hit the program will crash because kernel will kill you the moment you exceed those limits. Kernel wants to save itself, right?

**[~02:55:51] Teacher:** That's what you're trying to... Super. Chalo, chalo, my understanding is correct. Okay, so it throws SIGABRT at that time? Yeah, yeah. But then, so, and it will take, in case we handle that signal then?

**[02:56:04] Student 2:** No, no. [?abort | asr: "About"] is not something that you can. I mean, there are ways you can handle. About is basically, it is a signal where you are saying your instruction pipeline is done. So, this is only way you handle it.

**[02:56:19] Teacher:** I read it. Yeah, yeah, yeah. Instruction pipelines.

**[02:56:21] Student 2:** Now, after about, what you can execute is whatever you want to push and all of that, but you are done. Like it's a sync signal. You're right. But about this, basically the process is killed now.

**[02:56:32] Teacher:** I just remembered my B-Tech. I did this course on that [unclear: "Philosophia's"] Unix book. Programming in Unix book. I had a course and it had part of the SIGABRT. When you said this instruction pipeline, then it hit me. I got it. I started 2011. Final year where I got it. Now I'll [?refresh | asr: "repress"] the concept. Now I know what to Google. Thanks. Thanks so much.

**[02:56:57] Student 2:** No problem. Yeah. Thank you.

**[02:57:01] Teacher:** Program does crash. [?SIGABRT | asr: "Singapore"], you can't handle much. Point noted. I'll refine the material for the next quarter. Thanks. It will be a huge addition.

[02:57:12] Shreya, you have a question, please. Shreya? Shreya is gone. Okay. I'll circle back. Gaurav, you had general questions.

### [02:57:29] Shared and exclusive locks

> **Student Question [02:57:29] - Student 6 (Gaurav):** So I put in the second week class when you, we were discussing about shared locks and also we implemented a few of the [?locks | asr: "law"]. So while I was implementing shared locks, I expected the program to run properly, like 120 seats being allocated to 120 people. Shouldn't that have been the case, because I was seeing some [?read locks | asr: "red logs"] and shared lock,

**[02:57:49] Teacher (answer):** shared lock, when you take shared lock, but you're still updating. When you update, the lock elevates to your exclusive lock and then it doesn't update.

**[02:58:01] Student 6:** So like 120 seats should have been allocated to 120 people. While in my case, five seats were being allocated to many of the people.

**[02:58:09] Teacher:** That should not have happened. What was your isolation level?

**[02:58:15] Student 6:** I don't remember, but I can. Check that once.

**[02:58:18] Teacher:** Check that once. [check: possible ASR duplicate] All right. Check the isolation level. There is SQL administration, basically if you're using MySQL, there is MySQL administrative console, not UI part, but you can check which row is getting which lock. You can see that visualization there, that what is happening behind the scene. So that would help you debug it.

[02:58:37] But let's say if I would have taken shared lock, then the first process to write it elevates it to exclusive lock. Other process still holds the shared lock. Now, if I think of it, it would rewrite. It would overwrite. Was it overwriting? Yeah. Yeah. So, which means that it is not revaluating the statement. But that happens in exclusive locks. So, both of them took shared lock on an object. One of them was writing. The shared lock, one, the shared lock, when it tried to write, because other transaction had an exclusive lock, other transaction wrote first, shared lock, the other, the first, it's clear in my head, but let me, let me put it simply.

[~02:59:30] So let's say you have transaction one, transaction two, and this is my guess, I might be wrong, I'm assuming the isolation level is repeatable read. Yeah, that's what I'm assuming, the isolation level is repeatable read, which is the most common one out there, almost. So two transactions trying to update the, like let's say you have two rows, two transactions. Ideally, both of them should update. Similar. So from 120, I just reduced the problem statement to two. Now let's say both the transaction took the lock on row one, shared lock. Both of them have the shared lock. Transaction two wrote first. So it wants to write. So the shared lock became, for transaction two, the shared lock became exclusive lock. Transaction one still holds the shared lock, the data, no one stopping it from reading the data.

[03:00:20] Both of them are writing to that same row. Like both of them took the lock on the same row. Transaction 1 wrote it. Transaction 2 now starts to write. It waits until the transaction 2, sorry, transaction 2 wrote it, transaction 2 waits for the lock, the transaction 1 waits for the lock to release. Transaction 2 now release the lock. Transaction 1 wrote it at the same location, at the same row. Because both having the share lock, because transaction 1, because that lock got elevated to exclusive lock did not mean the transaction [?one's | asr: "once"] lock got allocated to someone else. It re-evaluated statement did not happen. It had a shared lock on it. When it is trying to write it, it waits until an existing exclusive lock is released. Once it released, it wrote to the same location.

**[03:01:11] Student 6:** Got it. Yes. Got it. This should be happening.

**[03:01:19] Teacher:** You can, there is a tool called Percona, which you can use to visualize this as well. So just, so just basically check out Percona. It has lock, lock viewer or I forgot the name. Use it 2015. I don't recall, but Percona is a great utility that you can leverage. It's a plugin that you can use with MySQL to manage it better. It gives you transparency on the locking state of databases and whatnot. So start with that, but you will stumble upon this thing, but this is most probably, this is what is happening behind the scene. It's so fun to understand transactions and how it is structuring. Yeah, this is what is happening.

**[03:01:59] Student 6:** Yeah, and I also mentioned it to you on the chat, [unclear: "it's a discord credit"] so that once I restarted my system. Yeah,

**[03:02:09] Teacher:** it's right. But I'm not sure what happened, but it could be a bug as well. Very well possible.

**[03:02:17] Student 6:** And it's hard to find out why.

**[03:02:20] Teacher:** Hard to find out. It's hard to find out. In most cases, when you see this deadlock file, I think that data is very hard to figure out what's happening behind us. It typically, like, basically, that's where the gap is. Like, we have a bit of practical understanding, when things hit production, things go berserk and we have no idea what's happening. And also,

**[03:02:38] Student 6:** happening. It was just panicking. I mean, it just showed me an error while what I expected was to terminate [unclear: "the mind"].

**[~03:02:46] Teacher:** No, it does not terminate. The program will not terminate. The transaction will. Program will not terminate. [check: possible ASR duplicate] Deadlock does not lead to database crash. Deadlock leads to termination of transaction. That's it.

### [03:03:02] Connection pooling in PHP

> **Student Question [03:03:02] - Student 6:** And also, we have already discussed about connection pooling. However, recently you told that Facebook uses PHP and also, you know, one of your videos, you mentioned that PHP doesn't afford support connection pooling.

**[03:03:13] Teacher (answer):** No, no, no. I never mentioned P- I have no idea about PHP, PHP connection.

<!-- chunk_16 03:03:21-03:11:11 -->

**[03:03:21] Teacher (answer):** In PHP, I've not worked very deep on PHP. So I'm not sure if it supports or not, but connection pooling is property of database, not of language. Okay. Right. So like the way it's, until you are just setting up multiple TCP connections, you might find a library that does this pool management for you. And then what you're doing is establishing multiple TCP connections with the database and having a queue to manage it. That's it. That's what a connection pool is. You can just spend a day, write your own connection pool. It's that simple. And you just need a blocking queue to implement it. Right.

[03:03:58] So it should be a relationship between my server and the database. Not yes. Yes. Property of language. [check: 03:03:58-03:04:03 may be a student interjection] It's not even property of database, to be honest. It's just property of their application logic or the [?library | asr: "liability"] that you are writing. That's what connection [?pool is | asr: "puts"]. So long as the database is willing to keep the connection open, that's the only requirement that you have. That's the only requirement that you have, that your database should not terminate the connection unless you ask it to terminate. That's it. If your database [?adheres | asr: "adios"] to that, you can build your own connection. Thanks. Shreya?

> **Student Question [03:04:33] - Student 7 (Shreya):** Yeah, I just wanted to ask that if CDC can push to multiple things like Elasticsearch, Redshift, like one CDC can do that, right? We don't need.

**[03:04:45] Teacher (answer):** It does that. I drew it separately so that it's very visual. Otherwise, it would look like star and like some magic is happening, but it's just very visual so that you understand, because the data source of one might not be so. But if you'd want to just fan out to multiple things, you can do that.

[03:05:03] High memory utilization, because depending on the database it needs to do multiple transformations, because let's say you're doing [unclear: "an elastics that"] you'll pass JSON. If I'm storing it in MySQL, you would convert it in a separate format. If I'm storing it in third database or third kind of sink, it would do something different. So CDCs would need to scale up of it. That's it. It would have high memory utilization.

**[03:05:25] Student?:** Okay. Thank you.

**[03:05:27] Teacher:** Okay. Any other question anyone?

## [03:05:34] Wrap-up and post-class chat *(admin)*

[03:05:34] *(admin)* Okay, fine. Thanks folks for [?joining | asr: "doing"], and I'll upload the recordings by three. See you folks tomorrow. Very fun discussion. Will build two databases tomorrow on our own, our two storage engines on our own. Very interesting, on digital building blocks we'll talk about. Right, thanks so much, but you can see you folks tomorrow morning. Bye-bye.

**[03:05:57] Student 2:** *(admin)* Just a suggestion, that if you could, along with recordings, if you could upload the chats also, because there are a lot of...

**[~03:06:06] Teacher (answer):** I tried that. I saw that Zoom folder that gets exported. There are no chats in it. So I'm still checking if I can do it. But where do I upload chats? That is another problem. Because if I do it on Google Drive, how do I share it? There are quite a few challenges there, but I'll copy the chats right now. You can do it. I'll keep the link open. There is, that should be a button to download the chat directly. Okay. Save chat option is there when you click on save chat, but the three dots, hit on save chat and you can download it, but I'll still check. I'll still check. I'm not discarding that option, but I still need to figure out a way to share it and all. All right, okay, thanks, thanks.

[gap 03:06:54-03:07:14 - no speech in recording]

[03:07:14] So you can [?book | asr: "lock"] it till June.

**[03:07:16] Student?:** Thank you.

**[03:07:19] Teacher:** Rajiv.

> **Student Question [03:07:19] - Student 3 (Rajiv):** I saw your some kind of LinkedIn message that you have opened up a new course for new engineers, so wanted to understand what is the depth, I mean, we cover few things.

**[03:07:34] Teacher (answer):** That is [unclear: "busy"] beginners. This is after that. This is an intermediate level course. That is for absolute beginners, like having zero knowledge of system design.

**[03:07:46] Student 3:** ...go in depth of Kafka's and message queues.

**[03:07:48] Teacher (answer):** Why would I go there? It's more about using it. Here we talk about depth. There it's all about, like, there I'll still cover depth, but someone, like, something that an early engineer can comprehend. Here we are all experienced folks, right? I can assume you know, bit of system design, then we take it from there, right? While the beginner is for absolute beginners and product managers, having no knowledge, will literally start from what is database, client-server model, microservice architecture, event driven.

[03:08:18] Here I can spit out stuff immediately. Then I would take it very slow. Starting from absolute scratch to this. And the systems that will cover, it will be mostly blocks, blocks, blocks. Like for example, today when I talk about distributed cache, we spent two hours talking about implementation detail. Then I would not be covering that. Problem statements are mutually exclusive. So the problem statements I cover there will not be covered over here. But if you have done this part, you'd be able to build those systems with ease. Yeah.

**[03:08:46] Student 3:** I saw the contents. Yeah.

**[03:08:48] Teacher:** So that's the difference. It was very strong bias for action. I just got an idea like, then now I had an outline prepared. I had notes prepared for very long time. I said, let me put it out once and for all. So I did have got very overwhelming response. I could not believe the amount of enrollments I got. I'm like, God, people wanted it so much. So like, so [unclear: "from putting on myself"], I'll start recording those videos. Yeah.

**[03:09:13] Student 3:** [unclear: "You watch"] this unique course, basically. I mean, hard to find such course.

**[03:09:17] Teacher:** I just poured in everything I knew throughout my life, whatever I studied, all in this course. I just think happy people are resonating with it. But yeah, in any case there would not be, it's not that things that I covered over here will be covered over there. It will be almost mutually exclusive two topics. I have to overlap like data, like the types of databases I cover. Cover it with both, because you folks also need to know when not to use a particular database, but then I'll cover it in a little more basic manner. So it's a tiered offering now. That's how it is going to be. Thanks. Thanks folks for tuning in.

> **Student Question [03:09:57] - Student 4:** I'll start with one thing regarding the, regarding the, sorry, sorry about that, regarding the [?one-on-ones | asr: "one, two ones"] with you. So you just mentioned that it can be booked in the time slot of June, but one month, within this one month only book, right?

**[03:10:12] Teacher (answer):** Ha ha, max limit. Two months after the cohort ends, up until then you can leverage on one on one. Okay. But within this month only. [check: 03:10:19-03:10:22 may be Student 4 confirming] Yeah. That's not a problem. It's a maximum validity for that. It's not that up there. If let's say you're part of February cohort, you cannot book a time in December. I have to handle those folks as well, right? That's right. So like, I see, find a slot of [unclear: "three 111"].

**[03:10:47] Student 4:** That's idea, right? Okay. Okay. So. Okay.

**[03:11:02] Teacher:** Sure, sure, sure. Got it, got it. Yeah, thank you very much. Thanks for this.

<!-- BODY END -->
