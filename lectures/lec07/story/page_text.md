=== PAGE: lecture overview ===

Lecture 9 · running case: two copies of the blog’s data, one complete and one fast

# Build your own Redis

The analysts’ copy of the blog is quietly missing changes, and the cache in front of the database is a box nobody has opened. Make the first copy complete, then build the second yourself, from one hash table on one machine to a ring of nodes.

- Two copies, two budgets

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1The analysts need a copy of production. What could it miss?The company hires analysts, and they need a copy of production that is complete. The blog already sends events through Kafka. Is that enough, and if not, where else could a copy come from?3 sections · §1.1–1.3

- 2The tool stopped and still caught up. How?What the fix from chapter 1 actually reads, how it restarts after it stops, what it can promise, when events are still the right tool, and one company that kept a copy in sync on more than sixty machines.5 sections · §2.1–2.5

- 3Build the box. Where does a value live, and what is it?Part 2 opens the cache in front of the database. On one machine, under two rules: where a key and its value live, and how the cache knows what kind of value it holds.2 sections · §3.1–3.2

- 4How full is the box?Keep writing and memory runs out. What happens then, why a cache can’t let it, and how it can know its own size on every write without slowing down.3 sections · §4.1–4.3

- 5The box is full. Which key goes?When the cache is full, something must go. Where eviction’s bookkeeping lives, what the textbook answer costs in bytes, how to choose by a key’s life, and how expired keys disappear.5 sections · §5.1–5.5

- 6Every API server calls the box. What do they send, and who goes first?What the API servers should send to the cache, counted in bytes, and three ways to stay correct when two of them write the same key at once.5 sections · §6.1–6.5

- 7One box isn’t enough. Who knows where kiwi lives?One machine is no longer enough. Split the keys across several, then decide who tells a client which one holds its key: four answers, and the one Redis picked.4 sections · §7.1–7.4

- 8A fourth box joins. How many keys have to move?Adding a node sounds trivial. Count the keys that have to move, find a scheme that moves far fewer, and add a node without hurting anyone.4 sections · §8.1–8.4

- 9A box dies. Where are its keys?Where the ring goes lopsided, what keeps a dead node’s data alive, and how a restarted node gets its memory back. Then what you can now do, and the question Lecture 10 picks up.5 sections · §9.1–9.5

Every time someone reads a post on the blog, its view count goes up by one. The database knows. Feed the analysts’ copy of the data from the blog’s Kafka events, and it never hears about a single view, because no event ever announces one. Their dashboard would be quietly wrong, with no error anywhere.

Every time someone reads a post, the API server also asks a cache for it first: the shared cache in front of the database. It answers from memory, and so far in this course it has been a box someone else built. How does it know it is full? What does it throw away when it is? What happens when one machine is no longer enough?

Both are copies of the same data, whose source of truth is the database. One must be complete and may run a little behind. The other must be fast, and may forget a key whenever it likes. This lecture builds both, and what each copy is allowed to give up decides its whole design.

### Where you are #

Lecture 1 put one shared cache in front of the blog’s database, noted that RAM costs far more per gigabyte than disk, and promised that the course would build that cache from scratch. Lecture 2 sent each published post into Kafka as an event, and lost a clap when two threads raced on one counter. Lecture 8 leaned on Redis all lecture, for a set per user, keys set only if absent with a TTL, a cluster spread over machines, and ended on the plan you follow here: first a copy for the analysts that must never miss a change, then the cache, built from the inside.

### What you’ll build #

Part 1, a complete copy (chapters 1–2). The analysts need a copy of production they can trust. You try the obvious pipeline, events through Kafka, find four ways it drifts without a single error, and go looking for a source that can’t drift. Then you see how the fix works, when it is the wrong tool, and what it did for one company running more than sixty machines.

Part 2, a fast copy: our Redis (chapters 3–9). The box Lecture 8 asked about, the cache in front of the database, built from a hash table up, under two rules: every byte of RAM counts, and the cache must never crash. On one node (chapters 3–6) each decision is priced in bytes: how a value is stored, how the cache knows it is full, which key it evicts, what clients send it, and what happens when two of them write at once. Then one node is not enough (chapters 7–9), and the price changes to network hops and keys that have to move: who knows where each key lives, what adding a node costs, and what happens when one dies.

### What you’ll be able to do #

- Keep a copy of a database complete without trusting application events, and say when events are still the right tool.

- Store typed values in memory with a few bits of metadata per key, and always know how much memory you hold.

- Choose an eviction policy from how your keys are used, and price a data structure in bytes before you adopt it.

- Pick a wire protocol and a way to handle concurrent writes.

- Route requests to the node that owns a key, add and remove nodes while moving as little data as possible, and survive a node that dies.

### Before you start #

You need hash maps and linked lists, a little C (pointers, malloc, structs), what Kafka does, and what a TCP connection is. Each chapter opens with a small map of the design so far, the newest piece shaded. When a “Pause and think” box asks you something, commit to an answer before you open it. And build the cache yourself as you go: none of its pieces is big.

Lecture 9 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-missing-changes ===

# Build your own Redis, chapter 1: The analysts need a copy of production. What could it miss?

Lecture 9 · Build your own Redis · chapter 1 of 9

§ 1

## The analysts need a copy of production. What could it miss?

About 6 min

In Lecture 2 the blog grew a Kafka pipeline. Publishing a post put one event into a topic, and the search service read it at its own pace. That pipeline is still running. Now the company wants something new from the same data, and the first question is whether those events can carry it.

[figure title] The blog’s copies so far

[figure description] The blog so far: readers call the API server, which writes to the production database. When a post is published the API also publishes an event to Kafka, and a consumer writes it into a copy that search reads.

[figure labels] readers · api · prod db · publish · kafka · consumer · copy · the blog’s copies so far

[caption] Fig 1·aThe blog so far: the API server writes the production database and, when a post goes live, publishes an event that a consumer copies onward.

§ 1.1

## Why not point a dashboard at production?

Until now the blog’s numbers, blogs published, active users, likes in the first hour, have come from a dashboard tool such as Grafana or Metabase firing its queries straight at production.

[figure title] Day zero: the dashboard reads production

[figure description] Day zero of the blogging app. A reader calls the API server, which talks to the production MongoDB; readers never touch the database. Below, a dashboard tool, Metabase, used by two analysts, fires its queries straight at production (the blue arrow). The database holds personal data, ringed in red. A dashed arrow shows the usual first step: point the dashboard at a read replica, which pulls its changes from the primary. There is no warehouse yet.

[figure labels] reader · api · mongodb · pii · replica · analysts · metabase · fires queries · on prod · usual first step: · a replica · no warehouse · yet

[caption] Fig 1·bDay zero. Readers reach the database only through the API; the dashboard fires its queries straight at production, which holds personal data. The dashed path is the usual first step away from that: point the dashboard at a replica.

As a rule of thumb from experience, that works for a young company, up to roughly 10,000 to 50,000 users, especially once the dashboards move to a read replica so heavy queries don’t slow the app. Then the CEO wants detailed reports and hires analysts. Handing them production, even a read-only replica, is risky: it holds everyone’s personal data. And production is MongoDB, chosen because it suited the app, while analysts work in SQL, and so does every warehouse.

So the company decides to build a copy: take the data out of MongoDB and put it into MySQL, the SQL database it knows. The copy has one hard requirement. It need not be real time, but it must be complete, consistent with production eventually. The analysts never see production, so a wrong copy means decisions made on wrong data.

§ 1.2

## Kafka already carries the blog’s events. Is that enough?

You already know Kafka, so the natural design writes itself. Whenever a blog is published, the API server publishes an event, and a consumer reads it and writes it into MySQL.

Pause and think

Kafka never loses a message in this design, and every consumer keeps up. Can the analysts’ copy still end up missing changes?

List what changes the database, not what the API announces. A reader opens a post and its view count goes up by one: no event. A background job that periodically recounts the likes on a post never goes through the API at all. And an API server that saves a row and crashes before it publishes has lost that event for good.

[figure title] Events through Kafka, and where they leak

[figure description] The obvious pipeline. A reader calls the API server, which writes MongoDB and publishes a blog_published event carrying only the blog id to Kafka. Three consumers pull from Kafka and write rows into an analytics MySQL that the insights team queries. Four red marks show where the copy drifts: 1, a views++ counter and a likes aggregation job change MongoDB with no event at all; 2, the event lacks the data, so a consumer has to read the rest back from MongoDB; 3, the API saves the row and crashes before publishing; 4, a new table whose event nobody remembered to add. The API says: every change has an event, right?

[figure labels] every change has an event, right? · api · mongodb · 1 · views++ · no event · likes job · no API call at all · publish · 3 · saved, then crashed · before publish · blog_published{id} · kafka · consumer · consumer · consumer · 2 · event lacks data: · fetch the rest · mysql · insights · 4 · new table? did someone · add its event?

[caption] Fig 1·cThe event pipeline and the four places its copy drifts: ① changes that have no event, ② events too thin to use, ③ a save whose event never leaves, ④ a new table nobody wired up.

The root of ① is what an event is. Events belong to the application: “blog published” carries the context of one use case, and the minor changes, a views++, never get one. The analysts want the opposite, raw data, every row as it is.

② bites even when the event exists. If it carries only the blog’s id, the consumer has to read the rest back from the database, which adds load on the very database you were protecting. Put the whole blog in the event instead and every message gets large.

③ has a name: a dual write. Saving the row and publishing the event are two writes to two systems with no transaction spanning both, so one can succeed without the other. Lecture 8’s photo change did exactly this: write the database, then put an event on Kafka for the worker that purges the CDN. And ④ is slow and certain. Every new table means remembering to add its event, and one day somebody won’t.

None of the four raises an error. The copy just drifts, and nobody notices. Events through Kafka look like the obvious answer, and they are not.

§ 1.3

## What if the copy read the database itself?

Look at where all four changes land: the view count, the likes job, the crashed save, the new table. Every one of them is in the database. So read the changes from there. That is change data capture, or CDC: any change in the data is captured. Instead of trusting events from the API server, a CDC tool relies on the actual source of truth, the database itself.

A CDC tool typically lets you configure three things: a source, a transformation and a sink. It pulls changes out of the source and writes them into the sink in the format you want. A change your application never announced is still captured, and an API server that crashes before publishing loses nothing, because the copy never depended on its event. Every insert, update or delete on a Blogs table becomes one change event, one per changed row.

[figure title] Change data capture

[figure description] Change data capture. The reader, the API server and MongoDB are unchanged. Under MongoDB sits its log, the oplog, which CDC tools read through change streams. A CDC tool, drawn as a stack of instances (Airbyte, Debezium), reads that log (dashed arrow, the tool starts it), applies an optional transform, and writes the rows into MySQL in your format (green). Other sinks are possible: Kafka, SQS, Kinesis, local disk. Inset: in a Blogs table, an insert, an update and a delete each produce one CDC event, one per changed row.

[figure labels] api · mongodb · oplog · cdc · transform · reads · airbyte · debezium · writes, in your format · mysql · or: kafka · sqs · kinesis · disk · Blogs · change · id · insert · 7 · update · 3 · delete · 5 · one event per changed row

[caption] Fig 1·dThe same app with CDC. The tool reads the database’s log (dashed: the tool starts the read), optionally transforms each change, and writes it into MySQL in your format. Inset: three changes to Blogs, three events.

Run both pipelines side by side on four changes:

The API saves a post and crashes before publishing. A worker bumps a like count with no event at all. Which copy ends up complete?

[caption] Clip 1·1The event copy gets one change in four. CDC reads the database’s log and gets all four, even the one made while the tool itself was stopped.

[summary] The clip as text 0:39

- Two ways to copy blog data into analytics.

- A post is published. The event and the log both carry it.

- views++ changes the database. No event exists for it.

- The API saves a post, then crashes before publishing.

- CDC stops. Meanwhile a worker updates likes; the log keeps it.

- CDC restarts and catches up.

- Read the source of truth, not the API's events.

Two pipelines copy the same blog database (MongoDB) into an analytics MySQL. Top: the API publishes events to Kafka and a consumer writes them to MySQL. Bottom: a CDC tool reads the database’s own log and writes MySQL. Four changes happen. A post is published: both copies get it. A views++ changes the database but no event exists for it, so only CDC copies it. The API saves a second post and crashes before publishing its event: the log has the row and CDC copies it; the event copy misses it. Then the CDC tool is stopped while a background job updates the likes count directly in the database, with no API call: the log keeps the change, and when CDC restarts it catches up and copies it. The event copy ends with 1 of 4 changes, the CDC copy with 4 of 4: read the source of truth, not the API’s events.

CDC is a good way to build replication between databases, with a light transformation in between. Two open-source tools are worth knowing: Debezium, built for exactly this, and Airbyte, a general data-movement tool with a CDC mode, which the lecture found the easier of the two to set up. Install one and watch what a change looks like when it arrives.

The clip glossed over two things. “Reads the database” has to mean something concrete. And the tool was stopped for a while, yet still caught up. How?

Lecture 9, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-sixty-machines ===

# Build your own Redis, chapter 2: The tool stopped and still caught up. How?

Lecture 9 · Build your own Redis · chapter 2 of 9

§ 2

## The tool stopped and still caught up. How?

About 7 min

Chapter 1 left two questions. What does a CDC tool actually read when it “reads the database”? And how did it catch up after being stopped? The answers are a log and a bookmark in it, and together they decide what CDC can promise, and what it can’t.

[figure title] The blog’s copies so far

[figure description] The blog so far: readers, the API server and the production database; the API still publishes events to Kafka for a consumer. Marked new: a CDC tool that reads the database’s own log and writes every change into the copy.

[figure labels] new · readers · api · prod db · publish · kafka · consumer · copy · log · cdc · reads the log · the blog’s copies so far

[caption] Fig 2·aThe blog so far. Marked new: a CDC tool that reads the database’s own log and writes every change into the copy.

§ 2.1

## What does “read the database” actually mean?

There are two ways to read a database’s changes. The first is to iterate its tables, row by row, again and again. That works, but only up to a point. A table needs a column such as last_updated to tell what changed since the last pass, a row deleted between two passes is simply gone, and two updates between passes look like one.

The second is the log. Every commit a database makes is also recorded in a log of changes: PostgreSQL’s write-ahead log, or MySQL’s binary log, the binlog, a replication log kept apart from InnoDB’s own redo log. The CDC tool reads that log and pushes the changes onwards.

[figure title] Two ways to read the source

[figure description] Two ways a CDC tool reads the source. Left, scan the rows: the tool iterates a table from top to bottom; a row deleted between two scans is never seen, so the delete is missed. Right, tail the log: the database appends every commit to its log (c1 to c6); the tool reads the log and remembers its checkpoint, here after c4. c5 and c6 belong to one transaction, written to the log together at commit. Which way you get depends on what the database exposes.

[figure labels] iterate rows, top to bottom · id · title · 1 · day zero · 2 · cdc · 3 · kafka · 4 · spark · 5 · redis · a delete between scans · is missed · scan the rows · log · cdc · reads · c1 · c2 · c3 · c4 · c5 · c6 · checkpoint · one transaction, · written at commit · tail the log · which one you get depends on what the database exposes

[caption] Fig 2·bLeft: scanning rows sees only what is still there, so a row deleted between scans never reaches the copy. Right: tailing the log sees every commit in order and remembers how far it got; c5 and c6 are one transaction, written together at commit.

Which one you get depends on what the database exposes. MySQL has its binlog, PostgreSQL has logical decoding, and MongoDB exposes its oplog through change streams, which need a replica set. A store with no change log, such as Elasticsearch, can only be scanned again. For you it hardly matters: you configure a source, a sink and a transformation, and the data flows.

One detail at the start. A log doesn’t hold the database’s whole history, so a CDC tool begins with a snapshot, a full read of each table, and then streams changes from the log position it noted at that moment.

§ 2.2

## The tool stops for a while. Where does it pick up?

At heart, a CDC tool keeps track of three things: what it is reading, where it is writing, and how far it has got, its checkpoint. Stop the tool, or lose the source database for a while, and nothing is captured in the meantime. When both are back, the tool resumes from its checkpoint and reads everything the log gathered while it was away. It only works while the log still holds those changes, so a tool that stays down long enough to fall off the end of the log has to take a fresh snapshot.

Pause and think

The CDC tool copies a change into MySQL, then crashes before it saves its new checkpoint. When it restarts, what does MySQL see?

The checkpoint still points before that change, so the tool reads it again and writes it again. A checkpoint prevents loss, not duplicates: consumers see every change at least once. So make the sink apply a change idempotently, for example as an upsert by primary key, and a repeat does no harm.

The checkpoint is what makes CDC lossless, and it reads the log in order. A transaction may run ten statements, but they reach the log together when it commits, and transactions land in the log in the order they commit, so CDC reads them in that order. What arrives at the sink is a little weaker: one event per changed row, not one per transaction. Debezium, for example, keeps order per table, not across tables, unless you ask it for transaction markers.

Where should the tool read from? The plainest way is through the database’s own client. It beats parsing raw log files, because if the log’s format changes, the client still decodes it and your plugin needs no update. It is a sequential read, so it puts little load on the database. You can take even that off the primary: spin up a replica and point the tool at it, where the database allows it. A MySQL replica must write its own binlog (log_replica_updates, on by default), and PostgreSQL allows logical decoding on a standby only from version 16. One replica is enough, since every replica holds the same data.

§ 2.3

## Should every Kafka event become CDC?

One company answered that question with more than sixty machines: its API pushed every update to Kafka, and consumers wrote each one into another database. Hold that number for 2.4. Many designs in this course had the API push to Kafka, and many could use CDC instead; neither is better in general. The line between them is this. When you are moving raw data, use CDC. When you need application context, the fact that this happened on the API server, have the API publish an event. The two even combine: the API writes its event as a row in an “outbox” table in the same transaction as the business data, and CDC carries that row to Kafka. You get the context without the dual write.

Raw data has more than one destination. Take a transactional store in MySQL, as in the figure: CDC keeps it in sync with Elasticsearch for search, copies it into a warehouse such as Redshift for the analysts, and from there into S3 as a backup. One CDC can often feed several sinks (Debezium writes once to Kafka topics that many sink connectors read; an Airbyte connection, by contrast, links one source to one destination), though a transformation per sink makes it hungrier for memory.

[figure title] One source, many tiers

[figure description] One source, many tiers. Four columns: transactional (MySQL), search (Elasticsearch), analytics (Redshift) and backup (S3). One CDC reads MySQL and writes Elasticsearch; a second CDC reads MySQL and writes Redshift; a third reads Redshift and writes S3. Dashed arrows are the reads, started by the CDC tool; green arrows are the writes. With some tools the first two could share one read of the source, at the cost of a transform per sink and more memory. Tiered storage is only introduced here.

[figure labels] transactional · mysql · search · elasticsearch · analytics · redshift · backup · s3 · cdc · reads · writes · cdc · cdc · could be one cdc with two sinks: · one transform per sink, more memory · tiered storage: introduced here, built in a later week

[caption] Fig 2·cOne source, many tiers: CDC keeps search and the warehouse in sync with MySQL, and copies the warehouse to S3 for backup.

Raw data has one more advantage: CDC can fetch and write rows in bulk, while one event per published blog, consumed one at a time, moves the same data far more slowly.

§ 2.4

## Sixty machines, one simple transformation

Back to the sixty machines. This is a consulting case, as the engineer who advised them tells it. Their API servers pushed every single update to Kafka. A fleet of consumers read each event, applied a very simple transformation, and wrote it to the other database: one read and one write at a time. They could have batched, and didn’t, “because that’s how they thought systems are built”. Keeping up took more than sixty consumers, sixty machines with 32 GB each.

[figure title] Sixty machines down to two

[figure description] Before: the API pushes every update to Kafka; a grid of consumer machines (more than sixty, 32 GB each) reads one event at a time and writes one row at a time into the target database; some changes are silently lost, so the two databases drift out of sync. After: two EC2 instances running an Airbyte CDC read the source database’s log and write batches into the target.

[figure labels] one event, one read, one write · api · kafka · ×60, · 32 GB · each · silently · out of sync · target · before · source · airbyte cdc · ec2 · ec2 · target · batched · after

[caption] Fig 2·dBefore: every update one Kafka event, one read and one write, on more than sixty machines, and silently out of sync. After: a CDC tool on two machines, writing in batches.

The transformation was simple, and both databases had Airbyte plugins. So the advice was to configure a simple CDC in Airbyte, put the transformation there, and write straight into the other database. Sixty machines and a Kafka became two ordinary EC2 instances, and that subsystem’s infrastructure cost fell by about 80%. Nothing got slower: by that account, replication lag dropped to a bare minimum, because these tools fetch in parallel and are heavily optimised for small transformations.

The bigger finding was the data. The old pipeline had been losing changes all along. The two databases were out of sync, nobody knew, and when it was pointed out the plan was a cron job to resync them now and then. With CDC they stopped losing data.

Would batching the events alone have fixed it? It would have been less bad. But one event at a time was the simplest thing to write, and as the company scaled nobody went back to it. Every company has a service nobody touches.

§ 2.5

## What CDC won’t do, and the copy it can’t make

CDC is asynchronous, so it is eventually consistent: it never promises that the copy matches the source at this instant. Where you need strong consistency, you need synchronous processing, and CDC can’t give you that. Nor is it a transformation engine. Joins across many tables, aggregations, multi-step jobs: that is what Apache Spark is for. CDC is for the simple case: take what was written, extract it, put it somewhere, with a light transformation.

So the blog now has copies it can trust: search, the warehouse, a backup, each complete and a little behind production. None of them is what your API servers read on every request. That copy is the shared cache from Lecture 1, the box in front of the database, and it has the opposite job. It doesn’t need every row, only the hot ones. It isn’t there to be complete; it is there to be fast, answering from memory. And it may drop a key whenever it likes, because the database still has it: a lost key costs one miss, not data.

Every read on the blog goes to that box first, and you can’t yet answer three questions about it: how it knows it is full, what it throws away, and what happens when one machine isn’t enough. Lecture 1 promised the course would build it. Build it, and find out.

Lecture 9, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-one-box ===

# Build your own Redis, chapter 3: Build the box. Where does a value live, and what is it?

Lecture 9 · Build your own Redis · chapter 3 of 9

§ 3

## Build the box. Where does a value live, and what is it?

About 6 min

Part 2 builds the box in front of the database: a cache like Redis, written from scratch. Call it our Redis. The brief fits on one line. It answers four commands, GET, PUT, DELETE and TTL, with high throughput and low latency, and it is distributed.

[figure title] The blog’s copies so far

[figure description] The blog so far: the API server and the production database, and a CDC tool that reads the database’s log, remembers a checkpoint in it, and keeps three copies in sync: search, a warehouse and a backup. Marked new: the checkpoint and the three sinks, and, beside the API, the shared cache it reads on every request, the box Part 2 opens.

[figure labels] new · new · new · readers · api · prod db · publish · kafka · consumer · log · cdc · reads the log · checkpoint · search · warehouse · backup · app events · cache ? · the blog’s copies so far

[caption] Fig 3·aPart 1, finished: a CDC tool reads the database’s log from its checkpoint and keeps search, the warehouse and a backup in sync. Marked new, beside the API: the shared cache it reads on every request, the box this part opens.

Two rules come with the brief, and nearly every decision in this part answers to one of them. First, RAM is expensive. Lecture 1 priced it: far more per gigabyte than disk. Every byte the cache spends on its own bookkeeping is a byte of user data it can’t hold. Second, the cache must keep running no matter what. It must never crash, however much people write into it.

“Distributed” waits. First build one node and get its details right: how it stores data, how it knows it is full, what it evicts, how clients talk to it, what happens when two of them write at once, and how keys expire. Spreading it over many machines comes after, in chapter 7. At each step you will also see what Redis chose, and why. The patterns travel: once you have seen one, you can copy it into almost any other system.

§ 3.1

## Where do a key and its value live?

One natural design keeps the keys in an array in memory, each holding a pointer to where its value is stored. Put simply, that is a hash table: a hash map from keys to values.

[figure title] Storage is a hash table

[figure description] One node's storage: a hash table whose slots hold the keys k1, k2 and k3. Each slot holds a pointer to where its value lives in memory.

[figure labels] k1 · k2 · k3 · a pointer per key · value · value · value · storage = a hash table

[caption] Fig 3·bOne node’s storage: each slot of a hash table holds a key and a pointer to its value.

It is tempting to go one level down and design the table itself: open addressing or chaining, a fixed size. Don’t. Hash maps exist and have solved that problem; use one. Three of the four commands are then one line each:

GET k → look k up in the hash table, return its value PUT k, v → add k → v to the hash table DEL k → delete k from the hash table

TTL needs more machinery, and gets it in chapter 5.

§ 3.2

## A value can be a set or a Bloom filter. How does the cache tell?

Lecture 8 kept a set per user in Redis and asked for its size in O(1). So a value can’t just be bytes: it can be a string, a set, a list, a Bloom filter, a HyperLogLog. How do you represent it? The way Java does: a value is an object on the heap, and the table holds a pointer to it (a small primitive could sit in place of the pointer).

That raises a second problem. Commands depend on the type: add works on a set, push on a list. Before running a command, the cache has to check that the value is of the right type.

Pause and think

A value can be a string, a set, a list or a Bloom filter, and add only works on a set. Where do you record each value’s type, and how much space should it take?

Put the type in the key, say set:myset, and every lookup has to parse it. Keep the key plain, and put the type next to the value, in a small wrapper of its own. As for size: there will only ever be a handful of types, five to ten, so 4 bits, which hold 16, are plenty.

The wrapper needs two fields: a pointer that can lead to anything (a void * in C, an Object in Java), and the type code.

// key → MyValue struct MyValue { void *value; // points at anything unsigned type : 4; // 0 string, 1 int, // 2 set, 3 list … };

Running a typed command, say add on the key myset, now takes four steps: get the value, read its type, check that the type supports the operation, and if it does, cast the object to that type and run the operation.

[figure title] The struct that grows, stage 1

[figure description] The key stays a plain key in the hash table. Its slot points at a small wrapper, MyValue, with two fields: a void pointer to the actual value, which can be a string, a set, a list or a Bloom filter, and a type field. The type needs only 4 bits of a 32-bit word: 4 bits give 16 types, and the codes are 0 string, 1 int, 2 set, 3 list.

[figure labels] k1 · k2 · k3 · the key stays · a plain key · MyValue { · void *value; · unsigned type : 4; · } · string · set · list · bloom · points at anything · type · 4 bits = 16 types · 0 string · 1 int · 2 set · 3 list · stage 1: key → MyValue

[caption] Fig 3·cThe key stays a plain key. Its slot points at a small wrapper, MyValue, whose pointer can lead to anything, and whose type takes 4 bits of a 32-bit word.

Redis caps the number of types and uses exactly four bits. That looks like penny-pinching until you remember the multiplier: the cache holds millions of keys, and every bit in the wrapper is paid once per key. The other 28 bits of that word aren’t wasted either; chapter 5 fills them.

The rule for this whole part

In memory, be careful with every byte and every bit.

RAM is expensive. Get the most out of every byte you spend, and when you can’t, cut it to the bare minimum you can work with.

There is a second reason the type lives in a wrapper and not squeezed in beside the key. A wrapper per value has room to grow. Redis keeps more metadata next to the type, in a C struct, and new fields arrive when new features need them. You will need that room soon.

On a 64-bit machine the wrapper is 16 bytes, the pointer plus a word whose spare bits the next fields will use. What it points to may be a large set, or a Bloom filter of a megabyte, and the cache has to hold millions of them in one machine’s RAM. Keep writing, and memory runs out. What happens then?

Lecture 9, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-how-full ===

# Build your own Redis, chapter 4: How full is the box?

Lecture 9 · Build your own Redis · chapter 4 of 9

§ 4

## How full is the box?

About 7 min

Every write puts more into the cache’s memory, and so far nothing takes anything out. This chapter finds out what happens when memory runs out, why that must never happen to a cache, and how the cache can know where it stands, cheaply, on every single write.

[figure title] Our Redis so far

[figure description] Our Redis so far, one node: a hash table whose keys point at a small wrapper, MyValue, holding a pointer to the value and a 4-bit type. Marked new: the MyValue wrapper.

[figure labels] new · hash table · MyValue { · void *value; · type : 4; · } · one node

[caption] Fig 4·aOur Redis so far, one node: a hash table whose keys point at MyValue wrappers. Marked new: the wrapper, with a value pointer and a 4-bit type.

§ 4.1

## What happens when the heap runs out?

Every wrapper and every value lives on the heap: malloc in C, new in Java, whatever your language uses. So what happens when the heap is exhausted?

“The eviction policy runs” is the tempting answer. But eviction is the cache’s own policy, and it runs only if the cache was written to run it. The question is about the program underneath. Make it concrete: a loop mallocs 1 MB on every pass, forever, on a machine with 1 GB of RAM. After 1,024 passes everything is used. What happens on pass 1,025?

malloc returns NULL, and a careful program checks and refuses the write; or, on Linux, the kernel’s OOM killer ends the process outright.

So at the limit, either a write fails or the process dies. For a cache, the second is the disaster. It must keep running no matter what, so it must never reach that point. It has to cap its own memory, and that raises a first question: how does it know how much memory it is using?

§ 4.2

## Can’t you just ask the operating system?

A command that reports a process’s memory certainly exists. The kernel is what knows the number, though, so every check is a system call, a trip into the kernel. The cache would need the answer on every write, and paying a system call each time would slow it right down.

So the cache keeps its own count. Multiplying the number of keys by a size per key won’t do, because values differ wildly in size. A running counter is better: size += n every time something is added. But add how much?

Pause and think

Each new key allocates one MyValue wrapper, and sizeof(MyValue) is 16 bytes. One key’s value is a 1 MB Bloom filter. Does adding sizeof(MyValue) per key keep the counter right?

sizeof measures the wrapper: the pointer and the type, 16 bytes. The Bloom filter it points to is a separate block of memory, a megabyte the counter never sees. With enough such keys, the count is off by gigabytes.

§ 4.3

## Every byte comes from somewhere. Where?

So where does every byte come from? C makes it visible, but the same holds in any language. malloc takes the number of bytes you want and returns an address you can use. It hands out memory from the process’s heap and asks the operating system for more only when its own free memory runs low. free gives a block back, marking it reusable. Adding a key means a malloc for its wrapper. And that Bloom filter didn’t appear from nowhere either. Storing it took a malloc call of its own.

Everything the cache stores, wrappers, Bloom filters, sets, lists, the nodes of a linked list, is allocated by the same malloc and released by the same free. So count there: size += b on every malloc, size -= b on every free. The total then includes the values themselves, not just their wrappers. To make sure that line runs on every allocation, write your own wrapper around malloc, and one around free.

That wrapper is exactly what Redis has. It is called zmalloc, it has the same signature as malloc, and in the Redis code base you never see malloc, only zmalloc.

size_t total_size = 0; // bytes held, all of them void *zmalloc(size_t b) { size_t *p = malloc(sizeof(size_t) + b); // room to note the size if (p == NULL) return NULL; // caller refuses the write *p = b; total_size += b; return p + 1; } void zfree(void *o) { if (o == NULL) return; size_t *p = (size_t *)o - 1; // the size noted at malloc total_size -= *p; free(p); }

free needs to know how many bytes to subtract, and a pointer alone doesn’t say, so this zmalloc notes each block’s size in a small header in front of it. (Real allocators can often report a block’s size themselves; Redis uses that when it can.)

[figure title] sizeof sees the wrapper, not the data

[figure description] The MyValue wrapper is 16 bytes: sizeof covers only its pointer and its type. The pointer leads to a Bloom filter of 1 MB, allocated separately. Adding sizeof(MyValue) per key misses that megabyte; adding b inside every malloc counts everything the cache holds.

[figure labels] what you actually use · MyValue { · void *value; · int type; · } · sizeof = 16 B · bloom filter, 1 MB · size += sizeof(MyValue) · misses the 1 MB · size += b in every malloc · counts it all

[caption] Fig 4·bsizeof sees the 16-byte wrapper; the Bloom filter it points to was allocated on its own. A counter inside the allocator catches both, because both allocations go through it.

Now total_size always says how much memory the cache holds, with no system call. Redis does still ask the OS now and then, which is fine for an occasional check; the counter is what it relies on. And notice why the wrapper matters. The naive way puts a count update next to every malloc call. With malloc at, say, 50,000 places in a code base, forget one and the count is wrong for good. The wrapper does it in one place.

The cap is a number you choose when you start the cache: say 1 GB, even if the machine has 32 GB. In Redis it is the maxmemory setting; left at 0, the default on 64-bit machines, there is no limit at all. Enforcing it takes one check before allocating. If total_size + b would pass the cap, refuse the write with an error, or make room first: drop a key, then allocate.

// our design: the cap inside the wrapper void *zmalloc(size_t b) { while (total_size + b > maxmemory) if (!evict_a_key()) return NULL; // nothing left: refuse ... // then as above }

That is a fine design. Redis splits the same two jobs differently: its zmalloc only counts, and the maxmemory check runs once per command, before the command executes. Under an eviction policy it evicts keys until usage is back under the cap; under the default, noeviction, it refuses the write with an error, the other branch of our design. Because the check runs once per command, not inside every allocation, a single command can push memory briefly past the cap: maxmemory is a soft limit.

[figure title] zmalloc and the cap

[figure description] zmalloc wraps malloc: in our design it first evicts keys (chapter 5) for as long as total_size plus b would pass maxmemory; then it mallocs b bytes, adds b to the global total_size and returns the object. Beside the code, a gauge of total_size sits just under its 1 GB cap, on a machine with 32 GB of RAM.

[figure labels] zmalloc(b) { · while total_size + b · > maxmemory · → evict · // our design · o = malloc(b) · total_size += b · return o · } · ch. 5 · machine: 32 GB · maxmemory 1 GB · total_size

[caption] Fig 4·czmalloc with the cap check inside, beside a gauge of total_size just under its 1 GB cap, on a 32 GB machine.

Nothing here is fancy: a counter, a wrapper, one comparison. Yet it tells you exactly when the cache is full and exactly where eviction plugs in. Big systems are built on simple solutions like this one.

[summary] Go deeper: what really happens at the limit skip unless you write C

Linux overcommits memory by default: malloc can succeed with no physical memory behind it, because pages are only allocated when first touched. So the OOM killer strikes later, with SIGKILL, which no handler can catch. A ulimit instead makes malloc fail with ENOMEM, and SIGABRT comes only from the program calling abort(). A segfault comes only from using an unchecked NULL.

So the cache knows the moment it is full. Something has to go. Which key?

Lecture 9, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-which-key-goes ===

# Build your own Redis, chapter 5: The box is full. Which key goes?

Lecture 9 · Build your own Redis · chapter 5 of 9

§ 5

## The box is full. Which key goes?

About 9 min

A write arrives and the check from chapter 4 fails: total_size + b would pass maxmemory. Before the new value can go in, some key has to leave. Two questions follow, and both answer to the byte budget. Which key do you evict? And the keys whose TTL has run out, who removes those?

[figure title] Our Redis so far

[figure description] Our Redis so far, one node: a hash table of keys pointing at MyValue wrappers (value pointer, 4-bit type). Marked new: every allocation goes through zmalloc, which keeps total_size, capped at maxmemory.

[figure labels] new · hash table · MyValue { · void *value; · type : 4; · } · zmalloc: total_size · maxmemory · one node

[caption] Fig 5·aOur Redis so far, one node: a hash table of keys pointing at MyValue wrappers. Marked new: every allocation goes through zmalloc, which keeps total_size under maxmemory.

§ 5.1

## Where does a key’s “last used” live?

The two policies everyone names are LRU and LFU. LRU, least recently used, remembers when each key was last accessed and evicts the one used longest ago. LFU, least frequently used, counts how often each key is used and evicts the one used least.

Either way, every key needs a little information, and before deciding how to implement either policy, decide where that information lives. The reflex is a separate structure, a priority queue ordered by last use, say. But there is already a place for per-key information: the wrapper around the value. Next to the type, keep a few bits for eviction.

[figure title] The struct that grows, stage 2

[figure description] The per-key wrapper MyValue holds a value pointer and a 4-bit type, and now also a 24-bit lru field. Under LRU the field holds the time of the last access; under LFU a small access counter; either way it is updated on every access. Underneath, Redis packs 4 type bits, 4 encoding bits and the 24-bit LRU/LFU field into one 32-bit word of each object header.

[figure labels] MyValue { · void *value; · unsigned type : 4; · lru : 24; · } · LRU: a timestamp · LFU: a counter · updated on every access · redis: 4 type + 4 encoding + 24 lru · 4 · 4 · lru 24 · one 32-bit word of metadata per key

[caption] Fig 5·bThe wrapper gains one field for eviction, updated on every access. In Redis it is 24 bits, sharing one 32-bit word with the 4-bit type and a 4-bit encoding.

How many bits? Redis packs a 4-bit type, a 4-bit encoding and a 24-bit eviction field into one 32-bit word of every object’s header: one integer of metadata per key. Every access updates the field. Under LRU it holds the time of the last access; under LFU, a count of accesses (in Redis, 8 of the 24 bits hold a small counter that grows logarithmically and decays over time, the other 16 when it last decayed). Most databases keep compact metadata like this inside a per-key object they already have.

§ 5.2

## The interview answer for LRU. What does it cost here?

Knowing when each key was used is half the job. To evict, you need the oldest one. The textbook way is a hash map plus a doubly linked list. Each node holds an entry, the map stores each key’s node, and every access unlinks that key’s node and moves it to the head, all in O(1). The tail is always the least recently used key.

Pause and think

The textbook LRU keeps one list node per key, with a next, a previous and a value pointer. Your keys look like a → 2. Is that bookkeeping worth it in a cache?

Three pointers per key is 12 bytes with 4-byte pointers, 24 on a 64-bit machine. The key a is 1 byte and the value 2 a 4-byte integer: 5 bytes of data carrying 12 to 24 bytes of bookkeeping whose only job is tracking recency, on top of the 16-byte wrapper you already pay.

[figure title] The textbook LRU and its bill

[figure description] A hash map points at the nodes of a doubly linked list. When a key is accessed its node is unlinked and moved to the head in O(1), so the tail is the least recently used key. Each node carries a next, a prev and a value pointer: 4 + 4 + 4 = 12 bytes per key with 4-byte pointers, 24 bytes with 8-byte pointers. For key a (1 byte) and value 2 (4 bytes), 5 bytes of data carry 12 bytes of bookkeeping: more overhead than data.

[figure labels] a · b · c · map · map → node · head · accessed → move to head · the answer everyone gives · tail: next to evict · node { · next*   4 B · prev*   4 B · value*  4 B · } · 12 B · 24 B with 8-byte pointers · a : 2 · 1 B · 4 B · 5 B · overhead > data

[caption] Fig 5·cThe textbook LRU and its bill. The map finds a key’s node in O(1); an accessed node moves to the head, so the tail is next to go. Each node is three pointers, for a key and value that together take 5 bytes.

Lists are fine where memory is not the constraint. In a cache, every pointer is room another key could have used. Redis keeps no such list; it would rather spend memory on your data than on its own bookkeeping. Other caches judge it differently: Memcached does keep doubly linked LRU lists, and pays for them. LFU has the same bargain in a sharper form. An LFU that runs in O(1) time exists, and its memory use is very high: buy time, pay space.

§ 5.3

## What if you kept nothing at all?

There is a third policy, and it is the most memory-efficient of all: pick a key at random and evict it. No timestamps, no counts, no list.

The risk is plain. You may evict a key that should have stayed. If it was a popular key, the next read misses, fetches it from the database and puts it back: one miss. And look at the odds. With millions of keys, how likely is it that the one you need most is the one picked, every time? In return, a design that evicts at random needs no per-key bookkeeping at all, so the same memory holds more keys, and eviction is as fast as it can be: not optimal, but fast.

One engineer made exactly this change eight months into his career. He switched a production cache’s eviction to random, and the cache took in a much larger number of keys with only a very small rise in its miss ratio. The two balanced out in its favour.

That is the trade in its purest form: give up being exactly right about which key goes, and you save the space and the work of tracking recency.

You don’t have to choose between a list and luck, though. Redis supports LRU, LFU and random, and it runs LRU and LFU on just those 24 bits by sampling. When it must evict, it looks at a handful of keys, five by default, and evicts the one idle longest (or, under LFU, the one with the lowest count). With ten samples, the result is very close to true LRU. In Redis the 24 bits sit in every key’s header whatever the policy, so there random saves work, not memory; the memory saving belongs to a design that keeps no recency data at all.

§ 5.4

## A nightly scan reads every article once. What survives?

So when would you pick LRU, and when LFU? Here is a concrete test.

A cache holds evergreen pages that are read all day. A nightly report then reads six other articles once each. Which cache still holds the evergreen pages in the morning?

[caption] Clip 5·1To LRU, one read makes a page the newest, so the scan flushes the evergreen pages out. To LFU, one read is a count of one, so they stay.

[summary] The clip as text 0:35

- Two caches, same size, same reads.

- Evergreen pages A⁠–⁠D are read all day.

- A nightly scan reads six articles, once each.

- Morning: readers want the evergreen pages back.

- When past popularity predicts the future, frequency wins.

Two caches of six slots receive the same reads. The left one evicts by recency (LRU): it keeps its pages in order, newest first, and drops the oldest. The right one evicts by frequency (LFU): it counts how often each page is read and drops the page with the lowest count. All day, four evergreen pages A, B, C and D are read again and again, so both caches hold them and the LFU counts climb to 3, 3, 2 and 2. Then a nightly scan reads six articles once each. In LRU every scanned article becomes the newest page, so the scan pushes C, D, A and B out of the cache. In LFU the scanned articles have a count of 1, so they only push each other out and A to D stay. In the morning readers ask for A, B, C and D again: LRU misses all four and has to fetch them back, while LFU hits all four. When past popularity predicts the future, frequency wins.

Scans, a report reading through a whole database say, are where LFU earns its keep.

So use LFU when a key that was popular in the past is likely to be popular again, even if its traffic has just dipped. Wikipedia is the example: during a football World Cup everyone opens the World Cup pages, but that spike shouldn’t push out the top pages that have been read far more over time. When the fad passes, they are read as much as ever. It is how you hold a stock you trust: it did well for years and dipped this week, and you keep it instead of selling on recent performance. LFU treats a key the same way and ignores recency. LFU pays off when popularity is lopsided like this, a few keys used by everyone.

LRU fits the opposite life: a key read very hard at first, then hardly at all. Google News is the textbook case: you rarely read week-old news, so the most recent items are the ones most likely to be read again.

In most production systems you would not even see a difference between the two; in some extreme cases it is large. So before you configure either, understand your application: how a key is accessed, and how its life runs in your system. Then decide.

§ 5.5

## A key’s TTL runs out. Who deletes it?

Expiry answers to the same budget: it must not cost a structure per key. Lecture 3 moved its key-value store into memory and watched how Redis expires keys; the same machinery fits here.

Store the minimum: the key’s absolute expiry time, one more number per key, here in the wrapper. The obvious way to clean up is a priority queue of keys ordered by expiry, freed from the head. It is simple and consistent, and it is one more structure with pointers for every key, so it is out.

[figure title] Expiry: the queue we don’t build

[figure description] Left, rejected: a priority queue holding every key with a TTL, ordered by absolute expiry time (k2:100, k7:101, k9:105, k3:110), freed at the head. It is simple and consistent, but it is an extra data structure with pointers for every key. Right, what we do: store the absolute expiry time as one more field, expires_at, in the per-key MyValue wrapper next to the type and the LRU bits. One number per key, plus a plain index of the keys that have a TTL, so a cleanup job can find them.

[figure labels] priority queue · pointers per key · k2:100 , k7:101 , k9:105 , k3:110 · absolute expiry · ordered by expiry → · free happens at the head · rejected · MyValue { · void *value; · unsigned type : 4; · lru : 24; · expires_at; · } · one number + a TTL-key index · what we do

[caption] Fig 5·dExpiry: the queue we don’t build, and the one number per key we keep instead.

Deletion happens two ways. When a key is read and its expiry time has passed, it is deleted right there, with zfree, which also takes its bytes off total_size. In memory that is one cheap call, and it catches every expired key that somebody reads again. For the keys nobody reads again, a periodic job samples keys that have a TTL, 20 at a time, frees the expired ones, and goes again while more than about 10% of a batch was expired. Some memory leaks for a while, never for good: a later read or a later sample gets every expired key in the end.

To sample only keys that have a TTL, the job must be able to find them, so keep one more thing: a second hash table of just those keys. Redis does exactly this. Since Redis 8.2 it keeps each expiry time in the key’s own object, as our wrapper does, and the table only lists the keys that have one (earlier versions kept the times in the table itself). A plain table has no order to maintain, so it is far cheaper than a priority queue, though the Redis docs note that setting an expiry still costs memory.

The node now stores anything, knows how full it is, and makes room on its own. Nobody has said yet how other machines talk to it, or what happens when two write the same key at once.

Lecture 9, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-talk-and-take-turns ===

# Build your own Redis, chapter 6: Every API server calls the box. What do they send, and who goes first?

Lecture 9 · Build your own Redis · chapter 6 of 9

§ 6

## Every API server calls the box. What do they send, and who goes first?

About 8 min

Inside, the box is done: it stores typed values, counts its bytes, evicts and expires on its own. Two questions remain before the blog’s API servers can use it. What do they speak to it? And what happens when two of them change the same key at the same instant?

[figure title] Our Redis so far

[figure description] Our Redis so far, one node: a hash table of keys pointing at MyValue wrappers, zmalloc keeping total_size under maxmemory. Marked new: two more fields in MyValue, 24 LRU bits and an absolute expires_at, and two rules: evict by LRU, LFU or random when full; expire lazily plus by sampling.

[figure labels] new · new · hash table · MyValue { · void *value; · type : 4; · lru : 24; · expires_at; · } · zmalloc: total_size · maxmemory · evict: lru·lfu·random · ttl: lazy + sample · one node

[caption] Fig 6·aOur Redis so far, one node. Marked new: two more fields in the wrapper, 24 eviction bits and an absolute expiry time, and the rules that use them.

§ 6.1

## Which protocol should the cache speak?

The candidates come quickly: HTTP, WebSockets, gRPC, or a protocol of your own. HTTP is often charged with a big payload, but the value has to cross the network whatever you choose, so that is not what separates them.

Look underneath instead. HTTP, gRPC and a custom protocol all run over a TCP connection. There is nothing fancy about any of them; they differ only in how the bytes are wrapped. And TCP rather than UDP, because the cache needs delivery it can count on, with acknowledgments. UDP is fire and forget, and a cache is, in its way, a database: it shouldn’t lose your writes.

Nor does HTTP cost a connection per call. HTTP/1.1 keeps its TCP connection open by default, so one connection carries request after request. What every request does carry is text. Here is how plain it is.

Open a raw TCP connection to a web server with netcat and type an HTTP request by hand, and it answers; type nonsense and you get 400 Bad Request, because the server reads whatever arrives as HTTP. One engineer used exactly this to let IoT sensors that could only send raw bytes talk to a Flask server.

$ nc localhost 3000 GET /hello HTTP/1.1 Host: localhost ← an empty line ends the request HTTP/1.1 200 OK … hello world

A connection carries any bytes at all; a web server simply understands bytes in the HTTP format, a request line and header lines, all plain text. A strict server also insists on that Host line.

§ 6.2

## How many bytes does it take to store a = 1?

Now read that text through the cache’s eyes. To store just the key a with the value 1, you send a request line and a set of headers, and the cache parses every byte of them on every call. The more you send, the more it has to process.

Pause and think

Storing a = 1 as an HTTP request, with a request line and three short headers, takes about 117 bytes. Redis’s own protocol says the same thing too. Roughly how many bytes does it need?

27 bytes. The cache needs three things, SET, a and 1, and the length of each, so that it can read them without guessing where one ends.

[figure title] Bytes on the wire for set a 1

[figure description] The same command, store key a with value 1, written two ways over the same TCP connection. As an HTTP/1.1 request it is a request line, Host, Content-Type and Content-Length headers, a blank line and the body key=a&v=1: 117 bytes of text for a few bytes of data. In RESP, Redis’s own protocol, it is an array of three length-prefixed strings, SET, a and 1: 27 bytes. Same TCP, same value; different envelope.

[figure labels] POST /set HTTP/1.1\r\n · Host: cache:8080\r\n · Content-Type: application/x-www-form-urlencoded\r\n · Content-Length: 9\r\n · \r\n · key=a&v=1 · 117 bytes · HTTP/1.1 · *3\r\n · $3\r\n · SET\r\n · $1\r\n · a\r\n · $1\r\n · 1\r\n · 27 bytes · *3: 3 parts · $1: 1 byte · RESP · same TCP, same value; different envelope

[caption] Fig 6·bBytes on the wire for set a 1. The HTTP request is an example built for this page: a request line and three headers carry a 9-byte body. In RESP, *3 says three parts follow, and each $n says how many bytes the next part has.

That is RESP, the protocol Redis defined for itself. Just as any server that claims to speak HTTP follows the HTTP specification, every Redis client speaks RESP. Because each part is length-prefixed, it is safe for any bytes and quick to parse. Memcached also has a protocol of its own that all its clients use. Underneath, a custom protocol is still raw TCP: whatever bytes arrive, your handler interprets them, by your own rules. That control is why Redis wanted its own format.

The other good option is gRPC. It runs over HTTP/2, so a connection stays open and carries many calls at once, and messages travel as compact binary, usually Protobuf. Which to choose depends on your clients. If they support gRPC well, or you are prototyping, use it. Otherwise define your own format and publish it, as Redis did with RESP. You need not choose only one: open a port per protocol over the same hash table and make it configurable. Either way, keep it lean: every byte of every call is parsed on the cache, and in 6.5 that work all lands on one thread.

§ 6.3

## Two clients change the same key at the same instant

Two updates on the same key reach the cache at the same moment, on two threads. a is 10, and each client adds 1. Both read 10, both write 11, and one increment is gone: the lost clap from Lecture 2. The answer should be 12. There are three ways to get it.

The first is the one you know from Lecture 2: pessimistic locking. Wrap the critical step in a lock that every thread must take first: acquire, update, release. Two threads arrive together; one goes in and the other waits. On one machine that is a mutex or a semaphore; a Java synchronized block is exactly this. It is correct, and every waiting thread is throughput you gave up.

§ 6.4

## What if nobody takes a lock?

Optimistic locking starts from the opposite belief: two writers rarely touch the same thing at once, so don’t take a lock up front. Just make sure that if they do, only one of them succeeds. Lecture 2 sketched it as checking at write time whether the value changed underneath you. Here is how you build it.

Make the update conditional. Each write says what it expects to find: not set a = 11, but set a = 11 where a = 10. That only works if the check and the write are one indivisible step, and that step is a standard CPU instruction: compare-and-swap. CAS(a, 10 → 11) changes a to 11 only if it is still 10.

[figure title] Two increments, no lock, none lost

[figure description] Time runs down. Lanes: thread 1, the value a, thread 2. 1: a is 10 and both threads read it; neither takes a lock. 2: each wants to add 1, so each prepares a = 11 where a = 10. 3: thread 1’s CAS(a, 10 → 11) runs first, as one atomic step, and a becomes 11. 4: thread 2’s CAS(a, 10 → 11) finds 11, not 10, and changes nothing. 5: thread 2 re-reads 11 and retries with CAS(a, 11 → 12), which succeeds: a is 12, and neither increment was lost.

[figure labels] thread 1 · a · thread 2 · time · 1 · a = 10 · reads 10 · reads 10 · 2 · a = 11 · where a = 10 · a = 11 · where a = 10 · 3 · CAS(a, 10 → 11) · a = 11 · 10 matched: swapped · 4 · CAS(a, 10 → 11) · a = 11 · finds 11, not 10: · no change · 5 · won · re-reads 11: · CAS(11 → 12) · a = 12 · no increment lost

- Both threads see a = 10 and want to add 1. Neither takes a lock.

- Each write says what it expects to find: a = 11 where a = 10.

- Thread 1’s CAS(a, 10 → 11) runs first, as one atomic step: a becomes 11.

- Thread 2’s CAS(a, 10 → 11) finds 11, not 10, and does nothing.

- Thread 2 re-reads 11 and retries: CAS(a, 11 → 12). a is 12; no increment was lost.

Keys: ← → to step · link to a step with #fig-6c/step-3

[caption] Fig 6·cTime runs down. Lanes: thread 1, the value a, thread 2. Nobody takes a lock; the compare-and-swap decides. Step through with the buttons or the arrow keys.

The hardware does the compare and the write as one operation that every core sees whole, so nothing can slip in between. Every language wraps it, Go’s sync/atomic or C++’s std::atomic for example, and the compiler uses your processor’s instruction. Write a small optimistic lock with compare-and-swap yourself; it is very easy, and it makes the idea click.

§ 6.5

## What if there is only one thread?

The third way questions the premise. Concurrency problems exist because several threads run at once. What if the cache runs only one? Then it needs no concurrency control at all. That is what Redis did: its commands run on a single main thread, with a few background threads for chores such as freeing large values.

One thread doesn’t mean clients block each other. A single thread serving many connections from an event loop is how such systems are built. And now look back at chapter 4. Two threads running total_size += b at once would lose updates, the same race as the increment in 6.3, and the counter the whole memory cap rests on would drift. In our design the single thread is what makes zmalloc, and everything else on this node, correct without a single lock. (Real Redis, whose background threads also allocate and free, updates its counter with atomic instructions: compare-and-swap’s family, not a lock.) It saves the cost of switching between threads, too.

Pause and think

You run this single-threaded cache on a 32-core machine. What is the catch, and how would you get your money’s worth?

One core runs the cache and 31 sit idle. So run several copies of the cache on the same machine, each with its own share of the keys, one per core. Each copy stays single threaded and simple, and together they use the hardware.

[figure title] One thread, many cores

[figure description] Left: a single-threaded cache on an 8-core machine keeps one core busy and leaves seven idle. Right: the same machine running eight single-threaded shards of the cache, one per core, so every core is used.

[figure labels] redis · redis: 1 busy · 7 cores idle · s1 · s2 · s3 · s4 · s5 · s6 · s7 · s8 · 8 shards on one box · each single-threaded

[caption] Fig 6·dOne thread, many cores, drawn with eight. Left: a single-threaded cache keeps one core busy. Right: eight single-threaded copies on the same box use them all.

Notice what running several copies quietly did. It is not one cache any more. It is several, and somebody has to know which one holds which key. Push a little further, past what one machine’s RAM can hold or one machine can serve, and that question is the whole design.

Lecture 9, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-where-kiwi-lives ===

# Build your own Redis, chapter 7: One box isn’t enough. Who knows where kiwi lives?

Lecture 9 · Build your own Redis · chapter 7 of 9

§ 7

## One box isn’t enough. Who knows where kiwi lives?

About 6 min

The single node is finished. It has a port that speaks a lean protocol, one thread that never needs a lock, and a wrapper per key that knows its type, its last use and its expiry. On one node there is only one way to grow: vertically, with more RAM, CPU and network on the same machine. Then the blog outgrows it: one node can no longer handle the load, or hold the data. Spread the cache over several machines.

[figure title] Our Redis so far

[figure description] Our Redis so far, one node: a resp port, a hash table of keys pointing at MyValue wrappers (value, 4-bit type, 24 LRU bits, expires_at), zmalloc under maxmemory, eviction and expiry rules. Marked new: the resp port clients speak, and one thread that runs every command.

[figure labels] new · new · resp · hash table · MyValue { · void *value; · type : 4; · lru : 24; · expires_at; · } · zmalloc: total_size · maxmemory · 1 thread · evict: lru·lfu·random · ttl: lazy + sample · one node

[caption] Fig 7·aOur Redis so far, one node, complete. Marked new: the resp port that clients speak, and the one thread that runs every command.

Going from one node to many raises five concerns: storage, routing, availability, reliability and scaling. This chapter takes the first two. The next two chapters take the rest, and in this part of the design the cost of a decision is no longer counted in bytes. It is counted in network hops, and in keys that have to move.

§ 7.1

## How do you split the keys?

Storage is the easy part. Take the exact single-node cache you just built, run several copies of it, and give each one a slice of the keys that no other copy has: A to J on the first, K to T on the second, U to Z on the third. Lecture 3 split its key-value store across two masters the same way.

[figure title] Key ranges on three nodes

[figure description] A strip of all keys, a to z, cut into three slices that don’t overlap: a to j, k to t, u to z. Each slice goes down to its own copy of the same single-node cache: a to j to c1, k to t to c2, u to z to c3.

[figure labels] all keys · a–j · c1 · k–t · c2 · u–z · c3 · the same single-node cache, three times

[caption] Fig 7·bThe key space cut into three slices that don’t overlap, one per copy of the same single-node cache.

That is the whole idea of a distributed cache: many single cache servers working together as one coherent cache. It is also the sharding that chapter 3 set aside until the single node worked. But splitting the data creates a question that one machine never had.

§ 7.2

## A client wants kiwi. Which node does it ask?

A client wants to read or write the key kiwi. How does it know that cache 2 owns K to T? This isn’t special to caches. Any storage split into N slices that don’t overlap has to get each client to the right slice.

The first idea is a central place that holds the table, A–J on cache 1, K–T on cache 2, U–Z on cache 3, and a client asks it first. That works, and it raises the sharper question: does that place answer the client with where to go, or forward the request itself? Both have pros and cons, and different systems do it differently.

Pause and think

Three cache nodes own the ranges a–j, k–t and u–z. Must every request go through one central routing table to find its node?

The table could live in other places too, and each place costs something different: an extra hop, or more for the client to know.

[figure title] Where does the routing table live?

[figure description] Left: a client wants key kiwi. It first asks a routing box that holds the table (a to j on c1, k to t on c2, u to z on c3), gets the answer c2, then goes to c2 itself. Right: the table moves into the client, which goes straight to c2.

[figure labels] client · routing · (a,j) → c1 · (k,t) → c2 · (u,z) → c3 · kiwi? · c2 · c1 · c2 · c3 · ask first, then go · client · (a,j) → c1 · (k,t) → c2 · (u,z) → c3 · kiwi · c1 · c2 · c3 · or the client keeps the table

[caption] Fig 7·cWhere does the table live? Left: a routing box holds it; the client asks first, then goes to c2. Right: the table moves into the client, which goes straight to c2.

§ 7.3

## Four ways through a bank

There are four ways to route a request, and each is something you already do when you visit a bank. Every distributed system routes in one of these four ways.

1 · The runner at the door. For a small fee, a runner takes your form and gets the work done. You never learn how many desks are inside. That is a proxy. A load balancer works exactly this way, a single entry point responsible for getting every request done, and you built one in Lecture 5.

2 · The regular customer. Someone who has banked there for years walks straight to the right desk. Here the routing table lives in the client itself: a smart client knows every node and needs no router. Lecture 3’s API servers did this: each held the ranges and a connection to every master. The catch: when a desk’s job moves, every regular customer has to be told. The reward: no middleman, so you skip the fee, which here is the network latency of an extra hop.

3 · Any desk passes it on. No runner, no regulars. You go to the nearest desk, and that desk sends your request to the one that can handle it, waits, and hands you the answer. There is no central authority: any node takes responsibility for forwarding. The internet itself works like this: your packets go to one machine, which passes them on to the next, and the answer comes back the same way.

4 · “Go to counter 13.” You go to the nearest desk, and it says: I can’t help, go to counter 13. You walk there yourself. That is a redirect, and it is what DNS does: it gives you an address, and you connect to it directly, as Lecture 5 saw.

The four differ in who sends the next message. Watch one request go through each bank, and count the legs:

Same request, four banks. Which one costs the client two round trips?

[caption] Clip 7·1Proxy, smart client, forwarding and redirect differ in who sends the next message. The smart client saves a hop, until a job moves and its table is stale.

[summary] The clip as text 0:39

- Four ways to reach desk c2, which holds the key kiwi.

- The runner at the door: you talk only to the proxy.

- The regular customer walks straight to the right desk.

- No runner: the nearest desk forwards it and relays the answer.

- Redirect: the desk says “go to c2”, and you go there yourself.

- c2's job moves to c3. The smart client's table is now stale.

- The smart client saves a hop but must hear every change.

Four panels, each a client and three desks c1, c2 and c3; the key kiwi lives on c2, and the same request plays in each panel in turn while a counter adds one leg per message. Proxy, the runner at the door: the client talks only to the proxy, which asks c2 and passes the answer back: 4 legs, 1 round trip for the client, and the extra hop is the fee. Smart client, the regular customer: the client keeps the table kiwi → c2 and goes straight there: 2 legs, no middle hop. Forwarding: the client goes to the nearest desk c1, which forwards to c2 and relays the answer: 4 legs, 1 round trip. Redirect: c1 answers "go to c2" (the bank's "go to counter 13") and the client goes there itself: 4 legs and 2 round trips. Then c2's job moves to c3: the smart client's table is now stale and its old route fails. The smart client saves a hop but must hear about every change.

§ 7.4

## Which way for our cache?

For a cache, a proxy that holds the table and forwards every request would work, much like a load balancer. A smart client would work too, as long as you can tell every client about every change in the topology. Forwarding through any node you would typically not use for a cache: it brings far too many complications.

Redis Cluster picked the redirect. Send a command for a key to a node that doesn’t own it, and the node replies MOVED, naming the node that does; the client retries there itself. Why not put a load balancer in front instead? To keep the infrastructure simple: if the node itself can tell you where to go, you don’t need another component.

No one way is right. Make the client smarter to save a hop; add a proxy to make life easy for clients; let nodes forward when a system is gigantic and has no centre; or tell the client where to go. Pick your battles, and mix them if you like, one way for writes and another for reads.

All four rest on one thing, though: something must know which node owns kiwi. In our build, call whatever holds that map, client, proxy or redirecting node, “the router”. With ranges, the map is a table somebody keeps. With three nodes the table is tiny. The interesting moment is when the cluster grows.

Lecture 9, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-how-many-move ===

# Build your own Redis, chapter 8: A fourth box joins. How many keys have to move?

Lecture 9 · Build your own Redis · chapter 8 of 9

§ 8

## A fourth box joins. How many keys have to move?

About 8 min

Three nodes now share the keys, and a router, wherever it lives, knows who owns what. Then the blog grows again, and three nodes can’t keep up. The fix sounds trivial: add a fourth. How do you add it?

[figure title] Our Redis so far

[figure description] Our Redis so far: the single node, complete. Marked new: three copies of it, c1, c2 and c3, each owning a range of keys (a to j, k to t, u to z), and a router between the client and them.

[figure labels] new · resp · hash table · MyValue { · void *value; · type : 4; · lru : 24; · expires_at; · } · zmalloc: total_size · maxmemory · 1 thread · evict: lru·lfu·random · ttl: lazy + sample · router · c1 · a–j · c2 · k–t · c3 · u–z · one node · many nodes

[caption] Fig 8·aOur Redis so far: the single node. Marked new: three copies of it, each owning a range of keys, and a router in front of them.

§ 8.1

## Hash the key, mod the node count. What happens at N + 1?

Ranges need a table that somebody keeps up to date. A function needs none. In hash-based routing, the router passes every key through a simple hash function, and the result picks the node: hash(key) % N. Whatever picks the node defines ownership: the node a key is routed to is the node that owns it. Keep that word; it is the key idea of this chapter. For a cache, hashing is the usual way, because a hash function spreads keys almost uniformly over the nodes. (Lecture 3 met the other side: sharded databases that rarely change their shard count often keep fixed ranges.) Not randomly: the same key always lands on the same node.

Take a small case. Six keys, K1 to K6, on two caches. Through the hash function, K1, K2 and K6 land on cache 0 and K3, K4 and K5 on cache 1: three each. Now add a third cache. The function becomes hash % 3, and because the function changed, every key has to be checked again.

Pause and think

K1 to K6 hash to 6, 8, 7, 1, 3 and 2, and sit on hash % 2. You add a third cache and switch to hash % 3. How many of the six keys change node?

K1 (6) stays on cache 0, and K3 (7) and K4 (1) stay on cache 1. But K2 (8) goes from cache 0 to cache 2, K5 (3) from cache 1 to cache 0, and K6 (2) from cache 0 to cache 2. Three keys of six, half the data, cross the network to add one node.

And half is the lucky case. Under % N → % (N+1) a key stays only when both remainders agree, which happens for 1 key in N+1, so about N/(N+1) of all keys move: two thirds going from 2 nodes to 3, nine in ten going from 9 to 10, or, as Wikipedia puts it, nearly all keys are remapped Wikipedia ↗. Every move is a copy over the network, and rebalancing that much data is very slow.

The usual fix has a famous name, and more myths than most: consistent hashing.

§ 8.2

## What does consistent hashing actually decide?

Clear the myths first. Consistent hashing is not a service, or a microservice, and it is not a magic solution to all your problems. It solves for ownership, and nothing else: it tells you which node owns which key. It does not move your data, it migrates nothing, and it gives no uptime guarantee. Those are jobs you do yourself.

Everyone draws it as a ring. The ring is the hash function’s whole output range, from 0 up to 2n − 1, bent into a circle. Place each node on it by hashing the node’s own id: cache 1 lands on 3, cache 2 on 12, cache 3 on 5, cache 4 on 10. To find a key’s owner, hash the key and walk clockwise to the first node. Key K1 hashes to 0; the first node clockwise from 0 sits at 3, so cache 1 owns K1.

[figure title] The ring decides ownership

[figure description] A ring of hash positions 0 to 15, 0 at the top, running clockwise. Each cache is placed by hashing its id: cache 1 at 3, cache 3 at 5, cache 4 at 10, cache 2 at 12. Key K1 hashes to 0; its owner is the first node clockwise, cache 1 at 3. A speech bubble on the ring says “I move your data for you”, the misconception: the ring only decides ownership.

[figure labels] 0 · 3 · 5 · 10 · 12 · cache 1 · cache 3 · cache 4 · cache 2 · K1 · owner · I move your data · for you · consistent hashing: for determining ownership · owner = the first node clockwise

[caption] Fig 8·bThe ring decides ownership. Nodes sit where their ids hash; a key belongs to the first node clockwise. The bubble is the myth: the ring moves nothing.

This example uses 16 positions, 24. Real rings are as wide as their hash: 2128 for MD5, 2160 for SHA-1. The ring lives wherever routing lives: in the client if the client routes, in the proxy if a proxy does, in whatever component redirects. And it isn’t really a data structure. For four nodes you store four numbers, sorted, and find an owner with a binary search.

import bisect ring = [3, 5, 10, 12] # sorted node positions node = {3: 'cache 1', 5: 'cache 3', 10: 'cache 4', 12: 'cache 2'} def owner(h): # h = hash(key) i = bisect.bisect_left(ring, h) # first position >= h return node[ring[i % len(ring)]] # past the end: wrap to 0

owner(0) is cache 1, and so is owner(13): past 12 the search wraps around to 3. That is all consistent hashing does: it replaces the routing table, the map of who owns what, with a smaller, more elegant one. Not every system uses a ring for that job. Redis Cluster maps every key to one of 16,384 fixed hash slots and assigns slots to nodes redis.io ↗: chapter 7’s range table again, with 16,384 fixed ranges, where moving a slot moves only its keys. Our build keeps the ring.

§ 8.3

## Cache 5 joins the ring. Which keys change hands?

Scale four nodes to five. Cache 5 hashes to 1 and sits there on the ring. K1, at 0, used to walk clockwise to cache 1; now the first node it meets is cache 5. Which other keys change hands? Count them against % N:

Six keys, add a node. How many move with hash % N, and how many on the ring?

[caption] Clip 8·1With hash % N every key is rechecked and half of them move; on the ring only the new node’s slice moves, all from one neighbour. On average, % N moves about N/(N+1) of the keys, a ring about 1/(N+1).

[summary] The clip as text 0:39

- Six keys on two nodes, placed by hash mod 2.

- Add a node: mod 2 becomes mod 3, so every key is rechecked.

- Three of six keys change node: half the data moves.

- On a ring, each key belongs to the next node clockwise.

- Add c5 at 1: only its slice moves, all from one neighbour.

- On average, % N moves about N/(N+1) of keys; a ring about 1/(N+1).

Left: six keys K1 to K6 on two nodes c0 and c1, placed by hash mod 2 (K1, K2, K6 on c0; K3, K4, K5 on c1). A third node c2 is added, so the rule becomes hash mod 3 and every key is rechecked one by one. Three keys change node: K6 and K2 move from c0 to c2 and K5 moves from c1 to c0, so 3 of 6 keys, 50% of the data, move. Right: a consistent-hashing ring with nodes c1 at 3, c3 at 5, c4 at 10 and c2 at 12, and six keys on it; each key belongs to the next node clockwise. A node c5 is added at position 1. Only the keys in the slice (12, 1], K6 and K1, change owner, and their data comes from c1, the one neighbour that owned that slice; every other key keeps its owner: 2 of 6 move. On average, going from N to N+1 nodes, hash mod N moves about N/(N+1) of the keys and a ring about 1/(N+1).

That is the entire benefit of consistent hashing: minimal data transfer when you scale up or down. There is no magic sauce behind it, and it is very simple and beautiful in hindsight.

Scaling down is the same move in reverse. Say the cluster is over-provisioned and you remove cache 1 to save money. Its keys now walk on to the next node clockwise, cache 3, and every other key stays put. Graceful: copy cache 1’s data to cache 3, then take cache 1 off the ring. Abrupt: cache 1 dies, and its whole slice lands on cache 3 cold.

§ 8.4

## Traffic peaks, and you add a blank cache 5

Back to adding. It is peak traffic, so you start a fresh cache 5 and put it on the ring.

Pause and think

Consistent hashing means only cache 5’s slice changes owner. You add a new, empty cache 5 at peak traffic. Is that enough?

The ring hands cache 5 its slice the instant it joins, but the data is still on cache 1. Every request in that slice misses, and the misses fall through to the backend at the worst possible moment.

So the data has to arrive before the ring sends anyone there. Step through the safe order:

[figure title] Adding cache 5 safely

[figure description] Lanes for the router, cache 5, cache 1 and the backend database, time running down. 1: a blank cache 5 is put on the ring at peak; a request for K1 goes to cache 5, misses, and falls through to the database, whose load rises. 2: instead, take a snapshot of cache 1 and build cache 5 from it. 3: then add cache 5 to the ring; the request for K1 hits. 4: then slowly delete the keys cache 1 no longer owns, the slice from 12 to 1.

[figure labels] router · cache 5 · cache 1 · db · time · 1 · blank · get K1 · miss · falls through to the db · load ↑ · 2 · instead: · snapshot · K1 ✓ · 3 · + cache 5 · get K1 · hit · 4 · slowly delete · (12, 1]

- A blank cache 5 joins at peak. Requests for K1 go to it, miss, and fall through to the database.

- Instead: take a snapshot of cache 1 and build cache 5 from it.

- Now add cache 5 to the ring: requests for K1 find their data.

- Then slowly delete the keys cache 1 no longer owns, the slice from 12 to 1.

Keys: ← → to step · link to a step with #fig-8c/step-3

[caption] Fig 8·cTime runs down. Lanes: the router holding the ring, the new cache 5, cache 1 (which owns the slice today) and the database behind the cache. Blue is a request, red a miss and the load it pushes onto the database, dashed the snapshot copy, green data that is there.

For a stateful system this is about as simple as moving data gets: one snapshot of one node, one load.

The ring is not perfect, though. You don’t choose where its nodes land, or where keys pile up. And the abrupt case above hasn’t been answered at all: a node that dies takes its data with it.

Lecture 9, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-a-box-dies ===

# Build your own Redis, chapter 9: A box dies. Where are its keys?

Lecture 9 · Build your own Redis · chapter 9 of 9

§ 9

## A box dies. Where are its keys?

About 8 min

The ring tells every router who owns each key, and adding or removing a node moves one slice. Two problems are left over from the last chapter. Hashing decides where nodes and keys land, and it can land them badly. And a node that dies takes its slice of the data with it.

[figure title] Our Redis so far

[figure description] Our Redis so far: the single node, and a client and a router in front of many nodes. Marked new: the nodes now sit on a ring of hash positions, and each key belongs to the first node clockwise from its hash.

[figure labels] new · resp · hash table · MyValue { · void *value; · type : 4; · lru : 24; · expires_at; · } · zmalloc: total_size · maxmemory · 1 thread · evict: lru·lfu·random · ttl: lazy + sample · router · c1 · c3 · c4 · c2 · ring · one node · many nodes

[caption] Fig 9·aOur Redis so far: the single node, and a client and a router in front of many nodes. Marked new: the nodes sit on a ring, and each key belongs to the first node clockwise from its hash.

§ 9.1

## Can the ring go lopsided?

It can, in two ways. Nodes can land too close together, because the hash of a node’s id decides where it sits, not you. And keys can pile up. A hash-based scheme hands the spread to the hash function and hopes it is uniform enough; with a skewed set of keys or a poor hash, one node runs much hotter than the rest, and you end up adding a node just to dilute it. Companies use the ring anyway, because it keeps scaling up and down simple. A wider ring doesn’t fix the imbalance, though. It comes from having few points on the circle, whatever its size.

The standard fix adds points. With virtual nodes, each physical node takes many positions on the ring instead of one, so each owns many small slices spread around it. That changes where data moves from. When a node joins or leaves, the total moved is still about 1/N of the data, but it comes from, or goes to, many nodes in small pieces instead of one neighbour in a single copy.

[figure title] Virtual nodes: where a new node’s data comes from

[figure description] Left, one token per node: four nodes on the ring and a new node at one position; its keys come from one neighbour, the next node clockwise, in one copy. Right, virtual nodes: each of c1 to c4 sits at three places on the ring, and the new node also sits at three places, so it copies three small slices from three different nodes. The total is the same, about 1/N of the data, but it comes from many sources. That buys smoother balance, since the load spreads evenly across the other nodes, and costs harder operations: many streams to coordinate instead of one copy.

[figure labels] c1 · c3 · c4 · c2 · new · one source, one copy · one token per node · c1 · c3 · c2 · c4 · c3 · c1 · c2 · c4 · c1 · c2 · c3 · c4 · new node, · 3 places · same total (~1/N), from many sources · virtual nodes · cost: many streams to run instead of one copy · gain: the load spreads evenly across the others

[caption] Fig 9·bWhere a new node’s data comes from. One position per node: one copy from one neighbour. Virtual nodes: small slices from many nodes, the same total.

Amazon’s Dynamo uses virtual nodes so that a failed node’s load spreads evenly over all the others Dynamo paper ↗. The cost is operational: loading a new node from many sources at once, where the slowest sets the pace and a slice is easy to miss. For a stateful cache some prefer the plain ring: snapshot one node, done. Hot partitions, and a case where consistent hashing performs very badly, come later in the course.

§ 9.2

## Cache 3 dies. Where is its data?

Cache 3 goes down abruptly. Its keys now walk on to cache 4, which has none of them.

Why care, if a cache may forget? One lost key is one miss. A lost node is a whole slice of misses at once, all falling through to the database: chapter 8’s peak problem, with no snapshot to load. That is why even a cache keeps copies.

The basic answer is the same as for any database: a replica. Every node gets a standby copy that takes its place if it dies. It costs another machine for every node, and if availability matters to you, you pay it. The ring offers another shape, with no idle standby machines: every node serves traffic and spends some RAM on its neighbours’ copies. Whatever cache 1 owns, cache 3 holds as well; whatever cache 3 owns, cache 4 holds too. If cache 3 dies, cache 4 already has its data and serves its requests. That is two copies of every key, a replication factor of 2.

Pause and think

Each key is stored on the node that owns it and on the next two nodes clockwise. What is the replication factor?

Three. The replication factor counts every copy of a key, the owner’s included. In Dynamo each key lives on N nodes, its owner and the next N − 1 clockwise, and Cassandra’s “replication factor 3” likewise means three copies.

[figure title] Two ways to survive a node

[figure description] Left: cache 1 with a dashed replica that pulls its data; if cache 1 goes down the standby takes over, at the cost of one more node to run. Right: the ring with key K at 0; its owner c1 and the next two nodes clockwise, c3 and c4, are ringed: each holds a copy. Three copies in all: a replication factor of 3.

[figure labels] cache 1 · replica · standby takes over · the price: one more node to run · a replica per node · c1 · c3 · c4 · c2 · K · owner + · next two · replication factor 3 · three copies in all · copies on the next nodes

[caption] Fig 9·cTwo ways to survive a node: a standby replica per node, or copies on the next nodes of the ring.

Either way it is redundancy, and redundancy is how you get availability: when a node goes down, you know where its data is and can rebuild the node from it. It is standard practice, even for a cache. It also means cache 1 needn’t delete the keys it handed to cache 5 in chapter 8: with copies on the next nodes, they are copies it would hold anyway.

§ 9.3

## And when a node only restarts?

Copies cover a node that is gone. A node that merely reboots comes back with empty RAM: a whole slice of misses again, unless it gets its own data back. Redis can keep an append-only file, the AOF (it is off by default; periodic snapshots are the default): every write is appended to a file on disk, and after a restart Redis replays the file to rebuild memory. It is chapter 2’s idea turned inward: a log you append to and replay, read by the node itself instead of a CDC tool. An append-only file is the standard way to make data durable. Two details matter in practice, and Lecture 1 met the second one. Redis appends each command after running it, so the AOF is a log of what happened rather than a write-ahead log. And by default it flushes to disk once a second, so a crash can lose about a second of writes; flushing on every write is safer and much slower.

[figure title] Our Redis so far

[figure description] Our Redis at the end of the lecture: one node with a resp port, one thread, a hash table of MyValue wrappers (value, type, LRU bits, expiry), zmalloc under maxmemory, eviction and expiry rules; many nodes on a ring behind a router. Marked new: a replica pulling from a node, and an append-only file on each node’s disk.

[figure labels] new · resp · hash table · MyValue { · void *value; · type : 4; · lru : 24; · expires_at; · } · zmalloc: total_size · maxmemory · 1 thread · + aof on disk · evict: lru·lfu·random · ttl: lazy + sample · router · c1 · c3 · c4 · c2 · ring · replica · one node · many nodes

[caption] Fig 9·dOur Redis, finished. One node: a resp port, one thread, a hash table of MyValue wrappers with type, eviction bits and expiry, and zmalloc under maxmemory. Many nodes on a ring behind a router. Marked new: a replica pulling from a node, and an append-only file on each node’s disk.

Step back and look at what you built. It is a hash table spread over machines, with a rule that tells anyone where each key lives. Take away the router, so that any node can point you onward, and it has a general name: a distributed hash table, the design behind BitTorrent’s trackerless mode and IPFS.

§ 9.4

## What you can now do

- Keep a copy complete by reading the database’s log with CDC: it resumes from a checkpoint, delivers at least once (write with upserts) and is eventually consistent. Events for application context; Spark for joins.

- Store values on a budget: a hash table of keys pointing at a small wrapper with a value pointer, a 4-bit type and room for per-key metadata.

- Know how full you are: count every byte in one wrapper around malloc and check the cap before allocating. Never ask the OS on every write.

- Evict for the key’s life. Price the textbook LRU list in bytes (12–24 per key). Random keeps nothing; sampled LRU or LFU costs a few bits. LRU for keys that spike and fade, LFU when the past predicts the future or scans would flush it.

- Expire without a queue: an absolute expiry per key, an index of keys that have one, lazy deletion on read, sampling for the rest.

- Talk and take turns cheaply: a lean protocol on a kept-open connection; one thread makes the node correct without locks, and more copies use the other cores.

- Route with a proxy, a smart client, forwarding or a redirect: hops against what the client must know.

- Grow without moving everything. % N moves about N/(N+1) of the keys; a ring moves one slice. Load a new node from a snapshot before it joins.

- Keep copies even of a cache: a lost node is a slice of misses at once. Copies on the next nodes cover a death (count every copy for the replication factor); an append-only file covers a restart.

An API server saves a new post and crashes before it publishes its Kafka event. Which copy of the data misses the post, and why doesn’t a CDC copy?

[summary] Show answer

The copy fed by Kafka events misses it: the row was saved but its event never left, and nothing reports an error. A CDC tool reads the database’s own log, where the committed row is, so the copy gets it whether or not any event was published.

Your cache must stay under 1 GB. Why can’t it add sizeof(MyValue) per key to a counter, and what does it do instead?

[summary] Show answer

sizeof measures only the wrapper, a pointer and a type. The set or Bloom filter it points to is allocated separately and can be megabytes. Instead, every allocation goes through one wrapper around malloc that adds the bytes to total_size (and every free subtracts them), so the count includes everything the cache holds.

A news site and an encyclopedia each put a cache in front of their pages. Which eviction policy fits each, and what would a nightly scan do to the wrong one?

[summary] Show answer

News: LRU, since stories are read hard for a day or two and then forgotten. The encyclopedia: LFU, since pages popular in the past stay popular. Under LRU, a scan that reads every article once makes them all “recent” and pushes the popular pages out; under LFU each scanned page has a count of one and can’t displace them.

You add a fifth node to a ring of four during peak traffic. What do you do, in order, and why not just add it?

[summary] Show answer

Snapshot the node that owns the new node’s slice today, build the new node from the snapshot, add it to the ring, then delete the moved keys from the old owner. Added empty, it would own the slice with none of the data, so every request in it would miss and fall through to the database at the worst moment.

§ 9.5

## Everything here fits in RAM. What if it doesn’t?

Our Redis keeps everything in memory, and leans on a file only to come back after a restart. That choice is why it is fast, and it is also its limit: RAM is the most expensive thing you own, and it is gone when the power goes.

Lecture 10 turns it around. It starts with a terabyte dictionary and no database allowed: the data no longer fits in memory and must survive restarts, so it lives in files, and you build two storage engines out of nothing but files on a disk. Append-only files come back there, in a much bigger role than a restart log.

Lecture 9, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.
