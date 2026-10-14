=== PAGE: lecture overview ===

Lecture 09 · week 5, day 1 · running case: build-your-own Redis

# Build your own Redis

Copying data out without losing it, then a cache built from one hash table up to a ring of nodes, with the cost of each decision measured in bytes, hops and data moved.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1ETL and change data captureThe blogging app's analysts need their own SQL copy of production. The obvious event pipeline drifts silently. Change data capture reads the database itself.7 sections · §1.1–1.7

- 2One node, every byte countedBuild the cache on one machine first: a hash table, values of many types, and a hard cap on memory that the cache can always check cheaply.6 sections · §2.1–2.6

- 3When the cache is full: eviction and expiryWhich key goes when memory runs out, and how expired keys disappear, without spending memory on bookkeeping.5 sections · §3.1–3.5

- 4Talking to the cache, and taking turnsHow other systems reach the cache (all of it is TCP; the question is the format), and how one node stays correct when two clients touch the same key.6 sections · §4.1–4.6

- 5Many nodes: splitting the keys and finding themOne node can't take the load. Split the keys across nodes, and then decide who tells a client where its key lives.4 sections · §5.1–5.4

- 6Consistent hashing, DHTs and staying upAdding a node with hash % N moves half the data. Consistent hashing decides ownership so only a slice moves. Then: running it in production, its weak spots, the general idea (DHTs), and replicas.7 sections · §6.1–6.7

- 7What to keepThe decisions, the heuristics, and where the next lessons pick up.

[summary] About this class where this page sits in the course

This is day 1 of week 5, and week 5 is about storage engines, the lecture’s favourite topic: databases, distributed storage and query engines, a subject that rewards a deep understanding.

The board’s agenda had two items: designing a distributed cache, plus ETL and tiered storage. Almost all the papers behind this lecture are about distributed storage. So far in the course, change data capture (CDC) had only been written into designs as a box; this session goes deeper into it. Tiered storage is taught from practice, from something built on top of it in production, which is where you learn what happens behind the scenes.

The order is unusual. ETL comes first, only as an introduction “to form the dots”, the way the Kafka essentials did in Lecture 2. Its practical use comes later, when the course designs Amazon’s order system: one very detailed example that shows how data pipelines are built in general, because they all derive from one or two basic ideas. back in · Lecture 2: Kafka essentials The two halves were not connected in class, and this page does not invent a link between them. Tiered storage, too, appears here only as one diagram in 1.5; it is introduced here and built in a later week.

The cache is a favourite discussion too: lots of brainstorming and critical questions, down to the nitty-gritty details that matter. The design has two brainstorms. The low-level implementation on one machine comes first (chapters 2–4); after the break comes the distributed design, with routing, consistent hashing and distributed hash tables (chapters 5–6). Throughout, the design draws on a reading of the Redis source and of how Redis made each decision (more in 2.1).

### Our Redis so far #

So far in this course the cache has always been a box someone else built. In Lecture 1 the green dot’s heartbeats lived in a store with a TTL, Redis or DynamoDB, and the blog got one shared cache. In Lecture 2 that shared Redis sat next to Medium’s database, called by every API server. Lecture 3 built a key-value store on top of MySQL, looked at how Redis expires keys lazily and by sampling, and grew the store with replicas and range shards. Lecture 5 built a load balancer as a proxy, saw that DNS answers rather than forwards, then used Redis as the lock store and five independent Redis nodes for Redlock.

[figure title] Our Redis so far

[figure description] Four small panels, one per earlier lecture. Lecture 1: green dots send heartbeats into a store with a TTL, so keys expire. Lecture 2: two API servers call one shared Redis that sits beside the database. Lecture 3: a key-value store split into two range shards, each with a dashed replica pulling from it. Lecture 5: a load balancer forwarding requests to API servers as a proxy, and five independent Redis nodes used for Redlock.

[figure labels] Lecture 1 · ttl · heartbeats · that expire · Lecture 2 · api · api · redis · db · one shared redis · Lecture 3 · kv · range shards · + replicas · Lecture 5 · lb · api · api · lb as a proxy, · redlock on 5 redis

[caption] Our Redis so far, one panel per earlier lecture: heartbeats in a store with a TTL (Lecture 1), one shared Redis beside the API servers (Lecture 2), the key-value store with range shards and replicas (Lecture 3), the load balancer as a proxy and five Redis nodes for Redlock (Lecture 5).

- back in · Lecture 2: Kafka, read replicas and hash % N sharding

- back in · Lecture 3: the KV store, TTL sampling and locking

- back in · Lecture 5: the load balancer and DNS

This page opens the box. After a first chapter on copying data out of the blogging app’s database, it builds the cache on one machine, counting every byte, then splits it across many machines and keeps it up. Each chapter starts from whatever the previous one left unsolved.

Lecture 09 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-etl-and-cdc ===

# Build your own Redis, chapter 1: ETL and change data capture

Lecture 09 · Build your own Redis · chapter 1 of 7

§ 1

## ETL and change data capture

The blogging app’s analysts need their own SQL copy of production. The obvious event pipeline drifts silently. Change data capture reads the database itself.

About 18 min · class 00:04–00:20, Q&A 00:20–00:31, 02:41–02:48 and 03:04–03:05

- Notation, same in every figure

- reader

- cdn

- api server

- remote cache (redis)

- master / database

- replica

- queue (oldest leaves right)

- stream / broker

- worker, consumer

- request

- ack, success

- failure, stale

- async copy (head on whoever starts it)

[figure title] This lecture’s own marks

[figure description] Three marks this lecture adds to the notation key. A log strip: a row of cells under a database, newest on the right, with a caret marking how far a reader has got (its checkpoint). A struct block: a box headed MyValue with one row per field. A ring: a circle with 0 at the top, a cache node drawn as a small box on the circle and a key drawn as a small hatched square.

[figure labels] checkpoint · log, newest on the right · MyValue { · type  4 bits · } · struct block · 0 · node · key · hash ring

[caption] This lecture’s own marks, on top of the course notation above. The log strip appears in this chapter; the struct block in chapters 2 and 3; the ring in chapter 6.

The multi-user blogging app has grown. The CEO wants detailed reports on how people use it and has hired analysts to produce them. The analysts know SQL very well. Production runs on a transactional database, MongoDB say, and it holds everyone’s personal data.

So the analysts need a copy of the data of their own, in a database they can query, and it has to be complete. This chapter is about getting that copy out without losing anything on the way.

§ 1.1

## Day zero: dashboards on the production database

Before there is a warehouse, the dashboard reads production. That works for a while, then three things break it.

About 4 min · class 00:04–00:08

Start with the blogging app on day zero, nothing fancy. There is a database and an API server. Users never reach the database directly: the API server talks to it, every request and response goes through the API, and the API hides the database’s details and complexity.

Measurement usually comes later. In this course’s telling, a company that has just launched rarely focuses on analytics or metrics; things like DAU, MAU or Google Analytics get added once some people use the product. Then, to understand how people actually use it, the company starts measuring: the number of blogs published, how many users are active, how many people leave a like in the first hour.

At this stage there is no data warehouse and nothing fancy. A visualization tool such as Grafana, Metabase or Tableau connects straight to the production database and fires its queries there to draw the charts. The usual first step away from that is a read replica. Analytics is the most common reason teams add one: a production database is tuned for many small, fast transactions, and heavy dashboard queries against the primary slow the app down metabase.com ↗.

[figure title] Day zero: the dashboard reads production

[figure description] Day zero of the blogging app. A reader calls the API server, which talks to the production MongoDB; readers never touch the database. Below, a dashboard tool, Metabase, used by two analysts, fires its queries straight at production (the blue arrow). The database holds personal data, ringed in red. A dashed arrow shows the usual first step: point the dashboard at a read replica, which pulls its changes from the primary. There is no warehouse yet.

[figure labels] reader · api · mongodb · pii · replica · analysts · metabase · fires queries · on prod · usual first step: · a replica · no warehouse · yet

[caption] Fig 1·aDay zero. Readers reach MongoDB only through the API; the dashboard (blue) fires its queries straight at production, which holds personal data. The dashed path is the usual first step: point the dashboard at a replica. Redrawn from the class board at 00:05.

As a rule of thumb from experience, not a measured limit, this works very well for a Series A company, up to roughly 10,000–50,000 users. What actually runs out is not a user count but headroom: how expensive the dashboard queries are against what the database has to spare.

Then the business grows, and important decisions need data behind them. The CEO wants very detailed reporting on particular user behaviour, so the company recruits an insights team: business analysts, who need data to analyse the business.

Handing them the production database is very risky, even with read-only access, because it holds critical information, including personally identifiable information. GDPR’s data-minimisation principle asks that personal data be “adequate, relevant and limited to what is necessary” for the purpose gdpr-info.eu ↗, and analytics copies often drop or mask PII columns for that reason.

There is a second problem. Production may well be a NoSQL database like MongoDB, chosen because it sounded cool or fancy, or because it suited the use case really well. The analysts, though, are champs at SQL: they write very complex SQL queries with ease.

That they know SQL is not an assumption about these analysts; it is a hard truth about the field. Every data warehouse (Redshift, BigQuery) and every data lake format supports SQL queries, because everyone in the analytics domain is familiar with SQL. Strictly, a lake format such as Apache Iceberg is a table format, not a database: engines like Spark, Trino or Presto read the tables and provide the SQL iceberg.apache.org ↗. And Redshift is based on PostgreSQL but stores data in columns and leaves out OLTP features, so its SQL differs from PostgreSQL’s in places docs.aws.amazon.com ↗.

Give SQL analysts direct access to MongoDB and they will have no idea what to do with it. MongoDB does offer a read-only SQL Interface for BI tools today, MongoSQL over JDBC and ODBC mongodb.com ↗, but that only answers the language problem. The personal data and the load on production remain.

So the company starts writing a pipeline: take the data out of MongoDB and put it into MySQL, because that is the one SQL database it knows. It is still early, and nobody cares much about proper data analysis yet. The next question is the real one: how does the data get from MongoDB to MySQL?

§ 1.2

## The obvious pipeline: API events through Kafka

Publish an event whenever a blog is published, and let a consumer write the copy. It works, and it drifts.

About 4 min · class 00:08–00:11, Q&A 02:43–02:46

We know Kafka. So the natural progression is this: whenever a blog is published, the API server publishes an event to Kafka, and a consumer reads it and writes it into MySQL in a particular format. (Kafka’s topics, partitions and consumer groups are in Lecture 2.)

Before judging it, set the bar. The analytics copy cannot have data misses. It doesn’t have to be real time, but it must be consistent with the source, eventually. The business makes decisions on this data, and the analysts only have access to the copy, never to production: if the copy is wrong, the decisions are made on wrong data.

Pause and think

The API publishes a Kafka event whenever a blog is published, and workers write it into the analytics MySQL. Kafka itself never loses a message. Can the analytics copy still end up missing changes?

List what changes the database, not what the API announces. That gap is why 1.3 reads the database itself.

What goes wrong? The class board listed four problems, in this order: events have the context of the application; events might not contain all the data; everything might not have an event; and what if the change is done but sending the event failed (consistency). The figure numbers them as they are explained below.

Not everything has an event (① in Fig 1·b). Events are specific to the application: they hold the context of a use case, while analytics wants raw data. “Blog published” may have an event, and so may “user profile updated”. A minor change such as views++ on a post does not. Some changes never pass through the API at all. An asynchronous worker that periodically aggregates the like count of a post changes the database outside any request, so there is no API event for it, yet you want that change in the copy too.

[figure title] Events through Kafka, and where they leak

[figure description] The obvious pipeline. A reader calls the API server, which writes MongoDB and publishes a blog_published event carrying only the blog id to Kafka. Three consumers pull from Kafka and write rows into an analytics MySQL that the insights team queries. Four red marks show where the copy drifts: 1, a views++ counter and a likes aggregation job change MongoDB with no event at all; 2, the event lacks the data, so a consumer has to read the rest back from MongoDB; 3, the API saves the row and crashes before publishing; 4, a new table whose event nobody remembered to add. The API says: every change has an event, right?

[figure labels] every change has an event, right? · api · mongodb · 1 · views++ · no event · likes job · no API call at all · publish · 3 · saved, then crashed · before publish · blog_published{id} · kafka · consumer · consumer · consumer · 2 · event lacks data: · fetch the rest · mysql · insights · 4 · new table? did someone · add its event?

[caption] Fig 1·bThe event pipeline and its four leaks: ① changes with no event, ② events too thin to use, ③ a save whose event never leaves, ④ a new table nobody wired up. Kafka never reads MySQL here: workers consume what the API published. Redrawn from the class board at 00:08–00:09.

Events don’t carry all the data (②). A “blog published” event may hold only the blog’s id. Then the consumer needs complex logic to go back to the database and fetch the rest, which puts unnecessary load on it. Pass the entire blog object instead and every message becomes huge, and the consumer pays for it in network I/O. Martin Fowler names the two styles: an event notification often carries just an id and a link back, so receivers call the source for details; event-carried state transfer puts the changed data in the event, so receivers don’t need to contact the source martinfowler.com ↗. Full-object events have a ceiling too: Kafka caps a record batch at about 1 MB by default (message.max.bytes, as of Kafka 4.3), so very large events need config changes or a different design kafka.apache.org ↗.

The change is saved, but the event never leaves (③). The API writes the row, then crashes before it publishes. The database has the change; the copy never will. This is the dual write: there is no transaction that spans both the database and Kafka, so one write can succeed without the other. The transactional outbox pattern avoids it by storing the message in the same database transaction as the data and relaying it to the broker afterwards microservices.io ↗.

It doesn’t keep up with the schema (④). Feed a warehouse from API events, and every new table or use case means asking yourself: have I added its event to Kafka or not? That is very inefficient.

Events through Kafka sound like the obvious answer, and they are not. There has to be a better, much more seamless way.

One clarification, because the picture invites a wrong reading: in this design Kafka never reads MySQL, or any database. The workers consume the events the API server published; when they touch a database, it is to fetch what the event left out.

§ 1.3

## Change data capture: read the source of truth

Stop asking the API what changed. Ask the database.

About 5 min · class 00:10–00:15

CDC stands for change data capture: any change in the data is captured. Instead of relying on events from the API server, a CDC tool relies on the actual source of truth, the database itself. That one choice is what makes CDC invaluable, and in this course’s view everyone uses it.

A CDC tool typically (it is not a hard rule) lets you configure three things: your source databases, your transformation logic and your sink databases. It pulls the data from the source and puts it into the sink in the format you want.

[figure title] Change data capture

[figure description] Change data capture. The reader, the API server and MongoDB are unchanged. Under MongoDB sits its log (oplog or binlog). A CDC tool, drawn as a stack of instances (Airbyte, Debezium), reads that log (dashed arrow, the tool starts it), applies an optional transform, and writes the rows into MySQL in your format (green). Other sinks are possible: Kafka, SQS, Kinesis, local disk. Inset: in a Blogs table, an insert, an update and a delete each produce one CDC event, one per changed row.

[figure labels] api · mongodb · oplog / binlog · cdc · transform · reads · airbyte · debezium · writes, in your format · mysql · or: kafka · sqs · kinesis · disk · Blogs · change · id · insert · 7 · update · 3 · delete · 5 · one event per changed row

[caption] Fig 1·cThe same app with CDC. The tool reads MongoDB’s log (dashed: the tool starts it), optionally transforms the rows, and writes them into MySQL in your format. Inset: three changes to Blogs, three events. Redrawn from the class board at 00:11–00:13.

Because it works on the database itself, it doesn’t matter whether the application has an event. A change your application server has no event for is still captured and pushed to the other database. And if the API server crashes while pushing an event, you lose nothing, because the pipeline never depended on that event. This is the highlight of change data capture.

Take a Blogs table: every insert, update or delete on it gives you one CDC event, one per changed row (or document).

Before you play it: the API saves a post and crashes before publishing its event. A worker bumps a like count with no event at all. Which copy ends up complete?

[caption] Clip 1·1The event pipeline misses every change that has no event or whose event was lost; CDC reads the database’s log, copies all four, and, after the CDC tool has been down, resumes from its checkpoint. Read the source of truth, not the API’s events.

[summary] The clip as text 0:39

- Two ways to copy blog data into analytics.

- A post is published. The event and the log both carry it.

- views++ changes the database. No event exists for it.

- The API saves a post, then crashes before publishing.

- CDC stops. Meanwhile a worker updates likes; the log keeps it.

- CDC restarts and resumes from its checkpoint.

- Read the source of truth, not the API's events.

Two pipelines copy the same blog database (MongoDB) into an analytics MySQL. Top: the API publishes events to Kafka and a consumer writes them to MySQL. Bottom: a CDC tool reads the database’s own log and writes MySQL. Four changes happen. A post is published: both copies get it. A views++ changes the database but no event exists for it, so only CDC copies it. The API saves a second post and crashes before publishing its event: the log has the row and CDC copies it; the event copy misses it. Then the CDC tool is stopped while a background job updates the likes count directly in the database, with no API call: the log keeps the change, and when CDC restarts it resumes from its checkpoint and copies it. The event copy ends with 1 of 4 changes, the CDC copy with 4 of 4: read the source of truth, not the API’s events.

The sink doesn’t have to be a database. It can be Kafka, SQS, Kinesis, a local disk or one of many databases: whatever the tool’s plugins support. You can also do it your own way: pick an appropriate sink, such as a broker, and write your own, more complex transformations behind it. Put together, CDC is a great way to build replication across databases with some basic transformation in between.

Two open-source tools to know are Airbyte and Debezium. Install one locally and play with it: see how it is configured, what format the data arrives in, and how you transform it and push it somewhere. Airbyte is the easiest to set up. Know Airbyte’s CDC limits before you try it: most sources support CDC only on tables with a primary key, views aren’t supported, only inserts, updates and deletes are captured (TRUNCATE and ALTER don’t appear), and a newly added table needs a refresh before CDC tracks it docs.airbyte.com ↗.

Lecture 5 used CDC once, as one way to get a configuration change from a database onto a broker. This is the closer look it promised.

§ 1.4

## How a CDC tool reads, and where to point it

Scan the rows or tail the log, keep a checkpoint, and read from a replica.

About 6 min · class 00:12–00:14, Q&A 00:20–00:22, 00:28–00:29 and 02:41–02:43

What does “reads the database” actually mean? At heart, a CDC tool keeps track of three things: what it is reading, where it is writing, and what its checkpoint is. How it does that has no hard and fast rule. Very commonly (again, not a rule; some plugins work other ways) it keeps track internally of how far it has read: up to which rows, and which column was updated. A log doesn’t hold the full history, so tools begin with an initial snapshot, a full SELECT of each table, and then stream changes from the log position recorded at that moment. Debezium does this when it first starts debezium.io ↗, and so does Airbyte’s first CDC sync docs.airbyte.com ↗.

There are two ways to read. One is to iterate the tables row by row. Polling like this needs a column like LAST_UPDATE_TIMESTAMP on every table, cannot see rows deleted since the last poll, and misses intermediate updates between two polls debezium.io ↗.

The other is the commit log, or binlog: the write-ahead log, where every commit is appended. The CDC tool literally reads that log and pushes the changes to the other database. MySQL, for example, holds a transaction’s changes until COMMIT and then writes the whole transaction to the binary log before the commit completes, so the binlog is in commit order. It exists for replication and point-in-time recovery, which is why CDC tools read it dev.mysql.com ↗.

[figure title] Two ways to read the source

[figure description] Two ways a CDC tool reads the source. Left, scan the rows: the tool iterates a table from top to bottom; a row deleted between two scans is never seen, so the delete is missed. Right, tail the log: the database appends every commit to its log (c1 to c6); the tool reads the log and remembers its checkpoint, here after c4. c5 and c6 belong to one transaction, written to the log together at commit. Which way you get depends on what the database exposes.

[figure labels] iterate rows, top to bottom · id · title · 1 · day zero · 2 · cdc · 3 · kafka · 4 · spark · 5 · redis · a delete between scans · is missed · scan the rows · binlog · cdc · reads · c1 · c2 · c3 · c4 · c5 · c6 · checkpoint · one transaction, · written at commit · tail the log · which one you get depends on what the database exposes

[caption] Fig 1·dLeft: scanning rows sees only what is still there, so a row deleted between scans never reaches the copy. Right: tailing the log sees every commit in order and remembers a checkpoint; c5 and c6 are one transaction, written together at commit.

Which way you get depends on the bindings a database offers. MongoDB might choose not to expose its commit log, so CDC iterates its collections. Elasticsearch doesn’t offer one, so CDC iterates. MySQL has binlog support and exposes its log, so CDC reads it directly.

More precisely

How CDC reads depends on what the database exposes: MySQL’s binlog debezium.io ↗, PostgreSQL’s logical decoding and MongoDB’s change streams give a log; stores without one, like Elasticsearch, can only be re-scanned docs.airbyte.com ↗. MongoDB does expose its changes: Debezium’s MongoDB connector uses change streams, which need a replica set or a sharded cluster. A standalone server has no oplog, but a one-member replica set works.

debezium.io ↗

For you, it doesn’t matter how the data is read. You configure a database as the source, another as the sink, and a transformation on the tool, and the data flows.

If the source database is down, nothing is captured. Once it is back up, the tool resumes from where it stopped: that is the job of these tools. Resuming needs the log to still be there. A PostgreSQL replication slot keeps all the WAL its consumer still needs, even while the CDC tool is down. That is how it resumes, but an abandoned slot can fill the disk, so cap it with max_slot_wal_keep_size and drop slots you no longer use postgresql.org ↗. MySQL purges old binlogs; if Debezium restarts after its position was purged, it needs a new snapshot (snapshot.mode=when_needed takes one automatically) debezium.io ↗.

That checkpoint is why CDC doesn’t lose data: it keeps track of which rows, documents or entities it has captured and pushed, and does that checkpointing for you, in sequence. It prevents loss, not duplicates. After a crash, Debezium’s consumers see every event at least once debezium.io ↗, and PostgreSQL may resend recent changes after a server crash, so make the sink apply changes idempotently, for example as an upsert by primary key.

Transactions fit this well. A transaction is an atomic unit: it may run ten SQL statements, but they are written to the log in one shot when it commits, and CDC reads them from there. The order in which transactions commit and land in the log is the order in which CDC reads them and pushes them into the other database. One detail for when you build on it: CDC emits one event per changed row, not one per transaction. Debezium can add BEGIN and END boundary events with transaction ids (provide.transaction.metadata, off by default), so a consumer can regroup a transaction debezium.io ↗.

### Reading in practice #

The most basic configuration reads through the database’s own client: a Postgres client, for Postgres. Some plugins instead extract the WAL files and process them; it depends on the plugin you use. The client is the better way. If the binlog or commit-log format changes tomorrow, the client handles the decoding and your plugin doesn’t need updating. Nor does it put much load on the database, because it is just a sequential read.

You can take even that load off the master. You don’t have to configure CDC on the master: spin up a new replica and point CDC at it. Check your database first. On MySQL, the replica must write the changes it receives into its own binlog (log_replica_updates, on by default in 8.4) dev.mysql.com ↗; on PostgreSQL, a logical slot on a standby needs version 16 or later, and 17 adds failover slots so the tool can carry on after a promotion debezium.io ↗. One replica is enough: all replicas hold the same data, so there is no need to read from every one of them.

[summary] Several CDC instances skip unless you run CDC at high volume

Several CDC instances can read the same source, active-standby or all active: “active standby both works” came up inside the question itself, so who said it is unclear. A single log stream has one active reader, though. In PostgreSQL only one receiver may consume a slot at a time postgresql.org ↗, so “all active” means each instance takes its own slice of the tables, with its own slot or offset, and a standby takes over on failure.

With several tables, instances can read them in parallel. They keep their read position, the last point read and committed, in a small database of their own, and contend for work with simple remote locks: normal synchronisation primitives. Remote locks are built in Lecture 5.

§ 1.5

## CDC or events? Raw data, and many tiers

Raw data goes through CDC; application context goes through the API. One source can feed search, analytics and backup.

About 5 min · class 00:15–00:19, Q&A 02:44–02:45 and 03:04–03:05

The blogging app now wants search as well as reports. Before reaching for CDC everywhere, decide when it is the right tool.

Many systems earlier in this course had the API server push to Kafka and a consumer act on it. A lot of them could be done with CDC instead. That doesn’t make one better than the other: start with whatever works for you.

The bifurcation is this. When you are moving raw data, go for CDC. When you need application context, when a particular thing happens on the API server, have the API server push it to Kafka. The two also combine. In the outbox pattern, the service writes an event row to an outbox table in the same transaction as its business data, and CDC tails the log and publishes those rows to Kafka: application-context events without the dual-write risk of 1.2 debezium.io ↗.

The rule for this whole chapter

Rely on the source of truth.

Moving raw data? Read it with CDC, from the database itself, not from events the API remembered to send. Need application context, this happened on the API server? Publish an event from the API.

[figure title] Read the source of truth

[figure description] The source of truth is a database with its log. A small CDC box reads the log (a dashed arrow from the CDC box to the log) and writes the change into a second database (a solid green arrow).

[figure labels] source of truth · cdc · sink

Search shows both ways. Transactions live in MySQL and search runs on Elasticsearch. One way is the Kafka way you have seen before: the API server sends an event, and a consumer ingests it into Elasticsearch. The other is CDC reading from MySQL and putting the data into Elasticsearch, with an optional transformation that you may have to write yourself. Then CDC maintains the sync between the two databases.

Analytics is the same move. From MySQL to a data warehouse such as Redshift, CDC copies the relational data over and takes care of it. And because it works on raw data, it can bulk-fetch rows from the source and bulk-ingest them into Redshift. A pipeline with application context, one event per published blog, consumed one by one, is very slow by comparison. The amount of data moved is the same; reading and writing in batches is what makes it fast.

[figure title] One source, many tiers

[figure description] One source, many tiers. Four columns: transactional (MySQL), search (Elasticsearch), analytics (Redshift) and backup (S3). One CDC reads MySQL and writes Elasticsearch; a second CDC reads MySQL and writes Redshift; a third reads Redshift and writes S3. Dashed arrows are the reads, started by the CDC tool; green arrows are the writes. The first two could be one CDC with two sinks, at the cost of one transform per sink and more memory. Tiered storage is only introduced here.

[figure labels] transactional · mysql · search · elasticsearch · analytics · redshift · backup · s3 · cdc · reads · writes · cdc · cdc · could be one cdc with two sinks: · one transform per sink, more memory · tiered storage: introduced here, built in a later week

[caption] Fig 1·eOne source, many tiers: CDC keeps search and analytics in sync with MySQL and copies the warehouse to S3 for backup. Under it the board read: “Implement a quick CDC using Airbyte (if you have never used it). We will be using it a lot in future system discussions.” Redrawn from the class board at 00:16–00:18, shown again at 02:43.

Backup works too. CDC can move data from a warehouse like Redshift into S3, even though S3 is not a database, through plugins that write the data into S3 in a particular form. Redshift offers its own way to do this; the point is how handy CDC is in a lot of places. Redshift’s built-in export is UNLOAD, which writes query results to S3 as text, CSV, JSON or Parquet files, in parallel by default docs.aws.amazon.com ↗.

The board drew a separate CDC for each pair only to keep the picture readable. One CDC can push to several sinks, Elasticsearch and Redshift for example. How that works depends on the tool. With Debezium on Kafka Connect, the source is read once into Kafka topics and separate sink connectors stream them onwards debezium.io ↗; an Airbyte connection links one source to one destination docs.airbyte.com ↗. Fanning out has a cost: the CDC does a different transformation for each sink (JSON for Elasticsearch, another format for MySQL, something else for a third), so its memory use is high and it has to scale up.

This diagram is also all the tiered storage in this class. It was on the agenda, and it appears here as one multi-tier picture, not as a design of its own. CDC is used heavily in data-engineering architectures and in multi-tiered storage; this chapter is only a gentle introduction to it.

coming later · a later week: CDC inside data-engineering and multi-tiered storage designs

coming later · a later week: Amazon’s order system: one detailed data pipeline, built from these one or two ideas

§ 1.6

## From practice: sixty machines down to two

A data sync built on events, one message at a time, and what replacing it with CDC did.

About 6 min · class 00:19–00:20, Q&A 00:21–00:28

A couple of organisations had data sync built on Kafka, with a high infrastructure cost. This is a consulting case, and its numbers come from that telling; they can’t be checked independently. The advice was to switch to CDC, and that brought the cost down by 80%, with much more reliability. The 80% was that subsystem’s infrastructure cost, not the organisation’s whole bill.

The design looked like 1.2. The API servers pushed every single update to Kafka. A bunch of consumer workers read each event, applied a very simple transformation, and wrote it to the other database: one read and one write at a time. They could have batched, and didn’t, “because that’s how they thought systems are built”. Without batching, just keeping up with the incoming traffic took more than 60 consumers: 60 machines with 32 GB each.

[figure title] Sixty machines down to two

[figure description] Before: the API pushes every update to Kafka; a grid of consumer machines (more than sixty, 32 GB each) reads one event at a time and writes one row at a time into the target database; some changes are silently lost, so the two databases drift out of sync. After: two EC2 instances running an Airbyte CDC read the source database’s log and write batches into the target.

[figure labels] one event, one read, one write · api · kafka · ×60, · 32 GB · each · silently · out of sync · target · before · source · airbyte cdc · ec2 · ec2 · target · batched · after

[caption] Fig 1·fA consulting case: that subsystem’s infra cost fell about 80% (as told in class). Before, every update was one Kafka event, one read and one write on more than sixty machines. After, two EC2 instances ran an Airbyte CDC and wrote in batches.

The suggestion was simple. The transformation was simple, so configure a simple CDC in Airbyte, write the simple transformation there, and ingest directly into the other database; both databases had Airbyte plugins. Sixty machines and a Kafka became two simple EC2 instances.

They didn’t lose performance; by this account they gained it. Replication lag dropped to a bare minimum, put down in class to how these tools are built: written in Java, multi-threaded, fetching in parallel, heavily optimised for minor transformations, with fast reads and fast checkpointing. How a tool runs matters too. Airbyte doesn’t treat CDC sources as endless streams: each scheduled sync reads the log from the last saved position up to the sync’s start, so a change can wait up to one sync interval to arrive docs.airbyte.com ↗.

The bigger finding was the data. The old pipeline had been silently losing changes: the two databases were out of sync and nobody had any idea. Once it was pointed out, the plan was a cron job to resync them, and “it’s okay if we lose data”. With CDC they stopped losing data.

Wouldn’t batching the events alone have fixed it? It would not have been as bad, yes. They processed one event at a time because that was the most basic thing to write, and it was a legacy design: the company scaled and nobody changed it. There is always one service in a company that nobody ever touches, and this was one of them.

And why Kafka at all, rather than a cheaper queue such as SQS? A company always has some decisions made a certain way. At their throughput, Kafka and SQS would have cost about the same anyway. The service started basic, the company grew, nobody refactored it, and then it started to bite back.

§ 1.7

## What CDC is not

Not strongly consistent, not server-sent events, and not a transformation engine.

About 4 min · class Q&A 00:14–00:15 and 00:26–00:31

CDC is not a magic sync button. It is eventually consistent: it gives no strong consistency between the source and the sink. So pairing it with an eventually consistent NoSQL store is not a bad use case at all. Where you need strong consistency you need synchronous processing, and asynchronous CDC can’t be used there.

It is not like server-sent events either. With SSE a backend server sends events to the front end, the browser; CDC is backend work that pulls data from a database, transforms it and pushes it into another database. Very different. (SSE is in Lecture 2.)

Nor is it a transformation engine. Multiple joins across tables, multiple aggregations, several jobs: that is what Apache Spark solves, not CDC. In this course’s view Spark is the king of the big-data tools at the moment, your friend for complex transformations across tables and joins. CDC is for the simple case: consume whatever is written in the source, extract it, and put it somewhere, with basic transformation.

coming later · a later week: Spark and data-engineering basics, for the bigger transformations

You may already be using one without the name. PG sync, a tool that pushes Postgres data into Elasticsearch, is an example of a Postgres-based CDC: it was described in class as working only with Postgres, but it does exactly what a CDC does.

More precisely

PGSync is a CDC tool that syncs to Elasticsearch or OpenSearch through PostgreSQL logical replication. As of its GitHub README checked in October 2026, it also supports MySQL and MariaDB (through the binary log), so “only works with Postgres” no longer holds.

github.com/toluaina/pgsync ↗

It could be replaced with Airbyte or Debezium, which have much fancier plugins, so pushing the same data into some other system wouldn’t mean rewriting the integrations.

API events, CDC and Spark: what each reads, what it misses, and when to reach for it

|

| API events · Kafka

| CDC · Airbyte, Debezium

| Spark

| What it reads

| The events the API chose to publish

| The database itself: its log, or its rows

| Many tables at once, for joins and aggregations

| Catches changes with no event?

| No: views++, background jobs, a crash before publish

| Yes: it reads the source of truth

| Not covered in class

| Batching

| One event at a time, unless you build it

| Bulk fetch, bulk ingest

| Not covered in class

| Consistency with the source

| Eventual, and drifts when an event is missing

| Eventual

| Not covered in class

| Transformations

| Whatever the consumer code does

| Light, simple ones

| Complex: joins, aggregations, many jobs

| Reach for it when

| You need application context

| You move raw data

| A report needs joins and aggregates

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name two ways an API-event pipeline can leave the analytics copy incomplete even when Kafka never loses a message.

[summary] Show answer

Any two of: a change with no event at all (a views++, or a background job aggregating likes outside any API request); the API saving the row and crashing before it publishes the event (the dual write); and a new table whose event nobody remembered to add. Kafka can only deliver what was published. A thin event that carries only an id doesn’t lose data, but it forces the consumer to read the rest back from the database.

Why is it better for a CDC tool to read through the database’s client than to parse log files directly, and why point it at a replica?

[summary] Show answer

The client decodes the log for you, so if the binlog or commit-log format changes, your plugin doesn’t need updating. It is a sequential read, so the load is light, and pointing CDC at a new replica takes even that off the master. One replica is enough, since they all hold the same data. (Check that the replica can serve it: log_replica_updates on MySQL, version 16+ for a logical slot on a PostgreSQL standby.)

A report needs a join of five tables and a monthly aggregate. CDC or Spark, and why?

[summary] Show answer

Spark. CDC is for simple cases: consume what is written in the source, extract it and put it somewhere, with light transformation. Multiple joins across tables, aggregations and several jobs are what Apache Spark is for.

Concepts in this section: analytics copy · dual write · change data capture · binlog / WAL · checkpoint · outbox pattern · fan-out · eventual consistency

Contents of this lecture ↑

Lecture 09, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-one-node ===

# Build your own Redis, chapter 2: One node, every byte counted

Lecture 09 · Build your own Redis · chapter 2 of 7

§ 2

## One node, every byte counted

Build the cache on one machine first: a hash table, values of many types, and a hard cap on memory that the cache can always check cheaply.

About 25 min · class 00:31–00:58, Q&A 01:48, 02:39–02:48, 02:54–02:57

Chapter 1 copied the blogging app’s data out of its database. This chapter starts a different build: a cache like Redis, written from scratch. Call it our Redis. It has to answer GET, PUT, DELETE and TTL with high throughput and low latency, and it must never crash.

Before it can be distributed, it has to work on one machine. So start there, and count every byte it spends.

§ 2.1

## What we’re building

A distributed in-memory cache with four operations. First, one node and its low-level details.

About 3 min · class 00:31–00:34

The requirements fit on one line: high throughput, low latency, distributed. Everything we want; we are very greedy. Scale is a given. The cache offers four operations: get, put, delete and TTL.

On one node, three of them are one line each against a hash table:

GET k → check the hash table, return PUT k, v → add to the hash table DEL k → delete from the hash table

TTL needs more machinery, and gets it in chapter 3.

Be explicit about what this is: a distributed in-memory cache. The interesting decisions sit inside one node: how it stores data, how it knows it is full, what it evicts, how clients talk to it, how it handles concurrent writers, and how keys expire. This chapter and the next two build that single node; distributing it comes in chapter 5. Call these the low-level implementation details rather than “LLD”; the distributed design that follows is the high-level part.

Why build a cache you could simply download? Because the decisions made here are not only about caches. They are Lego blocks: once you have seen a pattern you can “control C, control V” it into almost any other system, with a modification here or there. There are only a few ways to achieve anything. Once you spot a pattern you can apply it elsewhere, which is why very different systems keep turning out to be built from the same few ideas.

The reference design throughout is Redis. The design below comes from a deep dive into the Redis source code: not only the low-level code, but how Redis made its decisions (a separate Redis-internals course goes further). At each step, Redis’s choice is named next to ours.

§ 2.2

## Storage is a hash table

Where does a key and its value live in RAM? In the data structure that already solves it.

About 2 min · class 00:33–00:36, Q&A 02:48

Where do a key and its value live in memory? A natural first design keeps a contiguous array of keys, each holding a pointer to where its value is stored. Put simply, that is a hash table. So a single node’s storage is a hash map from keys to values.

[figure title] Storage is a hash table

[figure description] One node's storage: a hash table whose slots hold the keys k1, k2 and k3. Each slot holds a pointer to where its value lives in memory.

[figure labels] k1 · k2 · k3 · a pointer per key · value · value · value · storage = a hash table

[caption] Fig 2·aOne node’s storage: each slot of a hash table holds a key and a pointer to its value in memory. Redrawn from the class board at 00:33.

It is tempting to go one level further down and design the table itself: open addressing or chaining, for a table of fixed size. There is no need. Hash maps already exist and have solved that problem, so there is no reason to rebuild the logic. Use one.

The next question is usually: and with more than one machine? That is sharding, and it waits until this node works. Chapter 5 picks it up.

coming later · chapter 5: splitting the keys across nodes

One thing the hash map does teach is how to grow. Say a set was given 1,024 bytes when it was created, and elements keep arriving. Do what hash tables do: allocate an array of some size, and when it fills up, double it, reallocate and move the data. That is an expensive operation, but it is the way to go.

§ 2.3

## Values of many types

A value can be a string, a set, a list or a Bloom filter. The cache has to know which, in as few bits as possible.

About 6 min · class 00:35–00:42

Now change the requirement a little. A value can be a string, a set, a list, a Bloom filter, a HyperLogLog and more. How is such a value represented?

Java suggests the first answer. A value is a general object: store a pointer to the object, which lives on the heap, and store primitive values in place of the pointer.

That raises a second problem. The cache has to know each value’s type, because commands depend on it: a set supports add, a list supports push. Before it runs a command, the cache must check that the value is of the right type.

Pause and think

A cache value can be a string, set, list or Bloom filter, and add only works on a set. Where do you record a value’s type: in the key, or in a small wrapper around the value? And how much space does it need?

In memory, every bit you spend is multiplied by the number of keys. The wrapper will grow (eviction bits, an expiry time) and still stay small.

It is tempting to keep the type with the key, since everything is reached through the key. But a key is a string. Prefix it with a type, or turn it into an object, and every lookup gets complicated: you dereference and match each time. Keep the key a normal key, and make the value a custom type of your own:

// key → MyValue struct MyValue { void *value; // points at anything int type; // 0 string, 1 int, // 2 set, 3 list };

value is a void pointer (an Object in Java), so it can refer to anything; type is a small integer code. On the board the type field was written int4.

Running a typed command, say add on the key myset, now takes four steps: get the value, read its type, check that the type supports the operation, and if it does, cast the object to that type and run the operation.

[figure title] The struct that grows, stage 1

[figure description] The key stays a plain key in the hash table. Its slot points at a small wrapper, MyValue, with two fields: a void pointer to the actual value, which can be a string, a set, a list or a Bloom filter, and a type field. The type needs only 4 bits of a 32-bit word: 4 bits give 16 types, and the codes are 0 string, 1 int, 2 set, 3 list.

[figure labels] k1 · k2 · k3 · the key stays · a plain key · MyValue { · void *value; · int type : 4; · } · string · set · list · bloom · points at anything · type · 4 bits = 16 types · 0 string · 1 int · 2 set · 3 list · stage 1: key → MyValue

[caption] Fig 2·bMyValue, stage 1. The key stays a plain key. Its slot points at a small wrapper whose value pointer can lead to anything, and whose type needs only 4 bits of a word. Chapter 3 adds eviction bits and an expiry time to this same struct. Redrawn from the class board at 00:36.

How much space does type need? There will only ever be five to ten types, so a few bits are enough. Half a byte, 4 bits, gives 16 types; a whole byte, 28 types, would last the next 10 or 20 years. This point first came up as an argument for putting the type next to the key, to save the wrapper. The bits are exactly right; the type still belongs in the value, for the reason two paragraphs down.

Redis uses four bits to store a value’s type. The number of types can never go beyond a certain number, so Redis caps it.

The rule for this whole chapter

In memory, be cautious about every single byte and bit.

RAM is very costly. Get the most out of every byte you use, and if you can’t, reduce it to the bare minimum you can work with.

[figure title] Every bit has a job

[figure description] One 32-bit word split into small fields of 4, 4 and 24 bits, each with its own job, instead of a whole integer per piece of metadata.

[figure labels] one 32-bit word · 4 · 4 · 24 · every bit has a job

Why wrap the value at all, rather than squeeze those bits in beside the key? Because Redis keeps a lot of other metadata alongside the type. In Redis the wrapper is a struct (Redis is written in C), and having one per value makes the design extensible: new fields arrive when new features need them, eviction first.

coming later · chapter 3: the wrapper’s next fields, for eviction and expiry

§ 2.4

## What happens when the heap runs out

Every value lives on the heap. Fill it, and the cache is in trouble whatever the exact failure looks like.

About 6 min · class 00:42–00:45, Q&A 02:39–02:48, 02:54–02:57

Every value, and every wrapper, lives on the heap: malloc or new, whatever your language uses, allocates the object in the program’s heap memory. So what happens when the heap is exhausted?

It is tempting to answer “the eviction policy runs”. But that is the cache’s policy, which runs only because the cache was written to run it. The question is about the program’s own heap, under a program that keeps calling malloc.

Make it concrete. A loop mallocs a 1 MB chunk on every iteration, forever, on a machine with 1 GB of RAM. After 1,024 iterations everything is used. What happens on iteration 1,025?

One guess is that the operating system moves data from memory to disk to make room. That is closer than it sounds: under memory pressure the OS can page memory out to swap on disk kernel.org ↗. Running out of heap does not cause a segfault by itself either: malloc returns NULL, or on Linux with overcommit the OOM killer ends a process when the pages are touched man7.org ↗ (more in the note below).

The answer as taught: going beyond your allocated heap is a segmentation fault. You are entering someone else’s territory, and your program crashes.

More precisely

When memory runs out, malloc returns NULL; or, with Linux overcommit, the OOM killer kills the process later. A segfault only happens if the program then uses an invalid pointer, such as that unchecked NULL. Linux overcommits memory by default kernel.org ↗, so malloc can succeed without physical memory behind it; if the system later runs out, “one or more processes will be killed by the OOM killer”. See also the signals in signal(7) man7.org ↗.

man7.org (malloc) ↗

[figure title] When the heap fills

[figure description] Left: the thought experiment. A program mallocs 1 MB at a time on a machine with 1 GB of RAM; after 1024 iterations the heap is full, and the class answered that iteration 1025 segfaults. Right: what actually happens to the 1025th malloc. Either malloc returns NULL, and a careful program checks it and refuses the write; or, with Linux overcommit, malloc succeeds and the process is killed later by the OOM killer with SIGKILL when the pages are touched; or the program uses the NULL anyway and gets SIGSEGV. Either way, the cache must cap its own memory.

[figure labels] 1 MB · iteration 1025? · heap · full heap · → segfault? · malloc(1 MB) × 1024 = 1 GB · the thought experiment · malloc #1025 · malloc → NULL · check it, refuse the write · Linux overcommit: malloc succeeds · later, touching the pages: · OOM killer · SIGKILL · use the NULL anyway · SIGSEGV · source: man malloc(3), signal(7) · what actually happens · either way: cap the memory yourself

[caption] Fig 2·cLeft: the thought experiment, and the answer given in class (the bubble). Right: what the 1,025th malloc actually does on Linux (see the note above). Either way, the cache has to cap its own memory. Left panel redrawn from the class board at 00:45; the right panel is new.

Segmentation faults are a rite of passage. Everyone who coded C in the first and second years of engineering suffered them, from trying to access memory allocated by someone else.

And crashing is one of the main reasons you never want to go beyond the heap, the memory assigned to you.

Whatever the exact mechanism, the conclusion is the one the design needs. The cache has to keep running no matter what; it must never crash. So it has to cap its own memory usage, and the first question becomes: how does it know how much memory it is using?

[summary] Later: malloc, pages and signals skip unless you write C

A correction from long C practice: malloc does not segfault when the heap runs out. It returns a NULL pointer (in C++, new throws bad_alloc), so you check whether malloc returned NULL.

That was accepted, with an addition on how allocation works underneath: malloc assigns virtual pages, not physical ones. With 4 GB of RAM, malloc can hand out 40 GB of virtual space; physical pages are allocated only when the logical pages are actually used.

That view came from an experiment: crash a Redis prototype on purpose, following an old blog post: allocate a page, fill it with ones, keep calling malloc and reusing the pages. After a point the program crashed from the memory use, at the same point on every run.

So malloc does return NULL when it cannot allocate, which is how you find out and can react. But touching pages beyond the limit, not just allocating them, crashed the program: “it’s not malloc’s fault”. Treat that explanation as tentative and open to correction. On Linux, touching more overcommitted memory than RAM plus swap usually ends with the OOM killer terminating a process with SIGKILL, not a segmentation fault; a segfault would come from using a pointer whose allocation failed, such as an unchecked NULL man7.org ↗.

Another way it was put: a crash happens whenever a program tries to access memory it is not supposed to. And a limit worth stating plainly: this account of OS memory paging rests only on what the prototype showed, not on a deep study of paging, which deserves a dive of its own.

In practice, limits come from two places: per-process ulimits in the kernel, and limits configured in the malloc library itself (GNU malloc, tcmalloc, jemalloc), so one service on a shared node can’t push it to 98 or 99%. It was added that people generally don’t use GNU malloc. More precisely, a per-process limit (RLIMIT_AS or RLIMIT_DATA, set with ulimit) makes malloc fail with ENOMEM rather than killing the process man7.org ↗, while container (cgroup) limits trigger the OOM killer instead. And glibc malloc is the default for most Linux programs, though Redis builds with jemalloc by default on Linux github.com/redis ↗.

Exceed those limits, the explanation went, and you generally get a SIGABRT and the program does crash: the kernel kills the process to save itself.

More precisely

Exceeding a ulimit makes allocation fail (NULL, ENOMEM). Exhausting system or cgroup memory gets the process killed by the OOM killer with SIGKILL. SIGABRT comes from the program itself calling abort() man7.org ↗.

man7.org (signal) ↗

SIGABRT was described as mostly unhandleable (there are some ways): it signals that “your instruction pipeline is done”, you can run a little last code, and the process is killed. Either way, the program does crash. In fact SIGABRT can be caught, but if the handler returns, abort() still terminates the process; the signal that truly cannot be handled is SIGKILL. And SIGABRT means “abort signal from abort(3)”, not the end of an instruction pipeline man7.org ↗.

§ 2.5

## Knowing how much memory you use

The cap is 1 GB. How do you know where you stand, on every write, without slowing every write down?

About 6 min · class 00:44–00:53, Q&A 01:48

Say the cap is 1 GB. Every write has to know where usage stands. How?

The first idea is to ask the operating system. There is certainly a command that reports how much memory a process uses. But it is the kernel that knows that number, so every check becomes a system call, and a system call causes an interrupt. Doing that on every memory check would slow the entire system down. The command exists; it just isn’t performant enough.

So the cache writes its own size function. A first version multiplies the number of keys stored by the size of each key-value pair. Simpler still: keep a running counter, and do size += n every time a key or a value is added.

Add how much, though? sizeof(MyValue) is a small fixed number (the lecture said four bytes; on a 64-bit machine a pointer plus an int comes to 16 with padding). But the pointer inside may lead to far more memory than that, so the struct alone doesn’t tell you the size.

This is what every cache does: it keeps track of its own size, because asking the OS is too expensive.

Pause and think

The cache must never exceed 1 GB. sizeof(MyValue) is 16 bytes, but a value can point at a 1 MB Bloom filter. How do you always know your usage, without asking the OS each time?

Asking the OS is a system call on every write, which is too slow. A counter in the allocator wrapper is exact and nearly free.

A hint toward the answer: look at how memory gets allocated. C is the example here, but the same holds for Java, Python or whichever language you use.

In C you allocate on the heap with malloc. You pass the size you want and get back an address you can start using. More exactly, malloc hands out memory from the process’s heap, and asks the OS for more (with sbrk or mmap) only when its free memory runs low man7.org ↗. free releases it again: it marks the block reusable by the process’s allocator, and the memory goes back to the OS only in some cases, such as heap trimming or large mmap’d blocks man7.org ↗.

Adding a new key means creating its wrapper: allocate that many bytes, cast them to MyValue, and store the object in the hash table.

// the new key's wrapper, kept in the table MyValue *o = (MyValue *) malloc(sizeof(MyValue));

A tempting fix is to count sizeof(MyValue) + 4 + 4 on every allocation, for the pointer and the type. But sizeof(MyValue) already covers both fields. The interesting problem is what the pointer points to: a Bloom filter of, say, 1 MB.

[figure title] sizeof sees the wrapper, not the data

[figure description] The MyValue wrapper is 16 bytes: sizeof covers only its pointer and its type. The pointer leads to a Bloom filter of 1 MB, allocated separately. Adding sizeof(MyValue) per key misses that megabyte; adding b inside every malloc counts everything the cache holds.

[figure labels] what you actually use · MyValue { · void *value; · int type; · } · sizeof = 16 B · bloom filter, 1 MB · size += sizeof(MyValue) · misses the 1 MB · size += b in every malloc · counts it all

[caption] Fig 2·dsizeof measures the 16-byte wrapper; the Bloom filter it points to was allocated on its own. Counting inside malloc catches both, because both allocations go through it.

Another tempting thought is that the pointed-to data need not be allocated on the heap. It must be: a Bloom filter stored in the cache is allocated too, through a malloc call of its own.

That is the observation that solves it. Everything the cache stores (the MyValue wrappers, Bloom filters, sets, lists, the nodes of a linked list) lives on the heap, and every one of them is allocated through the same malloc and released through the same free. So keep one counter and update it on every malloc: size += size_alloc. The total then includes the values themselves, not just their wrappers, because the Bloom filter’s own allocation goes through the same function as the wrapper’s.

One question is left: how do you make sure that line runs on every allocation? Write your own wrapper around malloc, and one around free.

§ 2.6

## zmalloc: one wrapper, one counter, one cap

Redis never calls malloc directly. One small wrapper keeps the count, and the cap check sits right beside it.

About 5 min · class 00:53–00:58

That wrapper is exactly what Redis has. It wraps malloc in a function called zmalloc, with the same signature. Inside, it mallocs b bytes, adds b to a total and returns the object. That’s it.

size_t total_size = 0; // global: bytes held void *zmalloc(size_t b) { void *o = malloc(b); total_size += b; return o; } void zfree(void *o) { // the block's size, known from // when it was allocated total_size -= size_of(o); free(o); }

Now the global total_size always tells you how much memory the cache is using, with no operating-system command. Redis does still ask the OS now and then, to check its usage periodically, and an occasional check is fine. Most of the time, the counter is what it uses.

It is a simple, elegant answer to a tricky problem. The naive way is to add a count update next to every malloc call. With malloc at 50,000 places in the code, forget the update at one of them and the count is wrong. The wrapper does it in one place. That is why, in the Redis code base, you never see malloc: you always see zmalloc, with the same signature and the count kept inside.

Now set the cap. When you start Redis, or any in-memory cache, you configure the total memory it may use: say 1 GB. It is a soft limit you choose, even though the machine may have 32 GB of RAM. In Redis the setting is maxmemory. Set to 0, the default on 64-bit systems, it means no limit; and memory for replication and AOF buffers isn’t counted toward it, so leave some RAM free redis.io ↗.

Enforcing the cap takes one check before allocating. If total_size + b is greater than the limit, return an error; otherwise allocate and return the object. Or, instead of failing, make room: remove a key, then allocate, add to total_size and return the object. This is where the eviction algorithm plugs in.

// our design: the cap inside the wrapper void *zmalloc(size_t b) { if (total_size + b > maxmemory) evict_a_key(); // or: an error void *o = malloc(b); total_size += b; return o; }

That second version is our design, and a fine one. Real Redis splits the two jobs: zmalloc only counts, and the maxmemory check runs once per command, before the command executes, evicting keys until usage is back under the limit redis.io ↗.

[figure title] zmalloc and the cap

[figure description] zmalloc wraps malloc: in our design it first checks whether total_size plus b would pass maxmemory and, if so, evicts (chapter 3); then it mallocs b bytes, adds b to the global total_size and returns the object. Beside the code, a gauge of total_size sits just under its 1 GB cap, on a machine with 32 GB of RAM.

[figure labels] zmalloc(b) { · if total_size + b · > maxmemory · → evict · // our design · o = malloc(b) · total_size += b · return o · } · §3 · machine: 32 GB · maxmemory 1 GB · total_size

[caption] Fig 2·ezmalloc as the class drew it, with the cap check inside, beside a gauge of total_size just under its 1 GB cap on a 32 GB machine. Real Redis zmalloc only counts; the maxmemory check runs once per command. Redrawn from the class board at 00:52 and 00:58.

Nothing here is fancy. It is basic logic, and it tells you exactly where to trigger eviction. Big systems are built on very simple solutions like this one. In the lecture’s view the Redis source is one of the easiest code bases you can skim: a few days in, by the fifth or sixth, you start understanding everything in it. The decisions carry over well beyond caches: in any system, think in very simple solutions rather than reaching for something fancy or complex.

So this is how the cache knows it is full. Once total_size says so, it is time to evict keys. Which ones?

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does the cache keep its own byte counter instead of asking the OS?

[summary] Show answer

The kernel knows a process’s memory use, so asking means a system call on every check, and doing that on every write would slow the whole cache down. A counter updated inside the allocator wrapper is exact and nearly free. Redis still asks the OS occasionally, but relies on its own counter.

sizeof(MyValue) is 16 bytes. Why can’t the counter just add 16 per key, and what does zmalloc do instead?

[summary] Show answer

sizeof measures only the wrapper: the pointer and the type. The set, list or Bloom filter it points to is allocated separately and can be megabytes. zmalloc adds the size of every allocation, wrappers and values alike, to total_size, because everything the cache stores is allocated through it.

Which is cheaper to get wrong: a cap checked at every call site, or in one wrapper? Why?

[summary] Show answer

The wrapper. With checks at every call site, one forgotten place out of 50,000 makes the count, and the cap, wrong. In one wrapper there is a single place to get right, which is why Redis code never calls malloc directly, only zmalloc.

Concepts in this section: hash table storage · MyValue wrapper · 4-bit type · heap exhaustion · own size counter · zmalloc · maxmemory

Contents of this lecture ↑

Lecture 09, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-eviction-and-expiry ===

# Build your own Redis, chapter 3: When the cache is full: eviction and expiry

Lecture 09 · Build your own Redis · chapter 3 of 7

§ 3

## When the cache is full: eviction and expiry

Which key goes when memory runs out, and how expired keys disappear, without spending memory on bookkeeping.

About 25 min · class 00:58–01:18, 01:34–01:38, Q&A 01:45–01:47, 02:49

A write arrives, and the check from chapter 2 fails: total_size + b > maxmemory. Our Redis is full. Before the new value can go in, some key has to go. Which one?

This chapter answers two questions about what leaves the cache. Eviction: which key to drop when memory runs out. Expiry: how keys whose TTL has run out actually disappear. Both answers keep their bookkeeping inside the per-key wrapper from chapter 2, and both are priced in bytes.

§ 3.1

## LRU, LFU, and where their bookkeeping lives

The two policies everyone names. Before choosing one, decide where its per-key information lives.

About 4 min · class 00:58–01:02

Once the size counter shows the cache is full, total size beyond the configured cap, it is time to evict keys. The two strategies everyone names first are LRU and LFU.

LRU, least recently used, keeps for every key the last time it was accessed. When the cache is full, it removes the key that was used least recently.

LFU, least frequently used, keeps how often each key is used. When the cache is full, the key used least frequently is evicted.

Either way, every key needs a little information: when it was last used, or how often. Before deciding how to implement either policy, decide where that information is stored.

It is tempting to reach for a separate data structure that finds the eviction candidates, such as a priority queue ordered by frequency. Hold that thought; 3.2 puts a price on structures like it. There is already a place for per-key information: the wrapper around the value from §2.3. Next to the type, keep a few LRU bits.

[figure title] The struct that grows, stage 2

[figure description] The per-key wrapper MyValue holds a value pointer and a 4-bit type, and now also lru_bits. Under LRU the field holds a timestamp of the last access; under LFU a counter; either way it is updated on every access. As taught, 4 type bits plus 28 LRU bits make one 32-bit integer. Current Redis packs 4 type bits, 4 encoding bits and a 24-bit LRU/LFU field into one 32-bit word of the object header.

[figure labels] MyValue { · void *value; · int type : 4; · lru_bits : 28; · } · LRU: a timestamp · LFU: a counter · updated on every access · class: 4 type + 28 lru = 32 · 4 · lru_bits 28 · redis: 4 type + 4 encoding + 24 lru · 4 · 4 · lru 24 · one 32-bit word of metadata per key

[caption] Fig 3·aThe struct that grows, stage 2. The wrapper gains one field for eviction, updated on every access. Top bar: the split as taught, 4 type bits and 28 LRU bits in one 32-bit integer. Bottom bar: current Redis, 4 type bits, 4 encoding bits and a 24-bit LRU/LFU field in one word of the object header.

How many bits? As taught, Redis stores 4 type bits and 28 LRU bits per object (28 is the figure on the board; 24 was mentioned first). Look at the sum: 4 + 28 is 32 bits, one integer of metadata per key, which keeps it very space efficient. The current Redis source packs that word a little differently: a 4-bit type, a 4-bit encoding and a 24-bit LRU/LFU field share one 32-bit word of each object header object.h ↗.

This is not a Redis quirk. Any database you pick keeps something like it: compact metadata inside the per-key object it already has. And it shows why wrapping the value in an object was a good decision: every piece of meta information a key needs, its type, its eviction bits and, in 3.5, its expiry, attaches to one place.

Every time a key is accessed, its bits are updated: a ++ for frequency, or a fresh timestamp. The same field serves either policy. Under LRU it stores a timestamp; under LFU it stores a frequency. Redis’s LFU is subtler than a plain ++. Its 24 bits hold a 16-bit time and an 8-bit logarithmic (Morris) counter that saturates around a million hits and decays over time, tuned with lfu-log-factor and lfu-decay-time redis.io ↗.

§ 3.2

## The textbook LRU, priced in bytes

The interview answer is a hash map plus a doubly linked list. In a cache, count what it costs.

About 5 min · class 01:01–01:07, Q&A 01:46

With the information stored, the next question is how to implement LRU or LFU. Is a priority queue the best way to know which key to evict?

The answer everyone gives is a hash map plus a doubly linked list. The list’s nodes hold the entries, and the map stores each key’s node address. A get or a put finds the node through the map, unlinks it and moves it to the head of the list in O(1); a size variable tells a put when the list is full; and removing a key is O(1) through the map as well. Because every access brings its node to the head, the order of the list tells you which key to evict: the one at the tail.

Pause and think

A textbook LRU keeps a doubly linked list node per key: next, prev and value pointers. Your keys look like a → 2. Is that bookkeeping worth it in a cache?

Price a design in bytes before you take the interview answer.

Price it. The list needs one node per key-value pair, and every node holds a next pointer, a previous pointer and a value pointer: 4 + 4 + 4 = 12 bytes of overhead for every pair. That is with 4-byte pointers; on a 64-bit machine each pointer is 8 bytes, about 24 bytes per key before the allocator’s own overhead.

Now store the key a, a 1-byte character, with the value 2, a 4-byte integer. Five bytes of data carry 12 bytes of overhead whose only job is tracking recency.

[figure title] The textbook LRU and its bill

[figure description] A hash map points at the nodes of a doubly linked list. When a key is accessed its node is unlinked and moved to the head in O(1), so the tail is the least recently used key. Each node carries a next, a prev and a value pointer: 4 + 4 + 4 = 12 bytes per key with 4-byte pointers, 24 bytes with 8-byte pointers. For key a (1 byte) and value 2 (4 bytes), 5 bytes of data carry 12 bytes of bookkeeping: more overhead than data.

[figure labels] a · b · c · map · map → node · head · accessed → move to head · the answer everyone gives · tail: next to evict · node { · next*   4 B · prev*   4 B · value*  4 B · } · 12 B · 24 B with 8-byte pointers · a : 2 · 1 B · 4 B · 5 B · overhead > data

[caption] Fig 3·bThe textbook LRU and its bill. The map finds a key’s node in O(1); an accessed node moves to the head, so the tail is the next to evict. Each node is three pointers: 12 B with 4-byte pointers, 24 B with 8-byte ones, for a key and value that together take 5 B. Redrawn from the class board at 01:04.

That is a huge waste of memory, and it marks the difference between the theoretical implementation that is usually taught (“just use a linked list”) and what real caches do.

More precisely

A linked-list LRU does cost pointers per key, and Redis avoids it by sampling (3.3). But caches such as Memcached accept the overhead: Memcached keeps a doubly linked LRU list per slab class, and its lru_maintainer mode splits it into HOT, WARM and COLD lists. MySQL’s InnoDB buffer pool is managed as an LRU list too dev.mysql.com ↗. Production caches do pay for a linked-list LRU when they judge it worth it; Redis chose not to redis.io ↗.

memcached docs ↗

It is not that linked lists are never used. They are used where memory is not the constraint, and a cache is a very memory-intensive application, so the linked-list approach suits other kinds of programs better. The Linux kernel, for one, is filled with linked lists built exactly this way. When the operating system boots it creates at least 52,000 of them in memory: a number relayed second-hand in class, from a Linux kernel contributor.

Redis does not maintain such a list for eviction, because of the extra memory. Redis, or any in-memory cache, would rather spend its memory on user data than on this meta information. In real-world implementations of eviction, a lot of databases choose not to use a linked list or anything like it. Some do and some don’t: Memcached and InnoDB’s buffer pool keep LRU lists (InnoDB with midpoint insertion, 3.4), while Redis samples instead.

The same bargain shows up with LFU. An LFU that runs in O(1) time exists, and its memory consumption is very high. When you want better time you give up space; when you are constrained on space you trade it back for time. That is why people don’t use it in a cache.

[summary] Go deeper: constant-time LRU and LFU skip unless you are preparing for interviews

The board left a reading pointer: read about the implementation of constant-time LRU, and LFU. Better still, write one of each, the map-plus-list LRU above and an O(1) LFU, and then count the bytes each one spends per key.

§ 3.3

## Random eviction

Keep nothing at all, evict any key, and fit more keys into the same memory.

About 5 min · class 01:06–01:10, Q&A 01:45–01:46, recap 01:33

Redis supports all three policies: LRU, LFU and random. It implements LRU and LFU very efficiently on those per-key bits, with a superb algorithm the class did not go into (“It would take me three years to talk about it”). The full menu in Redis today: noeviction; allkeys-lru, allkeys-lfu and allkeys-random; their volatile- variants, which only consider keys that have a TTL; volatile-ttl; and, since Redis 8.6, a least-recently-modified pair, allkeys-lrm and volatile-lrm redis.io ↗.

The third strategy is the most memory-efficient. Instead of keeping extra information to find the least recently or least frequently used key, pick one key at random and evict it. Nothing extra is needed at all.

The risk is plain: pure random eviction may delete a key that should have stayed in the cache. If that key is used often, it costs one cache miss; the next read fetches it and puts it back.

What it saves is the per-key information, so you can fit more key-value pairs into the same amount of space just by switching to random eviction.

It works in production. When one production cache’s eviction strategy was switched to random, the cache could ingest a large number of keys with only a very small rise in its miss ratio, and that balanced things out.

It does rely on luck: one of the most important keys can be evicted. But what are the odds that your most important key is the one evicted every time eviction runs, when the cache holds millions of keys? Low. And with no bookkeeping, eviction is very fast: not optimal, but fast.

That is the trade-off. Evicting the true least recently used key needs extra space to keep track of recency. Give up the absolute correctness of the choice and eviction gets faster, because there is nothing to compute, maintain or store. Computer science is full of trade-offs like this.

How does Redis run LRU on 28 bits without a list? That algorithm was called too deep to cover live; it would take a couple of hours on its own. It is less deep than that sounds: the Redis docs explain it in a few paragraphs redis.io ↗, and the note below gives the gist.

And can you get LRU or LFU under tight memory at all, designed at a high level? The answer given was blunt: “You cannot do that.” The real implementation is very deep, so go with random, which is very low on memory, needs no additional data, and only risks deleting an important key.

More precisely

Under memory constraints you can still have LRU or LFU, approximately: keep a few bits of access time or frequency per key, and at eviction time sample a handful of keys and evict the worst of them. That is what Redis does. It samples maxmemory-samples keys (default 5), evicts the one idle longest (or with the lowest LFU counter), and since Redis 3.0 keeps a pool of good candidates. With 10 samples the result is very close to true LRU.

redis.io ↗

To sum up the board’s recap: when the cache is full, evict with one of three strategies, LRU, LFU or random. Random has zero memory overhead. It trades the correctness of the system, since it may delete the most important key, for fitting more data, and if that works for your workload the overall benefit can be significant. How do you know the cache is full? The board’s recap gave two ways: a cap on the max number of keys in the cache (the hash table), or a cap on the cumulative size of the values inserted, total_size += sizeof(obj), which is what zmalloc keeps by wrapping malloc (§2.6). You can trigger eviction only when you know the cache is full. (The key-count cap was on the board only, not in the audio.)

[summary] Go deeper: Redis’s eviction internals skip unless you want the Redis code walk

The class pointed to a separate Redis internals course for the bit algorithm and the rest: over nine hours, with a walk through the actual Redis code and an implementation in Golang. Optional.

§ 3.4

## LRU or LFU? Follow the key’s life

The names are easy. The differentiator is how a key is read over time.

About 7 min · class 01:09–01:18, Q&A 02:49–02:50

When would you use LRU, and when LFU, and why? The question is not only about caches; it applies wherever either algorithm could run.

One answer suggested in class: LRU for streaming-like workloads, LFU when some things need to be accessed again and again, offered with an honest admission of being a bit confused. That confusion is universal. Anyone can expand the names, least recently used and least frequently used, but what is usually missing is a concrete differentiator that says where to use which. Even the person teaching this only understood it after writing an LRU and an LFU by hand.

The clincher came from class too. LFU makes more sense where you scan a lot of data. Under a recency policy, one scan, say a scan query over a database, can wipe out earlier entries that were used far more often. A frequency policy keeps the heavily used items, because one read each does not outweigh their counts. Databases meet exactly this problem. MySQL’s InnoDB buffer pool makes its LRU scan-resistant with midpoint insertion: a new page enters at the head of an “old” sublist (3/8 of the pool by default) and is promoted only if it is read again dev.mysql.com ↗.

Pause and think

A Wikipedia cache holds evergreen pages that are read all day. Then a nightly report scans every article once (or the World Cup sends a burst to a few pages). Which policy keeps the evergreen pages?

It depends on the key’s life. Keys that are hot and then forgotten (news, a trending song) suit LRU; keys whose past popularity predicts their future suit LFU.

A nightly report scans every article once. Which cache still holds the evergreen pages in the morning?

[caption] Clip 3·1One burst of one-off reads flushes the evergreen pages from LRU but not from LFU, so LRU misses the next morning. When past popularity predicts the future, frequency wins. Redis approximates both by sampling.

[summary] The clip as text 0:35

- Two caches, same size, same reads.

- Evergreen pages A⁠–⁠D are read all day.

- A nightly scan reads six articles, once each.

- Morning: readers want the evergreen pages back.

- When past popularity predicts the future, frequency wins.

Two caches of six slots receive the same reads. The left one evicts by recency (LRU): it keeps its pages in order, newest first, and drops the oldest. The right one evicts by frequency (LFU): it counts how often each page is read and drops the page with the lowest count. All day, four evergreen pages A, B, C and D are read again and again, so both caches hold them and the LFU counts climb to 3, 3, 2 and 2. Then a nightly scan reads six articles once each. In LRU every scanned article becomes the newest page, so the scan pushes C, D, A and B out of the cache. In LFU the scanned articles have a count of 1, so they only push each other out and A to D stay. In the morning readers ask for A, B, C and D again: LRU misses all four and has to fetch them back, while LFU hits all four. When past popularity predicts the future, frequency wins.

An analogy helps, about human behaviour rather than a use case: the stock market. You buy a stock with full faith in it. It rises, you are happy, and then it falls. You can sell on its recent performance, or hold it because it did well before and you trust it will rise again. Holding it is LFU. You are not going by recency bias; you are betting that what did well in the past will do well in the future. If it rises again you are happy; if it falls again, you wish you had evicted it.

So use LFU when you trust that a key is worth keeping even though its access has recently dipped: what was accessed often in the past will be accessed often again. Wikipedia is the example. It runs a ton of cache, and a page that is not read much right now but was read very often in the past should stay in memory. During the FIFA World Cup everyone opens FIFA pages. That recent spike should not evict the other top pages, which were visited far more often; once the fad passes they will be read at the same rate again. That is where LFU fits.

LRU fits the opposite pattern: a key read very aggressively at first, followed by a slump. Social media trends work this way. A song goes viral, everyone makes reels with it, and it sits in a cache at YouTube or Instagram; once the fad is over nobody picks it, and dropping it from the cache is fine. The classic example is Google News. You rarely read week-old news, mostly news a day or two old at most, so very recent items are the ones most likely to be read again. The board’s recap lists CDN next to Google News as an LRU example.

[figure title] Two access patterns

[figure description] Two sketches of how often one key is read over time. Left, suited to LRU: reads spike right after the key appears and then slump to almost nothing, like a news story or a trending song. Right, suited to LFU: a zig-zag line that keeps rising, like a stock chart: reads dip and come back again and again, and the trend is up, like an evergreen Wikipedia page; a World Cup spike on other pages rises and falls back without changing which pages are popular over time.

[figure labels] reads · time → · hit hard, then forgotten · google news · a reel’s song · LRU · news · reads · time → · world cup · zig-zags up, · like a stock · evergreen pages · LFU · wikipedia

[caption] Fig 3·cTwo access patterns, as drawn on the class board. LRU (news): a sharp spike that decays into a long flat tail. LFU (Wikipedia): a zig-zag line that keeps rising, like a stock chart; the stock you hold through a dip is LFU. Redrawn from the class board at 01:12 and 01:17.

Another way to say it, also suggested in class: LFU pays off when the popularity of keys is very asymmetric, a few keys used by everyone and the rest not, and LRU when it is not. The refinement: with LFU you keep a popular key even when it has not been accessed recently, the way you hold the stock that gave good returns in the past.

Neither always wins. In most production systems you would not even see a difference between LRU and LFU; in some extreme cases the difference is significant. Which is why the choice starts with the key, not the algorithm:

The rule for this whole chapter

Understand the life cycle of a key before you pick a policy.

Before configuring LRU or LFU, spend time understanding your application and your users’ behaviour: how a particular key is accessed, and how its life runs in your system. Then decide.

[figure title] Read the key’s life first

[figure description] Two small sketches of reads over time for one key. Left: a spike that decays, a key hit hard and then forgotten, which suits LRU. Right: a line that dips and keeps coming back, a key whose past popularity predicts its future, which suits LFU. Read the key’s life first, then pick the policy.

[figure labels] lru · lfu · read the key’s life first

§ 3.5

## Expiry without extra structures

A key’s TTL runs out. Who deletes it, and what does that cost in memory?

About 6 min · class 01:34–01:38

Expiry answers to the same budget as everything else in an in-memory cache: every design decision must use the bare minimum of bytes. If handling TTLs required storing a lot of data, it would be futile, spending a lot of memory on something that is not that critical.

Key expiry is not new. Lecture 3 built it for the key-value store and looked at how Redis does it; the same apparatus is reused here. back in · Lecture 3: how Redis expires keys

First, store the minimum: the key’s absolute expiry time, in the per-key object, next to the LRU bits. The obvious way to clean up is a priority queue of keys ordered by expiry, freed from the head. The board gave it its due, simple and consistent, but it is an additional data structure that needs a lot of pointers, so it is out.

[figure title] Expiry: the queue we don’t build

[figure description] Left, rejected: a priority queue holding every key with a TTL, ordered by absolute expiry time (k2:100, k7:101, k9:105, k3:110), freed at the head. It is simple and consistent, but it is an extra data structure with pointers for every key. Right, what we do: store the absolute expiry time as one more field, expires_at, in the per-key MyValue wrapper next to the type and the LRU bits. One number, no extra structure.

[figure labels] priority queue · pointers per key · k2:100 , k7:101 , k9:105 , k3:110 · absolute expiry · ordered by expiry → · free happens at the head · rejected · MyValue { · void *value; · int type : 4; · lru_bits : 28; · expires_at; · } · one number, no extra structure · what we do

[caption] Fig 3·dExpiry: the queue we don’t build. Left: a priority queue ordered by absolute expiry time, freed at the head; simple and consistent, but one more structure with pointers for every key. Right: the struct that grows, stage 3: one more number in the wrapper. Left panel redrawn from the class board at 01:35.

What deletes an expired key, then? First, lazy deletion. When a key is accessed and its object’s expiry time is earlier than the current time, the key has expired, and it is deleted right then. The delete is zfree, the counterpart of zmalloc: it decrements the total size and frees the object. In memory that is just a free call, which is cheap, and since keys in a cache are very likely to be read, most keys are deleted this way.

That leaves the keys that expire and are never read again. For them, use sampling: among the keys that have an expiration set, sample exactly 20, delete the ones that have expired, and repeat until fewer than 25% of a sample are expired-but-not-deleted.

More precisely

That is the classic rule. Since Redis 6.0 the active expiry cycle walks the table of keys with a TTL incrementally, with a cursor, 20 keys per loop, and keeps going while more than about 10% of the checked keys are expired (tunable with active-expire-effort), within a CPU-time budget Redis 6.0 release notes ↗.

expire.c (Redis source) ↗

Memory leaks this way, but not permanently: every expired key is eventually deleted, either by a later read or by another round of sampling.

[figure title] Lazy deletion and sampling

[figure description] Time runs down. 1: a client reads k7; its expires_at has passed, so the cache deletes it on the spot with zfree, which also lowers total_size. 2: most expired keys go this way, at the cost of one free. 3: some expired keys (k1, k3, k9) are never read again, so their memory leaks. 4: the active cycle samples keys that have a TTL (20 in Redis; four drawn here), finds k1 and k3 expired and frees them. 5: two of four were expired, more than a quarter, so it samples again; k5 to k8 holds none, so it stops (Redis today keeps going above about 10%). 6: k9 is still there: the leak is temporary, because a later read or a later sample frees it.

[figure labels] client · cache · keys with a TTL · cycle · time · 1 · GET k7 · k7 · expires_at passed · zfree(k7) · total_size −= b · 2 · most expired keys go like k7: one free() · 3 · k1 · k2 · k3 · k4 · k5 · k6 · k7 · k8 · k9 · k10 · never read again: memory leaks · 4 · k1 · k2 · k3 · k4 · k5 · k6 · k7 · k8 · k9 · k10 · sample keys with a TTL, free the expired · 2 of 4 were expired: over a quarter · 5 · k1 · k2 · k3 · k4 · k5 · k6 · k7 · k8 · k9 · k10 · so sample again · 0 of 4 expired: stop · 6 · k1 · k2 · k3 · k4 · k5 · k6 · k7 · k8 · k9 · k10 · k9 waits for a later read or sample: · the leak is temporary

- A client reads k7. Its expires_at has passed, so it is deleted on the spot. zfree also lowers total_size.

- Most expired keys are removed this way, lazily, at the cost of one free.

- Some expired keys are never touched again: memory leaks.

- A cleanup pass samples keys that have a TTL (20 of them) and frees the expired ones.

- It repeats while more than a quarter of a sample was expired (Redis today: about 10%). Here the next sample is clean, so it stops.

- The leak is temporary: a later read or a later sample gets the rest.

Keys: ← → to step · link to a step with #fig-3e/step-3

[caption] Fig 3·eTime runs down. Lanes: a client, the cache’s keys with a TTL (a red clock means expired), and the active cycle. Four squares stand in for the 20 keys of a sample.

Redis chose lazy deletion plus sampling because neither one needs an additional data structure: Redis has no priority-queue implementation for TTLs. That is how it fits a large amount of data into a small amount of RAM. Every single bit matters. It does keep one index for expiry, though: db->expires, a second table of just the keys that have a TTL, which the active cycle walks server.h ↗, and the Redis docs note that setting an expire costs memory.

The board summed it up in one line: every cache server runs a cleanup process that frees expired keys, free(obj), after which the garbage collector picks them up. In a C cache like Redis there is no garbage collector to wait for: the cleanup calls free (through zfree), which hands the memory back to the allocator at once. Nor is it a separate process: Redis runs its active expiry inside its main event loop expire.c ↗.

Eviction policies: what each costs per key and when it fits

|

| Textbook LRU (list)

| LRU on bits (sampled)

| LFU

| Random

| Per-key memory

| 12 B (24 B on 64-bit) for 5 B of data

| A few bits in the wrapper (24 in Redis)

| The same bits, holding a counter

| Nothing extra in our design

| Eviction cost

| O(1): drop the tail

| Sample a few keys, evict the oldest

| O(1) versions cost a lot of memory; Redis samples

| Pick any key: the fastest

| Keeps scan survivors?

| No: a scan flushes it

| No: a scan looks recent

| Yes: frequent keys keep their counts

| Only by luck

| Fits

| Where memory isn’t tight

| Keys hit hard, then forgotten

| Asymmetric popularity, scans

| Tight memory, millions of keys

| Redis

| Not used

| allkeys-lru, volatile-lru

| allkeys-lfu, volatile-lfu

| allkeys-random, volatile-random

### Check yourself #

Answer in your head, or out loud, before opening each one.

Where do the LRU bits and the expiry time live, and why not in a separate structure?

[summary] Show answer

In the per-key wrapper, MyValue, next to the value pointer and the type: lru_bits (a timestamp under LRU, a counter under LFU) and expires_at. A separate structure, a linked list for recency or a priority queue for expiry, costs pointers for every key: 12 bytes of list node for 5 bytes of data in the example. A memory-bound cache would rather spend those bytes on user data.

A cache of news articles: LRU or LFU, and what single observation would change your answer?

[summary] Show answer

LRU. News is read hard for a day or two and then forgotten, so recency predicts the next read. Switch to LFU if you see keys whose past popularity predicts their future, evergreen articles read again and again, or regular scans that would flush them out of a recency-based cache.

What deletes an expired key that nobody ever reads again?

[summary] Show answer

Not lazy deletion, which only runs when a key is accessed. The sampling pass does: it samples 20 keys that have a TTL, frees the expired ones with zfree, and repeats while more than 25% of a sample were expired (about 10% in Redis 6.0 and later). Until a sample catches it, the key leaks memory, but not forever.

Concepts in this section: LRU bits · map + linked list · random eviction · LRU vs LFU · lazy deletion · sampling

Contents of this lecture ↑

Lecture 09, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-protocol-and-concurrency ===

# Build your own Redis, chapter 4: Talking to the cache, and taking turns

Lecture 09 · Build your own Redis · chapter 4 of 7

§ 4

## Talking to the cache, and taking turns

How other systems reach the cache (all of it is TCP; the question is the format), and how one node stays correct when two clients touch the same key.

About 25 min · class 01:18–01:34, 01:38–01:50, Q&A 02:52–03:04

The blog app’s API servers will call our cache thousands of times a second. Chapters 2 and 3 built what happens inside the box: a hash table, typed values, a byte counter, eviction and expiry. Two questions are left before the box is useful. What do the API servers speak to it? And what happens when two of them change the same key at the same instant?

The first half of this chapter answers the first question; the second half, from 4.5, answers the second. Both stay on one node. Many nodes wait for chapter 5.

§ 4.1

## Which protocol? It’s all TCP

HTTP, WebSockets, gRPC or your own format. Underneath, every one of them is a TCP connection.

About 4 min · class 01:18–01:22, recap 01:32–01:34

Communication is about how you let some other system talk to your system: here, to your cache. So, which protocol should a single-node cache expose to the services that use it?

The first answer people give is TCP, and that answer turns out to be right underneath everything else: whatever format you pick, it rides on a TCP connection. A second answer suggested in class is HTTP, because then the server can stay stateless: it doesn’t need to remember anything about the client between requests, unlike WebSockets.

Then what is HTTP’s disadvantage? The tempting reply is that the payload is huge, because the value fetched from the cache can be large. But that is true of anything you use: the value has to be transferred whatever the protocol, so it isn’t what makes HTTP worse. The overhead is somewhere else, and 4.3 shows exactly where.

The options on the table are HTTP, WebSockets, gRPC, or writing your own protocol. Why not write your own? Before choosing, notice what they share. HTTP, gRPC and a custom protocol are all just TCP connections. There is nothing fancy about any of them; they differ only in the format the data is wrapped in: HTTP’s text, gRPC’s format, or your own.

[figure title] The API talks to the cache over TCP

[figure description] An API server and the cache are joined by three TCP connections, one per way of talking: HTTP/1.1, gRPC or a custom format. All three are just TCP; only the wrapping of the bytes differs. A note on the lowest line, 3/2, means a 3-way handshake to open and a 2-way teardown to close, which the class charged to every HTTP/1.1 request. A speech bubble on the HTTP option says: it is the payload size.

[figure labels] api · tcp · tcp · tcp · 3/2: 3-way open, 2-way close · http/1.1 · grpc · custom · cache · it’s the payload size · all three are just TCP; only the wrapping differs

[caption] Fig 4·aThe API talks to the cache over TCP, whichever box you tick. The speech bubble is the tempting answer; the value costs the same bytes under every protocol. The board’s “3/2” note (3-way handshake, 2-way teardown) is the class’s per-request cost of HTTP/1.1 (see “More precisely” below). Redrawn from the class board at 01:21.

Where HTTP does hurt, as the class put it, is the connection. With stateless HTTP/1.1, each request establishes a TCP connection with a three-way handshake, sends the data, gets the response and terminates the connection with what the class called a two-way teardown (the board wrote 3/2 beside the connection: 3-way handshake, 2-way teardown). So every time an API server talks to the cache it re-establishes the connection: a three-way handshake and a two-way teardown every time, very unperformant, very inefficient. HTTP/1.1 might not be the best choice for a cache.

More precisely

HTTP/1.1 reuses TCP connections by default: “HTTP/1.1 defaults to the use of persistent connections”, so one connection carries many requests and responses. Its overhead for a cache is the text request line and headers on every call, and one outstanding request per connection, not a new handshake per request. (Closing a TCP connection takes a FIN and an ACK in each direction RFC 9293 ↗.)

RFC 9112 (HTTP/1.1) ↗

Why TCP and not UDP? The cache needs a connection with state, guaranteed delivery and acknowledgments. UDP is fire and forget, and we don’t want that: we don’t want to lose data, because the cache is a “quote unquote database”.

§ 4.2

## From practice: HTTP typed by hand

A TCP-only sensor, a Flask server and netcat. HTTP turns out to be text the server agrees to read.

About 6 min · class 01:22–01:30, Q&A 01:49–01:50

A case from 2015 makes the “it’s all TCP” point concrete. A small team was building an IoT application. Its backend was a Python Flask HTTP server. Its sensors had no Python or JavaScript to make HTTP requests: the backend understood HTTP, the sensors understood only TCP. So what do you do? The fix came from first principles, out of a networking course rather than experience.

The experiment: use netcat to open a raw TCP connection from the client to the Flask server, nc localhost 3000, and type bytes into it directly.

Every HTTP call you have made shows request headers going in and response headers coming out. That raises the question the experiment answers: how does a web server know that what it received is an HTTP request? Once a client has a TCP connection it can send any data at all, say the five bytes A R P I T. It is the server’s responsibility to understand what you said, and a web server understands data sent in the HTTP format.

And that format is very textual. An HTTP request is a line like GET /hello.html HTTP/1.1\r\n followed by header lines such as User-Agent: …, all plain text sent over the TCP connection.

So first, send something that isn’t HTTP. Typing This is a sample\r\n into the raw connection came back with error code 400, bad request syntax: the server was parsing the bytes as an HTTP request and rejecting them. Then type a request in the format the HTTP specification describes, GET /hello HTTP/1.1\r\n, and the Flask handler’s hello-world comes back. It is a raw TCP connection carrying data in a particular format, with no Python or request library on the client side. It worked against Flask’s lenient development server. Strictly, an HTTP/1.1 request must carry a Host header, and the headers end with an empty line (CRLF CRLF); a strict server answers 400 Bad Request without Host RFC 9112 ↗.

This is a sample → 400 Bad Request GET /hello HTTP/1.1 → 200 OK: hello world GET /user?name=arpit HTTP/1.1 → Requested for name = arpit POST /login HTTP/1.1 Content-Type: application/x-www-form-urlencoded Content-Length: … username=…&password=welcome → login successful

That solved the IoT problem. A device that can only open TCP connections can fire HTTP requests at a backend written in Python without the Python requests library, Node.js’s Axios or Java’s Spring Boot. The same goes for anything else HTTP does. A request with query parameters worked, and so did a basic POST: POST /login HTTP/1.1 with Content-Type and Content-Length headers and a body username=…&password=welcome, which returned “login successful”.

The point of telling a naive, fresher’s experiment is the habit behind it: think from first principles. Can the trick be used as a general hack? Yes: it is just raw text that you send and your server understands.

[summary] See it yourself skip if you’ve done it

Run any small web server on your machine, open nc localhost 3000 (use your server’s port), type GET / HTTP/1.1, a Host: localhost line and an empty line, and watch the raw response come back. Then type nonsense and watch the 400.

§ 4.3

## Your own protocol, or gRPC

To store a = 1, all that text goes over the wire. Define a leaner envelope, or use one that keeps the connection open.

About 7 min · class 01:28–01:34, Q&A 03:03–03:04

Now look at the same text through the cache’s eyes. To store just key a with value 1, you send the request line and all the header jargon with it. That is a huge chunk of overhead along with every single message, and the more data there is in a request, the more your cache server has to process. It works, and highly optimised it can be fine. Can you do better?

Pause and think

To store a = 1, should the API servers talk to the cache over HTTP?

Every option is just TCP. What differs is the envelope around your bytes and whether the connection stays open.

You can define your own protocol. Redis did: it implemented its own protocol specification, called RESP. Just as HTTP is a specification that any server claiming to understand HTTP follows, all Redis clients speak RESP. RESP sends a command as an array of length-prefixed strings, so it is binary-safe and fast to parse. And Redis also accepts plain “inline” commands typed into telnet, the very trick of the netcat demo redis.io ↗.

[figure title] Bytes on the wire for set a 1

[figure description] The same command, store key a with value 1, written two ways over the same TCP connection. As an HTTP/1.1 request it is a request line, Host, Content-Type and Content-Length headers, a blank line and the body key=a&v=1: 117 bytes of text for a few bytes of data. In RESP, Redis’s own protocol, it is an array of three length-prefixed strings, SET, a and 1: 27 bytes. Same TCP, same value; different envelope.

[figure labels] POST /set HTTP/1.1\r\n · Host: cache:8080\r\n · Content-Type: application/x-www-form-urlencoded\r\n · Content-Length: 9\r\n · \r\n · key=a&v=1 · 117 bytes · HTTP/1.1 · *3\r\n · $3\r\n · SET\r\n · $1\r\n · a\r\n · $1\r\n · 1\r\n · 27 bytes · *3: 3 parts · $1: 1 byte · RESP · same TCP, same value; different envelope

[caption] Fig 4·bBytes on the wire for set a 1. The HTTP request is illustrative, built for this page: a request line and three headers carry a 9-byte body. RESP’s *3 says three parts follow, and each $n says how many bytes the next part has.

Redis isn’t alone: Memcache also has its own protocol that all its clients use. Underneath a custom protocol is just raw TCP. Whatever bytes you send, the handler you wrote interprets them; you play by your own rules. That is why Redis chose its own format: it puts the format in its own hands, so data can be sent however it wants, without hiccups.

The other strong option is gRPC. It works on HTTP/2, so it keeps the connection alive instead of terminating it, and it compresses the objects it sends, which makes it very optimised for data transfer over the network: “best of all worlds”. In detail, gRPC frames each message with a 1-byte compressed flag and a 4-byte length, usually carrying compact binary Protobuf; compressing the message itself is optional and happens only when a grpc-encoding header is set grpc/grpc ↗.

Which to pick depends on how complex or simple your use case is and how you want clients to talk to the cache. In some cases you may open all three and make it configurable. The board’s summary: every protocol has its pros and cons, but one server can support all three ways of communication by abstracting out the implementation over one shared hash table.

[figure title] One server, three doors, one table

[figure description] One cache server with three ports: a custom protocol over raw TCP, HTTP and gRPC. Requests through any of the three reach the same in-memory hash table, so a cache can expose all three and make it configurable: one store underneath.

[figure labels] tcp (custom) · http · grpc · cache server · hash table · expose all three if you like: one store underneath

[caption] Fig 4·cOne server, three doors, one table. Requests in any format end up in the same in-memory hash table. Redrawn from the class board at 01:33.

Which is better is subjective. What isn’t is the connection:

The rule for this whole chapter

Don’t open a new connection per call: keep one open, and pick the format your clients can speak.

Creating HTTP connections every time might not be the best idea; keeping a connection open, with gRPC or a custom format, is fine. Use gRPC if your clients support it well; otherwise define your own format, as Redis does.

[figure title] One connection that stays open

[figure description] An API box and a cache box joined by one thick line that stays open, carrying RESP or gRPC.

[figure labels] api · cache · stays open · resp / grpc

The recap at the end of this part of the class listed the choices over TCP as three: completely stateless HTTP/1.1, where you connect, query, get the response and disconnect each time; gRPC, which is stateful, runs on HTTP/2, keeps the connection open, is highly compressed and uses Protobuf; or your own custom format.

More precisely

Over TCP the usual choices are HTTP/1.1 (text, with keep-alive connections, not a connection per request), gRPC (HTTP/2, binary Protobuf, multiplexed) grpc/grpc ↗, or a custom binary or text protocol like Redis’s RESP.

RFC 9112 · gRPC protocol doc ↗

If you are just starting out, or only want to prototype, use gRPC and get started without thinking too much about it.

HTTP/1.1, gRPC or a custom protocol for a cache

|

| HTTP/1.1

| gRPC

| Custom (RESP)

| Format

| Text: request line and headers

| Length-prefixed frames, usually Protobuf

| Length-prefixed strings, your rules

| Connection

| Taught: one per request; in fact kept alive, one request at a time

| Kept open, multiplexed (HTTP/2)

| Kept open

| Bytes per set a 1

| About 117 in Fig 4·b’s example: headers dwarf the data

| A small frame

| 27

| Client support

| Everything speaks it

| Needs gRPC clients

| Needs your client libraries

| Reach for it when

| Clients can do nothing else

| Prototyping, or clients support it well

| You own the clients, like Redis

[summary] Connection pools aren’t a language feature skip unless you’ve wondered

Keeping connections open is what a connection pool does, and pooling is not a property of the programming language. It is tempting to call it a property of the database; it belongs to the application logic or library you write.

A connection pool is just multiple TCP connections established with the database plus a queue to manage them; you may find a library that manages it for you. You can write your own in a day: all you need is a blocking queue.

The only requirement is that the database keeps a connection open and doesn’t terminate it unless you ask it to. Servers do close idle connections in practice: MySQL closes a non-interactive connection idle longer than wait_timeout (default 28,800 s, eight hours), so pools validate or refresh idle connections dev.mysql.com ↗.

back in · Lecture 1: where the connection pool lives

§ 4.4

## The single node so far

One page of recap before the cache has to take turns.

About 2 min · class 01:32–01:34

Here is everything on one node. Data lives in an in-memory hash table. Its values are wrapper objects, a struct holding a type and the data, and the type decides which operations a key supports: a list here, a set there. The bare minimum is GET, PUT and DEL, and you can always extend that to complex structures. Clients reach it over TCP, in one of the three formats from 4.3. When the cache is full it evicts by LRU, LFU or random, with random costing zero memory overhead (§3.3); and it knows it is full from zmalloc, which wraps malloc and keeps the running total (§2.6).

[figure title] The single node so far

[figure description] A client reaches the cache server over TCP. Inside, a hash table maps each key to an object that carries its type, for example key1 to an object of type list and key2 to one of type set. Each value is the MyValue struct built in chapters 2 and 3: a value pointer, a 4-bit type, 28 LRU bits and an expiry time. zmalloc keeps a running total of memory used against maxmemory, and when the cache is full it evicts by LRU, LFU or random.

[figure labels] client · tcp · cache server · key1 → obj{type: list} · key2 → obj{type: set} · hash table, in memory · MyValue { · void *value; · int type : 4; · lru_bits : 28; · expires_at; · } · maxmemory · zmalloc · full? evict: lru · lfu · random

[caption] Fig 4·dThe single node so far: a TCP port, a hash table of key → object with a type, the MyValue struct with the LRU bits and expiry that chapters 2–3 added, the zmalloc counter under its cap, and eviction when it is full. Redrawn from the class board’s recap page at 01:32, where the struct was written short, as struct obj { type, data }.

§ 4.5

## Concurrency: lock, compare-and-swap, or one thread

Two clients update the same key at the same instant. Three ways to stay correct, and what each costs.

About 9 min · class 01:38–01:45, Q&A 01:47–01:48, 02:52–02:54

Before concurrency, one word on scaling. On a single node it is easy, because there is only one option: vertical scaling, adding more RAM, CPU and network to the box.

Now the classic problem. Two or more update or delete operations on the same key k reach the cache server at the same time: two threads trying to update the same thing. There are three ways to handle it: pessimistic locking, optimistic locking, or single-threadedness.

### Pessimistic locking #

Pessimistic locking wraps the critical operation in a lock that a thread must take before it proceeds: ACQ_LOCK(), DELETE K, REL_LOCK(). When two threads come together, one of them goes in while the other waits; take a = 10 with one thread setting it to 20 and another to 30, and one waits for the other to finish. On a single node threads coordinate with mutexes or semaphores. back in · Lecture 3: the airline check-in, built with locks

[figure title] Pessimistic locking

[figure description] Left: the critical step wrapped in a lock: ACQ_LOCK(), DELETE K, REL_LOCK(). Right: a = 10, and two threads arrive together, one setting a to 20 and the other to 30. One goes in; the other waits until the first finishes and releases the lock.

[figure labels] ACQ_LOCK() · DELETE K · REL_LOCK() · one thread inside at a time · a = 10 · thread 1 · thread 2 · waits · a = 20 · a = 30 · one waits for the other to finish

[caption] Fig 4·ePessimistic locking: only one thread is inside the locked step at a time. Two writers on a = 10: one goes in, the other waits (red) until the lock is released. Redrawn from the class board at 01:39.

If mutexes, semaphores and atomic variables are unfamiliar, read about them; the board adds atomic variables to keep track of locks. A Java synchronized block is almost exactly this: pessimistic locking.

### Optimistic locking #

Optimistic locking starts from the opposite belief: there is very little chance of concurrent access, so don’t proactively take locks. Ensure only that if two threads do touch the same thing at the same time, just one of them succeeds.

The idea is to make updates conditional. Instead of update a = 20 and update a = 30, fire update a = 20 where a = 10 and update a = 30 where a = 10. If both run at once, one sets a to 20, and the other finds that a is no longer 10 and does nothing.

That only works if the check and the write happen as one step, with nothing else running in between. It is done with a standard instruction called compare-and-swap: CAS(a, 10 → 20) changes a to 20 only if it is currently 10.

[figure title] Two conditional updates, one winner

[figure description] Time runs down. Lanes: thread 1, the value a, thread 2. 1: a is 10 and both threads read it; neither takes a lock. 2: thread 1 prepares update a = 20 where a = 10; thread 2 prepares update a = 30 where a = 10. 3: CAS(a, 10 → 20) runs first, as one atomic step, and a becomes 20. 4: CAS(a, 10 → 30) finds 20, not 10, and changes nothing. 5: only one succeeded; thread 2 re-reads and retries or gives up.

[figure labels] thread 1 · a · thread 2 · time · 1 · a = 10 · reads 10 · reads 10 · 2 · a = 20 · where a = 10 · a = 30 · where a = 10 · 3 · CAS(a, 10 → 20) · a = 20 · 10 matched: swapped · 4 · CAS(a, 10 → 30) · a = 20 · finds 20, not 10: · no change · 5 · won · re-reads: retry · or give up · only one succeeds

- Both threads see a = 10. Neither takes a lock.

- Each write says what it expects to find: update a = 20 where a = 10 and update a = 30 where a = 10.

- CAS(a, 10 → 20) runs first. Compare-and-swap checks and writes as one atomic step: a becomes 20.

- CAS(a, 10 → 30) finds 20, not 10, and does nothing.

- Only one succeeds. The loser re-reads and retries, or gives up: your choice.

Keys: ← → to step · link to a step with #fig-4f/step-3

[caption] Fig 4·fTime runs down. Lanes: thread 1, the value a, thread 2. Nobody takes a lock; the compare-and-swap decides.

Compare-and-swap is done at CPU level, with native instructions. Every language gives you a nice wrapper over it, such as Go’s atomic library or C++’s Boost, and if your processor (ARM, Intel, AMD) provides a CAS instruction, the compiler leverages it. It is the best way to implement an optimistic lock because the instruction is atomic: while it runs nothing else can, and the operating system does not context switch in the middle of it. An exercise worth an evening: write a simple optimistic-locking implementation yourself and play with compare-and-swap until it clicks. It is very easy.

### No threads at all #

The third way questions the premise. Concurrency problems arise because several threads can be scheduled and run in parallel. What if you don’t support threads at all? Then you need no concurrency control. This is what Redis did. Precisely, Redis is “mostly single threaded”: commands run on one main thread, while background threads handle work such as UNLINK’s lazy freeing, and optional I/O threads can do socket reads, writes and parsing redis.conf ↗.

go deeper · free Redis-internals videos: how single-threaded Redis works

As told in class, the engineers who built Redis challenged every single decision. What if we take locks? What if we avoid locks by using atomic instructions? What if we need no locks at all, and go single threaded?

Doesn’t one thread make the cache slow when two servers update different keys? No. Single-threaded systems are not blocked; that is how such concurrent systems are built, and the videos above show how.

There is a real cost, though. A single-threaded cache wastes CPUs: on a machine with 32 cores, Redis uses only one, and the other 31 sit idle. To use the hardware, people run several shards of the cache on the same machine, say eight.

[figure title] One thread, many cores

[figure description] Left: a single-threaded cache on an 8-core machine keeps one core busy and leaves seven idle. Right: the same machine running eight single-threaded shards of the cache, one per core, so every core is used.

[figure labels] redis · redis: 1 busy · 7 cores idle · s1 · s2 · s3 · s4 · s5 · s6 · s7 · s8 · 8 shards on one box · each single-threaded

[caption] Fig 4·gOne thread, many cores, drawn with eight. Left: a single-threaded cache keeps one core busy. Right: eight single-threaded shards on the same box use them all.

And the single thread is what makes the rest of the single-node design work. Everything built in chapters 2 and 3, the malloc counter included, is correct because the cache is single threaded. Make it concurrent and total_size += b from two threads would cause massive havoc; one thread also saves the cost of context switches. So single threading simplifies a great deal without losing concurrency, and it under-uses the hardware, which you win back by putting several Redis nodes on one machine. There are trade-offs everywhere.

Three ways for one node to take turns

|

| Pessimistic lock

| Optimistic (CAS)

| Single thread

| What you pay

| Every writer takes the lock; others wait

| A failed write must retry or give up

| Nothing per request

| Under heavy contention

| Threads queue at the lock

| Many losers retry

| Requests run one after another

| Code complexity

| Mutexes, semaphores, deadlock care

| Atomic instructions, retry loops

| Lowest: no concurrency control

| Uses all cores?

| Yes

| No: 1 of 32, unless you run shards

| Example

| Java synchronized

| CAS(a, 10 → 20)

| Redis

The board briefly carried a fun exercise, erased soon after: how would you use MySQL as a cache server, with the same throughput as any other cache?

§ 4.6

## From class: the double-booked seats

A question carried over from Lecture 3’s seat exercise: shared locks, and the same seat sold twice.

About 5 min · class 02:57–03:03

Locks in a real database come back in one last question from class, about Lecture 3’s seat-allocation exercise. It belongs to databases rather than to our cache, so it sits in a side note.

[summary] Shared locks and the double booking skip unless you did the Lecture 3 exercise

The setup: 120 seats, 120 people, and an implementation that took shared locks, which ended up handing the same seats to many people. When a transaction holding a shared lock updates the row, the lock is elevated to an exclusive lock. So that should not have happened. The first thing to check is the isolation level. To debug locking, use MySQL’s administrative console rather than a UI: it shows which row holds which lock.

The guess at the bug offered in class, reduced to two transactions on one row: both take a shared lock. T2 writes first, so its lock is elevated to exclusive. T1 still holds its shared lock; it waits until the exclusive lock is released and then writes to the same row, overwriting it.

More precisely

With shared locks, two transactions that both try to update the same row deadlock: each one’s request for an exclusive lock waits on the other’s shared lock, and InnoDB rolls one of them back deadlock example ↗. Double booking usually means the availability check used a non-locking read, and the update did not re-check the condition consistent reads ↗.

MySQL 8.4 reference manual ↗

The overwrite, in this explanation, happens because the waiting transaction does not re-evaluate its statement after the lock is released: “most probably what is happening behind the scene”.

More precisely

In InnoDB, a REPEATABLE READ snapshot applies to SELECT statements, “not necessarily to DML statements”: UPDATE and DELETE act on the latest committed row versions. PostgreSQL under READ COMMITTED re-evaluates the WHERE clause after waiting postgresql.org ↗. An overwrite happens when the UPDATE has no condition on the seat’s state (just WHERE id = ?) after a stale snapshot read, not because the database skips re-evaluation. Put the condition in the UPDATE itself, e.g. WHERE seat_free = 1.

MySQL 8.4 · PostgreSQL docs ↗

The explanation assumed REPEATABLE READ, called in class almost the most common isolation level out there, and the explanation was flagged plainly as a guess that might be wrong. REPEATABLE READ is InnoDB’s default dev.mysql.com ↗; PostgreSQL defaults to READ COMMITTED, so it isn’t the most common across databases postgresql.org ↗.

[figure title] Two shared locks, two updates

[figure description] Time runs down. Lanes: transaction T1, the row for seat 7, transaction T2. Both take a shared (S) lock on the row. T2 runs UPDATE and asks for an exclusive (X) lock, which must wait for T1’s shared lock. T1 runs UPDATE and asks for X, which must wait for T2’s shared lock. Each waits for the other: a deadlock, and InnoDB rolls one transaction back. The double booking usually came from a plain read followed by an UPDATE that did not re-check the seat.

[figure labels] T1 · seat 7 · T2 · time · S + S · takes S · takes S · UPDATE · X: waits for T1’s S · UPDATE · X: waits for T2’s S · deadlock → InnoDB rolls one back · the double booking usually came from a plain read · + an UPDATE that didn’t re-check the seat

[caption] Fig 4·hTwo shared locks, two updates. The guess in class was different (one transaction overwrites the other); the MySQL docs describe this deadlock instead.

Percona, a MySQL plugin and utility, can visualise and manage the locking state of databases; it has a lock viewer whose name didn’t come to mind in class, last used in 2015. It could also simply be a bug. In most cases, in the class’s view, the deadlock file’s data is very hard to interpret, and that is the gap between practical understanding and production, where things go berserk and nobody knows what is happening.

One correction to a common fear: a deadlock does not crash the database or the program. It terminates a transaction.

back in · Lecture 3: shared and exclusive locks

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does HTTP cost a cache more than RESP, even on a kept-alive connection?

[summary] Show answer

Every HTTP request carries a text request line and headers: storing a = 1 takes over 100 bytes, and the cache has to parse all of it. RESP sends the same command as three length-prefixed strings, 27 bytes, quick to parse. (The class also charged HTTP/1.1 a new TCP handshake per request; in fact HTTP/1.1 keeps connections alive by default, so the headers are the real cost.)

Two clients send update a=20 where a=10 and update a=30 where a=10. What does each see, and what instruction makes that safe?

[summary] Show answer

Whichever runs first sets a to 20. The other finds a is 20, not 10, and changes nothing; it can re-read and retry or give up. Compare-and-swap makes it safe: CAS(a, 10 → 20) checks and writes as one atomic instruction, so nothing can slip in between the check and the write.

Redis uses one core of 32. Why is that acceptable, and how do people use the rest?

[summary] Show answer

One thread needs no locks or atomics: the single-node design, down to the zmalloc counter, is correct without concurrency control, and there are no context switches. Single-threaded systems aren’t blocked by many clients. To use the other cores, people run several shards of the cache on the same machine.

Concepts in this section: it’s all TCP · HTTP over netcat · RESP · gRPC · pessimistic locking · compare-and-swap · single-threaded · shared vs exclusive locks

Contents of this lecture ↑

Lecture 09, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-routing ===

# Build your own Redis, chapter 5: Many nodes: splitting the keys and finding them

Lecture 09 · Build your own Redis · chapter 5 of 7

§ 5

## Many nodes: splitting the keys and finding them

One node can’t take the load. Split the keys across nodes, and then decide who tells a client where its key lives.

About 15 min · class 01:50–02:07, Q&A 02:29–02:32

Our Redis is done as a single box: it stores typed values, counts its bytes, evicts, expires, speaks a lean protocol and takes turns on one thread. Now the blog app grows past it. One node can no longer handle the load, or hold the data.

This chapter splits the keys across several nodes and then faces the question that splitting creates: when a client wants a key, how does it find the node that has it?

§ 5.1

## Why distribute, and splitting the keys

Run the same single-node cache several times, and give each copy its own slice of the keys.

About 3 min · class 01:50, 01:55–01:57, board 02:07

Make the cache distributed when one node is not enough: when it can’t handle the load, or can’t hold the data. The cache is then spread across multiple machines. The design has five aspects, in this order: storage, routing, availability, reliability and scaling.

Storage comes first, and it is the simplest. Take the exact same single-node cache from chapters 2–4, run several instances of it, and give each one a mutually exclusive subset of the keys: say A to J on the first, K to T on the second, U to Z on the third. The ranges are only an example; the point is that the key space is split into slices that don’t overlap. back in · Lecture 3: range shards and routing

[figure title] Key ranges on three nodes

[figure description] A strip of all keys, a to z, cut into three slices that don’t overlap: a to j, k to t, u to z. Each slice goes down to its own copy of the same single-node cache: a to j to c1, k to t to c2, u to z to c3.

[figure labels] all keys · a–j · c1 · k–t · c2 · u–z · c3 · the same single-node cache, three times

[caption] Fig 5·aThe key space split into three slices that don’t overlap, one per copy of the same single-node cache. Redrawn from the class board at 01:55.

This is the question that came up back in §2.2, when the cache was still one machine: what if there are several? The answer then was to finish the single node first and think of sharding when distributing. This is that sharding.

The board put the whole idea in one line. A distributed cache is multiple single cache servers working together as a single coherent cache, for example behind a proxy.

§ 5.2

## The routing problem

A client wants the key kiwi. Which of the three nodes does it talk to?

About 3 min · class 01:56–01:59

Splitting storage adds a routing problem. When a client wants to store or read a key, how does it know which node, cache 1, 2 or 3, owns that key’s range?

Pause and think

Three cache nodes own key ranges a–j, k–t and u–z. A client wants kiwi. Does it need a central routing table that every request goes through?

The bank visit in the next section lays out the four.

The first idea suggested in class is a central place, exposed to clients, that stores the mapping from key range to node: A–J on C1, K–T on C2, U–Z on C3. A client’s first request goes there to learn where to talk. That works, and it raises a sharper question, the right one to ask: does that routing layer answer the client with where to go, or does it forward the request itself? Both have pros and cons, and different systems do it differently.

[figure title] Where does the routing table live?

[figure description] Left: a client wants key kiwi. It first asks a routing box that holds the table (a to j on c1, k to t on c2, u to z on c3), gets the answer c2, then goes to c2 itself. Right: the table moves into the client, which goes straight to c2.

[figure labels] client · routing · (a,j) → c1 · (k,t) → c2 · (u,z) → c3 · kiwi? · c2 · c1 · c2 · c3 · ask first, then go · client · (a,j) → c1 · (k,t) → c2 · (u,z) → c3 · kiwi · c1 · c2 · c3 · or the client keeps the table

[caption] Fig 5·bWhere does the table live? First panel: a routing box holds the range table; the client asks it first, then goes to c2. Second panel: the table moves into the client, which goes straight to c2. Redrawn from the class board at 01:59 and 02:01.

None of this is special to caches. The routing challenge holds for any distributed storage system: storage split across N mutually exclusive subsets, and a client that must reach the right one.

§ 5.3

## Four ways to route: a visit to the bank

You walk into a bank with a form. Who takes it to the right desk?

About 7 min · class 01:59–02:06

There are four ways to route a request (a fifth is welcome), and each one is something you already do at a bank. These four everyday practices translate as they are into communication in distributed systems, and every distributed system uses one of them.

1 · Proxy. At the bank door stands a peon who, for a commission (call it a bribe), gets your work done. You talk only to the peon; you know nothing about how many desks or departments are inside. That is the standard proxy. A load balancer works exactly this way: one point of entry, responsible for getting every request done, and it can serve as the routing layer. A distributed cache behind such a proxy is the board’s definition from 5.1: many single servers working as one coherent cache. back in · Lecture 5: what a load balancer is

2 · Smart client. A long-time customer knows the bank and walks straight to the right desk. Here the routing information lives in the client itself: it knows all the nodes, and no router is needed. The trade-off: if responsibilities move between desks, when the topology changes, every client has to be told. That burden is acceptable, but it is the disadvantage. In return there is no intermediate hop, so you save the bribe, which here is network latency.

3 · Forwarding. No peon. You go to the nearest desk, and it is that desk’s responsibility to forward your request to the desk that can handle it, get the response and send it back to you. There is no central authority: any node takes responsibility for forwarding. The internet itself works this way: you connect to a machine, it forwards your packets to another, and so on, and the response comes back the same way. IPFS, the InterPlanetary File System, was given as the example, with BitTorrent on the same kind of overlay network. Strictly, their Kademlia-based lookups are iterative: a queried node returns peers closer to the key and the requester contacts them itself, which is closer to the redirect way below than to forwarding docs.ipfs.tech ↗.

[summary] Go deeper: overlay networks skip unless you want peer-to-peer routing

The class pointed to a long video series on IPFS and BitTorrent-style overlay networks, where nodes route requests for each other. Chapter 6 comes back to these as distributed hash tables.

4 · Redirect. You go to the nearest desk and it says: “I’m busy, go to counter number 13.” You then go to that counter yourself. This is what DNS does: the DNS server returns the IP address, and you connect to it directly. back in · Lecture 5: DNS answers; it doesn’t forward

[figure title] Four ways to route, at the bank

[figure description] Four panels, each a client and three cache nodes, the key living on c2. 1 Proxy: the client talks only to a proxy, which forwards to c2 and relays the answer; the cost is one extra hop. 2 Smart client: the client holds the table and goes straight to c2; no middle hop. 3 Forwarding: the client asks the nearest node, c1, which forwards to c2 and relays the answer back; IPFS-style overlays, not used for a cache. 4 Redirect: c1 answers go to c2, and the client then goes to c2 itself; this is how DNS works and how Redis answers.

[figure labels] c1 · c2 · c3 · proxy · the bribe = one extra hop · ① Proxy · the peon at the door · c1 · c2 · c3 · c1 · c2 · c3 · no middle hop · ② Smart client · the regular who knows the desk · c1 · c2 · c3 · ipfs-style overlays · not for a cache · ③ Forwarding · the nearest desk walks it over · c1 · c2 · c3 · go to c2 · dns · redis · ④ Redirect · “go to counter 13”

[caption] Fig 5·cFour ways to route, at the bank. The key lives on c2. Blue is the request, green the answer. Redrawn from the class board at 02:07, where the forwarding way is labelled “IPFS · NOT” (not for a cache) and the redirect way “DNS · cache (Redis)”.

The four differ in who sends the next message, and when. Watch the same request go through all four banks:

Same request, four banks. Which one costs the client two round trips?

[caption] Clip 5·1Proxy, smart client, forwarding and redirect differ in who sends the next message. The smart client skips the middle hop, but every client must hear about every topology change.

[summary] The clip as text 0:39

- Four ways to reach desk c2, which holds the key kiwi.

- The peon at the door: you talk only to the proxy.

- The regular customer walks straight to the right desk.

- No peon: the nearest desk forwards it and relays the answer.

- Redirect: the desk says “go to c2”, and you go there yourself.

- c2's job moves to c3. The smart client's table is now stale.

- The smart client saves a hop but must hear every change.

Four panels, each a client and three desks c1, c2 and c3; the key kiwi lives on c2, and the same request plays in each panel in turn while a counter adds one leg per message. Proxy, the peon at the door: the client talks only to the proxy, which asks c2 and passes the answer back: 4 legs, 1 round trip for the client, and the extra hop is the bribe. Smart client, the regular customer: the client keeps the table kiwi → c2 and goes straight there: 2 legs, no middle hop. Forwarding: the client goes to the nearest desk c1, which forwards to c2 and relays the answer: 4 legs, 1 round trip. Redirect: c1 answers "go to c2" (the bank's "go to counter 13") and the client goes there itself: 4 legs and 2 round trips. Then c2's job moves to c3: the smart client's table is now stale and its old route fails. The smart client saves a hop but must hear about every change.

§ 5.4

## Which way for a cache?

Now pick one for our Redis, and see which one Redis picked.

About 6 min · class 02:04–02:08, Q&A 02:29–02:32

Which of the four is right? None of them, in general.

The rule for this whole chapter

There is no one right routing approach: pick your battles.

Each way has advantages and disadvantages. Make the client smarter to save a network hop. Add a proxy hop to make things easier for clients. For gigantic decentralised systems like Bitcoin or BitTorrent, let nodes forward for each other. Or make it like DNS: the node tells you where to go, and you connect directly. Pick your favourite; whatever works, works for you.

[figure title] Pick your battle

[figure description] Four tiny routing sketches side by side: through a proxy, a smart client going straight to the node, a node forwarding, and a redirect after which the client goes twice.

[figure labels] proxy · smart client · forward · redirect · pick your battle

For a cache, a central proxy or router that holds the routing table and forwards requests for you, much like a load balancer, would work. A smart client holding the routing information would also work, with the disadvantage that clients must learn about every change in the topology. Forwarding by any node is what you typically would not use for a cache: it brings far too many complications.

[figure title] A distributed cache behind a proxy

[figure description] Many single cache servers working as one coherent cache: a client talks to a proxy, which routes each key to cache 1, cache 2 or cache 3. Hash routing picks the node with hash(key) % 3; range routing gives cache 1 keys a to j, cache 2 k to p, cache 3 q to z.

[figure labels] many single cache servers working as one coherent cache · proxy · cache 1 · cache 2 · cache 3 · hash: i = hash(key) % 3 · range: c1 [a–j] · c2 [k–p] · c3 [q–z]

[caption] Fig 5·dA distributed cache behind a proxy. Hash routing lets a hash of the key name the node; range routing gives each node a range of keys. Redrawn from the class board at 02:07, with the board’s own split (a–j, k–p, q–z) rather than the a–j, k–t, u–z used earlier in this chapter; the board’s second range, written [j–p], is a slip of the pen for [k–p].

Whichever way you route, something has to decide which node owns a key. With range-based routing, ownership comes from key ranges, cache 1 owning A to J and so on; with hash-based routing, the hash of the key picks the owner. Chapter 6 takes the hash way much further.

And Redis? Redis uses the redirect way. When you fire a write at a replica, it returns the master’s IP address and asks you to write on the master, because replicas don’t take writes. It does this for replicas, not on every request.

More precisely

In Redis Cluster, a node that doesn’t own a key’s hash slot replies with a redirect such as -MOVED 3999 127.0.0.1:6381, and the client retries at that address. A standalone Redis replica just refuses writes replication ↗, and clients learn the master’s address from Sentinel Sentinel ↗.

Redis Cluster specification ↗

Why redirect rather than put a load balancer in front? To keep the infrastructure simple: there is no need for another component when the node itself can take care of it.

For reads, both ways exist in Redis: Redis Sentinel addresses the problem, and Redis now also has a proxy that holds routing information. Redis keeps evolving; the lecture was 100% sure only about the write-on-replica redirect, not sure how routing works in today’s Sentinel setup, and suggested watching talks on it. For the record, Sentinel does monitoring, failover and service discovery: clients ask Sentinels for the current master’s address. It does not route reads, and open-source Redis has no built-in routing proxy redis.io ↗.

Nor do you have to pick only one. A real system can mix two or more of the four, using a different one for different operations.

Returning the master’s address when a write hits a read replica was called the most common way: almost all databases adopt it.

More precisely

That overgeneralises. Many databases reject a write on a replica with an error rather than returning the primary’s address: a PostgreSQL hot standby errors on INSERT, UPDATE and DELETE, and a standalone Redis replica rejects writes redis.io ↗. Drivers, Sentinel or connection strings find the primary. Address-returning redirects, like Redis Cluster’s MOVED, are one approach, not “almost all”.

PostgreSQL docs · Redis docs ↗

The alternative is exactly that: discard the write, return an error, and say “go find the master node.” Databases are like people here: some say “go find it on your own”, others kindly tell you where to go.

Step back and the four ways are a general lens. Any distributed system’s routing layer can be built on one of them, and it is simple, and fun, to build.

Four ways to route a request to the node that owns the key

|

| Proxy

| Smart client

| Forwarding

| Redirect

| Hops per request

| Client → proxy → node: one extra hop

| Client → node: none extra

| Client → any node → owner

| Two trips when sent to the wrong node

| Who knows the topology

| The proxy

| Every client

| The nodes

| On a topology change

| Update the proxy

| Every client must hear

| Nodes update each other

| Nodes redirect to the new owner

| Example

| Load balancer

| A client holding the table

| IPFS-style overlays, the internet

| DNS, Redis

| Fit for our cache

| Works

| Too many complications

| What Redis does

### Check yourself #

Answer in your head, or out loud, before opening each one.

In the bank analogy, what is the “bribe”, and which routing way avoids paying it?

[summary] Show answer

The bribe is the extra network hop, the latency of going through a middleman. The proxy (the peon at the door) charges it on every request. The smart client avoids it by walking straight to the right desk.

Why is a smart client harder to run when nodes come and go?

[summary] Show answer

The routing table lives in every client. When a node joins or leaves, or a range moves, every client must be told, and until it is, it sends requests to the wrong node. A proxy only has one table to update.

What does a Redis Cluster node answer when you send it a key it doesn’t own?

[summary] Show answer

A redirect, MOVED, with the key’s hash slot and the address of the node that owns it; the client retries there. That is the redirect way: like DNS, the node tells you where to go and you connect yourself. (A standalone replica, by contrast, simply refuses a write.)

Concepts in this section: range sharding · routing problem · proxy · smart client · forwarding · redirect · MOVED

Contents of this lecture ↑

Lecture 09, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-consistent-hashing ===

# Build your own Redis, chapter 6: Consistent hashing, DHTs and staying up

Lecture 09 · Build your own Redis · chapter 6 of 7

§ 6

## Consistent hashing, DHTs and staying up

Adding a node with hash % N moves half the data. Consistent hashing decides ownership so only a slice moves. Then: running it in production, its weak spots, the general idea (DHTs), and replicas.

About 30 min · class 02:07–02:30, Q&A 02:32–02:39, 02:50–02:52

Our Redis now runs on three nodes. Each owns a slice of the keys, and a router, wherever it lives, knows who owns what. Then the blog app grows again and the three nodes can’t keep up.

The fix sounds trivial: add a fourth node. This chapter is about why it isn’t, the one idea that makes it cheap, what that idea does not do for you, and how the cluster stays up when a node dies.

§ 6.1

## Who owns a key?

Hash routing spreads keys evenly, until you add a node and half of them have to move.

About 5 min · class 02:07–02:12

Three nodes are no longer able to handle the load, so we want to add a fourth. How do you add it?

This is where consistent hashing comes in: “quote unquote, the most famous algorithm of all time”, and one with tons of misconceptions around it. This chapter sorts them out one at a time, starting from what the router does with a key.

In hash-based routing, the router applies a simple hash function to every key that comes in. The result tells it which node to forward the request to, and the router forwards it there. That step is how you define ownership of a key: the node a key is routed to is the node that owns it. Ownership of a key is the key concept of this whole chapter.

Chapter 5 used the other way. With range-based routing, ownership comes from key ranges: keys A to J are owned by cache 1, the next range by cache 2, U to Z by cache 3. With hash-based routing, the hash of the key picks the owner.

Hash-based routing is by far the most common, because a hash function spreads the load almost uniformly across the nodes. It isn’t random; it is uniform enough, and deterministic: the same key always lands on the same node. back in · Lecture 2: sharding with hash(user_id) % N Real systems do it in more than one way. Redis Cluster, for one, doesn’t use a ring at all: it maps every key to one of 16,384 hash slots, CRC16(key) mod 16384, assigns slots to master nodes, and moves whole slots when it reshards redis.io ↗.

Now take six keys, K1 to K6, and two caches, cache 0 and cache 1. Pass each key through the hash function: K1, K2 and K6 land on cache 0, and K3, K4 and K5 on cache 1. Three to three, a near-equal distribution.

Then add a third cache. The function changes from hash % 2 to hash % 3, and because the function changed, data has to move: you literally go through every single key in the system and work out where it goes now. It is a small, hypothetical example, but it shows how cruel this gets once you scale up and down.

Pause and think

Keys are placed by hash(key) % 2. K1–K6 have hashes 6, 8, 7, 1, 3, 2. You add a third cache and switch to % 3. How many of the six keys change node?

The pain is not the hash; it is that changing N changes almost every owner. Consistent hashing changes only a few.

[figure title] hash % 2 → hash % 3 moves half the keys

[figure description] Two tables of six keys with their hash values: K1 6, K2 8, K3 7, K4 1, K5 3, K6 2. With hash % 2 on two caches, K1, K2 and K6 go to c0 and K3, K4, K5 to c1. Adding cache 2 makes it hash % 3: K1 stays on c0, K3 and K4 stay on c1, but K2 moves to c2, K5 to c0 and K6 to c2. Three of six keys, 50%, move. On average going from % N to % (N+1) moves about N/(N+1) of the keys.

[figure labels] hash % 2 · two caches · key · hash · node · K1 · 6 · c0 · K2 · 8 · c0 · K3 · 7 · c1 · K4 · 1 · c1 · K5 · 3 · c1 · K6 · 2 · c0 · add a node · hash % 3 · cache 2 added · key · hash · node · K1 · 6 · c0 · K2 · 8 · c2 · * · K3 · 7 · c1 · K4 · 1 · c1 · K5 · 3 · c0 · * · K6 · 2 · c2 · * · 3 of 6 = 50% moved · on average, % N → % (N+1) moves about N/(N+1) of the keys

[caption] Fig 6·ahash % 2 → hash % 3. The hash values are the page’s, chosen to give the board’s result; the rows in red change node. Redrawn from the class board at 02:10.

Look carefully at the new table. K1 was on cache 0 and stays there. K3 and K4 stay on cache 1. But K2 moves from cache 0 to cache 2, K5 from cache 1 to cache 0, and K6 from cache 0 to cache 2: three keys, each copied off one node and onto another.

The distribution is still equal, yet adding one node forced three of the six keys, 50% of the data, to move between nodes. That data movement is the pain point of plain hash-based routing. If anything, 50% is the lucky case: with % N → % (N+1), a key stays only when both remainders agree, and on average about N/(N+1) of all keys move, two thirds when going from 2 nodes to 3 Wikipedia ↗.

Every one of those moves is a copy over the network, and rebalancing a lot of data over the network is very slow. Consistent hashing exists to make adding a node cheaper.

§ 6.2

## What consistent hashing is, and isn’t

A sorted array and a binary search that decide who owns a key. Nothing else.

About 6 min · class 02:12–02:17, 02:21

Three myths first. Consistent hashing is not a service, and not a microservice. Nor is it a magical solution that solves all your problems.

The rule for this whole chapter

Consistent hashing solves for ownership. Nothing else.

It helps you determine who owns what, done and dusted; that is all it does. It does not move your data, it does not migrate anything, and it gives you no uptime guarantees. Those are jobs you do yourself, and the rest of this chapter does them.

[figure title] Who owns it, that’s all

[figure description] A small ring with four nodes and one key; a curved arrow runs clockwise from the key to the next node, its owner. Nothing else is drawn: the ring decides ownership and nothing more.

[figure labels] who owns it. · that’s all.

So keep the two apart in your head: the ring tells the router which node owns a key. Getting the key’s data onto that node, and keeping the node alive, are separate problems. Consistent hashing doesn’t do data movement or data migration for you, and it doesn’t do uptime guarantees.

It is not even really a data structure. It is a simple technique, implemented as a simple array with a binary search, and it takes hardly any space.

Everyone draws it as a ring, because that is the simplest way to picture it. The implementation looks different, and the blog post below has it.

[summary] See it yourself: a ring in Python skip unless you want the code

There is a detailed blog post, with Python source code and a worked example, on implementing your own consistent hashing: on arpitbhayani.me under blogs (search for “Arpit Bhayani consistent hashing”). It is also in this course’s pre-reads.

The things that will own keys, here the cache nodes, are placed on the ring by passing each node’s identifier through the hash function; the output is the node’s position. The ring is the hash function’s output range, 0 to 2n. The example uses 24, so 16 positions; in reality the range is as large as 2128, a gigantic value. Hash cache 1 and it lands on 3; cache 2 lands on 12, cache 3 on 5 and cache 4 on 10. Each node sits at that position on the ring.

To find a key’s owner, the router hashes the key and picks the first node to the immediate right of that position, going clockwise. That node owns the key. Key K1 hashes to 0. The first node clockwise from 0 is at 3, which is cache 1, so K1 is owned by cache 1 and its data goes there.

[figure title] The ring decides ownership

[figure description] A ring of hash positions 0 to 15, 0 at the top, running clockwise. Each cache is placed by hashing its id: cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12. Key K1 hashes to 0; its owner is the first node clockwise, cache 1 at 3. A speech bubble on the ring says “I move your data for you”, the misconception: the ring only decides ownership.

[figure labels] 0 · 3 · 5 · 10 · 12 · cache 1 · cache 3 · cache 4 · cache 2 · K1 · owner · I move your data · for you · consistent hashing: for determining ownership · owner = the first node clockwise

[caption] Fig 6·bThe ring decides ownership. Nodes sit where their ids hash; a key belongs to the first node clockwise. The bubble is the myth the rule box answers. Redrawn from the class board at 02:16.

Where does the ring live? Wherever routing lives (the four places in 5.3). If the client holds the routing, it is stored in the client; if a proxy routes, in the proxy; in a DNS-like routing component, there. And it is just routing information. For four nodes you store an array of four elements, and that’s it: no linked list, nothing else.

So all consistent hashing does is replace the routing table, the who-owns-what mapping that the router or a smart client uses to forward requests, with a more elegant mapping. It is still not a service.

[figure title] Ring and array

[figure description] Left, the ring: cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12, key K1 at 0. Right, the same information as a sorted array of four entries: 3 c1, 5 c3, 10 c4, 12 c2. To find K1’s owner, hash it to 0 and binary-search for the first position at or after 0: 3, so c1. A key that hashes to 13 is past the end, so the search wraps to index 0: c1 again.

[figure labels] 0 · 3 · 5 · 10 · 12 · c1 · c3 · c4 · c2 · K1 · the picture · sorted array of positions · 3:c1 · [0] · 5:c3 · [1] · 10:c4 · [2] · 12:c2 · [3] · hash(K1) = 0 · binary search: first position ≥ 0 → 3 → c1 · hash(K9) = 13 · past the end → wrap to index 0 → c1 · the implementation

[caption] Fig 6·cThe ring is the picture; four numbers in a sorted array are the implementation. A key past the last position wraps around to the first, which is what makes the array a ring.

In code, the lookup is a binary search for the first position at or after the key’s hash, wrapping to the start when it runs off the end:

import bisect ring = [3, 5, 10, 12] # sorted positions node = {3: 'cache 1', 5: 'cache 3', 10: 'cache 4', 12: 'cache 2'} def owner(h): # h = hash(key) # first position >= h i = bisect.bisect_left(ring, h) # past the end: wrap to index 0 return node[ring[i % len(ring)]]

owner(0) is cache 1, as on the ring, and so is owner(13): past 12 the search wraps around to 3.

Why trust this narrow description over the many grander ones? It comes from use: consistent hashing run in production, which is where the confidence about what it does, and what it does not, comes from. There are tons of misconceptions floating around the internet. Stay away from them, and understand the one problem it solves and how it solves it.

§ 6.3

## Adding and removing nodes

A new node takes one slice from one neighbour. A removed node hands one slice to the next.

About 5 min · class 02:17–02:21

Back to growing the cluster. Four nodes now sit on the ring, and we scale up to five. Cache 5 is passed through the hash function and lands on 1, so it sits at 1 on the ring. Key K1, at 0, used to go to cache 1. Its first node clockwise is now cache 5: the ownership has changed.

[figure title] Adding cache 5

[figure description] The ring of Fig 6·b with a new node, cache 5, hashed to position 1. Key K1 at 0 used to belong to cache 1 at 3; its first node clockwise is now cache 5. Only keys in the slice from 12 (exclusive) to 1 change owner, all from cache 1 to cache 5; every other key keeps its owner. The board: we create cache 5 using cache 1, then add it to the ring.

[figure labels] 0 · 1 · 3 · 5 · 10 · 12 · cache 1 · cache 3 · cache 4 · cache 2 · cache 5 · K1 · (12, 1] · only keys in (12, 1] move: · cache 1 → cache 5 · everyone else: untouched · “we create cache 5 using cache 1, · then add it to the ring”

[caption] Fig 6·dAdding cache 5 at position 1. K1’s owner changes from cache 1 (faint arrow) to cache 5 (green); only the slice between 12 and 1 changes hands. Redrawn from the class board at 02:19.

As soon as the ring changes, a new request for K1 goes to cache 5. Look carefully at which keys move: only those in the range cache 5 now covers, the positions after 12 up to 1, which used to go to cache 1 and now go to cache 5. Keys between 1 and 3 still go to cache 1. All other keys remain unaffected; they aren’t even touched. That is minimal data transfer.

Only the nodes right before and after the position where the new node is placed are affected; no one else is. You do the bare minimum of data transfer, at the place where the node was added.

That is the benefit of consistent hashing, the whole of it: it ensures you do only minimal data transfer when you scale up or scale down. There is no magic sauce behind it. It is very simple, and very beautiful in hindsight.

Watch the two schemes side by side on the same six keys:

Six keys, two nodes, add a third. How many keys move with % N, and how many on the ring?

[caption] Clip 6·1With hash % N, adding a node rechecks every key and about half move; on the ring only the new node’s slice moves, all from one neighbour. On average % N moves about N/(N+1) of keys, a ring about 1/(N+1).

[summary] The clip as text 0:39

- Six keys on two nodes, placed by hash mod 2.

- Add a node: mod 2 becomes mod 3, so every key is rechecked.

- Three of six keys change node: half the data moves.

- On a ring, each key belongs to the next node clockwise.

- Add c5 at 1: only its slice moves, all from one neighbour.

- On average, % N moves about N/(N+1) of keys; a ring about 1/(N+1).

Left: six keys K1 to K6 on two nodes c0 and c1, placed by hash mod 2 (K1, K2, K6 on c0; K3, K4, K5 on c1). A third node c2 is added, so the rule becomes hash mod 3 and every key is rechecked one by one. Three keys change node: K6 and K2 move from c0 to c2 and K5 moves from c1 to c0, so 3 of 6 keys, 50% of the data, move. Right: a consistent-hashing ring with nodes c1 at 3, c3 at 5, c4 at 10 and c2 at 12, and six keys on it; each key belongs to the next node clockwise. A node c5 is added at position 1. Only the keys in the slice (12, 1], K6 and K1, change owner, and their data comes from c1, the one neighbour that owned that slice; every other key keeps its owner: 2 of 6 move. On average, going from N to N+1 nodes, hash mod N moves about N/(N+1) of the keys and a ring about 1/(N+1).

Removing a node is the same move in reverse. Say four nodes carry decent traffic, but the cluster is over-provisioned and you want to remove one, cache 1, to save cost. There are two cases: a graceful termination and an abrupt removal.

On the ring, the answer to “who owns K1 now?” is simple. Key K1, which used to go to cache 1, now goes to the next node clockwise, cache 3.

When you terminate cache 1 gracefully, you first take a snapshot of it, copy its data to cache 3, and only then remove it from the ring. Requests that now land on cache 3 find their data and don’t cause cache misses. That is how it is done operationally.

The second case is abrupt: the server goes down, or is deleted out from under you. All the load for the range that used to go to cache 1 suddenly goes to cache 3, and you should be okay with that.

Either way, all the other keys remain unaffected, so the data transfer is minimal again.

[figure title] Removing cache 1: graceful or abrupt

[figure description] Top: the ring with cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12, and key K1 at 0 owned by cache 1. Below, lanes for the router, cache 1 and cache 3, time running down. 1: cache 1 holds the slice from 12 to 3 and is to be removed. 2, graceful: snapshot cache 1 and copy its data to cache 3. 3: remove cache 1 from the ring; on the ring K1’s owner is now cache 3, and the router’s request for K1 goes to cache 3 and hits. 4, abrupt: cache 1 just dies with no copy; the slice from 12 to 3 arrives at cache 3 cold, and a request for K1 misses. 5: either way, the ranges of cache 4 and cache 2 do not change.

[figure labels] c3 · c4 · c2 · K1 · c1 · c1 · router · cache 1 · cache 3 · time · 1 · owns (12, 3]: K1 · over-provisioned: remove it · 2 · graceful: · snapshot + copy · K1 ✓ · 3 · off the ring · get K1 · hit · 4 · abrupt: · dies, no copy · get K1 · miss · the whole slice lands here, cold · (12, 3] cold · 5 · every other key stays where it was · unchanged

- We want to remove cache 1, say to stop paying for an over-provisioned node. It owns the slice from 12 to 3, including K1.

- Graceful: take a snapshot of cache 1 and copy its data to cache 3 first.

- Then remove cache 1 from the ring. Requests for K1 now land on cache 3 and find their data.

- Abrupt: the node just dies, with no copy. Its whole slice lands on cache 3 cold, and every request in it misses.

- Either way, every other key stays where it was: cache 4’s and cache 2’s ranges don’t change.

Keys: ← → to step · link to a step with #fig-6e/step-3

[caption] Fig 6·eTime runs down. The ring at the top follows the steps: from step 3 cache 1 is off it and K1’s owner is cache 3. The lanes are the router, cache 1 and cache 3, the next node clockwise. Dashed is the snapshot copy, blue a request, green data that is there, red a node that dies and the misses it causes. Redrawn from the class board at 02:19–02:21.

### Three ways to place keys #

Plain hash % N, a consistent-hashing ring, and a ring with virtual nodes (6.5)

|

| hash % N

| Ring

| Ring + virtual nodes

| Data moved on add

| Most keys: 3 of 6 here, about N/(N+1) on average

| Only the new node’s slice, about 1/(N+1)

| The same total, about 1/(N+1)

| Moved from where

| From almost every node to almost every node

| One neighbour: the next node clockwise

| A small slice from each of many nodes

| Ownership lookup

| hash(key) % N

| Binary search in a sorted array of positions

| The same, over a longer array

| Balance

| Even, if the hash is

| Can be uneven: close nodes, hot spots

| Smoother: why Dynamo uses them

| Operations

| Recompute every key, move most of them

| Snapshot one node, load the new one

| Copy from many places; harder to run, in this chapter’s view

§ 6.4

## Never add a blank node

The ring changes ownership instantly. The data doesn’t follow by itself.

About 3 min · class 02:21–02:23, Q&A 02:36–02:37, 02:50–02:51

Traffic is peaking, and you add cache 5 to the ring. What does it have in it?

Pause and think

Traffic is peaking, so you start a new, empty cache 5 and put it on the ring. Consistent hashing means only a slice of keys move. Is that enough?

Consistent hashing decides ownership. Moving the data is an operational step you run yourself.

Start a blank cache server and add it to the ring, and the keys it now owns go to it, but there is nothing there. Every one of those requests is a cache miss, and the misses become higher load on the backend systems behind the cache.

So, step by step, this is how you spin it up. Take a snapshot of cache 1, the node that owns the slice today. Create cache 5 from it. Add cache 5 to the ring, so that when a request for K1 arrives there, the data is there. Then slowly delete the moved keys from cache 1, which is no longer their first owner.

[figure title] Adding cache 5 safely

[figure description] Lanes for the router, cache 5, cache 1 and the backend database, time running down. 1: a blank cache 5 is put on the ring at peak; a request for K1 goes to cache 5, misses, and falls through to the database, whose load rises. 2: instead, take a snapshot of cache 1 and build cache 5 from it. 3: then add cache 5 to the ring; the request for K1 hits. 4: then slowly delete the keys cache 1 no longer owns, the slice from 12 to 1. 5: with replicas on the ring, cache 1 may keep them anyway.

[figure labels] router · cache 5 · cache 1 · db · time · 1 · blank · get K1 · miss · falls through to the db · load ↑ · 2 · instead: · snapshot · K1 ✓ · 3 · + cache 5 · get K1 · hit · 4 · slowly delete · (12, 1] · 5 · with replicas: · may keep them

- A blank cache 5 is added at peak. Requests for K1 go to cache 5, miss, and fall through to the database: misses, and the backend takes the load.

- Instead: take a snapshot of cache 1 and build cache 5 from it.

- Now add cache 5 to the ring: K1’s requests find their data.

- Then slowly delete the keys cache 1 no longer owns, the slice from 12 to 1.

- With replicas on the ring, cache 1 might keep them anyway (6.7).

Keys: ← → to step · link to a step with #fig-6f/step-3

[caption] Fig 6·fTime runs down. Lanes: the router holding the ring, the new cache 5, cache 1 (which owns the slice today) and the backend database. Blue is a request, red a miss and the load it pushes onto the database, dashed the snapshot copy, green data that is there.

Whether to delete is a choice. If you have a replication factor set up, you may keep the data on cache 1 anyway, because the data is copied to the following nodes regardless (replicas come in 6.7). Without replication, you take the snapshot, create the node, then delete the keys that are no longer needed.

For a stateful system like this cache, that is about as simple as data movement gets. One quick snapshot of one node, one load of the new node from it: efficient, and nothing fancy. Keep that simplicity in mind; the next section is about a technique that gives it up.

§ 6.5

## Where the ring hurts: close nodes, hot spots, virtual nodes

You don’t choose where nodes land, or where keys pile up. The usual fix, virtual nodes, has a price.

About 6 min · Q&A 02:32–02:39, 02:51–02:52

The ring is not perfect. Two weaknesses come straight out of letting a hash function place things.

First, nodes can land too close together on the ring. That is a real disadvantage of consistent hashing, because placement is not in your control: the hash of a node’s id decides it.

Second, keys can pile up in one part of the ring. Consistent hashing suffers from hot partitions too. Being hash-based, it hands control to the hash function and asks it to spread keys uniformly enough, the best it can. If your key distribution is bad and your hash function is bad, you won’t see that uniform spread. You see hotspots instead, one node much hotter than the others, and then you add one more node just to try to dilute it. Hot partitions are a problem of their own. coming later · a later week: hot partitions, solved when the course designs S3

So why do companies still use it? Because it makes scaling up and down simple enough. And the hash range is long, 2120 as it was put here (2128 earlier), so everyone is playing by the odds. A longer range doesn’t even things out by itself, though: imbalance comes from having few points on the ring, whatever the ring’s size, which is why Amazon’s Dynamo added virtual nodes Dynamo paper ↗.

Nor is the ring right for every job. There is a case where consistent hashing performs very badly and should never be used, and a different technique works best there. coming later · a later week: where consistent hashing fails, and what to use instead

Virtual nodes are what nearly every explanation of consistent hashing reaches for next. Divide the ring into many small virtual parts (the question in class put it at “10 or 20 or something”) and map those to the physical nodes. A fair worry follows: the logic of consistent hashing is to minimise data transfer, and now each server’s chunks sit at places on the ring that aren’t next to each other. If one server goes down, a lot of scattered chunks have to move, instead of one transfer to a single neighbour. That worry is exactly the disadvantage of virtual nodes. They bring back a lot of network transfer, copying from many places instead of one, which is precisely what you adopted consistent hashing to reduce.

More precisely

Virtual nodes don’t increase the total data transferred when a node joins or leaves: it is still about 1/N of the data. They change where it comes from, many nodes in parallel instead of one neighbour. Dynamo treats that as a benefit: when a node fails, its load “is evenly dispersed across the remaining available nodes”, and a new node “accepts a roughly equivalent amount of load from each of the other available nodes”. The real costs are operational: more streams to coordinate, and Cassandra notes a higher probability of an outage with many tokens cassandra.apache.org ↗.

Dynamo paper · cassandra.apache.org ↗

[figure title] Virtual nodes: where a new node’s data comes from

[figure description] Left, one token per node: four nodes on the ring and a new node at one position; its keys come from one neighbour, the next node clockwise, in one copy. Right, virtual nodes: each of c1 to c4 sits at three places on the ring, and the new node also sits at three places, so it copies three small slices from three different nodes. The total is the same, about 1/N of the data, but it comes from many sources. In the lecture’s view that means more places to copy from and harder operations; the Dynamo paper’s view is that the load spreads evenly across the other nodes.

[figure labels] c1 · c3 · c4 · c2 · new · one source, one copy · one token per node · c1 · c3 · c2 · c4 · c3 · c1 · c2 · c4 · c1 · c2 · c3 · c4 · new node, · 3 places · same total (~1/N), from many sources · virtual nodes · the lecture: more places to copy from, harder to run · Dynamo: load spreads evenly across the others

[caption] Fig 6·gWhere a new node’s data comes from. With one token per node, one copy from one neighbour; with virtual nodes, small slices from many nodes. The two readings under the drawing are this chapter’s and Dynamo’s.

Think about it operationally. When cache 5 joined in 6.4, one quick snapshot of cache 1 loaded it. With virtual nodes, a new node is placed at many places on the ring, so its data has to be loaded from many other nodes. That is operationally challenging: you might miss something, and if transferring from any one of those nodes is slow, it slows down the whole process. Cassandra’s documentation lists the same kind of costs for many tokens per node: more neighbours per token range, a higher probability of an outage, and more repair operations. Since its 3.x versions, a deterministic token allocator gives balance with far fewer tokens than the old default of 256 cassandra.apache.org ↗.

Hence the verdict here: adding virtual nodes is not a good idea for solving the hot partition problem in a stateful use case like this cache. Companies still do it, and there are hacks around it.

More precisely

Virtual nodes are a trade-off for stateful systems, not a mistake: better balance and parallel rebuilds, which is why Dynamo and Cassandra, both stateful stores, use them, against more complex data movement and more nodes involved in each range cassandra.apache.org ↗. Dynamo uses virtual nodes so that a failed node’s load “is evenly dispersed across the remaining available nodes”, and a new node takes roughly equal load from each existing node.

Dynamo paper · cassandra.apache.org ↗

It is not the worst option, just bad enough. As long as you are operationally okay with that amount of network transfer, it is fine. The lecture’s preference is to keep things operationally simple: copy one node, bring the server up, done, because simple systems scale.

To see the cost for yourself, think it through operationally. How would you copy the data? From how many different places, and how many ranges? How complicated does that get? Work it out, and the case against virtual nodes for a stateful application makes itself.

next session · Lecture 10: read up on virtual nodes and bring the question back

§ 6.6

## The general idea: distributed hash tables

No centre, and minimal data movement when nodes come and go: what we built is one of a family.

About 4 min · class 02:23–02:27

Step back: what have we just designed? Our distributed cache is nothing but a distributed hash table (DHT).

The idea reaches far. As it was put in class, the entire internet is a distributed hash table, and so are the BitTorrent network and the Bitcoin network.

More precisely

BitTorrent’s trackerless mode does use a DHT, based on Kademlia. The Internet’s routing and Bitcoin’s peer discovery are not DHTs developer.bitcoin.org ↗.

bittorrent.org (BEP 5) ↗

A DHT is a very generic concept. Keep the underlying data in memory and it becomes a distributed cache; keep it on storage and it becomes distributed storage. Only the applications you build on top change.

Its defining idea is that there is no central entity everyone talks to. A distributed cache can make the same choice and do without a central routing server. At internet scale, in a network like BitTorrent, you talk to the nearest node. If it has the data, it responds. Otherwise it forwards the request, or answers with the address of another machine you can go to, and that one may send you further on. The lookup always converges; that is the property of a DHT.

[figure title] A distributed hash table

[figure description] Top: a key goes through a hash function to a number i, which picks one of several storage nodes in a cloud: k2 on one node, k1 and k3 on another. There is no load balancer. Bottom: decentralised lookup. A request goes to the nearest node; it answers go to node 2; the requester then goes to node 2 itself. Beside it, the board’s list: DHTs are used in building distributed file systems, DNS servers, instant messaging and peer-to-peer sharing; BitTorrent and IPFS use DHTs (see More precisely).

[figure labels] DHTs are used in building: · · distributed file systems · · DNS servers · · instant messaging · · peer-to-peer sharing · BitTorrent, IPFS use DHTs · (see “More precisely”) · decentralised · request · 2 · nearest · go to · 2 · key · hash function · i · k2 · k1 k3 · no load balancer!

[caption] Fig 6·hA distributed hash table: a key’s hash picks a node, with no load balancer in front, and a lookup that starts at the nearest node and is told where to go. Redrawn from the class board at 02:23–02:27.

Nodes come and go in such a system, and adding or removing one has to cause minimal data movement, even when a server goes down and another takes its place. That is why consistent-hashing-like techniques are used to implement any DHT. Put the two properties together and you have the category: a system with no central entity that must do minimal data transfer as nodes go up and down is a DHT.

DHTs are everywhere. The board’s list: distributed file systems (our distributed cache counts as one), DNS servers, instant messaging and IRC clients, peer-to-peer networks like BitTorrent, and IPFS.

More precisely

DHTs can be used to build such services (Wikipedia lists DNS, instant messaging and file sharing as possible uses), but deployed DNS is a hierarchical, delegated system, not a DHT, and IRC is client-server. True DHT examples: BitTorrent’s Mainline DHT BEP 5 ↗, IPFS and Kad.

en.wikipedia.org ↗

IPFS, the InterPlanetary File System (ipfs.io), is a distributed file system built on a DHT, where people store data such as blockchain and NFT data.

How does a request find its way when no node knows about every other node on the internet? Kademlia solves exactly that: no node knows them all, yet the request is routed and converges on the node that has the data. In BitTorrent’s Kademlia DHT, a node asks the nodes it knows that are closest to the target. They return either peers or even closer nodes, and the requester “iteratively queries nodes that are closer” until it finds none closer BEP 5 ↗: the redirect way from 5.3, repeated.

[summary] Go deeper: Kademlia optional: P2P routing in depth

The board pointed to a 45-minute video deep dive into the Kademlia paper, part of a BitTorrent series. The paper takes days to understand (three, in the lecture’s telling), and it is a mind-blowing implementation that the world uses. Not an obligation, but it is a good way to fall for distributed systems.

§ 6.7

## Staying up: replicas, copies on the ring, and the AOF

Cache 3 dies. Where is its data? Redundancy across nodes, and a log on disk.

About 4 min · class 02:27–02:30, board 02:32

Cache 3 dies. Where is its data now?

For a cache, high availability starts from the same basic concept as for persistent storage (which may differ in the details): add replicas. Every node has a replica, and if the node goes down, the replica takes its place. It comes at a cost, maintaining that other node, but if availability matters to you, you pay it.

Otherwise, keep copies of the data on other nodes of the ring. Whatever data is on cache 1, keep one copy on cache 3; whatever is on cache 3, keep one copy on cache 4. If cache 3 goes down, cache 4 has its data and can serve its requests.

That is the beauty of the ring: it lets you set a replication factor. With a replication factor of 2, as it was stated here, the node that owns a key stores it and the two nodes immediately after it on the ring also hold the data. By the usual count, owner plus the next two is a replication factor of 3: the factor counts every copy. In Dynamo each key is stored on N nodes, the coordinator and its N−1 clockwise successors, and Cassandra’s RF=3 likewise means three replicas Dynamo paper ↗ cassandra.apache.org ↗.

[figure title] Two ways to survive a node

[figure description] Left: cache 1 with a dashed replica that pulls its data; if cache 1 goes down the standby takes over, at the cost of one more node to run. Right: the ring with key K at 0; its owner c1 and the next two nodes clockwise, c3 and c4, are ringed: each holds a copy. That is a replication factor of 3 by the usual count, called RF 2 in class.

[figure labels] cache 1 · replica · standby takes over · the price: one more node to run · a replica per node · c1 · c3 · c4 · c2 · K · owner + · next two · RF = 3 by the usual count · (“RF 2” as said in class) · copies on the next nodes

[caption] Fig 6·iTwo ways to survive a node: a standby replica per node, or copies on the next nodes of the ring. Redrawn and extended from the class board at 02:27–02:28.

Both are data redundancy, across nodes or across systems, and redundancy is how you get high availability: if a node goes down, you know where to find its data and can reconstruct the node if required. It is standard practice, and it matters even for a cache.

Redundancy covers a dead node. A rebooted one needs its data back from disk. Redis has the AOF, the append-only file, which the class called Redis’s write-ahead log: every write to Redis is appended to the file, and when the cache rebuilds, after a reboot say, Redis loads everything back from it. Strictly, Redis appends commands to the AOF after they are executed, so the AOF is a log of writes rather than a write-ahead log redis.io ↗. Two details matter in practice. AOF is off by default (RDB snapshots are the default), and with the default appendfsync everysec you can lose about one second of writes; always fsyncs on every write but is very slow redis.io ↗.

An append-only file is the standard way to ensure durability. (The first word that came out was “reliability”; durability is the right one, and the board’s “Reliability: write-ahead logging” means the same.)

The board also had a page for running all of this that was only glimpsed in passing. An orchestrator monitors the uptime of the cache servers through heartbeats and handles failovers, keeping its metadata in a MetaDB; the servers are monitored through Prometheus; and dynamic scaling up and down follows.

[figure title] The orchestrator, glimpsed on the board

[figure description] An orchestrator box with a metadb beside it, holding metadata. Three cache servers send heartbeats up to it, so it knows which are alive and can handle failovers. A prometheus box monitors the servers. Glimpsed on the board only; the layout is approximate.

[figure labels] metadb · orchestrator · prometheus · monitors servers · cache 1 · cache 2 · cache 3 · heartbeat · glimpsed on the board; layout approximate

[caption] Fig 6·jThe orchestrator: heartbeats in, failovers out, metadata in a MetaDB, Prometheus watching the servers. Only glimpsed on the board at 02:32; the layout is approximate.

That completes the distributed cache. Storage: keep the data on separate nodes, with some logic to determine ownership; hash-based and range-based routing are the two very common ways. The single node got the most time, then routing in depth, availability with replicas, and scaling with consistent hashing, where doing minimal data transfer as nodes are added is what matters.

### Check yourself #

Answer in your head, or out loud, before opening each one.

With % N, going from 2 to 3 nodes moved 3 of 6 keys. On the ring, adding cache 5 at position 1 moves which keys?

[summary] Show answer

Only the keys that hash into the slice cache 5 now covers: after 12, through 0, up to 1. K1 is one of them. They all move from one node, cache 1, the next node clockwise; every other key keeps its owner. On average a ring moves about 1/(N+1) of the keys, against about N/(N+1) for % N.

Name the two ways to remove a node and what each costs.

[summary] Show answer

Graceful: snapshot the node, copy its data to the next node clockwise, then take it off the ring. It costs one copy, and there are no misses. Abrupt: the node dies. Its whole range lands on the next node cold, so requests miss and the backend takes the load. Either way, no other key moves.

Virtual nodes: what does this chapter say they cost, and what does Dynamo say they buy?

[summary] Show answer

The cost, as argued here: a new or failed node’s data moves from or to many places instead of one neighbour, which is harder to run, can miss something, and is as slow as the slowest source; hence no virtual nodes for a stateful cache. Dynamo’s side: the total moved is still about 1/N, a failed node’s load spreads evenly across the rest, and a new node takes a roughly equal share from each, which gives better balance.

Concepts in this section: ownership · hash % N · consistent hashing · minimal data transfer · graceful removal · snapshot, then add · virtual nodes · DHT · Kademlia · replication factor · AOF

Contents of this lecture ↑

Lecture 09, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-what-to-keep ===

# Build your own Redis, chapter 7: What to keep

Lecture 09 · Build your own Redis · chapter 7 of 7

§ 7

## What to keep

The decisions, the heuristics, and where the next lessons pick up.

About 3 min

The page began with analysts who needed their own copy of production, then built a cache that had to fit in one machine’s RAM and grew it into a ring of nodes. Here is our Redis at the end of Lecture 9. Each part carries the number of the section that covers it, and every number links back to that section.

[figure title] Our Redis, end of Lecture 9

[figure description] Clients send requests to a router (a proxy, a smart client or a redirect), which finds the owner of a key on a ring of five cache nodes; two nodes have a dashed replica that pulls from them. One node is opened up: requests arrive on a resp port; each value sits in a MyValue struct with its type, LRU bits and expiry; every allocation goes through zmalloc, which keeps total_size under a maxmemory cap; one thread runs the commands; when memory is full a key is evicted by LRU, LFU or random; expired keys go by lazy deletion plus sampling. Far left, smaller: a CDC tool reads a database log and writes a copy elsewhere. Each part is tagged with the section that covers it.

[figure labels] §1.3 · log · cdc · reads · copy · router · proxy · client · redirect · §5.4 · ring · §6.2 · c1 · c2 · c3 · c4 · c5 · replica · replica · §6.7 · resp · §4.3 · MyValue { · void *value; · int type : 4; · lru_bits : 28; · expires_at; · } · §2.3 · maxmemory · zmalloc: · total_size · §2.6 · 1 thread · §4.5 · evict: lru·lfu·random · §3.4 · ttl: lazy + sample · §3.5

[caption] Fig 7·aOur Redis, end of Lecture 9: clients reach a router (proxy, smart client or redirect), which finds a key’s owner on a ring of cache nodes, two of them with replicas. One node is opened up: a resp port, the MyValue struct with type, LRU bits and expiry, the zmalloc counter under its maxmemory cap, one thread, and the eviction and expiry rules. Set apart and smaller (far left; at the bottom on a phone): the CDC tool that reads a database’s log and writes a copy.

### Eleven decisions #

Every step of the build was a decision with a cost. Here they are in the order the page made them:

- Storage (§2.2): a hash map from key to value; when a value outgrows its block, double it and move. Cost: an occasional expensive reallocation.

- Type metadata (§2.3): the key stays a plain key; the value sits in a wrapper with a 4-bit type. Cost: 4 bits per key.

- Memory accounting (§2.6): every allocation goes through zmalloc, which keeps total_size, so no system call per check. Cost: one counter and one wrapper.

- Eviction (§3.3, §3.4): LRU or LFU on a few bits in the wrapper, or random with nothing stored. Cost: correctness of the choice against bytes per key.

- Expiry (§3.5): an absolute expiry time in the wrapper, removed by lazy deletion plus sampling, with no priority queue. Cost: a temporary leak.

- Protocol (§4.3): one open TCP connection and a lean format of your own, or gRPC. Cost: bytes on the wire and parsing.

- Concurrency (§4.5): one thread, no locks. Cost: one core of many.

- Partitioning (§5.1): each node owns a mutually exclusive slice of the keys. Cost: someone must know who owns what.

- Routing (§5.4): a proxy, a smart client, forwarding or a redirect. Cost: network hops against what the client must know.

- Rebalancing (§6.3): consistent hashing, so adding a node moves only one slice. Cost: data still has to be moved, by you.

- Availability (§6.7): a replica per node, or copies on the next nodes of the ring, and an append-only file for durability. Cost: extra nodes and disk.

### Eight heuristics #

The same few ideas carried the whole lecture:

- Rely on the source of truth. Capture changes from the database itself, not from events the API server remembered to send (§1.3).

- In memory, be cautious about every single byte and bit, because RAM is costly. Reduce space to the bare minimum you can work with (§2.3).

- Big systems are built on very simple solutions: one counter in one wrapper around malloc tells you exactly when to evict (§2.6).

- Understand the life cycle of a key, and how your users access it, before you pick LRU or LFU (§3.4).

- Creating a connection for every call might not be the best idea. Keep one open: gRPC if your clients support it well, your own format otherwise, as Redis does (§4.3).

- There is no one right routing approach. Each has its pros and cons, so pick your battles (§5.4).

- Consistent hashing solves for ownership, and nothing else: it tells you who owns what (§6.2).

- Think operationally. Before you adopt a technique for a stateful system, count how many places you would have to copy data from, and how complicated that gets (§6.5).

### Where this lecture stops #

Each of these was left for later on purpose:

- next session · Lecture 10 Two storage engines, built on our own.

- coming later · a later week Spark and the basics of data engineering, for transformations too big for CDC.

- coming later · a later week CDC used heavily in the next designs: data-engineering architectures and multi-tiered storage. This lecture was a gentle introduction.

- coming later · a later week Hot partitions, solved when the course designs S3.

- coming later · a later week A case where consistent hashing performs very badly and should never be used, and the technique that works best there.

Concepts in this section: CDC · one node · eviction and expiry · protocol and concurrency · routing · consistent hashing

Contents of this lecture ↑

Lecture 09, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.
